//=============================================================================
// VisuStella MZ - Action Sequence Camera
// VisuMZ_3_ActSeqCamera.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ActSeqCamera = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ActSeqCamera = VisuMZ.ActSeqCamera || {};
VisuMZ.ActSeqCamera.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.08] [ActSeqCamera]
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

const _0x4672d8=_0x511a;function _0xcd2c(){const _0x2a8552=['setup','MBQmM','setBattleCameraTargets','zoomDuration','pNZyb','ApplyEasing','setCameraFocusTargets','isSceneBattle','setBattleCameraOffset','cameraFocusTarget','updateBattleSkew','cameraOffsetDurationWhole','parameters','Sprite_Battler_damageOffsetX','ConvertParams','updatePositionCameraNeutral','ARRAYJSON','252hDjntO','PlIab','initialBattleCameraSettings','setBattleZoom','update','dSDUz','skewWholeDuration','QtkZm','zoomWholeDuration','pwDsS','27707bhNFJz','updateEffectGeometry','cameraClamp','Sprite_Animation_updateEffectGeometry','ARRAYSTRUCT','updatePositionZoom','updatePositionAngle','LFZlq','cameraEasing','BattleManager_setup','Spriteset_Battle_initialize','1435qRwdoL','2026910BKPNDs','Game_Screen_clear','cameraXTarget','skewTargetY','constructor','skewX','ARRAYFUNC','isSideView','VUMsF','updatePositionShake','NqsNu','boxWidth','lbmlc','WCKje','updateBattleZoom','battleCameraData','22nRxSgD','ActSeqCamera','setBattleAngle','Game_Screen_update','version','Linear','battleFieldOffsetY','round','addGeneralOptions','_targets','21828ZzVdVj','windowAreaHeight','isUsingSideviewUiLayout','updateBattleCamera','cameraOffsetEasing','PRsQu','parse','_spriteset','clear','updatePosition','battler','cameraFocusTargetsX','updateBattleAngle','damageOffsetY','QKSqK','sRYuq','setBattleCameraPoint','map','getBattleCameraClamp','uIgNb','cameraOffsetX','_cacheScaleX','_animation','STRUCT','zoomScaleTarget','AddOption','hasTargets','call','CUUYh','cameraYTarget','max','getBattleZoom','_cacheScaleY','InOutSine','sqrt','WqAtq','ARRAYNUM','24750KEwGSi','160KOcxZR','screenWidth','updatePositionCamera','scale','xeHBD','filter','updatePositionCameraRoamNew','battleCamera','boxHeight','return\x200','NUM','JMAzI','isCenteredAnimation','VisuMZ_0_CoreEngine','updatePositionCameraRoamOld','Spriteset_Battle_createLowerLayer','skewY','_battleField','advanced','initialize','battleCameraOption','addBattleCameraCommands','cameraOffsetDuration','EVAL','makeData','20446IRbGGP','angleDuration','_animationContainer','toUpperCase','applyEasing','skewEasing','indexOf','format','match','shake','trim','ceil','FUNC','zoomEasing','angleTarget','YfPdb','angleEasing','cameraOffsetXTarget','forSideviewTargets','cameraFocusTargetsY','cameraDurationWhole','STR','push','skewTargetX','Settings','clamp','exit','11089188KFrUPy','15eVZVNU','Options','_cameraFocusTargets','sdYPH','cameraX','cameraOffsetYTarget','maxCommands','min','cameraDuration','updatePositionSkew','description','addBattleCameraCommand','anchor','updateBattleCameraOffset','name','length','usBlO','width','_battleCamera','applyAnchorsForTiltEffect','cameraY','_baseSprite','AdjustRect','damageOffsetX','Window_Options_addGeneralOptions','prototype','setBattleSkew','angleWholeDuration','ARRAYSTR','cameraOffsetY','cameraFocusTargets','ConfigManager_makeData','screenHeight','skew','VisuMZ_1_BattleCore','position','clearBattleCamera','height','_oldCamera','zoomScale','170aXgRJg','EPbRV','nCUYS','status','applyData','isInputting','_scene','clearCameraFocusTargets','oGgoO','getBattleAngle','VisuMZ_3_SideviewBattleUI','includes','angle','updatePositionCoreEngine'];_0xcd2c=function(){return _0x2a8552;};return _0xcd2c();}function _0x511a(_0x5adea3,_0x1c8ec9){const _0xcd2c17=_0xcd2c();return _0x511a=function(_0x511a7d,_0x2bba23){_0x511a7d=_0x511a7d-0x8c;let _0x28a47c=_0xcd2c17[_0x511a7d];return _0x28a47c;},_0x511a(_0x5adea3,_0x1c8ec9);}(function(_0x52116a,_0x2fb724){const _0x4728b4=_0x511a,_0x2b1e60=_0x52116a();while(!![]){try{const _0x33a43c=parseInt(_0x4728b4(0xfd))/0x1+-parseInt(_0x4728b4(0x90))/0x2*(parseInt(_0x4728b4(0xac))/0x3)+-parseInt(_0x4728b4(0x123))/0x4*(parseInt(_0x4728b4(0xd4))/0x5)+parseInt(_0x4728b4(0xf3))/0x6*(-parseInt(_0x4728b4(0x108))/0x7)+-parseInt(_0x4728b4(0x149))/0x8*(parseInt(_0x4728b4(0x148))/0x9)+parseInt(_0x4728b4(0x109))/0xa*(-parseInt(_0x4728b4(0x119))/0xb)+parseInt(_0x4728b4(0xab))/0xc;if(_0x33a43c===_0x2fb724)break;else _0x2b1e60['push'](_0x2b1e60['shift']());}catch(_0x510467){_0x2b1e60['push'](_0x2b1e60['shift']());}}}(_0xcd2c,0x3c191));var label=_0x4672d8(0x11a),tier=tier||0x0,dependencies=[_0x4672d8(0x156),_0x4672d8(0xce)],pluginData=$plugins[_0x4672d8(0x14e)](function(_0x223eca){const _0x27387a=_0x4672d8;return _0x223eca[_0x27387a(0xd7)]&&_0x223eca[_0x27387a(0xb6)][_0x27387a(0xdf)]('['+label+']');})[0x0];VisuMZ[label][_0x4672d8(0xa8)]=VisuMZ[label][_0x4672d8(0xa8)]||{},VisuMZ[_0x4672d8(0xf0)]=function(_0x383556,_0x34b3d2){const _0x382043=_0x4672d8;for(const _0x170e54 in _0x34b3d2){if(_0x170e54['match'](/(.*):(.*)/i)){const _0x89df67=String(RegExp['$1']),_0x4befb1=String(RegExp['$2'])[_0x382043(0x93)]()[_0x382043(0x9a)]();let _0x1b1b2d,_0x369c98,_0x100bdd;switch(_0x4befb1){case _0x382043(0x153):_0x1b1b2d=_0x34b3d2[_0x170e54]!==''?Number(_0x34b3d2[_0x170e54]):0x0;break;case _0x382043(0x147):_0x369c98=_0x34b3d2[_0x170e54]!==''?JSON['parse'](_0x34b3d2[_0x170e54]):[],_0x1b1b2d=_0x369c98[_0x382043(0x134)](_0x405f31=>Number(_0x405f31));break;case _0x382043(0x8e):_0x1b1b2d=_0x34b3d2[_0x170e54]!==''?eval(_0x34b3d2[_0x170e54]):null;break;case'ARRAYEVAL':_0x369c98=_0x34b3d2[_0x170e54]!==''?JSON[_0x382043(0x129)](_0x34b3d2[_0x170e54]):[],_0x1b1b2d=_0x369c98[_0x382043(0x134)](_0x568bbf=>eval(_0x568bbf));break;case'JSON':_0x1b1b2d=_0x34b3d2[_0x170e54]!==''?JSON[_0x382043(0x129)](_0x34b3d2[_0x170e54]):'';break;case _0x382043(0xf2):_0x369c98=_0x34b3d2[_0x170e54]!==''?JSON[_0x382043(0x129)](_0x34b3d2[_0x170e54]):[],_0x1b1b2d=_0x369c98[_0x382043(0x134)](_0x25a928=>JSON['parse'](_0x25a928));break;case _0x382043(0x9c):_0x1b1b2d=_0x34b3d2[_0x170e54]!==''?new Function(JSON[_0x382043(0x129)](_0x34b3d2[_0x170e54])):new Function(_0x382043(0x152));break;case _0x382043(0x10f):_0x369c98=_0x34b3d2[_0x170e54]!==''?JSON['parse'](_0x34b3d2[_0x170e54]):[],_0x1b1b2d=_0x369c98[_0x382043(0x134)](_0x110444=>new Function(JSON[_0x382043(0x129)](_0x110444)));break;case _0x382043(0xa5):_0x1b1b2d=_0x34b3d2[_0x170e54]!==''?String(_0x34b3d2[_0x170e54]):'';break;case _0x382043(0xc8):_0x369c98=_0x34b3d2[_0x170e54]!==''?JSON[_0x382043(0x129)](_0x34b3d2[_0x170e54]):[],_0x1b1b2d=_0x369c98[_0x382043(0x134)](_0x294f18=>String(_0x294f18));break;case _0x382043(0x13a):_0x100bdd=_0x34b3d2[_0x170e54]!==''?JSON[_0x382043(0x129)](_0x34b3d2[_0x170e54]):{},_0x1b1b2d=VisuMZ[_0x382043(0xf0)]({},_0x100bdd);break;case _0x382043(0x101):_0x369c98=_0x34b3d2[_0x170e54]!==''?JSON[_0x382043(0x129)](_0x34b3d2[_0x170e54]):[],_0x1b1b2d=_0x369c98[_0x382043(0x134)](_0x1ff0b9=>VisuMZ[_0x382043(0xf0)]({},JSON[_0x382043(0x129)](_0x1ff0b9)));break;default:continue;}_0x383556[_0x89df67]=_0x1b1b2d;}}return _0x383556;},(_0x3a6e6a=>{const _0x834bff=_0x4672d8,_0x59edf4=_0x3a6e6a[_0x834bff(0xba)];for(const _0x551f32 of dependencies){if(_0x834bff(0x131)===_0x834bff(0x128))_0xe2cd2f['ActSeqCamera'][_0x834bff(0x158)][_0x834bff(0x13e)](this),this[_0x834bff(0xbf)]();else{if(!Imported[_0x551f32]){if('QtkZm'!==_0x834bff(0xfa))_0x21540b[_0x834bff(0x11a)][_0x834bff(0x107)][_0x834bff(0x13e)](this),this['_cacheScaleX']=_0x53a0fe,this[_0x834bff(0x143)]=_0x23fd4f;else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x834bff(0x97)](_0x59edf4,_0x551f32)),SceneManager[_0x834bff(0xaa)]();break;}}}}const _0x4aecb1=_0x3a6e6a[_0x834bff(0xb6)];if(_0x4aecb1['match'](/\[Version[ ](.*?)\]/i)){if(_0x834bff(0x116)==='tFleo')return _0x51242a[_0x834bff(0xd7)]&&_0x390935[_0x834bff(0xb6)][_0x834bff(0xdf)]('['+_0x2b4a54+']');else{const _0xa10619=Number(RegExp['$1']);_0xa10619!==VisuMZ[label][_0x834bff(0x11d)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x834bff(0x97)](_0x59edf4,_0xa10619)),SceneManager[_0x834bff(0xaa)]());}}if(_0x4aecb1[_0x834bff(0x98)](/\[Tier[ ](\d+)\]/i)){const _0x122a84=Number(RegExp['$1']);_0x122a84<tier?'vJfnk'===_0x834bff(0xd5)?(this[_0x834bff(0x103)](),this[_0x834bff(0xb5)](),this[_0x834bff(0x102)](),this['updatePositionCamera'](),this[_0x834bff(0x112)]()):(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x834bff(0x97)](_0x59edf4,_0x122a84,tier)),SceneManager[_0x834bff(0xaa)]()):tier=Math[_0x834bff(0x141)](_0x122a84,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x3a6e6a[_0x834bff(0xee)]);})(pluginData),ConfigManager[_0x4672d8(0x150)]=!![],VisuMZ['ActSeqCamera']['ConfigManager_makeData']=ConfigManager['makeData'],ConfigManager[_0x4672d8(0x8f)]=function(){const _0xe4c58d=_0x4672d8,_0x13e9df=VisuMZ[_0xe4c58d(0x11a)][_0xe4c58d(0xcb)][_0xe4c58d(0x13e)](this);return _0x13e9df[_0xe4c58d(0x150)]=this['battleCamera'],_0x13e9df;},VisuMZ[_0x4672d8(0x11a)]['ConfigManager_applyData']=ConfigManager['applyData'],ConfigManager[_0x4672d8(0xd8)]=function(_0x217ad7){const _0x3257ee=_0x4672d8;VisuMZ[_0x3257ee(0x11a)]['ConfigManager_applyData'][_0x3257ee(0x13e)](this,_0x217ad7),_0x3257ee(0x150)in _0x217ad7?this[_0x3257ee(0x150)]=_0x217ad7['battleCamera']:this['battleCamera']=!![];},TextManager['battleCameraOption']=VisuMZ[_0x4672d8(0x11a)][_0x4672d8(0xa8)][_0x4672d8(0xad)]['OptionsName'],VisuMZ[_0x4672d8(0x11a)]['BattleManager_setup']=BattleManager[_0x4672d8(0xe2)],BattleManager['setup']=function(_0x34fe0c,_0x2aa4a9,_0x91c115){const _0x64cf50=_0x4672d8;VisuMZ[_0x64cf50(0x11a)][_0x64cf50(0x106)][_0x64cf50(0x13e)](this,_0x34fe0c,_0x2aa4a9,_0x91c115),this[_0x64cf50(0xdb)]();},BattleManager[_0x4672d8(0xdb)]=function(){const _0x47fe76=_0x4672d8;this[_0x47fe76(0xae)]=[];},BattleManager[_0x4672d8(0xca)]=function(){const _0x383e53=_0x4672d8;if(this[_0x383e53(0xae)]===undefined)this['clearCameraFocusTargets']();return this[_0x383e53(0xae)];},BattleManager['setCameraFocusTargets']=function(_0x2a7ff8){const _0x1fea0f=_0x4672d8;this[_0x1fea0f(0xae)]=_0x2a7ff8['filter']((_0x329a33,_0xfe41d9,_0x4695ce)=>_0x4695ce[_0x1fea0f(0x96)](_0x329a33)===_0xfe41d9);},BattleManager[_0x4672d8(0x12e)]=function(){const _0x4e8823=_0x4672d8,_0x47226d=this['cameraFocusTargets']();if(_0x47226d[_0x4e8823(0xbb)]<=0x0)return Math[_0x4e8823(0x120)](Graphics['width']/0x2);let _0x43569b=_0x47226d['reduce']((_0x352dc5,_0x3e1820)=>_0x352dc5+=_0x3e1820[_0x4e8823(0x12d)]()['x'],0x0)/_0x47226d[_0x4e8823(0xbb)];return _0x43569b+=Math[_0x4e8823(0x120)]((Graphics[_0x4e8823(0xbd)]-Graphics[_0x4e8823(0x114)])/0x2),_0x43569b;},BattleManager[_0x4672d8(0xa3)]=function(){const _0x165e1b=_0x4672d8,_0x46ae07=this[_0x165e1b(0xca)]();if(_0x46ae07['length']<=0x0)return Math[_0x165e1b(0x120)](Graphics[_0x165e1b(0xd1)]/0x2);let _0x355f8a=_0x46ae07['reduce']((_0x126174,_0x3ce3ad)=>_0x126174+=_0x3ce3ad['battler']()['y']-Math[_0x165e1b(0x120)](_0x3ce3ad['battler']()[_0x165e1b(0xd1)]/0x2),0x0)/_0x46ae07[_0x165e1b(0xbb)];return _0x355f8a+=Math[_0x165e1b(0x120)]((Graphics[_0x165e1b(0xd1)]-Graphics['boxHeight'])/0x2),_0x355f8a;},VisuMZ[_0x4672d8(0x11a)][_0x4672d8(0x10a)]=Game_Screen[_0x4672d8(0xc5)][_0x4672d8(0x12b)],Game_Screen['prototype'][_0x4672d8(0x12b)]=function(){const _0x5d73fb=_0x4672d8;VisuMZ[_0x5d73fb(0x11a)][_0x5d73fb(0x10a)][_0x5d73fb(0x13e)](this),this[_0x5d73fb(0xd0)]();},Game_Screen[_0x4672d8(0xc5)][_0x4672d8(0xd0)]=function(){const _0x952443=_0x4672d8;this[_0x952443(0xbe)]=this[_0x952443(0xf5)]();},Game_Screen[_0x4672d8(0xc5)][_0x4672d8(0xf5)]=function(){const _0x3c0190=_0x4672d8,_0x236e44=$dataSystem[_0x3c0190(0x15b)][_0x3c0190(0x14a)],_0x48ee64=$dataSystem[_0x3c0190(0x15b)][_0x3c0190(0xcc)];return{'angle':0x0,'angleTarget':0x0,'angleDuration':0x0,'angleWholeDuration':0x0,'angleEasing':_0x3c0190(0x144),'cameraFocusTarget':![],'cameraX':Math[_0x3c0190(0x120)](_0x236e44/0x2),'cameraY':Math['round'](_0x48ee64/0x2),'cameraXTarget':Math[_0x3c0190(0x120)](_0x236e44/0x2),'cameraYTarget':Math[_0x3c0190(0x120)](_0x48ee64/0x2),'cameraDuration':0x0,'cameraDurationWhole':0x0,'cameraEasing':_0x3c0190(0x144),'cameraClamp':!![],'cameraOffsetX':0x0,'cameraOffsetY':0x0,'cameraOffsetXTarget':0x0,'cameraOffsetYTarget':0x0,'cameraOffsetDuration':0x0,'cameraOffsetDurationWhole':0x0,'cameraOffsetEasing':_0x3c0190(0x144),'skewX':0x0,'skewTargetX':0x0,'skewY':0x0,'skewTargetY':0x0,'skewDuration':0x0,'skewWholeDuration':0x0,'skewEasing':'InOutSine','zoomScale':0x1,'zoomScaleTarget':0x1,'zoomDuration':0x0,'zoomWholeDuration':0x0,'zoomEasing':_0x3c0190(0x144)};},Game_Screen[_0x4672d8(0xc5)][_0x4672d8(0x118)]=function(){const _0x230751=_0x4672d8;if(this[_0x230751(0xbe)]===undefined)this['clearBattleCamera']();if(!ConfigManager[_0x230751(0x150)])return this[_0x230751(0xf5)]();return this[_0x230751(0xbe)];},VisuMZ[_0x4672d8(0x11a)][_0x4672d8(0x11c)]=Game_Screen[_0x4672d8(0xc5)][_0x4672d8(0xf7)],Game_Screen[_0x4672d8(0xc5)]['update']=function(){const _0x37e900=_0x4672d8;VisuMZ[_0x37e900(0x11a)]['Game_Screen_update'][_0x37e900(0x13e)](this),this[_0x37e900(0x12f)](),this[_0x37e900(0x126)](),this[_0x37e900(0xb9)](),this[_0x37e900(0xec)](),this[_0x37e900(0x117)]();},Game_Screen['prototype'][_0x4672d8(0x11b)]=function(_0x1213dc,_0x332852,_0x365dff){const _0x49f5db=_0x4672d8,_0x19f1df=this[_0x49f5db(0x118)]();_0x19f1df[_0x49f5db(0x9e)]=-_0x1213dc,_0x19f1df['angleDuration']=_0x332852,_0x19f1df[_0x49f5db(0xc7)]=_0x332852,_0x19f1df[_0x49f5db(0xa0)]=_0x365dff;},Game_Screen[_0x4672d8(0xc5)][_0x4672d8(0x12f)]=function(){const _0x4440ba=_0x4672d8;if(!SceneManager[_0x4440ba(0xe9)]())return;const _0x4d5056=this[_0x4440ba(0x118)](),_0x503bb6=_0x4d5056[_0x4440ba(0x91)],_0x44a2c6=_0x4d5056[_0x4440ba(0xc7)],_0x536417=_0x4d5056[_0x4440ba(0xa0)];if(_0x503bb6>0x0)_0x4440ba(0xe6)===_0x4440ba(0xbc)?this['battleCamera']=!![]:(_0x4d5056[_0x4440ba(0xe0)]=this[_0x4440ba(0x94)](_0x4d5056[_0x4440ba(0xe0)],_0x4d5056[_0x4440ba(0x9e)],_0x503bb6,_0x44a2c6,_0x536417),_0x4d5056['angleDuration']--);else{if('ARIfn'===_0x4440ba(0x115)){if(!_0x2114af['battleCamera'])return 0x0;if(_0x2566ea[_0x4440ba(0xd9)]())return 0x0;return _0x4f61fc[_0x4440ba(0x118)]()[_0x4440ba(0xe0)];}else _0x4d5056[_0x4440ba(0xe0)]=_0x4d5056['angleTarget'];}},Game_Screen[_0x4672d8(0xc5)][_0x4672d8(0x133)]=function(_0x2ee2f5,_0x4ebf4a,_0x312db2,_0x34b3ce){const _0x196272=_0x4672d8,_0x346a24=this[_0x196272(0x118)]();_0x346a24[_0x196272(0xeb)]=![],_0x346a24[_0x196272(0x10b)]=Math[_0x196272(0x120)](_0x2ee2f5),_0x346a24[_0x196272(0x140)]=Math[_0x196272(0x120)](_0x4ebf4a),_0x346a24[_0x196272(0xb4)]=_0x312db2,_0x346a24[_0x196272(0xa4)]=_0x312db2,_0x346a24['cameraEasing']=_0x34b3ce;},Game_Screen['prototype'][_0x4672d8(0xe4)]=function(_0xb41427,_0x500188,_0x34bd54){const _0x1f839e=_0x4672d8;if(_0xb41427['length']<=0x0)return;const _0x1d7d9f=this[_0x1f839e(0x118)]();_0x1d7d9f['cameraFocusTarget']=!![],BattleManager[_0x1f839e(0xe8)](_0xb41427),_0x1d7d9f[_0x1f839e(0xb4)]=_0x500188,_0x1d7d9f[_0x1f839e(0xa4)]=_0x500188,_0x1d7d9f[_0x1f839e(0x105)]=_0x34bd54;},Game_Screen[_0x4672d8(0xc5)][_0x4672d8(0x126)]=function(){const _0x281bb8=_0x4672d8;if(!SceneManager['isSceneBattle']())return;const _0x295514=this[_0x281bb8(0x118)](),_0x828ad7=_0x295514[_0x281bb8(0xb4)],_0x311ffb=_0x295514[_0x281bb8(0xa4)],_0x630a60=_0x295514[_0x281bb8(0x105)];_0x295514[_0x281bb8(0xeb)]&&(_0x295514['cameraXTarget']=BattleManager[_0x281bb8(0x12e)](),_0x295514[_0x281bb8(0x140)]=BattleManager[_0x281bb8(0xa3)]()),_0x828ad7>0x0?(_0x295514[_0x281bb8(0xb0)]=this[_0x281bb8(0x94)](_0x295514[_0x281bb8(0xb0)],_0x295514[_0x281bb8(0x10b)],_0x828ad7,_0x311ffb,_0x630a60),_0x295514[_0x281bb8(0xc0)]=this[_0x281bb8(0x94)](_0x295514['cameraY'],_0x295514[_0x281bb8(0x140)],_0x828ad7,_0x311ffb,_0x630a60),_0x295514['cameraDuration']--):_0x281bb8(0x13f)===_0x281bb8(0xd6)?(_0x481f34=_0x289aa3[_0x281bb8(0xbd)]/0x2,_0x548313=_0x1debf1['height']/0x2):(_0x295514[_0x281bb8(0xb0)]=_0x295514[_0x281bb8(0x10b)],_0x295514[_0x281bb8(0xc0)]=_0x295514[_0x281bb8(0x140)]);},Game_Screen[_0x4672d8(0xc5)][_0x4672d8(0xea)]=function(_0x2df095,_0x539bce,_0x59b988,_0x3b5eb4){const _0x383ce2=_0x4672d8,_0x14b22b=this[_0x383ce2(0x118)]();_0x14b22b['cameraOffsetXTarget']=Math['round'](_0x2df095),_0x14b22b[_0x383ce2(0xb1)]=Math[_0x383ce2(0x120)](_0x539bce),_0x14b22b[_0x383ce2(0x8d)]=_0x59b988,_0x14b22b[_0x383ce2(0xed)]=_0x59b988,_0x14b22b[_0x383ce2(0x127)]=_0x3b5eb4;},Game_Screen['prototype'][_0x4672d8(0xb9)]=function(){const _0x1c90fe=_0x4672d8;if(!SceneManager['isSceneBattle']())return;const _0x200b9a=this[_0x1c90fe(0x118)](),_0x1bf677=_0x200b9a[_0x1c90fe(0x8d)],_0x4c5db1=_0x200b9a['cameraOffsetDurationWhole'],_0xe91097=_0x200b9a[_0x1c90fe(0x127)];_0x1bf677>0x0?(_0x200b9a[_0x1c90fe(0x137)]=this[_0x1c90fe(0x94)](_0x200b9a[_0x1c90fe(0x137)],_0x200b9a[_0x1c90fe(0xa1)],_0x1bf677,_0x4c5db1,_0xe91097),_0x200b9a[_0x1c90fe(0xc9)]=this[_0x1c90fe(0x94)](_0x200b9a[_0x1c90fe(0xc9)],_0x200b9a[_0x1c90fe(0xb1)],_0x1bf677,_0x4c5db1,_0xe91097),_0x200b9a['cameraOffsetDuration']--):(_0x200b9a[_0x1c90fe(0x137)]=_0x200b9a['cameraOffsetXTarget'],_0x200b9a[_0x1c90fe(0xc9)]=_0x200b9a['cameraOffsetYTarget']);},Game_Screen['prototype'][_0x4672d8(0xc6)]=function(_0x2d18e0,_0x4e63c2,_0x654feb,_0x5f12e6){const _0x19b14a=_0x4672d8,_0x775862=this[_0x19b14a(0x118)]();_0x775862[_0x19b14a(0xa7)]=_0x2d18e0,_0x775862['skewTargetY']=_0x4e63c2,_0x775862['skewDuration']=_0x654feb,_0x775862[_0x19b14a(0xf9)]=_0x654feb,_0x775862['skewEasing']=_0x5f12e6;},Game_Screen['prototype']['updateBattleSkew']=function(){const _0x1bb632=_0x4672d8;if(!SceneManager[_0x1bb632(0xe9)]())return;const _0x37c4a2=this[_0x1bb632(0x118)](),_0x9206c8=_0x37c4a2['skewDuration'],_0x852cea=_0x37c4a2['skewWholeDuration'],_0x5167fa=_0x37c4a2[_0x1bb632(0x95)];if(_0x9206c8>0x0)_0x1bb632(0x111)===_0x1bb632(0x154)?(this['x']+=_0x4f0c23[_0x1bb632(0x120)](_0x43a702[_0x1bb632(0x99)]()),_0x368161[_0x1bb632(0x156)]&&this['updatePositionCoreEngine']&&this['updatePositionCoreEngine']()):(_0x37c4a2['skewX']=this[_0x1bb632(0x94)](_0x37c4a2[_0x1bb632(0x10e)],_0x37c4a2[_0x1bb632(0xa7)],_0x9206c8,_0x852cea,_0x5167fa),_0x37c4a2[_0x1bb632(0x159)]=this[_0x1bb632(0x94)](_0x37c4a2[_0x1bb632(0x159)],_0x37c4a2[_0x1bb632(0x10c)],_0x9206c8,_0x852cea,_0x5167fa),_0x37c4a2['skewDuration']--);else{if('APwEY'!=='APwEY'){if(!_0x39e634[_0x1bb632(0xe9)]())return;const _0x470e19=this[_0x1bb632(0x118)](),_0x4582a5=_0x470e19[_0x1bb632(0x8d)],_0x1b7bb6=_0x470e19[_0x1bb632(0xed)],_0x3094cc=_0x470e19[_0x1bb632(0x127)];_0x4582a5>0x0?(_0x470e19[_0x1bb632(0x137)]=this[_0x1bb632(0x94)](_0x470e19[_0x1bb632(0x137)],_0x470e19[_0x1bb632(0xa1)],_0x4582a5,_0x1b7bb6,_0x3094cc),_0x470e19[_0x1bb632(0xc9)]=this['applyEasing'](_0x470e19[_0x1bb632(0xc9)],_0x470e19['cameraOffsetYTarget'],_0x4582a5,_0x1b7bb6,_0x3094cc),_0x470e19[_0x1bb632(0x8d)]--):(_0x470e19[_0x1bb632(0x137)]=_0x470e19[_0x1bb632(0xa1)],_0x470e19['cameraOffsetY']=_0x470e19[_0x1bb632(0xb1)]);}else _0x37c4a2[_0x1bb632(0x10e)]=_0x37c4a2[_0x1bb632(0xa7)],_0x37c4a2[_0x1bb632(0x159)]=_0x37c4a2[_0x1bb632(0x10c)];}},Game_Screen[_0x4672d8(0xc5)][_0x4672d8(0xf6)]=function(_0x1afa64,_0xd4da6a,_0x49142a){const _0x414733=_0x4672d8,_0xab5a09=this[_0x414733(0x118)]();_0xab5a09[_0x414733(0x13b)]=_0x1afa64,_0xab5a09[_0x414733(0xe5)]=_0xd4da6a,_0xab5a09[_0x414733(0xfb)]=_0xd4da6a,_0xab5a09['zoomEasing']=_0x49142a;},Game_Screen[_0x4672d8(0xc5)]['updateBattleZoom']=function(){const _0x389537=_0x4672d8;if(!SceneManager[_0x389537(0xe9)]())return;const _0x4cfd0f=this[_0x389537(0x118)](),_0x26a68a=_0x4cfd0f['zoomDuration'],_0x82b170=_0x4cfd0f['zoomWholeDuration'],_0x1d5e34=_0x4cfd0f[_0x389537(0x9d)];_0x26a68a>0x0?(_0x4cfd0f[_0x389537(0xd3)]=this[_0x389537(0x94)](_0x4cfd0f[_0x389537(0xd3)],_0x4cfd0f[_0x389537(0x13b)],_0x26a68a,_0x82b170,_0x1d5e34),_0x4cfd0f[_0x389537(0xe5)]--):_0x4cfd0f[_0x389537(0xd3)]=_0x4cfd0f['zoomScaleTarget'];},Game_Screen['prototype'][_0x4672d8(0x94)]=function(_0x437ac8,_0x2e1648,_0x11d6d4,_0x5e5014,_0x15e83f){const _0x5f454a=_0x4672d8,_0x31ea77=VisuMZ[_0x5f454a(0xe7)]((_0x5e5014-_0x11d6d4)/_0x5e5014,_0x15e83f||_0x5f454a(0x11e)),_0xce67ae=VisuMZ[_0x5f454a(0xe7)]((_0x5e5014-_0x11d6d4+0x1)/_0x5e5014,_0x15e83f||'Linear'),_0xe5299a=(_0x437ac8-_0x2e1648*_0x31ea77)/(0x1-_0x31ea77);return _0xe5299a+(_0x2e1648-_0xe5299a)*_0xce67ae;},VisuMZ['ActSeqCamera']['Scene_Options_maxCommands']=Scene_Options[_0x4672d8(0xc5)][_0x4672d8(0xb2)],Scene_Options['prototype'][_0x4672d8(0xb2)]=function(){const _0x27901c=_0x4672d8;let _0xbe6ac9=VisuMZ[_0x27901c(0x11a)]['Scene_Options_maxCommands'][_0x27901c(0x13e)](this);const _0x40e0b6=VisuMZ[_0x27901c(0x11a)][_0x27901c(0xa8)];if(_0x40e0b6[_0x27901c(0xad)][_0x27901c(0x13c)]&&_0x40e0b6[_0x27901c(0xad)][_0x27901c(0xc2)])_0xbe6ac9++;return _0xbe6ac9;},VisuMZ[_0x4672d8(0x11a)][_0x4672d8(0xef)]=Sprite_Battler[_0x4672d8(0xc5)][_0x4672d8(0xc3)],Sprite_Battler[_0x4672d8(0xc5)][_0x4672d8(0xc3)]=function(){const _0x5c6ef5=_0x4672d8;let _0x4d0d5e=VisuMZ[_0x5c6ef5(0x11a)][_0x5c6ef5(0xef)][_0x5c6ef5(0x13e)](this);return _0x4d0d5e+=Math[_0x5c6ef5(0x120)]((Graphics[_0x5c6ef5(0xbd)]-Graphics['boxWidth'])/0x2),_0x4d0d5e;},VisuMZ[_0x4672d8(0x11a)]['Sprite_Battler_damageOffsetY']=Sprite_Battler[_0x4672d8(0xc5)][_0x4672d8(0x130)],Sprite_Battler['prototype'][_0x4672d8(0x130)]=function(){const _0x1007ff=_0x4672d8;let _0x7d6c4b=VisuMZ['ActSeqCamera']['Sprite_Battler_damageOffsetY'][_0x1007ff(0x13e)](this);return _0x7d6c4b+=Math['round']((Graphics[_0x1007ff(0xd1)]-Graphics[_0x1007ff(0x151)])/0x2),_0x7d6c4b;},VisuMZ['ActSeqCamera']['Sprite_Animation_updateEffectGeometry']=Sprite_Animation[_0x4672d8(0xc5)][_0x4672d8(0xfe)],Sprite_Animation[_0x4672d8(0xc5)][_0x4672d8(0xfe)]=function(){const _0x1dfb06=_0x4672d8,_0x3e32dc=this[_0x1dfb06(0x139)][_0x1dfb06(0x14c)];if(SceneManager[_0x1dfb06(0xda)][_0x1dfb06(0x12a)]){if(_0x1dfb06(0x9f)===_0x1dfb06(0x9f)){const _0x2e0015=SceneManager['_scene'][_0x1dfb06(0x12a)];this[_0x1dfb06(0x139)]['scale']*=_0x2e0015[_0x1dfb06(0x14c)]['x'];}else _0x27679b['zoomScale']=this['applyEasing'](_0x763e5[_0x1dfb06(0xd3)],_0x5b043f[_0x1dfb06(0x13b)],_0x55b983,_0x5403eb,_0x3aa415),_0x2685e6['zoomDuration']--;}VisuMZ['ActSeqCamera'][_0x1dfb06(0x100)][_0x1dfb06(0x13e)](this),this['_animation'][_0x1dfb06(0x14c)]=_0x3e32dc;},Sprite_AnimationMV['prototype'][_0x4672d8(0x155)]=function(){const _0x48b1a2=_0x4672d8;return this[_0x48b1a2(0x139)][_0x48b1a2(0xcf)]===0x3;},Sprite_AnimationMV['prototype'][_0x4672d8(0x13d)]=function(){const _0x465b11=_0x4672d8;return this[_0x465b11(0x122)][_0x465b11(0xbb)]>0x0;},Sprite_AnimationMV['prototype'][_0x4672d8(0xa2)]=function(){const _0x1b62e3=_0x4672d8;if(!$gameSystem[_0x1b62e3(0x110)]()){if(_0x1b62e3(0xfc)!==_0x1b62e3(0xe3)){const _0x2bdabe=this[_0x1b62e3(0x122)][0x0];if(_0x2bdabe[_0x1b62e3(0x10d)]===Sprite_Actor)return![];}else{const _0x3f74a9=-_0x177de9[_0x1b62e3(0xbd)]*_0x439d5c+_0x17d809['width']/0x2,_0x3b6c1c=-_0x5aead6[_0x1b62e3(0xd1)]*_0x3ff338+_0x4d7660[_0x1b62e3(0xd1)]/0x2;this['x']=_0x3bb3cc[_0x1b62e3(0x120)](_0x55c71f[_0x1b62e3(0xa9)](_0x3f74a9,0x0)),this['y']=_0x1f4e4b[_0x1b62e3(0x120)](_0x19ac2f['clamp'](_0x3b6c1c,0x0));}}return!![];},VisuMZ[_0x4672d8(0x11a)][_0x4672d8(0x107)]=Spriteset_Battle['prototype'][_0x4672d8(0x15c)],Spriteset_Battle[_0x4672d8(0xc5)][_0x4672d8(0x15c)]=function(){const _0x4a6008=_0x4672d8;VisuMZ[_0x4a6008(0x11a)][_0x4a6008(0x107)][_0x4a6008(0x13e)](this),this[_0x4a6008(0x138)]=undefined,this['_cacheScaleY']=undefined;},VisuMZ[_0x4672d8(0x11a)]['Spriteset_Battle_createLowerLayer']=Spriteset_Battle[_0x4672d8(0xc5)]['createLowerLayer'],Spriteset_Battle[_0x4672d8(0xc5)]['createLowerLayer']=function(){const _0x577b57=_0x4672d8;VisuMZ[_0x577b57(0x11a)][_0x577b57(0x158)][_0x577b57(0x13e)](this),this[_0x577b57(0xbf)]();},Spriteset_Battle[_0x4672d8(0xc5)]['applyAnchorsForTiltEffect']=function(){const _0x3ed571=_0x4672d8;if(Spriteset_Battle['_oldCamera'])return;const _0x2376db=-Math['ceil'](Graphics[_0x3ed571(0xbd)]/0x2),_0xf40c91=-Math[_0x3ed571(0x9b)](Graphics['height']/0x2);this[_0x3ed571(0xb8)]['x']=0.5,this[_0x3ed571(0xb8)]['y']=0.5;const _0x166919=[this[_0x3ed571(0xc1)],this['_damageContainer']];_0x166919[_0x3ed571(0xa6)](this[_0x3ed571(0x92)]);for(const _0x131775 of _0x166919){if(!_0x131775)continue;_0x131775['x']=_0x2376db,_0x131775['y']=_0xf40c91;}},Spriteset_Battle[_0x4672d8(0xc5)][_0x4672d8(0x12c)]=function(){const _0xfd67e0=_0x4672d8;this[_0xfd67e0(0x103)](),this[_0xfd67e0(0xb5)](),this['updatePositionZoom'](),this[_0xfd67e0(0x14b)](),this[_0xfd67e0(0x112)]();},Spriteset_Battle[_0x4672d8(0xc5)][_0x4672d8(0x103)]=function(){const _0x4237f7=_0x4672d8,_0x4a2bde=this['getBattleAngle']();this[_0x4237f7(0xe0)]=_0x4a2bde;},Spriteset_Battle[_0x4672d8(0xc5)][_0x4672d8(0xdd)]=function(){const _0x1ede48=_0x4672d8;if(!ConfigManager[_0x1ede48(0x150)])return 0x0;if(BattleManager['isInputting']())return 0x0;return $gameScreen['battleCameraData']()[_0x1ede48(0xe0)];},Spriteset_Battle['prototype'][_0x4672d8(0xb5)]=function(){const _0x402620=_0x4672d8;if(BattleManager['isInputting']()||!ConfigManager[_0x402620(0x150)])this[_0x402620(0xcd)]['x']=0x0,this[_0x402620(0xcd)]['y']=0x0;else{const _0x51d1ab=$gameScreen['battleCameraData']();this[_0x402620(0xcd)]['x']=_0x51d1ab['skewX'],this[_0x402620(0xcd)]['y']=_0x51d1ab[_0x402620(0x159)];}},Spriteset_Battle[_0x4672d8(0xc5)][_0x4672d8(0x102)]=function(){const _0x153541=_0x4672d8,_0x10b9da=this['getBattleZoom']();this[_0x153541(0x14c)]['x']=this[_0x153541(0x14c)]['y']=_0x10b9da;},Spriteset_Battle[_0x4672d8(0xc5)]['getBattleZoom']=function(){const _0x10c216=_0x4672d8;if(!ConfigManager[_0x10c216(0x150)])return 0x1;if(BattleManager[_0x10c216(0xd9)]())return 0x1;return $gameScreen[_0x10c216(0x118)]()[_0x10c216(0xd3)];},Spriteset_Battle['prototype'][_0x4672d8(0x14b)]=function(){const _0x1fd146=_0x4672d8;BattleManager[_0x1fd146(0xd9)]()||!ConfigManager['battleCamera']?this['updatePositionCameraNeutral']():Spriteset_Battle[_0x1fd146(0xd2)]?this[_0x1fd146(0x157)]():_0x1fd146(0xaf)===_0x1fd146(0xf4)?(this['skew']['x']=0x0,this[_0x1fd146(0xcd)]['y']=0x0):this[_0x1fd146(0x14f)]();},Spriteset_Battle[_0x4672d8(0xc5)][_0x4672d8(0xf1)]=function(){const _0x409b90=_0x4672d8;if(Spriteset_Battle[_0x409b90(0xd2)])return;this['x']=Math[_0x409b90(0x9b)](Graphics['width']/0x2),this['y']=Math[_0x409b90(0x9b)](Graphics[_0x409b90(0xd1)]/0x2);},Spriteset_Battle[_0x4672d8(0xc5)][_0x4672d8(0x157)]=function(){const _0x3f360f=_0x4672d8,_0x4e38f0=$gameScreen[_0x3f360f(0x118)](),_0x544d42=this['getBattleCameraClamp'](),_0x116f53=this[_0x3f360f(0x142)]();let _0x68512=-(_0x4e38f0[_0x3f360f(0xb0)]+_0x4e38f0['cameraOffsetX'])*_0x116f53+Graphics[_0x3f360f(0xbd)]/0x2,_0x1fccc4=-(_0x4e38f0['cameraY']+_0x4e38f0['cameraOffsetY'])*_0x116f53+Graphics[_0x3f360f(0xd1)]/0x2;if(_0x544d42&&_0x116f53>=0x1){if(_0x3f360f(0xf8)!==_0x3f360f(0x136)){const _0x30837a=-Graphics[_0x3f360f(0xbd)]*_0x116f53+Graphics['width']/0x2,_0x1b6c4a=-Graphics[_0x3f360f(0xd1)]*_0x116f53+Graphics[_0x3f360f(0xd1)]/0x2;this['x']=Math[_0x3f360f(0x120)](_0x68512[_0x3f360f(0xa9)](_0x30837a,0x0)),this['y']=Math['round'](_0x1fccc4[_0x3f360f(0xa9)](_0x1b6c4a,0x0));}else _0x335e54[_0x3f360f(0x137)]=this[_0x3f360f(0x94)](_0x242162[_0x3f360f(0x137)],_0x353f40['cameraOffsetXTarget'],_0x49ed60,_0x415f0f,_0x186998),_0x3227bf[_0x3f360f(0xc9)]=this[_0x3f360f(0x94)](_0x3b7ed8[_0x3f360f(0xc9)],_0x113dd8['cameraOffsetYTarget'],_0x3d5369,_0x30bec3,_0x73f55b),_0x2bfef4['cameraOffsetDuration']--;}else _0x544d42&&_0x116f53<0x1?(this['x']=Math[_0x3f360f(0x120)]((Graphics[_0x3f360f(0xbd)]-Graphics[_0x3f360f(0xbd)]*_0x116f53)/0x2),this['y']=Math[_0x3f360f(0x120)]((Graphics['height']-Graphics[_0x3f360f(0xd1)]*_0x116f53)/0x2)):(this['x']=Math[_0x3f360f(0x120)](_0x68512),this['y']=Math[_0x3f360f(0x120)](_0x1fccc4));},Spriteset_Battle[_0x4672d8(0xd2)]=![],Spriteset_Battle[_0x4672d8(0xc5)][_0x4672d8(0x11f)]=function(){const _0x598b32=_0x4672d8;if(Imported[_0x598b32(0xde)]&&BattleManager['isUsingSideviewUiLayout']())return 0x0;else{if(_0x598b32(0x132)!==_0x598b32(0x113))return 0x18;else _0x38c4d2[_0x598b32(0x11a)][_0x598b32(0x106)]['call'](this,_0x531092,_0x152165,_0x154215),this[_0x598b32(0xdb)]();}},Spriteset_Battle[_0x4672d8(0xc5)]['updatePositionCameraRoamNew']=function(){const _0x2d85d9=_0x4672d8,_0x4f9838=$gameScreen[_0x2d85d9(0x118)]();let _0xae8d2=this[_0x2d85d9(0x135)](),_0x518083=this[_0x2d85d9(0x142)](),_0x416312=-(_0x4f9838['cameraX']+_0x4f9838[_0x2d85d9(0x137)])+Graphics[_0x2d85d9(0xbd)];_0x416312-=(0x1-_0x518083)*(Graphics[_0x2d85d9(0xbd)]/0x2-_0x4f9838[_0x2d85d9(0xb0)]-_0x4f9838[_0x2d85d9(0x137)]);let _0x237c48=-(_0x4f9838[_0x2d85d9(0xc0)]+_0x4f9838[_0x2d85d9(0xc9)])+Graphics['height'];this[_0x2d85d9(0x15a)]['y']=0x0;const _0x5d3eb3=this[_0x2d85d9(0x15a)]['y']*0x2-Math[_0x2d85d9(0x120)]((Graphics[_0x2d85d9(0xd1)]-Graphics[_0x2d85d9(0x151)])/0x2);_0x237c48+=_0x5d3eb3*(0x1-_0x518083),_0x237c48-=(0x1-_0x518083)*(Graphics[_0x2d85d9(0xd1)]/0x2-_0x4f9838[_0x2d85d9(0xc0)]-_0x4f9838[_0x2d85d9(0xc9)]);const _0x258770=Imported[_0x2d85d9(0xde)]&&BattleManager[_0x2d85d9(0x125)]();if(!_0x258770){const _0xd011b7=SceneManager['_scene'][_0x2d85d9(0x124)]();_0x237c48-=_0xd011b7/0x2*Math[_0x2d85d9(0xb3)](0x1,Math[_0x2d85d9(0x145)](_0x518083-0x1));}if(_0xae8d2){if('xeHBD'!==_0x2d85d9(0x14d)){if(_0x2cd38c[_0x2d85d9(0xd2)])return;this['x']=_0x2b76f7[_0x2d85d9(0x9b)](_0x3b12b5[_0x2d85d9(0xbd)]/0x2),this['y']=_0x233273[_0x2d85d9(0x9b)](_0x3a26d7['height']/0x2);}else{if(_0x518083>=0x1){if(_0x2d85d9(0xdc)!==_0x2d85d9(0xdc))_0x126c81[_0x2d85d9(0xb0)]=_0x5b0ef6[_0x2d85d9(0x10b)],_0x24e3cd['cameraY']=_0xb83d4c[_0x2d85d9(0x140)];else{const _0x18e5e3=Graphics['width']-Graphics[_0x2d85d9(0xbd)]/0x2*_0x518083,_0x43fe8f=Graphics[_0x2d85d9(0xbd)]/0x2*_0x518083;_0x416312=_0x416312['clamp'](_0x18e5e3,_0x43fe8f);const _0x7b200=Graphics[_0x2d85d9(0xd1)]-Graphics['height']/0x2*_0x518083,_0x3c8982=Graphics[_0x2d85d9(0xd1)]/0x2*_0x518083;_0x237c48=_0x237c48['clamp'](_0x7b200,_0x3c8982);}}else{if(_0x518083<0x1){if('LFZlq'===_0x2d85d9(0x104))_0x416312=Graphics[_0x2d85d9(0xbd)]/0x2,_0x237c48=Graphics[_0x2d85d9(0xd1)]/0x2;else{let _0x21952f=_0xd4e870[_0x2d85d9(0x11a)]['Sprite_Battler_damageOffsetX'][_0x2d85d9(0x13e)](this);return _0x21952f+=_0x13e0e5[_0x2d85d9(0x120)]((_0x476162[_0x2d85d9(0xbd)]-_0x8d22ba[_0x2d85d9(0x114)])/0x2),_0x21952f;}}}}}this['x']=Math[_0x2d85d9(0x120)](_0x416312),this['y']=Math['round'](_0x237c48);},Spriteset_Battle['prototype']['getBattleCameraClamp']=function(){const _0x5bb11d=_0x4672d8;if(!ConfigManager[_0x5bb11d(0x150)])return!![];if(BattleManager[_0x5bb11d(0xd9)]())return!![];return $gameScreen[_0x5bb11d(0x118)]()[_0x5bb11d(0xff)];},Spriteset_Battle[_0x4672d8(0xc5)]['updatePositionShake']=function(){const _0x19c0f3=_0x4672d8;this['x']+=Math[_0x19c0f3(0x120)]($gameScreen[_0x19c0f3(0x99)]()),Imported[_0x19c0f3(0x156)]&&this[_0x19c0f3(0xe1)]&&this[_0x19c0f3(0xe1)]();},VisuMZ[_0x4672d8(0x11a)][_0x4672d8(0xc4)]=Window_Options[_0x4672d8(0xc5)][_0x4672d8(0x121)],Window_Options['prototype'][_0x4672d8(0x121)]=function(){const _0x12011c=_0x4672d8;VisuMZ[_0x12011c(0x11a)][_0x12011c(0xc4)]['call'](this),this[_0x12011c(0x8c)]();},Window_Options[_0x4672d8(0xc5)][_0x4672d8(0x8c)]=function(){const _0x1399df=_0x4672d8;VisuMZ[_0x1399df(0x11a)]['Settings'][_0x1399df(0xad)]['AddOption']&&(_0x1399df(0x146)!==_0x1399df(0x146)?(_0x5aa72b[_0x1399df(0x10e)]=_0x216cde[_0x1399df(0xa7)],_0x39b81d['skewY']=_0x24758c['skewTargetY']):this['addBattleCameraCommand']());},Window_Options[_0x4672d8(0xc5)][_0x4672d8(0xb7)]=function(){const _0x5d69b=_0x4672d8,_0x283ece=TextManager[_0x5d69b(0x15d)],_0x2f04d6=_0x5d69b(0x150);this['addCommand'](_0x283ece,_0x2f04d6);};