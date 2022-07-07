/*:
 * @target MZ
 * @plugindesc [Tier 0] [Version 1.3] (please read the License Part 1)
 * @author Aerosys
 * @url https://aerosys.blog
 * @
 * 
 * @help
 * This Plugin provides some functionality used by Aerosys' Plugins.
 * 
 * RULES:
 * 1. You are not allowed to re-distribute my plugins
 * 2. One exception: Due to the nature of JavaScript, it's okay when you release
 *    your game.
 * 3. When several people work on the same project, it's not required to purchase
 *    a license for everyone.
 *    But that not does mean, that anyone gets a copy for free for their
 *    own needs.
 * 4. You are allowed to modify readable source code for your own needs, but you
 *    are not allowed to re-distribute your changes (e.g. as a plugin).
 * 5. You are not allowed to de-obfuscate obfuscated code.
 * 
 * 
 * @param overrideCommand355
 * @text Override RPG Maker Code to execute JavaScript
 * @desc If active, RPG Maker's code is overwritten to "append" multiple JavaScript Calls.
 * @type boolean
 * @default true
 * 
 */

'use strict';

var MK = MK || { };
MK.alias = MK.alias || { };

var Imported = Imported || { };
Imported.MK_Core = true;

var params = PluginManager.parameters('MK_Core');
MK.overrideCommand355 = "true" == params.overrideCommand355;

// =====================================================================================
// 3rd Party Plugin Support
// =====================================================================================

MK.mv3d = typeof mv3d !== 'undefined';
MK.mz3d = typeof mz3d !== 'undefined';

MK.thirdPartySupport = { };
MK.thirdPartySupport.beforeMapLoaded = function() {
    
    // MV3D & MZ3D
    if (typeof mv3d !== 'undefined' && !MK.mv3d)
        throw Error("MV3D must be ordered BEFORE RNGMaps in the Plugin Manager");
    if (typeof mz3d !== 'undefined' && !MK.mz3d)
        throw Error("MZ3D must be ordered BEFORE RNGMaps in the Plugin Manager");

    if (typeof mv3d !== 'undefined') {
        mv3d.mapReady = false;
        mv3d.needClearMap = true;
        mv3d.mapLoaded = false;
    }
    if (typeof mz3d !== 'undefined') {
        mz3d.mapReady = false;
        mz3d.needClearMap = true;
        mz3d.mapLoaded = false;
    }

    // Alpha ABS
    if (typeof AlphaABS !== 'undefined') {
        AlphaABS.BattleManagerABS._isABSMap = false;
    }

    // AltimitMovement
    if ($gameSystem._eventColliders && $gameSystem._eventColliders[$gameMap.mapId()]) {
        $gameSystem._eventColliders[$gameMap.mapId()] = [];
    }
    const cacheName = 'cache_mesh%1'.format($gameMap.mapId().padZero(3))
    if (StorageManager.exists(cacheName)) {
        StorageManager.remove(cacheName);
    }
}

MK.thirdPartySupport.afterMapLoaded = function() {
    // not yet used
}


// =====================================================================================
// MV: Override Game Interpreter JS Call
// =====================================================================================

if (MK.overrideCommand355) {

    Game_Interpreter.prototype.command355 = function() {
        let script = this.currentCommand().parameters[0] + '\n';
        while (this.nextEventCode() === 355 || this.nextEventCode() === 655) {
            this._index++;
            script += this.currentCommand().parameters[0] + '\n';
        }
        eval(script);
        return true;
    }
}


// =====================================================================================
// MK methods
// =====================================================================================

MK.array = function(n, initialValue = 0) {
    const array = new Array(n);
    for (let i = 0; i < n; i++) { array[i] = initialValue; }
    return array;
}

MK.arrange = function(a, b) {
    MK.requireNonNull(a, "MK.arrange", "a");
    
    const x = b !== undefined ? a : 0;
    const y = b !== undefined ? b : a;
    const n = y - x;
    const toReturn = MK.array(n);
    
    for (let i = 0; i < n; i++) { toReturn[i] = i + x; }
    return toReturn;
}

MK.createMatrix = function(w, h, initialValue) {
    return MK.arrange(w).map(_ => MK.array(h, initialValue));
}

MK.matrixForEach = function(matrix, f) {
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            matrix[x][y] = f.call(this, x, y);
        }
    }
    return matrix;
}

MK.refineToHeightMap = function (noiseMap, array) {
    MK.requireNonNull(noiseMap, "MK.refineToHeightMap", "noiseMap");
    MK.requireNonNull(array, "MK.refineToHeightMap", "array");

    const w = noiseMap.length;
    const h = noiseMap[0].length;
    const matrix = MK.createMatrix(w, h);

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            matrix[x][y] = MK.getHeightLevel(noiseMap[x][y], array);
        }
    }
    return matrix;
}

