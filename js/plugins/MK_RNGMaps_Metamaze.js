/*:
 * @target MZ
 * @plugindesc [Tier 5] [1.23] RNGMaps Meta Maze
 * @author Aerosys
 * @url https://aerosys.blog
 * @base MK_RNGMaps_Addons
 * @orderAfter MK_RNGMaps_Addons
 * 
 * @help
 * You are not allowed to re-distribute this Plugin.
 * 
 * @endofhelp
 * 
 * 
 * ==============================================================================
 * COMMANDS
 * ==============================================================================
 * 
 * @command create
 * @text Create Meta Maze
 * 
 * @arg seed
 * @text Seed?
 * @type select
 * @option random
 * @option assign by Variable
 * @default random
 * 
 * @arg seedVariableId
 * @parent seed
 * @text Variable
 * @type variable
 * 
 * @arg _1
 * @text ----------
 * @default ----------
 * 
 * @arg type
 * @text Type
 * @type select
 * @option Grid
 * @option Maze
 * @option Imperfect Maze
 * @default Imperfect Maze
 * @desc Tip: For Tower, just pick "Grid" and set width to 1.
 * 
 * @arg w
 * @parent type
 * @text Width
 * @type number
 * @default 3
 * 
 * @arg h
 * @parent type
 * @text Height
 * @type number
 * @default 3
 * 
 * @arg imperfectMazeParams
 * @parent type
 * @text when: Imperfect Maze
 * @type struct<ClassicMazeParams>
 * @default {"cutOffDeadEnds":"1","mergeDeadEnds":"0.3"}
 * 
 * @arg _2
 * @text ----------
 * @default ----------
 * 
 * @arg exits
 * @text Exits
 * 
 * @arg hasExitTop
 * @parent exits
 * @text Exit Top?
 * @type boolean
 * @default true
 * 
 * @arg hasExitLeft
 * @parent exits
 * @text Exit Left?
 * @type boolean
 * @default false
 * 
 * @arg hasExitRight
 * @parent exits
 * @text Exit Right?
 * @type boolean
 * @default false
 * 
 * @arg hasExitBottom
 * @parent exits
 * @text Exit Bottom?
 * @type boolean
 * @default true
 * 
 * @arg _3
 * @text ----------
 * @default ----------
 * 
 * @arg enterAtMode
 * @text Enter at
 * @type select
 * @option by Direction
 * @option by X, Y Coordinates (fixed)
 * @option by X, Y Coordinates (Variables)
 * @default by Direction
 * 
 * @arg whenByDirection
 * @parent enterAtMode
 * @text when: by Direction
 * @type select
 * @option top
 * @option left
 * @option right
 * @option bottom
 * @default bottom
 * 
 * @arg whenXYFixed
 * @parent enterAtMode
 * @text when: X, Y (fixed)
 * @type struct<FixedXYCoordinates>
 * 
 * @arg whenXYVariables
 * @parent enterAtMode
 * @text when: X, Y (Variables)
 * @type struct<XYCoordinatesByVariables>
 * 
 * 
 * @command goTo
 * @text Go to
 * 
 * @arg direction
 * @text Direction
 * @type select
 * @option Top
 * @option Left
 * @option Right
 * @option Bottom
 * @default Top
 * 
 * 
 * @command transfer
 * @text Transfer
 * @desc Orders the Meta Maze to spawn the Player in a desired cell. You probably need to regenerate the Dungeon.
 * 
 * @arg x
 * @type variable
 * @default 1
 * 
 * @arg y
 * @type variable
 * @default 2
 * 
 * 
 * @command leaveMetaMaze
 * @text leave Meta Maze
 * @desc Call this method when the Player left the Meta Maze.
 * 
 * 
 * @command getVariableData
 * @text Get Data (Variables)
 * 
 * @arg data
 * @type select
 * @option Player X in MetaMaze
 * @option Player Y in MetaMaze
 * @option Meta Maze Width
 * @option Meta Maze Height
 * @default Player X in MetaMaze
 * 
 * @arg variableId
 * @text Variable to store into
 * @type variable
 * @default 1
 * 
 * 
 * @command getSwitchData
 * @text Get Data (Switches)
 * 
 * @arg data
 * @type select
 * @option is inside MetaMaze?
 * @option is outside MetaMaze?
 * @option has Exit Top?
 * @option has Exit Left?
 * @option has Exit Right?
 * @option has Exit Bottom?
 * @option has Inner Exit Top?
 * @option has Inner Exit Left?
 * @option has Inner Exit Right?
 * @option has Inner Exit Bottom?
 * @option has Main Exit Top?
 * @option has Main Exit Left?
 * @option has Main Exit Right?
 * @option has Main Exit Bottom?
 * @default is inside MetaMaze?
 * 
 * @arg switchId
 * @text Switch to store into
 * @type switch
 * @default 1
 */

