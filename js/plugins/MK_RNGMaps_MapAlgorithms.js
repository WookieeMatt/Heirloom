/*:
 * @target MZ
 * @plugindesc [Tier 3] [Version 0.4] (no Plugin Parameters or Commands)
 * @author Aerosys
 * @url https://aerosys.blog
 * @base MK_RNGMaps_Core
 * @base MK_RNGMaps_withoutSnippets
 * @orderAfter MK_RNGMaps_Core
 * @orderAfter MK_RNGMaps_withoutSnippets
 * @
 * 
 * @help
 * no Plugin Parameters or Commands
 * 
 * It's not recommended to edit this file, as you would lose your individual
 * changes when doing an Update from itch.io.
 */

'use strict';

var Imported = Imported || {};
Imported.MK_RNGMaps_MoreMapAlgorithms = true;

MK.convertABArguments = function(value) {
    return value !== undefined
        ? { withDefaults: (_) => Array.isArray(value) ? value : [value, value] }
        : { withDefaults: (defaultValues) => defaultValues }
}


// =====================================================================================
// CUSTOM MAP ALGORITHMS
// =====================================================================================

var mapGenerationAlgorithms = mapGenerationAlgorithms || { };

// =====================================================================================
// Static
// =====================================================================================
mapGenerationAlgorithms.staticMap = function (dataMap, args) {
    
    if (args.spawnLocationArguments
            && args.spawnLocationArguments.length == 2
            && args.spawnLocationArguments.every(arg => typeof arg == 'number')) {
        const x = args.spawnLocationArguments[0];
        const y = args.spawnLocationArguments[1];
        this.spawnLocation = {x: x, y: y};
    }
    else
        this.spawnLocation = { x: $gamePlayer.x, y: $gamePlayer.y };

    return dataMap;
}