MK.getHeightLevel = function(value, array) {
    MK.requireNonNull(value, "MK.getHeightLevel", "value");
    MK.requireNonNull(array, "MK.getHeightLevel", "array");
    
    const index = MK.arrange(array.length).findIndex(i => value < array[i]);
    return index != -1 ? index : array.length;
}

MK.flatten = function(matrix)  {
    return [].concat.apply([], matrix);
}

MK.calculateArray = function(noiseMap, n_levels) {
    MK.requireNonNull(noiseMap, "MK.calculateArray", "noiseMap");
    MK.requireNonNull(n_levels, "MK.calculateArray", "n_levels");
    
    const flatten = MK.flatten(noiseMap);
    flatten.sort();

    const array = [];
    for (let i = 1; i < n_levels; i++) {
        let q       = i * (1.0 / n_levels);
        let index   = Math.floor(q * flatten.length);
        array.push(flatten[index]);
    }
    return array;
}

MK.getAttributeIgnoreCase = function(object, attributeName) {
    for (let attr in object) {
        if (attr.toLowerCase() == attributeName.toLowerCase())
            return object[attr];
    }
    return undefined;
}

MK.requireNonNull = function(object, functionName, argumentName) {
    if (object == null || object == undefined)
        throw Error("Function Call \"" + functionName + "\" missing argument: " + argumentName);
}

MK.requireType = function(object, type, functionName, argumentName) {
    if (typeof object !== type)
        throw Error("Function Call \""
            + functionName
            + "\" argument \""
            + argumentName
            + "\" must be type "
            + type
            + " but was "
            + typeof object 
            + " (" + object + ")"
        )
}

MK.requireToBeOneOfThese = function(object, values, functionName, argumentName) {
    if (!values.contains(object))
        throw Error("Function Call \""
            + functionName
            + "\" argument \""
            + argumentName
            + "\" must be one of these: "
            + values
            + ", but was: "
            + object);
}

MK.requireElseThrow = function(f, errorMessage) {
    const success = typeof f == 'function' ? f.call(this) : f;
    if (!success)
        throw Error(errorMessage);
}

MK.requireNonEmpty = function(array) {
    MK.requireNonNull(array, "requireNonEmpty", "array");
    MK.requireElseThrow(array.length > 0, "array can't be empty");
}

MK.assertTrue = function(actual) {
    if (!actual)
        throw Error("MK Util Test failed\nexpected true but was false");
}

MK.assertFalse = function(actual) {
    if (!!actual)
        throw Error("MK Util Test failed\nexpected false but was true");
}

// Alias
MK.alias.event = Game_Event.prototype.event;
Game_Event.prototype.event = function() {
    const toReturn = MK.alias.event.call(this);

    if (!toReturn) {
        const dataMapInfo = $dataMapInfos[$gameMap.mapId()];
        const text = dataMapInfo
            ? "Map Name (retrieved from RPG Maker's code): " + dataMapInfo.name
            : "Map Id is " + $gameMap.mapId() + " but this Map is not defined!";
        console.error(text);
        console.error("$dataMap.events -> ");
        console.error($dataMap.events);
        console.error("$gameMap.events() -> ");
        console.error($gameMap.events());
        console.error("$gameMap._events -> ");
        console.error($gameMap._events);

        throw Error ("FATAL: Wanted to access Event '" + this._eventId
            + "' but it does not exist in $dataMap.events!\n"
            + "Open Debug Console for details.");
    }
    return toReturn;
};

MK.onUsePremiumFunctionAlert = function(functionName) {
    alert("The function \"" + functionName + "\" is only available in the Full Version\n"
        + "Please add MK_RNGMaps_Addons");
    SceneManager.exit();
}


// =====================================================================================
// DataManager
// =====================================================================================

MK.maps             = { };
MK.additionalMaps   = { };
MK.n_mapsLoading    = 0;

MK.injectDataMap = function(dataMap, spawnX, spawnY) {
    
    if (!dataMap) throw Error("FATAL: dataMap required!");
    spawnX = spawnX || $gamePlayer.x;
    spawnY = spawnY || $gamePlayer.y;
    const mapId = $gameMap.mapId();

    MK.injectedMapId    = mapId;
    MK.injectedDataMap  = dataMap;
    MK.requestMapRefresh();
    
    $gamePlayer.requestMapReload();
    $gameMap.requestRefresh();
    $gameMap.events().forEach(event => event.erase());
    $gamePlayer.reserveTransfer(mapId, spawnX, spawnY, 0, 2);
}

