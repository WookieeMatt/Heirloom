//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.38;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.38] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Requires VisuMZ_0_CoreEngine)
 * ------------------   -------------------------------------------------------
 * <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
 * <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 * 
 * Picture: Refresh Text
 * - Refreshes the text used for all on-screen pictures.
 * - To be used if any dynamic text codes are updated like \n[x].
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces. It does not support any Asian languages that do not utilize spaces,
 * such as Chinese, Japanese, Korean, etc.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.38: July 21, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.37: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Picture texts with \v[x] text codes are now updated automatically.
 * ** This is the only dynamic text code that updates this way for optimization
 *    purposes and to prevent overabundant CPU usage.
 * ** Everything else will require the new Plugin Command.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Picture: Refresh Text
 * **** Refreshes the text used for all on-screen pictures.
 * **** To be used if any dynamic text codes are updated like \n[x].
 * * New Features!
 * ** New text codes added by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
 * *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
 * *** <Page Up Button>, <Page Down Button>
 * **** Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 * To be used if any dynamic text codes are updated like \n[x].
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
 * @param MessageCore
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
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

function _0x2c9a(){const _0x1ce0be=['_pictureTextHeight','getPictureTextBuffer','1157896FOxMKb','map\x20event','clearPictureTextRefresh','TWiUe','ConfigManager_applyData','numVisibleRows','boxHeight','processWrapBreak','isRTL','_autoSizeRegexp','TUcEg','updateDimensions','_moveTargetHeight','resetTextColor','fontFace','cbAQq','_interpreter','wYqiV','nMgoA','jsyCq','_pictureTextWidth','<WORDWRAP>','refreshDimmerBitmap','setMessageWindowRows','Window_NameBox_refresh','getChoiceListLineHeight','setChoiceListTextAlign','processPyTextCode','addExtraShowChoices','MessageTextDelay','some','ENABLE','OffsetX','event','VisuMZ_0_CoreEngine','convertEscapeCharacters','7WZQXUr','_colorLock','stretchDimmerSprite','startWait','upperright','convertHardcodedEscapeReplacements','registerActorNameAutoColorChanges','description','erasePictureTextBuffer','setupEvents','_moveTargetX','NameBoxWindowOffsetY','currencyUnit','AFxEY','LYBTp','mainFontFace','addedHeight','isBusy','_pictureTextCache','_lastGainedItemData','NLkjJ','convertMessageCoreEscapeActions','isContinuePrepareShowTextCommands','CreateAutoColorRegExpListEntries','bEwew','setChoiceListMaxRows','processColorLock','isAutoColorAffected','jCSWN','requestPictureTextRefreshAll','setTextDelay','setPictureText','isColorLocked','createContents','FkqFb','splice','getChoiceListMaxColumns','preFlushTextState','applyMoveEasing','AddOption','getInputButtonString','filter','himbA','choiceLineHeight','lowerright','easeOut','move','Items','lineHeight','ConvertTextAutoColorRegExpFriendly','height','resizePictureText','gainItem','<LEFT>','IrJtq','setRelativePosition','center','outlineWidth','map\x20party','createPictureText','ParseItemNotetags','command101','ChoiceWindowLineHeight','default','parseChoiceText','_nameBoxWindow','shift','_autoPosRegExp','value','isItem','realPictureId','resetWordWrap','outputHeight','easeIn','textSpeedStatusText','\x1bCOLORLOCK[0]','activate','isSceneMap','Type','zmMTL','addGeneralOptions','getChoiceIndent','kjJqT','makeFontSmaller','VisuMZ_1_EventsMoveCore','resetRect','instantTextSpeed','processTextAlignmentX','clear','addWrapBreakAfterPunctuation','clearFlags','PESjr','AdjustRect','Kraeg','SWITCH','getChoiceListMaxRows','getLastGainedItemData','process_VisuMZ_MessageCore_TextCodes_Action','name','callOkHandler','</WORDWRAP>','moveTo','Window_Base_initialize','AutoColorRegExp','start','\x1bC[%1]%2\x1bPREVCOLOR[0]','startX','MessageCore','escapeStart','canMove','LineBreakSpace','Skills','bitmap','convertChoiceMacros','_textDelay','findTargetSprite','constructor','setBackground','mainFontSize','(((','NUM','yuNzQ','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','275668Lgdkvt','HelpWindow','_positionType','lowerleft','Window_Base_processNewLine','Settings','Undefined','adjustShowChoiceDefault','obtainItem','mhIYv','updateRelativePosition','updateOverlappingY','autoPositionOffsetY','ARRAYFUNC','_pictureTextRefresh','boxWidth','onNewPageMessageCore','addMessageCoreCommands','contents','PictureIDs','WAIT','processMessageCoreEscapeActions','TextStr','EUijU','substr','ParseStateNotetags','COLORLOCK','fontSize','_messagePositionReset','follower','_macroBypassWordWrap','Window_Base_processAllText','setColorLock','makeData','TextMacros','textSizeEx','clearActorNameAutoColor','cKtrb','faceWidth','cancel','Default','initMessageCore','setSpeakerName','false','TextJS','clamp','getChoiceListTextAlign','Window_Options_isVolumeSymbol','setPositionType','onProcessCharacter','convertTextAlignmentEscapeCharacters','process_VisuMZ_MessageCore_AutoColor','addChildAt','convertShowChoiceEscapeCodes','PgnJT','quantity','clearCommandList','obtainExp','prepareShowTextFollowups','Game_Map_updateEvents','outlineColor','MessageWindow','fpywk','terminateMessage','LineHeight','drawItem','FGAEb','zTede','itemRectWithPadding','isWeapon','_resetRect','Actors','textSizeExWordWrap','messageRows','Game_System_initialize','processStoredAutoColorChanges','postConvertEscapeCharacters','isBreakShowTextCommands','processAllText','prepareAutoSizeEscapeCharacters','convertTextMacros','setMessageWindowWordWrap','MessageRows','processFontChangeBold','autoPositionOffsetX','Uyzit','_action','</COLORLOCK>','\x1bTEXTALIGNMENT[1]','textSizeExRaw','addCommand','none','upperleft','OffsetY','_autoSizeCheck','changeOutlineColor','wENpZ','ParseWeaponNotetags','ParseAddedText','exit','EWiRr','OeHPP','_commonEventId','_target','itemHeight','code','registerCommand','ParseEnemyNotetags','AYLik','_textDelayCount','\x1bTEXTALIGNMENT[2]','pagedown','addContinuousShowChoices','map','MsgWindowOffsetY','Name','_MessageCoreSettings','bind','NameBoxWindowDefaultColor','resetPositionX','_pictureId','format','inBattle','map\x20player','width','defaultColor','placeCancelButton','uYicQ','owyEp','iconIndex','faceName','<RIGHT>','iTeWp','_pictureTextSprite','Window_Message_processEscapeCharacter','fyWaf','isWordWrapEnabled','substring','vaxUe','changeValue','convertNewPageTextStateMacros','_pictures','HRmyY','Armors','processFontChangeItalic','ALL','convertBackslashCharacters','toLowerCase','hbWzI','actor','updatePictureText','_moveEasingType','processCustomWait','COMMONEVENT','lastGainedObjectQuantity','join','startY','WordWrap','databaseObjectName','sUcJk','setupChoices','_pictureTextWindow','FRWjY','setChoiceListMaxColumns','YGNyz','_pictureText','easeInOut','trim','KnaLH','max','WORD_WRAP_PADDING','push','GjEOK','TextAlign','addMessageCommonEvent','\x1bWrapBreak[0]','includes','6oPiNgw','surprise','battle\x20party','VqPFj','XWpvl','windowX','Sprite_Picture_updateBitmap','maxChoiceWidth','Game_Screen_clearPictures','isChoiceVisible','\x1bi[%1]%2','anyPictureTextChanges','updateAutoPosition','outLineColor','processAutoSize','MessageWindowXyOffsets','windowWidth','nQvLJ','setMessageWindowXyOffsets','\x1bI[%1]','emerge','Classes','colSpacing','Window_ChoiceList_windowX','GhVwN','Rows','TightWrap','ParseArmorNotetags','index','members','yWeMU','CENTERPICTURE','erasePicture','CeWVI','Scene_Boot_onDatabaseLoaded','maxCommands','processDrawPicture','sort','convertFontSettingsEscapeCharacters','Window_Message_terminateMessage','adjustShowChoiceExtension','PREVCOLOR','<LINE\x20BREAK>','processNewLine','changeTextColor','changeTextSpeed','paintOpacity','currentCommand','add','_list','update','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','registerResetRect','Instant','Game_Interpreter_setupChoices','choicePositionType','choices','uRlzU','getTextAlignment','openness','_textAlignment','registerSelfEvent','needsPictureTextRefresh','open','levelUp','split','xpWDi','BDMRk','CreateAutoColorFor','\x1bBOLD[1]','list','_messageWindow','Scene_Options_maxCommands','DefaultOutlineWidth','battle\x20actor','isHelpWindowWordWrap','TextManager_message','convertLockColorsEscapeCharacters','applyDatabaseAutoColor','sDoFG','indexOf','processPreviousColor','bBgMb','choiceCols','sIBwo','parse','process_VisuMZ_MessageCore_TextCodes_Replace','onDatabaseLoaded','nMWdJ','MsgWindowOffsetX','ANY','CreateAutoColorRegExpLists','ZxaqT','slice','obtainEscapeString','eSQTx','makeDeepCopy','_eventId','padding','updateEvents','Game_Map_initialize','right','4715916HmQllh','Window_Options_addGeneralOptions','_currentAutoSize','type','updateOffsetPosition','Game_Party_initialize','maxCols','map\x20actor','getMessageWindowRows','FwnMw','return\x20\x27','setChoiceListLineHeight','textWidth','_messageCommonEvents','unshift','obtainEscapeParam','menu','RCEif','selectDefault','ceil','_relativePosition','toUpperCase','convertVariableEscapeCharacters','\x1bITALIC[1]','Window_Base_processEscapeCharacter','loLnF','JkerS','clearPictures','Window_Message_needsNewPage','messageWindowRect','NwCst','choiceTextAlign','rtl','\x1bCOLORLOCK[1]','qqjJU','zXZZA','getPreservedFontSettings','processActorNameAutoColorChanges','prepareShowTextCommand','setWaitMode','_moveTargetY','FontSmallerCap','ARRAYJSON','StretchDimmedBg','ConfigManager_makeData','FastForwardKey','initialize','return\x200','MessageWindowProperties','drawPictureTextZone','\x1bITALIC[0]','RVnnQ','2432358XpvWUs','PictureTextErase','<I>','contentsHeight','launchMessageCommonEvent','actorName','Dfxvn','needsNewPage','sjQDh','convertMessageCoreEscapeReplacements','Game_Party_gainItem','Window_Options_changeVolume','returnPreservedFontSettings','setMessageWindowWidth','Window_Message_synchronizeNameBox','HYFDn','FWnpr','prepareForcedPositionEscapeCharacters','ZSTRA','GQaoA','_autoPositionTarget','contentsBack','ParseAllNotetags','followers','isRunning','fyhIN','6DRzICK','currentExt','pPDXQ','Window_Message_isTriggered','processDrawCenteredPicture','prepareWordWrapEscapeCharacters','nMnwM','drawBackPicture','updateTransform','wmAqC','Window_Message_clearFlags','\x1bBOLD[0]','rKacw','preemptive','textCodeCheck','Axwwm','\x1bTEXTALIGNMENT','FUNC','addContinuousShowTextCommands','isSceneBattle','messagePositionReset','kYFZM','qfzrv','PGjqE','textSpeed','setWordWrap','[0]','ARRAYSTRUCT','Window_Message_updatePlacement','TEXTALIGNMENT','Window_Base_changeTextColor','clearAllPictureTexts','processPxTextCode','isVolumeSymbol','remove','setLastGainedItemData','nextEventCode','_refreshPauseSign','eraseAllPictureTexts','updateMove','victory','call','PICTURE','TextCodeActions','CQBpF','_centerMessageWindow','drawTextEx','iMxVf','Enemies','_textColorStack','Window_NameBox_updatePlacement','setFaceImage','textCodeResult','<%1>','Sprite_Picture_update','processCommonEvent','attachPictureText','changeVolume','processEscapeCharacter','messageWidth','setPictureTextBuffer','convertBaseEscapeCharacters','battleActionName','_dimmerSprite','<BR>','wbgsU','_messageOffsetY','STR','TextColor%1','version','itemPadding','parameters','fontItalic','_forcedPosition','rlDXz','flushTextState','messageWordWrap','inputtingAction','updateAutoSizePosition','_messageOffsetX','Padding','process_VisuMZ_MessageCore_TextMacros','</B>','processAutoColorWords','updateBitmap','AutoColor','Game_Screen_erasePicture','_textMacroFound','addLoadListener','visible','_cancelButton','replace','Window_Base_textSizeEx','ChoiceWindowProperties','processCharacter','initTextAlignement','partyMemberName','preConvertEscapeCharacters','Window_Help_refresh','isMessageWindowWordWrap','_scene','KAMen','getMessageWindowXyOffsets','_pictureTextBuffer','setup','round','adjustShowChoiceCancel','left','GjQFn','choice','isInputting','getMessageWindowWidth','_index','Match','calcWindowHeight','BOLD','</RIGHT>','setupNumInput','obtainGold','drawBackCenteredPicture','battleUserName','Window_Base_processControlCharacter','battleTargetName','<CENTER>','applyData','General','CpiiX','floor','makeCommandList','updateNameBoxMove','QhmUD','Weapons','isChoiceEnabled','\x1bTEXTALIGNMENT[0]','choiceRows','Game_Map_refresh','Window_Options_statusText','getPictureText','defeat','Window_Base_update','outputWidth','helpWordWrap','_targets','updateMessageCommonEvents','calcMoveEasing','getStartingChoiceWidth','fontBold','ARRAYNUM','22691nBKROE','ParseClassNotetags','States','SHOW','ElRzX','setTextAlignment','textColor','updatePlacement','_subject','ParseSkillNotetags','_wholeMoveDuration','clampPlacementPosition','</LEFT>','item','test','getPictureTextData','iHhSS','FontBiggerCap','resetFontSettings','SortObjectByKeyLength','down','1126415Qsmnml','TextSpeed','getConfigValue','match','prototype','_wordWrap','convertButtonAssistEscapeCharacters','innerWidth','ITALIC','AyAyz','maxLines','message','true','SWITCHES','GNSjS','moveBy','NameBoxWindowOffsetX','gWauV','22nVCrvt','refresh','updateForcedPlacement','IQebO','_moveTargetWidth','1625570tTRlaQ','postFlushTextState','Game_Map_setupEvents','Window_ChoiceList_updatePlacement','messageCoreTextSpeed','exec','text','hEtST','innerHeight','isArmor','addMessageCoreTextSpeedCommand','Window_Message_newPage','loadPicture','normalColor','anchorPictureText','\x5c%1','AddAutoColor','AutoColorBypassList','min','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','createTextState','EVAL','WRAPBREAK','processFsTextCode','synchronizeNameBox','JSON','TtWJu','hasPictureText','exshf','6iHaPaZ','length','ActionJS','processControlCharacter','BqWbM','requestPictureTextRefresh','IeEAP','maxFontSizeInLine','TextCodeReplace','_moveDuration','ConvertParams','convertButtonAssistText','drawing','messageCoreWindowX','pageup','processAutoPosition','anchor','_autoColorActorNames','status','makeFontBigger'];_0x2c9a=function(){return _0x1ce0be;};return _0x2c9a();}function _0x4946(_0xb26581,_0x43b69f){const _0x2c9a66=_0x2c9a();return _0x4946=function(_0x494634,_0x5e4d8b){_0x494634=_0x494634-0x1c6;let _0x2494d2=_0x2c9a66[_0x494634];return _0x2494d2;},_0x4946(_0xb26581,_0x43b69f);}const _0x248ad4=_0x4946;(function(_0x1ffc94,_0x4589f7){const _0xd4d8c6=_0x4946,_0x44aa42=_0x1ffc94();while(!![]){try{const _0x27e292=-parseInt(_0xd4d8c6(0x314))/0x1*(-parseInt(_0xd4d8c6(0x35d))/0x2)+-parseInt(_0xd4d8c6(0x280))/0x3*(-parseInt(_0xd4d8c6(0x412))/0x4)+parseInt(_0xd4d8c6(0x329))/0x5*(-parseInt(_0xd4d8c6(0x1cc))/0x6)+-parseInt(_0xd4d8c6(0x397))/0x7*(parseInt(_0xd4d8c6(0x373))/0x8)+parseInt(_0xd4d8c6(0x266))/0x9+parseInt(_0xd4d8c6(0x340))/0xa*(-parseInt(_0xd4d8c6(0x33b))/0xb)+parseInt(_0xd4d8c6(0x232))/0xc;if(_0x27e292===_0x4589f7)break;else _0x44aa42['push'](_0x44aa42['shift']());}catch(_0x221c3f){_0x44aa42['push'](_0x44aa42['shift']());}}}(_0x2c9a,0x2a7cc));var label=_0x248ad4(0x402),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x248ad4(0x3c0)](function(_0x4ed3ad){const _0x18538a=_0x248ad4;return _0x4ed3ad[_0x18538a(0x36f)]&&_0x4ed3ad['description']['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x248ad4(0x417)]||{},VisuMZ[_0x248ad4(0x367)]=function(_0xc297d,_0x110cfc){const _0x495358=_0x248ad4;for(const _0x21317a in _0x110cfc){if(_0x21317a[_0x495358(0x32c)](/(.*):(.*)/i)){if(_0x495358(0x472)!==_0x495358(0x472))_0x5c0289[_0x495358(0x402)]['Window_Options_addGeneralOptions'][_0x495358(0x2a9)](this),this[_0x495358(0x423)]();else{const _0x40bab9=String(RegExp['$1']),_0x193f80=String(RegExp['$2'])[_0x495358(0x247)]()['trim']();let _0x8b7675,_0x1b264c,_0x4ecea3;switch(_0x193f80){case _0x495358(0x40f):_0x8b7675=_0x110cfc[_0x21317a]!==''?Number(_0x110cfc[_0x21317a]):0x0;break;case _0x495358(0x313):_0x1b264c=_0x110cfc[_0x21317a]!==''?JSON[_0x495358(0x221)](_0x110cfc[_0x21317a]):[],_0x8b7675=_0x1b264c['map'](_0x3c5eac=>Number(_0x3c5eac));break;case _0x495358(0x355):_0x8b7675=_0x110cfc[_0x21317a]!==''?eval(_0x110cfc[_0x21317a]):null;break;case'ARRAYEVAL':_0x1b264c=_0x110cfc[_0x21317a]!==''?JSON[_0x495358(0x221)](_0x110cfc[_0x21317a]):[],_0x8b7675=_0x1b264c[_0x495358(0x483)](_0x215e65=>eval(_0x215e65));break;case _0x495358(0x359):_0x8b7675=_0x110cfc[_0x21317a]!==''?JSON['parse'](_0x110cfc[_0x21317a]):'';break;case _0x495358(0x25c):_0x1b264c=_0x110cfc[_0x21317a]!==''?JSON[_0x495358(0x221)](_0x110cfc[_0x21317a]):[],_0x8b7675=_0x1b264c[_0x495358(0x483)](_0x57eab9=>JSON[_0x495358(0x221)](_0x57eab9));break;case _0x495358(0x291):_0x8b7675=_0x110cfc[_0x21317a]!==''?new Function(JSON[_0x495358(0x221)](_0x110cfc[_0x21317a])):new Function(_0x495358(0x261));break;case _0x495358(0x41f):_0x1b264c=_0x110cfc[_0x21317a]!==''?JSON['parse'](_0x110cfc[_0x21317a]):[],_0x8b7675=_0x1b264c[_0x495358(0x483)](_0x5618e7=>new Function(JSON[_0x495358(0x221)](_0x5618e7)));break;case _0x495358(0x2c3):_0x8b7675=_0x110cfc[_0x21317a]!==''?String(_0x110cfc[_0x21317a]):'';break;case'ARRAYSTR':_0x1b264c=_0x110cfc[_0x21317a]!==''?JSON[_0x495358(0x221)](_0x110cfc[_0x21317a]):[],_0x8b7675=_0x1b264c[_0x495358(0x483)](_0x36d908=>String(_0x36d908));break;case'STRUCT':_0x4ecea3=_0x110cfc[_0x21317a]!==''?JSON[_0x495358(0x221)](_0x110cfc[_0x21317a]):{},_0xc297d[_0x40bab9]={},VisuMZ['ConvertParams'](_0xc297d[_0x40bab9],_0x4ecea3);continue;case _0x495358(0x29b):_0x1b264c=_0x110cfc[_0x21317a]!==''?JSON['parse'](_0x110cfc[_0x21317a]):[],_0x8b7675=_0x1b264c['map'](_0x5a9d41=>VisuMZ[_0x495358(0x367)]({},JSON[_0x495358(0x221)](_0x5a9d41)));break;default:continue;}_0xc297d[_0x40bab9]=_0x8b7675;}}}return _0xc297d;},(_0x38079e=>{const _0x3ff2c9=_0x248ad4,_0xa808e7=_0x38079e[_0x3ff2c9(0x3f9)];for(const _0x10ef86 of dependencies){if(!Imported[_0x10ef86]){if(_0x3ff2c9(0x282)===_0x3ff2c9(0x282)){alert(_0x3ff2c9(0x411)[_0x3ff2c9(0x48b)](_0xa808e7,_0x10ef86)),SceneManager['exit']();break;}else return this[_0x3ff2c9(0x398)];}}const _0x4823d9=_0x38079e[_0x3ff2c9(0x39e)];if(_0x4823d9[_0x3ff2c9(0x32c)](/\[Version[ ](.*?)\]/i)){const _0x368f3f=Number(RegExp['$1']);if(_0x368f3f!==VisuMZ[label][_0x3ff2c9(0x2c5)]){if(_0x3ff2c9(0x228)===_0x3ff2c9(0x2ac))return this['processAutoSize'](_0x5a0ac3,!![],!![]),this[_0x3ff2c9(0x36c)](_0x3ff2c9(0x1ce),_0xb37dcb(_0x11628e)||0x0),'';else alert(_0x3ff2c9(0x1ff)['format'](_0xa808e7,_0x368f3f)),SceneManager[_0x3ff2c9(0x475)]();}}if(_0x4823d9[_0x3ff2c9(0x32c)](/\[Tier[ ](\d+)\]/i)){const _0xefa808=Number(RegExp['$1']);if(_0xefa808<tier){if(_0x3ff2c9(0x302)!==_0x3ff2c9(0x22b))alert(_0x3ff2c9(0x353)['format'](_0xa808e7,_0xefa808,tier)),SceneManager['exit']();else return!![];}else _0x3ff2c9(0x382)===_0x3ff2c9(0x454)?(_0x59e045[_0x3ff2c9(0x402)][_0x3ff2c9(0x1d2)][_0x3ff2c9(0x2a9)](this),this[_0x3ff2c9(0x3d2)]()):tier=Math['max'](_0xefa808,tier);}VisuMZ[_0x3ff2c9(0x367)](VisuMZ[label]['Settings'],_0x38079e[_0x3ff2c9(0x2c7)]);})(pluginData),PluginManager[_0x248ad4(0x47c)](pluginData[_0x248ad4(0x3f9)],_0x248ad4(0x2dd),_0x3e4dc5=>{const _0x21ec24=_0x248ad4;VisuMZ[_0x21ec24(0x367)](_0x3e4dc5,_0x3e4dc5);const _0x5ca942=_0x3e4dc5[_0x21ec24(0x452)]||$gameSystem[_0x21ec24(0x38c)]()||0x1,_0x512b23=_0x3e4dc5['MaxRows']||$gameSystem[_0x21ec24(0x3f6)]()||0x1,_0x4b6506=_0x3e4dc5['MaxCols']||$gameSystem[_0x21ec24(0x3bb)]()||0x1,_0x23e8fd=_0x3e4dc5[_0x21ec24(0x1c8)][_0x21ec24(0x4a5)]()||_0x21ec24(0x3d6);$gameSystem['setChoiceListLineHeight'](_0x5ca942),$gameSystem[_0x21ec24(0x3b0)](_0x512b23),$gameSystem[_0x21ec24(0x4b5)](_0x4b6506),$gameSystem[_0x21ec24(0x38d)](_0x23e8fd);}),PluginManager['registerCommand'](pluginData[_0x248ad4(0x3f9)],_0x248ad4(0x262),_0x4ca9bb=>{const _0x2f4b91=_0x248ad4;VisuMZ['ConvertParams'](_0x4ca9bb,_0x4ca9bb);const _0x44fe28=_0x4ca9bb[_0x2f4b91(0x1e5)]||$gameSystem[_0x2f4b91(0x23a)]()||0x1,_0x13c180=_0x4ca9bb['Width']||$gameSystem[_0x2f4b91(0x2ef)]()||0x1;$gameTemp[_0x2f4b91(0x2ad)]=!![];const _0x3b0645=_0x4ca9bb[_0x2f4b91(0x4af)][_0x2f4b91(0x4a5)]();$gameSystem['setMessageWindowRows'](_0x44fe28),$gameSystem[_0x2f4b91(0x273)](_0x13c180);if([_0x2f4b91(0x335),_0x2f4b91(0x43d)][_0x2f4b91(0x1cb)](_0x3b0645)){if('VATra'!=='VATra')return![];else $gameSystem[_0x2f4b91(0x463)](eval(_0x3b0645));}const _0x1d1555=SceneManager['_scene']['_messageWindow'];if(_0x1d1555){if(_0x2f4b91(0x429)!==_0x2f4b91(0x26e))_0x1d1555[_0x2f4b91(0x3de)](),_0x1d1555[_0x2f4b91(0x37e)](),_0x1d1555['createContents']();else{_0x4f4366[_0x2f4b91(0x402)][_0x2f4b91(0x327)]('TextCodeActions');for(const _0x477c99 of _0xb27fa3['MessageCore']['Settings'][_0x2f4b91(0x2ab)]){_0x477c99[_0x2f4b91(0x2f1)]=_0x477c99[_0x2f4b91(0x2f1)][_0x2f4b91(0x247)](),_0x477c99[_0x2f4b91(0x28e)]=new _0x48d1e6('\x1b'+_0x477c99[_0x2f4b91(0x2f1)],'gi'),_0x477c99['textCodeResult']='\x1b'+_0x477c99[_0x2f4b91(0x2f1)];if(_0x477c99['Type']==='')_0x477c99['textCodeResult']+=_0x2f4b91(0x29a);}}}}),PluginManager[_0x248ad4(0x47c)](pluginData[_0x248ad4(0x3f9)],_0x248ad4(0x1db),_0x3c06a2=>{const _0x4a63af=_0x248ad4;VisuMZ[_0x4a63af(0x367)](_0x3c06a2,_0x3c06a2),$gameSystem['setMessageWindowXyOffsets'](_0x3c06a2[_0x4a63af(0x393)],_0x3c06a2[_0x4a63af(0x46f)]);const _0x40bac9=SceneManager[_0x4a63af(0x2e4)][_0x4a63af(0x213)];if(_0x40bac9){if('PgnJT'===_0x4a63af(0x448))_0x40bac9[_0x4a63af(0x3de)](),_0x40bac9[_0x4a63af(0x37e)](),_0x40bac9[_0x4a63af(0x3b8)]();else{const _0x27def8=_0x5cc4e3[_0x4a63af(0x402)]['Settings'][_0x543032];_0x27def8['sort']((_0x1790b6,_0x45c9e5)=>{const _0x3d92a4=_0x4a63af;if(!_0x1790b6||!_0x45c9e5)return-0x1;return _0x45c9e5[_0x3d92a4(0x2f1)][_0x3d92a4(0x35e)]-_0x1790b6['Match']['length'];});}}}),PluginManager[_0x248ad4(0x47c)](pluginData[_0x248ad4(0x3f9)],'PictureTextChange',_0x529c3b=>{const _0x2241cc=_0x248ad4;VisuMZ[_0x2241cc(0x367)](_0x529c3b,_0x529c3b);const _0x5f5a0d=_0x529c3b[_0x2241cc(0x425)]||[],_0x2f3fd5=_0x529c3b[_0x2241cc(0x2d0)]||0x0,_0x48ded0=[_0x2241cc(0x46e),'up',_0x2241cc(0x39b),_0x2241cc(0x2eb),_0x2241cc(0x3cf),_0x2241cc(0x231),_0x2241cc(0x415),_0x2241cc(0x328),_0x2241cc(0x3c3)];for(const _0x4fb032 of _0x5f5a0d){if(_0x2241cc(0x1ea)!==_0x2241cc(0x47e)){$gameScreen['setPictureTextBuffer'](_0x4fb032,_0x2f3fd5);for(const _0x307577 of _0x48ded0){if(_0x2241cc(0x4a6)===_0x2241cc(0x4a6)){if(_0x529c3b[_0x307577]===undefined)continue;$gameScreen[_0x2241cc(0x3b6)](_0x4fb032,_0x529c3b[_0x307577],_0x307577);}else this[_0x2241cc(0x3fc)](this['_resetRect']['x'],this[_0x2241cc(0x458)]['y'],this[_0x2241cc(0x458)][_0x2241cc(0x48e)],this[_0x2241cc(0x458)]['height'],_0x112d72,_0x53b6e9);}}else{if(!this[_0x2241cc(0x2d9)])return;this[_0x2241cc(0x3ca)](),this[_0x2241cc(0x34e)](),this['drawPictureText'](),this[_0x2241cc(0x2b8)]();}}}),PluginManager['registerCommand'](pluginData[_0x248ad4(0x3f9)],_0x248ad4(0x267),_0x5e16a2=>{const _0x2a66ab=_0x248ad4;VisuMZ[_0x2a66ab(0x367)](_0x5e16a2,_0x5e16a2);const _0x5751e6=_0x5e16a2[_0x2a66ab(0x425)]||[];for(const _0x40cdc4 of _0x5751e6){if(_0x2a66ab(0x279)!==_0x2a66ab(0x279))return _0x7e2b80=_0x284b2f[_0x2a66ab(0x2db)](/<B>/gi,_0x2a66ab(0x211)),_0x6e1a52=_0x30d64e[_0x2a66ab(0x2db)](/<\/B>/gi,_0x2a66ab(0x28b)),_0x252aba=_0x5869bd[_0x2a66ab(0x2db)](/<I>/gi,_0x2a66ab(0x249)),_0x4a6635=_0xe9c066['replace'](/<\/I>/gi,_0x2a66ab(0x264)),_0x1310ac;else $gameScreen['eraseAllPictureTexts'](_0x40cdc4),$gameScreen['erasePictureTextBuffer'](_0x40cdc4);}}),PluginManager['registerCommand'](pluginData['name'],'PictureTextRefresh',_0x552451=>{const _0x2d5277=_0x248ad4;$gameScreen[_0x2d5277(0x3b4)]();}),VisuMZ[_0x248ad4(0x402)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x248ad4(0x32d)][_0x248ad4(0x223)],Scene_Boot['prototype'][_0x248ad4(0x223)]=function(){const _0x266a9c=_0x248ad4;VisuMZ['MessageCore'][_0x266a9c(0x1ee)][_0x266a9c(0x2a9)](this),this['process_VisuMZ_MessageCore_TextCodes_Action'](),this['process_VisuMZ_MessageCore_TextCodes_Replace'](),this[_0x266a9c(0x2d1)](),this['process_VisuMZ_MessageCore_AutoColor']();},VisuMZ[_0x248ad4(0x402)]['SortObjectByKeyLength']=function(_0x1a9b68){const _0x5a00b5=_0x248ad4,_0x18a62b=VisuMZ[_0x5a00b5(0x402)]['Settings'][_0x1a9b68];_0x18a62b[_0x5a00b5(0x1f1)]((_0x4a8d10,_0x3af92f)=>{const _0xf9997e=_0x5a00b5;if(!_0x4a8d10||!_0x3af92f)return-0x1;return _0x3af92f['Match']['length']-_0x4a8d10['Match'][_0xf9997e(0x35e)];});},Scene_Boot[_0x248ad4(0x32d)]['process_VisuMZ_MessageCore_TextCodes_Action']=function(){const _0x2091fd=_0x248ad4;VisuMZ[_0x2091fd(0x402)][_0x2091fd(0x327)]('TextCodeActions');for(const _0xee315f of VisuMZ[_0x2091fd(0x402)][_0x2091fd(0x417)][_0x2091fd(0x2ab)]){if('mwjGS'==='xAoNj')_0x862d02=_0x3ebe37||_0x5ec5c2['width'],_0xd2454c=_0x2d807b||_0x18b8b0[_0x2091fd(0x3c9)],this[_0x2091fd(0x27b)][_0x2091fd(0x1fa)]=_0x409667,this[_0x2091fd(0x27b)]['blt'](_0x2a59ce,0x0,0x0,_0x398661['width'],_0x392ff1[_0x2091fd(0x3c9)],_0x337a6b,_0x26cd2d,_0xcc29f7,_0x21a9e8),this[_0x2091fd(0x27b)]['paintOpacity']=0xff;else{_0xee315f[_0x2091fd(0x2f1)]=_0xee315f['Match']['toUpperCase'](),_0xee315f[_0x2091fd(0x28e)]=new RegExp('\x1b'+_0xee315f[_0x2091fd(0x2f1)],'gi'),_0xee315f['textCodeResult']='\x1b'+_0xee315f[_0x2091fd(0x2f1)];if(_0xee315f[_0x2091fd(0x3e5)]==='')_0xee315f[_0x2091fd(0x2b4)]+=_0x2091fd(0x29a);}}},Scene_Boot['prototype'][_0x248ad4(0x222)]=function(){const _0x5e8825=_0x248ad4;VisuMZ[_0x5e8825(0x402)]['SortObjectByKeyLength'](_0x5e8825(0x365));for(const _0x3c9f93 of VisuMZ[_0x5e8825(0x402)]['Settings'][_0x5e8825(0x365)]){_0x3c9f93[_0x5e8825(0x28e)]=new RegExp('\x1b'+_0x3c9f93['Match']+_0x3c9f93[_0x5e8825(0x3e5)],'gi');if(_0x3c9f93['TextStr']!==''&&_0x3c9f93[_0x5e8825(0x428)]!==_0x5e8825(0x418)){if('MqOgn'===_0x5e8825(0x278))return this[_0x5e8825(0x394)]()['list'];else _0x3c9f93[_0x5e8825(0x2b4)]=new Function(_0x5e8825(0x23c)+_0x3c9f93['TextStr'][_0x5e8825(0x2db)](/\\/g,'\x1b')+'\x27');}else'gWauV'!==_0x5e8825(0x33a)?this[_0x5e8825(0x383)][_0x5e8825(0x27e)]()?this[_0x5e8825(0x383)][_0x5e8825(0x1fe)]():this[_0x5e8825(0x3ef)]():_0x3c9f93[_0x5e8825(0x2b4)]=_0x3c9f93[_0x5e8825(0x43e)];}},Scene_Boot['prototype']['process_VisuMZ_MessageCore_TextMacros']=function(){const _0x333b75=_0x248ad4;for(const _0x175a4f of VisuMZ['MessageCore']['Settings'][_0x333b75(0x434)]){'rKacw'!==_0x333b75(0x28c)?this['textSpeed']=_0x3a5d3b[_0x333b75(0x402)][_0x333b75(0x417)]['TextSpeed'][_0x333b75(0x43a)]:(_0x175a4f[_0x333b75(0x28e)]=new RegExp('\x5c['+_0x175a4f[_0x333b75(0x2f1)]+'\x5c]','gi'),_0x175a4f[_0x333b75(0x428)]!==''&&_0x175a4f[_0x333b75(0x428)]!==_0x333b75(0x418)?_0x175a4f['textCodeResult']=new Function(_0x333b75(0x23c)+_0x175a4f['TextStr']['replace'](/\\/g,'\x1b')+'\x27'):_0x175a4f[_0x333b75(0x2b4)]=_0x175a4f[_0x333b75(0x43e)]);}},Scene_Boot[_0x248ad4(0x32d)][_0x248ad4(0x445)]=function(){const _0x128887=_0x248ad4,_0x25aa2f=VisuMZ[_0x128887(0x402)][_0x128887(0x417)][_0x128887(0x2d5)];!VisuMZ[_0x128887(0x27c)]&&(_0x128887(0x385)==='quDLw'?(this['x']=(_0x368136[_0x128887(0x421)]-this[_0x128887(0x48e)])/0x2,_0x3f684b['_centerMessageWindow']=_0x151512,this[_0x128887(0x31f)]()):(VisuMZ[_0x128887(0x402)][_0x128887(0x350)]($dataClasses,_0x25aa2f[_0x128887(0x1e1)]),VisuMZ['MessageCore'][_0x128887(0x350)]($dataSkills,_0x25aa2f[_0x128887(0x406)]),VisuMZ[_0x128887(0x402)][_0x128887(0x350)]($dataItems,_0x25aa2f[_0x128887(0x3c6)]),VisuMZ['MessageCore'][_0x128887(0x350)]($dataWeapons,_0x25aa2f[_0x128887(0x303)]),VisuMZ[_0x128887(0x402)]['AddAutoColor']($dataArmors,_0x25aa2f[_0x128887(0x4a1)]),VisuMZ[_0x128887(0x402)][_0x128887(0x350)]($dataEnemies,_0x25aa2f[_0x128887(0x2b0)]),VisuMZ[_0x128887(0x402)][_0x128887(0x350)]($dataStates,_0x25aa2f[_0x128887(0x316)]))),VisuMZ[_0x128887(0x402)][_0x128887(0x227)]();},VisuMZ['MessageCore'][_0x248ad4(0x351)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^','<B>',_0x248ad4(0x2d2),_0x248ad4(0x268),'</I>',_0x248ad4(0x3cc),_0x248ad4(0x320),_0x248ad4(0x2fb),'</CENTER>',_0x248ad4(0x495),_0x248ad4(0x2f4),'<COLORLOCK>',_0x248ad4(0x469),_0x248ad4(0x40e),')))',_0x248ad4(0x388),_0x248ad4(0x3fb),_0x248ad4(0x2c0),_0x248ad4(0x1f6),_0x248ad4(0x2aa),_0x248ad4(0x1eb),_0x248ad4(0x4ab),_0x248ad4(0x426),_0x248ad4(0x317),'HIDE',_0x248ad4(0x392),'DISABLE',_0x248ad4(0x3f5),_0x248ad4(0x336),_0x248ad4(0x4a3),_0x248ad4(0x226)],VisuMZ[_0x248ad4(0x402)]['AddAutoColor']=function(_0x445a37,_0x3611e4){const _0x564b7b=_0x248ad4;if(_0x3611e4<=0x0)return;const _0x1dc9e9=_0x445a37;for(const _0x2ab4fc of _0x1dc9e9){if(_0x564b7b(0x254)==='PtdMo'){_0x301716[_0x564b7b(0x402)][_0x564b7b(0x47d)][_0x564b7b(0x2a9)](this,_0x1aaa2a);const _0x516126=_0x3686ba[_0x564b7b(0x402)][_0x564b7b(0x417)][_0x564b7b(0x2d5)];_0x450955['MessageCore']['CreateAutoColorFor'](_0x4ce98b,_0x516126[_0x564b7b(0x2b0)]);}else{if(!_0x2ab4fc)continue;VisuMZ[_0x564b7b(0x402)][_0x564b7b(0x210)](_0x2ab4fc,_0x3611e4);}}},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x227)]=function(){const _0x471ab8=_0x248ad4;VisuMZ[_0x471ab8(0x402)]['AutoColorRegExp']=[];for(let _0x13c469=0x1;_0x13c469<=0x1f;_0x13c469++){const _0xccbdf0=_0x471ab8(0x2c4)[_0x471ab8(0x48b)](_0x13c469),_0x3e5a52=VisuMZ[_0x471ab8(0x402)][_0x471ab8(0x417)][_0x471ab8(0x2d5)][_0xccbdf0];_0x3e5a52['sort']((_0x3851c3,_0xb0ed30)=>{if(!_0x3851c3||!_0xb0ed30)return-0x1;return _0xb0ed30['length']-_0x3851c3['length'];}),this['CreateAutoColorRegExpListEntries'](_0x3e5a52,_0x13c469);}},VisuMZ['MessageCore'][_0x248ad4(0x3ae)]=function(_0x2b5b13,_0x190827){const _0x41f97c=_0x248ad4;for(const _0x32b2bc of _0x2b5b13){if(_0x41f97c(0x275)===_0x41f97c(0x275)){if(_0x32b2bc[_0x41f97c(0x35e)]<=0x0)continue;if(/^\d+$/[_0x41f97c(0x322)](_0x32b2bc))continue;let _0x2e4438=VisuMZ['MessageCore'][_0x41f97c(0x3c8)](_0x32b2bc);if(_0x32b2bc['match'](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g)){if(_0x41f97c(0x3b3)===_0x41f97c(0x477)){this[_0x41f97c(0x3a1)]=_0x57151c,this['_moveTargetY']=_0x1bab7a,this[_0x41f97c(0x33f)]=_0x48549f||this[_0x41f97c(0x48e)],this[_0x41f97c(0x37f)]=_0x26ae00||this[_0x41f97c(0x3c9)],this[_0x41f97c(0x366)]=_0x34b36a||0x1;if(this['_moveDuration']<=0x0)this[_0x41f97c(0x366)]=0x1;this[_0x41f97c(0x31e)]=this[_0x41f97c(0x366)],this[_0x41f97c(0x4a9)]=_0x30f354||0x0;if(_0x3a813d<=0x0)this[_0x41f97c(0x2a7)]();}else var _0x2a5e16=new RegExp(_0x2e4438,'i');}else var _0x2a5e16=new RegExp('\x5cb'+_0x2e4438+'\x5cb','g');VisuMZ['MessageCore'][_0x41f97c(0x3fe)]['push']([_0x2a5e16,_0x41f97c(0x400)[_0x41f97c(0x48b)](_0x190827,_0x32b2bc)]);}else return this[_0x41f97c(0x208)];}},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x3c8)]=function(_0x581c0e){const _0x495532=_0x248ad4;return _0x581c0e=_0x581c0e['replace'](/(\W)/gi,(_0x4e1e9b,_0x40b118)=>_0x495532(0x34f)[_0x495532(0x48b)](_0x40b118)),_0x581c0e;},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x315)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x248ad4(0x315)]=function(_0xa8ade){const _0x2a6fd3=_0x248ad4;VisuMZ[_0x2a6fd3(0x402)][_0x2a6fd3(0x315)]['call'](this,_0xa8ade);const _0x2f0795=VisuMZ[_0x2a6fd3(0x402)]['Settings']['AutoColor'];VisuMZ['MessageCore'][_0x2a6fd3(0x210)](_0xa8ade,_0x2f0795[_0x2a6fd3(0x1e1)]);},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x31d)]=VisuMZ[_0x248ad4(0x31d)],VisuMZ[_0x248ad4(0x31d)]=function(_0x5976da){const _0x15533d=_0x248ad4;VisuMZ[_0x15533d(0x402)][_0x15533d(0x31d)][_0x15533d(0x2a9)](this,_0x5976da);const _0x538efc=VisuMZ[_0x15533d(0x402)]['Settings'][_0x15533d(0x2d5)];VisuMZ[_0x15533d(0x402)][_0x15533d(0x210)](_0x5976da,_0x538efc[_0x15533d(0x406)]);},0x7,VisuMZ[_0x248ad4(0x402)]['ParseItemNotetags']=VisuMZ[_0x248ad4(0x3d3)],VisuMZ[_0x248ad4(0x3d3)]=function(_0x507688){const _0x253f34=_0x248ad4;VisuMZ[_0x253f34(0x402)]['ParseItemNotetags']['call'](this,_0x507688);const _0x1cee79=VisuMZ[_0x253f34(0x402)][_0x253f34(0x417)]['AutoColor'];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x507688,_0x1cee79[_0x253f34(0x3c6)]);},VisuMZ['MessageCore'][_0x248ad4(0x473)]=VisuMZ['ParseWeaponNotetags'],VisuMZ['ParseWeaponNotetags']=function(_0x590a88){const _0x5f31b9=_0x248ad4;VisuMZ[_0x5f31b9(0x402)][_0x5f31b9(0x473)][_0x5f31b9(0x2a9)](this,_0x590a88);const _0x3206fc=VisuMZ[_0x5f31b9(0x402)][_0x5f31b9(0x417)]['AutoColor'];VisuMZ[_0x5f31b9(0x402)][_0x5f31b9(0x210)](_0x590a88,_0x3206fc['Weapons']);},VisuMZ[_0x248ad4(0x402)]['ParseArmorNotetags']=VisuMZ[_0x248ad4(0x1e7)],VisuMZ[_0x248ad4(0x1e7)]=function(_0x2ba711){const _0x425431=_0x248ad4;VisuMZ[_0x425431(0x402)][_0x425431(0x1e7)][_0x425431(0x2a9)](this,_0x2ba711);const _0x2b6d95=VisuMZ[_0x425431(0x402)][_0x425431(0x417)][_0x425431(0x2d5)];VisuMZ[_0x425431(0x402)][_0x425431(0x210)](_0x2ba711,_0x2b6d95[_0x425431(0x4a1)]);},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x47d)]=VisuMZ[_0x248ad4(0x47d)],VisuMZ[_0x248ad4(0x47d)]=function(_0xc75522){const _0x5953c9=_0x248ad4;VisuMZ[_0x5953c9(0x402)][_0x5953c9(0x47d)][_0x5953c9(0x2a9)](this,_0xc75522);const _0xa34ff=VisuMZ['MessageCore'][_0x5953c9(0x417)][_0x5953c9(0x2d5)];VisuMZ[_0x5953c9(0x402)][_0x5953c9(0x210)](_0xc75522,_0xa34ff[_0x5953c9(0x2b0)]);},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x42b)]=VisuMZ[_0x248ad4(0x42b)],VisuMZ[_0x248ad4(0x42b)]=function(_0x317c08){const _0x33fcae=_0x248ad4;VisuMZ['MessageCore'][_0x33fcae(0x42b)]['call'](this,_0x317c08);const _0x11a20c=VisuMZ[_0x33fcae(0x402)][_0x33fcae(0x417)][_0x33fcae(0x2d5)];VisuMZ[_0x33fcae(0x402)]['CreateAutoColorFor'](_0x317c08,_0x11a20c[_0x33fcae(0x316)]);},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x210)]=function(_0x4ce170,_0x2e7efb){const _0x35696f=_0x248ad4;if(_0x2e7efb<=0x0)return;const _0x74e02d=VisuMZ['MessageCore'][_0x35696f(0x417)][_0x35696f(0x2d5)]['TextColor'+_0x2e7efb];let _0x2c93f9=_0x4ce170[_0x35696f(0x3f9)][_0x35696f(0x4b9)]();if(/^\d+$/[_0x35696f(0x322)](_0x2c93f9))return;if(VisuMZ[_0x35696f(0x402)]['AutoColorBypassList']['includes'](_0x2c93f9['toUpperCase']()))return;_0x2c93f9=_0x2c93f9[_0x35696f(0x2db)](/\\I\[(\d+)\]/gi,''),_0x2c93f9=_0x2c93f9[_0x35696f(0x2db)](/\x1bI\[(\d+)\]/gi,'');if(_0x2c93f9[_0x35696f(0x35e)]<=0x0)return;if(_0x2c93f9[_0x35696f(0x32c)](/-----/i))return;_0x74e02d[_0x35696f(0x1c6)](_0x2c93f9);},SceneManager[_0x248ad4(0x293)]=function(){const _0x17e4eb=_0x248ad4;return this['_scene']&&this[_0x17e4eb(0x2e4)]['constructor']===Scene_Battle;},SceneManager[_0x248ad4(0x3e4)]=function(){const _0x23ac59=_0x248ad4;return this[_0x23ac59(0x2e4)]&&this['_scene'][_0x23ac59(0x40b)]===Scene_Map;},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x218)]=TextManager['message'],TextManager['message']=function(_0x325a7d){const _0x2d0f2f=_0x248ad4,_0x1cc391=[_0x2d0f2f(0x20c),_0x2d0f2f(0x1e0),_0x2d0f2f(0x28d),_0x2d0f2f(0x1cd),_0x2d0f2f(0x2a8),_0x2d0f2f(0x30a),_0x2d0f2f(0x403),_0x2d0f2f(0x44b),_0x2d0f2f(0x2f6),_0x2d0f2f(0x41a)];let _0x52486e=VisuMZ[_0x2d0f2f(0x402)][_0x2d0f2f(0x218)]['call'](this,_0x325a7d);return _0x1cc391[_0x2d0f2f(0x1cb)](_0x325a7d)&&(_0x52486e='</WORDWRAP>'+_0x52486e),_0x52486e;},ConfigManager[_0x248ad4(0x298)]=VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x417)][_0x248ad4(0x32a)][_0x248ad4(0x43a)],VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x25e)]=ConfigManager[_0x248ad4(0x433)],ConfigManager[_0x248ad4(0x433)]=function(){const _0x7ee294=_0x248ad4,_0x3f4f2c=VisuMZ[_0x7ee294(0x402)][_0x7ee294(0x25e)]['call'](this);return _0x3f4f2c[_0x7ee294(0x298)]=this[_0x7ee294(0x298)],_0x3f4f2c;},VisuMZ['MessageCore'][_0x248ad4(0x377)]=ConfigManager[_0x248ad4(0x2fc)],ConfigManager['applyData']=function(_0x31f86c){const _0x3e64af=_0x248ad4;VisuMZ[_0x3e64af(0x402)][_0x3e64af(0x377)][_0x3e64af(0x2a9)](this,_0x31f86c);if('textSpeed'in _0x31f86c)this[_0x3e64af(0x298)]=Number(_0x31f86c['textSpeed'])[_0x3e64af(0x43f)](0x1,0xb);else{if(_0x3e64af(0x24c)==='ZYDOw'){let _0x16cc2a=this['currentCommand']()['parameters'][0x0];_0x16cc2a=_0x420d0c['MessageCore'][_0x3e64af(0x474)](_0x16cc2a),_0x3d9043[_0x3e64af(0x1fc)](_0x16cc2a);}else this[_0x3e64af(0x298)]=VisuMZ[_0x3e64af(0x402)][_0x3e64af(0x417)][_0x3e64af(0x32a)]['Default'];}},TextManager[_0x248ad4(0x344)]=VisuMZ['MessageCore'][_0x248ad4(0x417)][_0x248ad4(0x32a)][_0x248ad4(0x485)],TextManager['instantTextSpeed']=VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x417)]['TextSpeed'][_0x248ad4(0x201)],VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x45c)]=Game_System[_0x248ad4(0x32d)][_0x248ad4(0x260)],Game_System[_0x248ad4(0x32d)][_0x248ad4(0x260)]=function(){const _0x4aed49=_0x248ad4;VisuMZ[_0x4aed49(0x402)][_0x4aed49(0x45c)][_0x4aed49(0x2a9)](this),this[_0x4aed49(0x43b)]();},Game_System[_0x248ad4(0x32d)][_0x248ad4(0x43b)]=function(){const _0x3b04d7=_0x248ad4,_0x944038=VisuMZ[_0x3b04d7(0x402)]['Settings'][_0x3b04d7(0x2fd)],_0x4aa89a=VisuMZ[_0x3b04d7(0x402)]['Settings'][_0x3b04d7(0x4af)];this[_0x3b04d7(0x486)]={'messageRows':_0x944038[_0x3b04d7(0x464)],'messageWidth':_0x944038['MessageWidth'],'messageWordWrap':_0x4aa89a[_0x3b04d7(0x44f)],'helpWordWrap':_0x4aa89a[_0x3b04d7(0x413)],'choiceLineHeight':_0x944038[_0x3b04d7(0x3d5)],'choiceRows':_0x944038['ChoiceWindowMaxRows'],'choiceCols':_0x944038['ChoiceWindowMaxCols'],'choiceTextAlign':_0x944038['ChoiceWindowTextAlign']},this[_0x3b04d7(0x2cf)]===undefined&&(this[_0x3b04d7(0x2cf)]=_0x944038['MsgWindowOffsetX'],this[_0x3b04d7(0x2c2)]=_0x944038[_0x3b04d7(0x484)]);},Game_System[_0x248ad4(0x32d)][_0x248ad4(0x23a)]=function(){const _0x2c35b7=_0x248ad4;if(this[_0x2c35b7(0x486)]===undefined)this[_0x2c35b7(0x43b)]();if(this[_0x2c35b7(0x486)][_0x2c35b7(0x45b)]===undefined)this[_0x2c35b7(0x43b)]();return this[_0x2c35b7(0x486)][_0x2c35b7(0x45b)];},Game_System[_0x248ad4(0x32d)][_0x248ad4(0x38a)]=function(_0x369135){const _0x1e6f9f=_0x248ad4;if(this['_MessageCoreSettings']===undefined)this[_0x1e6f9f(0x43b)]();if(this[_0x1e6f9f(0x486)][_0x1e6f9f(0x45b)]===undefined)this[_0x1e6f9f(0x43b)]();this[_0x1e6f9f(0x486)]['messageRows']=_0x369135||0x1;},Game_System['prototype'][_0x248ad4(0x2ef)]=function(){const _0x61b9db=_0x248ad4;if(this[_0x61b9db(0x486)]===undefined)this['initMessageCore']();if(this[_0x61b9db(0x486)][_0x61b9db(0x2bb)]===undefined)this['initMessageCore']();return this[_0x61b9db(0x486)][_0x61b9db(0x2bb)];},Game_System[_0x248ad4(0x32d)]['setMessageWindowWidth']=function(_0x3262f4){const _0x46ffde=_0x248ad4;if(this[_0x46ffde(0x486)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x46ffde(0x2bb)]===undefined)this[_0x46ffde(0x43b)]();_0x3262f4=Math[_0x46ffde(0x245)](_0x3262f4);if(_0x3262f4%0x2!==0x0)_0x3262f4+=0x1;this['_MessageCoreSettings'][_0x46ffde(0x2bb)]=_0x3262f4||0x2;},Game_System['prototype'][_0x248ad4(0x2e3)]=function(){const _0x1dd74b=_0x248ad4;if(this[_0x1dd74b(0x486)]===undefined)this[_0x1dd74b(0x43b)]();if(this['_MessageCoreSettings'][_0x1dd74b(0x2cc)]===undefined)this[_0x1dd74b(0x43b)]();return this[_0x1dd74b(0x486)][_0x1dd74b(0x2cc)];},Game_System[_0x248ad4(0x32d)]['setMessageWindowWordWrap']=function(_0x1bee64){const _0x52d0e9=_0x248ad4;if(this[_0x52d0e9(0x486)]===undefined)this[_0x52d0e9(0x43b)]();if(this[_0x52d0e9(0x486)][_0x52d0e9(0x2cc)]===undefined)this['initMessageCore']();this[_0x52d0e9(0x486)][_0x52d0e9(0x2cc)]=_0x1bee64;},Game_System[_0x248ad4(0x32d)]['getMessageWindowXyOffsets']=function(){const _0x59f553=_0x248ad4;if(this[_0x59f553(0x2cf)]===undefined){const _0x40ceda=VisuMZ['MessageCore'][_0x59f553(0x417)][_0x59f553(0x2fd)];this['_messageOffsetX']=_0x40ceda[_0x59f553(0x225)],this[_0x59f553(0x2c2)]=_0x40ceda[_0x59f553(0x484)];}return{'x':this['_messageOffsetX']||0x0,'y':this[_0x59f553(0x2c2)]||0x0};},Game_System['prototype'][_0x248ad4(0x1de)]=function(_0x224364,_0x2dfd50){const _0x9c2e23=_0x248ad4;if(this[_0x9c2e23(0x486)]===undefined)this[_0x9c2e23(0x43b)]();this['_messageOffsetX']=_0x224364,this[_0x9c2e23(0x2c2)]=_0x2dfd50;},Game_System['prototype'][_0x248ad4(0x217)]=function(){const _0x5aaea3=_0x248ad4;if(this[_0x5aaea3(0x486)]===undefined)this[_0x5aaea3(0x43b)]();if(this[_0x5aaea3(0x486)][_0x5aaea3(0x30d)]===undefined)this['initMessageCore']();return this[_0x5aaea3(0x486)][_0x5aaea3(0x30d)];},Game_System[_0x248ad4(0x32d)]['setHelpWindowWordWrap']=function(_0xf9a133){const _0x583125=_0x248ad4;if(this[_0x583125(0x486)]===undefined)this['initMessageCore']();if(this[_0x583125(0x486)][_0x583125(0x30d)]===undefined)this[_0x583125(0x43b)]();this[_0x583125(0x486)]['helpWordWrap']=_0xf9a133;},Game_System[_0x248ad4(0x32d)][_0x248ad4(0x38c)]=function(){const _0x67c36d=_0x248ad4;if(this[_0x67c36d(0x486)]===undefined)this[_0x67c36d(0x43b)]();if(this[_0x67c36d(0x486)][_0x67c36d(0x3c2)]===undefined)this[_0x67c36d(0x43b)]();return this[_0x67c36d(0x486)][_0x67c36d(0x3c2)];},Game_System[_0x248ad4(0x32d)][_0x248ad4(0x23d)]=function(_0x1280d8){const _0x4ec8ae=_0x248ad4;if(this[_0x4ec8ae(0x486)]===undefined)this[_0x4ec8ae(0x43b)]();if(this[_0x4ec8ae(0x486)][_0x4ec8ae(0x3c2)]===undefined)this[_0x4ec8ae(0x43b)]();this[_0x4ec8ae(0x486)][_0x4ec8ae(0x3c2)]=_0x1280d8||0x1;},Game_System[_0x248ad4(0x32d)][_0x248ad4(0x3f6)]=function(){const _0x2e54e2=_0x248ad4;if(this[_0x2e54e2(0x486)]===undefined)this[_0x2e54e2(0x43b)]();if(this[_0x2e54e2(0x486)][_0x2e54e2(0x306)]===undefined)this[_0x2e54e2(0x43b)]();return this[_0x2e54e2(0x486)][_0x2e54e2(0x306)];},Game_System[_0x248ad4(0x32d)][_0x248ad4(0x3b0)]=function(_0x3c4d5e){const _0x1831d7=_0x248ad4;if(this['_MessageCoreSettings']===undefined)this[_0x1831d7(0x43b)]();if(this[_0x1831d7(0x486)][_0x1831d7(0x306)]===undefined)this[_0x1831d7(0x43b)]();this['_MessageCoreSettings']['choiceRows']=_0x3c4d5e||0x1;},Game_System[_0x248ad4(0x32d)][_0x248ad4(0x3bb)]=function(){const _0x1222a9=_0x248ad4;if(this[_0x1222a9(0x486)]===undefined)this[_0x1222a9(0x43b)]();if(this[_0x1222a9(0x486)][_0x1222a9(0x21f)]===undefined)this[_0x1222a9(0x43b)]();return this[_0x1222a9(0x486)][_0x1222a9(0x21f)];},Game_System[_0x248ad4(0x32d)][_0x248ad4(0x4b5)]=function(_0xfdc123){const _0x1ba65c=_0x248ad4;if(this[_0x1ba65c(0x486)]===undefined)this[_0x1ba65c(0x43b)]();if(this['_MessageCoreSettings'][_0x1ba65c(0x21f)]===undefined)this[_0x1ba65c(0x43b)]();this[_0x1ba65c(0x486)][_0x1ba65c(0x21f)]=_0xfdc123||0x1;},Game_System['prototype'][_0x248ad4(0x440)]=function(){const _0x396746=_0x248ad4;if(this[_0x396746(0x486)]===undefined)this[_0x396746(0x43b)]();if(this['_MessageCoreSettings'][_0x396746(0x251)]===undefined)this['initMessageCore']();return this[_0x396746(0x486)]['choiceTextAlign'];},Game_System['prototype'][_0x248ad4(0x38d)]=function(_0xd90862){const _0x7abffa=_0x248ad4;if(this['_MessageCoreSettings']===undefined)this[_0x7abffa(0x43b)]();if(this[_0x7abffa(0x486)][_0x7abffa(0x251)]===undefined)this[_0x7abffa(0x43b)]();this[_0x7abffa(0x486)][_0x7abffa(0x251)]=_0xd90862[_0x7abffa(0x4a5)]();},VisuMZ[_0x248ad4(0x402)]['Game_Screen_clearPictures']=Game_Screen[_0x248ad4(0x32d)][_0x248ad4(0x24d)],Game_Screen[_0x248ad4(0x32d)]['clearPictures']=function(){const _0x149230=_0x248ad4;VisuMZ[_0x149230(0x402)][_0x149230(0x1d4)][_0x149230(0x2a9)](this),this[_0x149230(0x29f)]();},Game_Screen[_0x248ad4(0x32d)]['clearAllPictureTexts']=function(){const _0x389d00=_0x248ad4;this[_0x389d00(0x4b7)]=[],this[_0x389d00(0x2e7)]=[],this[_0x389d00(0x420)]=[];},Game_Screen[_0x248ad4(0x32d)][_0x248ad4(0x323)]=function(_0x460abb){const _0x4071eb=_0x248ad4;if(this[_0x4071eb(0x4b7)]===undefined)this[_0x4071eb(0x29f)]();const _0x1f67a8=this[_0x4071eb(0x3dd)](_0x460abb);return this[_0x4071eb(0x4b7)][_0x1f67a8]=this[_0x4071eb(0x4b7)][_0x1f67a8]||{},this[_0x4071eb(0x4b7)][_0x1f67a8];},Game_Screen[_0x248ad4(0x32d)][_0x248ad4(0x309)]=function(_0x378be0,_0x49ab54){const _0x1f983b=_0x248ad4;return _0x49ab54=_0x49ab54[_0x1f983b(0x4a5)]()['trim'](),this[_0x1f983b(0x323)](_0x378be0)[_0x49ab54]||'';},Game_Screen['prototype'][_0x248ad4(0x3b6)]=function(_0x4b6473,_0x35e417,_0x583e5e){const _0xe85f70=_0x248ad4;_0x583e5e=_0x583e5e[_0xe85f70(0x4a5)]()[_0xe85f70(0x4b9)](),this['getPictureTextData'](_0x4b6473)[_0x583e5e]=_0x35e417||'',this[_0xe85f70(0x362)](_0x4b6473,!![]);},Game_Screen[_0x248ad4(0x32d)][_0x248ad4(0x2a6)]=function(_0x2c4732){const _0x3e2c4a=_0x248ad4;if(this[_0x3e2c4a(0x4b7)]===undefined)this[_0x3e2c4a(0x29f)]();const _0x2ce0b6=this[_0x3e2c4a(0x3dd)](_0x2c4732);this['_pictureText'][_0x2ce0b6]=null,this['requestPictureTextRefresh'](_0x2c4732,!![]);},Game_Screen[_0x248ad4(0x32d)]['getPictureTextBuffer']=function(_0x131fb2){const _0x50b774=_0x248ad4;if(this['_pictureText']===undefined)this['clearAllPictureTexts']();const _0x5f6cc6=this['realPictureId'](_0x131fb2);return this[_0x50b774(0x2e7)][_0x5f6cc6]||0x0;},Game_Screen[_0x248ad4(0x32d)][_0x248ad4(0x2bc)]=function(_0x2f3db8,_0x2c9781){const _0x5d8ee7=_0x248ad4;if(this['_pictureText']===undefined)this[_0x5d8ee7(0x29f)]();const _0x54089f=this['realPictureId'](_0x2f3db8);this[_0x5d8ee7(0x2e7)][_0x54089f]=Math['max'](0x0,_0x2c9781);},Game_Screen[_0x248ad4(0x32d)][_0x248ad4(0x39f)]=function(_0x5377cc){const _0x498627=_0x248ad4;if(this[_0x498627(0x4b7)]===undefined)this[_0x498627(0x29f)]();const _0x3d0529=this[_0x498627(0x3dd)](_0x5377cc);this[_0x498627(0x2e7)][_0x3d0529]=undefined;},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x2d6)]=Game_Screen['prototype'][_0x248ad4(0x1ec)],Game_Screen[_0x248ad4(0x32d)][_0x248ad4(0x1ec)]=function(_0x5c210c){const _0x2b7545=_0x248ad4;VisuMZ[_0x2b7545(0x402)][_0x2b7545(0x2d6)]['call'](this,_0x5c210c),this[_0x2b7545(0x2a6)](_0x5c210c),this[_0x2b7545(0x39f)](_0x5c210c),this[_0x2b7545(0x362)](_0x5c210c,!![]);},Game_Screen['prototype']['requestPictureTextRefreshAll']=function(){const _0x24659b=_0x248ad4;for(const _0x1586ea of this[_0x24659b(0x49f)]){if('WjVLi'===_0x24659b(0x205))this[_0x24659b(0x370)]();else{if(_0x1586ea){let _0x1daf3f=this[_0x24659b(0x49f)][_0x24659b(0x21c)](_0x1586ea);this[_0x24659b(0x362)](_0x1daf3f);}}}},Game_Screen['prototype'][_0x248ad4(0x362)]=function(_0x1c1ff2,_0x4af2bb){const _0xdba799=_0x248ad4;this[_0xdba799(0x420)]=this[_0xdba799(0x420)]||[];if(this[_0xdba799(0x35b)](_0x1c1ff2)||_0x4af2bb){if(_0xdba799(0x467)!==_0xdba799(0x467)){let _0x225b7f='';if(_0x4bcc99)_0x225b7f+=_0xdba799(0x1df)[_0xdba799(0x48b)](_0x17bb21[_0xdba799(0x321)]()[_0xdba799(0x493)]);return _0x225b7f+=_0x4c0ec3['item']()[_0xdba799(0x3f9)],_0x225b7f;}else this[_0xdba799(0x420)][_0xdba799(0x1c6)](_0x1c1ff2);}},Game_Screen['prototype'][_0x248ad4(0x20a)]=function(_0x1b53f0){const _0xa70fe2=_0x248ad4;return this[_0xa70fe2(0x420)]=this[_0xa70fe2(0x420)]||[],this['_pictureTextRefresh'][_0xa70fe2(0x1cb)](_0x1b53f0);},Game_Screen['prototype']['clearPictureTextRefresh']=function(_0x5ec962){const _0x2b20d9=_0x248ad4;this['_pictureTextRefresh']=this['_pictureTextRefresh']||[],this[_0x2b20d9(0x420)][_0x2b20d9(0x2a2)](_0x5ec962);},Game_Screen[_0x248ad4(0x32d)][_0x248ad4(0x35b)]=function(_0x2931ea){const _0x216c12=_0x248ad4,_0x1ebf02=[_0x216c12(0x46e),'up',_0x216c12(0x39b),'left',_0x216c12(0x3cf),_0x216c12(0x231),'lowerleft',_0x216c12(0x328),_0x216c12(0x3c3)];return _0x1ebf02[_0x216c12(0x391)](_0x35ca17=>this[_0x216c12(0x309)](_0x2931ea,_0x35ca17)!=='');},VisuMZ[_0x248ad4(0x402)]['Game_Party_initialize']=Game_Party[_0x248ad4(0x32d)][_0x248ad4(0x260)],Game_Party['prototype'][_0x248ad4(0x260)]=function(){const _0x146ab9=_0x248ad4;VisuMZ['MessageCore'][_0x146ab9(0x237)][_0x146ab9(0x2a9)](this),this[_0x146ab9(0x43b)]();},Game_Party[_0x248ad4(0x32d)][_0x248ad4(0x43b)]=function(){const _0x7638db=_0x248ad4;this[_0x7638db(0x3aa)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x248ad4(0x32d)][_0x248ad4(0x3f7)]=function(){const _0x52e784=_0x248ad4;if(this[_0x52e784(0x3aa)]===undefined)this[_0x52e784(0x43b)]();return this['_lastGainedItemData'];},Game_Party[_0x248ad4(0x32d)]['setLastGainedItemData']=function(_0x58e2ae,_0x109965){const _0x1ac283=_0x248ad4;if(this[_0x1ac283(0x3aa)]===undefined)this[_0x1ac283(0x43b)]();if(!_0x58e2ae)return;if(DataManager[_0x1ac283(0x3dc)](_0x58e2ae)){if('IsFXP'!=='zxqLi')this['_lastGainedItemData'][_0x1ac283(0x235)]=0x0;else{const _0x4f610c=_0x25eab3['$1'][_0x1ac283(0x20d)](',')[_0x1ac283(0x483)](_0x2ca5fb=>_0x150f65(_0x2ca5fb)||0x0);for(const _0x327c88 of _0x4f610c){if(!_0x25df4d[_0x1ac283(0x3db)](_0x327c88))return!![];}return![];}}else{if(DataManager[_0x1ac283(0x457)](_0x58e2ae))_0x1ac283(0x347)===_0x1ac283(0x224)?(this[_0x1ac283(0x4b7)]=[],this[_0x1ac283(0x2e7)]=[],this[_0x1ac283(0x420)]=[]):this['_lastGainedItemData'][_0x1ac283(0x235)]=0x1;else DataManager[_0x1ac283(0x349)](_0x58e2ae)&&(this[_0x1ac283(0x3aa)]['type']=0x2);}this[_0x1ac283(0x3aa)]['id']=_0x58e2ae['id'],this['_lastGainedItemData']['quantity']=_0x109965;},VisuMZ['MessageCore'][_0x248ad4(0x270)]=Game_Party[_0x248ad4(0x32d)][_0x248ad4(0x3cb)],Game_Party[_0x248ad4(0x32d)][_0x248ad4(0x3cb)]=function(_0x13de3c,_0x19dcc7,_0x57c27d){const _0x3290ff=_0x248ad4;VisuMZ['MessageCore']['Game_Party_gainItem']['call'](this,_0x13de3c,_0x19dcc7,_0x57c27d);if(_0x19dcc7>0x0){if(_0x3290ff(0x363)==='MpnYd')for(const _0x562958 of _0x289ed3[_0x3290ff(0x402)][_0x3290ff(0x417)][_0x3290ff(0x434)]){_0x562958[_0x3290ff(0x28e)]=new _0x55c96c('\x5c['+_0x562958[_0x3290ff(0x2f1)]+'\x5c]','gi'),_0x562958['TextStr']!==''&&_0x562958[_0x3290ff(0x428)]!==_0x3290ff(0x418)?_0x562958[_0x3290ff(0x2b4)]=new _0x399177(_0x3290ff(0x23c)+_0x562958['TextStr'][_0x3290ff(0x2db)](/\\/g,'\x1b')+'\x27'):_0x562958[_0x3290ff(0x2b4)]=_0x562958['TextJS'];}else this[_0x3290ff(0x2a3)](_0x13de3c,_0x19dcc7);}},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x230)]=Game_Map[_0x248ad4(0x32d)][_0x248ad4(0x260)],Game_Map['prototype'][_0x248ad4(0x260)]=function(){const _0x10b691=_0x248ad4;VisuMZ[_0x10b691(0x402)][_0x10b691(0x230)][_0x10b691(0x2a9)](this),this[_0x10b691(0x23f)]=[];},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x342)]=Game_Map[_0x248ad4(0x32d)][_0x248ad4(0x3a0)],Game_Map[_0x248ad4(0x32d)][_0x248ad4(0x3a0)]=function(){const _0x2e8fc2=_0x248ad4;VisuMZ[_0x2e8fc2(0x402)]['Game_Map_setupEvents'][_0x2e8fc2(0x2a9)](this),this[_0x2e8fc2(0x23f)]=[];},VisuMZ['MessageCore'][_0x248ad4(0x44d)]=Game_Map[_0x248ad4(0x32d)][_0x248ad4(0x22f)],Game_Map[_0x248ad4(0x32d)][_0x248ad4(0x22f)]=function(){VisuMZ['MessageCore']['Game_Map_updateEvents']['call'](this),this['updateMessageCommonEvents']();},Game_Map[_0x248ad4(0x32d)][_0x248ad4(0x1c9)]=function(_0x12542d){const _0x28c85e=_0x248ad4;if(!$dataCommonEvents[_0x12542d])return;this[_0x28c85e(0x23f)]=this[_0x28c85e(0x23f)]||[];const _0x1c8e3a=this[_0x28c85e(0x383)]['_eventId'],_0x53baf9=new Game_MessageCommonEvent(_0x12542d,_0x1c8e3a);this[_0x28c85e(0x23f)][_0x28c85e(0x1c6)](_0x53baf9);},Game_Map[_0x248ad4(0x32d)][_0x248ad4(0x30f)]=function(){const _0x3789a8=_0x248ad4;this[_0x3789a8(0x23f)]=this[_0x3789a8(0x23f)]||[];for(const _0x1b9e67 of this[_0x3789a8(0x23f)]){!_0x1b9e67[_0x3789a8(0x383)]?this[_0x3789a8(0x23f)]['remove'](_0x1b9e67):_0x1b9e67[_0x3789a8(0x1fe)]();}},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x307)]=Game_Map[_0x248ad4(0x32d)][_0x248ad4(0x33c)],Game_Map[_0x248ad4(0x32d)][_0x248ad4(0x33c)]=function(){const _0x5a845d=_0x248ad4;VisuMZ[_0x5a845d(0x402)]['Game_Map_refresh'][_0x5a845d(0x2a9)](this),$gameScreen[_0x5a845d(0x3b4)]();},Game_Interpreter[_0x248ad4(0x32d)][_0x248ad4(0x3d4)]=function(_0x559e9e){const _0x323283=_0x248ad4;if($gameMessage[_0x323283(0x3a8)]())return![];return this['prepareShowTextCommand'](_0x559e9e),this['addContinuousShowTextCommands'](_0x559e9e),this['prepareShowTextFollowups'](_0x559e9e),this[_0x323283(0x259)](_0x323283(0x334)),!![];},Game_Interpreter[_0x248ad4(0x32d)][_0x248ad4(0x258)]=function(_0x5acab2){const _0x31fcdf=_0x248ad4;$gameMessage[_0x31fcdf(0x2b3)](_0x5acab2[0x0],_0x5acab2[0x1]),$gameMessage[_0x31fcdf(0x40c)](_0x5acab2[0x2]),$gameMessage[_0x31fcdf(0x442)](_0x5acab2[0x3]),$gameMessage[_0x31fcdf(0x43c)](_0x5acab2[0x4]);},Game_Interpreter[_0x248ad4(0x32d)][_0x248ad4(0x292)]=function(_0x3cc3ce){const _0x5802b6=_0x248ad4;while(this[_0x5802b6(0x3ad)]()){if(_0x5802b6(0x2af)==='nFcGM')return _0x377637['prototype'][_0x5802b6(0x2e1)][_0x5802b6(0x2a9)](this,_0x36cad4);else{this[_0x5802b6(0x2f0)]++;if(this[_0x5802b6(0x1fb)]()['code']===0x191){if(_0x5802b6(0x1c7)!==_0x5802b6(0x491)){let _0x9995ea=this['currentCommand']()[_0x5802b6(0x2c7)][0x0];_0x9995ea=VisuMZ['MessageCore']['ParseAddedText'](_0x9995ea),$gameMessage['add'](_0x9995ea);}else{_0x5397f3[_0x5802b6(0x402)]['ParseStateNotetags'][_0x5802b6(0x2a9)](this,_0x1acca7);const _0x47af1f=_0x2da768['MessageCore'][_0x5802b6(0x417)][_0x5802b6(0x2d5)];_0x113d48[_0x5802b6(0x402)]['CreateAutoColorFor'](_0x3e9e05,_0x47af1f[_0x5802b6(0x316)]);}}if(this[_0x5802b6(0x45f)]())break;}}},Game_Interpreter[_0x248ad4(0x32d)][_0x248ad4(0x3ad)]=function(){const _0xe498e6=_0x248ad4;if(this[_0xe498e6(0x2a4)]()===0x65&&$gameSystem[_0xe498e6(0x23a)]()>0x4)return!![];else{if('EvdNe'===_0xe498e6(0x2ca)){const _0x35a308=_0xb165d[_0xe498e6(0x3f7)]();if(_0x35a308['id']<0x0)return'';let _0x83e20=null;if(_0x35a308[_0xe498e6(0x235)]===0x0)_0x83e20=_0x2de68a[_0x35a308['id']];if(_0x35a308['type']===0x1)_0x83e20=_0x314ed9[_0x35a308['id']];if(_0x35a308[_0xe498e6(0x235)]===0x2)_0x83e20=_0x3d5202[_0x35a308['id']];if(!_0x83e20)return'';return _0x173f1b?_0xe498e6(0x1d6)['format'](_0x83e20[_0xe498e6(0x493)],_0x83e20[_0xe498e6(0x3f9)]):_0x83e20[_0xe498e6(0x3f9)];}else return this[_0xe498e6(0x2a4)]()===0x191;}},VisuMZ['MessageCore'][_0x248ad4(0x474)]=function(_0x36e704){return _0x36e704=_0x36e704['replace'](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x36e704;},Game_Interpreter[_0x248ad4(0x32d)][_0x248ad4(0x45f)]=function(){const _0x7f31de=_0x248ad4;if(this[_0x7f31de(0x1fb)]()&&this[_0x7f31de(0x1fb)]()['parameters'][0x0]['match'](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage['_texts'][_0x7f31de(0x35e)]>=$gameSystem['getMessageWindowRows']()&&this[_0x7f31de(0x2a4)]()!==0x191;},Game_Interpreter[_0x248ad4(0x32d)][_0x248ad4(0x44c)]=function(_0x514562){const _0x32061a=_0x248ad4;switch(this[_0x32061a(0x2a4)]()){case 0x66:this[_0x32061a(0x2f0)]++,this[_0x32061a(0x4b2)](this[_0x32061a(0x1fb)]()[_0x32061a(0x2c7)]);break;case 0x67:this[_0x32061a(0x2f0)]++,this[_0x32061a(0x2f5)](this[_0x32061a(0x1fb)]()['parameters']);break;case 0x68:this[_0x32061a(0x2f0)]++,this['setupItemChoice'](this[_0x32061a(0x1fb)]()[_0x32061a(0x2c7)]);break;}},VisuMZ['MessageCore'][_0x248ad4(0x202)]=Game_Interpreter[_0x248ad4(0x32d)]['setupChoices'],Game_Interpreter[_0x248ad4(0x32d)][_0x248ad4(0x4b2)]=function(_0x437b30){const _0x4f77c6=_0x248ad4;_0x437b30=this[_0x4f77c6(0x482)](),VisuMZ[_0x4f77c6(0x402)][_0x4f77c6(0x202)][_0x4f77c6(0x2a9)](this,_0x437b30);},Game_Interpreter[_0x248ad4(0x32d)]['addContinuousShowChoices']=function(){const _0x657578=_0x248ad4,_0x1e29e9=this['_index'],_0x2a3141=[];let _0x1976dc=0x0;this['_index']++;while(this[_0x657578(0x2f0)]<this[_0x657578(0x1fd)][_0x657578(0x35e)]){if(_0x657578(0x2e5)===_0x657578(0x4b6)){let _0x31d9dc=_0x45f8a8['ceil'](_0x4f19e3[_0x657578(0x3c9)]/this[_0x657578(0x3c7)]());_0xadca32[_0x657578(0x38a)](_0x31d9dc);}else{if(this['currentCommand']()['indent']===this['_indent']){if(this[_0x657578(0x1fb)]()[_0x657578(0x47b)]===0x194&&this[_0x657578(0x2a4)]()!==0x66){if('jsyCq'!==_0x657578(0x386))this[_0x657578(0x3aa)][_0x657578(0x235)]=0x0;else break;}else{if(this[_0x657578(0x1fb)]()[_0x657578(0x47b)]===0x66)this[_0x657578(0x1f4)](_0x1976dc,this[_0x657578(0x1fb)](),_0x1e29e9),this[_0x657578(0x2f0)]-=0x2;else this[_0x657578(0x1fb)]()['code']===0x192&&(this['currentCommand']()['parameters'][0x0]=_0x1976dc,_0x1976dc++);}}this[_0x657578(0x2f0)]++;}}return this[_0x657578(0x2f0)]=_0x1e29e9,this[_0x657578(0x1fb)]()[_0x657578(0x2c7)];},Game_Interpreter[_0x248ad4(0x32d)][_0x248ad4(0x1f4)]=function(_0x28d93a,_0x23edc4,_0x222091){const _0x1be8d5=_0x248ad4;this[_0x1be8d5(0x419)](_0x28d93a,_0x23edc4,_0x222091),this[_0x1be8d5(0x2ea)](_0x28d93a,_0x23edc4,_0x222091),this[_0x1be8d5(0x38f)](_0x23edc4,_0x222091);},Game_Interpreter[_0x248ad4(0x32d)][_0x248ad4(0x419)]=function(_0x3e87e3,_0x5e251d,_0x4e1c5e){const _0x2c555c=_0x248ad4;if(_0x5e251d[_0x2c555c(0x2c7)][0x2]<0x0)return;const _0x4e78f7=_0x5e251d[_0x2c555c(0x2c7)][0x2]+_0x3e87e3;this[_0x2c555c(0x1fd)][_0x4e1c5e][_0x2c555c(0x2c7)][0x2]=_0x4e78f7;},Game_Interpreter['prototype'][_0x248ad4(0x2ea)]=function(_0x11ef1d,_0x3da695,_0x34ec4c){const _0x3330c4=_0x248ad4;if(_0x3da695[_0x3330c4(0x2c7)][0x1]>=0x0){if(_0x3330c4(0x499)!=='fyWaf'){if(!this[_0x3330c4(0x2da)])return;const _0x52990a=0x8,_0x15054d=this[_0x3330c4(0x2da)],_0x6c6b87=this['x']+this['width'],_0x598840=_0xf77950[_0x3330c4(0x2ff)]((_0x208894[_0x3330c4(0x48e)]-_0x4b05fc[_0x3330c4(0x421)])/0x2);_0x6c6b87>=_0x1d2e91[_0x3330c4(0x421)]+_0x598840-_0x15054d['width']+_0x52990a?_0x15054d['x']=-_0x15054d[_0x3330c4(0x48e)]-_0x52990a:_0x15054d['x']=this[_0x3330c4(0x48e)]+_0x52990a,_0x15054d['y']=this[_0x3330c4(0x3c9)]/0x2-_0x15054d[_0x3330c4(0x3c9)]/0x2;}else{var _0x1e399e=_0x3da695[_0x3330c4(0x2c7)][0x1]+_0x11ef1d;this[_0x3330c4(0x1fd)][_0x34ec4c][_0x3330c4(0x2c7)][0x1]=_0x1e399e;}}else _0x3da695[_0x3330c4(0x2c7)][0x1]===-0x2&&(this[_0x3330c4(0x1fd)][_0x34ec4c]['parameters'][0x1]=_0x3da695['parameters'][0x1]);},Game_Interpreter[_0x248ad4(0x32d)][_0x248ad4(0x38f)]=function(_0x20122a,_0x105556){const _0x4eb3f9=_0x248ad4;for(const _0x36f746 of _0x20122a[_0x4eb3f9(0x2c7)][0x0]){if('Kraeg'!==_0x4eb3f9(0x3f4))return this[_0x4eb3f9(0x2a4)]()===0x191;else this[_0x4eb3f9(0x1fd)][_0x105556][_0x4eb3f9(0x2c7)][0x0][_0x4eb3f9(0x1c6)](_0x36f746);}this[_0x4eb3f9(0x1fd)][_0x4eb3f9(0x3ba)](this[_0x4eb3f9(0x2f0)]-0x1,0x2);};function Game_MessageCommonEvent(){this['initialize'](...arguments);}Game_MessageCommonEvent['prototype']['initialize']=function(_0x3600bd,_0x55ce10){const _0x5bb5a1=_0x248ad4;this[_0x5bb5a1(0x478)]=_0x3600bd,this[_0x5bb5a1(0x22d)]=_0x55ce10||0x0,this[_0x5bb5a1(0x33c)]();},Game_MessageCommonEvent['prototype']['event']=function(){return $dataCommonEvents[this['_commonEventId']];},Game_MessageCommonEvent[_0x248ad4(0x32d)][_0x248ad4(0x212)]=function(){const _0x3c5e4b=_0x248ad4;return this['event']()[_0x3c5e4b(0x212)];},Game_MessageCommonEvent[_0x248ad4(0x32d)][_0x248ad4(0x33c)]=function(){const _0x285370=_0x248ad4;this[_0x285370(0x383)]=new Game_Interpreter(),this[_0x285370(0x383)]['setup'](this['list'](),this['_eventId']);},Game_MessageCommonEvent['prototype'][_0x248ad4(0x1fe)]=function(){const _0x14d7c6=_0x248ad4;if(this[_0x14d7c6(0x383)]){if(_0x14d7c6(0x35c)===_0x14d7c6(0x35c)){if(this[_0x14d7c6(0x383)]['isRunning']())this[_0x14d7c6(0x383)][_0x14d7c6(0x1fe)]();else{if('vaxUe'!==_0x14d7c6(0x49c)){const _0x55756f=this[_0x14d7c6(0x32b)]('textSpeed');return _0x55756f>0xa?_0x2c1845[_0x14d7c6(0x3ed)]:_0x55756f;}else this[_0x14d7c6(0x3ef)]();}}else return!![];}},Game_MessageCommonEvent[_0x248ad4(0x32d)][_0x248ad4(0x3ef)]=function(){this['_interpreter']=null;},Scene_Message[_0x248ad4(0x32d)][_0x248ad4(0x24f)]=function(){const _0x560859=_0x248ad4,_0x447d6f=Math[_0x560859(0x352)](Graphics['width'],$gameSystem[_0x560859(0x2ef)]()),_0x21c137=$gameSystem[_0x560859(0x23a)](),_0x17afa1=this[_0x560859(0x2f2)](_0x21c137,![]),_0x1ddb9a=(Graphics[_0x560859(0x421)]-_0x447d6f)/0x2,_0x4db790=0x0;return new Rectangle(_0x1ddb9a,_0x4db790,_0x447d6f,_0x17afa1);},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x214)]=Scene_Options[_0x248ad4(0x32d)][_0x248ad4(0x1ef)],Scene_Options[_0x248ad4(0x32d)][_0x248ad4(0x1ef)]=function(){const _0x2e4424=_0x248ad4;let _0x5256ee=VisuMZ['MessageCore'][_0x2e4424(0x214)][_0x2e4424(0x2a9)](this);const _0x5a914f=VisuMZ[_0x2e4424(0x402)][_0x2e4424(0x417)];if(_0x5a914f['TextSpeed'][_0x2e4424(0x3be)]&&_0x5a914f['TextSpeed'][_0x2e4424(0x3f3)])_0x5256ee++;return _0x5256ee;},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x1d2)]=Sprite_Picture[_0x248ad4(0x32d)][_0x248ad4(0x2d4)],Sprite_Picture[_0x248ad4(0x32d)][_0x248ad4(0x2d4)]=function(){const _0x330b4b=_0x248ad4;VisuMZ[_0x330b4b(0x402)]['Sprite_Picture_updateBitmap']['call'](this),this['createPictureText']();},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x2b6)]=Sprite_Picture['prototype'][_0x248ad4(0x1fe)],Sprite_Picture[_0x248ad4(0x32d)][_0x248ad4(0x1fe)]=function(){const _0x389298=_0x248ad4;VisuMZ[_0x389298(0x402)][_0x389298(0x2b6)]['call'](this),this[_0x389298(0x4a8)]();},Sprite_Picture[_0x248ad4(0x32d)][_0x248ad4(0x4a8)]=function(){const _0x4e1895=_0x248ad4;if(!this[_0x4e1895(0x2d9)])return;this[_0x4e1895(0x3ca)](),this[_0x4e1895(0x34e)](),this['drawPictureText'](),this['attachPictureText']();},Sprite_Picture[_0x248ad4(0x32d)][_0x248ad4(0x3d2)]=function(){const _0x1e7d41=_0x248ad4;if(this[_0x1e7d41(0x4b3)])return;if(this[_0x1e7d41(0x497)])return;const _0x12b073=new Rectangle(0x0,0x0,0x0,0x0);this[_0x1e7d41(0x4b3)]=new Window_Base(_0x12b073),this['_pictureTextWindow']['padding']=0x0,this[_0x1e7d41(0x497)]=new Sprite(),this[_0x1e7d41(0x446)](this[_0x1e7d41(0x497)],0x0),this['_pictureTextWidth']=0x0,this[_0x1e7d41(0x371)]=0x0,this[_0x1e7d41(0x3a9)]={};},Sprite_Picture[_0x248ad4(0x32d)][_0x248ad4(0x3ca)]=function(){const _0x6fc2b3=_0x248ad4;if(!this[_0x6fc2b3(0x4b3)])return;if(this[_0x6fc2b3(0x387)]===this[_0x6fc2b3(0x48e)]&&this[_0x6fc2b3(0x371)]===this[_0x6fc2b3(0x3c9)])return;this[_0x6fc2b3(0x387)]=this[_0x6fc2b3(0x48e)],this['_pictureTextHeight']=this['height'],this[_0x6fc2b3(0x3a9)]={},this[_0x6fc2b3(0x4b3)][_0x6fc2b3(0x3c5)](0x0,0x0,this['width'],this[_0x6fc2b3(0x3c9)]);},Sprite_Picture[_0x248ad4(0x32d)][_0x248ad4(0x34e)]=function(){const _0x32772d=_0x248ad4;if(!this['_pictureTextSprite'])return;this[_0x32772d(0x497)][_0x32772d(0x36d)]['x']=this[_0x32772d(0x36d)]['x'],this[_0x32772d(0x497)][_0x32772d(0x36d)]['y']=this[_0x32772d(0x36d)]['y'];},Sprite_Picture[_0x248ad4(0x32d)]['drawPictureText']=function(){const _0x33b180=_0x248ad4;if(!this['_pictureTextWindow'])return;if(!this[_0x33b180(0x1d7)]())return;const _0x46c721=[_0x33b180(0x46e),'up',_0x33b180(0x39b),_0x33b180(0x2eb),_0x33b180(0x3cf),_0x33b180(0x231),_0x33b180(0x415),_0x33b180(0x328),_0x33b180(0x3c3)];this[_0x33b180(0x4b3)]['createContents']();for(const _0x27d3a9 of _0x46c721){if('BBWqP'!==_0x33b180(0x337))this[_0x33b180(0x263)](_0x27d3a9);else{if(!_0x24ed72[_0x33b180(0x3db)](_0x1c3433))return![];}}},Sprite_Picture[_0x248ad4(0x32d)][_0x248ad4(0x1d7)]=function(){const _0x592a84=_0x248ad4;if($gameScreen[_0x592a84(0x20a)](this[_0x592a84(0x48a)]))return!![];const _0x37ca2c=[_0x592a84(0x46e),'up','upperright',_0x592a84(0x2eb),_0x592a84(0x3cf),_0x592a84(0x231),_0x592a84(0x415),_0x592a84(0x328),_0x592a84(0x3c3)];for(const _0x4a20d0 of _0x37ca2c){if('zTede'===_0x592a84(0x455)){const _0x1bf8e6=$gameScreen['getPictureText'](this[_0x592a84(0x48a)],_0x4a20d0);if(this[_0x592a84(0x3a9)][_0x4a20d0]===_0x1bf8e6)continue;return!![];}else return this['processAutoSize'](_0x529a4f,!![],!![]),this[_0x592a84(0x36c)](_0x592a84(0x374),_0x3c1290(_0x599a27)||0x0),'';}return![];},Sprite_Picture[_0x248ad4(0x32d)][_0x248ad4(0x263)]=function(_0x4e80d0){const _0x5a1f47=_0x248ad4;$gameScreen[_0x5a1f47(0x375)](this[_0x5a1f47(0x48a)]);const _0x39d3e8=$gameScreen[_0x5a1f47(0x309)](this[_0x5a1f47(0x48a)],_0x4e80d0);this[_0x5a1f47(0x3a9)][_0x4e80d0]=_0x39d3e8;const _0x51effe=this['_pictureTextWindow'][_0x5a1f47(0x435)](_0x39d3e8);let _0x208370=$gameScreen[_0x5a1f47(0x372)](this['_pictureId']),_0x43abee=_0x208370,_0x5108ec=_0x208370;if(['up',_0x5a1f47(0x3cf),_0x5a1f47(0x328)]['includes'](_0x4e80d0)){if(_0x5a1f47(0x450)===_0x5a1f47(0x450))_0x43abee=Math[_0x5a1f47(0x2ff)]((this[_0x5a1f47(0x48e)]-_0x51effe[_0x5a1f47(0x48e)])/0x2);else return _0x5cab8b;}else[_0x5a1f47(0x39b),'right','lowerright'][_0x5a1f47(0x1cb)](_0x4e80d0)&&(_0x5a1f47(0x35a)!=='ZbjgD'?_0x43abee=Math['floor'](this[_0x5a1f47(0x48e)]-_0x51effe['width']-_0x208370):this[_0x5a1f47(0x23f)][_0x5a1f47(0x2a2)](_0x2cbaae));if([_0x5a1f47(0x2eb),'center','right'][_0x5a1f47(0x1cb)](_0x4e80d0))_0x5108ec=Math['floor']((this['height']-_0x51effe[_0x5a1f47(0x3c9)])/0x2);else[_0x5a1f47(0x415),'down','lowerright']['includes'](_0x4e80d0)&&(_0x5a1f47(0x2ec)===_0x5a1f47(0x2ec)?_0x5108ec=Math[_0x5a1f47(0x2ff)](this[_0x5a1f47(0x3c9)]-_0x51effe[_0x5a1f47(0x3c9)]-_0x208370):this[_0x5a1f47(0x34a)]());this[_0x5a1f47(0x4b3)][_0x5a1f47(0x2ae)](_0x39d3e8,_0x43abee,_0x5108ec);},Sprite_Picture[_0x248ad4(0x32d)][_0x248ad4(0x2b8)]=function(){const _0x5c67ab=_0x248ad4;if(!this[_0x5c67ab(0x4b3)])return;if(!this['_pictureTextSprite'])return;this[_0x5c67ab(0x497)][_0x5c67ab(0x407)]=this[_0x5c67ab(0x4b3)][_0x5c67ab(0x424)];},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x3fd)]=Window_Base['prototype'][_0x248ad4(0x260)],Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x260)]=function(_0x3962a3){const _0x2b5077=_0x248ad4;this['initMessageCore'](_0x3962a3),VisuMZ['MessageCore'][_0x2b5077(0x3fd)][_0x2b5077(0x2a9)](this,_0x3962a3);},Window_Base[_0x248ad4(0x32d)]['initMessageCore']=function(_0x3f8400){const _0x3b28fb=_0x248ad4;this[_0x3b28fb(0x2df)](),this[_0x3b28fb(0x3de)](),this[_0x3b28fb(0x200)](_0x3f8400);},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x2df)]=function(){const _0x52fbda=_0x248ad4;this[_0x52fbda(0x319)](_0x52fbda(0x3d6));},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x319)]=function(_0x4048fa){const _0x2e5765=_0x248ad4;this[_0x2e5765(0x208)]=_0x4048fa;},Window_Base[_0x248ad4(0x32d)]['getTextAlignment']=function(){const _0x31638f=_0x248ad4;return this[_0x31638f(0x208)];},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x2dc)]=Window_Base['prototype'][_0x248ad4(0x435)],Window_Base['prototype']['textSizeEx']=function(_0x8a1448){const _0x2eb406=_0x248ad4;return this[_0x2eb406(0x3de)](),VisuMZ[_0x2eb406(0x402)][_0x2eb406(0x2dc)][_0x2eb406(0x2a9)](this,_0x8a1448);},Window_Base[_0x248ad4(0x32d)]['textSizeExRaw']=function(_0x16891e){const _0x3fc1f1=_0x248ad4;return VisuMZ[_0x3fc1f1(0x402)][_0x3fc1f1(0x2dc)][_0x3fc1f1(0x2a9)](this,_0x16891e);},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x431)]=Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x460)],Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x460)]=function(_0x79ba64){const _0x137c8a=_0x248ad4;VisuMZ[_0x137c8a(0x402)][_0x137c8a(0x431)][_0x137c8a(0x2a9)](this,_0x79ba64);if(_0x79ba64[_0x137c8a(0x369)])this[_0x137c8a(0x319)](_0x137c8a(0x3d6));},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x3de)]=function(){const _0x30143f=_0x248ad4;this[_0x30143f(0x299)](![]);},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x49a)]=function(){return this['_wordWrap'];},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x299)]=function(_0xd0b438){const _0x15d338=_0x248ad4;return this[_0x15d338(0x32e)]=_0xd0b438,'';},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x200)]=function(_0x5e53c3){const _0x2a9fe2=_0x248ad4;this[_0x2a9fe2(0x458)]=JsonEx[_0x2a9fe2(0x22c)](_0x5e53c3);},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x326)]=function(){const _0x5242a7=_0x248ad4;this[_0x5242a7(0x424)][_0x5242a7(0x381)]=$gameSystem[_0x5242a7(0x3a6)](),this[_0x5242a7(0x424)][_0x5242a7(0x42d)]=$gameSystem[_0x5242a7(0x40d)](),this['contents'][_0x5242a7(0x312)]=![],this[_0x5242a7(0x424)][_0x5242a7(0x2c8)]=![],this[_0x5242a7(0x380)]();},Window_Base['prototype'][_0x248ad4(0x380)]=function(){const _0x5c27ed=_0x248ad4;this['changeTextColor'](ColorManager[_0x5c27ed(0x34d)]()),this[_0x5c27ed(0x471)](ColorManager[_0x5c27ed(0x44e)]());const _0x2f981c=VisuMZ[_0x5c27ed(0x402)]['Settings'][_0x5c27ed(0x2fd)];_0x2f981c['DefaultOutlineWidth']===undefined&&(_0x2f981c[_0x5c27ed(0x215)]=0x3),this[_0x5c27ed(0x424)][_0x5c27ed(0x3d0)]=_0x2f981c[_0x5c27ed(0x215)],this[_0x5c27ed(0x432)](![]);},Window_Base['prototype'][_0x248ad4(0x432)]=function(_0x419234){this['_colorLock']=_0x419234;},Window_Base['prototype'][_0x248ad4(0x3b7)]=function(){const _0x5d3c95=_0x248ad4;return this[_0x5d3c95(0x398)];},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x3b2)]=function(){return![];},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x256)]=function(){const _0x84bc97=_0x248ad4,_0x858480=[_0x84bc97(0x381),'fontSize',_0x84bc97(0x312),_0x84bc97(0x2c8),_0x84bc97(0x31a),_0x84bc97(0x1d9),_0x84bc97(0x3d0),'paintOpacity'];let _0x527b2e={};for(const _0x2cd876 of _0x858480){_0x527b2e[_0x2cd876]=this['contents'][_0x2cd876];}return _0x527b2e;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x272)]=function(_0x2f2d5e){const _0x2aea1a=_0x248ad4;for(const _0x591c42 in _0x2f2d5e){this[_0x2aea1a(0x424)][_0x591c42]=_0x2f2d5e[_0x591c42];}},VisuMZ['MessageCore'][_0x248ad4(0x30b)]=Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x1fe)],Window_Base['prototype'][_0x248ad4(0x1fe)]=function(){const _0x377516=_0x248ad4;VisuMZ[_0x377516(0x402)]['Window_Base_update'][_0x377516(0x2a9)](this),this['updateMove']();},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x404)]=function(){return![];},Window_Base['prototype'][_0x248ad4(0x2a7)]=function(){const _0x4278f2=_0x248ad4;this[_0x4278f2(0x366)]>0x0&&(this[_0x4278f2(0x404)]()&&(_0x4278f2(0x361)===_0x4278f2(0x361)?(this['x']=this['applyMoveEasing'](this['x'],this['_moveTargetX']),this['y']=this['applyMoveEasing'](this['y'],this[_0x4278f2(0x25a)]),this['width']=this[_0x4278f2(0x3bd)](this['width'],this[_0x4278f2(0x33f)]),this[_0x4278f2(0x3c9)]=this['applyMoveEasing'](this[_0x4278f2(0x3c9)],this[_0x4278f2(0x37f)]),this[_0x4278f2(0x31f)]()):_0xc71765=this[_0x4278f2(0x21a)](_0x4ada39,_0x5427ba)),this[_0x4278f2(0x366)]--);},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x31f)]=function(_0x1e9cf9,_0x5b92f8){const _0x3ecce8=_0x248ad4;if(!_0x1e9cf9){if(_0x3ecce8(0x3af)!==_0x3ecce8(0x476))this['width']=Math[_0x3ecce8(0x352)](this['width'],Graphics[_0x3ecce8(0x48e)]),this['height']=Math[_0x3ecce8(0x352)](this[_0x3ecce8(0x3c9)],Graphics['height']);else return![];}if(!_0x5b92f8){const _0x401bf5=-(Math[_0x3ecce8(0x2ff)](Graphics[_0x3ecce8(0x48e)]-Graphics['boxWidth'])/0x2),_0x21bdae=_0x401bf5+Graphics[_0x3ecce8(0x48e)]-this[_0x3ecce8(0x48e)],_0x3673de=-(Math[_0x3ecce8(0x2ff)](Graphics[_0x3ecce8(0x3c9)]-Graphics[_0x3ecce8(0x379)])/0x2),_0x59a9a0=_0x3673de+Graphics[_0x3ecce8(0x3c9)]-this['height'];this['x']=this['x'][_0x3ecce8(0x43f)](_0x401bf5,_0x21bdae),this['y']=this['y'][_0x3ecce8(0x43f)](_0x3673de,_0x59a9a0);}},Window_Base['prototype']['applyMoveEasing']=function(_0x3179d6,_0x300fd2){const _0x1fbf26=_0x248ad4,_0x28e9cf=this['_moveDuration'],_0x1578d0=this['_wholeMoveDuration'],_0x234735=this[_0x1fbf26(0x310)]((_0x1578d0-_0x28e9cf)/_0x1578d0),_0x3a2040=this['calcMoveEasing']((_0x1578d0-_0x28e9cf+0x1)/_0x1578d0),_0x56ecf6=(_0x3179d6-_0x300fd2*_0x234735)/(0x1-_0x234735);return _0x56ecf6+(_0x300fd2-_0x56ecf6)*_0x3a2040;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x310)]=function(_0x1ea660){const _0x5930ed=_0x248ad4,_0x20c87c=0x2;switch(this['_moveEasingType']){case 0x0:return _0x1ea660;case 0x1:return this[_0x5930ed(0x3e0)](_0x1ea660,_0x20c87c);case 0x2:return this[_0x5930ed(0x3c4)](_0x1ea660,_0x20c87c);case 0x3:return this[_0x5930ed(0x4b8)](_0x1ea660,_0x20c87c);default:if(Imported['VisuMZ_0_CoreEngine']){if('FwnMw'!==_0x5930ed(0x23b)){if(this['_MessageCoreSettings']===_0x51b808)this[_0x5930ed(0x43b)]();if(this[_0x5930ed(0x486)]['helpWordWrap']===_0x5a2cca)this['initMessageCore']();return this['_MessageCoreSettings'][_0x5930ed(0x30d)];}else return VisuMZ[_0x5930ed(0x3bd)](_0x1ea660,this['_moveEasingType']);}else return _0x1ea660;}},Window_Base['prototype'][_0x248ad4(0x3fc)]=function(_0x3d590d,_0x1a97f0,_0xf39b43,_0xa107f7,_0x5e5ab1,_0x438b04){const _0x4b7373=_0x248ad4;this[_0x4b7373(0x3a1)]=_0x3d590d,this[_0x4b7373(0x25a)]=_0x1a97f0,this[_0x4b7373(0x33f)]=_0xf39b43||this[_0x4b7373(0x48e)],this[_0x4b7373(0x37f)]=_0xa107f7||this[_0x4b7373(0x3c9)],this['_moveDuration']=_0x5e5ab1||0x1;if(this[_0x4b7373(0x366)]<=0x0)this[_0x4b7373(0x366)]=0x1;this[_0x4b7373(0x31e)]=this[_0x4b7373(0x366)],this['_moveEasingType']=_0x438b04||0x0;if(_0x5e5ab1<=0x0)this[_0x4b7373(0x2a7)]();},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x338)]=function(_0x16c679,_0x25c2d9,_0x12ea73,_0x1fcef0,_0x555ffe,_0x57daaa){const _0x5708b4=_0x248ad4;this[_0x5708b4(0x3a1)]=this['x']+_0x16c679,this['_moveTargetY']=this['y']+_0x25c2d9,this[_0x5708b4(0x33f)]=this[_0x5708b4(0x48e)]+(_0x12ea73||0x0),this[_0x5708b4(0x37f)]=this[_0x5708b4(0x3c9)]+(_0x1fcef0||0x0),this[_0x5708b4(0x366)]=_0x555ffe||0x1;if(this['_moveDuration']<=0x0)this[_0x5708b4(0x366)]=0x1;this[_0x5708b4(0x31e)]=this['_moveDuration'],this[_0x5708b4(0x4a9)]=_0x57daaa||0x0;if(_0x555ffe<=0x0)this['updateMove']();},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x3ec)]=function(_0x7c5184,_0x2f15b0){const _0x4af83b=_0x248ad4;this[_0x4af83b(0x3fc)](this[_0x4af83b(0x458)]['x'],this[_0x4af83b(0x458)]['y'],this[_0x4af83b(0x458)]['width'],this[_0x4af83b(0x458)][_0x4af83b(0x3c9)],_0x7c5184,_0x2f15b0);},VisuMZ['MessageCore'][_0x248ad4(0x29e)]=Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x1f8)],Window_Base['prototype'][_0x248ad4(0x1f8)]=function(_0x7a1499){const _0x3bb2cc=_0x248ad4;if(this[_0x3bb2cc(0x3b7)]())return;_0x7a1499=_0x7a1499['replace'](/\,/g,''),this[_0x3bb2cc(0x2b1)]=this[_0x3bb2cc(0x2b1)]||[],this[_0x3bb2cc(0x2b1)][_0x3bb2cc(0x240)](this[_0x3bb2cc(0x424)]['textColor']),VisuMZ[_0x3bb2cc(0x402)][_0x3bb2cc(0x29e)][_0x3bb2cc(0x2a9)](this,_0x7a1499);},Window_Base['prototype']['processPreviousColor']=function(_0x4cf0f1){const _0x1c7a8a=_0x248ad4;this[_0x1c7a8a(0x241)](_0x4cf0f1);if(this[_0x1c7a8a(0x3b7)]())return;_0x4cf0f1[_0x1c7a8a(0x369)]&&(this[_0x1c7a8a(0x2b1)]=this['_textColorStack']||[],this[_0x1c7a8a(0x424)][_0x1c7a8a(0x31a)]=this[_0x1c7a8a(0x2b1)][_0x1c7a8a(0x3d9)]()||ColorManager[_0x1c7a8a(0x34d)]());},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x396)]=function(_0x5aa3e3){const _0x279217=_0x248ad4;return _0x5aa3e3=this[_0x279217(0x462)](_0x5aa3e3),_0x5aa3e3=this['convertBackslashCharacters'](_0x5aa3e3),_0x5aa3e3=this[_0x279217(0x248)](_0x5aa3e3),_0x5aa3e3=this['convertButtonAssistEscapeCharacters'](_0x5aa3e3),_0x5aa3e3=this[_0x279217(0x2e1)](_0x5aa3e3),_0x5aa3e3=this[_0x279217(0x447)](_0x5aa3e3),_0x5aa3e3=this[_0x279217(0x1f2)](_0x5aa3e3),_0x5aa3e3=this[_0x279217(0x444)](_0x5aa3e3),_0x5aa3e3=this[_0x279217(0x219)](_0x5aa3e3),_0x5aa3e3=this[_0x279217(0x2bd)](_0x5aa3e3),_0x5aa3e3=this['convertHardcodedEscapeReplacements'](_0x5aa3e3),_0x5aa3e3=this[_0x279217(0x3ac)](_0x5aa3e3),_0x5aa3e3=this['convertMessageCoreEscapeReplacements'](_0x5aa3e3),_0x5aa3e3=this[_0x279217(0x45e)](_0x5aa3e3),_0x5aa3e3=this[_0x279217(0x248)](_0x5aa3e3),_0x5aa3e3=this['processAutoColorWords'](_0x5aa3e3),_0x5aa3e3=this[_0x279217(0x285)](_0x5aa3e3),_0x5aa3e3;},Window_Base[_0x248ad4(0x32d)]['convertTextMacros']=function(_0x59de88){const _0x104656=_0x248ad4;this['_textMacroFound']=![];for(const _0x3cdc92 of VisuMZ[_0x104656(0x402)][_0x104656(0x417)][_0x104656(0x434)]){_0x104656(0x33e)!==_0x104656(0x33e)?this[_0x104656(0x39d)]():_0x59de88[_0x104656(0x32c)](_0x3cdc92[_0x104656(0x28e)])&&(this['_textMacroFound']=!![],_0x59de88=_0x59de88[_0x104656(0x2db)](_0x3cdc92['textCodeCheck'],_0x3cdc92[_0x104656(0x2b4)][_0x104656(0x487)](this)));}return _0x59de88;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x4a4)]=function(_0x9087a){const _0x1a0e48=_0x248ad4;return _0x9087a=_0x9087a[_0x1a0e48(0x2db)](/\\/g,'\x1b'),_0x9087a=_0x9087a[_0x1a0e48(0x2db)](/\x1b\x1b/g,'\x5c'),_0x9087a;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x248)]=function(_0x233a8e){const _0x1c8705=_0x248ad4;for(;;){if(_0x233a8e['match'](/\\V\[(\d+)\]/gi)){if(_0x1c8705(0x3a5)!==_0x1c8705(0x276))_0x233a8e=_0x233a8e[_0x1c8705(0x2db)](/\\V\[(\d+)\]/gi,(_0x4689dc,_0x2e40fd)=>this[_0x1c8705(0x4a4)](String($gameVariables[_0x1c8705(0x3db)](parseInt(_0x2e40fd)))));else return 0x4;}else{if(_0x233a8e[_0x1c8705(0x32c)](/\x1bV\[(\d+)\]/gi))_0x233a8e=_0x233a8e[_0x1c8705(0x2db)](/\x1bV\[(\d+)\]/gi,(_0x4105b4,_0x42230e)=>this[_0x1c8705(0x4a4)](String($gameVariables[_0x1c8705(0x3db)](parseInt(_0x42230e)))));else break;}}return _0x233a8e;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x32f)]=function(_0x39e51c){const _0x2a653e=_0x248ad4;return Imported[_0x2a653e(0x395)]&&(_0x39e51c=_0x39e51c[_0x2a653e(0x2db)](/<Up (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('up')),_0x39e51c=_0x39e51c['replace'](/<Left (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x2a653e(0x2eb))),_0x39e51c=_0x39e51c['replace'](/<Right (?:KEY|BUTTON)>/gi,this[_0x2a653e(0x368)](_0x2a653e(0x231))),_0x39e51c=_0x39e51c[_0x2a653e(0x2db)](/<Down (?:KEY|BUTTON)>/gi,this[_0x2a653e(0x368)](_0x2a653e(0x328))),_0x39e51c=_0x39e51c[_0x2a653e(0x2db)](/<Ok (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('ok')),_0x39e51c=_0x39e51c[_0x2a653e(0x2db)](/<Cancel (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x2a653e(0x439))),_0x39e51c=_0x39e51c[_0x2a653e(0x2db)](/<Menu (?:KEY|BUTTON)>/gi,this[_0x2a653e(0x368)](_0x2a653e(0x242))),_0x39e51c=_0x39e51c[_0x2a653e(0x2db)](/<Shift (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x2a653e(0x3d9))),_0x39e51c=_0x39e51c['replace'](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this[_0x2a653e(0x368)](_0x2a653e(0x36b))),_0x39e51c=_0x39e51c['replace'](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this[_0x2a653e(0x368)](_0x2a653e(0x481)))),_0x39e51c;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x368)]=function(_0x568895){const _0x411350=_0x248ad4;let _0x39f264=TextManager[_0x411350(0x3bf)](_0x568895)||'';return _0x39f264=this[_0x411350(0x4a4)](_0x39f264),_0x39f264=this['convertVariableEscapeCharacters'](_0x39f264),_0x39f264[_0x411350(0x4b9)]();},Window_Base['prototype'][_0x248ad4(0x2e1)]=function(_0x491465){return this['registerActorNameAutoColorChanges'](),_0x491465;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x45e)]=function(_0x2eb22a){return _0x2eb22a;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x447)]=function(_0x21a7ed){const _0x51dbf9=_0x248ad4;return _0x21a7ed=_0x21a7ed[_0x51dbf9(0x2db)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x21a7ed=_0x21a7ed[_0x51dbf9(0x2db)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x21a7ed=_0x21a7ed[_0x51dbf9(0x2db)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x21a7ed=_0x21a7ed[_0x51dbf9(0x2db)](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x21a7ed=_0x21a7ed[_0x51dbf9(0x2db)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x21a7ed;},Window_Base[_0x248ad4(0x32d)]['convertFontSettingsEscapeCharacters']=function(_0x1689e1){const _0x4a15ca=_0x248ad4;return _0x1689e1=_0x1689e1[_0x4a15ca(0x2db)](/<B>/gi,'\x1bBOLD[1]'),_0x1689e1=_0x1689e1['replace'](/<\/B>/gi,_0x4a15ca(0x28b)),_0x1689e1=_0x1689e1['replace'](/<I>/gi,_0x4a15ca(0x249)),_0x1689e1=_0x1689e1['replace'](/<\/I>/gi,_0x4a15ca(0x264)),_0x1689e1;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x444)]=function(_0x34f7df){const _0x57ff9a=_0x248ad4;return _0x34f7df=_0x34f7df[_0x57ff9a(0x2db)](/<LEFT>/gi,_0x57ff9a(0x46a)),_0x34f7df=_0x34f7df[_0x57ff9a(0x2db)](/<\/LEFT>/gi,_0x57ff9a(0x305)),_0x34f7df=_0x34f7df['replace'](/<CENTER>/gi,_0x57ff9a(0x480)),_0x34f7df=_0x34f7df[_0x57ff9a(0x2db)](/<\/CENTER>/gi,_0x57ff9a(0x305)),_0x34f7df=_0x34f7df[_0x57ff9a(0x2db)](/<RIGHT>/gi,'\x1bTEXTALIGNMENT[3]'),_0x34f7df=_0x34f7df[_0x57ff9a(0x2db)](/<\/RIGHT>/gi,_0x57ff9a(0x305)),_0x34f7df;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x219)]=function(_0x4bcc21){const _0x1bdb7c=_0x248ad4;return _0x4bcc21=_0x4bcc21[_0x1bdb7c(0x2db)](/<COLORLOCK>/gi,_0x1bdb7c(0x253)),_0x4bcc21=_0x4bcc21[_0x1bdb7c(0x2db)](/<\/COLORLOCK>/gi,_0x1bdb7c(0x3e2)),_0x4bcc21=_0x4bcc21[_0x1bdb7c(0x2db)](/\(\(\(/gi,'\x1bCOLORLOCK[1]'),_0x4bcc21=_0x4bcc21[_0x1bdb7c(0x2db)](/\)\)\)/gi,_0x1bdb7c(0x3e2)),_0x4bcc21;},Window_Base['prototype'][_0x248ad4(0x2bd)]=function(_0x594e5f){const _0x1e1f5d=_0x248ad4;return _0x594e5f=_0x594e5f['replace'](/\x1bN\[(\d+)\]/gi,(_0x1442b,_0xdbc6e)=>this[_0x1e1f5d(0x26b)](parseInt(_0xdbc6e))),_0x594e5f=_0x594e5f[_0x1e1f5d(0x2db)](/\x1bP\[(\d+)\]/gi,(_0x35bc79,_0x583576)=>this['partyMemberName'](parseInt(_0x583576))),_0x594e5f=_0x594e5f['replace'](/\x1bG/gi,TextManager[_0x1e1f5d(0x3a3)]),_0x594e5f;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x39c)]=function(_0x8c638c){const _0x236060=_0x248ad4;return _0x8c638c=_0x8c638c[_0x236060(0x2db)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this['battleTargetName']()),_0x8c638c=_0x8c638c['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this['battleUserName']()),_0x8c638c=_0x8c638c['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x236060(0x2be)](!![])),_0x8c638c=_0x8c638c[_0x236060(0x2db)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x236060(0x2be)](![])),_0x8c638c;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x2fa)]=function(){const _0x47a128=_0x248ad4;if(!SceneManager[_0x47a128(0x293)]())return'';if(BattleManager[_0x47a128(0x479)])return BattleManager[_0x47a128(0x479)][_0x47a128(0x3f9)]();if(BattleManager[_0x47a128(0x30e)][0x0])return BattleManager[_0x47a128(0x30e)][0x0][_0x47a128(0x3f9)]();return'';},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x2f8)]=function(){const _0x37dde9=_0x248ad4;if(!SceneManager[_0x37dde9(0x293)]())return'';let _0x29a118=null;return _0x29a118=BattleManager[_0x37dde9(0x31c)],!_0x29a118&&BattleManager['isInputting']()&&(_0x37dde9(0x27f)!=='TGOmY'?_0x29a118=BattleManager[_0x37dde9(0x4a7)]():_0x4ec797=_0x3eb7e9[_0x37dde9(0x2ff)](this[_0x37dde9(0x3c9)]-_0x3d7d4e[_0x37dde9(0x3c9)]-_0x2407c4)),_0x29a118?_0x29a118['name']():'';},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x2be)]=function(_0xad7fc2){const _0x1851ed=_0x248ad4;if(!SceneManager[_0x1851ed(0x293)]())return'';let _0x3d35d6=BattleManager[_0x1851ed(0x468)]||null;if(!_0x3d35d6&&BattleManager[_0x1851ed(0x2ee)]()){if(_0x1851ed(0x496)!=='ZRdqT')_0x3d35d6=BattleManager[_0x1851ed(0x2cd)]();else{if(this[_0x1851ed(0x4b7)]===_0x41b645)this[_0x1851ed(0x29f)]();const _0x2d7c38=this[_0x1851ed(0x3dd)](_0x764021);this[_0x1851ed(0x4b7)][_0x2d7c38]=null,this[_0x1851ed(0x362)](_0x332069,!![]);}}if(_0x3d35d6&&_0x3d35d6[_0x1851ed(0x321)]()){if('vuJYK'===_0x1851ed(0x1dd)){const _0x1bf119=_0xdd3f31[_0x1851ed(0x402)][_0x1851ed(0x25e)][_0x1851ed(0x2a9)](this);return _0x1bf119[_0x1851ed(0x298)]=this['textSpeed'],_0x1bf119;}else{let _0x381284='';if(_0xad7fc2)_0x381284+=_0x1851ed(0x1df)['format'](_0x3d35d6['item']()[_0x1851ed(0x493)]);return _0x381284+=_0x3d35d6[_0x1851ed(0x321)]()[_0x1851ed(0x3f9)],_0x381284;}}return'';},Window_Base['prototype']['convertMessageCoreEscapeActions']=function(_0x4bac61){const _0x40e8dc=_0x248ad4;for(const _0x3e6c53 of VisuMZ[_0x40e8dc(0x402)]['Settings'][_0x40e8dc(0x2ab)]){if(_0x4bac61[_0x40e8dc(0x32c)](_0x3e6c53[_0x40e8dc(0x28e)])){if(_0x40e8dc(0x3a4)!==_0x40e8dc(0x3b9))_0x4bac61=_0x4bac61[_0x40e8dc(0x2db)](_0x3e6c53['textCodeCheck'],_0x3e6c53['textCodeResult']),_0x4bac61=this['convertVariableEscapeCharacters'](_0x4bac61);else return!![];}}return _0x4bac61;},Window_Base['prototype'][_0x248ad4(0x26f)]=function(_0x4f89d3){const _0x494607=_0x248ad4;for(const _0x49b3c1 of VisuMZ[_0x494607(0x402)][_0x494607(0x417)][_0x494607(0x365)]){_0x4f89d3[_0x494607(0x32c)](_0x49b3c1[_0x494607(0x28e)])&&(_0x4f89d3=_0x4f89d3['replace'](_0x49b3c1[_0x494607(0x28e)],_0x49b3c1[_0x494607(0x2b4)][_0x494607(0x487)](this)),_0x4f89d3=this[_0x494607(0x248)](_0x4f89d3));}return _0x4f89d3;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x26b)]=function(_0x3b1956){const _0x161b10=_0x248ad4,_0x269f30=_0x3b1956>=0x1?$gameActors[_0x161b10(0x4a7)](_0x3b1956):null,_0x3f3f10=_0x269f30?_0x269f30[_0x161b10(0x3f9)]():'',_0x107885=Number(VisuMZ[_0x161b10(0x402)]['Settings'][_0x161b10(0x2d5)][_0x161b10(0x459)]);return this[_0x161b10(0x3b2)]()&&_0x107885!==0x0?_0x161b10(0x400)[_0x161b10(0x48b)](_0x107885,_0x3f3f10):_0x3f3f10;},Window_Base['prototype'][_0x248ad4(0x2e0)]=function(_0xf679c7){const _0x460b14=_0x248ad4,_0x23cff9=_0xf679c7>=0x1?$gameParty[_0x460b14(0x1e9)]()[_0xf679c7-0x1]:null,_0xfa770c=_0x23cff9?_0x23cff9[_0x460b14(0x3f9)]():'',_0x38309a=Number(VisuMZ[_0x460b14(0x402)][_0x460b14(0x417)]['AutoColor'][_0x460b14(0x459)]);return this['isAutoColorAffected']()&&_0x38309a!==0x0?_0x460b14(0x400)[_0x460b14(0x48b)](_0x38309a,_0xfa770c):_0xfa770c;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x2d3)]=function(_0x4739d5){const _0x473f45=_0x248ad4;return this[_0x473f45(0x3b2)]()&&(_0x4739d5=this['processStoredAutoColorChanges'](_0x4739d5),_0x4739d5=this[_0x473f45(0x257)](_0x4739d5)),_0x4739d5;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x45d)]=function(_0x2fd11d){const _0x576e66=_0x248ad4;for(autoColor of VisuMZ[_0x576e66(0x402)][_0x576e66(0x3fe)]){_0x2fd11d=_0x2fd11d[_0x576e66(0x2db)](autoColor[0x0],autoColor[0x1]);}return _0x2fd11d;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x436)]=function(){this['_autoColorActorNames']=[];},Window_Base[_0x248ad4(0x32d)]['registerActorNameAutoColorChanges']=function(){const _0x1f962d=_0x248ad4;this[_0x1f962d(0x436)]();const _0x288e12=VisuMZ[_0x1f962d(0x402)][_0x1f962d(0x417)]['AutoColor'],_0x3740d4=_0x288e12[_0x1f962d(0x459)];if(_0x3740d4<=0x0)return;for(const _0x40264e of $gameActors['_data']){if(!_0x40264e)continue;const _0xd4a59a=_0x40264e['name']();if(_0xd4a59a[_0x1f962d(0x4b9)]()[_0x1f962d(0x35e)]<=0x0)continue;if(/^\d+$/[_0x1f962d(0x322)](_0xd4a59a))continue;if(_0xd4a59a[_0x1f962d(0x32c)](/-----/i))continue;let _0x3b8532=VisuMZ[_0x1f962d(0x402)][_0x1f962d(0x3c8)](_0xd4a59a);const _0x2605f1=new RegExp('\x5cb'+_0x3b8532+'\x5cb','g'),_0x57b928='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x1f962d(0x48b)](_0x3740d4,_0xd4a59a);this['_autoColorActorNames']['push']([_0x2605f1,_0x57b928]);}},Window_Base['prototype'][_0x248ad4(0x257)]=function(_0x19d4bd){const _0x4f6e63=_0x248ad4;this[_0x4f6e63(0x36e)]===undefined&&this[_0x4f6e63(0x39d)]();for(autoColor of this[_0x4f6e63(0x36e)]){_0x4f6e63(0x20e)===_0x4f6e63(0x1ed)?(_0x29ca2c[_0x4f6e63(0x402)][_0x4f6e63(0x270)][_0x4f6e63(0x2a9)](this,_0x4dbe2e,_0x39665b,_0x2d7b21),_0x843f05>0x0&&this[_0x4f6e63(0x2a3)](_0x3b09af,_0x416b88)):_0x19d4bd=_0x19d4bd[_0x4f6e63(0x2db)](autoColor[0x0],autoColor[0x1]);}return _0x19d4bd;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x4b0)]=function(_0x15aba2,_0x16dad4,_0x56f3ee){const _0x123e25=_0x248ad4;if(!_0x15aba2)return'';const _0x29ab7f=_0x15aba2[_0x16dad4];let _0x2e87b6='';if(_0x29ab7f&&_0x56f3ee&&_0x29ab7f[_0x123e25(0x493)]){if(_0x123e25(0x3c1)===_0x123e25(0x3c1)){const _0x53b526=_0x123e25(0x1d6);_0x2e87b6=_0x53b526[_0x123e25(0x48b)](_0x29ab7f['iconIndex'],_0x29ab7f[_0x123e25(0x3f9)]);}else{const _0x475fc6=_0x913a7e['getMessageWindowXyOffsets']();this['x']+=_0x475fc6['x'],this['y']+=_0x475fc6['y'];}}else{if(_0x29ab7f)_0x2e87b6=_0x29ab7f[_0x123e25(0x3f9)];else{if('CQYaq'!==_0x123e25(0x3cd))_0x2e87b6='';else{if(this[_0x123e25(0x486)]===_0xbc9d9c)this[_0x123e25(0x43b)]();if(this[_0x123e25(0x486)][_0x123e25(0x251)]===_0x19eab3)this[_0x123e25(0x43b)]();return this['_MessageCoreSettings'][_0x123e25(0x251)];}}}return this[_0x123e25(0x3b2)]()&&(_0x2e87b6=this[_0x123e25(0x21a)](_0x2e87b6,_0x15aba2)),_0x2e87b6;},Window_Base[_0x248ad4(0x32d)]['lastGainedObjectName']=function(_0x14079e){const _0x247861=_0x248ad4,_0x2e6af1=$gameParty[_0x247861(0x3f7)]();if(_0x2e6af1['id']<0x0)return'';let _0x363161=null;if(_0x2e6af1[_0x247861(0x235)]===0x0)_0x363161=$dataItems[_0x2e6af1['id']];if(_0x2e6af1[_0x247861(0x235)]===0x1)_0x363161=$dataWeapons[_0x2e6af1['id']];if(_0x2e6af1['type']===0x2)_0x363161=$dataArmors[_0x2e6af1['id']];if(!_0x363161)return'';return _0x14079e?_0x247861(0x1d6)[_0x247861(0x48b)](_0x363161[_0x247861(0x493)],_0x363161['name']):_0x363161['name'];},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x4ac)]=function(){const _0x1cd8f5=_0x248ad4,_0x2e7615=$gameParty[_0x1cd8f5(0x3f7)]();if(_0x2e7615['id']<=0x0)return'';return _0x2e7615[_0x1cd8f5(0x449)];},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x21a)]=function(_0x3858fd,_0x49086d){const _0x368e2e=_0x248ad4,_0x435c43=VisuMZ[_0x368e2e(0x402)][_0x368e2e(0x417)][_0x368e2e(0x2d5)];let _0x11b16f=0x0;if(_0x49086d===$dataActors)_0x11b16f=_0x435c43[_0x368e2e(0x459)];if(_0x49086d===$dataClasses)_0x11b16f=_0x435c43['Classes'];if(_0x49086d===$dataSkills)_0x11b16f=_0x435c43['Skills'];if(_0x49086d===$dataItems)_0x11b16f=_0x435c43['Items'];if(_0x49086d===$dataWeapons)_0x11b16f=_0x435c43[_0x368e2e(0x303)];if(_0x49086d===$dataArmors)_0x11b16f=_0x435c43[_0x368e2e(0x4a1)];if(_0x49086d===$dataEnemies)_0x11b16f=_0x435c43[_0x368e2e(0x2b0)];if(_0x49086d===$dataStates)_0x11b16f=_0x435c43[_0x368e2e(0x316)];return _0x11b16f>0x0&&(_0x3858fd='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x368e2e(0x48b)](_0x11b16f,_0x3858fd)),_0x3858fd;},Window_Base[_0x248ad4(0x32d)]['prepareWordWrapEscapeCharacters']=function(_0x3c59c7){const _0x4016ca=_0x248ad4;_0x3c59c7=_0x3c59c7[_0x4016ca(0x2db)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x75d746,_0x972b11)=>this[_0x4016ca(0x299)](!![])),_0x3c59c7=_0x3c59c7['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x512e43,_0x25b3ec)=>this[_0x4016ca(0x299)](![])),_0x3c59c7=_0x3c59c7[_0x4016ca(0x2db)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x42e0c0,_0x58073e)=>this['setWordWrap'](![]));if(_0x3c59c7['match'](Window_Message[_0x4016ca(0x37c)]))this[_0x4016ca(0x299)](![]);else _0x3c59c7['match'](Window_Message[_0x4016ca(0x3da)])&&this[_0x4016ca(0x299)](![]);if(!this['isWordWrapEnabled']())return _0x3c59c7;if(_0x3c59c7[_0x4016ca(0x35e)]<=0x0)return _0x3c59c7;return VisuMZ[_0x4016ca(0x402)][_0x4016ca(0x417)][_0x4016ca(0x4af)][_0x4016ca(0x405)]?(_0x3c59c7=_0x3c59c7[_0x4016ca(0x2db)](/[\n\r]+/g,'\x20'),_0x3c59c7=_0x3c59c7['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):_0x4016ca(0x2c1)!==_0x4016ca(0x24b)?(_0x3c59c7=_0x3c59c7['replace'](/[\n\r]+/g,''),_0x3c59c7=_0x3c59c7[_0x4016ca(0x2db)](/<(?:BR|LINEBREAK)>/gi,'\x0a')):(_0x3a4e77=_0x2ce00c['replace'](/<Up (?:KEY|BUTTON)>/gi,this[_0x4016ca(0x368)]('up')),_0x462e3e=_0x4d5a5e['replace'](/<Left (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('left')),_0x21f089=_0x206cbf[_0x4016ca(0x2db)](/<Right (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x4016ca(0x231))),_0x3f6741=_0xf9583f['replace'](/<Down (?:KEY|BUTTON)>/gi,this[_0x4016ca(0x368)](_0x4016ca(0x328))),_0x21631d=_0x5626e6[_0x4016ca(0x2db)](/<Ok (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('ok')),_0x2defdb=_0x57e5f7[_0x4016ca(0x2db)](/<Cancel (?:KEY|BUTTON)>/gi,this[_0x4016ca(0x368)](_0x4016ca(0x439))),_0x1a33a9=_0x453b90[_0x4016ca(0x2db)](/<Menu (?:KEY|BUTTON)>/gi,this[_0x4016ca(0x368)](_0x4016ca(0x242))),_0x5e30ce=_0x192b56['replace'](/<Shift (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x4016ca(0x3d9))),_0x171395=_0x63b6b[_0x4016ca(0x2db)](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x4016ca(0x36b))),_0x210570=_0x3396c3['replace'](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this[_0x4016ca(0x368)](_0x4016ca(0x481)))),_0x3c59c7=this['addWrapBreakAfterPunctuation'](_0x3c59c7),_0x3c59c7=_0x3c59c7['split']('\x20')[_0x4016ca(0x4ad)](_0x4016ca(0x1ca)),_0x3c59c7=_0x3c59c7['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x3c59c7=_0x3c59c7[_0x4016ca(0x2db)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x3c59c7;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x3f0)]=function(_0x19b020){return _0x19b020;},VisuMZ[_0x248ad4(0x402)]['Window_Base_processNewLine']=Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x1f7)],Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x1f7)]=function(_0x3b0bf6){const _0x27fb0f=_0x248ad4;VisuMZ[_0x27fb0f(0x402)][_0x27fb0f(0x416)]['call'](this,_0x3b0bf6),this[_0x27fb0f(0x3ee)](_0x3b0bf6);},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x2f9)]=Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x360)],Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x360)]=function(_0x2d98a2,_0x4a4e77){const _0x5b6664=_0x248ad4;VisuMZ[_0x5b6664(0x402)]['Window_Base_processControlCharacter'][_0x5b6664(0x2a9)](this,_0x2d98a2,_0x4a4e77),_0x4a4e77===_0x5b6664(0x1ca)&&this['processWrapBreak'](_0x2d98a2);},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x22a)]=function(_0xb24c6){const _0x198e86=_0x248ad4;var _0x28b8e0=/^\<(.*?)\>/[_0x198e86(0x345)](_0xb24c6[_0x198e86(0x346)][_0x198e86(0x229)](_0xb24c6[_0x198e86(0x1e8)]));return _0x28b8e0?(_0xb24c6[_0x198e86(0x1e8)]+=_0x28b8e0[0x0]['length'],String(_0x28b8e0[0x0]['slice'](0x1,_0x28b8e0[0x0][_0x198e86(0x35e)]-0x1))):'';},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x24a)]=Window_Base['prototype'][_0x248ad4(0x2ba)],Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x2ba)]=function(_0xce66,_0x1b89a0){const _0x4e7838=_0x248ad4;switch(_0xce66){case'C':_0x1b89a0[_0x4e7838(0x369)]?_0x4e7838(0x410)==='yuNzQ'?VisuMZ[_0x4e7838(0x402)][_0x4e7838(0x24a)][_0x4e7838(0x2a9)](this,_0xce66,_0x1b89a0):!_0x1acd72[_0x4e7838(0x383)]?this[_0x4e7838(0x23f)][_0x4e7838(0x2a2)](_0x152324):_0x5bc0e0[_0x4e7838(0x1fe)]():this[_0x4e7838(0x241)](_0x1b89a0);break;case'I':case'{':case'}':VisuMZ['MessageCore']['Window_Base_processEscapeCharacter'][_0x4e7838(0x2a9)](this,_0xce66,_0x1b89a0);break;case'FS':this[_0x4e7838(0x357)](_0x1b89a0);break;case'PX':this[_0x4e7838(0x2a0)](_0x1b89a0);break;case'PY':this[_0x4e7838(0x38e)](_0x1b89a0);break;case _0x4e7838(0x2f3):this[_0x4e7838(0x465)](this[_0x4e7838(0x241)](_0x1b89a0));break;case _0x4e7838(0x1eb):this[_0x4e7838(0x284)](_0x1b89a0);break;case _0x4e7838(0x42c):this[_0x4e7838(0x3b1)](_0x1b89a0);break;case'COMMONEVENT':this[_0x4e7838(0x2b7)](_0x1b89a0);break;case _0x4e7838(0x331):this['processFontChangeItalic'](this[_0x4e7838(0x241)](_0x1b89a0));break;case'PICTURE':this['processDrawPicture'](_0x1b89a0);break;case _0x4e7838(0x1f5):this[_0x4e7838(0x21d)](_0x1b89a0);break;case _0x4e7838(0x29d):this['processTextAlignmentChange'](_0x1b89a0);break;case _0x4e7838(0x426):this['processCustomWait'](_0x1b89a0);break;case _0x4e7838(0x356):this[_0x4e7838(0x37a)](_0x1b89a0);break;default:this[_0x4e7838(0x427)](_0xce66,_0x1b89a0);}},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x427)]=function(_0x363208,_0x1a2ff2){const _0x2318c0=_0x248ad4;for(const _0x52692e of VisuMZ[_0x2318c0(0x402)]['Settings']['TextCodeActions']){if(_0x52692e[_0x2318c0(0x2f1)]===_0x363208){if(_0x2318c0(0x297)===_0x2318c0(0x297)){if(_0x52692e[_0x2318c0(0x3e5)]==='')this['obtainEscapeParam'](_0x1a2ff2);_0x52692e[_0x2318c0(0x35f)][_0x2318c0(0x2a9)](this,_0x1a2ff2);if(this['constructor']===Window_Message){const _0x4f15ba=_0x52692e['CommonEvent']||0x0;if(_0x4f15ba>0x0)this[_0x2318c0(0x26a)](_0x4f15ba);}}else _0x505b84['prototype'][_0x2318c0(0x2ba)]['call'](this,_0x1d5985,_0x379340);}}},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x370)]=function(){const _0x2825bc=_0x248ad4;this[_0x2825bc(0x424)][_0x2825bc(0x42d)]+=VisuMZ[_0x2825bc(0x402)][_0x2825bc(0x417)]['General']['FontChangeValue'],this[_0x2825bc(0x424)][_0x2825bc(0x42d)]=Math['min'](this[_0x2825bc(0x424)][_0x2825bc(0x42d)],VisuMZ[_0x2825bc(0x402)][_0x2825bc(0x417)]['General'][_0x2825bc(0x325)]);},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x3ea)]=function(){const _0x21d987=_0x248ad4;this[_0x21d987(0x424)]['fontSize']-=VisuMZ[_0x21d987(0x402)][_0x21d987(0x417)][_0x21d987(0x2fd)]['FontChangeValue'],this['contents']['fontSize']=Math[_0x21d987(0x4bb)](this[_0x21d987(0x424)][_0x21d987(0x42d)],VisuMZ[_0x21d987(0x402)]['Settings'][_0x21d987(0x2fd)][_0x21d987(0x25b)]);},Window_Base['prototype'][_0x248ad4(0x357)]=function(_0xa6c8b8){const _0x47b9ef=_0x248ad4,_0x161a30=this[_0x47b9ef(0x241)](_0xa6c8b8);this[_0x47b9ef(0x424)][_0x47b9ef(0x42d)]=_0x161a30[_0x47b9ef(0x43f)](VisuMZ[_0x47b9ef(0x402)][_0x47b9ef(0x417)][_0x47b9ef(0x2fd)][_0x47b9ef(0x25b)],VisuMZ[_0x47b9ef(0x402)][_0x47b9ef(0x417)]['General'][_0x47b9ef(0x325)]);},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x364)]=function(_0x2633a2){const _0x4def8a=_0x248ad4;let _0x4f115f=this['contents'][_0x4def8a(0x42d)];const _0xc4d52b=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x3be6ab=_0xc4d52b[_0x4def8a(0x345)](_0x2633a2);if(!_0x3be6ab)break;const _0x1cd538=String(_0x3be6ab[0x1])[_0x4def8a(0x247)]();if(_0x1cd538==='{')this[_0x4def8a(0x370)]();else{if(_0x1cd538==='}'){if(_0x4def8a(0x37d)!==_0x4def8a(0x3e6))this['makeFontSmaller']();else{if(this[_0x4def8a(0x4b7)]===_0x5b9fca)this[_0x4def8a(0x29f)]();const _0x300485=this[_0x4def8a(0x3dd)](_0x439116);return this[_0x4def8a(0x4b7)][_0x300485]=this[_0x4def8a(0x4b7)][_0x300485]||{},this[_0x4def8a(0x4b7)][_0x300485];}}else _0x1cd538==='FS'&&(_0x4def8a(0x1e4)!==_0x4def8a(0x1e4)?(this[_0x4def8a(0x383)]=new _0x191ab0(),this[_0x4def8a(0x383)][_0x4def8a(0x2e8)](this[_0x4def8a(0x212)](),this[_0x4def8a(0x22d)])):this[_0x4def8a(0x424)][_0x4def8a(0x42d)]=parseInt(_0x3be6ab[0x3])[_0x4def8a(0x43f)](VisuMZ['MessageCore'][_0x4def8a(0x417)][_0x4def8a(0x2fd)][_0x4def8a(0x25b)],VisuMZ['MessageCore'][_0x4def8a(0x417)][_0x4def8a(0x2fd)][_0x4def8a(0x325)]));}this[_0x4def8a(0x424)][_0x4def8a(0x42d)]>_0x4f115f&&(_0x4f115f=this[_0x4def8a(0x424)][_0x4def8a(0x42d)]);}return _0x4f115f;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x2a0)]=function(_0x5a573c){const _0x17fa95=_0x248ad4;_0x5a573c['x']=this[_0x17fa95(0x241)](_0x5a573c),VisuMZ[_0x17fa95(0x402)][_0x17fa95(0x417)]['General']['RelativePXPY']&&(_0x5a573c['x']+=_0x5a573c[_0x17fa95(0x401)]);},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x38e)]=function(_0x5f071e){const _0xdf970b=_0x248ad4;_0x5f071e['y']=this['obtainEscapeParam'](_0x5f071e),VisuMZ['MessageCore'][_0xdf970b(0x417)][_0xdf970b(0x2fd)]['RelativePXPY']&&(_0x5f071e['y']+=_0x5f071e['startY']);},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x465)]=function(_0x14bd77){this['contents']['fontBold']=!!_0x14bd77;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x4a2)]=function(_0x465d29){const _0x1f4c2f=_0x248ad4;this[_0x1f4c2f(0x424)][_0x1f4c2f(0x2c8)]=!!_0x465d29;},Window_Base['prototype']['processTextAlignmentChange']=function(_0x52c060){const _0x354c52=_0x248ad4,_0x2ba04a=this[_0x354c52(0x241)](_0x52c060);if(!_0x52c060[_0x354c52(0x369)])return;switch(_0x2ba04a){case 0x0:this[_0x354c52(0x319)](_0x354c52(0x3d6));return;case 0x1:this[_0x354c52(0x319)]('left');break;case 0x2:this[_0x354c52(0x319)](_0x354c52(0x3cf));break;case 0x3:this[_0x354c52(0x319)](_0x354c52(0x231));break;}this[_0x354c52(0x3ee)](_0x52c060);},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x3ee)]=function(_0x3a70ed){const _0x27fea5=_0x248ad4;if(!_0x3a70ed[_0x27fea5(0x369)])return;if(_0x3a70ed[_0x27fea5(0x252)])return;if(this['getTextAlignment']()==='default')return;let _0x5b87ca=_0x3a70ed[_0x27fea5(0x346)][_0x27fea5(0x21c)](_0x27fea5(0x290),_0x3a70ed['index']+0x1),_0x448883=_0x3a70ed['text'][_0x27fea5(0x21c)]('\x0a',_0x3a70ed['index']+0x1);if(_0x5b87ca<0x0)_0x5b87ca=_0x3a70ed[_0x27fea5(0x346)][_0x27fea5(0x35e)]+0x1;if(_0x448883>0x0)_0x5b87ca=Math[_0x27fea5(0x352)](_0x5b87ca,_0x448883);const _0x54f0c9=_0x3a70ed['text'][_0x27fea5(0x49b)](_0x3a70ed[_0x27fea5(0x1e8)],_0x5b87ca),_0x1495b4=this['textSizeExTextAlignment'](_0x54f0c9)[_0x27fea5(0x48e)],_0xfd9c7=_0x3a70ed[_0x27fea5(0x48e)]||this[_0x27fea5(0x330)]-0x8,_0x3467ba=this[_0x27fea5(0x40b)]===Window_Message&&$gameMessage[_0x27fea5(0x494)]()!=='';switch(this[_0x27fea5(0x206)]()){case _0x27fea5(0x2eb):_0x3a70ed['x']=_0x3a70ed['startX'];break;case _0x27fea5(0x3cf):_0x3a70ed['x']=_0x3a70ed[_0x27fea5(0x401)],_0x3a70ed['x']+=Math[_0x27fea5(0x2ff)]((_0xfd9c7-_0x1495b4)/0x2);_0x3467ba&&(_0x3a70ed['x']-=_0x3a70ed['startX']/0x2);break;case _0x27fea5(0x231):_0x3a70ed['x']=_0xfd9c7-_0x1495b4+_0x3a70ed[_0x27fea5(0x401)];if(_0x3467ba){if(_0x27fea5(0x3ab)!==_0x27fea5(0x4a0))_0x3a70ed['x']-=_0x3a70ed['startX'];else return this[_0x27fea5(0x1da)](_0x2dfe16,!![],!![]),this['processAutoPosition'](_0x27fea5(0x46d)),'';}break;}},Window_Base[_0x248ad4(0x32d)]['textSizeExTextAlignment']=function(_0x54e5dd){const _0x390922=_0x248ad4;_0x54e5dd=_0x54e5dd[_0x390922(0x2db)](/\x1b!/g,''),_0x54e5dd=_0x54e5dd[_0x390922(0x2db)](/\x1b\|/g,''),_0x54e5dd=_0x54e5dd[_0x390922(0x2db)](/\x1b\./g,'');const _0x4f52d6=this['createTextState'](_0x54e5dd,0x0,0x0,0x0),_0x2d3126=this[_0x390922(0x256)]();return _0x4f52d6[_0x390922(0x369)]=![],this['processAllText'](_0x4f52d6),this[_0x390922(0x272)](_0x2d3126),{'width':_0x4f52d6[_0x390922(0x30c)],'height':_0x4f52d6[_0x390922(0x3df)]};},Window_Base[_0x248ad4(0x4bc)]=VisuMZ['MessageCore'][_0x248ad4(0x417)]['WordWrap']['EndPadding']||0x0,Window_Base[_0x248ad4(0x32d)]['processWrapBreak']=function(_0x4fb9c9){const _0x82208a=_0x248ad4,_0x22987e=(_0x4fb9c9[_0x82208a(0x252)]?-0x1:0x1)*this[_0x82208a(0x23e)]('\x20');_0x4fb9c9['x']+=_0x22987e;if(this[_0x82208a(0x241)](_0x4fb9c9)>0x0)_0x4fb9c9['x']+=_0x22987e;if(_0x4fb9c9[_0x82208a(0x252)])return;let _0x3943f9=_0x4fb9c9['text'][_0x82208a(0x21c)](_0x82208a(0x1ca),_0x4fb9c9[_0x82208a(0x1e8)]+0x1),_0x59a5a7=_0x4fb9c9[_0x82208a(0x346)][_0x82208a(0x21c)]('\x0a',_0x4fb9c9[_0x82208a(0x1e8)]+0x1);if(_0x3943f9<0x0)_0x3943f9=_0x4fb9c9['text'][_0x82208a(0x35e)]+0x1;if(_0x59a5a7>0x0)_0x3943f9=Math[_0x82208a(0x352)](_0x3943f9,_0x59a5a7);const _0x1100f6=_0x4fb9c9[_0x82208a(0x346)][_0x82208a(0x49b)](_0x4fb9c9[_0x82208a(0x1e8)],_0x3943f9),_0x5d9877=this[_0x82208a(0x45a)](_0x1100f6)[_0x82208a(0x48e)];let _0x37fe93=_0x4fb9c9[_0x82208a(0x48e)]||this[_0x82208a(0x330)];_0x37fe93-=Window_Base[_0x82208a(0x4bc)];if(this[_0x82208a(0x40b)]===Window_Message){const _0x2d5a1=$gameMessage[_0x82208a(0x494)]()===''?0x0:ImageManager[_0x82208a(0x438)]+0x14;_0x37fe93-=_0x2d5a1;if(VisuMZ[_0x82208a(0x402)][_0x82208a(0x417)]['WordWrap'][_0x82208a(0x1e6)]){if(_0x82208a(0x4ba)!==_0x82208a(0x220))_0x37fe93-=_0x2d5a1;else return 0x0;}}let _0x1037c1=![];if(_0x4fb9c9['x']+_0x5d9877>_0x4fb9c9[_0x82208a(0x401)]+_0x37fe93)_0x1037c1=!![];if(_0x5d9877===0x0)_0x1037c1=!![];_0x1037c1&&(_0x4fb9c9[_0x82208a(0x346)]=_0x4fb9c9[_0x82208a(0x346)][_0x82208a(0x229)](0x0,_0x4fb9c9[_0x82208a(0x1e8)])+'\x0a'+_0x4fb9c9[_0x82208a(0x346)][_0x82208a(0x42a)](_0x4fb9c9['index']));},Window_Base[_0x248ad4(0x32d)]['textSizeExWordWrap']=function(_0x89d414){const _0x107eb8=_0x248ad4,_0x11aa27=this[_0x107eb8(0x354)](_0x89d414,0x0,0x0,0x0),_0x340f58=this['getPreservedFontSettings']();return _0x11aa27[_0x107eb8(0x369)]=![],this[_0x107eb8(0x299)](![]),this[_0x107eb8(0x460)](_0x11aa27),this[_0x107eb8(0x299)](!![]),this[_0x107eb8(0x272)](_0x340f58),{'width':_0x11aa27[_0x107eb8(0x30c)],'height':_0x11aa27[_0x107eb8(0x3df)]};},Window_Base[_0x248ad4(0x32d)]['processCommonEvent']=function(_0x1e0efe){return this['obtainEscapeParam'](_0x1e0efe);},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x1f0)]=function(_0x556b6a){const _0x5ae605=_0x248ad4,_0x45af07=this[_0x5ae605(0x22a)](_0x556b6a)[_0x5ae605(0x20d)](',');if(!_0x556b6a[_0x5ae605(0x369)])return;const _0x5bc6f8=_0x45af07[0x0][_0x5ae605(0x4b9)](),_0x4f3f28=_0x45af07[0x1]||0x0,_0x5901a8=_0x45af07[0x2]||0x0,_0x10ab69=ImageManager[_0x5ae605(0x34c)](_0x5bc6f8),_0x5bc567=this[_0x5ae605(0x424)][_0x5ae605(0x1fa)];_0x10ab69[_0x5ae605(0x2d8)](this[_0x5ae605(0x287)][_0x5ae605(0x487)](this,_0x10ab69,_0x556b6a['x'],_0x556b6a['y'],_0x4f3f28,_0x5901a8,_0x5bc567));},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x287)]=function(_0x4792e9,_0x524aba,_0x1b025a,_0x13778a,_0x3d4961,_0x59a47c){const _0x1cf1fc=_0x248ad4;_0x13778a=_0x13778a||_0x4792e9[_0x1cf1fc(0x48e)],_0x3d4961=_0x3d4961||_0x4792e9[_0x1cf1fc(0x3c9)],this[_0x1cf1fc(0x27b)][_0x1cf1fc(0x1fa)]=_0x59a47c,this['contentsBack']['blt'](_0x4792e9,0x0,0x0,_0x4792e9[_0x1cf1fc(0x48e)],_0x4792e9[_0x1cf1fc(0x3c9)],_0x524aba,_0x1b025a,_0x13778a,_0x3d4961),this[_0x1cf1fc(0x27b)][_0x1cf1fc(0x1fa)]=0xff;},Window_Base['prototype'][_0x248ad4(0x284)]=function(_0x3ad9b4){const _0x4eb2e5=_0x248ad4,_0x883df9=this[_0x4eb2e5(0x22a)](_0x3ad9b4)['split'](',');if(!_0x3ad9b4['drawing'])return;const _0x24ce33=_0x883df9[0x0][_0x4eb2e5(0x4b9)](),_0x5cbd40=ImageManager[_0x4eb2e5(0x34c)](_0x24ce33),_0x59350d=JsonEx[_0x4eb2e5(0x22c)](_0x3ad9b4),_0x31d792=this['contents'][_0x4eb2e5(0x1fa)];_0x5cbd40[_0x4eb2e5(0x2d8)](this[_0x4eb2e5(0x2f7)][_0x4eb2e5(0x487)](this,_0x5cbd40,_0x59350d,_0x31d792));},Window_Base['prototype'][_0x248ad4(0x2f7)]=function(_0x909136,_0x35ec90,_0x284d63){const _0x19e940=_0x248ad4,_0xd67017=_0x35ec90[_0x19e940(0x48e)]||this['innerWidth'],_0x3182a2=this[_0x19e940(0x2f0)]!==undefined?this[_0x19e940(0x47a)]():this[_0x19e940(0x348)],_0x1b2170=_0xd67017/_0x909136[_0x19e940(0x48e)],_0x367e58=_0x3182a2/_0x909136[_0x19e940(0x3c9)],_0xf1297=Math[_0x19e940(0x352)](_0x1b2170,_0x367e58,0x1),_0x10a34d=this['_index']!==undefined?(this['itemRectWithPadding'](0x0)[_0x19e940(0x3c9)]-this['lineHeight']())/0x2:0x0,_0x916ff6=_0x909136[_0x19e940(0x48e)]*_0xf1297,_0x3fe644=_0x909136[_0x19e940(0x3c9)]*_0xf1297,_0x512f4a=Math['floor']((_0xd67017-_0x916ff6)/0x2)+_0x35ec90[_0x19e940(0x401)],_0x2ae032=Math[_0x19e940(0x2ff)]((_0x3182a2-_0x3fe644)/0x2)+_0x35ec90[_0x19e940(0x4ae)]-_0x10a34d*0x2;this[_0x19e940(0x27b)][_0x19e940(0x1fa)]=_0x284d63,this['contentsBack']['blt'](_0x909136,0x0,0x0,_0x909136[_0x19e940(0x48e)],_0x909136[_0x19e940(0x3c9)],_0x512f4a,_0x2ae032,_0x916ff6,_0x3fe644),this[_0x19e940(0x27b)][_0x19e940(0x1fa)]=0xff;},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x3b1)]=function(_0x1293fa){const _0x5aad3f=_0x248ad4,_0x39d65c=this['obtainEscapeParam'](_0x1293fa);if(_0x1293fa[_0x5aad3f(0x369)])this['setColorLock'](_0x39d65c>0x0);},Window_Base[_0x248ad4(0x32d)][_0x248ad4(0x4aa)]=function(_0xdceba6){const _0x349505=_0x248ad4,_0x40543c=this[_0x349505(0x241)](_0xdceba6);this[_0x349505(0x40b)]===Window_Message&&_0xdceba6[_0x349505(0x369)]&&this[_0x349505(0x39a)](_0x40543c);},Window_Help[_0x248ad4(0x32d)][_0x248ad4(0x3de)]=function(){const _0x4817f8=_0x248ad4;this[_0x4817f8(0x299)]($gameSystem['isHelpWindowWordWrap']());},Window_Help['prototype']['isAutoColorAffected']=function(){return!![];},VisuMZ['MessageCore'][_0x248ad4(0x2e2)]=Window_Help[_0x248ad4(0x32d)][_0x248ad4(0x33c)],Window_Help['prototype']['refresh']=function(){const _0x52e869=_0x248ad4;this[_0x52e869(0x436)](),VisuMZ['MessageCore'][_0x52e869(0x2e2)]['call'](this),this[_0x52e869(0x3de)]();},VisuMZ['MessageCore'][_0x248ad4(0x233)]=Window_Options[_0x248ad4(0x32d)][_0x248ad4(0x3e7)],Window_Options[_0x248ad4(0x32d)][_0x248ad4(0x3e7)]=function(){const _0x32a877=_0x248ad4;VisuMZ[_0x32a877(0x402)][_0x32a877(0x233)][_0x32a877(0x2a9)](this),this['addMessageCoreCommands']();},Window_Options[_0x248ad4(0x32d)][_0x248ad4(0x423)]=function(){const _0x30f395=_0x248ad4;VisuMZ[_0x30f395(0x402)][_0x30f395(0x417)]['TextSpeed'][_0x30f395(0x3be)]&&this[_0x30f395(0x34a)]();},Window_Options['prototype'][_0x248ad4(0x34a)]=function(){const _0x9eebea=_0x248ad4,_0x1b3240=TextManager[_0x9eebea(0x344)],_0x4e36ef=_0x9eebea(0x298);this[_0x9eebea(0x46c)](_0x1b3240,_0x4e36ef);},VisuMZ[_0x248ad4(0x402)]['Window_Options_statusText']=Window_Options[_0x248ad4(0x32d)]['statusText'],Window_Options[_0x248ad4(0x32d)]['statusText']=function(_0x2fe3cc){const _0x1829ad=_0x248ad4,_0x373d6c=this['commandSymbol'](_0x2fe3cc);if(_0x373d6c===_0x1829ad(0x298))return this[_0x1829ad(0x3e1)]();return VisuMZ['MessageCore'][_0x1829ad(0x308)][_0x1829ad(0x2a9)](this,_0x2fe3cc);},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x441)]=Window_Options[_0x248ad4(0x32d)][_0x248ad4(0x2a1)],Window_Options[_0x248ad4(0x32d)][_0x248ad4(0x2a1)]=function(_0x57c2c4){const _0x4ee6ee=_0x248ad4;if(_0x57c2c4===_0x4ee6ee(0x298))return!![];return VisuMZ[_0x4ee6ee(0x402)]['Window_Options_isVolumeSymbol'][_0x4ee6ee(0x2a9)](this,_0x57c2c4);},Window_Options['prototype']['textSpeedStatusText']=function(){const _0x24aba8=_0x248ad4,_0x13842e=this[_0x24aba8(0x32b)]('textSpeed');if(_0x13842e>0xa)return TextManager[_0x24aba8(0x3ed)];else{if('Axwwm'===_0x24aba8(0x28f))return _0x13842e;else{if(_0xeeae9b[_0x24aba8(0x37b)]())return;this[_0x24aba8(0x246)]=this['_relativePosition']||0x0;const _0x23eab8=this[_0x24aba8(0x213)],_0x5a8d04=_0x1f3616[_0x24aba8(0x2ff)](_0x23eab8['width']*this[_0x24aba8(0x246)]/0xa);this['x']=_0x23eab8['x']+_0x5a8d04-_0x3d5c06[_0x24aba8(0x2ff)](this[_0x24aba8(0x48e)]/0x2),this['x']=this['x'][_0x24aba8(0x43f)](_0x23eab8['x'],_0x23eab8['x']+_0x23eab8[_0x24aba8(0x48e)]-this[_0x24aba8(0x48e)]);}}},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x271)]=Window_Options[_0x248ad4(0x32d)][_0x248ad4(0x2b9)],Window_Options['prototype'][_0x248ad4(0x2b9)]=function(_0x33681c,_0x197384,_0x10c326){const _0x15f56a=_0x248ad4;if(_0x33681c===_0x15f56a(0x298))return this[_0x15f56a(0x1f9)](_0x33681c,_0x197384,_0x10c326);VisuMZ[_0x15f56a(0x402)][_0x15f56a(0x271)][_0x15f56a(0x2a9)](this,_0x33681c,_0x197384,_0x10c326);},Window_Options[_0x248ad4(0x32d)][_0x248ad4(0x1f9)]=function(_0x41c4b8,_0x5677cb,_0x2618b9){const _0x78334f=_0x248ad4,_0x2ec0ff=this[_0x78334f(0x32b)](_0x41c4b8),_0x3de6dc=0x1,_0x521243=_0x2ec0ff+(_0x5677cb?_0x3de6dc:-_0x3de6dc);if(_0x521243>0xb&&_0x2618b9)this[_0x78334f(0x49d)](_0x41c4b8,0x1);else{if(_0x78334f(0x318)!=='SVcrC')this[_0x78334f(0x49d)](_0x41c4b8,_0x521243['clamp'](0x1,0xb));else{this['_moveTargetX']=this['x']+_0x4e0e53,this['_moveTargetY']=this['y']+_0x42bbf5,this['_moveTargetWidth']=this[_0x78334f(0x48e)]+(_0x257a2b||0x0),this['_moveTargetHeight']=this['height']+(_0xdf5c6e||0x0),this[_0x78334f(0x366)]=_0x117eae||0x1;if(this[_0x78334f(0x366)]<=0x0)this[_0x78334f(0x366)]=0x1;this[_0x78334f(0x31e)]=this[_0x78334f(0x366)],this[_0x78334f(0x4a9)]=_0x580deb||0x0;if(_0x1f5f0e<=0x0)this[_0x78334f(0x2a7)]();}}},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x269)]=function(){const _0x1d4de1=_0x248ad4;let _0x2117ba=Window_Base[_0x1d4de1(0x32d)][_0x1d4de1(0x269)][_0x1d4de1(0x2a9)](this);return _0x2117ba-=this[_0x1d4de1(0x3a7)](),_0x2117ba;},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x389)]=function(){const _0x2a7ef1=_0x248ad4;Window_Base[_0x2a7ef1(0x32d)]['refreshDimmerBitmap']['call'](this),VisuMZ['MessageCore'][_0x2a7ef1(0x417)][_0x2a7ef1(0x2fd)][_0x2a7ef1(0x25d)]&&(_0x2a7ef1(0x376)===_0x2a7ef1(0x376)?this[_0x2a7ef1(0x399)]():(_0x401862['MessageCore'][_0x2a7ef1(0x307)][_0x2a7ef1(0x2a9)](this),_0x39e9d1['requestPictureTextRefreshAll']()));},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x399)]=function(){const _0x2730f2=_0x248ad4;this['_dimmerSprite']['x']=Math[_0x2730f2(0x2e9)](this[_0x2730f2(0x48e)]/0x2),this[_0x2730f2(0x2bf)][_0x2730f2(0x36d)]['x']=0.5,this[_0x2730f2(0x2bf)]['scale']['x']=Graphics[_0x2730f2(0x48e)];},VisuMZ['MessageCore'][_0x248ad4(0x28a)]=Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x3f1)],Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x3f1)]=function(){const _0x308ffb=_0x248ad4;VisuMZ[_0x308ffb(0x402)][_0x308ffb(0x28a)][_0x308ffb(0x2a9)](this),this[_0x308ffb(0x436)](),this[_0x308ffb(0x3de)](),this[_0x308ffb(0x432)](![]),this[_0x308ffb(0x319)]('default'),this[_0x308ffb(0x3b5)](VisuMZ[_0x308ffb(0x402)][_0x308ffb(0x417)][_0x308ffb(0x2fd)][_0x308ffb(0x390)]);},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x3de)]=function(){const _0x200d41=_0x248ad4;this[_0x200d41(0x299)]($gameSystem[_0x200d41(0x2e3)]());},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x3b2)]=function(){return!![];},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x3b5)]=function(_0x5ac123){const _0x24858=_0x248ad4,_0x48201d=0xb-ConfigManager[_0x24858(0x298)];_0x5ac123=Math[_0x24858(0x2e9)](_0x5ac123*_0x48201d),this[_0x24858(0x47f)]=_0x5ac123,this[_0x24858(0x409)]=_0x5ac123;},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x283)]=Window_Message[_0x248ad4(0x32d)]['isTriggered'],Window_Message['prototype']['isTriggered']=function(){const _0x1bf79b=_0x248ad4;return VisuMZ[_0x1bf79b(0x402)]['Window_Message_isTriggered'][_0x1bf79b(0x2a9)](this)||Input['isPressed'](VisuMZ[_0x1bf79b(0x402)][_0x1bf79b(0x417)][_0x1bf79b(0x2fd)][_0x1bf79b(0x25f)]);},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x29c)]=Window_Message['prototype']['updatePlacement'],Window_Message['prototype'][_0x248ad4(0x31b)]=function(){const _0x5dfbc2=_0x248ad4;let _0x543d1f=this['y'];this['x']=Math['round']((Graphics[_0x5dfbc2(0x421)]-this['width'])/0x2),VisuMZ[_0x5dfbc2(0x402)][_0x5dfbc2(0x29c)]['call'](this);if(this['_autoPositionTarget'])this['y']=_0x543d1f;this['updateXyOffsets'](),this[_0x5dfbc2(0x33d)](),this['clampPlacementPosition']();},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x34b)]=Window_Message[_0x248ad4(0x32d)]['newPage'],Window_Message[_0x248ad4(0x32d)]['newPage']=function(_0x1b42c5){const _0xd27523=_0x248ad4;this[_0xd27523(0x49e)](_0x1b42c5),this[_0xd27523(0x422)](_0x1b42c5),VisuMZ[_0xd27523(0x402)]['Window_Message_newPage']['call'](this,_0x1b42c5),this['createContents']();},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x49e)]=function(_0x594a7a){const _0x39dbb=_0x248ad4;if(!_0x594a7a)return;this['_macroBypassWordWrap']=![],_0x594a7a[_0x39dbb(0x346)]=this[_0x39dbb(0x462)](_0x594a7a[_0x39dbb(0x346)]),this[_0x39dbb(0x2d7)]&&(_0x594a7a[_0x39dbb(0x346)]=this['prepareWordWrapEscapeCharacters'](_0x594a7a[_0x39dbb(0x346)]),this[_0x39dbb(0x430)]=!![]);},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x285)]=function(_0x5bbfab){const _0x4458cb=_0x248ad4;if(this[_0x4458cb(0x430)])return _0x5bbfab;return Window_Base[_0x4458cb(0x32d)][_0x4458cb(0x285)][_0x4458cb(0x2a9)](this,_0x5bbfab);},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x422)]=function(_0x10cef4){const _0x355db3=_0x248ad4;this[_0x355db3(0x277)](_0x10cef4),this['prepareAutoSizeEscapeCharacters'](_0x10cef4),this['updateDimensions']();},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x1f3)]=Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x451)],Window_Message[_0x248ad4(0x32d)]['terminateMessage']=function(){const _0x427e21=_0x248ad4;VisuMZ[_0x427e21(0x402)]['Window_Message_terminateMessage'][_0x427e21(0x2a9)](this),this[_0x427e21(0x3f1)]();if(this[_0x427e21(0x42e)])this['messagePositionReset']();},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x37e)]=function(){const _0x2f7d0e=_0x248ad4;this['width']=$gameSystem[_0x2f7d0e(0x2ef)]()+this['addedWidth']();;this[_0x2f7d0e(0x48e)]=Math[_0x2f7d0e(0x352)](Graphics[_0x2f7d0e(0x48e)],this[_0x2f7d0e(0x48e)]);const _0xe2a622=$gameSystem['getMessageWindowRows']();this[_0x2f7d0e(0x3c9)]=SceneManager[_0x2f7d0e(0x2e4)]['calcWindowHeight'](_0xe2a622,![])+this[_0x2f7d0e(0x3a7)](),this[_0x2f7d0e(0x3c9)]=Math[_0x2f7d0e(0x352)](Graphics[_0x2f7d0e(0x3c9)],this[_0x2f7d0e(0x3c9)]);if($gameTemp['_centerMessageWindow'])this['resetPositionX']();},Window_Message['prototype']['addedWidth']=function(){return 0x0;},Window_Message[_0x248ad4(0x32d)]['addedHeight']=function(){return 0x0;},Window_Message[_0x248ad4(0x32d)]['resetPositionX']=function(){const _0x4e1488=_0x248ad4;this['x']=(Graphics['boxWidth']-this[_0x4e1488(0x48e)])/0x2,$gameTemp['_centerMessageWindow']=undefined,this[_0x4e1488(0x31f)]();},Window_Message[_0x248ad4(0x32d)]['updateMove']=function(){const _0x153a8c=_0x248ad4,_0x513524={'x':this['x'],'y':this['y']};Window_Base[_0x153a8c(0x32d)]['updateMove'][_0x153a8c(0x2a9)](this),this['updateNameBoxMove'](_0x513524);},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x404)]=function(){return!![];},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x301)]=function(_0x1f12a7){const _0x26b042=_0x248ad4;this[_0x26b042(0x3d8)]&&(this[_0x26b042(0x3d8)]['x']+=this['x']-_0x1f12a7['x'],this['_nameBoxWindow']['y']+=this['y']-_0x1f12a7['y']);},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x3ec)]=function(_0x1c5a03,_0x384d1c){const _0x358357=_0x248ad4;this[_0x358357(0x3fc)](this[_0x358357(0x458)]['x'],this[_0x358357(0x414)]*(Graphics['boxHeight']-this['height'])/0x2,this[_0x358357(0x458)]['width'],this[_0x358357(0x458)][_0x358357(0x3c9)],_0x1c5a03,_0x384d1c);},Window_Message[_0x248ad4(0x32d)]['processCommonEvent']=function(_0x5a4ae4){const _0x8e4136=_0x248ad4,_0x1e20a7=Window_Base[_0x8e4136(0x32d)][_0x8e4136(0x2b7)][_0x8e4136(0x2a9)](this,_0x5a4ae4);_0x5a4ae4[_0x8e4136(0x369)]&&this['launchMessageCommonEvent'](_0x1e20a7);},Window_Message[_0x248ad4(0x32d)]['launchMessageCommonEvent']=function(_0x1ffa18){const _0x586af3=_0x248ad4;if($gameParty[_0x586af3(0x48c)]()){}else $gameMap['addMessageCommonEvent'](_0x1ffa18);},Window_Message['prototype'][_0x248ad4(0x2de)]=function(_0x14c363){const _0x320e4a=_0x248ad4;this['_textDelayCount']--,this[_0x320e4a(0x47f)]<=0x0&&(this[_0x320e4a(0x443)](_0x14c363),Window_Base[_0x320e4a(0x32d)][_0x320e4a(0x2de)][_0x320e4a(0x2a9)](this,_0x14c363));},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x443)]=function(_0x19a5ac){const _0x2397d2=_0x248ad4;this[_0x2397d2(0x47f)]=this['_textDelay'];if(this[_0x2397d2(0x409)]<=0x0)this['_showFast']=!![];},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x498)]=Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x2ba)],Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x2ba)]=function(_0x6b9b17,_0x322d91){const _0x3287e4=_0x248ad4;!_0x322d91[_0x3287e4(0x369)]?_0x3287e4(0x3e9)!==_0x3287e4(0x3e9)?_0x3b4c30['MessageCore'][_0x3287e4(0x417)]['TextSpeed'][_0x3287e4(0x3be)]&&this['addMessageCoreTextSpeedCommand']():Window_Base[_0x3287e4(0x32d)][_0x3287e4(0x2ba)]['call'](this,_0x6b9b17,_0x322d91):VisuMZ[_0x3287e4(0x402)][_0x3287e4(0x498)][_0x3287e4(0x2a9)](this,_0x6b9b17,_0x322d91);},VisuMZ['MessageCore'][_0x248ad4(0x24e)]=Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x26d)],Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x26d)]=function(_0x32574f){const _0x53b332=_0x248ad4;if(this[_0x53b332(0x234)]){if(_0x53b332(0x332)===_0x53b332(0x332))return![];else this[_0x53b332(0x383)]['update']();}return VisuMZ['MessageCore']['Window_Message_needsNewPage'][_0x53b332(0x2a9)](this,_0x32574f);},Window_Message[_0x248ad4(0x32d)]['prepareForcedPositionEscapeCharacters']=function(_0x5ee573){const _0x2ec9e9=_0x248ad4;let _0x59417c=_0x5ee573[_0x2ec9e9(0x346)];this['_forcedPosition']={};if(this['isWordWrapEnabled']())return _0x59417c;_0x59417c=_0x59417c[_0x2ec9e9(0x2db)](/<POSITION:[ ]*(.*)>/gi,(_0x198f72,_0x723eeb)=>{const _0x393456=_0x2ec9e9,_0x172844=_0x723eeb[_0x393456(0x20d)](',')['map'](_0x386291=>Number(_0x386291)||0x0);if(_0x172844[0x0]!==undefined)this[_0x393456(0x2c9)]['x']=Number(_0x172844[0x0]);if(_0x172844[0x1]!==undefined)this[_0x393456(0x2c9)]['y']=Number(_0x172844[0x1]);if(_0x172844[0x2]!==undefined)this[_0x393456(0x2c9)][_0x393456(0x48e)]=Number(_0x172844[0x2]);if(_0x172844[0x3]!==undefined)this[_0x393456(0x2c9)]['height']=Number(_0x172844[0x3]);return'';}),_0x59417c=_0x59417c[_0x2ec9e9(0x2db)](/<COORDINATES:[ ]*(.*)>/gi,(_0x24746c,_0x4c4be2)=>{const _0x5069f4=_0x2ec9e9,_0x152820=_0x4c4be2[_0x5069f4(0x20d)](',')[_0x5069f4(0x483)](_0x44c87d=>Number(_0x44c87d)||0x0);if(_0x152820[0x0]!==undefined)this[_0x5069f4(0x2c9)]['x']=Number(_0x152820[0x0]);if(_0x152820[0x1]!==undefined)this['_forcedPosition']['y']=Number(_0x152820[0x1]);return'';}),_0x59417c=_0x59417c['replace'](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x26b01b,_0x8ad7b3)=>{const _0x117072=_0x2ec9e9,_0x5a9ca2=_0x8ad7b3['split'](',')[_0x117072(0x483)](_0x227447=>Number(_0x227447)||0x0);if(_0x5a9ca2[0x0]!==undefined)this[_0x117072(0x2c9)]['width']=Number(_0x5a9ca2[0x2]);if(_0x5a9ca2[0x1]!==undefined)this['_forcedPosition'][_0x117072(0x3c9)]=Number(_0x5a9ca2[0x3]);return'';}),_0x59417c=_0x59417c[_0x2ec9e9(0x2db)](/<OFFSET:[ ]*(.*)>/gi,(_0x5174a6,_0x45527f)=>{const _0x3bfabc=_0x2ec9e9;if(_0x3bfabc(0x41b)==='HxwfN'){if(!_0x11ddc6[_0x3bfabc(0x293)]())return'';let _0x400790=null;return _0x400790=_0x37c31e[_0x3bfabc(0x31c)],!_0x400790&&_0x31ccf2[_0x3bfabc(0x2ee)]()&&(_0x400790=_0xf92729[_0x3bfabc(0x4a7)]()),_0x400790?_0x400790[_0x3bfabc(0x3f9)]():'';}else{const _0x12a4f7=_0x45527f[_0x3bfabc(0x20d)](',')[_0x3bfabc(0x483)](_0x503895=>Number(_0x503895)||0x0);let _0x29278e=_0x12a4f7[0x0]||0x0,_0x5a6b95=_0x12a4f7[0x1]||0x0;return $gameSystem['setMessageWindowXyOffsets'](_0x29278e,_0x5a6b95),'';}}),_0x5ee573[_0x2ec9e9(0x346)]=_0x59417c;},Window_Message[_0x248ad4(0x32d)]['updateXyOffsets']=function(){const _0x32d3a4=_0x248ad4,_0x582ea8=$gameSystem[_0x32d3a4(0x2e6)]();this['x']+=_0x582ea8['x'],this['y']+=_0x582ea8['y'];},Window_Message['prototype'][_0x248ad4(0x33d)]=function(){const _0x36d81f=_0x248ad4;this['_forcedPosition']=this[_0x36d81f(0x2c9)]||{};const _0x57e7c1=['x','y','width',_0x36d81f(0x3c9)];for(const _0x10fde4 of _0x57e7c1){if(_0x36d81f(0x437)===_0x36d81f(0x1d0))return(_0x86b118['boxWidth']-this[_0x36d81f(0x1dc)]())/0x2;else this[_0x36d81f(0x2c9)][_0x10fde4]!==undefined&&(this[_0x10fde4]=Number(this['_forcedPosition'][_0x10fde4]));}},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x461)]=function(_0x579f7a){const _0x512b4c=_0x248ad4;this[_0x512b4c(0x234)]=![];let _0x655017=_0x579f7a[_0x512b4c(0x346)];_0x655017=_0x655017['replace'](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x4672cc=_0x512b4c;if(_0x4672cc(0x243)==='RCEif')return this[_0x4672cc(0x1da)](_0x655017,!![],!![]),this[_0x4672cc(0x36c)]('none'),'';else this[_0x4672cc(0x3aa)][_0x4672cc(0x235)]=0x2;}),_0x655017=_0x655017[_0x512b4c(0x2db)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x4a1f39=_0x512b4c;return this[_0x4a1f39(0x1da)](_0x655017,!![],![]),this[_0x4a1f39(0x36c)](_0x4a1f39(0x46d)),'';}),_0x655017=_0x655017[_0x512b4c(0x2db)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x438838=_0x512b4c;return this[_0x438838(0x1da)](_0x655017,![],!![]),this['processAutoPosition'](_0x438838(0x46d)),'';});if(SceneManager['isSceneBattle']())_0x655017=_0x655017[_0x512b4c(0x2db)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x5b037f,_0xab803d)=>{const _0x12c416=_0x512b4c;return this['processAutoSize'](_0x655017,!![],!![]),this[_0x12c416(0x36c)]('battle\x20actor',Number(_0xab803d)||0x1),'';}),_0x655017=_0x655017['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x366cb6,_0x1074a0)=>{const _0x3e41bb=_0x512b4c;if(_0x3e41bb(0x296)===_0x3e41bb(0x296))return this[_0x3e41bb(0x1da)](_0x655017,!![],!![]),this[_0x3e41bb(0x36c)]('battle\x20party',Number(_0x1074a0)||0x0),'';else _0x88e12d=_0x3d0cde(_0x49dc72['$1']);}),_0x655017=_0x655017['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x331b91,_0xee7ee6)=>{const _0x2c6385=_0x512b4c;if('WONjH'!==_0x2c6385(0x265))return this[_0x2c6385(0x1da)](_0x655017,!![],!![]),this[_0x2c6385(0x36c)]('battle\x20enemy',Number(_0xee7ee6)||0x0),'';else this[_0x2c6385(0x37a)](_0x124051);});else SceneManager['isSceneMap']()&&(_0x655017=_0x655017[_0x512b4c(0x2db)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x268163,_0xeb9799)=>{const _0x5bd91b=_0x512b4c;return this['processAutoSize'](_0x655017,!![],!![]),this[_0x5bd91b(0x36c)](_0x5bd91b(0x48d),0x0),'';}),_0x655017=_0x655017[_0x512b4c(0x2db)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x38cbed,_0x390d29)=>{const _0x52d62a=_0x512b4c;return this[_0x52d62a(0x1da)](_0x655017,!![],!![]),this['processAutoPosition'](_0x52d62a(0x239),Number(_0x390d29)||0x1),'';}),_0x655017=_0x655017['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x5c2cac,_0x40156e)=>{const _0x5d39ee=_0x512b4c;if(_0x5d39ee(0x250)!=='hVcBl')return this['processAutoSize'](_0x655017,!![],!![]),this[_0x5d39ee(0x36c)](_0x5d39ee(0x3d1),Number(_0x40156e)||0x0),'';else _0x584edf[_0x5d39ee(0x402)]['Game_Party_initialize']['call'](this),this[_0x5d39ee(0x43b)]();}),_0x655017=_0x655017[_0x512b4c(0x2db)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x2795b8,_0xb2efdc)=>{const _0x2ed940=_0x512b4c;if('fENnP'!==_0x2ed940(0x3f2))return this[_0x2ed940(0x1da)](_0x655017,!![],!![]),this[_0x2ed940(0x36c)](_0x2ed940(0x374),Number(_0xb2efdc)||0x0),'';else{if(!_0x547a0c[_0x2ed940(0x293)]())return'';if(_0x495c46[_0x2ed940(0x479)])return _0x426576['_target'][_0x2ed940(0x3f9)]();if(_0x4ca327[_0x2ed940(0x30e)][0x0])return _0x2907f0[_0x2ed940(0x30e)][0x0]['name']();return'';}}));_0x579f7a[_0x512b4c(0x346)]=_0x655017;},Window_Message[_0x248ad4(0x37c)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x248ad4(0x3da)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x1da)]=function(_0x1690fa,_0x542d57,_0x1f5036){const _0x4e8803=_0x248ad4;_0x1690fa=_0x1690fa['replace'](Window_Message[_0x4e8803(0x37c)],''),_0x1690fa=_0x1690fa[_0x4e8803(0x2db)](Window_Message[_0x4e8803(0x3da)],''),this[_0x4e8803(0x470)]=!![],this['_currentAutoSize']=!![],this[_0x4e8803(0x299)](![]);const _0x22c5eb=this[_0x4e8803(0x46b)](_0x1690fa);if(_0x542d57){let _0x374bcc=_0x22c5eb[_0x4e8803(0x48e)]+$gameSystem['windowPadding']()*0x2+0x6;const _0x225821=$gameMessage[_0x4e8803(0x494)]()!=='',_0x39a5c6=ImageManager['faceWidth'],_0x2225a1=0x14;_0x374bcc+=_0x225821?_0x39a5c6+_0x2225a1:0x4;if(_0x374bcc%0x2!==0x0)_0x374bcc+=0x1;$gameSystem['setMessageWindowWidth'](_0x374bcc);}if(_0x1f5036){if(_0x4e8803(0x1cf)!=='JVabC'){let _0x9b6fb7=Math[_0x4e8803(0x245)](_0x22c5eb[_0x4e8803(0x3c9)]/this[_0x4e8803(0x3c7)]());$gameSystem[_0x4e8803(0x38a)](_0x9b6fb7);}else{const _0x22d251=[_0x4e8803(0x46e),'up',_0x4e8803(0x39b),_0x4e8803(0x2eb),_0x4e8803(0x3cf),_0x4e8803(0x231),'lowerleft',_0x4e8803(0x328),_0x4e8803(0x3c3)];return _0x22d251['some'](_0x555596=>this[_0x4e8803(0x309)](_0x1086ad,_0x555596)!=='');}}this[_0x4e8803(0x2ce)](),this[_0x4e8803(0x2a5)](),this[_0x4e8803(0x470)]=![],this[_0x4e8803(0x42e)]=!![];},Window_Message[_0x248ad4(0x32d)]['updateAutoSizePosition']=function(){const _0x383f26=_0x248ad4;this['updateDimensions'](),this[_0x383f26(0x31b)](),this[_0x383f26(0x489)](),this[_0x383f26(0x288)](),this['contents'][_0x383f26(0x3ef)](),this['createContents']();},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x36c)]=function(_0xaa02e2,_0x5261a8){const _0x45b46b=_0x248ad4;switch(_0xaa02e2[_0x45b46b(0x4a5)]()[_0x45b46b(0x4b9)]()){case _0x45b46b(0x216):this[_0x45b46b(0x27a)]=$gameActors[_0x45b46b(0x4a7)](_0x5261a8);break;case _0x45b46b(0x1ce):this[_0x45b46b(0x27a)]=$gameParty[_0x45b46b(0x1e9)]()[_0x5261a8-0x1];break;case'battle\x20enemy':this['_autoPositionTarget']=$gameTroop[_0x45b46b(0x1e9)]()[_0x5261a8-0x1];break;case'map\x20player':this[_0x45b46b(0x27a)]=$gamePlayer;break;case _0x45b46b(0x239):const _0x36da20=$gameActors['actor'](_0x5261a8)[_0x45b46b(0x1e8)]();_0x36da20===0x0?this[_0x45b46b(0x27a)]=$gamePlayer:this[_0x45b46b(0x27a)]=$gamePlayer[_0x45b46b(0x27d)]()['follower'](_0x36da20-0x1);break;case'map\x20party':if(_0x5261a8===0x1){if(_0x45b46b(0x4b1)!=='sUcJk')return _0x55a70e[_0x45b46b(0x402)][_0x45b46b(0x283)][_0x45b46b(0x2a9)](this)||_0xd60ade['isPressed'](_0x5a0e94[_0x45b46b(0x402)][_0x45b46b(0x417)][_0x45b46b(0x2fd)][_0x45b46b(0x25f)]);else this[_0x45b46b(0x27a)]=$gamePlayer;}else this['_autoPositionTarget']=$gamePlayer['followers']()[_0x45b46b(0x42f)](_0x5261a8-0x2);break;case _0x45b46b(0x374):this[_0x45b46b(0x27a)]=$gameMap['event'](_0x5261a8);break;}if(this[_0x45b46b(0x27a)]){if(_0x45b46b(0x20f)!=='BDMRk'){const _0x37a6a5=_0x1e4883['$1']['split'](',')[_0x45b46b(0x483)](_0x188b0a=>_0x150a7b(_0x188b0a)||0x0);for(const _0x4cd40b of _0x37a6a5){if(!_0x353318[_0x45b46b(0x3db)](_0x4cd40b))return![];}return!![];}else this[_0x45b46b(0x1d8)]();}},VisuMZ['MessageCore']['Window_Message_synchronizeNameBox']=Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x358)],Window_Message[_0x248ad4(0x32d)]['synchronizeNameBox']=function(){const _0x357dcb=_0x248ad4;this[_0x357dcb(0x1d8)](),VisuMZ[_0x357dcb(0x402)][_0x357dcb(0x274)][_0x357dcb(0x2a9)](this);},Window_Message[_0x248ad4(0x32d)]['updateAutoPosition']=function(){const _0x19ab30=_0x248ad4;if(!this['_autoPositionTarget'])return;const _0x410d8d=SceneManager['_scene'];if(!_0x410d8d)return;if(!_0x410d8d['_spriteset'])return;const _0x3bba4c=_0x410d8d['_spriteset'][_0x19ab30(0x40a)](this['_autoPositionTarget']);if(!_0x3bba4c)return;let _0x309095=_0x3bba4c['x'];_0x309095-=this[_0x19ab30(0x48e)]/0x2,_0x309095-=(Graphics['width']-Graphics[_0x19ab30(0x421)])/0x2,_0x309095+=this[_0x19ab30(0x466)]();let _0x348f42=_0x3bba4c['y'];_0x348f42-=this[_0x19ab30(0x3c9)],_0x348f42-=(Graphics[_0x19ab30(0x3c9)]-Graphics[_0x19ab30(0x379)])/0x2,_0x348f42+=this[_0x19ab30(0x41e)](),_0x348f42-=_0x3bba4c[_0x19ab30(0x3c9)]+0x8;const _0x51a3b9=$gameSystem['getMessageWindowXyOffsets']();_0x309095+=_0x51a3b9['x'],_0x348f42+=_0x51a3b9['y'],this['x']=Math[_0x19ab30(0x2e9)](_0x309095),this['y']=Math[_0x19ab30(0x2e9)](_0x348f42),this[_0x19ab30(0x31f)](!![],![]),this[_0x19ab30(0x2c9)]=this[_0x19ab30(0x2c9)]||{},this['_forcedPosition']['x']=this['x'],this[_0x19ab30(0x2c9)]['y']=this['y'],this[_0x19ab30(0x2c9)]['width']=this[_0x19ab30(0x48e)],this[_0x19ab30(0x2c9)][_0x19ab30(0x3c9)]=this[_0x19ab30(0x3c9)],this[_0x19ab30(0x3d8)][_0x19ab30(0x31b)]();},Window_Message[_0x248ad4(0x32d)]['autoPositionOffsetX']=function(){return 0x0;},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x41e)]=function(){return 0x0;},Window_Message['prototype'][_0x248ad4(0x294)]=function(){const _0x2c0439=_0x248ad4;this[_0x2c0439(0x42e)]=![],this[_0x2c0439(0x27a)]=undefined,$gameSystem[_0x2c0439(0x43b)](),this[_0x2c0439(0x2ce)](),this[_0x2c0439(0x207)]=0x0;},Window_Message[_0x248ad4(0x32d)]['preConvertEscapeCharacters']=function(_0x2046bb){const _0x44231e=_0x248ad4;return Window_Base[_0x44231e(0x32d)][_0x44231e(0x2e1)][_0x44231e(0x2a9)](this,_0x2046bb);},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x45e)]=function(_0x1df358){const _0x4bfc40=_0x248ad4;return Window_Base['prototype']['postConvertEscapeCharacters'][_0x4bfc40(0x2a9)](this,_0x1df358);},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x2cb)]=function(_0x3c42eb){const _0x2ad50c=_0x248ad4;this[_0x2ad50c(0x3bc)](_0x3c42eb),Window_Base['prototype'][_0x2ad50c(0x2cb)][_0x2ad50c(0x2a9)](this,_0x3c42eb),this[_0x2ad50c(0x341)](_0x3c42eb);},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x3bc)]=function(_0x41ae5c){},Window_Message[_0x248ad4(0x32d)][_0x248ad4(0x341)]=function(_0x3e5261){},Window_NameBox[_0x248ad4(0x32d)][_0x248ad4(0x3b2)]=function(){return![];},Window_NameBox[_0x248ad4(0x32d)][_0x248ad4(0x380)]=function(){const _0x56027f=_0x248ad4;Window_Base[_0x56027f(0x32d)]['resetTextColor'][_0x56027f(0x2a9)](this),this[_0x56027f(0x1f8)](this[_0x56027f(0x48f)]());},Window_NameBox['prototype']['defaultColor']=function(){const _0x585047=_0x248ad4,_0x170ff5=VisuMZ[_0x585047(0x402)]['Settings'][_0x585047(0x2fd)][_0x585047(0x488)];return ColorManager['textColor'](_0x170ff5);},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x2b2)]=Window_NameBox[_0x248ad4(0x32d)][_0x248ad4(0x31b)],Window_NameBox['prototype'][_0x248ad4(0x31b)]=function(){const _0x106739=_0x248ad4;VisuMZ[_0x106739(0x402)][_0x106739(0x2b2)][_0x106739(0x2a9)](this),this[_0x106739(0x41c)](),this['updateOffsetPosition'](),this[_0x106739(0x31f)](),this[_0x106739(0x41d)]();},Window_NameBox[_0x248ad4(0x32d)][_0x248ad4(0x2e1)]=function(_0x157547){const _0x3ec8c1=_0x248ad4;return _0x157547=_0x157547[_0x3ec8c1(0x2db)](/<LEFT>/gi,this['setRelativePosition'][_0x3ec8c1(0x487)](this,0x0)),_0x157547=_0x157547[_0x3ec8c1(0x2db)](/<CENTER>/gi,this[_0x3ec8c1(0x3ce)][_0x3ec8c1(0x487)](this,0x5)),_0x157547=_0x157547[_0x3ec8c1(0x2db)](/<RIGHT>/gi,this['setRelativePosition'][_0x3ec8c1(0x487)](this,0xa)),_0x157547=_0x157547[_0x3ec8c1(0x2db)](/<POSITION:[ ](\d+)>/gi,(_0x2fc98c,_0x54665d)=>this[_0x3ec8c1(0x3ce)](parseInt(_0x54665d))),_0x157547=_0x157547[_0x3ec8c1(0x2db)](/<\/LEFT>/gi,''),_0x157547=_0x157547[_0x3ec8c1(0x2db)](/<\/CENTER>/gi,''),_0x157547=_0x157547[_0x3ec8c1(0x2db)](/<\/RIGHT>/gi,''),Window_Base[_0x3ec8c1(0x32d)][_0x3ec8c1(0x2e1)][_0x3ec8c1(0x2a9)](this,_0x157547);},Window_NameBox[_0x248ad4(0x32d)][_0x248ad4(0x3ce)]=function(_0x3879f8){const _0x265be7=_0x248ad4;return this[_0x265be7(0x246)]=_0x3879f8,'';},Window_NameBox['prototype']['updateRelativePosition']=function(){const _0x37c46c=_0x248ad4;if($gameMessage[_0x37c46c(0x37b)]())return;this[_0x37c46c(0x246)]=this['_relativePosition']||0x0;const _0x3f9763=this[_0x37c46c(0x213)],_0x142445=Math[_0x37c46c(0x2ff)](_0x3f9763[_0x37c46c(0x48e)]*this[_0x37c46c(0x246)]/0xa);this['x']=_0x3f9763['x']+_0x142445-Math[_0x37c46c(0x2ff)](this[_0x37c46c(0x48e)]/0x2),this['x']=this['x'][_0x37c46c(0x43f)](_0x3f9763['x'],_0x3f9763['x']+_0x3f9763[_0x37c46c(0x48e)]-this[_0x37c46c(0x48e)]);},Window_NameBox[_0x248ad4(0x32d)][_0x248ad4(0x236)]=function(){const _0xf54e60=_0x248ad4;if($gameMessage[_0xf54e60(0x37b)]())return;this[_0xf54e60(0x246)]=this[_0xf54e60(0x246)]||0x0;const _0x1a0932=VisuMZ[_0xf54e60(0x402)][_0xf54e60(0x417)][_0xf54e60(0x2fd)][_0xf54e60(0x339)],_0x4f8110=VisuMZ[_0xf54e60(0x402)][_0xf54e60(0x417)][_0xf54e60(0x2fd)][_0xf54e60(0x3a2)],_0x41eee8=(0x5-this[_0xf54e60(0x246)])/0x5;this['x']+=Math[_0xf54e60(0x2ff)](_0x1a0932*_0x41eee8),this['y']+=_0x4f8110;},Window_NameBox['prototype'][_0x248ad4(0x41d)]=function(){const _0x10a094=_0x248ad4,_0x2fa182=this[_0x10a094(0x213)],_0x857e0e=_0x2fa182['y'],_0x3cf211=VisuMZ[_0x10a094(0x402)][_0x10a094(0x417)][_0x10a094(0x2fd)][_0x10a094(0x3a2)];_0x857e0e>this['y']&&_0x857e0e<this['y']+this[_0x10a094(0x3c9)]-_0x3cf211&&(_0x10a094(0x21e)!=='bBgMb'?_0x5256b5=_0x3aac56[_0x10a094(0x2db)](/\\V\[(\d+)\]/gi,(_0x3db2e2,_0x1a94de)=>this['convertBackslashCharacters'](_0x19c57c(_0xec71c4[_0x10a094(0x3db)](_0x399a6c(_0x1a94de))))):this['y']=_0x2fa182['y']+_0x2fa182[_0x10a094(0x3c9)]);},VisuMZ['MessageCore'][_0x248ad4(0x38b)]=Window_NameBox[_0x248ad4(0x32d)]['refresh'],Window_NameBox[_0x248ad4(0x32d)][_0x248ad4(0x33c)]=function(){const _0x33e32d=_0x248ad4;this[_0x33e32d(0x246)]=0x0,VisuMZ['MessageCore']['Window_NameBox_refresh'][_0x33e32d(0x2a9)](this);},Window_ChoiceList[_0x248ad4(0x32d)]['isWordWrapEnabled']=function(){return![];},Window_ChoiceList[_0x248ad4(0x32d)]['isAutoColorAffected']=function(){return!![];},Window_ChoiceList[_0x248ad4(0x32d)][_0x248ad4(0x47a)]=function(){const _0x41017e=_0x248ad4;return $gameSystem[_0x41017e(0x38c)]()+0x8;},Window_ChoiceList[_0x248ad4(0x32d)][_0x248ad4(0x238)]=function(){return $gameSystem['getChoiceListMaxColumns']();},Window_ChoiceList[_0x248ad4(0x32d)][_0x248ad4(0x3ff)]=function(){const _0x48fb8a=_0x248ad4;this['refresh'](),this[_0x48fb8a(0x244)](),this[_0x48fb8a(0x20b)](),this[_0x48fb8a(0x3e3)]();},Window_ChoiceList[_0x248ad4(0x32d)][_0x248ad4(0x33c)]=function(){const _0x524743=_0x248ad4;this[_0x524743(0x44a)](),this['makeCommandList'](),this[_0x524743(0x213)]&&(this['updatePlacement'](),this[_0x524743(0x490)]()),this['createContents'](),this['updateBackground'](),this['refreshDimmerBitmap'](),Window_Selectable['prototype'][_0x524743(0x33c)][_0x524743(0x2a9)](this);},Window_ChoiceList[_0x248ad4(0x32d)][_0x248ad4(0x300)]=function(){const _0x3eff9e=_0x248ad4,_0x1efbe0=$gameMessage[_0x3eff9e(0x204)]();let _0x286eaa=0x0;for(let _0x25b725 of _0x1efbe0){_0x25b725=this['convertChoiceMacros'](_0x25b725);if(this[_0x3eff9e(0x1d5)](_0x25b725)){if(_0x3eff9e(0x255)!==_0x3eff9e(0x255))this[_0x3eff9e(0x443)](_0x50918c),_0x3cb11e[_0x3eff9e(0x32d)][_0x3eff9e(0x2de)]['call'](this,_0x75a221);else{const _0x765827=this[_0x3eff9e(0x3d7)](_0x25b725),_0x4c9840=this['isChoiceEnabled'](_0x25b725);this[_0x3eff9e(0x46c)](_0x765827,_0x3eff9e(0x2ed),_0x4c9840,_0x286eaa);}}_0x286eaa++;}},Window_ChoiceList[_0x248ad4(0x32d)][_0x248ad4(0x408)]=function(_0x20638d){const _0x389699=_0x248ad4;return Window_Base[_0x389699(0x32d)]['convertTextMacros'][_0x389699(0x2a9)](this,_0x20638d);},Window_ChoiceList['prototype'][_0x248ad4(0x1d5)]=function(_0x488eb8){const _0x103551=_0x248ad4;if(Imported[_0x103551(0x3eb)])$gameMessage[_0x103551(0x209)]();if(_0x488eb8[_0x103551(0x32c)](/<HIDE>/i))return![];if(_0x488eb8[_0x103551(0x32c)](/<SHOW>/i))return!![];if(_0x488eb8['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0xf0bf1d=RegExp['$1'][_0x103551(0x20d)](',')[_0x103551(0x483)](_0x5dbe83=>Number(_0x5dbe83)||0x0);for(const _0x1f371b of _0xf0bf1d){if(_0x103551(0x289)===_0x103551(0x384)){let _0x4b966e=0x0;return _0x55395f[_0x103551(0x32c)](/<CHOICE INDENT:[ ](\d+)>/gi)&&(_0x4b966e=_0x4398bb(_0x22c793['$1'])),_0x4b966e;}else{if(!$gameSwitches[_0x103551(0x3db)](_0x1f371b))return![];}}return!![];}if(_0x488eb8[_0x103551(0x32c)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x128b82=RegExp['$1']['split'](',')[_0x103551(0x483)](_0x1f53ee=>Number(_0x1f53ee)||0x0);for(const _0x327b7d of _0x128b82){if(_0x103551(0x492)===_0x103551(0x492)){if(!$gameSwitches['value'](_0x327b7d))return![];}else return this[_0x103551(0x1da)](_0x14daa5,!![],!![]),this[_0x103551(0x36c)](_0x103551(0x239),_0x3c5406(_0x43d265)||0x1),'';}return!![];}if(_0x488eb8[_0x103551(0x32c)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x103551(0x2fe)!==_0x103551(0x2fe))_0x117065='</WORDWRAP>'+_0x364859;else{const _0x316b8e=RegExp['$1']['split'](',')['map'](_0x1285c7=>Number(_0x1285c7)||0x0);for(const _0xaf3300 of _0x316b8e){if($gameSwitches[_0x103551(0x3db)](_0xaf3300))return!![];}return![];}}if(_0x488eb8[_0x103551(0x32c)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3bcc8d=RegExp['$1'][_0x103551(0x20d)](',')[_0x103551(0x483)](_0x16509c=>Number(_0x16509c)||0x0);for(const _0x27fd29 of _0x3bcc8d){if(_0x103551(0x286)!==_0x103551(0x286))_0x2d70ea=_0x23a3fb[_0x103551(0x2cd)]();else{if(!$gameSwitches[_0x103551(0x3db)](_0x27fd29))return!![];}}return![];}if(_0x488eb8[_0x103551(0x32c)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if('JsMJa'==='uQSXA')this[_0x103551(0x241)](_0x10d01b);else{const _0x1ea858=RegExp['$1'][_0x103551(0x20d)](',')[_0x103551(0x483)](_0x347fcf=>Number(_0x347fcf)||0x0);for(const _0x1c9945 of _0x1ea858){if(!$gameSwitches[_0x103551(0x3db)](_0x1c9945))return!![];}return![];}}if(_0x488eb8[_0x103551(0x32c)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0xd267ee=RegExp['$1'][_0x103551(0x20d)](',')['map'](_0x254e91=>Number(_0x254e91)||0x0);for(const _0x1958a7 of _0xd267ee){if($gameSwitches['value'](_0x1958a7))return![];}return!![];}return!![];},Window_ChoiceList['prototype'][_0x248ad4(0x3d7)]=function(_0x3bcedd){const _0x44490a=_0x248ad4;let _0x53fcf4=_0x3bcedd;return _0x53fcf4=_0x53fcf4[_0x44490a(0x2db)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x53fcf4=_0x53fcf4[_0x44490a(0x2db)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x53fcf4;},Window_ChoiceList['prototype'][_0x248ad4(0x304)]=function(_0x3917d8){const _0x3631b8=_0x248ad4;if(Imported[_0x3631b8(0x3eb)])$gameMessage[_0x3631b8(0x209)]();if(_0x3917d8[_0x3631b8(0x32c)](/<DISABLE>/i))return![];if(_0x3917d8[_0x3631b8(0x32c)](/<ENABLE>/i))return!![];if(_0x3917d8[_0x3631b8(0x32c)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x15a909=RegExp['$1'][_0x3631b8(0x20d)](',')[_0x3631b8(0x483)](_0x55c9db=>Number(_0x55c9db)||0x0);for(const _0x1d1bb9 of _0x15a909){if(!$gameSwitches[_0x3631b8(0x3db)](_0x1d1bb9))return![];}return!![];}if(_0x3917d8['match'](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x33aed9=RegExp['$1'][_0x3631b8(0x20d)](',')[_0x3631b8(0x483)](_0x2a68e7=>Number(_0x2a68e7)||0x0);for(const _0x1c71b2 of _0x33aed9){if(!$gameSwitches[_0x3631b8(0x3db)](_0x1c71b2))return![];}return!![];}if(_0x3917d8[_0x3631b8(0x32c)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5c1a2c=RegExp['$1']['split'](',')['map'](_0x242739=>Number(_0x242739)||0x0);for(const _0x401ef0 of _0x5c1a2c){if($gameSwitches[_0x3631b8(0x3db)](_0x401ef0))return!![];}return![];}if(_0x3917d8['match'](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x26fa54=RegExp['$1'][_0x3631b8(0x20d)](',')[_0x3631b8(0x483)](_0x32c357=>Number(_0x32c357)||0x0);for(const _0x1d61ab of _0x26fa54){if('kYFZM'===_0x3631b8(0x295)){if(!$gameSwitches[_0x3631b8(0x3db)](_0x1d61ab))return!![];}else _0x39af71[_0x3631b8(0x402)][_0x3631b8(0x45c)][_0x3631b8(0x2a9)](this),this['initMessageCore']();}return![];}if(_0x3917d8[_0x3631b8(0x32c)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5f4183=RegExp['$1'][_0x3631b8(0x20d)](',')[_0x3631b8(0x483)](_0x1de5b9=>Number(_0x1de5b9)||0x0);for(const _0x342240 of _0x5f4183){if(!$gameSwitches['value'](_0x342240))return!![];}return![];}if(_0x3917d8['match'](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0xeb28bb=RegExp['$1'][_0x3631b8(0x20d)](',')[_0x3631b8(0x483)](_0x377567=>Number(_0x377567)||0x0);for(const _0x2acd29 of _0xeb28bb){if('OmQRN'===_0x3631b8(0x26c))_0x359b1d['MessageCore'][_0x3631b8(0x1ee)][_0x3631b8(0x2a9)](this),this[_0x3631b8(0x3f8)](),this['process_VisuMZ_MessageCore_TextCodes_Replace'](),this[_0x3631b8(0x2d1)](),this['process_VisuMZ_MessageCore_AutoColor']();else{if($gameSwitches[_0x3631b8(0x3db)](_0x2acd29))return![];}}return!![];}return!![];},VisuMZ[_0x248ad4(0x402)]['Window_ChoiceList_updatePlacement']=Window_ChoiceList['prototype']['updatePlacement'],Window_ChoiceList[_0x248ad4(0x32d)][_0x248ad4(0x31b)]=function(){const _0x5c93be=_0x248ad4;VisuMZ[_0x5c93be(0x402)][_0x5c93be(0x343)]['call'](this),this[_0x5c93be(0x31f)]();},Window_ChoiceList[_0x248ad4(0x32d)]['placeCancelButton']=function(){const _0x10ed48=_0x248ad4;if(!this[_0x10ed48(0x2da)])return;const _0x370480=0x8,_0x86c415=this[_0x10ed48(0x2da)],_0x4b2bbc=this['x']+this[_0x10ed48(0x48e)],_0x5c0c53=Math[_0x10ed48(0x2ff)]((Graphics[_0x10ed48(0x48e)]-Graphics[_0x10ed48(0x421)])/0x2);if(_0x4b2bbc>=Graphics['boxWidth']+_0x5c0c53-_0x86c415['width']+_0x370480){if(_0x10ed48(0x21b)==='sDoFG')_0x86c415['x']=-_0x86c415[_0x10ed48(0x48e)]-_0x370480;else return _0x10ed48(0x400)[_0x10ed48(0x48b)](_0x5b4855,_0x4f5f62);}else _0x86c415['x']=this[_0x10ed48(0x48e)]+_0x370480;_0x86c415['y']=this[_0x10ed48(0x3c9)]/0x2-_0x86c415[_0x10ed48(0x3c9)]/0x2;},VisuMZ[_0x248ad4(0x402)][_0x248ad4(0x1e3)]=Window_ChoiceList[_0x248ad4(0x32d)]['windowX'],Window_ChoiceList['prototype'][_0x248ad4(0x1d1)]=function(){const _0x41d045=_0x248ad4;return this['_messageWindow']?this[_0x41d045(0x36a)]():VisuMZ['MessageCore'][_0x41d045(0x1e3)]['call'](this);},Window_ChoiceList[_0x248ad4(0x32d)][_0x248ad4(0x36a)]=function(){const _0x18c75e=_0x248ad4,_0x4b4db3=$gameMessage[_0x18c75e(0x203)]();if(_0x4b4db3===0x1)return(Graphics[_0x18c75e(0x421)]-this['windowWidth']())/0x2;else return _0x4b4db3===0x2?this['_messageWindow']['x']+this[_0x18c75e(0x213)][_0x18c75e(0x48e)]-this['windowWidth']():this['_messageWindow']['x'];},Window_ChoiceList[_0x248ad4(0x32d)][_0x248ad4(0x1dc)]=function(){const _0xf3f724=_0x248ad4,_0x2a6729=(this[_0xf3f724(0x1d3)]()+this[_0xf3f724(0x1e2)]())*this['maxCols']()+this[_0xf3f724(0x22e)]*0x2;return Math[_0xf3f724(0x352)](_0x2a6729,Graphics[_0xf3f724(0x48e)]);},Window_ChoiceList['prototype'][_0x248ad4(0x378)]=function(){const _0x472b83=_0x248ad4,_0x11193b=$gameMessage[_0x472b83(0x204)]()[_0x472b83(0x483)](_0x4f2710=>this[_0x472b83(0x408)](_0x4f2710))[_0x472b83(0x3c0)](_0x28a011=>this[_0x472b83(0x1d5)](_0x28a011)),_0x4ab315=Math[_0x472b83(0x245)](_0x11193b[_0x472b83(0x35e)]/this['maxCols']());return Math[_0x472b83(0x4bb)](0x1,Math[_0x472b83(0x352)](_0x4ab315,this[_0x472b83(0x333)]()));},Window_ChoiceList['prototype'][_0x248ad4(0x333)]=function(){const _0x2fc8bb=_0x248ad4,_0x157b43=this['_messageWindow'],_0x5dfccf=_0x157b43?_0x157b43['y']:0x0,_0x29b9ea=_0x157b43?_0x157b43['height']:0x0,_0x426653=Graphics[_0x2fc8bb(0x379)]/0x2;if(_0x5dfccf<_0x426653&&_0x5dfccf+_0x29b9ea>_0x426653)return 0x4;else{if(_0x2fc8bb(0x4b4)!==_0x2fc8bb(0x324))return $gameSystem[_0x2fc8bb(0x3f6)]();else{const _0x3f0ced=_0x2a9842>=0x1?_0x385815[_0x2fc8bb(0x4a7)](_0x562cca):null,_0x15b77c=_0x3f0ced?_0x3f0ced[_0x2fc8bb(0x3f9)]():'',_0x17d09c=_0x25d168(_0x5c8151[_0x2fc8bb(0x402)][_0x2fc8bb(0x417)][_0x2fc8bb(0x2d5)][_0x2fc8bb(0x459)]);return this[_0x2fc8bb(0x3b2)]()&&_0x17d09c!==0x0?_0x2fc8bb(0x400)[_0x2fc8bb(0x48b)](_0x17d09c,_0x15b77c):_0x15b77c;}}},Window_ChoiceList[_0x248ad4(0x32d)]['maxChoiceWidth']=function(){const _0x49aced=_0x248ad4;let _0x55fffa=this[_0x49aced(0x311)]();for(const _0x47cfbb of this['_list']){const _0x349b29=_0x47cfbb[_0x49aced(0x3f9)],_0x3291e2=this[_0x49aced(0x3e8)](_0x349b29),_0x409c18=this[_0x49aced(0x435)](_0x349b29)[_0x49aced(0x48e)]+_0x3291e2,_0x45c82d=Math[_0x49aced(0x245)](_0x409c18)+this[_0x49aced(0x2c6)]()*0x2;_0x55fffa=Math[_0x49aced(0x4bb)](_0x55fffa,_0x45c82d);}return _0x55fffa;},Window_ChoiceList[_0x248ad4(0x32d)][_0x248ad4(0x311)]=function(){const _0x12cf5c=_0x248ad4;let _0x336317=0x60;const _0xda1fd2=$gameMessage[_0x12cf5c(0x204)]();for(const _0x5b327e of _0xda1fd2){_0x5b327e['match'](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x336317=Math[_0x12cf5c(0x4bb)](_0x336317,Number(RegExp['$1'])));}return _0x336317;},Window_ChoiceList['prototype'][_0x248ad4(0x453)]=function(_0x1405ab){const _0x133861=_0x248ad4,_0x52dad1=this[_0x133861(0x456)](_0x1405ab),_0x3a931c=$gameSystem[_0x133861(0x440)]()!==_0x133861(0x3d6)?_0x133861(0x2b5)[_0x133861(0x48b)]($gameSystem['getChoiceListTextAlign']()):'',_0x3661e3=_0x3a931c+this['commandName'](_0x1405ab);this['changePaintOpacity'](this['isCommandEnabled'](_0x1405ab));const _0x1fbd2e=this[_0x133861(0x435)](_0x3661e3)[_0x133861(0x3c9)],_0x56878f=_0x52dad1['x']+this['getChoiceIndent'](_0x3661e3),_0x5ee307=Math['max'](_0x52dad1['y'],_0x52dad1['y']+Math['round']((_0x52dad1[_0x133861(0x3c9)]-_0x1fbd2e)/0x2));this[_0x133861(0x2ae)](_0x3661e3,_0x56878f,_0x5ee307,_0x52dad1[_0x133861(0x48e)]);},Window_ChoiceList[_0x248ad4(0x32d)]['getChoiceIndent']=function(_0x20d886){const _0x2acbcc=_0x248ad4;let _0x41474b=0x0;return _0x20d886[_0x2acbcc(0x32c)](/<CHOICE INDENT:[ ](\d+)>/gi)&&(_0x41474b=Number(RegExp['$1'])),_0x41474b;},Window_ChoiceList['prototype'][_0x248ad4(0x3fa)]=function(){const _0x25fcda=_0x248ad4;$gameMessage['onChoice'](this[_0x25fcda(0x281)]()),this[_0x25fcda(0x213)][_0x25fcda(0x451)](),this['close']();};