// =====================================================================================
// Worldmap
// =====================================================================================
mapGenerationAlgorithms.worldMap = function (dataMap, args) {

    // default parameters and arguments
    args.scale              = args.scale || 30;
    args.n_levels           = this.getNumberOfLevels();
    args.groundLevel        = args.groundLevel || args.groundLevel == 0
                                ? args.groundLevel
                                : this.getGroundLevel(); // automatic detection by Tile passability
    args.n_islands          = MK.convertABArguments(args.n_islands).withDefaults([0, 99]);
    args.minSizeToHaveABiome = args.minSizeToHaveABiome || args.minSizeToHaveABiome == 0
                                ? args.minSizeToHaveABiome
                                : 15;
    args.drawRivers     = args.drawRivers !== false; // true by default
    args.townsVariable  = args.townsVariable || 400;

    if (MK.existsAdditionalMap("rivers")) {
        args.riverTileStack = MK.getTileStack(0, 0, MK.getAdditionalMap("rivers"));
    } else {
        args.riverTileStack = [ MK.tileFromEditorsTable('A1', 0, 0), 0, 0, 0, 0, 0 ];
    }

    const spawnLocationOptions = [];

    // --- code starts here ---
    
    const inFrame = (x, y) => 0 <= x && x < dataMap.width && 0 <= y && y < dataMap.height;

    
    // islands
    let noiseMap, refinedHeightMap, islands;
    
    do {
        noiseMap    = MK.generateNoiseMap({ w: dataMap.width, h: dataMap.height, scale: args.scale });
        const array = MK.calculateArray(noiseMap, args.n_levels);

        // apply smooth border
        MK.applySmoothBorder(noiseMap, 6);

        // draw ocean and continents
        refinedHeightMap = MK.refineToHeightMap(noiseMap, array);
        for (let x = 0; x < dataMap.width; x++) {
            for (let y = 0; y < dataMap.height; y++) {
                const tile = MK.getTileStackFromBaseMap(refinedHeightMap[x][y]);
                MK.setTileStack(x, y, dataMap, tile);
            }
        }

        islands = MK.getAllIslands(
            dataMap.width,
            dataMap.height,
            (x, y) => refinedHeightMap[x][y] >= args.groundLevel);
        
    } while (islands.length < args.n_islands[0] || args.n_islands[1] < islands.length);

    
    // each island will have its own Biome, unless it is too small
    if (MK.existsAdditionalMap("biomes")) {
        for (let island of islands) {
            if (island.length < args.minSizeToHaveABiome) continue;

            const matchers = MK.getMatchersFromBiomeMap("biomes");
            const tile = MK.rng.pickRandom(MK.getReplacementsFromBiomeMap("biomes"));

            for (let point of island) {
                const floorTile = MK.getTileStack(point.x, point.y, dataMap);
                if (matchers.some(matcher => MK.equalTileStacks(matcher, floorTile)))
                    MK.setTileStack(point.x, point.y, dataMap, tile);
            }
        }
    }

    
    // Mountains
    if (MK.existsAdditionalMap("mountains")) {
        const nodes = [];
        
        for (let i = 0; i < 40; i++) {
            nodes.push({
                x: MK.rng.randomInteger(0, dataMap.width - 1),
                y: MK.rng.randomInteger(0, dataMap.height - 1)
            });
        }
        
        const edges = MK.kruskalMST(nodes);
        for (let edge of edges) {
            let path = MK.calculatePath({
                w: dataMap.width,
                h: dataMap.height,
                start: edge.start,
                end: edge.dest,
                weightFunction: (x, y) => 1.0 - noiseMap[x][y],
                penalizeBorder: false
            });
            path = MK.makePathBigger({
                path: path,
                thickness: MK.rng.pickRandom([3, 4, 5])
            });

            for (let point of path) {
                MK.putMatchingShadingsTileStack(point.x, point.y, dataMap, "mountains");
            }
        }
    }

    
    // Rivers
    function isSummit (x, y, r = 5) {
        const initialValue = noiseMap[x][y];

        for (let x_ = x - r; x_ < x + r; x_++) {
            for (let y_ = y - r; y_ < y + r; y_++) {
                if (!inFrame(x_, y_) || noiseMap[x_][y_] > initialValue)
                    return false;
            }
        }
        return true;
    }

    function drawRiver (x, y) {
        const seaTile = args.riverTileStack;
        MK.setTileStack(x, y, dataMap, seaTile);

        while (refinedHeightMap[x][y] >= args.groundLevel) {
            let neighbors = [];
            
            if (inFrame(x - 1, y)) neighbors.push({ x: -1, y: 0,  value: noiseMap[x - 1][y] });
            if (inFrame(x, y - 1)) neighbors.push({ x: 0,  y: -1, value: noiseMap[x][y - 1] });
            if (inFrame(x + 1, y)) neighbors.push({ x: 1,  y: 0,  value: noiseMap[x + 1][y] });
            if (inFrame(x, y + 1)) neighbors.push({ x: 0,  y: 1,  value: noiseMap[x][y + 1] });
            
            neighbors.sort((a, b) => a.value - b.value);
            const i = MK.rng.pickRandom([0, 0, 1]); // with a small chance, pick the 2nd lowest neighbour
            x += neighbors[i].x;
            y += neighbors[i].y;
            MK.setTileStack(x, y, dataMap, seaTile);
        }
    }

    for (let x = 0; x < dataMap.width; x++) {
        for (let y = 0; y < dataMap.height; y++) {
            if (isSummit(x, y))
                drawRiver(x, y);
        }
    }

    
    // Towns and Villages
    if (MK.existsAdditionalMap("towns")) {
        const townInfos = MK.getMatchersAndReplacementsFromStructuresMap("towns");

        for (let island of islands) {
            const options = [];
            const towns   = [];
            const n_towns = Math.max(Math.round(island.length / args.townsVariable), 1);

            for (let point of island) {
                for (let regionId in townInfos) {
                    const matchers = townInfos[regionId].matchers;
                    if (MK.anyMatcherSuccessful(point.x, point.y, dataMap, matchers, "towns"))
                        options.push(point);
                }
            }

            while (options.length && towns.length < n_towns) {
                const point = MK.rng.pickRandom(options);
                options.splice(options.indexOf(point), 1);

                for (let regionId in townInfos) {
                    const townInfo = townInfos[regionId];
                    const matchers = townInfo.matchers;
                    
                    if (MK.anyMatcherSuccessful(point.x, point.y, dataMap, matchers, "towns")) {
                        const i = MK.rng.randomInteger(0, townInfo.n - 1);
                        const from_x = i * townInfo.w + townInfo.x;
                        MK.copyTiles(
                            from_x,
                            townInfo.y,
                            townInfo.w,
                            townInfo.h,
                            point.x,
                            point.y,
                            MK.getAdditionalMap("towns"),
                            dataMap);
                        MK.cloneEvents(
                            from_x,
                            townInfo.y,
                            townInfo.w,
                            townInfo.h,
                            point.x,
                            point.y,
                            MK.getAdditionalMap("towns"),
                            dataMap);
                        towns.push(point);

                        if (MK.isPassable(point.x, point.y + townInfo.h, dataMap))
                            spawnLocationOptions.push({ x: point.x, y: point.y + townInfo.h });
                        break;
                    }
                }
            }

            if (!towns.length) continue;

            // Roads
            if (MK.existsAdditionalMap("Roads")) {
                const roads = MK.kruskalMST(towns);
                const roadWeightFunction = (x, y) => {
                    if (refinedHeightMap[x][y] < args.groundLevel) return 1000;
                    if (!MK.isPassable(x, y, dataMap)) return 10;
                    return 1;
                }
                
                for (let road of roads) {
                    let path = MK.calculatePath({
                        w: dataMap.width,
                        h: dataMap.height,
                        start: road.start,
                        end: road.dest,
                        weightFunction: roadWeightFunction,
                        penalizeBorder: false
                    });
                    path = path.slice(2, -2);
                    
                    if (path.every(point => MK.isPassable(point.x, point.y, dataMap))) {
                        for (let point of path) {
                            MK.putMatchingShadingsTileStack(point.x, point.y, dataMap, "Roads");
                        }
                    }
                }
            }
        }
    }

    // Spawn Location
    if (typeof args.spawnLocationArguments[0] == 'number'
            && typeof args.spawnLocationArguments[1] == 'number') {
        const x = args.spawnLocationArguments[0];
        const y = args.spawnLocationArguments[1];
        this.spawnLocation = {x: x, y: y};
    }
    if (args.spawnLocationArguments && args.spawnLocationArguments[0] == 'here') {
        this.spawnLocation = { x: $gamePlayer.x, y: $gamePlayer.y };
    }
    if (args.spawnLocationArguments && args.spawnLocationArguments[0] == 'any') {
        this.spawnLocation = spawnLocationOptions.length
            ? MK.rng.pickRandom(spawnLocationOptions)
            : { x: $gamePlayer.x, y: $gamePlayer.y };
    }
    if (!this.spawnLocation)
        throw Error("Worldmap Generation does not support spawnLocation: " + args.spawnLocationArguments);

    return dataMap;
}


