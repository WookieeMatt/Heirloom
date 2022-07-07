/*:
 * @target MZ
 * @plugindesc [Tier 2] [Version 2.0] generate Maps with pre-defined Snippets
 * @author Aerosys
 * @url https://aerosys.blog
 * @base MK_RNGMaps_Core
 * @orderAfter MK_RNGMaps_Core
 * 
 * 
 * =====================================================================================
 * HELP
 * =====================================================================================
 *
 * @help
 * contact
 * --------
 * Aerosys at rpgmaker web forums
 *
 * T&C
 * ----------------------------
 * Credit Aerosys, Lantiz / Biterkid
 * Full T&C in the forums and on my website
 *
 * Instructions and T&C at aerosys.blog
 * Please visit the rpgmakerweb forum to give feedback :)
 * @
 * 
 * 
 * =====================================================================================
 * PARAMS
 * =====================================================================================
 * 
 * @param templates
 * @text Templates
 * @type struct<Template>[]
 * @default ["{\"name\":\"Classic Maze\",\"algorithm\":\"Maze\",\"finetuning\":\"-----\",\"classicMazeParams\":\"{\\\"cutOffDeadEnds\\\":\\\"0\\\",\\\"mergeDeadEnds\\\":\\\"0.00\\\"}\",\"randomWalkParams\":\"\",\"roomsAndCorridorsParams\":\"\",\"exitMode\":\"from Asset Map\",\"assets\":\"-----\",\"commonAssetIds\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"specialAssets\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Chests\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over Meta Maze\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Mobs\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"21\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Switch\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"borderWidth\":\"1\"}","{\"name\":\"Imperfect Maze\",\"algorithm\":\"Maze\",\"finetuning\":\"-----\",\"classicMazeParams\":\"{\\\"cutOffDeadEnds\\\":\\\"1\\\",\\\"mergeDeadEnds\\\":\\\"0.3\\\"}\",\"randomWalkParams\":\"\",\"roomsAndCorridorsParams\":\"\",\"exitMode\":\"from Asset Map\",\"assets\":\"-----\",\"commonAssetIds\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"specialAssets\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Chests\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over Meta Maze\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Mobs\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"21\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Switch\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"borderWidth\":\"1\"}","{\"name\":\"Sewers\",\"algorithm\":\"Maze\",\"finetuning\":\"-----\",\"classicMazeParams\":\"{\\\"cutOffDeadEnds\\\":\\\"1\\\",\\\"mergeDeadEnds\\\":\\\"0.3\\\"}\",\"randomWalkParams\":\"\",\"roomsAndCorridorsParams\":\"\",\"exitMode\":\"None\",\"assets\":\"-----\",\"commonAssetIds\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"specialAssets\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Entrance\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Exit\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"13\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Chests\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over Meta Maze\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Mobs\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"21\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Switch\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"borderWidth\":\"1\"}","{\"name\":\"Cave\",\"algorithm\":\"Random Walk\",\"finetuning\":\"-----\",\"classicMazeParams\":\"\",\"randomWalkParams\":\"{\\\"start\\\":\\\"bottom\\\",\\\"end\\\":\\\"top\\\",\\\"allowGoingBack\\\":\\\"true\\\",\\\"allowLargeAreas\\\":\\\"true\\\",\\\"allowRevisit\\\":\\\"false\\\"}\",\"roomsAndCorridorsParams\":\"\",\"exitMode\":\"from Asset Map\",\"assets\":\"-----\",\"commonAssetIds\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"specialAssets\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Chests\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over Meta Maze\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Mobs\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"21\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Switch\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"borderWidth\":\"1\"}","{\"name\":\"Castle\",\"algorithm\":\"Rooms & Corridors\",\"finetuning\":\"-----\",\"classicMazeParams\":\"\",\"randomWalkParams\":\"\",\"roomsAndCorridorsParams\":\"{\\\"minRooms\\\":\\\"4\\\",\\\"maxRooms\\\":\\\"5\\\",\\\"minRoomWidth\\\":\\\"1\\\",\\\"maxRoomWidth\\\":\\\"2\\\",\\\"minRoomHeight\\\":\\\"1\\\",\\\"maxRoomHeight\\\":\\\"2\\\",\\\"allowOverlapping\\\":\\\"true\\\"}\",\"exitMode\":\"from Asset Map\",\"assets\":\"-----\",\"commonAssetIds\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"specialAssets\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Chests\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over Meta Maze\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Mobs\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"21\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Switch\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"borderWidth\":\"1\"}","{\"name\":\"Road\",\"algorithm\":\"Random Walk\",\"finetuning\":\"-----\",\"classicMazeParams\":\"\",\"randomWalkParams\":\"{\\\"start\\\":\\\"bottom\\\",\\\"end\\\":\\\"top\\\",\\\"allowGoingBack\\\":\\\"false\\\",\\\"allowLargeAreas\\\":\\\"true\\\",\\\"allowRevisit\\\":\\\"true\\\"}\",\"roomsAndCorridorsParams\":\"\",\"exitMode\":\"Paths to Map's End\",\"assets\":\"-----\",\"commonAssetIds\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"specialAssets\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Chests\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over Meta Maze\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Mobs\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"21\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Switch\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"borderWidth\":\"0\"}","{\"name\":\"Town\",\"algorithm\":\"Maze\",\"finetuning\":\"-----\",\"classicMazeParams\":\"{\\\"cutOffDeadEnds\\\":\\\"1\\\",\\\"mergeDeadEnds\\\":\\\"0.3\\\"}\",\"randomWalkParams\":\"\",\"roomsAndCorridorsParams\":\"\",\"exitMode\":\"Paths to Map's End\",\"assets\":\"-----\",\"commonAssetIds\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\",\\\"4\\\"]\",\"specialAssets\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Chests\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over Meta Maze\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Mobs\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"21\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Switch\\\\\\\",\\\\\\\"regionId\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"meta\\\\\\\":\\\\\\\"count over this map\\\\\\\",\\\\\\\"requireSwitch\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switchId\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"borderWidth\":\"0\"}"]
 * @
 * 
 * =====================================================================================
 * COMMANDS
 * =====================================================================================
 * 
 * @command generate
 * @text Generate
 * @desc Generate a Map. The player needs to be on the Space Map.
 * 
 * @arg templateName
 * @text Template
 * @type combo
 * @option Classic Maze
 * @option Imperfect Maze
 * @option Sewers
 * @option Cave
 * @option Castle
 * @option Road
 * @option Town
 * @default Imperfect Maze
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
 * @arg spawnLocationMode
 * @text Spawn Location
 * @type select
 * @option by Direction
 * @option by X, Y Coordinates (fixed)
 * @option by X, Y Coordinates (Variables)
 * @option let Meta Maze decide
 * @default by Direction
 * 
 * @arg whenByDirection
 * @parent spawnLocationMode
 * @text when: by Direction
 * @type select
 * @option top
 * @option left
 * @option right
 * @option bottom
 * @default bottom
 * 
 * @arg whenXYFixed
 * @parent spawnLocationMode
 * @text when: X, Y (fixed)
 * @type struct<FixedXYCoordinates>
 * 
 * @arg whenXYVariables
 * @parent spawnLocationMode
 * @text when: X, Y (Variables)
 * @type struct<XYCoordinatesByVariables>
 * 
 * 
 * @command generateWithMeta
 * @text Generate (with Meta Maze)
 * @desc Generate a Map. The player needs to be on the Space Map.
 * 
 * @arg templateName
 * @text Template
 * @type combo
 * @option Classic Maze
 * @option Imperfect Maze
 * @option Sewers
 * @option Cave
 * @option Castle
 * @option Road
 * @default Imperfect Maze
 * 
 * @arg spawnLocationMode
 * @text Spawn Location
 * @type select
 * @option let Meta Maze decide
 * @option by X, Y Coordinates (fixed)
 * @option by X, Y Coordinates (Variables)
 * @default let Meta Maze decide
 * 
 * @arg whenXYFixed
 * @parent spawnLocationMode
 * @text when: X, Y (fixed)
 * @type struct<FixedXYCoordinates>
 * 
 * @arg whenXYVariables
 * @parent spawnLocationMode
 * @text when: X, Y (Variables)
 * @type struct<XYCoordinatesByVariables>
 * 
 */


