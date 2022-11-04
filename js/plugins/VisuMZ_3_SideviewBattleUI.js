//=============================================================================
// VisuStella MZ - Sideview Battle UI
// VisuMZ_3_SideviewBattleUI.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_SideviewBattleUI = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SideviewBattleUI = VisuMZ.SideviewBattleUI || {};
VisuMZ.SideviewBattleUI.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.05] [SideviewBattleUI]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Sideview_Battle_UI_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the RPG Maker MZ Battle UI for Sideview Battle Systems
 * into something more minimalistic. The menus are placed towards the player's
 * party to let the player focus their attention to the center of the screen
 * instead of to the lower ledges of the screen. The input command windows show
 * up near the inputting actor to give the player a clear understanding of who
 * is performing what action.
 * 
 * *NOTE* To use this battle layout, you will need the updated version of
 * VisuStella's Battle Core. Go into its Plugin Parameters and change the
 * Battle Layout Settings > Battle Layout Style > plugin parameter to this
 * value: "Sideview Battle UI" or "sideview_ui".
 *
 * Features include all (but not limited to) the following:
 * 
 * * This plugin changes the UI for the RPG Maker MZ Sideview Battle System.
 * * Status windows appear on the side of the screen for each actor in battle.
 * * The appearance is more compact for both the status windows and input
 *   command windows.
 * * More of the battlefield can be seen with this kind of layout.
 * * Lots of customization options to adjust the status windows.
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
 * * VisuMZ_0_CoreEngine
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
 * Sideview Only
 * 
 * This plugin only works for the sideview battle system. If this layout is
 * selected in the Battle Core, the battle system will automatically shift to
 * sideview regardless of the settings.
 * 
 * *NOTE* To use this battle layout, you will need the updated version of
 * VisuStella's Battle Core. Go into its Plugin Parameters and change the
 * Battle Layout Settings > Battle Layout Style > plugin parameter to this
 * value: "Sideview Battle UI" or "sideview_ui".
 *
 * ---
 * 
 * Window Properties
 * 
 * With how the battle layout works, many of the command windows used in the
 * battle system will have preset and hardcoded properties to them in order to
 * maintain a specific aesthetic. These include columns, padding, and scaling
 * types to name a few.
 * 
 * Therefore, any plugins that may alter these effects may not have any effect
 * at all provided that this plugin is in a higher tier than those modifying
 * it. This is an intended change to maintain the aesthetic and is not a bug.
 * 
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_2_AggroControlSystem
 * VisuMZ_2_BattleSystemBTB
 * VisuMZ_3_BoostAction
 * VisuMZ_3_StateTooltips
 * VisuMZ_4_BreakShields
 *
 * There are features provided in this plugin for the above plugins. Their UI
 * elements can be shown with this plugin's status windows.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battler Offset Settings
 * ============================================================================
 *
 * Settings for battler sprite offsets when using the Sideview Battle UI.
 * Since there's more room on the screen, placing them lower will help adjust
 * for the player's visual comfort.
 *
 * ---
 *
 * Settings
 * 
 *   Perform Offset?:
 *   - Offsets the battler sprite positions when using Sideview Battle UI.
 * 
 *   Offset X:
 *   - How much to offset the sprite positions by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the sprite positions by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Window Settings
 * ============================================================================
 *
 * Settings for general windows when using the Sideview Battle UI. These
 * settings are made for the windows that aren't the status windows but are
 * affected by this plugin.
 *
 * ---
 *
 * Global
 * 
 *   UI Scale:
 *   - What is the scaling rate for battle windows?
 *   - Use a number between 0 and 1 for the best results.
 *
 * ---
 *
 * Help Window
 * 
 *   Fade BG Style?:
 *   - Fade the Help Window background with this UI?
 *
 * ---
 *
 * Actor Command Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the actor command window with
 *     this UI?
 *
 * ---
 *
 * Party Command Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the party command window with
 *     this UI?
 *
 * ---
 *
 * Item Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the item window with this UI?
 * 
 *   Width:
 *   - What is the width item window with this UI?
 *   - This is the width BEFORE scaling.
 * 
 *   Offset X:
 *   - How much to offset the window X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the window Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Skill Window
 * 
 *   Max Rows:
 *   - What is the maximum number of rows for the skill window with this UI?
 * 
 *   Width:
 *   - What is the width skill window with this UI?
 *   - This is the width BEFORE scaling.
 * 
 *   Offset X:
 *   - How much to offset the window X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the window Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Window Settings
 * ============================================================================
 *
 * Settings for the status window when using the Sideview Battle UI. Each of
 * these plugin parameters allow you to adjust many of the various elements
 * found inside of this window.
 *
 * ---
 *
 * Dimensions
 * 
 *   Width Base:
 *   - How width is each actor's status window?
 *   - This is the width AFTER scaling.
 * 
 *   Height Base:
 *   - How tall do you want the status window to be?
 *   - 'auto' for automatic calculations.
 *   - This is the height BEFORE scaling.
 * 
 *     Height Buffer:
 *     - How much space do you want there to be vertically from window
 *       to window?
 *     - This is the height BEFORE scaling.
 * 
 *   Move Distance:
 *   - How far will the status window move when the actor is selected
 *     or active?
 * 
 *     Move Speed:
 *     - How many pixels with the status window move per frame?
 *
 * ---
 * 
 * Standard UI > BG
 * 
 *   Background Dim?:
 *   - Show the dimmed background?
 * 
 * ---
 *
 * Standard UI > Name
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > States
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Ignore Scale?:
 *   - Ignore scaling to show icons at their real size?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > TPB/ATB Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > HP Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > MP Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Standard UI > TP Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Aggro Gauge
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_2_AggroControlSystem!
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Boost Points
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_3_BoostAction!
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Brave Points
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_2_BattleSystemBTB!
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > Break Shield
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_4_BreakShields!
 * 
 *   Ignore Scale?:
 *   - Ignore scaling to show icons at their real size?
 * 
 *   Offset X:
 *   - How much to offset the UI X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the UI Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Compatibility UI > State Tooltips
 * 
 *   Show?:
 *   - Show this UI element?
 *   - Requires VisuMZ_3_StateTooltips!
 *
 * ---
 * 
 * JS
 * 
 *   JS: Custom UI:
 *   - JavaScript used to add custom elements to each status window.
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
 * Version 1.05: June 9, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused some windows to not appear correctly when cancel
 *    is pressed upon certain conditions. Fix made by Olivia.
 * 
 * Version 1.04: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Status Window Settings > Background Dim?
 * **** Show the dimmed background?
 * 
 * Version 1.03: July 30, 2021
 * * Bug Fixes!
 * ** Plugin Parameters for adjusting row quantity should now work properly.
 *    Fix made by Olivia.
 * 
 * Version 1.02: June 18, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.01: April 23, 2021
 * * Bug Fixes!
 * ** Item window during battle should now align properly. Fix made by Olivia.
 *
 * Version 1.00 Official Release Date: May 12, 2021
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
 * @param SideviewBattleUI
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Battler:struct
 * @text Battler Offset Settings
 * @type struct<Battler>
 * @desc Settings for battler sprite offsets when using the Sideview Battle UI.
 * @default {"Enable:eval":"true","OffsetX:num":"+0","OffsetY:num":"+128"}
 *
 * @param GeneralWindow:struct
 * @text General Window Settings
 * @type struct<GeneralWindow>
 * @desc Settings for general windows when using the Sideview Battle UI.
 * @default {"Global":"","UiScale:num":"0.80","HelpWindow":"","HelpFadeStyle:eval":"true","ActorCommandWindow":"","ActorCommandWindowMaxRows:num":"8","PartyCommandWindow":"","PartyCommandWindowMaxRows:num":"8","ItemWindow":"","ItemWindowMaxRows:num":"8","ItemWindowWidth:num":"400","ItemWindowOffsetX:num":"+16","ItemWindowOffsetY:num":"+16","SkillWindow":"","SkillWindowMaxRows:num":"8","SkillWindowWidth:num":"400","SkillWindowOffsetX:num":"+16","SkillWindowOffsetY:num":"+16"}
 *
 * @param StatusWindow:struct
 * @text Status Window Settings
 * @type struct<StatusWindow>
 * @desc Settings for the status window when using the Sideview Battle UI.
 * @default {"Dimensions":"","WidthBase:num":"200","HeightBase:str":"auto","HeightBuffer:num":"4","MoveDistance:num":"48","MoveSpeed:num":"4","Standard":"","Name":"","NameShow:eval":"true","NameOffsetX:num":"+48","NameOffsetY:num":"+0","States":"","StatesShow:eval":"true","StatesIgnoreScale:eval":"true","StatesOffsetX:num":"+20","StatesOffsetY:num":"+20","Tpb":"","TpbShow:eval":"true","TpbOffsetX:num":"+44","TpbOffsetY:num":"+0","Hp":"","HpShow:eval":"true","HpOffsetX:num":"+60","HpOffsetY:num":"+0","Mp":"","MpShow:eval":"true","MpOffsetX:num":"+68","MpOffsetY:num":"+0","Tp":"","TpShow:eval":"true","TpOffsetX:num":"+74","TpOffsetY:num":"+0","Compatibility":"","Aggro":"","AggroShow:eval":"true","AggroOffsetX:num":"+44","AggroOffsetY:num":"+0","Boost":"","BoostShow:eval":"true","BoostOffsetX:num":"+52","BoostOffsetY:num":"+2","Brave":"","BraveShow:eval":"true","BraveOffsetX:num":"+52","BraveOffsetY:num":"-6","BreakShield":"","BreakShieldShow:eval":"true","BreakShieldIgnoreScale:eval":"true","BreakShieldOffsetX:num":"+20","BreakShieldOffsetY:num":"+20","StateTooltips":"","StateTooltipsShow:eval":"true","JS":"","CustomUi:func":"\"// Declare Variables\\nconst actor = arguments[0];\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\n\\n// Draw Custom Elements\\n// Put in code you want here used for windows classes\""}
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
 * Battler Offset Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battler:
 *
 * @param Enable:eval
 * @text Perform Offset?
 * @type boolean
 * @on Do Offset
 * @off Don't Offset
 * @desc Offsets the battler sprite positions when using Sideview Battle UI.
 * @default true
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the sprite positions by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the sprite positions by?
 * Negative goes up. Positive goes down.
 * @default +128
 *
 */
