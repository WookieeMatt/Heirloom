//=============================================================================
// VisuStella MZ - Weapon Animation
// VisuMZ_3_WeaponAnimation.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_WeaponAnimation = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaponAnimation = VisuMZ.WeaponAnimation || {};
VisuMZ.WeaponAnimation.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.10] [WeaponAnimation]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weapon_Animation_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to give your swords different images despite being the same
 * sword type? Or how about your axes? Or any weapon? Now you can! On top of
 * that, you can even use custom images to accomplish this.
 * 
 * This plugin allows you to go past the standard weapon images and even using
 * custom images.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Select different weapon animation from the weapon sprite sheets.
 * * Use custom images for weapon animations.
 * * Allow weapons to have their own unique weapon animation sprites.
 * * Customize hues and motions for the weapon animations.
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
 * * VisuMZ_1_BattleCore
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
 * Sprite_Weapon loadBitmap function Change
 * 
 * Due to how this plugin works, loading bitmaps for the Sprite_Weapon
 * prototype class is now different. Depending if there is any data found for a
 * custom weapon animation, the bitmap data will be loaded differently to
 * accommodate the differences in file structure.
 *
 * ---
 * 
 * Sprite_Weapon updateFrame function Change
 * 
 * Due to how this plugin works, updating frames for the Sprite_Weapon
 * prototype class is now different. Depending if there is any data found for a
 * custom weapon animation, the frame data will be setup differently to
 * accommodate the differences in file structure.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Weapon Image-Related Notetags ===
 * 
 * ---
 *
 * <Weapon Image: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the weapon image used for the affected battler to a numeric type.
 * - Replace 'x' with a number representing the weapon image's ID.
 * - You'll get an image from "img/system/" folder's weapon sheets.
 * - Each sheet contains 12 weapon images. If you wish to load a weapon from
 *   the first sheet, it'll be within 1-12.
 * - If you wish to load a weapon from the second sheet, it'll be within 13-24,
 *   and so on.
 * - The weapon sheets increase in increments of 12, which means that if you
 *   wish to load a weapon from weapon sheet 50, x will be between 589 to 600.
 *
 *   By default, these are the number values associated with each:
 * 
 *   1 - Dagger   7 - Long Bow  13 - Mace       19 - Slingshot  25 - Book
 *   2 - Sword    8 - Crossbow  14 - Rod        20 - Shotgun    26 - Custom
 *   3 - Flail    9 - Gun       15 - Club       21 - Rifle      27 - Custom
 *   4 - Axe     10 - Claw      16 - Chain      22 - Chainsaw   28 - Custom
 *   5 - Whip    11 - Glove     17 - Sword#2    23 - Railgun    29 - Custom
 *   6 - Staff   12 - Spear     18 - Iron Pipe  24 - Stun Rod   30 - Custom
 *
 * ---
 *
 * <Weapon Image: filename>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the weapon image used for the affected battler to a unique file.
 * - Replace 'filename' with the name of the file found in the "img/weapons/"
 *   folder (or whichever folder you've set it to in the plugin parameters).
 * - This is case sensitive.
 * - Do not include the file extension.
 * 
 *   Example:
 * 
 *   <Weapon Image: Beam Sword>
 *
 * ---
 *
 * <Weapon Motion: thrust>
 * <Weapon Motion: swing>
 * <Weapon Motion: missile>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This notetag requires a <Weapon Image: x> or <Weapon Image: filename>
 *   notetag on the same trait object.
 * - Forces the weapon to play a specific motion when attacking.
 * - If this is not defined, the played motion will be the custom motion
 *   declared in the plugin parameters.
 * - You can also replace the motion type with the following:
 * 
 *   walk     wait     chant     guard     damage     evade
 *   thrust   swing    missile   skill     spell      item
 *   escape   victory  dying     abnormal  sleep      dead
 *
 * ---
 *
 * <Weapon Hue: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This notetag requires a <Weapon Image: x> or <Weapon Image: filename>
 *   notetag on the same trait object.
 * - Changes the hue of the custom weapon image.
 * - Replace 'x' with a hue number between 0 and 255.
 *
 * ---
 * 
 * === State Attack Animation-Related Notetags ===
 * 
 * ---
 * 
 * <Attack Animation: x>
 * <Weapon Animation: x>
 * 
 * - Used for: State Notetags
 * - When the battler attacks while having a state with this notetag, the
 *   battler's attack animation will be changed to 'x'.
 * - This can be used for things like a "Burning Weapon" state that turns the
 *   attack animation into a flame attack instead of the normal attack.
 * - This only applies when a skill/item's animation is set to "Normal Attack".
 * - Replace 'x' with a number representing the animation's ID.
 * - If a battler is affected by multiple states with these notetags, then the
 *   state with the highest priority number will have its effect take place.
 * - There are no differences between the notetags. They both achieve the same
 *   functionality. <Weapon Animation: x> happens to be a legacy notetag
 *   carried from YEP's library.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * There's a couple of plugin parameters that can be adjusted for this plugin.
 *
 * ---
 *
 * General
 * 
 *   Image Filepath:
 *   - The filepath used for custom weapon images folder.
 *   - This defaults to "img/weapons/"
 * 
 *   Default Motion:
 *   - Default motion used for custom weapon images.
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
 * Version 1.10: July 21, 2022
 * * Feature Update!
 * ** For those who did not set up their weapon attack motions, this plugin
 *    will now default the weapon attack type to "Thrust" and weapon attack
 *    image to "Dagger". Update made by Irina.
 * 
 * Version 1.09: April 7, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New state-only notetags added by Arisu:
 * *** <Attack Animation: x>
 * *** <Weapon Animation: x>
 * **** Both notetags do the same thing, just that one is a legacy notetag from
 *      the past YEP library.
 * **** When the battler attacks while having a state with this notetag, the
 *      battler's attack animation will be changed to 'x'.
 * **** This can be used for things like a "Burning Weapon" state that turns
 *      the attack animation into a flame attack instead of the normal attack.
 * **** This only applies when a skill/item's animation is set to
 *      "Normal Attack".
 * 
 * Version 1.08: February 17, 2022
 * * Bug Fixes!
 * ** Added a fail safe to prevent freeze motion frames on items trying to use
 *    custom weapon sprites, but do not actually have them in the game project.
 *    Fix made by Olivia.
 * 
 * Version 1.07: January 27, 2022
 * * Bug Fixes!
 * ** Freeze motion frames for weapon attacks will default to the enforced
 *    weapon graphic if there is no custom weapon sprite on the weapon, but on
 *    a piece of armor instead. Update made by Olivia.
 * 
 * Version 1.06: June 11, 2021
 * * Bug Fixes!
 * ** Freeze motion frames for weapon attacks will no longer cause crashes if
 *    the user does not have a weapon equipped. Fix made by Olivia.
 * 
 * Version 1.05: April 9, 2021
 * * Bug Fixes!
 * ** Freeze Motions should now hide weapons instead of always displaying them
 *    when the hide option is enabled. Fix made by Olivia.
 * 
 * Version 1.04: February 12, 2021
 * * Bug Fixes!
 * ** Freeze frame now supports enemy custom weapon images. Fix made by Irina.
 * 
 * Version 1.03: January 29, 2021
 * * Bug Fixes!
 * ** Basic weapon animations should now show the proper weapon image.
 *    Fix made by Olivia.
 * ** Freeze frame now supports custom non-attack animations. Fix by Olivia.
 * 
 * Version 1.02: January 22, 2021
 * * Compatibility Update
 * ** Plugin is now compatible with Battle Core's Freeze Motion.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** If battlers with custom weapon animations perform an Action Sequence with
 *    "Show Weapon" set to false, they will no longer force the attack motion.
 *    Fix made by Yanfly.
 *
 * Version 1.00: November 25, 2020
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
 * @param WeaponAnimation
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param filepath:str
 * @text Image Filepath
 * @desc The filepath used for custom weapon images folder.
 * @default img/weapons/
 *
 * @param motion:str
 * @text Default Motion
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Default motion used for custom weapon images.
 * @default swing
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
//=============================================================================

const _0x367c7c=_0x2dc2;(function(_0x47222c,_0x416509){const _0x2def4c=_0x2dc2,_0x2d67f1=_0x47222c();while(!![]){try{const _0x4775ee=-parseInt(_0x2def4c(0x1e9))/0x1+parseInt(_0x2def4c(0x1da))/0x2*(parseInt(_0x2def4c(0x1e6))/0x3)+-parseInt(_0x2def4c(0x18f))/0x4+parseInt(_0x2def4c(0x1d1))/0x5*(-parseInt(_0x2def4c(0x197))/0x6)+parseInt(_0x2def4c(0x1f9))/0x7+parseInt(_0x2def4c(0x1df))/0x8*(parseInt(_0x2def4c(0x1aa))/0x9)+parseInt(_0x2def4c(0x1f8))/0xa;if(_0x4775ee===_0x416509)break;else _0x2d67f1['push'](_0x2d67f1['shift']());}catch(_0x233f1d){_0x2d67f1['push'](_0x2d67f1['shift']());}}}(_0x5435,0x5e55c));var label=_0x367c7c(0x187),tier=tier||0x0,dependencies=[_0x367c7c(0x1cd)],pluginData=$plugins[_0x367c7c(0x1a8)](function(_0x4950a0){const _0x306a69=_0x367c7c;return _0x4950a0[_0x306a69(0x1a3)]&&_0x4950a0[_0x306a69(0x1ee)][_0x306a69(0x1f7)]('['+label+']');})[0x0];function _0x2dc2(_0x17788d,_0x571c68){const _0x543598=_0x5435();return _0x2dc2=function(_0x2dc21f,_0x20b7f9){_0x2dc21f=_0x2dc21f-0x176;let _0x5ef3d5=_0x543598[_0x2dc21f];return _0x5ef3d5;},_0x2dc2(_0x17788d,_0x571c68);}function _0x5435(){const _0x178ab2=['WSQXc','AttackAni','toLowerCase','Pquoz','ConvertParams','initMembers','1458848lvetgL','customWeaponGraphic','parse','startAction','parameters','call','createCustomWeaponGraphicFromObj','STR','4310124pMixxZ','Game_BattlerBase_initMembers','NUM','QDyxK','exit','ARRAYFUNC','EVAL','tdYMx','refresh','ARRAYNUM','Game_BattlerBase_refresh','_customFrames','status','loadWeapon','RegExp','ImageNum','bitmap','filter','geSmE','1341rPSvZt','AFFsp','NYFCU','Game_Battler_startWeaponAnimation','clamp','attackAnimationId2','MuAJY','Ugkbz','GgIcN','Hue','nAESm','loadBitmap','ARRAYSTR','qxkmH','SjOZh','Scene_Boot_process_VisuMZ_BattleCore_Failsafes','length','_weaponImageId','name','ARRAYJSON','loadBitmapCustomWeapon','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','jrQSR','_subject','some','traitObjects','STRUCT','loadSystem','dAuPQ','tqfke','map','isCustomWeaponGraphic','height','toUpperCase','_uniqueStartWeaponAnimation','VisuMZ_1_BattleCore','Sprite_Weapon_loadBitmap','Zbghy','ARRAYEVAL','5ITLRac','Settings','version','BBGQs','weapons','match','attackAnimationId1','return\x200','_cache','1317734RYrZPK','setHue','motionType','Game_Battler_freezeMotion','states','31736dPavaH','max','getStateAttackAnimation','fZAFq','checkCacheKey','freezeMotion','trim','3petQzu','isActor','updateFrame','159804hmXXAW','dLxsg','hue','createCustomWeaponGraphic','weaponTypes','description','enemy','floor','BDsPp','format','Game_Actor_attackAnimationId1','updateFrameCustomWeaponGraphic','ARRAYSTRUCT','xDMOG','includes','2305210bNdJEG','1041565anIISi','CQGOr','setFrame','cxWKh','Game_Enemy_attackAnimationId2','BattleManager_startAction','number','Game_Enemy_attackAnimationId1','hRXdj','Game_Actor_attackAnimationId2','GiCvP','_freezeMotionData','process_VisuMZ_BattleCore_Failsafes','startWeaponAnimation','preloadCustomWeaponImage','Weapons','hasStateAttackAnimation','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ysboA','weaponImageId','filepath','UeQST','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isEnemy','prototype','JSON','Sprite_Weapon_updateFrame','width','EVnWG','note','iJZpk','Motion','motion','WeaponAnimation','_pattern'];_0x5435=function(){return _0x178ab2;};return _0x5435();}VisuMZ[label][_0x367c7c(0x1d2)]=VisuMZ[label][_0x367c7c(0x1d2)]||{},VisuMZ['ConvertParams']=function(_0x1621b3,_0x44f28a){const _0x340238=_0x367c7c;for(const _0x24d5fd in _0x44f28a){if(_0x24d5fd[_0x340238(0x1d6)](/(.*):(.*)/i)){if(_0x340238(0x1f1)!=='BDsPp')this[_0x340238(0x1be)]();else{const _0x18559c=String(RegExp['$1']),_0x2925c6=String(RegExp['$2'])[_0x340238(0x1cb)]()[_0x340238(0x1e5)]();let _0x1b0e45,_0x14892c,_0x26c817;switch(_0x2925c6){case _0x340238(0x199):_0x1b0e45=_0x44f28a[_0x24d5fd]!==''?Number(_0x44f28a[_0x24d5fd]):0x0;break;case _0x340238(0x1a0):_0x14892c=_0x44f28a[_0x24d5fd]!==''?JSON[_0x340238(0x191)](_0x44f28a[_0x24d5fd]):[],_0x1b0e45=_0x14892c[_0x340238(0x1c8)](_0x4c956=>Number(_0x4c956));break;case _0x340238(0x19d):_0x1b0e45=_0x44f28a[_0x24d5fd]!==''?eval(_0x44f28a[_0x24d5fd]):null;break;case _0x340238(0x1d0):_0x14892c=_0x44f28a[_0x24d5fd]!==''?JSON[_0x340238(0x191)](_0x44f28a[_0x24d5fd]):[],_0x1b0e45=_0x14892c[_0x340238(0x1c8)](_0x3e50c0=>eval(_0x3e50c0));break;case _0x340238(0x17f):_0x1b0e45=_0x44f28a[_0x24d5fd]!==''?JSON[_0x340238(0x191)](_0x44f28a[_0x24d5fd]):'';break;case _0x340238(0x1bd):_0x14892c=_0x44f28a[_0x24d5fd]!==''?JSON[_0x340238(0x191)](_0x44f28a[_0x24d5fd]):[],_0x1b0e45=_0x14892c[_0x340238(0x1c8)](_0xaa99f6=>JSON['parse'](_0xaa99f6));break;case'FUNC':_0x1b0e45=_0x44f28a[_0x24d5fd]!==''?new Function(JSON[_0x340238(0x191)](_0x44f28a[_0x24d5fd])):new Function(_0x340238(0x1d8));break;case _0x340238(0x19c):_0x14892c=_0x44f28a[_0x24d5fd]!==''?JSON[_0x340238(0x191)](_0x44f28a[_0x24d5fd]):[],_0x1b0e45=_0x14892c[_0x340238(0x1c8)](_0x18364f=>new Function(JSON['parse'](_0x18364f)));break;case _0x340238(0x196):_0x1b0e45=_0x44f28a[_0x24d5fd]!==''?String(_0x44f28a[_0x24d5fd]):'';break;case _0x340238(0x1b6):_0x14892c=_0x44f28a[_0x24d5fd]!==''?JSON[_0x340238(0x191)](_0x44f28a[_0x24d5fd]):[],_0x1b0e45=_0x14892c['map'](_0x10c720=>String(_0x10c720));break;case _0x340238(0x1c4):_0x26c817=_0x44f28a[_0x24d5fd]!==''?JSON[_0x340238(0x191)](_0x44f28a[_0x24d5fd]):{},_0x1b0e45=VisuMZ['ConvertParams']({},_0x26c817);break;case _0x340238(0x1f5):_0x14892c=_0x44f28a[_0x24d5fd]!==''?JSON[_0x340238(0x191)](_0x44f28a[_0x24d5fd]):[],_0x1b0e45=_0x14892c[_0x340238(0x1c8)](_0x21b500=>VisuMZ[_0x340238(0x18d)]({},JSON[_0x340238(0x191)](_0x21b500)));break;default:continue;}_0x1621b3[_0x18559c]=_0x1b0e45;}}}return _0x1621b3;},(_0x392bc4=>{const _0x5a96c4=_0x367c7c,_0x5e6526=_0x392bc4[_0x5a96c4(0x1bc)];for(const _0x5b11b7 of dependencies){if(!Imported[_0x5b11b7]){alert(_0x5a96c4(0x17c)[_0x5a96c4(0x1f2)](_0x5e6526,_0x5b11b7)),SceneManager[_0x5a96c4(0x19b)]();break;}}const _0x203335=_0x392bc4[_0x5a96c4(0x1ee)];if(_0x203335[_0x5a96c4(0x1d6)](/\[Version[ ](.*?)\]/i)){const _0x215de8=Number(RegExp['$1']);_0x215de8!==VisuMZ[label][_0x5a96c4(0x1d3)]&&(alert(_0x5a96c4(0x1bf)['format'](_0x5e6526,_0x215de8)),SceneManager[_0x5a96c4(0x19b)]());}if(_0x203335[_0x5a96c4(0x1d6)](/\[Tier[ ](\d+)\]/i)){if(_0x5a96c4(0x1fa)===_0x5a96c4(0x1cf))this['bitmap']=_0x492d3f['loadSystem']('');else{const _0x373205=Number(RegExp['$1']);_0x373205<tier?_0x5a96c4(0x1b7)===_0x5a96c4(0x1b7)?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x5a96c4(0x1f2)](_0x5e6526,_0x373205,tier)),SceneManager[_0x5a96c4(0x19b)]()):this['_freezeMotionData'][_0x5a96c4(0x1dc)]=_0xf4f922['motion']:_0x5a96c4(0x201)===_0x5a96c4(0x1b1)?_0x5e9626[_0x5a96c4(0x1a4)](_0x5bb239['name']):tier=Math['max'](_0x373205,tier);}}VisuMZ[_0x5a96c4(0x18d)](VisuMZ[label]['Settings'],_0x392bc4[_0x5a96c4(0x193)]);})(pluginData),VisuMZ[_0x367c7c(0x187)]['RegExp']={'ImageNum':/<WEAPON IMAGE:[ ](\d+)>/i,'ImageStr':/<WEAPON IMAGE:[ ](.*)>/i,'Hue':/<WEAPON HUE:[ ](\d+)>/i,'Motion':/<WEAPON MOTION:[ ](.*)>/i,'AttackAni':/<(?:WEAPON|ATTACK) ANIMATION:[ ](\d+)>/i},VisuMZ[_0x367c7c(0x187)][_0x367c7c(0x1b9)]=Scene_Boot[_0x367c7c(0x17e)][_0x367c7c(0x205)],Scene_Boot['prototype'][_0x367c7c(0x205)]=function(){const _0x2d5372=_0x367c7c,_0xcddc89=$dataSystem[_0x2d5372(0x1ed)][_0x2d5372(0x1ba)];for(let _0xc28074=0x0;_0xc28074<_0xcddc89;_0xc28074++){if(_0x2d5372(0x1a9)!==_0x2d5372(0x1b8)){const _0xadabba=$dataSystem['attackMotions'][_0xc28074];if(_0xadabba)continue;$dataSystem['attackMotions'][_0xc28074]={'type':0x1,'weaponImageId':0x1};}else{const _0x1d3e0e=_0x306a35(_0x176ae1['$1'])||0x0;if(_0x1d3e0e>0x0)return _0x1d3e0e;}}VisuMZ[_0x2d5372(0x187)][_0x2d5372(0x1b9)][_0x2d5372(0x194)](this);},ImageManager['loadWeapon']=function(_0x1d3ab8){const _0x25f969=_0x367c7c,_0x4fc1bf=VisuMZ[_0x25f969(0x187)]['Settings'][_0x25f969(0x17a)];return this[_0x25f969(0x1b5)](_0x4fc1bf,_0x1d3ab8);},VisuMZ[_0x367c7c(0x187)][_0x367c7c(0x1fe)]=BattleManager[_0x367c7c(0x192)],BattleManager[_0x367c7c(0x192)]=function(){const _0x44f648=_0x367c7c;VisuMZ[_0x44f648(0x187)][_0x44f648(0x1fe)][_0x44f648(0x194)](this),this[_0x44f648(0x1c1)]&&this[_0x44f648(0x1c1)][_0x44f648(0x207)]();},VisuMZ['WeaponAnimation'][_0x367c7c(0x198)]=Game_BattlerBase[_0x367c7c(0x17e)][_0x367c7c(0x18e)],Game_BattlerBase[_0x367c7c(0x17e)][_0x367c7c(0x18e)]=function(){const _0x1b723d=_0x367c7c;this[_0x1b723d(0x1d9)]={},VisuMZ[_0x1b723d(0x187)][_0x1b723d(0x198)]['call'](this);},VisuMZ[_0x367c7c(0x187)][_0x367c7c(0x1a1)]=Game_BattlerBase[_0x367c7c(0x17e)][_0x367c7c(0x19f)],Game_BattlerBase[_0x367c7c(0x17e)]['refresh']=function(){const _0x3498a8=_0x367c7c;this['_cache']={},VisuMZ[_0x3498a8(0x187)]['Game_BattlerBase_refresh'][_0x3498a8(0x194)](this);},Game_BattlerBase[_0x367c7c(0x17e)][_0x367c7c(0x1e3)]=function(_0x5d344f){const _0x393de4=_0x367c7c;return this[_0x393de4(0x1d9)]=this['_cache']||{},this['_cache'][_0x5d344f]!==undefined;},Game_BattlerBase[_0x367c7c(0x17e)]['customWeaponGraphic']=function(){const _0x1d1dbc=_0x367c7c;let _0x4cd1ea=_0x1d1dbc(0x190);if(this['checkCacheKey'](_0x4cd1ea))return this['_cache'][_0x4cd1ea];return this[_0x1d1dbc(0x1d9)][_0x4cd1ea]=this[_0x1d1dbc(0x1ec)](),this[_0x1d1dbc(0x1d9)][_0x4cd1ea];},Game_BattlerBase['prototype']['createCustomWeaponGraphic']=function(){const _0x2a258c=_0x367c7c;for(const _0x52df52 of this[_0x2a258c(0x1c3)]()){if(_0x2a258c(0x19e)===_0x2a258c(0x189))return this[_0x2a258c(0x176)]()?this[_0x2a258c(0x1e1)]()||_0x1040d0['WeaponAnimation'][_0x2a258c(0x200)][_0x2a258c(0x194)](this):_0x4fb388['WeaponAnimation'][_0x2a258c(0x200)][_0x2a258c(0x194)](this);else{if(!_0x52df52)continue;const _0x339b14=this[_0x2a258c(0x195)](_0x52df52);if(_0x339b14['name']!==0x0)return{'name':_0x339b14[_0x2a258c(0x1bc)],'hue':_0x339b14[_0x2a258c(0x1eb)],'motion':_0x339b14[_0x2a258c(0x186)]};}}return 0x0;},Game_BattlerBase[_0x367c7c(0x17e)]['createCustomWeaponGraphicFromObj']=function(_0x18a373){const _0x16aff6=_0x367c7c,_0x14a8a1=VisuMZ[_0x16aff6(0x187)][_0x16aff6(0x1a5)];let _0x1d9de3=0x0,_0x531e50=0x0,_0x11f573=VisuMZ['WeaponAnimation']['Settings'][_0x16aff6(0x186)];const _0x3f44e3=_0x18a373?_0x18a373['note']:'';if(_0x3f44e3[_0x16aff6(0x1d6)](_0x14a8a1[_0x16aff6(0x1a6)]))_0x1d9de3=Number(RegExp['$1'])||0x1;else{if(_0x3f44e3['match'](_0x14a8a1['ImageStr'])){if(_0x16aff6(0x18c)===_0x16aff6(0x18c))_0x1d9de3=String(RegExp['$1']);else return;}}_0x3f44e3[_0x16aff6(0x1d6)](_0x14a8a1[_0x16aff6(0x1b3)])&&(_0x531e50=Number(RegExp['$1'])[_0x16aff6(0x1ae)](0x0,0xff));if(_0x3f44e3[_0x16aff6(0x1d6)](_0x14a8a1[_0x16aff6(0x185)])){if('QDyxK'!==_0x16aff6(0x19a))return this[_0x16aff6(0x1e1)]()||_0x32a307[_0x16aff6(0x187)][_0x16aff6(0x1fd)]['call'](this);else _0x11f573=String(RegExp['$1'])[_0x16aff6(0x18b)]()[_0x16aff6(0x1e5)]();}return{'name':_0x1d9de3,'hue':_0x531e50,'motion':_0x11f573};},VisuMZ[_0x367c7c(0x187)][_0x367c7c(0x1ad)]=Game_Battler[_0x367c7c(0x17e)]['startWeaponAnimation'],Game_Battler[_0x367c7c(0x17e)][_0x367c7c(0x206)]=function(_0x3d355c){const _0x387846=_0x367c7c;if(this['_uniqueStartWeaponAnimation'])return;let _0x4533c0=![];this['customWeaponGraphic']()&&(_0x3d355c=this['customWeaponGraphic'](),_0x4533c0=!![]);VisuMZ[_0x387846(0x187)][_0x387846(0x1ad)][_0x387846(0x194)](this,_0x3d355c);if(!_0x4533c0)return;if(_0x3d355c===0x0)return;this[_0x387846(0x1cc)]=!![],this['requestMotion'](_0x3d355c['motion']||'swing'),this[_0x387846(0x1cc)]=![];},Game_Battler[_0x367c7c(0x17e)][_0x367c7c(0x207)]=function(){const _0x3bd881=_0x367c7c;if(!this[_0x3bd881(0x190)]())return;const _0x28dfbe=this[_0x3bd881(0x190)]();if(typeof _0x28dfbe[_0x3bd881(0x1bc)]===_0x3bd881(0x1ff)){const _0x196e94=Math['floor']((_0x28dfbe[_0x3bd881(0x1bc)]-0x1)/0xc)+0x1;ImageManager[_0x3bd881(0x1c5)](_0x3bd881(0x208)+_0x196e94);}else _0x3bd881(0x182)==='EVnWG'?ImageManager[_0x3bd881(0x1a4)](_0x28dfbe[_0x3bd881(0x1bc)]):_0x431ac2=_0xce8d7e(_0x1659d9['$1'])['clamp'](0x0,0xff);},VisuMZ['WeaponAnimation'][_0x367c7c(0x1dd)]=Game_Battler[_0x367c7c(0x17e)][_0x367c7c(0x1e4)],Game_Battler[_0x367c7c(0x17e)][_0x367c7c(0x1e4)]=function(_0x20b231,_0x4ca40,_0x656662){const _0x433045=_0x367c7c;VisuMZ['WeaponAnimation'][_0x433045(0x1dd)][_0x433045(0x194)](this,_0x20b231,_0x4ca40,_0x656662);if(!_0x4ca40){if(_0x433045(0x1ac)===_0x433045(0x1ac))return;else{const _0x2540ff=_0x188f5[_0x433045(0x187)]['RegExp'],_0x31d65b=_0x2540ff[_0x433045(0x18a)];return this[_0x433045(0x1de)]()[_0x433045(0x1c2)](_0x25285e=>_0x25285e&&_0x25285e[_0x433045(0x183)][_0x433045(0x1d6)](_0x31d65b));}}let _0x35ad21=0x0;_0x20b231[_0x433045(0x1d6)](/ATTACK[ ](\d+)/i)&&(_0x35ad21=Number(RegExp['$1']),_0x35ad21--);if(this[_0x433045(0x1e7)]()){if(_0x433045(0x1ab)==='Einjj'){const _0x14b547=_0x554164(_0x4cb89b['$1']);_0x14b547<_0x358929?(_0x22be85(_0x433045(0x177)['format'](_0x52491d,_0x14b547,_0x24711e)),_0x1db7da[_0x433045(0x19b)]()):_0x42df5b=_0x42bcea[_0x433045(0x1e0)](_0x14b547,_0x255dc1);}else{const _0x486559=this[_0x433045(0x1d5)](),_0x2e06de=_0x486559[_0x35ad21]||null,_0xb6e891=this['createCustomWeaponGraphicFromObj'](_0x2e06de);if(_0xb6e891[_0x433045(0x1bc)]!==0x0){if(_0x433045(0x1f6)!==_0x433045(0x17b))_0x20b231['match'](/ATTACK/i)&&(this['_freezeMotionData'][_0x433045(0x1dc)]=_0xb6e891[_0x433045(0x186)]),this[_0x433045(0x204)]['weaponImageId']=_0xb6e891[_0x433045(0x1bc)];else{const _0x5afd66=_0x59f1a8[_0x433045(0x1f0)](this['bitmap']['width']/0x3),_0x340ffd=this[_0x433045(0x1a7)][_0x433045(0x1ca)],_0x5dd837=this[_0x433045(0x188)]*_0x5afd66,_0xefc402=0x0;this['setFrame'](_0x5dd837,_0xefc402,_0x5afd66,_0x340ffd);}}else{if(_0x433045(0x1fc)===_0x433045(0x184))this[_0x433045(0x1c9)]()?this[_0x433045(0x1be)]():(this[_0x433045(0x1a2)]=![],_0x3b31a1[_0x433045(0x187)][_0x433045(0x1ce)]['call'](this),this[_0x433045(0x1db)](0x0));else{const _0xe1fef3=this[_0x433045(0x190)]();_0xe1fef3['name']!==0x0&&(_0x20b231[_0x433045(0x1d6)](/ATTACK/i)&&(_0x433045(0x1d4)==='YvYnF'?(_0x245d31('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x433045(0x1f2)](_0x3b4876,_0x117b21,_0x4bf5c3)),_0x395bf0['exit']()):this[_0x433045(0x204)][_0x433045(0x1dc)]=_0xe1fef3['motion']),this[_0x433045(0x204)][_0x433045(0x179)]=_0xe1fef3[_0x433045(0x1bc)]);}}}}else{if(this[_0x433045(0x17d)]()){const _0x3feab1=this[_0x433045(0x195)](this[_0x433045(0x1ef)]());_0x3feab1[_0x433045(0x1bc)]!==0x0&&('tqfke'===_0x433045(0x1c7)?(_0x20b231['match'](/ATTACK/i)&&(this[_0x433045(0x204)][_0x433045(0x1dc)]=_0x3feab1[_0x433045(0x186)]),this[_0x433045(0x204)][_0x433045(0x179)]=_0x3feab1[_0x433045(0x1bc)]):(_0xbd4c88[_0x433045(0x1d6)](/ATTACK/i)&&(this[_0x433045(0x204)][_0x433045(0x1dc)]=_0x2fc3ee[_0x433045(0x186)]),this[_0x433045(0x204)][_0x433045(0x179)]=_0x24a7ef['name']));}}},Game_Battler[_0x367c7c(0x17e)][_0x367c7c(0x1e1)]=function(){const _0xaa07c6=_0x367c7c,_0x2ccb79=VisuMZ[_0xaa07c6(0x187)]['RegExp'],_0x27425d=_0x2ccb79[_0xaa07c6(0x18a)];for(const _0x317177 of this[_0xaa07c6(0x1de)]()){if(!_0x317177)continue;if(_0x317177[_0xaa07c6(0x183)][_0xaa07c6(0x1d6)](_0x27425d)){const _0x13e003=Number(RegExp['$1'])||0x0;if(_0x13e003>0x0)return _0x13e003;}}return 0x0;},Game_Battler[_0x367c7c(0x17e)]['hasStateAttackAnimation']=function(){const _0x25e709=_0x367c7c,_0x3753d5=VisuMZ[_0x25e709(0x187)]['RegExp'],_0x336afb=_0x3753d5[_0x25e709(0x18a)];return this['states']()[_0x25e709(0x1c2)](_0x3263db=>_0x3263db&&_0x3263db['note'][_0x25e709(0x1d6)](_0x336afb));},VisuMZ[_0x367c7c(0x187)][_0x367c7c(0x1f3)]=Game_Actor[_0x367c7c(0x17e)][_0x367c7c(0x1d7)],Game_Actor['prototype'][_0x367c7c(0x1d7)]=function(){const _0x3054f0=_0x367c7c;return this[_0x3054f0(0x176)]()?this[_0x3054f0(0x1e1)]()||VisuMZ[_0x3054f0(0x187)][_0x3054f0(0x1f3)][_0x3054f0(0x194)](this):VisuMZ['WeaponAnimation'][_0x3054f0(0x1f3)][_0x3054f0(0x194)](this);},VisuMZ['WeaponAnimation'][_0x367c7c(0x202)]=Game_Actor[_0x367c7c(0x17e)]['attackAnimationId2'],Game_Actor[_0x367c7c(0x17e)][_0x367c7c(0x1af)]=function(){const _0x2f76aa=_0x367c7c;return this[_0x2f76aa(0x176)]()&&!!this[_0x2f76aa(0x1d5)]()[0x1]?_0x2f76aa(0x1b0)===_0x2f76aa(0x1b2)?this[_0x2f76aa(0x176)]()?this[_0x2f76aa(0x1e1)]()||_0x1c0d83[_0x2f76aa(0x187)]['Game_Actor_attackAnimationId1'][_0x2f76aa(0x194)](this):_0x592f6e[_0x2f76aa(0x187)][_0x2f76aa(0x1f3)][_0x2f76aa(0x194)](this):this[_0x2f76aa(0x1e1)]()||VisuMZ[_0x2f76aa(0x187)][_0x2f76aa(0x202)][_0x2f76aa(0x194)](this):VisuMZ['WeaponAnimation'][_0x2f76aa(0x202)][_0x2f76aa(0x194)](this);},VisuMZ['WeaponAnimation'][_0x367c7c(0x200)]=Game_Enemy['prototype']['attackAnimationId1'],Game_Enemy['prototype'][_0x367c7c(0x1d7)]=function(){const _0x2d2614=_0x367c7c;if(this['hasStateAttackAnimation']()){if(_0x2d2614(0x1c6)!==_0x2d2614(0x1c0))return this[_0x2d2614(0x1e1)]()||VisuMZ['WeaponAnimation'][_0x2d2614(0x200)][_0x2d2614(0x194)](this);else this[_0x2d2614(0x204)]['motionType']=_0x118551[_0x2d2614(0x186)];}else return VisuMZ[_0x2d2614(0x187)][_0x2d2614(0x200)][_0x2d2614(0x194)](this);},VisuMZ[_0x367c7c(0x187)][_0x367c7c(0x1fd)]=Game_Enemy[_0x367c7c(0x17e)][_0x367c7c(0x1af)],Game_Enemy[_0x367c7c(0x17e)][_0x367c7c(0x1af)]=function(){const _0x2310b6=_0x367c7c;if(this[_0x2310b6(0x176)]()){if('CRpSa'!=='CRpSa')_0x31f4d6=_0x523e15(_0x2c7545['$1']);else return this[_0x2310b6(0x1e1)]()||VisuMZ['WeaponAnimation'][_0x2310b6(0x1fd)][_0x2310b6(0x194)](this);}else return VisuMZ[_0x2310b6(0x187)][_0x2310b6(0x1fd)][_0x2310b6(0x194)](this);},Sprite_Weapon[_0x367c7c(0x17e)][_0x367c7c(0x1c9)]=function(){const _0x5cb19e=_0x367c7c;return typeof this['_weaponImageId']!==_0x5cb19e(0x1ff);},VisuMZ[_0x367c7c(0x187)][_0x367c7c(0x1ce)]=Sprite_Weapon[_0x367c7c(0x17e)][_0x367c7c(0x1b5)],Sprite_Weapon[_0x367c7c(0x17e)][_0x367c7c(0x1b5)]=function(){const _0x188e1b=_0x367c7c;this['isCustomWeaponGraphic']()?this['loadBitmapCustomWeapon']():'SiCYo'!==_0x188e1b(0x1ea)?(this[_0x188e1b(0x1a2)]=![],VisuMZ['WeaponAnimation']['Sprite_Weapon_loadBitmap'][_0x188e1b(0x194)](this),this['setHue'](0x0)):(_0xc1523a[_0x188e1b(0x1d6)](/ATTACK/i)&&(this['_freezeMotionData'][_0x188e1b(0x1dc)]=_0x49af6b[_0x188e1b(0x186)]),this['_freezeMotionData']['weaponImageId']=_0x344fe6[_0x188e1b(0x1bc)]);},Sprite_Weapon[_0x367c7c(0x17e)]['loadBitmapCustomWeapon']=function(){const _0x3cfe56=_0x367c7c;if(!this[_0x3cfe56(0x1bb)])return;if(typeof this[_0x3cfe56(0x1bb)][_0x3cfe56(0x1bc)]===_0x3cfe56(0x1ff)){const _0x47e6a3=Math['floor']((this[_0x3cfe56(0x1bb)][_0x3cfe56(0x1bc)]-0x1)/0xc)+0x1;if(_0x47e6a3>=0x1){if(_0x3cfe56(0x1e2)!==_0x3cfe56(0x203))this['bitmap']=ImageManager[_0x3cfe56(0x1c5)](_0x3cfe56(0x208)+_0x47e6a3);else return _0x6ae81b[_0x3cfe56(0x1a3)]&&_0x45fceb[_0x3cfe56(0x1ee)][_0x3cfe56(0x1f7)]('['+_0x559408+']');}else{if(_0x3cfe56(0x1b4)===_0x3cfe56(0x178)){let _0x38c3b5='customWeaponGraphic';if(this[_0x3cfe56(0x1e3)](_0x38c3b5))return this['_cache'][_0x38c3b5];return this[_0x3cfe56(0x1d9)][_0x38c3b5]=this['createCustomWeaponGraphic'](),this[_0x3cfe56(0x1d9)][_0x38c3b5];}else this[_0x3cfe56(0x1a7)]=ImageManager[_0x3cfe56(0x1c5)]('');}}else{this[_0x3cfe56(0x1a2)]=!![];const _0x218d6a=this[_0x3cfe56(0x1bb)][_0x3cfe56(0x1bc)]?this['_weaponImageId']['name']:this[_0x3cfe56(0x1bb)];this[_0x3cfe56(0x1a7)]=ImageManager['loadWeapon'](_0x218d6a||'');}this['setHue'](this['_weaponImageId'][_0x3cfe56(0x1eb)]||0x0);},VisuMZ[_0x367c7c(0x187)][_0x367c7c(0x180)]=Sprite_Weapon['prototype'][_0x367c7c(0x1e8)],Sprite_Weapon[_0x367c7c(0x17e)][_0x367c7c(0x1e8)]=function(){const _0x2ac6a0=_0x367c7c;this[_0x2ac6a0(0x1c9)]()?this[_0x2ac6a0(0x1f4)]():VisuMZ[_0x2ac6a0(0x187)][_0x2ac6a0(0x180)]['call'](this);},Sprite_Weapon[_0x367c7c(0x17e)]['updateFrameCustomWeaponGraphic']=function(){const _0x538b42=_0x367c7c;if(!this['_weaponImageId'])return;if(typeof this[_0x538b42(0x1bb)]['name']===_0x538b42(0x1ff)){const _0x4fbf09=(this[_0x538b42(0x1bb)][_0x538b42(0x1bc)]-0x1)%0xc,_0x32846c=0x60,_0x140e6b=0x40,_0x12b944=(Math['floor'](_0x4fbf09/0x6)*0x3+this[_0x538b42(0x188)])*_0x32846c,_0x29ad50=Math[_0x538b42(0x1f0)](_0x4fbf09%0x6)*_0x140e6b;this[_0x538b42(0x1fb)](_0x12b944,_0x29ad50,_0x32846c,_0x140e6b);}else{const _0x4c6606=Math[_0x538b42(0x1f0)](this[_0x538b42(0x1a7)][_0x538b42(0x181)]/0x3),_0x4d9b46=this[_0x538b42(0x1a7)][_0x538b42(0x1ca)],_0x85a284=this['_pattern']*_0x4c6606,_0x262f76=0x0;this['setFrame'](_0x85a284,_0x262f76,_0x4c6606,_0x4d9b46);}};