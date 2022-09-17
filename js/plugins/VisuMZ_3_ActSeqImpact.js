//=============================================================================
// VisuStella MZ - ActSeqImpact
// VisuMZ_3_ActSeqImpact.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ActSeqImpact = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ActSeqImpact = VisuMZ.ActSeqImpact || {};
VisuMZ.ActSeqImpact.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.07] [ActSeqImpact]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Action_Sequence_Impact_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * With the aid of Pixi JS Filters, this plugin adds more impact to battle by
 * producing special on screen filter effects to make certain actions like
 * critical hits, guarding, and dodging more visibly different adding to the
 * flavor of the battle.
 * 
 * This plugin also adds new Action Sequences for the Battle Core, allowing
 * impacting effects like color breaks, motion blurs, shockwaves, motion
 * trails, and zoom blurs.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Creating a color break effect when landing critical hits akin to a
 *   chromatic aberration effect.
 * * A battler who dodges an attack will display a motion blur effect.
 * * Guarding damage will cause a shockwave effect.
 * * Adds new Action Sequences available from the Battle Core Plugin Commands.
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
 * * Pixi JS Filters*
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 * 
 * *Note* You can download the Pixi JS Filters plugin library from the below
 * URL or from the Action Sequence Impact product page. Install it as a
 * Tier 0 plugin.
 * 
 * *Note2* Pixi JS Filters perform differently on different machines/devices.
 * Please understand that this is outside of VisuStella's control.
 * 
 * URL: https://filters.pixijs.download/v3.1.0/pixi-filters.js
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * New Effects
 * ============================================================================
 * 
 * The following are new visual effects added through this plugin. These visual
 * effects are added and modified with the sense of adding more impact to
 * visuals in battle.
 *
 * ---
 * 
 * Bizarro Inversion
 * 
 * Swaps the blue/red colors on the battlefield. What was originally blue will
 * become red and what was originally red will become blue.
 * 
 * Anything that is attached to the battlefield will be affected. UI objects,
 * pictures, etc. that aren't attached to the battlefield will not be affected
 * by the effect. Depending on your settings, this may or may not include
 * battle animations, too.
 * 
 * ---
 * 
 * Color Break
 * 
 * When a critical hit occurs, the colors on the screen will break apart into
 * red, green, and blue into random directions and then come back together
 * similar to a chromatic aberration. This creates a sense of weight when
 * delivering a powerful strike.
 * 
 * This is optional and can be disabled.
 * 
 * This effect is also available as an Action Sequence in the Battle Core.
 * 
 * ---
 * 
 * Desaturation
 * 
 * Desaturates all colors on the battlefield. This will result in a black and
 * white greyscale effect.
 * 
 * Anything that is attached to the battlefield will be affected. UI objects,
 * pictures, etc. that aren't attached to the battlefield will not be affected
 * by the effect. Depending on your settings, this may or may not include
 * battle animations, too.
 * 
 * Created by Manu Gaming!
 * 
 * ---
 * 
 * Motion Blur
 * 
 * When a battler dodges an attack (either a miss or evasion proc), then the
 * battler will generate a motion blur effect. Their image splits apart in a
 * blurred manner and then fuses back together to become whole again. This
 * generates the illusion that they're hard to hit.
 * 
 * This is optional and can be disabled.
 * 
 * This effect is also available as an Action Sequence in the Battle Core.
 * There are two versions, one that affects only the battler while another that
 * affects the whole screen.
 * 
 * ---
 * 
 * Motion Trail
 * 
 * If motion trails are enabled on a battler, whenever they move, they leave
 * behind a residual sprite of their motion during that particular frame. The
 * motion blurs aid in visualizing the path the battler moved in case the
 * battler's movement trajectory is normally too fast to portray. Motion trails
 * can have different hue and/or tones.
 * 
 * This is an Action Sequence-only effect.
 * 
 * ---
 * 
 * Negative Inversion
 * 
 * Inverts all colors on the battlefield. They pretty much swap 180 degrees of
 * hue with whatever color is on the opposite side.
 * 
 * Anything that is attached to the battlefield will be affected. UI objects,
 * pictures, etc. that aren't attached to the battlefield will not be affected
 * by the effect. Depending on your settings, this may or may not include
 * battle animations, too.
 * 
 * Created by Manu Gaming!
 * 
 * ---
 * 
 * Oversaturation
 * 
 * Oversaturates all colors on the battlefield. Colors will become extra vivid
 * and look extremely concentrated. Brighter colors become brighter while
 * darker colors become darker.
 * 
 * Anything that is attached to the battlefield will be affected. UI objects,
 * pictures, etc. that aren't attached to the battlefield will not be affected
 * by the effect. Depending on your settings, this may or may not include
 * battle animations, too.
 * 
 * ---
 * 
 * Shockwave
 * 
 * When a guarding battler would receive HP damage (or manages to defend to 0
 * damage), a shockwave effect occurs to display the impact. The shockwave will
 * ripple out from the battler to the edges of the screen before disappearing.
 * 
 * This is optional and can be disabled.
 * 
 * This effect is also available as an Action Sequence in the Battle Core.
 * 
 * ---
 * 
 * Time Scale
 * 
 * This causes time to go slower or faster depending on the settings. All
 * things related to the game client will go slower or faster.
 * 
 * This only affects battle. The effects go away during the input phase or when
 * a message is present.
 * 
 * Created by Manu Gaming!
 * 
 * ---
 * 
 * Time Stop
 * 
 * The game client will pause time for set amount of time, only the music and
 * any sound effects continuing.
 * 
 * Created by Manu Gaming!
 * 
 * ---
 * 
 * Zoom Blur
 * 
 * A zoom blur will direct its focus at a specific point on the screen and
 * create a visual radial distortion towards that point. The intensity of the
 * zoom effect will diminish over the duration of the zoom blur. This helps
 * draw focus towards specific parts of the screen.
 * 
 * This is an Action Sequence-only effect.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * The following are Action Sequence Plugin Commands that have been added with
 * this plugin. These are accessible from the Battle Core plugin (not this one)
 * in order to keep all the Action Sequences in place.
 * 
 * Once again, these plugin commands are only accessible through the Battle
 * Core plugin and not this one! Make sure you have the most update to date
 * version of the Battle Core for them.
 *
 * ---
 * 
 * === Action Sequences - Impact ===
 * 
 * These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * IMPACT: Bizarro Inversion
 * - Swaps blue/red colors on the battlefield.
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Bizarro?:
 *   - Enable Bizarro Inversion effect?
 *
 * ---
 *
 * IMPACT: Color Break
 * - Breaks the colors on the screen before reassembling.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Intensity:
 *   - What is the intensity of the color break effect?
 *
 *   Duration:
 *   - What is the duration of the color break effect?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Desaturation
 * - Desaturates all colors on the battlefield.
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Desaturate?:
 *   - Enable Desaturation effect?
 *
 * ---
 *
 * IMPACT: Motion Blur Screen
 * - Creates a motion blur on the whole screen.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Target(s)
 * - Creates a motion blur on selected target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion blur effects for.
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Trail Create
 * - Creates a motion trail effect for the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion trail effects for.
 *
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less motion trails there are.
 *
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 *
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 *
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 *
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 *
 * ---
 *
 * IMPACT: Motion Trail Remove
 * - Removes the motion trail effect from the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Targets:
 *   - Select unit(s) to clear motion trail effects for.
 *
 * ---
 *
 * IMPACT: Negative Inversion
 * - Inverts all the colors on the battlefield.
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Negative?:
 *   - Enable Negative Inversion effect?
 *
 * ---
 *
 * IMPACT: Oversaturation
 * - Oversaturates colors on the battlefield.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Oversaturate?:
 *   - Enable Oversaturation effect?
 *
 * ---
 *
 * IMPACT: Shockwave at Point
 * - Creates a shockwave at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to create a shockwave at?
 *   - You can use JavaScript code.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Each Target(s)
 * - Creates a shockwave at each of the target(s) location(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Target(s) Center
 * - Creates a shockwave from the center of the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Time Scale
 * - Adjust time to go faster or slower!
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Scale:
 *   - Adjusts how fast/slow time goes.
 *   - 1.00 is normal. Lower is slower. Higher is faster.
 *
 * ---
 *
 * IMPACT: Time Stop
 * - Stops time for a set amount of milliseconds.
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Milliseconds:
 *   - How many milliseconds should time stop for?
 *   - 1000 milliseconds = 1 second.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Point
 * - Creates a zoom blur at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to focus the zoom at?
 *   - You can use JavaScript code.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Target(s) Center
 * - Creates a zoom blur at the center of targets.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a zoom blur from.
 *
 *   Target Location:
 *   - Select which part target group to start a zoom blur from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the zoom blur X/Y point by.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * === Action Sequences - Inject ===
 *
 * These Action Sequences are related to injecting sprite animations.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * ---
 * 
 * INJECT: Animation Begin
 * - Injects and plays a whole spritesheet animation.
 * - The spritesheet animation will play over the battler until it is finished.
 * - The battler's original sprite will be invisible until finished.
 * - Requires VisuMZ_3_ActSeqImpact!
 * 
 *   Targets:
 *   - Select unit(s) to inject the animation on.
 * 
 *   Filename:
 *   - Select the animation spritesheet file.
 *   - Located in the /img/sv_actors/ folder.
 * 
 *     Horizontal Cells:
 *     - How many horizontal cells (or columns) are there?
 * 
 *     Vertical Cells:
 *     - How many vertical cells (or rows) are there?
 * 
 *     Frame Delay:
 *     - How many frames are played inbetween cells?
 * 
 *     Smooth Bitmap?:
 *     - Smooth the spritesheet graphic?
 * 
 *   Offset:
 * 
 *     Offset X:
 *     - Offsets the X position of the injected animation.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - Offsets the Y position of the injected animation.
 *     - Negative: up. Positive: down.
 * 
 * ---
 * 
 * INJECT: Animation End
 * - Stops and ends any injected animations on target(s).
 * - Any inject animation will be prematurely terminated.
 * - Requires VisuMZ_3_ActSeqImpact!
 * 
 *   Targets:
 *   - Select unit(s) to stop injected animation(s).
 * 
 * ---
 * 
 * INJECT: Animation Pause/Resume
 * - Pauses/resumes any injected animations on target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 * 
 *   Targets:
 *   - Select unit(s) to pause/resume injected animation(s).
 * 
 *   Pause?:
 *   - Pause the injected animation?
 * 
 * ---
 * 
 * INJECT: Wait For Injected Animation
 * - Waits for injected animations to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Critical Color Break Settings
 * ============================================================================
 *
 * When critical hits occur, you can cause a Color Break effect to occur.
 *
 * ---
 *
 * Settings
 * 
 *   Enable/Disable?:
 *   - Enables/disables the Color Break effect whenever a critical hit occurs?
 * 
 *   Intensity:
 *   - How intense do you want the Color Break effect to be?
 * 
 *   Duration:
 *   - What is the duration of the Color Break effect?
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Dodge Motion Blur Settings
 * ============================================================================
 *
 * When a battler dodges an attack, you can create a motion blur effect.
 *
 * ---
 *
 * Settings
 * 
 *   Enable/Disable?:
 *   - Enables/disables the Motion Blur effect whenever a battler evades an
 *     attack?
 * 
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 * 
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Guard Shockwave Settings
 * ============================================================================
 *
 * When a guarding battler receives damage, you can create a shockwave effect.
 *
 * ---
 *
 * Category
 * 
 *   Enable/Disable?:
 *   - Enables/disables the Shockwave effect whenever a battler is attacked
 *     while guarding?
 * 
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 * 
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 * 
 *   Duration:
 *   - What is the duration of the shockwave?
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
 * Manu Gaming Creations
 * * URL: https://manugamingcreations.itch.io
 * * Responsible for the following Impact Effects and adapted by VisuStella:
 * ** Desaturation
 * ** Negative Impact
 * ** Time Scale
 * ** Time Stop
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.07: September 8, 2022
 * * Bug Fixes!
 * ** Fixed a problem with motion trails not working for Dragonbones animations
 *    that have looping properties. Fix made by Irina.
 * 
 * Version 1.06: May 26, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Action Sequence Effects added by Irina and sponsored by MirageV:
 * *** INJECT: Animation Begin
 * **** Injects and plays a whole spritesheet animation.
 * **** The spritesheet animation will play over the battler until it
 *      is finished.
 * **** The battler's original sprite will be invisible until finished.
 * *** INJECT: Animation End
 * **** Stops and ends any injected animations on target(s).
 * **** Any inject animation will be prematurely terminated.
 * *** INJECT: Animation Pause/Resume
 * **** Pauses/resumes any injected animations on target(s).
 * *** INJECT: Wait For Injected Animation
 * **** Waits for injected animations to complete before performing
 *      next command.
 * 
 * Version 1.05: April 14, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Impact Effects added by Irina and collaborating with Manu Gaming!
 * *** Impact: Bizarro Inversion
 * *** Impact: Desaturation
 * *** Impact: Negative Inversion
 * *** Impact: Oversaturation
 * *** Impact: Time Scale
 * *** Impact: Time Stop
 * 
 * Version 1.04: October 28, 2021
 * * Bug Fixes!
 * ** Guard shockwave now originates from the proper location with front view
 *    sprites enabled under specific battle layouts. Fix made by Irina.
 * 
 * Version 1.03: December 11, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Action Sequence Impact Action Sequences "Shockwave from Each Target(s)",
 *    "Shockwave from Target(s) Center", and "Zoom Blur at Target(s) Center"
 *    now have "Offset X" and "Offset Y" plugin parameters. Added by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.02: December 4, 2020
 * * Bug Fixes!
 * ** Enemies with a SV Battler attached to them will no longer desynch after
 *    using a motion trail effect. Fix made by Irina.
 * 
 * Version 1.01: November 29, 2020
 * * Bug Fixes!
 * ** Motion Trails for Dragonbones armatures are now properly adjusted for
 *    their scale and offset. Fix made by Arisu.
 *
 * Version 1.00: December 2, 2020
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
 * @param ActSeqImpact
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CriticalColorBreak:struct
 * @text Critical Color Break
 * @type struct<CriticalColorBreak>
 * @desc When critical hits occur, you can cause a Color Break effect to occur.
 * @default {"Enable:eval":"true","Intensity:num":"30","Duration:num":"30","EasingType:str":"OutBack"}
 *
 * @param DodgeMotionBlur:struct
 * @text Dodge Motion Blur
 * @type struct<DodgeMotionBlur>
 * @desc When a battler dodges an attack, you can create a motion blur effect.
 * @default {"Enable:eval":"true","Rate:eval":"0.5","Duration:num":"30","EasingType:str":"InOutSine"}
 *
 * @param GuardShockWave:struct
 * @text Guard Shockwave
 * @type struct<GuardShockWave>
 * @desc When a guarding battler receives damage, you can create a shockwave effect.
 * @default {"Enable:eval":"true","Amp:num":"30","Wave:num":"160","Duration:num":"30"}
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
 * Critical Color Break Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CriticalColorBreak:
 *
 * @param Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Color Break effect whenever a
 * critical hit occurs?
 * @default true
 *
 * @param Intensity:num
 * @text Intensity
 * @type number
 * @min 1
 * @desc How intense do you want the Color Break effect to be?
 * @default 30
 *
 * @param Duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc What is the duration of the Color Break effect?
 * @default 30
 *
 * @param EasingType:str
 * @text Easing Type
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
 * @default OutBack
 *
 */
/* ----------------------------------------------------------------------------
 * Dodge Motion Blur Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~DodgeMotionBlur:
 *
 * @param Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Motion Blur effect whenever a
 * battler evades an attack?
 * @default true
 *
 * @param Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.5
 *
 * @param Duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @param EasingType:str
 * @text Easing Type
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
 */
/* ----------------------------------------------------------------------------
 * Guard Shock Wave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GuardShockWave:
 *
 * @param Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Shockwave effect whenever a
 * battler is attacked while guarding?
 * @default true
 * 
 * @param Amp:num
 * @text Amplitude
 * @type number
 * @min 1
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @param Wave:num
 * @text Wavelength
 * @type number
 * @min 1
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @param Duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc What is the duration of the shockwave?
 * @default 30
 *
 */
//=============================================================================

function _0x410b(){const _0x741f4d=['setupCriticalEffect','Sprite_Actor_updateShadowDragonbonesUnion','center','disposeSprite','isActor','_vertCells','EasingType','amplitude','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','createArmature','updateZoomBlurImpactFilter','_battleField','_zoomBlurImpactWholeDuration','_targetIndex','setupMotionTrailProperties','10lHbcza','return\x200','EVAL','187ktTSxB','performDodgeActSeqImpact','offsetX','width','Spriteset_Base_updateBaseFilters','enabled','_mainSprite','setPause','ConvertParams','CriticalColorBreak','Settings','exit','isAppeared','_pause','dragonbonesData','getBattleImpactTimeScale','version','createDesaturateImpactFilter','isInjectAniPrepping','pauseInjectAnimation','Spriteset_Battle_createBattleFieldContainer','_battleImpactTimeScale','parent','floor','max','_rgbSplitImpactDuration','createOversaturateImpactFilter','toUpperCase','addChild','_rgbSplitImpactWholeDuration','ARRAYJSON','ApplyEasing','startAnimation','Linear','setColorTone','setupShockwaveImpactFilter','updateBaseFilters','_blueRedInvertImpactFilter','match','determineRepeatNumber','offsetY','KJYBR','createChildren','_baseY','_battler','visible','Game_Battler_onDamage','_zoomBlurImpactEasing','performEvasion','onDamageActSeqImpact','Spriteset_Base_createBaseFilters','VisuMZ_1_BattleCore','updateSpriteOffset','status','_baseX','_baseSprite','bind','lsd','_dragonbonesSpriteContainer','Spriteset_Battle_updateBattlerContainer','iEEdQ','timeScale','hJXcY','sortMotionTrailBattlers','mainSpriteWidth','createBattleFieldContainer','createDefaultBattlerMotionTrailData','children','updateShockwaveImpactFilters','_motionBlurImpactWholeDuration','nIPuD','_spriteset','includes','setupMotionBlurImpactFilter','SceneManager_determineRepeatNumber','ARRAYSTRUCT','isSideView','matchSpriteProperties','_battlerMotionTrailData','_injectAnimationSprite','animation','startInjectAnimation','setFrame','setup','lastAnimationState','_prep','dispose','JSON','NUM','blue','_shockwaveImpactFilters','hue','initMembers','play','battlerMotionTrailData','isBusy','setupRgbSplitImpactFilter','Enable','_projectilesContainer','parse','height','push','trim','GimkA','Spriteset_Battle_adjustFlippedBattlefield','updateRgbSplitImpactFilter','isGuard','Sprite_Battler_update','ColorMatrixFilter','_waitCount','hasMotionTrailSprite','_dragonbones','mjctO','createBlueRedInvertImpactFilter','filename','updateFrame','JBmJu','_negativeImpactFilter','currentTime','setupOversaturateImpactFilter','filter','createMotionBlurImpactFilter','_rgbSplitImpactFilter','_motionBlurImpactFilter','onDamage','STR','updateShadowDragonbonesUnion','brightness','createRgbSplitImpactFilter','_duration','_frameDelay','VocLC','updateMainSpriteVisibility','setBattlerMotionTrailData','Duration','FXQdz','_sourceSprite','description','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','GuardShockWave','remove','updateDelay','nextOpacity','Uibol','performMiss','VisuMZ_2_DragonbonesUnion','GvTHp','timeSpeed','setHue','36mmVycF','isInjectAnimating','ActSeqImpact','hVONA','OutBack','time','5254608AzyJFt','red','_motionTrailContainer','call','_weaponSprite','_cellWidth','fDnCp','stopGameLoop','4240943GTOkVU','vertCells','setupBlueRedInvertImpactFilter','innerRadius','ARRAYEVAL','6642657LCmvzP','ARRAYFUNC','initialize','STRUCT','Sprite_Battler_initMembers','Game_Battler_performEvasion','lastAnimationName','green','filters','XVYtT','randomInt','_rgbSplitImpactEasing','format','setBattleImpactTimeScale','863868JszjgQ','createActSeqImpactBaseFilters','anchor','isInputting','Sprite_Battler_createDistortionSprite','applyEasing','yIHKJ','_distortionSprite','_battlerContainer','setupDesaturateImpactFilter','skew','DXvZp','_frameIndex','duration','createInjectAnimationSprite','battlerSprites','angle','isSceneBattle','setupCriticalEffectActSeqImpact','update','horzCells','updateMotionTrail','Hxice','battler','opacity','bitmap','frameCount','tjCzc','createBaseFilters','MotionBlurFilter','tone','smooth','scale','putMotionTrailBattlersOnTop','_cellHeight','adjustFlippedBattlefield','length','frameDelay','strength','constructor','isAlive','scaleY','_sourceData','loadSvActor','_motionBlurImpactEasing','updateBattlerContainer','createZoomBlurImpactFilter','_oversaturateImpactFilter','map','_zoomBlurImpactDuration','RGBSplitFilter','armature','_desaturateImpactFilter','4GvaChv','radius','XghWo','xXfDA','ihOCV','cos','_statusWindow','stop','_frameCount','ntzQc','VisuMZ_0_CoreEngine','149658SOHdEo','sin','12bcIZva','some','_horzCells','Rate','create','_hue','ShockwaveFilter','createDragonbonesArmature','startGameLoop','6326365loxxxD','createActSeqImpactFilters','updateMotionBlurImpactFilter','opacityStart','createNegativeImpactFilter','prototype','Game_Battler_performMiss','_motionBlurImpactDuration','isInjectAnimationStarted','velocity','Amp','1079647BIgjbg','ZoomBlurFilter','updateNextOpacities','Sprite_Damage_setupCriticalEffect','_stateSprite','_isCreatingMotionTrailSprite','createDistortionSprite','setupNegativeImpactFilter','_offsetX','_scene','desaturate','_zoomBlurImpactFilter'];_0x410b=function(){return _0x741f4d;};return _0x410b();}const _0x174cf8=_0x1054;(function(_0x78e8b4,_0x5d55f7){const _0x383940=_0x1054,_0x4c0cf4=_0x78e8b4();while(!![]){try{const _0x30c96a=parseInt(_0x383940(0xf2))/0x1+parseInt(_0x383940(0x1a5))/0x2*(parseInt(_0x383940(0xdc))/0x3)+-parseInt(_0x383940(0xd1))/0x4*(parseInt(_0x383940(0xe7))/0x5)+parseInt(_0x383940(0xde))/0x6*(-parseInt(_0x383940(0x89))/0x7)+parseInt(_0x383940(0x1ab))/0x8+-parseInt(_0x383940(0x8e))/0x9*(parseInt(_0x383940(0x10d))/0xa)+parseInt(_0x383940(0x110))/0xb*(parseInt(_0x383940(0x9c))/0xc);if(_0x30c96a===_0x5d55f7)break;else _0x4c0cf4['push'](_0x4c0cf4['shift']());}catch(_0x2bb5b4){_0x4c0cf4['push'](_0x4c0cf4['shift']());}}}(_0x410b,0x9d076));var label=_0x174cf8(0x1a7),tier=tier||0x0,dependencies=[_0x174cf8(0xdb),_0x174cf8(0x143)],pluginData=$plugins[_0x174cf8(0x188)](function(_0x2f3843){const _0x2239d5=_0x174cf8;return _0x2f3843['status']&&_0x2f3843[_0x2239d5(0x199)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x491f03,_0x372442){const _0xf64355=_0x174cf8;for(const _0x15a708 in _0x372442){if(_0x15a708[_0xf64355(0x136)](/(.*):(.*)/i)){if(_0xf64355(0x197)===_0xf64355(0xa2)){let _0x10ed99=0x1;return _0x4f4dc1[_0xf64355(0xad)]()&&(_0x10ed99=_0xeaa997[_0xf64355(0x11f)](),_0x10ed99=_0x3c1786[_0xf64355(0x128)](0.01,_0x10ed99)),_0x2b83bd[_0xf64355(0x1a7)][_0xf64355(0x15a)]['call'](this,_0x55eb2f*_0x10ed99);}else{const _0x44cf9d=String(RegExp['$1']),_0x38a3d7=String(RegExp['$2'])[_0xf64355(0x12b)]()[_0xf64355(0x176)]();let _0x1823f3,_0x25c7f5,_0x2e0fa6;switch(_0x38a3d7){case _0xf64355(0x168):_0x1823f3=_0x372442[_0x15a708]!==''?Number(_0x372442[_0x15a708]):0x0;break;case'ARRAYNUM':_0x25c7f5=_0x372442[_0x15a708]!==''?JSON['parse'](_0x372442[_0x15a708]):[],_0x1823f3=_0x25c7f5[_0xf64355(0xcc)](_0x4221a0=>Number(_0x4221a0));break;case _0xf64355(0x10f):_0x1823f3=_0x372442[_0x15a708]!==''?eval(_0x372442[_0x15a708]):null;break;case _0xf64355(0x8d):_0x25c7f5=_0x372442[_0x15a708]!==''?JSON[_0xf64355(0x173)](_0x372442[_0x15a708]):[],_0x1823f3=_0x25c7f5[_0xf64355(0xcc)](_0x3a8cb3=>eval(_0x3a8cb3));break;case _0xf64355(0x167):_0x1823f3=_0x372442[_0x15a708]!==''?JSON['parse'](_0x372442[_0x15a708]):'';break;case _0xf64355(0x12e):_0x25c7f5=_0x372442[_0x15a708]!==''?JSON['parse'](_0x372442[_0x15a708]):[],_0x1823f3=_0x25c7f5[_0xf64355(0xcc)](_0x38bbfc=>JSON[_0xf64355(0x173)](_0x38bbfc));break;case'FUNC':_0x1823f3=_0x372442[_0x15a708]!==''?new Function(JSON[_0xf64355(0x173)](_0x372442[_0x15a708])):new Function(_0xf64355(0x10e));break;case _0xf64355(0x8f):_0x25c7f5=_0x372442[_0x15a708]!==''?JSON[_0xf64355(0x173)](_0x372442[_0x15a708]):[],_0x1823f3=_0x25c7f5['map'](_0x13b503=>new Function(JSON[_0xf64355(0x173)](_0x13b503)));break;case _0xf64355(0x18d):_0x1823f3=_0x372442[_0x15a708]!==''?String(_0x372442[_0x15a708]):'';break;case'ARRAYSTR':_0x25c7f5=_0x372442[_0x15a708]!==''?JSON[_0xf64355(0x173)](_0x372442[_0x15a708]):[],_0x1823f3=_0x25c7f5[_0xf64355(0xcc)](_0x2b634a=>String(_0x2b634a));break;case _0xf64355(0x91):_0x2e0fa6=_0x372442[_0x15a708]!==''?JSON[_0xf64355(0x173)](_0x372442[_0x15a708]):{},_0x1823f3=VisuMZ[_0xf64355(0x118)]({},_0x2e0fa6);break;case _0xf64355(0x15b):_0x25c7f5=_0x372442[_0x15a708]!==''?JSON[_0xf64355(0x173)](_0x372442[_0x15a708]):[],_0x1823f3=_0x25c7f5[_0xf64355(0xcc)](_0x1b3766=>VisuMZ[_0xf64355(0x118)]({},JSON['parse'](_0x1b3766)));break;default:continue;}_0x491f03[_0x44cf9d]=_0x1823f3;}}}return _0x491f03;},(_0x57235a=>{const _0x4421ef=_0x174cf8,_0x48a5aa=_0x57235a['name'];for(const _0x28c1c9 of dependencies){if(!Imported[_0x28c1c9]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x4421ef(0x9a)](_0x48a5aa,_0x28c1c9)),SceneManager[_0x4421ef(0x11b)]();break;}}const _0x4973dd=_0x57235a[_0x4421ef(0x199)];if(_0x4973dd['match'](/\[Version[ ](.*?)\]/i)){if('MyshN'===_0x4421ef(0x97))_0x3beddc['visible']=this[_0x4421ef(0xb4)]<=0x0;else{const _0x10c2ac=Number(RegExp['$1']);_0x10c2ac!==VisuMZ[label][_0x4421ef(0x120)]&&(_0x4421ef(0xda)===_0x4421ef(0x193)?(_0x519db4['ActSeqImpact'][_0x4421ef(0x93)][_0x4421ef(0x84)](this),this[_0x4421ef(0x111)]()):(alert(_0x4421ef(0x106)['format'](_0x48a5aa,_0x10c2ac)),SceneManager[_0x4421ef(0x11b)]()));}}if(_0x4973dd[_0x4421ef(0x136)](/\[Tier[ ](\d+)\]/i)){const _0x4ecd52=Number(RegExp['$1']);if(_0x4ecd52<tier){if(_0x4421ef(0xd4)===_0x4421ef(0xb2))return![];else alert(_0x4421ef(0x19a)[_0x4421ef(0x9a)](_0x48a5aa,_0x4ecd52,tier)),SceneManager[_0x4421ef(0x11b)]();}else tier=Math[_0x4421ef(0x128)](_0x4ecd52,tier);}VisuMZ[_0x4421ef(0x118)](VisuMZ[label][_0x4421ef(0x11a)],_0x57235a['parameters']);})(pluginData),VisuMZ['ActSeqImpact'][_0x174cf8(0x15a)]=SceneManager[_0x174cf8(0x137)],SceneManager[_0x174cf8(0x137)]=function(_0x362a2d){const _0x1a6e4f=_0x174cf8;let _0x3fa56e=0x1;if(SceneManager[_0x1a6e4f(0xad)]()){if(_0x1a6e4f(0x14e)!==_0x1a6e4f(0x14e))return _0x47d116[_0x1a6e4f(0x145)]&&_0x5b6080[_0x1a6e4f(0x199)][_0x1a6e4f(0x158)]('['+_0x5128b3+']');else _0x3fa56e=$gameTemp[_0x1a6e4f(0x11f)](),_0x3fa56e=Math['max'](0.01,_0x3fa56e);}return VisuMZ[_0x1a6e4f(0x1a7)][_0x1a6e4f(0x15a)][_0x1a6e4f(0x84)](this,_0x362a2d*_0x3fa56e);},Game_Temp[_0x174cf8(0xec)]['getBattleImpactTimeScale']=function(){const _0x270992=_0x174cf8;if(!SceneManager[_0x270992(0xad)]())return 0x1;if(BattleManager[_0x270992(0x9f)]())return 0x1;if($gameMessage[_0x270992(0x16f)]())return 0x1;return this[_0x270992(0x125)]=this[_0x270992(0x125)]??0x1,this[_0x270992(0x125)]<=0x0&&(this[_0x270992(0x125)]=0.01),this[_0x270992(0x125)];},Game_Temp['prototype'][_0x174cf8(0x9b)]=function(_0x12bdde,_0x3f2f2c){const _0x52c0e6=_0x174cf8;_0x3f2f2c&&(_0x3f2f2c[_0x52c0e6(0x17d)]=_0x3f2f2c[_0x52c0e6(0x17d)]||0x0,_0x3f2f2c[_0x52c0e6(0x17d)]=Math[_0x52c0e6(0x128)](_0x3f2f2c[_0x52c0e6(0x17d)],0x1)),this[_0x52c0e6(0x125)]=Math[_0x52c0e6(0x128)](0.01,_0x12bdde);},Game_BattlerBase[_0x174cf8(0xec)]['battlerMotionTrailData']=function(){const _0xe416dd=_0x174cf8;if(this[_0xe416dd(0x15e)]){if('MXSed'!==_0xe416dd(0x14c))return this[_0xe416dd(0x15e)];else this[_0xe416dd(0x190)](),this[_0xe416dd(0x16a)]=[],this[_0xe416dd(0x189)](),this[_0xe416dd(0xca)](),this[_0xe416dd(0x181)](),this[_0xe416dd(0x121)](),this[_0xe416dd(0xeb)](),this[_0xe416dd(0x12a)]();}return this[_0xe416dd(0x15e)]=this[_0xe416dd(0x152)](),this[_0xe416dd(0x15e)];},Game_BattlerBase[_0x174cf8(0xec)]['clearBattlerMotionTrailData']=function(){const _0x5917bb=_0x174cf8;this[_0x5917bb(0x15e)]=this[_0x5917bb(0x152)]();},Game_BattlerBase[_0x174cf8(0xec)][_0x174cf8(0x195)]=function(_0x4990f0){const _0x1a9642=_0x174cf8;this[_0x1a9642(0x15e)]=_0x4990f0;},Game_BattlerBase[_0x174cf8(0xec)][_0x174cf8(0x152)]=function(){return{'delay':0x1,'duration':0x1e,'hue':0x0,'opacityStart':0xc8,'tone':[0x0,0x0,0x0,0x0],'visible':![]};},VisuMZ['ActSeqImpact']['Game_Battler_onDamage']=Game_Battler[_0x174cf8(0xec)][_0x174cf8(0x18c)],Game_Battler[_0x174cf8(0xec)][_0x174cf8(0x18c)]=function(_0x43d9c2){const _0x16bff8=_0x174cf8;VisuMZ[_0x16bff8(0x1a7)][_0x16bff8(0x13e)][_0x16bff8(0x84)](this,_0x43d9c2),this[_0x16bff8(0x141)](_0x43d9c2);},Game_Battler[_0x174cf8(0xec)][_0x174cf8(0x141)]=function(_0x1c0e08){const _0x19fe9f=_0x174cf8;if(_0x1c0e08<0x0)return;if(!this[_0x19fe9f(0x17a)]())return;const _0x5a3c6=VisuMZ[_0x19fe9f(0x1a7)][_0x19fe9f(0x11a)][_0x19fe9f(0x19b)];if(!_0x5a3c6)return;if(!_0x5a3c6[_0x19fe9f(0x171)])return;if(!SceneManager[_0x19fe9f(0xad)]())return;const _0x3a1ffb=SceneManager[_0x19fe9f(0xfb)][_0x19fe9f(0x157)];if(!_0x3a1ffb)return;if(!this[_0x19fe9f(0xb3)]())return;let _0x5b9adf=this[_0x19fe9f(0xb3)]()[_0x19fe9f(0x146)],_0x1799a1=this['battler']()['_baseY']-this[_0x19fe9f(0xb3)]()['mainSpriteHeight']()/0x2;const _0x51d31f=_0x5a3c6[_0x19fe9f(0xf1)]||0x1,_0x39e86f=_0x5a3c6['Wave']||0x1,_0x29618f=_0x5a3c6[_0x19fe9f(0x196)]||0x1;if(this[_0x19fe9f(0x102)]()&&!$gameSystem[_0x19fe9f(0x15c)]()){if('mjctO'===_0x19fe9f(0x180)){const _0x1e8ddc=SceneManager[_0x19fe9f(0xfb)];_0x5b9adf+=_0x1e8ddc['_windowLayer']['x'],_0x5b9adf+=_0x1e8ddc[_0x19fe9f(0xd7)]['x'],_0x1799a1+=_0x1e8ddc['_windowLayer']['y'],_0x1799a1+=_0x1e8ddc[_0x19fe9f(0xd7)]['y'];}else this[_0x19fe9f(0x165)]=![],this[_0x19fe9f(0xb4)]=0x0,this[_0x19fe9f(0xa8)]=this['_targetIndex'],this[_0x19fe9f(0x194)]();}_0x3a1ffb['setupShockwaveImpactFilter'](_0x5b9adf,_0x1799a1,_0x51d31f,_0x39e86f,_0x29618f);},VisuMZ[_0x174cf8(0x1a7)][_0x174cf8(0xed)]=Game_Battler[_0x174cf8(0xec)]['performMiss'],Game_Battler['prototype'][_0x174cf8(0x1a0)]=function(){const _0xafbaa3=_0x174cf8;VisuMZ[_0xafbaa3(0x1a7)][_0xafbaa3(0xed)][_0xafbaa3(0x84)](this),this['performDodgeActSeqImpact']();},VisuMZ['ActSeqImpact'][_0x174cf8(0x93)]=Game_Battler[_0x174cf8(0xec)]['performEvasion'],Game_Battler[_0x174cf8(0xec)][_0x174cf8(0x140)]=function(){const _0x480cc2=_0x174cf8;VisuMZ['ActSeqImpact']['Game_Battler_performEvasion'][_0x480cc2(0x84)](this),this[_0x480cc2(0x111)]();},Game_Battler[_0x174cf8(0xec)][_0x174cf8(0x111)]=function(){const _0x121396=_0x174cf8,_0x4185ab=VisuMZ[_0x121396(0x1a7)][_0x121396(0x11a)]['DodgeMotionBlur'];if(!_0x4185ab)return;if(!_0x4185ab[_0x121396(0x171)])return;if(!SceneManager['isSceneBattle']())return;const _0x2262af=SceneManager[_0x121396(0xfb)][_0x121396(0x157)];if(!_0x2262af)return;if(!this['battler']())return;if(this[_0x121396(0xb3)]()['_motionBlurImpactDuration']>0x0)return;const _0x2f14a3=Math[_0x121396(0x98)](0x168),_0x2914ca=_0x4185ab[_0x121396(0xe1)]||0.1,_0x2ed1ec=_0x4185ab[_0x121396(0x196)],_0x1f2b0e=_0x4185ab[_0x121396(0x104)]||_0x121396(0x131);this[_0x121396(0xb3)]()['setupMotionBlurImpactFilter'](_0x2f14a3,_0x2914ca,_0x2ed1ec,_0x1f2b0e);},VisuMZ[_0x174cf8(0x1a7)][_0x174cf8(0xa0)]=Sprite_Battler[_0x174cf8(0xec)][_0x174cf8(0xf8)],Sprite_Battler['prototype'][_0x174cf8(0xf8)]=function(){const _0x2a01bf=_0x174cf8;VisuMZ[_0x2a01bf(0x1a7)][_0x2a01bf(0xa0)][_0x2a01bf(0x84)](this),this[_0x2a01bf(0xe8)]();},Sprite_Battler['prototype'][_0x174cf8(0xe8)]=function(){const _0x1b64da=_0x174cf8;if(!this[_0x1b64da(0xa3)])return;this[_0x1b64da(0xa3)][_0x1b64da(0x96)]=this[_0x1b64da(0xa3)][_0x1b64da(0x96)]||[],this[_0x1b64da(0x189)]();},VisuMZ['ActSeqImpact'][_0x174cf8(0x17b)]=Sprite_Battler[_0x174cf8(0xec)][_0x174cf8(0xaf)],Sprite_Battler[_0x174cf8(0xec)]['update']=function(){const _0x12d2ea=_0x174cf8;VisuMZ[_0x12d2ea(0x1a7)][_0x12d2ea(0x17b)][_0x12d2ea(0x84)](this),this[_0x12d2ea(0xb1)](),this['updateMotionBlurImpactFilter']();},Sprite_Battler['prototype']['updateMotionTrail']=function(){const _0x303b9a=_0x174cf8;if(this[_0x303b9a(0xc3)]===Sprite_SvEnemy)return;if(!this[_0x303b9a(0x13c)])return;if(!this[_0x303b9a(0x13c)][_0x303b9a(0xc4)]())return;if(!this[_0x303b9a(0x13c)][_0x303b9a(0x11c)]())return;if(!this[_0x303b9a(0x126)])return;if(!this['_distortionSprite'])return;if(this['_isCreatingMotionTrailSprite']){this[_0x303b9a(0xf7)]=![];return;}if(Imported[_0x303b9a(0x1a1)]&&this['_dragonbones']){}const _0x19076d=this[_0x303b9a(0x13c)][_0x303b9a(0x16e)]();if(!_0x19076d[_0x303b9a(0x13d)])return;const _0x45aaba=Math[_0x303b9a(0x128)](0x1,_0x19076d['delay']);if(Graphics[_0x303b9a(0xb6)]%_0x45aaba!==0x0)return;const _0x4e4b62=SceneManager[_0x303b9a(0xfb)][_0x303b9a(0x157)][_0x303b9a(0x83)];if(!_0x4e4b62)return;this[_0x303b9a(0xf7)]=!![];const _0x3e8508=new Sprite_BattlerMotionTrail(this,_0x19076d);_0x4e4b62[_0x303b9a(0x12c)](_0x3e8508);},Sprite_Battler[_0x174cf8(0xec)][_0x174cf8(0x189)]=function(){const _0x42ccdb=_0x174cf8;if(!PIXI[_0x42ccdb(0x96)]['MotionBlurFilter'])return;this['_motionBlurImpactDuration']=0x0,this[_0x42ccdb(0x155)]=0x0,this[_0x42ccdb(0xc8)]=_0x42ccdb(0x131),this[_0x42ccdb(0x18b)]=new PIXI[(_0x42ccdb(0x96))]['MotionBlurFilter'](),this[_0x42ccdb(0x18b)][_0x42ccdb(0xf0)]['x']=0x0,this['_motionBlurImpactFilter'][_0x42ccdb(0xf0)]['y']=0x0,this[_0x42ccdb(0xa3)][_0x42ccdb(0x96)][_0x42ccdb(0x175)](this['_motionBlurImpactFilter']);},Sprite_Battler[_0x174cf8(0xec)][_0x174cf8(0x159)]=function(_0x2f0efb,_0x33525c,_0x19b3d2,_0x1b628a){const _0x2caa5e=_0x174cf8;if(!this[_0x2caa5e(0x18b)])return;const _0x226a33=this['_motionBlurImpactFilter'];this[_0x2caa5e(0xee)]=_0x19b3d2,this[_0x2caa5e(0x155)]=_0x19b3d2,this[_0x2caa5e(0xc8)]=_0x1b628a;const _0x45d9f6=this[_0x2caa5e(0x150)]()*_0x33525c,_0x5afd1d=_0x45d9f6*Math[_0x2caa5e(0xd6)](_0x2f0efb*Math['PI']/0xb4),_0x56e404=-_0x45d9f6*Math[_0x2caa5e(0xdd)](_0x2f0efb*Math['PI']/0xb4);_0x226a33[_0x2caa5e(0xf0)]['x']=_0x5afd1d,_0x226a33[_0x2caa5e(0xf0)]['y']=_0x56e404;},Sprite_Battler[_0x174cf8(0xec)][_0x174cf8(0xe9)]=function(){const _0x3a3e4c=_0x174cf8;if(!this[_0x3a3e4c(0x18b)])return;if(this[_0x3a3e4c(0xee)]<=0x0)return;const _0x96263d=this[_0x3a3e4c(0x18b)],_0x4d35e4=this[_0x3a3e4c(0xee)]||0x0,_0x4928a2=this[_0x3a3e4c(0x155)]||_0x4d35e4,_0x4e1abb=0x0,_0x1eb1bc=this[_0x3a3e4c(0xc8)];_0x96263d['velocity']['x']=VisuMZ['ActSeqImpact'][_0x3a3e4c(0xa1)](_0x96263d[_0x3a3e4c(0xf0)]['x'],_0x4e1abb,_0x4d35e4,_0x4928a2,_0x1eb1bc),_0x96263d[_0x3a3e4c(0xf0)]['y']=VisuMZ[_0x3a3e4c(0x1a7)][_0x3a3e4c(0xa1)](_0x96263d[_0x3a3e4c(0xf0)]['y'],_0x4e1abb,_0x4d35e4,_0x4928a2,_0x1eb1bc),this[_0x3a3e4c(0xee)]--,this[_0x3a3e4c(0xee)]<=0x0&&(_0x96263d['velocity']['x']=0x0,_0x96263d[_0x3a3e4c(0xf0)]['y']=0x0);},VisuMZ[_0x174cf8(0x1a7)][_0x174cf8(0x92)]=Sprite_Battler['prototype'][_0x174cf8(0x16c)],Sprite_Battler[_0x174cf8(0xec)][_0x174cf8(0x16c)]=function(){const _0x269dd0=_0x174cf8;VisuMZ['ActSeqImpact'][_0x269dd0(0x92)][_0x269dd0(0x84)](this),this['createInjectAnimationSprite']();},Sprite_Battler[_0x174cf8(0xec)][_0x174cf8(0xaa)]=function(){const _0x481784=_0x174cf8;this[_0x481784(0x15f)]=new Sprite_InjectAnimation();},Sprite_Battler['prototype'][_0x174cf8(0x1a6)]=function(){const _0x1d8ae5=_0x174cf8;if(!this['_injectAnimationSprite'])return![];if(this[_0x1d8ae5(0x15f)]['_prep'])return!![];return this[_0x1d8ae5(0xef)]();},Sprite_Battler['prototype'][_0x174cf8(0x122)]=function(){const _0x547878=_0x174cf8;if(!this[_0x547878(0x15f)])return![];return this[_0x547878(0x15f)][_0x547878(0x165)];},Sprite_Battler[_0x174cf8(0xec)][_0x174cf8(0xef)]=function(){const _0x2bfbc6=_0x174cf8;if(!this[_0x2bfbc6(0x15f)])return![];return this[_0x2bfbc6(0x15f)][_0x2bfbc6(0xb4)]>0x0;},Spriteset_Battle[_0x174cf8(0xec)]['isAnyoneInjectAnimating']=function(){const _0x48a0be=_0x174cf8;return this['battlerSprites']()[_0x48a0be(0xdf)](_0x19c5e=>_0x19c5e[_0x48a0be(0x1a6)]());},Spriteset_Battle[_0x174cf8(0xec)]['isAnyoneInjectAniPrepping']=function(){const _0x55266f=_0x174cf8;return this[_0x55266f(0xab)]()[_0x55266f(0xdf)](_0x862150=>_0x862150[_0x55266f(0x122)]());},Sprite_Battler[_0x174cf8(0xec)][_0x174cf8(0x161)]=function(_0x519324){const _0x2c42b8=_0x174cf8;if(!this[_0x2c42b8(0x15f)])return;this[_0x2c42b8(0x15f)][_0x2c42b8(0x163)](_0x519324);},Sprite_Battler[_0x174cf8(0xec)]['stopInjectAnimation']=function(_0x230acd){const _0x1888c9=_0x174cf8;if(!this['_injectAnimationSprite'])return;this['_injectAnimationSprite'][_0x1888c9(0xd8)]();},Sprite_Battler[_0x174cf8(0xec)][_0x174cf8(0x123)]=function(_0x2f782c){const _0x218dd3=_0x174cf8;if(!this[_0x218dd3(0x15f)])return;this[_0x218dd3(0x15f)][_0x218dd3(0x117)](_0x2f782c);};Imported[_0x174cf8(0x1a1)]&&(VisuMZ[_0x174cf8(0x1a7)][_0x174cf8(0xff)]=Sprite_Actor[_0x174cf8(0xec)][_0x174cf8(0x18e)],Sprite_Actor[_0x174cf8(0xec)][_0x174cf8(0x18e)]=function(){const _0x3ce988=_0x174cf8;this[_0x3ce988(0x14a)]&&(this[_0x3ce988(0x14a)][_0x3ce988(0xb4)]=0xff),VisuMZ[_0x3ce988(0x1a7)][_0x3ce988(0xff)]['call'](this),this[_0x3ce988(0xef)]&&this['isInjectAnimationStarted']()&&(this[_0x3ce988(0x116)][_0x3ce988(0x13d)]=![],this['_weaponSprite'][_0x3ce988(0x13d)]=![],this[_0x3ce988(0xf6)][_0x3ce988(0x13d)]=![],this['_dragonbonesSpriteContainer']&&(this[_0x3ce988(0x14a)][_0x3ce988(0xb4)]=0x0));});;VisuMZ[_0x174cf8(0x1a7)]['Sprite_Damage_setupCriticalEffect']=Sprite_Damage[_0x174cf8(0xec)][_0x174cf8(0xfe)],Sprite_Damage[_0x174cf8(0xec)][_0x174cf8(0xfe)]=function(){const _0x3b37ca=_0x174cf8;VisuMZ[_0x3b37ca(0x1a7)][_0x3b37ca(0xf5)]['call'](this),this['setupCriticalEffectActSeqImpact']();},Sprite_Damage[_0x174cf8(0xec)][_0x174cf8(0xae)]=function(){const _0x1ff4b8=_0x174cf8,_0x3d661d=VisuMZ[_0x1ff4b8(0x1a7)][_0x1ff4b8(0x11a)][_0x1ff4b8(0x119)];if(!_0x3d661d)return;if(!_0x3d661d[_0x1ff4b8(0x171)])return;const _0x2dacc1=SceneManager[_0x1ff4b8(0xfb)][_0x1ff4b8(0x157)];if(!_0x2dacc1)return;if(_0x2dacc1['_rgbSplitImpactDuration']>0x0)return;const _0x529f23=_0x3d661d['Intensity']||0x1,_0x909af7=_0x3d661d['Duration']||0x1,_0xfa83c9=_0x3d661d[_0x1ff4b8(0x104)]||_0x1ff4b8(0x1a9);_0x2dacc1[_0x1ff4b8(0x170)](_0x529f23,_0x909af7,_0xfa83c9);};function Sprite_BattlerMotionTrail(){this['initialize'](...arguments);}Sprite_BattlerMotionTrail[_0x174cf8(0xec)]=Object[_0x174cf8(0xe2)](Sprite['prototype']),Sprite_BattlerMotionTrail['prototype'][_0x174cf8(0xc3)]=Sprite_BattlerMotionTrail,Sprite_BattlerMotionTrail[_0x174cf8(0xec)][_0x174cf8(0x90)]=function(_0x3c49fc,_0x143ac5){const _0x5ec09f=_0x174cf8;this[_0x5ec09f(0x198)]=_0x3c49fc,this[_0x5ec09f(0xc6)]=_0x143ac5,Sprite[_0x5ec09f(0xec)][_0x5ec09f(0x90)]['call'](this),this[_0x5ec09f(0x13a)](),this['setupMotionTrailProperties']();},Sprite_BattlerMotionTrail[_0x174cf8(0xec)][_0x174cf8(0x13a)]=function(){const _0x49ef41=_0x174cf8,_0x344ae8=this[_0x49ef41(0x198)][_0x49ef41(0xa3)];this[_0x49ef41(0xa3)]=new Sprite(),this[_0x49ef41(0x12c)](this[_0x49ef41(0xa3)]),this['matchSpriteProperties'](this[_0x49ef41(0xa3)],_0x344ae8,!![]);},Sprite_BattlerMotionTrail[_0x174cf8(0xec)]['matchSpriteProperties']=function(_0x548cdb,_0x299fc2,_0x2709f8){const _0x677713=_0x174cf8;_0x548cdb[_0x677713(0xb5)]=_0x299fc2['bitmap'];const _0x9a5a1c=_0x299fc2['_frame'];_0x9a5a1c&&_0x548cdb[_0x677713(0x162)](_0x9a5a1c['x'],_0x9a5a1c['y'],_0x9a5a1c[_0x677713(0x113)],_0x9a5a1c['height']);_0x548cdb[_0x677713(0x13d)]=_0x299fc2[_0x677713(0x13d)],_0x548cdb[_0x677713(0x9e)]['x']=_0x299fc2[_0x677713(0x9e)]['x'],_0x548cdb['anchor']['y']=_0x299fc2['anchor']['y'],_0x548cdb[_0x677713(0xbc)]['x']=_0x299fc2[_0x677713(0xbc)]['x'],_0x548cdb[_0x677713(0xbc)]['y']=_0x299fc2[_0x677713(0xbc)]['y'],_0x548cdb[_0x677713(0xac)]=_0x299fc2['angle'],_0x548cdb['skew']['x']=_0x299fc2['skew']['x'],_0x548cdb[_0x677713(0xa6)]['y']=_0x299fc2[_0x677713(0xa6)]['y'],_0x548cdb['x']=_0x299fc2['x'],_0x548cdb['y']=_0x299fc2['y'],_0x548cdb[_0x677713(0x1a4)](_0x299fc2[_0x677713(0xe3)]);if(_0x2709f8)for(const _0x1e410f of _0x299fc2[_0x677713(0x153)]){if(!_0x1e410f)continue;if(_0x1e410f[_0x677713(0xcf)]){if('KtieF'!=='cOBsL')this[_0x677713(0xe5)](_0x548cdb,_0x1e410f);else{if(!this[_0x677713(0x185)])return;this[_0x677713(0x185)][_0x677713(0x115)]=_0x1ad632,this[_0x677713(0xaf)]();}}else{const _0x312183=new Sprite();_0x548cdb[_0x677713(0x12c)](_0x312183),this[_0x677713(0x15d)](_0x312183,_0x1e410f,!![]);}}},Sprite_BattlerMotionTrail[_0x174cf8(0xec)][_0x174cf8(0xe5)]=function(_0x30265d,_0x237c87){const _0x4cbf6c=_0x174cf8,_0x3b7177=this[_0x4cbf6c(0x198)]['_battler'][_0x4cbf6c(0x11e)]();this[_0x4cbf6c(0x17f)]=DragonbonesManager[_0x4cbf6c(0x107)](_0x3b7177[_0x4cbf6c(0xb3)]),_0x30265d[_0x4cbf6c(0x12c)](this[_0x4cbf6c(0x17f)]);const _0x424307=_0x237c87[_0x4cbf6c(0x160)][_0x4cbf6c(0x94)],_0x46b913=_0x237c87[_0x4cbf6c(0x160)]['lastAnimationState'][_0x4cbf6c(0x186)];this['_dragonbones']['animation'][_0x4cbf6c(0x16d)](_0x424307),this['_dragonbones'][_0x4cbf6c(0x160)][_0x4cbf6c(0x164)][_0x4cbf6c(0x186)]=_0x46b913,this[_0x4cbf6c(0x17f)]['animation'][_0x4cbf6c(0x14d)]=0x0,this['_dragonbones']['x']=_0x3b7177[_0x4cbf6c(0x112)],this[_0x4cbf6c(0x17f)]['y']=_0x3b7177[_0x4cbf6c(0x138)],this[_0x4cbf6c(0x17f)][_0x4cbf6c(0xbc)]['x']=_0x3b7177['scaleX'],this['_dragonbones'][_0x4cbf6c(0xbc)]['y']=_0x3b7177[_0x4cbf6c(0xc5)],_0x30265d['opacity']=0x0,_0x30265d[_0x4cbf6c(0x19e)]=0x2,_0x30265d[_0x4cbf6c(0xaf)]();},Sprite_BattlerMotionTrail[_0x174cf8(0xec)][_0x174cf8(0x10c)]=function(){const _0x5895b5=_0x174cf8,_0x334a00=this['_sourceSprite'],_0x392c98=this[_0x5895b5(0xc6)];this[_0x5895b5(0x191)]=_0x392c98[_0x5895b5(0xa9)],this[_0x5895b5(0xb4)]=_0x392c98[_0x5895b5(0xea)],this[_0x5895b5(0x15d)](this,_0x334a00),this[_0x5895b5(0x146)]=_0x334a00['_baseX'],this[_0x5895b5(0x13b)]=_0x334a00['_baseY'],this[_0x5895b5(0x1a4)](_0x392c98[_0x5895b5(0x16b)]),this[_0x5895b5(0x132)](_0x392c98[_0x5895b5(0xba)]);},Sprite_BattlerMotionTrail[_0x174cf8(0xec)][_0x174cf8(0xaf)]=function(){const _0x1703c0=_0x174cf8;Sprite['prototype'][_0x1703c0(0xaf)][_0x1703c0(0x84)](this),this[_0x1703c0(0xf4)](this['children']),this['updateDuration']();},Sprite_BattlerMotionTrail[_0x174cf8(0xec)][_0x174cf8(0xf4)]=function(_0x179ebc){const _0x17165c=_0x174cf8;if(!_0x179ebc)return;for(const _0xe82325 of _0x179ebc){if(!_0xe82325)continue;_0xe82325[_0x17165c(0x19e)]&&(_0x17165c(0xb7)!==_0x17165c(0x1a8)?(_0xe82325[_0x17165c(0x19e)]--,_0xe82325['nextOpacity']<=0x0&&(_0xe82325['opacity']=0xff,_0xe82325[_0x17165c(0x19e)]=undefined)):(this[_0x17165c(0x179)](),this[_0x17165c(0x154)](),this[_0x17165c(0xe9)](),this['updateZoomBlurImpactFilter']())),this[_0x17165c(0xf4)](_0xe82325[_0x17165c(0x153)]);}},Sprite_BattlerMotionTrail[_0x174cf8(0xec)]['updateDuration']=function(){const _0x2271e3=_0x174cf8;if(this['_duration']>0x0){if('GvTHp'===_0x2271e3(0x1a2)){const _0x1033e7=this[_0x2271e3(0x191)];this[_0x2271e3(0xb4)]=(this[_0x2271e3(0xb4)]*(_0x1033e7-0x1)+0x0)/_0x1033e7,this[_0x2271e3(0x191)]--,this['_duration']<=0x0&&this[_0x2271e3(0x101)]();}else this['_mainSprite'][_0x2271e3(0x13d)]=![],this[_0x2271e3(0x85)]['visible']=![],this[_0x2271e3(0xf6)][_0x2271e3(0x13d)]=![],this['_dragonbonesSpriteContainer']&&(this[_0x2271e3(0x14a)][_0x2271e3(0xb4)]=0x0);}},Sprite_BattlerMotionTrail[_0x174cf8(0xec)][_0x174cf8(0x101)]=function(){const _0x466a47=_0x174cf8;this[_0x466a47(0x126)]['removeChild'](this);if(this[_0x466a47(0x17f)]){if(_0x466a47(0x177)===_0x466a47(0x177))this[_0x466a47(0x17f)][_0x466a47(0x166)](),this['_dragonbones']=null;else{if(this[_0x466a47(0x191)]>0x0){const _0x263fbb=this[_0x466a47(0x191)];this[_0x466a47(0xb4)]=(this['opacity']*(_0x263fbb-0x1)+0x0)/_0x263fbb,this[_0x466a47(0x191)]--,this['_duration']<=0x0&&this['disposeSprite']();}}}const _0x57f575=SceneManager[_0x466a47(0xfb)][_0x466a47(0x157)];if(_0x57f575&&!_0x57f575['hasMotionTrailSprite'](this[_0x466a47(0x198)])){const _0x2a09f5=_0x57f575[_0x466a47(0xa4)];_0x2a09f5[_0x466a47(0x12c)](this[_0x466a47(0x198)]),_0x57f575['updateBattlerContainer']();}};function _0x1054(_0x44b8a1,_0x433d4d){const _0x410b27=_0x410b();return _0x1054=function(_0x105438,_0x24cdf8){_0x105438=_0x105438-0x83;let _0x15fee4=_0x410b27[_0x105438];return _0x15fee4;},_0x1054(_0x44b8a1,_0x433d4d);}function Sprite_InjectAnimation(){const _0x33e91b=_0x174cf8;this[_0x33e91b(0x90)](...arguments);}Sprite_InjectAnimation['prototype']=Object['create'](Sprite[_0x174cf8(0xec)]),Sprite_InjectAnimation['prototype'][_0x174cf8(0xc3)]=Sprite_InjectAnimation,Sprite_InjectAnimation['prototype'][_0x174cf8(0x90)]=function(){const _0x5c10b5=_0x174cf8;Sprite[_0x5c10b5(0xec)][_0x5c10b5(0x90)][_0x5c10b5(0x84)](this),this['initMembers']();},Sprite_InjectAnimation[_0x174cf8(0xec)][_0x174cf8(0x16c)]=function(){const _0x4d523a=_0x174cf8;this[_0x4d523a(0x9e)]['x']=0.5,this[_0x4d523a(0x9e)]['y']=0x1,this[_0x4d523a(0xd9)]=0x0,this[_0x4d523a(0x192)]=0x1,this[_0x4d523a(0xa8)]=0x0,this['_targetIndex']=0x0,this[_0x4d523a(0xe0)]=0x1,this[_0x4d523a(0x103)]=0x1,this[_0x4d523a(0x86)]=0x1,this[_0x4d523a(0xbe)]=0x1,this[_0x4d523a(0xfa)]=0x0,this['_offsetY']=0x0,this[_0x4d523a(0xb4)]=0x0,this[_0x4d523a(0x11d)]=![];},Sprite_InjectAnimation[_0x174cf8(0xec)][_0x174cf8(0x163)]=function(_0x2c9c48){const _0x380c79=_0x174cf8;this['bitmap']=ImageManager[_0x380c79(0xc7)](_0x2c9c48[_0x380c79(0x182)]),this['_horzCells']=_0x2c9c48[_0x380c79(0xb0)],this[_0x380c79(0x103)]=_0x2c9c48[_0x380c79(0x8a)],this[_0x380c79(0x192)]=_0x2c9c48[_0x380c79(0xc1)],this[_0x380c79(0x10b)]=this[_0x380c79(0xe0)]*this[_0x380c79(0x103)],this[_0x380c79(0xfa)]=_0x2c9c48[_0x380c79(0x112)],this['_offsetY']=_0x2c9c48['offsetY'],this[_0x380c79(0x165)]=!![],this[_0x380c79(0xb5)]['smooth']=_0x2c9c48[_0x380c79(0xbb)],this[_0x380c79(0x11d)]=![],this['bitmap']['addLoadListener'](this['startAnimation']['bind'](this));},Sprite_InjectAnimation[_0x174cf8(0xec)][_0x174cf8(0x130)]=function(){const _0x55bce7=_0x174cf8;this[_0x55bce7(0xb4)]=0xff,this[_0x55bce7(0xd9)]=0x0,this[_0x55bce7(0xa8)]=0x0,this[_0x55bce7(0x86)]=Math[_0x55bce7(0x127)](this['bitmap'][_0x55bce7(0x113)]/this[_0x55bce7(0xe0)])||0x1,this[_0x55bce7(0xbe)]=Math[_0x55bce7(0x127)](this[_0x55bce7(0xb5)][_0x55bce7(0x174)]/this[_0x55bce7(0x103)])||0x1,this[_0x55bce7(0xb4)]=0xff,this[_0x55bce7(0x165)]=![],this['update']();},Sprite_InjectAnimation['prototype']['update']=function(){const _0x179b98=_0x174cf8;Sprite[_0x179b98(0xec)]['update']['call'](this);if(this[_0x179b98(0xb4)]<=0x0)return;this[_0x179b98(0x19d)](),this[_0x179b98(0x183)](),this['updateSpriteOffset'](),this[_0x179b98(0x194)]();},Sprite_InjectAnimation[_0x174cf8(0xec)]['updateDelay']=function(){const _0x46cbfb=_0x174cf8;!this[_0x46cbfb(0x11d)]&&++this[_0x46cbfb(0xd9)]>=this['_frameDelay']&&(this[_0x46cbfb(0xd9)]=0x0,this[_0x46cbfb(0xa8)]++),this[_0x46cbfb(0xb4)]=this[_0x46cbfb(0xa8)]<this[_0x46cbfb(0x10b)]?0xff:0x0;},Sprite_InjectAnimation[_0x174cf8(0xec)]['updateFrame']=function(){const _0x4f98b3=_0x174cf8,_0x4897f8=this['_cellWidth'],_0x129db2=this[_0x4f98b3(0xbe)],_0x2dd3c9=this['_frameIndex']%this[_0x4f98b3(0xe0)]*_0x4897f8,_0x294df1=Math[_0x4f98b3(0x127)](this[_0x4f98b3(0xa8)]/this[_0x4f98b3(0xe0)])*_0x129db2;this[_0x4f98b3(0x162)](_0x2dd3c9,_0x294df1,_0x4897f8,_0x129db2);},Sprite_InjectAnimation[_0x174cf8(0xec)][_0x174cf8(0x144)]=function(){const _0x1eb328=_0x174cf8;this['x']=this[_0x1eb328(0xfa)],this['y']=this['_offsetY'];const _0x57aaed=this[_0x1eb328(0x126)][_0x1eb328(0x126)][_0x1eb328(0x116)];_0x57aaed&&('KJYBR'===_0x1eb328(0x139)?(this['x']+=_0x57aaed['x'],this['y']+=_0x57aaed['y']):(_0x5aafbd&&(_0x2d3493[_0x1eb328(0x17d)]=_0x118167[_0x1eb328(0x17d)]||0x0,_0x45e0c1['_waitCount']=_0x36b773[_0x1eb328(0x128)](_0x4eacb8[_0x1eb328(0x17d)],0x1)),_0x5d52a1=_0x33855b||0x1,_0x4049c5['stopGameLoop'](),_0xe9fb19(_0x11c18e[_0x1eb328(0xe6)][_0x1eb328(0x148)](_0x2adbd0),_0x366fa2)));},Sprite_InjectAnimation[_0x174cf8(0xec)]['updateMainSpriteVisibility']=function(){const _0x32f13b=_0x174cf8;if(!this[_0x32f13b(0x126)])return;if(!this['parent'][_0x32f13b(0x126)])return;const _0x2936ca=this[_0x32f13b(0x126)]['parent']['_mainSprite'];_0x2936ca&&(_0x32f13b(0x87)!==_0x32f13b(0xd3)?_0x2936ca[_0x32f13b(0x13d)]=this[_0x32f13b(0xb4)]<=0x0:(this['_sourceSprite']=_0x8760c7,this['_sourceData']=_0x56e672,_0x464bcc[_0x32f13b(0xec)]['initialize'][_0x32f13b(0x84)](this),this['createChildren'](),this[_0x32f13b(0x10c)]()));},Sprite_InjectAnimation['prototype'][_0x174cf8(0xd8)]=function(){const _0x45bb69=_0x174cf8;this[_0x45bb69(0x165)]=![],this[_0x45bb69(0xb4)]=0x0,this[_0x45bb69(0xa8)]=this[_0x45bb69(0x10b)],this[_0x45bb69(0x194)]();},Sprite_InjectAnimation[_0x174cf8(0xec)]['setPause']=function(_0x5caf1d){this['_pause']=_0x5caf1d;},VisuMZ[_0x174cf8(0x1a7)][_0x174cf8(0x142)]=Spriteset_Base[_0x174cf8(0xec)][_0x174cf8(0xb8)],Spriteset_Base[_0x174cf8(0xec)][_0x174cf8(0xb8)]=function(){const _0x118868=_0x174cf8;VisuMZ[_0x118868(0x1a7)][_0x118868(0x142)]['call'](this),this['createActSeqImpactBaseFilters']();},VisuMZ['ActSeqImpact']['Spriteset_Base_updateBaseFilters']=Spriteset_Base[_0x174cf8(0xec)][_0x174cf8(0x134)],Spriteset_Base[_0x174cf8(0xec)]['updateBaseFilters']=function(){const _0x11e31a=_0x174cf8;VisuMZ[_0x11e31a(0x1a7)][_0x11e31a(0x114)][_0x11e31a(0x84)](this),this['updateActSeqImpactBaseFilters']();},Spriteset_Base[_0x174cf8(0xec)][_0x174cf8(0x9d)]=function(){const _0x262cf4=_0x174cf8;this['createRgbSplitImpactFilter'](),this['_shockwaveImpactFilters']=[],this['createMotionBlurImpactFilter'](),this['createZoomBlurImpactFilter'](),this[_0x262cf4(0x181)](),this['createDesaturateImpactFilter'](),this[_0x262cf4(0xeb)](),this[_0x262cf4(0x12a)]();},Spriteset_Base[_0x174cf8(0xec)]['updateActSeqImpactBaseFilters']=function(){const _0x3a2fed=_0x174cf8;this[_0x3a2fed(0x179)](),this[_0x3a2fed(0x154)](),this[_0x3a2fed(0xe9)](),this[_0x3a2fed(0x108)]();},VisuMZ['ActSeqImpact']['applyEasing']=function(_0x2bed00,_0x593138,_0xdf3edb,_0x20bc8f,_0x2c3918){const _0x21ef78=_0x174cf8,_0x347738=VisuMZ[_0x21ef78(0x12f)]((_0x20bc8f-_0xdf3edb)/_0x20bc8f,_0x2c3918||'Linear'),_0x9d7137=VisuMZ[_0x21ef78(0x12f)]((_0x20bc8f-_0xdf3edb+0x1)/_0x20bc8f,_0x2c3918||_0x21ef78(0x131)),_0x55a94b=(_0x2bed00-_0x593138*_0x347738)/(0x1-_0x347738);return _0x55a94b+(_0x593138-_0x55a94b)*_0x9d7137;},Spriteset_Base[_0x174cf8(0xec)]['createRgbSplitImpactFilter']=function(){const _0xc37a4e=_0x174cf8;if(!PIXI[_0xc37a4e(0x96)][_0xc37a4e(0xce)])return;if(this[_0xc37a4e(0x18a)])return;this[_0xc37a4e(0x129)]=0x0,this[_0xc37a4e(0x12d)]=0x0,this['_rgbSplitImpactEasing']=_0xc37a4e(0x131),this[_0xc37a4e(0x18a)]=new PIXI['filters'][(_0xc37a4e(0xce))](),this[_0xc37a4e(0x18a)]['red']=[0x0,0x0],this['_rgbSplitImpactFilter'][_0xc37a4e(0x95)]=[0x0,0x0],this[_0xc37a4e(0x18a)][_0xc37a4e(0x169)]=[0x0,0x0],this[_0xc37a4e(0x147)][_0xc37a4e(0x96)][_0xc37a4e(0x175)](this[_0xc37a4e(0x18a)]);},Spriteset_Base[_0x174cf8(0xec)][_0x174cf8(0x170)]=function(_0x1cf5a7,_0x19d909,_0x23b233){const _0xc3c0af=_0x174cf8;if(!this['_rgbSplitImpactFilter'])return;const _0x442eee=this['_rgbSplitImpactFilter'],_0x29c60e=_0x1cf5a7*0x2;this[_0xc3c0af(0x129)]=_0x19d909,this[_0xc3c0af(0x12d)]=_0x19d909,this[_0xc3c0af(0x99)]=_0x23b233||_0xc3c0af(0x131),_0x442eee[_0xc3c0af(0x1ac)]=[Math['randomInt'](_0x29c60e)-_0x1cf5a7,Math[_0xc3c0af(0x98)](_0x29c60e)-_0x1cf5a7],_0x442eee[_0xc3c0af(0x95)]=[Math[_0xc3c0af(0x98)](_0x29c60e)-_0x1cf5a7,Math[_0xc3c0af(0x98)](_0x29c60e)-_0x1cf5a7],_0x442eee[_0xc3c0af(0x169)]=[Math[_0xc3c0af(0x98)](_0x29c60e)-_0x1cf5a7,Math[_0xc3c0af(0x98)](_0x29c60e)-_0x1cf5a7];},Spriteset_Base[_0x174cf8(0xec)][_0x174cf8(0x179)]=function(){const _0x499d8c=_0x174cf8;if(!this[_0x499d8c(0x18a)])return;if(this[_0x499d8c(0x129)]<=0x0)return;const _0x301f06=this[_0x499d8c(0x18a)],_0x81e7fb=this[_0x499d8c(0x129)]||0x0,_0x4c480c=this[_0x499d8c(0x12d)]||_0x81e7fb,_0x5a189c=0x0,_0x474e96=this['_rgbSplitImpactEasing'];_0x301f06[_0x499d8c(0x1ac)][0x0]=VisuMZ[_0x499d8c(0x1a7)]['applyEasing'](_0x301f06[_0x499d8c(0x1ac)][0x0],_0x5a189c,_0x81e7fb,_0x4c480c,_0x474e96),_0x301f06[_0x499d8c(0x1ac)][0x1]=VisuMZ[_0x499d8c(0x1a7)][_0x499d8c(0xa1)](_0x301f06[_0x499d8c(0x1ac)][0x1],_0x5a189c,_0x81e7fb,_0x4c480c,_0x474e96),_0x301f06[_0x499d8c(0x95)][0x0]=VisuMZ[_0x499d8c(0x1a7)][_0x499d8c(0xa1)](_0x301f06[_0x499d8c(0x95)][0x0],_0x5a189c,_0x81e7fb,_0x4c480c,_0x474e96),_0x301f06[_0x499d8c(0x95)][0x1]=VisuMZ[_0x499d8c(0x1a7)][_0x499d8c(0xa1)](_0x301f06[_0x499d8c(0x95)][0x1],_0x5a189c,_0x81e7fb,_0x4c480c,_0x474e96),_0x301f06[_0x499d8c(0x169)][0x0]=VisuMZ[_0x499d8c(0x1a7)]['applyEasing'](_0x301f06[_0x499d8c(0x169)][0x0],_0x5a189c,_0x81e7fb,_0x4c480c,_0x474e96),_0x301f06[_0x499d8c(0x169)][0x1]=VisuMZ[_0x499d8c(0x1a7)][_0x499d8c(0xa1)](_0x301f06['blue'][0x1],_0x5a189c,_0x81e7fb,_0x4c480c,_0x474e96),this['_rgbSplitImpactDuration']--;if(this['_rgbSplitImpactDuration']<=0x0){if(_0x499d8c(0x19f)!==_0x499d8c(0x19f)){if(!_0x3549c1['filters'][_0x499d8c(0x17c)])return;this[_0x499d8c(0xd0)]=new _0x4fd661[(_0x499d8c(0x96))][(_0x499d8c(0x17c))](),this[_0x499d8c(0xd0)]['desaturate'](),this['_desaturateImpactFilter'][_0x499d8c(0x115)]=![],this['_baseSprite'][_0x499d8c(0x96)][_0x499d8c(0x175)](this[_0x499d8c(0xd0)]);}else _0x301f06['red']=[0x0,0x0],_0x301f06[_0x499d8c(0x95)]=[0x0,0x0],_0x301f06['blue']=[0x0,0x0];}},Spriteset_Base[_0x174cf8(0xec)][_0x174cf8(0x133)]=function(_0xdc1693,_0x2fd5cb,_0x5680b8,_0x32823a,_0x36f6d7){const _0x26aa82=_0x174cf8;if(!PIXI[_0x26aa82(0x96)][_0x26aa82(0xe4)])return;const _0x4584cf=0x2/Math['max'](0x2,_0x36f6d7),_0xe32ecc=new PIXI[(_0x26aa82(0x96))]['ShockwaveFilter']();_0xe32ecc[_0x26aa82(0x100)]=[_0xdc1693,_0x2fd5cb],_0xe32ecc[_0x26aa82(0x105)]=_0x5680b8,_0xe32ecc['waveLength']=_0x32823a,_0xe32ecc[_0x26aa82(0x18f)]=0x1,_0xe32ecc[_0x26aa82(0xd2)]=-0x1,_0xe32ecc[_0x26aa82(0x1a3)]=_0x4584cf,this['_shockwaveImpactFilters']['push'](_0xe32ecc),this[_0x26aa82(0x147)][_0x26aa82(0x96)][_0x26aa82(0x175)](_0xe32ecc);},Spriteset_Base['prototype'][_0x174cf8(0x154)]=function(){const _0x5e4b36=_0x174cf8;if(!this['_shockwaveImpactFilters'])return;if(this[_0x5e4b36(0x16a)][_0x5e4b36(0xc0)]<=0x0)return;for(const _0x6d0afc of this[_0x5e4b36(0x16a)]){if('JBmJu'!==_0x5e4b36(0x184)){const _0x2b1474=this[_0x5e4b36(0x86)],_0x2d92fe=this[_0x5e4b36(0xbe)],_0x22f468=this[_0x5e4b36(0xa8)]%this[_0x5e4b36(0xe0)]*_0x2b1474,_0x55182b=_0x15b1a2[_0x5e4b36(0x127)](this['_frameIndex']/this[_0x5e4b36(0xe0)])*_0x2d92fe;this[_0x5e4b36(0x162)](_0x22f468,_0x55182b,_0x2b1474,_0x2d92fe);}else{if(!_0x6d0afc)continue;_0x6d0afc[_0x5e4b36(0x1aa)]+=_0x6d0afc['timeSpeed'],_0x6d0afc[_0x5e4b36(0x1aa)]>=0x2&&(_0x5e4b36(0xa7)!==_0x5e4b36(0xa7)?(_0x3d9c0d[_0x5e4b36(0x17d)]=_0x5602e5[_0x5e4b36(0x17d)]||0x0,_0xc5f202[_0x5e4b36(0x17d)]=_0x511ecb['max'](_0x1c4e82[_0x5e4b36(0x17d)],0x1)):(this[_0x5e4b36(0x16a)][_0x5e4b36(0x19c)](_0x6d0afc),this[_0x5e4b36(0x147)][_0x5e4b36(0x96)]['remove'](_0x6d0afc)));}}},Spriteset_Base[_0x174cf8(0xec)]['createMotionBlurImpactFilter']=function(){const _0x1c9eb7=_0x174cf8;if(!PIXI[_0x1c9eb7(0x96)][_0x1c9eb7(0xb9)])return;this['_motionBlurImpactDuration']=0x0,this[_0x1c9eb7(0x155)]=0x0,this['_motionBlurImpactEasing']='Linear',this[_0x1c9eb7(0x18b)]=new PIXI[(_0x1c9eb7(0x96))][(_0x1c9eb7(0xb9))](),this['_motionBlurImpactFilter']['velocity']['x']=0x0,this['_motionBlurImpactFilter']['velocity']['y']=0x0,this[_0x1c9eb7(0x147)][_0x1c9eb7(0x96)]['push'](this[_0x1c9eb7(0x18b)]);},Spriteset_Base[_0x174cf8(0xec)]['setupMotionBlurImpactFilter']=function(_0x27c03e,_0x22a6d3,_0x51a875,_0x6d2e48){const _0x4aa86e=_0x174cf8;if(!this[_0x4aa86e(0x18b)])return;const _0x1b301c=this[_0x4aa86e(0x18b)];this[_0x4aa86e(0xee)]=_0x51a875,this[_0x4aa86e(0x155)]=_0x51a875,this[_0x4aa86e(0xc8)]=_0x6d2e48;const _0x100ae8=Math[_0x4aa86e(0x128)](this[_0x4aa86e(0x113)],this[_0x4aa86e(0x174)])*_0x22a6d3,_0x2b7898=_0x100ae8*Math[_0x4aa86e(0xd6)](_0x27c03e*Math['PI']/0xb4),_0x11cd63=-_0x100ae8*Math[_0x4aa86e(0xdd)](_0x27c03e*Math['PI']/0xb4);_0x1b301c[_0x4aa86e(0xf0)]['x']=_0x2b7898,_0x1b301c['velocity']['y']=_0x11cd63;},Spriteset_Base[_0x174cf8(0xec)]['updateMotionBlurImpactFilter']=function(){const _0x10cfa1=_0x174cf8;if(!this[_0x10cfa1(0x18b)])return;if(this[_0x10cfa1(0xee)]<=0x0)return;const _0x26a289=this[_0x10cfa1(0x18b)],_0x31a606=this['_motionBlurImpactDuration']||0x0,_0x1f21d1=this[_0x10cfa1(0x155)]||_0x31a606,_0x237baf=0x0,_0x592d09=this[_0x10cfa1(0xc8)];_0x26a289[_0x10cfa1(0xf0)]['x']=VisuMZ[_0x10cfa1(0x1a7)]['applyEasing'](_0x26a289[_0x10cfa1(0xf0)]['x'],_0x237baf,_0x31a606,_0x1f21d1,_0x592d09),_0x26a289[_0x10cfa1(0xf0)]['y']=VisuMZ['ActSeqImpact'][_0x10cfa1(0xa1)](_0x26a289['velocity']['y'],_0x237baf,_0x31a606,_0x1f21d1,_0x592d09),this[_0x10cfa1(0xee)]--,this['_motionBlurImpactDuration']<=0x0&&(_0x26a289['velocity']['x']=0x0,_0x26a289[_0x10cfa1(0xf0)]['y']=0x0);},Spriteset_Base['prototype'][_0x174cf8(0xca)]=function(){const _0x42de5a=_0x174cf8;if(!PIXI[_0x42de5a(0x96)][_0x42de5a(0xf3)])return;this[_0x42de5a(0xcd)]=0x0,this[_0x42de5a(0x10a)]=0x0,this['_zoomBlurImpactEasing']=_0x42de5a(0x131),this[_0x42de5a(0xfd)]=new PIXI[(_0x42de5a(0x96))]['ZoomBlurFilter'](),this['_zoomBlurImpactFilter'][_0x42de5a(0xc2)]=0x0,this['_zoomBlurImpactFilter'][_0x42de5a(0x100)]['x']=Graphics[_0x42de5a(0x113)]/0x2,this['_zoomBlurImpactFilter'][_0x42de5a(0x100)]['y']=Graphics[_0x42de5a(0x174)]/0x2,this[_0x42de5a(0xfd)][_0x42de5a(0x8c)]=0x60,this[_0x42de5a(0x147)][_0x42de5a(0x96)]['push'](this[_0x42de5a(0xfd)]);},Spriteset_Base[_0x174cf8(0xec)]['setupZoomBlurImpactFilter']=function(_0x64a18d,_0x5b934b,_0x4ce1e2,_0x274c6b,_0x4442ac,_0x33dc0a){const _0x17291b=_0x174cf8;if(!this[_0x17291b(0xfd)])return;const _0x2d8d82=this[_0x17291b(0xfd)];this['_zoomBlurImpactDuration']=_0x4442ac,this[_0x17291b(0x10a)]=_0x4442ac,this[_0x17291b(0x13f)]=_0x33dc0a,_0x2d8d82[_0x17291b(0xc2)]=_0x64a18d,_0x2d8d82[_0x17291b(0x100)]['x']=_0x5b934b,_0x2d8d82[_0x17291b(0x100)]['y']=_0x4ce1e2,_0x2d8d82[_0x17291b(0x8c)]=_0x274c6b;},Spriteset_Base[_0x174cf8(0xec)]['updateZoomBlurImpactFilter']=function(){const _0x16d841=_0x174cf8;if(!this[_0x16d841(0xfd)])return;if(this[_0x16d841(0xcd)]<=0x0)return;const _0x19c822=this[_0x16d841(0xfd)],_0x3c21b5=this[_0x16d841(0xcd)]||0x0,_0x78852c=this[_0x16d841(0x10a)]||_0x3c21b5,_0x279704=0x0,_0x2fdcff=this[_0x16d841(0x13f)];_0x19c822['strength']=VisuMZ[_0x16d841(0x1a7)][_0x16d841(0xa1)](_0x19c822[_0x16d841(0xc2)],_0x279704,_0x3c21b5,_0x78852c,_0x2fdcff),this[_0x16d841(0xcd)]--,this[_0x16d841(0xcd)]<=0x0&&(_0x19c822['strength']=0x0);},Spriteset_Base[_0x174cf8(0xec)]['createBlueRedInvertImpactFilter']=function(){const _0x353433=_0x174cf8;if(!PIXI[_0x353433(0x96)]['ColorMatrixFilter'])return;this[_0x353433(0x135)]=new PIXI[(_0x353433(0x96))][(_0x353433(0x17c))](),this[_0x353433(0x135)]['toBGR'](),this[_0x353433(0x135)][_0x353433(0x115)]=![],this['_baseSprite'][_0x353433(0x96)][_0x353433(0x175)](this[_0x353433(0x135)]);},Spriteset_Base['prototype'][_0x174cf8(0x8b)]=function(_0x1227c1){const _0x1ab363=_0x174cf8;if(!this['_blueRedInvertImpactFilter'])return;this[_0x1ab363(0x135)][_0x1ab363(0x115)]=_0x1227c1,this[_0x1ab363(0xaf)]();},Spriteset_Base['prototype']['createDesaturateImpactFilter']=function(){const _0x2c9c59=_0x174cf8;if(!PIXI[_0x2c9c59(0x96)][_0x2c9c59(0x17c)])return;this[_0x2c9c59(0xd0)]=new PIXI[(_0x2c9c59(0x96))][(_0x2c9c59(0x17c))](),this[_0x2c9c59(0xd0)][_0x2c9c59(0xfc)](),this[_0x2c9c59(0xd0)][_0x2c9c59(0x115)]=![],this[_0x2c9c59(0x147)][_0x2c9c59(0x96)]['push'](this[_0x2c9c59(0xd0)]);},Spriteset_Base[_0x174cf8(0xec)][_0x174cf8(0xa5)]=function(_0x10c0c9){const _0x9a5ce5=_0x174cf8;if(!this[_0x9a5ce5(0xd0)])return;this['_desaturateImpactFilter']['enabled']=_0x10c0c9,this['update']();},Spriteset_Base[_0x174cf8(0xec)][_0x174cf8(0xeb)]=function(){const _0x80ed20=_0x174cf8;if(!PIXI['filters'][_0x80ed20(0x17c)])return;this[_0x80ed20(0x185)]=new PIXI['filters']['ColorMatrixFilter'](),this[_0x80ed20(0x185)]['negative'](),this['_negativeImpactFilter']['enabled']=![],this['_baseSprite'][_0x80ed20(0x96)][_0x80ed20(0x175)](this[_0x80ed20(0x185)]);},Spriteset_Base[_0x174cf8(0xec)][_0x174cf8(0xf9)]=function(_0x228073){const _0x1c0b21=_0x174cf8;if(!this[_0x1c0b21(0x185)])return;this['_negativeImpactFilter'][_0x1c0b21(0x115)]=_0x228073,this[_0x1c0b21(0xaf)]();},Spriteset_Base[_0x174cf8(0xec)][_0x174cf8(0x12a)]=function(){const _0x46846d=_0x174cf8;if(!PIXI[_0x46846d(0x96)]['ColorMatrixFilter'])return;this[_0x46846d(0xcb)]=new PIXI[(_0x46846d(0x96))][(_0x46846d(0x17c))](),this[_0x46846d(0xcb)][_0x46846d(0x149)](),this[_0x46846d(0xcb)]['enabled']=![],this[_0x46846d(0x147)]['filters'][_0x46846d(0x175)](this[_0x46846d(0xcb)]);},Spriteset_Base['prototype'][_0x174cf8(0x187)]=function(_0x12211f){const _0xf578cc=_0x174cf8;if(!this['_oversaturateImpactFilter'])return;this[_0xf578cc(0xcb)][_0xf578cc(0x115)]=_0x12211f,this[_0xf578cc(0xaf)]();},VisuMZ['ActSeqImpact'][_0x174cf8(0x124)]=Spriteset_Battle['prototype'][_0x174cf8(0x151)],Spriteset_Battle[_0x174cf8(0xec)]['createBattleFieldContainer']=function(){const _0x3701b9=_0x174cf8;VisuMZ[_0x3701b9(0x1a7)]['Spriteset_Battle_createBattleFieldContainer'][_0x3701b9(0x84)](this),this[_0x3701b9(0x83)]=new Sprite(),this[_0x3701b9(0x109)][_0x3701b9(0x12c)](this[_0x3701b9(0x83)]),this[_0x3701b9(0x172)]&&this['_battleField']['addChild'](this[_0x3701b9(0x172)]);},VisuMZ[_0x174cf8(0x1a7)][_0x174cf8(0x178)]=Spriteset_Battle[_0x174cf8(0xec)][_0x174cf8(0xbf)],Spriteset_Battle[_0x174cf8(0xec)][_0x174cf8(0xbf)]=function(){const _0x500bee=_0x174cf8;VisuMZ[_0x500bee(0x1a7)][_0x500bee(0x178)][_0x500bee(0x84)](this),this[_0x500bee(0x83)]&&this['_battlerContainer']&&(this[_0x500bee(0x83)][_0x500bee(0xbc)]['x']=this['_battlerContainer'][_0x500bee(0xbc)]['x'],this[_0x500bee(0x83)][_0x500bee(0xbc)]['y']=this[_0x500bee(0xa4)][_0x500bee(0xbc)]['y'],this[_0x500bee(0x83)]['x']=this[_0x500bee(0xa4)]['x'],this['_motionTrailContainer']['y']=this[_0x500bee(0xa4)]['y']);},VisuMZ['ActSeqImpact'][_0x174cf8(0x14b)]=Spriteset_Battle[_0x174cf8(0xec)][_0x174cf8(0xc9)],Spriteset_Battle[_0x174cf8(0xec)][_0x174cf8(0xc9)]=function(){const _0x8c00a8=_0x174cf8;VisuMZ[_0x8c00a8(0x1a7)][_0x8c00a8(0x14b)][_0x8c00a8(0x84)](this),this['putMotionTrailBattlersOnTop'](),this[_0x8c00a8(0x14f)]();},Spriteset_Battle[_0x174cf8(0xec)][_0x174cf8(0xbd)]=function(){const _0x4e094b=_0x174cf8;for(const _0x1291c9 of this[_0x4e094b(0xa4)][_0x4e094b(0x153)]){if('cAVPo'===_0x4e094b(0x156))!this[_0x4e094b(0x11d)]&&++this[_0x4e094b(0xd9)]>=this[_0x4e094b(0x192)]&&(this[_0x4e094b(0xd9)]=0x0,this[_0x4e094b(0xa8)]++),this['opacity']=this['_frameIndex']<this[_0x4e094b(0x10b)]?0xff:0x0;else{if(!_0x1291c9)continue;this[_0x4e094b(0x17e)](_0x1291c9)&&this[_0x4e094b(0x83)]['addChild'](_0x1291c9);}}},Spriteset_Battle['prototype'][_0x174cf8(0x17e)]=function(_0xe978ab){const _0x337016=_0x174cf8;if(!this['_motionTrailContainer'])return![];return this[_0x337016(0x83)][_0x337016(0x153)][_0x337016(0xdf)](_0x166cb1=>_0x166cb1[_0x337016(0x198)]===_0xe978ab);},Spriteset_Battle[_0x174cf8(0xec)][_0x174cf8(0x14f)]=function(){const _0x584ea1=_0x174cf8;if(!this[_0x584ea1(0x83)])return![];const _0x246f6e=this['_motionTrailContainer'][_0x584ea1(0x153)]['filter'](_0x4bcff6=>_0x4bcff6[_0x584ea1(0xc3)]!==Sprite_BattlerMotionTrail);for(const _0x101c35 of _0x246f6e){if('ihOCV'===_0x584ea1(0xd5))this['_motionTrailContainer'][_0x584ea1(0x12c)](_0x101c35);else{const _0x30a5c2=_0x21b3b8[_0x584ea1(0x12f)]((_0x3ff978-_0xbca4d5)/_0x128728,_0x9f7018||_0x584ea1(0x131)),_0x33395a=_0x230c88[_0x584ea1(0x12f)]((_0x23119b-_0xe66a2f+0x1)/_0xbbf872,_0x3551d1||'Linear'),_0x4ce76d=(_0x3d7cca-_0x400ff5*_0x30a5c2)/(0x1-_0x30a5c2);return _0x4ce76d+(_0x22ad78-_0x4ce76d)*_0x33395a;}}},VisuMZ['ActSeqImpact']['freezeTime']=function(_0x53ee64,_0x4d6b4d){const _0x4e89f1=_0x174cf8;_0x4d6b4d&&(_0x4d6b4d['_waitCount']=_0x4d6b4d[_0x4e89f1(0x17d)]||0x0,_0x4d6b4d[_0x4e89f1(0x17d)]=Math[_0x4e89f1(0x128)](_0x4d6b4d[_0x4e89f1(0x17d)],0x1)),_0x53ee64=_0x53ee64||0x1,Graphics[_0x4e89f1(0x88)](),setTimeout(Graphics[_0x4e89f1(0xe6)]['bind'](Graphics),_0x53ee64);};