/*~struct~ClassicMazeParams:
 *
 * @param cutOffDeadEnds
 * @type number
 * @default 1
 * @desc Every tunnel leading in a dead end, is shortened by n cells.
 * 
 * @param mergeDeadEnds
 * @type number
 * @decimals 2
 * @default 0.3
 * @desc A new corridor is built on every dead end by given chance.
 */

/*~struct~FixedXYCoordinates:
 *
 * @param x
 * @type number
 * @default 1
 * 
 * @param y
 * @type number
 * @default 1
 */

/*~struct~XYCoordinatesByVariables:
 *
 * @param x
 * @type variable
 * @default 1
 * 
 * @param y
 * @type variable
 * @default 1
 */

'use strict';

var Imported    = Imported || {};
var MK          = MK || {};
Imported.MK_RNGMaps_Metamaze = true;

if (!Imported.MK_RNGMaps_Addons)
    alert ("Missing Plugin: MK_RNGMaps_Addons");


(function(){

    const alias1 = AbstractMapGenerator.prototype.reset;
    AbstractMapGenerator.prototype.reset = function() {
        alias1.call(this);
        
        // Meta Maze
        if ($metaMaze.active) {
            this.setSeed($metaMaze.getSeedForCurrentPosition());
            this.setFloorId($metaMaze.getCurrentFloorId());
        }
    }

    /*
    const alias3 = AbstractMapGenerator.prototype.finalize;
    AbstractMapGenerator.prototype.finalize = function() {
        
        if (!this.spawnLocation && $metaMaze.active && $metaMaze.nextStartPosition)
            this.spawnPlayerAt($metaMaze.nextStartPosition, $metaMaze.getNextRegionId());
        
        alias3.call(this);
    }
    */

    // =====================================================================================
    // Save Actions
    // =====================================================================================
    const alias4 = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let contents = alias4.call(this);
        contents.MK = contents.MK || { };
        
        if ($metaMaze.active) {
            contents.MK.metaMaze = { };
            contents.MK.metaMaze = $metaMaze.temp;
        }
        return contents;
    }
    
    // =====================================================================================
    // Load Actions
    // =====================================================================================
    const alias5 = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        alias5.call(this, contents);

        if (contents.MK) {
            $metaMaze.active = !!contents.MK.metaMaze

            if (contents.MK.metaMaze)
                $metaMaze.temp = contents.MK.metaMaze;
        }
    }

    const alias10 = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        $metaMaze.active = false;
        alias10.call(this);
    }
})();


// =====================================================================================
// Meta Maze
// =====================================================================================

class RNGMaps_Meta {
    
    constructor() {
        this.temp = { };
    }

    reset() {
        this.active = false;
    }

    setSeed(seed) {
        MK.rng.setSeed(seed);
        this.temp.seed = seed;
        return this;
    }
    
    setRandomSeed() {
        MK.rng.noSeedableRNG();
        this.temp.seed = MK.rng.randomInteger(1, 20000);
        return this;
    }
    
    getSeedForCurrentPosition() {
        return MK.generateSeed(this.temp.seed, this.temp.currentPosition.x, this.temp.currentPosition.y);
    }

    getCurrentFloorId() {
        return "" + this.temp.currentPosition.x + "-" + this.temp.currentPosition.y;
    }

