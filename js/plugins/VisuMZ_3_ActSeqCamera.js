//=============================================================================
// VisuStella MZ - Action Sequence Camera
// VisuMZ_3_ActSeqCamera.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ActSeqCamera = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ActSeqCamera = VisuMZ.ActSeqCamera || {};
VisuMZ.ActSeqCamera.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.09] [ActSeqCamera]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Action_Sequence_Camera_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds new Action Sequences functions to the VisuStella MZ
 * Battle Core plugin to give you, the game dev, control over the battle camera
 * and zoom functions.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Attach the camera to a specific point on the screen.
 * * Attach the camera to a specific target(s) on the screen.
 * * Pan the camera to be off center using the offset functions.
 * * Remove camera clamping to let the camera go out of bounds.
 * * Set the camera zoom level as you want.
 * * Tilt the camera by adjust the angle.
 * * New Options added to let the player turn on/off the battle camera.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_0_CoreEngine
 * - VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Spriteset Position Rewrite
 *
 * - The Spriteset_Battle function for updatePosition needed to be rewritten in
 * order to allow all the new features and functions added by the battle camera
 * and zoom.
 * 
 * - Camera tricks like zooming, panning, and tilting will be reset during the
 * input phase to ensure the player is able to see the whole battlefield.
 * 
 * - The player has the option to turn off the battle camera effects. If they
 * choose to turn it off, then all of this plugin's effects will be disabled
 * until they turn it back on. This is to give players control over how the
 * game visually appears in case they have motion sickness.
 *
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * The following are Action Sequence Plugin Commands that have been added with
 * this plugin. These are accessible from the Battle Core plugin (not this one)
 * in order to keep all the Action Sequences in place.
 * 
 * Once again, these plugin commands are only accessible through the Battle
 * Core plugin and not this one! Make sure you have the most update to date
 * version of the Battle Core for them.
 *
 * ---
 * 
 * === Action Sequences - Angle (Camera) ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Camera Control ===
 *
 * These Action Sequences are battle camera-related.
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 * 
 * === Action Sequences - Skew (Camera) ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Zoom (Camera) ===
 *
 * These Action Sequences are zoom-related.
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Menu Settings
 * ============================================================================
 *
 * These plugin parameters add a new options command in order to let the player
 * decide if they want the battle camera ON or OFF.
 * 
 * The player has the option to turn off the battle camera effects. If they
 * choose to turn it off, then all of this plugin's effects will be disabled
 * until they turn it back on. This is to give players control over how the
 * game visually appears in case they have motion sickness.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Battle Camera options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Options Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.09: September 22, 2022
 * * Bug Fixes!
 * ** Camera shift fixed when moving from a different scene aside from the map
 *    to battle. Fix made by Olivia.
 * 
 * Version 1.08: May 19, 2022
 * * Compatibility Update
 * ** Camera has a different Y buffer when using VisuMZ Sideview Battle UI.
 *    Update made by Olivia.
 * * Feature Update!
 * ** Smoother clamped zooming from 1.0 to 1.999. Update made by Olivia.
 * 
 * Version 1.07: April 21, 2022
 * * Feature Update!
 * ** Rebuild the animation container for Battle Core's Anti-Tint UI so that it
 *    works properly with MV animations and zoom in sideview. Update by Irina.
 * 
 * Version 1.06: April 14, 2022
 * * Compatibility Update!
 * ** Compatibility update with Anti-Tint UI feature in combination with MV-
 *    MV-related animations for non-sideview actors. Update made by Irina.
 * 
 * Version 1.05: April 7, 2022
 * * Compatibility Update!
 * ** Compatibility update with Anti-Tint UI feature in combination with zoom
 *    for MV-related animations. Update made by Irina.
 * 
 * Version 1.04: March 31, 2022
 * * Compatibility Update!
 * ** Compatibility update with Battle Core's new Anti-Tint UI feature for
 *    MV-related animations. Update made by Irina.
 * 
 * Version 1.03: January 6, 2022
 * * Compatibility Update!
 * ** The newly added MV Animation-support should now work properly with the
 *    Action Sequence Camera plugin. Update made by Irina.
 * 
 * Version 1.02: December 4, 2020
 * * Bug Fixes!
 * ** Show Pictures should now appear in the right positions. Fix by Irina.
 * 
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Damage offsets are now corrected and in line with the latest Battle Core
 *    version.
 *
 * Version 1.00: September 23, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ActSeqCamera
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Options:struct
 * @text Options Menu
 * @type struct<Options>
 * @desc Settings for the Options Menu
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","OptionsName:str":"Battle Camera"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Battle Camera options to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionsName:str
 * @text Options Name
 * @parent Options
 * @desc Command name of the option.
 * @default Battle Camera
 *
 */
//=============================================================================

