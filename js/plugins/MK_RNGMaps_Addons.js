/*:
 * @target MZ
 * @plugindesc [Tier 4] [1.23] RNGMaps Addons
 * @author Aerosys
 * @url https://aerosys.blog
 * @base MK_RNGMaps_Core
 * @orderAfter MK_RNGMaps_Core
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
 * @command generateSeed
 * @text Generate Seed
 * 
 * @arg variableIds
 * @text Variables
 * @type variable[]
 * @default ["1"]
 * 
 * @arg variableId
 * @text insert into
 * @type variable
 * @default 1
 * 
 * 
 * @command noSeedableRNG
 * @text Not use seedable RNG
 * @desc Disable the seedable RNG for a Rogue-like game.
 * 
 * 
 * @command setSeed
 * @text Set Seed
 * @desc Set a custom Seed for the RNG
 * 
 * @arg value
 * @type Number
 * @default 42
 * 
 * 
 * @command setSeedByVariable
 * @text Set Seed by Variable
 * @desc Set a custom Seed for the RNG
 * 
 * @arg variableId
 * @type variable
 * @default 1
 * 
 * 
 * @command setFloorId
 * @text Set Floor Id
 * @desc Set a Floor Id, so the Generator can persist Self Switches
 * 
 * @arg floorId
 * @type Number
 * @default 1
 * 
 * 
 * @command setFloorIdByVariable
 * @text Set Floor Id by Variable
 * @desc Set a Floor Id, so the Generator can persist Self Switches
 * 
 * @arg variableId
 * @type variable
 * @default 1
 * 
 * 
 * @command resetSelfSwitches
 * @text Reset Self Switches
 * @desc Sets Self Switches of all Events in this Space Map to "false"
 * 
 * @arg mapId
 * @type Number
 * @default 1
 * 
 * @arg selfSwitch
 * @text Self Switch(es)
 * @type select
 * @option A, B, C, D
 * @option A
 * @option B
 * @option C
 * @option D
 * @default A, B, C, D
 * 
 * 
 * @command randomNumber
 * @text get Random Number (seedable RNG)
 * @desc Gets a random Number from the seedable RNG and stores it into a variable
 * 
 * @arg min
 * @type number
 * @default 1
 * 
 * @arg max
 * @type number
 * @default 2
 * 
 * @arg variableId
 * @text Variable to store into
 * @type variable
 * @default 1
 */

'use strict';

var Imported    = Imported || {};
var MK          = MK || {};
Imported.MK_RNGMaps_Addons = true;

if (!Imported.MK_RNGMaps_Core)
    alert ("Missing Plugin: MK_RNGMaps_Core");


// =====================================================================================
// Seedable RNG
// =====================================================================================

MK_PRNG.prototype.setSeed = function(seed) {
    this.useSeedableRNG = true;
    this.seed = seed;
}

MK_PRNG.prototype.noSeedableRNG = function() {
    this.useSeedableRNG = false;
}

MK_PRNG.prototype._randomInteger = function(min, max) {
    return this.useSeedableRNG
        ? this._seedableRandomInteger(min, max)
        : this._mathRandomMinMax(min, max);
}

MK_PRNG.prototype._seedableRandomInteger = function(min, max) {
    if (!this.seed && this.seed !== 0)
        throw Error("FATAL: Seedable RNG has no seed right now");
    
    this.seed = (this.seed * 9301 + 49297) % 233280;
    const rnd = this.seed / 233280;
    return Math.floor(min + rnd * (max + 1 - min));
}


// =====================================================================================
// Generate Seed
// =====================================================================================

MK.validNumbers = function(...numbers) {
    return numbers && numbers.length > 0 && numbers.every(n => typeof n == 'number');
}

MK.generateSeed = function(...values) {
    
    if (!MK.validNumbers(...values))
        throw Error("generateSeed: invalid argument(s): " + arguments);
    
    return values.reduce((total, v) => (31 * total + v) % 2347, 1);
}


// =====================================================================================
// Self Switches
// =====================================================================================

MK.selfSwitchContainer = { };

MK.getSelfSwitches = function(eventId) {
    const exists = this.floorId
        && this.selfSwitchContainer[$gameMap.mapId()]
        && this.selfSwitchContainer[$gameMap.mapId()][this.floorId]
        && this.selfSwitchContainer[$gameMap.mapId()][this.floorId][eventId];
    
    return exists
        ? this.selfSwitchContainer[$gameMap.mapId()][this.floorId][eventId]
        : { A: false, B: false, C: false, D: false };
}

// Override
MK.refreshSelfSwitchesForEvent = function(eventId) {
    const selfSwitches = MK.getSelfSwitches(eventId);
    
    $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'A'], selfSwitches.A);
    $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'B'], selfSwitches.B);
    $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'C'], selfSwitches.C);
    $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'D'], selfSwitches.D);
}