// Alias
MK.alias.loadMapData = DataManager.loadMapData;
DataManager.loadMapData = function(mapId) {
    
    if (MK.injectedMapId != mapId)
        MK.onLeaveInjectedMap();
    
    MK.alias.loadMapData.call(this, mapId);
    MK.loadChildMaps(mapId);
}

MK.onLeaveInjectedMap = function() {
    MK.injectedMapId = null;
    MK.injectedDataMap = null;
}

// Alias
MK.alias.onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
    
    if (MK.injectedDataMap)         $dataMap = MK.injectedDataMap;
    if (MK.isMapRefreshRequired())  MK.thirdPartySupport.beforeMapLoaded();
    
    MK.alias.onMapLoaded.call(this);

    if (MK.isMapRefreshRequired())  MK.thirdPartySupport.afterMapLoaded();
    MK._isRefreshRequired = false;
}

MK.requestMapRefresh = function() {
    this._isRefreshRequired = true;
}

MK.isMapRefreshRequired = function() {
    return !!this._isRefreshRequired;
}

MK.loadChildMaps = function(mapId) {
    MK.requireNonNull(mapId, "loadChildMaps", "mapId");
    
    MK.additionalMaps = {};

    const mapInfo = $dataMapInfos.find(mapInfo => mapInfo && mapInfo.id == mapId);
    const parentId = mapInfo && mapInfo.parent ? mapInfo.parent : 0;
    const additionalMapIds = $dataMapInfos
        .filter(mapInfo => mapInfo)
        .filter(mapInfo => [mapId, parentId].contains(mapInfo.parentId))
        .filter(mapInfo => MK.isMapIncluded(mapInfo.name));
    
    for (let mapInfo of additionalMapIds) {
        MK.loadAdditionalMap(mapInfo.name.toLowerCase(), mapInfo.id);
    }
}

MK.isMapIncluded = function(mapName) {
    return mapName.toLowerCase().startsWith("snippets") || mapName.toLowerCase() == "assets";
}

MK.loadAdditionalMap = function(name, mapId) {
	const xhr = new XMLHttpRequest();
	const url = 'data/Map%1.json'.format(mapId.padZero(3));
	xhr.open('GET', url);
	xhr.overrideMimeType('application/json');
	xhr.onload = function() {
		if (xhr.status < 400) {
            var data = JSON.parse(xhr.responseText);
            data.isAdditionalMap = true;
            
            data.events
                .filter(e => e && e.note)
                .forEach(e => DataManager.extractMetadata(e));
            
            MK.additionalMaps[name] = data;
            MK.n_mapsLoading -= 1;
		}
	}
	xhr.onerror = this._mapLoader || function() {
		DataManager._errorUrl = DataManager._errorUrl || url;
	}
	MK.additionalMaps[name] = null;
	MK.n_mapsLoading++;
	xhr.send();
};

// Alias
MK.alias.isMapLoaded = DataManager.isMapLoaded;
DataManager.isMapLoaded = function() {
	return MK.alias.isMapLoaded.call(this)
        && MK.n_mapsLoading == 0;
};

MK.getAdditionalMap = function(mapName) {
    MK.requireNonNull(mapName, "MK.getAdditionalMap", "mapName");

    const toReturn = MK.additionalMaps[mapName.toLowerCase()];
    if (!toReturn)
        throw Error("Map \"" + mapName + "\" does not exist!");
    
    return toReturn;
}

MK.existsAdditionalMap = function(mapName) {
    MK.requireNonNull(mapName, "existsAdditionalMap", "mapName");
    return !!MK.additionalMaps[mapName.toLowerCase()];
}

MK.getMapFromDisk = function(mapId) {
    mapId = mapId || $gameMap.mapId();
    
    if (MK.maps[mapId]) return MK.maps[mapId];

    MK.maps[mapId] = MK.loadMapSync(mapId);
    return MK.maps[mapId];
}

MK.loadMapSync = function(mapId) {
    const xhr = new XMLHttpRequest();
	const url = 'data/Map%1.json'.format(mapId.padZero(3));
    xhr.open('GET', url, false);
	xhr.overrideMimeType('application/json');
	xhr.send(null);
    
    const data = JSON.parse(xhr.responseText);
    DataManager.extractMetadata(data);
    data.events
        .filter(e => e && e.note)
        .forEach(e => DataManager.extractMetadata(e));
    return data;
}


// =====================================================================================
// Map Reading and Manipulation
// =====================================================================================

