//=============================================================================
// VisuStella MZ - Extended Message Functionality
// VisuMZ_2_ExtMessageFunc.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ExtMessageFunc = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ExtMessageFunc = VisuMZ.ExtMessageFunc || {};
VisuMZ.ExtMessageFunc.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.11] [ExtMessageFunc]
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
 *   Reset on Scene Change?:
 *   - Reset Fast Forward setting on scene changes (ie battle, menu, or
 *     map transfers)?
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
 * Version 1.11: November 10, 2022
 * * Bug Fixes!
 * ** Plugin Command "Message Cursor: Change Settings" no longer leaves behind
 *    the old cursor sprite when a new one is selected. Fix made by Irina.
 * 
 * Version 1.10: August 11, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina
 * *** Plugin Parameters > Fast Forward > Reset on Scene Change?
 * **** Reset Fast Forward setting on scene changes (ie battle, menu, or
 *      map transfers)?
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
 * @default {"Enable:eval":"true","Speed:num":"8","SceneChangeReset:eval":"true"}
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
 * @param SceneChangeReset:eval
 * @text Reset on Scene Change?
 * @parent General
 * @type boolean
 * @on Reset
 * @off Keep
 * @desc Reset Fast Forward setting on scene changes (ie battle, menu, or map transfers)?
 * @default true
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

