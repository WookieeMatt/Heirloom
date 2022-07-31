//=============================================================================
// VisuStella MZ - Visual Novel Picture Busts
// VisuMZ_2_VNPictureBusts.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_VNPictureBusts = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VNPictureBusts = VisuMZ.VNPictureBusts || {};
VisuMZ.VNPictureBusts.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.02] [VNPictureBusts]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Novel_Picture_Busts_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin enables the game engine to use Pictures (normally available
 * event commands like "Show Picture" and "Move Picture") as Picture Busts,
 * similar to those seen in Visual Novels. These Picture Busts are given a
 * plethora of Plugin Commands to utilize and control them in ways to help
 * create narratives amongst characters akin to Visual Novels. The Plugin
 * Commands will also help streamline and remove the more tedious aspects of
 * trying to recreate a similar bust system with vanilla RPG Maker MZ.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Streamlined Plugin Commands to allow for commonly seen Picture Bust usage
 *   commonly found in Visual Novel genre-type games.
 * * Quickly Enter/Exit busts with Plugin Commands with a structure based
 *   around simplified screen positioning rather than exact coordinates.
 * * Change Picture Bust graphics without needing to fiddle with any other
 *   property for quicker switching between expressions or poses.
 * * Mirror, unmirror, or simply flip one direction to another for Picture
 *   Busts with ease without altering any other property.
 * * Fade in, fade out, or fade to exact opacity amounts without needing to
 *   alter any other property.
 * * Play Battle Animations on Picture Busts. Normally, Battle Animations would
 *   appear behind pictures, but this plugin creates specially effects to allow
 *   for them to play on top of the Picture Busts themselves.
 * * Move Picture Busts around relatively or to exact coordinates or using the
 *   plugin's predetermined positions in a streamlined fashion.
 * * Scale Picture Busts to enlarge them or shrink them while keeping other
 *   properties intact and untouched.
 * * Alter tones/tints for the Picture Busts in order to portray an active,
 *   passive, or normal effect.
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
 * Quick Understanding on How Busts Work
 * ============================================================================
 * 
 * These are some tidbits on how Picture Busts work.
 *
 * ---
 * 
 * Busts Face Left
 * 
 * This plugin is made under the assumption that the Picture Busts are normally
 * facing left in their raw form. This is to match RPG Maker MZ's "Pictures" of
 * actors and to allow for more user familiarity with how Busts work.
 * 
 * Naturally, you can reverse everything as long as you adjust the settings
 * properly in this plugin's Plugin Parameters.
 * 
 * ---
 *
 * Busts are Pictures
 * 
 * "Busts" in this plugin are mechanically Pictures in RPG Maker MZ. The
 * properties that Pictures and Busts share are one and the same. This means
 * that you can control Pictures with this plugin's Bust-centric commands and
 * you can control Busts with "Move Picture", "Rotate Picture", "Tint Picture",
 * and "Erase Picture" event commands.
 * 
 * Naturally, this also means that any Picture of Bust that hasn't been made
 * available through the "Show Picture" event command or "BASIC: Enter Bust(s)"
 * Plugin Command won't be able to use either event commands or Plugin Commands
 * related to the Picture/Bust manipulation.
 *
 * ---
 *
 * Picture ID's Matter for Busts
 * 
 * Picture ID's matter when selecting them for Busts. Picture ID's with a lower
 * number will appear further in the "back" behind other Pictures/Busts while
 * Picture ID's with a higher number will appear more on "top".
 * 
 * It makes no difference if the object was formed as a Picture or as a Bust
 * first. The layer system is still intact.
 *
 * ---
 *
 * Specialized Bust Origin/Anchor
 * 
 * Pictures have two Origin/Anchor modes: "Upper Left" or "Center". The Origin
 * refers to the point in which the picture marks and aligns itself with based
 * on the coordinates it's given.
 * 
 * If you are using "Upper Left", then the Picture's X and Y will indicate that
 * the Picture's Upper Left corner of the image will be at X and Y. If you are
 * using "Center", then that means the Picture's X and Y will indicate that
 * the Picture's Center point of the image will be at X and Y.
 * 
 * Busts have a unique Origin/Anchor that can be setup in the Plugin Parameters
 * and it normally defaults to "Center Bottom", aka Anchor X value of 0.5 and
 * Anchor Y value of 1.0. The "Bust" Anchor works best with Busts because it
 * allows for the natural manipulation of busts relative to the bottom of the
 * screen position.
 * 
 * As mentioned before, this can be modified in the Plugin Parameters. We don't
 * recommend changing it unless you know what you're doing.
 *
 * ---
 * 
 * Predetermined Positioning
 * 
 * Messing with exact coordinates is messy and extremely inefficient when
 * working with them for a long enough time. This plugin offers a Predetermined
 * Position coordinate system, to which, the rest of the plugin will refer to
 * as "Positions" for short.
 * 
 * There are 11 Positions available through this plugin, one for each number
 * between 0 and 10. These Positions start on the left side of the screen and
 * go towards the right, with a 200 pixel buffer from the edges. They are also
 * aligned at the bottom of the screen.
 * 
 * In other words, something like this:
 * 
 * +--------+--------------------------------------------------------+--------+
 * |        |                                                        |        |
 * |        |                        Screen                          |        |
 * |<------>|                                                        |<------>|
 * |        |                                                        |        |
 * |  200   |                                                        |  200   |
 * | Pixel  |                                                        | Pixel  |
 * | Buffer |                                                        | Buffer |
 * |        |                                                        |        |
 * |<------>|                                                        |<------>|
 * |        |                                                        |        |
 * |  200   |                                                        |  200   |
 * | Pixel  |                                                        | Pixel  |
 * | Buffer |                                                        | Buffer |
 * |        |                      Positions                         |        |
 * |<------>|                                                        |<------>|
 * |        0    1    2    3     4     5     6     7     8     9    10        |
 * |        |                                                        |        |
 * +--------+--------------------------------------------------------+--------+
 * 
 * These Positions can be changed in the Plugin Parameters if you understand
 * JavaScript code. If you do not, we do NOT recommend tinkering with it.
 * 
 * This means if the Position 0 is used, the Picture Bust will appear centered
 * at the bottom of the far left side of the screen with a 200 distance buffer.
 * If the Position 5 is used, the Picture Bust will appear at the center bottom
 * of the screen. If the Position 8 is used, the Picture Bust will appear about
 * 3/4ths the way across the screen from the left.
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
 * === Basic-Bust Plugin Commands ===
 * 
 * ---
 *
 * BASIC: Enter Bust
 * - Generic entrance for ONE picture bust.
 * - Walks in from a little behind and fades in.
 *
 *   Picture ID:
 *   - What is the Picture ID to associate with this bust?
 *   - You may use JavaScript code.
 *
 *     Picture File:
 *     - What picture file do you wish to use?
 *
 *     Origin:
 *     - What kind of origin setting do you wish to use for this bust?
 *     - Upper Left
 *     - Center
 *     - Bust
 *
 *   Screen Position:
 *   - Insert a screen position value from 0 to 10.
 *   - Coordinates are determined by Plugin Parameters.
 *   - Refer to "Quick Understanding on How Busts Work" to understand how
 *     "Predetermined Positioning" positioning works by default.
 *
 *     Start Offset X:
 *     - What starting position to enter the bust from?
 *     - Negative: behind; Positive: front.
 *     - You may use JavaScript.
 *
 *     Start Offset Y:
 *     - What starting position to enter the bust from?
 *     - Negative: up; Positive: down.
 *     - You may use JavaScript.
 *
 *     Entrance Easing:
 *     - Select which easing type you wish to apply.
 *
 *   Horizontal Mirror:
 *   - Apply horizontal mirroring for this bust?
 *     - None
 *     - Mirror
 *     - Auto
 *     - Auto-Reverse
 *
 *   Duration:
 *   - Duration in frames for the bust entrance.
 *
 * ---
 *
 * BASIC: Exit Bust(s)
 * - Generic exit for picture bust(s).
 * - Walks back and fades out.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     End Offset X:
 *     - What end position to exit the bust to?
 *     - Negative: behind; Positive: front.
 *     - You may use JavaScript.
 *
 *     End Offset Y:
 *     - What end position to exit the bust to?
 *     - Negative: up; Positive: down.
 *     - You may use JavaScript.
 *
 *     Exit Easing:
 *     - Select which easing type you wish to apply.
 *
 *     Flip Direction:
 *     - Flip direction when exiting?
 *
 *   Duration:
 *   - Duration in frames for the bust exit.
 *
 *   Auto-Erase?:
 *   - Automatically erase the bust(s) after fading out completely?
 *
 * ---
 *
 * BASIC: Graphic Change
 * - Changes ONE bust's graphic without changing any of its other properties.
 * - Useful for quickly changing facial expressions or poses.
 *
 *   Picture ID:
 *   - What is the Picture ID to associate with this bust?
 *   - You may use JavaScript code.
 *
 *   Picture File:
 *   - What picture file do you wish to use?
 *
 * ---
 *
 * BASIC: Mirror Bust(s)
 * - Change the facing direction the bust(s).
 * - This alters the horizontal scaling of the bust(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Horizontal Mirror:
 *   - How do you wish to affect the mirroring for the bust(s)?
 *     - None
 *     - Mirror
 *     - Auto
 *     - Auto-Reverse
 *     - Toggle
 *
 * ---
 *
 * BASIC: Origin Change Bust(s)
 * - Change the origin/anchor for bust(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Origin:
 *     - Pick what kind of origin setting to use for this bust?
 *     - "Bust" value is based on Plugin Parameters.
 *       - Upper Left
 *       - Center
 *       - Bust
 *
 *   Duration:
 *   - Duration in frames for the origin change.
 *
 * ---
 *
 * BASIC: Play Animation on Bust(s)
 * - Plays a specific battle animation on bust(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Battle Animation ID:
 *     - Select which battle animation to play on bust.
 *
 *       Mirror Animation?:
 *       - Mirror the animation effect?
 *
 *   Wait For Animation?:
 *   - Wait until the animation is finished before continuing?
 *
 * ---
 * 
 * === Breathing Plugin Commands ===
 * 
 * ---
 * 
 * BREATHING: Start
 * - Starts breathing aspect for selected bust(s).
 * - Makes it look like the bust graphic is more alive.
 * 
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 * 
 *   Speed:
 * 
 *     Speed X:
 *     Speed Y:
 *     - Speed used for the horizontal/vertical breathing cycle.
 *     - Higher is slower.
 *     - You may use JavaScript.
 * 
 *   Rate:
 * 
 *     Rate X:
 *     Rate Y:
 *     - Rate used for the horizontal/vertical breathing cycle.
 *     - Determines change amount.
 *     - You may use JavaScript.
 * 
 * ---
 * 
 * BREATHING: Stop
 * - Stops breathing aspect for selected bust(s).
 * - The bust graphic becomes static.
 * 
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Fade-Bust Plugin Commands ===
 * 
 * ---
 *
 * FADE: Fade In Bust(s)
 * - Brings selected picture bust(s) opacity levels to 255.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for the bust fade in.
 *
 * ---
 *
 * FADE: Fade Out Bust(s)
 * - Brings selected picture bust(s) opacity levels to 0.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for the bust fade out.
 *
 *     Auto-Erase?:
 *     - Automatically erase the bust(s) after fading out completely?
 *
 * ---
 *
 * FADE: Opacity By X, Bust(s)
 * - Adjusts selected picture bust(s) opacity levels relatively.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Adjust Opacity:
 *   - Adjust opacity value of pictures by this amount.
 *   - Negative: Lower, Positive: Higher.
 *   - You may use JavaScript.
 *
 *   Duration:
 *   - Duration in frames for the bust fading.
 *
 * ---
 *
 * FADE: Opacity To X, Bust(s)
 * - Brings selected picture bust(s) opacity levels to a custom value.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Target Opacity:
 *   - What opacity value do you wish to adjust the bust to?
 *   - Use a value between 0 and 255.
 *
 *   Duration:
 *   - Duration in frames for the bust fading.
 *
 * ---
 * 
 * === Fidgeting Plugin Commands ===
 * 
 * ---
 * 
 * FIDGETING: Start
 * - Starts fidgeting aspect for selected bust(s).
 * - Bust graphic moves back and forth.
 * 
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 * 
 *   Speed:
 * 
 *     Speed X:
 *     Speed Y:
 *     - Speed used for the horizontal/vertical fidgeting cycle.
 *     - Higher is slower.
 *     - You may use JavaScript.
 * 
 *   Distance:
 * 
 *     Distance X:
 *     Distance Y:
 *     - Max distance used for the horizontal/vertical fidgeting cycle.
 *     - Determines change amount.
 *     - You may use JavaScript.
 * 
 * ---
 * 
 * FIDGETING: Stop
 * - Stops fidgeting aspect for selected bust(s).
 * - The bust graphic becomes stationary.
 * 
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Movement-Bust Plugin Commands ===
 * 
 * ---
 *
 * MOVE: Move Bust(s) By Coordinates
 * - Move bust(s) relative to current coordinates(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Move By X:
 *     - Negative: left; Positive: right; "Unchanged" for none.
 *     - You may use JavaScript.
 *
 *     Move By Y:
 *     - Negative: up; Positive: down; "Unchanged" for none.
 *     - You may use JavaScript.
 *
 *     Move Easing:
 *     - Select which easing type you wish to apply.
 *
 *   Flip Direction:
 *   - Flip direction when moving?
 *
 *   Duration:
 *   - Duration in frames for the bust movement.
 *
 * ---
 *
 * MOVE: Move Bust(s) By Position
 * - Move bust(s) relative to current position(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Move By Position:
 *     - Negative: left; Positive: right; "Unchanged" for none.
 *     - You may use JavaScript.
 *     - Results between 0 and 10.
 *
 *     Move Easing:
 *     - Select which easing type you wish to apply.
 *
 *   Flip Direction:
 *   - Flip direction when moving?
 *
 *   Duration:
 *   - Duration in frames for the bust movement.
 *
 * ---
 *
 * MOVE: Move Bust(s) to Coordinates
 * - Move bust(s) to exact coordinates(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Target X:
 *     - Target X coordinate.
 *     - "Unchanged" for no changes.
 *     - You may use JavaScript.
 *
 *     Target Y:
 *     - Target Y coordinate.
 *     - "Unchanged" for no changes.
 *     - You may use JavaScript.
 *
 *     Move Easing:
 *     - Select which easing type you wish to apply.
 *
 *   Flip Direction:
 *   - Flip direction when moving?
 *
 *   Duration:
 *   - Duration in frames for the bust movement.
 *
 * ---
 *
 * MOVE: Move Bust(s) to Position
 * - Move bust(s) to the predetermined position.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Target Position:
 *     - Target predetermined position from 0 to 10.
 *     - You may use JavaScript.
 *
 *     Move Easing:
 *     - Select which easing type you wish to apply.
 *
 *   Flip Direction:
 *   - Flip direction when moving?
 *
 *   Duration:
 *   - Duration in frames for the bust movement.
 *
 * ---
 *
 * MOVE: Reset Bust(s) to Position
 * - Reset bust(s) to the current position(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Move Easing:
 *     - Select which easing type you wish to apply.
 *
 *   Flip Direction:
 *   - Flip direction when moving?
 *
 *   Duration:
 *   - Duration in frames for the bust movement.
 *
 * ---
 * 
 * === Scaling-Bust Plugin Commands ===
 * 
 * ---
 *
 * SCALE: Scale Bust(s) By
 * - Scale bust(s) by specific amounts.
 * - Value scale: 100 = 100% = 1.0
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Scale X By:
 *     - Alter (additively) the X scaling value by this.
 *     - You may use JavaScript.
 *
 *     Scale Y By:
 *     - Alter (additively) the Y scaling value by this.
 *     - You may use JavaScript.
 *
 *   Duration:
 *   - Duration in frames for the bust scaling.
 *
 * ---
 *
 * SCALE: Scale Bust(s) To
 * - Scale bust(s) to specific values.
 * - Value scale: 100 = 100% = 1.0
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Scale X By:
 *     - Set X scaling value to this.
 *     - You may use JavaScript.
 *     - "Unchanged" for no changes.
 *
 *     Scale Y By:
 *     - Set Y scaling value to this.
 *     - You may use JavaScript.
 *     - "Unchanged" for no changes.
 *
 *   Duration:
 *   - Duration in frames for the bust scaling.
 *
 * ---
 *
 * SCALE: Scale Reset Bust(s)
 * - Resets the scale for bust(s) to the default settings in the
 *   Plugin Parameters.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for the bust scaling.
 *
 * ---
 * 
 * === Swaying Plugin Commands ===
 * 
 * ---
 * 
 * SWAYING: Start
 * - Starts swaying aspect for selected bust(s).
 * - Bust graphic moves back and forth.
 * 
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 * 
 *   Speed:
 * 
 *     Angle Speed:
 *     - Speed used for the swaying cycle.
 *     - Higher is slower.
 *     - You may use JavaScript.
 * 
 *   Angle:
 * 
 *     Angle Sway:
 *     - Max angle used for the swaying cycle.
 *     - Determines change amount.
 *     - You may use JavaScript.
 * 
 * ---
 * 
 * SWAYING: Stop
 * - Stops swaying aspect for selected bust(s).
 * - The bust graphic becomes stationary.
 * 
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Tone/Tint-Bust Plugin Commands ===
 * 
 * ---
 *
 * TONE: Bright Bust(s)
 * - Brighten bust(s) to use the Tone settings found in the Plugin Parameters.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for the tone change.
 *
 * ---
 *
 * TONE: Dim Bust(s)
 * - Dims bust(s) to use the Tone settings found in the Plugin Parameters.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for the tone change.
 *
 * ---
 *
 * TONE: Normal Bust(s)
 * - Normalize bust(s) to no tone at all.
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for the tone change.
 *
 * ---
 *
 * TONE: Preset Tone for Bust(s)
 * - Use RPG Maker MZ's present tones/tints for bust(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Preset Name:
 *     - What tone preset do you wish to apply?
 *       - Normal
 *       - Dark
 *       - Sepia
 *       - Sunset
 *       - Night
 *
 *   Duration:
 *   - Duration in frames for the tone change.
 *
 * ---
 *
 * TONE: Target Tone for Bust(s)
 * - Use a custom target tone for the bust(s).
 *
 *   Picture ID(s):
 *   - What Picture ID(s) to associate with this command?
 *   - You may use JavaScript code.
 *
 *     Custom Tone:
 *     - What tone do you want for the bust(s)?
 *     - Format: [Red, Green, Blue, Gray]
 *
 *   Duration:
 *   - Duration in frames for the tone change.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings that govern the default values pertaining to
 * the Picture Busts used by this Plugin.
 *
 * ---
 *
 * Anchor Settings
 * 
 *   Anchor X:
 *   - Determines the anchor/origin X setting for Picture Busts.
 *   - 0.0 is left, 0.5 is center, 1.0 is right.
 * 
 *   Anchor Y:
 *   - Determines the anchor/origin Y setting for Picture Busts.
 *   - 0.0 is left, 0.5 is center, 1.0 is right.
 *
 * ---
 *
 * Scale Settings
 * 
 *   Scale X:
 *   - Scale X adjustment settings for Picture Busts.
 *   - Value scale: 100 = 100% = 1.0
 * 
 *   Scale Y:
 *   - Scale Y adjustment settings for Picture Busts.
 *   - Value scale: 100 = 100% = 1.0
 * 
 *   Mirror Horizontally:
 *   - Which positions will be mirrored horizontally?
 *   - You want your Busts facing the center of the screen.
 *   - This treats Busts as if they
 *
 * ---
 *
 * Screen Positioning
 * 
 *   JS: Position X:
 *   - Code to determine used to calculate the X coordinate for each
 *     screen position.
 *   - Refer to "Quick Understanding on How Busts Work" to understand how
 *     "Predetermined Positioning" positioning works by default.
 * 
 *   JS: Position Y:
 *   - Code to determine used to calculate the Y coordinate for each
 *     screen position.
 *   - Refer to "Quick Understanding on How Busts Work" to understand how
 *     "Predetermined Positioning" positioning works by default.
 *
 * ---
 *
 * Tone
 * 
 *   Bright Tone:
 *   - What tone do you want for brightness?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Dim Tone:
 *   - What tone do you want for dimming?
 *   - Format: [Red, Green, Blue, Gray]
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
 * Version 1.02: July 14, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Plugin Parameter "JS: Position Y" default value changed to have a +5
 *    offset for better visual compatibility with Swaying feature.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** BREATHING: Start
 * *** BREATHING: Stop
 * **** Starts/stops breathing aspect for selected bust(s). Breathing makes it
 *      look like the bust graphic is more alive.
 * *** FIDGETING: Start
 * *** FIDGETING: Stop
 * **** Starts/stops fidgeting aspect for selected bust(s). Bust graphic moves
 *      back and forth.
 * *** SWAYING: Start
 * *** SWAYING: Stop
 * **** Starts/stops swaying aspect for selected bust(s). The bust sways its
 *      angle back and forth.
 * 
 * Version 1.01: December 9, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00 Official Release Date: December 6, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Basic
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Basic
 * @text Category - Basic
 * @desc These are basic Picture Bust Plugin Commands.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Basic_EnterBust
 * @text BASIC: Enter Bust
 * @desc Generic entrance for ONE picture bust.
 * Walks in from a little behind and fades in.
 * 
 * @arg PictureID:eval
 * @text Picture ID
 * @desc What is the Picture ID to associate with this bust?
 * You may use JavaScript code.
 * @default 1
 * 
 * @arg PictureName:str
 * @text Picture File
 * @parent PictureID:eval
 * @type file
 * @dir img/pictures/
 * @desc What picture file do you wish to use?
 * @default >>>ATTENTION<<<
 * 
 * @arg Origin:str
 * @text Origin
 * @parent PictureID:eval
 * @type select
 * @option Upper Left
 * @option Center
 * @option Bust
 * @desc What kind of origin setting do you wish to use for this bust?
 * @default Bust
 * 
 * @arg Position:num
 * @text Screen Position
 * @type number
 * @max 10
 * @desc Insert a screen position value from 0 to 10.
 * Coordinates are determined by Plugin Parameters.
 * @default 0
 * 
 * @arg StartOffsetX:eval
 * @text Start Offset X
 * @parent Position:num
 * @desc What starting position to enter the bust from?
 * Negative: behind; Positive: front. You may use JavaScript.
 * @default -200
 * 
 * @arg StartOffsetY:eval
 * @text Start Offset Y
 * @parent Position:num
 * @desc What starting position to enter the bust from?
 * Negative: up; Positive: down. You may use JavaScript.
 * @default +0
 *
 * @arg EasingType:str
 * @text Entrance Easing
 * @parent Position:num
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutSine
 *
 * @arg HorzMirror:str
 * @text Horizontal Mirror
 * @type select
 * @option None
 * @option Mirror
 * @option Auto
 * @option Auto-Reverse
 * @desc Apply horizontal mirroring for this bust?
 * @default Auto
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust entrance.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Basic_ExitBusts
 * @text BASIC: Exit Bust(s)
 * @desc Generic exit for picture bust(s).
 * Walks back and fades out.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg EndOffsetX:eval
 * @text End Offset X
 * @parent PictureID:arrayeval
 * @desc What end position to exit the bust to?
 * Negative: behind; Positive: front. You may use JavaScript.
 * @default -200
 * 
 * @arg EndOffsetY:eval
 * @text End Offset Y
 * @parent PictureID:arrayeval
 * @desc What end position to exit the bust to?
 * Negative: up; Positive: down. You may use JavaScript.
 * @default +0
 *
 * @arg EasingType:str
 * @text Exit Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc Flip direction when exiting?
 * @default None
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust exit.
 * @default 20
 *
 * @arg AutoErase:eval
 * @text Auto-Erase?
 * @parent Duration:eval
 * @type boolean
 * @on Auto-Erase
 * @off Don't Erase
 * @desc Automatically erase the bust(s) after fading out completely?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Basic_GraphicChange
 * @text BASIC: Graphic Change
 * @desc Changes ONE bust's graphic without changing any of its other
 * properties. Useful for quickly changing facial expressions.
 * 
 * @arg PictureID:eval
 * @text Picture ID
 * @desc What is the Picture ID to associate with this bust?
 * You may use JavaScript code.
 * @default 1
 * 
 * @arg PictureName:str
 * @text Picture File
 * @type file
 * @dir img/pictures/
 * @desc What picture file do you wish to use?
 * @default >>>ATTENTION<<<
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Basic_MirrorBust
 * @text BASIC: Mirror Bust(s)
 * @desc Change the facing direction the bust(s).
 * This alters the horizontal scaling of the bust(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg HorzMirror:str
 * @text Horizontal Mirror
 * @type select
 * @option None
 * @option Mirror
 * @option Auto
 * @option Auto-Reverse
 * @option Toggle
 * @desc How do you wish to affect the mirroring for the bust(s)?
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Basic_OriginChange
 * @text BASIC: Origin Change Bust(s)
 * @desc Change the origin/anchor for bust(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Origin:str
 * @text Origin
 * @parent PictureID:eval
 * @type select
 * @option Upper Left
 * @option Center
 * @option Bust
 * @desc Pick what kind of origin setting to use for this bust?
 * "Bust" value is based on Plugin Parameters.
 * @default Bust
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the origin change.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Basic_PlayAniBust
 * @text BASIC: Play Animation on Bust(s)
 * @desc Plays a specific battle animation on bust(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg AnimationID:num
 * @text Battle Animation ID
 * @parent PictureID:arrayeval
 * @type animation
 * @desc Select which battle animation to play on bust.
 * @default 1
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent AnimationID:num
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation effect?
 * @default false
 *
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until the animation is finished before continuing?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Breathing
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Breathing
 * @text Category - Breathing
 * @desc These are breathing related Picture Plugin Commands.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Breathing_Enable
 * @text BREATHING: Start
 * @desc Start breathing aspect for selected bust(s).
 * Makes it look like the bust graphic is more alive.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Speed
 * 
 * @arg SpeedX:eval
 * @text Speed X
 * @parent Speed
 * @desc Speed used for the horizontal breathing cycle.
 * Higher is slower. You may use JavaScript.
 * @default 20
 * 
 * @arg SpeedY:eval
 * @text Speed Y
 * @parent Speed
 * @desc Speed used for the vertical breathing cycle.
 * Higher is slower. You may use JavaScript.
 * @default 30
 * 
 * @arg Rate
 * 
 * @arg RateX:eval
 * @text Rate X
 * @parent Rate
 * @desc Rate used for the horizontal breathing cycle.
 * Determines change amount. You may use JavaScript.
 * @default 0.10
 * 
 * @arg RateY:eval
 * @text Rate Y
 * @parent Rate
 * @desc Rate used for the vertical breathing cycle.
 * Determines change amount. You may use JavaScript.
 * @default 0.80
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Breathing_Disable
 * @text BREATHING: Stop
 * @desc Stops breathing aspect for selected bust(s).
 * The bust graphic becomes static.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Fade
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Fade
 * @text Category - Fade
 * @desc These are fading related Picture Plugin Commands.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Fade_FadeIn
 * @text FADE: Fade In Bust(s)
 * @desc Brings selected picture bust(s) opacity levels to 255.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust fade in.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Fade_FadeOut
 * @text FADE: Fade Out Bust(s)
 * @desc Brings selected picture bust(s) opacity levels to 0.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust fade out.
 * @default 20
 *
 * @arg AutoErase:eval
 * @text Auto-Erase?
 * @parent Duration:eval
 * @type boolean
 * @on Auto-Erase
 * @off Don't Erase
 * @desc Automatically erase the bust(s) after fading out completely?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Fade_OpacityBy
 * @text FADE: Opacity By X, Bust(s)
 * @desc Adjusts selected picture bust(s) opacity levels relatively.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg AdjustOpacity:eval
 * @text Adjust Opacity
 * @desc Adjust opacity value of pictures by this amount.
 * Negative: Lower, Positive: Higher. You may use JavaScript.
 * @default +50
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust fading.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Fade_OpacityTo
 * @text FADE: Opacity To X, Bust(s)
 * @desc Brings selected picture bust(s) opacity levels to a custom value.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg TargetOpacity:num
 * @text Target Opacity
 * @desc What opacity value do you wish to adjust the bust to?
 * Use a value between 0 and 255.
 * @type number
 * @min 0
 * @max 255
 * @default 128
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust fading.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Fidgeting
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Fidgeting
 * @text Category - Fidgeting
 * @desc These are fidgeting related Picture Plugin Commands.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Fidgeting_Enable
 * @text FIDGETING: Start
 * @desc Starts fidgeting aspect for selected bust(s).
 * Bust graphic moves back and forth.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Speed
 * 
 * @arg SpeedX:eval
 * @text Speed X
 * @parent Speed
 * @desc Speed used for the horizontal fidgeting cycle.
 * Higher is slower. You may use JavaScript.
 * @default 30
 * 
 * @arg SpeedY:eval
 * @text Speed Y
 * @parent Speed
 * @desc Speed used for the vertical fidgeting cycle.
 * Higher is slower. You may use JavaScript.
 * @default 30
 * 
 * @arg Rate
 * @text Distance
 * 
 * @arg RateX:eval
 * @text Distance X
 * @parent Rate
 * @desc Max distance used for the horizontal fidgeting cycle.
 * Determines change amount. You may use JavaScript.
 * @default 5.00
 * 
 * @arg RateY:eval
 * @text Distance Y
 * @parent Rate
 * @desc Max distance used for the vertical fidgeting cycle.
 * Determines change amount. You may use JavaScript.
 * @default 0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Fidgeting_Disable
 * @text FIDGETING: Stop
 * @desc Stops fidgeting aspect for selected bust(s).
 * The bust graphic becomes stationary.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Move
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Move
 * @text Category - Movement
 * @desc These are movement-related Picture Bust Plugin Commands.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Move_MoveByCoordinates
 * @text MOVE: Move Bust(s) By Coordinates
 * @desc Move bust(s) relative to current coordinates(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg MoveX:str
 * @text Move By X
 * @parent PictureID:arrayeval
 * @desc Negative: left; Positive: right; "Unchanged" for none.
 * You may use JavaScript.
 * @default +100
 * 
 * @arg MoveY:str
 * @text Move By Y
 * @parent PictureID:arrayeval
 * @desc Negative: up; Positive: down; "Unchanged" for none.
 * You may use JavaScript.
 * @default Unchanged
 *
 * @arg EasingType:str
 * @text Move Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc Flip direction when moving?
 * @default None
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust movement.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Move_MoveByPosition
 * @text MOVE: Move Bust(s) By Position
 * @desc Move bust(s) relative to current position(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg MovePosition:eval
 * @text Move By Position
 * @parent PictureID:arrayeval
 * @desc Negative: left; Positive: right; "Unchanged" for none.
 * You may use JavaScript. Results between 0 and 10.
 * @default +1
 *
 * @arg EasingType:str
 * @text Move Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc Flip direction when moving?
 * @default None
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust movement.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Move_MoveToCoordinates
 * @text MOVE: Move Bust(s) to Coordinates
 * @desc Move bust(s) to exact coordinates(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg TargetX:str
 * @text Target X
 * @parent PictureID:arrayeval
 * @desc Target X coordinate. "Unchanged" for no changes.
 * You may use JavaScript.
 * @default Graphics.width / 2
 * 
 * @arg TargetY:str
 * @text Target Y
 * @parent PictureID:arrayeval
 * @desc Target Y coordinate. "Unchanged" for no changes.
 * You may use JavaScript.
 * @default Unchanged
 *
 * @arg EasingType:str
 * @text Move Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc Flip direction when moving?
 * @default None
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust movement.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Move_MoveToPosition
 * @text MOVE: Move Bust(s) to Position
 * @desc Move bust(s) to the predetermined position.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg TargetPosition:eval
 * @text Target Position
 * @parent PictureID:arrayeval
 * @desc Target predetermined position from 0 to 10.
 * You may use JavaScript.
 * @default 5
 *
 * @arg EasingType:str
 * @text Move Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc Flip direction when moving?
 * @default None
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust movement.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Move_ResetToPosition
 * @text MOVE: Reset Bust(s) to Position
 * @desc Reset bust(s) to the current position(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg EasingType:str
 * @text Move Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc Flip direction when moving?
 * @default None
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust movement.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Scale
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Scale
 * @text Category - Scaling
 * @desc These are scaling-related Picture Bust Plugin Commands.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Scale_ScaleBy
 * @text SCALE: Scale Bust(s) By
 * @desc Scale bust(s) by specific amounts.
 * Value scale: 100 = 100% = 1.0
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg ScaleX:eval
 * @text Scale X By
 * @parent PictureID:arrayeval
 * @desc Alter (additively) the X scaling value by this.
 * You may use JavaScript.
 * @default +20
 * 
 * @arg ScaleY:eval
 * @text Scale Y By
 * @parent PictureID:arrayeval
 * @desc Alter (additively) the Y scaling value by this.
 * You may use JavaScript.
 * @default +20
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust scaling.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Scale_ScaleTo
 * @text SCALE: Scale Bust(s) To
 * @desc Scale bust(s) to specific values.
 * Value scale: 100 = 100% = 1.0
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg TargetScaleX:str
 * @text Target Scale X
 * @parent PictureID:arrayeval
 * @desc Set X scaling value to this.
 * You may use JavaScript. "Unchanged" for no changes.
 * @default 100
 * 
 * @arg TargetScaleY:str
 * @text Target Scale Y
 * @parent PictureID:arrayeval
 * @desc Set Y scaling value to this.
 * You may use JavaScript. "Unchanged" for no changes.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust scaling.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Scale_ScaleReset
 * @text SCALE: Scale Reset Bust(s)
 * @desc Resets the scale for bust(s) to the default
 * settings in the Plugin Parameters.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust scaling.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Swaying
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Swaying
 * @text Category - Swaying
 * @desc These are swaying related Picture Plugin Commands.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Swaying_Enable
 * @text SWAYING: Start
 * @desc Starts swaying aspect for selected bust(s).
 * The bust sways its angle back and forth.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Speed
 * 
 * @arg SpeedAngle:eval
 * @text Angle Speed
 * @parent Speed
 * @desc Speed used for the swaying cycle.
 * Higher is slower. You may use JavaScript.
 * @default 30
 * 
 * @arg Rate
 * @text Angle
 * 
 * @arg RateAngle:eval
 * @text Angle Sway
 * @parent Rate
 * @desc Max angle used for the swaying cycle.
 * Determines change amount. You may use JavaScript.
 * @default 2
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Swaying_Disable
 * @text SWAYING: Stop
 * @desc Stops swaying aspect for selected bust(s).
 * The no longer sways back and forth.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Tone
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Tone
 * @text Category - Tone
 * @desc These are tone-related Picture Bust Plugin Commands.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Tone_BrightBust
 * @text TONE: Bright Bust(s)
 * @desc Brighten bust(s) to use the Tone settings
 * found in the Plugin Parameters.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the tone change.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Tone_DimBust
 * @text TONE: Dim Bust(s)
 * @desc Dims bust(s) to use the Tone settings
 * found in the Plugin Parameters.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the tone change.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Tone_NormalBust
 * @text TONE: Normal Bust(s)
 * @desc Normalize bust(s) to no tone at all.
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the tone change.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Tone_PresetBust
 * @text TONE: Preset Tone for Bust(s)
 * @desc Use RPG Maker MZ's present tones/tints for bust(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 * 
 * @arg Preset:str
 * @text Preset Name
 * @parent PictureID:arrayeval
 * @type select
 * @option Normal
 * @option Dark
 * @option Sepia
 * @option Sunset
 * @option Night
 * @desc What tone preset do you wish to apply?
 * @default Sepia
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the tone change.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Tone_CustomToneBust
 * @text TONE: Target Tone for Bust(s)
 * @desc Use a custom target tone for the bust(s).
 * 
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg customTone:eval
 * @text Custom Tone
 * @parent PictureID:arrayeval
 * @desc What tone do you want for the bust(s)?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the tone change.
 * @default 20
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
 * @param VNPictureBusts
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Anchor
 * @text Anchor Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Anchor
 * @desc Determines the anchor/origin X setting for Picture Busts.
 * 0.0 is left, 0.5 is center, 1.0 is right.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Anchor
 * @desc Determines the anchor/origin Y setting for Picture Busts.
 * 0.0 is top, 0.5 is middle, 1.0 is bottom.
 * @default 1.0
 * 
 * @param Scale
 * @text Scale Settings
 *
 * @param ScaleX:num
 * @text Scale X
 * @parent Scale
 * @desc Scale X adjustment settings for Picture Busts.
 * Value scale: 100 = 100% = 1.0
 * @default 100
 *
 * @param ScaleY:num
 * @text Scale Y
 * @parent Scale
 * @desc Scale Y adjustment settings for Picture Busts.
 * Value scale: 100 = 100% = 1.0
 * @default 100
 *
 * @param InvertedScale:arraynum
 * @text Mirror Horizontally
 * @parent Scale
 * @type number[]
 * @max 10
 * @desc Which positions will be mirrored horizontally?
 * You want your Busts facing the center of the screen.
 * @default ["0","1","2","3","4"]
 * 
 * @param Screen
 * @text Screen Positioning
 *
 * @param ScreenX:func
 * @text JS: Position X
 * @parent Screen
 * @type note
 * @desc Code to determine used to calculate the X coordinate
 * for each screen position.
 * @default "// Declare Arguments\nconst position = arguments[0].clamp(0, 10);\n\n// Declare Variables\nconst bufferX = 200;\nconst width = Graphics.width - (bufferX * 2);\n\n// Calculate X Position\nx = Math.round(position * width / 10) + bufferX;\nx = x.clamp(bufferX, Graphics.width - bufferX);\n\n// Return X Value\nreturn x;"
 *
 * @param ScreenY:func
 * @text JS: Position Y
 * @parent Screen
 * @type note
 * @desc Code to determine used to calculate the Y coordinate
 * for each screen position.
 * @default "// Declare Arguments\nconst position = arguments[0].clamp(0, 10);\n\n// Declare Variables\nconst stagger = 0;\nconst difference = 5 - Math.abs(5 - position);\nlet y = Graphics.height;\n\n// Calculate Y Position\ny = Graphics.height + Math.round(difference * stagger) + 5;\n\n// Return Y Value\nreturn y;"
 * 
 * @param Tone
 * @text Tone Presets
 *
 * @param brightTone:eval
 * @text Bright Tone
 * @parent Tone
 * @desc What tone do you want for brightness?
 * Format: [Red, Green, Blue, Gray]
 * @default [34, 34, 34, 0]
 *
 * @param dimTone:eval
 * @text Dim Tone
 * @parent Tone
 * @desc What tone do you want for dimming?
 * Format: [Red, Green, Blue, Gray]
 * @default [-34, -34, 0, 34]
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

function _0x2462(){const _0x31b027=['isPictureAnimationPlaying','UPPER\x20LEFT','FLIP','_scene','oDUyS','trim','_name','createPictures','_anchor','isPlaying','ARRAYNUM','toUpperCase','ScreenX','_targetScaleY','Fidgeting_Enable','vdBFN','_animationSprites','Linear','scaleX','_vnSwaying','updateWaitMode','tint','NXbNa','kHBaI','Basic_GraphicChange','Scale_ScaleBy','clamp','getLastPluginCommandInterpreter','bind','match','width','remove','Move_MoveByCoordinates','STR','Spriteset_Base_updateAnimations','wMlWv','updateMove','_targetAnchor','FUNC','HAzVK','ARRAYFUNC','updatePictureAnimations','TargetOpacity','ScaleY','updatePositionVnFidgeting','lastAnimationSprite','speed','processPictureAnimationRequests','targets','yomTh','BattleCore','initVnPictureBusts','loadPicture','_vnPictureBustPosition','_targetScaleX','BGqPd','NMSdn','Breathing_Disable','SUNSET','animationBaseDelay','cos','prototype','SpeedX','HorzMirrorCheck','Move_MoveToCoordinates','log','YNWKB','lSmZN','Game_Picture_updateMove','movePicture','EasingType','kAPbe','animationId','qCYRO','Move_MoveByPosition','Duration','lEPCL','Preset','Basic_MirrorBust','animationShouldMirror','Ukguv','stringify','vnPictureBustPosition','_opacity','70940CTVbsW','_vnFidgeting','setVnPictureSwayingSettings','addLoadListener','StartOffsetX','mlyuF','setup','getVnPictureSwayingSettings','zNrTK','MoveX','clone','OPgSb','BsUwD','puCCR','_targetY','setWaitMode','pictureContainerRect','242475pmhjKq','VbNTG','VisuMZ_0_CoreEngine','ConvertParams','NORMAL','showPicture','Origin','length','removePictureAnimation','Game_Picture_angle','exit','setVnPictureFidgetingSettings','NIGHT','_targetX','_targetOpacity','setEasingType','tMMPj','Game_Picture_x','AnimationID','TargetScaleX','removeChild','Game_Picture_initialize','brightTone','applyVnBreathingScaleY','Basic_ExitBusts','setVnPictureBreathingSettings','rqSCf','CENTER','282190HXSPxA','UNCHANGED','Game_Interpreter_updateWaitMode','AutoErase','return\x200','EndOffsetY','TargetPosition','push','Spriteset_Base_removeAllAnimations','VNPictureBusts','_spriteset','wDWil','removeAllPictureAnimations','_pictureEffectsContainer','hqkqt','BUST','filter','VmDdj','EVAL','Tone_BrightBust','isMVAnimation','Scale_ScaleTo','angle','destroy','initVnPictureSlightMovements','registerCommand','find','RtBQb','pCLto','zKUrE','Tone_PresetBust','rate','getVnPictureFidgetingSettings','includes','_waitMode','NNtSE','_origin','picture','call','version','AdjustOpacity','1314732vEnBAI','getVnPictureBreathingSettings','1EUNZgI','removeAllAnimations','LOnnM','MnnjQ','applyVnSwaying','Settings','setTargetAnchor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','setAnchor','VisuMZ_1_BattleCore','NUM','WaitForAnimation','frameCount','dimTone','setFrame','requestPictureAnimation','map','EwYSy','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','VisuMZ_1_BattleCore\x20needs\x20to\x20be\x20updated\x20to\x20use\x0aBASIC:\x20Play\x20Animation\x20on\x20Bust(s)\x20plugin\x20command.','_pictureId','312644XdDYBG','Fidgeting_Disable','InvertedScale','animationNextDelay','Game_Picture_y','BattleCoreVersionCheck','TOGGLE','createPictureEffectsContainer','UvYEB','eIXIE','JSON','scaleY','Scale_ScaleReset','cumVK','GLAqX','shift','enabled','Fade_OpacityTo','Move_MoveToPosition','_pictureContainer','_pictureAnimationQueue','isAnimationForEach','STRUCT','68625JquTHh','MoveY','56puvjVt','TgbAW','TargetY','pictureAnimation','SovtR','createPictureAnimationSprite','DyKuq','RateY','RateAngle','RateX','QiTJJ','DARK','isVnPictureFidgeting','LIoOT','initialize','max','updatePosition','TargetX','_vnPictureBustCoordinates','SEPIA','PictureID','Tone_CustomToneBust','endAnimation','setVnBustPosition','Breathing_Enable','ScreenY','TargetScaleY','startAnimation','format','jWeco','PictureName','Basic_EnterBust','_scaleX','rqxBW','applyVnBreathingScaleX','AnchorY','MIRROR','isPlaytest','Game_Temp_initialize','vnSetDuration','round','ScaleX','Sprite_Picture_updatePosition','DXinU','Spriteset_Base_createPictures','parse','hnkMJ','3IlacPk','_duration','YkOgN','mOggi','AUTO','740943UjJSip','height','Game_Picture_scaleY','description','DkUwq','11onkCix','findPictureTargetSprite','_vnBreathing','setVnBustAnchor','createPictureAnimation','mirror','name','AlbTA','_wholeDuration','SpeedAngle','Fade_OpacityBy','vnAutoErasePicture','SpeedY','mqtLy','vnPostChangeGraphic','zGLZd','FlipDirection','mDAnf','AnchorX','XYvcx','PbHWl','applyVnFidgetingScaleX','vnChangeGraphic','_scaleY','CrsYw','Basic_OriginChange','children','NYDDh','getVnBustPosition','Swaying_Enable','Move_ResetToPosition','MovePosition'];_0x2462=function(){return _0x31b027;};return _0x2462();}const _0x3386bc=_0x1041;function _0x1041(_0x456438,_0x446ab2){const _0x2462fe=_0x2462();return _0x1041=function(_0x104182,_0x119338){_0x104182=_0x104182-0xbf;let _0x8bd872=_0x2462fe[_0x104182];return _0x8bd872;},_0x1041(_0x456438,_0x446ab2);}(function(_0x6b7a6e,_0x2a262f){const _0x4ccafb=_0x1041,_0x3dd6e5=_0x6b7a6e();while(!![]){try{const _0x1a7341=parseInt(_0x4ccafb(0xec))/0x1*(-parseInt(_0x4ccafb(0xc1))/0x2)+parseInt(_0x4ccafb(0x149))/0x3*(-parseInt(_0x4ccafb(0x101))/0x4)+-parseInt(_0x4ccafb(0x1d8))/0x5+parseInt(_0x4ccafb(0xea))/0x6+parseInt(_0x4ccafb(0x14e))/0x7+-parseInt(_0x4ccafb(0x11a))/0x8*(-parseInt(_0x4ccafb(0x118))/0x9)+-parseInt(_0x4ccafb(0x1c7))/0xa*(-parseInt(_0x4ccafb(0x153))/0xb);if(_0x1a7341===_0x2a262f)break;else _0x3dd6e5['push'](_0x3dd6e5['shift']());}catch(_0x3fda40){_0x3dd6e5['push'](_0x3dd6e5['shift']());}}}(_0x2462,0x1cbb9));var label=_0x3386bc(0xca),tier=tier||0x0,dependencies=[_0x3386bc(0x1da)],pluginData=$plugins[_0x3386bc(0xd1)](function(_0x3b0971){const _0x4aaf8c=_0x3386bc;return _0x3b0971['status']&&_0x3b0971[_0x4aaf8c(0x151)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x3386bc(0xf1)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x3386bc(0x1db)]=function(_0x215d51,_0x461980){const _0x20a55b=_0x3386bc;for(const _0x101886 in _0x461980){if(_0x101886[_0x20a55b(0x190)](/(.*):(.*)/i)){const _0x45bc06=String(RegExp['$1']),_0x2231bb=String(RegExp['$2'])[_0x20a55b(0x17e)]()[_0x20a55b(0x178)]();let _0x482f6e,_0x203cbb,_0x31dbbb;switch(_0x2231bb){case _0x20a55b(0xf6):_0x482f6e=_0x461980[_0x101886]!==''?Number(_0x461980[_0x101886]):0x0;break;case _0x20a55b(0x17d):_0x203cbb=_0x461980[_0x101886]!==''?JSON[_0x20a55b(0x147)](_0x461980[_0x101886]):[],_0x482f6e=_0x203cbb[_0x20a55b(0xfc)](_0x253cef=>Number(_0x253cef));break;case _0x20a55b(0xd3):_0x482f6e=_0x461980[_0x101886]!==''?eval(_0x461980[_0x101886]):null;break;case'ARRAYEVAL':_0x203cbb=_0x461980[_0x101886]!==''?JSON[_0x20a55b(0x147)](_0x461980[_0x101886]):[],_0x482f6e=_0x203cbb[_0x20a55b(0xfc)](_0x45bd82=>eval(_0x45bd82));break;case _0x20a55b(0x10b):_0x482f6e=_0x461980[_0x101886]!==''?JSON['parse'](_0x461980[_0x101886]):'';break;case'ARRAYJSON':_0x203cbb=_0x461980[_0x101886]!==''?JSON[_0x20a55b(0x147)](_0x461980[_0x101886]):[],_0x482f6e=_0x203cbb[_0x20a55b(0xfc)](_0x119276=>JSON['parse'](_0x119276));break;case _0x20a55b(0x199):_0x482f6e=_0x461980[_0x101886]!==''?new Function(JSON['parse'](_0x461980[_0x101886])):new Function(_0x20a55b(0xc5));break;case _0x20a55b(0x19b):_0x203cbb=_0x461980[_0x101886]!==''?JSON[_0x20a55b(0x147)](_0x461980[_0x101886]):[],_0x482f6e=_0x203cbb[_0x20a55b(0xfc)](_0x4d6fcb=>new Function(JSON['parse'](_0x4d6fcb)));break;case _0x20a55b(0x194):_0x482f6e=_0x461980[_0x101886]!==''?String(_0x461980[_0x101886]):'';break;case'ARRAYSTR':_0x203cbb=_0x461980[_0x101886]!==''?JSON[_0x20a55b(0x147)](_0x461980[_0x101886]):[],_0x482f6e=_0x203cbb[_0x20a55b(0xfc)](_0x35ade7=>String(_0x35ade7));break;case _0x20a55b(0x117):_0x31dbbb=_0x461980[_0x101886]!==''?JSON[_0x20a55b(0x147)](_0x461980[_0x101886]):{},_0x482f6e=VisuMZ[_0x20a55b(0x1db)]({},_0x31dbbb);break;case'ARRAYSTRUCT':_0x203cbb=_0x461980[_0x101886]!==''?JSON[_0x20a55b(0x147)](_0x461980[_0x101886]):[],_0x482f6e=_0x203cbb[_0x20a55b(0xfc)](_0x2ab840=>VisuMZ[_0x20a55b(0x1db)]({},JSON['parse'](_0x2ab840)));break;default:continue;}_0x215d51[_0x45bc06]=_0x482f6e;}}return _0x215d51;},(_0x2560ba=>{const _0x5f1a33=_0x3386bc,_0xb9cc63=_0x2560ba[_0x5f1a33(0x159)];for(const _0xaede63 of dependencies){if(_0x5f1a33(0x1cf)===_0x5f1a33(0x1c3)){const _0x1c69a8=_0x28c9a1[_0x5f1a33(0xca)][_0x5f1a33(0xf1)];return!_0x1c69a8[_0x5f1a33(0x103)][_0x5f1a33(0xe2)](_0x4dacc6);}else{if(!Imported[_0xaede63]){if(_0x5f1a33(0x1aa)!==_0x5f1a33(0x1aa)){const _0x398678=_0x4081a6(_0xc26c66['$1']);_0x398678!==_0xcdcd27[_0x4cf1d6][_0x5f1a33(0xe8)]&&(_0xf895f2(_0x5f1a33(0xfe)[_0x5f1a33(0x136)](_0x25bcea,_0x398678)),_0x95632d['exit']());}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0xb9cc63,_0xaede63)),SceneManager[_0x5f1a33(0x1e2)]();break;}}}}const _0x2de65d=_0x2560ba[_0x5f1a33(0x151)];if(_0x2de65d[_0x5f1a33(0x190)](/\[Version[ ](.*?)\]/i)){const _0x57f813=Number(RegExp['$1']);_0x57f813!==VisuMZ[label][_0x5f1a33(0xe8)]&&(alert(_0x5f1a33(0xfe)[_0x5f1a33(0x136)](_0xb9cc63,_0x57f813)),SceneManager[_0x5f1a33(0x1e2)]());}if(_0x2de65d[_0x5f1a33(0x190)](/\[Tier[ ](\d+)\]/i)){if('kjgNj'!==_0x5f1a33(0x1b5)){const _0x457444=Number(RegExp['$1']);_0x457444<tier?_0x5f1a33(0x1d4)==='puCCR'?(alert(_0x5f1a33(0xf3)[_0x5f1a33(0x136)](_0xb9cc63,_0x457444,tier)),SceneManager[_0x5f1a33(0x1e2)]()):_0x37323f['startAnimation']&&_0x3346d2[_0x5f1a33(0x135)]():tier=Math[_0x5f1a33(0x129)](_0x457444,tier);}else this[_0x5f1a33(0x1a6)]();}VisuMZ[_0x5f1a33(0x1db)](VisuMZ[label][_0x5f1a33(0xf1)],_0x2560ba['parameters']);})(pluginData),VisuMZ[_0x3386bc(0xca)][_0x3386bc(0x1b2)]=function(_0x12c91b,_0x1fefe3){const _0x40d8ff=_0x3386bc;_0x12c91b=_0x12c91b['toUpperCase']()[_0x40d8ff(0x178)]();if(_0x12c91b==='NONE')return![];else{if(_0x12c91b===_0x40d8ff(0x13e)){if(_0x40d8ff(0x160)===_0x40d8ff(0x120)){if(_0x28e492[_0x40d8ff(0x13f)]())_0x118d06[_0x40d8ff(0x1b4)](_0x19da3d);}else return!![];}else{if(_0x12c91b===_0x40d8ff(0x14d)){if(_0x40d8ff(0xbf)===_0x40d8ff(0xbf)){const _0x106bb8=VisuMZ[_0x40d8ff(0xca)]['Settings'];return _0x106bb8[_0x40d8ff(0x103)][_0x40d8ff(0xe2)](_0x1fefe3);}else{if(_0x6e1166[_0x40d8ff(0xf5)]&&_0x26404e[_0x40d8ff(0x1a5)][_0x40d8ff(0xe8)]<1.47){if(!_0x5837e5[_0x40d8ff(0xca)]['BattleCoreVersionCheck']){_0x3d8431[_0x40d8ff(0xca)][_0x40d8ff(0x106)]=!![];const _0x9ddad2=_0x40d8ff(0xff);_0x13655c(_0x9ddad2);}return;}_0x5ccaf6[_0x40d8ff(0x1db)](_0x206eae,_0x278ff5);const _0x495497=_0x204bd5['PictureID'],_0x2eaed6=_0x2a3a1a['AnimationID'];if(!_0x56f4d8[_0x2eaed6])return;const _0x3fcdc0=_0x47a8ea['Mirror'];_0x22e66a[_0x40d8ff(0xfb)](_0x495497['clone'](),_0x2eaed6,_0x3fcdc0);const _0x207166=_0xf2d723['getLastPluginCommandInterpreter']();_0x207166&&_0x407d94[_0x40d8ff(0xf7)]&&(_0x266cd4[_0x40d8ff(0x176)]['_spriteset'][_0x40d8ff(0x19c)](),_0x207166['setWaitMode'](_0x40d8ff(0x11d)));}}else{if(_0x12c91b==='AUTO-REVERSE'){const _0x1c8395=VisuMZ['VNPictureBusts'][_0x40d8ff(0xf1)];return!_0x1c8395['InvertedScale'][_0x40d8ff(0xe2)](_0x1fefe3);}}}}return![];},PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],_0x3386bc(0x139),_0x141c20=>{const _0xe453d9=_0x3386bc;VisuMZ['ConvertParams'](_0x141c20,_0x141c20);const _0x44ad16=VisuMZ[_0xe453d9(0xca)][_0xe453d9(0xf1)],_0xb6b7f4=(_0x141c20[_0xe453d9(0x12e)]||0x1)['clamp'](0x1,0x64),_0x1daf3f=_0x141c20[_0xe453d9(0x138)];if(_0x1daf3f[_0xe453d9(0x178)]()[_0xe453d9(0x1df)]<=0x0)return;const _0x11c015=_0x141c20[_0xe453d9(0x1de)][_0xe453d9(0x17e)]()[_0xe453d9(0x178)](),_0x419c8d=_0x141c20['Position'][_0xe453d9(0x18d)](0x0,0xa),_0x4d3094=ImageManager[_0xe453d9(0x1c5)](_0x419c8d),_0x47c140=VisuMZ[_0xe453d9(0xca)][_0xe453d9(0x1b2)](_0x141c20['HorzMirror'],_0x419c8d),_0x4af3f7=_0x141c20[_0xe453d9(0x1cb)]*(_0x47c140?0x1:-0x1),_0x1bfc91=_0x141c20['StartOffsetY'];let _0x12ba11=_0x44ad16['ScaleX']*(_0x47c140?-0x1:0x1),_0x4cfcdb=_0x44ad16[_0xe453d9(0x143)],_0x15259c=0x0;const _0x5762ee=0x0;$gameScreen[_0xe453d9(0x1dd)](_0xb6b7f4,_0x1daf3f,_0x11c015===_0xe453d9(0x174)?0x0:0x1,_0x4d3094['x']+_0x4af3f7,_0x4d3094['y']+_0x1bfc91,_0x12ba11,_0x4cfcdb,_0x15259c,_0x5762ee),_0x15259c=0xff,$gameScreen['movePicture'](_0xb6b7f4,_0x11c015===_0xe453d9(0x174)?0x0:0x1,_0x4d3094['x'],_0x4d3094['y'],_0x12ba11,_0x4cfcdb,_0x15259c,_0x5762ee,_0x141c20[_0xe453d9(0x1be)],0x0);const _0x7e5cfc=$gameScreen[_0xe453d9(0xe6)](_0xb6b7f4);if(_0x7e5cfc){_0x7e5cfc['setEasingType'](_0x141c20['EasingType']),_0x7e5cfc['setVnBustPosition'](_0x419c8d);if(_0x11c015==='BUST')_0x7e5cfc['setVnBustAnchor'](!![],!![]);}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],_0x3386bc(0x1f0),_0x3451c6=>{const _0x1a07dc=_0x3386bc;VisuMZ[_0x1a07dc(0x1db)](_0x3451c6,_0x3451c6);const _0x1bd70c=VisuMZ[_0x1a07dc(0xca)][_0x1a07dc(0xf1)],_0x210dba=_0x3451c6['PictureID'],_0xe82964=_0x3451c6[_0x1a07dc(0x163)][_0x1a07dc(0x17e)]()[_0x1a07dc(0x178)]()===_0x1a07dc(0x175);for(let _0x18a496 of _0x210dba){if('hZDZi'!==_0x1a07dc(0x1e8)){_0x18a496=(_0x18a496||0x1)['clamp'](0x1,0x64);const _0x3b32ad=$gameScreen[_0x1a07dc(0xe6)](_0x18a496);if(!_0x3b32ad)continue;const _0x2513fc=_0x3b32ad[_0x1a07dc(0x17b)],_0x5c573a=_0x3b32ad[_0x1a07dc(0x198)],_0x5559c5=_0x3b32ad['_scaleX']<0x0,_0x624579=_0x3451c6['EndOffsetX']*(_0x5559c5?0x1:-0x1),_0x543d32=_0x3451c6[_0x1a07dc(0xc6)];$gameScreen[_0x1a07dc(0x1b8)](_0x18a496,_0x3b32ad[_0x1a07dc(0xe5)],_0x3b32ad['_x']+_0x624579,_0x3b32ad['_y']+_0x543d32,_0x3b32ad['_scaleX'],_0x3b32ad[_0x1a07dc(0x16a)],0x0,0x0,_0x3451c6['Duration'],0x0),_0x3b32ad[_0x1a07dc(0xf4)](_0x2513fc),_0x3b32ad[_0x1a07dc(0xf2)](_0x5c573a),_0x3b32ad['setEasingType'](_0x3451c6[_0x1a07dc(0x1b9)]),_0x3b32ad[_0x1a07dc(0x131)](-0x1);_0xe82964&&(_0x3b32ad[_0x1a07dc(0x13a)]*=-0x1,_0x3b32ad[_0x1a07dc(0x1a9)]*=-0x1);if(_0x3451c6[_0x1a07dc(0xc4)])$gameScreen['vnAutoErasePicture'](_0x18a496,0x32);}else{if(this[_0x1a07dc(0x186)]===_0x405f6b)this[_0x1a07dc(0xd9)]();return this[_0x1a07dc(0x186)];}}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],_0x3386bc(0x18b),_0x2af6ff=>{const _0x400af5=_0x3386bc;VisuMZ[_0x400af5(0x1db)](_0x2af6ff,_0x2af6ff);const _0x29385a=_0x2af6ff['PictureID'],_0x46ffe2=_0x2af6ff[_0x400af5(0x138)];if(_0x46ffe2[_0x400af5(0x178)]()[_0x400af5(0x1df)]<=0x0)return;const _0x3a5bc8=$gameScreen[_0x400af5(0xe6)](_0x29385a);if(!_0x3a5bc8)return;_0x3a5bc8[_0x400af5(0x169)](_0x46ffe2);}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],_0x3386bc(0x1c1),_0xb371c0=>{const _0x2385c9=_0x3386bc;VisuMZ['ConvertParams'](_0xb371c0,_0xb371c0);const _0x43a49f=_0xb371c0[_0x2385c9(0x12e)],_0x553545=_0xb371c0['HorzMirror'][_0x2385c9(0x17e)]()['trim']();for(let _0x2deb93 of _0x43a49f){if(_0x2385c9(0x166)==='ispSF'){if(this)this['_name']=_0x1d0ef3;}else{_0x2deb93=(_0x2deb93||0x1)[_0x2385c9(0x18d)](0x1,0x64);const _0x918520=$gameScreen[_0x2385c9(0xe6)](_0x2deb93);if(!_0x918520)continue;const _0xc2a4d2=_0x918520[_0x2385c9(0x16f)]();if(_0x553545===_0x2385c9(0x107))_0x918520[_0x2385c9(0x13a)]*=-0x1;else{if(_0x2385c9(0xfd)!==_0x2385c9(0xfd))_0x948a5f[_0x2385c9(0x1d5)]=_0x2f95df(_0x345489['TargetY']);else{let _0x2f256a=VisuMZ['VNPictureBusts'][_0x2385c9(0x1b2)](_0x553545,_0xc2a4d2);_0x918520['_scaleX']=Math['abs'](_0x918520[_0x2385c9(0x13a)])*(_0x2f256a?-0x1:0x1);}}_0x918520[_0x2385c9(0x1a9)]=_0x918520[_0x2385c9(0x13a)];}}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],_0x3386bc(0x16c),_0x27f8f8=>{const _0x2f3078=_0x3386bc;VisuMZ['ConvertParams'](_0x27f8f8,_0x27f8f8);const _0x226849=_0x27f8f8[_0x2f3078(0x12e)],_0x271701=_0x27f8f8[_0x2f3078(0x1de)][_0x2f3078(0x17e)]()[_0x2f3078(0x178)](),_0x2ee56b=VisuMZ['VNPictureBusts'][_0x2f3078(0xf1)],_0x123ea6={'x':_0x2ee56b[_0x2f3078(0x165)],'y':_0x2ee56b[_0x2f3078(0x13d)]};for(let _0x58c9f4 of _0x226849){_0x58c9f4=(_0x58c9f4||0x1)[_0x2f3078(0x18d)](0x1,0x64);const _0x8b6d8=$gameScreen[_0x2f3078(0xe6)](_0x58c9f4);if(!_0x8b6d8)continue;let _0xe2091={'x':0x0,'y':0x0};if(_0x271701===_0x2f3078(0x174))'zjofu'!=='zjofu'?(_0x45d4be[_0x2f3078(0x1a9)]=_0x36474d[_0x2f3078(0x13a)]+_0xedff7e,_0x2b9f9a[_0x2f3078(0x180)]=_0x959224[_0x2f3078(0x16a)]+_0x35077a):_0xe2091={'x':0x0,'y':0x0};else{if(_0x271701===_0x2f3078(0xc0))_0xe2091={'x':0.5,'y':0.5};else{if(_0x271701===_0x2f3078(0xd0))_0xe2091=_0x123ea6;else{if(_0x2f3078(0x177)!==_0x2f3078(0x1bc))continue;else return _0x285cd6['status']&&_0x70ed8[_0x2f3078(0x151)][_0x2f3078(0xe2)]('['+_0x53e951+']');}}}_0x8b6d8[_0x2f3078(0xf2)](_0xe2091),_0x8b6d8[_0x2f3078(0x1e7)]('Linear'),_0x8b6d8['vnSetDuration'](_0x27f8f8[_0x2f3078(0x1be)]);}}),PluginManager['registerCommand'](pluginData[_0x3386bc(0x159)],'Basic_PlayAniBust',_0x400381=>{const _0x3a4b4b=_0x3386bc;if(Imported[_0x3a4b4b(0xf5)]&&VisuMZ[_0x3a4b4b(0x1a5)]['version']<1.47){if(!VisuMZ['VNPictureBusts'][_0x3a4b4b(0x106)]){VisuMZ[_0x3a4b4b(0xca)]['BattleCoreVersionCheck']=!![];const _0x3fe70b=_0x3a4b4b(0xff);alert(_0x3fe70b);}return;}VisuMZ[_0x3a4b4b(0x1db)](_0x400381,_0x400381);const _0x3ed0eb=_0x400381[_0x3a4b4b(0x12e)],_0x1d98b6=_0x400381[_0x3a4b4b(0x1ea)];if(!$dataAnimations[_0x1d98b6])return;const _0x5388de=_0x400381['Mirror'];$gameTemp[_0x3a4b4b(0xfb)](_0x3ed0eb[_0x3a4b4b(0x1d1)](),_0x1d98b6,_0x5388de);const _0x43dceb=$gameTemp[_0x3a4b4b(0x18e)]();if(_0x43dceb&&_0x400381[_0x3a4b4b(0xf7)]){if(_0x3a4b4b(0xd2)!==_0x3a4b4b(0x10f))SceneManager['_scene'][_0x3a4b4b(0xcb)][_0x3a4b4b(0x19c)](),_0x43dceb[_0x3a4b4b(0x1d6)](_0x3a4b4b(0x11d));else{if(this[_0x3a4b4b(0x186)]===_0x503619)this[_0x3a4b4b(0xd9)]();this['_vnSwaying']=_0x301d85['parse'](_0xe9a390['stringify'](_0x53a4ff));}}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],_0x3386bc(0x132),_0x231097=>{const _0x66907a=_0x3386bc;VisuMZ[_0x66907a(0x1db)](_0x231097,_0x231097);const _0x270cbe=_0x231097[_0x66907a(0x12e)],_0x50a4d4=_0x231097[_0x66907a(0x1b1)]||0x0,_0x12db6a=_0x231097[_0x66907a(0x15f)]||0x0,_0x1bc054=_0x231097[_0x66907a(0x123)]||0x0,_0x3deb0e=_0x231097['RateY']||0x0;for(let _0x1204e8 of _0x270cbe){_0x1204e8=(_0x1204e8||0x1)[_0x66907a(0x18d)](0x1,0x64);const _0x32e38c=$gameScreen['picture'](_0x1204e8);if(!_0x32e38c)continue;const _0xc02092=_0x32e38c['getVnPictureBreathingSettings']();_0xc02092['enabled']=!![],_0xc02092['speed']['x']=_0x50a4d4,_0xc02092[_0x66907a(0x1a1)]['y']=_0x12db6a,_0xc02092[_0x66907a(0xe0)]['x']=_0x1bc054,_0xc02092[_0x66907a(0xe0)]['y']=_0x3deb0e,_0x32e38c['setVnPictureBreathingSettings'](_0xc02092);}}),PluginManager['registerCommand'](pluginData[_0x3386bc(0x159)],_0x3386bc(0x1ac),_0x32a490=>{const _0x30428d=_0x3386bc;VisuMZ[_0x30428d(0x1db)](_0x32a490,_0x32a490);const _0x537115=_0x32a490[_0x30428d(0x12e)];for(let _0x4d2094 of _0x537115){_0x4d2094=(_0x4d2094||0x1)[_0x30428d(0x18d)](0x1,0x64);const _0x11806a=$gameScreen['picture'](_0x4d2094);if(!_0x11806a)continue;const _0x20ce79=_0x11806a['getVnPictureBreathingSettings']();_0x20ce79['enabled']=![],_0x11806a[_0x30428d(0x1f1)](_0x20ce79);}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],'Fade_FadeIn',_0x39c782=>{const _0xfeee4f=_0x3386bc;VisuMZ[_0xfeee4f(0x1db)](_0x39c782,_0x39c782);const _0x2831f7=_0x39c782['PictureID'];for(let _0x5245f4 of _0x2831f7){if('QfCwy'!==_0xfeee4f(0x16e)){_0x5245f4=(_0x5245f4||0x1)['clamp'](0x1,0x64);const _0x14692a=$gameScreen[_0xfeee4f(0xe6)](_0x5245f4);if(!_0x14692a)continue;_0x14692a[_0xfeee4f(0x141)](_0x39c782[_0xfeee4f(0x1be)]),_0x14692a[_0xfeee4f(0x1e6)]=0xff,_0x14692a['setEasingType'](_0xfeee4f(0x184));}else{if(_0x31958a[_0xfeee4f(0x176)]['_spriteset'][_0xfeee4f(0x173)]())return!![];this[_0xfeee4f(0xe3)]='';}}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],'Fade_FadeOut',_0x5850be=>{const _0xb65202=_0x3386bc;VisuMZ[_0xb65202(0x1db)](_0x5850be,_0x5850be);const _0x3b8558=_0x5850be[_0xb65202(0x12e)];for(let _0x54cf96 of _0x3b8558){if(_0xb65202(0x167)!=='PbHWl')_0x4a58ad[_0xb65202(0x135)]();else{_0x54cf96=(_0x54cf96||0x1)[_0xb65202(0x18d)](0x1,0x64);const _0x13d3f6=$gameScreen[_0xb65202(0xe6)](_0x54cf96);if(!_0x13d3f6)continue;_0x13d3f6[_0xb65202(0x141)](_0x5850be[_0xb65202(0x1be)]),_0x13d3f6[_0xb65202(0x1e6)]=0x0,_0x13d3f6[_0xb65202(0x1e7)](_0xb65202(0x184));if(_0x5850be[_0xb65202(0xc4)])$gameScreen['vnAutoErasePicture'](_0x54cf96,0x32);}}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],_0x3386bc(0x15d),_0x561dfd=>{const _0x1c3328=_0x3386bc;VisuMZ[_0x1c3328(0x1db)](_0x561dfd,_0x561dfd);const _0x5e7267=_0x561dfd['PictureID'],_0x27d0d3=Number(_0x561dfd[_0x1c3328(0xe9)])||0x0;for(let _0x2410ec of _0x5e7267){_0x2410ec=(_0x2410ec||0x1)[_0x1c3328(0x18d)](0x1,0x64);const _0x52bb2f=$gameScreen[_0x1c3328(0xe6)](_0x2410ec);if(!_0x52bb2f)continue;_0x52bb2f[_0x1c3328(0x141)](_0x561dfd[_0x1c3328(0x1be)]);const _0x41cfe6=Math[_0x1c3328(0x142)](_0x52bb2f[_0x1c3328(0x1e6)]+_0x27d0d3);_0x52bb2f[_0x1c3328(0x1e6)]=_0x41cfe6[_0x1c3328(0x18d)](0x0,0xff),_0x52bb2f[_0x1c3328(0x1e7)](_0x1c3328(0x184));}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],_0x3386bc(0x112),_0x885845=>{const _0x48823b=_0x3386bc;VisuMZ[_0x48823b(0x1db)](_0x885845,_0x885845);const _0x3e4197=_0x885845['PictureID'],_0x3dd29f=_0x885845[_0x48823b(0x19d)][_0x48823b(0x18d)](0x0,0xff);for(let _0x3c73b1 of _0x3e4197){if(_0x48823b(0x14b)===_0x48823b(0x1d9)){const _0x55cec4=new _0x4388db();this['addChild'](_0x55cec4);const _0x397461=this[_0x48823b(0x1d7)]();_0x55cec4[_0x48823b(0xfa)](_0x397461['x'],_0x397461['y'],_0x397461[_0x48823b(0x191)],_0x397461[_0x48823b(0x14f)]),this[_0x48823b(0xce)]=_0x55cec4;}else{_0x3c73b1=(_0x3c73b1||0x1)[_0x48823b(0x18d)](0x1,0x64);const _0x47819f=$gameScreen[_0x48823b(0xe6)](_0x3c73b1);if(!_0x47819f)continue;_0x47819f['vnSetDuration'](_0x885845[_0x48823b(0x1be)]),_0x47819f[_0x48823b(0x1e6)]=_0x3dd29f,_0x47819f[_0x48823b(0x1e7)](_0x48823b(0x184));}}}),PluginManager['registerCommand'](pluginData[_0x3386bc(0x159)],_0x3386bc(0x181),_0x44c86f=>{const _0x79d149=_0x3386bc;VisuMZ['ConvertParams'](_0x44c86f,_0x44c86f);const _0x49da78=_0x44c86f[_0x79d149(0x12e)],_0x30514f=_0x44c86f[_0x79d149(0x1b1)]||0x0,_0x3f4819=_0x44c86f[_0x79d149(0x15f)]||0x0,_0xc0a8ee=_0x44c86f[_0x79d149(0x123)]||0x0,_0x77c4bd=_0x44c86f[_0x79d149(0x121)]||0x0;for(let _0x9bb9e8 of _0x49da78){if(_0x79d149(0x11e)!==_0x79d149(0x124)){_0x9bb9e8=(_0x9bb9e8||0x1)[_0x79d149(0x18d)](0x1,0x64);const _0x25cade=$gameScreen[_0x79d149(0xe6)](_0x9bb9e8);if(!_0x25cade)continue;const _0xb538d7=_0x25cade[_0x79d149(0xe1)]();_0xb538d7['enabled']=!![],_0xb538d7[_0x79d149(0x1a1)]['x']=_0x30514f,_0xb538d7['speed']['y']=_0x3f4819,_0xb538d7[_0x79d149(0xe0)]['x']=_0xc0a8ee,_0xb538d7[_0x79d149(0xe0)]['y']=_0x77c4bd,_0x25cade[_0x79d149(0x1e3)](_0xb538d7);}else _0xa60b54[_0x79d149(0x1e5)]=_0x24becf(_0x2148a9['TargetX']);}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],_0x3386bc(0x102),_0x4d0585=>{const _0xa30707=_0x3386bc;VisuMZ['ConvertParams'](_0x4d0585,_0x4d0585);const _0x5128c8=_0x4d0585[_0xa30707(0x12e)];for(let _0x2841be of _0x5128c8){_0x2841be=(_0x2841be||0x1)['clamp'](0x1,0x64);const _0x8631de=$gameScreen[_0xa30707(0xe6)](_0x2841be);if(!_0x8631de)continue;const _0x14663e=_0x8631de['getVnPictureFidgetingSettings']();_0x14663e[_0xa30707(0x111)]=![],_0x8631de['setVnPictureFidgetingSettings'](_0x14663e);}}),PluginManager[_0x3386bc(0xda)](pluginData['name'],_0x3386bc(0x193),_0x2d1cfe=>{const _0xb161aa=_0x3386bc;VisuMZ[_0xb161aa(0x1db)](_0x2d1cfe,_0x2d1cfe);const _0x35102c=_0x2d1cfe[_0xb161aa(0x12e)],_0x1c5943=_0x2d1cfe['FlipDirection'][_0xb161aa(0x17e)]()['trim']()==='FLIP';for(let _0x1a518b of _0x35102c){_0x1a518b=(_0x1a518b||0x1)[_0xb161aa(0x18d)](0x1,0x64);const _0xa8502c=$gameScreen[_0xb161aa(0xe6)](_0x1a518b);if(!_0xa8502c)continue;if(_0x2d1cfe[_0xb161aa(0x1d0)][_0xb161aa(0x17e)]()[_0xb161aa(0x178)]()!==_0xb161aa(0xc2))try{const _0xcbcdb6=eval(_0x2d1cfe['MoveX']);if(_0xa8502c['_duration']>0x0)_0xa8502c[_0xb161aa(0x1e5)]+=_0xcbcdb6;else{if(_0xb161aa(0x10e)===_0xb161aa(0x10e))_0xa8502c[_0xb161aa(0x1e5)]=_0xa8502c['_x']+_0xcbcdb6;else try{_0x181856[_0xb161aa(0x1e5)]=_0x2bad59(_0x12dd55[_0xb161aa(0x12b)]);}catch(_0x5840e4){if(_0x1f995a[_0xb161aa(0x13f)]())_0x74e5b0[_0xb161aa(0x1b4)](_0x5840e4);}}}catch(_0x56bc0b){if($gameTemp[_0xb161aa(0x13f)]())console[_0xb161aa(0x1b4)](_0x56bc0b);}if(_0x2d1cfe[_0xb161aa(0x119)][_0xb161aa(0x17e)]()[_0xb161aa(0x178)]()!==_0xb161aa(0xc2)){if(_0xb161aa(0x15a)!==_0xb161aa(0x137))try{if(_0xb161aa(0x152)===_0xb161aa(0x1cc))for(const _0x2d7fc6 of this['_animationSprites']['clone']()){this['removePictureAnimation'](_0x2d7fc6);}else{const _0x32d136=eval(_0x2d1cfe['MoveY']);_0xa8502c['_duration']>0x0?_0xb161aa(0xde)!==_0xb161aa(0x127)?_0xa8502c['_targetY']+=_0x32d136:_0x27e14b[_0xb161aa(0x1d5)]=_0x329aca['_y']+_0x1a9fa1:_0xa8502c[_0xb161aa(0x1d5)]=_0xa8502c['_y']+_0x32d136;}}catch(_0x1496d7){if(_0xb161aa(0xcc)!==_0xb161aa(0xcc)){const _0x2f94ee=[];for(const _0x3bfc67 of _0x32a9f4){const _0x5f0c54=this[_0xb161aa(0x154)](_0x3bfc67);_0x5f0c54&&_0x2f94ee[_0xb161aa(0xc8)](_0x5f0c54);}return _0x2f94ee;}else{if($gameTemp[_0xb161aa(0x13f)]())console[_0xb161aa(0x1b4)](_0x1496d7);}}else{const _0x1430a6=_0x496ff5[_0xb161aa(0x1a7)](_0x289c69);_0x1430a6[_0xb161aa(0x1ca)](this[_0xb161aa(0x161)][_0xb161aa(0x18f)](this,_0x5f0097));}}_0xa8502c[_0xb161aa(0x141)](_0x2d1cfe[_0xb161aa(0x1be)]),_0xa8502c['setEasingType'](_0x2d1cfe[_0xb161aa(0x1b9)]),_0x1c5943&&(_0xa8502c[_0xb161aa(0x13a)]*=-0x1,_0xa8502c[_0xb161aa(0x1a9)]*=-0x1);}}),PluginManager['registerCommand'](pluginData[_0x3386bc(0x159)],_0x3386bc(0x1bd),_0x31a534=>{const _0x4f73a4=_0x3386bc;VisuMZ[_0x4f73a4(0x1db)](_0x31a534,_0x31a534);const _0x320e90=_0x31a534[_0x4f73a4(0x12e)],_0xef432e=_0x31a534[_0x4f73a4(0x163)]['toUpperCase']()['trim']()===_0x4f73a4(0x175);for(let _0x5d841c of _0x320e90){_0x5d841c=(_0x5d841c||0x1)[_0x4f73a4(0x18d)](0x1,0x64);const _0x434528=$gameScreen[_0x4f73a4(0xe6)](_0x5d841c);if(!_0x434528)continue;try{if(_0x4f73a4(0x1b6)!=='sHlUO'){const _0x59d448=eval(_0x31a534[_0x4f73a4(0x172)]),_0x3d787=(_0x434528[_0x4f73a4(0x16f)]()+_0x59d448)['clamp'](0x0,0xa),_0x4c0edc=ImageManager[_0x4f73a4(0x1c5)](_0x3d787);_0x434528['_targetX']=_0x4c0edc['x'],_0x434528[_0x4f73a4(0x1d5)]=_0x4c0edc['y'],_0x434528[_0x4f73a4(0x131)](_0x3d787);}else _0x42ce60['VNPictureBusts'][_0x4f73a4(0x146)]['call'](this),this[_0x4f73a4(0x108)]();}catch(_0x43f790){if(_0x4f73a4(0xef)===_0x4f73a4(0xdd))this[_0x4f73a4(0x1e0)](_0x4fd3aa);else{if($gameTemp[_0x4f73a4(0x13f)]())console[_0x4f73a4(0x1b4)](_0x43f790);}}_0x434528[_0x4f73a4(0x141)](_0x31a534[_0x4f73a4(0x1be)]),_0x434528['setEasingType'](_0x31a534[_0x4f73a4(0x1b9)]),_0xef432e&&(_0x4f73a4(0x19a)!==_0x4f73a4(0x19a)?(_0x3cb3b9(_0x4f73a4(0xf3)[_0x4f73a4(0x136)](_0x25da3b,_0x54b183,_0x57a4f8)),_0x6dd6c1[_0x4f73a4(0x1e2)]()):(_0x434528[_0x4f73a4(0x13a)]*=-0x1,_0x434528[_0x4f73a4(0x1a9)]*=-0x1));}}),PluginManager['registerCommand'](pluginData[_0x3386bc(0x159)],_0x3386bc(0x1b3),_0x28f76a=>{const _0x2102d5=_0x3386bc;VisuMZ[_0x2102d5(0x1db)](_0x28f76a,_0x28f76a);const _0x513d65=_0x28f76a[_0x2102d5(0x12e)],_0x3000f3=_0x28f76a[_0x2102d5(0x163)]['toUpperCase']()[_0x2102d5(0x178)]()===_0x2102d5(0x175);for(let _0x50ab44 of _0x513d65){_0x50ab44=(_0x50ab44||0x1)[_0x2102d5(0x18d)](0x1,0x64);const _0xb15f36=$gameScreen[_0x2102d5(0xe6)](_0x50ab44);if(!_0xb15f36)continue;if(_0x28f76a[_0x2102d5(0x12b)]['toUpperCase']()[_0x2102d5(0x178)]()!==_0x2102d5(0xc2))try{_0x2102d5(0x1d3)!==_0x2102d5(0x1d3)?(this['_x']=this[_0x2102d5(0x1e5)],this['_y']=this[_0x2102d5(0x1d5)],this['_scaleX']=this[_0x2102d5(0x1a9)],this[_0x2102d5(0x16a)]=this[_0x2102d5(0x180)],this[_0x2102d5(0x1c6)]=this[_0x2102d5(0x1e6)],this['_anchor']&&(this[_0x2102d5(0x17b)]['x']=this[_0x2102d5(0x198)]['x'],this[_0x2102d5(0x17b)]['y']=this['_targetAnchor']['y'])):_0xb15f36[_0x2102d5(0x1e5)]=eval(_0x28f76a[_0x2102d5(0x12b)]);}catch(_0x5464c1){if('NMSdn'===_0x2102d5(0x1ab)){if($gameTemp[_0x2102d5(0x13f)]())console['log'](_0x5464c1);}else this['updatePositionVnFidgeting']();}if(_0x28f76a[_0x2102d5(0x11c)][_0x2102d5(0x17e)]()[_0x2102d5(0x178)]()!==_0x2102d5(0xc2)){if(_0x2102d5(0xe4)!==_0x2102d5(0x1bf))try{_0xb15f36[_0x2102d5(0x1d5)]=eval(_0x28f76a[_0x2102d5(0x11c)]);}catch(_0x256093){if($gameTemp[_0x2102d5(0x13f)]())console[_0x2102d5(0x1b4)](_0x256093);}else _0x38af15[_0x2102d5(0x130)]&&_0x40d5f5[_0x2102d5(0x130)]();}_0xb15f36['vnSetDuration'](_0x28f76a[_0x2102d5(0x1be)]),_0xb15f36['setEasingType'](_0x28f76a[_0x2102d5(0x1b9)]),_0x3000f3&&(_0xb15f36[_0x2102d5(0x13a)]*=-0x1,_0xb15f36[_0x2102d5(0x1a9)]*=-0x1);}}),PluginManager[_0x3386bc(0xda)](pluginData['name'],_0x3386bc(0x113),_0x50983d=>{const _0x4cb550=_0x3386bc;VisuMZ[_0x4cb550(0x1db)](_0x50983d,_0x50983d);const _0x361174=_0x50983d[_0x4cb550(0x12e)],_0x506e96=_0x50983d[_0x4cb550(0x163)]['toUpperCase']()[_0x4cb550(0x178)]()===_0x4cb550(0x175);for(let _0x4046fe of _0x361174){_0x4046fe=(_0x4046fe||0x1)[_0x4cb550(0x18d)](0x1,0x64);const _0x2ff67e=$gameScreen[_0x4cb550(0xe6)](_0x4046fe);if(!_0x2ff67e)continue;try{if('bfQjc'==='vBELk'){if(_0x3f8017[_0x4cb550(0x13f)]())_0xa80dca[_0x4cb550(0x1b4)](_0x1e3f03);}else{const _0x4f37b5=(Number(eval(_0x50983d['TargetPosition']))||0x0)[_0x4cb550(0x18d)](0x0,0xa),_0x55f1a2=ImageManager[_0x4cb550(0x1c5)](_0x4f37b5);_0x2ff67e['_targetX']=_0x55f1a2['x'],_0x2ff67e['_targetY']=_0x55f1a2['y'],_0x2ff67e[_0x4cb550(0x131)](_0x4f37b5);}}catch(_0x330844){if($gameTemp[_0x4cb550(0x13f)]())console[_0x4cb550(0x1b4)](_0x330844);}_0x2ff67e[_0x4cb550(0x141)](_0x50983d['Duration']),_0x2ff67e[_0x4cb550(0x1e7)](_0x50983d[_0x4cb550(0x1b9)]),_0x506e96&&(_0x2ff67e['_scaleX']*=-0x1,_0x2ff67e[_0x4cb550(0x1a9)]*=-0x1);}}),PluginManager['registerCommand'](pluginData[_0x3386bc(0x159)],_0x3386bc(0x171),_0x52dcb7=>{const _0x3ecf0b=_0x3386bc;VisuMZ['ConvertParams'](_0x52dcb7,_0x52dcb7);const _0x3910ee=_0x52dcb7[_0x3ecf0b(0x12e)],_0x19a3d3=_0x52dcb7[_0x3ecf0b(0x163)][_0x3ecf0b(0x17e)]()[_0x3ecf0b(0x178)]()===_0x3ecf0b(0x175);for(let _0x453a00 of _0x3910ee){_0x453a00=(_0x453a00||0x1)[_0x3ecf0b(0x18d)](0x1,0x64);const _0x541528=$gameScreen['picture'](_0x453a00);if(!_0x541528)continue;const _0x36c6dc=_0x541528['getVnBustPosition']()[_0x3ecf0b(0x18d)](0x0,0xa),_0x3fa958=ImageManager[_0x3ecf0b(0x1c5)](_0x36c6dc);_0x541528[_0x3ecf0b(0x1e5)]=_0x3fa958['x'],_0x541528['_targetY']=_0x3fa958['y'],_0x541528[_0x3ecf0b(0x131)](_0x36c6dc),_0x541528[_0x3ecf0b(0x141)](_0x52dcb7[_0x3ecf0b(0x1be)]),_0x541528[_0x3ecf0b(0x1e7)](_0x52dcb7['EasingType']),_0x19a3d3&&(_0x541528[_0x3ecf0b(0x13a)]*=-0x1,_0x541528[_0x3ecf0b(0x1a9)]*=-0x1);}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],_0x3386bc(0x18c),_0x2a5b3e=>{const _0x27d841=_0x3386bc;VisuMZ['ConvertParams'](_0x2a5b3e,_0x2a5b3e);const _0x4289d7=_0x2a5b3e[_0x27d841(0x12e)];for(let _0x7145ac of _0x4289d7){_0x7145ac=(_0x7145ac||0x1)[_0x27d841(0x18d)](0x1,0x64);const _0x5b62a6=$gameScreen[_0x27d841(0xe6)](_0x7145ac);if(!_0x5b62a6)continue;let _0x3ad113=_0x2a5b3e[_0x27d841(0x143)]||0x0,_0x29540e=_0x2a5b3e['ScaleY']||0x0;if(_0x5b62a6[_0x27d841(0x13a)]<0x0)_0x3ad113*=-0x1;if(_0x5b62a6[_0x27d841(0x16a)]<0x0)_0x29540e*=-0x1;_0x5b62a6[_0x27d841(0x14a)]>0x0?(_0x5b62a6[_0x27d841(0x1a9)]+=_0x3ad113,_0x5b62a6[_0x27d841(0x180)]+=_0x29540e):(_0x5b62a6[_0x27d841(0x1a9)]=_0x5b62a6[_0x27d841(0x13a)]+_0x3ad113,_0x5b62a6[_0x27d841(0x180)]=_0x5b62a6[_0x27d841(0x16a)]+_0x29540e),_0x5b62a6[_0x27d841(0x141)](_0x2a5b3e[_0x27d841(0x1be)]),_0x5b62a6['setEasingType']('Linear');}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],_0x3386bc(0xd6),_0x5d29ad=>{const _0x169cef=_0x3386bc;VisuMZ[_0x169cef(0x1db)](_0x5d29ad,_0x5d29ad);const _0xd42cae=_0x5d29ad[_0x169cef(0x12e)];for(let _0x4026d9 of _0xd42cae){if(_0x169cef(0x11b)!==_0x169cef(0x16b)){_0x4026d9=(_0x4026d9||0x1)[_0x169cef(0x18d)](0x1,0x64);const _0x28cee6=$gameScreen[_0x169cef(0xe6)](_0x4026d9);if(!_0x28cee6)continue;if(_0x5d29ad[_0x169cef(0x1eb)][_0x169cef(0x17e)]()['trim']()!==_0x169cef(0xc2))try{const _0x1a47b3=eval(_0x5d29ad[_0x169cef(0x1eb)]),_0x26924c=_0x28cee6[_0x169cef(0x13a)]<0x0?-0x1:0x1;_0x28cee6['_targetScaleX']=_0x1a47b3*_0x26924c;}catch(_0x291ded){if($gameTemp[_0x169cef(0x13f)]())console['log'](_0x291ded);}if(_0x5d29ad['TargetScaleY'][_0x169cef(0x17e)]()[_0x169cef(0x178)]()!==_0x169cef(0xc2)){if(_0x169cef(0x148)!=='hnkMJ'){const _0x56fc2a=this[_0x169cef(0x14a)];_0x3725f1['VNPictureBusts'][_0x169cef(0x1b7)][_0x169cef(0xe7)](this),_0x56fc2a>0x0&&this[_0x169cef(0x14a)]<=0x0&&(this['_x']=this['_targetX'],this['_y']=this[_0x169cef(0x1d5)],this[_0x169cef(0x13a)]=this['_targetScaleX'],this[_0x169cef(0x16a)]=this[_0x169cef(0x180)],this[_0x169cef(0x1c6)]=this['_targetOpacity'],this[_0x169cef(0x17b)]&&(this[_0x169cef(0x17b)]['x']=this['_targetAnchor']['x'],this[_0x169cef(0x17b)]['y']=this[_0x169cef(0x198)]['y']));}else try{if(_0x169cef(0x10a)===_0x169cef(0x10a)){const _0x95ea13=eval(_0x5d29ad[_0x169cef(0x134)]),_0x4e7446=_0x28cee6[_0x169cef(0x16a)]<0x0?-0x1:0x1;_0x28cee6[_0x169cef(0x180)]=_0x95ea13*_0x4e7446;}else this[_0x169cef(0x157)](_0x4f1a0c);}catch(_0x5cbc43){if($gameTemp[_0x169cef(0x13f)]())console[_0x169cef(0x1b4)](_0x5cbc43);}}_0x28cee6[_0x169cef(0x141)](_0x5d29ad['Duration']),_0x28cee6['setEasingType'](_0x169cef(0x184));}else{const _0x18b556=(_0x11630e(_0x372461(_0x3c3cbf[_0x169cef(0xc7)]))||0x0)[_0x169cef(0x18d)](0x0,0xa),_0x40c4f4=_0x454260[_0x169cef(0x1c5)](_0x18b556);_0x29e661[_0x169cef(0x1e5)]=_0x40c4f4['x'],_0x23b332[_0x169cef(0x1d5)]=_0x40c4f4['y'],_0x2c1f8d[_0x169cef(0x131)](_0x18b556);}}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],_0x3386bc(0x10d),_0xfa5ec9=>{const _0x80d6f1=_0x3386bc;VisuMZ['ConvertParams'](_0xfa5ec9,_0xfa5ec9);const _0x19d0c1=_0xfa5ec9[_0x80d6f1(0x12e)],_0x2d1e4a=VisuMZ[_0x80d6f1(0xca)][_0x80d6f1(0xf1)];for(let _0x472df9 of _0x19d0c1){if('zGLZd'!==_0x80d6f1(0x162)){for(const _0x2d7c5f of this[_0x80d6f1(0x183)]){!_0x2d7c5f[_0x80d6f1(0x17c)]()&&this[_0x80d6f1(0x1e0)](_0x2d7c5f);}this['processPictureAnimationRequests']();}else{_0x472df9=(_0x472df9||0x1)['clamp'](0x1,0x64);const _0xdf6312=$gameScreen['picture'](_0x472df9);if(!_0xdf6312)continue;_0xdf6312[_0x80d6f1(0x1a9)]=_0x2d1e4a[_0x80d6f1(0x143)]*(_0xdf6312[_0x80d6f1(0x13a)]>0x0?0x1:-0x1),_0xdf6312[_0x80d6f1(0x180)]=_0x2d1e4a[_0x80d6f1(0x19e)]*(_0xdf6312[_0x80d6f1(0x16a)]>0x0?0x1:-0x1),_0xdf6312[_0x80d6f1(0x141)](_0xfa5ec9['Duration']),_0xdf6312[_0x80d6f1(0x1e7)](_0x80d6f1(0x184));}}}),PluginManager[_0x3386bc(0xda)](pluginData['name'],_0x3386bc(0x170),_0x2d7403=>{const _0x44bafd=_0x3386bc;VisuMZ[_0x44bafd(0x1db)](_0x2d7403,_0x2d7403);const _0x4ccf14=_0x2d7403[_0x44bafd(0x12e)],_0x3ed0bf=_0x2d7403[_0x44bafd(0x15c)]||0x0,_0x11a4b8=_0x2d7403[_0x44bafd(0x122)]||0x0;for(let _0x319a93 of _0x4ccf14){_0x319a93=(_0x319a93||0x1)[_0x44bafd(0x18d)](0x1,0x64);const _0x5a0492=$gameScreen[_0x44bafd(0xe6)](_0x319a93);if(!_0x5a0492)continue;const _0x4e430a=_0x5a0492[_0x44bafd(0x1ce)]();_0x4e430a[_0x44bafd(0x111)]=!![],_0x4e430a[_0x44bafd(0x1a1)][_0x44bafd(0xd7)]=_0x3ed0bf,_0x4e430a[_0x44bafd(0xe0)][_0x44bafd(0xd7)]=_0x11a4b8,_0x5a0492[_0x44bafd(0x1c9)](_0x4e430a);}}),PluginManager[_0x3386bc(0xda)](pluginData['name'],'Swaying_Disable',_0x2e2f95=>{const _0x8be762=_0x3386bc;VisuMZ[_0x8be762(0x1db)](_0x2e2f95,_0x2e2f95);const _0x36f370=_0x2e2f95[_0x8be762(0x12e)];for(let _0x55449f of _0x36f370){if(_0x8be762(0xcf)==='iaeIP'){let _0x776855=_0x355adf[_0x8be762(0xca)]['Game_Picture_angle'][_0x8be762(0xe7)](this);return _0x776855+=this[_0x8be762(0xf0)](),_0x776855;}else{_0x55449f=(_0x55449f||0x1)[_0x8be762(0x18d)](0x1,0x64);const _0x3bec9f=$gameScreen[_0x8be762(0xe6)](_0x55449f);if(!_0x3bec9f)continue;const _0x322076=_0x3bec9f[_0x8be762(0x1ce)]();_0x322076[_0x8be762(0x111)]=![],_0x3bec9f['setVnPictureSwayingSettings'](_0x322076);}}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],_0x3386bc(0xd4),_0x381009=>{const _0x57f9b7=_0x3386bc;VisuMZ[_0x57f9b7(0x1db)](_0x381009,_0x381009);const _0x24eb0a=_0x381009[_0x57f9b7(0x12e)],_0xfcff96=VisuMZ['VNPictureBusts'][_0x57f9b7(0xf1)][_0x57f9b7(0x1ee)];for(let _0x49cbac of _0x24eb0a){if(_0x57f9b7(0x182)===_0x57f9b7(0x189)){_0x4779bc['setEasingType'](_0xb210a9[_0x57f9b7(0x1b9)]),_0x3f23e2[_0x57f9b7(0x131)](_0x574f77);if(_0x28ffec===_0x57f9b7(0xd0))_0x43e28b['setVnBustAnchor'](!![],!![]);}else{_0x49cbac=(_0x49cbac||0x1)[_0x57f9b7(0x18d)](0x1,0x64);const _0x4b30d2=$gameScreen['picture'](_0x49cbac);if(!_0x4b30d2)continue;_0x4b30d2[_0x57f9b7(0x188)](_0xfcff96,_0x381009[_0x57f9b7(0x1be)]);}}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],'Tone_DimBust',_0xe39db2=>{const _0x108b77=_0x3386bc;VisuMZ['ConvertParams'](_0xe39db2,_0xe39db2);const _0x2c5233=_0xe39db2['PictureID'],_0x361cf3=VisuMZ['VNPictureBusts'][_0x108b77(0xf1)][_0x108b77(0xf9)];for(let _0x10771c of _0x2c5233){if(_0x108b77(0x164)===_0x108b77(0x164)){_0x10771c=(_0x10771c||0x1)['clamp'](0x1,0x64);const _0xf9db17=$gameScreen[_0x108b77(0xe6)](_0x10771c);if(!_0xf9db17)continue;_0xf9db17[_0x108b77(0x188)](_0x361cf3,_0xe39db2[_0x108b77(0x1be)]);}else this[_0x108b77(0x11f)]([_0x1861da],_0x1f4087,_0x2ca13e,_0x247cec),_0x2cff53+=_0x4597d7;}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],'Tone_NormalBust',_0x15b177=>{const _0x1cd3dc=_0x3386bc;VisuMZ[_0x1cd3dc(0x1db)](_0x15b177,_0x15b177);const _0xc9440d=_0x15b177[_0x1cd3dc(0x12e)],_0x23598e=[0x0,0x0,0x0,0x0];for(let _0x4ffda3 of _0xc9440d){_0x4ffda3=(_0x4ffda3||0x1)[_0x1cd3dc(0x18d)](0x1,0x64);const _0xc4a378=$gameScreen[_0x1cd3dc(0xe6)](_0x4ffda3);if(!_0xc4a378)continue;_0xc4a378['tint'](_0x23598e,_0x15b177[_0x1cd3dc(0x1be)]);}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],_0x3386bc(0xdf),_0x2ec8a3=>{const _0x5848aa=_0x3386bc;VisuMZ[_0x5848aa(0x1db)](_0x2ec8a3,_0x2ec8a3);const _0x5a020c=_0x2ec8a3[_0x5848aa(0x12e)];let _0x19c9e4=[0x0,0x0,0x0,0x0];switch(_0x2ec8a3[_0x5848aa(0x1c0)][_0x5848aa(0x17e)]()[_0x5848aa(0x178)]()){case _0x5848aa(0x1dc):_0x19c9e4=[0x0,0x0,0x0,0x0];break;case _0x5848aa(0x125):_0x19c9e4=[-0x44,-0x44,-0x44,0x0];break;case _0x5848aa(0x12d):_0x19c9e4=[0x22,-0x22,-0x44,0xaa];break;case _0x5848aa(0x1ad):_0x19c9e4=[0x44,-0x22,-0x22,0x0];break;case _0x5848aa(0x1e4):_0x19c9e4=[-0x44,-0x44,0x0,0x44];break;}for(let _0x5adf61 of _0x5a020c){_0x5adf61=(_0x5adf61||0x1)[_0x5848aa(0x18d)](0x1,0x64);const _0x2da23d=$gameScreen['picture'](_0x5adf61);if(!_0x2da23d)continue;_0x2da23d[_0x5848aa(0x188)](_0x19c9e4,_0x2ec8a3[_0x5848aa(0x1be)]);}}),PluginManager[_0x3386bc(0xda)](pluginData[_0x3386bc(0x159)],_0x3386bc(0x12f),_0x505fd1=>{const _0x24df84=_0x3386bc;VisuMZ['ConvertParams'](_0x505fd1,_0x505fd1);const _0x5dfa91=_0x505fd1[_0x24df84(0x12e)],_0x59f408=_0x505fd1['customTone'];for(let _0x9ec2ac of _0x5dfa91){if(_0x24df84(0x14c)!==_0x24df84(0x14c))_0x5160d0[_0x24df84(0xc8)](_0x5dd521);else{_0x9ec2ac=(_0x9ec2ac||0x1)[_0x24df84(0x18d)](0x1,0x64);const _0x59c29f=$gameScreen[_0x24df84(0xe6)](_0x9ec2ac);if(!_0x59c29f)continue;_0x59c29f[_0x24df84(0x188)](_0x59f408,_0x505fd1[_0x24df84(0x1be)]);}}}),ImageManager[_0x3386bc(0x1c5)]=function(_0x39bd5b){const _0x107592=_0x3386bc;if(!this[_0x107592(0x12c)]){if(_0x107592(0x145)!==_0x107592(0x145))_0x2a3ec4[_0x107592(0x13a)]*=-0x1;else{const _0x2f7132={},_0x5b9435=VisuMZ['VNPictureBusts']['Settings'];for(let _0x4ff712=0x0;_0x4ff712<=0xa;_0x4ff712++){const _0xfbce36=Math['round'](_0x5b9435[_0x107592(0x17f)](_0x4ff712)),_0x443e6e=Math[_0x107592(0x142)](_0x5b9435[_0x107592(0x133)](_0x4ff712));_0x2f7132[_0x4ff712]={'x':_0xfbce36,'y':_0x443e6e};}this[_0x107592(0x12c)]=_0x2f7132;}}return this[_0x107592(0x12c)][_0x39bd5b]||new{'x':0x0,'y':0x0}();},VisuMZ['VNPictureBusts'][_0x3386bc(0x140)]=Game_Temp['prototype']['initialize'],Game_Temp[_0x3386bc(0x1b0)][_0x3386bc(0x128)]=function(){const _0x560941=_0x3386bc;VisuMZ['VNPictureBusts'][_0x560941(0x140)][_0x560941(0xe7)](this),this[_0x560941(0x115)]=[];},Game_Temp['prototype'][_0x3386bc(0xfb)]=function(_0x4c9861,_0x3e2a08,_0x2e3695){const _0x26239d=_0x3386bc;_0x2e3695=_0x2e3695||![];if($dataAnimations[_0x3e2a08]){const _0x5771cf={'targets':_0x4c9861,'animationId':_0x3e2a08,'mirror':_0x2e3695};this[_0x26239d(0x115)]['push'](_0x5771cf);for(const _0x96ddbe of _0x4c9861){if(_0x26239d(0x109)==='BoMMe'){if(_0x574951[_0x26239d(0x13f)]())_0x4f200c['log'](_0x41d2a4);}else _0x96ddbe[_0x26239d(0x135)]&&_0x96ddbe[_0x26239d(0x135)]();}}},Game_Temp[_0x3386bc(0x1b0)]['retrievePictureAnimation']=function(){const _0xa44c9=_0x3386bc;return this[_0xa44c9(0x115)][_0xa44c9(0x110)]();},Game_Screen[_0x3386bc(0x1b0)]['vnAutoErasePicture']=function(_0x27e37d,_0xd10dc0){const _0x7cd869=_0x3386bc;if(_0xd10dc0<0x0)return;const _0x278126=this['picture'](_0x27e37d);if(!_0x278126)return;if(_0x278126[_0x7cd869(0x1c6)]<=0x0)'CIhrK'!=='CIhrK'?(_0x3bba1d[_0x7cd869(0x1a9)]+=_0x36f15f,_0x3233df[_0x7cd869(0x180)]+=_0x3d5865):this['erasePicture'](_0x27e37d);else{_0xd10dc0-=0x1;const _0x1509bd=0x64;setTimeout(this[_0x7cd869(0x15e)][_0x7cd869(0x18f)](this,_0x27e37d,_0xd10dc0),_0x1509bd);}},VisuMZ[_0x3386bc(0xca)][_0x3386bc(0x1ed)]=Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x128)],Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x128)]=function(){const _0xa21645=_0x3386bc;VisuMZ[_0xa21645(0xca)]['Game_Picture_initialize'][_0xa21645(0xe7)](this),this['initVnPictureBusts'](),this[_0xa21645(0xd9)]();},Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x1a6)]=function(){this['_vnPictureBustPosition']=-0x1;},Game_Picture['prototype'][_0x3386bc(0xd9)]=function(){const _0x4c5aed=_0x3386bc;this[_0x4c5aed(0x155)]={'enabled':![],'speed':{'x':0x1e,'y':0x1e},'rate':{'x':0.1,'y':0.5}},this[_0x4c5aed(0x1c8)]={'enabled':![],'speed':{'x':0x1e,'y':0x1e},'rate':{'x':0x5,'y':0x0}},this[_0x4c5aed(0x186)]={'enabled':![],'speed':{'angle':0x1e},'rate':{'angle':0x5}};},VisuMZ[_0x3386bc(0xca)][_0x3386bc(0x1b7)]=Game_Picture['prototype'][_0x3386bc(0x197)],Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x197)]=function(){const _0x331965=_0x3386bc,_0x25bd7d=this[_0x331965(0x14a)];VisuMZ[_0x331965(0xca)][_0x331965(0x1b7)]['call'](this),_0x25bd7d>0x0&&this[_0x331965(0x14a)]<=0x0&&(this['_x']=this[_0x331965(0x1e5)],this['_y']=this['_targetY'],this[_0x331965(0x13a)]=this['_targetScaleX'],this[_0x331965(0x16a)]=this['_targetScaleY'],this[_0x331965(0x1c6)]=this[_0x331965(0x1e6)],this[_0x331965(0x17b)]&&(this[_0x331965(0x17b)]['x']=this[_0x331965(0x198)]['x'],this['_anchor']['y']=this['_targetAnchor']['y']));},Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x131)]=function(_0x190096){const _0x2d3f0d=_0x3386bc;_0x190096=Number(_0x190096)||0x0,this[_0x2d3f0d(0x1a8)]=_0x190096;},Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x16f)]=function(){const _0x46fc59=_0x3386bc;return this[_0x46fc59(0x1a8)]===undefined&&this[_0x46fc59(0x1a6)](),this[_0x46fc59(0x1a8)];},Game_Picture['prototype'][_0x3386bc(0x156)]=function(_0x19584c,_0x2929c1){const _0x3a9d7b=_0x3386bc,_0x45df69=VisuMZ['VNPictureBusts'][_0x3a9d7b(0xf1)],_0x1cfae0={'x':_0x45df69[_0x3a9d7b(0x165)],'y':_0x45df69['AnchorY']};if(_0x19584c)this['setAnchor'](_0x1cfae0);if(_0x2929c1||this[_0x3a9d7b(0x14a)]<=0x0)this[_0x3a9d7b(0xf2)](_0x1cfae0);},Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x169)]=function(_0x4ea018){const _0x24cb75=_0x3386bc,_0x5015da=ImageManager['loadPicture'](_0x4ea018);_0x5015da[_0x24cb75(0x1ca)](this['vnPostChangeGraphic']['bind'](this,_0x4ea018));},Game_Picture['prototype'][_0x3386bc(0x161)]=function(_0x19ef60){const _0x46c3e0=_0x3386bc;if(this)this[_0x46c3e0(0x179)]=_0x19ef60;},Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x141)]=function(_0x30cb7e){const _0x5145b9=_0x3386bc;_0x30cb7e=Math[_0x5145b9(0x129)](_0x30cb7e,0x1),this[_0x5145b9(0x14a)]=_0x30cb7e,this[_0x5145b9(0x15b)]=_0x30cb7e;},Game_Picture[_0x3386bc(0x1b0)]['getVnPictureBreathingSettings']=function(){const _0x451897=_0x3386bc;if(this[_0x451897(0x155)]===undefined)this[_0x451897(0xd9)]();return this[_0x451897(0x155)];},Game_Picture['prototype'][_0x3386bc(0x1f1)]=function(_0x8aca7){const _0x5039b1=_0x3386bc;if(this[_0x5039b1(0x155)]===undefined)this['initVnPictureSlightMovements']();this[_0x5039b1(0x155)]=JSON[_0x5039b1(0x147)](JSON[_0x5039b1(0x1c4)](_0x8aca7));},VisuMZ[_0x3386bc(0xca)]['Game_Picture_scaleX']=Game_Picture['prototype'][_0x3386bc(0x185)],Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x185)]=function(){const _0x18e835=_0x3386bc;let _0x5112c5=VisuMZ[_0x18e835(0xca)]['Game_Picture_scaleX'][_0x18e835(0xe7)](this);return _0x5112c5+=this[_0x18e835(0x13c)](),_0x5112c5;},Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x13c)]=function(){const _0x20d291=_0x3386bc,_0x310f1b=this['getVnPictureBreathingSettings']();if(!_0x310f1b[_0x20d291(0x111)])return 0x0;const _0x1e405f=Graphics['frameCount'],_0x3d909d=_0x310f1b['speed']['x']||0.01,_0x52eae9=_0x310f1b['rate']['x'];return Math[_0x20d291(0x1af)](_0x1e405f/_0x3d909d)*_0x52eae9;},VisuMZ[_0x3386bc(0xca)]['Game_Picture_scaleY']=Game_Picture[_0x3386bc(0x1b0)]['scaleY'],Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x10c)]=function(){const _0x838850=_0x3386bc;let _0x3325a3=VisuMZ[_0x838850(0xca)][_0x838850(0x150)][_0x838850(0xe7)](this);return _0x3325a3+=this[_0x838850(0x1ef)](),_0x3325a3;},Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x1ef)]=function(){const _0x5a4a12=_0x3386bc,_0x3aa925=this['getVnPictureBreathingSettings']();if(!_0x3aa925[_0x5a4a12(0x111)])return 0x0;const _0x5f2a88=Graphics[_0x5a4a12(0xf8)],_0x964987=_0x3aa925[_0x5a4a12(0x1a1)]['y']||0.01,_0x3f7090=_0x3aa925['rate']['y'];return Math[_0x5a4a12(0x1af)](_0x5f2a88/_0x964987)*_0x3f7090;},Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0xe1)]=function(){const _0x2ece38=_0x3386bc;if(this[_0x2ece38(0x1c8)]===undefined)this['initVnPictureSlightMovements']();return this[_0x2ece38(0x1c8)];},Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x1e3)]=function(_0x1119d5){const _0x53e035=_0x3386bc;if(this[_0x53e035(0x1c8)]===undefined)this[_0x53e035(0xd9)]();this[_0x53e035(0x1c8)]=JSON[_0x53e035(0x147)](JSON[_0x53e035(0x1c4)](_0x1119d5));},Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x126)]=function(){const _0x2418e3=_0x3386bc;return this[_0x2418e3(0xe1)]()[_0x2418e3(0x111)];},VisuMZ[_0x3386bc(0xca)]['Game_Picture_x']=Game_Picture[_0x3386bc(0x1b0)]['x'],Game_Picture[_0x3386bc(0x1b0)]['x']=function(){const _0x58d3af=_0x3386bc;let _0x16df63=VisuMZ[_0x58d3af(0xca)][_0x58d3af(0x1e9)][_0x58d3af(0xe7)](this);return _0x16df63+=this[_0x58d3af(0x168)](),_0x16df63;},Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x168)]=function(){const _0x28060c=_0x3386bc,_0x57f694=this['getVnPictureFidgetingSettings']();if(!_0x57f694[_0x28060c(0x111)])return 0x0;const _0x4a73bc=Graphics[_0x28060c(0xf8)],_0x3e7b97=_0x57f694[_0x28060c(0x1a1)]['x']||0.01,_0x50efc9=_0x57f694[_0x28060c(0xe0)]['x'];return Math[_0x28060c(0x1af)](_0x4a73bc/_0x3e7b97)*_0x50efc9;},VisuMZ[_0x3386bc(0xca)]['Game_Picture_y']=Game_Picture['prototype']['y'],Game_Picture[_0x3386bc(0x1b0)]['y']=function(){const _0x394696=_0x3386bc;let _0x4516de=VisuMZ['VNPictureBusts'][_0x394696(0x105)][_0x394696(0xe7)](this);return _0x4516de+=this['applyVnFidgetingScaleY'](),_0x4516de;},Game_Picture[_0x3386bc(0x1b0)]['applyVnFidgetingScaleY']=function(){const _0x2c8180=_0x3386bc,_0x2a969d=this[_0x2c8180(0xe1)]();if(!_0x2a969d[_0x2c8180(0x111)])return 0x0;const _0x3d2ccd=Graphics['frameCount'],_0x112de0=_0x2a969d[_0x2c8180(0x1a1)]['y']||0.01,_0x245274=_0x2a969d[_0x2c8180(0xe0)]['y'];return Math[_0x2c8180(0x1af)](_0x3d2ccd/_0x112de0)*(_0x245274/0x2)+_0x245274/0x2;},VisuMZ[_0x3386bc(0xca)][_0x3386bc(0x144)]=Sprite_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x12a)],Sprite_Picture[_0x3386bc(0x1b0)][_0x3386bc(0x12a)]=function(){const _0x2278a1=_0x3386bc;this[_0x2278a1(0xe6)]()[_0x2278a1(0x126)]()?this[_0x2278a1(0x19f)]():VisuMZ[_0x2278a1(0xca)][_0x2278a1(0x144)][_0x2278a1(0xe7)](this);},Sprite_Picture['prototype'][_0x3386bc(0x19f)]=function(){const _0x20f9b6=_0x3386bc,_0x38c912=this[_0x20f9b6(0xe6)]();this['x']=_0x38c912['x'](),this['y']=_0x38c912['y']();},Game_Picture['prototype'][_0x3386bc(0x1ce)]=function(){const _0x49ae27=_0x3386bc;if(this[_0x49ae27(0x186)]===undefined)this[_0x49ae27(0xd9)]();return this[_0x49ae27(0x186)];},Game_Picture[_0x3386bc(0x1b0)]['setVnPictureSwayingSettings']=function(_0x30de36){const _0x4fee96=_0x3386bc;if(this['_vnSwaying']===undefined)this[_0x4fee96(0xd9)]();this[_0x4fee96(0x186)]=JSON['parse'](JSON['stringify'](_0x30de36));},VisuMZ['VNPictureBusts']['Game_Picture_angle']=Game_Picture['prototype']['angle'],Game_Picture[_0x3386bc(0x1b0)][_0x3386bc(0xd7)]=function(){const _0x240403=_0x3386bc;let _0x3a7453=VisuMZ['VNPictureBusts'][_0x240403(0x1e1)][_0x240403(0xe7)](this);return _0x3a7453+=this['applyVnSwaying'](),_0x3a7453;},Game_Picture[_0x3386bc(0x1b0)]['applyVnSwaying']=function(){const _0x5e85ff=_0x3386bc,_0x5733c3=this[_0x5e85ff(0x1ce)]();if(!_0x5733c3['enabled'])return 0x0;const _0x4b9cc0=Graphics[_0x5e85ff(0xf8)],_0x4c3987=_0x5733c3['speed'][_0x5e85ff(0xd7)]||0.01,_0x14e27f=_0x5733c3['rate'][_0x5e85ff(0xd7)];return Math[_0x5e85ff(0x1af)](_0x4b9cc0/_0x4c3987)*_0x14e27f;},VisuMZ[_0x3386bc(0xca)][_0x3386bc(0xc3)]=Game_Interpreter[_0x3386bc(0x1b0)][_0x3386bc(0x187)],Game_Interpreter[_0x3386bc(0x1b0)][_0x3386bc(0x187)]=function(){const _0x15d3c3=_0x3386bc;if(this[_0x15d3c3(0xe3)]===_0x15d3c3(0x11d)){if(SceneManager['_scene'][_0x15d3c3(0xcb)]['isPictureAnimationPlaying']())return!![];this[_0x15d3c3(0xe3)]='';}return VisuMZ['VNPictureBusts'][_0x15d3c3(0xc3)]['call'](this);},VisuMZ[_0x3386bc(0xca)]['Spriteset_Base_createPictures']=Spriteset_Base['prototype'][_0x3386bc(0x17a)],Spriteset_Base[_0x3386bc(0x1b0)][_0x3386bc(0x17a)]=function(){const _0x1878c3=_0x3386bc;VisuMZ[_0x1878c3(0xca)]['Spriteset_Base_createPictures'][_0x1878c3(0xe7)](this),this[_0x1878c3(0x108)]();},Spriteset_Base[_0x3386bc(0x1b0)][_0x3386bc(0x108)]=function(){const _0x2fc5ad=_0x3386bc,_0x11b987=new Sprite();this['addChild'](_0x11b987);const _0x2b7d21=this[_0x2fc5ad(0x1d7)]();_0x11b987[_0x2fc5ad(0xfa)](_0x2b7d21['x'],_0x2b7d21['y'],_0x2b7d21[_0x2fc5ad(0x191)],_0x2b7d21['height']),this[_0x2fc5ad(0xce)]=_0x11b987;},VisuMZ['VNPictureBusts']['Spriteset_Base_updateAnimations']=Spriteset_Base[_0x3386bc(0x1b0)]['updateAnimations'],Spriteset_Base['prototype']['updateAnimations']=function(){const _0x15b5bb=_0x3386bc;VisuMZ[_0x15b5bb(0xca)][_0x15b5bb(0x195)][_0x15b5bb(0xe7)](this),this[_0x15b5bb(0x19c)]();},Spriteset_Base['prototype'][_0x3386bc(0x19c)]=function(){const _0x135034=_0x3386bc;for(const _0x71d477 of this[_0x135034(0x183)]){if(!_0x71d477[_0x135034(0x17c)]()){if('kAPbe'===_0x135034(0x1ba))this['removePictureAnimation'](_0x71d477);else{const _0xb16d8d=this[_0x135034(0xeb)]();if(!_0xb16d8d['enabled'])return 0x0;const _0x56cd47=_0x5bfc2a[_0x135034(0xf8)],_0x920821=_0xb16d8d['speed']['y']||0.01,_0x16348=_0xb16d8d[_0x135034(0xe0)]['y'];return _0x598d36[_0x135034(0x1af)](_0x56cd47/_0x920821)*_0x16348;}}}this[_0x135034(0x1a2)]();},Spriteset_Base['prototype'][_0x3386bc(0x1a2)]=function(){const _0x4080f3=_0x3386bc;for(;;){const _0x4d60bf=$gameTemp['retrievePictureAnimation']();if(_0x4d60bf)_0x4080f3(0xdc)!==_0x4080f3(0xdc)?(_0x274ffc[_0x4080f3(0xca)][_0x4080f3(0x1ed)][_0x4080f3(0xe7)](this),this[_0x4080f3(0x1a6)](),this[_0x4080f3(0xd9)]()):this[_0x4080f3(0x157)](_0x4d60bf);else break;}},Spriteset_Base[_0x3386bc(0x1b0)][_0x3386bc(0x157)]=function(_0x40f74f){const _0x345fc1=_0x3386bc,_0x259529=$dataAnimations[_0x40f74f[_0x345fc1(0x1bb)]],_0x1d668f=_0x40f74f[_0x345fc1(0x1a3)],_0x1179a9=_0x40f74f[_0x345fc1(0x158)];let _0x53b2a0=this[_0x345fc1(0x1ae)]();const _0x12a8c6=this[_0x345fc1(0x104)]();if(this[_0x345fc1(0x116)](_0x259529))for(const _0x4300ff of _0x1d668f){'AFcpA'===_0x345fc1(0x13b)?_0x461c12=!_0x3084e1:(this[_0x345fc1(0x11f)]([_0x4300ff],_0x259529,_0x1179a9,_0x53b2a0),_0x53b2a0+=_0x12a8c6);}else _0x345fc1(0x196)===_0x345fc1(0xee)?_0x25a222[_0x345fc1(0x1d5)]+=_0x1eddd4:this[_0x345fc1(0x11f)](_0x1d668f,_0x259529,_0x1179a9,_0x53b2a0);},Spriteset_Base[_0x3386bc(0x1b0)][_0x3386bc(0x11f)]=function(_0x1eeb1f,_0x1deb98,_0x4e3651,_0x584956){const _0x4cd889=_0x3386bc,_0x49fbbd=this[_0x4cd889(0xd5)](_0x1deb98),_0xbe61de=new(_0x49fbbd?Sprite_AnimationMV:Sprite_Animation)(),_0x581b85=this['makePictureTargetSprites'](_0x1eeb1f),_0x434827=this[_0x4cd889(0x1ae)](),_0x20c287=_0x584956>_0x434827?this[_0x4cd889(0x1a0)]():null;if(this[_0x4cd889(0x1c2)](_0x1eeb1f[0x0])){if(_0x4cd889(0x1a4)==='nrqnE')return this['_pictureAnimationQueue'][_0x4cd889(0x110)]();else _0x4e3651=!_0x4e3651;}_0xbe61de['targetObjects']=_0x1eeb1f,_0xbe61de[_0x4cd889(0x1cd)](_0x581b85,_0x1deb98,_0x4e3651,_0x584956,_0x20c287),this['_pictureEffectsContainer']['addChild'](_0xbe61de),this['_animationSprites'][_0x4cd889(0xc8)](_0xbe61de);},Spriteset_Base['prototype']['makePictureTargetSprites']=function(_0x4f1418){const _0x31d374=_0x3386bc,_0x476dad=[];for(const _0xda8354 of _0x4f1418){const _0x5aeda8=this[_0x31d374(0x154)](_0xda8354);if(_0x5aeda8){if('OPgSb'===_0x31d374(0x1d2))_0x476dad['push'](_0x5aeda8);else return![];}}return _0x476dad;},Spriteset_Base[_0x3386bc(0x1b0)][_0x3386bc(0x154)]=function(_0x5c1d38){const _0x409147=_0x3386bc;return this[_0x409147(0x114)][_0x409147(0x16d)][_0x409147(0xdb)](_0x5ddfc5=>_0x5ddfc5[_0x409147(0x100)]===_0x5c1d38);},Spriteset_Base[_0x3386bc(0x1b0)][_0x3386bc(0x1e0)]=function(_0x257684){const _0x104750=_0x3386bc;this[_0x104750(0x183)][_0x104750(0x192)](_0x257684),this['_pictureEffectsContainer'][_0x104750(0x1ec)](_0x257684);for(const _0x26e7e0 of _0x257684['targetObjects']){_0x26e7e0[_0x104750(0x130)]&&_0x26e7e0[_0x104750(0x130)]();}_0x257684[_0x104750(0xd8)]();},VisuMZ[_0x3386bc(0xca)][_0x3386bc(0xc9)]=Spriteset_Base[_0x3386bc(0x1b0)][_0x3386bc(0xed)],Spriteset_Base['prototype'][_0x3386bc(0xed)]=function(){const _0x2cfdcf=_0x3386bc;VisuMZ[_0x2cfdcf(0xca)]['Spriteset_Base_removeAllAnimations'][_0x2cfdcf(0xe7)](this),this[_0x2cfdcf(0xcd)]();},Spriteset_Base[_0x3386bc(0x1b0)][_0x3386bc(0xcd)]=function(){const _0x2c3ce8=_0x3386bc;for(const _0x37bd1e of this[_0x2c3ce8(0x183)][_0x2c3ce8(0x1d1)]()){if('CMqMi'===_0x2c3ce8(0x18a)){if(_0x45ee41<0x0)return;const _0x3ba405=this['picture'](_0x198eea);if(!_0x3ba405)return;if(_0x3ba405[_0x2c3ce8(0x1c6)]<=0x0)this['erasePicture'](_0x6f414f);else{_0x2dffcd-=0x1;const _0x3f5014=0x64;_0x29a75d(this[_0x2c3ce8(0x15e)][_0x2c3ce8(0x18f)](this,_0x5800fd,_0x2462e0),_0x3f5014);}}else this[_0x2c3ce8(0x1e0)](_0x37bd1e);}},Spriteset_Base[_0x3386bc(0x1b0)][_0x3386bc(0x173)]=function(){const _0x5aa554=_0x3386bc,_0x19cbe0=this[_0x5aa554(0xce)];return _0x19cbe0&&_0x19cbe0[_0x5aa554(0x16d)][_0x5aa554(0x1df)]>0x0;};