MK.saveSelfSwitch = function(eventId) {
    
    if (!this.floorId && this.floorId != 0) return;

    this.selfSwitchContainer[$gameMap.mapId()] =
        this.selfSwitchContainer[$gameMap.mapId()] || { };
    this.selfSwitchContainer[$gameMap.mapId()][this.floorId] =
        this.selfSwitchContainer[$gameMap.mapId()][this.floorId] || { };
    
    let selfSwitches = { };
    selfSwitches.A = $gameSelfSwitches.value([$gameMap.mapId(), eventId, 'A']);
    selfSwitches.B = $gameSelfSwitches.value([$gameMap.mapId(), eventId, 'B']);
    selfSwitches.C = $gameSelfSwitches.value([$gameMap.mapId(), eventId, 'C']);
    selfSwitches.D = $gameSelfSwitches.value([$gameMap.mapId(), eventId, 'D']);
    this.selfSwitchContainer[$gameMap.mapId()][this.floorId][eventId] = selfSwitches;
}

AbstractMapGenerator.prototype.setFloorId = function(floorId) {
    MK.requireNonNull(floorId, "setFloorId", "floorId");
    MK.floorId = floorId;
    return this;
}

AbstractMapGenerator.prototype.resetSelfSwitches = function(mapId, selfSwitch) {
    if (selfSwitch)
        MK.requireToBeOneOfThese(selfSwitch, ['A', 'B', 'C', 'D'], "resetSelfSwitches", "selfSwitch");
    
    MK.resetSelfSwitches(mapId, selfSwitch);
}

MK.resetSelfSwitches = function(mapId, selfSwitch) {
    
    if (!this.selfSwitchContainer[mapId]) return;

    if (!selfSwitch) {
        this.selfSwitchContainer[mapId] = undefined;
    } else {
        for (let floorId in this.selfSwitchContainer[mapId]) {
            for (let eventId in this.selfSwitchContainer[mapId][floorId]) {
                this.selfSwitchContainer[mapId][floorId][eventId][selfSwitch] = false;
            }
        }
    }
}


// =====================================================================================
// Save Actions
// =====================================================================================
const alias1 = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    let contents = alias1.call(this);

    contents.MK = contents.MK || { };
    contents.MK.selfSwitchContainer     = MK.selfSwitchContainer;
    contents.MK.injectedDataMaps        = MK.injectedDataMaps;
    
    return contents;
}

// =====================================================================================
// Load Actions
// =====================================================================================
const alias2 = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    alias2.call(this, contents);

    if (contents.MK) {
        MK.selfSwitchContainer  = contents.MK.selfSwitchContainer || { };
        MK.injectedDataMaps     = contents.MK.injectedDataMaps;
    }
}

const alias3 = Scene_Load.prototype.reloadMapIfUpdated;
Scene_Load.prototype.reloadMapIfUpdated = function() {
    const mapId = $gameMap.mapId();
    
    if (MK.injectedDataMaps[mapId]) {
        $dataMap = MK.injectedDataMaps[mapId];
    } else {
        alias3.call(this);
    }
}

const alias4 = Game_SelfSwitches.prototype.setValue;
Game_SelfSwitches.prototype.setValue = function(key, value) {
    alias4.call(this, key, value);

    MK.saveSelfSwitch(key[1]);
}


// =====================================================================================
// Plugin Manager
// =====================================================================================

if (PluginManager && PluginManager.registerCommand) {
    
    PluginManager.registerCommand("MK_RNGMaps_Addons", "generateSeed", args => {
        const variableIds   = JSON.parse(args.variableIds).map(Number);
        const values        = variableIds.map(id => $gameVariables.value(id));
        const variableId    = Number(args.variableId);
        const result        = MK.generateSeed(...values);
        $gameVariables.setValue(variableId, result);
    });

    PluginManager.registerCommand('MK_RNGMaps_Addons', 'noSeedableRNG', _ => {
        MK.rng.noSeedableRNG();
        $metaMaze.setRandomSeed();
    });
    
    PluginManager.registerCommand('MK_RNGMaps_Addons', 'setSeed', args => {
        MK.rng.setSeed(Number(args.value));
    });

    PluginManager.registerCommand('MK_RNGMaps_Addons', 'setSeedByVariable', args => {
        const seed = $gameVariables.value(Number(args.variableId))
        MK.rng.setSeed(seed);
    });

    PluginManager.registerCommand('MK_RNGMaps_Addons', 'setFloorId', args => {
        MK.floorId = Number(args.floorId);
    });

    PluginManager.registerCommand('MK_RNGMaps_Addons', 'setFloorIdByVariable', args => {
        MK.floorId = $gameVariables.value(Number(args.variableId));
    });

    PluginManager.registerCommand('MK_RNGMaps_Addons', 'resetSelfSwitches', args => {
        const selfSwitch = "A, B, C, D" == args.selfSwitch ? undefined : args.selfSwitch;
        $dungeonGenerator.resetSelfSwitches(Number(args.mapId), selfSwitch);
    });

    PluginManager.registerCommand('MK_RNGMaps_Addons', 'randomNumber', args => {
        const min   = Number(args.min);
        const max   = Number(args.max);
        const value = MK.rng.randomInteger(min, max);
        $gameVariables.setValue(Number(args.variableId), value);
    });

}