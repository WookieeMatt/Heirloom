//=============================================================================
// VisuStella MZ - Extended Message Functionality
// VisuMZ_2_ExtMessageFunc.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ExtMessageFunc = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ExtMessageFunc = VisuMZ.ExtMessageFunc || {};
VisuMZ.ExtMessageFunc.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.09] [ExtMessageFunc]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Extended_Message_Functionality_VisuStella_MZ
 * @base VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Extended Message Function plugin adds onto RPG Maker MZ's Message Window
 * and adds in various features you would normally see found in modern RPG's.
 * Things like automatically moving the text forward after a set amount of time
 * or fast forward are available. Saving and loading during a message is also
 * possible as well as going to the Options menu or returning back to the title
 * screen. These options are only available to the Message Window on the map
 * scene and do not work in battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * The Button Console appears on the Message Window let the player activate
 *   various commands via touch/click.
 * * Extended Fast Forward Mode is an expanded feature upon the Message Core's
 *   Fast Forward function to fast forward all events and not just messages.
 *   This can be optionally disabled.
 * * A Message Cursor will appear where the text has ended for those who want
 *   that kind of aesthetic in their game.
 * * Auto-Forward will automatically move messages onward after a certain
 *   amount of time has passed. Time required will be determined based on the
 *   length of the message in question.
 * * Saving and Loading can be done from the Message Window akin to how many
 *   visual novels work. Requires the Save Core, but you're already using that,
 *   right? Right?
 * * Also be able to jump straight into the Options scene from the Message
 *   Window to change any settings on the fly. Requires the Options Core, but
 *   you're using that, too, correct?
 * * And for those who want to jump back to the title screen, they can do so
 *   by selecting a Game End option, too.
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
 * * VisuMZ_1_MessageCore
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
 * The Options Core is a required plugin in order to make use of the "Options"
 * (aka "Config") button found in the Button Console.
 *
 * ---
 *
 * VisuMZ_1_SaveCore
 *
 * The Options Core is a required plugin in order to make use of the "Save" and
 * "Load" buttons found in the Button Console.
 *
 * ---
 * 
 * VisuMZ_3_MessageLog
 * 
 * The Message Log plugin enables the "Log" button found in the Button Console
 * to let the player go and review the text that has been displayed in the map
 * scene. This does not include the text found in battle to avoid conflicting
 * logged messages across different situations.
 * 
 * ---
 * 
 * VisuMZ_4_MessageVisibility
 * 
 * The Message Visibility plugin enables the "Hide" button found in the
 * Button Console to make the Message Window visible or invisible.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Button Console-Related Text Codes ===
 * 
 * ---
 *
 * --------------------   -----------------------------------------------------
 * Text Code              Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * <Hide Buttons>         Hides the Button Console from this current Message
 *                        Window's text assuming that nothing else is hiding
 *                        the Button Console from view.
 * 
 * ---
 * 
 * === Message Tail-Related Text Codes ===
 *
 * --------------------   -----------------------------------------------------
 * Text Code              Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * <Tail Bottom Left: x>  Creates a message tail at x coordinate pointing to
 *                        the bottom left.
 * <Tail Bottom Right: x> Creates a message tail at x coordinate pointing to
 *                        the bottom right.
 * <Tail Upper Left: x>   Creates a message tail at x coordinate pointing to
 *                        the upper left.
 * <Tail Upper Right: x>  Creates a message tail at x coordinate pointing to
 *                        the upper right.
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
 * === Fast Forward Plugin Commands ===
 * 
 * ---
 *
 * Fast Forward: Allow/Disallow
 * - Change whether or not Fast Forward is allowed/disallowed.
 * - Must be enabled by the Plugin Parameters.
 *
 *   Allow?:
 *   - Allow or disallow the Extended Fast Forward feature?
 *   - Must be enabled by the Plugin Parameters.
 *
 * ---
 * 
 * === Message Button Console Plugin Commands ===
 * 
 * ---
 *
 * Message Button Console: Show/Hide
 * - Determine if the Message Button Console is visible or hidden.
 * - Only appears on the map. 
 * - Does not appear in battle.
 *
 *   Visible?:
 *   - Show or hide the Message Button Console feature?
 *   - Only appears on the map.
 *   - Does not appear in battle.
 *
 * ---
 * 
 * === Message Cursor Plugin Commands ===
 * 
 * ---
 *
 * Message Cursor: Change Settings
 * - Change the Message Cursor settings used.
 *
 *   Change Settings:
 *   - Change the Message Cursor settings.
 *   - Settings are the same as the ones found in the Plugin Parameters.
 *
 * ---
 * 
 * === Message Tail Plugin Commands ===
 * 
 * ---
 * 
 * Message Tail: Change Settings
 * - Change the Message Tail settings.
 * 
 *   Message Tail Settings:
 *   - Message Tail settings used for Message Windows.
 *   - Requires images and text codes to appear.
 *   - See Plugin Parameters. They have the same parameters.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Forward Settings
 * ============================================================================
 *
 * Auto-Forward settings used for this game. Auto-Forward is a feature that
 * once enabled, the game will automatically move the "Show Text" event
 * commands forward after a certain amount of time. The amount of time will be
 * determined by how many characters are displayed on the screen. There is a
 * lower boundary, where if the wait time does not meet the amount, the timer
 * will be set to the minimum wait value instead.
 *
 * ---
 *
 * Settings
 * 
 *   Wait per Character:
 *   - How many frames should the game wait per character?
 *   - Average: 60 frames per second.
 * 
 *   Minimum Wait:
 *   - What is the minimum amount of frames to wait?
 *   - Average: 60 frames per second.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Fast Forward (Extended) Settings
 * ============================================================================
 *
 * Extended Fast Forward settings used for this game. If enabled, this will
 * replace the Message Core's Fast Forward functionality. The Extended Fast
 * Forward feature will not only fast forward through messages but any running
 * events that are not found in a parallel event.
 * 
 * It can also be activated the Message Core's Fast Forward shortcut key.
 *
 * ---
 *
 * Settings
 * 
 *   Enable?:
 *   - Enable or disable the Extended Fast Forward feature?
 * 
 *   Speed:
 *   - What is the speed at which Extended Fast Forward works at?
 *   - Higher numbers are faster.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Message Button Console Settings
 * ============================================================================
 *
 * Message Button Console settings used for this game.
 * 
 * It will only appear in the Message Window on the map scene. It will NOT
 * appear in battle. The reason it won't appear in battle is because many of
 * the functions there will clash with how the battle scene behaves.
 * 
 * The Button Console will add extra padding to the Message Window and appear
 * at either the top of bottom of the Message Window (your choice). A row of
 * buttons will appear each with a different functionality.
 * 
 * These Plugin Parameters also allow you to customize the appearance of how
 * the buttons look in-game. Adjust them accordingly.
 *
 * ---
 *
 * General
 * 
 *   Show by Default?:
 *   - Show or hide the Message Button Console by default?
 * 
 *   Position:
 *   - Where do you wish to display the Message Button Console?
 *     - Top of Message Window
 *     - Bottom of Message Window
 * 
 *   Auto-Size Hide?:
 *   - Hide the button console when using auto-size text codes?
 *
 * ---
 *
 * Appearance
 * 
 *   Window Skin:
 *   - What is the window skin used for the buttons?
 *   - Ignore if using Background Images.
 * 
 *   Font Name:
 *   - What font do you wish to use for the Message Button Console?
 * 
 *     Font Size:
 *     - What font size do you wish to use for the Message Button Console?
 * 
 *   Text Colors:
 * 
 *     Normal Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Toggled Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Disabled Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Visuals:
 * 
 *     Width:
 *     - What is the width of each button?
 * 
 *     Height:
 *     - What is the height of each button?
 * 
 *     Buffer:
 *     - What is the buffer between each button?
 * 
 *   Background Images:
 * 
 *     Disabled Image:
 *     Enabled Image:
 *     Toggled Image:
 *     - Filename of the background image when the button is disabled,
 *       enabled, or toggled.
 *     - This will hide the window skin for this button.
 * 
 *     Offset X:
 *     - Offsets the X position of this image.
 *     - Negative: left; Positive: right
 * 
 *     Offset Y:
 *     - Offsets the Y position of this image.
 *     - Negative: up; Positive: down
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Button Settings
 * ============================================================================
 *
 * Settings for which buttons appear and how they appear. These settings will
 * determine which buttons appear (provided that their required plugins are
 * available), what shortcut keys are applied to them, and what kind of text
 * will be displayed to represent them.
 * 
 * In case you are wondering where the Fast Forward shortcut key is, that
 * setting is found in the Message Core.
 *
 * ---
 *
 * General
 * 
 *   List:
 *   - Which buttons appear and in what order?
 *   - Some commands require certain plugins installed.
 *
 * ---
 *
 * Shortcut Keys
 * 
 *   Auto-Forward Key:
 *   - This is the key used for auto-forwarding messages.
 * 
 *   Save Key:
 *   - This is the key used for quick saving.
 *   - Requires VisuMZ_1_SaveCore!
 * 
 *   Load Key:
 *   - This is the key used for quick load.
 *   - Requires VisuMZ_1_SaveCore!
 * 
 *   Options Key:
 *   - This is the key used for opening options.
 *   - Requires VisuMZ_1_OptionsCore!
 * 
 *   Game End Key:
 *   - This is the key used for ending the game.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Auto-Forward:
 *   - How is this option's text displayed in-game?
 * 
 *   Fast Forward:
 *   - How is this option's text displayed in-game?
 * 
 *   Save Game:
 *   - How is this option's text displayed in-game?
 *   - Requires VisuMZ_1_SaveCore!
 * 
 *   Load Game:
 *   - How is this option's text displayed in-game?
 *   - Requires VisuMZ_1_SaveCore!
 * 
 *   Options:
 *   - How is this option's text displayed in-game?
 *   - Requires VisuMZ_1_OptionsCore!
 * 
 *   Game End:
 *   - How is this option's text displayed in-game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Message Cursor Settings
 * ============================================================================
 *
 * Message Cursor settings used for this game. The cursor, if enabled, will
 * appear where the text is currently displayed at and adds a new type of
 * aesthetic to the game.
 *
 * ---
 *
 * General
 * 
 *   Enable?:
 *   - Enable or disable the message cursor?
 * 
 *   Graphic Type:
 *   - What is the cursor's graphic type?
 *     - Icon - From img/system/IconSet.png
 *     - Image - An animated image from img/system/
 *     - Window Skin - Use the default Window Skin cursor
 *
 * ---
 *
 * Icon
 * 
 *   Icon Index:
 *   - This is icon used for the Message Cursor.
 * 
 *   Flip Speed Multiplier:
 *   - What is the flip speed multiplier for the Message Cursor?
 *   - Use 0 for no flipping.
 *
 * ---
 *
 * Image
 * 
 *   Filename:
 *   - Filename of the image found inside the img/system/ folder.
 * 
 *   Image Rows:
 *   - How many rows are there for the image?
 * 
 *   Image Columns:
 *   - How many columns are there for the image?
 * 
 *   Frame Delay:
 *   - How many frames delayed are there per animated cell?
 *
 * ---
 *
 * Appearance
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Determine the Message Cursor's X/Y position.
 *   - Use a number between 0 and 1 for best results.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the Message Cursor's X/Y position by how many pixels?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Message Tail Settings
 * ============================================================================
 *
 * Message Tails can be made to appear from the Message Window and point
 * towards the speaker, similar to how speech bubbles in comics point towards
 * their speakers. The Message Tails do not appear on their own, and only come
 * out when using auto-position text codes (if enabled) such as <Auto Player>
 * or when text codes are used to make them appear such as <Tail Upper Left: x>
 * and <Tail Lower Right: x>.
 * 
 * These settings require custom graphics that this plugin does not come with.
 * You will need to add them on your own or else they will not appear.
 *
 * ---
 *
 * Auto-Position
 * 
 *   Enable?:
 *   - Show Message Tails with Auto-Position text codes?
 *   - Message Tails will appear when using the following text codes:
 *     - <Auto Actor: x>
 *     - <Auto Party: x>
 *     - <Auto Player>
 *     - <Auto Event: x>
 *     - <Auto Enemy: x>
 * 
 *   Face Left?:
 *   - Which direction does the Message Tail point to?
 *   - Left or right?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Message Window's X offset with auto-position.
 *   - X: Negative: left. Positive: right.
 *   - Y: Negative: up. Positive: down.
 *
 * ---
 *
 * Tail Directions
 * Tail Directions > Bottom Left
 * Tail Directions > Bottom Right
 * Tail Directions > Upper Left
 * Tail Directions > Upper Right
 * 
 *   Filename:
 *   - Filename of the Message Tail graphic going towards the
 *     specified direction.
 * 
 *   Anchor X:
 *   - Anchor value X. Use a number between 0 and 1.
 *   - 0.0 - Left; 0.5 - Center; 1.0 - Right
 * 
 *   Anchor Y:
 *   - Anchor value Y. Use a number between 0 and 1.
 *   - 0.0 - Top; 0.5 - Middle; 1.0 - Bottom
 * 
 *   Offset X:
 *   - Offset the Message Tail's X position.
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the Message Tail's Y position.
 *   - Negative: left. Positive: right.
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
 * * Irina
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.09: April 7, 2022
 * * Bug Fixes!
 * ** Default message cursor no longer appears in the wrong place when no
 *    message cursor skin is used for auto-sized messages. Fix by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter option added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Message Cursor Settings > Graphics Type
 * **** New option added: Window Skin - Use the default Window Skin cursor
 * **** This is for those who wish to use the default window skin cursor
 *      instead of icons or images.
 * 
 * Version 1.08: March 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands, Text Codes, and Plugin Parameters added by Irina
 *    and sponsored by Archeia!
 * *** Message Tails can be made to appear from the Message Window and point
 *     towards the speaker, similar to how speech bubbles in comics point
 *     towards their speakers. The Message Tails do not appear on their own,
 *     and only come out when using auto-position text codes (if enabled) such
 *     as <Auto Player> or when text codes are used to make them appear such as
 *     <Tail Upper Left: x> and <Tail Lower Right: x>.
 * *** These settings require custom graphics that this plugin does not come
 *     with. You will need to add them on your own or else they will not
 *     appear.
 * *** Text Codes added: <Tail Bottom Left: x>, <Tail Bottom Right: x>,
 *     <Tail Upper Left: x>, <Tail Upper Right: x>
 * *** Plugin Command Added: Message Tail: Change Settings
 * *** Plugin Parameters Added: Message Tail Settings
 * 
 * Version 1.07: March 3, 2022
 * * Compatibility Update
 * ** Added better compatibility functionality with other plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Message Button Console > Auto-Size Hide?
 * **** Hide the button console when using auto-size text codes?
 * 
 * Version 1.06: November 18, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: November 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by Archeia:
 * *** Plugin Parameters > Message Button Console > Background Images
 * **** Adds a background image to this button instead of using a window skin.
 * **** This will disable the window skin.
 * **** Various images can be used for "Disabled", "Enabled", and "Toggled".
 * **** Offset X and Y positions.
 * 
 * Version 1.04: October 14, 2021
 * * Feature Update!
 * ** Added an alert requirement for those who are using very old versions of
 *    the Message Core that cannot sustain the requirements of this plugin.
 *    Added by Irina.
 * 
 * Version 1.03: September 3, 2021
 * * Bug Fixes!
 * ** Pause sprite, for the Message Window, will no longer show multiple copies
 *    if the message cursor sprite is disabled. Fix made by Irina.
 * 
 * Version 1.02: August 6, 2021
 * * Documentation Update!
 * ** Plugin URL now updated to most recent one.
 * 
 * Version 1.01: July 30, 2021
 * * Feature Update!
 * ** Added graphic pre-loading for save/load menu preparation. Added by Irina.
 * 
 * Version 1.00 Official Release Date: August 2, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExtFastFwdDisallow
 * @text Fast Forward: Allow/Disallow
 * @desc Change whether or not Fast Forward is allowed/disallowed.
 * Must be enabled by the Plugin Parameters.
 *
 * @arg Allow:eval
 * @text Allow?
 * @parent General
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow or disallow the Extended Fast Forward feature?
 * Must be enabled by the Plugin Parameters.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgButtonConsole
 * @text Message Button Console: Show/Hide
 * @desc Determine if the Message Button Console is visible or hidden.
 * Only appears on the map. Does not appear in battle.
 *
 * @arg Visible:eval
 * @text Visible?
 * @parent General
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the Message Button Console feature?
 * Only appears on the map. Does not appear in battle.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageCursorSettings
 * @text Message Cursor: Change Settings
 * @desc Change the Message Cursor settings used.
 *
 * @arg MsgCursor:struct
 * @text Change Settings
 * @type struct<MsgCursor>
 * @desc Change the Message Cursor settings.
 * @default {"General":"","Enable:eval":"true","GraphicType:str":"icon","Icon":"","IconIndex:str":"188","FlipMultiplier:str":"0.125","Image":"","Filename:str":"","Rows:num":"1","Cols:num":"1","FrameDelay:num":"4","Appearance":"","AnchorX:num":"0.5","AnchorY:num":"1","OffsetX:num":"+0","OffsetY:num":"-4"}
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command MessageTailSettings
 * @text Message Tail: Change Settings
 * @desc Change the Message Tail settings.
 *
 * @arg Settings:struct
 * @text Message Tail Settings
 * @type struct<MsgTail>
 * @desc Message Tail settings used for Message Windows.
 * Requires images and text codes to appear.
 * @default {"AutoPosition":"","autoPositionTail:eval":"true","autoPositionLeft:eval":"true","autoPositionOffsetX:num":"+0","autoPositionOffsetY:num":"+0","TailDir":"","BottomLeft":"","bottomLeftFilename:str":"","bottomLeftAnchorX:num":"0.5","bottomLeftAnchorY:num":"0.0","bottomLeftOffsetX:num":"+0","bottomLeftOffsetY:num":"+0","BottomRight":"","bottomRightFilename:str":"","bottomRightAnchorX:num":"0.5","bottomRightAnchorY:num":"0.0","bottomRightOffsetX:num":"+0","bottomRightOffsetY:num":"+0","UpperLeft":"","upperLeftFilename:str":"","upperLeftAnchorX:num":"0.5","upperLeftAnchorY:num":"1.0","upperLeftOffsetX:num":"+0","upperLeftOffsetY:num":"+0","UpperRight":"","upperRightFilename:str":"","upperRightAnchorX:num":"0.5","upperRightAnchorY:num":"1.0","upperRightOffsetX:num":"+0","upperRightOffsetY:num":"+0"}
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
 * @param ExtMessageFunc
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Auto:struct
 * @text Auto-Forward Settings
 * @type struct<Auto>
 * @desc Auto-Forward settings used for this game.
 * @default {"WaitPerChar:num":"6","MinimumWait:num":"300"}
 *
 * @param FastFwd:struct
 * @text Fast Forward (Extended)
 * @type struct<FastFwd>
 * @desc Extended Fast Forward settings used for this game.
 * @default {"Enable:eval":"true","Speed:num":"8"}
 *
 * @param MsgButtonConsole:struct
 * @text Message Button Console
 * @type struct<MsgButtonConsole>
 * @desc Message Button Console settings used for this game.
 * @default {"General":"","ShowDefault:eval":"true","Position:str":"bottom","Appearance":"","WindowSkin:str":"Window","FontFace:str":"Arial","FontSize:num":"18","TextColors":"","NormalColor:str":"0","ToggledColor:str":"24","DisabledColor:str":"7","Visuals":"","ButtonWidth:num":"86","ButtonHeight:num":"36","ButtonBuffer:num":"6"}
 *
 * @param Buttons:struct
 * @text Button Settings
 * @parent MsgButtonConsole:struct
 * @type struct<Buttons>
 * @desc Settings for which buttons appear and how they appear.
 * @default {"General":"","List:arraystr":"[\"auto\",\"fastFwd\",\"log\",\"hide\",\"save\",\"load\",\"options\",\"gameEnd\"]","AutoKey:str":"none","Shortcuts":"","SaveKey:str":"none","LoadKey:str":"none","OptionsKey:str":"none","GameEndKey:str":"none","Vocab":"","Auto:str":"AUTO","FastFwd:str":"FAST","Save:str":"SAVE","Load:str":"LOAD","Options:str":"CONFIG","GameEnd:str":"TITLE"}
 *
 * @param MsgCursor:struct
 * @text Message Cursor Settings
 * @type struct<MsgCursor>
 * @desc Message Cursor settings used for this game.
 * @default {"General":"","Enable:eval":"true","GraphicType:str":"icon","Icon":"","IconIndex:str":"188","FlipMultiplier:str":"0.125","Image":"","Filename:str":"","Rows:num":"1","Cols:num":"1","FrameDelay:num":"4","Appearance":"","AnchorX:num":"0.5","AnchorY:num":"1","OffsetX:num":"+0","OffsetY:num":"-4"}
 *
 * @param MsgTail:struct
 * @text Message Tail Settings
 * @type struct<MsgTail>
 * @desc Message Tail settings used for Message Windows.
 * Requires images and text codes to appear.
 * @default {"AutoPosition":"","autoPositionTail:eval":"true","autoPositionLeft:eval":"true","autoPositionOffsetX:num":"+0","autoPositionOffsetY:num":"+0","TailDir":"","BottomLeft":"","bottomLeftFilename:str":"","bottomLeftAnchorX:num":"0.5","bottomLeftAnchorY:num":"0.0","bottomLeftOffsetX:num":"+0","bottomLeftOffsetY:num":"+0","BottomRight":"","bottomRightFilename:str":"","bottomRightAnchorX:num":"0.5","bottomRightAnchorY:num":"0.0","bottomRightOffsetX:num":"+0","bottomRightOffsetY:num":"+0","UpperLeft":"","upperLeftFilename:str":"","upperLeftAnchorX:num":"0.5","upperLeftAnchorY:num":"1.0","upperLeftOffsetX:num":"+0","upperLeftOffsetY:num":"+0","UpperRight":"","upperRightFilename:str":"","upperRightAnchorX:num":"0.5","upperRightAnchorY:num":"1.0","upperRightOffsetX:num":"+0","upperRightOffsetY:num":"+0"}
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
 * Auto-Forward Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Auto:
 *
 * @param WaitPerChar:num
 * @text Wait per Character
 * @parent General
 * @type number
 * @min 1
 * @desc How many frames should the game wait per character?
 * Average: 60 frames per second.
 * @default 6
 *
 * @param MinimumWait:num
 * @text Minimum Wait
 * @parent General
 * @type number
 * @min 1
 * @desc What is the minimum amount of frames to wait?
 * Average: 60 frames per second.
 * @default 300
 *
 */