/*
 * =====================================================================================
 * STRUCTS
 * =====================================================================================
 */

/*~struct~Template:
 *
 * @param name
 * @text Name
 * @type string
 * @desc Name of the Template. Must be unique.
 * @default REQUIRED!
 * 
 * @param algorithm
 * @text Base Algorithm
 * @type select
 * @option Maze
 * @option Random Walk
 * @option Rooms & Corridors
 * @default Maze
 * 
 * @param finetuning
 * @text Finetuning
 * @default -----
 * 
 * @param classicMazeParams
 * @parent finetuning
 * @text when Classic Maze
 * @type struct<ClassicMazeParams>
 * @default {"cutOffDeadEnds":"1","mergeDeadEnds":"0.3"}
 * 
 * @param randomWalkParams
 * @parent finetuning
 * @text when Random Walk
 * @type struct<RandomWalkParams>
 * 
 * @param roomsAndCorridorsParams
 * @parent finetuning
 * @text when Rooms & Corridors
 * @type struct<RoomsAndCorridorsParams>
 * 
 * @param exitMode
 * @text Exit Mode
 * @type select
 * @option None
 * @option from Asset Map
 * @option Paths to Map's End
 * @default from Asset Map
 * 
 * @param assets
 * @text Assets & Decoration
 * @default -----
 * 
 * @param commonAssetIds
 * @parent assets
 * @text Common Assets: Region Ids
 * @type number[]
 * @desc Region Ids of all assets that are drawn automatically, usually decorative assets.
 * @default ["1","2","3","4"]
 * 
 * @param specialAssets
 * @parent assets
 * @text Special Assets
 * @type struct<AssetConfig>[]
 * @default ["{\"name\":\"Chests\",\"regionId\":\"20\",\"min\":\"2\",\"max\":\"3\",\"meta\":\"count over Meta Maze\",\"requireSwitch\":\"false\",\"switchId\":\"\"}","{\"name\":\"Mobs\",\"regionId\":\"21\",\"min\":\"3\",\"max\":\"4\",\"meta\":\"count over this map\",\"requireSwitch\":\"false\",\"switchId\":\"\"}","{\"name\":\"Switch\",\"regionId\":\"22\",\"min\":\"1\",\"max\":\"1\",\"meta\":\"count over this map\",\"requireSwitch\":\"false\",\"switchId\":\"\"}"]
 * 
 * @param borderWidth
 * @text Border Width
 * @type number
 * @desc a Margin that goes aroung the generated map
 * @default 1
 */

