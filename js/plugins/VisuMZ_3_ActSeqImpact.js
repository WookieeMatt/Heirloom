//=============================================================================
// VisuStella MZ - ActSeqImpact
// VisuMZ_3_ActSeqImpact.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ActSeqImpact = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ActSeqImpact = VisuMZ.ActSeqImpact || {};
VisuMZ.ActSeqImpact.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.06] [ActSeqImpact]
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

const _0x32c3be=_0x84e6;(function(_0x5e5f8e,_0x57b6fb){const _0x448f58=_0x84e6,_0x557bf7=_0x5e5f8e();while(!![]){try{const _0x1cdec4=-parseInt(_0x448f58(0x137))/0x1*(parseInt(_0x448f58(0x1c6))/0x2)+-parseInt(_0x448f58(0x1d6))/0x3+-parseInt(_0x448f58(0x1af))/0x4+parseInt(_0x448f58(0x13d))/0x5*(-parseInt(_0x448f58(0x179))/0x6)+-parseInt(_0x448f58(0x140))/0x7*(-parseInt(_0x448f58(0x1eb))/0x8)+parseInt(_0x448f58(0x173))/0x9*(-parseInt(_0x448f58(0x178))/0xa)+-parseInt(_0x448f58(0x20a))/0xb*(-parseInt(_0x448f58(0x211))/0xc);if(_0x1cdec4===_0x57b6fb)break;else _0x557bf7['push'](_0x557bf7['shift']());}catch(_0x5d40a5){_0x557bf7['push'](_0x557bf7['shift']());}}}(_0x45bc,0xe4cf0));var label=_0x32c3be(0x174),tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine',_0x32c3be(0x1f9)],pluginData=$plugins[_0x32c3be(0x16d)](function(_0x13af45){const _0x585f49=_0x32c3be;return _0x13af45[_0x585f49(0x21a)]&&_0x13af45[_0x585f49(0x14d)][_0x585f49(0x12f)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x32c3be(0x1c9)]||{},VisuMZ[_0x32c3be(0x1d9)]=function(_0x2bc487,_0x1e8320){const _0x513583=_0x32c3be;for(const _0x1e515d in _0x1e8320){if('RaQus'!=='RaQus'){const _0x2ed3d8=this[_0x513583(0x132)],_0x271c9b=this[_0x513583(0x11a)],_0x3de839=this[_0x513583(0x212)]%this['_horzCells']*_0x2ed3d8,_0x54d98d=_0x265409[_0x513583(0x1b7)](this[_0x513583(0x212)]/this[_0x513583(0x100)])*_0x271c9b;this['setFrame'](_0x3de839,_0x54d98d,_0x2ed3d8,_0x271c9b);}else{if(_0x1e515d[_0x513583(0x1b3)](/(.*):(.*)/i)){if('IbKAu'!==_0x513583(0x17e)){const _0x5af0ac=String(RegExp['$1']),_0x5e6036=String(RegExp['$2'])[_0x513583(0x152)]()[_0x513583(0x1fe)]();let _0x45b84c,_0x59c2fe,_0x1cc8c0;switch(_0x5e6036){case _0x513583(0x12d):_0x45b84c=_0x1e8320[_0x1e515d]!==''?Number(_0x1e8320[_0x1e515d]):0x0;break;case _0x513583(0x144):_0x59c2fe=_0x1e8320[_0x1e515d]!==''?JSON[_0x513583(0x1f1)](_0x1e8320[_0x1e515d]):[],_0x45b84c=_0x59c2fe['map'](_0x39937=>Number(_0x39937));break;case _0x513583(0x108):_0x45b84c=_0x1e8320[_0x1e515d]!==''?eval(_0x1e8320[_0x1e515d]):null;break;case _0x513583(0x149):_0x59c2fe=_0x1e8320[_0x1e515d]!==''?JSON[_0x513583(0x1f1)](_0x1e8320[_0x1e515d]):[],_0x45b84c=_0x59c2fe['map'](_0x52db22=>eval(_0x52db22));break;case'JSON':_0x45b84c=_0x1e8320[_0x1e515d]!==''?JSON[_0x513583(0x1f1)](_0x1e8320[_0x1e515d]):'';break;case _0x513583(0x13f):_0x59c2fe=_0x1e8320[_0x1e515d]!==''?JSON[_0x513583(0x1f1)](_0x1e8320[_0x1e515d]):[],_0x45b84c=_0x59c2fe['map'](_0x1a1f7b=>JSON[_0x513583(0x1f1)](_0x1a1f7b));break;case'FUNC':_0x45b84c=_0x1e8320[_0x1e515d]!==''?new Function(JSON['parse'](_0x1e8320[_0x1e515d])):new Function(_0x513583(0x17c));break;case'ARRAYFUNC':_0x59c2fe=_0x1e8320[_0x1e515d]!==''?JSON[_0x513583(0x1f1)](_0x1e8320[_0x1e515d]):[],_0x45b84c=_0x59c2fe['map'](_0x4a5012=>new Function(JSON[_0x513583(0x1f1)](_0x4a5012)));break;case _0x513583(0x12e):_0x45b84c=_0x1e8320[_0x1e515d]!==''?String(_0x1e8320[_0x1e515d]):'';break;case _0x513583(0x202):_0x59c2fe=_0x1e8320[_0x1e515d]!==''?JSON[_0x513583(0x1f1)](_0x1e8320[_0x1e515d]):[],_0x45b84c=_0x59c2fe['map'](_0x52d4ab=>String(_0x52d4ab));break;case _0x513583(0x1fd):_0x1cc8c0=_0x1e8320[_0x1e515d]!==''?JSON['parse'](_0x1e8320[_0x1e515d]):{},_0x45b84c=VisuMZ['ConvertParams']({},_0x1cc8c0);break;case'ARRAYSTRUCT':_0x59c2fe=_0x1e8320[_0x1e515d]!==''?JSON[_0x513583(0x1f1)](_0x1e8320[_0x1e515d]):[],_0x45b84c=_0x59c2fe[_0x513583(0x151)](_0x338981=>VisuMZ[_0x513583(0x1d9)]({},JSON['parse'](_0x338981)));break;default:continue;}_0x2bc487[_0x5af0ac]=_0x45b84c;}else{if(!this[_0x513583(0x16f)])return;this[_0x513583(0x16f)][_0x513583(0xfc)]=_0x336ca3,this[_0x513583(0x197)]();}}}}return _0x2bc487;},(_0x472be3=>{const _0x465d18=_0x32c3be,_0x1db7b2=_0x472be3[_0x465d18(0x195)];for(const _0x5808bd of dependencies){if(!Imported[_0x5808bd]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x1db7b2,_0x5808bd)),SceneManager[_0x465d18(0x143)]();break;}}const _0x19848e=_0x472be3[_0x465d18(0x14d)];if(_0x19848e[_0x465d18(0x1b3)](/\[Version[ ](.*?)\]/i)){if(_0x465d18(0x129)!=='IJYzl'){if(!this[_0x465d18(0x124)])return;this[_0x465d18(0x124)][_0x465d18(0xfc)]=_0x197f80,this[_0x465d18(0x197)]();}else{const _0x4f362b=Number(RegExp['$1']);_0x4f362b!==VisuMZ[label]['version']&&('ISnbn'!=='SzfQd'?(alert(_0x465d18(0xf3)[_0x465d18(0x1a2)](_0x1db7b2,_0x4f362b)),SceneManager[_0x465d18(0x143)]()):(_0x36f0b9[_0x465d18(0x174)][_0x465d18(0x10c)][_0x465d18(0x128)](this),this[_0x465d18(0x218)]()));}}if(_0x19848e[_0x465d18(0x1b3)](/\[Tier[ ](\d+)\]/i)){if(_0x465d18(0x14e)!==_0x465d18(0x14e)){if(!this['_motionBlurImpactFilter'])return;const _0x345938=this[_0x465d18(0x170)];this[_0x465d18(0x1c3)]=_0x2dd192,this[_0x465d18(0x104)]=_0x5256c3,this[_0x465d18(0x1f5)]=_0x413a79;const _0x11739b=this['mainSpriteWidth']()*_0x3aca99,_0x100a34=_0x11739b*_0x5b4741[_0x465d18(0x1fb)](_0x177c03*_0x4b082c['PI']/0xb4),_0x5adc06=-_0x11739b*_0x45abf3[_0x465d18(0x1d3)](_0x17a835*_0x8b010d['PI']/0xb4);_0x345938['velocity']['x']=_0x100a34,_0x345938[_0x465d18(0x11c)]['y']=_0x5adc06;}else{const _0x427056=Number(RegExp['$1']);if(_0x427056<tier){if(_0x465d18(0x15c)!==_0x465d18(0x20e))alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x465d18(0x1a2)](_0x1db7b2,_0x427056,tier)),SceneManager[_0x465d18(0x143)]();else{const _0x2bd917=_0x527a63[_0x465d18(0x1ab)];_0x4c1e24+=_0x2bd917['_windowLayer']['x'],_0x217456+=_0x2bd917['_statusWindow']['x'],_0x449764+=_0x2bd917[_0x465d18(0x166)]['y'],_0x581f40+=_0x2bd917[_0x465d18(0x201)]['y'];}}else{if(_0x465d18(0x200)===_0x465d18(0xfa)){if(!_0x13068b[_0x465d18(0x112)][_0x465d18(0x15f)])return;const _0x560d4e=0x2/_0x485e75[_0x465d18(0x1a9)](0x2,_0x4fc881),_0xbff0a4=new _0x542fdf['filters']['ShockwaveFilter']();_0xbff0a4[_0x465d18(0x1f0)]=[_0x465151,_0x27dd01],_0xbff0a4[_0x465d18(0x190)]=_0x1867bf,_0xbff0a4['waveLength']=_0x42fc72,_0xbff0a4[_0x465d18(0x110)]=0x1,_0xbff0a4[_0x465d18(0x1f2)]=-0x1,_0xbff0a4[_0x465d18(0xf4)]=_0x560d4e,this['_shockwaveImpactFilters']['push'](_0xbff0a4),this[_0x465d18(0x146)][_0x465d18(0x112)][_0x465d18(0x1ff)](_0xbff0a4);}else tier=Math[_0x465d18(0x1a9)](_0x427056,tier);}}}VisuMZ[_0x465d18(0x1d9)](VisuMZ[label][_0x465d18(0x1c9)],_0x472be3[_0x465d18(0x1e5)]);})(pluginData),VisuMZ[_0x32c3be(0x174)][_0x32c3be(0x1c0)]=SceneManager['determineRepeatNumber'],SceneManager[_0x32c3be(0x204)]=function(_0x24f678){const _0x31cd69=_0x32c3be;let _0x5b7ee0=0x1;return SceneManager['isSceneBattle']()&&(_0x31cd69(0x20d)===_0x31cd69(0x150)?(_0x136e3b[_0x31cd69(0x174)][_0x31cd69(0x123)][_0x31cd69(0x128)](this),this['createActSeqImpactBaseFilters']()):(_0x5b7ee0=$gameTemp['getBattleImpactTimeScale'](),_0x5b7ee0=Math[_0x31cd69(0x1a9)](0.01,_0x5b7ee0))),VisuMZ[_0x31cd69(0x174)][_0x31cd69(0x1c0)]['call'](this,_0x24f678*_0x5b7ee0);},Game_Temp[_0x32c3be(0x192)][_0x32c3be(0x1ee)]=function(){const _0x511ff3=_0x32c3be;if(!SceneManager['isSceneBattle']())return 0x1;if(BattleManager[_0x511ff3(0x11e)]())return 0x1;if($gameMessage['isBusy']())return 0x1;this['_battleImpactTimeScale']=this[_0x511ff3(0x206)]??0x1;if(this['_battleImpactTimeScale']<=0x0){if(_0x511ff3(0x1c4)===_0x511ff3(0x159)){if(_0x4f10b9<0x0)return;if(!this['isGuard']())return;const _0x412732=_0x1a42c6[_0x511ff3(0x174)]['Settings'][_0x511ff3(0x1e7)];if(!_0x412732)return;if(!_0x412732['Enable'])return;if(!_0x29d476[_0x511ff3(0x1cf)]())return;const _0x3142c7=_0x4b16ff['_scene'][_0x511ff3(0x106)];if(!_0x3142c7)return;if(!this[_0x511ff3(0x1c2)]())return;let _0x1b889d=this['battler']()['_baseX'],_0x2fe90b=this[_0x511ff3(0x1c2)]()[_0x511ff3(0x117)]-this[_0x511ff3(0x1c2)]()[_0x511ff3(0x1e2)]()/0x2;const _0x398ba3=_0x412732[_0x511ff3(0x1a4)]||0x1,_0x3483e8=_0x412732[_0x511ff3(0x155)]||0x1,_0x4e4548=_0x412732[_0x511ff3(0x18d)]||0x1;if(this[_0x511ff3(0x175)]()&&!_0x456df2['isSideView']()){const _0x4d3853=_0x4b0ba7['_scene'];_0x1b889d+=_0x4d3853[_0x511ff3(0x166)]['x'],_0x1b889d+=_0x4d3853[_0x511ff3(0x201)]['x'],_0x2fe90b+=_0x4d3853[_0x511ff3(0x166)]['y'],_0x2fe90b+=_0x4d3853['_statusWindow']['y'];}_0x3142c7[_0x511ff3(0x161)](_0x1b889d,_0x2fe90b,_0x398ba3,_0x3483e8,_0x4e4548);}else this[_0x511ff3(0x206)]=0.01;}return this[_0x511ff3(0x206)];},Game_Temp[_0x32c3be(0x192)][_0x32c3be(0x1e3)]=function(_0xff765b,_0x939e1){const _0x215320=_0x32c3be;_0x939e1&&(_0x939e1[_0x215320(0x1b8)]=_0x939e1[_0x215320(0x1b8)]||0x0,_0x939e1[_0x215320(0x1b8)]=Math[_0x215320(0x1a9)](_0x939e1[_0x215320(0x1b8)],0x1)),this[_0x215320(0x206)]=Math[_0x215320(0x1a9)](0.01,_0xff765b);},Game_BattlerBase[_0x32c3be(0x192)][_0x32c3be(0x215)]=function(){const _0x7c6663=_0x32c3be;if(this[_0x7c6663(0x134)])return this[_0x7c6663(0x134)];return this[_0x7c6663(0x134)]=this[_0x7c6663(0x203)](),this[_0x7c6663(0x134)];},Game_BattlerBase[_0x32c3be(0x192)][_0x32c3be(0x118)]=function(){const _0x373e35=_0x32c3be;this[_0x373e35(0x134)]=this[_0x373e35(0x203)]();},Game_BattlerBase['prototype'][_0x32c3be(0x10a)]=function(_0x1f989d){this['_battlerMotionTrailData']=_0x1f989d;},Game_BattlerBase[_0x32c3be(0x192)]['createDefaultBattlerMotionTrailData']=function(){return{'delay':0x1,'duration':0x1e,'hue':0x0,'opacityStart':0xc8,'tone':[0x0,0x0,0x0,0x0],'visible':![]};},VisuMZ[_0x32c3be(0x174)][_0x32c3be(0x186)]=Game_Battler[_0x32c3be(0x192)][_0x32c3be(0x1e4)],Game_Battler['prototype'][_0x32c3be(0x1e4)]=function(_0x42cd4b){const _0x2a4df1=_0x32c3be;VisuMZ[_0x2a4df1(0x174)][_0x2a4df1(0x186)][_0x2a4df1(0x128)](this,_0x42cd4b),this['onDamageActSeqImpact'](_0x42cd4b);},Game_Battler['prototype']['onDamageActSeqImpact']=function(_0x528e81){const _0x2a5bb1=_0x32c3be;if(_0x528e81<0x0)return;if(!this['isGuard']())return;const _0x317995=VisuMZ[_0x2a5bb1(0x174)][_0x2a5bb1(0x1c9)]['GuardShockWave'];if(!_0x317995)return;if(!_0x317995[_0x2a5bb1(0x16a)])return;if(!SceneManager[_0x2a5bb1(0x1cf)]())return;const _0x1bfc12=SceneManager[_0x2a5bb1(0x1ab)][_0x2a5bb1(0x106)];if(!_0x1bfc12)return;if(!this[_0x2a5bb1(0x1c2)]())return;let _0x1c3fbb=this['battler']()['_baseX'],_0x24f52f=this['battler']()[_0x2a5bb1(0x117)]-this[_0x2a5bb1(0x1c2)]()[_0x2a5bb1(0x1e2)]()/0x2;const _0x4d6d19=_0x317995[_0x2a5bb1(0x1a4)]||0x1,_0x596499=_0x317995['Wave']||0x1,_0xb08e2=_0x317995['Duration']||0x1;if(this[_0x2a5bb1(0x175)]()&&!$gameSystem[_0x2a5bb1(0xfd)]()){if('ODJcj'==='yToFD')_0x533d26[_0x2a5bb1(0x11c)]['x']=0x0,_0x414627['velocity']['y']=0x0;else{const _0x11c2f1=SceneManager['_scene'];_0x1c3fbb+=_0x11c2f1[_0x2a5bb1(0x166)]['x'],_0x1c3fbb+=_0x11c2f1[_0x2a5bb1(0x201)]['x'],_0x24f52f+=_0x11c2f1[_0x2a5bb1(0x166)]['y'],_0x24f52f+=_0x11c2f1[_0x2a5bb1(0x201)]['y'];}}_0x1bfc12[_0x2a5bb1(0x161)](_0x1c3fbb,_0x24f52f,_0x4d6d19,_0x596499,_0xb08e2);},VisuMZ[_0x32c3be(0x174)][_0x32c3be(0x10c)]=Game_Battler[_0x32c3be(0x192)][_0x32c3be(0x1f6)],Game_Battler[_0x32c3be(0x192)][_0x32c3be(0x1f6)]=function(){const _0x5de92a=_0x32c3be;VisuMZ[_0x5de92a(0x174)][_0x5de92a(0x10c)][_0x5de92a(0x128)](this),this['performDodgeActSeqImpact']();},VisuMZ['ActSeqImpact'][_0x32c3be(0x1c8)]=Game_Battler[_0x32c3be(0x192)][_0x32c3be(0x136)],Game_Battler[_0x32c3be(0x192)][_0x32c3be(0x136)]=function(){const _0x194901=_0x32c3be;VisuMZ[_0x194901(0x174)][_0x194901(0x1c8)][_0x194901(0x128)](this),this[_0x194901(0x218)]();},Game_Battler['prototype'][_0x32c3be(0x218)]=function(){const _0x275ec1=_0x32c3be,_0x2a7e6c=VisuMZ[_0x275ec1(0x174)]['Settings'][_0x275ec1(0x14c)];if(!_0x2a7e6c)return;if(!_0x2a7e6c[_0x275ec1(0x16a)])return;if(!SceneManager[_0x275ec1(0x1cf)]())return;const _0x242a97=SceneManager[_0x275ec1(0x1ab)][_0x275ec1(0x106)];if(!_0x242a97)return;if(!this[_0x275ec1(0x1c2)]())return;if(this[_0x275ec1(0x1c2)]()[_0x275ec1(0x1c3)]>0x0)return;const _0x290582=Math[_0x275ec1(0x138)](0x168),_0x326894=_0x2a7e6c[_0x275ec1(0x1b1)]||0.1,_0x13ff16=_0x2a7e6c[_0x275ec1(0x18d)],_0x49dd4f=_0x2a7e6c[_0x275ec1(0x101)]||'Linear';this[_0x275ec1(0x1c2)]()[_0x275ec1(0x183)](_0x290582,_0x326894,_0x13ff16,_0x49dd4f);},VisuMZ['ActSeqImpact'][_0x32c3be(0xf6)]=Sprite_Battler[_0x32c3be(0x192)][_0x32c3be(0x1fa)],Sprite_Battler[_0x32c3be(0x192)][_0x32c3be(0x1fa)]=function(){const _0x3910ea=_0x32c3be;VisuMZ['ActSeqImpact'][_0x3910ea(0xf6)][_0x3910ea(0x128)](this),this[_0x3910ea(0x1dc)]();},Sprite_Battler[_0x32c3be(0x192)]['createActSeqImpactFilters']=function(){const _0x45670b=_0x32c3be;if(!this[_0x45670b(0x145)])return;this['_distortionSprite'][_0x45670b(0x112)]=this[_0x45670b(0x145)][_0x45670b(0x112)]||[],this[_0x45670b(0x194)]();},VisuMZ[_0x32c3be(0x174)][_0x32c3be(0x18f)]=Sprite_Battler[_0x32c3be(0x192)]['update'],Sprite_Battler[_0x32c3be(0x192)][_0x32c3be(0x197)]=function(){const _0x5d1dfd=_0x32c3be;VisuMZ['ActSeqImpact'][_0x5d1dfd(0x18f)][_0x5d1dfd(0x128)](this),this[_0x5d1dfd(0x163)](),this['updateMotionBlurImpactFilter']();},Sprite_Battler['prototype'][_0x32c3be(0x163)]=function(){const _0x43c518=_0x32c3be;if(this[_0x43c518(0x13c)]===Sprite_SvEnemy)return;if(!this[_0x43c518(0x14b)])return;if(!this[_0x43c518(0x14b)][_0x43c518(0x165)]())return;if(!this[_0x43c518(0x14b)]['isAppeared']())return;if(!this[_0x43c518(0x208)])return;if(!this['_distortionSprite'])return;if(this[_0x43c518(0x12c)]){this[_0x43c518(0x12c)]=![];return;}if(Imported['VisuMZ_2_DragonbonesUnion']&&this[_0x43c518(0x1b5)]){}const _0x48d5b3=this[_0x43c518(0x14b)][_0x43c518(0x215)]();if(!_0x48d5b3['visible'])return;const _0x520984=Math['max'](0x1,_0x48d5b3[_0x43c518(0x12a)]);if(Graphics[_0x43c518(0x14f)]%_0x520984!==0x0)return;const _0x46c9e2=SceneManager[_0x43c518(0x1ab)][_0x43c518(0x106)]['_motionTrailContainer'];if(!_0x46c9e2)return;this[_0x43c518(0x12c)]=!![];const _0x4356ed=new Sprite_BattlerMotionTrail(this,_0x48d5b3);_0x46c9e2['addChild'](_0x4356ed);},Sprite_Battler[_0x32c3be(0x192)][_0x32c3be(0x194)]=function(){const _0x389f1a=_0x32c3be;if(!PIXI['filters'][_0x389f1a(0x154)])return;this['_motionBlurImpactDuration']=0x0,this['_motionBlurImpactWholeDuration']=0x0,this[_0x389f1a(0x1f5)]='Linear',this[_0x389f1a(0x170)]=new PIXI[(_0x389f1a(0x112))][(_0x389f1a(0x154))](),this[_0x389f1a(0x170)]['velocity']['x']=0x0,this[_0x389f1a(0x170)]['velocity']['y']=0x0,this[_0x389f1a(0x145)][_0x389f1a(0x112)][_0x389f1a(0x1ff)](this['_motionBlurImpactFilter']);},Sprite_Battler[_0x32c3be(0x192)]['setupMotionBlurImpactFilter']=function(_0x5e86d2,_0x349cf5,_0x3a91c4,_0x353f12){const _0x564ab3=_0x32c3be;if(!this[_0x564ab3(0x170)])return;const _0x18352d=this[_0x564ab3(0x170)];this[_0x564ab3(0x1c3)]=_0x3a91c4,this[_0x564ab3(0x104)]=_0x3a91c4,this[_0x564ab3(0x1f5)]=_0x353f12;const _0x2a9993=this[_0x564ab3(0x207)]()*_0x349cf5,_0x3d3b95=_0x2a9993*Math[_0x564ab3(0x1fb)](_0x5e86d2*Math['PI']/0xb4),_0xd6b827=-_0x2a9993*Math[_0x564ab3(0x1d3)](_0x5e86d2*Math['PI']/0xb4);_0x18352d[_0x564ab3(0x11c)]['x']=_0x3d3b95,_0x18352d[_0x564ab3(0x11c)]['y']=_0xd6b827;},Sprite_Battler[_0x32c3be(0x192)][_0x32c3be(0x1ea)]=function(){const _0x5f5bf3=_0x32c3be;if(!this[_0x5f5bf3(0x170)])return;if(this[_0x5f5bf3(0x1c3)]<=0x0)return;const _0x47f9b1=this[_0x5f5bf3(0x170)],_0x48742f=this[_0x5f5bf3(0x1c3)]||0x0,_0x335610=this['_motionBlurImpactWholeDuration']||_0x48742f,_0x450140=0x0,_0x320b24=this[_0x5f5bf3(0x1f5)];_0x47f9b1['velocity']['x']=VisuMZ['ActSeqImpact'][_0x5f5bf3(0x17a)](_0x47f9b1[_0x5f5bf3(0x11c)]['x'],_0x450140,_0x48742f,_0x335610,_0x320b24),_0x47f9b1[_0x5f5bf3(0x11c)]['y']=VisuMZ['ActSeqImpact'][_0x5f5bf3(0x17a)](_0x47f9b1[_0x5f5bf3(0x11c)]['y'],_0x450140,_0x48742f,_0x335610,_0x320b24),this[_0x5f5bf3(0x1c3)]--,this[_0x5f5bf3(0x1c3)]<=0x0&&('oKRKN'==='oKRKN'?(_0x47f9b1[_0x5f5bf3(0x11c)]['x']=0x0,_0x47f9b1[_0x5f5bf3(0x11c)]['y']=0x0):(_0x4eb837[_0x5f5bf3(0x174)][_0x5f5bf3(0x186)][_0x5f5bf3(0x128)](this,_0x25ad16),this['onDamageActSeqImpact'](_0x5ee4e2)));},VisuMZ[_0x32c3be(0x174)][_0x32c3be(0x176)]=Sprite_Battler['prototype'][_0x32c3be(0x1b9)],Sprite_Battler[_0x32c3be(0x192)][_0x32c3be(0x1b9)]=function(){const _0x53ebaa=_0x32c3be;VisuMZ[_0x53ebaa(0x174)][_0x53ebaa(0x176)][_0x53ebaa(0x128)](this),this['createInjectAnimationSprite']();},Sprite_Battler[_0x32c3be(0x192)]['createInjectAnimationSprite']=function(){const _0x3328bd=_0x32c3be;this[_0x3328bd(0x1ca)]=new Sprite_InjectAnimation();},Sprite_Battler[_0x32c3be(0x192)]['isInjectAnimating']=function(){const _0x5659a5=_0x32c3be;if(!this[_0x5659a5(0x1ca)])return![];if(this[_0x5659a5(0x1ca)][_0x5659a5(0xf8)])return!![];return this[_0x5659a5(0x19a)]();},Sprite_Battler[_0x32c3be(0x192)][_0x32c3be(0x1db)]=function(){const _0x2cea98=_0x32c3be;if(!this[_0x2cea98(0x1ca)])return![];return this[_0x2cea98(0x1ca)][_0x2cea98(0xf8)];},Sprite_Battler[_0x32c3be(0x192)][_0x32c3be(0x19a)]=function(){const _0x508e1a=_0x32c3be;if(!this[_0x508e1a(0x1ca)])return![];return this[_0x508e1a(0x1ca)][_0x508e1a(0x125)]>0x0;},Spriteset_Battle['prototype']['isAnyoneInjectAnimating']=function(){const _0x422009=_0x32c3be;return this[_0x422009(0x126)]()[_0x422009(0x10b)](_0x4040e1=>_0x4040e1[_0x422009(0x1a8)]());},Spriteset_Battle[_0x32c3be(0x192)][_0x32c3be(0x1cd)]=function(){const _0x1afc28=_0x32c3be;return this[_0x1afc28(0x126)]()['some'](_0x3dfd94=>_0x3dfd94[_0x1afc28(0x1db)]());},Sprite_Battler[_0x32c3be(0x192)][_0x32c3be(0x199)]=function(_0x40f04e){const _0x5872f3=_0x32c3be;if(!this['_injectAnimationSprite'])return;this[_0x5872f3(0x1ca)][_0x5872f3(0x1a3)](_0x40f04e);},Sprite_Battler[_0x32c3be(0x192)][_0x32c3be(0x19e)]=function(_0xc340){const _0x5622c4=_0x32c3be;if(!this[_0x5622c4(0x1ca)])return;this[_0x5622c4(0x1ca)][_0x5622c4(0x184)]();},Sprite_Battler[_0x32c3be(0x192)]['pauseInjectAnimation']=function(_0x146760){const _0x44d2fc=_0x32c3be;if(!this[_0x44d2fc(0x1ca)])return;this['_injectAnimationSprite'][_0x44d2fc(0x1df)](_0x146760);};Imported[_0x32c3be(0x1b0)]&&(VisuMZ[_0x32c3be(0x174)][_0x32c3be(0x1d1)]=Sprite_Actor[_0x32c3be(0x192)][_0x32c3be(0x1bc)],Sprite_Actor['prototype'][_0x32c3be(0x1bc)]=function(){const _0xf3d0e4=_0x32c3be;if(this[_0xf3d0e4(0x16b)]){if('AsaXx'===_0xf3d0e4(0x1ed)){if(!this[_0xf3d0e4(0x145)])return;this[_0xf3d0e4(0x145)][_0xf3d0e4(0x112)]=this[_0xf3d0e4(0x145)][_0xf3d0e4(0x112)]||[],this[_0xf3d0e4(0x194)]();}else this[_0xf3d0e4(0x16b)][_0xf3d0e4(0x125)]=0xff;}VisuMZ[_0xf3d0e4(0x174)]['Sprite_Actor_updateShadowDragonbonesUnion'][_0xf3d0e4(0x128)](this),this['isInjectAnimationStarted']&&this[_0xf3d0e4(0x19a)]()&&(this[_0xf3d0e4(0x12b)][_0xf3d0e4(0x114)]=![],this['_weaponSprite'][_0xf3d0e4(0x114)]=![],this['_stateSprite']['visible']=![],this[_0xf3d0e4(0x16b)]&&(_0xf3d0e4(0x1aa)!=='iegnl'?this[_0xf3d0e4(0x16b)][_0xf3d0e4(0x125)]=0x0:(_0x270b92[_0xf3d0e4(0x174)][_0xf3d0e4(0x1c8)][_0xf3d0e4(0x128)](this),this[_0xf3d0e4(0x218)]())));});;function _0x84e6(_0x1ff889,_0x34343f){const _0x45bc2c=_0x45bc();return _0x84e6=function(_0x84e6f5,_0x57227a){_0x84e6f5=_0x84e6f5-0xf3;let _0x3092bb=_0x45bc2c[_0x84e6f5];return _0x3092bb;},_0x84e6(_0x1ff889,_0x34343f);}VisuMZ[_0x32c3be(0x174)][_0x32c3be(0x1c1)]=Sprite_Damage[_0x32c3be(0x192)][_0x32c3be(0x167)],Sprite_Damage[_0x32c3be(0x192)][_0x32c3be(0x167)]=function(){const _0x270ba4=_0x32c3be;VisuMZ[_0x270ba4(0x174)][_0x270ba4(0x1c1)]['call'](this),this[_0x270ba4(0x109)]();},Sprite_Damage[_0x32c3be(0x192)][_0x32c3be(0x109)]=function(){const _0x2707ed=_0x32c3be,_0x1fca5c=VisuMZ[_0x2707ed(0x174)][_0x2707ed(0x1c9)][_0x2707ed(0x16e)];if(!_0x1fca5c)return;if(!_0x1fca5c[_0x2707ed(0x16a)])return;const _0x5d9b43=SceneManager[_0x2707ed(0x1ab)]['_spriteset'];if(!_0x5d9b43)return;if(_0x5d9b43[_0x2707ed(0x1a1)]>0x0)return;const _0x4e31cc=_0x1fca5c[_0x2707ed(0x217)]||0x1,_0x47360d=_0x1fca5c[_0x2707ed(0x18d)]||0x1,_0x3ccbe3=_0x1fca5c[_0x2707ed(0x101)]||_0x2707ed(0x1bd);_0x5d9b43[_0x2707ed(0x168)](_0x4e31cc,_0x47360d,_0x3ccbe3);};function _0x45bc(){const _0x4c5e8b=['setupCriticalEffectActSeqImpact','setBattlerMotionTrailData','some','Game_Battler_performMiss','scale','Spriteset_Battle_createBattleFieldContainer','updateBattlerContainer','brightness','height','filters','width','visible','_sourceSprite','time','_baseY','clearBattlerMotionTrailData','RGBSplitFilter','_cellHeight','createDragonbonesArmature','velocity','Spriteset_Battle_adjustFlippedBattlefield','isInputting','children','_hue','red','opacityStart','Spriteset_Base_createBaseFilters','_blueRedInvertImpactFilter','opacity','battlerSprites','_targetIndex','call','IJYzl','delay','_mainSprite','_isCreatingMotionTrailSprite','NUM','STR','includes','_zoomBlurImpactWholeDuration','updateMainSpriteVisibility','_cellWidth','removeChild','_battlerMotionTrailData','length','performEvasion','45HKXcdh','randomInt','updateShockwaveImpactFilters','Ijtig','createBlueRedInvertImpactFilter','constructor','10DcIFFa','updateDuration','ARRAYJSON','91Jxuifz','_frameCount','filename','exit','ARRAYNUM','_distortionSprite','_baseSprite','createActSeqImpactBaseFilters','createOversaturateImpactFilter','ARRAYEVAL','Linear','_battler','DodgeMotionBlur','description','GoaNl','frameCount','EiTzP','map','toUpperCase','sxiNn','MotionBlurFilter','Wave','sortMotionTrailBattlers','waveLength','_battleField','nsnev','bTlWi','updateSpriteOffset','HgXsT','nextOpacity','updateFrame','ShockwaveFilter','_offsetX','setupShockwaveImpactFilter','updateActSeqImpactBaseFilters','updateMotionTrail','setColorTone','isAlive','_windowLayer','setupCriticalEffect','setupRgbSplitImpactFilter','_oversaturateImpactFilter','Enable','_dragonbonesSpriteContainer','_vertCells','filter','CriticalColorBreak','_negativeImpactFilter','_motionBlurImpactFilter','setupNegativeImpactFilter','animation','375426MDmDLp','ActSeqImpact','isActor','Sprite_Battler_initMembers','strength','120FqmhWh','1397106snvlrp','applyEasing','desaturate','return\x200','_rgbSplitImpactFilter','YQENG','dragonbonesData','initialize','updateDelay','matchSpriteProperties','setupMotionBlurImpactFilter','stop','negative','Game_Battler_onDamage','adjustFlippedBattlefield','disposeSprite','Spriteset_Base_updateBaseFilters','_rgbSplitImpactEasing','setHue','xaGxd','Duration','currentTime','Sprite_Battler_update','amplitude','startGameLoop','prototype','setupBlueRedInvertImpactFilter','createMotionBlurImpactFilter','name','_duration','update','smooth','startInjectAnimation','isInjectAnimationStarted','ZoomBlurFilter','_projectilesContainer','hasMotionTrailSprite','stopInjectAnimation','green','tone','_rgbSplitImpactDuration','format','setup','Amp','_sourceData','createNegativeImpactFilter','armature','isInjectAnimating','max','KdMmD','_scene','angle','duration','_zoomBlurImpactEasing','3509916DKFXEh','VisuMZ_2_DragonbonesUnion','Rate','offsetX','match','skew','_dragonbones','_frame','floor','_waitCount','initMembers','bitmap','_motionTrailContainer','updateShadowDragonbonesUnion','OutBack','createBattleFieldContainer','addChild','SceneManager_determineRepeatNumber','Sprite_Damage_setupCriticalEffect','battler','_motionBlurImpactDuration','bOHdq','startAnimation','57614RCpRvO','hue','Game_Battler_performEvasion','Settings','_injectAnimationSprite','qYGgL','_pause','isAnyoneInjectAniPrepping','setupZoomBlurImpactFilter','isSceneBattle','_rgbSplitImpactWholeDuration','Sprite_Actor_updateShadowDragonbonesUnion','updateZoomBlurImpactFilter','sin','anchor','_shockwaveImpactFilters','1891164WGJZdQ','innerRadius','stopGameLoop','ConvertParams','xMTZX','isInjectAniPrepping','createActSeqImpactFilters','cfmsr','create','setPause','offsetY','updateBaseFilters','mainSpriteHeight','setBattleImpactTimeScale','onDamage','parameters','bind','GuardShockWave','createBaseFilters','setFrame','updateMotionBlurImpactFilter','937720TbDOyf','toBGR','DefxN','getBattleImpactTimeScale','_offsetY','center','parse','radius','setupMotionTrailProperties','gotoAndStopByTime','_motionBlurImpactEasing','performMiss','ApplyEasing','updateRgbSplitImpactFilter','VisuMZ_1_BattleCore','createDistortionSprite','cos','jLfxg','STRUCT','trim','push','HkVJb','_statusWindow','ARRAYSTR','createDefaultBattlerMotionTrailData','determineRepeatNumber','createDesaturateImpactFilter','_battleImpactTimeScale','mainSpriteWidth','parent','createZoomBlurImpactFilter','35022427JDPktR','putMotionTrailBattlersOnTop','createChildren','FMXJI','hlIIV','ZcBNJ','Spriteset_Battle_updateBattlerContainer','12bdSDRx','_frameIndex','_baseX','ColorMatrixFilter','battlerMotionTrailData','yWUwb','Intensity','performDodgeActSeqImpact','_battlerContainer','status','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','timeSpeed','_zoomBlurImpactDuration','Sprite_Battler_createDistortionSprite','createRgbSplitImpactFilter','_prep','setupOversaturateImpactFilter','gWtiT','_zoomBlurImpactFilter','enabled','isSideView','blue','mJJHB','_horzCells','EasingType','updateNextOpacities','_desaturateImpactFilter','_motionBlurImpactWholeDuration','BNsDX','_spriteset','MsSQd','EVAL'];_0x45bc=function(){return _0x4c5e8b;};return _0x45bc();}function Sprite_BattlerMotionTrail(){const _0x36e207=_0x32c3be;this[_0x36e207(0x180)](...arguments);}Sprite_BattlerMotionTrail[_0x32c3be(0x192)]=Object[_0x32c3be(0x1de)](Sprite[_0x32c3be(0x192)]),Sprite_BattlerMotionTrail['prototype'][_0x32c3be(0x13c)]=Sprite_BattlerMotionTrail,Sprite_BattlerMotionTrail['prototype']['initialize']=function(_0x2ec78b,_0x3de960){const _0x3f96c5=_0x32c3be;this[_0x3f96c5(0x115)]=_0x2ec78b,this[_0x3f96c5(0x1a5)]=_0x3de960,Sprite[_0x3f96c5(0x192)][_0x3f96c5(0x180)][_0x3f96c5(0x128)](this),this[_0x3f96c5(0x20c)](),this[_0x3f96c5(0x1f3)]();},Sprite_BattlerMotionTrail['prototype'][_0x32c3be(0x20c)]=function(){const _0xceb2e9=_0x32c3be,_0x19d717=this[_0xceb2e9(0x115)]['_distortionSprite'];this[_0xceb2e9(0x145)]=new Sprite(),this['addChild'](this[_0xceb2e9(0x145)]),this[_0xceb2e9(0x182)](this[_0xceb2e9(0x145)],_0x19d717,!![]);},Sprite_BattlerMotionTrail['prototype'][_0x32c3be(0x182)]=function(_0x166224,_0x1f7196,_0xc5f5e2){const _0x8872a5=_0x32c3be;_0x166224[_0x8872a5(0x1ba)]=_0x1f7196['bitmap'];const _0x52215c=_0x1f7196[_0x8872a5(0x1b6)];_0x52215c&&_0x166224[_0x8872a5(0x1e9)](_0x52215c['x'],_0x52215c['y'],_0x52215c[_0x8872a5(0x113)],_0x52215c[_0x8872a5(0x111)]);_0x166224['visible']=_0x1f7196[_0x8872a5(0x114)],_0x166224['anchor']['x']=_0x1f7196[_0x8872a5(0x1d4)]['x'],_0x166224['anchor']['y']=_0x1f7196[_0x8872a5(0x1d4)]['y'],_0x166224['scale']['x']=_0x1f7196['scale']['x'],_0x166224[_0x8872a5(0x10d)]['y']=_0x1f7196[_0x8872a5(0x10d)]['y'],_0x166224['angle']=_0x1f7196[_0x8872a5(0x1ac)],_0x166224[_0x8872a5(0x1b4)]['x']=_0x1f7196[_0x8872a5(0x1b4)]['x'],_0x166224['skew']['y']=_0x1f7196[_0x8872a5(0x1b4)]['y'],_0x166224['x']=_0x1f7196['x'],_0x166224['y']=_0x1f7196['y'],_0x166224[_0x8872a5(0x18b)](_0x1f7196[_0x8872a5(0x120)]);if(_0xc5f5e2){if(_0x8872a5(0x1cb)==='qYGgL')for(const _0x266a38 of _0x1f7196[_0x8872a5(0x11f)]){if(!_0x266a38)continue;if(_0x266a38[_0x8872a5(0x1a7)])this[_0x8872a5(0x11b)](_0x166224,_0x266a38);else{const _0x3a2b48=new Sprite();_0x166224[_0x8872a5(0x1bf)](_0x3a2b48),this[_0x8872a5(0x182)](_0x3a2b48,_0x266a38,!![]);}}else _0x58a223[_0x8872a5(0x174)][_0x8872a5(0x10e)]['call'](this),this[_0x8872a5(0x1bb)]=new _0x544468(),this[_0x8872a5(0x158)][_0x8872a5(0x1bf)](this[_0x8872a5(0x1bb)]),this['_projectilesContainer']&&this[_0x8872a5(0x158)][_0x8872a5(0x1bf)](this[_0x8872a5(0x19c)]);}},Sprite_BattlerMotionTrail[_0x32c3be(0x192)][_0x32c3be(0x11b)]=function(_0x1b48b1,_0x2efad5){const _0x561574=_0x32c3be,_0x392c3b=this['_sourceSprite'][_0x561574(0x14b)][_0x561574(0x17f)]();this[_0x561574(0x1b5)]=DragonbonesManager['createArmature'](_0x392c3b['battler']),_0x1b48b1[_0x561574(0x1bf)](this[_0x561574(0x1b5)]);const _0x5d5af7=_0x2efad5[_0x561574(0x172)]['lastAnimationName'],_0x4ac4a3=_0x2efad5[_0x561574(0x172)]['lastAnimationState'][_0x561574(0x18e)];this['_dragonbones'][_0x561574(0x172)][_0x561574(0x1f4)](_0x5d5af7,_0x4ac4a3),this[_0x561574(0x1b5)]['x']=_0x392c3b[_0x561574(0x1b2)],this[_0x561574(0x1b5)]['y']=_0x392c3b[_0x561574(0x1e0)],this[_0x561574(0x1b5)][_0x561574(0x10d)]['x']=_0x392c3b['scaleX'],this[_0x561574(0x1b5)][_0x561574(0x10d)]['y']=_0x392c3b['scaleY'],_0x1b48b1['opacity']=0x0,_0x1b48b1['nextOpacity']=0x2,_0x1b48b1['update']();},Sprite_BattlerMotionTrail['prototype'][_0x32c3be(0x1f3)]=function(){const _0x172452=_0x32c3be,_0x296fa6=this['_sourceSprite'],_0x5d5432=this[_0x172452(0x1a5)];this[_0x172452(0x196)]=_0x5d5432[_0x172452(0x1ad)],this[_0x172452(0x125)]=_0x5d5432[_0x172452(0x122)],this['matchSpriteProperties'](this,_0x296fa6),this[_0x172452(0x213)]=_0x296fa6[_0x172452(0x213)],this[_0x172452(0x117)]=_0x296fa6['_baseY'],this[_0x172452(0x18b)](_0x5d5432[_0x172452(0x1c7)]),this['setColorTone'](_0x5d5432[_0x172452(0x1a0)]);},Sprite_BattlerMotionTrail[_0x32c3be(0x192)][_0x32c3be(0x197)]=function(){const _0x31bdb8=_0x32c3be;Sprite[_0x31bdb8(0x192)][_0x31bdb8(0x197)][_0x31bdb8(0x128)](this),this[_0x31bdb8(0x102)](this[_0x31bdb8(0x11f)]),this[_0x31bdb8(0x13e)]();},Sprite_BattlerMotionTrail[_0x32c3be(0x192)][_0x32c3be(0x102)]=function(_0x186851){const _0x1b0876=_0x32c3be;if(!_0x186851)return;for(const _0x1d821e of _0x186851){if(!_0x1d821e)continue;_0x1d821e[_0x1b0876(0x15d)]&&(_0x1d821e[_0x1b0876(0x15d)]--,_0x1d821e['nextOpacity']<=0x0&&(_0x1b0876(0x1fc)===_0x1b0876(0x1fc)?(_0x1d821e[_0x1b0876(0x125)]=0xff,_0x1d821e[_0x1b0876(0x15d)]=undefined):_0x1aa63e[_0x1b0876(0x1e9)](_0x1638e9['x'],_0x45b98d['y'],_0x47bcd4[_0x1b0876(0x113)],_0x1a8beb['height']))),this[_0x1b0876(0x102)](_0x1d821e[_0x1b0876(0x11f)]);}},Sprite_BattlerMotionTrail['prototype'][_0x32c3be(0x13e)]=function(){const _0x3a60a5=_0x32c3be;if(this[_0x3a60a5(0x196)]>0x0){const _0x1bd155=this[_0x3a60a5(0x196)];this[_0x3a60a5(0x125)]=(this[_0x3a60a5(0x125)]*(_0x1bd155-0x1)+0x0)/_0x1bd155,this[_0x3a60a5(0x196)]--;if(this['_duration']<=0x0){if('UbgsV'!==_0x3a60a5(0x107))this[_0x3a60a5(0x188)]();else{const _0x533890=_0x56f5f6[_0x3a60a5(0x219)];_0x533890[_0x3a60a5(0x1bf)](this[_0x3a60a5(0x115)]),_0x27c6c5[_0x3a60a5(0x10f)]();}}}},Sprite_BattlerMotionTrail[_0x32c3be(0x192)][_0x32c3be(0x188)]=function(){const _0x13a686=_0x32c3be;this[_0x13a686(0x208)]['removeChild'](this);if(this['_dragonbones']){if(_0x13a686(0x1da)!==_0x13a686(0x1da)){if(!this[_0x13a686(0x1ca)])return![];return this['_injectAnimationSprite'][_0x13a686(0x125)]>0x0;}else this[_0x13a686(0x1b5)]['dispose'](),this[_0x13a686(0x1b5)]=null;}const _0x452cc9=SceneManager[_0x13a686(0x1ab)][_0x13a686(0x106)];if(_0x452cc9&&!_0x452cc9[_0x13a686(0x19d)](this[_0x13a686(0x115)])){const _0x3e0a5d=_0x452cc9[_0x13a686(0x219)];_0x3e0a5d['addChild'](this['_sourceSprite']),_0x452cc9[_0x13a686(0x10f)]();}};function Sprite_InjectAnimation(){const _0x26647b=_0x32c3be;this[_0x26647b(0x180)](...arguments);}Sprite_InjectAnimation[_0x32c3be(0x192)]=Object[_0x32c3be(0x1de)](Sprite['prototype']),Sprite_InjectAnimation[_0x32c3be(0x192)][_0x32c3be(0x13c)]=Sprite_InjectAnimation,Sprite_InjectAnimation['prototype'][_0x32c3be(0x180)]=function(){const _0x5a7deb=_0x32c3be;Sprite[_0x5a7deb(0x192)]['initialize'][_0x5a7deb(0x128)](this),this[_0x5a7deb(0x1b9)]();},Sprite_InjectAnimation[_0x32c3be(0x192)]['initMembers']=function(){const _0x21b38d=_0x32c3be;this['anchor']['x']=0.5,this['anchor']['y']=0x1,this[_0x21b38d(0x141)]=0x0,this['_frameDelay']=0x1,this[_0x21b38d(0x212)]=0x0,this[_0x21b38d(0x127)]=0x0,this[_0x21b38d(0x100)]=0x1,this[_0x21b38d(0x16c)]=0x1,this['_cellWidth']=0x1,this[_0x21b38d(0x11a)]=0x1,this['_offsetX']=0x0,this[_0x21b38d(0x1ef)]=0x0,this[_0x21b38d(0x125)]=0x0,this['_pause']=![];},Sprite_InjectAnimation[_0x32c3be(0x192)]['setup']=function(_0x1550d1){const _0x318687=_0x32c3be;this[_0x318687(0x1ba)]=ImageManager['loadSvActor'](_0x1550d1[_0x318687(0x142)]),this[_0x318687(0x100)]=_0x1550d1['horzCells'],this['_vertCells']=_0x1550d1['vertCells'],this['_frameDelay']=_0x1550d1['frameDelay'],this['_targetIndex']=this[_0x318687(0x100)]*this[_0x318687(0x16c)],this[_0x318687(0x160)]=_0x1550d1['offsetX'],this['_offsetY']=_0x1550d1['offsetY'],this['_prep']=!![],this[_0x318687(0x1ba)][_0x318687(0x198)]=_0x1550d1['smooth'],this[_0x318687(0x1cc)]=![],this[_0x318687(0x1ba)]['addLoadListener'](this[_0x318687(0x1c5)][_0x318687(0x1e6)](this));},Sprite_InjectAnimation[_0x32c3be(0x192)][_0x32c3be(0x1c5)]=function(){const _0x26c53d=_0x32c3be;this[_0x26c53d(0x125)]=0xff,this['_frameCount']=0x0,this['_frameIndex']=0x0,this[_0x26c53d(0x132)]=Math[_0x26c53d(0x1b7)](this['bitmap'][_0x26c53d(0x113)]/this['_horzCells'])||0x1,this['_cellHeight']=Math[_0x26c53d(0x1b7)](this[_0x26c53d(0x1ba)]['height']/this[_0x26c53d(0x16c)])||0x1,this[_0x26c53d(0x125)]=0xff,this[_0x26c53d(0xf8)]=![],this[_0x26c53d(0x197)]();},Sprite_InjectAnimation['prototype'][_0x32c3be(0x197)]=function(){const _0x2108f0=_0x32c3be;Sprite[_0x2108f0(0x192)][_0x2108f0(0x197)][_0x2108f0(0x128)](this);if(this['opacity']<=0x0)return;this[_0x2108f0(0x181)](),this[_0x2108f0(0x15e)](),this[_0x2108f0(0x15b)](),this[_0x2108f0(0x131)]();},Sprite_InjectAnimation['prototype'][_0x32c3be(0x181)]=function(){const _0x253109=_0x32c3be;if(!this['_pause']&&++this[_0x253109(0x141)]>=this['_frameDelay']){if(_0x253109(0x153)==='xnnoc'){if(!this['_oversaturateImpactFilter'])return;this[_0x253109(0x169)][_0x253109(0xfc)]=_0x14d790,this['update']();}else this[_0x253109(0x141)]=0x0,this[_0x253109(0x212)]++;}this[_0x253109(0x125)]=this[_0x253109(0x212)]<this['_targetIndex']?0xff:0x0;},Sprite_InjectAnimation[_0x32c3be(0x192)][_0x32c3be(0x15e)]=function(){const _0x2ce8ee=_0x32c3be,_0x53d54c=this['_cellWidth'],_0xf03b2=this[_0x2ce8ee(0x11a)],_0x4a54c1=this['_frameIndex']%this[_0x2ce8ee(0x100)]*_0x53d54c,_0x566673=Math['floor'](this[_0x2ce8ee(0x212)]/this[_0x2ce8ee(0x100)])*_0xf03b2;this[_0x2ce8ee(0x1e9)](_0x4a54c1,_0x566673,_0x53d54c,_0xf03b2);},Sprite_InjectAnimation[_0x32c3be(0x192)][_0x32c3be(0x15b)]=function(){const _0x32165a=_0x32c3be;this['x']=this[_0x32165a(0x160)],this['y']=this[_0x32165a(0x1ef)];const _0x2733aa=this[_0x32165a(0x208)][_0x32165a(0x208)][_0x32165a(0x12b)];if(_0x2733aa){if(_0x32165a(0x105)===_0x32165a(0x105))this['x']+=_0x2733aa['x'],this['y']+=_0x2733aa['y'];else return _0x3d8ca1[_0x32165a(0x21a)]&&_0x5d16ef[_0x32165a(0x14d)][_0x32165a(0x12f)]('['+_0xf70187+']');}},Sprite_InjectAnimation[_0x32c3be(0x192)][_0x32c3be(0x131)]=function(){const _0x526553=_0x32c3be;if(!this[_0x526553(0x208)])return;if(!this[_0x526553(0x208)][_0x526553(0x208)])return;const _0x4d0867=this['parent'][_0x526553(0x208)]['_mainSprite'];if(_0x4d0867){if(_0x526553(0xff)!==_0x526553(0xff)){if(!_0xccaf5f['filters'][_0x526553(0x154)])return;this[_0x526553(0x1c3)]=0x0,this[_0x526553(0x104)]=0x0,this[_0x526553(0x1f5)]=_0x526553(0x14a),this[_0x526553(0x170)]=new _0x2e971b[(_0x526553(0x112))]['MotionBlurFilter'](),this[_0x526553(0x170)][_0x526553(0x11c)]['x']=0x0,this[_0x526553(0x170)][_0x526553(0x11c)]['y']=0x0,this[_0x526553(0x145)]['filters']['push'](this[_0x526553(0x170)]);}else _0x4d0867[_0x526553(0x114)]=this[_0x526553(0x125)]<=0x0;}},Sprite_InjectAnimation[_0x32c3be(0x192)][_0x32c3be(0x184)]=function(){const _0xe8a629=_0x32c3be;this[_0xe8a629(0xf8)]=![],this['opacity']=0x0,this[_0xe8a629(0x212)]=this[_0xe8a629(0x127)],this[_0xe8a629(0x131)]();},Sprite_InjectAnimation[_0x32c3be(0x192)][_0x32c3be(0x1df)]=function(_0x5cf427){const _0x2c6e1c=_0x32c3be;this[_0x2c6e1c(0x1cc)]=_0x5cf427;},VisuMZ[_0x32c3be(0x174)][_0x32c3be(0x123)]=Spriteset_Base[_0x32c3be(0x192)]['createBaseFilters'],Spriteset_Base[_0x32c3be(0x192)][_0x32c3be(0x1e8)]=function(){const _0x5642ee=_0x32c3be;VisuMZ[_0x5642ee(0x174)][_0x5642ee(0x123)][_0x5642ee(0x128)](this),this[_0x5642ee(0x147)]();},VisuMZ[_0x32c3be(0x174)][_0x32c3be(0x189)]=Spriteset_Base[_0x32c3be(0x192)][_0x32c3be(0x1e1)],Spriteset_Base['prototype']['updateBaseFilters']=function(){const _0x4c02b3=_0x32c3be;VisuMZ['ActSeqImpact'][_0x4c02b3(0x189)]['call'](this),this[_0x4c02b3(0x162)]();},Spriteset_Base['prototype'][_0x32c3be(0x147)]=function(){const _0xc6eead=_0x32c3be;this[_0xc6eead(0xf7)](),this[_0xc6eead(0x1d5)]=[],this[_0xc6eead(0x194)](),this[_0xc6eead(0x209)](),this['createBlueRedInvertImpactFilter'](),this[_0xc6eead(0x205)](),this['createNegativeImpactFilter'](),this[_0xc6eead(0x148)]();},Spriteset_Base[_0x32c3be(0x192)][_0x32c3be(0x162)]=function(){const _0x4dfb4c=_0x32c3be;this[_0x4dfb4c(0x1f8)](),this[_0x4dfb4c(0x139)](),this[_0x4dfb4c(0x1ea)](),this[_0x4dfb4c(0x1d2)]();},VisuMZ[_0x32c3be(0x174)][_0x32c3be(0x17a)]=function(_0x4d05e7,_0x287c97,_0x5a5503,_0x1cc2c9,_0x63deff){const _0x2bbef7=_0x32c3be,_0x6588bb=VisuMZ[_0x2bbef7(0x1f7)]((_0x1cc2c9-_0x5a5503)/_0x1cc2c9,_0x63deff||'Linear'),_0x547601=VisuMZ[_0x2bbef7(0x1f7)]((_0x1cc2c9-_0x5a5503+0x1)/_0x1cc2c9,_0x63deff||_0x2bbef7(0x14a)),_0x25421b=(_0x4d05e7-_0x287c97*_0x6588bb)/(0x1-_0x6588bb);return _0x25421b+(_0x287c97-_0x25421b)*_0x547601;},Spriteset_Base[_0x32c3be(0x192)][_0x32c3be(0xf7)]=function(){const _0x443ba3=_0x32c3be;if(!PIXI[_0x443ba3(0x112)][_0x443ba3(0x119)])return;if(this[_0x443ba3(0x17d)])return;this[_0x443ba3(0x1a1)]=0x0,this[_0x443ba3(0x1d0)]=0x0,this[_0x443ba3(0x18a)]=_0x443ba3(0x14a),this['_rgbSplitImpactFilter']=new PIXI[(_0x443ba3(0x112))][(_0x443ba3(0x119))](),this['_rgbSplitImpactFilter'][_0x443ba3(0x121)]=[0x0,0x0],this[_0x443ba3(0x17d)][_0x443ba3(0x19f)]=[0x0,0x0],this[_0x443ba3(0x17d)][_0x443ba3(0xfe)]=[0x0,0x0],this[_0x443ba3(0x146)][_0x443ba3(0x112)]['push'](this[_0x443ba3(0x17d)]);},Spriteset_Base[_0x32c3be(0x192)][_0x32c3be(0x168)]=function(_0x7d818d,_0x4077c8,_0x4d4983){const _0x2a48a9=_0x32c3be;if(!this[_0x2a48a9(0x17d)])return;const _0x42af75=this[_0x2a48a9(0x17d)],_0x205f2f=_0x7d818d*0x2;this[_0x2a48a9(0x1a1)]=_0x4077c8,this[_0x2a48a9(0x1d0)]=_0x4077c8,this[_0x2a48a9(0x18a)]=_0x4d4983||_0x2a48a9(0x14a),_0x42af75['red']=[Math[_0x2a48a9(0x138)](_0x205f2f)-_0x7d818d,Math['randomInt'](_0x205f2f)-_0x7d818d],_0x42af75['green']=[Math[_0x2a48a9(0x138)](_0x205f2f)-_0x7d818d,Math['randomInt'](_0x205f2f)-_0x7d818d],_0x42af75[_0x2a48a9(0xfe)]=[Math[_0x2a48a9(0x138)](_0x205f2f)-_0x7d818d,Math['randomInt'](_0x205f2f)-_0x7d818d];},Spriteset_Base['prototype']['updateRgbSplitImpactFilter']=function(){const _0x2e4cc4=_0x32c3be;if(!this[_0x2e4cc4(0x17d)])return;if(this[_0x2e4cc4(0x1a1)]<=0x0)return;const _0x100606=this[_0x2e4cc4(0x17d)],_0xd606f3=this[_0x2e4cc4(0x1a1)]||0x0,_0x2b20e3=this[_0x2e4cc4(0x1d0)]||_0xd606f3,_0x548a37=0x0,_0x567315=this[_0x2e4cc4(0x18a)];_0x100606[_0x2e4cc4(0x121)][0x0]=VisuMZ[_0x2e4cc4(0x174)][_0x2e4cc4(0x17a)](_0x100606[_0x2e4cc4(0x121)][0x0],_0x548a37,_0xd606f3,_0x2b20e3,_0x567315),_0x100606['red'][0x1]=VisuMZ[_0x2e4cc4(0x174)][_0x2e4cc4(0x17a)](_0x100606[_0x2e4cc4(0x121)][0x1],_0x548a37,_0xd606f3,_0x2b20e3,_0x567315),_0x100606[_0x2e4cc4(0x19f)][0x0]=VisuMZ['ActSeqImpact'][_0x2e4cc4(0x17a)](_0x100606[_0x2e4cc4(0x19f)][0x0],_0x548a37,_0xd606f3,_0x2b20e3,_0x567315),_0x100606[_0x2e4cc4(0x19f)][0x1]=VisuMZ[_0x2e4cc4(0x174)]['applyEasing'](_0x100606[_0x2e4cc4(0x19f)][0x1],_0x548a37,_0xd606f3,_0x2b20e3,_0x567315),_0x100606[_0x2e4cc4(0xfe)][0x0]=VisuMZ[_0x2e4cc4(0x174)][_0x2e4cc4(0x17a)](_0x100606[_0x2e4cc4(0xfe)][0x0],_0x548a37,_0xd606f3,_0x2b20e3,_0x567315),_0x100606[_0x2e4cc4(0xfe)][0x1]=VisuMZ[_0x2e4cc4(0x174)][_0x2e4cc4(0x17a)](_0x100606[_0x2e4cc4(0xfe)][0x1],_0x548a37,_0xd606f3,_0x2b20e3,_0x567315),this[_0x2e4cc4(0x1a1)]--;if(this['_rgbSplitImpactDuration']<=0x0){if(_0x2e4cc4(0x13a)===_0x2e4cc4(0x13a))_0x100606[_0x2e4cc4(0x121)]=[0x0,0x0],_0x100606['green']=[0x0,0x0],_0x100606[_0x2e4cc4(0xfe)]=[0x0,0x0];else{const _0x1e21e4=this[_0x2e4cc4(0x196)];this[_0x2e4cc4(0x125)]=(this[_0x2e4cc4(0x125)]*(_0x1e21e4-0x1)+0x0)/_0x1e21e4,this[_0x2e4cc4(0x196)]--,this[_0x2e4cc4(0x196)]<=0x0&&this[_0x2e4cc4(0x188)]();}}},Spriteset_Base['prototype'][_0x32c3be(0x161)]=function(_0x2180aa,_0x5c0fa4,_0x12f9df,_0x5af7a2,_0x1929cf){const _0x46deb8=_0x32c3be;if(!PIXI[_0x46deb8(0x112)][_0x46deb8(0x15f)])return;const _0x402b47=0x2/Math[_0x46deb8(0x1a9)](0x2,_0x1929cf),_0xb2232e=new PIXI[(_0x46deb8(0x112))][(_0x46deb8(0x15f))]();_0xb2232e[_0x46deb8(0x1f0)]=[_0x2180aa,_0x5c0fa4],_0xb2232e[_0x46deb8(0x190)]=_0x12f9df,_0xb2232e[_0x46deb8(0x157)]=_0x5af7a2,_0xb2232e[_0x46deb8(0x110)]=0x1,_0xb2232e[_0x46deb8(0x1f2)]=-0x1,_0xb2232e[_0x46deb8(0xf4)]=_0x402b47,this[_0x46deb8(0x1d5)]['push'](_0xb2232e),this[_0x46deb8(0x146)][_0x46deb8(0x112)][_0x46deb8(0x1ff)](_0xb2232e);},Spriteset_Base['prototype'][_0x32c3be(0x139)]=function(){const _0x1d39db=_0x32c3be;if(!this[_0x1d39db(0x1d5)])return;if(this[_0x1d39db(0x1d5)][_0x1d39db(0x135)]<=0x0)return;for(const _0x2d17ff of this['_shockwaveImpactFilters']){if(!_0x2d17ff)continue;_0x2d17ff['time']+=_0x2d17ff[_0x1d39db(0xf4)],_0x2d17ff[_0x1d39db(0x116)]>=0x2&&(_0x1d39db(0x20f)==='JSeFA'?(_0x40b30a[_0x1d39db(0x125)]=0xff,_0x7b9cc['nextOpacity']=_0xed39b):(this[_0x1d39db(0x1d5)]['remove'](_0x2d17ff),this[_0x1d39db(0x146)][_0x1d39db(0x112)]['remove'](_0x2d17ff)));}},Spriteset_Base[_0x32c3be(0x192)]['createMotionBlurImpactFilter']=function(){const _0x4517c4=_0x32c3be;if(!PIXI[_0x4517c4(0x112)][_0x4517c4(0x154)])return;this['_motionBlurImpactDuration']=0x0,this[_0x4517c4(0x104)]=0x0,this[_0x4517c4(0x1f5)]='Linear',this[_0x4517c4(0x170)]=new PIXI['filters'][(_0x4517c4(0x154))](),this[_0x4517c4(0x170)][_0x4517c4(0x11c)]['x']=0x0,this[_0x4517c4(0x170)][_0x4517c4(0x11c)]['y']=0x0,this[_0x4517c4(0x146)][_0x4517c4(0x112)]['push'](this[_0x4517c4(0x170)]);},Spriteset_Base[_0x32c3be(0x192)]['setupMotionBlurImpactFilter']=function(_0x2ec270,_0x4db323,_0xbf5621,_0x746251){const _0x48a39c=_0x32c3be;if(!this['_motionBlurImpactFilter'])return;const _0x27b62a=this[_0x48a39c(0x170)];this[_0x48a39c(0x1c3)]=_0xbf5621,this['_motionBlurImpactWholeDuration']=_0xbf5621,this['_motionBlurImpactEasing']=_0x746251;const _0x21b3bb=Math[_0x48a39c(0x1a9)](this[_0x48a39c(0x113)],this[_0x48a39c(0x111)])*_0x4db323,_0x2cbbde=_0x21b3bb*Math[_0x48a39c(0x1fb)](_0x2ec270*Math['PI']/0xb4),_0x3ca4db=-_0x21b3bb*Math[_0x48a39c(0x1d3)](_0x2ec270*Math['PI']/0xb4);_0x27b62a[_0x48a39c(0x11c)]['x']=_0x2cbbde,_0x27b62a[_0x48a39c(0x11c)]['y']=_0x3ca4db;},Spriteset_Base[_0x32c3be(0x192)][_0x32c3be(0x1ea)]=function(){const _0x951eb1=_0x32c3be;if(!this[_0x951eb1(0x170)])return;if(this['_motionBlurImpactDuration']<=0x0)return;const _0x1a7e4a=this[_0x951eb1(0x170)],_0x3aba23=this[_0x951eb1(0x1c3)]||0x0,_0xe86806=this[_0x951eb1(0x104)]||_0x3aba23,_0x5c9a05=0x0,_0x3c2fc3=this[_0x951eb1(0x1f5)];_0x1a7e4a['velocity']['x']=VisuMZ[_0x951eb1(0x174)][_0x951eb1(0x17a)](_0x1a7e4a[_0x951eb1(0x11c)]['x'],_0x5c9a05,_0x3aba23,_0xe86806,_0x3c2fc3),_0x1a7e4a[_0x951eb1(0x11c)]['y']=VisuMZ[_0x951eb1(0x174)][_0x951eb1(0x17a)](_0x1a7e4a['velocity']['y'],_0x5c9a05,_0x3aba23,_0xe86806,_0x3c2fc3),this[_0x951eb1(0x1c3)]--,this[_0x951eb1(0x1c3)]<=0x0&&(_0x1a7e4a[_0x951eb1(0x11c)]['x']=0x0,_0x1a7e4a[_0x951eb1(0x11c)]['y']=0x0);},Spriteset_Base[_0x32c3be(0x192)]['createZoomBlurImpactFilter']=function(){const _0x516ea4=_0x32c3be;if(!PIXI[_0x516ea4(0x112)][_0x516ea4(0x19b)])return;this['_zoomBlurImpactDuration']=0x0,this[_0x516ea4(0x130)]=0x0,this[_0x516ea4(0x1ae)]=_0x516ea4(0x14a),this[_0x516ea4(0xfb)]=new PIXI[(_0x516ea4(0x112))][(_0x516ea4(0x19b))](),this['_zoomBlurImpactFilter'][_0x516ea4(0x177)]=0x0,this[_0x516ea4(0xfb)][_0x516ea4(0x1f0)]['x']=Graphics[_0x516ea4(0x113)]/0x2,this[_0x516ea4(0xfb)][_0x516ea4(0x1f0)]['y']=Graphics[_0x516ea4(0x111)]/0x2,this[_0x516ea4(0xfb)][_0x516ea4(0x1d7)]=0x60,this[_0x516ea4(0x146)][_0x516ea4(0x112)][_0x516ea4(0x1ff)](this[_0x516ea4(0xfb)]);},Spriteset_Base[_0x32c3be(0x192)][_0x32c3be(0x1ce)]=function(_0x7a8374,_0x428d3d,_0x52f74b,_0x6a52de,_0x1de787,_0xe3a2bb){const _0x429c1b=_0x32c3be;if(!this[_0x429c1b(0xfb)])return;const _0x5424cc=this[_0x429c1b(0xfb)];this['_zoomBlurImpactDuration']=_0x1de787,this[_0x429c1b(0x130)]=_0x1de787,this[_0x429c1b(0x1ae)]=_0xe3a2bb,_0x5424cc[_0x429c1b(0x177)]=_0x7a8374,_0x5424cc['center']['x']=_0x428d3d,_0x5424cc[_0x429c1b(0x1f0)]['y']=_0x52f74b,_0x5424cc[_0x429c1b(0x1d7)]=_0x6a52de;},Spriteset_Base[_0x32c3be(0x192)][_0x32c3be(0x1d2)]=function(){const _0x5b9545=_0x32c3be;if(!this[_0x5b9545(0xfb)])return;if(this[_0x5b9545(0xf5)]<=0x0)return;const _0xeef08c=this['_zoomBlurImpactFilter'],_0x5a5482=this[_0x5b9545(0xf5)]||0x0,_0x34c176=this[_0x5b9545(0x130)]||_0x5a5482,_0xe4e9d0=0x0,_0xfc9796=this[_0x5b9545(0x1ae)];_0xeef08c[_0x5b9545(0x177)]=VisuMZ[_0x5b9545(0x174)][_0x5b9545(0x17a)](_0xeef08c[_0x5b9545(0x177)],_0xe4e9d0,_0x5a5482,_0x34c176,_0xfc9796),this['_zoomBlurImpactDuration']--;if(this[_0x5b9545(0xf5)]<=0x0){if(_0x5b9545(0x15a)!=='bTlWi'){this[_0x5b9545(0x208)][_0x5b9545(0x133)](this);this[_0x5b9545(0x1b5)]&&(this[_0x5b9545(0x1b5)]['dispose'](),this[_0x5b9545(0x1b5)]=null);const _0x1fb103=_0x26b5cf[_0x5b9545(0x1ab)]['_spriteset'];if(_0x1fb103&&!_0x1fb103['hasMotionTrailSprite'](this[_0x5b9545(0x115)])){const _0x22e01c=_0x1fb103[_0x5b9545(0x219)];_0x22e01c[_0x5b9545(0x1bf)](this[_0x5b9545(0x115)]),_0x1fb103['updateBattlerContainer']();}}else _0xeef08c[_0x5b9545(0x177)]=0x0;}},Spriteset_Base[_0x32c3be(0x192)]['createBlueRedInvertImpactFilter']=function(){const _0x20446c=_0x32c3be;if(!PIXI[_0x20446c(0x112)][_0x20446c(0x214)])return;this[_0x20446c(0x124)]=new PIXI[(_0x20446c(0x112))][(_0x20446c(0x214))](),this['_blueRedInvertImpactFilter'][_0x20446c(0x1ec)](),this[_0x20446c(0x124)]['enabled']=![],this[_0x20446c(0x146)][_0x20446c(0x112)][_0x20446c(0x1ff)](this['_blueRedInvertImpactFilter']);},Spriteset_Base['prototype'][_0x32c3be(0x193)]=function(_0x4b330a){const _0x492712=_0x32c3be;if(!this[_0x492712(0x124)])return;this[_0x492712(0x124)]['enabled']=_0x4b330a,this[_0x492712(0x197)]();},Spriteset_Base[_0x32c3be(0x192)][_0x32c3be(0x205)]=function(){const _0x29e713=_0x32c3be;if(!PIXI[_0x29e713(0x112)][_0x29e713(0x214)])return;this['_desaturateImpactFilter']=new PIXI[(_0x29e713(0x112))][(_0x29e713(0x214))](),this['_desaturateImpactFilter'][_0x29e713(0x17b)](),this[_0x29e713(0x103)][_0x29e713(0xfc)]=![],this[_0x29e713(0x146)][_0x29e713(0x112)]['push'](this[_0x29e713(0x103)]);},Spriteset_Base[_0x32c3be(0x192)]['setupDesaturateImpactFilter']=function(_0x1dffd2){const _0x580b26=_0x32c3be;if(!this[_0x580b26(0x103)])return;this[_0x580b26(0x103)][_0x580b26(0xfc)]=_0x1dffd2,this['update']();},Spriteset_Base[_0x32c3be(0x192)][_0x32c3be(0x1a6)]=function(){const _0x36d173=_0x32c3be;if(!PIXI[_0x36d173(0x112)][_0x36d173(0x214)])return;this[_0x36d173(0x16f)]=new PIXI[(_0x36d173(0x112))][(_0x36d173(0x214))](),this[_0x36d173(0x16f)][_0x36d173(0x185)](),this[_0x36d173(0x16f)][_0x36d173(0xfc)]=![],this[_0x36d173(0x146)][_0x36d173(0x112)][_0x36d173(0x1ff)](this['_negativeImpactFilter']);},Spriteset_Base[_0x32c3be(0x192)][_0x32c3be(0x171)]=function(_0x29f402){const _0x5af9ac=_0x32c3be;if(!this[_0x5af9ac(0x16f)])return;this[_0x5af9ac(0x16f)][_0x5af9ac(0xfc)]=_0x29f402,this[_0x5af9ac(0x197)]();},Spriteset_Base['prototype'][_0x32c3be(0x148)]=function(){const _0x77e7d9=_0x32c3be;if(!PIXI['filters'][_0x77e7d9(0x214)])return;this['_oversaturateImpactFilter']=new PIXI[(_0x77e7d9(0x112))][(_0x77e7d9(0x214))](),this[_0x77e7d9(0x169)]['lsd'](),this[_0x77e7d9(0x169)][_0x77e7d9(0xfc)]=![],this[_0x77e7d9(0x146)]['filters'][_0x77e7d9(0x1ff)](this['_oversaturateImpactFilter']);},Spriteset_Base[_0x32c3be(0x192)][_0x32c3be(0xf9)]=function(_0xe221bd){const _0x535457=_0x32c3be;if(!this[_0x535457(0x169)])return;this[_0x535457(0x169)]['enabled']=_0xe221bd,this['update']();},VisuMZ[_0x32c3be(0x174)][_0x32c3be(0x10e)]=Spriteset_Battle[_0x32c3be(0x192)][_0x32c3be(0x1be)],Spriteset_Battle['prototype'][_0x32c3be(0x1be)]=function(){const _0x27f164=_0x32c3be;VisuMZ[_0x27f164(0x174)][_0x27f164(0x10e)]['call'](this),this[_0x27f164(0x1bb)]=new Sprite(),this[_0x27f164(0x158)]['addChild'](this[_0x27f164(0x1bb)]),this['_projectilesContainer']&&(_0x27f164(0x18c)===_0x27f164(0x18c)?this[_0x27f164(0x158)][_0x27f164(0x1bf)](this[_0x27f164(0x19c)]):(this[_0x27f164(0xf7)](),this[_0x27f164(0x1d5)]=[],this[_0x27f164(0x194)](),this['createZoomBlurImpactFilter'](),this[_0x27f164(0x13b)](),this[_0x27f164(0x205)](),this[_0x27f164(0x1a6)](),this[_0x27f164(0x148)]()));},VisuMZ[_0x32c3be(0x174)][_0x32c3be(0x11d)]=Spriteset_Battle[_0x32c3be(0x192)][_0x32c3be(0x187)],Spriteset_Battle[_0x32c3be(0x192)][_0x32c3be(0x187)]=function(){const _0x16778f=_0x32c3be;VisuMZ[_0x16778f(0x174)][_0x16778f(0x11d)]['call'](this),this[_0x16778f(0x1bb)]&&this[_0x16778f(0x219)]&&(this[_0x16778f(0x1bb)][_0x16778f(0x10d)]['x']=this[_0x16778f(0x219)][_0x16778f(0x10d)]['x'],this[_0x16778f(0x1bb)][_0x16778f(0x10d)]['y']=this[_0x16778f(0x219)][_0x16778f(0x10d)]['y'],this['_motionTrailContainer']['x']=this[_0x16778f(0x219)]['x'],this[_0x16778f(0x1bb)]['y']=this[_0x16778f(0x219)]['y']);},VisuMZ['ActSeqImpact']['Spriteset_Battle_updateBattlerContainer']=Spriteset_Battle[_0x32c3be(0x192)][_0x32c3be(0x10f)],Spriteset_Battle[_0x32c3be(0x192)][_0x32c3be(0x10f)]=function(){const _0x3cf959=_0x32c3be;VisuMZ[_0x3cf959(0x174)][_0x3cf959(0x210)][_0x3cf959(0x128)](this),this[_0x3cf959(0x20b)](),this[_0x3cf959(0x156)]();},Spriteset_Battle[_0x32c3be(0x192)][_0x32c3be(0x20b)]=function(){const _0x463a23=_0x32c3be;for(const _0x2c8a17 of this[_0x463a23(0x219)][_0x463a23(0x11f)]){if('RjaDM'!==_0x463a23(0x216)){if(!_0x2c8a17)continue;if(this[_0x463a23(0x19d)](_0x2c8a17)){if(_0x463a23(0x1dd)!==_0x463a23(0x1dd)){if(!this[_0x463a23(0x170)])return;if(this[_0x463a23(0x1c3)]<=0x0)return;const _0x19f408=this[_0x463a23(0x170)],_0x44ab01=this[_0x463a23(0x1c3)]||0x0,_0x3cf609=this[_0x463a23(0x104)]||_0x44ab01,_0x2d8716=0x0,_0x2bd83c=this[_0x463a23(0x1f5)];_0x19f408[_0x463a23(0x11c)]['x']=_0x2fb178[_0x463a23(0x174)]['applyEasing'](_0x19f408[_0x463a23(0x11c)]['x'],_0x2d8716,_0x44ab01,_0x3cf609,_0x2bd83c),_0x19f408['velocity']['y']=_0x2e39c3[_0x463a23(0x174)][_0x463a23(0x17a)](_0x19f408[_0x463a23(0x11c)]['y'],_0x2d8716,_0x44ab01,_0x3cf609,_0x2bd83c),this['_motionBlurImpactDuration']--,this[_0x463a23(0x1c3)]<=0x0&&(_0x19f408['velocity']['x']=0x0,_0x19f408['velocity']['y']=0x0);}else this[_0x463a23(0x1bb)]['addChild'](_0x2c8a17);}}else{const _0x1fc5e9=this[_0x463a23(0x115)],_0x4819dd=this[_0x463a23(0x1a5)];this['_duration']=_0x4819dd[_0x463a23(0x1ad)],this[_0x463a23(0x125)]=_0x4819dd[_0x463a23(0x122)],this[_0x463a23(0x182)](this,_0x1fc5e9),this[_0x463a23(0x213)]=_0x1fc5e9[_0x463a23(0x213)],this[_0x463a23(0x117)]=_0x1fc5e9[_0x463a23(0x117)],this['setHue'](_0x4819dd[_0x463a23(0x1c7)]),this[_0x463a23(0x164)](_0x4819dd['tone']);}}},Spriteset_Battle[_0x32c3be(0x192)][_0x32c3be(0x19d)]=function(_0x32b56f){const _0x2d0db9=_0x32c3be;if(!this[_0x2d0db9(0x1bb)])return![];return this[_0x2d0db9(0x1bb)]['children']['some'](_0x41f56b=>_0x41f56b[_0x2d0db9(0x115)]===_0x32b56f);},Spriteset_Battle[_0x32c3be(0x192)]['sortMotionTrailBattlers']=function(){const _0x3d27f4=_0x32c3be;if(!this[_0x3d27f4(0x1bb)])return![];const _0x59f27c=this[_0x3d27f4(0x1bb)]['children']['filter'](_0x4687fe=>_0x4687fe[_0x3d27f4(0x13c)]!==Sprite_BattlerMotionTrail);for(const _0x15ad01 of _0x59f27c){this[_0x3d27f4(0x1bb)]['addChild'](_0x15ad01);}},VisuMZ[_0x32c3be(0x174)]['freezeTime']=function(_0x23003f,_0x15dce8){const _0x440379=_0x32c3be;_0x15dce8&&(_0x15dce8[_0x440379(0x1b8)]=_0x15dce8['_waitCount']||0x0,_0x15dce8[_0x440379(0x1b8)]=Math[_0x440379(0x1a9)](_0x15dce8[_0x440379(0x1b8)],0x1)),_0x23003f=_0x23003f||0x1,Graphics[_0x440379(0x1d8)](),setTimeout(Graphics[_0x440379(0x191)]['bind'](Graphics),_0x23003f);};