/* ----------------------------------------------------------------------------
 * Extended Fast Forward Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FastFwd:
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable or disable the Extended Fast Forward feature?
 * @default true
 *
 * @param Speed:num
 * @text Speed
 * @parent General
 * @type number
 * @min 2
 * @desc What is the speed at which Extended Fast Forward works at?
 * Higher numbers are faster.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * Message Button Console Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MsgButtonConsole:
 *
 * @param General
 *
 * @param ShowDefault:eval
 * @text Show by Default?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the Message Button Console by default?
 * @default true
 *
 * @param Position:str
 * @text Position
 * @parent General
 * @type select
 * @option Top of Message Window
 * @value top
 * @option Bottom of Message Window
 * @value bottom
 * @desc Where do you wish to display the Message Button Console?
 * @default bottom
 *
 * @param AutoSizeHide:eval
 * @text Auto-Size Hide?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Hide the button console when using auto-size text codes?
 * @default false
 *
 * @param Appearance
 *
 * @param WindowSkin:str
 * @text Window Skin
 * @parent Appearance
 * @type file
 * @dir img/system/
 * @require 1
 * @desc What is the window skin used for the buttons?
 * Ignore if using Background Images.
 * @default Window
 *
 * @param FontFace:str
 * @text Font Name
 * @parent Appearance
 * @desc What font do you wish to use for the Message Button Console?
 * @default Arial
 *
 * @param FontSize:num
 * @text Font Size
 * @parent FontFace:str
 * @type number
 * @min 1
 * @desc What font size do you wish to use for the Message Button Console?
 * @default 18
 * 
 * @param TextColors
 * @text Text Colors
 * @parent Appearance
 *
 * @param NormalColor:str
 * @text Normal Color
 * @parent TextColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ToggledColor:str
 * @text Toggled Color
 * @parent TextColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param DisabledColor:str
 * @text Disabled Color
 * @parent TextColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param Visuals
 * @text Button Visuals
 * @parent Appearance
 *
 * @param ButtonWidth:num
 * @text Width
 * @parent Visuals
 * @type number
 * @min 1
 * @desc What is the width of each button?
 * @default 86
 *
 * @param ButtonHeight:num
 * @text Height
 * @parent Visuals
 * @type number
 * @min 1
 * @desc What is the height of each button?
 * @default 36
 *
 * @param ButtonBuffer:num
 * @text Buffer
 * @parent Visuals
 * @type number
 * @min 1
 * @desc What is the buffer between each button?
 * @default 6
 *
 * @param Images
 * @text Background Images
 * @parent Appearance
 *
 * @param ImgDisabled:str
 * @text Disabled Image
 * @parent Images
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the background image when the button is disabled.
 * @default 
 *
 * @param ImgDisabledOffsetX:num
 * @text Offset X
 * @parent ImgDisabled:str
 * @desc Offsets the X position of this image.
 * Negative: left; Positive: right
 * @default +0
 *
 * @param ImgDisabledOffsetY:num
 * @text Offset Y
 * @parent ImgDisabled:str
 * @desc Offsets the Y position of this image.
 * Negative: up; Positive: down
 * @default +0
 *
 * @param ImgEnabled:str
 * @text Enabled Image
 * @parent Images
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the background image when the button is enabled.
 * @default 
 *
 * @param ImgEnabledOffsetX:num
 * @text Offset X
 * @parent ImgEnabled:str
 * @desc Offsets the X position of this image.
 * Negative: left; Positive: right
 * @default +0
 *
 * @param ImgEnabledOffsetY:num
 * @text Offset Y
 * @parent ImgEnabled:str
 * @desc Offsets the Y position of this image.
 * Negative: up; Positive: down
 * @default +0
 *
 * @param ImgToggled:str
 * @text Toggled Image
 * @parent Images
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the background image when the button is toggled.
 * @default 
 *
 * @param ImgToggledOffsetX:num
 * @text Offset X
 * @parent ImgToggled:str
 * @desc Offsets the X position of this image.
 * Negative: left; Positive: right
 * @default +0
 *
 * @param ImgToggledOffsetY:num
 * @text Offset Y
 * @parent ImgToggled:str
 * @desc Offsets the Y position of this image.
 * Negative: up; Positive: down
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buttons:
 *
 * @param General
 *
 * @param List:arraystr
 * @text List
 * @parent General
 * @type combo[]
 * @option auto
 * @option log
 * @option fastFwd
 * @option gameEnd
 * @option hide
 * @option load
 * @option options
 * @option save
 * @desc Which buttons appear and in what order?
 * Some commands require certain plugins installed.
 * @default ["auto","fastFwd","log","hide","save","load","options","gameEnd"]
 * 
 * @param Shortcuts
 * @text Shortcut Keys
 *
 * @param AutoKey:str
 * @text Auto-Forward Key
 * @parent General
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for auto-forwarding messages.
 * @default none
 * 
 * @param SaveKey:str
 * @text Save Key
 * @parent Shortcuts
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for quick saving.
 * Requires VisuMZ_1_SaveCore!
 * @default none
 * 
 * @param LoadKey:str
 * @text Load Key
 * @parent Shortcuts
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for quick load.
 * Requires VisuMZ_1_SaveCore!
 * @default none
 * 
 * @param OptionsKey:str
 * @text Options Key
 * @parent Shortcuts
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for opening options.
 * Requires VisuMZ_1_OptionsCore!
 * @default none
 * 
 * @param GameEndKey:str
 * @text Game End Key
 * @parent Shortcuts
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for ending the game.
 * @default none
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param Auto:str
 * @text Auto-Forward
 * @parent Vocab
 * @desc How is this option's text displayed in-game?
 * @default AUTO
 *
 * @param FastFwd:str
 * @text Fast Forward
 * @parent Vocab
 * @desc How is this option's text displayed in-game?
 * @default FAST
 *
 * @param Save:str
 * @text Save Game
 * @parent Vocab
 * @desc How is this option's text displayed in-game?
 * Requires VisuMZ_1_SaveCore!
 * @default SAVE
 *
 * @param Load:str
 * @text Load Game
 * @parent Vocab
 * @desc How is this option's text displayed in-game?
 * Requires VisuMZ_1_SaveCore!
 * @default LOAD
 *
 * @param Options:str
 * @text Options
 * @parent Vocab
 * @desc How is this option's text displayed in-game?
 * Requires VisuMZ_1_OptionsCore!
 * @default CONFIG
 *
 * @param GameEnd:str
 * @text Game End
 * @parent Vocab
 * @desc How is this option's text displayed in-game?
 * @default TITLE
 *
 */
/* ----------------------------------------------------------------------------
 * Message Cursor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MsgCursor:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable or disable the message cursor?
 * @default true
 *
 * @param GraphicType:str
 * @text Graphic Type
 * @parent General
 * @type select
 * @option Icon - From img/system/IconSet.png
 * @value icon
 * @option Image - An animated image from img/system/
 * @value image
 * @option Window Skin - Use the default Window Skin cursor
 * @value windowskin
 * @desc What is the cursor's graphic type?
 * @default icon
 * 
 * @param Icon
 *
 * @param IconIndex:str
 * @text Icon Index
 * @parent Icon
 * @desc This is icon used for the Message Cursor.
 * @default 188
 *
 * @param FlipMultiplier:str
 * @text Flip Speed Multiplier
 * @parent Icon
 * @desc What is the flip speed multiplier for the Message Cursor?
 * Use 0 for no flipping.
 * @default 1
 * 
 * @param Image
 *
 * @param Filename:str
 * @text Filename
 * @parent Image
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the image found inside the img/system/ folder.
 * @default 
 *
 * @param Rows:num
 * @text Image Rows
 * @parent Image
 * @type number
 * @min 1
 * @desc How many rows are there for the image?
 * @default 1
 *
 * @param Cols:num
 * @text Image Columns
 * @parent Image
 * @type number
 * @min 1
 * @desc How many columns are there for the image?
 * @default 1
 *
 * @param FrameDelay:num
 * @text Frame Delay
 * @parent Image
 * @type number
 * @min 1
 * @desc How many frames delayed are there per animated cell?
 * @default 4
 * 
 * @param Appearance
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Appearance
 * @desc Determine the Message Cursor's X position.
 * Use a number between 0 and 1 for best results.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Appearance
 * @desc Determine the Message Cursor's Y position.
 * Use a number between 0 and 1 for best results.
 * @default 1
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Appearance
 * @desc Offset the Message Cursor's X position by how many pixels?
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Appearance
 * @desc Offset the Message Cursor's Y position by how many pixels?
 * @default -8
 *
 */
/* ----------------------------------------------------------------------------
 * Message Tail Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MsgTail:
 *
 * @param AutoPosition
 * @text Auto-Position
 *
 * @param autoPositionTail:eval
 * @text Enable?
 * @parent AutoPosition
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Show Message Tails with Auto-Position text codes?
 * @default true
 *
 * @param autoPositionLeft:eval
 * @text Face Left?
 * @parent AutoPosition
 * @type boolean
 * @on Face Left
 * @off Face Right
 * @desc Which direction does the Message Tail point to?
 * @default true
 *
 * @param autoPositionOffsetX:num
 * @text Offset X
 * @parent AutoPosition
 * @desc Message Window's X offset with auto-position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param autoPositionOffsetY:num
 * @text Offset Y
 * @parent AutoPosition
 * @desc Message Window's Y offset with auto-position.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @param TailDir
 * @text Tail Directions
 *
 * @param BottomLeft
 * @text Bottom Left
 * @parent TailDir
 *
 * @param bottomLeftFilename:str
 * @text Filename
 * @parent BottomLeft
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the Message Tail graphic going towards
 * the bottom left.
 * @default 
 *
 * @param bottomLeftAnchorX:num
 * @text Anchor X
 * @parent BottomLeft
 * @desc Anchor value X. Use a number between 0 and 1.
 * 0.0 - Left; 0.5 - Center; 1.0 - Right
 * @default 0.5
 *
 * @param bottomLeftAnchorY:num
 * @text Anchor Y
 * @parent BottomLeft
 * @desc Anchor value Y. Use a number between 0 and 1.
 * 0.0 - Top; 0.5 - Middle; 1.0 - Bottom
 * @default 0.0
 *
 * @param bottomLeftOffsetX:num
 * @text Offset X
 * @parent BottomLeft
 * @desc Offset the Message Tail's X position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param bottomLeftOffsetY:num
 * @text Offset Y
 * @parent BottomLeft
 * @desc Offset the Message Tail's Y position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param BottomRight
 * @text Bottom Right
 * @parent TailDir
 *
 * @param bottomRightFilename:str
 * @text Filename
 * @parent BottomRight
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the Message Tail graphic going towards
 * the bottom right.
 * @default 
 *
 * @param bottomRightAnchorX:num
 * @text Anchor X
 * @parent BottomRight
 * @desc Anchor value X. Use a number between 0 and 1.
 * 0.0 - Left; 0.5 - Center; 1.0 - Right
 * @default 0.5
 *
 * @param bottomRightAnchorY:num
 * @text Anchor Y
 * @parent BottomRight
 * @desc Anchor value Y. Use a number between 0 and 1.
 * 0.0 - Top; 0.5 - Middle; 1.0 - Bottom
 * @default 0.0
 *
 * @param bottomRightOffsetX:num
 * @text Offset X
 * @parent BottomRight
 * @desc Offset the Message Tail's X position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param bottomRightOffsetY:num
 * @text Offset Y
 * @parent BottomRight
 * @desc Offset the Message Tail's Y position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param UpperLeft
 * @text Upper Left
 * @parent TailDir
 *
 * @param upperLeftFilename:str
 * @text Filename
 * @parent UpperLeft
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the Message Tail graphic going towards
 * the upper left.
 * @default 
 *
 * @param upperLeftAnchorX:num
 * @text Anchor X
 * @parent UpperLeft
 * @desc Anchor value X. Use a number between 0 and 1.
 * 0.0 - Left; 0.5 - Center; 1.0 - Right
 * @default 0.5
 *
 * @param upperLeftAnchorY:num
 * @text Anchor Y
 * @parent UpperLeft
 * @desc Anchor value Y. Use a number between 0 and 1.
 * 0.0 - Top; 0.5 - Middle; 1.0 - Bottom
 * @default 1.0
 *
 * @param upperLeftOffsetX:num
 * @text Offset X
 * @parent UpperLeft
 * @desc Offset the Message Tail's X position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param upperLeftOffsetY:num
 * @text Offset Y
 * @parent UpperLeft
 * @desc Offset the Message Tail's Y position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param UpperRight
 * @text Upper Right
 * @parent TailDir
 *
 * @param upperRightFilename:str
 * @text Filename
 * @parent UpperRight
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Filename of the Message Tail graphic going towards
 * the upper right.
 * @default 
 *
 * @param upperRightAnchorX:num
 * @text Anchor X
 * @parent UpperRight
 * @desc Anchor value X. Use a number between 0 and 1.
 * 0.0 - Left; 0.5 - Center; 1.0 - Right
 * @default 0.5
 *
 * @param upperRightAnchorY:num
 * @text Anchor Y
 * @parent UpperRight
 * @desc Anchor value Y. Use a number between 0 and 1.
 * 0.0 - Top; 0.5 - Middle; 1.0 - Bottom
 * @default 1.0
 *
 * @param upperRightOffsetX:num
 * @text Offset X
 * @parent UpperRight
 * @desc Offset the Message Tail's X position.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param upperRightOffsetY:num
 * @text Offset Y
 * @parent UpperRight
 * @desc Offset the Message Tail's Y position.
 * Negative: left. Positive: right.
 * @default +0
 *
 */