MK.isValid = function(x, y, matrix) {
    const w = matrix.length;
    const h = matrix.length > 0 ? matrix[0].length : 0;
    return 0 <= x && x < w && 0 <= y && y <= h;
}

MK.index = function(x, y, z, dataMap) {
    MK.requireNonNull(dataMap, "MK.index", "dataMap");
    const w = dataMap.width;
    const h = dataMap.height;
    return (z * w * h) + (y * w) + x;
}

MK.tile = function(x, y, z, dataMap) {
    MK.requireNonNull(dataMap, "MK.tile", "dataMap");
    const loc = MK.index(x, y, z, dataMap);
    return dataMap.data[loc] || 0;
}

MK.analyzeTileId = function(tileId) {
    let sheet;
    if (Tilemap.isTileA1(tileId))       sheet = 'A1';
    if (Tilemap.isTileA2(tileId))       sheet = 'A2';
    if (Tilemap.isTileA3(tileId))       sheet = 'A3';
    if (Tilemap.isTileA4(tileId))       sheet = 'A4';
    if (Tilemap.isTileA5(tileId))       sheet = 'A5';
    if (!Tilemap.isAutotile(tileId))    sheet = 'B';
    if (!sheet)                         sheet = '???';

    const kind = MK.getTileKind(tileId);
    const x = kind % 8;
    const y = kind / 8;

    return { kind: kind, sheet: sheet, x: x, y: y };
}

MK.tileFromEditorsTable = function(sheet, x, y) {
    MK.requireNonNull(sheet, "MK.tileFromEditorsTable", "sheet");
    MK.requireNonNull(x, "MK.tileFromEditorsTable", "x");
    MK.requireNonNull(y, "MK.tileFromEditorsTable", "y");

    if ('A1' == sheet)  y += 0;
    if ('A2' == sheet)  y += 2;
    if ('A3' == sheet)  y += 6;
    if ('A4' == sheet)  y += 10;
    if ('A5' == sheet)  y += 192;
    if ('B'  == sheet)  y += 0;
    if ('C'  == sheet)  y += 32;
    if ('D'  == sheet)  y += 64;
    if ('E'  == sheet)  y += 96;

    const index = 8 * y + x;
    return ['A1', 'A2', 'A3', 'A4'].contains(sheet)
        ? Tilemap.makeAutotileId(index, 0)
        : index;
}

MK.setTile = function(x, y, z, dataMap, tileId) {
    MK.requireNonNull(dataMap, "MK.setTile", "dataMap");
    MK.requireNonNull(tileId, "MK.setTile", "tileId");
    
    const loc = MK.index(x, y, z, dataMap);
    dataMap.data[loc] = tileId;
}

MK.regionId = function(x, y, dataMap) {
    MK.requireNonNull(dataMap, "MK.regionId", "dataMap");
    return MK.tile(x, y, 5, dataMap);
}

MK.setRegionId = function(x, y, dataMap, regionId) {
    MK.setTile(x, y, 5, dataMap, regionId);
}

MK.isCellEmpty = function(x, y, dataMap) {
    MK.requireNonNull(dataMap, "MK.isCellEmpty", "dataMap");
    return MK.isTileStackEmpty(MK.getTileStack(x, y, dataMap));
}

MK.isTileStackEmpty = function(stack) {
    return stack.every(id => id == 0);
}

MK.isAreaEmpty = function(x, y, w, h, dataMap) {
    MK.requireNonNull(dataMap, "MK.isAreaEmpty", "dataMap");

    for (let x_ = x; x_ < x + w; x_++) {
        for (let y_ = y; y_ < y + h; y_++) {
            if (!MK.isCellEmpty(x_, y_, dataMap))
                return false;
        }
    }
    return !MK.isAnyEventInThisArea(x, y, w, h, dataMap);
}

MK.getTileStack = function(x, y, dataMap) {
    MK.requireNonNull(dataMap, "MK.getTileStack", "dataMap");
    return MK.arrange(6).map(z => MK.tile(x, y, z, dataMap));
}

MK.getTileKind = function(tileId) {
    return Tilemap.isAutotile(tileId) ? Tilemap.getAutotileKind(tileId) : tileId;
}

MK.unifyTileStack = function(tileStack) {
    MK.requireNonNull(tileStack, "MK.unifyTileStack", "tileStack");
    
    return [
        MK.getTileKind(tileStack[0]),   // A-Layer
        MK.getTileKind(tileStack[1]),   // A-Layer
        MK.getTileKind(tileStack[2]),   // B-Layer
        MK.getTileKind(tileStack[3]),   // B-Layer
        0,                              // Shadows
        tileStack[5]                    // Region Id
    ];
}

