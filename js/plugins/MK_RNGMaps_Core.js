/*:
 * @target MZ
 * @plugindesc [Tier 1] [Version 2.0] (please read the License Part 2)
 * @author Aerosys
 * @url https://aerosys.blog
 * @
 * 
 * @help
 * This is the Base Plugin for MK_RNGMaps.
 * 
 * LICENSE & UNLOCKING FULL VERSION
 * 
 * - RNGMaps provides a free trial. The free trial offers all Map Generation
 *   Algorithms but with limited functionality (e.g. no seedable RNG).
 * - There are no "2 different" plugins for free and full version, instead
 *   the plugins check if MK_RNGMaps_Addons is included in the Game on
 *   start up.
 *   If so, the plugins run in "full version" mode, otherwise in "trial mode".
 * - The trial version only works in the maker's test play. When using it in an
 *   exported game, it will abort its launch.
 * 
 * 
 * UNLOCKING FULL VERSION
 * 
 * To unlock the Free Version, please copy-paste MK_RNGMaps_Addons into your
 * Game and enable it in the Plugin Manager.
 * 
 * 
 * RULES:
 * 1. You are not allowed to re-distribute my plugins
 * 2. One exception: Due to the nature of JavaScript, it's okay when you
 *    release your game.
 * 3. When several people work on the same project, it's not required to
 *    purchase a license for everyone.
 *    But that does not mean, that anyone gets a copy for free for their
 *    own needs.
 * 4. You are allowed to modify readable source code for your own needs, but
 *    you are not allowed to re-distribute your changes (e.g. as a plugin).
 * 5. You are not allowed to de-obfuscate obfuscated code.
 * @
 * 
 * 
 * =====================================================================================
 * PARAMS
 * =====================================================================================
 * 
 * @param regionIds
 * @text Region Ids
 * @type struct<RegionIds>
 * @default {"Exit (North)":"13","Spawn Location (North)":"14","Exit (West)":"8","Spawn Location (West)":"9","Exit (East)":"15","Spawn Location (East)":"16","Exit (South)":"5","Spawn Location (South)":"6","decorationStopperId":"61"}
 */

/*~struct~RegionIds:
 * 
 * @param North
 *
 * @param northernExit
 * @parent North
 * @text Exit
 * @type number
 * @default 13
 * 
 * @param northernMainExit
 * @parent North
 * @text Main Exit
 * @type number
 * @default 37
 * 
 * @param northernSpawnLocation
 * @parent North
 * @text Spawn Location
 * @type number
 * @default 14
 * 
 * @param West
 *
 * @param westernExit
 * @parent West
 * @text Exit
 * @type number
 * @default 8
 * 
 * @param westernMainExit
 * @parent West
 * @text Main Exit
 * @type number
 * @default 32
 * 
 * @param westernSpawnLocation
 * @parent West
 * @text Spawn Location
 * @type number
 * @default 9
 * 
 * @param East
 * 
 * @param easternExit
 * @parent East
 * @text Exit
 * @type number
 * @default 15
 * 
 * @param easternMainExit
 * @parent East
 * @text Main Exit
 * @type number
 * @default 39
 * 
 * @param easternSpawnLocation
 * @parent East
 * @text Spawn Location
 * @type number
 * @default 16
 * 
 * @param South
 * 
 * @param southernExit
 * @parent South
 * @text Exit
 * @type number
 * @default 5
 * 
 * @param southernMainExit
 * @parent South
 * @text Main Exit
 * @type number
 * @default 29
 * 
 * @param southernSpawnLocation
 * @parent South
 * @text Spawn Location
 * @type number
 * @default 6
 * 
 *
 * @param decorationStopperId
 * @text Decoration Stopper Id
 * @type number
 * @desc Region Id to determine the last object in your decoration map
 * @default 61
 * 
 */

'use strict';
//@obfuscate