MK.identifyDeadEnds = function(edges) {
    const nodes = [];
    const numbers = [];

    function add (node) {
        const index = nodes.findIndex(n => node.x == n.x && node.y == n.y);
        if (index == -1) {
            nodes.push(node);
            numbers.push(1);
        } else {
            numbers[index] = numbers[index] + 1;
        }
    }

    for (let edge of edges) {
        add(edge.start);
        add(edge.dest);
    }
    
    const toReturn = [];
    for (let i = 0; i < nodes.length; i++) {
        if (numbers[i] == 1)
            toReturn.push(nodes[i]);
    }
    return toReturn;
}


// =====================================================================================
// Cave
// =====================================================================================
mapGenerationAlgorithms.cave = function(dataMap, args) {

    args.drawAreas              = args.drawAreas !== false;
    args.scale                  = args.scale || 10;
    args.minValue               = args.minValue || 0.55;
    args.n_nodes                = MK.convertABArguments(args.n_nodes).withDefaults([5, 15]);
    args.n_randomEdges          = MK.convertABArguments(args.n_randomEdges).withDefaults([0, 2]);
    args.thickness              = MK.convertABArguments(args.thickness).withDefaults([3, 5]);
    args.roadThickness          = MK.convertABArguments(args.roadThickness).withDefaults([4, 5]);
    args.roadMode               = args.roadMode || "angular";
    args.spawnLocationArguments = args.spawnLocationArguments || ["bottom"];

    // --- code starts here ---

    // base
    const noiseMap = args.drawAreas
        ? MK.generateNoiseMap({ w: dataMap.width, h: dataMap.height, scale: args.scale })
        : MK.createMatrix(dataMap.width, dataMap.height, 0.001);
    MK.applySmoothBorder(noiseMap, 4);
    
    const binaryMap = args.drawAreas
        ? MK.toBinaryMap(noiseMap, args.minValue)
        : MK.createMatrix(dataMap.width, dataMap.height);
    const islands = MK.getAllIslands(dataMap.width, dataMap.height, (x, y) => binaryMap[x][y]);

    // every island gets a node so they will be connected in the next step
    const nodes = islands.map(island => MK.getCenter(island));

    // spawn Nodes
    const MARGIN = 7;
    const n_nodes = MK.rng.randomInteger(args.n_nodes[0], args.n_nodes[1]);
    while (nodes.length < n_nodes) {
        nodes.push({
            x: MK.rng.randomInteger(MARGIN, dataMap.width - (MARGIN + 1)),
            y: MK.rng.randomInteger(MARGIN, dataMap.height - (MARGIN + 1))
        });
    }

    // exits
    let exitTop, exitLeft, exitRight, exitBottom;
    if (args.exits.top) {
        const x = args.centerExits
            ? Math.floor(dataMap.width / 2)
            : MK.rng.randomInteger(MARGIN, dataMap.width - MARGIN);
        exitTop = { x: x, y: 0 };
        nodes.push(exitTop);
        if (args.spawnLocationArguments[0] == "top")
            this.spawnLocation = { x: x, y: 1 };
    }
    if (args.exits.left) {
        const y = args.centerExits
            ? Math.floor(dataMap.height / 2)
            : MK.rng.randomInteger(MARGIN, dataMap.height - MARGIN);
        exitLeft = { x: 0, y: y };
        nodes.push(exitLeft);
        if (args.spawnLocationArguments[0] == "left")
            this.spawnLocation = { x: 1, y: y };
    }
    if (args.exits.right) {
        const y = args.centerExits
            ? Math.floor(dataMap.height / 2)
            : MK.rng.randomInteger(MARGIN, dataMap.height - MARGIN);
        exitRight = { x: dataMap.width - 1, y: y };
        nodes.push(exitRight);
        if (args.spawnLocationArguments[0] == "right")
            this.spawnLocation = { x: dataMap.width - 2, y: y };
    }
    if (args.exits.bottom) {
        const x = args.centerExits
            ? Math.floor(dataMap.width / 2)
            : MK.rng.randomInteger(MARGIN, dataMap.width - MARGIN);
        exitBottom = { x: x, y: dataMap.height - 1 };
        nodes.push(exitBottom);
        if (args.spawnLocationArguments[0] == "bottom")
            this.spawnLocation = { x: x, y: dataMap.height - 2 };
    }

    // edges and paths
    const edges         = MK.kruskalMST(nodes);
    const n_randomEdges = MK.rng.randomInteger(args.n_randomEdges[0], args.n_randomEdges[1]);

    for (let i = 0; i < n_randomEdges; i++) {
        const edge = { start: MK.rng.pickRandom(nodes), dest: MK.rng.pickRandom(nodes) };
        edges.push(edge);
    }

    for (let edge of edges) {
        const path1 = MK.calculatePath({
            w: dataMap.width,
            h: dataMap.height,
            start: edge.start,
            end: edge.dest,
            weightFunction: (x, y) => 1.0 - noiseMap[x][y]
        });
        const path2 = MK.makePathBigger({
            path: path1,
            thickness: MK.rng.randomInteger(args.thickness[0], args.thickness[1]),
            mode: "smooth"
        });
        path2.forEach(point => binaryMap[point.x][point.y] = true);

        // inner paths are "reserved" to not get blocked by assets
        const path3 = MK.makePathBigger({
            path: path1,
            thickness: 2
        });
        path3.forEach(point => this.reservedMap[point.x][point.y] = true);
    }

    // prioritize Deadends to spawn hidden POIs, loot chests etc.
    for (let point of MK.identifyDeadEnds(edges)) {
        for (let x = point.x - 1; x <= point.x + 1; x++) {
            for (let y = point.y - 1; y <= point.y + 1; y++) {
                if (3 < x && x < dataMap.width - 3 && 3 < y && y < dataMap.height - 3)
                    this.hiddenMap[x][y] = true;
            }
        }
    }

    // draw Map
    const floorTile     = MK.getTileStack(0, 1, dataMap);
    const ceilingTile   = MK.getTileStack(0, 0, dataMap);

    for (let x = 0; x < dataMap.width; x++) {
        for (let y = 0; y < dataMap.height; y++) {
            const tileStack = binaryMap[x][y] ? floorTile : ceilingTile;
            MK.setTileStack(x, y, dataMap, tileStack);

            if (MK.existsAdditionalMap("Paths") && this.reservedMap[x][y]) {
                MK.putMatchingShadingsTileStack(x, y, dataMap, "Paths");
            }
        }
    }

    // draw Roads
    if (MK.existsAdditionalMap("Roads")
        && [exitTop, exitLeft, exitRight, exitBottom].filter(Boolean).length) {

        const center = MK.getCenterOfRoads(exitTop, exitLeft, exitRight, exitBottom);
        const roads = MK.getRoads(exitTop, exitLeft, exitRight, exitBottom, center);
        for (let road of roads) {
            const roadThickness = MK.rng.randomInteger(args.roadThickness[0], args.roadThickness[1]);
            let path = MK.calculatePath({
                w: dataMap.width,
                h: dataMap.height,
                start: road.a,
                end: road.b,
                weightFunction: (x, y) => this.reservedMap[x][y] ? 0.1 : 1.0 - noiseMap[x][y]
            })
            path = MK.makePathBigger({ path, roadThickness, mode: args.roadMode });
            for (let point of path) {
                MK.putMatchingShadingsTileStack(point.x, point.y, dataMap, "Roads");
            }
        }
    }

    return dataMap;
}