MK.equalArrays = function(array1, array2) {
    MK.requireNonNull(array1, "MK.equalArrays", "array1");
    MK.requireNonNull(array2, "MK.equalArrays", "array2");

    if (array1 === array2) return true;
    if (array1.length !== array2.length) return false;
    
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] != array2[i]) return false;
    }
    return true;
}

MK.equalTileStacks = function(stack1, stack2) {
    const unified1 = MK.unifyTileStack(stack1);
    const unified2 = MK.unifyTileStack(stack2);
    return MK.equalArrays(unified1, unified2);
}

MK.setTileStack = function(x, y, dataMap, stack) {
    MK.requireNonNull(dataMap, "MK.setTileStack", "dataMap");
    MK.requireNonNull(stack, "MK.setTileStack", "stack");

    for (let z = 0; z < 6; z++) {
        MK.setTile(x, y, z, dataMap, stack[z]);
    }
}

MK.isAnyEventInThisArea = function(x, y, w, h, dataMap) {
    MK.requireNonNull(dataMap, "MK.isAnyEventInThisArea", "dataMap");

    const x2 = x + w;
    const y2 = y + h;
    return dataMap.events
        .filter(event => !!event)
        .filter(event => x <= event.x && event.x < x2 && y <= event.y && event.y < y2)
        .length > 0;
}

MK.copyTileStack = function(from_x, from_y, to_x, to_y, source, target) {
    MK.requireNonNull(source, "MK.copyTileStack", "source");
    MK.requireNonNull(target, "MK.copyTileStack", "target");

    const tileStack = MK.getTileStack(from_x, from_y, source);
    MK.safelyPasteTileStack(to_x, to_y, target, tileStack);
}

MK.safelyPasteTileStack = function(to_x, to_y, target, tileStack) {
    const target_loc0 = MK.index(to_x, to_y, 0, target);
    const target_loc1 = MK.index(to_x, to_y, 1, target);
    const target_loc2 = MK.index(to_x, to_y, 2, target);
    const target_loc3 = MK.index(to_x, to_y, 3, target);
    const target_loc5 = MK.index(to_x, to_y, 5, target);

    // Ground Layer
    if (tileStack[0]) {
        target.data[target_loc0] = tileStack[0];
        target.data[target_loc1] = tileStack[1];
    }
    if (tileStack[1]) {
        target.data[target_loc1] = tileStack[1];
    }
    
    // B-Layer
    if (tileStack[2] && tileStack[3]) {
        target.data[target_loc2] = tileStack[2];
        target.data[target_loc3] = tileStack[3];
    }
    if (tileStack[2] && !tileStack[3]) {
        if (target.data[target_loc3])
            target.data[target_loc2] = target.data[target_loc3]
        target.data[target_loc3] = tileStack[2];
    }
    if (!tileStack[2] && tileStack[3]) {
        if (target.data[target_loc3])
            target.data[target_loc2] = target.data[target_loc3]
        target.data[target_loc3] = tileStack[3];
    }

    // Regions
    target.data[target_loc5] = tileStack[5];
}

MK.copyTiles = function(from_x, from_y, w, h, to_x, to_y, source, target) {
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            MK.copyTileStack(from_x + x, from_y + y, to_x + x, to_y + y, source, target);
        }
    }
}

MK.eraseLayer = function(dataMap, z) {
    for (let x = 0; x < dataMap.width; x++) {
        for (let y = 0; y < dataMap.height; y++) {
            MK.setTile(x, y, z, dataMap, 0);
        }
    }
}

MK.eraseRegionId = function(dataMap, regionId) {
    for (let x = 0; x < dataMap.width; x++) {
        for (let y = 0; y < dataMap.height; y++) {
            if (MK.regionId(x, y, dataMap) == regionId)
                MK.setRegionId(x, y, dataMap, 0);
        }
    }
}

MK.eraseRegionIds = function(dataMap, ids) {
    ids.forEach(regionId => MK.eraseRegionId(dataMap, regionId));
}

MK.eraseShadows = function(dataMap) {
    MK.eraseLayer(dataMap, 4);
}

MK.getEventFromXY = function(x, y, dataMap) {
    return dataMap.events.find(event => !!event && x == event.x && y == event.y);
}

MK.existsEventAtXY = function(x, y, dataMap) {
    return !!dataMap.events.find(event => !!event && x == event.x && y == event.y);
}

MK.cloneEventFromXY = function(from_x, from_y, to_x, to_y, source, target) {
    const event = MK.getEventFromXY(from_x, from_y, source);
    
    if (event)
        MK.cloneEvent(to_x, to_y, target, event);
}