var MK=MK||{};MK['alias']=MK['alias']||{};var Imported=Imported||{};Imported['MK_RNGMaps_Core']=!![];if(!Imported['MK_Core'])alert('Missing\x20Plugin:\x20MK_Core');var params=PluginManager['parameters']('MK_RNGMaps_Core');MK['EXIT_NORTH']=Number(JSON['parse'](params['regionIds'])['northernExit']),MK['MAIN_EXIT_NORTH']=Number(JSON['parse'](params['regionIds'])['northernMainExit']),MK['SPAWN_NORTH']=Number(JSON['parse'](params['regionIds'])['northernSpawnLocation']),MK['EXIT_WEST']=Number(JSON['parse'](params['regionIds'])['westernExit']),MK['MAIN_EXIT_WEST']=Number(JSON['parse'](params['regionIds'])['westernMainExit']),MK['SPAWN_WEST']=Number(JSON['parse'](params['regionIds'])['westernSpawnLocation']),MK['EXIT_EAST']=Number(JSON['parse'](params['regionIds'])['easternExit']),MK['MAIN_EXIT_EAST']=Number(JSON['parse'](params['regionIds'])['easternMainExit']),MK['SPAWN_EAST']=Number(JSON['parse'](params['regionIds'])['easternSpawnLocation']),MK['EXIT_SOUTH']=Number(JSON['parse'](params['regionIds'])['southernExit']),MK['MAIN_EXIT_SOUTH']=Number(JSON['parse'](params['regionIds'])['southernMainExit']),MK['SPAWN_SOUTH']=Number(JSON['parse'](params['regionIds'])['southernSpawnLocation']),MK['DECORATION_STOPPER_ID']=Number(JSON['parse'](params['regionIds'])['decorationStopperId']),MK['ACCESSIBLE_REGION_ID']=Number(JSON['parse'](params['regionIds'])['accessibleId']),(function(){function _0x306d26(){return Imported&&Imported['MK_RNGMaps_Addons']&&MK['selfSwitchContainer']&&MK['rng']['_seedableRandomInteger']&&MK['generateSeed'];}function _0x480c1f(){return!Utils['isNwjs']()&&window['location']['hostname']=='play.aerosys.blog';}function _0x239894(){return Utils['isNwjs']()&&(Utils['isOptionValid']('test')||Utils['isOptionValid']('btest')||Utils['isOptionValid']('etest'));}const _0x1918f6=Scene_Boot['prototype']['start'];Scene_Boot['prototype']['start']=function(){_0x1918f6['call'](this),!_0x306d26()&&!_0x480c1f()&&(console['warn']('Using\x20free\x20trial\x20version\x20of\x20RNGMaps\x20-\x20Game\x20will\x20not\x20launch\x20when\x20exported.'),console['warn']('If\x20you\x20purchased\x20the\x20Full\x20Version,\x20please\x20add\x20MK_RNGMaps_Addons.js\x20to\x20unlock\x20this\x20Plugin.')),!_0x306d26()&&!_0x239894()&&!_0x480c1f()&&(alert('RNGMaps\x20(Free\x20Version)\x20only\x20usable\x20in\x20PLAYTEST\x0a\x0a'+'If\x20you\x20purchased\x20the\x20Full\x20Version,\x20please\x20add\x20MK_RNGMaps_Addons.js\x20to\x20unlock\x20this\x20Plugin.'),SceneManager['exit']()),_0x306d26()&&Imported['Drag_SandboxMap']&&!Drag['SandboxMap']['load']&&(alert('RNGMaps\x20(Full\x20Version)\x20and\x20Drag\x20Sandbox\x20(Demo\x20Version)\x20are\x20not\x20compatible!'),SceneManager['exit']());};}());class MK_PRNG{['randomInteger'](_0x32a20e,_0x459518){MK['requireNonNull'](_0x32a20e,'MK.rng.randomInteger','min'),MK['requireNonNull'](_0x459518,'MK.rng.randomInteger','max');if(_0x459518<_0x32a20e)return 0x0;return _0x32a20e==_0x459518?_0x32a20e:this['_randomInteger'](_0x32a20e,_0x459518);}['_randomInteger'](_0x1cfc38,_0x3cc412){return this['_mathRandomMinMax'](_0x1cfc38,_0x3cc412);}['_mathRandomMinMax'](_0x19d9df,_0x502ca0){return Math['floor'](Math['random']()*(_0x502ca0-_0x19d9df+0x1))+_0x19d9df;}['threshold'](_0x4586e9){return MK['requireElseThrow'](0x0<=_0x4586e9&&_0x4586e9<=0x1,'Invalid\x20Argument:\x20'+_0x4586e9),_0x4586e9==0x1||_0x4586e9*0x64>=this['randomInteger'](0x1,0x64);}['pickRandom'](_0x32f695){return MK['requireNonEmpty'](_0x32f695),_0x32f695['length']==0x1?_0x32f695[0x0]:_0x32f695[MK['rng']['randomInteger'](0x0,_0x32f695['length']-0x1)];}['setSeed'](){MK['onUsePremiumFunctionAlert']('setSeed');}['noSeedableRNG'](){MK['onUsePremiumFunctionAlert']('noSeedableRNG');}}MK['rng']=new MK_PRNG(),MK['euclidianDistance']=function(_0x4f29a9,_0x5c2986){return Math['sqrt'](Math['abs'](_0x5c2986['x']-_0x4f29a9['x'])**0x2+Math['abs'](_0x5c2986['y']-_0x4f29a9['y'])**0x2);},MK['manhattanDistance']=function(_0x5576f8,_0x1835d6){return Math['abs'](_0x1835d6['x']-_0x5576f8['x'])+Math['abs'](_0x1835d6['y']-_0x5576f8['y']);},MK['kruskalMST']=function(_0x177a12,_0x189f38=MK['euclidianDistance']){if(_0x177a12['length']==0x1)return[];const _0x531234=[],_0x4a26a3=[],_0x4bbe34=[];for(let _0x361640=0x0;_0x361640<_0x177a12['length'];_0x361640++){for(let _0x3752a4=0x0;_0x3752a4<_0x177a12['length'];_0x3752a4++){if(_0x361640==_0x3752a4)continue;_0x531234['push']({'start':_0x177a12[_0x361640],'dest':_0x177a12[_0x3752a4],'weight':_0x189f38['call'](this,_0x177a12[_0x361640],_0x177a12[_0x3752a4])});}}_0x531234['sort']((_0x414360,_0x2b494b)=>_0x414360['weight']-_0x2b494b['weight']);function _0x28edc7(_0x5dc091){return _0x4bbe34['findIndex'](_0x2ebef3=>_0x2ebef3['contains'](_0x5dc091['start'])&&_0x2ebef3['contains'](_0x5dc091['dest']))!=-0x1;}function _0x4e2987(_0x1c2d83){for(let _0xb74fcb=0x0;_0xb74fcb<_0x4bbe34['length'];_0xb74fcb++){let _0x54891=_0x4bbe34[_0xb74fcb];if(_0x54891['contains'](_0x1c2d83['start'])){_0x54891['push'](_0x1c2d83['dest']);for(let _0x3e644a=0x0;_0x3e644a<_0x4bbe34['length'];_0x3e644a++){if(_0xb74fcb==_0x3e644a)continue;let _0x3b6427=_0x4bbe34[_0x3e644a];if(_0x3b6427['contains'](_0x1c2d83['dest'])){_0x3b6427['forEach'](_0x4d2f20=>_0x54891['push'](_0x4d2f20)),_0x4bbe34['splice'](_0x3e644a,0x1);return;}}return;}else{if(_0x54891['contains'](_0x1c2d83['dest'])){_0x54891['push'](_0x1c2d83['start']);for(let _0x4baf41=0x0;_0x4baf41<_0x4bbe34['length'];_0x4baf41++){if(_0xb74fcb==_0x4baf41)continue;let _0x1ede35=_0x4bbe34[_0x4baf41];if(_0x1ede35['contains'](_0x1c2d83['start'])){_0x1ede35['forEach'](_0x29ae78=>_0x54891['push'](_0x29ae78)),_0x4bbe34['splice'](_0x4baf41,0x1);return;}}return;}}}_0x4bbe34['push']([_0x1c2d83['start'],_0x1c2d83['dest']]);}for(let _0xe37f70=0x0;_0xe37f70<_0x531234['length'];_0xe37f70++){const _0x43400d=_0x531234[_0xe37f70];!_0x28edc7(_0x43400d)&&(_0x4a26a3['push'](_0x43400d),_0x4e2987(_0x43400d));if(_0x4a26a3['length']==_0x177a12['length']-0x1)break;}return _0x4a26a3;},MK['findAllByDirection']=function(_0x5d4549,_0x53762b,_0x2cfbf0,_0x564bc2,_0x200e08,_0x10d949,_0x58f6e8=0x5,_0x30f6a2=0x5){let _0x4f4465=[],_0x2b7d71,_0x156cd8,_0x3f1576,_0xa71af9;for(let _0x5c11bb=0x1;_0x4f4465['length']==0x0;_0x5c11bb++){_0x200e08=='top'&&(_0x2b7d71=_0x5d4549,_0x156cd8=_0x53762b,_0x3f1576=(_0x5c11bb-0x1)*_0x30f6a2+_0x2cfbf0,_0xa71af9=_0x5c11bb*_0x30f6a2+_0x2cfbf0);_0x200e08=='left'&&(_0x2b7d71=(_0x5c11bb-0x1)*_0x58f6e8+_0x5d4549,_0x156cd8=_0x5c11bb*_0x58f6e8+_0x5d4549,_0x3f1576=_0x2cfbf0,_0xa71af9=_0x564bc2);_0x200e08=='right'&&(_0x2b7d71=_0x53762b-_0x5c11bb*_0x58f6e8,_0x156cd8=_0x53762b-(_0x5c11bb-0x1)*_0x58f6e8,_0x3f1576=_0x2cfbf0,_0xa71af9=_0x564bc2);_0x200e08=='bottom'&&(_0x2b7d71=_0x5d4549,_0x156cd8=_0x53762b,_0x3f1576=_0x564bc2-_0x5c11bb*_0x30f6a2,_0xa71af9=_0x564bc2-(_0x5c11bb-0x1)*_0x30f6a2);_0x200e08=='any'&&(_0x2b7d71=_0x5d4549,_0x156cd8=_0x53762b,_0x3f1576=_0x2cfbf0,_0xa71af9=_0x564bc2);if(_0x2b7d71<_0x5d4549||_0x156cd8>_0x53762b||_0x3f1576<_0x2cfbf0||_0xa71af9>_0x564bc2)break;for(let _0x2482af=_0x2b7d71;_0x2482af<_0x156cd8;_0x2482af++){for(let _0x12a3e1=_0x3f1576;_0x12a3e1<_0xa71af9;_0x12a3e1++){_0x10d949['call'](this,_0x2482af,_0x12a3e1)&&_0x4f4465['push']({'x':_0x2482af,'y':_0x12a3e1});}}if(_0x200e08=='any')break;}return _0x4f4465;},MK['mazeAlgorithms']={},MK['mazeAlgorithms']['prims']=function(_0x58f54f,_0x41d1bf){MK['requireNonNull'](_0x58f54f,'prims','w'),MK['requireNonNull'](_0x41d1bf,'prims','h');const _0x3d4060=MK['createMatrix'](_0x58f54f,_0x41d1bf),_0x4fbcc6=[];for(let _0x4dad78=0x0;_0x4dad78<_0x58f54f;_0x4dad78++){for(let _0x4dfdae=0x0;_0x4dfdae<_0x41d1bf;_0x4dfdae++){_0x4fbcc6['push']({'x':_0x4dad78,'y':_0x4dfdae});}}_0x3d4060[0x1][0x0]=_0x3d4060[0x1][0x0]|0x4,_0x3d4060[0x1][0x1]=_0x3d4060[0x1][0x1]|0x1;let _0x131e23=_0x58f54f*_0x41d1bf;while(_0x131e23>0x0){_0x131e23-=0x1;let _0x436f2f=[];for(let _0x335ceb=0x0;_0x335ceb<_0x4fbcc6['length'];_0x335ceb++){let _0x28dceb=_0x4fbcc6[_0x335ceb];if(_0x3d4060[_0x28dceb['x']][_0x28dceb['y']]==0x0&&_0x28dceb['x']!=0x0&&_0x3d4060[_0x28dceb['x']-0x1][_0x28dceb['y']]!=0x0)_0x436f2f['push'](_0x28dceb);if(_0x3d4060[_0x28dceb['x']][_0x28dceb['y']]==0x0&&_0x28dceb['x']<_0x58f54f-0x1&&_0x3d4060[_0x28dceb['x']+0x1][_0x28dceb['y']]!=0x0)_0x436f2f['push'](_0x28dceb);if(_0x3d4060[_0x28dceb['x']][_0x28dceb['y']]==0x0&&_0x28dceb['y']!=0x0&&_0x3d4060[_0x28dceb['x']][_0x28dceb['y']-0x1]!=0x0)_0x436f2f['push'](_0x28dceb);if(_0x3d4060[_0x28dceb['x']][_0x28dceb['y']]==0x0&&_0x28dceb['y']<_0x41d1bf-0x1&&_0x3d4060[_0x28dceb['x']][_0x28dceb['y']+0x1]!=0x0)_0x436f2f['push'](_0x28dceb);}if(_0x436f2f['length']==0x0)break;let _0x40cb8d=MK['rng']['pickRandom'](_0x436f2f),_0x3f462e=[];if(_0x40cb8d['x']>0x0&&_0x3d4060[_0x40cb8d['x']-0x1][_0x40cb8d['y']]!=0x0)_0x3f462e['push']('left');if(_0x40cb8d['x']<_0x58f54f-0x1&&_0x3d4060[_0x40cb8d['x']+0x1][_0x40cb8d['y']]!=0x0)_0x3f462e['push']('right');if(_0x40cb8d['y']>0x0&&_0x3d4060[_0x40cb8d['x']][_0x40cb8d['y']-0x1]!=0x0)_0x3f462e['push']('up');if(_0x40cb8d['y']<_0x41d1bf-0x1&&_0x3d4060[_0x40cb8d['x']][_0x40cb8d['y']+0x1]!=0x0)_0x3f462e['push']('down');let _0x364d6e=MK['rng']['pickRandom'](_0x3f462e);_0x364d6e=='left'&&(_0x3d4060[_0x40cb8d['x']][_0x40cb8d['y']]=_0x3d4060[_0x40cb8d['x']][_0x40cb8d['y']]|0x8,_0x3d4060[_0x40cb8d['x']-0x1][_0x40cb8d['y']]=_0x3d4060[_0x40cb8d['x']-0x1][_0x40cb8d['y']]|0x2),_0x364d6e=='right'&&(_0x3d4060[_0x40cb8d['x']][_0x40cb8d['y']]=_0x3d4060[_0x40cb8d['x']][_0x40cb8d['y']]|0x2,_0x3d4060[_0x40cb8d['x']+0x1][_0x40cb8d['y']]=_0x3d4060[_0x40cb8d['x']+0x1][_0x40cb8d['y']]|0x8),_0x364d6e=='up'&&(_0x3d4060[_0x40cb8d['x']][_0x40cb8d['y']]=_0x3d4060[_0x40cb8d['x']][_0x40cb8d['y']]|0x1,_0x3d4060[_0x40cb8d['x']][_0x40cb8d['y']-0x1]=_0x3d4060[_0x40cb8d['x']][_0x40cb8d['y']-0x1]|0x4),_0x364d6e=='down'&&(_0x3d4060[_0x40cb8d['x']][_0x40cb8d['y']]=_0x3d4060[_0x40cb8d['x']][_0x40cb8d['y']]|0x4,_0x3d4060[_0x40cb8d['x']][_0x40cb8d['y']+0x1]=_0x3d4060[_0x40cb8d['x']][_0x40cb8d['y']+0x1]|0x1);}return _0x3d4060;},MK['mazeAlgorithms']['cutOffDeadEnds']=function(_0x3229d0,_0x2ee661=0x1){MK['requireNonNull'](_0x3229d0,'cutOffDeadEnds','map');for(let _0x172ded=0x0;_0x172ded<_0x2ee661;_0x172ded++){let _0x38f37e=[];for(let _0x2db559=0x0;_0x2db559<_0x3229d0['length'];_0x2db559++){for(let _0x46357c=0x0;_0x46357c<_0x3229d0[_0x2db559]['length'];_0x46357c++){if([0x1,0x2,0x4,0x8]['contains'](_0x3229d0[_0x2db559][_0x46357c]))_0x38f37e['push']({'x':_0x2db559,'y':_0x46357c});}}for(let _0x2666af of _0x38f37e){let _0x47839=_0x2666af['x'],_0x2e7ea1=_0x2666af['y'];_0x3229d0[_0x47839][_0x2e7ea1]==0x1&&(_0x3229d0[_0x47839][_0x2e7ea1]=0x0,_0x3229d0[_0x47839][_0x2e7ea1-0x1]=_0x3229d0[_0x47839][_0x2e7ea1-0x1]&0xb),_0x3229d0[_0x47839][_0x2e7ea1]==0x2&&(_0x3229d0[_0x47839][_0x2e7ea1]=0x0,_0x3229d0[_0x47839+0x1][_0x2e7ea1]=_0x3229d0[_0x47839+0x1][_0x2e7ea1]&0x7),_0x3229d0[_0x47839][_0x2e7ea1]==0x4&&(_0x3229d0[_0x47839][_0x2e7ea1]=0x0,_0x3229d0[_0x47839][_0x2e7ea1+0x1]=_0x3229d0[_0x47839][_0x2e7ea1+0x1]&0xe),_0x3229d0[_0x47839][_0x2e7ea1]==0x8&&(_0x3229d0[_0x47839][_0x2e7ea1]=0x0,_0x3229d0[_0x47839-0x1][_0x2e7ea1]=_0x3229d0[_0x47839-0x1][_0x2e7ea1]&0xd);}}},MK['mazeAlgorithms']['mergeDeadEnds']=function(_0x2bdc5a,_0x36b2e3=0.3){MK['requireNonNull'](_0x2bdc5a,'mergeDeadEnds','map');for(let _0x557720=0x0;_0x557720<_0x2bdc5a['length'];_0x557720++){for(let _0x28b194=0x0;_0x28b194<_0x2bdc5a[_0x557720]['length'];_0x28b194++){if([0x1,0x2,0x4,0x8]['contains'](_0x2bdc5a[_0x557720][_0x28b194])){if(!MK['rng']['threshold'](_0x36b2e3))continue;let _0xab1770=[];if(_0x2bdc5a[_0x557720][_0x28b194]!=0x1&&_0x28b194>0x0&&_0x2bdc5a[_0x557720][_0x28b194-0x1]!=0x0)_0xab1770['push']('up');if(_0x2bdc5a[_0x557720][_0x28b194]!=0x2&&_0x557720<_0x2bdc5a['length']-0x1&&_0x2bdc5a[_0x557720+0x1][_0x28b194]!=0x0)_0xab1770['push']('right');if(_0x2bdc5a[_0x557720][_0x28b194]!=0x4&&_0x28b194<_0x2bdc5a[_0x557720]['length']-0x1&&_0x2bdc5a[_0x557720][_0x28b194+0x1]!=0x0)_0xab1770['push']('down');if(_0x2bdc5a[_0x557720][_0x28b194]!=0x8&&_0x557720>0x0&&_0x2bdc5a[_0x557720-0x1][_0x28b194]!=0x0)_0xab1770['push']('left');if(_0xab1770['length']==0x0)continue;const _0x34455c=MK['rng']['pickRandom'](_0xab1770);_0x34455c=='up'&&(_0x2bdc5a[_0x557720][_0x28b194]=_0x2bdc5a[_0x557720][_0x28b194]|0x1,_0x2bdc5a[_0x557720][_0x28b194-0x1]=_0x2bdc5a[_0x557720][_0x28b194-0x1]|0x4),_0x34455c=='right'&&(_0x2bdc5a[_0x557720][_0x28b194]=_0x2bdc5a[_0x557720][_0x28b194]|0x2,_0x2bdc5a[_0x557720+0x1][_0x28b194]=_0x2bdc5a[_0x557720+0x1][_0x28b194]|0x8),_0x34455c=='down'&&(_0x2bdc5a[_0x557720][_0x28b194]=_0x2bdc5a[_0x557720][_0x28b194]|0x4,_0x2bdc5a[_0x557720][_0x28b194+0x1]=_0x2bdc5a[_0x557720][_0x28b194+0x1]|0x1),_0x34455c=='left'&&(_0x2bdc5a[_0x557720][_0x28b194]=_0x2bdc5a[_0x557720][_0x28b194]|0x8,_0x2bdc5a[_0x557720-0x1][_0x28b194]=_0x2bdc5a[_0x557720-0x1][_0x28b194]|0x2);}}}},MK['mazeAlgorithms']['randomWalk']=function(_0x5448a2,_0x4c8d93,_0x47e5cb='bottom',_0x35e2b9='top',_0x41ed07=!![],_0x1b1110=!![],_0x285fbd=![]){const _0x3515fc=['top','right','left','bottom'],_0x4004a0=['top','right','left','bottom','any'];MK['requireNonNull'](_0x5448a2,'randomWalk','w'),MK['requireNonNull'](_0x4c8d93,'randomWalk','h'),MK['requireToBeOneOfThese'](_0x47e5cb,_0x4004a0,'randomWalk','start'),MK['requireToBeOneOfThese'](_0x35e2b9,_0x4004a0,'randomWalk','end'),_0x47e5cb=_0x47e5cb!='any'?_0x47e5cb:MK['rng']['pickRandom'](_0x3515fc['filter'](_0x2feceb=>_0x2feceb!=_0x35e2b9)),_0x35e2b9=_0x35e2b9!='any'?_0x35e2b9:MK['rng']['pickRandom'](_0x3515fc['filter'](_0xd0dd7a=>_0xd0dd7a!=_0x47e5cb));if(_0x47e5cb==_0x35e2b9)throw Error('RandomWalk:\x20Cannot\x20start\x20and\x20end\x20from\x20same\x20direction');let _0x3dd3ee=_0x41ed07||_0x47e5cb!='top',_0xe58a85=_0x41ed07||_0x47e5cb!='right',_0x3ac8f7=_0x41ed07||_0x47e5cb!='left',_0x2943ed=_0x41ed07||_0x47e5cb!='bottom';const _0xe0b8dc=MK['createMatrix'](_0x5448a2,_0x4c8d93,0x0),_0x550dd7=MK['createMatrix'](_0x5448a2,_0x4c8d93,![]);let _0x3a9523,_0x4c3fdb;_0x47e5cb=='top'&&(_0x3a9523=Math['floor'](_0x5448a2/0x2),_0x4c3fdb=0x0);_0x47e5cb=='right'&&(_0x3a9523=_0x5448a2-0x1,_0x4c3fdb=Math['floor'](_0x4c8d93/0x2));_0x47e5cb=='left'&&(_0x3a9523=0x0,_0x4c3fdb=Math['floor'](_0x4c8d93/0x2));_0x47e5cb=='bottom'&&(_0x3a9523=Math['floor'](_0x5448a2/0x2),_0x4c3fdb=_0x4c8d93-0x1);_0xe0b8dc[_0x3a9523][_0x4c3fdb]=0x1;var _0x367369=_0x3a9523,_0x52a02c=_0x4c3fdb,_0x66a22e=[];_0x66a22e['push']({'x':_0x367369,'y':_0x52a02c});while(_0x66a22e['length']>0x0){_0x367369=_0x66a22e[_0x66a22e['length']-0x1]['x'],_0x52a02c=_0x66a22e[_0x66a22e['length']-0x1]['y'],_0xe0b8dc[_0x367369][_0x52a02c]=0x1,_0x550dd7[_0x367369][_0x52a02c]=!![];var _0x57244b=[];if(_0x35e2b9=='top'&&_0x52a02c==0x0)break;if(_0x35e2b9=='right'&&_0x367369==_0x5448a2-0x1)break;if(_0x35e2b9=='left'&&_0x367369==0x0)break;if(_0x35e2b9=='bottom'&&_0x52a02c==_0x4c8d93-0x1)break;function _0x50976d(_0x3bedc5,_0x1c15ee){return 0x0<=_0x3bedc5&&_0x3bedc5<_0x5448a2&&0x0<=_0x1c15ee&&_0x1c15ee<_0x4c8d93;}function _0x4ce167(_0x58dff9,_0x335133){return _0x50976d(_0x58dff9,_0x335133)&&(_0x285fbd||!_0xe0b8dc[_0x58dff9][_0x335133]&&!_0x550dd7[_0x58dff9][_0x335133]);}function _0x9ccf41(_0x5d7978,_0x318619){if(!_0x50976d(_0x5d7978,_0x318619))return![];if(!_0x285fbd&&_0x550dd7[_0x5d7978][_0x318619])return![];let _0x54d185=0x0;if(_0x50976d(_0x5d7978,_0x318619-0x1)&&_0xe0b8dc[_0x5d7978][_0x318619-0x1])_0x54d185++;if(_0x50976d(_0x5d7978,_0x318619+0x1)&&_0xe0b8dc[_0x5d7978][_0x318619+0x1])_0x54d185++;if(_0x50976d(_0x5d7978-0x1,_0x318619)&&_0xe0b8dc[_0x5d7978-0x1][_0x318619])_0x54d185++;if(_0x50976d(_0x5d7978+0x1,_0x318619)&&_0xe0b8dc[_0x5d7978+0x1][_0x318619])_0x54d185++;return _0x54d185<=0x1;}if(_0x1b1110){if(_0x4ce167(_0x367369,_0x52a02c-0x1)&&_0x3dd3ee)_0x57244b['push']('up');if(_0x4ce167(_0x367369+0x1,_0x52a02c)&&_0xe58a85)_0x57244b['push']('right');if(_0x4ce167(_0x367369-0x1,_0x52a02c)&&_0x3ac8f7)_0x57244b['push']('left');if(_0x4ce167(_0x367369,_0x52a02c+0x1)&&_0x2943ed)_0x57244b['push']('down');}else{if(_0x9ccf41(_0x367369,_0x52a02c-0x1)&&_0x3dd3ee)_0x57244b['push']('up');if(_0x9ccf41(_0x367369+0x1,_0x52a02c)&&_0xe58a85)_0x57244b['push']('right');if(_0x9ccf41(_0x367369-0x1,_0x52a02c)&&_0x3ac8f7)_0x57244b['push']('left');if(_0x9ccf41(_0x367369,_0x52a02c+0x1)&&_0x2943ed)_0x57244b['push']('down');}if(_0x57244b['length']==0x0){_0x66a22e['pop'](),_0xe0b8dc[_0x367369][_0x52a02c]=0x0;continue;}const _0x239790=MK['rng']['pickRandom'](_0x57244b);if(_0x239790=='up')_0x52a02c=_0x52a02c-0x1;if(_0x239790=='right')_0x367369=_0x367369+0x1;if(_0x239790=='left')_0x367369=_0x367369-0x1;if(_0x239790=='down')_0x52a02c=_0x52a02c+0x1;_0x66a22e['push']({'x':_0x367369,'y':_0x52a02c});}return this['binary2drawable'](_0xe0b8dc);},MK['mazeAlgorithms']['binary2drawable']=function(_0x307aa6){const _0x3e6669=_0x307aa6['length'],_0x59d838=_0x307aa6[0x0]['length'],_0x4d9416=MK['createMatrix'](_0x3e6669,_0x59d838);function _0x440ed1(_0x22052f,_0x1308f4){return _0x22052f>=0x0&&_0x22052f<_0x3e6669&&_0x1308f4>=0x0&&_0x1308f4<_0x59d838&&_0x307aa6[_0x22052f][_0x1308f4];}function _0x4984ea(_0x4a8dfc,_0x1726ee){return _0x440ed1(_0x4a8dfc-0x1,_0x1726ee)&&_0x440ed1(_0x4a8dfc-0x1,_0x1726ee-0x1)&&_0x440ed1(_0x4a8dfc,_0x1726ee-0x1)||_0x440ed1(_0x4a8dfc,_0x1726ee-0x1)&&_0x440ed1(_0x4a8dfc+0x1,_0x1726ee-0x1)&&_0x440ed1(_0x4a8dfc+0x1,_0x1726ee)||_0x440ed1(_0x4a8dfc+0x1,_0x1726ee)&&_0x440ed1(_0x4a8dfc+0x1,_0x1726ee+0x1)&&_0x440ed1(_0x4a8dfc,_0x1726ee+0x1)||_0x440ed1(_0x4a8dfc,_0x1726ee+0x1)&&_0x440ed1(_0x4a8dfc-0x1,_0x1726ee+0x1)&&_0x440ed1(_0x4a8dfc-0x1,_0x1726ee);}for(let _0x18a7e8=0x0;_0x18a7e8<_0x3e6669;_0x18a7e8++){for(let _0x18b9a0=0x0;_0x18b9a0<_0x59d838;_0x18b9a0++){if(!_0x307aa6[_0x18a7e8][_0x18b9a0]){_0x4d9416[_0x18a7e8][_0x18b9a0]=0x0;continue;}let _0x16b67e=0x0;if(!_0x4984ea(_0x18a7e8,_0x18b9a0)){if(_0x440ed1(_0x18a7e8,_0x18b9a0-0x1))_0x16b67e=_0x16b67e|0x1;if(_0x440ed1(_0x18a7e8+0x1,_0x18b9a0))_0x16b67e=_0x16b67e|0x2;if(_0x440ed1(_0x18a7e8,_0x18b9a0+0x1))_0x16b67e=_0x16b67e|0x4;if(_0x440ed1(_0x18a7e8-0x1,_0x18b9a0))_0x16b67e=_0x16b67e|0x8;}else{if(_0x440ed1(_0x18a7e8+0x1,_0x18b9a0)&&_0x440ed1(_0x18a7e8+0x1,_0x18b9a0+0x1)&&_0x440ed1(_0x18a7e8,_0x18b9a0+0x1))_0x16b67e=_0x16b67e|0x1;if(_0x440ed1(_0x18a7e8-0x1,_0x18b9a0)&&_0x440ed1(_0x18a7e8-0x1,_0x18b9a0+0x1)&&_0x440ed1(_0x18a7e8,_0x18b9a0+0x1))_0x16b67e=_0x16b67e|0x2;if(_0x440ed1(_0x18a7e8-0x1,_0x18b9a0)&&_0x440ed1(_0x18a7e8-0x1,_0x18b9a0-0x1)&&_0x440ed1(_0x18a7e8,_0x18b9a0-0x1))_0x16b67e=_0x16b67e|0x4;if(_0x440ed1(_0x18a7e8,_0x18b9a0-0x1)&&_0x440ed1(_0x18a7e8+0x1,_0x18b9a0-0x1)&&_0x440ed1(_0x18a7e8+0x1,_0x18b9a0))_0x16b67e=_0x16b67e|0x8;if(_0x16b67e==0x1)_0x16b67e=0x0;else{if(_0x16b67e==0x2)_0x16b67e=0x2;else{if(_0x16b67e==0x3)_0x16b67e=0x1;else{if(_0x16b67e==0x4)_0x16b67e=0x8;else{if(_0x16b67e==0x5)_0x16b67e=0xe;else{if(_0x16b67e==0x6)_0x16b67e=0x5;else{if(_0x16b67e==0x7)_0x16b67e=0xc;else{if(_0x16b67e==0x8)_0x16b67e=0x6;else{if(_0x16b67e==0x9)_0x16b67e=0x3;else{if(_0x16b67e==0xa)_0x16b67e=0xb;else{if(_0x16b67e==0xb)_0x16b67e=0xd;else{if(_0x16b67e==0xc)_0x16b67e=0x7;else{if(_0x16b67e==0xd)_0x16b67e=0xa;else{if(_0x16b67e==0xe)_0x16b67e=0x9;else{if(_0x16b67e==0xf)_0x16b67e=0x4;}}}}}}}}}}}}}}if(_0x16b67e==0x0&&_0x440ed1(_0x18a7e8,_0x18b9a0-0x1)&&_0x440ed1(_0x18a7e8-0x1,_0x18b9a0))_0x16b67e=0x10+0x3;else{if(_0x16b67e==0x2&&_0x440ed1(_0x18a7e8,_0x18b9a0-0x1)&&_0x440ed1(_0x18a7e8+0x1,_0x18b9a0))_0x16b67e=0x10+0x7;else{if(_0x16b67e==0x6&&_0x440ed1(_0x18a7e8,_0x18b9a0+0x1)&&_0x440ed1(_0x18a7e8-0x1,_0x18b9a0))_0x16b67e=0x10+0xf;else{if(_0x16b67e==0x8&&_0x440ed1(_0x18a7e8,_0x18b9a0+0x1)&&_0x440ed1(_0x18a7e8+0x1,_0x18b9a0))_0x16b67e=0x10+0xb;else{if(_0x16b67e==0x0&&_0x440ed1(_0x18a7e8,_0x18b9a0-0x1))_0x16b67e=0x10+0x0;else{if(_0x16b67e==0x1&&_0x440ed1(_0x18a7e8,_0x18b9a0-0x1))_0x16b67e=0x10+0x1;else{if(_0x16b67e==0x2&&_0x440ed1(_0x18a7e8,_0x18b9a0-0x1))_0x16b67e=0x10+0x2;else{if(_0x16b67e==0x6&&_0x440ed1(_0x18a7e8,_0x18b9a0+0x1))_0x16b67e=0x10+0x4;else{if(_0x16b67e==0x7&&_0x440ed1(_0x18a7e8,_0x18b9a0+0x1))_0x16b67e=0x10+0x5;else{if(_0x16b67e==0x8&&_0x440ed1(_0x18a7e8,_0x18b9a0+0x1))_0x16b67e=0x10+0x6;else{if(_0x16b67e==0x0&&_0x440ed1(_0x18a7e8-0x1,_0x18b9a0))_0x16b67e=0x10+0x8;else{if(_0x16b67e==0x2&&_0x440ed1(_0x18a7e8+0x1,_0x18b9a0))_0x16b67e=0x10+0x9;else{if(_0x16b67e==0x3&&_0x440ed1(_0x18a7e8-0x1,_0x18b9a0))_0x16b67e=0x10+0xa;else{if(_0x16b67e==0x6&&_0x440ed1(_0x18a7e8-0x1,_0x18b9a0))_0x16b67e=0x10+0xc;else{if(_0x16b67e==0x8&&_0x440ed1(_0x18a7e8+0x1,_0x18b9a0))_0x16b67e=0x10+0xd;else{if(_0x16b67e==0x5&&_0x440ed1(_0x18a7e8+0x1,_0x18b9a0))_0x16b67e=0x10+0xe;}}}}}}}}}}}}}}}_0x16b67e+=0x10;}_0x4d9416[_0x18a7e8][_0x18b9a0]=_0x16b67e;}}return _0x4d9416;},MK['mazeAlgorithms']['makeWayOut']=function(_0x4fd87c,_0x24d5c4){MK['requireNonNull'](_0x4fd87c,'makeWayOut','map'),MK['requireToBeOneOfThese'](_0x24d5c4,['top','left','right','bottom'],'makeWayOut','direction');const _0x4de0cd=[],_0x151be2=_0x4fd87c['length'],_0x50e6d3=_0x4fd87c[0x0]['length'];if(_0x24d5c4=='bottom')for(let _0x3cff72=0x0;_0x3cff72<_0x151be2;_0x3cff72++){if(_0x4fd87c[_0x3cff72][_0x50e6d3-0x1]!=0x0)_0x4de0cd['push']({'x':_0x3cff72,'y':_0x50e6d3-0x1});}if(_0x24d5c4=='right')for(let _0x530d95=0x0;_0x530d95<_0x50e6d3;_0x530d95++){if(_0x4fd87c[_0x151be2-0x1][_0x530d95]!=0x0)_0x4de0cd['push']({'x':_0x151be2-0x1,'y':_0x530d95});}if(_0x24d5c4=='left')for(let _0x40dcf0=0x0;_0x40dcf0<_0x50e6d3;_0x40dcf0++){if(_0x4fd87c[0x0][_0x40dcf0]!=0x0)_0x4de0cd['push']({'x':0x0,'y':_0x40dcf0});}if(_0x24d5c4=='top')for(let _0x2a06eb=0x0;_0x2a06eb<_0x151be2;_0x2a06eb++){if(_0x4fd87c[_0x2a06eb][0x0]!=0x0)_0x4de0cd['push']({'x':_0x2a06eb,'y':0x0});}if(_0x4de0cd['length']>0x0){const _0x1c9fa0=MK['rng']['pickRandom'](_0x4de0cd);MK['mazeAlgorithms']['buildTunnel'](_0x4fd87c,_0x1c9fa0['x'],_0x1c9fa0['y'],_0x24d5c4);}else MK['mazeAlgorithms']['connectMazeWithMapEnd'](_0x4fd87c,_0x24d5c4);},MK['mazeAlgorithms']['connectMazeWithMapEnd']=function(_0x2a822f,_0x2c9153){let _0x4ca758,_0x1c87d9,_0x4a2c35,_0x27b7e8,_0x5dd287;const _0x15be13=_0x2a822f['length'],_0x4e8279=_0x2a822f[0x0]['length'];_0x2c9153=='top'&&(_0x4ca758=Math['floor'](_0x15be13/0x2),_0x1c87d9=0x0,_0x4a2c35=0x0,_0x27b7e8=0x1,_0x5dd287='bottom');_0x2c9153=='left'&&(_0x4ca758=0x0,_0x1c87d9=Math['floor'](_0x4e8279/0x2),_0x4a2c35=0x1,_0x27b7e8=0x0,_0x5dd287='right');_0x2c9153=='right'&&(_0x4ca758=_0x15be13-0x1,_0x1c87d9=Math['floor'](_0x4e8279/0x2),_0x4a2c35=-0x1,_0x27b7e8=0x0,_0x5dd287='left');_0x2c9153=='bottom'&&(_0x4ca758=Math['floor'](_0x15be13/0x2),_0x1c87d9=_0x4e8279-0x1,_0x4a2c35=0x0,_0x27b7e8=-0x1,_0x5dd287='left');while(_0x2a822f[_0x4ca758][_0x1c87d9]==0x0){MK['mazeAlgorithms']['buildTunnel'](_0x2a822f,_0x4ca758,_0x1c87d9,_0x2c9153),MK['mazeAlgorithms']['buildTunnel'](_0x2a822f,_0x4ca758,_0x1c87d9,_0x5dd287),_0x4ca758=_0x4ca758+_0x4a2c35,_0x1c87d9=_0x1c87d9+_0x27b7e8;}MK['mazeAlgorithms']['buildTunnel'](_0x2a822f,_0x4ca758,_0x1c87d9,_0x2c9153);},MK['mazeAlgorithms']['buildTunnel']=function(_0x2ff5f3,_0x7e5631,_0x563fcf,_0x2725fa){const _0x38ce79=_0x2ff5f3[_0x7e5631][_0x563fcf];let _0x177e60;if(_0x2725fa=='top'&&_0x38ce79<0x10)_0x177e60=_0x38ce79|0x1;if(_0x2725fa=='right'&&_0x38ce79<0x10)_0x177e60=_0x38ce79|0x2;if(_0x2725fa=='bottom'&&_0x38ce79<0x10)_0x177e60=_0x38ce79|0x4;if(_0x2725fa=='left'&&_0x38ce79<0x10)_0x177e60=_0x38ce79|0x8;if(_0x2725fa=='top'&&_0x38ce79>=0x10){if(_0x38ce79==0x10+0x0)_0x177e60=0x20+0x0;if(_0x38ce79==0x10+0x1)_0x177e60=0x20+0x1;if(_0x38ce79==0x10+0x2)_0x177e60=0x20+0x2;if(_0x38ce79==0x20+0x8)_0x177e60=0x20+0x3;if(_0x38ce79==0x20+0x9)_0x177e60=0x20+0x8;}if(_0x2725fa=='right'&&_0x38ce79>=0x10){if(_0x38ce79==0x10+0x2)_0x177e60=0x20+0x9;if(_0x38ce79==0x10+0x5)_0x177e60=0x20+0xe;if(_0x38ce79==0x10+0x8)_0x177e60=0x20+0xd;if(_0x38ce79==0x20+0x2)_0x177e60=0x20+0x7;if(_0x38ce79==0x20+0x6)_0x177e60=0x20+0xb;}if(_0x2725fa=='bottom'&&_0x38ce79>=0x10){if(_0x38ce79==0x10+0x6)_0x177e60=0x20+0x4;if(_0x38ce79==0x10+0x7)_0x177e60=0x20+0x5;if(_0x38ce79==0x10+0x8)_0x177e60=0x20+0x6;if(_0x38ce79==0x20+0xc)_0x177e60=0x20+0xf;if(_0x38ce79==0x20+0xd)_0x177e60=0x20+0xb;}if(_0x2725fa=='left'&&_0x38ce79>=0x10){if(_0x38ce79==0x10+0x0)_0x177e60=0x20+0x8;if(_0x38ce79==0x10+0x3)_0x177e60=0x20+0xa;if(_0x38ce79==0x10+0x6)_0x177e60=0x20+0xc;if(_0x38ce79==0x20+0x0)_0x177e60=0x20+0x3;if(_0x38ce79==0x20+0x4)_0x177e60=0x20+0xf;}_0x2ff5f3[_0x7e5631][_0x563fcf]=_0x177e60;},MK['mazeAlgorithms']['roomsAndCorridors']=function(_0x81b91e,_0x3f7551,_0x5e6603,_0x3aeb7f,_0x120675,_0x386fdd,_0x310bf8,_0x42bd27,_0x2cc5d7,_0x20b5f3=0x0){let _0x10e7b4=MK['rng']['randomInteger'](_0x5e6603,_0x3aeb7f),_0x3a2d14=MK['createMatrix'](_0x81b91e,_0x3f7551),_0x54efe8=[],_0x4d7a84=[];if(_0x81b91e-_0x386fdd-_0x20b5f3<0x1||_0x3f7551-_0x42bd27-_0x20b5f3<0x1)throw Error('Your\x20Space\x20Map\x20is\x20too\x20small\x20for\x20given\x20arguments.\x20'+'Please\x20increase\x20its\x20size\x20or\x20change\x20Map\x20generation\x20arguments');function _0x12020d(_0x3f86f3,_0x3aafbd){let _0x12e53c=_0x3f86f3['x']>_0x3aafbd['x']+_0x3aafbd['width']+0x1||_0x3aafbd['x']>_0x3f86f3['x']+_0x3f86f3['width']+0x1,_0x51f40e=_0x3f86f3['y']>_0x3aafbd['y']+_0x3aafbd['height']+0x1||_0x3aafbd['y']>_0x3f86f3['y']+_0x3f86f3['height']+0x1;return!_0x12e53c&&!_0x51f40e;}function _0x132e7f(_0x1fec92){return _0x4d7a84['some'](_0xd2bce7=>_0x12020d(_0x1fec92,_0xd2bce7));}let _0x5c203d=0x0;while(_0x4d7a84['length']<_0x10e7b4){let _0x30a56a=MK['rng']['randomInteger'](_0x120675,_0x386fdd)-0x1,_0x139bdb=MK['rng']['randomInteger'](_0x310bf8,_0x42bd27)-0x1,_0x199ad7=MK['rng']['randomInteger'](_0x20b5f3,_0x81b91e-_0x30a56a-0x1-_0x20b5f3),_0x224a40=MK['rng']['randomInteger'](_0x20b5f3,_0x3f7551-_0x139bdb-0x1-_0x20b5f3),_0x5183fc=new Rectangle(_0x199ad7,_0x224a40,_0x30a56a,_0x139bdb);!_0x2cc5d7&&_0x132e7f(_0x5183fc)?_0x4d7a84['shift']():_0x4d7a84['push'](_0x5183fc);_0x5c203d++;if(_0x5c203d>=0x3e7)throw Error('Map\x20generation\x20failed.\x20Please\x20choose\x20other\x20arguments\x20or\x20make\x20the\x20Space\x20Map\x20larger');}for(let _0x1d2f9e of _0x4d7a84){let _0x29ffbc={};_0x29ffbc['x']=Math['floor'](_0x1d2f9e['width']/0x2)+_0x1d2f9e['x'],_0x29ffbc['y']=Math['floor'](_0x1d2f9e['height']/0x2)+_0x1d2f9e['y'],_0x54efe8['push'](_0x29ffbc);for(let _0x547d2f=_0x1d2f9e['x'];_0x547d2f<=_0x1d2f9e['x']+_0x1d2f9e['width'];_0x547d2f++){for(let _0x78e24a=_0x1d2f9e['y'];_0x78e24a<=_0x1d2f9e['y']+_0x1d2f9e['height'];_0x78e24a++){_0x3a2d14[_0x547d2f][_0x78e24a]=!![];}}}const _0x141aea=MK['kruskalMST'](_0x54efe8);for(let _0x4c85e7 of _0x141aea){let _0x1ca9ec=[],_0x29888f=MK['rng']['threshold'](0.5),_0xea1d2d=Math['min'](_0x4c85e7['start']['x'],_0x4c85e7['dest']['x']),_0x27283e=Math['max'](_0x4c85e7['start']['x'],_0x4c85e7['dest']['x']),_0x48e2f6=_0x29888f?_0x4c85e7['start']['y']:_0x4c85e7['dest']['y'],_0x2dee69=Math['min'](_0x4c85e7['start']['y'],_0x4c85e7['dest']['y']),_0x5eb6a5=Math['max'](_0x4c85e7['start']['y'],_0x4c85e7['dest']['y']),_0xa4dae1=_0x29888f?_0x4c85e7['dest']['x']:_0x4c85e7['start']['x'];for(let _0x317519=_0xea1d2d;_0x317519<=_0x27283e;_0x317519++){_0x1ca9ec['push']({'x':_0x317519,'y':_0x48e2f6});}for(let _0x532eaa=_0x2dee69;_0x532eaa<=_0x5eb6a5;_0x532eaa++){_0x1ca9ec['push']({'x':_0xa4dae1,'y':_0x532eaa});}_0x1ca9ec['forEach'](_0x45dcae=>_0x3a2d14[_0x45dcae['x']][_0x45dcae['y']]=!![]);}return MK['mazeAlgorithms']['binary2drawable'](_0x3a2d14);};class AbstractMapGenerator{constructor(){this['spawnLocation']=null;}['reset'](){this['spawnLocation']=null,this['dataMap']=JsonEx['makeDeepCopy'](MK['getMapFromDisk']()),this['assetsInfo']={};}['resetAfterFinalize'](){}['isValid'](_0x43ed7c,_0x13d1c1){return 0x0<=_0x43ed7c&&_0x43ed7c<this['dataMap']['width']&&0x0<=_0x13d1c1&&_0x13d1c1<this['dataMap']['height'];}['setSeed'](_0x45d488){return MK['rng']['setSeed'](_0x45d488),this;}['noSeedableRNG'](){return MK['rng']['noSeedableRNG'](),this;}['drawAssetToXY'](_0x13611f,_0x4aae61,_0x549291,_0x41603d,_0x317429){const _0x4381da=_0x41603d['w'],_0x33137c=_0x41603d['h'],_0x1890a4=_0x317429*_0x4381da+_0x41603d['x'],_0x542821=_0x41603d['y'],_0xe31f53=MK['getAdditionalMap'](_0x549291);MK['copyTiles'](_0x1890a4,_0x542821,_0x4381da,_0x33137c,_0x13611f,_0x4aae61,_0xe31f53,this['dataMap']),MK['cloneEvents'](_0x1890a4,_0x542821,_0x4381da,_0x33137c,_0x13611f,_0x4aae61,_0xe31f53,this['dataMap']);}['finalize'](){if(!this['spawnLocation'])this['spawnPlayerAt']();MK['updateAllAutoTiles'](this['dataMap']),MK['eraseRegionIds'](this['dataMap'],[MK['ENTRANCE_REGION_ID'],MK['EXIT_REGION_ID'],MK['SPAWNING_POINT_REGION_ID']]),MK['eraseShadows'](this['dataMap']),MK['injectDataMap'](this['dataMap'],this['spawnLocation']['x'],this['spawnLocation']['y']),this['resetAfterFinalize']();}['setFloorId'](){MK['onUsePremiumFunctionAlert']('setFloorId');}['checkCondition'](_0xc598ee){return!_0xc598ee['requireSwitch']||$gameSwitches['value'](_0xc598ee['switchId']);}}
