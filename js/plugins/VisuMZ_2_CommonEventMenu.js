//=============================================================================
// VisuStella MZ - Common Event Menu
// VisuMZ_2_CommonEventMenu.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_CommonEventMenu = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CommonEventMenu = VisuMZ.CommonEventMenu || {};
VisuMZ.CommonEventMenu.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.02] [CommonEventMenu]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Common_Event_Menu_VisuStella_MZ
 * @base VisuMZ_1_EventsMoveCore
 * @orderAfter VisuMZ_1_EventsMoveCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Common Event Menu allows you to create your own custom menu setups all
 * through a simple Plugin Command. When using it, you can list whatever Common
 * Events you so wish and generate a menu that when selecting the menu command,
 * it will run the Common Event. This Common Event Menu setup allows you to
 * utilize a help window, a picture window, and a subtext window to allow for
 * your own personal touch when using the Common Event list window.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Launch a Common Event Menu with the Common Events that you want, in the
 *   layout that you prefer, with the options you desire by just using a simple
 *   Plugin Command.
 * * Pick from over 100+ different premade layouts for the Common Event Menu.
 * * JavaScript users can create their own custom layouts, alongside 10 extra
 *   windows to help them show any extra data they may need.
 * * The picture window can show different images whenever a specific Common
 *   Event is selected in the List Window.
 * * A help window will show information on the selected Common Event.
 * * A subtext window can display additional information about any selected
 *   Common Event.
 * * Use switches to enable, disable, show, or hide Common Events for the
 *   Common Event Menu to make it something more dynamic.
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
 * * VisuMZ_1_EventsMoveCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * VisuMZ_1_OptionsCore
 *
 * When selecting pre-made Layouts for the Common Event Menu, depending on the
 * settings for the Help Window Position and Input Window Position, the four
 * main windows for the Common Event Menu will be positioned differently to
 * account for these main settings.
 * 
 * Right Input would put the List Window towards the right side of the screen.
 * If it is off, then the List Window would appear towards the left side of the
 * screen. When a layout with "Mirror" is in place, these settings are reversed
 * to apply the mirror effect.
 * 
 * Bottom Help would put the Help Window towards the bottom of the screen and
 * the Subtext would go towards the top. If the Bottom Help position is turned
 * off, then the Help Window would appear at the top while the Subtext would
 * appear at the bottom. When a layout with "Inverse" is in place, these
 * settings are reversed to apply the inverse effect.
 * 
 * When viewing the previews on the Yanfly.moe wiki, the previews will be
 * displayed with the Help Window towards the top and the input towards the
 * right side of the screen (ie the Recommended Settings).
 * 
 * !! WARNING !!
 * 
 * These settings do NOT apply to Custom Layouts in order to reduce confusion
 * for the game dev. If the game dev wishes to implement them in, then utilize
 * Scene_Base's "isBottomHelpMode" and "isRightInputMode" functions when
 * inserting the JavaScript code needed.
 * 
 * !! WARNING !!
 * 
 * Not all pre-made layouts work with all screen resolutions as this is very
 * much so the case if you plan on using a smaller-than-normal screen
 * resolution. If a specific layout does not work with a resolution you want,
 * pick another layout that works. These layouts are made under the industry
 * standard of a 16:9, 1280x720 screen resolution.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Common Event Menu Plugin Command ===
 * 
 * This is the Plugin Command that lets you create the Common Event Menu. The
 * Common Event Menu is inaccessible from any other way.
 * 
 * ---
 *
 * Common Event Menu: Start
 * - Start a Common Event Menu with the below settings.
 *
 *   Common Events:
 *   - Select the Common Events you want shown in the menu.
 *
 *     Cancel Event:
 *     - Runs this Common Event when Cancel is pressed.
 *     - Insert 0 to disable Cancel.
 *
 *   Layout:
 *   - Pick a layout to use for the Common Event Menu.
 *   - Select "Custom" to position windows via JavaScript.
 *   - Picking '-' will not create any Common Event Menus.
 *   - Look on Yanfly.moe for a visual list of all the layouts.
 *
 *     Custom Layout:
 *     - Modify the settings for a Custom layout.
 *     - Requires the above parameter to be "Custom".
 *
 *   Optional Settings:
 *   - Optional settings for the Common Event Menu.
 * 
 * !! WARNING !!
 * 
 * Not all pre-made layouts work with all screen resolutions as this is very
 * much so the case if you plan on using a smaller-than-normal screen
 * resolution. If a specific layout does not work with a resolution you want,
 * pick another layout that works. These layouts are made under the industry
 * standard of a 16:9, 1280x720 screen resolution.
 *
 * ---
 *
 * Common Events (Sub Settings)
 * - Select the Common Events you want shown in the menu.
 * 
 *   Specific ID's:
 *
 *     ID(s):
 *     - Select the Common Events you want displayed in the menu based on their
 *       exact ID's.
 *
 *   ID Range:
 * 
 *     Range Start:
 *     - Select the Common Event ID range to start from.
 *     - This will select all the ID's up to the end range.
 * 
 *     Range End:
 *     - Select the Common Event ID range to end with.
 *     - This will select all the ID's from the start range.
 * 
 *   JS:
 *
 *     Custom JS:
 *     - Create a list of Common Event ID's with JavaScript.
 * 
 *   Filters:
 *
 *     Empty Name:
 *     - Apply filter for Common Events without a name?
 *
 *     ----- Name:
 *     - Apply filter for Common Events with ----- in their name?
 *
 * ---
 *
 * Custom Layout (Sub Settings)
 * - Modify the settings for a Custom layout.
 * - Requires the above parameter to be "Custom".
 * 
 *   Main Windows:
 * 
 *     JS: List Window:
 *     JS: Picture Window:
 *     JS: Help Window:
 *     JS: Sub Window:
 *     - Determine how this Window is positioned.
 *     - Only applies with Custom layouts.
 * 
 *   Extra Windows:
 *
 *     JS: Extra Window 1:
 *     JS: Extra Window 2:
 *     JS: Extra Window 3:
 *     JS: Extra Window 4:
 *     JS: Extra Window 5:
 *     JS: Extra Window 6:
 *     JS: Extra Window 7:
 *     JS: Extra Window 8:
 *     JS: Extra Window 9:
 *     JS: Extra Window 10:
 *     - Determine how this Extra Window is positioned.
 *     - Only applies with Custom layouts.
 * 
 * !! WARNING !!
 * 
 * These settings do NOT apply to Custom Layouts in order to reduce confusion
 * for the game dev. If the game dev wishes to implement them in, then utilize
 * Scene_Base's "isBottomHelpMode" and "isRightInputMode" functions when
 * inserting the JavaScript code needed.
 *
 * ---
 *
 * Optional Settings (Sub Settings)
 * - Optional settings for the Common Event Menu.
 * 
 *   All Windows:
 *
 *     Background Type:
 *     - Select the background type for all of the Common Event Menu windows.
 *       - 0 - Window
 *       - 1 - Dim
 *       - 2 - Transparent
 *
 *     Boundary Size:
 *     - Pick the boundary size for the layout.
 *     - Does NOT apply to Custom Layouts.
 *       - Full      (Game Screen)
 *       - UI Size   (UI Resolution)
 *       - Padded    (16 px Border)
 *       - Huge      (32 px Border)
 *       - Large     (48 px Border)
 *       - Medium    (64 px Border)
 *       - Small     (96 px Border)
 *       - Tiny      (128 px Border)
 *       - Micro     (160 px Border)
 *       - Wut       (192 px Border)
 * 
 *   List Window:
 *
 *     List Columns:
 *     - The number of columns the List Window has.
 *     - Use 'auto' to determine it automatically.
 *     - You may use JavaScript.
 *
 *     Auto Select:
 *     - Which Common Event should be selected at the start?
 *     - Use 'last' for last picked ID.
 *     - You may use JavaScript.
 * 
 *     Auto-Sort ID's:
 *     - Automatically sort the Common Event's inserted into the Plugin Command
 *       by their database ID's?
 *     - This only applies to the "Specific" and "Custom JS" list where the
 *       order of the ID's inserted can be controlled. "ID Range" settings are
 *       always going to be sorted by ID.
 *     - This can be disabled for those who wish to manually switch around the
 *       order of their displayed Common Event ID's.
 *
 *     Text Alignment:
 *     - How do you want the text to be aligned for the List Window?
 * 
 *   Cancel Button:
 *
 *     Show Cancel Button:
 *     - Show the Cancel Button?
 *     - Requires a Cancel Common Event.
 *
 *     Button Scale:
 *     - Scale the button size by this much.
 *
 *     Button Position:
 *     - Select where the button appears.
 *
 *     Button Offset X:
 *     - Offset the Cancel Button X position by this much.
 *
 *     Button Offset Y:
 *     - Offset the Cancel Button Y position by this much.
 * 
 *   Picture Window:
 *
 *     Auto-Fit Image:
 *     - Automatically fit the picture to the size of the Picture Window if the
 *       picture is larger than the window?
 *
 *     Image Anchor X:
 *     - Pick how the picture is anchored horizontally in the Picture Window.
 *
 *     Image Anchor Y:
 *     - Pick how the picture is anchored vertically in the Picture Window.
 *
 * ---
 *
 * ============================================================================
 * Comment Tags
 * ============================================================================
 *
 * The following are comment tags that have been added through this plugin.
 * These comment tags will not work with your game if this plugin is OFF or not
 * present. To make a comment tag, create a comment inside of the Common Event
 * and type in any of the comment tags seen below for their effects.
 *
 * ---
 * 
 * === Basic-Related Comment Tags ===
 * 
 * ---
 *
 * <Name: text>
 *
 * - Used for: Common Event Comment Tag
 * - Replaces the text that appears in the Common Event Menu List with this
 *   instead of the Common Event's name found in the database.
 * - Replace 'text' with the name you want to be displayed in the List Window.
 * - If this comment tag is not used, default to the Common Event's name.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Common Event Comment Tag
 * - Sets the icon shown next to this Common Event.
 * - Replace 'x' with a number representing the icon index used for this
 *   Common Event.
 * - If this comment tag is not used, default to the Plugin Parameters.
 *
 * ---
 *
 * <Indent: x>
 *
 * - Used for: Common Event Comment Tag
 * - Indents the name when it appears in the Common Event List.
 * - Replace 'x' with the number of times to indent the name.
 * - Each indent is equal to an icon width.
 * - Indents do not apply if there are more than 1 column for the event list.
 *
 * ---
 *
 * <Picture: filename>
 *
 * - Used for: Common Event Comment Tag
 * - Description
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder.
 *   - Filenames are case sensitive.
 *   - Leave out the filename extension from the notetag.
 *
 * ---
 * 
 * === Description-Related Comment Tags ===
 * 
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: Common Event Comment Tag
 * - When this Common Event is selected, display this text in the Help Window.
 * - Replace 'text' with the text you want to display in the Help Window when
 *   this Common Event is selected.
 * - You can chain together Comment event commands in the RPG Maker Editor to
 *   combine their contents in case you want to add more than 4 lines of text.
 *
 * ---
 *
 * <Subtext Description>
 *  text
 *  text
 * </Subtext Description>
 *
 * - Used for: Common Event Comment Tag
 * - When this Common Event is selected, display this text in the Sub Window.
 * - Replace 'text' with the text you want to display in the Sub Window when
 *   this Common Event is selected.
 * - You can chain together Comment event commands in the RPG Maker Editor to
 *   combine their contents in case you want to add more than 4 lines of text.
 *
 * ---
 *
 * <Extra Description x>
 *  text
 *  text
 * </Extra Description x>
 *
 * - Used for: Common Event Comment Tag
 * - When this Common Event is selected, display this text in the Extra Window.
 * - Replace 'x' with a number from 1 to 10 to determine which Extra Window to
 *   display the text in.
 * - Replace 'text' with the text you want to display in the Extra Window when
 *   this Common Event is selected.
 * - You can chain together Comment event commands in the RPG Maker Editor to
 *   combine their contents in case you want to add more than 4 lines of text.
 *
 * ---
 * 
 * === Visibility-Related Comment Tags ===
 * 
 * ---
 *
 * <Show Switch: x>
 * 
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the visible status of the Common Event based on switches.
 * - Replace 'x' with the switch ID to determine the Common Event's visibility.
 * - If 'All' notetag variant is used, the Common Event will be hidden until
 *   all switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, the Common Event will be shown if any
 *   of the switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 * 
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the visible status of the Common Event based on switches.
 * - Replace 'x' with the switch ID to determine the Common Event's visibility.
 * - If 'All' notetag variant is used, the Common Event will be shown until
 *   all switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, the Common Event will be hidden if any
 *   of the switches are ON. Otherwise, it would be shown.
 *
 * ---
 * 
 * === JavaScript Comment Tag: Visibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a Common Event is visible in the menu by code.
 * 
 * ---
 *
 * <JS Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Visible>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the visible status of the Common Event based on JavaScript
 *   code.
 * - Replace 'code' to determine the type visible status of the Common Event.
 * - You can chain together Comment event commands in the RPG Maker Editor to
 *   combine their contents in case you want to add more than 4 lines of code.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   Common Event will be visible or not.
 * - All other Common Event conditions must be met in order for this to code to
 *   count.
 *
 * ---
 * 
 * === Enable-Related Comment Tags ===
 * 
 * ---
 *
 * <Enable Switch: x>
 * 
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the enabled status of the Common Event based on switches.
 * - Replace 'x' with the switch ID to determine if the Common Event's enabled.
 * - If 'All' notetag variant is used, the Common Event will be disabled until
 *   all switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, the Common Event will be enabled if any
 *   of the switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 * 
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the enabled status of the Common Event based on switches.
 * - Replace 'x' with the switch ID to determine if the Common Event's enabled.
 * - If 'All' notetag variant is used, the Common Event will be enabled until
 *   all switches are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, the Common Event will be disabled if any
 *   of the switches are ON. Otherwise, it would be enabled.
 *
 * ---
 * 
 * === JavaScript Comment Tag: Enable ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a Common Event can be selectable by code.
 * 
 * ---
 *
 * <JS Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Enable>
 *
 * - Used for: Common Event Comment Tag
 * - Determines the enabled status of the Common Event based on JavaScript
 *   code.
 * - Replace 'code' to determine the type enabled status of the Common Event.
 * - You can chain together Comment event commands in the RPG Maker Editor to
 *   combine their contents in case you want to add more than 4 lines of code.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   Common Event will be enabled or not.
 * - All other Common Event conditions must be met in order for this to code to
 *   count.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * There's only a single plugin parameter for the default settings and that's
 * to define the default icon displayed for the Common Event Menu when a Common
 * Event does not have the <Icon: x> comment tag.
 *
 * ---
 *
 * Settings
 * 
 *   Default Icon:
 *   - Select what icon will be the default Common Event entry icon.
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
 * * Irina
 * * V.Aero
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.02: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command Optional Setting added by Olivia:
 * *** Common Event Menu: Start > Optional > List Window > Auto Sort ID's
 * **** Automatically sort the Common Event's inserted into the Plugin Command
 *      by their database ID's?
 * **** This only applies to the "Specific" and "Custom JS" list where the
 *      order of the ID's inserted can be controlled. "ID Range" settings are
 *      always going to be sorted by ID.
 * **** This can be disabled for those who wish to manually switch around the
 *      order of their displayed Common Event ID's.
 * 
 * Version 1.01: June 25, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for Event Title Scene.
 * 
 * Version 1.00 Official Release Date: March 1, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CommonEventMenu
 * @text Common Event Menu: Start
 * @desc Start a Common Event Menu with the below settings.
 *
 * @arg CommonEvents:struct
 * @text Common Events
 * @type struct<CommonEvents>
 * @desc Select the Common Events you want shown in the menu.
 * @default {"Specific":"","ID:arraynum":"[]","Range":"","RangeStart:num":"0","RangeEnd:num":"0","JS":"","CustomJS:func":"\"// Declare Variables\\nlet list = [];\\n\\n// Add Common Event ID's\\n\\n\\n// Return List\\nreturn list;\"","Filters":"","FilterEmptyName:eval":"true","FilterLine:eval":"true"}
 *
 * @arg CancelEvent:num
 * @text Cancel Event
 * @parent CommonEvents:struct
 * @type common_event
 * @desc Runs this Common Event when Cancel is pressed.
 * Insert 0 to disable Cancel.
 * @default 0
 *
 * @arg Layout:str
 * @text Layout
 * @type select
 * @option -
 * @option Custom
 * @option -
 * @option Full-Screen
 * @option -
 * @option Gallery 1-Row-List
 * @option Gallery 2-Row-List
 * @option Gallery 3-Row-List
 * @option Gallery 4-Row-List
 * @option Gallery 5-Row-List
 * @option Gallery 6-Row-List
 * @option -
 * @option Gallery 1-Row-List Inverse
 * @option Gallery 2-Row-List Inverse
 * @option Gallery 3-Row-List Inverse
 * @option Gallery 4-Row-List Inverse
 * @option Gallery 5-Row-List Inverse
 * @option Gallery 6-Row-List Inverse
 * @option -
 * @option Gallery 1-Row-List No-Sub
 * @option Gallery 2-Row-List No-Sub
 * @option Gallery 3-Row-List No-Sub
 * @option Gallery 4-Row-List No-Sub
 * @option Gallery 5-Row-List No-Sub
 * @option Gallery 6-Row-List No-Sub
 * @option -
 * @option Gallery 1-Row-List No-Sub Inverse
 * @option Gallery 2-Row-List No-Sub Inverse
 * @option Gallery 3-Row-List No-Sub Inverse
 * @option Gallery 4-Row-List No-Sub Inverse
 * @option Gallery 5-Row-List No-Sub Inverse
 * @option Gallery 6-Row-List No-Sub Inverse
 * @option -
 * @option Gallery 1-Row-List Thick-Sub
 * @option Gallery 2-Row-List Thick-Sub
 * @option Gallery 3-Row-List Thick-Sub
 * @option Gallery 4-Row-List Thick-Sub
 * @option Gallery 5-Row-List Thick-Sub
 * @option Gallery 6-Row-List Thick-Sub
 * @option -
 * @option Gallery 1-Row-List Thick-Sub Inverse
 * @option Gallery 2-Row-List Thick-Sub Inverse
 * @option Gallery 3-Row-List Thick-Sub Inverse
 * @option Gallery 4-Row-List Thick-Sub Inverse
 * @option Gallery 5-Row-List Thick-Sub Inverse
 * @option Gallery 6-Row-List Thick-Sub Inverse
 * @option -
 * @option Side-Sub
 * @option Side-Sub Inverse
 * @option Side-Sub Mirror
 * @option Side-Sub Mirror Inverse
 * @option -
 * @option Side-Sub Firm-List
 * @option Side-Sub Firm-List Inverse
 * @option Side-Sub Firm-List Mirror
 * @option Side-Sub Firm-List Mirror Inverse
 * @option -
 * @option Side-Sub Half-Base-Pict
 * @option Side-Sub Half-Base-Pict Inverse
 * @option Side-Sub Half-Base-Pict Mirror
 * @option Side-Sub Half-Base-Pict Mirror Inverse
 * @option -
 * @option Side-Sub Lite-List
 * @option Side-Sub Lite-List Inverse
 * @option Side-Sub Lite-List Mirror
 * @option Side-Sub Lite-List Mirror Inverse
 * @option -
 * @option Standard
 * @option Standard Inverse
 * @option Standard Mirror
 * @option Standard Mirror Inverse
 * @option -
 * @option Standard No-Sub
 * @option Standard No-Sub Inverse
 * @option Standard No-Sub Mirror
 * @option Standard No-Sub Mirror Inverse
 * @option -
 * @option Standard Sub-Corner-List
 * @option Standard Sub-Corner-List Inverse
 * @option Standard Sub-Corner-List Mirror
 * @option Standard Sub-Corner-List Mirror Inverse
 * @option -
 * @option Standard Sub-Corner-Pict
 * @option Standard Sub-Corner-Pict Inverse
 * @option Standard Sub-Corner-Pict Mirror
 * @option Standard Sub-Corner-Pict Mirror Inverse
 * @option -
 * @option Standard Thick-Sub
 * @option Standard Thick-Sub Inverse
 * @option Standard Thick-Sub Mirror
 * @option Standard Thick-Sub Mirror Inverse
 * @option -
 * @option Standard Thick-Sub-Corner-List
 * @option Standard Thick-Sub-Corner-List Inverse
 * @option Standard Thick-Sub-Corner-List Mirror
 * @option Standard Thick-Sub-Corner-List Mirror Inverse
 * @option -
 * @option Standard Thick-Sub-Corner-Pict
 * @option Standard Thick-Sub-Corner-Pict Inverse
 * @option Standard Thick-Sub-Corner-Pict Mirror
 * @option Standard Thick-Sub-Corner-Pict Mirror Inverse
 * @option -
 * @option Tall
 * @option Tall Inverse
 * @option Tall Mirror
 * @option Tall Mirror Inverse
 * @option -
 * @option Tall Half-Base-Pict
 * @option Tall Half-Base-Pict Inverse
 * @option Tall Half-Base-Pict Mirror
 * @option Tall Half-Base-Pict Mirror Inverse
 * @option -
 * @option Tall No-Sub
 * @option Tall No-Sub Inverse
 * @option Tall No-Sub Mirror
 * @option Tall No-Sub Mirror Inverse
 * @option -
 * @option Tall Thick-Sub
 * @option Tall Thick-Sub Inverse
 * @option Tall Thick-Sub Mirror
 * @option Tall Thick-Sub Mirror Inverse
 * @option -
 * @option Wide-List
 * @option Wide-List Inverse
 * @option -
 * @option Wide-List Base-Pict
 * @option Wide-List Base-Pict Inverse
 * @option -
 * @option Wide-List Half-Base-Pict Thick-Sub-Corner-Pict
 * @option Wide-List Half-Base-Pict Thick-Sub-Corner-Pict Inverse
 * @option Wide-List Half-Base-Pict Thick-Sub-Corner-Pict Mirror
 * @option Wide-List Half-Base-Pict Thick-Sub-Corner-Pict Mirror Inverse
 * @option -
 * @option Wide-List No-Sub
 * @option Wide-List No-Sub Inverse
 * @option -
 * @option Wide-List Thick-Sub
 * @option Wide-List Thick-Sub Inverse
 * @option -
 * @option Custom
 * @option -
 * @desc Pick a layout to use for the Common Event Menu.
 * Select "Custom" to position windows via JavaScript.
 * @default Standard
 *
 * @arg CustomLayout:struct
 * @text Custom Layout
 * @parent Layout:str
 * @type struct<CustomLayout>
 * @desc Modify the settings for a Custom layout.
 * Requires the above parameter to be "Custom".
 * @default 
 *
 * @arg Optional:struct
 * @text Optional Settings
 * @type struct<Optional>
 * @desc Optional settings for the Common Event Menu.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommonEventMenu
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param DefaultIcon:num
 * @text Default Icon
 * @desc Select what icon will be the default Common Event entry icon.
 * @default 160
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
 * Common Events Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CommonEvents:
 *
 * @param Specific
 * @text Specific ID's
 *
 * @param ID:arraynum
 * @text ID(s)
 * @parent Specific
 * @type common_event[]
 * @desc Select the Common Events you want displayed in the menu
 * based on their exact ID's.
 * @default []
 *
 * @param Range
 * @text ID Range
 *
 * @param RangeStart:num
 * @text Range Start
 * @parent Range
 * @type common_event
 * @desc Select the Common Event ID range to start from.
 * This will select all the ID's up to the end range.
 * @default 0
 *
 * @param RangeEnd:num
 * @text Range End
 * @parent Range
 * @type common_event
 * @desc Select the Common Event ID range to end with.
 * This will select all the ID's from the start range.
 * @default 0
 *
 * @param JS
 *
 * @param CustomJS:func
 * @text Custom JS
 * @parent JS
 * @type note
 * @desc Create a list of Common Event ID's with JavaScript.
 * @default "// Declare Variables\nlet list = [];\n\n// Add Common Event ID's\n\n\n// Return List\nreturn list;"
 *
 * @param Filters
 *
 * @param FilterEmptyName:eval
 * @text Empty Name
 * @parent Filters
 * @type boolean
 * @on Apply Filter
 * @off No Filter
 * @desc Apply filter for Common Events without a name?
 * @default true
 *
 * @param FilterLine:eval
 * @text ----- Name
 * @parent Filters
 * @type boolean
 * @on Apply Filter
 * @off No Filter
 * @desc Apply filter for Common Events with ----- in their name?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * CustomLayout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomLayout:
 *
 * @param Main
 * @text Main Windows
 *
 * @param List_Window_JS:func
 * @text JS: List Window
 * @parent Main
 * @type note
 * @desc Determine how the List Window is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = Math.floor(Graphics.width / 2);\nlet y = this.calcWindowHeight(2, false);\nlet width = Math.ceil(Graphics.width / 2);\nlet height = Graphics.height - this.calcWindowHeight(2, false) * 2;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Picture_Window_JS:func
 * @text JS: Picture Window
 * @parent Main
 * @type note
 * @desc Determine how the Picture Window is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = this.calcWindowHeight(2, false);\nlet width = Math.floor(Graphics.width / 2);\nlet height = Graphics.height - this.calcWindowHeight(2, false) * 2;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Help_Window_JS:func
 * @text JS: Help Window
 * @parent Main
 * @type note
 * @desc Determine how the Help Window is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = Graphics.width;\nlet height = this.calcWindowHeight(2, false);\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Sub_Window_JS:func
 * @text JS: Sub Window
 * @parent Main
 * @type note
 * @desc Determine how the Sub Window is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = Graphics.height - this.calcWindowHeight(2, false);\nlet width = Graphics.width;\nlet height = this.calcWindowHeight(2, false);\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 * 
 * @param Extra
 * @text Extra Windows
 *
 * @param Extra_Window_1_JS:func
 * @text JS: Extra Window 1
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 1 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_2_JS:func
 * @text JS: Extra Window 2
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 2 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_3_JS:func
 * @text JS: Extra Window 3
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 3 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_4_JS:func
 * @text JS: Extra Window 4
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 4 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_5_JS:func
 * @text JS: Extra Window 5
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 5 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_6_JS:func
 * @text JS: Extra Window 6
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 6 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_7_JS:func
 * @text JS: Extra Window 7
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 7 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_8_JS:func
 * @text JS: Extra Window 8
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 8 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_9_JS:func
 * @text JS: Extra Window 9
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 9 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Extra_Window_10_JS:func
 * @text JS: Extra Window 10
 * @parent Extra
 * @type note
 * @desc Determine how Extra Window 10 is positioned.
 * Only applies with Custom layouts.
 * @default "// Declare Dimensions\nlet x = 0;\nlet y = 0;\nlet width = 0;\nlet height = 0;\n\n// Return Rectangle\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Optional Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Optional:
 *
 * @param AllWindows
 * @text All Windows
 *
 * @param WindowBgType:num
 * @text Background Type
 * @parent AllWindows
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select the background type for all of the Common Event Menu windows.
 * @default 0
 *
 * @param BoundarySize:str
 * @text Boundary Size
 * @parent AllWindows
 * @type select
 * @option Full      (Game Screen)
 * @option UI Size   (UI Resolution)
 * @option -         -
 * @option Padded    (16 px Border)
 * @option Huge      (32 px Border)
 * @option Large     (48 px Border)
 * @option Medium    (64 px Border)
 * @option Small     (96 px Border)
 * @option Tiny      (128 px Border)
 * @option Micro     (160 px Border)
 * @option Wut       (192 px Border)
 * @desc Pick the boundary size for the layout.
 * Does NOT apply to Custom Layouts.
 * @default UI Size   (UI Resolution)
 *
 * @param ListWindow
 * @text List Window
 * 
 * @param ListColumns:str
 * @text List Columns
 * @parent ListWindow
 * @desc The number of columns the List Window has. Use 'auto'
 * to determine it automatically. You may use JavaScript.
 * @default auto
 * 
 * @param AutoSelect:str
 * @text Auto Select
 * @parent ListWindow
 * @desc Which Common Event should be selected at the start?
 * Use 'last' for last picked ID. You may use JavaScript.
 * @default 0
 *
 * @param AutoSort:eval
 * @text Auto Sort ID's
 * @parent ListWindow
 * @type boolean
 * @on Auto-Sort
 * @off Don't Sort
 * @desc Automatically sort the Common Event's inserted into the
 * Plugin Commands by their database ID's?
 * @default true
 *
 * @param ListTextAlign:str
 * @text Text Alignment
 * @parent ListWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the text to be aligned for the List Window?
 * @default left
 *
 * @param CancelButton
 * @text Cancel Button
 *
 * @param ShowCancelButton:eval
 * @text Show Cancel Button
 * @parent CancelButton
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Cancel Button?
 * Requires a Cancel Common Event.
 * @default true
 *
 * @param CancelButtonScale:eval
 * @text Button Scale
 * @parent CancelButton
 * @desc Scale the button size by this much.
 * @default 0.8
 *
 * @param CancelButtonPosition:str
 * @text Button Position
 * @parent CancelButton
 * @type combo
 * @option upper left
 * @option upper center
 * @option upper right
 * @option middle left
 * @option middle center
 * @option middle right
 * @option bottom left
 * @option bottom center
 * @option bottom right
 * @desc Select where the button appears.
 * @default upper right
 *
 * @param CancelOffsetX:eval
 * @text Button Offset X
 * @parent CancelButton
 * @desc Offset the Cancel Button X position by this much.
 * @default -18
 *
 * @param CancelOffsetY:eval
 * @text Button Offset Y
 * @parent CancelButton
 * @desc Offset the Cancel Button Y position by this much.
 * @default 15
 *
 * @param PictureWindow
 * @text Picture Window
 *
 * @param PictureAutoFit:eval
 * @text Auto-Fit Image
 * @parent PictureWindow
 * @type boolean
 * @on Auto-Fit
 * @off Real Size
 * @desc Automatically fit the picture to the size of the Picture
 * Window if the picture is larger than the window?
 * @default true
 *
 * @param PictureAnchorX:str
 * @text Image Anchor X
 * @parent PictureWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Pick how the picture is anchored horizontally in the Picture Window.
 * @default center
 *
 * @param PictureAnchorY:str
 * @text Image Anchor Y
 * @parent PictureWindow
 * @type combo
 * @option top
 * @option middle
 * @option bottom
 * @desc Pick how the picture is anchored vertically in the Picture Window.
 * @default middle
 *
 */