const _0x28d800=_0x3f03;(function(_0x5cbe96,_0x4755df){const _0x1ee083=_0x3f03,_0x4690fe=_0x5cbe96();while(!![]){try{const _0x4d17ca=-parseInt(_0x1ee083(0x301))/0x1*(-parseInt(_0x1ee083(0x24f))/0x2)+parseInt(_0x1ee083(0x330))/0x3*(parseInt(_0x1ee083(0x33b))/0x4)+-parseInt(_0x1ee083(0x2a3))/0x5*(parseInt(_0x1ee083(0x297))/0x6)+-parseInt(_0x1ee083(0x1df))/0x7*(-parseInt(_0x1ee083(0x34c))/0x8)+-parseInt(_0x1ee083(0x20f))/0x9*(-parseInt(_0x1ee083(0x1ec))/0xa)+parseInt(_0x1ee083(0x300))/0xb+-parseInt(_0x1ee083(0x2b8))/0xc;if(_0x4d17ca===_0x4755df)break;else _0x4690fe['push'](_0x4690fe['shift']());}catch(_0x56c48f){_0x4690fe['push'](_0x4690fe['shift']());}}}(_0x5603,0xeaea9));var label=_0x28d800(0x254),tier=tier||0x0,dependencies=[_0x28d800(0x21d)],pluginData=$plugins[_0x28d800(0x1e9)](function(_0x83a50){const _0xffb044=_0x28d800;return _0x83a50['status']&&_0x83a50[_0xffb044(0x271)][_0xffb044(0x2eb)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x28d800(0x270)]=function(_0x4582ba,_0x57f35b){const _0x3b6cd4=_0x28d800;for(const _0x4f6503 in _0x57f35b){if(_0x4f6503[_0x3b6cd4(0x26c)](/(.*):(.*)/i)){const _0x9f0f03=String(RegExp['$1']),_0x3ac488=String(RegExp['$2'])[_0x3b6cd4(0x2d0)]()[_0x3b6cd4(0x2e1)]();let _0x32ab71,_0x35ad86,_0x3619b4;switch(_0x3ac488){case'NUM':_0x32ab71=_0x57f35b[_0x4f6503]!==''?Number(_0x57f35b[_0x4f6503]):0x0;break;case'ARRAYNUM':_0x35ad86=_0x57f35b[_0x4f6503]!==''?JSON[_0x3b6cd4(0x2be)](_0x57f35b[_0x4f6503]):[],_0x32ab71=_0x35ad86[_0x3b6cd4(0x1ab)](_0x2600a0=>Number(_0x2600a0));break;case _0x3b6cd4(0x222):_0x32ab71=_0x57f35b[_0x4f6503]!==''?eval(_0x57f35b[_0x4f6503]):null;break;case _0x3b6cd4(0x335):_0x35ad86=_0x57f35b[_0x4f6503]!==''?JSON[_0x3b6cd4(0x2be)](_0x57f35b[_0x4f6503]):[],_0x32ab71=_0x35ad86[_0x3b6cd4(0x1ab)](_0x56ae80=>eval(_0x56ae80));break;case _0x3b6cd4(0x22f):_0x32ab71=_0x57f35b[_0x4f6503]!==''?JSON[_0x3b6cd4(0x2be)](_0x57f35b[_0x4f6503]):'';break;case'ARRAYJSON':_0x35ad86=_0x57f35b[_0x4f6503]!==''?JSON[_0x3b6cd4(0x2be)](_0x57f35b[_0x4f6503]):[],_0x32ab71=_0x35ad86[_0x3b6cd4(0x1ab)](_0x33d599=>JSON['parse'](_0x33d599));break;case _0x3b6cd4(0x2b9):_0x32ab71=_0x57f35b[_0x4f6503]!==''?new Function(JSON['parse'](_0x57f35b[_0x4f6503])):new Function('return\x200');break;case _0x3b6cd4(0x239):_0x35ad86=_0x57f35b[_0x4f6503]!==''?JSON[_0x3b6cd4(0x2be)](_0x57f35b[_0x4f6503]):[],_0x32ab71=_0x35ad86[_0x3b6cd4(0x1ab)](_0x54c100=>new Function(JSON[_0x3b6cd4(0x2be)](_0x54c100)));break;case _0x3b6cd4(0x32d):_0x32ab71=_0x57f35b[_0x4f6503]!==''?String(_0x57f35b[_0x4f6503]):'';break;case _0x3b6cd4(0x248):_0x35ad86=_0x57f35b[_0x4f6503]!==''?JSON[_0x3b6cd4(0x2be)](_0x57f35b[_0x4f6503]):[],_0x32ab71=_0x35ad86[_0x3b6cd4(0x1ab)](_0x255a61=>String(_0x255a61));break;case'STRUCT':_0x3619b4=_0x57f35b[_0x4f6503]!==''?JSON[_0x3b6cd4(0x2be)](_0x57f35b[_0x4f6503]):{},_0x32ab71=VisuMZ[_0x3b6cd4(0x270)]({},_0x3619b4);break;case _0x3b6cd4(0x1fd):_0x35ad86=_0x57f35b[_0x4f6503]!==''?JSON[_0x3b6cd4(0x2be)](_0x57f35b[_0x4f6503]):[],_0x32ab71=_0x35ad86[_0x3b6cd4(0x1ab)](_0x3dc36d=>VisuMZ[_0x3b6cd4(0x270)]({},JSON['parse'](_0x3dc36d)));break;default:continue;}_0x4582ba[_0x9f0f03]=_0x32ab71;}}return _0x4582ba;},(_0x10050d=>{const _0x4a3d76=_0x28d800,_0x2bd41c=_0x10050d[_0x4a3d76(0x1c9)];for(const _0x4c9bed of dependencies){if(_0x4a3d76(0x282)!=='HPHca'){if(!Imported[_0x4c9bed]){if(_0x4a3d76(0x2a8)===_0x4a3d76(0x2a8)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x4a3d76(0x247)](_0x2bd41c,_0x4c9bed)),SceneManager['exit']();break;}else return;}}else this[_0x4a3d76(0x30c)]()?(this['removeExistingPauseSignSprites'](),this['createCustomMessageCursorPauseSignSprites']()):_0x2f1ece[_0x4a3d76(0x328)]['_createPauseSignSprites'][_0x4a3d76(0x30f)](this);}const _0x5b7947=_0x10050d['description'];if(_0x5b7947[_0x4a3d76(0x26c)](/\[Version[ ](.*?)\]/i)){if(_0x4a3d76(0x214)!=='jlVfF'){const _0x58b7d2=Number(RegExp['$1']);_0x58b7d2!==VisuMZ[label]['version']&&(_0x4a3d76(0x1b5)!==_0x4a3d76(0x309)?(alert(_0x4a3d76(0x346)[_0x4a3d76(0x247)](_0x2bd41c,_0x58b7d2)),SceneManager[_0x4a3d76(0x340)]()):this[_0x4a3d76(0x219)]());}else{const _0x111420=_0x1f06c8[_0x4a3d76(0x2e5)];if(!_0x111420)return;const _0x15d05a=_0x111420[_0x4a3d76(0x1d8)];if(!_0x15d05a)return;_0x15d05a[_0x4a3d76(0x2a5)]();}}if(_0x5b7947['match'](/\[Tier[ ](\d+)\]/i)){const _0x270d01=Number(RegExp['$1']);_0x270d01<tier?'vlutf'===_0x4a3d76(0x29c)?(_0x24a09b('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x43be9b,_0x3dae0f)),_0x39ce1f[_0x4a3d76(0x340)]()):(alert(_0x4a3d76(0x25d)[_0x4a3d76(0x247)](_0x2bd41c,_0x270d01,tier)),SceneManager[_0x4a3d76(0x340)]()):tier=Math[_0x4a3d76(0x29d)](_0x270d01,tier);}VisuMZ[_0x4a3d76(0x270)](VisuMZ[label]['Settings'],_0x10050d[_0x4a3d76(0x333)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x28d800(0x1c9)],_0x28d800(0x34e),_0x258226=>{const _0x2b9352=_0x28d800;VisuMZ[_0x2b9352(0x270)](_0x258226,_0x258226);const _0x358934=!_0x258226[_0x2b9352(0x260)];$gameSystem['setExtendedFastForwardDisallowed'](_0x358934);}),PluginManager[_0x28d800(0x2aa)](pluginData[_0x28d800(0x1c9)],_0x28d800(0x332),_0x5a0f8e=>{const _0x3242db=_0x28d800;VisuMZ[_0x3242db(0x270)](_0x5a0f8e,_0x5a0f8e);const _0x119013=_0x5a0f8e[_0x3242db(0x2b7)];$gameSystem[_0x3242db(0x1c4)](_0x119013);}),PluginManager[_0x28d800(0x2aa)](pluginData[_0x28d800(0x1c9)],'MessageCursorSettings',_0x4af08c=>{const _0x4df89b=_0x28d800;VisuMZ[_0x4df89b(0x270)](_0x4af08c,_0x4af08c);const _0x11c2e9=_0x4af08c['MsgCursor'];$gameSystem[_0x4df89b(0x1fb)](_0x11c2e9);const _0x123ee1=SceneManager['_scene']['_messageWindow'];_0x123ee1&&(_0x123ee1[_0x4df89b(0x1e3)](),_0x123ee1['_refreshPauseSign']());}),PluginManager[_0x28d800(0x2aa)](pluginData[_0x28d800(0x1c9)],_0x28d800(0x283),_0x167798=>{const _0x1ea56=_0x28d800;VisuMZ[_0x1ea56(0x270)](_0x167798,_0x167798),$gameSystem[_0x1ea56(0x1eb)](_0x167798[_0x1ea56(0x22a)]);}),TextManager[_0x28d800(0x34a)]=function(_0x54c692){const _0x1fb52e=_0x28d800;if(Window_ButtonConsole[_0x1fb52e(0x1d6)][_0x54c692]){if(_0x1fb52e(0x1e6)!==_0x1fb52e(0x318))return Window_ButtonConsole[_0x1fb52e(0x1d6)][_0x54c692];else this[_0x1fb52e(0x31a)](_0x12d29b);}return _0x54c692[_0x1fb52e(0x2d0)]()[_0x1fb52e(0x2e1)]();},ColorManager[_0x28d800(0x2cd)]=function(_0x26e68b){const _0x4aa71b=_0x28d800;_0x26e68b=String(_0x26e68b);if(_0x26e68b[_0x4aa71b(0x26c)](/#(.*)/i)){if(_0x4aa71b(0x31e)!==_0x4aa71b(0x2ba))return'#%1'['format'](String(RegExp['$1']));else this[_0x4aa71b(0x1e0)](),_0x6e69b3[_0x4aa71b(0x281)](_0x54f36b);}else return this[_0x4aa71b(0x289)](Number(_0x26e68b));},SceneManager[_0x28d800(0x2ac)]=function(){const _0x314de1=_0x28d800;return this[_0x314de1(0x2e5)]&&this[_0x314de1(0x2e5)]['constructor']===Scene_Battle;},SceneManager[_0x28d800(0x215)]=function(){const _0x1847d0=_0x28d800;return this['_scene']&&this[_0x1847d0(0x2e5)][_0x1847d0(0x244)]===Scene_Map;},VisuMZ[_0x28d800(0x254)][_0x28d800(0x285)]=SceneManager[_0x28d800(0x281)],SceneManager[_0x28d800(0x281)]=function(_0x5a26a9){const _0x4119ee=_0x28d800;VisuMZ[_0x4119ee(0x254)][_0x4119ee(0x285)]['call'](this,_0x5a26a9);if([Scene_SaveButtonConsole,Scene_Save,Scene_Load][_0x4119ee(0x2eb)](_0x5a26a9)){if('MouNO'===_0x4119ee(0x342))this[_0x4119ee(0x316)]();else{const _0x28dd99=_0x481aea[_0x4119ee(0x254)]['Settings'][_0x4119ee(0x2ea)];this[_0x4119ee(0x2c3)]=_0x52bae3[_0x4119ee(0x30b)](_0x28dd99);}}},SceneManager['loadPartyGraphics']=function(){const _0x561927=_0x28d800;for(const _0x136098 of $gameParty[_0x561927(0x311)]()){'BTVht'!=='EbJbx'?(_0x136098[_0x561927(0x23c)]()&&ImageManager[_0x561927(0x2ff)](_0x136098[_0x561927(0x23c)]()),_0x136098[_0x561927(0x292)]()&&ImageManager[_0x561927(0x290)](_0x136098[_0x561927(0x292)]()),_0x136098['battlerName']()&&ImageManager[_0x561927(0x315)](_0x136098[_0x561927(0x200)]())):this[_0x561927(0x345)]();}},Game_Temp[_0x28d800(0x328)][_0x28d800(0x24e)]=function(){const _0x1e7c9a=_0x28d800;return this[_0x1e7c9a(0x237)];},Game_Temp[_0x28d800(0x328)]['setMessageAutoForwardMode']=function(_0x5f3fef){const _0x1112d8=_0x28d800;this[_0x1112d8(0x237)]=_0x5f3fef,$gameMessage[_0x1112d8(0x2a5)]();},Game_Temp[_0x28d800(0x328)][_0x28d800(0x246)]=function(){const _0x3c07af=_0x28d800;return this[_0x3c07af(0x2fc)];},Game_Temp[_0x28d800(0x328)][_0x28d800(0x28d)]=function(_0x5e8496){const _0x32c6e3=_0x28d800;this[_0x32c6e3(0x2fc)]=_0x5e8496,$gameMessage[_0x32c6e3(0x2a5)]();},VisuMZ[_0x28d800(0x254)][_0x28d800(0x1c2)]=Game_Temp[_0x28d800(0x328)][_0x28d800(0x221)],Game_Temp['prototype']['requestAnimation']=function(_0xebd233,_0x1308c9,_0x4067bc){const _0x3dd92c=_0x28d800;if(this[_0x3dd92c(0x2a6)]())return;VisuMZ['ExtMessageFunc'][_0x3dd92c(0x1c2)][_0x3dd92c(0x30f)](this,_0xebd233,_0x1308c9,_0x4067bc);},Game_Temp[_0x28d800(0x328)][_0x28d800(0x2a6)]=function(){const _0x7fa9cd=_0x28d800,_0x52bacd=SceneManager['_scene'];return _0x52bacd&&_0x52bacd[_0x7fa9cd(0x246)]&&_0x52bacd[_0x7fa9cd(0x246)]();},VisuMZ[_0x28d800(0x254)][_0x28d800(0x264)]=Game_System[_0x28d800(0x328)][_0x28d800(0x1ac)],Game_System[_0x28d800(0x328)][_0x28d800(0x1ac)]=function(){const _0x247366=_0x28d800;VisuMZ[_0x247366(0x254)][_0x247366(0x264)][_0x247366(0x30f)](this),this['initMessageButtonConsole'](),this[_0x247366(0x345)](),this[_0x247366(0x219)]();},Game_System[_0x28d800(0x328)][_0x28d800(0x204)]=function(){this['_messageButtonConsoleVisible']=Window_ButtonConsole['DEFAULT_SHOW'];},Game_System[_0x28d800(0x328)]['isMessageButtonConsoleVisible']=function(){const _0x4cd483=_0x28d800;return this[_0x4cd483(0x201)]===undefined&&this['initMessageButtonConsole'](),this[_0x4cd483(0x201)];},Game_System['prototype']['setMessageButtonConsoleVisible']=function(_0x4e4915){const _0x2d759f=_0x28d800;this[_0x2d759f(0x201)]===undefined&&this[_0x2d759f(0x204)](),this[_0x2d759f(0x201)]=_0x4e4915;},Game_System[_0x28d800(0x328)]['initExtendedFastForward']=function(){const _0x29b2e8=_0x28d800;this[_0x29b2e8(0x1fe)]=![];},Game_System[_0x28d800(0x328)][_0x28d800(0x33d)]=function(){const _0x38233c=_0x28d800;return this[_0x38233c(0x1fe)]===undefined&&this[_0x38233c(0x345)](),this[_0x38233c(0x1fe)];},Game_System['prototype']['setExtendedFastForwardDisallowed']=function(_0x3e8dba){const _0x2d42c1=_0x28d800;this['_disallowFastForward']===undefined&&this[_0x2d42c1(0x345)](),this[_0x2d42c1(0x1fe)]=_0x3e8dba;},Game_System[_0x28d800(0x328)][_0x28d800(0x219)]=function(){const _0x206e69=_0x28d800;this['_msgCursorSettings']=JsonEx[_0x206e69(0x30b)](VisuMZ[_0x206e69(0x254)][_0x206e69(0x22a)][_0x206e69(0x2e8)]);},Game_System[_0x28d800(0x328)]['getMessageCursorSettings']=function(){const _0x54a430=_0x28d800;if(this[_0x54a430(0x21c)]===undefined){if(_0x54a430(0x349)!==_0x54a430(0x349)){if(this[_0x54a430(0x299)])return;if(!_0x3c0690[_0x54a430(0x245)]())return;let _0x144d57=!_0x1f0ca5[_0x54a430(0x24e)]();_0x20393b[_0x54a430(0x305)](_0x144d57),_0x144d57?this[_0x54a430(0x1e0)]():_0x59aa74[_0x54a430(0x1d1)]();}else this[_0x54a430(0x219)]();}return this[_0x54a430(0x21c)];},Game_System[_0x28d800(0x328)]['setMessageCursorSettings']=function(_0x145a5f){const _0x591619=_0x28d800;this[_0x591619(0x21c)]===undefined&&this[_0x591619(0x219)](),this[_0x591619(0x21c)]=JsonEx[_0x591619(0x30b)](_0x145a5f);},Game_System[_0x28d800(0x328)][_0x28d800(0x2d2)]=function(){const _0xc8a5cb=_0x28d800;if(this[_0xc8a5cb(0x2c3)]===undefined){if(_0xc8a5cb(0x1db)===_0xc8a5cb(0x267))this[_0xc8a5cb(0x1fe)]=![];else{const _0x36f30c=VisuMZ['ExtMessageFunc'][_0xc8a5cb(0x22a)][_0xc8a5cb(0x2ea)];this[_0xc8a5cb(0x2c3)]=JsonEx[_0xc8a5cb(0x30b)](_0x36f30c);}}return this['_messageTailSettings'];},Game_System[_0x28d800(0x328)][_0x28d800(0x1eb)]=function(_0x564ca8){const _0x3cda0c=_0x28d800;this[_0x3cda0c(0x2c3)]=JsonEx[_0x3cda0c(0x30b)](_0x564ca8);},Game_Message[_0x28d800(0x328)]['refreshButtonConsole']=function(){const _0x828b4e=_0x28d800,_0x1752f9=SceneManager[_0x828b4e(0x2e5)];if(!_0x1752f9)return;const _0xee00b4=_0x1752f9[_0x828b4e(0x1d8)];if(!_0xee00b4)return;_0xee00b4[_0x828b4e(0x2a5)]();},VisuMZ[_0x28d800(0x254)][_0x28d800(0x25c)]=Scene_Boot[_0x28d800(0x328)][_0x28d800(0x272)],Scene_Boot[_0x28d800(0x328)]['loadSystemImages']=function(){const _0x2bcb08=_0x28d800;VisuMZ[_0x2bcb08(0x254)]['Scene_Boot_loadSystemImages'][_0x2bcb08(0x30f)](this),this['loadSystemImagesForExtMessageFunc']();},Scene_Boot[_0x28d800(0x328)][_0x28d800(0x2a9)]=function(){const _0x489067=_0x28d800,_0x145a5a=VisuMZ[_0x489067(0x254)][_0x489067(0x22a)][_0x489067(0x332)],_0x153f51=[_0x489067(0x218),_0x489067(0x234),_0x489067(0x1f6)];for(const _0x4f9dbb of _0x153f51){if(_0x489067(0x284)!==_0x489067(0x2f2)){_0x145a5a[_0x4f9dbb]=_0x145a5a[_0x4f9dbb]??'';if(_0x145a5a[_0x4f9dbb]!==''){if('RFRSP'===_0x489067(0x256))ImageManager[_0x489067(0x2cc)](_0x145a5a[_0x4f9dbb]);else return this[_0x489067(0x324)](_0x489067(0x20e)),![];}}else _0x3939f9+=_0xb40826[_0x489067(0x2b6)];}},Scene_Message['EXT_FAST_FORWARD_ENABLED']=VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)][_0x28d800(0x1d9)][_0x28d800(0x2ce)],Scene_Message[_0x28d800(0x21f)]=VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)][_0x28d800(0x1d9)][_0x28d800(0x258)],Scene_Message[_0x28d800(0x2e6)]=VisuMZ['ExtMessageFunc']['Settings']['FastFwd']['SceneChangeReset']??!![],VisuMZ['ExtMessageFunc']['Scene_Message_createAllWindows']=Scene_Message['prototype'][_0x28d800(0x1d3)],Scene_Message['prototype'][_0x28d800(0x1d3)]=function(){const _0xdd115=_0x28d800;VisuMZ[_0xdd115(0x254)][_0xdd115(0x1f5)][_0xdd115(0x30f)](this),Scene_Message['EXT_FAST_FORWARD_STOP_ON_SCENE_CHANGE']&&$gameTemp[_0xdd115(0x28d)](![]);},Scene_Message[_0x28d800(0x328)][_0x28d800(0x246)]=function(){const _0x4f96ad=_0x28d800;if(!Scene_Message['EXT_FAST_FORWARD_ENABLED'])return![];if($gameSystem[_0x4f96ad(0x33d)]())return![];if(this[_0x4f96ad(0x2f4)]())return![];return this['isActivatedExtendedFastForwardMode']();},Scene_Message['prototype'][_0x28d800(0x1bc)]=function(){const _0x357d07=_0x28d800;if(Imported[_0x357d07(0x32c)]&&$gameMap['isFurnitureSystemMode']())return![];if(!this[_0x357d07(0x2f4)]()){if('tKrOd'===_0x357d07(0x1f2)){if(Input[_0x357d07(0x341)](VisuMZ[_0x357d07(0x211)]['Settings'][_0x357d07(0x295)][_0x357d07(0x209)]))return!![];}else this[_0x357d07(0x1e0)]();}return $gameTemp[_0x357d07(0x246)]();},Scene_Message[_0x28d800(0x328)][_0x28d800(0x2f4)]=function(){const _0x4e482c=_0x28d800;if(this[_0x4e482c(0x288)]&&this[_0x4e482c(0x288)][_0x4e482c(0x287)])return!![];if(this[_0x4e482c(0x2b1)]&&this['_numberInputWindow']['active'])return!![];if(this[_0x4e482c(0x24c)]&&this[_0x4e482c(0x24c)][_0x4e482c(0x287)])return!![];return![];},Scene_Message['prototype']['updateExtendedFastForwardCancel']=function(){const _0x21ae22=_0x28d800;if(Input[_0x21ae22(0x276)](_0x21ae22(0x313))||TouchInput[_0x21ae22(0x253)]()){if(_0x21ae22(0x2f0)===_0x21ae22(0x2f0))return $gameTemp[_0x21ae22(0x28d)](![]),!![];else{_0xf6a545[_0x21ae22(0x270)](_0x3d3fe5,_0x56b8a5);const _0x4263cc=_0x129aa2['MsgCursor'];_0x5a4b06[_0x21ae22(0x1fb)](_0x4263cc);const _0x474709=_0xeb1ec6[_0x21ae22(0x2e5)]['_messageWindow'];_0x474709&&(_0x474709[_0x21ae22(0x1e3)](),_0x474709[_0x21ae22(0x23d)]());}}else return![];},VisuMZ['ExtMessageFunc']['Scene_Map_updateMainMultiply']=Scene_Map['prototype'][_0x28d800(0x32f)],Scene_Map[_0x28d800(0x328)][_0x28d800(0x32f)]=function(){const _0x1d0f7a=_0x28d800;if(this[_0x1d0f7a(0x246)]()){if(_0x1d0f7a(0x252)!=='OZxTQ')return this['textColor'](_0x2950a6(_0x2a4319));else this['updateExtendedFastForwardMode']();}else VisuMZ['ExtMessageFunc']['Scene_Map_updateMainMultiply'][_0x1d0f7a(0x30f)](this);},Scene_Map['prototype'][_0x28d800(0x246)]=function(){const _0x522173=_0x28d800;return Scene_Message[_0x522173(0x328)]['isExtendedFastForwardMode']['call'](this)&&$gameMap[_0x522173(0x1af)]();},Scene_Map[_0x28d800(0x328)][_0x28d800(0x1c6)]=function(){const _0x27635a=_0x28d800;let _0x294cff=Scene_Message['EXT_FAST_FORWARD_LOOPS'];while(_0x294cff--&&$gameMap[_0x27635a(0x1af)]()&&!this[_0x27635a(0x2f4)]()){this[_0x27635a(0x240)](),this['updateColorFilter'](),this[_0x27635a(0x34f)](),SceneManager[_0x27635a(0x1c0)]();if(this[_0x27635a(0x262)]())break;}};function Scene_SaveButtonConsole(){const _0x17771a=_0x28d800;this[_0x17771a(0x1ac)](...arguments);}Scene_SaveButtonConsole[_0x28d800(0x328)]=Object['create'](Scene_Save[_0x28d800(0x328)]),Scene_SaveButtonConsole[_0x28d800(0x328)][_0x28d800(0x244)]=Scene_SaveButtonConsole,Scene_SaveButtonConsole[_0x28d800(0x328)][_0x28d800(0x22b)]=function(){const _0x32252d=_0x28d800;this[_0x32252d(0x249)]=0x0;let _0x247888=$gameMap[_0x32252d(0x2c0)];for(;;){if(_0x247888[_0x32252d(0x228)])_0x247888=_0x247888[_0x32252d(0x228)];else{if(_0x32252d(0x23b)===_0x32252d(0x251)){if(!this[_0x32252d(0x24d)]())return;_0x193789['isMessageAutoForwardMode']()&&_0x5d91e7['setMessageAutoForwardMode'](![]),_0x41df1c[_0x32252d(0x246)]()&&_0x1c51e5[_0x32252d(0x28d)](![]);}else{this[_0x32252d(0x249)]=_0x247888['_index'],_0x247888[_0x32252d(0x27b)]=_0x247888['_lastExtMsgFuncIndex'];break;}}}Scene_Save[_0x32252d(0x328)]['onSavefileOk'][_0x32252d(0x30f)](this),_0x247888[_0x32252d(0x27b)]=this[_0x32252d(0x249)];},VisuMZ[_0x28d800(0x254)][_0x28d800(0x1ce)]=Game_Interpreter[_0x28d800(0x328)]['command101'],Game_Interpreter[_0x28d800(0x328)]['command101']=function(_0x2447a8){const _0x5a23a1=_0x28d800;return this[_0x5a23a1(0x2bb)]=this[_0x5a23a1(0x27b)],VisuMZ['ExtMessageFunc'][_0x5a23a1(0x1ce)]['call'](this,_0x2447a8);},VisuMZ['ExtMessageFunc'][_0x28d800(0x2fa)]=Scene_Battle[_0x28d800(0x328)][_0x28d800(0x26d)],Scene_Battle[_0x28d800(0x328)][_0x28d800(0x26d)]=function(){const _0x53778b=_0x28d800;VisuMZ[_0x53778b(0x254)]['Scene_Battle_update'][_0x53778b(0x30f)](this);if(this[_0x53778b(0x246)]())this[_0x53778b(0x1c6)]();},Scene_Battle[_0x28d800(0x328)][_0x28d800(0x246)]=function(){const _0x437003=_0x28d800;return![];return Scene_Message[_0x437003(0x328)][_0x437003(0x246)][_0x437003(0x30f)](this)&&$gameTroop['isEventRunning']()&&!this[_0x437003(0x296)];},Scene_Battle['prototype'][_0x28d800(0x1c6)]=function(){const _0x25cf22=_0x28d800;this['_extFastForwardLooping']=!![];let _0x3ee78c=Scene_Message['EXT_FAST_FORWARD_LOOPS'];while(_0x3ee78c--&&$gameTroop[_0x25cf22(0x1af)]()&&!this[_0x25cf22(0x2f4)]()){if(_0x25cf22(0x268)===_0x25cf22(0x312))this[_0x25cf22(0x219)]();else{this[_0x25cf22(0x26d)](),SceneManager[_0x25cf22(0x1c0)]();if(this[_0x25cf22(0x262)]())break;}}this[_0x25cf22(0x296)]=![];},VisuMZ[_0x28d800(0x254)][_0x28d800(0x279)]=WindowLayer[_0x28d800(0x328)]['update'],WindowLayer[_0x28d800(0x328)][_0x28d800(0x26d)]=function(){const _0x669d40=_0x28d800;if(SceneManager['_scene'][_0x669d40(0x296)])return;VisuMZ[_0x669d40(0x254)][_0x669d40(0x279)][_0x669d40(0x30f)](this);},VisuMZ[_0x28d800(0x254)][_0x28d800(0x1e1)]=Window_Base['prototype'][_0x28d800(0x1cd)],Window_Base['prototype']['flushTextState']=function(_0x2d5121){const _0x1ec36e=_0x28d800;this[_0x1ec36e(0x244)][_0x1ec36e(0x1c9)]===_0x1ec36e(0x1d0)&&this[_0x1ec36e(0x243)](_0x2d5121),VisuMZ[_0x1ec36e(0x254)][_0x1ec36e(0x1e1)][_0x1ec36e(0x30f)](this,_0x2d5121),this[_0x1ec36e(0x244)][_0x1ec36e(0x1c9)]===_0x1ec36e(0x1d0)&&(_0x1ec36e(0x1c8)===_0x1ec36e(0x1c8)?this[_0x1ec36e(0x31a)](_0x2d5121):this[_0x1ec36e(0x1e0)]());},VisuMZ['ExtMessageFunc']['Window_Message_initialize']=Window_Message[_0x28d800(0x328)]['initialize'],Window_Message[_0x28d800(0x328)][_0x28d800(0x1ac)]=function(_0x16a8ab){const _0x9efb3e=_0x28d800;VisuMZ[_0x9efb3e(0x254)][_0x9efb3e(0x2b5)][_0x9efb3e(0x30f)](this,_0x16a8ab),this['createMessageTailSprite']();},VisuMZ[_0x28d800(0x254)][_0x28d800(0x33e)]=Window_Message[_0x28d800(0x328)][_0x28d800(0x26d)],Window_Message['prototype']['update']=function(){const _0x2b0cf6=_0x28d800;VisuMZ[_0x2b0cf6(0x254)][_0x2b0cf6(0x33e)][_0x2b0cf6(0x30f)](this),this[_0x2b0cf6(0x266)](),this['updateMessageTailSprite']();},Window_Message[_0x28d800(0x328)][_0x28d800(0x266)]=function(){const _0x55853c=_0x28d800;if(!this[_0x55853c(0x24d)]())return;if($gameTemp[_0x55853c(0x24e)]()){if('lYbvh'===_0x55853c(0x27a))$gameTemp[_0x55853c(0x305)](![]);else{let _0x4812d8=!_0x169b21['isExtendedFastForwardMode']();_0x1ba19c['setExtendedFastForwardMode'](_0x4812d8),_0x4812d8?this['playOkSound']():_0x540505['playCancel'](),this[_0x55853c(0x1cf)]();}}$gameTemp[_0x55853c(0x246)]()&&$gameTemp['setExtendedFastForwardMode'](![]);},Window_Message['prototype']['meetExtMsgFuncResetRequirements']=function(){const _0x5001d7=_0x28d800;if(SceneManager[_0x5001d7(0x215)]()&&$gameMap&&!$gameMap[_0x5001d7(0x1af)]())return!![];else{if(SceneManager[_0x5001d7(0x2ac)]()&&!$gameMap[_0x5001d7(0x1af)]())return!![];}return![];},VisuMZ[_0x28d800(0x254)][_0x28d800(0x208)]=Window_Message['prototype'][_0x28d800(0x276)],Window_Message[_0x28d800(0x328)][_0x28d800(0x276)]=function(){const _0x1bee88=_0x28d800;if(SceneManager[_0x1bee88(0x2e5)][_0x1bee88(0x246)]()){if(_0x1bee88(0x2e3)!==_0x1bee88(0x2e3))_0x1f1bf6[_0x1bee88(0x315)](_0x12b436[_0x1bee88(0x200)]());else return!![];}else{if(Input[_0x1bee88(0x276)](Window_ButtonConsole[_0x1bee88(0x336)]['auto']))return this[_0x1bee88(0x327)](),![];else{if(Input['isTriggered'](Window_ButtonConsole[_0x1bee88(0x336)][_0x1bee88(0x2e9)]))return this[_0x1bee88(0x324)]('save'),![];else{if(Input['isTriggered'](Window_ButtonConsole[_0x1bee88(0x336)][_0x1bee88(0x233)])){if(_0x1bee88(0x29b)!==_0x1bee88(0x1ea))return this[_0x1bee88(0x324)]('load'),![];else{const _0x2283ca=this[_0x1bee88(0x278)],_0x3f7ccc=_0x36fde0[_0x1bee88(0x2f6)](),_0x995612=_0x3f7ccc['IconIndex'],_0x23401c=_0x240eba[_0x1bee88(0x223)],_0x477a7e=_0x1edb6c[_0x1bee88(0x21e)],_0x3d3666=_0x995612%0x10*_0x23401c,_0x3b23e3=_0x4f2ba4['floor'](_0x995612/0x10)*_0x477a7e;_0x2283ca[_0x1bee88(0x1b6)](_0x3d3666,_0x3b23e3,_0x23401c,_0x477a7e),_0x2283ca[_0x1bee88(0x347)]=this['isOpen']();if(_0x3f7ccc[_0x1bee88(0x2f5)]===0x0)return;_0x2283ca[_0x1bee88(0x338)]['x']=_0xec02e1[_0x1bee88(0x202)](_0x123fc5[_0x1bee88(0x2ad)]*_0x3f7ccc['FlipMultiplier']);}}else{if(Input['isTriggered'](Window_ButtonConsole[_0x1bee88(0x336)]['options']))return this[_0x1bee88(0x324)](_0x1bee88(0x2da)),![];else{if(Input[_0x1bee88(0x276)](Window_ButtonConsole[_0x1bee88(0x336)][_0x1bee88(0x20e)]))return _0x1bee88(0x210)!==_0x1bee88(0x210)?(this[_0x1bee88(0x1f9)]=this[_0x1bee88(0x1f9)]||0x0,_0x56db8e[_0x1bee88(0x254)][_0x1bee88(0x208)][_0x1bee88(0x30f)](this)?(_0x49368b[_0x1bee88(0x1d1)](),_0x5d01d4[_0x1bee88(0x305)](![]),!![]):this[_0x1bee88(0x1f9)]--<=0x0):(this[_0x1bee88(0x324)](_0x1bee88(0x20e)),![]);else return this[_0x1bee88(0x22d)]&&$gameTemp[_0x1bee88(0x24e)]()?this[_0x1bee88(0x25f)]():VisuMZ[_0x1bee88(0x254)]['Window_Message_isTriggered'][_0x1bee88(0x30f)](this);}}}}}},VisuMZ[_0x28d800(0x254)][_0x28d800(0x261)]=Window_Message['prototype'][_0x28d800(0x2dc)],Window_Message[_0x28d800(0x328)]['newPage']=function(_0x2f1bbe){const _0x4d5d68=_0x28d800;this[_0x4d5d68(0x2ed)](_0x2f1bbe),this['resetMessageTailSettings'](),this[_0x4d5d68(0x1ad)](_0x2f1bbe),VisuMZ[_0x4d5d68(0x254)]['Window_Message_newPage']['call'](this,_0x2f1bbe),this[_0x4d5d68(0x1f9)]=0x0;},Window_Message[_0x28d800(0x328)][_0x28d800(0x20a)]=function(){const _0x5eb181=_0x28d800,_0xe36a53=$gameMessage[_0x5eb181(0x23c)](),_0x3a29b1=$gameMessage[_0x5eb181(0x343)](),_0x6860d1=$gameMessage[_0x5eb181(0x291)]();let _0x22879b=ImageManager[_0x5eb181(0x226)],_0x3e142c=this[_0x5eb181(0x326)],_0x45c8b0=_0x6860d1?this[_0x5eb181(0x1d7)]-_0x22879b-0x4:0x4,_0x523a95=0x0;_0x3e142c-=this[_0x5eb181(0x2a4)](),this['drawFace'](_0xe36a53,_0x3a29b1,_0x45c8b0,_0x523a95,_0x22879b,_0x3e142c);},Window_Message[_0x28d800(0x205)]=VisuMZ['ExtMessageFunc'][_0x28d800(0x22a)][_0x28d800(0x27c)][_0x28d800(0x2d6)],Window_Message[_0x28d800(0x2c8)]=VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)][_0x28d800(0x27c)][_0x28d800(0x26b)],Window_Message['prototype'][_0x28d800(0x243)]=function(_0x2d7ec7){const _0x18d1d5=_0x28d800;this[_0x18d1d5(0x1f9)]=this[_0x18d1d5(0x1f9)]||0x0,this['_autoForwardCount']=Math[_0x18d1d5(0x29d)](this[_0x18d1d5(0x1f9)],0x0);const _0x57a904=(_0x2d7ec7[_0x18d1d5(0x250)]||'')[_0x18d1d5(0x2df)];this[_0x18d1d5(0x1f9)]+=_0x57a904*Window_Message['AUTO_FORWARD_DELAY_PER_CHAR'];},Window_Message[_0x28d800(0x328)][_0x28d800(0x327)]=function(){const _0x592ea6=_0x28d800;if(this[_0x592ea6(0x299)])return;if(!$gameSystem[_0x592ea6(0x245)]())return;let _0x2cf419=!$gameTemp[_0x592ea6(0x24e)]();$gameTemp[_0x592ea6(0x305)](_0x2cf419);if(_0x2cf419){if(_0x592ea6(0x1f7)!=='UoRnJ')return _0x4eaa0a['isTriggered'](_0x592ea6(0x313))||_0x22edca[_0x592ea6(0x253)]()?(_0x5c2fce[_0x592ea6(0x28d)](![]),!![]):![];else this['playOkSound']();}else _0x592ea6(0x331)===_0x592ea6(0x331)?SoundManager[_0x592ea6(0x1d1)]():this[_0x592ea6(0x27f)]();},Window_Message[_0x28d800(0x328)]['autoForwardTriggered']=function(){const _0x33e64a=_0x28d800;return this[_0x33e64a(0x1f9)]=this[_0x33e64a(0x1f9)]||0x0,VisuMZ['ExtMessageFunc']['Window_Message_isTriggered'][_0x33e64a(0x30f)](this)?(SoundManager[_0x33e64a(0x1d1)](),$gameTemp[_0x33e64a(0x305)](![]),!![]):this[_0x33e64a(0x1f9)]--<=0x0;},VisuMZ[_0x28d800(0x254)]['Window_Message_startPause']=Window_Message[_0x28d800(0x328)][_0x28d800(0x28c)],Window_Message[_0x28d800(0x328)][_0x28d800(0x28c)]=function(){const _0x14758e=_0x28d800;VisuMZ[_0x14758e(0x254)][_0x14758e(0x21b)][_0x14758e(0x30f)](this),this[_0x14758e(0x1f9)]=this[_0x14758e(0x1f9)]||0x0,this['_autoForwardCount']=Math[_0x14758e(0x29d)](this[_0x14758e(0x1f9)],Window_Message[_0x14758e(0x2c8)]);},VisuMZ['ExtMessageFunc']['Window_Message_initMembers']=Window_Message[_0x28d800(0x328)][_0x28d800(0x2c2)],Window_Message[_0x28d800(0x328)][_0x28d800(0x2c2)]=function(){const _0x2238fc=_0x28d800;VisuMZ[_0x2238fc(0x254)]['Window_Message_initMembers'][_0x2238fc(0x30f)](this),this[_0x2238fc(0x307)]();},Window_Message[_0x28d800(0x328)][_0x28d800(0x2ed)]=function(_0x3193ab){const _0x17ed7b=_0x28d800;let _0x523a93=_0x3193ab[_0x17ed7b(0x1fa)];this[_0x17ed7b(0x299)]=![],_0x523a93=_0x523a93[_0x17ed7b(0x2d9)](/<HIDE (?:BUTTON CONSOLE|CONSOLE|BUTTONS)>/gi,()=>{return this['_hideButtonConsole']=!![],'';}),this[_0x17ed7b(0x298)](_0x523a93)&&(this[_0x17ed7b(0x299)]=!![]),_0x3193ab[_0x17ed7b(0x1fa)]=_0x523a93;};if(!Window_Message['prototype'][_0x28d800(0x2a4)]){let text='';text+=_0x28d800(0x1ef),text+=_0x28d800(0x22e),text+='the\x20VisuMZ_2_ExtMessageFunc\x20plugin.',alert(text),SceneManager[_0x28d800(0x340)]();}Window_Message['prototype'][_0x28d800(0x298)]=function(_0x24e939){const _0x425101=_0x28d800;if(!VisuMZ['ExtMessageFunc'][_0x425101(0x22a)]['MsgButtonConsole'][_0x425101(0x280)])return![];if(_0x24e939[_0x425101(0x26c)](Window_Message[_0x425101(0x293)]))return!![];if(_0x24e939[_0x425101(0x26c)](Window_Message['_autoPosRegExp']))return!![];return![];},VisuMZ[_0x28d800(0x254)]['Window_Message_addedHeight']=Window_Message[_0x28d800(0x328)][_0x28d800(0x2a4)],Window_Message['prototype'][_0x28d800(0x2a4)]=function(){const _0x42dd01=_0x28d800;let _0xaaae0b=VisuMZ[_0x42dd01(0x254)][_0x42dd01(0x230)][_0x42dd01(0x30f)](this);if(this['_hideButtonConsole'])return _0xaaae0b;return SceneManager['isSceneMap']()&&$gameSystem['isMessageButtonConsoleVisible']()&&([_0x42dd01(0x1aa),_0x42dd01(0x1bb)][_0x42dd01(0x2eb)](Window_ButtonConsole[_0x42dd01(0x317)]['toLowerCase']()[_0x42dd01(0x2e1)]())&&('OEfEt'===_0x42dd01(0x304)?(_0x2b37ee[_0x42dd01(0x328)][_0x42dd01(0x1b4)][_0x42dd01(0x30f)](this),this[_0x42dd01(0x1ff)]['fontFace']=_0x5456a3['FONT_FACE'],this[_0x42dd01(0x1ff)]['fontSize']=_0x3df944['FONT_SIZE']):_0xaaae0b+=Window_ButtonConsole[_0x42dd01(0x2f8)])),_0xaaae0b;},VisuMZ['ExtMessageFunc']['Window_Message_updateDimensions']=Window_Message['prototype']['updateDimensions'],Window_Message['prototype'][_0x28d800(0x1f4)]=function(){const _0x2077d9=_0x28d800;VisuMZ[_0x2077d9(0x254)][_0x2077d9(0x1d2)][_0x2077d9(0x30f)](this),this[_0x2077d9(0x30a)](),this[_0x2077d9(0x2a5)]();},Window_Message[_0x28d800(0x328)]['showButtonConsole']=function(){const _0x4a9624=_0x28d800;if(!SceneManager[_0x4a9624(0x215)]())return;for(const _0x2052d5 of this['_buttonConsoleButtons']){if(_0x4a9624(0x2c9)===_0x4a9624(0x2c9)){if(!this[_0x4a9624(0x299)]&&$gameSystem[_0x4a9624(0x245)]())_0x2052d5['show']();else{if('lOmHU'===_0x4a9624(0x2af))_0x2052d5[_0x4a9624(0x303)]();else{if(!_0x144122[_0x4a9624(0x215)]())return;for(const _0x598546 of this[_0x4a9624(0x257)]){!this[_0x4a9624(0x299)]&&_0x52e3b6[_0x4a9624(0x245)]()?_0x598546['show']():_0x598546['hide']();}this[_0x4a9624(0x2e7)]();}}}else _0x2c752a['loadSystem'](_0x412986[_0x3766f5]);}this[_0x4a9624(0x2e7)]();},Window_Message[_0x28d800(0x328)]['refreshButtonConsole']=function(){const _0x239eef=_0x28d800;for(const _0x21c576 of this[_0x239eef(0x257)]){_0x21c576[_0x239eef(0x1cf)]();}},Window_Message[_0x28d800(0x328)]['createButtonConsole']=function(){const _0x5735cb=_0x28d800;this[_0x5735cb(0x257)]=[];for(const _0x2757ae of Window_ButtonConsole[_0x5735cb(0x24a)]){this[_0x5735cb(0x2c1)](_0x2757ae);}this['alignButtonConsoleButtons']();},Window_Message[_0x28d800(0x328)]['addButtonConsoleObject']=function(_0x97ce7f){const _0x4558fb=_0x28d800;_0x97ce7f=_0x97ce7f[_0x4558fb(0x1bf)]()[_0x4558fb(0x2e1)]();switch(_0x97ce7f){case _0x4558fb(0x1cc):if(!Scene_Message['EXT_FAST_FORWARD_ENABLED'])return;break;case'options':if(!Imported[_0x4558fb(0x2cb)])return;break;case _0x4558fb(0x2e9):case _0x4558fb(0x233):if(!Imported[_0x4558fb(0x220)])return;break;case _0x4558fb(0x303):if(!Imported['VisuMZ_4_MessageVisibility'])return;break;case'backlog':case _0x4558fb(0x241):if(!Imported[_0x4558fb(0x25a)])return;break;}const _0x59ad7b=new Window_ButtonConsole(_0x97ce7f,this);this['_buttonConsoleButtons']['push'](_0x59ad7b),this[_0x4558fb(0x1ae)](_0x59ad7b);},Window_Message[_0x28d800(0x328)][_0x28d800(0x2e7)]=function(){const _0x403251=_0x28d800,_0x213c59=Window_ButtonConsole[_0x403251(0x317)][_0x403251(0x1bf)]()[_0x403251(0x2e1)](),_0x11cf6e=this[_0x403251(0x257)];this[_0x403251(0x20b)]['x']=this[_0x403251(0x20b)]['y']=0x0;if(['top',_0x403251(0x1bb)][_0x403251(0x2eb)](_0x213c59)){let _0x21e987=_0x11cf6e['length']*Window_ButtonConsole['BUTTON_WIDTH'];_0x21e987+=(_0x11cf6e[_0x403251(0x2df)]-0x1)*Window_ButtonConsole[_0x403251(0x235)];let _0x477e8b=Math[_0x403251(0x1c5)]((this[_0x403251(0x1e8)]-_0x21e987)/0x2),_0x50b713=_0x477e8b;for(const _0x4f602f of _0x11cf6e){_0x4f602f['x']=_0x50b713,_0x50b713+=Window_ButtonConsole['BUTTON_WIDTH']+Window_ButtonConsole['BUTTON_BUFFER'];}}if(_0x213c59===_0x403251(0x1aa)){let _0x5a8e3f=Window_ButtonConsole[_0x403251(0x235)];for(const _0x3ee1ee of _0x11cf6e){_0x3ee1ee['y']=_0x5a8e3f;}_0x5a8e3f=Window_ButtonConsole[_0x403251(0x2f8)],this[_0x403251(0x20b)]['y']=_0x5a8e3f;};if(_0x213c59==='bottom'){if('KzdxE'!==_0x403251(0x1c3))return this[_0x403251(0x327)](),![];else{let _0x2ce4b2=this['height']-Window_ButtonConsole[_0x403251(0x2f8)];_0x2ce4b2-=Window_ButtonConsole[_0x403251(0x235)];for(const _0x368e53 of _0x11cf6e){_0x368e53['y']=_0x2ce4b2;}}}},Window_Message[_0x28d800(0x328)][_0x28d800(0x324)]=function(_0x28e81b){const _0x521da5=_0x28d800;if(this[_0x521da5(0x299)])return;if(!$gameSystem['isMessageButtonConsoleVisible']())return;_0x28e81b=_0x28e81b[_0x521da5(0x1bf)]()['trim']();switch(_0x28e81b){case _0x521da5(0x2e9):$gameSystem['isSaveEnabled']()&&SceneManager[_0x521da5(0x215)]()?(this[_0x521da5(0x1e0)](),SceneManager[_0x521da5(0x281)](Scene_SaveButtonConsole)):this[_0x521da5(0x27f)]();break;case _0x521da5(0x233):DataManager[_0x521da5(0x2ef)]()&&SceneManager['isSceneMap']()?'ORpzc'!==_0x521da5(0x2d4)?(_0x522ee4[_0x521da5(0x254)][_0x521da5(0x264)][_0x521da5(0x30f)](this),this[_0x521da5(0x204)](),this[_0x521da5(0x345)](),this[_0x521da5(0x219)]()):(this[_0x521da5(0x1e0)](),SceneManager[_0x521da5(0x281)](Scene_Load)):this['playBuzzerSound']();break;case _0x521da5(0x2da):SceneManager[_0x521da5(0x215)]()?_0x521da5(0x325)!==_0x521da5(0x1ba)?(this[_0x521da5(0x1e0)](),SceneManager[_0x521da5(0x281)](Scene_Options)):(_0x3dd791[_0x521da5(0x1e3)](),_0x437700['_refreshPauseSign']()):this[_0x521da5(0x27f)]();break;case _0x521da5(0x20e):SceneManager[_0x521da5(0x215)]()?_0x521da5(0x24b)===_0x521da5(0x24b)?(this[_0x521da5(0x1e0)](),SceneManager['push'](Scene_GameEnd)):(_0x2d2d8d[_0x521da5(0x1fa)]=this['convertVariableEscapeCharacters'](_0xf67682[_0x521da5(0x1fa)]),_0x52459[_0x521da5(0x1fa)]=this['convertMessageTailEscapeCodes'](_0x4cb5b8[_0x521da5(0x1fa)])):this[_0x521da5(0x27f)]();break;}},VisuMZ['ExtMessageFunc'][_0x28d800(0x2ca)]=Window_Message['prototype'][_0x28d800(0x31b)],Window_Message[_0x28d800(0x328)][_0x28d800(0x31b)]=function(_0x477066){const _0xd9b165=_0x28d800;if(SceneManager[_0xd9b165(0x2e5)][_0xd9b165(0x246)]()){if(_0xd9b165(0x1a9)!==_0xd9b165(0x1a9)){if(!_0x17e298)return;if(!_0x17afce[_0xd9b165(0x2b3)])return;if(!this[_0xd9b165(0x30c)]())return;const _0xa0c1fb=this[_0xd9b165(0x278)];if(!_0xa0c1fb)return;const _0x3fa6b3=_0x462305[_0xd9b165(0x2f6)]();_0xa0c1fb['x']=_0x5c4640['x']+this[_0xd9b165(0x2e2)]+_0x3fa6b3['OffsetX']+_0xa0c1fb[_0xd9b165(0x1e8)]/0x2,_0xa0c1fb['x']+=this[_0xd9b165(0x20b)]['x'],_0xa0c1fb['y']=_0x2e0756['y']+this[_0xd9b165(0x2e2)]+_0x444c4c[_0xd9b165(0x1ee)]+_0x3fa6b3[_0xd9b165(0x31c)],_0xa0c1fb['y']+=this['_contentsSprite']['y'],_0xa0c1fb['x']=_0x579da6[_0xd9b165(0x319)](_0xa0c1fb['x']['clamp'](this[_0xd9b165(0x2e2)],this['width'])),_0xa0c1fb['y']=_0x59f1a7[_0xd9b165(0x319)](_0xa0c1fb['y'][_0xd9b165(0x2e0)](this['padding'],this[_0xd9b165(0x1ee)]-this['padding']));}else return;}VisuMZ[_0xd9b165(0x254)][_0xd9b165(0x2ca)]['call'](this,_0x477066);},Window_Message[_0x28d800(0x328)][_0x28d800(0x30c)]=function(){const _0x4bcb61=_0x28d800,_0x3b3dea=$gameSystem[_0x4bcb61(0x2f6)]();return _0x3b3dea[_0x4bcb61(0x2ce)];},Window_Message[_0x28d800(0x328)][_0x28d800(0x1e3)]=function(){const _0x5869e6=_0x28d800;if(this[_0x5869e6(0x30c)]()){if('iCKkH'===_0x5869e6(0x1d4))this['removeExistingPauseSignSprites'](),this[_0x5869e6(0x231)]();else return _0x36a4dd[_0x5869e6(0x28f)];}else{if('huSec'!=='sWIfI')Window_Base[_0x5869e6(0x328)][_0x5869e6(0x1e3)][_0x5869e6(0x30f)](this);else{if(_0x276f17[_0x5d348a]!==''){const _0x5bfb53=_0x5a2e22[_0x5869e6(0x2cc)](_0x5d1f26[_0x1ee601]);this[_0x5869e6(0x1b3)][_0x4af7dc]=new _0x4a343f(_0x5bfb53);const _0x36744a=this[_0x5869e6(0x1b3)][_0x4d8da2];this[_0x5869e6(0x23f)](_0x36744a),_0x36744a['x']=_0x1fcff7['%1OffsetX'[_0x5869e6(0x247)](_0xbca5b9)]||0x0,_0x36744a['y']=_0x1e04eb['%1OffsetY'[_0x5869e6(0x247)](_0x5bcd0b)]||0x0;}}}},Window_Message[_0x28d800(0x328)][_0x28d800(0x207)]=function(){const _0x401c41=_0x28d800;if(!this['_pauseSignSprite'])return;this[_0x401c41(0x2de)](this[_0x401c41(0x278)]);},Window_Message[_0x28d800(0x328)][_0x28d800(0x231)]=function(){const _0x26b84b=_0x28d800,_0x27863b=$gameSystem['getMessageCursorSettings']();this[_0x26b84b(0x278)]=new Sprite(),this['addChild'](this[_0x26b84b(0x278)]),this[_0x26b84b(0x278)][_0x26b84b(0x277)]['x']=_0x27863b[_0x26b84b(0x2b0)],this[_0x26b84b(0x278)][_0x26b84b(0x277)]['y']=_0x27863b[_0x26b84b(0x31d)],this[_0x26b84b(0x274)]=0x0;},Window_Message[_0x28d800(0x328)][_0x28d800(0x23d)]=function(){const _0x21abc3=_0x28d800;if(this['isCustomMessageCursorEnabled']())this[_0x21abc3(0x320)]();else{if('cCxpN'===_0x21abc3(0x2ee)){if(this[_0x21abc3(0x2c3)]===_0x134232){const _0x24d89e=_0x4d8aed[_0x21abc3(0x254)][_0x21abc3(0x22a)][_0x21abc3(0x2ea)];this[_0x21abc3(0x2c3)]=_0x3457d1[_0x21abc3(0x30b)](_0x24d89e);}return this['_messageTailSettings'];}else Window_Base[_0x21abc3(0x328)][_0x21abc3(0x23d)][_0x21abc3(0x30f)](this),this[_0x21abc3(0x26a)]();}},Window_Message[_0x28d800(0x328)]['refreshCustomMessageCursorPauseSign']=function(){const _0x53250d=_0x28d800,_0x5dc6a5=this[_0x53250d(0x278)];if(!_0x5dc6a5)return;const _0x5156ff=$gameSystem[_0x53250d(0x2f6)](),_0x17141f=_0x5156ff[_0x53250d(0x334)][_0x53250d(0x1bf)]()['trim']();if(_0x17141f===_0x53250d(0x255))_0x53250d(0x321)!==_0x53250d(0x321)?_0x11657d['y']=0x0:_0x5dc6a5['bitmap']=ImageManager['loadSystem'](_0x5156ff[_0x53250d(0x337)]);else{if(_0x17141f===_0x53250d(0x2a0)){const _0x56c8b7=0x90,_0x41da74=0x60,_0x213bef=0x18;_0x5dc6a5[_0x53250d(0x27e)]=this[_0x53250d(0x2d5)],_0x5dc6a5['setFrame'](_0x56c8b7,_0x41da74,_0x213bef,_0x213bef);}else _0x5dc6a5[_0x53250d(0x27e)]=ImageManager[_0x53250d(0x2cc)]('IconSet');}},Window_Message[_0x28d800(0x328)][_0x28d800(0x26a)]=function(){const _0x53b55c=_0x28d800,_0x34fba3=this[_0x53b55c(0x278)];if(!_0x34fba3)return;if(!$gameSystem[_0x53b55c(0x245)]())return;if(this[_0x53b55c(0x23e)])return;_0x34fba3['y']-=Window_ButtonConsole[_0x53b55c(0x2f8)];},Window_Message[_0x28d800(0x328)]['_updatePauseSign']=function(){const _0x467338=_0x28d800;if(this['isCustomMessageCursorEnabled']()){if('USMLW'!=='USMLW'){this[_0x467338(0x1f9)]=this[_0x467338(0x1f9)]||0x0,this[_0x467338(0x1f9)]=_0x20c4ba[_0x467338(0x29d)](this[_0x467338(0x1f9)],0x0);const _0x25501c=(_0x341029[_0x467338(0x250)]||'')[_0x467338(0x2df)];this[_0x467338(0x1f9)]+=_0x25501c*_0x40ba15[_0x467338(0x205)];}else this[_0x467338(0x1f3)]();}else Window_Base[_0x467338(0x328)][_0x467338(0x1fc)][_0x467338(0x30f)](this);},Window_Message[_0x28d800(0x328)][_0x28d800(0x1f3)]=function(){const _0x2818fb=_0x28d800;if(this[_0x2818fb(0x2c6)]===Graphics[_0x2818fb(0x2ad)])return;this[_0x2818fb(0x2c6)]=Graphics[_0x2818fb(0x2ad)];const _0xf11e94=this[_0x2818fb(0x278)];if(!_0xf11e94)return;const _0x28e6b7=_0xf11e94['bitmap'];if(_0x28e6b7[_0x2818fb(0x1e8)]<=0x0)return;const _0x43e572=$gameSystem[_0x2818fb(0x2f6)](),_0x5e7f0e=_0x43e572[_0x2818fb(0x334)][_0x2818fb(0x1bf)]()[_0x2818fb(0x2e1)](),_0x548a43=this['isAnySubWindowActive']()||this['isClosing']();_0xf11e94[_0x2818fb(0x229)]=_0x548a43?0x0:0x1;if(_0xf11e94[_0x2818fb(0x229)]<=0x0)return;const _0x242c94=_0x43e572['Rows']*_0x43e572[_0x2818fb(0x216)];this[_0x2818fb(0x274)]++;while(this['_pauseSignAnimationCount']>=_0x242c94*_0x43e572[_0x2818fb(0x217)]){if('KeixE'!==_0x2818fb(0x29f))this[_0x2818fb(0x274)]-=_0x242c94*_0x43e572[_0x2818fb(0x217)];else return _0xcf1091['TEXT_COLOR_DISABLED'];}if(_0x5e7f0e===_0x2818fb(0x255))this[_0x2818fb(0x1e2)]();else _0x5e7f0e===_0x2818fb(0x2a0)?Window_Base[_0x2818fb(0x328)][_0x2818fb(0x1fc)][_0x2818fb(0x30f)](this):this[_0x2818fb(0x2cf)]();},Window_Message['prototype'][_0x28d800(0x1e2)]=function(){const _0x2ae109=_0x28d800,_0xc27dda=this[_0x2ae109(0x278)],_0x583e16=_0xc27dda['bitmap'],_0xe25899=$gameSystem[_0x2ae109(0x2f6)](),_0x5531e8=Math[_0x2ae109(0x1c5)](this[_0x2ae109(0x274)]/_0xe25899[_0x2ae109(0x217)]),_0x28a9ae=Math[_0x2ae109(0x1c5)](_0x583e16[_0x2ae109(0x1e8)]/_0xe25899['Cols']),_0x1277e4=Math[_0x2ae109(0x1c5)](_0x583e16[_0x2ae109(0x1ee)]/_0xe25899['Rows']),_0x4e2725=_0x5531e8%_0xe25899[_0x2ae109(0x216)]*_0x28a9ae,_0x4d28b7=Math[_0x2ae109(0x1c5)](_0x5531e8/_0xe25899[_0x2ae109(0x216)])*_0x1277e4;_0xc27dda['setFrame'](_0x4e2725,_0x4d28b7,_0x28a9ae,_0x1277e4),_0xc27dda['visible']=this[_0x2ae109(0x329)]();},Window_Message[_0x28d800(0x328)][_0x28d800(0x2cf)]=function(){const _0x2277da=_0x28d800,_0x31d9ed=this[_0x2277da(0x278)],_0x35ae0c=$gameSystem[_0x2277da(0x2f6)](),_0x846778=_0x35ae0c[_0x2277da(0x30e)],_0x391def=ImageManager['iconWidth'],_0x3a95fc=ImageManager[_0x2277da(0x21e)],_0x2c05e4=_0x846778%0x10*_0x391def,_0x3f0cd=Math['floor'](_0x846778/0x10)*_0x3a95fc;_0x31d9ed['setFrame'](_0x2c05e4,_0x3f0cd,_0x391def,_0x3a95fc),_0x31d9ed['visible']=this[_0x2277da(0x329)]();if(_0x35ae0c[_0x2277da(0x2f5)]===0x0)return;_0x31d9ed[_0x2277da(0x338)]['x']=Math['cos'](Graphics[_0x2277da(0x2ad)]*_0x35ae0c[_0x2277da(0x2f5)]);},Window_Message['EXT_CURSOR_FOLLOW_TEXT']=VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)]['MsgCursor']['FollowText']??!![],Window_Message[_0x28d800(0x328)]['moveCustomMessageCursorPauseSign']=function(_0x24f430){const _0x2d06f2=_0x28d800;if(!_0x24f430)return;if(!_0x24f430[_0x2d06f2(0x2b3)])return;if(!this[_0x2d06f2(0x30c)]())return;const _0x2b4fc5=this[_0x2d06f2(0x278)];if(!_0x2b4fc5)return;const _0x3def1f=$gameSystem[_0x2d06f2(0x2f6)]();_0x2b4fc5['x']=_0x24f430['x']+this[_0x2d06f2(0x2e2)]+_0x3def1f[_0x2d06f2(0x2c7)]+_0x2b4fc5['width']/0x2,_0x2b4fc5['x']+=this[_0x2d06f2(0x20b)]['x'],_0x2b4fc5['y']=_0x24f430['y']+this['padding']+_0x24f430['height']+_0x3def1f[_0x2d06f2(0x31c)],_0x2b4fc5['y']+=this['_contentsSprite']['y'],_0x2b4fc5['x']=Math[_0x2d06f2(0x319)](_0x2b4fc5['x'][_0x2d06f2(0x2e0)](this['padding'],this[_0x2d06f2(0x1e8)])),_0x2b4fc5['y']=Math['round'](_0x2b4fc5['y'][_0x2d06f2(0x2e0)](this[_0x2d06f2(0x2e2)],this[_0x2d06f2(0x1ee)]-this[_0x2d06f2(0x2e2)]));},Window_Message[_0x28d800(0x328)][_0x28d800(0x2f3)]=function(){const _0xdf0946=_0x28d800;this['_messageTailSprite']=new Sprite(),this[_0xdf0946(0x33c)][_0xdf0946(0x347)]=![],this['addChild'](this[_0xdf0946(0x33c)]);},Window_Message[_0x28d800(0x328)][_0x28d800(0x28e)]=function(){const _0x32b591=_0x28d800;this[_0x32b591(0x294)]={'visible':![],'lastFile':'','location':_0x32b591(0x1bb),'direction':_0x32b591(0x2e4),'positionX':_0x32b591(0x2d7)};},Window_Message['prototype'][_0x28d800(0x1ad)]=function(_0x54f644){const _0x182a5d=_0x28d800;_0x54f644['text']=this['convertVariableEscapeCharacters'](_0x54f644[_0x182a5d(0x1fa)]),_0x54f644[_0x182a5d(0x1fa)]=this[_0x182a5d(0x1b7)](_0x54f644['text']);},Window_Message[_0x28d800(0x328)][_0x28d800(0x1b7)]=function(_0x3b057e){const _0x332a1f=_0x28d800;return _0x3b057e=_0x3b057e[_0x332a1f(0x2d9)](/<TAIL (?:BL|BOTTOM LEFT|DL|DOWN LEFT):[ ](\d+)>/gi,(_0x3fb292,_0x55f73d)=>{const _0xec28aa=_0x332a1f;return this[_0xec28aa(0x2fb)](!![],!![],_0x55f73d),'';}),_0x3b057e=_0x3b057e[_0x332a1f(0x2d9)](/<TAIL (?:BR|BOTTOM RIGHT|DL|DOWN RIGHT):[ ](\d+)>/gi,(_0x1be7dd,_0x88c3e8)=>{return this['setupMessageTailSettings'](!![],![],_0x88c3e8),'';}),_0x3b057e=_0x3b057e[_0x332a1f(0x2d9)](/<TAIL (?:UL|UPPER LEFT|UP LEFT):[ ](\d+)>/gi,(_0x335c57,_0x475b82)=>{const _0x3c0e38=_0x332a1f;if('PZwai'===_0x3c0e38(0x225))return this[_0x3c0e38(0x2fb)](![],!![],_0x475b82),'';else{if(!this[_0x3c0e38(0x294)])this[_0x3c0e38(0x28e)]();this[_0x3c0e38(0x294)][_0x3c0e38(0x347)]=!![],this[_0x3c0e38(0x294)][_0x3c0e38(0x348)]=_0x5ee38f?'bottom':_0x3c0e38(0x1c7),this[_0x3c0e38(0x294)][_0x3c0e38(0x25e)]=_0x4c3801?_0x3c0e38(0x2e4):_0x3c0e38(0x238),this['_messageTail'][_0x3c0e38(0x23a)]=_0x2d03ab(_0x154ef0);}}),_0x3b057e=_0x3b057e['replace'](/<TAIL (?:UR|UPPER RIGHT|UP RIGHT):[ ](\d+)>/gi,(_0x35a2e7,_0x3b51d6)=>{const _0x2553f1=_0x332a1f;return this[_0x2553f1(0x2fb)](![],![],_0x3b51d6),'';}),_0x3b057e;},Window_Message[_0x28d800(0x328)][_0x28d800(0x2fb)]=function(_0x42f577,_0x1c1452,_0x3cd537){const _0x543583=_0x28d800;if(!this[_0x543583(0x294)])this[_0x543583(0x28e)]();this[_0x543583(0x294)][_0x543583(0x347)]=!![],this[_0x543583(0x294)]['location']=_0x42f577?'bottom':_0x543583(0x1c7),this[_0x543583(0x294)][_0x543583(0x25e)]=_0x1c1452?_0x543583(0x2e4):'right',this['_messageTail'][_0x543583(0x23a)]=Number(_0x3cd537);},VisuMZ['ExtMessageFunc'][_0x28d800(0x275)]=Window_Message[_0x28d800(0x328)][_0x28d800(0x2ae)],Window_Message['prototype']['updateAutoPosition']=function(){const _0x4c9923=_0x28d800;VisuMZ[_0x4c9923(0x254)][_0x4c9923(0x275)][_0x4c9923(0x30f)](this);if(!this['_autoPositionTarget'])return;if(!this[_0x4c9923(0x33c)])return;if(!this[_0x4c9923(0x294)])return;if(this['usesAutoPositionMessageTail']()){const _0x116ef8=$gameSystem[_0x4c9923(0x2d2)](),_0x1f383f=_0x116ef8['autoPositionLeft']?_0x4c9923(0x2e4):'right';this[_0x4c9923(0x294)][_0x4c9923(0x347)]=!![],this[_0x4c9923(0x294)][_0x4c9923(0x286)]='',this[_0x4c9923(0x294)][_0x4c9923(0x348)]=_0x4c9923(0x1bb),this[_0x4c9923(0x294)][_0x4c9923(0x25e)]=_0x1f383f,this[_0x4c9923(0x294)][_0x4c9923(0x23a)]=_0x4c9923(0x2d7);}},Window_Message[_0x28d800(0x328)][_0x28d800(0x1c1)]=function(){const _0x4ba0ea=_0x28d800,_0x363028=$gameSystem[_0x4ba0ea(0x2d2)]();if(!_0x363028)return![];if(!_0x363028[_0x4ba0ea(0x2fd)])return![];const _0x492639=_0x363028[_0x4ba0ea(0x20c)]?_0x4ba0ea(0x269):'Right',_0x547137=_0x4ba0ea(0x1dd)['format'](_0x492639),_0x1fcf74=_0x363028[_0x547137]||'';return _0x1fcf74['trim']()!=='';},VisuMZ['ExtMessageFunc']['Window_Message_autoPositionOffsetX']=Window_Message['prototype'][_0x28d800(0x1b2)],Window_Message['prototype']['autoPositionOffsetX']=function(){const _0x52dbab=_0x28d800;let _0x14cb58=VisuMZ[_0x52dbab(0x254)]['Window_Message_autoPositionOffsetX'][_0x52dbab(0x30f)](this);const _0x4c6a9f=$gameSystem[_0x52dbab(0x2d2)]();return _0x4c6a9f&&_0x4c6a9f[_0x52dbab(0x2fd)]&&(_0x14cb58+=_0x4c6a9f[_0x52dbab(0x1b2)]),_0x14cb58;},VisuMZ['ExtMessageFunc'][_0x28d800(0x227)]=Window_Message[_0x28d800(0x328)][_0x28d800(0x2b6)],Window_Message[_0x28d800(0x328)]['autoPositionOffsetY']=function(){const _0x411b4c=_0x28d800;let _0x431dc6=VisuMZ[_0x411b4c(0x254)][_0x411b4c(0x227)][_0x411b4c(0x30f)](this);const _0x130b21=$gameSystem[_0x411b4c(0x2d2)]();return _0x130b21&&_0x130b21[_0x411b4c(0x2fd)]&&(_0x411b4c(0x2a7)===_0x411b4c(0x32a)?(_0x1cea36[_0x411b4c(0x254)]['SceneManager_push']['call'](this,_0x25e07c),[_0x15415f,_0x5e6218,_0xe5861b][_0x411b4c(0x2eb)](_0x160099)&&this[_0x411b4c(0x316)]()):_0x431dc6+=_0x130b21[_0x411b4c(0x2b6)]),_0x431dc6;},Window_Message['prototype'][_0x28d800(0x1e5)]=function(){const _0x5def60=_0x28d800;if(!this[_0x5def60(0x33c)])return;if(!this[_0x5def60(0x294)])return;this[_0x5def60(0x1ca)](),this[_0x5def60(0x2b4)](),this[_0x5def60(0x2d3)]();},Window_Message[_0x28d800(0x328)][_0x28d800(0x32e)]=function(){const _0x4924d1=_0x28d800,_0x20515e=this[_0x4924d1(0x294)],_0x4b4309=_0x20515e['location']===_0x4924d1(0x1c7)?_0x4924d1(0x1c7):'bottom',_0x46dca5=_0x20515e[_0x4924d1(0x25e)]===_0x4924d1(0x2e4)?_0x4924d1(0x269):_0x4924d1(0x25b);return _0x4924d1(0x242)[_0x4924d1(0x247)](_0x4b4309,_0x46dca5);},Window_Message[_0x28d800(0x328)][_0x28d800(0x1ca)]=function(){const _0x548aa3=_0x28d800,_0x27d577=this[_0x548aa3(0x33c)],_0x49b650=this[_0x548aa3(0x294)],_0x26663a=$gameSystem[_0x548aa3(0x2d2)](),_0x2f1b07=this[_0x548aa3(0x32e)]();if(_0x49b650[_0x548aa3(0x286)]===_0x26663a['%1Filename'[_0x548aa3(0x247)](_0x2f1b07)])return;const _0x21a77f=_0x26663a[_0x548aa3(0x21a)[_0x548aa3(0x247)](_0x2f1b07)];_0x49b650[_0x548aa3(0x286)]=_0x21a77f,_0x21a77f?_0x27d577[_0x548aa3(0x27e)]=ImageManager[_0x548aa3(0x2cc)](_0x21a77f):_0x27d577['bitmap']=new Bitmap(0x1,0x1);},Window_Message['prototype'][_0x28d800(0x2b4)]=function(){const _0x38e289=_0x28d800,_0x11550d=this[_0x38e289(0x33c)],_0x6f15c7=this['_messageTail'];_0x11550d['visible']=_0x6f15c7['visible']&&this[_0x38e289(0x2a2)]===0xff;},Window_Message[_0x28d800(0x328)][_0x28d800(0x2d3)]=function(){const _0x3917c6=_0x28d800,_0x24937b=this[_0x3917c6(0x33c)],_0x52c255=this[_0x3917c6(0x294)],_0xf5a1c3=$gameSystem[_0x3917c6(0x2d2)](),_0x5294f8=this[_0x3917c6(0x32e)]();_0x24937b[_0x3917c6(0x277)]['x']=_0xf5a1c3['%1AnchorX'[_0x3917c6(0x247)](_0x5294f8)],_0x24937b[_0x3917c6(0x277)]['y']=_0xf5a1c3[_0x3917c6(0x236)[_0x3917c6(0x247)](_0x5294f8)];if(_0x52c255['positionX']==='auto'){if(_0x3917c6(0x2c4)===_0x3917c6(0x22c)){const _0x3ce615=_0x1baaef[_0x3917c6(0x2d2)]();if(!_0x3ce615)return![];if(!_0x3ce615[_0x3917c6(0x2fd)])return![];const _0x57dfe3=_0x3ce615[_0x3917c6(0x20c)]?_0x3917c6(0x269):'Right',_0x554405=_0x3917c6(0x1dd)[_0x3917c6(0x247)](_0x57dfe3),_0xece43a=_0x3ce615[_0x554405]||'';return _0xece43a[_0x3917c6(0x2e1)]()!=='';}else _0x24937b['x']=Math[_0x3917c6(0x319)](this['width']/0x2);}else _0x52c255[_0x3917c6(0x23a)]=Number(_0x52c255[_0x3917c6(0x23a)]),_0x24937b['x']=Math[_0x3917c6(0x319)](_0x52c255[_0x3917c6(0x23a)]);_0x52c255[_0x3917c6(0x348)]===_0x3917c6(0x1c7)?_0x24937b['y']=0x0:_0x3917c6(0x26e)===_0x3917c6(0x26e)?_0x24937b['y']=this[_0x3917c6(0x1ee)]:this[_0x3917c6(0x1f3)](),_0x24937b['x']+=_0xf5a1c3[_0x3917c6(0x1cb)[_0x3917c6(0x247)](_0x5294f8)],_0x24937b['y']+=_0xf5a1c3[_0x3917c6(0x26f)[_0x3917c6(0x247)](_0x5294f8)];};function Window_ButtonConsole(){const _0x5d5479=_0x28d800;this[_0x5d5479(0x1ac)](...arguments);}function _0x3f03(_0x245efb,_0x1fcd48){const _0x560313=_0x5603();return _0x3f03=function(_0x3f0396,_0x56d474){_0x3f0396=_0x3f0396-0x1a9;let _0x3557ae=_0x560313[_0x3f0396];return _0x3557ae;},_0x3f03(_0x245efb,_0x1fcd48);}function _0x5603(){const _0x31dd0c=['OffsetX','AUTO_FORWARD_MIN_DELAY','ixdxT','Window_Message_startWait','VisuMZ_1_OptionsCore','loadSystem','getColor','Enable','updateIconMessageCursorPauseSignSprites','toUpperCase','AutoKey','getMessageTailSettings','updateMessageTailPosition','ORpzc','_windowskin','WaitPerChar','auto','GameEndKey','replace','options','isSaveEnabled','newPage','_heldDownFastFwd','removeChild','length','clamp','trim','padding','Frauk','left','_scene','EXT_FAST_FORWARD_STOP_ON_SCENE_CHANGE','alignButtonConsoleButtons','MsgCursor','save','MsgTail','includes','USE_BACK_IMAGE_SPRITES','prepareHideButtonConsoleTextCode','sAvcv','isAnySavefileExists','lyPiw','sBwqB','NpfMA','createMessageTailSprite','anyActiveMessageInputWindows','FlipMultiplier','getMessageCursorSettings','itemPadding','BUTTON_HEIGHT','_parentWindow','Scene_Battle_update','setupMessageTailSettings','_extendedFastForwardMode','autoPositionTail','gGVok','loadFace','3402234NIIctx','3BwoFRq','NHSFe','hide','pOBVf','setMessageAutoForwardMode','TEXT_COLOR_TOGGLED','createButtonConsole','AFRaz','wimzS','showButtonConsole','makeDeepCopy','isCustomMessageCursorEnabled','create','IconIndex','call','drawText','members','dUShK','escape','fontSize','loadSvActor','loadPartyGraphics','POSITION','MeGfY','round','moveCustomMessageCursorPauseSign','startWait','OffsetY','AnchorY','vxXQA','zbrBz','refreshCustomMessageCursorPauseSign','LIYsg','GameEnd','FONT_SIZE','processButtonShortcut','hboAl','innerHeight','toggleAutoForward','prototype','isOpen','hwZBk','ButtonBuffer','VisuMZ_2_FurnitureSystem','STR','getMessageTailMainKey','updateMainMultiply','2744601NHnfYa','fVloH','MsgButtonConsole','parameters','GraphicType','ARRAYEVAL','SHORTCUT_KEY','Filename','scale','updateConsoleVisibility','textColorID','4NzspzU','_messageTailSprite','isExtendedFastForwardDisallowed','Window_Message_update','OdVyq','exit','isPressed','MouNO','faceIndex','BUTTON_WIDTH','initExtendedFastForward','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','visible','location','VIbbm','msgButtonConsole','DisabledColor','1031256CUkzFm','ButtonWidth','ExtFastFwdDisallow','updateMain','oJSIJ','top','map','initialize','parseMessageTailTextCodes','addChild','isEventRunning','FONT_FACE','vGkxC','autoPositionOffsetX','_buttonConsoleSprites','resetFontSettings','Yoyzl','setFrame','convertMessageTailEscapeCodes','NormalColor','crOUt','rCQeD','bottom','isActivatedExtendedFastForwardMode','changeTextColor','backOpacity','toLowerCase','updateEffekseer','usesAutoPositionMessageTail','Game_Temp_requestAnimation','KzdxE','setMessageButtonConsoleVisible','floor','updateExtendedFastForwardMode','upper','rTRoF','name','updateMessageTailBitmap','%1OffsetX','skip','flushTextState','Game_Interpreter_command101','refresh','Window_Message','playCancel','Window_Message_updateDimensions','createAllWindows','iCKkH','fontFace','VOCAB','innerWidth','_messageWindow','FastFwd','opacity','ORAGY','VisuMZ_4_MessageVisibility','bottom%1Filename','daaxq','98EvhGaN','playOkSound','Window_Base_flushTextState','updateImageMessageCursorPauseSignSprites','_createPauseSignSprites','ShowDefault','updateMessageTailSprite','xyfgm','TEXT_COLOR_NORMAL','width','filter','rHHgU','setMessageTailSettings','30pWSrHS','SaveKey','height','VisuMZ_1_MessageCore\x20is\x20out\x20of\x20date.\x0a','createBackImageSprites','_type','tKrOd','updateCustomMessageCursorPauseSignSprites','updateDimensions','Scene_Message_createAllWindows','ImgToggled','UoRnJ','OptionsKey','_autoForwardCount','text','setMessageCursorSettings','_updatePauseSign','ARRAYSTRUCT','_disallowFastForward','contents','battlerName','_messageButtonConsoleVisible','cos','qbtLx','initMessageButtonConsole','AUTO_FORWARD_DELAY_PER_CHAR','center','removeExistingPauseSignSprites','Window_Message_isTriggered','FastForwardKey','drawMessageFace','_contentsSprite','autoPositionLeft','updateBackOpacity','gameend','4242609bpWfjr','tEtVM','MessageCore','updateBackImageSpriteVisibility','isTouchScrollEnabled','HwvBm','isSceneMap','Cols','FrameDelay','ImgDisabled','initMessageCursorSettings','%1Filename','Window_Message_startPause','_msgCursorSettings','VisuMZ_1_MessageCore','iconHeight','EXT_FAST_FORWARD_LOOPS','VisuMZ_1_SaveCore','requestAnimation','EVAL','iconWidth','ToggledColor','PZwai','faceWidth','Window_Message_autoPositionOffsetY','_childInterpreter','alpha','Settings','onSavefileOk','vlWLu','pause','The\x20latest\x20version\x20is\x20required\x20to\x20use\x0a','JSON','Window_Message_addedHeight','createCustomMessageCursorPauseSignSprites','FontSize','load','ImgEnabled','BUTTON_BUFFER','%1AnchorY','_messageAutoForwardMode','right','ARRAYFUNC','positionX','xwxvq','faceName','_refreshPauseSign','_currentAutoSize','addChildToBack','updateFade','log','%1%2','addAutoForwardDelay','constructor','isMessageButtonConsoleVisible','isExtendedFastForwardMode','format','ARRAYSTR','_cachedIndex','BUTTON_ORDER','fPmel','_eventItemWindow','meetExtMsgFuncResetRequirements','isMessageAutoForwardMode','142118Dlkayi','buffer','HeUmO','OZxTQ','isCancelled','ExtMessageFunc','image','RFRSP','_buttonConsoleButtons','Speed','hDDBb','VisuMZ_3_MessageLog','Right','Scene_Boot_loadSystemImages','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','direction','autoForwardTriggered','Allow','Window_Message_newPage','updateExtendedFastForwardCancel','Buttons','Game_System_initialize','LoadKey','updateExtMsgFuncResetTimers','DwEud','CIwOL','Left','updatePauseSignHeightextMsgFunction','MinimumWait','match','update','nyHHe','%1OffsetY','ConvertParams','description','loadSystemImages','updateColor','_pauseSignAnimationCount','Window_Message_updateAutoPosition','isTriggered','anchor','_pauseSignSprite','WindowLayer_update','lYbvh','_index','Auto','toggleMessageWindowVisibility','bitmap','playBuzzerSound','AutoSizeHide','push','hEMme','MessageTailSettings','NEFsN','SceneManager_push','lastFile','active','_choiceListWindow','textColor','Load','checkBackImageSprites','startPause','setExtendedFastForwardMode','resetMessageTailSettings','TEXT_COLOR_DISABLED','loadCharacter','isRTL','characterName','_autoSizeRegexp','_messageTail','General','_extFastForwardLooping','1314FLGXvX','hideButtonConsoleAutoSize','_hideButtonConsole','fastfwd','rMNvT','TcRVA','max','backlog','zIOGL','windowskin','SKIN','openness','40285dfyfer','addedHeight','refreshButtonConsole','isSceneUsingExFastForward','fnsZV','zgiCE','loadSystemImagesForExtMessageFunc','registerCommand','onTouchScrollStart','isSceneBattle','frameCount','updateAutoPosition','lOmHU','AnchorX','_numberInputWindow','isMainMenuMessageLogEnabled','drawing','updateMessageTailVisibility','Window_Message_initialize','autoPositionOffsetY','Visible','23154468PXvlea','FUNC','cypiY','_lastExtMsgFuncIndex','ButtonHeight','Save','parse','createContents','_interpreter','addButtonConsoleObject','initMembers','_messageTailSettings','rZMnh','Position','_cache_customMessageCursorFrameCount'];_0x5603=function(){return _0x31dd0c;};return _0x5603();}Window_ButtonConsole[_0x28d800(0x328)]=Object[_0x28d800(0x30d)](Window_Scrollable[_0x28d800(0x328)]),Window_ButtonConsole[_0x28d800(0x328)][_0x28d800(0x244)]=Window_ButtonConsole,Window_ButtonConsole['DEFAULT_SHOW']=VisuMZ['ExtMessageFunc'][_0x28d800(0x22a)][_0x28d800(0x332)][_0x28d800(0x1e4)],Window_ButtonConsole['POSITION']=VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)][_0x28d800(0x332)][_0x28d800(0x2c5)],Window_ButtonConsole[_0x28d800(0x2a1)]=VisuMZ['ExtMessageFunc'][_0x28d800(0x22a)]['MsgButtonConsole']['WindowSkin'],Window_ButtonConsole[_0x28d800(0x1b0)]=VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)][_0x28d800(0x332)]['FontFace'],Window_ButtonConsole[_0x28d800(0x323)]=VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)][_0x28d800(0x332)][_0x28d800(0x232)],Window_ButtonConsole[_0x28d800(0x1e7)]=VisuMZ[_0x28d800(0x254)]['Settings'][_0x28d800(0x332)][_0x28d800(0x1b8)],Window_ButtonConsole[_0x28d800(0x306)]=VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)]['MsgButtonConsole'][_0x28d800(0x224)],Window_ButtonConsole[_0x28d800(0x28f)]=VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)]['MsgButtonConsole'][_0x28d800(0x34b)],Window_ButtonConsole['BUTTON_WIDTH']=VisuMZ['ExtMessageFunc']['Settings'][_0x28d800(0x332)][_0x28d800(0x34d)],Window_ButtonConsole[_0x28d800(0x2f8)]=VisuMZ['ExtMessageFunc'][_0x28d800(0x22a)][_0x28d800(0x332)][_0x28d800(0x2bc)],Window_ButtonConsole[_0x28d800(0x235)]=VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)][_0x28d800(0x332)][_0x28d800(0x32b)],Window_ButtonConsole[_0x28d800(0x24a)]=VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)][_0x28d800(0x263)]['List'],Window_ButtonConsole[_0x28d800(0x1d6)]={'auto':VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)][_0x28d800(0x263)][_0x28d800(0x27c)],'fastfwd':VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)][_0x28d800(0x263)][_0x28d800(0x1d9)],'save':VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)]['Buttons'][_0x28d800(0x2bd)],'load':VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)][_0x28d800(0x263)][_0x28d800(0x28a)],'options':VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)][_0x28d800(0x263)]['Options'],'gameend':VisuMZ['ExtMessageFunc'][_0x28d800(0x22a)][_0x28d800(0x263)][_0x28d800(0x322)]},Window_ButtonConsole[_0x28d800(0x336)]={'auto':VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)]['Buttons'][_0x28d800(0x2d1)],'save':VisuMZ['ExtMessageFunc']['Settings'][_0x28d800(0x263)][_0x28d800(0x1ed)],'load':VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)]['Buttons'][_0x28d800(0x265)],'options':VisuMZ['ExtMessageFunc'][_0x28d800(0x22a)][_0x28d800(0x263)][_0x28d800(0x1f8)],'gameend':VisuMZ[_0x28d800(0x254)][_0x28d800(0x22a)][_0x28d800(0x263)][_0x28d800(0x2d8)]},Window_ButtonConsole['prototype'][_0x28d800(0x1ac)]=function(_0x31aaed,_0x41332d){const _0x1c071d=_0x28d800,_0x106568=new Rectangle(0x0,0x0,Window_ButtonConsole[_0x1c071d(0x344)],Window_ButtonConsole['BUTTON_HEIGHT']);this['_parentWindow']=_0x41332d,Window_Scrollable['prototype'][_0x1c071d(0x1ac)][_0x1c071d(0x30f)](this,_0x106568),this[_0x1c071d(0x1f0)](),this[_0x1c071d(0x1f1)]=_0x31aaed['toLowerCase']()[_0x1c071d(0x2e1)](),this[_0x1c071d(0x1cf)](),this[_0x1c071d(0x303)]();},Window_ButtonConsole[_0x28d800(0x328)][_0x28d800(0x2f7)]=function(){return 0x0;},Window_ButtonConsole[_0x28d800(0x328)]['loadWindowskin']=function(){const _0xb72d8f=_0x28d800;this['windowskin']=ImageManager[_0xb72d8f(0x2cc)](Window_ButtonConsole[_0xb72d8f(0x2a1)]);},Window_ButtonConsole[_0x28d800(0x328)]['updatePadding']=function(){const _0x22dfc6=_0x28d800;this[_0x22dfc6(0x2e2)]=0x0;},Window_ButtonConsole['prototype'][_0x28d800(0x20d)]=function(){const _0x53e566=_0x28d800;this[_0x53e566(0x1be)]=0xff;},Window_ButtonConsole[_0x28d800(0x328)]['createBackImageSprites']=function(){const _0x4f7f33=_0x28d800;Window_ButtonConsole['USE_BACK_IMAGE_SPRITES']===undefined&&this[_0x4f7f33(0x28b)]();if(!Window_ButtonConsole[_0x4f7f33(0x2ec)])return;this[_0x4f7f33(0x1da)]=0x0;const _0x517a86=VisuMZ[_0x4f7f33(0x254)][_0x4f7f33(0x22a)][_0x4f7f33(0x332)],_0x3e8202=[_0x4f7f33(0x218),'ImgEnabled',_0x4f7f33(0x1f6)];this[_0x4f7f33(0x1b3)]={};for(const _0x562e07 of _0x3e8202){if(_0x517a86[_0x562e07]!==''){const _0x31f2a9=ImageManager['loadSystem'](_0x517a86[_0x562e07]);this[_0x4f7f33(0x1b3)][_0x562e07]=new Sprite(_0x31f2a9);const _0x489131=this['_buttonConsoleSprites'][_0x562e07];this[_0x4f7f33(0x23f)](_0x489131),_0x489131['x']=_0x517a86[_0x4f7f33(0x1cb)['format'](_0x562e07)]||0x0,_0x489131['y']=_0x517a86[_0x4f7f33(0x26f)[_0x4f7f33(0x247)](_0x562e07)]||0x0;}}this[_0x4f7f33(0x212)]();},Window_ButtonConsole['prototype'][_0x28d800(0x28b)]=function(){const _0xddc316=_0x28d800;Window_ButtonConsole[_0xddc316(0x2ec)]=![];const _0x112313=VisuMZ['ExtMessageFunc']['Settings'][_0xddc316(0x332)],_0x2d0b20=[_0xddc316(0x218),_0xddc316(0x234),_0xddc316(0x1f6)];for(const _0x1dd555 of _0x2d0b20){if(_0x112313[_0x1dd555]!==''){if('sBwqB'!==_0xddc316(0x2f1))return _0x26beff[_0xddc316(0x306)];else{Window_ButtonConsole['USE_BACK_IMAGE_SPRITES']=!![];break;}}}},Window_ButtonConsole[_0x28d800(0x328)][_0x28d800(0x1b4)]=function(){const _0x5564b3=_0x28d800;Window_Scrollable['prototype'][_0x5564b3(0x1b4)]['call'](this),this[_0x5564b3(0x1ff)][_0x5564b3(0x1d5)]=Window_ButtonConsole[_0x5564b3(0x1b0)],this['contents'][_0x5564b3(0x314)]=Window_ButtonConsole[_0x5564b3(0x323)];},Window_ButtonConsole[_0x28d800(0x328)]['refresh']=function(){const _0x5a8db5=_0x28d800;this[_0x5a8db5(0x2bf)](),this[_0x5a8db5(0x1b4)]();const _0x243fc0=TextManager[_0x5a8db5(0x34a)](this[_0x5a8db5(0x1f1)]),_0x3feed6=this[_0x5a8db5(0x33a)]();this[_0x5a8db5(0x1bd)](ColorManager[_0x5a8db5(0x2cd)](_0x3feed6)),this[_0x5a8db5(0x310)](_0x243fc0,0x0,0x0,this[_0x5a8db5(0x1d7)],_0x5a8db5(0x206));},Window_ButtonConsole[_0x28d800(0x328)][_0x28d800(0x33a)]=function(){const _0x9ce693=_0x28d800;switch(this[_0x9ce693(0x1f1)]){case _0x9ce693(0x2d7):if($gameTemp[_0x9ce693(0x24e)]())return Window_ButtonConsole[_0x9ce693(0x306)];break;case'fastfwd':const _0x1b3ee1=SceneManager[_0x9ce693(0x2e5)];if($gameSystem[_0x9ce693(0x33d)]())return'drXRM'!=='pOGMj'?Window_ButtonConsole[_0x9ce693(0x28f)]:this[_0x9ce693(0x237)];else{if(_0x1b3ee1&&_0x1b3ee1[_0x9ce693(0x1bc)]&&_0x1b3ee1[_0x9ce693(0x1bc)]())return Window_ButtonConsole['TEXT_COLOR_TOGGLED'];}break;case _0x9ce693(0x2e9):if(!$gameSystem[_0x9ce693(0x2db)]()||!SceneManager[_0x9ce693(0x215)]())return _0x9ce693(0x259)==='VhhEV'?this['_extendedFastForwardMode']:Window_ButtonConsole[_0x9ce693(0x28f)];break;case _0x9ce693(0x233):if(!DataManager[_0x9ce693(0x2ef)]()||!SceneManager['isSceneMap']())return Window_ButtonConsole['TEXT_COLOR_DISABLED'];break;case'options':case _0x9ce693(0x20e):if(!SceneManager[_0x9ce693(0x215)]())return Window_ButtonConsole[_0x9ce693(0x28f)];break;case _0x9ce693(0x29e):case _0x9ce693(0x241):if(!$gameSystem[_0x9ce693(0x2b2)]()||!SceneManager['isSceneMap']())return Window_ButtonConsole[_0x9ce693(0x28f)];break;}return Window_ButtonConsole[_0x9ce693(0x1e7)];},Window_ButtonConsole[_0x28d800(0x328)][_0x28d800(0x213)]=function(){return!![];},Window_ButtonConsole['prototype'][_0x28d800(0x2ab)]=function(){const _0x3df7f9=_0x28d800;if(this[_0x3df7f9(0x2a2)]<0xff)return;switch(this[_0x3df7f9(0x1f1)]){case'auto':let _0x1e3266=!$gameTemp[_0x3df7f9(0x24e)]();$gameTemp[_0x3df7f9(0x305)](_0x1e3266);_0x1e3266?this['playOkSound']():SoundManager[_0x3df7f9(0x1d1)]();break;case'fastfwd':if(!$gameSystem[_0x3df7f9(0x33d)]()){if('vGkxC'!==_0x3df7f9(0x1b1)){if(!this[_0x3df7f9(0x278)])return;this[_0x3df7f9(0x2de)](this['_pauseSignSprite']);}else{let _0x1187c2=!$gameTemp[_0x3df7f9(0x246)]();$gameTemp[_0x3df7f9(0x28d)](_0x1187c2);if(_0x1187c2){if('Doaen'===_0x3df7f9(0x203)){_0xf9cce2[_0x3df7f9(0x270)](_0x5c3c01,_0x3588c8);const _0x5bb611=_0x3c8690[_0x3df7f9(0x2b7)];_0x55f541[_0x3df7f9(0x1c4)](_0x5bb611);}else this[_0x3df7f9(0x1e0)]();}else{if(_0x3df7f9(0x33f)!==_0x3df7f9(0x33f)){const _0x25778a=this[_0x3df7f9(0x1b3)]['ImgDisabled'];_0x25778a[_0x3df7f9(0x347)]=this[_0x3df7f9(0x33a)]()===_0x576584[_0x3df7f9(0x28f)];}else SoundManager[_0x3df7f9(0x1d1)]();}this[_0x3df7f9(0x1cf)]();}}else this[_0x3df7f9(0x27f)]();break;case _0x3df7f9(0x2e9):$gameSystem[_0x3df7f9(0x2db)]()&&SceneManager['isSceneMap']()?_0x3df7f9(0x302)===_0x3df7f9(0x302)?(this[_0x3df7f9(0x1e0)](),SceneManager[_0x3df7f9(0x281)](Scene_SaveButtonConsole)):this[_0x3df7f9(0x27f)]():this[_0x3df7f9(0x27f)]();break;case _0x3df7f9(0x233):DataManager[_0x3df7f9(0x2ef)]()&&SceneManager[_0x3df7f9(0x215)]()?'zbrBz'===_0x3df7f9(0x31f)?(this[_0x3df7f9(0x1e0)](),SceneManager[_0x3df7f9(0x281)](Scene_Load)):_0x4f8e7d['bitmap']=new _0xf692aa(0x1,0x1):'tsVwI'!==_0x3df7f9(0x1b9)?this[_0x3df7f9(0x27f)]():this[_0x3df7f9(0x204)]();break;case'options':SceneManager[_0x3df7f9(0x215)]()?(this[_0x3df7f9(0x1e0)](),SceneManager['push'](Scene_Options)):this['playBuzzerSound']();break;case _0x3df7f9(0x20e):SceneManager[_0x3df7f9(0x215)]()?(this['playOkSound'](),SceneManager[_0x3df7f9(0x281)](Scene_GameEnd)):this[_0x3df7f9(0x27f)]();break;case _0x3df7f9(0x303):Imported[_0x3df7f9(0x1dc)]&&(_0x3df7f9(0x1de)===_0x3df7f9(0x1de)?$gameTemp[_0x3df7f9(0x27d)]():this[_0x3df7f9(0x1e0)]());break;case _0x3df7f9(0x29e):case _0x3df7f9(0x241):Imported[_0x3df7f9(0x25a)]&&($gameSystem[_0x3df7f9(0x2b2)]()&&SceneManager[_0x3df7f9(0x215)]()?'MBAnY'===_0x3df7f9(0x308)?this['playBuzzerSound']():(this['playOkSound'](),SceneManager['push'](Scene_MessageLog)):this['playBuzzerSound']());break;}TouchInput['clear']();},Window_ButtonConsole['prototype'][_0x28d800(0x26d)]=function(){const _0x375a9b=_0x28d800;Window_Scrollable[_0x375a9b(0x328)]['update']['call'](this),this['updateConsoleVisibility'](),this['updateColor'](),this[_0x375a9b(0x212)]();},Window_ButtonConsole[_0x28d800(0x328)][_0x28d800(0x339)]=function(){const _0x4ca347=_0x28d800;if(!this[_0x4ca347(0x2f9)])return;this['openness']=this[_0x4ca347(0x2f9)][_0x4ca347(0x2a2)];},Window_ButtonConsole[_0x28d800(0x328)][_0x28d800(0x273)]=function(){const _0x186fb7=_0x28d800;this['_type']===_0x186fb7(0x29a)&&(this[_0x186fb7(0x2dd)]!==Input[_0x186fb7(0x341)](VisuMZ['MessageCore'][_0x186fb7(0x22a)][_0x186fb7(0x295)][_0x186fb7(0x209)])&&(this[_0x186fb7(0x2dd)]=Input[_0x186fb7(0x341)](VisuMZ['MessageCore'][_0x186fb7(0x22a)][_0x186fb7(0x295)]['FastForwardKey']),this[_0x186fb7(0x1cf)]()));},Window_ButtonConsole[_0x28d800(0x328)]['updateBackImageSpriteVisibility']=function(){const _0x57937c=_0x28d800;if(!Window_ButtonConsole[_0x57937c(0x2ec)])return;if(this[_0x57937c(0x1b3)]['ImgDisabled']){const _0x2d6052=this[_0x57937c(0x1b3)]['ImgDisabled'];_0x2d6052[_0x57937c(0x347)]=this[_0x57937c(0x33a)]()===Window_ButtonConsole[_0x57937c(0x28f)];}if(this[_0x57937c(0x1b3)][_0x57937c(0x234)]){const _0x483c8a=this[_0x57937c(0x1b3)]['ImgEnabled'];_0x483c8a['visible']=this[_0x57937c(0x33a)]()===Window_ButtonConsole[_0x57937c(0x1e7)];}if(this[_0x57937c(0x1b3)][_0x57937c(0x1f6)]){if(_0x57937c(0x2fe)===_0x57937c(0x2fe)){const _0x7e072f=this[_0x57937c(0x1b3)][_0x57937c(0x1f6)];_0x7e072f[_0x57937c(0x347)]=this['textColorID']()===Window_ButtonConsole[_0x57937c(0x306)];}else this[_0x57937c(0x1e0)](),_0x5a2068[_0x57937c(0x281)](_0x4a4e75);}};