/*~struct~ClassicMazeParams:
 *
 * @param cutOffDeadEnds
 * @type number
 * @default 1
 * @desc Every tunnel leading in a dead end, is shortened by n snippets.
 * 
 * @param mergeDeadEnds
 * @type number
 * @decimals 2
 * @default 0.3
 * @desc A new corridor is built on every dead end by given chance.
 */

/*~struct~RandomWalkParams:
 *
 * @param start
 * @type select
 * @option top
 * @option left
 * @option right
 * @option bottom
 * @option any
 * @default bottom
 * 
 * @param end
 * @type select
 * @option top
 * @option left
 * @option right
 * @option bottom
 * @option any
 * @default top
 * 
 * @param allowGoingBack
 * @type boolean
 * @default true
 * 
 * @param allowLargeAreas
 * @type boolean
 * @default true
 * 
 * @param allowRevisit
 * @type boolean
 * @default false
 */

/*~struct~RoomsAndCorridorsParams:
 *
 * @param minRooms
 * @text min number of Rooms
 * @type Number
 * @default 3
 * 
 * @param maxRooms
 * @text max number of Rooms
 * @type Number
 * @default 4
 * 
 * @param minRoomWidth
 * @text min Width of a Room
 * @type Number
 * @default 1
 * 
 * @param maxRoomWidth
 * @text max Width of a Room
 * @type Number
 * @default 2
 * 
 * @param minRoomHeight
 * @text min Height of a Room
 * @type Number
 * @default 1
 * 
 * @param maxRoomHeight
 * @text max Height of a Room
 * @type Number
 * @default 2
 * 
 * @param allowOverlapping
 * @text Allow Rooms overlapping?
 * @type boolean
 * @default false
 */

