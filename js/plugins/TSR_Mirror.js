//==================================================================================
//=== TSR_Mirror === A Plugin by The Northern Frog =================================
//==================================================================================

var TSR = TSR || {};
TSR.mirror = TSR.mirror || {};
TSR.mirror.version = 1.14;

var Imported = Imported || {};
Imported.TSR_Mirror = true;

//==================================================================================

/*:
 * @target MZ
 * @plugindesc v1.1.4 Use map region Id or terrain tag to create floor or wall mirrors 
 *             that will reflect player, followers and events.
 * @author TSR, The Northern Frog, 2021      
 * @help 
 * =================================================================================
 * == About this Plugin ============================================================
 * =================================================================================
 * Use either map region Id or terrain tag to defines tiles as mirrors. These 
 * tiles will display the reflection of player, followers and events.
 * 
 * The reflection sprites are created bellow the tileset level, but above 
 * parallax level. That means the tiles you define as mirror should have 
 * a slightly decreased opacity so the reflection sprites can be seen
 * beneath. You can then add a parallax as a background for the mirrors.
 * 
 * The plugin provide 2 types of mirror tiles:
 * 
 *      Wall Mirrors:
 *         The reflection sprites are exact copy of the characters they 
 *         represent, and mirror their movements. When approaching the
 *         mirror, reflection first appear at top of the mirror, and as
 *         the character get nearer, it will move down to be just in front
 *         of the character when it is standing in front of the mirror.
 *
 *              Parameters
 *        ==========================================================
 *       X Offset = the horizontal offset of the reflection sprite.
 * 
 *       Y Offset = the vertical offset of the reflection sprite.
 * 
 * 
 * 
 *      Floor Mirrors:
 *         The reflection sprite can have a little blur filter and a 
 *         small angulation. They always stick slightly to a fixed 
 *         position relatives to the character they represent. The
 *         floor mirrors settings are managed by plugin parameters.
 * 
 *              Parameters
 *        ==========================================================
 *       X Offset = the horizontal offset of the reflection sprite,
 *                  relative to the character. 
 * 
 *       Y Offset = the vertical offset of the reflection sprite,
 *                  relative to the character.
 * 
 *          Angle = the angle of the reflection sprite rotation. Set it
 *                  to 0 for no rotation or 2 to flip the sprite upside
 *                  down. Float values can be used.
 * 
 *           Blur = the strenght of the blur effect on the reflection
 *                  sprite. Set it to 0 for no blur.
 * 
 *       Opactity = the opacity of the reflection sprite ranging from
 *                  0 (invisible) to 255 (full opacity).
 * 
 *          Pulse = enable a slight pulsating effect on the reflection
 *                  sprite to mimic water movement.
 * 
 * 
 * 
 *  HOW TO USE:
 * 
 *         1) Select the tiles on your tileset that you want to act
 *            as mirror. Make the part of the tile where reflection 
 *            should appear semi-transparent (50-75% opacity).
 *  
 *         2) Set the Plugin parameters and choose map region Id or
 *            terrain tag to mark the mirror tiles.
 * 
 *         3) Place the mirror tiles on you map and mark them with the
 *            id you selected in the parameters. Make sure there's no
 *            other layers bellow the mirror tiles, because the reflection
 *            sprites appears beneath all tiles layer.
 * 
 * 
 * 
 *  EVENT COMMENT TAG:
 *          Use the following Event Comment Tag to prevent reflection of
 *          an event page.
 * 
 *                               <NO MIRROR>
 * 
 * 
 *          Those comment tags can be used to assign specific offset to
 *          an event reflection on wall or floor.
 * 
 *                         <WALL MIRROR OFFSET: X, Y>
 * 
 *                        <FLOOR MIRROR OFFSET: X, Y>
 * 
 * 
 *          This Event Comment Tag will prevent the flipping of the vertical
 *          direction of the reflections. This is useful when using a non
 *          character sheet such as 'Flame', 'Switch' or 'Doors'.
 * 
 *                             <FIX MIRROR IMAGE>
 * 
 * 
 * 
 *  MAP NOTE TAG:
 *          Use this notetag in a map notebox to turn map region Id into
 *          floor mirror. These floor mirrors will use the setting defined
 *          by the notetag instead of those set in the parameters. You
 *          can put more than one notetag in a map notebox to add more 
 *          floor mirror region Id with different settings.
 * 
 *       <FLOOR MIRROR INFO: regionId, x, y, angle, blur, opacity, pulse>
 * 
 *       regionId = the map region Id that is turned into a floor mirror
 *                  with the settings defined by the following arguments. 
 *              x = the horizontal offset of the reflection sprite,
 *                  relative to the character. 
 *              y = the vertical offset of the reflection sprite,
 *                  relative to the character. 
 *          angle = the angle of the reflection sprite rotation. Set it
 *                  to 0 for no rotation or 2 to flip the sprite upside
 *                  down. Float values can be used.
 *           blur = the strenght of the blur effect on the reflection
 *                  sprite. Set it to 0 for no blur.
 *       opactity = the opacity of the reflection sprite ranging from
 *                  0 (invisible) to 255 (full opacity).
 *          pulse = enable a slight pulsating effect on the reflection
 *                  sprite to mimic water movement.
 *
 * 
 *          MIRROR BACKGROUND
 *          =================
 *          Use the following map notetag to draw an image from the /img/
 *          parallaxes folder of your game, and use it as background for
 *          your mirroring areas. You can use images of any size and set
 *          as many mirror background as you need.
 * 
 *              <**LABEL** MIRROR BACKGROUND: filename, x, y, z> 
 * 
 *      **LABEL** = the label or name of the notatag. You can name it as
 *                  you want, but be sure that it is followed by the key
 *                  words 'mirror background'. If you use more than one
 *                  notetag, each must have a different name, of course.
 *              x = the map tile X of the left border of your background
 *                  image. You can use float number.
 *              y = the map tile Y of the top border of your background
 *                  image. You can use float numbers.
 *              z = the z index of your background image. You can use
 *                  float numbers.
 * 
 *                **Wall reflection sprites have a z index of -0.5 and 
 *                  floor reflection sprites have a z index between -0.6
 *                  and -0.8. Use z values bellow the reflection sprites
 *                  for your background images.
 *                  
 *  
 * 
 * =======================================================================================
 * == Term of Usage ======================================================================
 * =======================================================================================
 * 
 * Use in any independant RPG Maker MZ or MV projects, including commercials.
 *
 * Credit is required for using this Plugin. 
 * For crediting, use 'TSR' along with one of
 * the following terms: 
 *      'The Northern Frog' or 'A frog from the north'
 * 
 * Do not change the Header or the Terms of usage.
 *
 * DO NOT REDISTRIBUTE!
 * If you want to share it, share the link to my itch.io account: 
 * https://the-northern-frog.itch.io/
 * 
 *
 * =======================================================================================
 * == Version and compatibility ==========================================================
 * =======================================================================================
 * 2021/02/15 completed plugin, v1.0.0
 * 2021/02/18 small fix on wall mirror functions, v1.0.1
 * 2021/02/20 fix wall and floor mirror reflection position delay, v1.0.2
 * 2021/02/21 fix bug due to previous update, v1.0.3
 * 2021/02/21 add parameters for floor mirrors settings, v1.0.4
 * 2021/03/14 add the regionId argument to the map notetag, v1.0.5
 * 2021/03/17 fix reflection for event with image from tile sheet, v1.0.6
 * 2021/03/18 fix compatibility with TSR_MoveEvent, v1.0.7
 * 2021/03/19 add wall and floor mirrors offset event comment tag, v1.0.8
 * 2021/03/22 add mirror background image map notetag, v1.0.9
 * 2021/06/19 fix a bug with followers reflection, v1.1.0
 * 2021/08/15 add fix image comment tag and compatibility for big characters, v1.1.2
 * 2021/08/21 fix bug reported by user, v1.1.3
 * 2021/10/12 fix bug reported by user, v1.1.4
 * 
 * This plugin should be installed bellow TSR_MoveEvent for optimal compatibility
 * 
 * =======================================================================================
 * == END ================================================================================                                             
 * =======================================================================================
 *
 *                              "Have fun!"
 *                                                  TSR, The Northern Frog
 *
 * =======================================================================================
 *
 * 
 * @param ---Wall Mirror---
 *
 * @param Wall Mirror Id Type
 * @parent ---Wall Mirror---
 * @type combo
 * @option region id
 * @option tag
 * @desc Use map region Id or terrain tag to mark wall mirrors?
 * @default region id
 * 
 * @param Wall Mirror Region Id
 * @parent ---Wall Mirror---
 * @type Number
 * @min 1
 * @max 255
 * @desc Set the map region Id for wall mirror.
 * @default 253
 * 
 * @param Wall Mirror Terrain Tag
 * @parent ---Wall Mirror---
 * @type Number
 * @min 1
 * @max 7
 * @desc Set the terrain tag for wall mirror.
 * @default 5
 * 
 * @param Wall Mirror X Offset
 * @parent ---Wall Mirror---
 * @desc Set the horizontal offset of the reflection sprites.
 * @default 0
 * 
 * @param Wall Mirror Y Offset
 * @parent ---Wall Mirror---
 * @desc Set the vertical offset of the reflection sprites.
 * @default 0
 * 
 * 
 * @param ---Floor Mirror---
 *
 * @param Floor Mirror Id Type
 * @parent ---Floor Mirror---
 * @type combo
 * @option region id
 * @option tag
 * @desc Use map region Id or terrain tag to mark floor mirrors?
 * @default Region Id
 * 
 * @param Floor Mirror Region Id
 * @parent ---Floor Mirror---
 * @type Number
 * @min 1
 * @max 255
 * @desc Set the map region Id for floor mirror.
 * @default 254
 * 
 * @param Floor Mirror Terrain Tag
 * @parent ---Floor Mirror---
 * @type Number
 * @min 1
 * @max 7
 * @desc Set the terrain tag for floor mirror.
 * @default 6
 * 
 * @param Floor Mirror X Offset
 * @parent ---Floor Mirror---
 * @desc Set the horizontal offset of the reflection sprites.
 * @default 20
 * 
 * @param Floor Mirror Y Offset
 * @parent ---Floor Mirror---
 * @desc Set the vertical offset of the reflection sprites.
 * @default -56
 * 
 * @param Floor Mirror Angle
 * @parent ---Floor Mirror---
 * @desc Set the angle for the reflection sprite rotation.
 * @default 0.3
 *
 * @param Floor Mirror Blur
 * @parent ---Floor Mirror---
 * @desc Set the blur effect strenght of the reflection sprite.
 * @default 1
 * 
 * @param Floor Mirror Opacity
 * @parent ---Floor Mirror---
 * @type Number
 * @min 0
 * @max 255
 * @desc Set the opacity of the reflection sprite.
 * @default 200 
 *  
 * @param Floor Mirror Pulse
 * @parent ---Floor Mirror---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Enable the pulse effect for the reflection sprite?
 * OFF - false  ON - true
 * @default true
 * 
 *
 */

