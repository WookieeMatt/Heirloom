//=============================================================================
// VisuStella MZ - Grid-Free Doodads - System
// VisuMZ_2_DoodadsSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_DoodadsSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.DoodadsSystem = VisuMZ.DoodadsSystem || {};
VisuMZ.DoodadsSystem.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.01] [DoodadsSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Grid-Free_Doodads_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * In RPG Maker MZ, tilesets are used for mapping purposes. Tileset A is used
 * for drawing land while Tilesets B through E are used to add doodads. But in
 * RPG Maker MZ, doodads added by Tilesets B through E are locked to the grid
 * and add a rather unnatural feel to it. This plugin will allow you to break
 * free of the grid and add doodads unbound by the grid. Doodads can come in
 * all forms, from large to small, static and animated, you name it!
 * 
 * There are two plugins for Grid-Free Doodads. One is the system, which has
 * all of the data contained for how doodads are handled in-game. The other is
 * the in-game editor, which allows you to add, remove, and edit doodads during
 * Playtest mode. These are separate so that when you deploy the game and want
 * just the doodad data to remain without the in-game editor, you can leave the
 * editor out. Or in the event there's ever an external editor, you can use
 * that instead.
 * 
 * This plugin is only the system plugin and does not contain the in-game
 * editor. The in-game editor can be found separately as a Tier 3 plugin from
 * the VisuStella MZ library.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Gain the ability to add doodads onto the map through outside of the grid.
 * * Or lock them to the grid if that's what you want.
 * * Add doodads from specified image sources, from the icon sheet, or from the
 *   map's current tileset, too.
 * * Doodads can be animated, too.
 * * Apply a variety of settings to your doodads, ranging from blend modes, to
 *   scaling, to hue changes, tone shifts, blur effects, and more!
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 * 
 * Please refer to the VisuMZ_3_DoodadsEditor help file for instructions!
 *
 * ============================================================================
 * Plugin Parameters: System General Settings
 * ============================================================================
 *
 * There is only one plugin parameter for the Grid-Free Doodads System plugin.
 *
 * ---
 *
 * General
 * 
 *   Doodads Folder:
 *   - This is the path to your doodads folder.
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
 * 
 * * Yanfly
 * * Hudell
 * * Liquidize
 * * Arisu
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.01: July 7, 2022
 * * Bug Fixes!
 * ** Blend Modes should no longer be overwritten by hues. Fix made by Irina.
 *
 * Version 1.00: October 5, 2020
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
 * @param DoodadsSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Folder:str
 * @text Doodads Folder
 * @desc This is the path to your doodads folder.
 * @default img/doodads/
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

function _0x44c4(_0x2e5c4b,_0x4a9ded){const _0x12179f=_0x1217();return _0x44c4=function(_0x44c40b,_0x5d1b48){_0x44c40b=_0x44c40b-0x198;let _0x367d6e=_0x12179f[_0x44c40b];return _0x367d6e;},_0x44c4(_0x2e5c4b,_0x4a9ded);}const _0x51507a=_0x44c4;(function(_0x12338f,_0x2b2922){const _0x23edf2=_0x44c4,_0x4eea0e=_0x12338f();while(!![]){try{const _0x119469=parseInt(_0x23edf2(0x234))/0x1+parseInt(_0x23edf2(0x1eb))/0x2*(-parseInt(_0x23edf2(0x27f))/0x3)+-parseInt(_0x23edf2(0x223))/0x4*(parseInt(_0x23edf2(0x267))/0x5)+-parseInt(_0x23edf2(0x1dc))/0x6+parseInt(_0x23edf2(0x26c))/0x7*(-parseInt(_0x23edf2(0x1f0))/0x8)+-parseInt(_0x23edf2(0x1d7))/0x9*(-parseInt(_0x23edf2(0x1ad))/0xa)+parseInt(_0x23edf2(0x24a))/0xb*(parseInt(_0x23edf2(0x247))/0xc);if(_0x119469===_0x2b2922)break;else _0x4eea0e['push'](_0x4eea0e['shift']());}catch(_0x17a2ac){_0x4eea0e['push'](_0x4eea0e['shift']());}}}(_0x1217,0x8dc5d));var label=_0x51507a(0x1da),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x51507a(0x1d1)](function(_0x3f2c29){const _0x25e19b=_0x51507a;return _0x3f2c29[_0x25e19b(0x1e0)]&&_0x3f2c29[_0x25e19b(0x1bb)][_0x25e19b(0x224)]('['+label+']');})[0x0];VisuMZ[label][_0x51507a(0x1a9)]=VisuMZ[label][_0x51507a(0x1a9)]||{},VisuMZ[_0x51507a(0x1ef)]=function(_0x434050,_0x2a67da){const _0x54110d=_0x51507a;for(const _0x36e376 in _0x2a67da){if('ubVYn'!==_0x54110d(0x266)){const _0x1f50af=(_0x22aa8e[_0x54110d(0x209)](this['_tileId']/0x80)%0x2*0x8+this[_0x54110d(0x201)]%0x8)*this[_0x54110d(0x25a)],_0x211231=_0x1d4f61[_0x54110d(0x209)](this[_0x54110d(0x201)]%0x100/0x8)%0x10*this[_0x54110d(0x211)];return this[_0x54110d(0x1c3)](_0x1f50af,_0x211231,this['_tileWidth']*(this[_0x54110d(0x20a)][_0x54110d(0x24c)]||0x1),this[_0x54110d(0x211)]*(this[_0x54110d(0x20a)]['tileRows']||0x1));}else{if(_0x36e376[_0x54110d(0x1df)](/(.*):(.*)/i)){const _0x5d0f16=String(RegExp['$1']),_0x2ae0cb=String(RegExp['$2'])[_0x54110d(0x1bf)]()[_0x54110d(0x243)]();let _0x1db009,_0x354bb0,_0x3fd218;switch(_0x2ae0cb){case _0x54110d(0x220):_0x1db009=_0x2a67da[_0x36e376]!==''?Number(_0x2a67da[_0x36e376]):0x0;break;case _0x54110d(0x20e):_0x354bb0=_0x2a67da[_0x36e376]!==''?JSON[_0x54110d(0x21b)](_0x2a67da[_0x36e376]):[],_0x1db009=_0x354bb0[_0x54110d(0x1e4)](_0x3a7c94=>Number(_0x3a7c94));break;case _0x54110d(0x232):_0x1db009=_0x2a67da[_0x36e376]!==''?eval(_0x2a67da[_0x36e376]):null;break;case'ARRAYEVAL':_0x354bb0=_0x2a67da[_0x36e376]!==''?JSON[_0x54110d(0x21b)](_0x2a67da[_0x36e376]):[],_0x1db009=_0x354bb0[_0x54110d(0x1e4)](_0x26f033=>eval(_0x26f033));break;case'JSON':_0x1db009=_0x2a67da[_0x36e376]!==''?JSON[_0x54110d(0x21b)](_0x2a67da[_0x36e376]):'';break;case _0x54110d(0x218):_0x354bb0=_0x2a67da[_0x36e376]!==''?JSON[_0x54110d(0x21b)](_0x2a67da[_0x36e376]):[],_0x1db009=_0x354bb0['map'](_0x48e1f3=>JSON[_0x54110d(0x21b)](_0x48e1f3));break;case'FUNC':_0x1db009=_0x2a67da[_0x36e376]!==''?new Function(JSON[_0x54110d(0x21b)](_0x2a67da[_0x36e376])):new Function(_0x54110d(0x269));break;case _0x54110d(0x20f):_0x354bb0=_0x2a67da[_0x36e376]!==''?JSON[_0x54110d(0x21b)](_0x2a67da[_0x36e376]):[],_0x1db009=_0x354bb0[_0x54110d(0x1e4)](_0x3a9d9f=>new Function(JSON['parse'](_0x3a9d9f)));break;case _0x54110d(0x20d):_0x1db009=_0x2a67da[_0x36e376]!==''?String(_0x2a67da[_0x36e376]):'';break;case _0x54110d(0x1d9):_0x354bb0=_0x2a67da[_0x36e376]!==''?JSON['parse'](_0x2a67da[_0x36e376]):[],_0x1db009=_0x354bb0[_0x54110d(0x1e4)](_0x59049a=>String(_0x59049a));break;case _0x54110d(0x1b3):_0x3fd218=_0x2a67da[_0x36e376]!==''?JSON[_0x54110d(0x21b)](_0x2a67da[_0x36e376]):{},_0x1db009=VisuMZ['ConvertParams']({},_0x3fd218);break;case _0x54110d(0x1d5):_0x354bb0=_0x2a67da[_0x36e376]!==''?JSON[_0x54110d(0x21b)](_0x2a67da[_0x36e376]):[],_0x1db009=_0x354bb0[_0x54110d(0x1e4)](_0x533381=>VisuMZ[_0x54110d(0x1ef)]({},JSON[_0x54110d(0x21b)](_0x533381)));break;default:continue;}_0x434050[_0x5d0f16]=_0x1db009;}}}return _0x434050;},(_0x28e490=>{const _0x5d937a=_0x51507a,_0x5059fb=_0x28e490[_0x5d937a(0x22d)];for(const _0x219db7 of dependencies){if(!Imported[_0x219db7]){if(_0x5d937a(0x1d0)===_0x5d937a(0x21a))_0x45bb3f[_0x5d937a(0x1bd)](_0x4691f4);else{alert(_0x5d937a(0x24b)[_0x5d937a(0x1ae)](_0x5059fb,_0x219db7)),SceneManager[_0x5d937a(0x270)]();break;}}}const _0x6397e9=_0x28e490[_0x5d937a(0x1bb)];if(_0x6397e9[_0x5d937a(0x1df)](/\[Version[ ](.*?)\]/i)){if('uPhil'!=='uPhil')this[_0x5d937a(0x1ab)]=new _0x25e1d0(0x1,0x1);else{const _0x22090f=Number(RegExp['$1']);_0x22090f!==VisuMZ[label]['version']&&(_0x5d937a(0x19d)!==_0x5d937a(0x19d)?(_0x302fea[_0x5d937a(0x1da)][_0x5d937a(0x1c4)][_0x5d937a(0x23a)](this),this[_0x5d937a(0x27d)][_0x5d937a(0x1c2)]()):(alert(_0x5d937a(0x23d)[_0x5d937a(0x1ae)](_0x5059fb,_0x22090f)),SceneManager[_0x5d937a(0x270)]()));}}if(_0x6397e9[_0x5d937a(0x1df)](/\[Tier[ ](\d+)\]/i)){if('NkOaq'!==_0x5d937a(0x22a))return;else{const _0x5b9b24=Number(RegExp['$1']);if(_0x5b9b24<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x5d937a(0x1ae)](_0x5059fb,_0x5b9b24,tier)),SceneManager[_0x5d937a(0x270)]();else{if(_0x5d937a(0x1c0)===_0x5d937a(0x1c0))tier=Math[_0x5d937a(0x1b6)](_0x5b9b24,tier);else return;}}}VisuMZ[_0x5d937a(0x1ef)](VisuMZ[label]['Settings'],_0x28e490['parameters']);})(pluginData);var $dataDoodads=null;Tilemap[_0x51507a(0x1b9)][_0x51507a(0x275)]=function(_0x2e596a,_0x20a3a8){const _0xe16954=_0x51507a;if(_0x2e596a['z']!==_0x20a3a8['z'])return _0x2e596a['z']-_0x20a3a8['z'];if(_0x2e596a['y']!==_0x20a3a8['y'])return _0x2e596a['y']-_0x20a3a8['y'];if(_0x2e596a['x']!==_0x20a3a8['x'])return _0x2e596a['x']-_0x20a3a8['x'];return _0x2e596a[_0xe16954(0x23c)]-_0x20a3a8[_0xe16954(0x23c)];};function Doodads(){throw new Error('This\x20is\x20a\x20static\x20class');}Doodads[_0x51507a(0x1db)]=new PIXI['filters'][(_0x51507a(0x229))](),Doodads['outlineFilter']=PIXI['filters'][_0x51507a(0x1b5)]?new PIXI[(_0x51507a(0x198))][(_0x51507a(0x1b5))](0x3,0x0):null,Doodads[_0x51507a(0x1b7)]=PIXI[_0x51507a(0x198)][_0x51507a(0x20c)]?new PIXI[(_0x51507a(0x198))]['DropShadowFilter']({'shadowOnly':!![]}):null,Doodads['glowFilter']=PIXI[_0x51507a(0x198)][_0x51507a(0x21e)]?new PIXI[(_0x51507a(0x198))]['GlowFilter']():null,Doodads[_0x51507a(0x257)]=new PIXI[(_0x51507a(0x198))]['ColorMatrixFilter'](),Doodads[_0x51507a(0x257)][_0x51507a(0x27a)](0x1,![]),Doodads[_0x51507a(0x1b8)]=new PIXI['filters'][(_0x51507a(0x19e))](),Doodads['sepiaFilter'][_0x51507a(0x1d2)](![]),Object[_0x51507a(0x259)](Doodads,_0x51507a(0x1cd),{'get':function(){const _0x16b5b5=_0x51507a;return VisuMZ[_0x16b5b5(0x1da)][_0x16b5b5(0x1a9)][_0x16b5b5(0x279)];},'configurable':![]}),Object[_0x51507a(0x259)](Doodads,_0x51507a(0x1b1),{'get':function(){const _0x4c0c9d=_0x51507a;return VisuMZ[_0x4c0c9d(0x1da)][_0x4c0c9d(0x1a9)];},'configurable':![]}),Doodads[_0x51507a(0x265)]=function(){const _0x3c3936=_0x51507a,_0x17696e=require(_0x3c3936(0x1f2)),_0x2911bc=_0x17696e['dirname'](process['mainModule'][_0x3c3936(0x239)]),_0x46961b=_0x17696e[_0x3c3936(0x1cf)](_0x2911bc,_0x3c3936(0x19c)),_0x170a40=_0x46961b+'Doodads.json',_0x3dbd47=require('fs');if(_0x3dbd47['existsSync'](_0x170a40))return;try{_0x3dbd47[_0x3c3936(0x1f7)](_0x170a40,'[]');}catch(_0x5a0669){'wKscP'!==_0x3c3936(0x1ff)?console[_0x3c3936(0x1bd)](_0x5a0669):this[_0x3c3936(0x263)](_0x1f4ddc,_0x1cbaf4[_0x3c3936(0x1b7)],_0x5414e1(this[_0x3c3936(0x20a)][_0x3c3936(0x280)]));}},Doodads[_0x51507a(0x1ba)]=function(){const _0x190217=_0x51507a,_0x47da64=require(_0x190217(0x1f2)),_0x45e2ba=_0x47da64['dirname'](process[_0x190217(0x25f)]['filename']),_0x1d743f=_0x47da64['join'](_0x45e2ba,VisuMZ['DoodadsSystem'][_0x190217(0x1a9)]['Folder']),_0x2d4b6d=require('fs');if(_0x2d4b6d['existsSync'](_0x1d743f))return;try{_0x190217(0x25c)===_0x190217(0x25c)?_0x2d4b6d[_0x190217(0x210)](_0x1d743f):this[_0x190217(0x27b)](_0x319234['hue']);}catch(_0x4e8115){if('GfDpU'===_0x190217(0x22e))console[_0x190217(0x1bd)](_0x4e8115);else return this['_emptyBitmap'];}},Doodads['loadData']=function(){const _0x1d5ac9=_0x51507a;DataManager['_databaseFiles'][_0x1d5ac9(0x24f)]({'name':'$dataDoodads','src':_0x1d5ac9(0x233)});},Doodads['maybeLoadData']=function(){const _0x377f2a=_0x51507a;!DataManager[_0x377f2a(0x261)]()&&!DataManager['isEventTest']()&&(Utils[_0x377f2a(0x1e6)]()&&Utils['isOptionValid'](_0x377f2a(0x277))&&(_0x377f2a(0x227)===_0x377f2a(0x227)?(this[_0x377f2a(0x265)](),this['createDoodadsImgDir']()):this['removeCurrentDoodads']()),this[_0x377f2a(0x26a)]());},Doodads[_0x51507a(0x1ec)](),ImageManager[_0x51507a(0x1d6)]=function(_0x1c00c0,_0x1dc92c,_0x404369){const _0x11b788=_0x51507a;if(!_0x1dc92c)return this[_0x11b788(0x19a)];const _0xcb1687=(''+_0x1c00c0+encodeURIComponent(_0x1dc92c)+'.png')[_0x11b788(0x1a0)](/%2F/g,'/'),_0xddcbaf=ImageManager[_0x11b788(0x1e9)](_0xcb1687);return _0xddcbaf[_0x11b788(0x1f1)]=_0x404369,_0xddcbaf;},ImageManager['loadTilesetBitmap']=function(_0x4473f0,_0x31f58b){const _0x3fdb37=_0x51507a,_0x58f3c8=$gameMap['tileset']();if(!_0x58f3c8){if(_0x3fdb37(0x272)!=='SbyMR')return;else return _0x1d17b3['x']-_0x24db7f['x'];}const _0x3b2084=0x5+Math[_0x3fdb37(0x209)](_0x4473f0/0x100);if(_0x3b2084<0x5||_0x3b2084>=0xa){if(_0x3fdb37(0x1a4)==='yTTUa'){if(this['anchor']['y']===0x0)this[_0x3fdb37(0x222)]['y']=0x1;else this['anchor']['y']===0x1&&(this[_0x3fdb37(0x222)]['y']=0x0);}else return;}const _0x27a6b2=_0x58f3c8[_0x3fdb37(0x213)][_0x3b2084];if(!_0x27a6b2)return;return ImageManager[_0x3fdb37(0x1a1)](_0x27a6b2);},ImageManager[_0x51507a(0x19b)]=function(_0x1e1f9c,_0x2ae559,_0x462b2e){const _0xd72976=_0x51507a;if(_0x1e1f9c===_0xd72976(0x1fa))return _0xd72976(0x230)!=='CrGyZ'?ImageManager[_0xd72976(0x1fd)]('IconSet'):_0x3e8518['z']-_0x95baaf['z'];if(_0x1e1f9c[_0xd72976(0x206)](_0xd72976(0x1f4))){if('XtIDL'!=='XtIDL')throw new _0x432f99(_0xd72976(0x1bc));else return this['loadTilesetBitmap'](_0x462b2e,_0x2ae559);}return ImageManager[_0xd72976(0x1d6)](Doodads['doodadFolder'],_0x1e1f9c,_0x2ae559);},VisuMZ['DoodadsSystem'][_0x51507a(0x254)]=ImageManager['throwLoadError'],ImageManager[_0x51507a(0x199)]=function(_0xed4d3e){const _0x3b75bc=_0x51507a;try{if(_0x3b75bc(0x225)===_0x3b75bc(0x226))return _0x190a9c[_0x3b75bc(0x1da)][_0x3b75bc(0x1a9)][_0x3b75bc(0x279)];else VisuMZ[_0x3b75bc(0x1da)][_0x3b75bc(0x254)][_0x3b75bc(0x23a)](this,_0xed4d3e);}catch(_0x27686d){_0x3b75bc(0x1a6)===_0x3b75bc(0x1a6)?console[_0x3b75bc(0x1bd)](_0x27686d):_0x2f8048['writeFileSync'](_0x4ed5bf,'[]');}const {url:_0x5242d4}=_0xed4d3e;_0x5242d4 in this[_0x3b75bc(0x214)]&&(_0x3b75bc(0x250)==='LOWMz'?this[_0x3b75bc(0x214)][_0x1cf467]=this['_emptyBitmap']:this[_0x3b75bc(0x214)][_0x5242d4]=this[_0x3b75bc(0x19a)]),_0xed4d3e[_0x3b75bc(0x1c9)]='none';},VisuMZ['DoodadsSystem'][_0x51507a(0x26d)]=Game_Map[_0x51507a(0x1b9)]['isEventRunning'],Game_Map[_0x51507a(0x1b9)][_0x51507a(0x207)]=function(){const _0xd21244=_0x51507a;if($gameTemp['_doodadEditorMode']){if(_0xd21244(0x271)!==_0xd21244(0x1a7))return!![];else{if(!_0x27925a['value'](_0x45ce7a)){this[_0xd21244(0x200)]=0x0;return;}}}return VisuMZ[_0xd21244(0x1da)][_0xd21244(0x26d)][_0xd21244(0x23a)](this);},Game_Map[_0x51507a(0x1b9)][_0x51507a(0x24e)]=function(){const _0x4aa38f=_0x51507a;if($dataDoodads)return $dataDoodads[this[_0x4aa38f(0x1fc)]()];},VisuMZ['DoodadsSystem']['Scene_Map_terminate']=Scene_Map[_0x51507a(0x1b9)][_0x51507a(0x237)],Scene_Map[_0x51507a(0x1b9)]['terminate']=function(){const _0x456db4=_0x51507a;VisuMZ[_0x456db4(0x1da)][_0x456db4(0x1c4)]['call'](this),this[_0x456db4(0x27d)][_0x456db4(0x1c2)]();};function Sprite_Doodad(){const _0x1c00ab=_0x51507a;this[_0x1c00ab(0x1dd)](...arguments);}Sprite_Doodad['prototype']=Object[_0x51507a(0x245)](Sprite_Clickable[_0x51507a(0x1b9)]),Sprite_Doodad[_0x51507a(0x1b9)][_0x51507a(0x215)]=Sprite_Doodad,Sprite_Doodad['prototype'][_0x51507a(0x1dd)]=function(_0x45639e){const _0x390a41=_0x51507a;this['_data']=_0x45639e,this[_0x390a41(0x25a)]=$gameMap[_0x390a41(0x204)](),this[_0x390a41(0x211)]=$gameMap[_0x390a41(0x1b4)](),this['_mapWidth']=$gameMap[_0x390a41(0x25e)]()*this[_0x390a41(0x25a)],this['_mapHeight']=$gameMap[_0x390a41(0x1be)]()*this[_0x390a41(0x211)],this['_currentCount']=0x0,this[_0x390a41(0x26e)]=![],Sprite_Clickable['prototype'][_0x390a41(0x1dd)]['call'](this),this[_0x390a41(0x278)]();},Sprite_Doodad[_0x51507a(0x1b9)]['initData']=function(){const _0x49420b=_0x51507a;this['initCustomDataA'](),this[_0x49420b(0x1ea)]=0x0;const _0x3d7973=this[_0x49420b(0x20a)];this['_x']=_0x3d7973['x'],this['_y']=_0x3d7973['y'],this['z']=_0x3d7973['z'],this[_0x49420b(0x1a5)]=_0x3d7973['iconIndex'],this[_0x49420b(0x201)]=_0x3d7973[_0x49420b(0x273)],this[_0x49420b(0x244)]=_0x3d7973[_0x49420b(0x208)]||0x1,this[_0x49420b(0x26f)]=_0x3d7973[_0x49420b(0x212)]||0x1,this['_frameUpdate']=_0x3d7973[_0x49420b(0x249)]||0xf,this[_0x49420b(0x1ca)](),this[_0x49420b(0x240)]=this['_xFrames']*this[_0x49420b(0x26f)]-0x1,this['anchor']['x']=_0x3d7973[_0x49420b(0x1c8)],this[_0x49420b(0x222)]['y']=_0x3d7973['anchorY'],this[_0x49420b(0x25b)]['x']=_0x3d7973[_0x49420b(0x202)]/0x64,this[_0x49420b(0x25b)]['y']=_0x3d7973[_0x49420b(0x1e1)]/0x64,this['angle']=_0x3d7973[_0x49420b(0x1e7)]??0x0;if(_0x3d7973['hue']){if('lSLHy'===_0x49420b(0x1c6))this[_0x49420b(0x27b)](_0x3d7973['hue']);else return _0x2f7d7a[_0x49420b(0x1fd)](_0x49420b(0x1fa));}this[_0x49420b(0x19f)]=_0x3d7973[_0x49420b(0x205)]||0x0,this[_0x49420b(0x200)]=_0x3d7973['opacity']||0x0;const _0x44756d=_0x3d7973[_0x49420b(0x1e5)]||'',_0x159386=''+_0x44756d+_0x3d7973['bitmap'];this[_0x49420b(0x1ab)]=ImageManager[_0x49420b(0x19b)](_0x159386,_0x3d7973['smooth'],_0x3d7973['tileId'],_0x3d7973[_0x49420b(0x24c)],_0x3d7973[_0x49420b(0x235)]),this[_0x49420b(0x252)](),this[_0x49420b(0x26e)]=!![];},Sprite_Doodad[_0x51507a(0x1b9)]['maybeInvertAnchors']=function(){const _0x21509f=_0x51507a;if(this[_0x21509f(0x25b)]['x']<=0x0){if(_0x21509f(0x23f)!==_0x21509f(0x23f))this[_0x21509f(0x222)]['y']=0x0;else{if(this[_0x21509f(0x222)]['x']===0x0)_0x21509f(0x24d)===_0x21509f(0x258)?_0x156b83['log'](_0xa4ef3b):this['anchor']['x']=0x1;else this[_0x21509f(0x222)]['x']===0x1&&(this[_0x21509f(0x222)]['x']=0x0);}}if(this[_0x21509f(0x25b)]['y']<=0x0){if(_0x21509f(0x1d4)!==_0x21509f(0x1c1)){if(this[_0x21509f(0x222)]['y']===0x0)this[_0x21509f(0x222)]['y']=0x1;else this[_0x21509f(0x222)]['y']===0x1&&(this[_0x21509f(0x222)]['y']=0x0);}else return this['_data']['x'];}},Sprite_Doodad[_0x51507a(0x1b9)][_0x51507a(0x1f8)]=function(){},Sprite_Doodad[_0x51507a(0x1b9)]['initCustomDataZ']=function(){const _0x5d219e=_0x51507a;this[_0x5d219e(0x1fe)]();},Sprite_Doodad[_0x51507a(0x1b9)]['initCustomEDP1DataZ']=function(){const _0x34ba76=_0x51507a,_0xb32f8a=this[_0x34ba76(0x20a)][_0x34ba76(0x260)]||0x0,_0x42599a=this[_0x34ba76(0x20a)][_0x34ba76(0x228)]||0x0,_0xbeceef=this[_0x34ba76(0x20a)][_0x34ba76(0x1ce)]||0x0,_0x5ced16=this['_data']['toneGrey']||0x0;this[_0x34ba76(0x20b)]([_0xb32f8a,_0x42599a,_0xbeceef,_0x5ced16]),this[_0x34ba76(0x276)]=this[_0x34ba76(0x20a)][_0x34ba76(0x276)]||[],this[_0x34ba76(0x23b)]=this[_0x34ba76(0x20a)][_0x34ba76(0x23b)]||[],this['partyHave']=this[_0x34ba76(0x20a)]['partyHave']||[],this[_0x34ba76(0x1f9)]=this[_0x34ba76(0x20a)][_0x34ba76(0x1f9)]||[];},Sprite_Doodad[_0x51507a(0x1b9)][_0x51507a(0x1ed)]=function(){const _0x16bc3b=_0x51507a;Sprite_Clickable[_0x16bc3b(0x1b9)][_0x16bc3b(0x1ed)]['call'](this),this[_0x16bc3b(0x1c7)]();if(!this['_loadedData'])return;this[_0x16bc3b(0x1f6)](),this['updateCustomA'](),this[_0x16bc3b(0x1e2)](),this[_0x16bc3b(0x1e3)]();},Sprite_Doodad['prototype'][_0x51507a(0x1c7)]=function(){const _0x7c3685=_0x51507a;this['x']=this['screenX'](),this['y']=this[_0x7c3685(0x1a2)]();},Sprite_Doodad['prototype'][_0x51507a(0x263)]=function(_0x4412f6,_0x381068,_0x2095cc){const _0x6125a9=_0x51507a;if(_0x2095cc!==_0x4412f6[_0x6125a9(0x224)](_0x381068)){if(_0x6125a9(0x25d)!==_0x6125a9(0x1ac))_0x2095cc?_0x4412f6[_0x6125a9(0x24f)](_0x381068):_0x4412f6[_0x6125a9(0x21c)](_0x4412f6['indexOf'](_0x381068),0x1);else{this[_0x6125a9(0x200)]=0x0;return;}}},Sprite_Doodad[_0x51507a(0x1b9)][_0x51507a(0x1f6)]=function(){const _0x4e8cd3=_0x51507a,_0x4e5d7a=this['filters']??[];this[_0x4e8cd3(0x263)](_0x4e5d7a,Doodads[_0x4e8cd3(0x1db)],Boolean(this[_0x4e8cd3(0x20a)][_0x4e8cd3(0x1a8)])),this['maybeAddFilter'](_0x4e5d7a,Doodads[_0x4e8cd3(0x257)],Boolean(this[_0x4e8cd3(0x20a)]['contrast'])),this[_0x4e8cd3(0x263)](_0x4e5d7a,Doodads['sepiaFilter'],Boolean(this[_0x4e8cd3(0x20a)][_0x4e8cd3(0x1d2)]));Doodads['outlineFilter']&&this[_0x4e8cd3(0x263)](_0x4e5d7a,Doodads[_0x4e8cd3(0x1e8)],Boolean(this[_0x4e8cd3(0x20a)]['outline']));Doodads['shadowFilter']&&this[_0x4e8cd3(0x263)](_0x4e5d7a,Doodads[_0x4e8cd3(0x1b7)],Boolean(this[_0x4e8cd3(0x20a)][_0x4e8cd3(0x280)]));if(Doodads['glowFilter']){if(_0x4e8cd3(0x1af)===_0x4e8cd3(0x221)){if(this[_0x4e8cd3(0x20a)][_0x4e8cd3(0x217)]===_0x4e8cd3(0x22b))return this[_0x4e8cd3(0x20a)]['x'];return this[_0x4e8cd3(0x231)](this[_0x4e8cd3(0x20a)]['x'],_0x14dcde['_displayX'],this[_0x4e8cd3(0x25a)],this[_0x4e8cd3(0x25e)],_0x18f992[_0x4e8cd3(0x1de)](),this['_mapWidth']);}else this[_0x4e8cd3(0x263)](_0x4e5d7a,Doodads[_0x4e8cd3(0x1cb)],Boolean(this[_0x4e8cd3(0x20a)]['glow']));}this[_0x4e8cd3(0x198)]=_0x4e5d7a;},Sprite_Doodad[_0x51507a(0x1b9)][_0x51507a(0x231)]=function(_0x182c9f,_0x278b85,_0x146864,_0x5c6cce,_0x4afa7c,_0xd4d2c1){const _0x223d35=_0x51507a;let _0x5048ca=_0x182c9f-_0x278b85*_0x146864;return _0x5048ca+_0x5c6cce<0x0&&_0x4afa7c&&(_0x5048ca+=_0xd4d2c1),Math[_0x223d35(0x21f)](_0x5048ca);},Sprite_Doodad[_0x51507a(0x1b9)][_0x51507a(0x268)]=function(){const _0x2c6b40=_0x51507a;if(this[_0x2c6b40(0x20a)]['positionType']==='screen')return this[_0x2c6b40(0x20a)]['x'];return this[_0x2c6b40(0x231)](this[_0x2c6b40(0x20a)]['x'],$gameMap[_0x2c6b40(0x251)],this[_0x2c6b40(0x25a)],this[_0x2c6b40(0x25e)],$gameMap[_0x2c6b40(0x1de)](),this['_mapWidth']);},Sprite_Doodad['prototype']['screenY']=function(){const _0x1d27ee=_0x51507a;if(this[_0x1d27ee(0x20a)][_0x1d27ee(0x217)]===_0x1d27ee(0x22b))return this['_data']['y'];return this['_calcScreenPos'](this[_0x1d27ee(0x20a)]['y'],$gameMap[_0x1d27ee(0x264)],this[_0x1d27ee(0x211)],this[_0x1d27ee(0x1be)],$gameMap[_0x1d27ee(0x1a3)](),this[_0x1d27ee(0x21d)]);},Sprite_Doodad['prototype']['clear']=function(){const _0x5a9699=_0x51507a;this[_0x5a9699(0x1ab)]=new Bitmap(0x1,0x1);},Sprite_Doodad[_0x51507a(0x1b9)][_0x51507a(0x1c5)]=function(){const _0x430ebb=_0x51507a;this[_0x430ebb(0x22f)]();},Sprite_Doodad[_0x51507a(0x1b9)][_0x51507a(0x22f)]=function(){const _0xb0916d=_0x51507a;this[_0xb0916d(0x200)]=this[_0xb0916d(0x20a)]['opacity']||0x0;},Sprite_Doodad[_0x51507a(0x1b9)][_0x51507a(0x1e3)]=function(){const _0x5b8b8f=_0x51507a;this[_0x5b8b8f(0x256)]();},Sprite_Doodad[_0x51507a(0x1b9)][_0x51507a(0x256)]=function(){const _0x52b6b7=_0x51507a;if($gameTemp[_0x52b6b7(0x242)])return;for(const _0x28323d of this[_0x52b6b7(0x27c)]){if(!$gameParty[_0x52b6b7(0x1fb)][_0x52b6b7(0x224)](_0x28323d)){this[_0x52b6b7(0x200)]=0x0;return;}}for(const _0xfd5ff5 of this[_0x52b6b7(0x1f9)]){if($gameParty[_0x52b6b7(0x1fb)][_0x52b6b7(0x224)](_0xfd5ff5)){this['opacity']=0x0;return;}}for(const _0x5579e9 of this['switchOn']){if(!$gameSwitches['value'](_0x5579e9)){if(_0x52b6b7(0x1d8)!=='RLZsp')_0x50ab87[_0x52b6b7(0x248)][_0x52b6b7(0x24f)]({'name':_0x52b6b7(0x216),'src':_0x52b6b7(0x233)});else{this['opacity']=0x0;return;}}}for(const _0x5d4f6b of this[_0x52b6b7(0x23b)]){if('ewNUL'===_0x52b6b7(0x1d3))this[_0x52b6b7(0x222)]['y']=0x1;else{if($gameSwitches['value'](_0x5d4f6b)){if(_0x52b6b7(0x203)===_0x52b6b7(0x26b))_0x322a69?_0xf8f2c0[_0x52b6b7(0x24f)](_0x1940cf):_0x34ef3f[_0x52b6b7(0x21c)](_0x542621[_0x52b6b7(0x1ee)](_0x3e670b),0x1);else{this[_0x52b6b7(0x200)]=0x0;return;}}}}},Sprite_Doodad['prototype'][_0x51507a(0x1e2)]=function(){const _0x41d85c=_0x51507a;if(this[_0x41d85c(0x1a5)]){const {iconWidth:_0x27662e,iconHeight:_0x2d612b}=ImageManager,_0x57f802=this['_iconIndex']%0x10*_0x27662e,_0x3560ff=Math[_0x41d85c(0x209)](this[_0x41d85c(0x1a5)]/0x10)*_0x2d612b;return this[_0x41d85c(0x1c3)](_0x57f802,_0x3560ff,_0x27662e,_0x2d612b);}if(this[_0x41d85c(0x201)]&&this[_0x41d85c(0x201)]<Tilemap[_0x41d85c(0x1b2)]){if(_0x41d85c(0x236)==='DuXpR'){const _0x37146a=(Math[_0x41d85c(0x209)](this[_0x41d85c(0x201)]/0x80)%0x2*0x8+this[_0x41d85c(0x201)]%0x8)*this[_0x41d85c(0x25a)],_0x1c00a3=Math[_0x41d85c(0x209)](this[_0x41d85c(0x201)]%0x100/0x8)%0x10*this[_0x41d85c(0x211)];return this[_0x41d85c(0x1c3)](_0x37146a,_0x1c00a3,this[_0x41d85c(0x25a)]*(this[_0x41d85c(0x20a)][_0x41d85c(0x24c)]||0x1),this[_0x41d85c(0x211)]*(this[_0x41d85c(0x20a)][_0x41d85c(0x235)]||0x1));}else return;}if(this[_0x41d85c(0x244)]===0x1&&this[_0x41d85c(0x26f)]===0x1)return;const _0x38712b=Math[_0x41d85c(0x209)](this[_0x41d85c(0x1ab)][_0x41d85c(0x25e)]/this['_xFrames']),_0x3098ec=Math['floor'](this[_0x41d85c(0x1ab)][_0x41d85c(0x1be)]/this['_yFrames']),_0x55eccd=this[_0x41d85c(0x240)]%this[_0x41d85c(0x244)]*_0x38712b,_0x3c26d8=Math['floor'](this[_0x41d85c(0x240)]/this[_0x41d85c(0x244)])*_0x3098ec;this[_0x41d85c(0x1c3)](_0x55eccd,_0x3c26d8,_0x38712b,_0x3098ec);if(this[_0x41d85c(0x1ea)]>0x0){if('MuFJd'===_0x41d85c(0x27e))this[_0x41d85c(0x265)](),this[_0x41d85c(0x1ba)]();else return this['_currentCount']--;}this['_currentCount']=this[_0x41d85c(0x246)],this[_0x41d85c(0x240)]++,this[_0x41d85c(0x240)]>=this[_0x41d85c(0x244)]*this['_yFrames']&&(this[_0x41d85c(0x240)]=0x0);},VisuMZ[_0x51507a(0x1da)][_0x51507a(0x253)]=Spriteset_Map[_0x51507a(0x1b9)][_0x51507a(0x255)],Spriteset_Map[_0x51507a(0x1b9)][_0x51507a(0x255)]=function(){const _0x2c2caa=_0x51507a;VisuMZ[_0x2c2caa(0x1da)][_0x2c2caa(0x253)][_0x2c2caa(0x23a)](this),this['createDoodads']();},Spriteset_Map[_0x51507a(0x1b9)][_0x51507a(0x1f3)]=function(){const _0x1bd3cc=_0x51507a;this[_0x1bd3cc(0x23e)](),this[_0x1bd3cc(0x274)]();},Spriteset_Map[_0x51507a(0x1b9)][_0x51507a(0x23e)]=function(){const _0x2f3599=_0x51507a;this['_doodadSprites']=this[_0x2f3599(0x1b0)]||[];for(const _0x3411ae of this[_0x2f3599(0x1b0)]){if(_0x2f3599(0x219)!==_0x2f3599(0x1cc)){if(!_0x3411ae){if(_0x2f3599(0x1aa)==='zXaro')continue;else return this[_0x2f3599(0x1ea)]--;}this[_0x2f3599(0x241)][_0x2f3599(0x262)](_0x3411ae);}else{this['_doodadSprites']=[];const _0x244a03=_0x347811[_0x2f3599(0x24e)]();if(!_0x244a03)return;for(const _0x27d94f of _0x244a03){const _0xf188a1=new _0x41424f(_0x27d94f);this[_0x2f3599(0x1b0)][_0x2f3599(0x24f)](_0xf188a1),this[_0x2f3599(0x241)][_0x2f3599(0x238)](_0xf188a1);}}}},Spriteset_Map[_0x51507a(0x1b9)][_0x51507a(0x274)]=function(){const _0x47bb7b=_0x51507a;this[_0x47bb7b(0x1b0)]=[];const _0x176fbe=$gameMap[_0x47bb7b(0x24e)]();if(!_0x176fbe)return;for(const _0x7ec6a of _0x176fbe){if(_0x47bb7b(0x1f5)===_0x47bb7b(0x22c))!_0x35a15d[_0x47bb7b(0x261)]()&&!_0x3b2c7e['isEventTest']()&&(_0x5cc470[_0x47bb7b(0x1e6)]()&&_0x1a47e8['isOptionValid']('test')&&(this[_0x47bb7b(0x265)](),this[_0x47bb7b(0x1ba)]()),this[_0x47bb7b(0x26a)]());else{const _0x2ee5ca=new Sprite_Doodad(_0x7ec6a);this['_doodadSprites']['push'](_0x2ee5ca),this[_0x47bb7b(0x241)]['addChild'](_0x2ee5ca);}}},Spriteset_Map[_0x51507a(0x1b9)][_0x51507a(0x1c2)]=function(){this['removeCurrentDoodads']();};function _0x1217(){const _0x28f97e=['Folder','contrast','setHue','partyHave','_spriteset','jHVnV','3jSolnU','shadow','filters','throwLoadError','_emptyBitmap','loadDoodad','data/','FBdma','ColorMatrixFilter','blendMode','replace','loadTileset','screenY','isLoopVertical','fcoUf','_iconIndex','CpGuv','dnfae','blur','Settings','zXaro','bitmap','hmoJr','20ocNQSr','format','pQoNv','_doodadSprites','settings','TILE_ID_A5','STRUCT','tileHeight','OutlineFilter','max','shadowFilter','sepiaFilter','prototype','createDoodadsImgDir','description','This\x20is\x20a\x20static\x20class','log','height','toUpperCase','EpoLQ','pXgsU','clearDoodads','setFrame','Scene_Map_terminate','updateCustomA','lSLHy','updatePosition','anchorX','_loadingState','maybeInvertAnchors','glowFilter','jaUos','doodadFolder','toneBlue','join','FjrGw','filter','sepia','AnFYf','wvxuw','ARRAYSTRUCT','loadDoodadBitmap','3396726xDdqNn','RLZsp','ARRAYSTR','DoodadsSystem','blurFilter','2435808mvWmFr','initialize','isLoopHorizontal','match','status','scaleY','updateFrame','updateCustomZ','map','folder','isNwjs','angle','outlineFilter','loadBitmapFromUrl','_currentCount','868546lkYiPT','maybeLoadData','update','indexOf','ConvertParams','49784lLuNpj','smooth','path','createDoodads','TileSet','zLmLf','updateFilters','writeFileSync','initCustomDataA','partyMiss','IconSet','_actors','mapId','loadSystem','initCustomEDP1DataZ','UHWSc','opacity','_tileId','scaleX','WPAVq','tileWidth','blend','startsWith','isEventRunning','xFrames','floor','_data','setColorTone','DropShadowFilter','STR','ARRAYNUM','ARRAYFUNC','mkdirSync','_tileHeight','yFrames','tilesetNames','_cache','constructor','$dataDoodads','positionType','ARRAYJSON','RckJR','PEytf','parse','splice','_mapHeight','GlowFilter','ceil','NUM','sMKWN','anchor','204CiyLDV','includes','MeFBQ','lJJNs','zUCMV','toneGreen','BlurFilter','NkOaq','screen','HeFmD','name','GfDpU','resetOpacity','WURUW','_calcScreenPos','EVAL','Doodads.json','174799ZeSCuo','tileRows','DuXpR','terminate','addChild','filename','call','switchOff','spriteId','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','removeCurrentDoodads','xFwjP','_index','_tilemap','_doodadEditorMode','trim','_xFrames','create','_frameUpdate','6828JvYgUD','_databaseFiles','frameUpdate','31053WcUjhn','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','tileCols','yvdTh','doodads','push','LsgTY','_displayX','initCustomDataZ','Spriteset_Map_prototype_createCharacters','ImageManager_throwLoadError','createCharacters','updateCustomEDP1Z','contrastFilter','qINVB','defineProperty','_tileWidth','scale','lAsGn','EzEGL','width','mainModule','toneRed','isBattleTest','removeChild','maybeAddFilter','_displayY','createDoodadsJson','ubVYn','40980McfzVA','screenX','return\x200','loadData','XPbOm','784DkCvWs','Game_Map_isEventRunning','_loadedData','_yFrames','exit','VPqeA','IvSmt','tileId','addMapDoodads','_compareChildOrder','switchOn','test','initData'];_0x1217=function(){return _0x28f97e;};return _0x1217();}