    getNextRegionId() {
        switch(this.nextStartPosition) {
            case 'top'      : return MK.NORTH_SPAWN_ID;
            case 'left'     : return MK.WEST_SPAWN_ID;
            case 'right'    : return MK.EAST_SPAWN_ID;
            case 'bottom'   : return MK.SOUTH_SPAWN_ID;
        }
    }
    
    applyMapParams(params) {
        this.active = true;
        this.temp.map = params.map;
        this.temp.exits = params.exits;
    }
    
    enterAt(arg1, arg2) {

        if (typeof arg1 == "number" && typeof arg2 == "number")
            return this.enterAtXY(arg1, arg2);
        
        if (typeof arg1 == "string")
            return this.enterAtDirection(arg1);
        
        throw Error("enterAt: arguments must be either (string) or (x, y), but were "
            + arg1 + " | " + arg2);
    }

    enterAtDirection(direction) {
        MK.requireNonNull(direction, "enterAt", "direction");
        direction = direction.toLowerCase();
        MK.requireToBeOneOfThese(direction, ["top", "left", "right", "bottom"],
            "enterAt", "direction");

        if (!this.temp.exits[direction])
            throw Error ("enterAt: Wanted to enter the Dungeon at "
                    + direction
                    + " but there was no entrance made here."
                    + "\nPlease call withExit before.");
        
        const x = this.temp.exits[direction].x;
        const y = this.temp.exits[direction].y;
        this.temp.currentPosition = {x: x, y: y};
        this.nextStartPosition = direction;
    }

    enterAtXY(x, y) {
        this.temp.currentPosition = { x: x, y: y };
        this.nextStartPosition = null;
    }
    
    areaType() {
        return this.temp.map[this.temp.currentPosition.x][this.temp.currentPosition.y];
    }

    hasMainExitTop() {
        return this.temp.exits.top
            && this.temp.exits.top.x == this.temp.currentPosition.x
            && this.temp.exits.top.y == this.temp.currentPosition.y;
    }

    hasMainExitRight() {
        return this.temp.exits.right
            && this.temp.exits.right.x == this.temp.currentPosition.x
            && this.temp.exits.right.y == this.temp.currentPosition.y;
    }

    hasMainExitBottom() {
        return this.temp.exits.bottom
            && this.temp.exits.bottom.x == this.temp.currentPosition.x
            && this.temp.exits.bottom.y == this.temp.currentPosition.y;
    }

    hasMainExitLeft() {
        return this.temp.exits.left
            && this.temp.exits.left.x == this.temp.currentPosition.x
            && this.temp.exits.left.y == this.temp.currentPosition.y;
    }

    hasMainExit(direction) {
        switch (direction) {
            case "top":     return this.hasMainExitTop();
            case "left":    return this.hasMainExitLeft();
            case "right":   return this.hasMainExitRight();
            case "bottom":  return this.hasMainExitBottom();
        }
        throw new Error("invalid arg: " + direction);
    }

    hasInnerExitTop() {
        return [1, 3, 5, 7, 9, 11, 13, 15].contains(this.areaType());
    }

    hasInnerExitRight() {
        return [2, 3, 6, 7, 10, 11, 14, 15].contains(this.areaType());
    }

    hasInnerExitBottom() {
        return [4, 5, 6, 7, 12, 13, 14, 15].contains(this.areaType());
    }

    hasInnerExitLeft() {
        return [8, 9, 10, 11, 12, 13, 14, 15].contains(this.areaType());
    }
    
    hasExitTop() {
        return this.hasInnerExitTop() || this.hasMainExitTop();
    }
    
    hasExitRight() {
        return this.hasInnerExitRight() || this.hasMainExitRight();
    }
    
    hasExitBottom() {
        return this.hasInnerExitBottom() || this.hasMainExitBottom();
    }
    
    hasExitLeft() {
        return this.hasInnerExitLeft() || this.hasMainExitLeft();
    }
    
    getPosition() {
        return this.temp.currentPosition;
    }