MK.cloneEvent = function(to_x, to_y, dataMap, event) {
    MK.requireNonNull(dataMap, "MK.cloneEvent", "dataMap");
    MK.requireNonNull(event, "MK.cloneEvent", "event");

    const next_id = MK.getNextEventId(dataMap);

    if (dataMap.events[next_id])
        throw Error("FATAL: Wanted to clone Event with new Id " + next_id + " but the dataMap has already stored this id.\n"
         + "This could be caused by 3rd Party Plugins that have Event Clone Systems.")

    const eventData = JsonEx.makeDeepCopy(event);
    eventData.id    = next_id;
    eventData.x     = to_x;
    eventData.y     = to_y;
    dataMap.events[next_id] = eventData;
    MK.refreshSelfSwitchesForEvent(eventData.id);
}

MK.getNextEventId = function(dataMap) {
    return dataMap.events.length;
}

MK.refreshSelfSwitchesForEvent = function(eventId) {
    $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'A'], false);
    $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'B'], false);
    $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'C'], false);
    $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'D'], false);
}

MK.cloneEvents = function(from_x, from_y, w, h, to_x, to_y, source, target) {
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            MK.cloneEventFromXY(from_x + x, from_y + y, to_x + x, to_y + y, source, target);
        }
    }
}

MK.isPassable = function(x, y, dataMap) {
    const event = MK.getEventFromXY(x, y, dataMap);
    return MK.isPassableTiles(x, y, dataMap) && (!event || MK.isEventPassable(event));
}

MK.isPassableTiles = function(x, y, dataMap) {
    return MK.isPassableTileStack(MK.getTileStack(x, y, dataMap));
}

MK.isPassableTileStack = function(tileStack) {
    for (let i = 0; i < 4; i++) {
        const tile = tileStack[3 - i];
        const flag = $gameMap.tilesetFlags()[tile];

        if ((flag & 0x10) != 0)     // [*] No effect on passage
            continue;
        return (flag & 0x0f) == 0;  // [O] and [X]
    }
    return false;
}

MK.isEventPassable = function(event) {
    event.pages.every(page => page.through);
}

MK.isAreaPassable = function(x, y, w, h, dataMap) {
    for (let x_ = 0; x_ < w; x_++) {
        for (let y_ = 0; y_ < h; y_++) {
            if (!MK.isPassable(x + x_, y + y_, dataMap))
                return false;
        }
    }
    return true;
}