/* ----------------------------------------------------------------------------
 * GeneralWindow Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GeneralWindow:
 *
 * @param Global
 *
 * @param UiScale:num
 * @text UI Scale
 * @parent Global
 * @desc What is the scaling rate for battle windows?
 * Use a number between 0 and 1 for the best results.
 * @default 0.80
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFadeStyle:eval
 * @text Fade BG Style?
 * @parent HelpWindow
 * @type boolean
 * @on Fade Background
 * @off Default Background
 * @desc Fade the Help Window background with this UI?
 * @default true
 *
 * @param ActorCommandWindow
 * @text Actor Command Window
 *
 * @param ActorCommandWindowMaxRows:num
 * @text Max Rows
 * @parent ActorCommandWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the actor command window with this UI?
 * @default 8
 *
 * @param PartyCommandWindow
 * @text Party Command Window
 *
 * @param PartyCommandWindowMaxRows:num
 * @text Max Rows
 * @parent PartyCommandWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the party command window with this UI?
 * @default 8
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemWindowMaxRows:num
 * @text Max Rows
 * @parent ItemWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the item window with this UI?
 * @default 8
 *
 * @param ItemWindowWidth:num
 * @text Width
 * @parent ItemWindow
 * @type number
 * @min 1
 * @desc What is the width item window with this UI?
 * This is the width BEFORE scaling.
 * @default 400
 *
 * @param ItemWindowOffsetX:num
 * @text Offset X
 * @parent ItemWindow
 * @desc How much to offset the window X position by?
 * Negative goes left. Positive goes right.
 * @default +16
 *
 * @param ItemWindowOffsetY:num
 * @text Offset Y
 * @parent ItemWindow
 * @desc How much to offset the window Y position by?
 * Negative goes up. Positive goes down.
 * @default +16
 *
 * @param SkillWindow
 * @text Skill Window
 *
 * @param SkillWindowMaxRows:num
 * @text Max Rows
 * @parent SkillWindow
 * @type number
 * @min 1
 * @desc What is the maximum number of rows for the skill window with this UI?
 * @default 8
 *
 * @param SkillWindowWidth:num
 * @text Width
 * @parent SkillWindow
 * @type number
 * @min 1
 * @desc What is the width skill window with this UI?
 * This is the width BEFORE scaling.
 * @default 400
 *
 * @param SkillWindowOffsetX:num
 * @text Offset X
 * @parent SkillWindow
 * @desc How much to offset the window X position by?
 * Negative goes left. Positive goes right.
 * @default +16
 *
 * @param SkillWindowOffsetY:num
 * @text Offset Y
 * @parent SkillWindow
 * @desc How much to offset the window Y position by?
 * Negative goes up. Positive goes down.
 * @default +16
 *
 */
/* ----------------------------------------------------------------------------
 * Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param Dimensions
 *
 * @param WidthBase:num
 * @text Width Base
 * @parent Dimensions
 * @type number
 * @desc How width is each actor's status window?
 * This is the width AFTER scaling.
 * @default 200
 *
 * @param HeightBase:str
 * @text Height Base
 * @parent Dimensions
 * @type number
 * @desc How tall do you want the status window to be?
 * 'auto' for automatic calculations. Value is BEFORE scaling.
 * @default auto
 *
 * @param HeightBuffer:num
 * @text Height Buffer
 * @parent HeightBase:str
 * @type number
 * @desc How much space do you want there to be vertically from window to window?
 * @default 4
 *
 * @param MoveDistance:num
 * @text Move Distance
 * @parent Dimensions
 * @type number
 * @desc How far will the status window move when
 * the actor is selected or active?
 * @default 48
 *
 * @param MoveSpeed:num
 * @text Move Speed
 * @parent MoveDistance:num
 * @type number
 * @desc How many pixels with the status window move per frame?
 * @default 4
 *
 * @param Standard
 * @text Standard UI
 *
 * @param BgShow:eval
 * @text Background Dim?
 * @parent Standard
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the dimmed background?
 * @default true
 * 
 * @param Name
 * @parent Standard
 *
 * @param NameShow:eval
 * @text Show?
 * @parent Name
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param NameOffsetX:num
 * @text Offset X
 * @parent Name
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +48
 *
 * @param NameOffsetY:num
 * @text Offset Y
 * @parent Name
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param States
 * @parent Standard
 *
 * @param StatesShow:eval
 * @text Show?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param StatesIgnoreScale:eval
 * @text Ignore Scale?
 * @parent States
 * @type boolean
 * @on Ignore Scaling
 * @off Use Scaling
 * @desc Ignore scaling to show icons at their real size?
 * @default true
 *
 * @param StatesOffsetX:num
 * @text Offset X
 * @parent States
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +20
 *
 * @param StatesOffsetY:num
 * @text Offset Y
 * @parent States
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +20
 * 
 * @param Tpb
 * @text TPB/ATB Gauge
 * @parent Standard
 *
 * @param TpbShow:eval
 * @text Show?
 * @parent Tpb
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param TpbOffsetX:num
 * @text Offset X
 * @parent Tpb
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +44
 *
 * @param TpbOffsetY:num
 * @text Offset Y
 * @parent Tpb
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Hp
 * @text HP Gauge
 * @parent Standard
 *
 * @param HpShow:eval
 * @text Show?
 * @parent Hp
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param HpOffsetX:num
 * @text Offset X
 * @parent Hp
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +60
 *
 * @param HpOffsetY:num
 * @text Offset Y
 * @parent Hp
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Mp
 * @text MP Gauge
 * @parent Standard
 *
 * @param MpShow:eval
 * @text Show?
 * @parent Mp
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param MpOffsetX:num
 * @text Offset X
 * @parent Mp
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +68
 *
 * @param MpOffsetY:num
 * @text Offset Y
 * @parent Mp
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Tp
 * @text TP Gauge
 * @parent Standard
 *
 * @param TpShow:eval
 * @text Show?
 * @parent Tp
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * @default true
 *
 * @param TpOffsetX:num
 * @text Offset X
 * @parent Tp
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +74
 *
 * @param TpOffsetY:num
 * @text Offset Y
 * @parent Tp
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param Compatibility
 * @text Compatibility UI
 * 
 * @param Aggro
 * @text Aggro Gauge
 * @parent Compatibility
 * @default VisuMZ_2_AggroControlSystem
 *
 * @param AggroShow:eval
 * @text Show?
 * @parent Aggro
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_2_AggroControlSystem!
 * @default true
 *
 * @param AggroOffsetX:num
 * @text Offset X
 * @parent Aggro
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +44
 *
 * @param AggroOffsetY:num
 * @text Offset Y
 * @parent Aggro
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param Boost
 * @text Boost Points
 * @parent Compatibility
 * @default VisuMZ_3_BoostAction
 *
 * @param BoostShow:eval
 * @text Show?
 * @parent Boost
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_3_BoostAction!
 * @default true
 *
 * @param BoostOffsetX:num
 * @text Offset X
 * @parent Boost
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +52
 *
 * @param BoostOffsetY:num
 * @text Offset Y
 * @parent Boost
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +2
 * 
 * @param Brave
 * @text Brave Points
 * @parent Compatibility
 * @default VisuMZ_2_BattleSystemBTB
 *
 * @param BraveShow:eval
 * @text Show?
 * @parent Brave
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_2_BattleSystemBTB!
 * @default true
 *
 * @param BraveOffsetX:num
 * @text Offset X
 * @parent Brave
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +52
 *
 * @param BraveOffsetY:num
 * @text Offset Y
 * @parent Brave
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default -6
 * 
 * @param BreakShield
 * @text Break Shield
 * @parent Compatibility
 * @default VisuMZ_4_BreakShields
 *
 * @param BreakShieldShow:eval
 * @text Show?
 * @parent BreakShield
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_4_BreakShields!
 * @default true
 *
 * @param BreakShieldIgnoreScale:eval
 * @text Ignore Scale?
 * @parent BreakShield
 * @type boolean
 * @on Ignore Scaling
 * @off Use Scaling
 * @desc Ignore scaling to show icons at their real size?
 * @default true
 *
 * @param BreakShieldOffsetX:num
 * @text Offset X
 * @parent BreakShield
 * @desc How much to offset the UI X position by?
 * Negative goes left. Positive goes right.
 * @default +20
 *
 * @param BreakShieldOffsetY:num
 * @text Offset Y
 * @parent BreakShield
 * @desc How much to offset the UI Y position by?
 * Negative goes up. Positive goes down.
 * @default +20
 * 
 * @param StateTooltips
 * @text State Tooltips
 * @parent Compatibility
 * @default VisuMZ_3_StateTooltips
 *
 * @param StateTooltipsShow:eval
 * @text Show?
 * @parent StateTooltips
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this UI element?
 * Requires VisuMZ_3_StateTooltips!
 * @default true
 *
 * @param JS
 *
 * @param CustomUi:func
 * @text JS: Custom UI
 * @parent JS
 * @type note
 * @desc JavaScript used to add custom elements to each status window.
 * @default "// Declare Variables\nconst actor = arguments[0];\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\n\n// Draw Custom Elements\n// Put in code you want here used for windows classes"
 *
 */
//=============================================================================