    goTo(direction) {
        MK.requireNonNull(direction, "goTo", "direction");
        direction = direction.toLowerCase();
        MK.requireToBeOneOfThese(direction, ["top", "left", "right", "bottom"], "goTo", "direction");

        if (direction == "top") {
            this.temp.currentPosition.y--;
            this.nextStartPosition = "bottom";
        }
        if (direction == "right") {
            this.temp.currentPosition.x++;
            this.nextStartPosition = "left";
        }
        if (direction == "bottom") {
            this.temp.currentPosition.y++;
            this.nextStartPosition = "top";
        }
        if (direction == "left") {
            this.temp.currentPosition.x--;
            this.nextStartPosition = "right";
        }
        this.resetIfLeft();
    }

    transfer(x, y) {
        MK.requireType(x, "number", "transfer", "x");
        MK.requireType(y, "number", "transfer", "y");

        this.temp.currentPosition = { x: x, y: y };
        this.nextStartPosition = null;
        return this;
    }

    leave() {
        this.reset();
    }

    getWidth()  { return this.temp.map.length    }
    getHeight() { return this.temp.map[0].length }
    
    isInsideMetaMaze() {
        if (!this.active) return false;
        const x = this.temp.currentPosition.x;
        const y = this.temp.currentPosition.y;
        const w = this.getWidth();
        const h = this.getHeight();
        return 0 <= x && x < w && 0 <= y && y < h;
    }
    
    hasLeftMetaMaze() {
        return !this.isInsideMetaMaze();
    }
    
    resetIfLeft() {
        if (this.hasLeftMetaMaze())
            this.reset();
    }

    tower(h) {
        return this.grid(1, h);
    }
    
    grid(w, h) {
        this.setSeed(MK.rng.randomInteger(0, 20000));
        return new RNGMaps_MetaParams(w, h).grid();
    }
    
    maze(w, h) {
        this.setSeed(MK.rng.randomInteger(0, 20000));
        return new RNGMaps_MetaParams(w, h).maze();
    }
    
    imperfectMaze(w, h, cutOffDeadEnds, mergeBackProbability) {
        this.setSeed(MK.rng.randomInteger(0, 20000));
        return new RNGMaps_MetaParams(w, h)
            .imperfectMaze(cutOffDeadEnds, mergeBackProbability);
    }
}

var $metaMaze = new RNGMaps_Meta();


// =====================================================================================
// Meta Maze DungeonGenerator Addons
// =====================================================================================

if (Imported.MK_RNGMaps_withSnippets) {

    DungeonGenerator.prototype.placeExits = function() {

        if (!$metaMaze.active)
            throw Error("placeExits: Meta Maze is not active");
        
        if ($metaMaze.hasExitTop())     this.placeExitOn('top');
        if ($metaMaze.hasExitLeft())    this.placeExitOn('left');
        if ($metaMaze.hasExitRight())   this.placeExitOn('right');
        if ($metaMaze.hasExitBottom())  this.placeExitOn('bottom');
        return this;
    }

    DungeonGenerator.prototype.makeWaysOut = function() {

        if (!$metaMaze.active)
            throw Error("makeWaysOut: Meta Maze is not active");
        
        if ($metaMaze.hasExitTop())     this.makeWayOut('top');
        if ($metaMaze.hasExitLeft())    this.makeWayOut('left');
        if ($metaMaze.hasExitRight())   this.makeWayOut('right');
        if ($metaMaze.hasExitBottom())  this.makeWayOut('bottom');
        return this;
    }

    DungeonGenerator.prototype.spawnPlayerAutomatically = function() {
        this.spawnPlayerAt($metaMaze.nextStartPosition);
        return this;
    }

    DungeonGeneratorTemplateParamBuilder.prototype.spawnPlayerAutomatically = function() {
        this.spawnPlayerAt($metaMaze.nextStartPosition);
        return this;
    }

    /*
    const alias = DungeonGenerator.prototype.executeTemplate;
    DungeonGenerator.prototype.executeTemplate = function(templateParam) {

        if ($metaMaze.active) {
            templateParam.exits.top     = $metaMaze.hasExitTop();
            templateParam.exits.left    = $metaMaze.hasExitLeft();
            templateParam.exits.right   = $metaMaze.hasExitRight();
            templateParam.exits.bottom  = $metaMaze.hasExitBottom();
        }
        alias.call(this, templateParam);
    }
    */
}