MK.updateAllAutoTiles = function(dataMap) {
    MK.requireNonNull(dataMap, "updateAllAutoTiles", "dataMap");

    function isValid(x, y) {
        return 0 <= x && x < dataMap.width && 0 <= y && y < dataMap.height;
    }

    function applyLoopX(x) {
        return $gameMap.isLoopHorizontal() ? (x + dataMap.width) % dataMap.width : x;
    }

    function applyLoopY(y) {
        return $gameMap.isLoopVertical()   ? (y + dataMap.height) % dataMap.height : y;
    }

    /*
    * returns FALSE when other autotile is same as given one, TRUE otherwise
    */
    function autotileEdge(tileId, x, y, z) {
        x = applyLoopX(x);
        y = applyLoopY(y);

        return isValid(x, y) && !Tilemap.isSameKindTile(tileId, MK.tile(x, y, z, dataMap));
    }

    /*
    * returns FALSE when other autotile is same as given one, TRUE otherwise
    */
    function autotileWallEdge(tileId, source_x, source_y, x, y, z) {
        source_x    = applyLoopX(source_x);
        source_y    = applyLoopY(source_y);
        x           = applyLoopX(x);
        y           = applyLoopY(y);

        if (!isValid(x, y)) return false;

        const isDifferent   = autotileEdge(tileId, x, y, z);
        const isTop         = Tilemap.getAutotileKind(tileId) - 8
                                == Tilemap.getAutotileKind(MK.tile(x, y, z, dataMap));
        const top1          = getTopOrBottomIndex(source_x, source_y, z, -1);
        const top2          = getTopOrBottomIndex(x, y, z, -1);

        return (isDifferent || top1 > top2) && !isTop;
    }

    function getTopOrBottomIndex(x, y, z, dir) {
        const startTile = MK.tile(x, y, z, dataMap);

        if (Tilemap.isWaterfallTile(startTile)) {
            while (isValid(x, y) && Tilemap.isWaterfallTile(MK.tile(x, y, z, dataMap))) {
                y += dir;
            }
            return y;
        }

        while (isValid(x, y) && Tilemap.isSameKindTile(startTile, MK.tile(x, y, z, dataMap))) {
            y += dir;
        }
        return y;
    };

    /*
    * Returns shape by given 'left' and 'right'
    */
    function waterfallAutotileShape(l, r) {
        let edge = 0;
        if(l)   edge += 1;
        if(r)   edge += 2;
        return edge;
    };

    /*
    * Returns shape by given 4 direction input
    */
    function wallTopAutotileShape(u, d, l, r) {
        let edge = 0;
        if(l)   edge += 1;
        if(u)   edge += 2;
        if(r)   edge += 4;
        if(d)   edge += 8;
        return edge;
    };

    /*
    * Returns index by given 8 direction input
    */
    function normalAutotileShape(u, d, l, r, ul, ur, dl, dr) {
        let edge = 0;
        
        if(l)   edge += 1;
        if(u)   edge += 2;
        if(r)   edge += 4;
        if(d)   edge += 8;
        
        let corner = 0;
        switch(edge) {
            case 0:
                if(ul)  corner += 1;
                if(ur)  corner += 2;
                if(dr)  corner += 4;
                if(dl)  corner += 8;
                return  corner;
            
            case 1:
                if(ur)  corner += 1;
                if(dr)  corner += 2;
                return  16 + corner;
            
            case 2:
                if(dr)  corner += 1;
                if(dl)  corner += 2;
                return  20 + corner;
        
            case 4:
                if(dl)  corner += 1;
                if(ul)  corner += 2;
                return  24 + corner;
            
            case 8:
                if(ul)  corner += 1;
                if(ur)  corner += 2;
                return  28 + corner;
            
            case 5:     return 32;
            case 10:    return 33;
            case 3:     return dr ? 35 : 34;
            case 6:     return dl ? 37 : 36;
            case 12:    return ul ? 39 : 38;
            case 9:     return ur ? 41 : 40;
            case 7 :    return 42;
            case 11:    return 43;
            case 13:    return 44;
            case 14:    return 45;
            case 15:    return 46;
            default:    return 47;
        }
    };

    Tilemap.isPureWaterTile = function(tileId) {
        return [0, 4, 6, 8, 10, 12, 14].contains(Tilemap.getAutotileKind(tileId));
    }

    Tilemap.isWaterAdditionTile = function(tileId) {
        return [2, 3].contains(Tilemap.getAutotileKind(tileId));
    }

    Tilemap.isTopTile = function(tileId) {
        return Tilemap.isRoofTile(tileId) || Tilemap.isWallTopTile(tileId);
    }

    function updateAutotile(x, y, z) {
        const tileId = MK.tile(x, y, z, dataMap);
        let shape = 0;

        if (!Tilemap.isAutotile(tileId))
            return;

        if (Tilemap.isPureWaterTile(tileId)
            || Tilemap.isWaterAdditionTile(tileId)
            || Tilemap.isGroundTile(tileId)
            || Tilemap.isWallTopTile(tileId)) {
            
            let  l = autotileEdge(tileId, x - 1, y, z);
            let  r = autotileEdge(tileId, x + 1, y, z);
            let  u = autotileEdge(tileId, x, y - 1, z);
            let  d = autotileEdge(tileId, x, y + 1, z);
            let ul = autotileEdge(tileId, x - 1, y - 1, z);
            let ur = autotileEdge(tileId, x + 1, y - 1, z);
            let dl = autotileEdge(tileId, x - 1, y + 1, z);
            let dr = autotileEdge(tileId, x + 1, y + 1, z);
            
            if (Tilemap.isPureWaterTile(tileId)) {
                const water_ul      = Tilemap.isPureWaterTile(MK.tile(x - 1, y - 1, z, dataMap));
                const water_ur      = Tilemap.isPureWaterTile(MK.tile(x + 1, y - 1, z, dataMap));
                const water_dl      = Tilemap.isPureWaterTile(MK.tile(x - 1, y + 1, z, dataMap));
                const water_dr      = Tilemap.isPureWaterTile(MK.tile(x + 1, y + 1, z, dataMap));
                const waterfall_u   = Tilemap.isWaterfallTile(MK.tile(x, y - 1,     z, dataMap));
                const waterfall_d   = Tilemap.isWaterfallTile(MK.tile(x, y + 1,     z, dataMap));
                const waterfall_ul  = Tilemap.isWaterfallTile(MK.tile(x - 1, y - 1, z, dataMap));
                const waterfall_ur  = Tilemap.isWaterfallTile(MK.tile(x + 1, y - 1, z, dataMap));
                const waterfall_dl  = Tilemap.isWaterfallTile(MK.tile(x - 1, y + 1, z, dataMap));
                const waterfall_dr  = Tilemap.isWaterfallTile(MK.tile(x + 1, y + 1, z, dataMap));

                if (waterfall_u)                    u  = false;
                if (waterfall_d)                    d  = false;
                if (waterfall_u && waterfall_ul)    ul = false;
                if (waterfall_u && waterfall_ur)    ur = false;
                if (waterfall_u && water_ul)        ul = true;
                if (waterfall_u && water_ur)        ur = true;
                if (waterfall_d && waterfall_dl)    dl = false;
                if (waterfall_d && waterfall_dr)    dr = false;
                if (waterfall_d && water_dl)        dl = true;
                if (waterfall_d && water_dr)        dr = true;
            }

            const top_dl = Tilemap.isTopTile(MK.tile(x - 1, y + 1, z, dataMap));
            const top_d  = Tilemap.isTopTile(MK.tile(x,     y + 1, z, dataMap));
            const top_dr = Tilemap.isTopTile(MK.tile(x + 1, y + 1, z, dataMap));
            const top_l  = Tilemap.isTopTile(MK.tile(x - 1, y,     z, dataMap));
            const top_r  = Tilemap.isTopTile(MK.tile(x + 1, y,     z, dataMap));
            
            if (top_d)          d  = false;
            if (top_dl && !l)   dl = false;
            if (top_dr && !r)   dr = false;
            if (top_l  && !ul)  l  = false;
            if (top_r  && !ur)  r  = false;
            if (top_l && top_dl) dl = false;
            if (top_r && top_dr) dr = false;

            // Compatibility
            if (MK.mv3d || MK.mz3d) {

                function height (x, y) {
                    const regionId = MK.regionId(x, y, dataMap);
                    const e = MK.mv3d
                        ? mv3d.REGION_DATA[regionId]
                        : mz3d.REGION_DATA[regionId];
                    return e ? e.height : 0;
                }

                u  = u  || height(x, y - 1) < height(x, y);
                l  = l  || height(x - 1, y) < height(x, y);
                r  = r  || height(x + 1, y) < height(x, y);
                d  = d  || height(x, y + 1) < height(x, y);
                ul = ul || height(x - 1, y - 1) < height(x, y);
                ur = ur || height(x + 1, y - 1) < height(x, y);
                dl = dl || height(x - 1, y + 1) < height(x, y);
                dr = dr || height(x + 1, y + 1) < height(x, y);
            }
            shape = normalAutotileShape(u, d, l, r, ul, ur, dl, dr);
        }

        if (Tilemap.isWaterfallTile(tileId)) {
            const waterfall_l   = Tilemap.isWaterfallTile(MK.tile(x - 1, y, z, dataMap));
            const waterfall_r   = Tilemap.isWaterfallTile(MK.tile(x + 1, y, z, dataMap));
            const top           = getTopOrBottomIndex(x,     y, z, -1);
            const top_l         = getTopOrBottomIndex(x - 1, y, z, -1);
            const top_r         = getTopOrBottomIndex(x + 1, y, z, -1);

            const l = !waterfall_l || top != top_l;
            const r = !waterfall_r || top != top_r;
            
            shape = waterfallAutotileShape(l, r);
        }

        if (Tilemap.isTileA3(tileId) || Tilemap.isWallSideTile(tileId)) {
            const l = autotileWallEdge(tileId, x, y, x - 1, y, z)
                && !Tilemap.isWaterfallTile(MK.tile(x - 1, y, z, dataMap));
            const r = autotileWallEdge(tileId, x, y, x + 1, y, z)
                && !Tilemap.isWaterfallTile(MK.tile(x + 1, y, z, dataMap));
            const u = autotileEdge(tileId, x, y - 1, z);
            const d = autotileEdge(tileId, x, y + 1, z);
            
            shape = wallTopAutotileShape(u, d, l, r);
        }
        
        const kind = Tilemap.getAutotileKind(tileId);
        const newTileId = Tilemap.makeAutotileId(kind, shape);
        MK.setTile(x, y, z, dataMap, newTileId);
    };

    for(let x = 0; x < dataMap.width; x++) {
        for(let y = 0; y < dataMap.height; y++) {
            for(let z = 0; z < 4; z++) {
                updateAutotile(x, y, z, dataMap);
            }
        }
    }
}

MK.shadowId = function(x, y, dataMap) {
    return MK.tile(x, y, 4, dataMap);
}

MK.setShadowId = function(x, y, dataMap, shadowId) {
    MK.setTile(x, y, 4, dataMap, shadowId);
}