const _0x45f76d=_0x3283;(function(_0x2e2c44,_0x3e0e72){const _0x50034c=_0x3283,_0x8aba1f=_0x2e2c44();while(!![]){try{const _0xceb74c=parseInt(_0x50034c(0x1df))/0x1+parseInt(_0x50034c(0x160))/0x2*(-parseInt(_0x50034c(0x1be))/0x3)+-parseInt(_0x50034c(0x15a))/0x4+parseInt(_0x50034c(0x1ad))/0x5+-parseInt(_0x50034c(0x187))/0x6*(-parseInt(_0x50034c(0x1ce))/0x7)+parseInt(_0x50034c(0x18d))/0x8*(-parseInt(_0x50034c(0x1a4))/0x9)+parseInt(_0x50034c(0x140))/0xa*(parseInt(_0x50034c(0x190))/0xb);if(_0xceb74c===_0x3e0e72)break;else _0x8aba1f['push'](_0x8aba1f['shift']());}catch(_0x3fef78){_0x8aba1f['push'](_0x8aba1f['shift']());}}}(_0x52e3,0x8fbba));function _0x3283(_0x1b52db,_0x47bc5c){const _0x52e3e4=_0x52e3();return _0x3283=function(_0x328331,_0x5ae1b7){_0x328331=_0x328331-0x12e;let _0x175361=_0x52e3e4[_0x328331];return _0x175361;},_0x3283(_0x1b52db,_0x47bc5c);}var label=_0x45f76d(0x1b9),tier=tier||0x0,dependencies=[_0x45f76d(0x1b1),_0x45f76d(0x176)],pluginData=$plugins[_0x45f76d(0x1e6)](function(_0x4edc1c){const _0x42aebe=_0x45f76d;return _0x4edc1c[_0x42aebe(0x19e)]&&_0x4edc1c['description'][_0x42aebe(0x172)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x45f76d(0x181)]||{},VisuMZ[_0x45f76d(0x166)]=function(_0x345684,_0x5bad90){const _0x34f1bc=_0x45f76d;for(const _0x58a47b in _0x5bad90){if(_0x58a47b[_0x34f1bc(0x1c7)](/(.*):(.*)/i)){const _0xe63409=String(RegExp['$1']),_0x15ec3d=String(RegExp['$2'])[_0x34f1bc(0x133)]()['trim']();let _0x28a117,_0x582478,_0x4c1809;switch(_0x15ec3d){case _0x34f1bc(0x1aa):_0x28a117=_0x5bad90[_0x58a47b]!==''?Number(_0x5bad90[_0x58a47b]):0x0;break;case _0x34f1bc(0x178):_0x582478=_0x5bad90[_0x58a47b]!==''?JSON[_0x34f1bc(0x1bd)](_0x5bad90[_0x58a47b]):[],_0x28a117=_0x582478['map'](_0x3f4654=>Number(_0x3f4654));break;case _0x34f1bc(0x1c1):_0x28a117=_0x5bad90[_0x58a47b]!==''?eval(_0x5bad90[_0x58a47b]):null;break;case'ARRAYEVAL':_0x582478=_0x5bad90[_0x58a47b]!==''?JSON['parse'](_0x5bad90[_0x58a47b]):[],_0x28a117=_0x582478['map'](_0x40b4a9=>eval(_0x40b4a9));break;case _0x34f1bc(0x1c4):_0x28a117=_0x5bad90[_0x58a47b]!==''?JSON[_0x34f1bc(0x1bd)](_0x5bad90[_0x58a47b]):'';break;case _0x34f1bc(0x156):_0x582478=_0x5bad90[_0x58a47b]!==''?JSON[_0x34f1bc(0x1bd)](_0x5bad90[_0x58a47b]):[],_0x28a117=_0x582478[_0x34f1bc(0x1a1)](_0x103d23=>JSON[_0x34f1bc(0x1bd)](_0x103d23));break;case'FUNC':_0x28a117=_0x5bad90[_0x58a47b]!==''?new Function(JSON[_0x34f1bc(0x1bd)](_0x5bad90[_0x58a47b])):new Function('return\x200');break;case'ARRAYFUNC':_0x582478=_0x5bad90[_0x58a47b]!==''?JSON['parse'](_0x5bad90[_0x58a47b]):[],_0x28a117=_0x582478['map'](_0x31477e=>new Function(JSON[_0x34f1bc(0x1bd)](_0x31477e)));break;case _0x34f1bc(0x13f):_0x28a117=_0x5bad90[_0x58a47b]!==''?String(_0x5bad90[_0x58a47b]):'';break;case _0x34f1bc(0x13c):_0x582478=_0x5bad90[_0x58a47b]!==''?JSON[_0x34f1bc(0x1bd)](_0x5bad90[_0x58a47b]):[],_0x28a117=_0x582478[_0x34f1bc(0x1a1)](_0x58642e=>String(_0x58642e));break;case'STRUCT':_0x4c1809=_0x5bad90[_0x58a47b]!==''?JSON[_0x34f1bc(0x1bd)](_0x5bad90[_0x58a47b]):{},_0x28a117=VisuMZ['ConvertParams']({},_0x4c1809);break;case _0x34f1bc(0x137):_0x582478=_0x5bad90[_0x58a47b]!==''?JSON[_0x34f1bc(0x1bd)](_0x5bad90[_0x58a47b]):[],_0x28a117=_0x582478[_0x34f1bc(0x1a1)](_0x7de9eb=>VisuMZ[_0x34f1bc(0x166)]({},JSON['parse'](_0x7de9eb)));break;default:continue;}_0x345684[_0xe63409]=_0x28a117;}}return _0x345684;},(_0x52cf20=>{const _0x159001=_0x45f76d,_0x32dccd=_0x52cf20[_0x159001(0x1dc)];for(const _0x274e87 of dependencies){if('KPYzb'==='KPYzb'){if(!Imported[_0x274e87]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x32dccd,_0x274e87)),SceneManager[_0x159001(0x1ab)]();break;}}else{const _0x4f51e6=this['getBattleAngle']();this['angle']=_0x4f51e6;}}const _0x5bf02f=_0x52cf20['description'];if(_0x5bf02f[_0x159001(0x1c7)](/\[Version[ ](.*?)\]/i)){const _0x58bb8b=Number(RegExp['$1']);_0x58bb8b!==VisuMZ[label][_0x159001(0x1e1)]&&(alert(_0x159001(0x1a9)[_0x159001(0x1bc)](_0x32dccd,_0x58bb8b)),SceneManager[_0x159001(0x1ab)]());}if(_0x5bf02f[_0x159001(0x1c7)](/\[Tier[ ](\d+)\]/i)){const _0x479346=Number(RegExp['$1']);_0x479346<tier?_0x159001(0x1ee)===_0x159001(0x1ee)?(alert(_0x159001(0x15d)[_0x159001(0x1bc)](_0x32dccd,_0x479346,tier)),SceneManager[_0x159001(0x1ab)]()):(_0x168bd2['ActSeqCamera']['Spriteset_Battle_initialize'][_0x159001(0x1e0)](this),this[_0x159001(0x141)]=_0x564106,this[_0x159001(0x177)]=_0x5f5d71):tier=Math[_0x159001(0x152)](_0x479346,tier);}VisuMZ[_0x159001(0x166)](VisuMZ[label][_0x159001(0x181)],_0x52cf20[_0x159001(0x188)]);})(pluginData),ConfigManager[_0x45f76d(0x1cb)]=!![],VisuMZ[_0x45f76d(0x1b9)][_0x45f76d(0x1b4)]=ConfigManager[_0x45f76d(0x167)],ConfigManager[_0x45f76d(0x167)]=function(){const _0x35a632=_0x45f76d,_0x31a402=VisuMZ[_0x35a632(0x1b9)]['ConfigManager_makeData']['call'](this);return _0x31a402[_0x35a632(0x1cb)]=this['battleCamera'],_0x31a402;},VisuMZ[_0x45f76d(0x1b9)]['ConfigManager_applyData']=ConfigManager[_0x45f76d(0x154)],ConfigManager[_0x45f76d(0x154)]=function(_0x2b7402){const _0x3043fc=_0x45f76d;VisuMZ[_0x3043fc(0x1b9)][_0x3043fc(0x17c)][_0x3043fc(0x1e0)](this,_0x2b7402);if(_0x3043fc(0x1cb)in _0x2b7402){if('dXVOE'!==_0x3043fc(0x143))this[_0x3043fc(0x1cb)]=_0x2b7402[_0x3043fc(0x1cb)];else{const _0x567c69=this[_0x3043fc(0x18c)][0x0];if(_0x567c69[_0x3043fc(0x16d)]===_0x148b1c)return![];}}else _0x3043fc(0x1d0)!==_0x3043fc(0x1d0)?this[_0x3043fc(0x14e)]():this['battleCamera']=!![];},TextManager[_0x45f76d(0x14c)]=VisuMZ[_0x45f76d(0x1b9)][_0x45f76d(0x181)][_0x45f76d(0x13d)][_0x45f76d(0x159)],VisuMZ[_0x45f76d(0x1b9)][_0x45f76d(0x1c8)]=BattleManager[_0x45f76d(0x15c)],BattleManager[_0x45f76d(0x15c)]=function(_0x192997,_0x338407,_0x2e1243){const _0x1aa3a1=_0x45f76d;VisuMZ[_0x1aa3a1(0x1b9)][_0x1aa3a1(0x1c8)][_0x1aa3a1(0x1e0)](this,_0x192997,_0x338407,_0x2e1243),this['clearCameraFocusTargets']();},BattleManager['clearCameraFocusTargets']=function(){const _0x4d613b=_0x45f76d;this[_0x4d613b(0x150)]=[];},BattleManager[_0x45f76d(0x14f)]=function(){const _0x177291=_0x45f76d;if(this['_cameraFocusTargets']===undefined)this[_0x177291(0x182)]();return this[_0x177291(0x150)];},BattleManager[_0x45f76d(0x1d4)]=function(_0x58bbbe){const _0x140f13=_0x45f76d;this['_cameraFocusTargets']=_0x58bbbe[_0x140f13(0x1e6)]((_0x44cc9e,_0x1d137b,_0x56a335)=>_0x56a335[_0x140f13(0x1a6)](_0x44cc9e)===_0x1d137b);},BattleManager[_0x45f76d(0x1a8)]=function(){const _0x156377=_0x45f76d,_0x1079a1=this[_0x156377(0x14f)]();if(_0x1079a1[_0x156377(0x147)]<=0x0)return Math[_0x156377(0x1b2)](Graphics[_0x156377(0x194)]/0x2);let _0x85c2a6=_0x1079a1['reduce']((_0x820e21,_0x3fc1ac)=>_0x820e21+=_0x3fc1ac[_0x156377(0x1b7)]()['x'],0x0)/_0x1079a1[_0x156377(0x147)];return _0x85c2a6+=Math[_0x156377(0x1b2)]((Graphics[_0x156377(0x194)]-Graphics[_0x156377(0x139)])/0x2),_0x85c2a6;},BattleManager['cameraFocusTargetsY']=function(){const _0x353775=_0x45f76d,_0x9c0263=this[_0x353775(0x14f)]();if(_0x9c0263[_0x353775(0x147)]<=0x0)return Math['round'](Graphics[_0x353775(0x14d)]/0x2);let _0x55d361=_0x9c0263[_0x353775(0x1d1)]((_0x24fafb,_0x544ce9)=>_0x24fafb+=_0x544ce9[_0x353775(0x1b7)]()['y']-Math['round'](_0x544ce9['battler']()['height']/0x2),0x0)/_0x9c0263['length'];return _0x55d361+=Math[_0x353775(0x1b2)]((Graphics[_0x353775(0x14d)]-Graphics[_0x353775(0x1e4)])/0x2),_0x55d361;},VisuMZ[_0x45f76d(0x1b9)]['Game_Screen_clear']=Game_Screen['prototype'][_0x45f76d(0x19d)],Game_Screen[_0x45f76d(0x19c)][_0x45f76d(0x19d)]=function(){const _0x377dbe=_0x45f76d;VisuMZ[_0x377dbe(0x1b9)][_0x377dbe(0x193)][_0x377dbe(0x1e0)](this),this[_0x377dbe(0x1de)]();},Game_Screen[_0x45f76d(0x19c)]['clearBattleCamera']=function(){const _0x47d95e=_0x45f76d;this[_0x47d95e(0x1ed)]=this[_0x47d95e(0x13b)]();},Game_Screen[_0x45f76d(0x19c)][_0x45f76d(0x13b)]=function(){const _0x2c1949=_0x45f76d,_0x2d6234=$dataSystem['advanced']['screenWidth'],_0x3ceeaf=$dataSystem['advanced']['screenHeight'];return{'angle':0x0,'angleTarget':0x0,'angleDuration':0x0,'angleWholeDuration':0x0,'angleEasing':_0x2c1949(0x135),'cameraFocusTarget':![],'cameraX':Math[_0x2c1949(0x1b2)](_0x2d6234/0x2),'cameraY':Math['round'](_0x3ceeaf/0x2),'cameraXTarget':Math[_0x2c1949(0x1b2)](_0x2d6234/0x2),'cameraYTarget':Math[_0x2c1949(0x1b2)](_0x3ceeaf/0x2),'cameraDuration':0x0,'cameraDurationWhole':0x0,'cameraEasing':_0x2c1949(0x135),'cameraClamp':!![],'cameraOffsetX':0x0,'cameraOffsetY':0x0,'cameraOffsetXTarget':0x0,'cameraOffsetYTarget':0x0,'cameraOffsetDuration':0x0,'cameraOffsetDurationWhole':0x0,'cameraOffsetEasing':'InOutSine','skewX':0x0,'skewTargetX':0x0,'skewY':0x0,'skewTargetY':0x0,'skewDuration':0x0,'skewWholeDuration':0x0,'skewEasing':'InOutSine','zoomScale':0x1,'zoomScaleTarget':0x1,'zoomDuration':0x0,'zoomWholeDuration':0x0,'zoomEasing':_0x2c1949(0x135)};},Game_Screen[_0x45f76d(0x19c)]['battleCameraData']=function(){const _0x539630=_0x45f76d;if(this[_0x539630(0x1ed)]===undefined)this[_0x539630(0x1de)]();if(!ConfigManager['battleCamera'])return this[_0x539630(0x13b)]();return this[_0x539630(0x1ed)];},VisuMZ[_0x45f76d(0x1b9)][_0x45f76d(0x18a)]=Game_Screen[_0x45f76d(0x19c)][_0x45f76d(0x17f)],Game_Screen[_0x45f76d(0x19c)]['update']=function(){const _0x271c56=_0x45f76d;VisuMZ[_0x271c56(0x1b9)]['Game_Screen_update'][_0x271c56(0x1e0)](this),this[_0x271c56(0x1e9)](),this[_0x271c56(0x163)](),this[_0x271c56(0x138)](),this[_0x271c56(0x1cf)](),this[_0x271c56(0x1a5)]();},Game_Screen[_0x45f76d(0x19c)][_0x45f76d(0x185)]=function(_0x1f93fd,_0xf4c2eb,_0x265019){const _0x56dded=_0x45f76d,_0x35a106=this['battleCameraData']();_0x35a106[_0x56dded(0x12f)]=-_0x1f93fd,_0x35a106[_0x56dded(0x1ca)]=_0xf4c2eb,_0x35a106[_0x56dded(0x16a)]=_0xf4c2eb,_0x35a106[_0x56dded(0x17b)]=_0x265019;},Game_Screen['prototype'][_0x45f76d(0x1e9)]=function(){const _0x590955=_0x45f76d;if(!SceneManager[_0x590955(0x184)]())return;const _0x204598=this['battleCameraData'](),_0xfabebd=_0x204598[_0x590955(0x1ca)],_0x551aaf=_0x204598[_0x590955(0x16a)],_0x2a0dd2=_0x204598[_0x590955(0x17b)];_0xfabebd>0x0?(_0x204598['angle']=this[_0x590955(0x165)](_0x204598[_0x590955(0x1c2)],_0x204598[_0x590955(0x12f)],_0xfabebd,_0x551aaf,_0x2a0dd2),_0x204598[_0x590955(0x1ca)]--):_0x204598[_0x590955(0x1c2)]=_0x204598[_0x590955(0x12f)];},Game_Screen[_0x45f76d(0x19c)][_0x45f76d(0x130)]=function(_0x404b49,_0x567bd3,_0x4b2be7,_0x333a80){const _0xec1b41=_0x45f76d,_0x2a5685=this[_0xec1b41(0x191)]();_0x2a5685[_0xec1b41(0x1d9)]=![],_0x2a5685[_0xec1b41(0x174)]=Math[_0xec1b41(0x1b2)](_0x404b49),_0x2a5685[_0xec1b41(0x1d6)]=Math[_0xec1b41(0x1b2)](_0x567bd3),_0x2a5685[_0xec1b41(0x1a7)]=_0x4b2be7,_0x2a5685[_0xec1b41(0x1af)]=_0x4b2be7,_0x2a5685[_0xec1b41(0x1d5)]=_0x333a80;},Game_Screen[_0x45f76d(0x19c)][_0x45f76d(0x13a)]=function(_0x2ceb3c,_0x2af1cd,_0x241df7){const _0xa511a0=_0x45f76d;if(_0x2ceb3c[_0xa511a0(0x147)]<=0x0)return;const _0x3537ee=this['battleCameraData']();_0x3537ee[_0xa511a0(0x1d9)]=!![],BattleManager[_0xa511a0(0x1d4)](_0x2ceb3c),_0x3537ee[_0xa511a0(0x1a7)]=_0x2af1cd,_0x3537ee[_0xa511a0(0x1af)]=_0x2af1cd,_0x3537ee[_0xa511a0(0x1d5)]=_0x241df7;},Game_Screen[_0x45f76d(0x19c)][_0x45f76d(0x163)]=function(){const _0x8844bb=_0x45f76d;if(!SceneManager[_0x8844bb(0x184)]())return;const _0x203f75=this[_0x8844bb(0x191)](),_0x202c00=_0x203f75[_0x8844bb(0x1a7)],_0x14e6bb=_0x203f75[_0x8844bb(0x1af)],_0x5c693e=_0x203f75[_0x8844bb(0x1d5)];if(_0x203f75[_0x8844bb(0x1d9)]){if('lqMWd'!==_0x8844bb(0x1e7)){if(!_0x2fa41b[_0x8844bb(0x184)]())return;const _0x28bf51=this['battleCameraData'](),_0x2aebdc=_0x28bf51[_0x8844bb(0x142)],_0x25a284=_0x28bf51[_0x8844bb(0x19f)],_0x2de48d=_0x28bf51[_0x8844bb(0x1bb)];_0x2aebdc>0x0?(_0x28bf51[_0x8844bb(0x168)]=this[_0x8844bb(0x165)](_0x28bf51['zoomScale'],_0x28bf51['zoomScaleTarget'],_0x2aebdc,_0x25a284,_0x2de48d),_0x28bf51[_0x8844bb(0x142)]--):_0x28bf51[_0x8844bb(0x168)]=_0x28bf51['zoomScaleTarget'];}else _0x203f75[_0x8844bb(0x174)]=BattleManager[_0x8844bb(0x1a8)](),_0x203f75[_0x8844bb(0x1d6)]=BattleManager['cameraFocusTargetsY']();}_0x202c00>0x0?(_0x203f75[_0x8844bb(0x169)]=this[_0x8844bb(0x165)](_0x203f75[_0x8844bb(0x169)],_0x203f75[_0x8844bb(0x174)],_0x202c00,_0x14e6bb,_0x5c693e),_0x203f75[_0x8844bb(0x18f)]=this[_0x8844bb(0x165)](_0x203f75[_0x8844bb(0x18f)],_0x203f75['cameraYTarget'],_0x202c00,_0x14e6bb,_0x5c693e),_0x203f75[_0x8844bb(0x1a7)]--):(_0x203f75[_0x8844bb(0x169)]=_0x203f75[_0x8844bb(0x174)],_0x203f75[_0x8844bb(0x18f)]=_0x203f75[_0x8844bb(0x1d6)]);},Game_Screen[_0x45f76d(0x19c)][_0x45f76d(0x1bf)]=function(_0xd3d226,_0x119325,_0x4a24ab,_0x1e6260){const _0x43ddc1=_0x45f76d,_0x16c2ad=this[_0x43ddc1(0x191)]();_0x16c2ad[_0x43ddc1(0x155)]=Math['round'](_0xd3d226),_0x16c2ad[_0x43ddc1(0x131)]=Math[_0x43ddc1(0x1b2)](_0x119325),_0x16c2ad['cameraOffsetDuration']=_0x4a24ab,_0x16c2ad[_0x43ddc1(0x15e)]=_0x4a24ab,_0x16c2ad[_0x43ddc1(0x170)]=_0x1e6260;},Game_Screen[_0x45f76d(0x19c)][_0x45f76d(0x138)]=function(){const _0x4f5d56=_0x45f76d;if(!SceneManager['isSceneBattle']())return;const _0x1745a9=this['battleCameraData'](),_0x427ad1=_0x1745a9[_0x4f5d56(0x16e)],_0x721c52=_0x1745a9[_0x4f5d56(0x15e)],_0x3ee26b=_0x1745a9[_0x4f5d56(0x170)];if(_0x427ad1>0x0){if(_0x4f5d56(0x1ba)!==_0x4f5d56(0x146))_0x1745a9['cameraOffsetX']=this[_0x4f5d56(0x165)](_0x1745a9[_0x4f5d56(0x175)],_0x1745a9[_0x4f5d56(0x155)],_0x427ad1,_0x721c52,_0x3ee26b),_0x1745a9[_0x4f5d56(0x12e)]=this[_0x4f5d56(0x165)](_0x1745a9[_0x4f5d56(0x12e)],_0x1745a9[_0x4f5d56(0x131)],_0x427ad1,_0x721c52,_0x3ee26b),_0x1745a9[_0x4f5d56(0x16e)]--;else{if(_0x4106d5>=0x1){const _0x2d4669=_0x51a39d['width']-_0x2f0931[_0x4f5d56(0x194)]/0x2*_0x382d90,_0x1fe34d=_0x1dfabe['width']/0x2*_0x58d738;_0x279626=_0x4a57dd[_0x4f5d56(0x1ec)](_0x2d4669,_0x1fe34d);const _0x5ec1bd=_0xec1ddb['height']-_0x235f79[_0x4f5d56(0x14d)]/0x2*_0x194fab,_0x1a7818=_0x37bb8c[_0x4f5d56(0x14d)]/0x2*_0x52e937;_0x3579b5=_0x4dd991[_0x4f5d56(0x1ec)](_0x5ec1bd,_0x1a7818);}else _0x5730b9<0x1&&(_0x4a1b80=_0x16e435[_0x4f5d56(0x194)]/0x2,_0x315fcf=_0x21b082['height']/0x2);}}else _0x1745a9[_0x4f5d56(0x175)]=_0x1745a9[_0x4f5d56(0x155)],_0x1745a9['cameraOffsetY']=_0x1745a9[_0x4f5d56(0x131)];},Game_Screen[_0x45f76d(0x19c)]['setBattleSkew']=function(_0x162d5e,_0x2511f7,_0x3e56f2,_0x2d20c2){const _0x427cf1=_0x45f76d,_0x7c412c=this[_0x427cf1(0x191)]();_0x7c412c[_0x427cf1(0x1a3)]=_0x162d5e,_0x7c412c[_0x427cf1(0x179)]=_0x2511f7,_0x7c412c[_0x427cf1(0x195)]=_0x3e56f2,_0x7c412c['skewWholeDuration']=_0x3e56f2,_0x7c412c[_0x427cf1(0x153)]=_0x2d20c2;},Game_Screen[_0x45f76d(0x19c)][_0x45f76d(0x1cf)]=function(){const _0x5780f1=_0x45f76d;if(!SceneManager[_0x5780f1(0x184)]())return;const _0x250996=this[_0x5780f1(0x191)](),_0x549f6e=_0x250996[_0x5780f1(0x195)],_0x2be8e9=_0x250996[_0x5780f1(0x1d3)],_0x1ba46a=_0x250996[_0x5780f1(0x153)];if(_0x549f6e>0x0){if('RscsL'!=='UlUjV')_0x250996[_0x5780f1(0x148)]=this[_0x5780f1(0x165)](_0x250996[_0x5780f1(0x148)],_0x250996[_0x5780f1(0x1a3)],_0x549f6e,_0x2be8e9,_0x1ba46a),_0x250996[_0x5780f1(0x1c3)]=this[_0x5780f1(0x165)](_0x250996[_0x5780f1(0x1c3)],_0x250996[_0x5780f1(0x179)],_0x549f6e,_0x2be8e9,_0x1ba46a),_0x250996[_0x5780f1(0x195)]--;else{const _0x35bb4b=_0x405942['_scene']['windowAreaHeight']();_0x3d965f-=_0x35bb4b/0x2*_0x48af56[_0x5780f1(0x199)](0x1,_0x258efe[_0x5780f1(0x1e2)](_0x2f9adb-0x1));}}else _0x250996[_0x5780f1(0x148)]=_0x250996[_0x5780f1(0x1a3)],_0x250996[_0x5780f1(0x1c3)]=_0x250996[_0x5780f1(0x179)];},Game_Screen[_0x45f76d(0x19c)][_0x45f76d(0x158)]=function(_0x7f41f1,_0x461d3f,_0x155185){const _0x4919ab=_0x45f76d,_0x4a457d=this['battleCameraData']();_0x4a457d[_0x4919ab(0x1e3)]=_0x7f41f1,_0x4a457d[_0x4919ab(0x142)]=_0x461d3f,_0x4a457d[_0x4919ab(0x19f)]=_0x461d3f,_0x4a457d[_0x4919ab(0x1bb)]=_0x155185;},Game_Screen[_0x45f76d(0x19c)][_0x45f76d(0x1a5)]=function(){const _0x56f937=_0x45f76d;if(!SceneManager['isSceneBattle']())return;const _0x229999=this['battleCameraData'](),_0x2b631c=_0x229999[_0x56f937(0x142)],_0x244a77=_0x229999['zoomWholeDuration'],_0x27e29d=_0x229999[_0x56f937(0x1bb)];if(_0x2b631c>0x0){if(_0x56f937(0x136)!=='EvUzB')_0x229999['zoomScale']=this['applyEasing'](_0x229999[_0x56f937(0x168)],_0x229999[_0x56f937(0x1e3)],_0x2b631c,_0x244a77,_0x27e29d),_0x229999[_0x56f937(0x142)]--;else{const _0xb99718=this[_0x56f937(0x191)]();_0xb99718[_0x56f937(0x1d9)]=![],_0xb99718[_0x56f937(0x174)]=_0x53e831[_0x56f937(0x1b2)](_0x244147),_0xb99718[_0x56f937(0x1d6)]=_0x880cfa[_0x56f937(0x1b2)](_0x35bb41),_0xb99718['cameraDuration']=_0x53e5d2,_0xb99718[_0x56f937(0x1af)]=_0x356a8b,_0xb99718[_0x56f937(0x1d5)]=_0x1f6088;}}else _0x229999[_0x56f937(0x168)]=_0x229999['zoomScaleTarget'];},Game_Screen[_0x45f76d(0x19c)][_0x45f76d(0x165)]=function(_0x2b73cb,_0x11c3a6,_0xee4f6a,_0xd0d31a,_0x529e56){const _0xb67fb2=_0x45f76d,_0x34d2d5=VisuMZ[_0xb67fb2(0x196)]((_0xd0d31a-_0xee4f6a)/_0xd0d31a,_0x529e56||_0xb67fb2(0x192)),_0x41c142=VisuMZ[_0xb67fb2(0x196)]((_0xd0d31a-_0xee4f6a+0x1)/_0xd0d31a,_0x529e56||_0xb67fb2(0x192)),_0x3f34fc=(_0x2b73cb-_0x11c3a6*_0x34d2d5)/(0x1-_0x34d2d5);return _0x3f34fc+(_0x11c3a6-_0x3f34fc)*_0x41c142;},VisuMZ['ActSeqCamera']['Scene_Options_maxCommands']=Scene_Options['prototype']['maxCommands'],Scene_Options['prototype'][_0x45f76d(0x149)]=function(){const _0x4fa219=_0x45f76d;let _0x547f1a=VisuMZ['ActSeqCamera']['Scene_Options_maxCommands']['call'](this);const _0x27667d=VisuMZ[_0x4fa219(0x1b9)][_0x4fa219(0x181)];if(_0x27667d['Options'][_0x4fa219(0x151)]&&_0x27667d[_0x4fa219(0x13d)][_0x4fa219(0x1d7)])_0x547f1a++;return _0x547f1a;},VisuMZ[_0x45f76d(0x1b9)]['Sprite_Battler_damageOffsetX']=Sprite_Battler[_0x45f76d(0x19c)][_0x45f76d(0x162)],Sprite_Battler[_0x45f76d(0x19c)]['damageOffsetX']=function(){const _0x377bcc=_0x45f76d;let _0x5ea8f0=VisuMZ[_0x377bcc(0x1b9)][_0x377bcc(0x17a)][_0x377bcc(0x1e0)](this);return _0x5ea8f0+=Math[_0x377bcc(0x1b2)]((Graphics[_0x377bcc(0x194)]-Graphics[_0x377bcc(0x139)])/0x2),_0x5ea8f0;},VisuMZ[_0x45f76d(0x1b9)][_0x45f76d(0x14a)]=Sprite_Battler[_0x45f76d(0x19c)][_0x45f76d(0x14b)],Sprite_Battler[_0x45f76d(0x19c)][_0x45f76d(0x14b)]=function(){const _0x54e9fc=_0x45f76d;let _0x58d930=VisuMZ['ActSeqCamera'][_0x54e9fc(0x14a)]['call'](this);return _0x58d930+=Math['round']((Graphics[_0x54e9fc(0x14d)]-Graphics[_0x54e9fc(0x1e4)])/0x2),_0x58d930;},VisuMZ[_0x45f76d(0x1b9)][_0x45f76d(0x1dd)]=Sprite_Animation[_0x45f76d(0x19c)]['updateEffectGeometry'],Sprite_Animation[_0x45f76d(0x19c)][_0x45f76d(0x15b)]=function(){const _0x107107=_0x45f76d,_0x6142d=this['_animation']['scale'];if(SceneManager[_0x107107(0x198)][_0x107107(0x1b6)]){const _0x44ec1b=SceneManager['_scene'][_0x107107(0x1b6)];this[_0x107107(0x161)][_0x107107(0x1e5)]*=_0x44ec1b['scale']['x'];}VisuMZ[_0x107107(0x1b9)][_0x107107(0x1dd)][_0x107107(0x1e0)](this),this['_animation'][_0x107107(0x1e5)]=_0x6142d;},Sprite_AnimationMV['prototype'][_0x45f76d(0x189)]=function(){const _0x57b099=_0x45f76d;return this[_0x57b099(0x161)][_0x57b099(0x1da)]===0x3;},Sprite_AnimationMV[_0x45f76d(0x19c)][_0x45f76d(0x144)]=function(){const _0x45280a=_0x45f76d;return this[_0x45280a(0x18c)][_0x45280a(0x147)]>0x0;},Sprite_AnimationMV['prototype']['forSideviewTargets']=function(){const _0x461e57=_0x45f76d;if(!$gameSystem[_0x461e57(0x183)]()){const _0x19843e=this[_0x461e57(0x18c)][0x0];if(_0x19843e['constructor']===Sprite_Actor)return![];}return!![];},VisuMZ[_0x45f76d(0x1b9)][_0x45f76d(0x186)]=Spriteset_Battle[_0x45f76d(0x19c)][_0x45f76d(0x16b)],Spriteset_Battle[_0x45f76d(0x19c)][_0x45f76d(0x16b)]=function(){const _0xd0ca22=_0x45f76d;VisuMZ[_0xd0ca22(0x1b9)][_0xd0ca22(0x186)][_0xd0ca22(0x1e0)](this),this[_0xd0ca22(0x141)]=undefined,this[_0xd0ca22(0x177)]=undefined;},VisuMZ[_0x45f76d(0x1b9)][_0x45f76d(0x17d)]=Spriteset_Battle[_0x45f76d(0x19c)][_0x45f76d(0x1cd)],Spriteset_Battle['prototype'][_0x45f76d(0x1cd)]=function(){const _0x2ae4cc=_0x45f76d;VisuMZ[_0x2ae4cc(0x1b9)]['Spriteset_Battle_createLowerLayer'][_0x2ae4cc(0x1e0)](this),this[_0x2ae4cc(0x1a0)]();},Spriteset_Battle[_0x45f76d(0x19c)][_0x45f76d(0x1a0)]=function(){const _0xd62d0=_0x45f76d;if(Spriteset_Battle['_oldCamera'])return;const _0xe6c190=-Math[_0xd62d0(0x132)](Graphics['width']/0x2),_0x25e542=-Math['ceil'](Graphics[_0xd62d0(0x14d)]/0x2);this[_0xd62d0(0x18e)]['x']=0.5,this[_0xd62d0(0x18e)]['y']=0.5;const _0x5c9cd6=[this['_baseSprite'],this['_damageContainer']];_0x5c9cd6[_0xd62d0(0x173)](this[_0xd62d0(0x1e8)]);for(const _0x494d9c of _0x5c9cd6){if(!_0x494d9c)continue;_0x494d9c['x']=_0xe6c190,_0x494d9c['y']=_0x25e542;}},Spriteset_Battle[_0x45f76d(0x19c)][_0x45f76d(0x1c6)]=function(){const _0x2bf036=_0x45f76d;this[_0x2bf036(0x1b8)](),this[_0x2bf036(0x1d8)](),this['updatePositionZoom'](),this['updatePositionCamera'](),this[_0x2bf036(0x13e)]();},Spriteset_Battle[_0x45f76d(0x19c)][_0x45f76d(0x1b8)]=function(){const _0x5cf235=this['getBattleAngle']();this['angle']=_0x5cf235;},Spriteset_Battle['prototype'][_0x45f76d(0x1ae)]=function(){const _0x11ca8e=_0x45f76d;if(!ConfigManager[_0x11ca8e(0x1cb)])return 0x0;if(BattleManager['isInputting']())return 0x0;return $gameScreen[_0x11ca8e(0x191)]()[_0x11ca8e(0x1c2)];},Spriteset_Battle[_0x45f76d(0x19c)][_0x45f76d(0x1d8)]=function(){const _0x52dd15=_0x45f76d;if(BattleManager[_0x52dd15(0x1c0)]()||!ConfigManager[_0x52dd15(0x1cb)])this[_0x52dd15(0x1d2)]['x']=0x0,this[_0x52dd15(0x1d2)]['y']=0x0;else{const _0x5cb7b7=$gameScreen[_0x52dd15(0x191)]();this['skew']['x']=_0x5cb7b7['skewX'],this['skew']['y']=_0x5cb7b7['skewY'];}},Spriteset_Battle['prototype']['updatePositionZoom']=function(){const _0x23a0b2=_0x45f76d,_0x5cf94a=this[_0x23a0b2(0x19b)]();this[_0x23a0b2(0x1e5)]['x']=this[_0x23a0b2(0x1e5)]['y']=_0x5cf94a;},Spriteset_Battle[_0x45f76d(0x19c)]['getBattleZoom']=function(){const _0x7b49af=_0x45f76d;if(!ConfigManager[_0x7b49af(0x1cb)])return 0x1;if(BattleManager[_0x7b49af(0x1c0)]())return 0x1;return $gameScreen['battleCameraData']()[_0x7b49af(0x168)];},Spriteset_Battle['prototype'][_0x45f76d(0x19a)]=function(){const _0x4ab690=_0x45f76d;if(BattleManager[_0x4ab690(0x1c0)]()||!ConfigManager['battleCamera']){if(_0x4ab690(0x16f)===_0x4ab690(0x16c)){if(_0x56d519[_0x4ab690(0x147)]<=0x0)return;const _0x25ea31=this[_0x4ab690(0x191)]();_0x25ea31['cameraFocusTarget']=!![],_0x2818d3[_0x4ab690(0x1d4)](_0x21eb02),_0x25ea31[_0x4ab690(0x1a7)]=_0x284ce5,_0x25ea31[_0x4ab690(0x1af)]=_0x5bae89,_0x25ea31[_0x4ab690(0x1d5)]=_0x57e0c9;}else this[_0x4ab690(0x14e)]();}else Spriteset_Battle[_0x4ab690(0x171)]?this['updatePositionCameraRoamOld']():'qFoGE'!==_0x4ab690(0x145)?this[_0x4ab690(0x180)]():(_0x9eadaa['cameraOffsetX']=_0x59b736[_0x4ab690(0x155)],_0x1646d4[_0x4ab690(0x12e)]=_0x35845a[_0x4ab690(0x131)]);},Spriteset_Battle[_0x45f76d(0x19c)][_0x45f76d(0x14e)]=function(){const _0x59d8d4=_0x45f76d;if(Spriteset_Battle[_0x59d8d4(0x171)])return;this['_battleField']['y']=0x0,this['x']=Math[_0x59d8d4(0x132)](Graphics[_0x59d8d4(0x194)]/0x2),this['y']=Math[_0x59d8d4(0x132)](Graphics[_0x59d8d4(0x14d)]/0x2);},Spriteset_Battle[_0x45f76d(0x19c)]['updatePositionCameraRoamOld']=function(){const _0x4b6a4d=_0x45f76d,_0x3f9940=$gameScreen['battleCameraData'](),_0x33cbfd=this[_0x4b6a4d(0x1b0)](),_0x2af973=this[_0x4b6a4d(0x19b)]();let _0x2dfe40=-(_0x3f9940[_0x4b6a4d(0x169)]+_0x3f9940[_0x4b6a4d(0x175)])*_0x2af973+Graphics[_0x4b6a4d(0x194)]/0x2,_0x17316d=-(_0x3f9940[_0x4b6a4d(0x18f)]+_0x3f9940[_0x4b6a4d(0x12e)])*_0x2af973+Graphics[_0x4b6a4d(0x14d)]/0x2;if(_0x33cbfd&&_0x2af973>=0x1){const _0x3b2899=-Graphics[_0x4b6a4d(0x194)]*_0x2af973+Graphics['width']/0x2,_0x53168f=-Graphics[_0x4b6a4d(0x14d)]*_0x2af973+Graphics[_0x4b6a4d(0x14d)]/0x2;this['x']=Math['round'](_0x2dfe40[_0x4b6a4d(0x1ec)](_0x3b2899,0x0)),this['y']=Math[_0x4b6a4d(0x1b2)](_0x17316d[_0x4b6a4d(0x1ec)](_0x53168f,0x0));}else _0x33cbfd&&_0x2af973<0x1?_0x4b6a4d(0x1db)!==_0x4b6a4d(0x1db)?(this['x']=_0x3ac8ee[_0x4b6a4d(0x1b2)]((_0x1180f5[_0x4b6a4d(0x194)]-_0x41f936['width']*_0x49ef29)/0x2),this['y']=_0xd6c42d['round']((_0x451e7f['height']-_0x2e80a9[_0x4b6a4d(0x14d)]*_0x30857a)/0x2)):(this['x']=Math[_0x4b6a4d(0x1b2)]((Graphics['width']-Graphics[_0x4b6a4d(0x194)]*_0x2af973)/0x2),this['y']=Math[_0x4b6a4d(0x1b2)]((Graphics[_0x4b6a4d(0x14d)]-Graphics[_0x4b6a4d(0x14d)]*_0x2af973)/0x2)):(this['x']=Math[_0x4b6a4d(0x1b2)](_0x2dfe40),this['y']=Math[_0x4b6a4d(0x1b2)](_0x17316d));},Spriteset_Battle[_0x45f76d(0x171)]=![],Spriteset_Battle['prototype'][_0x45f76d(0x1c9)]=function(){const _0x37be35=_0x45f76d;if(Imported[_0x37be35(0x18b)]&&BattleManager[_0x37be35(0x157)]())return 0x0;else{if(_0x37be35(0x1ac)===_0x37be35(0x1ac))return 0x18;else{if(!_0x1a88ea[_0x37be35(0x184)]())return;const _0x3bd9e4=this['battleCameraData'](),_0x2e9404=_0x3bd9e4['cameraOffsetDuration'],_0x35aa3f=_0x3bd9e4[_0x37be35(0x15e)],_0x16ce82=_0x3bd9e4[_0x37be35(0x170)];_0x2e9404>0x0?(_0x3bd9e4[_0x37be35(0x175)]=this[_0x37be35(0x165)](_0x3bd9e4[_0x37be35(0x175)],_0x3bd9e4['cameraOffsetXTarget'],_0x2e9404,_0x35aa3f,_0x16ce82),_0x3bd9e4[_0x37be35(0x12e)]=this[_0x37be35(0x165)](_0x3bd9e4[_0x37be35(0x12e)],_0x3bd9e4[_0x37be35(0x131)],_0x2e9404,_0x35aa3f,_0x16ce82),_0x3bd9e4['cameraOffsetDuration']--):(_0x3bd9e4[_0x37be35(0x175)]=_0x3bd9e4[_0x37be35(0x155)],_0x3bd9e4[_0x37be35(0x12e)]=_0x3bd9e4[_0x37be35(0x131)]);}}},Spriteset_Battle[_0x45f76d(0x19c)][_0x45f76d(0x180)]=function(){const _0x272dd6=_0x45f76d,_0xba405c=$gameScreen[_0x272dd6(0x191)]();let _0x21a9cc=this[_0x272dd6(0x1b0)](),_0x3bf9ce=this['getBattleZoom'](),_0x18a8e6=-(_0xba405c[_0x272dd6(0x169)]+_0xba405c[_0x272dd6(0x175)])+Graphics[_0x272dd6(0x194)];_0x18a8e6-=(0x1-_0x3bf9ce)*(Graphics[_0x272dd6(0x194)]/0x2-_0xba405c[_0x272dd6(0x169)]-_0xba405c[_0x272dd6(0x175)]);let _0x3183a9=-(_0xba405c['cameraY']+_0xba405c['cameraOffsetY'])+Graphics[_0x272dd6(0x14d)];this[_0x272dd6(0x17e)]['y']=0x0;const _0x23eff8=this[_0x272dd6(0x17e)]['y']*0x2-Math['round']((Graphics[_0x272dd6(0x14d)]-Graphics[_0x272dd6(0x1e4)])/0x2);_0x3183a9+=_0x23eff8*(0x1-_0x3bf9ce),_0x3183a9-=(0x1-_0x3bf9ce)*(Graphics[_0x272dd6(0x14d)]/0x2-_0xba405c['cameraY']-_0xba405c[_0x272dd6(0x12e)]);const _0x443219=Imported[_0x272dd6(0x18b)]&&BattleManager[_0x272dd6(0x157)]();if(!_0x443219){if(_0x272dd6(0x1b3)===_0x272dd6(0x1eb))return this[_0x272dd6(0x161)][_0x272dd6(0x1da)]===0x3;else{const _0x5f288d=SceneManager[_0x272dd6(0x198)][_0x272dd6(0x197)]();_0x3183a9-=_0x5f288d/0x2*Math[_0x272dd6(0x199)](0x1,Math[_0x272dd6(0x1e2)](_0x3bf9ce-0x1));}}if(_0x21a9cc){if(_0x3bf9ce>=0x1){if(_0x272dd6(0x15f)===_0x272dd6(0x15f)){const _0x54ff35=Graphics[_0x272dd6(0x194)]-Graphics[_0x272dd6(0x194)]/0x2*_0x3bf9ce,_0x4cf4e1=Graphics[_0x272dd6(0x194)]/0x2*_0x3bf9ce;_0x18a8e6=_0x18a8e6[_0x272dd6(0x1ec)](_0x54ff35,_0x4cf4e1);const _0x290c7b=Graphics[_0x272dd6(0x14d)]-Graphics[_0x272dd6(0x14d)]/0x2*_0x3bf9ce,_0x4ca453=Graphics['height']/0x2*_0x3bf9ce;_0x3183a9=_0x3183a9['clamp'](_0x290c7b,_0x4ca453);}else this[_0x272dd6(0x150)]=_0x480af3[_0x272dd6(0x1e6)]((_0x5ef723,_0x2d7fb4,_0x1b1879)=>_0x1b1879[_0x272dd6(0x1a6)](_0x5ef723)===_0x2d7fb4);}else _0x3bf9ce<0x1&&(_0x18a8e6=Graphics[_0x272dd6(0x194)]/0x2,_0x3183a9=Graphics[_0x272dd6(0x14d)]/0x2);}this['x']=Math[_0x272dd6(0x1b2)](_0x18a8e6),this['y']=Math[_0x272dd6(0x1b2)](_0x3183a9);},Spriteset_Battle[_0x45f76d(0x19c)][_0x45f76d(0x1b0)]=function(){const _0x3bc0a0=_0x45f76d;if(!ConfigManager[_0x3bc0a0(0x1cb)])return!![];if(BattleManager[_0x3bc0a0(0x1c0)]())return!![];return $gameScreen['battleCameraData']()['cameraClamp'];},Spriteset_Battle['prototype'][_0x45f76d(0x13e)]=function(){const _0x253947=_0x45f76d;this['x']+=Math[_0x253947(0x1b2)]($gameScreen[_0x253947(0x134)]()),Imported['VisuMZ_0_CoreEngine']&&this[_0x253947(0x1a2)]&&this[_0x253947(0x1a2)]();},VisuMZ[_0x45f76d(0x1b9)][_0x45f76d(0x164)]=Window_Options[_0x45f76d(0x19c)][_0x45f76d(0x1b5)],Window_Options[_0x45f76d(0x19c)]['addGeneralOptions']=function(){const _0x261cf2=_0x45f76d;VisuMZ[_0x261cf2(0x1b9)]['Window_Options_addGeneralOptions']['call'](this),this[_0x261cf2(0x1ea)]();},Window_Options[_0x45f76d(0x19c)][_0x45f76d(0x1ea)]=function(){const _0x3d9256=_0x45f76d;VisuMZ[_0x3d9256(0x1b9)][_0x3d9256(0x181)][_0x3d9256(0x13d)][_0x3d9256(0x151)]&&this['addBattleCameraCommand']();},Window_Options[_0x45f76d(0x19c)][_0x45f76d(0x1c5)]=function(){const _0x130ff5=_0x45f76d,_0x4a0210=TextManager[_0x130ff5(0x14c)],_0x21b548=_0x130ff5(0x1cb);this[_0x130ff5(0x1cc)](_0x4a0210,_0x21b548);};function _0x52e3(){const _0x5af105=['call','version','sqrt','zoomScaleTarget','boxHeight','scale','filter','lqMWd','_animationContainer','updateBattleAngle','addBattleCameraCommands','HChfS','clamp','_battleCamera','gFsaB','cameraOffsetY','angleTarget','setBattleCameraPoint','cameraOffsetYTarget','ceil','toUpperCase','shake','InOutSine','Wzrte','ARRAYSTRUCT','updateBattleCameraOffset','boxWidth','setBattleCameraTargets','initialBattleCameraSettings','ARRAYSTR','Options','updatePositionShake','STR','50VLxvkA','_cacheScaleX','zoomDuration','lPGpq','hasTargets','wLEms','AgBns','length','skewX','maxCommands','Sprite_Battler_damageOffsetY','damageOffsetY','battleCameraOption','height','updatePositionCameraNeutral','cameraFocusTargets','_cameraFocusTargets','AddOption','max','skewEasing','applyData','cameraOffsetXTarget','ARRAYJSON','isUsingSideviewUiLayout','setBattleZoom','OptionsName','4000488TYcwkP','updateEffectGeometry','setup','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','cameraOffsetDurationWhole','eHWwh','2zQQRKp','_animation','damageOffsetX','updateBattleCamera','Window_Options_addGeneralOptions','applyEasing','ConvertParams','makeData','zoomScale','cameraX','angleWholeDuration','initialize','LKtXN','constructor','cameraOffsetDuration','gNzQu','cameraOffsetEasing','_oldCamera','includes','push','cameraXTarget','cameraOffsetX','VisuMZ_1_BattleCore','_cacheScaleY','ARRAYNUM','skewTargetY','Sprite_Battler_damageOffsetX','angleEasing','ConfigManager_applyData','Spriteset_Battle_createLowerLayer','_battleField','update','updatePositionCameraRoamNew','Settings','clearCameraFocusTargets','isSideView','isSceneBattle','setBattleAngle','Spriteset_Battle_initialize','1013640qFbEQE','parameters','isCenteredAnimation','Game_Screen_update','VisuMZ_3_SideviewBattleUI','_targets','30656xrumNs','anchor','cameraY','4611838QCytUv','battleCameraData','Linear','Game_Screen_clear','width','skewDuration','ApplyEasing','windowAreaHeight','_scene','min','updatePositionCamera','getBattleZoom','prototype','clear','status','zoomWholeDuration','applyAnchorsForTiltEffect','map','updatePositionCoreEngine','skewTargetX','2448fyfocY','updateBattleZoom','indexOf','cameraDuration','cameraFocusTargetsX','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','NUM','exit','ecjiK','3530250tUsvbD','getBattleAngle','cameraDurationWhole','getBattleCameraClamp','VisuMZ_0_CoreEngine','round','aYNvd','ConfigManager_makeData','addGeneralOptions','_spriteset','battler','updatePositionAngle','ActSeqCamera','tzXbk','zoomEasing','format','parse','2828607yRGDKQ','setBattleCameraOffset','isInputting','EVAL','angle','skewY','JSON','addBattleCameraCommand','updatePosition','match','BattleManager_setup','battleFieldOffsetY','angleDuration','battleCamera','addCommand','createLowerLayer','7hTZGEX','updateBattleSkew','Ufvbo','reduce','skew','skewWholeDuration','setCameraFocusTargets','cameraEasing','cameraYTarget','AdjustRect','updatePositionSkew','cameraFocusTarget','position','YDdlp','name','Sprite_Animation_updateEffectGeometry','clearBattleCamera','602745SumkKA'];_0x52e3=function(){return _0x5af105;};return _0x52e3();}