const _0x294cd2=_0x1d63;(function(_0x17f6c7,_0x4bc850){const _0xf7ff31=_0x1d63,_0x17584d=_0x17f6c7();while(!![]){try{const _0x42c10c=-parseInt(_0xf7ff31(0x236))/0x1+parseInt(_0xf7ff31(0x20f))/0x2+-parseInt(_0xf7ff31(0x206))/0x3*(parseInt(_0xf7ff31(0x2e4))/0x4)+parseInt(_0xf7ff31(0x283))/0x5*(-parseInt(_0xf7ff31(0x269))/0x6)+parseInt(_0xf7ff31(0x227))/0x7+-parseInt(_0xf7ff31(0x1f5))/0x8+-parseInt(_0xf7ff31(0x266))/0x9*(-parseInt(_0xf7ff31(0x29c))/0xa);if(_0x42c10c===_0x4bc850)break;else _0x17584d['push'](_0x17584d['shift']());}catch(_0x12ce47){_0x17584d['push'](_0x17584d['shift']());}}}(_0x29b5,0x864d6));function _0x1d63(_0x3a96a7,_0xf78553){const _0x29b5d8=_0x29b5();return _0x1d63=function(_0x1d6339,_0x26553f){_0x1d6339=_0x1d6339-0x1c9;let _0x5d03a1=_0x29b5d8[_0x1d6339];return _0x5d03a1;},_0x1d63(_0x3a96a7,_0xf78553);}var label=_0x294cd2(0x209),tier=tier||0x0,dependencies=[_0x294cd2(0x257)],pluginData=$plugins['filter'](function(_0x5b4822){const _0x2259cf=_0x294cd2;return _0x5b4822[_0x2259cf(0x2aa)]&&_0x5b4822[_0x2259cf(0x1cf)][_0x2259cf(0x274)]('['+label+']');})[0x0];function _0x29b5(){const _0x32d082=['_scene','isCTB','height','sideviewUiTargetActor','Window_SkillList_makeItemList','opacity','Window_BattleStatus_updateRefresh','fittingHeight','hide','status','show','max','AggroShow','adjustSideviewUiWidth','WIDTH_BASE','ConvertParams','Settings','createStatusWindow','NAME_SHOWN','AGGRO_OFFSET_Y','MOVE_SPEED','BG_SHOW','HP_GAUGE_SHOWN','battler','boxHeight','Aggro','auto','_battleField','STATES_SHOWN','BRAVE_OFFSET_Y','refresh','STATES_REVERSE_SCALE','drawCustomJS','isShowTpbGauge','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','version','updateStatusWindowPosition','StatusGauge','Window_SkillList_maxCols','padding','StatusWindow','Window_ItemList_colSpacing','TP_GAUGE_OFFSET_X','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','SIDEVIEW_BATTLE_UI_WINDOW_WIDTH','_homeX','SIDEVIEW_BATTLE_UI_WINDOW_MAX_ROWS','update','actor%1-breakShieldIcon','isTpb','clampSideviewUiPlacementPosition','StateTooltipsShow','SIDEVIEW_BATTLE_UI_BATTLER_OFFSET_Y','WIDTH_MOVE','BraveOffsetX','TpbOffsetY','HEIGHT_BUFFER','_actorCommandWindow','updateSideviewUiFadeOut','activate','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','createCancelButton','StatesIgnoreScale','BreakShieldOffsetX','_skillWindow','sideview_ui','HeightBase','224956OHdxTk','applyInverse','isUsingSideviewUiLayout','isSideView','onActorCancel','iconHeight','JSON','placeAggroGauge','BreakShieldIgnoreScale','initialize','_itemWindow','addChildToBack','Sprite_Battler_setHome','autoRowCount','maxSideviewUiRows','isActivePosition','scale','VisuMZ_4_BreakShields','setHome','_dimmerSprite','ItemWindowOffsetY','maxCols','description','EVAL','MP_GAUGE_SHOWN','gaugeLineHeight','ceil','Window_ItemList_initialize','parameters','drawActorBravePoints','isInputting','createSideviewUiDimmerSprite','BgShow','Window_ItemList_makeItemList','_list','actorId','map','_actorWindow','BREAK_SHIELD_SHOWN','StatesOffsetY','Enable','placeGauge','returnSideviewCommandWindows','isWindowMaskingEnabled','innerRect','_spriteset','ARRAYNUM','call','updateSideviewUiFadeIn','round','hideAdditionalSprites','aggroGauge','constructor','updatePosition','toUpperCase','BraveShow','SIDEVIEW_BATTLE_UI_FADE_STYLE','onEnemyCancel','BOOST_OFFSET_X','HeightBuffer','7037688NzGeiv','SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_X','parse','bitmap','colSpacing','getStateTooltipBattler','GeneralWindow','actorWindowRect','ItemWindowMaxRows','MP_GAUGE_OFFSET_X','isStateTooltipEnabled','BreakShieldShow','_additionalSprites','NAME_OFFSET_Y','_currentActor','isAdjustBravePoints','TpbOffsetX','30EuunKU','ARRAYEVAL','trim','SideviewBattleUI','Window_SkillList_colSpacing','placeTimeGauge','isShowAggro','SIDEVIEW_BATTLE_UI_SCALE','Battler','729330fKUxMa','maxBattleMembers','BoostOffsetY','ARRAYSTR','_activeX','dataSideviewUiLength','name','Window_SkillList_initialize','Scene_Battle_actorWindowRect','Scene_Base_isWindowMaskingEnabled','Scene_Battle_onEnemyCancel','updateBattler','STR','_sideviewUiBattleStatusWindows','SkillWindowOffsetX','isAdjustBoostPoints','sideviewUiWidth','TpbShow','adjustSideviewUiHeight','BoostShow','battleMembers','aliveMembers','sideviewUiPositionOffsetY','prototype','1838501sMNfHD','TpOffsetY','MP_GAUGE_OFFSET_Y','Window_ItemList_maxCols','skill','BOOST_OFFSET_Y','AggroControlSystem','UiScale','BraveOffsetY','updateRefreshSideviewUi','AGGRO_OFFSET_X','updateSideviewUiPosition','Scene_Battle_createStatusWindow','ItemWindowOffsetX','min','308998YlTyiZ','HpOffsetX','StatesShow','create','battleLayoutStyle','_partyIndex','SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_Y','exit','PartyCommandWindowMaxRows','Scene_Battle_statusWindowRect','createWindowRect','clamp','TP_GAUGE_SHOWN','createSideviewUiBattleStatusWindows','OffsetY','isSelected','visible','boxWidth','Scene_Battle_updateStatusWindowPosition','ICON_SIZE_RATE','TP_GAUGE_OFFSET_Y','active','_enemyWindow','format','item','currentSymbol','fillRect','match','NameOffsetY','isBattleRefreshRequested','initMembersSideviewUi','ARRAYFUNC','placeStateIcon','VisuMZ_1_BattleCore','return\x200','Scene_Battle_onActorCancel','placeActorName','NameOffsetX','width','clearBattleRefreshRequest','Window_ActorCommand_initialize','VisuMZ_2_AggroControlSystem','BattleLayout','updateRefresh','Window_ActorCommand_makeCommandList','Window_PartyCommand_initialize','NUM','TPB_OFFSET_X','9qgRRug','FUNC','_targetX','12KnzMcc','ARRAYJSON','drawBasicStatus','STRUCT','HP_GAUGE_OFFSET_X','MpOffsetY','statusWindowRect','BREAK_SHIELD_REVERSE_SCALE','drawAllItems','TpShow','BoostOffsetX','includes','_battler','sideviewUiPositionOffsetX','isBTB','BreakShieldOffsetY','floor','BRAVE_OFFSET_X','SIDEVIEW_BATTLE_UI_BATTLER_OFFSET_X','STATE_TOOLTIPS_SHOWN','AggroOffsetY','CustomUi','allowBoostAction','OffsetX','AggroOffsetX','MoveDistance','1526155sCOcJK','actor%1-stateIcon','ActorCommandWindowMaxRows','refreshSideviewUiBattleStatusWindows','HP_GAUGE_OFFSET_Y','Scene_Battle_createCancelButton','_actor','isStateTooltipTouched','contains','STATES_OFFSET_Y','_subject','BRAVE_SHOWN','VisuMZ_3_BoostAction','_partyCommandWindow','_requestRefresh','dimColor1','placeBoostPoints','setBackgroundType','_data','Window_Help_initialize','makeItemList','createContents','Window_PartyCommand_makeCommandList','SkillWindowOffsetY','SkillWindowWidth','22843550pDzOPV','TPB_OFFSET_Y','BREAK_SHIELD_OFFSET_Y','SIDEVIEW_BATTLE_UI_MOVE_BATTLERS','Game_System_isSideView'];_0x29b5=function(){return _0x32d082;};return _0x29b5();}VisuMZ[label][_0x294cd2(0x2b1)]=VisuMZ[label][_0x294cd2(0x2b1)]||{},VisuMZ[_0x294cd2(0x2b0)]=function(_0x2eb696,_0x475513){const _0x116b7c=_0x294cd2;for(const _0xdb0378 in _0x475513){if(_0xdb0378['match'](/(.*):(.*)/i)){const _0x5bf47d=String(RegExp['$1']),_0x356ce0=String(RegExp['$2'])[_0x116b7c(0x1ef)]()[_0x116b7c(0x208)]();let _0x1a982f,_0x36a4e7,_0x891f39;switch(_0x356ce0){case _0x116b7c(0x264):_0x1a982f=_0x475513[_0xdb0378]!==''?Number(_0x475513[_0xdb0378]):0x0;break;case _0x116b7c(0x1e7):_0x36a4e7=_0x475513[_0xdb0378]!==''?JSON[_0x116b7c(0x1f7)](_0x475513[_0xdb0378]):[],_0x1a982f=_0x36a4e7[_0x116b7c(0x1dd)](_0x2319a8=>Number(_0x2319a8));break;case _0x116b7c(0x1d0):_0x1a982f=_0x475513[_0xdb0378]!==''?eval(_0x475513[_0xdb0378]):null;break;case _0x116b7c(0x207):_0x36a4e7=_0x475513[_0xdb0378]!==''?JSON['parse'](_0x475513[_0xdb0378]):[],_0x1a982f=_0x36a4e7[_0x116b7c(0x1dd)](_0x223883=>eval(_0x223883));break;case _0x116b7c(0x2ea):_0x1a982f=_0x475513[_0xdb0378]!==''?JSON[_0x116b7c(0x1f7)](_0x475513[_0xdb0378]):'';break;case _0x116b7c(0x26a):_0x36a4e7=_0x475513[_0xdb0378]!==''?JSON[_0x116b7c(0x1f7)](_0x475513[_0xdb0378]):[],_0x1a982f=_0x36a4e7[_0x116b7c(0x1dd)](_0x42a02a=>JSON[_0x116b7c(0x1f7)](_0x42a02a));break;case _0x116b7c(0x267):_0x1a982f=_0x475513[_0xdb0378]!==''?new Function(JSON['parse'](_0x475513[_0xdb0378])):new Function(_0x116b7c(0x258));break;case _0x116b7c(0x255):_0x36a4e7=_0x475513[_0xdb0378]!==''?JSON[_0x116b7c(0x1f7)](_0x475513[_0xdb0378]):[],_0x1a982f=_0x36a4e7[_0x116b7c(0x1dd)](_0x1a8bca=>new Function(JSON[_0x116b7c(0x1f7)](_0x1a8bca)));break;case _0x116b7c(0x21b):_0x1a982f=_0x475513[_0xdb0378]!==''?String(_0x475513[_0xdb0378]):'';break;case _0x116b7c(0x212):_0x36a4e7=_0x475513[_0xdb0378]!==''?JSON['parse'](_0x475513[_0xdb0378]):[],_0x1a982f=_0x36a4e7[_0x116b7c(0x1dd)](_0xd96aae=>String(_0xd96aae));break;case _0x116b7c(0x26c):_0x891f39=_0x475513[_0xdb0378]!==''?JSON[_0x116b7c(0x1f7)](_0x475513[_0xdb0378]):{},_0x1a982f=VisuMZ['ConvertParams']({},_0x891f39);break;case'ARRAYSTRUCT':_0x36a4e7=_0x475513[_0xdb0378]!==''?JSON[_0x116b7c(0x1f7)](_0x475513[_0xdb0378]):[],_0x1a982f=_0x36a4e7['map'](_0x21c275=>VisuMZ['ConvertParams']({},JSON['parse'](_0x21c275)));break;default:continue;}_0x2eb696[_0x5bf47d]=_0x1a982f;}}return _0x2eb696;},(_0x55d1c1=>{const _0x4124aa=_0x294cd2,_0x58521c=_0x55d1c1[_0x4124aa(0x215)];for(const _0x5719b0 of dependencies){if(!Imported[_0x5719b0]){alert(_0x4124aa(0x2cc)[_0x4124aa(0x24d)](_0x58521c,_0x5719b0)),SceneManager[_0x4124aa(0x23d)]();break;}}const _0x31f870=_0x55d1c1[_0x4124aa(0x1cf)];if(_0x31f870[_0x4124aa(0x251)](/\[Version[ ](.*?)\]/i)){const _0x1315a1=Number(RegExp['$1']);_0x1315a1!==VisuMZ[label][_0x4124aa(0x2c4)]&&(alert(_0x4124aa(0x2c3)[_0x4124aa(0x24d)](_0x58521c,_0x1315a1)),SceneManager['exit']());}if(_0x31f870[_0x4124aa(0x251)](/\[Tier[ ](\d+)\]/i)){const _0x5498d1=Number(RegExp['$1']);_0x5498d1<tier?(alert(_0x4124aa(0x2dd)[_0x4124aa(0x24d)](_0x58521c,_0x5498d1,tier)),SceneManager[_0x4124aa(0x23d)]()):tier=Math[_0x4124aa(0x2ac)](_0x5498d1,tier);}VisuMZ[_0x4124aa(0x2b0)](VisuMZ[label][_0x4124aa(0x2b1)],_0x55d1c1[_0x4124aa(0x1d5)]);})(pluginData),BattleManager['isUsingSideviewUiLayout']=function(){const _0x306fc9=_0x294cd2;return SceneManager['isSceneBattle']()&&SceneManager[_0x306fc9(0x2a1)][_0x306fc9(0x23a)]()===_0x306fc9(0x2e2);},VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2a0)]=Game_System[_0x294cd2(0x226)][_0x294cd2(0x2e7)],Game_System['prototype'][_0x294cd2(0x2e7)]=function(){const _0x11d71c=_0x294cd2;if(BattleManager[_0x11d71c(0x2e6)]())return!![];return VisuMZ['SideviewBattleUI']['Game_System_isSideView'][_0x11d71c(0x1e8)](this);},VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x218)]=Scene_Base[_0x294cd2(0x226)][_0x294cd2(0x1e4)],Scene_Base[_0x294cd2(0x226)][_0x294cd2(0x1e4)]=function(){const _0x5c3dcf=_0x294cd2;return BattleManager['isUsingSideviewUiLayout']()?![]:VisuMZ[_0x5c3dcf(0x209)]['Scene_Base_isWindowMaskingEnabled']['call'](this);},VisuMZ[_0x294cd2(0x209)]['Scene_Battle_statusWindowRect']=Scene_Battle['prototype'][_0x294cd2(0x26f)],Scene_Battle[_0x294cd2(0x226)][_0x294cd2(0x26f)]=function(){const _0x39b42e=_0x294cd2,_0x4754ee=VisuMZ[_0x39b42e(0x209)][_0x39b42e(0x23f)][_0x39b42e(0x1e8)](this);return BattleManager[_0x39b42e(0x2e6)]()&&(_0x4754ee['y']=Graphics[_0x39b42e(0x2a3)]*0xa,_0x4754ee[_0x39b42e(0x2a3)]=0x0),_0x4754ee;},VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x217)]=Scene_Battle[_0x294cd2(0x226)][_0x294cd2(0x1fc)],Scene_Battle[_0x294cd2(0x226)]['actorWindowRect']=function(){const _0x5d2a92=_0x294cd2,_0x749c1d=VisuMZ[_0x5d2a92(0x209)][_0x5d2a92(0x217)]['call'](this);return BattleManager[_0x5d2a92(0x2e6)]()&&(_0x749c1d['y']=Graphics[_0x5d2a92(0x2a3)]*0xa,_0x749c1d['height']=0x0),_0x749c1d;},VisuMZ['SideviewBattleUI']['Scene_Battle_updateStatusWindowPosition']=Scene_Battle[_0x294cd2(0x226)][_0x294cd2(0x2c5)],Scene_Battle[_0x294cd2(0x226)][_0x294cd2(0x2c5)]=function(){const _0x1b34ce=_0x294cd2;VisuMZ[_0x1b34ce(0x209)][_0x1b34ce(0x248)][_0x1b34ce(0x1e8)](this),this['updateSideviewBattleUIPositions']();},Scene_Battle[_0x294cd2(0x226)]['updateSideviewBattleUIPositions']=function(){const _0x576b0a=_0x294cd2;if(!BattleManager[_0x576b0a(0x1d7)]())return;if(!BattleManager[_0x576b0a(0x2e6)]())return;this[_0x576b0a(0x290)][_0x576b0a(0x24b)]&&this[_0x576b0a(0x290)]['updateSideviewUiPosition'](),this[_0x576b0a(0x2da)][_0x576b0a(0x24b)]&&this[_0x576b0a(0x2da)][_0x576b0a(0x232)](),this[_0x576b0a(0x2e1)][_0x576b0a(0x24b)]&&(this['_actorCommandWindow'][_0x576b0a(0x232)](),this[_0x576b0a(0x2e1)]['updateSideviewUiPosition']()),this['_itemWindow'][_0x576b0a(0x24b)]&&(this[_0x576b0a(0x2da)]['updateSideviewUiPosition'](),this[_0x576b0a(0x2ee)]['updateSideviewUiPosition']()),this[_0x576b0a(0x1de)]['active']&&(this[_0x576b0a(0x2da)]['updateSideviewUiFadeOut'](),this[_0x576b0a(0x2e1)][_0x576b0a(0x2db)](),this[_0x576b0a(0x2ee)][_0x576b0a(0x2db)]()),this['_enemyWindow'][_0x576b0a(0x24b)]&&(this[_0x576b0a(0x2da)][_0x576b0a(0x2db)](),this[_0x576b0a(0x2e1)][_0x576b0a(0x2db)](),this[_0x576b0a(0x2ee)][_0x576b0a(0x2db)]());},VisuMZ['SideviewBattleUI'][_0x294cd2(0x233)]=Scene_Battle['prototype'][_0x294cd2(0x2b2)],Scene_Battle[_0x294cd2(0x226)][_0x294cd2(0x2b2)]=function(){const _0xc159d3=_0x294cd2;VisuMZ[_0xc159d3(0x209)][_0xc159d3(0x233)][_0xc159d3(0x1e8)](this),this[_0xc159d3(0x243)]();},Scene_Battle[_0x294cd2(0x226)][_0x294cd2(0x243)]=function(){const _0xff8d1e=_0x294cd2;if(!BattleManager['isUsingSideviewUiLayout']())return;this['_sideviewUiBattleStatusWindows']=[];const _0x5aafe2=$gameParty[_0xff8d1e(0x210)]();for(let _0x1f521d=0x0;_0x1f521d<_0x5aafe2;_0x1f521d++){const _0x90099f=new Window_SideviewUiBattleStatus(_0x1f521d);this['addWindow'](_0x90099f),this['_sideviewUiBattleStatusWindows']['push'](_0x90099f);}},Scene_Battle[_0x294cd2(0x226)][_0x294cd2(0x286)]=function(){const _0x443e49=_0x294cd2;if(!this[_0x443e49(0x21c)])return;for(const _0x2c6988 of this[_0x443e49(0x21c)]){if(!_0x2c6988)continue;_0x2c6988[_0x443e49(0x2bf)]();}},VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x288)]=Scene_Battle[_0x294cd2(0x226)][_0x294cd2(0x2de)],Scene_Battle[_0x294cd2(0x226)][_0x294cd2(0x2de)]=function(){const _0x1bb5c1=_0x294cd2;if(BattleManager[_0x1bb5c1(0x2e6)]())return;VisuMZ[_0x1bb5c1(0x209)][_0x1bb5c1(0x288)]['call'](this);},VisuMZ[_0x294cd2(0x209)]['Scene_Battle_onActorCancel']=Scene_Battle[_0x294cd2(0x226)][_0x294cd2(0x2e8)],Scene_Battle['prototype']['onActorCancel']=function(){const _0x5cf6be=_0x294cd2;BattleManager[_0x5cf6be(0x2e6)]()?(this['_actorWindow']['hide'](),this[_0x5cf6be(0x1e3)]()):VisuMZ[_0x5cf6be(0x209)][_0x5cf6be(0x259)][_0x5cf6be(0x1e8)](this);},VisuMZ[_0x294cd2(0x209)]['Scene_Battle_onEnemyCancel']=Scene_Battle[_0x294cd2(0x226)][_0x294cd2(0x1f2)],Scene_Battle[_0x294cd2(0x226)][_0x294cd2(0x1f2)]=function(){const _0x4a0d24=_0x294cd2;BattleManager[_0x4a0d24(0x2e6)]()?(this[_0x4a0d24(0x24c)][_0x4a0d24(0x2a9)](),this[_0x4a0d24(0x1e3)]()):VisuMZ[_0x4a0d24(0x209)][_0x4a0d24(0x219)][_0x4a0d24(0x1e8)](this);},Scene_Battle['prototype'][_0x294cd2(0x1e3)]=function(){const _0x1b9c8c=_0x294cd2;this['_actorCommandWindow'][_0x1b9c8c(0x2ab)]();switch(this['_actorCommandWindow'][_0x1b9c8c(0x24f)]()){case _0x1b9c8c(0x22b):this[_0x1b9c8c(0x2e1)][_0x1b9c8c(0x2ab)](),this[_0x1b9c8c(0x2e1)][_0x1b9c8c(0x2dc)]();break;case _0x1b9c8c(0x24e):this['_itemWindow'][_0x1b9c8c(0x2ab)](),this[_0x1b9c8c(0x2ee)]['activate']();break;}},Sprite_Battler['SIDEVIEW_BATTLE_UI_MOVE_BATTLERS']=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x20e)][_0x294cd2(0x1e1)]??!![],Sprite_Battler['SIDEVIEW_BATTLE_UI_BATTLER_OFFSET_X']=VisuMZ[_0x294cd2(0x209)]['Settings'][_0x294cd2(0x20e)][_0x294cd2(0x280)]??0x0,Sprite_Battler[_0x294cd2(0x2d5)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x20e)][_0x294cd2(0x244)]??0x80,VisuMZ['SideviewBattleUI'][_0x294cd2(0x2f0)]=Sprite_Battler['prototype'][_0x294cd2(0x1cb)],Sprite_Battler[_0x294cd2(0x226)][_0x294cd2(0x1cb)]=function(_0x284674,_0x2aad3b){const _0x4c6c4c=_0x294cd2;BattleManager[_0x4c6c4c(0x2e6)]()&&Sprite_Battler[_0x4c6c4c(0x29f)]&&(_0x284674+=Sprite_Battler[_0x4c6c4c(0x27b)],_0x2aad3b+=Sprite_Battler[_0x4c6c4c(0x2d5)]),VisuMZ[_0x4c6c4c(0x209)][_0x4c6c4c(0x2f0)][_0x4c6c4c(0x1e8)](this,_0x284674,_0x2aad3b);},Window_Base['SIDEVIEW_BATTLE_UI_SCALE']=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)]['GeneralWindow'][_0x294cd2(0x22e)]??0.8,Window_Base['SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_X']=0x0,Window_Base['SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_Y']=0x0,Window_Base['prototype'][_0x294cd2(0x254)]=function(){const _0x440056=_0x294cd2;if(!this['isUsingSideviewUiLayout']())return;const _0x2d9221=Window_Base[_0x440056(0x20d)];this[_0x440056(0x1c9)]['x']=this[_0x440056(0x1c9)]['y']=_0x2d9221;},Window_Base[_0x294cd2(0x226)]['isUsingSideviewUiLayout']=function(){return BattleManager['isUsingSideviewUiLayout']();},Window_Base[_0x294cd2(0x226)][_0x294cd2(0x2d3)]=function(){const _0x24a4aa=_0x294cd2;if(!this[_0x24a4aa(0x2e6)]())return;const _0x58e550=this[_0x24a4aa(0x1c9)]['x'],_0x3a70c2=-(Math[_0x24a4aa(0x279)](Graphics['width']-Graphics['boxWidth'])/0x2),_0x2f9651=_0x3a70c2+Graphics[_0x24a4aa(0x25c)]-Math[_0x24a4aa(0x1d3)](this[_0x24a4aa(0x25c)]*_0x58e550),_0x1f69d2=-(Math[_0x24a4aa(0x279)](Graphics[_0x24a4aa(0x2a3)]-Graphics[_0x24a4aa(0x2b9)])/0x2),_0x4ec173=_0x1f69d2+Graphics[_0x24a4aa(0x2a3)]-Math[_0x24a4aa(0x1d3)](this[_0x24a4aa(0x2a3)]*_0x58e550);this['x']=this['x'][_0x24a4aa(0x241)](_0x3a70c2,_0x2f9651),this['y']=this['y']['clamp'](_0x1f69d2,_0x4ec173);},Window_Base['prototype']['sideviewUiTargetActor']=function(){const _0xbbe79e=_0x294cd2;return BattleManager[_0xbbe79e(0x203)]||$gameParty['aliveMembers']()[0x0];},Window_Base[_0x294cd2(0x226)]['updateSideviewUiPosition']=function(){const _0x4dcc5f=_0x294cd2;if(!this['isUsingSideviewUiLayout']())return;const _0x3c033f=this[_0x4dcc5f(0x2a4)]();if(!_0x3c033f)return;const _0x2424d0=_0x3c033f[_0x4dcc5f(0x2b8)]();this['x']=_0x2424d0['x']+Math['round'](_0x2424d0[_0x4dcc5f(0x25c)]/0x2),this['x']-=Math[_0x4dcc5f(0x1ea)]((Graphics[_0x4dcc5f(0x25c)]-Graphics[_0x4dcc5f(0x247)])/0x2),this['x']+=SceneManager[_0x4dcc5f(0x2a1)][_0x4dcc5f(0x1e6)][_0x4dcc5f(0x2bc)]['x'],this['x']+=this[_0x4dcc5f(0x276)](),this['y']=_0x2424d0['y']-_0x2424d0[_0x4dcc5f(0x2a3)],this['y']-=Math[_0x4dcc5f(0x1ea)]((Graphics['height']-Graphics['boxHeight'])/0x2),this['y']+=SceneManager[_0x4dcc5f(0x2a1)][_0x4dcc5f(0x1e6)][_0x4dcc5f(0x2bc)]['y'],this['y']+=this['sideviewUiPositionOffsetY'](),this[_0x4dcc5f(0x2d3)](),this[_0x4dcc5f(0x1e9)]();},Window_Base[_0x294cd2(0x226)][_0x294cd2(0x276)]=function(){const _0x21e2a4=_0x294cd2;return Window_Base[_0x21e2a4(0x1f6)];},Window_Base['prototype'][_0x294cd2(0x225)]=function(){const _0xb8e5dd=_0x294cd2;return Window_Base[_0xb8e5dd(0x23c)];},Window_Base[_0x294cd2(0x226)]['adjustSideviewUiWidth']=function(){const _0x41e5c0=_0x294cd2;if(!this[_0x41e5c0(0x2e6)]())return;const _0x14d9c4=this[_0x41e5c0(0x25c)];this['width']=this[_0x41e5c0(0x21f)](),_0x14d9c4!==this[_0x41e5c0(0x25c)]&&this[_0x41e5c0(0x298)]();},Window_Base[_0x294cd2(0x226)][_0x294cd2(0x21f)]=function(){const _0x21f13e=_0x294cd2;return VisuMZ['BattleCore']['Settings'][_0x21f13e(0x260)]['CommandWidth']||0xc0;},Window_Base['prototype'][_0x294cd2(0x221)]=function(){const _0xaf6b7c=_0x294cd2;if(!this['isUsingSideviewUiLayout']())return;const _0x372b1d=this[_0xaf6b7c(0x2a3)],_0x4a2fa3=this[_0xaf6b7c(0x214)](),_0x28f4bc=this[_0xaf6b7c(0x2a8)](_0x4a2fa3),_0x362ec7=this[_0xaf6b7c(0x2a8)](this[_0xaf6b7c(0x2f2)]());this['height']=Math[_0xaf6b7c(0x235)](_0x28f4bc,_0x362ec7),_0x372b1d!==this[_0xaf6b7c(0x2a3)]&&this[_0xaf6b7c(0x298)]();},Window_Base[_0x294cd2(0x226)][_0x294cd2(0x214)]=function(){const _0x342496=_0x294cd2;if(this[_0x342496(0x295)])return this['_data']['length'];if(this[_0x342496(0x1db)])return this[_0x342496(0x1db)]['length'];return 0x4;},Window_Base['prototype'][_0x294cd2(0x2f2)]=function(){return 0x8;},Window_Base['prototype'][_0x294cd2(0x1e9)]=function(){const _0x2a063b=_0x294cd2;if(this[_0x2a063b(0x2dc)]&&!this[_0x2a063b(0x24b)])return;this['visible']=!![];},Window_Base['prototype'][_0x294cd2(0x2db)]=function(){const _0x290199=_0x294cd2;this[_0x290199(0x246)]=![];},Window_Help[_0x294cd2(0x1f1)]=VisuMZ[_0x294cd2(0x209)]['Settings'][_0x294cd2(0x1fb)]['HelpFadeStyle']??!![],VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x296)]=Window_Help['prototype'][_0x294cd2(0x2ed)],Window_Help['prototype']['initialize']=function(_0x350972){const _0x2d4b37=_0x294cd2;VisuMZ['SideviewBattleUI'][_0x2d4b37(0x296)]['call'](this,_0x350972),this[_0x2d4b37(0x1d8)]();},Window_Help[_0x294cd2(0x226)][_0x294cd2(0x1d8)]=function(){const _0x2284a9=_0x294cd2;if(!this[_0x2284a9(0x2e6)]())return;if(!Window_Help[_0x2284a9(0x1f1)])return;this[_0x2284a9(0x2a6)]=0x0;!this['_dimmerSprite']&&(this[_0x2284a9(0x1cc)]=new Sprite(),this[_0x2284a9(0x2ef)](this['_dimmerSprite']));const _0x3eb32c=this['width']-Window_SideviewUiBattleStatus[_0x2284a9(0x2af)],_0x594bfc=this['lineHeight']()*0x2;this[_0x2284a9(0x1cc)]['bitmap']=new Bitmap(_0x3eb32c,_0x594bfc),this['_dimmerSprite']['x']=-0x4,this[_0x2284a9(0x1cc)]['y']=this[_0x2284a9(0x2c8)];const _0x24b928=this[_0x2284a9(0x1cc)][_0x2284a9(0x1f8)],_0x273355=ColorManager[_0x2284a9(0x292)](),_0x404db5=ColorManager['dimColor2']();_0x24b928[_0x2284a9(0x250)](0x0,0x0,Math['round'](_0x3eb32c/0x2),_0x594bfc,_0x273355),_0x24b928['gradientFillRect'](Math[_0x2284a9(0x1ea)](_0x3eb32c/0x2),0x0,Math['round'](_0x3eb32c/0x2),_0x594bfc,_0x273355,_0x404db5);},Window_ItemList[_0x294cd2(0x2cf)]=VisuMZ['SideviewBattleUI']['Settings']['GeneralWindow'][_0x294cd2(0x1fd)]??0x8,Window_ItemList[_0x294cd2(0x2cd)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x1fb)]['ItemWindowWidth']??0x190,Window_ItemList[_0x294cd2(0x1f6)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x1fb)][_0x294cd2(0x234)]??0x10,Window_ItemList[_0x294cd2(0x23c)]=VisuMZ['SideviewBattleUI']['Settings'][_0x294cd2(0x1fb)][_0x294cd2(0x1cd)]??0x10,VisuMZ['SideviewBattleUI'][_0x294cd2(0x1d4)]=Window_ItemList[_0x294cd2(0x226)][_0x294cd2(0x2ed)],Window_ItemList[_0x294cd2(0x226)][_0x294cd2(0x2ed)]=function(_0x5f44bb){const _0x24c129=_0x294cd2;VisuMZ[_0x24c129(0x209)][_0x24c129(0x1d4)][_0x24c129(0x1e8)](this,_0x5f44bb),this[_0x24c129(0x254)]();},VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x22a)]=Window_ItemList[_0x294cd2(0x226)][_0x294cd2(0x1ce)],Window_ItemList[_0x294cd2(0x226)]['maxCols']=function(){const _0xcb85a8=_0x294cd2;return this['isUsingSideviewUiLayout']()?0x1:VisuMZ['SideviewBattleUI'][_0xcb85a8(0x22a)]['call'](this);},VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2ca)]=Window_ItemList['prototype']['colSpacing'],Window_ItemList[_0x294cd2(0x226)][_0x294cd2(0x1f9)]=function(){const _0x18f58e=_0x294cd2;return this[_0x18f58e(0x2e6)]()?0x0:VisuMZ['SideviewBattleUI'][_0x18f58e(0x2ca)][_0x18f58e(0x1e8)](this);},VisuMZ['SideviewBattleUI'][_0x294cd2(0x1da)]=Window_ItemList[_0x294cd2(0x226)][_0x294cd2(0x297)],Window_ItemList['prototype'][_0x294cd2(0x297)]=function(){const _0x3b8860=_0x294cd2;VisuMZ[_0x3b8860(0x209)][_0x3b8860(0x1da)][_0x3b8860(0x1e8)](this),this[_0x3b8860(0x2ae)](),this[_0x3b8860(0x221)](),this[_0x3b8860(0x232)]();},Window_ItemList[_0x294cd2(0x226)][_0x294cd2(0x2a4)]=function(){const _0x28bdce=_0x294cd2;return this[_0x28bdce(0x289)]||Window_Base[_0x28bdce(0x226)]['sideviewUiTargetActor']['call'](this);},Window_ItemList['prototype'][_0x294cd2(0x21f)]=function(){return Window_ItemList['SIDEVIEW_BATTLE_UI_WINDOW_WIDTH']||0xc0;},Window_ItemList[_0x294cd2(0x226)]['sideviewUiPositionOffsetX']=function(){const _0x258208=_0x294cd2;let _0x3ab6d3=Window_Selectable[_0x258208(0x226)][_0x258208(0x276)][_0x258208(0x1e8)](this);return _0x3ab6d3+Window_ItemList[_0x258208(0x1f6)];},Window_ItemList[_0x294cd2(0x226)][_0x294cd2(0x225)]=function(){const _0x17a804=_0x294cd2;let _0x47a42f=Window_Selectable['prototype']['sideviewUiPositionOffsetY'][_0x17a804(0x1e8)](this);return _0x47a42f+Window_ItemList[_0x17a804(0x23c)];},Window_SkillList[_0x294cd2(0x2cf)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)]['GeneralWindow']['SkillWindowMaxRows']??0x8,Window_SkillList[_0x294cd2(0x2cd)]=VisuMZ['SideviewBattleUI'][_0x294cd2(0x2b1)][_0x294cd2(0x1fb)][_0x294cd2(0x29b)]??0x190,Window_SkillList[_0x294cd2(0x1f6)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x1fb)][_0x294cd2(0x21d)]??0x10,Window_SkillList[_0x294cd2(0x23c)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x1fb)][_0x294cd2(0x29a)]??0x10,VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x216)]=Window_SkillList[_0x294cd2(0x226)][_0x294cd2(0x2ed)],Window_SkillList[_0x294cd2(0x226)][_0x294cd2(0x2ed)]=function(_0x4cc8ba){const _0x4fb66f=_0x294cd2;VisuMZ[_0x4fb66f(0x209)][_0x4fb66f(0x216)]['call'](this,_0x4cc8ba),this[_0x4fb66f(0x254)]();},VisuMZ[_0x294cd2(0x209)]['Window_SkillList_maxCols']=Window_SkillList[_0x294cd2(0x226)][_0x294cd2(0x1ce)],Window_SkillList['prototype'][_0x294cd2(0x1ce)]=function(){const _0x488d61=_0x294cd2;return this[_0x488d61(0x2e6)]()?0x1:VisuMZ[_0x488d61(0x209)][_0x488d61(0x2c7)][_0x488d61(0x1e8)](this);},VisuMZ[_0x294cd2(0x209)]['Window_SkillList_colSpacing']=Window_SkillList['prototype'][_0x294cd2(0x1f9)],Window_SkillList['prototype'][_0x294cd2(0x1f9)]=function(){const _0x2682dc=_0x294cd2;return this[_0x2682dc(0x2e6)]()?0x0:VisuMZ[_0x2682dc(0x209)][_0x2682dc(0x20a)][_0x2682dc(0x1e8)](this);},VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2a5)]=Window_SkillList[_0x294cd2(0x226)]['makeItemList'],Window_SkillList[_0x294cd2(0x226)]['makeItemList']=function(){const _0x430259=_0x294cd2;VisuMZ[_0x430259(0x209)]['Window_SkillList_makeItemList'][_0x430259(0x1e8)](this),this[_0x430259(0x2ae)](),this[_0x430259(0x221)](),this[_0x430259(0x232)]();},Window_SkillList[_0x294cd2(0x226)][_0x294cd2(0x2a4)]=function(){const _0x14318e=_0x294cd2;return this[_0x14318e(0x289)]||Window_Base[_0x14318e(0x226)]['sideviewUiTargetActor'][_0x14318e(0x1e8)](this);},Window_SkillList[_0x294cd2(0x226)]['sideviewUiWidth']=function(){const _0x272910=_0x294cd2;return Window_SkillList[_0x272910(0x2cd)]||0xc0;},Window_SkillList[_0x294cd2(0x226)][_0x294cd2(0x276)]=function(){const _0x133416=_0x294cd2;let _0x12ae4a=Window_Selectable[_0x133416(0x226)]['sideviewUiPositionOffsetX'][_0x133416(0x1e8)](this);return _0x12ae4a+Window_SkillList[_0x133416(0x1f6)];},Window_SkillList[_0x294cd2(0x226)][_0x294cd2(0x225)]=function(){const _0x13e6b7=_0x294cd2;let _0x6f81b3=Window_Selectable[_0x13e6b7(0x226)][_0x13e6b7(0x225)]['call'](this);return _0x6f81b3+Window_SkillList['SIDEVIEW_BATTLE_UI_BATTLER_WINDOW_OFFSET_Y'];},Window_BattleSkill[_0x294cd2(0x226)][_0x294cd2(0x2f2)]=function(){const _0x466570=_0x294cd2;return Window_SkillList[_0x466570(0x2cf)];},Window_BattleItem[_0x294cd2(0x226)][_0x294cd2(0x2f2)]=function(){const _0x430a00=_0x294cd2;return Window_ItemList[_0x430a00(0x2cf)];},Window_PartyCommand[_0x294cd2(0x2cf)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x1fb)][_0x294cd2(0x23e)]??0x8,VisuMZ['SideviewBattleUI'][_0x294cd2(0x263)]=Window_PartyCommand[_0x294cd2(0x226)][_0x294cd2(0x2ed)],Window_PartyCommand[_0x294cd2(0x226)][_0x294cd2(0x2ed)]=function(_0x594b39){const _0x10853a=_0x294cd2;VisuMZ[_0x10853a(0x209)][_0x10853a(0x263)]['call'](this,_0x594b39),this[_0x10853a(0x254)]();},VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x299)]=Window_PartyCommand[_0x294cd2(0x226)]['makeCommandList'],Window_PartyCommand[_0x294cd2(0x226)]['makeCommandList']=function(){const _0x1e7313=_0x294cd2;VisuMZ[_0x1e7313(0x209)][_0x1e7313(0x299)][_0x1e7313(0x1e8)](this),this['adjustSideviewUiWidth'](),this[_0x1e7313(0x221)]();},Window_PartyCommand[_0x294cd2(0x226)][_0x294cd2(0x2a4)]=function(){const _0x16a807=_0x294cd2;return $gameParty[_0x16a807(0x224)]()[0x0];},Window_PartyCommand['prototype'][_0x294cd2(0x2f2)]=function(){return Window_PartyCommand['SIDEVIEW_BATTLE_UI_WINDOW_MAX_ROWS'];},Window_ActorCommand[_0x294cd2(0x2cf)]=VisuMZ['SideviewBattleUI'][_0x294cd2(0x2b1)][_0x294cd2(0x1fb)][_0x294cd2(0x285)]??0x8,VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x25e)]=Window_ActorCommand['prototype'][_0x294cd2(0x2ed)],Window_ActorCommand['prototype'][_0x294cd2(0x2ed)]=function(_0x1aa450){const _0x141d29=_0x294cd2;VisuMZ[_0x141d29(0x209)][_0x141d29(0x25e)][_0x141d29(0x1e8)](this,_0x1aa450),this[_0x141d29(0x254)]();},VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x262)]=Window_ActorCommand[_0x294cd2(0x226)]['makeCommandList'],Window_ActorCommand['prototype']['makeCommandList']=function(){const _0x1df774=_0x294cd2;VisuMZ[_0x1df774(0x209)][_0x1df774(0x262)]['call'](this),this[_0x1df774(0x2ae)](),this[_0x1df774(0x221)](),this[_0x1df774(0x232)]();},Window_ActorCommand['prototype'][_0x294cd2(0x2a4)]=function(){const _0x191ba3=_0x294cd2;return this['_actor']||Window_Base['prototype'][_0x191ba3(0x2a4)][_0x191ba3(0x1e8)](this);},Window_ActorCommand[_0x294cd2(0x226)][_0x294cd2(0x2f2)]=function(){return Window_ActorCommand['SIDEVIEW_BATTLE_UI_WINDOW_MAX_ROWS'];},VisuMZ['SideviewBattleUI'][_0x294cd2(0x2a7)]=Window_BattleStatus['prototype'][_0x294cd2(0x261)],Window_BattleStatus[_0x294cd2(0x226)][_0x294cd2(0x261)]=function(){const _0x98e62f=_0x294cd2;this['isUsingSideviewUiLayout']()?this[_0x98e62f(0x230)]():VisuMZ[_0x98e62f(0x209)][_0x98e62f(0x2a7)]['call'](this);},Window_BattleStatus[_0x294cd2(0x226)][_0x294cd2(0x230)]=function(){const _0x559a32=_0x294cd2;if($gameTemp[_0x559a32(0x253)]())this[_0x559a32(0x291)]=![],$gameTemp[_0x559a32(0x25d)](),SceneManager[_0x559a32(0x2a1)][_0x559a32(0x286)]();else this[_0x559a32(0x291)]&&(this[_0x559a32(0x291)]=![],SceneManager[_0x559a32(0x2a1)][_0x559a32(0x286)]());};function Window_SideviewUiBattleStatus(){this['initialize'](...arguments);}Window_SideviewUiBattleStatus['prototype']=Object[_0x294cd2(0x239)](Window_StatusBase[_0x294cd2(0x226)]),Window_SideviewUiBattleStatus[_0x294cd2(0x226)][_0x294cd2(0x1ed)]=Window_SideviewUiBattleStatus,Window_SideviewUiBattleStatus[_0x294cd2(0x2af)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)]['StatusWindow']['WidthBase']??0xc8,Window_SideviewUiBattleStatus['HEIGHT_BASE']=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x2e3)]??_0x294cd2(0x2bb),Window_SideviewUiBattleStatus[_0x294cd2(0x2d9)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)]['StatusWindow'][_0x294cd2(0x1f4)]??0x4,Window_SideviewUiBattleStatus['WIDTH_MOVE']=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x282)]??0x30,Window_SideviewUiBattleStatus[_0x294cd2(0x2b5)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)]['MoveSpeed']??0x4,Window_SideviewUiBattleStatus[_0x294cd2(0x2b6)]=VisuMZ[_0x294cd2(0x209)]['Settings']['StatusWindow'][_0x294cd2(0x1d9)]??!![],Window_SideviewUiBattleStatus[_0x294cd2(0x2b3)]=VisuMZ['SideviewBattleUI'][_0x294cd2(0x2b1)]['StatusWindow']['NameShow']??!![],Window_SideviewUiBattleStatus['NAME_OFFSET_X']=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x25b)]??0x30,Window_SideviewUiBattleStatus[_0x294cd2(0x202)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x252)]??0x0,Window_SideviewUiBattleStatus['STATES_SHOWN']=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x238)]??!![],Window_SideviewUiBattleStatus[_0x294cd2(0x2c0)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x2df)]??!![],Window_SideviewUiBattleStatus['STATES_OFFSET_X']=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)]['StatusWindow']['StatesOffsetX']??0x14,Window_SideviewUiBattleStatus[_0x294cd2(0x28c)]=VisuMZ['SideviewBattleUI']['Settings'][_0x294cd2(0x2c9)][_0x294cd2(0x1e0)]??0x14,Window_SideviewUiBattleStatus['TPB_SHOWN']=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x220)]??!![],Window_SideviewUiBattleStatus[_0x294cd2(0x265)]=VisuMZ['SideviewBattleUI'][_0x294cd2(0x2b1)]['StatusWindow'][_0x294cd2(0x205)]??0x2c,Window_SideviewUiBattleStatus[_0x294cd2(0x29d)]=VisuMZ['SideviewBattleUI']['Settings'][_0x294cd2(0x2c9)][_0x294cd2(0x2d8)]??0x0,Window_SideviewUiBattleStatus[_0x294cd2(0x2b7)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)]['HpShow']??!![],Window_SideviewUiBattleStatus[_0x294cd2(0x26d)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x237)]??0x3c,Window_SideviewUiBattleStatus[_0x294cd2(0x287)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)]['StatusWindow']['HpOffsetY']??0x0,Window_SideviewUiBattleStatus[_0x294cd2(0x1d1)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)]['StatusWindow']['MpShow']??!![],Window_SideviewUiBattleStatus['MP_GAUGE_OFFSET_X']=VisuMZ[_0x294cd2(0x209)]['Settings'][_0x294cd2(0x2c9)]['MpOffsetX']??0x44,Window_SideviewUiBattleStatus['MP_GAUGE_OFFSET_Y']=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x26e)]??0x0,Window_SideviewUiBattleStatus[_0x294cd2(0x242)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x272)]??!![],Window_SideviewUiBattleStatus['TP_GAUGE_OFFSET_X']=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)]['TpOffsetX']??0x4a,Window_SideviewUiBattleStatus[_0x294cd2(0x24a)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x228)]??0x0,Window_SideviewUiBattleStatus['AGGRO_SHOWN']=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)]['StatusWindow'][_0x294cd2(0x2ad)]??!![],Window_SideviewUiBattleStatus[_0x294cd2(0x231)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x281)]??0x2c,Window_SideviewUiBattleStatus[_0x294cd2(0x2b4)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x27d)]??0x0,Window_SideviewUiBattleStatus['BOOST_SHOWN']=VisuMZ['SideviewBattleUI'][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x222)]??!![],Window_SideviewUiBattleStatus['BOOST_OFFSET_X']=VisuMZ['SideviewBattleUI'][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x273)]??0x34,Window_SideviewUiBattleStatus['BOOST_OFFSET_Y']=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x211)]??0x2,Window_SideviewUiBattleStatus[_0x294cd2(0x28e)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x1f0)]??!![],Window_SideviewUiBattleStatus[_0x294cd2(0x27a)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x2d7)]??0x34,Window_SideviewUiBattleStatus['BRAVE_OFFSET_Y']=VisuMZ['SideviewBattleUI'][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x22f)]??-0x6,Window_SideviewUiBattleStatus[_0x294cd2(0x1df)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x200)]??!![],Window_SideviewUiBattleStatus['BREAK_SHIELD_REVERSE_SCALE']=VisuMZ[_0x294cd2(0x209)]['Settings']['StatusWindow'][_0x294cd2(0x2ec)]??!![],Window_SideviewUiBattleStatus['BREAK_SHIELD_OFFSET_X']=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x2e0)]??0x14,Window_SideviewUiBattleStatus[_0x294cd2(0x29e)]=VisuMZ[_0x294cd2(0x209)][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x278)]??0x14,Window_SideviewUiBattleStatus['STATE_TOOLTIPS_SHOWN']=VisuMZ['SideviewBattleUI'][_0x294cd2(0x2b1)][_0x294cd2(0x2c9)][_0x294cd2(0x2d4)]??!![],Window_SideviewUiBattleStatus[_0x294cd2(0x226)][_0x294cd2(0x2ed)]=function(_0x93f964){const _0x10aab9=_0x294cd2;this[_0x10aab9(0x23b)]=_0x93f964;const _0x27da12=this[_0x10aab9(0x240)]();Window_StatusBase[_0x10aab9(0x226)]['initialize']['call'](this,_0x27da12),this[_0x10aab9(0x254)](),this[_0x10aab9(0x294)](0x2);},Window_SideviewUiBattleStatus['prototype'][_0x294cd2(0x240)]=function(){const _0x58d536=_0x294cd2,_0x54c182=Window_Base[_0x58d536(0x20d)];let _0x55603a=Window_SideviewUiBattleStatus['WIDTH_BASE'],_0x2cde48=Graphics[_0x58d536(0x247)]-_0x55603a;_0x2cde48+=Math[_0x58d536(0x1d3)]((Graphics['width']-Graphics[_0x58d536(0x247)])/0x2),_0x55603a/=_0x54c182,_0x55603a=Math['ceil'](_0x55603a),_0x55603a+=Math[_0x58d536(0x1d3)](Window_SideviewUiBattleStatus[_0x58d536(0x2d6)]*0x4/_0x54c182);let _0x1b9809=Window_SideviewUiBattleStatus['HEIGHT_BASE'];_0x1b9809===_0x58d536(0x2bb)?(_0x1b9809=Window_SideviewUiBattleStatus[_0x58d536(0x2d9)]*0x2,_0x1b9809+=this['gaugeLineHeight']()*this[_0x58d536(0x2f1)](),_0x1b9809=Math[_0x58d536(0x1d3)](_0x1b9809*_0x54c182),_0x1b9809/=_0x54c182):_0x1b9809=eval(_0x1b9809)||0x0;let _0x3635fc=Math[_0x58d536(0x1d3)](_0x1b9809*_0x54c182)*this[_0x58d536(0x23b)];return _0x3635fc-=Math['ceil']((Graphics[_0x58d536(0x2a3)]-Graphics['boxHeight'])/0x2),this[_0x58d536(0x2ce)]=_0x2cde48,this[_0x58d536(0x213)]=this[_0x58d536(0x2ce)]-Math['ceil'](Window_SideviewUiBattleStatus[_0x58d536(0x2d6)]/_0x54c182),this[_0x58d536(0x268)]=this[_0x58d536(0x2ce)],new Rectangle(_0x2cde48,_0x3635fc,_0x55603a,_0x1b9809);},Window_SideviewUiBattleStatus[_0x294cd2(0x226)]['autoRowCount']=function(){const _0x356815=_0x294cd2;let _0x3f5152=0x0;if(Window_SideviewUiBattleStatus[_0x356815(0x2b3)])_0x3f5152+=0x1;if(Window_SideviewUiBattleStatus[_0x356815(0x2b7)])_0x3f5152+=0x1;if(Window_SideviewUiBattleStatus['MP_GAUGE_SHOWN'])_0x3f5152+=0x1;if(Window_SideviewUiBattleStatus[_0x356815(0x242)])_0x3f5152+=0x1;if(this[_0x356815(0x21e)]())_0x3f5152+=0x1;if(this[_0x356815(0x204)]())_0x3f5152+=0x1;return _0x3f5152||0x1;},Window_SideviewUiBattleStatus[_0x294cd2(0x226)]['updatePadding']=function(){const _0x4e0766=_0x294cd2;this[_0x4e0766(0x2c8)]=0x0;},Window_SideviewUiBattleStatus[_0x294cd2(0x226)]['refreshDimmerBitmap']=function(){const _0x150aea=_0x294cd2;if(!this[_0x150aea(0x1cc)])return;if(!Window_SideviewUiBattleStatus['BG_SHOW'])return;const _0x5af479=this[_0x150aea(0x1cc)][_0x150aea(0x1f8)];var _0x1f2cda=ColorManager[_0x150aea(0x292)](),_0x1dc968=ColorManager['dimColor2'](),_0x32abdf=Math['ceil'](this['width']/0x4),_0xeb0a19=this['width']-_0x32abdf,_0x26aa51=this['height'];_0x5af479['resize'](this[_0x150aea(0x25c)],_0x26aa51),_0x5af479['gradientFillRect'](0x0,0x0,_0x32abdf,_0x26aa51,_0x1dc968,_0x1f2cda),_0x5af479[_0x150aea(0x250)](_0x32abdf,0x0,_0xeb0a19,_0x26aa51,_0x1f2cda),this[_0x150aea(0x1cc)]['setFrame'](0x0,0x0,_0xeb0a19,_0x26aa51);},Window_SideviewUiBattleStatus[_0x294cd2(0x226)]['update']=function(){const _0x39dbbe=_0x294cd2;Window_StatusBase[_0x39dbbe(0x226)][_0x39dbbe(0x2d0)][_0x39dbbe(0x1e8)](this),this['updateBattler'](),this[_0x39dbbe(0x1ee)]();},Window_SideviewUiBattleStatus[_0x294cd2(0x226)][_0x294cd2(0x2b8)]=function(){const _0x5715ba=_0x294cd2;return $gameParty[_0x5715ba(0x223)]()[this['_partyIndex']];},Window_SideviewUiBattleStatus[_0x294cd2(0x226)][_0x294cd2(0x21a)]=function(){const _0x3789cc=_0x294cd2;if(this[_0x3789cc(0x275)]===this['battler']())return;this[_0x3789cc(0x275)]=this[_0x3789cc(0x2b8)](),this[_0x3789cc(0x2bf)](),this[_0x3789cc(0x275)]?this[_0x3789cc(0x294)](0x1):this[_0x3789cc(0x294)](0x2);},Window_SideviewUiBattleStatus[_0x294cd2(0x226)][_0x294cd2(0x1ee)]=function(){const _0x59744f=_0x294cd2;if(!this[_0x59744f(0x275)])return;this[_0x59744f(0x268)]=this[_0x59744f(0x2f3)]()?this['_activeX']:this[_0x59744f(0x2ce)];const _0x44db8a=Window_SideviewUiBattleStatus[_0x59744f(0x2b5)];if(this[_0x59744f(0x268)]>this['x'])this['x']=Math[_0x59744f(0x235)](this['x']+_0x44db8a,this[_0x59744f(0x268)]);else this[_0x59744f(0x268)]<this['x']&&(this['x']=Math['max'](this['x']-_0x44db8a,this['_targetX']));},Window_SideviewUiBattleStatus[_0x294cd2(0x226)][_0x294cd2(0x2f3)]=function(){const _0x3c3ed7=_0x294cd2;if(this[_0x3c3ed7(0x275)]===BattleManager['actor']())return!![];if(this[_0x3c3ed7(0x275)]===BattleManager[_0x3c3ed7(0x28d)])return!![];if(this['_battler'][_0x3c3ed7(0x245)]())return!![];return![];},Window_SideviewUiBattleStatus[_0x294cd2(0x226)][_0x294cd2(0x1ff)]=function(){const _0xe9350c=_0x294cd2;return Window_SideviewUiBattleStatus[_0xe9350c(0x27c)];},Window_SideviewUiBattleStatus[_0x294cd2(0x226)][_0x294cd2(0x1fa)]=function(){return this['_battler'];},Window_SideviewUiBattleStatus['prototype'][_0x294cd2(0x28a)]=function(){const _0x596173=_0x294cd2,_0x15167c=new Point(TouchInput['x'],TouchInput['y']),_0x1ce3ba=this['worldTransform'][_0x596173(0x2e5)](_0x15167c);return this[_0x596173(0x1e5)][_0x596173(0x28b)](_0x1ce3ba['x'],_0x1ce3ba['y']);},Window_SideviewUiBattleStatus[_0x294cd2(0x226)][_0x294cd2(0x271)]=function(){const _0x50603e=_0x294cd2;this[_0x50603e(0x1eb)]();if(!this[_0x50603e(0x275)])return;this[_0x50603e(0x26b)](),this[_0x50603e(0x2c1)]();},Window_SideviewUiBattleStatus['prototype'][_0x294cd2(0x26b)]=function(){const _0x1a3baf=_0x294cd2,_0x1e8cb7=this[_0x1a3baf(0x275)];let _0x109f22=0x4,_0x142b0e=Window_SideviewUiBattleStatus[_0x1a3baf(0x2d9)];if(Imported[_0x1a3baf(0x1ca)]&&Window_SideviewUiBattleStatus[_0x1a3baf(0x1df)]){let _0x2ce6a3=_0x109f22+Window_SideviewUiBattleStatus['BREAK_SHIELD_OFFSET_X'],_0x1a6310=_0x142b0e+Window_SideviewUiBattleStatus['BREAK_SHIELD_OFFSET_Y'];this['placeBreakShieldIcon'](_0x1e8cb7,_0x2ce6a3,_0x1a6310);if(Window_SideviewUiBattleStatus[_0x1a3baf(0x2c0)]){const _0x353652=_0x1a3baf(0x2d1)[_0x1a3baf(0x24d)](_0x1e8cb7[_0x1a3baf(0x1dc)]()),_0x1debd7=this[_0x1a3baf(0x201)];if(_0x1debd7[_0x353652]){const _0x50665f=_0x1debd7[_0x353652];_0x50665f['scale']['x']=_0x50665f[_0x1a3baf(0x1c9)]['y']=0x1/this[_0x1a3baf(0x1c9)]['y'];};}}if(Window_SideviewUiBattleStatus[_0x1a3baf(0x2bd)]){let _0x10a73c=_0x109f22+Window_SideviewUiBattleStatus['STATES_OFFSET_X'],_0x191f70=_0x142b0e+Window_SideviewUiBattleStatus[_0x1a3baf(0x28c)];Imported[_0x1a3baf(0x1ca)]&&Window_SideviewUiBattleStatus[_0x1a3baf(0x1df)]&&(Window_SideviewUiBattleStatus[_0x1a3baf(0x270)]?_0x191f70+=Math[_0x1a3baf(0x1d3)](ImageManager['iconHeight']/this['scale']['y']):_0x191f70+=ImageManager[_0x1a3baf(0x2e9)],_0x191f70+=0x4);this[_0x1a3baf(0x256)](_0x1e8cb7,_0x10a73c,_0x191f70);if(Window_SideviewUiBattleStatus[_0x1a3baf(0x2c0)]){const _0x16e508=_0x1a3baf(0x284)[_0x1a3baf(0x24d)](_0x1e8cb7[_0x1a3baf(0x1dc)]()),_0xd01df9=this['_additionalSprites'];if(_0xd01df9[_0x16e508]){const _0x115b69=_0xd01df9[_0x16e508];_0x115b69['scale']['x']=_0x115b69[_0x1a3baf(0x1c9)]['y']=0x1/this[_0x1a3baf(0x1c9)]['y'];};}}if(this[_0x1a3baf(0x2c2)]()){let _0x2be537=_0x109f22+Window_SideviewUiBattleStatus['TPB_OFFSET_X'],_0x2f1930=_0x142b0e+Window_SideviewUiBattleStatus[_0x1a3baf(0x29d)];this[_0x1a3baf(0x20b)](_0x1e8cb7,_0x2be537,_0x2f1930);}if(this[_0x1a3baf(0x20c)]()){let _0x103303=_0x109f22+Window_SideviewUiBattleStatus[_0x1a3baf(0x231)],_0x510e71=_0x142b0e+Window_SideviewUiBattleStatus[_0x1a3baf(0x2b4)];this[_0x1a3baf(0x2c2)]()&&(_0x510e71-=Sprite_Gauge['prototype']['gaugeHeight']()-0x1),this[_0x1a3baf(0x2eb)](_0x1e8cb7,_0x103303,_0x510e71);}if(Window_SideviewUiBattleStatus['NAME_SHOWN']){let _0x544080=_0x109f22+Window_SideviewUiBattleStatus['NAME_OFFSET_X'],_0x43e5de=_0x142b0e+Window_SideviewUiBattleStatus[_0x1a3baf(0x202)];this[_0x1a3baf(0x25a)](_0x1e8cb7,_0x544080,_0x43e5de);}(Window_SideviewUiBattleStatus['NAME_SHOWN']||this[_0x1a3baf(0x2c2)]()||this['isShowAggro']())&&(_0x142b0e+=this[_0x1a3baf(0x1d2)]());if(this[_0x1a3baf(0x21e)]()){const _0x10aaf4=Math[_0x1a3baf(0x1d3)](ImageManager[_0x1a3baf(0x2e9)]*Sprite_BoostContainer[_0x1a3baf(0x249)]);let _0x381c19=_0x109f22+Window_SideviewUiBattleStatus[_0x1a3baf(0x1f3)],_0x2345f4=_0x142b0e+Window_SideviewUiBattleStatus[_0x1a3baf(0x22c)];_0x2345f4+=Math[_0x1a3baf(0x2ac)](0x0,Math[_0x1a3baf(0x1ea)]((this[_0x1a3baf(0x1d2)]()-_0x10aaf4)/0x2)),this[_0x1a3baf(0x293)](_0x1e8cb7,_0x381c19,_0x2345f4),_0x142b0e+=this['gaugeLineHeight']();}if(this[_0x1a3baf(0x204)]()){let _0x4524ab=_0x109f22+Window_SideviewUiBattleStatus[_0x1a3baf(0x27a)],_0x147310=_0x142b0e+Window_SideviewUiBattleStatus[_0x1a3baf(0x2be)],_0x3f4956=Math[_0x1a3baf(0x1d3)](Window_SideviewUiBattleStatus[_0x1a3baf(0x2af)]/this[_0x1a3baf(0x1c9)]['x']);this[_0x1a3baf(0x1d6)](_0x1e8cb7,_0x4524ab,_0x147310,_0x3f4956,'left'),_0x142b0e+=this['gaugeLineHeight']();}if(Window_SideviewUiBattleStatus[_0x1a3baf(0x2b7)]){let _0x2a5c38=_0x109f22+Window_SideviewUiBattleStatus[_0x1a3baf(0x26d)],_0x17d3af=_0x142b0e+Window_SideviewUiBattleStatus['HP_GAUGE_OFFSET_Y'];this['placeGauge'](_0x1e8cb7,'hp',_0x2a5c38,_0x17d3af),_0x142b0e+=this[_0x1a3baf(0x1d2)]();}if(Window_SideviewUiBattleStatus['MP_GAUGE_SHOWN']){let _0x2d21ed=_0x109f22+Window_SideviewUiBattleStatus[_0x1a3baf(0x1fe)],_0x2f9bc1=_0x142b0e+Window_SideviewUiBattleStatus[_0x1a3baf(0x229)];this[_0x1a3baf(0x1e2)](_0x1e8cb7,'mp',_0x2d21ed,_0x2f9bc1),_0x142b0e+=this[_0x1a3baf(0x1d2)]();}if(Window_SideviewUiBattleStatus[_0x1a3baf(0x242)]){let _0x2637f7=_0x109f22+Window_SideviewUiBattleStatus[_0x1a3baf(0x2cb)],_0x1eb2f8=_0x142b0e+Window_SideviewUiBattleStatus[_0x1a3baf(0x24a)];this[_0x1a3baf(0x1e2)](_0x1e8cb7,'tp',_0x2637f7,_0x1eb2f8),_0x142b0e+=this['gaugeLineHeight']();}},Window_SideviewUiBattleStatus[_0x294cd2(0x226)][_0x294cd2(0x2c2)]=function(){const _0x29e83f=_0x294cd2;if(Imported['VisuMZ_2_BattleSystemCTB']&&BattleManager[_0x29e83f(0x2a2)]())return![];return BattleManager[_0x29e83f(0x2d2)]()&&Window_SideviewUiBattleStatus['NAME_SHOWN']&&Window_SideviewUiBattleStatus['TPB_SHOWN'];},Window_SideviewUiBattleStatus[_0x294cd2(0x226)][_0x294cd2(0x20c)]=function(){const _0x4ac59e=_0x294cd2;return Window_SideviewUiBattleStatus['NAME_SHOWN']&&Window_SideviewUiBattleStatus['AGGRO_SHOWN']&&Imported[_0x4ac59e(0x25f)]&&ConfigManager[_0x4ac59e(0x1ec)]&&VisuMZ[_0x4ac59e(0x22d)][_0x4ac59e(0x2b1)][_0x4ac59e(0x2ba)][_0x4ac59e(0x2c6)];},Window_SideviewUiBattleStatus[_0x294cd2(0x226)][_0x294cd2(0x21e)]=function(){const _0x45d52f=_0x294cd2;return Imported[_0x45d52f(0x28f)]&&Window_SideviewUiBattleStatus['BOOST_SHOWN']&&BattleManager[_0x45d52f(0x27f)]();},Window_SideviewUiBattleStatus[_0x294cd2(0x226)]['isAdjustBravePoints']=function(){const _0x2a09ab=_0x294cd2;return Imported['VisuMZ_2_BattleSystemBTB']&&Window_SideviewUiBattleStatus[_0x2a09ab(0x28e)]&&BattleManager[_0x2a09ab(0x277)]();},Window_SideviewUiBattleStatus['prototype'][_0x294cd2(0x2c1)]=function(){const _0x2f4f9b=_0x294cd2;VisuMZ[_0x2f4f9b(0x209)][_0x2f4f9b(0x2b1)]['StatusWindow']['CustomUi']&&VisuMZ[_0x2f4f9b(0x209)][_0x2f4f9b(0x2b1)][_0x2f4f9b(0x2c9)][_0x2f4f9b(0x27e)][_0x2f4f9b(0x1e8)](this,this['_battler']);};