/*~struct~AssetConfig:
 *
 * @param name
 * @text name (not used)
 * @desc Not used by the Plugin. Only for quality of life.
 * 
 * @param regionId
 * @text Region Id
 * @type number
 * @default 20
 * 
 * @param min
 * @type number
 * @default 1
 * 
 * @param max
 * @type number
 * @default 1
 * 
 * @param meta
 * @type select
 * @option count over this map
 * @option count over Meta Maze
 * @default count over this map
 * @desc When the Meta Maze is not active, "count over this map" is used
 * 
 * @param requireSwitch
 * @text Switch?
 * @type boolean
 * @default false
 * @desc When enabled, this asset it placed if and only if a given Switch is switched ON.
 * 
 * @param switchId
 * @parent requireSwitch
 * @text Switch
 * @type switch
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

var Imported = Imported || { };
Imported.MK_RNGMaps_withSnippets = true;

if (!Imported.MK_RNGMaps_Core)
    alert ("Missing Plugin: MK_RNGMaps_Core");


// =====================================================================================
// Dungeon Generator
// =====================================================================================
class DungeonGenerator extends AbstractMapGenerator {
    
    constructor() {
        super();
        this._borderWidth = MK.DEFAULT_BORDER_WIDTH;
        this.spawnLocation = null;
    }
    
    reset() {
        super.reset();
    }
    
    resetAfterFinalize() {
        super.resetAfterFinalize();
    }

    getSnippetWidth() {
        return Math.floor((MK.additionalMaps.snippets.width - 5) / 4);
    }

    getSnippetHeight() {
        return Math.floor((MK.additionalMaps.snippets.height - 5) / 4);
    }

    getDungeonWidth() {
        return Math.floor(($dataMap.width - (2 * this.borderWidth)) / this.getSnippetWidth());
    }

    getDungeonHeight() {
        return Math.floor(($dataMap.height - (2 * this.borderWidth))  / this.getSnippetHeight());
    }
    
    validateMapSettingsMaze() {
        if (!MK.additionalMaps.snippets) this.error("Snippets Map", "snippets");
    }
    
    validateMapSettingsWithArea() {
        if (!MK.additionalMaps.snippets)              this.error("Snippets Map", "snippets");
        if (!MK.additionalMaps.snippetsarea)          this.error("Areas Map", "snippetsArea");
        if (!MK.additionalMaps.snippetstransitions)   this.error("Transitions Map", "snippetsTransitions");
    }
    
    validateSpaceMap() {
        const dungeon_width     = this.getDungeonWidth();
        const dungeon_height    = this.getDungeonHeight();
        const minX              = (3 * this.getSnippetWidth())  + (2 * this.borderWidth);
        const minY              = (3 * this.getSnippetHeight()) + (2 * this.borderWidth);
        
        if (dungeon_width < 2 || dungeon_height < 2)
            throw Error ("Your Space Map is too small. Minimum Dimension is " + minX + "x" + minY);
    }
    
    error(name, exactName) {
        throw Error (name + " not found!\n" + 
            "Please check if it is defined, in Map Tree below Space Map, and has the name '" + exactName + "'");
    }
    
    placeSnippet (sourceMapName, id, x, y, columns = 4) {
        const elementWidth  = this.getSnippetWidth();
        const elementHeight = this.getSnippetHeight();
        const from_x        = (id % columns)            * (elementWidth  + 1) + 1;
        const from_y        = Math.floor(id / columns)  * (elementHeight + 1) + 1;
        const to_x          = (x * elementWidth)  + this.borderWidth;
        const to_y          = (y * elementHeight) + this.borderWidth;
        const source        = MK.getAdditionalMap(sourceMapName);

        MK.copyTiles(from_x, from_y, elementWidth, elementHeight, to_x, to_y, source, this.dataMap);
        MK.cloneEvents(from_x, from_y, elementWidth, elementHeight, to_x, to_y, source, this.dataMap);
    }
    
    prims ({ borderWidth = 1, cutOffDeadEnds = 1, mergeDeadEnds = 0.3} = { }) {
        this.reset();
        this.borderWidth = borderWidth;
        this.validateMapSettingsMaze();
        this.validateSpaceMap();

        const w = this.getDungeonWidth();
        const h = this.getDungeonHeight();
        
        this.map = MK.mazeAlgorithms.prims(w, h);
        MK.mazeAlgorithms.cutOffDeadEnds(this.map, cutOffDeadEnds);
        MK.mazeAlgorithms.mergeDeadEnds(this.map, mergeDeadEnds);
        return this;
    }

    randomWalk ({
            borderWidth = 1,
            start = "bottom",
            end = "top",
            allowGoingBack = true,
            allowLargeAreas = true,
            allowRevisit = false
    } = { }) {	
        this.reset();
        this.borderWidth = borderWidth;
        this.validateMapSettingsWithArea();
        this.validateSpaceMap();

        const w = this.getDungeonWidth();
        const h = this.getDungeonHeight();
        this.map = MK.mazeAlgorithms.randomWalk(w, h, start, end, allowGoingBack, allowLargeAreas, allowRevisit);
        return this;
    }

    roomsAndCorridors ({
            borderWidth = 1,
            minRooms = 3,
            maxRooms = 4,
            minRoomWidth = 2,
            maxRoomWidth = 3,
            minRoomHeight = 2,
            maxRoomHeight = 2,
            allowOverlapping = false
    } = { }) {
        this.reset();
        this.borderWidth = borderWidth;
        this.validateMapSettingsWithArea();
        this.validateSpaceMap();
        
        const w = this.getDungeonWidth();
        const h = this.getDungeonHeight();
        this.map = MK.mazeAlgorithms.roomsAndCorridors(
            w,
            h,
            minRooms,
            maxRooms,
            minRoomWidth,
            maxRoomWidth,
            minRoomHeight,
            maxRoomHeight,
            allowOverlapping
        );
    }

    _generateOuterMaps(source) {
        
        var w = source.length;
        var h = source[0].length;
        var target = MK.createMatrix(w, h);
        
        function check(x_, y_) {
            return (x_ < 0 || x_ >= w || y_ < 0 || y_ >= h || source[x_][y_] == 0);
        }
        
        for (var x = 0; x < w; x++) {
            for (var y = 0; y < h; y++) {
                
                if (source[x][y]) {
                    target[x][y] = source[x][y];
                    continue;
                }
                var id = 0;
                var next_id = 0;
        
                if (check(x + 1, y) && check(x + 1, y + 1) && check(x, y + 1)) // corner top left
                    id = id | 1;
                if (check(x - 1, y) && check(x - 1, y + 1) && check(x, y + 1)) // corner top right
                    id = id | 2;
                if (check(x - 1, y) && check(x - 1, y - 1) && check(x, y - 1)) // corner bottom right
                    id = id | 4;
                if (check(x, y - 1) && check(x + 1, y - 1) && check(x + 1, y)) // corner bottom left
                    id = id | 8;
                
                if (id == 0)  next_id = -64;
                if (id == 1)  next_id = 0;
                if (id == 2)  next_id = 2;
                if (id == 3)  next_id = 1;
                if (id == 4)  next_id = 8;
                if (id == 5)  next_id = 14;
                if (id == 6)  next_id = 5;
                if (id == 7)  next_id = 12;
                if (id == 8)  next_id = 6;
                if (id == 9)  next_id = 3;
                if (id == 10) next_id = 11;
                if (id == 11) next_id = 13;
                if (id == 12) next_id = 7;
                if (id == 13) next_id = 10;
                if (id == 14) next_id = 9;
                if (id == 15) next_id = 4;
                
                next_id += 64;
                target[x][y] = next_id;
            }
        }
        for (var x = 0; x < w; x++) {
            for (var y = 0; y < h; y++) {
                source[x][y] = target[x][y];
            }
        }
    }

    _remapSnippets(source) {
        for (let x = 0; x < source.length; x++) {
            for (let y = 0; y < source[0].length; y++) {
                source[x][y] = this._remapSnippet(source[x][y]);
            }
        }
    }

    _remapSnippet(id) {
        switch(id) {
            case 0:  return 0;
            case 1:  return 12;
            case 2:  return 13;
            case 3:  return 9;
            case 4:  return 14;
            case 5:  return 4;
            case 6:  return 1;
            case 7:  return 5;
            case 8:  return 15;
            case 9:  return 11;
            case 10: return 8;
            case 11: return 10;
            case 12: return 3;
            case 13: return 7;
            case 14: return 2;
            case 15: return 6;
        }
        return id;
    }

    makeWayOut(direction) {
        MK.mazeAlgorithms.makeWayOut(this.map, direction);
        return this;
    }
    
    generate() {
        const map = this.map;
        this._remapSnippets(this.map);
        
        var maps            = ("snippets"               in MK.additionalMaps) ? ["snippets"] : [];
        var mapsArea        = ("snippetsarea"           in MK.additionalMaps) ? ["snippetsarea"] : [];
        var mapsTransitions = ("snippetstransitions"    in MK.additionalMaps) ? ["snippetstransitions"] : [];
        var mapsOuter       = ("snippetsouter"          in MK.additionalMaps) ? ["snippetsouter"] : [];
        
        for (let i = 0; i < 99; i++) {
            if ("snippets" + i in MK.additionalMaps)            maps.push("snippets" + i);
            if ("snippetsarea" + i in MK.additionalMaps)        mapsArea.push("snippetsarea" + i);
            if ("snippetstransitions" + i in MK.additionalMaps) mapsTransitions.push("snippetstransitions" + i);
            if ("snippetsouter" + i in MK.additionalMaps)       mapsOuter.push("snippetsouter" + i);
        }
        
        if (mapsOuter.length > 0)
            this._generateOuterMaps(map);
        
        if (maps.length == 0)
            throw Error("There's no Snippets Map defined to generate dungeon. Please insert at least one snippets map in Space Map's note tags.");
        
        for (var x = 0; x < map.length; x++) {
            for (var y = 0; y < map[x].length; y++) {
                
                var id = map[x][y];
                
                if (id < 16)
                    this.placeSnippet(MK.rng.pickRandom(maps), id, x, y);
                
                if (id >= 16 && id < 32)
                    this.placeSnippet(MK.rng.pickRandom(mapsArea), id - 16, x, y, 3);
                
                if (id >= 32 && id < 48)
                    this.placeSnippet(MK.rng.pickRandom(mapsTransitions), id - 32, x, y);
                
                if (id >= 64)
                    this.placeSnippet(MK.rng.pickRandom(mapsOuter), id - 64, x, y, 3);
            }
        }
        return this;
    }
    
    getPossibleLocations(r, x1, x2, y1, y2, dataMap) {
        MK.requireNonNull(r, "getPossibleLocations", "r");
        
        dataMap = dataMap || this.dataMap;
        x1 = x1 || 0;
        y1 = y1 || 0;
        x2 = x2 || dataMap.width;
        y2 = y2 || dataMap.height;
        
        const list = [];
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                if (MK.regionId(x, y, dataMap) == r)
                    list.push({x: x, y: y});
            }
        }
        return list;
    }

    placeEntranceOn () {
        throw Error("please use placeExitOn instead of placeEntranceOn");
    }

    placeExitOn (direction) {
        MK.requireToBeOneOfThese(direction, ["top", "left", "right", "bottom"], "placeExitOn", "direction");
        this._identifyDecoRegions();
        let regionId;

        switch (direction) {
            case 'top':     regionId = MK.EXIT_NORTH;   break;
            case 'left':    regionId = MK.EXIT_WEST;    break;
            case 'right':   regionId = MK.EXIT_EAST;    break;
            case 'bottom':  regionId = MK.EXIT_SOUTH;   break;
        }
        const options = MK.findAllByDirection(
            0,
            this.dataMap.width,
            0,
            this.dataMap.height,
            direction,
            (x, y) => MK.regionId(x, y, this.dataMap) == regionId,
            this.getSnippetWidth(),
            this.getSnippetHeight()
        );
        if (options.length == 0)
            throw Error("No RegionId for Exit for direction "
                + direction
                + ". Please draw some Region Ids on your Snippets");
        
        const point = MK.rng.pickRandom(options);

        if (Imported.MK_RNGMaps_Metamaze && $metaMaze.active && $metaMaze.hasMainExit(direction)) {
            if (direction == 'top' && this.assetsInfo.assets[MK.MAIN_EXIT_NORTH])
                regionId = MK.MAIN_EXIT_NORTH;
            if (direction == 'left' && this.assetsInfo.assets[MK.MAIN_EXIT_WEST])
                regionId = MK.MAIN_EXIT_WEST;
            if (direction == 'right' && this.assetsInfo.assets[MK.MAIN_EXIT_EAST])
                regionId = MK.MAIN_EXIT_EAST;
            if (direction == 'bottom' && this.assetsInfo.assets[MK.MAIN_EXIT_SOUTH])
                regionId = MK.MAIN_EXIT_SOUTH;
        }

        this.drawDecorationToXY(point.x, point.y, regionId);
        return this;
    }

    drawDecorations (regionIds) {
        this._identifyDecoRegions();

        for (let regionId in this.assetsInfo.assets) {
            if (regionIds != null && !regionIds.contains(Number(regionId)))
                continue;
            
            if (MK.EXIT_NORTH   == Number(regionId)) continue;
            if (MK.EXIT_EAST    == Number(regionId)) continue;
            if (MK.EXIT_SOUTH   == Number(regionId)) continue;
            if (MK.EXIT_SOUTH   == Number(regionId)) continue;
            if (MK.SPAWN_NORTH  == Number(regionId)) continue;
            if (MK.SPAWN_EAST   == Number(regionId)) continue;
            if (MK.SPAWN_SOUTH  == Number(regionId)) continue;
            if (MK.SPAWN_WEST   == Number(regionId)) continue;
            
            for (let pos of this.getPossibleLocations(Number(regionId))) {
                this.drawDecorationToXY(pos.x, pos.y, Number(regionId));
            }
        }
        return this;
    }

    drawDecorationXTimes (regionId, min, max) {
        min                 = !min && min !== 0 ? 1 : min;
        max                 = max || min;
        const n             = MK.rng.randomInteger(min, max);
        const asset         = this.assetsInfo.assets[regionId];

        if (asset) {   
            for (let i = 0; i < n; i++) {
                const options = this.getPossibleLocations(regionId);
                if (!options.length)
                    break;
                
                const option = MK.rng.pickRandom(options);
                this.drawDecorationToXY(option.x, option.y, regionId);
            }
        } 
        MK.eraseRegionId(this.dataMap, regionId);
        return this;
    }

    drawDecorationToXY(x, y, regionId) {
        const decorationData = this.assetsInfo.assets[regionId];

        if (!decorationData)
            throw Error("You wanted to draw a Decoration with Region Id " + regionId
                + " but this region Id is not defined on the Decoration Map");

        const i = MK.rng.randomInteger(0, decorationData.n - 1);
        this.drawAssetToXY(x, y, "assets", decorationData, i);
    }

    _identifyDecoRegions () {
        const dataMap = MK.getAdditionalMap("assets");
        const w = dataMap.width;
        const h = dataMap.height;
        this.assetsInfo = {};
        this.assetsInfo.assets = {};
        
        function determineDimensions(regionId, y) {
            let x_ = 0;
            let y_ = y;
            for (; MK.regionId(x_, y_, dataMap) == regionId; x_++) { }
            x_ -= 1;
            for (; MK.regionId(x_, y_, dataMap) == regionId; y_++) { }
            return {w: x_ + 1, h: y_ - y};
        }
        
        function lookForStopper(y_, w_, h_) {
            
            // Stopper ID ?
            const index = MK.arrange(w)
                .findIndex(x_ => MK.regionId(x_, y_, dataMap) == MK.DECORATION_STOPPER_ID);
            
            if (index != -1)
                return Math.floor(index / w_) - 1;

            for (var n = 1; ((n + 1) * w_ - 1) < w; n++) {
                if (MK.isAreaEmpty(n * w_, y_, w_, h_, dataMap))
                    return n - 1;
            }
            return 1;
        }
        
        for (var y = 0; y < h; y++) {
            var regionId = MK.regionId(0, y, dataMap);
            
            if (regionId in this.assetsInfo.assets)
                continue;
            
            if (regionId) {
                const elementDimensions = determineDimensions(regionId, y);
                const n = lookForStopper(y, elementDimensions.w, elementDimensions.h);
                
                const elementData = {};
                elementData.regionId = regionId;
                elementData.x = elementDimensions.w;
                elementData.y = y;
                elementData.w = elementDimensions.w;
                elementData.h = elementDimensions.h;
                elementData.n = n;
                
                this.assetsInfo.assets[regionId] = elementData;
            }
        }
    }

    spawnPlayerAt (arg1, arg2) {
        
        if (!arg1)
            throw Error("You either forgot to call \"spawnPlayerAt\" "
                + "or the Meta Maze does not know from where to enter the Maze");

        if (typeof arg1 == 'number' && typeof arg2 == 'number') {
            this.spawnLocation = { x: arg1, y: arg2 };
            return this;
        }
        
        if (['top', 'left', 'right', 'bottom'].contains(arg1)) {
            const direction = arg1;
            let regionId;

            switch (direction) {
                case 'top':     regionId = MK.SPAWN_NORTH;  break;
                case 'left':    regionId = MK.SPAWN_WEST;   break;
                case 'right':   regionId = MK.SPAWN_EAST;   break;
                case 'bottom':  regionId = MK.SPAWN_SOUTH;  break;
            }
            const options = MK.findAllByDirection(
                0,
                this.dataMap.width,
                0,
                this.dataMap.height,
                direction,
                (x, y) => MK.regionId(x, y, this.dataMap) == regionId,
                this.getSnippetWidth(),
                this.getSnippetHeight()
            );
            
            if (options.length == 0)
                throw Error("No Spawn Location for direction "
                    + direction
                    + ". Please draw some more Spawn Locations on your Snippets");
            this.spawnLocation = MK.rng.pickRandom(options);
            return this;
        }
        throw Error("spawnPlayerAt illegal arguments: " + arg1 + ", " + arg2);
    }

    spawnPlayerAutomatically() {
        MK.onUsePremiumFunctionAlert("spawnPlayerAutomatically");
    }
}

var $dungeonGenerator = new DungeonGenerator();


// =====================================================================================
// Templates
// =====================================================================================

DungeonGenerator.prototype.template = function(templateName) {
    return new DungeonGeneratorTemplateParamBuilder(templateName);
}


class DungeonGeneratorTemplateParamBuilder {
    
    constructor(templateName) {
        MK.requireNonNull(templateName, "template", "templateName");
        
        this.templateName = templateName;
        this.exits = { };
    }

    withExit(direction) {
        this.exits[direction.toLowerCase()] = true;
        return this;
    }

    spawnPlayerAt() {
        this.spawnLocationArguments = arguments;
        return this;
    }

    spawnPlayerAutomatically() {
        MK.onUsePremiumFunctionAlert("spawnPlayerAutomatically");
    }

    finalize() {
        $dungeonGenerator.executeTemplate(this);
    }
}

DungeonGenerator.prototype.executeTemplate = function(templateParam) {
    MK.requireNonNull(templateParam.templateName, "generate", "Template Name");
    
    const template = MK.TEMPLATES_WITH_SNIPPETS[templateParam.templateName];

    if (!template)
        throw Error("Template with the name " + templateParam.templateName + " is not defined in the Plugin Manager");
    
    if ('Maze' == template.algorithm) {
        this.prims({
            borderWidth: template.borderWidth,
            cutOffDeadEnds: template.args.cutOffDeadEnds,
            mergeDeadEnds: template.args.mergeDeadEnds
        });
    }
    if ('Random Walk' == template.algorithm) {
        this.randomWalk({
            borderWidth: template.borderWidth,
            start: template.args.start,
            end: template.args.end,
            allowGoingBack: template.args.allowGoingBack,
            allowLargeAreas: template.args.allowLargeAreas,
            allowRevisit: template.args.allowRevisit
        });
    }
    if ('Rooms & Corridors' == template.algorithm) {
        this.roomsAndCorridors({
            borderWidth: template.args.borderWidth,
            minRooms: template.args.minRooms,
            maxRooms: template.args.maxRooms,
            minRoomWidth: template.args.minRoomWidth,
            maxRoomWidth: template.args.maxRoomWidth,
            minRoomHeight: template.args.minRoomHeight,
            maxRoomHeight: template.args.maxRoomHeight,
            allowOverlapping: template.args.allowOverlapping,
        });
    }

    if (template.exitMode == 'Paths to Map\'s End') {

        if (Imported.MK_RNGMaps_Metamaze && $metaMaze.active) {
            this.makeWaysOut();
        } else {
            if (templateParam.exits.top)    this.makeWayOut("top");
            if (templateParam.exits.left)   this.makeWayOut("left");
            if (templateParam.exits.right)  this.makeWayOut("right");
            if (templateParam.exits.bottom) this.makeWayOut("bottom");
        }
    }
    this.generate();

    if (template.exitMode == 'from Asset Map') {

        if (Imported.MK_RNGMaps_Metamaze && $metaMaze.active) {
            this.placeExits();
        } else {
            if (templateParam.exits.top)    this.placeExitOn("top");
            if (templateParam.exits.left)   this.placeExitOn("left");
            if (templateParam.exits.right)  this.placeExitOn("right");
            if (templateParam.exits.bottom) this.placeExitOn("bottom");
        }
    }

    this.drawDecorations(template.commonAssetIds);

    for (let asset of template.specialAssets) {
        const isMeta = asset.isMeta && Imported.MK_RNGMaps_Metamaze && $metaMaze.active;
        if (this.checkCondition(asset) && !isMeta)
            this.drawDecorationXTimes(asset.regionId, asset.min, asset.max);
        if (this.checkCondition(asset) && isMeta)
            this.drawDecorationXTimesMeta(asset.regionId, asset.min, asset.max);
    }

    if (!templateParam.spawnLocationArguments)
        throw Error("You forgot to provide a \"spawnPlayerAt\" value");
    
    this.spawnPlayerAt(...templateParam.spawnLocationArguments);
    this.finalize();
}

MK.deserializeTemplateWithSnippets = function(parsed) {
    
    function deserializeArgs(parsed) {
        switch (parsed.algorithm) {
            case 'Maze':                return deserializeMazeParams(parsed.classicMazeParams);
            case 'Random Walk':         return deserializeRandomWalkParams(parsed.randomWalkParams);
            case 'Rooms & Corridors':   return deserializeRoomsAndCorridorsParams(parsed.roomsAndCorridorsParams);
        }
    }

    function deserializeMazeParams(serialized) {
        const parsed = JSON.parse(serialized);
        return {
            cutOffDeadEnds: Number(parsed.cutOffDeadEnds),
            mergeDeadEnds: Number(parsed.mergeDeadEnds)
        }
    }

    function deserializeRandomWalkParams(serialized) {
        const parsed = JSON.parse(serialized);
        return {
            start: parsed.start,
            end: parsed.end,
            allowGoingBack: 'true' == parsed.allowGoingBack,
            allowLargeAreas: 'true' == parsed.allowLargeAreas,
            allowRevisit: 'true' == parsed.allowRevisit
        }
    }
    
    function deserializeRoomsAndCorridorsParams(serialized) {
        const parsed = JSON.parse(serialized);
        return {
            minRooms: Number(parsed.minRooms),
            maxRooms: Number(parsed.maxRooms),
            minRoomWidth: Number(parsed.minRoomWidth),
            maxRoomWidth: Number(parsed.maxRoomWidth),
            minRoomHeight: Number(parsed.minRoomHeight),
            maxRoomHeight: Number(parsed.maxRoomHeight),
            allowOverlapping: 'true' == parsed.allowOverlapping
        }
    }

    function deserializeAsset(parsed) {
        return {
            regionId: Number(parsed.regionId),
            min: Number(parsed.min),
            max: Number(parsed.max),
            isMeta: 'count over Meta Maze' == parsed.meta,
            requireSwitch: 'true' == parsed.requireSwitch,
            switchId: Number(parsed.switchId)
        }
    }

    return {
        name: parsed.name,
        algorithm: parsed.algorithm,
        args: deserializeArgs(parsed),
        exitMode: parsed.exitMode,
        commonAssetIds: JSON.parse(parsed['commonAssetIds']).map(Number),
        specialAssets: JSON.parse(parsed.specialAssets).map(JSON.parse).map(deserializeAsset),
        borderWidth: Number(parsed.borderWidth)
    }
}

// =====================================================================================
// Plugin Manager
// =====================================================================================

var params = PluginManager.parameters('MK_RNGMaps_withSnippets');
var templates;

try {
    templates = JSON.parse(params.templates);
} catch (error) {
    console.error(error);
    throw Error("Could not parse Templates from the Plugin MK_RNGMaps_withSnippets\nTry to re-add this Plugin\nPress F12 for details");
}

MK.TEMPLATES_WITH_SNIPPETS = { };

for (let i = 0; i < templates.length; i++) {
    const template = templates[i];
    try {
        const parsed = JSON.parse(template);
        const deserialized = MK.deserializeTemplateWithSnippets(parsed);
        MK.TEMPLATES_WITH_SNIPPETS[parsed.name] = deserialized;
    
    } catch (error) {
        console.error(error);
        throw Error("Could not parse Plugin Manager -> RNGMaps_withSnippets -> Template ("
            + (i + 1) + ")"
            + "\nTry to remove and re-add this Template."
            + "Press F12 for details.");
    }
}

if (PluginManager && PluginManager.registerCommand) {
    
    PluginManager.registerCommand('MK_RNGMaps_withSnippets', 'generate', args => {
        const builder = $dungeonGenerator.template(args.templateName);
        
        if ('true' == args.hasExitTop)      builder.withExit("top");
        if ('true' == args.hasExitLeft)     builder.withExit("left");
        if ('true' == args.hasExitRight)    builder.withExit("right");
        if ('true' == args.hasExitBottom)   builder.withExit("bottom");

        if (args.spawnLocationMode == 'by Direction') {
            builder.spawnPlayerAt(args.whenByDirection);
        }
        if (args.spawnLocationMode == 'by X, Y Coordinates (fixed)') {
            const parsed = JSON.parse(args.whenXYFixed);
            const x = parsed.x;
            const y = parsed.y;
            builder.spawnPlayerAt(x, y);
        }
        if (args.spawnLocationMode == 'by X, Y Coordinates (Variables)') {
            const parsed = JSON.parse(args.whenXYVariables);
            const x = $gameVariables.value(parsed.x);
            const y = $gameVariables.value(parsed.y);
            builder.spawnPlayerAt(x, y);
        }
        builder.finalize();
    });

    PluginManager.registerCommand('MK_RNGMaps_withSnippets', 'generateWithMeta', args => {
        const builder = $dungeonGenerator.template(args.templateName);

        if (args.spawnLocationMode == 'let Meta Maze decide') {
            builder.spawnPlayerAutomatically();
        }
        if (args.spawnLocationMode == 'by X, Y Coordinates (fixed)') {
            const parsed = JSON.parse(args.whenXYFixed);
            const x = parsed.x;
            const y = parsed.y;
            builder.spawnPlayerAt(x, y);
        }
        if (args.spawnLocationMode == 'by X, Y Coordinates (Variables)') {
            const parsed = JSON.parse(args.whenXYVariables);
            const x = $gameVariables.value(parsed.x);
            const y = $gameVariables.value(parsed.y);
            builder.spawnPlayerAt(x, y);
        }
        builder.finalize();
    });
}