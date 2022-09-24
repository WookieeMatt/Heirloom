//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.39;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.39] [MessageCore]
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
 * Version 1.39: September 22, 2022
 * * Bug Fixes!
 * ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
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

const _0x2d27b8=_0x4787;(function(_0x285fee,_0xb7710e){const _0x5cf7cc=_0x4787,_0xc9620=_0x285fee();while(!![]){try{const _0x348440=parseInt(_0x5cf7cc(0x2ec))/0x1*(parseInt(_0x5cf7cc(0xc3))/0x2)+parseInt(_0x5cf7cc(0x308))/0x3*(-parseInt(_0x5cf7cc(0x243))/0x4)+parseInt(_0x5cf7cc(0x33a))/0x5+parseInt(_0x5cf7cc(0x1c8))/0x6+parseInt(_0x5cf7cc(0xa0))/0x7+-parseInt(_0x5cf7cc(0x2d8))/0x8*(parseInt(_0x5cf7cc(0x183))/0x9)+-parseInt(_0x5cf7cc(0x119))/0xa*(parseInt(_0x5cf7cc(0x31e))/0xb);if(_0x348440===_0xb7710e)break;else _0xc9620['push'](_0xc9620['shift']());}catch(_0x9e9367){_0xc9620['push'](_0xc9620['shift']());}}}(_0x38f1,0x25e48));var label=_0x2d27b8(0xe8),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x5f0478){const _0x3b11a0=_0x2d27b8;return _0x5f0478[_0x3b11a0(0x15d)]&&_0x5f0478['description'][_0x3b11a0(0x19f)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x2d27b8(0x7f)]=function(_0x2d348b,_0x5d55fa){const _0x131a11=_0x2d27b8;for(const _0x5cc97a in _0x5d55fa){if(_0x5cc97a['match'](/(.*):(.*)/i)){if(_0x131a11(0x1db)!==_0x131a11(0x1db))this[_0x131a11(0x208)](_0x39b453);else{const _0x1e180a=String(RegExp['$1']),_0x5c6e4f=String(RegExp['$2'])['toUpperCase']()[_0x131a11(0x18b)]();let _0x20185f,_0x248542,_0x4f9ed0;switch(_0x5c6e4f){case'NUM':_0x20185f=_0x5d55fa[_0x5cc97a]!==''?Number(_0x5d55fa[_0x5cc97a]):0x0;break;case _0x131a11(0x169):_0x248542=_0x5d55fa[_0x5cc97a]!==''?JSON['parse'](_0x5d55fa[_0x5cc97a]):[],_0x20185f=_0x248542[_0x131a11(0x154)](_0x16bbbd=>Number(_0x16bbbd));break;case'EVAL':_0x20185f=_0x5d55fa[_0x5cc97a]!==''?eval(_0x5d55fa[_0x5cc97a]):null;break;case _0x131a11(0x181):_0x248542=_0x5d55fa[_0x5cc97a]!==''?JSON[_0x131a11(0x127)](_0x5d55fa[_0x5cc97a]):[],_0x20185f=_0x248542['map'](_0x11b1ce=>eval(_0x11b1ce));break;case _0x131a11(0x1e8):_0x20185f=_0x5d55fa[_0x5cc97a]!==''?JSON[_0x131a11(0x127)](_0x5d55fa[_0x5cc97a]):'';break;case _0x131a11(0xdc):_0x248542=_0x5d55fa[_0x5cc97a]!==''?JSON[_0x131a11(0x127)](_0x5d55fa[_0x5cc97a]):[],_0x20185f=_0x248542[_0x131a11(0x154)](_0x2da380=>JSON[_0x131a11(0x127)](_0x2da380));break;case _0x131a11(0xf9):_0x20185f=_0x5d55fa[_0x5cc97a]!==''?new Function(JSON['parse'](_0x5d55fa[_0x5cc97a])):new Function(_0x131a11(0x258));break;case _0x131a11(0x23f):_0x248542=_0x5d55fa[_0x5cc97a]!==''?JSON['parse'](_0x5d55fa[_0x5cc97a]):[],_0x20185f=_0x248542[_0x131a11(0x154)](_0x333544=>new Function(JSON[_0x131a11(0x127)](_0x333544)));break;case _0x131a11(0x189):_0x20185f=_0x5d55fa[_0x5cc97a]!==''?String(_0x5d55fa[_0x5cc97a]):'';break;case _0x131a11(0x28a):_0x248542=_0x5d55fa[_0x5cc97a]!==''?JSON[_0x131a11(0x127)](_0x5d55fa[_0x5cc97a]):[],_0x20185f=_0x248542[_0x131a11(0x154)](_0x43ec1c=>String(_0x43ec1c));break;case _0x131a11(0xc2):_0x4f9ed0=_0x5d55fa[_0x5cc97a]!==''?JSON[_0x131a11(0x127)](_0x5d55fa[_0x5cc97a]):{},_0x2d348b[_0x1e180a]={},VisuMZ[_0x131a11(0x7f)](_0x2d348b[_0x1e180a],_0x4f9ed0);continue;case _0x131a11(0x306):_0x248542=_0x5d55fa[_0x5cc97a]!==''?JSON[_0x131a11(0x127)](_0x5d55fa[_0x5cc97a]):[],_0x20185f=_0x248542['map'](_0x48bbc4=>VisuMZ['ConvertParams']({},JSON[_0x131a11(0x127)](_0x48bbc4)));break;default:continue;}_0x2d348b[_0x1e180a]=_0x20185f;}}}return _0x2d348b;},(_0x5547b3=>{const _0x41e950=_0x2d27b8,_0x348811=_0x5547b3[_0x41e950(0x222)];for(const _0x3f9882 of dependencies){if(!Imported[_0x3f9882]){if(_0x41e950(0x7c)===_0x41e950(0x239)){_0x468232['MessageCore'][_0x41e950(0x291)]=[];for(let _0x215e74=0x1;_0x215e74<=0x1f;_0x215e74++){const _0x1fb3a0=_0x41e950(0x67)[_0x41e950(0x165)](_0x215e74),_0xf5e8ad=_0x4f2ffc['MessageCore'][_0x41e950(0x1d3)][_0x41e950(0x18c)][_0x1fb3a0];_0xf5e8ad[_0x41e950(0xb4)]((_0x55eb02,_0x4b8d6f)=>{const _0x3aa134=_0x41e950;if(!_0x55eb02||!_0x4b8d6f)return-0x1;return _0x4b8d6f[_0x3aa134(0x315)]-_0x55eb02['length'];}),this[_0x41e950(0xa2)](_0xf5e8ad,_0x215e74);}}else{alert(_0x41e950(0x339)[_0x41e950(0x165)](_0x348811,_0x3f9882)),SceneManager[_0x41e950(0x2d9)]();break;}}}const _0x3fe922=_0x5547b3[_0x41e950(0x121)];if(_0x3fe922[_0x41e950(0x1c7)](/\[Version[ ](.*?)\]/i)){const _0x934d5a=Number(RegExp['$1']);_0x934d5a!==VisuMZ[label][_0x41e950(0x2ba)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x348811,_0x934d5a)),SceneManager[_0x41e950(0x2d9)]());}if(_0x3fe922[_0x41e950(0x1c7)](/\[Tier[ ](\d+)\]/i)){if(_0x41e950(0x2bf)!=='GjfeN')this[_0x41e950(0x29b)](_0x14bff9['isMessageWindowWordWrap']());else{const _0x11205b=Number(RegExp['$1']);if(_0x11205b<tier){if('gvTFS'!==_0x41e950(0x305)){if(this[_0x41e950(0x225)]===_0x232bc8)this[_0x41e950(0x16c)]();this['_messageOffsetX']=_0x59cb58,this[_0x41e950(0x2ff)]=_0x7fca17;}else alert(_0x41e950(0x16e)[_0x41e950(0x165)](_0x348811,_0x11205b,tier)),SceneManager[_0x41e950(0x2d9)]();}else tier=Math[_0x41e950(0x9b)](_0x11205b,tier);}}VisuMZ[_0x41e950(0x7f)](VisuMZ[label][_0x41e950(0x1d3)],_0x5547b3['parameters']);})(pluginData),PluginManager[_0x2d27b8(0x1e3)](pluginData[_0x2d27b8(0x222)],_0x2d27b8(0xfa),_0x1ada89=>{const _0x2a7f84=_0x2d27b8;VisuMZ[_0x2a7f84(0x7f)](_0x1ada89,_0x1ada89);const _0x5ac2b1=_0x1ada89[_0x2a7f84(0x1da)]||$gameSystem[_0x2a7f84(0x2ab)]()||0x1,_0xf0049a=_0x1ada89[_0x2a7f84(0x26a)]||$gameSystem[_0x2a7f84(0x2ed)]()||0x1,_0x5132fa=_0x1ada89[_0x2a7f84(0x2a3)]||$gameSystem['getChoiceListMaxColumns']()||0x1,_0x4264b1=_0x1ada89[_0x2a7f84(0x2e0)][_0x2a7f84(0x294)]()||_0x2a7f84(0x20f);$gameSystem[_0x2a7f84(0x142)](_0x5ac2b1),$gameSystem[_0x2a7f84(0x17b)](_0xf0049a),$gameSystem[_0x2a7f84(0x2eb)](_0x5132fa),$gameSystem[_0x2a7f84(0x178)](_0x4264b1);}),PluginManager[_0x2d27b8(0x1e3)](pluginData['name'],'MessageWindowProperties',_0x3665f6=>{const _0xc7a98b=_0x2d27b8;VisuMZ[_0xc7a98b(0x7f)](_0x3665f6,_0x3665f6);const _0x438838=_0x3665f6[_0xc7a98b(0x1d5)]||$gameSystem[_0xc7a98b(0x99)]()||0x1,_0x5ca7bb=_0x3665f6[_0xc7a98b(0xe3)]||$gameSystem[_0xc7a98b(0x2ef)]()||0x1;$gameTemp[_0xc7a98b(0x29f)]=!![];const _0xe9d764=_0x3665f6[_0xc7a98b(0xc9)][_0xc7a98b(0x294)]();$gameSystem[_0xc7a98b(0x2e1)](_0x438838),$gameSystem[_0xc7a98b(0x13d)](_0x5ca7bb);[_0xc7a98b(0x6e),_0xc7a98b(0x24a)][_0xc7a98b(0x19f)](_0xe9d764)&&$gameSystem[_0xc7a98b(0xa9)](eval(_0xe9d764));const _0xee296c=SceneManager[_0xc7a98b(0x1b4)][_0xc7a98b(0x10d)];if(_0xee296c){if(_0xc7a98b(0x2aa)!==_0xc7a98b(0x2aa)){var _0x1780a6=/^\<(.*?)\>/[_0xc7a98b(0x88)](_0x1e0379[_0xc7a98b(0x105)][_0xc7a98b(0xc0)](_0x2289e5[_0xc7a98b(0x196)]));return _0x1780a6?(_0x113e67[_0xc7a98b(0x196)]+=_0x1780a6[0x0][_0xc7a98b(0x315)],_0x456583(_0x1780a6[0x0][_0xc7a98b(0xc0)](0x1,_0x1780a6[0x0][_0xc7a98b(0x315)]-0x1))):'';}else _0xee296c['resetWordWrap'](),_0xee296c[_0xc7a98b(0x75)](),_0xee296c[_0xc7a98b(0x332)]();}}),PluginManager[_0x2d27b8(0x1e3)](pluginData[_0x2d27b8(0x222)],_0x2d27b8(0x27b),_0x3e0f72=>{const _0x5f3103=_0x2d27b8;VisuMZ[_0x5f3103(0x7f)](_0x3e0f72,_0x3e0f72),$gameSystem[_0x5f3103(0x307)](_0x3e0f72[_0x5f3103(0xdf)],_0x3e0f72[_0x5f3103(0x24f)]);const _0x33d37b=SceneManager[_0x5f3103(0x1b4)]['_messageWindow'];_0x33d37b&&(_0x33d37b[_0x5f3103(0x20e)](),_0x33d37b[_0x5f3103(0x75)](),_0x33d37b[_0x5f3103(0x332)]());}),PluginManager[_0x2d27b8(0x1e3)](pluginData[_0x2d27b8(0x222)],_0x2d27b8(0x295),_0xfdbe28=>{const _0x20ad55=_0x2d27b8;VisuMZ[_0x20ad55(0x7f)](_0xfdbe28,_0xfdbe28);const _0xec2a55=_0xfdbe28['PictureIDs']||[],_0x1d0cfd=_0xfdbe28[_0x20ad55(0x270)]||0x0,_0x38d01a=['upperleft','up','upperright',_0x20ad55(0x1e4),_0x20ad55(0x268),_0x20ad55(0x113),_0x20ad55(0x8e),'down',_0x20ad55(0x6c)];for(const _0x42187a of _0xec2a55){$gameScreen[_0x20ad55(0xe5)](_0x42187a,_0x1d0cfd);for(const _0x17941d of _0x38d01a){if(_0xfdbe28[_0x17941d]===undefined)continue;$gameScreen[_0x20ad55(0x10c)](_0x42187a,_0xfdbe28[_0x17941d],_0x17941d);}}}),PluginManager[_0x2d27b8(0x1e3)](pluginData[_0x2d27b8(0x222)],_0x2d27b8(0x7a),_0x28de12=>{const _0x3f38b3=_0x2d27b8;VisuMZ['ConvertParams'](_0x28de12,_0x28de12);const _0xac99ef=_0x28de12[_0x3f38b3(0xcf)]||[];for(const _0x5d0907 of _0xac99ef){$gameScreen[_0x3f38b3(0x1e5)](_0x5d0907),$gameScreen['erasePictureTextBuffer'](_0x5d0907);}}),PluginManager[_0x2d27b8(0x1e3)](pluginData[_0x2d27b8(0x222)],_0x2d27b8(0x13e),_0x27fc69=>{const _0x2c98cf=_0x2d27b8;$gameScreen[_0x2c98cf(0x1e0)]();}),VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0xc7)]=Scene_Boot[_0x2d27b8(0x244)]['onDatabaseLoaded'],Scene_Boot[_0x2d27b8(0x244)][_0x2d27b8(0x30d)]=function(){const _0x4f0b82=_0x2d27b8;VisuMZ[_0x4f0b82(0xe8)]['Scene_Boot_onDatabaseLoaded'][_0x4f0b82(0x1ca)](this),this[_0x4f0b82(0x101)](),this['process_VisuMZ_MessageCore_TextCodes_Replace'](),this[_0x4f0b82(0x28c)](),this[_0x4f0b82(0x1ba)]();},VisuMZ['MessageCore'][_0x2d27b8(0x23c)]=function(_0x289d40){const _0x3211a5=_0x2d27b8,_0x4458e0=VisuMZ[_0x3211a5(0xe8)][_0x3211a5(0x1d3)][_0x289d40];_0x4458e0['sort']((_0x413823,_0x5efce3)=>{const _0x554f21=_0x3211a5;if(!_0x413823||!_0x5efce3)return-0x1;return _0x5efce3[_0x554f21(0x2f5)]['length']-_0x413823[_0x554f21(0x2f5)]['length'];});},Scene_Boot[_0x2d27b8(0x244)][_0x2d27b8(0x101)]=function(){const _0xc5fb4f=_0x2d27b8;VisuMZ[_0xc5fb4f(0xe8)][_0xc5fb4f(0x23c)](_0xc5fb4f(0x1e6));for(const _0x16fe4a of VisuMZ[_0xc5fb4f(0xe8)][_0xc5fb4f(0x1d3)]['TextCodeActions']){if(_0xc5fb4f(0x255)!==_0xc5fb4f(0x255)){const _0x698cfc=_0x503f24['$1'][_0xc5fb4f(0xc8)](',')[_0xc5fb4f(0x154)](_0x3950b9=>_0x27aa2c(_0x3950b9)||0x0);for(const _0x3ce273 of _0x698cfc){if(!_0x2ff976['value'](_0x3ce273))return!![];}return![];}else{_0x16fe4a[_0xc5fb4f(0x2f5)]=_0x16fe4a[_0xc5fb4f(0x2f5)][_0xc5fb4f(0xd4)](),_0x16fe4a['textCodeCheck']=new RegExp('\x1b'+_0x16fe4a[_0xc5fb4f(0x2f5)],'gi'),_0x16fe4a['textCodeResult']='\x1b'+_0x16fe4a[_0xc5fb4f(0x2f5)];if(_0x16fe4a[_0xc5fb4f(0xff)]==='')_0x16fe4a[_0xc5fb4f(0x325)]+=_0xc5fb4f(0x104);}}},Scene_Boot[_0x2d27b8(0x244)][_0x2d27b8(0x15b)]=function(){const _0x4502f8=_0x2d27b8;VisuMZ[_0x4502f8(0xe8)][_0x4502f8(0x23c)]('TextCodeReplace');for(const _0x35753e of VisuMZ[_0x4502f8(0xe8)][_0x4502f8(0x1d3)][_0x4502f8(0x164)]){_0x35753e[_0x4502f8(0x1c4)]=new RegExp('\x1b'+_0x35753e[_0x4502f8(0x2f5)]+_0x35753e[_0x4502f8(0xff)],'gi');if(_0x35753e['TextStr']!==''&&_0x35753e['TextStr']!=='Undefined'){if(_0x4502f8(0x22b)===_0x4502f8(0x2fb)){this[_0x4502f8(0x2cf)](_0x3ca70d);if(this['isColorLocked']())return;_0x37509c[_0x4502f8(0x147)]&&(this['_textColorStack']=this[_0x4502f8(0x11e)]||[],this[_0x4502f8(0x172)][_0x4502f8(0x2df)]=this['_textColorStack'][_0x4502f8(0x33f)]()||_0x5ba017['normalColor']());}else _0x35753e[_0x4502f8(0x325)]=new Function('return\x20\x27'+_0x35753e[_0x4502f8(0x174)]['replace'](/\\/g,'\x1b')+'\x27');}else _0x35753e['textCodeResult']=_0x35753e['TextJS'];}},Scene_Boot[_0x2d27b8(0x244)]['process_VisuMZ_MessageCore_TextMacros']=function(){const _0x34d40e=_0x2d27b8;for(const _0x5c2715 of VisuMZ['MessageCore']['Settings'][_0x34d40e(0x32c)]){_0x5c2715[_0x34d40e(0x1c4)]=new RegExp('\x5c['+_0x5c2715[_0x34d40e(0x2f5)]+'\x5c]','gi');if(_0x5c2715[_0x34d40e(0x174)]!==''&&_0x5c2715[_0x34d40e(0x174)]!==_0x34d40e(0xaa)){let _0x679492=_0x5c2715[_0x34d40e(0x174)];_0x679492=_0x679492[_0x34d40e(0x19d)](/\\/g,'\x1b'),_0x679492=_0x679492[_0x34d40e(0x19d)]('\x27','\x5c\x27'),_0x679492=_0x679492['replace']('\x22','\x5c\x22'),_0x5c2715[_0x34d40e(0x325)]=new Function(_0x34d40e(0x125)+_0x679492+'\x27');}else _0x5c2715[_0x34d40e(0x325)]=_0x5c2715[_0x34d40e(0x191)];}},Scene_Boot[_0x2d27b8(0x244)][_0x2d27b8(0x1ba)]=function(){const _0x23cdb2=_0x2d27b8,_0x2d47ad=VisuMZ[_0x23cdb2(0xe8)][_0x23cdb2(0x1d3)][_0x23cdb2(0x18c)];!VisuMZ[_0x23cdb2(0x1a6)]&&(VisuMZ[_0x23cdb2(0xe8)]['AddAutoColor']($dataClasses,_0x2d47ad[_0x23cdb2(0x290)]),VisuMZ[_0x23cdb2(0xe8)][_0x23cdb2(0xb5)]($dataSkills,_0x2d47ad['Skills']),VisuMZ[_0x23cdb2(0xe8)][_0x23cdb2(0xb5)]($dataItems,_0x2d47ad['Items']),VisuMZ['MessageCore'][_0x23cdb2(0xb5)]($dataWeapons,_0x2d47ad['Weapons']),VisuMZ[_0x23cdb2(0xe8)][_0x23cdb2(0xb5)]($dataArmors,_0x2d47ad[_0x23cdb2(0x1f3)]),VisuMZ[_0x23cdb2(0xe8)][_0x23cdb2(0xb5)]($dataEnemies,_0x2d47ad[_0x23cdb2(0x78)]),VisuMZ[_0x23cdb2(0xe8)][_0x23cdb2(0xb5)]($dataStates,_0x2d47ad[_0x23cdb2(0x247)])),VisuMZ['MessageCore']['CreateAutoColorRegExpLists']();},VisuMZ[_0x2d27b8(0xe8)]['AutoColorBypassList']=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x2d27b8(0x115),_0x2d27b8(0x25e),_0x2d27b8(0x131),'</I>',_0x2d27b8(0xed),_0x2d27b8(0x303),_0x2d27b8(0x22c),'</CENTER>','<RIGHT>',_0x2d27b8(0x1f5),_0x2d27b8(0x1d0),_0x2d27b8(0x210),_0x2d27b8(0x18d),_0x2d27b8(0x1a2),_0x2d27b8(0x19e),_0x2d27b8(0x212),_0x2d27b8(0x8d),_0x2d27b8(0x227),_0x2d27b8(0x2c4),_0x2d27b8(0x1fd),_0x2d27b8(0x1b5),_0x2d27b8(0x234),_0x2d27b8(0x1cf),_0x2d27b8(0x275),_0x2d27b8(0x328),_0x2d27b8(0x1e1),_0x2d27b8(0x316),_0x2d27b8(0x1eb),'ALL','ANY'],VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0xb5)]=function(_0xa4e412,_0x16a810){const _0x32a319=_0x2d27b8;if(_0x16a810<=0x0)return;const _0x4e9f2b=_0xa4e412;for(const _0x2ed24e of _0x4e9f2b){if(!_0x2ed24e)continue;VisuMZ[_0x32a319(0xe8)][_0x32a319(0x259)](_0x2ed24e,_0x16a810);}},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x2b4)]=function(){const _0x566a49=_0x2d27b8;VisuMZ[_0x566a49(0xe8)][_0x566a49(0x291)]=[];for(let _0x226faf=0x1;_0x226faf<=0x1f;_0x226faf++){if('UDoXR'===_0x566a49(0x2bb)){if(_0x2d585f[_0x566a49(0x1aa)](_0x557427))return!![];}else{const _0x54b283=_0x566a49(0x67)[_0x566a49(0x165)](_0x226faf),_0x8bbe75=VisuMZ[_0x566a49(0xe8)][_0x566a49(0x1d3)][_0x566a49(0x18c)][_0x54b283];_0x8bbe75['sort']((_0x4484c1,_0x2e37c5)=>{const _0x367118=_0x566a49;if(!_0x4484c1||!_0x2e37c5)return-0x1;return _0x2e37c5[_0x367118(0x315)]-_0x4484c1[_0x367118(0x315)];}),this[_0x566a49(0xa2)](_0x8bbe75,_0x226faf);}}},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0xa2)]=function(_0x59972a,_0x57bac2){const _0x41dfaf=_0x2d27b8;for(const _0x7d6b5f of _0x59972a){if(_0x7d6b5f[_0x41dfaf(0x315)]<=0x0)continue;if(/^\d+$/[_0x41dfaf(0x129)](_0x7d6b5f))continue;let _0x173150=VisuMZ[_0x41dfaf(0xe8)][_0x41dfaf(0x92)](_0x7d6b5f);if(_0x7d6b5f['match'](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x4a0b6d=new RegExp(_0x173150,'i');else var _0x4a0b6d=new RegExp('\x5cb'+_0x173150+'\x5cb','g');VisuMZ[_0x41dfaf(0xe8)]['AutoColorRegExp'][_0x41dfaf(0x249)]([_0x4a0b6d,_0x41dfaf(0x1b6)['format'](_0x57bac2,_0x7d6b5f)]);}},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x92)]=function(_0x4eec24){const _0xbcfcd0=_0x2d27b8;return _0x4eec24=_0x4eec24[_0xbcfcd0(0x19d)](/(\W)/gi,(_0x279e8f,_0x567508)=>'\x5c%1'[_0xbcfcd0(0x165)](_0x567508)),_0x4eec24;},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x2f7)]=VisuMZ[_0x2d27b8(0x2f7)],VisuMZ['ParseClassNotetags']=function(_0x4c0d9c){const _0x481c79=_0x2d27b8;VisuMZ[_0x481c79(0xe8)][_0x481c79(0x2f7)][_0x481c79(0x1ca)](this,_0x4c0d9c);const _0x42ac96=VisuMZ[_0x481c79(0xe8)][_0x481c79(0x1d3)]['AutoColor'];VisuMZ[_0x481c79(0xe8)][_0x481c79(0x259)](_0x4c0d9c,_0x42ac96[_0x481c79(0x290)]);},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x71)]=VisuMZ[_0x2d27b8(0x71)],VisuMZ['ParseSkillNotetags']=function(_0x43f56c){const _0x3b3221=_0x2d27b8;VisuMZ['MessageCore'][_0x3b3221(0x71)]['call'](this,_0x43f56c);const _0x644f76=VisuMZ['MessageCore'][_0x3b3221(0x1d3)][_0x3b3221(0x18c)];VisuMZ[_0x3b3221(0xe8)]['CreateAutoColorFor'](_0x43f56c,_0x644f76[_0x3b3221(0x79)]);},0x7,VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x33b)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x2d27b8(0x33b)]=function(_0x1fbf1d){const _0xaa3f8a=_0x2d27b8;VisuMZ['MessageCore'][_0xaa3f8a(0x33b)][_0xaa3f8a(0x1ca)](this,_0x1fbf1d);const _0x5f5d21=VisuMZ[_0xaa3f8a(0xe8)][_0xaa3f8a(0x1d3)]['AutoColor'];VisuMZ[_0xaa3f8a(0xe8)][_0xaa3f8a(0x259)](_0x1fbf1d,_0x5f5d21['Items']);},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x6d)]=VisuMZ[_0x2d27b8(0x6d)],VisuMZ['ParseWeaponNotetags']=function(_0xda4d99){const _0x58f130=_0x2d27b8;VisuMZ[_0x58f130(0xe8)][_0x58f130(0x6d)][_0x58f130(0x1ca)](this,_0xda4d99);const _0x478ed7=VisuMZ[_0x58f130(0xe8)][_0x58f130(0x1d3)][_0x58f130(0x18c)];VisuMZ[_0x58f130(0xe8)][_0x58f130(0x259)](_0xda4d99,_0x478ed7[_0x58f130(0x2c0)]);},VisuMZ[_0x2d27b8(0xe8)]['ParseArmorNotetags']=VisuMZ['ParseArmorNotetags'],VisuMZ[_0x2d27b8(0x2bc)]=function(_0x4a3ea4){const _0x5defc5=_0x2d27b8;VisuMZ[_0x5defc5(0xe8)][_0x5defc5(0x2bc)][_0x5defc5(0x1ca)](this,_0x4a3ea4);const _0xe66d55=VisuMZ['MessageCore'][_0x5defc5(0x1d3)][_0x5defc5(0x18c)];VisuMZ[_0x5defc5(0xe8)][_0x5defc5(0x259)](_0x4a3ea4,_0xe66d55[_0x5defc5(0x1f3)]);},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x138)]=VisuMZ[_0x2d27b8(0x138)],VisuMZ[_0x2d27b8(0x138)]=function(_0x3549bf){const _0x3d7004=_0x2d27b8;VisuMZ[_0x3d7004(0xe8)][_0x3d7004(0x138)][_0x3d7004(0x1ca)](this,_0x3549bf);const _0x1df60c=VisuMZ[_0x3d7004(0xe8)][_0x3d7004(0x1d3)][_0x3d7004(0x18c)];VisuMZ[_0x3d7004(0xe8)][_0x3d7004(0x259)](_0x3549bf,_0x1df60c[_0x3d7004(0x78)]);},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x84)]=VisuMZ[_0x2d27b8(0x84)],VisuMZ[_0x2d27b8(0x84)]=function(_0x4b005f){const _0x3fac7b=_0x2d27b8;VisuMZ[_0x3fac7b(0xe8)][_0x3fac7b(0x84)]['call'](this,_0x4b005f);const _0x26eee7=VisuMZ[_0x3fac7b(0xe8)]['Settings'][_0x3fac7b(0x18c)];VisuMZ[_0x3fac7b(0xe8)][_0x3fac7b(0x259)](_0x4b005f,_0x26eee7['States']);},VisuMZ['MessageCore'][_0x2d27b8(0x259)]=function(_0x24b447,_0x4adb61){const _0x1c4832=_0x2d27b8;if(_0x4adb61<=0x0)return;const _0x408c79=VisuMZ[_0x1c4832(0xe8)]['Settings'][_0x1c4832(0x18c)][_0x1c4832(0x250)+_0x4adb61];let _0x4b184a=_0x24b447['name'][_0x1c4832(0x18b)]();if(/^\d+$/[_0x1c4832(0x129)](_0x4b184a))return;if(VisuMZ[_0x1c4832(0xe8)]['AutoColorBypassList']['includes'](_0x4b184a[_0x1c4832(0xd4)]()))return;_0x4b184a=_0x4b184a[_0x1c4832(0x19d)](/\\I\[(\d+)\]/gi,''),_0x4b184a=_0x4b184a[_0x1c4832(0x19d)](/\x1bI\[(\d+)\]/gi,'');if(_0x4b184a[_0x1c4832(0x315)]<=0x0)return;if(_0x4b184a['match'](/-----/i))return;_0x408c79[_0x1c4832(0x249)](_0x4b184a);},SceneManager[_0x2d27b8(0x272)]=function(){const _0x1d5ee9=_0x2d27b8;return this[_0x1d5ee9(0x1b4)]&&this[_0x1d5ee9(0x1b4)][_0x1d5ee9(0x289)]===Scene_Battle;},SceneManager[_0x2d27b8(0xd2)]=function(){const _0x57f4ec=_0x2d27b8;return this[_0x57f4ec(0x1b4)]&&this[_0x57f4ec(0x1b4)][_0x57f4ec(0x289)]===Scene_Map;},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x16b)]=TextManager['message'],TextManager[_0x2d27b8(0x1b0)]=function(_0x320481){const _0x3d8230=_0x2d27b8,_0x28bbcf=[_0x3d8230(0x85),_0x3d8230(0xcc),_0x3d8230(0x185),'surprise',_0x3d8230(0x195),_0x3d8230(0x323),_0x3d8230(0x202),_0x3d8230(0x2f8),'obtainGold',_0x3d8230(0x160)];let _0x1e8521=VisuMZ[_0x3d8230(0xe8)]['TextManager_message'][_0x3d8230(0x1ca)](this,_0x320481);return _0x28bbcf[_0x3d8230(0x19f)](_0x320481)&&(_0x1e8521=_0x3d8230(0x212)+_0x1e8521),_0x1e8521;},ConfigManager[_0x2d27b8(0xe4)]=VisuMZ[_0x2d27b8(0xe8)]['Settings']['TextSpeed'][_0x2d27b8(0xd7)],VisuMZ[_0x2d27b8(0xe8)]['ConfigManager_makeData']=ConfigManager['makeData'],ConfigManager['makeData']=function(){const _0x59b299=_0x2d27b8,_0x40608c=VisuMZ[_0x59b299(0xe8)]['ConfigManager_makeData'][_0x59b299(0x1ca)](this);return _0x40608c[_0x59b299(0xe4)]=this[_0x59b299(0xe4)],_0x40608c;},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x10b)]=ConfigManager[_0x2d27b8(0x2d0)],ConfigManager['applyData']=function(_0x46ef56){const _0x4fd3e5=_0x2d27b8;VisuMZ['MessageCore'][_0x4fd3e5(0x10b)][_0x4fd3e5(0x1ca)](this,_0x46ef56);if('textSpeed'in _0x46ef56){if(_0x4fd3e5(0x26d)===_0x4fd3e5(0x2e6)){const _0x4aca71=this[_0x4fd3e5(0x120)](_0x3f4710)[_0x4fd3e5(0xc8)](',');if(!_0x9b4a66['drawing'])return;const _0x11141e=_0x4aca71[0x0][_0x4fd3e5(0x18b)](),_0x2c22f4=_0x4aca71[0x1]||0x0,_0x429be8=_0x4aca71[0x2]||0x0,_0xed6c8e=_0x3ac847[_0x4fd3e5(0x26b)](_0x11141e),_0x12e2f5=this[_0x4fd3e5(0x172)][_0x4fd3e5(0x135)];_0xed6c8e[_0x4fd3e5(0x87)](this['drawBackPicture'][_0x4fd3e5(0x111)](this,_0xed6c8e,_0x750956['x'],_0x1f2596['y'],_0x2c22f4,_0x429be8,_0x12e2f5));}else this[_0x4fd3e5(0xe4)]=Number(_0x46ef56[_0x4fd3e5(0xe4)])['clamp'](0x1,0xb);}else this[_0x4fd3e5(0xe4)]=VisuMZ[_0x4fd3e5(0xe8)][_0x4fd3e5(0x1d3)][_0x4fd3e5(0x2e9)]['Default'];},TextManager[_0x2d27b8(0x74)]=VisuMZ['MessageCore'][_0x2d27b8(0x1d3)][_0x2d27b8(0x2e9)][_0x2d27b8(0x166)],TextManager['instantTextSpeed']=VisuMZ[_0x2d27b8(0xe8)]['Settings']['TextSpeed'][_0x2d27b8(0x297)],VisuMZ[_0x2d27b8(0xe8)]['Game_System_initialize']=Game_System[_0x2d27b8(0x244)]['initialize'],Game_System[_0x2d27b8(0x244)][_0x2d27b8(0x91)]=function(){const _0x4914a6=_0x2d27b8;VisuMZ['MessageCore'][_0x4914a6(0x33e)][_0x4914a6(0x1ca)](this),this[_0x4914a6(0x16c)]();},Game_System[_0x2d27b8(0x244)][_0x2d27b8(0x16c)]=function(){const _0x5d7681=_0x2d27b8,_0x357b6d=VisuMZ[_0x5d7681(0xe8)]['Settings'][_0x5d7681(0x192)],_0x136c56=VisuMZ[_0x5d7681(0xe8)]['Settings'][_0x5d7681(0xc9)];this[_0x5d7681(0x225)]={'messageRows':_0x357b6d[_0x5d7681(0x2b7)],'messageWidth':_0x357b6d[_0x5d7681(0x2e2)],'messageWordWrap':_0x136c56['MessageWindow'],'helpWordWrap':_0x136c56[_0x5d7681(0x1ce)],'choiceLineHeight':_0x357b6d[_0x5d7681(0x336)],'choiceRows':_0x357b6d['ChoiceWindowMaxRows'],'choiceCols':_0x357b6d[_0x5d7681(0x83)],'choiceTextAlign':_0x357b6d[_0x5d7681(0x20a)]},this['_messageOffsetX']===undefined&&(this[_0x5d7681(0xb1)]=_0x357b6d[_0x5d7681(0x2e8)],this['_messageOffsetY']=_0x357b6d[_0x5d7681(0x241)]);},Game_System[_0x2d27b8(0x244)][_0x2d27b8(0x99)]=function(){const _0xafb60e=_0x2d27b8;if(this[_0xafb60e(0x225)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0xafb60e(0x29a)]===undefined)this['initMessageCore']();return this[_0xafb60e(0x225)][_0xafb60e(0x29a)];},Game_System[_0x2d27b8(0x244)][_0x2d27b8(0x2e1)]=function(_0x2a1b20){const _0x54ef94=_0x2d27b8;if(this[_0x54ef94(0x225)]===undefined)this[_0x54ef94(0x16c)]();if(this[_0x54ef94(0x225)][_0x54ef94(0x29a)]===undefined)this[_0x54ef94(0x16c)]();this[_0x54ef94(0x225)]['messageRows']=_0x2a1b20||0x1;},Game_System[_0x2d27b8(0x244)]['getMessageWindowWidth']=function(){const _0x5514f2=_0x2d27b8;if(this[_0x5514f2(0x225)]===undefined)this[_0x5514f2(0x16c)]();if(this[_0x5514f2(0x225)][_0x5514f2(0x286)]===undefined)this[_0x5514f2(0x16c)]();return this[_0x5514f2(0x225)][_0x5514f2(0x286)];},Game_System['prototype'][_0x2d27b8(0x13d)]=function(_0x14354d){const _0xf581ff=_0x2d27b8;if(this[_0xf581ff(0x225)]===undefined)this[_0xf581ff(0x16c)]();if(this['_MessageCoreSettings'][_0xf581ff(0x286)]===undefined)this['initMessageCore']();_0x14354d=Math[_0xf581ff(0x1c6)](_0x14354d);if(_0x14354d%0x2!==0x0)_0x14354d+=0x1;this[_0xf581ff(0x225)][_0xf581ff(0x286)]=_0x14354d||0x2;},Game_System[_0x2d27b8(0x244)]['isMessageWindowWordWrap']=function(){const _0x235e28=_0x2d27b8;if(this[_0x235e28(0x225)]===undefined)this['initMessageCore']();if(this[_0x235e28(0x225)][_0x235e28(0x9d)]===undefined)this[_0x235e28(0x16c)]();return this['_MessageCoreSettings'][_0x235e28(0x9d)];},Game_System[_0x2d27b8(0x244)][_0x2d27b8(0xa9)]=function(_0x118739){const _0x48427e=_0x2d27b8;if(this[_0x48427e(0x225)]===undefined)this[_0x48427e(0x16c)]();if(this[_0x48427e(0x225)][_0x48427e(0x9d)]===undefined)this[_0x48427e(0x16c)]();this[_0x48427e(0x225)][_0x48427e(0x9d)]=_0x118739;},Game_System['prototype'][_0x2d27b8(0x216)]=function(){const _0x41d722=_0x2d27b8;if(this['_messageOffsetX']===undefined){const _0x3d9a2a=VisuMZ[_0x41d722(0xe8)]['Settings'][_0x41d722(0x192)];this[_0x41d722(0xb1)]=_0x3d9a2a['MsgWindowOffsetX'],this['_messageOffsetY']=_0x3d9a2a['MsgWindowOffsetY'];}return{'x':this[_0x41d722(0xb1)]||0x0,'y':this['_messageOffsetY']||0x0};},Game_System[_0x2d27b8(0x244)][_0x2d27b8(0x307)]=function(_0xf05d29,_0x2f753){const _0x57d647=_0x2d27b8;if(this[_0x57d647(0x225)]===undefined)this[_0x57d647(0x16c)]();this['_messageOffsetX']=_0xf05d29,this[_0x57d647(0x2ff)]=_0x2f753;},Game_System[_0x2d27b8(0x244)][_0x2d27b8(0x2da)]=function(){const _0x4ce01a=_0x2d27b8;if(this[_0x4ce01a(0x225)]===undefined)this[_0x4ce01a(0x16c)]();if(this['_MessageCoreSettings'][_0x4ce01a(0x10a)]===undefined)this[_0x4ce01a(0x16c)]();return this[_0x4ce01a(0x225)]['helpWordWrap'];},Game_System[_0x2d27b8(0x244)]['setHelpWindowWordWrap']=function(_0x1b4b40){const _0x46e3bb=_0x2d27b8;if(this[_0x46e3bb(0x225)]===undefined)this[_0x46e3bb(0x16c)]();if(this['_MessageCoreSettings'][_0x46e3bb(0x10a)]===undefined)this[_0x46e3bb(0x16c)]();this[_0x46e3bb(0x225)]['helpWordWrap']=_0x1b4b40;},Game_System['prototype'][_0x2d27b8(0x2ab)]=function(){const _0x58796a=_0x2d27b8;if(this[_0x58796a(0x225)]===undefined)this[_0x58796a(0x16c)]();if(this['_MessageCoreSettings']['choiceLineHeight']===undefined)this['initMessageCore']();return this[_0x58796a(0x225)][_0x58796a(0x97)];},Game_System['prototype']['setChoiceListLineHeight']=function(_0x38efa3){const _0x2520e9=_0x2d27b8;if(this[_0x2520e9(0x225)]===undefined)this[_0x2520e9(0x16c)]();if(this[_0x2520e9(0x225)][_0x2520e9(0x97)]===undefined)this['initMessageCore']();this[_0x2520e9(0x225)][_0x2520e9(0x97)]=_0x38efa3||0x1;},Game_System[_0x2d27b8(0x244)][_0x2d27b8(0x2ed)]=function(){const _0x7ca01e=_0x2d27b8;if(this[_0x7ca01e(0x225)]===undefined)this[_0x7ca01e(0x16c)]();if(this[_0x7ca01e(0x225)]['choiceRows']===undefined)this[_0x7ca01e(0x16c)]();return this[_0x7ca01e(0x225)][_0x7ca01e(0x8a)];},Game_System[_0x2d27b8(0x244)]['setChoiceListMaxRows']=function(_0xee552c){const _0x3c809b=_0x2d27b8;if(this[_0x3c809b(0x225)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings']['choiceRows']===undefined)this[_0x3c809b(0x16c)]();this[_0x3c809b(0x225)]['choiceRows']=_0xee552c||0x1;},Game_System['prototype'][_0x2d27b8(0x15c)]=function(){const _0x34a7cc=_0x2d27b8;if(this[_0x34a7cc(0x225)]===undefined)this['initMessageCore']();if(this[_0x34a7cc(0x225)]['choiceCols']===undefined)this['initMessageCore']();return this[_0x34a7cc(0x225)][_0x34a7cc(0xa4)];},Game_System['prototype']['setChoiceListMaxColumns']=function(_0x2b5dc4){const _0xb042d=_0x2d27b8;if(this[_0xb042d(0x225)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings']['choiceCols']===undefined)this[_0xb042d(0x16c)]();this[_0xb042d(0x225)][_0xb042d(0xa4)]=_0x2b5dc4||0x1;},Game_System['prototype'][_0x2d27b8(0x230)]=function(){const _0x4d570f=_0x2d27b8;if(this['_MessageCoreSettings']===undefined)this[_0x4d570f(0x16c)]();if(this['_MessageCoreSettings'][_0x4d570f(0xbd)]===undefined)this['initMessageCore']();return this['_MessageCoreSettings']['choiceTextAlign'];},Game_System[_0x2d27b8(0x244)][_0x2d27b8(0x178)]=function(_0x3f91df){const _0x3caaed=_0x2d27b8;if(this[_0x3caaed(0x225)]===undefined)this[_0x3caaed(0x16c)]();if(this[_0x3caaed(0x225)][_0x3caaed(0xbd)]===undefined)this[_0x3caaed(0x16c)]();this[_0x3caaed(0x225)][_0x3caaed(0xbd)]=_0x3f91df['toLowerCase']();},VisuMZ['MessageCore'][_0x2d27b8(0xec)]=Game_Screen[_0x2d27b8(0x244)][_0x2d27b8(0xe1)],Game_Screen['prototype'][_0x2d27b8(0xe1)]=function(){const _0x1f6def=_0x2d27b8;VisuMZ['MessageCore'][_0x1f6def(0xec)]['call'](this),this['clearAllPictureTexts']();},Game_Screen[_0x2d27b8(0x244)][_0x2d27b8(0x95)]=function(){const _0x5f19b5=_0x2d27b8;this[_0x5f19b5(0x11d)]=[],this['_pictureTextBuffer']=[],this[_0x5f19b5(0x106)]=[];},Game_Screen[_0x2d27b8(0x244)][_0x2d27b8(0x2d1)]=function(_0x2d4c20){const _0x15ee22=_0x2d27b8;if(this[_0x15ee22(0x11d)]===undefined)this[_0x15ee22(0x95)]();const _0x50518f=this[_0x15ee22(0x144)](_0x2d4c20);return this['_pictureText'][_0x50518f]=this[_0x15ee22(0x11d)][_0x50518f]||{},this[_0x15ee22(0x11d)][_0x50518f];},Game_Screen[_0x2d27b8(0x244)]['getPictureText']=function(_0x451264,_0x115298){return _0x115298=_0x115298['toLowerCase']()['trim'](),this['getPictureTextData'](_0x451264)[_0x115298]||'';},Game_Screen[_0x2d27b8(0x244)][_0x2d27b8(0x10c)]=function(_0x23d38a,_0x39aa87,_0x43f388){const _0x29dd00=_0x2d27b8;_0x43f388=_0x43f388[_0x29dd00(0x294)]()['trim'](),this[_0x29dd00(0x2d1)](_0x23d38a)[_0x43f388]=_0x39aa87||'',this[_0x29dd00(0x314)](_0x23d38a,!![]);},Game_Screen[_0x2d27b8(0x244)][_0x2d27b8(0x1e5)]=function(_0x437b56){const _0x1a141b=_0x2d27b8;if(this['_pictureText']===undefined)this['clearAllPictureTexts']();const _0xd99bda=this['realPictureId'](_0x437b56);this[_0x1a141b(0x11d)][_0xd99bda]=null,this[_0x1a141b(0x314)](_0x437b56,!![]);},Game_Screen[_0x2d27b8(0x244)][_0x2d27b8(0x187)]=function(_0x1a092e){const _0x4f818a=_0x2d27b8;if(this['_pictureText']===undefined)this[_0x4f818a(0x95)]();const _0x3b50be=this[_0x4f818a(0x144)](_0x1a092e);return this['_pictureTextBuffer'][_0x3b50be]||0x0;},Game_Screen['prototype'][_0x2d27b8(0xe5)]=function(_0x1ae7a3,_0x38a3ad){const _0x3a7af3=_0x2d27b8;if(this[_0x3a7af3(0x11d)]===undefined)this[_0x3a7af3(0x95)]();const _0x3aaea4=this[_0x3a7af3(0x144)](_0x1ae7a3);this['_pictureTextBuffer'][_0x3aaea4]=Math[_0x3a7af3(0x9b)](0x0,_0x38a3ad);},Game_Screen[_0x2d27b8(0x244)]['erasePictureTextBuffer']=function(_0x57ebec){const _0x37b9f3=_0x2d27b8;if(this[_0x37b9f3(0x11d)]===undefined)this[_0x37b9f3(0x95)]();const _0x40237d=this[_0x37b9f3(0x144)](_0x57ebec);this[_0x37b9f3(0x2fd)][_0x40237d]=undefined;},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x13c)]=Game_Screen[_0x2d27b8(0x244)][_0x2d27b8(0x1e2)],Game_Screen[_0x2d27b8(0x244)][_0x2d27b8(0x1e2)]=function(_0x5773f8){const _0x44d3f2=_0x2d27b8;VisuMZ[_0x44d3f2(0xe8)][_0x44d3f2(0x13c)][_0x44d3f2(0x1ca)](this,_0x5773f8),this[_0x44d3f2(0x1e5)](_0x5773f8),this[_0x44d3f2(0x30f)](_0x5773f8),this[_0x44d3f2(0x314)](_0x5773f8,!![]);},Game_Screen[_0x2d27b8(0x244)]['requestPictureTextRefreshAll']=function(){const _0xe3e6c3=_0x2d27b8;for(const _0x485ecf of this[_0xe3e6c3(0x14e)]){if(_0x485ecf){if('yVloD'==='YbgTc')_0x23f196=_0x5b5baf||_0x423e83[_0xe3e6c3(0x2c7)],_0x336092=_0xd35844||_0x25c44e[_0xe3e6c3(0x2dc)],this[_0xe3e6c3(0x279)][_0xe3e6c3(0x135)]=_0x5d7824,this[_0xe3e6c3(0x279)][_0xe3e6c3(0x211)](_0x200270,0x0,0x0,_0x4c958e[_0xe3e6c3(0x2c7)],_0x4306cb[_0xe3e6c3(0x2dc)],_0x5def98,_0x269b53,_0x5e2352,_0x234c40),this[_0xe3e6c3(0x279)]['paintOpacity']=0xff;else{let _0x51f911=this[_0xe3e6c3(0x14e)][_0xe3e6c3(0x269)](_0x485ecf);this[_0xe3e6c3(0x314)](_0x51f911);}}}},Game_Screen[_0x2d27b8(0x244)][_0x2d27b8(0x314)]=function(_0x43f482,_0x37391a){const _0x43d57e=_0x2d27b8;this[_0x43d57e(0x106)]=this[_0x43d57e(0x106)]||[],(this[_0x43d57e(0x2f3)](_0x43f482)||_0x37391a)&&this[_0x43d57e(0x106)][_0x43d57e(0x249)](_0x43f482);},Game_Screen[_0x2d27b8(0x244)]['needsPictureTextRefresh']=function(_0x54689d){const _0x365694=_0x2d27b8;return this[_0x365694(0x106)]=this[_0x365694(0x106)]||[],this[_0x365694(0x106)][_0x365694(0x19f)](_0x54689d);},Game_Screen[_0x2d27b8(0x244)][_0x2d27b8(0x263)]=function(_0x7faaae){const _0x41e7fc=_0x2d27b8;this['_pictureTextRefresh']=this[_0x41e7fc(0x106)]||[],this[_0x41e7fc(0x106)][_0x41e7fc(0x14b)](_0x7faaae);},Game_Screen['prototype'][_0x2d27b8(0x2f3)]=function(_0x5b058b){const _0x47b418=_0x2d27b8,_0x2c6a3b=[_0x47b418(0xe9),'up',_0x47b418(0xe7),_0x47b418(0x1e4),_0x47b418(0x268),'right',_0x47b418(0x8e),_0x47b418(0xca),_0x47b418(0x6c)];return _0x2c6a3b[_0x47b418(0x260)](_0x233eb3=>this[_0x47b418(0xce)](_0x5b058b,_0x233eb3)!=='');},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x203)]=Game_Party[_0x2d27b8(0x244)][_0x2d27b8(0x91)],Game_Party[_0x2d27b8(0x244)][_0x2d27b8(0x91)]=function(){const _0x38b618=_0x2d27b8;VisuMZ[_0x38b618(0xe8)][_0x38b618(0x203)][_0x38b618(0x1ca)](this),this['initMessageCore']();},Game_Party[_0x2d27b8(0x244)][_0x2d27b8(0x16c)]=function(){this['_lastGainedItemData']={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x2d27b8(0x244)][_0x2d27b8(0x143)]=function(){const _0x30ba4e=_0x2d27b8;if(this[_0x30ba4e(0x31c)]===undefined)this[_0x30ba4e(0x16c)]();return this[_0x30ba4e(0x31c)];},Game_Party[_0x2d27b8(0x244)][_0x2d27b8(0x248)]=function(_0x190fe8,_0x2e5ded){const _0x441332=_0x2d27b8;if(this[_0x441332(0x31c)]===undefined)this[_0x441332(0x16c)]();if(!_0x190fe8)return;if(DataManager[_0x441332(0x319)](_0x190fe8))this[_0x441332(0x31c)]['type']=0x0;else{if(DataManager[_0x441332(0x214)](_0x190fe8))this[_0x441332(0x31c)][_0x441332(0x2d3)]=0x1;else DataManager[_0x441332(0x2b1)](_0x190fe8)&&('NLgge'!==_0x441332(0x2ea)?this[_0x441332(0x31c)]['type']=0x2:this[_0x441332(0x31c)]={'type':0x0,'id':0x0,'quantity':0x0});}this[_0x441332(0x31c)]['id']=_0x190fe8['id'],this['_lastGainedItemData'][_0x441332(0x140)]=_0x2e5ded;},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x282)]=Game_Party[_0x2d27b8(0x244)]['gainItem'],Game_Party['prototype'][_0x2d27b8(0x1be)]=function(_0x236797,_0x3a355d,_0x116e95){const _0x28bfa7=_0x2d27b8;VisuMZ[_0x28bfa7(0xe8)]['Game_Party_gainItem'][_0x28bfa7(0x1ca)](this,_0x236797,_0x3a355d,_0x116e95),_0x3a355d>0x0&&this['setLastGainedItemData'](_0x236797,_0x3a355d);},VisuMZ[_0x2d27b8(0xe8)]['Game_Map_initialize']=Game_Map[_0x2d27b8(0x244)]['initialize'],Game_Map[_0x2d27b8(0x244)][_0x2d27b8(0x91)]=function(){const _0x8a9ed5=_0x2d27b8;VisuMZ[_0x8a9ed5(0xe8)][_0x8a9ed5(0x320)]['call'](this),this[_0x8a9ed5(0x246)]=[];},VisuMZ['MessageCore'][_0x2d27b8(0x1f9)]=Game_Map[_0x2d27b8(0x244)][_0x2d27b8(0x27d)],Game_Map[_0x2d27b8(0x244)][_0x2d27b8(0x27d)]=function(){const _0x431cb6=_0x2d27b8;VisuMZ[_0x431cb6(0xe8)][_0x431cb6(0x1f9)][_0x431cb6(0x1ca)](this),this[_0x431cb6(0x246)]=[];},VisuMZ['MessageCore'][_0x2d27b8(0x13f)]=Game_Map[_0x2d27b8(0x244)][_0x2d27b8(0x2fc)],Game_Map[_0x2d27b8(0x244)][_0x2d27b8(0x2fc)]=function(){const _0x3d2d6f=_0x2d27b8;VisuMZ[_0x3d2d6f(0xe8)][_0x3d2d6f(0x13f)][_0x3d2d6f(0x1ca)](this),this['updateMessageCommonEvents']();},Game_Map['prototype'][_0x2d27b8(0x21b)]=function(_0x1f904a){const _0xc74e69=_0x2d27b8;if(!$dataCommonEvents[_0x1f904a])return;this['_messageCommonEvents']=this['_messageCommonEvents']||[];const _0x24efc9=this[_0xc74e69(0x1df)]['_eventId'],_0x18f27a=new Game_MessageCommonEvent(_0x1f904a,_0x24efc9);this[_0xc74e69(0x246)]['push'](_0x18f27a);},Game_Map[_0x2d27b8(0x244)][_0x2d27b8(0x130)]=function(){const _0x1787bb=_0x2d27b8;this[_0x1787bb(0x246)]=this[_0x1787bb(0x246)]||[];for(const _0xcc6739 of this[_0x1787bb(0x246)]){if(!_0xcc6739[_0x1787bb(0x1df)]){if('cfjEe'!==_0x1787bb(0x12e))this['_messageCommonEvents']['remove'](_0xcc6739);else return this['_scene']&&this[_0x1787bb(0x1b4)]['constructor']===_0x542056;}else _0xcc6739[_0x1787bb(0x8f)]();}},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x103)]=Game_Map[_0x2d27b8(0x244)][_0x2d27b8(0x82)],Game_Map['prototype']['refresh']=function(){const _0x2dcddb=_0x2d27b8;VisuMZ[_0x2dcddb(0xe8)][_0x2dcddb(0x103)][_0x2dcddb(0x1ca)](this),$gameScreen[_0x2dcddb(0x1e0)]();},Game_Interpreter[_0x2d27b8(0x244)][_0x2d27b8(0x1fb)]=function(_0x3d36a1){const _0x3a9ad2=_0x2d27b8;if($gameMessage['isBusy']())return![];return this['prepareShowTextCommand'](_0x3d36a1),this[_0x3a9ad2(0xd6)](_0x3d36a1),this[_0x3a9ad2(0x333)](_0x3d36a1),this[_0x3a9ad2(0x262)]('message'),!![];},Game_Interpreter[_0x2d27b8(0x244)][_0x2d27b8(0x1ec)]=function(_0x36ca3e){const _0x10098e=_0x2d27b8;$gameMessage[_0x10098e(0x1fa)](_0x36ca3e[0x0],_0x36ca3e[0x1]),$gameMessage[_0x10098e(0x134)](_0x36ca3e[0x2]),$gameMessage[_0x10098e(0x2f4)](_0x36ca3e[0x3]),$gameMessage['setSpeakerName'](_0x36ca3e[0x4]);},Game_Interpreter[_0x2d27b8(0x244)][_0x2d27b8(0xd6)]=function(_0x1b6770){const _0x300268=_0x2d27b8;while(this[_0x300268(0x89)]()){this[_0x300268(0x150)]++;if(this[_0x300268(0x17c)]()['code']===0x191){let _0x364fa4=this[_0x300268(0x17c)]()[_0x300268(0x90)][0x0];_0x364fa4=VisuMZ['MessageCore'][_0x300268(0x1ff)](_0x364fa4),$gameMessage['add'](_0x364fa4);}if(this['isBreakShowTextCommands']())break;}},Game_Interpreter[_0x2d27b8(0x244)]['isContinuePrepareShowTextCommands']=function(){const _0x3cde3d=_0x2d27b8;if(this['nextEventCode']()===0x65&&$gameSystem['getMessageWindowRows']()>0x4){if(_0x3cde3d(0x231)==='bWlPs')return!![];else this[_0x3cde3d(0x106)]=this[_0x3cde3d(0x106)]||[],this['_pictureTextRefresh'][_0x3cde3d(0x14b)](_0x529809);}else return this[_0x3cde3d(0x117)]()===0x191;},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x1ff)]=function(_0xf02115){const _0x5cc848=_0x2d27b8;return _0xf02115=_0xf02115[_0x5cc848(0x19d)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0xf02115;},Game_Interpreter['prototype'][_0x2d27b8(0x285)]=function(){const _0x52f498=_0x2d27b8;if(this[_0x52f498(0x17c)]()&&this[_0x52f498(0x17c)]()['parameters'][0x0]['match'](/<(?:NEXT PAGE|NEXTPAGE)>/gi)){if(_0x52f498(0xbe)===_0x52f498(0x274)){const _0x5bb405=this['_messageWindow'],_0x378347=_0x5bb405?_0x5bb405['y']:0x0,_0x302935=_0x5bb405?_0x5bb405[_0x52f498(0x2dc)]:0x0,_0x124846=_0xdd454d[_0x52f498(0x198)]/0x2;return _0x378347<_0x124846&&_0x378347+_0x302935>_0x124846?0x4:_0x5d70ea[_0x52f498(0x2ed)]();}else return!![];}return $gameMessage[_0x52f498(0x1d1)][_0x52f498(0x315)]>=$gameSystem[_0x52f498(0x99)]()&&this[_0x52f498(0x117)]()!==0x191;},Game_Interpreter[_0x2d27b8(0x244)][_0x2d27b8(0x333)]=function(_0x1c0f2c){const _0x5d4773=_0x2d27b8;switch(this[_0x5d4773(0x117)]()){case 0x66:this[_0x5d4773(0x150)]++,this['setupChoices'](this[_0x5d4773(0x17c)]()['parameters']);break;case 0x67:this['_index']++,this[_0x5d4773(0x2ee)](this[_0x5d4773(0x17c)]()['parameters']);break;case 0x68:this[_0x5d4773(0x150)]++,this[_0x5d4773(0x2e5)](this[_0x5d4773(0x17c)]()[_0x5d4773(0x90)]);break;}},VisuMZ[_0x2d27b8(0xe8)]['Game_Interpreter_setupChoices']=Game_Interpreter[_0x2d27b8(0x244)][_0x2d27b8(0x179)],Game_Interpreter[_0x2d27b8(0x244)][_0x2d27b8(0x179)]=function(_0x1cfede){const _0x357686=_0x2d27b8;_0x1cfede=this['addContinuousShowChoices'](),VisuMZ['MessageCore'][_0x357686(0xda)]['call'](this,_0x1cfede);},Game_Interpreter[_0x2d27b8(0x244)]['addContinuousShowChoices']=function(){const _0x5e2c71=_0x2d27b8,_0x2009e1=this[_0x5e2c71(0x150)],_0x256ec0=[];let _0x30335a=0x0;this['_index']++;while(this['_index']<this['_list'][_0x5e2c71(0x315)]){if(this[_0x5e2c71(0x17c)]()['indent']===this[_0x5e2c71(0xee)]){if(this[_0x5e2c71(0x17c)]()[_0x5e2c71(0x182)]===0x194&&this[_0x5e2c71(0x117)]()!==0x66)break;else{if(this[_0x5e2c71(0x17c)]()[_0x5e2c71(0x182)]===0x66)this[_0x5e2c71(0x197)](_0x30335a,this[_0x5e2c71(0x17c)](),_0x2009e1),this['_index']-=0x2;else{if(this[_0x5e2c71(0x17c)]()['code']===0x192){if('TkndD'!==_0x5e2c71(0xd1)){const _0x29a5f2=_0x5e2c71(0x69);_0x909af6=_0x29a5f2[_0x5e2c71(0x165)](_0x4c8f2f[_0x5e2c71(0x280)],_0x3c1fe8[_0x5e2c71(0x222)]);}else this[_0x5e2c71(0x17c)]()['parameters'][0x0]=_0x30335a,_0x30335a++;}}}}this[_0x5e2c71(0x150)]++;}return this['_index']=_0x2009e1,this[_0x5e2c71(0x17c)]()[_0x5e2c71(0x90)];},Game_Interpreter[_0x2d27b8(0x244)][_0x2d27b8(0x197)]=function(_0x1cabf4,_0xde6390,_0x5c6094){const _0x19afb3=_0x2d27b8;this[_0x19afb3(0xcb)](_0x1cabf4,_0xde6390,_0x5c6094),this[_0x19afb3(0xf1)](_0x1cabf4,_0xde6390,_0x5c6094),this['addExtraShowChoices'](_0xde6390,_0x5c6094);},Game_Interpreter[_0x2d27b8(0x244)]['adjustShowChoiceDefault']=function(_0x22aa19,_0x4b915a,_0x72de1b){const _0x3b88cd=_0x2d27b8;if(_0x4b915a[_0x3b88cd(0x90)][0x2]<0x0)return;const _0x543719=_0x4b915a[_0x3b88cd(0x90)][0x2]+_0x22aa19;this[_0x3b88cd(0x110)][_0x72de1b]['parameters'][0x2]=_0x543719;},Game_Interpreter['prototype'][_0x2d27b8(0xf1)]=function(_0x43c5ab,_0x59ea13,_0x2374fc){const _0x3e61a0=_0x2d27b8;if(_0x59ea13[_0x3e61a0(0x90)][0x1]>=0x0){if('eQxNA'===_0x3e61a0(0x10f))return this[_0x3e61a0(0x10d)]?this[_0x3e61a0(0x9c)]():_0x1ccdd3[_0x3e61a0(0xe8)][_0x3e61a0(0x337)][_0x3e61a0(0x1ca)](this);else{var _0x1a1ddf=_0x59ea13['parameters'][0x1]+_0x43c5ab;this[_0x3e61a0(0x110)][_0x2374fc][_0x3e61a0(0x90)][0x1]=_0x1a1ddf;}}else _0x59ea13[_0x3e61a0(0x90)][0x1]===-0x2&&(this[_0x3e61a0(0x110)][_0x2374fc]['parameters'][0x1]=_0x59ea13[_0x3e61a0(0x90)][0x1]);},Game_Interpreter[_0x2d27b8(0x244)][_0x2d27b8(0x28e)]=function(_0xc4428b,_0x12c0c9){const _0x2e85d3=_0x2d27b8;for(const _0x29cf9a of _0xc4428b[_0x2e85d3(0x90)][0x0]){this[_0x2e85d3(0x110)][_0x12c0c9]['parameters'][0x0]['push'](_0x29cf9a);}this['_list'][_0x2e85d3(0x22e)](this['_index']-0x1,0x2);};function _0x4787(_0x4cd7ce,_0x53aa1a){const _0x38f11b=_0x38f1();return _0x4787=function(_0x478720,_0x805dc7){_0x478720=_0x478720-0x67;let _0x363272=_0x38f11b[_0x478720];return _0x363272;},_0x4787(_0x4cd7ce,_0x53aa1a);}function Game_MessageCommonEvent(){const _0x5bd0df=_0x2d27b8;this[_0x5bd0df(0x91)](...arguments);}Game_MessageCommonEvent[_0x2d27b8(0x244)][_0x2d27b8(0x91)]=function(_0x112046,_0x2d106e){const _0x498595=_0x2d27b8;this[_0x498595(0x2cb)]=_0x112046,this[_0x498595(0xa3)]=_0x2d106e||0x0,this[_0x498595(0x82)]();},Game_MessageCommonEvent['prototype'][_0x2d27b8(0x16f)]=function(){const _0x3316d9=_0x2d27b8;return $dataCommonEvents[this[_0x3316d9(0x2cb)]];},Game_MessageCommonEvent[_0x2d27b8(0x244)][_0x2d27b8(0x112)]=function(){const _0x4168fa=_0x2d27b8;return this[_0x4168fa(0x16f)]()[_0x4168fa(0x112)];},Game_MessageCommonEvent[_0x2d27b8(0x244)][_0x2d27b8(0x82)]=function(){const _0x1ce795=_0x2d27b8;this[_0x1ce795(0x1df)]=new Game_Interpreter(),this[_0x1ce795(0x1df)]['setup'](this[_0x1ce795(0x112)](),this['_eventId']);},Game_MessageCommonEvent[_0x2d27b8(0x244)][_0x2d27b8(0x8f)]=function(){const _0x16c4c5=_0x2d27b8;this[_0x16c4c5(0x1df)]&&(this[_0x16c4c5(0x1df)][_0x16c4c5(0x1bb)]()?_0x16c4c5(0x17d)!=='LtQVC'?this[_0x16c4c5(0x1df)][_0x16c4c5(0x8f)]():(_0x1aeeac[_0x16c4c5(0xe8)][_0x16c4c5(0x10b)][_0x16c4c5(0x1ca)](this,_0x280c1a),_0x16c4c5(0xe4)in _0x77fd26?this[_0x16c4c5(0xe4)]=_0x5d32da(_0x262b3f[_0x16c4c5(0xe4)])[_0x16c4c5(0x18f)](0x1,0xb):this['textSpeed']=_0x7b7dfb['MessageCore'][_0x16c4c5(0x1d3)][_0x16c4c5(0x2e9)][_0x16c4c5(0xd7)]):this[_0x16c4c5(0x114)]());},Game_MessageCommonEvent[_0x2d27b8(0x244)][_0x2d27b8(0x114)]=function(){const _0x574276=_0x2d27b8;this[_0x574276(0x1df)]=null;},Scene_Message[_0x2d27b8(0x244)][_0x2d27b8(0x311)]=function(){const _0x4cae9b=_0x2d27b8,_0x2510a2=Math[_0x4cae9b(0x312)](Graphics['width'],$gameSystem[_0x4cae9b(0x2ef)]()),_0x1500a7=$gameSystem[_0x4cae9b(0x99)](),_0x33a0f9=this[_0x4cae9b(0x340)](_0x1500a7,![]),_0x1a1659=(Graphics[_0x4cae9b(0x1f2)]-_0x2510a2)/0x2,_0x3714fc=0x0;return new Rectangle(_0x1a1659,_0x3714fc,_0x2510a2,_0x33a0f9);},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x1a8)]=Scene_Options[_0x2d27b8(0x244)][_0x2d27b8(0x6f)],Scene_Options['prototype']['maxCommands']=function(){const _0x4326c7=_0x2d27b8;let _0x27c836=VisuMZ['MessageCore'][_0x4326c7(0x1a8)][_0x4326c7(0x1ca)](this);const _0x14bd9e=VisuMZ[_0x4326c7(0xe8)][_0x4326c7(0x1d3)];if(_0x14bd9e[_0x4326c7(0x2e9)][_0x4326c7(0xc4)]&&_0x14bd9e[_0x4326c7(0x2e9)][_0x4326c7(0xdb)])_0x27c836++;return _0x27c836;},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0xef)]=Sprite_Picture[_0x2d27b8(0x244)][_0x2d27b8(0x1dd)],Sprite_Picture[_0x2d27b8(0x244)][_0x2d27b8(0x1dd)]=function(){const _0x3e29e3=_0x2d27b8;VisuMZ['MessageCore'][_0x3e29e3(0xef)][_0x3e29e3(0x1ca)](this),this['createPictureText']();},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0xbb)]=Sprite_Picture[_0x2d27b8(0x244)]['update'],Sprite_Picture[_0x2d27b8(0x244)][_0x2d27b8(0x8f)]=function(){const _0x1799c7=_0x2d27b8;VisuMZ[_0x1799c7(0xe8)][_0x1799c7(0xbb)][_0x1799c7(0x1ca)](this),this[_0x1799c7(0x6b)]();},Sprite_Picture['prototype']['updatePictureText']=function(){const _0x1c4aec=_0x2d27b8;if(!this[_0x1c4aec(0x1a5)])return;this[_0x1c4aec(0x298)](),this[_0x1c4aec(0x1d8)](),this[_0x1c4aec(0x19b)](),this[_0x1c4aec(0x15e)]();},Sprite_Picture[_0x2d27b8(0x244)]['createPictureText']=function(){const _0x298ba1=_0x2d27b8;if(this[_0x298ba1(0x221)])return;if(this['_pictureTextSprite'])return;const _0x16885f=new Rectangle(0x0,0x0,0x0,0x0);this[_0x298ba1(0x221)]=new Window_Base(_0x16885f),this['_pictureTextWindow'][_0x298ba1(0x170)]=0x0,this[_0x298ba1(0x21c)]=new Sprite(),this[_0x298ba1(0x2a5)](this[_0x298ba1(0x21c)],0x0),this[_0x298ba1(0x157)]=0x0,this[_0x298ba1(0x175)]=0x0,this[_0x298ba1(0x23a)]={};},Sprite_Picture[_0x2d27b8(0x244)]['resizePictureText']=function(){const _0x3a3ddc=_0x2d27b8;if(!this[_0x3a3ddc(0x221)])return;if(this['_pictureTextWidth']===this[_0x3a3ddc(0x2c7)]&&this['_pictureTextHeight']===this[_0x3a3ddc(0x2dc)])return;this['_pictureTextWidth']=this[_0x3a3ddc(0x2c7)],this[_0x3a3ddc(0x175)]=this['height'],this['_pictureTextCache']={},this[_0x3a3ddc(0x221)][_0x3a3ddc(0x284)](0x0,0x0,this[_0x3a3ddc(0x2c7)],this[_0x3a3ddc(0x2dc)]);},Sprite_Picture[_0x2d27b8(0x244)]['anchorPictureText']=function(){const _0xad54c7=_0x2d27b8;if(!this['_pictureTextSprite'])return;this['_pictureTextSprite'][_0xad54c7(0x176)]['x']=this[_0xad54c7(0x176)]['x'],this[_0xad54c7(0x21c)][_0xad54c7(0x176)]['y']=this[_0xad54c7(0x176)]['y'];},Sprite_Picture[_0x2d27b8(0x244)]['drawPictureText']=function(){const _0x2b9f45=_0x2d27b8;if(!this['_pictureTextWindow'])return;if(!this[_0x2b9f45(0x1ad)]())return;const _0x38a3e5=[_0x2b9f45(0xe9),'up',_0x2b9f45(0xe7),_0x2b9f45(0x1e4),'center',_0x2b9f45(0x113),_0x2b9f45(0x8e),_0x2b9f45(0xca),_0x2b9f45(0x6c)];this[_0x2b9f45(0x221)][_0x2b9f45(0x332)]();for(const _0x1f279e of _0x38a3e5){if(_0x2b9f45(0x108)!==_0x2b9f45(0x1fe))this[_0x2b9f45(0x1f1)](_0x1f279e);else{const _0xe358e6=_0x129229['$1'][_0x2b9f45(0xc8)](',')['map'](_0x15dea1=>_0x280259(_0x15dea1)||0x0);for(const _0x537d35 of _0xe358e6){if(_0x2d7afe[_0x2b9f45(0x1aa)](_0x537d35))return!![];}return![];}}},Sprite_Picture['prototype'][_0x2d27b8(0x1ad)]=function(){const _0x135e6f=_0x2d27b8;if($gameScreen['needsPictureTextRefresh'](this[_0x135e6f(0x2ad)]))return!![];const _0xd7f97e=[_0x135e6f(0xe9),'up',_0x135e6f(0xe7),'left',_0x135e6f(0x268),_0x135e6f(0x113),_0x135e6f(0x8e),_0x135e6f(0xca),_0x135e6f(0x6c)];for(const _0x16b03e of _0xd7f97e){const _0x4079eb=$gameScreen[_0x135e6f(0xce)](this[_0x135e6f(0x2ad)],_0x16b03e);if(this[_0x135e6f(0x23a)][_0x16b03e]===_0x4079eb)continue;return!![];}return![];},Sprite_Picture[_0x2d27b8(0x244)][_0x2d27b8(0x1f1)]=function(_0x41ee89){const _0x184b7a=_0x2d27b8;$gameScreen['clearPictureTextRefresh'](this['_pictureId']);const _0x165d40=$gameScreen[_0x184b7a(0xce)](this[_0x184b7a(0x2ad)],_0x41ee89);this[_0x184b7a(0x23a)][_0x41ee89]=_0x165d40;const _0x5b783e=this[_0x184b7a(0x221)][_0x184b7a(0x277)](_0x165d40);let _0x491033=$gameScreen[_0x184b7a(0x187)](this['_pictureId']),_0x45f564=_0x491033,_0x284433=_0x491033;if(['up',_0x184b7a(0x268),_0x184b7a(0xca)][_0x184b7a(0x19f)](_0x41ee89))_0x184b7a(0x25b)!==_0x184b7a(0x252)?_0x45f564=Math[_0x184b7a(0x205)]((this[_0x184b7a(0x2c7)]-_0x5b783e[_0x184b7a(0x2c7)])/0x2):(this[_0x184b7a(0x1a3)](),this[_0x184b7a(0x148)](),this[_0x184b7a(0x10d)]&&(this['updatePlacement'](),this[_0x184b7a(0x1a9)]()),this['createContents'](),this[_0x184b7a(0x1ae)](),this[_0x184b7a(0x330)](),_0x4307e7[_0x184b7a(0x244)][_0x184b7a(0x82)][_0x184b7a(0x1ca)](this));else[_0x184b7a(0xe7),_0x184b7a(0x113),'lowerright'][_0x184b7a(0x19f)](_0x41ee89)&&(_0x184b7a(0x73)!==_0x184b7a(0x304)?_0x45f564=Math[_0x184b7a(0x205)](this['width']-_0x5b783e[_0x184b7a(0x2c7)]-_0x491033):(_0x339e1e['MessageCore']['Window_NameBox_updatePlacement'][_0x184b7a(0x1ca)](this),this['updateRelativePosition'](),this['updateOffsetPosition'](),this[_0x184b7a(0x24e)](),this[_0x184b7a(0x219)]()));if(['left','center',_0x184b7a(0x113)][_0x184b7a(0x19f)](_0x41ee89))_0x284433=Math[_0x184b7a(0x205)]((this[_0x184b7a(0x2dc)]-_0x5b783e[_0x184b7a(0x2dc)])/0x2);else{if([_0x184b7a(0x8e),_0x184b7a(0xca),_0x184b7a(0x6c)][_0x184b7a(0x19f)](_0x41ee89)){if('VaUAY'==='SZLVi'){const _0x1e791e=_0x24c811['$1'][_0x184b7a(0xc8)](',')[_0x184b7a(0x154)](_0x3a369e=>_0x2a266e(_0x3a369e)||0x0);for(const _0x3813da of _0x1e791e){if(!_0x4ee630[_0x184b7a(0x1aa)](_0x3813da))return![];}return!![];}else _0x284433=Math['floor'](this[_0x184b7a(0x2dc)]-_0x5b783e[_0x184b7a(0x2dc)]-_0x491033);}}this[_0x184b7a(0x221)][_0x184b7a(0x1b1)](_0x165d40,_0x45f564,_0x284433);},Sprite_Picture[_0x2d27b8(0x244)][_0x2d27b8(0x15e)]=function(){const _0x55b794=_0x2d27b8;if(!this['_pictureTextWindow'])return;if(!this[_0x55b794(0x21c)])return;this[_0x55b794(0x21c)][_0x55b794(0x26c)]=this[_0x55b794(0x221)][_0x55b794(0x172)];},VisuMZ[_0x2d27b8(0xe8)]['Window_Base_initialize']=Window_Base[_0x2d27b8(0x244)]['initialize'],Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x91)]=function(_0x19cd40){const _0x4199d3=_0x2d27b8;this[_0x4199d3(0x16c)](_0x19cd40),VisuMZ[_0x4199d3(0xe8)][_0x4199d3(0x287)][_0x4199d3(0x1ca)](this,_0x19cd40);},Window_Base[_0x2d27b8(0x244)]['initMessageCore']=function(_0x11ab19){const _0x263e2d=_0x2d27b8;this[_0x263e2d(0xa5)](),this['resetWordWrap'](),this['registerResetRect'](_0x11ab19);},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0xa5)]=function(){const _0x1a675f=_0x2d27b8;this['setTextAlignment'](_0x1a675f(0x20f));},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x327)]=function(_0x17f79d){const _0x35dae5=_0x2d27b8;this[_0x35dae5(0x1d7)]=_0x17f79d;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x242)]=function(){const _0x256529=_0x2d27b8;return this[_0x256529(0x1d7)];},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x215)]=Window_Base['prototype']['textSizeEx'],Window_Base['prototype'][_0x2d27b8(0x277)]=function(_0x34f218){const _0x497675=_0x2d27b8;return this[_0x497675(0x20e)](),VisuMZ['MessageCore'][_0x497675(0x215)][_0x497675(0x1ca)](this,_0x34f218);},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x29d)]=function(_0x5cc425){const _0x190ea4=_0x2d27b8;return VisuMZ[_0x190ea4(0xe8)][_0x190ea4(0x215)][_0x190ea4(0x1ca)](this,_0x5cc425);},VisuMZ['MessageCore'][_0x2d27b8(0x310)]=Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x1bc)],Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x1bc)]=function(_0x28b742){const _0x29cb83=_0x2d27b8;VisuMZ[_0x29cb83(0xe8)][_0x29cb83(0x310)][_0x29cb83(0x1ca)](this,_0x28b742);if(_0x28b742['drawing'])this['setTextAlignment'](_0x29cb83(0x20f));},Window_Base[_0x2d27b8(0x244)]['resetWordWrap']=function(){this['setWordWrap'](![]);},Window_Base['prototype']['isWordWrapEnabled']=function(){return this['_wordWrap'];},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x29b)]=function(_0x38aaf2){const _0x4fe0ec=_0x2d27b8;return this[_0x4fe0ec(0x1bd)]=_0x38aaf2,'';},Window_Base[_0x2d27b8(0x244)]['registerResetRect']=function(_0x37268e){const _0xb45a61=_0x2d27b8;this[_0xb45a61(0x2dd)]=JsonEx[_0xb45a61(0x8c)](_0x37268e);},Window_Base['prototype'][_0x2d27b8(0x1f8)]=function(){const _0x49822f=_0x2d27b8;this['contents']['fontFace']=$gameSystem['mainFontFace'](),this[_0x49822f(0x172)][_0x49822f(0x22d)]=$gameSystem[_0x49822f(0x24c)](),this[_0x49822f(0x172)][_0x49822f(0xa8)]=![],this[_0x49822f(0x172)]['fontItalic']=![],this['resetTextColor']();},Window_Base[_0x2d27b8(0x244)]['resetTextColor']=function(){const _0x27b812=_0x2d27b8;this[_0x27b812(0xcd)](ColorManager[_0x27b812(0x184)]()),this['changeOutlineColor'](ColorManager['outlineColor']());const _0x16eecc=VisuMZ['MessageCore'][_0x27b812(0x1d3)][_0x27b812(0x192)];_0x16eecc[_0x27b812(0x229)]===undefined&&(_0x16eecc[_0x27b812(0x229)]=0x3),this[_0x27b812(0x172)][_0x27b812(0xa6)]=_0x16eecc[_0x27b812(0x229)],this['setColorLock'](![]);},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0xfc)]=function(_0x3e389e){const _0x56b3d9=_0x2d27b8;this[_0x56b3d9(0x13b)]=_0x3e389e;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x2b0)]=function(){const _0x19eea1=_0x2d27b8;return this[_0x19eea1(0x13b)];},Window_Base['prototype'][_0x2d27b8(0xfb)]=function(){return![];},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x324)]=function(){const _0x36fbb5=_0x2d27b8,_0x548e0c=['fontFace',_0x36fbb5(0x22d),_0x36fbb5(0xa8),_0x36fbb5(0x238),_0x36fbb5(0x2df),_0x36fbb5(0x32f),_0x36fbb5(0xa6),_0x36fbb5(0x135)];let _0x206ba0={};for(const _0x305c4b of _0x548e0c){_0x206ba0[_0x305c4b]=this['contents'][_0x305c4b];}return _0x206ba0;},Window_Base['prototype'][_0x2d27b8(0x302)]=function(_0x77035f){const _0x5891c3=_0x2d27b8;for(const _0x279d36 in _0x77035f){_0x5891c3(0x1a0)==='ApIsU'?this['textSpeed']=_0x515cf4(_0x3eeced[_0x5891c3(0xe4)])['clamp'](0x1,0xb):this[_0x5891c3(0x172)][_0x279d36]=_0x77035f[_0x279d36];}},VisuMZ['MessageCore'][_0x2d27b8(0x1ac)]=Window_Base[_0x2d27b8(0x244)]['update'],Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x8f)]=function(){const _0x3c06b7=_0x2d27b8;VisuMZ[_0x3c06b7(0xe8)][_0x3c06b7(0x1ac)][_0x3c06b7(0x1ca)](this),this[_0x3c06b7(0x171)]();},Window_Base[_0x2d27b8(0x244)]['canMove']=function(){return![];},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x171)]=function(){const _0x456f77=_0x2d27b8;this[_0x456f77(0x2c1)]>0x0&&(this[_0x456f77(0x80)]()&&(this['x']=this[_0x456f77(0x15f)](this['x'],this[_0x456f77(0xfd)]),this['y']=this[_0x456f77(0x15f)](this['y'],this[_0x456f77(0xb8)]),this[_0x456f77(0x2c7)]=this[_0x456f77(0x15f)](this[_0x456f77(0x2c7)],this[_0x456f77(0x177)]),this['height']=this[_0x456f77(0x15f)](this[_0x456f77(0x2dc)],this[_0x456f77(0x338)]),this[_0x456f77(0x24e)]()),this[_0x456f77(0x2c1)]--);},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x24e)]=function(_0xb85717,_0x490fd5){const _0x2bbe77=_0x2d27b8;!_0xb85717&&(this[_0x2bbe77(0x2c7)]=Math['min'](this[_0x2bbe77(0x2c7)],Graphics[_0x2bbe77(0x2c7)]),this[_0x2bbe77(0x2dc)]=Math[_0x2bbe77(0x312)](this[_0x2bbe77(0x2dc)],Graphics[_0x2bbe77(0x2dc)]));if(!_0x490fd5){if(_0x2bbe77(0x256)!==_0x2bbe77(0x155)){const _0x220ed3=-(Math[_0x2bbe77(0x205)](Graphics['width']-Graphics[_0x2bbe77(0x1f2)])/0x2),_0x15929b=_0x220ed3+Graphics['width']-this['width'],_0x1e4b48=-(Math[_0x2bbe77(0x205)](Graphics['height']-Graphics['boxHeight'])/0x2),_0x35c3e5=_0x1e4b48+Graphics[_0x2bbe77(0x2dc)]-this[_0x2bbe77(0x2dc)];this['x']=this['x'][_0x2bbe77(0x18f)](_0x220ed3,_0x15929b),this['y']=this['y'][_0x2bbe77(0x18f)](_0x1e4b48,_0x35c3e5);}else{if(!_0x12ba3a[_0x2bbe77(0x1aa)](_0x5af444))return!![];}}},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x15f)]=function(_0x5b101c,_0x56c091){const _0x35d2e7=_0x2d27b8,_0x54b757=this['_moveDuration'],_0xe42dcf=this['_wholeMoveDuration'],_0x31f6aa=this['calcMoveEasing']((_0xe42dcf-_0x54b757)/_0xe42dcf),_0x6877e2=this[_0x35d2e7(0x2d2)]((_0xe42dcf-_0x54b757+0x1)/_0xe42dcf),_0x2c2b0c=(_0x5b101c-_0x56c091*_0x31f6aa)/(0x1-_0x31f6aa);return _0x2c2b0c+(_0x56c091-_0x2c2b0c)*_0x6877e2;},Window_Base['prototype']['calcMoveEasing']=function(_0x29e5de){const _0x4a14ee=_0x2d27b8,_0x317205=0x2;switch(this['_moveEasingType']){case 0x0:return _0x29e5de;case 0x1:return this[_0x4a14ee(0x2e3)](_0x29e5de,_0x317205);case 0x2:return this[_0x4a14ee(0x1e7)](_0x29e5de,_0x317205);case 0x3:return this[_0x4a14ee(0xfe)](_0x29e5de,_0x317205);default:if(Imported[_0x4a14ee(0xe0)])return VisuMZ[_0x4a14ee(0x15f)](_0x29e5de,this['_moveEasingType']);else{if(_0x4a14ee(0x77)!==_0x4a14ee(0x77)){const _0x27ee39=_0x3c22a3['$1'][_0x4a14ee(0xc8)](',')[_0x4a14ee(0x154)](_0x284b71=>_0x3fb0d0(_0x284b71)||0x0);for(const _0xe11623 of _0x27ee39){if(_0x194d3e[_0x4a14ee(0x1aa)](_0xe11623))return![];}return!![];}else return _0x29e5de;}}},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x1ea)]=function(_0x9181c3,_0x2a379c,_0x1e2ea7,_0x196a81,_0x1dde1a,_0x3dd1e6){const _0x53ea57=_0x2d27b8;this[_0x53ea57(0xfd)]=_0x9181c3,this[_0x53ea57(0xb8)]=_0x2a379c,this[_0x53ea57(0x177)]=_0x1e2ea7||this[_0x53ea57(0x2c7)],this['_moveTargetHeight']=_0x196a81||this[_0x53ea57(0x2dc)],this[_0x53ea57(0x2c1)]=_0x1dde1a||0x1;if(this['_moveDuration']<=0x0)this['_moveDuration']=0x1;this['_wholeMoveDuration']=this['_moveDuration'],this[_0x53ea57(0xb9)]=_0x3dd1e6||0x0;if(_0x1dde1a<=0x0)this[_0x53ea57(0x171)]();},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x1cb)]=function(_0x23cab3,_0x25054b,_0x21d4e5,_0x57f9c0,_0x1a0275,_0x1ee799){const _0x10ee7e=_0x2d27b8;this['_moveTargetX']=this['x']+_0x23cab3,this[_0x10ee7e(0xb8)]=this['y']+_0x25054b,this[_0x10ee7e(0x177)]=this[_0x10ee7e(0x2c7)]+(_0x21d4e5||0x0),this[_0x10ee7e(0x338)]=this[_0x10ee7e(0x2dc)]+(_0x57f9c0||0x0),this[_0x10ee7e(0x2c1)]=_0x1a0275||0x1;if(this[_0x10ee7e(0x2c1)]<=0x0)this[_0x10ee7e(0x2c1)]=0x1;this[_0x10ee7e(0x233)]=this[_0x10ee7e(0x2c1)],this[_0x10ee7e(0xb9)]=_0x1ee799||0x0;if(_0x1a0275<=0x0)this['updateMove']();},Window_Base['prototype']['resetRect']=function(_0x5ce9c9,_0x2d2467){const _0x56a549=_0x2d27b8;this[_0x56a549(0x1ea)](this[_0x56a549(0x2dd)]['x'],this[_0x56a549(0x2dd)]['y'],this[_0x56a549(0x2dd)]['width'],this[_0x56a549(0x2dd)][_0x56a549(0x2dc)],_0x5ce9c9,_0x2d2467);},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x209)]=Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0xcd)],Window_Base['prototype'][_0x2d27b8(0xcd)]=function(_0x247a7a){const _0x323d38=_0x2d27b8;if(this[_0x323d38(0x2b0)]())return;_0x247a7a=_0x247a7a[_0x323d38(0x19d)](/\,/g,''),this[_0x323d38(0x11e)]=this[_0x323d38(0x11e)]||[],this[_0x323d38(0x11e)]['unshift'](this[_0x323d38(0x172)][_0x323d38(0x2df)]),VisuMZ[_0x323d38(0xe8)]['Window_Base_changeTextColor'][_0x323d38(0x1ca)](this,_0x247a7a);},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x2e4)]=function(_0x35df34){const _0x41d841=_0x2d27b8;this['obtainEscapeParam'](_0x35df34);if(this[_0x41d841(0x2b0)]())return;_0x35df34['drawing']&&(this[_0x41d841(0x11e)]=this['_textColorStack']||[],this[_0x41d841(0x172)][_0x41d841(0x2df)]=this[_0x41d841(0x11e)][_0x41d841(0x33f)]()||ColorManager[_0x41d841(0x184)]());},Window_Base[_0x2d27b8(0x244)]['convertEscapeCharacters']=function(_0xd9b826){const _0x497749=_0x2d27b8;return _0xd9b826=this[_0x497749(0x93)](_0xd9b826),_0xd9b826=this['convertBackslashCharacters'](_0xd9b826),_0xd9b826=this[_0x497749(0x193)](_0xd9b826),_0xd9b826=this[_0x497749(0x21a)](_0xd9b826),_0xd9b826=this[_0x497749(0x273)](_0xd9b826),_0xd9b826=this[_0x497749(0xdd)](_0xd9b826),_0xd9b826=this[_0x497749(0x153)](_0xd9b826),_0xd9b826=this['convertTextAlignmentEscapeCharacters'](_0xd9b826),_0xd9b826=this[_0x497749(0xa1)](_0xd9b826),_0xd9b826=this[_0x497749(0x253)](_0xd9b826),_0xd9b826=this[_0x497749(0x32b)](_0xd9b826),_0xd9b826=this[_0x497749(0x26f)](_0xd9b826),_0xd9b826=this[_0x497749(0x23b)](_0xd9b826),_0xd9b826=this[_0x497749(0x10e)](_0xd9b826),_0xd9b826=this[_0x497749(0x193)](_0xd9b826),_0xd9b826=this[_0x497749(0x213)](_0xd9b826),_0xd9b826=this['prepareWordWrapEscapeCharacters'](_0xd9b826),_0xd9b826;},Window_Base[_0x2d27b8(0x244)]['convertTextMacros']=function(_0x2c0335){const _0x4ca560=_0x2d27b8;this[_0x4ca560(0x28d)]=![];for(const _0x31211a of VisuMZ['MessageCore']['Settings']['TextMacros']){if(_0x2c0335['match'](_0x31211a[_0x4ca560(0x1c4)])){if(_0x4ca560(0x30a)!==_0x4ca560(0x30a)){if(this[_0x4ca560(0x11d)]===_0x30b139)this[_0x4ca560(0x95)]();const _0x57b9b3=this[_0x4ca560(0x144)](_0xc66cd);this[_0x4ca560(0x11d)][_0x57b9b3]=null,this['requestPictureTextRefresh'](_0x90df40,!![]);}else this['_textMacroFound']=!![],_0x2c0335=_0x2c0335[_0x4ca560(0x19d)](_0x31211a[_0x4ca560(0x1c4)],_0x31211a[_0x4ca560(0x325)][_0x4ca560(0x111)](this));}}return _0x2c0335;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x326)]=function(_0xb68be2){const _0x152985=_0x2d27b8;return _0xb68be2=_0xb68be2[_0x152985(0x19d)](/\\/g,'\x1b'),_0xb68be2=_0xb68be2[_0x152985(0x19d)](/\x1b\x1b/g,'\x5c'),_0xb68be2;},Window_Base['prototype'][_0x2d27b8(0x193)]=function(_0x356b63){const _0xd96632=_0x2d27b8;for(;;){if(_0x356b63[_0xd96632(0x1c7)](/\\V\[(\d+)\]/gi)){if('LSwqs'===_0xd96632(0xeb))_0x356b63=_0x356b63[_0xd96632(0x19d)](/\\V\[(\d+)\]/gi,(_0x103b9d,_0x598c09)=>this[_0xd96632(0x326)](String($gameVariables[_0xd96632(0x1aa)](parseInt(_0x598c09)))));else return 0x0;}else{if(_0x356b63[_0xd96632(0x1c7)](/\x1bV\[(\d+)\]/gi)){if(_0xd96632(0x2f2)==='ohFHG')_0x356b63=_0x356b63[_0xd96632(0x19d)](/\x1bV\[(\d+)\]/gi,(_0x50b026,_0x8ad9b2)=>this[_0xd96632(0x326)](String($gameVariables['value'](parseInt(_0x8ad9b2)))));else return this[_0xd96632(0x1d7)];}else break;}}return _0x356b63;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x21a)]=function(_0x1b2578){const _0x4e71f9=_0x2d27b8;return Imported[_0x4e71f9(0xe0)]&&(_0x1b2578=_0x1b2578[_0x4e71f9(0x19d)](/<Up (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('up')),_0x1b2578=_0x1b2578[_0x4e71f9(0x19d)](/<Left (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('left')),_0x1b2578=_0x1b2578[_0x4e71f9(0x19d)](/<Right (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x4e71f9(0x113))),_0x1b2578=_0x1b2578[_0x4e71f9(0x19d)](/<Down (?:KEY|BUTTON)>/gi,this[_0x4e71f9(0x25f)](_0x4e71f9(0xca))),_0x1b2578=_0x1b2578[_0x4e71f9(0x19d)](/<Ok (?:KEY|BUTTON)>/gi,this[_0x4e71f9(0x25f)]('ok')),_0x1b2578=_0x1b2578[_0x4e71f9(0x19d)](/<Cancel (?:KEY|BUTTON)>/gi,this[_0x4e71f9(0x25f)](_0x4e71f9(0x240))),_0x1b2578=_0x1b2578[_0x4e71f9(0x19d)](/<Menu (?:KEY|BUTTON)>/gi,this[_0x4e71f9(0x25f)]('menu')),_0x1b2578=_0x1b2578[_0x4e71f9(0x19d)](/<Shift (?:KEY|BUTTON)>/gi,this[_0x4e71f9(0x25f)](_0x4e71f9(0x33f))),_0x1b2578=_0x1b2578[_0x4e71f9(0x19d)](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this[_0x4e71f9(0x25f)]('pageup')),_0x1b2578=_0x1b2578[_0x4e71f9(0x19d)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x4e71f9(0xab)))),_0x1b2578;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x25f)]=function(_0x5dc36a){const _0x5f2dd8=_0x2d27b8;let _0x5ead79=TextManager[_0x5f2dd8(0x2b8)](_0x5dc36a)||'';return _0x5ead79=this[_0x5f2dd8(0x326)](_0x5ead79),_0x5ead79=this[_0x5f2dd8(0x193)](_0x5ead79),_0x5ead79[_0x5f2dd8(0x18b)]();},Window_Base['prototype']['preConvertEscapeCharacters']=function(_0x22ffad){const _0x45da38=_0x2d27b8;return this[_0x45da38(0x23e)](),_0x22ffad;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x10e)]=function(_0x261a68){return _0x261a68;},Window_Base['prototype']['convertShowChoiceEscapeCodes']=function(_0x4e6686){const _0x1e7060=_0x2d27b8;return _0x4e6686=_0x4e6686[_0x1e7060(0x19d)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x4e6686=_0x4e6686[_0x1e7060(0x19d)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x4e6686=_0x4e6686[_0x1e7060(0x19d)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x4e6686=_0x4e6686['replace'](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x4e6686=_0x4e6686['replace'](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x4e6686;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x153)]=function(_0x1239cf){const _0x1251c2=_0x2d27b8;return _0x1239cf=_0x1239cf[_0x1251c2(0x19d)](/<B>/gi,_0x1251c2(0x1d4)),_0x1239cf=_0x1239cf[_0x1251c2(0x19d)](/<\/B>/gi,_0x1251c2(0x334)),_0x1239cf=_0x1239cf['replace'](/<I>/gi,_0x1251c2(0x1f0)),_0x1239cf=_0x1239cf['replace'](/<\/I>/gi,_0x1251c2(0x264)),_0x1239cf;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x31d)]=function(_0xde4bc1){const _0x377f45=_0x2d27b8;return _0xde4bc1=_0xde4bc1[_0x377f45(0x19d)](/<LEFT>/gi,_0x377f45(0x137)),_0xde4bc1=_0xde4bc1['replace'](/<\/LEFT>/gi,_0x377f45(0x2b5)),_0xde4bc1=_0xde4bc1[_0x377f45(0x19d)](/<CENTER>/gi,_0x377f45(0xb7)),_0xde4bc1=_0xde4bc1[_0x377f45(0x19d)](/<\/CENTER>/gi,_0x377f45(0x2b5)),_0xde4bc1=_0xde4bc1['replace'](/<RIGHT>/gi,_0x377f45(0x98)),_0xde4bc1=_0xde4bc1[_0x377f45(0x19d)](/<\/RIGHT>/gi,_0x377f45(0x2b5)),_0xde4bc1;},Window_Base['prototype']['convertLockColorsEscapeCharacters']=function(_0x3c16e3){const _0xbcff9c=_0x2d27b8;return _0x3c16e3=_0x3c16e3['replace'](/<COLORLOCK>/gi,_0xbcff9c(0x12f)),_0x3c16e3=_0x3c16e3[_0xbcff9c(0x19d)](/<\/COLORLOCK>/gi,'\x1bCOLORLOCK[0]'),_0x3c16e3=_0x3c16e3['replace'](/\(\(\(/gi,_0xbcff9c(0x12f)),_0x3c16e3=_0x3c16e3[_0xbcff9c(0x19d)](/\)\)\)/gi,_0xbcff9c(0x2f6)),_0x3c16e3;},Window_Base['prototype'][_0x2d27b8(0x253)]=function(_0x51df72){const _0x44ec3c=_0x2d27b8;return _0x51df72=_0x51df72[_0x44ec3c(0x19d)](/\x1bN\[(\d+)\]/gi,(_0x408340,_0x223d37)=>this[_0x44ec3c(0x158)](parseInt(_0x223d37))),_0x51df72=_0x51df72['replace'](/\x1bP\[(\d+)\]/gi,(_0x5e980f,_0x45de1b)=>this['partyMemberName'](parseInt(_0x45de1b))),_0x51df72=_0x51df72[_0x44ec3c(0x19d)](/\x1bG/gi,TextManager['currencyUnit']),_0x51df72;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x32b)]=function(_0x3e0c6e){const _0x150d61=_0x2d27b8;return _0x3e0c6e=_0x3e0c6e[_0x150d61(0x19d)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x150d61(0x1e9)]()),_0x3e0c6e=_0x3e0c6e[_0x150d61(0x19d)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x150d61(0x2d7)]()),_0x3e0c6e=_0x3e0c6e[_0x150d61(0x19d)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x150d61(0x149)](!![])),_0x3e0c6e=_0x3e0c6e['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x150d61(0x149)](![])),_0x3e0c6e;},Window_Base['prototype']['battleTargetName']=function(){const _0x30e5e7=_0x2d27b8;if(!SceneManager[_0x30e5e7(0x272)]())return'';if(BattleManager[_0x30e5e7(0x265)])return BattleManager[_0x30e5e7(0x265)]['name']();if(BattleManager[_0x30e5e7(0x14f)][0x0])return BattleManager['_targets'][0x0][_0x30e5e7(0x222)]();return'';},Window_Base['prototype'][_0x2d27b8(0x2d7)]=function(){const _0x3f4b8a=_0x2d27b8;if(!SceneManager[_0x3f4b8a(0x272)]())return'';let _0x4c635e=null;_0x4c635e=BattleManager[_0x3f4b8a(0x29c)];if(!_0x4c635e&&BattleManager['isInputting']()){if(_0x3f4b8a(0x123)!==_0x3f4b8a(0x123)){_0x24a067=_0x21fd45[_0x3f4b8a(0x19d)](_0x1cc544[_0x3f4b8a(0x2f0)],''),_0x231492=_0x316dd7[_0x3f4b8a(0x19d)](_0x3aabbf[_0x3f4b8a(0x2e7)],''),this[_0x3f4b8a(0x254)]=!![],this[_0x3f4b8a(0xe2)]=!![],this[_0x3f4b8a(0x29b)](![]);const _0x26cc57=this[_0x3f4b8a(0x29d)](_0x33accb);if(_0x274e67){let _0x1a6542=_0x26cc57[_0x3f4b8a(0x2c7)]+_0x594428[_0x3f4b8a(0x201)]()*0x2+0x6;const _0x1d22b4=_0x4075dd[_0x3f4b8a(0x30b)]()!=='',_0x276a8f=_0x2d73c7[_0x3f4b8a(0xf5)],_0xbc821f=0x14;_0x1a6542+=_0x1d22b4?_0x276a8f+_0xbc821f:0x4;if(_0x1a6542%0x2!==0x0)_0x1a6542+=0x1;_0x411efb[_0x3f4b8a(0x13d)](_0x1a6542);}if(_0x1f8617){let _0x40006f=_0x4c4043[_0x3f4b8a(0x1c6)](_0x26cc57['height']/this[_0x3f4b8a(0xbc)]());_0x34ac79[_0x3f4b8a(0x2e1)](_0x40006f);}this[_0x3f4b8a(0xf6)](),this[_0x3f4b8a(0x146)](),this[_0x3f4b8a(0x254)]=![],this['_messagePositionReset']=!![];}else _0x4c635e=BattleManager['actor']();}return _0x4c635e?_0x4c635e[_0x3f4b8a(0x222)]():'';},Window_Base['prototype']['battleActionName']=function(_0x5d0b22){const _0x5bc7ac=_0x2d27b8;if(!SceneManager[_0x5bc7ac(0x272)]())return'';let _0xe2e38=BattleManager['_action']||null;!_0xe2e38&&BattleManager[_0x5bc7ac(0x1ab)]()&&(_0xe2e38=BattleManager[_0x5bc7ac(0x329)]());if(_0xe2e38&&_0xe2e38[_0x5bc7ac(0x102)]()){let _0x30b8ea='';if(_0x5d0b22)_0x30b8ea+=_0x5bc7ac(0x1a4)[_0x5bc7ac(0x165)](_0xe2e38[_0x5bc7ac(0x102)]()[_0x5bc7ac(0x280)]);return _0x30b8ea+=_0xe2e38[_0x5bc7ac(0x102)]()['name'],_0x30b8ea;}return'';},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x26f)]=function(_0x2f2106){const _0x3a2190=_0x2d27b8;for(const _0x3d9c46 of VisuMZ[_0x3a2190(0xe8)][_0x3a2190(0x1d3)][_0x3a2190(0x1e6)]){if('zuflr'!=='xgJKd')_0x2f2106[_0x3a2190(0x1c7)](_0x3d9c46[_0x3a2190(0x1c4)])&&(_0x2f2106=_0x2f2106[_0x3a2190(0x19d)](_0x3d9c46['textCodeCheck'],_0x3d9c46[_0x3a2190(0x325)]),_0x2f2106=this[_0x3a2190(0x193)](_0x2f2106));else{const _0x56c97c=_0x284769[_0x3a2190(0x2c7)]||this[_0x3a2190(0x109)],_0x5e63fd=this[_0x3a2190(0x150)]!==_0x39ec70?this['itemHeight']():this[_0x3a2190(0x32a)],_0x134256=_0x56c97c/_0x1ec31a[_0x3a2190(0x2c7)],_0xbf1ab=_0x5e63fd/_0x2dbafd[_0x3a2190(0x2dc)],_0x5dca26=_0x32929b[_0x3a2190(0x312)](_0x134256,_0xbf1ab,0x1),_0x57dc37=this['_index']!==_0xffdf51?(this[_0x3a2190(0x2be)](0x0)[_0x3a2190(0x2dc)]-this[_0x3a2190(0xbc)]())/0x2:0x0,_0x7a3874=_0x43c98b['width']*_0x5dca26,_0x5e3b1c=_0x2a9f20[_0x3a2190(0x2dc)]*_0x5dca26,_0x4f1228=_0x2c784e[_0x3a2190(0x205)]((_0x56c97c-_0x7a3874)/0x2)+_0x471a86['startX'],_0xc00f64=_0x4bb52f['floor']((_0x5e63fd-_0x5e3b1c)/0x2)+_0xa04768[_0x3a2190(0x2de)]-_0x57dc37*0x2;this['contentsBack'][_0x3a2190(0x135)]=_0xb39b69,this[_0x3a2190(0x279)][_0x3a2190(0x211)](_0x5ad010,0x0,0x0,_0x210bf7['width'],_0x14494e['height'],_0x4f1228,_0xc00f64,_0x7a3874,_0x5e3b1c),this[_0x3a2190(0x279)][_0x3a2190(0x135)]=0xff;}}return _0x2f2106;},Window_Base[_0x2d27b8(0x244)]['convertMessageCoreEscapeReplacements']=function(_0x3377f0){const _0x30f8b3=_0x2d27b8;for(const _0x542d56 of VisuMZ[_0x30f8b3(0xe8)]['Settings'][_0x30f8b3(0x164)]){_0x3377f0[_0x30f8b3(0x1c7)](_0x542d56[_0x30f8b3(0x1c4)])&&(_0x3377f0=_0x3377f0[_0x30f8b3(0x19d)](_0x542d56[_0x30f8b3(0x1c4)],_0x542d56[_0x30f8b3(0x325)][_0x30f8b3(0x111)](this)),_0x3377f0=this[_0x30f8b3(0x193)](_0x3377f0));}return _0x3377f0;},Window_Base[_0x2d27b8(0x244)]['actorName']=function(_0x4e37c5){const _0x11b730=_0x2d27b8,_0x4b26cb=_0x4e37c5>=0x1?$gameActors[_0x11b730(0x8b)](_0x4e37c5):null,_0x2662db=_0x4b26cb?_0x4b26cb[_0x11b730(0x222)]():'',_0x48f61c=Number(VisuMZ[_0x11b730(0xe8)][_0x11b730(0x1d3)]['AutoColor'][_0x11b730(0x180)]);return this[_0x11b730(0xfb)]()&&_0x48f61c!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x11b730(0x165)](_0x48f61c,_0x2662db):_0x2662db;},Window_Base[_0x2d27b8(0x244)]['partyMemberName']=function(_0x3610c1){const _0x34f285=_0x2d27b8,_0xe8747b=_0x3610c1>=0x1?$gameParty['members']()[_0x3610c1-0x1]:null,_0x50ac1a=_0xe8747b?_0xe8747b[_0x34f285(0x222)]():'',_0x3bfab8=Number(VisuMZ[_0x34f285(0xe8)][_0x34f285(0x1d3)][_0x34f285(0x18c)][_0x34f285(0x180)]);return this[_0x34f285(0xfb)]()&&_0x3bfab8!==0x0?_0x34f285(0x1b6)['format'](_0x3bfab8,_0x50ac1a):_0x50ac1a;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x213)]=function(_0x28fe48){const _0x1847e4=_0x2d27b8;return this[_0x1847e4(0xfb)]()&&(_0x28fe48=this[_0x1847e4(0x25a)](_0x28fe48),_0x28fe48=this['processActorNameAutoColorChanges'](_0x28fe48)),_0x28fe48;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x25a)]=function(_0x334fd1){const _0x5c2709=_0x2d27b8;for(autoColor of VisuMZ[_0x5c2709(0xe8)][_0x5c2709(0x291)]){_0x334fd1=_0x334fd1[_0x5c2709(0x19d)](autoColor[0x0],autoColor[0x1]);}return _0x334fd1;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x22f)]=function(){const _0x568758=_0x2d27b8;this[_0x568758(0x206)]=[];},Window_Base['prototype']['registerActorNameAutoColorChanges']=function(){const _0x10152a=_0x2d27b8;this['clearActorNameAutoColor']();const _0x321ab2=VisuMZ[_0x10152a(0xe8)][_0x10152a(0x1d3)]['AutoColor'],_0x1d96bb=_0x321ab2[_0x10152a(0x180)];if(_0x1d96bb<=0x0)return;for(const _0x3eef19 of $gameActors[_0x10152a(0x118)]){if(!_0x3eef19)continue;const _0x44eea9=_0x3eef19[_0x10152a(0x222)]();if(_0x44eea9[_0x10152a(0x18b)]()[_0x10152a(0x315)]<=0x0)continue;if(/^\d+$/[_0x10152a(0x129)](_0x44eea9))continue;if(_0x44eea9[_0x10152a(0x1c7)](/-----/i))continue;let _0x31a366=VisuMZ[_0x10152a(0xe8)][_0x10152a(0x92)](_0x44eea9);const _0x5e892f=new RegExp('\x5cb'+_0x31a366+'\x5cb','g'),_0x345958='\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x1d96bb,_0x44eea9);this[_0x10152a(0x206)][_0x10152a(0x249)]([_0x5e892f,_0x345958]);}},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x2f9)]=function(_0x3d3eaa){const _0x11dc77=_0x2d27b8;this[_0x11dc77(0x206)]===undefined&&(_0x11dc77(0x1af)===_0x11dc77(0x2a9)?_0x375da1[_0x11dc77(0x105)]=_0x4151f9[_0x11dc77(0x105)][_0x11dc77(0xc0)](0x0,_0x53a187[_0x11dc77(0x196)])+'\x0a'+_0x2797c2[_0x11dc77(0x105)][_0x11dc77(0x126)](_0x2a07a4[_0x11dc77(0x196)]):this['registerActorNameAutoColorChanges']());for(autoColor of this[_0x11dc77(0x206)]){_0x11dc77(0x2fa)!==_0x11dc77(0x2fa)?(this[_0x11dc77(0x82)](),this[_0x11dc77(0x1a7)](),this[_0x11dc77(0x1fc)](),this['activate']()):_0x3d3eaa=_0x3d3eaa[_0x11dc77(0x19d)](autoColor[0x0],autoColor[0x1]);}return _0x3d3eaa;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0xde)]=function(_0x1703cb,_0x113633,_0x44f5fc){const _0x223e8b=_0x2d27b8;if(!_0x1703cb)return'';const _0x56e254=_0x1703cb[_0x113633];let _0x168ebe='';if(_0x56e254&&_0x44f5fc&&_0x56e254['iconIndex']){if(_0x223e8b(0x200)!==_0x223e8b(0xaf)){const _0x436474=_0x223e8b(0x69);_0x168ebe=_0x436474[_0x223e8b(0x165)](_0x56e254[_0x223e8b(0x280)],_0x56e254['name']);}else _0x2aa7a4='</WORDWRAP>'+_0x1422f1;}else _0x56e254?_0x168ebe=_0x56e254[_0x223e8b(0x222)]:_0x223e8b(0x161)!=='ROLaX'?(this[_0x223e8b(0x2d6)](_0x240417),this[_0x223e8b(0x1cc)](_0x12bebd),this[_0x223e8b(0x75)]()):_0x168ebe='';if(this[_0x223e8b(0xfb)]()){if(_0x223e8b(0x122)!=='GJkdl')_0x168ebe=this[_0x223e8b(0x1ed)](_0x168ebe,_0x1703cb);else return this['_colorLock'];}return _0x168ebe;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x7d)]=function(_0x4573a1){const _0x5efb57=_0x2d27b8,_0x4d40ff=$gameParty[_0x5efb57(0x143)]();if(_0x4d40ff['id']<0x0)return'';let _0x34604a=null;if(_0x4d40ff[_0x5efb57(0x2d3)]===0x0)_0x34604a=$dataItems[_0x4d40ff['id']];if(_0x4d40ff['type']===0x1)_0x34604a=$dataWeapons[_0x4d40ff['id']];if(_0x4d40ff['type']===0x2)_0x34604a=$dataArmors[_0x4d40ff['id']];if(!_0x34604a)return'';return _0x4573a1?_0x5efb57(0x69)[_0x5efb57(0x165)](_0x34604a['iconIndex'],_0x34604a['name']):_0x34604a['name'];},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x251)]=function(){const _0x491db6=_0x2d27b8,_0x4c3b7b=$gameParty[_0x491db6(0x143)]();if(_0x4c3b7b['id']<=0x0)return'';return _0x4c3b7b['quantity'];},Window_Base[_0x2d27b8(0x244)]['applyDatabaseAutoColor']=function(_0x18eb82,_0x1bc014){const _0x4cd303=_0x2d27b8,_0x4fce3b=VisuMZ[_0x4cd303(0xe8)]['Settings'][_0x4cd303(0x18c)];let _0x3917b1=0x0;if(_0x1bc014===$dataActors)_0x3917b1=_0x4fce3b[_0x4cd303(0x180)];if(_0x1bc014===$dataClasses)_0x3917b1=_0x4fce3b['Classes'];if(_0x1bc014===$dataSkills)_0x3917b1=_0x4fce3b['Skills'];if(_0x1bc014===$dataItems)_0x3917b1=_0x4fce3b[_0x4cd303(0x33d)];if(_0x1bc014===$dataWeapons)_0x3917b1=_0x4fce3b['Weapons'];if(_0x1bc014===$dataArmors)_0x3917b1=_0x4fce3b[_0x4cd303(0x1f3)];if(_0x1bc014===$dataEnemies)_0x3917b1=_0x4fce3b['Enemies'];if(_0x1bc014===$dataStates)_0x3917b1=_0x4fce3b[_0x4cd303(0x247)];return _0x3917b1>0x0&&(_0x18eb82=_0x4cd303(0x1b6)[_0x4cd303(0x165)](_0x3917b1,_0x18eb82)),_0x18eb82;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0xc5)]=function(_0x31ee9f){const _0x4a7fbc=_0x2d27b8;_0x31ee9f=_0x31ee9f[_0x4a7fbc(0x19d)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x1c7550,_0xd73060)=>this['setWordWrap'](!![])),_0x31ee9f=_0x31ee9f['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x34cb70,_0x2dea9c)=>this[_0x4a7fbc(0x29b)](![])),_0x31ee9f=_0x31ee9f[_0x4a7fbc(0x19d)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x389860,_0x5e3733)=>this[_0x4a7fbc(0x29b)](![]));if(_0x31ee9f['match'](Window_Message[_0x4a7fbc(0x2f0)]))this['setWordWrap'](![]);else _0x31ee9f[_0x4a7fbc(0x1c7)](Window_Message[_0x4a7fbc(0x2e7)])&&this[_0x4a7fbc(0x29b)](![]);if(!this['isWordWrapEnabled']())return _0x31ee9f;if(_0x31ee9f['length']<=0x0)return _0x31ee9f;return VisuMZ['MessageCore'][_0x4a7fbc(0x1d3)][_0x4a7fbc(0xc9)]['LineBreakSpace']?_0x4a7fbc(0x245)!=='zQxWb'?_0xfdfc8a=_0x5c997d['inputtingAction']():(_0x31ee9f=_0x31ee9f[_0x4a7fbc(0x19d)](/[\n\r]+/g,'\x20'),_0x31ee9f=_0x31ee9f[_0x4a7fbc(0x19d)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):_0x4a7fbc(0x30c)!=='ZpJaW'?(_0x31ee9f=_0x31ee9f[_0x4a7fbc(0x19d)](/[\n\r]+/g,''),_0x31ee9f=_0x31ee9f[_0x4a7fbc(0x19d)](/<(?:BR|LINEBREAK)>/gi,'\x0a')):_0x54d465[_0x4a7fbc(0xe8)][_0x4a7fbc(0x224)]['call'](this,_0x489f5a,_0x6922e2),_0x31ee9f=this['addWrapBreakAfterPunctuation'](_0x31ee9f),_0x31ee9f=_0x31ee9f[_0x4a7fbc(0xc8)]('\x20')[_0x4a7fbc(0xae)](_0x4a7fbc(0x1d6)),_0x31ee9f=_0x31ee9f[_0x4a7fbc(0x19d)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x31ee9f=_0x31ee9f[_0x4a7fbc(0x19d)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x31ee9f;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0xb0)]=function(_0x3173c3){return _0x3173c3;},VisuMZ['MessageCore'][_0x2d27b8(0x1b9)]=Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x132)],Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x132)]=function(_0x5cd331){const _0x307d72=_0x2d27b8;VisuMZ[_0x307d72(0xe8)][_0x307d72(0x1b9)][_0x307d72(0x1ca)](this,_0x5cd331),this[_0x307d72(0x194)](_0x5cd331);},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0xc1)]=Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x9e)],Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x9e)]=function(_0x2e4875,_0x1e29e5){const _0x4b4bba=_0x2d27b8;VisuMZ[_0x4b4bba(0xe8)]['Window_Base_processControlCharacter'][_0x4b4bba(0x1ca)](this,_0x2e4875,_0x1e29e5),_0x1e29e5==='\x1bWrapBreak[0]'&&this[_0x4b4bba(0x2c3)](_0x2e4875);},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x120)]=function(_0x17fe8f){const _0x313ffc=_0x2d27b8;var _0x4e0ab2=/^\<(.*?)\>/[_0x313ffc(0x88)](_0x17fe8f[_0x313ffc(0x105)][_0x313ffc(0xc0)](_0x17fe8f[_0x313ffc(0x196)]));return _0x4e0ab2?(_0x17fe8f[_0x313ffc(0x196)]+=_0x4e0ab2[0x0][_0x313ffc(0x315)],String(_0x4e0ab2[0x0][_0x313ffc(0xc0)](0x1,_0x4e0ab2[0x0][_0x313ffc(0x315)]-0x1))):'';},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x18a)]=Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x15a)],Window_Base[_0x2d27b8(0x244)]['processEscapeCharacter']=function(_0x3733cb,_0x5864b2){const _0x3a2bb8=_0x2d27b8;switch(_0x3733cb){case'C':if(_0x5864b2[_0x3a2bb8(0x147)]){if(_0x3a2bb8(0x86)===_0x3a2bb8(0x12b)){if(this[_0x3a2bb8(0x225)]===_0x3323dc)this['initMessageCore']();if(this[_0x3a2bb8(0x225)][_0x3a2bb8(0x29a)]===_0x3d401c)this[_0x3a2bb8(0x16c)]();this[_0x3a2bb8(0x225)][_0x3a2bb8(0x29a)]=_0x3ddb21||0x1;}else VisuMZ[_0x3a2bb8(0xe8)][_0x3a2bb8(0x18a)][_0x3a2bb8(0x1ca)](this,_0x3733cb,_0x5864b2);}else{if('xrOye'!==_0x3a2bb8(0x11b)){let _0x3b206a=_0x1bac67[_0x3a2bb8(0x2c7)]+_0x5c2a8d['windowPadding']()*0x2+0x6;const _0x212800=_0x35af2d['faceName']()!=='',_0x28bd13=_0x801a9d[_0x3a2bb8(0xf5)],_0x6763be=0x14;_0x3b206a+=_0x212800?_0x28bd13+_0x6763be:0x4;if(_0x3b206a%0x2!==0x0)_0x3b206a+=0x1;_0xece64c[_0x3a2bb8(0x13d)](_0x3b206a);}else this[_0x3a2bb8(0x2cf)](_0x5864b2);}break;case'I':case'{':case'}':VisuMZ[_0x3a2bb8(0xe8)][_0x3a2bb8(0x18a)][_0x3a2bb8(0x1ca)](this,_0x3733cb,_0x5864b2);break;case'FS':this[_0x3a2bb8(0x2b2)](_0x5864b2);break;case'PX':this['processPxTextCode'](_0x5864b2);break;case'PY':this[_0x3a2bb8(0x19c)](_0x5864b2);break;case'BOLD':this[_0x3a2bb8(0x1f7)](this[_0x3a2bb8(0x2cf)](_0x5864b2));break;case'CENTERPICTURE':this[_0x3a2bb8(0xc6)](_0x5864b2);break;case'COLORLOCK':this['processColorLock'](_0x5864b2);break;case _0x3a2bb8(0x1b5):this[_0x3a2bb8(0x163)](_0x5864b2);break;case _0x3a2bb8(0x313):this[_0x3a2bb8(0x7b)](this[_0x3a2bb8(0x2cf)](_0x5864b2));break;case _0x3a2bb8(0x2c4):this['processDrawPicture'](_0x5864b2);break;case _0x3a2bb8(0x1b7):this[_0x3a2bb8(0x2e4)](_0x5864b2);break;case _0x3a2bb8(0x6a):this[_0x3a2bb8(0xf3)](_0x5864b2);break;case _0x3a2bb8(0x234):this[_0x3a2bb8(0x283)](_0x5864b2);break;case'WRAPBREAK':this[_0x3a2bb8(0x2c3)](_0x5864b2);break;default:this[_0x3a2bb8(0x32d)](_0x3733cb,_0x5864b2);}},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x32d)]=function(_0x15d665,_0x4f7b54){const _0x27f51c=_0x2d27b8;for(const _0x3084be of VisuMZ[_0x27f51c(0xe8)]['Settings'][_0x27f51c(0x1e6)]){if(_0x3084be['Match']===_0x15d665){if(_0x3084be[_0x27f51c(0xff)]==='')this['obtainEscapeParam'](_0x4f7b54);_0x3084be['ActionJS'][_0x27f51c(0x1ca)](this,_0x4f7b54);if(this[_0x27f51c(0x289)]===Window_Message){if(_0x27f51c(0x335)!=='CMjBX')_0x3e5d1b['x']=-_0x190f94[_0x27f51c(0x2c7)]-_0x502f0e;else{const _0xcfd1d4=_0x3084be[_0x27f51c(0x32e)]||0x0;if(_0xcfd1d4>0x0)this[_0x27f51c(0x27f)](_0xcfd1d4);}}}}},Window_Base['prototype']['makeFontBigger']=function(){const _0x37aa6f=_0x2d27b8;this[_0x37aa6f(0x172)][_0x37aa6f(0x22d)]+=VisuMZ[_0x37aa6f(0xe8)][_0x37aa6f(0x1d3)][_0x37aa6f(0x192)][_0x37aa6f(0x1bf)],this[_0x37aa6f(0x172)]['fontSize']=Math[_0x37aa6f(0x312)](this[_0x37aa6f(0x172)]['fontSize'],VisuMZ[_0x37aa6f(0xe8)]['Settings'][_0x37aa6f(0x192)][_0x37aa6f(0x9f)]);},Window_Base['prototype'][_0x2d27b8(0x2d4)]=function(){const _0x57c189=_0x2d27b8;this[_0x57c189(0x172)]['fontSize']-=VisuMZ['MessageCore']['Settings'][_0x57c189(0x192)]['FontChangeValue'],this[_0x57c189(0x172)][_0x57c189(0x22d)]=Math[_0x57c189(0x9b)](this[_0x57c189(0x172)]['fontSize'],VisuMZ[_0x57c189(0xe8)][_0x57c189(0x1d3)][_0x57c189(0x192)][_0x57c189(0x301)]);},Window_Base[_0x2d27b8(0x244)]['processFsTextCode']=function(_0x21180b){const _0x18e946=_0x2d27b8,_0x262421=this['obtainEscapeParam'](_0x21180b);this[_0x18e946(0x172)][_0x18e946(0x22d)]=_0x262421['clamp'](VisuMZ[_0x18e946(0xe8)]['Settings']['General'][_0x18e946(0x301)],VisuMZ[_0x18e946(0xe8)][_0x18e946(0x1d3)]['General'][_0x18e946(0x9f)]);},Window_Base['prototype'][_0x2d27b8(0x1b2)]=function(_0x1f1ed2){const _0x7ec5d2=_0x2d27b8;let _0x210be6=this['contents'][_0x7ec5d2(0x22d)];const _0x517df8=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x355e7e=_0x517df8[_0x7ec5d2(0x88)](_0x1f1ed2);if(!_0x355e7e)break;const _0x59cb96=String(_0x355e7e[0x1])[_0x7ec5d2(0xd4)]();if(_0x59cb96==='{'){if(_0x7ec5d2(0x1f6)===_0x7ec5d2(0x1f6))this[_0x7ec5d2(0x1cd)]();else{if(this[_0x7ec5d2(0x225)]===_0x1b4b20)this[_0x7ec5d2(0x16c)]();if(this[_0x7ec5d2(0x225)]['messageWordWrap']===_0x1390ed)this['initMessageCore']();return this[_0x7ec5d2(0x225)][_0x7ec5d2(0x9d)];}}else{if(_0x59cb96==='}')this[_0x7ec5d2(0x2d4)]();else _0x59cb96==='FS'&&(_0x7ec5d2(0x96)!==_0x7ec5d2(0x321)?this[_0x7ec5d2(0x172)][_0x7ec5d2(0x22d)]=parseInt(_0x355e7e[0x3])[_0x7ec5d2(0x18f)](VisuMZ[_0x7ec5d2(0xe8)][_0x7ec5d2(0x1d3)][_0x7ec5d2(0x192)][_0x7ec5d2(0x301)],VisuMZ[_0x7ec5d2(0xe8)][_0x7ec5d2(0x1d3)][_0x7ec5d2(0x192)][_0x7ec5d2(0x9f)]):this['y']=_0x11bdba['y']+_0x44675c[_0x7ec5d2(0x2dc)]);}this[_0x7ec5d2(0x172)]['fontSize']>_0x210be6&&(_0x210be6=this[_0x7ec5d2(0x172)][_0x7ec5d2(0x22d)]);}return _0x210be6;},Window_Base['prototype'][_0x2d27b8(0x331)]=function(_0x32d58c){const _0x19602b=_0x2d27b8;_0x32d58c['x']=this[_0x19602b(0x2cf)](_0x32d58c),VisuMZ[_0x19602b(0xe8)]['Settings'][_0x19602b(0x192)][_0x19602b(0x2a8)]&&(_0x32d58c['x']+=_0x32d58c[_0x19602b(0x31f)]);},Window_Base[_0x2d27b8(0x244)]['processPyTextCode']=function(_0x5c480e){const _0x23544d=_0x2d27b8;_0x5c480e['y']=this[_0x23544d(0x2cf)](_0x5c480e),VisuMZ[_0x23544d(0xe8)][_0x23544d(0x1d3)][_0x23544d(0x192)][_0x23544d(0x2a8)]&&(_0x5c480e['y']+=_0x5c480e[_0x23544d(0x2de)]);},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x1f7)]=function(_0x53e80e){const _0x1aa10f=_0x2d27b8;this['contents'][_0x1aa10f(0xa8)]=!!_0x53e80e;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x7b)]=function(_0x5927ef){const _0x3f67b2=_0x2d27b8;this['contents'][_0x3f67b2(0x238)]=!!_0x5927ef;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0xf3)]=function(_0x422e65){const _0x12a269=_0x2d27b8,_0x3ea27d=this['obtainEscapeParam'](_0x422e65);if(!_0x422e65[_0x12a269(0x147)])return;switch(_0x3ea27d){case 0x0:this['setTextAlignment']('default');return;case 0x1:this[_0x12a269(0x327)]('left');break;case 0x2:this[_0x12a269(0x327)](_0x12a269(0x268));break;case 0x3:this[_0x12a269(0x327)](_0x12a269(0x113));break;}this['processTextAlignmentX'](_0x422e65);},Window_Base['prototype']['processTextAlignmentX']=function(_0x5ae680){const _0x9453fc=_0x2d27b8;if(!_0x5ae680['drawing'])return;if(_0x5ae680[_0x9453fc(0x30e)])return;if(this['getTextAlignment']()===_0x9453fc(0x20f))return;let _0x4822c7=_0x5ae680[_0x9453fc(0x105)][_0x9453fc(0x269)]('\x1bTEXTALIGNMENT',_0x5ae680[_0x9453fc(0x196)]+0x1),_0x25d003=_0x5ae680[_0x9453fc(0x105)][_0x9453fc(0x269)]('\x0a',_0x5ae680['index']+0x1);if(_0x4822c7<0x0)_0x4822c7=_0x5ae680[_0x9453fc(0x105)][_0x9453fc(0x315)]+0x1;if(_0x25d003>0x0)_0x4822c7=Math[_0x9453fc(0x312)](_0x4822c7,_0x25d003);const _0x11b144=_0x5ae680['text'][_0x9453fc(0x2a2)](_0x5ae680[_0x9453fc(0x196)],_0x4822c7),_0x3489f7=this[_0x9453fc(0x2a4)](_0x11b144)[_0x9453fc(0x2c7)],_0x342db7=_0x5ae680[_0x9453fc(0x2c7)]||this[_0x9453fc(0x109)]-0x8,_0x30f322=this[_0x9453fc(0x289)]===Window_Message&&$gameMessage[_0x9453fc(0x30b)]()!=='';switch(this[_0x9453fc(0x242)]()){case _0x9453fc(0x1e4):_0x5ae680['x']=_0x5ae680[_0x9453fc(0x31f)];break;case'center':_0x5ae680['x']=_0x5ae680['startX'],_0x5ae680['x']+=Math[_0x9453fc(0x205)]((_0x342db7-_0x3489f7)/0x2);_0x30f322&&(_0x5ae680['x']-=_0x5ae680[_0x9453fc(0x31f)]/0x2);break;case _0x9453fc(0x113):_0x5ae680['x']=_0x342db7-_0x3489f7+_0x5ae680[_0x9453fc(0x31f)];_0x30f322&&(_0x9453fc(0x21e)!==_0x9453fc(0x235)?_0x5ae680['x']-=_0x5ae680[_0x9453fc(0x31f)]:(this['currentCommand']()['parameters'][0x0]=_0x8d6c9c,_0x163c3f++));break;}},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x2a4)]=function(_0x216152){const _0x3c2e8e=_0x2d27b8;_0x216152=_0x216152[_0x3c2e8e(0x19d)](/\x1b!/g,''),_0x216152=_0x216152[_0x3c2e8e(0x19d)](/\x1b\|/g,''),_0x216152=_0x216152[_0x3c2e8e(0x19d)](/\x1b\./g,'');const _0x43f3e3=this[_0x3c2e8e(0xb6)](_0x216152,0x0,0x0,0x0),_0x1a7cfb=this[_0x3c2e8e(0x324)]();return _0x43f3e3[_0x3c2e8e(0x147)]=![],this['processAllText'](_0x43f3e3),this['returnPreservedFontSettings'](_0x1a7cfb),{'width':_0x43f3e3['outputWidth'],'height':_0x43f3e3[_0x3c2e8e(0x31a)]};},Window_Base[_0x2d27b8(0x2c6)]=VisuMZ['MessageCore'][_0x2d27b8(0x1d3)][_0x2d27b8(0xc9)][_0x2d27b8(0x128)]||0x0,Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x2c3)]=function(_0x54b1f1){const _0x24148a=_0x2d27b8,_0x4d2212=(_0x54b1f1[_0x24148a(0x30e)]?-0x1:0x1)*this['textWidth']('\x20');_0x54b1f1['x']+=_0x4d2212;if(this['obtainEscapeParam'](_0x54b1f1)>0x0)_0x54b1f1['x']+=_0x4d2212;if(_0x54b1f1[_0x24148a(0x30e)])return;let _0x49b742=_0x54b1f1['text']['indexOf'](_0x24148a(0x1d6),_0x54b1f1[_0x24148a(0x196)]+0x1),_0x5c4963=_0x54b1f1[_0x24148a(0x105)][_0x24148a(0x269)]('\x0a',_0x54b1f1[_0x24148a(0x196)]+0x1);if(_0x49b742<0x0)_0x49b742=_0x54b1f1[_0x24148a(0x105)][_0x24148a(0x315)]+0x1;if(_0x5c4963>0x0)_0x49b742=Math[_0x24148a(0x312)](_0x49b742,_0x5c4963);const _0x175293=_0x54b1f1[_0x24148a(0x105)][_0x24148a(0x2a2)](_0x54b1f1[_0x24148a(0x196)],_0x49b742),_0x505317=this[_0x24148a(0x100)](_0x175293)[_0x24148a(0x2c7)];let _0x1aaa33=_0x54b1f1[_0x24148a(0x2c7)]||this['innerWidth'];_0x1aaa33-=Window_Base[_0x24148a(0x2c6)];if(this['constructor']===Window_Message){if(_0x24148a(0x236)===_0x24148a(0x236)){const _0x304652=$gameMessage[_0x24148a(0x30b)]()===''?0x0:ImageManager['faceWidth']+0x14;_0x1aaa33-=_0x304652,VisuMZ[_0x24148a(0xe8)][_0x24148a(0x1d3)]['WordWrap'][_0x24148a(0x12a)]&&(_0x1aaa33-=_0x304652);}else{const _0x572709=_0x57443f>=0x1?_0x42e3d2[_0x24148a(0x8b)](_0x49167e):null,_0xce6318=_0x572709?_0x572709[_0x24148a(0x222)]():'',_0x5364ec=_0x488996(_0x3ed02d[_0x24148a(0xe8)][_0x24148a(0x1d3)][_0x24148a(0x18c)]['Actors']);return this['isAutoColorAffected']()&&_0x5364ec!==0x0?_0x24148a(0x1b6)['format'](_0x5364ec,_0xce6318):_0xce6318;}}let _0x1bd41f=![];if(_0x54b1f1['x']+_0x505317>_0x54b1f1[_0x24148a(0x31f)]+_0x1aaa33)_0x1bd41f=!![];if(_0x505317===0x0)_0x1bd41f=!![];_0x1bd41f&&(_0x24148a(0x226)!==_0x24148a(0x226)?(this['adjustShowChoiceDefault'](_0x4736cd,_0xbdf562,_0x2d193d),this[_0x24148a(0xf1)](_0x4daf61,_0x205a5a,_0x4b64d3),this[_0x24148a(0x28e)](_0x552004,_0x262bf1)):_0x54b1f1['text']=_0x54b1f1[_0x24148a(0x105)][_0x24148a(0xc0)](0x0,_0x54b1f1['index'])+'\x0a'+_0x54b1f1['text'][_0x24148a(0x126)](_0x54b1f1[_0x24148a(0x196)]));},Window_Base[_0x2d27b8(0x244)]['textSizeExWordWrap']=function(_0x36dc3d){const _0x50ee7c=_0x2d27b8,_0x4818c7=this[_0x50ee7c(0xb6)](_0x36dc3d,0x0,0x0,0x0),_0x1cdb80=this['getPreservedFontSettings']();return _0x4818c7['drawing']=![],this[_0x50ee7c(0x29b)](![]),this[_0x50ee7c(0x1bc)](_0x4818c7),this[_0x50ee7c(0x29b)](!![]),this[_0x50ee7c(0x302)](_0x1cdb80),{'width':_0x4818c7[_0x50ee7c(0x317)],'height':_0x4818c7['outputHeight']};},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x163)]=function(_0x4c6780){const _0x2b0d80=_0x2d27b8;return this[_0x2b0d80(0x2cf)](_0x4c6780);},Window_Base['prototype'][_0x2d27b8(0x152)]=function(_0x1c81da){const _0x4e811b=_0x2d27b8,_0x5e566f=this['obtainEscapeString'](_0x1c81da)[_0x4e811b(0xc8)](',');if(!_0x1c81da[_0x4e811b(0x147)])return;const _0x3bebe1=_0x5e566f[0x0][_0x4e811b(0x18b)](),_0x1bd1ae=_0x5e566f[0x1]||0x0,_0x17e166=_0x5e566f[0x2]||0x0,_0x1c48fb=ImageManager[_0x4e811b(0x26b)](_0x3bebe1),_0x28f7ca=this[_0x4e811b(0x172)][_0x4e811b(0x135)];_0x1c48fb[_0x4e811b(0x87)](this['drawBackPicture'][_0x4e811b(0x111)](this,_0x1c48fb,_0x1c81da['x'],_0x1c81da['y'],_0x1bd1ae,_0x17e166,_0x28f7ca));},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x20c)]=function(_0x58af31,_0x40417c,_0x390376,_0x4e3a93,_0x59347d,_0x4949db){const _0x3f85bc=_0x2d27b8;_0x4e3a93=_0x4e3a93||_0x58af31[_0x3f85bc(0x2c7)],_0x59347d=_0x59347d||_0x58af31[_0x3f85bc(0x2dc)],this[_0x3f85bc(0x279)][_0x3f85bc(0x135)]=_0x4949db,this['contentsBack'][_0x3f85bc(0x211)](_0x58af31,0x0,0x0,_0x58af31[_0x3f85bc(0x2c7)],_0x58af31[_0x3f85bc(0x2dc)],_0x40417c,_0x390376,_0x4e3a93,_0x59347d),this['contentsBack'][_0x3f85bc(0x135)]=0xff;},Window_Base['prototype'][_0x2d27b8(0xc6)]=function(_0x6981d){const _0x5bd5a5=_0x2d27b8,_0x1b94b9=this[_0x5bd5a5(0x120)](_0x6981d)[_0x5bd5a5(0xc8)](',');if(!_0x6981d['drawing'])return;const _0x2962ab=_0x1b94b9[0x0][_0x5bd5a5(0x18b)](),_0x40d69c=ImageManager[_0x5bd5a5(0x26b)](_0x2962ab),_0x4f5565=JsonEx[_0x5bd5a5(0x8c)](_0x6981d),_0x13cb0f=this[_0x5bd5a5(0x172)][_0x5bd5a5(0x135)];_0x40d69c[_0x5bd5a5(0x87)](this[_0x5bd5a5(0xea)]['bind'](this,_0x40d69c,_0x4f5565,_0x13cb0f));},Window_Base['prototype'][_0x2d27b8(0xea)]=function(_0x15ca0e,_0x6b3032,_0x34228f){const _0x1b718c=_0x2d27b8,_0x8e1bcb=_0x6b3032[_0x1b718c(0x2c7)]||this['innerWidth'],_0x558bfe=this[_0x1b718c(0x150)]!==undefined?this['itemHeight']():this[_0x1b718c(0x32a)],_0x2254ea=_0x8e1bcb/_0x15ca0e['width'],_0x433568=_0x558bfe/_0x15ca0e['height'],_0x26b622=Math[_0x1b718c(0x312)](_0x2254ea,_0x433568,0x1),_0x807d82=this['_index']!==undefined?(this['itemRectWithPadding'](0x0)[_0x1b718c(0x2dc)]-this['lineHeight']())/0x2:0x0,_0x3e2e9e=_0x15ca0e[_0x1b718c(0x2c7)]*_0x26b622,_0x1673af=_0x15ca0e[_0x1b718c(0x2dc)]*_0x26b622,_0x230ba4=Math['floor']((_0x8e1bcb-_0x3e2e9e)/0x2)+_0x6b3032[_0x1b718c(0x31f)],_0x5e75f1=Math[_0x1b718c(0x205)]((_0x558bfe-_0x1673af)/0x2)+_0x6b3032[_0x1b718c(0x2de)]-_0x807d82*0x2;this[_0x1b718c(0x279)][_0x1b718c(0x135)]=_0x34228f,this['contentsBack'][_0x1b718c(0x211)](_0x15ca0e,0x0,0x0,_0x15ca0e[_0x1b718c(0x2c7)],_0x15ca0e[_0x1b718c(0x2dc)],_0x230ba4,_0x5e75f1,_0x3e2e9e,_0x1673af),this[_0x1b718c(0x279)][_0x1b718c(0x135)]=0xff;},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x2db)]=function(_0x5f003a){const _0x5b7df1=_0x2d27b8,_0x255d00=this['obtainEscapeParam'](_0x5f003a);if(_0x5f003a['drawing'])this[_0x5b7df1(0xfc)](_0x255d00>0x0);},Window_Base[_0x2d27b8(0x244)][_0x2d27b8(0x283)]=function(_0x2b554e){const _0x288167=_0x2d27b8,_0x15d0a0=this[_0x288167(0x2cf)](_0x2b554e);this['constructor']===Window_Message&&_0x2b554e['drawing']&&(_0x288167(0x14a)===_0x288167(0x27a)?this[_0x288167(0x29b)](![]):this['startWait'](_0x15d0a0));},Window_Help[_0x2d27b8(0x244)][_0x2d27b8(0x20e)]=function(){const _0xe47ffc=_0x2d27b8;this[_0xe47ffc(0x29b)]($gameSystem[_0xe47ffc(0x2da)]());},Window_Help[_0x2d27b8(0x244)]['isAutoColorAffected']=function(){return!![];},VisuMZ['MessageCore'][_0x2d27b8(0x16a)]=Window_Help[_0x2d27b8(0x244)][_0x2d27b8(0x82)],Window_Help[_0x2d27b8(0x244)]['refresh']=function(){const _0x18e234=_0x2d27b8;this[_0x18e234(0x22f)](),VisuMZ[_0x18e234(0xe8)]['Window_Help_refresh'][_0x18e234(0x1ca)](this),this[_0x18e234(0x20e)]();},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0xf4)]=Window_Options['prototype']['addGeneralOptions'],Window_Options[_0x2d27b8(0x244)][_0x2d27b8(0x2ce)]=function(){const _0x15ecb9=_0x2d27b8;VisuMZ[_0x15ecb9(0xe8)][_0x15ecb9(0xf4)][_0x15ecb9(0x1ca)](this),this[_0x15ecb9(0x1a1)]();},Window_Options[_0x2d27b8(0x244)][_0x2d27b8(0x1a1)]=function(){const _0x2d1204=_0x2d27b8;VisuMZ[_0x2d1204(0xe8)]['Settings']['TextSpeed'][_0x2d1204(0xc4)]&&this[_0x2d1204(0x7e)]();},Window_Options[_0x2d27b8(0x244)][_0x2d27b8(0x7e)]=function(){const _0x5ddcdb=_0x2d27b8,_0x17d573=TextManager[_0x5ddcdb(0x74)],_0x2a34a3='textSpeed';this[_0x5ddcdb(0x2a1)](_0x17d573,_0x2a34a3);},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x2f1)]=Window_Options['prototype']['statusText'],Window_Options[_0x2d27b8(0x244)][_0x2d27b8(0x276)]=function(_0x59de2d){const _0x7a8314=_0x2d27b8,_0x3ca303=this[_0x7a8314(0x2cd)](_0x59de2d);if(_0x3ca303===_0x7a8314(0xe4))return this[_0x7a8314(0x228)]();return VisuMZ[_0x7a8314(0xe8)][_0x7a8314(0x2f1)]['call'](this,_0x59de2d);},VisuMZ[_0x2d27b8(0xe8)]['Window_Options_isVolumeSymbol']=Window_Options[_0x2d27b8(0x244)][_0x2d27b8(0x1f4)],Window_Options[_0x2d27b8(0x244)]['isVolumeSymbol']=function(_0x1aceca){const _0x22810e=_0x2d27b8;if(_0x1aceca===_0x22810e(0xe4))return!![];return VisuMZ['MessageCore']['Window_Options_isVolumeSymbol'][_0x22810e(0x1ca)](this,_0x1aceca);},Window_Options[_0x2d27b8(0x244)][_0x2d27b8(0x228)]=function(){const _0x277288=_0x2d27b8,_0x29e1a2=this[_0x277288(0x299)]('textSpeed');if(_0x29e1a2>0xa){if(_0x277288(0x1c5)!==_0x277288(0x322))return TextManager[_0x277288(0x281)];else _0x974912[_0x277288(0xe8)]['Sprite_Picture_updateBitmap'][_0x277288(0x1ca)](this),this['createPictureText']();}else return _0x29e1a2;},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x2a6)]=Window_Options['prototype'][_0x2d27b8(0xd5)],Window_Options[_0x2d27b8(0x244)]['changeVolume']=function(_0x3696f1,_0x36a05f,_0x3d295c){const _0x9781d2=_0x2d27b8;if(_0x3696f1===_0x9781d2(0xe4))return this['changeTextSpeed'](_0x3696f1,_0x36a05f,_0x3d295c);VisuMZ['MessageCore'][_0x9781d2(0x2a6)][_0x9781d2(0x1ca)](this,_0x3696f1,_0x36a05f,_0x3d295c);},Window_Options[_0x2d27b8(0x244)][_0x2d27b8(0x162)]=function(_0x4cdea0,_0x49a258,_0x408421){const _0x4512eb=_0x2d27b8,_0x2c4104=this[_0x4512eb(0x299)](_0x4cdea0),_0x120287=0x1,_0x30d3ff=_0x2c4104+(_0x49a258?_0x120287:-_0x120287);_0x30d3ff>0xb&&_0x408421?_0x4512eb(0x14d)==='hPilI'?(_0x3138bb[_0x4512eb(0x1e5)](_0x532656),_0xed16e1[_0x4512eb(0x30f)](_0x1e3e43)):this[_0x4512eb(0x1c1)](_0x4cdea0,0x1):this[_0x4512eb(0x1c1)](_0x4cdea0,_0x30d3ff[_0x4512eb(0x18f)](0x1,0xb));},Window_Message['prototype'][_0x2d27b8(0x1c2)]=function(){const _0x354b77=_0x2d27b8;let _0x29ede1=Window_Base[_0x354b77(0x244)][_0x354b77(0x1c2)][_0x354b77(0x1ca)](this);return _0x29ede1-=this['addedHeight'](),_0x29ede1;},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x330)]=function(){const _0xc34f8c=_0x2d27b8;Window_Base[_0xc34f8c(0x244)]['refreshDimmerBitmap'][_0xc34f8c(0x1ca)](this);if(VisuMZ[_0xc34f8c(0xe8)]['Settings']['General']['StretchDimmedBg']){if('IqSsk'!==_0xc34f8c(0x2cc))this[_0xc34f8c(0x2ac)]();else return this['_scene']&&this[_0xc34f8c(0x1b4)]['constructor']===_0x28ce4b;}},Window_Message['prototype']['stretchDimmerSprite']=function(){const _0x37a3e4=_0x2d27b8;this[_0x37a3e4(0x186)]['x']=Math[_0x37a3e4(0x204)](this[_0x37a3e4(0x2c7)]/0x2),this['_dimmerSprite']['anchor']['x']=0.5,this[_0x37a3e4(0x186)]['scale']['x']=Graphics['width'];},VisuMZ['MessageCore'][_0x2d27b8(0x1c3)]=Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x81)],Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x81)]=function(){const _0x5a167e=_0x2d27b8;VisuMZ[_0x5a167e(0xe8)][_0x5a167e(0x1c3)]['call'](this),this[_0x5a167e(0x22f)](),this[_0x5a167e(0x20e)](),this[_0x5a167e(0xfc)](![]),this['setTextAlignment'](_0x5a167e(0x20f)),this[_0x5a167e(0xd3)](VisuMZ[_0x5a167e(0xe8)][_0x5a167e(0x1d3)]['General'][_0x5a167e(0x232)]);},Window_Message[_0x2d27b8(0x244)]['resetWordWrap']=function(){const _0x2d1c67=_0x2d27b8;this[_0x2d1c67(0x29b)]($gameSystem[_0x2d1c67(0x217)]());},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0xfb)]=function(){return!![];},Window_Message['prototype'][_0x2d27b8(0xd3)]=function(_0x21bfb0){const _0xb02ac7=_0x2d27b8,_0x35717a=0xb-ConfigManager[_0xb02ac7(0xe4)];_0x21bfb0=Math[_0xb02ac7(0x204)](_0x21bfb0*_0x35717a),this['_textDelayCount']=_0x21bfb0,this[_0xb02ac7(0x220)]=_0x21bfb0;},VisuMZ['MessageCore'][_0x2d27b8(0x13a)]=Window_Message['prototype'][_0x2d27b8(0x141)],Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x141)]=function(){const _0x33116a=_0x2d27b8;return VisuMZ[_0x33116a(0xe8)][_0x33116a(0x13a)]['call'](this)||Input[_0x33116a(0x159)](VisuMZ[_0x33116a(0xe8)][_0x33116a(0x1d3)]['General'][_0x33116a(0x1d2)]);},VisuMZ['MessageCore'][_0x2d27b8(0x20d)]=Window_Message['prototype'][_0x2d27b8(0x24d)],Window_Message[_0x2d27b8(0x244)]['updatePlacement']=function(){const _0x17422c=_0x2d27b8;let _0x58e030=this['y'];this['x']=Math['round']((Graphics['boxWidth']-this[_0x17422c(0x2c7)])/0x2),VisuMZ[_0x17422c(0xe8)][_0x17422c(0x20d)]['call'](this);if(this[_0x17422c(0x116)])this['y']=_0x58e030;this[_0x17422c(0x300)](),this['updateForcedPlacement'](),this[_0x17422c(0x24e)]();},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x2a0)]=Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0xf2)],Window_Message['prototype'][_0x2d27b8(0xf2)]=function(_0x4f5931){const _0x505990=_0x2d27b8;this[_0x505990(0x68)](_0x4f5931),this['onNewPageMessageCore'](_0x4f5931),VisuMZ[_0x505990(0xe8)]['Window_Message_newPage']['call'](this,_0x4f5931),this['createContents']();},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x68)]=function(_0x50f400){const _0x50506a=_0x2d27b8;if(!_0x50f400)return;this['_macroBypassWordWrap']=![],_0x50f400['text']=this[_0x50506a(0x93)](_0x50f400[_0x50506a(0x105)]),this[_0x50506a(0x28d)]&&(_0x50506a(0x145)==='pwxej'?(_0x50f400['text']=this['prepareWordWrapEscapeCharacters'](_0x50f400[_0x50506a(0x105)]),this[_0x50506a(0x18e)]=!![]):this[_0x50506a(0x7e)]());},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0xc5)]=function(_0x421821){const _0x82e813=_0x2d27b8;if(this[_0x82e813(0x18e)])return _0x421821;return Window_Base[_0x82e813(0x244)][_0x82e813(0xc5)][_0x82e813(0x1ca)](this,_0x421821);},Window_Message[_0x2d27b8(0x244)]['onNewPageMessageCore']=function(_0x22b1d7){const _0x2f870f=_0x2d27b8;this[_0x2f870f(0x2d6)](_0x22b1d7),this[_0x2f870f(0x1cc)](_0x22b1d7),this['updateDimensions']();},VisuMZ['MessageCore'][_0x2d27b8(0x257)]=Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x168)],Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x168)]=function(){const _0x214b33=_0x2d27b8;VisuMZ[_0x214b33(0xe8)][_0x214b33(0x257)][_0x214b33(0x1ca)](this),this[_0x214b33(0x81)]();if(this['_messagePositionReset'])this['messagePositionReset']();},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x75)]=function(){const _0x397953=_0x2d27b8;this[_0x397953(0x2c7)]=$gameSystem['getMessageWindowWidth']()+this[_0x397953(0x107)]();;this['width']=Math[_0x397953(0x312)](Graphics[_0x397953(0x2c7)],this[_0x397953(0x2c7)]);const _0x4376dd=$gameSystem[_0x397953(0x99)]();this[_0x397953(0x2dc)]=SceneManager[_0x397953(0x1b4)]['calcWindowHeight'](_0x4376dd,![])+this[_0x397953(0x1d9)](),this['height']=Math[_0x397953(0x312)](Graphics[_0x397953(0x2dc)],this[_0x397953(0x2dc)]);if($gameTemp[_0x397953(0x29f)])this[_0x397953(0x2b3)]();},Window_Message['prototype']['addedWidth']=function(){return 0x0;},Window_Message[_0x2d27b8(0x244)]['addedHeight']=function(){return 0x0;},Window_Message['prototype']['resetPositionX']=function(){const _0x2e9c94=_0x2d27b8;this['x']=(Graphics[_0x2e9c94(0x1f2)]-this[_0x2e9c94(0x2c7)])/0x2,$gameTemp[_0x2e9c94(0x29f)]=undefined,this[_0x2e9c94(0x24e)]();},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x171)]=function(){const _0xbd366=_0x2d27b8,_0x339817={'x':this['x'],'y':this['y']};Window_Base['prototype'][_0xbd366(0x171)][_0xbd366(0x1ca)](this),this[_0xbd366(0x21f)](_0x339817);},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x80)]=function(){return!![];},Window_Message['prototype']['updateNameBoxMove']=function(_0x5395b5){const _0x38683b=_0x2d27b8;this[_0x38683b(0x261)]&&(this[_0x38683b(0x261)]['x']+=this['x']-_0x5395b5['x'],this[_0x38683b(0x261)]['y']+=this['y']-_0x5395b5['y']);},Window_Message['prototype'][_0x2d27b8(0x293)]=function(_0x2049a9,_0x144307){const _0xd85de4=_0x2d27b8;this[_0xd85de4(0x1ea)](this[_0xd85de4(0x2dd)]['x'],this[_0xd85de4(0x2b6)]*(Graphics[_0xd85de4(0x198)]-this[_0xd85de4(0x2dc)])/0x2,this[_0xd85de4(0x2dd)][_0xd85de4(0x2c7)],this[_0xd85de4(0x2dd)][_0xd85de4(0x2dc)],_0x2049a9,_0x144307);},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x163)]=function(_0x4d4ae5){const _0x410cdc=_0x2d27b8,_0x8c9b97=Window_Base[_0x410cdc(0x244)]['processCommonEvent'][_0x410cdc(0x1ca)](this,_0x4d4ae5);_0x4d4ae5[_0x410cdc(0x147)]&&this[_0x410cdc(0x27f)](_0x8c9b97);},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x27f)]=function(_0x3e7dde){const _0xfc9eb4=_0x2d27b8;if($gameParty[_0xfc9eb4(0x21d)]()){}else $gameMap[_0xfc9eb4(0x21b)](_0x3e7dde);},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x33c)]=function(_0x5d7b8a){const _0x51f739=_0x2d27b8;this['_textDelayCount']--;if(this['_textDelayCount']<=0x0){if(_0x51f739(0x76)===_0x51f739(0x76))this[_0x51f739(0x167)](_0x5d7b8a),Window_Base[_0x51f739(0x244)][_0x51f739(0x33c)][_0x51f739(0x1ca)](this,_0x5d7b8a);else{if(this['_MessageCoreSettings']===_0x564a67)this[_0x51f739(0x16c)]();if(this[_0x51f739(0x225)][_0x51f739(0xbd)]===_0x5dfb23)this[_0x51f739(0x16c)]();return this[_0x51f739(0x225)][_0x51f739(0xbd)];}}},Window_Message['prototype'][_0x2d27b8(0x167)]=function(_0x5f1067){const _0x3b8eba=_0x2d27b8;this[_0x3b8eba(0x29e)]=this[_0x3b8eba(0x220)];if(this[_0x3b8eba(0x220)]<=0x0)this[_0x3b8eba(0x70)]=!![];},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x224)]=Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x15a)],Window_Message['prototype']['processEscapeCharacter']=function(_0xa1f84b,_0x4fed33){const _0x4190b4=_0x2d27b8;!_0x4fed33[_0x4190b4(0x147)]?_0x4190b4(0x2b9)!=='QVacd'?(_0x436aaa=_0x5dfa55[_0x4190b4(0x19d)](/[\n\r]+/g,'\x20'),_0x1f9ad7=_0x11ae5c['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):Window_Base[_0x4190b4(0x244)]['processEscapeCharacter'][_0x4190b4(0x1ca)](this,_0xa1f84b,_0x4fed33):_0x4190b4(0x2a7)!==_0x4190b4(0x12d)?VisuMZ[_0x4190b4(0xe8)]['Window_Message_processEscapeCharacter'][_0x4190b4(0x1ca)](this,_0xa1f84b,_0x4fed33):(_0x4eddc5[_0x4190b4(0xe8)][_0x4190b4(0x1ac)][_0x4190b4(0x1ca)](this),this[_0x4190b4(0x171)]());},VisuMZ['MessageCore'][_0x2d27b8(0x1c9)]=Window_Message[_0x2d27b8(0x244)]['needsNewPage'],Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x271)]=function(_0x591ba4){const _0x3a3058=_0x2d27b8;if(this[_0x3a3058(0xe2)])return'cFoGa'!==_0x3a3058(0xb2)?_0x296cf1:![];return VisuMZ['MessageCore'][_0x3a3058(0x1c9)][_0x3a3058(0x1ca)](this,_0x591ba4);},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x2d6)]=function(_0x4d62bd){const _0x49b72b=_0x2d27b8;let _0x1c2108=_0x4d62bd[_0x49b72b(0x105)];this[_0x49b72b(0x223)]={};if(this[_0x49b72b(0x25c)]())return _0x1c2108;_0x1c2108=_0x1c2108['replace'](/<POSITION:[ ]*(.*)>/gi,(_0x4659e0,_0x112009)=>{const _0x462532=_0x49b72b,_0xf2ec2d=_0x112009[_0x462532(0xc8)](',')[_0x462532(0x154)](_0x3a1abe=>Number(_0x3a1abe)||0x0);if(_0xf2ec2d[0x0]!==undefined)this[_0x462532(0x223)]['x']=Number(_0xf2ec2d[0x0]);if(_0xf2ec2d[0x1]!==undefined)this[_0x462532(0x223)]['y']=Number(_0xf2ec2d[0x1]);if(_0xf2ec2d[0x2]!==undefined)this[_0x462532(0x223)][_0x462532(0x2c7)]=Number(_0xf2ec2d[0x2]);if(_0xf2ec2d[0x3]!==undefined)this['_forcedPosition'][_0x462532(0x2dc)]=Number(_0xf2ec2d[0x3]);return'';}),_0x1c2108=_0x1c2108['replace'](/<COORDINATES:[ ]*(.*)>/gi,(_0xea7780,_0x448743)=>{const _0x1eb969=_0x49b72b,_0x141d4b=_0x448743[_0x1eb969(0xc8)](',')[_0x1eb969(0x154)](_0x4b299a=>Number(_0x4b299a)||0x0);if(_0x141d4b[0x0]!==undefined)this[_0x1eb969(0x223)]['x']=Number(_0x141d4b[0x0]);if(_0x141d4b[0x1]!==undefined)this['_forcedPosition']['y']=Number(_0x141d4b[0x1]);return'';}),_0x1c2108=_0x1c2108['replace'](/<DIMENSIONS:[ ]*(.*)>/gi,(_0xf184fe,_0x5f53c8)=>{const _0x2a0c0d=_0x49b72b,_0x37d77d=_0x5f53c8[_0x2a0c0d(0xc8)](',')[_0x2a0c0d(0x154)](_0x33bba4=>Number(_0x33bba4)||0x0);if(_0x37d77d[0x0]!==undefined)this[_0x2a0c0d(0x223)]['width']=Number(_0x37d77d[0x2]);if(_0x37d77d[0x1]!==undefined)this['_forcedPosition']['height']=Number(_0x37d77d[0x3]);return'';}),_0x1c2108=_0x1c2108['replace'](/<OFFSET:[ ]*(.*)>/gi,(_0x267db9,_0xe94980)=>{const _0x3a47ff=_0x49b72b,_0xbb51ff=_0xe94980[_0x3a47ff(0xc8)](',')[_0x3a47ff(0x154)](_0x257c77=>Number(_0x257c77)||0x0);let _0x440e03=_0xbb51ff[0x0]||0x0,_0x250279=_0xbb51ff[0x1]||0x0;return $gameSystem[_0x3a47ff(0x307)](_0x440e03,_0x250279),'';}),_0x4d62bd['text']=_0x1c2108;},Window_Message[_0x2d27b8(0x244)]['updateXyOffsets']=function(){const _0x5c07f5=_0x2d27b8,_0x1513fb=$gameSystem[_0x5c07f5(0x216)]();this['x']+=_0x1513fb['x'],this['y']+=_0x1513fb['y'];},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x136)]=function(){const _0x586a0f=_0x2d27b8;this[_0x586a0f(0x223)]=this[_0x586a0f(0x223)]||{};const _0x3ea384=['x','y',_0x586a0f(0x2c7),_0x586a0f(0x2dc)];for(const _0x26c195 of _0x3ea384){if(_0x586a0f(0x199)==='XYROZ'){if(!this[_0x586a0f(0x221)])return;if(this[_0x586a0f(0x157)]===this[_0x586a0f(0x2c7)]&&this['_pictureTextHeight']===this[_0x586a0f(0x2dc)])return;this[_0x586a0f(0x157)]=this[_0x586a0f(0x2c7)],this[_0x586a0f(0x175)]=this[_0x586a0f(0x2dc)],this[_0x586a0f(0x23a)]={},this['_pictureTextWindow']['move'](0x0,0x0,this[_0x586a0f(0x2c7)],this['height']);}else this[_0x586a0f(0x223)][_0x26c195]!==undefined&&(this[_0x26c195]=Number(this[_0x586a0f(0x223)][_0x26c195]));}},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x1cc)]=function(_0x25a730){const _0x14c6cd=_0x2d27b8;this[_0x14c6cd(0xe2)]=![];let _0x38d634=_0x25a730['text'];_0x38d634=_0x38d634['replace'](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x3fe2d7=_0x14c6cd;return this[_0x3fe2d7(0xa7)](_0x38d634,!![],!![]),this[_0x3fe2d7(0x2c9)](_0x3fe2d7(0xe6)),'';}),_0x38d634=_0x38d634['replace'](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x1afa21=_0x14c6cd;return _0x1afa21(0x9a)===_0x1afa21(0xf8)?![]:(this[_0x1afa21(0xa7)](_0x38d634,!![],![]),this[_0x1afa21(0x2c9)](_0x1afa21(0xe6)),'');}),_0x38d634=_0x38d634[_0x14c6cd(0x19d)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x4ed67e=_0x14c6cd;return this[_0x4ed67e(0xa7)](_0x38d634,![],!![]),this[_0x4ed67e(0x2c9)]('none'),'';});if(SceneManager['isSceneBattle']())_0x38d634=_0x38d634['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x502936,_0x4870a5)=>{const _0x38ec24=_0x14c6cd;return this['processAutoSize'](_0x38d634,!![],!![]),this['processAutoPosition'](_0x38ec24(0x309),Number(_0x4870a5)||0x1),'';}),_0x38d634=_0x38d634[_0x14c6cd(0x19d)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x1032b0,_0x4d1045)=>{const _0x4ef7c6=_0x14c6cd;return this[_0x4ef7c6(0xa7)](_0x38d634,!![],!![]),this[_0x4ef7c6(0x2c9)](_0x4ef7c6(0xad),Number(_0x4d1045)||0x0),'';}),_0x38d634=_0x38d634[_0x14c6cd(0x19d)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x1d91b7,_0xc41784)=>{const _0x22b47a=_0x14c6cd;if(_0x22b47a(0x1dc)===_0x22b47a(0x1dc))return this[_0x22b47a(0xa7)](_0x38d634,!![],!![]),this[_0x22b47a(0x2c9)](_0x22b47a(0xd9),Number(_0xc41784)||0x0),'';else{const _0x3c65c0=this[_0x22b47a(0x10d)],_0x484373=_0x3c65c0['y'],_0x4a5363=_0x1e4720[_0x22b47a(0xe8)][_0x22b47a(0x1d3)]['General'][_0x22b47a(0x2c8)];_0x484373>this['y']&&_0x484373<this['y']+this[_0x22b47a(0x2dc)]-_0x4a5363&&(this['y']=_0x3c65c0['y']+_0x3c65c0[_0x22b47a(0x2dc)]);}});else{if(SceneManager['isSceneMap']()){if(_0x14c6cd(0x139)!==_0x14c6cd(0x139)){_0x4a97e2[_0x14c6cd(0x2f5)]=_0x452ac0[_0x14c6cd(0x2f5)][_0x14c6cd(0xd4)](),_0x32dc7c[_0x14c6cd(0x1c4)]=new _0x16e8da('\x1b'+_0x2f3b7c[_0x14c6cd(0x2f5)],'gi'),_0x6a822d[_0x14c6cd(0x325)]='\x1b'+_0x16c077[_0x14c6cd(0x2f5)];if(_0x518b6e[_0x14c6cd(0xff)]==='')_0x38075d[_0x14c6cd(0x325)]+='[0]';}else _0x38d634=_0x38d634[_0x14c6cd(0x19d)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x28ddb0,_0x486475)=>{const _0x409684=_0x14c6cd;return this['processAutoSize'](_0x38d634,!![],!![]),this[_0x409684(0x2c9)](_0x409684(0x19a),0x0),'';}),_0x38d634=_0x38d634[_0x14c6cd(0x19d)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x566313,_0x38384c)=>{const _0x73c655=_0x14c6cd;return this['processAutoSize'](_0x38d634,!![],!![]),this[_0x73c655(0x2c9)](_0x73c655(0x296),Number(_0x38384c)||0x1),'';}),_0x38d634=_0x38d634[_0x14c6cd(0x19d)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x55a901,_0x20e6ca)=>{const _0x150dda=_0x14c6cd;return this['processAutoSize'](_0x38d634,!![],!![]),this[_0x150dda(0x2c9)]('map\x20party',Number(_0x20e6ca)||0x0),'';}),_0x38d634=_0x38d634[_0x14c6cd(0x19d)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x2ca414,_0x243f2b)=>{const _0x1e952b=_0x14c6cd;return this[_0x1e952b(0xa7)](_0x38d634,!![],!![]),this[_0x1e952b(0x2c9)](_0x1e952b(0xba),Number(_0x243f2b)||0x0),'';});}}_0x25a730[_0x14c6cd(0x105)]=_0x38d634;},Window_Message[_0x2d27b8(0x2f0)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x2d27b8(0x2e7)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0xa7)]=function(_0x1a1ab8,_0x132f02,_0xf92c28){const _0x522830=_0x2d27b8;_0x1a1ab8=_0x1a1ab8[_0x522830(0x19d)](Window_Message[_0x522830(0x2f0)],''),_0x1a1ab8=_0x1a1ab8['replace'](Window_Message[_0x522830(0x2e7)],''),this[_0x522830(0x254)]=!![],this['_currentAutoSize']=!![],this['setWordWrap'](![]);const _0x323b2c=this[_0x522830(0x29d)](_0x1a1ab8);if(_0x132f02){let _0x84c887=_0x323b2c[_0x522830(0x2c7)]+$gameSystem[_0x522830(0x201)]()*0x2+0x6;const _0xe9b07f=$gameMessage[_0x522830(0x30b)]()!=='',_0x467efe=ImageManager['faceWidth'],_0x59b379=0x14;_0x84c887+=_0xe9b07f?_0x467efe+_0x59b379:0x4;if(_0x84c887%0x2!==0x0)_0x84c887+=0x1;$gameSystem[_0x522830(0x13d)](_0x84c887);}if(_0xf92c28){let _0x1b2e0f=Math[_0x522830(0x1c6)](_0x323b2c[_0x522830(0x2dc)]/this[_0x522830(0xbc)]());$gameSystem['setMessageWindowRows'](_0x1b2e0f);}this[_0x522830(0xf6)](),this[_0x522830(0x146)](),this[_0x522830(0x254)]=![],this['_messagePositionReset']=!![];},Window_Message['prototype'][_0x2d27b8(0xf6)]=function(){const _0x31bd39=_0x2d27b8;this['updateDimensions'](),this[_0x31bd39(0x24d)](),this[_0x31bd39(0x2b3)](),this[_0x31bd39(0x1b3)](),this['contents'][_0x31bd39(0x114)](),this['createContents']();},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x2c9)]=function(_0x46ceff,_0x3146b2){const _0x38e234=_0x2d27b8;switch(_0x46ceff[_0x38e234(0x294)]()[_0x38e234(0x18b)]()){case'battle\x20actor':this[_0x38e234(0x116)]=$gameActors['actor'](_0x3146b2);break;case _0x38e234(0xad):this[_0x38e234(0x116)]=$gameParty[_0x38e234(0x26e)]()[_0x3146b2-0x1];break;case'battle\x20enemy':this[_0x38e234(0x116)]=$gameTroop[_0x38e234(0x26e)]()[_0x3146b2-0x1];break;case'map\x20player':this[_0x38e234(0x116)]=$gamePlayer;break;case'map\x20actor':const _0x3e41b9=$gameActors[_0x38e234(0x8b)](_0x3146b2)[_0x38e234(0x196)]();_0x3e41b9===0x0?this[_0x38e234(0x116)]=$gamePlayer:this[_0x38e234(0x116)]=$gamePlayer[_0x38e234(0x1ee)]()[_0x38e234(0x2fe)](_0x3e41b9-0x1);break;case'map\x20party':_0x3146b2===0x1?this[_0x38e234(0x116)]=$gamePlayer:this['_autoPositionTarget']=$gamePlayer['followers']()[_0x38e234(0x2fe)](_0x3146b2-0x2);break;case _0x38e234(0xba):this['_autoPositionTarget']=$gameMap[_0x38e234(0x16f)](_0x3146b2);break;}this[_0x38e234(0x116)]&&this[_0x38e234(0x173)]();},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x72)]=Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x28f)],Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x28f)]=function(){const _0x5bb3c2=_0x2d27b8;this[_0x5bb3c2(0x173)](),VisuMZ[_0x5bb3c2(0xe8)]['Window_Message_synchronizeNameBox'][_0x5bb3c2(0x1ca)](this);},Window_Message['prototype'][_0x2d27b8(0x173)]=function(){const _0x41df56=_0x2d27b8;if(!this[_0x41df56(0x116)])return;const _0x1f54a4=SceneManager[_0x41df56(0x1b4)];if(!_0x1f54a4)return;if(!_0x1f54a4[_0x41df56(0x1de)])return;const _0x120a83=_0x1f54a4[_0x41df56(0x1de)]['findTargetSprite'](this[_0x41df56(0x116)]);if(!_0x120a83)return;let _0x57fb01=_0x120a83['x'];_0x57fb01-=this['width']/0x2,_0x57fb01-=(Graphics['width']-Graphics['boxWidth'])/0x2,_0x57fb01+=this[_0x41df56(0x16d)]();let _0x2e604c=_0x120a83['y'];_0x2e604c-=this['height'],_0x2e604c-=(Graphics['height']-Graphics['boxHeight'])/0x2,_0x2e604c+=this['autoPositionOffsetY'](),_0x2e604c-=_0x120a83['height']+0x8;const _0xe7db=$gameSystem[_0x41df56(0x216)]();_0x57fb01+=_0xe7db['x'],_0x2e604c+=_0xe7db['y'],this['x']=Math[_0x41df56(0x204)](_0x57fb01),this['y']=Math['round'](_0x2e604c),this['clampPlacementPosition'](!![],![]),this[_0x41df56(0x223)]=this[_0x41df56(0x223)]||{},this[_0x41df56(0x223)]['x']=this['x'],this[_0x41df56(0x223)]['y']=this['y'],this['_forcedPosition']['width']=this[_0x41df56(0x2c7)],this['_forcedPosition']['height']=this['height'],this[_0x41df56(0x261)][_0x41df56(0x24d)]();},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x16d)]=function(){return 0x0;},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x17f)]=function(){return 0x0;},Window_Message[_0x2d27b8(0x244)]['messagePositionReset']=function(){const _0x1e3c92=_0x2d27b8;this[_0x1e3c92(0xf7)]=![],this['_autoPositionTarget']=undefined,$gameSystem[_0x1e3c92(0x16c)](),this['updateAutoSizePosition'](),this['openness']=0x0;},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x273)]=function(_0x417b8a){const _0x1c7f74=_0x2d27b8;return Window_Base['prototype'][_0x1c7f74(0x273)][_0x1c7f74(0x1ca)](this,_0x417b8a);},Window_Message[_0x2d27b8(0x244)]['postConvertEscapeCharacters']=function(_0x5139e5){const _0x388694=_0x2d27b8;return Window_Base[_0x388694(0x244)][_0x388694(0x10e)]['call'](this,_0x5139e5);},Window_Message[_0x2d27b8(0x244)][_0x2d27b8(0x124)]=function(_0x3747e6){const _0x4d3e0f=_0x2d27b8;this[_0x4d3e0f(0x292)](_0x3747e6),Window_Base['prototype'][_0x4d3e0f(0x124)][_0x4d3e0f(0x1ca)](this,_0x3747e6),this[_0x4d3e0f(0x2bd)](_0x3747e6);},Window_Message[_0x2d27b8(0x244)]['preFlushTextState']=function(_0xd28309){},Window_Message[_0x2d27b8(0x244)]['postFlushTextState']=function(_0x45bf93){},Window_NameBox[_0x2d27b8(0x244)][_0x2d27b8(0xfb)]=function(){return![];},Window_NameBox[_0x2d27b8(0x244)]['resetTextColor']=function(){const _0xd78d59=_0x2d27b8;Window_Base[_0xd78d59(0x244)][_0xd78d59(0x188)][_0xd78d59(0x1ca)](this),this[_0xd78d59(0xcd)](this['defaultColor']());},Window_NameBox['prototype']['defaultColor']=function(){const _0x498cf3=_0x2d27b8,_0x347e65=VisuMZ[_0x498cf3(0xe8)]['Settings'][_0x498cf3(0x192)]['NameBoxWindowDefaultColor'];return ColorManager[_0x498cf3(0x2df)](_0x347e65);},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0xf0)]=Window_NameBox[_0x2d27b8(0x244)][_0x2d27b8(0x24d)],Window_NameBox[_0x2d27b8(0x244)][_0x2d27b8(0x24d)]=function(){const _0x1fac8a=_0x2d27b8;VisuMZ[_0x1fac8a(0xe8)][_0x1fac8a(0xf0)][_0x1fac8a(0x1ca)](this),this[_0x1fac8a(0x25d)](),this['updateOffsetPosition'](),this[_0x1fac8a(0x24e)](),this['updateOverlappingY']();},Window_NameBox[_0x2d27b8(0x244)][_0x2d27b8(0x273)]=function(_0x2dd3a7){const _0x4c72d8=_0x2d27b8;return _0x2dd3a7=_0x2dd3a7['replace'](/<LEFT>/gi,this[_0x4c72d8(0x20b)]['bind'](this,0x0)),_0x2dd3a7=_0x2dd3a7['replace'](/<CENTER>/gi,this[_0x4c72d8(0x20b)]['bind'](this,0x5)),_0x2dd3a7=_0x2dd3a7[_0x4c72d8(0x19d)](/<RIGHT>/gi,this[_0x4c72d8(0x20b)]['bind'](this,0xa)),_0x2dd3a7=_0x2dd3a7[_0x4c72d8(0x19d)](/<POSITION:[ ](\d+)>/gi,(_0x4fe1d7,_0x50c089)=>this[_0x4c72d8(0x20b)](parseInt(_0x50c089))),_0x2dd3a7=_0x2dd3a7[_0x4c72d8(0x19d)](/<\/LEFT>/gi,''),_0x2dd3a7=_0x2dd3a7[_0x4c72d8(0x19d)](/<\/CENTER>/gi,''),_0x2dd3a7=_0x2dd3a7['replace'](/<\/RIGHT>/gi,''),Window_Base[_0x4c72d8(0x244)][_0x4c72d8(0x273)]['call'](this,_0x2dd3a7);},Window_NameBox['prototype'][_0x2d27b8(0x20b)]=function(_0x31d8a2){const _0x85899c=_0x2d27b8;return this[_0x85899c(0x14c)]=_0x31d8a2,'';},Window_NameBox[_0x2d27b8(0x244)][_0x2d27b8(0x25d)]=function(){const _0x14d649=_0x2d27b8;if($gameMessage[_0x14d649(0x17e)]())return;this[_0x14d649(0x14c)]=this[_0x14d649(0x14c)]||0x0;const _0x545b68=this[_0x14d649(0x10d)],_0x31deb6=Math['floor'](_0x545b68[_0x14d649(0x2c7)]*this[_0x14d649(0x14c)]/0xa);this['x']=_0x545b68['x']+_0x31deb6-Math['floor'](this['width']/0x2),this['x']=this['x'][_0x14d649(0x18f)](_0x545b68['x'],_0x545b68['x']+_0x545b68['width']-this[_0x14d649(0x2c7)]);},Window_NameBox['prototype'][_0x2d27b8(0x94)]=function(){const _0x315aee=_0x2d27b8;if($gameMessage[_0x315aee(0x17e)]())return;this[_0x315aee(0x14c)]=this[_0x315aee(0x14c)]||0x0;const _0x5adc8f=VisuMZ[_0x315aee(0xe8)][_0x315aee(0x1d3)]['General'][_0x315aee(0x151)],_0x52df20=VisuMZ['MessageCore'][_0x315aee(0x1d3)][_0x315aee(0x192)][_0x315aee(0x2c8)],_0x1d3b4b=(0x5-this[_0x315aee(0x14c)])/0x5;this['x']+=Math[_0x315aee(0x205)](_0x5adc8f*_0x1d3b4b),this['y']+=_0x52df20;},Window_NameBox[_0x2d27b8(0x244)]['updateOverlappingY']=function(){const _0xc38fb8=_0x2d27b8,_0xe9adec=this['_messageWindow'],_0x158ae2=_0xe9adec['y'],_0xdbea3b=VisuMZ[_0xc38fb8(0xe8)]['Settings'][_0xc38fb8(0x192)][_0xc38fb8(0x2c8)];_0x158ae2>this['y']&&_0x158ae2<this['y']+this[_0xc38fb8(0x2dc)]-_0xdbea3b&&(this['y']=_0xe9adec['y']+_0xe9adec[_0xc38fb8(0x2dc)]);},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x2af)]=Window_NameBox['prototype'][_0x2d27b8(0x82)],Window_NameBox['prototype'][_0x2d27b8(0x82)]=function(){const _0x289130=_0x2d27b8;this['_relativePosition']=0x0,VisuMZ['MessageCore'][_0x289130(0x2af)][_0x289130(0x1ca)](this);},Window_ChoiceList['prototype']['isWordWrapEnabled']=function(){return![];},Window_ChoiceList['prototype'][_0x2d27b8(0xfb)]=function(){return!![];},Window_ChoiceList[_0x2d27b8(0x244)][_0x2d27b8(0x28b)]=function(){const _0x2d7ccc=_0x2d27b8;return $gameSystem[_0x2d7ccc(0x2ab)]()+0x8;},Window_ChoiceList[_0x2d27b8(0x244)][_0x2d27b8(0x237)]=function(){const _0x1645e0=_0x2d27b8;return $gameSystem[_0x1645e0(0x15c)]();},Window_ChoiceList[_0x2d27b8(0x244)][_0x2d27b8(0xd8)]=function(){const _0x7ec343=_0x2d27b8;this[_0x7ec343(0x82)](),this['selectDefault'](),this[_0x7ec343(0x1fc)](),this[_0x7ec343(0x2ae)]();},Window_ChoiceList[_0x2d27b8(0x244)][_0x2d27b8(0x82)]=function(){const _0x2016a8=_0x2d27b8;this[_0x2016a8(0x1a3)](),this[_0x2016a8(0x148)](),this[_0x2016a8(0x10d)]&&(this['updatePlacement'](),this['placeCancelButton']()),this[_0x2016a8(0x332)](),this[_0x2016a8(0x1ae)](),this[_0x2016a8(0x330)](),Window_Selectable['prototype'][_0x2016a8(0x82)][_0x2016a8(0x1ca)](this);},Window_ChoiceList['prototype'][_0x2d27b8(0x148)]=function(){const _0x3df2d9=_0x2d27b8,_0x437435=$gameMessage[_0x3df2d9(0x23d)]();let _0x5cfa38=0x0;for(let _0xdb125b of _0x437435){_0xdb125b=this[_0x3df2d9(0x278)](_0xdb125b);if(this[_0x3df2d9(0x190)](_0xdb125b)){if('hEaMY'===_0x3df2d9(0x27c)){const _0x40a6ce=this['parseChoiceText'](_0xdb125b),_0x25c8ee=this[_0x3df2d9(0x2d5)](_0xdb125b);this['addCommand'](_0x40a6ce,'choice',_0x25c8ee,_0x5cfa38);}else _0xd37a62=_0x51fd17[_0x3df2d9(0x19d)](/[\n\r]+/g,''),_0x2c7987=_0x463c2f['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a');}_0x5cfa38++;}},Window_ChoiceList['prototype'][_0x2d27b8(0x278)]=function(_0x218a52){const _0x510369=_0x2d27b8;return Window_Base['prototype'][_0x510369(0x93)][_0x510369(0x1ca)](this,_0x218a52);},Window_ChoiceList[_0x2d27b8(0x244)]['isChoiceVisible']=function(_0x9eb441){const _0x3ceb35=_0x2d27b8;if(Imported[_0x3ceb35(0x288)])$gameMessage[_0x3ceb35(0x207)]();if(_0x9eb441[_0x3ceb35(0x1c7)](/<HIDE>/i))return![];if(_0x9eb441['match'](/<SHOW>/i))return!![];if(_0x9eb441[_0x3ceb35(0x1c7)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x3ceb35(0x22a)!==_0x3ceb35(0xd0)){const _0x448d86=RegExp['$1']['split'](',')[_0x3ceb35(0x154)](_0x48b495=>Number(_0x48b495)||0x0);for(const _0x3fd05d of _0x448d86){if(_0x3ceb35(0x1ef)!==_0x3ceb35(0x2ca)){if(!$gameSwitches[_0x3ceb35(0x1aa)](_0x3fd05d))return![];}else _0x4ab0c9=_0x3e6939['max'](_0x138f3e,_0x9f57f3);}return!![];}else this['updateAutoPosition']();}if(_0x9eb441[_0x3ceb35(0x1c7)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x599436=RegExp['$1'][_0x3ceb35(0xc8)](',')['map'](_0xc223=>Number(_0xc223)||0x0);for(const _0x3fa19e of _0x599436){if(_0x3ceb35(0x27e)==='mkTSs'){if(!$gameSwitches[_0x3ceb35(0x1aa)](_0x3fa19e))return![];}else _0x10d3b1['MessageCore']['Window_Options_addGeneralOptions']['call'](this),this['addMessageCoreCommands']();}return!![];}if(_0x9eb441['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x595a53=RegExp['$1'][_0x3ceb35(0xc8)](',')[_0x3ceb35(0x154)](_0x4083ea=>Number(_0x4083ea)||0x0);for(const _0x3fbd3b of _0x595a53){if($gameSwitches[_0x3ceb35(0x1aa)](_0x3fbd3b))return!![];}return![];}if(_0x9eb441['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x3ceb35(0x267)!==_0x3ceb35(0x11c)){const _0x4eb17d=RegExp['$1']['split'](',')[_0x3ceb35(0x154)](_0x51c9e9=>Number(_0x51c9e9)||0x0);for(const _0x901e5d of _0x4eb17d){if(!$gameSwitches['value'](_0x901e5d))return!![];}return![];}else return _0x3487d9=_0x29384d[_0x3ceb35(0x19d)](/<LEFT>/gi,this[_0x3ceb35(0x20b)][_0x3ceb35(0x111)](this,0x0)),_0x3d7408=_0x436d04['replace'](/<CENTER>/gi,this[_0x3ceb35(0x20b)][_0x3ceb35(0x111)](this,0x5)),_0x193a55=_0xc29b0d[_0x3ceb35(0x19d)](/<RIGHT>/gi,this[_0x3ceb35(0x20b)][_0x3ceb35(0x111)](this,0xa)),_0x3fda54=_0x3ca746[_0x3ceb35(0x19d)](/<POSITION:[ ](\d+)>/gi,(_0x8a81b9,_0x40d791)=>this[_0x3ceb35(0x20b)](_0x1172ff(_0x40d791))),_0xa33717=_0x324429[_0x3ceb35(0x19d)](/<\/LEFT>/gi,''),_0x46b2c1=_0x6a4fd1[_0x3ceb35(0x19d)](/<\/CENTER>/gi,''),_0x22784c=_0x5c4cbf[_0x3ceb35(0x19d)](/<\/RIGHT>/gi,''),_0x1466d8[_0x3ceb35(0x244)][_0x3ceb35(0x273)]['call'](this,_0x5d0513);}if(_0x9eb441[_0x3ceb35(0x1c7)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2a608f=RegExp['$1'][_0x3ceb35(0xc8)](',')['map'](_0x1f9d13=>Number(_0x1f9d13)||0x0);for(const _0x1d3616 of _0x2a608f){if(!$gameSwitches[_0x3ceb35(0x1aa)](_0x1d3616))return!![];}return![];}if(_0x9eb441[_0x3ceb35(0x1c7)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x1db6ef=RegExp['$1']['split'](',')[_0x3ceb35(0x154)](_0x3658e6=>Number(_0x3658e6)||0x0);for(const _0x4c30ce of _0x1db6ef){if($gameSwitches[_0x3ceb35(0x1aa)](_0x4c30ce))return![];}return!![];}return!![];},Window_ChoiceList['prototype'][_0x2d27b8(0x24b)]=function(_0xa27f05){const _0x22a6d4=_0x2d27b8;let _0x496f2a=_0xa27f05;return _0x496f2a=_0x496f2a[_0x22a6d4(0x19d)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x496f2a=_0x496f2a[_0x22a6d4(0x19d)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x496f2a;},Window_ChoiceList['prototype'][_0x2d27b8(0x2d5)]=function(_0x14f014){const _0x593863=_0x2d27b8;if(Imported['VisuMZ_1_EventsMoveCore'])$gameMessage[_0x593863(0x207)]();if(_0x14f014[_0x593863(0x1c7)](/<DISABLE>/i))return![];if(_0x14f014[_0x593863(0x1c7)](/<ENABLE>/i))return!![];if(_0x14f014[_0x593863(0x1c7)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x1d0507=RegExp['$1'][_0x593863(0xc8)](',')[_0x593863(0x154)](_0x2c2ec7=>Number(_0x2c2ec7)||0x0);for(const _0x584e03 of _0x1d0507){if(!$gameSwitches[_0x593863(0x1aa)](_0x584e03))return![];}return!![];}if(_0x14f014[_0x593863(0x1c7)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x593863(0x156)!==_0x593863(0x11a)){const _0x12f8ad=RegExp['$1']['split'](',')['map'](_0xdb6415=>Number(_0xdb6415)||0x0);for(const _0x2b3d1e of _0x12f8ad){if('NQnRx'==='NQnRx'){if(!$gameSwitches[_0x593863(0x1aa)](_0x2b3d1e))return![];}else{if(this[_0x593863(0x225)]===_0x4355ab)this[_0x593863(0x16c)]();if(this[_0x593863(0x225)][_0x593863(0x286)]===_0x14d628)this['initMessageCore']();_0x19e179=_0x6b5110[_0x593863(0x1c6)](_0xee4d47);if(_0x97c3d1%0x2!==0x0)_0x132028+=0x1;this[_0x593863(0x225)][_0x593863(0x286)]=_0x3baadf||0x2;}}return!![];}else this[_0x593863(0x2dd)]=_0x541622[_0x593863(0x8c)](_0x502c52);}if(_0x14f014['match'](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2a8c14=RegExp['$1'][_0x593863(0xc8)](',')[_0x593863(0x154)](_0xb64e6c=>Number(_0xb64e6c)||0x0);for(const _0x3fab0b of _0x2a8c14){if(_0x593863(0x218)!==_0x593863(0x31b)){if($gameSwitches[_0x593863(0x1aa)](_0x3fab0b))return!![];}else{if(_0xafe611){let _0x5dac97=this['_pictures'][_0x593863(0x269)](_0x122400);this['requestPictureTextRefresh'](_0x5dac97);}}}return![];}if(_0x14f014[_0x593863(0x1c7)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x65a32e=RegExp['$1'][_0x593863(0xc8)](',')[_0x593863(0x154)](_0x236ec9=>Number(_0x236ec9)||0x0);for(const _0x1e9ff5 of _0x65a32e){if(!$gameSwitches[_0x593863(0x1aa)](_0x1e9ff5))return!![];}return![];}if(_0x14f014[_0x593863(0x1c7)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x25a855=RegExp['$1'][_0x593863(0xc8)](',')[_0x593863(0x154)](_0x301be9=>Number(_0x301be9)||0x0);for(const _0x13e49c of _0x25a855){if(!$gameSwitches[_0x593863(0x1aa)](_0x13e49c))return!![];}return![];}if(_0x14f014[_0x593863(0x1c7)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x35c3dc=RegExp['$1'][_0x593863(0xc8)](',')[_0x593863(0x154)](_0x5afe1d=>Number(_0x5afe1d)||0x0);for(const _0x5561c9 of _0x35c3dc){if($gameSwitches[_0x593863(0x1aa)](_0x5561c9))return![];}return!![];}return!![];},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x1c0)]=Window_ChoiceList[_0x2d27b8(0x244)]['updatePlacement'],Window_ChoiceList['prototype']['updatePlacement']=function(){const _0x1351b7=_0x2d27b8;VisuMZ[_0x1351b7(0xe8)][_0x1351b7(0x1c0)][_0x1351b7(0x1ca)](this),this['clampPlacementPosition']();},Window_ChoiceList['prototype'][_0x2d27b8(0x1a9)]=function(){const _0x51932d=_0x2d27b8;if(!this['_cancelButton'])return;const _0x3552fa=0x8,_0x40a98c=this['_cancelButton'],_0x2fa292=this['x']+this[_0x51932d(0x2c7)],_0x5b724d=Math[_0x51932d(0x205)]((Graphics[_0x51932d(0x2c7)]-Graphics['boxWidth'])/0x2);_0x2fa292>=Graphics['boxWidth']+_0x5b724d-_0x40a98c[_0x51932d(0x2c7)]+_0x3552fa?_0x40a98c['x']=-_0x40a98c[_0x51932d(0x2c7)]-_0x3552fa:_0x40a98c['x']=this[_0x51932d(0x2c7)]+_0x3552fa,_0x40a98c['y']=this['height']/0x2-_0x40a98c[_0x51932d(0x2dc)]/0x2;},VisuMZ[_0x2d27b8(0xe8)][_0x2d27b8(0x337)]=Window_ChoiceList[_0x2d27b8(0x244)]['windowX'],Window_ChoiceList[_0x2d27b8(0x244)]['windowX']=function(){const _0x20e526=_0x2d27b8;return this[_0x20e526(0x10d)]?this[_0x20e526(0x9c)]():VisuMZ[_0x20e526(0xe8)][_0x20e526(0x337)][_0x20e526(0x1ca)](this);},Window_ChoiceList[_0x2d27b8(0x244)][_0x2d27b8(0x9c)]=function(){const _0x6ed656=_0x2d27b8,_0x15cad2=$gameMessage['choicePositionType']();if(_0x15cad2===0x1)return(Graphics[_0x6ed656(0x1f2)]-this[_0x6ed656(0x11f)]())/0x2;else return _0x15cad2===0x2?this[_0x6ed656(0x10d)]['x']+this[_0x6ed656(0x10d)]['width']-this[_0x6ed656(0x11f)]():this[_0x6ed656(0x10d)]['x'];},Window_ChoiceList[_0x2d27b8(0x244)][_0x2d27b8(0x11f)]=function(){const _0x182803=_0x2d27b8,_0x44c41a=(this[_0x182803(0x1b8)]()+this['colSpacing']())*this[_0x182803(0x237)]()+this['padding']*0x2;return Math['min'](_0x44c41a,Graphics[_0x182803(0x2c7)]);},Window_ChoiceList[_0x2d27b8(0x244)]['numVisibleRows']=function(){const _0x49dc9d=_0x2d27b8,_0x22567b=$gameMessage[_0x49dc9d(0x23d)]()[_0x49dc9d(0x154)](_0x35619a=>this[_0x49dc9d(0x278)](_0x35619a))[_0x49dc9d(0x2c5)](_0x3c4c6f=>this[_0x49dc9d(0x190)](_0x3c4c6f)),_0x2c9567=Math[_0x49dc9d(0x1c6)](_0x22567b['length']/this[_0x49dc9d(0x237)]());return Math[_0x49dc9d(0x9b)](0x1,Math[_0x49dc9d(0x312)](_0x2c9567,this[_0x49dc9d(0xb3)]()));},Window_ChoiceList[_0x2d27b8(0x244)][_0x2d27b8(0xb3)]=function(){const _0x26ce14=_0x2d27b8,_0x6bd791=this[_0x26ce14(0x10d)],_0x86e9bd=_0x6bd791?_0x6bd791['y']:0x0,_0x5e47a0=_0x6bd791?_0x6bd791[_0x26ce14(0x2dc)]:0x0,_0x4b4a49=Graphics[_0x26ce14(0x198)]/0x2;return _0x86e9bd<_0x4b4a49&&_0x86e9bd+_0x5e47a0>_0x4b4a49?0x4:$gameSystem[_0x26ce14(0x2ed)]();},Window_ChoiceList[_0x2d27b8(0x244)]['maxChoiceWidth']=function(){const _0xff79ac=_0x2d27b8;let _0x57d828=this[_0xff79ac(0x318)]();for(const _0x568778 of this[_0xff79ac(0x110)]){if(_0xff79ac(0x12c)==='UidqT')_0x211bec['y']+=_0x3f714c[_0xff79ac(0x2de)];else{const _0xa3d3cf=_0x568778['name'],_0x2dc934=this['getChoiceIndent'](_0xa3d3cf),_0x1fc8ab=this[_0xff79ac(0x277)](_0xa3d3cf)['width']+_0x2dc934,_0x18f892=Math[_0xff79ac(0x1c6)](_0x1fc8ab)+this['itemPadding']()*0x2;_0x57d828=Math[_0xff79ac(0x9b)](_0x57d828,_0x18f892);}}return _0x57d828;},Window_ChoiceList[_0x2d27b8(0x244)]['getStartingChoiceWidth']=function(){const _0x38a52f=_0x2d27b8;let _0x568db6=0x60;const _0x29d5cf=$gameMessage[_0x38a52f(0x23d)]();for(const _0x240ea7 of _0x29d5cf){_0x240ea7['match'](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x568db6=Math[_0x38a52f(0x9b)](_0x568db6,Number(RegExp['$1'])));}return _0x568db6;},Window_ChoiceList['prototype']['drawItem']=function(_0x1b6ad8){const _0x216ef6=_0x2d27b8,_0x1c206d=this[_0x216ef6(0x2be)](_0x1b6ad8),_0x10af48=$gameSystem[_0x216ef6(0x230)]()!==_0x216ef6(0x20f)?_0x216ef6(0x17a)[_0x216ef6(0x165)]($gameSystem[_0x216ef6(0x230)]()):'',_0x52c7a4=_0x10af48+this['commandName'](_0x1b6ad8);this[_0x216ef6(0x2c2)](this['isCommandEnabled'](_0x1b6ad8));const _0x3d267b=this['textSizeEx'](_0x52c7a4)[_0x216ef6(0x2dc)],_0x288f4d=_0x1c206d['x']+this[_0x216ef6(0x133)](_0x52c7a4),_0x24f1fe=Math[_0x216ef6(0x9b)](_0x1c206d['y'],_0x1c206d['y']+Math[_0x216ef6(0x204)]((_0x1c206d['height']-_0x3d267b)/0x2));this[_0x216ef6(0x1b1)](_0x52c7a4,_0x288f4d,_0x24f1fe,_0x1c206d[_0x216ef6(0x2c7)]);},Window_ChoiceList[_0x2d27b8(0x244)][_0x2d27b8(0x133)]=function(_0x56cfde){let _0x1c752b=0x0;return _0x56cfde['match'](/<CHOICE INDENT:[ ](\d+)>/gi)&&(_0x1c752b=Number(RegExp['$1'])),_0x1c752b;},Window_ChoiceList['prototype'][_0x2d27b8(0xac)]=function(){const _0x15a180=_0x2d27b8;$gameMessage[_0x15a180(0x266)](this['currentExt']()),this['_messageWindow'][_0x15a180(0x168)](),this[_0x15a180(0xbf)]();};function _0x38f1(){const _0x476aa8=['getMessageWindowXyOffsets','isMessageWindowWordWrap','NSuMF','updateOverlappingY','convertButtonAssistEscapeCharacters','addMessageCommonEvent','_pictureTextSprite','inBattle','sAIvt','updateNameBoxMove','_textDelay','_pictureTextWindow','name','_forcedPosition','Window_Message_processEscapeCharacter','_MessageCoreSettings','LMdZm','<LINE\x20BREAK>','textSpeedStatusText','DefaultOutlineWidth','ubNYD','lNnrq','<CENTER>','fontSize','splice','clearActorNameAutoColor','getChoiceListTextAlign','bWlPs','MessageTextDelay','_wholeMoveDuration','WAIT','Oyudd','gEkjE','maxCols','fontItalic','ocKOH','_pictureTextCache','convertMessageCoreEscapeReplacements','SortObjectByKeyLength','choices','registerActorNameAutoColorChanges','ARRAYFUNC','cancel','MsgWindowOffsetY','getTextAlignment','2152puoDgZ','prototype','zQxWb','_messageCommonEvents','States','setLastGainedItemData','push','false','parseChoiceText','mainFontSize','updatePlacement','clampPlacementPosition','OffsetY','TextColor','lastGainedObjectQuantity','jxHeT','convertBaseEscapeCharacters','_autoSizeCheck','BcBrf','fcqcK','Window_Message_terminateMessage','return\x200','CreateAutoColorFor','processStoredAutoColorChanges','xvENm','isWordWrapEnabled','updateRelativePosition','</B>','convertButtonAssistText','some','_nameBoxWindow','setWaitMode','clearPictureTextRefresh','\x1bITALIC[0]','_target','onChoice','RJCxt','center','indexOf','MaxRows','loadPicture','bitmap','dJNCm','members','convertMessageCoreEscapeActions','Padding','needsNewPage','isSceneBattle','preConvertEscapeCharacters','MWmoP','HIDE','statusText','textSizeEx','convertChoiceMacros','contentsBack','FDswk','MessageWindowXyOffsets','hEaMY','setupEvents','mkTSs','launchMessageCommonEvent','iconIndex','instantTextSpeed','Game_Party_gainItem','processCustomWait','move','isBreakShowTextCommands','messageWidth','Window_Base_initialize','VisuMZ_1_EventsMoveCore','constructor','ARRAYSTR','itemHeight','process_VisuMZ_MessageCore_TextMacros','_textMacroFound','addExtraShowChoices','synchronizeNameBox','Classes','AutoColorRegExp','preFlushTextState','resetRect','toLowerCase','PictureTextChange','map\x20actor','Instant','resizePictureText','getConfigValue','messageRows','setWordWrap','_subject','textSizeExRaw','_textDelayCount','_centerMessageWindow','Window_Message_newPage','addCommand','substring','MaxCols','textSizeExTextAlignment','addChildAt','Window_Options_changeVolume','YeJEE','RelativePXPY','yFkZi','KKhkp','getChoiceListLineHeight','stretchDimmerSprite','_pictureId','activate','Window_NameBox_refresh','isColorLocked','isArmor','processFsTextCode','resetPositionX','CreateAutoColorRegExpLists','\x1bTEXTALIGNMENT[0]','_positionType','MessageRows','getInputButtonString','QVacd','version','ptGeq','ParseArmorNotetags','postFlushTextState','itemRectWithPadding','GjfeN','Weapons','_moveDuration','changePaintOpacity','processWrapBreak','PICTURE','filter','WORD_WRAP_PADDING','width','NameBoxWindowOffsetY','processAutoPosition','chUAu','_commonEventId','szbVO','commandSymbol','addGeneralOptions','obtainEscapeParam','applyData','getPictureTextData','calcMoveEasing','type','makeFontSmaller','isChoiceEnabled','prepareForcedPositionEscapeCharacters','battleUserName','171752ljRMgu','exit','isHelpWindowWordWrap','processColorLock','height','_resetRect','startY','textColor','TextAlign','setMessageWindowRows','MessageWidth','easeIn','processPreviousColor','setupItemChoice','vteLo','_autoPosRegExp','MsgWindowOffsetX','TextSpeed','lRDdj','setChoiceListMaxColumns','2uMerJl','getChoiceListMaxRows','setupNumInput','getMessageWindowWidth','_autoSizeRegexp','Window_Options_statusText','ohFHG','hasPictureText','setPositionType','Match','\x1bCOLORLOCK[0]','ParseClassNotetags','obtainExp','processActorNameAutoColorChanges','pqsES','yjXeZ','updateEvents','_pictureTextBuffer','follower','_messageOffsetY','updateXyOffsets','FontSmallerCap','returnPreservedFontSettings','</LEFT>','WkiZg','gvTFS','ARRAYSTRUCT','setMessageWindowXyOffsets','759MtnUgr','battle\x20actor','BnJwB','faceName','oErAf','onDatabaseLoaded','rtl','erasePictureTextBuffer','Window_Base_processAllText','messageWindowRect','min','ITALIC','requestPictureTextRefresh','length','SWITCH','outputWidth','getStartingChoiceWidth','isItem','outputHeight','OqaQL','_lastGainedItemData','convertTextAlignmentEscapeCharacters','3240215oGvnYZ','startX','Game_Map_initialize','vpOQh','BEyPT','defeat','getPreservedFontSettings','textCodeResult','convertBackslashCharacters','setTextAlignment','ENABLE','inputtingAction','innerHeight','convertHardcodedEscapeReplacements','TextMacros','processMessageCoreEscapeActions','CommonEvent','outLineColor','refreshDimmerBitmap','processPxTextCode','createContents','prepareShowTextFollowups','\x1bBOLD[0]','CMjBX','ChoiceWindowLineHeight','Window_ChoiceList_windowX','_moveTargetHeight','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','1029235gDvNYn','ParseItemNotetags','processCharacter','Items','Game_System_initialize','shift','calcWindowHeight','TextColor%1','convertNewPageTextStateMacros','\x1bi[%1]%2','TEXTALIGNMENT','updatePictureText','lowerright','ParseWeaponNotetags','true','maxCommands','_showFast','ParseSkillNotetags','Window_Message_synchronizeNameBox','roOnd','messageCoreTextSpeed','updateDimensions','DiWVF','RwRTf','Enemies','Skills','PictureTextErase','processFontChangeItalic','vAGNY','lastGainedObjectName','addMessageCoreTextSpeedCommand','ConvertParams','canMove','clearFlags','refresh','ChoiceWindowMaxCols','ParseStateNotetags','levelUp','aZRUi','addLoadListener','exec','isContinuePrepareShowTextCommands','choiceRows','actor','makeDeepCopy','<BR>','lowerleft','update','parameters','initialize','ConvertTextAutoColorRegExpFriendly','convertTextMacros','updateOffsetPosition','clearAllPictureTexts','zScxI','choiceLineHeight','\x1bTEXTALIGNMENT[3]','getMessageWindowRows','TsAZx','max','messageCoreWindowX','messageWordWrap','processControlCharacter','FontBiggerCap','1008952RmEWGF','convertLockColorsEscapeCharacters','CreateAutoColorRegExpListEntries','_eventId','choiceCols','initTextAlignement','outlineWidth','processAutoSize','fontBold','setMessageWindowWordWrap','Undefined','pagedown','callOkHandler','battle\x20party','join','jJSju','addWrapBreakAfterPunctuation','_messageOffsetX','cFoGa','maxLines','sort','AddAutoColor','createTextState','\x1bTEXTALIGNMENT[2]','_moveTargetY','_moveEasingType','map\x20event','Sprite_Picture_update','lineHeight','choiceTextAlign','RicKt','close','slice','Window_Base_processControlCharacter','STRUCT','124396jJnNtg','AddOption','prepareWordWrapEscapeCharacters','processDrawCenteredPicture','Scene_Boot_onDatabaseLoaded','split','WordWrap','down','adjustShowChoiceDefault','emerge','changeTextColor','getPictureText','PictureIDs','jWAvb','TkndD','isSceneMap','setTextDelay','toUpperCase','changeVolume','addContinuousShowTextCommands','Default','start','battle\x20enemy','Game_Interpreter_setupChoices','AdjustRect','ARRAYJSON','convertShowChoiceEscapeCodes','databaseObjectName','OffsetX','VisuMZ_0_CoreEngine','clearPictures','_currentAutoSize','Width','textSpeed','setPictureTextBuffer','none','upperright','MessageCore','upperleft','drawBackCenteredPicture','LSwqs','Game_Screen_clearPictures','<LEFT>','_indent','Sprite_Picture_updateBitmap','Window_NameBox_updatePlacement','adjustShowChoiceCancel','newPage','processTextAlignmentChange','Window_Options_addGeneralOptions','faceWidth','updateAutoSizePosition','_messagePositionReset','SxNna','FUNC','ChoiceWindowProperties','isAutoColorAffected','setColorLock','_moveTargetX','easeInOut','Type','textSizeExWordWrap','process_VisuMZ_MessageCore_TextCodes_Action','item','Game_Map_refresh','[0]','text','_pictureTextRefresh','addedWidth','URvoL','innerWidth','helpWordWrap','ConfigManager_applyData','setPictureText','_messageWindow','postConvertEscapeCharacters','kByhn','_list','bind','list','right','clear','<B>','_autoPositionTarget','nextEventCode','_data','10jxtVcO','Rddsj','xrOye','CmNmi','_pictureText','_textColorStack','windowWidth','obtainEscapeString','description','NvUft','TDQBk','flushTextState','return\x20\x27','substr','parse','EndPadding','test','TightWrap','suLCY','GGAgn','cVcfy','aarJB','\x1bCOLORLOCK[1]','updateMessageCommonEvents','<I>','processNewLine','getChoiceIndent','setBackground','paintOpacity','updateForcedPlacement','\x1bTEXTALIGNMENT[1]','ParseEnemyNotetags','fMRON','Window_Message_isTriggered','_colorLock','Game_Screen_erasePicture','setMessageWindowWidth','PictureTextRefresh','Game_Map_updateEvents','quantity','isTriggered','setChoiceListLineHeight','getLastGainedItemData','realPictureId','pwxej','_refreshPauseSign','drawing','makeCommandList','battleActionName','AjjYp','remove','_relativePosition','PtWCZ','_pictures','_targets','_index','NameBoxWindowOffsetX','processDrawPicture','convertFontSettingsEscapeCharacters','map','BGvjg','eVLFv','_pictureTextWidth','actorName','isPressed','processEscapeCharacter','process_VisuMZ_MessageCore_TextCodes_Replace','getChoiceListMaxColumns','status','attachPictureText','applyMoveEasing','obtainItem','ROLaX','changeTextSpeed','processCommonEvent','TextCodeReplace','format','Name','onProcessCharacter','terminateMessage','ARRAYNUM','Window_Help_refresh','TextManager_message','initMessageCore','autoPositionOffsetX','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','event','padding','updateMove','contents','updateAutoPosition','TextStr','_pictureTextHeight','anchor','_moveTargetWidth','setChoiceListTextAlign','setupChoices','<%1>','setChoiceListMaxRows','currentCommand','NLBOV','isRTL','autoPositionOffsetY','Actors','ARRAYEVAL','code','27BJujwA','normalColor','preemptive','_dimmerSprite','getPictureTextBuffer','resetTextColor','STR','Window_Base_processEscapeCharacter','trim','AutoColor','(((','_macroBypassWordWrap','clamp','isChoiceVisible','TextJS','General','convertVariableEscapeCharacters','processTextAlignmentX','victory','index','adjustShowChoiceExtension','boxHeight','BINQa','map\x20player','drawPictureText','processPyTextCode','replace','<WORDWRAP>','includes','pVzic','addMessageCoreCommands',')))','clearCommandList','\x1bI[%1]','visible','ParseAllNotetags','selectDefault','Scene_Options_maxCommands','placeCancelButton','value','isInputting','Window_Base_update','anyPictureTextChanges','updateBackground','pfHtC','message','drawTextEx','maxFontSizeInLine','updateTransform','_scene','COMMONEVENT','\x1bC[%1]%2\x1bPREVCOLOR[0]','PREVCOLOR','maxChoiceWidth','Window_Base_processNewLine','process_VisuMZ_MessageCore_AutoColor','isRunning','processAllText','_wordWrap','gainItem','FontChangeValue','Window_ChoiceList_updatePlacement','changeValue','contentsHeight','Window_Message_clearFlags','textCodeCheck','HTSVB','ceil','match','1055490CWXjxB','Window_Message_needsNewPage','call','moveBy','prepareAutoSizeEscapeCharacters','makeFontBigger','HelpWindow','SHOW','<COLORLOCK>','_texts','FastForwardKey','Settings','\x1bBOLD[1]','Rows','\x1bWrapBreak[0]','_textAlignment','anchorPictureText','addedHeight','LineHeight','fJADZ','bZLKB','updateBitmap','_spriteset','_interpreter','requestPictureTextRefreshAll','DISABLE','erasePicture','registerCommand','left','eraseAllPictureTexts','TextCodeActions','easeOut','JSON','battleTargetName','moveTo','SWITCHES','prepareShowTextCommand','applyDatabaseAutoColor','followers','vvDNb','\x1bITALIC[1]','drawPictureTextZone','boxWidth','Armors','isVolumeSymbol','</RIGHT>','rhoti','processFontChangeBold','resetFontSettings','Game_Map_setupEvents','setFaceImage','command101','open','CENTERPICTURE','kHhIR','ParseAddedText','kciiA','windowPadding','escapeStart','Game_Party_initialize','round','floor','_autoColorActorNames','registerSelfEvent','startWait','Window_Base_changeTextColor','ChoiceWindowTextAlign','setRelativePosition','drawBackPicture','Window_Message_updatePlacement','resetWordWrap','default','</COLORLOCK>','blt','</WORDWRAP>','processAutoColorWords','isWeapon','Window_Base_textSizeEx'];_0x38f1=function(){return _0x476aa8;};return _0x38f1();}