//=============================================================================

function _0x2025(_0xcc6919,_0x4b0de8){const _0xe6252c=_0xe625();return _0x2025=function(_0x2025e0,_0x1b5628){_0x2025e0=_0x2025e0-0x1a4;let _0x278022=_0xe6252c[_0x2025e0];return _0x278022;},_0x2025(_0xcc6919,_0x4b0de8);}const _0x733a56=_0x2025;(function(_0x206b9f,_0x3ce367){const _0x4adf27=_0x2025,_0x2e194a=_0x206b9f();while(!![]){try{const _0x8f9619=-parseInt(_0x4adf27(0x1b6))/0x1*(parseInt(_0x4adf27(0x2cc))/0x2)+-parseInt(_0x4adf27(0x1fd))/0x3*(parseInt(_0x4adf27(0x2cd))/0x4)+parseInt(_0x4adf27(0x1d0))/0x5+-parseInt(_0x4adf27(0x1dd))/0x6+parseInt(_0x4adf27(0x23d))/0x7+-parseInt(_0x4adf27(0x22f))/0x8*(parseInt(_0x4adf27(0x2b5))/0x9)+parseInt(_0x4adf27(0x1f5))/0xa*(parseInt(_0x4adf27(0x271))/0xb);if(_0x8f9619===_0x3ce367)break;else _0x2e194a['push'](_0x2e194a['shift']());}catch(_0x3a7d2b){_0x2e194a['push'](_0x2e194a['shift']());}}}(_0xe625,0xe77e5));var label=_0x733a56(0x1de),tier=tier||0x0,dependencies=['VisuMZ_1_EventsMoveCore'],pluginData=$plugins[_0x733a56(0x29e)](function(_0x59f173){const _0x486707=_0x733a56;return _0x59f173['status']&&_0x59f173[_0x486707(0x232)][_0x486707(0x1ae)]('['+label+']');})[0x0];VisuMZ[label][_0x733a56(0x2bf)]=VisuMZ[label][_0x733a56(0x2bf)]||{},VisuMZ['ConvertParams']=function(_0x50356e,_0x2f0044){const _0x37ce60=_0x733a56;for(const _0x59b2da in _0x2f0044){if(_0x59b2da[_0x37ce60(0x230)](/(.*):(.*)/i)){const _0xb3ba33=String(RegExp['$1']),_0x4b502b=String(RegExp['$2'])[_0x37ce60(0x218)]()['trim']();let _0x102bcf,_0xe2b029,_0x8f80df;switch(_0x4b502b){case _0x37ce60(0x22b):_0x102bcf=_0x2f0044[_0x59b2da]!==''?Number(_0x2f0044[_0x59b2da]):0x0;break;case'ARRAYNUM':_0xe2b029=_0x2f0044[_0x59b2da]!==''?JSON[_0x37ce60(0x203)](_0x2f0044[_0x59b2da]):[],_0x102bcf=_0xe2b029[_0x37ce60(0x22d)](_0x552fd4=>Number(_0x552fd4));break;case _0x37ce60(0x20c):_0x102bcf=_0x2f0044[_0x59b2da]!==''?eval(_0x2f0044[_0x59b2da]):null;break;case _0x37ce60(0x290):_0xe2b029=_0x2f0044[_0x59b2da]!==''?JSON[_0x37ce60(0x203)](_0x2f0044[_0x59b2da]):[],_0x102bcf=_0xe2b029[_0x37ce60(0x22d)](_0x3bff83=>eval(_0x3bff83));break;case _0x37ce60(0x28a):_0x102bcf=_0x2f0044[_0x59b2da]!==''?JSON[_0x37ce60(0x203)](_0x2f0044[_0x59b2da]):'';break;case'ARRAYJSON':_0xe2b029=_0x2f0044[_0x59b2da]!==''?JSON['parse'](_0x2f0044[_0x59b2da]):[],_0x102bcf=_0xe2b029[_0x37ce60(0x22d)](_0x2563e5=>JSON[_0x37ce60(0x203)](_0x2563e5));break;case _0x37ce60(0x249):_0x102bcf=_0x2f0044[_0x59b2da]!==''?new Function(JSON[_0x37ce60(0x203)](_0x2f0044[_0x59b2da])):new Function('return\x200');break;case _0x37ce60(0x277):_0xe2b029=_0x2f0044[_0x59b2da]!==''?JSON[_0x37ce60(0x203)](_0x2f0044[_0x59b2da]):[],_0x102bcf=_0xe2b029['map'](_0x42255a=>new Function(JSON[_0x37ce60(0x203)](_0x42255a)));break;case _0x37ce60(0x244):_0x102bcf=_0x2f0044[_0x59b2da]!==''?String(_0x2f0044[_0x59b2da]):'';break;case _0x37ce60(0x2a1):_0xe2b029=_0x2f0044[_0x59b2da]!==''?JSON[_0x37ce60(0x203)](_0x2f0044[_0x59b2da]):[],_0x102bcf=_0xe2b029[_0x37ce60(0x22d)](_0x50c526=>String(_0x50c526));break;case _0x37ce60(0x2b2):_0x8f80df=_0x2f0044[_0x59b2da]!==''?JSON[_0x37ce60(0x203)](_0x2f0044[_0x59b2da]):{},_0x102bcf=VisuMZ[_0x37ce60(0x2f2)]({},_0x8f80df);break;case _0x37ce60(0x2e7):_0xe2b029=_0x2f0044[_0x59b2da]!==''?JSON[_0x37ce60(0x203)](_0x2f0044[_0x59b2da]):[],_0x102bcf=_0xe2b029[_0x37ce60(0x22d)](_0xd70b68=>VisuMZ['ConvertParams']({},JSON[_0x37ce60(0x203)](_0xd70b68)));break;default:continue;}_0x50356e[_0xb3ba33]=_0x102bcf;}}return _0x50356e;},(_0x5bcbd0=>{const _0x1408bb=_0x733a56,_0x4d7302=_0x5bcbd0[_0x1408bb(0x20a)];for(const _0x5b23c6 of dependencies){if(!Imported[_0x5b23c6]){alert(_0x1408bb(0x1f4)[_0x1408bb(0x256)](_0x4d7302,_0x5b23c6)),SceneManager['exit']();break;}}const _0x2374b7=_0x5bcbd0[_0x1408bb(0x232)];if(_0x2374b7[_0x1408bb(0x230)](/\[Version[ ](.*?)\]/i)){const _0x1fb222=Number(RegExp['$1']);if(_0x1fb222!==VisuMZ[label][_0x1408bb(0x2d8)]){if(_0x1408bb(0x1be)!==_0x1408bb(0x2f6))alert(_0x1408bb(0x251)[_0x1408bb(0x256)](_0x4d7302,_0x1fb222)),SceneManager[_0x1408bb(0x224)]();else{const _0x1c3424=_0x5b248b[_0x1408bb(0x203)]('['+_0x2c2bd2['$1'][_0x1408bb(0x230)](/\d+/g)+']');for(const _0x5116e6 of _0x1c3424){if(!_0x45c67c[_0x1408bb(0x1cc)](_0x5116e6))return![];}return!![];}}}if(_0x2374b7[_0x1408bb(0x230)](/\[Tier[ ](\d+)\]/i)){const _0x201bbb=Number(RegExp['$1']);if(_0x201bbb<tier)alert(_0x1408bb(0x23a)[_0x1408bb(0x256)](_0x4d7302,_0x201bbb,tier)),SceneManager[_0x1408bb(0x224)]();else{if(_0x1408bb(0x281)===_0x1408bb(0x298)){if(!this['_commonEventMenuLayer'])return;this[_0x1408bb(0x25c)][_0x1408bb(0x25b)](_0x227fe2);}else tier=Math[_0x1408bb(0x1b5)](_0x201bbb,tier);}}VisuMZ[_0x1408bb(0x2f2)](VisuMZ[label][_0x1408bb(0x2bf)],_0x5bcbd0['parameters']);})(pluginData),PluginManager[_0x733a56(0x27e)](pluginData[_0x733a56(0x20a)],_0x733a56(0x1de),_0x46a0c9=>{const _0x562d96=_0x733a56;if(!SceneManager[_0x562d96(0x1a7)]()&&!SceneManager[_0x562d96(0x2fa)]())return;_0x46a0c9=JsonEx['makeDeepCopy'](_0x46a0c9),VisuMZ[_0x562d96(0x2f2)](_0x46a0c9,_0x46a0c9);const _0x13d6de=$gameTemp['getLastPluginCommandInterpreter'](),_0x5c95be=VisuMZ[_0x562d96(0x1de)]['CreateCommonEventList'](_0x46a0c9);if(_0x46a0c9[_0x562d96(0x250)]==='-'){if($gameTemp['isPlaytest']())alert('Please\x20pick\x20a\x20proper\x20layout!');return;}if(_0x5c95be[_0x562d96(0x255)]<=0x0){if(_0x562d96(0x1f1)===_0x562d96(0x204))_0x510cec=0x0;else{if($gameTemp[_0x562d96(0x1c4)]())alert(_0x562d96(0x1e1));return;}}if(_0x46a0c9['Layout']==='Custom'&&_0x46a0c9[_0x562d96(0x27c)][_0x562d96(0x1ee)]===undefined){if($gameTemp[_0x562d96(0x1c4)]())alert('Custom\x20Layout\x20Settings\x20not\x20defined!');return;}if($gameTemp[_0x562d96(0x2fb)]!==undefined){if(_0x562d96(0x2c5)!==_0x562d96(0x20f))$gameTemp[_0x562d96(0x2fb)]++,console[_0x562d96(0x26b)](_0x562d96(0x2bd)[_0x562d96(0x256)]($gameTemp[_0x562d96(0x2fb)][_0x562d96(0x2fe)](0x3)),_0x46a0c9[_0x562d96(0x250)]);else{if(!_0xfa4bad)return;this[_0x562d96(0x280)]=this[_0x562d96(0x280)]||{},this[_0x562d96(0x280)][_0x5b87d8]=_0x207622;}}_0x46a0c9[_0x562d96(0x2d1)]=_0x5c95be,SceneManager[_0x562d96(0x1b7)]['startCommonEventMenu'](_0x46a0c9,_0x13d6de),_0x13d6de[_0x562d96(0x28f)](0xa);}),VisuMZ[_0x733a56(0x1de)][_0x733a56(0x2fc)]=function(_0x492c47){const _0x3119fc=_0x733a56,_0x2498fc=_0x492c47[_0x3119fc(0x288)];let _0x2e9818=[];_0x2e9818=_0x2e9818[_0x3119fc(0x20b)](_0x2498fc['ID']);for(let _0x4f8b32=_0x2498fc[_0x3119fc(0x24f)];_0x4f8b32<=_0x2498fc[_0x3119fc(0x1c6)];_0x4f8b32++){const _0x589bc8=$dataCommonEvents[_0x4f8b32];if(!_0x589bc8)continue;_0x2e9818['push'](_0x4f8b32);}const _0x3cadf7=_0x2498fc['CustomJS']()||[];return _0x2e9818=_0x2e9818[_0x3119fc(0x20b)](_0x3cadf7),(_0x492c47[_0x3119fc(0x2ca)][_0x3119fc(0x2b4)]??!![])&&('wwCUd'!==_0x3119fc(0x242)?_0x417b0a=0xc0:_0x2e9818=_0x2e9818['sort']((_0x5bcdf2,_0x59afda)=>_0x5bcdf2-_0x59afda)),_0x2e9818=_0x2e9818[_0x3119fc(0x29e)]((_0x2a9bc7,_0x1da60a,_0x296207)=>_0x296207[_0x3119fc(0x297)](_0x2a9bc7)===_0x1da60a),_0x2e9818=_0x2e9818[_0x3119fc(0x1dc)](0x0),_0x2e9818=_0x2e9818['filter'](_0x31add5=>!!$dataCommonEvents[_0x31add5]),_0x2498fc['FilterEmptyName']&&(_0x2e9818=_0x2e9818[_0x3119fc(0x29e)](_0x35e63b=>$dataCommonEvents[_0x35e63b][_0x3119fc(0x20a)]!=='')),_0x2498fc['FilterLine']&&(_0x2e9818=_0x2e9818[_0x3119fc(0x29e)](_0x47493e=>!$dataCommonEvents[_0x47493e][_0x3119fc(0x20a)][_0x3119fc(0x230)](/-----/i))),_0x2e9818;},VisuMZ['CommonEventMenu'][_0x733a56(0x220)]={'Name':/<NAME:[ ](.*)>/i,'Icon':/<ICON:[ ](\d+)>/i,'Indent':/<INDENT:[ ](\d+)>/i,'Picture':/<PICTURE:[ ](.*)>/i,'Help':/<(?:HELP|DESCRIPTION|HELP DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i,'Sub':/<(?:SUB|SUBTEXT|SUB DESCRIPTION|SUBTEXT DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:SUB|SUBTEXT|SUB DESCRIPTION|SUBTEXT DESCRIPTION)>/i,'Extra1':/<(?:EXTRA|EXTRA DESCRIPTION) 1>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 1>/i,'Extra2':/<(?:EXTRA|EXTRA DESCRIPTION) 2>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 2>/i,'Extra3':/<(?:EXTRA|EXTRA DESCRIPTION) 3>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 3>/i,'Extra4':/<(?:EXTRA|EXTRA DESCRIPTION) 4>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 4>/i,'Extra5':/<(?:EXTRA|EXTRA DESCRIPTION) 5>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 5>/i,'Extra6':/<(?:EXTRA|EXTRA DESCRIPTION) 6>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 6>/i,'Extra7':/<(?:EXTRA|EXTRA DESCRIPTION) 7>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 7>/i,'Extra8':/<(?:EXTRA|EXTRA DESCRIPTION) 8>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 8>/i,'Extra9':/<(?:EXTRA|EXTRA DESCRIPTION) 9>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 9>/i,'Extra10':/<(?:EXTRA|EXTRA DESCRIPTION) 10>\s*([\s\S]*)\s*<\/(?:EXTRA|EXTRA DESCRIPTION) 10>/i,'ShowAll':/<(?:SHOW|SHOW ALL)[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'ShowAny':/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'HideAll':/<(?:HIDE|HIDE ALL)[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'HideAny':/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'VisibleJS':/<JS (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS (?:VISIBLE|SHOW|HIDE)>/i,'EnableAll':/<(?:ENABLE|ENABLE ALL)[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'EnableAny':/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'DisableAll':/<(?:DISABLE|DISABLE ALL)[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'DisableAny':/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'EnableJS':/<JS (?:ENABLE|DISABLE)>\s*([\s\S]*)\s*<\/JS (?:ENABLE|DISABLE)>/i},VisuMZ[_0x733a56(0x1de)][_0x733a56(0x299)]=Scene_Boot[_0x733a56(0x2dc)][_0x733a56(0x21f)],Scene_Boot[_0x733a56(0x2dc)][_0x733a56(0x21f)]=function(){const _0x5c9353=_0x733a56;VisuMZ['CommonEventMenu'][_0x5c9353(0x299)]['call'](this),this[_0x5c9353(0x2a5)]();},VisuMZ[_0x733a56(0x1de)]['JS']={},Scene_Boot[_0x733a56(0x2dc)]['process_VisuMZ_CommonEventMenu_JS']=function(){const _0x5d92e9=_0x733a56,_0x2b8047=VisuMZ[_0x5d92e9(0x1de)][_0x5d92e9(0x220)];for(const _0xaa5a0e of $dataCommonEvents){if(_0x5d92e9(0x283)!==_0x5d92e9(0x283))_0x58f544=_0x5f4857['ceil'](_0x3815a9[_0x5d92e9(0x260)]/0x2);else{if(!_0xaa5a0e)continue;const _0x19bef7=DataManager[_0x5d92e9(0x1d8)](_0xaa5a0e['id']);if(_0x19bef7[_0x5d92e9(0x230)](_0x2b8047[_0x5d92e9(0x296)])){const _0x302b0a=String(RegExp['$1']),_0x2b93e4=_0x5d92e9(0x1cf)['format'](_0xaa5a0e['id']),_0x465aff=_0x5d92e9(0x267)[_0x5d92e9(0x256)](_0x302b0a);VisuMZ[_0x5d92e9(0x1de)]['JS'][_0x2b93e4]=new Function(_0x465aff);}if(_0x19bef7['match'](_0x2b8047[_0x5d92e9(0x2a2)])){const _0x33bb4c=String(RegExp['$1']),_0x321f39=_0x5d92e9(0x275)[_0x5d92e9(0x256)](_0xaa5a0e['id']),_0x352da1=_0x5d92e9(0x279)[_0x5d92e9(0x256)](_0x33bb4c);VisuMZ['CommonEventMenu']['JS'][_0x321f39]=new Function(_0x352da1);}}}},DataManager[_0x733a56(0x1d8)]=function(_0x2f48c9){const _0x191b16=_0x733a56;this[_0x191b16(0x23f)]=this[_0x191b16(0x23f)]||[];if(this[_0x191b16(0x23f)][_0x2f48c9]!==undefined)return this[_0x191b16(0x23f)][_0x2f48c9];const _0x658192=$dataCommonEvents[_0x2f48c9];if(!_0x658192)return'';let _0x4c14e5='';for(const _0x34639a of _0x658192[_0x191b16(0x2d1)]){[0x6c,0x198][_0x191b16(0x1ae)](_0x34639a[_0x191b16(0x2af)])&&(_0x4c14e5+=_0x34639a['parameters'][0x0]+'\x0a');}return this['_commonEventMenuNote'][_0x2f48c9]=_0x4c14e5[_0x191b16(0x1ab)](),this[_0x191b16(0x23f)][_0x2f48c9];},DataManager['commonEventMenuName']=function(_0xf9ac8b,_0x254f53){const _0x207556=_0x733a56;if(_0x254f53){this[_0x207556(0x228)]=this[_0x207556(0x228)]||[];if(this[_0x207556(0x228)][_0xf9ac8b]!==undefined)return _0x207556(0x206)!==_0x207556(0x206)?this[_0x207556(0x1f9)][_0x2e9f89]:this[_0x207556(0x228)][_0xf9ac8b];}else{if(_0x207556(0x23e)!==_0x207556(0x23e))_0x5aa519=_0x3ba640[_0x207556(0x217)]((_0x1ab31d,_0x358a3f)=>_0x1ab31d-_0x358a3f);else{this[_0x207556(0x1f9)]=this['_commonEventMenuName']||[];if(this[_0x207556(0x1f9)][_0xf9ac8b]!==undefined)return this['_commonEventMenuName'][_0xf9ac8b];}}const _0x5d2232=$dataCommonEvents[_0xf9ac8b];if(!_0x5d2232)return'';let _0x4907a5=_0x5d2232[_0x207556(0x20a)],_0x82cff6=0x0;const _0xc417ab=VisuMZ['CommonEventMenu']['RegExp'],_0x298c93=DataManager['commonEventMenuNote'](_0xf9ac8b);_0x298c93[_0x207556(0x230)](_0xc417ab[_0x207556(0x24e)])&&(_0x207556(0x25e)!=='XaYDw'?_0x3d43fd+=_0x33349c[_0x207556(0x293)][0x0]+'\x0a':_0x4907a5=String(RegExp['$1'])[_0x207556(0x1ab)]());_0x298c93[_0x207556(0x230)](_0xc417ab[_0x207556(0x215)])?_0x207556(0x2c4)===_0x207556(0x2c4)?_0x82cff6=Number(RegExp['$1']):_0x5731ed['match'](/(?:INVERSE)/i)?_0x453286+=this[_0x207556(0x1f6)](_0x4ace75?0x2:0x4):_0x4bbf30+=this['calcWindowHeight'](_0x4d085e?0x4:0x2):'aQdRK'!==_0x207556(0x2c9)?_0x82cff6=ImageManager[_0x207556(0x2e2)]:_0x3f50b2=0x0;if(_0x82cff6)_0x4907a5='\x5cI[%1]%2'['format'](_0x82cff6,_0x4907a5);if(_0x254f53&&_0x298c93['match'](_0xc417ab['Indent'])){let _0x333d4e=Number(RegExp['$1']);while(_0x333d4e--){_0x4907a5=_0x207556(0x272)[_0x207556(0x256)](_0x4907a5);}}if(_0x254f53){if(_0x207556(0x254)!=='vqkyF'){let _0x1d58da=_0x12f991(_0x483778['$1']);while(_0x1d58da--){_0x3e9d55=_0x207556(0x272)[_0x207556(0x256)](_0x411c65);}}else return this[_0x207556(0x228)][_0xf9ac8b]=_0x4907a5,this[_0x207556(0x228)][_0xf9ac8b];}else return this['_commonEventMenuName'][_0xf9ac8b]=_0x4907a5,this[_0x207556(0x1f9)][_0xf9ac8b];},DataManager[_0x733a56(0x2ef)]=function(_0x3e2e3e){const _0x185738=_0x733a56;this['_commonEventMenuPicture']=this[_0x185738(0x2ad)]||[];if(this[_0x185738(0x2ad)][_0x3e2e3e]!==undefined)return this[_0x185738(0x2ad)][_0x3e2e3e];const _0x39de49=$dataCommonEvents[_0x3e2e3e];if(!_0x39de49)return'';let _0x1a42f4='';const _0x43f3de=VisuMZ[_0x185738(0x1de)][_0x185738(0x220)],_0x192327=DataManager[_0x185738(0x1d8)](_0x3e2e3e);return _0x192327[_0x185738(0x230)](_0x43f3de[_0x185738(0x23c)])&&(_0x185738(0x1d9)===_0x185738(0x1d9)?_0x1a42f4=String(RegExp['$1'])[_0x185738(0x1ab)]():_0x553c25+=this['calcWindowHeight'](_0x5b2e62?0x4:0x2)),this[_0x185738(0x2ad)][_0x3e2e3e]=_0x1a42f4,this['_commonEventMenuPicture'][_0x3e2e3e];},DataManager[_0x733a56(0x2a8)]=function(_0x4961a0,_0x10de43){const _0x4ec840=_0x733a56;this[_0x4ec840(0x1e2)]=this[_0x4ec840(0x1e2)]||[],this['_commonEventMenuDesc'][_0x10de43]=this[_0x4ec840(0x1e2)][_0x10de43]||{};if(this['_commonEventMenuDesc'][_0x10de43][_0x4961a0]!==undefined){if('ZCvuE'!==_0x4ec840(0x263)){if(_0x3a60f8[_0x4ec840(0x250)]!=='Custom')return;for(let _0x2beaee=0x1;_0x2beaee<=0xa;_0x2beaee++){this[_0x4ec840(0x252)](_0x29454e,_0x2beaee);}}else return this[_0x4ec840(0x1e2)][_0x10de43][_0x4961a0];}const _0x368cbe=$dataCommonEvents[_0x4961a0];if(!_0x368cbe)return'';let _0x1a2e99='';const _0x3037c8=VisuMZ['CommonEventMenu'][_0x4ec840(0x220)],_0x448ee4=DataManager[_0x4ec840(0x1d8)](_0x4961a0);return _0x448ee4[_0x4ec840(0x230)](_0x3037c8[_0x10de43])&&(_0x1a2e99=String(RegExp['$1'])[_0x4ec840(0x1ab)]()),this[_0x4ec840(0x1e2)][_0x10de43][_0x4961a0]=_0x1a2e99,this[_0x4ec840(0x1e2)][_0x10de43][_0x4961a0];},ImageManager[_0x733a56(0x2e2)]=VisuMZ['CommonEventMenu'][_0x733a56(0x2bf)][_0x733a56(0x24c)]||0x0,SceneManager[_0x733a56(0x1a7)]=function(){const _0x157915=_0x733a56;return this[_0x157915(0x1b7)]&&this['_scene'][_0x157915(0x2ba)]===Scene_Battle;},SceneManager[_0x733a56(0x1b4)]=function(){const _0x369b26=_0x733a56;return this[_0x369b26(0x1b7)]&&this[_0x369b26(0x1b7)][_0x369b26(0x2ba)]===Scene_Map;},SceneManager[_0x733a56(0x2fa)]=function(){const _0xd72638=_0x733a56;return this[_0xd72638(0x1b7)]&&this[_0xd72638(0x1b7)]instanceof Scene_Map;},VisuMZ[_0x733a56(0x1de)][_0x733a56(0x1ad)]=Game_System[_0x733a56(0x2dc)][_0x733a56(0x2aa)],Game_System['prototype'][_0x733a56(0x2aa)]=function(){const _0x802d0a=_0x733a56;VisuMZ[_0x802d0a(0x1de)][_0x802d0a(0x1ad)][_0x802d0a(0x236)](this),this[_0x802d0a(0x29f)]=0x0;},Game_System[_0x733a56(0x2dc)][_0x733a56(0x2b8)]=function(){const _0x354635=_0x733a56;return this[_0x354635(0x29f)]=this[_0x354635(0x29f)]||0x0,this[_0x354635(0x29f)];},Game_System[_0x733a56(0x2dc)]['setLastPickedCommonEventMenuID']=function(_0x11d653){const _0x4e18c8=_0x733a56;this[_0x4e18c8(0x29f)]=_0x11d653;},VisuMZ[_0x733a56(0x1de)][_0x733a56(0x261)]=Scene_Base[_0x733a56(0x2dc)][_0x733a56(0x211)],Scene_Base[_0x733a56(0x2dc)][_0x733a56(0x211)]=function(){const _0x2edc1d=_0x733a56;VisuMZ['CommonEventMenu'][_0x2edc1d(0x261)]['call'](this),this[_0x2edc1d(0x202)]();},Scene_Base[_0x733a56(0x2dc)][_0x733a56(0x202)]=function(){const _0x23ac57=_0x733a56;if(!this[_0x23ac57(0x257)]())return;this[_0x23ac57(0x25c)]=new Sprite(),this['addChild'](this[_0x23ac57(0x25c)]);},Scene_Base['prototype'][_0x733a56(0x257)]=function(){const _0x508443=_0x733a56;return[_0x508443(0x1da),_0x508443(0x2bc)]['includes'](this[_0x508443(0x2ba)][_0x508443(0x20a)]);},Scene_Base[_0x733a56(0x2dc)][_0x733a56(0x1bb)]=function(_0xf71ba2){const _0xc0d040=_0x733a56;if(!this[_0xc0d040(0x25c)])return;this[_0xc0d040(0x25c)][_0xc0d040(0x25b)](_0xf71ba2);},Scene_Base['prototype'][_0x733a56(0x21a)]=function(_0x4290bd,_0x5be0cd){const _0x227881=_0x733a56;if(!this['_commonEventMenuLayer'])return;this[_0x227881(0x1e0)]=this[_0x227881(0x1e0)]||{},this[_0x227881(0x2b9)](_0x4290bd),this[_0x227881(0x20d)](_0x4290bd),this['createCommonEventMenuSubWindow'](_0x4290bd),this[_0x227881(0x2f5)](_0x4290bd),this[_0x227881(0x1a8)](_0x4290bd,_0x5be0cd),this[_0x227881(0x1ef)]();for(const _0x25a334 of this[_0x227881(0x25c)][_0x227881(0x209)]){if(!_0x25a334)continue;_0x25a334[_0x227881(0x2c6)]&&_0x25a334[_0x227881(0x2c6)](_0x4290bd[_0x227881(0x2ca)]['WindowBgType']??0x0),_0x25a334['open']&&_0x25a334[_0x227881(0x2cb)]();}this['_active']=![];},Scene_Base[_0x733a56(0x2dc)]['commonEventMenuBoundary']=function(_0x50c727){const _0xd39a31=_0x733a56,_0x399230=_0x50c727[_0xd39a31(0x2ca)]['BoundarySize']??_0xd39a31(0x208);let _0x683f7c=new Rectangle(0x0,0x0,Graphics[_0xd39a31(0x260)],Graphics[_0xd39a31(0x262)]),_0x570c9c=0x0;if(_0x399230[_0xd39a31(0x230)](/(?:PADDED)/i))_0x570c9c=0x10;else{if(_0x399230[_0xd39a31(0x230)](/(?:HUGE)/i))_0x570c9c=0x20;else{if(_0x399230['match'](/(?:LARGE)/i))_0xd39a31(0x207)===_0xd39a31(0x207)?_0x570c9c=0x30:_0x42f5c4+=_0x2ec5e1?0x0:_0x5a10f5[_0xd39a31(0x260)]-_0x23bb6d;else{if(_0x399230[_0xd39a31(0x230)](/(?:MEDIUM)/i))_0x570c9c=0x40;else{if(_0x399230['match'](/(?:SMALL)/i))_0xd39a31(0x2c7)==='nbXpc'?_0x570c9c=0x60:(this['_opening']=![],this[_0xd39a31(0x2da)]&&(this[_0xd39a31(0x2da)]['visible']=!![]));else{if(_0x399230[_0xd39a31(0x230)](/(?:TINY)/i))_0x570c9c=0x80;else{if(_0x399230[_0xd39a31(0x230)](/(?:MICRO)/i))_0x570c9c=0xa0;else _0x399230[_0xd39a31(0x230)](/(?:WUT)/i)&&(_0x570c9c=0xc0);}}}}}}if(_0x399230[_0xd39a31(0x230)](/(?:UI)/i))_0xd39a31(0x1bf)!=='jKxqU'?_0x4ef58e+=_0x5b1a67?0x0:_0x5291b9[_0xd39a31(0x260)]-_0x2b2be1:(_0x683f7c['x']=this[_0xd39a31(0x245)]['x'],_0x683f7c['y']=this[_0xd39a31(0x245)]['y'],_0x683f7c['width']=Graphics[_0xd39a31(0x239)],_0x683f7c[_0xd39a31(0x262)]=Graphics['boxHeight']);else _0x570c9c&&(_0x683f7c['x']+=_0x570c9c,_0x683f7c['y']+=_0x570c9c,_0x683f7c['width']-=_0x570c9c*0x2,_0x683f7c[_0xd39a31(0x262)]-=_0x570c9c*0x2);return _0x683f7c[_0xd39a31(0x260)]=_0x683f7c[_0xd39a31(0x260)]['clamp'](0x0,Graphics[_0xd39a31(0x260)]),_0x683f7c[_0xd39a31(0x262)]=_0x683f7c['height'][_0xd39a31(0x2c1)](0x0,Graphics['height']),_0x683f7c;},Scene_Base[_0x733a56(0x2dc)][_0x733a56(0x1c8)]=function(_0x357def,_0x5bd6b5,_0x4535fd,_0x2ef652){const _0x5778b9=_0x733a56;return _0x357def=Math[_0x5778b9(0x2fd)](_0x357def),_0x5bd6b5=Math[_0x5778b9(0x2fd)](_0x5bd6b5),_0x4535fd=Math[_0x5778b9(0x1b5)](0x0,Math[_0x5778b9(0x2fd)](_0x4535fd)),_0x2ef652=Math[_0x5778b9(0x1b5)](0x0,Math[_0x5778b9(0x2fd)](_0x2ef652)),new Rectangle(_0x357def,_0x5bd6b5,_0x4535fd,_0x2ef652);},Scene_Base[_0x733a56(0x2dc)]['createCommonEventMenuPictureWindow']=function(_0x117e0d){const _0x35ccf8=_0x733a56,_0x1d5b0e=this[_0x35ccf8(0x29a)](_0x117e0d),_0x1fd6e5=new Window_CommonEventMenuPicture(_0x117e0d,_0x1d5b0e);_0x1fd6e5[_0x35ccf8(0x2a4)]=0x0,this[_0x35ccf8(0x1bb)](_0x1fd6e5),this[_0x35ccf8(0x1e0)][_0x35ccf8(0x2c3)]=_0x1fd6e5;},Scene_Base[_0x733a56(0x2dc)]['commonEventMenuPictureWindowRect']=function(_0x4945cb){const _0x121849=_0x733a56,_0x383ba0=_0x4945cb[_0x121849(0x250)],_0xa0ea23=this['isRightInputMode'](),_0x3f16b7=this[_0x121849(0x1ea)]();if(_0x383ba0===_0x121849(0x1ba))return _0x4945cb[_0x121849(0x27c)][_0x121849(0x2b0)][_0x121849(0x236)](this);const _0x21b150=this[_0x121849(0x264)](_0x4945cb);let _0x46b382=_0x21b150['x'],_0x37ddb5=_0x21b150['y'],_0x57c554=_0x21b150[_0x121849(0x260)],_0x4f5853=_0x21b150[_0x121849(0x262)];if(_0x383ba0[_0x121849(0x230)](/(?:STANDARD|FIRM-LIST)/i))_0x57c554=Math[_0x121849(0x1d3)](_0x57c554/0x2);else{if(_0x383ba0[_0x121849(0x230)](/(?:HALF-BASE-PICT|LITE-LIST)/i))_0x57c554=Math[_0x121849(0x24a)](_0x57c554/0x2);else{if(_0x383ba0[_0x121849(0x230)](/(?:BASE-PICT|GALLERY)/i)){if(_0x121849(0x22c)!==_0x121849(0x22c))return this['_commonEventMenuNote'][_0x159984];else _0x57c554=_0x21b150['width'];}else _0x383ba0[_0x121849(0x230)](/(?:WIDE-LIST|FULL-SCREEN|SIDE-SUB|TALL)/i)&&(_0x57c554=0x0);}}if(_0x383ba0[_0x121849(0x230)](/(?:GALLERY)/i)){if(_0x121849(0x2ac)===_0x121849(0x2ac)){_0x4f5853-=this[_0x121849(0x1f6)](0x2),_0x383ba0[_0x121849(0x230)](/(\d+)-ROW-LIST/i);const _0x3ea3a3=Number(RegExp['$1'])||0x0;_0x4f5853-=this[_0x121849(0x1f6)](_0x3ea3a3,!![]);if(_0x383ba0[_0x121849(0x230)](/(?:NO-SUB)/i))_0x4f5853-=0x0;else _0x383ba0['match'](/(?:THICK-SUB)/i)?_0x4f5853-=this[_0x121849(0x1f6)](0x4):_0x121849(0x21b)!=='INSqC'?_0x3ce3de+=_0x18e08e?_0x24b18c[_0x121849(0x260)]-_0x232a76:0x0:_0x4f5853-=this[_0x121849(0x1f6)](0x2);}else _0x2162f4+=this[_0x121849(0x1f6)](0x2);}else{if(_0x383ba0['match'](/(?:LITE-LIST)/i))_0x121849(0x25d)!=='vmeoT'?this[_0x121849(0x2aa)](...arguments):_0x4f5853-=this['calcWindowHeight'](0x2)+this[_0x121849(0x1f6)](0x4,!![]);else{if(_0x383ba0[_0x121849(0x230)](/(?:NO-SUB|SUB-CORNER-LIST|FIRM-LIST)/i))_0x4f5853-=this[_0x121849(0x1f6)](0x2);else{if(_0x383ba0[_0x121849(0x230)](/(?:BASE-PICT)/i))_0x4f5853=this['calcWindowHeight'](0x4);else{if(_0x383ba0['match'](/(?:THICK-SUB)/i))_0x121849(0x1e4)===_0x121849(0x268)?(_0x5685e8[_0x121849(0x1de)][_0x121849(0x261)]['call'](this),this[_0x121849(0x202)]()):_0x4f5853-=this[_0x121849(0x1f6)](0x2)+this[_0x121849(0x1f6)](0x4);else{if(_0x383ba0['match'](/(?:FULL-SCREEN|SIDE-SUB)/i))_0x4f5853=0x0;else{if(_0x121849(0x285)!==_0x121849(0x285)){if(!_0x3e6f94[_0x121849(0x1cc)](_0x319f63))return!![];}else _0x4f5853-=this[_0x121849(0x1f6)](0x2)*0x2;}}}}}}_0x383ba0[_0x121849(0x230)](/(?:BASE-PICT|LITE-LIST)/i)?_0x383ba0[_0x121849(0x230)](/(?:MIRROR)/i)?_0x46b382+=_0xa0ea23?0x0:_0x21b150['width']-_0x57c554:_0x46b382+=_0xa0ea23?_0x21b150['width']-_0x57c554:0x0:_0x383ba0['match'](/(?:MIRROR)/i)?'ESQzM'!==_0x121849(0x265)?_0x348ea5[_0x121849(0x230)](/(?:MIRROR)/i)?_0x18bb14+=_0xfe6941?0x0:_0x5f2094[_0x121849(0x260)]-_0x243181:_0x10f6ca+=_0x22b927?_0x357ca2[_0x121849(0x260)]-_0x16b1ad:0x0:_0x46b382+=_0xa0ea23?_0x21b150[_0x121849(0x260)]-_0x57c554:0x0:'uLXtE'===_0x121849(0x26e)?_0x46b382+=_0xa0ea23?0x0:_0x21b150[_0x121849(0x260)]-_0x57c554:this[_0x121849(0x2da)][_0x121849(0x2ee)]=!![];if(_0x383ba0[_0x121849(0x230)](/(?:NO-SUB|SUB-CORNER-LIST|FIRM-LIST)/i)){if(_0x383ba0[_0x121849(0x230)](/(?:INVERSE)/i))_0x121849(0x2d5)!==_0x121849(0x27b)?_0x37ddb5+=_0x3f16b7?this[_0x121849(0x1f6)](0x2):0x0:_0x4ab432=0x30;else{if(_0x121849(0x2e0)===_0x121849(0x2e0))_0x37ddb5+=_0x3f16b7?0x0:this['calcWindowHeight'](0x2);else{if(_0x449efa[_0x121849(0x1cc)](_0x2ddd7a))return![];}}}else{if(_0x383ba0['match'](/(?:BASE-PICT|LITE-LIST)/i))_0x121849(0x221)===_0x121849(0x221)?_0x383ba0['match'](/(?:INVERSE)/i)?_0x37ddb5+=_0x3f16b7?_0x21b150['height']-_0x4f5853:0x0:_0x37ddb5+=_0x3f16b7?0x0:_0x21b150[_0x121849(0x262)]-_0x4f5853:_0x3e4039+=_0x12b43a?_0x147d19[_0x121849(0x260)]-_0x40c7b9:0x0;else{if(_0x383ba0[_0x121849(0x230)](/(?:THICK-SUB)/i)){if('paYza'===_0x121849(0x21d))_0x383ba0[_0x121849(0x230)](/(?:INVERSE)/i)?_0x37ddb5+=this['calcWindowHeight'](_0x3f16b7?0x2:0x4):'mpyZA'!=='mpyZA'?_0x52993c+=this['calcWindowHeight'](_0x4462fb?0x2:0x4):_0x37ddb5+=this[_0x121849(0x1f6)](_0x3f16b7?0x4:0x2);else{for(const _0x567029 of this['_commonEventMenuLayer'][_0x121849(0x209)]){if(_0x567029&&_0x567029[_0x121849(0x1e7)])_0x567029[_0x121849(0x1e7)]();}_0x2205dd(this[_0x121849(0x23b)][_0x121849(0x2f1)](this),0xc8);}}else _0x37ddb5+=this[_0x121849(0x1f6)](0x2);}}return $gameTemp[_0x121849(0x2c2)]&&console[_0x121849(0x26b)]('Pict\x20Window:',_0x46b382,_0x37ddb5,_0x57c554,_0x4f5853),this[_0x121849(0x1c8)](_0x46b382,_0x37ddb5,_0x57c554,_0x4f5853);},Scene_Base[_0x733a56(0x2dc)]['createCommonEventMenuHelpWindow']=function(_0x52abb3){const _0x32d2fc=_0x733a56,_0x318522=this[_0x32d2fc(0x212)](_0x52abb3),_0x1cde41=new Window_Help(_0x318522);_0x1cde41[_0x32d2fc(0x2a4)]=0x0,this[_0x32d2fc(0x1bb)](_0x1cde41),this[_0x32d2fc(0x1e0)]['helpWindow']=_0x1cde41;},Scene_Base['prototype']['commonEventMenuHelpWindowRect']=function(_0x2c7bc0){const _0x296932=_0x733a56,_0x5b6263=_0x2c7bc0[_0x296932(0x250)],_0x21a312=this[_0x296932(0x1b3)](),_0x142aba=this[_0x296932(0x1ea)]();if(_0x5b6263===_0x296932(0x1ba))return _0x2c7bc0[_0x296932(0x27c)][_0x296932(0x1f7)][_0x296932(0x236)](this);const _0x1f604c=this[_0x296932(0x264)](_0x2c7bc0);let _0x4d0598=_0x1f604c['x'],_0xd278b2=_0x1f604c['y'],_0xdd1dd0=_0x1f604c[_0x296932(0x260)],_0x5e573e=this[_0x296932(0x1f6)](0x2);if(_0x5b6263['match'](/(?:NO-HELP|FULL-SCREEN)/i))_0xdd1dd0=0x0;else _0x5b6263[_0x296932(0x230)](/(?:TALL)/i)&&(_0xdd1dd0=Math['ceil'](_0x1f604c[_0x296932(0x260)]/0x2));return _0x5b6263[_0x296932(0x230)](/(?:NO-HELP|FULL-SCREEN)/i)&&(_0x5e573e=0x0),_0x5b6263[_0x296932(0x230)](/(?:MIRROR)/i)?_0x296932(0x2c8)===_0x296932(0x2c8)?_0x4d0598+=_0x21a312?0x0:_0x1f604c[_0x296932(0x260)]-_0xdd1dd0:_0x496422=_0x370b05[_0x296932(0x24a)](_0x458fb8[_0x296932(0x260)]/0x2):_0x296932(0x289)!==_0x296932(0x225)?_0x4d0598+=_0x21a312?_0x1f604c[_0x296932(0x260)]-_0xdd1dd0:0x0:_0x41aa2c=_0x335806[_0x296932(0x260)],_0x5b6263['match'](/(?:INVERSE)/i)?_0xd278b2+=_0x142aba?0x0:_0x1f604c[_0x296932(0x262)]-_0x5e573e:_0x296932(0x29c)===_0x296932(0x2b1)?(_0x1aa1ae=_0xb4eef9['height'],_0x4db56d-=this[_0x296932(0x1f6)](0x2),_0x48a199[_0x296932(0x230)](/(?:FIRM-LIST)/i)&&(_0x9c55be-=this[_0x296932(0x1f6)](0x4,!![]))):_0xd278b2+=_0x142aba?_0x1f604c[_0x296932(0x262)]-_0x5e573e:0x0,$gameTemp[_0x296932(0x2c2)]&&console[_0x296932(0x26b)]('Help\x20Window:',_0x4d0598,_0xd278b2,_0xdd1dd0,_0x5e573e),this[_0x296932(0x1c8)](_0x4d0598,_0xd278b2,_0xdd1dd0,_0x5e573e);},Scene_Base[_0x733a56(0x2dc)][_0x733a56(0x235)]=function(_0x1b3a57){const _0x4f14f6=_0x733a56,_0x4562c7=this[_0x4f14f6(0x1fc)](_0x1b3a57),_0x2680b9=new Window_Help(_0x4562c7);_0x2680b9[_0x4f14f6(0x2a4)]=0x0,this[_0x4f14f6(0x1bb)](_0x2680b9),this[_0x4f14f6(0x1e0)][_0x4f14f6(0x28d)]=_0x2680b9;},Scene_Base[_0x733a56(0x2dc)][_0x733a56(0x1fc)]=function(_0x503b94){const _0x35fa52=_0x733a56,_0x1d20c4=_0x503b94[_0x35fa52(0x250)],_0x1b765c=this[_0x35fa52(0x1b3)](),_0xb5128c=this[_0x35fa52(0x1ea)]();if(_0x1d20c4===_0x35fa52(0x1ba)){if('IRHap'===_0x35fa52(0x1d5)){let _0x83d82d=0x0;this[_0x35fa52(0x2be)][_0x35fa52(0x226)]()[_0x35fa52(0x1ab)]()===_0x35fa52(0x219)?_0x83d82d=_0x929415['getLastPickedCommonEventMenuID']():_0x83d82d=_0x21befd(this[_0x35fa52(0x2be)]);const _0x4bdd61=_0x31b357[_0x35fa52(0x1b5)](0x0,this[_0x35fa52(0x1c1)](_0x83d82d));this[_0x35fa52(0x2a0)](_0x4bdd61);}else return _0x503b94[_0x35fa52(0x27c)][_0x35fa52(0x231)]['call'](this);}const _0x4f1331=this[_0x35fa52(0x264)](_0x503b94);let _0x516da8=_0x4f1331['x'],_0x1d8e96=_0x4f1331['y'],_0xf36e85=_0x4f1331['width'],_0x470529=this[_0x35fa52(0x1f6)](0x2);if(_0x1d20c4[_0x35fa52(0x230)](/(?:FIRM-LIST)/i))_0xf36e85=Math['ceil'](_0x4f1331[_0x35fa52(0x260)]/0x2);else{if(_0x1d20c4[_0x35fa52(0x230)](/(?:SIDE-SUB)/i))_0xf36e85=Math[_0x35fa52(0x1d3)](_0x4f1331[_0x35fa52(0x260)]/0x2);else{if(_0x1d20c4[_0x35fa52(0x230)](/(?:SUB-CORNER|TALL)/i)){if(_0x35fa52(0x237)===_0x35fa52(0x258))this[_0x35fa52(0x2da)]['x']=0x0;else{if(_0x1d20c4[_0x35fa52(0x230)](/(?:SUB-CORNER-LIST|TALL)/i))_0x35fa52(0x286)==='OBljg'?this[_0x35fa52(0x2da)]['visible']=![]:_0xf36e85=Math[_0x35fa52(0x24a)](_0x4f1331['width']/0x2);else{if(_0x1d20c4['match'](/(?:SUB-CORNER-PICT)/i)){if(_0x35fa52(0x1e5)===_0x35fa52(0x1e5))_0xf36e85=Math['floor'](_0x4f1331[_0x35fa52(0x260)]/0x2);else{if(!this[_0x35fa52(0x257)]())return;this[_0x35fa52(0x25c)]=new _0x37c959(),this['addChild'](this[_0x35fa52(0x25c)]);}}}}}else _0x1d20c4[_0x35fa52(0x230)](/(?:NO-SUB|FULL-SCREEN|BASE-PICT)/i)&&(_0xf36e85=0x0);}}if(_0x1d20c4[_0x35fa52(0x230)](/(?:SIDE-SUB)/i))'BwKJx'!==_0x35fa52(0x246)?_0x5dc5e0=_0x24e510[_0x35fa52(0x1d3)](_0x26565e[_0x35fa52(0x260)]/0x2):(_0x470529=_0x4f1331['height'],_0x470529-=this['calcWindowHeight'](0x2),_0x1d20c4['match'](/(?:FIRM-LIST)/i)&&(_0x470529-=this['calcWindowHeight'](0x4,!![])));else{if(_0x1d20c4[_0x35fa52(0x230)](/(?:THICK-SUB)/i)){if('lvAVy'==='QnpNI'){if(this[_0x35fa52(0x2da)]&&this['_cancelButton']['isPressed']())return-0x1;return _0x2ac68f[_0x35fa52(0x2dc)][_0x35fa52(0x21c)]['call'](this);}else _0x470529=this[_0x35fa52(0x1f6)](0x4);}else{if(_0x1d20c4[_0x35fa52(0x230)](/(?:NO-SUB|FULL-SCREEN|BASE-PICT)/i)){if(_0x35fa52(0x1db)===_0x35fa52(0x1ed)){const _0x29f0a8=this['commonEventMenuHelpWindowRect'](_0x51a419),_0x12066d=new _0xa7d07a(_0x29f0a8);_0x12066d[_0x35fa52(0x2a4)]=0x0,this['addCommonEventMenuWindow'](_0x12066d),this[_0x35fa52(0x1e0)][_0x35fa52(0x1d4)]=_0x12066d;}else _0x470529=0x0;}}}if(_0x1d20c4[_0x35fa52(0x230)](/(?:SIDE-SUB)/i)&&!_0x1d20c4[_0x35fa52(0x230)](/(?:FIRM-LIST)/i)){if(_0x1d20c4[_0x35fa52(0x230)](/(?:MIRROR)/i)){if(_0x35fa52(0x2d4)===_0x35fa52(0x273)){this['_commonEventMenuName']=this[_0x35fa52(0x1f9)]||[];if(this['_commonEventMenuName'][_0x4cf2f1]!==_0x2ed891)return this['_commonEventMenuName'][_0x27b3d5];}else _0x516da8+=_0x1b765c?_0x4f1331[_0x35fa52(0x260)]-_0xf36e85:0x0;}else _0x35fa52(0x234)==='KXGRo'?_0x516da8+=_0x1b765c?0x0:_0x4f1331[_0x35fa52(0x260)]-_0xf36e85:[0x6c,0x198][_0x35fa52(0x1ae)](_0x218523[_0x35fa52(0x2af)])&&(_0x7b5ebf+=_0x3e820f['parameters'][0x0]+'\x0a');}else{if(_0x1d20c4[_0x35fa52(0x230)](/(?:SUB-CORNER-LIST|FIRM-LIST|TALL)/i))_0x35fa52(0x2e4)==='oBfOf'?_0x4fb91a=_0x4fd465[_0x35fa52(0x24a)](_0xf92ff8/0x2):_0x1d20c4[_0x35fa52(0x230)](/(?:MIRROR)/i)?_0x516da8+=_0x1b765c?0x0:_0x4f1331[_0x35fa52(0x260)]-_0xf36e85:_0x35fa52(0x2e3)===_0x35fa52(0x2eb)?_0x2ed450+=_0x4a547a?this[_0x35fa52(0x1f6)](0x2):0x0:_0x516da8+=_0x1b765c?_0x4f1331[_0x35fa52(0x260)]-_0xf36e85:0x0;else _0x1d20c4[_0x35fa52(0x230)](/(?:SUB-CORNER-PICT)/i)&&(_0x1d20c4[_0x35fa52(0x230)](/(?:MIRROR)/i)?_0x516da8+=_0x1b765c?_0x4f1331['width']-_0xf36e85:0x0:_0x516da8+=_0x1b765c?0x0:_0x4f1331[_0x35fa52(0x260)]-_0xf36e85);}return _0x1d20c4['match'](/(?:SIDE-SUB)/i)&&!_0x1d20c4['match'](/(?:FIRM-LIST)/i)?'sQQdS'!==_0x35fa52(0x1fb)?(this[_0x35fa52(0x2b6)]=this['_settings'][_0x35fa52(0x2ca)][_0x35fa52(0x1bd)]??'center',this[_0x35fa52(0x1b2)]=this[_0x35fa52(0x2db)][_0x35fa52(0x2ca)][_0x35fa52(0x2a9)]??_0x35fa52(0x1c0),this[_0x35fa52(0x1f8)]=this[_0x35fa52(0x2db)][_0x35fa52(0x2ca)][_0x35fa52(0x1ce)]??!![]):_0x1d20c4[_0x35fa52(0x230)](/(?:INVERSE)/i)?_0x1d8e96+=_0xb5128c?this[_0x35fa52(0x1f6)](0x2):0x0:_0x1d8e96+=_0xb5128c?0x0:this[_0x35fa52(0x1f6)](0x2):_0x35fa52(0x1a9)!==_0x35fa52(0x1c9)?_0x1d20c4[_0x35fa52(0x230)](/(?:INVERSE)/i)?_0x1d8e96+=_0xb5128c?_0x4f1331['height']-_0x470529:0x0:_0x1d8e96+=_0xb5128c?0x0:_0x4f1331[_0x35fa52(0x262)]-_0x470529:_0x5f16a2=this[_0x35fa52(0x1f6)](0x4),$gameTemp[_0x35fa52(0x2c2)]&&console[_0x35fa52(0x26b)](_0x35fa52(0x2e8),_0x516da8,_0x1d8e96,_0xf36e85,_0x470529),this[_0x35fa52(0x1c8)](_0x516da8,_0x1d8e96,_0xf36e85,_0x470529);},Scene_Base[_0x733a56(0x2dc)][_0x733a56(0x2f5)]=function(_0x59b61b){const _0x3100da=_0x733a56;if(_0x59b61b[_0x3100da(0x250)]!==_0x3100da(0x1ba))return;for(let _0x29847e=0x1;_0x29847e<=0xa;_0x29847e++){_0x3100da(0x1d7)===_0x3100da(0x1eb)?this[_0x3100da(0x252)](_0x16712d,_0x370123):this[_0x3100da(0x252)](_0x59b61b,_0x29847e);}},Scene_Base[_0x733a56(0x2dc)]['createCommonEventMenuExtraWindow']=function(_0x1a8fa0,_0x2dbb36){const _0x15769a=_0x733a56;if(!_0x1a8fa0['CustomLayout']['Extra_Window_%1_JS'['format'](_0x2dbb36)])return;const _0xc6f52=_0x1a8fa0['CustomLayout']['Extra_Window_%1_JS'[_0x15769a(0x256)](_0x2dbb36)]['call'](this),_0x2e68dc=new Window_Help(_0xc6f52);_0x2e68dc[_0x15769a(0x2a4)]=0x0,this[_0x15769a(0x1bb)](_0x2e68dc),this[_0x15769a(0x1e0)][_0x15769a(0x2d6)[_0x15769a(0x256)](_0x2dbb36)]=_0x2e68dc;},Scene_Base[_0x733a56(0x2dc)][_0x733a56(0x1a8)]=function(_0x55adcd,_0x482a73){const _0x43accb=_0x733a56,_0xae228d=this['commonEventMenuListWindowRect'](_0x55adcd),_0x2bf993=new Window_CommonEventMenuList(_0x55adcd,_0x482a73,_0xae228d);_0x2bf993[_0x43accb(0x2a4)]=0x0,this['addCommonEventMenuWindow'](_0x2bf993),this[_0x43accb(0x1e0)]['listWindow']=_0x2bf993,_0x2bf993[_0x43accb(0x223)](_0x43accb(0x269),this['onCommonEventMenuOk'][_0x43accb(0x2f1)](this)),_0x55adcd[_0x43accb(0x2d7)]&&$dataCommonEvents[_0x55adcd[_0x43accb(0x2d7)]]&&_0x2bf993[_0x43accb(0x223)]('cancel',this['onCommonEventMenuCancel']['bind'](this));},Scene_Base[_0x733a56(0x2dc)][_0x733a56(0x2cf)]=function(_0x348da6){const _0x321955=_0x733a56,_0x502e70=_0x348da6[_0x321955(0x250)],_0x3449a8=this['isRightInputMode'](),_0x5a90be=this[_0x321955(0x1ea)]();if(_0x502e70===_0x321955(0x1ba))return _0x348da6[_0x321955(0x27c)][_0x321955(0x1ee)][_0x321955(0x236)](this);const _0x42682b=this[_0x321955(0x264)](_0x348da6);let _0x539dd9=_0x42682b['x'],_0x33262a=_0x42682b['y'],_0x1e8090=_0x42682b[_0x321955(0x260)],_0x724f9e=_0x42682b[_0x321955(0x262)];_0x502e70[_0x321955(0x230)](/(?:STANDARD|SIDE-SUB|TALL)/i)&&(_0x1e8090=Math['ceil'](_0x42682b['width']/0x2));if(_0x502e70[_0x321955(0x230)](/(?:GALLERY)/i)){_0x502e70['match'](/(\d+)-ROW-LIST/i);const _0x225484=Number(RegExp['$1'])||0x1;_0x724f9e=this[_0x321955(0x1f6)](_0x225484,!![]);}else{if(_0x502e70[_0x321955(0x230)](/(?:LITE-LIST|FIRM-LIST)/i))_0x321955(0x22e)==='xFbMA'?_0x495953+=_0x1d3f18?_0xe50e3a[_0x321955(0x260)]-_0x446383:0x0:_0x724f9e=this[_0x321955(0x1f6)](0x4,!![]);else{if(_0x502e70[_0x321955(0x230)](/(?:HALF-BASE-PICT)/i))_0x724f9e-=this[_0x321955(0x1f6)](0x2)+this[_0x321955(0x1f6)](0x4);else{if(_0x502e70[_0x321955(0x230)](/(?:NO-SUB|SUB-CORNER-PICT|SIDE-SUB)/i))_0x724f9e-=this[_0x321955(0x1f6)](0x2);else{if(_0x502e70[_0x321955(0x230)](/(?:THICK-SUB|BASE-PICT)/i))_0x724f9e-=this[_0x321955(0x1f6)](0x2)+this[_0x321955(0x1f6)](0x4);else _0x502e70[_0x321955(0x230)](/(?:FULL-SCREEN)/i)?_0x724f9e=_0x42682b[_0x321955(0x262)]:_0x724f9e-=this['calcWindowHeight'](0x2)*0x2;}}}}_0x502e70[_0x321955(0x230)](/(?:MIRROR)/i)?'HpEXI'===_0x321955(0x2ce)?_0x539dd9+=_0x3449a8?0x0:_0x42682b[_0x321955(0x260)]-_0x1e8090:_0xbebfd2=_0x487fd3['y']:_0x321955(0x24b)!==_0x321955(0x227)?_0x539dd9+=_0x3449a8?_0x42682b[_0x321955(0x260)]-_0x1e8090:0x0:_0x10fb73+=_0x302ee8?_0x17d8cb['height']-_0x27ddd9:0x0;if(_0x502e70['match'](/(?:GALLERY)/i)){const _0x125276=this[_0x321955(0x1f6)](0x2);let _0x2d32de=this[_0x321955(0x1f6)](0x2);if(_0x502e70[_0x321955(0x230)](/(?:NO-SUB)/i))_0x2d32de=0x0;else _0x502e70['match'](/(?:THICK-SUB)/i)&&(_0x321955(0x1ec)==='sezmt'?_0x2d32de=this[_0x321955(0x1f6)](0x4):_0x1520ab=_0x1e87bc[_0x321955(0x2e2)]);_0x33262a+=_0x42682b[_0x321955(0x262)]-_0x724f9e;if(_0x502e70[_0x321955(0x230)](/(?:INVERSE)/i)){if('jwHMY'!==_0x321955(0x287))return this[_0x321955(0x1b7)]&&this[_0x321955(0x1b7)]['constructor']===_0x17ef14;else _0x33262a-=_0x5a90be?_0x2d32de:_0x125276;}else{if(_0x321955(0x2c0)===_0x321955(0x2c0))_0x33262a-=_0x5a90be?_0x125276:_0x2d32de;else{this[_0x321955(0x228)]=this[_0x321955(0x228)]||[];if(this[_0x321955(0x228)][_0x29664a]!==_0x4d27fa)return this[_0x321955(0x228)][_0x32f0f1];}}}else{if(_0x502e70[_0x321955(0x230)](/(?:LITE-LIST|FIRM-LIST)/i)){if('dckjM'!==_0x321955(0x1e9)){const _0x31e842=this['calcWindowHeight'](0x2),_0x382e8d=_0x42682b[_0x321955(0x262)]-_0x31e842-_0x724f9e;_0x502e70[_0x321955(0x230)](/(?:INVERSE)/i)?_0x321955(0x2a3)!==_0x321955(0x2a3)?_0x4e493a+=_0x110241?0x0:_0x5bcbe9['width']-_0x4688ea:_0x33262a+=_0x5a90be?_0x31e842:_0x382e8d:_0x33262a+=_0x5a90be?_0x382e8d:_0x31e842;}else{if(!_0x249c1b['value'](_0x147a43))return![];}}else{if(_0x502e70['match'](/(?:HALF-BASE-PICT)/i)){if(_0x502e70['match'](/(?:INVERSE)/i)){if(_0x321955(0x238)===_0x321955(0x238))_0x33262a+=this[_0x321955(0x1f6)](_0x5a90be?0x2:0x4);else{this[_0x321955(0x1e2)]=this[_0x321955(0x1e2)]||[],this[_0x321955(0x1e2)][_0x4e4c38]=this['_commonEventMenuDesc'][_0x33ad1f]||{};if(this[_0x321955(0x1e2)][_0xcfa4f4][_0x2997a4]!==_0x446c82)return this['_commonEventMenuDesc'][_0x3b7d9f][_0x59c921];const _0x4caa3c=_0x4bfdcf[_0x25dcfa];if(!_0x4caa3c)return'';let _0x52c1d3='';const _0x4dc5c5=_0x12556e[_0x321955(0x1de)]['RegExp'],_0x42694d=_0x3d8bed[_0x321955(0x1d8)](_0xa122c1);return _0x42694d['match'](_0x4dc5c5[_0x46c471])&&(_0x52c1d3=_0x150cc5(_0x66e2a0['$1'])[_0x321955(0x1ab)]()),this[_0x321955(0x1e2)][_0x256d2e][_0x5edf58]=_0x52c1d3,this['_commonEventMenuDesc'][_0x2a4ca8][_0x323328];}}else _0x321955(0x27f)===_0x321955(0x27f)?_0x33262a+=this[_0x321955(0x1f6)](_0x5a90be?0x4:0x2):_0x595266-=this[_0x321955(0x1f6)](0x2)+this[_0x321955(0x1f6)](0x4);}else{if(_0x502e70[_0x321955(0x230)](/(?:NO-SUB|SUB-CORNER-PICT|SIDE-SUB)/i))_0x502e70[_0x321955(0x230)](/(?:INVERSE)/i)?_0x33262a+=_0x5a90be?this[_0x321955(0x1f6)](0x2):0x0:_0x33262a+=_0x5a90be?0x0:this[_0x321955(0x1f6)](0x2);else{if(_0x502e70[_0x321955(0x230)](/(?:THICK-SUB|BASE-PICT)/i))'wecXk'!==_0x321955(0x253)?_0x1cc294=0x10:_0x502e70['match'](/(?:INVERSE)/i)?_0x33262a+=this[_0x321955(0x1f6)](_0x5a90be?0x2:0x4):_0x33262a+=this['calcWindowHeight'](_0x5a90be?0x4:0x2);else _0x502e70[_0x321955(0x230)](/(?:FULL-SCREEN)/i)?'HSlAj'===_0x321955(0x1ac)?_0x3c891e=_0x3fc89a(_0x34cd03['$1']):_0x33262a=_0x42682b['y']:_0x33262a+=this[_0x321955(0x1f6)](0x2);}}}}if($gameTemp['_commonEventMenu_ShowDimensions']){if(_0x321955(0x278)===_0x321955(0x2e6))return _0x5d703d['CustomLayout'][_0x321955(0x231)][_0x321955(0x236)](this);else console[_0x321955(0x26b)](_0x321955(0x26c),_0x539dd9,_0x33262a,_0x1e8090,_0x724f9e);}return this[_0x321955(0x1c8)](_0x539dd9,_0x33262a,_0x1e8090,_0x724f9e);},Scene_Base[_0x733a56(0x2dc)]['registerCommonEventMenuAidWindows']=function(){const _0x12549d=_0x733a56,_0x4b4536=this[_0x12549d(0x1e0)][_0x12549d(0x2d0)];for(const _0x3727bc in this['_commonEventMenuWindows']){if(_0x12549d(0x2d9)!=='HJgXL'){if(_0x3670c5[_0x12549d(0x1cc)](_0x4ed3cb))return!![];}else{if(_0x3727bc===_0x12549d(0x2d0))continue;_0x4b4536[_0x12549d(0x1e8)](this[_0x12549d(0x1e0)][_0x3727bc],_0x3727bc);}}_0x4b4536[_0x12549d(0x1e6)]();},Scene_Base[_0x733a56(0x2dc)]['onCommonEventMenuOk']=function(){const _0x5a4537=_0x733a56,_0x48c395=this[_0x5a4537(0x1e0)]['listWindow'],_0x11efac=_0x48c395['currentExt']();$gameSystem[_0x5a4537(0x292)](_0x11efac),this['launchCommonEventMenu'](_0x11efac);},Scene_Base['prototype']['onCommonEventMenuCancel']=function(){const _0x23e7f8=_0x733a56,_0x17b83c=this[_0x23e7f8(0x1e0)]['listWindow'],_0x17ecca=_0x17b83c['_settings']['CancelEvent'];this[_0x23e7f8(0x24d)](_0x17ecca);},Scene_Base[_0x733a56(0x2dc)][_0x733a56(0x24d)]=function(_0x2900ab){const _0x39d32e=_0x733a56,_0x126a83=this[_0x39d32e(0x1e0)][_0x39d32e(0x2d0)],_0x46038b=$dataCommonEvents[_0x2900ab],_0x4946c3=_0x126a83['_interpreter'];_0x4946c3[_0x39d32e(0x28e)](_0x46038b[_0x39d32e(0x2d1)],_0x4946c3[_0x39d32e(0x291)]()),this[_0x39d32e(0x274)]();},Scene_Base['prototype'][_0x733a56(0x274)]=function(){const _0x449301=_0x733a56;for(const _0x5abebf of this['_commonEventMenuLayer'][_0x449301(0x209)]){if(_0x5abebf&&_0x5abebf['close'])_0x5abebf[_0x449301(0x1e7)]();}setTimeout(this[_0x449301(0x23b)][_0x449301(0x2f1)](this),0xc8);},Scene_Base[_0x733a56(0x2dc)][_0x733a56(0x23b)]=function(){const _0x2d7f62=_0x733a56;this[_0x2d7f62(0x1e0)]={};while(this[_0x2d7f62(0x25c)]['children'][_0x2d7f62(0x255)]>0x0){'fiWPO'===_0x2d7f62(0x25a)?_0x2fa13e-=this['calcWindowHeight'](0x4):this[_0x2d7f62(0x25c)][_0x2d7f62(0x209)][_0x2d7f62(0x2b7)]();}this[_0x2d7f62(0x240)]=!![];};function Window_CommonEventMenuPicture(){const _0x22e520=_0x733a56;this[_0x22e520(0x2aa)](...arguments);}Window_CommonEventMenuPicture['prototype']=Object[_0x733a56(0x1b9)](Window_Base[_0x733a56(0x2dc)]),Window_CommonEventMenuPicture['prototype'][_0x733a56(0x2ba)]=Window_CommonEventMenuPicture,Window_CommonEventMenuPicture[_0x733a56(0x2dc)]['initialize']=function(_0x35f32a,_0x20937e){const _0xa0b909=_0x733a56;this[_0xa0b909(0x2db)]=_0x35f32a,this[_0xa0b909(0x2ab)]='',Window_Base[_0xa0b909(0x2dc)][_0xa0b909(0x2aa)][_0xa0b909(0x236)](this,_0x20937e),this[_0xa0b909(0x2f9)]();},Window_CommonEventMenuPicture[_0x733a56(0x2dc)][_0x733a56(0x2f9)]=function(){const _0x1aeab5=_0x733a56;this[_0x1aeab5(0x2b6)]=this[_0x1aeab5(0x2db)][_0x1aeab5(0x2ca)][_0x1aeab5(0x1bd)]??_0x1aeab5(0x282),this[_0x1aeab5(0x1b2)]=this[_0x1aeab5(0x2db)][_0x1aeab5(0x2ca)]['PictureAnchorY']??_0x1aeab5(0x1c0),this['_autoFit']=this[_0x1aeab5(0x2db)][_0x1aeab5(0x2ca)][_0x1aeab5(0x1ce)]??!![];},Window_CommonEventMenuPicture[_0x733a56(0x2dc)][_0x733a56(0x1f0)]=function(_0xc99e3c){const _0x275954=_0x733a56;_0xc99e3c=_0xc99e3c[_0x275954(0x1ab)]();if(this[_0x275954(0x2ab)]===_0xc99e3c)return;this['_filename']=_0xc99e3c;if(_0xc99e3c==='')this[_0x275954(0x2ea)][_0x275954(0x27d)]();else{const _0x2fc506=ImageManager[_0x275954(0x2f3)](_0xc99e3c);_0x2fc506['addLoadListener'](this['drawPicture'][_0x275954(0x2f1)](this,_0xc99e3c,_0x2fc506));}},Window_CommonEventMenuPicture[_0x733a56(0x2dc)][_0x733a56(0x1a6)]=function(_0x47c203,_0x6b6f39){const _0x5907e8=_0x733a56;if(this[_0x5907e8(0x2ab)]!==_0x47c203)return;if(this['innerWidth']<=0x0)return;this[_0x5907e8(0x2ea)][_0x5907e8(0x27d)]();const _0xb88347=_0x6b6f39[_0x5907e8(0x260)],_0x9c722b=_0x6b6f39[_0x5907e8(0x262)];let _0x33fd71=0x0,_0xe42b41=0x0,_0x329d92=_0xb88347,_0x14d611=_0x9c722b;if(this[_0x5907e8(0x1f8)]){if(_0x5907e8(0x2dd)!==_0x5907e8(0x1f2)){const _0x12ec27=this[_0x5907e8(0x1aa)]/_0xb88347,_0x3cc4e9=this['innerHeight']/_0x9c722b,_0x5da328=Math[_0x5907e8(0x21e)](_0x12ec27,_0x3cc4e9,0x1);_0x329d92=Math[_0x5907e8(0x2fd)](_0x5da328*_0x329d92),_0x14d611=Math[_0x5907e8(0x2fd)](_0x5da328*_0x14d611);}else _0x3a7a8b[_0x5907e8(0x230)](/(?:INVERSE)/i)?_0x41c122+=_0x31560e?this[_0x5907e8(0x1f6)](0x2):0x0:_0x54f530+=_0x53082e?0x0:this[_0x5907e8(0x1f6)](0x2);}if(this['_anchorX']===_0x5907e8(0x1e3)){if('pvUUO'===_0x5907e8(0x1d1)){const _0x41ebe6=this[_0x5907e8(0x28c)](_0x33e3ba),_0x4a10ee=this[_0x5907e8(0x26d)](_0x44a970),_0x330d75=this[_0x5907e8(0x20e)](_0x4a10ee)[_0x5907e8(0x260)];this[_0x5907e8(0x1d6)](this['isCommandEnabled'](_0x4b3195));const _0x2ecf11=this[_0x5907e8(0x1c2)]();if(_0x2ecf11===_0x5907e8(0x2f8))this[_0x5907e8(0x233)](_0x4a10ee,_0x41ebe6['x']+_0x41ebe6['width']-_0x330d75,_0x41ebe6['y'],_0x330d75);else{if(_0x2ecf11==='center'){const _0x18fa40=_0x41ebe6['x']+_0x298f2e[_0x5907e8(0x1d3)]((_0x41ebe6[_0x5907e8(0x260)]-_0x330d75)/0x2);this[_0x5907e8(0x233)](_0x4a10ee,_0x18fa40,_0x41ebe6['y'],_0x330d75);}else this[_0x5907e8(0x233)](_0x4a10ee,_0x41ebe6['x'],_0x41ebe6['y'],_0x330d75);}}else _0x33fd71=0x0;}else{if(this[_0x5907e8(0x2b6)]===_0x5907e8(0x282))_0x33fd71=Math[_0x5907e8(0x1b5)](0x0,Math[_0x5907e8(0x2fd)]((this[_0x5907e8(0x1aa)]-_0x329d92)/0x2));else this[_0x5907e8(0x2b6)]==='right'&&(_0x5907e8(0x248)===_0x5907e8(0x248)?_0x33fd71=this[_0x5907e8(0x1aa)]-_0x329d92:_0x59fd37=0x0);}if(this[_0x5907e8(0x1b2)]===_0x5907e8(0x2b3))_0xe42b41=0x0;else{if(this[_0x5907e8(0x1b2)]===_0x5907e8(0x1c0))_0xe42b41=Math['max'](0x0,Math['round']((this[_0x5907e8(0x229)]-_0x14d611)/0x2));else{if(this['_anchorY']===_0x5907e8(0x25f)){if(_0x5907e8(0x205)!==_0x5907e8(0x216))_0xe42b41=this[_0x5907e8(0x229)]-_0x14d611;else{if(!_0xe33b4a[_0x5907e8(0x1cc)](_0x4e8f92))return!![];}}}}this['contents'][_0x5907e8(0x2a6)](_0x6b6f39,0x0,0x0,_0xb88347,_0x9c722b,_0x33fd71,_0xe42b41,_0x329d92,_0x14d611);};function Window_CommonEventMenuList(){const _0x30cd65=_0x733a56;this[_0x30cd65(0x2aa)](...arguments);}Window_CommonEventMenuList['prototype']=Object['create'](Window_Command[_0x733a56(0x2dc)]),Window_CommonEventMenuList['prototype'][_0x733a56(0x2ba)]=Window_CommonEventMenuList,Window_CommonEventMenuList[_0x733a56(0x2dc)][_0x733a56(0x2aa)]=function(_0x33a8bb,_0x5625db,_0x1b5c09){const _0x24dec=_0x733a56;this[_0x24dec(0x2db)]=_0x33a8bb,this[_0x24dec(0x270)]=_0x5625db,this[_0x24dec(0x2f9)](_0x1b5c09),Window_Command[_0x24dec(0x2dc)][_0x24dec(0x2aa)][_0x24dec(0x236)](this,_0x1b5c09),this[_0x24dec(0x2ec)](),this['autoSelect']();},Window_CommonEventMenuList['prototype'][_0x733a56(0x2f9)]=function(_0x26f067){const _0xfb84e=_0x733a56;this[_0xfb84e(0x2bb)]=this[_0xfb84e(0x2db)][_0xfb84e(0x2ca)][_0xfb84e(0x1cd)]??_0xfb84e(0x294),this[_0xfb84e(0x2bb)]===_0xfb84e(0x294)?_0xfb84e(0x1cb)!==_0xfb84e(0x29d)?this[_0xfb84e(0x2bb)]=_0x26f067[_0xfb84e(0x260)]>=Graphics[_0xfb84e(0x260)]*0x2/0x3?0x2:0x1:_0x48ca55=0x0:this[_0xfb84e(0x2bb)]=eval(this[_0xfb84e(0x2bb)])||0x1,this['_textAlign']=this[_0xfb84e(0x2db)][_0xfb84e(0x2ca)]['ListTextAlign']??_0xfb84e(0x1e3),this['_autoSelect']=this[_0xfb84e(0x2db)][_0xfb84e(0x2ca)]['AutoSelect']??'0';},Window_CommonEventMenuList[_0x733a56(0x2dc)][_0x733a56(0x2ec)]=function(){const _0x595181=_0x733a56;if(this[_0x595181(0x2db)]['CancelEvent']<=0x0)return;if(!$dataCommonEvents[this[_0x595181(0x2db)][_0x595181(0x2d7)]])return;if(!ConfigManager[_0x595181(0x1a5)])return;if(this['_settings']['Optional'][_0x595181(0x2d7)]===![])return;this['_cancelButton']=new Sprite_Button(_0x595181(0x1ca)),this[_0x595181(0x2da)][_0x595181(0x2ee)]=![],this[_0x595181(0x25b)](this['_cancelButton']);const _0x274b6e=this[_0x595181(0x2db)][_0x595181(0x2ca)]['CancelButtonScale']??0.8;this['_cancelButton'][_0x595181(0x1fa)]['x']=this[_0x595181(0x2da)]['scale']['y']=_0x274b6e;const _0xa9a41e=this[_0x595181(0x2da)][_0x595181(0x260)]*_0x274b6e,_0x151f5d=this['_cancelButton'][_0x595181(0x262)]*_0x274b6e,_0x474012=(this[_0x595181(0x2db)][_0x595181(0x2ca)][_0x595181(0x1c5)]??_0x595181(0x2ae))['toLowerCase']()[_0x595181(0x1ab)]();if(_0x474012['match'](/LEFT/i)){if(_0x595181(0x1d2)!==_0x595181(0x1d2)){const _0x51225f=this[_0x595181(0x1e0)]['listWindow'],_0x11c7c6=_0x417e9a[_0x5c86a9],_0x3a979a=_0x51225f[_0x595181(0x270)];_0x3a979a[_0x595181(0x28e)](_0x11c7c6['list'],_0x3a979a[_0x595181(0x291)]()),this[_0x595181(0x274)]();}else this['_cancelButton']['x']=0x0;}else{if(_0x474012[_0x595181(0x230)](/CENTER/i))_0x595181(0x295)!==_0x595181(0x295)?this[_0x595181(0x2ea)]['clear']():this[_0x595181(0x2da)]['x']=Math['round']((this[_0x595181(0x260)]-_0xa9a41e)/0x2);else{if(_0x474012[_0x595181(0x230)](/RIGHT/i)){if(_0x595181(0x241)!==_0x595181(0x1b8))this[_0x595181(0x2da)]['x']=this[_0x595181(0x260)]-_0xa9a41e;else{const _0x439173=_0x3fbffa(_0x500afc['$1']),_0x7bd09b=_0x595181(0x275)[_0x595181(0x256)](_0x22ec9f['id']),_0x5a10c7=_0x595181(0x279)[_0x595181(0x256)](_0x439173);_0x254ee5[_0x595181(0x1de)]['JS'][_0x7bd09b]=new _0x1e7a95(_0x5a10c7);}}}}if(_0x474012[_0x595181(0x230)](/UPPER/i))this[_0x595181(0x2da)]['y']=0x0;else{if(_0x474012['match'](/MIDDLE/i)){if(_0x595181(0x22a)===_0x595181(0x1c3)){const _0xf5bfd9=_0x2668fe[_0x595181(0x203)]('['+_0x32ad83['$1'][_0x595181(0x230)](/\d+/g)+']');for(const _0xc8449d of _0xf5bfd9){if(!_0x265180[_0x595181(0x1cc)](_0xc8449d))return!![];}return![];}else this[_0x595181(0x2da)]['y']=Math[_0x595181(0x2fd)]((this['height']-_0x151f5d)/0x2);}else _0x474012[_0x595181(0x230)](/BOTTOM/i)&&(this[_0x595181(0x2da)]['y']=this['height']-_0x151f5d);}this['_cancelButton']['x']+=this[_0x595181(0x2db)][_0x595181(0x2ca)][_0x595181(0x1ff)]??-0x12,this[_0x595181(0x2da)]['y']+=this['_settings'][_0x595181(0x2ca)][_0x595181(0x27a)]??0xf;},Window_CommonEventMenuList[_0x733a56(0x2dc)]['autoSelect']=function(){const _0xd688eb=_0x733a56;let _0x147246=0x0;if(this['_autoSelect']['toLowerCase']()[_0xd688eb(0x1ab)]()==='last'){if(_0xd688eb(0x213)===_0xd688eb(0x2d2)){const _0x3ffa08=_0x25b050(_0x4464d6['$1']);_0x3ffa08<_0x120e10?(_0x43ed6f(_0xd688eb(0x23a)[_0xd688eb(0x256)](_0x384f1d,_0x3ffa08,_0x1a922a)),_0x6c35e0[_0xd688eb(0x224)]()):_0x4289cb=_0xbaacff[_0xd688eb(0x1b5)](_0x3ffa08,_0x34b554);}else _0x147246=$gameSystem[_0xd688eb(0x2b8)]();}else _0x147246=eval(this[_0xd688eb(0x2be)]);const _0x391926=Math['max'](0x0,this[_0xd688eb(0x1c1)](_0x147246));this[_0xd688eb(0x2a0)](_0x391926);},Window_CommonEventMenuList[_0x733a56(0x2dc)][_0x733a56(0x21c)]=function(){const _0x1933b3=_0x733a56;if(this['_cancelButton']&&this[_0x1933b3(0x2da)][_0x1933b3(0x2d3)]()){if('jFfJN'!=='jFfJN'){const _0x3332a1=this[_0x1933b3(0x1e0)]['listWindow'],_0x354cf6=_0x3332a1[_0x1933b3(0x2df)]();_0x18f90f[_0x1933b3(0x292)](_0x354cf6),this[_0x1933b3(0x24d)](_0x354cf6);}else return-0x1;}return Window_Command['prototype']['hitIndex']['call'](this);},Window_CommonEventMenuList[_0x733a56(0x2dc)][_0x733a56(0x2f7)]=function(){const _0x28a5dd=_0x733a56;if(this['_opening']){if('fKbVu'!==_0x28a5dd(0x201))this[_0x28a5dd(0x2a4)]+=0x20,this[_0x28a5dd(0x284)]()&&('zKNdC'==='obSyr'?_0x2b5401+=_0x5048df?0x0:_0x3ddb88['height']-_0x4ef76f:(this[_0x28a5dd(0x2e1)]=![],this[_0x28a5dd(0x2da)]&&(this['_cancelButton'][_0x28a5dd(0x2ee)]=!![])));else{const _0x113ad0=this[_0x28a5dd(0x1fc)](_0x1649cb),_0x3ea4e9=new _0x2dea55(_0x113ad0);_0x3ea4e9[_0x28a5dd(0x2a4)]=0x0,this[_0x28a5dd(0x1bb)](_0x3ea4e9),this[_0x28a5dd(0x1e0)]['subWindow']=_0x3ea4e9;}}},Window_CommonEventMenuList[_0x733a56(0x2dc)][_0x733a56(0x1e7)]=function(){const _0x1b927c=_0x733a56;this[_0x1b927c(0x2da)]&&(this[_0x1b927c(0x2da)]['visible']=![]),Window_Command[_0x1b927c(0x2dc)]['close'][_0x1b927c(0x236)](this);},Window_CommonEventMenuList[_0x733a56(0x2dc)][_0x733a56(0x2ff)]=function(){return this['_columns']||0x1;},Window_CommonEventMenuList['prototype'][_0x733a56(0x1c2)]=function(){const _0x5390a8=_0x733a56;return this[_0x5390a8(0x243)];},Window_CommonEventMenuList[_0x733a56(0x2dc)][_0x733a56(0x1e8)]=function(_0x4ba1f9,_0x423886){const _0x3ccb35=_0x733a56;if(!_0x4ba1f9)return;this[_0x3ccb35(0x280)]=this['_aidWindows']||{},this['_aidWindows'][_0x423886]=_0x4ba1f9;},Window_CommonEventMenuList[_0x733a56(0x2dc)][_0x733a56(0x1a4)]=function(){const _0x50b20f=_0x733a56;for(const _0x50a12d of this[_0x50b20f(0x2db)][_0x50b20f(0x2d1)]){const _0x6c65ff=$dataCommonEvents[_0x50a12d];if(!this[_0x50b20f(0x1ae)](_0x6c65ff))continue;const _0x232194=DataManager['commonEventMenuName'](_0x50a12d,this['maxCols']()<=0x1),_0x5a1cee=this[_0x50b20f(0x26a)](_0x6c65ff);this[_0x50b20f(0x1fe)](_0x232194,_0x50b20f(0x269),_0x5a1cee,_0x50a12d);}},Window_CommonEventMenuList[_0x733a56(0x2dc)]['includes']=function(_0x210758){const _0x45875c=_0x733a56;if(!_0x210758)return![];const _0x1e1ab8=_0x45875c(0x1cf)[_0x45875c(0x256)](_0x210758['id']);if(VisuMZ[_0x45875c(0x1de)]['JS'][_0x1e1ab8]){if(_0x45875c(0x2f4)!=='jUUgO')return this[_0x45875c(0x1f9)][_0x551a47]=_0x38eafe,this['_commonEventMenuName'][_0x4dba8e];else{if(!VisuMZ[_0x45875c(0x1de)]['JS'][_0x1e1ab8]['call'](this))return![];}}const _0x144708=VisuMZ['CommonEventMenu']['RegExp'],_0x3ccc73=DataManager[_0x45875c(0x1d8)](_0x210758['id']);if(_0x3ccc73[_0x45875c(0x230)](_0x144708[_0x45875c(0x29b)])){if(_0x45875c(0x276)!==_0x45875c(0x276)){const _0x2df439=_0xc19853[_0x45875c(0x203)]('['+_0x426d4d['$1'][_0x45875c(0x230)](/\d+/g)+']');for(const _0x48dcd1 of _0x2df439){if(_0x358059[_0x45875c(0x1cc)](_0x48dcd1))return![];}return!![];}else{const _0x19ab79=JSON[_0x45875c(0x203)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x182c9b of _0x19ab79){if(!$gameSwitches[_0x45875c(0x1cc)](_0x182c9b))return![];}return!![];}}if(_0x3ccc73[_0x45875c(0x230)](_0x144708[_0x45875c(0x200)])){const _0x5df529=JSON[_0x45875c(0x203)]('['+RegExp['$1'][_0x45875c(0x230)](/\d+/g)+']');for(const _0x467224 of _0x5df529){if(_0x45875c(0x1af)!==_0x45875c(0x26f)){if($gameSwitches[_0x45875c(0x1cc)](_0x467224))return!![];}else return this[_0x45875c(0x1b7)]&&this[_0x45875c(0x1b7)][_0x45875c(0x2ba)]===_0x19c86e;}return![];}if(_0x3ccc73[_0x45875c(0x230)](_0x144708[_0x45875c(0x28b)])){if('ncZRP'!==_0x45875c(0x2de))_0x380f85=_0x45875c(0x272)[_0x45875c(0x256)](_0xf9b3ad);else{const _0x260e00=JSON[_0x45875c(0x203)]('['+RegExp['$1'][_0x45875c(0x230)](/\d+/g)+']');for(const _0x59ce56 of _0x260e00){if(!$gameSwitches[_0x45875c(0x1cc)](_0x59ce56))return!![];}return![];}}if(_0x3ccc73[_0x45875c(0x230)](_0x144708[_0x45875c(0x1bc)])){if(_0x45875c(0x2e9)==='VsrTG'){const _0x3103d6=JSON[_0x45875c(0x203)]('['+RegExp['$1'][_0x45875c(0x230)](/\d+/g)+']');for(const _0x448b64 of _0x3103d6){if(_0x45875c(0x214)===_0x45875c(0x2ed))this[_0x45875c(0x2a4)]+=0x20,this[_0x45875c(0x284)]()&&(this[_0x45875c(0x2e1)]=![],this[_0x45875c(0x2da)]&&(this[_0x45875c(0x2da)][_0x45875c(0x2ee)]=!![]));else{if($gameSwitches[_0x45875c(0x1cc)](_0x448b64))return![];}}return!![];}else{if(_0x924f07[_0x45875c(0x1c4)]())_0x2961da('Please\x20pick\x20a\x20proper\x20layout!');return;}}return!![];},Window_CommonEventMenuList['prototype'][_0x733a56(0x26a)]=function(_0x123d70){const _0xdffbcf=_0x733a56;if(!_0x123d70)return![];const _0x5bb694=_0xdffbcf(0x275)[_0xdffbcf(0x256)](_0x123d70['id']);if(VisuMZ['CommonEventMenu']['JS'][_0x5bb694]){if(_0xdffbcf(0x1c7)!==_0xdffbcf(0x1c7)){if(_0x4932a7[_0xdffbcf(0x1cc)](_0x3c8cfc))return!![];}else{if(!VisuMZ[_0xdffbcf(0x1de)]['JS'][_0x5bb694]['call'](this))return![];}}const _0x573ac2=VisuMZ[_0xdffbcf(0x1de)][_0xdffbcf(0x220)],_0x44b791=DataManager[_0xdffbcf(0x1d8)](_0x123d70['id']);if(_0x44b791[_0xdffbcf(0x230)](_0x573ac2[_0xdffbcf(0x1df)])){const _0x34ac00=JSON[_0xdffbcf(0x203)]('['+RegExp['$1'][_0xdffbcf(0x230)](/\d+/g)+']');for(const _0x3c8c4f of _0x34ac00){if(!$gameSwitches[_0xdffbcf(0x1cc)](_0x3c8c4f))return![];}return!![];}if(_0x44b791[_0xdffbcf(0x230)](_0x573ac2[_0xdffbcf(0x222)])){const _0x4e44af=JSON[_0xdffbcf(0x203)]('['+RegExp['$1'][_0xdffbcf(0x230)](/\d+/g)+']');for(const _0x4bff73 of _0x4e44af){if($gameSwitches[_0xdffbcf(0x1cc)](_0x4bff73))return!![];}return![];}if(_0x44b791[_0xdffbcf(0x230)](_0x573ac2[_0xdffbcf(0x2a7)])){const _0x2312ba=JSON[_0xdffbcf(0x203)]('['+RegExp['$1'][_0xdffbcf(0x230)](/\d+/g)+']');for(const _0x1d322c of _0x2312ba){if(!$gameSwitches[_0xdffbcf(0x1cc)](_0x1d322c))return!![];}return![];}if(_0x44b791[_0xdffbcf(0x230)](_0x573ac2[_0xdffbcf(0x247)])){const _0x1933b5=JSON['parse']('['+RegExp['$1'][_0xdffbcf(0x230)](/\d+/g)+']');for(const _0x268762 of _0x1933b5){if($gameSwitches[_0xdffbcf(0x1cc)](_0x268762))return![];}return!![];}return!![];},Window_CommonEventMenuList[_0x733a56(0x2dc)][_0x733a56(0x266)]=function(_0x36da44){const _0x4e6ac6=_0x733a56,_0x2daedc=this[_0x4e6ac6(0x28c)](_0x36da44),_0x289a58=this[_0x4e6ac6(0x26d)](_0x36da44),_0x48a332=this['textSizeEx'](_0x289a58)[_0x4e6ac6(0x260)];this[_0x4e6ac6(0x1d6)](this[_0x4e6ac6(0x1b1)](_0x36da44));const _0x55a94=this[_0x4e6ac6(0x1c2)]();if(_0x55a94===_0x4e6ac6(0x2f8))this[_0x4e6ac6(0x233)](_0x289a58,_0x2daedc['x']+_0x2daedc[_0x4e6ac6(0x260)]-_0x48a332,_0x2daedc['y'],_0x48a332);else{if(_0x55a94==='center'){const _0x3d1ac3=_0x2daedc['x']+Math[_0x4e6ac6(0x1d3)]((_0x2daedc[_0x4e6ac6(0x260)]-_0x48a332)/0x2);this[_0x4e6ac6(0x233)](_0x289a58,_0x3d1ac3,_0x2daedc['y'],_0x48a332);}else this[_0x4e6ac6(0x233)](_0x289a58,_0x2daedc['x'],_0x2daedc['y'],_0x48a332);}},Window_CommonEventMenuList[_0x733a56(0x2dc)]['callUpdateHelp']=function(){const _0x52e01d=_0x733a56;Window_Command[_0x52e01d(0x2dc)]['callUpdateHelp'][_0x52e01d(0x236)](this);if(!this[_0x52e01d(0x280)])return;const _0x1fa8ab=this[_0x52e01d(0x2df)]();if(this[_0x52e01d(0x280)]['pictureWindow']){if(_0x52e01d(0x1b0)===_0x52e01d(0x1b0)){const _0x46f600=DataManager['commonEventMenuPicture'](_0x1fa8ab);this['_aidWindows'][_0x52e01d(0x2c3)][_0x52e01d(0x1f0)](_0x46f600);}else _0x21e9ec[_0x52e01d(0x230)](/(?:INVERSE)/i)?_0x3fc225+=_0x540c50?this['calcWindowHeight'](0x2):0x0:_0x13b44a+=_0x364637?0x0:this['calcWindowHeight'](0x2);}if(this[_0x52e01d(0x280)][_0x52e01d(0x1d4)]){const _0x170758=DataManager[_0x52e01d(0x2a8)](_0x1fa8ab,_0x52e01d(0x2f0));this[_0x52e01d(0x280)][_0x52e01d(0x1d4)][_0x52e01d(0x210)](_0x170758);}if(this['_aidWindows'][_0x52e01d(0x28d)]){const _0x52d51e=DataManager[_0x52e01d(0x2a8)](_0x1fa8ab,_0x52e01d(0x259));this[_0x52e01d(0x280)][_0x52e01d(0x28d)][_0x52e01d(0x210)](_0x52d51e);}for(let _0x53b401=0x1;_0x53b401<=0xa;_0x53b401++){if(_0x52e01d(0x2e5)===_0x52e01d(0x1f3))_0x15ad5c=this['calcWindowHeight'](0x4,!![]);else{const _0x53c96b=this[_0x52e01d(0x280)][_0x52e01d(0x2d6)[_0x52e01d(0x256)](_0x53b401)];if(_0x53c96b){const _0xb47f19=DataManager['commonEventMenuDescription'](_0x1fa8ab,'Extra%1'['format'](_0x53b401));_0x53c96b[_0x52e01d(0x210)](_0xb47f19);}}}};function _0xe625(){const _0x49d494=['Help','bind','ConvertParams','loadPicture','jUUgO','createCommonEventMenuExtraWindows','ClpzZ','updateOpen','right','initMembers','isInstanceOfSceneMap','_commonEventMenu_ShowLayoutName','CreateCommonEventList','round','padZero','maxCols','makeCommandList','touchUI','drawPicture','isSceneBattle','createCommonEventMenuListWindow','MzPHg','innerWidth','trim','sjAui','Game_System_initialize','includes','Fcftf','jXFnx','isCommandEnabled','_anchorY','isRightInputMode','isSceneMap','max','5419odtifM','_scene','wThnS','create','Custom','addCommonEventMenuWindow','HideAny','PictureAnchorX','BvziR','jKxqU','middle','findExt','itemTextAlign','JuNFZ','isPlaytest','CancelButtonPosition','RangeEnd','FEoJJ','commonEventMenuRectangle','wHVop','cancel','ijkRh','value','ListColumns','PictureAutoFit','CommonEvent-%1-Visible-JS','3138060KgzHKW','sVpRA','AjiBr','floor','helpWindow','GSlAM','changePaintOpacity','NdOAz','commonEventMenuNote','DFVgy','Scene_Map','wmfDd','remove','9451800VghbXR','CommonEventMenu','EnableAll','_commonEventMenuWindows','No\x20Common\x20Events\x20have\x20been\x20defined!','_commonEventMenuDesc','left','DsxgE','lhDWh','callUpdateHelp','close','registerAidWindow','zFegK','isBottomHelpMode','LkWeV','sezmt','BFjHC','List_Window_JS','registerCommonEventMenuAidWindows','setPicture','FAUgu','EddDQ','uqosi','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','332610QaaJjf','calcWindowHeight','Help_Window_JS','_autoFit','_commonEventMenuName','scale','sQQdS','commonEventMenuSubWindowRect','210123baVMEo','addCommand','CancelOffsetX','ShowAny','zSMwk','createCommonEventMenuLayer','parse','MDfJl','pmipv','TsYXu','ELWfj','UI\x20Size','children','name','concat','EVAL','createCommonEventMenuHelpWindow','textSizeEx','htYPO','setText','createWindowLayer','commonEventMenuHelpWindowRect','XpnXY','EFdZv','Icon','zrZHh','sort','toUpperCase','last','startCommonEventMenu','INSqC','hitIndex','paYza','min','onDatabaseLoaded','RegExp','LOOjM','EnableAny','setHandler','exit','WVECg','toLowerCase','aOglf','_commonEventMenuNameIndent','innerHeight','PYVSG','NUM','bUzru','map','TUAHA','1664760xJyKnN','match','Sub_Window_JS','description','drawTextEx','KXGRo','createCommonEventMenuSubWindow','call','bgETY','CvplV','boxWidth','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','closeCommonEventMenuDelay','Picture','9551430BFHxiJ','KowVh','_commonEventMenuNote','_active','luSwI','wwCUd','_textAlign','STR','_windowLayer','BwKJx','DisableAny','hDWlf','FUNC','ceil','HMGaM','DefaultIcon','launchCommonEventMenu','Name','RangeStart','Layout','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','createCommonEventMenuExtraWindow','wecXk','vqkyF','length','format','canCreateCommonEventMenu','qIIdi','Sub','juvIu','addChild','_commonEventMenuLayer','vmeoT','XaYDw','bottom','width','Scene_Base_createWindowLayer','height','ZCvuE','commonEventMenuBoundary','ESQzM','drawItem','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','AjbTl','commonEvent','isEnabled','log','List\x20Window:','commandName','uLXtE','iGMsb','_interpreter','1474stiGdf','\x5cI[0]%1','tLwXp','closeCommonEventMenu','CommonEvent-%1-Enable-JS','RvxVF','ARRAYFUNC','sjbER','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','CancelOffsetY','BtRzD','CustomLayout','clear','registerCommand','RAaLo','_aidWindows','WnvHf','center','gqGlb','isOpen','KdOcS','TVSif','jwHMY','CommonEvents','ckxOS','JSON','HideAll','itemLineRect','subWindow','setupChild','wait','ARRAYEVAL','eventId','setLastPickedCommonEventMenuID','parameters','auto','pdvVf','VisibleJS','indexOf','lwMjt','Scene_Boot_onDatabaseLoaded','commonEventMenuPictureWindowRect','ShowAll','EpXyW','AYXHI','filter','_lastPickedCommonEventMenuID','forceSelect','ARRAYSTR','EnableJS','tIjlG','openness','process_VisuMZ_CommonEventMenu_JS','blt','DisableAll','commonEventMenuDescription','PictureAnchorY','initialize','_filename','SsLES','_commonEventMenuPicture','upper\x20right','code','Picture_Window_JS','sQqvz','STRUCT','top','AutoSort','81XxMpuU','_anchorX','shift','getLastPickedCommonEventMenuID','createCommonEventMenuPictureWindow','constructor','_columns','Scene_Battle','#%1','_autoSelect','Settings','evjCV','clamp','_commonEventMenu_ShowDimensions','pictureWindow','kDPsz','VQiZx','setBackgroundType','nbXpc','VPfLe','PkxyK','Optional','open','344EAHfUT','64cTFcsH','HpEXI','commonEventMenuListWindowRect','listWindow','list','csYiu','isPressed','aSOCR','EqoSS','extraWindow_%1','CancelEvent','version','HJgXL','_cancelButton','_settings','prototype','QUqwb','ncZRP','currentExt','rrfII','_opening','commonEventMenu_defaultIcon','okRIr','uTNPS','mfLqm','cxINS','ARRAYSTRUCT','Subt\x20Window:','VsrTG','contents','jEHgC','createCancelButton','hvGrS','visible','commonEventMenuPicture'];_0xe625=function(){return _0x49d494;};return _0xe625();}