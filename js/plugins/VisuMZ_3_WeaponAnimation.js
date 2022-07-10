//=============================================================================
// VisuStella MZ - Weapon Animation
// VisuMZ_3_WeaponAnimation.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_WeaponAnimation = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaponAnimation = VisuMZ.WeaponAnimation || {};
VisuMZ.WeaponAnimation.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.09] [WeaponAnimation]
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

function _0xcaef(){const _0x542a8c=['WeaponAnimation','Settings','MRAgE','903582oIEkYt','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_uniqueStartWeaponAnimation','height','attackAnimationId1','weaponImageId','loadBitmap','setFrame','refresh','startWeaponAnimation','_customFrames','floor','ARRAYJSON','VisuMZ_1_BattleCore','630438OrSgbc','Game_Enemy_attackAnimationId2','ARRAYFUNC','createCustomWeaponGraphic','Sprite_Weapon_updateFrame','_freezeMotionData','_subject','customWeaponGraphic','RegExp','djtPp','NUM','1rjcsme','_weaponImageId','mQeZv','hue','createCustomWeaponGraphicFromObj','filepath','parse','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Game_Enemy_attackAnimationId1','689096dLlrkh','updateFrameCustomWeaponGraphic','version','TOfJB','format','JSON','bitmap','Weapons','ARRAYEVAL','IXptM','startAction','21HMmFnV','setHue','traitObjects','prototype','call','attackAnimationId2','yGGZO','updateFrame','Game_BattlerBase_initMembers','FoEhh','loadBitmapCustomWeapon','width','getStateAttackAnimation','Game_Battler_freezeMotion','isCustomWeaponGraphic','BattleManager_startAction','_pattern','toLowerCase','TwNBA','ImageStr','requestMotion','1363512qPlozw','preloadCustomWeaponImage','osodv','Game_Actor_attackAnimationId1','AhxIV','note','loadWeapon','states','STR','isActor','number','motionType','freezeMotion','Dvxkm','clamp','TdjnM','some','rgnUH','filter','Hue','LzSmF','ImageNum','checkCacheKey','Game_Actor_attackAnimationId2','return\x200','match','yuWFC','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','exit','_cache','description','status','1444805YrWudt','FUNC','initMembers','ConvertParams','weapons','Sprite_Weapon_loadBitmap','name','Game_Battler_startWeaponAnimation','hasStateAttackAnimation','Motion','1699456UQlsYI','925038PSxqwp','Game_BattlerBase_refresh','swing','ARRAYSTRUCT','loadSystem','map','motion','STRUCT','enemy','gyYqy','vMsuu','trim'];_0xcaef=function(){return _0x542a8c;};return _0xcaef();}function _0x45df(_0x506df7,_0x937248){const _0xcaefe0=_0xcaef();return _0x45df=function(_0x45df27,_0x1442d3){_0x45df27=_0x45df27-0xac;let _0x4357ef=_0xcaefe0[_0x45df27];return _0x4357ef;},_0x45df(_0x506df7,_0x937248);}const _0x3fe345=_0x45df;(function(_0x1ced84,_0xfceb81){const _0x2877a1=_0x45df,_0x5c00ef=_0x1ced84();while(!![]){try{const _0x524101=parseInt(_0x2877a1(0x10a))/0x1*(-parseInt(_0x2877a1(0x113))/0x2)+-parseInt(_0x2877a1(0xf1))/0x3+parseInt(_0x2877a1(0xb7))/0x4+parseInt(_0x2877a1(0xd7))/0x5+parseInt(_0x2877a1(0xff))/0x6*(parseInt(_0x2877a1(0x11e))/0x7)+-parseInt(_0x2877a1(0xe1))/0x8+parseInt(_0x2877a1(0xe2))/0x9;if(_0x524101===_0xfceb81)break;else _0x5c00ef['push'](_0x5c00ef['shift']());}catch(_0x6a05f0){_0x5c00ef['push'](_0x5c00ef['shift']());}}}(_0xcaef,0x2e4e2));var label=_0x3fe345(0xee),tier=tier||0x0,dependencies=[_0x3fe345(0xfe)],pluginData=$plugins[_0x3fe345(0xc9)](function(_0x36ea33){const _0x3c8f36=_0x3fe345;return _0x36ea33[_0x3c8f36(0xd6)]&&_0x36ea33['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x3fe345(0xef)]=VisuMZ[label][_0x3fe345(0xef)]||{},VisuMZ[_0x3fe345(0xda)]=function(_0x315d93,_0x45a6ac){const _0x572a86=_0x3fe345;for(const _0x201100 in _0x45a6ac){if(_0x572a86(0xb4)===_0x572a86(0xb4)){if(_0x201100[_0x572a86(0xd0)](/(.*):(.*)/i)){const _0x66295c=String(RegExp['$1']),_0x1c5792=String(RegExp['$2'])['toUpperCase']()[_0x572a86(0xed)]();let _0x3262f3,_0x5d7321,_0x3ff491;switch(_0x1c5792){case _0x572a86(0x109):_0x3262f3=_0x45a6ac[_0x201100]!==''?Number(_0x45a6ac[_0x201100]):0x0;break;case'ARRAYNUM':_0x5d7321=_0x45a6ac[_0x201100]!==''?JSON[_0x572a86(0x110)](_0x45a6ac[_0x201100]):[],_0x3262f3=_0x5d7321[_0x572a86(0xe7)](_0x2e9698=>Number(_0x2e9698));break;case'EVAL':_0x3262f3=_0x45a6ac[_0x201100]!==''?eval(_0x45a6ac[_0x201100]):null;break;case _0x572a86(0x11b):_0x5d7321=_0x45a6ac[_0x201100]!==''?JSON[_0x572a86(0x110)](_0x45a6ac[_0x201100]):[],_0x3262f3=_0x5d7321['map'](_0x5ec502=>eval(_0x5ec502));break;case _0x572a86(0x118):_0x3262f3=_0x45a6ac[_0x201100]!==''?JSON[_0x572a86(0x110)](_0x45a6ac[_0x201100]):'';break;case _0x572a86(0xfd):_0x5d7321=_0x45a6ac[_0x201100]!==''?JSON[_0x572a86(0x110)](_0x45a6ac[_0x201100]):[],_0x3262f3=_0x5d7321[_0x572a86(0xe7)](_0x3dac71=>JSON[_0x572a86(0x110)](_0x3dac71));break;case _0x572a86(0xd8):_0x3262f3=_0x45a6ac[_0x201100]!==''?new Function(JSON[_0x572a86(0x110)](_0x45a6ac[_0x201100])):new Function(_0x572a86(0xcf));break;case _0x572a86(0x101):_0x5d7321=_0x45a6ac[_0x201100]!==''?JSON[_0x572a86(0x110)](_0x45a6ac[_0x201100]):[],_0x3262f3=_0x5d7321['map'](_0x43e55d=>new Function(JSON[_0x572a86(0x110)](_0x43e55d)));break;case _0x572a86(0xbf):_0x3262f3=_0x45a6ac[_0x201100]!==''?String(_0x45a6ac[_0x201100]):'';break;case'ARRAYSTR':_0x5d7321=_0x45a6ac[_0x201100]!==''?JSON[_0x572a86(0x110)](_0x45a6ac[_0x201100]):[],_0x3262f3=_0x5d7321[_0x572a86(0xe7)](_0x5b4c8b=>String(_0x5b4c8b));break;case _0x572a86(0xe9):_0x3ff491=_0x45a6ac[_0x201100]!==''?JSON[_0x572a86(0x110)](_0x45a6ac[_0x201100]):{},_0x3262f3=VisuMZ[_0x572a86(0xda)]({},_0x3ff491);break;case _0x572a86(0xe5):_0x5d7321=_0x45a6ac[_0x201100]!==''?JSON['parse'](_0x45a6ac[_0x201100]):[],_0x3262f3=_0x5d7321[_0x572a86(0xe7)](_0x1b8f38=>VisuMZ[_0x572a86(0xda)]({},JSON[_0x572a86(0x110)](_0x1b8f38)));break;default:continue;}_0x315d93[_0x66295c]=_0x3262f3;}}else return typeof this[_0x572a86(0x10b)]!==_0x572a86(0xc1);}return _0x315d93;},(_0x2e21a1=>{const _0x855ba7=_0x3fe345,_0x5af54c=_0x2e21a1[_0x855ba7(0xdd)];for(const _0x214385 of dependencies){if(!Imported[_0x214385]){alert(_0x855ba7(0x111)['format'](_0x5af54c,_0x214385)),SceneManager['exit']();break;}}const _0x5d9e5e=_0x2e21a1[_0x855ba7(0xd5)];if(_0x5d9e5e[_0x855ba7(0xd0)](/\[Version[ ](.*?)\]/i)){const _0x25e6a1=Number(RegExp['$1']);_0x25e6a1!==VisuMZ[label][_0x855ba7(0x115)]&&(alert(_0x855ba7(0xd2)[_0x855ba7(0x117)](_0x5af54c,_0x25e6a1)),SceneManager['exit']());}if(_0x5d9e5e[_0x855ba7(0xd0)](/\[Tier[ ](\d+)\]/i)){const _0x32596e=Number(RegExp['$1']);_0x32596e<tier?(alert(_0x855ba7(0xf2)['format'](_0x5af54c,_0x32596e,tier)),SceneManager[_0x855ba7(0xd3)]()):tier=Math['max'](_0x32596e,tier);}VisuMZ[_0x855ba7(0xda)](VisuMZ[label][_0x855ba7(0xef)],_0x2e21a1['parameters']);})(pluginData),VisuMZ[_0x3fe345(0xee)][_0x3fe345(0x107)]={'ImageNum':/<WEAPON IMAGE:[ ](\d+)>/i,'ImageStr':/<WEAPON IMAGE:[ ](.*)>/i,'Hue':/<WEAPON HUE:[ ](\d+)>/i,'Motion':/<WEAPON MOTION:[ ](.*)>/i,'AttackAni':/<(?:WEAPON|ATTACK) ANIMATION:[ ](\d+)>/i},ImageManager[_0x3fe345(0xbd)]=function(_0x46aa4c){const _0x3a53eb=_0x3fe345,_0x4156e4=VisuMZ[_0x3a53eb(0xee)][_0x3a53eb(0xef)][_0x3a53eb(0x10f)];return this[_0x3a53eb(0xf7)](_0x4156e4,_0x46aa4c);},VisuMZ[_0x3fe345(0xee)][_0x3fe345(0xb1)]=BattleManager[_0x3fe345(0x11d)],BattleManager[_0x3fe345(0x11d)]=function(){const _0x81530a=_0x3fe345;VisuMZ[_0x81530a(0xee)][_0x81530a(0xb1)][_0x81530a(0x122)](this),this[_0x81530a(0x105)]&&this[_0x81530a(0x105)][_0x81530a(0xb8)]();},VisuMZ[_0x3fe345(0xee)][_0x3fe345(0x126)]=Game_BattlerBase[_0x3fe345(0x121)]['initMembers'],Game_BattlerBase[_0x3fe345(0x121)][_0x3fe345(0xd9)]=function(){const _0xf9cf34=_0x3fe345;this['_cache']={},VisuMZ[_0xf9cf34(0xee)][_0xf9cf34(0x126)][_0xf9cf34(0x122)](this);},VisuMZ[_0x3fe345(0xee)][_0x3fe345(0xe3)]=Game_BattlerBase[_0x3fe345(0x121)][_0x3fe345(0xf9)],Game_BattlerBase[_0x3fe345(0x121)][_0x3fe345(0xf9)]=function(){const _0x384b2c=_0x3fe345;this[_0x384b2c(0xd4)]={},VisuMZ[_0x384b2c(0xee)]['Game_BattlerBase_refresh']['call'](this);},Game_BattlerBase[_0x3fe345(0x121)]['checkCacheKey']=function(_0x156938){const _0xe54ce8=_0x3fe345;return this[_0xe54ce8(0xd4)]=this[_0xe54ce8(0xd4)]||{},this['_cache'][_0x156938]!==undefined;},Game_BattlerBase[_0x3fe345(0x121)][_0x3fe345(0x106)]=function(){const _0x3e3f8e=_0x3fe345;let _0x22e1d0=_0x3e3f8e(0x106);if(this[_0x3e3f8e(0xcd)](_0x22e1d0))return this['_cache'][_0x22e1d0];return this[_0x3e3f8e(0xd4)][_0x22e1d0]=this[_0x3e3f8e(0x102)](),this[_0x3e3f8e(0xd4)][_0x22e1d0];},Game_BattlerBase[_0x3fe345(0x121)][_0x3fe345(0x102)]=function(){const _0x130664=_0x3fe345;for(const _0x90df30 of this[_0x130664(0x120)]()){if(!_0x90df30)continue;const _0x2da84c=this[_0x130664(0x10e)](_0x90df30);if(_0x2da84c[_0x130664(0xdd)]!==0x0)return{'name':_0x2da84c[_0x130664(0xdd)],'hue':_0x2da84c['hue'],'motion':_0x2da84c['motion']};}return 0x0;},Game_BattlerBase[_0x3fe345(0x121)][_0x3fe345(0x10e)]=function(_0x11733c){const _0x28ee4c=_0x3fe345,_0x22f2c7=VisuMZ[_0x28ee4c(0xee)][_0x28ee4c(0x107)];let _0xde48dd=0x0,_0x338f78=0x0,_0x274c55=VisuMZ[_0x28ee4c(0xee)]['Settings']['motion'];const _0x17f509=_0x11733c?_0x11733c[_0x28ee4c(0xbc)]:'';if(_0x17f509[_0x28ee4c(0xd0)](_0x22f2c7[_0x28ee4c(0xcc)]))_0xde48dd=Number(RegExp['$1'])||0x1;else _0x17f509[_0x28ee4c(0xd0)](_0x22f2c7[_0x28ee4c(0xb5)])&&(_0xde48dd=String(RegExp['$1']));return _0x17f509[_0x28ee4c(0xd0)](_0x22f2c7[_0x28ee4c(0xca)])&&('laSgZ'!==_0x28ee4c(0xc8)?_0x338f78=Number(RegExp['$1'])[_0x28ee4c(0xc5)](0x0,0xff):this[_0x28ee4c(0xb0)]()?this[_0x28ee4c(0x114)]():_0x455958[_0x28ee4c(0xee)]['Sprite_Weapon_updateFrame']['call'](this)),_0x17f509[_0x28ee4c(0xd0)](_0x22f2c7[_0x28ee4c(0xe0)])&&(_0x28ee4c(0x108)===_0x28ee4c(0xcb)?_0x3c2aaa[_0x28ee4c(0xee)][_0x28ee4c(0x103)][_0x28ee4c(0x122)](this):_0x274c55=String(RegExp['$1'])['toLowerCase']()[_0x28ee4c(0xed)]()),{'name':_0xde48dd,'hue':_0x338f78,'motion':_0x274c55};},VisuMZ[_0x3fe345(0xee)]['Game_Battler_startWeaponAnimation']=Game_Battler[_0x3fe345(0x121)][_0x3fe345(0xfa)],Game_Battler[_0x3fe345(0x121)][_0x3fe345(0xfa)]=function(_0x28b642){const _0x2639fb=_0x3fe345;if(this[_0x2639fb(0xf3)])return;let _0x2d3662=![];this[_0x2639fb(0x106)]()&&_0x28b642>0x0&&(_0x28b642=this['customWeaponGraphic'](),_0x2d3662=!![]);VisuMZ['WeaponAnimation'][_0x2639fb(0xde)]['call'](this,_0x28b642);if(!_0x2d3662)return;if(_0x28b642===0x0)return;this[_0x2639fb(0xf3)]=!![],this[_0x2639fb(0xb6)](_0x28b642[_0x2639fb(0xe8)]||_0x2639fb(0xe4)),this[_0x2639fb(0xf3)]=![];},Game_Battler[_0x3fe345(0x121)]['preloadCustomWeaponImage']=function(){const _0x57699a=_0x3fe345;if(!this['customWeaponGraphic']())return;const _0x3f58c3=this['customWeaponGraphic']();if(typeof _0x3f58c3[_0x57699a(0xdd)]===_0x57699a(0xc1)){if(_0x57699a(0xf0)!==_0x57699a(0xf0))return this[_0x57699a(0xdf)]()?this[_0x57699a(0xae)]()||_0x14bbc1[_0x57699a(0xee)][_0x57699a(0xba)][_0x57699a(0x122)](this):_0x380a42['WeaponAnimation'][_0x57699a(0xba)][_0x57699a(0x122)](this);else{const _0x3bcff9=Math[_0x57699a(0xfc)]((_0x3f58c3[_0x57699a(0xdd)]-0x1)/0xc)+0x1;ImageManager[_0x57699a(0xe6)](_0x57699a(0x11a)+_0x3bcff9);}}else ImageManager[_0x57699a(0xbd)](_0x3f58c3[_0x57699a(0xdd)]);},VisuMZ[_0x3fe345(0xee)][_0x3fe345(0xaf)]=Game_Battler[_0x3fe345(0x121)][_0x3fe345(0xc3)],Game_Battler[_0x3fe345(0x121)]['freezeMotion']=function(_0x49535e,_0xa85b7,_0x1ad87c){const _0x5e4b84=_0x3fe345;VisuMZ[_0x5e4b84(0xee)][_0x5e4b84(0xaf)][_0x5e4b84(0x122)](this,_0x49535e,_0xa85b7,_0x1ad87c);if(!_0xa85b7)return;let _0x515f56=0x0;if(_0x49535e['match'](/ATTACK[ ](\d+)/i)){if(_0x5e4b84(0xd1)!=='yuWFC')return this[_0x5e4b84(0xae)]()||_0x2776ac[_0x5e4b84(0xee)][_0x5e4b84(0x100)]['call'](this);else _0x515f56=Number(RegExp['$1']),_0x515f56--;}if(this[_0x5e4b84(0xc0)]()){if(_0x5e4b84(0xb9)!=='osodv')this['_freezeMotionData']['motionType']=_0x23a01b[_0x5e4b84(0xe8)];else{const _0x369ad4=this[_0x5e4b84(0xdb)](),_0x287bd3=_0x369ad4[_0x515f56]||null,_0x4ef943=this[_0x5e4b84(0x10e)](_0x287bd3);if(_0x4ef943['name']!==0x0)'Sjwki'===_0x5e4b84(0x127)?this[_0x5e4b84(0x119)]=_0x55bfdb[_0x5e4b84(0xe6)]('Weapons'+_0xa4071d):(_0x49535e[_0x5e4b84(0xd0)](/ATTACK/i)&&(this['_freezeMotionData']['motionType']=_0x4ef943[_0x5e4b84(0xe8)]),this['_freezeMotionData']['weaponImageId']=_0x4ef943[_0x5e4b84(0xdd)]);else{if(_0x5e4b84(0xeb)===_0x5e4b84(0xeb)){const _0x577ed8=this['customWeaponGraphic']();if(_0x577ed8[_0x5e4b84(0xdd)]!==0x0){if(_0x5e4b84(0x124)===_0x5e4b84(0xc6))return this[_0x5e4b84(0xd4)]=this['_cache']||{},this['_cache'][_0x336e69]!==_0x254caa;else _0x49535e[_0x5e4b84(0xd0)](/ATTACK/i)&&(_0x5e4b84(0x116)==='hEEIB'?_0x44efa0=_0x111d7b(_0x149080['$1'])[_0x5e4b84(0xb3)]()[_0x5e4b84(0xed)]():this[_0x5e4b84(0x104)][_0x5e4b84(0xc2)]=_0x577ed8[_0x5e4b84(0xe8)]),this[_0x5e4b84(0x104)]['weaponImageId']=_0x577ed8[_0x5e4b84(0xdd)];}}else return this[_0x5e4b84(0xdf)]()&&!!this[_0x5e4b84(0xdb)]()[0x1]?this[_0x5e4b84(0xae)]()||_0x2a2791[_0x5e4b84(0xee)][_0x5e4b84(0xce)]['call'](this):_0x1b1af8['WeaponAnimation'][_0x5e4b84(0xce)][_0x5e4b84(0x122)](this);}}}else{if(this['isEnemy']()){const _0x29524d=this['createCustomWeaponGraphicFromObj'](this[_0x5e4b84(0xea)]());if(_0x29524d[_0x5e4b84(0xdd)]!==0x0){if('EyDEv'!=='VTtcy')_0x49535e['match'](/ATTACK/i)&&(this[_0x5e4b84(0x104)][_0x5e4b84(0xc2)]=_0x29524d[_0x5e4b84(0xe8)]),this[_0x5e4b84(0x104)][_0x5e4b84(0xf6)]=_0x29524d[_0x5e4b84(0xdd)];else{if(!this['customWeaponGraphic']())return;const _0x35a88c=this['customWeaponGraphic']();if(typeof _0x35a88c[_0x5e4b84(0xdd)]==='number'){const _0x1c0dff=_0x237440['floor']((_0x35a88c[_0x5e4b84(0xdd)]-0x1)/0xc)+0x1;_0x166410['loadSystem'](_0x5e4b84(0x11a)+_0x1c0dff);}else _0x2d08ad[_0x5e4b84(0xbd)](_0x35a88c[_0x5e4b84(0xdd)]);}}}}},Game_Battler[_0x3fe345(0x121)][_0x3fe345(0xae)]=function(){const _0x249f17=_0x3fe345,_0x209bb6=VisuMZ[_0x249f17(0xee)][_0x249f17(0x107)],_0x13d4b4=_0x209bb6['AttackAni'];for(const _0x44ccc3 of this[_0x249f17(0xbe)]()){if(!_0x44ccc3)continue;if(_0x44ccc3['note'][_0x249f17(0xd0)](_0x13d4b4)){const _0x25000d=Number(RegExp['$1'])||0x0;if(_0x25000d>0x0)return _0x25000d;}}return 0x0;},Game_Battler['prototype'][_0x3fe345(0xdf)]=function(){const _0x1fb3d0=_0x3fe345,_0x3b6adb=VisuMZ[_0x1fb3d0(0xee)]['RegExp'],_0x3b244f=_0x3b6adb['AttackAni'];return this[_0x1fb3d0(0xbe)]()[_0x1fb3d0(0xc7)](_0x23773c=>_0x23773c&&_0x23773c[_0x1fb3d0(0xbc)][_0x1fb3d0(0xd0)](_0x3b244f));},VisuMZ[_0x3fe345(0xee)]['Game_Actor_attackAnimationId1']=Game_Actor['prototype'][_0x3fe345(0xf5)],Game_Actor['prototype']['attackAnimationId1']=function(){const _0x39c4ce=_0x3fe345;return this[_0x39c4ce(0xdf)]()?this[_0x39c4ce(0xae)]()||VisuMZ[_0x39c4ce(0xee)]['Game_Actor_attackAnimationId1'][_0x39c4ce(0x122)](this):_0x39c4ce(0x10c)!==_0x39c4ce(0x10c)?this['getStateAttackAnimation']()||_0x5873f3[_0x39c4ce(0xee)][_0x39c4ce(0xce)][_0x39c4ce(0x122)](this):VisuMZ[_0x39c4ce(0xee)][_0x39c4ce(0xba)][_0x39c4ce(0x122)](this);},VisuMZ[_0x3fe345(0xee)][_0x3fe345(0xce)]=Game_Actor['prototype'][_0x3fe345(0x123)],Game_Actor[_0x3fe345(0x121)][_0x3fe345(0x123)]=function(){const _0x2b7992=_0x3fe345;if(this[_0x2b7992(0xdf)]()&&!!this[_0x2b7992(0xdb)]()[0x1]){if('vMsuu'===_0x2b7992(0xec))return this[_0x2b7992(0xae)]()||VisuMZ[_0x2b7992(0xee)][_0x2b7992(0xce)][_0x2b7992(0x122)](this);else{const _0x6b0757=_0x3af8e0[_0x2b7992(0xee)][_0x2b7992(0xef)][_0x2b7992(0x10f)];return this[_0x2b7992(0xf7)](_0x6b0757,_0x349b83);}}else return VisuMZ['WeaponAnimation'][_0x2b7992(0xce)][_0x2b7992(0x122)](this);},VisuMZ['WeaponAnimation']['Game_Enemy_attackAnimationId1']=Game_Enemy[_0x3fe345(0x121)]['attackAnimationId1'],Game_Enemy[_0x3fe345(0x121)]['attackAnimationId1']=function(){const _0x24556f=_0x3fe345;if(this[_0x24556f(0xdf)]())return this[_0x24556f(0xae)]()||VisuMZ[_0x24556f(0xee)]['Game_Enemy_attackAnimationId1'][_0x24556f(0x122)](this);else{if('AhxIV'!==_0x24556f(0xbb))this[_0x24556f(0xfb)]=![],_0x3cd9b6[_0x24556f(0xee)][_0x24556f(0xdc)][_0x24556f(0x122)](this),this[_0x24556f(0x11f)](0x0);else return VisuMZ[_0x24556f(0xee)][_0x24556f(0x112)][_0x24556f(0x122)](this);}},VisuMZ[_0x3fe345(0xee)][_0x3fe345(0x100)]=Game_Enemy['prototype']['attackAnimationId2'],Game_Enemy[_0x3fe345(0x121)][_0x3fe345(0x123)]=function(){const _0x45fdb1=_0x3fe345;return this[_0x45fdb1(0xdf)]()?this[_0x45fdb1(0xae)]()||VisuMZ[_0x45fdb1(0xee)][_0x45fdb1(0x100)][_0x45fdb1(0x122)](this):VisuMZ['WeaponAnimation'][_0x45fdb1(0x100)][_0x45fdb1(0x122)](this);},Sprite_Weapon['prototype'][_0x3fe345(0xb0)]=function(){const _0x4a2623=_0x3fe345;return typeof this[_0x4a2623(0x10b)]!==_0x4a2623(0xc1);},VisuMZ[_0x3fe345(0xee)][_0x3fe345(0xdc)]=Sprite_Weapon[_0x3fe345(0x121)][_0x3fe345(0xf7)],Sprite_Weapon['prototype'][_0x3fe345(0xf7)]=function(){const _0x1524ee=_0x3fe345;this[_0x1524ee(0xb0)]()?this['loadBitmapCustomWeapon']():_0x1524ee(0xc4)===_0x1524ee(0xc4)?(this[_0x1524ee(0xfb)]=![],VisuMZ[_0x1524ee(0xee)][_0x1524ee(0xdc)]['call'](this),this['setHue'](0x0)):_0x2dd081[_0x1524ee(0xbd)](_0x5cdf1f['name']);},Sprite_Weapon[_0x3fe345(0x121)][_0x3fe345(0xac)]=function(){const _0x57229e=_0x3fe345;if(!this[_0x57229e(0x10b)])return;if(typeof this[_0x57229e(0x10b)][_0x57229e(0xdd)]===_0x57229e(0xc1)){const _0x3956fd=Math[_0x57229e(0xfc)]((this[_0x57229e(0x10b)][_0x57229e(0xdd)]-0x1)/0xc)+0x1;_0x3956fd>=0x1?this[_0x57229e(0x119)]=ImageManager[_0x57229e(0xe6)](_0x57229e(0x11a)+_0x3956fd):this[_0x57229e(0x119)]=ImageManager[_0x57229e(0xe6)]('');}else{this[_0x57229e(0xfb)]=!![];const _0x5b6a34=this[_0x57229e(0x10b)][_0x57229e(0xdd)]?this['_weaponImageId'][_0x57229e(0xdd)]:this['_weaponImageId'];this[_0x57229e(0x119)]=ImageManager['loadWeapon'](_0x5b6a34||'');}this['setHue'](this[_0x57229e(0x10b)][_0x57229e(0x10d)]||0x0);},VisuMZ[_0x3fe345(0xee)][_0x3fe345(0x103)]=Sprite_Weapon[_0x3fe345(0x121)][_0x3fe345(0x125)],Sprite_Weapon[_0x3fe345(0x121)][_0x3fe345(0x125)]=function(){const _0x3a4a0b=_0x3fe345;this['isCustomWeaponGraphic']()?this[_0x3a4a0b(0x114)]():VisuMZ[_0x3a4a0b(0xee)][_0x3a4a0b(0x103)][_0x3a4a0b(0x122)](this);},Sprite_Weapon[_0x3fe345(0x121)][_0x3fe345(0x114)]=function(){const _0x2a65ba=_0x3fe345;if(!this[_0x2a65ba(0x10b)])return;if(typeof this[_0x2a65ba(0x10b)][_0x2a65ba(0xdd)]===_0x2a65ba(0xc1)){const _0x56fc49=(this['_weaponImageId'][_0x2a65ba(0xdd)]-0x1)%0xc,_0x5612ec=0x60,_0xfbd87f=0x40,_0x54b761=(Math['floor'](_0x56fc49/0x6)*0x3+this[_0x2a65ba(0xb2)])*_0x5612ec,_0x15b1ef=Math['floor'](_0x56fc49%0x6)*_0xfbd87f;this[_0x2a65ba(0xf8)](_0x54b761,_0x15b1ef,_0x5612ec,_0xfbd87f);}else{if(_0x2a65ba(0x11c)==='jRnya'){const _0x4fe5ed=_0x1ce930[_0x2a65ba(0xfc)](this[_0x2a65ba(0x119)][_0x2a65ba(0xad)]/0x3),_0x4f8b58=this['bitmap'][_0x2a65ba(0xf4)],_0x100572=this[_0x2a65ba(0xb2)]*_0x4fe5ed,_0x5f26cc=0x0;this['setFrame'](_0x100572,_0x5f26cc,_0x4fe5ed,_0x4f8b58);}else{const _0x112ab1=Math[_0x2a65ba(0xfc)](this['bitmap'][_0x2a65ba(0xad)]/0x3),_0x2d515f=this['bitmap']['height'],_0x37168b=this[_0x2a65ba(0xb2)]*_0x112ab1,_0xc3d806=0x0;this[_0x2a65ba(0xf8)](_0x37168b,_0xc3d806,_0x112ab1,_0x2d515f);}}};