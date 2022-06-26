//=============================================================================
// VisuStella MZ - Visual Item Inventory
// VisuMZ_4_VisualItemInv.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualItemInv = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualItemInv = VisuMZ.VisualItemInv || {};
VisuMZ.VisualItemInv.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.02] [VisualItemInv]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Item_Inventory_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the item list displayed in-game to become more visual
 * and show bigger images, either as icons or pictures. The enlarged item,
 * weapon, and armor images will show their item quantities next to them while
 * a tooltip window appears above their selected cell to show the item's name.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Changes the item inventory windows to become more visual.
 * * Enlarged item images can be either icons or picture images.
 * * Alter how large you want the images to appear with the Plugin Parameters.
 * * Add different color backgrounds for different items.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
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
 * Window Columns and Spacing
 * 
 * It should come off as no surprise that these windows will have their usual
 * column counts changed to adjust for the item images shown. The columns will
 * be based on how many of the item icons can fit inside of the window.
 *
 * ---
 * 
 * Item Quantity Positioning
 * 
 * The item quantity will now be positioned to show in the lower right of any
 * window cell with an enlarged icon. Due to this being a much smaller area
 * than what is usually provided, some plugins may have incredibly squished
 * appearances when it comes to displaying item quantity in some areas.
 * 
 * This needs to be adjusted in those plugins individually.
 * 
 * ---
 * 
 * Items and Equips Core
 * 
 * For the Equip Menu, the remove item entry has been changed to show only the
 * enlarged icon. This is to keep consistency with the rest of the plugin.
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
 * === Picture-Related Notetags ===
 * 
 * ---
 * 
 * <Visual Item Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   item's icon inside the item windows instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of this plugin, too.
 * - The size used for the image will vary based on the icon size settings.
 * 
 * ---
 * 
 * === Background Colors-Related Notetags ===
 * 
 * ---
 *
 * <Visual Item BG Color 1: x>
 * <Visual Item BG Color 2: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the background color(s) for the item to text color 'x'.
 * - Replace 'x' with a number from 0 to 31 to represent a text color.
 *
 * ---
 *
 * <Visual Item BG Color 1: #rrggbb>
 * <Visual Item BG Color 2: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the background color(s) for the item to a hex color.
 * - Use #rrggbb for custom colors.
 * - You can find out what hex codes belong to which color from this website:
 *   https://htmlcolorcodes.com/
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Visual Item Inventory Settings
 * ============================================================================
 *
 * These settings allow you to adjust how the Visual Item Inventory windows
 * appear and which ones they appear in.
 *
 * ---
 *
 * General
 * 
 *   Applied Windows:
 *   - Insert the name of their constructors here to apply them.
 *   - Only works with windows made from Window_ItemList.
 * 
 *   Icon Size:
 *   - The icon size used for the Visual Item windows.
 * 
 *   Icon Smoothing?:
 *   - Do you wish to smooth out the icons or pixelate them?
 *
 * ---
 *
 * Item Quantity Outline
 * 
 *   Outline Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 * 
 *   Outline Size:
 *   - How thick are the outlines for the item quantity?
 *
 * ---
 *
 * Tooltip Window
 * 
 *   Show Tooltip Window?:
 *   - Show the tooltip window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Buffer Width:
 *   - How much to buffer this window's width by?
 * 
 *   Font Size:
 *   - What should this window's font size be?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How much to offset this window's X/Y position by?
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
 * Version 1.02: July 16, 2021
 * * Bug Fixes!
 * ** Visual glitch fixed that would make item quantity not appear. Fix made
 *    by Arisu.
 * 
 * Version 1.01: February 19, 2021
 * * Feature Update!
 * ** No longer requires VisuStella MZ Items and Equips Core dependency.
 *
 * Version 1.00 Official Release Date: February 26, 2021
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
 * @param VisualItemInv
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param General
 *
 * @param Constructors:arraystr
 * @text Applied Windows
 * @parent General
 * @type string[]
 * @desc Insert the name of their constructors here to apply them.
 * Only works with windows made from Window_ItemList.
 * @default ["Window_ItemList","Window_EquipItem","Window_ShopSell","Window_EventItem","Window_BattleItem"]
 *
 * @param IconSize:num
 * @text Icon Size
 * @parent General
 * @desc The icon size used for the Visual Item windows.
 * @default 64
 *
 * @param IconSmoothing:eval
 * @text Icon Smoothing?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Do you wish to smooth out the icons or pixelate them?
 * @default false
 * 
 * @param Outline
 * @text Item Quantity Outline
 *
 * @param OutlineColor:num
 * @text Outline Color
 * @parent Outline
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param OutlineSize:num
 * @text Outline Size
 * @parent Outline
 * @desc How thick are the outlines for the item quantity?
 * @default 4
 * 
 * @param Tooltip
 * @text Tooltip Window
 *
 * @param ShowTooltip:eval
 * @text Show Tooltip Window?
 * @parent Tooltip
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the tooltip window?
 * @default true
 *
 * @param TooltipBgType:num
 * @text Background Type
 * @parent Tooltip
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param TooltipBufferWidth:num
 * @text Buffer Width
 * @parent Tooltip
 * @desc How much to buffer this window's width by?
 * @default 16
 *
 * @param TooltipFontSize:num
 * @text Font Size
 * @parent Tooltip
 * @desc What should this window's font size be?
 * @default 22
 *
 * @param TooltipOffsetX:num
 * @text Offset X
 * @parent Tooltip
 * @desc How much to offset this window's X position by?
 * @default 0
 *
 * @param TooltipOffsetY:num
 * @text Offset Y
 * @parent Tooltip
 * @desc How much to offset this window's Y position by?
 * @default 8
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