if (Imported.MK_RNGMaps_withoutSnippets) {
    
    CustomMapParamBuilder.prototype.spawnPlayerAutomatically = function() {
        this.spawnPlayerAt($metaMaze.nextStartPosition);
        return this;
    }

    MapGeneratorTemplateParamBuilder.prototype.spawnPlayerAutomatically = function() {
        this.spawnPlayerAt($metaMaze.nextStartPosition);
        return this;
    }

    const alias = MapGenerator.prototype.generate;
    MapGenerator.prototype.generate = function(f, args) {
        
        if ($metaMaze.active) {
            args.exits.top      = $metaMaze.hasExitTop();
            args.exits.left     = $metaMaze.hasExitLeft();
            args.exits.right    = $metaMaze.hasExitRight();
            args.exits.bottom   = $metaMaze.hasExitBottom();
        }
        return alias.call(this, f, args);
    }
}


RNGMaps_Meta.prototype.calculateXTimesMeta = function(regionId, min, max) {
    min = !min && min !== 0 ? 1 : min;
    max = max || min;
    
    const seed = MK.generateSeed(this.temp.seed, regionId);
    MK.rng.setSeed(seed);
    
    let n = MK.rng.randomInteger(min, max);
    const matrix = MK.createMatrix(this.getWidth(), this.getHeight());

    while (n > 0) {
        let x = MK.rng.randomInteger(0, this.getWidth() -1);
        let y = MK.rng.randomInteger(0, this.getHeight() -1);

        if (this.temp.map[x][y] == 0)
            continue;
        
        matrix[x][y] = matrix[x][y] + 1;
        n--;
    }
    return matrix[this.getPosition().x][this.getPosition().y];
}


AbstractMapGenerator.prototype.drawAssetMeta = function(f, regionId, min, max) {
    const n = $metaMaze.calculateXTimesMeta(regionId, min, max);
    if (n > 0) f.call(this, regionId, n);
    return this;
}

if (Imported.MK_RNGMaps_withSnippets) {
    DungeonGenerator.prototype.drawDecorationXTimesMeta = function(regionId, min, max) {
        return this.drawAssetMeta(this.drawDecorationXTimes, regionId, min, max);
    }
}

if (Imported.MK_RNGMaps_withoutSnippets) {
    MapGenerator.prototype.drawChestMeta = function(regionId, min, max) {
        return this.drawAssetMeta(this.drawChest, regionId, min, max);
    }

    MapGenerator.prototype.drawEnemyMeta = function(regionId, min, max) {
        return this.drawAssetMeta(this.drawEnemy, regionId, min, max);
    }

    MapGenerator.prototype.drawNPCMeta = function(regionId, min, max) {
        return this.drawAssetMeta(this.drawNPC, regionId, min, max);
    }

    MapGenerator.prototype.drawPOIMeta = function(regionId, min, max) {
        return this.drawAssetMeta(this.drawPOI, regionId, min, max);
    }

    MapGenerator.prototype.drawSwitchMeta = function(regionId, min, max) {
        return this.drawAssetMeta(this.drawSwitch, regionId, min, max);
    }

    MapGenerator.prototype.drawDecorationMeta = function(regionId, min, max) {
        return this.drawAssetMeta(this.drawDecoration, regionId, min, max);
    }
}


// =====================================================================================
// Meta Maze Params Builder
// =====================================================================================

class RNGMaps_MetaParams {
    
    constructor(w, h) {
        MK.requireNonNull(w, "Meta()", "w");
        MK.requireNonNull(h, "Meta()", "h");

        this.w = w;
        this.h = h;
        this.exits = {};
    }
    
    grid() {
        this.map = MK.createMatrix(this.w, this.h, 15);
        this.frame();
        return this;
    }