(() => {
const _0x1d9f1c=_0x599a;function _0x599a(_0x481729,_0x49bc06){const _0x53512b=_0x5351();return _0x599a=function(_0x599a30,_0x27e63a){_0x599a30=_0x599a30-0x1d3;let _0x4b55d5=_0x53512b[_0x599a30];return _0x4b55d5;},_0x599a(_0x481729,_0x49bc06);}(function(_0x1f7b0e,_0xf3bbca){const _0x572a66=_0x599a,_0x3aa5ec=_0x1f7b0e();while(!![]){try{const _0x32e0d2=-parseInt(_0x572a66(0x247))/0x1+-parseInt(_0x572a66(0x252))/0x2*(parseInt(_0x572a66(0x28a))/0x3)+-parseInt(_0x572a66(0x207))/0x4*(-parseInt(_0x572a66(0x257))/0x5)+parseInt(_0x572a66(0x26f))/0x6*(-parseInt(_0x572a66(0x22f))/0x7)+parseInt(_0x572a66(0x26d))/0x8+parseInt(_0x572a66(0x240))/0x9+parseInt(_0x572a66(0x239))/0xa;if(_0x32e0d2===_0xf3bbca)break;else _0x3aa5ec['push'](_0x3aa5ec['shift']());}catch(_0x564269){_0x3aa5ec['push'](_0x3aa5ec['shift']());}}}(_0x5351,0x2f4f6),TSR[_0x1d9f1c(0x209)]=PluginManager['parameters'](_0x1d9f1c(0x1dd)),TSR['mirror'][_0x1d9f1c(0x1d6)]=String(TSR['Parameters'][_0x1d9f1c(0x20e)]),TSR[_0x1d9f1c(0x29a)][_0x1d9f1c(0x29c)]=Number(TSR[_0x1d9f1c(0x209)][_0x1d9f1c(0x29e)]),TSR[_0x1d9f1c(0x29a)]['_mirrorTag']=Number(TSR['Parameters'][_0x1d9f1c(0x27f)]),TSR['mirror'][_0x1d9f1c(0x1e4)]=String(TSR[_0x1d9f1c(0x209)]['Floor\x20Mirror\x20Id\x20Type']),TSR[_0x1d9f1c(0x29a)][_0x1d9f1c(0x222)]=Number(TSR[_0x1d9f1c(0x209)][_0x1d9f1c(0x25e)]),TSR['mirror'][_0x1d9f1c(0x1e8)]=Number(TSR[_0x1d9f1c(0x209)][_0x1d9f1c(0x204)]),TSR[_0x1d9f1c(0x29a)]['setInfo']=function(_0x38509f){const _0x29af23=_0x1d9f1c;let _0x47a515=_0x38509f===_0x29af23(0x29a)?TSR['mirror'][_0x29af23(0x1d6)]:TSR[_0x29af23(0x29a)]['_reflectId'];if(_0x47a515===_0x29af23(0x25a)){const _0x12d8aa=_0x38509f==='mirror'?TSR[_0x29af23(0x29a)][_0x29af23(0x1f3)]:TSR[_0x29af23(0x29a)][_0x29af23(0x1e8)];return[_0x29af23(0x230),_0x12d8aa];}else{const _0x5d3604=_0x38509f===_0x29af23(0x29a)?TSR[_0x29af23(0x29a)][_0x29af23(0x29c)]:TSR[_0x29af23(0x29a)][_0x29af23(0x222)];return['regionId',_0x5d3604];}},TSR[_0x1d9f1c(0x29a)][_0x1d9f1c(0x293)]=TSR[_0x1d9f1c(0x29a)][_0x1d9f1c(0x1d5)](_0x1d9f1c(0x29a)),TSR[_0x1d9f1c(0x29a)][_0x1d9f1c(0x211)]=TSR[_0x1d9f1c(0x29a)][_0x1d9f1c(0x1d5)](_0x1d9f1c(0x29f)),TSR[_0x1d9f1c(0x29a)]['_wallOffsetX']=parseInt(String(TSR[_0x1d9f1c(0x209)]['Wall\x20Mirror\x20X\x20Offset'])),TSR[_0x1d9f1c(0x29a)][_0x1d9f1c(0x23e)]=parseInt(String(TSR[_0x1d9f1c(0x209)][_0x1d9f1c(0x27a)])),TSR['mirror']['_floorOffsetX']=parseInt(String(TSR[_0x1d9f1c(0x209)][_0x1d9f1c(0x24a)])),TSR['mirror']['_floorOffsetY']=parseInt(String(TSR[_0x1d9f1c(0x209)][_0x1d9f1c(0x225)])),TSR[_0x1d9f1c(0x29a)][_0x1d9f1c(0x294)]=parseFloat(String(TSR['Parameters'][_0x1d9f1c(0x296)])),TSR[_0x1d9f1c(0x29a)][_0x1d9f1c(0x248)]=parseFloat(String(TSR['Parameters'][_0x1d9f1c(0x22b)])),TSR['mirror'][_0x1d9f1c(0x25b)]=Number(TSR[_0x1d9f1c(0x209)]['Floor\x20Mirror\x20Opacity']),TSR['mirror'][_0x1d9f1c(0x29d)]=eval(String(TSR[_0x1d9f1c(0x209)][_0x1d9f1c(0x236)])),DataManager[_0x1d9f1c(0x272)]=function(){const _0xa14cf9=_0x1d9f1c;if(!$dataMap)return 0x0;const _0xba0b82=/<(.*)(?:MIRROR BACKGROUND|MIRROR BACKGROUND):[ ]*(.*(?:\s*,\s*\d+)*)>/i,_0x47be6f=$dataMap[_0xa14cf9(0x206)][_0xa14cf9(0x1ea)]()[_0xa14cf9(0x21e)](/[\r\n]+/);let _0x30ab15=[];for(let _0x25ba22=0x0;_0x25ba22<_0x47be6f[_0xa14cf9(0x1f7)];_0x25ba22++){const _0x16edc0=_0x47be6f[_0x25ba22][_0xa14cf9(0x21c)]();if(_0x16edc0[_0xa14cf9(0x208)](_0xba0b82)){const _0x2b7b2a=_0x16edc0['slice'](_0x47be6f[_0x25ba22][_0xa14cf9(0x1e0)]('<')+0x1,_0x16edc0['indexOf'](_0xa14cf9(0x276))),_0x494fdd=_0x16edc0[_0xa14cf9(0x237)](_0x47be6f[_0x25ba22]['indexOf'](':')+0x1,_0x16edc0[_0xa14cf9(0x1e0)]('>'))[_0xa14cf9(0x21e)](',');_0x494fdd[_0xa14cf9(0x269)](_0x2b7b2a),_0x30ab15[_0xa14cf9(0x279)](_0x494fdd);}}return _0x30ab15;},DataManager['getMapMirrorInfos']=function(_0x1349b7){const _0x25e3ea=_0x1d9f1c;if(!$dataMap)return 0x0;const _0x219fe0=/<(?:FLOOR MIRROR INFO|FLOOR MIRROR):[ ]*(.*(?:\s*,\s*\d+)*)>/i,_0x484a73=$dataMap[_0x25e3ea(0x206)]['toString']()[_0x25e3ea(0x21e)](/[\r\n]+/);for(let _0x320323=0x0;_0x320323<_0x484a73[_0x25e3ea(0x1f7)];_0x320323++){const _0xf4bb51=_0x484a73[_0x320323];if(_0xf4bb51['match'](_0x219fe0)&&parseInt(RegExp['$1'])===_0x1349b7){const _0x3b5c77=_0x484a73[_0x320323][_0x25e3ea(0x237)](_0x484a73[_0x320323][_0x25e3ea(0x1e0)](':')+0x1,_0x484a73[_0x320323][_0x25e3ea(0x1e0)]('>'))[_0x25e3ea(0x21e)](',');if(parseInt(_0x3b5c77[0x0])===_0x1349b7)return _0x3b5c77;}}return 0x0;},DataManager[_0x1d9f1c(0x260)]=function(_0x61f95a){const _0x18380c=_0x1d9f1c;if(!_0x61f95a[_0x18380c(0x263)])return![];if(!_0x61f95a[_0x18380c(0x284)]())return![];const _0x5c6014=/<(?:PICKABLE EVENT|PICKUP EVENT)>/i,_0x50b388=/<(?:PICKABLE CHARACTER|PICKUP CHARACTER)>/i,_0xdee6ee=/<(?:PICKABLE EVENT|PICKUP EVENT):[ ](.)>/i,_0xd3daf9=_0x61f95a[_0x18380c(0x1f4)](),_0x2e899b=_0xd3daf9[_0x18380c(0x1f7)];for(let _0x19da78=0x0;_0x19da78<_0x2e899b;++_0x19da78){let _0x4feb3e=_0xd3daf9[_0x19da78];if([0x6c,0x198]['contains'](_0x4feb3e[_0x18380c(0x259)])){const _0x255693=_0x4feb3e[_0x18380c(0x261)][0x0];if(_0x255693['match'](_0x5c6014)||_0x255693['match'](_0x50b388)||_0x255693['match'](_0xdee6ee))return!![];}}return![];},TSR[_0x1d9f1c(0x29a)]['Scene_Map_terminate']=Scene_Map[_0x1d9f1c(0x27e)][_0x1d9f1c(0x20f)],Scene_Map[_0x1d9f1c(0x27e)][_0x1d9f1c(0x20f)]=function(){const _0x3d1801=_0x1d9f1c;$gamePlayer['setPreventMirror'](![]),$gamePlayer[_0x3d1801(0x214)](![]);for(const _0x886bf5 of $gamePlayer[_0x3d1801(0x1dc)]()['_data']){_0x886bf5[_0x3d1801(0x20d)](![]),_0x886bf5['setPreventReflect'](![]);}for(const _0x5d7d1d of $gameMap[_0x3d1801(0x1e3)]()){_0x5d7d1d[_0x3d1801(0x20d)](![]),_0x5d7d1d[_0x3d1801(0x214)](![]);}TSR[_0x3d1801(0x29a)][_0x3d1801(0x251)][_0x3d1801(0x266)](this);},Game_Map[_0x1d9f1c(0x27e)][_0x1d9f1c(0x238)]=function(_0x506986,_0x467111){const _0x3bcd35=_0x1d9f1c,_0x481010=TSR[_0x3bcd35(0x29a)][_0x3bcd35(0x293)][0x0],_0x5de67e=TSR[_0x3bcd35(0x29a)]['_mirrorInfo'][0x1];return this[_0x481010](_0x506986-0x1,_0x467111)===_0x5de67e||this[_0x481010](_0x506986+0x1,_0x467111)===_0x5de67e||this[_0x481010](_0x506986,_0x467111)===_0x5de67e;},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x24d)]=function(_0x324014,_0x3f9c09){const _0x4cb176=_0x1d9f1c;if(this[_0x4cb176(0x271)](_0x324014,_0x3f9c09)){const _0x34e7de=this['calcMirrorHeight'](_0x324014,_0x3f9c09);return this[_0x4cb176(0x219)](_0x324014,_0x3f9c09,_0x34e7de);}return![];},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x271)]=function(_0x1f4378,_0x368472){const _0x498efb=_0x1d9f1c;return this[_0x498efb(0x1eb)](_0x1f4378,_0x368472);},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x1eb)]=function(_0x4fd8d7,_0x2cd56e){const _0x3fe73f=_0x1d9f1c;for(let _0x4d7a97=_0x2cd56e;_0x4d7a97>0x0;_0x4d7a97--){if($gameMap[_0x3fe73f(0x238)](_0x4fd8d7,_0x4d7a97))return!![];}return![];},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x219)]=function(_0x5e0321,_0x1f19f2,_0x5f19be){const _0x2eafc4=_0x1d9f1c;return this[_0x2eafc4(0x205)](_0x5e0321,_0x1f19f2,_0x5f19be)?this[_0x2eafc4(0x246)]=!![]:this[_0x2eafc4(0x246)]=![],this['_inFrontOfMirror'];},Game_Character['prototype'][_0x1d9f1c(0x205)]=function(_0x504469,_0x2dc896,_0x28d897){for(let _0x3a31db=_0x2dc896;_0x3a31db>_0x2dc896-_0x28d897-0x1;_0x3a31db--){if($gameMap['isFrontMirrorTile'](_0x504469,_0x3a31db))return!![];}return![];},Game_Character[_0x1d9f1c(0x27e)]['calcMirrorHeight']=function(_0x45d087,_0x2450fd){const _0x5eba1a=_0x1d9f1c;this[_0x5eba1a(0x221)]();for(let _0x5bbe70=_0x2450fd;_0x5bbe70>0x0;_0x5bbe70--){if($gameMap[_0x5eba1a(0x238)](_0x45d087,_0x5bbe70)){if(!this[_0x5eba1a(0x25d)]())this['_bottomMirrorY']=_0x5bbe70;}else{if(!this[_0x5eba1a(0x281)]()&&this[_0x5eba1a(0x25d)]()){this['_topMirrorY']=_0x5bbe70+0x1;break;}}}return this[_0x5eba1a(0x1e9)]-this[_0x5eba1a(0x249)]+0x2;},Game_Character[_0x1d9f1c(0x27e)]['bottomMirrorY']=function(){const _0x54d72a=_0x1d9f1c;return this[_0x54d72a(0x1e9)];},Game_Character[_0x1d9f1c(0x27e)]['topMirrorY']=function(){const _0x699d79=_0x1d9f1c;return this[_0x699d79(0x249)];},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x242)]=function(_0x198d6f,_0x535d04){return this['isNearReflectTile'](_0x198d6f,_0x535d04);},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x285)]=function(_0x299f22,_0x17fa10){const _0xd98ab0=_0x1d9f1c,_0x5179b2=$gameMap[_0xd98ab0(0x1f8)](_0x299f22,0x4),_0x4ff8f2=$gameMap[_0xd98ab0(0x1f8)](_0x299f22,0x6),_0x4f6701=$gameMap[_0xd98ab0(0x1f8)](_0x5179b2,0x4),_0x409487=$gameMap[_0xd98ab0(0x1f8)](_0x4ff8f2,0x6);return this[_0xd98ab0(0x1d3)](_0x299f22,_0x17fa10)||this[_0xd98ab0(0x1d3)](_0x5179b2,_0x17fa10)||this[_0xd98ab0(0x1d3)](_0x4ff8f2,_0x17fa10)||this[_0xd98ab0(0x1d3)](_0x4f6701,_0x17fa10)||this[_0xd98ab0(0x1d3)](_0x409487,_0x17fa10);},Game_Character[_0x1d9f1c(0x27e)]['checkReflectY']=function(_0x4d2a65,_0x3c3a08){const _0x2027f1=_0x1d9f1c,_0x2d27a9=this[_0x2027f1(0x29b)](_0x4d2a65,_0x3c3a08),_0x4aefeb=_0x2d27a9?_0x2027f1(0x1f1):TSR['mirror'][_0x2027f1(0x211)][0x0],_0x40284f=_0x2d27a9?parseInt(_0x2d27a9[0x0]):TSR[_0x2027f1(0x29a)][_0x2027f1(0x211)][0x1];return $gameMap[_0x4aefeb](_0x4d2a65,_0x3c3a08)===_0x40284f||$gameMap[_0x4aefeb](_0x4d2a65,_0x3c3a08-0x1)===_0x40284f||$gameMap[_0x4aefeb](_0x4d2a65,_0x3c3a08-0x2)===_0x40284f||$gameMap[_0x4aefeb](_0x4d2a65,_0x3c3a08+0x1)===_0x40284f||$gameMap[_0x4aefeb](_0x4d2a65,_0x3c3a08+0x2)===_0x40284f;},Game_Character['prototype']['checkMapMirrorInfos']=function(_0x1f516f,_0x26e0ac){const _0x5df9c0=_0x1d9f1c;for(let _0x3c95d9=-0x2;_0x3c95d9<0x2;_0x3c95d9++){ar=DataManager['getMapMirrorInfos']($gameMap['regionId'](_0x1f516f,_0x26e0ac+_0x3c95d9));if(ar)return this[_0x5df9c0(0x282)](ar),ar;}return this[_0x5df9c0(0x282)](![]),![];},TSR['mirror'][_0x1d9f1c(0x1d4)]=Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x298)],Game_Character[_0x1d9f1c(0x27e)]['update']=function(){const _0x22b47c=_0x1d9f1c;TSR['mirror'][_0x22b47c(0x1d4)][_0x22b47c(0x266)](this);if(!this[_0x22b47c(0x1e5)]()){if(this[_0x22b47c(0x24d)](this['x'],this['y'])&&this[_0x22b47c(0x254)]()){this[_0x22b47c(0x216)](!![]);if(Imported[_0x22b47c(0x23a)]){if(this[_0x22b47c(0x280)]()&&this[_0x22b47c(0x287)]){const _0x1d28f3=this['pickupEvent']();if(!_0x1d28f3['preventMirror']())_0x1d28f3[_0x22b47c(0x216)](!![]);}}}if(this[_0x22b47c(0x242)](this['x'],this['y'])&&this[_0x22b47c(0x28f)]()){this[_0x22b47c(0x1e7)](!![]);if(Imported[_0x22b47c(0x23a)]){if(this['isPlayer']()&&this[_0x22b47c(0x287)]){const _0x41be9e=this[_0x22b47c(0x286)]();if(!_0x41be9e[_0x22b47c(0x241)]())_0x41be9e[_0x22b47c(0x1e7)](!![]);}}}}},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x254)]=function(){const _0xda1e8=_0x1d9f1c;if(this[_0xda1e8(0x1da)]&&!this[_0xda1e8(0x217)]())return![];return!this['preventMirror']();},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x28f)]=function(){const _0x2b493e=_0x1d9f1c;if(this[_0x2b493e(0x1da)]&&!this[_0x2b493e(0x217)]())return![];return!this[_0x2b493e(0x241)]();},Game_Character[_0x1d9f1c(0x27e)]['distToBottomMirror']=function(){const _0x5c91d1=_0x1d9f1c;return this['_realY']-this[_0x5c91d1(0x1e9)];},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x1ef)]=function(){const _0x591be1=_0x1d9f1c;return this[_0x591be1(0x275)];},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x216)]=function(_0x31a7ec){const _0x16878a=_0x1d9f1c;this[_0x16878a(0x275)]=_0x31a7ec;},Game_Character['prototype'][_0x1d9f1c(0x250)]=function(){const _0x219c81=_0x1d9f1c;return this[_0x219c81(0x213)];},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x1e7)]=function(_0x24e5ab){const _0x2c4990=_0x1d9f1c;this[_0x2c4990(0x213)]=_0x24e5ab;},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x282)]=function(_0x3da224){const _0x550e66=_0x1d9f1c;this[_0x550e66(0x256)]=_0x3da224;},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x243)]=function(){const _0x2c4ac7=_0x1d9f1c;return this[_0x2c4ac7(0x256)];},Game_Character[_0x1d9f1c(0x27e)]['preventMirror']=function(){return this['_preventMirror'];},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x20d)]=function(_0x57ebf8){this['_preventMirror']=_0x57ebf8;},Game_Character['prototype'][_0x1d9f1c(0x241)]=function(){return this['_preventReflect'];},Game_Character[_0x1d9f1c(0x27e)]['setPreventReflect']=function(_0x144e98){this['_preventReflect']=_0x144e98;},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x1e5)]=function(){return this['_cannotMirror'];},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x1ee)]=function(){const _0xa8aa0a=_0x1d9f1c;return this[_0xa8aa0a(0x26a)];},Game_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x297)]=function(){const _0x40a900=_0x1d9f1c;return this[_0x40a900(0x246)];},Game_Character[_0x1d9f1c(0x27e)]['resetMirrorBottomTop']=function(){const _0x1f3a8f=_0x1d9f1c;this[_0x1f3a8f(0x1e9)]=![],this['_topMirrorY']=![];},TSR[_0x1d9f1c(0x29a)]['_Game_Event_setupPage']=Game_Event[_0x1d9f1c(0x27e)]['setupPage'],Game_Event[_0x1d9f1c(0x27e)][_0x1d9f1c(0x23d)]=function(){const _0x50d3d5=_0x1d9f1c;TSR[_0x50d3d5(0x29a)][_0x50d3d5(0x1ec)]['call'](this),this[_0x50d3d5(0x24c)]();},Game_Event[_0x1d9f1c(0x27e)][_0x1d9f1c(0x24c)]=function(){const _0x4b266a=_0x1d9f1c;if(!this[_0x4b266a(0x284)]())return;const _0x1dc859=/<(?:CANNOT MIRROR EVENT|NO MIRROR)>/i,_0x7057e7=/<(?:WALL MIRROR OFFSET|WALL OFFSET):[ ]-*(\d+),[ ]-*(\d+)>/i,_0x4e803f=/<(?:FLOOR MIRROR OFFSET|WATER REFLECT OFFSET):[ ]-*(\d+),[ ]-*(\d+)>/i,_0x3262c0=/<(?:FIX MIRROR IMAGE|FIX IMAGE|FIX MIRROR)>/i,_0x2f1acd=this['list'](),_0x30acb1=_0x2f1acd[_0x4b266a(0x1f7)];this['_cannotMirror']=![],this[_0x4b266a(0x1d7)]=![],this[_0x4b266a(0x1f0)]=![],this[_0x4b266a(0x26a)]=![];for(let _0x42efc3=0x0;_0x42efc3<_0x30acb1;++_0x42efc3){let _0x2dd956=_0x2f1acd[_0x42efc3];if([0x6c,0x198]['contains'](_0x2dd956[_0x4b266a(0x259)])){const _0x67a08e=_0x2dd956[_0x4b266a(0x261)][0x0];if(_0x67a08e[_0x4b266a(0x208)](_0x1dc859))this[_0x4b266a(0x255)]=!![];else{if(_0x67a08e['match'](_0x7057e7)){const _0x2ff980=parseInt(_0x67a08e['slice'](_0x67a08e[_0x4b266a(0x1e0)](':')+0x1,_0x67a08e[_0x4b266a(0x1e0)](','))),_0x3031c8=parseInt(_0x67a08e[_0x4b266a(0x237)](_0x67a08e[_0x4b266a(0x1e0)](',')+0x1,_0x67a08e[_0x4b266a(0x1e0)]('>')));this[_0x4b266a(0x1d7)]=[_0x2ff980,_0x3031c8];}else{if(_0x67a08e[_0x4b266a(0x208)](_0x4e803f)){const _0x130967=parseInt(_0x67a08e[_0x4b266a(0x237)](_0x67a08e[_0x4b266a(0x1e0)](':')+0x1,_0x67a08e[_0x4b266a(0x1e0)](','))),_0x17a2ac=parseInt(_0x67a08e[_0x4b266a(0x237)](_0x67a08e[_0x4b266a(0x1e0)](',')+0x1,_0x67a08e['indexOf']('>')));this['_floorMirrorOffset']=[_0x130967,_0x17a2ac];}else _0x67a08e[_0x4b266a(0x208)](_0x3262c0)&&(this[_0x4b266a(0x26a)]=!![]);}}}}},TSR['mirror'][_0x1d9f1c(0x299)]=Spriteset_Map[_0x1d9f1c(0x27e)][_0x1d9f1c(0x290)],Spriteset_Map[_0x1d9f1c(0x27e)][_0x1d9f1c(0x290)]=function(){const _0x29cccf=_0x1d9f1c;TSR[_0x29cccf(0x29a)][_0x29cccf(0x299)][_0x29cccf(0x266)](this),this['createMirrorBackGroundSprites']();},Spriteset_Map[_0x1d9f1c(0x27e)][_0x1d9f1c(0x26e)]=function(){const _0x170c5f=_0x1d9f1c,_0x2fb512=DataManager['getMapBackGround']();this['_mirrorBGArray']=[];if(_0x2fb512[_0x170c5f(0x1f7)]>0x0)for(const _0x3e47b0 of _0x2fb512){const _0x3ea287=_0x3e47b0[0x0]['trim'](),_0x3aa90f=_0x3e47b0[0x1]['trim'](),_0x32f908=parseFloat(_0x3e47b0[0x2]),_0x27330c=parseFloat(_0x3e47b0[0x3]),_0x4a8cae=parseFloat(_0x3e47b0[0x4]);this[_0x170c5f(0x262)](_0x3ea287,_0x3aa90f,_0x32f908,_0x27330c,_0x4a8cae);}},Spriteset_Map['prototype'][_0x1d9f1c(0x262)]=function(_0xd31e4a,_0xfa467e,_0x408e68,_0x2f8e0a,_0x36cc7a){const _0x1dafb2=_0x1d9f1c,_0x1017b0='-'+_0xd31e4a+'MirrorBg';this[_0x1017b0]=new Sprite(),this[_0x1017b0][_0x1dafb2(0x233)]=ImageManager[_0x1dafb2(0x22a)](_0xfa467e),this[_0x1017b0][_0x1dafb2(0x1e2)](0x0,0x0,this[_0x1dafb2(0x289)],this[_0x1dafb2(0x28b)]),this[_0x1017b0]['_displayX']=_0x408e68,this[_0x1017b0][_0x1dafb2(0x1df)]=_0x2f8e0a,this[_0x1017b0]['z']=_0x36cc7a,this[_0x1dafb2(0x267)][_0x1dafb2(0x295)](this[_0x1017b0]),this[_0x1dafb2(0x1fc)][_0x1dafb2(0x279)](this[_0x1017b0]);},TSR[_0x1d9f1c(0x29a)]['_Spriteset_Map_update']=Spriteset_Map[_0x1d9f1c(0x27e)][_0x1d9f1c(0x298)],Spriteset_Map['prototype'][_0x1d9f1c(0x298)]=function(){const _0x2617dd=_0x1d9f1c;TSR[_0x2617dd(0x29a)][_0x2617dd(0x288)]['call'](this),this['updateMirrorBackground']();},Spriteset_Map['prototype'][_0x1d9f1c(0x1f2)]=function(){const _0x266271=_0x1d9f1c;for(const _0x5539ee in this['_mirrorBGArray']){const _0x3c7aab=this[_0x266271(0x1fc)][_0x5539ee],_0x396c56=$gameMap[_0x266271(0x226)](),_0x88a63=$gameMap[_0x266271(0x292)]();_0x3c7aab['x']=_0x3c7aab[_0x266271(0x212)]*_0x396c56-$gameMap[_0x266271(0x212)]*_0x396c56,_0x3c7aab['y']=_0x3c7aab[_0x266271(0x1df)]*_0x88a63-$gameMap[_0x266271(0x1df)]*_0x88a63;}},TSR['mirror'][_0x1d9f1c(0x22c)]=Sprite_Character['prototype'][_0x1d9f1c(0x201)],Sprite_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x201)]=function(){const _0x259b05=_0x1d9f1c;TSR[_0x259b05(0x29a)][_0x259b05(0x22c)]['call'](this),this['_mirrorSpriteSet']=[],this[_0x259b05(0x232)]=[];},TSR['mirror'][_0x1d9f1c(0x278)]=Sprite_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x298)],Sprite_Character[_0x1d9f1c(0x27e)]['update']=function(){const _0x2aaf28=_0x1d9f1c;TSR[_0x2aaf28(0x29a)][_0x2aaf28(0x278)]['call'](this),this['updateMirrorSprites']();},Sprite_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x27b)]=function(){const _0x4991c7=_0x1d9f1c;this[_0x4991c7(0x253)](),this[_0x4991c7(0x231)]['length']>0x0&&(!this[_0x4991c7(0x231)][0x0][_0x4991c7(0x27d)]()&&(this[_0x4991c7(0x1db)][_0x4991c7(0x23f)](this[_0x4991c7(0x231)][0x0]),this[_0x4991c7(0x231)][_0x4991c7(0x1f6)](),this['_character'][_0x4991c7(0x20d)](![]),this['_character']['resetMirrorBottomTop'](),this[_0x4991c7(0x21b)]['_inFrontOfMirror']=![])),this['setupReflect'](),this['_reflectSpriteSet'][_0x4991c7(0x1f7)]>0x0&&(!this[_0x4991c7(0x232)][0x0][_0x4991c7(0x27d)]()&&(this['parent'][_0x4991c7(0x23f)](this[_0x4991c7(0x232)][0x0]),this[_0x4991c7(0x232)][_0x4991c7(0x1f6)](),this['_character'][_0x4991c7(0x214)](![])));},Sprite_Character['prototype'][_0x1d9f1c(0x253)]=function(){const _0x50b8ed=_0x1d9f1c;this['_character']['needsMirror']()&&(this['_character'][_0x50b8ed(0x216)](![]),this[_0x50b8ed(0x21b)][_0x50b8ed(0x20d)](!![]),this[_0x50b8ed(0x228)]());},Sprite_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x228)]=function(){const _0x19a489=_0x1d9f1c,_0x471d98=this[_0x19a489(0x23c)]();this['_mirrorSpriteSet'][_0x19a489(0x279)](_0x471d98);},Sprite_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x23c)]=function(){const _0x164f2f=_0x1d9f1c,_0x33f08e=new Sprite_Mirror();return _0x33f08e['x']=this[_0x164f2f(0x21b)]['screenX'](),_0x33f08e['y']=this[_0x164f2f(0x21b)][_0x164f2f(0x25c)](),_0x33f08e['setup'](this,this['_character']),this['parent'][_0x164f2f(0x295)](_0x33f08e),_0x33f08e;},Sprite_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x244)]=function(){const _0x2c2cfd=_0x1d9f1c;this[_0x2c2cfd(0x21b)]['needsReflect']()&&(this['_character']['setReflect'](![]),this[_0x2c2cfd(0x21b)][_0x2c2cfd(0x214)](!![]),this['startReflect']());},Sprite_Character[_0x1d9f1c(0x27e)]['startReflect']=function(){const _0x399e0b=this['createReflectSprite']();this['_reflectSpriteSet']['push'](_0x399e0b);},Sprite_Character[_0x1d9f1c(0x27e)][_0x1d9f1c(0x1fa)]=function(){const _0x4effe9=_0x1d9f1c,_0x33a9af=$gameMap[_0x4effe9(0x226)](),_0x551c12=new Sprite_Reflect();return _0x551c12['x']=-_0x33a9af,_0x551c12['y']=-_0x33a9af,_0x551c12[_0x4effe9(0x22d)](this,this[_0x4effe9(0x21b)]),this[_0x4effe9(0x1db)]['addChild'](_0x551c12),_0x551c12;});function Sprite_Mirror(){const _0x98b056=_0x1d9f1c;this[_0x98b056(0x26c)][_0x98b056(0x202)](this,arguments);}function _0x5351(){const _0xe592fd=['preventReflect','checkReflectTiles','currentMirrorInfo','setupReflect','updateTileFrame','_inFrontOfMirror','370397dZfMiZ','_blur','_topMirrorY','Floor\x20Mirror\x20X\x20Offset','tileId','checkMirrorEventTags','checkMirrorTiles','_isPickable','visible','needsReflect','Scene_Map_terminate','38ExOJaU','setupMirror','canMirror','_cannotMirror','_currentMirrorInfo','65kGilTl','create','code','tag','_opacity','screenY','bottomMirrorY','Floor\x20Mirror\x20Region\x20Id','_scale','isPickupEvent','parameters','addMirrorBackground','_eventId','pushDist','_tileId','call','_tilemap','_tilesetId','unshift','_fixMirrorImage','direction','initialize','2328360dHAcZk','createMirrorBackGroundSprites','12MGQAnQ','characterName','isFrontOfMirror','getMapBackGround','rotation','_characterIndex','_needsMirror','mirror\x20background','updateCharacterMove','_Sprite_Character_update','push','Wall\x20Mirror\x20Y\x20Offset','updateMirrorSprites','_characterName','isPlaying','prototype','Wall\x20Mirror\x20Terrain\x20Tag','isPlayer','topMirrorY','setCurrentMirrorInfo','_originalScaleX','page','isNearReflectTile','pickupEvent','_hasPickup','_Spriteset_Map_update','width','44589FiVYIx','height','tileset','_filter','characterIndex','canReflect','createLowerLayer','isPickup','tileHeight','_mirrorInfo','_angle','addChild','Floor\x20Mirror\x20Angle','inFrontOfMirror','update','_Spriteset_Map_createLowerLayer','mirror','checkMapMirrorInfos','_mirrorMapId','_pulse','Wall\x20Mirror\x20Region\x20Id','reflect','_offsetX','checkReflectY','_Game_Character_update','setInfo','_mirrorId','_wallMirrorOffset','updateCharacterFrame','_spriteChar','_memberIndex','parent','followers','TSR_Mirror','updateScale','_displayY','indexOf','pullDist','setFrame','events','_reflectId','checkCannotMirrorTag','_patternW','setReflect','_reflectTag','_bottomMirrorY','toString','isMirrorColumn','_Game_Event_setupPage','screenX','checkFixMirrorTag','needsMirror','_floorMirrorOffset','regionId','updateMirrorBackground','_mirrorTag','list','isTransparent','shift','length','roundXWithDirection','distBottom','createReflectSprite','opacity','_mirrorBGArray','scale','_grow','_offsetY','_frameCount','initMembers','apply','BlurFilter','Floor\x20Mirror\x20Terrain\x20Tag','checkMirrorY','note','92776mxfsDL','match','Parameters','_originalScaleY','constructor','isBigCharacter','setPreventMirror','Wall\x20Mirror\x20Id\x20Type','terminate','tilesetId','_reflectInfo','_displayX','_needsReflect','setPreventReflect','loadCharacter','setMirror','isVisible','loadTileset','isNearMirrorTile','pattern','_character','toLowerCase','updateContainerZ','split','tilesetBitmap','_floorOffsetY','resetMirrorBottomTop','_reflectMapId','_wallOffsetX','anchor','Floor\x20Mirror\x20Y\x20Offset','tileWidth','blur','startMirror','tilesetNames','loadParallax','Floor\x20Mirror\x20Blur','_Sprite_Character_initMembers','setup','_patternH','1277213BUZCxi','terrainTag','_mirrorSpriteSet','_reflectSpriteSet','bitmap','floor','hasBitmap','Floor\x20Mirror\x20Pulse','slice','isFrontMirrorTile','3134510vPmKQd','TSR_MoveEvent','setData','createMirrorSprite','setupPage','_wallOffsetY','removeChild','2749284nqSalB'];_0x5351=function(){return _0xe592fd;};return _0x5351();}Sprite_Mirror[_0x1d9f1c(0x27e)]=Object['create'](Sprite[_0x1d9f1c(0x27e)]),Sprite_Mirror[_0x1d9f1c(0x27e)][_0x1d9f1c(0x20b)]=Sprite_Mirror,Sprite_Mirror['prototype'][_0x1d9f1c(0x26c)]=function(){const _0x53676f=_0x1d9f1c;Sprite['prototype'][_0x53676f(0x26c)]['call'](this),this[_0x53676f(0x201)]();},Sprite_Mirror[_0x1d9f1c(0x27e)][_0x1d9f1c(0x201)]=function(){const _0x47ed40=_0x1d9f1c;this['anchor']['x']=0.5,this['anchor']['y']=0x0,this['z']=-0.5,this[_0x47ed40(0x2a0)]=TSR[_0x47ed40(0x29a)][_0x47ed40(0x223)],this[_0x47ed40(0x1ff)]=TSR['mirror'][_0x47ed40(0x23e)];},Sprite_Mirror[_0x1d9f1c(0x27e)][_0x1d9f1c(0x22d)]=function(_0xf9fa37,_0x12794a){const _0xed5e79=_0x1d9f1c,_0x1daf16=_0x12794a[_0xed5e79(0x1d7)];_0x1daf16&&(this[_0xed5e79(0x2a0)]=_0x1daf16[0x0],this[_0xed5e79(0x1ff)]=_0x1daf16[0x1]);this[_0xed5e79(0x1d9)]=_0xf9fa37,this[_0xed5e79(0x21b)]=_0x12794a,this[_0xed5e79(0x27c)]=_0x12794a[_0xed5e79(0x27c)],this[_0xed5e79(0x274)]=_0x12794a[_0xed5e79(0x274)];_0x12794a['_scale']&&(this['scale']['x']=_0x12794a[_0xed5e79(0x25f)],this[_0xed5e79(0x1fd)]['y']=_0x12794a[_0xed5e79(0x25f)],this[_0xed5e79(0x2a0)]*=_0x12794a[_0xed5e79(0x25f)],this['_offsetY']*=_0x12794a[_0xed5e79(0x25f)]);const _0x409a3c=ImageManager[_0xed5e79(0x20c)](this[_0xed5e79(0x27c)]);this['_patternW']=_0x409a3c?0x3:0xc,this[_0xed5e79(0x22e)]=_0x409a3c?0x4:0x8,_0x12794a[_0xed5e79(0x265)]>0x0?(this['_tileId']=_0x12794a['_tileId'],this['bitmap']=this[_0xed5e79(0x21f)](this[_0xed5e79(0x265)]),this[_0xed5e79(0x245)]()):(this[_0xed5e79(0x233)]=ImageManager[_0xed5e79(0x215)](this[_0xed5e79(0x27c)]),this[_0xed5e79(0x1d8)]()),this[_0xed5e79(0x277)]();},Sprite_Mirror[_0x1d9f1c(0x27e)]['distBottom']=function(){const _0x4e0967=_0x1d9f1c,_0x510067=this['_character']['distToBottomMirror']()*$gameMap[_0x4e0967(0x226)]();return _0x510067;},Sprite_Mirror[_0x1d9f1c(0x27e)][_0x1d9f1c(0x298)]=function(){const _0x4f36c4=_0x1d9f1c;Sprite[_0x4f36c4(0x27e)][_0x4f36c4(0x298)][_0x4f36c4(0x266)](this),this[_0x4f36c4(0x21b)][_0x4f36c4(0x24b)]()>0x0?this['updateTileFrame']():this[_0x4f36c4(0x1d8)](),this[_0x4f36c4(0x277)](),this[_0x4f36c4(0x24f)]=!this[_0x4f36c4(0x21b)][_0x4f36c4(0x1f5)]()&&this[_0x4f36c4(0x235)]();},Sprite_Mirror[_0x1d9f1c(0x27e)]['tilesetBitmap']=function(_0x4b0542){const _0x39b81c=_0x1d9f1c,_0x14e6ce=$gameMap[_0x39b81c(0x28c)](),_0x41e6bc=0x5+Math['floor'](_0x4b0542/0x100);return ImageManager['loadTileset'](_0x14e6ce['tilesetNames'][_0x41e6bc]);},Sprite_Mirror[_0x1d9f1c(0x27e)][_0x1d9f1c(0x245)]=function(){const _0x4927e2=_0x1d9f1c,_0x2ae7d1=this[_0x4927e2(0x265)],_0x2f9d30=$gameMap[_0x4927e2(0x226)](),_0x51b78a=$gameMap['tileHeight'](),_0x271433=(Math[_0x4927e2(0x234)](_0x2ae7d1/0x80)%0x2*0x8+_0x2ae7d1%0x8)*_0x2f9d30,_0x2dd080=Math[_0x4927e2(0x234)](_0x2ae7d1%0x100/0x8)%0x10*_0x51b78a;this[_0x4927e2(0x1e2)](_0x271433,_0x2dd080,_0x2f9d30,_0x51b78a);},Sprite_Mirror[_0x1d9f1c(0x27e)]['updateCharacterFrame']=function(){const _0x3cfa0f=_0x1d9f1c,_0x1dbfd3=this[_0x3cfa0f(0x21b)][_0x3cfa0f(0x274)];let _0xf96347=this[_0x3cfa0f(0x21b)][_0x3cfa0f(0x26b)]();!this[_0x3cfa0f(0x21b)][_0x3cfa0f(0x24e)]&&!this[_0x3cfa0f(0x21b)][_0x3cfa0f(0x1ee)]()&&(_0xf96347=this[_0x3cfa0f(0x21b)][_0x3cfa0f(0x26b)]()===0x2||this[_0x3cfa0f(0x21b)]['direction']()===0x8?0xa-this[_0x3cfa0f(0x21b)][_0x3cfa0f(0x26b)]():this['_character'][_0x3cfa0f(0x26b)]());const _0x3a2def=this[_0x3cfa0f(0x233)]['width']/this[_0x3cfa0f(0x1e6)],_0x357eb6=this[_0x3cfa0f(0x233)]['height']/this['_patternH'],_0x4fce0c=(_0x1dbfd3%0x4*0x3+this[_0x3cfa0f(0x21b)][_0x3cfa0f(0x21a)]())*_0x3a2def,_0x4c6131=(Math[_0x3cfa0f(0x234)](_0x1dbfd3/0x4)*0x4+(_0xf96347-0x2)/0x2)*_0x357eb6;this[_0x3cfa0f(0x1e2)](_0x4fce0c,_0x4c6131,_0x3a2def,_0x357eb6);},Sprite_Mirror[_0x1d9f1c(0x27e)][_0x1d9f1c(0x277)]=function(){const _0x5443c7=_0x1d9f1c,_0x14e4af=this['_offsetY']-this[_0x5443c7(0x1f9)]()*0x2;if(Imported[_0x5443c7(0x23a)]){let _0x461e1d=0x2*(this[_0x5443c7(0x1d9)]['y']-this[_0x5443c7(0x21b)][_0x5443c7(0x25c)]());if(this['_character'][_0x5443c7(0x264)]()||this[_0x5443c7(0x21b)][_0x5443c7(0x1e1)]()||this[_0x5443c7(0x21b)]['backDist']())this['x']=this[_0x5443c7(0x1d9)]['x']+this[_0x5443c7(0x2a0)],this['y']=this[_0x5443c7(0x1d9)]['y']-_0x461e1d+_0x14e4af;else{const _0x21c8df=$gamePlayer[_0x5443c7(0x26b)](),_0x196e25=this[_0x5443c7(0x21b)][_0x5443c7(0x291)](),_0x41fb63=_0x196e25?_0x21c8df===0x4||_0x21c8df===0x6?0xc:0x7:0x0;this['x']=this[_0x5443c7(0x21b)]['screenX']()+this[_0x5443c7(0x2a0)],this['y']=this[_0x5443c7(0x21b)][_0x5443c7(0x25c)]()+_0x14e4af-_0x41fb63*0x2;}}else this['x']=this[_0x5443c7(0x21b)][_0x5443c7(0x1ed)]()+this[_0x5443c7(0x2a0)],this['y']=this[_0x5443c7(0x21b)][_0x5443c7(0x25c)]()+_0x14e4af;},Sprite_Mirror[_0x1d9f1c(0x27e)]['hasBitmap']=function(){const _0x963507=_0x1d9f1c;return this[_0x963507(0x27c)]===this[_0x963507(0x21b)][_0x963507(0x270)]()&&this[_0x963507(0x274)]===this[_0x963507(0x21b)][_0x963507(0x28e)]()||(this[_0x963507(0x268)]===$gameMap['tilesetId']()||this['_tileId']===this[_0x963507(0x21b)][_0x963507(0x24b)]());},Sprite_Mirror[_0x1d9f1c(0x27e)][_0x1d9f1c(0x27d)]=function(){const _0x2f59ab=_0x1d9f1c;return this[_0x2f59ab(0x21b)][_0x2f59ab(0x24d)](this[_0x2f59ab(0x21b)]['x'],this[_0x2f59ab(0x21b)]['y'])&&this[_0x2f59ab(0x235)]();};function Sprite_Reflect(){this['initialize']['apply'](this,arguments);}Sprite_Reflect[_0x1d9f1c(0x27e)]=Object[_0x1d9f1c(0x258)](Sprite[_0x1d9f1c(0x27e)]),Sprite_Reflect['prototype'][_0x1d9f1c(0x20b)]=Sprite_Reflect,Sprite_Reflect['prototype'][_0x1d9f1c(0x26c)]=function(){const _0x3f6a11=_0x1d9f1c;Sprite[_0x3f6a11(0x27e)][_0x3f6a11(0x26c)][_0x3f6a11(0x266)](this),this[_0x3f6a11(0x201)]();},Sprite_Reflect['prototype'][_0x1d9f1c(0x201)]=function(){const _0x36310f=_0x1d9f1c;this[_0x36310f(0x224)]['x']=0.5,this[_0x36310f(0x224)]['y']=0.5,this['z']=-0.6;},Sprite_Reflect[_0x1d9f1c(0x27e)][_0x1d9f1c(0x23b)]=function(_0x2eea37){const _0x1ec698=_0x1d9f1c;_0x2eea37?(this[_0x1ec698(0x2a0)]=parseInt(_0x2eea37[0x1]),this[_0x1ec698(0x1ff)]=parseInt(_0x2eea37[0x2]),this[_0x1ec698(0x294)]=parseFloat(_0x2eea37[0x3]),this['_blur']=parseFloat(_0x2eea37[0x4]),this[_0x1ec698(0x1fb)]=parseInt(_0x2eea37[0x5]),this[_0x1ec698(0x29d)]=_0x2eea37[0x6]):(this[_0x1ec698(0x2a0)]=TSR[_0x1ec698(0x29a)]['_floorOffsetX'],this['_offsetY']=TSR[_0x1ec698(0x29a)][_0x1ec698(0x220)],this[_0x1ec698(0x294)]=TSR[_0x1ec698(0x29a)][_0x1ec698(0x294)],this[_0x1ec698(0x248)]=TSR[_0x1ec698(0x29a)][_0x1ec698(0x248)],this['opacity']=TSR[_0x1ec698(0x29a)][_0x1ec698(0x25b)],this[_0x1ec698(0x29d)]=TSR['mirror'][_0x1ec698(0x29d)]);},Sprite_Reflect[_0x1d9f1c(0x27e)][_0x1d9f1c(0x22d)]=function(_0x34bdd8,_0x369f07){const _0x4ed826=_0x1d9f1c;this[_0x4ed826(0x1d9)]=_0x34bdd8;const _0x46debd=_0x369f07[_0x4ed826(0x1f0)];this['_mirrorInfo']=_0x369f07[_0x4ed826(0x243)](),this[_0x4ed826(0x23b)](this[_0x4ed826(0x293)]),this[_0x4ed826(0x273)]=this[_0x4ed826(0x294)]*0x5a*Math['PI']/0xb4,this['_filter']=new PIXI['filters'][(_0x4ed826(0x203))](),this[_0x4ed826(0x28d)][_0x4ed826(0x227)]=this[_0x4ed826(0x248)],this['filters']=[this[_0x4ed826(0x28d)]];_0x46debd&&(this[_0x4ed826(0x2a0)]=_0x46debd[0x0],this['_offsetY']=_0x46debd[0x1]);_0x369f07[_0x4ed826(0x25f)]&&(this[_0x4ed826(0x1fd)]['x']=_0x369f07['_scale'],this[_0x4ed826(0x1fd)]['y']=_0x369f07[_0x4ed826(0x25f)],this[_0x4ed826(0x2a0)]*=_0x369f07[_0x4ed826(0x25f)],this[_0x4ed826(0x1ff)]*=_0x369f07[_0x4ed826(0x25f)]);this[_0x4ed826(0x283)]=this[_0x4ed826(0x1fd)]['x'],this[_0x4ed826(0x20a)]=this[_0x4ed826(0x1fd)]['y'],this[_0x4ed826(0x21b)]=_0x369f07,this[_0x4ed826(0x27c)]=_0x369f07[_0x4ed826(0x27c)],this[_0x4ed826(0x274)]=_0x369f07[_0x4ed826(0x274)];const _0xd83b1f=ImageManager[_0x4ed826(0x20c)](this[_0x4ed826(0x27c)]);this[_0x4ed826(0x1e6)]=_0xd83b1f?0x3:0xc,this[_0x4ed826(0x22e)]=_0xd83b1f?0x4:0x8,_0x369f07[_0x4ed826(0x265)]>0x0?(this['_tileId']=_0x369f07[_0x4ed826(0x265)],this[_0x4ed826(0x233)]=this['tilesetBitmap'](this[_0x4ed826(0x265)]),this[_0x4ed826(0x245)]()):(this[_0x4ed826(0x233)]=ImageManager[_0x4ed826(0x215)](this['_characterName']),this[_0x4ed826(0x1d8)]()),this['_frameCount']=0x0,this[_0x4ed826(0x277)]();},Sprite_Reflect[_0x1d9f1c(0x27e)][_0x1d9f1c(0x298)]=function(){const _0x23b1ec=_0x1d9f1c;Sprite[_0x23b1ec(0x27e)][_0x23b1ec(0x298)][_0x23b1ec(0x266)](this);this['_character'][_0x23b1ec(0x24b)]()>0x0?this[_0x23b1ec(0x245)]():this[_0x23b1ec(0x1d8)]();this[_0x23b1ec(0x277)]();if(this[_0x23b1ec(0x29d)])this[_0x23b1ec(0x1de)]();this[_0x23b1ec(0x24f)]=!this[_0x23b1ec(0x21b)]['isTransparent']()&&this[_0x23b1ec(0x235)]();},Sprite_Reflect['prototype'][_0x1d9f1c(0x21f)]=function(_0x42ce12){const _0x5a4be0=_0x1d9f1c,_0xa33b32=$gameMap['tileset'](),_0x32a890=0x5+Math[_0x5a4be0(0x234)](_0x42ce12/0x100);return ImageManager[_0x5a4be0(0x218)](_0xa33b32[_0x5a4be0(0x229)][_0x32a890]);},Sprite_Reflect[_0x1d9f1c(0x27e)]['updateTileFrame']=function(){const _0x3b86da=_0x1d9f1c,_0x23be98=this[_0x3b86da(0x265)],_0x5abb9e=$gameMap[_0x3b86da(0x226)](),_0x507fbf=$gameMap[_0x3b86da(0x292)](),_0x15f9d8=(Math[_0x3b86da(0x234)](_0x23be98/0x80)%0x2*0x8+_0x23be98%0x8)*_0x5abb9e,_0x345a42=Math[_0x3b86da(0x234)](_0x23be98%0x100/0x8)%0x10*_0x507fbf;this['setFrame'](_0x15f9d8,_0x345a42,_0x5abb9e,_0x507fbf);},Sprite_Reflect['prototype'][_0x1d9f1c(0x1d8)]=function(){const _0x4fdc35=_0x1d9f1c,_0x337f6c=this[_0x4fdc35(0x21b)]['_characterIndex'];let _0x3012cc=this[_0x4fdc35(0x21b)][_0x4fdc35(0x26b)]();!this[_0x4fdc35(0x21b)][_0x4fdc35(0x24e)]&&(this[_0x4fdc35(0x294)]<=0x1&&this['_angle']>=-0x1?_0x3012cc=_0x3012cc===0x2||_0x3012cc===0x8?0xa-_0x3012cc:_0x3012cc:_0x3012cc=_0x3012cc===0x4||_0x3012cc===0x6?0xa-_0x3012cc:_0x3012cc);const _0x1b4da5=this[_0x4fdc35(0x233)]['width']/this[_0x4fdc35(0x1e6)],_0x41ca91=this[_0x4fdc35(0x233)][_0x4fdc35(0x28b)]/this['_patternH'],_0x44a46a=(_0x337f6c%0x4*0x3+this[_0x4fdc35(0x21b)][_0x4fdc35(0x21a)]())*_0x1b4da5,_0x8203b0=(Math[_0x4fdc35(0x234)](_0x337f6c/0x4)*0x4+(_0x3012cc-0x2)/0x2)*_0x41ca91;this[_0x4fdc35(0x1e2)](_0x44a46a,_0x8203b0,_0x1b4da5,_0x41ca91);},Sprite_Reflect[_0x1d9f1c(0x27e)][_0x1d9f1c(0x277)]=function(){const _0x11c3d0=_0x1d9f1c;if(Imported['TSR_MoveEvent']){this['updateContainerZ'](this['_character'][_0x11c3d0(0x263)]);if(this[_0x11c3d0(0x21b)][_0x11c3d0(0x264)]()||this[_0x11c3d0(0x21b)][_0x11c3d0(0x1e1)]()||this[_0x11c3d0(0x21b)]['backDist']()){this['x']=this['_spriteChar']['x']+this[_0x11c3d0(0x2a0)],this['y']=this[_0x11c3d0(0x1d9)]['y']+this[_0x11c3d0(0x1ff)];;}else this['x']=this['_character'][_0x11c3d0(0x1ed)]()+this['_offsetX'],this['y']=this[_0x11c3d0(0x21b)]['screenY']()+this[_0x11c3d0(0x1ff)];}else this['x']=this['_character'][_0x11c3d0(0x1ed)]()+this[_0x11c3d0(0x2a0)],this['y']=this[_0x11c3d0(0x21b)]['screenY']()+this['_offsetY'];},Sprite_Reflect[_0x1d9f1c(0x27e)][_0x1d9f1c(0x21d)]=function(_0x1743d3){const _0x3ba3e4=_0x1d9f1c,_0x5bebab=$gamePlayer;if(_0x5bebab['isHolding'](_0x1743d3)){let _0x1a73e6;this[_0x3ba3e4(0x294)]<=0x1&&this[_0x3ba3e4(0x294)]>=-0x1?_0x1a73e6=0x8:_0x1a73e6=0x2,_0x5bebab['direction']()===_0x1a73e6?this['z']=-0.5:this['z']=-0.7;}},Sprite_Reflect['prototype']['updateScale']=function(){const _0x2bafee=_0x1d9f1c;this[_0x2bafee(0x200)]++,!this[_0x2bafee(0x1fe)]?this[_0x2bafee(0x1fd)]['x']<this[_0x2bafee(0x283)]*1.05?(this['scale']['x']+=0.005,this[_0x2bafee(0x1fd)]['y']-=0.002):this[_0x2bafee(0x1fe)]=!![]:this[_0x2bafee(0x1fd)]['x']>this[_0x2bafee(0x283)]*0.95?(this['scale']['x']-=0.005,this[_0x2bafee(0x1fd)]['y']+=0.002):this[_0x2bafee(0x1fe)]=![];},Sprite_Reflect[_0x1d9f1c(0x27e)][_0x1d9f1c(0x235)]=function(){const _0x25ea5e=_0x1d9f1c;return this[_0x25ea5e(0x27c)]===this[_0x25ea5e(0x21b)][_0x25ea5e(0x270)]()&&this[_0x25ea5e(0x274)]===this['_character']['characterIndex']()||(this[_0x25ea5e(0x268)]===$gameMap[_0x25ea5e(0x210)]()||this[_0x25ea5e(0x265)]===this[_0x25ea5e(0x21b)]['tileId']());},Sprite_Reflect[_0x1d9f1c(0x27e)][_0x1d9f1c(0x27d)]=function(){const _0x2491b6=_0x1d9f1c;return this['_character'][_0x2491b6(0x242)](this[_0x2491b6(0x21b)]['x'],this[_0x2491b6(0x21b)]['y'])&&this[_0x2491b6(0x293)][0x0]===this[_0x2491b6(0x21b)][_0x2491b6(0x243)]()[0x0]&&this[_0x2491b6(0x235)]();};
})();

//==== END ======================================================================
//===============================================================================