const _0xe335=['ItemScene','note','Window_ItemList_maxCols','793069eolpKR','paintOpacity','OffsetY','Window_Base_drawItemNumber','STRUCT','height','846965wyhKzz','initialize','createContents','bgColorNum2','bigPicture','ymqUu','padding','GYRmg','min','prototype','IconSmoothing','Window_ShopSell_colSpacing','crrQY','itemAt','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','0.5','numItems','WSOuB','_item','nnEQj','VISUAL_ITEM_CONSTRUCTORS','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','drawItem','iconHeight','callUpdateHelp','CmZxX','Window_Selectable_itemHeight','width','itemHeight','ARRAYEVAL','drawBigItemIcon','ItemsEquipsCore','parse','Window_ItemList_drawItemNumber','FUNC','1SnmSCZ','Settings','match','rgba(','rgba(0,\x200,\x200,\x201.0)','maxCols','_cursorRect','45515DMayIS','seEDi','iconWidth','outlineWidth','trim','fontSize','FONT_SIZE','exit','create','ConvertHexToRgba','Window_ItemList_rowSpacing','BaHQw','JvRYl','setItem','VISUAL_ITEM_ICON_SMOOTHING','updateVisibility','textColor','BG_TYPE','ARRAYJSON','addChild','17khemax','update','BUFFER_WIDTH','status','ItemQuantityFontSize','strokeRect','outlineColor','OutlineColor','version','ceil','bgColorNum1','Window_EquipItem_colSpacing','imageSmoothingEnabled','bgColorHex1','filter','TooltipOffsetY','drawBigIcon','ItemQuantityFmt','OffsetX','_visualItemInventoryTooltipWindow','bind','contents','refresh','isDrawItemNumber','ogtex','New','updatePadding','_scene','PfjHf','45971aqKeYQ','resetFontSettings','bgColorHex2','placeItemNewLabelVisualItemInventory','Window_ShopSell_maxCols','Window_ItemList_drawItemBackground','VISUAL_ITEM_ICON_SIZE','TooltipOffsetX','isShowNew','length','SCdam','toUpperCase','isEnabled','drawItemNumber','XmdAa','format','OFFSET_Y','1406550RgHeLc','_visualItemHeight','drawItemNumberVisualItemInventory','backOpacity','changeTextColor','drawItemBackgroundVisualItemInventory','VisuMZ_1_ItemsEquipsCore','Window_EquipItem_maxCols','setupVisualItemInvFontSettings','drawItemBackground','placeItemNewLabel','createVisualItemInventoryTooltipWindow','Window_ItemList_initialize','drawBigItemPicture','ConvertParams','drawText','RegExp','IconSet','OFFSET_X','description','EquipScene','NUM','STR','visualPicture','ARRAYSTRUCT','TooltipBufferWidth','getItemColor','changePaintOpacity','itemBackColor1','Window_ItemList_drawItem','contentsBack','drawBackgroundRect','includes','177064DEIJtw','_windowLayer','round','Window_ItemList_callUpdateHelp','itemRectWithPadding','lineHeight','ARRAYSTR','VLvho','addLoadListener','clamp','_parentWindow','resetTextColor','innerWidth','cgEpr','MZPJR','right','qfjis','call','Window_ItemList_colSpacing','iconIndex','_context','OutlineSize','loadPicture','ARRAYNUM','name','itemRect','8FZRXQG','rowSpacing','EVAL','Window_ItemList_placeItemNewLabel','TooltipFontSize','map','ARRAYFUNC','visible','colSpacing','opacity','VisualItemInv','VISUAL_ITEM_OUTLINE_SIZE','updatePosition','usesVisualItemInventory','JSON','item','substring','textWidth','drawItemVisualItemInventory','isOpen','clear','342287vOrRcY','_clientArea'];const _0x4ad706=_0x2de1;(function(_0x43560e,_0x5c27e4){const _0x32c28f=_0x2de1;while(!![]){try{const _0x213aa4=parseInt(_0x32c28f(0x1b3))+parseInt(_0x32c28f(0x1a8))+parseInt(_0x32c28f(0x1d6))*-parseInt(_0x32c28f(0x1ad))+parseInt(_0x32c28f(0x193))*-parseInt(_0x32c28f(0x1dd))+-parseInt(_0x32c28f(0x179))+parseInt(_0x32c28f(0x1f1))*-parseInt(_0x32c28f(0x147))+parseInt(_0x32c28f(0x158));if(_0x213aa4===_0x5c27e4)break;else _0x43560e['push'](_0x43560e['shift']());}catch(_0x59ad53){_0x43560e['push'](_0x43560e['shift']());}}}(_0xe335,0x7532a));var label=_0x4ad706(0x19d),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4ad706(0x1ff)](function(_0x279be6){const _0x930768=_0x4ad706;return _0x279be6[_0x930768(0x1f4)]&&_0x279be6[_0x930768(0x16b)][_0x930768(0x178)]('['+label+']');})[0x0];VisuMZ[label][_0x4ad706(0x1d7)]=VisuMZ[label][_0x4ad706(0x1d7)]||{},VisuMZ[_0x4ad706(0x166)]=function(_0x26ee50,_0x53b4e3){const _0x2e0f37=_0x4ad706;for(const _0x57ba16 in _0x53b4e3){if(_0x57ba16[_0x2e0f37(0x1d8)](/(.*):(.*)/i)){if(_0x2e0f37(0x155)!==_0x2e0f37(0x155))_0x12caef[_0x2e0f37(0x19d)]['Window_Base_drawItemNumber'][_0x2e0f37(0x18a)](this,_0x5448c4,_0xc7d649,_0x192c1a,_0x17d08a);else{const _0x575893=String(RegExp['$1']),_0x23f363=String(RegExp['$2'])[_0x2e0f37(0x152)]()[_0x2e0f37(0x1e1)]();let _0x5640de,_0xd6306e,_0x449e6c;switch(_0x23f363){case _0x2e0f37(0x16d):_0x5640de=_0x53b4e3[_0x57ba16]!==''?Number(_0x53b4e3[_0x57ba16]):0x0;break;case _0x2e0f37(0x190):_0xd6306e=_0x53b4e3[_0x57ba16]!==''?JSON[_0x2e0f37(0x1d3)](_0x53b4e3[_0x57ba16]):[],_0x5640de=_0xd6306e[_0x2e0f37(0x198)](_0x3e9e23=>Number(_0x3e9e23));break;case _0x2e0f37(0x195):_0x5640de=_0x53b4e3[_0x57ba16]!==''?eval(_0x53b4e3[_0x57ba16]):null;break;case _0x2e0f37(0x1d0):_0xd6306e=_0x53b4e3[_0x57ba16]!==''?JSON[_0x2e0f37(0x1d3)](_0x53b4e3[_0x57ba16]):[],_0x5640de=_0xd6306e['map'](_0x37bcf2=>eval(_0x37bcf2));break;case _0x2e0f37(0x1a1):_0x5640de=_0x53b4e3[_0x57ba16]!==''?JSON[_0x2e0f37(0x1d3)](_0x53b4e3[_0x57ba16]):'';break;case _0x2e0f37(0x1ef):_0xd6306e=_0x53b4e3[_0x57ba16]!==''?JSON[_0x2e0f37(0x1d3)](_0x53b4e3[_0x57ba16]):[],_0x5640de=_0xd6306e[_0x2e0f37(0x198)](_0x17bf5c=>JSON[_0x2e0f37(0x1d3)](_0x17bf5c));break;case _0x2e0f37(0x1d5):_0x5640de=_0x53b4e3[_0x57ba16]!==''?new Function(JSON[_0x2e0f37(0x1d3)](_0x53b4e3[_0x57ba16])):new Function('return\x200');break;case _0x2e0f37(0x199):_0xd6306e=_0x53b4e3[_0x57ba16]!==''?JSON['parse'](_0x53b4e3[_0x57ba16]):[],_0x5640de=_0xd6306e['map'](_0x5cb2ce=>new Function(JSON['parse'](_0x5cb2ce)));break;case _0x2e0f37(0x16e):_0x5640de=_0x53b4e3[_0x57ba16]!==''?String(_0x53b4e3[_0x57ba16]):'';break;case _0x2e0f37(0x17f):_0xd6306e=_0x53b4e3[_0x57ba16]!==''?JSON[_0x2e0f37(0x1d3)](_0x53b4e3[_0x57ba16]):[],_0x5640de=_0xd6306e[_0x2e0f37(0x198)](_0xe51dad=>String(_0xe51dad));break;case _0x2e0f37(0x1b1):_0x449e6c=_0x53b4e3[_0x57ba16]!==''?JSON[_0x2e0f37(0x1d3)](_0x53b4e3[_0x57ba16]):{},_0x5640de=VisuMZ['ConvertParams']({},_0x449e6c);break;case _0x2e0f37(0x170):_0xd6306e=_0x53b4e3[_0x57ba16]!==''?JSON['parse'](_0x53b4e3[_0x57ba16]):[],_0x5640de=_0xd6306e[_0x2e0f37(0x198)](_0x367fd0=>VisuMZ[_0x2e0f37(0x166)]({},JSON[_0x2e0f37(0x1d3)](_0x367fd0)));break;default:continue;}_0x26ee50[_0x575893]=_0x5640de;}}}return _0x26ee50;},(_0x3de923=>{const _0x639190=_0x4ad706,_0x3b4109=_0x3de923['name'];for(const _0xca052f of dependencies){if(!Imported[_0xca052f]){alert(_0x639190(0x1c8)['format'](_0x3b4109,_0xca052f)),SceneManager[_0x639190(0x1e4)]();break;}}const _0x13dc17=_0x3de923[_0x639190(0x16b)];if(_0x13dc17[_0x639190(0x1d8)](/\[Version[ ](.*?)\]/i)){if(_0x639190(0x1b8)!==_0x639190(0x1b8))this[_0x639190(0x14a)](_0xca198e);else{const _0x139c08=Number(RegExp['$1']);_0x139c08!==VisuMZ[label][_0x639190(0x1f9)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x639190(0x156)](_0x3b4109,_0x139c08)),SceneManager[_0x639190(0x1e4)]());}}if(_0x13dc17['match'](/\[Tier[ ](\d+)\]/i)){const _0x40558a=Number(RegExp['$1']);_0x40558a<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x639190(0x156)](_0x3b4109,_0x40558a,tier)),SceneManager[_0x639190(0x1e4)]()):tier=Math['max'](_0x40558a,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x639190(0x1d7)],_0x3de923['parameters']);})(pluginData),VisuMZ[_0x4ad706(0x19d)]['RegExp']={'visualPicture':/<(?:VISUAL|VISUAL ITEM) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'bgColorNum1':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]1:[ ](\d+)>/i,'bgColorNum2':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]2:[ ](\d+)>/i,'bgColorHex1':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]1:[ ]#(.*)>/i,'bgColorHex2':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]2:[ ]#(.*)>/i},Window_ItemList[_0x4ad706(0x14d)]=VisuMZ[_0x4ad706(0x19d)]['Settings']['IconSize']||0x40,Window_ItemList[_0x4ad706(0x1eb)]=VisuMZ['VisualItemInv'][_0x4ad706(0x1d7)][_0x4ad706(0x1bd)]||![],Window_ItemList['VISUAL_ITEM_OUTLINE_COLOR']=VisuMZ['VisualItemInv'][_0x4ad706(0x1d7)][_0x4ad706(0x1f8)]||_0x4ad706(0x1da),Window_ItemList['VISUAL_ITEM_OUTLINE_SIZE']=VisuMZ[_0x4ad706(0x19d)][_0x4ad706(0x1d7)][_0x4ad706(0x18e)]||0x0,Window_ItemList[_0x4ad706(0x1c7)]=VisuMZ[_0x4ad706(0x19d)][_0x4ad706(0x1d7)]['Constructors']||0x0,Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x1a0)]=function(){const _0x49ae99=_0x4ad706;return Window_ItemList['VISUAL_ITEM_CONSTRUCTORS']['includes'](this['constructor'][_0x49ae99(0x191)]);},VisuMZ[_0x4ad706(0x19d)][_0x4ad706(0x1cd)]=Window_Selectable['prototype'][_0x4ad706(0x1cf)],Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x1cf)]=function(){const _0x34dd29=_0x4ad706;if(this[_0x34dd29(0x1a0)]()){if(this['_visualItemHeight']!==undefined)return this['_visualItemHeight'];const _0x18201a=Math['ceil'](Window_ItemList['VISUAL_ITEM_ICON_SIZE']/this[_0x34dd29(0x17e)]());return this[_0x34dd29(0x159)]=Math[_0x34dd29(0x17b)](_0x18201a*this[_0x34dd29(0x17e)]())+0x8,this[_0x34dd29(0x159)];}else return VisuMZ[_0x34dd29(0x19d)][_0x34dd29(0x1cd)][_0x34dd29(0x18a)](this);},VisuMZ['VisualItemInv']['Window_ItemList_maxCols']=Window_ItemList['prototype']['maxCols'],Window_ItemList['prototype']['maxCols']=function(){const _0x5cba96=_0x4ad706;return this[_0x5cba96(0x1a0)]()?Math[_0x5cba96(0x1fa)](this[_0x5cba96(0x185)]/this[_0x5cba96(0x1cf)]()):VisuMZ[_0x5cba96(0x19d)][_0x5cba96(0x1ac)]['call'](this);},VisuMZ[_0x4ad706(0x19d)][_0x4ad706(0x18b)]=Window_ItemList['prototype'][_0x4ad706(0x19b)],Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x19b)]=function(){const _0x45253e=_0x4ad706;return this[_0x45253e(0x1a0)]()?0x0:VisuMZ['VisualItemInv'][_0x45253e(0x18b)][_0x45253e(0x18a)](this);},VisuMZ['VisualItemInv'][_0x4ad706(0x1e7)]=Window_ItemList['prototype']['rowSpacing'],Window_ItemList['prototype'][_0x4ad706(0x194)]=function(){const _0x1553b0=_0x4ad706;return this[_0x1553b0(0x1a0)]()?0x0:VisuMZ[_0x1553b0(0x19d)][_0x1553b0(0x1e7)]['call'](this);},VisuMZ[_0x4ad706(0x19d)][_0x4ad706(0x175)]=Window_ItemList[_0x4ad706(0x1bc)]['drawItem'],Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x1c9)]=function(_0x380547){const _0x3c2f35=_0x4ad706;if(this[_0x3c2f35(0x1a0)]()){if(_0x3c2f35(0x1c4)!==_0x3c2f35(0x1c4)){const _0x12d440=_0x5b017a['getItemColor'](this[_0x3c2f35(0x1c5)]);this[_0x3c2f35(0x15c)](_0x12d440);}else this[_0x3c2f35(0x1a5)](_0x380547);}else _0x3c2f35(0x1e9)===_0x3c2f35(0x1e8)?(_0x3f16a1(_0x3c2f35(0x1c1)[_0x3c2f35(0x156)](_0x214758,_0x5074b9,_0x336400)),_0x2a3c30[_0x3c2f35(0x1e4)]()):VisuMZ[_0x3c2f35(0x19d)]['Window_ItemList_drawItem'][_0x3c2f35(0x18a)](this,_0x380547);},Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x1a5)]=function(_0x491253){const _0x515f4a=_0x4ad706,_0x442df5=this['itemAt'](_0x491253);if(!_0x442df5)return;const _0x25dfa0=VisuMZ[_0x515f4a(0x19d)]['RegExp'],_0x20bfa4=_0x442df5[_0x515f4a(0x1ab)],_0x11d562=this[_0x515f4a(0x17d)](_0x491253);if(_0x20bfa4['match'](_0x25dfa0[_0x515f4a(0x16f)])||_0x20bfa4[_0x515f4a(0x1d8)](_0x25dfa0[_0x515f4a(0x1b7)])){if(_0x515f4a(0x142)!==_0x515f4a(0x1cc)){const _0x351db2=String(RegExp['$1'])['trim'](),_0x41a057=ImageManager[_0x515f4a(0x18f)](_0x351db2);_0x41a057[_0x515f4a(0x181)](this[_0x515f4a(0x165)][_0x515f4a(0x205)](this,_0x442df5,_0x41a057,_0x11d562));}else return _0x77d2f3[_0x515f4a(0x19d)][_0x515f4a(0x14b)]['call'](this);}else'qfjis'!==_0x515f4a(0x189)?_0x51bb9d['VisualItemInv'][_0x515f4a(0x175)][_0x515f4a(0x18a)](this,_0xfdc140):(this['changePaintOpacity'](this[_0x515f4a(0x153)](_0x442df5)),this[_0x515f4a(0x1d1)](_0x442df5,_0x11d562),this[_0x515f4a(0x154)](_0x442df5,_0x11d562['x'],_0x11d562['y']+_0x11d562[_0x515f4a(0x1b2)]-this[_0x515f4a(0x17e)](),_0x11d562['width']),this[_0x515f4a(0x148)](),this['changePaintOpacity'](!![]));this['placeItemNewLabel'](_0x491253);},Window_ItemList['prototype'][_0x4ad706(0x165)]=function(_0x307ce2,_0x2d1e73,_0x61c399){const _0x215984=_0x4ad706;this[_0x215984(0x173)](this['isEnabled'](_0x307ce2));let _0x1b2b03=_0x61c399['x']+0x2,_0x2ce183=_0x61c399['y']+0x2,_0x456e02=_0x61c399['width']-0x4,_0x3c57d9=_0x61c399[_0x215984(0x1b2)]-0x4,_0x4945ad=Math[_0x215984(0x1bb)](_0x456e02,_0x3c57d9);const _0x2c1b0b=_0x4945ad/_0x2d1e73[_0x215984(0x1ce)],_0x3e6979=_0x4945ad/_0x2d1e73[_0x215984(0x1b2)],_0x3baf8d=Math['min'](_0x2c1b0b,_0x3e6979,0x1);let _0x5d4f46=Math[_0x215984(0x17b)](_0x2d1e73['width']*_0x3baf8d),_0x5c04ab=Math[_0x215984(0x17b)](_0x2d1e73[_0x215984(0x1b2)]*_0x3baf8d);_0x1b2b03+=Math[_0x215984(0x17b)]((_0x456e02-_0x5d4f46)/0x2),_0x2ce183+=Math['round']((_0x3c57d9-_0x5c04ab)/0x2);const _0x24dd28=_0x2d1e73[_0x215984(0x1ce)],_0x4aaedc=_0x2d1e73[_0x215984(0x1b2)],_0x3923b2=this[_0x215984(0x206)][_0x215984(0x18d)][_0x215984(0x1fd)];this[_0x215984(0x206)][_0x215984(0x18d)][_0x215984(0x1fd)]=!![],this['contents']['blt'](_0x2d1e73,0x0,0x0,_0x24dd28,_0x4aaedc,_0x1b2b03,_0x2ce183,_0x5d4f46,_0x5c04ab),this['contents'][_0x215984(0x18d)]['imageSmoothingEnabled']=_0x3923b2,this[_0x215984(0x154)](_0x307ce2,_0x61c399['x'],_0x61c399['y']+_0x61c399['height']-this['lineHeight'](),_0x61c399['width']),this[_0x215984(0x148)](),this[_0x215984(0x173)](!![]);},Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x1d1)]=function(_0x1a39cb,_0x3d3e2c){const _0x5eaacc=_0x4ad706,_0x1f7ba7=_0x1a39cb[_0x5eaacc(0x18c)];this[_0x5eaacc(0x201)](_0x1f7ba7,_0x3d3e2c);},Window_ItemList['prototype'][_0x4ad706(0x201)]=function(_0x520fbe,_0x298572){const _0x6be217=_0x4ad706;let _0x1b2968=_0x298572['x'],_0x3511ba=_0x298572['y'],_0x8f1231=Window_ItemList[_0x6be217(0x14d)];_0x1b2968+=Math[_0x6be217(0x17b)]((_0x298572[_0x6be217(0x1ce)]-_0x8f1231)/0x2),_0x3511ba+=Math[_0x6be217(0x17b)]((_0x298572[_0x6be217(0x1b2)]-_0x8f1231)/0x2);const _0x5a2c05=ImageManager['loadSystem'](_0x6be217(0x169)),_0x19ae53=ImageManager[_0x6be217(0x1df)],_0x504016=ImageManager[_0x6be217(0x1ca)],_0x3d2728=_0x520fbe%0x10*_0x19ae53,_0x20e6fb=Math['floor'](_0x520fbe/0x10)*_0x504016;this[_0x6be217(0x206)]['_context'][_0x6be217(0x1fd)]=Window_ItemList[_0x6be217(0x1eb)],this[_0x6be217(0x206)]['blt'](_0x5a2c05,_0x3d2728,_0x20e6fb,_0x19ae53,_0x504016,_0x1b2968,_0x3511ba,_0x8f1231,_0x8f1231),this['contents'][_0x6be217(0x18d)][_0x6be217(0x1fd)]=!![];},VisuMZ[_0x4ad706(0x19d)]['Window_ItemList_drawItemNumber']=Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x154)],Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x154)]=function(_0x4c753d,_0x13e0ed,_0x4501f0,_0x49b5a2){const _0x1069c7=_0x4ad706;this[_0x1069c7(0x1a0)]()?(this['setupVisualItemInvFontSettings'](),VisuMZ[_0x1069c7(0x19d)][_0x1069c7(0x1d4)][_0x1069c7(0x18a)](this,_0x4c753d,_0x13e0ed,_0x4501f0,_0x49b5a2),this[_0x1069c7(0x148)]()):VisuMZ[_0x1069c7(0x19d)]['Window_ItemList_drawItemNumber']['call'](this,_0x4c753d,_0x13e0ed,_0x4501f0,_0x49b5a2);},Window_Base[_0x4ad706(0x1bc)][_0x4ad706(0x160)]=function(){const _0x477c26=_0x4ad706;this[_0x477c26(0x148)](),this['contents'][_0x477c26(0x1f7)]=Window_ItemList['VISUAL_ITEM_OUTLINE_COLOR'],this['contents'][_0x477c26(0x1e0)]=Window_ItemList[_0x477c26(0x19e)];},VisuMZ['VisualItemInv'][_0x4ad706(0x164)]=Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x1b4)],Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x1b4)]=function(_0x534bef){const _0x2ce483=_0x4ad706;VisuMZ[_0x2ce483(0x19d)]['Window_ItemList_initialize']['call'](this,_0x534bef),this[_0x2ce483(0x163)]();},Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x163)]=function(){const _0x1d1319=_0x4ad706;if(!this[_0x1d1319(0x1a0)]())return;if(!VisuMZ[_0x1d1319(0x19d)][_0x1d1319(0x1d7)]['ShowTooltip'])return;this[_0x1d1319(0x204)]=new Window_VisualItemTooltip(this),SceneManager[_0x1d1319(0x145)]['addChild'](this[_0x1d1319(0x204)]);},VisuMZ['VisualItemInv'][_0x4ad706(0x17c)]=Window_ItemList['prototype'][_0x4ad706(0x1cb)],Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x1cb)]=function(){const _0x3f7052=_0x4ad706;VisuMZ['VisualItemInv'][_0x3f7052(0x17c)][_0x3f7052(0x18a)](this);if(this[_0x3f7052(0x204)]){if('BnWoi'!==_0x3f7052(0x187))this[_0x3f7052(0x204)][_0x3f7052(0x1ea)](this['item']());else return _0xbe066b[_0x3f7052(0x1bc)][_0x3f7052(0x19b)][_0x3f7052(0x18a)](this);}},VisuMZ['VisualItemInv'][_0x4ad706(0x14c)]=Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x161)],Window_ItemList['prototype'][_0x4ad706(0x161)]=function(_0x243c52){const _0x3ef58f=_0x4ad706;if(this['usesVisualItemInventory']()){if(_0x3ef58f(0x1de)===_0x3ef58f(0x186)){if(this[_0x3ef58f(0x141)](_0x2188fb)){this['setupVisualItemInvFontSettings']();const _0x1b49bc=_0x29a123[_0x3ef58f(0x1d2)][_0x3ef58f(0x1d7)][_0x3ef58f(0x1aa)],_0x42b599=_0x1b49bc[_0x3ef58f(0x202)],_0x323b1f=_0x42b599[_0x3ef58f(0x156)](_0x445cdd[_0x3ef58f(0x1c3)](_0x276e50));this[_0x3ef58f(0x206)][_0x3ef58f(0x1e2)]=_0x1b49bc[_0x3ef58f(0x1f5)],this[_0x3ef58f(0x167)](_0x323b1f,_0x336d65,_0x30561e,_0x20a1da,_0x3ef58f(0x188)),this['resetFontSettings']();}}else this[_0x3ef58f(0x15d)](_0x243c52);}else VisuMZ[_0x3ef58f(0x19d)][_0x3ef58f(0x14c)][_0x3ef58f(0x18a)](this,_0x243c52);const _0x1a94d6=this['itemRect'](_0x243c52);this[_0x3ef58f(0x177)](_0x1a94d6);},Window_ItemList['prototype'][_0x4ad706(0x15d)]=function(_0x2e7b34){const _0x44d9b8=_0x4ad706,_0x1877e3=this['itemAt'](_0x2e7b34);if(!_0x1877e3){VisuMZ[_0x44d9b8(0x19d)][_0x44d9b8(0x14c)][_0x44d9b8(0x18a)](this,_0x2e7b34);return;}const _0x388d53=VisuMZ['VisualItemInv'][_0x44d9b8(0x168)],_0x1267f4=_0x1877e3['note'];let _0x4851b4=ColorManager[_0x44d9b8(0x174)](),_0x126750=ColorManager['itemBackColor2']();if(_0x1267f4[_0x44d9b8(0x1d8)](_0x388d53[_0x44d9b8(0x1fb)])){if(_0x44d9b8(0x1ba)!=='izOMH')_0x4851b4=ColorManager[_0x44d9b8(0x1ed)](Number(RegExp['$1']));else{if(this[_0x44d9b8(0x1a0)]()){if(this[_0x44d9b8(0x159)]!==_0x433209)return this[_0x44d9b8(0x159)];const _0x1ed5e5=_0x5571e8[_0x44d9b8(0x1fa)](_0x1409fe[_0x44d9b8(0x14d)]/this[_0x44d9b8(0x17e)]());return this['_visualItemHeight']=_0x5c055a[_0x44d9b8(0x17b)](_0x1ed5e5*this[_0x44d9b8(0x17e)]())+0x8,this['_visualItemHeight'];}else return _0x4b94ae[_0x44d9b8(0x19d)][_0x44d9b8(0x1cd)]['call'](this);}}_0x1267f4['match'](_0x388d53[_0x44d9b8(0x1b6)])&&(_0x126750=ColorManager[_0x44d9b8(0x1ed)](Number(RegExp['$1'])));_0x1267f4[_0x44d9b8(0x1d8)](_0x388d53[_0x44d9b8(0x1fe)])&&(_0x4851b4='#'+String(RegExp['$1']));_0x1267f4[_0x44d9b8(0x1d8)](_0x388d53[_0x44d9b8(0x149)])&&(_0x126750='#'+String(RegExp['$1']));const _0x1c70eb=this[_0x44d9b8(0x192)](_0x2e7b34),_0x31af11=_0x1c70eb['x'],_0x249f06=_0x1c70eb['y'],_0x473aff=_0x1c70eb[_0x44d9b8(0x1ce)],_0x2ec419=_0x1c70eb[_0x44d9b8(0x1b2)];this[_0x44d9b8(0x176)][_0x44d9b8(0x1ae)]=0xff,this[_0x44d9b8(0x176)]['gradientFillRect'](_0x31af11,_0x249f06,_0x473aff,_0x2ec419,_0x4851b4,_0x126750,!![]),this[_0x44d9b8(0x176)][_0x44d9b8(0x1f6)](_0x31af11,_0x249f06,_0x473aff,_0x2ec419,_0x4851b4);},VisuMZ[_0x4ad706(0x19d)][_0x4ad706(0x1e6)]=function(_0x5bba68){const _0x2472fd=_0x4ad706;_0x5bba68=_0x5bba68['replace']('#','');_0x5bba68[_0x2472fd(0x150)]===0x3&&(_0x5bba68=_0x5bba68[0x0]+_0x5bba68[0x0]+_0x5bba68[0x1]+_0x5bba68[0x1]+_0x5bba68[0x2]+_0x5bba68[0x2]);var _0x5dfecc=parseInt(_0x5bba68[_0x2472fd(0x1a3)](0x0,0x2),0x10),_0x1d778c=parseInt(_0x5bba68[_0x2472fd(0x1a3)](0x2,0x4),0x10),_0x1f3b44=parseInt(_0x5bba68['substring'](0x4,0x6),0x10);return _0x2472fd(0x1d9)+_0x5dfecc+','+_0x1d778c+','+_0x1f3b44+','+_0x2472fd(0x1c2)+')';},VisuMZ[_0x4ad706(0x19d)][_0x4ad706(0x1b0)]=Window_Base['prototype'][_0x4ad706(0x154)],Window_Base['prototype'][_0x4ad706(0x154)]=function(_0x388fc6,_0x1149cf,_0x44da9c,_0x38b32e){const _0x1833c4=_0x4ad706;this[_0x1833c4(0x1a0)]&&this[_0x1833c4(0x1a0)]()?this[_0x1833c4(0x15a)](_0x388fc6,_0x1149cf,_0x44da9c,_0x38b32e):VisuMZ[_0x1833c4(0x19d)][_0x1833c4(0x1b0)][_0x1833c4(0x18a)](this,_0x388fc6,_0x1149cf,_0x44da9c,_0x38b32e);},Window_Base[_0x4ad706(0x1bc)][_0x4ad706(0x15a)]=function(_0x30e4a7,_0x4ed790,_0x35dd2f,_0x22f51b){const _0x4412cd=_0x4ad706;if(this[_0x4412cd(0x141)](_0x30e4a7)){this[_0x4412cd(0x160)]();const _0x5054e1=VisuMZ['ItemsEquipsCore'][_0x4412cd(0x1d7)][_0x4412cd(0x1aa)],_0xa8d2ee=_0x5054e1[_0x4412cd(0x202)],_0x1fbc11=_0xa8d2ee[_0x4412cd(0x156)]($gameParty['numItems'](_0x30e4a7));this[_0x4412cd(0x206)][_0x4412cd(0x1e2)]=_0x5054e1[_0x4412cd(0x1f5)],this[_0x4412cd(0x167)](_0x1fbc11,_0x4ed790,_0x35dd2f,_0x22f51b,'right'),this[_0x4412cd(0x148)]();}},VisuMZ[_0x4ad706(0x19d)][_0x4ad706(0x196)]=Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x162)],Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x162)]=function(_0xc1b192){const _0x23e1b5=_0x4ad706;this[_0x23e1b5(0x1a0)]()?this[_0x23e1b5(0x14a)](_0xc1b192):VisuMZ[_0x23e1b5(0x19d)]['Window_ItemList_placeItemNewLabel']['call'](this,_0xc1b192);},Window_ItemList[_0x4ad706(0x1bc)][_0x4ad706(0x14a)]=function(_0x52bca6){const _0x4b5207=_0x4ad706;if(!Imported[_0x4b5207(0x15e)])return;const _0x5ce900=this[_0x4b5207(0x1c0)](_0x52bca6);if(!_0x5ce900||!this[_0x4b5207(0x14f)]())return;if(!$gameParty['isNewItem'](_0x5ce900))return;const _0x15915b=this[_0x4b5207(0x17d)](_0x52bca6),_0x569225=_0x15915b['x'],_0x444682=_0x15915b['y'],_0x3add43=VisuMZ[_0x4b5207(0x1d2)][_0x4b5207(0x1d7)][_0x4b5207(0x143)][_0x4b5207(0x203)],_0x846f1e=VisuMZ['ItemsEquipsCore']['Settings'][_0x4b5207(0x143)][_0x4b5207(0x1af)];this['placeNewLabel'](_0x5ce900,_0x569225+_0x3add43,_0x444682+_0x846f1e);},VisuMZ[_0x4ad706(0x19d)][_0x4ad706(0x15f)]=Window_EquipItem[_0x4ad706(0x1bc)][_0x4ad706(0x1db)],Window_EquipItem[_0x4ad706(0x1bc)]['maxCols']=function(){const _0x326300=_0x4ad706;return this[_0x326300(0x1a0)]()?Window_ItemList[_0x326300(0x1bc)]['maxCols'][_0x326300(0x18a)](this):VisuMZ[_0x326300(0x19d)][_0x326300(0x15f)][_0x326300(0x18a)](this);},VisuMZ['VisualItemInv']['Window_EquipItem_colSpacing']=Window_EquipItem[_0x4ad706(0x1bc)]['colSpacing'],Window_EquipItem[_0x4ad706(0x1bc)][_0x4ad706(0x19b)]=function(){const _0x345725=_0x4ad706;if(this['usesVisualItemInventory']()){if(_0x345725(0x151)===_0x345725(0x1c6))_0x1ce3fe[_0x345725(0x19d)][_0x345725(0x17c)]['call'](this),this[_0x345725(0x204)]&&this[_0x345725(0x204)][_0x345725(0x1ea)](this[_0x345725(0x1a2)]());else return Window_ItemList[_0x345725(0x1bc)][_0x345725(0x19b)]['call'](this);}else return VisuMZ[_0x345725(0x19d)][_0x345725(0x1fc)][_0x345725(0x18a)](this);},Window_EquipItem[_0x4ad706(0x1bc)]['drawRemoveItem']=function(_0x1142ac){const _0x3ee48f=_0x4ad706,_0x49f65b=this['itemRectWithPadding'](_0x1142ac),_0x5b1ce3=VisuMZ[_0x3ee48f(0x1d2)]['Settings'][_0x3ee48f(0x16c)],_0x5af69d=_0x5b1ce3['RemoveEquipIcon'];this[_0x3ee48f(0x173)](![]),this[_0x3ee48f(0x201)](_0x5af69d,_0x49f65b),this[_0x3ee48f(0x173)](!![]);},VisuMZ[_0x4ad706(0x19d)]['Window_ShopSell_maxCols']=Window_ShopSell[_0x4ad706(0x1bc)][_0x4ad706(0x1db)],Window_ShopSell[_0x4ad706(0x1bc)]['maxCols']=function(){const _0x5edb7c=_0x4ad706;return this['usesVisualItemInventory']()?Window_ItemList[_0x5edb7c(0x1bc)][_0x5edb7c(0x1db)][_0x5edb7c(0x18a)](this):VisuMZ[_0x5edb7c(0x19d)]['Window_ShopSell_maxCols']['call'](this);},VisuMZ[_0x4ad706(0x19d)][_0x4ad706(0x1be)]=Window_ShopSell[_0x4ad706(0x1bc)]['colSpacing'],Window_ShopSell[_0x4ad706(0x1bc)]['colSpacing']=function(){const _0x5f8aed=_0x4ad706;return this[_0x5f8aed(0x1a0)]()?Window_ItemList[_0x5f8aed(0x1bc)][_0x5f8aed(0x19b)][_0x5f8aed(0x18a)](this):VisuMZ[_0x5f8aed(0x19d)]['Window_ShopSell_colSpacing'][_0x5f8aed(0x18a)](this);};function _0x2de1(_0xa20281,_0x1e9edd){return _0x2de1=function(_0xe335ed,_0x2de14c){_0xe335ed=_0xe335ed-0x140;let _0x56e954=_0xe335[_0xe335ed];return _0x56e954;},_0x2de1(_0xa20281,_0x1e9edd);}function Window_VisualItemTooltip(){const _0x1f0a7b=_0x4ad706;this[_0x1f0a7b(0x1b4)](...arguments);}Window_VisualItemTooltip[_0x4ad706(0x1bc)]=Object[_0x4ad706(0x1e5)](Window_Base['prototype']),Window_VisualItemTooltip[_0x4ad706(0x1bc)]['constructor']=Window_VisualItemTooltip,Window_VisualItemTooltip[_0x4ad706(0x1ee)]=VisuMZ[_0x4ad706(0x19d)][_0x4ad706(0x1d7)]['TooltipBgType'],Window_VisualItemTooltip[_0x4ad706(0x1f3)]=VisuMZ[_0x4ad706(0x19d)]['Settings'][_0x4ad706(0x171)],Window_VisualItemTooltip['FONT_SIZE']=VisuMZ[_0x4ad706(0x19d)][_0x4ad706(0x1d7)][_0x4ad706(0x197)],Window_VisualItemTooltip[_0x4ad706(0x16a)]=VisuMZ[_0x4ad706(0x19d)]['Settings'][_0x4ad706(0x14e)],Window_VisualItemTooltip['OFFSET_Y']=VisuMZ[_0x4ad706(0x19d)][_0x4ad706(0x1d7)][_0x4ad706(0x200)],Window_VisualItemTooltip[_0x4ad706(0x1bc)][_0x4ad706(0x1b4)]=function(_0x5a1cf2){const _0x73272f=_0x4ad706;this['_parentWindow']=_0x5a1cf2;const _0x21849d=new Rectangle(0x0,0x0,0x0,this[_0x73272f(0x17e)]());Window_Base[_0x73272f(0x1bc)][_0x73272f(0x1b4)][_0x73272f(0x18a)](this,_0x21849d),this[_0x73272f(0x19a)]=![],this[_0x73272f(0x15b)]=0xff,this[_0x73272f(0x19c)]=0xff,this[_0x73272f(0x1c5)]=null;},Window_VisualItemTooltip[_0x4ad706(0x1bc)][_0x4ad706(0x144)]=function(){this['padding']=0x0;},Window_VisualItemTooltip[_0x4ad706(0x1bc)][_0x4ad706(0x1ea)]=function(_0x3e7d18){const _0x4044ea=_0x4ad706;if(this['_item']===_0x3e7d18)return;this[_0x4044ea(0x1c5)]=_0x3e7d18,this[_0x4044ea(0x140)]();},Window_VisualItemTooltip[_0x4ad706(0x1bc)][_0x4ad706(0x140)]=function(){const _0x2fe530=_0x4ad706;this['contents'][_0x2fe530(0x1a7)]();if(!this[_0x2fe530(0x1c5)])return;this['resetFontSettings'](),this[_0x2fe530(0x206)][_0x2fe530(0x1e2)]=Window_VisualItemTooltip[_0x2fe530(0x1e3)];const _0x72659b=this['_item'][_0x2fe530(0x191)],_0x233946=this[_0x2fe530(0x1a4)](_0x72659b)+Window_VisualItemTooltip[_0x2fe530(0x1f3)];this['width']=Math[_0x2fe530(0x1fa)](_0x233946),this[_0x2fe530(0x1b5)](),this[_0x2fe530(0x206)][_0x2fe530(0x1e2)]=Window_VisualItemTooltip['FONT_SIZE'];if(Imported[_0x2fe530(0x15e)]){if(_0x2fe530(0x1bf)===_0x2fe530(0x1bf)){const _0x5ab2bc=ColorManager[_0x2fe530(0x172)](this[_0x2fe530(0x1c5)]);this['changeTextColor'](_0x5ab2bc);}else this[_0x2fe530(0x15d)](_0x598c32);}this[_0x2fe530(0x167)](_0x72659b,0x0,0x0,this['innerWidth'],'center'),this[_0x2fe530(0x184)](),this['setBackgroundType'](Window_VisualItemTooltip[_0x2fe530(0x1ee)]);},Window_VisualItemTooltip[_0x4ad706(0x1bc)][_0x4ad706(0x1f2)]=function(){const _0x401c79=_0x4ad706;Window_Base[_0x401c79(0x1bc)][_0x401c79(0x1f2)]['call'](this),this[_0x401c79(0x1ec)](),this['updatePosition']();},Window_VisualItemTooltip[_0x4ad706(0x1bc)][_0x4ad706(0x1ec)]=function(){const _0x4c3048=_0x4ad706,_0x3b1576=this['visible'];this['visible']=this[_0x4c3048(0x1c5)]&&this[_0x4c3048(0x183)]['active']&&this['_parentWindow'][_0x4c3048(0x1a6)]();if(_0x3b1576!==this[_0x4c3048(0x19a)]){if(_0x4c3048(0x146)===_0x4c3048(0x180))return this[_0x4c3048(0x1a0)]()?_0x4f9f1d['ceil'](this[_0x4c3048(0x185)]/this['itemHeight']()):_0x5e8b7f['VisualItemInv'][_0x4c3048(0x1ac)]['call'](this);else SceneManager[_0x4c3048(0x145)][_0x4c3048(0x1f0)](this);}},Window_VisualItemTooltip[_0x4ad706(0x1bc)][_0x4ad706(0x19f)]=function(){const _0x2c2413=_0x4ad706;if(!this[_0x2c2413(0x19a)])return;const _0x25a68c=SceneManager[_0x2c2413(0x145)][_0x2c2413(0x17a)],_0x3d750c=this[_0x2c2413(0x183)];let _0x259ae1=_0x3d750c['x']+_0x25a68c['x'],_0x5062fb=_0x3d750c['y']+_0x25a68c['y'];const _0x3fe057=_0x3d750c[_0x2c2413(0x1dc)],_0x44d625=_0x3d750c[_0x2c2413(0x1a9)];_0x259ae1+=_0x3fe057['x']+_0x3fe057[_0x2c2413(0x1ce)]/0x2-this[_0x2c2413(0x1ce)]/0x2+_0x44d625['x'],_0x5062fb+=_0x3fe057['y']-this[_0x2c2413(0x1b2)]+_0x44d625['y'];let _0x2a1bc5=_0x3d750c['y']+_0x25a68c['y']-this[_0x2c2413(0x1b2)]+_0x3d750c[_0x2c2413(0x1b9)];_0x2a1bc5+=Window_VisualItemTooltip[_0x2c2413(0x157)],_0x259ae1+=Window_VisualItemTooltip[_0x2c2413(0x16a)],_0x5062fb+=Window_VisualItemTooltip[_0x2c2413(0x157)],this['x']=Math[_0x2c2413(0x17b)](_0x259ae1)['clamp'](0x0,Graphics[_0x2c2413(0x1ce)]-this[_0x2c2413(0x1ce)]),this['y']=Math[_0x2c2413(0x17b)](_0x5062fb)[_0x2c2413(0x182)](_0x2a1bc5,Graphics['height']-this[_0x2c2413(0x1b2)]);};