//=============================================================================

const _0x2955fc=_0x4aca;function _0x4aca(_0x2636b9,_0x576fd2){const _0x425809=_0x4258();return _0x4aca=function(_0x4acac6,_0x123fcd){_0x4acac6=_0x4acac6-0x13c;let _0xe7c899=_0x425809[_0x4acac6];return _0xe7c899;},_0x4aca(_0x2636b9,_0x576fd2);}(function(_0x5baabe,_0xac901d){const _0x22f141=_0x4aca,_0x1c1329=_0x5baabe();while(!![]){try{const _0x1fa94b=parseInt(_0x22f141(0x2b1))/0x1+-parseInt(_0x22f141(0x228))/0x2+-parseInt(_0x22f141(0x1b8))/0x3*(-parseInt(_0x22f141(0x20d))/0x4)+parseInt(_0x22f141(0x1ef))/0x5*(-parseInt(_0x22f141(0x275))/0x6)+parseInt(_0x22f141(0x257))/0x7*(parseInt(_0x22f141(0x1ab))/0x8)+-parseInt(_0x22f141(0x2d3))/0x9+parseInt(_0x22f141(0x299))/0xa;if(_0x1fa94b===_0xac901d)break;else _0x1c1329['push'](_0x1c1329['shift']());}catch(_0x2e36c9){_0x1c1329['push'](_0x1c1329['shift']());}}}(_0x4258,0xcf5b8));var label='ExtMessageFunc',tier=tier||0x0,dependencies=[_0x2955fc(0x2d4)],pluginData=$plugins['filter'](function(_0x49c187){const _0x399254=_0x2955fc;return _0x49c187[_0x399254(0x2f1)]&&_0x49c187[_0x399254(0x2d0)]['includes']('['+label+']');})[0x0];function _0x4258(){const _0x447371=['isMessageAutoForwardMode','_contentsSprite','MessageTailSettings','BUTTON_ORDER','WindowSkin','isSceneBattle','_autoPosRegExp','status','left','ExtFastFwdDisallow','autoPositionOffsetY','OffsetX','_cache_customMessageCursorFrameCount','vuBSS','_choiceListWindow','_heldDownFastFwd','nnSPk','clamp','round','_messageTail','MsgCursor','_buttonConsoleButtons','refreshCustomMessageCursorPauseSign','ImgDisabled','anyActiveMessageInputWindows','checkBackImageSprites','TEXT_COLOR_TOGGLED','OCFww','ulEBE','LLCVf','isSaveEnabled','push','_autoForwardCount','BUTTON_BUFFER','active','onTouchScrollStart','Cols','createMessageTailSprite','ClbgU','sxMQv','initMessageCursorSettings','_numberInputWindow','isCustomMessageCursorEnabled','_messageWindow','format','KrXWy','toLowerCase','WtJff','tifRk','backOpacity','name','Ucbvh','KfquG','XZlPg','Window_Message_autoPositionOffsetY','HARvQ','qncig','right','playBuzzerSound','isExtendedFastForwardDisallowed','FyrEd','Window_Message_updateDimensions','_extFastForwardLooping','exit','tyDsB','autoForwardTriggered','Window_Message_startWait','isMainMenuMessageLogEnabled','FONT_SIZE','ToggledColor','upper','AnchorY','AutoSizeHide','MsgButtonConsole','getColor','moVmF','FrameDelay','GgBhK','%1Filename','_type','The\x20latest\x20version\x20is\x20required\x20to\x20use\x0a','updateColor','create','AUTO_FORWARD_MIN_DELAY','Window_Message_initMembers','_autoPositionTarget','fastfwd','sgkkZ','updateMessageTailVisibility','_cachedIndex','convertMessageTailEscapeCodes','frameCount','ARRAYNUM','max','OptionsKey','%1AnchorX','isTriggered','Buttons','createBackImageSprites','setFrame','GraphicType','updateDimensions','updateMessageTailSprite','_lastExtMsgFuncIndex','playCancel','hide','updateCustomMessageCursorPauseSignSprites','%1OffsetX','JDvRH','setMessageAutoForwardMode','Window_Message_isTriggered','drawMessageFace','_index','MKEpF','getMessageTailMainKey','Game_Temp_requestAnimation','xzmIP','replace','command101','GltJP','setMessageTailSettings','TulCw','8QLYkmX','USE_BACK_IMAGE_SPRITES','show','_msgCursorSettings','prototype','innerHeight','load','gcrgC','CrgYB','backlog','Window_Message','_createPauseSignSprites','addAutoForwardDelay','2223zIKWQf','cos','windowskin','updateExtMsgFuncResetTimers','_messageAutoForwardMode','fontFace','isTouchScrollEnabled','refresh','parse','updateMain','Right','_parentWindow','loadWindowskin','_extendedFastForwardMode','Visible','_messageTailSettings','Enable','parameters','AbzBg','EXT_FAST_FORWARD_LOOPS','faceIndex','_refreshPauseSign','Save','isSceneUsingExFastForward','return\x200','groMR','log','save','FlipMultiplier','registerCommand','FollowText','SceneManager_push','sxtfm','Window_Message_startPause','updateMainMultiply','ZktNO','positionX','VOCAB','makeDeepCopy','KfjaD','initMessageButtonConsole','trim','playOkSound','%1OffsetY','hHgHO','usesAutoPositionMessageTail','isSceneMap','General','oKrKo','floor','xzoHF','WxUlK','ConvertParams','direction','bDZyI','23890okzTfT','textColor','refreshButtonConsole','updateImageMessageCursorPauseSignSprites','_autoSizeRegexp','gameend','padding','yWiKX','addedHeight','Load','PsiVz','BUTTON_WIDTH','msgButtonConsole','prepareHideButtonConsoleTextCode','uUoTQ','MinimumWait','sxSAJ','_updatePauseSign','alpha','AUTO_FORWARD_DELAY_PER_CHAR','text','Settings','JSON','call','map','updateExtendedFastForwardCancel','MessageCore','_interpreter','FUNC','VisuMZ_1_OptionsCore','8340kBEWVP','buffer','Window_Message_autoPositionOffsetX','drawing','Window_Message_update','MjXaN','fontSize','Left','newPage','BtYXO','Scene_Battle_update','MsgTail','isCancelled','JXNrX','isEventRunning','autoPositionLeft','update','includes','ImgEnabled','AkHTV','faceName','loadSystem','VdsPq','hPdtU','openness','SKIN','Window_Message_newPage','296842BDhpWo','faceWidth','ZqmCh','createCustomMessageCursorPauseSignSprites','njdiw','setupMessageTailSettings','toUpperCase','VisuMZ_4_MessageVisibility','bottom','textColorID','_eventItemWindow','OffsetY','cDURw','moveCustomMessageCursorPauseSign','image','qGUok','_messageButtonConsoleVisible','DEFAULT_SHOW','resetMessageTailSettings','characterName','vcZsa','TEXT_COLOR_DISABLED','length','createButtonConsole','visible','NormalColor','husyV','FVZnh','WindowLayer_update','loadSvActor','loadSystemImagesForExtMessageFunc','processButtonShortcut','FastForwardKey','isPressed','loadPartyGraphics','BUTTON_HEIGHT','IconSet','updateConsoleVisibility','loadCharacter','_windowskin','updatePauseSignHeightextMsgFunction','qOYIZ','showButtonConsole','initMembers','opacity','vfMFI','updateEffekseer','1684270cUSesS','isOpen','resetFontSettings','iCFdf','updateBackImageSpriteVisibility','_pauseSignSprite','getMessageCursorSettings','itemPadding','Window_Message_initialize','pkCnH','pause','hideButtonConsoleAutoSize','Fipws','top','TEXT_COLOR_NORMAL','updateExtendedFastForwardMode','_buttonConsoleSprites','options','ButtonHeight','MessageCursorSettings','meetExtMsgFuncResetRequirements','ARRAYJSON','updateFade','POSITION','OggLp','ZErvI','_hideButtonConsole','clear','isFurnitureSystemMode','isMessageButtonConsoleVisible','1344TUQsll','isRTL','Rows','VisuMZ_2_FurnitureSystem','DisabledColor','changeTextColor','AutoKey','lastFile','auto','addButtonConsoleObject','parseMessageTailTextCodes','ButtonBuffer','LoadKey','loadFace','contents','VisuMZ_1_MessageCore\x20is\x20out\x20of\x20date.\x0a','updateMessageTailPosition','BWVvZ','requestAnimation','CLnfI','hNSOh','constructor','xhlIN','initExtendedFastForward','%1AnchorY','updateBackOpacity','initialize','getMessageTailSettings','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','#%1','match','isExtendedFastForwardMode','RNBHa','_pauseSignAnimationCount','battlerName','_messageTailSprite','5226070bGtuof','Scene_Boot_loadSystemImages','convertVariableEscapeCharacters','xytsf','uiZtT','hzYUA','Window_Message_addedHeight','_scene','Filename','zAsuJ','FontSize','drawFace','iconHeight','rtnqg','Game_System_initialize','Window_Base_flushTextState','autoPositionTail','deZVy','_childInterpreter','drawText','NUM','autoPositionOffsetX','Auto','xLmWr','1392677ogIFSw','TWhpD','isActivatedExtendedFastForwardMode','MEOyW','bottom%1Filename','ExtMessageFunc','location','loadSystemImages','createContents','setMessageCursorSettings','TSwkw','addChildToBack','setMessageButtonConsoleVisible','WaitPerChar','EVAL','updatePadding','bdlJz','center','scale','jVDpj','anchor','updateAutoPosition','isAnySavefileExists','addChild','AnchorX','mqckA','EXT_FAST_FORWARD_ENABLED','updateMessageTailBitmap','_disallowFastForward','lULhC','setExtendedFastForwardMode','description','startPause','BWIWg','14695650LqnXOi','VisuMZ_1_MessageCore','Game_Interpreter_command101','height','fmxBT','KQWUt','bitmap','umiKh','width','VisuMZ_1_SaveCore','onSavefileOk','FontFace','FastFwd','bUyYj','members','alignButtonConsoleButtons','FONT_FACE','ZnNYE','PAchY','SHORTCUT_KEY','Scene_Map_updateMainMultiply','ARRAYFUNC','ImgToggled'];_0x4258=function(){return _0x447371;};return _0x4258();}VisuMZ[label][_0x2955fc(0x204)]=VisuMZ[label][_0x2955fc(0x204)]||{},VisuMZ['ConvertParams']=function(_0x2dcf60,_0x292c56){const _0x52846f=_0x2955fc;for(const _0x50a59b in _0x292c56){if(_0x50a59b[_0x52846f(0x293)](/(.*):(.*)/i)){if(_0x52846f(0x234)===_0x52846f(0x1b2))return this['autoForwardTriggered']();else{const _0x4e16c8=String(RegExp['$1']),_0x5ee7ac=String(RegExp['$2'])[_0x52846f(0x22e)]()['trim']();let _0x2bd9cb,_0x181b44,_0x987b49;switch(_0x5ee7ac){case _0x52846f(0x2ad):_0x2bd9cb=_0x292c56[_0x50a59b]!==''?Number(_0x292c56[_0x50a59b]):0x0;break;case _0x52846f(0x18d):_0x181b44=_0x292c56[_0x50a59b]!==''?JSON[_0x52846f(0x1c0)](_0x292c56[_0x50a59b]):[],_0x2bd9cb=_0x181b44[_0x52846f(0x207)](_0x59618b=>Number(_0x59618b));break;case _0x52846f(0x2bf):_0x2bd9cb=_0x292c56[_0x50a59b]!==''?eval(_0x292c56[_0x50a59b]):null;break;case'ARRAYEVAL':_0x181b44=_0x292c56[_0x50a59b]!==''?JSON['parse'](_0x292c56[_0x50a59b]):[],_0x2bd9cb=_0x181b44[_0x52846f(0x207)](_0x57a27e=>eval(_0x57a27e));break;case _0x52846f(0x205):_0x2bd9cb=_0x292c56[_0x50a59b]!==''?JSON[_0x52846f(0x1c0)](_0x292c56[_0x50a59b]):'';break;case _0x52846f(0x26c):_0x181b44=_0x292c56[_0x50a59b]!==''?JSON[_0x52846f(0x1c0)](_0x292c56[_0x50a59b]):[],_0x2bd9cb=_0x181b44[_0x52846f(0x207)](_0x3d93a7=>JSON[_0x52846f(0x1c0)](_0x3d93a7));break;case _0x52846f(0x20b):_0x2bd9cb=_0x292c56[_0x50a59b]!==''?new Function(JSON[_0x52846f(0x1c0)](_0x292c56[_0x50a59b])):new Function(_0x52846f(0x1d0));break;case _0x52846f(0x2e8):_0x181b44=_0x292c56[_0x50a59b]!==''?JSON[_0x52846f(0x1c0)](_0x292c56[_0x50a59b]):[],_0x2bd9cb=_0x181b44[_0x52846f(0x207)](_0xbbb584=>new Function(JSON[_0x52846f(0x1c0)](_0xbbb584)));break;case'STR':_0x2bd9cb=_0x292c56[_0x50a59b]!==''?String(_0x292c56[_0x50a59b]):'';break;case'ARRAYSTR':_0x181b44=_0x292c56[_0x50a59b]!==''?JSON[_0x52846f(0x1c0)](_0x292c56[_0x50a59b]):[],_0x2bd9cb=_0x181b44[_0x52846f(0x207)](_0x3b7d9d=>String(_0x3b7d9d));break;case'STRUCT':_0x987b49=_0x292c56[_0x50a59b]!==''?JSON[_0x52846f(0x1c0)](_0x292c56[_0x50a59b]):{},_0x2bd9cb=VisuMZ['ConvertParams']({},_0x987b49);break;case'ARRAYSTRUCT':_0x181b44=_0x292c56[_0x50a59b]!==''?JSON[_0x52846f(0x1c0)](_0x292c56[_0x50a59b]):[],_0x2bd9cb=_0x181b44[_0x52846f(0x207)](_0x556f56=>VisuMZ[_0x52846f(0x1ec)]({},JSON['parse'](_0x556f56)));break;default:continue;}_0x2dcf60[_0x4e16c8]=_0x2bd9cb;}}}return _0x2dcf60;},(_0x96e858=>{const _0x183926=_0x2955fc,_0x59389e=_0x96e858[_0x183926(0x163)];for(const _0x2dbbbc of dependencies){if('HARvQ'!==_0x183926(0x168))this['padding']=0x0;else{if(!Imported[_0x2dbbbc]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x183926(0x15d)](_0x59389e,_0x2dbbbc)),SceneManager['exit']();break;}}}const _0x251176=_0x96e858[_0x183926(0x2d0)];if(_0x251176['match'](/\[Version[ ](.*?)\]/i)){const _0x174a24=Number(RegExp['$1']);if(_0x174a24!==VisuMZ[label]['version']){if(_0x183926(0x141)!==_0x183926(0x255))alert(_0x183926(0x291)['format'](_0x59389e,_0x174a24)),SceneManager[_0x183926(0x170)]();else return _0x183926(0x292)[_0x183926(0x15d)](_0x370bb2(_0xa454af['$1']));}}if(_0x251176['match'](/\[Tier[ ](\d+)\]/i)){const _0x9eea2d=Number(RegExp['$1']);if(_0x9eea2d<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x183926(0x15d)](_0x59389e,_0x9eea2d,tier)),SceneManager[_0x183926(0x170)]();else{if(_0x183926(0x2a2)!==_0x183926(0x2a2)){let _0x7203f9=this[_0x183926(0x2d6)]-_0x4f52a9[_0x183926(0x24b)];_0x7203f9-=_0x52a9d9[_0x183926(0x152)];for(const _0x2d1908 of _0x28661e){_0x2d1908['y']=_0x7203f9;}}else tier=Math['max'](_0x9eea2d,tier);}}VisuMZ[_0x183926(0x1ec)](VisuMZ[label][_0x183926(0x204)],_0x96e858[_0x183926(0x1c9)]);})(pluginData),PluginManager[_0x2955fc(0x1d5)](pluginData['name'],_0x2955fc(0x2f3),_0x3ebf38=>{const _0x29e28a=_0x2955fc;VisuMZ[_0x29e28a(0x1ec)](_0x3ebf38,_0x3ebf38);const _0x25a75b=!_0x3ebf38['Allow'];$gameSystem['setExtendedFastForwardDisallowed'](_0x25a75b);}),PluginManager[_0x2955fc(0x1d5)](pluginData['name'],_0x2955fc(0x17a),_0x419a0b=>{const _0x50a9b8=_0x2955fc;VisuMZ['ConvertParams'](_0x419a0b,_0x419a0b);const _0x589d5d=_0x419a0b[_0x50a9b8(0x1c6)];$gameSystem[_0x50a9b8(0x2bd)](_0x589d5d);}),PluginManager[_0x2955fc(0x1d5)](pluginData[_0x2955fc(0x163)],_0x2955fc(0x26a),_0xfa7cd9=>{const _0x3d3916=_0x2955fc;VisuMZ[_0x3d3916(0x1ec)](_0xfa7cd9,_0xfa7cd9);const _0x51d5a1=_0xfa7cd9[_0x3d3916(0x145)];$gameSystem[_0x3d3916(0x2ba)](_0x51d5a1);const _0x20c09f=SceneManager[_0x3d3916(0x2a0)][_0x3d3916(0x15c)];if(_0x20c09f){if('iXtlN'===_0x3d3916(0x166)){let _0x37df29=_0x1b492e['ExtMessageFunc'][_0x3d3916(0x20f)][_0x3d3916(0x206)](this);const _0x3eff77=_0x33ce8f[_0x3d3916(0x290)]();return _0x3eff77&&_0x3eff77[_0x3d3916(0x2a9)]&&(_0x37df29+=_0x3eff77[_0x3d3916(0x2ae)]),_0x37df29;}else _0x20c09f['_createPauseSignSprites'](),_0x20c09f[_0x3d3916(0x1cd)]();}}),PluginManager[_0x2955fc(0x1d5)](pluginData[_0x2955fc(0x163)],_0x2955fc(0x2ec),_0x599be2=>{const _0x12dfc4=_0x2955fc;VisuMZ[_0x12dfc4(0x1ec)](_0x599be2,_0x599be2),$gameSystem[_0x12dfc4(0x1a9)](_0x599be2[_0x12dfc4(0x204)]);}),TextManager[_0x2955fc(0x1fb)]=function(_0x31fa9c){const _0x29e10c=_0x2955fc;if(Window_ButtonConsole[_0x29e10c(0x1dd)][_0x31fa9c]){if(_0x29e10c(0x1df)!==_0x29e10c(0x2e5))return Window_ButtonConsole[_0x29e10c(0x1dd)][_0x31fa9c];else _0x51218b[_0x29e10c(0x2b6)]['Window_Message_update'][_0x29e10c(0x206)](this),this[_0x29e10c(0x1bb)](),this[_0x29e10c(0x197)]();}return _0x31fa9c['toUpperCase']()[_0x29e10c(0x1e1)]();},ColorManager[_0x2955fc(0x17b)]=function(_0x4bbe61){const _0x10d230=_0x2955fc;_0x4bbe61=String(_0x4bbe61);if(_0x4bbe61['match'](/#(.*)/i)){if(_0x10d230(0x17e)!==_0x10d230(0x14e))return _0x10d230(0x292)[_0x10d230(0x15d)](String(RegExp['$1']));else this[_0x10d230(0x16b)]();}else return this[_0x10d230(0x1f0)](Number(_0x4bbe61));},SceneManager[_0x2955fc(0x2ef)]=function(){const _0x1c0479=_0x2955fc;return this[_0x1c0479(0x2a0)]&&this[_0x1c0479(0x2a0)]['constructor']===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x41bafb=_0x2955fc;return this[_0x41bafb(0x2a0)]&&this[_0x41bafb(0x2a0)]['constructor']===Scene_Map;},VisuMZ['ExtMessageFunc'][_0x2955fc(0x1d7)]=SceneManager[_0x2955fc(0x150)],SceneManager[_0x2955fc(0x150)]=function(_0x2d6b5d){const _0x3594e3=_0x2955fc;VisuMZ[_0x3594e3(0x2b6)][_0x3594e3(0x1d7)]['call'](this,_0x2d6b5d),[Scene_SaveButtonConsole,Scene_Save,Scene_Load][_0x3594e3(0x21e)](_0x2d6b5d)&&this[_0x3594e3(0x24a)]();},SceneManager[_0x2955fc(0x24a)]=function(){const _0x470186=_0x2955fc;for(const _0x2dd6bf of $gameParty[_0x470186(0x2e1)]()){if(_0x470186(0x171)===_0x470186(0x171)){_0x2dd6bf[_0x470186(0x221)]()&&(_0x470186(0x1eb)!==_0x470186(0x23c)?ImageManager[_0x470186(0x282)](_0x2dd6bf['faceName']()):this[_0x470186(0x16b)]());if(_0x2dd6bf[_0x470186(0x23b)]()){if(_0x470186(0x160)!==_0x470186(0x160)){const _0x5e9884=_0x5cabcb[_0x470186(0x221)](),_0x5d1aea=_0x56e8db['faceIndex'](),_0x5f0690=_0x152c0b[_0x470186(0x276)]();let _0x761fd3=_0x134892['faceWidth'],_0x571b5c=this[_0x470186(0x1b0)],_0x89e5a9=_0x5f0690?this['innerWidth']-_0x761fd3-0x4:0x4,_0x62533e=0x0;_0x571b5c-=this['addedHeight'](),this['drawFace'](_0x5e9884,_0x5d1aea,_0x89e5a9,_0x62533e,_0x761fd3,_0x571b5c);}else ImageManager[_0x470186(0x24e)](_0x2dd6bf['characterName']());}_0x2dd6bf['battlerName']()&&ImageManager[_0x470186(0x245)](_0x2dd6bf[_0x470186(0x297)]());}else this[_0x470186(0x1ae)]=_0x1b7c2b['makeDeepCopy'](_0x523506['ExtMessageFunc']['Settings'][_0x470186(0x145)]);}},Game_Temp[_0x2955fc(0x1af)]['isMessageAutoForwardMode']=function(){const _0x4a9d01=_0x2955fc;return this[_0x4a9d01(0x1bc)];},Game_Temp['prototype'][_0x2955fc(0x19e)]=function(_0x153ef6){const _0x251f87=_0x2955fc;this[_0x251f87(0x1bc)]=_0x153ef6,$gameMessage['refreshButtonConsole']();},Game_Temp[_0x2955fc(0x1af)][_0x2955fc(0x294)]=function(){const _0x37e7d8=_0x2955fc;return this[_0x37e7d8(0x1c5)];},Game_Temp[_0x2955fc(0x1af)][_0x2955fc(0x2cf)]=function(_0x6754c6){const _0x31ef1a=_0x2955fc;this['_extendedFastForwardMode']=_0x6754c6,$gameMessage[_0x31ef1a(0x1f1)]();},VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x1a4)]=Game_Temp[_0x2955fc(0x1af)][_0x2955fc(0x287)],Game_Temp[_0x2955fc(0x1af)]['requestAnimation']=function(_0x17a3a3,_0x6ba82a,_0xc1ffba){const _0x35f002=_0x2955fc;if(this[_0x35f002(0x1cf)]())return;VisuMZ[_0x35f002(0x2b6)][_0x35f002(0x1a4)][_0x35f002(0x206)](this,_0x17a3a3,_0x6ba82a,_0xc1ffba);},Game_Temp[_0x2955fc(0x1af)]['isSceneUsingExFastForward']=function(){const _0x4f2127=_0x2955fc,_0x5ca5da=SceneManager[_0x4f2127(0x2a0)];return _0x5ca5da&&_0x5ca5da[_0x4f2127(0x294)]&&_0x5ca5da['isExtendedFastForwardMode']();},VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x2a7)]=Game_System[_0x2955fc(0x1af)][_0x2955fc(0x28f)],Game_System[_0x2955fc(0x1af)][_0x2955fc(0x28f)]=function(){const _0x101af5=_0x2955fc;VisuMZ[_0x101af5(0x2b6)][_0x101af5(0x2a7)][_0x101af5(0x206)](this),this[_0x101af5(0x1e0)](),this[_0x101af5(0x28c)](),this['initMessageCursorSettings']();},Game_System[_0x2955fc(0x1af)][_0x2955fc(0x1e0)]=function(){const _0x1d3ece=_0x2955fc;this['_messageButtonConsoleVisible']=Window_ButtonConsole[_0x1d3ece(0x239)];},Game_System[_0x2955fc(0x1af)][_0x2955fc(0x274)]=function(){const _0x5c4e0e=_0x2955fc;if(this[_0x5c4e0e(0x238)]===undefined){if(_0x5c4e0e(0x1ff)==='mlXQd'){if(_0x578afb[_0x5c4e0e(0x1dd)][_0xa87420])return _0x1ac2a3['VOCAB'][_0x3af74a];return _0x23b786[_0x5c4e0e(0x22e)]()[_0x5c4e0e(0x1e1)]();}else this[_0x5c4e0e(0x1e0)]();}return this['_messageButtonConsoleVisible'];},Game_System[_0x2955fc(0x1af)]['setMessageButtonConsoleVisible']=function(_0x84f738){const _0x2d1ff8=_0x2955fc;this['_messageButtonConsoleVisible']===undefined&&(_0x2d1ff8(0x165)!==_0x2d1ff8(0x2e4)?this[_0x2d1ff8(0x1e0)]():this[_0x2d1ff8(0x15b)]()?this['refreshCustomMessageCursorPauseSign']():(_0x5dc07f[_0x2d1ff8(0x1af)][_0x2d1ff8(0x1cd)][_0x2d1ff8(0x206)](this),this[_0x2d1ff8(0x250)]())),this[_0x2d1ff8(0x238)]=_0x84f738;},Game_System[_0x2955fc(0x1af)][_0x2955fc(0x28c)]=function(){const _0x466a39=_0x2955fc;this[_0x466a39(0x2cd)]=![];},Game_System[_0x2955fc(0x1af)][_0x2955fc(0x16c)]=function(){return this['_disallowFastForward']===undefined&&this['initExtendedFastForward'](),this['_disallowFastForward'];},Game_System[_0x2955fc(0x1af)]['setExtendedFastForwardDisallowed']=function(_0x2ac161){const _0xf86654=_0x2955fc;this[_0xf86654(0x2cd)]===undefined&&this[_0xf86654(0x28c)](),this['_disallowFastForward']=_0x2ac161;},Game_System[_0x2955fc(0x1af)][_0x2955fc(0x159)]=function(){const _0x3b9072=_0x2955fc;this[_0x3b9072(0x1ae)]=JsonEx[_0x3b9072(0x1de)](VisuMZ[_0x3b9072(0x2b6)][_0x3b9072(0x204)][_0x3b9072(0x145)]);},Game_System[_0x2955fc(0x1af)][_0x2955fc(0x25d)]=function(){const _0x3c41c5=_0x2955fc;return this['_msgCursorSettings']===undefined&&this[_0x3c41c5(0x159)](),this['_msgCursorSettings'];},Game_System[_0x2955fc(0x1af)]['setMessageCursorSettings']=function(_0x5b34b5){const _0x32a28f=_0x2955fc;this['_msgCursorSettings']===undefined&&(_0x32a28f(0x14d)!==_0x32a28f(0x14d)?(_0x5719ca[_0x40b475]=_0x45b867[_0x171a6d]??'',_0x12282d[_0x406878]!==''&&_0x3384ed['loadSystem'](_0x334f00[_0x31658f])):this[_0x32a28f(0x159)]()),this[_0x32a28f(0x1ae)]=JsonEx[_0x32a28f(0x1de)](_0x5b34b5);},Game_System[_0x2955fc(0x1af)][_0x2955fc(0x290)]=function(){const _0x423af7=_0x2955fc;if(this['_messageTailSettings']===undefined){const _0x410ce1=VisuMZ[_0x423af7(0x2b6)][_0x423af7(0x204)][_0x423af7(0x218)];this['_messageTailSettings']=JsonEx[_0x423af7(0x1de)](_0x410ce1);}return this[_0x423af7(0x1c7)];},Game_System[_0x2955fc(0x1af)][_0x2955fc(0x1a9)]=function(_0xba8dfc){const _0x198bed=_0x2955fc;this[_0x198bed(0x1c7)]=JsonEx[_0x198bed(0x1de)](_0xba8dfc);},Game_Message['prototype']['refreshButtonConsole']=function(){const _0x3d6472=_0x2955fc,_0xc1e364=SceneManager[_0x3d6472(0x2a0)];if(!_0xc1e364)return;const _0x2422a8=_0xc1e364[_0x3d6472(0x15c)];if(!_0x2422a8)return;_0x2422a8[_0x3d6472(0x1f1)]();},VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x29a)]=Scene_Boot['prototype'][_0x2955fc(0x2b8)],Scene_Boot[_0x2955fc(0x1af)][_0x2955fc(0x2b8)]=function(){const _0x246658=_0x2955fc;VisuMZ[_0x246658(0x2b6)][_0x246658(0x29a)][_0x246658(0x206)](this),this[_0x246658(0x246)]();},Scene_Boot['prototype'][_0x2955fc(0x246)]=function(){const _0x1778e1=_0x2955fc,_0x5c1279=VisuMZ[_0x1778e1(0x2b6)][_0x1778e1(0x204)][_0x1778e1(0x17a)],_0x48a789=[_0x1778e1(0x148),_0x1778e1(0x21f),_0x1778e1(0x2e9)];for(const _0x23ceca of _0x48a789){if(_0x1778e1(0x169)!=='qncig')_0x3100f0(_0x1778e1(0x291)['format'](_0x3fc7da,_0x2a8b7a)),_0x3afe49[_0x1778e1(0x170)]();else{_0x5c1279[_0x23ceca]=_0x5c1279[_0x23ceca]??'';if(_0x5c1279[_0x23ceca]!==''){if(_0x1778e1(0x216)===_0x1778e1(0x216))ImageManager[_0x1778e1(0x222)](_0x5c1279[_0x23ceca]);else return!![];}}}},Scene_Message[_0x2955fc(0x2cb)]=VisuMZ['ExtMessageFunc'][_0x2955fc(0x204)][_0x2955fc(0x2df)][_0x2955fc(0x1c8)],Scene_Message[_0x2955fc(0x1cb)]=VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)][_0x2955fc(0x2df)]['Speed'],Scene_Message[_0x2955fc(0x1af)][_0x2955fc(0x294)]=function(){const _0x45b7b5=_0x2955fc;if(!Scene_Message['EXT_FAST_FORWARD_ENABLED'])return![];if($gameSystem['isExtendedFastForwardDisallowed']())return![];if(this[_0x45b7b5(0x149)]())return![];return this[_0x45b7b5(0x2b3)]();},Scene_Message['prototype'][_0x2955fc(0x2b3)]=function(){const _0x42c532=_0x2955fc;if(Imported[_0x42c532(0x278)]&&$gameMap[_0x42c532(0x273)]())return![];if(!this[_0x42c532(0x149)]()){if(Input[_0x42c532(0x249)](VisuMZ['MessageCore'][_0x42c532(0x204)][_0x42c532(0x1e7)]['FastForwardKey']))return!![];}return $gameTemp[_0x42c532(0x294)]();},Scene_Message[_0x2955fc(0x1af)]['anyActiveMessageInputWindows']=function(){const _0x15c412=_0x2955fc;if(this[_0x15c412(0x13f)]&&this[_0x15c412(0x13f)]['active'])return!![];if(this['_numberInputWindow']&&this[_0x15c412(0x15a)][_0x15c412(0x153)])return!![];if(this[_0x15c412(0x232)]&&this[_0x15c412(0x232)]['active'])return!![];return![];},Scene_Message[_0x2955fc(0x1af)][_0x2955fc(0x208)]=function(){const _0x16dacf=_0x2955fc;if(Input[_0x16dacf(0x191)]('escape')||TouchInput[_0x16dacf(0x219)]()){if(_0x16dacf(0x1ea)===_0x16dacf(0x1ea))return $gameTemp[_0x16dacf(0x2cf)](![]),!![];else this[_0x16dacf(0x1e2)](),_0x4258c2['push'](_0x2cb9c0);}else{if(_0x16dacf(0x251)!==_0x16dacf(0x251))this[_0x16dacf(0x235)](_0x4d0c33);else return![];}},VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x2e7)]=Scene_Map[_0x2955fc(0x1af)]['updateMainMultiply'],Scene_Map[_0x2955fc(0x1af)][_0x2955fc(0x1da)]=function(){const _0x36c052=_0x2955fc;this[_0x36c052(0x294)]()?this['updateExtendedFastForwardMode']():_0x36c052(0x28b)===_0x36c052(0x243)?this[_0x36c052(0x1c7)]=_0x3ffd81[_0x36c052(0x1de)](_0x1fdbb2):VisuMZ[_0x36c052(0x2b6)][_0x36c052(0x2e7)][_0x36c052(0x206)](this);},Scene_Map[_0x2955fc(0x1af)][_0x2955fc(0x294)]=function(){const _0x24153e=_0x2955fc;return Scene_Message[_0x24153e(0x1af)]['isExtendedFastForwardMode'][_0x24153e(0x206)](this)&&$gameMap[_0x24153e(0x21b)]();},Scene_Map[_0x2955fc(0x1af)][_0x2955fc(0x266)]=function(){const _0x2eb86f=_0x2955fc;let _0x2d3a12=Scene_Message[_0x2eb86f(0x1cb)];while(_0x2d3a12--&&$gameMap[_0x2eb86f(0x21b)]()&&!this['anyActiveMessageInputWindows']()){if(_0x2eb86f(0x161)!==_0x2eb86f(0x295)){this[_0x2eb86f(0x26d)](),this['updateColorFilter'](),this[_0x2eb86f(0x1c1)](),SceneManager[_0x2eb86f(0x256)]();if(this[_0x2eb86f(0x208)]())break;}else _0x908cbc[_0x2eb86f(0x174)]()&&_0x5da64c[_0x2eb86f(0x1e6)]()?(this['playOkSound'](),_0x5c36e9[_0x2eb86f(0x150)](_0x18a6f4)):this[_0x2eb86f(0x16b)]();}};function Scene_SaveButtonConsole(){const _0x3e4150=_0x2955fc;this[_0x3e4150(0x28f)](...arguments);}Scene_SaveButtonConsole[_0x2955fc(0x1af)]=Object[_0x2955fc(0x183)](Scene_Save['prototype']),Scene_SaveButtonConsole[_0x2955fc(0x1af)]['constructor']=Scene_SaveButtonConsole,Scene_SaveButtonConsole[_0x2955fc(0x1af)][_0x2955fc(0x2dd)]=function(){const _0x5045cb=_0x2955fc;this[_0x5045cb(0x18a)]=0x0;let _0x181381=$gameMap[_0x5045cb(0x20a)];for(;;){if(_0x181381[_0x5045cb(0x2ab)])_0x181381=_0x181381[_0x5045cb(0x2ab)];else{this[_0x5045cb(0x18a)]=_0x181381[_0x5045cb(0x1a1)],_0x181381[_0x5045cb(0x1a1)]=_0x181381['_lastExtMsgFuncIndex'];break;}}Scene_Save[_0x5045cb(0x1af)][_0x5045cb(0x2dd)][_0x5045cb(0x206)](this),_0x181381[_0x5045cb(0x1a1)]=this[_0x5045cb(0x18a)];},VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x2d5)]=Game_Interpreter[_0x2955fc(0x1af)][_0x2955fc(0x1a7)],Game_Interpreter[_0x2955fc(0x1af)][_0x2955fc(0x1a7)]=function(_0x27717b){const _0x4e14d5=_0x2955fc;return this[_0x4e14d5(0x198)]=this['_index'],VisuMZ[_0x4e14d5(0x2b6)][_0x4e14d5(0x2d5)]['call'](this,_0x27717b);},VisuMZ['ExtMessageFunc'][_0x2955fc(0x217)]=Scene_Battle[_0x2955fc(0x1af)][_0x2955fc(0x21d)],Scene_Battle[_0x2955fc(0x1af)][_0x2955fc(0x21d)]=function(){const _0x36940d=_0x2955fc;VisuMZ[_0x36940d(0x2b6)][_0x36940d(0x217)][_0x36940d(0x206)](this);if(this[_0x36940d(0x294)]())this[_0x36940d(0x266)]();},Scene_Battle[_0x2955fc(0x1af)][_0x2955fc(0x294)]=function(){const _0x4ab456=_0x2955fc;return![];return Scene_Message[_0x4ab456(0x1af)]['isExtendedFastForwardMode'][_0x4ab456(0x206)](this)&&$gameTroop['isEventRunning']()&&!this[_0x4ab456(0x16f)];},Scene_Battle[_0x2955fc(0x1af)][_0x2955fc(0x266)]=function(){const _0x503bc9=_0x2955fc;this[_0x503bc9(0x16f)]=!![];let _0x537870=Scene_Message['EXT_FAST_FORWARD_LOOPS'];while(_0x537870--&&$gameTroop[_0x503bc9(0x21b)]()&&!this['anyActiveMessageInputWindows']()){this['update'](),SceneManager[_0x503bc9(0x256)]();if(this['updateExtendedFastForwardCancel']())break;}this[_0x503bc9(0x16f)]=![];},VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x244)]=WindowLayer[_0x2955fc(0x1af)]['update'],WindowLayer[_0x2955fc(0x1af)][_0x2955fc(0x21d)]=function(){const _0x17e482=_0x2955fc;if(SceneManager[_0x17e482(0x2a0)]['_extFastForwardLooping'])return;VisuMZ[_0x17e482(0x2b6)]['WindowLayer_update'][_0x17e482(0x206)](this);},VisuMZ[_0x2955fc(0x2b6)]['Window_Base_flushTextState']=Window_Base[_0x2955fc(0x1af)]['flushTextState'],Window_Base[_0x2955fc(0x1af)]['flushTextState']=function(_0x4184d0){const _0x9bb64a=_0x2955fc;this[_0x9bb64a(0x28a)]['name']==='Window_Message'&&this[_0x9bb64a(0x1b7)](_0x4184d0),VisuMZ[_0x9bb64a(0x2b6)][_0x9bb64a(0x2a8)]['call'](this,_0x4184d0),this[_0x9bb64a(0x28a)][_0x9bb64a(0x163)]===_0x9bb64a(0x1b5)&&this[_0x9bb64a(0x235)](_0x4184d0);},VisuMZ['ExtMessageFunc'][_0x2955fc(0x25f)]=Window_Message[_0x2955fc(0x1af)]['initialize'],Window_Message['prototype'][_0x2955fc(0x28f)]=function(_0x23adda){const _0x579f10=_0x2955fc;VisuMZ[_0x579f10(0x2b6)][_0x579f10(0x25f)][_0x579f10(0x206)](this,_0x23adda),this[_0x579f10(0x156)]();},VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x211)]=Window_Message['prototype'][_0x2955fc(0x21d)],Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x21d)]=function(){const _0x50219f=_0x2955fc;VisuMZ[_0x50219f(0x2b6)]['Window_Message_update']['call'](this),this[_0x50219f(0x1bb)](),this[_0x50219f(0x197)]();},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x1bb)]=function(){const _0x1b685b=_0x2955fc;if(!this[_0x1b685b(0x26b)]())return;$gameTemp[_0x1b685b(0x2ea)]()&&$gameTemp['setMessageAutoForwardMode'](![]),$gameTemp[_0x1b685b(0x294)]()&&$gameTemp[_0x1b685b(0x2cf)](![]);},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x26b)]=function(){const _0x1d73e=_0x2955fc;if(SceneManager[_0x1d73e(0x1e6)]()&&$gameMap&&!$gameMap['isEventRunning']())return!![];else{if(SceneManager[_0x1d73e(0x2ef)]()&&!$gameMap[_0x1d73e(0x21b)]()){if(_0x1d73e(0x2d2)==='UZixY')_0x185940[_0x1d73e(0x2d9)]=_0x327692[_0x1d73e(0x222)](_0x3752e6);else return!![];}}return![];},VisuMZ[_0x2955fc(0x2b6)]['Window_Message_isTriggered']=Window_Message[_0x2955fc(0x1af)]['isTriggered'],Window_Message['prototype'][_0x2955fc(0x191)]=function(){const _0x43d400=_0x2955fc;if(SceneManager['_scene']['isExtendedFastForwardMode']()){if(_0x43d400(0x220)!==_0x43d400(0x220))this[_0x43d400(0x15b)]()?this['updateCustomMessageCursorPauseSignSprites']():_0x28f486[_0x43d400(0x1af)]['_updatePauseSign'][_0x43d400(0x206)](this);else return!![];}else{if(Input[_0x43d400(0x191)](Window_ButtonConsole['SHORTCUT_KEY']['auto']))return _0x43d400(0x1e4)===_0x43d400(0x1e4)?(this['toggleAutoForward'](),![]):(_0xecc492['setExtendedFastForwardMode'](![]),!![]);else{if(Input[_0x43d400(0x191)](Window_ButtonConsole[_0x43d400(0x2e6)][_0x43d400(0x1d3)])){if('pBkvE'!=='bCoIt')return this[_0x43d400(0x247)](_0x43d400(0x1d3)),![];else this[_0x43d400(0x296)]-=_0x131b89*_0x499f67['FrameDelay'];}else{if(Input[_0x43d400(0x191)](Window_ButtonConsole[_0x43d400(0x2e6)]['load']))return this[_0x43d400(0x247)](_0x43d400(0x1b1)),![];else{if(Input[_0x43d400(0x191)](Window_ButtonConsole['SHORTCUT_KEY'][_0x43d400(0x268)]))return _0x43d400(0x2c4)===_0x43d400(0x1d1)?(this[_0x43d400(0x247)]('options'),![]):(this['processButtonShortcut']('options'),![]);else{if(Input['isTriggered'](Window_ButtonConsole[_0x43d400(0x2e6)][_0x43d400(0x1f4)]))return this[_0x43d400(0x247)](_0x43d400(0x1f4)),![];else{if(this[_0x43d400(0x261)]&&$gameTemp['isMessageAutoForwardMode']())return this['autoForwardTriggered']();else{if(_0x43d400(0x260)===_0x43d400(0x2da))_0x47c8e2['prototype'][_0x43d400(0x1cd)][_0x43d400(0x206)](this),this[_0x43d400(0x250)]();else return VisuMZ[_0x43d400(0x2b6)][_0x43d400(0x19f)][_0x43d400(0x206)](this);}}}}}}}},VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x227)]=Window_Message[_0x2955fc(0x1af)]['newPage'],Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x215)]=function(_0x3dbaa6){const _0x133436=_0x2955fc;this['prepareHideButtonConsoleTextCode'](_0x3dbaa6),this[_0x133436(0x23a)](),this[_0x133436(0x27f)](_0x3dbaa6),VisuMZ[_0x133436(0x2b6)][_0x133436(0x227)][_0x133436(0x206)](this,_0x3dbaa6),this[_0x133436(0x151)]=0x0;},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x1a0)]=function(){const _0x591f24=_0x2955fc,_0x1a64f1=$gameMessage[_0x591f24(0x221)](),_0x551934=$gameMessage[_0x591f24(0x1cc)](),_0x195f6f=$gameMessage['isRTL']();let _0x428e2a=ImageManager[_0x591f24(0x229)],_0x583b50=this[_0x591f24(0x1b0)],_0x135a3b=_0x195f6f?this['innerWidth']-_0x428e2a-0x4:0x4,_0x29b84a=0x0;_0x583b50-=this['addedHeight'](),this[_0x591f24(0x2a4)](_0x1a64f1,_0x551934,_0x135a3b,_0x29b84a,_0x428e2a,_0x583b50);},Window_Message[_0x2955fc(0x202)]=VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)][_0x2955fc(0x2af)][_0x2955fc(0x2be)],Window_Message[_0x2955fc(0x184)]=VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)]['Auto'][_0x2955fc(0x1fe)],Window_Message[_0x2955fc(0x1af)]['addAutoForwardDelay']=function(_0x329428){const _0x36a060=_0x2955fc;this['_autoForwardCount']=this[_0x36a060(0x151)]||0x0,this['_autoForwardCount']=Math['max'](this[_0x36a060(0x151)],0x0);const _0x46c4d6=(_0x329428[_0x36a060(0x20e)]||'')[_0x36a060(0x23e)];this[_0x36a060(0x151)]+=_0x46c4d6*Window_Message[_0x36a060(0x202)];},Window_Message[_0x2955fc(0x1af)]['toggleAutoForward']=function(){const _0x3961e3=_0x2955fc;if(this['_hideButtonConsole'])return;if(!$gameSystem[_0x3961e3(0x274)]())return;let _0x12d3dd=!$gameTemp[_0x3961e3(0x2ea)]();$gameTemp[_0x3961e3(0x19e)](_0x12d3dd),_0x12d3dd?this[_0x3961e3(0x1e2)]():'BFldp'===_0x3961e3(0x1a5)?this['addAutoForwardDelay'](_0x6e0e3a):SoundManager[_0x3961e3(0x199)]();},Window_Message['prototype'][_0x2955fc(0x172)]=function(){const _0x3d70e1=_0x2955fc;this[_0x3d70e1(0x151)]=this['_autoForwardCount']||0x0;if(VisuMZ[_0x3d70e1(0x2b6)][_0x3d70e1(0x19f)][_0x3d70e1(0x206)](this)){if(_0x3d70e1(0x19d)!==_0x3d70e1(0x1ca))return SoundManager[_0x3d70e1(0x199)](),$gameTemp[_0x3d70e1(0x19e)](![]),!![];else this[_0x3d70e1(0x238)]===_0xecf15f&&this['initMessageButtonConsole'](),this[_0x3d70e1(0x238)]=_0x174eca;}else{if('gIkiG'==='gIkiG')return this[_0x3d70e1(0x151)]--<=0x0;else this[_0x3d70e1(0x1ae)]===_0x379b3f&&this['initMessageCursorSettings'](),this['_msgCursorSettings']=_0x1698a0[_0x3d70e1(0x1de)](_0x17b8af);}},VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x1d9)]=Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x2d1)],Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x2d1)]=function(){const _0x9b2039=_0x2955fc;VisuMZ[_0x9b2039(0x2b6)][_0x9b2039(0x1d9)]['call'](this),this[_0x9b2039(0x151)]=this['_autoForwardCount']||0x0,this[_0x9b2039(0x151)]=Math[_0x9b2039(0x18e)](this[_0x9b2039(0x151)],Window_Message[_0x9b2039(0x184)]);},VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x185)]=Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x253)],Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x253)]=function(){const _0x1c97ad=_0x2955fc;VisuMZ['ExtMessageFunc'][_0x1c97ad(0x185)][_0x1c97ad(0x206)](this),this[_0x1c97ad(0x23f)]();},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x1fc)]=function(_0x39a6a4){const _0x25db9a=_0x2955fc;let _0x462e21=_0x39a6a4[_0x25db9a(0x203)];this[_0x25db9a(0x271)]=![],_0x462e21=_0x462e21['replace'](/<HIDE (?:BUTTON CONSOLE|CONSOLE|BUTTONS)>/gi,()=>{const _0x449446=_0x25db9a;return this[_0x449446(0x271)]=!![],'';}),this[_0x25db9a(0x262)](_0x462e21)&&(this[_0x25db9a(0x271)]=!![]),_0x39a6a4[_0x25db9a(0x203)]=_0x462e21;};if(!Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x1f7)]){let text='';text+=_0x2955fc(0x284),text+=_0x2955fc(0x181),text+='the\x20VisuMZ_2_ExtMessageFunc\x20plugin.',alert(text),SceneManager[_0x2955fc(0x170)]();}Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x262)]=function(_0x27743e){const _0xc31b50=_0x2955fc;if(!VisuMZ[_0xc31b50(0x2b6)][_0xc31b50(0x204)][_0xc31b50(0x17a)][_0xc31b50(0x179)])return![];if(_0x27743e['match'](Window_Message[_0xc31b50(0x1f3)]))return!![];if(_0x27743e['match'](Window_Message[_0xc31b50(0x2f0)]))return!![];return![];},VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x29f)]=Window_Message[_0x2955fc(0x1af)]['addedHeight'],Window_Message[_0x2955fc(0x1af)]['addedHeight']=function(){const _0x12cef4=_0x2955fc;let _0x1b8afe=VisuMZ['ExtMessageFunc'][_0x12cef4(0x29f)][_0x12cef4(0x206)](this);if(this[_0x12cef4(0x271)])return _0x1b8afe;return SceneManager[_0x12cef4(0x1e6)]()&&$gameSystem['isMessageButtonConsoleVisible']()&&([_0x12cef4(0x264),_0x12cef4(0x230)][_0x12cef4(0x21e)](Window_ButtonConsole[_0x12cef4(0x26e)][_0x12cef4(0x15f)]()[_0x12cef4(0x1e1)]())&&('iyCxl'!=='VCHxY'?_0x1b8afe+=Window_ButtonConsole[_0x12cef4(0x24b)]:_0x687f7b['y']=0x0)),_0x1b8afe;},VisuMZ['ExtMessageFunc'][_0x2955fc(0x16e)]=Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x196)],Window_Message['prototype'][_0x2955fc(0x196)]=function(){const _0x40ea87=_0x2955fc;VisuMZ[_0x40ea87(0x2b6)][_0x40ea87(0x16e)]['call'](this),this[_0x40ea87(0x252)](),this[_0x40ea87(0x1f1)]();},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x252)]=function(){const _0x56e72f=_0x2955fc;if(!SceneManager[_0x56e72f(0x1e6)]())return;for(const _0x41bdcf of this[_0x56e72f(0x146)]){if(!this['_hideButtonConsole']&&$gameSystem[_0x56e72f(0x274)]()){if(_0x56e72f(0x25a)===_0x56e72f(0x2ce))return this[_0x56e72f(0x1ae)]===_0xcfbe2b&&this[_0x56e72f(0x159)](),this['_msgCursorSettings'];else _0x41bdcf[_0x56e72f(0x1ad)]();}else{if(_0x56e72f(0x1aa)==='lIfBK')return this['_autoForwardCount']=this[_0x56e72f(0x151)]||0x0,_0x454513['ExtMessageFunc']['Window_Message_isTriggered']['call'](this)?(_0x4e0771[_0x56e72f(0x199)](),_0x51102b[_0x56e72f(0x19e)](![]),!![]):this['_autoForwardCount']--<=0x0;else _0x41bdcf[_0x56e72f(0x19a)]();}}this[_0x56e72f(0x2e2)]();},Window_Message['prototype'][_0x2955fc(0x1f1)]=function(){const _0x1a5430=_0x2955fc;for(const _0x4c0a75 of this['_buttonConsoleButtons']){_0x1a5430(0x2b2)!==_0x1a5430(0x288)?_0x4c0a75[_0x1a5430(0x1bf)]():_0x19946c[_0x1a5430(0x2d9)]=_0x13d944[_0x1a5430(0x222)](_0x1a5430(0x24c));}},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x23f)]=function(){const _0x5e1108=_0x2955fc;this[_0x5e1108(0x146)]=[];for(const _0x291535 of Window_ButtonConsole['BUTTON_ORDER']){if(_0x5e1108(0x1a8)!==_0x5e1108(0x157))this[_0x5e1108(0x27e)](_0x291535);else{if(_0x1599d2['isSceneMap']()&&_0x5039cd&&!_0x4cabf8[_0x5e1108(0x21b)]())return!![];else{if(_0xe9f56c[_0x5e1108(0x2ef)]()&&!_0x3ff9a4[_0x5e1108(0x21b)]())return!![];}return![];}}this[_0x5e1108(0x2e2)]();},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x27e)]=function(_0x29a1ca){const _0x5b562b=_0x2955fc;_0x29a1ca=_0x29a1ca[_0x5b562b(0x15f)]()[_0x5b562b(0x1e1)]();switch(_0x29a1ca){case'skip':if(!Scene_Message[_0x5b562b(0x2cb)])return;break;case _0x5b562b(0x268):if(!Imported[_0x5b562b(0x20c)])return;break;case _0x5b562b(0x1d3):case _0x5b562b(0x1b1):if(!Imported[_0x5b562b(0x2dc)])return;break;case _0x5b562b(0x19a):if(!Imported[_0x5b562b(0x22f)])return;break;case _0x5b562b(0x1b4):case _0x5b562b(0x1d2):if(!Imported['VisuMZ_3_MessageLog'])return;break;}const _0x502405=new Window_ButtonConsole(_0x29a1ca,this);this[_0x5b562b(0x146)][_0x5b562b(0x150)](_0x502405),this['addChild'](_0x502405);},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x2e2)]=function(){const _0x2312dd=_0x2955fc,_0x3667b6=Window_ButtonConsole[_0x2312dd(0x26e)]['toLowerCase']()[_0x2312dd(0x1e1)](),_0xd1210e=this[_0x2312dd(0x146)];this['_contentsSprite']['x']=this[_0x2312dd(0x2eb)]['y']=0x0;if(['top',_0x2312dd(0x230)][_0x2312dd(0x21e)](_0x3667b6)){let _0x1e1320=_0xd1210e[_0x2312dd(0x23e)]*Window_ButtonConsole[_0x2312dd(0x1fa)];_0x1e1320+=(_0xd1210e[_0x2312dd(0x23e)]-0x1)*Window_ButtonConsole[_0x2312dd(0x152)];let _0x38abb8=Math['floor']((this[_0x2312dd(0x2db)]-_0x1e1320)/0x2),_0x138193=_0x38abb8;for(const _0x18c6ac of _0xd1210e){_0x18c6ac['x']=_0x138193,_0x138193+=Window_ButtonConsole[_0x2312dd(0x1fa)]+Window_ButtonConsole[_0x2312dd(0x152)];}}if(_0x3667b6===_0x2312dd(0x264)){let _0x58fcda=Window_ButtonConsole['BUTTON_BUFFER'];for(const _0x294069 of _0xd1210e){_0x294069['y']=_0x58fcda;}_0x58fcda=Window_ButtonConsole[_0x2312dd(0x24b)],this['_contentsSprite']['y']=_0x58fcda;};if(_0x3667b6===_0x2312dd(0x230)){if(_0x2312dd(0x224)===_0x2312dd(0x2d7)){if(!this['_parentWindow'])return;this[_0x2312dd(0x225)]=this[_0x2312dd(0x1c3)][_0x2312dd(0x225)];}else{let _0xf5d54d=this[_0x2312dd(0x2d6)]-Window_ButtonConsole[_0x2312dd(0x24b)];_0xf5d54d-=Window_ButtonConsole[_0x2312dd(0x152)];for(const _0x4983ef of _0xd1210e){if(_0x2312dd(0x2d8)!==_0x2312dd(0x2c1))_0x4983ef['y']=_0xf5d54d;else{const _0x449b3b=_0x2e1c86['_scene'];if(!_0x449b3b)return;const _0x785983=_0x449b3b[_0x2312dd(0x15c)];if(!_0x785983)return;_0x785983[_0x2312dd(0x1f1)]();}}}}},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x247)]=function(_0x51bbcb){const _0x4a7a93=_0x2955fc;if(this['_hideButtonConsole'])return;if(!$gameSystem[_0x4a7a93(0x274)]())return;_0x51bbcb=_0x51bbcb[_0x4a7a93(0x15f)]()[_0x4a7a93(0x1e1)]();switch(_0x51bbcb){case _0x4a7a93(0x1d3):$gameSystem['isSaveEnabled']()&&SceneManager[_0x4a7a93(0x1e6)]()?(this[_0x4a7a93(0x1e2)](),SceneManager[_0x4a7a93(0x150)](Scene_SaveButtonConsole)):this[_0x4a7a93(0x16b)]();break;case _0x4a7a93(0x1b1):if(DataManager[_0x4a7a93(0x2c7)]()&&SceneManager[_0x4a7a93(0x1e6)]())this[_0x4a7a93(0x1e2)](),SceneManager[_0x4a7a93(0x150)](Scene_Load);else{if(_0x4a7a93(0x1fd)!==_0x4a7a93(0x188))this[_0x4a7a93(0x16b)]();else return this['_extendedFastForwardMode'];}break;case'options':SceneManager[_0x4a7a93(0x1e6)]()?(this[_0x4a7a93(0x1e2)](),SceneManager[_0x4a7a93(0x150)](Scene_Options)):this[_0x4a7a93(0x16b)]();break;case'gameend':if(SceneManager[_0x4a7a93(0x1e6)]()){if(_0x4a7a93(0x1db)===_0x4a7a93(0x2b0)){const _0x4787fa=this[_0x4a7a93(0x298)],_0x35ce7f=this['_messageTail'],_0x4416e4=_0x12bbc6[_0x4a7a93(0x290)](),_0x926987=this['getMessageTailMainKey']();if(_0x35ce7f[_0x4a7a93(0x27c)]===_0x4416e4['%1Filename'[_0x4a7a93(0x15d)](_0x926987)])return;const _0x3061f9=_0x4416e4[_0x4a7a93(0x17f)[_0x4a7a93(0x15d)](_0x926987)];_0x35ce7f[_0x4a7a93(0x27c)]=_0x3061f9,_0x3061f9?_0x4787fa['bitmap']=_0x1775b5['loadSystem'](_0x3061f9):_0x4787fa[_0x4a7a93(0x2d9)]=new _0x446f17(0x1,0x1);}else this['playOkSound'](),SceneManager[_0x4a7a93(0x150)](Scene_GameEnd);}else _0x4a7a93(0x1ee)!==_0x4a7a93(0x237)?this[_0x4a7a93(0x16b)]():(_0x2d843a[_0x4a7a93(0x1dc)]=_0x3999b9(_0x586182['positionX']),_0x154256['x']=_0xbde566[_0x4a7a93(0x143)](_0x2e724e[_0x4a7a93(0x1dc)]));break;}},VisuMZ[_0x2955fc(0x2b6)]['Window_Message_startWait']=Window_Message['prototype']['startWait'],Window_Message[_0x2955fc(0x1af)]['startWait']=function(_0x2603d6){const _0x59bc97=_0x2955fc;if(SceneManager[_0x59bc97(0x2a0)]['isExtendedFastForwardMode']()){if('KAQsZ'==='KAQsZ')return;else _0x145913[_0x59bc97(0x245)](_0x1e1510['battlerName']());}VisuMZ[_0x59bc97(0x2b6)][_0x59bc97(0x173)][_0x59bc97(0x206)](this,_0x2603d6);},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x15b)]=function(){const _0x5a2a7f=_0x2955fc,_0x2fb54f=$gameSystem[_0x5a2a7f(0x25d)]();return _0x2fb54f[_0x5a2a7f(0x1c8)];},Window_Message[_0x2955fc(0x1af)]['_createPauseSignSprites']=function(){const _0x384c53=_0x2955fc;if(this[_0x384c53(0x15b)]()){if(_0x384c53(0x13e)!==_0x384c53(0x13e))return this[_0x384c53(0x247)]('gameend'),![];else this['createCustomMessageCursorPauseSignSprites']();}else{if(_0x384c53(0x16d)===_0x384c53(0x29e)){_0x18a3fd[_0x384c53(0x1ac)]===_0x423257&&this[_0x384c53(0x14a)]();if(!_0x49f9b5[_0x384c53(0x1ac)])return;this[_0x384c53(0x254)]=0x0;const _0x27b14f=_0x2eacd9[_0x384c53(0x2b6)][_0x384c53(0x204)][_0x384c53(0x17a)],_0x1f2d66=[_0x384c53(0x148),_0x384c53(0x21f),_0x384c53(0x2e9)];this[_0x384c53(0x267)]={};for(const _0x4cca58 of _0x1f2d66){if(_0x27b14f[_0x4cca58]!==''){const _0x4e8168=_0x14eadf[_0x384c53(0x222)](_0x27b14f[_0x4cca58]);this[_0x384c53(0x267)][_0x4cca58]=new _0x46bdc1(_0x4e8168);const _0x5ce9fe=this['_buttonConsoleSprites'][_0x4cca58];this[_0x384c53(0x2bc)](_0x5ce9fe),_0x5ce9fe['x']=_0x27b14f[_0x384c53(0x19c)[_0x384c53(0x15d)](_0x4cca58)]||0x0,_0x5ce9fe['y']=_0x27b14f[_0x384c53(0x1e3)[_0x384c53(0x15d)](_0x4cca58)]||0x0;}}this['updateBackImageSpriteVisibility']();}else Window_Base[_0x384c53(0x1af)][_0x384c53(0x1b6)]['call'](this);}},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x22b)]=function(){const _0x27d92b=_0x2955fc,_0x3bc7af=$gameSystem[_0x27d92b(0x25d)]();this[_0x27d92b(0x25c)]=new Sprite(),this[_0x27d92b(0x2c8)](this[_0x27d92b(0x25c)]),this[_0x27d92b(0x25c)][_0x27d92b(0x2c5)]['x']=_0x3bc7af[_0x27d92b(0x2c9)],this['_pauseSignSprite'][_0x27d92b(0x2c5)]['y']=_0x3bc7af[_0x27d92b(0x178)],this[_0x27d92b(0x296)]=0x0;},Window_Message['prototype'][_0x2955fc(0x1cd)]=function(){const _0x15c8b5=_0x2955fc;this[_0x15c8b5(0x15b)]()?_0x15c8b5(0x164)!=='WAylF'?this['refreshCustomMessageCursorPauseSign']():this['isExtendedFastForwardMode']()?this[_0x15c8b5(0x266)]():_0x2f1d65[_0x15c8b5(0x2b6)][_0x15c8b5(0x2e7)]['call'](this):(Window_Base['prototype'][_0x15c8b5(0x1cd)][_0x15c8b5(0x206)](this),this[_0x15c8b5(0x250)]());},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x147)]=function(){const _0x5ba704=_0x2955fc,_0x1cfe4b=this[_0x5ba704(0x25c)];if(!_0x1cfe4b)return;const _0x5a01a2=$gameSystem[_0x5ba704(0x25d)](),_0x394308=_0x5a01a2[_0x5ba704(0x195)][_0x5ba704(0x15f)]()['trim']();if(_0x394308===_0x5ba704(0x236))_0x1cfe4b[_0x5ba704(0x2d9)]=ImageManager[_0x5ba704(0x222)](_0x5a01a2[_0x5ba704(0x2a1)]);else{if(_0x394308===_0x5ba704(0x1ba)){const _0x4f141e=0x90,_0x34b472=0x60,_0x215c4a=0x18;_0x1cfe4b[_0x5ba704(0x2d9)]=this[_0x5ba704(0x24f)],_0x1cfe4b[_0x5ba704(0x194)](_0x4f141e,_0x34b472,_0x215c4a,_0x215c4a);}else _0x1cfe4b[_0x5ba704(0x2d9)]=ImageManager[_0x5ba704(0x222)]('IconSet');}},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x250)]=function(){const _0x3499ef=_0x2955fc,_0x2d9266=this[_0x3499ef(0x25c)];if(!_0x2d9266)return;if(!$gameSystem[_0x3499ef(0x274)]())return;if(this['_currentAutoSize'])return;_0x2d9266['y']-=Window_ButtonConsole[_0x3499ef(0x24b)];},Window_Message['prototype'][_0x2955fc(0x200)]=function(){const _0x251dbf=_0x2955fc;this[_0x251dbf(0x15b)]()?this[_0x251dbf(0x19b)]():'yXlLa'!=='CwPry'?Window_Base[_0x251dbf(0x1af)][_0x251dbf(0x200)][_0x251dbf(0x206)](this):_0x162b3f+=_0x40004c['BUTTON_HEIGHT'];},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x19b)]=function(){const _0x893185=_0x2955fc;if(this[_0x893185(0x13d)]===Graphics[_0x893185(0x18c)])return;this[_0x893185(0x13d)]=Graphics[_0x893185(0x18c)];const _0xc5c7d3=this[_0x893185(0x25c)];if(!_0xc5c7d3)return;const _0x549a80=_0xc5c7d3[_0x893185(0x2d9)];if(_0x549a80[_0x893185(0x2db)]<=0x0)return;const _0x21d872=$gameSystem[_0x893185(0x25d)](),_0x6c9ca7=_0x21d872[_0x893185(0x195)]['toLowerCase']()['trim'](),_0x24fc27=this['isAnySubWindowActive']()||this['isClosing']();_0xc5c7d3['alpha']=_0x24fc27?0x0:0x1;if(_0xc5c7d3[_0x893185(0x201)]<=0x0)return;const _0x3ee8ee=_0x21d872[_0x893185(0x277)]*_0x21d872[_0x893185(0x155)];this[_0x893185(0x296)]++;while(this[_0x893185(0x296)]>=_0x3ee8ee*_0x21d872[_0x893185(0x17d)]){this[_0x893185(0x296)]-=_0x3ee8ee*_0x21d872['FrameDelay'];}if(_0x6c9ca7===_0x893185(0x236)){if(_0x893185(0x29c)!==_0x893185(0x223))this[_0x893185(0x1f2)]();else{if(!this[_0x893185(0x298)])return;if(!this[_0x893185(0x144)])return;this[_0x893185(0x2cc)](),this['updateMessageTailVisibility'](),this[_0x893185(0x285)]();}}else _0x6c9ca7===_0x893185(0x1ba)?Window_Base[_0x893185(0x1af)][_0x893185(0x200)][_0x893185(0x206)](this):this['updateIconMessageCursorPauseSignSprites']();},Window_Message['prototype'][_0x2955fc(0x1f2)]=function(){const _0xb93830=_0x2955fc,_0x22f25d=this[_0xb93830(0x25c)],_0x77517f=_0x22f25d[_0xb93830(0x2d9)],_0x375029=$gameSystem[_0xb93830(0x25d)](),_0x3b78f6=Math[_0xb93830(0x1e9)](this['_pauseSignAnimationCount']/_0x375029[_0xb93830(0x17d)]),_0x31cd85=Math[_0xb93830(0x1e9)](_0x77517f[_0xb93830(0x2db)]/_0x375029[_0xb93830(0x155)]),_0x395aae=Math['floor'](_0x77517f[_0xb93830(0x2d6)]/_0x375029[_0xb93830(0x277)]),_0x64eb69=_0x3b78f6%_0x375029[_0xb93830(0x155)]*_0x31cd85,_0x1c0f78=Math[_0xb93830(0x1e9)](_0x3b78f6/_0x375029[_0xb93830(0x155)])*_0x395aae;_0x22f25d[_0xb93830(0x194)](_0x64eb69,_0x1c0f78,_0x31cd85,_0x395aae),_0x22f25d[_0xb93830(0x240)]=this[_0xb93830(0x258)]();},Window_Message['prototype']['updateIconMessageCursorPauseSignSprites']=function(){const _0x196769=_0x2955fc,_0x217f76=this['_pauseSignSprite'],_0x5f578f=$gameSystem[_0x196769(0x25d)](),_0x56ca7e=_0x5f578f['IconIndex'],_0x21f329=ImageManager['iconWidth'],_0x208f33=ImageManager[_0x196769(0x2a5)],_0x6abfd2=_0x56ca7e%0x10*_0x21f329,_0x200fea=Math[_0x196769(0x1e9)](_0x56ca7e/0x10)*_0x208f33;_0x217f76['setFrame'](_0x6abfd2,_0x200fea,_0x21f329,_0x208f33),_0x217f76[_0x196769(0x240)]=this[_0x196769(0x258)]();if(_0x5f578f[_0x196769(0x1d4)]===0x0)return;_0x217f76[_0x196769(0x2c3)]['x']=Math[_0x196769(0x1b9)](Graphics[_0x196769(0x18c)]*_0x5f578f[_0x196769(0x1d4)]);},Window_Message['EXT_CURSOR_FOLLOW_TEXT']=VisuMZ['ExtMessageFunc'][_0x2955fc(0x204)][_0x2955fc(0x145)][_0x2955fc(0x1d6)]??!![],Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x235)]=function(_0x4ba3ab){const _0x1ae6b1=_0x2955fc;if(!_0x4ba3ab)return;if(!_0x4ba3ab[_0x1ae6b1(0x210)])return;if(!this[_0x1ae6b1(0x15b)]())return;const _0x4e52da=this['_pauseSignSprite'];if(!_0x4e52da)return;const _0x2f7d67=$gameSystem['getMessageCursorSettings']();_0x4e52da['x']=_0x4ba3ab['x']+this['padding']+_0x2f7d67[_0x1ae6b1(0x13c)]+_0x4e52da['width']/0x2,_0x4e52da['x']+=this['_contentsSprite']['x'],_0x4e52da['y']=_0x4ba3ab['y']+this[_0x1ae6b1(0x1f5)]+_0x4ba3ab[_0x1ae6b1(0x2d6)]+_0x2f7d67[_0x1ae6b1(0x233)],_0x4e52da['y']+=this[_0x1ae6b1(0x2eb)]['y'],_0x4e52da['x']=Math['round'](_0x4e52da['x']['clamp'](this[_0x1ae6b1(0x1f5)],this[_0x1ae6b1(0x2db)])),_0x4e52da['y']=Math[_0x1ae6b1(0x143)](_0x4e52da['y'][_0x1ae6b1(0x142)](this['padding'],this['height']-this[_0x1ae6b1(0x1f5)]));},Window_Message[_0x2955fc(0x1af)]['createMessageTailSprite']=function(){const _0x33d445=_0x2955fc;this['_messageTailSprite']=new Sprite(),this[_0x33d445(0x298)]['visible']=![],this['addChild'](this[_0x33d445(0x298)]);},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x23a)]=function(){const _0x1523ec=_0x2955fc;this[_0x1523ec(0x144)]={'visible':![],'lastFile':'','location':_0x1523ec(0x230),'direction':_0x1523ec(0x2f2),'positionX':_0x1523ec(0x27d)};},Window_Message[_0x2955fc(0x1af)]['parseMessageTailTextCodes']=function(_0x21ce07){const _0x2b9ba1=_0x2955fc;_0x21ce07[_0x2b9ba1(0x203)]=this[_0x2b9ba1(0x29b)](_0x21ce07[_0x2b9ba1(0x203)]),_0x21ce07[_0x2b9ba1(0x203)]=this[_0x2b9ba1(0x18b)](_0x21ce07[_0x2b9ba1(0x203)]);},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x18b)]=function(_0x4a35d4){const _0x1de9f2=_0x2955fc;return _0x4a35d4=_0x4a35d4[_0x1de9f2(0x1a6)](/<TAIL (?:BL|BOTTOM LEFT|DL|DOWN LEFT):[ ](\d+)>/gi,(_0x560886,_0x339232)=>{const _0x20952c=_0x1de9f2;if(_0x20952c(0x1b3)!==_0x20952c(0x1b3)){const _0x3ad747=_0x5e01bd(_0x2597c8['$1']);_0x3ad747!==_0x204313[_0x391b58]['version']&&(_0x536f68(_0x20952c(0x291)[_0x20952c(0x15d)](_0x2b9220,_0x3ad747)),_0x2cd6f8[_0x20952c(0x170)]());}else return this[_0x20952c(0x22d)](!![],!![],_0x339232),'';}),_0x4a35d4=_0x4a35d4[_0x1de9f2(0x1a6)](/<TAIL (?:BR|BOTTOM RIGHT|DL|DOWN RIGHT):[ ](\d+)>/gi,(_0x46e39c,_0x4d2581)=>{const _0x42ef6b=_0x1de9f2;return _0x42ef6b(0x158)!=='sxMQv'?!![]:(this[_0x42ef6b(0x22d)](!![],![],_0x4d2581),'');}),_0x4a35d4=_0x4a35d4[_0x1de9f2(0x1a6)](/<TAIL (?:UL|UPPER LEFT|UP LEFT):[ ](\d+)>/gi,(_0x29dfff,_0x54bf32)=>{const _0x518569=_0x1de9f2;if(_0x518569(0x22a)!==_0x518569(0x1f6))return this['setupMessageTailSettings'](![],!![],_0x54bf32),'';else _0x3103db[_0x518569(0x2b6)][_0x518569(0x1d9)][_0x518569(0x206)](this),this[_0x518569(0x151)]=this[_0x518569(0x151)]||0x0,this[_0x518569(0x151)]=_0x41f553[_0x518569(0x18e)](this[_0x518569(0x151)],_0x38b59c[_0x518569(0x184)]);}),_0x4a35d4=_0x4a35d4['replace'](/<TAIL (?:UR|UPPER RIGHT|UP RIGHT):[ ](\d+)>/gi,(_0x4aef0c,_0x597418)=>{return this['setupMessageTailSettings'](![],![],_0x597418),'';}),_0x4a35d4;},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x22d)]=function(_0xdc793c,_0x1e09fd,_0x17b8a9){const _0x49d2b0=_0x2955fc;if(!this[_0x49d2b0(0x144)])this['resetMessageTailSettings']();this[_0x49d2b0(0x144)]['visible']=!![],this['_messageTail'][_0x49d2b0(0x2b7)]=_0xdc793c?_0x49d2b0(0x230):_0x49d2b0(0x177),this[_0x49d2b0(0x144)]['direction']=_0x1e09fd?_0x49d2b0(0x2f2):_0x49d2b0(0x16a),this[_0x49d2b0(0x144)]['positionX']=Number(_0x17b8a9);},VisuMZ['ExtMessageFunc']['Window_Message_updateAutoPosition']=Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x2c6)],Window_Message['prototype'][_0x2955fc(0x2c6)]=function(){const _0xb83f50=_0x2955fc;VisuMZ['ExtMessageFunc']['Window_Message_updateAutoPosition'][_0xb83f50(0x206)](this);if(!this[_0xb83f50(0x186)])return;if(!this[_0xb83f50(0x298)])return;if(!this[_0xb83f50(0x144)])return;if(this['usesAutoPositionMessageTail']()){const _0x3e66a4=$gameSystem[_0xb83f50(0x290)](),_0x5816fb=_0x3e66a4[_0xb83f50(0x21c)]?_0xb83f50(0x2f2):'right';this[_0xb83f50(0x144)][_0xb83f50(0x240)]=!![],this[_0xb83f50(0x144)]['lastFile']='',this[_0xb83f50(0x144)][_0xb83f50(0x2b7)]=_0xb83f50(0x230),this['_messageTail']['direction']=_0x5816fb,this[_0xb83f50(0x144)][_0xb83f50(0x1dc)]='auto';}},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x1e5)]=function(){const _0x492641=_0x2955fc,_0x54188f=$gameSystem[_0x492641(0x290)]();if(!_0x54188f)return![];if(!_0x54188f[_0x492641(0x2a9)])return![];const _0x3e4b97=_0x54188f[_0x492641(0x21c)]?'Left':'Right',_0x2e0d45=_0x492641(0x2b5)[_0x492641(0x15d)](_0x3e4b97),_0x50bc11=_0x54188f[_0x2e0d45]||'';return _0x50bc11[_0x492641(0x1e1)]()!=='';},VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x20f)]=Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x2ae)],Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x2ae)]=function(){const _0x161e73=_0x2955fc;let _0x158ff0=VisuMZ[_0x161e73(0x2b6)][_0x161e73(0x20f)][_0x161e73(0x206)](this);const _0x1de455=$gameSystem[_0x161e73(0x290)]();return _0x1de455&&_0x1de455[_0x161e73(0x2a9)]&&(_0x158ff0+=_0x1de455['autoPositionOffsetX']),_0x158ff0;},VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x167)]=Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x2f4)],Window_Message[_0x2955fc(0x1af)]['autoPositionOffsetY']=function(){const _0x49607e=_0x2955fc;let _0x4214c9=VisuMZ[_0x49607e(0x2b6)][_0x49607e(0x167)][_0x49607e(0x206)](this);const _0x6e4d2b=$gameSystem[_0x49607e(0x290)]();return _0x6e4d2b&&_0x6e4d2b[_0x49607e(0x2a9)]&&(_0x4214c9+=_0x6e4d2b[_0x49607e(0x2f4)]),_0x4214c9;},Window_Message['prototype'][_0x2955fc(0x197)]=function(){const _0x364d61=_0x2955fc;if(!this[_0x364d61(0x298)])return;if(!this[_0x364d61(0x144)])return;this['updateMessageTailBitmap'](),this[_0x364d61(0x189)](),this['updateMessageTailPosition']();},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x1a3)]=function(){const _0xff43b4=_0x2955fc,_0x1e0e1f=this[_0xff43b4(0x144)],_0x15cc56=_0x1e0e1f[_0xff43b4(0x2b7)]===_0xff43b4(0x177)?_0xff43b4(0x177):_0xff43b4(0x230),_0x5a0dfc=_0x1e0e1f[_0xff43b4(0x1ed)]===_0xff43b4(0x2f2)?_0xff43b4(0x214):_0xff43b4(0x1c2);return'%1%2'['format'](_0x15cc56,_0x5a0dfc);},Window_Message['prototype']['updateMessageTailBitmap']=function(){const _0x830506=_0x2955fc,_0x76fbbf=this[_0x830506(0x298)],_0x1a273d=this[_0x830506(0x144)],_0x75c1c9=$gameSystem['getMessageTailSettings'](),_0x319d47=this[_0x830506(0x1a3)]();if(_0x1a273d[_0x830506(0x27c)]===_0x75c1c9[_0x830506(0x17f)[_0x830506(0x15d)](_0x319d47)])return;const _0x441385=_0x75c1c9[_0x830506(0x17f)[_0x830506(0x15d)](_0x319d47)];_0x1a273d['lastFile']=_0x441385;if(_0x441385)_0x76fbbf[_0x830506(0x2d9)]=ImageManager[_0x830506(0x222)](_0x441385);else{if(_0x830506(0x270)!==_0x830506(0x242))_0x76fbbf['bitmap']=new Bitmap(0x1,0x1);else return this[_0x830506(0x198)]=this[_0x830506(0x1a1)],_0x5c0c0d[_0x830506(0x2b6)]['Game_Interpreter_command101']['call'](this,_0x3f52f3);}},Window_Message['prototype'][_0x2955fc(0x189)]=function(){const _0x227d72=_0x2955fc,_0xf88b0a=this[_0x227d72(0x298)],_0x51cee8=this['_messageTail'];_0xf88b0a['visible']=_0x51cee8[_0x227d72(0x240)]&&this[_0x227d72(0x225)]===0xff;},Window_Message[_0x2955fc(0x1af)][_0x2955fc(0x285)]=function(){const _0x438e6f=_0x2955fc,_0x43ebac=this['_messageTailSprite'],_0x1c3fa6=this[_0x438e6f(0x144)],_0x94c52d=$gameSystem[_0x438e6f(0x290)](),_0x172491=this[_0x438e6f(0x1a3)]();_0x43ebac[_0x438e6f(0x2c5)]['x']=_0x94c52d[_0x438e6f(0x190)['format'](_0x172491)],_0x43ebac['anchor']['y']=_0x94c52d[_0x438e6f(0x28d)[_0x438e6f(0x15d)](_0x172491)],_0x1c3fa6[_0x438e6f(0x1dc)]===_0x438e6f(0x27d)?_0x43ebac['x']=Math[_0x438e6f(0x143)](this['width']/0x2):(_0x1c3fa6[_0x438e6f(0x1dc)]=Number(_0x1c3fa6[_0x438e6f(0x1dc)]),_0x43ebac['x']=Math[_0x438e6f(0x143)](_0x1c3fa6[_0x438e6f(0x1dc)])),_0x1c3fa6[_0x438e6f(0x2b7)]===_0x438e6f(0x177)?'JXNrX'===_0x438e6f(0x21a)?_0x43ebac['y']=0x0:this[_0x438e6f(0x1ba)]=_0x4f0383[_0x438e6f(0x222)](_0x1baa67[_0x438e6f(0x226)]):_0x438e6f(0x1d8)===_0x438e6f(0x1a2)?this[_0x438e6f(0x16b)]():_0x43ebac['y']=this['height'],_0x43ebac['x']+=_0x94c52d[_0x438e6f(0x19c)['format'](_0x172491)],_0x43ebac['y']+=_0x94c52d[_0x438e6f(0x1e3)['format'](_0x172491)];};function Window_ButtonConsole(){const _0x3c3ccc=_0x2955fc;this[_0x3c3ccc(0x28f)](...arguments);}Window_ButtonConsole[_0x2955fc(0x1af)]=Object[_0x2955fc(0x183)](Window_Scrollable[_0x2955fc(0x1af)]),Window_ButtonConsole[_0x2955fc(0x1af)][_0x2955fc(0x28a)]=Window_ButtonConsole,Window_ButtonConsole[_0x2955fc(0x239)]=VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)]['MsgButtonConsole']['ShowDefault'],Window_ButtonConsole[_0x2955fc(0x26e)]=VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)]['MsgButtonConsole']['Position'],Window_ButtonConsole[_0x2955fc(0x226)]=VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)]['MsgButtonConsole'][_0x2955fc(0x2ee)],Window_ButtonConsole[_0x2955fc(0x2e3)]=VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)][_0x2955fc(0x17a)][_0x2955fc(0x2de)],Window_ButtonConsole['FONT_SIZE']=VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)][_0x2955fc(0x17a)][_0x2955fc(0x2a3)],Window_ButtonConsole[_0x2955fc(0x265)]=VisuMZ[_0x2955fc(0x2b6)]['Settings']['MsgButtonConsole'][_0x2955fc(0x241)],Window_ButtonConsole['TEXT_COLOR_TOGGLED']=VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)][_0x2955fc(0x17a)][_0x2955fc(0x176)],Window_ButtonConsole[_0x2955fc(0x23d)]=VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)][_0x2955fc(0x17a)][_0x2955fc(0x279)],Window_ButtonConsole['BUTTON_WIDTH']=VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)][_0x2955fc(0x17a)]['ButtonWidth'],Window_ButtonConsole['BUTTON_HEIGHT']=VisuMZ[_0x2955fc(0x2b6)]['Settings']['MsgButtonConsole'][_0x2955fc(0x269)],Window_ButtonConsole[_0x2955fc(0x152)]=VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)]['MsgButtonConsole'][_0x2955fc(0x280)],Window_ButtonConsole[_0x2955fc(0x2ed)]=VisuMZ['ExtMessageFunc'][_0x2955fc(0x204)][_0x2955fc(0x192)]['List'],Window_ButtonConsole[_0x2955fc(0x1dd)]={'auto':VisuMZ[_0x2955fc(0x2b6)]['Settings'][_0x2955fc(0x192)][_0x2955fc(0x2af)],'fastfwd':VisuMZ['ExtMessageFunc'][_0x2955fc(0x204)]['Buttons'][_0x2955fc(0x2df)],'save':VisuMZ[_0x2955fc(0x2b6)]['Settings']['Buttons'][_0x2955fc(0x1ce)],'load':VisuMZ[_0x2955fc(0x2b6)]['Settings'][_0x2955fc(0x192)][_0x2955fc(0x1f8)],'options':VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)][_0x2955fc(0x192)]['Options'],'gameend':VisuMZ[_0x2955fc(0x2b6)]['Settings'][_0x2955fc(0x192)]['GameEnd']},Window_ButtonConsole['SHORTCUT_KEY']={'auto':VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)][_0x2955fc(0x192)][_0x2955fc(0x27b)],'save':VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)][_0x2955fc(0x192)]['SaveKey'],'load':VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)][_0x2955fc(0x192)][_0x2955fc(0x281)],'options':VisuMZ[_0x2955fc(0x2b6)][_0x2955fc(0x204)]['Buttons'][_0x2955fc(0x18f)],'gameend':VisuMZ[_0x2955fc(0x2b6)]['Settings'][_0x2955fc(0x192)]['GameEndKey']},Window_ButtonConsole[_0x2955fc(0x1af)][_0x2955fc(0x28f)]=function(_0x5f4b03,_0x37a66f){const _0x4fbb0f=_0x2955fc,_0x49560a=new Rectangle(0x0,0x0,Window_ButtonConsole[_0x4fbb0f(0x1fa)],Window_ButtonConsole[_0x4fbb0f(0x24b)]);this['_parentWindow']=_0x37a66f,Window_Scrollable['prototype'][_0x4fbb0f(0x28f)][_0x4fbb0f(0x206)](this,_0x49560a),this[_0x4fbb0f(0x193)](),this[_0x4fbb0f(0x180)]=_0x5f4b03['toLowerCase']()[_0x4fbb0f(0x1e1)](),this[_0x4fbb0f(0x1bf)](),this['hide']();},Window_ButtonConsole[_0x2955fc(0x1af)][_0x2955fc(0x25e)]=function(){return 0x0;},Window_ButtonConsole[_0x2955fc(0x1af)][_0x2955fc(0x1c4)]=function(){const _0x626ad0=_0x2955fc;this[_0x626ad0(0x1ba)]=ImageManager['loadSystem'](Window_ButtonConsole['SKIN']);},Window_ButtonConsole[_0x2955fc(0x1af)][_0x2955fc(0x2c0)]=function(){const _0x3b1fb8=_0x2955fc;this[_0x3b1fb8(0x1f5)]=0x0;},Window_ButtonConsole[_0x2955fc(0x1af)][_0x2955fc(0x28e)]=function(){const _0x180d4a=_0x2955fc;this[_0x180d4a(0x162)]=0xff;},Window_ButtonConsole[_0x2955fc(0x1af)]['createBackImageSprites']=function(){const _0x362a3c=_0x2955fc;Window_ButtonConsole[_0x362a3c(0x1ac)]===undefined&&this[_0x362a3c(0x14a)]();if(!Window_ButtonConsole[_0x362a3c(0x1ac)])return;this[_0x362a3c(0x254)]=0x0;const _0x3cd849=VisuMZ[_0x362a3c(0x2b6)]['Settings'][_0x362a3c(0x17a)],_0x490bfb=[_0x362a3c(0x148),_0x362a3c(0x21f),_0x362a3c(0x2e9)];this['_buttonConsoleSprites']={};for(const _0x325bbe of _0x490bfb){if(_0x3cd849[_0x325bbe]!==''){if('WHwkP'!==_0x362a3c(0x15e)){const _0x4ee6a9=ImageManager['loadSystem'](_0x3cd849[_0x325bbe]);this[_0x362a3c(0x267)][_0x325bbe]=new Sprite(_0x4ee6a9);const _0x5d7de2=this['_buttonConsoleSprites'][_0x325bbe];this['addChildToBack'](_0x5d7de2),_0x5d7de2['x']=_0x3cd849['%1OffsetX'[_0x362a3c(0x15d)](_0x325bbe)]||0x0,_0x5d7de2['y']=_0x3cd849[_0x362a3c(0x1e3)[_0x362a3c(0x15d)](_0x325bbe)]||0x0;}else{const _0x4c65e7=this[_0x362a3c(0x267)]['ImgToggled'];_0x4c65e7[_0x362a3c(0x240)]=this[_0x362a3c(0x231)]()===_0x376aa0['TEXT_COLOR_TOGGLED'];}}}this[_0x362a3c(0x25b)]();},Window_ButtonConsole[_0x2955fc(0x1af)]['checkBackImageSprites']=function(){const _0x3ef640=_0x2955fc;Window_ButtonConsole[_0x3ef640(0x1ac)]=![];const _0x3199de=VisuMZ[_0x3ef640(0x2b6)][_0x3ef640(0x204)][_0x3ef640(0x17a)],_0x5daa8d=[_0x3ef640(0x148),_0x3ef640(0x21f),_0x3ef640(0x2e9)];for(const _0x52f0de of _0x5daa8d){if(_0x3199de[_0x52f0de]!==''){Window_ButtonConsole[_0x3ef640(0x1ac)]=!![];break;}}},Window_ButtonConsole[_0x2955fc(0x1af)][_0x2955fc(0x259)]=function(){const _0x2062e6=_0x2955fc;Window_Scrollable['prototype']['resetFontSettings']['call'](this),this[_0x2062e6(0x283)][_0x2062e6(0x1bd)]=Window_ButtonConsole[_0x2062e6(0x2e3)],this[_0x2062e6(0x283)][_0x2062e6(0x213)]=Window_ButtonConsole[_0x2062e6(0x175)];},Window_ButtonConsole[_0x2955fc(0x1af)]['refresh']=function(){const _0x2aa70c=_0x2955fc;this[_0x2aa70c(0x2b9)](),this[_0x2aa70c(0x259)]();const _0x4ee94d=TextManager['msgButtonConsole'](this['_type']),_0x21805e=this[_0x2aa70c(0x231)]();this[_0x2aa70c(0x27a)](ColorManager['getColor'](_0x21805e)),this[_0x2aa70c(0x2ac)](_0x4ee94d,0x0,0x0,this['innerWidth'],_0x2aa70c(0x2c2));},Window_ButtonConsole[_0x2955fc(0x1af)][_0x2955fc(0x231)]=function(){const _0x393ced=_0x2955fc;switch(this['_type']){case _0x393ced(0x27d):if($gameTemp[_0x393ced(0x2ea)]()){if('PsiVz'===_0x393ced(0x1f9))return Window_ButtonConsole[_0x393ced(0x14b)];else{if(this[_0x393ced(0x271)])return;if(!_0x20c4c8[_0x393ced(0x274)]())return;let _0x25c2ef=!_0x2a5a1d[_0x393ced(0x2ea)]();_0x593985[_0x393ced(0x19e)](_0x25c2ef),_0x25c2ef?this[_0x393ced(0x1e2)]():_0x196184['playCancel']();}}break;case _0x393ced(0x187):const _0x388ce7=SceneManager['_scene'];if($gameSystem[_0x393ced(0x16c)]())return Window_ButtonConsole[_0x393ced(0x23d)];else{if(_0x388ce7&&_0x388ce7[_0x393ced(0x2b3)]&&_0x388ce7[_0x393ced(0x2b3)]())return Window_ButtonConsole[_0x393ced(0x14b)];}break;case _0x393ced(0x1d3):if(!$gameSystem['isSaveEnabled']()||!SceneManager[_0x393ced(0x1e6)]()){if(_0x393ced(0x29d)===_0x393ced(0x2b4))this[_0x393ced(0x1e2)](),_0x1ab1a8[_0x393ced(0x150)](_0x344132);else return Window_ButtonConsole[_0x393ced(0x23d)];}break;case _0x393ced(0x1b1):if(!DataManager[_0x393ced(0x2c7)]()||!SceneManager[_0x393ced(0x1e6)]())return Window_ButtonConsole[_0x393ced(0x23d)];break;case _0x393ced(0x268):case _0x393ced(0x1f4):if(!SceneManager['isSceneMap']()){if(_0x393ced(0x17c)===_0x393ced(0x2ca))this[_0x393ced(0x1e2)]();else return Window_ButtonConsole['TEXT_COLOR_DISABLED'];}break;case _0x393ced(0x1b4):case _0x393ced(0x1d2):if(!$gameSystem[_0x393ced(0x174)]()||!SceneManager[_0x393ced(0x1e6)]())return Window_ButtonConsole[_0x393ced(0x23d)];break;}return Window_ButtonConsole[_0x393ced(0x265)];},Window_ButtonConsole[_0x2955fc(0x1af)][_0x2955fc(0x1be)]=function(){return!![];},Window_ButtonConsole[_0x2955fc(0x1af)][_0x2955fc(0x154)]=function(){const _0x373336=_0x2955fc;if(this[_0x373336(0x225)]<0xff)return;switch(this[_0x373336(0x180)]){case _0x373336(0x27d):let _0x5c327b=!$gameTemp[_0x373336(0x2ea)]();$gameTemp[_0x373336(0x19e)](_0x5c327b);_0x5c327b?this[_0x373336(0x1e2)]():'TdrvQ'==='TdrvQ'?SoundManager[_0x373336(0x199)]():_0x542ee7[_0x373336(0x199)]();break;case _0x373336(0x187):if(!$gameSystem[_0x373336(0x16c)]()){let _0x39ad89=!$gameTemp[_0x373336(0x294)]();$gameTemp['setExtendedFastForwardMode'](_0x39ad89),_0x39ad89?this['playOkSound']():SoundManager['playCancel'](),this[_0x373336(0x1bf)]();}else{if(_0x373336(0x289)!==_0x373336(0x2bb))this[_0x373336(0x16b)]();else{const _0x3e965e=_0x3ae39c[_0x373336(0x290)]();if(!_0x3e965e)return![];if(!_0x3e965e[_0x373336(0x2a9)])return![];const _0x4d9ab7=_0x3e965e[_0x373336(0x21c)]?_0x373336(0x214):_0x373336(0x1c2),_0x27d07f=_0x373336(0x2b5)[_0x373336(0x15d)](_0x4d9ab7),_0x131dfd=_0x3e965e[_0x27d07f]||'';return _0x131dfd[_0x373336(0x1e1)]()!=='';}}break;case _0x373336(0x1d3):if($gameSystem[_0x373336(0x14f)]()&&SceneManager[_0x373336(0x1e6)]())_0x373336(0x2a6)!=='rtnqg'?this[_0x373336(0x1e0)]():(this[_0x373336(0x1e2)](),SceneManager['push'](Scene_SaveButtonConsole));else{if(_0x373336(0x22c)===_0x373336(0x22c))this['playBuzzerSound']();else{if(!_0x4edb2e[_0x373336(0x2cb)])return![];if(_0x18edb6[_0x373336(0x16c)]())return![];if(this[_0x373336(0x149)]())return![];return this[_0x373336(0x2b3)]();}}break;case _0x373336(0x1b1):DataManager[_0x373336(0x2c7)]()&&SceneManager[_0x373336(0x1e6)]()?(this[_0x373336(0x1e2)](),SceneManager['push'](Scene_Load)):_0x373336(0x263)!=='Fipws'?this[_0x373336(0x28f)](...arguments):this[_0x373336(0x16b)]();break;case'options':if(SceneManager['isSceneMap']()){if(_0x373336(0x2e0)===_0x373336(0x1e8))return _0x5e4127[_0x373336(0x199)](),_0x4dea02[_0x373336(0x19e)](![]),!![];else this[_0x373336(0x1e2)](),SceneManager[_0x373336(0x150)](Scene_Options);}else{if(_0x373336(0x286)===_0x373336(0x286))this[_0x373336(0x16b)]();else return!![];}break;case'gameend':SceneManager['isSceneMap']()?(this[_0x373336(0x1e2)](),SceneManager[_0x373336(0x150)](Scene_GameEnd)):this[_0x373336(0x16b)]();break;case _0x373336(0x19a):Imported[_0x373336(0x22f)]&&$gameTemp['toggleMessageWindowVisibility']();break;case'backlog':case _0x373336(0x1d2):Imported['VisuMZ_3_MessageLog']&&($gameSystem[_0x373336(0x174)]()&&SceneManager[_0x373336(0x1e6)]()?(this['playOkSound'](),SceneManager[_0x373336(0x150)](Scene_MessageLog)):this['playBuzzerSound']());break;}TouchInput[_0x373336(0x272)]();},Window_ButtonConsole[_0x2955fc(0x1af)][_0x2955fc(0x21d)]=function(){const _0x4180ac=_0x2955fc;Window_Scrollable['prototype'][_0x4180ac(0x21d)][_0x4180ac(0x206)](this),this[_0x4180ac(0x24d)](),this[_0x4180ac(0x182)](),this['updateBackImageSpriteVisibility']();},Window_ButtonConsole[_0x2955fc(0x1af)]['updateConsoleVisibility']=function(){const _0x5ab73a=_0x2955fc;if(!this[_0x5ab73a(0x1c3)])return;this[_0x5ab73a(0x225)]=this[_0x5ab73a(0x1c3)][_0x5ab73a(0x225)];},Window_ButtonConsole['prototype'][_0x2955fc(0x182)]=function(){const _0x43e2fa=_0x2955fc;this[_0x43e2fa(0x180)]===_0x43e2fa(0x187)&&(_0x43e2fa(0x212)!==_0x43e2fa(0x2aa)?this[_0x43e2fa(0x140)]!==Input['isPressed'](VisuMZ['MessageCore']['Settings']['General'][_0x43e2fa(0x248)])&&(this[_0x43e2fa(0x140)]=Input[_0x43e2fa(0x249)](VisuMZ[_0x43e2fa(0x209)][_0x43e2fa(0x204)]['General'][_0x43e2fa(0x248)]),this[_0x43e2fa(0x1bf)]()):_0x57e211[_0x43e2fa(0x222)](_0x185a6b[_0x1f6339]));},Window_ButtonConsole[_0x2955fc(0x1af)][_0x2955fc(0x25b)]=function(){const _0x5981f4=_0x2955fc;if(!Window_ButtonConsole[_0x5981f4(0x1ac)])return;if(this[_0x5981f4(0x267)][_0x5981f4(0x148)]){const _0x52c938=this[_0x5981f4(0x267)][_0x5981f4(0x148)];_0x52c938['visible']=this[_0x5981f4(0x231)]()===Window_ButtonConsole[_0x5981f4(0x23d)];}if(this[_0x5981f4(0x267)]['ImgEnabled']){if(_0x5981f4(0x14c)!==_0x5981f4(0x26f)){const _0x305184=this['_buttonConsoleSprites'][_0x5981f4(0x21f)];_0x305184[_0x5981f4(0x240)]=this[_0x5981f4(0x231)]()===Window_ButtonConsole[_0x5981f4(0x265)];}else{if(_0x42baf1[_0x42f908]!==''){const _0x2750fd=_0x507683[_0x5981f4(0x222)](_0x280088[_0x49d749]);this[_0x5981f4(0x267)][_0x360b03]=new _0x42846a(_0x2750fd);const _0x1fb7df=this[_0x5981f4(0x267)][_0x196c5d];this[_0x5981f4(0x2bc)](_0x1fb7df),_0x1fb7df['x']=_0x549213[_0x5981f4(0x19c)[_0x5981f4(0x15d)](_0x355b1c)]||0x0,_0x1fb7df['y']=_0x58b6fc[_0x5981f4(0x1e3)[_0x5981f4(0x15d)](_0x416623)]||0x0;}}}if(this['_buttonConsoleSprites'][_0x5981f4(0x2e9)]){const _0x44d540=this[_0x5981f4(0x267)][_0x5981f4(0x2e9)];_0x44d540[_0x5981f4(0x240)]=this['textColorID']()===Window_ButtonConsole[_0x5981f4(0x14b)];}};