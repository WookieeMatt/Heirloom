//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.17] [MainMenuCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Main Menu Core plugin is designed to give you more control over the Main
 * Menu outside of RPG Maker MZ's editor's control. Game devs are given control
 * over how commands work, visual aesthetics pertaining to the Main Menu, and 
 * assign menu images to actors as background portraits.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general Main Menu settings.
 * * The ability to set Menu Background Portraits for individual actors.
 * * Flexibility in changing which commands appear in the Main Menu.
 * * Add new windows like the Playtime Window and Variable windows.
 * * Change the style of how the windows are arranged in the Main Menu.
 * * Change the way the status list is displayed and the way it's displayed.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * <Menu Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 *
 * ---
 * 
 * <Menu Portrait Offset: +x, +y>
 * <Menu Portrait Offset: -x, -y>
 * 
 * <Menu Portrait Offset X: +x>
 * <Menu Portrait Offset X: -x>
 * 
 * <Menu Portrait Offset Y: +y>
 * <Menu Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Offsets the X and Y coordinates for the menu image.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * - This only applies to the Main Menu portraits.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Menu Image (Group)
 * Actor: Change Menu Image (Range)
 * Actor: Change Menu Image (JS)
 * - Changes the actor's Menu Image.
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Actor ID:
 *   - Select which ID(s) to affect.
 *
 *   Filename:
 *   - Selected actor(s) will have their menu images changed to this.
 *
 * ---
 * 
 * === Menu Command Plugin Commands ===
 * 
 * ---
 * 
 * Menu Command: Clear Forced Settings
 * - Clear any forced settings for the menu command symbols.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Disable
 * - Forcefully disable specific menu commands via their symbols.
 * - Matching forced enabled symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Enable
 * - Forcefully enable specific menu commands via their symbols.
 * - Matching forced disabled symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Hide
 * - Forcefully hide specific menu commands via their symbols.
 * - Matching forced shown symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 * 
 * Menu Command: Force Show
 * - Forcefully show specific menu commands via their symbols.
 * - Matching forced hidden symbols will be overwritten.
 * 
 *   Symbol(s):
 *   - Insert the symbols of the menu commands here.
 *   - The symbols are case sensitive.
 *   - VisuStella is NOT responsible for any errors produced by menus that
 *     become accessible outside of their intended usage.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These general settings contain various settings on how the Main Menu scene
 * displays certain windows, alters how specific windows behave, and determines
 * which scenes would display actor menu images as background portraits.
 *
 * ---
 *
 * Gold Window
 * 
 *   Thinner Gold Window:
 *   - Make the Gold Window thinner in the Main Menu?
 *   - Used to match the Playtime and Variable Windows.
 *   - Only applies to the Command Window style: Default Vertical.
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
 *
 * ---
 * 
 * Status Window
 * 
 *   Select Last?:
 *   - When picking a personal command from the Command Window, select the
 *     last picked actor or always the first?
 * 
 * ---
 *
 * Solo Party
 *
 *   Solo Quick Mode:
 *   - When selecting "Skills", "Equip", or "Status" with one party member,
 *     immediately go to the scene.
 *
 * ---
 *
 * Sub Menus
 *
 *   Menus with Actor BG's:
 *   - A list of the menus that would be compatible with Actor Menu Backgrounds
 *
 *   JS: Actor BG Action:
 *   - Code used to determine how to display the sprites upon loading.
 *
 * ---
 * 
 * Party Window
 * 
 *   Show Reserve Memebers:
 *   - Show reserve members while on the Main Menu scene?
 * 
 *   Hide Main Menu Only
 *   - If reserve members are hidden, hide them only in the main menu or
 *     all scenes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window List
 * ============================================================================
 *
 * The Command Window functions as a hub to the various scenes linked from the
 * Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
 * so on. This Plugin Parameter is an array that lets you add, remove, and/or
 * alter the Command Window's various commands, how they're handled, whether or
 * not they're visible, and how they react when selected.
 *
 * These will require knowledge of JavaScript to use them properly.
 *
 * ---
 *
 * Command Window List
 * 
 *   Symbol:
 *   - The symbol used for this command.
 *
 *   Icon:
 *   - Icon used for this command.
 *   - Use 0 for no icon.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 *   JS: Personal Code:
 *   - JavaScript code that runs once the actor list is selected with this
 *     command highlighted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Playtime Window
 * ============================================================================
 *
 * The Playtime Window is an optional feature that can be displayed in the
 * Main Menu. As its name suggests, it displays the playtime of the player's
 * current play through.
 *
 * ---
 *
 * Playtime Window
 * 
 *   Enable:
 *   - Use the Playtime Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Playtime Window?
 *
 *   Background Type:
 *   - Select background type for the Playtime window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Playtime window.
 * 
 *   Time Icon:
 *   - Icon displayed for the 'Time' label.
 * 
 *   Time Text:
 *   - Text for the display of 'Time' in the Playtime window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Playtime window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Variable Window
 * ============================================================================
 *
 * The Variable Window is an optional feature that can be displayed in the
 * Main Menu. If enabled, the Variable Window will display variables of the
 * game dev's choice in the Main Menu itself.
 *
 * ---
 *
 * Variable Window
 * 
 *   Enable:
 *   - Use the Variable Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Variable Window?
 *
 *   Background Type:
 *   - Select background type for the Variable window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Variable window.
 * 
 *   Variable List:
 *   - Select variables to be displayed into the window.
 *     Use \i[x] to determine their icon.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Variable window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window Style & Command Style Settings
 * ============================================================================
 *
 * This determines how the Main Menu appears based on the Command Window Style.
 * If anything but the 'Default' is used, then these settings will take over
 * the window placement settings for the Main Menu. This means that even if you
 * are using VisuStella's Core Engine, the window layouts will be overwritten.
 *
 * ---
 *
 * Command Window Style:
 * - Choose the positioning and style of the Main Menu Command Window.
 * - This will automatically rearrange windows.
 * 
 *   Default Vertical Side Style:
 *   - The default Main Menu layout style.
 *   - Affected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Top Horizontal Style:
 *   - Puts the Command Window at the top of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 *   Bottom Horizontal Style:
 *   - Puts the Command Window at the bottom of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the top.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Mobile Full Screen Style:
 *   - Puts the Command Window at the center of the screen with larger buttons.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is hidden until prompted to be selected.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 * ---
 *
 * Command Style Settings
 *
 *   Style:
 *   - How do you wish to draw command entries in the Command Window?
 *   - Text Only: displays only text.
 *   - Icon Only: displays only the icon.
 *   - Icon + Text: displays icon first, then text.
 *   - Automatic: determines the best fit for the size
 *
 *   Text Alignment:
 *   - Decide how you want the text to be aligned.
 *   - Left, Center, or Right
 * 
 *   Rows:
 *   - Number of visible rows.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Mobile Thickness:
 *   - The thickness of the buttons for mobile version.
 *   - Applies only to Top, Bottom, and Mobile styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Graphic, Status List Style, & List Style Settings
 * ============================================================================
 *
 * Choose how the contents Actor Status List Window in the Main Menu appears.
 * This can range from the which actor graphic is drawn to the style used for
 * the data that's displayed.
 *
 * ---
 *
 * Status Graphic:
 * - Choose how the graphic for actor graphics appear in status-like menus.
 * 
 *   None:
 *   - Don't display any graphic for the actors.
 * 
 *   Face:
 *   - Display the actors' faces. This is the default option in RPG Maker MZ.
 *
 *   Map Sprite:
 *   - Display the actors' map sprites.
 * 
 *   Sideview Battler:
 *   - Display the actors' sideview battlers.
 *
 * ---
 *
 * Main Menu List Style
 * - Choose how the actor status list looks in the Main Menu.
 *
 * Inner-Menu List Style
 * - Choose how the actor status list looks in the inner menus like Scene_Item,
 *   Scene_Skill, etc.
 *
 *   Default Horizontal Style:
 *   - This is the default style found in RPG Maker MZ's Main Menu.
 *
 *   Vertical Style:
 *   - Makes the display for the actor list vertical instead of horizontal.
 *
 *   Portrait Style:
 *   - Similar to the vertical style, except each actor's Menu Image is
 *     displayed in the background instead. Portraits are required.
 *   - If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 *
 *   Solo Style:
 *   - Used for solo party member games. Extends the whole view of the Status
 *     Window to accomodate a single actor.
 *
 *   Thin Horizontal Style:
 *   - Makes the selectable menu entries for the actors a single line thin.
 *
 *   Thicker Horizontal Style:
 *   - Makes the selectable menu entries for the actors two lines thick.
 *
 * ---
 *
 * List Styles
 *   JavaScript code used to determine how the individual styles are drawn.
 *
 *   JS: Default:
 *   JS: Vertical:
 *   JS: Portrait:
 *   JS: Solo:
 *   JS: Thin:
 *   JS: Thicker:
 *   - Code used to draw the data for these styles.
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
 * Version 1.17: August 18, 2022
 * * Bug Fixes!
 * ** Changed actor graphics now reflect properly for those using the default
 *    status menu. Fix made by Irina.
 * 
 * Version 1.16: April 21, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Menu Command: Clear Forced Settings
 * *** Menu Command: Force Disable
 * *** Menu Command: Force Enable
 * *** Menu Command: Force Hide
 * *** Menu Command: Force Show
 * **** These new Plugin Commands allow you to forcefully show, hide, enable,
 *      or disable Plugin Commands regardless of their required settings.
 * **** We are not responsible for errors that occur by accessing menus that
 *      should otherwise be disabled or hidden.
 * 
 * Version 1.15: February 10, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: October 25, 2021
 * * Bug Fixes!
 * ** Plugin Parameter settings for automatic Command Window height adjustment
 *    should now work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Added a note for the Help File: Gold Window > Thinner Gold Window
 * *** Only applies to the Command Window style: Default Vertical.
 * 
 * Version 1.13: October 21, 2021
 * * Feature Update!
 * ** Rounding update applied to picture portraits so that coordinates aren't
 *    drawn on non-whole numbers due to base images having odd values. Update
 *    made by Olivia.
 * 
 * Version 1.12: July 16, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Message Log' command.
 * *** This is for the upcoming VisuMZ_3_MessageLog plugin.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'MessageLog' option and click
 *      copy. Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.11: May 14, 2021
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Load' command after the 'Save' command.
 * *** This allows players to access the load game screen from the Main Menu.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'Load' option and click copy.
 *      Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.10: April 16, 2021
 * * Feature Update!
 * ** Default style for List Styles now have its code updated with the
 *    JS: Default plugin parameter for games whose vertical screen resolution
 *    is larger than normal.
 * *** To update this, do either of the following:
 * **** Open up the Main Menu Core Plugin Parameters. Select and press delete 
 *      on "List Style Settings". Press Enter. New updated settings will be
 *      replaced for the JS: Default settings.
 * **** Or Delete the existing VisuMZ_1_MainMenuCore.js in the Plugin Manager
 *      list and install the newest version.
 * 
 * Version 1.09: March 19, 2021
 * * Documentation Update!
 * ** Added clarity for the "Portrait Style" in Plugin Parameters section for
 *    "Status Graphic, Status List Style, & List Style Settings":
 * *** If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 * 
 * Version 1.08: February 26, 2021
 * * Feature Update!
 * ** Default Plugin Parameters for the List Style Settings defaults have been
 *    updated with tighter coordinate values to allow for more accurate display
 *    of UI element positioning. Update made by Olivia.
 * 
 * Version 1.07: January 1, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Removed "<Menu Image: filename>" version of notetag to reduce confusion
 *    and to stick with the norm declared by the Battle Core.
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Menu Portrait Offset: +x, +y>
 * *** <Menu Portrait Offset X: +x>
 * *** <Menu Portrait Offset Y: +y>
 * **** This is used with the "Portrait" style Main Menu list.
 * **** Offsets the X and Y coordinates for the menu portrait.
 * 
 * Version 1.06: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** Documentation added for the new plugin parameter.
 * * New Features!
 * ** New plugin parameter added by Yanfly.
 * *** Plugin Parameters > General > Status Window > Select Last?
 * **** When picking a personal command from the Command Window, select the
 *      last picked actor or always the first?
 * 
 * Version 1.04: October 4, 2020
 * * Feature Update!
 * ** Certain windows will now pre-load all associated image types for the
 *    actor upon being created to avoid custom JS drawing problems.
 *    Change made by Irina.
 * ** Failsafes have been added to prevent non-existent variables from crashing
 *    the game if a user does not remove them from the variable list. Change
 *    made by Irina.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** Added the alternative notetag <Menu Portrait: filename> that also works
 *    the same way as <Menu Image: filename>.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Skill check plugin parameter for show fixed. Fixed by Yanfly and Shaz.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Command Window List > skill >
 *     JS: Show > and changing 'this.needsCommand("item")' to
 *     'this.needsCommand("skill")'
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Changes the actor's Menu Image.
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Actor ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Actor ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MenuCommand
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandClear
 * @text Menu Command: Clear Forced Settings
 * @desc Clear any forced settings for the menu command symbols.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceDisable
 * @text Menu Command: Force Disable
 * @desc Forcefully disable specific menu commands via their symbols.
 * Matching forced enabled symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceEnable
 * @text Menu Command: Force Enable
 * @desc Forcefully enable specific menu commands via their symbols.
 * Matching forced disabled symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceHide
 * @text Menu Command: Force Hide
 * @desc Forcefully hide specific menu commands via their symbols.
 * Matching forced shown symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MenuCommandForceShow
 * @text Menu Command: Force Show
 * @desc Forcefully show specific menu commands via their symbols.
 * Matching forced hidden symbols will be overwritten.
 *
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Insert the symbols of the menu commands here.
 * The symbols are case sensitive.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param MainMenuCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","StatusWindow":"","StatusSelectLast:eval":"false","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"messageLog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.MessageLogMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_3_MessageLog &&\\\\n    this.isMessageLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isMessageLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandMessageLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"load\",\"Icon:num\":\"191\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return 'Load';\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandLoad();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param ParamBreak1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the Main Menu.
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @parent StatusListStyle:str
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the inner menus
 * like Scene_Item, Scene_Skill, etc.
 * @default default
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
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
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this command.
 * Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this menu command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @parent GoldWindow
 * @type boolean
 * @on Thinner
 * @off Normal
 * @desc Make the Gold Window thinner in the Main Menu?
 * Used to match the Playtime and Variable Windows.
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusSelectLast:eval
 * @text Select Last?
 * @parent StatusWindow
 * @type boolean
 * @on Last Picked Actor
 * @off Always First Actor
 * @desc When picking a personal command from the Command Window,
 * select the last picked actor or always the first?
 * @default false
 *
 * @param SoloParty
 * @text Solo Party
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @parent SoloParty
 * @type boolean
 * @on Quick
 * @off Normal
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 *
 * @param SubMenus
 * @text Sub Menus
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @parent SubMenus
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @parent SubMenus
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text Party Window
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @parent PartyWindow
 * @type boolean
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @parent ShowReserve:eval
 * @type boolean
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Playtime Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Playtime Window?
 * @default true
 *
 * @param AdjustCommandHeight:eval
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Playtime window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Playtime window.
 * Default: 26
 * @default 20
 *
 * @param Icon:num
 * @text Time Icon
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Variable Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Variable Window?
 * @default false
 *
 * @param AdjustCommandHeight:eval
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Variable window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Variable window.
 * Default: 26
 * @default 20
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window.
 * Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Horizontal Command Window Style
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text Command Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @min 1
 * @desc Number of visible rows.
 * @default 2
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 4
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @min 1
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + Math.floor((rect.height - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
//=============================================================================

const _0x4aacb4=_0x95e7;(function(_0x2ffde4,_0x3f9411){const _0x1d6470=_0x95e7,_0x3f8fa4=_0x2ffde4();while(!![]){try{const _0x469268=parseInt(_0x1d6470(0x337))/0x1+parseInt(_0x1d6470(0x20f))/0x2*(parseInt(_0x1d6470(0x2f7))/0x3)+parseInt(_0x1d6470(0x1d6))/0x4*(-parseInt(_0x1d6470(0x2ac))/0x5)+-parseInt(_0x1d6470(0x22d))/0x6+-parseInt(_0x1d6470(0x1dc))/0x7+-parseInt(_0x1d6470(0x2aa))/0x8*(parseInt(_0x1d6470(0x25a))/0x9)+parseInt(_0x1d6470(0x21f))/0xa*(parseInt(_0x1d6470(0x293))/0xb);if(_0x469268===_0x3f9411)break;else _0x3f8fa4['push'](_0x3f8fa4['shift']());}catch(_0x25e7f2){_0x3f8fa4['push'](_0x3f8fa4['shift']());}}}(_0x2ea8,0xd3342));var label=_0x4aacb4(0x206),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x2b757c){const _0x4f6a19=_0x4aacb4;return _0x2b757c['status']&&_0x2b757c[_0x4f6a19(0x282)][_0x4f6a19(0x33e)]('['+label+']');})[0x0];VisuMZ[label][_0x4aacb4(0x264)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x269df2,_0x1429e5){const _0x3e7c61=_0x4aacb4;for(const _0x37129a in _0x1429e5){if(_0x37129a[_0x3e7c61(0x28e)](/(.*):(.*)/i)){if('kMYzC'!==_0x3e7c61(0x2eb)){const _0x172512=String(RegExp['$1']),_0x573436=String(RegExp['$2'])[_0x3e7c61(0x33b)]()['trim']();let _0x208665,_0x7aa6d1,_0x2438a0;switch(_0x573436){case _0x3e7c61(0x30e):_0x208665=_0x1429e5[_0x37129a]!==''?Number(_0x1429e5[_0x37129a]):0x0;break;case _0x3e7c61(0x340):_0x7aa6d1=_0x1429e5[_0x37129a]!==''?JSON[_0x3e7c61(0x1c2)](_0x1429e5[_0x37129a]):[],_0x208665=_0x7aa6d1[_0x3e7c61(0x239)](_0x33237d=>Number(_0x33237d));break;case _0x3e7c61(0x2a1):_0x208665=_0x1429e5[_0x37129a]!==''?eval(_0x1429e5[_0x37129a]):null;break;case _0x3e7c61(0x289):_0x7aa6d1=_0x1429e5[_0x37129a]!==''?JSON[_0x3e7c61(0x1c2)](_0x1429e5[_0x37129a]):[],_0x208665=_0x7aa6d1[_0x3e7c61(0x239)](_0x566c7f=>eval(_0x566c7f));break;case'JSON':_0x208665=_0x1429e5[_0x37129a]!==''?JSON[_0x3e7c61(0x1c2)](_0x1429e5[_0x37129a]):'';break;case _0x3e7c61(0x2fb):_0x7aa6d1=_0x1429e5[_0x37129a]!==''?JSON[_0x3e7c61(0x1c2)](_0x1429e5[_0x37129a]):[],_0x208665=_0x7aa6d1[_0x3e7c61(0x239)](_0x22b7b9=>JSON[_0x3e7c61(0x1c2)](_0x22b7b9));break;case'FUNC':_0x208665=_0x1429e5[_0x37129a]!==''?new Function(JSON['parse'](_0x1429e5[_0x37129a])):new Function('return\x200');break;case'ARRAYFUNC':_0x7aa6d1=_0x1429e5[_0x37129a]!==''?JSON[_0x3e7c61(0x1c2)](_0x1429e5[_0x37129a]):[],_0x208665=_0x7aa6d1['map'](_0x412294=>new Function(JSON['parse'](_0x412294)));break;case _0x3e7c61(0x354):_0x208665=_0x1429e5[_0x37129a]!==''?String(_0x1429e5[_0x37129a]):'';break;case _0x3e7c61(0x270):_0x7aa6d1=_0x1429e5[_0x37129a]!==''?JSON[_0x3e7c61(0x1c2)](_0x1429e5[_0x37129a]):[],_0x208665=_0x7aa6d1['map'](_0x4ccf73=>String(_0x4ccf73));break;case _0x3e7c61(0x25f):_0x2438a0=_0x1429e5[_0x37129a]!==''?JSON[_0x3e7c61(0x1c2)](_0x1429e5[_0x37129a]):{},_0x269df2[_0x172512]={},VisuMZ[_0x3e7c61(0x1c3)](_0x269df2[_0x172512],_0x2438a0);continue;case'ARRAYSTRUCT':_0x7aa6d1=_0x1429e5[_0x37129a]!==''?JSON[_0x3e7c61(0x1c2)](_0x1429e5[_0x37129a]):[],_0x208665=_0x7aa6d1['map'](_0x3fc1dd=>VisuMZ[_0x3e7c61(0x1c3)]({},JSON['parse'](_0x3fc1dd)));break;default:continue;}_0x269df2[_0x172512]=_0x208665;}else _0x297ded[_0x3e7c61(0x259)]-=this[_0x3e7c61(0x33f)]()[_0x3e7c61(0x259)];}}return _0x269df2;},(_0x2f1d98=>{const _0x174ad3=_0x4aacb4,_0x536419=_0x2f1d98[_0x174ad3(0x2b2)];for(const _0x1a8372 of dependencies){if(!Imported[_0x1a8372]){alert(_0x174ad3(0x2d8)[_0x174ad3(0x281)](_0x536419,_0x1a8372)),SceneManager[_0x174ad3(0x314)]();break;}}const _0x43a683=_0x2f1d98[_0x174ad3(0x282)];if(_0x43a683[_0x174ad3(0x28e)](/\[Version[ ](.*?)\]/i)){const _0x1ecbec=Number(RegExp['$1']);_0x1ecbec!==VisuMZ[label][_0x174ad3(0x349)]&&(alert(_0x174ad3(0x238)[_0x174ad3(0x281)](_0x536419,_0x1ecbec)),SceneManager[_0x174ad3(0x314)]());}if(_0x43a683[_0x174ad3(0x28e)](/\[Tier[ ](\d+)\]/i)){const _0x3563c9=Number(RegExp['$1']);if(_0x3563c9<tier){if(_0x174ad3(0x1fa)===_0x174ad3(0x34a)){const _0x585265=_0x499051[_0x174ad3(0x279)];if(this['isMainMenuCommandVisible'](_0x585265,_0x5d4dee)){let _0x18ae06=_0x1eaac1['TextStr'];if(['',_0x174ad3(0x2e0)]['includes'](_0x18ae06))_0x18ae06=_0x2e32b5[_0x174ad3(0x32c)][_0x174ad3(0x2fe)](this);const _0x5959cb=_0x2e00e6['Icon'];_0x5959cb>0x0&&this[_0x174ad3(0x2df)]()!==_0x174ad3(0x1e2)&&(_0x18ae06=_0x174ad3(0x32a)['format'](_0x5959cb,_0x18ae06));const _0x232ed3=this['isMainMenuCommandEnabled'](_0x585265,_0x28cdfe),_0xa948a0=_0x130792[_0x174ad3(0x242)][_0x174ad3(0x2fe)](this);this[_0x174ad3(0x2d7)](_0x18ae06,_0x585265,_0x232ed3,_0xa948a0),this[_0x174ad3(0x1fd)](_0x585265,_0x2ac7ae['CallHandlerJS'][_0x174ad3(0x1d7)](this,_0xa948a0));}this[_0x174ad3(0x2c8)](_0x585265);}else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x536419,_0x3563c9,tier)),SceneManager[_0x174ad3(0x314)]();}else tier=Math[_0x174ad3(0x2d6)](_0x3563c9,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x174ad3(0x264)],_0x2f1d98['parameters']);})(pluginData),PluginManager[_0x4aacb4(0x322)](pluginData[_0x4aacb4(0x2b2)],_0x4aacb4(0x31d),_0x13dea5=>{const _0x3a7888=_0x4aacb4;VisuMZ[_0x3a7888(0x1c3)](_0x13dea5,_0x13dea5);const _0x24097f=_0x13dea5['Step1'],_0x3640c1=_0x13dea5[_0x3a7888(0x1d8)];for(let _0x59532d of _0x24097f){_0x59532d=parseInt(_0x59532d)||0x0;if(_0x59532d<=0x0)continue;const _0x3e1077=$gameActors['actor'](_0x59532d);if(!_0x3e1077)continue;_0x3e1077[_0x3a7888(0x1e0)](_0x3640c1);}}),PluginManager[_0x4aacb4(0x322)](pluginData[_0x4aacb4(0x2b2)],'ChangeActorMenuImageRange',_0x11bc42=>{const _0x8dfd24=_0x4aacb4;VisuMZ[_0x8dfd24(0x1c3)](_0x11bc42,_0x11bc42);const _0x473e99=_0x11bc42['Step1End']>=_0x11bc42[_0x8dfd24(0x269)]?_0x11bc42[_0x8dfd24(0x269)]:_0x11bc42[_0x8dfd24(0x252)],_0x345ee3=_0x11bc42[_0x8dfd24(0x252)]>=_0x11bc42[_0x8dfd24(0x269)]?_0x11bc42[_0x8dfd24(0x252)]:_0x11bc42[_0x8dfd24(0x269)],_0x495531=Array(_0x345ee3-_0x473e99+0x1)[_0x8dfd24(0x1bf)]()[_0x8dfd24(0x239)]((_0x2d36ef,_0x5e18cf)=>_0x473e99+_0x5e18cf),_0x211542=_0x11bc42[_0x8dfd24(0x1d8)];for(let _0x3ba7cb of _0x495531){_0x3ba7cb=parseInt(_0x3ba7cb)||0x0;if(_0x3ba7cb<=0x0)continue;const _0x345961=$gameActors['actor'](_0x3ba7cb);if(!_0x345961)continue;_0x345961['setMenuImage'](_0x211542);}}),PluginManager[_0x4aacb4(0x322)](pluginData['name'],_0x4aacb4(0x2ba),_0x4d4077=>{const _0x46db2d=_0x4aacb4;VisuMZ[_0x46db2d(0x1c3)](_0x4d4077,_0x4d4077);const _0x14098a=_0x4d4077[_0x46db2d(0x2a7)];let _0x539d78=[];while(_0x14098a[_0x46db2d(0x326)]>0x0){if('sZIIv'!==_0x46db2d(0x1e6))_0x370aa7['prototype'][_0x46db2d(0x300)][_0x46db2d(0x2fe)](this),this['contents'][_0x46db2d(0x213)]=_0x9f5df6['MainMenuCore'][_0x46db2d(0x264)][_0x46db2d(0x34b)]['FontSize'];else{const _0x1a65b6=_0x14098a[_0x46db2d(0x32e)]();Array[_0x46db2d(0x244)](_0x1a65b6)?_0x539d78=_0x539d78[_0x46db2d(0x25e)](_0x1a65b6):_0x539d78['push'](_0x1a65b6);}}const _0x241988=_0x4d4077[_0x46db2d(0x1d8)];for(let _0x489714 of _0x539d78){_0x489714=parseInt(_0x489714)||0x0;if(_0x489714<=0x0)continue;const _0x52b7a4=$gameActors[_0x46db2d(0x1d3)](_0x489714);if(!_0x52b7a4)continue;_0x52b7a4[_0x46db2d(0x1e0)](_0x241988);}}),PluginManager[_0x4aacb4(0x322)](pluginData[_0x4aacb4(0x2b2)],'MenuCommandClear',_0x6062e7=>{const _0x2486c6=_0x4aacb4;VisuMZ[_0x2486c6(0x1c3)](_0x6062e7,_0x6062e7);const _0x1c48f4=_0x6062e7['Symbols']||[];for(const _0x522f80 of _0x1c48f4){$gameSystem['clearShowMainMenuCommand'](_0x522f80);}}),PluginManager[_0x4aacb4(0x322)](pluginData['name'],_0x4aacb4(0x201),_0x45f02c=>{const _0x250c89=_0x4aacb4;VisuMZ[_0x250c89(0x1c3)](_0x45f02c,_0x45f02c);const _0xfadd05=_0x45f02c['Symbols']||[];for(const _0x2a69af of _0xfadd05){$gameSystem[_0x250c89(0x2b6)](_0x2a69af);}}),PluginManager[_0x4aacb4(0x322)](pluginData[_0x4aacb4(0x2b2)],'MenuCommandForceDisable',_0x5797ad=>{const _0x2ce175=_0x4aacb4;VisuMZ[_0x2ce175(0x1c3)](_0x5797ad,_0x5797ad);const _0x10f2a5=_0x5797ad[_0x2ce175(0x260)]||[];for(const _0x2f6db9 of _0x10f2a5){_0x2ce175(0x21b)!==_0x2ce175(0x21b)?(_0x166802[_0x2ce175(0x206)][_0x2ce175(0x2ae)][_0x2ce175(0x2fe)](this,_0x4ac6de),this[_0x2ce175(0x29d)]()):$gameSystem[_0x2ce175(0x2d5)](_0x2f6db9);}}),PluginManager[_0x4aacb4(0x322)](pluginData[_0x4aacb4(0x2b2)],_0x4aacb4(0x1ed),_0x3d6294=>{const _0x456d15=_0x4aacb4;VisuMZ[_0x456d15(0x1c3)](_0x3d6294,_0x3d6294);const _0xbf70ec=_0x3d6294[_0x456d15(0x260)]||[];for(const _0x5c839f of _0xbf70ec){if('fdqLS'!=='fdqLS')return _0x30dc26[_0x456d15(0x206)][_0x456d15(0x264)][_0x456d15(0x210)]['VarList'][_0x456d15(0x326)];else $gameSystem['forceHideMainMenuCommand'](_0x5c839f);}}),PluginManager[_0x4aacb4(0x322)](pluginData[_0x4aacb4(0x2b2)],_0x4aacb4(0x20b),_0x26447d=>{const _0x427366=_0x4aacb4;VisuMZ['ConvertParams'](_0x26447d,_0x26447d);const _0x37d427=_0x26447d[_0x427366(0x260)]||[];for(const _0x31ff98 of _0x37d427){$gameSystem[_0x427366(0x22b)](_0x31ff98);}}),VisuMZ[_0x4aacb4(0x206)][_0x4aacb4(0x208)]=Game_System['prototype']['initialize'],Game_System[_0x4aacb4(0x225)]['initialize']=function(){const _0x1e3cee=_0x4aacb4;VisuMZ['MainMenuCore'][_0x1e3cee(0x208)][_0x1e3cee(0x2fe)](this),this[_0x1e3cee(0x277)]();},Game_System[_0x4aacb4(0x225)][_0x4aacb4(0x277)]=function(){const _0x43250a=_0x4aacb4;this[_0x43250a(0x30a)]=this['_mainMenuCore']||{'forceShow':[],'forceHide':[],'forceEnable':[],'forceDisable':[]};},Game_System[_0x4aacb4(0x225)][_0x4aacb4(0x241)]=function(){const _0x462a00=_0x4aacb4;if(this[_0x462a00(0x30a)]===undefined)this[_0x462a00(0x277)]();const _0x334755=['forceShow',_0x462a00(0x32f),_0x462a00(0x2bb),_0x462a00(0x275)];for(const _0x40d435 of _0x334755){'nKTqW'===_0x462a00(0x294)?(_0x24cd45[_0x462a00(0x225)][_0x462a00(0x300)][_0x462a00(0x2fe)](this),this['contents']['fontSize']=_0x2d45d5['MainMenuCore'][_0x462a00(0x264)][_0x462a00(0x210)][_0x462a00(0x2f2)],this[_0x462a00(0x2f3)](_0x1e8e0f[_0x462a00(0x205)]())):this[_0x462a00(0x30a)][_0x40d435]=this[_0x462a00(0x30a)][_0x40d435]||[];}return this[_0x462a00(0x30a)];},Game_System[_0x4aacb4(0x225)][_0x4aacb4(0x271)]=function(_0x55fbdc,_0x166eff){const _0x159024=_0x4aacb4,_0x412225=this[_0x159024(0x241)]();if(!_0x412225[_0x166eff])return![];return _0x412225[_0x166eff]['includes'](_0x55fbdc);},Game_System[_0x4aacb4(0x225)]['clearShowMainMenuCommand']=function(_0x358f6f){const _0x479191=_0x4aacb4,_0x5df063=this[_0x479191(0x241)](),_0x10cc7f=[_0x479191(0x2ec),_0x479191(0x32f),_0x479191(0x2bb),'forceDisable'];for(const _0x3c75ec of _0x10cc7f){_0x5df063[_0x3c75ec]['remove'](_0x358f6f);}},Game_System['prototype'][_0x4aacb4(0x22b)]=function(_0x99eca7){const _0x4d68d5=_0x4aacb4,_0x4dc5f3=this[_0x4d68d5(0x241)]();!_0x4dc5f3[_0x4d68d5(0x2ec)]['includes'](_0x99eca7)&&_0x4dc5f3[_0x4d68d5(0x2ec)][_0x4d68d5(0x286)](_0x99eca7),_0x4dc5f3[_0x4d68d5(0x32f)]['remove'](_0x99eca7);},Game_System[_0x4aacb4(0x225)][_0x4aacb4(0x20c)]=function(_0x1a66c5){const _0x51380b=_0x4aacb4,_0x43c25c=this[_0x51380b(0x241)]();if(!_0x43c25c['forceHide'][_0x51380b(0x33e)](_0x1a66c5)){if(_0x51380b(0x332)===_0x51380b(0x25d))return this[_0x51380b(0x1c9)]();else _0x43c25c[_0x51380b(0x32f)][_0x51380b(0x286)](_0x1a66c5);}_0x43c25c[_0x51380b(0x2ec)]['remove'](_0x1a66c5);},Game_System[_0x4aacb4(0x225)][_0x4aacb4(0x2b6)]=function(_0x3ffed3){const _0x283cf9=_0x4aacb4,_0x2b7f8a=this[_0x283cf9(0x241)]();!_0x2b7f8a['forceEnable'][_0x283cf9(0x33e)](_0x3ffed3)&&_0x2b7f8a[_0x283cf9(0x2bb)]['push'](_0x3ffed3),_0x2b7f8a[_0x283cf9(0x275)][_0x283cf9(0x207)](_0x3ffed3);},Game_System[_0x4aacb4(0x225)]['forceDisableMainMenuCommand']=function(_0xc7c22f){const _0x3749bb=_0x4aacb4,_0x49db4a=this[_0x3749bb(0x241)]();!_0x49db4a[_0x3749bb(0x275)][_0x3749bb(0x33e)](_0xc7c22f)&&_0x49db4a[_0x3749bb(0x275)][_0x3749bb(0x286)](_0xc7c22f),_0x49db4a[_0x3749bb(0x2bb)][_0x3749bb(0x207)](_0xc7c22f);},VisuMZ['MainMenuCore'][_0x4aacb4(0x2ae)]=Game_Actor[_0x4aacb4(0x225)][_0x4aacb4(0x1c6)],Game_Actor[_0x4aacb4(0x225)][_0x4aacb4(0x1c6)]=function(_0x17f595){const _0x308c00=_0x4aacb4;VisuMZ[_0x308c00(0x206)][_0x308c00(0x2ae)]['call'](this,_0x17f595),this['initMenuImage']();},Game_Actor[_0x4aacb4(0x225)][_0x4aacb4(0x29d)]=function(){const _0x4a440e=_0x4aacb4;this['_menuImage']='',this[_0x4a440e(0x1d3)]()&&this[_0x4a440e(0x1d3)]()['note'][_0x4a440e(0x28e)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this['_menuImage']=String(RegExp['$1']));},Game_Actor[_0x4aacb4(0x225)][_0x4aacb4(0x27b)]=function(){const _0x121d10=_0x4aacb4;if(this[_0x121d10(0x1f0)]===undefined)this['initMenuImage']();return this[_0x121d10(0x1f0)];},Game_Actor[_0x4aacb4(0x225)][_0x4aacb4(0x1e0)]=function(_0x17c453){const _0x105db5=_0x4aacb4;if(this[_0x105db5(0x1f0)]===undefined)this[_0x105db5(0x29d)]();this['_menuImage']=_0x17c453;},Game_Actor[_0x4aacb4(0x225)][_0x4aacb4(0x25b)]=function(){const _0x5d6a5f=_0x4aacb4;if(this[_0x5d6a5f(0x1d3)]()[_0x5d6a5f(0x296)][_0x5d6a5f(0x28e)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return'gEptu'===_0x5d6a5f(0x229)?Number(RegExp['$1']):this['statusWindowRectBottomStyle']();else{if(this[_0x5d6a5f(0x1d3)]()['note']['match'](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor['prototype'][_0x4aacb4(0x23e)]=function(){const _0x1ef0bd=_0x4aacb4;if(this[_0x1ef0bd(0x1d3)]()['note']['match'](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x1ef0bd(0x1d3)]()[_0x1ef0bd(0x296)]['match'](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$2']);}return 0x0;},Scene_MenuBase[_0x4aacb4(0x225)]['isDisplayActorMenuBackgroundImage']=function(){const _0xd59838=_0x4aacb4;return VisuMZ[_0xd59838(0x206)]['Settings'][_0xd59838(0x2b0)]['ActorBgMenus'][_0xd59838(0x33e)](this[_0xd59838(0x243)]['name']);},VisuMZ[_0x4aacb4(0x206)][_0x4aacb4(0x344)]=Scene_MenuBase[_0x4aacb4(0x225)][_0x4aacb4(0x338)],Scene_MenuBase[_0x4aacb4(0x225)]['createBackground']=function(){const _0x44477b=_0x4aacb4;VisuMZ['MainMenuCore']['Scene_MenuBase_createBackground']['call'](this),this[_0x44477b(0x1e5)]();},Scene_MenuBase['prototype'][_0x4aacb4(0x1e5)]=function(){const _0x601047=_0x4aacb4;this['_actorMenuBgSprite']=new Sprite_MenuBackgroundActor(),this['addChild'](this[_0x601047(0x1ca)]);},VisuMZ[_0x4aacb4(0x206)]['Scene_MenuBase_updateActor']=Scene_MenuBase[_0x4aacb4(0x225)]['updateActor'],Scene_MenuBase[_0x4aacb4(0x225)][_0x4aacb4(0x2ed)]=function(){const _0xb04b07=_0x4aacb4;VisuMZ[_0xb04b07(0x206)]['Scene_MenuBase_updateActor'][_0xb04b07(0x2fe)](this),this['isDisplayActorMenuBackgroundImage']()&&this[_0xb04b07(0x1ca)]&&this['_actorMenuBgSprite']['setActor'](this['_actor']);},VisuMZ[_0x4aacb4(0x206)][_0x4aacb4(0x2da)]=Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x23a)],Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x23a)]=function(){const _0x3b7f04=_0x4aacb4;VisuMZ['MainMenuCore'][_0x3b7f04(0x2da)][_0x3b7f04(0x2fe)](this),this[_0x3b7f04(0x2fc)](),this['createVariableWindow'](),this[_0x3b7f04(0x212)]();},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x1f7)]=function(){const _0x227e29=_0x4aacb4,_0x3d8484=this['commandWindowRect'](),_0x37ca81=new Window_MenuCommand(_0x3d8484);_0x37ca81[_0x227e29(0x1fd)](_0x227e29(0x28f),this['popScene']['bind'](this)),this[_0x227e29(0x218)](_0x37ca81),this[_0x227e29(0x274)]=_0x37ca81;},VisuMZ[_0x4aacb4(0x206)][_0x4aacb4(0x290)]=Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x301)],Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x301)]=function(){const _0xb100e8=_0x4aacb4,_0x551ab9=this[_0xb100e8(0x24a)]();if(_0x551ab9===_0xb100e8(0x1c8)){if('bLahH'===_0xb100e8(0x215)){const _0x53b994=this[_0xb100e8(0x232)](),_0x187c50=this[_0xb100e8(0x305)](0x1,![]),_0x48d1ce=0x0,_0x355605=this[_0xb100e8(0x23d)]();return new _0x4c18b9(_0x48d1ce,_0x355605,_0x53b994,_0x187c50);}else return this[_0xb100e8(0x240)]();}else{if(_0x551ab9===_0xb100e8(0x2c7))return this[_0xb100e8(0x33a)]();else{if(_0x551ab9===_0xb100e8(0x2cb)){if(_0xb100e8(0x2ef)!==_0xb100e8(0x20d))return this[_0xb100e8(0x2e1)]();else{const _0x1fe4b3=_0x39dd3f[_0xb100e8(0x217)][_0xb100e8(0x24a)]();if(['thinTop',_0xb100e8(0x1f8)][_0xb100e8(0x33e)](_0x1fe4b3))return this[_0xb100e8(0x27d)]?this[_0xb100e8(0x20a)]():0x4;else return _0x1fe4b3!=='default'?_0x4523ba[_0xb100e8(0x206)][_0xb100e8(0x264)][_0xb100e8(0x2c1)][_0xb100e8(0x1d2)]:_0x11d559[_0xb100e8(0x225)]['maxCols'][_0xb100e8(0x2fe)](this);}}else{if(_0x551ab9==='thinBottom')return this[_0xb100e8(0x220)]();else{if(_0x551ab9==='mobile'){if(_0xb100e8(0x226)===_0xb100e8(0x226))return this['commandWindowRectMobileStyle']();else{const _0x249af7=_0x229cc2['boxWidth'],_0x539ce6=this[_0xb100e8(0x29f)]()-this[_0xb100e8(0x274)]['height']-this[_0xb100e8(0x2ca)][_0xb100e8(0x259)],_0x28c4a9=0x0,_0x503893=this[_0xb100e8(0x274)]['y']+this[_0xb100e8(0x274)][_0xb100e8(0x259)];return new _0x26276c(_0x28c4a9,_0x503893,_0x249af7,_0x539ce6);}}else{if('BaYJk'!==_0xb100e8(0x34d)){const _0x474187=this[_0xb100e8(0x24b)];_0x474187[_0xb100e8(0x26a)](_0x1e7583,0x0,_0x3c47c1['y'],_0x474187[_0xb100e8(0x254)],_0xb100e8(0x1d1));}else{const _0x1c6b35=VisuMZ[_0xb100e8(0x206)][_0xb100e8(0x290)][_0xb100e8(0x2fe)](this);return this['adjustDefaultCommandWindowRect'](_0x1c6b35),_0x1c6b35;}}}}}}},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x280)]=function(_0x381653){const _0x368ff4=_0x4aacb4;this[_0x368ff4(0x318)]()&&(_0x381653[_0x368ff4(0x259)]-=this[_0x368ff4(0x2a4)]()[_0x368ff4(0x259)]),this['adjustCommandHeightByVariable']()&&(_0x381653[_0x368ff4(0x259)]-=this[_0x368ff4(0x33f)]()[_0x368ff4(0x259)]);},Scene_Menu[_0x4aacb4(0x225)]['commandWindowRectTopStyle']=function(){const _0x47f54b=_0x4aacb4,_0x23deef=VisuMZ[_0x47f54b(0x206)][_0x47f54b(0x264)]['CustomCmdWin'][_0x47f54b(0x30b)],_0x3c8584=Graphics[_0x47f54b(0x219)],_0x1e55f9=this[_0x47f54b(0x305)](_0x23deef,!![]),_0x3c2760=0x0,_0x50323f=this[_0x47f54b(0x23d)]();return new Rectangle(_0x3c2760,_0x50323f,_0x3c8584,_0x1e55f9);},Scene_Menu[_0x4aacb4(0x225)]['commandWindowRectThinTopStyle']=function(){const _0x363626=_0x4aacb4,_0x55a087=VisuMZ[_0x363626(0x206)]['Settings'][_0x363626(0x2c1)][_0x363626(0x30b)],_0x1895b2=Graphics[_0x363626(0x219)],_0x1386ae=this[_0x363626(0x305)](0x1,!![]),_0x30be2f=0x0,_0x26cfd7=this[_0x363626(0x23d)]();return new Rectangle(_0x30be2f,_0x26cfd7,_0x1895b2,_0x1386ae);},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x2e1)]=function(){const _0x4bb762=_0x4aacb4,_0x4fcc13=VisuMZ[_0x4bb762(0x206)][_0x4bb762(0x264)]['CustomCmdWin'][_0x4bb762(0x30b)],_0x33c897=Graphics[_0x4bb762(0x219)],_0x1b63d9=this[_0x4bb762(0x305)](_0x4fcc13,!![]),_0x5337fd=0x0,_0x8acdea=this[_0x4bb762(0x24c)]()-_0x1b63d9;return new Rectangle(_0x5337fd,_0x8acdea,_0x33c897,_0x1b63d9);},Scene_Menu['prototype'][_0x4aacb4(0x220)]=function(){const _0x5f066e=_0x4aacb4,_0x14f9c1=VisuMZ['MainMenuCore'][_0x5f066e(0x264)]['CustomCmdWin'][_0x5f066e(0x30b)],_0x1f8265=Graphics[_0x5f066e(0x219)],_0x1b390e=this['calcWindowHeight'](0x1,!![]),_0x2da6db=0x0,_0xb3fcea=this[_0x5f066e(0x24c)]()-_0x1b390e;return new Rectangle(_0x2da6db,_0xb3fcea,_0x1f8265,_0x1b390e);},Scene_Menu[_0x4aacb4(0x225)]['commandWindowRectMobileStyle']=function(){const _0x850c21=_0x4aacb4,_0x557aaa=VisuMZ[_0x850c21(0x206)][_0x850c21(0x264)]['CustomCmdWin'][_0x850c21(0x30b)],_0x13114f=Graphics[_0x850c21(0x219)],_0x3d7fd5=Window_MenuCommand[_0x850c21(0x225)][_0x850c21(0x295)](_0x557aaa),_0x19df87=0x0,_0x2a7c86=Math[_0x850c21(0x253)]((Graphics[_0x850c21(0x2dd)]-_0x3d7fd5)/0x2);return new Rectangle(_0x19df87,_0x2a7c86,_0x13114f,_0x3d7fd5);},Scene_Menu['prototype'][_0x4aacb4(0x24a)]=function(){const _0x147829=_0x4aacb4;return VisuMZ['MainMenuCore'][_0x147829(0x264)][_0x147829(0x2ad)];},Scene_Menu['prototype'][_0x4aacb4(0x1dd)]=function(){const _0x36caa7=_0x4aacb4;if(this[_0x36caa7(0x24a)]()!==_0x36caa7(0x31a))return!![];return VisuMZ[_0x36caa7(0x206)][_0x36caa7(0x264)][_0x36caa7(0x2b0)][_0x36caa7(0x334)];},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x214)]=function(){const _0x7133cb=_0x4aacb4,_0x1ef6d1=this[_0x7133cb(0x2a9)]();this[_0x7133cb(0x2ca)]=this['thinGoldWindow']()?new Window_ThinGold(_0x1ef6d1):new Window_Gold(_0x1ef6d1),this[_0x7133cb(0x218)](this[_0x7133cb(0x2ca)]);},VisuMZ[_0x4aacb4(0x206)][_0x4aacb4(0x2ea)]=Scene_Menu['prototype'][_0x4aacb4(0x2a9)],Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x2a9)]=function(){const _0x27e0b5=_0x4aacb4,_0x475e09=this[_0x27e0b5(0x24a)]();if([_0x27e0b5(0x1c8),_0x27e0b5(0x2c7),_0x27e0b5(0x1e3)][_0x27e0b5(0x33e)](_0x475e09))return this[_0x27e0b5(0x1da)]();else{if(['bottom',_0x27e0b5(0x1f8)][_0x27e0b5(0x33e)](_0x475e09)){if('lauqx'!==_0x27e0b5(0x2c4))return this[_0x27e0b5(0x1c9)]();else _0x1df999['reserveCommonEvent'](_0x1107ad),this[_0x27e0b5(0x32d)]();}else{if(_0x27e0b5(0x23b)===_0x27e0b5(0x23b)){const _0x42a7cc=VisuMZ['MainMenuCore']['Scene_Menu_goldWindowRect'][_0x27e0b5(0x2fe)](this);return this[_0x27e0b5(0x308)](_0x42a7cc),_0x42a7cc;}else this['changePaintOpacity'](_0x30f5cf[_0x27e0b5(0x2d0)]());}}},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x308)]=function(_0x4dbb38){const _0x45fd63=_0x4aacb4;if(this['thinGoldWindow']()){if(VisuMZ[_0x45fd63(0x206)][_0x45fd63(0x264)][_0x45fd63(0x2b0)]['AutoGoldY']){if(_0x45fd63(0x2dc)!==_0x45fd63(0x231)){const _0x4828c5=_0x4dbb38[_0x45fd63(0x259)]-this[_0x45fd63(0x305)](0x1,![]);_0x4dbb38['y']+=_0x4828c5;}else return this[_0x45fd63(0x2af)]()&&(_0x507c9b[_0x45fd63(0x206)][_0x45fd63(0x264)][_0x45fd63(0x210)][_0x45fd63(0x255)]??!![]);}VisuMZ[_0x45fd63(0x206)][_0x45fd63(0x264)]['General']['AutoGoldHeight']&&(_0x4dbb38[_0x45fd63(0x259)]=this[_0x45fd63(0x305)](0x1,![]));}},Scene_Menu[_0x4aacb4(0x225)]['goldWindowRectTopStyle']=function(){const _0x49fa16=_0x4aacb4,_0x4bbf9f=this['mainCommandWidth'](),_0x17a323=this['calcWindowHeight'](0x1,![]),_0x2eb329=Graphics['boxWidth']-_0x4bbf9f,_0x183357=this[_0x49fa16(0x24c)]()-_0x17a323;return new Rectangle(_0x2eb329,_0x183357,_0x4bbf9f,_0x17a323);},Scene_Menu[_0x4aacb4(0x225)]['goldWindowRectBottomStyle']=function(){const _0xbf47c=_0x4aacb4,_0x5f1414=this[_0xbf47c(0x232)](),_0x7df555=this[_0xbf47c(0x305)](0x1,![]),_0x4b2d01=Graphics[_0xbf47c(0x219)]-_0x5f1414,_0x399d0c=this[_0xbf47c(0x23d)]();return new Rectangle(_0x4b2d01,_0x399d0c,_0x5f1414,_0x7df555);},VisuMZ['MainMenuCore'][_0x4aacb4(0x261)]=Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x1f9)],Scene_Menu['prototype'][_0x4aacb4(0x1f9)]=function(){const _0x5d9a78=_0x4aacb4;VisuMZ[_0x5d9a78(0x206)][_0x5d9a78(0x261)]['call'](this),this[_0x5d9a78(0x200)]();},Scene_Menu['prototype'][_0x4aacb4(0x200)]=function(){const _0x1278bd=_0x4aacb4;this[_0x1278bd(0x24a)]()===_0x1278bd(0x1e3)&&('rYgHd'!=='Lusvo'?this[_0x1278bd(0x27c)]['openness']=0x0:_0x5aa138[_0x1278bd(0x286)](_0xcf1fe2));},VisuMZ[_0x4aacb4(0x206)]['Scene_Menu_statusWindowRect']=Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x268)],Scene_Menu[_0x4aacb4(0x225)]['statusWindowRect']=function(){const _0x4db047=_0x4aacb4,_0x3035c9=this[_0x4db047(0x24a)]();if([_0x4db047(0x1c8),_0x4db047(0x2c7)][_0x4db047(0x33e)](_0x3035c9))return this[_0x4db047(0x2cd)]();else{if([_0x4db047(0x2cb),_0x4db047(0x1f8)][_0x4db047(0x33e)](_0x3035c9)){if(_0x4db047(0x2ce)===_0x4db047(0x2ce))return this[_0x4db047(0x30c)]();else{const _0x5d7a95=this['mainCommandWidth'](),_0x173469=this[_0x4db047(0x305)](0x1,![]),_0x5b422f=0x0,_0x227422=this[_0x4db047(0x24c)]()-_0x173469;return new _0x3210a4(_0x5b422f,_0x227422,_0x5d7a95,_0x173469);}}else return _0x3035c9===_0x4db047(0x1e3)?this[_0x4db047(0x352)]():VisuMZ['MainMenuCore'][_0x4db047(0x2b5)][_0x4db047(0x2fe)](this);}},Scene_Menu['prototype'][_0x4aacb4(0x2cd)]=function(){const _0x36d38f=_0x4aacb4,_0x3fc666=Graphics[_0x36d38f(0x219)],_0x4606a7=this[_0x36d38f(0x29f)]()-this[_0x36d38f(0x274)][_0x36d38f(0x259)]-this[_0x36d38f(0x2ca)]['height'],_0x162501=0x0,_0x42836c=this['_commandWindow']['y']+this[_0x36d38f(0x274)][_0x36d38f(0x259)];return new Rectangle(_0x162501,_0x42836c,_0x3fc666,_0x4606a7);},Scene_Menu[_0x4aacb4(0x225)]['statusWindowRectBottomStyle']=function(){const _0x303e46=_0x4aacb4,_0xd383b6=Graphics[_0x303e46(0x219)],_0x11bb6e=this[_0x303e46(0x29f)]()-this[_0x303e46(0x274)][_0x303e46(0x259)]-this[_0x303e46(0x2ca)][_0x303e46(0x259)],_0x47b40c=0x0,_0x6d8e51=this[_0x303e46(0x2ca)]['y']+this[_0x303e46(0x2ca)][_0x303e46(0x259)];return new Rectangle(_0x47b40c,_0x6d8e51,_0xd383b6,_0x11bb6e);},Scene_Menu[_0x4aacb4(0x225)]['statusWindowRectMobileStyle']=function(){const _0x4e6ac0=_0x4aacb4,_0x282891=Graphics[_0x4e6ac0(0x219)],_0x1e5914=this[_0x4e6ac0(0x29f)]()-this['_goldWindow'][_0x4e6ac0(0x259)],_0x1e63cd=0x0,_0x1737e1=this[_0x4e6ac0(0x24c)]()-this[_0x4e6ac0(0x2ca)][_0x4e6ac0(0x259)]-_0x1e5914;return new Rectangle(_0x1e63cd,_0x1737e1,_0x282891,_0x1e5914);},Scene_Menu['prototype'][_0x4aacb4(0x2fc)]=function(){const _0xfad6d8=_0x4aacb4;if(!this['canCreatePlaytimeWindow']())return new Rectangle(0x0,0x0,0x0,0x0);const _0x22ebcf=this[_0xfad6d8(0x2a4)]();this[_0xfad6d8(0x2e9)]=new Window_Playtime(_0x22ebcf),this['_playtimeWindow']['setBackgroundType'](VisuMZ[_0xfad6d8(0x206)][_0xfad6d8(0x264)][_0xfad6d8(0x34b)][_0xfad6d8(0x1cc)]),this[_0xfad6d8(0x218)](this[_0xfad6d8(0x2e9)]);},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x303)]=function(){const _0xd5accd=_0x4aacb4;return VisuMZ[_0xd5accd(0x206)][_0xd5accd(0x264)]['Playtime'][_0xd5accd(0x2d4)];},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x318)]=function(){const _0x2b4d20=_0x4aacb4;return this[_0x2b4d20(0x303)]()&&(VisuMZ[_0x2b4d20(0x206)][_0x2b4d20(0x264)][_0x2b4d20(0x34b)][_0x2b4d20(0x255)]??!![]);},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x2a4)]=function(){const _0x2da196=_0x4aacb4,_0x24e4f2=this['commandWindowStyle']();if([_0x2da196(0x1c8),'thinTop',_0x2da196(0x1e3)][_0x2da196(0x33e)](_0x24e4f2))return this['playtimeWindowRectTopStyle']();else return['bottom',_0x2da196(0x1f8)]['includes'](_0x24e4f2)?this['playtimeWindowRectBottomStyle']():VisuMZ[_0x2da196(0x206)]['Settings'][_0x2da196(0x34b)][_0x2da196(0x29e)][_0x2da196(0x2fe)](this);},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x319)]=function(){const _0x3ba3f7=this['mainCommandWidth'](),_0x4f3191=this['calcWindowHeight'](0x1,![]),_0x5544c2=0x0,_0x222265=this['mainAreaBottom']()-_0x4f3191;return new Rectangle(_0x5544c2,_0x222265,_0x3ba3f7,_0x4f3191);},Scene_Menu['prototype'][_0x4aacb4(0x24e)]=function(){const _0x2a71a4=_0x4aacb4,_0x4f15e9=this[_0x2a71a4(0x232)](),_0xab68e3=this[_0x2a71a4(0x305)](0x1,![]),_0x58b778=0x0,_0x576acf=this[_0x2a71a4(0x23d)]();return new Rectangle(_0x58b778,_0x576acf,_0x4f15e9,_0xab68e3);},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x348)]=function(){const _0x3cb364=_0x4aacb4;if(!this[_0x3cb364(0x2af)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x94dfd6=this[_0x3cb364(0x33f)]();this['_variableWindow']=new Window_MenuVariables(_0x94dfd6),this['_variableWindow']['setBackgroundType'](VisuMZ[_0x3cb364(0x206)][_0x3cb364(0x264)][_0x3cb364(0x210)]['BgType']),this[_0x3cb364(0x218)](this[_0x3cb364(0x273)]);},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x2af)]=function(){const _0x2a835b=_0x4aacb4;return VisuMZ[_0x2a835b(0x206)][_0x2a835b(0x264)][_0x2a835b(0x210)]['Enable'];},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x216)]=function(){const _0x185c3f=_0x4aacb4;return this['canCreateVariableWindow']()&&(VisuMZ['MainMenuCore'][_0x185c3f(0x264)][_0x185c3f(0x210)]['AdjustCommandHeight']??!![]);},Scene_Menu['prototype'][_0x4aacb4(0x33f)]=function(){const _0x2a1328=_0x4aacb4,_0x2110da=this[_0x2a1328(0x24a)]();if(['top',_0x2a1328(0x2c7),_0x2a1328(0x1e3)][_0x2a1328(0x33e)](_0x2110da)){if(_0x2a1328(0x246)==='oUGub'){if(!this[_0x2a1328(0x303)]())return new _0x59069f(0x0,0x0,0x0,0x0);const _0x2f24cd=this['playtimeWindowRect']();this[_0x2a1328(0x2e9)]=new _0x45c1f1(_0x2f24cd),this['_playtimeWindow']['setBackgroundType'](_0x58cb37['MainMenuCore'][_0x2a1328(0x264)][_0x2a1328(0x34b)][_0x2a1328(0x1cc)]),this[_0x2a1328(0x218)](this[_0x2a1328(0x2e9)]);}else return this[_0x2a1328(0x1f6)]();}else{if([_0x2a1328(0x2cb),'thinBottom'][_0x2a1328(0x33e)](_0x2110da)){if(_0x2a1328(0x1e1)!==_0x2a1328(0x1e1)){const _0x4edab9=_0x25c3be['MainMenuCore'][_0x2a1328(0x264)][_0x2a1328(0x2c1)][_0x2a1328(0x30b)],_0x543c2d=_0x1c54d6[_0x2a1328(0x219)],_0x17735f=this['calcWindowHeight'](_0x4edab9,!![]),_0x8da046=0x0,_0x4982de=this[_0x2a1328(0x24c)]()-_0x17735f;return new _0x4f99d3(_0x8da046,_0x4982de,_0x543c2d,_0x17735f);}else return this[_0x2a1328(0x263)]();}else return VisuMZ[_0x2a1328(0x206)][_0x2a1328(0x264)]['Variable'][_0x2a1328(0x29e)]['call'](this);}},Scene_Menu['prototype'][_0x4aacb4(0x1f6)]=function(){const _0x42256c=_0x4aacb4,_0x380f5d=Graphics['boxWidth']-this[_0x42256c(0x2ca)]['width']-(this[_0x42256c(0x2e9)]?this[_0x42256c(0x2e9)][_0x42256c(0x1ce)]:0x0),_0x5ea106=this[_0x42256c(0x305)](0x1,![]),_0x3e8fd2=this[_0x42256c(0x2ca)]['x']-_0x380f5d,_0x69760b=this['mainAreaBottom']()-_0x5ea106;return new Rectangle(_0x3e8fd2,_0x69760b,_0x380f5d,_0x5ea106);},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x263)]=function(){const _0x19743e=_0x4aacb4,_0x5c8471=Graphics[_0x19743e(0x219)]-this[_0x19743e(0x2ca)]['width']-(this[_0x19743e(0x2e9)]?this['_playtimeWindow'][_0x19743e(0x1ce)]:0x0),_0x4c54b1=this['calcWindowHeight'](0x1,![]),_0x4e264f=this['_goldWindow']['x']-_0x5c8471,_0x7c7c4f=this[_0x19743e(0x23d)]();return new Rectangle(_0x4e264f,_0x7c7c4f,_0x5c8471,_0x4c54b1);},Scene_Menu[_0x4aacb4(0x225)]['createDummyWindow']=function(){const _0x2b4317=_0x4aacb4;if(!this[_0x2b4317(0x31c)]())return;const _0x429d14=this[_0x2b4317(0x33f)]();this['_dummyWindow']=new Window_Base(_0x429d14),this['_dummyWindow']['setBackgroundType'](VisuMZ[_0x2b4317(0x206)]['Settings'][_0x2b4317(0x210)][_0x2b4317(0x1cc)]),this['addWindow'](this['_dummyWindow']);},Scene_Menu['prototype'][_0x4aacb4(0x31c)]=function(){const _0x65ea1=_0x4aacb4;if([_0x65ea1(0x31a),_0x65ea1(0x1e3)][_0x65ea1(0x33e)](this['commandWindowStyle']()))return![];if(this[_0x65ea1(0x273)])return![];return!![];},VisuMZ[_0x4aacb4(0x206)][_0x4aacb4(0x2fa)]=Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x1d0)],Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x1d0)]=function(){const _0x3599c4=_0x4aacb4;if(this['isSoloQuickMode']()&&this[_0x3599c4(0x27c)])$gameParty[_0x3599c4(0x353)]($gameParty[_0x3599c4(0x2c0)]()[0x0]),this['onPersonalOk']();else{if(_0x3599c4(0x209)!==_0x3599c4(0x1fe)){if(this[_0x3599c4(0x24a)]()===_0x3599c4(0x1e3))this[_0x3599c4(0x27c)][_0x3599c4(0x2a2)]();VisuMZ[_0x3599c4(0x206)][_0x3599c4(0x2fa)]['call'](this);}else{const _0xfa46d0=this[_0x3599c4(0x24b)],_0x11014d=_0x1cce12[_0x3599c4(0x327)](),_0x5c31a7=_0x39acf5['x']+_0x4f022d[_0x3599c4(0x33c)](_0x2e1413[_0x3599c4(0x1ce)]/0x2)+_0x11014d;_0xfa46d0['x']=_0xfa46d0['width']/-0x2+_0x5c31a7,_0xfa46d0['y']=_0x1e9252[_0x3599c4(0x33c)](_0x73dd86[_0x3599c4(0x259)]/0x4);}}},Scene_Menu['prototype'][_0x4aacb4(0x1db)]=function(){const _0x4230d6=_0x4aacb4;return VisuMZ[_0x4230d6(0x206)][_0x4230d6(0x264)][_0x4230d6(0x2b0)][_0x4230d6(0x26e)]&&$gameParty[_0x4230d6(0x2c0)]()[_0x4230d6(0x326)]<=0x1;},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x2e5)]=function(){const _0x5ecd0b=_0x4aacb4,_0x306cdb=this['_commandWindow'][_0x5ecd0b(0x1d9)](),_0x48a1e4=this[_0x5ecd0b(0x274)]['currentExt']();for(const _0xae49ca of Window_MenuCommand[_0x5ecd0b(0x298)]){if(_0xae49ca['Symbol']===_0x306cdb){_0xae49ca[_0x5ecd0b(0x2b1)][_0x5ecd0b(0x2fe)](this,_0x48a1e4);return;}}},VisuMZ[_0x4aacb4(0x206)][_0x4aacb4(0x1fc)]=Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x329)],Scene_Menu['prototype'][_0x4aacb4(0x329)]=function(){const _0x313cc9=_0x4aacb4;VisuMZ[_0x313cc9(0x206)][_0x313cc9(0x1fc)][_0x313cc9(0x2fe)](this);if(this[_0x313cc9(0x24a)]()===_0x313cc9(0x1e3))this[_0x313cc9(0x27c)]['close']();},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x283)]=function(){const _0xe0b53e=_0x4aacb4,_0x2324fd=parseInt(this[_0xe0b53e(0x274)][_0xe0b53e(0x1d5)]());_0x2324fd?($gameTemp[_0xe0b53e(0x310)](_0x2324fd),this[_0xe0b53e(0x32d)]()):this[_0xe0b53e(0x274)][_0xe0b53e(0x228)]();},VisuMZ[_0x4aacb4(0x206)]['Scene_Menu_commandFormation']=Scene_Menu['prototype'][_0x4aacb4(0x1eb)],Scene_Menu['prototype'][_0x4aacb4(0x1eb)]=function(){const _0x129238=_0x4aacb4;VisuMZ[_0x129238(0x206)][_0x129238(0x335)]['call'](this);if(this[_0x129238(0x24a)]()===_0x129238(0x1e3))this[_0x129238(0x27c)][_0x129238(0x2a2)]();},VisuMZ[_0x4aacb4(0x206)][_0x4aacb4(0x309)]=Scene_Menu['prototype'][_0x4aacb4(0x30d)],Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x30d)]=function(){const _0x2f3641=_0x4aacb4;VisuMZ[_0x2f3641(0x206)][_0x2f3641(0x309)]['call'](this);if(this[_0x2f3641(0x24a)]()==='mobile')this[_0x2f3641(0x27c)][_0x2f3641(0x245)]();},Scene_Menu[_0x4aacb4(0x225)][_0x4aacb4(0x272)]=function(){const _0x448d12=_0x4aacb4;SceneManager[_0x448d12(0x286)](Scene_Load);};function Sprite_MenuBackgroundActor(){const _0x4c9d7d=_0x4aacb4;this[_0x4c9d7d(0x1df)](...arguments);}Sprite_MenuBackgroundActor['prototype']=Object['create'](Sprite[_0x4aacb4(0x225)]),Sprite_MenuBackgroundActor[_0x4aacb4(0x225)][_0x4aacb4(0x243)]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x4aacb4(0x225)][_0x4aacb4(0x1df)]=function(){const _0x4c6d12=_0x4aacb4;this['_actor']=null,this[_0x4c6d12(0x2f1)]=![],Sprite[_0x4c6d12(0x225)][_0x4c6d12(0x1df)][_0x4c6d12(0x2fe)](this),this['x']=Graphics[_0x4c6d12(0x1ce)];},Sprite_MenuBackgroundActor['prototype'][_0x4aacb4(0x2ee)]=function(_0x219f21){const _0xf6c49b=_0x4aacb4;this[_0xf6c49b(0x2e3)]!==_0x219f21&&(this[_0xf6c49b(0x2e3)]=_0x219f21,this[_0xf6c49b(0x32b)]());},Sprite_MenuBackgroundActor['prototype']['loadBitmap']=function(){const _0x328c12=_0x4aacb4;this[_0x328c12(0x2f1)]=![],this[_0x328c12(0x2e3)]?(this[_0x328c12(0x1c1)]=ImageManager[_0x328c12(0x1cf)](this[_0x328c12(0x2e3)][_0x328c12(0x27b)]()),this[_0x328c12(0x1c1)][_0x328c12(0x330)](this['onBitmapLoad'][_0x328c12(0x1d7)](this))):this['bitmap']=new Bitmap(0x1,0x1);},Sprite_MenuBackgroundActor[_0x4aacb4(0x225)][_0x4aacb4(0x237)]=function(){const _0x57a64b=_0x4aacb4;this[_0x57a64b(0x2f1)]=!![],VisuMZ[_0x57a64b(0x206)][_0x57a64b(0x264)][_0x57a64b(0x2b0)][_0x57a64b(0x230)]['call'](this);},Sprite_MenuBackgroundActor[_0x4aacb4(0x225)][_0x4aacb4(0x26c)]=function(){const _0x2c777f=_0x4aacb4;Sprite[_0x2c777f(0x225)]['update'][_0x2c777f(0x2fe)](this),this[_0x2c777f(0x2f1)]&&(this['updateOpacity'](),this[_0x2c777f(0x1d4)](),this[_0x2c777f(0x278)]());},Sprite_MenuBackgroundActor[_0x4aacb4(0x225)]['updateOpacity']=function(){const _0x34d7fa=_0x4aacb4;if(this['_duration']>0x0){const _0x106b17=this['_duration'];this[_0x34d7fa(0x315)]=(this[_0x34d7fa(0x315)]*(_0x106b17-0x1)+0xff)/_0x106b17;}},Sprite_MenuBackgroundActor[_0x4aacb4(0x225)][_0x4aacb4(0x1d4)]=function(){const _0x4e7158=_0x4aacb4;if(this[_0x4e7158(0x1c4)]>0x0){if(_0x4e7158(0x265)===_0x4e7158(0x265)){const _0x24f28f=this['_duration'];this['x']=(this['x']*(_0x24f28f-0x1)+this[_0x4e7158(0x31e)])/_0x24f28f,this['y']=(this['y']*(_0x24f28f-0x1)+this[_0x4e7158(0x24f)])/_0x24f28f;}else _0x1d12f1['MainMenuCore'][_0x4e7158(0x284)]['call'](this,_0x2e9367),this[_0x4e7158(0x2b8)](_0x4a302e);}},Sprite_MenuBackgroundActor[_0x4aacb4(0x225)][_0x4aacb4(0x278)]=function(){const _0x513227=_0x4aacb4;if(this[_0x513227(0x1c4)]>0x0)this[_0x513227(0x1c4)]--;},ImageManager[_0x4aacb4(0x1c0)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x4aacb4(0x22a)]=ImageManager[_0x4aacb4(0x22a)]||0x6,Window_Base['prototype'][_0x4aacb4(0x20e)]=function(_0x279e89,_0x2f557d,_0x4d2739){const _0x228ba1=_0x4aacb4,_0x3ffa48=_0x279e89[_0x228ba1(0x28e)](/\$/i),_0x42102c=ImageManager['loadSvActor'](_0x279e89),_0x5f07b1=_0x42102c[_0x228ba1(0x1ce)]/(_0x3ffa48?0x1:ImageManager[_0x228ba1(0x1c0)]),_0x51ecc8=_0x42102c[_0x228ba1(0x259)]/(_0x3ffa48?0x1:ImageManager[_0x228ba1(0x22a)]),_0x2b3f00=0x0,_0x1c3861=0x0;this[_0x228ba1(0x2ab)]['blt'](_0x42102c,_0x2b3f00,_0x1c3861,_0x5f07b1,_0x51ecc8,_0x2f557d-_0x5f07b1/0x2,_0x4d2739-_0x51ecc8);},Window_MenuCommand[_0x4aacb4(0x298)]=VisuMZ[_0x4aacb4(0x206)]['Settings'][_0x4aacb4(0x346)],VisuMZ[_0x4aacb4(0x206)]['Window_MenuCommand_initialize']=Window_MenuCommand['prototype']['initialize'],Window_MenuCommand['prototype'][_0x4aacb4(0x1df)]=function(_0x2c2f50){const _0xd68af4=_0x4aacb4;VisuMZ[_0xd68af4(0x206)][_0xd68af4(0x284)][_0xd68af4(0x2fe)](this,_0x2c2f50),this[_0xd68af4(0x2b8)](_0x2c2f50);},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x2b8)]=function(_0x271640){const _0x21c6e3=_0x4aacb4,_0xdd3557=new Rectangle(0x0,0x0,_0x271640[_0x21c6e3(0x1ce)],_0x271640[_0x21c6e3(0x259)]);this[_0x21c6e3(0x24b)]=new Window_Base(_0xdd3557),this[_0x21c6e3(0x24b)][_0x21c6e3(0x315)]=0x0,this[_0x21c6e3(0x2a0)](this[_0x21c6e3(0x24b)]),this[_0x21c6e3(0x1ec)]();},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x299)]=function(){const _0x17ea6a=_0x4aacb4;Window_HorzCommand[_0x17ea6a(0x225)][_0x17ea6a(0x299)]['call'](this);if(this[_0x17ea6a(0x24b)])this[_0x17ea6a(0x1ec)]();},Window_MenuCommand['prototype'][_0x4aacb4(0x1ec)]=function(){const _0x1cc5f7=_0x4aacb4,_0xcbc3f1=this[_0x1cc5f7(0x24b)];_0xcbc3f1[_0x1cc5f7(0x2ab)][_0x1cc5f7(0x2a6)]();const _0x209699=this[_0x1cc5f7(0x1f4)](this[_0x1cc5f7(0x21d)]());if(_0x209699==='icon'){const _0x19e734=this[_0x1cc5f7(0x2f5)](this['index']());let _0x1bbdea=this[_0x1cc5f7(0x222)](this[_0x1cc5f7(0x21d)]());_0x1bbdea=_0x1bbdea[_0x1cc5f7(0x2fd)](/\\I\[(\d+)\]/gi,''),_0xcbc3f1[_0x1cc5f7(0x300)](),this[_0x1cc5f7(0x2e4)](_0x1bbdea,_0x19e734),this[_0x1cc5f7(0x276)](_0x1bbdea,_0x19e734),this[_0x1cc5f7(0x204)](_0x1bbdea,_0x19e734);}},Window_MenuCommand[_0x4aacb4(0x225)]['commandNameWindowDrawBackground']=function(_0x48da9b,_0x494f51){},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x276)]=function(_0x419e46,_0x35a86d){const _0x5a5cc2=_0x4aacb4,_0x5aa7f9=this[_0x5a5cc2(0x24b)];_0x5aa7f9['drawText'](_0x419e46,0x0,_0x35a86d['y'],_0x5aa7f9['innerWidth'],_0x5a5cc2(0x1d1));},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x204)]=function(_0x5d4371,_0xa4e7b4){const _0x4f2cec=_0x4aacb4,_0x430258=this['_commandNameWindow'],_0x2a4a2e=$gameSystem['windowPadding'](),_0x51c6fb=_0xa4e7b4['x']+Math[_0x4f2cec(0x33c)](_0xa4e7b4['width']/0x2)+_0x2a4a2e;_0x430258['x']=_0x430258[_0x4f2cec(0x1ce)]/-0x2+_0x51c6fb,_0x430258['y']=Math[_0x4f2cec(0x33c)](_0xa4e7b4[_0x4f2cec(0x259)]/0x4);},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x250)]=function(){const _0x5d07b6=_0x4aacb4,_0x2aadd4=SceneManager[_0x5d07b6(0x217)][_0x5d07b6(0x24a)]();if(_0x2aadd4===_0x5d07b6(0x1e3)){const _0x42424f=VisuMZ[_0x5d07b6(0x206)][_0x5d07b6(0x264)]['CustomCmdWin'][_0x5d07b6(0x1cb)];return this[_0x5d07b6(0x355)]()*_0x42424f+0x8;}else{if(_0x5d07b6(0x2f4)!==_0x5d07b6(0x2f4)){const _0xc4e292=this[_0x5d07b6(0x30f)]();switch(_0xc4e292){case _0x5d07b6(0x302):case _0x5d07b6(0x27f):return 0x1;case _0x5d07b6(0x28c):return 0x1;default:return _0x5e1d1d[_0x5d07b6(0x2f8)]();}}else return Window_Command[_0x5d07b6(0x225)][_0x5d07b6(0x250)][_0x5d07b6(0x2fe)](this);}},Window_MenuCommand['prototype']['makeCommandList']=function(){const _0x575e1c=_0x4aacb4;this[_0x575e1c(0x28b)]();},Window_MenuCommand['prototype'][_0x4aacb4(0x28b)]=function(){const _0x202e2e=_0x4aacb4;for(const _0xb53e24 of Window_MenuCommand[_0x202e2e(0x298)]){const _0x230dd3=_0xb53e24[_0x202e2e(0x279)];if(this['isMainMenuCommandVisible'](_0x230dd3,_0xb53e24)){if(_0x202e2e(0x31b)!==_0x202e2e(0x31b)){const _0x469081=_0x3db54c['loadPicture'](_0x445f9a[_0x202e2e(0x27b)]());_0x23c7b1=(_0x17628d||_0x4d630f[_0x202e2e(0x2e2)])-0x2,_0x521469=(_0x1d3809||_0x66bd8d[_0x202e2e(0x1de)])-0x2;const _0x5b2999=_0x469081['width'],_0x56d388=_0x469081['height'],_0x4741fc=_0x1dc477,_0x12e2b9=_0x37c81f-0x2,_0x121aeb=_0x14eda3+_0x1256d3[_0x202e2e(0x33c)](_0x4741fc/0x2),_0x261321=_0x575886+_0x4f6842[_0x202e2e(0x291)]((_0x146f70+_0x56d388)/0x2);this[_0x202e2e(0x243)]===_0x371c3b&&this['changePaintOpacity'](_0xa2db73[_0x202e2e(0x2d0)]());const _0x5d2602=_0x732160[_0x202e2e(0x25c)](_0x38bd11,_0x5b2999),_0xbebd80=_0x4ebf3c[_0x202e2e(0x25c)](_0x3d3641,_0x56d388),_0x5969fa=_0x54918c+0x1,_0x140a47=_0x19388c[_0x202e2e(0x2d6)](_0x1bbc81+0x1,_0x1c52a5+_0x12e2b9-_0x56d388+0x3);let _0x11d44c=_0x2877a8[_0x202e2e(0x253)]((_0x5b2999-_0x5d2602)/0x2),_0x2ae90f=_0x34d38d[_0x202e2e(0x253)]((_0x56d388-_0xbebd80)/0x2);_0x11d44c-=_0x3e3a4d['getMenuImageOffsetX'](),_0x2ae90f-=_0x52d734[_0x202e2e(0x23e)]();if(_0x692ad4[_0x202e2e(0x304)]){if(_0x54edc4[_0x202e2e(0x236)][_0x202e2e(0x264)][_0x202e2e(0x356)][_0x202e2e(0x1f2)]){}}this['contents'][_0x202e2e(0x256)](_0x469081,_0x11d44c,_0x2ae90f,_0x5d2602,_0xbebd80,_0x5969fa,_0x140a47),this[_0x202e2e(0x1f3)](!![]);}else{let _0xae3aa2=_0xb53e24['TextStr'];if(['',_0x202e2e(0x2e0)][_0x202e2e(0x33e)](_0xae3aa2))_0xae3aa2=_0xb53e24[_0x202e2e(0x32c)][_0x202e2e(0x2fe)](this);const _0x1f8028=_0xb53e24[_0x202e2e(0x2b7)];_0x1f8028>0x0&&this[_0x202e2e(0x2df)]()!=='text'&&(_0xae3aa2=_0x202e2e(0x32a)[_0x202e2e(0x281)](_0x1f8028,_0xae3aa2));const _0x5a9975=this['isMainMenuCommandEnabled'](_0x230dd3,_0xb53e24),_0x581e9b=_0xb53e24[_0x202e2e(0x242)][_0x202e2e(0x2fe)](this);this[_0x202e2e(0x2d7)](_0xae3aa2,_0x230dd3,_0x5a9975,_0x581e9b),this['setHandler'](_0x230dd3,_0xb53e24[_0x202e2e(0x313)][_0x202e2e(0x1d7)](this,_0x581e9b));}}this[_0x202e2e(0x2c8)](_0x230dd3);}},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x29a)]=function(_0x2557cb,_0x2f9b1e){const _0x5ce29c=_0x4aacb4;if($gameSystem[_0x5ce29c(0x271)](_0x2557cb,_0x5ce29c(0x2ec)))return!![];if($gameSystem['getMainMenuSymbolState'](_0x2557cb,_0x5ce29c(0x32f)))return![];return _0x2f9b1e[_0x5ce29c(0x297)]['call'](this);},Window_MenuCommand['prototype'][_0x4aacb4(0x267)]=function(_0x46334a,_0x381431){const _0x4c7333=_0x4aacb4;if($gameSystem[_0x4c7333(0x271)](_0x46334a,_0x4c7333(0x2bb)))return!![];if($gameSystem[_0x4c7333(0x271)](_0x46334a,_0x4c7333(0x275)))return![];return _0x381431['EnableJS'][_0x4c7333(0x2fe)](this);},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x2c8)]=function(_0x6fd1de){const _0x4c060b=_0x4aacb4;switch(_0x6fd1de){case'item':this[_0x4c060b(0x223)]();break;case _0x4c060b(0x351):this['addFormationCommand'](),this[_0x4c060b(0x306)]();break;case _0x4c060b(0x320):this[_0x4c060b(0x26f)]();break;case _0x4c060b(0x27e):this[_0x4c060b(0x2c9)]();break;case'gameEnd':this[_0x4c060b(0x331)]();break;}},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x223)]=function(){},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x2c2)]=function(){},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x306)]=function(){},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x26f)]=function(){},Window_MenuCommand['prototype'][_0x4aacb4(0x2c9)]=function(){},Window_MenuCommand['prototype'][_0x4aacb4(0x331)]=function(){},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x34f)]=function(){const _0x2ba8f5=_0x4aacb4,_0x2a6165=SceneManager[_0x2ba8f5(0x217)][_0x2ba8f5(0x24a)]();if([_0x2ba8f5(0x2c7),_0x2ba8f5(0x1f8)][_0x2ba8f5(0x33e)](_0x2a6165))return this[_0x2ba8f5(0x27d)]?this[_0x2ba8f5(0x20a)]():0x4;else{if(_0x2a6165!=='default'){if(_0x2ba8f5(0x235)!==_0x2ba8f5(0x235))this[_0x2ba8f5(0x1df)](...arguments);else return VisuMZ['MainMenuCore'][_0x2ba8f5(0x264)]['CustomCmdWin'][_0x2ba8f5(0x1d2)];}else return Window_Command[_0x2ba8f5(0x225)][_0x2ba8f5(0x34f)][_0x2ba8f5(0x2fe)](this);}},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x28d)]=function(){const _0x21f84e=_0x4aacb4;return VisuMZ['MainMenuCore'][_0x21f84e(0x264)][_0x21f84e(0x2c1)][_0x21f84e(0x1e4)];},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x2d3)]=function(_0x4dbe8c){const _0x3b865a=_0x4aacb4,_0x598267=this[_0x3b865a(0x1f4)](_0x4dbe8c);if(_0x598267===_0x3b865a(0x2b4))this[_0x3b865a(0x247)](_0x4dbe8c);else _0x598267==='icon'?this['drawItemStyleIcon'](_0x4dbe8c):'ILGIs'!==_0x3b865a(0x2b3)?Window_Command['prototype']['drawItem'][_0x3b865a(0x2fe)](this,_0x4dbe8c):(_0x3817c7['MainMenuCore']['Game_System_initialize'][_0x3b865a(0x2fe)](this),this[_0x3b865a(0x277)]());},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x2df)]=function(){const _0x4bf6d8=_0x4aacb4;return VisuMZ[_0x4bf6d8(0x206)]['Settings'][_0x4bf6d8(0x2c1)]['Style'];},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x1f4)]=function(_0x1fb380){const _0x411ddc=_0x4aacb4,_0xb92aa0=this[_0x411ddc(0x2df)]();if(_0xb92aa0!==_0x411ddc(0x1ee))return _0xb92aa0;else{const _0x1f59a1=this[_0x411ddc(0x222)](_0x1fb380);if(_0x1f59a1['match'](/\\I\[(\d+)\]/i)){if(_0x411ddc(0x321)!==_0x411ddc(0x347)){const _0x4e4405=this['itemLineRect'](_0x1fb380),_0x214301=this['textSizeEx'](_0x1f59a1)[_0x411ddc(0x1ce)];return _0x214301<=_0x4e4405['width']?_0x411ddc(0x2b4):'aZgie'!==_0x411ddc(0x288)?_0x4a70d3[_0x411ddc(0x206)][_0x411ddc(0x264)][_0x411ddc(0x2b0)][_0x411ddc(0x262)]['includes'](this['constructor'][_0x411ddc(0x2b2)]):_0x411ddc(0x234);}else{const _0x14ebd5=this[_0x411ddc(0x2a9)]();this[_0x411ddc(0x2ca)]=this['thinGoldWindow']()?new _0x53cbb5(_0x14ebd5):new _0x4b3c24(_0x14ebd5),this[_0x411ddc(0x218)](this[_0x411ddc(0x2ca)]);}}else return _0x411ddc(0x1e2);}},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x247)]=function(_0x5f3284){const _0xb282ae=_0x4aacb4,_0x2287a8=this[_0xb282ae(0x2f5)](_0x5f3284),_0x783580=this['commandName'](_0x5f3284),_0xa73d3b=this[_0xb282ae(0x203)](_0x783580)['width'];this[_0xb282ae(0x1f3)](this[_0xb282ae(0x285)](_0x5f3284));let _0x1eef8b=this['itemTextAlign']();if(_0x1eef8b===_0xb282ae(0x339)){if(_0xb282ae(0x27a)==='pslel')return this[_0xb282ae(0x355)]();else this['drawTextEx'](_0x783580,_0x2287a8['x']+_0x2287a8['width']-_0xa73d3b,_0x2287a8['y'],_0xa73d3b);}else{if(_0x1eef8b==='center'){const _0xce451d=_0x2287a8['x']+Math[_0xb282ae(0x33c)]((_0x2287a8[_0xb282ae(0x1ce)]-_0xa73d3b)/0x2);this[_0xb282ae(0x323)](_0x783580,_0xce451d,_0x2287a8['y'],_0xa73d3b);}else this['drawTextEx'](_0x783580,_0x2287a8['x'],_0x2287a8['y'],_0xa73d3b);}},Window_MenuCommand[_0x4aacb4(0x225)][_0x4aacb4(0x221)]=function(_0x2c8dc8){const _0x3999e4=_0x4aacb4;this[_0x3999e4(0x222)](_0x2c8dc8)[_0x3999e4(0x28e)](/\\I\[(\d+)\]/i);const _0x34a7d1=Number(RegExp['$1']),_0x3c8da9=this[_0x3999e4(0x2f5)](_0x2c8dc8),_0x5e191c=_0x3c8da9['x']+Math['floor']((_0x3c8da9[_0x3999e4(0x1ce)]-ImageManager[_0x3999e4(0x21e)])/0x2),_0x37c73f=_0x3c8da9['y']+(_0x3c8da9['height']-ImageManager[_0x3999e4(0x1ef)])/0x2;this[_0x3999e4(0x29c)](_0x34a7d1,_0x5e191c,_0x37c73f);},VisuMZ['MainMenuCore']['Window_StatusBase_loadFaceImages']=Window_StatusBase[_0x4aacb4(0x225)][_0x4aacb4(0x22f)],Window_StatusBase[_0x4aacb4(0x225)][_0x4aacb4(0x22f)]=function(){const _0x52abe4=_0x4aacb4;VisuMZ[_0x52abe4(0x206)][_0x52abe4(0x2a3)]['call'](this),this[_0x52abe4(0x1fb)]();},Window_StatusBase['prototype'][_0x4aacb4(0x1fb)]=function(){const _0x1ef6c2=_0x4aacb4;for(const _0x3dbe79 of $gameParty[_0x1ef6c2(0x2c0)]()){if(!_0x3dbe79)continue;_0x3dbe79['characterName']()&&ImageManager[_0x1ef6c2(0x2cf)](_0x3dbe79[_0x1ef6c2(0x2e8)]()),_0x3dbe79['battlerName']()&&ImageManager[_0x1ef6c2(0x2c6)](_0x3dbe79[_0x1ef6c2(0x258)]()),_0x3dbe79[_0x1ef6c2(0x27b)]()&&ImageManager[_0x1ef6c2(0x1cf)](_0x3dbe79[_0x1ef6c2(0x27b)]());}},Window_StatusBase[_0x4aacb4(0x225)][_0x4aacb4(0x233)]=function(){const _0x2a4aaf=_0x4aacb4;return VisuMZ[_0x2a4aaf(0x206)][_0x2a4aaf(0x264)]['StatusGraphic'];},Window_StatusBase[_0x4aacb4(0x225)]['drawItemActorFace']=function(_0x7e0dde,_0xc10f16,_0x1bab7e,_0x2e3f5d,_0x3c4af3){const _0xb0a873=_0x4aacb4;_0x2e3f5d=_0x2e3f5d||ImageManager[_0xb0a873(0x2e2)],_0x3c4af3=_0x3c4af3||ImageManager['faceHeight'];const _0x2f27f7=ImageManager['faceWidth'],_0x3ddb0d=_0x3c4af3-0x2,_0x52918e=_0xc10f16+Math[_0xb0a873(0x33c)]((_0x2e3f5d-_0x2f27f7)/0x2);if(this[_0xb0a873(0x243)]===Window_MenuStatus){if(_0xb0a873(0x2c3)!==_0xb0a873(0x26b))this[_0xb0a873(0x1f3)](_0x7e0dde[_0xb0a873(0x2d0)]());else{const _0x246057=this[_0xb0a873(0x241)](),_0x5178e8=[_0xb0a873(0x2ec),_0xb0a873(0x32f),'forceEnable','forceDisable'];for(const _0x458d3a of _0x5178e8){_0x246057[_0x458d3a][_0xb0a873(0x207)](_0x317ee2);}}}this[_0xb0a873(0x34c)](_0x7e0dde,_0x52918e,_0x1bab7e,_0x2f27f7,_0x3ddb0d),this[_0xb0a873(0x1f3)](!![]);},Window_StatusBase['prototype'][_0x4aacb4(0x2bc)]=function(_0x7d572a,_0x46bbb0,_0x323d25,_0x42072c,_0x44a28d){const _0x30998c=_0x4aacb4;_0x42072c=_0x42072c||ImageManager[_0x30998c(0x2e2)],_0x44a28d=_0x44a28d||ImageManager['faceHeight'];const _0x340bf3=_0x7d572a['characterName'](),_0x14de56=_0x7d572a['characterIndex'](),_0x33b91a=ImageManager[_0x30998c(0x2cf)](_0x340bf3),_0x699c7f=ImageManager[_0x30998c(0x2ff)](_0x340bf3),_0x30ac07=_0x33b91a[_0x30998c(0x1ce)]/(_0x699c7f?0x3:0xc),_0x30934a=_0x33b91a[_0x30998c(0x259)]/(_0x699c7f?0x4:0x8),_0x45a2a3=_0x42072c,_0x58d879=_0x44a28d-0x2,_0x4e9b58=_0x46bbb0+Math[_0x30998c(0x33c)](_0x45a2a3/0x2),_0x316371=_0x323d25+Math[_0x30998c(0x291)]((_0x44a28d+_0x30934a)/0x2);this[_0x30998c(0x243)]===Window_MenuStatus&&('yKBSq'!==_0x30998c(0x21c)?this[_0x30998c(0x1f3)](_0x7d572a[_0x30998c(0x2d0)]()):(_0x13f76d=_0x267df2(_0x82dc6d['$1']),_0x4a74a9=_0x59e079['replace'](/\\I\[(\d+)\]/i,'')[_0x30998c(0x1e7)]()));const _0x433f6a=Math[_0x30998c(0x25c)](_0x42072c,_0x30ac07),_0x4c2193=Math[_0x30998c(0x25c)](_0x44a28d,_0x30934a),_0x2a5c9d=Math[_0x30998c(0x33c)](_0x46bbb0+Math[_0x30998c(0x2d6)](_0x42072c-_0x30ac07,0x0)/0x2),_0x24f773=Math[_0x30998c(0x33c)](_0x323d25+Math[_0x30998c(0x2d6)](_0x44a28d-_0x30934a,0x0)/0x2),_0x2a03d8=_0x699c7f?0x0:_0x14de56,_0x591434=(_0x2a03d8%0x4*0x3+0x1)*_0x30ac07,_0x3c5f2a=Math[_0x30998c(0x33c)](_0x2a03d8/0x4)*0x4*_0x30934a;this[_0x30998c(0x2ab)]['blt'](_0x33b91a,_0x591434,_0x3c5f2a,_0x433f6a,_0x4c2193,_0x2a5c9d,_0x24f773),this[_0x30998c(0x1f3)](!![]);},Window_StatusBase[_0x4aacb4(0x225)]['drawItemActorSvBattler']=function(_0x422ac0,_0x1b8bf0,_0x176531,_0x2a4944,_0x2500bf){const _0x468bef=_0x4aacb4;_0x2a4944=_0x2a4944||ImageManager[_0x468bef(0x2e2)],_0x2500bf=_0x2500bf||ImageManager[_0x468bef(0x1de)];const _0x1004c1=ImageManager['loadSvActor'](_0x422ac0[_0x468bef(0x258)]()),_0x3dbe9a=_0x1004c1['width']/ImageManager['svActorHorzCells'],_0x224b62=_0x1004c1[_0x468bef(0x259)]/ImageManager[_0x468bef(0x22a)],_0xd17181=_0x2a4944,_0xd6a5e3=_0x2500bf-0x2,_0x43c181=_0x1b8bf0+Math[_0x468bef(0x33c)](_0xd17181/0x2),_0x5b9a2f=_0x176531+Math[_0x468bef(0x291)]((_0x2500bf+_0x224b62)/0x2);this['constructor']===Window_MenuStatus&&this[_0x468bef(0x1f3)](_0x422ac0['isBattleMember']());const _0x117ed5=_0x422ac0[_0x468bef(0x1f1)]&&_0x422ac0[_0x468bef(0x1f1)](),_0x41bee0=0x0,_0x5464e8=0x0,_0x3193fb=_0x117ed5?_0x1004c1[_0x468bef(0x1ce)]:_0x3dbe9a,_0xfde966=_0x117ed5?_0x1004c1['height']:_0x224b62,_0x330542=Math['min'](0x1,_0x2a4944/_0x3193fb,_0x2500bf/_0xfde966),_0x5ee94c=_0x330542*_0x3193fb,_0x2ef1f2=_0x330542*_0xfde966,_0x373062=Math[_0x468bef(0x33c)](_0x1b8bf0+Math['max'](_0x2a4944-_0x5ee94c,0x0)/0x2),_0x2e7762=Math[_0x468bef(0x33c)](_0x176531+Math[_0x468bef(0x2d6)](_0x2500bf-_0x2ef1f2,0x0)/0x2);this[_0x468bef(0x2ab)][_0x468bef(0x256)](_0x1004c1,_0x41bee0,_0x5464e8,_0x3193fb,_0xfde966,_0x373062,_0x2e7762,_0x5ee94c,_0x2ef1f2),this[_0x468bef(0x1f3)](!![]);},Window_StatusBase[_0x4aacb4(0x225)][_0x4aacb4(0x2e6)]=function(_0x51a6cb,_0x45bc8f,_0x14fe74,_0xce125,_0x3b49c4){const _0x41f7b1=_0x4aacb4,_0x549235=ImageManager[_0x41f7b1(0x1cf)](_0x51a6cb[_0x41f7b1(0x27b)]());_0xce125=(_0xce125||ImageManager['faceWidth'])-0x2,_0x3b49c4=(_0x3b49c4||ImageManager[_0x41f7b1(0x1de)])-0x2;const _0x31a3bb=_0x549235[_0x41f7b1(0x1ce)],_0x5e2cd8=_0x549235[_0x41f7b1(0x259)],_0x1f2add=_0xce125,_0x48220f=_0x3b49c4-0x2,_0x21d541=_0x45bc8f+Math['floor'](_0x1f2add/0x2),_0x2fd8e9=_0x14fe74+Math[_0x41f7b1(0x291)]((_0x3b49c4+_0x5e2cd8)/0x2);this[_0x41f7b1(0x243)]===Window_MenuStatus&&this['changePaintOpacity'](_0x51a6cb[_0x41f7b1(0x2d0)]());const _0x41dc79=Math['min'](_0xce125,_0x31a3bb),_0x27c6c6=Math[_0x41f7b1(0x25c)](_0x3b49c4,_0x5e2cd8),_0x280aa6=_0x45bc8f+0x1,_0x2ddefb=Math[_0x41f7b1(0x2d6)](_0x14fe74+0x1,_0x14fe74+_0x48220f-_0x5e2cd8+0x3);let _0x36592d=Math[_0x41f7b1(0x253)]((_0x31a3bb-_0x41dc79)/0x2),_0x5b3240=Math[_0x41f7b1(0x253)]((_0x5e2cd8-_0x27c6c6)/0x2);_0x36592d-=_0x51a6cb[_0x41f7b1(0x25b)](),_0x5b3240-=_0x51a6cb[_0x41f7b1(0x23e)]();if(Imported[_0x41f7b1(0x304)]){if(VisuMZ['CoreEngine']['Settings'][_0x41f7b1(0x356)][_0x41f7b1(0x1f2)]){}}this[_0x41f7b1(0x2ab)][_0x41f7b1(0x256)](_0x549235,_0x36592d,_0x5b3240,_0x41dc79,_0x27c6c6,_0x280aa6,_0x2ddefb),this[_0x41f7b1(0x1f3)](!![]);},Window_Status[_0x4aacb4(0x225)]['drawActorFace']=function(_0xaa91d7,_0xcede5f,_0x3d76aa,_0x421229,_0x11e056){const _0x31cf65=_0x4aacb4;switch(this[_0x31cf65(0x233)]()){case _0x31cf65(0x345):break;case _0x31cf65(0x1ff):this[_0x31cf65(0x2bc)](_0xaa91d7,_0xcede5f,_0x3d76aa,_0x421229,_0x11e056);break;case _0x31cf65(0x2cc):this[_0x31cf65(0x333)](_0xaa91d7,_0xcede5f,_0x3d76aa,_0x421229,_0x11e056);break;default:Window_StatusBase[_0x31cf65(0x225)][_0x31cf65(0x34c)][_0x31cf65(0x2fe)](this,_0xaa91d7,_0xcede5f,_0x3d76aa,_0x421229,_0x11e056);break;}},VisuMZ[_0x4aacb4(0x206)][_0x4aacb4(0x2f9)]=Window_MenuStatus[_0x4aacb4(0x225)][_0x4aacb4(0x307)],Window_MenuStatus[_0x4aacb4(0x225)][_0x4aacb4(0x307)]=function(){const _0x5da4c6=_0x4aacb4;VisuMZ[_0x5da4c6(0x206)]['Settings']['General'][_0x5da4c6(0x22e)]?VisuMZ[_0x5da4c6(0x206)]['Window_MenuStatus_selectLast'][_0x5da4c6(0x2fe)](this):this[_0x5da4c6(0x2bd)](0x0);},VisuMZ[_0x4aacb4(0x206)][_0x4aacb4(0x311)]=Window_MenuStatus[_0x4aacb4(0x225)][_0x4aacb4(0x20a)],Window_MenuStatus[_0x4aacb4(0x225)]['maxItems']=function(){const _0x4ab32d=_0x4aacb4;if(this[_0x4ab32d(0x224)]()){if(_0x4ab32d(0x2d2)===_0x4ab32d(0x1e8)){if(this[_0x4ab32d(0x1cd)]-->0x0){if(this['_timer']<=0x0)this['refresh']();}}else return $gameParty['battleMembers']()[_0x4ab32d(0x326)];}else{if(_0x4ab32d(0x227)===_0x4ab32d(0x257))this['changePaintOpacity'](_0x251a0c[_0x4ab32d(0x2d0)]());else return VisuMZ['MainMenuCore'][_0x4ab32d(0x311)][_0x4ab32d(0x2fe)](this);}},Window_MenuStatus['prototype'][_0x4aacb4(0x224)]=function(){const _0x492933=_0x4aacb4,_0x5763e0=VisuMZ[_0x492933(0x206)][_0x492933(0x264)]['General'];if(_0x5763e0[_0x492933(0x1c7)]===undefined)_0x5763e0['ShowReserve']=!![];const _0x1b38d5=SceneManager['_scene'];if(!_0x5763e0[_0x492933(0x1c7)]){if(_0x5763e0['HideMainMenuOnly'])return _0x1b38d5[_0x492933(0x243)]===Scene_Menu;return!![];}return![];},Window_MenuStatus[_0x4aacb4(0x225)][_0x4aacb4(0x30f)]=function(){const _0x4842b5=_0x4aacb4,_0x400f7d=SceneManager[_0x4842b5(0x217)]['constructor'];if(_0x400f7d===Scene_Menu){if(_0x4842b5(0x266)==='CNmyG'){const _0x974264=this[_0x4842b5(0x24a)]();if([_0x4842b5(0x1c8),_0x4842b5(0x2c7),_0x4842b5(0x1e3)][_0x4842b5(0x33e)](_0x974264))return this[_0x4842b5(0x319)]();else return[_0x4842b5(0x2cb),_0x4842b5(0x1f8)][_0x4842b5(0x33e)](_0x974264)?this[_0x4842b5(0x24e)]():_0x4ad545[_0x4842b5(0x206)]['Settings'][_0x4842b5(0x34b)][_0x4842b5(0x29e)][_0x4842b5(0x2fe)](this);}else return VisuMZ['MainMenuCore'][_0x4842b5(0x264)][_0x4842b5(0x2d1)];}else return VisuMZ[_0x4842b5(0x206)][_0x4842b5(0x264)]['InnerMenuListStyle'];},Window_MenuStatus[_0x4aacb4(0x225)][_0x4aacb4(0x211)]=function(){const _0x3119c1=_0x4aacb4,_0x3a1b93=this[_0x3119c1(0x30f)]();switch(_0x3a1b93){case _0x3119c1(0x302):case _0x3119c1(0x27f):return 0x1;case _0x3119c1(0x28c):return 0x1;default:return $gameParty['maxBattleMembers']();}},Window_MenuStatus[_0x4aacb4(0x225)][_0x4aacb4(0x34f)]=function(){const _0x94f0e6=_0x4aacb4,_0x3e3be0=this[_0x94f0e6(0x30f)]();switch(_0x3e3be0){case'vertical':case _0x94f0e6(0x27f):return $gameParty[_0x94f0e6(0x2f8)]();default:return 0x1;}},VisuMZ[_0x4aacb4(0x206)][_0x4aacb4(0x324)]=Window_MenuStatus[_0x4aacb4(0x225)]['itemHeight'],Window_MenuStatus['prototype'][_0x4aacb4(0x250)]=function(){const _0x14b847=_0x4aacb4,_0x3f0ed9=this[_0x14b847(0x30f)]();switch(_0x3f0ed9){case _0x14b847(0x302):case _0x14b847(0x27f):case _0x14b847(0x28c):return this[_0x14b847(0x251)];case _0x14b847(0x336):return Window_Selectable[_0x14b847(0x225)][_0x14b847(0x250)][_0x14b847(0x2fe)](this);case _0x14b847(0x1ea):return this[_0x14b847(0x355)]()*0x2+0x8;default:return VisuMZ[_0x14b847(0x206)][_0x14b847(0x324)]['call'](this);}},Window_MenuStatus[_0x4aacb4(0x225)]['drawItem']=function(_0x2da9a2){const _0x328a9e=_0x4aacb4;this[_0x328a9e(0x2f0)](_0x2da9a2),this[_0x328a9e(0x317)](_0x2da9a2);},VisuMZ[_0x4aacb4(0x206)]['Window_MenuStatus_drawItemImage']=Window_MenuStatus[_0x4aacb4(0x225)][_0x4aacb4(0x26d)],Window_MenuStatus[_0x4aacb4(0x225)]['drawActorGraphic']=function(_0x5a52c9,_0x2d3552,_0x368fed,_0x4b1c3e,_0x4962c8){const _0x3432e4=_0x4aacb4;switch(this['graphicType']()){case _0x3432e4(0x345):break;case _0x3432e4(0x1ff):this['drawItemActorSprite'](_0x5a52c9,_0x2d3552,_0x368fed+0x1,_0x4b1c3e,_0x4962c8-0x2);break;case _0x3432e4(0x2cc):this[_0x3432e4(0x333)](_0x5a52c9,_0x2d3552,_0x368fed+0x1,_0x4b1c3e,_0x4962c8-0x2);break;default:this['drawItemActorFace'](_0x5a52c9,_0x2d3552,_0x368fed,_0x4b1c3e,_0x4962c8);break;}},Window_MenuStatus[_0x4aacb4(0x225)]['drawItemStatus']=function(_0x24fa49){const _0x2ee844=_0x4aacb4;this[_0x2ee844(0x300)]();const _0x53c751=this['actor'](_0x24fa49),_0x6f7bac=this[_0x2ee844(0x341)](_0x24fa49),_0x334fd8=this['listStyle']();switch(_0x334fd8){case _0x2ee844(0x302):this[_0x2ee844(0x21a)](_0x53c751,_0x6f7bac);break;case _0x2ee844(0x27f):this['drawItemStatusPortraitStyle'](_0x53c751,_0x6f7bac);break;case'solo':this[_0x2ee844(0x328)](_0x53c751,_0x6f7bac);break;case _0x2ee844(0x336):this[_0x2ee844(0x2db)](_0x53c751,_0x6f7bac);break;case _0x2ee844(0x1ea):this[_0x2ee844(0x2bf)](_0x53c751,_0x6f7bac);break;default:this['drawItemStatusDefaultStyle'](_0x53c751,_0x6f7bac);break;}},Window_MenuStatus[_0x4aacb4(0x225)][_0x4aacb4(0x21a)]=function(_0x2beb59,_0x396d37){const _0x68c314=_0x4aacb4;VisuMZ[_0x68c314(0x206)][_0x68c314(0x264)][_0x68c314(0x23c)][_0x68c314(0x2f6)][_0x68c314(0x2fe)](this,_0x2beb59,_0x396d37);},Window_MenuStatus['prototype'][_0x4aacb4(0x316)]=function(_0x90bb56,_0x54c7a0){const _0x405df3=_0x4aacb4;if(_0x90bb56[_0x405df3(0x27b)]()!==''){const _0x178412=ImageManager[_0x405df3(0x1cf)](_0x90bb56[_0x405df3(0x27b)]());_0x178412[_0x405df3(0x330)](this[_0x405df3(0x2be)][_0x405df3(0x1d7)](this,_0x90bb56,_0x54c7a0));}else _0x405df3(0x24d)!==_0x405df3(0x24d)?_0x3dedc3=_0x405df3(0x32a)[_0x405df3(0x281)](_0x5a0a4d,_0x53a2dd):this[_0x405df3(0x21a)](_0x90bb56,_0x54c7a0);},Window_MenuStatus[_0x4aacb4(0x225)]['drawItemStatusPortraitStyleOnLoad']=function(_0x22aa55,_0x467cd9){const _0x2d70cd=_0x4aacb4;VisuMZ['MainMenuCore'][_0x2d70cd(0x264)][_0x2d70cd(0x23c)]['PortraitStyle'][_0x2d70cd(0x2fe)](this,_0x22aa55,_0x467cd9);},Window_MenuStatus['prototype'][_0x4aacb4(0x328)]=function(_0x3064b5,_0x32ca5f){const _0x2cdf27=_0x4aacb4,_0x5f30ea=ImageManager[_0x2cdf27(0x1cf)](_0x3064b5['getMenuImage']());_0x5f30ea['addLoadListener'](this[_0x2cdf27(0x202)][_0x2cdf27(0x1d7)](this,_0x3064b5,_0x32ca5f));},Window_MenuStatus[_0x4aacb4(0x225)][_0x4aacb4(0x202)]=function(_0x3646c7,_0x31def2){const _0x191afc=_0x4aacb4;VisuMZ[_0x191afc(0x206)][_0x191afc(0x264)][_0x191afc(0x23c)][_0x191afc(0x2c5)][_0x191afc(0x2fe)](this,_0x3646c7,_0x31def2);},Window_MenuStatus['prototype'][_0x4aacb4(0x2db)]=function(_0x2c04ef,_0x479336){const _0x546311=_0x4aacb4;VisuMZ[_0x546311(0x206)][_0x546311(0x264)][_0x546311(0x23c)]['ThinStyle'][_0x546311(0x2fe)](this,_0x2c04ef,_0x479336);},Window_MenuStatus['prototype'][_0x4aacb4(0x2bf)]=function(_0xb0419a,_0x5e29b6){const _0x2da7=_0x4aacb4;VisuMZ[_0x2da7(0x206)][_0x2da7(0x264)][_0x2da7(0x23c)][_0x2da7(0x31f)][_0x2da7(0x2fe)](this,_0xb0419a,_0x5e29b6);},Window_MenuStatus[_0x4aacb4(0x225)][_0x4aacb4(0x287)]=function(){const _0x5c48de=_0x4aacb4,_0x77aa1a=this[_0x5c48de(0x30f)]();if([_0x5c48de(0x336),_0x5c48de(0x1ea)][_0x5c48de(0x33e)](_0x77aa1a))return![];return Window_StatusBase[_0x5c48de(0x225)][_0x5c48de(0x287)][_0x5c48de(0x2fe)](this);},Window_MenuStatus[_0x4aacb4(0x225)][_0x4aacb4(0x325)]=function(_0x1dcaf4,_0x381eea){const _0xb33fb3=_0x4aacb4;VisuMZ[_0xb33fb3(0x206)][_0xb33fb3(0x264)]['ListStyles'][_0xb33fb3(0x343)][_0xb33fb3(0x2fe)](this,_0x1dcaf4,_0x381eea);},Window_SkillStatus[_0x4aacb4(0x225)][_0x4aacb4(0x34c)]=function(_0x470317,_0x172876,_0x2bfc9c,_0x4bd66d,_0x1f563c){const _0x4b621b=_0x4aacb4;switch(this[_0x4b621b(0x233)]()){case _0x4b621b(0x345):break;case'sprite':this[_0x4b621b(0x2bc)](_0x470317,_0x172876,_0x2bfc9c,_0x4bd66d,_0x1f563c);break;case _0x4b621b(0x2cc):this[_0x4b621b(0x333)](_0x470317,_0x172876,_0x2bfc9c,_0x4bd66d,_0x1f563c);break;default:Window_StatusBase['prototype']['drawActorFace'][_0x4b621b(0x2fe)](this,_0x470317,_0x172876,_0x2bfc9c,_0x4bd66d,_0x1f563c);break;}},Window_EquipStatus[_0x4aacb4(0x225)][_0x4aacb4(0x34c)]=function(_0x5b61d8,_0x1b025b,_0x5866c3,_0x59a1b5,_0x49dee9){const _0x38a052=_0x4aacb4;switch(this[_0x38a052(0x233)]()){case _0x38a052(0x345):break;case _0x38a052(0x1ff):this[_0x38a052(0x2bc)](_0x5b61d8,_0x1b025b,_0x5866c3,_0x59a1b5,_0x49dee9);break;case _0x38a052(0x2cc):this[_0x38a052(0x333)](_0x5b61d8,_0x1b025b,_0x5866c3,_0x59a1b5,_0x49dee9);break;default:Window_StatusBase['prototype']['drawActorFace'][_0x38a052(0x2fe)](this,_0x5b61d8,_0x1b025b,_0x5866c3,_0x59a1b5,_0x49dee9);break;}};function _0x95e7(_0x21fe46,_0xa5b673){const _0x2ea854=_0x2ea8();return _0x95e7=function(_0x95e79e,_0x124547){_0x95e79e=_0x95e79e-0x1bf;let _0x2bf951=_0x2ea854[_0x95e79e];return _0x2bf951;},_0x95e7(_0x21fe46,_0xa5b673);}function Window_ThinGold(){const _0x37a939=_0x4aacb4;this[_0x37a939(0x1df)](...arguments);}Window_ThinGold[_0x4aacb4(0x225)]=Object[_0x4aacb4(0x23a)](Window_Gold[_0x4aacb4(0x225)]),Window_ThinGold[_0x4aacb4(0x225)][_0x4aacb4(0x243)]=Window_ThinGold,Window_ThinGold[_0x4aacb4(0x225)][_0x4aacb4(0x250)]=function(){return this['lineHeight']();},Window_ThinGold[_0x4aacb4(0x225)][_0x4aacb4(0x2a5)]=function(){const _0xdadb43=_0x4aacb4;return Window_Selectable['prototype'][_0xdadb43(0x2a5)][_0xdadb43(0x2fe)](this);};function Window_Playtime(){const _0x3561a0=_0x4aacb4;this[_0x3561a0(0x1df)](...arguments);}Window_Playtime[_0x4aacb4(0x225)]=Object[_0x4aacb4(0x23a)](Window_Selectable[_0x4aacb4(0x225)]),Window_Playtime[_0x4aacb4(0x225)][_0x4aacb4(0x243)]=Window_Playtime,Window_Playtime[_0x4aacb4(0x225)]['initialize']=function(_0x19c91e){const _0x20e2f0=_0x4aacb4;this[_0x20e2f0(0x2d9)]=$gameSystem['playtimeText'](),this['_timer']=0x3c,Window_Selectable[_0x20e2f0(0x225)][_0x20e2f0(0x1df)][_0x20e2f0(0x2fe)](this,_0x19c91e),this['refresh']();},Window_Playtime['prototype'][_0x4aacb4(0x250)]=function(){const _0x41ea4f=_0x4aacb4;return this[_0x41ea4f(0x355)]();},Window_Playtime['prototype'][_0x4aacb4(0x26c)]=function(){const _0x537b33=_0x4aacb4;Window_Selectable[_0x537b33(0x225)][_0x537b33(0x26c)][_0x537b33(0x2fe)](this),this[_0x537b33(0x342)]();},Window_Playtime[_0x4aacb4(0x225)][_0x4aacb4(0x342)]=function(){const _0x58b846=_0x4aacb4;if(this[_0x58b846(0x1cd)]-->0x0){if(_0x58b846(0x34e)===_0x58b846(0x350))this['updateOpacity'](),this['updatePosition'](),this['updateDuration']();else{if(this[_0x58b846(0x1cd)]<=0x0)this['refresh']();}}},Window_Playtime[_0x4aacb4(0x225)][_0x4aacb4(0x28a)]=function(){const _0x4f989e=_0x4aacb4;this['_timer']=0x3c;const _0x190956=this['itemLineRect'](0x0),_0x48d3f1=_0x190956['x'],_0x96d3d2=_0x190956['y'],_0x1afebf=_0x190956['width'];this[_0x4f989e(0x2ab)][_0x4f989e(0x2a6)](),this[_0x4f989e(0x29b)](_0x190956),this[_0x4f989e(0x1c5)](_0x190956),this['drawPlaytime'](_0x190956);},Window_Playtime[_0x4aacb4(0x225)]['resetFontSettings']=function(){const _0x30b77c=_0x4aacb4;Window_Selectable[_0x30b77c(0x225)][_0x30b77c(0x300)][_0x30b77c(0x2fe)](this),this[_0x30b77c(0x2ab)][_0x30b77c(0x213)]=VisuMZ[_0x30b77c(0x206)][_0x30b77c(0x264)][_0x30b77c(0x34b)][_0x30b77c(0x2f2)];},Window_Playtime['prototype'][_0x4aacb4(0x29b)]=function(_0x464495){const _0x14f4dd=_0x4aacb4;if(VisuMZ[_0x14f4dd(0x206)][_0x14f4dd(0x264)]['Playtime'][_0x14f4dd(0x2b7)]>0x0){if(_0x14f4dd(0x312)===_0x14f4dd(0x312)){const _0x34feb0=VisuMZ[_0x14f4dd(0x206)][_0x14f4dd(0x264)]['Playtime'][_0x14f4dd(0x2b7)],_0x4ed63d=_0x464495['y']+(this[_0x14f4dd(0x355)]()-ImageManager['iconHeight'])/0x2;this[_0x14f4dd(0x29c)](_0x34feb0,_0x464495['x'],_0x4ed63d);const _0xf7b6c2=ImageManager[_0x14f4dd(0x21e)]+0x4;_0x464495['x']+=_0xf7b6c2,_0x464495[_0x14f4dd(0x1ce)]-=_0xf7b6c2;}else{if(_0x39caf0['MainMenuCore'][_0x14f4dd(0x264)][_0x14f4dd(0x2b0)][_0x14f4dd(0x2b9)]){const _0x1f4a22=_0x28d5d2[_0x14f4dd(0x259)]-this[_0x14f4dd(0x305)](0x1,![]);_0x34f8d4['y']+=_0x1f4a22;}_0x15c525[_0x14f4dd(0x206)][_0x14f4dd(0x264)][_0x14f4dd(0x2b0)]['AutoGoldHeight']&&(_0x2c61ef[_0x14f4dd(0x259)]=this[_0x14f4dd(0x305)](0x1,![]));}}},Window_Playtime['prototype'][_0x4aacb4(0x1c5)]=function(_0x23844f){const _0x3b6246=_0x4aacb4;this['resetFontSettings'](),this[_0x3b6246(0x2f3)](ColorManager['systemColor']());const _0x42e337=VisuMZ[_0x3b6246(0x206)]['Settings'][_0x3b6246(0x34b)]['Time'];this[_0x3b6246(0x26a)](_0x42e337,_0x23844f['x'],_0x23844f['y'],_0x23844f['width'],_0x3b6246(0x1e9)),this[_0x3b6246(0x22c)]();},Window_Playtime[_0x4aacb4(0x225)]['drawPlaytime']=function(_0x20239d){const _0x3b6a6a=_0x4aacb4,_0x44f5c1=$gameSystem[_0x3b6a6a(0x248)]();this['drawText'](_0x44f5c1,_0x20239d['x'],_0x20239d['y'],_0x20239d[_0x3b6a6a(0x1ce)],_0x3b6a6a(0x339));};function _0x2ea8(){const _0x2a51c7=['isBattleMember','StatusListStyle','LGqtz','drawItem','Enable','forceDisableMainMenuCommand','max','addCommand','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_playtimeText','Scene_Menu_create','drawItemStatusThinStyle','JmObO','boxHeight','variables','commandStyle','Untitled','commandWindowRectBottomStyle','faceWidth','_actor','commandNameWindowDrawBackground','onPersonalOk','drawItemActorMenuImage','koaPD','characterName','_playtimeWindow','Scene_Menu_goldWindowRect','DFRNU','forceShow','updateActor','setActor','eVptn','drawPendingItemBackground','_bitmapReady','FontSize','changeTextColor','lrmWN','itemLineRect','VerticalStyle','279381nHwulD','maxBattleMembers','Window_MenuStatus_selectLast','Scene_Menu_commandPersonal','ARRAYJSON','createPlaytimeWindow','replace','call','isBigCharacter','resetFontSettings','commandWindowRect','vertical','canCreatePlaytimeWindow','VisuMZ_0_CoreEngine','calcWindowHeight','addOriginalCommands','selectLast','applyThinnerGoldWindowRect','Scene_Menu_onFormationCancel','_mainMenuCore','Rows','statusWindowRectBottomStyle','onFormationCancel','NUM','listStyle','reserveCommonEvent','Window_MenuStatus_maxItems','dQljj','CallHandlerJS','exit','opacity','drawItemStatusPortraitStyle','drawItemStatus','adjustCommandHeightByPlaytime','playtimeWindowRectTopStyle','default','nYsXD','needsDummyWindow','ChangeActorMenuImageGroup','_targetX','ThickerStyle','options','JKlMT','registerCommand','drawTextEx','Window_MenuStatus_itemHeight','drawItemStatusDefaultStyle','length','windowPadding','drawItemStatusSoloStyle','onPersonalCancel','\x5cI[%1]%2','loadBitmap','TextJS','popScene','shift','forceHide','addLoadListener','addGameEndCommand','rUytH','drawItemActorSvBattler','ThinGoldWindow','Scene_Menu_commandFormation','thin','71490orjBxX','createBackground','right','commandWindowRectThinTopStyle','toUpperCase','floor','value','includes','variableWindowRect','ARRAYNUM','itemRect','updateTimer','DefaultStyle','Scene_MenuBase_createBackground','none','CommandList','KHrnQ','createVariableWindow','version','NaOIV','Playtime','drawActorFace','BaYJk','WJSaL','maxCols','czjPl','formation','statusWindowRectMobileStyle','setTargetActor','STR','lineHeight','QoL','fill','svActorHorzCells','bitmap','parse','ConvertParams','_duration','drawTimeLabel','setup','ShowReserve','top','goldWindowRectBottomStyle','_actorMenuBgSprite','MobileThickness','BgType','_timer','width','loadPicture','commandPersonal','center','Cols','actor','updatePosition','currentExt','8tHmcil','bind','Step2','currentSymbol','goldWindowRectTopStyle','isSoloQuickMode','2068710sjqxFm','thinGoldWindow','faceHeight','initialize','setMenuImage','xjzIU','text','mobile','TextAlign','createActorMenuBackgroundImageSprite','sZIIv','trim','ZvvZx','left','thicker','commandFormation','updateCommandNameWindow','MenuCommandForceHide','auto','iconHeight','_menuImage','hasStaticSvBattler','PixelateImageRendering','changePaintOpacity','commandStyleCheck','drawItemBackground','variableWindowRectTopStyle','createCommandWindow','thinBottom','createStatusWindow','cRKNY','loadOtherActorImages','Scene_Menu_onPersonalCancel','setHandler','iBkKm','sprite','adjustStatusWindowMobile','MenuCommandForceEnable','drawItemStatusSoloStyleOnLoad','textSizeEx','commandNameWindowCenter','systemColor','MainMenuCore','remove','Game_System_initialize','PQxQR','maxItems','MenuCommandForceShow','forceHideMainMenuCommand','fajNc','drawSvActor','2FMQOAe','Variable','numVisibleRows','createDummyWindow','fontSize','createGoldWindow','pcsbG','adjustCommandHeightByVariable','_scene','addWindow','boxWidth','drawItemStatusVerticalStyle','LRqSd','KXCZz','index','iconWidth','4702470sEwOkj','commandWindowRectThinBottomStyle','drawItemStyleIcon','commandName','addMainCommands','showOnlyBattleMembers','prototype','rwdon','lmPTP','activate','gEptu','svActorVertCells','forceShowMainMenuCommand','resetTextColor','9708234CCEXjP','StatusSelectLast','loadFaceImages','ActorBgMenuJS','PBVqM','mainCommandWidth','graphicType','icon','ReLke','CoreEngine','onBitmapLoad','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','map','create','dFLzw','ListStyles','mainAreaTop','getMenuImageOffsetY','iviHN','commandWindowRectTopStyle','mainMenuCoreSettings','ExtJS','constructor','isArray','close','huFoo','drawItemStyleIconText','playtimeText','VarList','commandWindowStyle','_commandNameWindow','mainAreaBottom','eCVmi','playtimeWindowRectBottomStyle','_targetY','itemHeight','innerHeight','Step1End','round','innerWidth','AdjustCommandHeight','blt','tMnlc','battlerName','height','873LjKZKh','getMenuImageOffsetX','min','yKDgm','concat','STRUCT','Symbols','Scene_Menu_createStatusWindow','ActorBgMenus','variableWindowRectBottomStyle','Settings','dpDiG','xakDM','isMainMenuCommandEnabled','statusWindowRect','Step1Start','drawText','TGewO','update','drawItemImage','SoloQuick','addOptionsCommand','ARRAYSTR','getMainMenuSymbolState','commandLoad','_variableWindow','_commandWindow','forceDisable','commandNameWindowDrawText','initMainMenuCore','updateDuration','Symbol','uJyDM','getMenuImage','_statusWindow','_list','save','portrait','adjustDefaultCommandWindowRect','format','description','commandCommonEvent','Window_MenuCommand_initialize','isCommandEnabled','push','isExpGaugeDrawn','aZgie','ARRAYEVAL','refresh','makeMainMenuCoreCommandList','solo','itemTextAlign','match','cancel','Scene_Menu_commandWindowRect','ceil','normalColor','88UQRZTd','urTni','fittingHeight','note','ShowJS','_commandList','callUpdateHelp','isMainMenuCommandVisible','drawTimeIcon','drawIcon','initMenuImage','WindowRect','mainAreaHeight','addChild','EVAL','open','Window_StatusBase_loadFaceImages','playtimeWindowRect','colSpacing','clear','Step1','_data','goldWindowRect','70304bjYMrE','contents','738745JxLGgD','CommandWindowStyle','Game_Actor_setup','canCreateVariableWindow','General','PersonalHandlerJS','name','aAYJj','iconText','Scene_Menu_statusWindowRect','forceEnableMainMenuCommand','Icon','createCommandNameWindow','AutoGoldY','ChangeActorMenuImageJS','forceEnable','drawItemActorSprite','smoothSelect','drawItemStatusPortraitStyleOnLoad','drawItemStatusThickerStyle','members','CustomCmdWin','addFormationCommand','ujXFB','qyXQx','SoloStyle','loadSvActor','thinTop','addSymbolBridge','addSaveCommand','_goldWindow','bottom','svbattler','statusWindowRectTopStyle','TaoEt','loadCharacter'];_0x2ea8=function(){return _0x2a51c7;};return _0x2ea8();}function Window_MenuVariables(){const _0x4fe981=_0x4aacb4;this[_0x4fe981(0x1df)](...arguments);}Window_MenuVariables['prototype']=Object[_0x4aacb4(0x23a)](Window_Selectable[_0x4aacb4(0x225)]),Window_MenuVariables[_0x4aacb4(0x225)][_0x4aacb4(0x243)]=Window_MenuVariables,Window_MenuVariables[_0x4aacb4(0x225)]['initialize']=function(_0x49e958){const _0x3ad4ee=_0x4aacb4;Window_Selectable[_0x3ad4ee(0x225)]['initialize']['call'](this,_0x49e958),this[_0x3ad4ee(0x2a8)]=VisuMZ[_0x3ad4ee(0x206)]['Settings']['Variable'][_0x3ad4ee(0x249)],this[_0x3ad4ee(0x28a)]();},Window_MenuVariables[_0x4aacb4(0x225)][_0x4aacb4(0x250)]=function(){return this['lineHeight']();},Window_MenuVariables[_0x4aacb4(0x225)]['maxCols']=function(){const _0x27add5=_0x4aacb4,_0x15d491=SceneManager['_scene'][_0x27add5(0x24a)]();return _0x15d491==='default'?0x1:_0x27add5(0x2e7)==='koaPD'?VisuMZ[_0x27add5(0x206)][_0x27add5(0x264)][_0x27add5(0x210)]['VarList'][_0x27add5(0x326)]:_0x1eb382[_0x27add5(0x225)][_0x27add5(0x2a5)]['call'](this);},Window_MenuVariables[_0x4aacb4(0x225)][_0x4aacb4(0x300)]=function(){const _0x4bc348=_0x4aacb4;Window_Selectable[_0x4bc348(0x225)][_0x4bc348(0x300)][_0x4bc348(0x2fe)](this),this[_0x4bc348(0x2ab)][_0x4bc348(0x213)]=VisuMZ[_0x4bc348(0x206)][_0x4bc348(0x264)]['Variable'][_0x4bc348(0x2f2)],this[_0x4bc348(0x2f3)](ColorManager['systemColor']());},Window_MenuVariables[_0x4aacb4(0x225)][_0x4aacb4(0x20a)]=function(){const _0x328348=_0x4aacb4;return this['_data'][_0x328348(0x326)];},Window_MenuVariables[_0x4aacb4(0x225)]['drawAllItems']=function(){const _0x46e560=_0x4aacb4,_0x35e7d1=this['topIndex']();for(let _0x29f18e=0x0;_0x29f18e<this['maxVisibleItems']();_0x29f18e++){const _0x2f7cab=_0x35e7d1+_0x29f18e;_0x2f7cab<this[_0x46e560(0x20a)]()&&(this[_0x46e560(0x1f5)](_0x2f7cab),this[_0x46e560(0x2d3)](_0x2f7cab));}},Window_MenuVariables[_0x4aacb4(0x225)][_0x4aacb4(0x1f5)]=function(_0x410e6a){},Window_MenuVariables[_0x4aacb4(0x225)][_0x4aacb4(0x2d3)]=function(_0x3e3594){const _0x5d313e=_0x4aacb4,_0x5e3e93=this[_0x5d313e(0x2a8)][_0x3e3594];if(_0x5e3e93<=0x0)return;if(!$dataSystem[_0x5d313e(0x2de)][_0x5e3e93])return;const _0x4eb862=this[_0x5d313e(0x2f5)](_0x3e3594);this['resetFontSettings']();let _0x548acf=0x0,_0x5ab536=$dataSystem[_0x5d313e(0x2de)][_0x5e3e93][_0x5d313e(0x1e7)]();_0x5ab536['match'](/\\I\[(\d+)\]/i)&&(_0x548acf=Number(RegExp['$1']),_0x5ab536=_0x5ab536[_0x5d313e(0x2fd)](/\\I\[(\d+)\]/i,'')[_0x5d313e(0x1e7)]());if(_0x548acf>0x0){if(_0x5d313e(0x23f)!=='pmTei'){const _0x1f1457=_0x4eb862['y']+(this['lineHeight']()-ImageManager[_0x5d313e(0x1ef)])/0x2;this[_0x5d313e(0x29c)](_0x548acf,_0x4eb862['x'],_0x1f1457);const _0x338482=ImageManager[_0x5d313e(0x21e)]+0x4;_0x4eb862['x']+=_0x338482,_0x4eb862[_0x5d313e(0x1ce)]-=_0x338482;}else this[_0x5d313e(0x28b)]();}this[_0x5d313e(0x26a)](_0x5ab536,_0x4eb862['x'],_0x4eb862['y'],_0x4eb862['width'],_0x5d313e(0x1e9)),this[_0x5d313e(0x2f3)](ColorManager[_0x5d313e(0x292)]()),this[_0x5d313e(0x26a)]($gameVariables[_0x5d313e(0x33d)](_0x5e3e93),_0x4eb862['x'],_0x4eb862['y'],_0x4eb862[_0x5d313e(0x1ce)],_0x5d313e(0x339));};