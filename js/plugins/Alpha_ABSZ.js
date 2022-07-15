/*:
 * @plugindesc (v.0.6.1)[PRO] Active Battle System
 * @author Pheonix KageDesu
 * @target MZ
 * @url https://kdworkshop.net/plugins/alpha-abs-z/
 *
 * @help
 *
 * Alpha ABS Z plugin is still in development
 *
 * Documentation: https://github.com/KageDesu/Alpha-ABS-Z/wiki
 *
 * Quick Start guide:
 * https://github.com/KageDesu/Alpha-ABS-Z/wiki/For-beginners-(if-you-just-installed-plugin)
 * ----------------------------------------------------------- 
 * Alpha ABS Z plugin content:
 *
 * Plugin: js/plugins/Alpha_ABSZ.js
 * Fonts: fonts/
 *      -AABS_0.ttf
 *      -AABS_1.ttf
 *      -AABS_2.ttf
 *      -AABS_3.ttf
 * Images: img/Alpha/ *all files*
 *
 *
 * @param AABSZ @text @desc
 * 
 * @param inputSettings:struct
 * @text Controls Settings
 * @type struct<LInputSettings>
 * @default {"LMBMapTouchMode":"Default (move)","RMBMapTouchMode":"Turn","LMBTargetTouchMode":"Smart attack (Primary)","RMBTargetTouchMode":"Smart attack (Secondary)","moveType":"WASD and Arrows","isDiagonalMovement:b":"true","isStaticAtkRot:b":"true","keybingind":"","kbReload":"R","kbCommandMenu":"C","kbRotate":"Control"}
 * @desc Controls and keybingind settings
 * 
 * @param spacer|abs @text‏‏‎ ‎@desc ===============================================
 * 
 * @param absSettingsGroup
 * @text ABS System
 * 
 * @param colPrecissionLevel:int
 * @parent absSettingsGroup
 * @text Collision precision
 * @type number
 * @default 90
 * @min 0
 * @max 99
 * @desc The higher the value, the easier it is to hit the target in close range combat
 * 
 * @param spacer|common @text‏‏‎ ‎@desc ===============================================
 * 
 * @param commonSettingsGroup
 * @text Common Parameters
 * 
 * @param fonts:strA
 * @parent commonSettingsGroup
 * @text Fonts
 * @type text[]
 * @default []
 * @desc Font files names for preload (from fonts\ folder), without extension
 * 
 * @param isSaveUIEditsGlobal:bool
 * @parent commonSettingsGroup
 * @type boolean
 * @text Is global UI?
 * @on Yes (global)
 * @off No (only savegame)
 * @default false
 * @desc If True - changes made to UI (via UI Editor or script calls) will saves globaly and applies again when game starts
 * 
 * @param spacer|popUpSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param popUpDamageSettingsGroup
 * @text Pop Up Settings
 * 
 * @param isShowPopUp:bool
 * @parent popUpDamageSettingsGroup
 * @type boolean
 * @text Is Enable?
 * @on Yes (enabled)
 * @off No (disabled)
 * @default true
 * @desc Is Pop Up system enabled? false - not any Pop Up's at all
 * 
 * @param popUpTextForMiss
 * @parent popUpDamageSettingsGroup
 * @text Text for Miss
 * @default Miss
 * @desc Text for Miss PopUp
 * 
 * @param popUpExpSettings:struct
 * @parent popUpDamageSettingsGroup
 * @text Experience Pop Up
 * @type struct<LDPUExp>
 * @default {"active:b":"true","styleId":"Experience","textFormat":"+%1 exp","aboveChar:b":"false","bindToChar:b":"false"}
 * @desc Settings for Experience Pop Up
 * 
 * @param popUpDamageTable:structA
 * @parent popUpDamageSettingsGroup
 * @text Pop Up Table
 * @type struct<LDamagePopUpVisualSettings>[]
 * @default ["{\"id\":\"Miss_For_All\",\"randDX:int\":\"15\",\"randDY:int\":\"12\",\"stayTime:int\":\"13\",\"changeFontSize:int\":\"20\",\"noFlyUp:bool\":\"false\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_1\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#E6E6E6\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Heal_For_All\",\"randDX:int\":\"15\",\"randDY:int\":\"10\",\"stayTime:int\":\"12\",\"changeFontSize:int\":\"22\",\"noFlyUp:bool\":\"true\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#80FF00\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Damage_HP_For_Enemy\",\"randDX:int\":\"15\",\"randDY:int\":\"10\",\"stayTime:int\":\"12\",\"changeFontSize:int\":\"22\",\"noFlyUp:bool\":\"false\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#FFFFFF\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Damage_HP_For_Player\",\"randDX:int\":\"20\",\"randDY:int\":\"5\",\"stayTime:int\":\"12\",\"changeFontSize:int\":\"21\",\"noFlyUp:bool\":\"false\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"17\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#e3483d\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Damage_HP_For_Enemy_Critical\",\"randDX:int\":\"15\",\"randDY:int\":\"10\",\"stayTime:int\":\"14\",\"changeFontSize:int\":\"22\",\"noFlyUp:bool\":\"true\",\"noFadeOut:bool\":\"true\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"-5\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"26\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#F3E107\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Damage_HP_For_Player_Critical\",\"randDX:int\":\"20\",\"randDY:int\":\"5\",\"stayTime:int\":\"14\",\"changeFontSize:int\":\"21\",\"noFlyUp:bool\":\"true\",\"noFadeOut:bool\":\"true\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"24\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#FF0000\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Damage_Other_For_All\",\"randDX:int\":\"15\",\"randDY:int\":\"10\",\"stayTime:int\":\"12\",\"changeFontSize:int\":\"22\",\"noFlyUp:bool\":\"false\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#008080\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Experience\",\"randDX:int\":\"15\",\"randDY:int\":\"12\",\"stayTime:int\":\"14\",\"changeFontSize:int\":\"20\",\"noFlyUp:bool\":\"false\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"-10\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_1\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"24\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#a365e6\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}"]
 * @desc Damage (skills) PopUp's visual settings
 * 
 * @param spacer|buffsStatesSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param buffsStatesSettingsGroup
 * @text Buffs And States Settings
 * 
 * @param isShowBuffsOnUI:bool
 * @parent buffsStatesSettingsGroup
 * @type boolean
 * @text Is show Buffs on UI?
 * @on Yes (show)
 * @off No
 * @default true
 * @desc Show player actor's buffs on UI (left top corner by default)?
 * 
 * @param buffsIconsPositions:structA
 * @parent isShowBuffsOnUI:bool
 * @type struct<XY>[]
 * @text Buffs positions
 * @default ["{\"x:int\":\"4\",\"y:int\":\"4\"}","{\"x:int\":\"42\",\"y:int\":\"4\"}","{\"x:int\":\"80\",\"y:int\":\"4\"}","{\"x:int\":\"118\",\"y:int\":\"4\"}"]
 * @desc Buffs icons positions. You can add or remove icons positions. Positions count = visible buffs count.
 * 
 * @param buffIconSettings:struct
 * @parent isShowBuffsOnUI:bool
 * @type struct<LStateIconSettings>
 * @text Visual Settings
 * @default {"visible:b":"true","position:s":"{\"x:int\":\"0\",\"y:int\":\"0\"}","isCanBeEdited:b":"true","textFormat:str":" *1","text:struct":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"38\\\",\\\"h:int\\\":\\\"14\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"-2\\\",\\\"y:int\\\":\\\"-4\\\"}\",\"alignment:str\":\"right\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_1\\\",\\\"size:int\\\":\\\"16\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#fafdec\"}","icon:s":"{\"visible:bool\":\"true\",\"index:i\":\"0\",\"size:i\":\"32\"}"}
 * @desc [PRO] Buff icon visual settings
 * 
 * @param isShowStatsOnUI:bool
 * @parent buffsStatesSettingsGroup
 * @type boolean
 * @text Is show States on UI?
 * @on Yes (show)
 * @off No
 * @default true
 * @desc Show player actor's states on UI (left top corner by default)?
 * 
 * @param statesIconsPositions:structA
 * @parent isShowStatsOnUI:bool
 * @type struct<XY>[]
 * @text States positions
 * @default ["{\"x:int\":\"4\",\"y:int\":\"40\"}","{\"x:int\":\"42\",\"y:int\":\"40\"}","{\"x:int\":\"80\",\"y:int\":\"40\"}","{\"x:int\":\"118\",\"y:int\":\"40\"}"]
 * @desc States icons positions. You can add or remove icons positions. Positions count = visible states count.
 * 
 * @param statsIconSettings:struct
 * @parent isShowStatsOnUI:bool
 * @type struct<LStateIconSettings>
 * @text Visual Settings
 * @default {"visible:b":"true","position:s":"{\"x:int\":\"0\",\"y:int\":\"0\"}","isCanBeEdited:b":"true","textFormat:str":" *1","text:struct":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"38\\\",\\\"h:int\\\":\\\"14\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"alignment:str\":\"right\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_1\\\",\\\"size:int\\\":\\\"16\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#fafdec\"}","icon:s":"{\"visible:bool\":\"true\",\"index:i\":\"0\",\"size:i\":\"32\"}"}
 * @desc [PRO] Status icon visual settings
 * 
 * 
 * @param spacer|skillPanel @text‏‏‎ ‎@desc ===============================================
 * 
 * @param skillPanelSettingsGroup
 * @text Skill Panel settings
 * 
 * @param isAddNewSkillsOnPanelOnLearning:bool
 * @parent skillPanelSettingsGroup
 * @text Add Skill On Learning?
 * @type boolean
 * @on Add
 * @off No
 * @default true
 * @desc When player learn new skill, add skill on skills panel automatically?
 * 
 * @param isAddNewItemOnPanelOnPickup:bool
 * @parent skillPanelSettingsGroup
 * @text Add Item On Pick up?
 * @type boolean
 * @on Add
 * @off No
 * @default true
 * @desc When player pick up new item, add item on skills panel automatically?
 * 
 * @param isRemoveItemFromPanelIfZeroCount:bool
 * @parent skillPanelSettingsGroup
 * @text Remove Zero Items?
 * @type boolean
 * @default false
 * @desc Remove an item from the skill panel if the count of item is 0 
 * 
 * @param isUseOutlineEffect:bool
 * @parent skillPanelSettingsGroup
 * @text Outline effect?
 * @type boolean
 * @on Yes (quality)
 * @off No (performance)
 * @default true
 * @desc Outline glow effects for skill slots (when activated, ready, disabled) Turn OFF for better performance.
 * 
 * @param primaryAttackSlot:struct
 * @parent skillPanelSettingsGroup
 * @text Primary Attack Slot
 * @type struct<LSkillSlotItem>
 * @default {"position:struct":"{\"x:e\":\"218\",\"y:e\":\"583\"}","symbol":"E"}
 * @desc Required. Skill slot for primary attack (main weapon)
 * 
 * @param secondaryAttackSlot:struct
 * @parent skillPanelSettingsGroup
 * @text Secondary Attack Slot
 * @type struct<LSkillSlotItem>
 * @default {"position:struct":"{\"x:e\":\"255\",\"y:e\":\"583\"}","symbol":"Q"}
 * @desc Required. Skill slot for secondary attack
 * 
 * @param allSkillSlots:structA
 * @parent skillPanelSettingsGroup
 * @text Skill Slots
 * @type struct<LSkillSlotItem>[]
 * @default ["{\"position:struct\":\"{\\\"x:e\\\":\\\"302\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"1\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"339\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"2\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"376\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"3\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"413\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"4\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"450\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"5\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"487\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"6\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"524\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"7\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"561\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"8\"}"]
 * @desc Optional. Skill slots.
 * 
 * @param skillSlotVisualSettings:s
 * @parent skillPanelSettingsGroup
 * @text Skill Slot Visual
 * @type struct<LSkillSlotItemVisual> 
 * @desc Skill Slot visual settings
 * @default {"visible:bool":"true","isCanBeEdited:bool":"true","isHideWithMessage:bool":"true","outlineGroup":"","outlineMargins:s":"{\"x:int\":\"-2\",\"y:int\":\"-2\"}","outlinePulseSpeed:i":"40","selectedOutlineColor:str":"#fcba03","clickedOutlineColor:str":"#0b03fc","readyOutlineColor:str":"#21b53c","badOutlineColor:str":"#d61a1a","icon:s":"{\"visible:b\":\"true\",\"size:i\":\"32\",\"index:i\":\"0\"}","iconMargins:s":"{\"x:int\":\"2\",\"y:int\":\"2\"}","symbolText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"20\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"18\\\",\\\"y:int\\\":\\\"22\\\"}\",\"alignment:str\":\"right\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_1\\\",\\\"size:int\\\":\\\"14\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#e0cfbf\"}","timeText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"32\\\",\\\"h:int\\\":\\\"32\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"2\\\",\\\"y:int\\\":\\\"2\\\"}\",\"alignment:str\":\"center\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_1\\\",\\\"size:int\\\":\\\"12\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#fcba03\"}","countText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"32\\\",\\\"h:int\\\":\\\"32\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"-6\\\"}\",\"alignment:str\":\"right\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_1\\\",\\\"size:int\\\":\\\"12\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#eb852d\"}"}
 * 
 * 
 * @param spacer|playerAndParty @text‏‏‎ ‎@desc ===============================================
 * 
 * @param playerAndPartySettingsGroup
 * @text Player and Party settings
 * 
 * @param isShakeScreenWhenPlayerGetDamage:bool
 * @parent playerAndPartySettingsGroup
 * @text Is Shake on Damage?
 * @type boolean
 * @on Shake
 * @off No
 * @default true
 * @desc Is shake screen when player receive damage?
 * 
 * @param playerVisualSettingsGroup
 * @parent playerAndPartySettingsGroup
 * @text UI Elements Settings
 * 
 * @param pvsGaugesSubGroup
 * @parent playerVisualSettingsGroup
 * @text Gauges
 * 
 * @param playerHpGaugeVisualSettings:struct
 * @parent pvsGaugesSubGroup
 * @text HP Gauge Settings
 * @type struct<LActorGauge>
 * @default {"visible:bool":"true","position:struct":"{\"x:e\":\"304\",\"y:e\":\"560\"}","label":"Player_HPGaugeLabel","labelMargins:struct":"{\"x:int\":\"-33\",\"y:int\":\"5\"}","isCanBeEdited:bool":"true","isHideWithMessage:bool":"true","text:struct":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"100\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"10\\\",\\\"y:int\\\":\\\"0\\\"}\",\"alignment:str\":\"left\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_0\\\",\\\"size:int\\\":\\\"13\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#edead8\"}","gauge:struct":"{\"visible:bool\":\"true\",\"vertical:bool\":\"false\",\"fill\":\"Player_HPGauge\",\"foreground\":\"\",\"mask\":\"\",\"backColor:css\":\"#000000\",\"backOpacity:int\":\"160\"}"}
 * @desc Player HP gauge visual settings
 * 
 * @param playerMpGaugeVisualSettings:struct
 * @parent pvsGaugesSubGroup
 * @text MP Gauge Settings
 * @type struct<LActorGauge>
 * @default {"visible:bool":"true","position:struct":"{\"x:e\":\"454\",\"y:e\":\"560\"}","label":"Player_MPGaugeLabel","labelMargins:struct":"{\"x:int\":\"-37\",\"y:int\":\"5\"}","isCanBeEdited:bool":"true","isHideWithMessage:bool":"true","text:struct":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"100\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"10\\\",\\\"y:int\\\":\\\"0\\\"}\",\"alignment:str\":\"left\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_0\\\",\\\"size:int\\\":\\\"13\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#edead8\"}","gauge:struct":"{\"visible:bool\":\"true\",\"vertical:bool\":\"false\",\"fill\":\"Player_MPGauge\",\"foreground\":\"\",\"mask\":\"\",\"backColor:css\":\"#000000\",\"backOpacity:int\":\"160\"}"}
 * @desc Player MP gauge visual settings
 * 
 * @param playerTpGaugeVisualSettings:struct
 * @parent pvsGaugesSubGroup
 * @text TP Gauge Settings
 * @type struct<LActorGauge>
 * @default {"visible:bool":"false","position:struct":"{\"x:e\":\"454\",\"y:e\":\"560\"}","label":"Player_TPGaugeLabel","labelMargins:struct":"{\"x:int\":\"-37\",\"y:int\":\"5\"}","isCanBeEdited:bool":"true","isHideWithMessage:bool":"true","text:struct":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"100\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"10\\\",\\\"y:int\\\":\\\"0\\\"}\",\"alignment:str\":\"left\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_0\\\",\\\"size:int\\\":\\\"13\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#edead8\"}","gauge:struct":"{\"visible:bool\":\"true\",\"vertical:bool\":\"false\",\"fill\":\"Player_TPGauge\",\"foreground\":\"\",\"mask\":\"\",\"backColor:css\":\"#000000\",\"backOpacity:int\":\"160\"}"}
 * @desc Player TP gauge visual settings
 * 
 * @param spacer|enemies @text‏‏‎ ‎@desc ===============================================
 * 
 * @param enemySettingsGroup
 * @text Enemies settings
 * 
 * @param enemyVisualSettingsGroup
 * @parent enemySettingsGroup
 * @text UI Elements Settings
 * 
 * @param enemyVSGaugesSubGroup
 * @parent enemyVisualSettingsGroup
 * @text Gauges
 * 
 * @param enemyMiniHpGaugeSettings:struct
 * @parent enemyVSGaugesSubGroup
 * @text Mini HP Gauge Settings
 * @type struct<LActorGauge>
 * @default {"visible:bool":"true","position:struct":"{\"x:e\":\"-19\",\"y:e\":\"-56\"}","label":"","labelMargins:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}","isCanBeEdited:bool":"false","isHideWithMessage:bool":"false","text:struct":"{\"visible:bool\":\"false\",\"size:struct\":\"{\\\"w:int\\\":\\\"100\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"alignment:str\":\"center\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_0\\\",\\\"size:int\\\":\\\"13\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#edead8\"}","gauge:struct":"{\"visible:bool\":\"true\",\"vertical:bool\":\"false\",\"fill\":\"Event_HPGauge2\",\"foreground\":\"\",\"mask\":\"\",\"backColor:css\":\"#000000\",\"backOpacity:int\":\"160\"}"}
 * @desc HP gauge above enemies on map (default one)
 * 
 * @param enemyMiniHpGaugesCustoms:structA
 * @parent enemyVSGaugesSubGroup
 * @text Customs
 * @type struct<LEnemyCustomMiniGauge>[]
 * @default []
 * @desc [PRO] You can assign custom gauge to certain enemy by <miniHpGaugeStyle> ABS parameter
 * 
 * @param enemyInfoVisualSettings:struct
 * @text Enemy Info
 * @type struct<LEnemyInfoVisual>
 * @parent enemyVisualSettingsGroup
 * @desc Enemy Info visual settings [information when you select\hover enemy]
 * @default {"visible:bool":"true","position:struct":"{\"x:e\":\"640\",\"y:e\":\"66\"}","image":"Enemy_Background","isCanBeEdited:bool":"true","isHideWithMessage:bool":"true","nameFormat":" *2","hpText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"100\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"12\\\",\\\"y:int\\\":\\\"28\\\"}\",\"alignment:str\":\"left\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_0\\\",\\\"size:int\\\":\\\"13\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#edead8\"}","gauge:s":"{\"visible:bool\":\"true\",\"vertical:bool\":\"false\",\"fill\":\"Player_HPGauge\",\"foreground\":\"\",\"mask\":\"\",\"backColor:css\":\"#000000\",\"backOpacity:int\":\"160\"}","gaugeMargins:s":"{\"x:int\":\"6\",\"y:int\":\"28\"}","face:s":"{\"visible:bool\":\"true\",\"faceName\":\"\",\"faceIndex:i\":\"0\",\"mirror:b\":\"false\",\"size:i\":\"74\",\"margins:s\":\"{\\\"x:int\\\":\\\"92\\\",\\\"y:int\\\":\\\"10\\\"}\"}","battleState:s":"{\"visible:bool\":\"true\",\"image\":\"Enemy_BattleState_Free\",\"margins:s\":\"{\\\"x:int\\\":\\\"142\\\",\\\"y:int\\\":\\\"60\\\"}\"}","foregroundImage:s":"{\"visible:bool\":\"true\",\"image\":\"\",\"margins:s\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\"}"}
 * 
 * @param enemies_noPassVision:intA
 * @parent enemySettingsGroup
 * @text No Pass Vision Regions
 * @type number[]
 * @min 1
 * @max 255
 * @default []
 * @desc The numbers of the regions through which the enemies can not see. Global, for all enemies.
 * 
 * @param enemies_noPassVision2:intA
 * @parent enemySettingsGroup
 * @text No Pass Vision Terrains
 * @type number[]
 * @min 1
 * @max 7
 * @default []
 * @desc The terrains tags (1-7) through which the enemies can not see. Global, for all enemies.
 * 
 * @param enemiesSpawnSettingsGroup
 * @parent enemySettingsGroup
 * @text Spawning Settings
 * 
 * @param enemies_spawn_mapId:int
 * @parent enemiesSpawnSettingsGroup
 * @text Spawn Map ID
 * @type number
 * @min 0
 * @default 0
 * @desc [Required] Map ID with events templates for spawning. 0 - spawn system not will works
 * 
 * @param enemies_spawn_aboveEvents:b
 * @parent enemiesSpawnSettingsGroup
 * @text Is spawn above events?
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 * @desc Is spawning enemies above another events (or enemies) allowed?
 * 
 * @param enemies_spawn_cacheAllowed:b
 * @parent enemiesSpawnSettingsGroup
 * @text Is use region cache?
 * @type boolean
 * @on Yes (more performance)
 * @off No
 * @default true
 * @desc If you dinamycally change region Id's on map during game, set this parameter to NO (false)
 * 
 * @param spacer|map @text‏‏‎ ‎@desc ===============================================
 * 
 * @param mapSettingsGroup
 * @text Map settings
 * 
 * @param mapScrolling:s
 * @text Map Scrolling
 * @parent mapSettingsGroup
 * @type struct<LMapScrollSettings>
 * @default {"isEnabled:b":"false","scrollZone:int":"10","speed:int":"5","delay:int":"60","resetOnMove:b":"true","resetOnAction:b":"true"}
 * @desc Mouse map scrolling settings
 * 
 * @param map_noProjectilePass:intA
 * @parent mapSettingsGroup
 * @text No Pass Projectiles Regions
 * @type number[]
 * @min 1
 * @max 255
 * @default []
 * @desc The numbers of the regions through which the projectiles can not pass. Global, for all projectiles.
 * 
 * @param map_noProjectilePass2:intA
 * @parent mapSettingsGroup
 * @text No Pass Projectiles Terrains
 * @type number[]
 * @min 1
 * @max 7
 * @default []
 * @desc The terrains tags (1-7) through which the projectiles can not pass. Global, for all projectiles.
 * 
 * @param miniHpGaugeSetings:s
 * @text Mini HP Gauges
 * @parent mapSettingsGroup
 * @type struct<LMiniHpGaugeSettings>
 * @default {"active:b":"true","showOnlyOnHover:b":"true","showOnDamage:b":"true"}
 * @desc Mini HP gauges above ABS events settings
 * 
 * 
 * 
 * 
 * 
 * @command ABSEventSettings
 * @text ABS Enemy Configurate
 * @desc Configurate enemy ABS parameters for this certaint event
 * 
 * @arg MainGroup
 * @text Main Group
 * 
 * @arg viewRadius
 * @parent MainGroup
 * @text View Radius
 * @type number
 * @min 1
 * @max 100
 * @default 5
 * @desc On how many map cells sees enemy
 * 
 * @arg returnRadius
 * @parent MainGroup
 * @text  Return Radius
 * @type number
 * @min 1
 * @max 100
 * @default 12
 * @desc How far can the enemy move away from the place where the battle begins
 * 
 * @arg onDeath
 * @parent MainGroup
 * @text On Death
 * @type text
 * @default
 * @desc ABS Script action (SAction), called when enemy is die
 * 
 * @arg MapGroup
 * @text Map Group
 * 
 * @arg shatterEffect
 * @parent MapGroup
 * @text Shatter Effect?
 * @type boolean
 * @default true
 * @desc Is play sprite shatter effect when enemy is die?
 * 
 * @arg deadSwitch
 * @parent MapGroup
 * @text Dead Switch
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @option 0
 * @default 0
 * @desc Will turn ON this self.switch when enemy is die ( 0 - nothing )
 * 
 * @arg eraseOnDead
 * @parent deadSwitch
 * @text Erase on Dead?
 * @type boolean
 * @default true
 * @desc Erase Event when enemy is die? Only if NOT HAVE Dead Switch
 * 
 * @arg VisualGroup
 * @text Visual Group
 * 
 * @arg UIInfo
 * @parent VisualGroup
 * @text Show UI Info?
 * @type boolean
 * @default true
 * @desc Is show portrait UI when enemy is under cursor?
 * 
 * @arg faceName
 * @parent VisualGroup
 * @text Face Name
 * @type file
 * @required 1
 * @dir img\faces
 * @default
 * @desc Image name for portrait UI
 * 
 * @arg faceIndex
 * @parent faceName
 * @text Face Index
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Face index on face image for portrait UI
 * 
 * @arg AnimationGroup
 * @text Animation Group
 * 
 * @arg hitAnimationId
 * @parent AnimationGroup
 * @text Hit Animation
 * @type animation
 * @default 1
 * @desc Hit animation on character when enemy attacks
 * 
 */
/*:ru
 * @plugindesc (v.0.6.1)[PRO] Активная боевая система
 * @author Pheonix KageDesu
 * @target MZ
 * @url https://kdworkshop.net/plugins/alpha-abs-z/
 *
 * @help
 *
 * Плагин Alpha ABS Z находится в разработке
 *
 * Документация: https://github.com/KageDesu/Alpha-ABS-Z/wiki
 *
 * С чего начать:
 * https://github.com/KageDesu/Alpha-ABS-Z/wiki/For-beginners-(if-you-just-installed-plugin)
 * ----------------------------------------------------------- 
 * Содержимое плагина (необходимые файлы):
 *
 * Файл плагина: js/plugins/Alpha_ABSZ.js
 * Шрифты в папке: fonts/
 *      -AABS_0.ttf
 *      -AABS_1.ttf
 *      -AABS_2.ttf
 *      -AABS_3.ttf
 * Изображения: img/Alpha/ *all files*
 *
 * Скопируйте эти файлы и папки в себе проект чтобы Alpha ABS Z работал корректно
 *
 * @param AABSZ @text @desc
 * 
 * @param inputSettings:struct
 * @text Управление
 * @type struct<LInputSettings>
 * @default {"LMBMapTouchMode":"Default (move)","RMBMapTouchMode":"Turn","LMBTargetTouchMode":"Smart attack (Primary)","RMBTargetTouchMode":"Smart attack (Secondary)","moveType":"WASD and Arrows","isDiagonalMovement:b":"true","isStaticAtkRot:b":"true","keybingind":"","kbReload":"R","kbCommandMenu":"C","kbRotate":"Control"}
 * @desc Настройки управления и привязки кнопок
 * 
 * @param spacer|abs @text‏‏‎ ‎@desc ===============================================
 * 
 * @param absSettingsGroup
 * @text Система
 * 
 * @param colPrecissionLevel:int
 * @parent absSettingsGroup
 * @text Точность коллизий
 * @type number
 * @default 90
 * @min 0
 * @max 99
 * @desc Чем выше значение, тем легче поразить (попасть по) цель в ближнем бою
 * 
 * @param spacer|common @text‏‏‎ ‎@desc ===============================================
 * 
 * @param commonSettingsGroup
 * @text Общие настройки
 * 
 * @param fonts:strA
 * @parent commonSettingsGroup
 * @text Шрифты
 * @type text[]
 * @default []
 * @desc Дополнительные шрифты для Вашей игры (из папки fonts\ folder), указывать без расширения (только название)
 * 
 * @param isSaveUIEditsGlobal:bool
 * @parent commonSettingsGroup
 * @type boolean
 * @text Глобальный UI?
 * @on Да (глобальный)
 * @off Нет (файл сохранения)
 * @default false
 * @desc Если ВКЛ, то изменения UI (через UI Editor или вызовом скриптов) будут сохранены в конфиг и применены при старте игры снова
 * 
 * @param spacer|popUpSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param popUpDamageSettingsGroup
 * @text Всплывающие сообщения
 * 
 * @param isShowPopUp:bool
 * @parent popUpDamageSettingsGroup
 * @type boolean
 * @text Включены?
 * @on Да 
 * @off Нет 
 * @default true
 * @desc Если Нет (ВЫКЛ), то в игре не будет всплывающих сообщений боевой системы АБС
 * 
 * @param popUpTextForMiss
 * @parent popUpDamageSettingsGroup
 * @text Промах
 * @default Промах
 * @desc Текст для промаха
 * 
 * @param popUpExpSettings:struct
 * @parent popUpDamageSettingsGroup
 * @text Опыт
 * @type struct<LDPUExp>
 * @default {"active:b":"true","styleId":"Experience","textFormat":"+%1 exp","aboveChar:b":"false","bindToChar:b":"false"}
 * @desc Настройки всплывающего сообщения с опытом
 * 
 * @param popUpDamageTable:structA
 * @parent popUpDamageSettingsGroup
 * @text Таблица
 * @type struct<LDamagePopUpVisualSettings>[]
 * @default ["{\"id\":\"Miss_For_All\",\"randDX:int\":\"15\",\"randDY:int\":\"12\",\"stayTime:int\":\"13\",\"changeFontSize:int\":\"20\",\"noFlyUp:bool\":\"false\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_1\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#E6E6E6\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Heal_For_All\",\"randDX:int\":\"15\",\"randDY:int\":\"10\",\"stayTime:int\":\"12\",\"changeFontSize:int\":\"22\",\"noFlyUp:bool\":\"true\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#80FF00\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Damage_HP_For_Enemy\",\"randDX:int\":\"15\",\"randDY:int\":\"10\",\"stayTime:int\":\"12\",\"changeFontSize:int\":\"22\",\"noFlyUp:bool\":\"false\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#FFFFFF\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Damage_HP_For_Player\",\"randDX:int\":\"20\",\"randDY:int\":\"5\",\"stayTime:int\":\"12\",\"changeFontSize:int\":\"21\",\"noFlyUp:bool\":\"false\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"17\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#e3483d\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Damage_HP_For_Enemy_Critical\",\"randDX:int\":\"15\",\"randDY:int\":\"10\",\"stayTime:int\":\"14\",\"changeFontSize:int\":\"22\",\"noFlyUp:bool\":\"true\",\"noFadeOut:bool\":\"true\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"-5\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"26\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#F3E107\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Damage_HP_For_Player_Critical\",\"randDX:int\":\"20\",\"randDY:int\":\"5\",\"stayTime:int\":\"14\",\"changeFontSize:int\":\"21\",\"noFlyUp:bool\":\"true\",\"noFadeOut:bool\":\"true\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"24\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#FF0000\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Damage_Other_For_All\",\"randDX:int\":\"15\",\"randDY:int\":\"10\",\"stayTime:int\":\"12\",\"changeFontSize:int\":\"22\",\"noFlyUp:bool\":\"false\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_3\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#008080\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}","{\"id\":\"Experience\",\"randDX:int\":\"15\",\"randDY:int\":\"12\",\"stayTime:int\":\"14\",\"changeFontSize:int\":\"20\",\"noFlyUp:bool\":\"false\",\"noFadeOut:bool\":\"false\",\"text:struct\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"-10\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color:css\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"AABS_1\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"24\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"textColor:css\\\":\\\"#a365e6\\\"}\",\"image:struct\":\"{\\\"name\\\":\\\"\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"fadeInSpeed:int\\\":\\\"20\\\"}\"}"]
 * @desc Настройки всплывающих сообщений для разных видов урона и навыков
 * 
 * @param spacer|buffsStatesSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param buffsStatesSettingsGroup
 * @text Бафы и состояния
 * 
 * @param isShowBuffsOnUI:bool
 * @parent buffsStatesSettingsGroup
 * @type boolean
 * @text Показывать бафы на UI?
 * @on Да
 * @off Нет
 * @default true
 * @desc Показывать активные бафы персонажа игрока на экране? (левый вверхний угол - по умолчанию)
 * 
 * @param buffsIconsPositions:structA
 * @parent isShowBuffsOnUI:bool
 * @type struct<XY>[]
 * @text Позиции
 * @default ["{\"x:int\":\"4\",\"y:int\":\"4\"}","{\"x:int\":\"42\",\"y:int\":\"4\"}","{\"x:int\":\"80\",\"y:int\":\"4\"}","{\"x:int\":\"118\",\"y:int\":\"4\"}"]
 * @desc Позиции иконок текущих бафов игрока. Можно добавлять или удалять. Кол-во позиций = сколько бафов будет на экране.
 * 
 * @param buffIconSettings:struct
 * @parent isShowBuffsOnUI:bool
 * @type struct<LStateIconSettings>
 * @text Настройки
 * @default {"visible:b":"true","position:s":"{\"x:int\":\"0\",\"y:int\":\"0\"}","isCanBeEdited:b":"true","textFormat:str":"%1","textFormatA:str":"A:%1","text:struct":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"38\\\",\\\"h:int\\\":\\\"14\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"-2\\\",\\\"y:int\\\":\\\"-4\\\"}\",\"alignment:str\":\"right\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_1\\\",\\\"size:int\\\":\\\"16\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#fafdec\"}","icon:s":"{\"visible:bool\":\"true\",\"index:i\":\"0\",\"size:i\":\"32\"}"}
 * @desc [PRO] Визуальные настройки отображения бафов
 * 
 * @param isShowStatsOnUI:bool
 * @parent buffsStatesSettingsGroup
 * @type boolean
 * @text Показывать состояния на UI?
 * @on Да
 * @off Нет
 * @default true
 * @desc Показывать активные состояния персонажа игрока на экране? (левый вверхний угол - по умолчанию)
 * 
 * @param statesIconsPositions:structA
 * @parent isShowStatsOnUI:bool
 * @type struct<XY>[]
 * @text Позиции
 * @default ["{\"x:int\":\"4\",\"y:int\":\"40\"}","{\"x:int\":\"42\",\"y:int\":\"40\"}","{\"x:int\":\"80\",\"y:int\":\"40\"}","{\"x:int\":\"118\",\"y:int\":\"40\"}"]
 * @desc Позиции иконок текущих состояний игрока. Можно добавлять или удалять. Кол-во позиций = сколько состояний будет на экране.
 * 
 * @param statsIconSettings:struct
 * @parent isShowStatsOnUI:bool
 * @type struct<LStateIconSettings>
 * @text Настройки
 * @default {"visible:b":"true","position:s":"{\"x:int\":\"0\",\"y:int\":\"0\"}","isCanBeEdited:b":"true","textFormat:str":"%1","textFormatA:str":"A:%1","text:struct":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"38\\\",\\\"h:int\\\":\\\"14\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"alignment:str\":\"right\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_1\\\",\\\"size:int\\\":\\\"16\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#fafdec\"}","icon:s":"{\"visible:bool\":\"true\",\"index:i\":\"0\",\"size:i\":\"32\"}"}
 * @desc [PRO] Визуальные настройки отображения состояний
 * 
 * 
 * @param spacer|skillPanel @text‏‏‎ ‎@desc ===============================================
 * 
 * @param skillPanelSettingsGroup
 * @text Панель навыков
 * 
 * @param isAddNewSkillsOnPanelOnLearning:bool
 * @parent skillPanelSettingsGroup
 * @text Добавлять при изучении?
 * @type boolean
 * @on Добавлять
 * @off Нет
 * @default true
 * @desc Когда игрок изучил новый навык, добавлять его автоматически на панель навыков?
 * 
 * @param isAddNewItemOnPanelOnPickup:bool
 * @parent skillPanelSettingsGroup
 * @text Добавлять предмет?
 * @type boolean
 * @on Добавлять
 * @off Нет
 * @default true
 * @desc Когда игрок получил предмет, добавлять его автоматически на панель навыков?
 * 
 * @param isRemoveItemFromPanelIfZeroCount:bool
 * @parent skillPanelSettingsGroup
 * @text Удалять предметы?
 * @type boolean
 * @default false
 * @desc Удалять предмет из панели навыков, если предмета нет больше в инвентаре? (количество = 0)
 * 
 * @param isUseOutlineEffect:bool
 * @parent skillPanelSettingsGroup
 * @text Эффект подсветки?
 * @type boolean
 * @on Да (качество)
 * @off Нет (+ производительность)
 * @default true
 * @desc Эффект подсветки слотов навыков. ВЫКЛ чтобы увеличить производительность.
 * 
 * @param primaryAttackSlot:struct
 * @parent skillPanelSettingsGroup
 * @text Главная атака
 * @type struct<LSkillSlotItem>
 * @default {"position:struct":"{\"x:e\":\"218\",\"y:e\":\"583\"}","symbol":"E"}
 * @desc Обязательный. Слот навыка для главной атаки (левая кнопка мыши)
 * 
 * @param secondaryAttackSlot:struct
 * @parent skillPanelSettingsGroup
 * @text Вторичная атака
 * @type struct<LSkillSlotItem>
 * @default {"position:struct":"{\"x:e\":\"255\",\"y:e\":\"583\"}","symbol":"Q"}
 * @desc Обязательный. Слот навыка для вторичной атаки (правая кнопка мыши)
 * 
 * @param allSkillSlots:structA
 * @parent skillPanelSettingsGroup
 * @text Слоты
 * @type struct<LSkillSlotItem>[]
 * @default ["{\"position:struct\":\"{\\\"x:e\\\":\\\"302\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"1\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"339\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"2\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"376\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"3\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"413\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"4\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"450\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"5\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"487\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"6\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"524\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"7\"}","{\"position:struct\":\"{\\\"x:e\\\":\\\"561\\\",\\\"y:e\\\":\\\"583\\\"}\",\"symbol\":\"8\"}"]
 * @desc Опционально. Слоты для навыков. Можно удалять или добавлять.
 * 
 * @param skillSlotVisualSettings:s
 * @parent skillPanelSettingsGroup
 * @text Визуальные настройки
 * @type struct<LSkillSlotItemVisual> 
 * @desc Визуальные настройки (общие) для всех слотов навыков.
 * @default {"visible:bool":"true","isCanBeEdited:bool":"true","isHideWithMessage:bool":"true","outlineGroup":"","outlineMargins:s":"{\"x:int\":\"-2\",\"y:int\":\"-2\"}","outlinePulseSpeed:i":"40","selectedOutlineColor:str":"#fcba03","clickedOutlineColor:str":"#0b03fc","readyOutlineColor:str":"#21b53c","badOutlineColor:str":"#d61a1a","icon:s":"{\"visible:b\":\"true\",\"size:i\":\"32\",\"index:i\":\"0\"}","iconMargins:s":"{\"x:int\":\"2\",\"y:int\":\"2\"}","symbolText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"20\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"18\\\",\\\"y:int\\\":\\\"22\\\"}\",\"alignment:str\":\"right\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_1\\\",\\\"size:int\\\":\\\"14\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#e0cfbf\"}","timeText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"32\\\",\\\"h:int\\\":\\\"32\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"2\\\",\\\"y:int\\\":\\\"2\\\"}\",\"alignment:str\":\"center\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_1\\\",\\\"size:int\\\":\\\"12\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#fcba03\"}","countText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"32\\\",\\\"h:int\\\":\\\"32\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"-6\\\"}\",\"alignment:str\":\"right\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_1\\\",\\\"size:int\\\":\\\"12\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#eb852d\"}"}
 * 
 * 
 * @param spacer|playerAndParty @text‏‏‎ ‎@desc ===============================================
 * 
 * @param playerAndPartySettingsGroup
 * @text Игрок и партия
 * 
 * @param isShakeScreenWhenPlayerGetDamage:bool
 * @parent playerAndPartySettingsGroup
 * @text Тряска при уроне?
 * @type boolean
 * @on Тряска
 * @off Нет
 * @default true
 * @desc Активировать эффект тряски экрана когда игрок получает урон?
 * 
 * @param playerVisualSettingsGroup
 * @parent playerAndPartySettingsGroup
 * @text Интерфейс
 * 
 * @param pvsGaugesSubGroup
 * @parent playerVisualSettingsGroup
 * @text Основные хар-ки
 * 
 * @param playerHpGaugeVisualSettings:struct
 * @parent pvsGaugesSubGroup
 * @text Полоса здоровья HP
 * @type struct<LActorGauge>
 * @default {"visible:bool":"true","position:struct":"{\"x:e\":\"304\",\"y:e\":\"560\"}","label":"Player_HPGaugeLabel","labelMargins:struct":"{\"x:int\":\"-33\",\"y:int\":\"5\"}","isCanBeEdited:bool":"true","isHideWithMessage:bool":"true","text:struct":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"100\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"10\\\",\\\"y:int\\\":\\\"0\\\"}\",\"alignment:str\":\"left\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_0\\\",\\\"size:int\\\":\\\"13\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#edead8\"}","gauge:struct":"{\"visible:bool\":\"true\",\"vertical:bool\":\"false\",\"fill\":\"Player_HPGauge\",\"foreground\":\"\",\"mask\":\"\",\"backColor:css\":\"#000000\",\"backOpacity:int\":\"160\"}"}
 * @desc Визуальные настройки полосы здоровья игрока
 * 
 * @param playerMpGaugeVisualSettings:struct
 * @parent pvsGaugesSubGroup
 * @text Полоса маны MP
 * @type struct<LActorGauge>
 * @default {"visible:bool":"true","position:struct":"{\"x:e\":\"454\",\"y:e\":\"560\"}","label":"Player_MPGaugeLabel","labelMargins:struct":"{\"x:int\":\"-37\",\"y:int\":\"5\"}","isCanBeEdited:bool":"true","isHideWithMessage:bool":"true","text:struct":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"100\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"10\\\",\\\"y:int\\\":\\\"0\\\"}\",\"alignment:str\":\"left\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_0\\\",\\\"size:int\\\":\\\"13\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#edead8\"}","gauge:struct":"{\"visible:bool\":\"true\",\"vertical:bool\":\"false\",\"fill\":\"Player_MPGauge\",\"foreground\":\"\",\"mask\":\"\",\"backColor:css\":\"#000000\",\"backOpacity:int\":\"160\"}"}
 * @desc Визуальные настройки полосы маны игрока
 * 
 * @param playerTpGaugeVisualSettings:struct
 * @parent pvsGaugesSubGroup
 * @text Полоса TP
 * @type struct<LActorGauge>
 * @default {"visible:bool":"false","position:struct":"{\"x:e\":\"454\",\"y:e\":\"560\"}","label":"Player_TPGaugeLabel","labelMargins:struct":"{\"x:int\":\"-37\",\"y:int\":\"5\"}","isCanBeEdited:bool":"true","isHideWithMessage:bool":"true","text:struct":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"100\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"10\\\",\\\"y:int\\\":\\\"0\\\"}\",\"alignment:str\":\"left\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_0\\\",\\\"size:int\\\":\\\"13\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#edead8\"}","gauge:struct":"{\"visible:bool\":\"true\",\"vertical:bool\":\"false\",\"fill\":\"Player_TPGauge\",\"foreground\":\"\",\"mask\":\"\",\"backColor:css\":\"#000000\",\"backOpacity:int\":\"160\"}"}
 * @desc Визуальные настройки полосы TP игрока
 * 
 * @param spacer|enemies @text‏‏‎ ‎@desc ===============================================
 * 
 * @param enemySettingsGroup
 * @text Настройки врагов
 * 
 * @param enemyVisualSettingsGroup
 * @parent enemySettingsGroup
 * @text Интерфейс
 * 
 * @param enemyVSGaugesSubGroup
 * @parent enemyVisualSettingsGroup
 * @text Основные хар-ки
 * 
 * @param enemyMiniHpGaugeSettings:struct
 * @parent enemyVSGaugesSubGroup
 * @text Полоса HP на карте
 * @type struct<LActorGauge>
 * @default {"visible:bool":"true","position:struct":"{\"x:e\":\"-19\",\"y:e\":\"-56\"}","label":"","labelMargins:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}","isCanBeEdited:bool":"false","isHideWithMessage:bool":"false","text:struct":"{\"visible:bool\":\"false\",\"size:struct\":\"{\\\"w:int\\\":\\\"100\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"alignment:str\":\"center\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_0\\\",\\\"size:int\\\":\\\"13\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#edead8\"}","gauge:struct":"{\"visible:bool\":\"true\",\"vertical:bool\":\"false\",\"fill\":\"Event_HPGauge2\",\"foreground\":\"\",\"mask\":\"\",\"backColor:css\":\"#000000\",\"backOpacity:int\":\"160\"}"}
 * @desc Настройки полосы здоровья на карте (над головой)
 * 
 * @param enemyMiniHpGaugesCustoms:structA
 * @parent enemyVSGaugesSubGroup
 * @text Пользовательские
 * @type struct<LEnemyCustomMiniGauge>[]
 * @default []
 * @desc [PRO] Исп. параметр <miniHpGaugeStyle> чтобы назначить индивидуальную полоску здоровья для конкретного врага
 * 
 * @param enemyInfoVisualSettings:struct
 * @text Enemy Info
 * @type struct<LEnemyInfoVisual>
 * @parent enemyVisualSettingsGroup
 * @desc Enemy Info visual settings [information when you select\hover enemy]
 * @default {"visible:bool":"true","position:struct":"{\"x:e\":\"640\",\"y:e\":\"66\"}","image":"Enemy_Background","isCanBeEdited:bool":"true","isHideWithMessage:bool":"true","nameFormat":"%1","nameText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"100\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"10\\\",\\\"y:int\\\":\\\"6\\\"}\",\"alignment:str\":\"left\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"3\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_2\\\",\\\"size:int\\\":\\\"16\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#d05816\"}","levelFormat":"Lv. %1","levelText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"100\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"60\\\",\\\"y:int\\\":\\\"4\\\"}\",\"alignment:str\":\"right\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_1\\\",\\\"size:int\\\":\\\"12\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#edeb6a\"}","hpTextFormat":"%1 / %2","hpText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"100\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"12\\\",\\\"y:int\\\":\\\"28\\\"}\",\"alignment:str\":\"left\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_0\\\",\\\"size:int\\\":\\\"13\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#edead8\"}","gauge:s":"{\"visible:bool\":\"true\",\"vertical:bool\":\"false\",\"fill\":\"Player_HPGauge\",\"foreground\":\"\",\"mask\":\"\",\"backColor:css\":\"#000000\",\"backOpacity:int\":\"160\"}","gaugeMargins:s":"{\"x:int\":\"6\",\"y:int\":\"28\"}","face:s":"{\"visible:bool\":\"true\",\"faceName\":\"\",\"faceIndex:i\":\"0\",\"mirror:b\":\"false\",\"size:i\":\"74\",\"margins:s\":\"{\\\"x:int\\\":\\\"92\\\",\\\"y:int\\\":\\\"10\\\"}\"}","battleState:s":"{\"visible:bool\":\"true\",\"image\":\"Enemy_BattleState_Free\",\"margins:s\":\"{\\\"x:int\\\":\\\"142\\\",\\\"y:int\\\":\\\"60\\\"}\"}","foregroundImage:s":"{\"visible:bool\":\"true\",\"image\":\"\",\"margins:s\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\"}"}
 * 
 * @param enemies_noPassVision:intA
 * @parent enemySettingsGroup
 * @text No Pass Vision Regions
 * @type number[]
 * @min 1
 * @max 255
 * @default []
 * @desc The numbers of the regions through which the enemies can not see. Global, for all enemies.
 * 
 * @param enemies_noPassVision2:intA
 * @parent enemySettingsGroup
 * @text No Pass Vision Terrains
 * @type number[]
 * @min 1
 * @max 7
 * @default []
 * @desc The terrains tags (1-7) through which the enemies can not see. Global, for all enemies.
 * 
 * @param enemiesSpawnSettingsGroup
 * @parent enemySettingsGroup
 * @text Spawning Settings
 * 
 * @param enemies_spawn_mapId:int
 * @parent enemiesSpawnSettingsGroup
 * @text Spawn Map ID
 * @type number
 * @min 0
 * @default 0
 * @desc [Required] Map ID with events templates for spawning. 0 - spawn system not will works
 * 
 * @param enemies_spawn_aboveEvents:b
 * @parent enemiesSpawnSettingsGroup
 * @text Is spawn above events?
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 * @desc Is spawning enemies above another events (or enemies) allowed?
 * 
 * @param enemies_spawn_cacheAllowed:b
 * @parent enemiesSpawnSettingsGroup
 * @text Is use region cache?
 * @type boolean
 * @on Yes (more performance)
 * @off No
 * @default true
 * @desc If you dinamycally change region Id's on map during game, set this parameter to NO (false)
 * 
 * @param spacer|map @text‏‏‎ ‎@desc ===============================================
 * 
 * @param mapSettingsGroup
 * @text Map settings
 * 
 * @param mapScrolling:s
 * @text Map Scrolling
 * @parent mapSettingsGroup
 * @type struct<LMapScrollSettings>
 * @default {"isEnabled:b":"false","scrollZone:int":"10","speed:int":"5","delay:int":"60","resetOnMove:b":"true","resetOnAction:b":"true"}
 * @desc Mouse map scrolling settings
 * 
 * @param map_noProjectilePass:intA
 * @parent mapSettingsGroup
 * @text No Pass Projectiles Regions
 * @type number[]
 * @min 1
 * @max 255
 * @default []
 * @desc The numbers of the regions through which the projectiles can not pass. Global, for all projectiles.
 * 
 * @param map_noProjectilePass2:intA
 * @parent mapSettingsGroup
 * @text No Pass Projectiles Terrains
 * @type number[]
 * @min 1
 * @max 7
 * @default []
 * @desc The terrains tags (1-7) through which the projectiles can not pass. Global, for all projectiles.
 * 
 * @param miniHpGaugeSetings:s
 * @text Mini HP Gauges
 * @parent mapSettingsGroup
 * @type struct<LMiniHpGaugeSettings>
 * @default {"active:b":"true","showOnlyOnHover:b":"true","showOnDamage:b":"true"}
 * @desc Mini HP gauges above ABS events settings
 * 
 * 
 * 
 * 
 * 
 * @command ABSEventSettings
 * @text ABS Enemy Configurate
 * @desc Configurate enemy ABS parameters for this certaint event
 * 
 * @arg MainGroup
 * @text Main Group
 * 
 * @arg viewRadius
 * @parent MainGroup
 * @text View Radius
 * @type number
 * @min 1
 * @max 100
 * @default 5
 * @desc On how many map cells sees enemy
 * 
 * @arg returnRadius
 * @parent MainGroup
 * @text  Return Radius
 * @type number
 * @min 1
 * @max 100
 * @default 12
 * @desc How far can the enemy move away from the place where the battle begins
 * 
 * @arg onDeath
 * @parent MainGroup
 * @text On Death
 * @type text
 * @default
 * @desc ABS Script action (SAction), called when enemy is die
 * 
 * @arg MapGroup
 * @text Map Group
 * 
 * @arg shatterEffect
 * @parent MapGroup
 * @text Shatter Effect?
 * @type boolean
 * @default true
 * @desc Is play sprite shatter effect when enemy is die?
 * 
 * @arg deadSwitch
 * @parent MapGroup
 * @text Dead Switch
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @option 0
 * @default 0
 * @desc Will turn ON this self.switch when enemy is die ( 0 - nothing )
 * 
 * @arg eraseOnDead
 * @parent deadSwitch
 * @text Erase on Dead?
 * @type boolean
 * @default true
 * @desc Erase Event when enemy is die? Only if NOT HAVE Dead Switch
 * 
 * @arg VisualGroup
 * @text Visual Group
 * 
 * @arg UIInfo
 * @parent VisualGroup
 * @text Show UI Info?
 * @type boolean
 * @default true
 * @desc Is show portrait UI when enemy is under cursor?
 * 
 * @arg faceName
 * @parent VisualGroup
 * @text Face Name
 * @type file
 * @required 1
 * @dir img\faces
 * @default
 * @desc Image name for portrait UI
 * 
 * @arg faceIndex
 * @parent faceName
 * @text Face Index
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Face index on face image for portrait UI
 * 
 * @arg AnimationGroup
 * @text Animation Group
 * 
 * @arg hitAnimationId
 * @parent AnimationGroup
 * @text Hit Animation
 * @type animation
 * @default 1
 * @desc Hit animation on character when enemy attacks
 * 
 */

/*~struct~LStateIconSettings:

 @param visible:b
 @text Is Visible?
 @type boolean 
 @on Yes
 @off No
 @desc Will be this element visible?
 @default true 

 @param position:s
 @text Position
 @type struct<XY> 
 @desc Position on screen
 @default {"x:int":"0","y:int":"0"} 

 @param isCanBeEdited:b
 @text Is Editable?
 @type boolean
 @default true
 @desc Can player edit this element in UI Editor?

 @param textFormat:str
 @text Time Left Format
 @type text 
 @desc %1 will be replaced by remaining time (in seconds)
 @default %1 

 @param textFormatA:str
 @text Actions Count Format
 @type text 
 @desc %1 will be replaced by remaining actions count [States only]
 @default A:%1 

 @param text:struct
 @text Time Text
 @type struct<CText> 
 @desc Timer or Actions count text settings
 @default {} 

 @param icon:s
 @text Icon
 @type struct<str6> 
 @desc Icon settings
 @default {} 

*/
/*~struct~LDamagePopUpVisualSettings:
 * @param id
 * @text ID
 * @default
 * @desc Unique ID for refer to this settings in <popUpStyleId:X> parameter
 *
 * @param randDX:int
 * @text Rand DX
 * @type number
 * @default 0
 * @min 0
 * @desc Random value in pixels (> 0) to add to X at Pop Up start (x +- DX)
 *
 * @param randDY:int
 * @text Rand DY
 * @type number
 * @default 0
 * @min 0
 * @desc Random value in pixels (> 0) to add to Y at Pop Up start (y + DY)
 *
 * @param stayTime:int
 * @text Life Time
 * @type number
 * @default 12
 * @min 1
 * @desc Life time before PopUp starts disapear
 *
 * @param changeFontSize:int
 * @text Final Font Size
 * @type number
 * @default 22
 * @min 1
 * @desc Final value of font size. Can be more, equal or less that in Value text settings 
 *
 *
 * @param noFlyUp:bool
 * @text Is NO Fly?
 * @type boolean
 * @default false
 * @on Stay still
 * @off Fly Up
 * @desc Will be pop up stay still? False - will fly up to disapear
 * 
 * @param noFadeOut:bool
 * @text Is NO Fade?
 * @type boolean
 * @default false
 * @on No Fade
 * @off Fade out
 * @desc Will be pop up stay opaque all time? False - will fade out to disapear
 * 
 * @param text:struct
 * @text Value Text
 * @type struct<CText>
 * @default {"visible:bool":"true","size:struct":"{\"w:int\":\"100\",\"h:int\":\"100\"}","margins:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}","alignment:str":"center","outline:struct":"{\"color:css\":\"#000000\",\"width:int\":\"3\"}","font:struct":"{\"face:str\":\"AABS_0\",\"size:int\":\"14\",\"italic:bool\":\"false\"}","textColor:css":"#FFFFFF"}
 * @desc Text settings. TextBox Size parameter NOT uses.
 *
 * @param image:struct
 * @text Extra image
 * @default {"name":"","margins:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}","fadeInSpeed:int":"20"}
 * @type struct<LDPUImage>
*/

/*~struct~LDPUImage:
 * @param name
 * @text Name
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc Optional. Addition image file for Pop Up Item.
 * 
 * @param margins:struct
 * @text Margin
 * @type struct<XY>
 * @default {"x:int":"0","y:int":"0"}
 * @desc Position of image, relative Pop Up item
 *
 * @param fadeInSpeed:int
 * @text Fade speed
 * @type number
 * @default 20
 * @min 1
 * @desc Image fade in speed. Image starts transparent. Set to 255 to show image opaque immediately
 */

 /*~struct~LDPUExp:

    @param active:b
    @text Is Enabled?
    @type boolean
    @on Yes
    @off No
    @default true
    @desc Is need show Pop Up when EXP given to character? No - disable at all

    @param styleId
    @text Settings ID
    @default Experience
    @desc Pop Up Settings ID from Pop Up Table parameter

    @param textFormat
    @text Text Format
    @default +%1 exp
    @desc Pop Up Text, %1 will be replaced to experience value

    @param aboveChar:b
    @text Is Above Character?
    @type boolean
    @on Yes (above char)
    @off No (above enemy)
    @default false
    @desc Exp Pop Up show above character or above killed enemy?

    @param bindToChar:b
    @text Bind to char?
    @type boolean
    @on Yes (stay above char)
    @off No (stay on screen)
    @default false
    @desc Pop Up will stay above character or (if false) on screen (and moved with screen)
 */


/*~struct~LMiniHpGaugeSettings:
    @param active:b
    @text Is Enabled?
    @type boolean
    @on Yes
    @off No
    @default true
    @desc Is need show Mini HP gauges for ABS events on map? No - disable at all

    @param showOnlyOnHover:b
    @text Is Show only on Hover?
    @type boolean
    @on Yes (hover)
    @off No (always)
    @default true
    @desc Is show Mini HP gauge only when event hovered? No - always

    @param showOnDamage:b
    @text Is Show on Damage?
    @type boolean
    @on Yes
    @off No
    @default true
    @desc Is show Mini HP gauge for short time when ABS event receive damage?
*/
/*~struct~LMapScrollSettings:
    @param isEnabled:b
    @text Is Enabled?
    @type boolean
    @on Yes
    @off No
    @default false
    @desc Is Map Scrolling enabled by default? For enable or disable during game you can use uAPI script calls.

    @param scrollZone:int
    @text Activation Border Size
    @type number
    @min 10
    @max 50
    @default 10
    @desc Scroll activation borders size on screen edges, in pixels

    @param speed:int
    @text Scrolling speed
    @type number
    @min 1
    @max 10
    @default 5
    @desc Camera scrolling speed

    @param delay:int
    @text Delay
    @type number
    @min 0
    @default 30
    @desc Delay in frames (60 = 1 second) before starts scrolling

    @param resetOnMove:b
    @text Reset when moving?
    @type boolean
    @on Reset
    @off No
    @default true
    @desc Center camera (reset scroll) when player starts moving?

    @param resetOnAction:b
    @text Reset on action?
    @type boolean
    @on Reset
    @off No
    @default true
    @desc Center camera (reset scroll) when player affected by any skill (get damage, attacked)?
*/
/*~struct~LSkillSlotItem:
 * @param position:struct
 * @text Position
 * @type struct<XY2>
 * @default
 * @desc Skill slot position on screen
 *
 * @param symbol
 * @text Key
 * @default
 * @desc Keyboard key for activate skill slot
 *
 * @param isEditable:b
 * @text Is editable?
 * @type boolean
 * @default true
 * @desc Can player edit slot? Open skills or items select menu
 *
 * @param isAutoset:b
 * @text Is auto?
 * @type boolean
 * @default true
 * @desc Can skill or item automatically been assign to this slot?
 *
 * @param filter:str
 * @text Filter
 * @parent isAutoset:b
 * @type combo
 * @option Any
 * @option Items
 * @option Skills
 * @default Any
 * @desc Filter works for auto assign only. (Is Auto - ON)
 *
 * @param specifiedIds:str
 * @text Specified Ids
 * @parent isAutoset:b
 * @default
 * @desc Slot can accept only this items or skill (depends on filter) ID's (separated by comma). Empty - all
 *
 * @param style:struct
 * @text Visual Settings
 * @type struct<LSkillSlotItemVisual> 
 * @default
 * @desc Skill Slot can have own visual settings. Or leave empty for default settings (Parameter: Skill Slot Visual)
 */

/*~struct~LInputSettings:

    @param LMBMapTouchMode
    @text LMB Map Touch
    @type select
    @option Primary attack
    @option Default (move)
    @option Nothing
    @default Default (move)
    @desc TODO: wiki page?

    @param RMBMapTouchMode
    @text RMB Map Touch
    @type select
    @option Default (menu)
    @option Secondary attack
    @option Move
    @option Turn
    @option Nothing
    @default Turn
    @desc TODO: wiki page?

    @param LMBTargetTouchMode
    @text LMB Target Touch
    @type select
    @option Primary attack
    @option Default (move)
    @option Smart attack (Primary)
    @option Turn
    @default Smart attack (Primary)
    @desc TODO: wiki page?

    @param RMBTargetTouchMode
    @text RMB Target Touch
    @type select
    @option Secondary attack
    @option Move
    @option Smart attack (Secondary)
    @option Turn
    @default Smart attack (Secondary)
    @desc TODO: wiki page?

    @param moveType
    @text Movement
    @type select
    @option WASD and Arrows
    @option Arrows only
    @default WASD and Arrows
    @desc Keyboard keys for character movement

    @param isDiagonalMovement:b
    @text Diagonal Movement?
    @type boolean
    @default true
    @on Yes
    @off No
    @desc Moving in 8 directions?

    @param isStaticAtkRot:b
    @text Attack when rotation?
    @type boolean
    @default true
    @on Yes
    @off No
    @desc Always only attack (no move) when rotating if mouse clicked on map?

    @param keybingind
    @text Key Bindings

    @param kbReload
    @text Reload
    @parent keybingind
    @default R
    @desc TODO:

    @param kbCommandMenu
    @text Commands
    @parent keybingind
    @default C
    @desc TODO:

    @param kbRotate
    @text Rotate
    @parent keybingind
    @default Control
    @desc TODO:
*/
/*~struct~LActorGauge:
 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this gauge visible at start?
 * 
 * @param position:struct
 * @text Position
 * @type struct<XY2>
 * @default
 * @desc Position on screen
 * 
 * @param label
 * @text Label
 * @type file
 * @dir img/Alpha/
 * @require 1
 * @default
 * @desc Label image for gauge, optional
 * 
 * @param labelMargins:struct
 * @text Label Margins
 * @type struct<XY>
 * @default
 * @desc Position of label, relative gauge
 *
 * @param isCanBeEdited:bool
 * @text Is Editable?
 * @type boolean
 * @default true
 * @desc Can player edit this gauge in UI Editor?
 *
 * @param isHideWithMessage:bool
 * @text Is Hide by Msg?
 * @type boolean
 * @default true
 * @desc Hide this UI element when message window appears?
 * 
 * @param text:struct
 * @text Value Text
 * @type struct<CText>
 * 
 * @param gauge:struct
 * @text Gauge
 * @type struct<CGauge>
 * 
 * 
*/
/*~struct~CGauge:
 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this gauge visible?
 *
 * @param vertical:bool
 * @text Is Vertical?
 * @type boolean
 * @default false
 * @desc Gauge will use vertical fill?
 * 
 * @param fill
 * @text Fill Image
 * @type file
 * @dir img/Alpha/
 * @require 1
 * @default
 * @desc Gaguge fill image, required!
 * 
 * @param foreground
 * @text Foreground Image
 * @type file
 * @dir img/Alpha/
 * @require 1
 * @default
 * @desc Image above gauge fill, optional
 * 
 * @param mask
 * @text Mask Image
 * @type file
 * @dir img/Alpha/
 * @require 1
 * @default
 * @desc Whole gauge image mask, optional
 * 
 * @param backColor:css
 * @type string
 * @text Background Color
 * @default #000000
 * @desc Text color in HEX format (#000000)
 * 
 * @param backOpacity:int
 * @type number
 * @min 0
 * @max 255
 * @text Background Opacity
 * @default 255
 * @desc from 0 to 255, 0 - transparent, 255 - opaque
 */
/*~struct~CText:
 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this text visible?
 * 
 * @param size:struct
 * @text TextBox Size
 * @type struct<WH>
 * @default
 * @desc Size of text zone
 * 
 * @param margins:struct
 * @text Margin
 * @type struct<XY>
 * @default
 * @desc Position of text, relative parent
 * 
 * @param alignment:str
 * @text Alignment
 * @type combo
 * @option center
 * @option right
 * @option left
 * @default center
 * @desc Text alignment
 * 
 * @param outline:struct
 * @text Text Outline
 * @type struct<Outline>
 * @default
 * @desc Text outline settings
 * 
 * @param font:struct
 * @type struct<Font>
 * @text Font Settings
 * @default
 * @desc Text font settings
 * 
 * @param textColor:css
 * @type string
 * @text Text Color
 * @default #FFFFFF
 * @desc Text color in HEX format (#000000)
 * 
 */
/*~struct~XY:
 * @param x:int
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y:int
 * @text Y
 * @type number
 * @default 0
 * @min -1000
 */
/*~struct~XY2:
 * @param x:e
 * @text X
 * @type text
 * @default 0
 * @desc Number or script (example: Graphics.width / 2)
 *
 * @param y:e
 * @text Y
 * @type text
 * @default 0
 * @desc Number or script (example: $gameVariables.value(12) * 2)
 */
/*~struct~WH:
 * @param w:int
 * @text Width
 * @type number
 * @default 100
 * @min 0
 *
 * @param h:int
 * @text Height
 * @type number
 * @default 100
 * @min 0
 */
/*~struct~Font:
 * @param face:str
 * @text Face
 * @type combo
 * @option AABS_0
 * @option AABS_1
 * @option AABS_2
 * @option AABS_3
 * @default AABS_0
 *
 * @param size:int
 * @text Size
 * @type number
 * @default 24
 * @min 1
 * 
 * @param italic:bool
 * @text IsItalic
 * @type boolean
 * @default false
 */
/*~struct~Outline:
 * @param color:css
 * @text Color
 * @type text
 * @default #000000
 * @desc Outline color in HEX (#000000) or empty "" (black)
 *
 * @param width:int
 * @text Width
 * @type number
 * @default 3
 * @min 0
 * @desc Outline stroke width in px
 */
 /*~struct~str6:

 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this element visible? 


 @param index:i
 @text Icon Index
 @type number 
 @min 0
 @desc Icon index on IconSet
 @default 0 

 @param size:i
 @text Icon Size
 @type number 
 @min 2
 @desc Icon Size in PX (default icons size is 32)
 @default 32 

*/

/*~struct~LEnemyCustomMiniGauge:
    @param id
    @text ID
    @desc Use in parameter <miniHpGaugeStyle:ID>
    @default custom1

    @param gauge:struct
    @text Settings
    @type struct<LActorGauge>
    @default {"visible:bool":"true","position:struct":"{\"x:e\":\"-19\",\"y:e\":\"-56\"}","label":"","labelMargins:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}","isCanBeEdited:bool":"false","isHideWithMessage:bool":"false","text:struct":"{\"visible:bool\":\"false\",\"size:struct\":\"{\\\"w:int\\\":\\\"100\\\",\\\"h:int\\\":\\\"20\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"alignment:str\":\"center\",\"outline:struct\":\"{\\\"color:css\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"AABS_0\\\",\\\"size:int\\\":\\\"13\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"textColor:css\":\"#edead8\"}","gauge:struct":"{\"visible:bool\":\"true\",\"vertical:bool\":\"false\",\"fill\":\"Event_HPGauge2\",\"foreground\":\"\",\"mask\":\"\",\"backColor:css\":\"#000000\",\"backOpacity:int\":\"160\"}"}
    @desc Mini HP gauge settings for this style
*/

/*~struct~LSkillSLotItemVisualIcon:

 @param visible:b
 @text 
 @type boolean 
 @on Yes
 @off No
 @desc 
 @default true 


 @param size:i
 @text 
 @type number 
 @min 0
 @desc 
 @default 32 


 @param index:i
 @text 
 @type number 
 @min 0
 @desc 
 @default 0 

*/

/*~struct~LSkillSlotItemVisual:

 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this skill slot visible?


 * @param isCanBeEdited:bool
 * @text Is Editable?
 * @type boolean
 * @default true
 * @desc Can player edit this skill slot in UI Editor? 


 * @param isHideWithMessage:bool
 * @text Is Hide by Msg?
 * @type boolean
 * @default true
 * @desc Hide this UI element when message window appears? 

 @param outlineGroup
 @text Outline

 @param outlineMargins:s
 @parent outlineGroup
 @text Outline Margin
 @type struct<XY> 
 @desc Outline effect color margin
 @default {} 


 @param outlinePulseSpeed:i
 @parent outlineGroup
 @text Pulse Speed
 @type number 
 @min 1
 @max 255
 @desc Pulse effect speed in frames
 @default 40 


 @param selectedOutlineColor:str
 @parent outlineGroup
 @text Selected
 @type text 
 @desc Color for outline when skill slot is selected (in HEX format)
 @default #fcba03 


 @param clickedOutlineColor:str
 @parent outlineGroup
 @text Click
 @type text 
 @desc Color for outline when skill slot is clicked \ activated (in HEX format)
 @default #0b03fc 


 @param readyOutlineColor:str
 @parent outlineGroup
 @text Ready
 @type text 
 @desc Color for outline when skill slot is ready to use (in HEX format)
 @default #21b53c 


 @param badOutlineColor:str
 @parent outlineGroup
 @text Forbidden
 @type text 
 @desc Color for outline when skill slot is can't be used (in HEX format)
 @default #d61a1a 


 @param icon:s
 @text Icon settings
 @type struct<LSkillSLotItemVisualIcon> 
 @desc Skill and Item icons on skill slot settings. Icon Index is ignored.
 @default {} 

 @param iconMargins:s
 @text Icon Margin
 @parent icon:s
 @type struct<XY> 
 @desc Icon margins
 @default {} 

 @param symbolText:s
 @text Symbol Text
 @type struct<CText> 
 @desc Symbol (key) text settings
 @default {} 


 @param timeText:s
 @text Time Text
 @type struct<CText> 
 @desc Timer text settings
 @default {} 


 @param countText:s
 @text Count Text
 @type struct<CText> 
 @desc Count text settings
 @default {} 

*/


/*~struct~LUIFaceElement:

 @param visible:bool
 @text Is Visible?
 @type boolean
 @default true
 @desc Will be this element visible?


 @param faceName
 @text Face Image
 @type file
 @require 1
 @dir img/face/
 @desc Face image name
 @default  


 @param faceIndex:i
 @parent faceName
 @text Index
 @type number 
 @min 0
 @desc Index on Face Image
 @default 0 


 @param mirror:b
 @text Mirror
 @type boolean 
 @on Yes
 @off No
 @desc Is mirror face image (from left to right)?
 @default false 


 @param size:i
 @text Size
 @type number 
 @desc Face size in px (default RPG Maker faces size is 144)
 @default 74 


 @param margins:s
 @text Margins
 @type struct<XY> 
 @desc Face image margins
 @default {}

*/
/*~struct~LUIImageElement:

 @param visible:bool
 @text Is Visible?
 @type boolean
 @default true
 @desc Will be this element visible? 


 @param image
 @text Image
 @type file
 @require 1
 @dir img/Alpha/
 @desc
 @default 


 @param margins:s
 @text Margins
 @type struct<XY> 
 @desc Image margins
 @default {}

*/

/*~struct~LEnemyInfoVisual:

 @param visible:bool
 @text Is Visible?
 @type boolean
 @default true
 @desc Will be this element visible? 


 @param position:struct
 @text Position
 @type struct<XY2>
 @default
 @desc Position on screen


 @param image
 @text Background
 @type file
 @require 1
 @dir img/Alpha/
 @desc
 @default Enemy_Background 


 @param isCanBeEdited:bool
 @text Is Editable?
 @type boolean
 @default true
 @desc Can player edit this element in UI Editor? 


 @param isHideWithMessage:bool
 @text Is Hide by Msg?
 @type boolean
 @default true
 @desc Hide this UI element when message window appears? 


 @param nameFormat
 @text Name Format
 @type text 
 @desc %1 will be replaced by Enemy Name
 @default %1


 @param levelFormat
 @text Level Format
 @type text 
 @desc %1 will be replaced by Enemy Level
 @default Lv. %1 


 @param hpTextFormat
 @text HP Format
 @type text 
 @desc %1 - HP, %2 - MHP, %3 - Rate in %
 @default %1 / %2 


 @param nameText:s
 @parent nameFormat
 @text Text
 @type struct<CText> 
 @desc Enemy name text style
 @default {} 


 @param hpText:s
 @parent hpTextFormat
 @text Text
 @type struct<CText> 
 @desc Enemy HP text style
 @default {} 


 @param levelText:s
 @parent levelFormat
 @text Text
 @type struct<CText> 
 @desc Enemy level text style
 @default {} 


 @param gauge:s
 @text HP gauge
 @type struct<CGauge> 
 @desc Enemy HP gauge style
 @default {} 

 @param gaugeMargins:s
 @parent gauge:s
 @text Margins
 @type struct<XY> 
 @desc HP gauge margins
 @default {}

 @param face:s
 @text Face
 @type struct<LUIFaceElement> 
 @desc Enemy Face settings. Face Name and Index not used.
 @default {} 


 @param battleState:s
 @text Battle Icon
 @type struct<LUIImageElement> 
 @desc Enemy In Battle State Icon Image
 @default {} 


 @param foregroundImage:s
 @text Foreground
 @type struct<LUIImageElement> 
 @desc Foreground image
 @default {} 

*/


var Imported = Imported || {};
Imported.Alpha_ABSZ = true;

// * ALPHA FAMILY PLUGINS GLOBAL DEFINITION
var AA = AA || {};
AA.Core = AA.Core || {};
AA.Core.version = 0.43;

AA.Utils = {};

AA.warning = function(e, msg) {
    KDCore.warning(e, msg);
};

AA.w = (e, mgs) => AA.warning(e, mgs);

AA.link = function (library) {
    this[library.name] = library;
};


AA.Version = 60; // 0.6

//TODO: Задавать версию необходимого NET и проверять

// * Данный символ переопределяется в 1_DevSymbol_TEST как dev
AA._define = 'build'; // * По умолчанию -> сборка

// * Критическая ошибка, стоп игры
AA.cre = function(e, msg) {
    AA.w(e, msg);
    window.alert(msg || "Critical error occur!");
    SceneManager.update = () => {};
};

// * Если карта (Scene_Map) и включён режим АБС
AA.isABSMap = function() {
    return AA.isABSActive() && AA.isMap();
};

// * АБС в активном режиме
AA.isABSActive = function() {
    return AA.System.isABSActive();
};

AA.isMap = function() {
    return KDCore.Utils.isSceneMap();
};

AA.isDEV = function() {
    return AA._define == 'dev';
};

AA.isPro = function() {
    return true;
};


/*
# ==========================================================================
# ==========================================================================
#
#   EMBEDDED PHEONIX KAGEDESU PLUGINS CORE LIBRARY
#   (This plugin may not use the entire code of this library)
#
# ==========================================================================
# ==========================================================================
 * 
 * 
 */



// Generated by CoffeeScript 2.6.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 23.04.22
var KDCore;

window.Imported = window.Imported || {};

Imported.KDCore = true;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается (3.43 - нельзя, можно 3.4.3)
//%[МЕНЯТЬ ПРИ ИЗМЕНЕНИИ]
KDCore._fileVersion = '2.8.3';

// * Методы и библиотеки данной версии
KDCore._loader = 'loader_' + KDCore._fileVersion;

KDCore[KDCore._loader] = [];

// * Добавить библиотеку на загрузку
KDCore.registerLibraryToLoad = function(lib) {
  return KDCore[KDCore._loader].push(lib);
};

if ((KDCore.Version != null) && KDCore.Version >= KDCore._fileVersion) {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ, так как уже загруженна более новая
  console.log('XDev KDCore ' + KDCore._fileVersion + ' skipped by new or exists version');
  KDCore._requireLoadLibrary = false;
} else {
  KDCore.Version = KDCore._fileVersion;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  // * ТРЕБУЕТСЯ ЗАГРУЗКА БИБЛИОТЕК
  KDCore._requireLoadLibrary = true;
}


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Array.prototype.delete = function() {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  Array.prototype.sample = function() {
    if (this.length === 0) {
      return [];
    }
    return this[KDCore.SDK.rand(0, this.length - 1)];
  };
  Array.prototype.first = function() {
    return this[0];
  };
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
  Array.prototype.shuffle = function() {
    var k, n, v;
    n = this.length;
    while (n > 1) {
      n--;
      k = KDCore.SDK.rand(0, n + 1);
      v = this[k];
      this[k] = this[n];
      this[n] = v;
    }
  };
  Array.prototype.count = function() {
    return this.length;
  };
  Array.prototype.isEmpty = function() {
    return this.length === 0;
  };
  // * Ищет элемент, у которого поле ID == id
  Array.prototype.getById = function(id) {
    return this.getByField('id', id);
  };
  // * Ищет элемент, у которого поле FIELD (имя поля) == value
  return Array.prototype.getByField = function(field, value) {
    var e;
    try {
      return this.find(function(item) {
        return item[field] === value;
      });
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Number.prototype.do = function(method) {
    return KDCore.SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  return Number.prototype.any = function(number) {
    return (number != null) && number > 0;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  String.prototype.toCss = function() {
    return KDCore.Color.FromHex(this).CSS;
  };
  String.prototype.toCSS = function() {
    return this.toCss();
  };
  String.prototype.isEmpty = function() {
    return this.length === 0 || !this.trim();
  };
  String.isNullOrEmpty = function(str) {
    if (str != null) {
      return str.toString().isEmpty();
    } else {
      return true;
    }
  };
  String.any = function(str) {
    return !String.isNullOrEmpty(str);
  };
  return String.prototype.replaceAll = function(search, replacement) {
    var target;
    target = this;
    return target.split(search).join(replacement);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.isMV = function() {
    return Utils.RPGMAKER_NAME.contains("MV");
  };
  KDCore.isMZ = function() {
    return !KDCore.isMV();
  };
  KDCore.warning = function(msg, error) {
    if (msg != null) {
      console.warn(msg);
    }
    if (error != null) {
      console.warn(error);
    }
  };
  KDCore.makeid = function(length) {
    var characters, charactersLength, i, result;
    result = '';
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    charactersLength = characters.length;
    i = 0;
    while (i < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      i++;
    }
    return result;
  };
  return KDCore.makeId = function() {
    return KDCore.makeid(...arguments);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var SDK;
  //?[DEPRECATED]
  // * SDK
  //------------------------------------------------------------------------------
  SDK = function() {
    throw new Error('This is a static class');
  };
  SDK.rand = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };
  SDK.setConstantToObject = function(object, constantName, constantValue) {
    object[constantName] = constantValue;
    if (typeof object[constantName] === 'object') {
      Object.freeze(object[constantName]);
    }
    Object.defineProperty(object, constantName, {
      writable: false
    });
  };
  SDK.convertBitmapToBase64Data = function(bitmap) {
    return bitmap._canvas.toDataURL('image/png');
  };
  SDK.times = function(times, method) {
    var i, results;
    i = 0;
    results = [];
    while (i < times) {
      method(i);
      results.push(i++);
    }
    return results;
  };
  SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  SDK.canvasToLocalX = function(layer, x) {
    while (layer) {
      x -= layer.x;
      layer = layer.parent;
    }
    return x;
  };
  SDK.canvasToLocalY = function(layer, y) {
    while (layer) {
      y -= layer.y;
      layer = layer.parent;
    }
    return y;
  };
  SDK.isInt = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  SDK.isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  SDK.checkSwitch = function(switchValue) {
    if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
      return true;
    }
    return false;
  };
  SDK.toNumber = function(string, none = 0) {
    var number;
    if (string == null) {
      return none;
    }
    number = Number(string);
    if (isNaN(number)) {
      return none;
    }
    return number;
  };
  SDK.isString = function(value) {
    return typeof value === "string";
  };
  SDK.isArray = function(value) {
    return Array.isArray(value);
  };
  //@[EXTEND]
  return KDCore.SDK = SDK;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var __alias_Bitmap_blt_kdCore, __alias_Bitmap_fillAll_kdCore;
  //@[ALIAS]
  __alias_Bitmap_fillAll_kdCore = Bitmap.prototype.fillAll;
  Bitmap.prototype.fillAll = function(color) {
    if (color instanceof KDCore.Color) {
      return this.fillRect(0, 0, this.width, this.height, color.CSS);
    } else {
      return __alias_Bitmap_fillAll_kdCore.call(this, color);
    }
  };
  //@[ALIAS]
  __alias_Bitmap_blt_kdCore = Bitmap.prototype.blt;
  Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (this._needModBltDWH > 0) {
      dh = dw = this._needModBltDWH;
      __alias_Bitmap_blt_kdCore.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
      this._needModBltDWH = null;
    } else {
      __alias_Bitmap_blt_kdCore.call(this, ...arguments);
    }
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = KDCore.BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    return this.drawOnMe(bitmap, x, y, size, size);
  };
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  Bitmap.prototype.drawInMe = function(bitmap) {
    return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
  };
  return Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var _input_onKeyDown, _input_onKeyUp, i, j, k, l;
  Input.KeyMapperPKD = {};
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters Upper
  for (i = k = 65; k <= 90; i = ++k) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
//Letters Lower (for key code events)
  for (i = l = 97; l <= 122; i = ++l) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  
  //@[ALIAS]
  _input_onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function(event) {
    _input_onKeyDown.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode);
  };
  //@[ALIAS]
  _input_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event) {
    _input_onKeyUp.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode, false);
  };
  //?NEW
  Input._setStateWithMapperPKD = function(keyCode, state = true) {
    var symbol;
    symbol = Input.KeyMapperPKD[keyCode];
    if (symbol != null) {
      return this._currentState[symbol] = state;
    }
  };
  //?NEW
  Input.isCancel = function() {
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  };
  //?NEW
  return TouchInput.toPoint = function() {
    return new KDCore.Point(TouchInput.x, TouchInput.y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  PluginManager.getPluginParametersByRoot = function(rootName) {
    var pluginParameters, property;
    for (property in this._parameters) {
      if (this._parameters.hasOwnProperty(property)) {
        pluginParameters = this._parameters[property];
        if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
          return pluginParameters;
        }
      }
    }
    return PluginManager.parameters(rootName);
  };
  return PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] != null;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ___Sprite_alias_Move_KDCORE_2;
  Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
    return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
  };
  Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
    this.x -= Math.round(this.width * floatX);
    this.y -= Math.round(this.height * floatY);
  };
  Sprite.prototype.moveToParentCenter = function() {
    if (!this.parent) {
      return;
    }
    return this.move(this.parent.width / 2, this.parent.height / 2);
  };
  ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
  Sprite.prototype.move = function(x, y) {
    if (x instanceof Array) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
    } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
    } else if ((x != null) && (x._x != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
    } else {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
    }
  };
  Sprite.prototype.isContainsPoint = function(point) {
    var rect, rx, ry;
    if (this.width === 0 || this.height === 0) {
      return false;
    }
    rx = KDCore.SDK.toGlobalCoord(this, 'x');
    ry = KDCore.SDK.toGlobalCoord(this, 'y');
    rect = this._getProperFullRect(rx, ry);
    return rect.contains(point.x, point.y);
  };
  // * Возвращает Rect с учётом Scale и Anchor спрайта
  Sprite.prototype._getProperFullRect = function(rx, ry) {
    var height, width, x, y;
    width = this.width * Math.abs(this.scale.x);
    height = this.height * Math.abs(this.scale.y);
    x = rx - this.anchor.x * width;
    y = ry - this.anchor.y * height;
    if (this.anchor.x === 0 && this.scale.x < 0) {
      x += this.width * this.scale.x;
    }
    if (this.anchor.y === 0 && this.scale.y < 0) {
      y += this.height * this.scale.y;
    }
    return new PIXI.Rectangle(x, y, width, height);
  };
  Sprite.prototype.fillAll = function(color) {
    if (color != null) {
      return this.bitmap.fillAll(color);
    } else {
      return this.fillAll(KDCore.Color.WHITE);
    }
  };
  return Sprite.prototype.removeFromParent = function() {
    if (this.parent != null) {
      return this.parent.removeChild(this);
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return TouchInput.toMapPoint = function() {
    return this.toPoint().convertToMap();
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.Utils = KDCore.Utils || {};
  return (function() {
    var _;
    _ = KDCore.Utils;
    _.getJDataById = function(id, source) {
      var d, j, len;
      for (j = 0, len = source.length; j < len; j++) {
        d = source[j];
        if (d.id === id) {
          return d;
        }
      }
      return null;
    };
    _.hasMeta = function(symbol, obj) {
      return (obj.meta != null) && (obj.meta[symbol] != null);
    };
    _.getValueFromMeta = function(symbol, obj) {
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      return obj.meta[symbol];
    };
    _.getNumberFromMeta = function(symbol, obj) {
      var value;
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      if (obj.meta[symbol] === true) {
        return 0;
      } else {
        value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
      }
      return value;
    };
    _.isSceneMap = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Map;
      } catch (error) {
        return false;
      }
    };
    _.isSceneBattle = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Battle;
      } catch (error) {
        return false;
      }
    };
    _.getEventCommentValue = function(commentCode, list) {
      var comment, e, i, item;
      try {
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                return comment;
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    };
    _.getEventCommentValueArray = function(commentCode, list) {
      var comment, comments, e, i, item;
      try {
        comments = [];
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                comments.push(comment);
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return comments;
    };
    _.getPositionPointFromJSON = function(jsonSettings) {
      return _.convertPositionPointFromJSON(jsonSettings.position);
    };
    _.convertPositionPointFromJSON = function(position) {
      var e, x, y;
      try {
        x = position[0];
        y = position[1];
        if (!KDCore.SDK.isInt(x)) {
          x = eval(x);
        }
        if (!KDCore.SDK.isInt(y)) {
          y = eval(y);
        }
        return new KDCore.Point(x, y);
      } catch (error) {
        e = error;
        console.warn('Utils.getPositionPointFromJSON', e);
        return KDCore.Point.Empty;
      }
    };
    _.jsonPos = function(jsonPosition) {
      return _.convertPositionPointFromJSON(jsonPosition);
    };
    _.jsonPosXY = function(jsonPosition) {
      var e, x, y;
      try {
        ({x, y} = jsonPosition);
        return new KDCore.Point(eval(x), eval(y));
      } catch (error) {
        e = error;
        console.warn('Utils.jsonPosXY', e);
        return KDCore.Point.Empty;
      }
    };
    _.getVar = function(id) {
      return $gameVariables.value(id);
    };
    _.setVar = function(id, value) {
      return $gameVariables.setValue(id, value);
    };
    _.addToVar = function(id, value) {
      var prevVal;
      prevVal = _.getVar(id);
      return _.setVar(id, prevVal + value);
    };
    _.playSE = function(seFileName, pitch = 100, volume = 100) {
      var sound;
      if (seFileName == null) {
        return;
      }
      if (seFileName === "") {
        return;
      }
      sound = {
        name: seFileName,
        pan: 0,
        pitch: pitch,
        volume: volume
      };
      AudioManager.playStaticSe(sound);
    };
    _.getItemTypeId = function(item) {
      if (DataManager.isWeapon(item)) {
        return 1;
      } else if (DataManager.isArmor(item)) {
        return 2;
      }
      return 0;
    };
    _.getItemByType = function(itemId, typeId) {
      var data, e;
      try {
        if ((typeId != null) && !isFinite(typeId) && KDCore.SDK.isString(typeId) && String.any(typeId)) {
          if (typeId[0] === "w") {
            typeId = 1;
          } else if (typeId[0] === "a") {
            typeId = 2;
          } else {
            typeId = 0;
          }
        }
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    _.loadFont = function(name) {
      if (!KDCore.isMZ()) {
        return;
      }
      if (String.isNullOrEmpty(name)) {
        return;
      }
      if (FontManager._states[name] != null) {
        return;
      }
      FontManager.load(name, name + ".ttf");
    };
    _.convertTimeShort = function(seconds) {
      var e;
      try {
        if (seconds > 59) {
          return Math.floor(seconds / 60) + 'm';
        } else {
          return seconds;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return seconds;
      }
    };
    _.isPointInScreen = function(point, margin = 10) {
      var maxH, maxW, screenMargin, x, y;
      ({x, y} = point);
      maxW = Graphics.width;
      maxH = Graphics.height;
      // * Граница от краёв экрана
      screenMargin = margin;
      if (x < screenMargin) {
        return false;
      }
      if (y < screenMargin) {
        return false;
      }
      if (x > (maxW - screenMargin)) {
        return false;
      }
      if (y > (maxH - screenMargin)) {
        return false;
      }
      return true;
    };
    // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
    // * Пример использования loadImageAsync(a, b).then(метод)
    // в метод будет передан bitmap первым аргументом
    _.loadImageAsync = async function(folder, filename) {
      var promise;
      promise = new Promise(function(resolve, reject) {
        var b;
        b = ImageManager.loadBitmap("img/" + folder + "/", filename);
        return b.addLoadListener(function() {
          return resolve(b);
        });
      });
      return (await promise);
    };
    // * Преобразовать расширенное значение
    // * Значение может быть X -> X
    // * "X" -> X (цифра)
    // * "X,Y,Z,..." -> [X, Y, Z]
    // * "[X, Y, Z,...]" -> [X, Y, Z]
    // * "X|V" -> из переменной X
    // * [Y] -> случайное число из массива (рекурсивно)
    //@[2.8.1] since
    _.getEValue = function(value) {
      var e, items, randomValue, variableId;
      try {
        if (value == null) {
          return null;
        }
        if (KDCore.SDK.isString(value)) {
          if (isFinite(value)) { // * Число представленно строкой
            return Number(value);
          }
          // * Массив представлен строкой (может быть без квадратных скобок)
          if (value.contains(',') || (value.contains("[") && value.contains("]"))) {
            value = value.replace("[", "");
            value = value.replace("]", "");
            // * Преобразуем в число или строку (например если extended |V)
            items = value.split(",").map(function(item) {
              var itemT;
              itemT = item.trim();
              if (isFinite(itemT)) {
                return Number(itemT);
              } else {
                return itemT;
              }
            });
            // * Вызываем снова эту функцию, но уже с массивом
            return KDCore.Utils.getEValue(items);
          }
          if (value.contains("|V")) {
            variableId = parseInt(value);
            return $gameVariables.value(variableId);
          }
          return value; // * Просто значение в итоге
        } else if (KDCore.SDK.isArray(value)) {
          randomValue = value.sample();
          return KDCore.Utils.getEValue(randomValue);
        } else {
          return value;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return value;
      }
    };
    //@[2.8.2] since
    _.isChanceIsGood = function(chance) {
      var e;
      try {
        if (chance > 1) {
          chance /= 100;
        }
        return chance > Math.random();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[2.8.2] since
    //KEY:w:3:1:50 , KEY:i:10:2:1|V
    //OUTPUT: [GameItem, COUNT]
    _.parseItemFromConditionStr = function(conditionLine) {
      var amount, e, itemChance, itemId, parts, typeId;
      try {
        if (!conditionLine.contains(":")) {
          return null;
        }
        parts = conditionLine.split(":");
        typeId = parts[1];
        itemId = KDCore.Utils.getEValue(parts[2]);
        amount = KDCore.Utils.getEValue(parts[3]);
        if (amount <= 0) {
          return null;
        }
        try {
          itemChance = String.any(parts[4]) ? parts[4] : 100;
          itemChance = KDCore.Utils.getEValue(itemChance) / 100;
        } catch (error) {
          e = error;
          KDCore.warning(e);
          itemChance = 0;
        }
        if (itemChance <= 0) {
          return null;
        }
        if (KDCore.Utils.isChanceIsGood(itemChance)) {
          return [KDCore.Utils.getItemByType(itemId, typeId), amount];
        } else {
          return null;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return Window_Base.prototype.drawFaceWithCustomSize = function(faceName, faceIndex, x, y, finalSize) {
    this.contents._needModBltDWH = finalSize;
    this.drawFace(faceName, faceIndex, x, y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return (function() {    // * Input Extension: KDGamepad
    //------------------------------------------------------------------------------
    // * Поддержка расширенного управления через геймпад (свой модуль)
    var ALIAS___updateGamepadState, _;
    //@[DEFINES]
    _ = Input;
    // * Активировать работу модуля KDGamepad
    _.activateExtendedKDGamepad = function() {
      return _._kdIsGamepadExtended = true;
    };
    //@[ALIAS]
    ALIAS___updateGamepadState = _._updateGamepadState;
    _._updateGamepadState = function(gamepad) {
      if (Input._kdIsGamepadExtended === true) {
        KDGamepad.update();
      }
      if ((typeof $gameTemp !== "undefined" && $gameTemp !== null ? $gameTemp.__kdgpStopDefaultGamepad : void 0) === true) {
        return;
      }
      // * Режим перемещения без DPad
      // * В оригинале игрок также ходит по DPad клавишам, что может быть не удобно
      // * например при работе с инвентарём
      if (KDGamepad.isNoDPadMoving()) {
        if (KDGamepad.isDPadAny()) {
          Input.clear();
          return;
        }
      }
      ALIAS___updateGamepadState.call(this, gamepad);
    };
    window.KDGamepad = function() {
      return new Error("This is static class");
    };
    window.addEventListener("gamepadconnected", function(event) {
      var e;
      try {
        return KDGamepad.refresh();
      } catch (error) {
        // * Можно напрямую
        //unless KDGamepad.isExists()
        //    if event.gamepad? and event.gamepad.mapping == 'standard'
        //        KDGamepad.init(event.gamepad)
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    window.addEventListener("gamepaddisconnected", function(event) {
      var e;
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        if ((event.gamepad != null) && event.gamepad === KDGamepad.gamepad) {
          return KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    KDGamepad.stopDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = true;
    };
    KDGamepad.resumeDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = null;
    };
    // * Ссылка на геймпад
    KDGamepad.gamepad = null;
    // * Подключён ли Gamepad ?
    KDGamepad.isExists = function() {
      return KDGamepad.gamepad != null;
    };
    // * Инициализация состояния кнопок
    // * Этот метод вызывается автоматически из Refresh или при подключении Gamepad
    KDGamepad.init = function(gamepad) {
      KDGamepad.gamepad = gamepad;
      this._isActive = true;
      this.buttonNames = [
        'A', // 0
        'B', // 1
        'X', // 2
        'Y', // 3
        'LB', // 4
        'RB', // 5
        'LTrigger', // 6
        'RTrigger', // 7
        'Back', // 8
        'Start', // 9
        'LStick', // 10
        'RStick', // 11
        'dUp', // 12
        'dDown', // 13
        'dLeft', // 14
        'dRight' // 15
      ];
      this.reset();
    };
    // * Аналог Input.clear
    KDGamepad.clear = function() {
      return KDGamepad.reset();
    };
    // * Сбросить состояние кнопок
    KDGamepad.reset = function() {
      this.leftStick = {
        x: 0,
        y: 0
      };
      this.rightStick = {
        x: 0,
        y: 0
      };
      this.buttons = {};
      this.buttonsPressed = {};
      this.prevButtons = {};
    };
    
    // * Остановить учёт геймпада
    KDGamepad.stop = function() {
      KDGamepad.reset();
      KDGamepad.gamepad = null;
    };
    // * Функция проверки что нажата кнопка на геймпаде
    KDGamepad._buttonPressed = function(gamepad, index) {
      var b, e;
      try {
        if (!gamepad || !gamepad.buttons || index >= gamepad.buttons.length) {
          return false;
        }
        b = gamepad.buttons[index];
        if (b == null) {
          return false;
        }
        if (typeof b === 'object') {
          // * Можно упростить
          return b.pressed;
        }
        return b === 1.0;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    // * Каждый кадр (обновление состояний)
    KDGamepad.update = function() {
      var e, gp, i, isDown, j, len, name, ref;
      if (!KDGamepad.isActive()) {
        return;
      }
      KDGamepad.refresh();
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        gp = KDGamepad.gamepad;
        ref = this.buttonNames;
        // * Проверка состояний кнопок
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          name = ref[i];
          this.buttons[name] = false;
          isDown = KDGamepad._buttonPressed(gp, i);
          if (isDown === true) {
            this.prevButtons[name] = true;
          } else {
            // * Срабатываение только при нажал - отпустил
            if (this.prevButtons[name] === true) {
              this.buttons[name] = true;
              this.prevButtons[name] = false;
            }
          }
        }
        // * Проверка стиков
        this.leftStick.x = gp.axes[0];
        this.leftStick.y = gp.axes[1];
        this.rightStick.x = gp.axes[2];
        this.rightStick.y = gp.axes[3];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Обновить и проверить состояние Gamepad
    // * Надо каждый раз это вызывать
    KDGamepad.refresh = function() {
      var e, gamepads, gp, i, isGamepadRefreshed, j, ref;
      try {
        isGamepadRefreshed = false;
        if (navigator.getGamepads) {
          gamepads = navigator.getGamepads();
        } else if (navigator.webkitGetGamepads) {
          gamepads = navigator.webkitGetGamepads();
        }
        if (gamepads != null) {
          for (i = j = 0, ref = gamepads.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
            gp = gamepads[i];
            if ((gp != null) && gp.mapping === 'standard') {
              isGamepadRefreshed = true;
              if (KDGamepad.buttonNames != null) {
                KDGamepad.gamepad = gp;
              } else {
                KDGamepad.init(gp);
              }
              break;
            }
          }
        }
        if (!isGamepadRefreshed) {
          // * Если не был найден не один gamepad - отключаем систему
          KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Любое нажатие кнопки
    KDGamepad.isKeyAny = function(name) {
      return KDGamepad.isKey(name) || KDGamepad.isKeyPressed(name);
    };
    // * Нажата ли кнопка (trigger нажал - отпустил)
    KDGamepad.isKey = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.buttons[name] === true;
    };
    // * Нажата ли кнопка (continues зажата)
    KDGamepad.isKeyPressed = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.prevButtons[name] === true;
    };
    KDGamepad.isDPadAny = function() {
      return KDGamepad.isKeyAny("dLeft") || KDGamepad.isKeyAny("dRight") || KDGamepad.isKeyAny("dUp") || KDGamepad.isKeyAny("dDown");
    };
    KDGamepad.isActive = function() {
      return this._isActive === true;
    };
    // * Временно отключить обработку KDGamepad
    KDGamepad.setActive = function(_isActive) {
      this._isActive = _isActive;
      if (KDGamepad.isActive()) {
        KDGamepad.refresh();
      } else {
        KDGamepad.stop();
      }
    };
    // * Отключить перемещение игрока на DPad
    KDGamepad.setNoDPadMovingMode = function(_noDpadMoving) {
      this._noDpadMoving = _noDpadMoving;
    };
    return KDGamepad.isNoDPadMoving = function() {
      return this._noDpadMoving === true;
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var BitmapSrc;
  BitmapSrc = (function() {
    //?[DEPRECATED]
    class BitmapSrc {
      constructor() {
        this.bitmap = null;
      }

      static LoadFromIconIndex(iconIndex) {
        var bs, icon_bitmap, iconset, ph, pw, sx, sy;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[iconIndex] == null) {
          iconset = ImageManager.loadSystem('IconSet');
          if (KDCore.isMV()) {
            pw = Window_Base._iconWidth;
            ph = Window_Base._iconHeight;
          } else {
            pw = ImageManager.iconWidth;
            ph = ImageManager.iconHeight;
          }
          sx = iconIndex % 16 * pw;
          sy = Math.floor(iconIndex / 16) * ph;
          icon_bitmap = new Bitmap(pw, ph);
          icon_bitmap.addLoadListener(function() {
            icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
          });
          BitmapSrc.CACHE[iconIndex] = icon_bitmap;
        }
        bs.bitmap = BitmapSrc.CACHE[iconIndex];
        return bs;
      }

      static LoadFromImageFolder(filename) {
        var bs;
        bs = new BitmapSrc();
        bs.bitmap = ImageManager.loadPicture(filename);
        return bs;
      }

      static LoadFromBase64(data, name) {
        var bs;
        bs = new BitmapSrc();
        if (name != null) {
          if (BitmapSrc.CACHE[name] != null) {
            bs.bitmap = BitmapSrc.CACHE[name];
          } else {
            BitmapSrc.CACHE[name] = Bitmap.load(data);
            bs.bitmap = BitmapSrc.CACHE[name];
          }
        } else {
          bs.bitmap = Bitmap.load(data);
        }
        return bs;
      }

      static LoadFromMemory(symbol) {
        var bs;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[symbol] != null) {
          bs.bitmap = BitmapSrc.CACHE[symbol];
        } else {
          bs.bitmap = ImageManager.loadEmptyBitmap();
        }
        return bs;
      }

    };

    BitmapSrc.CACHE = {};

    return BitmapSrc;

  }).call(this);
  //@[EXTEND]
  return KDCore.BitmapSrc = BitmapSrc;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Changer;
  // * Класс который может плавно изменять какой-либо параметр
  // * Работает в стиле chain методов

    // * ------------------ ПРИМЕР ----------------------------------

    // * Меняем прозрачность 4 раза, туда-сюда, затем выводим done в консоль

    //@changer = new AA.Changer(someSprite)
  //@changer.change('opacity').from(255)
  //            .to(0).step(5).speed(1).delay(30).repeat(4).reverse()
  //            .start().done(() -> console.log('done'))
  //@changer.update()

    // * -------------------------------------------------------------
  Changer = class Changer {
    constructor(obj) {
      this.obj = obj;
      // * Количество кадров, в которые будет обновление
      this._field = null; // * название поля
      this._speed = 1; // * frames
      this._step = 1; // * шаг изменения значения
      this._from = 0; // * Начальное значение
      this._to = 0; // * Конечное значение
      this._thread = null;
      this._orienation = true; // * Направление + или - step (true = +)
      this._delay = 0; // * Задержка старта
      this._changer = null; // * Ссылка на следующий changer
      this._isRepeat = false; // * Надо ли поторить себя снова
      this._onDoneMethod = null; // * Метод будет выполнен в конце (при завершении)
      this._isPrepared = false; // * Элемента был подготовлен (установлено значение from)
    }

    start() {
      if (this._field == null) {
        return;
      }
      if (this._from === this._to) {
        return;
      }
      if (this._delay > 0) {
        this._delayThread = new KDCore.TimedUpdate(this._delay, this._startThread.bind(this));
        this._delayThread.once();
      } else {
        this._startThread();
      }
      return this;
    }

    isStarted() {
      return (this._thread != null) || (this._delayThread != null);
    }

    from(_from) {
      this._from = _from;
      return this;
    }

    to(_to) {
      this._to = _to;
      return this;
    }

    step(_step) {
      this._step = _step;
      return this;
    }

    speed(_speed) {
      this._speed = _speed;
      return this;
    }

    change(_field) {
      this._field = _field;
      return this;
    }

    // * Снова повторить (не совместим с then)
    // * Если ничего не указать, или <= 0 -> то бескончно
    repeat(_repeatCount = 0) {
      this._repeatCount = _repeatCount;
      if (this._repeatCount <= 0) {
        this._repeatCount = null;
      }
      this._isRepeat = true;
      this._changer = null;
      return this;
    }

    // * Снова повторить, но поменять местами to и from (работает только с repeat >= 2)
    reverse() {
      this._isReverse = true;
      return this;
    }

    isDone() {
      if (!this._isPrepared) {
        // * Чтобы не было выхода пока ждёт Delay
        return false;
      }
      // * Если от 255 до 0 (например)
      if (this._orienation === false) {
        // * То может быть меньше нуля (т.к. @step динамический)
        return this.value() <= this._to;
      } else {
        return this.value() >= this._to;
      }
    }

    value() {
      return this.obj[this._field];
    }

    stop() {
      this._thread = null;
      this._delayThread = null;
      if (this._changer == null) {
        // * Если есть связанный Changer, то не выполняем метод завршения
        return this._callDoneMethod();
      }
    }

    // * При ожидании, значения устанавливаются не сразу
    delay(_delay) {
      this._delay = _delay;
      return this;
    }

    // * Выполнить другой Changer после этого
    // * Не совместим с Repeat
    // * НЕЛЬЗЯ зацикливать, не будет работать
    // * Соединённый не надо обновлять вне, он обновляется в этом
    then(_changer) {
      this._changer = _changer;
      this._isRepeat = false;
      return this;
    }

    // * Этот метод будт выполнене в конце
    done(_onDoneMethod) {
      this._onDoneMethod = _onDoneMethod;
      return this;
    }

    // * Шаг можно выполнить и в ручную
    makeStep() {
      if (!this.isStarted()) {
        this._prepare();
      }
      this._makeStep();
      return this;
    }

    update() {
      var ref;
      if (this.isStarted()) {
        if (this._delay > 0) {
          if ((ref = this._delayThread) != null) {
            ref.update();
          }
        }
        if (this._thread != null) {
          this._updateMainThread();
        }
      } else {
        // * Если хоть раз был запущен
        if (this._isBeenStarted === true) {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
        }
      }
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Changer.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Changer.prototype;
    _._prepare = function() {
      if (this._field == null) {
        return;
      }
      this._orienation = this._from < this._to;
      if (!this._orienation) {
        this._step *= -1;
      }
      // * Устанавливаем начальное значение
      this.obj[this._field] = this._from;
      this._isPrepared = true;
    };
    _._makeStep = function() {
      var value;
      if (this.isDone()) {
        return;
      }
      value = this.value();
      value += this._step;
      this.obj[this._field] = value;
    };
    _._startThread = function() {
      this._prepare();
      if (this.isDone()) {
        return;
      }
      this._thread = new KDCore.TimedUpdate(this._speed, this._makeStep.bind(this));
      return this._isBeenStarted = true;
    };
    _._updateChainedChanger = function() {
      if (this._changer.isStarted()) {
        this._changer.update();
        if (this._changer.isDone()) {
          this._callDoneMethod();
          this._changer.stop();
          return this._changer = null;
        }
      } else {
        return this._changer.start();
      }
    };
    _._restart = function() {
      if (!this._isCanRepeatMore()) {
        return;
      }
      if (this._repeatCount == null) {
        // * Если указано! число повторений, то onDone метод не вызываем
        this._callDoneMethod();
      }
      if (this._isReverse === true) {
        this._swapFromTo();
      }
      this._prepare();
      return this.start();
    };
    _._swapFromTo = function() {
      var t;
      t = this._from;
      this._from = this._to;
      this._to = t;
      // * Инвентируем число step
      this._step *= -1;
    };
    _._callDoneMethod = function() {
      if (this._onDoneMethod != null) {
        return this._onDoneMethod();
      }
    };
    _._isCanRepeatMore = function() {
      if (this._repeatCount == null) {
        return true;
      }
      this._repeatCount--;
      if (this._repeatCount <= 0) {
        this.stop();
        return false;
      }
      return true;
    };
    _._updateMainThread = function() {
      this._thread.update();
      if (this.isDone()) {
        if (this._isRepeat === true) {
          this._restart();
        } else {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
          this.stop();
        }
      }
    };
  })();
  // ■ END Changer.coffee
  //---------------------------------------------------------------------------

  //@[EXTEND]
  return KDCore.Changer = Changer;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color;
  Color = (function() {
    class Color {
      constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.a = a1;
      }

      getLightestColor(lightLevel) {
        var bf, newColor, p;
        bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
        p = 0;
        newColor = [0, 0, 0, 0];
        if (bf - lightLevel >= 0) {
          if (bf >= 0) {
            p = Math.abs(bf - lightLevel) / lightLevel;
          }
          newColor = this.ARR.map(function(c) {
            return c - (p * c);
          });
        } else {
          if (bf >= 0) {
            p = (lightLevel - bf) / (255 - bf);
          }
          newColor = this.ARR.map(function(c) {
            return [(255 - c) * p + c, 255].min();
          });
        }
        return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
      }

      clone() {
        return this.reAlpha(this.a);
      }

      reAlpha(newAlpha) {
        return new Color(this.r, this.g, this.b, newAlpha || 255);
      }

      static AddConstantColor(name, color) {
        color.toHex();
        color.toArray();
        color.toCSS();
        KDCore.SDK.setConstantToObject(Color, name, color);
      }

      toHex() {
        var b, g, r;
        if (this._colorHex != null) {
          return this._colorHex;
        }
        r = Math.floor(this.r).toString(16).padZero(2);
        g = Math.floor(this.g).toString(16).padZero(2);
        b = Math.floor(this.b).toString(16).padZero(2);
        return this._colorHex = '#' + r + g + b;
      }

      toArray() {
        if (this._colorArray != null) {
          return this._colorArray;
        }
        return this._colorArray = [this.r, this.g, this.b, this.a];
      }

      toCSS() {
        var na, nb, ng, nr;
        if (this._colorCss != null) {
          return this._colorCss;
        }
        nr = Math.round(this.r);
        ng = Math.round(this.g);
        nb = Math.round(this.b);
        na = this.a / 255;
        return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
      }

      toNumber() {
        return Number(this.toHex().replace("#", "0x"));
      }

      static Random() {
        var a, b, c;
        a = KDCore.SDK.rand(1, 254);
        b = KDCore.SDK.rand(1, 254);
        c = KDCore.SDK.rand(1, 254);
        return new Color(a, b, c, 255);
      }

      static FromHex(hexString) {
        var color, result;
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        color = null;
        if (result != null) {
          color = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          };
        }
        if (color != null) {
          return new Color(color.r, color.g, color.b, 255);
        } else {
          return Color.NONE;
        }
      }

    };

    Object.defineProperties(Color.prototype, {
      R: {
        get: function() {
          return this.r;
        },
        configurable: true
      },
      G: {
        get: function() {
          return this.g;
        },
        configurable: true
      },
      B: {
        get: function() {
          return this.b;
        },
        configurable: true
      },
      A: {
        get: function() {
          return this.a;
        },
        configurable: true
      },
      ARR: {
        get: function() {
          return this.toArray();
        },
        configurable: true
      },
      CSS: {
        get: function() {
          return this.toCSS();
        },
        configurable: true
      },
      HEX: {
        get: function() {
          return this.toHex();
        },
        configurable: true
      },
      OX: {
        get: function() {
          return this.toNumber();
        },
        configurable: true
      }
    });

    Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));

    Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));

    Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));

    Color.AddConstantColor('RED', new Color(255, 0, 0, 255));

    Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));

    Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));

    Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));

    Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));

    Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));

    Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));

    return Color;

  }).call(this);
  //@[EXTEND]
  return KDCore.Color = Color;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color, DevLog, __TMP_LOGS__;
  Color = KDCore.Color;
  __TMP_LOGS__ = [];
  DevLog = class DevLog {
    constructor(prefix = "") {
      this.prefix = prefix;
      this._isShow = typeof DEV !== 'undefined';
      this._color = Color.BLACK;
      this._backColor = Color.WHITE;
      __TMP_LOGS__.push(this);
    }

    on() {
      this._isShow = true;
      return this;
    }

    off() {
      this._isShow = false;
      return this;
    }

    applyRandomColors() {
      this.applyRandomWithoutBackgroundColors();
      this.setBackColor(Color.Random());
      return this;
    }

    applyRandomWithoutBackgroundColors() {
      this.setColor(Color.Random());
      return this;
    }

    setColor(color) {
      this._color = color;
      return this;
    }

    setBackColor(backColor) {
      this._backColor = backColor;
      return this;
    }

    applyLibraryColors() {
      this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
      return this;
    }

    setColors(color, backColor) {
      this.setColor(color);
      this.setBackColor(backColor);
      return this;
    }

    applyExtensionColors() {
      this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
      return this;
    }

    applyWarningColors() {
      this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
      return this;
    }

    p(text) {
      if (!this._isShow) {
        return;
      }
      if (text == null) {
        console.log("");
      }
      this._printText(text);
    }

    _printText(text) {
      text = this.prefix + " : " + text;
      if (this._isUsingColor()) {
        return this._printTextWithColors(text);
      } else {
        return console.log(text);
      }
    }

    _isUsingColor() {
      return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
    }

    _printTextWithColors(text) {
      var args;
      args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
      return window.console.log.apply(console, args);
    }

    static CreateForLib(library) {
      var dlog;
      dlog = new DevLog(library.name);
      dlog.applyLibraryColors();
      return dlog;
    }

    static EnableAllLogs() {
      return __TMP_LOGS__.forEach(function(log) {
        return log.on();
      });
    }

  };
  //@[EXTEND]
  return KDCore.DevLog = DevLog;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  //?[DEPRECATED]
  return KDCore.ParametersManager = class ParametersManager {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this._cache = {};
      this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
    }

    isLoaded() {
      return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
    }

    isHasParameter(name) {
      return this._parameters[name] != null;
    }

    getString(name) {
      return this._parameters[name];
    }

    convertField(object, fieldName) {
      var e;
      try {
        object[fieldName] = JSON.parse(object[fieldName] || 'false');
      } catch (error) {
        e = error;
        console.error('Error while convert field ' + e.name);
        object[fieldName] = false;
      }
      return object;
    }

    convertImage(object, fieldName) {
      return object[fieldName] = this.loadImage(object[fieldName]);
    }

    loadImage(filename, smooth) {
      var e, path;
      try {
        if (filename) {
          path = filename.split('/');
          filename = path.last();
          path = path.first() + '/';
          return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
        } else {
          return ImageManager.loadEmptyBitmap();
        }
      } catch (error) {
        e = error;
        console.error(e);
        return ImageManager.loadEmptyBitmap();
      }
    }

    getFromCacheOrInit(name, func) {
      var object;
      if (!this.isInCache(name)) {
        if (func != null) {
          object = func.call(this);
          this.putInCache(name, object);
        }
      }
      return this.getFromCache(name);
    }

    isInCache(name) {
      return this._cache.hasOwnProperty(name);
    }

    putInCache(name, object) {
      return this._cache[name] = object;
    }

    getFromCache(name) {
      return this._cache[name];
    }

    getNumber(name) {
      var number;
      number = this.getObject(name);
      if (KDCore.SDK.isInt(number)) {
        return number;
      }
      return 0;
    }

    getObject(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || '{}');
      } else {
        return {};
      }
    }

    getBoolean(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || false);
      } else {
        return false;
      }
    }

    getBooleanFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getBooleanFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getNumberFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getNumberFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getStringFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getStringFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getBooleanFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getBoolean(name);
      });
    }

    getNumberFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getNumber(name);
      });
    }

    getStringFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getString(name);
      });
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.ParamLoader = class ParamLoader {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
      this.params = this.parseParameters(this.paramsRaw);
    }

    parseParameters(paramSet) {
      var clearKey, key, params, typeKey, value;
      params = {};
      for (key in paramSet) {
        value = paramSet[key];
        clearKey = this.parseKey(key);
        typeKey = this.parseKeyType(key);
        params[clearKey] = this.parseParamItem(typeKey, value);
      }
      return params;
    }

    parseKey(keyRaw) {
      return keyRaw.split(":")[0];
    }

    parseKeyType(keyRaw) {
      return keyRaw.split(":")[1];
    }

    // * Проверка, загружены ли параметры плагина
    isLoaded() {
      return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
    }

    // * Имя параметра без ключа
    isHasParameter(paramName) {
      return this.params[paramName] != null;
    }

    
      // * Возвращает значение параметра (def - по умолчанию, если не найден)
    getParam(paramName, def) {
      if (this.isHasParameter(paramName)) {
        return this.params[paramName];
      } else {
        return def;
      }
    }

    // * Данные ключи должны идти после названия параметра через :
    // * Пример: @param ShowDelay:int, @param TestBool:bool
    // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
    parseParamItem(type, item) {
      var e;
      if (type == null) {
        return item;
      }
      try {
        switch (type) {
          case "int":
          case "i":
            return parseInt(item);
          case "intA": // * массив чисел
            if (String.any(item)) {
              return JsonEx.parse(item).map((e) => {
                return this.parseParamItem("int", e);
              });
            } else {
              return [];
            }
            break;
          case "bool":
          case "b":
          case "e":
            return eval(item);
          case "struct":
          case "s":
            if (String.any(item)) {
              return this.parseParameters(JsonEx.parse(item));
            } else {
              return null;
            }
            break;
          case "structA": // * массив структур
            return JsonEx.parse(item).map((e) => {
              return this.parseParameters(JsonEx.parse(e));
            });
          case "str":
            return item;
          case "strA":
            if (String.any(item)) {
              return JsonEx.parse(item).map((e) => {
                return this.parseParamItem("str", e);
              });
            } else {
              return [];
            }
            break;
          case "note": // * если несколько строк в тексте
            return JsonEx.parse(item);
          case "css":
            return item.toCss();
          case "color":
            return KDCore.Color.FromHex(item);
          default:
            return item;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return item;
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Point;
  Point = (function() {
    class Point {
      constructor(_x = 0, _y = 0) {
        this._x = _x;
        this._y = _y;
      }

      clone() {
        return new Point(this._x, this._y);
      }

      toString() {
        return "[" + this._x + " ; " + this._y + "]";
      }

      isSame(anotherPoint) {
        return this.x === anotherPoint.x && this.y === anotherPoint.y;
      }

      convertToCanvas() {
        return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
      }

      convertToMap() {
        return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
      }

      convertToScreen() {
        return new Point(this.screenX(), this.screenY());
      }

      screenX() {
        var t, tw;
        t = $gameMap.adjustX(this._x);
        tw = $gameMap.tileWidth();
        return Math.round(t * tw + tw / 2);
      }

      screenY() {
        var t, th;
        t = $gameMap.adjustY(this._y);
        th = $gameMap.tileHeight();
        return Math.round(t * th + th);
      }

      round() {
        return new Point(Math.round(this._x), Math.round(this._y));
      }

      floor() {
        return new Point(Math.floor(this._x), Math.floor(this._y));
      }

      mapPointOnScreen() {
        var nx, ny;
        nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
        ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
        return new Point(nx, ny);
      }

      multiplyBy(val) {
        return new Point(this._x * val, this._y * val);
      }

      simple() {
        return new PIXI.Point(this.x, this.y);
      }

      delta(point) {
        var dx, dy;
        dx = point.x - this._x;
        dy = point.y - this._y;
        return new KDCore.Point(dx, dy);
      }

      static _getEmpty() {
        if (Point._emptyPoint == null) {
          Point._emptyPoint = new Point(0, 0);
        }
        return Point._emptyPoint;
      }

    };

    Object.defineProperties(Point.prototype, {
      x: {
        get: function() {
          return this._x;
        },
        configurable: true
      },
      y: {
        get: function() {
          return this._y;
        },
        configurable: true
      }
    });

    Object.defineProperties(Point, {
      Empty: {
        get: function() {
          return Point._getEmpty();
        },
        configurable: false
      }
    });

    Array.prototype.toPoint = function() {
      return new Point(this[0], this[1]);
    };

    Sprite.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    Game_CharacterBase.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    return Point;

  }).call(this);
  //@[EXTEND]
  return KDCore.Point = Point;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return KDCore.Sprite = (function(superClass) {
    //@[AUTO EXTEND]
    class Sprite extends superClass {
      constructor() {
        super(...arguments);
      }

      b() {
        return this.bitmap;
      }

      clear() {
        return this.bitmap.clear();
      }

      add(child) {
        return this.addChild(child);
      }

      bNew(w, h) {
        if (h == null) {
          h = w;
        }
        return this.bitmap = new Bitmap(w, h);
      }

      bImg(filename, sourceFolder) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        return this.bitmap = getterFunc(filename);
      }

      onReady(method) {
        if (method != null) {
          return this.bitmap.addLoadListener(method);
        }
      }

      drawText() {
        return this.bitmap.drawText(...arguments);
      }

      drawTextFull(text, position = "center") {
        if (this.textSettingsPosition != null) {
          position = this.textSettingsPosition;
        }
        return this.bitmap.drawTextFull(text, position);
      }

      //?DEPRECATED
      drawTextWithSettings(text) {
        this.clear();
        this.drawTextFull(text, this.textSettingsPosition);
      }

      //? x, y, icon, size
      drawIcon() {
        return this.bitmap.drawIcon(...arguments);
      }

      moveByJson(settings) {
        var pos;
        pos = KDCore.Utils.getPositionPointFromJSON(settings);
        return this.move(pos.x, pos.y);
      }

      applyTextSettingsByJson(sprite, settings) {
        this.applyTextSettingsByExtraSettings(sprite, settings.text);
      }

      applyTextSettingsByExtraSettings(sprite, s) {
        sprite.move(s.marginX, s.marginY);
        sprite.b().fontSize = s.fontSize;
        sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
        sprite.b().outlineWidth = s.outlineWidth;
        if (s.outlineColor != null) {
          sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
        }
        if (s.fontFace != null) {
          sprite.b().fontFace = s.fontFace;
        }
        sprite.b().fontItalic = s.fontItalic;
        sprite.visible = s.visible;
      }

      isReady() {
        var i, j, ref;
        if (this.bitmap != null) {
          if (!this.bitmap.isReady()) {
            return false;
          }
        }
        for (i = j = 0, ref = this.children.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          if (!this.children[i].bitmap.isReady()) {
            return false;
          }
        }
        return true;
      }

      inPosition(point) {
        return this.isContainsPoint(point);
      }

      isUnderMouse() {
        return this.inPosition(TouchInput);
      }

      // * Из параметров плагина
      applyFontParam(font) {
        var b;
        if (font == null) {
          return;
        }
        b = this.b();
        if (font.size != null) {
          b.fontSize = font.size;
        }
        if (!String.isNullOrEmpty(font.face)) {
          b.fontFace = font.face;
        }
        if (font.italic != null) {
          b.fontItalic = font.italic;
        }
      }

      applyOutlineParam(outline) {
        var b;
        if (outline == null) {
          return;
        }
        b = this.b();
        if (outline.width != null) {
          b.outlineWidth = outline.width;
        }
        if (!String.isNullOrEmpty(outline.color)) {
          b.outlineColor = outline.color;
        }
      }

      static FromImg(filename, sourceFolder) {
        var s;
        s = new KDCore.Sprite();
        s.bImg(filename, sourceFolder);
        return s;
      }

      static FromBitmap(w, h) {
        var s;
        s = new KDCore.Sprite();
        s.bNew(w, h);
        return s;
      }

      static FromTextSettings(settings) {
        var s;
        s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
        s.applyTextSettingsByExtraSettings(s, settings);
        s.textSettingsPosition = settings.position;
        return s;
      }

      // * Загрузчик из параметров плагина (безопасный)
      static FromParams(pluginParams) {
        var e, margins, s, size;
        try {
          size = pluginParams.size;
          s = KDCore.Sprite.FromBitmap(size.w, size.h);
          s.textSettingsPosition = pluginParams.alignment;
          margins = pluginParams.margins;
          if (margins != null) {
            s.move(margins.x, margins.y);
          }
          s.applyFontParam(pluginParams.font);
          s.applyOutlineParam(pluginParams.outline);
          if (!String.isNullOrEmpty(pluginParams.textColor)) {
            s.b().textColor = pluginParams.textColor;
          }
          if (pluginParams.visible != null) {
            s.visible = pluginParams.visible;
          }
          return s;
        } catch (error) {
          e = error;
          console.warn('Something wrong with Text Settings!', e);
          return KDCore.Sprite.FromBitmap(60, 30);
        }
      }

    };

    return Sprite;

  }).call(this, Sprite);
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.TimedUpdate = class TimedUpdate {
    constructor(interval, method) {
      this.interval = interval;
      this.method = method;
      this._timer = 0;
      this._once = false;
    }

    update() {
      if (this.interval == null) {
        return;
      }
      if (this._timer++ >= this.interval) {
        this.call();
        this._timer = 0;
        if (this._once === true) {
          return this.stop();
        }
      }
    }

    once() {
      return this._once = true;
    }

    onUpdate(method) {
      this.method = method;
    }

    stop() {
      return this.interval = null;
    }

    isAlive() {
      return this.interval != null;
    }

    // * Рандомизировать интервал @interval (-min, +max)
    applyTimeRange(min, max) {
      var value;
      if (!this.isAlive()) {
        return;
      }
      value = KDCore.SDK.rand(min, max);
      return this.interval += value;
    }

    call() {
      if (this.method != null) {
        return this.method();
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  
    // * Button (Sprite_XButton)

    //@[AUTO EXTEND]
  //?DEPRECATED
  return KDCore.Button = class Button extends Sprite {
    constructor() {
      super();
      this._mouseIn = false;
      this._touching = false;
      this._slowUpdateActive = false;
      this._localMode = false;
      this._images = [];
      this._checkAlpha = false;
      this._textSprite = null;
      this._textPosition = 0;
      this._override = false; // * TouchClick in game messages not work anymore if TRUE
      this._clickHandlers = [];
      this._manualHided = false;
      this._manualDisabled = false;
      this._condition = null; // * Условие для Visible
      this._condition2 = null; // * Условие для Enable \ Disable
      this._disabled = false;
      this._infoData = null;
      this._isNeedShowText = false;
      return;
    }

    isMouseInButton() {
      return this._mouseIn === true;
    }

    isActive() {
      return this.visible === true;
    }

    activateSlowUpdate() {
      return this._slowUpdateActive = true;
    }

    setLocalMode() {
      this._realX = this.x;
      this._realY = this.y;
      return this._localMode = true;
    }

    setAlphaMode() {
      return this._checkAlpha = true;
    }

    // * above, below
    setTextPosition(position) {
      return this._textPosition = position;
    }

    setHelpText(text, size) {
      return this._createText(text, size);
    }

    setInfoData(data) {
      return this._infoData = data;
    }

    setOverrideMode() {
      return this._override = true;
    }

    isOverride() {
      return this._override === true && this.isActive() && this.touchInButton();
    }

    isDisabled() {
      return this._disabled === true;
    }

    isEnabled() {
      return !this.isDisabled();
    }

    isNeedShowText() {
      return this._isNeedShowText === true;
    }

    addClickHandler(method) {
      return this._clickHandlers.push(method);
    }

    clearClickHandlers() {
      return this._clickHandlers = [];
    }

    isLocalMode() {
      return this._localMode === true;
    }

    setCondition(method) {
      return this._condition = method;
    }

    setConditionForDisable(method) {
      return this._condition2 = method;
    }

    getInfoData() {
      return this._infoData;
    }

    simulateClick() { //?NEW
      return this.applyClickedState();
    }

    simulateClickManual() { //?NEW
      this.simulateClick();
      return setTimeout((() => {
        try {
          return this.applyNormalState();
        } catch (error) {

        }
      }), 50);
    }

    prepare() { //?NEW
      return this.slowUpdate();
    }

    realX() {
      if (this.isLocalMode()) {
        return this._realX;
      } else {
        return this.x;
      }
    }

    realY() {
      if (this.isLocalMode()) {
        return this._realY;
      } else {
        return this.y;
      }
    }

    show() {
      this.visible = true;
      return this._manualHided = false;
    }

    hide() {
      this.visible = false;
      return this._manualHided = true;
    }

    disable() {
      this._disabled = true;
      this._manualDisabled = true;
      this.refreshEnDisState();
      return this._mouseIn = false;
    }

    enable() {
      this._disabled = false;
      this._manualDisabled = false;
      return this.refreshEnDisState();
    }

    update() {
      super.update();
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseClick();
      this.updatePosition();
      if (!this._slowUpdateActive) {
        this.slowUpdate();
      }
      return this.updateComplexTextVisible();
    }

    slowUpdate() {
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseTracking();
      this.updateConditionForVisible();
      return this.updateConditionForEnabling();
    }

    updateMouseTracking() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.cursorInButton()) {
        this._onMouseEnter();
        return this._mouseIn = true;
      } else {
        this._onMouseLeave();
        return this._mouseIn = false;
      }
    }

    // * In MZ TouchInput always have X,Y
    cursorInButton() {
      return this.touchInButton();
    }

    xyInButton(x, y) {
      var inRect, rect, rx, ry;
      rx = KDCore.SDK.toGlobalCoord(this, 'x');
      ry = KDCore.SDK.toGlobalCoord(this, 'y');
      rect = new PIXI.Rectangle(rx, ry, this._realWidth(), this._realHeight());
      inRect = rect.contains(x, y);
      if (inRect === true && this._checkAlpha === true) {
        return this._checkAlphaPixel(x - rx, y - ry);
      } else {
        return inRect;
      }
    }

    _realWidth() {
      if (this._hasImage()) {
        return this._mainImage().width;
      } else {
        return this.width;
      }
    }

    _hasImage() {
      return this._mainImage() != null;
    }

    _mainImage() {
      return this._images[0];
    }

    _realHeight() {
      if (this._hasImage()) {
        return this._mainImage().height;
      } else {
        return this.height;
      }
    }

    _checkAlphaPixel(x, y) {
      var pixel;
      pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
      return pixel >= 200;
    }

    _onMouseEnter() {
      if (this._mouseIn === true) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyCoverState();
      }
      this._showText();
      if (this.getInfoData() != null) {
        return this._startComplexTimer();
      }
    }

    _onMouseLeave() {
      if (this._mouseIn === false) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyNormalState();
      }
      this._hideText();
      return this._stopComplexTimer();
    }

    _showText() {
      if (this._textSprite == null) {
        return;
      }
      this._updateTextPosition();
      return this._textSprite.visible = true;
    }

    _hideText() {
      if (this._textSprite == null) {
        return;
      }
      return this._textSprite.visible = false;
    }

    _startComplexTimer() {
      this._stopComplexTimer();
      return this._cTimer = setTimeout((() => {
        if (this._mouseIn === true) {
          return this._isNeedShowText = true;
        }
      }), 1000);
    }

    _stopComplexTimer() {
      if (this._cTimer != null) {
        clearTimeout(this._cTimer);
      }
      return this._isNeedShowText = false;
    }

    updateMouseClick() {
      if (!this.isActive()) {
        this._unTouch();
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.touchInButton()) {
        this._touching = true;
        this.applyClickedState();
      }
      if (this._touching === true) {
        if (TouchInput.isReleased() || !this.touchInButton()) {
          this._unTouch();
          if (TouchInput.isReleased()) {
            return this.callClickHandler();
          }
        }
      }
    }

    _unTouch() {
      this._touching = false;
      if (this.touchInButton()) {
        return this.applyCoverState();
      } else {
        return this.applyNormalState();
      }
    }

    touchInButton() {
      return this.xyInButton(TouchInput.x, TouchInput.y);
    }

    callClickHandler() {
      if (this._clickHandlers.length > 0) {
        return this._clickHandlers.forEach(function(method) {
          return method();
        });
      }
    }

    updatePosition() {
      var p;
      if (!this._localMode) {
        return;
      }
      p = new KDCore.Point(this._realX, this._realY);
      return this.move(p.screenX(), p.screenY());
    }

    updateConditionForVisible() {
      var result;
      if (this._condition == null) {
        return;
      }
      if (this._manualHided === true) {
        return;
      }
      try {
        result = this._condition();
        return this.visible = !result;
      } catch (error) {
        console.warn('wrong condition in button');
        return this.visible = true;
      }
    }

    updateConditionForEnabling() {
      if (!this._condition2) {
        return;
      }
      if (this._manualDisabled === true) {
        return;
      }
      try {
        this._disabled = this._condition2();
        return this.refreshEnDisState();
      } catch (error) {
        console.warn('wrong condition in button for enable state');
        return this.disable();
      }
    }

    setButtonImages(img1, img2, img3, img4) {
      if (this._images != null) {
        this._images.forEach(function(img) {
          if (img != null) {
            return img.parent.removeChild(img);
          }
        });
      }
      this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
      this._images.forEach((img) => {
        if (img != null) {
          return this.addChild(img);
        }
      });
      return this.applyNormalState();
    }

    applyNormalState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[0]) != null ? ref.visible = true : void 0;
    }

    refreshImages() {
      return this._images.forEach(function(img) {
        return img != null ? img.visible = false : void 0;
      });
    }

    applyCoverState() {
      this.refreshImages();
      if (this._images[1] != null) {
        return this._images[1].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    applyClickedState() {
      this.refreshImages();
      if (this._images[2] != null) {
        return this._images[2].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    _createText(text, size) {
      var h, w;
      if (this._textSprite) {
        this.removeChild(this._textSprite);
      }
      w = Math.round(((size / 10) + 1) * 5 * text.length);
      h = size + 4;
      this._textSprite = new Sprite(new Bitmap(w, h));
      this._textSprite.bitmap.fontSize = size;
      this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
      this._textSprite.visible = false;
      return this.addChild(this._textSprite);
    }

    _updateTextPosition() {
      var nx, ny;
      if (!this._textSprite) {
        return;
      }
      nx = this._realWidth() / 2 - this._textSprite.width / 2;
      if (this._textPosition === 0) {
        ny = -this._textSprite.height;
      } else {
        ny = this._realHeight() + this._textSprite.height / 2;
      }
      return this._textSprite.move(nx, ny);
    }

    applyDisableState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[3]) != null ? ref.visible = true : void 0;
    }

    refreshEnDisState() {
      if (this.isDisabled()) {
        this.applyDisableState();
        return this._hideText();
      } else {
        if (this._mouseIn === false) {
          return this.applyNormalState();
        }
      }
    }

    //else
    //    do @applyCoverState
    updateComplexTextVisible() {}

    applyScale(mod) {
      var i, img, len, ref;
      ref = this._images;
      for (i = 0, len = ref.length; i < len; i++) {
        img = ref[i];
        if (img != null) {
          img.scale.x = mod;
          img.scale.y = mod;
        }
      }
    }

    static FromSet(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img0, img0);
      return button;
    }

    static FromSetFull(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1, img2, img3;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      img2 = getterFunc(imgName + "_02");
      img3 = getterFunc(imgName + "_03");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img2, img3);
      return button;
    }

  };
});

// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___startLoading, _;
  // * В версии RPG Maker MZ 1.5.0 появился баг что картинки не успевают прогрузится
  // * Данный фикс, возвращает старое поведение
  if (!KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Bitmap.prototype;
  //@[ALIAS]
  ALIAS___startLoading = _._startLoading;
  return _._startLoading = function() {
    if (Utils.hasEncryptedImages()) {
      ALIAS___startLoading.call(this, ...arguments);
    } else {
      // * Это из RPG Maker MZ до версии 1.5
      this._image = new Image();
      this._image.onload = this._onLoad.bind(this);
      this._image.onerror = this._onError.bind(this);
      this._destroyCanvas();
      this._loadingState = "loading";
      this._image.src = this._url;
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroup;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)

    //rev 07.10.21
  Sprite_ButtonsGroup = class Sprite_ButtonsGroup extends KDCore.Sprite {
    // buttonsArray = [
    //       {image: NAME, position: [X,Y]}, ...
    //    ]
    constructor(buttonsArray, activeIndex, clickCallback) {
      var button, i, len;
      super();
      this.clickCallback = clickCallback;
      this._buttons = [];
      for (i = 0, len = buttonsArray.length; i < len; i++) {
        button = buttonsArray[i];
        this._createButton(button);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroup.prototype;
    _._createButton = function({image, position}) {
      var btn, index, method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      index = this._buttons.length;
      btn = new KDCore.ButtonM(image, true, "Alpha");
      btn.move(position);
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this._buttons.push(btn);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback();
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroup = Sprite_ButtonsGroup;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad((function() {
  var Sprite_TilingFrame;
  Sprite_TilingFrame = class Sprite_TilingFrame extends KDCore.Sprite {
    constructor(width, height, skinBitmap) {
      super();
      this.width = width;
      this.height = height;
      this.skinBitmap = skinBitmap;
      this._createParts();
      this._refreshAll();
    }

    _createParts() {
      var i, j;
      this.backSprite = new Sprite();
      this.addChild(this.backSprite);
      this.content = new Sprite();
      this.addChild(this.content);
      this._outFrame = new Sprite();
      for (i = j = 0; j < 8; i = ++j) {
        this._outFrame.addChild(new Sprite());
      }
      return this.addChild(this._outFrame);
    }

    // * Отступ, чтобы за рамку не выходить
    _fillPadding() {
      return 2;
    }

    // * Размер частей на картинке
    _fillImagePartWidth() {
      return 96;
    }

    _fillImagePartHeight() {
      return 96;
    }

    // * Толщина рамки
    _frameThickness() {
      return 12;
    }

    _refreshAll() {
      this._refreshBack();
      return this._refreshTFrame();
    }

    _refreshBack() {
      var fh, fw, h, m, sprite, w;
      m = this._fillPadding();
      w = Math.max(0, this.width - m * 2);
      h = Math.max(0, this.height - m * 2);
      sprite = this.backSprite;
      sprite.bitmap = this.skinBitmap;
      // * Координаты фона из картинки
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      sprite.setFrame(0, 0, fw, fh);
      sprite.move(m, m);
      sprite.scale.x = w / fw;
      return sprite.scale.y = h / fh;
    }

    _refreshTFrame() {
      var drect, fh, fw, j, len, m, ref, spr, srect;
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      // * Положение назначения
      drect = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      };
      // * Координаты рамки на картинке
      srect = {
        x: fw,
        y: 0,
        width: fw,
        height: fh
      };
      m = this._frameThickness(); // * Толщина
      ref = this._outFrame.children;
      for (j = 0, len = ref.length; j < len; j++) {
        spr = ref[j];
        spr.bitmap = this.skinBitmap;
      }
      if (KDCore.isMZ()) {
        Window.prototype._setRectPartsGeometry.call(this, this._outFrame, srect, drect, m);
      } else {
        this._setRectPartsGeometry(this._outFrame, srect, drect, m);
      }
    }

    // * Этот метод существует в MZ, но нет в MV
    //? From MZ
    _setRectPartsGeometry(sprite, srect, drect, m) {
      var child, children, dh, dmh, dmw, dw, dx, dy, j, len, sh, smh, smw, sw, sx, sy;
      sx = srect.x;
      sy = srect.y;
      sw = srect.width;
      sh = srect.height;
      dx = drect.x;
      dy = drect.y;
      dw = drect.width;
      dh = drect.height;
      smw = sw - m * 2;
      smh = sh - m * 2;
      dmw = dw - m * 2;
      dmh = dh - m * 2;
      children = sprite.children;
      sprite.setFrame(0, 0, dw, dh);
      sprite.move(dx, dy);
      // corner
      children[0].setFrame(sx, sy, m, m);
      children[1].setFrame(sx + sw - m, sy, m, m);
      children[2].setFrame(sx, sy + sw - m, m, m);
      children[3].setFrame(sx + sw - m, sy + sw - m, m, m);
      children[0].move(0, 0);
      children[1].move(dw - m, 0);
      children[2].move(0, dh - m);
      children[3].move(dw - m, dh - m);
      // edge
      children[4].move(m, 0);
      children[5].move(m, dh - m);
      children[6].move(0, m);
      children[7].move(dw - m, m);
      children[4].setFrame(sx + m, sy, smw, m);
      children[5].setFrame(sx + m, sy + sw - m, smw, m);
      children[6].setFrame(sx, sy + m, m, smh);
      children[7].setFrame(sx + sw - m, sy + m, m, smh);
      children[4].scale.x = dmw / smw;
      children[5].scale.x = dmw / smw;
      children[6].scale.y = dmh / smh;
      children[7].scale.y = dmh / smh;
      // center
      if (children[8] != null) {
        children[8].setFrame(sx + m, sy + m, smw, smh);
        children[8].move(m, m);
        children[8].scale.x = dmw / smw;
        children[8].scale.y = dmh / smh;
      }
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.visible = dw > 0 && dh > 0;
      }
    }

  };
  return KDCore.Sprite_TilingFrame = Sprite_TilingFrame;
}));


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Window_ExtTextLineBase;
  // * Данное окно используется как основа для Sprite_UITextExt
  //rev 07.10.21
  Window_ExtTextLineBase = class Window_ExtTextLineBase extends Window_Base {
    constructor(rect, fontSettings) {
      super(rect);
      this.fontSettings = fontSettings;
      this.createContents();
      // * Всегда прозрачное окно
      this.setBackgroundType(2);
    }

    // * Нет отступов
    updatePadding() {
      return this.padding = 0;
    }

    // * Нет отступов
    itemPadding() {
      return 0;
    }

    textPadding() {
      return 0;
    }

    standardPadding() {
      return 0;
    }

    contentsWidth() {
      return this.width;
    }

    contentsHeight() {
      return this.height;
    }

    // * Более гибкая настройка размера текста при { }
    makeFontBigger() {
      return this.contents.fontSize += 1;
    }

    makeFontSmaller() {
      if (this.contents.fontSize > 1) {
        return this.contents.fontSize -= 1;
      }
    }

    // * Применение своих шрифта и размера текста
    resetFontSettings() {
      super.resetFontSettings();
      if (this.fontSettings == null) {
        return;
      }
      if (String.any(this.fontSettings.face)) {
        this.contents.fontFace = this.fontSettings.face;
      }
      if (this.fontSettings.size > 0) {
        this.contents.fontSize = this.fontSettings.size;
      }
      if (this.fontSettings.italic != null) {
        this.contents.fontItalic = this.fontSettings.italic;
      }
    }

  };
  return KDCore.Window_ExtTextLineBase = Window_ExtTextLineBase;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button M
  //------------------------------------------------------------------------------
  //@[AUTO EXTEND]
  // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

    // * Принимает название файла изображения кнопки без _00
  // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
  // * _02 - не используются в этом классе

    // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

    // * Если isFull - true, значит нужен _03
  KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
    constructor(filename, isFull = false, sourceFolder = null) {
      super();
      this._bitmaps = [];
      this._disabled = false;
      this._isTriggered = false;
      // * Когда произошло нажатие на кнопку
      this._handler = null;
      this._isCanBeClicked = true;
      this._isManualHoverMode = false;
      this._isManualSelected = false;
      this._loadBitmaps(filename, isFull, sourceFolder);
      this._setImageState(0);
      this._createThread();
    }

    setManualHover() {
      return this._isManualHoverMode = true;
    }

    disableManualHover() {
      return this._isManualHoverMode = false;
    }

    setManualSelected(_isManualSelected) {
      this._isManualSelected = _isManualSelected;
    }

    enableClick() {
      return this._isCanBeClicked = true;
    }

    disableClick() {
      return this._isCanBeClicked = false;
    }

    desaturate() {
      this.filters = [new PIXI.filters.ColorMatrixFilter()];
      this.filters[0].desaturate();
    }

    isMouseIn() {
      if (this._isManualHoverMode === true) {
        return this._isManualSelected;
      } else {
        return this.isUnderMouse() && this.visible === true;
      }
    }

    isActive() {
      if (this._isCanBeClicked === false) {
        return false;
      }
      if (this.parent != null) {
        return this.parent.visible === true && this.visible === true;
      } else {
        return this.visible === true;
      }
    }

    isDisabled() {
      return this._disabled === true;
    }

    addClickHandler(_handler) {
      this._handler = _handler;
    }

    clearClickHandler() {
      return this._handler = null;
    }

    // * Воспроизводит визуальный эффект нажатия
    simulateClick() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.isMouseIn()) {
        return;
      }
      this._startSimulation();
    }

    isEnabled() {
      return !this.isDisabled();
    }

    refreshState(isEnable = true) {
      if (isEnable === true) {
        if (this.isDisabled()) {
          this.enable();
        }
      } else {
        if (this.isEnabled()) {
          this.disable();
        }
      }
    }

    disable() {
      this._disabled = true;
      return this._setImageState(2);
    }

    enable() {
      this._disabled = false;
      return this._setImageState(0);
    }

    click() {
      if (this._handler != null) {
        return this._handler();
      }
    }

    update() {
      super.update();
      return this._updateMain();
    }

  };
  return (function() {    
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ ButtonM Implementation
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
    //@[DEFINES]
    _ = KDCore.ButtonM.prototype;
    _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(filename + '_00'));
      this._bitmaps.push(getterFunc(filename + '_01'));
      if (isFull) {
        this._bitmaps.push(getterFunc(filename + '_03'));
      }
    };
    _._getGetter = function(sourceFolder = null) {
      var getterFunc;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder !== null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
        };
      }
      return getterFunc;
    };
    _._setImageState = function(index = 0) {
      if (this._bitmaps[index] == null) {
        index = 0;
      }
      this.bitmap = this._bitmaps[index];
      this._lastState = index;
    };
    _._createThread = function() {
      this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
      this.hoverThread.applyTimeRange(-1, 1);
      this.hoverThread.call();
    };
    //?[DYNAMIC]
    _._updateMain = function() {
      this._updateMouseLogic();
      if (!this.isActive()) {
        if (($gameTemp.kdButtonUnderMouse != null) && $gameTemp.kdButtonUnderMouse === this) {
          return $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseLogic = function() {
      this.hoverThread.update();
      return this._updateMouseClick();
    };
    _._updateHover = function() {
      if (!this.isActive()) {
        return;
      }
      // * чтобы эффект нажатия не прекратить
      if (this._isTriggered === true) {
        return;
      }
      if (this.isMouseIn()) {
        if (this._lastState !== 1) {
          if (!this.isDisabled()) {
            this._setImageState(1);
          }
          $gameTemp.kdButtonUnderMouse = this;
        }
      } else {
        if (this._lastState !== 0) {
          if (!this.isDisabled()) {
            this._setImageState(0);
          }
          if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        } else if ($gameTemp.kdButtonUnderMouse === this) {
          $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseClick = function() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.isMouseIn()) {
        this._isTriggered = true;
        this._setImageState(0);
      }
      if (this._isTriggered === true) {
        if (TouchInput.isReleased()) {
          this._isTriggered = false;
          if (this.isMouseIn()) {
            this.click();
          }
        }
      }
    };
    _._startSimulation = function() {
      this._setImageState(1);
      this._simulateThread = new KDCore.TimedUpdate(10, () => {
        return this._setImageState(0);
      });
      this._simulateThread.once();
      return this._updateMain = this._updateMouseClickSimulated;
    };
    _._updateMouseClickSimulated = function() {
      this._simulateThread.update();
      if (!this._simulateThread.isAlive()) {
        this._simulateThread = null;
        this._updateMain = this._updateMouseLogic;
      }
    };
    // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

    //@[ALIAS]
    alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function() {
      if ($gameTemp.kdButtonUnderMouse != null) {
        return true;
      } else {
        return alias_SM_isAnyButtonPressed.call(this);
      }
    };
    //TODO: Добавить доп. проверку?
    //@[ALIAS]
    alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
      $gameTemp.kdButtonUnderMouse = null;
      setTimeout((function() {
        return $gameTemp.kdButtonUnderMouse = null;
      }), 50);
      return alias_SM_onMapLoaded.call(this);
    };
  })();
});

// ■ END ButtonM Implementation
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button Mini User - класс с определением файла каждого состояния отдельно
  // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
  // ? states = { main, hover, disabled }
  return KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
    constructor() {
      super(...arguments);
    }

    //$[OVER]
    _loadBitmaps(states, isFull = true, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(states.main));
      this._bitmaps.push(getterFunc(states.hover));
      // * Optional 03
      if (String.any(states.disabled)) {
        this._bitmaps.push(getterFunc(states.disabled));
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_TilingLine;
  Sprite_TilingLine = class Sprite_TilingLine extends KDCore.Sprite_TilingFrame {
    constructor() {
      super(...arguments);
    }

    //$[OVER BASE ALL BELOW]
    _fillPadding() {
      return 0;
    }

    _refreshTFrame() {} // * EMPTY

    _fillImagePartWidth() {
      return 4;
    }

    _fillImagePartHeight() {
      return 26;
    }

  };
  return KDCore.Sprite_TilingLine = Sprite_TilingLine;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Пространство имён для всех UIElements
  KDCore.UI = KDCore.UI || {};
  (function() {    // * Общий класс для всех UI элементов
    //?rev 13.10.20
    var Sprite_UIElement;
    Sprite_UIElement = (function() {
      // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
      //@[ABSTRACT]
      class Sprite_UIElement extends KDCore.Sprite {
        constructor(params) {
          super();
          this.params = params;
          this._init();
        }

        // * Стандартный набор настроек
        defaultParams() {
          return {
            visible: true
          };
        }

        // * Общий метод (есть у всех элементов)
        // * По умолчанию вызывает drawText, но потомки могут переопределить
        draw() {
          return this.drawText(...arguments);
        }

        // * Общий метод
        drawText() {} // * EMPTY

        
          // * Если изначально невидимый (из параметров), то не активный вообще
        isActive() {
          return this.params.visible === true;
        }

        rootImageFolder() {
          return Sprite_UIElement.RootImageFolder;
        }

        // * Сделать чёрно белым
        desaturate() {
          this.filters = [new PIXI.filters.ColorMatrixFilter()];
          this.filters[0].desaturate();
        }

        // * Общий метод (можно ли редактировать визуально)
        isCanBeEdited() {
          return false;
        }

        // * Общий метод (надо ли скрывать при игровом сообщнии)
        isHaveHideWithMessageFlag() {
          return false;
        }

        // * Общий метод (находится ли объект под мышкой)
        isUnderMouse() {
          var ref;
          return (ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0;
        }

        // * Параметры первого элемента (если он есть)
        realWidth() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realWidth();
            } else {
              return child.width;
            }
          }
          return 0;
        }

        realHeight() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realHeight();
            } else {
              return child.height;
            }
          }
          return 0;
        }

        // * Первый "физический" элемент (спрайт)
        zeroChild() {
          return this.children[0];
        }

        // * Метод восстановления значения на стандартные настройки
        reset(property) {
          var e;
          try {
            switch (property) {
              case "position":
                this._resetPosition();
                break;
              default:
                this[property] = this.params[property];
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }

      };

      // * Корневая директория для изображений
      Sprite_UIElement.RootImageFolder = "Alpha";

      return Sprite_UIElement;

    }).call(this);
    KDCore.UI.Sprite_UIElement = Sprite_UIElement;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIElement.prototype;
    _._init = function() {
      var e;
      this._prepare();
      try {
        return this._createContent();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        // * Если при создании произошла ошибка, отключаем элемент
        return this.isActive = function() {
          return false;
        };
      }
    };
    
    // * Подготовка элемента (проверка параметров)
    _._prepare = function() {
      if (this.params == null) {
        this.params = this.defaultParams();
      }
      return this.visible = this.params.visible;
    };
    // * Наследники создают свои элементы в этом методе
    _._createContent = function() {}; // * EMPTY
    
    // * Сброс позиции
    _._resetPosition = function() {
      var e, x, y;
      if (this.params.position == null) {
        return;
      }
      try {
        ({x, y} = this.params.position);
        this.move(x, y);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIButton;
    // * Кнопка на экране, можно нажимать
    Sprite_UIButton = class Sprite_UIButton extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "Button_Inventory",
          isHaveDisabled: true,
          click: "console.log('click')" // * число или код
        };
      }

      // * Кнопка не поддерживает перерисовку
      draw() {} // * EMPTY

      disable() {
        var ref;
        return (ref = this.button) != null ? ref.disable() : void 0;
      }

      enable() {
        var ref;
        return (ref = this.button) != null ? ref.enable() : void 0;
      }

      setState(isEnabled) {
        if (isEnabled) {
          return this.enable();
        } else {
          return this.disable();
        }
      }

      
        // * Просто вызов метода
      call() {
        var ref;
        return (ref = this.button) != null ? ref.click() : void 0;
      }

      // * Вызов метода с симуляцией нажатия
      click() {
        var ref, ref1;
        if ((ref = this.button) != null) {
          ref.click();
        }
        return (ref1 = this.button) != null ? ref1.simulateClick() : void 0;
      }

    };
    KDCore.UI.Sprite_UIButton = Sprite_UIButton;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIButton.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.image.isEmpty()) {
        KDCore.warning('You try create Button without image');
        return;
      }
      this.button = new KDCore.ButtonM(this.params.image, this.params.isHaveDisabled, this.rootImageFolder());
      this.add(this.button);
      return this._registerClickMethod();
    };
    _._registerClickMethod = function() {
      var commonEventId, e, method, ref, script;
      if (!String.any(this.params.click)) {
        return;
      }
      method = null;
      try {
        // * Если число, то значит общее событие
        if (isFinite(this.params.click)) {
          commonEventId = parseInt(this.params.click);
          if (commonEventId > 0) {
            method = function() {
              return $gameTemp.reserveCommonEvent(commonEventId);
            };
          }
        } else {
          // * Иначе скрипт
          script = this.params.click;
          method = function() {
            return eval(script);
          };
        }
        return this.button.addClickHandler(method);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return (ref = this.button) != null ? ref.clearClickHandler() : void 0;
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Рисует лицо персонажа (из папки Faces)
    var Sprite_UIFace;
    Sprite_UIFace = class Sprite_UIFace extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          faceName: "Actor1",
          faceIndex: 0,
          mirror: false,
          size: 144
        };
      }

      draw() {
        return this.drawFace(...arguments);
      }

      drawFace(faceName, faceIndex) {
        return this._drawFaceWhenReady(faceName, faceIndex);
      }

    };
    KDCore.UI.Sprite_UIFace = Sprite_UIFace;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIFace.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._createFaceSprite();
    };
    _._createFaceSprite = function() {
      this._faceSpr = KDCore.Sprite.FromBitmap(this.params.size);
      if (this.params.mirror === true) {
        this._flipFaceSpr();
      }
      this.add(this._faceSpr);
      this._drawFaceWhenReady(this.params.faceName, this.params.faceIndex);
    };
    _._flipFaceSpr = function() {
      this._faceSpr.scale.x = -1;
      this._faceSpr.x = this.params.size;
    };
    _._drawFaceWhenReady = function(name, index = 0) {
      var ref;
      if ((ref = this._faceSpr) != null) {
        ref.clear();
      }
      if (!String.any(name)) {
        return;
      }
      if (index < 0) {
        return;
      }
      this._drawOnReady = {name, index};
      this._faceSourceBitmap = ImageManager.loadFace(name);
      this._faceSourceBitmap.addLoadListener(this._drawFace.bind(this));
      this._drawFace();
    };
    _._drawFace = function() {
      var fh, fw, size, sx, sy;
      if (this._faceSpr == null) {
        return;
      }
      this._faceSpr.clear();
      if (!String.any(this._drawOnReady.name)) {
        return;
      }
      fw = ImageManager.faceWidth;
      fh = ImageManager.faceHeight;
      size = this.params.size;
      sx = (this._drawOnReady.index % 4) * fw;
      sy = Math.floor(this._drawOnReady.index / 4) * fh;
      this._faceSpr.bitmap.blt(this._faceSourceBitmap, sx, sy, fw, fh, 0, 0, size, size);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIGauge;
    Sprite_UIGauge = class Sprite_UIGauge extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          fill: "",
          foreground: "",
          mask: "",
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false
        };
      }

      draw() {
        return this.drawGauge(...arguments);
      }

      drawGauge(percent = 1) {
        this._lastValue = percent;
        return this._drawGauge(percent);
      }

      isVertical() {
        return this.params.vertical === true;
      }

    };
    KDCore.UI.Sprite_UIGauge = Sprite_UIGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIGauge.prototype;
    //$[OVER]
    _._createContent = function() {
      // * Загружается главное изображение, затем уже все остальные, т.к. нужны размеры
      return this._loadFillImage();
    };
    _._loadFillImage = function() {
      // * Главное изображение, поэтому если не указано, то ничего
      if (this.params.fill.isEmpty()) {
        KDCore.warning('You try create Gauge without fill image');
        return;
      }
      KDCore.Utils.loadImageAsync(this.rootImageFolder(), this.params.fill).then(this._createParts.bind(this));
    };
    // * Получаем изображение заполнения и создаём части (т.к. есть размеры)
    _._createParts = function(fillBitmap) {
      this.fillBitmap = fillBitmap;
      this._createBackground();
      this._createFillLayer();
      this._loadForeground();
      this._loadMask();
      return this._onReady();
    };
    _._createBackground = function() {
      this.background = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      this.background.b().fillAll(this.params.backColor);
      this.background.opacity = this.params.backOpacity;
      return this.add(this.background);
    };
    _._createFillLayer = function() {
      this.fillLayer = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      return this.add(this.fillLayer);
    };
    _._loadForeground = function() {
      var fore;
      if (String.isNullOrEmpty(this.params.foreground)) {
        return;
      }
      fore = KDCore.Sprite.FromImg(this.params.foreground, this.rootImageFolder());
      return this.add(fore);
    };
    _._loadMask = function() {
      var mask;
      if (String.isNullOrEmpty(this.params.mask)) {
        return;
      }
      mask = KDCore.Sprite.FromImg(this.params.mask, this.rootImageFolder());
      this.mask = mask;
      return this.add(mask);
    };
    // * Если что-то было до готовности, нарисовать
    _._onReady = function() {
      this.drawGauge(this._lastValue);
    };
    _._drawGauge = function(percent) {
      if (this.fillLayer == null) {
        return;
      }
      this.fillLayer.clear();
      if (this.isVertical()) {
        return this._drawVerGauge(percent);
      } else {
        return this._drawHorGauge(percent);
      }
    };
    _._drawHorGauge = function(percent) {
      var w;
      w = this.fillBitmap.width * percent;
      return this.fillLayer.b().blt(this.fillBitmap, 0, 0, w, this.fillLayer.height, 0, 0);
    };
    _._drawVerGauge = function(percent) {
      var h, hy;
      h = this.fillBitmap.height * percent;
      hy = this.fillBitmap.height - h;
      this.fillLayer.b().blt(this.fillBitmap, 0, 0, this.fillLayer.width, h, 0, hy);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIIcon;
    Sprite_UIIcon = class Sprite_UIIcon extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          index: 0,
          size: 32
        };
      }

      draw() {
        return this.drawIcon(...arguments);
      }

      drawIcon(index = 0) {
        this._lastValue = index;
        return this._drawIcon(index);
      }

    };
    KDCore.UI.Sprite_UIIcon = Sprite_UIIcon;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIIcon.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createIcon();
      return this._drawIcon(this.params.index);
    };
    _._createIcon = function() {
      this._icon = KDCore.Sprite.FromBitmap(this.params.size, this.params.size);
      this.add(this._icon);
      return this._onReady();
    };
    _._onReady = function() {
      return this.drawIcon(this._lastValue);
    };
    _._drawIcon = function(index) {
      this._icon.clear();
      if (KDCore.SDK.isString(index)) {
        this._drawImageIcon(index);
      } else {
        if (index <= 0) {
          return;
        }
        this._icon.drawIcon(0, 0, index, this.params.size);
      }
    };
    _._drawImageIcon = function(imageName) {
      return KDCore.Utils.loadImageAsync(this.rootImageFolder(), imageName).then((bitmap) => {
        return this._icon.drawIcon(0, 0, bitmap, this.params.size);
      });
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIImage;
    Sprite_UIImage = class Sprite_UIImage extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: ""
        };
      }

      draw() {
        return this.drawImage(...arguments);
      }

      drawImage(image) {
        return this._drawImage(image);
      }

    };
    KDCore.UI.Sprite_UIImage = Sprite_UIImage;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIImage.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._drawImage(this.params.image);
    };
    _._drawImage = function(image) {
      this._clearImage();
      if (!String.isNullOrEmpty(image)) {
        this._image = KDCore.Sprite.FromImg(image, this.rootImageFolder());
        this.add(this._image);
      }
    };
    _._clearImage = function() {
      if (this._image == null) {
        return;
      }
      this._image.visible = false;
      this.removeChild(this._image);
      return this._image = null;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIRect;
    Sprite_UIRect = class Sprite_UIRect extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          fillColor: "#FFFFFF".toCss(),
          fillOpacity: 255,
          borderColor: "#000000".toCss(),
          borderThickness: 1,
          borderOpacity: 255
        };
      }

      draw() {
        return this.fill(...arguments);
      }

      fill(color, opacity = 255) {
        return this._fill(color, opacity);
      }

      drawBorder(color, thickness = 1, opacity = 255) {
        return this._drawBorder(color, thickness, opacity);
      }

    };
    KDCore.UI.Sprite_UIRect = Sprite_UIRect;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIRect.prototype;
    //$[OVER]
    _._createContent = function() {
      if (String.any(this.params.fillColor)) {
        this._createFill();
        this.fill(this.params.fillColor, this.params.fillOpacity);
      }
      if (String.any(this.params.borderColor) && this.params.borderThickness > 0) {
        this._createBorder();
        return this.drawBorder(this.params.borderColor, this.params.borderThickness, this.params.borderOpacity);
      }
    };
    _._createFill = function() {
      this._fillSpr = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._fillSpr);
    };
    _._createBorder = function() {
      this._borderSprite = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._borderSprite);
    };
    _._fill = function(color, opacity) {
      if (this._fillSpr == null) {
        return;
      }
      this._fillSpr.fillAll(color);
      this._fillSpr.opacity = opacity;
    };
    _._drawBorder = function(color, thickness, opacity) {
      var b;
      if (this._borderSprite == null) {
        return;
      }
      this._borderSprite.clear();
      b = this._borderSprite.b();
      // * Top line
      b.fillRect(0, 0, b.width, thickness, color);
      // * Bottom line
      b.fillRect(0, b.height - thickness, b.width, thickness, color);
      // * Left line
      b.fillRect(0, 0, thickness, b.height, color);
      // * Right line
      b.fillRect(b.width - thickness, 0, thickness, b.height, color);
      return this._borderSprite.opacity = opacity;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 30.12.21
    var Sprite_UIText;
    Sprite_UIText = class Sprite_UIText extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          alignment: "center",
          font: {
            face: null,
            size: 18,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#FFFFFF".toCss()
        };
      }

      //?DYNAMIC
      // * Сперва рисуем по готовности, а как загрузился спрайт, меняем
      drawText(text) {
        return this._drawTextWhenReady(text);
      }

      // * Сборка текста с учётом формата
      drawTextWithFormat(/*format string, arguments parameters... */) {
        var text;
        text = this._convertFormatedString(...arguments);
        this.drawText(text);
      }

      // * Пишет текст с определённым цветом (один раз)
      drawTextColor(text, colorCss) {
        if (this._textSpr == null) {
          return;
        }
        this._textSpr.b().textColor = colorCss;
        this.drawText(text);
        this._textSpr.b().textColor = this.params.textColor;
      }

    };
    KDCore.UI.Sprite_UIText = Sprite_UIText;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIText.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._createTextSprite();
    };
    _._createTextSprite = function() {
      this._textSpr = KDCore.Sprite.FromParams(this.params);
      this._textSpr.onReady(this._onReady.bind(this));
      return this.add(this._textSpr);
    };
    // * Выполнить по готовности
    _._onReady = function() {
      // * Переключить метод, так как уже готов
      this.drawText = this._drawText;
      // * Написать то что нужно было до готовности (если есть)
      if (this._drawOnReady == null) {
        return;
      }
      this.drawText(this._drawOnReady);
      this._drawOnReady = null;
    };
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      if (text != null) {
        this._textSpr.drawTextFull(text);
      }
    };
    // * Написать текст когда будет готов
    _._drawTextWhenReady = function(text) {
      this._drawOnReady = text;
      return this._drawText(text);
    };
    
    // * Заменить вхождения %1, %2 на значения параметров
    _._convertFormatedString = function(/*text, args...*/) {
      var e, i, j, ref, text;
      try {
        text = arguments[0];
        for (i = j = 1, ref = arguments.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
          try {
            if (arguments[i] == null) {
              continue;
            }
            text = text.replace("%" + i, arguments[i]);
          } catch (error) {
            e = error;
            KDCore.UI.warning(e);
            text = "[wrong format text input]";
          }
        }
        return text;
      } catch (error) {
        e = error;
        KDCore.UI.warning(e);
        return "[wrong format text input]";
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 30.12.21
    var Sprite_UITextExt;
    Sprite_UITextExt = class Sprite_UITextExt extends KDCore.UI.Sprite_UIText {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 200,
            h: 60
          },
          font: {
            face: null,
            size: 14,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          // * новые параметры (KDCore 2.7)
          //?null могут быть
          singleLine: false,
          forceCentered: false
        };
      }

      //$[OVER]
      // * Данный метод не поддерживается, так как тут основа не Sprite, а Window
      drawTextColor() {
        return this.drawText(...arguments);
      }

    };
    KDCore.UI.Sprite_UITextExt = Sprite_UITextExt;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextExt.prototype;
    //$[OVER]
    _._createTextSprite = function() {
      var rect;
      rect = new Rectangle(0, 0, this.params.size.w, this.params.size.h);
      this._textSpr = new KDCore.Window_ExtTextLineBase(rect, this.params.font);
      this._textSpr.x = this.params.margins.x || 0;
      this._textSpr.y = this.params.margins.y || 0;
      this.add(this._textSpr);
      // * На следующий кадр, чтобы не было потери текста (опасно)
      //setTimeout (=> @_onReady() ), 10
      this._onReady(); // * Сразу
    };
    
    //$[OVER]
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.contents.clear();
      if (this.params.forceCentered === true) {
        this._textSpr.drawTextExInCenter(text, 0, 0, this._textSpr.width, this._textSpr.height);
      } else {
        if (this.params.singleLine === true) {
          this._textSpr.drawTextEx(text, 0, 0, this._textSpr.width);
        } else {
          // * По умолчанию
          this._textSpr.drawTextExWithWordWrap(text, 0, 0, this._textSpr.width);
        }
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UITextWithBack;
    Sprite_UITextWithBack = class Sprite_UITextWithBack extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          text: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            alignment: "center",
            font: {
              face: null,
              size: 18,
              italic: false
            },
            margins: {
              x: 0,
              y: 0
            },
            outline: {
              color: null,
              width: 2
            },
            textColor: "#000000".toCss()
          },
          rect: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            fillColor: "#FFFFFF".toCss(),
            fillOpacity: 255,
            borderColor: "#000000".toCss(),
            borderThickness: 1,
            borderOpacity: 255
          },
          textMargins: {
            x: 0,
            y: 0
          }
        };
      }

      draw() {
        return this.drawText(...arguments);
      }

      // * Aргументы смотри в Sprite_UIText
      drawText() {
        return this.text.draw(...arguments);
      }

      drawTextColor() {
        return this.text.drawTextColor(...arguments);
      }

      // * Аргументы смотри в Sprite_UIRect
      fill() {
        return this.rect.fill(...arguments);
      }

      drawBorder() {
        return this.rect.drawBorder(...arguments);
      }

      //$[OVER]
      isUnderMouse() {
        return this.rect.isUnderMouse();
      }

    };
    KDCore.UI.Sprite_UITextWithBack = Sprite_UITextWithBack;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextWithBack.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createRect();
      return this._createText();
    };
    _._createRect = function() {
      this.rect = new KDCore.UI.Sprite_UIRect(this.params.rect);
      return this.addChild(this.rect);
    };
    _._createText = function() {
      var x, y;
      this.text = new KDCore.UI.Sprite_UIText(this.params.text);
      ({x, y} = this.params.textMargins);
      this.text.move(x, y);
      return this.addChild(this.text);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIColorGauge;
    Sprite_UIColorGauge = class Sprite_UIColorGauge extends KDCore.UI.Sprite_UIGauge {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 100,
            h: 40
          },
          fill: "#FFFFFF", // * В отличии от Gauge, тут цвет, а не картинка
          foreground: "", // картинка
          mask: "", // картинка
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false
        };
      }

    };
    KDCore.UI.Sprite_UIColorGauge = Sprite_UIColorGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIColorGauge.prototype;
    //$[OVER]
    // * Заместо изображения используем простой Bitmap с заливкой цвета
    _._loadFillImage = function() {
      var fillBitmap;
      fillBitmap = new Bitmap(this.params.size.w, this.params.size.h);
      fillBitmap.fillAll(this.params.fill);
      this._createParts(fillBitmap);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__processEscapeCharacter, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    switch (code) {
      case 'CHEX':
        this.pProcessColorChangeHex(this.pObtainEscapeParamHexColor(textState));
        break;
      case 'ISZ':
        this.pProcessDrawIconSized(this.pObtainEscapeParamIconArr(textState), textState);
        break;
      case 'PSZ':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, false);
        break;
      case 'PSB':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, true);
        break;
      default:
        ALIAS__processEscapeCharacter.call(this, code, textState);
    }
  };
  //?NEW
  _.pObtainEscapeParamHexColor = function(textState) {
    var arr, regExp, textPart;
    regExp = /^\[(#?([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return "";
    }
  };
  //?NEW
  _.pObtainEscapeParamIconArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          return parseInt(i.trim());
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pObtainEscapeParamImgArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\w+,\s*\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          if (isFinite(i)) {
            return parseInt(i.trim());
          } else {
            return i;
          }
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pProcessColorChangeHex = function(colorHex) {
    var e;
    try {
      this.changeTextColor(colorHex);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.resetTextColor();
    }
  };
  //?NEW
  //?params: [INDEX, SIZE, DX, DY]
  _.pProcessDrawIconSized = function(params, textState) {
    var dx, dy, e, iconIndex, size, staticMargin, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      size = params[1];
      if (params[1] == null) {
        size = ImageManager.iconWidth;
      }
      if (params[2] == null) {
        params[2] = 0;
      }
      if (params[3] == null) {
        params[3] = 0;
      }
      iconIndex = params[0];
      dx = params[2];
      dy = params[3];
      staticMargin = 2;
      x = textState.x + staticMargin + dx;
      y = textState.y + staticMargin + dy;
      // * Только в режиме рисования
      if (textState.drawing === true) {
        this.contents.drawIcon(x, y, iconIndex, size);
      }
      textState.x += size + (staticMargin * 2) + dx;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  //?NEW
  //?params: [NAME, W, H, DX, DY]
  _.pProcessDrawPictureSized = function(params, textState, isUnderText = false) {
    var drawBitmap, drawProcess, e, height, name, source, width, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      name = params[0];
      if (!String.any(name)) {
        return;
      }
      width = params[1];
      height = params[2];
      if (params[3] == null) {
        params[3] = 0;
      }
      if (params[4] == null) {
        params[4] = 0;
      }
      x = textState.x + 2 + params[3];
      y = textState.y + 2 + params[4];
      drawBitmap = this.contents;
      source = this.pGetSourceImageForDrawPictureSized(name);
      if (textState.drawing === true) {
        drawProcess = function() {
          var e;
          try {
            if (drawBitmap == null) {
              return;
            }
            return drawBitmap.drawOnMe(source, x, y, width, height);
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        source.addLoadListener(drawProcess);
      }
      if (isUnderText !== true) {
        // * Вариант, что текст не будет "перескакивать" за ширину картинки а пойдёт поверх (т.е. фоновая картинка)
        // * Если картине не preload, то может "вылезти" на текст потом, так как рисоваться будет позже
        textState.x += width + 4 + params[3];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Данный метод вынесен отдельно, чтобы можно было переопределять папки
  return _.pGetSourceImageForDrawPictureSized = function(name) {
    return ImageManager.loadPicture(name);
  };
});


// Generated by CoffeeScript 2.6.1



// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var FloatingWindow;
  
    // * Общий класс для всех окон на карте
  /*parameters
      {
          draggable: true,
          closeButton: true,
          moveToCenter: true,
          alwaysOnTop: true,
          header: true
      }
  */
  FloatingWindow = class FloatingWindow extends KDCore.Sprite {
    constructor(mainParent, windowW, windowH, parameters) {
      super();
      this.mainParent = mainParent;
      this.windowW = windowW;
      this.windowH = windowH;
      this.parameters = parameters;
      this._init();
      return;
    }

    static StaticSettings() {
      return {
        draggable: false,
        closeButton: false,
        moveToCenter: false,
        alwaysOnTop: false,
        header: false
      };
    }

    // * Статическое окно с дочерним
    static StaticWindow(parent, sub) {
      var p, w;
      p = KDCore.FloatingWindow.StaticSettings();
      w = new KDCore.FloatingWindow(parent, sub.width, sub.height, p);
      w.setSubWindow(sub);
      w.open();
      return w;
    }

    isActive() {
      return this.visible === true;
    }

    isReady() {
      return this._isReady === true;
    }

    isMouseIn() {
      return this.inPosition(TouchInput);
    }

    isOpen() {
      return this.isActive();
    }

    // * Дочернее окно (если есть)
    sub() {
      return this._subw;
    }

    setOnReadyHandler(_readyHandler) {
      this._readyHandler = _readyHandler;
      if ((this._readyHandler != null) && this._isReady === true) {
        return this._readyHandler();
      }
    }

    isDraggable() {
      return this._isDraggable === true && (this._headerSpr != null) && this._headerSpr.visible === true && this.isOpen();
    }

    setCloseHandler(_closeHandler) {
      this._closeHandler = _closeHandler;
    }

    callCloseHandler() {
      if (this._closeHandler != null) {
        return this._closeHandler();
      }
    }

    setDraggingHandler(_dragHandler) {
      this._dragHandler = _dragHandler;
    }

    setDragEndHandler(_dragEndHandler) {
      this._dragEndHandler = _dragEndHandler;
    }

    hideHeader() {} //TODO:

    hideCloseButton() {} //TODO:

    
      // * Сдвиг заголовка по X, чтобы рамку не задевал
    headerMarginX() {
      return 2;
    }

    // * Сдвиг заголовка по Y, чтобы рамку не задевал
    headerMarginY() {
      return 0;
    }

    // * Стандартная позиция кнопки "закрыть"
    closeButtonPosition() {
      return {
        x: this.width - 24,
        y: 4
      };
    }

    open() {
      if (this.isOpen()) {
        return;
      }
      this._open();
      this._afterOpen();
    }

    close() {
      if (!this.isOpen()) {
        return;
      }
      this._close();
      this._afterClose();
    }

    rootImageFolder() {
      return "Alpha/Windows";
    }

    update() {
      super.update();
      this._updateMouseCheckThread();
      this._updateDragging();
    }

    // * Добавить спрайт на специальный слой контента
    addContent(sprite) {
      return this._contentLayer.addChild(sprite);
    }

    // * Добавить дочернее окно
    setSubWindow(w) {
      this._subw = w;
      this.addContent(w);
    }

    destroy() {
      this._close();
      return Sprite.prototype.destroy.call(this);
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = FloatingWindow.prototype;
    _._init = function() {
      var ref;
      // * Окно всегда закрыто
      this.visible = false;
      // * Контент прогрузился?
      this._isReady = false;
      this._applyParameters();
      if (this._isAlwaysOnTop === false) {
        // * Если не всегда поверх окон, то добавляем сразу к родителю (один раз)
        if ((ref = this.mainParent) != null) {
          ref.addChild(this);
        }
      }
      this._initFloatingSystem();
      this._createLayers();
      this._loadWindowFrame();
    };
    // * Тут ничего не создавать, не двигать, так как
    // * конент создаётся Async, см. метод _createCustomElements
    _._applyParameters = function() {
      var p;
      this._applyDefaults();
      if (this.parameters == null) {
        return;
      }
      p = this.parameters;
      if (p.draggable != null) {
        this._isDraggable = p.draggable;
      }
      if (p.moveToCenter != null) {
        this._isMoveToCenter = p.moveToCenter;
      }
      if (p.header != null) {
        this._isHeaderVisible = p.header;
      }
      if (p.closeButton != null) {
        this._isHaveCloseButton = p.closeButton;
      }
      if (p.alwaysOnTop != null) {
        this._isAlwaysOnTop = p.alwaysOnTop;
      }
    };
    _._applyDefaults = function() {
      // * Окно можно перетаскивать мышкой (по умолчанию - да)
      this._isDraggable = true;
      this._isMoveToCenter = true;
      this._isHeaderVisible = true;
      this._isHaveCloseButton = true;
      this._isAlwaysOnTop = true;
    };
    _._initFloatingSystem = function() {
      if ($gameTemp._floatingWindows == null) {
        // * Создаём массив окон, он нужен для правильного
        // закрытия окон (по очереди) и перемещения drag and drop
        // с учётом верхнего окна
        $gameTemp._floatingWindows = [];
      }
      // * Вспомогательная переменная, чтобы не вызывать методы каждый кадр
      this._mouseIn = false;
      // * Тоже вспомогательная переменная
      this._dragging = false;
    };
    _._moveToStartPosition = function() {
      if (this._isMoveToCenter === true) {
        return this.moveToCenter(Graphics.width / 2, Graphics.height / 2);
      }
    };
    _._closeButtonClick = function() {
      // * При исчезании, кнопка не успевает себя "удалить"
      $gameTemp.kdButtonUnderMouse = null;
      this.callCloseHandler();
      return this.close();
    };
    (function() {      // * DRAGGING
      // -----------------------------------------------------------------------
      _._updateDragging = function() {
        if (!this.isDraggable()) {
          return;
        }
        // * Если мы уже двигаем окно, но мышка вышла за границы, то можно дальше двигать
        // * Только если мышка не в окне и не двигали ранее, то не проверяем
        if (this._mouseIn === false && this._dragging === false) {
          return;
        }
        // * Если существует объект который сейчас dragging
        if ($gameTemp.pkdDraggableInstance != null) {
          // * Если этот объект не этот объект, то выходим из метода
          if ($gameTemp.pkdDraggableInstance !== this) {
            return;
          }
        }
        if (TouchInput.isLongPressed()) {
          if (this._dragging === false) {
            this._onDragStart();
          } else {
            this._onDragging();
          }
        } else {
          this._stopDragging();
        }
      };
      _._onDragStart = function() {
        // * Проверка, в области Header или нет
        if (!this._isMouseInHeader()) {
          return;
        }
        // * Разница в координатах курсора и объекта, чтобы убрать эффект "прыжка"
        this.opacity = 200;
        this._deltaXY = this.getDeltaXY();
        this._dragging = true;
        // * Устанавливаем глобальную ссылку на объект перемещения
        $gameTemp.pkdDraggableInstance = this;
      };
      _.getDeltaXY = function() {
        var p;
        p = new KDCore.Point(this.x, this.y);
        return p.delta(TouchInput);
      };
      _._onDragging = function() {
        // * Защита от перетаскивания за края экрана
        if (!this._isNewMousePositionOnScreen()) {
          return;
        }
        this.move(TouchInput.x - this._deltaXY.x, TouchInput.y - this._deltaXY.y);
        if (this._dragHandler != null) {
          return this._dragHandler();
        }
      };
      _._stopDragging = function() {
        if (this._dragging === true) {
          this._dragging = false;
          this.opacity = 255;
          this._clearDraggableGlocalInstance();
          if (this._dragEndHandler != null) {
            this._dragEndHandler();
          }
        }
      };
      // * Освобождаем глобальную ссылку
      _._clearDraggableGlocalInstance = function() {
        if ($gameTemp.pkdDraggableInstance === this) {
          return $gameTemp.pkdDraggableInstance = null;
        }
      };
      _._isMouseInHeader = function() {
        if (this._headerSpr == null) {
          return false;
        }
        return this._headerSpr.isContainsPoint(TouchInput);
      };
      _._isNewMousePositionOnScreen = function() {
        return KDCore.Utils.isPointInScreen(TouchInput, 10);
      };
    })();
    (function() {      // -----------------------------------------------------------------------

      // * CREATE ELEMENTS
      // -----------------------------------------------------------------------
      
      // * Слои нужны, так как изображения загружаються асинхронно
      _._createLayers = function() {
        this._mainLayer = new Sprite();
        this._contentLayer = new Sprite();
        this._headerLayer = new Sprite();
        this._closeButtonLayer = new Sprite();
        this.addChild(this._mainLayer);
        this.addChild(this._contentLayer);
        this.addChild(this._headerLayer);
        this.addChild(this._closeButtonLayer);
      };
      _._loadWindowFrame = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "windowFrame").then(this._createWindow.bind(this));
      };
      _._createWindow = function(frameImage) {
        this.bitmap = new Bitmap(this.windowW, this.windowH);
        this.wFrame = new KDCore.Sprite_TilingFrame(this.windowW, this.windowH, frameImage);
        this._mainLayer.addChild(this.wFrame);
        this._createParts();
      };
      _._createParts = function() {
        this._loadHeader();
        if (this._isHaveCloseButton === true) {
          this._createCloseButton();
        }
        this._moveToStartPosition();
        this._createCustomElements();
        // * Окно готово
        this._isReady = true;
        if (this._readyHandler != null) {
          this._readyHandler();
        }
      };
      _._loadHeader = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "headerLine").then(this._createHeader.bind(this));
      };
      _._createHeader = function(headerLineImage) {
        var w;
        w = this.windowW - (this.headerMarginX() * 2);
        this._headerSpr = new KDCore.Sprite_TilingLine(w, headerLineImage.height, headerLineImage);
        this._headerSpr.x = this.headerMarginX();
        this._headerSpr.y = this.headerMarginY();
        this._headerLayer.addChild(this._headerSpr);
        if (this._isHeaderVisible === true) {
          // * Сдвигаем контент, чтобы было начало под заголовком
          this._contentLayer.y += headerLineImage.height + this.headerMarginY();
        } else {
          this._headerSpr.visible = false;
        }
      };
      _._createCloseButton = function() {
        this._closeButton = new KDCore.ButtonM("windowCloseButton", false, this.rootImageFolder());
        this._closeButtonLayer.addChild(this._closeButton);
        this._closeButton.move(this.closeButtonPosition());
        this._closeButton.addClickHandler(this._closeButtonClick.bind(this));
      };
      // * Наследники создают свои элементы в этом методе
      // * Есть специальный метод addContent()
      _._createCustomElements = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * MOUSE
      // -----------------------------------------------------------------------
      
      // * Определение если мышка в области окна
      //TODO: Есть проблема при открытии окна сразу под курсором
      _._registerMouseInOut = function() {
        if (!this.isOpen()) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._mouseIn === false) {
            this._mouseIn = true;
            this._onMouseIn();
          }
        } else {
          if (this._mouseIn === true) {
            this._mouseIn = false;
            this._onMouseOut();
          }
        }
      };
      // * Используется похожая система что и в KDCore.ButtonM
      _._onMouseIn = function() {
        return $gameTemp.floatingWindowUnderMouse = this;
      };
      _._onMouseOut = function() {
        if ($gameTemp.floatingWindowUnderMouse === this) {
          return $gameTemp.floatingWindowUnderMouse = null;
        }
      };
      // * Будем проверять мышка ли в окне только при открытом окне
      _._createMouseCheckThread = function() {
        this._mouseCheckThread = new KDCore.TimedUpdate(1, this._registerMouseInOut.bind(this));
        this._updateMouseCheckThread = () => {
          return this._mouseCheckThread.update();
        };
        return this._mouseCheckThread.call();
      };
      // * Когда окно закрывается, никаких проверок, обнуляем метод
      _._destroyMouseCheckThread = function() {
        this._mouseCheckThread = null;
        return this._updateMouseCheckThread = function() {};
      };
      //?DYNAMIC
      _._updateMouseCheckThread = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * OPEN OR CLOSE
      // -----------------------------------------------------------------------
      _._open = function() {
        var ref;
        this.visible = true;
        $gameTemp._floatingWindows.push(this);
        if (this._isAlwaysOnTop === true) {
          // * Окно, которое открывается, всегда снова выше остальных (опция)
          if ((ref = this.mainParent) != null) {
            ref.addChild(this);
          }
        }
        return this._createMouseCheckThread();
      };
      _._afterOpen = function() {}; // * EMPTY
      _._close = function() {
        this.visible = false;
        if (this._isAlwaysOnTop === true) {
          this.removeFromParent();
        }
        this._clearDraggableGlocalInstance();
        $gameTemp._floatingWindows.delete(this);
        this._onMouseOut();
        return this._destroyMouseCheckThread();
      };
      _._afterClose = function() {}; // * EMPTY
    })();
  })();
  (function() {    // ■ END PRIVATE.coffee
    //---------------------------------------------------------------------------

    // * Если окно под курсором, нельзя нажимать на карте для движения игрока
    // -----------------------------------------------------------------------
    (function() {      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ Scene_Map.coffee
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var ALIAS__isAnyButtonPressed, ALIAS__processMapTouch, _;
      
      //@[DEFINES]
      _ = Scene_Map.prototype;
      if (KDCore.isMZ()) {
        //@[ALIAS]
        ALIAS__isAnyButtonPressed = _.isAnyButtonPressed;
        _.isAnyButtonPressed = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return true;
          } else {
            return ALIAS__isAnyButtonPressed.call(this);
          }
        };
      } else {
        //@[ALIAS]
        ALIAS__processMapTouch = _.processMapTouch;
        _.processMapTouch = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return;
          }
          return ALIAS__processMapTouch.call(this);
        };
      }
    })();
  })();
  //@[EXTEND]
  // ■ END Scene_Map.coffee
  //---------------------------------------------------------------------------
  return KDCore.FloatingWindow = FloatingWindow;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___onMouseUp, ALIAS___onRightButtonDown, ALIAS__clear, ALIAS__update, _;
  // * Right mouse pressed
  // * Определение когда правая (вторая) кнопка мыши зажата и удерживается

  //@[DEFINES]
  _ = TouchInput;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    this._kdMousePressed2 = false;
    this._kdPressedTime2 = 0;
  };
  //@[ALIAS]
  ALIAS___onRightButtonDown = _._onRightButtonDown;
  _._onRightButtonDown = function(event) {
    var check;
    ALIAS___onRightButtonDown.call(this, event);
    // * Это значит что ALIAS метод прошёл (верные X и Y в Canvas)
    if (KDCore.isMZ()) {
      check = this._newState.cancelled === true;
    } else {
      check = this._events.cancelled === true;
    }
    if (check === true) {
      this._kdMousePressed2 = true;
      this._kdPressedTime2 = 0;
    }
  };
  //@[ALIAS]
  ALIAS___onMouseUp = _._onMouseUp;
  _._onMouseUp = function(event) {
    ALIAS___onMouseUp.call(this, event);
    if (event.button === 2) {
      this._kdMousePressed2 = false;
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.kdIsPressed2()) {
      return this._kdPressedTime2++;
    }
  };
  //?[NEW]
  return _.kdIsPressed2 = function() {
    return this._kdMousePressed2 === true;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Методы из RPG Maker MZ которых нет в RPG Maker MV
  if (KDCore.isMZ()) {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Scene_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Scene_Base.prototype;
    _.calcWindowHeight = function(numLines, selectable) {
      if (selectable === true) {
        return Window_Selectable.prototype.fittingHeight(numLines);
      } else {
        return Window_Base.prototype.fittingHeight(numLines);
      }
    };
  })();
  (function() {    // ■ END Scene_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Selectable.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Window_Selectable.prototype;
    _.itemLineRect = function(index) {
      return this.itemRect(index);
    };
  })();
  (function() {    // ■ END Window_Selectable.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__initialize, ALIAS__processEscapeCharacter, _;
    //@[DEFINES]
    _ = Window_Base.prototype;
    // * Чтоб можно было Rectangle принимать в конструктор
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(x, y, w, h) {
      if (x instanceof PIXI.Rectangle || x instanceof Rectangle) {
        return ALIAS__initialize.call(this, x.x, x.y, x.width, x.height);
      } else {
        return ALIAS__initialize.call(this, ...arguments);
      }
    };
    
    // * В MZ используется FS для изменения размера шрифта в тексте
    //@[ALIAS]
    ALIAS__processEscapeCharacter = _.processEscapeCharacter;
    _.processEscapeCharacter = function(code, textState) {
      if (code === "FS") {
        this.contents.fontSize = this.obtainEscapeParam(textState);
      } else {
        ALIAS__processEscapeCharacter.call(this, code, textState);
      }
    };
  })();
  (function() {    // ■ END Window_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Spriteset_Map.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Spriteset_Map.prototype;
    _.findTargetSprite = function(target) {
      return this._characterSprites.find(function(sprite) {
        return sprite.checkCharacter(target);
      });
    };
  })();
  return (function() {    // ■ END Spriteset_Map.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Sprite_Character.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Sprite_Character.prototype;
    _.checkCharacter = function(character) {
      return this._character === character;
    };
  })();
});

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_SM_processMapTouch, alias_TIOMM;
  //?SMouse better alternative
  if (KDCore.isMZ()) {
    return;
  }
  // * Для ButtonM
  //@[ALIAS]
  alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
    if ($gameTemp.kdButtonUnderMouse != null) {
      if ($gameTemp.kdButtonUnderMouse.parent == null) {
        return $gameTemp.kdButtonUnderMouse = null;
      } else {

      }
    } else {
      return alias_SM_processMapTouch.call(this);
    }
  };
  //@[ALIAS]
  alias_TIOMM = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    var x, y;
    alias_TIOMM.call(this, event);
    x = Graphics.pageToCanvasX(event.pageX);
    y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      return this._onHover(x, y);
    }
  };
  
  //?NEW, from MZ
  return TouchInput._onHover = function(_x, _y) {
    this._x = _x;
    this._y = _y;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__clear, ALIAS__update, _;
  if (KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Input;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    return this._virtualButton = null;
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this._virtualButton == null) {
      return;
    }
    this._latestButton = this._virtualButton;
    this._pressedTime = 0;
    return this._virtualButton = null;
  };
  return _.virtualClick = function(buttonName) {
    return this._virtualButton = buttonName;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_WBDTEX_KDCore29122021;
  // * <center>, для RPG Maker MZ и если нету Visu Message Core
  if (KDCore.isMZ()) {
    alias_WBDTEX_KDCore29122021 = Window_Base.prototype.drawTextEx;
    Window_Base.prototype.drawTextEx = function(text, x, y, width) {
      var e, newText;
      try {
        if (Imported.VisuMZ_1_MessageCore !== true) { // * В Visu уже есть <center>
          if (String.any(text) && text.contains("<center>")) {
            if (text[0] === "<" && text[1] === "c") { // * Должен быть в начале строки
              newText = text.replace("<center>", "");
              this.drawTextExInCenter(newText, x, y, width);
              return;
            }
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      alias_WBDTEX_KDCore29122021.call(this, ...arguments);
    };
  }
  //?NEW
  Window_Base.prototype.drawTextExInCenter = function(text, x, y, width, height) {
    var e, newX, newY, textSize;
    try {
      if (KDCore.isMV()) { // * В MV нет поддержки данного метода
        this.drawTextEx(...arguments);
        return;
      }
      textSize = this.textSizeEx(text);
      newX = x + width / 2 - textSize.width / 2;
      if ((height != null) && height > 0) {
        newY = y + height / 2 - textSize.height / 2;
      } else {
        newY = y;
      }
      this.drawTextEx(text, newX, newY, width);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.drawTextEx(text, x, y, width);
    }
  };
  //?NEW
  Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
    var maxWidth, wrappedText;
    maxWidth = this.contentsWidth();
    wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
    this.drawTextEx(wrappedText, x, y, width);
  };
  //?NEW
  return Window_Message.prototype.pWordWrap = function(text, maxWidth, maxLines) {
    var i, j, k, l, line, lines, newLines, ref, ref1, result, spaceLeft, spaceWidth, wordWidth, wordWidthWithSpace, words;
    lines = text.split('\n');
    maxWidth = maxWidth;
    spaceWidth = this.contents.measureTextWidth(' ');
    result = '';
    newLines = 1;
    for (i = k = 0, ref = lines.length; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      spaceLeft = maxWidth;
      line = lines[i];
      words = line.split(' ');
      for (j = l = 0, ref1 = words.length; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        wordWidth = this.contents.measureTextWidth(words[j]);
        wordWidthWithSpace = wordWidth + spaceWidth;
        if (j === 0 || wordWidthWithSpace > spaceLeft) {
          if (j > 0) {
            if (maxLines === newLines) {
              return result;
            }
            result += '\n';
            newLines++;
          }
          result += words[j];
          spaceLeft = maxWidth - wordWidth;
          if (j === 0 && line.match(/\\n\w*\s*<\s*\\n\[\w*\s*\]\s*>*/gi)) {
            spaceLeft += 200;
          }
        } else {
          spaceLeft -= wordWidthWithSpace;
          result += ' ' + words[j];
        }
      }
      if (i < lines.length - 1) {
        result += '\n';
      }
    }
    return result;
  };
});


// Generated by CoffeeScript 2.6.1
// * Последний файл (после всех классов)
// * Загружает библиотеки
var i, len, lib, ref, text;

if (KDCore._requireLoadLibrary === true) {
  ref = KDCore[KDCore._loader];
  for (i = 0, len = ref.length; i < len; i++) {
    lib = ref[i];
    lib();
  }
  KDCore[KDCore._loader] = [];
  text = "%c  KDCore is loaded " + KDCore.Version;
  console.log(text, 'background: #222; color: #82b2ff');
}

// ==========================================================================
// ==========================================================================

//   END OF PLUGINS CORE LIBRARY
//   (Next code is this plugin code)

// ==========================================================================
// ==========================================================================

//Plugin KDCore builded by PKD PluginBuilder 2.1 - 23.04.2022

function Game_AASpawnedEvent() {
    this.initialize.apply(this, arguments);
}

Game_AASpawnedEvent.prototype = Object.create(Game_Event.prototype);
Game_AASpawnedEvent.prototype.constructor = Game_AASpawnedEvent;

Game_AASpawnedEvent.prototype.initialize = function (refEventId, x, y) {
    this.refEventId = refEventId;
    let newEventId = $gameMap._events.length;
    Game_Event.prototype.initialize.call(this, $gameMap.mapId(), newEventId);
    DataManager.extractMetadata(this.event());
    $gameMap._events[newEventId] = this;
    if (Imported.VisuMZ_1_EventsMoveCore == true && $gameMap._eventCache) {
        $gameMap._eventCache.push(this);
    }
    this.setPosition(x, y);
    this.aaAddOnSpriteset();
    this.aaCheckAndActivateABSBehaviour();
};

//$[OVER]
Game_AASpawnedEvent.prototype.aaIsSpawned = function () {
    return true;
};

//$[OVER]
Game_AASpawnedEvent.prototype.event = function () {
    return $dataAASpawnMap.events[this.refEventId];
};


//?[NEW]
// * Добавляемм спрайт события на карту (если текущая сцена карты)
Game_AASpawnedEvent.prototype.aaAddOnSpriteset = function () {
    try {
        if (!KDCore.Utils.isSceneMap()) {
            return;
        }
        SceneManager._scene._spriteset.aaAddSpawnedEvent(this); //this.eventId()
    } catch (e) {
        AA.w(e);
    }
};

//?[NEW]
// * Активируем ABS у события
Game_AASpawnedEvent.prototype.aaCheckAndActivateABSBehaviour = function() {
    if(this.isABS()) {
        this.initABS();
    }
};

//TODO: Сделать как параметр плагина? 12, 24, 32
//$[OVER]
Game_Character.prototype.searchLimit = function() {
    return 24; // * По умлочанию 12
};

Spriteset_Base.prototype.createAnimation = function(request) {
    const animation = $dataAnimations[request.animationId];
    const targets = request.targets;
    const mirror = request.mirror;
    let delay = this.animationBaseDelay();
    const nextDelay = this.animationNextDelay();
    if (this.isAnimationForEach(animation)) {
        for (const target of targets) {
            this.createAnimationSprite([target], animation, mirror, delay);
            delay += nextDelay;
        }
    } else {
        this.createAnimationSprite(targets, animation, mirror, delay);
    }
};

Spriteset_Base.prototype.createAnimationSprite = function(
    targets, animation, mirror, delay
) {
    const mv = this.isMVAnimation(animation);
    const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
    const targetSprites = this.makeTargetSprites(targets);
    const baseDelay = this.animationBaseDelay();
    const previous = delay > baseDelay ? this.lastAnimationSprite() : null;
    if (this.animationShouldMirror(targets[0])) {
        mirror = !mirror;
    }
    sprite.targetObjects = targets;
    sprite.setup(targetSprites, animation, mirror, delay, previous);
    this._effectsContainer.addChild(sprite);
    this._animationSprites.push(sprite);
};

Sprite_Animation.prototype.updateEffectGeometry = function() {
    const scale = this._animation.scale / 100;
    const r = Math.PI / 180;
    const rx = this._animation.rotation.x * r;
    const ry = this._animation.rotation.y * r;
    const rz = this._animation.rotation.z * r;
    if (this._handle) {
        this._handle.setLocation(0, 0, 0);
        this._handle.setRotation(rx, ry, rz);
        this._handle.setScale(scale, scale, scale);
        this._handle.setSpeed(this._animation.speed / 100);
    }
};

Sprite_Animation.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._delay > 0) {
        this._delay--;
    } else if (this._playing) {
        if (!this._started && this.canStart()) {
            if (this._effect) {
                if (this._effect.isLoaded) {
                    this._handle = Graphics.effekseer.play(this._effect);
                    this._started = true;
                } else {
                    EffectManager.checkErrors();
                }
            } else {
                this._started = true;
            }
        }
        if (this._started) {
            this.updateEffectGeometry();
            this.updateMain();
            this.updateFlash();
        }
    }
};


Game_Temp.prototype.animation = function(x, y) {

    SceneManager._scene._spriteset.aaCreateAnimationOnMap(x, y);
    
};

Game_Temp.prototype.animationCursor = function() {
    setTimeout(() => {
        "START".p();
        SceneManager._scene._spriteset.aaCreateLinkedAnimation();
    }, 250);
};



// Generated by CoffeeScript 2.6.1
// * Так же передаём номер события, чтобы был доступ к модели и логике
var AAEnemyBattler;

AAEnemyBattler = class AAEnemyBattler extends Game_Enemy {
  constructor(enemyId, eventId) {
    super(enemyId, 0, 0);
    this.eventId = eventId;
    // * Проверка делается один раз, так как навыки не меняются
    this._isHaveAnyAASkill = this._checkAASkillsInActions();
    this._aaAttackHitAnimationId = this.char().AAModel().hitAnimationId;
    return;
  }

  AACharacter() {
    return this.char();
  }

  char() {
    return $gameMap.event(this.eventId);
  }

  getAASkills() {
    return this._selectAASkillsFromActions().map(function(skillId) {
      return $dataSkills[skillId];
    });
  }

  
    // * Если ли у врага хотябы одно действие с АБС навыком
  isHaveAnyAASkill() {
    return this._isHaveAnyAASkill === true;
  }

  aaIsActionValid(action) {
    return AA.Utils.isAAObject(action.skillId);
  }

  isActionValid(action) {
    var isABS;
    isABS = this.aaIsActionValid(action);
    return isABS && Game_Enemy.prototype.isActionValid.call(this, action);
  }

  attackAnimationId1() {
    return this._aaAttackHitAnimationId;
  }

  // * У монстров не может быть двуручной атаки, поэтому всегда 0
  attackAnimationId2() {
    return 0;
  }

  //$[OVER]
  getDefaultWeaponMotionAnimationWeaponId() {
    var e;
    try {
      return this.char().AAModel().weaponMotionType;
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return 0;
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AAEnemyBattler.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AAEnemyBattler.prototype;
  // * Среди всех действий врага, есть хотябы одно АБC
  // * Эта проверка нужна, чтобы сразу отметить врага как неспособного сражаться
  _._checkAASkillsInActions = function() {
    var aaActions;
    aaActions = this.enemy().actions.filter((a) => {
      return this.aaIsActionValid(a);
    });
    return aaActions.length > 0;
  };
  // * Выборка всех возможных АБС навыков из доступных действий
  // * (Тут смотритеся и canUse и можно ли использовать действие по условию в самом действии)
  _._selectAASkillsFromActions = function() {
    var aaSkills, actionList;
    aaSkills = [];
    actionList = this.enemy().actions.filter((a) => {
      return this.isActionValid(a);
    });
    if (actionList.length > 0) {
      aaSkills = this._aaSelectAllABSActions(actionList);
    }
    return aaSkills;
  };
  
  // * Метод аналогичен selectAllActions, только изменён под АБС
  // * Возвращает все АА навыки, которые проходят условия Action из БД
  _._aaSelectAllABSActions = function(actionList) {
    var aaSkills, action, i, j, ratingMax, ratingZero, ref;
    aaSkills = [];
    ratingMax = Math.max(...actionList.map(function(a) {
      return a.rating;
    }));
    ratingZero = ratingMax - 3;
    actionList = actionList.filter(function(a) {
      return a.rating > ratingZero;
    });
    for (i = j = 0, ref = actionList.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      action = this.selectAction(actionList, ratingZero);
      if (action != null) {
        aaSkills.push(action.skillId);
      }
    }
    return aaSkills;
  };
})();

// ■ END AAEnemyBattler.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Основной класс объекта АБС на карте (монстр, игрок и т.д.)

//@[STORABLE]
//@[GLOBAL]
var AAEntity;

AAEntity = class AAEntity {
  constructor() {
    this._setup();
    if (AA.Network.isNetworkGame()) {
      this._setupForNetwork();
    }
  }

  _setup() {
    this._active = false;
    this._target = null;
    this._dead = false;
    // * Состояние
    return this._state = null;
  }

  // * UPDATE
  // -----------------------------------------------------------------------
  update() {}

  // * ABS
  // -----------------------------------------------------------------------
  initABS() {
    return this.activate();
  }

  // * PROPERTIES
  // -----------------------------------------------------------------------
  teamId() {
    return 0;
  }

  character() {}

  battler() {}

  sprite() {
    return $gameMap.spriteset().findTargetSprite(this.character());
  }

  logic() {
    return null;
  }

  // * HELPERS
  // -----------------------------------------------------------------------
  isMyEnemy(aaEntity) {
    if (aaEntity == null) {
      return false;
    }
    if (!aaEntity.isActive()) {
      return false;
    }
    return aaEntity.teamId() !== this.teamId();
    return false;
  }

  // * Эти поля используются для опеределения типа дочернего класса
  isPlayer() {
    return false;
  }

  isAlly() {
    return false;
  }

  isNetChar() {
    return false;
  }

  isEnemy() {
    return false;
  }

  // * TARGET
  // -----------------------------------------------------------------------
  setTarget(target) {
    return this._target = AA.Utils.packAAEntity(target);
  }

  resetTarget() {
    return this.setTarget(null);
  }

  getTarget() {
    return AA.Utils.unpackAAEntity(this._target);
  }

  isHasTarget() {
    return this._target != null;
  }

  
    // * MAIN STATE
  // -----------------------------------------------------------------------
  isActive() {
    return this._active === true;
  }

  activate() {
    return this._active = true;
  }

  deactivate() {
    return this._active = false;
  }

  // * BATTLE STATE
  // -----------------------------------------------------------------------
  // * Зависит от наличия цели
  inBattle() {
    return this.isHasTarget();
  }

  resetBattle() {
    return this.resetTarget();
  }

  // * DEAD STATE
  // -----------------------------------------------------------------------
  isDead() {
    return this._dead === true;
  }

  setDead() {
    return this._dead = true;
  }

  resetDead() {
    return this._dead = false;
  }

  // * NETWORK
  // -----------------------------------------------------------------------
  _setupForNetwork() {
    return this._createNetworkObserver();
  }

  //TODO: Возможно нужен Instant режим?
  _createNetworkObserver() {
    this.netDataObserver = new DataObserver();
    this.netDataObserver.setCheckInterval(ANET.PP.playerDataRefreshRate());
    this._fillNetworkObserver();
    this.netDataObserver.refreshAll(this);
  }

  _fillNetworkObserver() {
    this.netDataObserver.addFields(this, ["_target", "_active"]);
  }

  updateDataObserver() {
    if (this.netDataObserver == null) {
      return;
    }
    this.netDataObserver.check(this);
    if (this.netDataObserver.isDataChanged()) {
      this.dataObserverHaveChanges();
      this.netDataObserver.refreshAll(this);
    }
  }

  // * Этот метод вызывается, когда изменились сихнронизируеммые данные
  dataObserverHaveChanges() {
    AANetworkManager.syncAAEntityObserver(this.character(), this.getObserverDataForNetwork());
  }

  getObserverDataForNetwork() {
    var data;
    data = this.netDataObserver.getDataForNetwork(this);
    return data;
  }

  applyObserverData(data) {
    if (this.netDataObserver == null) {
      return;
    }
    this.netDataObserver.setDataFromNetwork(this, data);
  }

};


// Generated by CoffeeScript 2.6.1
// * Глабольный менеджер расширений (кода совместимости)

//╒═════════════════════════════════════════════════════════════════════════╛
// ■ IMPLEMENTATION.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA;
  // * Добавить метод расширения
  _.extend = function(method) {
    if (AA.__extenders == null) {
      AA.__extenders = [];
    }
    AA.__extenders.push(method);
  };
  // * Загрузить (выполнить) все методы расширения
  _.loadExtensions = function() {
    var i, len, method, ref;
    if (AA.__extenders == null) {
      return;
    }
    ref = AA.__extenders;
    for (i = 0, len = ref.length; i < len; i++) {
      method = ref[i];
      method();
    }
    // * Освобождение памяти
    AA.__extenders = null;
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Глабольный менедреж событий в АБС
AA.EV = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.EV;
  _.init = function() {
    //"INIT ABS GEVENTS SUB SYSTEM".p()
    this.events = new AA.GEvents();
    return this._initABSGEvents();
  };
  _.subscribeFor = function(evName, listener) {
    return this.events.subscribeFor(evName, listener);
  };
  _.call = function(evName) {
    return this.events.call(evName);
  };
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ EVENTS.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.EV;
  _._initABSGEvents = function() {
    // * Когда АБС ставиться на паузу
    this.events.register("PauseABS");
    // * Когда игрок начинает выбирать зону действия навыка
    this.events.register("PlayerSkillSelector");
    // * Когда выполнился (закончился) навык Projectile на карте
    // * Запрашивает очистку кеша
    this.events.register("MapSkillsRequestsClean");
    // * Смена события под курсором
    this.events.register("UnderMouseEventChanged");
    // * Персонаж игрока готов
    this.events.register("ABSPartyLeaderReady");
    // * Больше нет персонажа игрока (пустая партия)
    this.events.register("ABSPartyLeaderNone");
  };
})();

// ■ END EVENTS.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Глабольный менедреж управления персонажем в АБС
AA.Input = function() {};

// * Кнопки управления
AA.IKey = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Input;
  // * Коэффицент скорости перемещения по диагонали
  _.diagonalSpeed = 0.8;
  // * Клавишы навыков (ячеек) для левой и правой кнопок мыши
  _.primarySkillSymbol = function() {
    return this.skillPanelSymbols[0];
  };
  _.secondarySkillSymbol = function() {
    return this.skillPanelSymbols[1];
  };
  // * Количество ячеек для навыков (и соответсвенно кнопок для них)
  // * Кнопки имеют имя SKL_(INDEX), от 0
  _.skillsSymbolsCount = function() {
    return this.skillPanelSymbols.length;
  };
  _.getTriggeredSkillSymbol = function() {
    var i, key, len, ref;
    ref = this.__skillSymbols;
    for (i = 0, len = ref.length; i < len; i++) {
      key = ref[i];
      if (Input.isTriggered(AA.IKey[key[0]])) {
        return key[1];
      }
    }
    return null;
  };
  _.init = function(settings1) {
    this.settings = settings1;
    _.IsDiagonal = this.settings.isDiagonalMovement;
    _.IsStaticAttackWhenRotating = this.settings.isStaticAtkRot;
    this._loadSkillPanelSymbols();
    this.applyInputSettings();
    return this.applyKeybindings();
  };
  //"INIT ABS INPUT SUB SYSTEM".p()

  // * Загружаем кнопки, которые назначены для панели навыков
  _._loadSkillPanelSymbols = function() {
    return this.skillPanelSymbols = AA.PP.getUISkillsItems().map(function(item) {
      return item.symbol;
    });
  };
  // * Загружает данные с настроек плагина
  _.applyKeybindings = function() {
    // * WASD нельзя переопределить из параметров
    this._asignKeyForAASymbol("ML", "a");
    this._asignKeyForAASymbol("MR", "d");
    this._asignKeyForAASymbol("MU", "w");
    this._asignKeyForAASymbol("MD", "s");
    this._asignDefaultActionsKeys();
    this._asingSkillPanelKeys();
  };
  _._asignKeyForAASymbol = function(symbol, key) {
    key = this.convertUnsafeKey(key);
    AA.IKey[symbol] = key;
  };
  _._asignDefaultActionsKeys = function() {
    this._asignKeyForAASymbol("REL", this.settings.kbReload);
    this._asignKeyForAASymbol("CMD", this.settings.kbCommandMenu);
    this._asignKeyForAASymbol("ROT", this.settings.kbRotate);
  };
  _._asingSkillPanelKeys = function() {
    var i, index, key, len, ref, symb;
    // * Дополнительно присвоим для атак свои индтификаторы кнопок
    this._asignKeyForAASymbol("ATK1", this.primarySkillSymbol());
    this._asignKeyForAASymbol("ATK2", this.secondarySkillSymbol());
    // * Теперь для всех навыков (включая атаки тоже, дублируются)
    // * Для более быстрой проверки нажатия, отдельный массив
    this.__skillSymbols = [];
    ref = this.skillPanelSymbols;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      symb = ref[index];
      key = "SKL_" + index;
      this._asignKeyForAASymbol(key, symb);
      this.__skillSymbols.push([key, symb]);
    }
  };
  // * Проверка на кнопки, которые переопределены RPG Maker'ом и не будут работать так
  _.convertUnsafeKey = function(key) {
    if (key == null) {
      return '';
    }
    key = key.toLowerCase();
    switch (key) {
      case 'q':
        return 'pageup';
      case 'w':
        return 'pagedown';
      case 'x':
        return 'escape';
      case 'z':
      case 'space':
        return 'ok';
      default:
        return key;
    }
  };
  _.applyInputSettings = function() {
    this._applyMoveType();
    this._applyLMBMapTouchMode();
    this._applyRMBMapTouchMode();
    this._applyLMBTargetTouchMode();
    this._applyRMBTargetTouchMode();
  };
  _._applyMoveType = function() {
    var mt;
    mt = this.settings.moveType;
    if (mt.contains("WASD")) {
      this._applyWasdAndArrowMoveType();
    }
  };
  // * Движение и на WASD и на стрелки
  _._applyWasdAndArrowMoveType = function() {
    var signXAA, signYAA;
    signXAA = function() {
      var x;
      x = 0;
      if (this.isPressed(AA.IKey.ML) || this.isPressed("left")) {
        x--;
      }
      if (this.isPressed(AA.IKey.MR) || this.isPressed("right")) {
        x++;
      }
      return x;
    };
    signYAA = function() {
      var y;
      y = 0;
      if (this.isPressed(AA.IKey.MU) || this.isPressed("up")) {
        y--;
      }
      if (this.isPressed(AA.IKey.MD) || this.isPressed("down")) {
        y++;
      }
      return y;
    };
    //$[OVER]
    // * Переопределяет методы Input
    Input._signX = signXAA;
    Input._signY = signYAA;
  };
  // * Режим нажатия ЛЕВОЙ кнопкой мыши ПО КАРТЕ (без цели)
  //? 0 - Attack only
  //? 1 - Default (move)
  //? 2 - Nothing
  _._applyLMBMapTouchMode = function() {
    var option;
    _.LMBMapTouchMode = 1; // * Deafult
    option = this.settings.LMBMapTouchMode;
    if (option.contains("att")) {
      _.LMBMapTouchMode = 0;
    } else if (option.contains("Noth")) {
      _.LMBMapTouchMode = 2;
    }
  };
  // * Режим нажатия ПРАВОЙ кнопкой мыши ПО КАРТЕ (без цели)
  //? 0 - Default (open menu)
  //? 1 - Attack only (second skill)
  //? 2 - Move
  //? 3 - Turn
  //? 4 - Nothing
  _._applyRMBMapTouchMode = function() {
    var option;
    _.RMBMapTouchMode = 0; // Default
    option = this.settings.RMBMapTouchMode;
    if (option.contains("att")) {
      _.RMBMapTouchMode = 1;
    } else if (option.contains("Mov")) {
      _.RMBMapTouchMode = 2;
    } else if (option.contains("Tur")) {
      _.RMBMapTouchMode = 3;
    } else if (option.contains("Noth")) {
      _.RMBMapTouchMode = 4;
    }
  };
  //? 0 - Attack only
  //? 1 - Default (move)
  //? 2 - Smart attack
  //? 3 - Turn
  // * Режим нажатия ЛЕВОЙ кнопкой мыши ПО ЦЕЛИ
  _._applyLMBTargetTouchMode = function() {
    var option;
    _.LMBTargetTouchMode = 1; // * Default
    option = this.settings.LMBTargetTouchMode;
    if (option.contains("Smar")) {
      _.LMBTargetTouchMode = 2;
    } else if (option.contains("atk")) {
      _.LMBTargetTouchMode = 2;
    } else if (option.contains("Tur")) {
      _.LMBTargetTouchMode = 3;
    }
  };
  //? 0 - Attack only
  //? 1 - Move
  //? 2 - Smart attack
  //? 3 - Turn
  // * Режим нажатия ПРАВОЙ кнопкой мыши ПО ЦЕЛИ
  _._applyRMBTargetTouchMode = function() {
    var option;
    _.RMBTargetTouchMode = 0; // * Attack only
    option = this.settings.RMBTargetTouchMode;
    if (option.contains("Smart")) {
      _.RMBTargetTouchMode = 2;
    } else if (option.contains("Mov")) {
      _.RMBTargetTouchMode = 1;
    } else if (option.contains("Tur")) {
      _.RMBTargetTouchMode = 3;
    }
  };
  // * Вспомогательные методы
  // ==================================================================

  // * Данный слот можно редактировать
  _.isEditableSymbol = function(symbol) {
    var e, settings;
    try {
      settings = AA.PP.getUISkillItemSlotSettings(symbol);
      if (settings == null) {
        return true;
      }
      // * Для совместимости со старыми настройками
      // (когда не было isEditable) исп. != false
      return settings.isEditable !== false;
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return false;
  };
  // * Слот поддерживает автоматическое добавление в него
  _.isSymbolSupportAutoBinding = function(symbol) {
    var e, settings;
    try {
      settings = AA.PP.getUISkillItemSlotSettings(symbol);
      if (settings == null) {
        return true;
      }
      // * Для совместимости со старыми настройками
      // (когда не было isAutoset) исп. != false
      return settings.isAutoset !== false;
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return false;
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Глабольный менеджер сетевого режима (совместимость с Alpha NET Z)
AA.Network = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Network;
  //@[DEPRECATED]
  _.NETCmdPrefix = "aabsz:";
  _.isNetworkGame = function() {
    if (Imported.Alpha_NETZ === true) {
      return ANNetwork.isConnected();
    } else {
      AA.Network.isNetworkGame = function() {
        return false;
      };
      return false;
    }
  };
  //TODO: Это скорее всего можно убрать, новый метод broadcast
  _.isShouldIgnoreServerCommand = function(servCommand) {
    var actorId;
    ({actorId} = servCommand);
    return actorId === ANGameManager.myActorId();
  };
  _.isAvailableForVisual = function(servCommand) {
    return $gameTemp._aaCanReceiveVisualFromServer === true && this.isOnSameMap(servCommand) && KDCore.Utils.isSceneMap() && !SceneManager.isSceneChanging();
  };
  _.isOnSameMap = function(servCommand) {
    var mapId;
    ({mapId} = servCommand);
    return $gameMap.mapId() === mapId;
  };
  //TODO: На новый формат ANNetwork.send(NMS.AABSZ(name, data))
  // * Теперь broadcast, т.е. можно проверку myActorId пропускать

  // * Собирает базовую команду для отправки на сервер
  _.createServCommand = function(content) {
    return {
      mapId: $gameMap.mapId(),
      actorId: ANGameManager.myActorId(),
      content
    };
  };
  _.packMapChar = function(character) {
    var e;
    if (character == null) {
      return null;
    }
    try {
      if (character === $gamePlayer) {
        return {
          type: 0,
          id: ANNetwork.myId()
        };
      } else if (character instanceof Game_Event) {
        return {
          type: 1,
          id: character.eventId(),
          mapId: $gameMap.mapId()
        };
      } else if (character instanceof NETCharacter) {
        return {
          type: 0,
          id: character.id
        };
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return null; // * Unknown
  };
  _.unpackMapChar = function(packed) {
    var e;
    try {
      if (packed == null) {
        return null;
      }
      if (packed.type == null) {
        return null;
      }
      switch (packed.type) {
        case 0:
          if (packed.id === ANNetwork.myId()) {
            return $gamePlayer;
          } else {
            return $gameMap.networkCharacterById(packed.id);
          }
          break;
        case 1:
          if ($gameMap.mapId() === packed.mapId) {
            return $gameMap.event(packed.id);
          }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return null;
  };
  return _.loadExtensions = function() {
    var __alias_ANGM_jdc, __alias_ANPM_bar, _alias_GCB_fillNetworkObserver, _alias_SA_r;
    if (Imported.Alpha_NETZ !== true) {
      return;
    }
    this.SetupNETCharacter(); // AA_Network/3_NETCharacter_AA.coffee
    
    // * Запускать АБС по готовности персонажа
    __alias_ANPM_bar = ANPlayersManager.bindActorResult;
    ANPlayersManager.bindActorResult = function(result) {
      __alias_ANPM_bar.call(this, ...arguments);
      if (!result) {
        return;
      }
      // * На всякий случай с задержкой
      AA.Utils.callDelayed(AA.System.checkABSPlayerExists.bind(AA.System), 10);
    };
    __alias_ANGM_jdc = ANGameManager.applyJoinedDataCorrects;
    ANGameManager.applyJoinedDataCorrects = function(result) {
      __alias_ANGM_jdc.call(this, ...arguments);
      // * Без этой паузы будет StackOverflow
      uAPI.pauseABS(true);
    };
    // * Старый способ (через nAPI)
    /*_alias_nAPI_onCustomCommandABSZ = nAPI.onCustomCommand
    nAPI.onCustomCommand = (name) ->
        _alias_nAPI_onCustomCommandABSZ.call(@, ...arguments)
        if name.contains(AA.Network.NETCmdPrefix)
            AANetworkManager.onServerCommand(...arguments)
        return*/
    //$[OVER]
    NetClientMethodsManager.event_aabz = function(name, data) {
      AANetworkManager.onServerCommand(...arguments);
    };
    _alias_GCB_fillNetworkObserver = Game_CharacterBase.prototype._fillNetworkObserver;
    Game_CharacterBase.prototype._fillNetworkObserver = function() {
      _alias_GCB_fillNetworkObserver.call(this);
      this.aaFillNetworkDataObserver();
    };
    // * Почему-то случается Game Crush при проигрывании анимаций по сети
    // * Не нашёл причину и решение, так что просто игнорируем
    _alias_SA_r = Sprite_Animation.prototype._render;
    Sprite_Animation.prototype._render = function() {
      var e;
      try {
        _alias_SA_r.call(this, ...arguments);
      } catch (error) {
        e = error;
        AA.w(e);
        this._render = function() {}; // * EMPTY
      }
    };
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Глабольный менедреж выполнения скриптовых действий
AA.SAaction = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.SAaction;
  _.ACTIONS = ["ss", "sw", "vr", "ce", "ap", "ev", "an", "ef", "se", "ba", "es"];
  _.isProper = function(actionLine) {
    var cmd, e, parts;
    if (actionLine == null) {
      return false;
    }
    if (isFinite(actionLine)) {
      return false;
    }
    try {
      parts = actionLine.split("_");
      cmd = parts[0];
    } catch (error) {
      e = error;
      AA.w(e);
      cmd = null;
    }
    return _.ACTIONS.contains(cmd);
  };
  //?MAIN OUTER (Основной метод вызова)
  // * Выполнить AA Script Action
  _.execute = function(action, char) {
    var cmd, e;
    if (!_.isProper(action)) {
      return;
    }
    AANetworkManager.executeSA(action, char);
    try {
      cmd = action.split("_")[0];
      switch (cmd) {
        case "ss":
          return _.executeSelfSwitchAction(action, char);
        case "sw":
          return _.executeSwitchAction(action);
        case "vr":
          return _.executeVariableAction(action);
        case "ce":
          return _.executeCommonEventAction(action, char);
        case "ap":
          return _.executeAIModelAction(action, char);
        case "ev":
          return _.executeMapEventAction(action);
        case "an":
          return _.executeAnimationAction(action, char);
        case "ef":
          return _.executeEffectAction(action, char);
        case "se":
          return _.executeSESoundAction(action);
        case "ba":
          return _.executeBallonIcon(action, char);
        case "es":
          return _.executeSkill(action, char);
        default:
          return AA.w("Unknown script action: " + action);
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  // * ss_A_true_2 , ss_B_false, ss_C_false_3 (evId)
  _.executeSelfSwitchAction = function(action, char) {
    var args, evId, key, switchId, switchState;
    args = action.split("_");
    if (args.length < 3) {
      return;
    }
    switchId = args[1];
    if (!AA.Utils.checkSwitch(switchId)) {
      return;
    }
    switchState = Boolean(args[2].toLowerCase());
    if (args[3] != null) {
      evId = parseInt(args[3]);
    } else {
      if (char == null) {
        return;
      }
      if (char.eventId == null) {
        return;
      }
      evId = char.eventId();
    }
    key = [$gameMap.mapId(), evId, switchId];
    $gameSelfSwitches.setValue(key, switchState);
  };
  // * ss_A_true_2 , ss_B_false, ss_C_false_3 (evId)
  // * Данный метод вызывается от севрера, поддерживает смену переключателя на другой карте
  _.executeSelfSwitchActionFromNetwork = function(action, forceEventId, mapId) {
    var args, evId, key, switchId, switchState;
    // * Если карта текущая, то как обычное SS действие (распаковка персонажа)
    if (mapId === $gameMap.mapId()) {
      this.executeSelfSwitchAction(action, AA.Network.unpackMapChar(forceEventId));
    } else {
      args = action.split("_");
      if (args.length < 3) {
        return;
      }
      switchId = args[1];
      if (!AA.Utils.checkSwitch(switchId)) {
        return;
      }
      switchState = Boolean(args[2].toLowerCase());
      if (args[3] != null) {
        evId = parseInt(args[3]);
      } else {
        if (forceEventId == null) {
          return;
        }
        if (forceEventId <= 0) {
          return;
        }
        evId = forceEventId;
      }
      key = [mapId, evId, switchId];
      $gameSelfSwitches.setValue(key, switchState);
    }
  };
  // * sw_43_true, sw_222_false
  _.executeSwitchAction = function(action) {
    var args, switchId, switchState;
    args = action.split("_");
    if (args.length < 3) {
      return;
    }
    switchId = parseInt(args[1]);
    if (switchId <= 0) {
      return;
    }
    switchState = Boolean(args[2].toLowerCase());
    $gameSwitches.setValue(switchId, switchState);
  };
  // * vr_54_2123, vr_44_9932
  _.executeVariableAction = function(action) {
    var args, value, varId;
    args = action.split("_");
    if (args.length < 3) {
      return;
    }
    varId = parseInt(args[1]);
    if (varId <= 0) {
      return;
    }
    value = args[2];
    if (isFinite(value)) {
      value = parseInt(value);
    }
    $gameVariables.setValue(varId, value);
  };
  // * ce_43, ce_11_this (?)
  _.executeCommonEventAction = function(action, char) {
    var args, ceId;
    args = action.split("_");
    if (args.length < 2) {
      return;
    }
    ceId = parseInt(args[1]);
    if (ceId <= 0) {
      return;
    }
    if ((args[2] != null) && args[2] === "this" && char instanceof Game_Event) {
      if (char != null) {
        char.aaStartCommonEvent(ceId);
      }
    } else {
      $gameTemp.reserveCommonEvent(ceId);
    }
  };
  // * ev_5 ; start event 5 on this map
  _.executeMapEventAction = function(action) {
    var args, event;
    args = action.split("_");
    if (args.length < 2) {
      return;
    }
    event = this._getEventByArgId(args[1]);
    if (event != null) {
      event.start();
    }
  };
  _._getEventByArgId = function(argX) {
    var eventId;
    eventId = parseInt(argX);
    if (eventId <= 0) {
      return null;
    }
    return $gameMap.event(eventId);
  };
  // * ap_viewRadius_5, ap_viewRadius_4_12 (evId)
  _.executeAIModelAction = function(action, char) {
    var args, event, paramName, paramValue;
    args = action.split("_");
    if (args.length < 2) {
      return;
    }
    paramName = args[1];
    if (!String.any(paramName)) {
      return;
    }
    paramValue = args[2];
    if (isFinite(paramValue)) {
      // * Преобразование числа
      paramValue = Number(paramValue);
    }
    //TODO: Как быть с массивами данных??? approachMoveData
    if (args[3] != null) {
      event = this._getEventByArgId(args[4]);
      if (event == null) {
        return;
      }
      char = event;
    }
    // * char
    if (char == null) {
      return;
    }
    if (!char.isABS()) {
      return;
    }
    char.aaChangeModelParam(paramName, paramValue);
  };
  // * an_4 (self), an_5_3 (evId), an_2_1_2 (x,y)
  _.executeAnimationAction = function(action, char) {
    var animationId, args, event, mapX, mapY;
    args = action.split("_");
    if (args.length < 2) {
      return;
    }
    animationId = parseInt(args[1]);
    if (animationId <= 0) {
      return;
    }
    // * x, y
    if (args[3] != null) {
      mapX = parseInt(args[2]);
      mapY = parseInt(args[3]);
      AABattleActionsManager.playAnimationOnMap(mapX, mapY, animationId);
    } else if (args[2] != null) {
      event = this._getEventByArgId(args[2]);
      if (event == null) {
        return;
      }
      AABattleActionsManager.playAnimationOnCharacter(event, animationId); // * on self
    } else {
      if (char == null) {
        return;
      }
      AABattleActionsManager.playAnimationOnCharacter(char, animationId);
    }
  };
  // * ef_shake_10, ef_shake_10_12 (evId)
  // * ef_shatter_4_4 (dx, dy), ef_shatter_4_4_2 (evId)
  _.executeEffectAction = function(action, char) {
    var args, effectName;
    args = action.split("_");
    if (args.length < 3) {
      return;
    }
    effectName = args[1];
    switch (effectName) {
      case "shatter":
        _._executeEffect_Shatter(args, char);
        break;
      case "shake":
        _._executeEffect_Shake(args, char);
        break;
      default:
        AA.w("SAction: effect " + effectName + " not registred in ABS");
    }
  };
  _._executeEffect_Shatter = function(args, char) {
    var dx, dy, event;
    dx = parseInt(args[2]);
    dy = parseInt(args[3]);
    if (args[4] != null) {
      event = this._getEventByArgId(args[4]);
      if (event != null) {
        event.aaRequestShatterEffect(dx, dy); // * char
      }
    } else {
      if (char != null) {
        char.aaRequestShatterEffect(dx, dy);
      }
    }
  };
  _._executeEffect_Shake = function(args, char) {
    var event, time;
    time = parseInt(args[2]);
    if (args[3] != null) {
      event = this._getEventByArgId(args[3]);
      if (event != null) {
        event.aaRequestShakeEffect(time); // * char
      }
    } else {
      if (char != null) {
        char.aaRequestShakeEffect(time);
      }
    }
  };
  // * se_Bell1_90_100 (volume, pitch)
  _.executeSESoundAction = function(action) {
    var args, name, pitch, volume;
    args = action.split("_");
    if (args.length < 2) {
      return;
    }
    name = args[1];
    if (!String.any(name)) {
      return;
    }
    // * volume and pitch - не обязательные
    if (args[2] != null) {
      volume = parseInt(args[2]);
      if (args[3]) {
        pitch = parseInt(args[3]);
      }
    }
    KDCore.Utils.playSE(name, volume, pitch);
  };
  // * ba_1, ba_2_4 (evId)
  _.executeBallonIcon = function(action, char) {
    var args, balloonId;
    args = action.split("_");
    if (args.length < 2) {
      return;
    }
    balloonId = parseInt(args[1]);
    if (args[2] != null) {
      char = this._getEventByArgId(args[2]);
    }
    if (char != null) {
      $gameTemp.requestBalloon(char, balloonId);
    }
  };
  // * es_0_-1_303, es_0_0_304_0 (gamePlayer), es_0_0_304_10_20 (XY)
  _.executeSkill = function(action, char) {
    var args, charId, ownerId, skillId, teamId, x, y;
    args = action.split("_");
    if (args.length < 4) {
      return;
    }
    ownerId = parseInt(args[1]);
    teamId = parseInt(args[2]);
    skillId = parseInt(args[3]);
    x = y = null;
    if ((args[4] != null) && (args[5] != null)) {
      x = parseInt(args[4]);
      y = parseInt(args[5]);
      if ((x != null) && (y != null)) {
        uAPI.executeAASkillOnMap(ownerId, teamId, skillId, x, y);
      }
    } else if (args[4] != null) {
      charId = parseInt(args[4]);
      uAPI.executeAASkillOnChar(ownerId, teamId, skillId, charId);
    } else {
      if (char != null) {
        ({x, y} = char);
      }
      if ((x != null) && (y != null)) {
        uAPI.executeAASkillOnMap(ownerId, teamId, skillId, x, y);
      }
    }
  };
})();


// Generated by CoffeeScript 2.6.1
// * Класс АБС навыка (дейсвтия), может быть спелл или предмет
// * Содержки настройки навыка
// * Новая версия - не требует целей

// * Не требует цели совсем
// * Базируется на 4х основных парметрах:
// Расстояние (0 или X)
// Область поражения (1 или Radius (square))
// Направление (direction or point(cursor))
// Скорость (0 или Х) - если больше 0, то летит, если 0 то мнгновенно

// * Пока новый навык не умеет следовать за целью (возможно введу потом)

//TODO: АБС навыки могут быть и в обычной битве тоже, т.е. используется два вида настроек
//TODO: Навыки с ABS всегда есть на карте и в бою, а вот без ABS - нет на карте

//%[I] Превратить некоторые параметры в Extended Values (например Radius или targetLimitType)

//@[STORABLE]
var AASkill2;

AASkill2 = class AASkill2 {
  constructor(idA) {
    this.idA = idA;
    this._initBase();
    this._initMain();
    this._initOnMapSettings();
    this._initOtherSettings();
    this._initAnimationSettings();
    return;
  }

  isItem() {
    return AA.Utils.isAAItem(this.idA);
  }

  isSkill() {
    return !this.isItem();
  }

  databaseId() {
    if (this.isItem()) {
      return this.idA - AA.Utils.ItemsIDStart;
    } else {
      return this.idA;
    }
  }

  // * Установить набор параметров из Note (принимает массив пар: имя - значение)
  setNoteParameters(params) {
    var i, len, p;
    for (i = 0, len = params.length; i < len; i++) {
      p = params[i];
      this[p[0]] = p[1];
    }
    this._convertParameters();
  }

  animationId() {
    if (this.hitAnimationId > 0) {
      return this.hitAnimationId;
    } else {
      return this.dbItem().animationId;
    }
  }

  dbItem() {
    return AA.Utils.getAASkillObject(this.idA);
  }

  // * Надо выбирать зону поражения для навыка
  isNeedSelectZone() {
    return this.selectZone === 1 && this.range > 0;
  }

  // * Нет "полёта", приминение сразу в точке (зоне поражения)
  isInstant() {
    return this.speed <= 0;
  }

  // * Имеет направление (точка)
  isInPoint() {
    return this.direction > 0;
  }

  // * Имеет конечную точку (летит прямо в точку)
  isInCertainPoint() {
    return this.direction === 1;
  }

  // * Летит по направлению точки
  isInPointDirection() {
    return this.direction === 2;
  }

  isNoContact() {
    return this.noContact > 0;
  }

  // * Поражает только одну цель
  isSingleTargetArea() {
    return this.radius <= 1;
  }

  isSelfAction() {
    return this.range <= 0 && this.isInstant();
  }

  isHaveTimer() {
    return String.any(this.reloadTime) || this.reloadTime > 0;
  }

  // * Ближний бой = дистанция 1 и по направлению
  isMelee() {
    return !this.isInPoint() && this.range === 1;
  }

  isForEnemies() {
    return this.opponentsEffect === 1;
  }

  isForEnemiesOnly() {
    return this.isForEnemies() && !this.isForFriends();
  }

  isForFriends() {
    return this.friendlyEffect === 1;
  }

  isForFriendsOnly() {
    return this.isForFriends() && !this.isForEnemies();
  }

  isHaveWeaponMotion() {
    return this.weaponMotion >= 1;
  }

  isHaveTargetLimit() {
    return !this.isSingleTargetArea() && this.targetLimit > 0;
  }

  isHaveWeaponMotionSpecialType() {
    return this.weaponMotionType > 0;
  }

  getAnimaXActionName() {
    if (String.any(this.animaXAction)) {
      return this.animaXAction;
    } else {
      return "Skill"; // * По умолчанию
    }
  }

  
    // * Время перезарядки навыка (cooldown)
  getReloadTime(battlerOrChar) {
    if (isFinite(this.reloadTime)) {
      return this.reloadTime;
    } else {
      if (battlerOrChar == null) {
        return 0;
      } else {
        if (battlerOrChar instanceof Game_Character) {
          battlerOrChar = battlerOrChar.AABattler();
        }
        return battlerOrChar.aaCalculateFormula(this.reloadTime);
      }
    }
  }

  // * Приминить стандартные настройки навыка 001 Атака
  applyDefaultAttack001() {
    // * Ближний бой перед собой (контактный только)
    this.radius = 1;
    this.range = 1;
    this.direction = 0;
    this.speed = 0;
    this.noContact = 0;
    this.skillImg = "";
    this.actionStartDelay = 10;
    this.reloadTime = 1.2;
    this.animaXAction = "Attack";
    this.animaXPriority = 1;
    this.weaponMotion = 1;
  }

  // * Extended Values =========================================

    //TODO: Эксперементально (уже используется в коде)

    //TODO: заменить все radius в коде, на этот метод
  getERadius() {
    return KDCore.Utils.getEValue(this.radius);
  }

  getETargetLimitType() {
    return KDCore.Utils.getEValue(this.targetLimitType);
  }

};

(function() {  //TODO: splash damage (от каждой цели считается ещё доп. цели)

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AASkill2.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AASkill2.prototype;
  //custom action common ev,  switch, var (на любые события с Note)
  // события, которые могут пропускать через себя Proj, но выполнять действия

  //TODO: shake effect strheng for target

  //TODO: animationFor: eachTarget, centerPoint

  // * Базовые (фундаментальные) АБС параметры навыка
  _._initBase = function() {
    // * Область поражения (1 - Х)
    this.radius = 1;
    this.range = 1;
    //facing dir 0, point position 1, point direction 2
    this.direction = 0;
    this.speed = 0;
  };
  // * Основные АБС параметры навыка
  _._initMain = function() {
    this.targetLimit = 0; // * Нет ограничения по количеству целей
    this.targetLimitType = 0; // * 0 - Любая цель, 1 - Ближайшая, 2 - Дальняя
    this.friendlyEffect = 0; // * Еффект на дружественную команду (и себя)
    this.opponentsEffect = 1; // * Еффект на противоположную команду
    // * В СЕКУНДАХ
    return this.reloadTime = 0; // * Данный параметр может быть строкой
  };
  
  // * Настройки поведения на карте
  _._initOnMapSettings = function() {
    this.z = 3;
    this.selectZone = 0;
    this.skillImg = "bullet0(8,5)";
    this.hitOffset = 28; //$gameMap.tileWidth() * 0.6
    // * Если 1, то навык срабатывает в конце своего пути в любом случае
    // * Если 0, то навык, НЕ достигнув цели, просто изчезнет
    this.noContact = 0;
    //TODO: to WIKI (+ image and example)
    this.popUpStyleId = ""; // * Default
    // * Дополнительная анимация (используется на АБС карте, используется взамен параметра из БД)
    this.hitAnimationId = 0;
    // * Если 1 , то в любом случае анимация будет на карте
    this.animationOnMap = 0;
    // * Непроходимые регионы
    this.noPassRegions = [];
    // * Непроходимые Terrain tags
    this.noPassTerrains = [];
    // * Селектор карты
    this._initSelector();
    // * Анимация взмаха оружием (стандартная)
    this.weaponMotion = 0; // * 0 - нету, 1 - есть
    // * Только если weaponMotion > 0
    this.weaponMotionType = 0; //* 0 - оружие в руке (Actor), 1-X тип оружия из списка Types
    //TODO: Для файла оружия отдельный параметр, в самом оружии и для Enemies тоже
    // * Приоритет анимации ( 1 - в приоритете, 0 - нет. 2 - вместе)
    this.animaXPriority = 1;
  };
  // * Параметры селектора на карте
  _._initSelector = function() {
    this.selectorColor = "#bf9324"; //"#FF22AA"
    this.selectorImg = null;
    return this.selectorOpacity = 220; //200
  };
  
  // * Дополнительные настройки навыка
  _._initOtherSettings = function() {
    this.hideOutsideABS = 0;
    // * Когда навык поражает цель (попадает в цель) (см. AABattleActionsManager._onActionResult)
    this.onHit = null; //SA
    // * Когда запускаем (используем) навык (см. AABattleActionsManager.startAASkill)
    this.onStart = null; //SA
    // * Изображение для слота навыка
    return this.ssImg = null;
  };
  // * Настройки анимации xAnima
  _._initAnimationSettings = function() {
    this.animaXAction = null;
    return this.actionStartDelay = 0;
  };
  
  // * Преобразует некоторые параметры
  _._convertParameters = function() {
    // * Из строки 1,2,3 в массив [1,2,3]
    this.noPassRegions = AA.Utils.Parser.convertArrayFromParameter(this.noPassRegions);
    this.noPassTerrains = AA.Utils.Parser.convertArrayFromParameter(this.noPassTerrains);
  };
})();

// ■ END AASkill2.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс оболочка навыка на карте (т.е. когда навык уже "запущен")
// * Содержит методы обработки урона, целей и прочие механики работы АБС навыка

//@[STORABLE]
var AASkill2MapAction;

AASkill2MapAction = class AASkill2MapAction {
  constructor(aaSkill, subject, point) {
    this.aaSkill = aaSkill;
    // * Эти значения меняются из Sprite_AAMapSkill2Projectile
    this.x = 0;
    this.y = 0;
    this.totalFlyTime = this._calculateFlyTime();
    this.setSubject(subject);
    this.setTargetPoint(point);
    if (AA.Network.isNetworkGame()) {
      // * Сгенерировать новый уникальный ID для сети
      this.setUniqueId();
    }
    return;
  }

  setSubject(subject) {
    this.packedSubject = null;
    if (!subject.isABS()) {
      return;
    }
    this.packedSubject = AA.Utils.packAAEntity(subject);
    this._initStartPoint();
  }

  // * Уникальный ID для сетевой игры, чтобы можнобыло найти конкретный Projectile
  // * из запроса от сервера (завершить Projectile например)
  setUniqueId(uniqueId) {
    if (uniqueId == null) {
      return this.uniqueId = KDCore.makeid(6) + "_" + this.aaSkill.idA;
    } else {
      return this.uniqueId = uniqueId;
    }
  }

  // * Данный навык обрабатвается на мастере карты
  // * Просчёт коллизий на данном клиенте должен быть отключён
  isPhantom() {
    return AA.Network.isNetworkGame() && !ANGameManager.isMapMaster();
  }

  setTargetPoint(point) {
    if (this.packedSubject != null) {
      point = this.preparePoint(point);
    }
    if (point instanceof Game_Character) {
      point = point.toPoint();
    }
    // * Точки на экране
    this.scX = this._convertPointValue(point.x);
    this.scY = this._convertPointValue(point.y);
    // * Точки на карте
    this.tX = point.x;
    this.tY = point.y;
  }

  preparePoint(point) {
    var direction, subject;
    if (this.aaSkill.isInPoint()) {
      return point;
    } else {
      // * По направлению персонажа (face direction)
      subject = this.getSubject();
      if ((subject._diagonalDir != null) && subject._diagonalDir !== false) {
        direction = subject._diagonalDir;
      } else {
        direction = subject.direction();
      }
      return AA.Utils.Math.getProjectilePointByDirection(subject.toPoint(), direction);
    }
  }

  //TODO: Если будет Friendly Fire или PVP, то поменять
  isSubjectIsPlayer() {
    return (this.packedSubject != null) && this.packedSubject.type === 0;
  }

  isSubjectIsNetChar() {
    return AA.Network.isNetworkGame() && this.isSubjectIsPlayer() && this.packedSubject.id !== ANNetwork.myId();
  }

  isSubjectIsAlly() {
    return (this.packedSubject != null) && this.packedSubject.type === 2;
  }

  isSubjectIsEvent() {
    return (this.packedSubject != null) && this.packedSubject.type === 1;
  }

  getSubjectEvId() {
    if (this.isSubjectIsEvent()) {
      return this.packedSubject.id;
    } else {
      return -1;
    }
  }

  getSubject() {
    return AA.Utils.unpackAAEntity(this.packedSubject);
  }

  id() {
    return this.aaSkill.idA;
  }

  zLevel() {
    return this.aaSkill.z;
  }

  image() {
    return this.aaSkill.skillImg;
  }

  hitOffset() {
    return this.aaSkill.hitOffset;
  }

  speed() {
    return this.aaSkill.speed;
  }

  isHaveRegion(regionId) {
    var globalRegions;
    globalRegions = AA.PP.getProjectileRestrictedRegions();
    if (globalRegions.contains(regionId)) {
      return true;
    }
    return this.aaSkill.noPassRegions.contains(regionId);
  }

  isHaveTerrain(terrainTag) {
    var globalTerrains;
    globalTerrains = AA.PP.getProjectileRestrictedTerrains();
    if (globalTerrains.contains(terrainTag)) {
      return true;
    }
    return this.aaSkill.noPassTerrains.contains(terrainTag);
  }

  isCanHitPoint() {
    return this.aaSkill.isInCertainPoint();
  }

  isNoContact() {
    return this.aaSkill.isNoContact();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AASkill2MapAction.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AASkill2MapAction.prototype;
  _._initStartPoint = function() {
    var subject;
    subject = this.getSubject();
    this.x = this._convertPointValue(subject.x);
    this.y = this._convertPointValue(subject.y);
  };
  // * Приводим обе точки (старт и финишь) к одному формату
  _._convertPointValue = function(value) {
    var tw;
    tw = $gameMap.tileWidth();
    return Number(value * tw + tw / 2);
  };
  
  // * Дистанцию полёта определяем по времени, а не по дистанции
  _._calculateFlyTime = function() {
    var dist;
    if (this.aaSkill.range <= 0 || this.speed() <= 0) {
      return 10;
    } else {
      dist = this.aaSkill.range * $gameMap.tileWidth() + $gameMap.tileWidth() / 2;
      return dist / this.speed();
    }
  };
})();

// ■ END AASkill2MapAction.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс АБС состояния (содержит настройки)

//@[STORABLE]
var AAState;

AAState = class AAState {
  constructor(id) {
    this.id = id;
    // * SActions
    this.onStart = null;
    this.onTick = null; // * каждую секунду
    this.onEnd = null;
    return;
  }

  //%[I] Специальный параметр hideOnUI, чтобы скрыть из иконок состояний
  state() {
    return AA.Utils.getAAStateObject(this.id);
  }

  // * Данное состояние надо "снять" по завершению Х действия (А)
  isActionEndState() {
    return this.state().autoRemovalTiming === 1;
  }

  // * Данное состояние надо "снять" после Х секунд
  isTimeEndState() {
    return this.state().autoRemovalTiming === 2;
  }

  // * Стоит флаг Remove at Battle End
  isRemovedAtBattleEnd() {
    return this.state().removeAtBattleEnd === true;
  }

  // * Получить случайное значение Duration in Turns
  // * Значение между state.minTurns и state.maxTurns
  getTurnsValue() {
    var state, variance;
    state = this.state();
    if (state.maxTurns === state.minTurns) {
      return state.maxTurns;
    }
    variance = 1 + Math.max(state.maxTurns - state.minTurns, 0);
    return state.minTurns + Math.randomInt(variance);
  }

  // * Установить набор параметров из Note (принимает массив пар: имя - значение)
  setNoteParameters(params) {
    var i, len, p;
    for (i = 0, len = params.length; i < len; i++) {
      p = params[i];
      this[p[0]] = p[1];
    }
    this._convertParameters();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AAState.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AAState.prototype;
  // * Преобразует некоторые параметры
  _._convertParameters = function() {};
})();

// ■ END AAState.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Глабольный менеджер с основными методами системы
AA.System = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.System;
  (function() {    // * Начальная загрузка компонентов
    // -----------------------------------------------------------------------
    //TODO: * Лог свой для сообщений версий
    _.initSystem = function() {
      //"INIT ABS SYSTEM".p()
      AA.EV.init();
      this.loadParameters();
      this.loadExtensions();
    };
    _.loadParameters = function() {
      AA.PP = new AA.ParamsManager();
      AA.Input.init(AA.PP.getParam('inputSettings'));
    };
    // * Загрузка доп. методов совместимости с другими плагинами
    _.loadExtensions = function() {
      var e;
      try {
        AA.loadExtensions();
        return AA.Network.loadExtensions();
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.loadFonts = function() {
      var font, i, len, ref;
      ref = ["AABS_0", "AABS_1", "AABS_2", "AABS_3"];
      // * Загрузка стандартных шрифтов системы
      for (i = 0, len = ref.length; i < len; i++) {
        font = ref[i];
        KDCore.Utils.loadFont(font);
      }
      this.loadUserFonts();
    };
    // * Загрузка пользовательских шрифтов (из параметров плагина)
    _.loadUserFonts = function() {
      var font, i, len, ref;
      if (AA.PP == null) {
        return;
      }
      ref = AA.PP.fonts();
      for (i = 0, len = ref.length; i < len; i++) {
        font = ref[i];
        if (String.any(font)) {
          KDCore.Utils.loadFont(font);
        }
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Управление АБС системой
    // -----------------------------------------------------------------------
    // * Этот метод выполняется всегда когда загружается карта
    // * Не зависимо, ABS в паузе или нет
    _.startABS = function() {
      if ($gameSystem._isABS == null) {
        //"START ABS SESSION ON MAP".p()
        // * По умлочанию, система всегда активированна
        $gameSystem._isABS = true;
      }
      $gameMap.initABS();
      this.checkABSPlayerExists();
    };
    _.resumeABS = function() {
      // * Нельзя возобновить, если игрока нету
      if (!$gamePlayer.isABS()) {
        return;
      }
      $gameSystem._isABS = true;
    };
    _.pauseABS = function() {
      if (!this.isABSActive()) {
        return;
      }
      //"PAUSE ABS SESSION ON MAP".p()
      $gameSystem._isABS = false;
      AA.EV.call("PauseABS");
    };
    _.isABSActive = function() {
      return $gameSystem._isABS === true && !$gameTemp._noABSPlayer;
    };
    // * Сейчас игра находится в режиме UI редактора
    // * Данный метод используется чтобы некоторые UI элементы отображали себя в редакторе иначе
    // * например невидимые становились видимыми
    _.isUIEditor = function() {
      if (AA.isPro()) {
        return SceneManager._scene instanceof AA.Scene_UIEditor;
      } else {
        return false;
      }
    };
    _.update = function() {};
    _.checkABSPlayerExists = function() {
      // * Если нет персонажа, АБС не запускаем
      if ($gameParty.leader() == null) {
        this.onNoABSPlayer();
      } else {
        this.onNewABSPlayer();
      }
    };
    // * Когда в партии стало пусто (убрали всех, нет gameParty.leader())
    _.onNoABSPlayer = function() {
      $gameTemp._noABSPlayer = true;
      this.pauseABS();
      AA.EV.call("ABSPartyLeaderNone");
    };
    // * Когда появился хоть один член партии (gameParty.leader())
    _.onNewABSPlayer = function() {
      $gameTemp._noABSPlayer = false;
      this.resumeABS();
      AA.EV.call("ABSPartyLeaderReady");
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Управление переходами и состояниями
    // -----------------------------------------------------------------------
    // * Главное меню (или Scene_Boot)
    _.onGameDataLoaded = function() {
      // * Применяем динамические параметры
      AA.PP.applyParameters();
      // * Парсим (читаем) АБС параметры в БД
      AA.Utils.Parser.processABSSkillsNotetags();
      AA.Utils.Parser.processABSEnemiesNotetags();
      AA.Utils.Parser.processABSStatesNotetags();
    };
    // * Сцена карты загрузилась (или попали на сцену из меню, или Transfer)
    _.onMapSceneLoaded = function() {
      this.startABS();
      AA.UI.refresh();
    };
    // * Сцена карты завершается (переключение сцены)
    _.onMapSceneStopped = function() {
      AA.UI.terminate();
      $gamePlayer.aaOnMapSceneEnd();
      $gameTemp.aaClearAllAILogicThreads();
    };
    _.onTitleScreen = function() {};
    // * Новая карта (Data)
    _.onNewMapLoaded = function() {};
    // * Перед сохранением
    _.onGameSave = function() {};
    // * После сохранения
    _.onGameSaved = function() {};
    // * Перед загрузкой
    _.onGameLoad = function() {};
    // * После загрузки
    _.onGameLoaded = function() {};
  })();
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AATimer.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * Таймер для навыков, хранит время в кадрах (frames)
var AATimer;

AATimer = class AATimer {
  constructor(maxValue1 = 0, value1 = 0) {
    this.maxValue = maxValue1;
    this.value = value1;
  }

  update() {
    if (!this.isReady()) {
      return this.value++;
    }
  }

  isReady() {
    return this.value >= this.maxValue;
  }

  start(maxValue) {
    this.reset();
    return this.maxValue = Math.abs(Math.round(maxValue));
  }

  reset() {
    return this.value = 0;
  }

  getSeconds() {
    return AATimer.ConvertFramesToSeconds(this.value);
  }

  getMaxSeconds() {
    return AATimer.ConvertFramesToSeconds(this.maxValue);
  }

  getSecondsLeft() {
    return this.getMaxSeconds() - this.getSeconds();
  }

  static ConvertFramesToSeconds(value) {
    return (value / 60.0).toFixed(1);
  }

};

// ■ END AATimer.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Машина состояний для АИ
//@[STORABLE]
var AIFlowMachine;

AIFlowMachine = class AIFlowMachine {
  constructor(id) {
    this.id = id;
    this.state = 0;
    this.prevState = -1;
    this._stateFlows = [];
    this._setup();
    if (AA.Network.isNetworkGame()) {
      this._setupForNetwork();
    }
    return;
  }

  registerFlowForState(stateId, flowObject) {
    return this._stateFlows[stateId] = flowObject;
  }

  char() {
    return $gameMap.event(this.id);
  }

  entity() {
    return this.char().AAEntity();
  }

  battler() {
    return this.char().AABattler();
  }

  isActive() {
    return this.char().isActive();
  }

  logic() {
    return this.char().AALogic();
  }

  model() {
    return this.char().AAModel();
  }

  // * Сбросить состояние
  resetState() {
    return this.setState(0);
  }

  // * Установить состояние
  setState(newState) {
    // * Предыдущее состояние
    this.prevState = this.state;
    // * Текущее состояние (новое)
    this.state = newState;
    this._onStateChanged();
  }

  // * Перейти в состояние (без сброса данных, плавно)
  translateToState(newState) {
    this.prevState = this.state;
    this.state = newState;
    this._onStateTranslated();
  }

  update() {
    if (this.char() == null) {
      return;
    }
    if (!this.isActive()) {
      return;
    }
    // * Логика состояний работает только на мастере карты
    if (AA.Network.isNetworkGame() && !ANGameManager.isMapMaster()) {
      return;
    }
    this._updateStates();
    this._updateForNetwork();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AIFlowMachine.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AIFlowMachine.prototype;
  _._setup = function() {}; // * EMPTY
  _._setupForNetwork = function() {
    // * Сетевые методы вынесенны отдельно
    this._createNetworkObserver();
  };
  _._updateStates = function() {
    if (this.state < 0) {
      return;
    }
    if (this._stateFlows.length === 0) {
      return;
    }
    return this._stateFlows[this.state].update();
  };
  _._onStateChanged = function() {
    if (this.prevState >= 0) {
      this._stateFlows[this.prevState].onStateEnd();
    }
    this._stateFlows[this.state].onStateStart();
  };
  _._onStateTranslated = function() {
    if (this.prevState >= 0) {
      this._stateFlows[this.prevState].onStatePause();
    }
    this._stateFlows[this.state].onStateResume(this.prevState);
  };
  _._updateForNetwork = function() {
    return this._updateDataObserver();
  };
})();

// ■ END AIFlowMachine.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс для АБС события игры (НЕ события на карте)

//╒═════════════════════════════════════════════════════════════════════════╛
// ■ 1_GEvent.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var GEvent;
  GEvent = class GEvent {
    constructor(name) {
      this.name = name;
      this.listeners = [];
    }

    addListener(listener) {
      if (listener != null) {
        return this.listeners.push(listener);
      }
    }

    removeListener(listener) {
      if (listener == null) {
        return;
      }
      return this.listener.delete(listener);
    }

    call() {
      var i, l, len, ref;
      ref = this.listeners;
      for (i = 0, len = ref.length; i < len; i++) {
        l = ref[i];
        l();
      }
    }

  };
  AA.link(GEvent);
})();

// ■ END 1_GEvent.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс - менеджер для управления АБС событиями игры (GEvent) (НЕ события на карте)

//╒═════════════════════════════════════════════════════════════════════════╛
// ■ 1_GEventsManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//$[NOT STORABLE]
(function() {
  var GEvents;
  GEvents = class GEvents {
    constructor() {
      this.events = [];
      return;
    }

    // * Существует ли событие с данным именем
    isEventExists(gEventName) {
      return this._getEventByName(gEventName) != null;
    }

    // * Получить список всех зарегестрированных событий (имён)
    getAllEvents() {
      return this.events.map(function(ev) {
        return ev.name;
      });
    }

    // * Зарегестрировать событие (используется только имя события)
    register(gEventName) {
      this.events.push(new AA.GEvent(gEventName));
    }

    // * Подписаться на событие (имя события) и слушатель
    subscribeFor(evName, listener) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.addListener(listener) : void 0;
    }

    // * Вызвать событие (по имени)
    call(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.call() : void 0;
    }

    _getEventByName(name) {
      return this.events.find(function(ev) {
        return ev.name === name;
      });
    }

  };
  AA.link(GEvents);
})();

// ■ END 1_GEventsManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//TODO: переместить в A_CORE или KDCOre

//TODO: см метод hitIndex в Window_Selectable - Там конверт глобал координат в локальные простой

//TODO: Убрать когда во всех моих плагинах будет KDCore 2.8
setTimeout((function() {
  return String.isNullOrEmpty = function(str) {
    if (str != null) {
      return str.toString().isEmpty();
    } else {
      return true;
    }
  };
}), 1000);

(function() {  // * Расширение, чтобы без XDev работал плагин
  var __STR_P;
  __STR_P = String.prototype.p;
  String.prototype.p = function(anotherText) {
    if (AA.isDEV()) {
      __STR_P.call(this, anotherText);
    } else {

    }
  };
})();

//TODO: NOT USED YET
// * Shake effect to Sprite
/*
do ->

    _ = KDCore.Sprite::

    _.startShake = (frames) ->
        #"START SHAKE".p()
 * * Создаём данные о движении
        @_shakeData = [frames, @x, @y]
        return

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        @_updateShakeEffect() if @_shakeData?

    _._updateShakeEffect = ->
 * * Отсчёт
        @_shakeData[0]--
        #console.log(@_shakeData[0])
        remainingTime = @_shakeData[0]
 * * Пока только по X
        shakeX = Math.round(remainingTime * 0.4 * Math.cos(remainingTime))
        @x += shakeX
        @_endShake() if remainingTime <= 0
        return

    _._endShake = () ->
 * * Возвращаем начальные значения
        @x = @_shakeData[1]
        #@y = @_shakeData[2]
 * * Удаляем данные о движении
        @_shakeData = null
        return

    return

 * * Draggable sprite
#? KDCore.Sprite extension
do ->

    _ = KDCore.Sprite::

    _.setDraggable = (@_isDragActive) ->
        if @_isDragActive is true
            @_updateDragging = @_updateDraggingActive
        else
            @resetDrag() if @isDragging()
            @_updateDragging = () -> # * EMPTY

    _.isDraggable = -> @_isDragActive is true

    _.activateDrag = ->
        $gameTemp._kdDragSprite = @
        @_dragging = true
        @_lastTouchPosition = TouchInput.toPoint()
        @_deltaXY = @toPoint().delta(@_lastTouchPosition)
        do @dragStartHandler if @dragStartHandler?

    _.resetDrag = ->
        @_dragging = false
        unless @_lastTouchPosition.isSame(TouchInput.toPoint())
            do @dragEndHandler if @dragEndHandler?
        if $gameTemp._kdDragSprite is @
            $gameTemp._kdDragSprite = null
        @_lastTouchPosition = null
        return

    _.isDragging = -> @_dragging is true

    _.setOnDragEnd = (@dragEndHandler) ->

    _.setOnDragStart = (@dragStartHandler) ->

    _.setOnDrag = (@dragProcessHandler) ->

    _.isCanStartDragging = -> true

    #@[ALIAS]
    ALIAS__update = _.update
    _.update = ->
        ALIAS__update.call(@)
        @_updateDragging()

    #?DYNAMIC
    _._updateDragging = -> # * DUMMY

    _._updateDraggingActive = ->
        if @isDragging()
            @_updateDraggingProcess()
        else
            return if $gameTemp._kdDragSprite?
            if TouchInput.isPressed() and @isCanStartDragging()
                @activateDrag() if @isUnderMouse()

    _._updateDraggingProcess = ->
        if TouchInput.isPressed()
            return unless KDCore.Utils.isPointInScreen(TouchInput)
            @move TouchInput.x - @_deltaXY.x, TouchInput.y - @_deltaXY.y
            do @dragProcessHandler if @dragProcessHandler?
        else
            @resetDrag()

    return

 */
// * NOTHING


// Generated by CoffeeScript 2.6.1
(function() {
  var UIElementController;
  // * Общий класс для UI контролллеров (которые должны обновлять UI элементы)

    //?rev 17.10.20
  UIElementController = class UIElementController {
    constructor() {}

    setup(source) { // * EMPTY
      this.source = source;
      this._setup();
      return this._setupThread();
    }

    // * DYNAMIC значит что тело метода может быть изменнено позже
    //?DYNAMIC
    update() {} // * DUMMY

    
      // * Общий метод
    refresh() {
      var e;
      if (this.source == null) {
        return;
      }
      try {
        this._refresh();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        // * Убираем источник с ошибкой и отключаем поток
        this.clear();
      }
    }

    clear() {
      this.source = null;
      this.thread = null;
      return this.update = function() {};
    }

    // * Создать поток обнолвения
    createThread(t = 10, dt = 4) {
      this.thread = new KDCore.TimedUpdate(t, () => {
        return this.refresh();
      });
      // * чтобы все контроллеры не делали проверку в один фрейм
      this.thread.applyTimeRange(-dt, dt);
      // * Добавим поток в метод Update
      this.update = () => {
        return this.thread.update();
      };
      // * Обновим значения сразу
      return this.thread.call();
    }

  };
  AA.link(UIElementController);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.UIElementController.prototype;
  _._setup = function() {}; // * Метод для потомков (настройка)
  _._setupThread = function() {}; // * Метод для потомков (создание потока)
  _._refresh = function() {}; // * Метод для потомков (обновление)
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Данный класс используется чтобы вызывать (использовать)
// ABS навыки через uAPI
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AADummyCharacter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var AADummyCharacter;

AADummyCharacter = class AADummyCharacter extends Game_Character {
  constructor(ownerId, teamId) {
    super();
    this.ownerId = ownerId;
    this.teamId = teamId;
    this.generateId();
    this.aaEntity = new AADummyEntity(this.ownerId, this.teamId, this.uId);
    $gameMap.aaRegisterGlobalSkill(this.uId, this);
    return;
  }

  AASprite() {
    return null;
  }

  AAEntity() {
    return this.aaEntity;
  }

  isActive() {
    return true;
  }

  generateId() {
    return this.uId = this.ownerId + this.teamId + $gameMap.mapId() + KDCore.makeId(3);
  }

  dispose() {
    return $gameMap.aaDisposeGlobalSkill(this.uId);
  }

};


// ■ END AADummyCharacter.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AAEnemyBattler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AAEnemyBattler.prototype;
  //$[OVER]
  _.dataObserverHaveChanges = function() {
    AANetworkManager.syncAAEnemyBattlerObserver(this.AACharacter(), this.getObserverDataForNetwork());
  };
})();

// ■ END AAEnemyBattler.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Данный класс хранит данные об АБС state для каждого Battler

// * Правила работы состояний

//onActionEnd - после выполнения любого АБС навыка (атаки в т.ч) Х раз (Duration in Turns)
//onBattleEnd - после отключения АБС режима (uAPI.pauseABS())
//onTurnEnd - после Х секунд (Duration in Turns)

// Каждую секунду вызывается onTick (если есть), приминимо к любому ABS состоянии
// (даже если у него нет onTurnEnd)

//@[STORABLE]
var AAStatesSet;

AAStatesSet = class AAStatesSet {
  constructor(battler) {
    this._packedSubject = AA.Utils.packAAEntity(battler.AACharacter());
    this._aaStateTimers = {};
    this._aaStateActionCounts = {};
    // * Таймеры для баффов (-1 значение не задано, таймер не идёт)
    this._aaBuffsTimers = [-1, -1, -1, -1, -1, -1, -1, -1];
    return;
  }

  // * Значение для вывода на UI (оставшееся время или действия)
  getDisplayValueForState(stateId) {
    if (this._aaStateActionCounts[stateId] != null) {
      return this._aaStateActionCounts[stateId];
    } else if (this._aaStateTimers[stateId] != null) {
      return this._aaStateTimers[stateId][1];
    } else {
      return -1; // * no value
    }
  }

  battler() {
    var subject;
    subject = this.subject();
    if (subject != null) {
      return subject.AABattler();
    }
    return null;
  }

  subject() {
    return AA.Utils.unpackAAEntity(this._packedSubject);
  }

  // * Если система ABS была отключена
  onABSSystemStop(battler) {
    var battleEndStates, states;
    states = battler.states().filter(function(s) {
      return AA.Utils.isAAState(s);
    });
    battleEndStates = states.filter(function(s) {
      return s.AAState.isRemovedAtBattleEnd();
    });
    battleEndStates.forEach(function(s) {
      return battler.removeState(s.id);
    });
  }

  // * Когда battler выполнил какое-либо действие
  onAnyActionDone() {
    var k, ref, v;
    ref = this._aaStateActionCounts;
    //"ON ACTION DONE".p()
    // * Изменяем счётчик действий состояний
    for (k in ref) {
      v = ref[k];
      this._aaStateActionCounts[k]--;
      this.battler()._stateTurns[k] = this._aaStateActionCounts[k];
    }
  }

  // * battler передаётся чтобы управлять через него
  // * например удалить состояние (если время вышло)
  // * или выполнить Script Action
  // * или наложить доп. эффект (снять эффект)
  //? Не передаётся как @, потому что класс Storable
  // * Для оптимизации передаём battler сразу, без распаковки каждый кадр
  update(battler) {
    this._updateTimers(battler);
    this._updateActionCounters(battler);
    this._updateBuffs(battler);
  }

  item(stateId) {
    return AA.Utils.getAAStateObject(stateId).AAState;
  }

  add(stateId) {
    var e;
    try {
      // * На battler состояние уже есть, когда этот метод вызывается
      this._pushNewState(stateId);
      this._onStateAdded(stateId);
    } catch (error) {
      e = error;
      AA.w(e);
    }
  }

  remove(stateId) {
    var e;
    try {
      // * На battler состояния уже нету когда этот метод вызывается
      this._deleteState(stateId);
      this._onStateRemoved(stateId);
    } catch (error) {
      e = error;
      AA.w(e);
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AAStatesSet.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AAStatesSet.prototype;
  _._pushNewState = function(stateId) {
    var aaState;
    aaState = this.item(stateId);
    // * АБС состояние с onTick всё равно имеет таймер
    if (AA.SAaction.isProper(aaState.onTick)) {
      // * [текущий таймер, кол-во секунд осталось]
      // * так надо, чтобы выполнять onTick
      this._aaStateTimers[stateId] = [
        0,
        -1 // -1 - нет предела
      ];
    }
    if (aaState.isActionEndState()) {
      this._aaStateActionCounts[stateId] = aaState.getTurnsValue();
      this.battler()._stateTurns[stateId] = this._aaStateActionCounts[stateId];
    } else if (aaState.isTimeEndState()) {
      // * Заменяем бесконечное время (-1) на TurnsValue
      this._aaStateTimers[stateId] = [0, aaState.getTurnsValue()];
      // * Возвращаем новое значение на Battler
      this.battler()._stateTurns[stateId] = this._aaStateTimers[stateId][1];
    }
  };
  _._deleteState = function(stateId) {
    delete this._aaStateTimers[stateId];
    delete this._aaStateActionCounts[stateId];
  };
  _._onStateAdded = function(stateId) {
    var e, state;
    try {
      state = this.item(stateId);
      if (state == null) {
        return;
      }
      if (AA.SAaction.isProper(state.onStart)) {
        return AA.SAaction.execute(state.onStart, this.subject());
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _._onStateRemoved = function(stateId) {
    var e, state;
    try {
      state = this.item(stateId);
      if (state == null) {
        return;
      }
      if (AA.SAaction.isProper(state.onEnd)) {
        return AA.SAaction.execute(state.onEnd, this.subject());
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  
  // * Battler передаётся сразу (для оптимизации)
  // * Так как onStateTick вызывается из метода _updateTimers,
  // * который уже имеет ссылку на battler
  //? Вызывается каждую секунду дейсвия состояния
  _._onStateTick = function(stateId, battler) {
    var state;
    state = this.item(stateId);
    if (state.onTick != null) {
      if (battler == null) {
        battler = this.battler();
      }
      AA.SAaction.execute(state.onTick, battler.AACharacter());
    }
  };
  _._updateTimers = function(battler) {
    var k, ref, v;
    ref = this._aaStateTimers;
    for (k in ref) {
      v = ref[k];
      this._aaStateTimers[k][0]++;
      if (this._aaStateTimers[k][0] >= 60) {
        this._aaStateTimers[k][0] = 0;
        // * Только если больше 0 (т.к. -1 - бесконечно)
        if (this._aaStateTimers[k][1] > 0) {
          this._aaStateTimers[k][1]--;
          // * зеркалим обратно на Battler
          battler._stateTurns[k] = this._aaStateTimers[k][1];
        }
        // * Tick не выполняется на последней секунде
        if (this._aaStateTimers[k][1] !== 0) {
          this._onStateTick(parseInt(k), battler);
        } else {
          //"REMOVE BY TIMER".p(k)
          // * ключи хранятся как String
          battler.removeState(parseInt(k));
        }
      }
    }
  };
  _._updateActionCounters = function(battler) {
    var k, ref, results, v;
    ref = this._aaStateActionCounts;
    results = [];
    for (k in ref) {
      v = ref[k];
      if (this._aaStateActionCounts[k] === 0) {
        //"REMOVE BY ACTION COUNT".p(k)
        results.push(battler.removeState(parseInt(k)));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };
  // * Этот метод считает секунды на каждый бафф и уменьшает количество "ходов" для баффов
  _._updateBuffs = function(battler) {
    var i, index, len, ref, turn;
    ref = battler._buffTurns;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      turn = ref[index];
      if (turn > 0) { // * Есть время (т.е. бафф действует)
        if (this._aaBuffsTimers[index] < 0) {
          this._aaBuffsTimers[index] = 60; // * один ход = 1 секунда
        } else if (this._aaBuffsTimers[index] === 0) { // * время вышло
          this._aaBuffsTimers[index] = 60;
          battler._buffTurns[index]--;
          if (battler._buffTurns[index] <= 0) {
            //"buff expired, index".p(index)
            battler.removeBuffsAuto();
            continue; // * Бафф удалён, таймер считать не надо, следующий
          }
        }
        this._aaBuffsTimers[index]--;
      } else {
        if (this._aaBuffsTimers[index] >= 0) {
          // * Обнуляем таймер
          //"reset buff timer for buff index".p(index)
          this._aaBuffsTimers[index] = -1;
        }
      }
    }
  };
})();

// ■ END AAStatesSet.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AIFlowMachine.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AIFlowMachine.prototype;
  _._createNetworkObserver = function() {
    this.netDataObserver = new DataObserver();
    this.netDataObserver.setCheckInterval(10); //TODO: ???
    this._fillNetworkObserver();
    return this.netDataObserver.refreshAll(this);
  };
  //TODO: Добавить API для разработчиков плагинов вносить свои поля (и так со всем Observers)
  // * Движение передаётся отдельным методом для достижения плавности
  _._fillNetworkObserver = function() {
    return this.netDataObserver.addFields(this, ["state", "prevState"]);
  };
  _._updateDataObserver = function() {
    if (this.netDataObserver == null) {
      return;
    }
    this.netDataObserver.check(this);
    if (this.netDataObserver.isDataChanged()) {
      this.dataObserverHaveChanges();
      this.netDataObserver.refreshAll(this);
    }
  };
  // * Этот метод вызывается, когда изменились сихнронизируеммые данные
  _.dataObserverHaveChanges = function() {
    AANetworkManager.syncAIFlowMachineObserver(this.id, this._getObserverDataForNetwork());
  };
  _._getObserverDataForNetwork = function() {
    return this.netDataObserver.getDataForNetwork(this);
  };
  _.applyObserverData = function(data) {
    if (this.netDataObserver == null) {
      return;
    }
    this.netDataObserver.setDataFromNetwork(this, data);
  };
})();

// ■ END AIFlowMachine.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс хранит набор навыков на панели для персонажей
// * Хранит настройку панели навыков для каждого персонажа группы

//@[STORABLE]
var AASkillsSet;

AASkillsSet = class AASkillsSet {
  constructor() {
    // * Позиции на панели для навыков
    this.bingings = {};
    this.currentActorId = 0;
    return;
  }

  // * Установить ActorId из Game_Player (shortcut)
  setPlayerActorId() {
    return this.setActorId($gamePlayer.AABattler().actorId());
  }

  // * Установить персонажа, с которым будем работать
  setActorId(currentActorId) {
    this.currentActorId = currentActorId;
    // * Если персонаж не настроен, то показать стандартные навыки
    if (this.bingings[this.currentActorId] == null) {
      this.bingings[this.currentActorId] = {};
      this.setupDefaultSkillsForActor();
    }
  }

  allSymbols() {
    return AA.Input.skillPanelSymbols;
  }

  currentSet() {
    return this.bingings[this.currentActorId] || {};
  }

  setSkillInEmptySlot(skillId) {
    var i, len, s, symbols, tempId;
    symbols = this.allSymbols();
    for (i = 0, len = symbols.length; i < len; i++) {
      s = symbols[i];
      if (!AA.Input.isSymbolSupportAutoBinding(s)) {
        continue;
      }
      // * Автоматически нельзя поставить в E и Q слоты
      //continue if s == AA.Input.primarySkillSymbol()
      //continue if s == AA.Input.secondarySkillSymbol()
      tempId = this.getSkillForSymbol(s);
      if (tempId <= 0 && this.isCanAutoSetSkillToSymbol(skillId, s)) {
        this.setSymbolForSkill(skillId, s, null);
        break;
      }
    }
  }

  isCanAutoSetSkillToSymbol(skillId, symbol) {
    var e, obj, settings, specifiedIds;
    try {
      settings = AA.PP.getUISkillItemSlotSettings(symbol);
      if (settings == null) {
        return true;
      }
      if (settings.filter == null) {
        // * Проверка что данные актуальные (существуют поля)
        return true;
      }
      if (settings.filter === "Skills") {
        if (AA.Utils.isAAItem(skillId)) {
          return false;
        }
      }
      if (settings.filter === "Items") {
        if (AA.Utils.isAASkill(skillId)) {
          return false;
        }
      }
      try {
        if (String.any(settings.specifiedIds)) {
          specifiedIds = AA.Utils.Parser.convertArrayFromParameter(settings.specifiedIds);
        } else {
          specifiedIds = null;
        }
      } catch (error) {
        e = error;
        AA.w(e);
        specifiedIds = null;
      }
      if ((specifiedIds != null) && specifiedIds.length > 0) {
        obj = AA.Utils.getAASkillObject(skillId);
        if (obj != null) {
          return specifiedIds.contains(obj.id);
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return true;
  }

  setSymbolForSkill(skillId, symbNew, symbOld) {
    var e, existsOnSymb, existsValues, set;
    //skillInNewPos = @getSkillForSymbol(symbNew)
    set = this.currentSet();
    try {
      // * Проверяем чтобы дубликатов не было
      if (skillId > 0) {
        existsValues = Object.values(set);
        if (existsValues.contains(skillId)) {
          existsOnSymb = this.getSymbolForSkill(skillId);
          this.setSymbolForSkill(0, existsOnSymb, null);
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    set[symbNew] = skillId;
  }

  //if skillInNewPos > 0
  //    @currentSet()[symbOld] = skillInNewPos if symbOld?
  getSymbolForSkill(skillId) {
    var key, ref, value;
    ref = this.currentSet();
    for (key in ref) {
      value = ref[key];
      if (value === skillId) {
        return key;
      }
    }
    return null;
  }

  getSkillForSymbol(symbol) {
    var skillId;
    skillId = this.currentSet()[symbol];
    if (skillId > 0) {
      return skillId;
    } else {
      return 0;
    }
  }

  setupDefaultSkillsForActor() {
    var attackSkillId, battler, e, i, len, ref, s;
    try {
      battler = $gameParty.leader();
      attackSkillId = battler.attackSkillId();
      this.setSymbolForSkill(attackSkillId, AA.Input.primarySkillSymbol(), null);
      ref = battler.getAASkills();
      // * Добавляем остальные навыки
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s.idA === attackSkillId) {
          continue;
        }
        this.setSkillInEmptySlot(s.idA);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  }

  // * Возвращает ID всех предметов на панели
  getAllItemsFromPanel() {
    var i, id, items, len, s, symbols;
    items = [];
    symbols = this.allSymbols();
    for (i = 0, len = symbols.length; i < len; i++) {
      s = symbols[i];
      id = this.getSkillForSymbol(s);
      if (AA.Utils.isAAItem(id)) {
        items.push(id);
      }
    }
    return items;
  }

  
    // * Есть ли предмет на панели
  // * Этот метод используется в автоматическом добавлении новых предметов
  // * Чтобы не добавлять один и тот же предмет несколько раз
  isHaveItemOnPanel(id) {
    return this.getAllItemsFromPanel().contains(id);
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AASkillsSet.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AASkillsSet.prototype;
})();

// ■ END AASkillsSet.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс хранит таймеры для набора АБС навыков (и предметов) для Battler

//@[STORABLE]
var AASkillsTimers;

AASkillsTimers = class AASkillsTimers {
  constructor() {
    // * Таймеры для навыков
    this._timers = [];
    // * Для оптимизации, ID навыков для которых запущен таймер храняться отдельно
    this._skills = [];
    return;
  }

  startTimerForSkill(skillId, time) {
    var timer;
    timer = new AATimer();
    timer.skillId = skillId;
    // * Перевод из секунд в кадры
    timer.start(time * 60);
    this._timers.push(timer);
    this._skills.push(skillId);
  }

  isSkillHaveTimer(skillId) {
    return this._skills.contains(skillId);
  }

  isSkillHaveTimerToShow(skillId) {
    return this.isSkillHaveTimer(skillId) && this.getTimerForSkill(skillId).maxValue >= 60;
  }

  // * В секундах
  getRemainTimeForSkill(skillId) {
    if (this.isSkillHaveTimer(skillId)) {
      return this.getTimerForSkill(skillId).getSecondsLeft();
    } else {
      return 0;
    }
  }

  getTimerForSkill(skillId) {
    return this._timers.find(function(t) {
      return t.skillId === skillId;
    });
  }

  update() {
    var e, i, j, len, len1, ref, t, toDelete;
    try {
      ref = this._timers;
      // * Опасно удалять в переборке массива
      for (i = 0, len = ref.length; i < len; i++) {
        t = ref[i];
        if (t == null) {
          continue;
        }
        t.update();
        if (t.isReady()) {
          this._skills.delete(t.skillId);
          if (typeof toDelete === "undefined" || toDelete === null) {
            toDelete = [];
          }
          toDelete.push(t);
        }
      }
      if (toDelete != null) {
        for (j = 0, len1 = toDelete.length; j < len1; j++) {
          t = toDelete[j];
          this._timers.delete(t);
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AASkillsTimers.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AASkillsTimers.prototype;
})();

// ■ END AASkillsTimers.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//? Методы для улучшенной совместимости с Extended Loot

//@[EXTENSION]
AA.extend(function() {
  // * Методы ниже даже не учитываются, если плагин не подключён
  if (Imported.PKD_ExtendedLoot !== true) {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Party.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__pelOnSomeItemBeenGained, _;
    
    //@[DEFINES]
    _ = Game_Party.prototype;
    
    //@[ALIAS]
    ALIAS__pelOnSomeItemBeenGained = _.pelOnSomeItemBeenGained;
    _.pelOnSomeItemBeenGained = function() {
      var e;
      try {
        this.pOnItemBeenGainedProcess();
      } catch (error) {
        e = error;
        AA.w(e);
      }
      ALIAS__pelOnSomeItemBeenGained.call(this);
    };
  })();
  return (function() {    // ■ END Game_Party.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Scene_Map.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__createSpriteset, _;
    
    //@[DEFINES]
    _ = Scene_Map.prototype;
    
    //TODO: Временное решение, до обновления Extended Loot 1.2
    //@[ALIAS]
    ALIAS__createSpriteset = _.createSpriteset;
    _.createSpriteset = function() {
      ALIAS__createSpriteset.call(this);
      if (this._pelVisualDropSpriteset == null) {
        this._pelVisualDropSpriteset = new Sprite();
        this.addChild(this._pelVisualDropSpriteset);
      }
    };
  })();
});

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//? Методы для улучшенной совместимости с MapInventory

//@[EXTENSION]
AA.extend(function() {
  // * Методы ниже даже не учитываются, если плагин не подключён
  if (Imported.PKD_MapInventory !== true) {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PKD_MI.LIBS.MapChestController.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS___onGainItemFinal, _;
    
    //@[DEFINES]
    _ = PKD_MI.LIBS.MapChestController.prototype;
    
    //@[ALIAS]
    ALIAS___onGainItemFinal = _._onGainItemFinal;
    _._onGainItemFinal = function() {
      ALIAS___onGainItemFinal.call(this, ...arguments);
      AA.Utils.callDelayed($gameParty.pOnSomeItemBeenGained.bind($gameParty), 1);
    };
  })();
  (function() {    // ■ END PKD_MI.LIBS.MapChestController.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PKD_MI.LIBS.MapUserChestController.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS___onStoreItemFinal, _;
    
    //@[DEFINES]
    _ = PKD_MI.LIBS.MapUserChestController.prototype;
    
    //@[ALIAS]
    ALIAS___onStoreItemFinal = _._onStoreItemFinal;
    _._onStoreItemFinal = function() {
      ALIAS___onStoreItemFinal.call(this, ...arguments);
      return AA.Utils.callDelayed($gameParty.pOnSomeItemBeenGained.bind($gameParty), 1);
    };
  })();
  return (function() {    // ■ END PKD_MI.LIBS.MapUserChestController.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Spriteset_InvUI.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS___onReleaseDraggingCell, _;
    
    // * Возможность перетаскивания с инвентаря на панель навыков (только предметы)

    //@[DEFINES]
    _ = Spriteset_InvUI.prototype;
    if (!PKD_MI.isPro()) {
      return;
    }
    //@[ALIAS]
    ALIAS___onReleaseDraggingCell = _._onRelaseDragginCell;
    _._onRelaseDragginCell = function() {
      var symbol;
      symbol = AA.UI.getSkillSymbolUnderMouse();
      if (String.any(symbol)) {
        if (this._aaIsProperItemToPutInSkillPanelSlot(symbol)) {
          uAPI.setItemToPanel(this._dragItem.id, symbol);
        } else {
          SoundManager.playBuzzer();
        }
        return;
      }
      return ALIAS___onReleaseDraggingCell.call(this);
    };
    //?[NEW]
    _._aaIsProperItemToPutInSkillPanelSlot = function(symbol) {
      return DataManager.isItem(this._dragItem) && AA.Utils.isAAObject(this._dragItem) && AA.Input.isEditableSymbol(symbol);
    };
  })();
});

// ■ END Spriteset_InvUI.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NETCharacter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
AA.Network.SetupNETCharacter = function() {
  var ALIAS__initMembersAABSZNET, ALIAS__isABS, _;
  //@[DEFINES]
  _ = NETCharacter.prototype;
  //TODO: Синхронизировать Active состояние?

  //@[ALIAS]
  ALIAS__initMembersAABSZNET = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembersAABSZNET.call(this, ...arguments);
    // * Чтобы ID определился (Character_Base вызывает initMembers без ID)
    AA.Utils.callDelayed(this._initMembersABS.bind(this), 100);
  };
  //@[ALIAS]
  ALIAS__isABS = _.isABS;
  _.isABS = function() {
    return ALIAS__isABS.call(this) && (this.playerData() != null) && (this.actor() != null);
  };
  //$[OVER]
  // * Сам ничего не обновляет, принимает команду от сервера (если надо)
  _.aaUpdateABSAnimaXInBattleState = function() {}; // * EMPTY
  
  // * =================================================================
  _._initMembersABS = function() {
    if (this.id == null) {
      return;
    }
    this.aaEntity = new AANetworkCharEntity(this.id);
    this.initABS();
  };
  
  // * Переопределяем
  //$[OVER]
  _.aaGetExtendedHitBoxes = function() {
    if (this.isABS()) {
      return this.actor().aaGetExtendedHitBoxes();
    } else {
      return null;
    }
  };
};

// ■ END NETCharacter.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс для Action для навыков ABS

// * Большинство методов из Game_Action просто не используются
// * Вынесен в отдельный класс чтобы не мешать обычной битве
var AABattleAction;

AABattleAction = class AABattleAction extends Game_Action {
  constructor(subject, aaSkill) {
    super(subject, true);
    this.setAASkill(aaSkill);
  }

  setAASkill(aaSkill) {
    if (aaSkill == null) {
      this.clear();
    }
    if (aaSkill.isItem()) {
      this.setItem(aaSkill.databaseId());
    } else {
      this.setSkill(aaSkill.idA);
    }
  }

  AASkill() {
    return this.item().AASkill;
  }

  // * Данное действие принадлежит игроку?
  // * Используется чтобы не давать опыт, если врага убил другой АИ или глобал
  isPlayerActionOwner() {
    return this.isValid() && this.subject() === $gameParty.leader();
  }

  //$[OVER]
  // * canUse проверяется перед выполнением действия, поэтому тут пропускаем
  isValid() {
    return (this._packedSubject != null) && (this.item() != null) && (this.item().AASkill != null);
  }

  //$[OVER]
  // * Проверки сокращены, так как не используются стандартные настройки
  testApply(target) {
    return true;
  }

  // * Нет смысла, так как testLifeAndDeath == true всегда
  // * А проверки валидности цели идут на фильтре целей
  /*return @testLifeAndDeath() && (
      (@isHpRecover() && target.hp < target.mhp) ||
      (@isMpRecover() && target.mp < target.mmp) ||
      @hasItemAnyValidEffects(target)
  )*/
  //$[OVER]
  // * Нет необходимости в этой проверке
  testLifeAndDeath(target) {
    return true;
  }

  //$[OVER]
  setSubject(subject) {
    if (subject == null) {
      return this._packedSubject = null;
    } else {
      return this._packedSubject = AA.Utils.packAAEntity(subject);
    }
  }

  //$[OVER]
  subject() {
    var subject;
    subject = AA.Utils.unpackAAEntity(this._packedSubject);
    if (subject != null) {
      return subject.AABattler();
    }
    return null;
  }

  //$[OVER]
  apply(target) {
    var b;
    b = target.AABattler();
    Game_Action.prototype.apply.call(this, b);
    b.result().setUsedAASkill(this.AASkill());
  }

  //$[OVER]
  updateLastUsed() {} // * EMPTY

  //TODO: Сохранять на Subject полседний использованный AASkill ???
  //Чтобы например он onActionOnMe использовать

    //$[OVER]
  updateLastSubject() {} // * EMPTY

};


// Generated by CoffeeScript 2.6.1
// * Класс с методами взаимодействия навыков и Entities (аналог Battle Process)

//$[ENCODE]
window.AABattleActionsManager = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AABattleActionsManager;
  _.startAASkill = function(aaSkill, subject, targetPoint) {
    var direction, i, j, nextPoint, ref, target;
    if (aaSkill == null) {
      return;
    }
    // * Выполняем SAction onStart
    AA.SAaction.execute(aaSkill.onStart, subject);
    if (aaSkill.isSelfAction()) {
      //"SELF ACTION".p()
      this.applySkillAction(subject, subject, aaSkill);
    } else if (aaSkill.isInstant()) {
      //"INSTANT ACTION".p()
      // * Надо получить точку по направлению
      if (!aaSkill.isInPoint()) {
        nextPoint = subject;
        direction = subject.direction();
        for (i = j = 1, ref = aaSkill.range; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
          nextPoint = AA.Utils.Math.getProjectilePointByDirection(nextPoint, direction);
          target = AATargetsManager.getTargetInPoint(subject, aaSkill, nextPoint);
          if (target == null) {
            // * Если цели нет, просто передаём точку на карте (для NoContact навыков)
            target = nextPoint;
          }
          this.applySkillAction(subject, target, aaSkill);
        }
      } else {
        this.applySkillAction(subject, targetPoint, aaSkill);
      }
    } else {
      $gameMap.startAASkill(aaSkill, subject, targetPoint);
    }
  };
  
  // * Выполнение действия АБС навыка на карте или Entity
  _.applySkillAction = function(subject, target, absSkill) {
    var animationId, e, targets, x, y;
    try {
      //"applySkillAction".p()
      animationId = this.getProperAnimationId(subject, absSkill);
      if (target instanceof Game_Character) {
        if (absSkill.animationOnMap === 0) {
          this.playAnimationOnCharacter(target, animationId);
        } else {
          this.playAnimationOnMap(target.x, target.y, animationId);
        }
      } else {
        // * Если навык требует контакт, то нет никаких эффектов
        if (!absSkill.isNoContact()) {
          return;
        }
        ({x, y} = target);
        this.playAnimationOnMap(x, y, animationId);
      }
      targets = AATargetsManager.collectTargtesForSkill(subject, absSkill, target);
      if (absSkill.isHaveTargetLimit() && targets.length > 1) {
        targets = AATargetsManager.applySkillTargetsLimit(targets, asbsSkill);
      }
      this.performBattleAction(subject, absSkill, targets);
    } catch (error) {
      //TODO: Do Common Action (Выполнение обычных действий на событиях или персонажах)
      e = error;
      AA.w(e);
    }
  };
  //TODO: Добавить параметр Animation Scalling ??? Чтобы скалировать обычную анимацию на карте и не переделывать каждую

  // * Анимация с учётом оружия
  _.getProperAnimationId = function(subject, absSkill) {
    var animationId, e;
    try {
      animationId = absSkill.animationId();
      if (animationId === -1) { // * Normal attack
        return subject.AABattler().attackAnimationId1();
      }
      //TODO: attackAnimationId2 if dual weild
      return animationId;
    } catch (error) {
      e = error;
      AA.w(e);
      return 0;
    }
  };
  //TODO: [Идея] Проигрывание анимации на всём экране или в координатах экрана

  // * Воспроизвести анимацию на персонаже
  _.playAnimationOnCharacter = function(char, animationId) {
    var e;
    try {
      if ((animationId != null) && animationId > 0) {
        AANetworkManager.playAnimationOnCharacter(char, animationId);
        $gameTemp.requestAnimation([char], animationId, false);
      }
    } catch (error) {
      e = error;
      KDCore.warning("playAnimationOnCharacter", e);
    }
  };
  // * Воспроизвести анимацию в точке на карте
  _.playAnimationOnMap = function(x, y, animationId) {
    var e;
    if (!KDCore.Utils.isSceneMap()) {
      return;
    }
    try {
      if ((animationId != null) && animationId > 0) {
        AANetworkManager.playAnimationOnMap(x, y, animationId);
        $gameMap.aaRequestMapAnimation(x, y, animationId);
      }
    } catch (error) {
      e = error;
      KDCore.warning("playAnimationOnMap", e);
    }
  };
  // * ======================================================================
  // * BATTLE ACTION LOGIC

  // * subject и target - это characters, не battlers
  _.performBattleAction = function(subject, skill, targets) {
    var action, e;
    //"PERFORM BATTLE ACTION".p()
    //"SUB".p()
    //console.info(subject)
    //"SKILL".p()
    //console.info(skill)
    //"TARG".p()
    //console.info(targets)
    if (subject == null) {
      return;
    }
    if (skill == null) {
      return;
    }
    try {
      action = new AABattleAction(subject, skill);
      if (!action.isValid()) {
        return;
      }
      this._startAction(action, targets);
      this._endAction(action);
    } catch (error) {
      e = error;
      KDCore.warning("performBattleAction", e);
    }
  };
  _._startAction = function(action, targets) {
    var e, j, len, t;
    try {
      // * Вызов общих событий навыка (предмета)
      //TODO: Вызов общих событий AASkill ???
      action.applyGlobal();
      for (j = 0, len = targets.length; j < len; j++) {
        t = targets[j];
        this._invokeAction(t, action);
      }
    } catch (error) {
      e = error;
      KDCore.warning("_startAction", e);
    }
  };
  _._invokeAction = function(target, action) {
    var e;
    try {
      //TODO: Возможно Drain с текущим алгоритмом работать не будут
      // * Сейчас каждый игрок отправляет свой Observer, т.е. нельзя
      // * изменить значение HP персонажа на другом клиенте, надо
      // * вызывать метод, который меняет на текущем клиенте (собственнике персонажа)
      if (AA.Network.isNetworkGame()) {
        if (target instanceof Game_Event) {
          if (ANGameManager.isMapMaster()) {
            this._applyActionOnTarget(target, action);
          } else {
            AANetworkManager.applyActionOnTarget(target, action);
          }
        } else if (target instanceof NETCharacter) {
          AANetworkManager.applyActionOnTarget(target, action); // * Game_Player (SELF)
        } else {
          this._applyActionOnTarget(target, action);
        }
      } else {
        this._applyActionOnTarget(target, action);
      }
    } catch (error) {
      e = error;
      KDCore.warning("_invokeAction", e);
    }
  };
  _._applyActionOnTarget = function(target, action) {
    var e;
    try {
      if (action == null) {
        return;
      }
      if (target == null) {
        return;
      }
      //TODO: repeats time?
      //TODO: CE on Use
      //TODO: Impulse?
      action.apply(target);
      this._onActionResult(target, action);
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  _._onActionResult = function(target, action) {
    var battler, e;
    try {
      battler = target.AABattler();
      if (!battler.result().used) {
        return;
      }
      this._performActionResultOnTarget(target);
      battler.startDamagePopup();
      action.subject().startDamagePopup();
      target.aaOnActionOnMe(action);
      try {
        AA.SAaction.execute(action.AASkill().onHit, target);
      } catch (error) {
        e = error;
        KDCore.warning("skill: onHit Script Action issue", e);
      }
    } catch (error) {
      e = error;
      KDCore.warning("_onActionResult", e);
    }
  };
  // * Звуковые и визуальные эффекты после действия (на цели)
  _._performActionResultOnTarget = function(target) {
    var battler, e, result;
    try {
      battler = target.AABattler();
      result = battler.result();
      // * MISS
      if (result.missed) {
        battler.performMiss();
      // * EVADE
      } else if (result.evaded) {
        if (result.physical) {
          battler.performEvasion();
        } else {
          battler.performMagicEvasion(); // * DAMAGE
        }
      } else {
        // * HP
        if (result.hpAffected) {
          if (result.hpDamage > 0 && !result.drain) {
            battler.performDamage();
          }
          if (result.hpDamage < 0) {
            battler.performRecovery();
          }
        }
        // * MP and TP
        if (battler.isAlive() && (result.mpDamage !== 0 || result.tpDamage !== 0)) {
          if (result.mpDamage < 0 || result.tpDamage < 0) {
            battler.performRecovery();
          }
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning("_actionResultOnDamage", e);
    }
  };
  //TODO: Надо каждую секунду вызывать battler.onTurnEnd ???
  _._endAction = function(action) {
    var battler, e;
    try {
      battler = action.subject();
      if (battler != null) {
        battler.onAAActionComplete();
      }
    } catch (error) {
      e = error;
      KDCore.warning("_endAction", e);
    }
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Глабольный менеджер с вспомогательными методами для АБС боя
var AABattleManager;

AABattleManager = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AABattleManager;
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------
//TODO: Не нужен по сути


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ COMMON.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Utils;
  (function() {    // * Общее
    // -----------------------------------------------------------------------
    _.checkSwitch = function(value) {
      if (isFinite(value)) {
        return false;
      }
      return KDCore.SDK.checkSwitch(value);
    };
    _.isSamePointA = function(point1, point2) {
      return point1[0] === point2[0] && point1[1] === point2[1];
    };
    // * Является ли символ кнопкой панели навыков
    _.isSkillPanelSymbol = function(symbol) {
      var symbols;
      if (!String.any(symbol)) {
        return false;
      }
      symbols = AA.Input.skillPanelSymbols;
      return symbols.contains(symbol);
    };
    // * Получить значение опыта с врага (с учётом специальной переменной для опыта)
    _.getExpFromAAEnemy = function(enemyDbData) {
      var e, expVarId, param;
      try {
        if (enemyDbData == null) {
          return 0;
        }
        if (enemyDbData.AAEnemy != null) {
          param = enemyDbData.AAEnemy.find(function(p) {
            return p[0] === 'expVar';
          });
          if (param != null) {
            expVarId = parseInt(param[1]);
            if ((expVarId != null) && expVarId > 0) {
              return $gameVariables.value(expVarId);
            }
          }
        }
        return enemyDbData.exp;
      } catch (error) {
        e = error;
        AA.w(e);
        return 0;
      }
    };
    // * Вызвать с задержкой в time миллисекунд
    // * Не забываем про bind
    return _.callDelayed = function(method, time = 1) {
      var e;
      try {
        if (method == null) {
          return;
        }
        setTimeout((function() {
          return method();
        }), time);
      } catch (error) {
        e = error;
        AA.w(e);
      }
    };
  })();
  (function() {    // * Навыки и предметы
    // -----------------------------------------------------------------------
    // * В ABS Z предметы и навыки имеют свои уникальные ID (поле idA)
    // * Это сделано так как предметы имели одинаковые ID что и навыки и было не удобно их различать
    // * Теперь предметы имеют idA = id + это значение
    _.ItemsIDStart = 9000;
    // * Навык (или предмет) имеют AASkill данные в себе
    _.isAAObject = function(skillIdOrObject) {
      if (skillIdOrObject == null) {
        return false;
      }
      if (isFinite(skillIdOrObject)) {
        if (skillIdOrObject <= 0) {
          return false;
        }
        skillIdOrObject = this.getAASkillObject(skillIdOrObject);
      }
      return skillIdOrObject.AASkill != null;
    };
    _.isAASkill = function(skillId) {
      return skillId <= this.ItemsIDStart;
    };
    _.isAAItem = function(skillId) {
      return skillId > this.ItemsIDStart;
    };
    _.getAASkillObject = function(skillId) {
      if (skillId <= 0) {
        return null;
      }
      if (this.isAAItem(skillId)) {
        return $dataItems[skillId - this.ItemsIDStart];
      } else {
        return $dataSkills[skillId];
      }
    };
    _.isAAState = function(stateIdOrObject) {
      var obj;
      if (stateIdOrObject == null) {
        return false;
      }
      if (isFinite(stateIdOrObject)) {
        obj = this.getAAStateObject(stateIdOrObject);
      } else {
        obj = stateIdOrObject;
      }
      if (obj != null) {
        return obj.AAState != null;
      } else {
        return false;
      }
    };
    _.getAAStateObject = function(stateId) {
      if (stateId <= 0) {
        return null;
      }
      return $dataStates[stateId];
    };
    // * Получить иконку оружия навыка атаки (или иконку навыка атаки, если нет оружия)
    _.getAttackSkillWeaponIconIndex = function(skill, battler) {
      var e, weapon;
      try {
        weapon = battler.weapons()[0];
        if ((weapon != null) && weapon.iconIndex > 0) {
          return this.getSkillSlotImgOrIcon(weapon); //.iconIndex
        } else {
          return this.getSkillSlotImgOrIcon(skill); //.iconIndex
        }
      } catch (error) {
        e = error;
        AA.w(e);
        return 0;
      }
    };
    // * Получить иконку или картинку для слота навыка
    // * Возвращает либо имя картинки, либо номер иконки
    return _.getSkillSlotImgOrIcon = function(dataItem) {
      var e;
      try {
        if (dataItem == null) {
          return 0;
        }
        if (this.isAAObject(dataItem) && String.any(dataItem.AASkill.ssImg)) {
          return dataItem.AASkill.ssImg;
        } else if (String.any(dataItem.meta.ssImg)) {
          return dataItem.meta.ssImg;
        }
        return dataItem.iconIndex;
      } catch (error) {
        e = error;
        AA.w(e);
        return 0;
      }
    };
  })();
  (function() {    // * Методы распаковки и запаковки данных для хранения и сохранения игры
    // -----------------------------------------------------------------------
    _.unpackAASkill = function(idA) {
      var object;
      object = this.getAASkillObject(idA);
      if (object != null) {
        return object.AASkill;
      } else {
        return null;
      }
    };
    _.packAAPoint = function(point) {
      var x, y;
      if (point instanceof Game_Character) {
        return this.packAAEntity(point);
      } else {
        x = point.x;
        y = point.y;
        return {x, y};
      }
    };
    _.unpackAAPoint = function(data) {
      if (data.x != null) {
        return new KDCore.Point(data.x, data.y);
      } else {
        return this.unpackAAEntity(data);
      }
    };
    _.packAAEntity = function(entity) {
      if (entity == null) {
        return null;
      }
      // * Для сетевой игры отдельный метод с учётом NetCharacter
      if (AA.Network.isNetworkGame()) {
        return AA.Network.packMapChar(entity);
      } else {
        if (entity === $gamePlayer) {
          return {
            type: 0
          };
        } else if (entity instanceof Game_Event) {
          return {
            type: 1,
            id: entity.eventId(),
            mapId: $gameMap.mapId()
          };
        } else if (entity instanceof AADummyCharacter) {
          return {
            type: 1000,
            id: entity.uId
          };
          return {
            // * PARTY MEMBER
            // < 0 ?
            //    @subject = 1000 +
            //TODO: party member pack
            //$gamePlayer.followers().follower(index), from 0 to 3
            type: 2
          };
        }
      }
    };
    return _.unpackAAEntity = function(data) {
      if (data == null) {
        return null;
      }
      // * Для сетевой игры отдельный метод с учётом NetCharacter
      if (AA.Network.isNetworkGame()) {
        return AA.Network.unpackMapChar(data);
      } else {
        switch (data.type) {
          case 0:
            return $gamePlayer;
          case 1:
            if ($gameMap.mapId() === data.mapId) {
              return $gameMap.event(data.id);
            } else {
              return null;
            }
            break;
          case 1000:
            return $gameMap.aaGetGlobalSkill(data.id);
          case 2:
            //TODO: party member
            return null;
        }
      }
      return null;
    };
  })();
  (function() {    // * Конвертирование направлений
    // -----------------------------------------------------------------------
    _.get8Dir = function(d) {
      switch (d) {
        case 1:
          return [4, 2];
        case 3:
          return [6, 2];
        case 7:
          return [4, 8];
        case 9:
          return [6, 8];
        default:
          return [0, 0];
      }
    };
    return _.get4Dir = function(horz, vert) {
      if (horz === 4 && vert === 2) {
        return 1;
      }
      if (horz === 6 && vert === 2) {
        return 3;
      }
      if (horz === 4 && vert === 8) {
        return 7;
      }
      if (horz === 6 && vert === 8) {
        return 9;
      }
      return 0;
    };
  })();
})();

// ■ END COMMON.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Методы формирования Damage PopUp на персонаже
var AADamagePopUpFactory;

AADamagePopUpFactory = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AADamagePopUpFactory;
  _.createExpPopUpData = function(value, charToShowAbove) {
    var e, settings, valueText;
    try {
      valueText = AA.PP.getExpPopUpSettings().textFormat.replace("%1", value);
      settings = AA.PP.getExpPopUpSettings().styleId;
      return this._createFromSettings(settings, valueText);
    } catch (error) {
      e = error;
      AA.w(e);
      return null;
    }
  };
  _.createDamagePopUpData = function(battler) {
    var result;
    if (!AA.PP.isPopUpIsActive()) {
      // * Если отключены, то ничего не возвращяем
      return null;
    }
    result = battler.result();
    if (result.missed || result.evaded) {
      return this._createMiss();
    } else if (result.hpAffected) {
      return this._createHpDamage(result, battler.isEnemy());
    } else if (battler.isAlive() && result.mpDamage !== 0) {
      return this._createMpDamage(result);
    }
    return null; // * Нет ничего
  };
  _._createMiss = function() {
    return this._createFromSettings("Miss_For_All", AA.PP.getTextForPopUpMiss());
  };
  _._createFromSettings = function(styleId, value) {
    return {
      settings: AA.PP.getPopUpDamageSettings(styleId),
      value: value
    };
  };
  _._createHpDamage = function(result, isEnemy) {
    var isHeal, styleId, value;
    isHeal = result.hpDamage < 0;
    value = this._convertValue(result.hpDamage);
    if (this._isHaveSpecialStyle(result)) {
      return this._createFromSettings(result.getUsedAASkill().popUpStyleId, value);
    } else {
      if (isHeal === true) {
        return this._createFromSettings("Heal_For_All", value);
      } else {
        if (isEnemy) {
          styleId = "Damage_HP_For_Enemy";
        } else {
          styleId = "Damage_HP_For_Player";
        }
        if (result.critical) {
          styleId += "_Critical";
        }
        return this._createFromSettings(styleId, value);
      }
    }
  };
  _._createMpDamage = function(result) {
    var isHeal, value;
    isHeal = result.mpDamage < 0;
    value = this._convertValue(result.mpDamage);
    if (this._isHaveSpecialStyle(result)) {
      return this._createFromSettings(result.getUsedAASkill().popUpStyleId, value);
    } else {
      return this._createFromSettings("Damage_Other_For_All", value);
    }
  };
  // * Чтобы лечение было с +
  _._convertValue = function(value) {
    if (value >= 0) {
      return value;
    }
    value *= -1;
    return "+" + value;
  };
  // * Есть ли у навыка специальный пользовательский стиль урона?
  _._isHaveSpecialStyle = function(result) {
    var aaSkill;
    aaSkill = result.getUsedAASkill();
    return (aaSkill != null) && String.any(aaSkill.popUpStyleId);
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Данный класс используется для глобального вызова навыков на карте
var AADummyEntity;

AADummyEntity = class AADummyEntity extends AAEntity {
  constructor(ownerId, _teamId, _uId) {
    super();
    this.ownerId = ownerId;
    this._teamId = _teamId;
    this._uId = _uId;
    this.initABS(); // * Сразу
  }

  teamId() {
    return this._teamId;
  }

  character() {
    return $gameMap.aaGetGlobalSkill(this._uId);
  }

  battler() {
    if (this.ownerId <= 0) {
      return $gameParty.leader();
    } else {
      return this.aaBattler;
    }
  }

  initABS() {
    if (this.battler() == null) {
      super.initABS();
      // * Инициализация системы в первый раз
      this.aaBattler = new Game_Enemy(this.ownerId, 0, 0);
    } else {

    }
  }

};

// * Ничего
// * Повторная инициализация (например после выхода из меню) не нужна


// Generated by CoffeeScript 2.6.1
// * Данный класс используется для AAEntity врагов на карте
var AAEnemyEntity;

AAEnemyEntity = class AAEnemyEntity extends AAEntity {
  constructor(eventId) {
    super();
    this.eventId = eventId;
    if (AA.Network.isNetworkGame()) {
      this._setupForNetwork();
    }
  }

  // * Группа у них 1, как и у стандартных врагов, чтобы враги их игнорировали
  teamId() {
    return this.model().teamId;
  }

  character() {
    return $gameMap.event(this.eventId);
  }

  battler() {
    return this.aaBattler;
  }

  isEnemy() {
    return true;
  }

  logic() {
    return this.aaLogic;
  }

  // * Настройки и параметры
  model() {
    return this.aaModel;
  }

  initABS() {
    if (this.model() == null) {
      super.initABS();
      // * Инициализация системы в первый раз
      this.aaModel = new AAEnemyModelData(this.eventId);
      this.aaBattler = new AAEnemyBattler(this.aaModel.enemyId, this.eventId);
      this.aaLogic = new EnemyAI_FlowMachine(this.eventId);
    } else {

    }
  }

};

// * Ничего
// * Повторная инициализация (например после выхода из меню) не нужна


// Generated by CoffeeScript 2.6.1
// * Класс, который содержит все настройки и параметры AA сущности врага на карте
// * Аналог AIBehavModel из ABS MV

//@[STORABLE]
//@[GLOBAL]
var AAEnemyModelData;

AAEnemyModelData = (function() {
  class AAEnemyModelData {
    constructor(eventId) {
      this.eventId = eventId;
      this.enemyId = this.eventSettings().getEnemyId();
      this._initBaseParameters();
      this._applyParametersFromDB();
      this._applyParametersFromEvent();
      this._convertParameters();
    }

    //TODO: Делать редактор или нет?

      //TODO: Игрок должен иметь возмможность менять значения во время игры
    //TODO: basik shake effect strength when hitted
    enemy() {
      return $dataEnemies[this.enemyId];
    }

    eventSettings() {
      return $gameMap.event(this.eventId).aaEventSettings;
    }

    isHaveDeadSwitch() {
      return AA.Utils.checkSwitch(this.deadSwitch);
    }

    isHaveOnDeathAction() {
      return AA.SAaction.isProper(this.onDeath);
    }

    isHaveOnSeeTargetAction() {
      return AA.SAaction.isProper(this.onSeeTarget);
    }

    isHaveSpecialExpValue() {
      return this.expVar > 0;
    }

    isHaveOnDeathVariable() {
      return this.onDeathVar > 0;
    }

  };

  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = AAEnemyModelData.prototype;
    
    // * Инициализация базовых настроек
    _._initBaseParameters = function() {
      this._initMain();
      this._initOnMapSettings();
      this._initOtherSettings();
      this._initVisualSettings();
      this._initAnimationSettings();
      this._initMovingSettings();
    };
    _._initMain = function() {
      this.onDeath = 0; //AScript
      this.returnRadius = 12;
      this.viewRadius = 5;
      this.noPassVisionRegions = [];
      this.noPassVisionTerrains = [];
    };
    _._initOnMapSettings = function() {
      this.shatterEffect = 1;
      this.deadSwitch = 0; //Switch (A, B, C, D)
      this.eraseOnDead = 1;
      // * Тип атаки Motion, если у навыка есть isHaveWeaponMotion
      this.weaponMotionType = 0;
      // * Работает только с Extended Loot и Visual Drop ON
      this.lootDropOnDeath = 1;
    };
    _._initVisualSettings = function() {
      this.faceName = ""; // имя файла в папке faces
      this.faceIndex = 0;
      this.UIInfo = 1; // * Если 1 - показывать Target UI при наведени курсора
      this.miniHpGaugeStyle = "";
      return this.miniHPGaugeOffset = [0, 0];
    };
    _._initOtherSettings = function() {
      this.onSeeTarget = 0; //AScript
      // * Переменная для опыта (отдельное значение, а не из БД)
      this.expVar = 0;
      // * За данного врага опыт даётся автоматически ( если 1)
      this.autoExp = 1;
      // * При получении урона (AABS навыка от кого либо)
      this.onHit = 0; //AScript
      // * Номер команды (по умолчанию у всех врагов 1)
      this.teamId = 1;
      // * Переменная для +1 когда этот враг погибает
      this.onDeathVar = 0;
    };
    _._initAnimationSettings = function() {
      this.hitAnimationId = 1; // ID анимации
    };
    _._initMovingSettings = function() {
      this.noMoveInBattle = 0; // * Если 1 - враг не будет двигаться в бою (вообще)
      this.noApproach = 0; // * Не преследовать цель в бою (своё движение остаётся, например Random или отступать от игрока)
      // Range (when start), Freq, Speed
      this.approachMoveData = [3, 5, 4];
      // Min dist, Freq, Speed, isRandomStep
      this.inBattleMoveData = [1, 3, 3, 0];
    };
    //TODO: returnMoveData
    _._applyParametersFromDB = function() {
      var i, len, p, params;
      params = this.enemy().AAEnemy;
      if (params == null) {
        return;
      }
      for (i = 0, len = params.length; i < len; i++) {
        p = params[i];
        this[p[0]] = p[1];
      }
    };
    // * Применяем параметры из страницы события
    _._applyParametersFromEvent = function() {
      var i, len, param, ref, settings;
      settings = this.eventSettings();
      if (!settings.isHaveExtraParameters()) {
        return;
      }
      ref = settings.getParameters();
      for (i = 0, len = ref.length; i < len; i++) {
        param = ref[i];
        this[param[0]] = param[1];
      }
    };
    // * Преобразует некоторые параметры
    _._convertParameters = function() {
      this.miniHPGaugeOffset = AA.Utils.Parser.convertArrayFromParameter(this.miniHPGaugeOffset);
      this.approachMoveData = AA.Utils.Parser.convertArrayFromParameter(this.approachMoveData);
      this.inBattleMoveData = AA.Utils.Parser.convertArrayFromParameter(this.inBattleMoveData);
      this.noPassVisionRegions = AA.Utils.Parser.convertArrayFromParameter(this.noPassVisionRegions);
      this.noPassVisionTerrains = AA.Utils.Parser.convertArrayFromParameter(this.noPassVisionTerrains);
    };
  })();

  return AAEnemyModelData;

}).call(this);

// ■ END PRIVATE
//---------------------------------------------------------------------------
// * Не используются (для Selection circle)
//@selectionVisible = true
//@selectionColor = "#FF00FF"
//@selectionOffset = [0, -10]
//@selectionImage = "targetSelectedDottedSquare"


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AAEventSettingsParser.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var AAEventSettingsParser;
  AAEventSettingsParser = class AAEventSettingsParser {
    constructor(list) {
      this.list = []; // * Список всех комментариев
      this.absParameters = []; // * ABS параметры
      this.param = null; // * Параметр плагина (MZ)
      this.mainLine = ""; // * <ABS:X>
      this.parsedParams = []; // * Финальные значения параметров на замену
      this._pasreEventList(list);
      this._parseABSParamsBase();
      this._parseABSParamsSequence();
      this._parseParams();
      this._parsePluginCommand();
      return;
    }

    isHaveExtraParameters() {
      return this.parsedParams.length > 0;
    }

    getParameters() {
      return this.parsedParams;
    }

    // * Получить значение переменной опыта
    // * Данный метод используется чтобы получить опыт с уже мёртвого врага (т.е. NOT ACTIVE ABS)
    // * (нету модели и Entity, только остались эти данные)
    // * (используется если коммент был задан на событии, а в БД нету)
    getExpVarId() {
      var param;
      param = this.getParameters().find(function(p) {
        return p[0] === 'expVar';
      });
      if (param == null) {
        return 0;
      }
      return parseInt(param[1]);
    }

    getEnemyId() {
      var param;
      param = AA.Utils.Parser.extractABSParameter(this.mainLine);
      if (param == null) {
        return 0;
      }
      return param[1];
    }

    
      // * Извлечает из списка команд только комменатрии или определённую команду плагина
    _pasreEventList(list) {
      var j, len, line, ref;
      for (j = 0, len = list.length; j < len; j++) {
        line = list[j];
        if (line == null) {
          continue;
        }
        if (line.code === 108 || line.code === 408) {
          this.list.push(line.parameters[0]);
        } else if (line.code === 357 && ((ref = line.parameters) != null ? ref[1] : void 0) === "ABSEventSettings") {
          this.param = line;
        }
      }
    }

    // * Собирает параметры в базовом представлении < > (как в оригинале)
    _parseABSParamsBase() {
      var j, l, len, param, ref;
      ref = this.list;
      for (j = 0, len = ref.length; j < len; j++) {
        l = ref[j];
        if (l == null) {
          continue;
        }
        param = AA.Utils.Parser.extractABSParameter(l);
        if (param == null) {
          continue;
        }
        if (param[0] === 'ABS') {
          // * Не добавляем ABS, он идёт отдельно
          continue;
        }
        this.parsedParams.push(param);
      }
    }

    // * Собирает все строки с АБС параметрами от <ABS> до </ABS>
    _parseABSParamsSequence() {
      var endElement, i, j, ref, ref1, startIndex;
      this.mainLine = this.list.find(function(l) {
        return l.contains('<ABS');
      });
      endElement = this.list.find(function(l) {
        return l.contains('</ABS>');
      });
      if (endElement == null) {
        return;
      }
      startIndex = this.list.indexOf(this.mainLine);
      if (startIndex < 0) {
        return;
      }
      for (i = j = ref = startIndex + 1, ref1 = this.list.length; (ref <= ref1 ? j < ref1 : j > ref1); i = ref <= ref1 ? ++j : --j) {
        if (this.list[i] === endElement) {
          break;
        }
        this.absParameters.push(this.list[i]);
      }
    }

    // * Парсинг всех параметров из строк в структуру (имя: значение)
    _parseParams() {
      var j, len, pair, param, ref;
      if (this.absParameters.length === 0) {
        return;
      }
      ref = this.absParameters;
      for (j = 0, len = ref.length; j < len; j++) {
        param = ref[j];
        pair = AA.Utils.Parser.extractABSParameter(param);
        if (pair == null) {
          continue;
        }
        // * Пропускаем ещё один ABS параметр, если был добавлен
        //TODO: Можно делать проверку при передаче данных на Model
        if (pair[0] === 'ABS') {
          continue;
        } else {
          this.parsedParams.push(pair);
        }
      }
    }

    //TODO: Доработать: исключить группы, правильный конвентор

      //TODO: deadSwitch
    // * Извлекает параметры из команды плагина
    _parsePluginCommand() {
      var k, p, params, v;
      if (this.param == null) {
        return;
      }
      if (!KDCore.isMZ()) {
        return;
      }
      params = this.param.parameters[3];
      if (params == null) {
        return;
      }
      for (k in params) {
        v = params[k];
        if (k.contains("Group")) {
          // * Пропускаем заголовки групп
          continue;
        }
        p = [k, AA.Utils.Parser.convertParameterValue(v)];
        this.parsedParams.push(p);
      }
    }

  };
  AA.link(AAEventSettingsParser);
})();

// ■ END AAEventSettingsParser.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Данный класс хранит информацию и состояния всех ABS объектов на карте

//@[STORABLE]
//@[GLOBAL]
var AAMapEntitiesSet;

AAMapEntitiesSet = class AAMapEntitiesSet {
  constructor(mapId) {
    this.mapId = mapId;
  }

};


// Generated by CoffeeScript 2.6.1
var AANetworkCharEntity;

AANetworkCharEntity = class AANetworkCharEntity extends AAEntity {
  constructor(netId) {
    super();
    this.netId = netId;
  }

  // * Номер команды игрока (и группы) всегда 0
  teamId() {
    return 0;
  }

  isNetChar() {
    return true;
  }

  // * Пока союзник
  //TODO: Динамически, когда PvP
  isAlly() {
    return true;
  }

  character() {
    return $gameMap.networkCharacterById(this.netId);
  }

  battler() {
    var ref;
    return (ref = this.character()) != null ? ref.actor() : void 0;
  }

};


// Generated by CoffeeScript 2.6.1
// * Глабольный менеджер обработки (отправки) сетевых запросов
var AANetworkManager;

AANetworkManager = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AANetworkManager;
  (function() {    // * Методы (запросы - отправка на сервер, requests)
    // * ======================================================================
    // -----------------------------------------------------------------------
    // * В этих методах всегда много проверок, чтобы не загружать лишний раз севрер

    //TODO: В MV другой метод немного
    _.playAnimationOnCharacter = function(character, animationId) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        if (character == null) {
          return;
        }
        if (animationId <= 0) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("playAnimationOnCharacter", {character, animationId});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.playAnimationOnMap = function(x, y, animationId) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        if (animationId <= 0) {
          return;
        }
        return this.sendToServer("playAnimationOnMap", {x, y, animationId});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.showDamagePopUpOnCharacter = function(character, data) {
      var e, styleId, value;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        if (character == null) {
          return;
        }
        if (data == null) {
          return;
        }
        character = AA.Network.packMapChar(character);
        styleId = data.settings.id;
        value = data.value;
        return this.sendToServer("showDamagePopUpOnCharacter", {character, styleId, value});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.requestCharacterShakeEffect = function(character, time) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("requestCharacterShakeEffect", {character, time});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.requestCharacterShatterEffect = function(character, dx, dy) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("requestCharacterShatterEffect", {character, dx, dy});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.requestWeaponAnimation = function(battler, weaponImageId) {
      var character, e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        character = battler.AACharacter();
        if (character == null) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("requestWeaponAnimation", {character, weaponImageId});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    // * Смена состояния AnimaX (боевая стойка, кастинг, смерть и т.д.)
    // * Свой метод (у AnimaX 1.2 и ниже нету автосинхронизации на этот метод)
    _.animaXChangeState = function(newState, character) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        if (character == null) {
          return;
        }
        if (!String.any(newState)) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("animaXChangeState", {newState, character});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.executeSA = function(action, character) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("executeSA", {action, character});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    // * Враги с eraseOnDead = 1 синхронизируются автоматически
    _.executeEraseOnDeadAAEvent = function(eventId) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        return this.sendToServer("executeEraseOnDeadAAEvent", eventId);
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.syncAAEntityObserver = function(character, observerData) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("syncAAEntityObserver", {character, observerData});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.syncAIFlowMachineObserver = function(eventId, observerData) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        return this.sendToServer("syncAIFlowMachineObserver", {eventId, observerData});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.syncAAEnemyBattlerObserver = function(character, observerData) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        character = AA.Network.packMapChar(character);
        return this.sendToServer("syncAAEnemyBattlerObserver", {character, observerData});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.sendTurnTowardCharacter = function(character, point) {
      var e, x, y;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        character = AA.Network.packMapChar(character);
        ({x, y} = point);
        return this.sendToServer("sendTurnTowardCharacter", {character, x, y});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.applyActionOnTarget = function(target, action) {
      var e, skill, subject;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        if (target == null) {
          return;
        }
        if (action == null) {
          return;
        }
        target = AA.Network.packMapChar(target);
        subject = action._packedSubject;
        skill = action.AASkill().idA;
        return this.sendToServer("applyActionOnTarget", {subject, skill, target});
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    // * Добавить MapSkill на карту (визуально, расчёт на мастере карты)
    _.startAASkillOnMap = function(skill, subject, targetPoint, uniqueId) {
      var diagonalDir, direction, e, x, y;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        if (subject == null) {
          return;
        }
        if (skill == null) {
          return;
        }
        if (targetPoint == null) {
          return;
        }
        direction = subject.direction;
        diagonalDir = subject._diagonalDir;
        subject = AA.Network.packMapChar(subject);
        skill = skill.idA;
        ({x, y} = targetPoint);
        return this.sendToServer("startAASkillOnMap", {
          subject,
          skill,
          targetPoint: {x, y},
          uniqueId,
          direction,
          diagonalDir
        });
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    // * Удалить MapSkill (чисто визуально)
    return _.endAASkillOnMap = function(uniqueId) {
      var e;
      try {
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        return this.sendToServer("endAASkillOnMap", uniqueId);
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
  })();
  (function() {    // * Обработка методов ОТ сервера (responses)
    // * ======================================================================
    // -----------------------------------------------------------------------
    _.playAnimationOnCharacter_RESP = function(response) {
      var animationId, character, e;
      try {
        if (!AA.Network.isAvailableForVisual(response)) {
          return;
        }
        ({character, animationId} = response.content);
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        return AABattleActionsManager.playAnimationOnCharacter(character, animationId);
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.playAnimationOnMap_RESP = function(response) {
      var animationId, e, x, y;
      try {
        if (!AA.Network.isAvailableForVisual(response)) {
          return;
        }
        ({x, y, animationId} = response.content);
        return AABattleActionsManager.playAnimationOnMap(x, y, animationId);
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.showDamagePopUpOnCharacter_RESP = function(response) {
      var character, data, e, ref, styleId, value;
      try {
        if (!AA.Network.isAvailableForVisual(response)) {
          return;
        }
        ({character, styleId, value} = response.content);
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        data = AADamagePopUpFactory._createFromSettings(styleId, value);
        if (data == null) {
          return;
        }
        Sprite_AADamagePopUpItem.CreateOnCharacterBinded(character, data.settings, data.value);
        // * Чтобы HP минибар обновился
        return (ref = character.AASprite()) != null ? ref._aaRefreshExtraInfoOnDamage() : void 0;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.requestCharacterShakeEffect_RESP = function(response) {
      var character, e, time;
      try {
        if (!AA.Network.isAvailableForVisual(response)) {
          return;
        }
        ({character, time} = response.content);
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        if (character.aaIsShakeRequested()) {
          return;
        }
        if ((time != null) && time > 0) {
          return character != null ? character.aaRequestShakeEffect(time) : void 0;
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.requestCharacterShatterEffect_RESP = function(response) {
      var character, dx, dy, e;
      try {
        if (!AA.Network.isAvailableForVisual(response)) {
          return;
        }
        ({character, dx, dy} = response.content);
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        if (character.aaIsShatterRequested()) {
          return;
        }
        return character.aaRequestShatterEffect(dx, dy);
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.requestWeaponAnimation_RESP = function(response) {
      var character, e, ref, weaponImageId;
      try {
        if (!AA.Network.isAvailableForVisual(response)) {
          return;
        }
        ({character, weaponImageId} = response.content);
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        return (ref = character.AABattler()) != null ? ref.startWeaponAnimation(weaponImageId) : void 0;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.executeSA_RESP = function(response) {
      var action, character, cmd, e, mapId, unpackedCharacter;
      try {
        ({mapId} = response);
        ({action, character} = response.content);
        cmd = action.split("_")[0];
        // * Self.Switch - своя обработка
        if (cmd === "ss") {
          // * Тут используется  запакованный персонаж (чтобы передать EVENT ID другой карты)
          return AA.SAaction.executeSelfSwitchActionFromNetwork(action, character, mapId);
        } else {
          // * Проверки определённых действий (только на карте и на сцене)
          if (["an", "ef", "ba", "se", "ev", "ce"].contains(cmd)) {
            if (!AA.Network.isAvailableForVisual(response)) {
              return;
            }
          }
          unpackedCharacter = AA.Network.unpackMapChar(character);
          return AA.SAaction.execute(action, unpackedCharacter);
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.executeEraseOnDeadAAEvent_RESP = function(response) {
      var e, event, eventId;
      try {
        // * Тут сцена не важна
        if (!AA.Network.isOnSameMap(response)) {
          return;
        }
        eventId = response.content;
        if (eventId <= 0) {
          return;
        }
        event = $gameMap.event(eventId);
        if (event == null) {
          return;
        }
        //TODO: Может проверку что это ABS событие?
        return event.erase();
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.syncAAEntityObserver_RESP = function(response) {
      var character, e, observerData, ref;
      try {
        if (!AA.Network.isOnSameMap(response)) {
          return;
        }
        ({character, observerData} = response.content);
        if (observerData == null) {
          return;
        }
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        return (ref = character.AAEntity()) != null ? ref.applyObserverData(observerData) : void 0;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.syncAIFlowMachineObserver_RESP = function(response) {
      var e, event, eventId, observerData, ref;
      try {
        if (!AA.Network.isOnSameMap(response)) {
          return;
        }
        ({eventId, observerData} = response.content);
        if (eventId <= 0) {
          return;
        }
        if (observerData == null) {
          return;
        }
        event = $gameMap.event(eventId);
        if (event == null) {
          return;
        }
        if (event.isABS() == null) {
          return;
        }
        return (ref = event.AALogic()) != null ? ref.applyObserverData(observerData) : void 0;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.syncAAEnemyBattlerObserver_RESP = function(response) {
      var character, e, observerData, ref;
      try {
        if (!AA.Network.isOnSameMap(response)) {
          return;
        }
        ({character, observerData} = response.content);
        if (observerData == null) {
          return;
        }
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        return (ref = character.AABattler()) != null ? ref.applyObserverData(observerData) : void 0;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.animaXChangeState_RESP = function(response) {
      var character, e, newState;
      try {
        if (!AA.Network.isOnSameMap(response)) {
          return;
        }
        ({character, newState} = response.content);
        character = AA.Network.unpackMapChar(character);
        if (character == null) {
          return;
        }
        if (String.any(newState) == null) {
          return;
        }
        if (!character.isAnimX()) {
          return;
        }
        if (newState === 'base') {
          return character.resetXAnimaState();
        } else {
          return character.switchToXAnimaState(newState);
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.sendTurnTowardCharacter_RESP = function(response) {
      var character, e, x, y;
      try {
        if (!AA.Network.isAvailableForVisual(response)) {
          return;
        }
        ({character, x, y} = response.content);
        character = AA.Network.unpackMapChar(character);
        return character != null ? character.turnTowardCharacter({x, y}) : void 0;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.applyActionOnTarget_RESP = function(response) {
      var action, e, skill, subject, target;
      try {
        if (!AA.Network.isOnSameMap(response)) {
          return;
        }
        ({subject, skill, target} = response.content);
        // * Мы брали запакованный Subject из Game_Action напрямую,
        // а там он так упакован (через AA.Utils)
        subject = AA.Utils.unpackAAEntity(subject);
        if (subject == null) {
          return;
        }
        skill = AA.Utils.unpackAASkill(skill);
        if (skill == null) {
          return;
        }
        action = new AABattleAction(subject, skill);
        target = AA.Network.unpackMapChar(target);
        if (target == null) {
          return;
        }
        return AABattleActionsManager._applyActionOnTarget(target, action);
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _.startAASkillOnMap_RESP = function(response) {
      var diagonalDir, direction, e, skill, subject, targetPoint, uniqueId;
      try {
        if (!AA.Network.isOnSameMap(response)) {
          return;
        }
        ({subject, skill, targetPoint, uniqueId, direction, diagonalDir} = response.content);
        subject = AA.Network.unpackMapChar(subject);
        if (subject == null) {
          return;
        }
        subject.setDirection(direction);
        subject._diagonalDir = diagonalDir;
        skill = AA.Utils.unpackAASkill(skill);
        if (skill == null) {
          return;
        }
        $gameMap.startAASkill(skill, subject, targetPoint);
        // * Метод на gameMap () сохраняет последний созданный
        // * навык в $gameTemp.__lastAAMapSkill, чтобы можно
        // * было установить ID из сети (по индексу нельзя)
        if ($gameTemp.__lastAAMapSkill != null) {
          $gameTemp.__lastAAMapSkill.setUniqueId(uniqueId);
          return $gameTemp.__lastAAMapSkill = null;
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    return _.endAASkillOnMap_RESP = function(response) {
      var e, skill, uniqueId;
      try {
        if (!AA.Network.isOnSameMap(response)) {
          return;
        }
        uniqueId = response.content;
        skill = $gameMap.aaMapSkills().find(function(s) {
          return (s != null) && s.uniqueId === uniqueId;
        });
        if (skill == null) {
          return;
        }
        // * Намеренно устанавливаем время в 0, чтобы удалился
        skill.totalFlyTime = 0;
        return skill.forceEndFromNetwork = true;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
  })();
  return (function() {    // * Общие методы отправки и приёма команд
    // * ======================================================================
    // -----------------------------------------------------------------------
    // * Обработка ответа (команды) от сервера (общий метод)
    _.onServerCommand = function(cmd, response) {
      var e, method;
      try {
        if (SceneManager.isSceneChanging()) {
          return;
        }
        if (AA.Network.isShouldIgnoreServerCommand(response)) {
          return;
        }
        // * Получить только имя команды (без префикса)
        //cmd = cmd.replace(AA.Network.NETCmdPrefix, "")
        method = this[cmd + "_RESP"];
        if (method != null) {
          $gameTemp.aaIsLocalOnly = true;
          try {
            method(response);
          } catch (error) {
            e = error;
            AA.w(cmd, e);
          }
          return $gameTemp.aaIsLocalOnly = false;
        } else {
          return AA.w('Network: Handler for ' + cmd + ' not found');
        }
      } catch (error) {
        e = error;
        return AA.w(e, "onServerCommand");
      }
    };
    // * Отправка команды на сервер (общий метод)
    return _.sendToServer = function(cmd, content) {
      var data, e;
      try {
        if ($gameTemp.aaIsLocalOnly === true) {
          return;
        }
        if (!AA.Network.isNetworkGame()) {
          return;
        }
        if (SceneManager.isSceneChanging()) {
          return;
        }
        // * Все команды только с карыт можно отправлять
        if (!KDCore.Utils.isSceneMap()) {
          return;
        }
        // * Это старый способ (через nAPI)
        /*nAPI.sendCustomCommand(
            AA.Network.NETCmdPrefix + cmd,
            AA.Network.createServCommand(content)
        )*/
        data = AA.Network.createServCommand(content);
        return ANNetwork.send(NMS.ABSZ(cmd, data));
      } catch (error) {
        e = error;
        return AA.w(e, "sendToServer");
      }
    };
  })();
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var AAPlayerEntity;

AAPlayerEntity = class AAPlayerEntity extends AAEntity {
  constructor() {
    super();
  }

  // * Номер команды игрока (и группы) всегда 0
  teamId() {
    return 0;
  }

  isPlayer() {
    return true;
  }

  character() {
    return $gamePlayer;
  }

  battler() {
    return $gameParty.leader();
  }

  setTarget(target) {
    super.setTarget(target);
    AA.EV.call("PlayerTarget");
  }

};


// Generated by CoffeeScript 2.6.1
// * Менеджер по работе с целями (поиск целей, определение)

//$[ENCODE]
window.AATargetsManager = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AATargetsManager;
  // * Используется для определения цели для Instant NoProjectile Direction навыков
  // * Проверка точки на наличие целей для навыка
  //?[OUTER - used by AABattleActionsManager]
  //? Этот навык используется напрямую для выбора целей в битве
  _.getTargetInPoint = function(subject, aaSkill, point) {
    var events, targets;
    events = this._collectAllAAEntitiesInPoints([point]);
    if (events.isEmpty()) {
      return null;
    }
    // * В зависимости от Subject и в зависимости от действия навыка
    targets = this.filteredTargetsForSubject(subject, aaSkill, events);
    if ((targets != null) && targets.length > 0) {
      return targets[0];
    } else {
      return null;
    }
  };
  // * Отфильтровать цели (из найденных в точках) для Subject (навыка)
  _.filteredTargetsForSubject = function(subject, aaSkill, targets) {
    var candidates, e, entity, k, l, len, len1, t;
    try {
      entity = subject.AAEntity();
      candidates = [];
      if (aaSkill.isForEnemies()) {
        for (k = 0, len = targets.length; k < len; k++) {
          t = targets[k];
          if (entity.isMyEnemy(t.AAEntity())) {
            candidates.push(t);
          }
        }
      }
      if (aaSkill.isForFriends()) {
        for (l = 0, len1 = targets.length; l < len1; l++) {
          t = targets[l];
          if (!entity.isMyEnemy(t.AAEntity())) {
            candidates.push(t);
          }
        }
      }
      return candidates;
    } catch (error) {
      e = error;
      AA.w(e);
      return [];
    }
  };
  // * Собрать цели для навыка (Projectile)
  //?[OUTER - used by AABattleActionsManager]
  //? Этот навык используется напрямую для выбора целей в битве
  _.collectTargtesForSkill = function(subject, absSkill, point) {
    var targets;
    targets = [];
    // * Точные цели селектора, если мнгновенный навык (только для игрока)
    if (absSkill.isInstant() && subject === $gamePlayer && ($gameTemp._aaSkillSelectorTargets != null)) {
      targets = $gameTemp._aaSkillSelectorTargets;
    } else {
      targets = this.collectTargetsForSkillInMapPoint(absSkill, point);
    }
    // * Убираем НЕ АБС события
    targets = targets.filter(function(t) {
      return t.isActive();
    });
    targets = this.filteredTargetsForSubject(subject, absSkill, targets);
    // * Сбрасываем цели селектора
    $gameTemp._aaSkillSelectorTargets = null;
    return targets;
  };
  // * Собирает все возможные цели для навыка в точке карты
  // * (Лучше использовать этот метод для определения целей)
  _.collectTargetsForSkillInMapPoint = function(aaSkill, point) {
    var kdPoint, targets;
    if (aaSkill == null) {
      return [];
    }
    if (point == null) {
      return [];
    }
    targets = [];
    if (point instanceof Game_Character && aaSkill.isSingleTargetArea() && !(point instanceof AADummyCharacter)) {
      targets = [point];
    } else {
      if (aaSkill.isSingleTargetArea()) {
        targets = this._collectAllAAEntitiesInPoints([point]);
      } else {
        kdPoint = new KDCore.Point(point.x, point.y);
        targets = this.collectTargetsForSkillInScreenPoint(aaSkill, kdPoint.convertToScreen());
      }
    }
    return targets;
  };
  // * Собирает все возможные цели для навыка в точке экрана
  // * (Используется для сбора событий в радиусе)
  _.collectTargetsForSkillInScreenPoint = function(aaSkill, point) {
    var searchMapPoints, targets;
    if (aaSkill == null) {
      return [];
    }
    if (point == null) {
      return [];
    }
    targets = [];
    // * Сформировать квадрат выбора
    searchMapPoints = this._createSquarePoints(aaSkill.radius, point);
    targets = this._collectAllAAEntitiesInPoints(searchMapPoints);
    return targets;
  };
  _.collectTargetsForPlayerSelector = function(aaSkill) {
    var e, targets;
    try {
      // * Проверка range, если выходит за range, то не будут цели выделяться
      if (AA.Utils.Math.getDistanceMapPlayerPoint(TouchInput.toMapPoint()) <= aaSkill.range) {
        targets = this.collectTargetsForSkillInScreenPoint(aaSkill, TouchInput);
      } else {
        targets = [];
      }
      // * Фильтр целей сразу
      return this.filteredTargetsForSubject($gamePlayer, aaSkill, targets);
    } catch (error) {
      e = error;
      AA.w(e);
      return [];
    }
  };
  // * Создаём точки карты в квадратной области навыка (пиксели)
  _._createSquarePoints = function(radius, point) {
    var cellSize, cellSize2, ex, ey, i, j, k, l, points, pxRadius, ref, ref1, ref2, ref3, ref4, ref5, sx, sy;
    cellSize = $gameMap.tileWidth();
    cellSize2 = cellSize / 2;
    points = [];
    pxRadius = radius * cellSize / 2;
    sx = point.x - pxRadius;
    sy = point.y - pxRadius;
    ex = point.x + pxRadius;
    ey = point.y + pxRadius;
    for (i = k = ref = sx, ref1 = ex, ref2 = cellSize; ref2 !== 0 && (ref2 > 0 ? k < ref1 : k > ref1); i = k += ref2) {
      for (j = l = ref3 = sy, ref4 = ey, ref5 = cellSize; ref5 !== 0 && (ref5 > 0 ? l < ref4 : l > ref4); j = l += ref5) {
        points.push(new KDCore.Point(i + cellSize2 / 2, j + cellSize2).convertToMap());
      }
    }
    return points;
  };
  // * Собирает все АБС сущности (события + игрок + партия)
  _._collectAllAAEntitiesInPoints = function(points) {
    var aaEntities;
    aaEntities = [];
    aaEntities.push(...this._collectAAEventsInPoints(points));
    aaEntities.push(...this._collectPartyMembersInPoints(points));
    if (AA.Network.isNetworkGame()) {
      aaEntities.push(...this._collectNetworkCharsInPoints(points));
    }
    //TODO: collect network characters as well
    return aaEntities;
  };
  // * Собирает все АБС события (Активные) в точках карты
  _._collectAAEventsInPoints = function(points) {
    var e, events, k, len, p;
    events = [];
    try {
      for (k = 0, len = points.length; k < len; k++) {
        p = points[k];
        events.push(...$gameMap.eventsXyAAExt(p.x, p.y));
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return events;
  };
  _._collectPartyMembersInPoints = function(points) {
    var e, k, len, members, p;
    members = [];
    try {
    //TODO: followers
    // * Сейчас только проверка на игрока
      for (k = 0, len = points.length; k < len; k++) {
        p = points[k];
        if ($gamePlayer.posExt(p.x, p.y)) {
          members.push($gamePlayer);
          break;
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return members;
  };
  _._collectNetworkCharsInPoints = function(points) {
    var e, k, len, members, p;
    members = [];
    try {
      for (k = 0, len = points.length; k < len; k++) {
        p = points[k];
        members.push(...$gameMap.netChars().filter(function(c) {
          return c.posExt(p.x, p.y);
        }));
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return members;
  };
  _.collectAllABSEntitiesOnMap = function() {
    var aaEntities;
    aaEntities = [$gamePlayer];
    aaEntities.push(...$gameMap.eventsAA());
    //TODO: party members
    if (AA.Network.isNetworkGame()) {
      aaEntities.push(...$gameMap.netChars());
    }
    return aaEntities.filter(this.isValidTarget);
  };
  // * Быстрый метод проверки, находится ли игрок в определённом радиусе
  _.isPlayerInRadius = function(point, radius) {
    var e;
    try {
      return this.isCharExtInRadius(point, radius, $gamePlayer);
    } catch (error) {
      e = error;
      AA.w(e);
      return false;
    }
  };
  _.getAvailableTargetsInRadius = function(forWho, radius) {
    var candidates, e;
    try {
      // * forWho идёт как Point тоже
      candidates = this.collectAllABSEntitiesOnMap();
      candidates = candidates.filter(function(t) {
        return forWho.isMyEnemy(t);
      });
      return this.getFilteredInRadius(forWho, radius, candidates);
    } catch (error) {
      e = error;
      AA.w(e);
      return [];
    }
  };
  // * Получить сущности в радиусе (из набора сущностей)
  _.getFilteredInRadius = function(point, radius, candidates) {
    var c, e, k, len, members;
    members = [];
    try {
      for (k = 0, len = candidates.length; k < len; k++) {
        c = candidates[k];
        if (this.isCharExtInRadius(point, radius, c)) {
          members.push(c);
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return members;
  };
  // * Находится ли персонаж (точка) в радиусе (с учётом расширенных HitBox)
  _.isCharExtInRadius = function(point, radius, char) {
    var e, k, len, p, points;
    try {
      points = $gameMap.aaGetExtendedPointsFor(char);
      for (k = 0, len = points.length; k < len; k++) {
        p = points[k];
        if ($gameMap.distance(point.x, point.y, p.x, p.y) <= radius) {
          return true;
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return false;
  };
  // * Получить дистанцию между персонажем и точкой (на экране)
  // * Учитываются расширенные HitBox
  _.getScreenExtDistance = function(char, offsetY, x2, y2) {
    var dist, e, k, l, len, len1, screenXs, screenYs, x, y;
    try {
      if (char == null) {
        return 1000;
      }
      if (char.aaIsHaveExtendedHitBoxes()) {
        screenXs = char.screenXExt();
        screenYs = char.screenYExt();
        dist = [];
        for (k = 0, len = screenXs.length; k < len; k++) {
          x = screenXs[k];
          for (l = 0, len1 = screenYs.length; l < len1; l++) {
            y = screenYs[l];
            dist.push(AA.Utils.Math.getXYDistance(x, y - offsetY, x2, y2));
          }
        }
        return dist.min();
      } else {
        return AA.Utils.Math.getXYDistance(char.screenX(), char.screenY() - offsetY, x2, y2);
      }
    } catch (error) {
      e = error;
      AA.w(e);
      return 1000;
    }
  };
  // * Цель подходящая (проверки, см. BattleManagerABS.isValidTarget)
  //TODO: isValidTarget
  _.isValidTarget = function(targetChar) {
    return (targetChar != null) && targetChar.isActive() && targetChar.AABattler().isAlive();
  };
  // * Находится ли точка (цель) в области дейтсвия навыка (range)
  _.isInSkillRange = function(char, skillId, targetPoint) {
    var dataObj, dist, e, skill;
    try {
      //TODO: ПОка просто
      dist = char.distToCol(targetPoint);
      dataObj = AA.Utils.getAASkillObject(skillId);
      skill = dataObj.AASkill;
      //console.log("D " + dist)
      //console.log("R " + skill.range)
      return dist <= skill.range;
    } catch (error) {
      e = error;
      AA.w(e);
      return false;
    }
  };
  // * Получить всех ботов, которые имеют игрока своей целью
  //TODO: TeamID учёт
  // * На данный момент не проверяется кто именно цель, так как нету сопартийцев и teamId
  _.getAllWhoHavePlayerAsTarget = function() {
    return $gameMap.eventsAA().filter(function(e) {
      return e.AAEntity().isHasTarget();
    });
  };
  // * Получить всех "врагов", которые имеют целью игрока с учётом радиуса
  _.getAllWhoHavePlayerAsTargetInRange = function(range) {
    var candidates;
    candidates = this.getAllWhoHavePlayerAsTarget();
    if (candidates.length > 0) {
      candidates = AATargetsManager.getFilteredInRadius($gamePlayer, range, candidates);
    }
    return candidates;
  };
  // * Применить параметры targetLimit и targetLimitType для навыка
  _.applySkillTargetsLimit = function(targets, absSkill) {
    var e;
    try {
      //targetType = absSkill.getETargetLimitType()
      //TODO: фильтр целей для навыка
      return targets;
    } catch (error) {
      e = error;
      AA.w(e);
      return [targets[0]];
    }
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Основной класс менеджер интерфейса (API)
AA.UI = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AA.UI.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.UI;
  _.setUI = function(uiSet) {
    this.uiSet = uiSet;
    return this._subscribeForEvents();
  };
  _.isValid = function() {
    return this.uiSet != null;
  };
  // * Когда появляется окно с сообщением
  _.onGameMessageStart = function() {
    var ref;
    return (ref = this.uiSet) != null ? ref.onGameMessageStart() : void 0;
  };
  //TODO: Опция, чтобы автоматически закрывать окно выбора навыков, когда появляется сообщение

  // * Когда заканчивается окно с сообщением
  _.onGameMessageEnd = function() {
    var ref;
    return (ref = this.uiSet) != null ? ref.onGameMessageEnd() : void 0;
  };
  // * Когда было нажатие мышки на какой-либо UI элемент
  _.isUITouched = function() {
    return false;
  };
  // * Вызывается когда сцена карты заканчивается
  _.terminate = function() {
    var ref;
    return (ref = this.uiSet) != null ? ref.terminate() : void 0;
  };
  (function() {    // * Основной интерфейс Spriteset_UI
    // -----------------------------------------------------------------------
    _.refresh = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.refresh() : void 0;
    };
    _.refreshElement = function(tag) {
      var ref, ref1;
      if ((ref = this.uiSet) != null) {
        ref.refreshElement(tag);
      }
      if ((ref1 = this.uiSet) != null) {
        ref1.refreshController(tag);
      }
    };
    /*_.refreshAllElements = () ->
    return unless @uiSet?
    try
        user = $gameSystem.aaGetUserUISettings()
        for e in @uiSet.elements
            if e? and String.any(e.tag) and user.isHaveFor(e.tag)
                @refreshElement(e.tag)
    catch e
        AA.w e
    return*/
    _.hide = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.hide() : void 0;
    };
    _.show = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.show() : void 0;
    };
    // * Если какой-либо UI элемент обрабатывает нажатие курсора, то true
    return _.isAnyUIElementTouchProcess = function() {
      // * Обработка окна выбора навыков
      if (this._isSkillSelectorProcessHandler()) {
        return true;
      } else {
        return false;
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Набор навыков
    // -----------------------------------------------------------------------
    // * Открыть окно выбора навыка для слота (символа)
    _.openSkillSelectorFor = function(symbol) {
      var cntrl, e, item;
      if (!this.isValid()) {
        return;
      }
      try {
        if (symbol == null) {
          return this.closeSkillSelector();
        } else {
          cntrl = this.uiSet.getController("skills");
          item = cntrl._getItemForSymbol(symbol);
          if (item != null) {
            return this.uiSet.fwSkillsSelector.prepareAndOpenForSlot(item);
          }
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    // * Открыто ли окно выбора навыка
    _.isSkillSelectorOpen = function() {
      var e;
      if (!this.isValid()) {
        return;
      }
      try {
        return this.uiSet.fwSkillsSelector.isOpen();
      } catch (error) {
        e = error;
        AA.w(e);
      }
      return false;
    };
    _.closeSkillSelector = function() {
      var e;
      if (!this.isValid()) {
        return;
      }
      try {
        this.uiSet._terminateSkillSelectorWindow();
      } catch (error) {
        e = error;
        AA.w(e);
      }
    };
    // * Когда игрок нажал на кнопку какого-либо навыка на панели навыков
    _.skillPerformResult = function(skillId, result) {
      var cntrl, e;
      try {
        if (!this.isValid()) {
          return;
        }
        cntrl = this.uiSet.getController("skills");
        return cntrl != null ? cntrl.onSkillPerformResult(skillId, result) : void 0;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    // * Если открыто окно выбора навыка для слота, то оно закрывается сперва
    // * Если правой кнопкой по навыку, то открывается окно
    _._isSkillSelectorProcessHandler = function() {
      var e, ref;
      if (!this.isValid()) {
        return false;
      }
      try {
        return (ref = this.uiSet.getController("skills")) != null ? ref.handleSkillSelectorProcess() : void 0;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    // * Символ элемента панели навыков под курсором
    // * Используется для перетаскивания предметов из инвентаря на панель навыков
    return _.getSkillSymbolUnderMouse = function() {
      var e, item, ref;
      try {
        item = (ref = this.uiSet.getController("skills")) != null ? ref.getItemUnderMouse() : void 0;
        if (item != null) {
          return item.symbol;
        }
      } catch (error) {
        e = error;
        AA.w(e);
      }
      return null;
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Выбор зоны применения навыка на карте
    // -----------------------------------------------------------------------
    // * Установить спрайт зоны поражаения навыка
    _.setSkillImpactSelector = function(skillSelector) {
      this.skillSelector = skillSelector;
    };
    // * Активировать зону поражения (показать спрайт)
    _.activateSkillImpactSelector = function(aaSkill) {
      var ref;
      return (ref = this.skillSelector) != null ? ref.activate(aaSkill) : void 0;
    };
    // * Эффект тряски (когда нажатие за зону поражения)
    _.shakeSkillImpactSelector = function() {
      var ref;
      return (ref = this.skillSelector) != null ? ref.shake() : void 0;
    };
    return _.resetSkillImpactSelector = function() {
      var ref;
      return (ref = this.skillSelector) != null ? ref.deactivate() : void 0;
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Обработка АБС событий
    // -----------------------------------------------------------------------
    _._subscribeForEvents = function() {
      return AA.EV.subscribeFor("PlayerSkillSelector", this.gev_onPlayerSkillSelector);
    };
    _.gev_onPlayerSkillSelector = function() {
      if ($gamePlayer.isInSkillTargetingState()) {
        return AA.UI.activateSkillImpactSelector($gamePlayer.activeAASkill());
      } else {
        return AA.UI.resetSkillImpactSelector();
      }
    };
  })();
})();

// ■ END AA.UI.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Менеджер по работе с визорами АИ
var AAVisionManager;

AAVisionManager = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AAVisionManager;
  // * Проверка видимости между визором (событием) и точкой (TRUE - видно точку)
  _.isVisionLineIsFree = function(visor, endPoint) {
    var allPoints, betweenPoints, dist, e, eP, j, l, len, len1, p, sP;
    try {
      dist = $gameMap.distance(visor.x, visor.y, endPoint.x, endPoint.y);
      if (dist <= 1) {
        // * Если дистанция 1 (рядом), то значит на линии видимости не может быть помех
        return true;
      }
      // * Количество точек проверок на линии
      // * Хватит точности 1 к 1, поэтому количество точек = дистанции
      allPoints = this.getLineBetweenTwoPoints(visor, endPoint, dist);
      betweenPoints = [];
      // * Убираем End и Start точки с результата
      // * Нам важно проверить путь между начальной и конечной точкой
      sP = [visor.x, visor.y];
      eP = [endPoint.x, endPoint.y];
      for (j = 0, len = allPoints.length; j < len; j++) {
        p = allPoints[j];
        if (!AA.Utils.isSamePointA(p, sP) && !AA.Utils.isSamePointA(p, eP)) {
          betweenPoints.push(p);
        }
      }
      if (betweenPoints.length === 0) {
        
        // * Если между нет точек, то значит на линии видимости
        return true;
      }

      //console.log(betweenPoints)
      for (l = 0, len1 = betweenPoints.length; l < len1; l++) {
        p = betweenPoints[l];
        // * Если в точке находится объект (зона), что мешает зрению, значит false
        if (this.isPointIsColiderForVision(visor, p[0], p[1])) {
          return false;
        }
      }
      return true;
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return false;
  };
  // * Возвращает линию из точек между начальной и конечной точкой (включая начальную и конечную)
  _.getLineBetweenTwoPoints = function(startPoint, endPoint, precission) {
    var cpx, cpy, e, eX, eY, i, j, k, points, px, py, ref, sX, sY, tw;
    try {
      tw = $gameMap.tileWidth();
      sX = Number(startPoint.x * tw + tw / 2);
      sY = Number(startPoint.y * tw + tw / 2);
      eX = Number(endPoint.x * tw + tw / 2);
      eY = Number(endPoint.y * tw + tw / 2);
      points = [];
      for (i = j = 1, ref = precission; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
        k = i / precission;
        px = k * (eX - sX) + sX;
        py = k * (eY - sY) + sY;
        cpx = Math.floor(px / $gameMap.tileWidth());
        cpy = Math.floor(py / $gameMap.tileHeight());
        points.push([cpx, cpy]);
      }
      return points;
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return [];
  };
  // * Находится ли в данной точке карты что-либо, что мешает видимости
  // * TRUE - нельзя "видеть" через эту точку
  _.isPointIsColiderForVision = function(visor, x, y) {
    var e, events, model, noVisionRegions, noVisionTerrains;
    try {
      model = visor.AAModel();
      noVisionRegions = AA.PP.getVisionRestrictedRegions().concat(model.noPassVisionRegions);
      noVisionTerrains = AA.PP.getVisionRestrictedTerrains().concat(model.noPassVisionTerrains);
      if (noVisionRegions.contains($gameMap.regionId(x, y))) {
        return true;
      }
      if (noVisionTerrains.contains($gameMap.terrainTag(x, y))) {
        return true;
      }
      // * События с расширенными HitBox участвуют в области видимости
      events = $gameMap.eventsXyExt(x, y);
      if (events.isEmpty()) {
        return false;
      }
      // * Если хоть один блокирует, то значит заблокирована видимость
      return events.some(function(e) {
        return e.aaIsBlockVision();
      });
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return true;
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Состояние АИ
var AIFlow;

AIFlow = class AIFlow extends AIFlowMachine {
  constructor() {
    super(...arguments);
    // * Состояние в режиме ожидания
    this.paused = false;
    this.translatedFrom = -1;
    return;
  }

  update() {
    super.update();
    return this._updateFlow();
  }

  prepare(inputData) { // * EMPTY
    this.inputData = inputData;
  }

  onStateStart() {} // * EMPTY

  onStateEnd() {} // * EMPTY

  
    // * При "переходе" в это состояние
  // * Поддерживает инициацию, если не было паузы
  // * Запоминает номер состояния после которого был запущен
  onStateResume(translatedFrom) { // * EMPTY
    this.translatedFrom = translatedFrom;
  }

  
    // * При "переходе" в другое состояние
  onStatePause() {} // * EMPTY

};

(function() {  
  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ AIFlow.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AIFlow.prototype;
  _._updateFlow = function() {};
})();

// ■ END AIFlow.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {
  var BuffIconsController;
  // * Общий контроллер для отрисовки бафов персонажа (игрока)
  //?rev 17.10.20
  BuffIconsController = class BuffIconsController extends AA.UIElementController {
    // * buffSprites - Sprite_ActorStateIcon (массив)
    constructor(buffSprites) {
      super();
      this.buffSprites = buffSprites;
      this.maxCount = Math.min(this.buffSprites.length, 8);
    }

    // * Собирает индексы существующих баффов
    collectBuffs() {
      var buffs, i, j, k;
      buffs = [];
      for (i = j = 0; j < 8; i = ++j) {
        if (this.source._buffs[i] !== 0) {
          buffs.push(i);
        }
      }
      // * Если в режиме редактора, то добавляем ещё (недостающие) как Dummy
      // * Чтобы можно было видеть
      if (AA.System.isUIEditor()) {
        for (i = k = 0; k < 8; i = ++k) {
          buffs.push(1);
        }
      }
      return buffs;
    }

    
      // * Собирает все иконки бафов
    collectIcons() {
      var i, icons, j;
      icons = this.source.buffIcons();
      if (AA.System.isUIEditor()) {
        for (i = j = 0; j < 8; i = ++j) {
          icons.push(16);
        }
      }
      return icons;
    }

    // * Получает количество ходов (секунд) баффа
    collectBuffTurn(buffIndex) {
      return this.source._buffTurns[buffIndex];
    }

  };
  AA.link(BuffIconsController);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.BuffIconsController.prototype;
  //$[OVER]
  _._setupThread = function() {
    return this.createThread(20, 4);
  };
  //$[OVER]
  _._refresh = function() {
    var buffs, i, icon, icons, j, ref, ref1, turns;
    buffs = this.collectBuffs();
    icons = this.collectIcons();
    for (i = j = 0, ref = this.maxCount; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      icon = icons[i];
      turns = this.collectBuffTurn(buffs[i]);
      if ((ref1 = this.buffSprites[i]) != null) {
        ref1.drawBuffInfo(icon, turns);
      }
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ConfigManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__applyData, ALIAS__makeData, _;
  //@[DEFINES]
  _ = ConfigManager;
  //@[ALIAS]
  ALIAS__makeData = _.makeData;
  _.makeData = function() {
    var config;
    config = ALIAS__makeData.call(this);
    config.aaUserUISettings = this.aaUserUISettings;
    return config;
  };
  
  //@[ALIAS]
  ALIAS__applyData = _.applyData;
  _.applyData = function(config) {
    ALIAS__applyData.call(this, config);
    this.aaUserUISettings = config.aaUserUISettings || {};
  };
})();

// ■ END ConfigManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDatabase, _;
  //@[DEFINES]
  _ = DataManager;
  //@[ALIAS]
  ALIAS__loadDatabase = _.loadDatabase;
  _.loadDatabase = function() {
    ALIAS__loadDatabase.call(this);
    return this.aaLoadSpawnMap();
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = DataManager;
  _.aaIsSpawnMapValid = function() {
    return typeof $dataAASpawnMap !== "undefined" && $dataAASpawnMap !== null;
  };
  _.aaLoadSpawnMap = function() {
    var filename, mapId;
    window.$dataAASpawnMap = null;
    mapId = AA.PP.getSpawnMapId();
    if (!(mapId > 0)) {
      return;
    }
    filename = 'Map%1.json'.format(mapId.padZero(3));
    this.loadDataFile('$dataAASpawnMap', filename);
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------
//"SPAWN MAP LOADED".p(mapId)


// Generated by CoffeeScript 2.6.1
// * Состояние (машина) для врага в битве
var EnemyAI_BattleFlow;

EnemyAI_BattleFlow = class EnemyAI_BattleFlow extends AIFlow {
  constructor() {
    super(...arguments);
    return;
  }

  target() {
    return this.entity().getTarget();
  }

  onStateStart() {
    //"IN BATTLE STATE".p()
    // * Таймер следующей выборки действия
    // * Когда действие было выбранно, идёт небольшая пауза
    // * перед следующей выборкой действия
    this._nextActionCheck = 0;
    // *
    this._canFightNow = true;
    // * Бот отступает из боя
    this._fleeFromBattle = false;
    if (this.model().noMoveInBattle === 1) {
      this.char().aaSetMoveTypeStayStill();
    }
  }

  //TODO: change move type
  //TEMP: остановлю ботика
  //@char()._moveType = 0
  //@char().aaSetMoveTypeKeepBattleDistance()
  //TODO: filter skills
  onStateEnd() {
    //on char сделать метод основной
    return this.entity().resetBattle();
  }

};

(function() {  //TODO: clear target and other stuff (onBattleEnd for battle etc)
  //"BATTLE END".p()

  // * onStateEnd нету, так как Free состояние базовое

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ EnemyAI_BattleFlow.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = EnemyAI_BattleFlow.prototype;
  _._setup = function() {};
  
  //TODO: ЕСТЬ БАГ, если убить одного врага, другие не хотят сражаться, остаюстя в keep
  _._updateFlow = function() {
    if (this._canFightNow === true) {
      this._updateOutOfHomeFlow();
      return this._updateBattleFlow();
    } else {
      return this._updateFleeFlow();
    }
  };
  // * Если отошёл слишком далеко от "дома", надо вернуться
  _._updateOutOfHomeFlow = function() {
    if (this._isTooFarFromHomePoint()) {
      return this._canFightNow = false;
    }
  };
  _._isTooFarFromHomePoint = function() {
    var homePoint;
    homePoint = this.char().homePoint;
    if (homePoint == null) {
      return false;
    }
    return this.char().distTo(homePoint) > (this.model().returnRadius);
  };
  _._updateBattleFlow = function() {
    if (this._isTargetValid()) {
      this._selectActionToUse();
      if (this._isActionIsExists()) {
        if (this._isActionInDistance()) {
          return this._executeAction();
        } else {
          return this._movingCloserToTarget();
        }
      } else {
        return this._waitForAction();
      }
    } else {
      return this.logic().switchToFreeState();
    }
  };
  _._isTargetValid = function() {
    return this._isTargetInViewRadius() && AATargetsManager.isValidTarget(this.target());
  };
  //TODO: Сделать параметр SeekTime - когда цель вне видимости, какой-то время (в сек) всё равно преследовать
  // * или следовать в точку где последний раз видел
  // * Можно отдельное состояние (поиск по маршруту или случайно)
  // * Объеденить с системой слышымости (по сути это и есть - движение к источнику звука и патруль)
  _._isTargetInViewRadius = function() {
    return this.char().distTo(this.target()) <= (this.model().viewRadius + 1);
  };
  _._selectActionToUse = function() {
    var skills;
    this._nextActionCheck--;
    if (this._nextActionCheck > 0) {
      return;
    }
    //TODO: алгоритм выбора действия для использования сейчас
    skills = this.battler().getUsableAASkills();
    if (skills.length > 0) {
      if (skills.length === 1) {
        this._setCurrentAction(skills[0]);
      } else {
        this._selectBetterActionForNow(skills);
      }
    } else {
      this._resetCurrentAction();
    }
  };
  _._setCurrentAction = function(_currentAction) {
    this._currentAction = _currentAction;
    //TODO: Надо это или нет?
    return this._nextActionCheck = 20;
  };
  _._selectBetterActionForNow = function(skills) {
    //TODO: Все навыки применить testApply и выбрать лучший + тот который
    // можно использовать без подхода к цели
    //TODO: пока просто первый возвращаем
    this._setCurrentAction(skills.first());
  };
  _._resetCurrentAction = function() {
    this._currentAction = null;
    this._nextActionCheck = 0;
  };
  _._isActionIsExists = function() {
    return this._currentAction != null;
  };
  // * Находится ли цель на расстроянии применения действия
  _._isActionInDistance = function() {
    var aaSkill;
    aaSkill = this._currentAction.AASkill;
    if (aaSkill.isSelfAction()) {
      // * Если для врагов, то проверим, что враг в области radius действия навыка
      if (aaSkill.isForEnemies()) {
        return AATargetsManager.isCharExtInRadius(this.char(), aaSkill.radius, this.target());
      } else {
        return true;
      }
    } else {
      // * range <= 1 тут используется, чтобы монстр мог ударить диагонально, но не больше 1 клетки
      if (aaSkill.isInPoint() || aaSkill.range <= 1) {
        return AATargetsManager.isCharExtInRadius(this.char(), aaSkill.range, this.target());
      } else {
        // * Пока просто проверка расстояния
        //range = aaSkill.range
        //TODO: * Цель должна быть передо мной (на прямом направлении)
        // (см. inDirectionHard в Alpha ABS)
        return AATargetsManager.isCharExtInRadius(this.char(), aaSkill.range, this.target());
      }
    }
  };
  _._executeAction = function() {
    var char, e;
    try {
      //TODO: Custom Attack Move Route
      //"EXECUTE".p()
      //TODO: EXECUTE ACITON !!!
      // * Дополнительная проверка ещё раз перед выполнением действия
      // * Это нужно, потому что АИ выбирает очередное действие после выбора через время
      // * см. @_nextActionCheck
      if (!this.battler().canUse(this._currentAction)) {
        return this._resetCurrentAction();
      } else {
        //"EEXECUTGE".p()
        char = this.char();
        char.setActiveAASkill(this._currentAction.idA);
        return char.startPerformAASkill(this.target());
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _._movingCloserToTarget = function() {
    if (this.model().noApproach === 1) {
      return;
    }
    if (this.model().noMoveInBattle === 1) {
      return;
    }
    //"APPROACH".p()
    return this.char().aaSetMoveTypeApproachTarget();
  };
  _._waitForAction = function() {
    if (this.model().noMoveInBattle === 1) {
      return;
    }
    //"KEEP ".p()
    this.char().aaSetMoveTypeKeepBattleDistance();
  };
  // * Враг возвращается (отступает) к точке дом
  // * Пока не увидит дом (в View Radius)
  // * В отличии от Free State, точка дома не меняется, поэтому враг получается
  // * всегда будет держаться своего "дома" и сражаться в определённом радиусе
  //TODO: Custom Move Route?
  // * Задать параметр, чтобы АИ выполнял в бою customMoveRoute если нет навыков
  _._updateFleeFlow = function() {
    //"FLEE".p()
    if (this.char().distTo(this.char().homePoint) <= (this.model().viewRadius - 1)) {
      this._canFightNow = true;
    } else {
      this.char().aaSetMoveTypeReturnToHomePoint();
    }
  };
})();

// ■ END EnemyAI_BattleFlow.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Машина состояний для АИ врагов на карте
var EnemyAI_FlowMachine;

EnemyAI_FlowMachine = class EnemyAI_FlowMachine extends AIFlowMachine {
  constructor() {
    super(...arguments);
    this.registerFlowForState(0, new EnemyAI_FreeFlow(this.id));
    this.registerFlowForState(1, new EnemyAI_BattleFlow(this.id));
    // * Начальное состояние - свободное
    this.switchToFreeState();
    return;
  }

  switchToFreeState() {
    return this.setState(0);
  }

  switchToBattleState() {
    return this.setState(1);
  }

  isFreeState() {
    return this.state === 0;
  }

  isBattleState() {
    return this.state === 1;
  }

};

(function() {  //TODO: search, return???
  //TODO: move

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ EnemyAI_FlowMachine.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = EnemyAI_FlowMachine.prototype;
})();

// ■ END EnemyAI_FlowMachine.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Свободное состояние для АИ враг
var EnemyAI_FreeFlow;

EnemyAI_FreeFlow = class EnemyAI_FreeFlow extends AIFlow {
  constructor() {
    super(...arguments);
    return;
  }

  onStateStart() {
    //"IN FREE STATE".p()
    this._restoreMoveData();
    this._isTargetInViewRadius = false;
  }

  onStateEnd() {
    //"FREE END".p()
    this._storeHomePoint();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ EnemyAI_FreeFlow.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = EnemyAI_FreeFlow.prototype;
  _._setup = function() {
    this._checkVisionTimer = 0;
    this._checkTargetInRangeTimer = 0;
  };
  _._updateFlow = function() {
    this._updateReturnToHome();
    //TODO: Временно отключим Visor для врагов, у которых нет АБС навыков вообще
    if (!this.battler().isHaveAnyAASkill()) {
      return;
    }
    return this._updateVision();
  };
  _._updateReturnToHome = function() {
    var char, e, homePoint;
    char = this.char();
    if (char == null) {
      return;
    }
    homePoint = char.homePoint;
    if (homePoint == null) {
      return;
    }
    try {
      if (char.aaIsNearThePoint(homePoint, 1)) {
        char.aaResetHomePoint(); // * Сброс точки "дома"
        this._restoreMoveData(); // * Выход из режима движения
      } else {
        char.aaSetMoveTypeReturnToHomePoint();
      }
    } catch (error) {
      e = error;
      this._restoreMoveData();
      AA.w(e);
    }
  };
  // * Используется двойная проверка. Сперва простая проверка, что цель в радиусе видимости
  // * Уже затем, если цель в радиусе, проверяется линия видимости
  _._updateVision = function() {
    // * Если цель в радиусе видимости
    if (this._isTargetInViewRadius === true) {
      // * То проверяем чтобы цель была в линии видиомости (нет препятствий)
      this._updateVisionLine();
    }
    // * В любом случае, проверяем снова, что цель в радиусе видимости
    return this._updateVisionRadius();
  };
  _._updateVisionRadius = function() {
    var targetsAround;
    this._checkVisionTimer++;
    if (this._checkVisionTimer >= 4) {
      this._checkVisionTimer = 0;
      targetsAround = AATargetsManager.getAvailableTargetsInRadius(this.char(), this.model().viewRadius);
      this._isTargetInViewRadius = (targetsAround != null) && targetsAround.length > 0;
    }
  };
  //"TARGET IN RADIUS".p() if @_isTargetInViewRadius is true
  _._updateVisionLine = function() {
    var targetsAround;
    if (this._isTargetInViewRadius === false) {
      return;
    }
    this._checkTargetInRangeTimer++;
    if (this._checkTargetInRangeTimer >= 2) {
      this._checkTargetInRangeTimer = 0;
      // * Довольно сложный методы, можно вынести отедльно
      targetsAround = AATargetsManager.getAvailableTargetsInRadius(this.char(), this.model().viewRadius);
      if (targetsAround.length > 0) {
        targetsAround = targetsAround.filter((t) => {
          return AAVisionManager.isVisionLineIsFree(this.char(), t);
        });
        if (targetsAround.length > 0) {
          this._onSeeTarget(targetsAround.sample());
        }
      }
    }
  };
  _._onSeeTarget = function(target) {
    this.entity().setTarget(target);
    //"SEE TARGET IN LINE".p()
    //TODO: if enemy have actions, then switch to battle state
    if (this.battler().isHaveAnyAASkill()) {
      if (this.model().isHaveOnSeeTargetAction()) {
        AA.SAaction.execute(this.model().onSeeTarget, this.char());
      }
      this.logic().switchToBattleState();
    } else {

    }
  };
  
  // * Восстановить настройки движения, если они были сохраненны
  //TODO: if can't fight?
  //TODO: escapeFromBattle like (Типо отходить от игрока)
  // * Тоже самое поведение, что и если не может драться (noFight)
  //TODO: noFight - такого параметра не будет, хотите чтобы не дрался, не давайте действий
  _._restoreMoveData = function() {
    var e, ref;
    try {
      //"RESTORE MOVE DATA".p()
      if ((ref = this.char()) != null) {
        ref.aaRestoreMoveData();
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  // * Сохранить позицию перед выходом из состояния
  _._storeHomePoint = function() {
    var ref;
    if ((ref = this.char()) != null) {
      ref.aaStoreHomePoint();
    }
  };
})();

// ■ END EnemyAI_FreeFlow.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var FWindow_SkillSelect;

FWindow_SkillSelect = class FWindow_SkillSelect extends KDCore.FloatingWindow {
  constructor() {
    super(...arguments);
  }

  getSettings() {} // TODO: implement

  
    // * Сдвинуть позицию окна с учётом позиции элемента Skills Panel
  moveRelativeSlotPosition(x, y) {
    var h2, sector, w2;
    // Screen sectors
    // 1 | 2
    // 3 | 4
    // ==============
    sector = 1;
    w2 = Graphics.width / 2;
    h2 = Graphics.height / 2;
    
    // * Определяем сектор экрана, на котромнаходится элемент
    if (x < w2) {
      if (y < h2) {
        sector = 1;
      } else {
        sector = 3;
      }
    } else {
      if (y < h2) {
        sector = 2;
      } else {
        sector = 4;
      }
    }
    
    // * Настраиваем позиции в зависимости от секторов
    if (sector === 3 || sector === 1) {
      this.x = x;
    }
    if (sector === 2 || sector === 4) {
      this.x = x - this.width + 32; //TODO: margins from settings
    }
    if (sector >= 3) {
      this.y = y - this.height;
    } else {
      this.y = y + 32 + 2;
    }
  }

  
    // * Подготовить окно и октрыть для элемента Skills Panel
  // * slotItem = Sprite_SKillPanelItem
  prepareAndOpenForSlot(slotItem) {
    var symbol, x, y;
    ({x, y, symbol} = slotItem);
    this.moveRelativeSlotPosition(x, y);
    // * Тут всегда категория 0 по умолчанию
    this.refreshSkillList(0, symbol);
    this.open();
  }

  // * Создание списка навыков для группы
  // * Этот метод вызывается когда окно открывается для слота
  refreshSkillList(category, symbol) {
    if (this.skillsList == null) {
      return;
    }
    // * Запоминаем символ, чтобы установить навык при выборе
    this.skillsList.setSymbol(symbol);
    // * При смене категории список формируется (т.е. refresh)
    this.changeCategory(0);
  }

  changeCategory(category) {
    var e;
    try {
      this._refreshCategoryButtons(category);
      this._refreshHeader(category);
      return this.skillsList.setCategory(category);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  }

  // * Данное окно (выбор навыков и вещей) нельзя двигать
  //$[OVER]
  //isDraggable: -> false
  //TODO: или можно?
  update() {
    super.update();
    return this._updateSkillSelectClick();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ FWindow_SkillSelect.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = FWindow_SkillSelect.prototype;
  //$[OVER]
  _._createCustomElements = function() {
    this._createCategoriesButtons();
    this._createCategoriesHeader();
    this._refreshCategoryButtons(0);
    this._createSkillsList();
  };
  _._createCategoriesButtons = function() {
    //TODO: from settings
    this.buttonCat0 = new KDCore.ButtonM("Button_SkSSkillsGroup", true, "Alpha");
    this.buttonCat0.addClickHandler(() => {
      return this.changeCategory(0);
    });
    this.buttonCat0.move(26, 6);
    this.addContent(this.buttonCat0);
    this.buttonCat1 = new KDCore.ButtonM("Button_SkSItemsGroup", true, "Alpha");
    this.buttonCat1.addClickHandler(() => {
      return this.changeCategory(1);
    });
    this.buttonCat1.move(this.buttonCat0.x + 60, this.buttonCat0.y);
    this.addContent(this.buttonCat1);
  };
  _._createCategoriesHeader = function() {
    var p;
    //TODO: from parameters
    p = {
      visible: true,
      size: {
        w: 160,
        h: 28
      },
      alignment: "center",
      font: {
        face: "AABS_0",
        size: 14,
        italic: false
      },
      margins: {
        x: 0,
        y: 0
      },
      outline: {
        color: null,
        width: 2
      },
      textColor: "#FFFFFF".toCss()
    };
    this.headerText = new KDCore.UI.Sprite_UIText(p);
    // * Добавляем на Header (поверх всего)
    this.addChild(this.headerText);
  };
  _._createSkillsList = function() {
    //TODO: from settings
    this.skillsList = new Window_SkillSelectorList(new Rectangle(0, 50, this.width, this.height - 80));
    return this.addContent(this.skillsList);
  };
  _._updateSkillSelectClick = function() {
    var ref;
    if (!this.isOpen()) {
      return;
    }
    if (TouchInput.isTriggered() && this.isMouseIn()) {
      if ((ref = this.skillsList) != null) {
        ref.onClick();
      }
    }
  };
  _._refreshCategoryButtons = function(newCategory) {
    this.buttonCat0.disable();
    this.buttonCat1.disable();
    if (newCategory === 0) {
      this.buttonCat1.enable();
    } else {
      this.buttonCat0.enable();
    }
  };
  _._refreshHeader = function(category) {
    if (category === 0) {
      this.headerText.draw("SKILLS");
    } else {
      this.headerText.draw("ITEMS");
    }
  };
})();

// ■ END FWindow_SkillSelect.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__clear, _;
  //@[DEFINES]
  _ = Game_ActionResult.prototype;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    this._lastAASkill = null;
  };
})();

// ■ END Game_ActionResult.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_ActionResult.prototype;
  // * Запоминаем АБС навык, который был использован
  _.setUsedAASkill = function(aaSkill) {
    return this._lastAASkill = aaSkill.idA;
  };
  _.getUsedAASkill = function() {
    if (this._lastAASkill != null) {
      return AA.Utils.unpackAASkill(this._lastAASkill);
    } else {
      return null;
    }
  };
})();

// ■ END Game_ActionResult.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__changeEquip, ALIAS__forceChangeEquip, ALIAS__forgetSkill, ALIAS__learnSkill, ALIAS__performDamage, ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function() {
    ALIAS__setup.call(this, ...arguments);
    return this.aaCheckAndParseExtendedHitBoxes();
  };
  //@[ALIAS]
  ALIAS__performDamage = _.performDamage;
  _.performDamage = function() {
    if (AA.isABSMap()) {
      if (this.isPlayer() && AA.PP.isShakeScreenWhenPlayerGetDamage()) {
        // * Стандартный метод (тряска экрана и звук)
        return ALIAS__performDamage.call(this);
      } else {
        // * Если не игрок, то нет тряски и звука
        return Game_Battler.prototype.performDamage.call(this);
      }
    } else {
      return ALIAS__performDamage.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__learnSkill = _.learnSkill;
  _.learnSkill = function(skillId) {
    var shouldAddNewSkillToPanel;
    // * Сперва флаг - что не надо добавлять
    shouldAddNewSkillToPanel = false;
    if (!this.isLearnedSkill(skillId) && AA.PP.isAddNewSkillsOnPanelOnLearning()) {
      shouldAddNewSkillToPanel = true;
    }
    ALIAS__learnSkill.call(this, skillId);
    // * Добавляем после, чтобы навык уже был у игрока
    // * Дополнительно проверяем, выучен ли он и надо ли его добавлять
    if (this.isLearnedSkill(skillId) && shouldAddNewSkillToPanel === true) {
      //#TODO: Учитывать членов группы, но пока только игрок
      // * Чтобы добавить на панель члена партии, надо ActorID менять у SkillSet
      // * И потом опять его возвращать
      if (this.isPlayer() && AA.Utils.isAAObject(skillId)) {
        uAPI.setSkillToPanel(skillId);
      }
    }
  };
  //@[ALIAS]
  ALIAS__forgetSkill = _.forgetSkill;
  _.forgetSkill = function(skillId) {
    var e, symbol;
    ALIAS__forgetSkill.call(this, skillId);
    if (!this.isLearnedSkill(skillId) && AA.PP.isAddNewSkillsOnPanelOnLearning()) {
      //TODO: Учитывать членов группы, но пока только игрок
      if (this.isPlayer() && AA.Utils.isAAObject(skillId)) {
        try {
          symbol = this.AACharacter().aaSkillsSet.getSymbolForSkill(skillId);
          if (symbol != null) {
            uAPI.setSkillToPanel(0, symbol);
          }
        } catch (error) {
          e = error;
          AA.w(e);
        }
      }
    }
  };
  
  //@[ALIAS]
  ALIAS__changeEquip = _.changeEquip;
  _.changeEquip = function() {
    ALIAS__changeEquip.call(this, ...arguments);
    uAPI.refreshSkillPanelSafe();
  };
  //@[ALIAS]
  ALIAS__forceChangeEquip = _.forceChangeEquip;
  _.forceChangeEquip = function() {
    ALIAS__forceChangeEquip.call(this, ...arguments);
    uAPI.refreshSkillPanelSafe();
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  _.AACharacter = function() {
    var id;
    //TODO: party followers
    if (AA.Network.isNetworkGame()) {
      if (this.isPlayer()) {
        return $gamePlayer;
      } else {
        id = ANGameManager.getPlayerDataByActorId(this.actorId());
        return $gameMap.networkCharacterById(id);
      }
    } else {
      //TODO: Нет поддержки сопартийцев, поэтому всегда игрок
      return $gamePlayer;
    }
  };
  //$[OVER]
  _.isPlayer = function() {
    return AA.System.isABSActive() && this === $gameParty.leader();
  };
  //$[OVER]
  _.getAASkills = function() {
    var attackSkillId, list;
    // * Включает атаку и защиту (базовые 1 и 2)
    //TODO: навык защиты надо тоже под АБС автоматически дорабатывать при загрузке
    attackSkillId = this.attackSkillId();
    list = this.skills().concat([$dataSkills[attackSkillId]]);
    // * Включает АБС предметы (так как они по сути тоже навыки)
    // * Используется метод $gameParty.items() для быстродействия, чтобы 2 раза не проверять
    list = list.concat($gameParty.items());
    return list.filter(function(skill) {
      return skill.AASkill != null;
    });
  };
  //$[OVER]
  _.getAAItems = function() {
    return $gameParty.items().filter(function(item) {
      return AA.Utils.isAAObject(item);
    });
  };
  
  //$[OVER]
  // * По умолчанию (если тип weaponMotionType не указан анимации, то по типу оружия в руках)
  _.getDefaultWeaponMotionAnimationWeaponId = function() {
    var attackMotion, e, weapons, wtypeId;
    try {
      weapons = this.weapons();
      wtypeId = weapons[0] != null ? weapons[0].wtypeId : 0;
      attackMotion = $dataSystem.attackMotions[wtypeId];
      if (attackMotion != null) {
        return attackMotion.weaponImageId;
      }
    } catch (error) {
      e = error;
      AA.w;
    }
    return 0;
  };
  _.aaCheckAndParseExtendedHitBoxes = function() {
    var actor, e;
    try {
      actor = this.actor();
      if ((actor != null) && (actor.meta.extraHitBoxes != null)) {
        this._aaExtendedHitBox = AA.Utils.Parser.convertArrayFromParameter(actor.meta.extraHitBoxes);
        return;
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    this._aaExtendedHitBox = null;
  };
  _.aaGetExtendedHitBoxes = function() {
    return this._aaExtendedHitBox;
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__startWeaponAnimation, _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  //@[ALIAS]
  ALIAS__startWeaponAnimation = _.startWeaponAnimation;
  _.startWeaponAnimation = function(weaponImageId) {
    AANetworkManager.requestWeaponAnimation(this, weaponImageId);
    ALIAS__startWeaponAnimation.call(this, ...arguments);
  };
})();

// ■ END Game_Battler.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  // * Все ABS навыки персонажа
  // У Actor и Enemy разные источники, поэтому метод тут не имеет тела
  _.getAASkills = function() {
    return [];
  };
  // * Все ABS предметы персонажа
  _.getAAItems = function() {
    return [];
  };
  // * ABS навыки, которые можно использовать в данный момент (включая предметы)
  _.getUsableAASkills = function() {
    return this.getAASkills().filter((skill) => {
      return this.canUse(skill);
    });
  };
  // * Когда совершили какое-либо АБС действие (навык)
  // * Не используется стандартный onAllActionsEnd, так как он очищает result
  // * Данный метод выполняется только если действие было полностью законченно
  // * Некоторые AASkills прерываются, если нет цели, тогда onAAActionEnd не вызывается
  _.onAAActionComplete = function() {};
  // * Данный метод выполняется когда действие только активированно (начинается)
  _.onAAActionStart = function() {
    this.aaStates.onAnyActionDone();
  };
  // * Запросить анимацию взмаха оружия (не AnimaX, а стандартная как было в АБС)
  // * См. в редакторе System -> [SV] Attack Motions
  // * Файлы -> System\weapons
  _.aaPlayAAWeaponMotionAnimation = function(skill) {
    var e, weaponId;
    try {
      // * ID номер оружия указа в навыке
      if (skill.isHaveWeaponMotionSpecialType()) {
        this.startWeaponAnimation(skill.weaponMotionType); // * Иначе стандартная (0 или оружие в руках)
      } else {
        weaponId = this.getDefaultWeaponMotionAnimationWeaponId();
        if (weaponId > 0) {
          this.startWeaponAnimation(weaponId);
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  // * Если параметр навыка weaponMotionType == 0, то этот метод вызывается
  // * Реализация на Actor и Enemy разная
  _.getDefaultWeaponMotionAnimationWeaponId = function() {
    return 0; // * 0 - нету
  };
})();

// ■ END Game_Battler.coffee
//---------------------------------------------------------------------------

//TODO: attackSkillId - метод у МЗ лучше, чем у МВ (там капец)


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addNewState, ALIAS__canUse, ALIAS__clearStates, ALIAS__eraseState, ALIAS__initMembers, ALIAS__isAppeared, ALIAS__isOccasionOk, ALIAS__paySkillCost, _;
  //@[DEFINES]
  _ = Game_BattlerBase.prototype;
  // * Этот метод используется в методе canMove, поэтому дополняем его
  // * В АБС бою, монстр всегда Appeared (видимый)
  //@[ALIAS]
  ALIAS__isAppeared = _.isAppeared;
  _.isAppeared = function() {
    if (AA.isABSMap()) {
      return true;
    } else {
      return ALIAS__isAppeared.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    this.initAASkills();
    //TODO: Возможно это скинется при загрузке игры
    AA.EV.subscribeFor("PauseABS", this.gev_onABSPaused.bind(this));
  };
  //@[ALIAS]
  ALIAS__canUse = _.canUse;
  _.canUse = function(item) {
    if (AA.isABSMap() && (item.AASkill != null)) {
      return this.canUseABSItem(item);
    } else {
      return ALIAS__canUse.call(this, item);
    }
  };
  //@[ALIAS]
  ALIAS__paySkillCost = _.paySkillCost;
  _.paySkillCost = function(skill) {
    ALIAS__paySkillCost.call(this, skill);
    if (AA.isABSMap() && (skill.AASkill != null)) {
      this.aaSetSkillTimer(skill);
    }
  };
  // * АБС навыки не учитывают область действия, так как их можно использовать только на карте
  //@[ALIAS]
  ALIAS__isOccasionOk = _.isOccasionOk;
  _.isOccasionOk = function(item) {
    if (AA.isABSMap() && (item.AASkill != null)) {
      return true;
    } else {
      return ALIAS__isOccasionOk.call(this, item);
    }
  };
  // * STATES =========================================

  //@[ALIAS]
  ALIAS__addNewState = _.addNewState;
  _.addNewState = function(stateId) {
    ALIAS__addNewState.call(this, stateId);
    // * Если состояние было добавленно
    if (this.isStateAffected(stateId)) {
      if (AA.Utils.isAAState(stateId)) {
        this.addNewStateABS(stateId);
      }
    }
  };
  //@[ALIAS]
  ALIAS__clearStates = _.clearStates;
  _.clearStates = function() {
    ALIAS__clearStates.call(this);
    return this.clearStatesABS();
  };
  
  //@[ALIAS]
  ALIAS__eraseState = _.eraseState;
  _.eraseState = function(stateId) {
    ALIAS__eraseState.call(this, stateId);
    if (!this.isStateAffected(stateId)) {
      if (AA.Utils.isAAState(stateId)) {
        return this.eraseStateABS(stateId);
      }
    }
  };
})();

// ■ END Game_BattlerBase.coffee
//---------------------------------------------------------------------------
// * Есть стандартный у МЗ (если у МВ нету, то будет этот метод)
//@[ALIAS]
/*ALIAS__attackSkillId = _.attackSkillId
_.attackSkillId = ->
 * * У оружия может быть свой АБС навык на атакую этим оружием
    if AA.isMap()
        if !@hasNoWeapons() and @weapons()[0]?
            weapon = @weapons()[0]
            if weapon.meta.aaAttackSkillId?
                skillId = parseInt(weapon.meta.aaAttackSkillId)
                return skillId if AA.Utils.isAAObject(skillId)
    return ALIAS__attackSkillId.call(@) */


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_BattlerBase.prototype;
  _.gev_onABSPaused = function() {
    return this.aaStates.onABSSystemStop(this);
  };
  _.AACharacter = function() {
    return null;
  };
  _.isPlayer = function() {
    return false;
  };
  _.aaUpdateABS = function() {
    // * Обновление таймеров навыков
    this.aaSkillsTimers.update();
    return this.aaUpdateABSStates();
  };
  // * Расчёт значения по формуле для текущего бойца
  // * Выполняется внутри Battler, чтобы можно было получить
  // * знаения базовых параметров
  _.aaCalculateFormula = function(formula) {
    var e;
    try {
      return eval(formula);
    } catch (error) {
      e = error;
      AA.w(e);
      return 0;
    }
  };
  _.initAASkills = function() {
    this.aaSkillsTimers = new AASkillsTimers();
  };
  // * Запустить таймер перезарядки для навыка
  _.aaSetSkillTimer = function(skill) {
    var time;
    time = skill.AASkill.getReloadTime(this);
    if (time > 0) {
      this.aaSkillsTimers.startTimerForSkill(skill.idA, time);
    }
  };
  // * Если у навыка есть таймер, значит он не готов (не важно сколько осталось времени)
  _.aaIsSkillReadyInTime = function(skill) {
    return !this.aaSkillsTimers.isSkillHaveTimer(skill.idA);
  };
  // * Получить таймер навыка (используется для панели навыков в основном)
  _.aaGetRemainTimeForSkill = function(skillId) {
    // * Если таймер меньше секунды, то будет возращён 0 (чтобы не начинать визуальный отсчёт)
    if (this.aaSkillsTimers.isSkillHaveTimerToShow(skillId)) {
      return this.aaSkillsTimers.getRemainTimeForSkill(skillId);
    } else {
      return 0;
    }
  };
  _.canUseABSItem = function(item) {
    if (item == null) {
      return false;
    }
    if (!AA.isABSActive()) {
      return false;
    }
    if (!this.canMove()) {
      return false;
    }
    if (!AA.Utils.isAAObject(item)) {
      return false;
    }
    if (DataManager.isSkill(item)) {
      return this.meetsABSSkillContitions(item);
    } else if (DataManager.isItem(item)) {
      return this.meetsABSItemContitions(item);
    } else {
      return false;
    }
  };
  _.meetsABSSkillContitions = function(skill) {
    return this.aaIsSkillReadyInTime(skill) && this.meetsSkillConditions(skill);
  };
  // * Вещи не имеют таймеров
  _.meetsABSItemContitions = function(item) {
    return this.meetsItemConditions(item);
  };
})();

// ■ END Game_BattlerBase.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //TODO:
  // 0 - Register AA State (when aa new state)
  // 1 - Action End States Remove
  // 2 - Turn End States Remove
  // 3 - ABS turnOff states Remove

  // - call onStateStart SA
  // - call onStateTick SA
  // - call onStateEnd SA

  //@[DEFINES]
  _ = Game_BattlerBase.prototype;
  //TODO: подписаться на событие по остановке ABS
  _.aaUpdateABSStates = function() {
    return this.aaStates.update(this);
  };
  _.addNewStateABS = function(stateId) {
    var stateItem;
    stateItem = AA.Utils.getAAStateObject(stateId);
    if (stateItem == null) {
      return;
    }
    //"ABS STATE ADDED".p(stateId)
    this.aaStates.add(stateId);
  };
  _.clearStatesABS = function() {
    return this.aaStates = new AAStatesSet(this);
  };
  _.eraseStateABS = function(stateId) {
    var stateItem;
    stateItem = AA.Utils.getAAStateObject(stateId);
    if (stateItem == null) {
      return;
    }
    //"ABS STATE REMOVED".p()
    return this.aaStates.remove(stateId);
  };
})();

// ■ END Game_BattlerBase.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__searchLimit, ALIAS__turnTowardCharacter, _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  //@[ALIAS]
  ALIAS__searchLimit = _.searchLimit;
  _.searchLimit = function() {
    if (this.isABS()) {
      return 24;
    } else {
      return ALIAS__searchLimit.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__turnTowardCharacter = _.turnTowardCharacter;
  _.turnTowardCharacter = function(character) {
    ALIAS__turnTowardCharacter.call(this, character);
    // * Дополнительно синхронизируем поворот
    // * В Alpha NET Z это делается через Observer 60, что не хватает для ABS
    if (AA.Network.isNetworkGame()) {
      AANetworkManager.sendTurnTowardCharacter(this, character);
    }
  };
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  (function() {    // * Методы ABS (Цель)
    // -----------------------------------------------------------------------
    _.AATarget = function() {
      var ref;
      return (ref = this.AAEntity()) != null ? ref.getTarget() : void 0;
    };
    //TODO: Это можно удалить

    // * Попытка установить активную цель
    _.aaTrySetTarget = function(target) {
      var ref;
      if (this.aaIsValidTargetToSet(target)) {
        if ((ref = this.AAEntity()) != null) {
          ref.setTarget(target);
        }
        return true;
      }
      return false;
    };
    
    // * Этот метод лучше переопределять у Game_Event и Game_Player
    _.aaIsValidTargetToSet = function(target) {
      return false;
    };
    // * Есть ли активная цель?
    return _.aaIsHaveTarget = function() {
      return this.AATarget() != null;
    };
  })();
  (function() {})();  
    // * Методы ABS (Навыки)
  // -----------------------------------------------------------------------
  (function() {    // * Методы ABS (Движение)
    // -----------------------------------------------------------------------
    return _.aaTurnTowardTouchInput = function() {
      return this.turnTowardCharacter(TouchInput.toMapPoint());
    };
  })();
  (function() {    
    // -----------------------------------------------------------------------

    // * Методы ABS (Бой и состояния)
    // -----------------------------------------------------------------------
    // * Когда какое-либо действие было выполненно на мне
    _.aaOnActionOnMe = function(action) {};
    // * Когда персонаж повержен
    // * Отличается от aaOnDeath так как тут надо давать бонусы победившему
    _.aaOnDefeat = function() {};
    // * Когда надо сменить состояние персонажа на Dead (вывести из АБС системы)
    return _.aaOnDeath = function() {};
  })();
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  _.setActiveAASkill = function(_activeAASkillId) {
    this._activeAASkillId = _activeAASkillId;
  };
  _.activeAASkill = function() {
    if (this._activeAASkillId > 0) {
      return AA.Utils.getAASkillObject(this._activeAASkillId).AASkill;
    } else {
      return null;
    }
  };
  _.startPerformAASkill = function(point) {
    var skill;
    skill = this.activeAASkill();
    if (skill.isInPoint()) {
      this.turnTowardCharacter(point);
    }
    //TODO: Тут можно ещё дополнительную проверку canUse
    // так как пока шёл выборо цели (например) мана могла закончиться
    // * Анимация Motion и AnimaX могут работать вместе
    this.aaDetermineAndPlaySkillAnimation(skill);
    // * Персонаж "платит" за навык как только использует его
    this.AABattler().useItem(skill.dbItem());
    this.AABattler().onAAActionStart();
    // * Стоит ограничение задержки для безопасности
    if (skill.actionStartDelay > 0 && skill.actionStartDelay <= 60) {
      this.setupDelayedAASkill(skill, point);
    } else {
      AABattleActionsManager.startAASkill(skill, this, point);
    }
  };
  _.aaDetermineAndPlaySkillAnimation = function(skill) {
    if (skill.animaXPriority > 1) {
      if (skill.isHaveWeaponMotion()) {
        // * Анимация Motion и AnimaX могут работать вместе
        this.AABattler().aaPlayAAWeaponMotionAnimation(skill);
      }
      this.aaPlayAASkillXAnimation(skill);
    } else {
      // * Если в приоритете AnimaX
      if (skill.animaXPriority === 1) {
        // * Если есть анимация для действия, то проиграть её
        if (this.aaIsAvailableAnimaXForSkill(skill)) {
          this.aaPlayAASkillXAnimation(skill); // * Иначе анимаци Weapon Motion
        } else {
          if (skill.isHaveWeaponMotion()) { // * Если в приоритете Weapon Motion
            this.AABattler().aaPlayAAWeaponMotionAnimation(skill);
          }
        }
      } else {
        if (skill.isHaveWeaponMotion()) {
          this.AABattler().aaPlayAAWeaponMotionAnimation(skill); // * Если нет Weapon Motion, то AnimaX (если есть)
        } else {
          if (this.aaIsAvailableAnimaXForSkill(skill)) {
            this.aaPlayAASkillXAnimation(skill);
          }
        }
      }
    }
  };
  _.aaIsAvailableAnimaXForSkill = function(skill) {
    if (Imported.PKD_AnimaX !== true) {
      return false;
    }
    if (!this.isAnimX()) {
      return false;
    }
    return this.isHaveAnimaXActionWithName(skill.getAnimaXActionName());
  };
  _.aaPlayAASkillXAnimation = function(skill) {
    var e;
    try {
      if (!Imported.PKD_AnimaX) {
        return;
      }
      if (!this.isAnimX()) {
        return;
      }
      // * For AnimaX network
      // * Команда startAnimaXCustomAction отправляет
      if (this instanceof Game_Event) {
        // * по номеру события
        $gameTemp._lastAxNetworkChar = this.eventId();
      } else {
        // * 0 - значит будет по Actor ID, который отправляет
        $gameTemp._lastAxNetworkChar = 0;
      }
      this.startAnimaXCustomAction(skill.getAnimaXActionName(), false, true);
      return $gameTemp._lastAxNetworkChar = null;
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _.setupDelayedAASkill = function(skill, point) {
    this.aaDelayedSkillActions.push([skill.actionStartDelay, skill.idA, AA.Utils.packAAPoint(point)]);
  };
  _._aaUpdateDelayedSkillActions = function() {
    var action, i, len, point, ref, skill;
    ref = this.aaDelayedSkillActions;
    //TODO: Навык с задержкой должен иметь задержку перед использованием иначе ошибка, если спамить навык
    for (i = 0, len = ref.length; i < len; i++) {
      action = ref[i];
      if (action == null) {
        continue;
      }
      if (action[0]-- <= 0) {
        skill = AA.Utils.unpackAASkill(action[1]);
        point = AA.Utils.unpackAAPoint(action[2]);
        AABattleActionsManager.startAASkill(skill, this, point);
        this.aaDelayedSkillActions.delete(action);
      }
    }
  };
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[EXTENSION]
AA.extend(function() {
  var ALIAS__createNewAnimaXForCharacter, _;
  // * Методы ниже даже не учитываются, если плагин не подключён
  if (Imported.PKD_AnimaX !== true) {
    return;
  }
  //@[DEFINES]
  _ = Game_Character.prototype;
  // * Логика состояний анимации (бой, смерть) (всегда работает)
  _.aaUpdateABSAnimaX = function() {
    if (!this.isAnimX()) {
      return;
    }
    return this.aaUpdateABSAnimaXInBattleState();
  };
  _.aaUpdateABSAnimaXInBattleState = function() {
    if (this._aaIsInBattleAnimaXState()) {
      if (this._axState !== 'inBattle') {
        this._aaOnGoInBattleAnimaXState();
      }
    } else {
      if (this._axState !== 'base') {
        this._aaOnOutFromInBattleAnimaXState();
      }
    }
  };
  _._aaOnGoInBattleAnimaXState = function() {
    this.switchToXAnimaState('inBattle');
    // * Только персонаж игрока сам определяет состояние "В бою"
    // * NET Character не определяет, только получает от севрера
    // * Game_Event - у него по AAEntity, target через Observer синхронизируется
    if (AA.Network.isNetworkGame() && this === $gamePlayer) {
      return AANetworkManager.animaXChangeState('inBattle', this);
    }
  };
  _._aaOnOutFromInBattleAnimaXState = function() {
    this.resetXAnimaState();
    if (AA.Network.isNetworkGame() && this === $gamePlayer) {
      return AANetworkManager.animaXChangeState('base', this);
    }
  };
  // * Game_Event and Game_Player имеют разную реализацию
  _._aaIsInBattleAnimaXState = function() {
    return false;
  };
  // * Из-за ALIAS пришлось выносить в Extenstion, чтобы не было зависимости от положения AnimaX плагина
  //@[ALIAS]
  ALIAS__createNewAnimaXForCharacter = _.createNewAnimaXForCharacter;
  _.createNewAnimaXForCharacter = function(animaXProfile) {
    ALIAS__createNewAnimaXForCharacter.call(this, animaXProfile);
    this.refreshAnimaXABSStates(animaXProfile);
  };
  // * Загрузка состояний анимации
  _.refreshAnimaXABSStates = function(animaXProfile) {
    var animaXStateBattle, animaXStateDead;
    animaXStateBattle = XAnimaTools.getXAnimaParamsForState('inBattle', animaXProfile);
    this.registerAnimaXState('inBattle', animaXStateBattle);
    animaXStateDead = XAnimaTools.getXAnimaParamsForState('dead', animaXProfile);
    if (animaXStateDead != null) {
      this.registerAnimaXState('dead', animaXStateDead);
    }
  };
});

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    // * Набор навыков с задержкой
    this.aaDelayedSkillActions = [];
    this.aaClearCharacterEffects();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.isABS()) {
      if (Imported.PKD_AnimaX) {
        this.aaUpdateABSAnimaX();
      }
      if (AA.isABSActive()) {
        this.aaUpdateABS();
        this.aaUpdateNoPassFlag();
      }
    }
  };
  (function() {    
    // * Диагональное движение
    // -----------------------------------------------------------------------
    var ALIAS__moveDiagonally, ALIAS__moveStraight, ALIAS__realMoveSpeed, ALIAS__setDirection;
    
    //@[ALIAS]
    ALIAS__realMoveSpeed = _.realMoveSpeed;
    _.realMoveSpeed = function() {
      var speed;
      speed = ALIAS__realMoveSpeed.call(this);
      if (this._diagonalDir) {
        return speed * AA.Input.diagonalSpeed;
      } else {
        return speed;
      }
    };
    //@[ALIAS]
    ALIAS__moveStraight = _.moveStraight;
    _.moveStraight = function(direction) {
      this._diagonalDir = false;
      return ALIAS__moveStraight.call(this, direction);
    };
    //@[ALIAS]
    ALIAS__setDirection = _.setDirection;
    _.setDirection = function(direction) {
      if (this._diagStraigten === true) {
        this._diagonalDir = false;
      }
      return ALIAS__setDirection.call(this, direction);
    };
    
    //@[ALIAS]
    ALIAS__moveDiagonally = _.moveDiagonally;
    _.moveDiagonally = function(horz, vert) {
      var diag, norm;
      if (AA.Input.IsDiagonal === true) {
        diag = this.canPassDiagonally(this._x, this._y, horz, vert);
        norm = this.canPass(this._x, this._y, horz) || this.canPass(this._x, this._y, vert);
        if (diag) {
          this._diagonalDir = AA.Utils.get4Dir(horz, vert);
          this._x = $gameMap.roundXWithDirection(this._x, horz);
          this._y = $gameMap.roundYWithDirection(this._y, vert);
          this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz));
          this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert));
          this.increaseSteps();
        } else if (norm) {
          this._diagonalDir = false;
          this.moveStraight(this.aaGetOtherDiagDirection(horz, vert));
        }
        this._diagStraigten = false;
        if (this._direction === this.reverseDir(horz)) {
          this.setDirection(horz);
        }
        if (this._direction === this.reverseDir(vert)) {
          this.setDirection(vert);
        }
        return this._diagStraigten = true;
      } else {
        return ALIAS__moveDiagonally.call(this, horz, vert);
      }
    };
  })();
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  // * Для оптимизации, вынес параметр в общий метод класса
  Game_CharacterBase.aaColExt = function() {
    var e, v;
    if (Game_CharacterBase._aaColExtAA == null) {
      try {
        v = AA.PP.getCollisionPreccissionLevel() / 100;
        if (v < 0) {
          // * Проверка значения
          v = 0;
        }
        if (v > 0.99) {
          v = 0.99;
        }
      } catch (error) {
        e = error;
        AA.w(e);
        v = 0;
      }
      Game_CharacterBase._aaColExtAA = v;
    }
    return Game_CharacterBase._aaColExtAA;
  };
  (function() {    // * Общие методы ABS
    // -----------------------------------------------------------------------
    // * Основной метод, является ли персонаж вообще ABS объектом
    // * Тут НЕЛЬЗЯ добавлять доп. проверку на AA.isABSActive()
    _.isABS = function() {
      return this.AAEntity() != null;
    };
    _.AAEntity = function() {
      return this.aaEntity;
    };
    _.initABS = function() {
      var ref, ref1;
      if ((ref = this.aaEntity) != null) {
        ref.initABS();
      }
      if ((ref1 = this.AASprite()) != null) {
        ref1.initABS();
      }
      this.aaInitNoPassFlagThread();
    };
    // * Деактивировать АБС режим
    _.stopABS = function() {
      var ref;
      return (ref = this.aaEntity) != null ? ref.deactivate() : void 0;
    };
    // * Полностью отключить (очистить) АБС режим у персонажа
    _.clearABS = function() {
      return this.aaEntity = null;
    };
    _.AABattler = function() {
      var ref;
      return (ref = this.AAEntity()) != null ? ref.battler() : void 0;
    };
    _.AASprite = function() {
      var ref;
      return (ref = this.AAEntity()) != null ? ref.sprite() : void 0;
    };
    // * Логика АИ
    _.AALogic = function() {
      var ref;
      return (ref = this.AAEntity()) != null ? ref.logic() : void 0;
    };
    _.inBattle = function() {
      var ref;
      return (ref = this.AAEntity()) != null ? ref.inBattle() : void 0;
    };
    _.isActive = function() {
      var ref;
      return this.isABS() && ((ref = this.AAEntity()) != null ? ref.isActive() : void 0);
    };
    _.onTurnEnd = function() {};
    _.isMyEnemy = function(character) {
      if (!this.isABS()) {
        return false;
      }
      if (character == null) {
        return false;
      }
      if (!character.isABS()) {
        return false;
      }
      return this.AAEntity().isMyEnemy(character.AAEntity());
    };
    // * Логика АБС (только если АБС включена)
    _.aaUpdateABS = function() {
      var ref;
      this._aaUpdateDelayedSkillActions();
      if ((ref = this.AABattler()) != null) {
        ref.aaUpdateABS();
      }
      if (AA.Network.isNetworkGame()) {
        return this.aaUpdateForNetwork();
      }
    };
    return _.aaUpdateForNetwork = function() {
      var ref;
      if (!ANGameManager.isMapMaster()) {
        return;
      }
      // * AABattler тут не обновляется, так как у Game_Actor он отдельно
      // * обновляется уже в Alpha NET Z по стандарту
      if ((ref = this.AAEntity()) != null) {
        ref.updateDataObserver();
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Эффекты спрайта (тряска и прочее)
    // -----------------------------------------------------------------------
    _.aaClearCharacterEffects = function() {
      // * Первое значение - время
      // * Второе значение DX (отклонение по X)
      this._aaShakeEffectData = [0, 0];
      // * [Запрос, массив данных для сохранения, флаг что надо создать части, DX, DY]
      //TODO: Сохранение не используется пока что
      this._aaShatterEffectData = [false, [], true, 0, 0];
    };
    _.aaMotionDX = function() {
      return this._aaShakeEffectData[1];
    };
    _.aaRequestShakeEffect = function(time = 10) {
      this._aaShakeEffectData[0] = time;
      return AANetworkManager.requestCharacterShakeEffect(this, time);
    };
    _.aaIsShakeRequested = function() {
      return this._aaShakeEffectData[0] > 0;
    };
    _.aaIsShatterRequested = function() {
      return this._aaShatterEffectData[0] === true;
    };
    _.aaRequestShatterEffect = function(dx = 0.5, dy = -4) {
      this._aaShatterEffectData = [true, [], true, dx, dy];
      AANetworkManager.requestCharacterShatterEffect(this, dx, dy);
    };
    return _.aaOnShatterEffectCreated = function() {
      return this._aaShatterEffectData[0] = false;
    };
  })();
  // -----------------------------------------------------------------------

  // * Добавим MaxTp чтобы Gauge контроллеры работали
  Object.defineProperties(_, {
    mtp: {
      get: function() {
        return this.maxTp();
      },
      configurable: true
    }
  });
  // * Добавляем метод canMove для всех персонажей
  // * В основном он нужен чтобы AAEntities не ходили во время XAnima
  _.canMove = function() {
    if (this.isAnimX()) {
      if (this.isAnimXIsBusy()) {
        // * Персонаж не может идти, если он выполняет действие анимации
        return false;
      }
    }
    if (AA.isABSMap()) {
      return this.AABattler().canMove();
    }
    return true;
  };
  // * Позиция с учётом расширенных HitBox
  // * Реализован отдельный метод, так как HitBox учитывается только при поражении навыками
  _.posExt = function(x, y) {
    var d, extHitBoxes, l, r, u;
    //TODO: posExtCol не используется пока что при ExtendedHitBoxes
    if (this.aaIsHaveExtendedHitBoxes()) {
      extHitBoxes = this.aaGetExtendedHitBoxes();
      l = this.x - extHitBoxes[3];
      r = this.x + extHitBoxes[1];
      u = this.y - extHitBoxes[0];
      d = this.y + extHitBoxes[2];
      return l <= x && x <= r && u <= y && y <= d;
    } else {
      return this.posExtCol(x, y);
    }
  };
  // * Расширенная позиция, для расширения коллизий атак (прямым нажатием)
  _.posExtCol = function(x, y) {
    var isX, isY, v;
    v = Game_CharacterBase.aaColExt();
    isX = this._realX > x - v && this._realX < x + v;
    isY = this._realY > y - v && this._realY < y + v;
    return isX && isY;
  };
  // * Позиции X на экране, с учётом расширенных HitBox
  _.screenXExt = function() {
    var extHitBoxes, i, j, k, l, points, r, ref, ref1, tw, x;
    points = [this.screenX()]; // * базовая точка
    if (this.aaIsHaveExtendedHitBoxes()) {
      extHitBoxes = this.aaGetExtendedHitBoxes();
      r = extHitBoxes[1];
      l = extHitBoxes[3];
      tw = $gameMap.tileWidth();
      // * Точка права (если есть)
      if (r > 0) {
        for (i = j = 1, ref = r; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
          x = $gameMap.adjustX(this._realX + i);
          x = Math.floor(x * tw + tw / 2);
          points.push(x);
        }
      }
      // * Точка слева (если есть)
      if (l > 0) {
        for (i = k = 1, ref1 = l; (1 <= ref1 ? k <= ref1 : k >= ref1); i = 1 <= ref1 ? ++k : --k) {
          x = $gameMap.adjustX(this._realX - i);
          x = Math.floor(x * tw + tw / 2);
          points.push(x);
        }
      }
    }
    return points;
  };
  // * Позиции Y на экране, с учётом расширенных HitBox
  _.screenYExt = function() {
    var d, extHitBoxes, i, j, k, points, ref, ref1, th, u, y;
    points = [this.screenY()]; // * базовая точка
    if (this.aaIsHaveExtendedHitBoxes()) {
      extHitBoxes = this.aaGetExtendedHitBoxes();
      u = extHitBoxes[0];
      d = extHitBoxes[2];
      th = $gameMap.tileHeight();
      // * Точка снизу (если есть)
      if (d > 0) {
        for (i = j = 1, ref = d; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
          y = $gameMap.adjustY(this._realY + i);
          y = Math.floor(y * th + th - this.shiftY() - this.jumpHeight());
          points.push(y);
        }
      }
      // * Точка сверху (если есть)
      if (u > 0) {
        for (i = k = 1, ref1 = u; (1 <= ref1 ? k <= ref1 : k >= ref1); i = 1 <= ref1 ? ++k : --k) {
          y = $gameMap.adjustY(this._realY - i);
          y = Math.floor(y * th + th - this.shiftY() - this.jumpHeight());
          points.push(y);
        }
      }
    }
    return points;
  };
  // * Есть ли у персонажа расширенные HitBox для АБС навыков
  _.aaIsHaveExtendedHitBoxes = function() {
    return this.aaGetExtendedHitBoxes() != null;
  };
  // * У событий и персонажей своя реализация
  _.aaGetExtendedHitBoxes = function() {
    return null;
  };
  _.aaUpdateABSAnimaX = function() {}; // * EMPTY (Переопределяется в Game_Character_AnimaX)
  
  // * Дополнительный метод для сетевой игры
  // * Вызывается в AA.Network (через Alias метода Alpha NET Z)
  _.aaFillNetworkDataObserver = function() {
    var e;
    if (this.netDataObserver == null) {
      return;
    }
    try {

    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  _.distTo = function(point) {
    return $gameMap.distance(this.x, this.y, point.x, point.y);
  };
  // * Дистанция с учётом расширенной коллизии
  _.distToCol = function(point) {
    return ~~$gameMap.distance(this._realX, this._realY, point.x, point.y);
  };
  _.aaGetOtherDiagDirection = function(horz, vert) {
    if (this.canPass(this._x, this._y, horz)) {
      return horz;
    } else {
      return vert;
    }
  };
  // * Находится ли на Х расстоянии к точке
  _.aaIsNearThePoint = function(point, minDist = 1) {
    var e, sx, sy;
    try {
      sx = Math.abs(this.deltaXFrom(point.x));
      sy = Math.abs(this.deltaYFrom(point.y));
      return (sx + sy) <= minDist;
    } catch (error) {
      e = error;
      AA.w;
      return false;
    }
  };
  // * Двигаться к цели
  _.aaMoveTypeToTarget = function() {
    var e, target;
    try {
      target = this.AAEntity().getTarget();
      if (this.aaIsCanPerformNextMoveAction(target)) {
        if (!this.aaIsNearThePoint(target)) {
          this.aaMoveTypeToPoint(target);
        } else {
          this.aaTurnTowardTarget();
        }
        this.aaResetNextMoveActionTimer();
      }
      return this._aaLastMovingActionDelay++;
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  // * Можно ли выполнить следующее движение (используется для оптимизации преследования)
  _.aaIsCanPerformNextMoveAction = function(target) {
    if ((target != null) && target.aaIsSurrounded()) {
      // * Ждём секунду, если цель окружена (нет места подойти)
      return this._aaLastMovingActionDelay >= 60;
    } else {
      return true; // * Не надо ждать
    }
  };
  
  // * Сбрасываем ожидание следующего движения
  _.aaResetNextMoveActionTimer = function() {
    return this._aaLastMovingActionDelay = 0;
  };
  // * ОСНОВНОЙ метод
  // * Движение к точке карты
  _.aaMoveTypeToPoint = function(point) {
    var direction, e, horz, vert;
    try {
      if (point == null) {
        return;
      }
      if (AA.Input.IsDiagonal === true) {
        direction = this.aaFindDirectionToDiagonal(point.x, point.y);
        if (direction % 2 === 0) {
          return this.aaMoveToPointStraight(point);
        } else if (Math.abs(direction % 2) === 1) {
          [horz, vert] = AA.Utils.get8Dir(direction);
          this.moveDiagonally(horz, vert);
          //TODO: В ANETZ до версии 0.7 нет автосинхронизации диагонального движения
          //TODO: УБРАТЬ ЭТО ПОТОМ!!
          if (AA.Network.isNetworkGame()) {
            if (this instanceof Game_Event) {
              if (ANET.Version < 70) {
                return ANMapManager.sendEventMove(this.eventId());
              }
            }
          }
        }
      } else {
        return this.aaMoveToPointStraight(point);
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  // * Движение к точки (4 way only)
  _.aaMoveToPointStraight = function(point) {
    var dir;
    if (point == null) {
      return;
    }
    dir = this.findDirectionTo(point.x, point.y);
    if (dir > 0) {
      this.moveStraight(dir);
    }
  };
  
  // * Повернуться к цели
  _.aaTurnTowardTarget = function() {
    var e, target;
    try {
      target = this.AAEntity().getTarget();
      if (target == null) {
        return;
      }
      return this.turnTowardCharacter(target);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  // * Поиск пути (диагональное движение)
  _.aaFindDirectionToDiagonal = function(goalX, goalY) {
    var best, bestIndex, closedList, current, deltaX1, deltaX2, deltaY1, deltaY2, diag, direction, g1, g2, goaled, horz, i, index2, j, mapWidth, neighbor, node, nodeList, openList, pos1, pos2, searchLimit, start, vert, x1, x2, y1, y2;
    searchLimit = this.searchLimit();
    mapWidth = $gameMap.width();
    nodeList = [];
    openList = [];
    closedList = [];
    start = {};
    best = start;
    if (this.x === goalX && this.y === goalY) {
      return 0;
    }
    start.parent = null;
    start.x = this.x;
    start.y = this.y;
    start.g = 0;
    start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
    nodeList.push(start);
    openList.push(start.y * mapWidth + start.x);
    while (nodeList.length > 0) {
      bestIndex = 0;
      i = 0;
      while (i < nodeList.length) {
        if (nodeList[i].f < nodeList[bestIndex].f) {
          bestIndex = i;
        }
        i++;
      }
      current = nodeList[bestIndex];
      x1 = current.x;
      y1 = current.y;
      pos1 = y1 * mapWidth + x1;
      g1 = current.g;
      nodeList.splice(bestIndex, 1);
      openList.splice(openList.indexOf(pos1), 1);
      closedList.push(pos1);
      if (current.x === goalX && current.y === goalY) {
        best = current;
        goaled = true;
        break;
      }
      if (g1 >= searchLimit) {
        continue;
      }
      j = 0;
      while (j < 9) {
        direction = 1 + j;
        if (direction === 5) {
          j++;
          continue;
        }
        diag = Math.abs(direction % 2) === 1;
        [horz, vert] = AA.Utils.get8Dir(direction);
        if (diag && this.canPassDiagonally(x1, y1, horz, vert) && (this.canPass(x1, y1, horz) || this.canPass(x1, y1, vert))) {
          x2 = $gameMap.roundXWithDirection(x1, horz);
          y2 = $gameMap.roundYWithDirection(y1, vert);
        } else if (this.canPass(x1, y1, direction)) {
          x2 = $gameMap.roundXWithDirection(x1, direction);
          y2 = $gameMap.roundYWithDirection(y1, direction);
        } else {
          j++;
          continue;
        }
        pos2 = y2 * mapWidth + x2;
        if (closedList.contains(pos2)) {
          j++;
          continue;
        }
        g2 = g1 + 1;
        index2 = openList.indexOf(pos2);
        if (index2 < 0 || g2 < nodeList[index2].g) {
          if (index2 >= 0) {
            neighbor = nodeList[index2];
          } else {
            neighbor = {};
            nodeList.push(neighbor);
            openList.push(pos2);
          }
          neighbor.parent = current;
          neighbor.x = x2;
          neighbor.y = y2;
          neighbor.g = g2;
          neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
          if (!best || neighbor.f - neighbor.g < best.f - best.g) {
            best = neighbor;
          }
        }
        j++;
      }
    }
    node = best;
    while (node.parent && node.parent !== start) {
      node = node.parent;
    }
    deltaX1 = $gameMap.deltaX(node.x, start.x);
    deltaY1 = $gameMap.deltaY(node.y, start.y);
    if (deltaY1 > 0 && deltaX1 > 0) {
      return 3;
    } else if (deltaY1 > 0 && deltaX1 < 0) {
      return 1;
    } else if (deltaY1 < 0 && deltaX1 < 0) {
      return 7;
    } else if (deltaY1 < 0 && deltaX1 > 0) {
      return 9;
    }
    if (deltaY1 > 0) {
      return 2;
    } else if (deltaX1 < 0) {
      return 4;
    } else if (deltaX1 > 0) {
      return 6;
    } else if (deltaY1 < 0) {
      return 8;
    }
    deltaX2 = this.deltaXFrom(goalX);
    deltaY2 = this.deltaYFrom(goalY);
    if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
      if (deltaX2 > 0) {
        return 4;
      } else {
        return 6;
      }
    } else if (deltaY2 !== 0) {
      if (deltaY2 > 0) {
        return 8;
      } else {
        return 2;
      }
    }
    return 0;
  };
  
  // * Данный персонаж окружён препятствиями (нельзя идти ни по одному из 4х направлений)
  _.aaIsSurrounded = function() {
    if (this._aaNoPassFlag != null) {
      return this._aaNoPassFlag > 2;
    } else {
      return false;
    }
  };
  //?DYNAMIC
  _.aaUpdateNoPassFlag = function() {}; // * EMPTY
  _.aaRefreshNoPassFlag = function() {
    var noPass;
    noPass = 0;
    if (!this.canPass(this.x, this.y, 2)) {
      noPass += 1;
    }
    if (!this.canPass(this.x, this.y, 4)) {
      noPass += 1;
    }
    if (!this.canPass(this.x, this.y, 6)) {
      noPass += 1;
    }
    if (noPass < 3) {
      if (!this.canPass(this.x, this.y, 8)) {
        noPass += 1;
      }
    }
    this._aaNoPassFlag = noPass;
  };
  // * Проверка что клетки рядом с персонажем свободны
  // * Используется для умного просчёта движения к цели для АИ
  // * Чтобы не пытались искать путь, если всё занято вокруг персонажа цели
  _.aaInitNoPassFlagThread = function() {
    this._aaNoPassFlagThread = new KDCore.TimedUpdate(30, this.aaRefreshNoPassFlag.bind(this));
    this.aaUpdateNoPassFlag = function() {
      return this._aaNoPassFlagThread.update();
    };
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__isCollidedWithEvents, ALIAS__list, ALIAS__setPosition, ALIAS__updateSelfMovement, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    return this.aaInitExtraParams();
  };
  //@[ALIAS]
  ALIAS__isCollidedWithEvents = _.isCollidedWithEvents;
  _.isCollidedWithEvents = function(x, y) {
    var events;
    // * АИ не учитывает события, которые выше или ниже по приоритету
    if (this.isABS()) {
      // * Собираем события в точке X, Y, которые с Normal Priority
      events = $gameMap.eventsXyNt(x, y).filter(function(ev) {
        return ev.isNormalPriority();
      });
      if (events.length <= 0) {
        // * Если таковых нет, то проходим (ниже и выше не учитываем)
        return false;
      }
      return this.isNormalPriority(); // * Если есть, то TRUE, если это событие тоже Normal Priority
    } else {
      return ALIAS__isCollidedWithEvents.call(this, x, y);
    }
  };
  
  //@[ALIAS]
  ALIAS__updateSelfMovement = _.updateSelfMovement;
  _.updateSelfMovement = function() {
    if (this._moveType > 3) {
      return this.aaUpdateSelfMovementForAI();
    } else {
      return ALIAS__updateSelfMovement.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__setPosition = _.setPosition;
  _.setPosition = function() {
    ALIAS__setPosition.call(this, ...arguments);
    if (this.isABS()) {
      // * Если мы перемещаем событие, то обновляем его "дом" точку
      return this.aaStoreHomePoint();
    }
  };
  (function() {})();  // * Система анимации XAnima
  // -----------------------------------------------------------------------
  (function() {    // -----------------------------------------------------------------------

    // * Система AAEntity
    // -----------------------------------------------------------------------
    var ALIAS__clearPageSettings, ALIAS__setupPage;
    //@[ALIAS]
    ALIAS__setupPage = _.setupPage;
    _.setupPage = function() {
      ALIAS__setupPage.call(this);
      this.aaCheckABSEventState();
      this.aaCheckExtraParams();
    };
    //@[ALIAS]
    ALIAS__clearPageSettings = _.clearPageSettings;
    _.clearPageSettings = function() {
      ALIAS__clearPageSettings.call(this);
      if (this.isABS()) {
        return this.clearABS();
      }
    };
  })();
  // -----------------------------------------------------------------------

  //@[ALIAS]
  ALIAS__list = _.list;
  _.list = function() {
    var e, t;
    try {
      // * Вызов общего события, которое было bind к этому событию (SActions)
      if (this._aaExtraEventList != null) {
        t = this._aaExtraEventList;
        // * Один раз, поэтому зануляем
        this._aaExtraEventList = null;
        return [
          {
            // * Команда "Вызов Общего события" внутри этого события
            // * (Так можно использовать this. и есть _eventId)
            code: 117,
            indent: 0,
            parameters: [t]
          }
        ];
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return ALIAS__list.call(this);
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[EVENT]
  _.gev_onABSPaused = function() {
    var e;
    try {
      if (this.AALogic() == null) {
        return;
      }
      if (!this.AALogic().isFreeState()) {
        return this.AALogic().switchToFreeState();
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  (function() {    // * Система AAEntity
    // -----------------------------------------------------------------------
    // * Когда мы переключили страницу события, надо пересоздать Battler и активировать АБС
    _.aaIsShouldBeReActivated = function() {
      return this.isABS() && (this.AABattler() == null);
    };
    _.aaCheckABSEventState = function() {
      if (this.aaIsABSEventPage()) {
        //TODO: Проверить переключение с АБС на АБС событие
        return this._initMembersABS();
      } else {
        if (this.isABS()) {
          // * Если переключили страницу, но событие было АИ, то надо отключить
          this.clearABS();
        }
      }
    };
    _.aaIsABSEventPage = function() {
      var ABSComment, enemyId;
      if (this.page() == null) {
        return false;
      }
      // * Для сохранения производительности, сперва просто смотрим есть ли ABS комментарий
      ABSComment = KDCore.Utils.getEventCommentValue("ABS", this.list());
      if ((ABSComment != null) && (ABSComment.match(/<ABS:\s*\d+>/) != null)) {
        // * Дополнительная проверка, что указан правильный ID
        enemyId = AA.Utils.Parser.getABSEnemyId(ABSComment);
        if (enemyId > 0) {
          if (AA.Utils.Guard.isProperEnemyIdForABSEvent(enemyId)) {
            // * Данный объект хранится даже после переключения страницы на НЕ АБС
            this.aaEventSettings = new AA.AAEventSettingsParser(this.list());
            //console.info @aaEventSettings
            return true;
          } else {
            AA.w("Enemy ID " + enemyId + " not exists in DB or not have a name");
          }
        } else {
          AA.w("Can't read Enemy ID from <ABS> comment for event " + this.eventId());
        }
      }
      return false;
    };
    _._initMembersABS = function() {
      this.aaEntity = new AAEnemyEntity(this.eventId());
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Основная логика АБС
    // -----------------------------------------------------------------------
    var ALIAS__aaOnActionOnMe, ALIAS__aaOnDeath, ALIAS__aaOnDefeat, ALIAS__aaOnShatterEffectCreated, ALIAS__clearABS, ALIAS__erase, ALIAS__initABS, ALIAS__isActive, ALIAS_aaUpdateABS;
    // * Этот метод выполняется из отдельного потока для логики АИ
    //$[OUTER]
    _.aaUpdateAILogic = function() {
      var e;
      try {
        if (this.isActive()) {
          if (AA.isABSActive()) {
            return this.AALogic().update();
          }
        } else {
          return $gameTemp.aaClearAILogicThread(this.eventId());
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    //@[ALIAS]
    ALIAS__initABS = _.initABS;
    _.initABS = function() {
      ALIAS__initABS.call(this);
      AA.EV.subscribeFor("PauseABS", this.gev_onABSPaused.bind(this));
      this.aaStoreMoveData();
      this._aaLastMovingActionDelay = 0;
      $gameTemp.aaRegisterAILogicThread(this.eventId());
    };
    //@[ALIAS]
    ALIAS__clearABS = _.clearABS;
    _.clearABS = function() {
      ALIAS__clearABS.call(this);
      $gameTemp.aaClearAILogicThread(this.eventId());
    };
    //@[ALIAS]
    ALIAS__isActive = _.isActive;
    _.isActive = function() {
      return ALIAS__isActive.call(this) && !this._erased;
    };
    // * Этот метод работает только когда АБС активна
    //@[ALIAS]
    ALIAS_aaUpdateABS = _.aaUpdateABS;
    _.aaUpdateABS = function() {
      ALIAS_aaUpdateABS.call(this);
      this._aaUpdateDeadState();
    };
    //@[ALIAS]
    ALIAS__aaOnShatterEffectCreated = _.aaOnShatterEffectCreated;
    _.aaOnShatterEffectCreated = function() {
      ALIAS__aaOnShatterEffectCreated.call(this);
      if (!this.isABS()) {
        return;
      }
      this.aaOnDefeat();
    };
    //@[ALIAS]
    ALIAS__erase = _.erase;
    _.erase = function() {
      this._aaEraseAnimaXPartsForEvent();
      ALIAS__erase.call(this);
    };
    _._aaEraseAnimaXPartsForEvent = function() {
      var e, spr;
      try {
        if (Imported.PKD_AnimaX !== true) {
          return;
        }
        if (this.AASprite() == null) {
          return;
        }
        spr = this.AASprite();
        if (spr._animaXParts != null) {
          return spr._destroyAnimaXParts(); // * Если есть части
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    //@[ALIAS]
    ALIAS__aaOnDefeat = _.aaOnDefeat;
    _.aaOnDefeat = function() {
      ALIAS__aaOnDefeat.call(this);
      if (this.AAModel().lootDropOnDeath === 1) {
        this.aaExecuteEnemyLootVisualDrop();
      }
      this.aaOnDeath();
    };
    // * Данный метод работает только при PKD_ExtendedLoot
    _.aaExecuteEnemyLootVisualDrop = function() {
      var e, gold, goldItem, i, item, items, len;
      try {
        if (!Imported.PKD_ExtendedLoot) {
          return;
        }
        if (!KDCore.Utils.isSceneMap()) {
          return;
        }
        items = this.AABattler().makeDropItems();
        $gameTemp._pelLastGainEventId = this.eventId();
        if (items.length > 0) {
          for (i = 0, len = items.length; i < len; i++) {
            item = items[i];
            if (item == null) {
              continue;
            }
            //TODO: Переделать под новый метод в Extended Loot
            // * Используем другой метод, чтобы обойти, если опция VisualDrop выключена
            //$gameParty.pelMakeVisualDrop(item, 1)
            SceneManager._scene.pCreateVisualDropItem($gameTemp._pelLastGainEventId, item, 1);
          }
        }
        gold = this.AABattler().gold();
        if ($gameParty.hasGoldDouble()) {
          gold *= 2;
        }
        if (gold >= 1) {
          goldItem = $dataItems[PKD_ExtendedLoot.PP.goldItemId()];
          //$gameParty.pelMakeVisualDrop(goldItem, gold) if goldItem?
          SceneManager._scene.pCreateVisualDropItem($gameTemp._pelLastGainEventId, goldItem, gold);
        }
        // * Это обязательно, чтобы при подборе не повторился Visual Drop
        return $gameTemp._pelLastGainEventId = -1;
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    //@[ALIAS]
    ALIAS__aaOnDeath = _.aaOnDeath;
    _.aaOnDeath = function() {
      var model;
      ALIAS__aaOnDeath.call(this);
      if (Imported.PKD_AnimaX === true && this.isAnimX()) {
        this.clearXAnimParts();
      }
      model = this.AAModel();
      if (model.isHaveDeadSwitch()) {
        // * Включаем self.switch
        AA.SAaction.execute("ss_" + model.deadSwitch + "_true", this);
      } else {
        if (model.eraseOnDead === 1) {
          this.erase();
          // * Только Erase синхронизируется, onDeathAction нет в данном методе
          // * SA синхронизируются отдельно
          AANetworkManager.executeEraseOnDeadAAEvent(this.eventId());
        }
      }
      if (model.isHaveOnDeathAction()) {
        AA.SAaction.execute(model.onDeath, this);
      }
      if (model.isHaveOnDeathVariable()) {
        KDCore.Utils.addToVar(model.onDeathVar, 1);
      }
    };
    //@[ALIAS]
    //TODO: Что делать с xAnimaDead ???
    ALIAS__aaOnActionOnMe = _.aaOnActionOnMe;
    _.aaOnActionOnMe = function(action) {
      var result;
      ALIAS__aaOnActionOnMe.call(this, action);
      result = this.AABattler().result();
      if (result == null) {
        return;
      }
      //TODO: model paramter or skill parameter (shake str)
      //TODO: Agro system (like in AABS)
      //%[I] Система смены цели в зависимости от полученного урона
      if (result.isHit() && result.hpDamage > 0) {
        this.aaRequestShakeEffect();
        // * Если ещё живой, то будет onHit
        if (this.AABattler().isAlive()) {
          AA.SAaction.execute(this.AAModel().onHit, this);
        }
      }
      if (!this.AABattler().isAlive()) {
        this.aaOnKilledBy(action);
      }
    };
    _.aaOnKilledBy = function(action) {
      var e;
      try {
        if (action.isPlayerActionOwner() && this.AAModel().autoExp === 1) {
          // * Если Exp Pop Up должен появляться над "дающим" опыт врагом
          $gameTemp.__aaExpGiver = this;
          uAPI.gainExpForEnemyEv(this.eventId());
          // * Надо обнулять сразу
          return $gameTemp.__aaExpGiver = null;
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    _._aaUpdateDeadState = function() {
      if (this.isActive() && !this.AABattler().isAlive()) {
        // * Отключаем АБС для этого события
        this.stopABS();
        // * Если параметр включён, запускаем эффект
        if (this.AAModel().shatterEffect === 1) {
          this.aaRequestShatterEffect(); // * Иначе сразу
        } else {
          this.aaOnDefeat();
        }
      }
    };
    _._aaIsInBattleAnimaXState = function() {
      return this.AAEntity().inBattle();
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Дополнительные возможности АБС события
    // -----------------------------------------------------------------------
    // * Запускает общее события внутри данного события (т.е. внутри себя вызов общего)
    // * Это позволяет использовать this. и менять АБС параметры события
    _.aaStartCommonEvent = function(ceId) {
      var commonEvent, e;
      try {
        this._aaExtraEventList = null;
        if (ceId <= 0) {
          return;
        }
        //"Call outer CE ".p(ceId)
        commonEvent = $dataCommonEvents[ceId];
        if (commonEvent == null) {
          return;
        }
        this._aaExtraEventList = ceId;
        // * Переключаем напрямую, без метода start(), так как не нужен Lock
        this._starting = true;
      } catch (error) {
        e = error;
        AA.w(e);
      }
    };
    // * Было ли данное событие добалвено на карту динамически
    _.aaIsSpawned = function() {
      return false;
    };
  })();
  // -----------------------------------------------------------------------

  // * Для оптимизации игры, алгоритмы проверки окружён ли персонаж отключены на событии
  //$[OVER]
  _.aaInitNoPassFlagThread = function() {}; //*EMPTY
  
  //$[OVER]
  _.aaGetExtendedHitBoxes = function() {
    return this._aaExtendedHitBox;
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------
//TODO: СБРОС ЦЕЛИ
//TODO: ОФФСЕТ ДЛЯ ВЫБОРА
//TODO: МИНИ ХП БАР
// Также добавить управление ним во время игры (один из трёх типов)


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  _.AAModel = function() {
    return this.AAEntity().model();
  };
  // * Изменить параметр AAModel у данного события
  _.aaChangeModelParam = function(paramName, newValue) {
    var e, model;
    try {
      if (!String.any(paramName)) {
        return;
      }
      model = this.AAModel();
      if (model == null) {
        return;
      }
      //log = "Model param: " + paramName + " changed to " + newValue
      //log.p()
      return model[paramName] = newValue;
    } catch (error) {
      // * Надо может какой то метод что параметры были изменены?
      //TODO: some refresh or _convertParameters? on onParamsChanged?
      e = error;
      return AA.w(e);
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //TODO: Параметр, может ли враг двигаться диагонально

  // * Сохраняем базовые настройки движения события
  _.aaStoreMoveData = function() {
    var i, item, len, ref;
    // * Выполняется один раз, при первой инициализации
    if (this._storedMoveData != null) {
      return;
    }
    this._storedMoveData = {};
    ref = ["_moveSpeed", "_moveType", "_moveFrequency"];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      this._storedMoveData[item] = this[item];
    }
  };
  // * Восстанавливаем базоыве настройки движения события
  _.aaRestoreMoveData = function() {
    var i, item, len, ref;
    if (this._storedMoveData == null) {
      return;
    }
    ref = ["_moveSpeed", "_moveType", "_moveFrequency"];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      this[item] = this._storedMoveData[item];
    }
  };
  
  // * Восстановить базовую скорость движения события
  _.aaResetDefaultFreqAndSpeed = function() {
    var i, item, len, ref;
    if (this._storedMoveData == null) {
      return;
    }
    ref = ["_moveSpeed", "_moveFrequency"];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      this[item] = this._storedMoveData[item];
    }
  };
  // * Сохранить текущую координату как точка "дом"
  _.aaStoreHomePoint = function() {
    this.homePoint = {
      x: this.x,
      y: this.y
    };
  };
  _.aaResetHomePoint = function() {
    return this.homePoint = null;
  };
  
  // * AI Free State управляет этим процессом (начинает и завершает)
  _.aaSetMoveTypeReturnToHomePoint = function() {
    var e;
    try {
      if (this._moveType === 93) {
        return;
      }
      if (this.homePoint == null) {
        return;
      }
      return this._moveType = 93;
    } catch (error) {
      //returnMoveData[F, S]
      //TODO:
      e = error;
      return AA.w(e);
    }
  };
  _.aaSetMoveTypeApproachTarget = function() {
    var e, params;
    try {
      if (this._moveType === 91) {
        return;
      }
      // * Быстрая проверка, что есть цель
      if (!this.AAEntity().inBattle()) {
        return;
      }
      // * Approach target
      this._moveType = 91;
      // * Задержка перед следующим движением (для оптимизации)
      // * Используется, когда вокруг цели (игрока, персонажа) нет места
      this._aaLastMovingActionDelay = 0;
      params = this.AAModel().approachMoveData;
      if (this.distTo(this.AAEntity().getTarget()) >= params[0]) {
        this.setMoveFrequency(params[1]);
        return this.setMoveSpeed(params[2]);
      } else {
        return this.aaResetDefaultFreqAndSpeed();
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _.aaSetMoveTypeKeepBattleDistance = function() {
    var e, params;
    try {
      if (this._moveType === 92) {
        return;
      }
      if (!this.AAEntity().inBattle()) {
        return;
      }
      this._moveType = 92;
      params = this.AAModel().inBattleMoveData;
      this.setMoveFrequency(params[1]);
      this.setMoveSpeed(params[2]);
      this._aaMinPatrolDist = params[0];
      this._aaMaxPatrolDist = this.AAModel().viewRadius;
      return this._aaCanMakeRandomPatrolMove = params[3];
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _.aaSetMoveTypeStayStill = function() {
    var e;
    try {
      if (this._moveType === 94) {
        return;
      }
      if (!this.AAEntity().inBattle()) {
        return;
      }
      return this._moveType = 94;
    } catch (error) {
      //"STAY STILL".p()
      e = error;
      return AA.w(e);
    }
  };
  // * Все эти режимы движения, не имеют собственной логики окончания (выхода из режима)
  _.aaUpdateSelfMovementForAI = function() {
    if (!this._locked && !this.isMoving()) {
      switch (this._moveType) {
        case 91: // * Approach target
          this.aaMoveTypeToTarget();
          break;
        case 92:
          this.aaMoveTypeKeepDistance();
          break;
        case 93:
          //"HOME ".p()
          if (this.homePoint != null) {
            this.aaMoveTypeToPoint(this.homePoint);
          } else {
            this.aaRestoreMoveData();
          }
          break;
        case 94:
          // * СТОИТ НА МЕСТЕ И ВСЁ
          this.aaTurnTowardTarget();
          break;
      }
    }
  };
  // * Держать дистанцию боя
  // * Не подходить близко и не отходить далеко
  // * NOTHING
  // Просто стоим
  _.aaMoveTypeKeepDistance = function() {
    var distance, e, target;
    try {
      // * Если меньше 0, то ничего
      if (this._aaMinPatrolDist <= 0) {
        this.aaTurnTowardTarget();
        return;
      }
      target = this.AAEntity().getTarget();
      distance = this.distTo(target);
      if (distance >= this._aaMaxPatrolDist) {
        //"DIST > MAX".p()
        this.aaMoveTypeToTarget(target);
        return;
      }
      if (distance <= this._aaMinPatrolDist) {
        //"DIST <= MIN".p()
        this.moveAwayFromCharacter(target);
        this.aaTurnTowardTarget();
        return;
      }
      if (this._aaCanMakeRandomPatrolMove) {
        //"RAND MOVE".p()
        this.moveRandom();
        this.aaTurnTowardTarget();
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Дополнительные параметры, которые расширяют возможности взаимодействия событий в АБС
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  // * При попадании Projectile в событие
  _.aaOnVectorHit = function(skillId) {
    var action, e, i, len, ref;
    if (!this.aaIsHaveVectorHitAction(skillId)) {
      // * Если нет для skillId ничего, то смотрим общие - 0
      skillId = 0;
      if (!this.aaIsHaveVectorHitAction(0)) {
        return;
      }
    }
    try {
      ref = this._aaMapSkillVectorHitActions[skillId];
      for (i = 0, len = ref.length; i < len; i++) {
        action = ref[i];
        AA.SAaction.execute(action, this);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  // * Блокирует ли данное событие Visor
  _.aaIsBlockVision = function() {
    return this._aaNoVisionPass === true;
  };
  // * Есть ли действие при попадании конкретного Vector?
  _.aaIsHaveVectorHitAction = function(skillId) {
    var actions;
    if (this._aaMapSkillVectorHitActions == null) {
      return false;
    }
    actions = this._aaMapSkillVectorHitActions[skillId];
    return (actions != null) && !actions.isEmpty();
  };
  // * Если ли флаг блокировки спавна у этого события
  _.aaIsHaveSpawnBlockFlag = function() {
    return this._aaBlockSpawnRadius > 0;
  };
  // * Инициализация расширенных параметров события
  _.aaInitExtraParams = function() {
    this._aaMapSkillVectorBlockList = null;
    this._aaMapSkillVectorHitActions = null;
    this._aaMapSkillVectorOffset = 0;
    this._aaExtendedHitBox = null;
    this._aaNoVisionPass = false;
    this._aaBlockSpawnRadius = 0;
  };
  // * Проверка дополнительных параметров, которые могут касаться не только АА но и всех событий
  _.aaCheckExtraParams = function() {
    this.aaInitExtraParams();
    if (this.page() == null) {
      return;
    }
    this._aaExtractVectorOffsetParam();
    this._aaExtractVectorHitActions();
    this._aaExtractVectorBlockList();
    this._aaExtractExtendedHitBoxes();
    this._aaExtractNoVisionPass();
    this._aaExtractBlockSpawn();
  };
  // * Извлекает параметр смщенеия вектора для данного события
  // * Т.е. смещение начала графики, когда данное событие "выпускает" вектор из себя
  // * <vectorOffset:X>
  _._aaExtractVectorOffsetParam = function() {
    var e, param, svOffset;
    try {
      svOffset = KDCore.Utils.getEventCommentValue("vectorOffset", this.list());
      if (svOffset == null) {
        return;
      }
      param = AA.Utils.Parser.extractABSParameter(svOffset);
      if (param != null) {
        return this._aaMapSkillVectorOffset = param[1];
      }
    } catch (error) {
      //console.info(@_aaMapSkillVectorOffset)
      e = error;
      return AA.warning(e);
    }
  };
  // * Извлекает все onVectorHit действия
  // * Пример: <onVectorHit_307:ss_A_true>
  // * Можно 0 - тогда будет для всех навыков (для любого) или просто onVectorHit:SA>
  _._aaExtractVectorHitActions = function() {
    var action, actionData, args, e, i, len, onHitActions, skillId;
    try {
      onHitActions = KDCore.Utils.getEventCommentValueArray("onVectorHit", this.list());
      if (onHitActions.isEmpty()) {
        return;
      }
      this._aaMapSkillVectorHitActions = {};
      for (i = 0, len = onHitActions.length; i < len; i++) {
        action = onHitActions[i];
        try {
          actionData = AA.Utils.Parser.extractABSParameterAny(action);
          args = actionData[0].split("_");
          if (args.length > 1) {
            skillId = parseInt(args[1]);
          } else {
            skillId = 0; // * any
          }
          this._aaRegisterOnHitActionForSkill(skillId, actionData[1]);
        } catch (error) {
          e = error;
          AA.warning(e);
        }
      }
    } catch (error) {
      e = error;
      AA.warning(e);
    }
  };
  // * Регестрирует SAction для навыка skillId при OnVectorHit
  _._aaRegisterOnHitActionForSkill = function(skillId, actionString) {
    var e;
    try {
      if (this._aaMapSkillVectorHitActions[skillId] == null) {
        this._aaMapSkillVectorHitActions[skillId] = [];
      }
      this._aaMapSkillVectorHitActions[skillId].push(actionString);
    } catch (error) {
      e = error;
      AA.warning(e);
    }
  };
  // * Извлекает список ID навыков, которые блокирет данное событие
  // * <vectorBlock:no> - ничего не блокирует
  // * <vectorBlock:all> - всё блокирует (по умолчанию)
  // * <vectorBlock: 301, 302> - НЕ блокирует 301 и 302 навыки
  _._aaExtractVectorBlockList = function() {
    var e, param, vectorBlockList;
    try {
      vectorBlockList = KDCore.Utils.getEventCommentValue("vectorBlock", this.list());
      if (vectorBlockList == null) {
        return;
      }
      param = AA.Utils.Parser.extractABSParameterAny(vectorBlockList);
      if (param[1] === "no") {
        this._aaMapSkillVectorBlockList = [];
      } else if (param[1] === "all") {
        this._aaMapSkillVectorBlockList = null;
      } else {
        this._aaMapSkillVectorBlockList = AA.Utils.Parser.convertArrayFromParameter(param[1]);
      }
    } catch (error) {
      e = error;
      AA.warning(e);
    }
  };
  // * Расширенные границы коллизии события (учитывается только для АБС навыков)
  // * UP, RIGHT, DOWN, LEFT (по часовой)
  // * Пример: <extraHitBoxes:1,0,0,0> - расширение на 1 клетку вверх
  _._aaExtractExtendedHitBoxes = function() {
    var e, param, values;
    try {
      values = KDCore.Utils.getEventCommentValue("extraHitBoxes", this.list());
      if (values == null) {
        return;
      }
      param = AA.Utils.Parser.extractABSParameterAny(values);
      this._aaExtendedHitBox = AA.Utils.Parser.convertArrayFromParameter(param[1]);
    } catch (error) {
      e = error;
      AA.w(e);
      this._aaExtendedHitBox = null;
    }
  };
  // * Если есть этот комментарий, Visor АИ не может проходить через это событие
  // * <noVisionPass>
  //TODO: Добавить except ID событий (или врагов) как с vectorBlock
  //TODO: Т.е. только определённые враги могут видеть через этот объект
  _._aaExtractNoVisionPass = function() {
    var e, value;
    try {
      value = KDCore.Utils.getEventCommentValue("noVisionPass", this.list());
      // * Не важно какое значение, если есть комментарий, значит noVisionPass есть
      this._aaNoVisionPass = value != null;
    } catch (error) {
      e = error;
      AA.w(e);
      this._aaNoVisionPass = false;
    }
  };
  _._aaExtractBlockSpawn = function() {
    var e, value;
    try {
      value = KDCore.Utils.getEventCommentValue("disableSpawn", this.list());
      if (value == null) {
        return;
      }
      value = AA.Utils.Parser.extractABSParameterAny(value);
      if (value != null) {
        this._aaBlockSpawnRadius = parseInt(value[1]);
      }
      if (this._aaBlockSpawnRadius > 0) {
        // * Для производительности, устанавливаем флаг на карте, что существует blockSpawn
        $gameMap.aaRegisterBlockSpawnEventExist();
      }
    } catch (error) {
      e = error;
      AA.w(e);
      this._aaBlockSpawnRadius = 0;
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__aaFillNetworkDataObserver, ALIAS__aaUpdateForNetwork, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[ALIAS]
  ALIAS__aaUpdateForNetwork = _.aaUpdateForNetwork;
  _.aaUpdateForNetwork = function() {
    var ref;
    ALIAS__aaUpdateForNetwork.call(this);
    if (!ANGameManager.isMapMaster()) {
      return;
    }
    if ((ref = this.AABattler()) != null) {
      ref._updateDataObserver();
    }
  };
  
  //@[ALIAS]
  ALIAS__aaFillNetworkDataObserver = _.aaFillNetworkDataObserver;
  _.aaFillNetworkDataObserver = function() {
    ALIAS__aaFillNetworkDataObserver.call(this);
    // * Будем хранить точку "дома", чтобы АИ
    // мог вернуться домой, даже если
    // мастер карты был сменён в бою
    this.aaResetHomePoint();
    this.netDataObserver.addFields(this, ["homePoint"]);
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------
//TODO: Помимо обновления раз в 1 секундку
// * Сделать так что когда приходит какой-либо Action
// * на событие, то ещё раз сразу обновить DataObserver 


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__command126, ALIAS__command127, ALIAS__command128, _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  //TODO: Вынести это в отдельный плагин
  //TODO: change GOLD and visual notify (command125)

  // * Показывает Notify только когда игрок получает предмет именно через команду, а не
  // * через игровой процесс (смена экипировки и т.д.)

  //@[ALIAS]
  ALIAS__command126 = _.command126;
  _.command126 = function() {
    var r;
    r = ALIAS__command126.call(this, ...arguments);
    $gameParty.pOnSomeItemBeenGained();
    return r;
  };
  //@[ALIAS]
  ALIAS__command127 = _.command127;
  _.command127 = function() {
    var r;
    r = ALIAS__command127.call(this, ...arguments);
    $gameParty.pOnSomeItemBeenGained();
    return r;
  };
  //@[ALIAS]
  ALIAS__command128 = _.command128;
  _.command128 = function() {
    var r;
    r = ALIAS__command128.call(this, ...arguments);
    $gameParty.pOnSomeItemBeenGained();
    return r;
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  (function() {    //TODO: WIKI создать страничку

    // * Управление АБС событиями
    // -----------------------------------------------------------------------
    // * Изменить параметр АА события (врага)
    _.aaChangeAIParam = function(paramName, newValue) {
      var char, e;
      try {
        if (this.eventId() <= 0) {
          return;
        }
        char = $gameMap.event(this.eventId());
        if (char == null) {
          return;
        }
        if (!char.isABS()) {
          return;
        }
        return char.aaChangeModelParam(paramName, newValue);
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    // * Выполнить SAction
    _.aaExecuteSAction = function(action) {
      var char, e;
      try {
        if (this.eventId() >= 0) {
          char = $gameMap.event(this.eventId());
        }
        return AA.SAaction.execute(action, char);
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
    // * Получить опыт с данного события "врага"
    return _.aaGainExp = function() {
      var e;
      try {
        if (this.eventId() <= 0) {
          return;
        }
        uAPI.gainExpForEnemyEv(this.eventId());
      } catch (error) {
        e = error;
        AA.w(e);
      }
    };
  })();
  return;
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__refresh, ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function() {
    this.aaOnNewMapLoaded();
    ALIAS__setup.call(this, ...arguments);
  };
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    return this.initABSMembers();
  };
  
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshABSMembers();
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  // * Инициализация переменных ABS
  _.initABSMembers = function() {
    return this.aaMapAnimations = [];
  };
  // * Инициализация временных данных, когда переход на новую карту
  _.aaOnNewMapLoaded = function() {
    // * Ссылка на последнее событие, которое было динамически создано
    $gameTemp.aaLastSpawnedEvent = null;
    // * Для производительности, флаг что существует хоть один Spawn Block
    this._aaIsAnySpawnBlockEvent = false;
    // * Кэш точек карты для конкретного региона (для оптимизации)
    this._aaRegionPointsCache = {};
    // * В конце вызывается оригинальный метод, это важно
    this._aaGlobalSkillsCache = {};
  };
  // * Проверка АБС событий и активация по требованию
  _.refreshABSMembers = function() {
    var e, j, len, ref, results;
    ref = this.eventsAA();
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      e = ref[j];
      if (e.aaIsShouldBeReActivated()) {
        results.push(e.initABS());
      } else {
        results.push(void 0);
      }
    }
    return results;
  };
  // * Когда карта загружена, происходит активация ABS событий
  _.initABS = function() {
    var e, j, len, ref, results;
    ref = this.eventsAA();
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      e = ref[j];
      results.push(e.initABS());
    }
    return results;
  };
  // * Все ABS события на карте
  _.eventsAA = function() {
    return this.events().filter(function(e) {
      return e.isABS();
    });
  };
  // * ABS события в указанной точке
  _.eventsXyAA = function(x, y) {
    var e;
    try {
      return this.eventsXy(x, y).filter(function(e) {
        return e.isActive();
      });
    } catch (error) {
      e = error;
      AA.w(e);
      return [];
    }
  };
  // * ABS события в указанной точке (с учётом Extended Hit Box)
  _.eventsXyAAExt = function(x, y) {
    var e;
    try {
      return this.eventsXyExt(x, y).filter(function(e) {
        return e.isActive();
      });
    } catch (error) {
      e = error;
      AA.w(e);
      return [];
    }
  };
  // * События в указанной точке (с учётом Extended Hit Box)
  _.eventsXyExt = function(x, y) {
    var e;
    try {
      return this.events().filter(function(event) {
        return event.posExt(x, y);
      });
    } catch (error) {
      e = error;
      AA.w(e);
      return [];
    }
  };
  // * Возвращяет спрайтсет карты (!Надо проверять сцену сперва)
  _.spriteset = function() {
    return SceneManager._scene._spriteset;
  };
  _.aaIsMapAnimationRequested = function() {
    return this.aaMapAnimations.length > 0;
  };
  _.aaRequestMapAnimation = function(x, y, animationId) {
    if (animationId <= 0) {
      return;
    }
    this.aaMapAnimations.push({x, y, animationId});
  };
  // * Данный метод возвращает позиции с учётом расширенного HitBox
  _.aaGetExtendedPointsFor = function(char) {
    var d, e, extHitBoxes, i, j, k, l, m, n, positions, r, ref, ref1, ref2, ref3, u;
    try {
      positions = [
        {
          x: char.x,
          y: char.y
        }
      ];
      if (char.aaIsHaveExtendedHitBoxes()) {
        extHitBoxes = char.aaGetExtendedHitBoxes();
        l = extHitBoxes[3];
        r = extHitBoxes[1];
        u = extHitBoxes[0];
        d = extHitBoxes[2];
        if (r > 0) {
          for (i = j = 1, ref = r; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
            positions.push({
              x: char.x + i,
              y: char.y
            });
          }
        }
        if (l > 0) {
          for (i = k = 1, ref1 = l; (1 <= ref1 ? k <= ref1 : k >= ref1); i = 1 <= ref1 ? ++k : --k) {
            positions.push({
              x: char.x - i,
              y: char.y
            });
          }
        }
        if (u > 0) {
          for (i = m = 1, ref2 = u; (1 <= ref2 ? m <= ref2 : m >= ref2); i = 1 <= ref2 ? ++m : --m) {
            positions.push({
              x: char.x,
              y: char.y - i
            });
          }
        }
        if (d > 0) {
          for (i = n = 1, ref3 = d; (1 <= ref3 ? n <= ref3 : n >= ref3); i = 1 <= ref3 ? ++n : --n) {
            positions.push({
              x: char.x,
              y: char.y + i
            });
          }
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return positions;
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(mapId) {
    // * Храним все навыки на карте
    this._aaMapSkills = [];
    $gameTemp.aaProjYOff = $gameMap.tileWidth() * 0.25;
    ALIAS__setup.call(this, mapId);
  };
  _.aaMapSkills = function() {
    return this._aaMapSkills;
  };
  // * Инициализировать (создать объект) навык на карте
  _.startAASkill = function(aaSkill, subject, targetPoint) {
    var mapSkill;
    if (aaSkill == null) {
      return;
    }
    //TODO: Возможно не надо полный навык хранить, а только ID из базы
    mapSkill = new AASkill2MapAction(aaSkill, subject, targetPoint);
    AANetworkManager.startAASkillOnMap(aaSkill, subject, targetPoint, mapSkill.uniqueId);
    this._registerNewAASkill(mapSkill);
  };
  // * Добавить навык
  _._registerNewAASkill = function(skill) {
    var i, index, j, ref;
    index = 0;
    for (i = j = 0, ref = this._aaMapSkills.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      if (this._aaMapSkills[i] == null) {
        index = i;
        break;
      }
    }
    this._aaMapSkills[index] = skill;
    // * Запоминаем последний навык (если это сетевая игра и навык внешний)
    // * чтобы установить в него уникальный ID от сервера
    if (AA.Network.isNetworkGame()) {
      $gameTemp.__lastAAMapSkill = skill;
    }
    //"PROJECTILE REGISTRED ON MAP".p(index)
    if (KDCore.Utils.isSceneMap()) {
      $gameMap.spriteset().aaCreateNewMapSkill(index);
    }
  };
  // * Работа с глобальными навыками (см. uAPI.executeAASkillOnMap)
  _.aaRegisterGlobalSkill = function(uId, aaDummyChar) {
    return this._aaGlobalSkillsCache[uId] = aaDummyChar;
  };
  _.aaDisposeGlobalSkill = function(uId) {
    this._aaGlobalSkillsCache[uId] = null;
    return delete this._aaGlobalSkillsCache[uId];
  };
  _.aaGetGlobalSkill = function(uId) {
    return this._aaGlobalSkillsCache[uId];
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  // * Спавн врага в точке карты X, Y
  // * isForce - если true, то пропускаем любые проверки
  //%[Основной метод спавна врага на карте]
  _.aaSpawnEnemyInPoint = function(refEventId, x, y, isForce = false) {
    var e;
    try {
      if (isForce === true || this.aaIsMapPointIsValidForSpawn(x, y)) {
        this._aaExecuteSpawnInPoint(refEventId, x, y);
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  // * Спавн монстра (не безопасно вызывать этот метод сам по себе)
  _._aaExecuteSpawnInPoint = function(refEventId, x, y) {
    var e, refEvent;
    try {
      if (!DataManager.aaIsSpawnMapValid()) {
        return;
      }
      if (refEventId == null) {
        return;
      }
      if (refEventId <= 0) {
        return;
      }
      // * Проверка, что основа существует
      refEvent = $dataAASpawnMap.events[refEventId];
      if (refEvent == null) {
        return;
      }
      return $gameTemp.aaLastSpawnedEvent = new Game_AASpawnedEvent(refEventId, x, y);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _.aaIsMapPointIsValidForSpawn = function(x, y) {
    var e;
    try {
      if (x == null) {
        return false;
      }
      if (y == null) {
        return false;
      }
      // * Режим Force Spawn, без каких-либо проверок
      if ($gameTemp.aaIsForceSpawn === true) {
        $gameTemp.aaIsForceSpawn = false;
        return true;
      }
      if (!AA.PP.isCanSpawnAboveEvents()) {
        if (this.eventsXyNt(x, y).length > 0) {
          // * Что нет события другого в данном месте
          return false;
        }
      }
      if ($gamePlayer.pos(x, y)) {
        // * Нельзя на игроке спавнить
        return false;
      }
      if (this.aaIsSpawnOnMapPointIsBlocked(x, y)) {
        // * Не заблокированная зона
        return false;
      }
      // * Точка проходимая
      return this.isPassable(x, y);
    } catch (error) {
      e = error;
      AA.w(e);
      return false;
    }
  };
  _.aaSpawnEnemyInRegion = function(refEventId, regionId, isForce = false) {
    var point, x, y;
    // Получение случайной Valid точки в регионе
    point = this.aaGetRandomSpawnPointForRegion(regionId);
    if (point == null) {
      return;
    }
    ({x, y} = point);
    this.aaSpawnEnemyInPoint(refEventId, x, y, true);
  };
  // * Возвращает случайную (доступную) точку спавна в регионе
  _.aaGetRandomSpawnPointForRegion = function(regionId) {
    var validPoints;
    if (this._aaRegionPointsCache[regionId] == null) {
      this._aaCollectAllPointsForRegion(regionId);
    }
    validPoints = this._aaRegionPointsCache[regionId].filter((p) => {
      return this.aaIsMapPointIsValidForSpawn(p.x, p.y);
    });
    // * Если опция кэширования отключена, удаляем кэш
    if (!AA.PP.isSpawnRegionCacheAllowed()) {
      this._aaRegionPointsCache[regionId] = [];
    }
    return validPoints.sample();
  };
  // * Собираем все точки на карте соответствующего региона
  _._aaCollectAllPointsForRegion = function(regionId) {
    var i, j, ref, ref1, x, y;
    this._aaRegionPointsCache[regionId] = [];
    for (x = i = 0, ref = this.width(); (0 <= ref ? i < ref : i > ref); x = 0 <= ref ? ++i : --i) {
      for (y = j = 0, ref1 = this.height(); (0 <= ref1 ? j < ref1 : j > ref1); y = 0 <= ref1 ? ++j : --j) {
        if (this.regionId(x, y) === regionId) {
          this._aaRegionPointsCache[regionId].push({x, y});
        }
      }
    }
  };
  // * Точка вокруг точки (в радиусе), Valid точка
  // * Если не найдена, возвращает NULL
  _.aaGetRandomSpawnPointInRadius = function(x, y, radius) {
    var e, isPointFinded, point, tryCount;
    if ((radius == null) || radius <= 0) {
      return {x, y};
    }
    try {
      tryCount = radius * 2;
      isPointFinded = false;
      while (!isPointFinded) {
        if (tryCount <= 0) {
          break;
        }
        tryCount--;
        point = AA.Utils.Math.getPointInRadius(x, y, radius);
        isPointFinded = this.aaIsMapPointIsValidForSpawn(point.x, point.y);
      }
      if (isPointFinded === true) {
        return point;
      } else {
        return null;
      }
    } catch (error) {
      e = error;
      AA.w(e);
      return null;
    }
  };
  
  // * SPAWN BLOCK SYSTEM =========================================
  _.aaRegisterBlockSpawnEventExist = function() {
    return this._aaIsAnySpawnBlockEvent = true;
  };
  _.aaIsSpawnBlockEventRegistred = function() {
    return this._aaIsAnySpawnBlockEvent === true;
  };
  _.aaIsSpawnOnMapPointIsBlocked = function(x, y) {
    var ev, i, len, point, spawnBlockEvents;
    if (this.aaIsSpawnBlockEventRegistred()) {
      spawnBlockEvents = this.events().filter(function(ev) {
        return ev.aaIsHaveSpawnBlockFlag();
      });
      point = {x, y};
      for (i = 0, len = spawnBlockEvents.length; i < len; i++) {
        ev = spawnBlockEvents[i];
        if (ev == null) {
          continue;
        }
        if (ev.distTo(point) < ev._aaBlockSpawnRadius) {
          console.log("Block Event disable Spawn on point " + [x, y]);
          return true;
        }
      }
    }
    return false;
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addActor, ALIAS__gainItem, ALIAS__removeActor, ALIAS__setupStartingMembers, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //@[ALIAS]
  ALIAS__removeActor = _.removeActor;
  _.removeActor = function() {
    ALIAS__removeActor.call(this, ...arguments);
    if ($gameParty.leader() == null) {
      AA.System.checkABSPlayerExists();
    }
  };
  //@[ALIAS]
  ALIAS__addActor = _.addActor;
  _.addActor = function() {
    if (!AA.Network.isNetworkGame() && ($gameParty.leader() != null)) {
      AA.w("In Alpha ABS Z " + AA.Version / 100 + " you can't add more than one party member");
      return;
    }
    ALIAS__addActor.call(this, ...arguments);
    // * Если игрока не было, но появился
    if ($gameTemp._noABSPlayer === true && ($gameParty.leader() != null)) {
      AA.System.checkABSPlayerExists();
    }
  };
  //TODO: Пока только игрок может быть (АБС)
  //TODO: Добавить игнорирование членов группы с пустыми именами (частая ошибка новичков)
  //@[ALIAS]
  ALIAS__setupStartingMembers = _.setupStartingMembers;
  _.setupStartingMembers = function() {
    ALIAS__setupStartingMembers.call(this);
    if (this._actors.length > 0) {
      this._actors = [this._actors.first()];
    }
  };
  
  //@[ALIAS]
  ALIAS__gainItem = _.gainItem;
  _.gainItem = function(item, amount, includeEquip) {
    ALIAS__gainItem.call(this, item, amount, includeEquip);
    //TODO: Пока так, но вообще это будет отдельный плагин
    if (amount > 0 && (this.itemContainer(item) != null)) {
      $gameTemp._pLastItemGainedToParty = [item, amount];
    } else {
      $gameTemp._pLastItemGainedToParty = null;
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //TODO: POP UP!

  // * Дать опыт всей группе (с учётом опций (разделение, для всех))
  // * isVisible == true -> Показать PopUp
  _.aaGainExpForParty = function(value, isVisible = true) {
    var char, data, e, p;
    try {
      //TODO: Пока что группы нету, реализацию оставлю на потом
      /*
      Опции:
      1) Только игрок
      2) Вся группа - одинаково
      3) Вся группа - разделить
      4) Кто убил
      */
      this.leader().gainExp(value);
      // * Не показывать если 0 опыта
      if (value === 0) {
        return;
      }
      // * Не показывать, если флаг отключён
      if (!isVisible) {
        return;
      }
      //TODO: Вынести этот код (НИЖЕ) отдельно куда-нибудь
      p = AA.PP.getExpPopUpSettings();
      // * Не показывать, если параметр плагина отключён
      if (!p.active) {
        return;
      }
      if (p.aboveChar === false) {
        char = $gameTemp.__aaExpGiver;
      }
      if (char == null) {
        //TODO: Или кто-то из группы*
        char = $gamePlayer;
      }
      data = AADamagePopUpFactory.createExpPopUpData(value, char);
      if (data == null) {
        return;
      }
      if (p.bindToChar === true) {
        Sprite_AADamagePopUpItem.CreateOnCharacterBinded(char, data.settings, data.value);
      } else {
        Sprite_AADamagePopUpItem.CreateOnCharacter(char, data.settings, data.value);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  // * Когда игрок получил какой-либо предмет
  _.pOnSomeItemBeenGained = function() {
    var e;
    try {
      // * У Extended Loot свой метод, см. pelOnSomeItemBeenGained (3_EL_Compatibility.coffee)
      if (Imported.PKD_ExtendedLoot) {
        return;
      }
      return this.pOnItemBeenGainedProcess();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  // * Обработка полученного предмета
  _.pOnItemBeenGainedProcess = function() {
    if ($gameTemp._pLastItemGainedToParty == null) {
      return;
    }
    if ($gameTemp._pLastItemGainedToParty[0] == null) {
      return;
    }
    if ($gameTemp._pLastItemGainedToParty[1] <= 0) {
      return;
    }
    if (AA.PP.isAddNewItemOnPanelOnPickup()) {
      return this.aaAddGainedItemToPanel(...$gameTemp._pLastItemGainedToParty);
    }
  };
  _.aaAddGainedItemToPanel = function(item, count) {
    if (!AA.Utils.isAAObject(item)) {
      return;
    }
    // * Новый предмет (т.е. раньше не было)
    if (this.numItems(item) === count) {
      // * Тут надо использовать idA
      if (!$gamePlayer.aaSkillsSet.isHaveItemOnPanel(item.idA)) {
        // * Тут используется обычный ID (так как конвертируется в методе)
        uAPI.setItemToPanel(item.id);
      }
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__canMove, ALIAS__initMembers, ALIAS__moveStraight, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    //TODO: Возможно это скинется при загрузке игры
    AA.EV.subscribeFor("PauseABS", this.gev_onABSPaused.bind(this));
    AA.EV.subscribeFor("ABSPartyLeaderReady", this.initABS.bind(this));
    return this._initMembersABS();
  };
  // ======================================================================
  //TODO: Как определять?

  //TODO: TEST

  //@[ALIAS]
  ALIAS__canMove = _.canMove;
  _.canMove = function() {
    var canMove;
    canMove = ALIAS__canMove.call(this);
    if (canMove && this.isABS() && AA.isABSActive() && (this.AABattler() != null)) {
      return this.AABattler().canMove();
    } else {
      return canMove;
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (AA.isABSActive()) {
      return this._aaUpdatePlayerABS(sceneActive);
    }
  };
  //@[ALIAS]
  ALIAS__moveStraight = _.moveStraight;
  _.moveStraight = function() {
    ALIAS__moveStraight.call(this, ...arguments);
    $gameTemp.aaResetMapScrollOnMoving();
  };
  (function() {    // * Диагональное движение
    // -----------------------------------------------------------------------
    var ALIAS__executeMove, ALIAS__findDirectionTo, ALIAS__getInputDirection;
    //@[ALIAS]
    ALIAS__getInputDirection = _.getInputDirection;
    _.getInputDirection = function() {
      if (AA.Input.IsDiagonal === true) {
        return Input.dir8;
      } else {
        return ALIAS__getInputDirection.call(this);
      }
    };
    
    //@[ALIAS]
    ALIAS__executeMove = _.executeMove;
    _.executeMove = function(direction) {
      var horz, vert;
      if (AA.Input.IsDiagonal === true) {
        if (direction % 2 === 0) {
          return ALIAS__executeMove.call(this, direction);
        } else if (Math.abs(direction % 2) === 1) {
          [horz, vert] = AA.Utils.get8Dir(direction);
          return this.moveDiagonally(horz, vert);
        }
      } else {
        return ALIAS__executeMove.call(this, direction);
      }
    };
    
    //@[ALIAS]
    ALIAS__findDirectionTo = _.findDirectionTo;
    _.findDirectionTo = function(goalX, goalY) {
      if (AA.Input.IsDiagonal === true) {
        return this.aaFindDirectionToDiagonal(goalX, goalY);
      } else {
        return ALIAS__findDirectionTo.call(this, goalX, goalY);
      }
    };
  })();
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isABS, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  // * Доп. проверка
  //@[ALIAS]
  ALIAS__isABS = _.isABS;
  _.isABS = function() {
    return ALIAS__isABS.call(this) && ($gameParty.leader() != null);
  };
  // * Когда сцена карты останавливается (сменяется другой)
  _.aaOnMapSceneEnd = function() {
    if (this.isInSkillTargetingState()) {
      return this.onSkillTargetCancel();
    }
  };
  // * Можно ли управлять? (АБС элементы: навыки, атака и всё в этом роде)
  _.canBeControlled = function() {
    return this.isActive() && AA.isABSMap();
  };
  _.isInSkillTargetingState = function() {
    return this.aaState === 'skill';
  };
  // * Если ли у игрока АБС навык с ID
  _.aaIsHaveABSSkill = function(skillId) {
    return this.AABattler().getAASkills().getById(skillId) != null;
  };
  //TODO:?
  // * Проверка цели (см. Game_CharacterBase_AA)
  _.aaIsValidTargetToSet = function(target) {
    return true;
  };
  // * Когда игрок выбрал зону поражения навыка на карте (нажал левую кнопку мыши)
  _.onSkillTargetSelected = function() {
    var point, skill;
    //"SKILL ZONE SELECTED".p()
    //console.info $gameTemp._aaSkillSelectorTargets
    // * Проверка радиуса
    skill = this.activeAASkill();
    point = TouchInput.toMapPoint();
    if (AA.Utils.Math.getDistanceMapPlayerPoint(point) <= skill.range) {
      this.startPerformAASkill(point);
      // * Сбрасываем состояние
      this.onSkillTargetCancel();
    } else {
      AA.UI.shakeSkillImpactSelector();
    }
  };
  //TODO: shake sprite
  _.onSkillTargetCancel = function() {
    return this._resetAAState();
  };
  //TODO: Возможно эта реализация довольно затратная по производительности
  //TODO: Сделать параметр плагина - использовать боевую стойку или нет
  _._aaIsInBattleAnimaXState = function() {
    var myEnemies;
    if (!AA.isABSActive()) {
      return false;
    }
    myEnemies = AATargetsManager.getAllWhoHavePlayerAsTargetInRange(5);
    return myEnemies.length > 0;
  };
  //@[EVENT]
  _.gev_onABSPaused = function() {
    var e;
    try {
      // * Сбрасываем состояние (выбор навыка)
      return this._resetAAState();
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  (function() {    // * Основные (приватные) методы АБС
    // -----------------------------------------------------------------------
    var ALIAS__initABS;
    
    //TODO: Доделать поддержку техники
    // * Боты сейчас не учитывают isActive
    // * Надо там добавить isTagetValid
    //@[ALIAS]
    //ALIAS__isActive = _.isActive
    //_.isActive = ->
    //    ALIAS__isActive.call(@) && !@isInVehicle()

    //@[ALIAS]
    ALIAS__initABS = _.initABS;
    _.initABS = function() {
      ALIAS__initABS.call(this);
      this.aaRefreshABSSkillsForPanel();
    };
    _._initMembersABS = function() {
      this.aaEntity = new AAPlayerEntity();
      this.aaState = null; // * Свободное состояние (нулевое)
      this.aaSkillsSet = new AASkillsSet();
    };
    _._setAAStateToSelectSkillTarget = function() {
      // * Наверное должно быт в AAEntity!!! Так как у ботов тоже будет этот параметр
      this.aaState = 'skill';
      AA.EV.call("PlayerSkillSelector");
    };
    _._setAAStateToSmartSkillUse = function(skillId, point) {
      this.aaState = 'smartAttack';
      this._aaSmartSkillId = skillId;
      this._aaSmartPoint = point;
    };
    _._resetAAState = function() {
      this.aaState = null;
      AA.EV.call("PlayerSkillSelector");
    };
    _._aaUpdatePlayerABS = function(sceneActive) {
      if (sceneActive === true) {
        this._aaUpdateStates();
        return this._aaUpdatePlayerInput();
      }
    };
    _._aaUpdateStates = function() {
      switch (this.aaState) {
        case 'skill':
          // * Обновляем цели под кругом выбора
          return $gameTemp._aaSkillSelectorTargets = AATargetsManager.collectTargetsForPlayerSelector(this.activeAASkill());
        //? Не используется пока что
        // * Работает, но проблема что надо сбрасывать во многих случаях - путаница
        case 'smartAttack':
          if (!this.isMoving()) {
            if (AATargetsManager.isInSkillRange(this, this._aaSmartSkillId, this._aaSmartPoint)) {
              this._resetAAState();
              return this.aaTryPerformSkill(this._aaSmartSkillId);
            } else {
              return this.aaMoveTypeToPoint(this._aaSmartPoint);
            }
          }
          break;
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Методы ABS (Бой и состояния)
    // -----------------------------------------------------------------------
    var ALIAS__aaOnActionOnMe;
    // * Когда какое-либо действие было выполненно на мне
    //@[ALIAS]
    ALIAS__aaOnActionOnMe = _.aaOnActionOnMe;
    return _.aaOnActionOnMe = function(action) {
      ALIAS__aaOnActionOnMe.call(this, action);
      //TODO: На будущее: тут можно определить кто именно атаковал, так как action имеет packedSubject
      // * Сброс камеры (если есть опция)
      $gameTemp.aaResetMapScrollOnAction();
    };
  })();
  // * Переопределяем
  //$[OVER]
  _.aaGetExtendedHitBoxes = function() {
    if (this.isABS() && ($gameParty.leader() != null)) {
      return $gameParty.leader().aaGetExtendedHitBoxes();
    } else {
      return null;
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  // * Выполнить атаку первичным навыком (в первой ячеке E)
  _.aaPerformPlayerAttack01 = function(isSmart = false) {
    //"ATTACK ONLY 01".p()
    return this.aaPerformAttack(true, isSmart);
  };
  // * Выполнить атаку вторичным навыком (во второй ячейке Q)
  _.aaPerformPlayerAttack02 = function(isSmart = false) {
    //"ATTACK ONLY 02".p()
    return this.aaPerformAttack(false, isSmart);
  };
  _.aaPerformAttack = function(isPrimary = true, isSmart = false) {
    var skillId, symbol;
    if (!$gamePlayer.canBeControlled()) {
      return;
    }
    if (isPrimary) {
      symbol = AA.Input.primarySkillSymbol();
    } else {
      symbol = AA.Input.secondarySkillSymbol();
    }
    skillId = this.aaSkillsSet.getSkillForSymbol(symbol);
    if (skillId <= 0) {
      return;
    }
    this.aaTurnTowardTouchInput();
    if (isSmart) {
      this.aaPerformSmartSkillUse(skillId, TouchInput.toMapPoint());
    } else {
      this.aaTryPerformSkill(skillId);
    }
  };
  // * Выполнить "умную" атаку (либо использовать навык, либо подойти ближе)
  _.aaPerformSmartSkillUse = function(skillId, point) {
    var e;
    try {
      if (skillId <= 0) {
        return;
      }
      //@_setAAStateToSmartSkillUse(skillId, point)
      //? Не состоянием, а просто
      if (AATargetsManager.isInSkillRange(this, skillId, point)) {
        this.aaTryPerformSkill(skillId);
      } else {
        $gameTemp.setDestination(point.x, point.y);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  // * Главный метод по выполнению того или иного АБС навыка
  // * Навык должен быть у персонажа
  // * Чтобы выполнить навык, которого нет у персонажа, то можно поставить флаг forced = true
  _.aaTryPerformSkill = function(skillId, forced = false) {
    var e, skill;
    try {
      if (!AA.isABSActive()) {
        return;
      }
      if (skillId == null) {
        return;
      }
      if (skillId <= 0) {
        return;
      }
      // * Выполняем навык в любом случае (даже если нету или не готов)
      if (forced === true) {
        skill = AA.Utils.getAASkillObject(skillId);
        if (!AA.Utils.isAAObject(skill)) {
          // * Только АБС навык можно выполнить через этот метод
          skill = null;
        }
      } else {
        // * Иначе навык должен быть готов к использованию и выучен
        skill = this.AABattler().getUsableAASkills().find(function(s) {
          return s.idA === skillId;
        });
      }
      if (skill != null) {
        AA.UI.skillPerformResult(skillId, 1);
        //TODO: perform skill
        "PERFROM SKILL ".p(skillId);
        console.log(skill.name);
        //TODO: нормальный метод на баттлере (или персонаже)
        this.prepareAASkillToExecute(skill);
      } else {
        //TODO: Notify???
        AA.UI.skillPerformResult(skillId, 0);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  
  // * Подготовка навыка к выполнению (сюда передаётся базовый объект навыка)
  _.prepareAASkillToExecute = function(skill) {
    var point;
    console.log("Use skill " + skill.name);
    //TODO: А если предмет???
    //TODO: Анимация навыка атаки
    this.setActiveAASkill(skill.idA);
    skill = this.activeAASkill();
    // * Если навык работает по направлению точки (курсора)
    if (skill.isInPoint()) {
      // * Если надо выбирать зону, то выбор зоны
      if (skill.isNeedSelectZone()) {
        // * Сбор целей сразу в точке где сейчас курсор
        AATargetsManager.collectTargetsForPlayerSelector(this.activeAASkill());
        this._setAAStateToSelectSkillTarget();
      } else {
        point = TouchInput.toMapPoint();
        if (skill.isInstant() || skill.isInCertainPoint()) {
          // * Надо проверить находится ли точка в Range навыка
          if (AATargetsManager.isInSkillRange(this, this._activeAASkillId, point)) {
            this.startPerformAASkill(point);
          } else {
            // * NOTHING
            //TODO: Показать область range применения (моргнуть)
            //TODO: Написать Notify (small range)
            AA.UI.skillPerformResult(this._activeAASkillId, 0);
            this.setActiveAASkill(null);
          }
        } else {
          // * Направление по точке
          this.startPerformAASkill(point);
        }
      }
    } else {
      // * Передаём себя в качестве точки (direction == 0 - напрвление персонажа)
      this.startPerformAASkill(this.toPoint());
    }
  };
  // * Обновление навыков для панели задач (при смене лидера)
  // * Также выполняется начальная расстановка навыков
  _.aaRefreshABSSkillsForPanel = function() {
    var ref;
    if (this.AABattler() == null) {
      return;
    }
    if ((ref = this.aaSkillsSet) != null) {
      ref.setPlayerActorId();
    }
    AA.UI.refreshElement('skills');
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  // * Только атака по нажатию LMB или RMB в режиме поворота (Cntr зажата)
  //TODO: Plugin Parameter
  //TODO: Можно DYNAMIC сделать метод (т.е. если параметр отключён, занулить его)
  // см. AASystem -> applyParameters метод (в нём можно занулять)
  _.aaIsStaticAttackInRotation = function() {
    return this.aaInRotation === true && AA.Input.IsStaticAttackWhenRotating === true;
  };
  _._aaUpdatePlayerInput = function() {
    var e;
    if (!$gamePlayer.canBeControlled()) {
      return;
    }
    try {
      this._aaUpdateInput_Rotation();
    } catch (error) {
      //TODO: Action Keys
      //@_aaUpdateInput_ActionKeys()
      e = error;
      AA.w(e);
    }
  };
  _._aaUpdateInput_Rotation = function() {
    // * Чтобы не поворачивался во время анимации, проверяем и canMove()
    this.aaInRotation = this.canMove() && Input.isPressed(AA.IKey.ROT);
    if (this.aaInRotation) {
      this.turnTowardCharacter(TouchInput.toMapPoint());
    }
  };
  _._aaUpdateInput_ActionKeys = function() {
    if (Input.isTriggered(AA.IKey.REL)) {
      return;
    }
    //TODO: reload firearm
    if (Input.isTriggered(AA.IKey.CMD)) {

    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------
//TODO: AI command menu


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_System.prototype;
  (function() {    // * Пользовательские настройки интерфейса
    // -----------------------------------------------------------------------
    _.aaInitUserUISettings = function() {
      return this._aaUserUiSettings = new AAUserUISettings();
    };
    _.aaGetUserUISettings = function() {
      if (this._aaUserUiSettings == null) {
        this.aaInitUserUISettings();
      }
      return this._aaUserUiSettings;
    };
  })();
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Temp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setDestination, _;
  //@[DEFINES]
  _ = Game_Temp.prototype;
  //@[ALIAS]
  ALIAS__setDestination = _.setDestination;
  _.setDestination = function() {
    ALIAS__setDestination.call(this, ...arguments);
    // * Восстановить камеру при движении (если опция)
    this.aaResetMapScrollOnMoving();
  };
})();

// ■ END Game_Temp.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Temp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Temp.prototype;
  (function() {    // * АИ обновление
    // -----------------------------------------------------------------------
    _._aaInitAILogicThreads = function() {
      if (this.__aaAILogicThreads == null) {
        return this.__aaAILogicThreads = {};
      }
    };
    _.aaRegisterAILogicThread = function(eventId) {
      var thread;
      //"THREAD REGISTERED FOR".p(eventId)
      this._aaInitAILogicThreads();
      thread = setInterval((function() {
        var ev;
        if (!AA.isABSMap()) {
          return;
        }
        ev = $gameMap.event(eventId);
        if (ev != null) {
          return ev.aaUpdateAILogic();
        } else {
          return $gameTemp.aaClearAILogicThread(eventId);
        }
      }), 100);
      this.__aaAILogicThreads[eventId] = thread;
    };
    _.aaClearAILogicThread = function(eventId) {
      var thread;
      this._aaInitAILogicThreads();
      thread = this.__aaAILogicThreads[eventId];
      if (thread != null) {
        clearInterval(thread);
      }
      this.__aaAILogicThreads[eventId] = null;
    };
    return _.aaClearAllAILogicThreads = function() {
      var key, ref, value;
      if (this.__aaAILogicThreads == null) {
        return;
      }
      ref = this.__aaAILogicThreads;
      for (key in ref) {
        value = ref[key];
        this.aaClearAILogicThread(key);
      }
    };
  })();
  (function() {    // * Камера
    // -----------------------------------------------------------------------
    _.aaSetMapScrolled = function(_aaIsScrollBeenApplied) {
      this._aaIsScrollBeenApplied = _aaIsScrollBeenApplied;
    };
    _.aaIsMapScrolled = function() {
      return this._aaIsScrollBeenApplied === true;
    };
    _.aaResetMapScrollOnAction = function() {
      // * Сброс камеры (если есть опция) при действии
      if ($gameTemp.aaIsMapScrolled() && AA.PP.getMapScrollingSettings().resetOnAction === true) {
        uAPI.resetMapScroll();
      }
    };
    return _.aaResetMapScrollOnMoving = function() {
      // * Восстановить камеру при движении (если опция)
      if (this.aaIsMapScrolled() && AA.PP.getMapScrollingSettings().resetOnMove === true) {
        uAPI.resetMapScroll();
      }
    };
  })();
})();

// ■ END Game_Temp.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Troop.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //TODO: НЕ, лучше не трогать Game_Troop, так как у нас есть стандартный бой тоже!!!

  // * Через класс Game_Troop мы будем обращаться ко всем АБС врагам (АИ) на карте

  //@[DEFINES]
  _ = Game_Troop.prototype;
})();

// ■ END Game_Troop.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {
  var GaugeController;
  // * Общий контроллер для Sprite_UIGauge (HP, MP, TP, ...)
  //?rev 03.07.21
  GaugeController = class GaugeController extends AA.UIElementController {
    constructor(gaugeSprite) {
      super();
      this.gaugeSprite = gaugeSprite;
    }

    
      // * source - Game_Battler
    // * valueFieldName - название поля (hp)
    //$[OVER]
    setup(source, valueFieldName, maxValueFieldName) {
      this.source = source;
      this.valueFieldName = valueFieldName;
      this.maxValueFieldName = maxValueFieldName;
      this.value = 0;
      this.max = 0;
      this.createThread(10, 4);
    }

    
      // * 0 - value (100), 1 - % (100%), 2 - full (100 / 100)
    setValueTextType(valueTextType) {
      switch (valueTextType) {
        case 1:
          this.getTypedText = this.getValuePercentText;
          break;
        case 2:
          this.getTypedText = this.getValueAndMaxText;
          break;
        default:
          this.getTypedText = this.getValueText;
      }
    }

    refreshGauge() {
      var e;
      if (this.gaugeSprite == null) {
        return;
      }
      try {
        this._refreshValues();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        // * Останавливаем работу метода
        this.refreshGauge = function() {};
      }
    }

    //?DYNAMIC
    // * Этот метод используется чтобы получить текст исходя из настроек контроллера
    // * По стандарту - обычное значение
    getTypedText() {
      return this.getValueText();
    }

    getValueText() {
      return this.value;
    }

    getValueAndMaxText() {
      return this.value + " / " + this.max;
    }

    getValuePercentText() {
      return Math.round((this.value / this.max) * 100) + '%';
    }

  };
  AA.link(GaugeController);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.GaugeController.prototype;
  //$[OVER]
  _._refresh = function() {
    var sourceMaxValue, sourceValue;
    sourceValue = this.source[this.valueFieldName];
    sourceMaxValue = this.source[this.maxValueFieldName];
    // * Перерисовываем только если значния изменились
    if (this.value !== sourceValue || this.max !== sourceMaxValue) {
      this.value = sourceValue;
      this.max = sourceMaxValue;
      this.refreshGauge();
    }
  };
  _._refreshValues = function() {
    this.gaugeSprite.drawGauge(this.value / this.max);
    this.gaugeSprite.drawText(this.getTypedText());
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Вспомогательные функции проверки данных и настроек АБС
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ GUARD.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
AA.Utils.Guard = function() {};

(function() {
  var _;
  //@[DEFINES]
  _ = AA.Utils.Guard;
  // * Этот метод проверит, можно ли создать АБС событие с этимм врагом из БД
  _.isProperEnemyIdForABSEvent = function(enemyId) {
    return ($dataEnemies[enemyId] != null) && String.any($dataEnemies[enemyId].name);
  };
})();

// ■ END GUARD.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = ImageManager;
  _.loadAA = function(filename) {
    return this.loadBitmap('img/Alpha/', filename);
  };
  _.loadAnimaX = function(filename) {
    return this.loadBitmap('img/charactersAA/', filename);
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MATH.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Вспомогательные функции математических вычислений
AA.Utils.Math = function() {};

(function() {
  var AP, _;
  //@[DEFINES]
  _ = AA.Utils.Math;
  AP = KDCore.Point;
  _.moveTo = function(p1, p2, step) {
    var e, fx, fy, rotated;
    try {
      rotated = _.rotateTo(new AP(0, step), _.angle(p1, p2));
      fx = fy = 0;
      if (p2.y < p1.y) {
        fy = p1.y - rotated.y;
      } else {
        fy = p1.y + rotated.y;
      }
      if (p2.x < p1.x) {
        fx = p1.x + rotated.x;
      } else {
        fx = p1.x - rotated.x;
      }
      return new AP(fx, fy);
    } catch (error) {
      e = error;
      KDCore.warning('Utils.Math.moveTo', e);
      return AP.Empty;
    }
  };
  _.rotateTo = function(p1, angle) {
    var e, fx, fy;
    try {
      fx = p1.x * Math.cos(angle) - p1.y * Math.sin(angle);
      fy = p1.y * Math.cos(angle) + p1.x * Math.sin(angle);
      return new AP(fx, fy);
    } catch (error) {
      e = error;
      KDCore.warning('Utils.Math.rotateTo', e);
      return AP.Empty;
    }
  };
  _.angle = function(p1, p2) {
    var d, e, fx, fy;
    try {
      d = _.getPointDistance(p1, p2);
      fx = Math.abs(p2.x - p1.x);
      fy = Math.abs(p2.y - p1.y);
      if (d === 0 || fx === 0 || fy === 0) {
        return 0;
      }
      return Math.acos((fy * fy + d * d - fx * fx) / (2 * fy * d));
    } catch (error) {
      e = error;
      KDCore.warning('Utils.Math.angle', e);
      return 0;
    }
  };
  _.getPointDistance = function(p1, p2) {
    var e;
    try {
      return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    } catch (error) {
      e = error;
      KDCore.warning('Utils.Math.getPointDistance', e);
      return 0;
    }
  };
  _.inRect = function(p1, pixiRect) {
    var e;
    try {
      return pixiRect.contains(p1.x, p1.y);
    } catch (error) {
      e = error;
      KDCore.warning('Utils.Math.inRect', e);
      return false;
    }
  };
  // * Алтернативный метод, расчитаный на более быстрое вычисление (без создания Point)
  // * Используется в проверке коллизий Map AA Skills Projectiles
  _.getXYDistance = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  };
  // * Получить дистанцию между игроком и точкой (в масштабах карты)
  _.getDistanceMapPlayerPoint = function(point) {
    var e;
    try {
      return $gameMap.distance($gamePlayer.x, $gamePlayer.y, point.x, point.y);
    } catch (error) {
      e = error;
      AA.warning(e);
      return 0;
    }
  };
  _.getProjectilePointByDirection = function(startPoint, d) {
    var diagTable, e, horVer, px, py, x, y;
    try {
      //"START POINT".p()
      //console.info(startPoint)
      ({x, y} = startPoint);
      //"FACE DIRECTION".p()
      // * Диагональное направление 8
      if ([1, 3, 7, 9].contains(d)) {
        diagTable = {
          1: [4, 2],
          3: [6, 2],
          7: [4, 8],
          9: [6, 8]
        };
        horVer = diagTable[d];
        px = $gameMap.roundXWithDirection(x, horVer[0]);
        py = $gameMap.roundYWithDirection(y, horVer[1]);
      } else {
        // * Обычное направление 4
        px = $gameMap.xWithDirection(x, d);
        py = $gameMap.yWithDirection(y, d);
      }
      return new KDCore.Point(px, py);
    } catch (error) {
      e = error;
      return KDCore.Point.Empty;
    }
  };
  _.getPointInRadius = function(x, y, radius) {
    var angle, e, newX, newY;
    try {
      if (radius == null) {
        return AP.Empty;
      }
      if (radius <= 0) {
        return new AP(x, y);
      }
      angle = Math.random() * 2 * Math.PI;
      radius = Math.randomInt(radius - 1) + 1;
      newX = Math.round(radius * Math.cos(angle));
      newY = Math.round(radius * Math.sin(angle));
      return new AP(x + newX, y + newY);
    } catch (error) {
      e = error;
      KDCore.warning('Utils.Math.getPointInRadius', e);
      return AP.Empty;
    }
  };
})();

// ■ END MATH.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс которые работает с параметрами плагина
(function() {
  var ParamsManager;
  ParamsManager = class ParamsManager extends KDCore.ParamLoader {
    constructor() {
      super("AABSZ");
      this._prepareParameters();
      return;
    }

    // * Данный метод надо вызывать когда игра уже загружена (доступны $gameX объекты)
    applyParameters() {
      if (this.getMapScrollingSettings().isEnabled === false) {
        // * Отключение Scroll камеры, если не задан параметр
        uAPI.disableMapScroll();
      }
    }

    // * ABS SYSETM
    // -----------------------------------------------------------------------
    getCollisionPreccissionLevel() {
      return this.getParam("colPrecissionLevel", 90);
    }

    fonts() {
      return this.getParam("fonts", []);
    }

    isGlobalUserUISettings() {
      return this.getParam("isSaveUIEditsGlobal", false);
    }

    uiData(tag, arg) {
      var method;
      // * Поиск соответсвующих настроек по тэгу элемента
      method = "_getDefaultVisualFor_" + tag;
      if (this[method] != null) {
        return this[method](arg);
      }
      return null;
    }

    // * POP UP
    // -----------------------------------------------------------------------
    isPopUpIsActive() {
      return this.getParam("isShowPopUp", true);
    }

    getTextForPopUpMiss() {
      return this.getParam("popUpTextForMiss", "Miss");
    }

    getExpPopUpSettings() {
      return this.getParam("popUpExpSettings", {
        active: true,
        textFormat: "+%1 exp",
        styleId: "Experience",
        aboveChar: false,
        bindToChar: false
      });
    }

    //TODO: Всплывающий урон вынести в отдельный плагин
    getPopUpDamageSettings(id) {
      var data, settings;
      settings = this.getParam("popUpDamageTable", []);
      data = settings.getById(id);
      if (data != null) {
        return data;
      } else {
        return {
          id: "default",
          randDX: 15,
          randDY: 10,
          stayTime: 12,
          noFlyUp: false,
          noFadeOut: false,
          changeFontSize: 22,
          text: {
            visible: true,
            size: {
              w: 0,
              h: 0 // * not used
            },
            margins: {
              x: 0,
              y: 0
            },
            alignment: "center",
            outline: {
              color: null,
              width: 2
            },
            font: {
              face: "AABS_3",
              size: 18,
              italic: false
            },
            textColor: "#E6E6E6".toCss()
          },
          image: null
        };
      }
    }

    // * BUFFS AND STATES
    // -----------------------------------------------------------------------
    getIsBuffsVisible() {
      return this.getParam("isShowBuffsOnUI", true);
    }

    getIsStatesVisible() {
      return this.getParam("isShowStatsOnUI", true);
    }

    getUIActorBuffsIconsSet() {
      return this.getParam("buffsIconsPositions", [
        {
          x: 4,
          y: 4
        },
        {
          x: 42,
          y: 4
        },
        {
          x: 80,
          y: 4
        },
        {
          x: 118,
          y: 4
        }
      ]);
    }

    getUIActorStatesIconsSet() {
      return this.getParam("statesIconsPositions", [
        {
          x: 4,
          y: 40
        },
        {
          x: 42,
          y: 40
        },
        {
          x: 80,
          y: 40
        },
        {
          x: 118,
          y: 40
        }
      ]);
    }

    //TODO: Нормальное отображение в редакторе и можно переходить к сайту и канетели прочей

      // * Игрок и партия
    // -----------------------------------------------------------------------
    // * Тряска экрана когда игрок получил урон
    isShakeScreenWhenPlayerGetDamage() {
      return this.getParam("isShakeScreenWhenPlayerGetDamage", true);
    }

    // * Враги
    // -----------------------------------------------------------------------
    getSpawnMapId() {
      return this.getParam("enemies_spawn_mapId", 0);
    }

    isCanSpawnAboveEvents() {
      return this.getParam("enemies_spawn_aboveEvents", false);
    }

    isSpawnRegionCacheAllowed() {
      return this.getParam("enemies_spawn_cacheAllowed", true);
    }

    //getMapEncounterSpawnMode: -> #TODO:
    // * Never (using as default battle system)
    // * Only if ABS is ON
    // * Always ABS enemies
    //TODO: Map Encounters - отдельный пласт

      // * Глобальные непроходимые участки карты для визоров
    getVisionRestrictedRegions() {
      return this.getParam("enemies_noPassVision", []);
    }

    getVisionRestrictedTerrains() {
      return this.getParam("enemies_noPassVision2", []);
    }

    // * Карта
    // -----------------------------------------------------------------------

      // * Глобальные непроходимые участки карты для Projectile
    getProjectileRestrictedRegions() {
      return this.getParam("map_noProjectilePass", []);
    }

    getProjectileRestrictedTerrains() {
      return this.getParam("map_noProjectilePass2", []);
    }

    // * Настройки для скролла карты курсором
    getMapScrollingSettings() {
      return this.getParam("mapScrolling", {
        isEnabled: false
      });
    }

    getMiniHpGaugeSettings() {
      return this.getParam("miniHpGaugeSetings", {
        active: true,
        showOnlyOnHover: true,
        showOnDamage: true
      });
    }

    // * Панель навыков
    // -----------------------------------------------------------------------

      // * Добавлять автоматически новый навык на панель навыков при изучении навыка
    isAddNewSkillsOnPanelOnLearning() {
      return this.getParam("isAddNewSkillsOnPanelOnLearning", true);
    }

    // * Добавлять автоматически АБС предметы на панель навыков
    isAddNewItemOnPanelOnPickup() {
      return this.getParam("isAddNewItemOnPanelOnPickup", true);
    }

    // * Удалять предмет из панели навыков, если количество == 0
    isRemoveItemIfZeroCount() {
      return this.getParam("isRemoveItemFromPanelIfZeroCount", false);
    }

    // * Эффект подсветки слотов навыков на панели
    isUseOutlineEffect() {
      return this.getParam("isUseOutlineEffect", true);
    }

    getSkillPanelItemVisualSettings() { //TODO:
      return {};
    }

    
      // * Все слоты панели навыков
    getUISkillsItems() {
      return this._skillPanelSlots || [];
    }

    // * Настройки слота навыка по его символу
    getUISkillItemSlotSettings(symbol) {
      var items, settings;
      items = this.getUISkillsItems();
      settings = items.getByField('symbol', symbol);
      return settings;
    }

  };
  AA.link(ParamsManager);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.ParamsManager.prototype;
  // * Данный метод вызывается при старте системы, $game объекты ещё не доступны
  // * Например для конвертирования каких-либо значений
  _._prepareParameters = function() {
    // * Если эффект отключён, заменяем класс на класс заглушку
    if (this.isUseOutlineEffect() === false) {
      AA.Sprite_SkillPanelOutline = AA.Sprite_SkillPanelOutlineDummy;
    }
    // * Собираем все слоты в один массив
    this._collectAllSkillSlots();
  };
  _._collectAllSkillSlots = function() {
    var primary, secondary, slots;
    primary = this._getPrimarySkillSlot();
    secondary = this._getSecondarySkillSlot();
    slots = this._getSkillSlots();
    this._skillPanelSlots = [primary, secondary, ...slots];
  };
  _._getPrimarySkillSlot = function() {
    return this.getParam("primaryAttackSlot", {
      position: {
        x: 218,
        y: 583
      },
      symbol: "E"
    });
  };
  _._getSecondarySkillSlot = function() {
    return this.getParam("secondaryAttackSlot", {
      position: {
        x: 255,
        y: 583
      },
      symbol: "Q"
    });
  };
  _._getSkillSlots = function() {
    return this.getParam("allSkillSlots", [
      {
        position: {
          x: 302,
          y: 583
        },
        symbol: "1"
      },
      {
        position: {
          x: 339,
          y: 583
        },
        symbol: "2"
      },
      {
        position: {
          x: 376,
          y: 583
        },
        symbol: "3"
      },
      {
        position: {
          x: 413,
          y: 583
        },
        symbol: "4"
      },
      {
        position: {
          x: 450,
          y: 583
        },
        symbol: "5"
      },
      {
        position: {
          x: 487,
          y: 583
        },
        symbol: "6"
      },
      {
        position: {
          x: 524,
          y: 583
        },
        symbol: "7"
      },
      {
        position: {
          x: 561,
          y: 583
        },
        symbol: "8"
      }
    ]);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ParamsManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//$[ENCODE]
(function() {
  var _;
  // * Базовые настройки элементов интерфейса
  // * Эти настройки используется BASIC версия плагина

  //@[DEFINES]
  _ = AA.ParamsManager.prototype;
  // * HP
  _._getDefaultVisualFor_hpGauge = function() {
    return {
      visible: true,
      position: {
        x: 304,
        y: 560
      },
      label: "Player_HPGaugeLabel",
      labelMargins: {
        x: -33,
        y: 5
      },
      isCanBeEdited: true,
      isHideWithMessage: true,
      text: {
        visible: true,
        size: {
          w: 100,
          h: 20
        },
        alignment: "left",
        font: {
          face: "AABS_0",
          size: 13,
          italic: false
        },
        margins: {
          x: 10,
          y: 0
        },
        outline: {
          color: null,
          width: 2
        },
        textColor: "#edead8".toCss()
      },
      gauge: {
        visible: true,
        fill: "Player_HPGauge",
        foreground: "",
        mask: "",
        backColor: "#000000".toCss(),
        backOpacity: 160,
        vertical: false
      }
    };
  };
  // * MP
  _._getDefaultVisualFor_mpGauge = function() {
    return {
      visible: true,
      position: {
        x: 454,
        y: 560
      },
      label: "Player_MPGaugeLabel",
      labelMargins: {
        x: -37,
        y: 5
      },
      isCanBeEdited: true,
      isHideWithMessage: true,
      text: {
        visible: true,
        size: {
          w: 100,
          h: 20
        },
        alignment: "left",
        font: {
          face: "AABS_0",
          size: 13,
          italic: false
        },
        margins: {
          x: 10,
          y: 0
        },
        outline: {
          color: null,
          width: 2
        },
        textColor: "#edead8".toCss()
      },
      gauge: {
        visible: true,
        fill: "Player_MPGauge",
        foreground: "",
        mask: "",
        backColor: "#000000".toCss(),
        backOpacity: 160,
        vertical: false
      }
    };
  };
  // * TP
  _._getDefaultVisualFor_tpGauge = function() {
    return {
      visible: false,
      position: {
        x: 454,
        y: 560
      },
      label: "Player_TPGaugeLabel",
      labelMargins: {
        x: -37,
        y: 5
      },
      isCanBeEdited: true,
      isHideWithMessage: true,
      text: {
        visible: true,
        size: {
          w: 100,
          h: 20
        },
        alignment: "left",
        font: {
          face: "AABS_0",
          size: 13,
          italic: false
        },
        margins: {
          x: 10,
          y: 0
        },
        outline: {
          color: null,
          width: 2
        },
        textColor: "#edead8".toCss()
      },
      gauge: {
        visible: true,
        fill: "Player_TPGauge",
        foreground: "",
        mask: "",
        backColor: "#000000".toCss(),
        backOpacity: 160,
        vertical: false
      }
    };
  };
  // * ENEMY MINI HP
  _._getDefaultVisualFor_enemyMiniHp = function() {
    return {
      visible: true,
      position: {
        x: -19,
        y: -56
      },
      label: null,
      labelMargins: {
        x: 0,
        y: 0
      },
      // * TEXT не используется в этой реализации
      text: {
        visible: false,
        size: {
          w: 100,
          h: 20
        },
        alignment: "left",
        font: {
          face: "AABS_0",
          size: 13,
          italic: false
        },
        margins: {
          x: 10,
          y: 0
        },
        outline: {
          color: null,
          width: 2
        },
        textColor: "#edead8".toCss()
      },
      gauge: {
        visible: true,
        fill: "Event_HPGauge2",
        foreground: "",
        mask: "",
        backColor: "#000000".toCss(),
        backOpacity: 160,
        vertical: false
      }
    };
  };
  // * Иконка для бафов
  _._getDefaultVisualFor_actorBuffIcon = function() {
    return {
      visible: true,
      position: {
        x: 0,
        y: 0
      },
      isCanBeEdited: true,
      textFormat: "%1", //%1 меняется на количество секунд
      textFormatA: "A:%1", //%1 меняется на количество действия до завершения состояния
      text: {
        visible: true,
        size: {
          w: 38,
          h: 14
        },
        alignment: "right",
        font: {
          face: "AABS_1",
          size: 16,
          italic: false
        },
        margins: {
          x: -2,
          y: -4
        },
        outline: {
          color: null,
          width: 2
        },
        textColor: "#fafdec".toCss()
      },
      icon: {
        visible: true,
        index: 0,
        size: 32
      }
    };
  };
  // * Иконка для состояний (настройки аналогичные)
  _._getDefaultVisualFor_actorStateIcon = function() {
    return {
      visible: true,
      position: {
        x: 0,
        y: 0
      },
      isCanBeEdited: true,
      textFormat: "%1", //%1 меняется на количество секунд
      textFormatA: "A:%1", //%1 меняется на количество действия до завершения состояния
      text: {
        visible: true,
        size: {
          w: 38,
          h: 14
        },
        alignment: "right",
        font: {
          face: "AABS_1",
          size: 16,
          italic: false
        },
        margins: {
          x: -2,
          y: -4
        },
        outline: {
          color: null,
          width: 2
        },
        textColor: "#fafdec".toCss()
      },
      icon: {
        visible: true,
        index: 0,
        size: 32
      }
    };
  };
  // * Слот навыка
  _._getDefaultVisualFor_skillSlot = function() {
    return {
      visible: true,
      isCanBeEdited: true,
      isHideWithMessage: true,
      outlineMargins: {
        x: -2,
        y: -2
      },
      iconMargins: {
        x: 2,
        y: 2
      },
      outlinePulseSpeed: 40,
      selectedOutlineColor: "#fcba03",
      clickedOutlineColor: "#0b03fc",
      readyOutlineColor: "#21b53c",
      badOutlineColor: "#d61a1a",
      icon: {
        visible: true,
        size: 32,
        index: 0
      },
      symbolText: {
        visible: true,
        size: {
          w: 20,
          h: 20
        },
        alignment: "right",
        font: {
          face: "AABS_1",
          size: 14,
          italic: false
        },
        margins: {
          x: 18,
          y: 22
        },
        outline: {
          color: null,
          width: 2
        },
        textColor: "#e0cfbf".toCss()
      },
      timeText: {
        visible: true,
        size: {
          w: 32,
          h: 32
        },
        alignment: "center",
        font: {
          face: "AABS_1",
          size: 12,
          italic: false
        },
        margins: {
          x: 2,
          y: 2
        },
        outline: {
          color: null,
          width: 2
        },
        textColor: "#fcba03".toCss()
      },
      countText: {
        visible: true,
        size: {
          w: 32,
          h: 32
        },
        alignment: "right",
        font: {
          face: "AABS_1",
          size: 12,
          italic: false
        },
        margins: {
          x: 0,
          y: -6
        },
        outline: {
          color: null,
          width: 2
        },
        textColor: "#eb852d".toCss()
      }
    };
  };
  _._getDefaultVisualFor_enemyInfo = function() {
    return {
      visible: true,
      position: {
        x: 640,
        y: 66
      },
      image: "Enemy_Background",
      isCanBeEdited: true,
      isHideWithMessage: true,
      nameFormat: "%1",
      levelFormat: "Lv. %1",
      hpTextFormat: "%1 / %2", // * %3 - Для процента, %1 - текущее, %2 - максимум
      nameText: {
        visible: true,
        size: {
          w: 100,
          h: 20
        },
        alignment: "left",
        font: {
          face: "AABS_2",
          size: 16,
          italic: false
        },
        margins: {
          x: 10,
          y: 6
        },
        outline: {
          color: null,
          width: 3
        },
        textColor: "#d05816".toCss()
      },
      hpText: {
        visible: true,
        size: {
          w: 100,
          h: 20
        },
        alignment: "left",
        font: {
          face: "AABS_0",
          size: 13,
          italic: false
        },
        margins: {
          x: 12,
          y: 28
        },
        outline: {
          color: null,
          width: 2
        },
        textColor: "#edead8".toCss()
      },
      levelText: {
        visible: true,
        size: {
          w: 100,
          h: 20
        },
        alignment: "right",
        font: {
          face: "AABS_1",
          size: 12,
          italic: false
        },
        margins: {
          x: 60,
          y: 4
        },
        outline: {
          color: null,
          width: 2
        },
        textColor: "#edeb6a".toCss()
      },
      gauge: {
        visible: true,
        fill: "Player_HPGauge",
        foreground: "",
        mask: "",
        backColor: "#000000".toCss(),
        backOpacity: 160,
        vertical: false
      },
      gaugeMargins: {
        x: 6,
        y: 28
      },
      face: {
        visible: true,
        faceName: "",
        faceIndex: 0,
        mirror: false,
        size: 74,
        margins: {
          x: 92,
          y: 10
        }
      },
      battleState: {
        visible: true,
        image: "Enemy_BattleState_Free",
        margins: {
          x: 142,
          y: 60
        }
      },
      foregroundImage: {
        visible: false,
        image: "",
        margins: {
          x: 0,
          y: 0
        }
      }
    };
  };
})();

// ■ END ParamsManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PARSER.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Вспомогательные функции для доставания АБС параметров из Note и комментарией
AA.Utils.Parser = function() {};

(function() {
  var _;
  //@[DEFINES]
  _ = AA.Utils.Parser;
  // * Преобразовывает значение (строка или цифра)
  //TODO: Пока простой способ
  _.convertParameterValue = function(paramValue) {
    if (isFinite(paramValue)) {
      return Number(paramValue);
    } else {
      if (paramValue === "true") {
        return 1;
      } else if (paramValue === "false") {
        return 0;
      } else {
        return paramValue;
      }
    }
  };
  
  // * Извлекает из строки (линии) имя параметра и его значение
  _.extractABSParameter = function(line) {
    var match, name, value;
    // * Для параметров одиночных < >
    if (line.match(/<.*>/i)) {
      match = line.match(/<(\w+)\s*:\s*(.+)>/i); // * Для параметров в группе (без < > )
    } else {
      match = line.match(/(\w+)\s*:\s*(.+)/i);
    }
    if (match != null) {
      name = match[1];
      value = _.convertParameterValue(match[2]);
      return [name, value];
    } else {
      return null;
    }
  };
  // * Извлекает из строки (линии) значение конкретного параметра
  // * Например используется чтобы достать ID врага из <ABS:X>
  _.extractCertainABSParameter = function(name, line) {
    var param;
    param = _.extractABSParameter(line);
    // * Если в этой строке есть этот параметр, то вернём его значение
    if (param[0] === name) {
      return param[1];
    } else {
      // * Иначе нету ничего
      return null;
    }
  };
  // * Shortcut для проверки ABS событий
  _.getABSEnemyId = function(line) {
    return _.extractCertainABSParameter('ABS', line);
  };
  // *  Извлечь линии (строки) АБС параметров из группы в Note
  _.parseNoteGroup = function(tag, note) {
    var e, eTag, endLineIndex, index, j, len, line, notes, result, sTag, startLineIndex;
    try {
      result = [];
      sTag = "<" + tag;
      eTag = "</" + tag + ">";
      notes = note.split(/[\r\n]+/);
      startLineIndex = -1;
      endLineIndex = -1;
      for (index = j = 0, len = notes.length; j < len; index = ++j) {
        line = notes[index];
        if (line.contains(sTag)) {
          startLineIndex = index + 1; // * Себя не включает начальный таг
        }
        if (startLineIndex >= 0 && line.contains(eTag)) {
          endLineIndex = index;
          break;
        }
      }
      if (startLineIndex > -1 && endLineIndex > -1) {
        result = notes.slice(startLineIndex, endLineIndex);
      }
    } catch (error) {
      e = error;
      AA.w(e);
      return [];
    }
    return result;
  };
  // * Для навыков (навыки, оружие, предметы)
  _.processABSSkillsNotetags = function() {
    var item, j, k, len, len1;
//TODO: Оружие не имеет своих ABS параметров, только ссылка на НАВЫК
    for (j = 0, len = $dataSkills.length; j < len; j++) {
      item = $dataSkills[j];
      if (item == null) {
        continue;
      }
      _.processABSSkillParamsInItem(item, false);
    }
    for (k = 0, len1 = $dataItems.length; k < len1; k++) {
      item = $dataItems[k];
      if (item == null) {
        continue;
      }
      _.processABSSkillParamsInItem(item, true);
    }
    //TODO: checkWeapon aaAttackSkill Note
    _.checkInitialAttackABSSkill();
  };
  
  // * Для врагов
  _.processABSEnemiesNotetags = function() {
    var item, j, len;
    for (j = 0, len = $dataEnemies.length; j < len; j++) {
      item = $dataEnemies[j];
      if (item == null) {
        continue;
      }
      _.processABSEnemyParams(item);
    }
  };
  // * Для состояний
  _.processABSStatesNotetags = function() {
    var item, j, len;
    for (j = 0, len = $dataStates.length; j < len; j++) {
      item = $dataStates[j];
      if (item == null) {
        continue;
      }
      _.processABSStateParamsInItem(item);
    }
  };
  // * Навык атаки всегда должен быть АБС 0
  _.checkInitialAttackABSSkill = function() {
    var attackSkill, e;
    try {
      attackSkill = $dataSkills[1];
      // * Если игрок не настроил навык Атаки, то применим стандартные настройки
      if (attackSkill.meta.ABS == null) {
        attackSkill.meta.ABS = true;
        attackSkill.idA = 1;
        attackSkill.AASkill = new AASkill2(attackSkill.idA);
        attackSkill.AASkill.applyDefaultAttack001();
      }
    } catch (error) {
      e = error;
      AA.cre(e, 'Something wrong with Attack skill [1] settings');
    }
  };
  _.processABSSkillParamsInItem = function(item, isItem) {
    var e, j, len, param, paramPair, params, paramsRaw, ref;
    if (((ref = item.meta) != null ? ref.ABS : void 0) == null) {
      return;
    }
    try {
      params = [];
      paramsRaw = _.extractABSParametersFromDBItem(item);
      for (j = 0, len = paramsRaw.length; j < len; j++) {
        param = paramsRaw[j];
        paramPair = _.extractABSParameter(param); //ACore
        if (paramPair != null) {
          params.push(paramPair);
        }
      }
      // * АБС использует свой ID, чтобы предметы и навыки различать
      item.idA = item.id;
      if (isItem === true) {
        item.idA += AA.Utils.ItemsIDStart;
      }
      // * Данные АБС навыка храняться у предмета
      item.AASkill = new AASkill2(item.idA, isItem);
      return item.AASkill.setNoteParameters(params);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  // * Извлечь группу из объекта ДБ
  _.extractABSParametersFromDBItem = function(item) {
    var e, ref;
    try {
      if (((ref = item.meta) != null ? ref.ABS : void 0) != null) {
        return _.parseNoteGroup("ABS", item.note);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return [];
  };
  // * Извлекает из строки (линии) имя параметра и его значение
  // * Учитывается сложный параметр (массив или строка)
  _.extractABSParameterAny = function(line) {
    var match, name, value;
    match = line.match(/<*(\w+)\s*:\s*([\d,\w\s*]+)>*/i);
    if (match != null) {
      name = match[1];
      value = match[2];
      return [name, value];
    } else {
      return null;
    }
  };
  // * Конвертирует массив из строки 1,2,3 в [1, 2, 3] (цифры)
  _.convertArrayFromParameter = function(values) {
    var e;
    if (values instanceof Array) {
      return values;
    }
    try {
      // * Тут надо toString, так как может быть только цифра одна
      return values.toString().split(",").map(function(i) {
        return parseInt(i.trim());
      });
    } catch (error) {
      e = error;
      AA.w(e);
      return [];
    }
  };
  // * Чтение параметров врагов
  _.processABSEnemyParams = function(item) {
    var e, j, len, param, paramPair, params, paramsRaw, ref;
    if (((ref = item.meta) != null ? ref.ABS : void 0) == null) {
      return;
    }
    try {
      params = [];
      paramsRaw = _.extractABSParametersFromDBItem(item);
      for (j = 0, len = paramsRaw.length; j < len; j++) {
        param = paramsRaw[j];
        paramPair = _.extractABSParameter(param); //ACore
        if (paramPair != null) {
          params.push(paramPair);
        }
      }
      return item.AAEnemy = params;
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  // * Чтение параметров состояний
  _.processABSStateParamsInItem = function(item) {
    var e, j, len, param, paramPair, params, paramsRaw, ref;
    if (((ref = item.meta) != null ? ref.ABS : void 0) == null) {
      return;
    }
    try {
      params = [];
      paramsRaw = _.extractABSParametersFromDBItem(item);
      for (j = 0, len = paramsRaw.length; j < len; j++) {
        param = paramsRaw[j];
        paramPair = _.extractABSParameter(param); //ACore
        if (paramPair != null) {
          params.push(paramPair);
        }
      }
      // * Данные АБС состояния храняться у состояния
      item.AAState = new AAState(item.id);
      return item.AAState.setNoteParameters(params);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
})();

// ■ END PARSER.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__loadGameFonts, ALIAS__start, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  // * Загружаем и инициализируем систему АБС
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    return AA.System.initSystem();
  };
  // * Загрузка шрифтов системы АБС
  //@[ALIAS]
  ALIAS__loadGameFonts = _.loadGameFonts;
  _.loadGameFonts = function() {
    ALIAS__loadGameFonts.call(this);
    AA.System.loadFonts();
  };
  // * Начальная настройка (и сброс) системы АБС
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    ALIAS__start.call(this);
    AA.System.onGameDataLoaded();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__create, ALIAS__createSpriteset, ALIAS__onMapLoaded, ALIAS__onMapTouch, ALIAS__stop, ALIAS__update, ALIAS__updateCallMenu, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  
  //@[ALIAS]
  ALIAS__create = _.create;
  _.create = function() {
    ALIAS__create.call(this);
    AA.EV.subscribeFor("ABSPartyLeaderReady", this.addABSUI.bind(this));
    AA.EV.subscribeFor("ABSPartyLeaderNone", this.removeABSUI.bind(this));
  };
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    AA.System.onMapSceneLoaded();
    this.aaCreateMouseDetectionThread();
    this.aaInitMapScrollSystem();
    // * Небольшая задержка на приём визуальных эффектов от сервера
    AA.Utils.callDelayed(function() {
      return $gameTemp._aaCanReceiveVisualFromServer = true;
    }, 100);
  };
  //@[ALIAS]
  // * Создаём интерфейс боевой системы
  ALIAS__createSpriteset = _.createSpriteset;
  _.createSpriteset = function() {
    ALIAS__createSpriteset.call(this);
    this._aaUILayer = new Sprite();
    this.addChild(this._aaUILayer);
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    $gameTemp._aaCanReceiveVisualFromServer = false;
    ALIAS__stop.call(this);
    AA.System.onMapSceneStopped();
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (AA.isABSActive()) {
      this.updateABS();
    }
  };
  //@[ALIAS]
  ALIAS__onMapTouch = _.onMapTouch;
  // * Сохранение алиаса, чтобы использовать в другом файле
  _.ALIAS__onMapTouch = ALIAS__onMapTouch;
  _.onMapTouch = function() {
    if (AA.UI.isUITouched()) {
      return;
    }
    if (AA.isABSActive()) {
      return this.onMapTouchAA();
    } else {
      return ALIAS__onMapTouch.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__updateCallMenu = _.updateCallMenu;
  _.updateCallMenu = function() {
    if (TouchInput.isCancelled()) {
      //if AA.UI.performCancelActionOnMap()
      if (this.onMapCancelTouchAA()) {
        return;
      }
    }
    //TODO: Меню не вызывается если isMoving, также сделать если игрок в действии (анимация, удар)
    // * Если действие выполненно, то не надо вызывать меню
    return ALIAS__updateCallMenu.call(this);
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  (function() {    // * Обработка нажатия мыши (Touch) на карте (Левой)
    // -----------------------------------------------------------------------
    // * ТОЛЬКО левая кнопка мыши
    _.onMapTouchAA = function() {
      //TODO: $gamePlayer.canBeControlled() ??? Надо или нет???
      // * Если игрок в режиме выбора зоны навыка, то активация навыка
      if ($gamePlayer.isInSkillTargetingState()) {
        $gamePlayer.onSkillTargetSelected();
      } else {
        // * Новая система (без выбора целей)
        // * Обновим поиск цели под курсором
        this.aaRefreshMouseDetection();
        // * Статичная атака при повороте
        if ($gamePlayer.aaIsStaticAttackInRotation()) {
          $gamePlayer.aaPerformPlayerAttack01(false);
          return;
        }
        if ($gameTemp._aaEventUnderCursor != null) {
          // * Нажатие по цели
          // * (это используется чтобы не атаковать дружественные цели)
          if (this._aaIsTargetUnserCursorIsAlied()) {
            _.ALIAS__onMapTouch.call(this);
          } else {
            this._aaOnTouchOnTarget();
          }
        } else {
          // * Нажатие по карте (просто)
          this._aaOnTouchOnMapBasic();
        }
      }
    };
    // * Эта проверка предотвращает атаку по дружественной цели
    // * Доп. опции нету, т.к. с зажатым Cntrl можно атаковать и дружественную цель
    _._aaIsTargetUnserCursorIsAlied = function() {
      return !$gamePlayer.AAEntity().isMyEnemy($gameTemp._aaEventUnderCursor.AAEntity());
    };
    _._aaOnTouchOnTarget = function() {
      var char, mode;
      if (AA.isDEV()) {
        char = $gameTemp._aaEventUnderCursor;
        window.__selected = char;
        if (char != null) {
          "SELECTED ON MAP".p(char.AABattler().name());
        }
      }
      mode = AA.Input.LMBTargetTouchMode;
      switch (mode) {
        case 0: // * ATTACK ONLY
          $gamePlayer.aaPerformPlayerAttack01(false);
          break;
        case 1: // * DEFAULT (move)
          _.ALIAS__onMapTouch.call(this);
          break;
        case 2: // * SMART ATTACK
          $gamePlayer.aaPerformPlayerAttack01(true); // * 3, TURN
          break;
        default:
          $gamePlayer.turnTowardCharacter($gameTemp._aaEventUnderCursor);
      }
    };
    _._aaOnTouchOnMapBasic = function() {
      var mode;
      mode = AA.Input.LMBMapTouchMode;
      if (mode === 0) { // * ATTACK ONLY
        $gamePlayer.aaPerformPlayerAttack01(false);
      } else if (mode === 1) { // * DEFAULT (move)
        _.ALIAS__onMapTouch.call(this); // mode == 2
      } else {

      }
    };
    // TODO: Пока только события собирает
    // * NOTHING, ничего
    _.aaGetABSEntityInPosition = function(point) {
      var e, events;
      try {
        events = $gameMap.eventsXyAAExt(point.x, point.y);
        if (events.length > 0) {
          return events.first();
        }
      } catch (error) {
        e = error;
        AA.w;
      }
      return null;
    };
    return _.aaOnClickOnABSCharacter = function(char) {
      var e;
      try {
        $gamePlayer.aaTrySetTarget(char);
        //? DEBUG ONLY
        if (AA.isDEV()) {
          window.__selected = char;
          if (char != null) {
            return "SELECTED ON MAP".p(char.AABattler().name());
          }
        }
      } catch (error) {
        e = error;
        return AA.w(e);
      }
    };
  })();
  (function() {    // * Обработка нажатия мыши (Touch) на карте (Правой)
    // -----------------------------------------------------------------------
    // * Если вернуть true - то меню НЕ будет показано
    _.onMapCancelTouchAA = function() {
      var isNotShowMenu;
      if (AA.UI.isAnyUIElementTouchProcess()) {
        // * инвернтарь, Hot бар и т.д.
        return true;
      }
      // * Отмена выбора зоны поражения навыка
      if ($gamePlayer.isInSkillTargetingState()) {
        $gamePlayer.onSkillTargetCancel();
        return true;
      }
      // * Новая система (без выбора целей)
      // * Обновим поиск цели под курсором
      this.aaRefreshMouseDetection();
      // * Статичная атака при повороте
      if ($gamePlayer.aaIsStaticAttackInRotation()) {
        $gamePlayer.aaPerformPlayerAttack02(false);
        return true;
      }
      if ($gameTemp._aaEventUnderCursor != null) {
        // * Нажатие по цели
        // * (это используется чтобы не атаковать дружественные цели)
        if (this._aaIsTargetUnserCursorIsAlied()) {
          isNotShowMenu = this._aaOnCancelTouchOnAllyTarget();
        } else {
          isNotShowMenu = this._aaOnCancelTouchOnTarget();
        }
      } else {
        // * Нажатие по карте (просто)
        isNotShowMenu = this._aaOnCancelTouchBasic();
      }
      return isNotShowMenu;
    };
    _._aaOnCancelTouchOnAllyTarget = function() {
      var mode;
      mode = AA.Input.RMBTargetTouchMode;
      switch (mode) {
        case 0: // * ATTACK ONLY
          // * NOTHING
          return true;
        case 1: // * Move
          _.ALIAS__onMapTouch.call(this);
          return true;
        case 2: // * SMART ATTACK
          // * NOTHING
          return true;
        case 3: // TURN
          $gamePlayer.turnTowardCharacter($gameTemp._aaEventUnderCursor);
          return true; // * 4, MENU
        default:
          return false;
      }
    };
    _._aaOnCancelTouchOnTarget = function() {
      var mode;
      mode = AA.Input.RMBTargetTouchMode;
      switch (mode) {
        case 0: // * ATTACK ONLY
          $gamePlayer.aaPerformPlayerAttack02(false);
          return true;
        case 1: // * Move
          _.ALIAS__onMapTouch.call(this);
          return true;
        case 2: // * SMART ATTACK
          $gamePlayer.aaPerformPlayerAttack02(true);
          return true;
        case 3: // TURN
          $gamePlayer.turnTowardCharacter($gameTemp._aaEventUnderCursor);
          return true; // * 4, MENU
        default:
          return false;
      }
    };
    return _._aaOnCancelTouchBasic = function() {
      var mode;
      mode = AA.Input.RMBMapTouchMode;
      switch (mode) {
        case 0: // * Menu
          return false; // * false - значит меню будет открыто
        case 1: // * Attack Secondary
          $gamePlayer.aaPerformPlayerAttack02(false);
          return true;
        case 2: // * Move
          _.ALIAS__onMapTouch.call(this);
          return true;
        case 3: // * Turn
          $gamePlayer.turnTowardCharacter(TouchInput.toMapPoint());
          return true; // * Nothing
        default:
          return true;
      }
    };
  })();
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _.aaCreateMouseDetectionThread = function() {
    $gameTemp._aaEventUnderCursor = null;
    return this._aaMouseDetectThread = new KDCore.TimedUpdate(2, this.aaRefreshMouseDetection.bind(this));
  };
  _.aaUpdateMouseDetection = function() {
    return this._aaMouseDetectThread.update();
  };
  // * Этот метод отвечает за "сбор" событий и объектов под курсором
  _.aaRefreshMouseDetection = function() {
    var eventUnderCursor;
    eventUnderCursor = this.aaGetABSEntityInPosition(TouchInput.toMapPoint());
    if (eventUnderCursor != null) {
      if ($gameTemp._aaEventUnderCursor !== eventUnderCursor) {
        $gameTemp._aaEventUnderCursor = eventUnderCursor;
        AA.EV.call("UnderMouseEventChanged");
      }
    } else {
      if ($gameTemp._aaEventUnderCursor != null) {
        $gameTemp._aaEventUnderCursor = null;
        AA.EV.call("UnderMouseEventChanged");
      }
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _.aaInitMapScrollSystem = function() {
    this.aaScrollTimer = 0;
    this.aaIsNeedScroll = false;
    this.aaScrollParams = AA.PP.getMapScrollingSettings();
  };
  //@[DYNAMIC]
  _.aaUpdateMapScrlByMouse = function() {
    // * По умолчанию скролл включён
    this.aaUpdateMapScrlByMouseBody();
  };
  _.aaUpdateMapScrlByMouseBody = function() {
    var p, zone;
    if ($gamePlayer.isMoving() || $gameTemp.isDestinationValid()) {
      return;
    }
    // * Когда мышка у края экрана, тогда будет scroll карты
    this.aaIsNeedScroll = false;
    zone = this.aaScrollParams.scrollZone;
    p = TouchInput;
    if (p.y > Graphics.height - zone && p.y <= Graphics.height - 2) {
      this.aaMakeScroll(2);
    } else {

    }
    if (p.y >= 2 && p.y < zone) {
      this.aaMakeScroll(8);
    } else {

    }
    if (p.x >= 2 && p.x < zone) {
      this.aaMakeScroll(4);
    } else {

    }
    if (p.x > Graphics.width - zone && p.x <= Graphics.width - 2) {
      this.aaMakeScroll(6);
    }
    if (!this.aaIsNeedScroll) {
      // * Не применяем, например delay ещё не прошёл
      $gameMap.startScroll(0, 0, 0);
      if (this.aaScrollTimer >= this.aaScrollParams.delay) {
        // * Сброс таймера
        this.aaScrollTimer = 0;
      }
    }
    if (this.aaIsNeedScroll === true) {
      
      // * Было ли движение камеры? (Тут только true может быть)
      $gameTemp.aaSetMapScrolled(true);
    }
  };
  _.aaMakeScroll = function(d) {
    $gameMap.startScroll(d, 1, this.aaScrollParams.speed);
    this.aaScrollTimer++;
    this.aaIsNeedScroll = this.aaScrollTimer >= this.aaScrollParams.delay;
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _.addABSUI = function() {
    this.removeABSUI();
    this._aaUI = new AA.Spriteset_UI();
    this._aaUILayer.addChild(this._aaUI);
  };
  _.removeABSUI = function() {
    if (this._aaUI != null) {
      return this._aaUILayer.removeChild(this._aaUI);
    }
  };
  _.updateABS = function() {
    this.aaUpdateMouseDetection();
    this.aaUpdateMapScrlByMouse();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Title.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__start, _;
  //@[DEFINES]
  _ = Scene_Title.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    AA.System.onTitleScreen();
    return ALIAS__start.call(this);
  };
})();

// ■ END Scene_Title.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Сцена игрового визуального редактора интерфейса
(function() {
  var Scene_UIEditor;
  Scene_UIEditor = class Scene_UIEditor extends Scene_Base {
    constructor() {
      super();
      this.elementUnderMouse = null;
      this.isDrag = false;
      this.preEditElementsStates = [];
      return;
    }

    create() {
      super.create();
      // * Запоминаем состояние АБС, так как надо его ставить на паузу
      $gameTemp._needRestoreABSSystemAfterUIEdit = AA.isABSActive();
      AA.System.pauseABS();
      this.createMain(); //# -> 0
      //TODO: Добавить опцию (Показывать ли скрытые в редактре...)
      this.showNotVisibleElements();
      //TODO: Добавить опцию (параметр  Показывать ли..)
      return this.showNotEditableElements();
    }

    // * Элементы, которые нельзя редактировать, мы отмечаем (блюр)
    showNotEditableElements() {
      var e, i, len, ref;
      ref = this.elements();
      for (i = 0, len = ref.length; i < len; i++) {
        e = ref[i];
        if (!e.isCanBeEdited()) {
          this.deactivateElement(e);
        }
      }
    }

    // * Элемнты, которые скрыты, мы показываем прозрачными
    showNotVisibleElements() {
      var e, i, len, ref;
      ref = this.elements();
      for (i = 0, len = ref.length; i < len; i++) {
        e = ref[i];
        if (!e.visible) {
          // * Тут проверяется по флагу visible, а не isActive
          this.transparentElement(e);
        }
      }
    }

    deactivateElement(element) {
      // * Сохраняем значения перед редактированием
      this.preEditElementsStates.push([element, element.visible, element.opacity]);
      element.opacity = 150;
      element.desaturate();
    }

    transparentElement(element) {
      this.preEditElementsStates.push([element, element.visible, element.opacity]);
      element.visible = true;
      element.opacity = 120;
    }

    // * Сбросить значения по умолчанию
    resetElement(element) {
      var user;
      element.reset("position");
      user = $gameSystem.aaGetUserUISettings();
      return user.set(element.tag, "resetPosition");
    }

    // * Сохранить позицию элемента
    saveElementPosition(element) {
      var user, x, y;
      user = $gameSystem.aaGetUserUISettings();
      ({x, y} = element);
      user.set(element.tag, "setPosition", [x, y]);
    }

    elements() {
      return this.uiSpriteset.elements;
    }

    //TODO: Добавить кнопка H - скрыть\показать или скрыть \ показать последний (если не на элементе курсор)
    // Например стоит опция не показывать скрытые

      //TODO: Параметр плагина - OFF, Всегда, Только в режиме разработки

      //TODO: Кнопка - Сбросить до последний позиции???
    update() {
      super.update();
      this.updateMain(); //# -> Mouse
      this.updateExit();
      if (!this.isDrag) {
        // * Обновляем пользовательское управление (если не Drag)
        return this.updateInput();
      }
    }

    updateExit() {
      if (Input.isCancel()) {
        return this.popScene();
      }
    }

    updateInput() {
      // * Сброс позиции по умолчанию
      if (Input.isTriggered('r')) {
        if (this.elementUnderMouse != null) {
          this.resetElement(this.elementUnderMouse);
        }
      }
    }

    stop() {
      var elementData, i, len, ref;
      super.stop();
      if ($gameTemp._needRestoreABSSystemAfterUIEdit === true) {
        AA.System.resumeABS();
      }
      ref = this.preEditElementsStates;
      // * Восстанавливаем прозрачность и видимость которые были перед редактированием
      for (i = 0, len = ref.length; i < len; i++) {
        elementData = ref[i];
        elementData[0].visible = elementData[1];
        elementData[0].opacity = elementData[2];
      }
    }

  };
  AA.link(Scene_UIEditor);
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_UIEditor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Scene_UIEditor.prototype;
  _.createMain = function() {
    this.createBackground();
    // * Показать что в редакторе находимся
    this.createEditorMark();
    // * Сетки
    this.createGrids();
    this.createUI();
    this.createXYHelpText();
    return this.createTagHelpText();
  };
  // * За заднем плане карта
  _.createBackground = function() {
    this._backgroundSprite = new Sprite(SceneManager.backgroundBitmap());
    this.addChild(this._backgroundSprite);
    return this._backgroundSprite.opacity = 250;
  };
  _.createEditorMark = function() {
    var eLayer, eText, p;
    eLayer = KDCore.Sprite.FromBitmap(Graphics.width, Graphics.height);
    eLayer.fillAll("#C0C0C0".toCss());
    eLayer.opacity = 75;
    p = KDCore.UI.Sprite_UIText.prototype.defaultParams();
    p.size = {
      w: Graphics.width,
      h: 200
    };
    p.font.size = 72;
    eText = new KDCore.UI.Sprite_UIText(p);
    eText.drawText('UI Editor');
    eText.y = Graphics.height / 2 - 100;
    eLayer.addChild(eText);
    return this.addChild(eLayer);
  };
  // * Сетка для визуальной привязки (для шага 10)
  _.createGrids = function() {
    this.xGrid = this.createGridSprite(10);
    return this.addChild(this.xGrid);
  };
  _.createGridSprite = function(size) {
    var drawLineHor, drawLineVert, grid, i, j, k, l, ref, ref1;
    grid = KDCore.Sprite.FromBitmap(Graphics.width, Graphics.height);
    drawLineVert = function(b, i) {
      return b.fillRect(0, i * size, b.width, 1, 'rgba(0, 0, 0, 1)');
    };
    drawLineHor = function(b, i) {
      return b.fillRect(i * size, 0, 1, b.height, 'rgba(0, 0, 0, 1)');
    };
    for (i = k = 0, ref = grid.b().height / size; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      drawLineVert(grid.bitmap, i);
    }
    for (j = l = 0, ref1 = grid.b().width / size; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
      drawLineHor(grid.bitmap, j);
    }
    grid.visible = false;
    grid.opacity = 75;
    return grid;
  };
  // * В этом методе создаётся AA UI (не обновляемый)
  _.createUI = function() {
    this.uiSpriteset = new AA.Spriteset_UI();
    this.uiSpriteset.show(); // * Всегда видимый в редакторе
    this.addChild(this.uiSpriteset);
  };
  _.createXYHelpText = function() {
    var p;
    p = KDCore.UI.Sprite_UITextWithBack.prototype.defaultParams();
    p.text.size.w = 80;
    p.rect.size.w = 80;
    p.rect.borderColor = "";
    p.text.textColor = "#FFFFFF".toCss();
    this.xyText = new KDCore.UI.Sprite_UITextWithBack(p);
    this.xyText.fill("#C0C0C0".toCss());
    return this.addChild(this.xyText);
  };
  _.createTagHelpText = function() {
    var p;
    p = KDCore.UI.Sprite_UITextWithBack.prototype.defaultParams();
    p.text.size.w = 120;
    p.rect.size.w = 120;
    p.rect.borderColor = "";
    p.text.textColor = "#FFFFFF".toCss();
    this.tagText = new KDCore.UI.Sprite_UITextWithBack(p);
    this.tagText.fill("#808080".toCss());
    return this.addChild(this.tagText);
  };
})();

// ■ END Scene_UIEditor.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_UIEditor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Scene_UIEditor.prototype;
  _.updateMain = function() {
    this.updateMouse();
    return this.updateXYText();
  };
  _.updateMouse = function() {
    this.xGrid.visible = false;
    if (this.isDrag === true) {
      this.updateDragEnd();
      return this.updateMouseDrag();
    } else {
      this.updateMouseHover();
      return this.updateDragStart();
    }
  };
  _.updateMouseHover = function() {
    var underMouse;
    this.elementUnderMouse = null;
    underMouse = this.elements().filter(function(e) {
      return e.isUnderMouse();
    });
    if (underMouse.isEmpty()) {
      return;
    }
    return this.elementUnderMouse = underMouse.last();
  };
  _.updateDragStart = function() {
    if (this.elementUnderMouse == null) {
      return;
    }
    if (!this.elementUnderMouse.isCanBeEdited()) {
      return;
    }
    if (TouchInput.isPressed()) {
      this.isDrag = true;
      this._lastElementPosition = this.elementUnderMouse.toPoint();
      // * Разница в координатах курсора и объекта, чтобы убрать эффект "прыжка"
      this._deltaXY = this.getDeltaXY();
    }
  };
  _.getDeltaXY = function() {
    var dx, dy, x, y;
    ({x, y} = this.elementUnderMouse);
    dx = TouchInput.x - x;
    dy = TouchInput.y - y;
    return new KDCore.Point(dx, dy);
  };
  _.updateMouseDrag = function() {
    // * Проверка, есть ли элемент
    this.elementUnderMouse.move(TouchInput.x - this._deltaXY.x, TouchInput.y - this._deltaXY.y);
    if (Input.isPressed('shift')) {
      this.applyMargin(2);
    } else if (Input.isPressed('control')) {
      this.applyMargin(10);
      this.xGrid.visible = true;
    }
    if (TouchInput.isCancelled()) {
      this.resetAfterDrag();
    }
  };
  // * Применить "привязывание" к координатам
  _.applyMargin = function(delta) {
    var x, y;
    ({x, y} = this.elementUnderMouse);
    while (x % delta !== 0) {
      x += 1;
    }
    while (y % delta !== 0) {
      y += 1;
    }
    return this.elementUnderMouse.move(x, y);
  };
  _.resetAfterDrag = function() {
    this.isDrag = false;
    TouchInput.clear();
    return this.elementUnderMouse.move(this._lastElementPosition);
  };
  _.updateDragEnd = function() {
    if (TouchInput.isReleased()) {
      this.isDrag = false;
      this.saveElementPosition(this.elementUnderMouse); //# -> @
    }
  };
  _.updateXYText = function() {
    var fillColor, t;
    fillColor = "#C0C0C0".toCss();
    this.tagText.visible = false;
    if (this.elementUnderMouse != null) {
      // * Показываем координаты элемента
      t = this.getXYTextFormat(this.elementUnderMouse);
      if (this.isDrag === true) {
        fillColor = "#008040".toCss();
      } else {
        if (this.elementUnderMouse.isCanBeEdited()) {
          fillColor = "#008080".toCss();
        } else {
          fillColor = "#FF8080".toCss();
        }
        this.tagText.draw(this.elementUnderMouse.tag);
        this.tagText.visible = true;
      }
    } else {
      t = this.getXYTextFormat(TouchInput);
    }
    this.xyText.fill(fillColor);
    this.xyText.draw(t);
    return this.moveXYTextHelp();
  };
  _.moveXYTextHelp = function() {
    this.xyText.move(TouchInput.x + 16, TouchInput.y + 16);
    this.tagText.move(this.xyText.x - 20, this.xyText.y + this.xyText.realHeight());
    // * Если слишком низки (за экран выходит)
    if (this.tagText.y + this.tagText.realHeight() > Graphics.height) {
      this.xyText.y = TouchInput.y - 16 - this.xyText.realHeight();
      this.tagText.y = this.xyText.y + this.xyText.realHeight();
    }
  };
  _.getXYTextFormat = function(point) {
    var x, y;
    ({x, y} = point);
    return "X:" + x + " ; Y:" + y;
  };
})();

// ■ END Scene_UIEditor.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_AADamagePopUpItem.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Sprite_AADamagePopUpItem;

Sprite_AADamagePopUpItem = class Sprite_AADamagePopUpItem extends KDCore.Sprite {
  constructor(settings1, value1) {
    super();
    this.settings = settings1;
    this.value = value1;
    this._init();
    this._createSprites();
    this._start();
  }

  dispose() {
    var ref;
    this.disposed = true;
    this.visible = false;
    this._removeDynamic();
    if ((ref = this.parent) != null) {
      ref.removeChild(this);
    }
  }

  update() {
    super.update();
    if (this.disposed === true) {
      return;
    }
    if (SceneManager.isSceneChanging()) {
      return;
    }
    this.thread.update();
    this._updateZoom();
    this._updateImageFadeIn();
  }

  // * Установить позицию и применить случайный сдвиг координат
  setStartPoint(x, y) {
    this.move(x, y);
    if (this.settings.randDX > 0) {
      this.x = this.x + Math.randomInt(this.settings.randDX) - Math.randomInt(this.settings.randDX * 2);
    }
    if (this.settings.randDY > 0) {
      this.y = this.y + Math.randomInt(this.settings.randDY);
    }
  }

  // * Привязан, надо удалять себя (aaRemoveDynamicSprite)
  setDynamic() {
    return this._isDynamic = true;
  }

  // * Общие методы создания Pop объекта
  // * Находяться прямо в классе, чтобы не создавать доп. менеджер

    // * Двигается вместе с персонажем (а не экраном)
  static CreateOnCharacterBinded(char, settings, value) {
    var charSprite, dy, e, popDynamicParentSpr, popItem, spriteset, x, y;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (char == null) {
        return;
      }
      if (settings == null) {
        return;
      }
      spriteset = $gameMap.spriteset();
      charSprite = spriteset.findTargetSprite(char);
      if (charSprite == null) {
        return;
      }
      ({x, y} = charSprite);
      // * Создаётся спрайт "оболочка", которая будет привязана к координатам персонажа
      popDynamicParentSpr = new Sprite();
      popDynamicParentSpr.anchor.set(0.5);
      popItem = new Sprite_AADamagePopUpItem(settings, value);
      dy = -(charSprite.patternHeight() - $gameMap.tileWidth() / 2);
      popItem.setStartPoint(0, dy);
      // * Устанавливаем флаг, чтобы при Dispose удалять себя
      popItem.setDynamic();
      popDynamicParentSpr.addChild(popItem);
      // * Регестрируем как динамический спрайт
      spriteset.aaRegisterDynamicSprite(popDynamicParentSpr, char, 0, dy);
      // * Добавляем на слой PopUp
      return spriteset.aaGetDamagePopUpLayer().addChild(popDynamicParentSpr);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  }

  static CreateOnCharacter(char, settings, value) {
    var charSprite, e, spriteset, x, y;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (char == null) {
        return;
      }
      spriteset = $gameMap.spriteset();
      charSprite = spriteset.findTargetSprite(char);
      if (charSprite == null) {
        return;
      }
      ({x, y} = charSprite);
      y = y - charSprite.patternHeight() - $gameMap.tileWidth() / 2;
      return Sprite_AADamagePopUpItem.CreateOnScreen(x, y, settings, value);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  }

  static CreateOnMap(x, y, settings, value) {
    var e, screenX, screenY, tempChar;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      tempChar = new Game_Character();
      tempChar.setPosition(x, y);
      screenX = tempChar.screenX();
      screenY = tempChar.screenY() - $gameMap.tileWidth();
      return Sprite_AADamagePopUpItem.CreateOnScreen(screenX, screenY, settings, value);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  }

  static CreateOnScreen(x, y, settings, value) {
    var e, popItem, spriteset;
    try {
      if (settings == null) {
        return;
      }
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      popItem = new Sprite_AADamagePopUpItem(settings, value);
      popItem.setStartPoint(x, y);
      spriteset = $gameMap.spriteset();
      return spriteset.aaGetDamagePopUpLayer().addChild(popItem);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_AADamagePopUpItem.prototype;
  _._init = function() {
    this.disposed = false;
    this.isNeedZoom = true;
    this.stayTime = 0;
    this.maxStayTime = this.settings.stayTime; // * 60
  };
  _._createSprites = function() {
    var e;
    if (this.settings == null) {
      return;
    }
    // * Используется для расчёта размера текста
    this.bitmap = new Bitmap(50, 50);
    this.anchor.set(0.5);
    try {
      this.bitmap.fontSize = Math.max(this.settings.text.font.size, this.settings.changeFontSize);
      this._createValueText();
      if ((this.settings.image != null) && String.any(this.settings.image.name)) {
        return this._createImage();
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _._createValueText = function() {
    var e, h, w;
    try {
      w = this.bitmap.measureTextWidth(this.value) + 4;
      h = this.settings.text.font.size + 10;
      // * Присваеваем новые значение (посчитанные)
      this.settings.text.size.w = w;
      this.settings.text.size.h = h;
      this.valueSprite = KDCore.Sprite.FromParams(this.settings.text);
      this.valueSprite.anchor.set(0.5);
      this.valueSprite.onReady(this._drawValue.bind(this));
      return this.add(this.valueSprite);
    } catch (error) {
      e = error;
      AA.w(e);
      return this.valueSprite = new Sprite();
    }
  };
  _._drawValue = function() {
    this.valueSprite.clear();
    return this.valueSprite.drawTextFull(this.value, this.settings.text.alignment);
  };
  _._createImage = function() {
    var e, settings;
    try {
      settings = this.settings.image;
      this.imageSprite = KDCore.Sprite.FromImg(settings.name);
      this.imageSprite.x = settings.margins.x || 0;
      this.imageSprite.y = settings.margins.y || 0;
      this.imageSprite.anchor.set(0.5);
      this.imageSprite.opacity = 0;
      return this.add(this.imageSprite);
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
  _._start = function() {
    this.thread = new KDCore.TimedUpdate(2, this._updateLife.bind(this));
  };
  _._updateLife = function() {
    // * Сперва идёт анимация увеличения, затемм только отсчёт таймера
    if (this.isNeedZoom === true) {
      return;
    }
    if (this.disposed === true) {
      return;
    }
    if (SceneManager.isSceneChanging()) {
      return;
    }
    if (this.maxStayTime <= 0) {
      this.dispose();
    } else {
      if (this.stayTime++ < this.maxStayTime) {
        return;
      }
    }
    this._updateOpacity();
    this._updateMoveUp();
    if (this.opacity <= 0) {
      this.dispose();
    }
  };
  _._updateOpacity = function() {
    var e;
    try {
      // * Если не надо, то сразу исчезает
      if (this.settings.noFadeOut === true) {
        this.opacity = 0;
      } else {
        this.opacity -= 25;
      }
    } catch (error) {
      e = error;
    }
  };
  _._updateMoveUp = function() {
    var e;
    if (this.settings.noFlyUp === true) {
      return;
    }
    try {
      this.move(this.x, this.y - 1);
    } catch (error) {
      e = error;
    }
  };
  _._updateZoom = function() {
    var b, e;
    if (!this.isNeedZoom) {
      return;
    }
    try {
      b = this.valueSprite.bitmap;
      if (b.fontSize === this.settings.changeFontSize) {
        this.isNeedZoom = false;
        return;
      }
      if (b.fontSize < this.settings.changeFontSize) {
        b.fontSize = b.fontSize + 1;
      } else if (b.fontSize > this.settings.changeFontSize) {
        b.fontSize = b.fontSize - 1;
      }
      this._drawValue();
    } catch (error) {
      e = error;
    }
  };
  _._updateImageFadeIn = function() {
    var e;
    try {
      if (this.imageSprite == null) {
        return;
      }
      if (this.imageSprite.opacity >= 255) {
        return;
      }
      this.imageSprite.opacity += this.settings.image.fadeInSpeed;
    } catch (error) {
      e = error;
    }
  };
  _._removeDynamic = function() {
    var e, spriteset;
    if (this._isDynamic !== true) {
      return;
    }
    try {
      spriteset = $gameMap.spriteset();
      spriteset.aaRemoveDynamicSprite(this);
      if (this.parent != null) {
        return spriteset.aaRemoveDynamicSprite(this.parent);
      }
    } catch (error) {
      e = error;
      return AA.warning(e);
    }
  };
})();

// ■ END Sprite_AADamagePopUpItem.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var Sprite_AAMapSkill2Projectile;

Sprite_AAMapSkill2Projectile = class Sprite_AAMapSkill2Projectile extends Sprite {
  constructor(mapIndex) {
    super();
    this.mapIndex = mapIndex;
    this.skill = $gameMap.aaMapSkills()[this.mapIndex];
    this._id = this.skill.id();
    this._ended = false;
    this._hasHit = false;
    this._initParams();
    this._setupImage();
    this._setupDirection();
    this._collisionDetectionThread = new KDCore.TimedUpdate(2, this._checkCollision.bind(this));
    this._updatePosition();
    if (this._frames != null) {
      this._updateFrame();
    }
    return;
  }

  // * Навыв завершён (достиг цели или расстояния)
  isEnd() {
    return this._ended === true;
  }

  update() {
    super.update();
    this._updatePosition();
    if (this._frames != null) {
      this._updateFrame();
    }
    if (this._hasHit === true) {
      // * Зануляем принудительно, если достиг цели
      this.skill.totalFlyTime = 0;
    } else {
      this._updateMove();
      this._collisionDetectionThread.update();
      this.skill.totalFlyTime -= 1;
    }
    this._updateEnd();
  }

};

(function() {  
  //TODO: СИСТЕМАТИЗАЦИЯ И КОММЕНТАРИИ

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Sprite_AAMapSkill2Projectile.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Sprite_AAMapSkill2Projectile.prototype;
  _._initParams = function() {
    var e, evOffset, subj;
    this._framesBeforeStartFadeToEnd = 5;
    // * FROM START SUBJECT OFFSET
    //TODO: С игрока не учитывается!
    this._yOffset = 0;
    try {
      if (this.skill.isSubjectIsEvent()) {
        subj = this.skill.getSubject();
        evOffset = subj._aaMapSkillVectorOffset;
        if ((evOffset != null) && evOffset !== 0 && isFinite(evOffset)) {
          this._yOffset = evOffset;
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
      this._yOffset = 0;
    }
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.z = this.skill.zLevel();
    this._hitDist = this.skill.hitOffset();
  };
  _._setupImage = function() {
    this._setupAnimatedImg();
    this.bitmap = ImageManager.loadPicture(this.skill.image());
  };
  _._setupAnimatedImg = function() {
    var frames;
    this._curFrame = 0;
    this._frameTimer = 0;
    frames = this.skill.image().match(/\((.*)\)/i);
    if (frames != null) {
      frames = frames[1].split(',');
      this._frames = Number(frames[0]);
      this._frameSpeed = Number(frames[1]);
    }
  };
  _._setupDirection = function() {
    var eX, eY, sX, sY, yo;
    yo = 0;
    eX = this.skill.scX;
    eY = this.skill.scY;
    sX = this.skill.x;
    sY = this.skill.y;
    this._angle = Math.atan2(eY - yo - sY, eX - sX) * 180 / Math.PI;
    //pi = Math.PI / 180
    //TODO: pi
    this.rotation = (this._angle + 90) * Math.PI / 180;
    this.dx = this.skill.speed() * Math.cos(this._angle * Math.PI / 180);
    this.dy = this.skill.speed() * Math.sin(this._angle * Math.PI / 180);
  };
  _._updatePosition = function() {
    this.x = this.skill.x - $gameMap.displayX() * $gameMap.tileWidth();
    this.y = this.skill.y - $gameMap.displayY() * $gameMap.tileWidth() + this._yOffset;
  };
  _._updateMove = function() {
    this.skill.x += this.dx;
    this.skill.y += this.dy;
  };
  _._updateFrame = function() {
    var ph, pw, sx, sy;
    pw = this.bitmap.width / this._frames;
    ph = this.bitmap.height;
    sx = this._curFrame * pw;
    sy = 0;
    if (this._frameTimer >= this._frameSpeed) {
      this._frameTimer = 0;
      this._curFrame = this._curFrame >= this._frames - 1 ? 0 : this._curFrame + 1;
    }
    this.setFrame(sx, sy, pw, ph);
    this._frameTimer += 1;
  };
  _._updateEnd = function() {
    if (this.skill.totalFlyTime > 0) {
      return;
    }
    if (this._framesBeforeStartFadeToEnd < 0) {
      this.opacity -= 40;
      if (this.opacity <= 0) {
        return this._onTimeEnded();
      }
    } else {
      this._framesBeforeStartFadeToEnd -= 1;
      // * Мнгновенно пропадает, если был "выключен" из сети
      if (this.skill.forceEndFromNetwork === true) {
        this.opacity = 0;
        this._framesBeforeStartFadeToEnd = -1;
      }
    }
  };
  _._onTimeEnded = function() {
    var x, y;
    this._ended = true;
    // * Если навык без контактный и его "время" закончено, он должен сработать всё равно
    if (this._hasHit === false && this.skill.isNoContact() && !this.skill.isPhantom()) {
      x = Math.floor(this.skill.x / $gameMap.tileWidth());
      y = Math.floor(this.skill.y / $gameMap.tileWidth());
      this.onHit({x, y});
    }
    AA.EV.call("MapSkillsRequestsClean");
  };
  _._checkCollision = function() {
    var event, map, playerHit, point, x, y;
    if (this.skill.isPhantom()) {
      return;
    }
    if (this.opacity < 255) {
      return;
    }
    playerHit = this._checkHitPlayer();
    if (playerHit === true) {
      //"PLAYER HIT".p()
      this.onHit($gamePlayer);
      return;
    }
    // * Для оптимизации, считаем один раз тут, а не в каждом методе
    x = Math.floor(this.skill.x / $gameMap.tileWidth());
    y = Math.floor(this.skill.y / $gameMap.tileWidth());
    map = this._checkHitMap(x, y);
    if (map === true) {
      //"MAP OBSTCL HIT".p()
      this.onHit({x, y});
      return;
    }
    point = this._checkHitPoint(x, y);
    if (point === true) {
      //"POINT HIT".p()
      this.onHit({x, y});
      return;
    }
    event = this._checkHitEvent();
    if (event != null) {
      //"EVENT HIT".p()
      this.onHit(event);
    }
  };
  // * Когда достиг игрока
  _._checkHitPlayer = function() {
    var dist;
    if (this.skill.isSubjectIsPlayer()) {
      //TODO: friendlyfier is 1
      return false;
    }
    dist = AATargetsManager.getScreenExtDistance($gamePlayer, $gameTemp.aaProjYOff, this.x, this.y);
    return dist < this._hitDist && this.isSameMapLevel($gamePlayer._priorityType);
  };
  // * Когда достиг точки на карте (указанной как цель)
  _._checkHitPoint = function(tx, ty) {
    if (!this.skill.isCanHitPoint()) {
      return false;
    }
    return this.skill.tX === tx && this.skill.tY === ty;
  };
  // * Когда препятсвие на карте (Регион или Terrain)
  _._checkHitMap = function(tx, ty) {
    return this.skill.isHaveRegion($gameMap.regionId(tx, ty)) || this.skill.isHaveTerrain($gameMap.terrainTag(tx, ty));
  };
  // * Когда достиг события
  _._checkHitEvent = function() {
    var dist, ev, i, len, ref, subId;
    subId = this.skill.getSubjectEvId();
    ref = $gameMap.events();
    for (i = 0, len = ref.length; i < len; i++) {
      ev = ref[i];
      if (ev == null) {
        continue;
      }
      if (ev.eventId() === subId) {
        // * В себя нельзя попасть
        continue;
      }
      dist = AATargetsManager.getScreenExtDistance(ev, $gameTemp.aaProjYOff, this.x, this.y);
      if (dist < this._hitDist && this.isEventIsObstacle(ev)) {
        return ev;
      }
    }
    return null;
  };
  _.isSameMapLevel = function(priorityType) {
    if (this.z <= 2) {
      // * Ниже персонажей
      return priorityType === 0;
    }
    if (this.z <= 4) {
      // * На одном уровне
      return priorityType === 1;
    }
    // * Выше
    return priorityType === 3;
  };
  // * Блокирует ли событие Projectile ?
  _.isEventIsObstacle = function(event) {
    if (event._erased) {
      return false;
    }
    if (event.isThrough()) {
      return false;
    }
    if (event._aaMapSkillVectorBlockList == null) {
      return this.isSameMapLevel(event._priorityType);
    } else {
      if (event._aaMapSkillVectorBlockList.isEmpty()) {
        return false;
      }
      return !event._aaMapSkillVectorBlockList.contains(this.skill.id());
    }
  };
  _.onHit = function(target) {
    this._hasHit = true;
    this.opacity = 0;
    //"HIT".p()
    //console.info(target)
    AABattleActionsManager.applySkillAction(this.skill.getSubject(), target, this.skill.aaSkill);
    // * Vector On Hit Actions работают отдельно, не в AABattleActionsManager
    if (target instanceof Game_Event) {
      target.aaOnVectorHit(this.skill.id());
    }
    if (!this.skill.isPhantom()) {
      AANetworkManager.endAASkillOnMap(this.skill.uniqueId);
    }
  };
})();

// ■ END Sprite_AAMapSkill2Projectile.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс для показа базовых параметров игрока HP, MP, TP
(function() {
  var Sprite_ActorStateGauge;
  Sprite_ActorStateGauge = class Sprite_ActorStateGauge extends KDCore.UI.Sprite_UIElement {
    constructor() {
      super(...arguments);
    }

    //%[I] Переделать вывод значения как у Enemy Mini HP
    defaultParams() {
      return AA.PP._getDefaultVisualFor_hpGauge();
    }

    //$[OVER]
    isCanBeEdited() {
      return this.params.isCanBeEdited === true;
    }

    //$[OVER]
    isHaveHideWithMessageFlag() {
      return this.params.isHideWithMessage === true;
    }

    drawGauge(percent) {
      return this.gauge.draw(percent);
    }

    drawText(text) {
      return this.text.draw(text);
    }

  };
  AA.link(Sprite_ActorStateGauge);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_ActorStateGauge.prototype;
  //$[OVER]
  _._createContent = function() {
    this._createGauge();
    this._createText();
    this._createLabel();
    //%[I] Делать eval для позиции
    return this.move(this.params.position);
  };
  _._createGauge = function() {
    this.gauge = new KDCore.UI.Sprite_UIGauge(this.params.gauge);
    return this.add(this.gauge);
  };
  _._createText = function() {
    this.text = new KDCore.UI.Sprite_UIText(this.params.text);
    return this.add(this.text);
  };
  _._createLabel = function() {
    var label;
    if (String.isNullOrEmpty(this.params.label)) {
      return;
    }
    label = new KDCore.UI.Sprite_UIImage();
    label.draw(this.params.label);
    label.move(this.params.labelMargins);
    return this.add(label);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс для показа иконки состояния или баффа игрока
(function() {
  var Sprite_ActorStateIcon;
  //%[I] Улучшенные настройки, чтобы можно было разным цветом рисовать цифры
  // * Можно было у состояния прописать стиль (было в AABS)
  Sprite_ActorStateIcon = class Sprite_ActorStateIcon extends KDCore.UI.Sprite_UIElement {
    constructor() {
      super(...arguments);
    }

    //@_lastIconIndex = 0
    //@_lastTextValue = null
    defaultParams() {
      return AA.PP._getDefaultActorBuffIcon();
    }

    drawBuffInfo(iconIndex, text) {
      this._drawStateIcon(iconIndex);
      this._drawBuffText(text);
    }

    drawStateInfo(iconIndex, text, isActionCounted = false) {
      this.drawBuffInfo(iconIndex, text); // * same
      if (isActionCounted === true) {
        this._drawStateActText(text); // * overwrite time text to action count text
      }
    }

    drawIcon(index) {
      return this.icon.draw(index);
    }

    drawText(text) {
      return this.text.draw(text);
    }

    clear() {
      this.drawIcon(0);
      return this.drawText("");
    }

    //$[OVER]
    isCanBeEdited() {
      return this.params.isCanBeEdited === true;
    }

  };
  AA.link(Sprite_ActorStateIcon);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_ActorStateIcon.prototype;
  //$[OVER]
  _._createContent = function() {
    this._createIcon();
    this._createText();
    return this.move(this.params.position);
  };
  _._createIcon = function() {
    this.icon = new KDCore.UI.Sprite_UIIcon(this.params.icon);
    return this.add(this.icon);
  };
  _._createText = function() {
    this.text = new KDCore.UI.Sprite_UIText(this.params.text);
    return this.add(this.text);
  };
  _._drawStateIcon = function(iconIndex) {
    //return if @_lastIconIndex == iconIndex
    this.drawIcon(iconIndex);
  };
  //@_lastIconIndex = iconIndex
  _._drawBuffText = function(text) {
    var time;
    //return if @_lastTextValue == text
    if ((text != null) && isFinite(text)) {
      time = KDCore.Utils.convertTimeShort(text);
      return this.drawText(this.params.textFormat.replace("%1", time));
    } else {
      return this.drawText(text);
    }
  };
  //@_lastTextValue = text
  _._drawStateActText = function(text) {
    //return if @_lastTextValueA == text
    if ((text != null) && isFinite(text)) {
      return this.drawText(this.params.textFormatA.replace("%1", text));
    } else {
      return this.drawText(text);
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------
//@_lastTextValueA = text


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__update, _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    AA.EV.subscribeFor("PlayerSkillSelector", this.gev_onPlayerSkillSelector.bind(this));
    return AA.EV.subscribeFor("UnderMouseEventChanged", this.gev_onUnderMouseEventChanged.bind(this));
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    // * Если в зоне навыка, подсвечиваться
    this._aaUpdate();
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  // * Создать дополнительные спрайты для ABS системы
  _.initABS = function() {
    this._aaSetupExtraInfo();
    return this._aaSetupWeaponMotionSprite();
  };
  _.isPlayer = function() {
    return this._character === $gamePlayer;
  };
  _.isABSEntity = function() {
    return (this._character != null) && this._character.isABS() && (this._character.AABattler() != null);
  };
  _.isAllyParty = function() {
    return this.isABSEntity() && this._character.AAEntity().isAlly();
  };
  _.isEnemy = function() {
    return this.isABSEntity() && this._character.AAEntity().isEnemy();
  };
  _._aaUpdate = function() {
    this._aaUpdateSelectionBlend();
    this._aaUpdateDamagePopUps();
    this._aaUpdateSpriteEffects();
    this._aaUpdateWeaponMotion();
  };
  _._aaUpdateDamagePopUps = function() {
    var b, data;
    if (!this.isABSEntity()) {
      return;
    }
    b = this._character.AABattler();
    if (!b.isDamagePopupRequested()) {
      return;
    }
    data = AADamagePopUpFactory.createDamagePopUpData(b);
    if (data != null) {
      Sprite_AADamagePopUpItem.CreateOnCharacterBinded(this._character, data.settings, data.value);
      AANetworkManager.showDamagePopUpOnCharacter(this._character, data);
    }
    this._aaRefreshExtraInfoOnDamage();
    b.clearDamagePopup();
    b.clearResult();
  };
  // * Если спрайт в зоне навыка, то подсвечивать его
  //?DYNAMIC
  _._aaUpdateSelectionBlend = function() {}; // * DUMMY
  _._aaUpdateSelectionBlendBody = function() {
    if ($gameTemp._aaSkillSelectorTargets == null) {
      return;
    }
    if ($gameTemp._aaSkillSelectorTargets.contains(this._character)) {
      return this._aaSetSelectionBySkill();
    } else {
      return this._aaResetSelectionBySkill();
    }
  };
  _._aaSetSelectionBySkill = function() {
    // * Сохраняем оригинальный цвет
    if (this.__originalBlend == null) {
      this.__originalBlend = this.getBlendColor();
    }
    this.setBlendColor(this._aaSelectBlendColor);
  };
  _._aaResetSelectionBySkill = function() {
    if (this.__originalBlend == null) {
      return;
    }
    this.setBlendColor(this.__originalBlend);
    return this.__originalBlend = null;
  };
  _.gev_onPlayerSkillSelector = function() {
    var arr;
    if (!$gamePlayer.isInSkillTargetingState()) {
      this._aaResetSelectionBySkill();
      // * Больше этот метод не будет работать
      return this._aaUpdateSelectionBlend = function() {};
    } else {
      //TODO: Один раз цвет конвертировать и сохранять в $gameTemp
      this._aaSelectBlendColor = KDCore.Color.FromHex($gamePlayer.activeAASkill().selectorColor);
      arr = [...this._aaSelectBlendColor.ARR];
      arr[3] = 150;
      this._aaSelectBlendColor = arr;
      // * Подключаем метод обновления
      return this._aaUpdateSelectionBlend = this._aaUpdateSelectionBlendBody;
    }
  };
  _.gev_onUnderMouseEventChanged = function() {
    var e;
    try {
      return this._aaRefreshExtraInfoState();
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  _._aaUpdateSpriteEffects = function() {
    this._aaUpdateSpriteEffectValues();
    if (this._character.aaIsShakeRequested()) {
      this._aaUpdateSpriteShakeEffect();
    }
    if (this._character.aaIsShatterRequested()) {
      this._aaStartSpriteShatterEffect();
    }
  };
  // * Применение дополнительных значений к базовым
  _._aaUpdateSpriteEffectValues = function() {
    this.x += this._character.aaMotionDX();
  };
  _._aaUpdateSpriteShakeEffect = function() {
    var remainingTime;
    this._character._aaShakeEffectData[0] -= 1;
    remainingTime = this._character._aaShakeEffectData[0];
    this._character._aaShakeEffectData[1] += Math.round(remainingTime * 0.4 * Math.cos(remainingTime));
    if (this._character._aaShakeEffectData[0] <= 0) {
      // * Возвращаем на 0, когда время вышло
      this._character._aaShakeEffectData[1] = 0;
    }
  };
  _._aaStartSpriteShatterEffect = function() {
    $gameMap.spriteset().aaCreateShatterEffect(this);
    this._character.aaOnShatterEffectCreated();
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //TODO: Тут стоит условие return unless @isABSEntity(), возможно если сначала событие было
  // * не АБС, а потом станет АБС, то не будет MiniHP Bar видно, проверить и исправить!
  _._aaSetupExtraInfo = function() {
    if (!this.isABSEntity()) {
      return;
    }
    // * Игрок не имеет дополнительной информации
    if (!this.isEnemy()) {
      return;
    }
    this._characterAASettings = this._character.AAEntity().model();
    if (this._characterAASettings == null) {
      return;
    }
    // * Дальше код выполняется только для Enemies Events
    this._aaSetupMiniHpGauge();
  };
  _._aaSetupMiniHpGauge = function() {
    var e, params;
    if (!AA.PP.getMiniHpGaugeSettings().active) {
      return;
    }
    params = AA.PP.uiData("enemyMiniHp", this._characterAASettings.miniHpGaugeStyle);
    this.aaMiniHPGauge = new AA.Sprite_CharacterMiniGauge(params);
    try {
      //console.log @_characterAASettings.miniHPGaugeOffset
      this.aaMiniHPGauge.setExtraMargins(...this._characterAASettings.miniHPGaugeOffset);
      this.aaMiniHPGauge.refreshPosition(0, 0); // * чтобы Margins применились безопасно
    } catch (error) {
      e = error;
      AA.w(e);
      this.aaMiniHPGauge.setExtraMargins(0, 0);
    }
    this.aaMiniHPGauge.setupController(this._character.AABattler(), "hpRate");
    if (AA.PP.getMiniHpGaugeSettings().showOnlyOnHover === true) {
      this._aaMiniHpShowHideOnHover = true;
      this.aaMiniHPGauge.hideInstant();
    }
    return this.addChild(this.aaMiniHPGauge);
  };
  _._aaRefreshExtraInfoState = function() {
    // * Использую как флаг, что у спрайта есть АБС персонаж
    if (this._characterAASettings == null) {
      return;
    }
    if (!this._aaMiniHpShowHideOnHover) {
      return;
    }
    if ($gameTemp._aaEventUnderCursor != null) {
      if ($gameTemp._aaEventUnderCursor === this._character) {
        this.aaMiniHPGauge.showSlow();
      } else {
        this.aaMiniHPGauge.hideSlow();
      }
    } else {
      this.aaMiniHPGauge.hideSlow();
    }
  };
  _._aaRefreshExtraInfoOnDamage = function() {
    if (this.aaMiniHPGauge == null) {
      return;
    }
    this.aaMiniHPGauge.refreshValues();
    // * Если всегда видно, то нет смысла
    if (AA.PP.getMiniHpGaugeSettings().showOnlyOnHover === false) {
      return;
    }
    // * Только если опция включена
    if (!AA.PP.getMiniHpGaugeSettings().showOnDamage) {
      return;
    }
    this.aaMiniHPGauge.showAndHide();
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  _._aaSetupWeaponMotionSprite = function() {
    this._aaSprWeapMotionHolder = new Sprite();
    this._aaSprWeapon = new Sprite_Weapon();
    this._aaSprWeapMotionHolder.addChild(this._aaSprWeapon);
  };
  _._aaUpdateWeaponMotion = function() {
    var b, direction, e;
    if (this._aaSprWeapMotionHolder == null) {
      return;
    }
    if (!this.isABSEntity()) {
      return;
    }
    this._aaSprWeapMotionHolder.move(this.x, this.y);
    b = this._character.AABattler();
    if (!b.isWeaponAnimationRequested()) {
      return;
    }
    if (this._aaSprWeapon == null) {
      return;
    }
    try {
      this._aaSprWeapon.setup(b.weaponImageId());
      direction = this._character.direction();
      this._aaSprWeapon.aaSetDirection(direction);
      if (direction === 8) { // * UP
        // * Ниже персонажа, так как персонаж спиной к нам
        this.parent.addChildAt(this._aaSprWeapMotionHolder, 1);
      } else {
        // * Выше персонажа
        this.parent.addChild(this._aaSprWeapMotionHolder);
      }
    } catch (error) {
      e = error;
      AA.w;
    } finally {
      b.clearWeaponAnimation();
    }
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс для показа полоски здоровья над персонажами на карте
// * Имеет свой встроенный контроллер
(function() {
  var Sprite_CharacterMiniGauge;
  //rev 30.06.2021
  Sprite_CharacterMiniGauge = class Sprite_CharacterMiniGauge extends KDCore.UI.Sprite_UIElement {
    constructor() {
      super(...arguments);
      // * По умолчанию нету доп. смещения
      // * (у каждого события может быть своё, это см. в Model)
      this.setExtraMargins(0, 0);
      return;
    }

    setupController(battler, rateGetter) {
      this.battler = battler;
      this.rateGetter = rateGetter;
      // * Если изначально в параметрах visible == false, то ничего
      if (!this.isActive()) {
        return;
      }
      this.visible = this.battler != null;
      this.controllerThread = new KDCore.TimedUpdate(10, this.refreshValues.bind(this));
    }

    defaultParams() {
      return AA.PP._getDefaultVisualFor_enemyMiniHp();
    }

    setExtraMargins(dx, dy) {
      this.dx = dx;
      this.dy = dy;
    }

    refreshPosition(x, y) {
      // * Настройки сперва (смещение)
      this._resetPosition();
      // * Затем координаты на экране
      this.x += x;
      this.y += y;
      // * Теперь дополнительные настройки
      this.x += this.dy;
      this.y += this.dy;
    }

    showInstant() {
      return this.visible = true;
    }

    showSlow() {
      if (this.visible === true && this.opacity >= 255) {
        return;
      }
      this.refreshValues();
      this.visible = true;
      this.changer = new KDCore.Changer(this);
      this.changer.change('opacity').from(0).to(255).step(35).start();
      this.showHideThread = null;
    }

    hideInstant() {
      return this.visible = false;
    }

    hideSlow() {
      if (this.visible === false) {
        return;
      }
      if (this.showHideThread != null) {
        return;
      }
      if (this.opacity <= 0) {
        return;
      }
      this.changer = new KDCore.Changer(this);
      this.changer.change('opacity').from(this.opacity).to(0).step(45).start().done(() => {
        return this.visible = false;
      });
    }

    showAndHide() {
      if (this.visible === true) {
        return;
      }
      if (this.showHideThread != null) {
        return;
      }
      this.showSlow();
      this.showHideThread = new KDCore.TimedUpdate(60, this._hideAfterTime.bind(this));
      this._updateShowHide = this._updateShowHideBody;
    }

    drawGauge(percent) {
      return this.gauge.draw(percent);
    }

    drawText(text) {
      return this.text.draw(text);
    }

    //TODO: Динамическую смену
    refreshValues() {
      var newRate;
      if (this.__prevRate == null) {
        this.__prevRate = this.battler[this.rateGetter]();
        this.drawGauge(this.__prevRate);
      } else {
        newRate = this.battler[this.rateGetter]();
        //TODO: animated?
        //if newRate < @__prevRate
        //    diff = @__prevRate - newRate
        if (newRate !== this.__prevRate) {
          this.__prevRate = newRate;
          this.drawGauge(newRate);
        }
      }
    }

    update() {
      var ref;
      super.update();
      this._updateController();
      this._updateShowHide();
      if ((ref = this.changer) != null) {
        ref.update();
      }
    }

  };
  AA.link(Sprite_CharacterMiniGauge);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Sprite_CharacterMiniGauge.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_CharacterMiniGauge.prototype;
  //$[OVER]
  _._createContent = function() {
    this._createGauge();
    this._createText();
    this._createLabel();
    return this.move(this.params.position);
  };
  _._createGauge = function() {
    this.gauge = new KDCore.UI.Sprite_UIGauge(this.params.gauge);
    return this.add(this.gauge);
  };
  _._createText = function() {
    this.text = new KDCore.UI.Sprite_UIText(this.params.text);
    return this.add(this.text);
  };
  _._createLabel = function() {
    var label;
    if (String.isNullOrEmpty(this.params.label)) {
      return;
    }
    label = new KDCore.UI.Sprite_UIImage();
    label.draw(this.params.label);
    label.move(this.params.labelMargins);
    return this.add(label);
  };
  _._updateController = function() {
    if (!this.isActive()) {
      return;
    }
    if (this.battler == null) {
      return;
    }
    return this.controllerThread.update();
  };
  _._hideAfterTime = function() {
    this.showHideThread = null;
    return this.hideSlow();
  };
  //?DYNAMIC
  _._updateShowHide = function() {}; // * EMPTY
  _._updateShowHideBody = function() {
    var ref;
    return (ref = this.showHideThread) != null ? ref.update() : void 0;
  };
})();

// ■ END Sprite_CharacterMiniGauge.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс для отображения информации о враге на экране (портрет, здоровье и т.д.)
(function() {
  var Sprite_EnemyInfo;
  Sprite_EnemyInfo = class Sprite_EnemyInfo extends KDCore.UI.Sprite_UIElement {
    constructor() {
      super(...arguments);
    }

    defaultParams() {
      return AA.PP._getDefaultVisualFor_enemyInfo();
    }

    //TODO: Уже есть в двух классах, может вынести на UIElement ???
    //(Sprite_CharacterMiniGauge)
    showSlow() {
      if (this.visible === true && this.opacity >= 255) {
        return;
      }
      this.visible = true;
      this.changer = new KDCore.Changer(this);
      this.changer.change('opacity').from(0).to(255).step(35).start();
    }

    hideSlow() {
      if (this.visible === false) {
        return;
      }
      if (this.opacity <= 0) {
        return;
      }
      this.changer = new KDCore.Changer(this);
      this.changer.change('opacity').from(this.opacity).to(0).step(45).start().done(() => {
        return this.visible = false;
      });
    }

    //$[OVER]
    isCanBeEdited() {
      return this.params.isCanBeEdited === true;
    }

    //$[OVER]
    isHaveHideWithMessageFlag() {
      return this.params.isHideWithMessage === true;
    }

    // * Value: level
    drawLevelWithFormat(value) {
      var ref;
      return (ref = this.levelText) != null ? ref.draw(this.params.levelFormat.replace("%1", value)) : void 0;
    }

    // * Values: current, max, rate
    drawHpWithFormat(value1, value2, value3) {
      var text;
      if (this.hpText == null) {
        return;
      }
      text = this.params.hpTextFormat.replace("%1", value1);
      if (value2 != null) {
        text = text.replace("%2", value2);
      }
      if (value3 != null) {
        text = text.replace("%3", value3);
      }
      return this.hpText.draw(text);
    }

    // * Value: name
    drawNameWithFormat(value) {
      var ref;
      return (ref = this.nameText) != null ? ref.draw(this.params.nameFormat.replace("%1", value)) : void 0;
    }

    drawFace(faceName, faceIndex) {
      var ref;
      return (ref = this.face) != null ? ref.draw(...arguments) : void 0;
    }

    //TODO: Отрисовка пользовательских картинок цели
    drawCustomImages() {}

    // * удаляются и отрисовываются заного
    update() {
      var ref;
      super.update();
      return (ref = this.changer) != null ? ref.update() : void 0;
    }

  };
  AA.link(Sprite_EnemyInfo);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_EnemyInfo.prototype;
  //$[OVER]
  _._createContent = function() {
    if (!this.isActive()) {
      return;
    }
    this._createBase();
    this._createGauge();
    this._createHpText();
    this._createFaceImage();
    this._createNameText();
    this._createLevelText();
    this._createBattleState();
    // * Слой для статусов и бафов
    this._statesLayer = new Sprite();
    this.addChild(this._statesLayer);
    // * Для пользовательских картинок из параметров конкретного монстра
    this._customImagesLayer = new Sprite();
    this.addChild(this._customImagesLayer);
    this._createForegroundImage();
    return this.move(this.params.position);
  };
  _._createBase = function() {
    this.base = new KDCore.UI.Sprite_UIImage(this.params);
    this.add(this.base);
  };
  _._createGauge = function() {
    this.gauge = new KDCore.UI.Sprite_UIGauge(this.params.gauge);
    this.gauge.move(this.params.gaugeMargins);
    return this.add(this.gauge);
  };
  _._createHpText = function() {
    this.hpText = new KDCore.UI.Sprite_UIText(this.params.hpText);
    return this.add(this.hpText);
  };
  _._createFaceImage = function() {
    this.face = new KDCore.UI.Sprite_UIFace(this.params.face);
    this.face.move(this.params.face.margins);
    return this.add(this.face);
  };
  _._createNameText = function() {
    this.nameText = new KDCore.UI.Sprite_UIText(this.params.nameText);
    return this.add(this.nameText);
  };
  _._createLevelText = function() {
    this.levelText = new KDCore.UI.Sprite_UIText(this.params.levelText);
    return this.add(this.levelText);
  };
  _._createBattleState = function() {
    this.battleState = new KDCore.UI.Sprite_UIImage(this.params.battleState);
    this.battleState.move(this.params.battleState.margins);
    return this.add(this.battleState);
  };
  // * Для пользователя, по умолчанию не используется
  _._createForegroundImage = function() {
    var foregroundImage;
    foregroundImage = new KDCore.UI.Sprite_UIImage(this.params.foregroundImage);
    foregroundImage.move(this.params.foregroundImage.margins);
    return this.add(foregroundImage);
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {
  var Sprite_SkillImpactSelector;
  Sprite_SkillImpactSelector = class Sprite_SkillImpactSelector extends KDCore.Sprite {
    constructor() {
      super();
      this.anchor.set(0.5);
      this.visible = false;
      this._createSelector();
      return;
    }

    activate(aaSkill) {
      this.aaSkill = aaSkill;
      this.visible = true;
      return this._applyStyle(this.aaSkill);
    }

    deactivate() {
      this.aaSkill = null;
      this.visible = false;
    }

    shake() {
      return this.shakeTime = 20;
    }

    update() {
      super.update();
      if (!this.visible) {
        return;
      }
      this.move(TouchInput);
      if (this.shakeTime >= 0) {
        this._updateShake();
      }
    }

  };
  AA.link(Sprite_SkillImpactSelector);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_SkillImpactSelector.prototype;
  // * Используем доп. слой, чтобы воссоздать Shake эффект
  _._createSelector = function() {
    this._selectorSpr = new KDCore.Sprite();
    this._selectorSpr.anchor.set(0.5);
    this.addChild(this._selectorSpr);
  };
  // * Отрисовка зонвы выбора в зависимости от параметров навыка
  _._applyStyle = function({radius, selectorColor, selectorImg, selectorOpacity}) {
    if (String.any(selectorImg)) {
      KDCore.Utils.loadImageAsync("pictures", selectorImg).then(this._applyImage.bind(this));
    } else {
      this._applyRadius(radius);
      this._applyColor(selectorColor);
    }
    this.opacity = selectorOpacity;
  };
  // * Если не задан параметр картинки, то1 будет просто квадрат
  // * Картинка не растягивается в зависимости от Radius
  // * Предполагается что разработчик сам установит соответствующую картинку
  _._applyImage = function(bitmap) {
    return this._selectorSpr.bitmap = bitmap;
  };
  _._applyRadius = function(radius) {
    if (radius <= 0) {
      this._selectorSpr.bitmap = new Bitmap(0, 0);
    } else {
      this._selectorSpr.bitmap = new Bitmap(radius * $gameMap.tileWidth(), radius * $gameMap.tileHeight());
    }
  };
  _._applyColor = function(selectorColor) {
    return this._selectorSpr.bitmap.fillAll(selectorColor.toCss());
  };
  return _._updateShake = function() {
    this.shakeTime--;
    // * Только по X
    this._selectorSpr.x += Math.round(this.shakeTime * 0.2 * Math.cos(this.shakeTime));
    if (this.shakeTime <= 0) {
      this.shakeTime = 0;
      this._selectorSpr.x = 0;
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс ячейки быстрого доступа для АБС навыка (предмета)
//rev 07.07.21
(function() {
  var Sprite_SKillPanelItem;
  Sprite_SKillPanelItem = class Sprite_SKillPanelItem extends KDCore.UI.Sprite_UIElement {
    constructor() {
      super(...arguments);
    }

    // * Позиция не определяется, так как каждый элемент имеет свою позицию
    defaultParams() {
      return AA.PP._getDefaultVisualFor_skillSlot();
    }

    //$[OVER]
    isCanBeEdited() {
      return this.params.isCanBeEdited === true;
    }

    //$[OVER]
    isHaveHideWithMessageFlag() {
      return this.params.isHideWithMessage === true;
    }

    //$[OVER]
    isUnderMouse() {
      return this.icon.isUnderMouse() && this.isFullVisible();
    }

    //TODO: Этот метод в KDCore
    isFullVisible() {
      return this.visible === true && this.allParentsIsVisible(); //TODO: Этот метод в KDCore
    }

    allParentsIsVisible() {
      var p;
      if (!this.visible) {
        return false;
      }
      if (this.parent != null) {
        p = this.parent;
        while (p != null) {
          if (p.visible === true) {
            p = p.parent;
          } else {
            return false;
          }
        }
        return true;
      } else {
        return this.visible === true;
      }
    }

    pulseClick() {
      return this.notifyOutline.pulse(this._clickedColor, this.params.outlinePulseSpeed);
    }

    pulseReady() {
      return this.notifyOutline.pulse(this._readyColor, this.params.outlinePulseSpeed);
    }

    pulseAlert() {
      return this.notifyOutline.pulse(this._badColor, this.params.outlinePulseSpeed);
    }

    hideOutline() {
      return this.notifyOutline.hide();
    }

    select() {
      return this.selectionOutline.show(this._selectionColor);
    }

    deselect() {
      return this.selectionOutline.hide();
    }

    clear() {
      this.enable();
      this.drawIcon(0);
      this.drawCount("");
      return this.drawTime("");
    }

    //@disable() #??? or @enable()
    //TODO: hide if option
    drawIcon() {
      return this.icon.draw(...arguments);
    }

    drawSymbol() {
      return this.text.draw(...arguments);
    }

    drawCount(a) {
      return this.countText.draw(...arguments);
    }

    drawTime() {
      return this.timeText.draw(...arguments);
    }

    disable() {
      this.button.disable();
      this.state.visible = true;
    }

    enable() {
      this.button.enable();
      this.state.visible = false;
    }

    switchState(isEnabled) {
      if (isEnabled === true) {
        if (this.isDisabled()) {
          this.enable();
          return true; // * Вновь доступна
        }
      } else {
        if (!this.isDisabled()) {
          this.disable();
        }
      }
      return false;
    }

    isDisabled() {
      return this.state.visible === true;
    }

  };
  AA.link(Sprite_SKillPanelItem);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_SKillPanelItem.prototype;
  _._createContent = function() {
    this._initColors();
    this._createOutline();
    this._createMain();
    this._createIcon();
    //@_createImage() #TODO: if item have image instead icon
    // * Disabled darker hover image
    this._createState();
    this._createInfo();
  };
  _._initColors = function() {
    this._tryConvertColor("_selectionColor", "selectedOutlineColor");
    this._tryConvertColor("_clickedColor", "clickedOutlineColor");
    this._tryConvertColor("_readyColor", "readyOutlineColor");
    this._tryConvertColor("_badColor", "badOutlineColor");
  };
  _._tryConvertColor = function(colorFieldName, paramName) {
    var e;
    try {
      this[colorFieldName] = KDCore.Color.FromHex(this.params[paramName]).ARR;
    } catch (error) {
      e = error;
      AA.w(e);
      this[colorFieldName] = [0, 0, 0, 1];
    }
  };
  _._createOutline = function() {
    this.notifyOutline = new AA.Sprite_SkillPanelOutline();
    this.notifyOutline.move(this.params.outlineMargins);
    this.add(this.notifyOutline);
    this.selectionOutline = new AA.Sprite_SkillPanelOutline();
    this.selectionOutline.move(this.params.outlineMargins);
    this.add(this.selectionOutline);
  };
  _._createMain = function() {
    this.button = new KDCore.ButtonM("SkillSlot", false, "Alpha");
    this.button.addClickHandler(() => {
      if (this.isFullVisible()) {
        return $gamePlayer.aaTryPerformSkill(this.skillId);
      }
    });
    return this.add(this.button);
  };
  _._createIcon = function() {
    this.icon = new KDCore.UI.Sprite_UIIcon(this.params.icon);
    this.icon.move(this.params.iconMargins);
    this.add(this.icon);
  };
  /*
  size = @params.icon.size
  if size > 32
      icon_x = @icon
      @button.isUnderMouse = -> icon_x.isUnderMouse()
  */
  _._createState = function() {
    this.state = new KDCore.UI.Sprite_UIImage();
    this.state.draw("SkillSlot_Disabled");
    this.state.visible = false;
    return this.add(this.state);
  };
  _._createInfo = function() {
    this._createTimer();
    this._createCountText();
    return this._createSymbolText();
  };
  _._createTimer = function() {
    this.timeText = new KDCore.UI.Sprite_UIText(this.params.timeText);
    return this.add(this.timeText);
  };
  _._createCountText = function() {
    this.countText = new KDCore.UI.Sprite_UIText(this.params.countText);
    return this.add(this.countText);
  };
  _._createSymbolText = function() {
    this.text = new KDCore.UI.Sprite_UIText(this.params.symbolText);
    return this.add(this.text);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс подсветки (вокруг) ячейки быстрого доступа
//rev 07.07.21
(function() {
  var Sprite_SkillPanelOutline;
  Sprite_SkillPanelOutline = class Sprite_SkillPanelOutline extends KDCore.UI.Sprite_UIImage {
    constructor() {
      super(...arguments);
      this.visible = false;
    }

    defaultParams() {
      return {
        visible: true,
        image: "SkillSlot_Outline"
      };
    }

    show(colorArr) {
      this.visible = true;
      if (this._changer != null) {
        this._changer = null;
      }
      this.setBlendColor(colorArr);
      this.opacity = 255;
    }

    hide() {
      if (this._changer != null) {
        this._changer = null;
      }
      return this.visible = false;
    }

    pulse(colorArr, speed) {
      this.show(colorArr);
      this.opacity = 0;
      this._changer = new KDCore.Changer(this);
      this._changer.change('opacity').from(0).to(255).step(speed).repeat(2).reverse();
      this._changer.start().done(() => {
        return this.hide();
      });
    }

    update() {
      var ref;
      super.update();
      return (ref = this._changer) != null ? ref.update() : void 0;
    }

  };
  AA.link(Sprite_SkillPanelOutline);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Sprite_SkillPanelOutline.prototype;
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс заглушка для подсветки (вокруг) ячейки быстрого доступа
// * Используется если отключён параметр плагина
// * Все методы данного класса ПУСТЫЕ
(function() {
  var Sprite_SkillPanelOutlineDummy;
  Sprite_SkillPanelOutlineDummy = class Sprite_SkillPanelOutlineDummy extends Sprite {
    constructor() {
      super();
    }

    defaultParams() {
      return {};
    }

    show(colorArr) {}

    hide() {}

    pulse(colorArr, speed) {}

  };
  AA.link(Sprite_SkillPanelOutlineDummy);
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Weapon.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__update, _;
  //@[DEFINES]
  _ = Sprite_Weapon.prototype;
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    var ref;
    ALIAS__update.call(this);
    if ((ref = this._aaOpChanger) != null) {
      ref.update();
    }
  };
  //$[OVER]
  //TODO: setting for user
  _.animationWait = function() {
    return 6;
  };
})();

// ■ END Sprite_Weapon.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Weapon.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Weapon.prototype;
  // * Настройки анимации оружия для ABS карты
  //TODO: settings to user for each type (scale, dx, dy)
  _.aaSetDirection = function(direction) {
    this.scale.x = 0.7;
    this.scale.y = this.scale.x;
    this.x = this.y = 0;
    switch (direction) {
      case 6:
        this.x = 12;
        this.scale.x *= -1;
        break;
      case 4:
        this.x = -12;
        break;
      case 2:
        this.y = 0;
        break;
      default:
        this.y = -10;
    }
    // * Начало в прозрачности (небольшой эффект)
    //TODO: тоже опция
    this._aaOpChanger = new KDCore.Changer(this);
    this._aaOpChanger.change('opacity').from(60).to(255).step(20).speed(1);
    this._aaOpChanger.start().done(() => {
      return this._aaOpChanger = null;
    });
  };
})();

// ■ END Sprite_Weapon.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createCharacters, ALIAS__createTilemap, ALIAS__createUpperLayer, ALIAS__initialize, ALIAS__update, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    this._aaMapAnimationSprites = [];
    this._aaMapSpriteEffects = [];
    this._aaMapDynamicSprites = [];
  };
  //@[ALIAS]
  ALIAS__createUpperLayer = _.createUpperLayer;
  _.createUpperLayer = function() {
    this.aaCreateExtraMapUpLayer();
    this.aaCreateDamagePopUpLayer();
    return ALIAS__createUpperLayer.call(this);
  };
  //@[ALIAS]
  ALIAS__createTilemap = _.createTilemap;
  _.createTilemap = function() {
    ALIAS__createTilemap.call(this);
    this.aaCreateExtraMapDownLayer();
    this.aaCreateSkillImpactSelector();
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    this.aaRefreshMapAnimation();
    this.aaUpdateShatterEffect();
    return this.aaUpdateDynamicSprites();
  };
  
  //@[ALIAS]
  ALIAS__createCharacters = _.createCharacters;
  _.createCharacters = function() {
    ALIAS__createCharacters.call(this);
    this.aaCreateMapSkills();
    AA.EV.subscribeFor("MapSkillsRequestsClean", this._aaClearMapSkills.bind(this));
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  (function() {    // * Анимация на карте
    // -----------------------------------------------------------------------
    //TODO: Учёт позиционированния анимации ??? (см. в редакторе alignBottom)

    //TODO: Через GEvent событие? (оптимизация)
    _.aaRefreshMapAnimation = function() {
      if ($gameMap.aaIsMapAnimationRequested()) {
        this.aaSetupMapAnimation($gameMap.aaMapAnimations.shift());
      } else {
        this.aaClearMapAnimations();
      }
    };
    _.aaSetupMapAnimation = function(animationRequest) {
      var animation, animationId, spr, tempChar, x, y;
      if (animationRequest == null) {
        return;
      }
      ({x, y, animationId} = animationRequest);
      animation = $dataAnimations[animationId];
      if (animation == null) {
        KDCore.warning("Animation with ID " + animationId + " not found!");
        return;
      }
      // * Создаём временного персонажа как координата карты
      tempChar = new Game_Character();
      tempChar.setPosition(x, y);
      spr = new Sprite_Character(tempChar);
      this._aaMapAnimationSprites.push(spr);
      this._characterSprites.push(spr);
      this._effectsContainer.addChild(spr);
      AABattleActionsManager.playAnimationOnCharacter(tempChar, animationId);
    };
    // * Очистка анимаций карты
    _.aaClearMapAnimations = function() {
      if (this._aaMapAnimationSprites.length === 0) {
        return;
      }
      // * Если нет никаких анимаций на карте, то удаляем всех созданных "временных" персонажей для анимаций
      if (this._animationSprites.length === 0) {
        this._aaMapAnimationSprites = [];
      }
    };
  })();
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  (function() {    // * Дополнительные слои (под и над персонажами, но на карте)
    // -----------------------------------------------------------------------
    // * Под персонажами
    _.aaCreateExtraMapDownLayer = function() {
      this._aaLayer01 = new Sprite();
      this._aaLayer01.z = 1;
      this._tilemap.addChild(this._aaLayer01);
    };
    // * Над персонажами
    _.aaCreateExtraMapUpLayer = function() {
      this._aaLayer02 = new Sprite();
      this.addChild(this._aaLayer02);
    };
    _.aaCreateDamagePopUpLayer = function() {
      this._aaPopUpLayer = new Sprite();
      this._aaLayer02.addChild(this._aaPopUpLayer);
    };
    _.aaGetDamagePopUpLayer = function() {
      return this._aaPopUpLayer;
    };
    //TODO: Может над персонажами?
    _.aaCreateSkillImpactSelector = function() {
      this._aaSkillImpactSelector = new AA.Sprite_SkillImpactSelector();
      this._aaLayer01.addChild(this._aaSkillImpactSelector);
      AA.UI.setSkillImpactSelector(this._aaSkillImpactSelector);
    };
  })();
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  (function() {    
    // * Эффект Shatter на карте
    // -----------------------------------------------------------------------
    _.aaCreateShatterEffect = function(characterSprite) {
      var char, effectBase, i, j, k, l, len, maxw, pSize, part, ph, pw, ref, shatterEffectsSet, sx, sx2, sy, sy2, x, y, y3, y_perc;
      char = characterSprite._character;
      effectBase = new Sprite();
      this._tilemap.addChild(effectBase);
      this.aaRegisterDynamicSprite(effectBase, char, -characterSprite.width / 2, -characterSprite.height);
      x = char._aaShatterEffectData[3];
      y = char._aaShatterEffectData[4];
      shatterEffectsSet = [];
      pSize = 8;
      pw = characterSprite.patternWidth();
      ph = characterSprite.patternHeight();
      maxw = Math.floor((pw / pSize) * (ph / pSize));
      if (characterSprite._tileId > 0) {
        sx = (Math.floor(characterSprite._tileId / 128) % 2 * 8 + characterSprite._tileId % 8) * pw;
        sy = Math.floor(characterSprite._tileId % 256 / 8) % 16 * ph;
      } else {
        sx = (characterSprite.characterBlockX() + characterSprite.characterPatternX()) * pw;
        sy = (characterSprite.characterBlockY() + characterSprite.characterPatternY()) * ph;
      }
      for (i = j = 0, ref = maxw; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        shatterEffectsSet[i] = new Sprite(characterSprite.bitmap);
        shatterEffectsSet[i].anchor.set(0.5);
        l = Math.floor(pSize * i / pw);
        x = pSize * i - (l * pw);
        y = Math.floor(l * pSize);
        y_perc = pSize * (i + 1) / Math.floor(pw / pSize) / ph;
        y3 = Math.floor(l * pSize);
        if (y >= ph - pSize) {
          y = ph - pSize;
        }
        sx2 = sx + x;
        sy2 = Math.floor(sy + y);
        shatterEffectsSet[i].x = x;
        shatterEffectsSet[i].y = y;
        shatterEffectsSet[i].y_perc = y_perc;
        shatterEffectsSet[i].setFrame(sx2, sy2, pSize, pSize);
        effectBase.addChild(shatterEffectsSet[i]);
        this._aaCreateShatterPartAnimation(shatterEffectsSet[i], char._aaShatterEffectData[3], char._aaShatterEffectData[4]);
      }
      for (k = 0, len = shatterEffectsSet.length; k < len; k++) {
        part = shatterEffectsSet[k];
        this._aaMapSpriteEffects.push(part);
      }
    };
    _._aaCreateShatterPartAnimation = function(sprite, x, y) {
      var r, sx, sy;
      sx = Math.random() * x + 0.1;
      sy = (Math.random() * 0.3) + 0.7 * y;
      r = Math.randomInt(2);
      if (r !== 0) {
        sx *= -1;
      }
      sprite.sx = sx;
      sprite.sy = sy;
      sprite.op = (Math.random() * 2) + 2.0;
      sprite.sc = 0;
      sprite.rt = (Math.random() + 0.5) * 0.1;
    };
    _._aaUpdateShatterEffectPartSprite = function(part) {
      var g, ground;
      if (part == null) {
        return;
      }
      g = 0.16;
      ground = 24 * (1 - part.y_perc) + 72 * part.y_perc;
      if (part.y < ground) {
        part.sy += g;
        part.rt = (Math.random() + 0.5) * 0.1;
      } else {
        part.sy = Math.min(-2, part.sy * (-0.5));
      }
      part.y += part.sy;
      part.x += part.sx;
      part.opacity -= part.op;
      part.scale.x += part.sc;
      part.scale.y += part.sc;
      part.rotation += part.rt;
    };
    _.aaUpdateShatterEffect = function() {
      var j, len, part, ref;
      ref = this._aaMapSpriteEffects;
      for (j = 0, len = ref.length; j < len; j++) {
        part = ref[j];
        this._aaUpdateShatterEffectPartSprite(part);
        if (part.opacity <= 0) {
          this._aaDeleteShatterEffectPartSprite(part);
          return;
        }
      }
    };
    // * Выход из цикла, так как удалили элемент
    _._aaDeleteShatterEffectPartSprite = function(part) {
      var parent;
      // * Смотрим родителя
      parent = part.parent;
      parent.removeChild(part);
      // * Если у него больше нет частей
      if (parent.children.length === 0) {
        // * Удаляем его из динамических спрайтов
        this._aaMapDynamicSprites.delete(parent);
      }
      this._aaMapSpriteEffects.delete(part);
    };
  })();
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  // * Добавить спрайт нового события
  _.aaAddSpawnedEvent = function(event) {
    var charSpr, e;
    try {
      charSpr = new Sprite_Character(event);
      this._characterSprites.push(charSpr);
      this._tilemap.addChild(charSpr);
      charSpr.update();
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  // * Регестрирует спрайт как статический на карте (не движется с экраном)
  // * Требует привязки к персонажу на карте, позволяет задать смещение
  _.aaRegisterDynamicSprite = function(sprite, character, dx = 0, dy = 0) {
    this._aaMapDynamicSprites.push(sprite);
    sprite._aaDynamicParent = character;
    sprite._aaDynX = dx;
    sprite._aaDynY = dy;
  };
  // * Удалить динамический спрайт
  // * Используется также для PopUp, они сами себя удаляют
  _.aaRemoveDynamicSprite = function(sprite) {
    if (this._aaMapDynamicSprites.contains(sprite)) {
      this._aaMapDynamicSprites.delete(sprite);
    }
  };
  // * Обновление динамических спрайтов (обновление позиции относительно камеры)
  _.aaUpdateDynamicSprites = function() {
    var dx, dy, i, len, p, ref, sprite;
    ref = this._aaMapDynamicSprites;
    for (i = 0, len = ref.length; i < len; i++) {
      sprite = ref[i];
      if ((sprite != null) && (sprite._aaDynamicParent != null)) {
        p = sprite._aaDynamicParent;
        dx = sprite._aaDynX;
        dy = sprite._aaDynY;
        sprite.move(p.screenX() + dx, p.screenY() + dy);
      } else {
        this.aaRemoveDynamicSprite(sprite);
      }
    }
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  _.aaCreateMapSkills = function() {
    var i, j, ref;
    this._aaMapSkills = [];
// * Создаём уже существующие (зарегестрированные) на карте
    for (i = j = 0, ref = $gameMap.aaMapSkills().length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      this.aaCreateNewMapSkill(i);
    }
  };
  _.aaCreateNewMapSkill = function(index) {
    var skill, sprite;
    skill = $gameMap.aaMapSkills()[index];
    if (skill == null) {
      return;
    }
    sprite = new Sprite_AAMapSkill2Projectile(index);
    this._aaMapSkills[index] = sprite;
    this._tilemap.addChild(sprite);
  };
  //@[EVENT]
  _._aaClearMapSkills = function() {
    var i, j, ref;
    for (i = j = 0, ref = $gameMap.aaMapSkills().length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      if (!this._aaMapSkills[i] || this._aaMapSkills[i].isEnd()) {
        this._tilemap.removeChild(this._aaMapSkills[i]);
        this._aaMapSkills[i] = null;
        $gameMap.aaMapSkills()[i] = null;
      }
    }
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Интерфейс AABS на карте
(function() {
  var Spriteset_UI;
  Spriteset_UI = class Spriteset_UI extends Sprite {
    constructor() {
      super();
      this._init(); //#Spriteset_UI_0
      this.applyUserSettings(); // * Применить настройки игрока
    }

    isActive() {
      return this.visible === true;
    }

    show() {
      return this.visible = true;
    }

    hide() {
      return this.visible = false;
    }

    terminate() {
      this._terminateElements(); //#Spriteset_UI_0
      this.visible = false;
    }

    // * Обновить все контроллеры и элементы
    refresh() {
      var controller, i, len, ref;
      ref = this.controllers;
      for (i = 0, len = ref.length; i < len; i++) {
        controller = ref[i];
        controller.refresh();
      }
    }

    onGameMessageStart() {
      return this.getElementsWithMessageFlag().forEach(function(e) {
        return e.opacity = 50;
      });
    }

    onGameMessageEnd() {
      return this.getElementsWithMessageFlag().forEach(function(e) {
        return e.opacity = 255;
      });
    }

    // * Применить пользовательские настройки ко всем элементам
    applyUserSettings() {
      var e, i, len, ref, user;
      user = $gameSystem.aaGetUserUISettings();
      this._applyVisibility(user);
      ref = this.elements;
      for (i = 0, len = ref.length; i < len; i++) {
        e = ref[i];
        if (user.isHaveFor(e.tag)) {
          //#Spriteset_UI_0
          this._applyUserSettingsFor(e, user);
        }
      }
    }

    // * Обновить элемент (применить настройки)
    refreshElement(tag) {
      var element;
      element = this.getElement(tag);
      if (element == null) {
        return;
      }
      this._applyUserSettingsFor(element, $gameSystem.aaGetUserUISettings()); //#Spriteset_UI_0
    }

    // * Обновить контроллер элемента
    refreshController(tag) {
      var controller;
      controller = this.getController(tag);
      if (controller == null) {
        return;
      }
      controller.refresh();
    }

    // * Восстановить настройки элемента
    resetElement(tag) {
      var element;
      element = this.getElement(tag);
      if (element == null) {
        return;
      }
      element.reset("position");
      element.reset("visible");
    }

    getElement(tag) {
      return this.elements.find(function(e) {
        return e.tag === tag;
      });
    }

    getController(tag) {
      return this.controllers.find(function(c) {
        return c.tag === tag;
      });
    }

    // * Данный метод "собирает" один раз
    getElementsWithMessageFlag() {
      if (this._elementsWithMessageFlag == null) {
        this._elementsWithMessageFlag = this.elements.filter(function(e) {
          return e.isHaveHideWithMessageFlag();
        });
      }
      return this._elementsWithMessageFlag;
    }

  };
  AA.link(Spriteset_UI);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.Spriteset_UI.prototype;
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_UI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Spriteset_UI.prototype;
  _._init = function() {
    // * Регестрирует себя в менеджере
    AA.UI.setUI(this);
    // * Набор всех элементов
    this.elements = [];
    // * Набор всех контроллеров
    this.controllers = [];
    // * Набор всех компонентов
    this.uiSets = [];
    //TODO: Загрузка всех компонентов из параметров и подготовка
    return this._create();
  };
  // * Дополнительное закрытие элементов (перед закрытием всего UI)
  _._terminateElements = function() {
    return this._terminateSkillSelectorWindow(); //#Spriteset_UI_SkillsSet
  };
  
  // * Получить все элементы
  // * Обновить элемент по тэгу
  // * (возможно) Обновить все элементы
  // * Получить элемент по тэгу
  _._create = function() {
    this._createLowerUILayer();
    this._createNormalUILayer();
    return this._createElements();
  };
  // * Нижний слой нужен для пользовательских UI элементов, которые должны быть ниже UI
  _._createLowerUILayer = function() {
    this.lowerLayer = new Sprite();
    return this.addChild(this.lowerLayer);
  };
  _._createNormalUILayer = function() {
    this.layer = new Sprite();
    return this.addChild(this.layer);
  };
  _._createElements = function() {
    return this._createDefaultElements();
  };
  //@_createUserElements()
  _._createDefaultElements = function() {
    this._createSkillsSet(); //#Spriteset_UI_SkillsSet
    this._createSkillSelectorWindow(); //#Spriteset_UI_SkillsSet
    this._createActorUI(); //#Spriteset_UI_ActorUI
    return this._createTargetUI(); //#Spriteset_UI_Target
  };
  
  // * Добавить набор и зарегестрировать все элементы и контроллеры из набора
  _._registerUISet = function(uiSet) {
    this.elements.push(...uiSet.elements);
    this.controllers.push(...uiSet.controllers);
    this.uiSets.push(uiSet);
    this._addElementToUI(uiSet);
  };
  // * Добавить элемент на обычный слой (выше пользовательских)
  _._addElementToUI = function(sprite) {
    return this.layer.addChild(sprite);
  };
  // * Применить пользовательские настройки к элементу
  _._applyUserSettingsFor = function(element, settings) {
    var key, pos, visible;
    key = element.tag;
    pos = settings.getPositionFor(key);
    if (pos != null) {
      element.move(pos.x, pos.y);
    } else {
      element.reset("position");
    }
    visible = settings.getVisibleFor(key);
    if (visible != null) {
      element.visible = visible;
    } else {
      element.reset("visible");
    }
  };
  
  // * Обновить видимость всего UI
  _._applyVisibility = function(settings) {
    var visible;
    if (!settings.isHaveFor("main")) {
      this.show(); // * По стандарту, всегда видно
      return;
    }
    visible = settings.getVisibleFor("main");
    if (visible != null) {
      if (visible === true) {
        return this.show();
      } else {
        return this.hide();
      }
    } else {
      return this.show(); // * По стандарту, всегда видно
    }
  };
})();

// ■ END Spriteset_UI.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_UI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Spriteset_UI.prototype;
  _._createActorUI = function() {
    this._createActorGauges();
    this._createActorBuffsIcons();
    return this._createActorStatesIcons();
  };
  _._createActorGauges = function() {
    this.sActorGauges = new AA.UISet_ActorGauges(this);
    return this._registerUISet(this.sActorGauges); //# Spriteset_UI_0
  };
  _._createActorBuffsIcons = function() {
    if (!AA.PP.getIsBuffsVisible()) {
      return;
    }
    this.sActorBuffs = new AA.UISet_ActorBuffsIcons(this);
    return this._registerUISet(this.sActorBuffs); //# Spriteset_UI_0
  };
  _._createActorStatesIcons = function() {
    if (!AA.PP.getIsStatesVisible()) {
      return;
    }
    this.sActorStates = new AA.UISet_ActorStatesIcons(this);
    return this._registerUISet(this.sActorStates); //# Spriteset_UI_0
  };
})();

// ■ END Spriteset_UI.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_UI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Spriteset_UI.prototype;
  _._createSkillsSet = function() {
    this.sSkills = new AA.UISet_Skills(this);
    return this._registerUISet(this.sSkills); //# Spriteset_UI_0
  };
  _._createSkillSelectorWindow = function() {
    //TODO: Ширина и высота из параметров
    this.fwSkillsSelector = new FWindow_SkillSelect(this, 160, 360);
    return this._addElementToUI(this.fwSkillsSelector);
  };
  _._terminateSkillSelectorWindow = function() {
    var ref;
    return (ref = this.fwSkillsSelector) != null ? ref.close() : void 0;
  };
})();

// ■ END Spriteset_UI.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_UI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = AA.Spriteset_UI.prototype;
  _._createTargetUI = function() {
    //TODO: А если не активен?
    this.sTargetInfo = new AA.UISet_TargetInfo(this);
    return this._registerUISet(this.sTargetInfo); //# Spriteset_UI_0
  };
})();

// ■ END Spriteset_UI.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {
  var StatesIconsController;
  
    //%[I] Опция (параметр плагина), чтобы можно было выбрать какие состояния показывать (все или только АБС)

    //%[I] Показывать и количество шагов и количество урона до снятия состояния (разными цветами)

    //%[I] Показывать подсказки при наведении мыши на иконку состояния

    // * Общий контроллер для отрисовки состояний (states) персонажа (игрока)
  //?rev 25.02.22
  StatesIconsController = class StatesIconsController extends AA.BuffIconsController {
    constructor() {
      super(...arguments);
      // * Нет ограничения (8)
      this.maxCount = this.buffSprites.length;
      return;
    }

    collectStates() {
      var i, j, ref, states;
      states = this.source._states.map(function(s) {
        return $dataStates[s];
      });
      // * Отсортировать по Priority
      states.sort(function(a, b) {
        if (a.priority > b.priority) {
          return -1;
        } else {
          return 1;
        }
      });
      // * Режиме редактора, мы дополним состоянием 1, чтобы визуально было видно
      if (AA.System.isUIEditor() && states.length < this.maxCount) {
        for (i = j = 0, ref = this.maxCount - states.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          states.push($dataStates[1]);
        }
      }
      return states;
    }

    getStateObj(stateId) {
      return $dataStates[stateId];
    }

    collectStateTurns(stateId) {
      return this.source.aaStates.getDisplayValueForState(stateId);
    }

    isAAState(state) {
      return AA.Utils.isAAState(state);
    }

    isAAStateIsActionBased(state) {
      return this.isAAState(state) && state.AAState.isActionEndState();
    }

    isAAStateHaveAnyTurns(state) {
      return this.isAAState(state) && (this.isAAStateIsActionBased(state) || state.AAState.isTimeEndState());
    }

  };
  AA.link(StatesIconsController);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.StatesIconsController.prototype;
  //$[OVER]
  _._refresh = function() {
    var e, i, j, ref, ref1, state, states;
    states = this.collectStates();
    if (states.isEmpty()) {
      this._clearAll();
    } else {
      for (i = j = 0, ref = this.maxCount; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        state = states[i];
        if (state != null) {
          try {
            this._drawStateInfo(state, i);
          } catch (error) {
            e = error;
            AA.w(e);
          }
        } else {
          if ((ref1 = this.buffSprites[i]) != null) {
            ref1.clear();
          }
        }
      }
    }
  };
  _._drawStateInfo = function(state, i) {
    var icon, isAction, isShouldHaveText, ref, text, turns;
    icon = state.iconIndex;
    isAction = false;
    text = "";
    if (this.isAAState(state)) {
      isShouldHaveText = this.isAAStateHaveAnyTurns(state);
      if (isShouldHaveText === true) {
        isAction = this.isAAStateIsActionBased(state);
        turns = this.collectStateTurns(state.id);
        if (turns > 0) {
          text = turns;
        }
      }
    }
    return (ref = this.buffSprites[i]) != null ? ref.drawStateInfo(icon, text, isAction) : void 0;
  };
  _._clearAll = function() {
    var e, j, len, ref, results, spr;
    try {
      ref = this.buffSprites;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        spr = ref[j];
        results.push(spr != null ? spr.clear() : void 0);
      }
      return results;
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Глабольный набор вспомогательных функций для пользователя
var uAPI;

uAPI = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //TODO: Execute SAction (global)

  //@[DEFINES]
  _ = uAPI;
  (function() {    // * Панель навыков
    // -----------------------------------------------------------------------
    // * Добавить навык на панель навыков
    // * 0 - убрать из слота
    // * slotSymbol == null - в любое не занятое место
    _.setSkillToPanel = function(skillId, slotSymbol) {
      var e, ref, ref1, ref2;
      try {
        if (slotSymbol != null) {
          slotSymbol = slotSymbol.toString();
        }
        if (skillId <= 0) { // * Удаляем навык из панели
          if (AA.Utils.isSkillPanelSymbol(slotSymbol)) {
            if ((ref = $gamePlayer.aaSkillsSet) != null) {
              ref.setSymbolForSkill(0, slotSymbol, null); // * Устанавливаем навык на панель
            }
          }
        } else {
          // * Если НАВЫК, то должен быть изучен
          if (AA.Utils.isAASkill(skillId)) {
            if (!$gamePlayer.aaIsHaveABSSkill(skillId)) {
              return;
            }
          }
          // * Предметы можно устанавливать, даже если нет в инвентаре (будет 0)
          if (AA.Utils.isSkillPanelSymbol(slotSymbol)) {
            if ((ref1 = $gamePlayer.aaSkillsSet) != null) {
              ref1.setSymbolForSkill(skillId, slotSymbol, null); // * Если символ не указан (или указан неверно, то устанавливаем в свободное место)
            }
          } else {
            if ((ref2 = $gamePlayer.aaSkillsSet) != null) {
              ref2.setSkillInEmptySlot(skillId);
            }
          }
        }
        AA.UI.refreshElement('skills');
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    // * Добавить предмет на панель навыков, поддерживает как обычные ID, так и idA
    _.setItemToPanel = function(itemId, slotSymbol) {
      var e;
      try {
        // * Автоматическое преобразование в ID предмета
        if (itemId > 0 && !AA.Utils.isAAItem(itemId)) {
          itemId += AA.Utils.ItemsIDStart;
        }
        this.setSkillToPanel(itemId, slotSymbol);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    // * Если навыка нет или неверно указан slotSymbol - будет возвращён 0
    _.getSkillIdFromPanel = function(slotSymbol) {
      var ref;
      if (slotSymbol != null) {
        slotSymbol = slotSymbol.toString();
      }
      return (ref = $gamePlayer.aaSkillsSet) != null ? ref.getSkillForSymbol(slotSymbol) : void 0;
    };
    // * Безопасно обновить панель навыков
    return _.refreshSkillPanelSafe = function() {
      setTimeout((function() {
        var e;
        try {
          if (KDCore.Utils.isSceneMap() && !SceneManager.isSceneChanging()) {
            return AA.UI.refreshElement('skills');
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }), 1);
    };
  })();
  (function() {    // * Система АБС
    // -----------------------------------------------------------------------
    _.pauseABS = function() {
      return AA.System.pauseABS();
    };
    return _.resumeABS = function() {
      return AA.System.resumeABS();
    };
  })();
  (function() {    // * Интерфейс АБС
    // -----------------------------------------------------------------------
    _.editUI = function() {
      var e;
      try {
        if (!AA.isPro()) {
          window.alert("UI Editor available only in [PRO] version of plugin");
          return;
        }
        if (AA.isMap()) {
          return SceneManager.push(AA.Scene_UIEditor);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.controlUIElement = function() {
      var e, user;
      try {
        user = $gameSystem.aaGetUserUISettings();
        user.set(...arguments);
        return AA.UI.refreshElement(arguments[0]);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.showUI = function() {
      var e, user;
      try {
        user = $gameSystem.aaGetUserUISettings();
        // * Просто удаляем настройки, так как по умолчанию интерфейс всегда видно
        // * других настроек у интерфейса нету
        user.set("main", "clear");
        return AA.UI.show();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //TODO: Кнопки нажимаются напанели, даже если скрытый интерфейс
    //TODO: Надо метод isValid дополнить (который в AA.UI) и делать проверки
    _.hideUI = function() {
      var e, user;
      try {
        user = $gameSystem.aaGetUserUISettings();
        user.set("main", "setVisible", false);
        return AA.UI.hide();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //TODO: Этот метод добавить в SActions !!!
    //TODO: show on map point, show on screen point
    _.showPopUpOnChar = function(charId, styleId, value, isVariable) {
      var char, e, settings;
      try {
        if (!KDCore.Utils.isSceneMap()) {
          return;
        }
        if (value > 0 && isVariable === true) {
          value = $gameVariables.value(value);
        }
        if (charId === 0) {
          char = $gamePlayer;
        } else {
          char = $gameMap.event(charId);
        }
        settings = AA.PP.getPopUpDamageSettings(styleId);
        if (settings == null) {
          AA.w("PopUp settings with ID " + styleId + " not found!");
        } else {
          Sprite_AADamagePopUpItem.CreateOnCharacterBinded(char, settings, value);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //TODO: Доделать и надо Wiki страницу и демку карту с примерами
    _.showPopUpOnMap = function() {};
    _.showPopUpOnScreen = function() {};
    return _.resetUserUISettings = function() {
      var user;
      user = $gameSystem.aaGetUserUISettings();
      user.settings = {}; // * reset all
      user.saveGlobalSettings();
    };
  })();
  (function() {    // * Камера
    // -----------------------------------------------------------------------
    //#AA.UI.refreshAllElements()
    // * Активировать скролл камеры
    _.enableMapScroll = function() {
      var e;
      try {
        Scene_Map.prototype.aaUpdateMapScrlByMouse = Scene_Map.prototype.aaUpdateMapScrlByMouseBody;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Отключить скролл камеры
    _.disableMapScroll = function() {
      var e;
      try {
        if ($gameTemp.aaIsMapScrolled()) {
          this.resetMapScroll();
        }
        Scene_Map.prototype.aaUpdateMapScrlByMouse = function() {}; // * EMPTY
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Сбросить скролл камеры (на центр - игрок)
    return _.resetMapScroll = function() {
      var e;
      try {
        $gamePlayer.center($gamePlayer.x, $gamePlayer.y);
        $gameTemp.aaSetMapScrolled(false);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
  (function() {    // * Управление объектами
    // -----------------------------------------------------------------------
    // * Получить опыт за врага по номеру в БД (isVisible == true -> PopUp)
    _.gainExpForEnemyDb = function(enemyId, isVisible = true) {
      var e, enemy, expValue;
      try {
        enemy = $dataEnemies[enemyId];
        if (enemy == null) {
          return;
        }
        expValue = AA.Utils.getExpFromAAEnemy(enemy);
        $gameParty.aaGainExpForParty(expValue, isVisible);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    // * Получить опыт за врага по номеру события
    return _.gainExpForEnemyEv = function(eventId, isVisible = true) {
      var e, event, expValue, expVarId;
      try {
        event = $gameMap.event(eventId);
        if (event == null) {
          return;
        }
        // * Событие не АБС и не было АБС ранее
        if (event.aaEventSettings == null) {
          return;
        }
        // * Если есть специальная переменная для опыта, сразу из неё
        expVarId = event.aaEventSettings.getExpVarId();
        if (expVarId > 0) {
          expValue = $gameVariables.value(expVarId);
          $gameParty.aaGainExpForParty(expValue, isVisible);
        } else {
          this.gainExpForEnemyDb(event.aaEventSettings.getEnemyId());
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
  })();
  (function() {    // * Спавн врагов
    // -----------------------------------------------------------------------
    // * Спавн врага в точке {X, Y} или в случайной точке в регионе Х
    //?Все аргументы - Extended Values
    _.spawnEnemy = function(id, xOrRegion, y) {
      var e;
      $gameTemp.aaLastSpawnedEvent = null;
      if (!DataManager.aaIsSpawnMapValid()) {
        console.warn("You try spawn Enemy, but not setup Spawn Map ID in Plugin Parameters");
      } else {
        try {
          id = KDCore.Utils.getEValue(id);
          xOrRegion = KDCore.Utils.getEValue(xOrRegion);
          y = KDCore.Utils.getEValue(y);
          if (y != null) {
            $gameMap.aaSpawnEnemyInPoint(id, xOrRegion, y);
          } else {
            $gameMap.aaSpawnEnemyInRegion(id, xOrRegion);
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }
    };
    // * Спавн врага (без проверок)
    _.spawnEnemyForced = function() {
      $gameTemp.aaIsForceSpawn = true;
      uAPI.spawnEnemy(...arguments);
    };
    // * Возвращает событие, которое было отспавнено последним
    //?Может вернуть NULL
    _.getLastSpawnedEnemy = function() {
      return $gameTemp.aaLastSpawnedEvent;
    };
    // * Был ли отспавнен враг после последней команды спавна?
    _.isEnemyBeenSpawned = function() {
      return uAPI.getLastSpawnedEnemy() != null;
    };
    // * Спавн врага в случайном месте вокруг точки {X, Y} (в пределах радиуса)
    _.spawnEnemyAround = function(id, x, y, radius) {
      var e, p;
      $gameTemp.aaLastSpawnedEvent = null;
      if (!DataManager.aaIsSpawnMapValid()) {
        console.warn("You try spawn Enemy, but not setup Spawn Map ID in Plugin Parameters");
      } else {
        try {
          // * ID не надо, так как идёт вызов spawnEnemy, где преобразование
          //id = KDCore.Utils.getEValue(id)
          x = KDCore.Utils.getEValue(x);
          y = KDCore.Utils.getEValue(y);
          radius = KDCore.Utils.getEValue(radius);
          if ((id != null) && (x != null) && (y != null) && (radius != null) && radius > 0) {
            p = $gameMap.aaGetRandomSpawnPointInRadius(x, y, radius);
            if (p != null) {
              uAPI.spawnEnemy(id, p.x, p.y);
            }
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }
    };
    // * Спавн врага вокруг игрока (на максимальном расстоянии maxDistance)
    _.spawnEnemyNearPlayer = function(id, maxDistance = 2) {
      var e;
      try {
        return uAPI.spawnEnemyAround(id, $gamePlayer.x, $gamePlayer.y, maxDistance);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    return _.spawnEnemyAroundForced = function() {
      $gameTemp.aaIsForceSpawn = true;
      uAPI.spawnEnemyAround(...arguments);
    };
  })();
  (function() {    
    // * Навыки
    // -----------------------------------------------------------------------
    //ownerId, skillId, x, y - EValues
    _.executeAASkillOnMap = function(ownerId, teamId, skillId, x, y) {
      var aaSkill, e, subject;
      try {
        if (!AA.isABSActive()) {
          return;
        }
        skillId = KDCore.Utils.getEValue(skillId);
        if ($dataSkills[skillId] == null) {
          AA.w("uAPI.executeAASkillOnMap: Skill with ID " + skillId + " not found");
          return;
        }
        aaSkill = $dataSkills[skillId].AASkill;
        if (aaSkill == null) {
          AA.w("uAPI.executeAASkillOnMap: Skill with ID " + skillId + " is not ABS skill");
          return;
        }
        //TODO: Временное решение
        if (!aaSkill.isInstant()) {
          AA.w("uAPI.executeAASkillOnMap: projectile ABS skills not supported yet (skills with speed > 0)");
          return;
        }
        //unless aaSkill.isInPoint()
        //    AA.w "uAPI.executeAASkillOnMap: directional skills not supported yet (skills with direction > 0)"
        //    return
        ownerId = KDCore.Utils.getEValue(ownerId);
        x = KDCore.Utils.getEValue(x);
        y = KDCore.Utils.getEValue(y);
        subject = new AADummyCharacter(ownerId, teamId);
        subject.setPosition(x, y);
        AABattleActionsManager.startAASkill(aaSkill, subject, {x, y});
        subject.dispose();
      } catch (error) {
        //TODO: Map Projectile теряет subject (так как он disposed уже)
        e = error;
        AA.w(e);
      }
    };
    return _.executeAASkillOnChar = function(ownerId, teamId, skillId, charId) {
      var char, e;
      try {
        charId = KDCore.Utils.getEValue(charId);
        if (charId === 0) {
          char = $gamePlayer;
        } else {
          char = $gameMap.event(charId);
        }
        if (char == null) {
          return;
        }
        uAPI.executeAASkillOnMap(ownerId, teamId, skillId, char.x, char.y);
      } catch (error) {
        e = error;
        AA.w(e);
      }
    };
  })();
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс хранит все иконки баффов игрока
(function() {
  var UISet_ActorBuffsIcons;
  UISet_ActorBuffsIcons = class UISet_ActorBuffsIcons extends Sprite {
    constructor() {
      super();
      this.controllers = [];
      this.elements = [];
      this._create();
      this.refresh();
    }

    refresh() {
      var e, ref;
      try {
        return (ref = this.controllers[0]) != null ? ref.setup($gameParty.leader()) : void 0;
      } catch (error) {
        e = error;
        return AA.warning(e);
      }
    }

    update() {
      var c, i, len, ref, results;
      super.update();
      ref = this.controllers;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        results.push(c.update());
      }
      return results;
    }

  };
  AA.link(UISet_ActorBuffsIcons);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.UISet_ActorBuffsIcons.prototype;
  _._create = function() {
    var data, i, icons, index, len;
    icons = AA.PP.getUIActorBuffsIconsSet();
    for (index = i = 0, len = icons.length; i < len; index = ++i) {
      data = icons[index];
      this._createBuffIcon(data, index);
    }
    return this._createControllers();
  };
  _._createBuffIcon = function(data, index) {
    var buffItem, e, p;
    try {
      p = AA.PP.uiData("actorBuffIcon");
      buffItem = new AA.Sprite_ActorStateIcon(p);
      buffItem.tag = "buffItem_" + index;
      buffItem.move(data.x, data.y);
    } catch (error) {
      e = error;
      AA.w(e);
      buffItem = null;
    }
    if (buffItem == null) {
      return;
    }
    this.addChild(buffItem);
    this.elements.push(buffItem);
  };
  _._createControllers = function() {
    var buffsCnt;
    buffsCnt = new AA.BuffIconsController(this.elements);
    buffsCnt.tag = "buffs";
    this.controllers.push(buffsCnt);
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс хранит все gauge игрока, отвечает за их работу
(function() {
  var UISet_ActorGauges;
  // * В качестве аргумента получает класс интерфейса
  UISet_ActorGauges = class UISet_ActorGauges extends Sprite {
    constructor() {
      super();
      this.controllers = [];
      this.elements = [];
      this._create();
      this.refresh();
    }

    refresh() {
      var e, ref, ref1, ref2;
      try {
        if ((ref = this.hpGauge) != null) {
          ref.setup($gameParty.leader(), 'hp', 'mhp');
        }
        if ((ref1 = this.mpGauge) != null) {
          ref1.setup($gameParty.leader(), 'mp', 'mmp');
        }
        return (ref2 = this.tpGauge) != null ? ref2.setup($gameParty.leader(), 'tp', 'mtp') : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    update() {
      var c, i, len, ref, results;
      super.update();
      ref = this.controllers;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        results.push(c.update());
      }
      return results;
    }

  };
  AA.link(UISet_ActorGauges);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.UISet_ActorGauges.prototype;
  _._create = function() {
    this.hpGauge = this._createGauge("hpGauge");
    this.tpGauge = this._createGauge("tpGauge");
    return this.mpGauge = this._createGauge("mpGauge");
  };
  _._createGauge = function(tag) {
    var e, gauge, gaugeCnt, p;
    try {
      p = AA.PP.uiData(tag);
      gauge = new AA.Sprite_ActorStateGauge(p);
      gauge.tag = tag;
      gaugeCnt = new AA.GaugeController(gauge);
      gaugeCnt.tag = tag;
      this.controllers.push(gaugeCnt);
      this.elements.push(gauge);
      this.addChild(gauge);
      return gaugeCnt;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс хранит все иконки состояний игрока
(function() {
  var UISet_ActorStatesIcons;
  UISet_ActorStatesIcons = class UISet_ActorStatesIcons extends AA.UISet_ActorBuffsIcons {
    constructor() {
      super();
    }

  };
  AA.link(UISet_ActorStatesIcons);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.UISet_ActorStatesIcons.prototype;
  //$[OVER]
  _._create = function() {
    var data, i, icons, index, len;
    icons = AA.PP.getUIActorStatesIconsSet();
    for (index = i = 0, len = icons.length; i < len; index = ++i) {
      data = icons[index];
      this._createStateIcon(data, index);
    }
    return this._createControllers();
  };
  _._createStateIcon = function(data, index) {
    var e, p, stateItem;
    try {
      p = AA.PP.uiData("actorStateIcon");
      stateItem = new AA.Sprite_ActorStateIcon(p);
      stateItem.tag = "stateItem_" + index;
      stateItem.move(data.x, data.y);
    } catch (error) {
      e = error;
      AA.w(e);
      stateItem = null;
    }
    if (stateItem == null) {
      return;
    }
    this.addChild(stateItem);
    this.elements.push(stateItem);
  };
  //$[OVER]
  _._createControllers = function() {
    var statesCnt;
    statesCnt = new AA.StatesIconsController(this.elements);
    statesCnt.tag = "states";
    this.controllers.push(statesCnt);
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс хранит все ячейки навыков (предметов) на интерфейсе
(function() {
  var UISet_Skills;
  // * В качестве аргумента получает класс интерфейса
  UISet_Skills = class UISet_Skills extends Sprite {
    constructor() {
      super();
      this.controllers = [];
      this.elements = [];
      this._create();
      this.refresh();
    }

    // * Этот метод нужен обязательно
    refresh() {
      var e;
      try {

      } catch (error) {
        e = error;
        return AA.warning(e);
      }
    }

    update() {
      var c, i, len, ref, results;
      super.update();
      ref = this.controllers;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        results.push(c.update());
      }
      return results;
    }

  };
  AA.link(UISet_Skills);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.UISet_Skills.prototype;
  _._create = function() {
    var i, item, len, ref;
    ref = AA.PP.getUISkillsItems();
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      if (item != null) {
        this._createSkillItem(item);
      }
    }
    this._createController();
  };
  _._createSkillItem = function(itemSettings) {
    var def, e, p, skillItem;
    try {
      def = AA.PP.uiData("skillSlot");
      if ((itemSettings.style != null) && itemSettings.style !== "") {
        p = itemSettings.style;
      } else {
        p = def;
      }
      try {
        skillItem = new AA.Sprite_SKillPanelItem(p);
      } catch (error) {
        e = error;
        AA.w(e);
        skillItem = new AA.Sprite_SKillPanelItem(def);
      }
      skillItem.tag = "skillItem_" + itemSettings.symbol;
      skillItem.move(itemSettings.position);
      skillItem.drawSymbol(itemSettings.symbol);
      skillItem.symbol = itemSettings.symbol;
    } catch (error) {
      e = error;
      AA.w(e);
      skillItem = null;
    }
    if (skillItem == null) {
      return;
    }
    this.addChild(skillItem);
    this.elements.push(skillItem);
  };
  _._createController = function() {
    var skillsCnt;
    skillsCnt = new UISkillsItemsController(this.elements);
    skillsCnt.tag = "skills";
    this.controllers.push(skillsCnt);
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Класс харинт UI выбранной (под курсором) цели и контроллеры
(function() {
  var UISet_TargetInfo;
  UISet_TargetInfo = class UISet_TargetInfo extends Sprite {
    constructor() {
      super();
      // * Эти два поля обязательные для набора элементов интерфейса
      // * Они используются в методе _registerUISet в Spriteset UI
      this.controllers = [];
      this.elements = [];
      //TODO: register global event
      this._create();
      return;
    }

    refresh() {}

    update() {
      var c, i, len, ref, results;
      super.update();
      ref = this.controllers;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        results.push(c.update());
      }
      return results;
    }

  };
  AA.link(UISet_TargetInfo);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ UISet_TargetInfo.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = AA.UISet_TargetInfo.prototype;
  _._create = function() {
    this.infoSpr = new AA.Sprite_EnemyInfo();
    this.infoSpr.tag = "targetInfo"; // * Это надо для управленя элементов через uAPI и редактор
    this.infoSprCnt = new UITargetInfoController(this.infoSpr);
    this.infoSprCnt.tag = "targetInfo";
    this.controllers.push(this.infoSprCnt);
    this.elements.push(this.infoSpr);
    return this.addChild(this.infoSpr);
  };
})();

// ■ END UISet_TargetInfo.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Данный класс работает только на Game_Player
var UISkillsItemsController;

UISkillsItemsController = class UISkillsItemsController {
  constructor(skillItems) {
    this.skillItems = skillItems;
    // * Очищаем тело метода, если отключён соответствующий параметр плагина
    // (для экономии производительности)
    if (!AA.PP.isRemoveItemIfZeroCount()) {
      this._checkResetItemFromPanel = function() {}; // * EMPTY
    }
    this.setup();
    return;
  }

  setup() {
    this.battler = $gamePlayer.AABattler();
    this.skillSet = $gamePlayer.aaSkillsSet;
    this._updThread = new KDCore.TimedUpdate(20, this._updateItemsStates.bind(this));
    this._updThreadItemCount = new KDCore.TimedUpdate(30, this._updateItemsCount.bind(this));
    this._updThreadTimers = new KDCore.TimedUpdate(2, this._updateItemsTimers.bind(this));
    this.refresh();
  }

  onSkillPerformResult(skillId, result) {
    var e, item;
    try {
      item = this._getItemForSkillId(skillId);
      if (item == null) {
        return;
      }
      if (result === 0) {
        return item.pulseAlert();
      } else {
        return item.pulseClick();
      }
    } catch (error) {
      e = error;
      return AA.w(e);
    }
  }

  refresh() {
    var i, item, j, len, len1, panelItems, ref, skill;
    this._clearItems();
    if (this.battler == null) {
      return;
    }
    ref = this.battler.getAASkills();
    for (i = 0, len = ref.length; i < len; i++) {
      skill = ref[i];
      this._setupItem(skill);
    }
    // * Предметы отдельно, так как могут быть не в наличии
    panelItems = this.skillSet.getAllItemsFromPanel().map(function(id) {
      return AA.Utils.getAASkillObject(id);
    });
    for (j = 0, len1 = panelItems.length; j < len1; j++) {
      item = panelItems[j];
      this._setupItem(item);
    }
    // * Все слоты у которых нет навыка, очищаем уже
    this._checkAndClearEmptyItems();
    this._updateItemsCount(); // * Сразу обновим количество
  }

  update() {
    var ref, ref1, ref2;
    if ((ref = this._updThread) != null) {
      ref.update();
    }
    if ((ref1 = this._updThreadTimers) != null) {
      ref1.update();
    }
    if ((ref2 = this._updThreadItemCount) != null) {
      ref2.update();
    }
    this._updateInput();
  }

  getItemUnderMouse() {
    return this.skillItems.find(function(item) {
      return item.isUnderMouse();
    });
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = UISkillsItemsController.prototype;
  _._updateItemsStates = function() {
    var i, item, len, ref, results;
    ref = this.skillItems;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      results.push(this._updateItemState(item));
    }
    return results;
  };
  _._updateItemsTimers = function() {
    var i, item, len, ref, results;
    ref = this.skillItems;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      results.push(this._updateItemTimer(item));
    }
    return results;
  };
  _._updateItemsCount = function() {
    var i, item, len, ref, results;
    ref = this.skillItems;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      results.push(this._updateItemCount(item));
    }
    return results;
  };
  // * Обновить состояние (таймер, доступность)
  _._updateItemState = function(item) {
    var e, useCases;
    try {
      if (AA.isABSActive()) {
        useCases = this.battler.getUsableAASkills().map(function(skill) {
          return skill.idA;
        });
      } else {
        useCases = [];
      }
      this._updateItemUseState(item, useCases);
    } catch (error) {
      e = error;
      AA.w(e);
      this._updThread = null;
    }
  };
  // * Обновить таймер для навыка
  _._updateItemTimer = function(item) {
    var parts, tStr, time;
    if (item.isDisabled() && item.skillId > 0) {
      time = $gamePlayer.AABattler().aaGetRemainTimeForSkill(item.skillId);
      if (time > 0) {
        //TODO: BAD performance, BAD BAD BAD way
        tStr = "" + time;
        if (tStr.contains(".")) {
          parts = tStr.split(".");
          if (parts[1].length > 0) {
            tStr = parts[0] + "." + parts[1][0];
          }
        }
        return item.drawTime(tStr);
      } else {
        return item.drawTime("");
      }
    } else {
      return item.drawTime("");
    }
  };
  // * Обновить количество (для предметов)
  _._updateItemCount = function(item) {
    var count;
    // * Навыки пропускаем
    if (AA.Utils.isAASkill(item.skillId)) {
      return;
    }
    count = $gameParty.numItems(AA.Utils.getAASkillObject(item.skillId));
    item.drawCount(count);
    this._checkResetItemFromPanel(item, count);
  };
  //@[DYNAMIC]
  _._checkResetItemFromPanel = function(item, count) {
    var e;
    try {
      if (count <= 0) {
        uAPI.setItemToPanel(0, item.symbol);
      }
    } catch (error) {
      e = error;
      this._checkResetItemFromPanel = function() {}; // * EMPTY
      AA.w(e);
    }
  };
  _._updateItemUseState = function(item, useable) {
    if (item.skillId === 0) {
      if (item.isDisabled()) {
        // * Доп. проверочка isDisabled, а то мерцает
        item.enable();
      }
    } else {
      // * Если состояние было включено на Enabled, значит даём сигнал
      if (item.switchState(useable.contains(item.skillId))) {
        item.pulseReady();
      }
    }
  };
  _._clearItems = function() {
    var i, item, len, ref;
    ref = this.skillItems;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      //item.clear() # * Не очищаем, чтобы не было мерцания картинки (если используется)
      item.skillId = 0;
    }
  };
  _._checkAndClearEmptyItems = function() {
    var i, item, len, ref;
    ref = this.skillItems;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      if (item.skillId <= 0) {
        item.clear();
      }
    }
  };
  
  // * Задать навык в ячейку
  _._setupItem = function(skill) {
    var iconIndex, item, symb;
    if (skill == null) {
      return;
    }
    symb = this.skillSet.getSymbolForSkill(skill.idA);
    // * Нету символа для навыка (т.е. навык не находится в ячейках)
    if (symb == null) {
      return;
    }
    item = this._getItemForSymbol(symb);
    if (item == null) {
      return;
    }
    item.skillId = skill.idA;
    if (item.skillId === this.battler.attackSkillId()) {
      iconIndex = AA.Utils.getAttackSkillWeaponIconIndex(item, this.battler);
      item.drawIcon(iconIndex);
    } else {
      iconIndex = AA.Utils.getSkillSlotImgOrIcon(skill);
      item.drawIcon(iconIndex);
    }
    // * Сразу обновляем состояние
    this._updateItemState(item);
  };
  // * symbol назначается при создании в UISet_Skills из параметров
  _._getItemForSymbol = function(symb) {
    return this.skillItems.find(function(item) {
      return item.symbol === symb;
    });
  };
  // * Получить ячейку по ID навыка (устанавливается в методе _setupItem)
  _._getItemForSkillId = function(id) {
    return this.skillItems.find(function(item) {
      return item.skillId === id;
    });
  };
  // * Этот метод работает с клавиатуры, а не при клике мышкой
  _._updateInput = function() {
    var inputSymbol, item;
    inputSymbol = AA.Input.getTriggeredSkillSymbol();
    if (inputSymbol != null) {
      item = this._getItemForSymbol(inputSymbol);
      if (item != null) {
        $gamePlayer.aaTryPerformSkill(item.skillId);
      }
    }
  };
  // * Обработка нажатия правкой кнопкой мыши по слоту (вызывается из AA.UI)
  _.handleSkillSelectorProcess = function() {
    var symbol;
    if (AA.UI.isSkillSelectorOpen()) {
      AA.UI.closeSkillSelector();
      // * Если было нажатие на другой слот, то сразу открываем его
      symbol = this._getSkillSymbolSelectorHandled();
      if ((symbol != null) && $gameTemp.__aaLastSkillSelectorSymbol !== symbol) {
        return this.handleSkillSelectorProcess(); // * Если было нажатие на слот, но этот же, закрываем его
      } else {
        $gameTemp.__aaLastSkillSelectorSymbol = null;
        return true;
      }
    } else {
      symbol = this._getSkillSymbolSelectorHandled();
      if ((symbol != null) && AA.Input.isEditableSymbol(symbol)) {
        AA.UI.openSkillSelectorFor(symbol);
        $gameTemp.__aaLastSkillSelectorSymbol = symbol;
        return true;
      }
    }
    return false;
  };
  // * Возвращает symbol слота, если было открыто меню выбора навыка (правой кнопкой по слоту)
  _._getSkillSymbolSelectorHandled = function() {
    var item;
    // * Только по правой кнопке мыши (всегда)
    if (TouchInput.isCancelled()) {
      item = this._getItemUnderCursor();
      if (item != null) {
        return item.symbol;
      }
    }
    return null;
  };
  
  // * Получить Skill Item под курсором
  _._getItemUnderCursor = function() {
    return this.skillItems.find(function(item) {
      return item.isUnderMouse();
    });
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//TODO: Систематизация класса
var UITargetInfoController;

UITargetInfoController = class UITargetInfoController {
  constructor(targetInfoSpr) {
    this.targetInfoSpr = targetInfoSpr;
    AA.EV.subscribeFor("UnderMouseEventChanged", this.gev_onUnderMouseEventChanged.bind(this));
    this._createSoControllers();
    this.targetInfoSpr.visible = false;
    return;
  }

  refresh() {
    return this.gev_onUnderMouseEventChanged();
  }

  setup(target) {
    this.target = target;
    if (this.target == null) {
      this.hideTargetInfo();
    }
    this.gaugeCnt.setup(this.target.AABattler(), "hp", "mhp");
    this.showTargetInfo();
  }

  hideTargetInfo() {
    this.targetInfoSpr.hideSlow();
    this.target = null;
  }

  showTargetInfo() {
    var battler, model;
    model = this.target.AAEntity().model();
    if (model.UIInfo === 0) {
      return;
    }
    battler = this.target.AABattler();
    //TODO: Values from enemy
    this.targetInfoSpr.drawNameWithFormat(battler.name());
    //TODO: level from what?
    this.targetInfoSpr.drawLevelWithFormat(1);
    this.targetInfoSpr.drawFace(model.faceName, model.faceIndex);
    //TODO: battle state show and refresh by AI state
    this.targetInfoSpr.showSlow();
  }

  update() {
    if (!this.targetInfoSpr.visible) {
      return;
    }
    this.gaugeCnt.update();
  }

  gev_onUnderMouseEventChanged() {
    if ($gameTemp._aaEventUnderCursor != null) {
      if (this.target !== $gameTemp._aaEventUnderCursor) {
        this.setup($gameTemp._aaEventUnderCursor);
      }
    } else {
      this.hideTargetInfo();
    }
  }

  _createSoControllers() {
    this.gaugeCnt = new AA.GaugeController(this.targetInfoSpr.gauge);
    // * Используется свой метод для отрисовки значения (с форматом)
    this.gaugeCnt.targetInfoSpr = this.targetInfoSpr;
    this.gaugeCnt._refreshValues = function() {
      var rate;
      rate = this.value / this.max;
      this.gaugeSprite.drawGauge(rate);
      return this.targetInfoSpr.drawHpWithFormat(this.value, this.max, rate);
    };
  }

};


// Generated by CoffeeScript 2.6.1
// * Данный класс содержит пользовательские (временные) настройки UI элементов

//@[GLOBAL]
//@[STORABLE]
var AAUserUISettings;

AAUserUISettings = class AAUserUISettings {
  constructor() {
    if (this.isGlobalUsage()) {
      this.settings = ConfigManager.aaUserUISettings || {};
    } else {
      this.settings = {};
    }
    return;
  }

  // * Сохранять (загружать) изменения в Config Manager (глобально)
  isGlobalUsage() {
    return AA.PP.isGlobalUserUISettings();
  }

  isHaveFor(key) {
    return this.settings[key] != null;
  }

  createFor(key) {
    return this.settings[key] = {};
  }

  //?[UNSAFE]
  //? Cперва надо сделать проверку isHaveFor
  // * Если поля нету, возращают null, значит вообще не учитывать пользовательскую настройку
  // * return KDCore.Point
  getPositionFor(key) {
    var e, ref;
    try {
      return (ref = this.settings[key]) != null ? ref.position : void 0;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  }

  //?[UNSAFE]
  getVisibleFor(key) {
    var e, state;
    try {
      if (this.settings[key] == null) {
        return null;
      }
      state = this.settings[key].visible;
      if (state != null) {
        return state;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  }

  set(key, command, value) {
    var e;
    if (!this.isHaveFor(key)) {
      // * Создаём для элемента данные, если нету ещё
      this.createFor(key);
    }
    try {
      switch (command) {
        case "setPosition":
          // * Значние должно быть массивом
          this.settings[key].position = KDCore.Utils.jsonPos(value).simple();
          break;
        case "setVisible":
          // * Значение должно быть bool
          this.settings[key].visible = value;
          break;
        case "resetPosition":
          // * Нет значения, просто сброс
          this.settings[key].position = null;
          break;
        case "clear":
          // * Нет значения, удаление всех настроек
          delete this.settings[key];
          break;
        default:
          KDCore.warning('Unknown command ' + command);
      }
      this.saveGlobalSettings();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  saveGlobalSettings() {
    var e;
    try {
      if (!this.isGlobalUsage()) {
        return;
      }
      // * Не обязательно, но лучше переопределить
      ConfigManager.aaUserUISettings = this.settings;
      ConfigManager.save();
    } catch (error) {
      e = error;
      AA.w(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleSkill.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__includes, _;
  //@[DEFINES]
  _ = Window_BattleSkill.prototype;
  // * Прячем ABS навыки из битвы со специальным флагом hideOutsideABS == 1
  //@[ALIAS]
  ALIAS__includes = _.includes;
  _.includes = function(item) {
    var isInclude;
    isInclude = ALIAS__includes.call(this, item);
    if (isInclude === true) {
      if (AA.Utils.isAAObject(item)) {
        if (item.AASkill.hideOutsideABS === 1) {
          return false;
        }
      }
    }
    return isInclude;
  };
})();

// ■ END Window_BattleSkill.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__startMessage, ALIAS__terminateMessage, _;
  //@[DEFINES]
  _ = Window_Message.prototype;
  //@[ALIAS]
  ALIAS__startMessage = _.startMessage;
  _.startMessage = function() {
    ALIAS__startMessage.call(this);
    return AA.UI.onGameMessageStart();
  };
  
  //TODO: Тут мерцание происходит. Как быть? Timeout?
  //@[ALIAS]
  ALIAS__terminateMessage = _.terminateMessage;
  _.terminateMessage = function() {
    ALIAS__terminateMessage.call(this);
    return AA.UI.onGameMessageEnd();
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//TODO: Добавить настройки, чтобы и размер иконок и текста можно было менять
var Window_SkillSelectorList;

Window_SkillSelectorList = class Window_SkillSelectorList extends Window_Selectable {
  constructor(rect) {
    super(...arguments);
    this.setBackgroundType(2);
    this.catIndex = -1;
    this.skillSymbol = null;
    //TODO: not used variable!!!
    this.skills = [];
    return;
  }

  // * При нажатии на окно выбора навыков
  onClick() {
    var e, hitIndex, skillId;
    if (this.skillSymbol == null) {
      return;
    }
    if (this.catIndex < 0) {
      return;
    }
    hitIndex = this.hitIndex();
    if (hitIndex < 0) {
      return;
    }
    try {
      skillId = this._skills[hitIndex].id;
      if (this.catIndex === 0) {
        uAPI.setSkillToPanel(skillId, this.skillSymbol);
      } else {
        uAPI.setItemToPanel(skillId, this.skillSymbol);
      }
      if (skillId > 0) {
        SoundManager.playEquip();
        // * Если навык был установлен (а не удалён)
        AA.UI.closeSkillSelector();
        // * Чтобы персонаж не пошёл к точку карты после закрытия окна
        TouchInput.clear();
      } else {
        SoundManager.playCursor();
        this.refresh();
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  }

  // * 0 - Skills
  // * 1 - Items
  setCategory(catIndex) {
    this.catIndex = catIndex;
    this.refresh();
    this.scrollTo(0, 0);
  }

  // * Символ навыка, чтобы установить (убрать) на панель
  setSymbol(skillSymbol) {
    this.skillSymbol = skillSymbol;
  }

  // * Всегда можно прокручивать, так как окно не будет Active
  //$[OVER]
  isScrollEnabled() {
    return true;
  }

  maxCols() {
    return 1;
  }

  maxItems() {
    if (this._skills != null) {
      return this._skills.length;
    } else {
      return 0;
    }
  }

  refresh() {
    this._prepareSkillsList();
    Window_Selectable.prototype.refresh.call(this);
  }

  drawItem(index) {
    var _tIconIndex, e, iconIndex, item, rect;
    this.__drawIndex = index;
    item = this._skills[index];
    if (item == null) {
      return;
    }
    rect = this.itemLineRect(index);
    try {
      //TODO: Этот метод может вызвать проблемы
      //? ТУТ ИСПОЛЬЗУЕТСЯ ДОВОЛЬНО ОПАСНЫЙ приём подмены иконки в Data объекте
      //? Это сделано чтобы не переписывать весь метод drawItemName
      // * Если навык атаки, то надо рисовать иконку оружия
      // * Тут TryCatch так как есть системный placeholder вместо Item
      // * и модифицированный другими плагинами метод drawItemName
      // * может не найти поле необходимое, которое есть у Game_Items
      if (this._isAttackSkill(index)) {
        _tIconIndex = item.iconIndex;
        iconIndex = AA.Utils.getAttackSkillWeaponIconIndex(item, $gameParty.leader());
        if (iconIndex > 0) {
          item.iconIndex = iconIndex;
        }
      }
      this.drawItemName(item, rect.x, rect.y, rect.width);
      if (_tIconIndex != null) {
        // * После метода отрисовки, иконку надо вернуть
        item.iconIndex = _tIconIndex;
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  }

  //TODO: from settings
  //$[OVER]
  resetFontSettings() {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = 14;
    this.resetTextColor();
  }

  //TODO: from settings
  resetTextColor() {
    super.resetTextColor();
    if (this.catIndex < 0) {
      return;
    }
    if (this.__drawIndex === 0) {
      return this.changeTextColor("#e32614"); // * [Remove]
    // * Атака может быть только в категории навыков
    // * А может и не быть (если установлена)
    } else if (this._isAttackSkill(this.__drawIndex)) {
      return this.changeTextColor("#148de3"); // * Attack
    } else {
      //TODO: Items name color plugin compatability
      if (this.catIndex === 0) {
        return this.changeTextColor("#dba512");
      } else {
        return this.changeTextColor("#20d67b");
      }
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_SkillSelectorList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_SkillSelectorList.prototype;
  _._prepareSkillsList = function() {
    var e, skills;
    this._skills = [];
    // * ID навыка атаки в списке, если == 0 - нет навыка
    this._attackSkillId = 0;
    if (this.catIndex < 0) {
      return;
    }
    try {
      if (this.catIndex === 0) { // * Skills only
        skills = $gameParty.leader().getAASkills();
        // * Так как метод getAASkills возвращает все навыки (включая предметы)
        // * то дополнительный фильтр от предметов
        skills = skills.filter(function(s) {
          return AA.Utils.isAASkill(s.idA); // * Items only
        });
      } else {
        skills = $gameParty.leader().getAAItems();
      }
      this._skills = skills;
      this._removeAlreadyInPanelSkills();
    } catch (error) {
      e = error;
      AA.w(e);
      this._skills = [];
    }
    if (this.catIndex === 0) {
      this._checkAttackSkillInList();
    }
    this._skills.unshift(this._removeCommandItem());
  };
  _._removeCommandItem = function() {
    return {
      //TODO: from parameters
      id: 0,
      idA: 0,
      iconIndex: 16,
      name: "[Remove]"
    };
  };
  // * Удаляет из списка навыков те, что уже установленны на панель навыков
  _._removeAlreadyInPanelSkills = function() {
    var e, i, len, notInPanelSkills, ref, s, skillPanel;
    try {
      notInPanelSkills = [];
      skillPanel = $gamePlayer.aaSkillsSet;
      if (skillPanel == null) {
        return;
      }
      ref = this._skills;
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (skillPanel.getSymbolForSkill(s.idA) == null) {
          notInPanelSkills.push(s);
        }
      }
      this._skills = notInPanelSkills;
    } catch (error) {
      e = error;
      AA.w(e);
      this._skills = [];
    }
  };
  _._checkAttackSkillInList = function() {
    var attackSkill, attackSkillId, e;
    try {
      attackSkillId = $gameParty.leader().attackSkillId();
      attackSkill = this._skills.find(function(s) {
        return s.id === attackSkillId;
      });
      if (attackSkill != null) {
        this._skills.delete(attackSkill);
        // * Запоминаем ID (значит есть в списке)
        this._attackSkillId = attackSkillId;
        // * Ставим на первое место в список
        this._skills.unshift(attackSkill);
      }
    } catch (error) {
      e = error;
      AA.w(e);
      this._skills = [];
    }
  };
  _._isAttackSkill = function(index) {
    var e, ref;
    try {
      if (this.catIndex === 0 && this._attackSkillId > 0) {
        if (((ref = this._skills[index]) != null ? ref.id : void 0) === this._attackSkillId) {
          return true;
        }
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
    return false;
  };
})();

// ■ END Window_SkillSelectorList.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ParamsManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Реализация загрузки настроек визуальных компонентов из параметров
(function() {
  var ALIAS___getDefaultActorBuffIcon, ALIAS___getDefaultActorStateIcon, ALIAS___getDefaultVisualFor_enemyInfo, ALIAS___getDefaultVisualFor_enemyMiniHp, ALIAS___getDefaultVisualFor_hpGauge, ALIAS___getDefaultVisualFor_mpGauge, ALIAS___getDefaultVisualFor_skillSlot, ALIAS___getDefaultVisualFor_tpGauge, _;
  //@[DEFINES]
  _ = AA.ParamsManager.prototype;
  //@[ALIAS]
  ALIAS___getDefaultVisualFor_hpGauge = _._getDefaultVisualFor_hpGauge;
  _._getDefaultVisualFor_hpGauge = function() {
    return this.getParam("playerHpGaugeVisualSettings", ALIAS___getDefaultVisualFor_hpGauge.call(this));
  };
  //@[ALIAS]
  ALIAS___getDefaultVisualFor_mpGauge = _._getDefaultVisualFor_mpGauge;
  _._getDefaultVisualFor_mpGauge = function() {
    return this.getParam("playerMpGaugeVisualSettings", ALIAS___getDefaultVisualFor_mpGauge.call(this));
  };
  //@[ALIAS]
  ALIAS___getDefaultVisualFor_tpGauge = _._getDefaultVisualFor_tpGauge;
  _._getDefaultVisualFor_tpGauge = function() {
    return this.getParam("playerTpGaugeVisualSettings", ALIAS___getDefaultVisualFor_tpGauge.call(this));
  };
  // * Враги имееют параметр miniHpGaugeStyle, поэтому поддерживается выбор из массива настроек
  //@[ALIAS]
  ALIAS___getDefaultVisualFor_enemyMiniHp = _._getDefaultVisualFor_enemyMiniHp;
  _._getDefaultVisualFor_enemyMiniHp = function(styleId) {
    var data, item;
    if ((styleId != null) && String.any(styleId)) {
      data = this.getParam("enemyMiniHpGaugesCustoms", []);
      item = data.getById(styleId);
      if (item != null) {
        return item.gauge; // * Стандартный
      } else {
        AA.w("Enemy Mini HP gauge style ID " + styleId + " not defined in Plugin Parameters");
        return this._getDefaultVisualFor_enemyMiniHp(null);
      }
    } else {
      // * Стандартная настройка
      return this.getParam("enemyMiniHpGaugeSettings", ALIAS___getDefaultVisualFor_enemyMiniHp.call(this));
    }
  };
  
  //@[ALIAS]
  ALIAS___getDefaultActorBuffIcon = _._getDefaultVisualFor_actorBuffIcon;
  _._getDefaultVisualFor_actorBuffIcon = function() {
    return this.getParam("buffIconSettings", ALIAS___getDefaultActorBuffIcon.call(this));
  };
  //@[ALIAS]
  ALIAS___getDefaultActorStateIcon = _._getDefaultVisualFor_actorStateIcon;
  _._getDefaultVisualFor_actorStateIcon = function() {
    return this.getParam("statsIconSettings", ALIAS___getDefaultActorStateIcon.call(this));
  };
  //@[ALIAS]
  ALIAS___getDefaultVisualFor_skillSlot = _._getDefaultVisualFor_skillSlot;
  _._getDefaultVisualFor_skillSlot = function() {
    return this.getParam("skillSlotVisualSettings", ALIAS___getDefaultVisualFor_skillSlot.call(this));
  };
  //@[ALIAS]
  ALIAS___getDefaultVisualFor_enemyInfo = _._getDefaultVisualFor_enemyInfo;
  _._getDefaultVisualFor_enemyInfo = function() {
    return this.getParam("enemyInfoVisualSettings", ALIAS___getDefaultVisualFor_enemyInfo.call(this));
  };
})();

// ■ END ParamsManager.coffee
//---------------------------------------------------------------------------

//Plugin Alpha_ABSZ builded by PKD PluginBuilder 2.1 - 23.04.2022