mapGenerationAlgorithms.forest = function(dataMap, args) {
    return mapGenerationAlgorithms.cave.call(this, dataMap, args);
    // will be implemented in future releases
}


mapGenerationAlgorithms.field = function(dataMap, args) {
    return mapGenerationAlgorithms.cave.call(this, dataMap, args);
    // will be implemented in future releases
}


// =====================================================================================
// Rooms and Corridors
// =====================================================================================
mapGenerationAlgorithms.roomsAndCorridors = function(dataMap, args) {
    args.n_roomsToBuild     = MK.convertABArguments(args.n_roomsToBuild).withDefaults([4, 5]);
    args.roomWidth          = MK.convertABArguments(args.roomWidth).withDefaults([7, 9]);
    args.roomHeight         = MK.convertABArguments(args.roomHeight).withDefaults([5, 5]);
    args.n_randomEdges      = MK.convertABArguments(args.n_randomEdges).withDefaults([0, 2]);
    args.thickness          = MK.convertABArguments(args.thickness).withDefaults([2, 3]);
    
    
    if (args.n_roomsToBuild[0] < 1)
        throw Error("You must have at least one Room");
    
    // --- code starts here ---
    const rooms             = [];
    const n_roomsToBuild    = MK.rng.randomInteger(args.n_roomsToBuild[0], args.n_roomsToBuild[1]);
    const matrix            = MK.createMatrix(dataMap.width, dataMap.height);
    const ceilingTile       = MK.getTileStack(0, 0, dataMap);
    const floorTiles        = [];
    const corridorTiles     = [];

    for (let x = 0; !MK.isCellEmpty(x, 1, dataMap) || x < 1; x++) {
        floorTiles.push(MK.getTileStack(x, 1, dataMap));
    }
    for (let x = 0; !MK.isCellEmpty(x, 2, dataMap) || x < 1; x++) {
        corridorTiles.push(MK.getTileStack(x, 2, dataMap));
    }
    
    // fill Map with black
    for (let x = 0; x < dataMap.width; x++) {
        for (let y = 0; y < dataMap.height; y++) {
            MK.setTileStack(x, y, dataMap, ceilingTile);
        }
    }

    function isOverlapping (rect1, rect2) {
        const b1 = rect1.x > rect2.x + rect2.width + 2;
        const b2 = rect2.x > rect1.x + rect1.width + 2;
        const b3 = rect1.y > rect2.y + rect2.height + 3;
        const b4 = rect2.y > rect1.y + rect2.height + 3;
        return !(b1 || b2 || b3 || b4);
    }

    function isAnyRectangleOverlapping (rect) {
        return rooms.some(rect2 => isOverlapping(rect, rect2));
    }

    let counter = 0;
    while (rooms.length < n_roomsToBuild) {
        let w1 = MK.rng.randomInteger(args.roomWidth[0], args.roomWidth[1]) - 1;
        let h1 = MK.rng.randomInteger(args.roomHeight[0], args.roomHeight[1]) - 1;
        let x  = MK.rng.randomInteger(5, dataMap.width - w1 - 5);
        let y  = MK.rng.randomInteger(5, dataMap.height - h1 - 5);
        let rect = new Rectangle(x, y, w1, h1);

        if (!args.allowOverlapping && isAnyRectangleOverlapping(rect)) {
            rooms.shift();
        } else {
            rooms.push(rect);
        }

        counter++;
        if (counter >= 9999)
            throw Error("Map generation failed. Please choose other arguments or make the Space Map larger");
    }

    const nodes = [];
    for (let room of rooms) {
        let center = { };
        center.x = Math.floor(room.width / 2) + room.x;
        center.y = Math.floor(room.height / 2) + room.y;
        nodes.push(center);
        for (let x = room.x; x <= room.x + room.width; x++) {
            for (let y = room.y; y <= room.y + room.height; y++) {
                matrix[x][y] = true;
            }
        }
    }

    // exits
    let exitTop, exitLeft, exitRight, exitBottom;
    if (args.exits.top) {
        let x = nodes[0].x;
        let y = nodes[0].y;
        for (let node of nodes) {
            if (node.y < y) { x = node.x; y = node.y }
        }
        exitTop = { x: x, y: 0 };
        nodes.push(exitTop);
        if (args.spawnLocationArguments[0] == "top")
            this.spawnLocation = { x: x, y: 1 };
    }
    if (args.exits.left) {
        let x = nodes[0].x;
        let y = nodes[0].y;
        for (let node of nodes) {
            if (node.x < x) { x = node.x; y = node.y }
        }
        exitLeft = { x: 0, y: y };
        nodes.push(exitLeft);
        if (args.spawnLocationArguments[0] == "left")
            this.spawnLocation = { x: 1, y: y };
    }
    if (args.exits.right) {
        let x = nodes[0].x;
        let y = nodes[0].y;
        for (let node of nodes) {
            if (node.x > x) { x = node.x; y = node.y }
        }
        exitRight = { x: dataMap.width - 1, y: y };
        nodes.push(exitRight);
        if (args.spawnLocationArguments[0] == "right")
            this.spawnLocation = { x: dataMap.width - 2, y: y };
    }
    if (args.exits.bottom) {
        let x = nodes[0].x;
        let y = nodes[0].y;
        for (let node of nodes) {
            if (node.y > y) { x = node.x; y = node.y }
        }
        exitBottom = { x: x, y: dataMap.height - 1 };
        nodes.push(exitBottom);
        if (args.spawnLocationArguments[0] == "bottom")
            this.spawnLocation = { x: x, y: dataMap.height - 2 };
    }
    

    // Corridors
    const edges = MK.kruskalMST(nodes);
    const n_randomEdges = MK.rng.randomInteger(args.n_randomEdges[0], args.n_randomEdges[1]);

    for (let i = 0; i < n_randomEdges; i++) {
        const edge = { start: MK.rng.pickRandom(nodes), dest: MK.rng.pickRandom(nodes) };
        edges.push(edge);
    }

    for (let edge of edges) {
        const path = [];
        const mode = MK.rng.threshold(0.5);
        const x1 = Math.min(edge.start.x, edge.dest.x);
        const x2 = Math.max(edge.start.x, edge.dest.x);
        const y_ = mode ? edge.start.y : edge.dest.y;
        const y1 = Math.min(edge.start.y, edge.dest.y);
        const y2 = Math.max(edge.start.y, edge.dest.y);
        const x_ = mode ? edge.dest.x : edge.start.x;

        for (let x = x1; x <= x2; x++) {
            path.push({ x: x, y: y_ });
        }
        for (let y = y1; y <= y2; y++) {
            path.push({ x: x_, y: y });
        }

        const path1 = MK.makePathBigger({
            path: path,
            thickness: MK.rng.randomInteger(args.thickness[0], args.thickness[1]),
            mode: "angular"
        });
        const path2 = MK.makePathBigger({
            path: path,
            thickness: 1,
            mode: "angular"
        });
        const corridorTile = MK.rng.pickRandom(corridorTiles);
        path1.forEach(point => MK.setTileStack(point.x, point.y, dataMap, corridorTile));
        path2.forEach(point => this.reservedMap[point.x][point.y] = true);
    }


    // draw Rooms
    for (let room of rooms) {
        const floorTile = MK.rng.pickRandom(floorTiles);
        for (let x = room.x; x < room.x + room.width + 1; x++) {
            for (let y = room.y; y < room.y + room.height + 1; y++) {
                MK.setTileStack(x, y, dataMap, floorTile);
            }
        }
        for (let x = room.x + 1; x < room.x + room.width; x++) {
            for (let y = room.y + 1; y < room.y + room.height; y++) {
                this.reservedMap[x][y] = true;
            }
        }
    }


    if (typeof args.spawnLocationArguments[0] == 'number'
            && typeof args.spawnLocationArguments[1] == 'number') {
        this.spawnLocation = { x: args.spawnLocationArguments[0], y: args.spawnLocationArguments[1] };
    }
    if (!this.spawnLocation)
        throw Error("Worldmap Generation does not support spawnLocation: " + args.spawnLocationArguments);

    return dataMap;
}