    maze() {
        this.map = MK.mazeAlgorithms.prims(this.w, this.h);
        return this;
    }

    imperfectMaze(cutOffDeadEnds, mergeBackProbability) {
        cutOffDeadEnds          = cutOffDeadEnds || 1;
        mergeBackProbability    = mergeBackProbability || 0.3;

        do {
            this.map = MK.mazeAlgorithms.prims(this.w, this.h);
            MK.mazeAlgorithms.mergeDeadEnds(this.map, mergeBackProbability);
            MK.mazeAlgorithms.cutOffDeadEnds(this.map, cutOffDeadEnds);
        
        } while (  this.getPossibleExits('top').length == 0
                || this.getPossibleExits('left').length == 0
                || this.getPossibleExits('right').length == 0
                || this.getPossibleExits('bottom').length == 0);
        return this;
    }
    
    frame() {
        
        // top & bottom
        for (let x = 0; x < this.w; x++) {
            this.map[x][0]          = this.map[x][0]            & 14;
            this.map[x][this.h - 1] = this.map[x][this.h - 1]   & 11;
        }
        
        // left & right
        for (let y = 0; y < this.h; y++) {
            this.map[0][y]          = this.map[0][y]            & 7;
            this.map[this.w - 1][y] = this.map[this.w - 1][y]   & 13;
        }
    }
    
    withExit(direction) {
        MK.requireNonNull(direction, "withExit", "direction");
        direction = direction.toLowerCase();
        MK.requireToBeOneOfThese(direction, ["top", "left", "right", "bottom"],
            "withExit", "direction");
            
        if (this.exits[direction])
            throw Error ("withExit: Exit at [" + direction + "] already defined!");
        
        let options           = this.getPossibleExits(direction);
        let option            = MK.rng.pickRandom(options);
        let x                 = option.x;
        let y                 = option.y;
        this.exits[direction] = option;

        let z;
        if (direction == "top")     z = 1;
        if (direction == "right")   z = 2;
        if (direction == "bottom")  z = 4;
        if (direction == "left")    z = 8;
        this.map[x][y] = this.map[x][y] | z;

        return this;
    }
    
    getPossibleExits(direction) {
        const options = [];
        
        if (direction == 'top') {
            for (let x = 0; x < this.w; x++) {
                if (this.map[x][0] != 0)
                    options.push({x: x, y: 0});
            }
        }
        
        if (direction == 'bottom') {
            for (let x = 0; x < this.w; x++) {
                if (this.map[x][this.h - 1] != 0)
                    options.push({x: x, y: this.h - 1});
            }
        }
        
        if (direction == 'left') {
            for (let y = 0; y < this.h; y++) {
                if (this.map[0][y] != 0)
                    options.push({x: 0, y: y});
            }
        }
        
        if (direction == 'right') {
            for (let y = 0; y < this.h; y++) {
                if (this.map[this.w - 1][y] != 0)
                    options.push({x: this.w - 1, y: y});
            }
        }
        
        return options;
    }
    
    apply() {
        $metaMaze.applyMapParams(this);
        return $metaMaze;
    }
}


// =====================================================================================
// Plugin Manager
// =====================================================================================

if (PluginManager && PluginManager.registerCommand) {
    
    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'create', args => {

        if ('assign by Variable' == args.seed) {
            if (!args.seedVariableId)
                throw Error("Create Meta Maze: Variable for Seed not given. Please set it in the Plugin Command.");
            
            const seedVariableId = Number(args.seedVariableId) || 1;
            const seed = $gameVariables.value(seedVariableId);
            $metaMaze.setSeed(seed);
        } else {
            $metaMaze.setRandomSeed();
        }

        const w = Number(args.w || 1);
        const h = Number(args.h || 1);
        let builder;
        switch (args.type) {
            
            case 'Grid':
                builder = $metaMaze.grid(w, h);
                break;
            
            case 'Maze':
                builder = $metaMaze.maze(w, h);
                break;
            
            case 'Imperfect Maze':
                const parsed = JSON.parse(args.imperfectMazeParams);
                const cutOffDeadEnds = Number(parsed.cutOffDeadEnds);
                const mergeDeadEnds = Number(parsed.mergeDeadEnds);
                builder = $metaMaze.imperfectMaze(w, h, cutOffDeadEnds, mergeDeadEnds);
                break;
        }
        
        if ('true' == args.hasExitTop)      builder.withExit('top');
        if ('true' == args.hasExitLeft)     builder.withExit('left');
        if ('true' == args.hasExitRight)    builder.withExit('right');
        if ('true' == args.hasExitBottom)   builder.withExit('bottom');

        builder = builder.apply();

        if ('by Direction' == args.enterAtMode) {
            builder.enterAt(args.whenByDirection);
        }
        
        if ('by X, Y Coordinates (fixed)' == args.enterAtMode) {
            if (!args.whenXYFixed)
                throw Error("Create Meta Maze: X, Y Coordinates missing. Please set them in the Plugin Command.");
            
            const parsed = JSON.parse(args.whenXYFixed);
            const x = Number(parsed.x);
            const y = Number(parsed.y);
            builder.enterAt(x, y);
        }
        
        if ('by X, Y Coordinates (Variables)' == args.enterAtMode) {
            if (!args.whenXYVariables)
                throw Error("Create Meta Maze: X, Y Coordinates missing. Please set them in the Plugin Command.");
            
            const parsed = JSON.parse(args.whenXYVariables);
            const x = $gameVariables.value(Number(parsed.x));
            const y = $gameVariables.value(Number(parsed.y));
            builder.enterAt(x, y);
        }

    });

    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'goTo', args => {
        $metaMaze.goTo(args.direction);
    });

    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'transfer', args => {
        const x = $gameVariables.value(Number(args.x));
        const y = $gameVariables.value(Number(args.y));
        $metaMaze.transfer(x, y);
    });

    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'leaveMetaMaze', _ => {
        $metaMaze.reset();
    });
    
    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'getVariableData', args => {
        let value;
        switch(args.data) {
            case 'Player X in MetaMaze' : value = $metaMaze.temp.currentPosition.x;     break;
            case 'Player Y in MetaMaze' : value = $metaMaze.temp.currentPosition.y;     break;
            case 'Meta Maze Width'      : value = $metaMaze.getWidth();                 break;
            case 'Meta Maze Height'     : value = $metaMaze.getHeight();                break;
        }
        $gameVariables.setValue(Number(args.variableId), value);
    });
    
    PluginManager.registerCommand('MK_RNGMaps_Metamaze', 'getSwitchData', args => {
        let value;
        switch(args.data) {
            case 'is inside MetaMaze?'      : value = $metaMaze.isInsideMetaMaze();         break;
            case 'is outside MetaMaze?'     : value = $metaMaze.hasLeftMetaMaze();          break;
            case 'has Exit Top?'            : value = $metaMaze.hasExitTop();               break;
            case 'has Exit Left?'           : value = $metaMaze.hasExitLeft();              break;
            case 'has Exit Right?'          : value = $metaMaze.hasExitRight();             break;
            case 'has Exit Bottom?'         : value = $metaMaze.hasExitBottom();            break;
            case 'has Inner Exit Top?'      : value = $metaMaze.hasInnerExitTop();          break;
            case 'has Inner Exit Left?'     : value = $metaMaze.hasInnerExitLeft();         break;
            case 'has Inner Exit Right?'    : value = $metaMaze.hasInnerExitRight();        break;
            case 'has Inner Exit Bottom?'   : value = $metaMaze.hasInnerExitBottom();       break;
            case 'has Main Exit Top?'       : value = $metaMaze.hasMainExitTop();           break;
            case 'has Main Exit Left?'      : value = $metaMaze.hasMainExitLeft();          break;
            case 'has Main Exit Right?'     : value = $metaMaze.hasMainExitRight();         break;
            case 'has Main Exit Bottom?'    : value = $metaMaze.hasMainExitBottom();        break;
        }
        $gameSwitches.setValue(Number(args.switchId), value);
    });
}