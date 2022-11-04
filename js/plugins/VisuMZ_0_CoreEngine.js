//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.70;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.70] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
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
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
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
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
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
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
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
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
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
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

function _0x324f(_0x5502ab,_0x46fc1b){const _0x17cdb6=_0x17cd();return _0x324f=function(_0x324f58,_0xa02343){_0x324f58=_0x324f58-0x1ae;let _0x373231=_0x17cdb6[_0x324f58];return _0x373231;},_0x324f(_0x5502ab,_0x46fc1b);}const _0x1c6d52=_0x324f;(function(_0x4c995c,_0x26e06a){const _0x4bceff=_0x324f,_0x36b833=_0x4c995c();while(!![]){try{const _0x454175=parseInt(_0x4bceff(0x948))/0x1+-parseInt(_0x4bceff(0x51e))/0x2*(-parseInt(_0x4bceff(0x679))/0x3)+-parseInt(_0x4bceff(0x78e))/0x4+parseInt(_0x4bceff(0x6a7))/0x5*(parseInt(_0x4bceff(0x27c))/0x6)+parseInt(_0x4bceff(0x5fc))/0x7*(parseInt(_0x4bceff(0x9fb))/0x8)+-parseInt(_0x4bceff(0x652))/0x9+parseInt(_0x4bceff(0x7be))/0xa*(parseInt(_0x4bceff(0x74d))/0xb);if(_0x454175===_0x26e06a)break;else _0x36b833['push'](_0x36b833['shift']());}catch(_0x2a8651){_0x36b833['push'](_0x36b833['shift']());}}}(_0x17cd,0x81f53));var label=_0x1c6d52(0x7b7),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0xd18d2d){const _0x11f4c0=_0x1c6d52;return _0xd18d2d['status']&&_0xd18d2d[_0x11f4c0(0x464)][_0x11f4c0(0xa04)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x1c6d52(0x719)]||{},VisuMZ['ConvertParams']=function(_0x19f368,_0x43052a){const _0x5a4492=_0x1c6d52;for(const _0x4ffbc7 in _0x43052a){if(_0x4ffbc7['match'](/(.*):(.*)/i)){const _0x3107cc=String(RegExp['$1']),_0x215153=String(RegExp['$2'])[_0x5a4492(0x5dd)]()[_0x5a4492(0x40e)]();let _0x50ac90,_0x1d52d0,_0x1472d1;switch(_0x215153){case'NUM':_0x50ac90=_0x43052a[_0x4ffbc7]!==''?Number(_0x43052a[_0x4ffbc7]):0x0;break;case'ARRAYNUM':_0x1d52d0=_0x43052a[_0x4ffbc7]!==''?JSON[_0x5a4492(0x57c)](_0x43052a[_0x4ffbc7]):[],_0x50ac90=_0x1d52d0[_0x5a4492(0x2c7)](_0x3d4329=>Number(_0x3d4329));break;case _0x5a4492(0x9b6):_0x50ac90=_0x43052a[_0x4ffbc7]!==''?eval(_0x43052a[_0x4ffbc7]):null;break;case _0x5a4492(0x56c):_0x1d52d0=_0x43052a[_0x4ffbc7]!==''?JSON['parse'](_0x43052a[_0x4ffbc7]):[],_0x50ac90=_0x1d52d0[_0x5a4492(0x2c7)](_0x3026e9=>eval(_0x3026e9));break;case _0x5a4492(0x525):_0x50ac90=_0x43052a[_0x4ffbc7]!==''?JSON[_0x5a4492(0x57c)](_0x43052a[_0x4ffbc7]):'';break;case _0x5a4492(0x687):_0x1d52d0=_0x43052a[_0x4ffbc7]!==''?JSON['parse'](_0x43052a[_0x4ffbc7]):[],_0x50ac90=_0x1d52d0['map'](_0x5e6b7e=>JSON['parse'](_0x5e6b7e));break;case'FUNC':_0x50ac90=_0x43052a[_0x4ffbc7]!==''?new Function(JSON[_0x5a4492(0x57c)](_0x43052a[_0x4ffbc7])):new Function(_0x5a4492(0x8d0));break;case _0x5a4492(0x644):_0x1d52d0=_0x43052a[_0x4ffbc7]!==''?JSON[_0x5a4492(0x57c)](_0x43052a[_0x4ffbc7]):[],_0x50ac90=_0x1d52d0[_0x5a4492(0x2c7)](_0x598e33=>new Function(JSON[_0x5a4492(0x57c)](_0x598e33)));break;case _0x5a4492(0xa33):_0x50ac90=_0x43052a[_0x4ffbc7]!==''?String(_0x43052a[_0x4ffbc7]):'';break;case _0x5a4492(0x7f8):_0x1d52d0=_0x43052a[_0x4ffbc7]!==''?JSON[_0x5a4492(0x57c)](_0x43052a[_0x4ffbc7]):[],_0x50ac90=_0x1d52d0['map'](_0x26171f=>String(_0x26171f));break;case'STRUCT':_0x1472d1=_0x43052a[_0x4ffbc7]!==''?JSON[_0x5a4492(0x57c)](_0x43052a[_0x4ffbc7]):{},_0x19f368[_0x3107cc]={},VisuMZ['ConvertParams'](_0x19f368[_0x3107cc],_0x1472d1);continue;case _0x5a4492(0x6db):_0x1d52d0=_0x43052a[_0x4ffbc7]!==''?JSON[_0x5a4492(0x57c)](_0x43052a[_0x4ffbc7]):[],_0x50ac90=_0x1d52d0[_0x5a4492(0x2c7)](_0x1323d7=>VisuMZ[_0x5a4492(0x394)]({},JSON[_0x5a4492(0x57c)](_0x1323d7)));break;default:continue;}_0x19f368[_0x3107cc]=_0x50ac90;}}return _0x19f368;},VisuMZ[_0x1c6d52(0x7b7)]['SceneManager_exit']=SceneManager['exit'],SceneManager[_0x1c6d52(0x2d5)]=function(){const _0x8a5858=_0x1c6d52;VisuMZ[_0x8a5858(0x7b7)]['SceneManager_exit'][_0x8a5858(0x78a)](this);if(Utils[_0x8a5858(0x728)]>='1.4.4'){if(typeof nw===_0x8a5858(0x653))nw[_0x8a5858(0x7bf)][_0x8a5858(0x3ce)]();}},(_0x16bd1b=>{const _0x1743ec=_0x1c6d52,_0x249827=_0x16bd1b['name'];for(const _0x3ed08f of dependencies){if(!Imported[_0x3ed08f]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x249827,_0x3ed08f)),SceneManager[_0x1743ec(0x2d5)]();break;}}const _0x11b721=_0x16bd1b[_0x1743ec(0x464)];if(_0x11b721[_0x1743ec(0x91c)](/\[Version[ ](.*?)\]/i)){if(_0x1743ec(0x75a)!=='WwfDz'){if(_0x6da2a6[_0x1743ec(0x4f8)]())return;_0x4e739a[_0x1743ec(0x394)](_0x2a0b2a,_0x5c50dd);const _0x12bfe8=_0x21ec80[_0x1743ec(0x452)];if(_0x12bfe8['match'](/Front/i))_0x195156[_0x1743ec(0x33b)](![]);else _0x12bfe8[_0x1743ec(0x91c)](/Side/i)?_0x592f49[_0x1743ec(0x33b)](!![]):_0x4142a1['setSideView'](!_0x2f7669[_0x1743ec(0x86d)]());}else{const _0x29b3fc=Number(RegExp['$1']);_0x29b3fc!==VisuMZ[label][_0x1743ec(0x4c7)]&&(alert(_0x1743ec(0x799)[_0x1743ec(0x649)](_0x249827,_0x29b3fc)),SceneManager['exit']());}}if(_0x11b721[_0x1743ec(0x91c)](/\[Tier[ ](\d+)\]/i)){const _0x38e9f3=Number(RegExp['$1']);_0x38e9f3<tier?'QWBDa'!==_0x1743ec(0x252)?this['drawText'](_0x3f0f5d,_0x5d30b5,_0x113f56,_0x2ced34):(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1743ec(0x649)](_0x249827,_0x38e9f3,tier)),SceneManager[_0x1743ec(0x2d5)]()):tier=Math[_0x1743ec(0x269)](_0x38e9f3,tier);}VisuMZ[_0x1743ec(0x394)](VisuMZ[label][_0x1743ec(0x719)],_0x16bd1b[_0x1743ec(0x3f8)]);})(pluginData),((()=>{const _0x41b536=_0x1c6d52;if(VisuMZ['CoreEngine']['Settings'][_0x41b536(0x858)][_0x41b536(0xa17)]??!![]){if(_0x41b536(0x72c)===_0x41b536(0x34d))this[_0x41b536(0x41a)][_0x41b536(0x87c)](_0x3a2ec7[_0x41b536(0x872)]['NumberBgType']);else for(const _0x2d0237 in $plugins){const _0x3859f6=$plugins[_0x2d0237];if(_0x3859f6['name'][_0x41b536(0x91c)](/(.*)\/(.*)/i)){if('LAbaB'!==_0x41b536(0x473)){const _0x8c6ad8=_0x56a29d[_0x41b536(0x7b7)][_0x41b536(0x719)][_0x41b536(0x6b8)];if(!_0x8c6ad8)return![];const _0x4d6204=_0x8c6ad8[_0x41b536(0x4de)];if(!_0x4d6204)return![];const _0x2af3e5=this['_editWindow'][_0x41b536(0x4fb)]()[_0x41b536(0x4ee)]();for(const _0x3d2929 of _0x4d6204){if(_0x2af3e5[_0x41b536(0xa04)](_0x3d2929[_0x41b536(0x4ee)]()))return!![];}return![];}else _0x3859f6['name']=String(RegExp['$2'][_0x41b536(0x40e)]());}}}})()),PluginManager['registerCommand'](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x3a4),_0x1ed03f=>{const _0x127ff7=_0x1c6d52;if(!SceneManager[_0x127ff7(0x62e)])return;if(!SceneManager[_0x127ff7(0x62e)][_0x127ff7(0x87b)])return;VisuMZ[_0x127ff7(0x394)](_0x1ed03f,_0x1ed03f);const _0x39ed01=Math[_0x127ff7(0x5c2)](_0x1ed03f[_0x127ff7(0x275)]),_0x40847d=Math[_0x127ff7(0x5c2)](_0x1ed03f[_0x127ff7(0x63e)]);$gameTemp[_0x127ff7(0x26e)](_0x39ed01,_0x40847d,_0x1ed03f['AnimationID'],_0x1ed03f[_0x127ff7(0x3b3)],_0x1ed03f[_0x127ff7(0x788)]);}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],'AudioChangeBgmVolume',_0x26c572=>{const _0x2df1d2=_0x1c6d52;VisuMZ['ConvertParams'](_0x26c572,_0x26c572);const _0x470561=Math[_0x2df1d2(0x5c2)](_0x26c572['volume'])[_0x2df1d2(0xa23)](0x0,0x64),_0x6c29c7=AudioManager[_0x2df1d2(0x5c6)];_0x6c29c7&&(_0x6c29c7[_0x2df1d2(0x3ed)]=_0x470561,console[_0x2df1d2(0x321)](_0x6c29c7),AudioManager[_0x2df1d2(0x793)](_0x6c29c7));}),PluginManager[_0x1c6d52(0x6fc)](pluginData['name'],_0x1c6d52(0x28c),_0x27bbbd=>{const _0x4ea8a0=_0x1c6d52;VisuMZ['ConvertParams'](_0x27bbbd,_0x27bbbd);const _0x1af386=Math[_0x4ea8a0(0x5c2)](_0x27bbbd[_0x4ea8a0(0x484)])['clamp'](0x32,0x96),_0x172c87=AudioManager[_0x4ea8a0(0x5c6)];_0x172c87&&(_0x172c87[_0x4ea8a0(0x484)]=_0x1af386,AudioManager[_0x4ea8a0(0x793)](_0x172c87));}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x4f6),_0x260cdd=>{const _0x1ceaeb=_0x1c6d52;VisuMZ[_0x1ceaeb(0x394)](_0x260cdd,_0x260cdd);const _0x4622b2=Math[_0x1ceaeb(0x5c2)](_0x260cdd[_0x1ceaeb(0x987)])[_0x1ceaeb(0xa23)](-0x64,0x64),_0x511c45=AudioManager[_0x1ceaeb(0x5c6)];_0x511c45&&(_0x511c45[_0x1ceaeb(0x987)]=_0x4622b2,AudioManager[_0x1ceaeb(0x793)](_0x511c45));}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x7c7),_0x28b846=>{const _0xb475ed=_0x1c6d52;VisuMZ[_0xb475ed(0x394)](_0x28b846,_0x28b846);const _0x48f89e=Math[_0xb475ed(0x5c2)](_0x28b846[_0xb475ed(0x3ed)])[_0xb475ed(0xa23)](0x0,0x64),_0x481556=AudioManager[_0xb475ed(0x943)];if(_0x481556){if(_0xb475ed(0x2b3)===_0xb475ed(0x2b3))_0x481556[_0xb475ed(0x3ed)]=_0x48f89e,AudioManager[_0xb475ed(0x24c)](_0x481556);else return _0x299668[_0xb475ed(0x872)][_0xb475ed(0x79d)][_0xb475ed(0x78a)](this);}}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x8a5),_0x55d806=>{const _0x47b757=_0x1c6d52;VisuMZ[_0x47b757(0x394)](_0x55d806,_0x55d806);const _0x2b2d33=Math[_0x47b757(0x5c2)](_0x55d806[_0x47b757(0x484)])['clamp'](0x32,0x96),_0x300224=AudioManager[_0x47b757(0x943)];_0x300224&&(_0x47b757(0x3d0)!==_0x47b757(0x3d0)?_0x4a6abe['endAnimation']&&_0x5798b5[_0x47b757(0x902)]():(_0x300224['pitch']=_0x2b2d33,AudioManager[_0x47b757(0x24c)](_0x300224)));}),PluginManager['registerCommand'](pluginData['name'],_0x1c6d52(0x4e8),_0x468002=>{const _0x3884c7=_0x1c6d52;VisuMZ['ConvertParams'](_0x468002,_0x468002);const _0x586025=Math['round'](_0x468002[_0x3884c7(0x987)])[_0x3884c7(0xa23)](-0x64,0x64),_0x108172=AudioManager['_currentBgs'];_0x108172&&(_0x3884c7(0x9c2)!==_0x3884c7(0x539)?(_0x108172['pan']=_0x586025,AudioManager[_0x3884c7(0x24c)](_0x108172)):this[_0x3884c7(0x3e1)]());}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],'DebugConsoleLastControllerID',_0x5c0b14=>{const _0xd98698=_0x1c6d52;if(!$gameTemp[_0xd98698(0x1c7)]())return;const _0x5f5acc=Input['getLastUsedGamepadType']();if(navigator['clipboard']){if(_0xd98698(0x925)===_0xd98698(0x815)){const _0x1e8b9d=_0x2e27f9['y']+(this[_0xd98698(0x800)]()-_0x1b3f33['iconHeight'])/0x2;this[_0xd98698(0x7c1)](_0x4a3579,_0x4c7956['x'],_0x1e8b9d);const _0x1d3504=_0x39b75a[_0xd98698(0x5c9)]+0x4;_0x56be10['x']+=_0x1d3504,_0x49f587[_0xd98698(0x552)]-=_0x1d3504;}else navigator[_0xd98698(0x5e4)]['writeText'](_0x5f5acc);}}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],'ExportAllMapText',_0xcb0806=>{const _0x41abbf=_0x1c6d52;if(!$gameTemp[_0x41abbf(0x1c7)]())return;if(!Utils[_0x41abbf(0x75b)]())return;SceneManager[_0x41abbf(0x62e)][_0x41abbf(0x4dc)]=![],VisuMZ[_0x41abbf(0x7b7)][_0x41abbf(0x45e)]();}),PluginManager['registerCommand'](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x1d5),_0x2f5caf=>{const _0x1d1ea2=_0x1c6d52;if(!$gameTemp[_0x1d1ea2(0x1c7)]())return;if(!Utils[_0x1d1ea2(0x75b)]())return;SceneManager[_0x1d1ea2(0x62e)][_0x1d1ea2(0x4dc)]=![],VisuMZ[_0x1d1ea2(0x7b7)]['ExportStrFromAllTroops']();}),PluginManager['registerCommand'](pluginData[_0x1c6d52(0x4fb)],'ExportCurMapText',_0x4cab2f=>{const _0x4a6bf5=_0x1c6d52;if(!$gameTemp[_0x4a6bf5(0x1c7)]())return;if(!Utils[_0x4a6bf5(0x75b)]())return;if(!$gameMap)return;if($gameMap['mapId']()<=0x0)return;VisuMZ[_0x4a6bf5(0x394)](_0x4cab2f,_0x4cab2f);const _0x3684d8=_0x4a6bf5(0x6e2)[_0x4a6bf5(0x649)]($gameMap[_0x4a6bf5(0x331)]()[_0x4a6bf5(0x5bd)](0x3)),_0x4d4d37=VisuMZ[_0x4a6bf5(0x7b7)][_0x4a6bf5(0x248)]($gameMap['mapId']());VisuMZ[_0x4a6bf5(0x7b7)][_0x4a6bf5(0xa27)](_0x4d4d37,_0x3684d8,!![]);}),PluginManager[_0x1c6d52(0x6fc)](pluginData['name'],'ExportCurTroopText',_0x8cd8e6=>{const _0x2e2c4e=_0x1c6d52;if(!$gameTemp[_0x2e2c4e(0x1c7)]())return;if(!Utils[_0x2e2c4e(0x75b)]())return;if(!$gameParty[_0x2e2c4e(0x4f8)]())return;VisuMZ[_0x2e2c4e(0x394)](_0x8cd8e6,_0x8cd8e6);const _0x37d1f0=_0x2e2c4e(0x444)['format']($gameTroop[_0x2e2c4e(0x7e5)][_0x2e2c4e(0x5bd)](0x4)),_0x52bde2=VisuMZ[_0x2e2c4e(0x7b7)][_0x2e2c4e(0x242)]($gameTroop['_troopId']);VisuMZ[_0x2e2c4e(0x7b7)]['ExportString'](_0x52bde2,_0x37d1f0,!![]);}),VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0xa27)]=function(_0x46e9fd,_0x22df6d,_0x5ddefe){const _0x1ebd95=_0x1c6d52,_0x347e87=require('fs');let _0x3eef98=_0x1ebd95(0x593)[_0x1ebd95(0x649)](_0x22df6d||'0');_0x347e87['writeFile'](_0x3eef98,_0x46e9fd,_0x4550ff=>{const _0x472b0c=_0x1ebd95;if(_0x4550ff)throw err;else _0x5ddefe&&alert('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'[_0x472b0c(0x649)](_0x3eef98));});},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x45e)]=function(){const _0x208107=_0x1c6d52,_0x5c52a1=[];for(const _0xa1f1c2 of $dataMapInfos){if(!_0xa1f1c2)continue;_0x5c52a1[_0x208107(0x430)](_0xa1f1c2['id']);}const _0x1a1e2d=_0x5c52a1[_0x208107(0x3bf)]*0x64+Math['randomInt'](0x64);alert(_0x208107(0xa4a)[_0x208107(0x649)](_0x1a1e2d)),this[_0x208107(0x2dc)]=[],this['_currentMap']=$dataMap;for(const _0x377453 of _0x5c52a1){if(_0x208107(0x7a3)!==_0x208107(0x7a3))return _0x55a0dc;else VisuMZ[_0x208107(0x7b7)][_0x208107(0x5f7)](_0x377453);}setTimeout(VisuMZ[_0x208107(0x7b7)][_0x208107(0x4b6)][_0x208107(0x2fe)](this),_0x1a1e2d);},VisuMZ[_0x1c6d52(0x7b7)]['loadMapData']=function(_0x34fd45){const _0x4baa45=_0x1c6d52,_0x258bea=_0x4baa45(0x9e9)[_0x4baa45(0x649)](_0x34fd45[_0x4baa45(0x5bd)](0x3)),_0x3f88bb=new XMLHttpRequest(),_0x36ab2b=_0x4baa45(0x64a)+_0x258bea;_0x3f88bb['open']('GET',_0x36ab2b),_0x3f88bb[_0x4baa45(0x9ae)](_0x4baa45(0x85e)),_0x3f88bb[_0x4baa45(0x490)]=()=>this[_0x4baa45(0x2e5)](_0x3f88bb,_0x34fd45,_0x258bea,_0x36ab2b),_0x3f88bb[_0x4baa45(0x7c9)]=()=>DataManager[_0x4baa45(0x79b)](_0x4baa45(0x95c),_0x258bea,_0x36ab2b),_0x3f88bb[_0x4baa45(0x72e)]();},VisuMZ[_0x1c6d52(0x7b7)]['storeMapData']=function(_0x473c15,_0x4c2567,_0x733ceb,_0x1e30bc){const _0x464ccd=_0x1c6d52;$dataMap=JSON[_0x464ccd(0x57c)](_0x473c15[_0x464ccd(0x79a)]),DataManager[_0x464ccd(0x978)]($dataMap),this[_0x464ccd(0x2dc)][_0x4c2567]=VisuMZ['CoreEngine'][_0x464ccd(0x248)](_0x4c2567),$dataMap=this[_0x464ccd(0x620)];},VisuMZ[_0x1c6d52(0x7b7)]['exportAllMapStrings']=function(){const _0xa402af=_0x1c6d52,_0xe57605=_0xa402af(0x507);this['_storedMapText']['remove'](undefined)[_0xa402af(0x9d0)]('')[_0xa402af(0x9d0)](null);const _0x2a13c9=this[_0xa402af(0x2dc)]['join'](_0xa402af(0x5f6))['trim']();VisuMZ[_0xa402af(0x7b7)][_0xa402af(0xa27)](_0x2a13c9,_0xe57605,!![]),SceneManager['_scene']['_active']=!![];},VisuMZ['CoreEngine']['ExtractStrFromMap']=function(_0x12c976){const _0xf11d89=_0x1c6d52;if(!$dataMap)return'';let _0x35f8c3='█'[_0xf11d89(0x608)](0x46)+'\x0a\x0a',_0x586858='═'[_0xf11d89(0x608)](0x46)+'\x0a\x0a',_0x5ad73d='';this[_0xf11d89(0x417)]=0x0;for(const _0x391801 of $dataMap[_0xf11d89(0x3b7)]){if(!_0x391801)continue;let _0x8a2ec2=_0x391801['id'],_0x5f5872=_0x391801['name'],_0x23a116=_0x391801[_0xf11d89(0x94c)];for(const _0x26d48b of _0x23a116){const _0x33222c=_0x23a116['indexOf'](_0x26d48b)+0x1;let _0x38c7f4=_0x586858+_0xf11d89(0x8bd),_0x21f629=VisuMZ[_0xf11d89(0x7b7)]['ExtractStrFromList'](_0x26d48b[_0xf11d89(0x5c4)]);if(_0x21f629[_0xf11d89(0x3bf)]>0x0){if(_0x5ad73d[_0xf11d89(0x3bf)]>0x0)_0x5ad73d+=_0x586858+'\x0a\x0a\x0a\x0a\x0a';else{const _0x4c8dbb=$dataMapInfos[_0x12c976][_0xf11d89(0x4fb)];_0x5ad73d+=_0x35f8c3+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0xf11d89(0x649)](_0x12c976,_0x4c8dbb||_0xf11d89(0x860))+_0x35f8c3;}_0x5ad73d+=_0x38c7f4[_0xf11d89(0x649)](_0x8a2ec2,_0x5f5872,_0x33222c,_0x21f629);}}}return _0x5ad73d[_0xf11d89(0x3bf)]>0x0&&(_0x5ad73d+=_0x586858),_0x5ad73d;},VisuMZ['CoreEngine'][_0x1c6d52(0xa0d)]=function(){const _0x188f1d=_0x1c6d52,_0x7ceb45=$dataTroops[_0x188f1d(0x3bf)]*0xa+Math[_0x188f1d(0x5df)](0xa);alert(_0x188f1d(0x868)['format'](_0x7ceb45));const _0x5d1cfe=[];for(const _0x3ef438 of $dataTroops){if(!_0x3ef438)continue;const _0x13cbd5=_0x3ef438['id'];_0x5d1cfe[_0x13cbd5]=VisuMZ[_0x188f1d(0x7b7)][_0x188f1d(0x242)](_0x13cbd5);}setTimeout(VisuMZ['CoreEngine']['exportAllTroopStrings']['bind'](this,_0x5d1cfe),_0x7ceb45);},VisuMZ['CoreEngine']['ExtractStrFromTroop']=function(_0x36f119){const _0x541247=_0x1c6d52;if(!$dataTroops[_0x36f119])return'';let _0x5536fa='█'['repeat'](0x46)+'\x0a\x0a',_0x43b011='═'[_0x541247(0x608)](0x46)+'\x0a\x0a',_0x179762='';this[_0x541247(0x417)]=0x0;const _0x5d4d67=$dataTroops[_0x36f119];let _0x36be8f=_0x5d4d67[_0x541247(0x94c)];for(const _0x49a28d of _0x36be8f){const _0x4e7048=_0x36be8f[_0x541247(0x2d3)](_0x49a28d)+0x1;let _0x483636=_0x43b011+'《《《\x20Page\x20%1\x20》》》\x0a%2\x0a',_0x548e68=VisuMZ[_0x541247(0x7b7)]['ExtractStrFromList'](_0x49a28d[_0x541247(0x5c4)]);_0x548e68[_0x541247(0x3bf)]>0x0&&(_0x179762[_0x541247(0x3bf)]>0x0?_0x541247(0x640)!=='Yusvb'?this[_0x541247(0x666)]():_0x179762+=_0x43b011+_0x541247(0x5f6):_0x541247(0xa24)===_0x541247(0xa24)?_0x179762+=_0x5536fa+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x541247(0x649)](_0x36f119,_0x5d4d67['name']||_0x541247(0x860))+_0x5536fa:_0x52dfa5+='(\x5cd+)([%％])>',_0x179762+=_0x483636[_0x541247(0x649)](_0x4e7048,_0x548e68));}if(_0x179762[_0x541247(0x3bf)]>0x0){if(_0x541247(0x720)===_0x541247(0x720))_0x179762+=_0x43b011;else{this[_0x541247(0x285)]();const _0x2705cd=_0x600b17['titleCommandWindow']['background'],_0x1670b5=this[_0x541247(0x734)]();this[_0x541247(0x87f)]=new _0x49f986(_0x1670b5),this[_0x541247(0x87f)][_0x541247(0x87c)](_0x2705cd);const _0x72f42b=this[_0x541247(0x734)]();this[_0x541247(0x87f)][_0x541247(0x773)](_0x72f42b['x'],_0x72f42b['y'],_0x72f42b[_0x541247(0x552)],_0x72f42b[_0x541247(0x81f)]),this[_0x541247(0x8bb)](this[_0x541247(0x87f)]);}}return _0x179762;},VisuMZ['CoreEngine'][_0x1c6d52(0x6bb)]=function(_0x158dd2){const _0x429a8a=_0x1c6d52,_0x19c863=_0x429a8a(0x21d);_0x158dd2[_0x429a8a(0x9d0)](undefined)[_0x429a8a(0x9d0)]('')[_0x429a8a(0x9d0)](null);const _0x3ee684=_0x158dd2[_0x429a8a(0x73f)]('\x0a\x0a\x0a\x0a\x0a')[_0x429a8a(0x40e)]();VisuMZ[_0x429a8a(0x7b7)]['ExportString'](_0x3ee684,_0x19c863,!![]),SceneManager[_0x429a8a(0x62e)]['_active']=!![];},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x21b)]=function(_0x471a7c){const _0xc00e29=_0x1c6d52;let _0x16a221='\x0a'+'─'[_0xc00e29(0x608)](0x46)+'\x0a',_0x41f970='\x0a'+'┄'['repeat'](0x46)+'\x0a',_0x58fbc8='';for(const _0x3132b9 of _0x471a7c){if(!_0x3132b9)continue;if(_0x3132b9['code']===0x65)_0x58fbc8+=_0x16a221+'\x0a',_0x58fbc8+=_0xc00e29(0x541),_0x3132b9[_0xc00e29(0x3f8)][0x4]!==''&&_0x3132b9['parameters'][0x4]!==undefined&&(_0x58fbc8+='【%1】\x0a'['format'](_0x3132b9['parameters'][0x4]));else{if(_0x3132b9[_0xc00e29(0x85a)]===0x191)_0x58fbc8+='%1\x0a'[_0xc00e29(0x649)](_0x3132b9[_0xc00e29(0x3f8)][0x0]);else{if(_0x3132b9[_0xc00e29(0x85a)]===0x192)_0x58fbc8+=_0x16a221,_0x58fbc8+=_0xc00e29(0x6d5)['format'](_0x41f970,_0x3132b9[_0xc00e29(0x3f8)][0x0]+0x1,_0x3132b9[_0xc00e29(0x3f8)][0x1]);else{if(_0x3132b9[_0xc00e29(0x85a)]===0x193)'PVWvY'===_0xc00e29(0x85b)?(_0x58fbc8+=_0x16a221,_0x58fbc8+='%1〘Choice\x20Cancel〙%1'['format'](_0x41f970)):(_0x5cffa9[_0xc00e29(0x7b7)][_0xc00e29(0x90a)][_0xc00e29(0x78a)](this,_0x311064,_0x55fe10),this[_0xc00e29(0x9e5)]=!(_0x547949['CoreEngine']['Settings']['QoL'][_0xc00e29(0x9fd)]??!![]));else{if(_0x3132b9['code']===0x194)_0xc00e29(0x5d3)!==_0xc00e29(0x82f)?(_0x58fbc8+=_0x16a221,_0x58fbc8+=_0xc00e29(0x34a)['format'](_0x41f970)):(_0x2cd27e[_0xc00e29(0x7b7)][_0xc00e29(0x282)][_0xc00e29(0x78a)](this),this['setCoreEngineUpdateWindowBg']());else{if(_0x3132b9[_0xc00e29(0x85a)]===0x69)_0x58fbc8+=_0x16a221+'\x0a',_0x58fbc8+=_0xc00e29(0x5a5);else{if(_0x3132b9[_0xc00e29(0x85a)]===0x6c)_0xc00e29(0x726)!==_0xc00e29(0x205)?(_0x58fbc8+=_0x16a221+'\x0a',_0x58fbc8+=_0xc00e29(0x942)[_0xc00e29(0x649)](_0x3132b9[_0xc00e29(0x3f8)][0x0])):this['clear']();else{if(_0x3132b9[_0xc00e29(0x85a)]===0x198)_0x58fbc8+=_0xc00e29(0x8c5)['format'](_0x3132b9[_0xc00e29(0x3f8)][0x0]);else{if(_0x3132b9[_0xc00e29(0x85a)]===0x75){const _0x5c81eb=$dataCommonEvents[_0x3132b9[_0xc00e29(0x3f8)][0x0]];if(_0x5c81eb&&this[_0xc00e29(0x417)]<=0xa){this[_0xc00e29(0x417)]++;let _0x594373=VisuMZ[_0xc00e29(0x7b7)][_0xc00e29(0x21b)](_0x5c81eb[_0xc00e29(0x5c4)]);_0x594373[_0xc00e29(0x3bf)]>0x0&&(_0xc00e29(0x343)!==_0xc00e29(0x9a0)?(_0x58fbc8+=_0x16a221,_0x58fbc8+=_0x41f970,_0x58fbc8+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'[_0xc00e29(0x649)](_0x5c81eb['id'],_0x5c81eb[_0xc00e29(0x4fb)]),_0x58fbc8+=_0x41f970,_0x58fbc8+=_0x594373,_0x58fbc8+=_0x41f970,_0x58fbc8+=_0xc00e29(0x22a)[_0xc00e29(0x649)](_0x5c81eb['id'],_0x5c81eb[_0xc00e29(0x4fb)]),_0x58fbc8+=_0x41f970):(_0x4ffe85[_0xc00e29(0x7b7)][_0xc00e29(0x4b7)][_0xc00e29(0x78a)](this,_0x750717),this[_0xc00e29(0x9b0)](),this[_0xc00e29(0x910)](_0x5141f9))),this[_0xc00e29(0x417)]--;}}}}}}}}}}}return _0x58fbc8[_0xc00e29(0x3bf)]>0x0&&(_0x58fbc8+=_0x16a221),_0x58fbc8;},PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],'OpenURL',_0x5aa41e=>{const _0x496818=_0x1c6d52;VisuMZ[_0x496818(0x394)](_0x5aa41e,_0x5aa41e);const _0xb0aa8b=_0x5aa41e[_0x496818(0x8e5)];VisuMZ[_0x496818(0x4cf)](_0xb0aa8b);}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x5c3),_0x2839f1=>{const _0x1498e4=_0x1c6d52;VisuMZ['ConvertParams'](_0x2839f1,_0x2839f1);const _0x47115b=_0x2839f1['value']||0x0;$gameParty[_0x1498e4(0x497)](_0x47115b);}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],'MapOnceParallel',_0x4ec980=>{const _0x904472=_0x1c6d52;if(!SceneManager[_0x904472(0x8cc)]())return;VisuMZ['ConvertParams'](_0x4ec980,_0x4ec980);const _0x59a161=_0x4ec980[_0x904472(0x65b)];SceneManager['_scene'][_0x904472(0x694)](_0x59a161);}),PluginManager['registerCommand'](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x4d2),_0x4021ee=>{const _0x210623=_0x1c6d52;if(!$gameTemp[_0x210623(0x1c7)]())return;if(!Utils[_0x210623(0x75b)]())return;VisuMZ[_0x210623(0x394)](_0x4021ee,_0x4021ee);const _0x4c67c0=_0x4021ee[_0x210623(0x385)]||0x1;$gameTemp[_0x210623(0x878)]=_0x4c67c0;}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x6cb),_0x23be09=>{const _0x3b268c=_0x1c6d52;VisuMZ[_0x3b268c(0x394)](_0x23be09,_0x23be09);const _0x43a69c=_0x23be09[_0x3b268c(0x26b)]||0x1,_0x4c780f=_0x23be09[_0x3b268c(0x7ed)]||'Linear',_0x547480=$gameScreen['picture'](_0x43a69c);_0x547480&&_0x547480[_0x3b268c(0x824)](_0x4c780f);}),PluginManager['registerCommand'](pluginData['name'],_0x1c6d52(0x647),_0x2f7bea=>{const _0x1b50d4=_0x1c6d52;for(let _0x900c02=0x1;_0x900c02<=0x64;_0x900c02++){$gameScreen[_0x1b50d4(0x302)](_0x900c02);}}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],'PictureEraseRange',_0x4039d5=>{const _0x537ba2=_0x1c6d52;VisuMZ['ConvertParams'](_0x4039d5,_0x4039d5);const _0x4717c3=Math[_0x537ba2(0x42f)](_0x4039d5[_0x537ba2(0x576)],_0x4039d5[_0x537ba2(0x4b2)]),_0x1b66ac=Math[_0x537ba2(0x269)](_0x4039d5[_0x537ba2(0x576)],_0x4039d5[_0x537ba2(0x4b2)]);for(let _0x88fcb0=_0x4717c3;_0x88fcb0<=_0x1b66ac;_0x88fcb0++){if(_0x537ba2(0x6d6)==='BUZpP')$gameScreen[_0x537ba2(0x302)](_0x88fcb0);else return this[_0x537ba2(0x3c8)]()?this[_0x537ba2(0x9cc)][_0x537ba2(0x991)](_0x4e1e67):_0x513a4d['prototype'][_0x537ba2(0x70d)]['call'](this,_0xfd40cd);}}),PluginManager[_0x1c6d52(0x6fc)](pluginData['name'],_0x1c6d52(0x8ac),_0x4adf75=>{const _0x39d156=_0x1c6d52;VisuMZ[_0x39d156(0x394)](_0x4adf75,_0x4adf75);const _0x4d56b0=Math[_0x39d156(0x5c2)](_0x4adf75[_0x39d156(0x385)])[_0x39d156(0xa23)](0x1,0x64),_0x4ffd5f=_0x4adf75[_0x39d156(0x719)],_0x1b1bc0=_0x4ffd5f[_0x39d156(0x34b)][_0x39d156(0xa23)](0x0,0x1),_0x4ed313=Math[_0x39d156(0x5c2)](_0x4ffd5f[_0x39d156(0x554)]||0x0),_0x13a58d=Math[_0x39d156(0x5c2)](_0x4ffd5f['PositionY']||0x0),_0x5594ee=Math['round'](_0x4ffd5f[_0x39d156(0x513)]||0x0),_0x454b3e=Math[_0x39d156(0x5c2)](_0x4ffd5f[_0x39d156(0x31c)]||0x0),_0x268ee3=Math['round'](_0x4ffd5f[_0x39d156(0x475)])[_0x39d156(0xa23)](0x0,0xff),_0x39a088=_0x4ffd5f[_0x39d156(0x61d)],_0x35207a=_0x39d156(0x563),_0x2d4bdb=_0x4adf75[_0x39d156(0x62d)]?_0x39d156(0x62d):_0x39d156(0x55a),_0x2af41a=_0x35207a[_0x39d156(0x649)](_0x4adf75[_0x39d156(0x508)],_0x2d4bdb);$gameScreen[_0x39d156(0x76c)](_0x4d56b0,_0x2af41a,_0x1b1bc0,_0x4ed313,_0x13a58d,_0x5594ee,_0x454b3e,_0x268ee3,_0x39a088);}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x2f4),_0x347d52=>{const _0x330347=_0x1c6d52;VisuMZ[_0x330347(0x394)](_0x347d52,_0x347d52);const _0x5452c5=_0x347d52[_0x330347(0x529)]||_0x330347(0x1f2),_0x3c846c=_0x347d52['Power'][_0x330347(0xa23)](0x1,0x9),_0x398ce0=_0x347d52[_0x330347(0x6ab)][_0x330347(0xa23)](0x1,0x9),_0x4f908e=_0x347d52[_0x330347(0x4ae)]||0x1,_0x4343e0=_0x347d52[_0x330347(0x8e9)];$gameScreen['setCoreEngineScreenShakeStyle'](_0x5452c5),$gameScreen[_0x330347(0x7f6)](_0x3c846c,_0x398ce0,_0x4f908e);if(_0x4343e0){const _0x2138f9=$gameTemp[_0x330347(0x396)]();if(_0x2138f9)_0x2138f9[_0x330347(0xa44)](_0x4f908e);}}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],'SwitchRandomizeOne',_0x427084=>{const _0x426dcf=_0x1c6d52;if($gameParty[_0x426dcf(0x4f8)]())return;VisuMZ[_0x426dcf(0x394)](_0x427084,_0x427084);const _0xfb342d=_0x427084[_0x426dcf(0x941)],_0x99c524=(_0x427084[_0x426dcf(0x7b8)]||0x0)/0x64;for(const _0x40ce10 of _0xfb342d){if(_0x426dcf(0x6c8)===_0x426dcf(0x6c8)){const _0x321792=Math[_0x426dcf(0x1f2)]()<=_0x99c524;$gameSwitches[_0x426dcf(0x3c6)](_0x40ce10,_0x321792);}else _0x170037+=_0x426dcf(0x5a6);}}),PluginManager['registerCommand'](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x9bb),_0x1c9de3=>{const _0x5f2169=_0x1c6d52;if($gameParty[_0x5f2169(0x4f8)]())return;VisuMZ[_0x5f2169(0x394)](_0x1c9de3,_0x1c9de3);const _0xf79951=Math[_0x5f2169(0x42f)](_0x1c9de3[_0x5f2169(0x576)],_0x1c9de3[_0x5f2169(0x4b2)]),_0x2db6ce=Math[_0x5f2169(0x269)](_0x1c9de3[_0x5f2169(0x576)],_0x1c9de3[_0x5f2169(0x4b2)]),_0x3c54f4=(_0x1c9de3[_0x5f2169(0x7b8)]||0x0)/0x64;for(let _0x142db7=_0xf79951;_0x142db7<=_0x2db6ce;_0x142db7++){const _0x5c5624=Math[_0x5f2169(0x1f2)]()<=_0x3c54f4;$gameSwitches[_0x5f2169(0x3c6)](_0x142db7,_0x5c5624);}}),PluginManager['registerCommand'](pluginData['name'],_0x1c6d52(0x470),_0x2987f9=>{const _0x11d363=_0x1c6d52;if($gameParty[_0x11d363(0x4f8)]())return;VisuMZ[_0x11d363(0x394)](_0x2987f9,_0x2987f9);const _0x26fec0=_0x2987f9[_0x11d363(0x941)];for(const _0x180d47 of _0x26fec0){if('gTAMU'!=='AWErQ'){const _0xa3dc95=$gameSwitches[_0x11d363(0x4d0)](_0x180d47);$gameSwitches[_0x11d363(0x3c6)](_0x180d47,!_0xa3dc95);}else _0x51c798+=_0x2ff21a,_0x226b5d+=_0x11d363(0x9e4)[_0x11d363(0x649)](_0x4c7147);}}),PluginManager['registerCommand'](pluginData['name'],_0x1c6d52(0x36f),_0x508fd2=>{const _0x14f7e1=_0x1c6d52;if($gameParty[_0x14f7e1(0x4f8)]())return;VisuMZ[_0x14f7e1(0x394)](_0x508fd2,_0x508fd2);const _0x5da57e=Math[_0x14f7e1(0x42f)](_0x508fd2['StartID'],_0x508fd2[_0x14f7e1(0x4b2)]),_0x48edaf=Math[_0x14f7e1(0x269)](_0x508fd2[_0x14f7e1(0x576)],_0x508fd2[_0x14f7e1(0x4b2)]);for(let _0x44df69=_0x5da57e;_0x44df69<=_0x48edaf;_0x44df69++){const _0x196311=$gameSwitches[_0x14f7e1(0x4d0)](_0x44df69);$gameSwitches[_0x14f7e1(0x3c6)](_0x44df69,!_0x196311);}}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x826),_0x58b280=>{const _0x50ef1f=_0x1c6d52;VisuMZ[_0x50ef1f(0x394)](_0x58b280,_0x58b280);const _0x295b6e=_0x58b280[_0x50ef1f(0x452)]||0x1;$gameSystem['setMainFontSize'](_0x295b6e);}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x8a3),_0x2b3e8a=>{const _0x24d4b9=_0x1c6d52;if($gameParty['inBattle']())return;VisuMZ[_0x24d4b9(0x394)](_0x2b3e8a,_0x2b3e8a);const _0xefe35c=_0x2b3e8a[_0x24d4b9(0x452)];if(_0xefe35c[_0x24d4b9(0x91c)](/Front/i))$gameSystem[_0x24d4b9(0x33b)](![]);else _0xefe35c['match'](/Side/i)?$gameSystem['setSideView'](!![]):$gameSystem[_0x24d4b9(0x33b)](!$gameSystem[_0x24d4b9(0x86d)]());}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x66b),_0x415600=>{const _0x21d686=_0x1c6d52;if($gameParty[_0x21d686(0x4f8)]())return;VisuMZ['ConvertParams'](_0x415600,_0x415600);const _0x4b956e=[_0x21d686(0x814),'bgs','me','se'];for(const _0xc42054 of _0x4b956e){const _0x6129ef=_0x415600[_0xc42054],_0x206d6c=_0x21d686(0x835)[_0x21d686(0x649)](_0xc42054);for(const _0x256415 of _0x6129ef){if(_0x21d686(0x618)==='hdRiY')return _0x1d8f44['CoreEngine'][_0x21d686(0x719)][_0x21d686(0x2bf)][_0x21d686(0x4a2)][_0x21d686(0x78a)](this,_0x5a71b9);else AudioManager[_0x21d686(0x95b)](_0x206d6c,_0x256415);}}}),PluginManager[_0x1c6d52(0x6fc)](pluginData['name'],_0x1c6d52(0x7a9),_0xbb3dab=>{const _0xd690de=_0x1c6d52;if($gameParty[_0xd690de(0x4f8)]())return;VisuMZ[_0xd690de(0x394)](_0xbb3dab,_0xbb3dab);const _0xc903c4=[_0xd690de(0x80e),_0xd690de(0x892),_0xd690de(0x4e5),_0xd690de(0x38e),_0xd690de(0x8f5),'faces',_0xd690de(0x498),_0xd690de(0x398),'sv_actors','sv_enemies',_0xd690de(0x7aa),_0xd690de(0x350),_0xd690de(0x560),_0xd690de(0x1fe)];for(const _0xba5625 of _0xc903c4){const _0x106ce9=_0xbb3dab[_0xba5625],_0x4189d9='img/%1/'[_0xd690de(0x649)](_0xba5625);for(const _0x2124db of _0x106ce9){ImageManager[_0xd690de(0xa18)](_0x4189d9,_0x2124db);}}}),PluginManager['registerCommand'](pluginData['name'],_0x1c6d52(0x52c),_0x5c71c1=>{const _0x4741a0=_0x1c6d52;if($gameParty['inBattle']())return;VisuMZ[_0x4741a0(0x394)](_0x5c71c1,_0x5c71c1);const _0x54861c=_0x5c71c1[_0x4741a0(0x452)][_0x4741a0(0x5dd)]()[_0x4741a0(0x40e)](),_0xee2f66=VisuMZ[_0x4741a0(0x7b7)][_0x4741a0(0xa3b)](_0x54861c);$gameSystem[_0x4741a0(0x7b0)](_0xee2f66);}),VisuMZ[_0x1c6d52(0x7b7)]['CreateBattleSystemID']=function(_0x4de1e3){const _0x5cd604=_0x1c6d52;_0x4de1e3=_0x4de1e3||'DATABASE',_0x4de1e3=String(_0x4de1e3)[_0x5cd604(0x5dd)]()[_0x5cd604(0x40e)]();switch(_0x4de1e3){case _0x5cd604(0x373):return 0x0;case _0x5cd604(0x901):Imported[_0x5cd604(0x939)]&&(ConfigManager[_0x5cd604(0x989)]=!![]);return 0x1;case _0x5cd604(0x346):if(Imported[_0x5cd604(0x939)]){if(_0x5cd604(0x78b)===_0x5cd604(0x78b))ConfigManager[_0x5cd604(0x989)]=![];else{this[_0x5cd604(0x86e)](),this[_0x5cd604(0x9cc)][_0x5cd604(0x261)](),this[_0x5cd604(0x9cc)][_0x5cd604(0x35f)]=_0x1d3b1d[_0x5cd604(0x7b7)][_0x5cd604(0x719)][_0x5cd604(0x92f)][_0x5cd604(0x2ad)];const _0x3e1e1c=_0x54e56a['CoreEngine'][_0x5cd604(0x719)]['Gold'][_0x5cd604(0x6bd)],_0x251988=this['itemLineRect'](0x0);if(_0x3e1e1c>0x0){const _0x3c06fc=_0x251988['y']+(this[_0x5cd604(0x800)]()-_0x305b2a['iconHeight'])/0x2;this['drawIcon'](_0x3e1e1c,_0x251988['x'],_0x3c06fc);const _0x53b626=_0x213ec6[_0x5cd604(0x5c9)]+0x4;_0x251988['x']+=_0x53b626,_0x251988[_0x5cd604(0x552)]-=_0x53b626;}this[_0x5cd604(0x7d3)](_0x4e9f13[_0x5cd604(0x89e)]()),this[_0x5cd604(0x60d)](this[_0x5cd604(0x8a0)](),_0x251988['x'],_0x251988['y'],_0x251988[_0x5cd604(0x552)],_0x5cd604(0x816));const _0x48659c=this[_0x5cd604(0x70d)](this['currencyUnit']())+0x6;;_0x251988['x']+=_0x48659c,_0x251988[_0x5cd604(0x552)]-=_0x48659c,this['resetTextColor']();const _0x413b73=this[_0x5cd604(0x4d0)](),_0x2b9e7a=this[_0x5cd604(0x70d)](this[_0x5cd604(0x395)]?_0x56566f[_0x5cd604(0x279)](this[_0x5cd604(0x4d0)]()):this[_0x5cd604(0x4d0)]());_0x2b9e7a>_0x251988[_0x5cd604(0x552)]?this[_0x5cd604(0x60d)](_0x14c1e0[_0x5cd604(0x7b7)][_0x5cd604(0x719)][_0x5cd604(0x92f)][_0x5cd604(0x2eb)],_0x251988['x'],_0x251988['y'],_0x251988[_0x5cd604(0x552)],_0x5cd604(0x60e)):this[_0x5cd604(0x60d)](this[_0x5cd604(0x4d0)](),_0x251988['x'],_0x251988['y'],_0x251988[_0x5cd604(0x552)],_0x5cd604(0x60e)),this[_0x5cd604(0x86e)]();}}return 0x2;case _0x5cd604(0x64e):if(Imported['VisuMZ_2_BattleSystemCTB']){if(_0x5cd604(0x288)==='QMrwO')this[_0x5cd604(0x990)]['setBackgroundType'](_0x26c552[_0x5cd604(0x872)][_0x5cd604(0x7b1)]);else return'CTB';}break;case _0x5cd604(0x3ff):if(Imported[_0x5cd604(0x8ec)]){if(_0x5cd604(0x214)==='SpkfX')return'STB';else _0x35662b[_0x5cd604(0x7b7)]['Spriteset_Base_update'][_0x5cd604(0x78a)](this),this[_0x5cd604(0x535)](),this['updateFauxAnimations'](),this[_0x5cd604(0x76e)]();}break;case _0x5cd604(0x99d):if(Imported['VisuMZ_2_BattleSystemBTB'])return _0x5cd604(0x99d);break;case _0x5cd604(0x538):if(Imported[_0x5cd604(0x359)]){if(_0x5cd604(0xa21)!==_0x5cd604(0x6f6))return'FTB';else{const _0x2df479=_0x438f76[_0x5cd604(0x3bd)]();this[_0x5cd604(0x97d)]=_0x4ff95f[_0x5cd604(0x5df)](_0x2df479)+_0xf67437[_0x5cd604(0x5df)](_0x2df479)+this[_0x5cd604(0xa43)]();}}break;case _0x5cd604(0x6f3):if(Imported[_0x5cd604(0x2e2)]){if(_0x5cd604(0x29d)!==_0x5cd604(0x29d))_0x1461f2[_0x5cd604(0x2e2)]&&(this[_0x5cd604(0x3c1)]=_0x5cd604(0x6f3));else return _0x5cd604(0x6f3);}break;case _0x5cd604(0x7fe):if(Imported['VisuMZ_2_BattleSystemETB'])return _0x5cd604(0x973)!=='XlvIe'?'ETB':_0x58c530;break;case _0x5cd604(0x8db):if(Imported[_0x5cd604(0x98f)])return _0x5cd604(0x8db);break;}return $dataSystem[_0x5cd604(0x944)];},PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x85f),_0x4db1b6=>{const _0x495c4e=_0x1c6d52;VisuMZ['ConvertParams'](_0x4db1b6,_0x4db1b6);const _0x5f1c74=_0x4db1b6[_0x495c4e(0x452)]||0x1;$gameSystem[_0x495c4e(0x2da)](_0x5f1c74);}),PluginManager[_0x1c6d52(0x6fc)](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x982),_0x25afee=>{const _0x2ed61f=_0x1c6d52;VisuMZ[_0x2ed61f(0x394)](_0x25afee,_0x25afee);const _0x4ebf45=_0x25afee['id']||0x1,_0x4dc6ad=_0x25afee[_0x2ed61f(0x7a6)],_0x91a8c7=_0x25afee[_0x2ed61f(0x4ca)]||0x0;let _0x33d650=$gameVariables[_0x2ed61f(0x4d0)](_0x4ebf45)||0x0;switch(_0x4dc6ad){case'=':_0x33d650=_0x91a8c7;break;case'+':_0x33d650+=_0x91a8c7;break;case'-':_0x33d650-=_0x91a8c7;break;case'*':_0x33d650*=_0x91a8c7;break;case'/':_0x33d650/=_0x91a8c7;break;case'%':_0x33d650%=_0x91a8c7;break;}_0x33d650=_0x33d650||0x0,$gameVariables['setValue'](_0x4ebf45,_0x33d650);}),PluginManager['registerCommand'](pluginData[_0x1c6d52(0x4fb)],_0x1c6d52(0x53d),_0x229d37=>{const _0x474220=_0x1c6d52;VisuMZ[_0x474220(0x394)](_0x229d37,_0x229d37);const _0x2053c9=_0x229d37['id']()||0x1,_0x1e01a7=_0x229d37[_0x474220(0x7a6)],_0x33b7e0=_0x229d37['operand']()||0x0;let _0x50236c=$gameVariables['value'](_0x2053c9)||0x0;switch(_0x1e01a7){case'=':_0x50236c=_0x33b7e0;break;case'+':_0x50236c+=_0x33b7e0;break;case'-':_0x50236c-=_0x33b7e0;break;case'*':_0x50236c*=_0x33b7e0;break;case'/':_0x50236c/=_0x33b7e0;break;case'%':_0x50236c%=_0x33b7e0;break;}_0x50236c=_0x50236c||0x0,$gameVariables[_0x474220(0x3c6)](_0x2053c9,_0x50236c);}),VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x801)]=Scene_Boot[_0x1c6d52(0x721)][_0x1c6d52(0x4ba)],Scene_Boot[_0x1c6d52(0x721)]['onDatabaseLoaded']=function(){const _0x55b1f2=_0x1c6d52;VisuMZ[_0x55b1f2(0x7b7)]['Scene_Boot_onDatabaseLoaded'][_0x55b1f2(0x78a)](this),this[_0x55b1f2(0x5f3)](),this[_0x55b1f2(0x50d)](),this[_0x55b1f2(0x672)](),this[_0x55b1f2(0x7fa)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),this[_0x55b1f2(0x232)](),VisuMZ[_0x55b1f2(0x73a)]();},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x3a6)]={},Scene_Boot[_0x1c6d52(0x721)][_0x1c6d52(0x5f3)]=function(){const _0x1dc4a=_0x1c6d52,_0x507d83=[_0x1dc4a(0x4bb),_0x1dc4a(0x999),_0x1dc4a(0x24f),_0x1dc4a(0x36d),_0x1dc4a(0x4d3),_0x1dc4a(0x724),_0x1dc4a(0x494),_0x1dc4a(0x27f)],_0xfd5908=[_0x1dc4a(0x3f9),_0x1dc4a(0x959),'CRI','CEV','MEV',_0x1dc4a(0x2e0),_0x1dc4a(0x8f3),_0x1dc4a(0x76d),_0x1dc4a(0x781),'TRG'],_0x144351=[_0x1dc4a(0x480),'GRD','REC',_0x1dc4a(0x6dc),_0x1dc4a(0x626),'TCR',_0x1dc4a(0x555),_0x1dc4a(0x30d),_0x1dc4a(0x774),_0x1dc4a(0x3a9)],_0x40c1eb=[_0x507d83,_0xfd5908,_0x144351],_0x110af2=['Plus',_0x1dc4a(0x422),_0x1dc4a(0x40a),_0x1dc4a(0x532),'Rate',_0x1dc4a(0x732),'Rate2','Flat',_0x1dc4a(0x958),_0x1dc4a(0x784)];for(const _0x218cca of _0x40c1eb){if(_0x1dc4a(0x584)!==_0x1dc4a(0x9e2)){let _0x206104='';if(_0x218cca===_0x507d83)_0x206104=_0x1dc4a(0x2d4);if(_0x218cca===_0xfd5908)_0x206104='xparam';if(_0x218cca===_0x144351)_0x206104=_0x1dc4a(0x68e);for(const _0x1bf960 of _0x110af2){let _0x2cabb5=_0x1dc4a(0x2c2)[_0x1dc4a(0x649)](_0x206104,_0x1bf960);VisuMZ[_0x1dc4a(0x7b7)][_0x1dc4a(0x3a6)][_0x2cabb5]=[],VisuMZ['CoreEngine'][_0x1dc4a(0x3a6)][_0x2cabb5+'JS']=[];let _0x538147=_0x1dc4a(0xa2f);if(['Plus',_0x1dc4a(0x42a)][_0x1dc4a(0xa04)](_0x1bf960)){if(_0x1dc4a(0x628)===_0x1dc4a(0x628))_0x538147+=_0x1dc4a(0x36b);else return this[_0x1dc4a(0x986)](_0x45f71d);}else{if([_0x1dc4a(0x422),_0x1dc4a(0x958)][_0x1dc4a(0xa04)](_0x1bf960))_0x538147+=_0x1dc4a(0x357);else{if([_0x1dc4a(0x40a),_0x1dc4a(0x784)][_0x1dc4a(0xa04)](_0x1bf960))_0x538147+=_0x1dc4a(0x7ff);else{if(_0x1bf960===_0x1dc4a(0x532))_0x1dc4a(0x9ef)===_0x1dc4a(0x870)?(this[_0x1dc4a(0x3a2)]=_0x2cb482(_0x370f14(this[_0x1dc4a(0x3a2)])[_0x1dc4a(0x834)](0x1)),this[_0x1dc4a(0x3a2)]=_0x37497c[_0x1dc4a(0x269)](0x0,this[_0x1dc4a(0x3a2)]),_0x75eeee[_0x1dc4a(0x261)](),this['refresh'](),_0x2075fb['playCursor'](),this[_0x1dc4a(0x5dc)](this['_maxDigits']-0x1)):_0x538147+='(\x5cd+)>';else{if(_0x1bf960===_0x1dc4a(0x732))_0x538147+=_0x1dc4a(0x701);else _0x1bf960==='Rate2'&&(_0x538147+=_0x1dc4a(0x5a6));}}}}for(const _0x2820c5 of _0x218cca){if(_0x1dc4a(0x619)!=='QDpzU'){let _0x287e3c=_0x1bf960[_0x1dc4a(0x9c5)](/[\d+]/g,'')[_0x1dc4a(0x5dd)]();const _0x4726ca=_0x538147[_0x1dc4a(0x649)](_0x2820c5,_0x287e3c);VisuMZ['CoreEngine'][_0x1dc4a(0x3a6)][_0x2cabb5][_0x1dc4a(0x430)](new RegExp(_0x4726ca,'i'));const _0x19ea40=_0x1dc4a(0x257)['format'](_0x2820c5,_0x287e3c);VisuMZ[_0x1dc4a(0x7b7)][_0x1dc4a(0x3a6)][_0x2cabb5+'JS'][_0x1dc4a(0x430)](new RegExp(_0x19ea40,'i'));}else return _0x33d2f2[_0x1dc4a(0x2af)];}}}else return _0xf7a36[_0x1dc4a(0x872)][_0x1dc4a(0x44b)][_0x1dc4a(0x78a)](this);}},Scene_Boot['prototype'][_0x1c6d52(0x50d)]=function(){if(VisuMZ['ParseAllNotetags'])return;},Scene_Boot[_0x1c6d52(0x721)][_0x1c6d52(0x672)]=function(){const _0x132add=_0x1c6d52,_0x1bd422=VisuMZ[_0x132add(0x7b7)][_0x132add(0x719)];if(_0x1bd422[_0x132add(0x858)][_0x132add(0x268)]){if('hcmlV'!==_0x132add(0x1dd))return _0xb93283[_0x132add(0x633)](this),_0x509209[_0x132add(0x7b7)][_0x132add(0x526)]['call'](this,_0x2cdbba);else VisuMZ[_0x132add(0x52a)](!![]);}_0x1bd422[_0x132add(0x858)][_0x132add(0x77b)]&&(Input[_0x132add(0x48c)][0x23]=_0x132add(0x5a2),Input[_0x132add(0x48c)][0x24]=_0x132add(0x7af));if(_0x1bd422[_0x132add(0x96c)]){if('PhTwV'!=='PhTwV')return this[_0x132add(0x5b7)]()['successRate']*0.01;else{const _0x315ca0=_0x1bd422[_0x132add(0x96c)];_0x315ca0['KeySHIFT']=_0x315ca0[_0x132add(0x298)]||_0x132add(0x69a),_0x315ca0['KeyTAB']=_0x315ca0['KeyTAB']||_0x132add(0x847);}}if(_0x1bd422[_0x132add(0x6b8)][_0x132add(0x1f8)]){if(_0x132add(0xa0c)!=='Rywdj')Input[_0x132add(0x48c)][0x57]='up',Input['keyMapper'][0x41]='left',Input[_0x132add(0x48c)][0x53]='down',Input[_0x132add(0x48c)][0x44]=_0x132add(0x60e),Input[_0x132add(0x48c)][0x45]='pagedown';else{if(!this[_0x132add(0x6ac)])return _0x891bdc;const _0x42fc88=this[_0x132add(0x6ac)][_0x132add(0x3da)],_0x5c5687=this['_coreEasing'][_0x132add(0x8e4)],_0x11c876=this[_0x132add(0x449)]((_0x5c5687-_0x42fc88)/_0x5c5687),_0x5932bd=this[_0x132add(0x449)]((_0x5c5687-_0x42fc88+0x1)/_0x5c5687),_0x442fb3=(_0x231dae-_0x2816d7*_0x11c876)/(0x1-_0x11c876);return _0x442fb3+(_0x147e9f-_0x442fb3)*_0x5932bd;}}_0x1bd422[_0x132add(0x6b8)]['DashToggleR']&&(Input[_0x132add(0x48c)][0x52]=_0x132add(0x7a1)),_0x1bd422[_0x132add(0x8a8)][_0x132add(0x437)]=_0x1bd422['Param'][_0x132add(0x437)][_0x132add(0x2c7)](_0x5376f0=>_0x5376f0[_0x132add(0x5dd)]()[_0x132add(0x40e)]()),_0x1bd422[_0x132add(0x8a8)]['ExtDisplayedParams']=_0x1bd422['Param']['ExtDisplayedParams']['map'](_0x41da2b=>_0x41da2b[_0x132add(0x5dd)]()[_0x132add(0x40e)]());},Scene_Boot[_0x1c6d52(0x721)][_0x1c6d52(0x7fa)]=function(){this['process_VisuMZ_CoreEngine_jsQuickFunctions']();},Scene_Boot[_0x1c6d52(0x721)][_0x1c6d52(0xa40)]=function(){const _0x435b3b=_0x1c6d52,_0x433ce1=VisuMZ['CoreEngine']['Settings']['jsQuickFunc'];for(const _0x5921e5 of _0x433ce1){const _0x11008c=_0x5921e5[_0x435b3b(0x284)][_0x435b3b(0x9c5)](/[ ]/g,''),_0x4618e6=_0x5921e5[_0x435b3b(0x389)];VisuMZ['CoreEngine'][_0x435b3b(0x1ef)](_0x11008c,_0x4618e6);}},VisuMZ['CoreEngine']['createJsQuickFunction']=function(_0x981e4a,_0x53fd24){const _0x5489cf=_0x1c6d52;if(!!window[_0x981e4a]){if($gameTemp[_0x5489cf(0x1c7)]())console['log']('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x5489cf(0x649)](_0x981e4a));}const _0x5deec7=_0x5489cf(0x77d)['format'](_0x981e4a,_0x53fd24);window[_0x981e4a]=new Function(_0x5deec7);},Scene_Boot[_0x1c6d52(0x721)][_0x1c6d52(0x40c)]=function(){const _0x59e490=_0x1c6d52,_0x27baea=VisuMZ[_0x59e490(0x7b7)][_0x59e490(0x719)][_0x59e490(0xa02)];if(!_0x27baea)return;for(const _0x5f4fbf of _0x27baea){if(!_0x5f4fbf)continue;VisuMZ[_0x59e490(0x7b7)]['createCustomParameter'](_0x5f4fbf);}},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x5af)]={},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x56b)]={},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x1ba)]={},VisuMZ[_0x1c6d52(0x7b7)]['CustomParamAbb']={},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x6c6)]=function(_0x490dce){const _0x308b95=_0x1c6d52,_0x943bad=_0x490dce[_0x308b95(0x319)],_0x2e3a30=_0x490dce['ParamName'],_0x67f355=_0x490dce[_0x308b95(0x5d6)],_0x206924=_0x490dce[_0x308b95(0x529)],_0x504c63=new Function(_0x490dce[_0x308b95(0x683)]);VisuMZ[_0x308b95(0x7b7)][_0x308b95(0x5af)][_0x943bad[_0x308b95(0x5dd)]()[_0x308b95(0x40e)]()]=_0x2e3a30,VisuMZ[_0x308b95(0x7b7)][_0x308b95(0x56b)][_0x943bad['toUpperCase']()[_0x308b95(0x40e)]()]=_0x67f355,VisuMZ[_0x308b95(0x7b7)][_0x308b95(0x1ba)][_0x943bad[_0x308b95(0x5dd)]()['trim']()]=_0x206924,VisuMZ[_0x308b95(0x7b7)]['CustomParamAbb'][_0x943bad[_0x308b95(0x5dd)]()['trim']()]=_0x943bad,Object['defineProperty'](Game_BattlerBase[_0x308b95(0x721)],_0x943bad,{'get'(){const _0x10c351=_0x308b95;if(_0x10c351(0x80b)!==_0x10c351(0x80b))_0x284450[_0x10c351(0x824)](_0xc1eb69);else{const _0x2fbe5c=_0x504c63[_0x10c351(0x78a)](this);return _0x206924===_0x10c351(0x3d4)?Math[_0x10c351(0x5c2)](_0x2fbe5c):_0x2fbe5c;}}});},VisuMZ['CoreEngine'][_0x1c6d52(0x8fb)]={},VisuMZ[_0x1c6d52(0x7b7)]['ControllerMatches']={},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_ControllerButtons']=function(){const _0x56dd49=_0x1c6d52,_0x47adb3=VisuMZ[_0x56dd49(0x7b7)]['Settings'][_0x56dd49(0x8fb)];for(const _0x29d723 of _0x47adb3){if('Viior'===_0x56dd49(0x2c1)){const _0x621a5c=(_0x29d723[_0x56dd49(0x6ec)]||'')[_0x56dd49(0x4ee)]()[_0x56dd49(0x40e)](),_0x790573=(_0x29d723[_0x56dd49(0x4f3)]||'')[_0x56dd49(0x4ee)]()[_0x56dd49(0x40e)]();VisuMZ[_0x56dd49(0x7b7)][_0x56dd49(0x8fb)][_0x621a5c]=_0x29d723,VisuMZ['CoreEngine'][_0x56dd49(0x83d)][_0x790573]=_0x621a5c;}else this[_0x56dd49(0x2d8)]();}},VisuMZ[_0x1c6d52(0x73a)]=function(){const _0x5131a4=_0x1c6d52;for(const _0x3102fa of $dataActors){if(_0x5131a4(0x9a5)==='iracA')return _0x540a6a[_0x5131a4(0x96a)][_0x5131a4(0x78a)](this);else{if(_0x3102fa)VisuMZ[_0x5131a4(0x4c8)](_0x3102fa);}}for(const _0x149def of $dataClasses){if(_0x5131a4(0x9b4)!=='FltsM'){if(typeof _0x2b57c9===_0x5131a4(0x828))return this[_0x5131a4(0x2d4)](_0x47297f);_0x30be83=_0x2474a1(_0x3480b2||'')[_0x5131a4(0x5dd)]();if(_0x48b110==='MAXHP')return this[_0x5131a4(0x2d4)](0x0);if(_0x39178b===_0x5131a4(0x999))return this[_0x5131a4(0x2d4)](0x1);if(_0x37fca7===_0x5131a4(0x24f))return this['param'](0x2);if(_0xcca9e8===_0x5131a4(0x36d))return this[_0x5131a4(0x2d4)](0x3);if(_0x4d00d9===_0x5131a4(0x4d3))return this[_0x5131a4(0x2d4)](0x4);if(_0xb41753===_0x5131a4(0x724))return this[_0x5131a4(0x2d4)](0x5);if(_0x1fea2a==='AGI')return this[_0x5131a4(0x2d4)](0x6);if(_0x1bee5f===_0x5131a4(0x27f))return this['param'](0x7);if(_0x4b99f9==='HIT')return _0x3f5827?_0x2c1624(_0x5210a1[_0x5131a4(0x5c2)](this[_0x5131a4(0x39e)](0x0)*0x64))+'%':this[_0x5131a4(0x39e)](0x0);if(_0x4cf0ba===_0x5131a4(0x959))return _0x461fc8?_0x4ba687(_0x286bf7[_0x5131a4(0x5c2)](this['xparam'](0x1)*0x64))+'%':this[_0x5131a4(0x39e)](0x1);if(_0x176e8c===_0x5131a4(0x360))return _0x462d0e?_0x4dcd53(_0x31e041[_0x5131a4(0x5c2)](this[_0x5131a4(0x39e)](0x2)*0x64))+'%':this[_0x5131a4(0x39e)](0x2);if(_0x1b161c===_0x5131a4(0x787))return _0x1070d3?_0x2a0f7a(_0x151229[_0x5131a4(0x5c2)](this[_0x5131a4(0x39e)](0x3)*0x64))+'%':this[_0x5131a4(0x39e)](0x3);if(_0x3a56af===_0x5131a4(0x57e))return _0x511882?_0x4acb6e(_0xc442f7[_0x5131a4(0x5c2)](this[_0x5131a4(0x39e)](0x4)*0x64))+'%':this[_0x5131a4(0x39e)](0x4);if(_0x3b12be===_0x5131a4(0x2e0))return _0x19e8fc?_0x5d0d65(_0x2ac4c3[_0x5131a4(0x5c2)](this['xparam'](0x5)*0x64))+'%':this[_0x5131a4(0x39e)](0x5);if(_0x13cfd5==='CNT')return _0x345124?_0x5609e6(_0x5d773b['round'](this[_0x5131a4(0x39e)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x13d212===_0x5131a4(0x76d))return _0x13791a?_0x57f170(_0x20faf4[_0x5131a4(0x5c2)](this[_0x5131a4(0x39e)](0x7)*0x64))+'%':this[_0x5131a4(0x39e)](0x7);if(_0x284ae0==='MRG')return _0x15afce?_0x43ffb3(_0x5527b5['round'](this[_0x5131a4(0x39e)](0x8)*0x64))+'%':this[_0x5131a4(0x39e)](0x8);if(_0x18cde0===_0x5131a4(0x629))return _0x4f9869?_0x578baa(_0x4cbd56[_0x5131a4(0x5c2)](this[_0x5131a4(0x39e)](0x9)*0x64))+'%':this[_0x5131a4(0x39e)](0x9);if(_0x5a8ca7===_0x5131a4(0x480))return _0x1baeb6?_0x56aa0c(_0x2fc568['round'](this[_0x5131a4(0x68e)](0x0)*0x64))+'%':this[_0x5131a4(0x68e)](0x0);if(_0x46ace3===_0x5131a4(0x311))return _0x52cdf1?_0x34d333(_0x7bc8c5['round'](this[_0x5131a4(0x68e)](0x1)*0x64))+'%':this[_0x5131a4(0x68e)](0x1);if(_0x5a129b===_0x5131a4(0x84e))return _0x3caad8?_0x5808ef(_0x3f02ca[_0x5131a4(0x5c2)](this[_0x5131a4(0x68e)](0x2)*0x64))+'%':this[_0x5131a4(0x68e)](0x2);if(_0x469ea2===_0x5131a4(0x6dc))return _0x4b6cf1?_0x2b6e11(_0x1252fc[_0x5131a4(0x5c2)](this[_0x5131a4(0x68e)](0x3)*0x64))+'%':this[_0x5131a4(0x68e)](0x3);if(_0x1835ce===_0x5131a4(0x626))return _0x5bd3af?_0x39041c(_0x14c361[_0x5131a4(0x5c2)](this['sparam'](0x4)*0x64))+'%':this[_0x5131a4(0x68e)](0x4);if(_0x30b0c7===_0x5131a4(0x406))return _0x55821f?_0x2e15a7(_0xc29c44[_0x5131a4(0x5c2)](this[_0x5131a4(0x68e)](0x5)*0x64))+'%':this[_0x5131a4(0x68e)](0x5);if(_0x106601===_0x5131a4(0x555))return _0x19fce4?_0x5001f9(_0x177d87['round'](this[_0x5131a4(0x68e)](0x6)*0x64))+'%':this[_0x5131a4(0x68e)](0x6);if(_0x51d9ac===_0x5131a4(0x30d))return _0x8cadd3?_0x4c8c58(_0x3b2683[_0x5131a4(0x5c2)](this['sparam'](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x27c60f===_0x5131a4(0x774))return _0x5ae13a?_0x5caabb(_0x27413c[_0x5131a4(0x5c2)](this[_0x5131a4(0x68e)](0x8)*0x64))+'%':this[_0x5131a4(0x68e)](0x8);if(_0x2e2254===_0x5131a4(0x3a9))return _0x3ab744?_0x155e4a(_0x4f619e[_0x5131a4(0x5c2)](this[_0x5131a4(0x68e)](0x9)*0x64))+'%':this[_0x5131a4(0x68e)](0x9);if(_0x2d4324['CoreEngine']['CustomParamAbb'][_0x2a9b98]){const _0x45762c=_0x124006[_0x5131a4(0x7b7)][_0x5131a4(0x476)][_0x169cc1],_0x1abd2c=this[_0x45762c];return _0x459bc4[_0x5131a4(0x7b7)][_0x5131a4(0x1ba)][_0x505128]===_0x5131a4(0x3d4)?_0x1abd2c:_0x2a6549?_0x30db01(_0x3bc5ec[_0x5131a4(0x5c2)](_0x1abd2c*0x64))+'%':_0x1abd2c;}return'';}else{if(_0x149def)VisuMZ['ParseClassNotetags'](_0x149def);}}for(const _0x298b1c of $dataSkills){if('hmrHt'!==_0x5131a4(0x47c)){if(_0x298b1c)VisuMZ[_0x5131a4(0x546)](_0x298b1c);}else{var _0x46249e=_0x64f912(_0x3b193c['$1']);_0x14b8d4+=_0x46249e;}}for(const _0x386f17 of $dataItems){if(_0x386f17)VisuMZ[_0x5131a4(0x527)](_0x386f17);}for(const _0x568d60 of $dataWeapons){if(_0x568d60)VisuMZ[_0x5131a4(0x5db)](_0x568d60);}for(const _0x276f65 of $dataArmors){if(_0x276f65)VisuMZ[_0x5131a4(0x2d2)](_0x276f65);}for(const _0x15cec7 of $dataEnemies){if(_0x15cec7)VisuMZ[_0x5131a4(0x28b)](_0x15cec7);}for(const _0x33c0a5 of $dataStates){if(_0x33c0a5)VisuMZ[_0x5131a4(0x6c4)](_0x33c0a5);}for(const _0x5dcab1 of $dataTilesets){if(_0x5131a4(0x722)==='MuFSD'){_0x36d0c8['endAnimation']&&_0x24cde4[_0x5131a4(0x902)]();const _0x5bfe17=this[_0x5131a4(0x2f7)]();if(_0x5bfe17)_0x5bfe17[_0x5131a4(0x731)](_0x3d7e86);}else{if(_0x5dcab1)VisuMZ[_0x5131a4(0x461)](_0x5dcab1);}}},VisuMZ[_0x1c6d52(0x4c8)]=function(_0x4f3a4a){},VisuMZ[_0x1c6d52(0x245)]=function(_0x471d56){},VisuMZ[_0x1c6d52(0x546)]=function(_0x5b87d1){},VisuMZ['ParseItemNotetags']=function(_0x16ef79){},VisuMZ['ParseWeaponNotetags']=function(_0x30e5dd){},VisuMZ[_0x1c6d52(0x2d2)]=function(_0x267638){},VisuMZ[_0x1c6d52(0x28b)]=function(_0x22ba97){},VisuMZ[_0x1c6d52(0x6c4)]=function(_0x2748a5){},VisuMZ[_0x1c6d52(0x461)]=function(_0x3ef0d2){},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x4c8)]=VisuMZ['ParseActorNotetags'],VisuMZ[_0x1c6d52(0x4c8)]=function(_0x4fa89d){const _0x1b06ab=_0x1c6d52;VisuMZ[_0x1b06ab(0x7b7)][_0x1b06ab(0x4c8)][_0x1b06ab(0x78a)](this,_0x4fa89d);const _0x2fd5df=_0x4fa89d['note'];if(_0x2fd5df[_0x1b06ab(0x91c)](/<MAX LEVEL:[ ](\d+)>/i)){_0x4fa89d['maxLevel']=Number(RegExp['$1']);if(_0x4fa89d[_0x1b06ab(0x887)]===0x0)_0x4fa89d[_0x1b06ab(0x887)]=Number[_0x1b06ab(0x354)];}_0x2fd5df['match'](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x4fa89d[_0x1b06ab(0x47d)]=Math['min'](Number(RegExp['$1']),_0x4fa89d[_0x1b06ab(0x887)]));},VisuMZ[_0x1c6d52(0x7b7)]['ParseClassNotetags']=VisuMZ[_0x1c6d52(0x245)],VisuMZ[_0x1c6d52(0x245)]=function(_0x3fb069){const _0x4acf9=_0x1c6d52;VisuMZ['CoreEngine'][_0x4acf9(0x245)][_0x4acf9(0x78a)](this,_0x3fb069);if(_0x3fb069[_0x4acf9(0x922)]){if(_0x4acf9(0x5c0)!==_0x4acf9(0x446))for(const _0x1f42ea of _0x3fb069[_0x4acf9(0x922)]){if(_0x4acf9(0xa36)!=='ScIDh')_0x1f42ea['note'][_0x4acf9(0x91c)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x1f42ea[_0x4acf9(0x202)]=Math[_0x4acf9(0x269)](Number(RegExp['$1']),0x1));else{const _0x1bfb0f=new _0x292eb9();_0x1bfb0f['x']=_0x102bc6['x'],_0x1bfb0f['y']=_0x578080['y'],_0x1bfb0f['z']=0x64;const _0x16a5ae=this['getPointAnimationLayer']();return _0x16a5ae['addChild'](_0x1bfb0f),[_0x1bfb0f];}}else this[_0x4acf9(0x3c1)]=0x0;}},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x28b)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x1c6d52(0x28b)]=function(_0x2bb7cb){const _0x224662=_0x1c6d52;VisuMZ['CoreEngine'][_0x224662(0x28b)][_0x224662(0x78a)](this,_0x2bb7cb),_0x2bb7cb[_0x224662(0x202)]=0x1;const _0x367af2=_0x2bb7cb[_0x224662(0x9a1)];if(_0x367af2['match'](/<LEVEL:[ ](\d+)>/i))_0x2bb7cb['level']=Number(RegExp['$1']);if(_0x367af2[_0x224662(0x91c)](/<MAXHP:[ ](\d+)>/i))_0x2bb7cb[_0x224662(0x846)][0x0]=Number(RegExp['$1']);if(_0x367af2[_0x224662(0x91c)](/<MAXMP:[ ](\d+)>/i))_0x2bb7cb['params'][0x1]=Number(RegExp['$1']);if(_0x367af2['match'](/<ATK:[ ](\d+)>/i))_0x2bb7cb['params'][0x2]=Number(RegExp['$1']);if(_0x367af2[_0x224662(0x91c)](/<DEF:[ ](\d+)>/i))_0x2bb7cb['params'][0x3]=Number(RegExp['$1']);if(_0x367af2['match'](/<MAT:[ ](\d+)>/i))_0x2bb7cb['params'][0x4]=Number(RegExp['$1']);if(_0x367af2[_0x224662(0x91c)](/<MDF:[ ](\d+)>/i))_0x2bb7cb['params'][0x5]=Number(RegExp['$1']);if(_0x367af2['match'](/<AGI:[ ](\d+)>/i))_0x2bb7cb[_0x224662(0x846)][0x6]=Number(RegExp['$1']);if(_0x367af2[_0x224662(0x91c)](/<LUK:[ ](\d+)>/i))_0x2bb7cb[_0x224662(0x846)][0x7]=Number(RegExp['$1']);if(_0x367af2['match'](/<EXP:[ ](\d+)>/i))_0x2bb7cb['exp']=Number(RegExp['$1']);if(_0x367af2[_0x224662(0x91c)](/<GOLD:[ ](\d+)>/i))_0x2bb7cb[_0x224662(0x9ad)]=Number(RegExp['$1']);},VisuMZ['CoreEngine'][_0x1c6d52(0xa03)]=Graphics[_0x1c6d52(0x1f4)],Graphics['_defaultStretchMode']=function(){const _0x2f5f41=_0x1c6d52;switch(VisuMZ[_0x2f5f41(0x7b7)]['Settings'][_0x2f5f41(0x858)]['AutoStretch']){case _0x2f5f41(0x2fd):return!![];case'normal':return![];default:return VisuMZ[_0x2f5f41(0x7b7)][_0x2f5f41(0xa03)][_0x2f5f41(0x78a)](this);}},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x945)]=Graphics['printError'],Graphics['printError']=function(_0x1a8a4b,_0xb379ec,_0x2346ea=null){const _0x4cd4d3=_0x1c6d52;VisuMZ[_0x4cd4d3(0x7b7)][_0x4cd4d3(0x945)]['call'](this,_0x1a8a4b,_0xb379ec,_0x2346ea),VisuMZ[_0x4cd4d3(0x52a)](![]);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x6c1)]=Graphics['_centerElement'],Graphics['_centerElement']=function(_0x985820){const _0x233e80=_0x1c6d52;VisuMZ[_0x233e80(0x7b7)][_0x233e80(0x6c1)][_0x233e80(0x78a)](this,_0x985820),this['_centerElementCoreEngine'](_0x985820);},Graphics[_0x1c6d52(0x99e)]=function(_0x34989f){const _0x5aa4b9=_0x1c6d52;VisuMZ[_0x5aa4b9(0x7b7)][_0x5aa4b9(0x719)][_0x5aa4b9(0x858)]['FontSmoothing']&&(_0x5aa4b9(0x47e)!==_0x5aa4b9(0x47e)?this[_0x5aa4b9(0x3c1)]=_0x5aa4b9(0x538):_0x34989f['style'][_0x5aa4b9(0x7f5)]=_0x5aa4b9(0x67c));VisuMZ[_0x5aa4b9(0x7b7)][_0x5aa4b9(0x719)][_0x5aa4b9(0x858)]['PixelateImageRendering']&&(_0x34989f[_0x5aa4b9(0x293)]['image-rendering']='pixelated');const _0x512fef=Math[_0x5aa4b9(0x269)](0x0,Math[_0x5aa4b9(0x403)](_0x34989f['width']*this[_0x5aa4b9(0x7d2)])),_0x2e591b=Math[_0x5aa4b9(0x269)](0x0,Math[_0x5aa4b9(0x403)](_0x34989f[_0x5aa4b9(0x81f)]*this[_0x5aa4b9(0x7d2)]));_0x34989f['style'][_0x5aa4b9(0x552)]=_0x512fef+'px',_0x34989f[_0x5aa4b9(0x293)]['height']=_0x2e591b+'px';},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x90a)]=Bitmap['prototype'][_0x1c6d52(0x271)],Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x271)]=function(_0x2a5255,_0x42ba5b){const _0xc4f442=_0x1c6d52;VisuMZ[_0xc4f442(0x7b7)]['Bitmap_initialize'][_0xc4f442(0x78a)](this,_0x2a5255,_0x42ba5b),this[_0xc4f442(0x9e5)]=!(VisuMZ[_0xc4f442(0x7b7)][_0xc4f442(0x719)][_0xc4f442(0x858)][_0xc4f442(0x9fd)]??!![]);},Bitmap[_0x1c6d52(0x721)]['markCoreEngineModified']=function(){const _0x3febfb=_0x1c6d52;this[_0x3febfb(0x843)]=!![];},VisuMZ['CoreEngine'][_0x1c6d52(0x4bf)]=Sprite[_0x1c6d52(0x721)][_0x1c6d52(0x806)],Sprite['prototype']['destroy']=function(){const _0x38f3e5=_0x1c6d52;if(this['_texture'])VisuMZ['CoreEngine'][_0x38f3e5(0x4bf)][_0x38f3e5(0x78a)](this);this['destroyCoreEngineMarkedBitmaps']();},Sprite['prototype']['destroyCoreEngineMarkedBitmaps']=function(){const _0x1b811d=_0x1c6d52;if(!this[_0x1b811d(0x33a)])return;if(!this[_0x1b811d(0x33a)][_0x1b811d(0x843)])return;this[_0x1b811d(0x33a)]['_baseTexture']&&!this['_bitmap'][_0x1b811d(0x28f)][_0x1b811d(0x301)]&&(_0x1b811d(0x224)==='GfowQ'?(this[_0x1b811d(0x9db)]=new _0x17e229['filters'][(_0x1b811d(0x3b0))](_0x5f1cc9=!![]),this[_0x1b811d(0x2c0)]=new _0x14a0aa(),this['_backgroundSprite'][_0x1b811d(0x33a)]=_0x48d601[_0x1b811d(0x78d)](),this['_backgroundSprite']['filters']=[this[_0x1b811d(0x9db)]],this[_0x1b811d(0x81b)](this[_0x1b811d(0x2c0)]),this[_0x1b811d(0x8ea)](0xc0),this[_0x1b811d(0x8ea)](this[_0x1b811d(0x587)]()),this['createCustomBackgroundImages']()):this[_0x1b811d(0x33a)][_0x1b811d(0x806)]());},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x96b)]=Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x6d0)],Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x6d0)]=function(_0x458fee,_0x2a9449){const _0x1a77a2=_0x1c6d52;VisuMZ[_0x1a77a2(0x7b7)][_0x1a77a2(0x96b)][_0x1a77a2(0x78a)](this,_0x458fee,_0x2a9449),this[_0x1a77a2(0x623)]();},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x689)]=Bitmap[_0x1c6d52(0x721)]['blt'],Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x544)]=function(_0x21c141,_0x46c343,_0x179ecc,_0x5e5dd5,_0x28da6c,_0x3c4f4a,_0xd7fe01,_0x2cbbed,_0x500328){const _0x1aa145=_0x1c6d52;_0x46c343=Math[_0x1aa145(0x5c2)](_0x46c343),_0x179ecc=Math['round'](_0x179ecc),_0x5e5dd5=Math[_0x1aa145(0x5c2)](_0x5e5dd5),_0x28da6c=Math[_0x1aa145(0x5c2)](_0x28da6c),_0x3c4f4a=Math[_0x1aa145(0x5c2)](_0x3c4f4a),_0xd7fe01=Math[_0x1aa145(0x5c2)](_0xd7fe01),VisuMZ[_0x1aa145(0x7b7)][_0x1aa145(0x689)]['call'](this,_0x21c141,_0x46c343,_0x179ecc,_0x5e5dd5,_0x28da6c,_0x3c4f4a,_0xd7fe01,_0x2cbbed,_0x500328),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x1c6d52(0x590)]=Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x638)],Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x638)]=function(_0x2b96d6,_0x208948,_0x4ea79e,_0x234861){const _0x27ffd8=_0x1c6d52;VisuMZ[_0x27ffd8(0x7b7)]['Bitmap_clearRect'][_0x27ffd8(0x78a)](this,_0x2b96d6,_0x208948,_0x4ea79e,_0x234861),this[_0x27ffd8(0x623)]();},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x757)]=Bitmap[_0x1c6d52(0x721)]['fillRect'],Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x717)]=function(_0x4bc5b4,_0x506291,_0x2b1605,_0x1ec78c,_0x342059){const _0x38e7b2=_0x1c6d52;VisuMZ['CoreEngine'][_0x38e7b2(0x757)][_0x38e7b2(0x78a)](this,_0x4bc5b4,_0x506291,_0x2b1605,_0x1ec78c,_0x342059),this[_0x38e7b2(0x623)]();},VisuMZ['CoreEngine']['Bitmap_strokeRect']=Bitmap['prototype'][_0x1c6d52(0x929)],Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x929)]=function(_0x46cac5,_0x6e82,_0x51fcac,_0x152c9d,_0x2bddf8){const _0x3cce61=_0x1c6d52;VisuMZ[_0x3cce61(0x7b7)][_0x3cce61(0x91e)]['call'](this,_0x46cac5,_0x6e82,_0x51fcac,_0x152c9d,_0x2bddf8),this[_0x3cce61(0x623)]();},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x223)]=Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x2b7)],Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x2b7)]=function(_0x1dca3e,_0x56b342,_0x2b7473,_0x246515,_0x3fa015,_0x5e5b40,_0x352ebd){const _0x376d0a=_0x1c6d52;VisuMZ[_0x376d0a(0x7b7)]['Bitmap_gradientFillRect']['call'](this,_0x1dca3e,_0x56b342,_0x2b7473,_0x246515,_0x3fa015,_0x5e5b40,_0x352ebd),this[_0x376d0a(0x623)]();},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x83a)]=Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x5ad)],Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x5ad)]=function(_0x2ea7b0,_0x58da20,_0xadfd70,_0x2efee8){const _0x1aa881=_0x1c6d52;_0x2ea7b0=Math[_0x1aa881(0x5c2)](_0x2ea7b0),_0x58da20=Math[_0x1aa881(0x5c2)](_0x58da20),_0xadfd70=Math[_0x1aa881(0x5c2)](_0xadfd70),VisuMZ[_0x1aa881(0x7b7)][_0x1aa881(0x83a)][_0x1aa881(0x78a)](this,_0x2ea7b0,_0x58da20,_0xadfd70,_0x2efee8),this[_0x1aa881(0x623)]();},VisuMZ[_0x1c6d52(0x7b7)]['Bitmap_measureTextWidth']=Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0xa2d)],Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0xa2d)]=function(_0x1f7300){const _0x500ebd=_0x1c6d52;return Math['ceil'](VisuMZ[_0x500ebd(0x7b7)][_0x500ebd(0x2e9)][_0x500ebd(0x78a)](this,_0x1f7300));},VisuMZ['CoreEngine']['Bitmap_drawText']=Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x60d)],Bitmap['prototype'][_0x1c6d52(0x60d)]=function(_0x5432a8,_0x2424fd,_0x40a0e3,_0xea19e5,_0x389b27,_0x345461){const _0x1e0051=_0x1c6d52;_0x2424fd=Math[_0x1e0051(0x5c2)](_0x2424fd),_0x40a0e3=Math[_0x1e0051(0x5c2)](_0x40a0e3),_0xea19e5=Math['round'](_0xea19e5),_0x389b27=Math['round'](_0x389b27),VisuMZ['CoreEngine']['Bitmap_drawText']['call'](this,_0x5432a8,_0x2424fd,_0x40a0e3,_0xea19e5,_0x389b27,_0x345461),this[_0x1e0051(0x623)]();},VisuMZ['CoreEngine'][_0x1c6d52(0xa4c)]=Bitmap['prototype']['_drawTextOutline'],Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x8e0)]=function(_0x20b9c6,_0x3f28d6,_0xe9fc06,_0x221b02){const _0x46a071=_0x1c6d52;VisuMZ['CoreEngine']['Settings'][_0x46a071(0x858)][_0x46a071(0x2b9)]?this[_0x46a071(0x880)](_0x20b9c6,_0x3f28d6,_0xe9fc06,_0x221b02):VisuMZ['CoreEngine'][_0x46a071(0xa4c)][_0x46a071(0x78a)](this,_0x20b9c6,_0x3f28d6,_0xe9fc06,_0x221b02);},Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x880)]=function(_0x4c0451,_0x27a0f8,_0x3f5fb6,_0x432c57){const _0x23e6db=_0x1c6d52,_0x293b95=this[_0x23e6db(0x3c5)];_0x293b95['fillStyle']=this['outlineColor'],_0x293b95[_0x23e6db(0x904)](_0x4c0451,_0x27a0f8+0x2,_0x3f5fb6+0x2,_0x432c57);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x4b5)]=Input[_0x1c6d52(0x261)],Input['clear']=function(){const _0x29ec7c=_0x1c6d52;VisuMZ[_0x29ec7c(0x7b7)]['Input_clear'][_0x29ec7c(0x78a)](this),this[_0x29ec7c(0x75c)]=undefined,this['_inputSpecialKeyCode']=undefined,this['_gamepadWait']=Input['keyRepeatWait'];},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x2ec)]=Input[_0x1c6d52(0xa50)],Input[_0x1c6d52(0xa50)]=function(){const _0x5aabf6=_0x1c6d52;VisuMZ['CoreEngine'][_0x5aabf6(0x2ec)][_0x5aabf6(0x78a)](this);if(this['_gamepadWait'])this[_0x5aabf6(0x6f1)]--;},VisuMZ['CoreEngine']['Input_pollGamepads']=Input[_0x1c6d52(0x84f)],Input[_0x1c6d52(0x84f)]=function(){const _0xeb405e=_0x1c6d52;if(this[_0xeb405e(0x6f1)])return;VisuMZ[_0xeb405e(0x7b7)][_0xeb405e(0x237)][_0xeb405e(0x78a)](this);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x7c2)]=Input[_0x1c6d52(0x706)],Input[_0x1c6d52(0x706)]=function(){const _0x39b693=_0x1c6d52;VisuMZ['CoreEngine']['Input_setupEventHandlers'][_0x39b693(0x78a)](this),document[_0x39b693(0x54f)]('keypress',this['_onKeyPress'][_0x39b693(0x2fe)](this));},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0xa3a)]=Input[_0x1c6d52(0x6a9)],Input[_0x1c6d52(0x6a9)]=function(_0x599557){const _0x43dee3=_0x1c6d52;this[_0x43dee3(0x43b)]=_0x599557[_0x43dee3(0x62c)],VisuMZ[_0x43dee3(0x7b7)][_0x43dee3(0xa3a)][_0x43dee3(0x78a)](this,_0x599557),this[_0x43dee3(0x6b2)](null);},Input[_0x1c6d52(0x4ac)]=function(_0x5ee378){const _0x3a9c25=_0x1c6d52;this[_0x3a9c25(0x1e1)](_0x5ee378);},Input[_0x1c6d52(0x1e1)]=function(_0xfaa092){const _0x17d1de=_0x1c6d52;this['_inputSpecialKeyCode']=_0xfaa092[_0x17d1de(0x62c)];let _0x242e82=String[_0x17d1de(0x817)](_0xfaa092[_0x17d1de(0x258)]);this[_0x17d1de(0x75c)]===undefined?this[_0x17d1de(0x75c)]=_0x242e82:this[_0x17d1de(0x75c)]+=_0x242e82;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x9b3)]=Input[_0x1c6d52(0x789)],Input[_0x1c6d52(0x789)]=function(_0x143035){const _0x101239=_0x1c6d52;if(_0x143035===0x8)return![];return VisuMZ[_0x101239(0x7b7)]['Input_shouldPreventDefault'][_0x101239(0x78a)](this,_0x143035);},Input[_0x1c6d52(0x7e2)]=function(_0x4f0ec9){const _0x49c4e6=_0x1c6d52;if(_0x4f0ec9[_0x49c4e6(0x91c)](/backspace/i))return this[_0x49c4e6(0x43b)]===0x8;if(_0x4f0ec9[_0x49c4e6(0x91c)](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0x4f0ec9['match'](/escape/i))return this[_0x49c4e6(0x43b)]===0x1b;},Input[_0x1c6d52(0x4c3)]=function(){const _0x3ce28d=_0x1c6d52;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x3ce28d(0x8fc)](this[_0x3ce28d(0x43b)]);},Input[_0x1c6d52(0xa38)]=function(){const _0x2f603c=_0x1c6d52;return[0x25,0x26,0x27,0x28][_0x2f603c(0x8fc)](this[_0x2f603c(0x43b)]);},Input[_0x1c6d52(0x2b4)]=function(){const _0x284b29=_0x1c6d52;if(navigator[_0x284b29(0x9fa)]){const _0x3fe1d3=navigator[_0x284b29(0x9fa)]();if(_0x3fe1d3){if(_0x284b29(0x53e)===_0x284b29(0x53e))for(const _0x4317b8 of _0x3fe1d3){if(_0x4317b8&&_0x4317b8[_0x284b29(0x26f)])return _0x284b29(0x577)!==_0x284b29(0x675)?!![]:_0x4ec688[_0x284b29(0x471)]-this['helpAreaHeight']();}else this['isItemStyle']()?this[_0x284b29(0x5a4)]():_0x23d120[_0x284b29(0x7b7)][_0x284b29(0x410)][_0x284b29(0x78a)](this);}}return![];},Input[_0x1c6d52(0x760)]=function(){const _0xda5a58=_0x1c6d52;if(navigator['getGamepads']){const _0x241688=navigator[_0xda5a58(0x9fa)]();if(_0x241688)for(const _0x1cd50d of _0x241688){if(_0x1cd50d&&_0x1cd50d[_0xda5a58(0x26f)]){if(this[_0xda5a58(0x332)](_0x1cd50d))return!![];if(this[_0xda5a58(0x1f6)](_0x1cd50d))return!![];}}}return![];},Input[_0x1c6d52(0x332)]=function(_0x13b579){const _0x54b0de=_0x13b579['buttons'];for(let _0x228445=0x0;_0x228445<_0x54b0de['length'];_0x228445++){if(_0x54b0de[_0x228445]['pressed'])return!![];}return![];},Input['isGamepadAxisMoved']=function(_0x25fad4){const _0x44df52=_0x1c6d52,_0x2c0172=_0x25fad4[_0x44df52(0x747)],_0x3a8fbc=0.5;if(_0x2c0172[0x0]<-_0x3a8fbc)return!![];if(_0x2c0172[0x0]>_0x3a8fbc)return!![];if(_0x2c0172[0x1]<-_0x3a8fbc)return!![];if(_0x2c0172[0x1]>_0x3a8fbc)return!![];return![];},Input[_0x1c6d52(0x796)]=function(){const _0x158d92=_0x1c6d52;return this[_0x158d92(0x54a)]||null;},Input[_0x1c6d52(0x6b2)]=function(_0xe893ff){this['_lastGamepad']=_0xe893ff;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x51b)]=Input[_0x1c6d52(0x612)],Input[_0x1c6d52(0x612)]=function(_0x331e2c){const _0x326523=_0x1c6d52;VisuMZ[_0x326523(0x7b7)][_0x326523(0x51b)][_0x326523(0x78a)](this,_0x331e2c),(this[_0x326523(0x332)](_0x331e2c)||this['isGamepadAxisMoved'](_0x331e2c))&&this[_0x326523(0x6b2)](_0x331e2c);},Input[_0x1c6d52(0x48a)]=function(){const _0x495b9a=_0x1c6d52;return this[_0x495b9a(0x54a)]?this['_lastGamepad']['id']:_0x495b9a(0x668);},VisuMZ[_0x1c6d52(0x7b7)]['Tilemap_addShadow']=Tilemap['prototype'][_0x1c6d52(0x4c6)],Tilemap['prototype']['_addShadow']=function(_0x1cd70e,_0x21bb6d,_0x4a9072,_0x2cf528){const _0x36a8b7=_0x1c6d52;if($gameMap&&$gameMap[_0x36a8b7(0x7bd)]())return;VisuMZ[_0x36a8b7(0x7b7)][_0x36a8b7(0x1d0)]['call'](this,_0x1cd70e,_0x21bb6d,_0x4a9072,_0x2cf528);},Tilemap[_0x1c6d52(0x950)]['prototype'][_0x1c6d52(0x917)]=function(){const _0x14f3c7=_0x1c6d52;this[_0x14f3c7(0x281)]();for(let _0x3b2a32=0x0;_0x3b2a32<Tilemap[_0x14f3c7(0x755)][_0x14f3c7(0x74b)];_0x3b2a32++){const _0x10ee51=new PIXI[(_0x14f3c7(0x849))]();_0x10ee51[_0x14f3c7(0x635)](0x800,0x800),VisuMZ[_0x14f3c7(0x7b7)][_0x14f3c7(0x719)][_0x14f3c7(0x858)][_0x14f3c7(0x9fd)]&&(_0x10ee51[_0x14f3c7(0x565)]=PIXI['SCALE_MODES']['NEAREST']),this[_0x14f3c7(0x898)]['push'](_0x10ee51);}},WindowLayer['prototype'][_0x1c6d52(0x551)]=function(){const _0x3161ed=_0x1c6d52;return SceneManager&&SceneManager[_0x3161ed(0x62e)]?SceneManager['_scene'][_0x3161ed(0x5da)]():!![];},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x1ee)]=WindowLayer[_0x1c6d52(0x721)][_0x1c6d52(0x648)],WindowLayer[_0x1c6d52(0x721)][_0x1c6d52(0x648)]=function render(_0x2c8210){const _0x129c90=_0x1c6d52;if(this['isMaskingEnabled']())VisuMZ[_0x129c90(0x7b7)][_0x129c90(0x1ee)][_0x129c90(0x78a)](this,_0x2c8210);else{if(_0x129c90(0x53f)!==_0x129c90(0x7a5))this[_0x129c90(0x7b6)](_0x2c8210);else{let _0x136d6e=_0x1058b4[_0x129c90(0x63a)](_0x42996e)[_0x129c90(0x65f)]();this[_0x129c90(0x3de)]()&&(_0x136d6e=_0x2040b2[_0x129c90(0x279)](_0x136d6e));const _0x140d3d=this[_0x129c90(0x35f)](),_0x335925=_0x368145[_0x129c90(0x403)](_0x140d3d*0.75);for(let _0x39865c=0x0;_0x39865c<_0x136d6e['length'];_0x39865c++){const _0x7cd90f=this[_0x129c90(0x601)](_0x335925,_0x140d3d);_0x7cd90f['bitmap'][_0x129c90(0x60d)](_0x136d6e[_0x39865c],0x0,0x0,_0x335925,_0x140d3d,_0x129c90(0x735)),_0x7cd90f['x']=(_0x39865c-(_0x136d6e['length']-0x1)/0x2)*_0x335925,_0x7cd90f['dy']=-_0x39865c;}}}},WindowLayer['prototype'][_0x1c6d52(0x7b6)]=function render(_0x1e7745){const _0x1c9e59=_0x1c6d52;if(!this['visible'])return;const _0x37f32f=new PIXI[(_0x1c9e59(0x5d0))](),_0x4dcd93=_0x1e7745['gl'],_0x334e5f=this['children']['clone']();_0x1e7745['framebuffer'][_0x1c9e59(0x998)](),_0x37f32f[_0x1c9e59(0x2c4)]=this[_0x1c9e59(0x2c4)],_0x1e7745['batch'][_0x1c9e59(0x40d)](),_0x4dcd93[_0x1c9e59(0x8df)](_0x4dcd93[_0x1c9e59(0x2bb)]);while(_0x334e5f[_0x1c9e59(0x3bf)]>0x0){if('mwQPS'==='eZetU')return'CTB';else{const _0x1b35e3=_0x334e5f[_0x1c9e59(0x2fc)]();if(_0x1b35e3['_isWindow']&&_0x1b35e3[_0x1c9e59(0x454)]&&_0x1b35e3[_0x1c9e59(0x671)]>0x0){if('NySAp'==='EgskE'){this[_0x1c9e59(0x9cc)]['clear']();const _0x1c56e6=_0x19f49e[_0x1c9e59(0x878)],_0x4fcb4e=_0x511308[_0x1c9e59(0x4a6)](_0x1c56e6);if(!_0x4fcb4e)return;this[_0x1c9e59(0x465)]=_0x4fcb4e['_origin'],this[_0x1c9e59(0xa3e)]=_0x4fcb4e['_x'],this['_lastY']=_0x4fcb4e['_y'];const _0x779eef=_0x192022[_0x1c9e59(0x2b5)]();this['contents'][_0x1c9e59(0x717)](0x0,0x0,this[_0x1c9e59(0x2c6)],this[_0x1c9e59(0x7fb)],_0x779eef);const _0x4712af=_0x1c9e59(0x3d9)[_0x1c9e59(0x649)](_0x4fcb4e[_0x1c9e59(0x9a8)]===0x0?_0x1c9e59(0x3fe):'Center'),_0x4a7fb4='X:\x20%1'[_0x1c9e59(0x649)](_0x4fcb4e['_x']),_0x1a6a31=_0x1c9e59(0xa4b)[_0x1c9e59(0x649)](_0x4fcb4e['_y']),_0xe8e9a0=_0x1c9e59(0x984)[_0x1c9e59(0x649)](_0x195bbf[_0x1c9e59(0x4f1)](_0x1c9e59(0x908)));let _0x162f25=_0x58a8df[_0x1c9e59(0x403)](this[_0x1c9e59(0x2c6)]/0x4);this[_0x1c9e59(0x60d)](_0x4712af,_0x162f25*0x0,0x0,_0x162f25),this[_0x1c9e59(0x60d)](_0x4a7fb4,_0x162f25*0x1,0x0,_0x162f25,_0x1c9e59(0x735)),this[_0x1c9e59(0x60d)](_0x1a6a31,_0x162f25*0x2,0x0,_0x162f25,_0x1c9e59(0x735));const _0x10ca81=this['textSizeEx'](_0xe8e9a0)[_0x1c9e59(0x552)],_0x3cfbc7=this[_0x1c9e59(0x2c6)]-_0x10ca81;this[_0x1c9e59(0x467)](_0xe8e9a0,_0x3cfbc7,0x0,_0x10ca81);}else _0x4dcd93['stencilFunc'](_0x4dcd93[_0x1c9e59(0x9dc)],0x0,~0x0),_0x4dcd93[_0x1c9e59(0x9dd)](_0x4dcd93[_0x1c9e59(0x75f)],_0x4dcd93[_0x1c9e59(0x75f)],_0x4dcd93[_0x1c9e59(0x75f)]),_0x1b35e3[_0x1c9e59(0x648)](_0x1e7745),_0x1e7745['batch']['flush'](),_0x37f32f['clear'](),_0x4dcd93[_0x1c9e59(0xa4d)](_0x4dcd93['ALWAYS'],0x1,~0x0),_0x4dcd93[_0x1c9e59(0x9dd)](_0x4dcd93[_0x1c9e59(0x763)],_0x4dcd93[_0x1c9e59(0x763)],_0x4dcd93[_0x1c9e59(0x763)]),_0x4dcd93[_0x1c9e59(0x1eb)](_0x4dcd93[_0x1c9e59(0x441)],_0x4dcd93[_0x1c9e59(0x414)]),_0x37f32f['render'](_0x1e7745),_0x1e7745[_0x1c9e59(0x23f)][_0x1c9e59(0x40d)](),_0x4dcd93[_0x1c9e59(0x1eb)](_0x4dcd93[_0x1c9e59(0x414)],_0x4dcd93['ONE_MINUS_SRC_ALPHA']);}}}_0x4dcd93['disable'](_0x4dcd93[_0x1c9e59(0x2bb)]),_0x4dcd93['clear'](_0x4dcd93['STENCIL_BUFFER_BIT']),_0x4dcd93['clearStencil'](0x0),_0x1e7745[_0x1c9e59(0x23f)][_0x1c9e59(0x40d)]();for(const _0x582a7b of this[_0x1c9e59(0x4e4)]){if(_0x1c9e59(0x776)===_0x1c9e59(0x776))!_0x582a7b[_0x1c9e59(0x3fb)]&&_0x582a7b[_0x1c9e59(0x454)]&&_0x582a7b[_0x1c9e59(0x648)](_0x1e7745);else{const _0x5308e9=_0x1c9e59(0x586);this['_colorCache']=this[_0x1c9e59(0x7e4)]||{};if(this['_colorCache'][_0x5308e9])return this[_0x1c9e59(0x7e4)][_0x5308e9];const _0x384ce2=_0x380dc6[_0x1c9e59(0x7b7)]['Settings']['Color'][_0x1c9e59(0x99f)];return this['getColorDataFromPluginParameters'](_0x5308e9,_0x384ce2);}}_0x1e7745[_0x1c9e59(0x23f)][_0x1c9e59(0x40d)]();},DataManager['isKeyItem']=function(_0x13cf9f){const _0x36f07=_0x1c6d52;return this['isItem'](_0x13cf9f)&&_0x13cf9f[_0x36f07(0x1b6)]===0x2;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x947)]=DataManager[_0x1c6d52(0x276)],DataManager['setupNewGame']=function(){const _0x5e2ae2=_0x1c6d52;VisuMZ[_0x5e2ae2(0x7b7)][_0x5e2ae2(0x947)][_0x5e2ae2(0x78a)](this),this[_0x5e2ae2(0x7d0)](),this['reserveNewGameCommonEvent']();},DataManager[_0x1c6d52(0x7d0)]=function(){const _0x322b03=_0x1c6d52;if($gameTemp[_0x322b03(0x1c7)]()){if('ghADH'!==_0x322b03(0x5d1)){const _0x1652e8=VisuMZ['CoreEngine']['Settings'][_0x322b03(0x858)][_0x322b03(0x869)];if(_0x1652e8>0x0)$gameTemp[_0x322b03(0x45d)](_0x1652e8);}else{if(_0x449779[_0x322b03(0x1c7)]())_0x3a2161['log'](_0x28f83c);}}},DataManager[_0x1c6d52(0x971)]=function(){const _0x1bacd3=_0x1c6d52,_0x200634=VisuMZ[_0x1bacd3(0x7b7)]['Settings'][_0x1bacd3(0x858)][_0x1bacd3(0x523)]||0x0;if(_0x200634>0x0)$gameTemp[_0x1bacd3(0x45d)](_0x200634);},DataManager[_0x1c6d52(0x4a1)]=function(_0x26c639){const _0x3025bc=_0x1c6d52,_0x41f63c=$dataTroops[_0x26c639];if(!_0x41f63c)return'';let _0x335d85='';_0x335d85+=_0x41f63c[_0x3025bc(0x4fb)];for(const _0x3ec8d6 of _0x41f63c[_0x3025bc(0x94c)]){if(_0x3025bc(0x895)!==_0x3025bc(0x895))this[_0x3025bc(0x4d8)](_0x5dc6d1[_0x3025bc(0x9a1)]);else for(const _0x36f497 of _0x3ec8d6[_0x3025bc(0x5c4)]){_0x3025bc(0x7fc)===_0x3025bc(0x413)?this[_0x3025bc(0x87f)][_0x3025bc(0x87c)](_0x5eee39[_0x3025bc(0x872)][_0x3025bc(0x7a7)]):[0x6c,0x198][_0x3025bc(0xa04)](_0x36f497[_0x3025bc(0x85a)])&&(_0x335d85+='\x0a',_0x335d85+=_0x36f497[_0x3025bc(0x3f8)][0x0]);}}return _0x335d85;};(VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)]['QoL'][_0x1c6d52(0x7e1)]??!![])&&($scene=null,VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x997)]=Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x317)],Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x317)]=function(){const _0x5ab0a7=_0x1c6d52;VisuMZ['CoreEngine'][_0x5ab0a7(0x997)]['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x3bb)]=Scene_Map[_0x1c6d52(0x721)][_0x1c6d52(0x9d8)],Scene_Map[_0x1c6d52(0x721)][_0x1c6d52(0x9d8)]=function(){const _0x151c0b=_0x1c6d52;VisuMZ[_0x151c0b(0x7b7)][_0x151c0b(0x3bb)][_0x151c0b(0x78a)](this),$spriteset=this['_spriteset'];},VisuMZ['CoreEngine'][_0x1c6d52(0x964)]=Scene_Battle['prototype'][_0x1c6d52(0x9d8)],Scene_Battle[_0x1c6d52(0x721)][_0x1c6d52(0x9d8)]=function(){const _0x340c49=_0x1c6d52;VisuMZ['CoreEngine'][_0x340c49(0x964)][_0x340c49(0x78a)](this),$spriteset=this[_0x340c49(0x87b)];},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x5cf)]=Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x204)],Scene_Base[_0x1c6d52(0x721)]['terminate']=function(){const _0x53a612=_0x1c6d52;VisuMZ[_0x53a612(0x7b7)][_0x53a612(0x5cf)][_0x53a612(0x78a)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x1c6d52(0x7b7)]['BattleManager_update']=BattleManager[_0x1c6d52(0xa50)],BattleManager[_0x1c6d52(0xa50)]=function(_0x4b4ff1){const _0x1263ab=_0x1c6d52;VisuMZ[_0x1263ab(0x7b7)][_0x1263ab(0x693)][_0x1263ab(0x78a)](this,_0x4b4ff1),$subject=this[_0x1263ab(0x8ef)],$targets=this[_0x1263ab(0x83f)],$target=this[_0x1263ab(0x891)]||this[_0x1263ab(0x83f)][0x0];},$event=null,VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x2d6)]=Game_Event[_0x1c6d52(0x721)]['start'],Game_Event[_0x1c6d52(0x721)]['start']=function(){const _0x20d2c8=_0x1c6d52;VisuMZ['CoreEngine']['Game_Event_start'][_0x20d2c8(0x78a)](this),$event=this;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x3fa)]=Scene_Map[_0x1c6d52(0x721)]['update'],Scene_Map[_0x1c6d52(0x721)][_0x1c6d52(0xa50)]=function(){const _0x48f0ac=_0x1c6d52;VisuMZ['CoreEngine']['Scene_Map_update']['call'](this),$gameMap[_0x48f0ac(0xa2a)]();},Game_Map[_0x1c6d52(0x721)][_0x1c6d52(0xa2a)]=function(){const _0x2fa8cb=_0x1c6d52;if(!this[_0x2fa8cb(0x52b)]()&&$event!==null){if(_0x2fa8cb(0x1e6)!==_0x2fa8cb(0x1e6))return 0x0;else $event=null;}},$commonEvent=function(_0x409ddf){const _0x515ac6=_0x1c6d52;if($gameTemp)$gameTemp[_0x515ac6(0x45d)](_0x409ddf);},$onceParallel=function(_0x30ca6d){const _0x279e2c=_0x1c6d52;if(SceneManager[_0x279e2c(0x8cc)]())$scene[_0x279e2c(0x694)](_0x30ca6d);else{if(SceneManager['isSceneBattle']()){if(Imported[_0x279e2c(0x7b3)])_0x279e2c(0x6e4)===_0x279e2c(0x20e)?_0x254c39=_0x4c71d2[_0x279e2c(0x269)](_0x5d12c3,_0x17b8a1(_0x39e155(_0x233351))):$scene[_0x279e2c(0x694)](_0x30ca6d);else $gameTemp&&$gameTemp[_0x279e2c(0x1c7)]()&&alert(_0x279e2c(0x2aa));}else $gameTemp&&$gameTemp[_0x279e2c(0x1c7)]()&&alert(_0x279e2c(0x99c));}});;StorageManager['jsonToZip']=function(_0x50a814){return new Promise((_0x2d2a7e,_0x35b035)=>{const _0xc11e11=_0x324f;if(_0xc11e11(0x1be)===_0xc11e11(0x1be))try{const _0x2fc9c7=pako['deflate'](_0x50a814,{'to':'string','level':0x1});if(_0x2fc9c7[_0xc11e11(0x3bf)]>=0xc350){}_0x2d2a7e(_0x2fc9c7);}catch(_0x1d6e0f){_0x35b035(_0x1d6e0f);}else return 0x1;});},TextManager[_0x1c6d52(0x76a)]=['','','',_0x1c6d52(0x5de),'','',_0x1c6d52(0xa49),'','BACKSPACE',_0x1c6d52(0x3aa),'','',_0x1c6d52(0x8f4),_0x1c6d52(0x2a6),_0x1c6d52(0x2fa),'',_0x1c6d52(0x2ea),_0x1c6d52(0x5b2),_0x1c6d52(0x93b),_0x1c6d52(0x2f6),_0x1c6d52(0x9ec),_0x1c6d52(0x972),_0x1c6d52(0x4d4),_0x1c6d52(0x2ed),_0x1c6d52(0x222),_0x1c6d52(0x738),'',_0x1c6d52(0x78f),_0x1c6d52(0x861),_0x1c6d52(0x86f),'ACCEPT',_0x1c6d52(0x9ff),_0x1c6d52(0x64b),_0x1c6d52(0x3b5),_0x1c6d52(0x39f),_0x1c6d52(0x6e0),_0x1c6d52(0x9d4),'LEFT','UP',_0x1c6d52(0x342),_0x1c6d52(0x6cf),_0x1c6d52(0x9ab),_0x1c6d52(0xa4e),_0x1c6d52(0x8e1),_0x1c6d52(0x602),'INSERT',_0x1c6d52(0x500),'','0','1','2','3','4','5','6','7','8','9',_0x1c6d52(0x2ba),_0x1c6d52(0x748),_0x1c6d52(0x956),_0x1c6d52(0x889),_0x1c6d52(0x334),'QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x1c6d52(0x3b4),'',_0x1c6d52(0x7c3),'',_0x1c6d52(0x9f4),_0x1c6d52(0x8fd),_0x1c6d52(0x3f7),'NUMPAD2','NUMPAD3',_0x1c6d52(0x573),_0x1c6d52(0x89a),'NUMPAD6',_0x1c6d52(0x247),'NUMPAD8',_0x1c6d52(0x3f5),_0x1c6d52(0x345),_0x1c6d52(0x59a),_0x1c6d52(0x568),_0x1c6d52(0x743),_0x1c6d52(0x37d),_0x1c6d52(0x3d1),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x1c6d52(0x89b),_0x1c6d52(0x9d5),_0x1c6d52(0x485),'F13',_0x1c6d52(0x6a0),_0x1c6d52(0x520),'F16','F17',_0x1c6d52(0x736),_0x1c6d52(0x200),_0x1c6d52(0x243),_0x1c6d52(0x737),_0x1c6d52(0x4df),_0x1c6d52(0x853),'F24','','','','','','','','',_0x1c6d52(0x727),'SCROLL_LOCK',_0x1c6d52(0x4da),_0x1c6d52(0x58d),_0x1c6d52(0x457),'WIN_OEM_FJ_LOYA',_0x1c6d52(0x2a7),'','','','','','','','','',_0x1c6d52(0x51d),_0x1c6d52(0x411),_0x1c6d52(0x63b),_0x1c6d52(0x1da),_0x1c6d52(0x7d5),_0x1c6d52(0x5bc),_0x1c6d52(0x72a),_0x1c6d52(0x540),_0x1c6d52(0x320),_0x1c6d52(0x9ba),_0x1c6d52(0x9bd),_0x1c6d52(0x650),_0x1c6d52(0x2cb),_0x1c6d52(0x6b5),_0x1c6d52(0x3b9),'CLOSE_CURLY_BRACKET','TILDE','','','','','VOLUME_MUTE','VOLUME_DOWN',_0x1c6d52(0x40b),'','',_0x1c6d52(0x748),'EQUALS','COMMA',_0x1c6d52(0x665),_0x1c6d52(0x37e),_0x1c6d52(0x239),_0x1c6d52(0x41d),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x1c6d52(0x778),_0x1c6d52(0x932),'CLOSE_BRACKET',_0x1c6d52(0x5ff),'','META',_0x1c6d52(0x643),'','WIN_ICO_HELP','WIN_ICO_00','',_0x1c6d52(0x553),'','',_0x1c6d52(0x50b),_0x1c6d52(0x55b),_0x1c6d52(0xa1a),_0x1c6d52(0x20b),_0x1c6d52(0x4c5),_0x1c6d52(0x8e7),_0x1c6d52(0x4aa),_0x1c6d52(0x81e),_0x1c6d52(0x988),_0x1c6d52(0x957),_0x1c6d52(0x746),'WIN_OEM_ENLW',_0x1c6d52(0x6eb),_0x1c6d52(0x42d),'CRSEL',_0x1c6d52(0x458),_0x1c6d52(0x7a0),_0x1c6d52(0x966),_0x1c6d52(0x4c9),'','PA1',_0x1c6d52(0x905),''],TextManager[_0x1c6d52(0x352)]=VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)][_0x1c6d52(0x96c)]['OkText'],TextManager[_0x1c6d52(0x4b9)]=VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)]['ButtonAssist']['CancelText'],TextManager[_0x1c6d52(0x384)]=VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)][_0x1c6d52(0x96c)][_0x1c6d52(0x91a)],VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x531)]=TextManager[_0x1c6d52(0x2d4)],TextManager[_0x1c6d52(0x2d4)]=function(_0x3f83ba){const _0x5b6194=_0x1c6d52;return typeof _0x3f83ba===_0x5b6194(0x828)?VisuMZ[_0x5b6194(0x7b7)][_0x5b6194(0x531)][_0x5b6194(0x78a)](this,_0x3f83ba):'rjeud'!==_0x5b6194(0x9ee)?_0x48a562['layoutSettings']['StatusEquipRect'][_0x5b6194(0x78a)](this):this[_0x5b6194(0x5be)](_0x3f83ba);},TextManager[_0x1c6d52(0x5be)]=function(_0x2050d4){const _0x45e0fb=_0x1c6d52;_0x2050d4=String(_0x2050d4||'')[_0x45e0fb(0x5dd)]();const _0x371449=VisuMZ['CoreEngine']['Settings']['Param'];if(_0x2050d4===_0x45e0fb(0x4bb))return $dataSystem['terms']['params'][0x0];if(_0x2050d4===_0x45e0fb(0x999))return $dataSystem[_0x45e0fb(0x911)]['params'][0x1];if(_0x2050d4===_0x45e0fb(0x24f))return $dataSystem['terms'][_0x45e0fb(0x846)][0x2];if(_0x2050d4==='DEF')return $dataSystem[_0x45e0fb(0x911)][_0x45e0fb(0x846)][0x3];if(_0x2050d4===_0x45e0fb(0x4d3))return $dataSystem[_0x45e0fb(0x911)][_0x45e0fb(0x846)][0x4];if(_0x2050d4===_0x45e0fb(0x724))return $dataSystem[_0x45e0fb(0x911)]['params'][0x5];if(_0x2050d4===_0x45e0fb(0x494))return $dataSystem[_0x45e0fb(0x911)][_0x45e0fb(0x846)][0x6];if(_0x2050d4===_0x45e0fb(0x27f))return $dataSystem[_0x45e0fb(0x911)][_0x45e0fb(0x846)][0x7];if(_0x2050d4===_0x45e0fb(0x3f9))return _0x371449[_0x45e0fb(0x512)];if(_0x2050d4===_0x45e0fb(0x959))return _0x371449['XParamVocab1'];if(_0x2050d4==='CRI')return _0x371449[_0x45e0fb(0x30c)];if(_0x2050d4===_0x45e0fb(0x787))return _0x371449[_0x45e0fb(0x338)];if(_0x2050d4===_0x45e0fb(0x57e))return _0x371449[_0x45e0fb(0x9c9)];if(_0x2050d4===_0x45e0fb(0x2e0))return _0x371449[_0x45e0fb(0x7f0)];if(_0x2050d4===_0x45e0fb(0x8f3))return _0x371449[_0x45e0fb(0x1cd)];if(_0x2050d4===_0x45e0fb(0x76d))return _0x371449[_0x45e0fb(0x371)];if(_0x2050d4===_0x45e0fb(0x781))return _0x371449[_0x45e0fb(0x361)];if(_0x2050d4===_0x45e0fb(0x629))return _0x371449[_0x45e0fb(0x9df)];if(_0x2050d4===_0x45e0fb(0x480))return _0x371449[_0x45e0fb(0x219)];if(_0x2050d4===_0x45e0fb(0x311))return _0x371449[_0x45e0fb(0x81a)];if(_0x2050d4===_0x45e0fb(0x84e))return _0x371449[_0x45e0fb(0x8c0)];if(_0x2050d4===_0x45e0fb(0x6dc))return _0x371449['SParamVocab3'];if(_0x2050d4===_0x45e0fb(0x626))return _0x371449[_0x45e0fb(0x33e)];if(_0x2050d4==='TCR')return _0x371449['SParamVocab5'];if(_0x2050d4===_0x45e0fb(0x555))return _0x371449[_0x45e0fb(0x6f4)];if(_0x2050d4===_0x45e0fb(0x30d))return _0x371449[_0x45e0fb(0x1b9)];if(_0x2050d4==='FDR')return _0x371449[_0x45e0fb(0x695)];if(_0x2050d4===_0x45e0fb(0x3a9))return _0x371449[_0x45e0fb(0x201)];if(VisuMZ[_0x45e0fb(0x7b7)][_0x45e0fb(0x5af)][_0x2050d4]){if(_0x45e0fb(0x655)===_0x45e0fb(0x655))return VisuMZ['CoreEngine'][_0x45e0fb(0x5af)][_0x2050d4];else{if(_0x561f24[_0x45e0fb(0x1c7)]())_0x15c871[_0x45e0fb(0x321)](_0xdee21);}}return'';},TextManager['getInputButtonString']=function(_0xa7d9ca){const _0x4c19af=_0x1c6d52,_0x4dfd42=Input[_0x4c19af(0x48a)]();return _0x4dfd42===_0x4c19af(0x668)?this[_0x4c19af(0x614)](_0xa7d9ca):this[_0x4c19af(0x38c)](_0x4dfd42,_0xa7d9ca);},TextManager[_0x1c6d52(0x614)]=function(_0x4bcaac){const _0x130e6c=_0x1c6d52;if(_0x4bcaac===_0x130e6c(0x908))_0x4bcaac='escape';if(_0x4bcaac===_0x130e6c(0x4b4))_0x4bcaac=_0x130e6c(0x6d8);let _0x1aa4cf=[];for(let _0x2c46c6 in Input[_0x130e6c(0x48c)]){_0x2c46c6=Number(_0x2c46c6);if(_0x2c46c6>=0x60&&_0x2c46c6<=0x69)continue;if([0x12,0x20][_0x130e6c(0xa04)](_0x2c46c6))continue;_0x4bcaac===Input['keyMapper'][_0x2c46c6]&&_0x1aa4cf['push'](_0x2c46c6);}for(let _0x20c20c=0x0;_0x20c20c<_0x1aa4cf[_0x130e6c(0x3bf)];_0x20c20c++){_0x1aa4cf[_0x20c20c]=TextManager[_0x130e6c(0x76a)][_0x1aa4cf[_0x20c20c]];}return this[_0x130e6c(0x75d)](_0x1aa4cf);},TextManager[_0x1c6d52(0x75d)]=function(_0x31a36f){const _0xacc6b7=_0x1c6d52,_0x9c1dd7=VisuMZ['CoreEngine'][_0xacc6b7(0x719)][_0xacc6b7(0x96c)],_0x3dd52b=_0x9c1dd7['KeyUnlisted'],_0x43834d=_0x31a36f[_0xacc6b7(0x90c)](),_0x2922e9=_0xacc6b7(0x6be)[_0xacc6b7(0x649)](_0x43834d);return _0x9c1dd7[_0x2922e9]?_0x9c1dd7[_0x2922e9]:_0x3dd52b['format'](_0x43834d);},TextManager[_0x1c6d52(0x2a4)]=function(_0x55f397,_0x4ef21f){const _0x11af06=_0x1c6d52,_0x358691=VisuMZ[_0x11af06(0x7b7)][_0x11af06(0x719)]['ButtonAssist'],_0x189c2b=_0x358691['MultiKeyFmt'],_0x13759c=this['getInputButtonString'](_0x55f397),_0x36bf35=this['getInputButtonString'](_0x4ef21f);return _0x189c2b['format'](_0x13759c,_0x36bf35);},TextManager[_0x1c6d52(0x38c)]=function(_0x2ac9a7,_0x2cbaa3){const _0x429ebf=_0x1c6d52,_0x5a2860=_0x2ac9a7[_0x429ebf(0x4ee)]()[_0x429ebf(0x40e)](),_0x463d7c=VisuMZ['CoreEngine'][_0x429ebf(0x8fb)][_0x5a2860];if(!_0x463d7c)return this[_0x429ebf(0xa29)](_0x2ac9a7,_0x2cbaa3);return _0x463d7c[_0x2cbaa3]||this[_0x429ebf(0x614)](_0x2ac9a7,_0x2cbaa3);},TextManager['getControllerInputButtonMatch']=function(_0x51ba65,_0xdc601){const _0x54ad76=_0x1c6d52,_0x359c17=_0x51ba65[_0x54ad76(0x4ee)]()[_0x54ad76(0x40e)]();for(const _0x2adb37 in VisuMZ[_0x54ad76(0x7b7)][_0x54ad76(0x83d)]){if(_0x359c17[_0x54ad76(0xa04)](_0x2adb37)){if(_0x54ad76(0x794)===_0x54ad76(0x1f1)){var _0x4667a2=_0x4ee6f2(_0x9e2daf['$1']);try{_0x5ade8b+=_0x238b35(_0x4667a2);}catch(_0x1baa5f){if(_0x596ff4[_0x54ad76(0x1c7)]())_0x3c3b28[_0x54ad76(0x321)](_0x1baa5f);}}else{const _0x1a9327=VisuMZ[_0x54ad76(0x7b7)]['ControllerMatches'][_0x2adb37],_0x279723=VisuMZ['CoreEngine'][_0x54ad76(0x8fb)][_0x1a9327];return _0x279723[_0xdc601]||this['getKeyboardInputButtonString'](_0xdc601);}}}return this[_0x54ad76(0x614)](_0xdc601);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x5bf)]=ColorManager['loadWindowskin'],ColorManager[_0x1c6d52(0x2dd)]=function(){const _0xa70e29=_0x1c6d52;VisuMZ[_0xa70e29(0x7b7)][_0xa70e29(0x5bf)][_0xa70e29(0x78a)](this),this[_0xa70e29(0x7e4)]=this[_0xa70e29(0x7e4)]||{};},ColorManager[_0x1c6d52(0x493)]=function(_0x42b438,_0x3dfab8){const _0x52645b=_0x1c6d52;_0x3dfab8=String(_0x3dfab8),this['_colorCache']=this[_0x52645b(0x7e4)]||{};if(_0x3dfab8[_0x52645b(0x91c)](/#(.*)/i))this[_0x52645b(0x7e4)][_0x42b438]=_0x52645b(0x2d1)[_0x52645b(0x649)](String(RegExp['$1']));else{if('MWlta'===_0x52645b(0x651))this[_0x52645b(0x7e4)][_0x42b438]=this[_0x52645b(0x676)](Number(_0x3dfab8));else return!![];}return this[_0x52645b(0x7e4)][_0x42b438];},ColorManager[_0x1c6d52(0x46d)]=function(_0xfd5c1a){const _0x39d4cd=_0x1c6d52;return _0xfd5c1a=String(_0xfd5c1a),_0xfd5c1a[_0x39d4cd(0x91c)](/#(.*)/i)?_0x39d4cd(0x296)==='KjqBc'?_0x3fd67d[_0x39d4cd(0x7b7)][_0x39d4cd(0x719)][_0x39d4cd(0x5a1)]['OpenSpeed']:_0x39d4cd(0x2d1)[_0x39d4cd(0x649)](String(RegExp['$1'])):this[_0x39d4cd(0x676)](Number(_0xfd5c1a));},ColorManager['clearCachedKeys']=function(){const _0x2c5547=_0x1c6d52;this[_0x2c5547(0x7e4)]={};},ColorManager['normalColor']=function(){const _0x4f63cf=_0x1c6d52,_0x1aafe9='_stored_normalColor';this['_colorCache']=this[_0x4f63cf(0x7e4)]||{};if(this[_0x4f63cf(0x7e4)][_0x1aafe9])return this['_colorCache'][_0x1aafe9];const _0x14d83b=VisuMZ['CoreEngine'][_0x4f63cf(0x719)]['Color'][_0x4f63cf(0x5b8)];return this[_0x4f63cf(0x493)](_0x1aafe9,_0x14d83b);},ColorManager[_0x1c6d52(0x89e)]=function(){const _0x49bf33=_0x1c6d52,_0xdb02dc=_0x49bf33(0x80c);this['_colorCache']=this[_0x49bf33(0x7e4)]||{};if(this[_0x49bf33(0x7e4)][_0xdb02dc])return this[_0x49bf33(0x7e4)][_0xdb02dc];const _0x172f1a=VisuMZ['CoreEngine']['Settings'][_0x49bf33(0x2bf)][_0x49bf33(0x975)];return this['getColorDataFromPluginParameters'](_0xdb02dc,_0x172f1a);},ColorManager[_0x1c6d52(0x270)]=function(){const _0xb14196=_0x1c6d52,_0x34a321='_stored_crisisColor';this['_colorCache']=this[_0xb14196(0x7e4)]||{};if(this[_0xb14196(0x7e4)][_0x34a321])return this[_0xb14196(0x7e4)][_0x34a321];const _0x5b9076=VisuMZ[_0xb14196(0x7b7)][_0xb14196(0x719)][_0xb14196(0x2bf)]['ColorCrisis'];return this[_0xb14196(0x493)](_0x34a321,_0x5b9076);},ColorManager[_0x1c6d52(0x634)]=function(){const _0x334c92=_0x1c6d52,_0x189bf0=_0x334c92(0xa1e);this[_0x334c92(0x7e4)]=this['_colorCache']||{};if(this[_0x334c92(0x7e4)][_0x189bf0])return this[_0x334c92(0x7e4)][_0x189bf0];const _0x29286f=VisuMZ['CoreEngine'][_0x334c92(0x719)]['Color'][_0x334c92(0x315)];return this[_0x334c92(0x493)](_0x189bf0,_0x29286f);},ColorManager['gaugeBackColor']=function(){const _0x4863d1=_0x1c6d52,_0x4e62ce=_0x4863d1(0x99b);this[_0x4863d1(0x7e4)]=this[_0x4863d1(0x7e4)]||{};if(this[_0x4863d1(0x7e4)][_0x4e62ce])return this['_colorCache'][_0x4e62ce];const _0x491dcd=VisuMZ[_0x4863d1(0x7b7)]['Settings'][_0x4863d1(0x2bf)][_0x4863d1(0xa31)];return this['getColorDataFromPluginParameters'](_0x4e62ce,_0x491dcd);},ColorManager['hpGaugeColor1']=function(){const _0x37d4bb=_0x1c6d52,_0x292937='_stored_hpGaugeColor1';this[_0x37d4bb(0x7e4)]=this['_colorCache']||{};if(this['_colorCache'][_0x292937])return this[_0x37d4bb(0x7e4)][_0x292937];const _0x6b7391=VisuMZ[_0x37d4bb(0x7b7)]['Settings']['Color'][_0x37d4bb(0x82e)];return this[_0x37d4bb(0x493)](_0x292937,_0x6b7391);},ColorManager[_0x1c6d52(0x9b2)]=function(){const _0x98b8e4=_0x1c6d52,_0x535f1f=_0x98b8e4(0x5f5);this[_0x98b8e4(0x7e4)]=this[_0x98b8e4(0x7e4)]||{};if(this[_0x98b8e4(0x7e4)][_0x535f1f])return this[_0x98b8e4(0x7e4)][_0x535f1f];const _0x3ae610=VisuMZ[_0x98b8e4(0x7b7)]['Settings'][_0x98b8e4(0x2bf)]['ColorHPGauge2'];return this[_0x98b8e4(0x493)](_0x535f1f,_0x3ae610);},ColorManager[_0x1c6d52(0x433)]=function(){const _0x10396a=_0x1c6d52,_0x544e85=_0x10396a(0x5d8);this[_0x10396a(0x7e4)]=this['_colorCache']||{};if(this[_0x10396a(0x7e4)][_0x544e85])return this[_0x10396a(0x7e4)][_0x544e85];const _0x21e3e6=VisuMZ[_0x10396a(0x7b7)]['Settings']['Color'][_0x10396a(0x5b1)];return this[_0x10396a(0x493)](_0x544e85,_0x21e3e6);},ColorManager['mpGaugeColor2']=function(){const _0x32ae3d=_0x1c6d52,_0x29803f=_0x32ae3d(0x220);this[_0x32ae3d(0x7e4)]=this[_0x32ae3d(0x7e4)]||{};if(this[_0x32ae3d(0x7e4)][_0x29803f])return this['_colorCache'][_0x29803f];const _0x24511c=VisuMZ[_0x32ae3d(0x7b7)][_0x32ae3d(0x719)][_0x32ae3d(0x2bf)][_0x32ae3d(0x450)];return this[_0x32ae3d(0x493)](_0x29803f,_0x24511c);},ColorManager[_0x1c6d52(0x70f)]=function(){const _0x455572=_0x1c6d52,_0x5ecf73=_0x455572(0x5f4);this['_colorCache']=this[_0x455572(0x7e4)]||{};if(this['_colorCache'][_0x5ecf73])return this[_0x455572(0x7e4)][_0x5ecf73];const _0x4dc715=VisuMZ[_0x455572(0x7b7)][_0x455572(0x719)][_0x455572(0x2bf)][_0x455572(0x8a6)];return this[_0x455572(0x493)](_0x5ecf73,_0x4dc715);},ColorManager[_0x1c6d52(0xa32)]=function(){const _0x255f23=_0x1c6d52,_0x4fbdb9=_0x255f23(0x518);this[_0x255f23(0x7e4)]=this['_colorCache']||{};if(this[_0x255f23(0x7e4)][_0x4fbdb9])return this[_0x255f23(0x7e4)][_0x4fbdb9];const _0x677b49=VisuMZ[_0x255f23(0x7b7)][_0x255f23(0x719)]['Color'][_0x255f23(0x388)];return this[_0x255f23(0x493)](_0x4fbdb9,_0x677b49);},ColorManager[_0x1c6d52(0x487)]=function(){const _0x3c9cd5=_0x1c6d52,_0xd7a28e=_0x3c9cd5(0x522);this['_colorCache']=this[_0x3c9cd5(0x7e4)]||{};if(this[_0x3c9cd5(0x7e4)][_0xd7a28e])return this[_0x3c9cd5(0x7e4)][_0xd7a28e];const _0x33e4bf=VisuMZ[_0x3c9cd5(0x7b7)][_0x3c9cd5(0x719)][_0x3c9cd5(0x2bf)]['ColorPowerDown'];return this[_0x3c9cd5(0x493)](_0xd7a28e,_0x33e4bf);},ColorManager[_0x1c6d52(0xa34)]=function(){const _0x1455e3=_0x1c6d52,_0x2190ca=_0x1455e3(0x55f);this[_0x1455e3(0x7e4)]=this[_0x1455e3(0x7e4)]||{};if(this[_0x1455e3(0x7e4)][_0x2190ca])return this[_0x1455e3(0x7e4)][_0x2190ca];const _0x390c5c=VisuMZ[_0x1455e3(0x7b7)]['Settings'][_0x1455e3(0x2bf)][_0x1455e3(0x1b1)];return this[_0x1455e3(0x493)](_0x2190ca,_0x390c5c);},ColorManager[_0x1c6d52(0x9eb)]=function(){const _0x1fad7b=_0x1c6d52,_0x49d50a='_stored_ctGaugeColor2';this[_0x1fad7b(0x7e4)]=this[_0x1fad7b(0x7e4)]||{};if(this['_colorCache'][_0x49d50a])return this[_0x1fad7b(0x7e4)][_0x49d50a];const _0xe9f195=VisuMZ['CoreEngine'][_0x1fad7b(0x719)][_0x1fad7b(0x2bf)][_0x1fad7b(0x99f)];return this[_0x1fad7b(0x493)](_0x49d50a,_0xe9f195);},ColorManager['tpGaugeColor1']=function(){const _0x1181f3=_0x1c6d52,_0x215407=_0x1181f3(0x9b7);this[_0x1181f3(0x7e4)]=this[_0x1181f3(0x7e4)]||{};if(this[_0x1181f3(0x7e4)][_0x215407])return this[_0x1181f3(0x7e4)][_0x215407];const _0x4558be=VisuMZ[_0x1181f3(0x7b7)][_0x1181f3(0x719)]['Color']['ColorTPGauge1'];return this[_0x1181f3(0x493)](_0x215407,_0x4558be);},ColorManager[_0x1c6d52(0x61c)]=function(){const _0x48b0ff=_0x1c6d52,_0x366e95=_0x48b0ff(0x919);this[_0x48b0ff(0x7e4)]=this['_colorCache']||{};if(this[_0x48b0ff(0x7e4)][_0x366e95])return this['_colorCache'][_0x366e95];const _0x3b0861=VisuMZ['CoreEngine'][_0x48b0ff(0x719)]['Color']['ColorTPGauge2'];return this[_0x48b0ff(0x493)](_0x366e95,_0x3b0861);},ColorManager[_0x1c6d52(0x1c4)]=function(){const _0x4ec95b=_0x1c6d52,_0xec7976='_stored_tpCostColor';this['_colorCache']=this[_0x4ec95b(0x7e4)]||{};if(this[_0x4ec95b(0x7e4)][_0xec7976])return this['_colorCache'][_0xec7976];const _0xa62f7a=VisuMZ[_0x4ec95b(0x7b7)][_0x4ec95b(0x719)][_0x4ec95b(0x2bf)][_0x4ec95b(0x899)];return this[_0x4ec95b(0x493)](_0xec7976,_0xa62f7a);},ColorManager[_0x1c6d52(0x921)]=function(){const _0x128440=_0x1c6d52,_0x4c0f22=_0x128440(0x1f5);this[_0x128440(0x7e4)]=this[_0x128440(0x7e4)]||{};if(this[_0x128440(0x7e4)][_0x4c0f22])return this[_0x128440(0x7e4)][_0x4c0f22];const _0x22b767=VisuMZ['CoreEngine'][_0x128440(0x719)][_0x128440(0x2bf)][_0x128440(0x899)];return this[_0x128440(0x493)](_0x4c0f22,_0x22b767);},ColorManager['expGaugeColor1']=function(){const _0xe2e4de=_0x1c6d52,_0x12c308='_stored_expGaugeColor1';this[_0xe2e4de(0x7e4)]=this[_0xe2e4de(0x7e4)]||{};if(this[_0xe2e4de(0x7e4)][_0x12c308])return this[_0xe2e4de(0x7e4)][_0x12c308];const _0x93dfad=VisuMZ[_0xe2e4de(0x7b7)][_0xe2e4de(0x719)][_0xe2e4de(0x2bf)][_0xe2e4de(0x876)];return this[_0xe2e4de(0x493)](_0x12c308,_0x93dfad);},ColorManager['expGaugeColor2']=function(){const _0x468c25=_0x1c6d52,_0x25bf57='_stored_expGaugeColor2';this[_0x468c25(0x7e4)]=this[_0x468c25(0x7e4)]||{};if(this[_0x468c25(0x7e4)][_0x25bf57])return this[_0x468c25(0x7e4)][_0x25bf57];const _0xa61115=VisuMZ[_0x468c25(0x7b7)][_0x468c25(0x719)][_0x468c25(0x2bf)][_0x468c25(0x812)];return this[_0x468c25(0x493)](_0x25bf57,_0xa61115);},ColorManager[_0x1c6d52(0x678)]=function(){const _0x295d10=_0x1c6d52,_0x26342e=_0x295d10(0x1fc);this[_0x295d10(0x7e4)]=this[_0x295d10(0x7e4)]||{};if(this[_0x295d10(0x7e4)][_0x26342e])return this[_0x295d10(0x7e4)][_0x26342e];const _0x2fde4f=VisuMZ['CoreEngine'][_0x295d10(0x719)][_0x295d10(0x2bf)][_0x295d10(0x762)];return this[_0x295d10(0x493)](_0x26342e,_0x2fde4f);},ColorManager[_0x1c6d52(0x280)]=function(){const _0x53ac0b=_0x1c6d52,_0x4aebd1=_0x53ac0b(0x705);this[_0x53ac0b(0x7e4)]=this[_0x53ac0b(0x7e4)]||{};if(this[_0x53ac0b(0x7e4)][_0x4aebd1])return this[_0x53ac0b(0x7e4)][_0x4aebd1];const _0x5658c7=VisuMZ[_0x53ac0b(0x7b7)]['Settings'][_0x53ac0b(0x2bf)]['ColorMaxLvGauge2'];return this['getColorDataFromPluginParameters'](_0x4aebd1,_0x5658c7);},ColorManager[_0x1c6d52(0x1e3)]=function(_0x10893a){const _0x4ad0b0=_0x1c6d52;return VisuMZ[_0x4ad0b0(0x7b7)][_0x4ad0b0(0x719)][_0x4ad0b0(0x2bf)][_0x4ad0b0(0x769)][_0x4ad0b0(0x78a)](this,_0x10893a);},ColorManager[_0x1c6d52(0x4eb)]=function(_0x1d79ef){const _0x53f5f8=_0x1c6d52;return VisuMZ[_0x53f5f8(0x7b7)][_0x53f5f8(0x719)][_0x53f5f8(0x2bf)][_0x53f5f8(0x85d)][_0x53f5f8(0x78a)](this,_0x1d79ef);},ColorManager['tpColor']=function(_0x1193f2){const _0x51f427=_0x1c6d52;return VisuMZ[_0x51f427(0x7b7)][_0x51f427(0x719)][_0x51f427(0x2bf)][_0x51f427(0x4a3)][_0x51f427(0x78a)](this,_0x1193f2);},ColorManager['paramchangeTextColor']=function(_0x513f52){const _0x463f2a=_0x1c6d52;return VisuMZ['CoreEngine'][_0x463f2a(0x719)][_0x463f2a(0x2bf)][_0x463f2a(0x73b)][_0x463f2a(0x78a)](this,_0x513f52);},ColorManager[_0x1c6d52(0x277)]=function(_0x5a08fd){const _0x3bd625=_0x1c6d52;return VisuMZ[_0x3bd625(0x7b7)][_0x3bd625(0x719)][_0x3bd625(0x2bf)][_0x3bd625(0x4a2)]['call'](this,_0x5a08fd);},ColorManager[_0x1c6d52(0x46e)]=function(){const _0x3839d7=_0x1c6d52;return VisuMZ[_0x3839d7(0x7b7)][_0x3839d7(0x719)][_0x3839d7(0x2bf)][_0x3839d7(0x43d)];},ColorManager['outlineColorDmg']=function(){const _0x23cc8b=_0x1c6d52;return VisuMZ['CoreEngine'][_0x23cc8b(0x719)][_0x23cc8b(0x2bf)][_0x23cc8b(0x76f)]||_0x23cc8b(0x685);},ColorManager[_0x1c6d52(0x5e6)]=function(){const _0x4940fc=_0x1c6d52;return VisuMZ[_0x4940fc(0x7b7)][_0x4940fc(0x719)][_0x4940fc(0x2bf)][_0x4940fc(0xa30)]||_0x4940fc(0x661);},ColorManager[_0x1c6d52(0x5ac)]=function(){const _0x1fd32a=_0x1c6d52;return VisuMZ[_0x1fd32a(0x7b7)][_0x1fd32a(0x719)]['Color'][_0x1fd32a(0x460)];},ColorManager[_0x1c6d52(0x9a3)]=function(){const _0x232326=_0x1c6d52;return VisuMZ['CoreEngine'][_0x232326(0x719)]['Color'][_0x232326(0x5e9)];},ColorManager[_0x1c6d52(0x2b5)]=function(){const _0xa4aee5=_0x1c6d52;return VisuMZ[_0xa4aee5(0x7b7)][_0xa4aee5(0x719)][_0xa4aee5(0x2bf)][_0xa4aee5(0x90e)];},ColorManager[_0x1c6d52(0x783)]=function(){const _0x371eba=_0x1c6d52;return VisuMZ[_0x371eba(0x7b7)][_0x371eba(0x719)][_0x371eba(0x2bf)][_0x371eba(0xa09)];},SceneManager[_0x1c6d52(0x768)]=[],SceneManager[_0x1c6d52(0x8cb)]=function(){const _0x11d828=_0x1c6d52;return this['_scene']&&this[_0x11d828(0x62e)][_0x11d828(0x5ed)]===Scene_Battle;},SceneManager[_0x1c6d52(0x8cc)]=function(){const _0x50b341=_0x1c6d52;return this[_0x50b341(0x62e)]&&this[_0x50b341(0x62e)][_0x50b341(0x5ed)]===Scene_Map;},SceneManager[_0x1c6d52(0x227)]=function(){const _0x29ec46=_0x1c6d52;return this[_0x29ec46(0x62e)]&&this[_0x29ec46(0x62e)]instanceof Scene_Map;},VisuMZ['CoreEngine'][_0x1c6d52(0x495)]=SceneManager[_0x1c6d52(0x271)],SceneManager['initialize']=function(){const _0x5e9707=_0x1c6d52;VisuMZ[_0x5e9707(0x7b7)][_0x5e9707(0x495)]['call'](this),this['initVisuMZCoreEngine']();},VisuMZ['CoreEngine']['SceneManager_onKeyDown']=SceneManager[_0x1c6d52(0x39c)],SceneManager['onKeyDown']=function(_0x2114b0){const _0x58ae4c=_0x1c6d52;if($gameTemp)this['onKeyDownKeysF6F7'](_0x2114b0);VisuMZ[_0x58ae4c(0x7b7)][_0x58ae4c(0x2b1)][_0x58ae4c(0x78a)](this,_0x2114b0);},SceneManager[_0x1c6d52(0x840)]=function(_0x5e4534){const _0x563e7f=_0x1c6d52;if(!_0x5e4534['ctrlKey']&&!_0x5e4534[_0x563e7f(0x35d)])switch(_0x5e4534['keyCode']){case 0x54:this[_0x563e7f(0x624)]();break;case 0x75:this[_0x563e7f(0x5c7)]();break;case 0x76:if(Input[_0x563e7f(0x347)]('shift')||Input['isPressed'](_0x563e7f(0x1c2)))return;this[_0x563e7f(0x255)]();break;}},SceneManager[_0x1c6d52(0x5c7)]=function(){const _0x4c5725=_0x1c6d52;if($gameTemp[_0x4c5725(0x1c7)]()&&VisuMZ[_0x4c5725(0x7b7)]['Settings'][_0x4c5725(0x858)][_0x4c5725(0x915)]){if(_0x4c5725(0x709)!==_0x4c5725(0x709)){this[_0x4c5725(0x55d)]=this[_0x4c5725(0x259)]()[_0x4c5725(0x5ae)];return;}else{ConfigManager[_0x4c5725(0xa4f)]!==0x0?(ConfigManager[_0x4c5725(0x9d9)]=0x0,ConfigManager['bgsVolume']=0x0,ConfigManager[_0x4c5725(0x488)]=0x0,ConfigManager[_0x4c5725(0xa4f)]=0x0):(ConfigManager[_0x4c5725(0x9d9)]=0x64,ConfigManager[_0x4c5725(0x6ff)]=0x64,ConfigManager[_0x4c5725(0x488)]=0x64,ConfigManager['seVolume']=0x64);ConfigManager[_0x4c5725(0x309)]();if(this[_0x4c5725(0x62e)][_0x4c5725(0x5ed)]===Scene_Options){if(this[_0x4c5725(0x62e)][_0x4c5725(0x82c)])this[_0x4c5725(0x62e)][_0x4c5725(0x82c)][_0x4c5725(0x7ae)]();if(this[_0x4c5725(0x62e)]['_listWindow'])this[_0x4c5725(0x62e)][_0x4c5725(0x6dd)][_0x4c5725(0x7ae)]();}}}},SceneManager[_0x1c6d52(0x255)]=function(){const _0x248d33=_0x1c6d52;$gameTemp['isPlaytest']()&&VisuMZ[_0x248d33(0x7b7)][_0x248d33(0x719)][_0x248d33(0x858)]['F7key']&&('CFHnQ'===_0x248d33(0x807)?this[_0x248d33(0x3db)](_0x248d33(0x66c)):$gameTemp[_0x248d33(0x9b5)]=!$gameTemp[_0x248d33(0x9b5)]);},SceneManager['playTestCtrlT']=function(){const _0x4da879=_0x1c6d52;if(!$gameTemp[_0x4da879(0x1c7)]())return;if(!SceneManager[_0x4da879(0x8cb)]())return;for(const _0x3ccd23 of $gameParty['members']()){if(!_0x3ccd23)continue;_0x3ccd23[_0x4da879(0x32a)](_0x3ccd23[_0x4da879(0x25f)]());}},SceneManager[_0x1c6d52(0x2b2)]=function(){const _0x592cf1=_0x1c6d52;this[_0x592cf1(0x5a3)]=![],this['_hideButtons']=!VisuMZ[_0x592cf1(0x7b7)][_0x592cf1(0x719)]['UI']['ShowButtons'];},SceneManager[_0x1c6d52(0x84b)]=function(_0x49bdac){const _0x1816e1=_0x1c6d52;if(VisuMZ['CoreEngine']['Settings']['UI'][_0x1816e1(0x1ed)]){if(_0x1816e1(0x9b9)!==_0x1816e1(0x9b9))return _0x41cf98(_0x59d1ac)[_0x1816e1(0x2f1)](_0x504e97,_0x1f9ca5)+'.';else this['_sideButtonLayout']=_0x49bdac;}},SceneManager[_0x1c6d52(0x9aa)]=function(){return this['_sideButtonLayout'];},SceneManager[_0x1c6d52(0x1d2)]=function(){const _0x2e8107=_0x1c6d52;return this[_0x2e8107(0x6ee)];},SceneManager[_0x1c6d52(0x931)]=function(){const _0x102fa6=_0x1c6d52;return this[_0x102fa6(0x1d2)]()||this[_0x102fa6(0x9aa)]();},VisuMZ['CoreEngine']['SceneManager_isGameActive']=SceneManager[_0x1c6d52(0x3c2)],SceneManager['isGameActive']=function(){const _0xc65cfb=_0x1c6d52;if(VisuMZ[_0xc65cfb(0x7b7)][_0xc65cfb(0x719)][_0xc65cfb(0x858)]['RequireFocus'])return _0xc65cfb(0x310)===_0xc65cfb(0x1e0)?0x0:VisuMZ[_0xc65cfb(0x7b7)]['SceneManager_isGameActive']['call'](this);else{if(_0xc65cfb(0x857)!==_0xc65cfb(0x266))return!![];else{const _0x3143ee=this[_0xc65cfb(0x3c5)];_0x3143ee['fillStyle']=this['outlineColor'],_0x3143ee[_0xc65cfb(0x904)](_0x4ddc35,_0x1ad72e+0x2,_0x59287e+0x2,_0xaaa746);}}},SceneManager[_0x1c6d52(0x26d)]=function(_0x46ba74){const _0x142111=_0x1c6d52;if(_0x46ba74 instanceof Error)'ZSHjC'===_0x142111(0x636)?_0x575b3d[_0x142111(0x902)]():this[_0x142111(0x7bb)](_0x46ba74);else{if(_0x46ba74 instanceof Array&&_0x46ba74[0x0]===_0x142111(0x913)){if(_0x142111(0x9f6)===_0x142111(0x9f6))this[_0x142111(0x25c)](_0x46ba74);else return this['_fauxAnimationQueue']['shift']();}else{if(_0x142111(0x3ba)!=='MZdNC')this['catchUnknownError'](_0x46ba74);else{const _0x555d71=_0x28b934[_0x142111(0x4d0)](_0x2fed59);_0x17f892[_0x142111(0x3c6)](_0x125148,!_0x555d71);}}}this[_0x142111(0x3eb)]();},VisuMZ[_0x1c6d52(0x7b7)]['BattleManager_processEscape']=BattleManager['processEscape'],BattleManager[_0x1c6d52(0x1d7)]=function(){const _0x51b068=_0x1c6d52;if(VisuMZ[_0x51b068(0x7b7)][_0x51b068(0x719)]['QoL'][_0x51b068(0x29a)]){if(_0x51b068(0x571)===_0x51b068(0x571))this[_0x51b068(0x1c0)]();else{if(_0xe776a1[_0x51b068(0x1c7)]()){const _0x4e65ff=_0x405be5[_0x51b068(0x7b7)][_0x51b068(0x719)][_0x51b068(0x858)][_0x51b068(0x869)];if(_0x4e65ff>0x0)_0x42ce58[_0x51b068(0x45d)](_0x4e65ff);}}}else{if(_0x51b068(0x335)==='OmFFG')return VisuMZ['CoreEngine']['BattleManager_processEscape']['call'](this);else this[_0x51b068(0x670)]=_0x5d8bf5[_0x51b068(0x7b7)][_0x51b068(0x719)]['QoL'][_0x51b068(0x9da)]??0x4,this['setupCustomRateCoreEngine'](),this[_0x51b068(0x670)]=this[_0x51b068(0x670)][_0x51b068(0xa23)](0x1,0xa);}},BattleManager[_0x1c6d52(0x1c0)]=function(){const _0x57072b=_0x1c6d52;return $gameParty[_0x57072b(0x881)](),SoundManager[_0x57072b(0x6aa)](),this[_0x57072b(0x91b)](),!![];},BattleManager[_0x1c6d52(0x468)]=function(){const _0x1e16e1=_0x1c6d52;return $gameSystem[_0x1e16e1(0x6b9)]()>=0x1;},BattleManager[_0x1c6d52(0x690)]=function(){const _0x5f3741=_0x1c6d52;return $gameSystem[_0x5f3741(0x6b9)]()===0x1;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0xa0f)]=Game_Temp['prototype'][_0x1c6d52(0x271)],Game_Temp[_0x1c6d52(0x721)][_0x1c6d52(0x271)]=function(){const _0x44c5a1=_0x1c6d52;VisuMZ['CoreEngine'][_0x44c5a1(0xa0f)][_0x44c5a1(0x78a)](this),this[_0x44c5a1(0x1d9)](),this[_0x44c5a1(0x67d)](),this[_0x44c5a1(0x9c7)]();},Game_Temp[_0x1c6d52(0x721)]['forceOutOfPlaytest']=function(){const _0x1c534b=_0x1c6d52;if(VisuMZ['CoreEngine'][_0x1c534b(0x719)]['QoL']['ForceNoPlayTest']){if('RHgSm'!==_0x1c534b(0x5b3)){var _0x5e2aa6=_0x1fbce9(_0x1bc9e9['$1'])/0x64;_0x2b4d15+=_0x5e2aa6;}else this[_0x1c534b(0x3b6)]=![];}},Game_Temp[_0x1c6d52(0x721)]['setLastPluginCommandInterpreter']=function(_0xa1ffa0){const _0x52b347=_0x1c6d52;this[_0x52b347(0x260)]=_0xa1ffa0;},Game_Temp['prototype']['getLastPluginCommandInterpreter']=function(){const _0x3c0664=_0x1c6d52;return this[_0x3c0664(0x260)];},Game_Temp[_0x1c6d52(0x721)][_0x1c6d52(0x24a)]=function(){const _0x32dca6=_0x1c6d52;this[_0x32dca6(0x286)]=undefined,this[_0x32dca6(0x3c1)]=undefined;},Game_Temp[_0x1c6d52(0x721)]['applyForcedGameTroopSettingsCoreEngine']=function(_0x117966){const _0x216e94=_0x1c6d52;$gameMap&&$dataMap&&$dataMap[_0x216e94(0x9a1)]&&this[_0x216e94(0x4d8)]($dataMap[_0x216e94(0x9a1)]);const _0x2bbc37=$dataTroops[_0x117966];if(_0x2bbc37){if(_0x216e94(0x98d)!=='QIslq'){let _0xd10eaf=DataManager[_0x216e94(0x4a1)](_0x2bbc37['id']);this[_0x216e94(0x4d8)](_0xd10eaf);}else this[_0x216e94(0x3c1)]=_0x216e94(0x538);}},Game_Temp[_0x1c6d52(0x721)]['parseForcedGameTroopSettingsCoreEngine']=function(_0x49367d){const _0x17a5f7=_0x1c6d52;if(!_0x49367d)return;if(_0x49367d[_0x17a5f7(0x91c)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i)){if('GQqhS'===_0x17a5f7(0x344))return this[_0x17a5f7(0x65e)](_0x24ea6b);else this[_0x17a5f7(0x286)]='FV';}else{if(_0x49367d[_0x17a5f7(0x91c)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x49367d['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2d072c=String(RegExp['$1']);if(_0x2d072c[_0x17a5f7(0x91c)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))_0x17a5f7(0xa0e)!==_0x17a5f7(0xa0e)?_0x3cb786+=_0x40616f+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x17a5f7(0x649)](_0x5786d9,_0x3b8e17[_0x17a5f7(0x4fb)]||_0x17a5f7(0x860))+_0x357992:this[_0x17a5f7(0x286)]='FV';else{if(_0x2d072c[_0x17a5f7(0x91c)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)){if(_0x17a5f7(0x4fd)!==_0x17a5f7(0x4fd)){const _0x4313c2=_0x34e4b0[_0x17a5f7(0x7b7)]['CustomParamAbb'][_0x13059d],_0x3a98a6=this[_0x4313c2];return _0x4ca535[_0x17a5f7(0x7b7)][_0x17a5f7(0x1ba)][_0x36b5e4]===_0x17a5f7(0x3d4)?_0x3a98a6:_0x3b52da?_0x491d53(_0x3f5c70['round'](_0x3a98a6*0x64))+'%':_0x3a98a6;}else this['_forcedTroopView']='SV';}}}}}if(_0x49367d['match'](/<(?:DTB)>/i))this[_0x17a5f7(0x3c1)]=0x0;else{if(_0x49367d[_0x17a5f7(0x91c)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x17a5f7(0x3c1)]=0x1;else{if(_0x49367d[_0x17a5f7(0x91c)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x17a5f7(0x3c1)]=0x2;else{if(_0x49367d[_0x17a5f7(0x91c)](/<(?:CTB)>/i))Imported[_0x17a5f7(0x409)]&&(this['_forcedBattleSys']=_0x17a5f7(0x64e));else{if(_0x49367d[_0x17a5f7(0x91c)](/<(?:STB)>/i)){if(Imported[_0x17a5f7(0x8ec)]){if(_0x17a5f7(0x90d)==='wwEug')this[_0x17a5f7(0x3c1)]=_0x17a5f7(0x3ff);else{if(!this[_0x17a5f7(0x798)]())return;this['refresh']();}}}else{if(_0x49367d['match'](/<(?:BTB)>/i)){if(_0x17a5f7(0x5f2)!=='evduZ'){if(Imported[_0x17a5f7(0x203)]){if(_0x17a5f7(0x524)!==_0x17a5f7(0x7f1))this[_0x17a5f7(0x3c1)]=_0x17a5f7(0x99d);else{const _0x58e6ae=_0x4d8f84(this['constructor'][_0x17a5f7(0x4fb)]),_0x44f925=this['getCustomBackgroundSettings'](_0x58e6ae);_0x44f925&&(_0x44f925[_0x17a5f7(0x356)]!==''||_0x44f925[_0x17a5f7(0x49b)]!=='')&&(this[_0x17a5f7(0x979)]=new _0x1cf15b(_0x43610a[_0x17a5f7(0x95e)](_0x44f925[_0x17a5f7(0x356)])),this[_0x17a5f7(0x583)]=new _0x1405fe(_0x43b56d[_0x17a5f7(0x316)](_0x44f925[_0x17a5f7(0x49b)])),this[_0x17a5f7(0x81b)](this[_0x17a5f7(0x979)]),this['addChild'](this[_0x17a5f7(0x583)]),this[_0x17a5f7(0x979)][_0x17a5f7(0x33a)][_0x17a5f7(0x215)](this[_0x17a5f7(0x42b)][_0x17a5f7(0x2fe)](this,this[_0x17a5f7(0x979)])),this[_0x17a5f7(0x583)][_0x17a5f7(0x33a)][_0x17a5f7(0x215)](this[_0x17a5f7(0x42b)][_0x17a5f7(0x2fe)](this,this[_0x17a5f7(0x583)])));}}}else this[_0x17a5f7(0x9c4)]();}else{if(_0x49367d[_0x17a5f7(0x91c)](/<(?:FTB)>/i))_0x17a5f7(0x23c)!==_0x17a5f7(0x5ab)?Imported[_0x17a5f7(0x359)]&&(this[_0x17a5f7(0x3c1)]='FTB'):this[_0x17a5f7(0x4a8)]();else{if(_0x49367d[_0x17a5f7(0x91c)](/<(?:OTB)>/i))Imported[_0x17a5f7(0x2e2)]&&(this['_forcedBattleSys']=_0x17a5f7(0x6f3));else{if(_0x49367d[_0x17a5f7(0x91c)](/<(?:ETB)>/i))Imported[_0x17a5f7(0x290)]&&(this[_0x17a5f7(0x3c1)]=_0x17a5f7(0x7fe));else{if(_0x49367d[_0x17a5f7(0x91c)](/<(?:PTB)>/i)){if('jMmMO'==='ljVwI')return this['subject']()[_0x17a5f7(0x442)]+0.05;else{if(Imported['VisuMZ_2_BattleSystemPTB']){if(_0x17a5f7(0x1c6)===_0x17a5f7(0x216)){const _0x6add9e=_0x17a5f7(0x5f4);this[_0x17a5f7(0x7e4)]=this[_0x17a5f7(0x7e4)]||{};if(this[_0x17a5f7(0x7e4)][_0x6add9e])return this[_0x17a5f7(0x7e4)][_0x6add9e];const _0x1b0fb6=_0x2c090c[_0x17a5f7(0x7b7)][_0x17a5f7(0x719)]['Color']['ColorMPCost'];return this['getColorDataFromPluginParameters'](_0x6add9e,_0x1b0fb6);}else this[_0x17a5f7(0x3c1)]=_0x17a5f7(0x8db);}}}else{if(_0x49367d[_0x17a5f7(0x91c)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x358e6c=String(RegExp['$1']);if(_0x358e6c[_0x17a5f7(0x91c)](/DTB/i))this[_0x17a5f7(0x3c1)]=0x0;else{if(_0x358e6c[_0x17a5f7(0x91c)](/(?:TPB|ATB)[ ]ACTIVE/i))_0x17a5f7(0x56a)!==_0x17a5f7(0x56a)?this[_0x17a5f7(0x40f)][_0x17a5f7(0x87c)](_0x171c31['layoutSettings'][_0x17a5f7(0x362)]):this[_0x17a5f7(0x3c1)]=0x1;else{if(_0x358e6c['match'](/(?:TPB|ATB)[ ]WAIT/i))_0x17a5f7(0x8a2)==='LAOPV'?(!this[_0x17a5f7(0x2e8)]&&(this[_0x17a5f7(0xa3c)]+=_0xb6e9dc['round']((_0x461199[_0x17a5f7(0x81f)]-0x270)/0x2),this[_0x17a5f7(0xa3c)]-=_0x1063e1['floor']((_0x5888c8[_0x17a5f7(0x81f)]-_0x3936c0[_0x17a5f7(0x471)])/0x2),_0x437a36['isSideView']()?this[_0x17a5f7(0x981)]-=_0x1fbe34[_0x17a5f7(0x403)]((_0x49455e[_0x17a5f7(0x552)]-_0x21d00a[_0x17a5f7(0x7ec)])/0x2):this[_0x17a5f7(0x981)]+=_0xeab53d[_0x17a5f7(0x5c2)]((_0x1defde['boxWidth']-0x330)/0x2)),this[_0x17a5f7(0x2e8)]=!![]):this[_0x17a5f7(0x3c1)]=0x2;else{if(_0x358e6c['match'](/CTB/i))Imported[_0x17a5f7(0x409)]&&(this[_0x17a5f7(0x3c1)]=_0x17a5f7(0x64e));else{if(_0x358e6c['match'](/STB/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x17a5f7(0x3c1)]=_0x17a5f7(0x3ff));else{if(_0x358e6c['match'](/BTB/i))Imported[_0x17a5f7(0x203)]&&(this[_0x17a5f7(0x3c1)]=_0x17a5f7(0x99d));else{if(_0x358e6c['match'](/FTB/i))Imported[_0x17a5f7(0x359)]&&('bYRZq'==='bYRZq'?this[_0x17a5f7(0x3c1)]=_0x17a5f7(0x538):(this[_0x17a5f7(0x7c1)](_0x22c3e2,_0x5571c8+0x2,_0x42dd03+0x2),_0x2596f6-=_0x3c6880[_0x17a5f7(0x5c9)]+0x4,_0x3c540e+=_0x27cfcd[_0x17a5f7(0x5c9)]+0x4));else{if(_0x358e6c[_0x17a5f7(0x91c)](/OTB/i))Imported[_0x17a5f7(0x2e2)]&&(_0x17a5f7(0x5d9)===_0x17a5f7(0x2cd)?_0x206478=this[_0x17a5f7(0x24d)]():this[_0x17a5f7(0x3c1)]=_0x17a5f7(0x6f3));else{if(_0x358e6c['match'](/ETB/i))Imported[_0x17a5f7(0x290)]&&('fHXyR'!==_0x17a5f7(0x642)?this['_forcedBattleSys']='ETB':_0x1f1df4['note'][_0x17a5f7(0x91c)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x3712bf[_0x17a5f7(0x202)]=_0x382c13[_0x17a5f7(0x269)](_0x325a79(_0x56e1bf['$1']),0x1)));else _0x358e6c[_0x17a5f7(0x91c)](/PTB/i)&&(Imported[_0x17a5f7(0x98f)]&&(this[_0x17a5f7(0x3c1)]=_0x17a5f7(0x8db)));}}}}}}}}}}}}}}}}}}}},Game_Temp['prototype'][_0x1c6d52(0x67d)]=function(){const _0x55e234=_0x1c6d52;this[_0x55e234(0x8b2)]=[];},Game_Temp['prototype'][_0x1c6d52(0x86a)]=function(_0x561b87,_0xbdba3f,_0x83c92f,_0x1fc2a9){const _0x41dc38=_0x1c6d52;if(!this[_0x41dc38(0x888)]())return;_0x83c92f=_0x83c92f||![],_0x1fc2a9=_0x1fc2a9||![];if($dataAnimations[_0xbdba3f]){if(_0x41dc38(0x52e)===_0x41dc38(0x52e)){const _0x58b120={'targets':_0x561b87,'animationId':_0xbdba3f,'mirror':_0x83c92f,'mute':_0x1fc2a9};this[_0x41dc38(0x8b2)]['push'](_0x58b120);for(const _0x4e013d of _0x561b87){if(_0x41dc38(0x8c9)===_0x41dc38(0x2e7))return _0x41dc38(0x99d);else{if(_0x4e013d[_0x41dc38(0x27d)]){if(_0x41dc38(0x547)===_0x41dc38(0x9de)){if(_0x24a770)_0x36e504[_0x41dc38(0x6c4)](_0x10aa5a);}else _0x4e013d[_0x41dc38(0x27d)]();}}}}else _0x14d4ae[_0x41dc38(0x721)][_0x41dc38(0xa50)]['call'](this),this['updateData']();}},Game_Temp[_0x1c6d52(0x721)][_0x1c6d52(0x888)]=function(){return!![];},Game_Temp['prototype']['retrieveFauxAnimation']=function(){const _0x45f56c=_0x1c6d52;return this[_0x45f56c(0x8b2)][_0x45f56c(0x2fc)]();},Game_Temp[_0x1c6d52(0x721)][_0x1c6d52(0x9c7)]=function(){const _0x2ec7e7=_0x1c6d52;this[_0x2ec7e7(0x844)]=[];},Game_Temp['prototype']['requestPointAnimation']=function(_0xc1ba99,_0x2b0361,_0x409687,_0x4d072c,_0x2ca14b){const _0x47628c=_0x1c6d52;if(!this[_0x47628c(0x519)]())return;_0x4d072c=_0x4d072c||![],_0x2ca14b=_0x2ca14b||![];if($dataAnimations[_0x409687]){const _0x282255={'x':_0xc1ba99,'y':_0x2b0361,'animationId':_0x409687,'mirror':_0x4d072c,'mute':_0x2ca14b};this['_pointAnimationQueue']['push'](_0x282255);}},Game_Temp[_0x1c6d52(0x721)]['showPointAnimations']=function(){return!![];},Game_Temp[_0x1c6d52(0x721)][_0x1c6d52(0x26c)]=function(){return this['_pointAnimationQueue']['shift']();},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0xa19)]=Game_System[_0x1c6d52(0x721)][_0x1c6d52(0x271)],Game_System[_0x1c6d52(0x721)][_0x1c6d52(0x271)]=function(){const _0x125fba=_0x1c6d52;VisuMZ['CoreEngine'][_0x125fba(0xa19)]['call'](this),this['initCoreEngine']();},Game_System[_0x1c6d52(0x721)][_0x1c6d52(0x2a3)]=function(){const _0x446f40=_0x1c6d52;this[_0x446f40(0x851)]={'SideView':$dataSystem[_0x446f40(0x744)],'BattleSystem':this[_0x446f40(0x2e3)](),'FontSize':$dataSystem[_0x446f40(0x7c8)][_0x446f40(0x35f)],'Padding':0xc};},Game_System[_0x1c6d52(0x721)][_0x1c6d52(0x86d)]=function(){const _0x115276=_0x1c6d52;if($gameTemp[_0x115276(0x286)]==='SV')return!![];else{if($gameTemp[_0x115276(0x286)]==='FV'){if(_0x115276(0x9e8)===_0x115276(0x9e8))return![];else _0x32f987['VisuMZ_2_BattleSystemBTB']&&(this[_0x115276(0x3c1)]=_0x115276(0x99d));}}if(this[_0x115276(0x851)]===undefined)this[_0x115276(0x2a3)]();if(this[_0x115276(0x851)][_0x115276(0x418)]===undefined)this[_0x115276(0x2a3)]();return this[_0x115276(0x851)][_0x115276(0x418)];},Game_System[_0x1c6d52(0x721)][_0x1c6d52(0x33b)]=function(_0x407247){const _0x57983c=_0x1c6d52;if(this['_CoreEngineSettings']===undefined)this[_0x57983c(0x2a3)]();if(this[_0x57983c(0x851)][_0x57983c(0x418)]===undefined)this[_0x57983c(0x2a3)]();this[_0x57983c(0x851)][_0x57983c(0x418)]=_0x407247;},Game_System[_0x1c6d52(0x721)][_0x1c6d52(0x401)]=function(){const _0x531b3=_0x1c6d52;if(this[_0x531b3(0x851)]===undefined)this['initCoreEngine']();this[_0x531b3(0x851)][_0x531b3(0x20a)]=this[_0x531b3(0x2e3)]();},Game_System[_0x1c6d52(0x721)][_0x1c6d52(0x2e3)]=function(){const _0x2b5ea4=_0x1c6d52,_0x177236=(VisuMZ[_0x2b5ea4(0x7b7)][_0x2b5ea4(0x719)][_0x2b5ea4(0x20a)]||'DATABASE')[_0x2b5ea4(0x5dd)]()['trim']();return VisuMZ[_0x2b5ea4(0x7b7)]['CreateBattleSystemID'](_0x177236);},Game_System['prototype'][_0x1c6d52(0x6b9)]=function(){const _0x527928=_0x1c6d52;if($gameTemp[_0x527928(0x3c1)]!==undefined){if(_0x527928(0x383)!==_0x527928(0x32b))return $gameTemp[_0x527928(0x3c1)];else{const _0x5e47f2='_stored_mpGaugeColor1';this[_0x527928(0x7e4)]=this['_colorCache']||{};if(this[_0x527928(0x7e4)][_0x5e47f2])return this[_0x527928(0x7e4)][_0x5e47f2];const _0x2d9307=_0x2ca159[_0x527928(0x7b7)][_0x527928(0x719)][_0x527928(0x2bf)][_0x527928(0x5b1)];return this[_0x527928(0x493)](_0x5e47f2,_0x2d9307);}}if(this[_0x527928(0x851)]===undefined)this['initCoreEngine']();if(this[_0x527928(0x851)]['BattleSystem']===undefined)this[_0x527928(0x401)]();return this[_0x527928(0x851)][_0x527928(0x20a)];},Game_System[_0x1c6d52(0x721)][_0x1c6d52(0x7b0)]=function(_0x280e08){const _0x26821d=_0x1c6d52;if(this[_0x26821d(0x851)]===undefined)this['initCoreEngine']();if(this[_0x26821d(0x851)][_0x26821d(0x20a)]===undefined)this[_0x26821d(0x401)]();this['_CoreEngineSettings']['BattleSystem']=_0x280e08;},Game_System[_0x1c6d52(0x721)][_0x1c6d52(0x404)]=function(){const _0x4f43ba=_0x1c6d52;if(this['_CoreEngineSettings']===undefined)this[_0x4f43ba(0x2a3)]();if(this['_CoreEngineSettings'][_0x4f43ba(0x5a8)]===undefined)this[_0x4f43ba(0x2a3)]();return this[_0x4f43ba(0x851)][_0x4f43ba(0x5a8)];},Game_System[_0x1c6d52(0x721)][_0x1c6d52(0x723)]=function(_0x1edfdb){const _0x3b776c=_0x1c6d52;if(this[_0x3b776c(0x851)]===undefined)this[_0x3b776c(0x2a3)]();if(this[_0x3b776c(0x851)]['TimeProgress']===undefined)this[_0x3b776c(0x2a3)]();this[_0x3b776c(0x851)][_0x3b776c(0x5a8)]=_0x1edfdb;},Game_System[_0x1c6d52(0x721)]['windowPadding']=function(){const _0x39d6d3=_0x1c6d52;if(this['_CoreEngineSettings']===undefined)this[_0x39d6d3(0x2a3)]();if(this['_CoreEngineSettings'][_0x39d6d3(0x20c)]===undefined)this['initCoreEngine']();return this[_0x39d6d3(0x851)][_0x39d6d3(0x20c)];},Game_System[_0x1c6d52(0x721)][_0x1c6d52(0x2da)]=function(_0x246998){const _0x3d4a71=_0x1c6d52;if(this[_0x3d4a71(0x851)]===undefined)this[_0x3d4a71(0x2a3)]();if(this[_0x3d4a71(0x851)]['TimeProgress']===undefined)this['initCoreEngine']();this[_0x3d4a71(0x851)]['Padding']=_0x246998;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x32f)]=Game_Screen['prototype'][_0x1c6d52(0x271)],Game_Screen[_0x1c6d52(0x721)][_0x1c6d52(0x271)]=function(){const _0x16b02f=_0x1c6d52;VisuMZ[_0x16b02f(0x7b7)][_0x16b02f(0x32f)][_0x16b02f(0x78a)](this),this[_0x16b02f(0x49d)]();},Game_Screen['prototype'][_0x1c6d52(0x49d)]=function(){const _0x1f1702=_0x1c6d52,_0x5a285b=VisuMZ[_0x1f1702(0x7b7)]['Settings']['ScreenShake'];this[_0x1f1702(0x550)]=_0x5a285b?.[_0x1f1702(0x98b)]||'random';},Game_Screen[_0x1c6d52(0x721)][_0x1c6d52(0x2ca)]=function(){const _0x3acd7b=_0x1c6d52;if(this[_0x3acd7b(0x550)]===undefined)this[_0x3acd7b(0x49d)]();return this['_coreEngineShakeStyle'];},Game_Screen[_0x1c6d52(0x721)][_0x1c6d52(0x1b8)]=function(_0x588577){const _0x57fd12=_0x1c6d52;if(this[_0x57fd12(0x550)]===undefined)this[_0x57fd12(0x49d)]();this['_coreEngineShakeStyle']=_0x588577['toLowerCase']()[_0x57fd12(0x40e)]();},Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x7ac)]=function(){const _0x44d22c=_0x1c6d52;if($gameParty[_0x44d22c(0x4f8)]())return![];return this[_0x44d22c(0x4fb)]()&&this[_0x44d22c(0x4fb)]()[_0x44d22c(0xa05)](0x0)==='!';},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x8b3)]=Game_Picture[_0x1c6d52(0x721)]['x'],Game_Picture[_0x1c6d52(0x721)]['x']=function(){const _0x4ed353=_0x1c6d52;return this[_0x4ed353(0x7ac)]()?this[_0x4ed353(0xa01)]():VisuMZ[_0x4ed353(0x7b7)][_0x4ed353(0x8b3)][_0x4ed353(0x78a)](this);},Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0xa01)]=function(){const _0x2b1dcc=_0x1c6d52,_0x7d166c=$gameMap[_0x2b1dcc(0x641)]()*$gameMap[_0x2b1dcc(0x838)]();return(this['_x']-_0x7d166c)*$gameScreen['zoomScale']();},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0xa45)]=Game_Picture[_0x1c6d52(0x721)]['y'],Game_Picture[_0x1c6d52(0x721)]['y']=function(){const _0x29189c=_0x1c6d52;if(this[_0x29189c(0x7ac)]()){if(_0x29189c(0x92b)!==_0x29189c(0x225))return this['yScrollLinkedOffset']();else{if(this['_hideTileShadows']===_0x5cba39)this[_0x29189c(0x910)]();return this[_0x29189c(0x534)];}}else return VisuMZ[_0x29189c(0x7b7)]['Game_Picture_y'][_0x29189c(0x78a)](this);},Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x48b)]=function(){const _0x38fc3f=_0x1c6d52,_0x9bb5bf=$gameMap[_0x38fc3f(0x5ae)]()*$gameMap[_0x38fc3f(0x677)]();return(this['_y']-_0x9bb5bf)*$gameScreen[_0x38fc3f(0x212)]();},VisuMZ[_0x1c6d52(0x7b7)]['Game_Picture_scaleX']=Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x3f6)],Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x3f6)]=function(){const _0x1be3f2=_0x1c6d52;let _0x328fa3=VisuMZ[_0x1be3f2(0x7b7)][_0x1be3f2(0x51c)]['call'](this);if(this[_0x1be3f2(0x7ac)]()){if(_0x1be3f2(0x96f)===_0x1be3f2(0x700)){const _0x11b4e7=_0x1be3f2(0x952);this[_0x1be3f2(0x7e4)]=this[_0x1be3f2(0x7e4)]||{};if(this['_colorCache'][_0x11b4e7])return this[_0x1be3f2(0x7e4)][_0x11b4e7];const _0x1f5169=_0x12911a[_0x1be3f2(0x7b7)][_0x1be3f2(0x719)][_0x1be3f2(0x2bf)]['ColorNormal'];return this[_0x1be3f2(0x493)](_0x11b4e7,_0x1f5169);}else _0x328fa3*=$gameScreen[_0x1be3f2(0x212)]();}return _0x328fa3;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x502)]=Game_Picture['prototype']['scaleY'],Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x7cb)]=function(){const _0x22cf26=_0x1c6d52;let _0x5dc5cc=VisuMZ[_0x22cf26(0x7b7)][_0x22cf26(0x502)]['call'](this);return this[_0x22cf26(0x7ac)]()&&(_0x22cf26(0x4ab)===_0x22cf26(0x1dc)?_0x514fec=_0x1e9367[_0x22cf26(0x279)](_0x54bbee):_0x5dc5cc*=$gameScreen[_0x22cf26(0x212)]()),_0x5dc5cc;},Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x824)]=function(_0x51827b){const _0x11d82e=_0x1c6d52;this[_0x11d82e(0x1bd)]=_0x51827b;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x548)]=Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x32e)],Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x32e)]=function(_0x38c65d){const _0x1a98e2=_0x1c6d52;this['_coreEasingType']=this[_0x1a98e2(0x1bd)]||0x0;if([0x0,0x1,0x2,0x3][_0x1a98e2(0xa04)](this[_0x1a98e2(0x1bd)])){if(_0x1a98e2(0x29e)!=='PXzje')return VisuMZ[_0x1a98e2(0x7b7)][_0x1a98e2(0x548)]['call'](this,_0x38c65d);else _0x3be2eb[_0x1a98e2(0x302)](_0x389d3b);}else return VisuMZ[_0x1a98e2(0x59f)](_0x38c65d,this[_0x1a98e2(0x1bd)]);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x871)]=Game_Action[_0x1c6d52(0x721)][_0x1c6d52(0x97b)],Game_Action[_0x1c6d52(0x721)]['itemHit']=function(_0x2542a0){const _0x48871f=_0x1c6d52;return VisuMZ[_0x48871f(0x7b7)][_0x48871f(0x719)][_0x48871f(0x858)][_0x48871f(0x456)]?this['itemHitImprovedAccuracy'](_0x2542a0):VisuMZ[_0x48871f(0x7b7)]['Game_Action_itemHit'][_0x48871f(0x78a)](this,_0x2542a0);},Game_Action['prototype'][_0x1c6d52(0x986)]=function(_0x5203cb){const _0x303525=_0x1c6d52,_0x4deca7=this[_0x303525(0x786)](_0x5203cb),_0x46e4d4=this[_0x303525(0x3ac)](_0x5203cb),_0x53a681=this[_0x303525(0x903)](_0x5203cb);return _0x4deca7*(_0x46e4d4-_0x53a681);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x2a1)]=Game_Action[_0x1c6d52(0x721)][_0x1c6d52(0x3a7)],Game_Action[_0x1c6d52(0x721)]['itemEva']=function(_0x3a554c){const _0x807b7b=_0x1c6d52;return VisuMZ[_0x807b7b(0x7b7)][_0x807b7b(0x719)]['QoL'][_0x807b7b(0x456)]?0x0:VisuMZ[_0x807b7b(0x7b7)][_0x807b7b(0x2a1)][_0x807b7b(0x78a)](this,_0x3a554c);},Game_Action[_0x1c6d52(0x721)][_0x1c6d52(0x786)]=function(_0x45fb35){const _0x10ed21=_0x1c6d52;return this[_0x10ed21(0x5b7)]()[_0x10ed21(0x4cd)]*0.01;},Game_Action[_0x1c6d52(0x721)][_0x1c6d52(0x3ac)]=function(_0xc426d9){const _0x2717e6=_0x1c6d52;if(VisuMZ[_0x2717e6(0x7b7)][_0x2717e6(0x719)][_0x2717e6(0x858)][_0x2717e6(0x8d1)]&&this['isItem']())return 0x1;return this[_0x2717e6(0x28d)]()?VisuMZ[_0x2717e6(0x7b7)]['Settings'][_0x2717e6(0x858)][_0x2717e6(0x8d1)]&&this['subject']()[_0x2717e6(0x5c8)]()?this['subject']()[_0x2717e6(0x442)]+0.05:_0x2717e6(0x6ed)!==_0x2717e6(0x6ed)?_0x43c1fa[_0x2717e6(0x62e)]['isWindowMaskingEnabled']():this[_0x2717e6(0x6de)]()[_0x2717e6(0x442)]:0x1;},Game_Action[_0x1c6d52(0x721)][_0x1c6d52(0x903)]=function(_0x259438){const _0x227c38=_0x1c6d52;if(this[_0x227c38(0x6de)]()[_0x227c38(0x5c8)]()===_0x259438[_0x227c38(0x5c8)]())return 0x0;if(this[_0x227c38(0x28d)]()){if(_0x227c38(0x22d)!=='YxDxK'){if(VisuMZ[_0x227c38(0x7b7)]['Settings'][_0x227c38(0x858)][_0x227c38(0x8d1)]&&_0x259438[_0x227c38(0x558)]()){if(_0x227c38(0x6e6)!==_0x227c38(0x837))return _0x259438[_0x227c38(0x4ec)]-0.05;else this['backOpacity']=_0x5853a8['CoreEngine']['Settings'][_0x227c38(0x5a1)][_0x227c38(0x578)];}else{if(_0x227c38(0x63f)!==_0x227c38(0x4ea))return _0x259438[_0x227c38(0x4ec)];else{if(_0x3bfdfc[_0x227c38(0x7b7)][_0x227c38(0x719)]['UI'][_0x227c38(0x1ed)]){const _0xcf616d=_0x26d9cd[_0x227c38(0x552)]-_0x4e1aee['boxWidth']-_0x12b237[_0x227c38(0x7b7)][_0x227c38(0x719)]['UI'][_0x227c38(0x81c)]*0x2,_0x4879a6=_0x320c46['prototype']['blockWidth'][_0x227c38(0x78a)](this)*0x4;if(_0xcf616d>=_0x4879a6)_0x369c91[_0x227c38(0x84b)](!![]);}}}}else for(const _0x2b2496 of _0x5b7696){if(_0x2b2496&&_0x2b2496[_0x227c38(0x26f)]){if(this[_0x227c38(0x332)](_0x2b2496))return!![];if(this['isGamepadAxisMoved'](_0x2b2496))return!![];}}}else return this[_0x227c38(0x5bb)]()?_0x259438[_0x227c38(0x49f)]:0x0;},VisuMZ['CoreEngine'][_0x1c6d52(0x6ea)]=Game_Action['prototype'][_0x1c6d52(0x808)],Game_Action['prototype'][_0x1c6d52(0x808)]=function(_0x3a7c5a){const _0x1bac56=_0x1c6d52;VisuMZ[_0x1bac56(0x7b7)][_0x1bac56(0x6ea)]['call'](this,_0x3a7c5a);if(VisuMZ[_0x1bac56(0x7b7)][_0x1bac56(0x719)][_0x1bac56(0x858)][_0x1bac56(0x456)])return;const _0x462311=_0x3a7c5a['result']();if(_0x462311[_0x1bac56(0x483)]){if(0x1-this['itemEva'](_0x3a7c5a)>this[_0x1bac56(0x97b)](_0x3a7c5a)){if(_0x1bac56(0x58b)!=='qaTmH'){const _0x1e0f0d=(_0x40dd5a[_0x1bac56(0x6ec)]||'')[_0x1bac56(0x4ee)]()[_0x1bac56(0x40e)](),_0x66b03c=(_0x5035fd[_0x1bac56(0x4f3)]||'')['toLowerCase']()[_0x1bac56(0x40e)]();_0x27cf43[_0x1bac56(0x7b7)][_0x1bac56(0x8fb)][_0x1e0f0d]=_0x5c6793,_0x50d79d['CoreEngine'][_0x1bac56(0x83d)][_0x66b03c]=_0x1e0f0d;}else _0x462311[_0x1bac56(0x483)]=![],_0x462311[_0x1bac56(0x791)]=!![];}}},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x70e)]=Game_BattlerBase[_0x1c6d52(0x721)][_0x1c6d52(0x1af)],Game_BattlerBase['prototype'][_0x1c6d52(0x1af)]=function(){const _0x590e31=_0x1c6d52;this[_0x590e31(0x2c5)]={},VisuMZ[_0x590e31(0x7b7)][_0x590e31(0x70e)]['call'](this);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x69e)]=Game_BattlerBase['prototype'][_0x1c6d52(0x7ae)],Game_BattlerBase[_0x1c6d52(0x721)][_0x1c6d52(0x7ae)]=function(){const _0x503f31=_0x1c6d52;this[_0x503f31(0x2c5)]={},VisuMZ[_0x503f31(0x7b7)][_0x503f31(0x69e)][_0x503f31(0x78a)](this);},Game_BattlerBase[_0x1c6d52(0x721)]['checkCacheKey']=function(_0x256073){const _0x8e3b3b=_0x1c6d52;return this[_0x8e3b3b(0x2c5)]=this[_0x8e3b3b(0x2c5)]||{},this['_cache'][_0x256073]!==undefined;},Game_BattlerBase[_0x1c6d52(0x721)][_0x1c6d52(0x528)]=function(_0x193425){const _0x1ae4f2=_0x1c6d52,_0x224076=(_0x40f213,_0x280323)=>{const _0x297779=_0x324f;if(!_0x280323)return _0x40f213;if(_0x280323[_0x297779(0x9a1)]['match'](VisuMZ[_0x297779(0x7b7)][_0x297779(0x3a6)][_0x297779(0x528)][_0x193425])){var _0x2bdd49=Number(RegExp['$1']);_0x40f213+=_0x2bdd49;}if(_0x280323[_0x297779(0x9a1)]['match'](VisuMZ[_0x297779(0x7b7)][_0x297779(0x3a6)]['paramPlusJS'][_0x193425])){if('bIHkS'!==_0x297779(0x24e))return _0x4cf852[_0x297779(0x7b7)][_0x297779(0x56b)][_0x296a75]||0x0;else{var _0x15052a=String(RegExp['$1']);try{_0x40f213+=eval(_0x15052a);}catch(_0x44d4b6){if($gameTemp[_0x297779(0x1c7)]())console['log'](_0x44d4b6);}}}return _0x40f213;};return this[_0x1ae4f2(0x95d)]()[_0x1ae4f2(0x88c)](_0x224076,this[_0x1ae4f2(0x8de)][_0x193425]);},Game_BattlerBase[_0x1c6d52(0x721)]['paramMax']=function(_0x34c183){const _0x2b11da=_0x1c6d52;var _0x102cf2=_0x2b11da(0x71f)+(this['isActor']()?_0x2b11da(0x2be):'Enemy')+_0x2b11da(0xa3d)+_0x34c183;if(this[_0x2b11da(0x378)](_0x102cf2))return this[_0x2b11da(0x2c5)][_0x102cf2];this[_0x2b11da(0x2c5)][_0x102cf2]=eval(VisuMZ[_0x2b11da(0x7b7)][_0x2b11da(0x719)]['Param'][_0x102cf2]);const _0x3efd57=(_0xccbb83,_0x2acd0b)=>{const _0x40621a=_0x2b11da;if(!_0x2acd0b)return _0xccbb83;if(_0x2acd0b[_0x40621a(0x9a1)]['match'](VisuMZ[_0x40621a(0x7b7)][_0x40621a(0x3a6)][_0x40621a(0x324)][_0x34c183])){if(_0x40621a(0x5f1)===_0x40621a(0x5f1)){var _0x51f1e5=Number(RegExp['$1']);if(_0x51f1e5===0x0)_0x51f1e5=Number[_0x40621a(0x354)];_0xccbb83=Math[_0x40621a(0x269)](_0xccbb83,_0x51f1e5);}else{const _0x52f0d3=_0x40621a(0x767);this[_0x40621a(0x7e4)]=this[_0x40621a(0x7e4)]||{};if(this[_0x40621a(0x7e4)][_0x52f0d3])return this['_colorCache'][_0x52f0d3];const _0x51ae99=_0x1e8540['CoreEngine'][_0x40621a(0x719)][_0x40621a(0x2bf)]['ColorHPGauge1'];return this[_0x40621a(0x493)](_0x52f0d3,_0x51ae99);}}if(_0x2acd0b[_0x40621a(0x9a1)][_0x40621a(0x91c)](VisuMZ['CoreEngine'][_0x40621a(0x3a6)][_0x40621a(0x8c8)][_0x34c183])){if(_0x40621a(0x3a1)===_0x40621a(0x3a1)){var _0x2df494=String(RegExp['$1']);try{'zcQga'===_0x40621a(0x8dd)?_0xccbb83=Math['max'](_0xccbb83,Number(eval(_0x2df494))):this[_0x40621a(0x271)](...arguments);}catch(_0x50e559){if($gameTemp[_0x40621a(0x1c7)]())console['log'](_0x50e559);}}else{var _0x3baf5a=_0x7cec6c(_0x341194['$1']);try{_0x4d5aae*=_0x378207(_0x3baf5a);}catch(_0x53de9a){if(_0x3b2c57[_0x40621a(0x1c7)]())_0x35f48e[_0x40621a(0x321)](_0x53de9a);}}}return _0xccbb83;};if(this[_0x2b11da(0x2c5)][_0x102cf2]===0x0)this[_0x2b11da(0x2c5)][_0x102cf2]=Number[_0x2b11da(0x354)];return this['_cache'][_0x102cf2]=this[_0x2b11da(0x95d)]()[_0x2b11da(0x88c)](_0x3efd57,this['_cache'][_0x102cf2]),this[_0x2b11da(0x2c5)][_0x102cf2];},Game_BattlerBase[_0x1c6d52(0x721)][_0x1c6d52(0x918)]=function(_0x525b66){const _0x18b006=_0x1c6d52,_0x3ee721=this[_0x18b006(0x1b7)](Game_BattlerBase[_0x18b006(0x8b7)],_0x525b66),_0x5eca8d=(_0x207c54,_0x250516)=>{const _0x3a251d=_0x18b006;if(!_0x250516)return _0x207c54;if(_0x250516[_0x3a251d(0x9a1)]['match'](VisuMZ['CoreEngine']['RegExp']['paramRate1'][_0x525b66])){if(_0x3a251d(0x29b)===_0x3a251d(0x29b)){var _0x10fa66=Number(RegExp['$1'])/0x64;_0x207c54*=_0x10fa66;}else{if(_0x172148[_0x3a251d(0x4f8)]())return;_0x44fea2['ConvertParams'](_0x3d0bb0,_0x11721b);const _0x128295=_0xa3f2c2[_0x3a251d(0x452)][_0x3a251d(0x5dd)]()[_0x3a251d(0x40e)](),_0x5e4f1a=_0x52f7bf[_0x3a251d(0x7b7)][_0x3a251d(0xa3b)](_0x128295);_0x52b4b6[_0x3a251d(0x7b0)](_0x5e4f1a);}}if(_0x250516[_0x3a251d(0x9a1)][_0x3a251d(0x91c)](VisuMZ[_0x3a251d(0x7b7)][_0x3a251d(0x3a6)][_0x3a251d(0x36c)][_0x525b66])){var _0x10fa66=Number(RegExp['$1']);_0x207c54*=_0x10fa66;}if(_0x250516[_0x3a251d(0x9a1)][_0x3a251d(0x91c)](VisuMZ['CoreEngine'][_0x3a251d(0x3a6)][_0x3a251d(0x3c0)][_0x525b66])){var _0x374ea1=String(RegExp['$1']);try{_0x207c54*=eval(_0x374ea1);}catch(_0x175d49){if($gameTemp[_0x3a251d(0x1c7)]())console[_0x3a251d(0x321)](_0x175d49);}}return _0x207c54;};return this[_0x18b006(0x95d)]()[_0x18b006(0x88c)](_0x5eca8d,_0x3ee721);},Game_BattlerBase[_0x1c6d52(0x721)]['paramFlatBonus']=function(_0x485b19){const _0x1ef95b=_0x1c6d52,_0x21cf2c=(_0x5d7ea4,_0x1358e2)=>{const _0xbdcc86=_0x324f;if(!_0x1358e2)return _0x5d7ea4;if(_0x1358e2['note'][_0xbdcc86(0x91c)](VisuMZ['CoreEngine'][_0xbdcc86(0x3a6)]['paramFlat'][_0x485b19])){if('nZKYD'===_0xbdcc86(0x432))this['_forcedBattleSys']=_0xbdcc86(0x99d);else{var _0x435226=Number(RegExp['$1']);_0x5d7ea4+=_0x435226;}}if(_0x1358e2[_0xbdcc86(0x9a1)][_0xbdcc86(0x91c)](VisuMZ[_0xbdcc86(0x7b7)][_0xbdcc86(0x3a6)]['paramFlatJS'][_0x485b19])){if(_0xbdcc86(0x698)!==_0xbdcc86(0x698)){const _0x45e0da=this[_0xbdcc86(0x431)]();let _0x4c8fde=_0x2f89ad['MIN_SAFE_INTEGER'];this[_0xbdcc86(0x1f7)](_0x31132e,_0x45e0da[0x0]);for(const _0x1aa5d4 of _0x45e0da){const _0x397a73=_0x1aa5d4[_0xbdcc86(0x305)]();_0x397a73>_0x4c8fde&&(_0x4c8fde=_0x397a73,this[_0xbdcc86(0x1f7)](_0x14c480,_0x1aa5d4));}}else{var _0x57d1a5=String(RegExp['$1']);try{_0x5d7ea4+=eval(_0x57d1a5);}catch(_0x3a7b8d){if($gameTemp[_0xbdcc86(0x1c7)]())console['log'](_0x3a7b8d);}}}return _0x5d7ea4;};return this[_0x1ef95b(0x95d)]()['reduce'](_0x21cf2c,0x0);},Game_BattlerBase['prototype']['param']=function(_0x22e582){const _0x418ca0=_0x1c6d52;let _0xfc8e3b=_0x418ca0(0x2d4)+_0x22e582+'Total';if(this[_0x418ca0(0x378)](_0xfc8e3b))return this['_cache'][_0xfc8e3b];return this[_0x418ca0(0x2c5)][_0xfc8e3b]=Math[_0x418ca0(0x5c2)](VisuMZ[_0x418ca0(0x7b7)][_0x418ca0(0x719)][_0x418ca0(0x8a8)]['BasicParameterFormula'][_0x418ca0(0x78a)](this,_0x22e582)),this[_0x418ca0(0x2c5)][_0xfc8e3b];},Game_BattlerBase['prototype'][_0x1c6d52(0x852)]=function(_0x3ca72c){const _0x30f83b=_0x1c6d52,_0x5bb408=(_0x15cbbe,_0x37de01)=>{const _0x2966f4=_0x324f;if(_0x2966f4(0x278)!==_0x2966f4(0x278))return _0x4323d7[_0x2966f4(0x7b7)]['Game_Picture_calcEasing']['call'](this,_0x143895);else{if(!_0x37de01)return _0x15cbbe;if(_0x37de01[_0x2966f4(0x9a1)][_0x2966f4(0x91c)](VisuMZ[_0x2966f4(0x7b7)][_0x2966f4(0x3a6)][_0x2966f4(0x337)][_0x3ca72c])){var _0x5375f9=Number(RegExp['$1'])/0x64;_0x15cbbe+=_0x5375f9;}if(_0x37de01['note'][_0x2966f4(0x91c)](VisuMZ[_0x2966f4(0x7b7)][_0x2966f4(0x3a6)][_0x2966f4(0x99a)][_0x3ca72c])){var _0x5375f9=Number(RegExp['$1']);_0x15cbbe+=_0x5375f9;}if(_0x37de01['note']['match'](VisuMZ['CoreEngine'][_0x2966f4(0x3a6)]['xparamPlusJS'][_0x3ca72c])){var _0x2d18d9=String(RegExp['$1']);try{_0x15cbbe+=eval(_0x2d18d9);}catch(_0x2c3cff){if($gameTemp['isPlaytest']())console[_0x2966f4(0x321)](_0x2c3cff);}}return _0x15cbbe;}};return this[_0x30f83b(0x95d)]()[_0x30f83b(0x88c)](_0x5bb408,0x0);},Game_BattlerBase[_0x1c6d52(0x721)]['xparamRate']=function(_0xf1ce69){const _0x4e23c7=_0x1c6d52,_0x5d1e8a=(_0x26a2cd,_0x1a9698)=>{const _0xc909a9=_0x324f;if(!_0x1a9698)return _0x26a2cd;if(_0x1a9698[_0xc909a9(0x9a1)][_0xc909a9(0x91c)](VisuMZ[_0xc909a9(0x7b7)][_0xc909a9(0x3a6)][_0xc909a9(0x300)][_0xf1ce69])){var _0x4000b4=Number(RegExp['$1'])/0x64;_0x26a2cd*=_0x4000b4;}if(_0x1a9698[_0xc909a9(0x9a1)]['match'](VisuMZ[_0xc909a9(0x7b7)][_0xc909a9(0x3a6)][_0xc909a9(0x940)][_0xf1ce69])){if('SptNj'!==_0xc909a9(0x4a5)){var _0x4000b4=Number(RegExp['$1']);_0x26a2cd*=_0x4000b4;}else return _0x13502e[_0xc909a9(0x637)][_0xc909a9(0x78a)](this);}if(_0x1a9698[_0xc909a9(0x9a1)]['match'](VisuMZ[_0xc909a9(0x7b7)][_0xc909a9(0x3a6)][_0xc909a9(0x900)][_0xf1ce69])){if('KMvPM'==='CiuDx')for(const _0x50b85d of _0x1da3c9[_0xc909a9(0x922)]){_0x50b85d[_0xc909a9(0x9a1)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x50b85d[_0xc909a9(0x202)]=_0x1827bf[_0xc909a9(0x269)](_0xe96bf8(_0x3e9aaa['$1']),0x1));}else{var _0x29a1e1=String(RegExp['$1']);try{_0xc909a9(0x28a)!==_0xc909a9(0x5f8)?_0x26a2cd*=eval(_0x29a1e1):(this[_0xc909a9(0x474)](_0xc909a9(0x25d)),this[_0xc909a9(0xa37)]=_0xf9c89f);}catch(_0x4b24b2){if(_0xc909a9(0x780)===_0xc909a9(0x68c)){if(!this['_coreEasing'])return;this['x']=this[_0xc909a9(0x6ac)][_0xc909a9(0x326)],this['y']=this[_0xc909a9(0x6ac)]['targetY'],this[_0xc909a9(0x46c)]['x']=this[_0xc909a9(0x6ac)][_0xc909a9(0x7a8)],this[_0xc909a9(0x46c)]['y']=this[_0xc909a9(0x6ac)][_0xc909a9(0x2f3)],this[_0xc909a9(0x779)]=this['_coreEasing']['targetOpacity'],this[_0xc909a9(0x8ab)]=this['_coreEasing'][_0xc909a9(0x307)],this[_0xc909a9(0x866)]=this[_0xc909a9(0x6ac)][_0xc909a9(0x6a4)],this[_0xc909a9(0x98a)](_0x10fa59,_0x2a0086,this['x'],this['y'],this['scale']['x'],this[_0xc909a9(0x46c)]['y'],this[_0xc909a9(0x779)],this[_0xc909a9(0x8ab)],this[_0xc909a9(0x866)]);}else{if($gameTemp['isPlaytest']())console[_0xc909a9(0x321)](_0x4b24b2);}}}}return _0x26a2cd;};return this['traitObjects']()[_0x4e23c7(0x88c)](_0x5d1e8a,0x1);},Game_BattlerBase['prototype'][_0x1c6d52(0x6e5)]=function(_0x14aed7){const _0x551f09=_0x1c6d52,_0x35f7f3=(_0x1834ac,_0x5e0054)=>{const _0x2c0a77=_0x324f;if(!_0x5e0054)return _0x1834ac;if(_0x5e0054['note']['match'](VisuMZ[_0x2c0a77(0x7b7)][_0x2c0a77(0x3a6)][_0x2c0a77(0x36e)][_0x14aed7])){if(_0x2c0a77(0x306)!==_0x2c0a77(0x8d2)){var _0x5c056c=Number(RegExp['$1'])/0x64;_0x1834ac+=_0x5c056c;}else{if(this[_0x2c0a77(0x839)]<=0x0)return;const _0x406a1d=this[_0x2c0a77(0x839)],_0x29ad93=this[_0x2c0a77(0xa37)],_0x23b7a8=this[_0x2c0a77(0x4db)];this[_0x2c0a77(0x26a)]=this[_0x2c0a77(0x9d6)](this[_0x2c0a77(0x26a)],this[_0x2c0a77(0x246)],_0x406a1d,_0x29ad93,_0x23b7a8),this[_0x2c0a77(0x9fe)]=this['applyEasing'](this[_0x2c0a77(0x9fe)],this[_0x2c0a77(0x478)],_0x406a1d,_0x29ad93,_0x23b7a8),this[_0x2c0a77(0x839)]--;if(this[_0x2c0a77(0x839)]<=0x0)this[_0x2c0a77(0x8a9)]();}}if(_0x5e0054[_0x2c0a77(0x9a1)][_0x2c0a77(0x91c)](VisuMZ['CoreEngine'][_0x2c0a77(0x3a6)]['xparamFlat2'][_0x14aed7])){if(_0x2c0a77(0x930)===_0x2c0a77(0x341))this[_0x2c0a77(0x88d)]=_0x272f43['_scene']['getButtonAssistLocation']()!==_0x2c0a77(0x339)?0x0:0x8;else{var _0x5c056c=Number(RegExp['$1']);_0x1834ac+=_0x5c056c;}}if(_0x5e0054[_0x2c0a77(0x9a1)][_0x2c0a77(0x91c)](VisuMZ[_0x2c0a77(0x7b7)][_0x2c0a77(0x3a6)]['xparamFlatJS'][_0x14aed7])){var _0x5c2b67=String(RegExp['$1']);try{'holUx'!=='KuBRi'?_0x1834ac+=eval(_0x5c2b67):this[_0x2c0a77(0x3c1)]=_0x2c0a77(0x8db);}catch(_0x25ea5f){if($gameTemp['isPlaytest']())console['log'](_0x25ea5f);}}return _0x1834ac;};return this[_0x551f09(0x95d)]()[_0x551f09(0x88c)](_0x35f7f3,0x0);},Game_BattlerBase[_0x1c6d52(0x721)][_0x1c6d52(0x39e)]=function(_0x16be40){const _0x360977=_0x1c6d52;let _0x123df5=_0x360977(0x39e)+_0x16be40+_0x360977(0x7f2);if(this[_0x360977(0x378)](_0x123df5))return this['_cache'][_0x123df5];return this[_0x360977(0x2c5)][_0x123df5]=VisuMZ[_0x360977(0x7b7)]['Settings']['Param'][_0x360977(0x708)][_0x360977(0x78a)](this,_0x16be40),this[_0x360977(0x2c5)][_0x123df5];},Game_BattlerBase['prototype']['sparamPlus']=function(_0x3dec30){const _0x1e21ab=_0x1c6d52,_0x371146=(_0x538b23,_0x22b28d)=>{const _0x13acd2=_0x324f;if(_0x13acd2(0x688)!=='ASKLG'){if(!_0x22b28d)return _0x538b23;if(_0x22b28d[_0x13acd2(0x9a1)]['match'](VisuMZ[_0x13acd2(0x7b7)][_0x13acd2(0x3a6)][_0x13acd2(0x570)][_0x3dec30])){var _0x518ae0=Number(RegExp['$1'])/0x64;_0x538b23+=_0x518ae0;}if(_0x22b28d[_0x13acd2(0x9a1)][_0x13acd2(0x91c)](VisuMZ[_0x13acd2(0x7b7)][_0x13acd2(0x3a6)][_0x13acd2(0x562)][_0x3dec30])){if(_0x13acd2(0x8e3)===_0x13acd2(0x439))_0x715a96+=_0x13acd2(0x8c5)[_0x13acd2(0x649)](_0x2046b5[_0x13acd2(0x3f8)][0x0]);else{var _0x518ae0=Number(RegExp['$1']);_0x538b23+=_0x518ae0;}}if(_0x22b28d[_0x13acd2(0x9a1)][_0x13acd2(0x91c)](VisuMZ[_0x13acd2(0x7b7)]['RegExp'][_0x13acd2(0x364)][_0x3dec30])){var _0x279fad=String(RegExp['$1']);try{'CfsjX'===_0x13acd2(0x4b0)?_0x538b23+=eval(_0x279fad):_0x5d3441+=_0x5f58ce+_0x13acd2(0x5f6);}catch(_0x4071e8){if(_0x13acd2(0x8b8)===_0x13acd2(0x52f))_0x5d3132['isPlaytest']()&&(_0x2e0380[_0x13acd2(0x321)](_0x13acd2(0x210)),_0x2583ea[_0x13acd2(0x321)](_0x10f4f2));else{if($gameTemp['isPlaytest']())console['log'](_0x4071e8);}}}return _0x538b23;}else return this[_0x13acd2(0x5be)](_0xd9eeae);};return this['traitObjects']()[_0x1e21ab(0x88c)](_0x371146,0x0);},Game_BattlerBase['prototype'][_0x1c6d52(0x8eb)]=function(_0x1c7ce8){const _0x3cdb82=_0x1c6d52,_0x2c7fc5=(_0x47bb55,_0x3cadb7)=>{const _0x28fb60=_0x324f;if(!_0x3cadb7)return _0x47bb55;if(_0x3cadb7[_0x28fb60(0x9a1)]['match'](VisuMZ[_0x28fb60(0x7b7)][_0x28fb60(0x3a6)][_0x28fb60(0x856)][_0x1c7ce8])){var _0x3e6325=Number(RegExp['$1'])/0x64;_0x47bb55*=_0x3e6325;}if(_0x3cadb7['note'][_0x28fb60(0x91c)](VisuMZ[_0x28fb60(0x7b7)][_0x28fb60(0x3a6)][_0x28fb60(0x1d3)][_0x1c7ce8])){var _0x3e6325=Number(RegExp['$1']);_0x47bb55*=_0x3e6325;}if(_0x3cadb7[_0x28fb60(0x9a1)][_0x28fb60(0x91c)](VisuMZ[_0x28fb60(0x7b7)]['RegExp']['sparamRateJS'][_0x1c7ce8])){var _0x2d7286=String(RegExp['$1']);try{_0x47bb55*=eval(_0x2d7286);}catch(_0x2f3de9){if(_0x28fb60(0x5f0)===_0x28fb60(0x5f0)){if($gameTemp[_0x28fb60(0x1c7)]())console[_0x28fb60(0x321)](_0x2f3de9);}else this['isUseModernControls']()?this[_0x28fb60(0x5b0)]():_0x1b787d['CoreEngine'][_0x28fb60(0x854)]['call'](this);}}return _0x47bb55;};return this[_0x3cdb82(0x95d)]()[_0x3cdb82(0x88c)](_0x2c7fc5,0x1);},Game_BattlerBase[_0x1c6d52(0x721)]['sparamFlatBonus']=function(_0x598e8b){const _0x33cbc1=_0x1c6d52,_0x5c3c3e=(_0x155154,_0x3c5e60)=>{const _0x36bf93=_0x324f;if(!_0x3c5e60)return _0x155154;if(_0x3c5e60[_0x36bf93(0x9a1)][_0x36bf93(0x91c)](VisuMZ['CoreEngine'][_0x36bf93(0x3a6)]['sparamFlat1'][_0x598e8b])){if('mITmr'===_0x36bf93(0x68a)){if(this['_CoreEngineSettings']===_0x476de2)this[_0x36bf93(0x2a3)]();if(this['_CoreEngineSettings'][_0x36bf93(0x20c)]===_0x1cec5d)this[_0x36bf93(0x2a3)]();return this[_0x36bf93(0x851)][_0x36bf93(0x20c)];}else{var _0x2c10a6=Number(RegExp['$1'])/0x64;_0x155154+=_0x2c10a6;}}if(_0x3c5e60[_0x36bf93(0x9a1)][_0x36bf93(0x91c)](VisuMZ[_0x36bf93(0x7b7)][_0x36bf93(0x3a6)][_0x36bf93(0xa47)][_0x598e8b])){if(_0x36bf93(0x974)===_0x36bf93(0x974)){var _0x2c10a6=Number(RegExp['$1']);_0x155154+=_0x2c10a6;}else{var _0x565b40=_0x3c6e4d-2.625/2.75;return 7.5625*_0x565b40*_0x565b40+0.984375;}}if(_0x3c5e60['note'][_0x36bf93(0x91c)](VisuMZ[_0x36bf93(0x7b7)][_0x36bf93(0x3a6)][_0x36bf93(0x363)][_0x598e8b])){var _0x235d91=String(RegExp['$1']);try{if(_0x36bf93(0x25e)!=='YwCca')_0x155154+=eval(_0x235d91);else{const _0x5bacf3=_0x36cc70[_0x36bf93(0x7b7)][_0x36bf93(0x719)]['ControllerButtons'];for(const _0x11507f of _0x5bacf3){const _0x128bf4=(_0x11507f[_0x36bf93(0x6ec)]||'')['toLowerCase']()[_0x36bf93(0x40e)](),_0x430df3=(_0x11507f[_0x36bf93(0x4f3)]||'')[_0x36bf93(0x4ee)]()[_0x36bf93(0x40e)]();_0x58be29[_0x36bf93(0x7b7)][_0x36bf93(0x8fb)][_0x128bf4]=_0x11507f,_0x22455d[_0x36bf93(0x7b7)][_0x36bf93(0x83d)][_0x430df3]=_0x128bf4;}}}catch(_0x244b2e){if($gameTemp[_0x36bf93(0x1c7)]())console[_0x36bf93(0x321)](_0x244b2e);}}return _0x155154;};return this['traitObjects']()[_0x33cbc1(0x88c)](_0x5c3c3e,0x0);},Game_BattlerBase[_0x1c6d52(0x721)][_0x1c6d52(0x68e)]=function(_0x24c5b0){const _0x53109b=_0x1c6d52;let _0xd23ea2=_0x53109b(0x68e)+_0x24c5b0+_0x53109b(0x7f2);if(this[_0x53109b(0x378)](_0xd23ea2))return this['_cache'][_0xd23ea2];return this[_0x53109b(0x2c5)][_0xd23ea2]=VisuMZ[_0x53109b(0x7b7)][_0x53109b(0x719)]['Param'][_0x53109b(0x8fe)][_0x53109b(0x78a)](this,_0x24c5b0),this[_0x53109b(0x2c5)][_0xd23ea2];},Game_BattlerBase[_0x1c6d52(0x721)][_0x1c6d52(0x415)]=function(_0x3f754d,_0x4b63a3){const _0x31aab3=_0x1c6d52;if(typeof paramId==='number')return this[_0x31aab3(0x2d4)](_0x3f754d);_0x3f754d=String(_0x3f754d||'')['toUpperCase']();if(_0x3f754d==='MAXHP')return this[_0x31aab3(0x2d4)](0x0);if(_0x3f754d==='MAXMP')return this[_0x31aab3(0x2d4)](0x1);if(_0x3f754d==='ATK')return this[_0x31aab3(0x2d4)](0x2);if(_0x3f754d===_0x31aab3(0x36d))return this[_0x31aab3(0x2d4)](0x3);if(_0x3f754d===_0x31aab3(0x4d3))return this[_0x31aab3(0x2d4)](0x4);if(_0x3f754d===_0x31aab3(0x724))return this['param'](0x5);if(_0x3f754d===_0x31aab3(0x494))return this[_0x31aab3(0x2d4)](0x6);if(_0x3f754d==='LUK')return this['param'](0x7);if(_0x3f754d===_0x31aab3(0x3f9))return _0x4b63a3?String(Math['round'](this[_0x31aab3(0x39e)](0x0)*0x64))+'%':this[_0x31aab3(0x39e)](0x0);if(_0x3f754d===_0x31aab3(0x959))return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this[_0x31aab3(0x39e)](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x3f754d==='CRI')return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this[_0x31aab3(0x39e)](0x2)*0x64))+'%':this[_0x31aab3(0x39e)](0x2);if(_0x3f754d===_0x31aab3(0x787))return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this['xparam'](0x3)*0x64))+'%':this[_0x31aab3(0x39e)](0x3);if(_0x3f754d===_0x31aab3(0x57e))return _0x4b63a3?String(Math['round'](this[_0x31aab3(0x39e)](0x4)*0x64))+'%':this[_0x31aab3(0x39e)](0x4);if(_0x3f754d==='MRF')return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this[_0x31aab3(0x39e)](0x5)*0x64))+'%':this[_0x31aab3(0x39e)](0x5);if(_0x3f754d===_0x31aab3(0x8f3))return _0x4b63a3?String(Math['round'](this[_0x31aab3(0x39e)](0x6)*0x64))+'%':this[_0x31aab3(0x39e)](0x6);if(_0x3f754d===_0x31aab3(0x76d))return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this[_0x31aab3(0x39e)](0x7)*0x64))+'%':this[_0x31aab3(0x39e)](0x7);if(_0x3f754d===_0x31aab3(0x781))return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this['xparam'](0x8)*0x64))+'%':this[_0x31aab3(0x39e)](0x8);if(_0x3f754d===_0x31aab3(0x629))return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this[_0x31aab3(0x39e)](0x9)*0x64))+'%':this[_0x31aab3(0x39e)](0x9);if(_0x3f754d===_0x31aab3(0x480))return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this[_0x31aab3(0x68e)](0x0)*0x64))+'%':this[_0x31aab3(0x68e)](0x0);if(_0x3f754d===_0x31aab3(0x311))return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this[_0x31aab3(0x68e)](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x3f754d===_0x31aab3(0x84e))return _0x4b63a3?String(Math['round'](this[_0x31aab3(0x68e)](0x2)*0x64))+'%':this[_0x31aab3(0x68e)](0x2);if(_0x3f754d===_0x31aab3(0x6dc))return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this[_0x31aab3(0x68e)](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x3f754d==='MCR')return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this['sparam'](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x3f754d===_0x31aab3(0x406))return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this[_0x31aab3(0x68e)](0x5)*0x64))+'%':this[_0x31aab3(0x68e)](0x5);if(_0x3f754d==='PDR')return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this[_0x31aab3(0x68e)](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x3f754d===_0x31aab3(0x30d))return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this[_0x31aab3(0x68e)](0x7)*0x64))+'%':this[_0x31aab3(0x68e)](0x7);if(_0x3f754d==='FDR')return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this[_0x31aab3(0x68e)](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x3f754d==='EXR')return _0x4b63a3?String(Math[_0x31aab3(0x5c2)](this['sparam'](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x31aab3(0x7b7)]['CustomParamAbb'][_0x3f754d]){const _0x549327=VisuMZ[_0x31aab3(0x7b7)][_0x31aab3(0x476)][_0x3f754d],_0x4e5638=this[_0x549327];return VisuMZ[_0x31aab3(0x7b7)][_0x31aab3(0x1ba)][_0x3f754d]===_0x31aab3(0x3d4)?_0x4e5638:_0x4b63a3?String(Math['round'](_0x4e5638*0x64))+'%':_0x4e5638;}return'';},Game_BattlerBase[_0x1c6d52(0x721)][_0x1c6d52(0x75e)]=function(){const _0x3e5bf1=_0x1c6d52;return this[_0x3e5bf1(0x609)]()&&this['_hp']<this['mhp']*VisuMZ['CoreEngine'][_0x3e5bf1(0x719)][_0x3e5bf1(0x8a8)][_0x3e5bf1(0x66d)];},Game_Battler['prototype'][_0x1c6d52(0x3a8)]=function(){const _0x46c948=_0x1c6d52;SoundManager[_0x46c948(0x785)](),this['requestMotion']('evade');},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x382)]=Game_Actor[_0x1c6d52(0x721)]['paramBase'],Game_Actor['prototype'][_0x1c6d52(0x48d)]=function(_0x1c88e6){const _0x36e021=_0x1c6d52;if(this[_0x36e021(0x202)]>0x63)return this[_0x36e021(0xa10)](_0x1c88e6);return VisuMZ[_0x36e021(0x7b7)][_0x36e021(0x382)][_0x36e021(0x78a)](this,_0x1c88e6);},Game_Actor['prototype']['paramBaseAboveLevel99']=function(_0x174996){const _0x2e5bbc=_0x1c6d52,_0x2cbfe0=this[_0x2e5bbc(0x438)]()[_0x2e5bbc(0x846)][_0x174996][0x63],_0x549544=this['currentClass']()['params'][_0x174996][0x62];return _0x2cbfe0+(_0x2cbfe0-_0x549544)*(this[_0x2e5bbc(0x202)]-0x63);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x6a6)]=Game_Actor['prototype'][_0x1c6d52(0x92c)],Game_Actor[_0x1c6d52(0x721)][_0x1c6d52(0x92c)]=function(_0x352aec,_0x3819c3){const _0x31e607=_0x1c6d52;$gameTemp[_0x31e607(0x6f8)]=!![],VisuMZ[_0x31e607(0x7b7)]['Game_Actor_changeClass'][_0x31e607(0x78a)](this,_0x352aec,_0x3819c3),$gameTemp['_changingClass']=undefined;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x434)]=Game_Actor['prototype'][_0x1c6d52(0x8ca)],Game_Actor[_0x1c6d52(0x721)]['levelUp']=function(){const _0x475bc9=_0x1c6d52;VisuMZ[_0x475bc9(0x7b7)]['Game_Actor_levelUp'][_0x475bc9(0x78a)](this);if(!$gameTemp[_0x475bc9(0x6f8)])this['levelUpRecovery']();},Game_Actor[_0x1c6d52(0x721)]['levelUpRecovery']=function(){const _0x5d3e6f=_0x1c6d52;this['_cache']={};if(VisuMZ[_0x5d3e6f(0x7b7)][_0x5d3e6f(0x719)][_0x5d3e6f(0x858)][_0x5d3e6f(0x845)])this[_0x5d3e6f(0x207)]=this[_0x5d3e6f(0x7a2)];if(VisuMZ['CoreEngine']['Settings'][_0x5d3e6f(0x858)]['LevelUpFullMp'])this[_0x5d3e6f(0x934)]=this[_0x5d3e6f(0x25b)];},Game_Actor[_0x1c6d52(0x721)][_0x1c6d52(0x375)]=function(){const _0x5a10f9=_0x1c6d52;if(this['isMaxLevel']())return 0x1;const _0x5c7311=this[_0x5a10f9(0x9cd)]()-this[_0x5a10f9(0x2e1)](),_0x148562=this[_0x5a10f9(0x3cf)]()-this[_0x5a10f9(0x2e1)]();return(_0x148562/_0x5c7311)['clamp'](0x0,0x1);},Game_Actor[_0x1c6d52(0x721)][_0x1c6d52(0x95d)]=function(){const _0x5f2218=_0x1c6d52,_0x72278d=Game_Battler[_0x5f2218(0x721)][_0x5f2218(0x95d)][_0x5f2218(0x78a)](this);for(const _0x513eb9 of this[_0x5f2218(0x58a)]()){if(_0x5f2218(0x5b9)===_0x5f2218(0x3ab))this['smoothSelect'](_0x26f750[_0x5f2218(0x269)](this[_0x5f2218(0x428)](),this[_0x5f2218(0x7b5)]()-0x1));else{if(_0x513eb9){if(_0x5f2218(0x6b7)!==_0x5f2218(0x7de))_0x72278d[_0x5f2218(0x430)](_0x513eb9);else return _0x448d59[_0x5f2218(0x872)][_0x5f2218(0x582)]['call'](this);}}}return _0x72278d['push'](this[_0x5f2218(0x438)](),this[_0x5f2218(0x8d6)]()),_0x72278d;},Object[_0x1c6d52(0x6f5)](Game_Enemy[_0x1c6d52(0x721)],'level',{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy[_0x1c6d52(0x721)][_0x1c6d52(0x949)]=function(){const _0x2b43e3=_0x1c6d52;return this[_0x2b43e3(0x607)]()[_0x2b43e3(0x202)];},Game_Enemy['prototype'][_0x1c6d52(0x598)]=function(){const _0x13350b=_0x1c6d52;!this[_0x13350b(0x2e8)]&&(this[_0x13350b(0xa3c)]+=Math[_0x13350b(0x5c2)]((Graphics['height']-0x270)/0x2),this[_0x13350b(0xa3c)]-=Math['floor']((Graphics[_0x13350b(0x81f)]-Graphics[_0x13350b(0x471)])/0x2),$gameSystem[_0x13350b(0x86d)]()?_0x13350b(0x3cd)!=='LdPOv'?_0x369e2b[_0x13350b(0x98f)]&&(this[_0x13350b(0x3c1)]=_0x13350b(0x8db)):this[_0x13350b(0x981)]-=Math[_0x13350b(0x403)]((Graphics[_0x13350b(0x552)]-Graphics['boxWidth'])/0x2):this[_0x13350b(0x981)]+=Math['round']((Graphics['boxWidth']-0x330)/0x2)),this[_0x13350b(0x2e8)]=!![];},Game_Party['prototype']['maxGold']=function(){const _0x1747a1=_0x1c6d52;return VisuMZ[_0x1747a1(0x7b7)][_0x1747a1(0x719)][_0x1747a1(0x92f)][_0x1747a1(0x610)];},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x250)]=Game_Party[_0x1c6d52(0x721)][_0x1c6d52(0xa20)],Game_Party[_0x1c6d52(0x721)][_0x1c6d52(0xa20)]=function(_0x541da7){const _0x33afd3=_0x1c6d52;if(VisuMZ[_0x33afd3(0x7b7)][_0x33afd3(0x719)][_0x33afd3(0x858)]['KeyItemProtect']&&DataManager[_0x33afd3(0x22e)](_0x541da7))return;VisuMZ[_0x33afd3(0x7b7)][_0x33afd3(0x250)][_0x33afd3(0x78a)](this,_0x541da7);},Game_Party[_0x1c6d52(0x721)][_0x1c6d52(0x8cd)]=function(){const _0x590bdb=_0x1c6d52,_0x30141a=VisuMZ['CoreEngine']['Settings'][_0x590bdb(0x858)],_0x5e20c8=_0x30141a[_0x590bdb(0x515)]??0x63;let _0x4d8f57=[];(_0x30141a[_0x590bdb(0x49e)]??!![])&&(_0x4d8f57=_0x4d8f57[_0x590bdb(0x1ff)]($dataItems));(_0x30141a[_0x590bdb(0x809)]??!![])&&(_0x590bdb(0x45c)!==_0x590bdb(0x567)?_0x4d8f57=_0x4d8f57[_0x590bdb(0x1ff)]($dataWeapons):this[_0x590bdb(0x9f9)]['x']=_0x46fb3a['boxWidth']+0x4);(_0x30141a[_0x590bdb(0x1d6)]??!![])&&(_0x4d8f57=_0x4d8f57[_0x590bdb(0x1ff)]($dataArmors));for(const _0x4c857b of _0x4d8f57){if(!_0x4c857b)continue;if(_0x4c857b[_0x590bdb(0x4fb)][_0x590bdb(0x40e)]()<=0x0)continue;if(_0x4c857b[_0x590bdb(0x4fb)]['match'](/-----/i))continue;this[_0x590bdb(0x697)](_0x4c857b,_0x5e20c8);}},VisuMZ['CoreEngine'][_0x1c6d52(0x91d)]=Game_Troop[_0x1c6d52(0x721)]['setup'],Game_Troop['prototype'][_0x1c6d52(0x231)]=function(_0x2fd4d9){const _0x2a8bf3=_0x1c6d52;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp['applyForcedGameTroopSettingsCoreEngine'](_0x2fd4d9),VisuMZ[_0x2a8bf3(0x7b7)][_0x2a8bf3(0x91d)]['call'](this,_0x2fd4d9);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x4b7)]=Game_Map[_0x1c6d52(0x721)][_0x1c6d52(0x231)],Game_Map[_0x1c6d52(0x721)]['setup']=function(_0x2b9039){const _0xfefe1a=_0x1c6d52;VisuMZ[_0xfefe1a(0x7b7)][_0xfefe1a(0x4b7)][_0xfefe1a(0x78a)](this,_0x2b9039),this[_0xfefe1a(0x9b0)](),this[_0xfefe1a(0x910)](_0x2b9039);},Game_Map[_0x1c6d52(0x721)]['setupCoreEngine']=function(){const _0x311386=_0x1c6d52;this['_hideTileShadows']=VisuMZ[_0x311386(0x7b7)][_0x311386(0x719)][_0x311386(0x858)][_0x311386(0x65d)]||![];const _0x1771d0=VisuMZ['CoreEngine'][_0x311386(0x719)]['ScreenResolution'],_0x1f32f1=$dataMap?$dataMap[_0x311386(0x9a1)]||'':'';if(_0x1f32f1['match'](/<SHOW TILE SHADOWS>/i)){if(_0x311386(0x9cb)!==_0x311386(0x489))this[_0x311386(0x534)]=![];else{const _0x227693=_0x311386(0x9b7);this[_0x311386(0x7e4)]=this[_0x311386(0x7e4)]||{};if(this[_0x311386(0x7e4)][_0x227693])return this[_0x311386(0x7e4)][_0x227693];const _0x56766e=_0x287f0b[_0x311386(0x7b7)][_0x311386(0x719)][_0x311386(0x2bf)][_0x311386(0x20d)];return this[_0x311386(0x493)](_0x227693,_0x56766e);}}else _0x1f32f1['match'](/<HIDE TILE SHADOWS>/i)&&(this[_0x311386(0x534)]=!![]);if(_0x1f32f1[_0x311386(0x91c)](/<SCROLL LOCK X>/i)){if('NpqSr'===_0x311386(0x2ab)){if(this[_0x311386(0x851)]===_0x44cc82)this[_0x311386(0x2a3)]();if(this[_0x311386(0x851)][_0x311386(0x5a8)]===_0x3b08e4)this[_0x311386(0x2a3)]();return this[_0x311386(0x851)]['FontSize'];}else this[_0x311386(0x259)]()[_0x311386(0x542)]=!![],this[_0x311386(0x259)]()[_0x311386(0x641)]=_0x1771d0[_0x311386(0x90f)];}else _0x1f32f1[_0x311386(0x91c)](/<SCROLL LOCK X: (.*?)>/i)&&('zFXso'!=='zFXso'?(this['_muteSound']&&(_0x56663a=_0x456288[_0x311386(0x1d8)](_0x3ad903),_0x4fdc58['se']&&(_0x14ff41['se'][_0x311386(0x3ed)]=0x0)),_0x3e8e82[_0x311386(0x7b7)][_0x311386(0x37c)][_0x311386(0x78a)](this,_0x357c9b)):(this[_0x311386(0x259)]()['centerX']=!![],this['centerCameraCheckData']()[_0x311386(0x641)]=Number(RegExp['$1'])));if(_0x1f32f1['match'](/<SCROLL LOCK Y>/i)){if(_0x311386(0x94e)!==_0x311386(0x684))this[_0x311386(0x259)]()['centerY']=!![],this[_0x311386(0x259)]()[_0x311386(0x5ae)]=_0x1771d0[_0x311386(0x1cf)];else{let _0x13cb2a=_0x58b118[_0x311386(0x75c)],_0x112872=_0x13cb2a[_0x311386(0x3bf)];for(let _0x4ce182=0x0;_0x4ce182<_0x112872;++_0x4ce182){this['_editWindow'][_0x311386(0x4d9)](_0x13cb2a[_0x4ce182])?_0x1017a0[_0x311386(0x8f0)]():_0x10274e[_0x311386(0x772)]();}_0x343adb[_0x311386(0x261)]();}}else _0x1f32f1[_0x311386(0x91c)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x311386(0x259)]()[_0x311386(0x8bf)]=!![],this[_0x311386(0x259)]()[_0x311386(0x5ae)]=Number(RegExp['$1']));},Game_Map[_0x1c6d52(0x721)][_0x1c6d52(0x7bd)]=function(){if(this['_hideTileShadows']===undefined)this['setupCoreEngine']();return this['_hideTileShadows'];},Game_Map['prototype'][_0x1c6d52(0x9b0)]=function(){const _0x4913bf=_0x1c6d52,_0x47978f=VisuMZ[_0x4913bf(0x7b7)][_0x4913bf(0x719)][_0x4913bf(0x802)];this[_0x4913bf(0x572)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x47978f[_0x4913bf(0x23b)]){const _0x3f9a88=Graphics['width']/this['tileWidth']();if(_0x3f9a88%0x1!==0x0&&Math['ceil'](_0x3f9a88)===this[_0x4913bf(0x552)]()&&!this[_0x4913bf(0x761)]()){if(_0x4913bf(0x294)===_0x4913bf(0x7eb)){if(this['_action'][_0x4913bf(0x9ac)]())return![];return _0x28ddce[_0x4913bf(0x7b7)][_0x4913bf(0x1cc)][_0x4913bf(0x78a)](this,_0x3b1914);}else this['_centerCameraCheck'][_0x4913bf(0x542)]=!![],this[_0x4913bf(0x572)][_0x4913bf(0x641)]=_0x47978f[_0x4913bf(0x90f)]||0x0;}}if(_0x47978f[_0x4913bf(0x453)]){if(_0x4913bf(0x8ce)===_0x4913bf(0x8ce)){const _0x4584a0=Graphics[_0x4913bf(0x81f)]/this[_0x4913bf(0x677)]();_0x4584a0%0x1!==0x0&&Math[_0x4913bf(0x65c)](_0x4584a0)===this[_0x4913bf(0x81f)]()&&!this[_0x4913bf(0x64f)]()&&(this[_0x4913bf(0x572)]['centerY']=!![],this[_0x4913bf(0x572)][_0x4913bf(0x5ae)]=_0x47978f[_0x4913bf(0x1cf)]||0x0);}else this['switchModes'](_0x4913bf(0x66c));}},Game_Map[_0x1c6d52(0x721)][_0x1c6d52(0x259)]=function(){const _0x3960f8=_0x1c6d52;if(this[_0x3960f8(0x572)]===undefined)this[_0x3960f8(0x9b0)]();return this[_0x3960f8(0x572)];},VisuMZ['CoreEngine']['Game_Map_scrollDown']=Game_Map[_0x1c6d52(0x721)][_0x1c6d52(0x330)],Game_Map[_0x1c6d52(0x721)]['scrollDown']=function(_0x115468){const _0x4a5ee5=_0x1c6d52;if(this[_0x4a5ee5(0x259)]()['centerY']&&$gameScreen[_0x4a5ee5(0x212)]()===0x1){this[_0x4a5ee5(0x55d)]=this[_0x4a5ee5(0x259)]()['displayY'];return;}VisuMZ[_0x4a5ee5(0x7b7)][_0x4a5ee5(0x696)][_0x4a5ee5(0x78a)](this,_0x115468);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x8c6)]=Game_Map[_0x1c6d52(0x721)][_0x1c6d52(0xa1f)],Game_Map[_0x1c6d52(0x721)]['scrollLeft']=function(_0x49375f){const _0x3a5e0d=_0x1c6d52;if(this[_0x3a5e0d(0x259)]()[_0x3a5e0d(0x542)]&&$gameScreen[_0x3a5e0d(0x212)]()===0x1){if(_0x3a5e0d(0x291)===_0x3a5e0d(0x291)){this['_displayX']=this['centerCameraCheckData']()['displayX'];return;}else this[_0x3a5e0d(0x1ec)]();}VisuMZ[_0x3a5e0d(0x7b7)]['Game_Map_scrollLeft'][_0x3a5e0d(0x78a)](this,_0x49375f);},VisuMZ[_0x1c6d52(0x7b7)]['Game_Map_scrollRight']=Game_Map[_0x1c6d52(0x721)][_0x1c6d52(0x5b6)],Game_Map['prototype']['scrollRight']=function(_0x485d84){const _0x1e61a1=_0x1c6d52;if(this[_0x1e61a1(0x259)]()['centerX']&&$gameScreen['zoomScale']()===0x1){this['_displayX']=this[_0x1e61a1(0x259)]()[_0x1e61a1(0x641)];return;}VisuMZ[_0x1e61a1(0x7b7)][_0x1e61a1(0x209)][_0x1e61a1(0x78a)](this,_0x485d84);},VisuMZ['CoreEngine'][_0x1c6d52(0x240)]=Game_Map[_0x1c6d52(0x721)][_0x1c6d52(0x6fb)],Game_Map['prototype'][_0x1c6d52(0x6fb)]=function(_0x1f6aa2){const _0x3e4e10=_0x1c6d52;if(this[_0x3e4e10(0x259)]()[_0x3e4e10(0x8bf)]&&$gameScreen[_0x3e4e10(0x212)]()===0x1){if(_0x3e4e10(0x886)!==_0x3e4e10(0x977)){this[_0x3e4e10(0x55d)]=this[_0x3e4e10(0x259)]()[_0x3e4e10(0x5ae)];return;}else this[_0x3e4e10(0x907)]['setBackgroundType'](_0x264b67[_0x3e4e10(0x872)][_0x3e4e10(0x656)]);}VisuMZ['CoreEngine'][_0x3e4e10(0x240)][_0x3e4e10(0x78a)](this,_0x1f6aa2);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x506)]=Game_Character[_0x1c6d52(0x721)][_0x1c6d52(0x591)],Game_Character[_0x1c6d52(0x721)]['processMoveCommand']=function(_0x236fc5){const _0x4c0b50=_0x1c6d52;try{if(_0x4c0b50(0x27b)!=='epJSY')VisuMZ['CoreEngine']['Game_Character_processMoveCommand'][_0x4c0b50(0x78a)](this,_0x236fc5);else{if(this[_0x4c0b50(0x750)][_0x4c0b50(0x273)['format'](_0x4956e3)]!==_0xb73f52[_0x4c0b50(0x33d)[_0x4c0b50(0x649)](_0x59cc1f)]())return this[_0x4c0b50(0x7ae)]();if(this[_0x4c0b50(0x750)][_0x4c0b50(0x3fc)[_0x4c0b50(0x649)](_0x8d48f1)]!==_0x5beb31[_0x4c0b50(0x54b)[_0x4c0b50(0x649)](_0x13ec03)]())return this[_0x4c0b50(0x7ae)]();}}catch(_0x17d751){if('RfLKC'==='RfLKC'){if($gameTemp[_0x4c0b50(0x1c7)]())console[_0x4c0b50(0x321)](_0x17d751);}else _0x196171['CoreEngine'][_0x4c0b50(0x854)]['call'](this);}},Game_Player[_0x1c6d52(0x721)][_0x1c6d52(0x8b4)]=function(){const _0x349c93=_0x1c6d52,_0xe61f9c=$gameMap[_0x349c93(0x3bd)]();this[_0x349c93(0x97d)]=Math[_0x349c93(0x5df)](_0xe61f9c)+Math['randomInt'](_0xe61f9c)+this[_0x349c93(0xa43)]();},Game_Player[_0x1c6d52(0x721)][_0x1c6d52(0xa43)]=function(){const _0x53a0b9=_0x1c6d52;if($dataMap&&$dataMap[_0x53a0b9(0x9a1)]&&$dataMap['note'][_0x53a0b9(0x91c)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i))return Number(RegExp['$1']);else{if(_0x53a0b9(0x49a)!==_0x53a0b9(0x49a))_0x35b1a9[_0x53a0b9(0x347)](_0x53a0b9(0x2fc))&&this[_0x53a0b9(0x289)]()?this[_0x53a0b9(0x3e1)]():this[_0x53a0b9(0x850)](_0x1a98df[_0x53a0b9(0x68f)]('up'));else return VisuMZ['CoreEngine'][_0x53a0b9(0x719)][_0x53a0b9(0x858)]['EncounterRateMinimum'];}},VisuMZ[_0x1c6d52(0x7b7)]['Game_Event_isCollidedWithEvents']=Game_Event[_0x1c6d52(0x721)][_0x1c6d52(0x580)],Game_Event[_0x1c6d52(0x721)][_0x1c6d52(0x580)]=function(_0x35e532,_0x2093c5){const _0x2105c2=_0x1c6d52;return this[_0x2105c2(0x85c)]()?this[_0x2105c2(0x9e3)](_0x35e532,_0x2093c5):'CXhLz'!==_0x2105c2(0x5e3)?VisuMZ[_0x2105c2(0x7b7)][_0x2105c2(0x35a)][_0x2105c2(0x78a)](this,_0x35e532,_0x2093c5):_0x653b75[_0x2105c2(0x6b9)]()>=0x1;},Game_Event[_0x1c6d52(0x721)][_0x1c6d52(0x85c)]=function(){const _0x2141ba=_0x1c6d52;return VisuMZ[_0x2141ba(0x7b7)][_0x2141ba(0x719)][_0x2141ba(0x858)][_0x2141ba(0x969)];},Game_Event[_0x1c6d52(0x721)]['checkSmartEventCollision']=function(_0x1c5f3a,_0x352e7d){const _0x36ee91=_0x1c6d52;if(!this['isNormalPriority']())return![];else{const _0x49921c=$gameMap[_0x36ee91(0x951)](_0x1c5f3a,_0x352e7d)[_0x36ee91(0x230)](_0x244b25=>_0x244b25[_0x36ee91(0x825)]());return _0x49921c[_0x36ee91(0x3bf)]>0x0;}},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x64c)]=Game_Interpreter['prototype'][_0x1c6d52(0x265)],Game_Interpreter[_0x1c6d52(0x721)][_0x1c6d52(0x265)]=function(_0x13503c){const _0x1915fe=_0x1c6d52,_0x1d6836=this['getCombinedScrollingText']();return _0x1d6836[_0x1915fe(0x91c)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x1915fe(0x65e)](_0x1d6836):VisuMZ[_0x1915fe(0x7b7)][_0x1915fe(0x64c)][_0x1915fe(0x78a)](this,_0x13503c);},Game_Interpreter[_0x1c6d52(0x721)]['getCombinedScrollingText']=function(){const _0x41908e=_0x1c6d52;let _0x48ac26='',_0x35fbd7=this[_0x41908e(0x805)]+0x1;while(this[_0x41908e(0x9bc)][_0x35fbd7]&&this[_0x41908e(0x9bc)][_0x35fbd7][_0x41908e(0x85a)]===0x195){_0x48ac26+=this[_0x41908e(0x9bc)][_0x35fbd7][_0x41908e(0x3f8)][0x0]+'\x0a',_0x35fbd7++;}return _0x48ac26;},Game_Interpreter[_0x1c6d52(0x721)][_0x1c6d52(0x65e)]=function(_0x1c339d){const _0xccb169=_0x1c6d52;try{eval(_0x1c339d);}catch(_0x4fd8b9){'XaPOt'===_0xccb169(0x960)?_0x1d2069[_0xccb169(0x9b5)]=!_0x1cab9e[_0xccb169(0x9b5)]:$gameTemp[_0xccb169(0x1c7)]()&&(console[_0xccb169(0x321)](_0xccb169(0x4e1)),console[_0xccb169(0x321)](_0x4fd8b9));}return!![];},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x829)]=Game_Interpreter[_0x1c6d52(0x721)]['command111'],Game_Interpreter['prototype'][_0x1c6d52(0x859)]=function(_0x79134e){const _0x3d2bae=_0x1c6d52;try{if('jzjNw'===_0x3d2bae(0x4a7))return _0x26031a['CoreEngine']['Settings'][_0x3d2bae(0x2bf)][_0x3d2bae(0x460)];else VisuMZ[_0x3d2bae(0x7b7)][_0x3d2bae(0x829)][_0x3d2bae(0x78a)](this,_0x79134e);}catch(_0x1550ae){$gameTemp[_0x3d2bae(0x1c7)]()&&(_0x3d2bae(0x754)!==_0x3d2bae(0x369)?(console['log']('Conditional\x20Branch\x20Script\x20Error'),console['log'](_0x1550ae)):_0x386cd9[_0x3d2bae(0x7b7)][_0x3d2bae(0x770)][_0x3d2bae(0x78a)](this)),this[_0x3d2bae(0x790)]();}return!![];},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x4d5)]=Game_Interpreter[_0x1c6d52(0x721)][_0x1c6d52(0x8e6)],Game_Interpreter[_0x1c6d52(0x721)][_0x1c6d52(0x8e6)]=function(_0xedde9f){const _0x264481=_0x1c6d52;try{VisuMZ[_0x264481(0x7b7)][_0x264481(0x4d5)][_0x264481(0x78a)](this,_0xedde9f);}catch(_0x42c54c){if('gkYqR'===_0x264481(0x38b))_0x3d7500[_0x264481(0x7b7)][_0x264481(0x1de)][_0x264481(0x78a)](this),this[_0x264481(0x80f)]();else{if($gameTemp[_0x264481(0x1c7)]()){if(_0x264481(0x390)===_0x264481(0x390))console[_0x264481(0x321)](_0x264481(0x5aa)),console['log'](_0x42c54c);else return _0x208c07[_0x264481(0x7b7)][_0x264481(0x64c)][_0x264481(0x78a)](this,_0xf22597);}}}return!![];},VisuMZ['CoreEngine']['Game_Interpreter_command355']=Game_Interpreter[_0x1c6d52(0x721)]['command355'],Game_Interpreter['prototype']['command355']=function(){const _0x5aefbe=_0x1c6d52;try{VisuMZ['CoreEngine'][_0x5aefbe(0x5e0)]['call'](this);}catch(_0x486784){$gameTemp[_0x5aefbe(0x1c7)]()&&(console['log']('Script\x20Call\x20Error'),console[_0x5aefbe(0x321)](_0x486784));}return!![];},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x526)]=Game_Interpreter[_0x1c6d52(0x721)]['command357'],Game_Interpreter[_0x1c6d52(0x721)][_0x1c6d52(0x235)]=function(_0x5aa8ab){const _0x76c7bd=_0x1c6d52;return $gameTemp[_0x76c7bd(0x633)](this),VisuMZ['CoreEngine'][_0x76c7bd(0x526)]['call'](this,_0x5aa8ab);},Scene_Base[_0x1c6d52(0x721)]['fadeSpeed']=function(){const _0x171d31=_0x1c6d52;return VisuMZ[_0x171d31(0x7b7)]['Settings']['UI'][_0x171d31(0x3dc)];},Scene_Base[_0x1c6d52(0x721)]['isBottomHelpMode']=function(){const _0x2af9db=_0x1c6d52;return VisuMZ[_0x2af9db(0x7b7)][_0x2af9db(0x719)]['UI'][_0x2af9db(0x77e)];},Scene_Base['prototype'][_0x1c6d52(0x710)]=function(){const _0x80c62d=_0x1c6d52;return VisuMZ[_0x80c62d(0x7b7)][_0x80c62d(0x719)]['UI'][_0x80c62d(0x21c)];},Scene_Base['prototype'][_0x1c6d52(0x57d)]=function(){const _0x4fb206=_0x1c6d52;return VisuMZ[_0x4fb206(0x7b7)][_0x4fb206(0x719)]['UI']['RightMenus'];},Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x842)]=function(){const _0x4c1dc7=_0x1c6d52;return VisuMZ[_0x4c1dc7(0x7b7)][_0x4c1dc7(0x719)]['UI']['CommandWidth'];},Scene_Base[_0x1c6d52(0x721)]['buttonAreaHeight']=function(){const _0x237546=_0x1c6d52;return VisuMZ[_0x237546(0x7b7)][_0x237546(0x719)]['UI'][_0x237546(0x253)];},Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x5da)]=function(){const _0x4cfc37=_0x1c6d52;return VisuMZ['CoreEngine'][_0x4cfc37(0x719)][_0x4cfc37(0x5a1)][_0x4cfc37(0x74e)];},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x937)]=Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x9f2)],Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x9f2)]=function(){const _0x107546=_0x1c6d52;VisuMZ[_0x107546(0x7b7)][_0x107546(0x937)][_0x107546(0x78a)](this),this[_0x107546(0x96d)](),this[_0x107546(0x79c)]['x']=Math[_0x107546(0x5c2)](this[_0x107546(0x79c)]['x']),this[_0x107546(0x79c)]['y']=Math['round'](this[_0x107546(0x79c)]['y']);},Scene_Base['prototype'][_0x1c6d52(0x96d)]=function(){},Scene_Base[_0x1c6d52(0x721)]['buttonAssistKey1']=function(){const _0xa10780=_0x1c6d52;return TextManager[_0xa10780(0x2a4)](_0xa10780(0x73d),_0xa10780(0x2ae));},Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x96e)]=function(){const _0x5246dc=_0x1c6d52;return TextManager[_0x5246dc(0x4f1)]('tab');},Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x5a7)]=function(){const _0x1d9ed8=_0x1c6d52;return TextManager[_0x1d9ed8(0x4f1)](_0x1d9ed8(0x2fc));},Scene_Base[_0x1c6d52(0x721)]['buttonAssistKey4']=function(){const _0x5b8555=_0x1c6d52;return TextManager[_0x5b8555(0x4f1)]('ok');},Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x387)]=function(){const _0x55d70d=_0x1c6d52;return TextManager['getInputButtonString'](_0x55d70d(0x908));},Scene_Base[_0x1c6d52(0x721)]['buttonAssistText1']=function(){const _0x12e30c=_0x1c6d52;return this[_0x12e30c(0x24b)]&&this['_pageupButton']['visible']?TextManager[_0x12e30c(0x384)]:'';},Scene_Base[_0x1c6d52(0x721)]['buttonAssistText2']=function(){return'';},Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x3af)]=function(){return'';},Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x448)]=function(){const _0x48b02c=_0x1c6d52;return TextManager[_0x48b02c(0x352)];},Scene_Base[_0x1c6d52(0x721)]['buttonAssistText5']=function(){const _0x1d5561=_0x1c6d52;return TextManager[_0x1d5561(0x4b9)];},Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x9c8)]=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset2']=function(){return 0x0;},Scene_Base[_0x1c6d52(0x721)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x9c0)]=function(){return 0x0;},Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x8bc)]=function(){return 0x0;},VisuMZ['CoreEngine'][_0x1c6d52(0x692)]=Scene_Boot[_0x1c6d52(0x721)][_0x1c6d52(0x739)],Scene_Boot[_0x1c6d52(0x721)][_0x1c6d52(0x739)]=function(){const _0x16bdff=_0x1c6d52;VisuMZ['CoreEngine']['Scene_Boot_loadSystemImages'][_0x16bdff(0x78a)](this),this[_0x16bdff(0x6d9)]();},Scene_Boot[_0x1c6d52(0x721)][_0x1c6d52(0x6d9)]=function(){const _0x55aed1=_0x1c6d52,_0x2600e0=[_0x55aed1(0x80e),_0x55aed1(0x892),_0x55aed1(0x4e5),'characters',_0x55aed1(0x8f5),_0x55aed1(0x45b),_0x55aed1(0x498),_0x55aed1(0x398),_0x55aed1(0x875),_0x55aed1(0x1f9),_0x55aed1(0x7aa),_0x55aed1(0x350),'titles1',_0x55aed1(0x1fe)];for(const _0x3e4cdb of _0x2600e0){const _0x4fbbcf=VisuMZ[_0x55aed1(0x7b7)]['Settings'][_0x55aed1(0x3e9)][_0x3e4cdb],_0x19be7b=_0x55aed1(0x6e8)[_0x55aed1(0x649)](_0x3e4cdb);for(const _0x4b0941 of _0x4fbbcf){ImageManager[_0x55aed1(0xa18)](_0x19be7b,_0x4b0941);}}},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x54e)]=Scene_Boot[_0x1c6d52(0x721)][_0x1c6d52(0x5d4)],Scene_Boot[_0x1c6d52(0x721)][_0x1c6d52(0x5d4)]=function(){const _0x3b615d=_0x1c6d52;Utils['isOptionValid'](_0x3b615d(0x218))&&VisuMZ[_0x3b615d(0x7b7)][_0x3b615d(0x719)][_0x3b615d(0x858)][_0x3b615d(0x72f)]?this[_0x3b615d(0x2df)]():VisuMZ[_0x3b615d(0x7b7)][_0x3b615d(0x54e)][_0x3b615d(0x78a)](this);},Scene_Boot['prototype'][_0x1c6d52(0x2df)]=function(){const _0x3b4092=_0x1c6d52;DataManager[_0x3b4092(0x276)](),SceneManager[_0x3b4092(0x92d)](Scene_Map);},Scene_Boot['prototype'][_0x1c6d52(0x848)]=function(){const _0x51c740=_0x1c6d52,_0x5ac501=$dataSystem['advanced'][_0x51c740(0x715)],_0x20e01d=$dataSystem[_0x51c740(0x7c8)]['uiAreaHeight'],_0x5b52f7=VisuMZ[_0x51c740(0x7b7)]['Settings']['UI'][_0x51c740(0x81c)];Graphics[_0x51c740(0x7ec)]=_0x5ac501-_0x5b52f7*0x2,Graphics[_0x51c740(0x471)]=_0x20e01d-_0x5b52f7*0x2,this[_0x51c740(0x611)]();},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x94f)]=Scene_Boot[_0x1c6d52(0x721)][_0x1c6d52(0x811)],Scene_Boot[_0x1c6d52(0x721)][_0x1c6d52(0x811)]=function(){const _0x4d2423=_0x1c6d52;this['isFullDocumentTitle']()?this[_0x4d2423(0x4a8)]():VisuMZ['CoreEngine'][_0x4d2423(0x94f)][_0x4d2423(0x78a)](this);},Scene_Boot[_0x1c6d52(0x721)][_0x1c6d52(0x654)]=function(){const _0xf20b2c=_0x1c6d52;if(Scene_Title[_0xf20b2c(0x1d1)]==='')return![];if(Scene_Title[_0xf20b2c(0x1d1)]===_0xf20b2c(0x365))return![];if(Scene_Title[_0xf20b2c(0x4c7)]==='')return![];if(Scene_Title['version']===_0xf20b2c(0x536))return![];return!![];},Scene_Boot['prototype'][_0x1c6d52(0x4a8)]=function(){const _0x3dca2c=_0x1c6d52,_0x246b10=$dataSystem['gameTitle'],_0x1e558b=Scene_Title[_0x3dca2c(0x1d1)]||'',_0xc27d1a=Scene_Title[_0x3dca2c(0x4c7)]||'',_0x3de320=VisuMZ[_0x3dca2c(0x7b7)][_0x3dca2c(0x719)][_0x3dca2c(0x664)][_0x3dca2c(0x8f8)][_0x3dca2c(0x469)],_0x3a02eb=_0x3de320['format'](_0x246b10,_0x1e558b,_0xc27d1a);document[_0x3dca2c(0x6f0)]=_0x3a02eb;},Scene_Boot[_0x1c6d52(0x721)][_0x1c6d52(0x611)]=function(){const _0x25b337=_0x1c6d52;if(VisuMZ[_0x25b337(0x7b7)][_0x25b337(0x719)]['UI'][_0x25b337(0x1ed)]){if(_0x25b337(0x1bb)===_0x25b337(0x1bb)){const _0x45d9b1=Graphics['width']-Graphics['boxWidth']-VisuMZ['CoreEngine'][_0x25b337(0x719)]['UI'][_0x25b337(0x81c)]*0x2,_0x16d9a2=Sprite_Button[_0x25b337(0x721)]['blockWidth'][_0x25b337(0x78a)](this)*0x4;if(_0x45d9b1>=_0x16d9a2)SceneManager[_0x25b337(0x84b)](!![]);}else{if(_0x1e7358[_0x25b337(0xa04)](_0x5f2056)){const _0x2cabba=_0x44275c[_0x25b337(0x7b7)][_0x25b337(0x83d)][_0x44438b],_0x59c320=_0x41a55e[_0x25b337(0x7b7)][_0x25b337(0x8fb)][_0x2cabba];return _0x59c320[_0x53b7b7]||this[_0x25b337(0x614)](_0x38b7d3);}}}},Scene_Title[_0x1c6d52(0x1d1)]=VisuMZ['CoreEngine'][_0x1c6d52(0x719)][_0x1c6d52(0x664)][_0x1c6d52(0x8f8)]['Subtitle'],Scene_Title[_0x1c6d52(0x4c7)]=VisuMZ['CoreEngine']['Settings']['MenuLayout'][_0x1c6d52(0x8f8)][_0x1c6d52(0x466)],Scene_Title[_0x1c6d52(0x93f)]=VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)][_0x1c6d52(0x596)],VisuMZ['CoreEngine'][_0x1c6d52(0x351)]=Scene_Title[_0x1c6d52(0x721)][_0x1c6d52(0x366)],Scene_Title[_0x1c6d52(0x721)][_0x1c6d52(0x366)]=function(){const _0x3e115b=_0x1c6d52;VisuMZ['CoreEngine'][_0x3e115b(0x719)][_0x3e115b(0x664)][_0x3e115b(0x8f8)][_0x3e115b(0x366)][_0x3e115b(0x78a)](this);if(Scene_Title[_0x3e115b(0x1d1)]!==''&&Scene_Title[_0x3e115b(0x1d1)]!==_0x3e115b(0x365))this[_0x3e115b(0x9a6)]();if(Scene_Title[_0x3e115b(0x4c7)]!==''&&Scene_Title[_0x3e115b(0x4c7)]!=='0.00')this[_0x3e115b(0x236)]();},Scene_Title[_0x1c6d52(0x721)]['drawGameSubtitle']=function(){const _0x424aed=_0x1c6d52;VisuMZ[_0x424aed(0x7b7)]['Settings'][_0x424aed(0x664)][_0x424aed(0x8f8)][_0x424aed(0x9a6)][_0x424aed(0x78a)](this);},Scene_Title[_0x1c6d52(0x721)][_0x1c6d52(0x236)]=function(){const _0x4da864=_0x1c6d52;VisuMZ[_0x4da864(0x7b7)][_0x4da864(0x719)][_0x4da864(0x664)][_0x4da864(0x8f8)][_0x4da864(0x236)][_0x4da864(0x78a)](this);},Scene_Title['prototype'][_0x1c6d52(0x2a9)]=function(){const _0x5d27b1=_0x1c6d52;this[_0x5d27b1(0x285)]();const _0x48af11=$dataSystem[_0x5d27b1(0x5eb)]['background'],_0x325f05=this['commandWindowRect']();this['_commandWindow']=new Window_TitleCommand(_0x325f05),this[_0x5d27b1(0x87f)][_0x5d27b1(0x87c)](_0x48af11);const _0x421ed9=this['commandWindowRect']();this[_0x5d27b1(0x87f)][_0x5d27b1(0x773)](_0x421ed9['x'],_0x421ed9['y'],_0x421ed9['width'],_0x421ed9[_0x5d27b1(0x81f)]),this['addWindow'](this[_0x5d27b1(0x87f)]);},Scene_Title[_0x1c6d52(0x721)][_0x1c6d52(0x221)]=function(){const _0x7e6a76=_0x1c6d52;return this['_commandWindow']?this[_0x7e6a76(0x87f)]['maxItems']():VisuMZ[_0x7e6a76(0x7b7)][_0x7e6a76(0x719)][_0x7e6a76(0x97f)]['length'];},Scene_Title['prototype'][_0x1c6d52(0x734)]=function(){const _0xbf9f31=_0x1c6d52;return VisuMZ[_0xbf9f31(0x7b7)][_0xbf9f31(0x719)][_0xbf9f31(0x664)]['Title'][_0xbf9f31(0x543)][_0xbf9f31(0x78a)](this);},Scene_Title[_0x1c6d52(0x721)][_0x1c6d52(0x285)]=function(){const _0x6c441a=_0x1c6d52;for(const _0x3a319f of Scene_Title[_0x6c441a(0x93f)]){if(_0x6c441a(0x3c9)!==_0x6c441a(0x595)){const _0x77ed6b=new Sprite_TitlePictureButton(_0x3a319f);this[_0x6c441a(0x81b)](_0x77ed6b);}else this[_0x6c441a(0x572)][_0x6c441a(0x8bf)]=!![],this[_0x6c441a(0x572)]['displayY']=_0x4fe6a3[_0x6c441a(0x1cf)]||0x0;}},VisuMZ[_0x1c6d52(0x7b7)]['Scene_Map_initialize']=Scene_Map['prototype'][_0x1c6d52(0x271)],Scene_Map[_0x1c6d52(0x721)][_0x1c6d52(0x271)]=function(){const _0x466043=_0x1c6d52;VisuMZ['CoreEngine'][_0x466043(0x39b)][_0x466043(0x78a)](this),$gameTemp[_0x466043(0x24a)](),this[_0x466043(0x914)]();},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x599)]=Scene_Map[_0x1c6d52(0x721)]['updateMainMultiply'],Scene_Map[_0x1c6d52(0x721)][_0x1c6d52(0x62b)]=function(){const _0x4380ff=_0x1c6d52;VisuMZ[_0x4380ff(0x7b7)][_0x4380ff(0x599)]['call'](this),$gameTemp[_0x4380ff(0x9b5)]&&!$gameMessage['isBusy']()&&(this[_0x4380ff(0x34c)](),SceneManager['updateEffekseer']());},Scene_Map['prototype'][_0x1c6d52(0x204)]=function(){const _0x11c46b=_0x1c6d52;Scene_Message[_0x11c46b(0x721)][_0x11c46b(0x204)]['call'](this),!SceneManager['isNextScene'](Scene_Battle)&&(_0x11c46b(0x71e)===_0x11c46b(0x89c)?_0x1c937e+=_0x1991a7:(this[_0x11c46b(0x87b)][_0x11c46b(0xa50)](),this[_0x11c46b(0x537)][_0x11c46b(0x84c)](),this[_0x11c46b(0x79c)][_0x11c46b(0x454)]=![],SceneManager[_0x11c46b(0x6a2)]())),$gameScreen['clearZoom'](),this[_0x11c46b(0x914)]();},VisuMZ[_0x1c6d52(0x7b7)]['Scene_Map_createMenuButton']=Scene_Map[_0x1c6d52(0x721)][_0x1c6d52(0x64d)],Scene_Map['prototype']['createMenuButton']=function(){const _0x22f638=_0x1c6d52;VisuMZ[_0x22f638(0x7b7)][_0x22f638(0x3bc)][_0x22f638(0x78a)](this);if(SceneManager[_0x22f638(0x9aa)]()){if(_0x22f638(0x38d)==='cUGWM')return _0x3f329a[_0x22f638(0x872)][_0x22f638(0x703)][_0x22f638(0x78a)](this);else this[_0x22f638(0x8b0)]();}},Scene_Map[_0x1c6d52(0x721)][_0x1c6d52(0x8b0)]=function(){const _0x38503a=_0x1c6d52;this['_menuButton']['x']=Graphics[_0x38503a(0x7ec)]+0x4;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x740)]=Scene_Map[_0x1c6d52(0x721)][_0x1c6d52(0x606)],Scene_Map['prototype'][_0x1c6d52(0x606)]=function(){const _0x1dfd8a=_0x1c6d52;VisuMZ[_0x1dfd8a(0x7b7)][_0x1dfd8a(0x740)][_0x1dfd8a(0x78a)](this),this[_0x1dfd8a(0x88b)]();},Scene_Map[_0x1c6d52(0x721)][_0x1c6d52(0x88b)]=function(){const _0x3e16c2=_0x1c6d52;Input[_0x3e16c2(0x68f)]('dashToggle')&&(ConfigManager[_0x3e16c2(0x831)]=!ConfigManager[_0x3e16c2(0x831)],ConfigManager[_0x3e16c2(0x309)]());},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x9ca)]=Scene_Map[_0x1c6d52(0x721)][_0x1c6d52(0x34c)],Scene_Map[_0x1c6d52(0x721)][_0x1c6d52(0x34c)]=function(){const _0x2846d5=_0x1c6d52;VisuMZ[_0x2846d5(0x7b7)][_0x2846d5(0x9ca)][_0x2846d5(0x78a)](this),this[_0x2846d5(0x477)]();},Scene_Map[_0x1c6d52(0x721)]['clearOnceParallelInterpreters']=function(){const _0x22bcc3=_0x1c6d52;this[_0x22bcc3(0x30e)]=[];},Scene_Map['prototype'][_0x1c6d52(0x477)]=function(){const _0x46eec8=_0x1c6d52;if(!this[_0x46eec8(0x30e)])return;for(const _0x466fc8 of this['_onceParallelInterpreters']){if('gwYGF'!==_0x46eec8(0x303)){this[_0x46eec8(0x2c5)]={};if(_0x3ea7f6[_0x46eec8(0x7b7)][_0x46eec8(0x719)][_0x46eec8(0x858)][_0x46eec8(0x845)])this['_hp']=this['mhp'];if(_0x1d08f9[_0x46eec8(0x7b7)][_0x46eec8(0x719)][_0x46eec8(0x858)][_0x46eec8(0x6c9)])this[_0x46eec8(0x934)]=this[_0x46eec8(0x25b)];}else{if(_0x466fc8){if('LfnmT'===_0x46eec8(0x822))_0x466fc8[_0x46eec8(0xa50)]();else{var _0xe42d03=_0x4192f3(_0x50b40b['$1'])/0x64;_0x4a2da0+=_0xe42d03;}}}}},Scene_Map[_0x1c6d52(0x721)][_0x1c6d52(0x694)]=function(_0x4148b3){const _0x5db3be=_0x1c6d52,_0x2562db=$dataCommonEvents[_0x4148b3];if(!_0x2562db)return;const _0x1dd8c4=new Game_OnceParallelInterpreter();this[_0x5db3be(0xa46)](_0x1dd8c4),_0x1dd8c4['setCommonEvent'](_0x4148b3);},Scene_Map[_0x1c6d52(0x721)][_0x1c6d52(0xa46)]=function(_0x5df1d7){const _0x11610f=_0x1c6d52;this[_0x11610f(0x30e)]=this['_onceParallelInterpreters']||[],this[_0x11610f(0x30e)][_0x11610f(0x430)](_0x5df1d7);},Scene_Map['prototype'][_0x1c6d52(0x3d6)]=function(_0x400513){const _0x1be320=_0x1c6d52;this[_0x1be320(0x30e)]=this[_0x1be320(0x30e)]||[],this[_0x1be320(0x30e)]['remove'](_0x400513);};function Game_OnceParallelInterpreter(){const _0x2c8e93=_0x1c6d52;this[_0x2c8e93(0x271)](...arguments);}Game_OnceParallelInterpreter[_0x1c6d52(0x721)]=Object[_0x1c6d52(0x317)](Game_Interpreter[_0x1c6d52(0x721)]),Game_OnceParallelInterpreter[_0x1c6d52(0x721)][_0x1c6d52(0x5ed)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x1c6d52(0x721)][_0x1c6d52(0x496)]=function(_0x288391){const _0xa0ab0f=_0x1c6d52,_0xc8221f=$dataCommonEvents[_0x288391];_0xc8221f?this[_0xa0ab0f(0x231)](_0xc8221f[_0xa0ab0f(0x5c4)],0x0):this[_0xa0ab0f(0x204)]();},Game_OnceParallelInterpreter[_0x1c6d52(0x721)][_0x1c6d52(0x204)]=function(){const _0x409831=_0x1c6d52;if(!SceneManager[_0x409831(0x8cc)]())return;SceneManager[_0x409831(0x62e)][_0x409831(0x3d6)](this),Game_Interpreter[_0x409831(0x721)]['terminate'][_0x409831(0x78a)](this);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0xa1c)]=Scene_MenuBase[_0x1c6d52(0x721)]['helpAreaTop'],Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x5a9)]=function(){const _0x33f532=_0x1c6d52;let _0x298869=0x0;if(SceneManager[_0x33f532(0x931)]()){if(_0x33f532(0x31b)===_0x33f532(0x5ce)){const _0x29e250={'x':_0x501012,'y':_0x351f7e,'animationId':_0x407432,'mirror':_0x213540,'mute':_0x4b3212};this['_pointAnimationQueue'][_0x33f532(0x430)](_0x29e250);}else _0x298869=this[_0x33f532(0x24d)]();}else{if(_0x33f532(0x98c)!==_0x33f532(0x7ce))_0x298869=VisuMZ[_0x33f532(0x7b7)]['Scene_MenuBase_helpAreaTop'][_0x33f532(0x78a)](this);else return _0x2533cd[_0x33f532(0x7b7)][_0x33f532(0x6d3)][_0x33f532(0x78a)](this);}return _0x298869;},Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x24d)]=function(){const _0x4ae783=_0x1c6d52;return this[_0x4ae783(0x9f8)]()?this[_0x4ae783(0x9b1)]():0x0;},VisuMZ[_0x1c6d52(0x7b7)]['Scene_MenuBase_mainAreaTop']=Scene_MenuBase['prototype'][_0x1c6d52(0x9af)],Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x9af)]=function(){const _0x527450=_0x1c6d52;if(SceneManager[_0x527450(0x931)]())return this[_0x527450(0x3ef)]();else{if(_0x527450(0x82a)===_0x527450(0x566))_0x1f9c22[_0x527450(0x7b7)][_0x527450(0x719)][_0x527450(0x858)]['ForceNoPlayTest']&&(this[_0x527450(0x3b6)]=![]);else return VisuMZ[_0x527450(0x7b7)][_0x527450(0x8c7)]['call'](this);}},Scene_MenuBase['prototype'][_0x1c6d52(0x3ef)]=function(){const _0xb85da1=_0x1c6d52;if(!this[_0xb85da1(0x9f8)]())return this[_0xb85da1(0x8a7)]();else return this[_0xb85da1(0x912)]()&&this['getButtonAssistLocation']()===_0xb85da1(0x72d)?Window_ButtonAssist[_0xb85da1(0x721)][_0xb85da1(0x800)]():0x0;},VisuMZ[_0x1c6d52(0x7b7)]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase['prototype']['mainAreaHeight'],Scene_MenuBase['prototype'][_0x1c6d52(0x50f)]=function(){const _0x196594=_0x1c6d52;let _0x335134=0x0;if(SceneManager[_0x196594(0x931)]())_0x335134=this['mainAreaHeightSideButtonLayout']();else{if(_0x196594(0x920)===_0x196594(0x51f)){if(!_0xe7aa2b[_0x196594(0x1c7)]())return;if(!_0x53172a[_0x196594(0x75b)]())return;_0x2dc4e7[_0x196594(0x394)](_0xa3b17e,_0x20626e);const _0x16e1df=_0xf8e8f['PictureID']||0x1;_0x1302d7[_0x196594(0x878)]=_0x16e1df;}else _0x335134=VisuMZ['CoreEngine'][_0x196594(0x4ed)][_0x196594(0x78a)](this);}return this['isMenuButtonAssistEnabled']()&&this['getButtonAssistLocation']()!=='button'&&(_0x335134-=Window_ButtonAssist[_0x196594(0x721)]['lineHeight']()),_0x335134;},Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x486)]=function(){const _0x5392a1=_0x1c6d52;return Graphics[_0x5392a1(0x471)]-this['helpAreaHeight']();},VisuMZ['CoreEngine'][_0x1c6d52(0x9e0)]=Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x632)],Scene_MenuBase['prototype'][_0x1c6d52(0x632)]=function(){const _0x3cbf31=_0x1c6d52;this['_backgroundFilter']=new PIXI[(_0x3cbf31(0x946))][(_0x3cbf31(0x3b0))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0x3cbf31(0x2c0)][_0x3cbf31(0x33a)]=SceneManager[_0x3cbf31(0x78d)](),this[_0x3cbf31(0x2c0)]['filters']=[this[_0x3cbf31(0x9db)]],this[_0x3cbf31(0x81b)](this[_0x3cbf31(0x2c0)]),this[_0x3cbf31(0x8ea)](0xc0),this[_0x3cbf31(0x8ea)](this[_0x3cbf31(0x587)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x587)]=function(){const _0x5d37a7=_0x1c6d52,_0x100832=String(this[_0x5d37a7(0x5ed)][_0x5d37a7(0x4fb)]),_0x41a632=this['getCustomBackgroundSettings'](_0x100832);if(_0x41a632){if(_0x5d37a7(0xa26)===_0x5d37a7(0x83c)){let _0x3a4a66=this[_0x5d37a7(0x31f)]();this[_0x5d37a7(0x3de)]()&&(_0x3a4a66=_0x23d710['GroupDigits'](_0x3a4a66));const _0x3bdfcb=this[_0x5d37a7(0x46a)]()-0x1,_0x400e5d=this[_0x5d37a7(0x6e9)]?this[_0x5d37a7(0x6e9)]():this[_0x5d37a7(0x50e)]();this[_0x5d37a7(0x749)](),this[_0x5d37a7(0x33a)][_0x5d37a7(0x60d)](_0x3a4a66,0x0,0x0,_0x3bdfcb,_0x400e5d,'right');}else return _0x41a632[_0x5d37a7(0x2af)];}else return 0xc0;},Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x77f)]=function(){const _0x37c7d5=_0x1c6d52,_0x950eb1=String(this[_0x37c7d5(0x5ed)][_0x37c7d5(0x4fb)]),_0x311475=this[_0x37c7d5(0x427)](_0x950eb1);_0x311475&&(_0x311475['BgFilename1']!==''||_0x311475[_0x37c7d5(0x49b)]!=='')&&(this[_0x37c7d5(0x979)]=new Sprite(ImageManager['loadTitle1'](_0x311475[_0x37c7d5(0x356)])),this['_backSprite2']=new Sprite(ImageManager['loadTitle2'](_0x311475[_0x37c7d5(0x49b)])),this['addChild'](this[_0x37c7d5(0x979)]),this[_0x37c7d5(0x81b)](this['_backSprite2']),this[_0x37c7d5(0x979)][_0x37c7d5(0x33a)][_0x37c7d5(0x215)](this[_0x37c7d5(0x42b)][_0x37c7d5(0x2fe)](this,this[_0x37c7d5(0x979)])),this['_backSprite2'][_0x37c7d5(0x33a)][_0x37c7d5(0x215)](this[_0x37c7d5(0x42b)]['bind'](this,this[_0x37c7d5(0x583)])));},Scene_MenuBase['prototype'][_0x1c6d52(0x427)]=function(_0xf16b31){const _0x38efec=_0x1c6d52;return VisuMZ[_0x38efec(0x7b7)][_0x38efec(0x719)][_0x38efec(0x4f7)][_0xf16b31]||VisuMZ['CoreEngine']['Settings']['MenuBg'][_0x38efec(0x2f8)];},Scene_MenuBase[_0x1c6d52(0x721)]['adjustSprite']=function(_0x1bc587){const _0x42d046=_0x1c6d52;this[_0x42d046(0x646)](_0x1bc587),this[_0x42d046(0x8c4)](_0x1bc587);},VisuMZ['CoreEngine'][_0x1c6d52(0x31e)]=Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x46b)],Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x46b)]=function(){const _0x3e93c7=_0x1c6d52;VisuMZ[_0x3e93c7(0x7b7)][_0x3e93c7(0x31e)]['call'](this),SceneManager[_0x3e93c7(0x9aa)]()&&this[_0x3e93c7(0x585)]();},Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x585)]=function(){const _0x201fbc=_0x1c6d52;this[_0x201fbc(0xa12)]['x']=Graphics[_0x201fbc(0x7ec)]+0x4;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x29c)]=Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x2fb)],Scene_MenuBase['prototype']['createPageButtons']=function(){const _0x38c26b=_0x1c6d52;VisuMZ['CoreEngine'][_0x38c26b(0x29c)][_0x38c26b(0x78a)](this),SceneManager['isSideButtonLayout']()&&(_0x38c26b(0x6c5)!==_0x38c26b(0x4f5)?this['movePageButtonSideButtonLayout']():this[_0x38c26b(0x631)]());},Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x680)]=function(){const _0x5bf41e=_0x1c6d52;this[_0x5bf41e(0x24b)]['x']=-0x1*(this['_pageupButton']['width']+this[_0x5bf41e(0x682)]['width']+0x8),this[_0x5bf41e(0x682)]['x']=-0x1*(this[_0x5bf41e(0x682)]['width']+0x4);},Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x912)]=function(){const _0x2241ec=_0x1c6d52;return VisuMZ[_0x2241ec(0x7b7)][_0x2241ec(0x719)][_0x2241ec(0x96c)][_0x2241ec(0x992)];},Scene_MenuBase['prototype'][_0x1c6d52(0x9c6)]=function(){const _0x4d2db8=_0x1c6d52;if(SceneManager['isSideButtonLayout']()||SceneManager[_0x4d2db8(0x1d2)]())return VisuMZ[_0x4d2db8(0x7b7)][_0x4d2db8(0x719)][_0x4d2db8(0x96c)][_0x4d2db8(0x412)];else{if(_0x4d2db8(0x67f)!==_0x4d2db8(0x2f2))return _0x4d2db8(0x339);else this[_0x4d2db8(0x750)]={},_0x35cd27[_0x4d2db8(0x721)][_0x4d2db8(0x271)][_0x4d2db8(0x78a)](this,_0x78d988),this[_0x4d2db8(0x87c)](_0x1e8f42[_0x4d2db8(0x7b7)][_0x4d2db8(0x719)][_0x4d2db8(0x96c)]['BgType']||0x0),this[_0x4d2db8(0x7ae)]();}},Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x96d)]=function(){const _0x231b56=_0x1c6d52;if(!this['isMenuButtonAssistEnabled']())return;const _0x266701=this[_0x231b56(0x7cc)]();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x266701),this[_0x231b56(0x8bb)](this[_0x231b56(0x312)]);},Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x7cc)]=function(){const _0x98381f=_0x1c6d52;if(this[_0x98381f(0x9c6)]()===_0x98381f(0x339))return _0x98381f(0x6f9)==='mnbvw'?this[_0x98381f(0x8a4)]():_0x2684bd[_0x98381f(0x872)]['CommandRect']['call'](this);else{if(_0x98381f(0x1bf)===_0x98381f(0x4ce)){const _0x3310e4=_0x3f30b3[_0x98381f(0x6ba)]?(_0x1e4073[_0x98381f(0x721)][_0x98381f(0x370)]()+0x6)*0x2:0x0,_0x25af7e=this[_0x98381f(0x963)](),_0x5de669=_0x3b60eb['boxWidth']-_0x3310e4*0x2,_0x440395=this[_0x98381f(0x4e0)]();return new _0x4adf27(_0x3310e4,_0x25af7e,_0x5de669,_0x440395);}else return this[_0x98381f(0x355)]();}},Scene_MenuBase['prototype'][_0x1c6d52(0x8a4)]=function(){const _0x1307f5=_0x1c6d52,_0xc28fd7=ConfigManager[_0x1307f5(0x6ba)]?(Sprite_Button[_0x1307f5(0x721)]['blockWidth']()+0x6)*0x2:0x0,_0x4afd7b=this[_0x1307f5(0x963)](),_0x1ffbfd=Graphics[_0x1307f5(0x7ec)]-_0xc28fd7*0x2,_0x2fd8a8=this[_0x1307f5(0x4e0)]();return new Rectangle(_0xc28fd7,_0x4afd7b,_0x1ffbfd,_0x2fd8a8);},Scene_MenuBase[_0x1c6d52(0x721)][_0x1c6d52(0x355)]=function(){const _0x38896b=_0x1c6d52,_0x38bdea=Graphics['boxWidth'],_0x1eb351=Window_ButtonAssist['prototype'][_0x38896b(0x800)](),_0x34cdba=0x0;let _0x5d53ab=0x0;return this[_0x38896b(0x9c6)]()==='top'?_0x5d53ab=0x0:_0x38896b(0x6b4)!==_0x38896b(0x6b4)?(_0x31ee7e[_0x38896b(0x7b7)][_0x38896b(0xa0f)][_0x38896b(0x78a)](this),this[_0x38896b(0x1d9)](),this[_0x38896b(0x67d)](),this[_0x38896b(0x9c7)]()):_0x5d53ab=Graphics['boxHeight']-_0x1eb351,new Rectangle(_0x34cdba,_0x5d53ab,_0x38bdea,_0x1eb351);},Scene_Menu[_0x1c6d52(0x872)]=VisuMZ['CoreEngine']['Settings'][_0x1c6d52(0x664)][_0x1c6d52(0x491)],VisuMZ[_0x1c6d52(0x7b7)]['Scene_Menu_create']=Scene_Menu[_0x1c6d52(0x721)][_0x1c6d52(0x317)],Scene_Menu[_0x1c6d52(0x721)]['create']=function(){const _0x27aff6=_0x1c6d52;VisuMZ[_0x27aff6(0x7b7)][_0x27aff6(0x924)][_0x27aff6(0x78a)](this),this[_0x27aff6(0x80f)]();},Scene_Menu[_0x1c6d52(0x721)][_0x1c6d52(0x80f)]=function(){const _0x4fdf9a=_0x1c6d52;this[_0x4fdf9a(0x87f)]&&this[_0x4fdf9a(0x87f)][_0x4fdf9a(0x87c)](Scene_Menu[_0x4fdf9a(0x872)][_0x4fdf9a(0x7a7)]),this[_0x4fdf9a(0x752)]&&this[_0x4fdf9a(0x752)][_0x4fdf9a(0x87c)](Scene_Menu[_0x4fdf9a(0x872)][_0x4fdf9a(0x420)]),this[_0x4fdf9a(0x40f)]&&(_0x4fdf9a(0x8ba)==='ARGfd'?this[_0x4fdf9a(0x40f)][_0x4fdf9a(0x87c)](Scene_Menu[_0x4fdf9a(0x872)][_0x4fdf9a(0x362)]):(this[_0x4fdf9a(0x43c)](_0x159611,_0x578c41,_0x27e8e9,this[_0x4fdf9a(0x405)]()),_0x1a19cb-=this['gaugeLineHeight']()+0x2,_0x2aef03+=this['gaugeLineHeight']()+0x2));},Scene_Menu['prototype'][_0x1c6d52(0x734)]=function(){const _0x2a1149=_0x1c6d52;return Scene_Menu['layoutSettings'][_0x2a1149(0x543)][_0x2a1149(0x78a)](this);},Scene_Menu[_0x1c6d52(0x721)][_0x1c6d52(0x5cb)]=function(){return Scene_Menu['layoutSettings']['GoldRect']['call'](this);},Scene_Menu[_0x1c6d52(0x721)][_0x1c6d52(0x66e)]=function(){const _0x57eb5d=_0x1c6d52;return Scene_Menu[_0x57eb5d(0x872)]['StatusRect']['call'](this);},Scene_Item[_0x1c6d52(0x872)]=VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)][_0x1c6d52(0x664)][_0x1c6d52(0x873)],VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x4fc)]=Scene_Item['prototype']['create'],Scene_Item[_0x1c6d52(0x721)][_0x1c6d52(0x317)]=function(){const _0x26999e=_0x1c6d52;VisuMZ[_0x26999e(0x7b7)][_0x26999e(0x4fc)][_0x26999e(0x78a)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item[_0x1c6d52(0x721)][_0x1c6d52(0x80f)]=function(){const _0x42e909=_0x1c6d52;if(this[_0x42e909(0x990)]){if(_0x42e909(0x1e7)!==_0x42e909(0x741))this[_0x42e909(0x990)]['setBackgroundType'](Scene_Item[_0x42e909(0x872)][_0x42e909(0x7b1)]);else return _0x1d861c[_0x42e909(0x7b7)][_0x42e909(0x719)]['QoL'][_0x42e909(0x77b)];}this[_0x42e909(0x686)]&&this[_0x42e909(0x686)][_0x42e909(0x87c)](Scene_Item[_0x42e909(0x872)]['CategoryBgType']),this['_itemWindow']&&(_0x42e909(0x82b)!=='JjRXQ'?this[_0x42e909(0x5c1)]['setBackgroundType'](Scene_Item[_0x42e909(0x872)][_0x42e909(0x59c)]):_0x505b10[_0x42e909(0x7b7)][_0x42e909(0x54e)]['call'](this)),this['_actorWindow']&&this[_0x42e909(0x7ef)]['setBackgroundType'](Scene_Item[_0x42e909(0x872)][_0x42e909(0x935)]);},Scene_Item[_0x1c6d52(0x721)]['helpWindowRect']=function(){const _0x1cb270=_0x1c6d52;return Scene_Item[_0x1cb270(0x872)]['HelpRect']['call'](this);},Scene_Item[_0x1c6d52(0x721)][_0x1c6d52(0x594)]=function(){const _0x5639ce=_0x1c6d52;return Scene_Item[_0x5639ce(0x872)][_0x5639ce(0x79d)][_0x5639ce(0x78a)](this);},Scene_Item[_0x1c6d52(0x721)][_0x1c6d52(0x94a)]=function(){const _0x17189e=_0x1c6d52;return Scene_Item[_0x17189e(0x872)]['ItemRect']['call'](this);},Scene_Item['prototype'][_0x1c6d52(0x27e)]=function(){const _0x157658=_0x1c6d52;return Scene_Item[_0x157658(0x872)][_0x157658(0x79f)][_0x157658(0x78a)](this);},Scene_Skill[_0x1c6d52(0x872)]=VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)]['MenuLayout'][_0x1c6d52(0x426)],VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x514)]=Scene_Skill[_0x1c6d52(0x721)][_0x1c6d52(0x317)],Scene_Skill[_0x1c6d52(0x721)][_0x1c6d52(0x317)]=function(){const _0x3b3860=_0x1c6d52;VisuMZ[_0x3b3860(0x7b7)]['Scene_Skill_create'][_0x3b3860(0x78a)](this),this[_0x3b3860(0x80f)]();},Scene_Skill[_0x1c6d52(0x721)][_0x1c6d52(0x80f)]=function(){const _0x2de8e5=_0x1c6d52;this[_0x2de8e5(0x990)]&&(_0x2de8e5(0x625)!==_0x2de8e5(0x625)?this['_forcedTroopView']='SV':this[_0x2de8e5(0x990)][_0x2de8e5(0x87c)](Scene_Skill[_0x2de8e5(0x872)][_0x2de8e5(0x7b1)])),this[_0x2de8e5(0x3e3)]&&('gCkHB'===_0x2de8e5(0x7b4)?this['bitmap']['destroy']():this[_0x2de8e5(0x3e3)][_0x2de8e5(0x87c)](Scene_Skill['layoutSettings'][_0x2de8e5(0x472)])),this[_0x2de8e5(0x40f)]&&this[_0x2de8e5(0x40f)][_0x2de8e5(0x87c)](Scene_Skill[_0x2de8e5(0x872)]['StatusBgType']),this[_0x2de8e5(0x5c1)]&&this[_0x2de8e5(0x5c1)][_0x2de8e5(0x87c)](Scene_Skill[_0x2de8e5(0x872)][_0x2de8e5(0x59c)]),this[_0x2de8e5(0x7ef)]&&this[_0x2de8e5(0x7ef)]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x2de8e5(0x935)]);},Scene_Skill[_0x1c6d52(0x721)][_0x1c6d52(0x459)]=function(){const _0x3c4eac=_0x1c6d52;return Scene_Skill[_0x3c4eac(0x872)][_0x3c4eac(0x579)]['call'](this);},Scene_Skill['prototype'][_0x1c6d52(0x7c0)]=function(){const _0x3b3582=_0x1c6d52;return Scene_Skill[_0x3b3582(0x872)][_0x3b3582(0x582)][_0x3b3582(0x78a)](this);},Scene_Skill[_0x1c6d52(0x721)][_0x1c6d52(0x66e)]=function(){const _0x2f7bd9=_0x1c6d52;return Scene_Skill[_0x2f7bd9(0x872)][_0x2f7bd9(0x6f2)][_0x2f7bd9(0x78a)](this);},Scene_Skill[_0x1c6d52(0x721)][_0x1c6d52(0x94a)]=function(){const _0x5b22f8=_0x1c6d52;return Scene_Skill[_0x5b22f8(0x872)][_0x5b22f8(0x703)][_0x5b22f8(0x78a)](this);},Scene_Skill['prototype'][_0x1c6d52(0x27e)]=function(){const _0x4f8849=_0x1c6d52;return Scene_Skill[_0x4f8849(0x872)]['ActorRect'][_0x4f8849(0x78a)](this);},Scene_Equip[_0x1c6d52(0x872)]=VisuMZ['CoreEngine'][_0x1c6d52(0x719)][_0x1c6d52(0x664)][_0x1c6d52(0x377)],VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x80d)]=Scene_Equip['prototype'][_0x1c6d52(0x317)],Scene_Equip[_0x1c6d52(0x721)]['create']=function(){const _0x5a2032=_0x1c6d52;VisuMZ[_0x5a2032(0x7b7)][_0x5a2032(0x80d)][_0x5a2032(0x78a)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip[_0x1c6d52(0x721)]['setCoreEngineUpdateWindowBg']=function(){const _0x551e10=_0x1c6d52;if(this[_0x551e10(0x990)]){if(_0x551e10(0x86c)==='psebv'){if(_0x55461b)_0x418b3f['ParseItemNotetags'](_0x2da2d8);}else this['_helpWindow'][_0x551e10(0x87c)](Scene_Equip['layoutSettings']['HelpBgType']);}this[_0x551e10(0x40f)]&&this[_0x551e10(0x40f)]['setBackgroundType'](Scene_Equip[_0x551e10(0x872)][_0x551e10(0x362)]);if(this[_0x551e10(0x87f)]){if(_0x551e10(0x51a)===_0x551e10(0x3ca))for(const _0x405aa3 of _0x2dd8e7[_0x551e10(0x699)]){if(_0x405aa3[_0x551e10(0x8f1)]['call'](this)){const _0x2786aa=_0x405aa3[_0x551e10(0x59e)];let _0x13574e=_0x405aa3['TextStr'];if(['',_0x551e10(0x3d3)]['includes'](_0x13574e))_0x13574e=_0x405aa3[_0x551e10(0x2e6)][_0x551e10(0x78a)](this);const _0x2bdda6=_0x405aa3['EnableJS'][_0x551e10(0x78a)](this),_0x100c7a=_0x405aa3[_0x551e10(0x22b)][_0x551e10(0x78a)](this);this[_0x551e10(0x53b)](_0x13574e,_0x2786aa,_0x2bdda6,_0x100c7a),this['setHandler'](_0x2786aa,_0x405aa3[_0x551e10(0x67e)][_0x551e10(0x2fe)](this,_0x100c7a));}}else this[_0x551e10(0x87f)][_0x551e10(0x87c)](Scene_Equip[_0x551e10(0x872)]['CommandBgType']);}this[_0x551e10(0x907)]&&this['_slotWindow'][_0x551e10(0x87c)](Scene_Equip['layoutSettings']['SlotBgType']);if(this[_0x551e10(0x5c1)]){if(_0x551e10(0x367)===_0x551e10(0x3f1)){const _0x3afa44=_0x604234['deflate'](_0x26c4ad,{'to':_0x551e10(0x39d),'level':0x1});if(_0x3afa44[_0x551e10(0x3bf)]>=0xc350){}_0xcefdfe(_0x3afa44);}else this['_itemWindow'][_0x551e10(0x87c)](Scene_Equip['layoutSettings']['ItemBgType']);}},Scene_Equip['prototype'][_0x1c6d52(0x459)]=function(){const _0x9a55f5=_0x1c6d52;return Scene_Equip['layoutSettings'][_0x9a55f5(0x579)][_0x9a55f5(0x78a)](this);},Scene_Equip['prototype']['statusWindowRect']=function(){const _0x4e91fc=_0x1c6d52;return Scene_Equip[_0x4e91fc(0x872)][_0x4e91fc(0x6f2)][_0x4e91fc(0x78a)](this);},Scene_Equip[_0x1c6d52(0x721)][_0x1c6d52(0x734)]=function(){const _0x19ce56=_0x1c6d52;return Scene_Equip[_0x19ce56(0x872)][_0x19ce56(0x543)][_0x19ce56(0x78a)](this);},Scene_Equip['prototype'][_0x1c6d52(0x713)]=function(){const _0x2ec3ff=_0x1c6d52;return Scene_Equip['layoutSettings'][_0x2ec3ff(0x32c)][_0x2ec3ff(0x78a)](this);},Scene_Equip[_0x1c6d52(0x721)][_0x1c6d52(0x94a)]=function(){const _0x21901a=_0x1c6d52;return Scene_Equip['layoutSettings'][_0x21901a(0x703)][_0x21901a(0x78a)](this);},Scene_Status[_0x1c6d52(0x872)]=VisuMZ[_0x1c6d52(0x7b7)]['Settings'][_0x1c6d52(0x664)]['StatusMenu'],VisuMZ[_0x1c6d52(0x7b7)]['Scene_Status_create']=Scene_Status[_0x1c6d52(0x721)][_0x1c6d52(0x317)],Scene_Status['prototype'][_0x1c6d52(0x317)]=function(){const _0x456f9d=_0x1c6d52;VisuMZ[_0x456f9d(0x7b7)][_0x456f9d(0x2ef)][_0x456f9d(0x78a)](this),this[_0x456f9d(0x80f)]();},Scene_Status[_0x1c6d52(0x721)][_0x1c6d52(0x80f)]=function(){const _0x426493=_0x1c6d52;this['_profileWindow']&&this[_0x426493(0x4a9)]['setBackgroundType'](Scene_Status[_0x426493(0x872)][_0x426493(0x416)]),this[_0x426493(0x40f)]&&this[_0x426493(0x40f)]['setBackgroundType'](Scene_Status[_0x426493(0x872)][_0x426493(0x362)]),this['_statusParamsWindow']&&this[_0x426493(0x3df)][_0x426493(0x87c)](Scene_Status[_0x426493(0x872)][_0x426493(0x3cc)]),this[_0x426493(0x9ce)]&&this[_0x426493(0x9ce)][_0x426493(0x87c)](Scene_Status[_0x426493(0x872)][_0x426493(0x7d9)]);},Scene_Status[_0x1c6d52(0x721)][_0x1c6d52(0xa06)]=function(){const _0xbc61=_0x1c6d52;return Scene_Status[_0xbc61(0x872)]['ProfileRect'][_0xbc61(0x78a)](this);},Scene_Status[_0x1c6d52(0x721)][_0x1c6d52(0x66e)]=function(){const _0x180fdc=_0x1c6d52;return Scene_Status[_0x180fdc(0x872)][_0x180fdc(0x6f2)][_0x180fdc(0x78a)](this);},Scene_Status[_0x1c6d52(0x721)][_0x1c6d52(0x926)]=function(){const _0x42d786=_0x1c6d52;return Scene_Status[_0x42d786(0x872)]['StatusParamsRect'][_0x42d786(0x78a)](this);},Scene_Status[_0x1c6d52(0x721)][_0x1c6d52(0x1fa)]=function(){const _0x261e62=_0x1c6d52;return Scene_Status[_0x261e62(0x872)][_0x261e62(0x2c3)]['call'](this);},Scene_Options['layoutSettings']=VisuMZ['CoreEngine'][_0x1c6d52(0x719)][_0x1c6d52(0x664)][_0x1c6d52(0x7bc)],VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x282)]=Scene_Options[_0x1c6d52(0x721)][_0x1c6d52(0x317)],Scene_Options['prototype'][_0x1c6d52(0x317)]=function(){const _0x23cc8d=_0x1c6d52;VisuMZ[_0x23cc8d(0x7b7)][_0x23cc8d(0x282)][_0x23cc8d(0x78a)](this),this[_0x23cc8d(0x80f)]();},Scene_Options[_0x1c6d52(0x721)][_0x1c6d52(0x80f)]=function(){const _0x13af80=_0x1c6d52;this[_0x13af80(0x82c)]&&(_0x13af80(0x8af)===_0x13af80(0x5fb)?this[_0x13af80(0x3db)](_0x13af80(0x66c)):this[_0x13af80(0x82c)][_0x13af80(0x87c)](Scene_Options[_0x13af80(0x872)][_0x13af80(0x8cf)]));},Scene_Options['prototype'][_0x1c6d52(0x228)]=function(){const _0x2c2eb3=_0x1c6d52;return Scene_Options[_0x2c2eb3(0x872)][_0x2c2eb3(0x5cc)][_0x2c2eb3(0x78a)](this);},Scene_Save[_0x1c6d52(0x872)]=VisuMZ[_0x1c6d52(0x7b7)]['Settings']['MenuLayout'][_0x1c6d52(0x60b)],Scene_Save[_0x1c6d52(0x721)]['create']=function(){const _0x257bd6=_0x1c6d52;Scene_File[_0x257bd6(0x721)][_0x257bd6(0x317)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save[_0x1c6d52(0x721)]['setCoreEngineUpdateWindowBg']=function(){const _0x59a5b1=_0x1c6d52;this['_helpWindow']&&this[_0x59a5b1(0x990)][_0x59a5b1(0x87c)](Scene_Save[_0x59a5b1(0x872)]['HelpBgType']),this['_listWindow']&&this[_0x59a5b1(0x6dd)][_0x59a5b1(0x87c)](Scene_Save[_0x59a5b1(0x872)]['ListBgType']);},Scene_Save[_0x1c6d52(0x721)][_0x1c6d52(0x459)]=function(){const _0x279c42=_0x1c6d52;return Scene_Save[_0x279c42(0x872)]['HelpRect']['call'](this);},Scene_Save[_0x1c6d52(0x721)][_0x1c6d52(0xa48)]=function(){const _0x2f0a29=_0x1c6d52;return Scene_Save[_0x2f0a29(0x872)][_0x2f0a29(0x44b)][_0x2f0a29(0x78a)](this);},Scene_Load[_0x1c6d52(0x872)]=VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)][_0x1c6d52(0x664)][_0x1c6d52(0x8d4)],Scene_Load[_0x1c6d52(0x721)][_0x1c6d52(0x317)]=function(){const _0x37af1c=_0x1c6d52;Scene_File[_0x37af1c(0x721)][_0x37af1c(0x317)]['call'](this),this[_0x37af1c(0x80f)]();},Scene_Load[_0x1c6d52(0x721)][_0x1c6d52(0x80f)]=function(){const _0x353f7d=_0x1c6d52;this[_0x353f7d(0x990)]&&this['_helpWindow'][_0x353f7d(0x87c)](Scene_Load[_0x353f7d(0x872)][_0x353f7d(0x7b1)]),this[_0x353f7d(0x6dd)]&&this['_listWindow'][_0x353f7d(0x87c)](Scene_Load[_0x353f7d(0x872)][_0x353f7d(0xa0b)]);},Scene_Load[_0x1c6d52(0x721)][_0x1c6d52(0x459)]=function(){const _0x48caac=_0x1c6d52;return Scene_Load[_0x48caac(0x872)][_0x48caac(0x579)]['call'](this);},Scene_Load[_0x1c6d52(0x721)][_0x1c6d52(0xa48)]=function(){const _0x19002b=_0x1c6d52;return Scene_Load[_0x19002b(0x872)][_0x19002b(0x44b)][_0x19002b(0x78a)](this);},Scene_GameEnd['layoutSettings']=VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)]['MenuLayout'][_0x1c6d52(0x419)],VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x8d7)]=Scene_GameEnd[_0x1c6d52(0x721)][_0x1c6d52(0x632)],Scene_GameEnd[_0x1c6d52(0x721)][_0x1c6d52(0x632)]=function(){const _0x486e15=_0x1c6d52;Scene_MenuBase['prototype']['createBackground'][_0x486e15(0x78a)](this);},Scene_GameEnd['prototype']['createCommandWindow']=function(){const _0x227e53=_0x1c6d52,_0x3eb896=this[_0x227e53(0x734)]();this[_0x227e53(0x87f)]=new Window_GameEnd(_0x3eb896),this[_0x227e53(0x87f)][_0x227e53(0xa00)](_0x227e53(0x908),this[_0x227e53(0x7d6)][_0x227e53(0x2fe)](this)),this[_0x227e53(0x8bb)](this[_0x227e53(0x87f)]),this[_0x227e53(0x87f)][_0x227e53(0x87c)](Scene_GameEnd[_0x227e53(0x872)][_0x227e53(0x7a7)]);},Scene_GameEnd[_0x1c6d52(0x721)]['commandWindowRect']=function(){const _0x158b14=_0x1c6d52;return Scene_GameEnd['layoutSettings'][_0x158b14(0x543)][_0x158b14(0x78a)](this);},Scene_Shop[_0x1c6d52(0x872)]=VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)]['MenuLayout'][_0x1c6d52(0x77c)],VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x380)]=Scene_Shop['prototype']['create'],Scene_Shop['prototype'][_0x1c6d52(0x317)]=function(){const _0x144407=_0x1c6d52;VisuMZ[_0x144407(0x7b7)][_0x144407(0x380)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x1c6d52(0x721)][_0x1c6d52(0x80f)]=function(){const _0x1e483a=_0x1c6d52;this['_helpWindow']&&this[_0x1e483a(0x990)][_0x1e483a(0x87c)](Scene_Shop['layoutSettings'][_0x1e483a(0x7b1)]);if(this['_goldWindow']){if(_0x1e483a(0x1c8)!==_0x1e483a(0x292))this[_0x1e483a(0x752)][_0x1e483a(0x87c)](Scene_Shop['layoutSettings'][_0x1e483a(0x420)]);else{if(!this[_0x1e483a(0xa1b)])return![];return _0x4d757d['CoreEngine'][_0x1e483a(0x719)][_0x1e483a(0x6b8)][_0x1e483a(0x38a)];}}this['_commandWindow']&&this[_0x1e483a(0x87f)]['setBackgroundType'](Scene_Shop[_0x1e483a(0x872)][_0x1e483a(0x7a7)]);if(this[_0x1e483a(0x308)]){if(_0x1e483a(0x639)!=='nLZAG')return!![];else this[_0x1e483a(0x308)]['setBackgroundType'](Scene_Shop[_0x1e483a(0x872)][_0x1e483a(0x627)]);}this[_0x1e483a(0x41a)]&&('oqRmc'===_0x1e483a(0x1c1)?this[_0x1e483a(0x41a)][_0x1e483a(0x87c)](Scene_Shop[_0x1e483a(0x872)][_0x1e483a(0x9a7)]):(_0x4318d[_0x1e483a(0x261)](),this['switchModes'](_0x1e483a(0x445)))),this['_statusWindow']&&(_0x1e483a(0x5cd)!=='nuvca'?this[_0x1e483a(0x59d)]=![]:this[_0x1e483a(0x40f)]['setBackgroundType'](Scene_Shop[_0x1e483a(0x872)]['StatusBgType'])),this[_0x1e483a(0x89d)]&&this['_buyWindow'][_0x1e483a(0x87c)](Scene_Shop[_0x1e483a(0x872)][_0x1e483a(0x443)]),this[_0x1e483a(0x686)]&&(_0x1e483a(0x61f)!==_0x1e483a(0x61f)?_0x70cb16['playBuzzer']():this[_0x1e483a(0x686)][_0x1e483a(0x87c)](Scene_Shop[_0x1e483a(0x872)][_0x1e483a(0x3d2)])),this['_sellWindow']&&this['_sellWindow'][_0x1e483a(0x87c)](Scene_Shop[_0x1e483a(0x872)]['SellBgType']);},Scene_Shop[_0x1c6d52(0x721)][_0x1c6d52(0x459)]=function(){const _0x10a32d=_0x1c6d52;return Scene_Shop[_0x10a32d(0x872)][_0x10a32d(0x579)]['call'](this);},Scene_Shop[_0x1c6d52(0x721)][_0x1c6d52(0x5cb)]=function(){const _0x57d1ff=_0x1c6d52;return Scene_Shop[_0x57d1ff(0x872)][_0x57d1ff(0xa2b)][_0x57d1ff(0x78a)](this);},Scene_Shop['prototype'][_0x1c6d52(0x734)]=function(){const _0x2baddc=_0x1c6d52;return Scene_Shop[_0x2baddc(0x872)][_0x2baddc(0x543)]['call'](this);},Scene_Shop[_0x1c6d52(0x721)][_0x1c6d52(0x4f2)]=function(){const _0xab819c=_0x1c6d52;return Scene_Shop['layoutSettings'][_0xab819c(0x39a)][_0xab819c(0x78a)](this);},Scene_Shop['prototype'][_0x1c6d52(0x391)]=function(){return Scene_Shop['layoutSettings']['NumberRect']['call'](this);},Scene_Shop[_0x1c6d52(0x721)][_0x1c6d52(0x66e)]=function(){const _0x1ef113=_0x1c6d52;return Scene_Shop[_0x1ef113(0x872)][_0x1ef113(0x6f2)][_0x1ef113(0x78a)](this);},Scene_Shop[_0x1c6d52(0x721)]['buyWindowRect']=function(){const _0x20d639=_0x1c6d52;return Scene_Shop[_0x20d639(0x872)][_0x20d639(0x89f)][_0x20d639(0x78a)](this);},Scene_Shop[_0x1c6d52(0x721)][_0x1c6d52(0x594)]=function(){const _0x14784b=_0x1c6d52;return Scene_Shop[_0x14784b(0x872)][_0x14784b(0x79d)][_0x14784b(0x78a)](this);},Scene_Shop[_0x1c6d52(0x721)][_0x1c6d52(0x855)]=function(){const _0x4072f7=_0x1c6d52;return Scene_Shop[_0x4072f7(0x872)]['SellRect'][_0x4072f7(0x78a)](this);},Scene_Name[_0x1c6d52(0x872)]=VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)]['MenuLayout'][_0x1c6d52(0x7c6)],VisuMZ[_0x1c6d52(0x7b7)]['Scene_Name_create']=Scene_Name['prototype'][_0x1c6d52(0x317)],Scene_Name['prototype']['create']=function(){const _0x1494d4=_0x1c6d52;VisuMZ[_0x1494d4(0x7b7)][_0x1494d4(0x1de)][_0x1494d4(0x78a)](this),this[_0x1494d4(0x80f)]();},Scene_Name['prototype'][_0x1c6d52(0x80f)]=function(){const _0x178c3b=_0x1c6d52;this[_0x178c3b(0x879)]&&this[_0x178c3b(0x879)][_0x178c3b(0x87c)](Scene_Name[_0x178c3b(0x872)][_0x178c3b(0x4e7)]),this['_inputWindow']&&this[_0x178c3b(0xa1b)][_0x178c3b(0x87c)](Scene_Name[_0x178c3b(0x872)][_0x178c3b(0x66a)]);},Scene_Name[_0x1c6d52(0x721)][_0x1c6d52(0x2de)]=function(){return 0x0;},Scene_Name[_0x1c6d52(0x721)][_0x1c6d52(0x25a)]=function(){const _0x304079=_0x1c6d52;return Scene_Name[_0x304079(0x872)][_0x304079(0x758)][_0x304079(0x78a)](this);},Scene_Name[_0x1c6d52(0x721)][_0x1c6d52(0x2b0)]=function(){const _0xe52550=_0x1c6d52;return Scene_Name[_0xe52550(0x872)][_0xe52550(0x821)][_0xe52550(0x78a)](this);},Scene_Name['prototype'][_0x1c6d52(0x38a)]=function(){const _0x26ff97=_0x1c6d52;if(!this['_inputWindow'])return![];return VisuMZ[_0x26ff97(0x7b7)]['Settings'][_0x26ff97(0x6b8)][_0x26ff97(0x38a)];},Scene_Name[_0x1c6d52(0x721)][_0x1c6d52(0x804)]=function(){const _0x49b93e=_0x1c6d52;return this[_0x49b93e(0x38a)]()?TextManager[_0x49b93e(0x4f1)]('tab'):Scene_MenuBase['prototype']['buttonAssistKey1'][_0x49b93e(0x78a)](this);},Scene_Name[_0x1c6d52(0x721)][_0x1c6d52(0x9d3)]=function(){const _0x36f7c6=_0x1c6d52;if(this['EnableNameInput']()){if('DEJRX'!==_0x36f7c6(0x3a5))this['_forcedBattleSys']=_0x36f7c6(0x6f3);else{const _0x47726c=VisuMZ['CoreEngine'][_0x36f7c6(0x719)]['KeyboardInput'];if(this['_inputWindow'][_0x36f7c6(0x7f7)]===_0x36f7c6(0x445)){if(_0x36f7c6(0x4dd)===_0x36f7c6(0x4dd))return _0x47726c[_0x36f7c6(0x668)]||_0x36f7c6(0x668);else _0x3e9da9[_0x36f7c6(0x7b7)][_0x36f7c6(0x947)][_0x36f7c6(0x78a)](this),this[_0x36f7c6(0x7d0)](),this['reserveNewGameCommonEvent']();}else{if('hCPhW'!==_0x36f7c6(0x3c7))this[_0x36f7c6(0x88a)]()&&_0x3bcdd0&&this['maxCols']()===0x1&&this[_0x36f7c6(0x428)]()===this[_0x36f7c6(0x7b5)]()-0x1?this['smoothSelect'](0x0):_0x5e898d['CoreEngine'][_0x36f7c6(0x877)]['call'](this,_0x5eae4f);else return _0x47726c['Manual']||_0x36f7c6(0x8f2);}}}else return Scene_MenuBase[_0x36f7c6(0x721)][_0x36f7c6(0x9d3)][_0x36f7c6(0x78a)](this);},VisuMZ['CoreEngine'][_0x1c6d52(0x83b)]=Scene_Name[_0x1c6d52(0x721)][_0x1c6d52(0x6d4)],Scene_Name['prototype'][_0x1c6d52(0x6d4)]=function(){const _0x4f0be5=_0x1c6d52;this[_0x4f0be5(0x756)]()?this[_0x4f0be5(0x631)]():_0x4f0be5(0x314)!==_0x4f0be5(0x503)?VisuMZ[_0x4f0be5(0x7b7)][_0x4f0be5(0x83b)][_0x4f0be5(0x78a)](this):this[_0x4f0be5(0x467)](_0x5e076c[_0x4f0be5(0x61b)](),_0x19b335,_0x1ccdcb,_0x12548d);},Scene_Name[_0x1c6d52(0x721)][_0x1c6d52(0x756)]=function(){const _0x4e829c=_0x1c6d52,_0x1ccf25=VisuMZ[_0x4e829c(0x7b7)][_0x4e829c(0x719)][_0x4e829c(0x6b8)];if(!_0x1ccf25)return![];const _0x5a0a72=_0x1ccf25['BannedWords'];if(!_0x5a0a72)return![];const _0x4d0a57=this['_editWindow']['name']()[_0x4e829c(0x4ee)]();for(const _0x3be607 of _0x5a0a72){if(_0x4d0a57[_0x4e829c(0xa04)](_0x3be607[_0x4e829c(0x4ee)]()))return!![];}return![];},Scene_Name[_0x1c6d52(0x721)][_0x1c6d52(0x631)]=function(){const _0xb45daa=_0x1c6d52;SoundManager[_0xb45daa(0x772)]();},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x7dc)]=Scene_Battle[_0x1c6d52(0x721)][_0x1c6d52(0xa50)],Scene_Battle[_0x1c6d52(0x721)][_0x1c6d52(0xa50)]=function(){const _0xaf0882=_0x1c6d52;VisuMZ[_0xaf0882(0x7b7)][_0xaf0882(0x7dc)][_0xaf0882(0x78a)](this);if($gameTemp[_0xaf0882(0x9b5)])this[_0xaf0882(0x7d1)]();},Scene_Battle['prototype'][_0x1c6d52(0x7d1)]=function(){const _0x338a28=_0x1c6d52;if(!BattleManager[_0x338a28(0x2a8)]()&&!this['_playtestF7Looping']&&!$gameMessage[_0x338a28(0x516)]()){if(_0x338a28(0x667)!==_0x338a28(0x667))return![];else this[_0x338a28(0x517)]=!![],this[_0x338a28(0xa50)](),SceneManager[_0x338a28(0x9fc)](),this[_0x338a28(0x517)]=![];}},VisuMZ['CoreEngine'][_0x1c6d52(0x421)]=Scene_Battle[_0x1c6d52(0x721)][_0x1c6d52(0x46b)],Scene_Battle[_0x1c6d52(0x721)]['createCancelButton']=function(){const _0x1e3a42=_0x1c6d52;VisuMZ['CoreEngine']['Scene_Battle_createCancelButton'][_0x1e3a42(0x78a)](this),SceneManager[_0x1e3a42(0x9aa)]()&&this[_0x1e3a42(0x2d8)]();},Scene_Battle[_0x1c6d52(0x721)][_0x1c6d52(0x2d8)]=function(){const _0xf43725=_0x1c6d52;this['_cancelButton']['x']=Graphics[_0xf43725(0x7ec)]+0x4,this[_0xf43725(0x710)]()?this[_0xf43725(0xa12)]['y']=Graphics[_0xf43725(0x471)]-this[_0xf43725(0x4e0)]():_0xf43725(0x238)===_0xf43725(0x238)?this[_0xf43725(0xa12)]['y']=0x0:!_0x4a5c7e['isInputting']()&&!this[_0xf43725(0x517)]&&!_0x5f558c[_0xf43725(0x516)]()&&(this[_0xf43725(0x517)]=!![],this[_0xf43725(0xa50)](),_0x380f15['updateEffekseer'](),this[_0xf43725(0x517)]=![]);},VisuMZ[_0x1c6d52(0x7b7)]['Sprite_Button_initialize']=Sprite_Button['prototype'][_0x1c6d52(0x271)],Sprite_Button[_0x1c6d52(0x721)][_0x1c6d52(0x271)]=function(_0x349a69){const _0x33079a=_0x1c6d52;VisuMZ[_0x33079a(0x7b7)]['Sprite_Button_initialize'][_0x33079a(0x78a)](this,_0x349a69),this[_0x33079a(0x70c)]();},Sprite_Button['prototype'][_0x1c6d52(0x70c)]=function(){const _0x52985f=_0x1c6d52,_0x3dbac8=VisuMZ[_0x52985f(0x7b7)][_0x52985f(0x719)]['UI'];this[_0x52985f(0x9e6)]=![];switch(this['_buttonType']){case'cancel':this[_0x52985f(0x9e6)]=!_0x3dbac8[_0x52985f(0x4af)];break;case'pageup':case'pagedown':this[_0x52985f(0x9e6)]=!_0x3dbac8[_0x52985f(0x797)];break;case _0x52985f(0x545):case'up':case'down2':case'up2':case'ok':this[_0x52985f(0x9e6)]=!_0x3dbac8['numberShowButton'];break;case _0x52985f(0x4b4):this['_isButtonHidden']=!_0x3dbac8[_0x52985f(0xa1d)];break;}},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x659)]=Sprite_Button['prototype']['updateOpacity'],Sprite_Button[_0x1c6d52(0x721)][_0x1c6d52(0x425)]=function(){const _0x1431eb=_0x1c6d52;if(SceneManager['areButtonsHidden']()||this[_0x1431eb(0x9e6)])this['hideButtonFromView']();else{if(_0x1431eb(0x5d2)===_0x1431eb(0x1f0)){if(_0x1c661c[_0x1431eb(0x91c)](/backspace/i))return this[_0x1431eb(0x43b)]===0x8;if(_0x19102b[_0x1431eb(0x91c)](/enter/i))return this[_0x1431eb(0x43b)]===0xd;if(_0x2c34be[_0x1431eb(0x91c)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;}else VisuMZ[_0x1431eb(0x7b7)][_0x1431eb(0x659)][_0x1431eb(0x78a)](this);}},Sprite_Button[_0x1c6d52(0x721)]['hideButtonFromView']=function(){const _0x2b6137=_0x1c6d52;this[_0x2b6137(0x454)]=![],this[_0x2b6137(0x779)]=0x0,this['x']=Graphics[_0x2b6137(0x552)]*0xa,this['y']=Graphics[_0x2b6137(0x81f)]*0xa;},VisuMZ['CoreEngine']['Sprite_Battler_startMove']=Sprite_Battler[_0x1c6d52(0x721)][_0x1c6d52(0x57f)],Sprite_Battler[_0x1c6d52(0x721)][_0x1c6d52(0x57f)]=function(_0x3b7db9,_0x47b5e1,_0x9f3357){const _0x5206bc=_0x1c6d52;(this[_0x5206bc(0x246)]!==_0x3b7db9||this['_targetOffsetY']!==_0x47b5e1)&&(_0x5206bc(0x862)==='iZmth'?_0x49dcca['prototype'][_0x5206bc(0x632)][_0x5206bc(0x78a)](this):(this['setMoveEasingType'](_0x5206bc(0x25d)),this['_movementWholeDuration']=_0x9f3357)),VisuMZ[_0x5206bc(0x7b7)][_0x5206bc(0xa2e)][_0x5206bc(0x78a)](this,_0x3b7db9,_0x47b5e1,_0x9f3357);},Sprite_Battler[_0x1c6d52(0x721)][_0x1c6d52(0x474)]=function(_0x963958){const _0x833d50=_0x1c6d52;this[_0x833d50(0x4db)]=_0x963958;},Sprite_Battler[_0x1c6d52(0x721)][_0x1c6d52(0x9c3)]=function(){const _0x49ebbc=_0x1c6d52;if(this['_movementDuration']<=0x0)return;const _0x312377=this[_0x49ebbc(0x839)],_0x362f05=this[_0x49ebbc(0xa37)],_0x59da63=this[_0x49ebbc(0x4db)];this[_0x49ebbc(0x26a)]=this[_0x49ebbc(0x9d6)](this[_0x49ebbc(0x26a)],this['_targetOffsetX'],_0x312377,_0x362f05,_0x59da63),this['_offsetY']=this[_0x49ebbc(0x9d6)](this[_0x49ebbc(0x9fe)],this[_0x49ebbc(0x478)],_0x312377,_0x362f05,_0x59da63),this[_0x49ebbc(0x839)]--;if(this[_0x49ebbc(0x839)]<=0x0)this[_0x49ebbc(0x8a9)]();},Sprite_Battler[_0x1c6d52(0x721)][_0x1c6d52(0x9d6)]=function(_0x2830c7,_0x41ce84,_0x4bb7c0,_0x532e92,_0x2754b3){const _0x59e95e=_0x1c6d52,_0x5399c2=VisuMZ[_0x59e95e(0x59f)]((_0x532e92-_0x4bb7c0)/_0x532e92,_0x2754b3||_0x59e95e(0x25d)),_0xefd3dd=VisuMZ[_0x59e95e(0x59f)]((_0x532e92-_0x4bb7c0+0x1)/_0x532e92,_0x2754b3||'Linear'),_0x5e776e=(_0x2830c7-_0x41ce84*_0x5399c2)/(0x1-_0x5399c2);return _0x5e776e+(_0x41ce84-_0x5e776e)*_0xefd3dd;},VisuMZ['CoreEngine'][_0x1c6d52(0x87e)]=Sprite_Actor[_0x1c6d52(0x721)][_0x1c6d52(0x492)],Sprite_Actor[_0x1c6d52(0x721)][_0x1c6d52(0x492)]=function(_0xfa645d){const _0x20ab09=_0x1c6d52;VisuMZ[_0x20ab09(0x7b7)][_0x20ab09(0x719)]['UI'][_0x20ab09(0x1b5)]?this['setActorHomeRepositioned'](_0xfa645d):'Mssvo'!==_0x20ab09(0x962)?VisuMZ[_0x20ab09(0x7b7)][_0x20ab09(0x87e)][_0x20ab09(0x78a)](this,_0xfa645d):_0x54a48b[_0x20ab09(0x902)]();},Sprite_Actor[_0x1c6d52(0x721)][_0x1c6d52(0x44d)]=function(_0x1eda34){const _0x8575c2=_0x1c6d52;let _0x3fd136=Math[_0x8575c2(0x5c2)](Graphics[_0x8575c2(0x552)]/0x2+0xc0);_0x3fd136-=Math[_0x8575c2(0x403)]((Graphics[_0x8575c2(0x552)]-Graphics[_0x8575c2(0x7ec)])/0x2),_0x3fd136+=_0x1eda34*0x20;let _0x46d983=Graphics[_0x8575c2(0x81f)]-0xc8-$gameParty[_0x8575c2(0x2bd)]()*0x30;_0x46d983-=Math[_0x8575c2(0x403)]((Graphics['height']-Graphics['boxHeight'])/0x2),_0x46d983+=_0x1eda34*0x30,this[_0x8575c2(0x4c4)](_0x3fd136,_0x46d983);},Sprite_Actor[_0x1c6d52(0x721)]['retreat']=function(){const _0x44d2c9=_0x1c6d52;this[_0x44d2c9(0x57f)](0x4b0,0x0,0x78);},Sprite_Animation[_0x1c6d52(0x721)][_0x1c6d52(0x8f7)]=function(_0x3d0bcd){this['_muteSound']=_0x3d0bcd;},VisuMZ[_0x1c6d52(0x7b7)]['Sprite_Animation_processSoundTimings']=Sprite_Animation[_0x1c6d52(0x721)][_0x1c6d52(0x274)],Sprite_Animation[_0x1c6d52(0x721)]['processSoundTimings']=function(){const _0x188b8e=_0x1c6d52;if(this[_0x188b8e(0x574)])return;VisuMZ[_0x188b8e(0x7b7)][_0x188b8e(0x6c3)][_0x188b8e(0x78a)](this);},VisuMZ['CoreEngine'][_0x1c6d52(0x965)]=Sprite_Animation[_0x1c6d52(0x721)][_0x1c6d52(0x7a4)],Sprite_Animation[_0x1c6d52(0x721)][_0x1c6d52(0x7a4)]=function(_0x563122){const _0x5215fd=_0x1c6d52;this[_0x5215fd(0x8d9)]()?this[_0x5215fd(0x4b8)](_0x563122):VisuMZ[_0x5215fd(0x7b7)][_0x5215fd(0x965)][_0x5215fd(0x78a)](this,_0x563122);},Sprite_Animation[_0x1c6d52(0x721)][_0x1c6d52(0x8d9)]=function(){const _0x30e158=_0x1c6d52;if(!this[_0x30e158(0x29f)])return![];const _0x58e72e=this[_0x30e158(0x29f)]['name']||'';if(_0x58e72e['match'](/<MIRROR OFFSET X>/i))return!![];if(_0x58e72e['match'](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x30e158(0x7b7)][_0x30e158(0x719)][_0x30e158(0x858)][_0x30e158(0x92e)];},Sprite_Animation[_0x1c6d52(0x721)]['setViewportCoreEngineFix']=function(_0x313bdf){const _0x4a5c66=_0x1c6d52,_0xe8db2f=this[_0x4a5c66(0x7f4)],_0x1caec1=this[_0x4a5c66(0x7f4)],_0xb7c592=this[_0x4a5c66(0x29f)][_0x4a5c66(0x3e2)]*(this[_0x4a5c66(0x8c2)]?-0x1:0x1)-_0xe8db2f/0x2,_0x80db98=this[_0x4a5c66(0x29f)][_0x4a5c66(0x22f)]-_0x1caec1/0x2,_0x5f019e=this[_0x4a5c66(0x1b4)](_0x313bdf);_0x313bdf['gl'][_0x4a5c66(0x45f)](_0xb7c592+_0x5f019e['x'],_0x80db98+_0x5f019e['y'],_0xe8db2f,_0x1caec1);},Sprite_Animation[_0x1c6d52(0x721)][_0x1c6d52(0x30b)]=function(_0xd8aafc){const _0x70f430=_0x1c6d52;if(_0xd8aafc[_0x70f430(0x43a)]){}const _0x15289f=this[_0x70f430(0x29f)][_0x70f430(0x4fb)];let _0x1ec98c=_0xd8aafc[_0x70f430(0x81f)]*_0xd8aafc[_0x70f430(0x46c)]['y'],_0x5d3a50=0x0,_0x1c58f7=-_0x1ec98c/0x2;if(_0x15289f['match'](/<(?:HEAD|HEADER|TOP)>/i))_0x1c58f7=-_0x1ec98c;if(_0x15289f[_0x70f430(0x91c)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x1c58f7=0x0;if(this['_animation'][_0x70f430(0x564)])_0x1c58f7=0x0;if(_0x15289f['match'](/<(?:LEFT)>/i))_0x5d3a50=-_0xd8aafc[_0x70f430(0x552)]/0x2;if(_0x15289f['match'](/<(?:RIGHT)>/i))_0x5d3a50=_0xd8aafc['width']/0x2;_0x15289f['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x5d3a50=Number(RegExp['$1'])*_0xd8aafc[_0x70f430(0x552)]);if(_0x15289f[_0x70f430(0x91c)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)){if(_0x70f430(0x961)===_0x70f430(0x961))_0x1c58f7=(0x1-Number(RegExp['$1']))*-_0x1ec98c;else{if(_0x307c6e['isPlaytest']())_0x4e59a5[_0x70f430(0x321)](_0x5b7273);}}if(_0x15289f[_0x70f430(0x91c)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)){if(_0x70f430(0x5c5)!==_0x70f430(0x423))_0x5d3a50=Number(RegExp['$1'])*_0xd8aafc[_0x70f430(0x552)],_0x1c58f7=(0x1-Number(RegExp['$2']))*-_0x1ec98c;else return _0x4e691c[_0x70f430(0x872)]['StatusRect'][_0x70f430(0x78a)](this);}if(_0x15289f[_0x70f430(0x91c)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x5d3a50+=Number(RegExp['$1']);if(_0x15289f[_0x70f430(0x91c)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x1c58f7+=Number(RegExp['$1']);if(_0x15289f[_0x70f430(0x91c)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if('SULna'===_0x70f430(0x8fa))_0x5d3a50+=Number(RegExp['$1']),_0x1c58f7+=Number(RegExp['$2']);else{if(_0xb80a9a[_0x70f430(0x4f8)]())return![];return this[_0x70f430(0x4fb)]()&&this[_0x70f430(0x4fb)]()[_0x70f430(0xa05)](0x0)==='!';}}const _0x1a1645=new Point(_0x5d3a50,_0x1c58f7);return _0xd8aafc[_0x70f430(0x3dd)](),_0xd8aafc[_0x70f430(0x702)]['apply'](_0x1a1645);},Sprite_AnimationMV[_0x1c6d52(0x721)][_0x1c6d52(0x6e7)]=function(){const _0x58da37=_0x1c6d52;this[_0x58da37(0x670)]=VisuMZ[_0x58da37(0x7b7)][_0x58da37(0x719)]['QoL'][_0x58da37(0x9da)]??0x4,this['setupCustomRateCoreEngine'](),this['_rate']=this['_rate'][_0x58da37(0xa23)](0x1,0xa);},Sprite_AnimationMV[_0x1c6d52(0x721)][_0x1c6d52(0x8f6)]=function(){const _0x14e777=_0x1c6d52;if(!this[_0x14e777(0x29f)]);const _0x24c329=this['_animation'][_0x14e777(0x4fb)]||'';if(_0x24c329[_0x14e777(0x91c)](/<RATE:[ ](\d+)>/i)){if(_0x14e777(0x9ea)!=='ffuwV')this[_0x14e777(0x670)]=(Number(RegExp['$1'])||0x1)[_0x14e777(0xa23)](0x1,0xa);else for(const _0x27a2fe of _0x2ab4e9){this[_0x14e777(0x38f)]([_0x27a2fe],_0x558dd7,_0x1b4ab4,_0x579e9b,_0x4ad4cb),_0x344ec8+=_0x53b6ae;}}},Sprite_AnimationMV[_0x1c6d52(0x721)][_0x1c6d52(0x8f7)]=function(_0x1b70cc){const _0x5593ff=_0x1c6d52;this[_0x5593ff(0x574)]=_0x1b70cc;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x37c)]=Sprite_AnimationMV[_0x1c6d52(0x721)]['processTimingData'],Sprite_AnimationMV[_0x1c6d52(0x721)][_0x1c6d52(0x9b8)]=function(_0x16cea1){const _0x4b76d0=_0x1c6d52;this['_muteSound']&&(_0x16cea1=JsonEx[_0x4b76d0(0x1d8)](_0x16cea1),_0x16cea1['se']&&(_0x16cea1['se'][_0x4b76d0(0x3ed)]=0x0)),VisuMZ[_0x4b76d0(0x7b7)][_0x4b76d0(0x37c)]['call'](this,_0x16cea1);},VisuMZ['CoreEngine']['Sprite_AnimationMV_updatePosition']=Sprite_AnimationMV['prototype'][_0x1c6d52(0x714)],Sprite_AnimationMV[_0x1c6d52(0x721)][_0x1c6d52(0x714)]=function(){const _0x544169=_0x1c6d52;VisuMZ['CoreEngine'][_0x544169(0x1df)][_0x544169(0x78a)](this);if(this['_animation']['position']===0x3){if(_0x544169(0x95f)!=='QkuXl'){if(_0x541e67[_0x544169(0x7b7)][_0x544169(0x719)][_0x544169(0x8a8)][_0x544169(0x9d1)]===![])return;if(this['isExpGaugeDrawn']())this[_0x544169(0x1fb)](_0x39929d,_0x51cdd5,_0xd10bfd);_0x10417d[_0x544169(0x7b7)]['Window_StatusBase_drawActorLevel'][_0x544169(0x78a)](this,_0x466678,_0x4f9a71,_0x321c7a);}else{if(this['x']===0x0)this['x']=Math[_0x544169(0x5c2)](Graphics[_0x544169(0x552)]/0x2);if(this['y']===0x0)this['y']=Math[_0x544169(0x5c2)](Graphics[_0x544169(0x81f)]/0x2);}}},Sprite_Damage[_0x1c6d52(0x721)][_0x1c6d52(0x8e8)]=function(_0x2d99d1){const _0x560195=_0x1c6d52;let _0x123b06=Math[_0x560195(0x63a)](_0x2d99d1)[_0x560195(0x65f)]();this[_0x560195(0x3de)]()&&(_0x123b06=VisuMZ[_0x560195(0x279)](_0x123b06));const _0x5b6f24=this[_0x560195(0x35f)](),_0x209ca7=Math[_0x560195(0x403)](_0x5b6f24*0.75);for(let _0x4ad88f=0x0;_0x4ad88f<_0x123b06[_0x560195(0x3bf)];_0x4ad88f++){if(_0x560195(0x283)!=='WMXKe')this[_0x560195(0x1e1)](_0x59dce4);else{const _0x327031=this[_0x560195(0x601)](_0x209ca7,_0x5b6f24);_0x327031['bitmap'][_0x560195(0x60d)](_0x123b06[_0x4ad88f],0x0,0x0,_0x209ca7,_0x5b6f24,_0x560195(0x735)),_0x327031['x']=(_0x4ad88f-(_0x123b06[_0x560195(0x3bf)]-0x1)/0x2)*_0x209ca7,_0x327031['dy']=-_0x4ad88f;}}},Sprite_Damage[_0x1c6d52(0x721)]['useDigitGrouping']=function(){const _0x2a4666=_0x1c6d52;return VisuMZ['CoreEngine']['Settings'][_0x2a4666(0x858)][_0x2a4666(0x381)];},Sprite_Damage[_0x1c6d52(0x721)][_0x1c6d52(0x5fd)]=function(){const _0x355ca7=_0x1c6d52;return ColorManager[_0x355ca7(0x1c5)]();},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x569)]=Sprite_Gauge['prototype'][_0x1c6d52(0x588)],Sprite_Gauge[_0x1c6d52(0x721)][_0x1c6d52(0x588)]=function(){const _0x150651=_0x1c6d52;return VisuMZ[_0x150651(0x7b7)][_0x150651(0x569)][_0x150651(0x78a)](this)['clamp'](0x0,0x1);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0xa08)]=Sprite_Gauge[_0x1c6d52(0x721)]['currentValue'],Sprite_Gauge[_0x1c6d52(0x721)]['currentValue']=function(){const _0x126618=_0x1c6d52;let _0x2cfe2c=VisuMZ[_0x126618(0x7b7)][_0x126618(0xa08)][_0x126618(0x78a)](this);return _0x2cfe2c;},Sprite_Gauge[_0x1c6d52(0x721)][_0x1c6d52(0x73e)]=function(){const _0x572bcd=_0x1c6d52;let _0x20437d=this[_0x572bcd(0x31f)]();this[_0x572bcd(0x3de)]()&&(_0x20437d=VisuMZ[_0x572bcd(0x279)](_0x20437d));const _0x5c6c41=this[_0x572bcd(0x46a)]()-0x1,_0xf75a5b=this[_0x572bcd(0x6e9)]?this['textHeight']():this[_0x572bcd(0x50e)]();this['setupValueFont'](),this['bitmap'][_0x572bcd(0x60d)](_0x20437d,0x0,0x0,_0x5c6c41,_0xf75a5b,_0x572bcd(0x60e));},Sprite_Gauge[_0x1c6d52(0x721)][_0x1c6d52(0x9cf)]=function(){return 0x3;},Sprite_Gauge['prototype'][_0x1c6d52(0x3de)]=function(){const _0x54a6d8=_0x1c6d52;return VisuMZ[_0x54a6d8(0x7b7)][_0x54a6d8(0x719)][_0x54a6d8(0x858)][_0x54a6d8(0x5e1)];},Sprite_Gauge[_0x1c6d52(0x721)][_0x1c6d52(0x5fd)]=function(){const _0x4c2913=_0x1c6d52;return ColorManager[_0x4c2913(0x5e6)]();},VisuMZ[_0x1c6d52(0x7b7)]['Sprite_Picture_loadBitmap']=Sprite_Picture[_0x1c6d52(0x721)][_0x1c6d52(0xa18)],Sprite_Picture[_0x1c6d52(0x721)]['loadBitmap']=function(){const _0xae95a2=_0x1c6d52;this[_0xae95a2(0x2f0)]&&this[_0xae95a2(0x2f0)][_0xae95a2(0x91c)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0xae95a2(0x23e)](Number(RegExp['$1'])):VisuMZ['CoreEngine'][_0xae95a2(0xa41)][_0xae95a2(0x78a)](this);},Sprite_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x23e)]=function(_0x4f1257){const _0x584e66=_0x1c6d52,_0x15b763=ImageManager['iconWidth'],_0xe17d1c=ImageManager[_0x584e66(0x5d5)],_0x355995=this[_0x584e66(0x2f0)][_0x584e66(0x91c)](/SMOOTH/i);this[_0x584e66(0x33a)]=new Bitmap(_0x15b763,_0xe17d1c);const _0x3799ad=ImageManager[_0x584e66(0x6e3)](_0x584e66(0x8aa)),_0x9da061=_0x4f1257%0x10*_0x15b763,_0x24a343=Math['floor'](_0x4f1257/0x10)*_0xe17d1c;this['bitmap'][_0x584e66(0x7dd)]=_0x355995,this[_0x584e66(0x33a)][_0x584e66(0x544)](_0x3799ad,_0x9da061,_0x24a343,_0x15b763,_0xe17d1c,0x0,0x0,_0x15b763,_0xe17d1c);};function Sprite_TitlePictureButton(){this['initialize'](...arguments);}Sprite_TitlePictureButton[_0x1c6d52(0x721)]=Object[_0x1c6d52(0x317)](Sprite_Clickable[_0x1c6d52(0x721)]),Sprite_TitlePictureButton['prototype'][_0x1c6d52(0x5ed)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x1c6d52(0x721)][_0x1c6d52(0x271)]=function(_0x190aff){const _0x1970ea=_0x1c6d52;Sprite_Clickable[_0x1970ea(0x721)][_0x1970ea(0x271)][_0x1970ea(0x78a)](this),this[_0x1970ea(0x750)]=_0x190aff,this['_clickHandler']=null,this[_0x1970ea(0x231)]();},Sprite_TitlePictureButton[_0x1c6d52(0x721)][_0x1c6d52(0x231)]=function(){const _0x5317d5=_0x1c6d52;this['x']=Graphics['width'],this['y']=Graphics[_0x5317d5(0x81f)],this[_0x5317d5(0x454)]=![],this[_0x5317d5(0x27a)]();},Sprite_TitlePictureButton['prototype'][_0x1c6d52(0x27a)]=function(){const _0x3e683d=_0x1c6d52;this[_0x3e683d(0x33a)]=ImageManager[_0x3e683d(0x7ba)](this[_0x3e683d(0x750)]['PictureFilename']),this['bitmap'][_0x3e683d(0x215)](this[_0x3e683d(0x1e5)][_0x3e683d(0x2fe)](this));},Sprite_TitlePictureButton[_0x1c6d52(0x721)]['onButtonImageLoad']=function(){const _0x48181c=_0x1c6d52;this[_0x48181c(0x750)][_0x48181c(0x97a)][_0x48181c(0x78a)](this),this[_0x48181c(0x750)][_0x48181c(0x712)][_0x48181c(0x78a)](this),this['setClickHandler'](this[_0x48181c(0x750)][_0x48181c(0x67e)][_0x48181c(0x2fe)](this));},Sprite_TitlePictureButton[_0x1c6d52(0x721)][_0x1c6d52(0xa50)]=function(){const _0x520fb6=_0x1c6d52;Sprite_Clickable[_0x520fb6(0x721)][_0x520fb6(0xa50)][_0x520fb6(0x78a)](this),this[_0x520fb6(0x425)](),this['processTouch']();},Sprite_TitlePictureButton[_0x1c6d52(0x721)][_0x1c6d52(0x7e8)]=function(){const _0x15fac3=_0x1c6d52;return VisuMZ[_0x15fac3(0x7b7)][_0x15fac3(0x719)][_0x15fac3(0x664)][_0x15fac3(0x8f8)][_0x15fac3(0x841)];},Sprite_TitlePictureButton['prototype'][_0x1c6d52(0x425)]=function(){const _0x329c5e=_0x1c6d52;this[_0x329c5e(0x818)]||this[_0x329c5e(0x34e)]?this['opacity']=0xff:'rrCTU'!==_0x329c5e(0x5e7)?(_0x24a330[_0x329c5e(0x6f8)]=!![],_0x4ec814[_0x329c5e(0x7b7)][_0x329c5e(0x6a6)][_0x329c5e(0x78a)](this,_0x251531,_0x3aa53a),_0xc5ad3f[_0x329c5e(0x6f8)]=_0xdc5f0c):(this['opacity']+=this[_0x329c5e(0x454)]?this[_0x329c5e(0x7e8)]():-0x1*this['fadeSpeed'](),this['opacity']=Math[_0x329c5e(0x42f)](0xc0,this[_0x329c5e(0x779)]));},Sprite_TitlePictureButton[_0x1c6d52(0x721)][_0x1c6d52(0x994)]=function(_0x2b5795){const _0x1fd02c=_0x1c6d52;this[_0x1fd02c(0xa16)]=_0x2b5795;},Sprite_TitlePictureButton['prototype'][_0x1c6d52(0x3e7)]=function(){const _0x3ff8d6=_0x1c6d52;this[_0x3ff8d6(0xa16)]&&(_0x3ff8d6(0x5ee)===_0x3ff8d6(0x5ee)?this['_clickHandler']():_0x1735b5['startAnimation']());},VisuMZ['CoreEngine'][_0x1c6d52(0x5ba)]=Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x271)],Spriteset_Base['prototype']['initialize']=function(){const _0x3a54ec=_0x1c6d52;VisuMZ[_0x3a54ec(0x7b7)][_0x3a54ec(0x5ba)][_0x3a54ec(0x78a)](this),this[_0x3a54ec(0x8d8)]();},Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x8d8)]=function(){const _0x19a243=_0x1c6d52;this['_fauxAnimationSprites']=[],this[_0x19a243(0x742)]=[],this[_0x19a243(0x7d8)]=this[_0x19a243(0x46c)]['x'],this[_0x19a243(0x792)]=this[_0x19a243(0x46c)]['y'];},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x267)]=Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x806)],Spriteset_Base[_0x1c6d52(0x721)]['destroy']=function(_0x38dea2){const _0x45c507=_0x1c6d52;this[_0x45c507(0x3f4)](),this[_0x45c507(0x7ea)](),VisuMZ[_0x45c507(0x7b7)][_0x45c507(0x267)][_0x45c507(0x78a)](this,_0x38dea2);},VisuMZ['CoreEngine']['Spriteset_Base_update']=Spriteset_Base['prototype']['update'],Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0xa50)]=function(){const _0x5b469e=_0x1c6d52;VisuMZ[_0x5b469e(0x7b7)][_0x5b469e(0x3ee)][_0x5b469e(0x78a)](this),this[_0x5b469e(0x535)](),this['updateFauxAnimations'](),this[_0x5b469e(0x76e)]();},Spriteset_Base['prototype'][_0x1c6d52(0x535)]=function(){const _0x3c80fa=_0x1c6d52;if(!VisuMZ[_0x3c80fa(0x7b7)][_0x3c80fa(0x719)][_0x3c80fa(0x858)]['AntiZoomPictures'])return;if(this[_0x3c80fa(0x7d8)]===this['scale']['x']&&this[_0x3c80fa(0x792)]===this['scale']['y'])return;this[_0x3c80fa(0x325)](),this[_0x3c80fa(0x7d8)]=this['scale']['x'],this[_0x3c80fa(0x792)]=this[_0x3c80fa(0x46c)]['y'];},Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x325)]=function(){const _0x3d467b=_0x1c6d52;if(SceneManager[_0x3d467b(0x8cc)]()&&Spriteset_Map[_0x3d467b(0x313)]){if(_0x3d467b(0x6b3)!==_0x3d467b(0x6b3))this[_0x3d467b(0x9ce)][_0x3d467b(0x87c)](_0x29e263['layoutSettings']['StatusEquipBgType']);else return;}else{if(SceneManager[_0x3d467b(0x8cb)]()&&Spriteset_Battle[_0x3d467b(0x313)]){if(_0x3d467b(0x509)!==_0x3d467b(0x226))return;else{const _0x758f31=this[_0x3d467b(0x402)]();this[_0x3d467b(0x7d3)](_0x57acd2[_0x3d467b(0x89e)]());const _0x88a36b=_0x34385b[_0x3d467b(0x7b7)][_0x3d467b(0x719)]['UI']['ParamArrow'];this[_0x3d467b(0x60d)](_0x88a36b,_0x2f3526,_0x430145,_0x758f31,_0x3d467b(0x735));}}}this[_0x3d467b(0x46c)]['x']!==0x0&&(this[_0x3d467b(0x392)][_0x3d467b(0x46c)]['x']=0x1/this[_0x3d467b(0x46c)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x3d467b(0x46c)]['x']));if(this[_0x3d467b(0x46c)]['y']!==0x0){if(_0x3d467b(0x521)!==_0x3d467b(0x304))this[_0x3d467b(0x392)][_0x3d467b(0x46c)]['y']=0x1/this['scale']['y'],this['_pictureContainer']['y']=-(this['y']/this[_0x3d467b(0x46c)]['y']);else{if(_0x43be3b['inBattle']())return;_0x4bd903[_0x3d467b(0x394)](_0xdb4152,_0x76bf58);const _0x19904f=_0x120832['min'](_0x2efe3f[_0x3d467b(0x576)],_0x3fb2ac[_0x3d467b(0x4b2)]),_0x4d455d=_0x2094a1['max'](_0x5bcf01[_0x3d467b(0x576)],_0x3c202c[_0x3d467b(0x4b2)]);for(let _0x23f8f0=_0x19904f;_0x23f8f0<=_0x4d455d;_0x23f8f0++){const _0x2c4735=_0x48ed72['value'](_0x23f8f0);_0x304359['setValue'](_0x23f8f0,!_0x2c4735);}}}},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x47f)]=Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x714)],Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x714)]=function(){const _0xd66fd1=_0x1c6d52;VisuMZ['CoreEngine'][_0xd66fd1(0x47f)][_0xd66fd1(0x78a)](this),this[_0xd66fd1(0x42e)]();},Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x42e)]=function(){const _0xbc0535=_0x1c6d52;if(!$gameScreen)return;if($gameScreen[_0xbc0535(0x9f7)]<=0x0)return;this['x']-=Math['round']($gameScreen[_0xbc0535(0xa07)]());const _0x2798a9=$gameScreen[_0xbc0535(0x2ca)]();switch($gameScreen[_0xbc0535(0x2ca)]()){case _0xbc0535(0x3fd):this[_0xbc0535(0x819)]();break;case _0xbc0535(0x44f):this[_0xbc0535(0x2e4)]();break;case _0xbc0535(0x56f):this['updatePositionCoreEngineShakeVert']();break;default:this[_0xbc0535(0x765)]();break;}},Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x819)]=function(){const _0x1f4f91=_0x1c6d52,_0x295434=VisuMZ[_0x1f4f91(0x7b7)]['Settings']['ScreenShake'];if(_0x295434&&_0x295434[_0x1f4f91(0x96a)]){if('uhfwV'!==_0x1f4f91(0x996))this[_0x1f4f91(0x6ac)]={'duration':_0x17125a,'wholeDuration':_0x1522ab,'type':_0x4c8b66,'targetX':_0x41c86c,'targetY':_0x408356,'targetScaleX':_0x2fb223,'targetScaleY':_0x5ea024,'targetOpacity':_0x4f83c8,'targetBackOpacity':_0xc72908,'targetContentsOpacity':_0x331f38};else return _0x295434[_0x1f4f91(0x96a)][_0x1f4f91(0x78a)](this);}this['x']+=Math[_0x1f4f91(0x5c2)]($gameScreen[_0x1f4f91(0xa07)]());},Spriteset_Base[_0x1c6d52(0x721)]['updatePositionCoreEngineShakeRand']=function(){const _0x335833=_0x1c6d52,_0x24a3f8=VisuMZ[_0x335833(0x7b7)]['Settings'][_0x335833(0x2f4)];if(_0x24a3f8&&_0x24a3f8[_0x335833(0x5b5)]){if(_0x335833(0x70b)!==_0x335833(0x70b))this['_forcedBattleSys']=0x1;else return _0x24a3f8[_0x335833(0x5b5)][_0x335833(0x78a)](this);}const _0x38bd41=$gameScreen[_0x335833(0x3a3)]*0.75,_0x316d67=$gameScreen['_shakeSpeed']*0.6,_0x1ae122=$gameScreen[_0x335833(0x9f7)];this['x']+=Math[_0x335833(0x5c2)](Math[_0x335833(0x5df)](_0x38bd41)-Math[_0x335833(0x5df)](_0x316d67))*(Math['min'](_0x1ae122,0x1e)*0.5),this['y']+=Math[_0x335833(0x5c2)](Math[_0x335833(0x5df)](_0x38bd41)-Math['randomInt'](_0x316d67))*(Math[_0x335833(0x42f)](_0x1ae122,0x1e)*0.5);},Spriteset_Base[_0x1c6d52(0x721)]['updatePositionCoreEngineShakeHorz']=function(){const _0x5e2907=_0x1c6d52,_0x35caf8=VisuMZ[_0x5e2907(0x7b7)][_0x5e2907(0x719)]['ScreenShake'];if(_0x35caf8&&_0x35caf8['horzJS'])return _0x35caf8[_0x5e2907(0x5d7)][_0x5e2907(0x78a)](this);const _0x2feb32=$gameScreen[_0x5e2907(0x3a3)]*0.75,_0x23fdf6=$gameScreen[_0x5e2907(0x4a0)]*0.6,_0x59d2da=$gameScreen[_0x5e2907(0x9f7)];this['x']+=Math[_0x5e2907(0x5c2)](Math['randomInt'](_0x2feb32)-Math[_0x5e2907(0x5df)](_0x23fdf6))*(Math['min'](_0x59d2da,0x1e)*0.5);},Spriteset_Base[_0x1c6d52(0x721)]['updatePositionCoreEngineShakeVert']=function(){const _0x37dc08=_0x1c6d52,_0x432524=VisuMZ['CoreEngine'][_0x37dc08(0x719)][_0x37dc08(0x2f4)];if(_0x432524&&_0x432524[_0x37dc08(0x637)])return _0x432524[_0x37dc08(0x637)][_0x37dc08(0x78a)](this);const _0x2ce54b=$gameScreen[_0x37dc08(0x3a3)]*0.75,_0x21e6c6=$gameScreen[_0x37dc08(0x4a0)]*0.6,_0x2c233b=$gameScreen[_0x37dc08(0x9f7)];this['y']+=Math[_0x37dc08(0x5c2)](Math['randomInt'](_0x2ce54b)-Math[_0x37dc08(0x5df)](_0x21e6c6))*(Math['min'](_0x2c233b,0x1e)*0.5);},Spriteset_Base['prototype'][_0x1c6d52(0x3b2)]=function(){const _0x248b49=_0x1c6d52;for(const _0x1c18af of this['_fauxAnimationSprites']){!_0x1c18af[_0x248b49(0x970)]()&&this[_0x248b49(0x813)](_0x1c18af);}this['processFauxAnimationRequests']();},Spriteset_Base['prototype']['processFauxAnimationRequests']=function(){const _0x1069b1=_0x1c6d52;for(;;){const _0x133780=$gameTemp[_0x1069b1(0x379)]();if(_0x133780){if(_0x1069b1(0x4ad)!==_0x1069b1(0x58c))this[_0x1069b1(0x66f)](_0x133780);else return _0xeb3434[_0x1069b1(0x7b7)][_0x1069b1(0x719)][_0x1069b1(0x664)][_0x1069b1(0x8f8)]['ButtonFadeSpeed'];}else break;}},Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x66f)]=function(_0x566901){const _0x43452b=_0x1c6d52,_0x329528=$dataAnimations[_0x566901[_0x43452b(0x4bd)]],_0x3c05a5=_0x566901[_0x43452b(0x435)],_0xc0ce40=_0x566901[_0x43452b(0x62f)],_0x58b54c=_0x566901[_0x43452b(0x393)];let _0x15395e=this[_0x43452b(0x8c3)]();const _0x90f0c8=this[_0x43452b(0x31a)]();if(this[_0x43452b(0x2a0)](_0x329528))for(const _0x35043b of _0x3c05a5){this['createFauxAnimationSprite']([_0x35043b],_0x329528,_0xc0ce40,_0x15395e,_0x58b54c),_0x15395e+=_0x90f0c8;}else this[_0x43452b(0x621)](_0x3c05a5,_0x329528,_0xc0ce40,_0x15395e,_0x58b54c);},Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x9c1)]=function(_0x2964c0,_0x2cd155,_0x398b02,_0x42dcec){const _0x5ba93c=_0x1c6d52,_0x548174=this[_0x5ba93c(0x511)](_0x2cd155),_0x52506e=new(_0x548174?Sprite_AnimationMV:Sprite_Animation)(),_0x2a14a4=this[_0x5ba93c(0x658)](_0x2964c0),_0x1d9f77=this['animationBaseDelay'](),_0x345cd2=_0x42dcec>_0x1d9f77?this[_0x5ba93c(0x43f)]():null;this[_0x5ba93c(0x716)](_0x2964c0[0x0])&&(_0x5ba93c(0x711)===_0x5ba93c(0x711)?_0x398b02=!_0x398b02:this[_0x5ba93c(0x3c1)]=0x1),_0x52506e[_0x5ba93c(0x8dc)]=_0x2964c0,_0x52506e['setup'](_0x2a14a4,_0x2cd155,_0x398b02,_0x42dcec,_0x345cd2),this['addAnimationSpriteToContainer'](_0x52506e),this[_0x5ba93c(0x725)][_0x5ba93c(0x430)](_0x52506e);},Spriteset_Base[_0x1c6d52(0x721)]['createFauxAnimationSprite']=function(_0x319dec,_0xac888a,_0x2f1427,_0x258782,_0x5b45c3){const _0x2e74cd=_0x1c6d52,_0x576bcf=this[_0x2e74cd(0x511)](_0xac888a),_0x3eee62=new(_0x576bcf?Sprite_AnimationMV:Sprite_Animation)(),_0x24be5c=this['makeTargetSprites'](_0x319dec);this[_0x2e74cd(0x716)](_0x319dec[0x0])&&(_0x2f1427=!_0x2f1427),_0x3eee62[_0x2e74cd(0x8dc)]=_0x319dec,_0x3eee62['setup'](_0x24be5c,_0xac888a,_0x2f1427,_0x258782),_0x3eee62[_0x2e74cd(0x8f7)](_0x5b45c3),this[_0x2e74cd(0x704)](_0x3eee62),this[_0x2e74cd(0x241)]['push'](_0x3eee62);},Spriteset_Base['prototype'][_0x1c6d52(0x704)]=function(_0xbed2d3){const _0x99ae00=_0x1c6d52;this[_0x99ae00(0x88e)][_0x99ae00(0x81b)](_0xbed2d3);},Spriteset_Base[_0x1c6d52(0x721)]['removeAnimation']=function(_0x24d7cb){const _0x282e3b=_0x1c6d52;this[_0x282e3b(0x725)][_0x282e3b(0x9d0)](_0x24d7cb),this[_0x282e3b(0x893)](_0x24d7cb);for(const _0x2a4d8c of _0x24d7cb[_0x282e3b(0x8dc)]){if(_0x282e3b(0x4f0)===_0x282e3b(0x4f0))_0x2a4d8c['endAnimation']&&(_0x282e3b(0x400)===_0x282e3b(0x400)?_0x2a4d8c[_0x282e3b(0x902)]():this[_0x282e3b(0x585)]());else{var _0x1bad16=_0x306a21(_0x45a1c2['$1']);try{_0x2f8ce=_0xb7bfca['max'](_0x3f8fcb,_0xaacad4(_0x1855bf(_0x1bad16)));}catch(_0x2f5511){if(_0x29ab88[_0x282e3b(0x1c7)]())_0x47c7b7[_0x282e3b(0x321)](_0x2f5511);}}}_0x24d7cb[_0x282e3b(0x806)]();},Spriteset_Base[_0x1c6d52(0x721)]['removeFauxAnimation']=function(_0x19abd7){const _0x3f29ac=_0x1c6d52;this[_0x3f29ac(0x241)][_0x3f29ac(0x9d0)](_0x19abd7),this[_0x3f29ac(0x893)](_0x19abd7);for(const _0x1e4018 of _0x19abd7['targetObjects']){if(_0x1e4018[_0x3f29ac(0x902)]){if(_0x3f29ac(0x5f9)===_0x3f29ac(0x916)){const _0xc9d619=_0x44a17a[_0x3f29ac(0x59e)];let _0x48922c=_0x55e6c9[_0x3f29ac(0x374)];if(['',_0x3f29ac(0x3d3)]['includes'](_0x48922c))_0x48922c=_0x1eafee[_0x3f29ac(0x2e6)][_0x3f29ac(0x78a)](this);const _0xa1ddc=_0x48197e[_0x3f29ac(0x262)][_0x3f29ac(0x78a)](this),_0x41acdc=_0x1d8178[_0x3f29ac(0x22b)][_0x3f29ac(0x78a)](this);this[_0x3f29ac(0x53b)](_0x48922c,_0xc9d619,_0xa1ddc,_0x41acdc),this[_0x3f29ac(0xa00)](_0xc9d619,_0x4a5236['CallHandlerJS'][_0x3f29ac(0x2fe)](this,_0x41acdc));}else _0x1e4018['endAnimation']();}}_0x19abd7[_0x3f29ac(0x806)]();},Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x893)]=function(_0x10c8fa){const _0x4d5651=_0x1c6d52;this['_effectsContainer'][_0x4d5651(0x731)](_0x10c8fa);},Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x3f4)]=function(){const _0x4c4614=_0x1c6d52;for(const _0x2ad0d8 of this[_0x4c4614(0x241)]){if(_0x4c4614(0x8c1)===_0x4c4614(0x8c1))this['removeFauxAnimation'](_0x2ad0d8);else return _0x8dbacc[_0x4c4614(0x721)][_0x4c4614(0x9d3)][_0x4c4614(0x78a)](this);}},Spriteset_Base[_0x1c6d52(0x721)]['isFauxAnimationPlaying']=function(){const _0x5734e1=_0x1c6d52;return this['_fauxAnimationSprites'][_0x5734e1(0x3bf)]>0x0;},Spriteset_Base[_0x1c6d52(0x721)]['updatePointAnimations']=function(){const _0x456d71=_0x1c6d52;for(const _0xb4b26 of this[_0x456d71(0x742)]){'QbnaZ'===_0x456d71(0x8da)?_0x1226bf=_0x1894de(_0x2aac88['$1'])*_0x26edd8[_0x456d71(0x552)]:!_0xb4b26[_0x456d71(0x970)]()&&this[_0x456d71(0x7ab)](_0xb4b26);}this['processPointAnimationRequests']();},Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x530)]=function(){const _0x396b8e=_0x1c6d52;for(;;){if(_0x396b8e(0x3cb)===_0x396b8e(0x97c)){const _0x68bb07=_0x6dc16f['CoreEngine']['Settings'][_0x396b8e(0x2f4)];if(_0x68bb07&&_0x68bb07[_0x396b8e(0x96a)])return _0x68bb07[_0x396b8e(0x96a)][_0x396b8e(0x78a)](this);this['x']+=_0x5608bc[_0x396b8e(0x5c2)](_0x33c54a[_0x396b8e(0xa07)]());}else{const _0x431162=$gameTemp[_0x396b8e(0x26c)]();if(_0x431162)this[_0x396b8e(0x5ca)](_0x431162);else{if(_0x396b8e(0x58e)===_0x396b8e(0x58e))break;else _0x2b01db[_0x396b8e(0x7b7)][_0x396b8e(0x3fa)][_0x396b8e(0x78a)](this),_0x78582b[_0x396b8e(0xa2a)]();}}}},Spriteset_Base['prototype'][_0x1c6d52(0x5ca)]=function(_0x19003a){const _0x16dafc=_0x1c6d52,_0xc44e54=$dataAnimations[_0x19003a[_0x16dafc(0x4bd)]],_0x2f05e5=this[_0x16dafc(0x745)](_0x19003a),_0x3ace71=_0x19003a[_0x16dafc(0x62f)],_0x59e455=_0x19003a[_0x16dafc(0x393)];let _0x17179b=this['animationBaseDelay']();const _0x533bbe=this['animationNextDelay']();if(this['isAnimationForEach'](_0xc44e54))for(const _0x3417a9 of _0x2f05e5){this[_0x16dafc(0x38f)]([_0x3417a9],_0xc44e54,_0x3ace71,_0x17179b,_0x59e455),_0x17179b+=_0x533bbe;}else{if(_0x16dafc(0x630)!==_0x16dafc(0x630))for(const _0x9fc4ca of _0x5b387e[_0x16dafc(0x699)]){if(_0x9fc4ca[_0x16dafc(0x8f1)]['call'](this)){const _0x4756fd=_0x9fc4ca[_0x16dafc(0x59e)];let _0x244705=_0x9fc4ca['TextStr'];if(['','Untitled'][_0x16dafc(0xa04)](_0x244705))_0x244705=_0x9fc4ca[_0x16dafc(0x2e6)][_0x16dafc(0x78a)](this);const _0x7f37=_0x9fc4ca['EnableJS'][_0x16dafc(0x78a)](this),_0x210a51=_0x9fc4ca[_0x16dafc(0x22b)][_0x16dafc(0x78a)](this);this['addCommand'](_0x244705,_0x4756fd,_0x7f37,_0x210a51),this[_0x16dafc(0xa00)](_0x4756fd,_0x9fc4ca[_0x16dafc(0x67e)][_0x16dafc(0x2fe)](this,_0x210a51));}}else this[_0x16dafc(0x38f)](_0x2f05e5,_0xc44e54,_0x3ace71,_0x17179b,_0x59e455);}},Spriteset_Base[_0x1c6d52(0x721)]['createPointAnimationTargets']=function(_0x492f52){const _0x308975=_0x1c6d52,_0x15d840=new Sprite_Clickable();_0x15d840['x']=_0x492f52['x'],_0x15d840['y']=_0x492f52['y'],_0x15d840['z']=0x64;const _0x4d07dc=this[_0x308975(0x2f7)]();return _0x4d07dc['addChild'](_0x15d840),[_0x15d840];},Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x2f7)]=function(){return this;},Spriteset_Map['prototype'][_0x1c6d52(0x2f7)]=function(){return this['_tilemap']||this;},Spriteset_Battle[_0x1c6d52(0x721)]['getPointAnimationLayer']=function(){const _0x43874a=_0x1c6d52;return this[_0x43874a(0x953)]||this;},Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x38f)]=function(_0x3cd1c5,_0x379ba0,_0x17b062,_0x4098ec,_0x23087a){const _0x468acb=_0x1c6d52,_0x479171=this['isMVAnimation'](_0x379ba0),_0x204244=new(_0x479171?Sprite_AnimationMV:Sprite_Animation)();_0x204244[_0x468acb(0x8dc)]=_0x3cd1c5,_0x204244[_0x468acb(0x231)](_0x3cd1c5,_0x379ba0,_0x17b062,_0x4098ec),_0x204244['setMute'](_0x23087a),this[_0x468acb(0x88e)]['addChild'](_0x204244),this['_pointAnimationSprites'][_0x468acb(0x430)](_0x204244);},Spriteset_Base['prototype']['removePointAnimation']=function(_0x2d9be7){const _0x3c5741=_0x1c6d52;this[_0x3c5741(0x742)][_0x3c5741(0x9d0)](_0x2d9be7),this['_effectsContainer'][_0x3c5741(0x731)](_0x2d9be7);for(const _0x3a82aa of _0x2d9be7[_0x3c5741(0x8dc)]){if(_0x3a82aa[_0x3c5741(0x902)]){if('VZWRj'!==_0x3c5741(0x674))return this[_0x3c5741(0x24b)]&&this['_pageupButton'][_0x3c5741(0x454)]?_0xc8b414[_0x3c5741(0x384)]:'';else _0x3a82aa[_0x3c5741(0x902)]();}const _0x519be2=this[_0x3c5741(0x2f7)]();if(_0x519be2)_0x519be2[_0x3c5741(0x731)](_0x3a82aa);}_0x2d9be7[_0x3c5741(0x806)]();},Spriteset_Base[_0x1c6d52(0x721)]['removeAllPointAnimations']=function(){const _0x3e2838=_0x1c6d52;for(const _0x941cba of this[_0x3e2838(0x742)]){this[_0x3e2838(0x7ab)](_0x941cba);}},Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x60f)]=function(){const _0x59f0db=_0x1c6d52;return this[_0x59f0db(0x742)][_0x59f0db(0x3bf)]>0x0;},VisuMZ[_0x1c6d52(0x7b7)]['Spriteset_Base_isAnimationPlaying']=Spriteset_Base[_0x1c6d52(0x721)][_0x1c6d52(0x56d)],Spriteset_Base[_0x1c6d52(0x721)]['isAnimationPlaying']=function(){const _0x1c64e9=_0x1c6d52;return VisuMZ[_0x1c64e9(0x7b7)][_0x1c64e9(0x80a)][_0x1c64e9(0x78a)](this)||this[_0x1c64e9(0x60f)]();},Spriteset_Map['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)][_0x1c6d52(0x858)][_0x1c6d52(0x53c)]||![],VisuMZ[_0x1c6d52(0x7b7)]['Scene_Map_createSpriteset_detach']=Scene_Map[_0x1c6d52(0x721)][_0x1c6d52(0x9d8)],Scene_Map[_0x1c6d52(0x721)][_0x1c6d52(0x9d8)]=function(){const _0x2cfd28=_0x1c6d52;VisuMZ[_0x2cfd28(0x7b7)]['Scene_Map_createSpriteset_detach'][_0x2cfd28(0x78a)](this);if(!Spriteset_Map[_0x2cfd28(0x313)])return;const _0x3e11=this[_0x2cfd28(0x87b)];if(!_0x3e11)return;this[_0x2cfd28(0x392)]=_0x3e11[_0x2cfd28(0x392)];if(!this[_0x2cfd28(0x392)])return;this[_0x2cfd28(0x81b)](this[_0x2cfd28(0x392)]);},Spriteset_Battle['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)]['QoL']['DetachBattlePictureContainer']||![],VisuMZ['CoreEngine'][_0x1c6d52(0x93e)]=Scene_Battle[_0x1c6d52(0x721)][_0x1c6d52(0x9d8)],Scene_Battle[_0x1c6d52(0x721)][_0x1c6d52(0x9d8)]=function(){const _0x23a782=_0x1c6d52;VisuMZ[_0x23a782(0x7b7)]['Scene_Battle_createSpriteset_detach'][_0x23a782(0x78a)](this);if(!Spriteset_Battle[_0x23a782(0x313)])return;const _0x5589db=this['_spriteset'];if(!_0x5589db)return;this[_0x23a782(0x392)]=_0x5589db['_pictureContainer'];if(!this[_0x23a782(0x392)])return;this[_0x23a782(0x81b)](this[_0x23a782(0x392)]);},Spriteset_Battle[_0x1c6d52(0x721)][_0x1c6d52(0x632)]=function(){const _0x39395d=_0x1c6d52;this['_backgroundFilter']=new PIXI[(_0x39395d(0x946))]['BlurFilter'](clamp=!![]),this[_0x39395d(0x2c0)]=new Sprite(),this[_0x39395d(0x2c0)]['bitmap']=SceneManager[_0x39395d(0x78d)](),this[_0x39395d(0x2c0)][_0x39395d(0x946)]=[this[_0x39395d(0x9db)]],this[_0x39395d(0x967)][_0x39395d(0x81b)](this[_0x39395d(0x2c0)]);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0xa22)]=Spriteset_Battle[_0x1c6d52(0x721)][_0x1c6d52(0x4c2)],Spriteset_Battle['prototype']['createEnemies']=function(){const _0x3b9ec9=_0x1c6d52;this[_0x3b9ec9(0x2a2)]()&&this[_0x3b9ec9(0x1d4)](),VisuMZ[_0x3b9ec9(0x7b7)][_0x3b9ec9(0xa22)]['call'](this);},Spriteset_Battle[_0x1c6d52(0x721)][_0x1c6d52(0x2a2)]=function(){const _0x2752bf=_0x1c6d52,_0x579db6=VisuMZ[_0x2752bf(0x7b7)][_0x2752bf(0x719)][_0x2752bf(0x802)];if(!_0x579db6)return![];if(Utils[_0x2752bf(0x728)]>=_0x2752bf(0x5a0)&&!_0x579db6['RepositionEnemies130'])return![];return _0x579db6['RepositionEnemies'];},Spriteset_Battle['prototype'][_0x1c6d52(0x1d4)]=function(){const _0x2f4d78=_0x1c6d52;for(member of $gameTroop[_0x2f4d78(0x47b)]()){member['moveRelativeToResolutionChange']();}},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x9ed)]=Window_Base['prototype'][_0x1c6d52(0x271)],Window_Base[_0x1c6d52(0x721)]['initialize']=function(_0x525e31){const _0x34f89d=_0x1c6d52;_0x525e31['x']=Math[_0x34f89d(0x5c2)](_0x525e31['x']),_0x525e31['y']=Math[_0x34f89d(0x5c2)](_0x525e31['y']),_0x525e31[_0x34f89d(0x552)]=Math[_0x34f89d(0x5c2)](_0x525e31[_0x34f89d(0x552)]),_0x525e31['height']=Math[_0x34f89d(0x5c2)](_0x525e31['height']),this[_0x34f89d(0x254)](),VisuMZ['CoreEngine']['Window_Base_initialize'][_0x34f89d(0x78a)](this,_0x525e31),this[_0x34f89d(0x604)]();},Window_Base[_0x1c6d52(0x721)]['initDigitGrouping']=function(){const _0x4a4d23=_0x1c6d52;this[_0x4a4d23(0x395)]=VisuMZ[_0x4a4d23(0x7b7)][_0x4a4d23(0x719)][_0x4a4d23(0x858)][_0x4a4d23(0x91f)],this[_0x4a4d23(0x5fa)]=VisuMZ[_0x4a4d23(0x7b7)]['Settings'][_0x4a4d23(0x858)][_0x4a4d23(0x9e1)];},Window_Base['prototype'][_0x1c6d52(0x800)]=function(){const _0x1ee5f2=_0x1c6d52;return VisuMZ[_0x1ee5f2(0x7b7)][_0x1ee5f2(0x719)]['Window'][_0x1ee5f2(0x2ac)];},Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x660)]=function(){const _0x316320=_0x1c6d52;return VisuMZ[_0x316320(0x7b7)][_0x316320(0x719)][_0x316320(0x5a1)]['ItemPadding'];},Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x3e0)]=function(){const _0x907ea=_0x1c6d52;$gameSystem[_0x907ea(0x52d)]?_0x907ea(0x730)!==_0x907ea(0x730)?_0x35a4ee=0x0:this[_0x907ea(0x8ab)]=$gameSystem[_0x907ea(0x52d)]():this[_0x907ea(0x8ab)]=VisuMZ['CoreEngine'][_0x907ea(0x719)][_0x907ea(0x5a1)]['BackOpacity'];},Window_Base['prototype']['translucentOpacity']=function(){const _0x33e2a3=_0x1c6d52;return VisuMZ[_0x33e2a3(0x7b7)]['Settings'][_0x33e2a3(0x5a1)][_0x33e2a3(0x4be)];},Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x874)]=function(){const _0x5ec347=_0x1c6d52;return VisuMZ['CoreEngine'][_0x5ec347(0x719)][_0x5ec347(0x5a1)][_0x5ec347(0x557)];},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x533)]=Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0xa50)],Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0xa50)]=function(){const _0x31ef8f=_0x1c6d52;VisuMZ[_0x31ef8f(0x7b7)]['Window_Base_update'][_0x31ef8f(0x78a)](this),this[_0x31ef8f(0x68d)]();},Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x681)]=function(){const _0x22ba1c=_0x1c6d52;if(this[_0x22ba1c(0x59d)]){if(_0x22ba1c(0x559)===_0x22ba1c(0x559))this[_0x22ba1c(0x671)]+=this[_0x22ba1c(0x874)](),this['isOpen']()&&(_0x22ba1c(0x8ae)===_0x22ba1c(0x30f)?this['setLastGamepadUsed'](_0x15443e):this[_0x22ba1c(0x59d)]=![]);else{const _0xbdc297=_0x22ba1c(0x358);this[_0x22ba1c(0x7e4)]=this[_0x22ba1c(0x7e4)]||{};if(this[_0x22ba1c(0x7e4)][_0xbdc297])return this['_colorCache'][_0xbdc297];const _0x48b724=_0x2968b7['CoreEngine'][_0x22ba1c(0x719)][_0x22ba1c(0x2bf)][_0x22ba1c(0x876)];return this[_0x22ba1c(0x493)](_0xbdc297,_0x48b724);}}},Window_Base['prototype'][_0x1c6d52(0x44e)]=function(){const _0x8a9014=_0x1c6d52;this[_0x8a9014(0x4b3)]&&(_0x8a9014(0x2d9)===_0x8a9014(0x6c0)?(this[_0x8a9014(0x259)]()['centerX']=!![],this[_0x8a9014(0x259)]()['displayX']=_0x5354c9(_0x37648b['$1'])):(this[_0x8a9014(0x671)]-=this[_0x8a9014(0x874)](),this[_0x8a9014(0x575)]()&&(this[_0x8a9014(0x4b3)]=![])));},VisuMZ[_0x1c6d52(0x7b7)]['Window_Base_drawText']=Window_Base[_0x1c6d52(0x721)]['drawText'],Window_Base['prototype']['drawText']=function(_0x16c38f,_0xca1658,_0x177780,_0x11aa07,_0x1978f7){const _0x347091=_0x1c6d52;if(this[_0x347091(0x3de)]())_0x16c38f=VisuMZ[_0x347091(0x279)](_0x16c38f);VisuMZ[_0x347091(0x7b7)]['Window_Base_drawText']['call'](this,_0x16c38f,_0xca1658,_0x177780,_0x11aa07,_0x1978f7);},Window_Base[_0x1c6d52(0x721)]['useDigitGrouping']=function(){const _0x69ecdd=_0x1c6d52;return this[_0x69ecdd(0x395)];},VisuMZ[_0x1c6d52(0x7b7)]['Window_Base_createTextState']=Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x4e6)],Window_Base[_0x1c6d52(0x721)]['createTextState']=function(_0x55c018,_0x4bd53e,_0x323019,_0x181339){const _0x35168f=_0x1c6d52;var _0xcc8ab1=VisuMZ[_0x35168f(0x7b7)]['Window_Base_createTextState']['call'](this,_0x55c018,_0x4bd53e,_0x323019,_0x181339);if(this[_0x35168f(0x733)]())_0xcc8ab1[_0x35168f(0x673)]=VisuMZ['GroupDigits'](_0xcc8ab1[_0x35168f(0x673)]);return _0xcc8ab1;},Window_Base['prototype'][_0x1c6d52(0x733)]=function(){const _0x1caed6=_0x1c6d52;return this[_0x1caed6(0x5fa)];},Window_Base[_0x1c6d52(0x721)]['enableDigitGrouping']=function(_0x18885f){const _0x38c6ad=_0x1c6d52;this[_0x38c6ad(0x395)]=_0x18885f;},Window_Base[_0x1c6d52(0x721)]['enableDigitGroupingEx']=function(_0x155c9f){const _0x3e6158=_0x1c6d52;this[_0x3e6158(0x5fa)]=_0x155c9f;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x8be)]=Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x7c1)],Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x7c1)]=function(_0x1d0787,_0x1055b6,_0xb029ee){const _0x2828b1=_0x1c6d52;_0x1055b6=Math[_0x2828b1(0x5c2)](_0x1055b6),_0xb029ee=Math[_0x2828b1(0x5c2)](_0xb029ee),VisuMZ['CoreEngine']['Window_Base_drawIcon'][_0x2828b1(0x78a)](this,_0x1d0787,_0x1055b6,_0xb029ee);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x4fa)]=Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x7fd)],Window_Base[_0x1c6d52(0x721)]['drawFace']=function(_0x44abc8,_0x251bbc,_0x30f784,_0x5aed3f,_0xcbb160,_0x43f2e1){const _0x2e8281=_0x1c6d52;_0xcbb160=_0xcbb160||ImageManager[_0x2e8281(0x440)],_0x43f2e1=_0x43f2e1||ImageManager['faceHeight'],_0x30f784=Math[_0x2e8281(0x5c2)](_0x30f784),_0x5aed3f=Math['round'](_0x5aed3f),_0xcbb160=Math[_0x2e8281(0x5c2)](_0xcbb160),_0x43f2e1=Math['round'](_0x43f2e1),VisuMZ[_0x2e8281(0x7b7)][_0x2e8281(0x4fa)][_0x2e8281(0x78a)](this,_0x44abc8,_0x251bbc,_0x30f784,_0x5aed3f,_0xcbb160,_0x43f2e1);},VisuMZ[_0x1c6d52(0x7b7)]['Window_Base_drawCharacter']=Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x1b3)],Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x1b3)]=function(_0x13022a,_0x48f97b,_0x5c1c8d,_0x3c0f59){const _0x226d89=_0x1c6d52;_0x5c1c8d=Math[_0x226d89(0x5c2)](_0x5c1c8d),_0x3c0f59=Math[_0x226d89(0x5c2)](_0x3c0f59),VisuMZ[_0x226d89(0x7b7)][_0x226d89(0x36a)][_0x226d89(0x78a)](this,_0x13022a,_0x48f97b,_0x5c1c8d,_0x3c0f59);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x7e9)]=Window_Selectable[_0x1c6d52(0x721)][_0x1c6d52(0x3c3)],Window_Selectable[_0x1c6d52(0x721)][_0x1c6d52(0x3c3)]=function(_0x59756f){const _0x122227=_0x1c6d52;let _0x1e0374=VisuMZ['CoreEngine'][_0x122227(0x7e9)][_0x122227(0x78a)](this,_0x59756f);return _0x1e0374['x']=Math['round'](_0x1e0374['x']),_0x1e0374['y']=Math['round'](_0x1e0374['y']),_0x1e0374[_0x122227(0x552)]=Math[_0x122227(0x5c2)](_0x1e0374[_0x122227(0x552)]),_0x1e0374['height']=Math[_0x122227(0x5c2)](_0x1e0374[_0x122227(0x81f)]),_0x1e0374;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x7ad)]=Window_StatusBase[_0x1c6d52(0x721)][_0x1c6d52(0x233)],Window_StatusBase['prototype'][_0x1c6d52(0x233)]=function(_0x5ad1c4,_0x4855d7,_0x4cd124){const _0x2a10ae=_0x1c6d52;_0x4855d7=Math[_0x2a10ae(0x5c2)](_0x4855d7),_0x4cd124=Math[_0x2a10ae(0x5c2)](_0x4cd124),VisuMZ['CoreEngine']['Window_StatusBase_drawActorSimpleStatus']['call'](this,_0x5ad1c4,_0x4855d7,_0x4cd124);},Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x604)]=function(){const _0xc5c297=_0x1c6d52;this[_0xc5c297(0x6ac)]={'duration':0x0,'wholeDuration':0x0,'type':_0xc5c297(0x44c),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0xc5c297(0x46c)]['x'],'targetScaleY':this[_0xc5c297(0x46c)]['y'],'targetOpacity':this[_0xc5c297(0x779)],'targetBackOpacity':this[_0xc5c297(0x8ab)],'targetContentsOpacity':this['contentsOpacity']};},Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x68d)]=function(){const _0x29f768=_0x1c6d52;if(!this[_0x29f768(0x6ac)])return;if(this[_0x29f768(0x6ac)][_0x29f768(0x3da)]<=0x0)return;this['x']=this[_0x29f768(0x6cc)](this['x'],this[_0x29f768(0x6ac)][_0x29f768(0x326)]),this['y']=this[_0x29f768(0x6cc)](this['y'],this[_0x29f768(0x6ac)]['targetY']),this['scale']['x']=this['applyCoreEasing'](this[_0x29f768(0x46c)]['x'],this['_coreEasing'][_0x29f768(0x7a8)]),this[_0x29f768(0x46c)]['y']=this[_0x29f768(0x6cc)](this[_0x29f768(0x46c)]['y'],this['_coreEasing'][_0x29f768(0x2f3)]),this[_0x29f768(0x779)]=this[_0x29f768(0x6cc)](this['opacity'],this['_coreEasing'][_0x29f768(0x479)]),this[_0x29f768(0x8ab)]=this[_0x29f768(0x6cc)](this[_0x29f768(0x8ab)],this[_0x29f768(0x6ac)][_0x29f768(0x307)]),this[_0x29f768(0x866)]=this[_0x29f768(0x6cc)](this[_0x29f768(0x866)],this['_coreEasing'][_0x29f768(0x6a4)]),this[_0x29f768(0x6ac)][_0x29f768(0x3da)]--;},Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x6cc)]=function(_0x5d0dc6,_0x4534a7){const _0x2c43d8=_0x1c6d52;if(!this[_0x2c43d8(0x6ac)])return _0x4534a7;const _0x1c5cf8=this[_0x2c43d8(0x6ac)][_0x2c43d8(0x3da)],_0xf24dec=this[_0x2c43d8(0x6ac)]['wholeDuration'],_0x3b23c8=this[_0x2c43d8(0x449)]((_0xf24dec-_0x1c5cf8)/_0xf24dec),_0x566365=this[_0x2c43d8(0x449)]((_0xf24dec-_0x1c5cf8+0x1)/_0xf24dec),_0x511e84=(_0x5d0dc6-_0x4534a7*_0x3b23c8)/(0x1-_0x3b23c8);return _0x511e84+(_0x4534a7-_0x511e84)*_0x566365;},Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x449)]=function(_0xea21ad){const _0x1d02a1=_0x1c6d52;if(!this['_coreEasing'])return _0xea21ad;return VisuMZ[_0x1d02a1(0x59f)](_0xea21ad,this[_0x1d02a1(0x6ac)][_0x1d02a1(0x603)]||_0x1d02a1(0x44c));},Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x592)]=function(_0x2d33d4,_0x50c5a3){const _0x42e225=_0x1c6d52;if(!this['_coreEasing'])return;this['x']=this[_0x42e225(0x6ac)][_0x42e225(0x326)],this['y']=this[_0x42e225(0x6ac)][_0x42e225(0x208)],this[_0x42e225(0x46c)]['x']=this['_coreEasing'][_0x42e225(0x7a8)],this[_0x42e225(0x46c)]['y']=this['_coreEasing'][_0x42e225(0x2f3)],this[_0x42e225(0x779)]=this['_coreEasing'][_0x42e225(0x479)],this['backOpacity']=this['_coreEasing'][_0x42e225(0x307)],this[_0x42e225(0x866)]=this[_0x42e225(0x6ac)][_0x42e225(0x6a4)],this[_0x42e225(0x98a)](_0x2d33d4,_0x50c5a3,this['x'],this['y'],this[_0x42e225(0x46c)]['x'],this['scale']['y'],this[_0x42e225(0x779)],this[_0x42e225(0x8ab)],this['contentsOpacity']);},Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x98a)]=function(_0x5a1925,_0x579e2c,_0x4426ef,_0x2d56df,_0x5c0fe8,_0x33ce99,_0x1f39a8,_0x4881fd,_0x192df8){const _0xca3451=_0x1c6d52;this[_0xca3451(0x6ac)]={'duration':_0x5a1925,'wholeDuration':_0x5a1925,'type':_0x579e2c,'targetX':_0x4426ef,'targetY':_0x2d56df,'targetScaleX':_0x5c0fe8,'targetScaleY':_0x33ce99,'targetOpacity':_0x1f39a8,'targetBackOpacity':_0x4881fd,'targetContentsOpacity':_0x192df8};},Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x328)]=function(_0x425716,_0x34edc6,_0x30e0d1,_0xe66b50,_0x41ba0c){const _0x31bd23=_0x1c6d52;this[_0x31bd23(0x86e)](),this[_0x31bd23(0x9cc)][_0x31bd23(0x35f)]=VisuMZ[_0x31bd23(0x7b7)][_0x31bd23(0x719)][_0x31bd23(0x92f)][_0x31bd23(0x2ad)];const _0x501acb=VisuMZ[_0x31bd23(0x7b7)][_0x31bd23(0x719)][_0x31bd23(0x92f)][_0x31bd23(0x6bd)];if(_0x501acb>0x0&&_0x34edc6===TextManager[_0x31bd23(0x8a0)]){if(_0x31bd23(0x4d1)===_0x31bd23(0x4d1)){const _0x5cfc53=_0xe66b50+(this['lineHeight']()-ImageManager[_0x31bd23(0x5d5)])/0x2;this[_0x31bd23(0x7c1)](_0x501acb,_0x30e0d1+(_0x41ba0c-ImageManager['iconWidth']),_0x5cfc53),_0x41ba0c-=ImageManager['iconWidth']+0x4;}else{if(this[_0x31bd23(0x8ef)])this[_0x31bd23(0x4a4)][_0x31bd23(0x6bf)](this['_subject']);this['_phase']=_0x31bd23(0x8ad),this[_0x31bd23(0x8ef)]&&this['_subject'][_0x31bd23(0x885)]()===0x0&&(this[_0x31bd23(0x613)](this['_subject']),this[_0x31bd23(0x8ef)]=null);}}else this['changeTextColor'](ColorManager[_0x31bd23(0x89e)]()),this[_0x31bd23(0x60d)](_0x34edc6,_0x30e0d1,_0xe66b50,_0x41ba0c,'right'),_0x41ba0c-=this[_0x31bd23(0x70d)](_0x34edc6)+0x6;this[_0x31bd23(0x3be)]();const _0x3f5db5=this[_0x31bd23(0x70d)](this[_0x31bd23(0x395)]?VisuMZ[_0x31bd23(0x279)](_0x425716):_0x425716);if(_0x3f5db5>_0x41ba0c){if(_0x31bd23(0x2f9)==='LDJXr')this['drawText'](VisuMZ[_0x31bd23(0x7b7)][_0x31bd23(0x719)][_0x31bd23(0x92f)][_0x31bd23(0x2eb)],_0x30e0d1,_0xe66b50,_0x41ba0c,_0x31bd23(0x60e));else{if(_0x57bc70[_0x31bd23(0x878)]!==_0x309ad1)return _0x3d1493[_0x31bd23(0x7b7)][_0x31bd23(0x256)]();return _0xca8861[_0x31bd23(0x7b7)][_0x31bd23(0x6af)][_0x31bd23(0x78a)](this);}}else this[_0x31bd23(0x60d)](_0x425716,_0x30e0d1,_0xe66b50,_0x41ba0c,_0x31bd23(0x60e));this['resetFontSettings']();},Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x43c)]=function(_0x37645e,_0x5ed42f,_0x1e42a3,_0x57170a,_0x454c85){const _0x381ba2=_0x1c6d52,_0x39f2be=ImageManager[_0x381ba2(0x6e3)](_0x381ba2(0x8aa)),_0x39def4=ImageManager[_0x381ba2(0x5c9)],_0x311566=ImageManager[_0x381ba2(0x5d5)],_0x19f131=_0x37645e%0x10*_0x39def4,_0x12a754=Math[_0x381ba2(0x403)](_0x37645e/0x10)*_0x311566,_0x31f978=_0x57170a,_0x22444f=_0x57170a;this['contents'][_0x381ba2(0x1e9)][_0x381ba2(0x6b0)]=_0x454c85,this[_0x381ba2(0x9cc)][_0x381ba2(0x544)](_0x39f2be,_0x19f131,_0x12a754,_0x39def4,_0x311566,_0x5ed42f,_0x1e42a3,_0x31f978,_0x22444f),this['contents'][_0x381ba2(0x1e9)][_0x381ba2(0x6b0)]=!![];},Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x55c)]=function(_0x571801,_0x482e24,_0x1ed5ff,_0x1f7c5f,_0x4b0c8b,_0x1bd6ab){const _0x3a29f4=_0x1c6d52,_0x2b9d18=Math[_0x3a29f4(0x403)]((_0x1ed5ff-0x2)*_0x1f7c5f),_0xea0902=Sprite_Gauge[_0x3a29f4(0x721)][_0x3a29f4(0x9f5)][_0x3a29f4(0x78a)](this),_0x183c7e=_0x482e24+this[_0x3a29f4(0x800)]()-_0xea0902-0x2;this[_0x3a29f4(0x9cc)][_0x3a29f4(0x717)](_0x571801,_0x183c7e,_0x1ed5ff,_0xea0902,ColorManager[_0x3a29f4(0x909)]()),this[_0x3a29f4(0x9cc)]['gradientFillRect'](_0x571801+0x1,_0x183c7e+0x1,_0x2b9d18,_0xea0902-0x2,_0x4b0c8b,_0x1bd6ab);},Window_Selectable[_0x1c6d52(0x721)][_0x1c6d52(0x93a)]=function(_0x369ae7){const _0x2ba4e7=_0x1c6d52;let _0x4fb02f=this['index']();const _0x428211=this[_0x2ba4e7(0x7b5)](),_0x221239=this[_0x2ba4e7(0x213)]();if(this[_0x2ba4e7(0x88a)]()&&(_0x4fb02f<_0x428211||_0x369ae7&&_0x221239===0x1)){if(_0x2ba4e7(0x938)===_0x2ba4e7(0x938)){_0x4fb02f+=_0x221239;if(_0x4fb02f>=_0x428211)_0x4fb02f=_0x428211-0x1;this[_0x2ba4e7(0x6da)](_0x4fb02f);}else return![];}else{if(!this[_0x2ba4e7(0x88a)]()){if(_0x2ba4e7(0x397)!==_0x2ba4e7(0x429)){if(_0x4fb02f<_0x428211-_0x221239||_0x369ae7&&_0x221239===0x1){if(_0x2ba4e7(0x923)!==_0x2ba4e7(0x707))this[_0x2ba4e7(0x6da)]((_0x4fb02f+_0x221239)%_0x428211);else{const _0x107511=_0x397155['FunctionName'][_0x2ba4e7(0x9c5)](/[ ]/g,''),_0x1347b9=_0x2ee77e['CodeJS'];_0x2383b9['CoreEngine'][_0x2ba4e7(0x1ef)](_0x107511,_0x1347b9);}}}else this['setAttack']();}}},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x877)]=Window_Selectable[_0x1c6d52(0x721)]['cursorDown'],Window_Selectable[_0x1c6d52(0x721)][_0x1c6d52(0x93a)]=function(_0x1ea6f1){const _0x50eb2f=_0x1c6d52;this['isUseModernControls']()&&_0x1ea6f1&&this[_0x50eb2f(0x213)]()===0x1&&this[_0x50eb2f(0x428)]()===this[_0x50eb2f(0x7b5)]()-0x1?this[_0x50eb2f(0x6da)](0x0):_0x50eb2f(0x251)!==_0x50eb2f(0x251)?this[_0x50eb2f(0x9cc)][_0x50eb2f(0x35f)]>=0x18&&(this[_0x50eb2f(0x9cc)][_0x50eb2f(0x35f)]-=0x6):VisuMZ[_0x50eb2f(0x7b7)]['Window_Selectable_cursorDown'][_0x50eb2f(0x78a)](this,_0x1ea6f1);},Window_Selectable[_0x1c6d52(0x721)][_0x1c6d52(0x850)]=function(_0x4a5fdb){const _0x3005ef=_0x1c6d52;let _0x2ab907=Math[_0x3005ef(0x269)](0x0,this[_0x3005ef(0x428)]());const _0x12742c=this['maxItems'](),_0x372b09=this[_0x3005ef(0x213)]();if(this[_0x3005ef(0x88a)]()&&_0x2ab907>0x0||_0x4a5fdb&&_0x372b09===0x1){_0x2ab907-=_0x372b09;if(_0x2ab907<=0x0)_0x2ab907=0x0;this['smoothSelect'](_0x2ab907);}else!this[_0x3005ef(0x88a)]()&&((_0x2ab907>=_0x372b09||_0x4a5fdb&&_0x372b09===0x1)&&(_0x3005ef(0x3f3)===_0x3005ef(0x3d5)?(_0x3c0bff[_0x3005ef(0x7b7)]['Scene_Map_initialize'][_0x3005ef(0x78a)](this),_0x228856[_0x3005ef(0x24a)](),this[_0x3005ef(0x914)]()):this[_0x3005ef(0x6da)]((_0x2ab907-_0x372b09+_0x12742c)%_0x12742c)));},VisuMZ[_0x1c6d52(0x7b7)]['Window_Selectable_cursorUp']=Window_Selectable[_0x1c6d52(0x721)][_0x1c6d52(0x850)],Window_Selectable[_0x1c6d52(0x721)]['cursorUp']=function(_0x107970){const _0x847f32=_0x1c6d52;this['isUseModernControls']()&&_0x107970&&this['maxCols']()===0x1&&this[_0x847f32(0x428)]()===0x0?_0x847f32(0x399)===_0x847f32(0x6c2)?(_0x28f1fe[_0x847f32(0x261)](),this[_0x847f32(0x657)]()):this['smoothSelect'](this['maxItems']()-0x1):VisuMZ['CoreEngine'][_0x847f32(0xa51)][_0x847f32(0x78a)](this,_0x107970);},Window_Selectable[_0x1c6d52(0x721)][_0x1c6d52(0x88a)]=function(){const _0x253c43=_0x1c6d52;return VisuMZ[_0x253c43(0x7b7)]['Settings'][_0x253c43(0x858)][_0x253c43(0x77b)];},VisuMZ['CoreEngine'][_0x1c6d52(0x8b9)]=Window_Selectable[_0x1c6d52(0x721)][_0x1c6d52(0xa15)],Window_Selectable[_0x1c6d52(0x721)][_0x1c6d52(0xa15)]=function(){const _0x280180=_0x1c6d52;this[_0x280180(0x88a)]()?(this[_0x280180(0x605)](),this[_0x280180(0x2d0)]()):'SRuvI'===_0x280180(0x7d4)?_0x264f77[_0x280180(0x1d2)]()||this[_0x280180(0x9e6)]?this['hideButtonFromView']():_0x9f5191['CoreEngine']['Sprite_Button_updateOpacity']['call'](this):VisuMZ[_0x280180(0x7b7)]['Window_Selectable_processCursorMove'][_0x280180(0x78a)](this);},Window_Selectable[_0x1c6d52(0x721)][_0x1c6d52(0x289)]=function(){return!![];},Window_Selectable[_0x1c6d52(0x721)][_0x1c6d52(0x605)]=function(){const _0x3bbf1c=_0x1c6d52;if(this['isCursorMovable']()){const _0x3d5edd=this['index']();if(Input[_0x3bbf1c(0x927)]('down')){if(Input[_0x3bbf1c(0x347)](_0x3bbf1c(0x2fc))&&this[_0x3bbf1c(0x289)]()){if(_0x3bbf1c(0x775)==='bVahP')this[_0x3bbf1c(0x8b5)]();else return _0x94bc91['layoutSettings']['StatusRect']['call'](this);}else _0x3bbf1c(0x57b)==='vcjmp'?this[_0x3bbf1c(0x93a)](Input['isTriggered'](_0x3bbf1c(0x545))):_0x5d2206['erasePicture'](_0x38841f);}if(Input['isRepeated']('up')){if(_0x3bbf1c(0x54c)!==_0x3bbf1c(0x9a4))Input[_0x3bbf1c(0x347)](_0x3bbf1c(0x2fc))&&this[_0x3bbf1c(0x289)]()?this[_0x3bbf1c(0x3e1)]():this[_0x3bbf1c(0x850)](Input[_0x3bbf1c(0x68f)]('up'));else return _0x14ec41[_0x3bbf1c(0x7b7)][_0x3bbf1c(0x719)]['UI'][_0x3bbf1c(0x253)];}Input[_0x3bbf1c(0x927)](_0x3bbf1c(0x60e))&&this[_0x3bbf1c(0xa2c)](Input['isTriggered']('right'));Input[_0x3bbf1c(0x927)](_0x3bbf1c(0x816))&&this['cursorLeft'](Input[_0x3bbf1c(0x68f)]('left'));!this[_0x3bbf1c(0x6c7)]('pagedown')&&Input[_0x3bbf1c(0x927)](_0x3bbf1c(0x2ae))&&this[_0x3bbf1c(0x8b5)]();!this['isHandled'](_0x3bbf1c(0x73d))&&Input[_0x3bbf1c(0x927)](_0x3bbf1c(0x73d))&&this[_0x3bbf1c(0x3e1)]();if(this['index']()!==_0x3d5edd){if(_0x3bbf1c(0x5e2)!==_0x3bbf1c(0x995))this['playCursorSound']();else return _0x58b247[_0x3bbf1c(0x7b7)][_0x3bbf1c(0x6a8)][_0x3bbf1c(0x78a)](this);}}},Window_Selectable['prototype'][_0x1c6d52(0x2d0)]=function(){const _0x4b54ab=_0x1c6d52;if(this[_0x4b54ab(0x84a)]()){const _0x4fd670=this['index']();Input['isTriggered']('home')&&this['smoothSelect'](Math[_0x4b54ab(0x42f)](this[_0x4b54ab(0x428)](),0x0));Input[_0x4b54ab(0x68f)](_0x4b54ab(0x5a2))&&this[_0x4b54ab(0x6da)](Math[_0x4b54ab(0x269)](this[_0x4b54ab(0x428)](),this[_0x4b54ab(0x7b5)]()-0x1));if(this[_0x4b54ab(0x428)]()!==_0x4fd670){if('ixhYz'===_0x4b54ab(0x5e8))this[_0x4b54ab(0x666)]();else{if(_0x469a15&&_0xd12c7[_0x4b54ab(0x7bd)]())return;_0x12ea22[_0x4b54ab(0x7b7)][_0x4b54ab(0x1d0)][_0x4b54ab(0x78a)](this,_0x46c1d5,_0x5e31fa,_0x170c61,_0x34d642);}}}},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x854)]=Window_Selectable[_0x1c6d52(0x721)]['processTouch'],Window_Selectable['prototype'][_0x1c6d52(0x615)]=function(){const _0x26ed03=_0x1c6d52;this['isUseModernControls']()?this[_0x26ed03(0x5b0)]():VisuMZ[_0x26ed03(0x7b7)]['Window_Selectable_processTouch'][_0x26ed03(0x78a)](this);},Window_Selectable[_0x1c6d52(0x721)]['processTouchModernControls']=function(){const _0x59a453=_0x1c6d52;VisuMZ['CoreEngine'][_0x59a453(0x854)][_0x59a453(0x78a)](this);},Window_Selectable['prototype']['colSpacing']=function(){const _0x504d13=_0x1c6d52;return VisuMZ[_0x504d13(0x7b7)]['Settings'][_0x504d13(0x5a1)][_0x504d13(0x463)];},Window_Selectable['prototype']['rowSpacing']=function(){const _0x42b702=_0x1c6d52;return VisuMZ[_0x42b702(0x7b7)][_0x42b702(0x719)][_0x42b702(0x5a1)]['RowSpacing'];},Window_Selectable[_0x1c6d52(0x721)][_0x1c6d52(0x600)]=function(){const _0x35acf8=_0x1c6d52;return Window_Scrollable['prototype']['itemHeight'][_0x35acf8(0x78a)](this)+VisuMZ[_0x35acf8(0x7b7)][_0x35acf8(0x719)]['Window'][_0x35acf8(0x6d7)];;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x7df)]=Window_Selectable['prototype'][_0x1c6d52(0x8d3)],Window_Selectable['prototype']['drawBackgroundRect']=function(_0x250b31){const _0x2e8080=_0x1c6d52,_0x5f1af5=VisuMZ[_0x2e8080(0x7b7)][_0x2e8080(0x719)]['Window'];if(_0x5f1af5[_0x2e8080(0x764)]===![])return;_0x5f1af5[_0x2e8080(0x718)]?_0x2e8080(0x4cc)!==_0x2e8080(0x864)?_0x5f1af5[_0x2e8080(0x718)][_0x2e8080(0x78a)](this,_0x250b31):_0x5acced[_0x2e8080(0x98f)]&&(this[_0x2e8080(0x3c1)]=_0x2e8080(0x8db)):VisuMZ[_0x2e8080(0x7b7)][_0x2e8080(0x7df)][_0x2e8080(0x78a)](this,_0x250b31);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x410)]=Window_Gold[_0x1c6d52(0x721)][_0x1c6d52(0x7ae)],Window_Gold[_0x1c6d52(0x721)][_0x1c6d52(0x7ae)]=function(){const _0x309a79=_0x1c6d52;this['isItemStyle']()?this['drawGoldItemStyle']():VisuMZ[_0x309a79(0x7b7)]['Window_Gold_refresh'][_0x309a79(0x78a)](this);},Window_Gold['prototype'][_0x1c6d52(0x67a)]=function(){const _0x31c978=_0x1c6d52;if(TextManager[_0x31c978(0x8a0)]!==this[_0x31c978(0x8a0)]())return![];return VisuMZ[_0x31c978(0x7b7)][_0x31c978(0x719)][_0x31c978(0x92f)][_0x31c978(0x23a)];},Window_Gold[_0x1c6d52(0x721)][_0x1c6d52(0x5a4)]=function(){const _0x54ed2b=_0x1c6d52;this[_0x54ed2b(0x86e)](),this[_0x54ed2b(0x9cc)]['clear'](),this[_0x54ed2b(0x9cc)][_0x54ed2b(0x35f)]=VisuMZ[_0x54ed2b(0x7b7)][_0x54ed2b(0x719)]['Gold'][_0x54ed2b(0x2ad)];const _0x5da40a=VisuMZ[_0x54ed2b(0x7b7)][_0x54ed2b(0x719)][_0x54ed2b(0x92f)][_0x54ed2b(0x6bd)],_0x4e8e31=this[_0x54ed2b(0x597)](0x0);if(_0x5da40a>0x0){const _0x1ff67f=_0x4e8e31['y']+(this[_0x54ed2b(0x800)]()-ImageManager[_0x54ed2b(0x5d5)])/0x2;this[_0x54ed2b(0x7c1)](_0x5da40a,_0x4e8e31['x'],_0x1ff67f);const _0x1cc932=ImageManager[_0x54ed2b(0x5c9)]+0x4;_0x4e8e31['x']+=_0x1cc932,_0x4e8e31[_0x54ed2b(0x552)]-=_0x1cc932;}this[_0x54ed2b(0x7d3)](ColorManager[_0x54ed2b(0x89e)]()),this[_0x54ed2b(0x60d)](this['currencyUnit'](),_0x4e8e31['x'],_0x4e8e31['y'],_0x4e8e31[_0x54ed2b(0x552)],'left');const _0x300f2f=this[_0x54ed2b(0x70d)](this[_0x54ed2b(0x8a0)]())+0x6;;_0x4e8e31['x']+=_0x300f2f,_0x4e8e31[_0x54ed2b(0x552)]-=_0x300f2f,this[_0x54ed2b(0x3be)]();const _0x5eca3c=this['value'](),_0x333c38=this[_0x54ed2b(0x70d)](this[_0x54ed2b(0x395)]?VisuMZ[_0x54ed2b(0x279)](this[_0x54ed2b(0x4d0)]()):this[_0x54ed2b(0x4d0)]());_0x333c38>_0x4e8e31['width']?this[_0x54ed2b(0x60d)](VisuMZ[_0x54ed2b(0x7b7)]['Settings'][_0x54ed2b(0x92f)][_0x54ed2b(0x2eb)],_0x4e8e31['x'],_0x4e8e31['y'],_0x4e8e31['width'],_0x54ed2b(0x60e)):this[_0x54ed2b(0x60d)](this['value'](),_0x4e8e31['x'],_0x4e8e31['y'],_0x4e8e31[_0x54ed2b(0x552)],'right'),this['resetFontSettings']();},Window_StatusBase[_0x1c6d52(0x721)][_0x1c6d52(0x299)]=function(_0xbe27ba,_0xace6ba,_0x49ebea,_0x30705c,_0xda86f){const _0x28db7d=_0x1c6d52;_0x30705c=String(_0x30705c||'')[_0x28db7d(0x5dd)]();if(VisuMZ[_0x28db7d(0x7b7)][_0x28db7d(0x719)][_0x28db7d(0x8a8)][_0x28db7d(0x77a)]){if(_0x28db7d(0x33c)===_0x28db7d(0x33c)){const _0x1aa155=VisuMZ[_0x28db7d(0x896)](_0x30705c);_0xda86f?(this[_0x28db7d(0x43c)](_0x1aa155,_0xbe27ba,_0xace6ba,this[_0x28db7d(0x405)]()),_0x49ebea-=this[_0x28db7d(0x405)]()+0x2,_0xbe27ba+=this[_0x28db7d(0x405)]()+0x2):(this[_0x28db7d(0x7c1)](_0x1aa155,_0xbe27ba+0x2,_0xace6ba+0x2),_0x49ebea-=ImageManager[_0x28db7d(0x5c9)]+0x4,_0xbe27ba+=ImageManager[_0x28db7d(0x5c9)]+0x4);}else{_0xef6c1b[_0x28db7d(0x394)](_0x2a9e54,_0x23277d);const _0x4e3857=_0x24c5d7['round'](_0x443e86['volume'])[_0x28db7d(0xa23)](0x0,0x64),_0x3399ab=_0x5e05ac['_currentBgm'];_0x3399ab&&(_0x3399ab['volume']=_0x4e3857,_0x1ec92f[_0x28db7d(0x321)](_0x3399ab),_0x5bd827[_0x28db7d(0x793)](_0x3399ab));}}const _0x107849=TextManager['param'](_0x30705c);this['resetFontSettings'](),this[_0x28db7d(0x7d3)](ColorManager[_0x28db7d(0x89e)]()),_0xda86f?(this[_0x28db7d(0x9cc)][_0x28db7d(0x35f)]=this['smallParamFontSize'](),this['contents'][_0x28db7d(0x60d)](_0x107849,_0xbe27ba,_0xace6ba,_0x49ebea,this[_0x28db7d(0x405)](),_0x28db7d(0x816))):this[_0x28db7d(0x60d)](_0x107849,_0xbe27ba,_0xace6ba,_0x49ebea),this[_0x28db7d(0x86e)]();},Window_StatusBase[_0x1c6d52(0x721)][_0x1c6d52(0x6a1)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase['prototype']['drawActorClass']=function(_0x420c22,_0x1e507f,_0x541a87,_0x105a72){const _0x51dc93=_0x1c6d52;_0x105a72=_0x105a72||0xa8,this['resetTextColor']();if(VisuMZ[_0x51dc93(0x7b7)][_0x51dc93(0x719)]['UI']['TextCodeClassNames'])_0x51dc93(0x6ae)!=='KJQTw'?this[_0x51dc93(0x395)]=_0xa36796:this['drawTextEx'](_0x420c22[_0x51dc93(0x438)]()['name'],_0x1e507f,_0x541a87,_0x105a72);else{const _0x192629=_0x420c22[_0x51dc93(0x438)]()[_0x51dc93(0x4fb)]['replace'](/\\I\[(\d+)\]/gi,'');this[_0x51dc93(0x60d)](_0x192629,_0x1e507f,_0x541a87,_0x105a72);}},Window_StatusBase[_0x1c6d52(0x721)][_0x1c6d52(0x31d)]=function(_0x2647a7,_0x46bf49,_0x328066,_0x4a87d8){const _0x116b50=_0x1c6d52;_0x4a87d8=_0x4a87d8||0x10e,this[_0x116b50(0x3be)]();if(VisuMZ['CoreEngine'][_0x116b50(0x719)]['UI']['TextCodeNicknames'])_0x116b50(0x3d8)===_0x116b50(0x73c)?this['contents'][_0x116b50(0x35f)]<=0x60&&(this[_0x116b50(0x9cc)]['fontSize']+=0x6):this[_0x116b50(0x467)](_0x2647a7[_0x116b50(0x61b)](),_0x46bf49,_0x328066,_0x4a87d8);else{const _0x9cc573=_0x2647a7[_0x116b50(0x61b)]()[_0x116b50(0x9c5)](/\\I\[(\d+)\]/gi,'');this[_0x116b50(0x60d)](_0x2647a7['nickname'](),_0x46bf49,_0x328066,_0x4a87d8);}},VisuMZ[_0x1c6d52(0x7b7)]['Window_StatusBase_drawActorLevel']=Window_StatusBase[_0x1c6d52(0x721)][_0x1c6d52(0x74c)],Window_StatusBase[_0x1c6d52(0x721)][_0x1c6d52(0x74c)]=function(_0x33f4cf,_0x30ebf3,_0x45c7c8){const _0x2c34f1=_0x1c6d52;if(VisuMZ['CoreEngine'][_0x2c34f1(0x719)][_0x2c34f1(0x8a8)]['ShowActorLevel']===![])return;if(this['isExpGaugeDrawn']())this[_0x2c34f1(0x1fb)](_0x33f4cf,_0x30ebf3,_0x45c7c8);VisuMZ[_0x2c34f1(0x7b7)][_0x2c34f1(0x1f3)]['call'](this,_0x33f4cf,_0x30ebf3,_0x45c7c8);},Window_StatusBase['prototype'][_0x1c6d52(0x6e1)]=function(){const _0x3db96d=_0x1c6d52;return VisuMZ['CoreEngine'][_0x3db96d(0x719)]['UI'][_0x3db96d(0xa0a)];},Window_StatusBase['prototype']['drawActorExpGauge']=function(_0x2185b5,_0x57f701,_0x35ddb3){const _0x16a2a0=_0x1c6d52;if(!_0x2185b5)return;if(!_0x2185b5[_0x16a2a0(0x5c8)]())return;const _0x1b4f17=0x80,_0x261cea=_0x2185b5[_0x16a2a0(0x375)]();let _0xc78b32=ColorManager[_0x16a2a0(0x4c1)](),_0x449d31=ColorManager[_0x16a2a0(0x1e4)]();_0x261cea>=0x1&&(_0xc78b32=ColorManager[_0x16a2a0(0x678)](),_0x449d31=ColorManager[_0x16a2a0(0x280)]()),this[_0x16a2a0(0x55c)](_0x57f701,_0x35ddb3,_0x1b4f17,_0x261cea,_0xc78b32,_0x449d31);},Window_EquipStatus[_0x1c6d52(0x721)]['drawAllParams']=function(){const _0x146f49=_0x1c6d52;let _0x16b55e=0x0;for(const _0x271b53 of VisuMZ[_0x146f49(0x7b7)][_0x146f49(0x719)][_0x146f49(0x8a8)][_0x146f49(0x437)]){const _0x50499b=this['itemPadding'](),_0x5f4a06=this[_0x146f49(0x6b1)](_0x16b55e);this['drawItem'](_0x50499b,_0x5f4a06,_0x271b53),_0x16b55e++;}},Window_EquipStatus[_0x1c6d52(0x721)][_0x1c6d52(0x561)]=function(_0x32966e,_0x578f3c,_0x213f76){const _0x6f16d7=_0x1c6d52,_0x1123f7=this[_0x6f16d7(0x4fe)]()-this['itemPadding']()*0x2;this['drawParamText'](_0x32966e,_0x578f3c,_0x1123f7,_0x213f76,![]);},Window_EquipStatus[_0x1c6d52(0x721)][_0x1c6d52(0x62a)]=function(_0x575b5e,_0x2b4942,_0x11602a){const _0x4ad203=_0x1c6d52,_0xf9329c=this[_0x4ad203(0x3c4)]();this[_0x4ad203(0x3be)](),this[_0x4ad203(0x60d)](this[_0x4ad203(0x70a)][_0x4ad203(0x415)](_0x11602a,!![]),_0x575b5e,_0x2b4942,_0xf9329c,_0x4ad203(0x60e));},Window_EquipStatus['prototype'][_0x1c6d52(0x504)]=function(_0x3e1f2b,_0x8d348b){const _0x11a3ef=_0x1c6d52,_0x35ee32=this[_0x11a3ef(0x402)]();this['changeTextColor'](ColorManager['systemColor']());const _0x34aa42=VisuMZ[_0x11a3ef(0x7b7)][_0x11a3ef(0x719)]['UI'][_0x11a3ef(0x71a)];this[_0x11a3ef(0x60d)](_0x34aa42,_0x3e1f2b,_0x8d348b,_0x35ee32,_0x11a3ef(0x735));},Window_EquipStatus[_0x1c6d52(0x721)]['drawNewParam']=function(_0x3a3d74,_0x5782ad,_0x3fc28c){const _0x102f7e=_0x1c6d52,_0x555901=this[_0x102f7e(0x3c4)](),_0x3f3880=this[_0x102f7e(0x21f)][_0x102f7e(0x415)](_0x3fc28c),_0x17d83e=_0x3f3880-this['_actor'][_0x102f7e(0x415)](_0x3fc28c);this[_0x102f7e(0x7d3)](ColorManager[_0x102f7e(0x9f3)](_0x17d83e)),this[_0x102f7e(0x60d)](this[_0x102f7e(0x21f)][_0x102f7e(0x415)](_0x3fc28c,!![]),_0x3a3d74,_0x5782ad,_0x555901,_0x102f7e(0x60e));},VisuMZ['CoreEngine'][_0x1c6d52(0x955)]=Window_EquipItem[_0x1c6d52(0x721)][_0x1c6d52(0xa25)],Window_EquipItem[_0x1c6d52(0x721)][_0x1c6d52(0xa25)]=function(_0xce962){const _0x5b83df=_0x1c6d52;if(_0xce962&&this[_0x5b83df(0x70a)]){if(_0x5b83df(0x92a)===_0x5b83df(0x92a))return this['_actor'][_0x5b83df(0x72b)](_0xce962);else{this[_0x5b83df(0x6ef)]();const _0x599085=this[_0x5b83df(0x55e)];_0x14f027[_0x5b83df(0x7b7)][_0x5b83df(0x234)][_0x5b83df(0x78a)](this),_0x599085>0x0&&this['_duration']<=0x0&&(this['_x']=this['_targetX'],this['_y']=this['_targetY'],this[_0x5b83df(0x4f9)]=this[_0x5b83df(0x49c)],this[_0x5b83df(0x35b)]=this['_targetScaleY'],this['_opacity']=this[_0x5b83df(0x968)],this[_0x5b83df(0x69b)]&&(this['_anchor']['x']=this[_0x5b83df(0x7b2)]['x'],this[_0x5b83df(0x69b)]['y']=this[_0x5b83df(0x7b2)]['y']));}}else{if(_0x5b83df(0x2f5)!=='IxIvI')return VisuMZ['CoreEngine']['Window_EquipItem_isEnabled'][_0x5b83df(0x78a)](this,_0xce962);else this[_0x5b83df(0x69b)]['x']=this[_0x5b83df(0x9d6)](this[_0x5b83df(0x69b)]['x'],this[_0x5b83df(0x7b2)]['x']),this[_0x5b83df(0x69b)]['y']=this['applyEasing'](this[_0x5b83df(0x69b)]['y'],this[_0x5b83df(0x7b2)]['y']);}},Window_StatusParams[_0x1c6d52(0x721)][_0x1c6d52(0x7b5)]=function(){const _0x3bb61b=_0x1c6d52;return VisuMZ[_0x3bb61b(0x7b7)][_0x3bb61b(0x719)][_0x3bb61b(0x8a8)][_0x3bb61b(0x437)][_0x3bb61b(0x3bf)];},Window_StatusParams[_0x1c6d52(0x721)][_0x1c6d52(0x976)]=function(_0x260117){const _0x277a9a=_0x1c6d52,_0x8b8d12=this[_0x277a9a(0x597)](_0x260117),_0x44ef10=VisuMZ[_0x277a9a(0x7b7)][_0x277a9a(0x719)]['Param']['DisplayedParams'][_0x260117],_0x379cd6=TextManager[_0x277a9a(0x2d4)](_0x44ef10),_0x5b2eab=this[_0x277a9a(0x70a)][_0x277a9a(0x415)](_0x44ef10,!![]);this['drawParamText'](_0x8b8d12['x'],_0x8b8d12['y'],0xa0,_0x44ef10,![]),this[_0x277a9a(0x3be)](),this[_0x277a9a(0x60d)](_0x5b2eab,_0x8b8d12['x']+0xa0,_0x8b8d12['y'],0x3c,_0x277a9a(0x60e));};if(VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)]['KeyboardInput'][_0x1c6d52(0x38a)]){VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)][_0x1c6d52(0x6b8)][_0x1c6d52(0x2bc)]&&(Window_NameInput[_0x1c6d52(0xa35)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x1c6d52(0x50a),'OK']);;VisuMZ['CoreEngine']['Window_NameInput_initialize']=Window_NameInput[_0x1c6d52(0x721)][_0x1c6d52(0x271)],Window_NameInput[_0x1c6d52(0x721)][_0x1c6d52(0x271)]=function(_0x1e5d17){const _0x3e6840=_0x1c6d52;this['_mode']=this[_0x3e6840(0x87a)](),VisuMZ[_0x3e6840(0x7b7)][_0x3e6840(0x50c)][_0x3e6840(0x78a)](this,_0x1e5d17),this[_0x3e6840(0x7f7)]===_0x3e6840(0x66c)?_0x3e6840(0x9a2)===_0x3e6840(0x9a2)?this['select'](0x0):this[_0x3e6840(0x3d7)]():(Input[_0x3e6840(0x261)](),this[_0x3e6840(0x2d7)]());},Window_NameInput[_0x1c6d52(0x721)]['defaultInputMode']=function(){const _0x497c92=_0x1c6d52;if(Input[_0x497c92(0x2b4)]())return'default';return VisuMZ[_0x497c92(0x7b7)][_0x497c92(0x719)]['KeyboardInput']['DefaultMode']||_0x497c92(0x445);},VisuMZ[_0x1c6d52(0x7b7)]['Window_NameInput_processHandling']=Window_NameInput[_0x1c6d52(0x721)][_0x1c6d52(0x348)],Window_NameInput[_0x1c6d52(0x721)][_0x1c6d52(0x348)]=function(){const _0x191f26=_0x1c6d52;if(!this[_0x191f26(0x408)]())return;if(!this[_0x191f26(0x6a5)])return;if(this[_0x191f26(0x7f7)]===_0x191f26(0x445)&&Input[_0x191f26(0x760)]())this[_0x191f26(0x3db)](_0x191f26(0x66c));else{if(Input['isSpecialCode'](_0x191f26(0x97e)))Input[_0x191f26(0x261)](),this[_0x191f26(0x657)]();else{if(Input[_0x191f26(0x68f)](_0x191f26(0x7db)))Input['clear'](),this['_mode']==='keyboard'?this[_0x191f26(0x3db)](_0x191f26(0x66c)):this['switchModes']('keyboard');else{if(this[_0x191f26(0x7f7)]===_0x191f26(0x445))this[_0x191f26(0x2c8)]();else{if(Input[_0x191f26(0x7e2)](_0x191f26(0x6d8)))Input[_0x191f26(0x261)](),this[_0x191f26(0x3db)](_0x191f26(0x445));else{if(_0x191f26(0x30a)!==_0x191f26(0x455))VisuMZ[_0x191f26(0x7b7)][_0x191f26(0x823)][_0x191f26(0x78a)](this);else return _0x8d9d25[_0x191f26(0x7b7)][_0x191f26(0x2a1)][_0x191f26(0x78a)](this,_0x14be69);}}}}}},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x983)]=Window_NameInput[_0x1c6d52(0x721)][_0x1c6d52(0x615)],Window_NameInput['prototype']['processTouch']=function(){const _0x2a995c=_0x1c6d52;if(!this[_0x2a995c(0x20f)]())return;if(this[_0x2a995c(0x7f7)]===_0x2a995c(0x445)){if(_0x2a995c(0x6cd)===_0x2a995c(0x6cd)){if(TouchInput[_0x2a995c(0x68f)]()&&this[_0x2a995c(0x48f)]())this['switchModes']('default');else TouchInput[_0x2a995c(0x7da)]()&&(_0x2a995c(0x4cb)!=='lgoOK'?this[_0x2a995c(0x779)]=0xff:this[_0x2a995c(0x3db)](_0x2a995c(0x66c)));}else{if(_0x18b7a7[_0x2a995c(0x2b4)]())return'default';return _0x21316a[_0x2a995c(0x7b7)][_0x2a995c(0x719)][_0x2a995c(0x6b8)][_0x2a995c(0x41f)]||_0x2a995c(0x445);}}else VisuMZ['CoreEngine'][_0x2a995c(0x983)]['call'](this);},Window_NameInput[_0x1c6d52(0x721)][_0x1c6d52(0x2c8)]=function(){const _0x2e3109=_0x1c6d52;if(Input[_0x2e3109(0x7e2)]('enter'))Input[_0x2e3109(0x261)](),this[_0x2e3109(0x8f9)]();else{if(Input[_0x2e3109(0x75c)]!==undefined){let _0x4bc96=Input[_0x2e3109(0x75c)],_0x48efd6=_0x4bc96[_0x2e3109(0x3bf)];for(let _0x3fd518=0x0;_0x3fd518<_0x48efd6;++_0x3fd518){this[_0x2e3109(0x879)][_0x2e3109(0x4d9)](_0x4bc96[_0x3fd518])?_0x2e3109(0x4e9)===_0x2e3109(0x4e9)?SoundManager[_0x2e3109(0x8f0)]():this['drawSegment'](_0x4699a6):SoundManager['playBuzzer']();}Input[_0x2e3109(0x261)]();}}},Window_NameInput[_0x1c6d52(0x721)]['switchModes']=function(_0x538373){const _0x6a4416=_0x1c6d52;let _0x430624=this[_0x6a4416(0x7f7)];this[_0x6a4416(0x7f7)]=_0x538373;if(_0x430624!==this[_0x6a4416(0x7f7)]){this[_0x6a4416(0x7ae)](),SoundManager[_0x6a4416(0x8f0)]();if(this['_mode']===_0x6a4416(0x66c)){if(_0x6a4416(0x45a)!==_0x6a4416(0x9a9))this[_0x6a4416(0x5dc)](0x0);else{const _0xe82fee=_0x6a4416(0x9e9)['format'](_0x58c051[_0x6a4416(0x5bd)](0x3)),_0x50cddf=new _0x4eeb5d(),_0x5766a6='data/'+_0xe82fee;_0x50cddf[_0x6a4416(0x63d)]('GET',_0x5766a6),_0x50cddf[_0x6a4416(0x9ae)]('application/json'),_0x50cddf[_0x6a4416(0x490)]=()=>this[_0x6a4416(0x2e5)](_0x50cddf,_0x7941e5,_0xe82fee,_0x5766a6),_0x50cddf[_0x6a4416(0x7c9)]=()=>_0x594f94[_0x6a4416(0x79b)](_0x6a4416(0x95c),_0xe82fee,_0x5766a6),_0x50cddf[_0x6a4416(0x72e)]();}}else this[_0x6a4416(0x5dc)](-0x1);}},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x7d7)]=Window_NameInput[_0x1c6d52(0x721)][_0x1c6d52(0x93a)],Window_NameInput['prototype'][_0x1c6d52(0x93a)]=function(_0x10f2f3){const _0x20d305=_0x1c6d52;if(this['_mode']===_0x20d305(0x445)&&!Input[_0x20d305(0xa38)]())return;if(Input[_0x20d305(0x4c3)]())return;VisuMZ[_0x20d305(0x7b7)][_0x20d305(0x7d7)][_0x20d305(0x78a)](this,_0x10f2f3),this['switchModes'](_0x20d305(0x66c));},VisuMZ['CoreEngine'][_0x1c6d52(0x7c5)]=Window_NameInput[_0x1c6d52(0x721)][_0x1c6d52(0x850)],Window_NameInput[_0x1c6d52(0x721)][_0x1c6d52(0x850)]=function(_0x4cae30){const _0x4c64aa=_0x1c6d52;if(this[_0x4c64aa(0x7f7)]===_0x4c64aa(0x445)&&!Input[_0x4c64aa(0xa38)]())return;if(Input[_0x4c64aa(0x4c3)]())return;VisuMZ[_0x4c64aa(0x7b7)][_0x4c64aa(0x7c5)][_0x4c64aa(0x78a)](this,_0x4cae30),this[_0x4c64aa(0x3db)](_0x4c64aa(0x66c));},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x82d)]=Window_NameInput[_0x1c6d52(0x721)]['cursorRight'],Window_NameInput['prototype'][_0x1c6d52(0xa2c)]=function(_0x2de0c9){const _0x1adbca=_0x1c6d52;if(this['_mode']===_0x1adbca(0x445)&&!Input[_0x1adbca(0xa38)]())return;if(Input[_0x1adbca(0x4c3)]())return;VisuMZ[_0x1adbca(0x7b7)][_0x1adbca(0x82d)]['call'](this,_0x2de0c9),this[_0x1adbca(0x3db)](_0x1adbca(0x66c));},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x6d1)]=Window_NameInput[_0x1c6d52(0x721)][_0x1c6d52(0x7ca)],Window_NameInput[_0x1c6d52(0x721)][_0x1c6d52(0x7ca)]=function(_0x595e12){const _0x3909b1=_0x1c6d52;if(this['_mode']==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0x3909b1(0x4c3)]())return;VisuMZ[_0x3909b1(0x7b7)][_0x3909b1(0x6d1)][_0x3909b1(0x78a)](this,_0x595e12),this['switchModes'](_0x3909b1(0x66c));},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x1fd)]=Window_NameInput[_0x1c6d52(0x721)]['cursorPagedown'],Window_NameInput[_0x1c6d52(0x721)][_0x1c6d52(0x8b5)]=function(){const _0xe902fb=_0x1c6d52;if(this[_0xe902fb(0x7f7)]==='keyboard')return;if(Input[_0xe902fb(0x4c3)]())return;VisuMZ[_0xe902fb(0x7b7)]['Window_NameInput_cursorPagedown']['call'](this),this[_0xe902fb(0x3db)](_0xe902fb(0x66c));},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x69c)]=Window_NameInput[_0x1c6d52(0x721)]['cursorPageup'],Window_NameInput['prototype'][_0x1c6d52(0x3e1)]=function(){const _0x270470=_0x1c6d52;if(this[_0x270470(0x7f7)]===_0x270470(0x445))return;if(Input[_0x270470(0x4c3)]())return;VisuMZ[_0x270470(0x7b7)][_0x270470(0x69c)][_0x270470(0x78a)](this),this[_0x270470(0x3db)](_0x270470(0x66c));},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x9f1)]=Window_NameInput['prototype'][_0x1c6d52(0x7ae)],Window_NameInput[_0x1c6d52(0x721)][_0x1c6d52(0x7ae)]=function(){const _0x497001=_0x1c6d52;if(this[_0x497001(0x7f7)]===_0x497001(0x445)){this[_0x497001(0x9cc)][_0x497001(0x261)](),this[_0x497001(0x980)][_0x497001(0x261)](),this[_0x497001(0x3be)]();let _0x325f45=VisuMZ[_0x497001(0x7b7)][_0x497001(0x719)][_0x497001(0x6b8)]['NameInputMessage'][_0x497001(0x42c)]('\x0a'),_0x4c6b2d=_0x325f45['length'],_0x1bff20=(this[_0x497001(0x7fb)]-_0x4c6b2d*this['lineHeight']())/0x2;for(let _0x30ff49=0x0;_0x30ff49<_0x4c6b2d;++_0x30ff49){let _0x3c5011=_0x325f45[_0x30ff49],_0x4eb2c9=this[_0x497001(0x386)](_0x3c5011)[_0x497001(0x552)],_0x5aebc4=Math[_0x497001(0x403)]((this[_0x497001(0x9cc)][_0x497001(0x552)]-_0x4eb2c9)/0x2);this[_0x497001(0x467)](_0x3c5011,_0x5aebc4,_0x1bff20),_0x1bff20+=this[_0x497001(0x800)]();}}else VisuMZ[_0x497001(0x7b7)][_0x497001(0x9f1)][_0x497001(0x78a)](this);};};VisuMZ['CoreEngine'][_0x1c6d52(0x21a)]=Window_ShopSell[_0x1c6d52(0x721)][_0x1c6d52(0xa25)],Window_ShopSell[_0x1c6d52(0x721)][_0x1c6d52(0xa25)]=function(_0x49be9a){const _0x159156=_0x1c6d52;if(VisuMZ[_0x159156(0x7b7)][_0x159156(0x719)][_0x159156(0x858)][_0x159156(0x645)]&&DataManager[_0x159156(0x22e)](_0x49be9a)){if(_0x159156(0x890)!==_0x159156(0x890)){_0x32ea18['CoreEngine'][_0x159156(0x820)]['call'](this);if(_0x2a3b59[_0x159156(0x728)]>=_0x159156(0x41c)){if(typeof _0x2d78ff===_0x159156(0x653))_0x3ca0d2['App'][_0x159156(0x3ce)]();}}else return![];}else return VisuMZ[_0x159156(0x7b7)][_0x159156(0x21a)][_0x159156(0x78a)](this,_0x49be9a);},Window_NumberInput[_0x1c6d52(0x721)][_0x1c6d52(0x88a)]=function(){return![];};VisuMZ['CoreEngine']['Settings'][_0x1c6d52(0x6b8)][_0x1c6d52(0x61a)]&&(VisuMZ['CoreEngine'][_0x1c6d52(0x451)]=Window_NumberInput[_0x1c6d52(0x721)][_0x1c6d52(0x9d7)],Window_NumberInput[_0x1c6d52(0x721)][_0x1c6d52(0x9d7)]=function(){const _0x538016=_0x1c6d52;VisuMZ['CoreEngine']['Window_NumberInput_start'][_0x538016(0x78a)](this),this[_0x538016(0x5dc)](this[_0x538016(0x4bc)]-0x1),Input['clear']();},VisuMZ[_0x1c6d52(0x7b7)]['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x1c6d52(0x721)][_0x1c6d52(0x1ae)],Window_NumberInput[_0x1c6d52(0x721)]['processDigitChange']=function(){const _0x54edd9=_0x1c6d52;if(!this[_0x54edd9(0x20f)]())return;if(Input[_0x54edd9(0x4c3)]())this['processKeyboardDigitChange']();else{if(Input['isSpecialCode'](_0x54edd9(0x97e)))this['processKeyboardBackspace']();else{if(Input[_0x54edd9(0x43b)]===0x2e)this[_0x54edd9(0x7cd)]();else{if(Input[_0x54edd9(0x43b)]===0x24)this[_0x54edd9(0x4ef)]();else Input['_inputSpecialKeyCode']===0x23?this[_0x54edd9(0x295)]():_0x54edd9(0x46f)===_0x54edd9(0x46f)?VisuMZ[_0x54edd9(0x7b7)][_0x54edd9(0x581)]['call'](this):this[_0x54edd9(0x7e4)]={};}}}},Window_NumberInput[_0x1c6d52(0x721)][_0x1c6d52(0xa15)]=function(){const _0x398bb3=_0x1c6d52;if(!this[_0x398bb3(0x84a)]())return;Input[_0x398bb3(0x4c3)]()?this['processKeyboardDigitChange']():Window_Selectable[_0x398bb3(0x721)][_0x398bb3(0xa15)][_0x398bb3(0x78a)](this);},Window_NumberInput[_0x1c6d52(0x721)][_0x1c6d52(0x2d0)]=function(){},Window_NumberInput[_0x1c6d52(0x721)][_0x1c6d52(0x3d7)]=function(){const _0x23c247=_0x1c6d52;if(String(this['_number'])[_0x23c247(0x3bf)]>=this[_0x23c247(0x4bc)])return;const _0x27fc8a=Number(String(this[_0x23c247(0x3a2)])+Input['_inputString']);if(isNaN(_0x27fc8a))return;this[_0x23c247(0x3a2)]=_0x27fc8a;const _0x5c2aef='9'[_0x23c247(0x608)](this[_0x23c247(0x4bc)]);this['_number']=this['_number']['clamp'](0x0,_0x5c2aef),Input[_0x23c247(0x261)](),this[_0x23c247(0x7ae)](),SoundManager['playCursor'](),this['select'](this[_0x23c247(0x4bc)]-0x1);},Window_NumberInput['prototype'][_0x1c6d52(0x59b)]=function(){const _0x51918b=_0x1c6d52;this['_number']=Number(String(this[_0x51918b(0x3a2)])[_0x51918b(0x217)](0x0,-0x1)),this[_0x51918b(0x3a2)]=Math['max'](0x0,this[_0x51918b(0x3a2)]),Input['clear'](),this[_0x51918b(0x7ae)](),SoundManager['playCursor'](),this[_0x51918b(0x5dc)](this[_0x51918b(0x4bc)]-0x1);},Window_NumberInput[_0x1c6d52(0x721)]['processKeyboardDelete']=function(){const _0x538252=_0x1c6d52;this['_number']=Number(String(this[_0x538252(0x3a2)])[_0x538252(0x834)](0x1)),this[_0x538252(0x3a2)]=Math['max'](0x0,this['_number']),Input[_0x538252(0x261)](),this['refresh'](),SoundManager[_0x538252(0x985)](),this[_0x538252(0x5dc)](this['_maxDigits']-0x1);},Window_NumberInput['prototype']['processKeyboardHome']=function(){const _0x1a5c90=_0x1c6d52;if(this[_0x1a5c90(0x428)]()===0x0)return;Input[_0x1a5c90(0x261)](),this[_0x1a5c90(0x7ae)](),SoundManager[_0x1a5c90(0x985)](),this[_0x1a5c90(0x5dc)](0x0);},Window_NumberInput['prototype'][_0x1c6d52(0x295)]=function(){const _0x3c0476=_0x1c6d52;if(this[_0x3c0476(0x428)]()===this['_maxDigits']-0x1)return;Input[_0x3c0476(0x261)](),this[_0x3c0476(0x7ae)](),SoundManager[_0x3c0476(0x985)](),this[_0x3c0476(0x5dc)](this[_0x3c0476(0x4bc)]-0x1);});;VisuMZ[_0x1c6d52(0x7b7)]['Window_MapName_refresh']=Window_MapName[_0x1c6d52(0x721)][_0x1c6d52(0x7ae)],Window_MapName[_0x1c6d52(0x721)][_0x1c6d52(0x7ae)]=function(){const _0x29f438=_0x1c6d52;VisuMZ[_0x29f438(0x7b7)]['Settings']['QoL']['MapNameTextCode']?'oINNi'!=='oINNi'?_0x4f1636[_0x29f438(0x7b7)][_0x29f438(0x87e)][_0x29f438(0x78a)](this,_0xabd9db):this[_0x29f438(0x3ae)]():VisuMZ[_0x29f438(0x7b7)][_0x29f438(0x759)]['call'](this);},Window_MapName['prototype'][_0x1c6d52(0x3ae)]=function(){const _0x30035f=_0x1c6d52;this[_0x30035f(0x9cc)][_0x30035f(0x261)]();if($gameMap[_0x30035f(0x3ec)]()){if(_0x30035f(0x669)===_0x30035f(0x669)){const _0x5bcd33=this['innerWidth'];this[_0x30035f(0x993)](0x0,0x0,_0x5bcd33,this[_0x30035f(0x800)]());const _0x160fae=this[_0x30035f(0x386)]($gameMap[_0x30035f(0x3ec)]())['width'];this['drawTextEx']($gameMap[_0x30035f(0x3ec)](),Math[_0x30035f(0x403)]((_0x5bcd33-_0x160fae)/0x2),0x0);}else{if(_0x17d62b(this[_0x30035f(0x3a2)])[_0x30035f(0x3bf)]>=this[_0x30035f(0x4bc)])return;const _0x4d9e72=_0x34029f(_0x5e4902(this['_number'])+_0x1edaef[_0x30035f(0x75c)]);if(_0x5ec615(_0x4d9e72))return;this['_number']=_0x4d9e72;const _0x32bb53='9'['repeat'](this['_maxDigits']);this['_number']=this[_0x30035f(0x3a2)][_0x30035f(0xa23)](0x0,_0x32bb53),_0x23a721[_0x30035f(0x261)](),this[_0x30035f(0x7ae)](),_0xbc406d[_0x30035f(0x985)](),this[_0x30035f(0x5dc)](this[_0x30035f(0x4bc)]-0x1);}}},Window_TitleCommand[_0x1c6d52(0x699)]=VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)]['TitleCommandList'],Window_TitleCommand[_0x1c6d52(0x721)][_0x1c6d52(0x7e6)]=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand[_0x1c6d52(0x721)][_0x1c6d52(0x2b6)]=function(){const _0x2c4bda=_0x1c6d52;for(const _0x3c476b of Window_TitleCommand[_0x2c4bda(0x699)]){if(_0x2c4bda(0x3b8)!==_0x2c4bda(0x3b8))return;else{if(_0x3c476b[_0x2c4bda(0x8f1)][_0x2c4bda(0x78a)](this)){if(_0x2c4bda(0x43e)!==_0x2c4bda(0x867)){const _0x188c52=_0x3c476b['Symbol'];let _0x51ceb7=_0x3c476b[_0x2c4bda(0x374)];if(['','Untitled'][_0x2c4bda(0xa04)](_0x51ceb7))_0x51ceb7=_0x3c476b[_0x2c4bda(0x2e6)][_0x2c4bda(0x78a)](this);const _0x484158=_0x3c476b[_0x2c4bda(0x262)][_0x2c4bda(0x78a)](this),_0x2d2725=_0x3c476b['ExtJS'][_0x2c4bda(0x78a)](this);this[_0x2c4bda(0x53b)](_0x51ceb7,_0x188c52,_0x484158,_0x2d2725),this[_0x2c4bda(0xa00)](_0x188c52,_0x3c476b['CallHandlerJS'][_0x2c4bda(0x2fe)](this,_0x2d2725));}else return _0x140277['CoreEngine'][_0x2c4bda(0x719)][_0x2c4bda(0x2bf)][_0x2c4bda(0x73b)][_0x2c4bda(0x78a)](this,_0x5ace04);}}}},Window_GameEnd[_0x1c6d52(0x699)]=VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x719)][_0x1c6d52(0x664)][_0x1c6d52(0x419)][_0x1c6d52(0x510)],Window_GameEnd[_0x1c6d52(0x721)]['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_GameEnd[_0x1c6d52(0x721)][_0x1c6d52(0x2b6)]=function(){const _0xbbffad=_0x1c6d52;for(const _0x4cda54 of Window_GameEnd[_0xbbffad(0x699)]){if(_0x4cda54[_0xbbffad(0x8f1)]['call'](this)){const _0xb9aa18=_0x4cda54['Symbol'];let _0x311b28=_0x4cda54['TextStr'];if(['',_0xbbffad(0x3d3)][_0xbbffad(0xa04)](_0x311b28))_0x311b28=_0x4cda54['TextJS'][_0xbbffad(0x78a)](this);const _0x56709b=_0x4cda54['EnableJS'][_0xbbffad(0x78a)](this),_0x352a9a=_0x4cda54[_0xbbffad(0x22b)]['call'](this);this[_0xbbffad(0x53b)](_0x311b28,_0xb9aa18,_0x56709b,_0x352a9a),this[_0xbbffad(0xa00)](_0xb9aa18,_0x4cda54[_0xbbffad(0x67e)][_0xbbffad(0x2fe)](this,_0x352a9a));}}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist[_0x1c6d52(0x721)]=Object['create'](Window_Base[_0x1c6d52(0x721)]),Window_ButtonAssist['prototype'][_0x1c6d52(0x5ed)]=Window_ButtonAssist,Window_ButtonAssist[_0x1c6d52(0x721)][_0x1c6d52(0x271)]=function(_0xfc84c8){const _0x10b9c6=_0x1c6d52;this[_0x10b9c6(0x750)]={},Window_Base[_0x10b9c6(0x721)][_0x10b9c6(0x271)]['call'](this,_0xfc84c8),this[_0x10b9c6(0x87c)](VisuMZ[_0x10b9c6(0x7b7)][_0x10b9c6(0x719)][_0x10b9c6(0x96c)][_0x10b9c6(0x4f4)]||0x0),this['refresh']();},Window_ButtonAssist[_0x1c6d52(0x721)]['makeFontBigger']=function(){const _0x5bfdf9=_0x1c6d52;this[_0x5bfdf9(0x9cc)][_0x5bfdf9(0x35f)]<=0x60&&(this['contents']['fontSize']+=0x6);},Window_ButtonAssist['prototype']['makeFontSmaller']=function(){const _0x1c4ad0=_0x1c6d52;this[_0x1c4ad0(0x9cc)][_0x1c4ad0(0x35f)]>=0x18&&(this[_0x1c4ad0(0x9cc)][_0x1c4ad0(0x35f)]-=0x6);},Window_ButtonAssist[_0x1c6d52(0x721)][_0x1c6d52(0xa50)]=function(){const _0x37cb42=_0x1c6d52;Window_Base[_0x37cb42(0x721)][_0x37cb42(0xa50)]['call'](this),this['updateKeyText']();},Window_ButtonAssist[_0x1c6d52(0x721)][_0x1c6d52(0x1db)]=function(){const _0x269c91=_0x1c6d52;this['padding']=SceneManager['_scene'][_0x269c91(0x9c6)]()!==_0x269c91(0x339)?0x0:0x8;},Window_ButtonAssist[_0x1c6d52(0x721)][_0x1c6d52(0x589)]=function(){const _0x43b4aa=_0x1c6d52,_0x3728e8=SceneManager[_0x43b4aa(0x62e)];for(let _0x425173=0x1;_0x425173<=0x5;_0x425173++){if('sTRMX'==='pHSQk')_0x555a9a[_0xcd0f46]=_0x1f9ac3[_0x43b4aa(0x76a)][_0x14d128[_0x3b19a4]];else{if(this[_0x43b4aa(0x750)][_0x43b4aa(0x273)['format'](_0x425173)]!==_0x3728e8[_0x43b4aa(0x33d)[_0x43b4aa(0x649)](_0x425173)]())return this[_0x43b4aa(0x7ae)]();if(this[_0x43b4aa(0x750)]['text%1'[_0x43b4aa(0x649)](_0x425173)]!==_0x3728e8[_0x43b4aa(0x54b)['format'](_0x425173)]())return this[_0x43b4aa(0x7ae)]();}}},Window_ButtonAssist['prototype']['refresh']=function(){const _0x59ffcb=_0x1c6d52;this[_0x59ffcb(0x9cc)][_0x59ffcb(0x261)]();for(let _0x1bd4e5=0x1;_0x1bd4e5<=0x5;_0x1bd4e5++){_0x59ffcb(0x7cf)!=='iyspE'?this[_0x59ffcb(0x68b)](_0x1bd4e5):(_0x420fed[_0x59ffcb(0x7b7)][_0x59ffcb(0x3bb)][_0x59ffcb(0x78a)](this),_0x249d70=this[_0x59ffcb(0x87b)]);}},Window_ButtonAssist[_0x1c6d52(0x721)][_0x1c6d52(0x68b)]=function(_0x248187){const _0x15fe9e=_0x1c6d52,_0x542a3c=this[_0x15fe9e(0x2c6)]/0x5,_0x1d61ff=SceneManager['_scene'],_0x3a0759=_0x1d61ff[_0x15fe9e(0x33d)[_0x15fe9e(0x649)](_0x248187)](),_0x1c25f0=_0x1d61ff[_0x15fe9e(0x54b)[_0x15fe9e(0x649)](_0x248187)]();this[_0x15fe9e(0x750)][_0x15fe9e(0x273)['format'](_0x248187)]=_0x3a0759,this['_data']['text%1'['format'](_0x248187)]=_0x1c25f0;if(_0x3a0759==='')return;if(_0x1c25f0==='')return;const _0x2db887=_0x1d61ff[_0x15fe9e(0x1c9)[_0x15fe9e(0x649)](_0x248187)](),_0x3ff7b6=this[_0x15fe9e(0x660)](),_0x52a494=_0x542a3c*(_0x248187-0x1)+_0x3ff7b6+_0x2db887,_0x1bb25c=VisuMZ[_0x15fe9e(0x7b7)]['Settings']['ButtonAssist']['TextFmt'];this[_0x15fe9e(0x467)](_0x1bb25c[_0x15fe9e(0x649)](_0x3a0759,_0x1c25f0),_0x52a494,0x0,_0x542a3c-_0x3ff7b6*0x2);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x6af)]=Game_Interpreter['prototype'][_0x1c6d52(0x1b2)],Game_Interpreter[_0x1c6d52(0x721)][_0x1c6d52(0x1b2)]=function(){const _0x36d5fa=_0x1c6d52;if($gameTemp[_0x36d5fa(0x878)]!==undefined){if('DjNwp'===_0x36d5fa(0x333))return VisuMZ[_0x36d5fa(0x7b7)][_0x36d5fa(0x256)]();else this[_0x36d5fa(0x621)]([_0x33425d],_0xb1f7a3,_0x5a1854,_0xd0f55d,_0x166456),_0x1fb352+=_0x148b6b;}return VisuMZ['CoreEngine']['Game_Interpreter_updateWaitMode'][_0x36d5fa(0x78a)](this);},VisuMZ[_0x1c6d52(0x7b7)]['UpdatePictureCoordinates']=function(){const _0x4a808f=_0x1c6d52,_0x1f89dd=$gameTemp[_0x4a808f(0x878)]||0x0;(_0x1f89dd<0x0||_0x1f89dd>0x64||TouchInput[_0x4a808f(0x7da)]()||Input['isTriggered'](_0x4a808f(0x908)))&&($gameTemp[_0x4a808f(0x878)]=undefined,Input['clear'](),TouchInput[_0x4a808f(0x261)]());const _0x265d12=$gameScreen['picture'](_0x1f89dd);return _0x265d12&&(_0x265d12['_x']=TouchInput['_x'],_0x265d12['_y']=TouchInput['_y']),VisuMZ[_0x4a808f(0x7b7)][_0x4a808f(0x3ea)](),$gameTemp[_0x4a808f(0x878)]!==undefined;},VisuMZ['CoreEngine'][_0x1c6d52(0x3ea)]=function(){const _0x3fad1a=_0x1c6d52,_0x4edd17=SceneManager[_0x3fad1a(0x62e)];if(!_0x4edd17)return;!_0x4edd17[_0x3fad1a(0x53a)]&&(SoundManager[_0x3fad1a(0x499)](),_0x4edd17['_pictureCoordinatesWindow']=new Window_PictureCoordinates(),_0x4edd17['addChild'](_0x4edd17['_pictureCoordinatesWindow'])),$gameTemp[_0x3fad1a(0x878)]===undefined&&(SoundManager[_0x3fad1a(0x2c9)](),_0x4edd17[_0x3fad1a(0x731)](_0x4edd17[_0x3fad1a(0x53a)]),_0x4edd17[_0x3fad1a(0x53a)]=undefined);};function _0x17cd(){const _0x523636=['FhziL','dimColor2','HgpmA','CAKWZ','drawGameSubtitle','NumberBgType','_origin','IeFnX','isSideButtonLayout','SELECT','isForFriend','gold','overrideMimeType','mainAreaTop','checkCoreEngineDisplayCenter','mainAreaBottom','hpGaugeColor2','Input_shouldPreventDefault','FltsM','_playTestFastMode','EVAL','_stored_tpGaugeColor1','processTimingData','skkqD','CLOSE_PAREN','SwitchRandomizeRange','_list','ASTERISK','Scene_Battle_createSpritesetFix','niwgo','buttonAssistOffset4','createAnimationSprite','gienP','updateMove','_startDecrypting','replace','getButtonAssistLocation','createPointAnimationQueue','buttonAssistOffset1','XParamVocab4','Scene_Map_updateMain','vGqXI','contents','nextLevelExp','_statusEquipWindow','valueOutlineWidth','remove','ShowActorLevel','en-US','buttonAssistText1','HOME','F11','applyEasing','start','createSpriteset','bgmVolume','MvAnimationRate','_backgroundFilter','EQUAL','stencilOp','Wazoh','XParamVocab9','Scene_MenuBase_createBackground','DigitGroupingExText','DlKJC','checkSmartEventCollision','%1〘Choice\x20Cancel〙%1','_smooth','_isButtonHidden','INEXPO','bEjWc','Map%1.json','zVUab','ctGaugeColor2','CAPSLOCK','Window_Base_initialize','rjeud','GHOTZ','_refreshBack','Window_NameInput_refresh','createWindowLayer','paramchangeTextColor','SLEEP','gaugeHeight','qlnmA','_shakeDuration','isBottomHelpMode','_menuButton','getGamepads','4852648BNRQqu','updateEffekseer','PixelateImageRendering','_offsetY','MODECHANGE','setHandler','xScrollLinkedOffset','CustomParam','Graphics_defaultStretchMode','includes','charAt','profileWindowRect','shake','Sprite_Gauge_currentValue','ItemBackColor2','LvExpGauge','ListBgType','pAxtc','ExportStrFromAllTroops','xZLgd','Game_Temp_initialize','paramBaseAboveLevel99','addChildToBack','_cancelButton','Game_Picture_initBasic','createDimmerSprite','processCursorMove','_clickHandler','SubfolderParse','loadBitmap','Game_System_initialize','WIN_OEM_PA1','_inputWindow','Scene_MenuBase_helpAreaTop','menuShowButton','_stored_deathColor','scrollLeft','consumeItem','dQdFn','Spriteset_Battle_createEnemies','clamp','FJCZf','isEnabled','GPAiI','ExportString','win32','getControllerInputButtonMatch','updateCurrentEvent','GoldRect','cursorRight','measureTextWidth','Sprite_Battler_startMove','<%1\x20%2:[\x20]','OutlineColorGauge','ColorGaugeBack','powerUpColor','STR','ctGaugeColor1','LATIN1','IuMMu','_movementWholeDuration','isArrowPressed','chAYZ','Input_onKeyDown','CreateBattleSystemID','_screenY','ParamMax','_lastX','updateData','process_VisuMZ_CoreEngine_jsQuickFunctions','Sprite_Picture_loadBitmap','_margin','encounterStepsMinimum','wait','Game_Picture_y','addOnceParallelInterpreter','sparamFlat2','listWindowRect','HELP','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','Y:\x20%1','Bitmap_drawTextOutline','stencilFunc','PRINT','seVolume','update','Window_Selectable_cursorUp','processDigitChange','initMembers','LVmTa','ColorCTGauge1','updateWaitMode','drawCharacter','targetPosition','RepositionActors','itypeId','traitsPi','setCoreEngineScreenShakeStyle','SParamVocab7','CustomParamType','iFpbQ','XHSst','_coreEasingType','pLjQy','cyHVK','processAlwaysEscape','oqRmc','ctrl','INOUTEXPO','tpCostColor','outlineColorDmg','PhWvl','isPlaytest','JYUSu','buttonAssistOffset%1','sqrt','IconParam3','BattleManager_checkSubstitute','XParamVocab6','_updateFilterArea','DisplayLockY','Tilemap_addShadow','subtitle','areButtonsHidden','sparamRate2','repositionEnemiesByResolution','ExportAllTroopText','BTestArmors','processEscape','makeDeepCopy','forceOutOfPlaytest','HASH','updatePadding','KSXAs','hcmlV','Scene_Name_create','Sprite_AnimationMV_updatePosition','HavsI','_registerKeyInput','globalAlpha','hpColor','expGaugeColor2','onButtonImageLoad','dDqmu','JoTvd','Dhzse','_context','focus','blendFunc','updateMotion','SideButtons','WindowLayer_render','createJsQuickFunction','GVdpd','YSzql','random','Window_StatusBase_drawActorLevel','_defaultStretchMode','_stored_pendingColor','isGamepadAxisMoved','setAction','WASD','sv_enemies','statusEquipWindowRect','drawActorExpGauge','_stored_maxLvGaugeColor1','Window_NameInput_cursorPagedown','titles2','concat','F19','SParamVocab9','level','VisuMZ_2_BattleSystemBTB','terminate','ljhgE','OUTELASTIC','_hp','targetY','Game_Map_scrollRight','BattleSystem','WIN_OEM_PA2','Padding','ColorTPGauge1','zQRjr','isOpenAndActive','Script\x20Call\x20Error','_refreshPauseSign','zoomScale','maxCols','SpkfX','addLoadListener','Lmjzp','slice','test','SParamVocab0','Window_ShopSell_isEnabled','ExtractStrFromList','BottomButtons','AllTroops','atypeId','_tempActor','_stored_mpGaugeColor2','commandWindowRows','FINAL','Bitmap_gradientFillRect','PugKQ','yjrfh','ODdky','isInstanceOfSceneMap','optionsWindowRect','bADIA','〘Common\x20Event\x20%1:\x20%2〙\x20End','ExtJS','Class-%1-%2','QzwUm','isKeyItem','offsetY','filter','setup','process_VisuMZ_CoreEngine_ControllerButtons','drawActorSimpleStatus','Game_Picture_updateMove','command357','drawGameVersion','Input_pollGamepads','JfJvQ','SLASH','ItemStyle','AutoScrollLockX','YrRwB','IconSParam4','loadIconBitmap','batch','Game_Map_scrollUp','_fauxAnimationSprites','ExtractStrFromTroop','F20','_blank','ParseClassNotetags','_targetOffsetX','NUMPAD7','ExtractStrFromMap','refreshDimmerBitmap','clearForcedGameTroopSettingsCoreEngine','_pageupButton','playBgs','helpAreaTopSideButtonLayout','bIHkS','ATK','Game_Party_consumeItem','AtpNc','QWBDa','ButtonHeight','initDigitGrouping','playTestF7','UpdatePictureCoordinates','<JS\x20%1\x20%2:[\x20](.*)>','charCode','centerCameraCheckData','editWindowRect','mmp','catchLoadError','Linear','PCXQe','maxTp','_lastPluginCommandInterpreter','clear','EnableJS','windowRect','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','command105','MJssc','Spriteset_Base_destroy','OpenConsole','max','_offsetX','pictureId','retrievePointAnimation','catchException','requestPointAnimation','connected','crisisColor','initialize','IconXParam7','key%1','processSoundTimings','pointX','setupNewGame','damageColor','pQVSG','GroupDigits','setupButtonImage','hTbeP','18vQvwrX','startAnimation','actorWindowRect','LUK','maxLvGaugeColor2','_destroyInternalTextures','Scene_Options_create','WMXKe','FunctionName','createTitleButtons','_forcedTroopView','gopUF','jDzDX','allowShiftScrolling','RKhxw','ParseEnemyNotetags','AudioChangeBgmPitch','isPhysical','OUTQUINT','_baseTexture','VisuMZ_2_BattleSystemETB','HEZHv','MYxkN','style','FHxov','processKeyboardEnd','YXAHi','VFNKT','KeySHIFT','drawParamText','EscapeAlways','NvyhB','Scene_MenuBase_createPageButtons','zzWGU','RqfWb','_animation','isAnimationForEach','Game_Action_itemEva','coreEngineRepositionEnemies','initCoreEngine','getInputMultiButtonStrings','Scene_Base_terminateAnimationClearBugFix','ENTER','WIN_OEM_FJ_ROYA','isInputting','createCommandWindow','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','VdpGN','LineHeight','GoldFontSize','pagedown','SnapshotOpacity','inputWindowRect','SceneManager_onKeyDown','initVisuMZCoreEngine','kXyIa','isGamepadConnected','itemBackColor1','makeCoreEngineCommandList','gradientFillRect','_clientArea','FontShadows','COLON','STENCIL_TEST','QwertyLayout','maxBattleMembers','Actor','Color','_backgroundSprite','Viior','%1%2','StatusEquipRect','transform','_cache','innerWidth','map','processKeyboardHandling','playCancel','getCoreEngineScreenShakeStyle','PIPE','_dimmerSprite','owkGm','fseDJ','_image','processCursorHomeEndTrigger','#%1','ParseArmorNotetags','indexOf','param','exit','Game_Event_start','deselect','repositionCancelButtonSideButtonLayout','qyVCH','setWindowPadding','IconParam5','_storedMapText','loadWindowskin','helpAreaHeight','startAutoNewGame','MRF','currentLevelExp','VisuMZ_2_BattleSystemOTB','initialBattleSystem','updatePositionCoreEngineShakeHorz','storeMapData','TextJS','yWkus','_repositioned','Bitmap_measureTextWidth','SHIFT','GoldOverlap','Input_update','JUNJA','vZIrv','Scene_Status_create','_pictureName','toLocaleString','qiACh','targetScaleY','ScreenShake','eoQKc','PAUSE','getPointAnimationLayer','Scene_Unlisted','LDJXr','ENTER_SPECIAL','createPageButtons','shift','stretch','bind','INOUTQUART','xparamRate1','destroyed','erasePicture','gwYGF','ylxIn','evaluate','RCbgY','targetBackOpacity','_dummyWindow','save','TTZvE','targetSpritePosition','XParamVocab2','MDR','_onceParallelInterpreters','YUfBE','AkNcB','GRD','_buttonAssistWindow','DETACH_PICTURE_CONTAINER','ggCDP','ColorDeath','loadTitle2','create','_width','Abbreviation','animationNextDelay','bVyiM','ScaleY','drawActorNickname','Scene_MenuBase_createCancelButton','currentValue','OPEN_PAREN','log','IconParam7','updateShadow','paramMax','adjustPictureAntiZoom','targetX','maxTurns','drawCurrencyValue','ivSbV','gainSilentTp','YeAWP','SlotRect','_timerSprite','calcEasing','Game_Screen_initialize','scrollDown','mapId','isGamepadButtonPressed','DjNwp','GREATER_THAN','OmFFG','stypeId','xparamPlus1','XParamVocab3','button','bitmap','setSideView','bHaBz','buttonAssistKey%1','SParamVocab4','_targetScaleY','sin','kODDd','RIGHT','IjaLR','SfoQt','MULTIPLY','TPB\x20WAIT','isPressed','processHandling','makeAutoBattleActions','%1〘End\x20Choice\x20Selection〙%1','Origin','updateMain','LIgQi','_hovered','IconXParam9','tilesets','Scene_Title_drawGameTitle','buttonAssistOk','BqfEU','MAX_SAFE_INTEGER','buttonAssistWindowSideRect','BgFilename1','([\x5c+\x5c-]\x5cd+)([%％])>','_stored_expGaugeColor1','VisuMZ_2_BattleSystemFTB','Game_Event_isCollidedWithEvents','_scaleY','CqQgL','altKey','aQaYe','fontSize','CRI','XParamVocab8','StatusBgType','sparamFlatJS','sparamPlusJS','Subtitle','drawGameTitle','demXo','skills','SkGbf','Window_Base_drawCharacter','([\x5c+\x5c-]\x5cd+)>','paramRate2','DEF','xparamFlat1','SwitchToggleRange','blockWidth','XParamVocab7','hasEncryptedImages','DTB','TextStr','expRate','IconSParam2','EquipMenu','checkCacheKey','retrieveFauxAnimation','requiredWtypeId1','_opacity','Sprite_AnimationMV_processTimingData','DECIMAL','PERIOD','darwin','Scene_Shop_create','DigitGroupingDamageSprites','Game_Actor_paramBase','YzlmZ','buttonAssistSwitch','PictureID','textSizeEx','buttonAssistKey5','ColorPowerUp','CodeJS','EnableNameInput','kPuXo','getControllerInputButtonString','kVCBt','characters','createPointAnimationSprite','ukfTp','numberWindowRect','_pictureContainer','mute','ConvertParams','_digitGrouping','getLastPluginCommandInterpreter','yYEmq','pictures','qVAhT','DummyRect','Scene_Map_initialize','onKeyDown','string','xparam','PGDN','INOUTELASTIC','nfrDD','_number','_shakePower','AnimationPoint','DEJRX','RegExp','itemEva','performMiss','EXR','TAB','OJejN','subjectHitRate','setupFont','refreshWithTextCodeSupport','buttonAssistText3','BlurFilter','_balloonQueue','updateFauxAnimations','Mirror','OS_KEY','PGUP','_isPlaytest','events','dWdoS','OPEN_CURLY_BRACKET','npZVk','Scene_Map_createSpriteset','Scene_Map_createMenuButton','encounterStep','resetTextColor','length','paramRateJS','_forcedBattleSys','isGameActive','itemRect','paramWidth','context','setValue','hCPhW','useFontWidthFix','IkVTO','gdbWU','ArJzZ','StatusParamsBgType','LdPOv','quit','currentExp','XasAl','DIVIDE','CategoryBgType','Untitled','integer','sRBZj','removeOnceParallelInterpreter','processKeyboardDigitChange','DSMzA','\x20Origin:\x20%1','duration','switchModes','FadeSpeed','updateTransform','useDigitGrouping','_statusParamsWindow','updateBackOpacity','cursorPageup','offsetX','_skillTypeWindow','wtypeId','_battlerName','IconSParam1','onClick','INQUAD','ImgLoad','updatePictureCoordinates','stop','displayName','volume','Spriteset_Base_update','mainAreaTopSideButtonLayout','jokZt','LZnvY','drawTextTopAligned','cCfwk','removeAllFauxAnimations','NUMPAD9','scaleX','NUMPAD1','parameters','HIT','Scene_Map_update','_isWindow','text%1','original','Upper\x20Left','STB','gRVzt','resetBattleSystem','rightArrowWidth','floor','mainFontSize','gaugeLineHeight','TCR','IconSParam3','isOpen','VisuMZ_2_BattleSystemCTB','Plus2','VOLUME_UP','process_VisuMZ_CoreEngine_CustomParameters','flush','trim','_statusWindow','Window_Gold_refresh','EXCLAMATION','Location','VkEPK','ONE','paramValueByName','ProfileBgType','_commonEventLayers','SideView','GameEnd','_numberWindow','IconSParam6','1.4.4','BACK_QUOTE','OUTEXPO','DefaultMode','GoldBgType','Scene_Battle_createCancelButton','Plus1','miDWX','OUTSINE','updateOpacity','SkillMenu','getCustomBackgroundSettings','index','ynJgU','Flat','adjustSprite','split','ATTN','updatePositionCoreEngine','min','push','makeActionList','GPUih','mpGaugeColor1','Game_Actor_levelUp','targets','INOUTSINE','DisplayedParams','currentClass','Jalwu','_mainSprite','_inputSpecialKeyCode','drawIconBySize','OutlineColor','ZciMy','lastAnimationSprite','faceWidth','ZERO','hit','BuyBgType','Troop%1','keyboard','eEWBc','IconXParam4','buttonAssistText4','calcCoreEasing','origin','ListRect','LINEAR','setActorHomeRepositioned','updateClose','horizontal','ColorMPGauge2','Window_NumberInput_start','option','AutoScrollLockY','visible','qYqmF','ImprovedAccuracySystem','WIN_OEM_FJ_TOUROKU','EXSEL','helpWindowRect','fCmnS','faces','AtWsk','reserveCommonEvent','ExportStrFromAllMaps','viewport','DimColor1','ParseTilesetNotetags','setAnchor','ColSpacing','description','_lastOrigin','Version','drawTextEx','isTpb','DocumentTitleFmt','bitmapWidth','createCancelButton','scale','getColor','outlineColor','KeFuB','SwitchToggleOne','boxHeight','SkillTypeBgType','LAbaB','setMoveEasingType','Opacity','CustomParamAbb','updateOnceParallelInterpreters','_targetOffsetY','targetOpacity','nw.gui','members','jhgEF','initialLevel','bLJyF','Spriteset_Base_updatePosition','TGR','_makeFontNameText','redraw','missed','pitch','F12','mainAreaHeightSideButtonLayout','powerDownColor','meVolume','BQLQF','getLastUsedGamepadType','yScrollLinkedOffset','keyMapper','paramBase','_targetY','isTouchedInsideFrame','onload','MainMenu','setActorHome','getColorDataFromPluginParameters','AGI','SceneManager_initialize','setCommonEvent','gainGold','parallaxes','playLoad','tFaNu','BgFilename2','_targetScaleX','initCoreEngineScreenShake','BTestItems','mev','_shakeSpeed','createTroopNote','DamageColor','ActorTPColor','_logWindow','FzxJs','picture','mRtdv','makeDocumentTitle','_profileWindow','WIN_OEM_CUSEL','wiKgO','_onKeyPress','FGiua','Duration','cancelShowButton','CfsjX','setGuard','EndingID','_closing','menu','Input_clear','exportAllMapStrings','Game_Map_setup','setViewportCoreEngineFix','buttonAssistCancel','onDatabaseLoaded','MAXHP','_maxDigits','animationId','TranslucentOpacity','Sprite_destroy','_upArrowSprite','expGaugeColor1','createEnemies','isNumpadPressed','setHome','WIN_OEM_PA3','_addShadow','version','ParseActorNotetags','ZOOM','operand','lgoOK','SrGbc','successRate','owCyl','openURL','value','pCVKw','PictureCoordinatesMode','MAT','EISU','Game_Interpreter_command122','measureText','ConvertNumberToString','parseForcedGameTroopSettingsCoreEngine','add','WIN_OEM_FJ_JISHO','_moveEasingType','_active','YswWb','BannedWords','F22','buttonAreaHeight','Show\x20Scrolling\x20Text\x20Script\x20Error','skillTypes','createKeyJS','children','battlebacks2','createTextState','EditBgType','AudioChangeBgsPan','uWJeL','nBdvR','mpColor','eva','Scene_MenuBase_mainAreaHeight','toLowerCase','processKeyboardHome','yqbtT','getInputButtonString','dummyWindowRect','Match','BgType','CKMvM','AudioChangeBgmPan','MenuBg','inBattle','_scaleX','Window_Base_drawFace','name','Scene_Item_create','ioZfN','paramX','child_process','DELETE','apply','Game_Picture_scaleY','pVmhn','drawRightArrow','_phase','Game_Character_processMoveCommand','AllMaps','IconIndex','VUjiH','Page','WIN_OEM_RESET','Window_NameInput_initialize','process_VisuMZ_CoreEngine_Notetags','bitmapHeight','mainAreaHeight','CommandList','isMVAnimation','XParamVocab0','ScaleX','Scene_Skill_create','BTestAddedQuantity','isBusy','_playtestF7Looping','_stored_powerUpColor','showPointAnimations','eQJgK','Input_updateGamepadState','Game_Picture_scaleX','CIRCUMFLEX','603002XhaIif','dcXvN','F15','xIZYG','_stored_powerDownColor','NewGameCommonEventAll','nvpHE','JSON','Game_Interpreter_PluginCommand','ParseItemNotetags','paramPlus','Type','ShowDevTools','isEventRunning','SystemSetBattleSystem','windowOpacity','kcBGW','pxqYd','processPointAnimationRequests','TextManager_param','Max','Window_Base_update','_hideTileShadows','updatePictureAntiZoom','0.00','_mapNameWindow','FTB','JMTZD','_pictureCoordinatesWindow','addCommand','DetachMapPictureContainer','VariableJsBlock','cEXgX','VbGdB','UNDERSCORE','〘Show\x20Text〙\x0a','centerX','CommandRect','blt','down','ParseSkillNotetags','jCFQH','Game_Picture_calcEasing','LMwOT','_lastGamepad','buttonAssistText%1','YQbSI','GSGJc','Scene_Boot_startNormalGame','addEventListener','_coreEngineShakeStyle','isMaskingEnabled','width','WIN_ICO_CLEAR','PositionX','PDR','Scene_Map_createSpritesetFix','OpenSpeed','isEnemy','ldWrM','Pixelated','WIN_OEM_JUMP','drawGauge','_displayY','_duration','_stored_ctGaugeColor1','titles1','drawParamName','sparamPlus2','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','alignBottom','scaleMode','zyRfL','Qkqpx','SEPARATOR','Sprite_Gauge_gaugeRate','IinDI','CustomParamIcons','ARRAYEVAL','isAnimationPlaying','FontWidthFix','vertical','sparamPlus1','KQCHl','_centerCameraCheck','NUMPAD4','_muteSound','isClosed','StartID','ZRANf','BackOpacity','HelpRect','etypeId','vcjmp','parse','isRightInputMode','MEV','startMove','isCollidedWithEvents','Window_NumberInput_processDigitChange','SkillTypeRect','_backSprite2','pRkJv','moveCancelButtonSideButtonLayout','_stored_ctGaugeColor2','getBackgroundOpacity','gaugeRate','updateKeyText','equips','qaTmH','Tinme','WIN_OEM_FJ_MASSHOU','lfPxS','IconSParam7','Bitmap_clearRect','processMoveCommand','anchorCoreEasing','Exported_Script_%1.txt','categoryWindowRect','UCRAN','TitlePicButtons','itemLineRect','moveRelativeToResolutionChange','Scene_Map_updateMainMultiply','ADD','processKeyboardBackspace','ItemBgType','_opening','Symbol','ApplyEasing','1.3.0','Window','end','_sideButtonLayout','drawGoldItemStyle','〘Scrolling\x20Text〙\x0a','(\x5cd+\x5c.?\x5cd+)>','buttonAssistKey3','FontSize','helpAreaTop','Control\x20Variables\x20Script\x20Error','MJSQZ','dimColor1','drawCircle','displayY','CustomParamNames','processTouchModernControls','ColorMPGauge1','CTRL','RHgSm','IconXParam0','randomJS','scrollRight','item','ColorNormal','yGIyD','Spriteset_Base_initialize','isMagical','PERCENT','padZero','paramName','ColorManager_loadWindowskin','wXqjF','_itemWindow','round','GoldChange','list','gejKB','_currentBgm','playTestF6','isActor','iconWidth','createPointAnimation','goldWindowRect','OptionsRect','nuvca','CgAZd','Scene_Base_terminate','Graphics','iIDEV','qluzX','wrvGS','startNormalGame','iconHeight','Icon','horzJS','_stored_mpGaugeColor1','xMalM','isWindowMaskingEnabled','ParseWeaponNotetags','select','toUpperCase','CANCEL','randomInt','Game_Interpreter_command355','DigitGroupingGaugeSprites','lDHNT','LSwJw','clipboard','_onError','outlineColorGauge','rrCTU','ixhYz','DimColor2','FLcoR','titleCommandWindow','attackSkillId','constructor','UXRoO','WlEbC','AsRDc','Erfol','cEDtG','process_VisuMZ_CoreEngine_RegExp','_stored_mpCostColor','_stored_hpGaugeColor2','\x0a\x0a\x0a\x0a\x0a','loadMapData','RSayo','oFdsX','_digitGroupingEx','VJWGH','7QyZHaQ','valueOutlineColor','aQAvx','QUOTE','itemHeight','createChildSprite','PRINTSCREEN','type','initCoreEasing','processCursorMoveModernControls','updateScene','enemy','repeat','isAlive','IconParam2','SaveMenu','IconXParam1','drawText','right','isPointAnimationPlaying','GoldMax','determineSideButtonLayoutValid','_updateGamepadState','endBattlerActions','getKeyboardInputButtonString','processTouch','textAlign','autoRemovalTiming','vVNmP','qstSO','EnableNumberInput','nickname','tpGaugeColor2','BlendMode','IconParam4','LJVYx','_currentMap','createFauxAnimationSprite','INBOUNCE','markCoreEngineModified','playTestCtrlT','sVFmD','MCR','DummyBgType','LQENM','TRG','drawCurrentParam','updateMainMultiply','keyCode','Smooth','_scene','mirror','KozUG','onInputBannedWords','createBackground','setLastPluginCommandInterpreter','deathColor','setSize','pcLOr','vertJS','clearRect','nLZAG','abs','DOUBLE_QUOTE','vVxcP','open','pointY','MKfaD','Yusvb','displayX','vfGYa','ALTGR','ARRAYFUNC','KeyItemProtect','scaleSprite','PictureEraseAll','render','format','data/','SPACE','Game_Interpreter_command105','createMenuButton','CTB','isLoopVertical','PLUS','MWlta','5139702fIQpjA','object','isFullDocumentTitle','hoppH','SlotBgType','processBack','makeTargetSprites','Sprite_Button_updateOpacity','_colorTone','CommonEventID','ceil','NoTileShadows','runCombinedScrollingTextAsCode','toString','itemPadding','rgba(0,\x200,\x200,\x201.0)','_pauseSignSprite','Game_Picture_move','MenuLayout','MINUS','playCursorSound','DMYYC','Keyboard','JTRcW','InputBgType','SystemLoadAudio','default','CrisisRate','statusWindowRect','createFauxAnimation','_rate','openness','process_VisuMZ_CoreEngine_Settings','text','VZWRj','cXOyB','textColor','tileHeight','maxLvGaugeColor1','3qfHzNl','isItemStyle','anchor','none','createFauxAnimationQueue','CallHandlerJS','XWOIK','movePageButtonSideButtonLayout','updateOpen','_pagedownButton','ValueJS','MuMoy','rgba(0,\x200,\x200,\x200.7)','_categoryWindow','ARRAYJSON','kwVGP','Bitmap_blt','QHlAd','drawSegment','LxwIJ','updateCoreEasing','sparam','isTriggered','isActiveTpb','_lastY','Scene_Boot_loadSystemImages','BattleManager_update','playOnceParallelInterpreter','SParamVocab8','Game_Map_scrollDown','gainItem','TWoEu','_commandList','\x5c}❪SHIFT❫\x5c{','_anchor','Window_NameInput_cursorPageup','GFzPl','Game_BattlerBase_refresh','alpha','F14','smallParamFontSize','snapForBackground','pow','targetContentsOpacity','active','Game_Actor_changeClass','248065CBryfD','Game_Action_numRepeats','_onKeyDown','playEscape','Speed','_coreEasing','_onLoad','KJQTw','Game_Interpreter_updateWaitMode','imageSmoothingEnabled','paramY','setLastGamepadUsed','namqz','ehyGS','HYPHEN_MINUS','asin','kEcaA','KeyboardInput','getBattleSystem','touchUI','exportAllTroopStrings','loading','GoldIcon','Key%1','endAction','ccLkh','Graphics_centerElement','QJTwO','Sprite_Animation_processSoundTimings','ParseStateNotetags','WxfNX','createCustomParameter','isHandled','KrUpb','LevelUpFullMp','consumable','PictureEasingType','applyCoreEasing','FNZkB','setFrame','DOWN','resize','Window_NameInput_cursorLeft','_targetX','SceneManager_isGameActive','onInputOk','%1〘Choice\x20%2〙\x20%3%1','BUZpP','ItemHeight','escape','loadGameImagesCoreEngine','smoothSelect','ARRAYSTRUCT','PHA','_listWindow','subject','_backSprite','END','isExpGaugeDrawn','Map%1','loadSystem','khbJS','xparamFlatBonus','wpqxH','setupRate','img/%1/','textHeight','Game_Action_updateLastTarget','WIN_OEM_BACKTAB','Name','uEVsJ','_hideButtons','updateAnchor','title','_gamepadWait','StatusRect','OTB','SParamVocab6','defineProperty','hpaTo','toFixed','_changingClass','mnbvw','_destroyCanvas','scrollUp','registerCommand','OUTCUBIC','INOUTBACK','bgsVolume','bzCmU','(\x5cd+)([%％])>','worldTransform','ItemRect','addAnimationSpriteToContainer','_stored_maxLvGaugeColor2','_setupEventHandlers','dImPN','XParameterFormula','AKUwy','_actor','ckKet','initButtonHidden','textWidth','Game_BattlerBase_initMembers','mpCostColor','isBottomButtonMode','wDAam','PositionJS','slotWindowRect','updatePosition','uiAreaWidth','animationShouldMirror','fillRect','DrawItemBackgroundJS','Settings','ParamArrow','setColorTone','exec','src','GEykG','Basic','tEVyw','prototype','eSEcE','setMainFontSize','MDF','_animationSprites','crtgN','NUM_LOCK','RPGMAKER_VERSION','INOUTBOUNCE','AMPERSAND','canEquip','ETLqp','top','send','NewGameBoot','iJpwD','removeChild','Rate1','useDigitGroupingEx','commandWindowRect','center','F18','F21','HANJA','loadSystemImages','ParseAllNotetags','ParamChange','akenW','pageup','drawValue','join','Scene_Map_updateScene','qzzOH','_pointAnimationSprites','SUBTRACT','optSideView','createPointAnimationTargets','WIN_OEM_AUTO','axes','SEMICOLON','setupValueFont','OUTBOUNCE','MAX_GL_TEXTURES','drawActorLevel','143hNWpTN','EnableMasking','Armor-%1-%2','_data','IconSParam5','_goldWindow','waiting','UOGjO','Layer','doesNameContainBannedWords','Bitmap_fillRect','EditRect','Window_MapName_refresh','WwfDz','isNwjs','_inputString','makeInputButtonString','isDying','KEEP','isGamepadTriggered','isLoopHorizontal','ColorMaxLvGauge1','REPLACE','ShowItemBackground','updatePositionCoreEngineShakeRand','State-%1-%2','_stored_hpGaugeColor1','_storedStack','ActorHPColor','stringKeyMap','bPBpC','showPicture','HRG','updatePointAnimations','OutlineColorDmg','Game_Action_setAttack','nah','playBuzzer','move','FDR','bVahP','YScDp','setTargetAnchor','OPEN_BRACKET','opacity','DrawIcons','ModernControls','ShopMenu','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','BottomHelp','createCustomBackgroundImages','qodVT','MRG','INCIRC','itemBackColor2','Flat2','playMiss','itemSuccessRate','CEV','Mute','_shouldPreventDefault','call','ScaLl','PreserveNumbers','backgroundBitmap','4101064jtuRHK','ESC','skipBranch','evaded','_cacheScaleY','playBgm','ZTNdt','alphabetic','getLastGamepadUsed','pagedownShowButton','needsUpdate','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','responseText','onXhrError','_windowLayer','CategoryRect','_url','ActorRect','EREOF','dashToggle','mhp','lXANk','setViewport','lHUUs','operation','CommandBgType','targetScaleX','SystemLoadImages','system','removePointAnimation','isMapScrollLinked','Window_StatusBase_drawActorSimpleStatus','refresh','home','setBattleSystem','HelpBgType','_targetAnchor','VisuMZ_1_BattleCore','aYQoQ','maxItems','renderNoMask','CoreEngine','Chance','skillId','loadPicture','catchNormalError','OptionsMenu','areTileShadowsHidden','189430RDSSdC','App','skillTypeWindowRect','drawIcon','Input_setupEventHandlers','CONTEXT_MENU','platform','Window_NameInput_cursorUp','NameMenu','AudioChangeBgsVolume','advanced','onerror','cursorLeft','scaleY','buttonAssistWindowRect','processKeyboardDelete','BOrss','bXDnQ','reservePlayTestNewGameCommonEvent','updatePlayTestF7','_realScale','changeTextColor','upkcw','DOLLAR','popScene','Window_NameInput_cursorDown','_cacheScaleX','StatusEquipBgType','isCancelled','tab','Scene_Battle_update','smooth','kvSzk','Window_Selectable_drawBackgroundRect','INOUTQUAD','ShortcutScripts','isSpecialCode','canUse','_colorCache','_troopId','makeCommandList','OUTQUAD','fadeSpeed','Window_Selectable_itemRect','removeAllPointAnimations','PpJRY','boxWidth','easingType','setAttack','_actorWindow','XParamVocab5','WAsIZ','Total','QfDfO','_viewportSize','font-smooth','startShake','_mode','ARRAYSTR','baseId','process_VisuMZ_CoreEngine_Functions','innerHeight','ccKwD','drawFace','ETB','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','lineHeight','Scene_Boot_onDatabaseLoaded','ScreenResolution','juXmF','buttonAssistKey1','_index','destroy','ivudK','updateLastTarget','BTestWeapons','Spriteset_Base_isAnimationPlaying','ZoaGo','_stored_systemColor','Scene_Equip_create','animations','setCoreEngineUpdateWindowBg','show','updateDocumentTitle','ColorExpGauge2','removeFauxAnimation','bgm','DIaCs','left','fromCharCode','_pressed','updatePositionCoreEngineShakeOriginal','SParamVocab1','addChild','BoxMargin','xdg-open','WIN_OEM_ATTN','height','SceneManager_exit','InputRect','LfnmT','Window_NameInput_processHandling','setEasingType','isNormalPriority','SystemSetFontSize','cos','number','Game_Interpreter_command111','RdtvE','xtlKW','_optionsWindow','Window_NameInput_cursorRight','ColorHPGauge1','SVNhc','expParams','alwaysDash','LiNBt','restore','substring','%1/','LzzSc','QjIHi','tileWidth','_movementDuration','Bitmap_drawCircle','Scene_Name_onInputOk','BlnfA','ControllerMatches','IconSParam0','_targets','onKeyDownKeysF6F7','ButtonFadeSpeed','mainCommandWidth','_customModified','_pointAnimationQueue','LevelUpFullHp','params','\x5c}❪TAB❫\x5c{','adjustBoxSize','BaseTexture','isCursorMovable','setSideButtonLayout','hide','Window_Base_drawText','REC','_pollGamepads','cursorUp','_CoreEngineSettings','xparamPlus','F23','Window_Selectable_processTouch','sellWindowRect','sparamRate1','kWvSe','QoL','command111','code','PVWvY','isSmartEventCollisionOn','ActorMPColor','application/json','SystemSetWindowPadding','Unnamed','CONVERT','KAbJC','updateOrigin','BAEmP','font','contentsOpacity','XmTqz','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','NewGameCommonEvent','requestFauxAnimation','_windowskin','LRbQC','isSideView','resetFontSettings','NONCONVERT','zAqIc','Game_Action_itemHit','layoutSettings','ItemMenu','openingSpeed','sv_actors','ColorExpGauge1','Window_Selectable_cursorDown','_pictureCoordinatesMode','_editWindow','defaultInputMode','_spriteset','setBackgroundType','HZJeQ','Sprite_Actor_setActorHome','_commandWindow','_drawTextShadow','performEscape','NgMsf','hBeea','initBasic','numActions','vlSeA','maxLevel','showFauxAnimations','EQUALS','isUseModernControls','updateDashToggle','reduce','padding','_effectsContainer','INOUTCUBIC','vsDwb','_target','battlebacks1','removeAnimationFromContainer','Enemy-%1-%2','JwlHE','GetParamIcon','sceneTerminationClearEffects','_internalTextures','ColorTPCost','NUMPAD5','F10','xOqMW','_buyWindow','systemColor','BuyRect','currencyUnit','bhGDS','HjgBx','SystemSetSideView','buttonAssistWindowButtonRect','AudioChangeBgsPitch','ColorMPCost','helpAreaBottom','Param','onMoveEnd','IconSet','backOpacity','PictureShowIcon','turn','fsXPg','ZkwGy','moveMenuButtonSideButtonLayout','checkSubstitute','_fauxAnimationQueue','Game_Picture_x','makeEncounterCount','cursorPagedown','DigitGroupingLocale','TRAIT_PARAM','SPtrb','Window_Selectable_processCursorMove','ARGfd','addWindow','buttonAssistOffset5','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','Window_Base_drawIcon','centerY','SParamVocab2','JbTIy','_mirror','animationBaseDelay','centerSprite','%1\x0a','Game_Map_scrollLeft','Scene_MenuBase_mainAreaTop','paramMaxJS','sNXde','levelUp','isSceneBattle','isSceneMap','setupBattleTestItems','YfcSB','OptionsBgType','return\x200','AccuracyBoost','ChEbQ','drawBackgroundRect','LoadMenu','NHYiV','actor','Scene_GameEnd_createBackground','initMembersCoreEngine','isAnimationOffsetXMirrored','zyXQE','PTB','targetObjects','zcQga','_paramPlus','enable','_drawTextOutline','EXECUTE','INELASTIC','hshtq','wholeDuration','URL','command122','WIN_OEM_WSCTRL','createDigits','Wait','setBackgroundOpacity','sparamRate','VisuMZ_2_BattleSystemSTB','OUTBACK','showDevTools','_subject','playOk','ShowJS','Manual','CNT','CLEAR','enemies','setupCustomRateCoreEngine','setMute','Title','onNameOk','SULna','ControllerButtons','contains','NUMPAD0','SParameterFormula','_refreshArrows','xparamRateJS','TPB\x20ACTIVE','endAnimation','targetEvaRate','fillText','WIN_OEM_CLEAR','_downArrowSprite','_slotWindow','cancel','gaugeBackColor','Bitmap_initialize','Center','pop','wwEug','ItemBackColor1','DisplayLockX','setupCoreEngine','terms','isMenuButtonAssistEnabled','LoadError','clearOnceParallelInterpreters','F6key','lFQsp','_createInternalTextures','paramRate','_stored_tpGaugeColor2','SwitchActorText','onEscapeSuccess','match','Game_Troop_setup','Bitmap_strokeRect','DigitGroupingStandardText','vnotI','pendingColor','learnings','MfoDi','Scene_Menu_create','qmCmu','statusParamsWindowRect','isRepeated','IconSParam9','strokeRect','HyXQh','EzswZ','changeClass','goto','AnimationMirrorOffset','Gold','hEKom','areButtonsOutsideMainUI','BACK_SLASH','IconXParam2','_mp','ActorBgType','Sprite_Picture_updateOrigin','Scene_Base_createWindowLayer','hiNNx','VisuMZ_1_OptionsCore','cursorDown','ALT','IconParam6','Skill-%1-%2','Scene_Battle_createSpriteset_detach','pictureButtons','xparamRate2','IDs','》Comment《\x0a%1\x0a','_currentBgs','battleSystem','Graphics_printError','filters','DataManager_setupNewGame','825471Uhnfax','getLevel','itemWindowRect','_height','pages','dropItems','HeWPf','Scene_Boot_updateDocumentTitle','Renderer','eventsXyNt','_stored_normalColor','_battleField','INSINE','Window_EquipItem_isEnabled','LESS_THAN','WIN_OEM_COPY','Flat1','EVA','RevertPreserveNumbers','createBuffer','$dataMap','traitObjects','loadTitle1','QkuXl','VZzKn','hglxF','qAsUd','buttonY','Scene_Battle_createSpriteset','Sprite_Animation_setViewport','PLAY','_baseSprite','_targetOpacity','SmartEventCollisionPriority','originalJS','Bitmap_resize','ButtonAssist','createButtonAssistWindow','buttonAssistKey2','swFhL','isPlaying','reserveNewGameCommonEvent','KANA','ahIVq','JeNcL','ColorSystem','drawItem','jCzqW','onLoad','_backSprite1','OnLoadJS','itemHit','KcRzp','_encounterCount','backspace','TitleCommandList','contentsBack','_screenX','VariableEvalReference','Window_NameInput_processTouch','%1:\x20Exit\x20','playCursor','itemHitImprovedAccuracy','pan','WIN_OEM_FINISH','atbActive','setupCoreEasing','DefaultStyle','YVjjH','lCtVP','INBACK','VisuMZ_2_BattleSystemPTB','_helpWindow','measureTextWidthNoRounding','Enable','drawBackground','setClickHandler','eqyYy','uhfwV','Scene_Base_create','forceStencil','MAXMP','xparamPlus2','_stored_gaugeBackColor','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','BTB','_centerElementCoreEngine','ColorCTGauge2','EdXmq','note'];_0x17cd=function(){return _0x523636;};return _0x17cd();}function Window_PictureCoordinates(){const _0x353b5d=_0x1c6d52;this[_0x353b5d(0x271)](...arguments);}Window_PictureCoordinates[_0x1c6d52(0x721)]=Object['create'](Window_Base['prototype']),Window_PictureCoordinates[_0x1c6d52(0x721)][_0x1c6d52(0x5ed)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x1c6d52(0x721)][_0x1c6d52(0x271)]=function(){const _0xdc8af9=_0x1c6d52;this['_lastOrigin']=_0xdc8af9(0x771),this['_lastX']=_0xdc8af9(0x771),this[_0xdc8af9(0x691)]=_0xdc8af9(0x771);const _0xcbaa9f=this[_0xdc8af9(0x263)]();Window_Base[_0xdc8af9(0x721)]['initialize'][_0xdc8af9(0x78a)](this,_0xcbaa9f),this['setBackgroundType'](0x2);},Window_PictureCoordinates['prototype'][_0x1c6d52(0x263)]=function(){const _0x3d9b61=_0x1c6d52;let _0x4651ca=0x0,_0x3fc571=Graphics[_0x3d9b61(0x81f)]-this[_0x3d9b61(0x800)](),_0x2e1cb3=Graphics['width'],_0x1e700b=this[_0x3d9b61(0x800)]();return new Rectangle(_0x4651ca,_0x3fc571,_0x2e1cb3,_0x1e700b);},Window_PictureCoordinates[_0x1c6d52(0x721)][_0x1c6d52(0x1db)]=function(){const _0x48556d=_0x1c6d52;this[_0x48556d(0x88d)]=0x0;},Window_PictureCoordinates[_0x1c6d52(0x721)][_0x1c6d52(0xa50)]=function(){const _0x38846b=_0x1c6d52;Window_Base['prototype'][_0x38846b(0xa50)][_0x38846b(0x78a)](this),this[_0x38846b(0xa3f)]();},Window_PictureCoordinates[_0x1c6d52(0x721)][_0x1c6d52(0xa3f)]=function(){const _0x5d22d7=_0x1c6d52;if(!this[_0x5d22d7(0x798)]())return;this['refresh']();},Window_PictureCoordinates[_0x1c6d52(0x721)][_0x1c6d52(0x798)]=function(){const _0x383410=_0x1c6d52,_0x189866=$gameTemp[_0x383410(0x878)],_0x51ea15=$gameScreen[_0x383410(0x4a6)](_0x189866);return _0x51ea15?this[_0x383410(0x465)]!==_0x51ea15[_0x383410(0x9a8)]||this[_0x383410(0xa3e)]!==_0x51ea15['_x']||this[_0x383410(0x691)]!==_0x51ea15['_y']:![];},Window_PictureCoordinates['prototype']['refresh']=function(){const _0x546899=_0x1c6d52;this[_0x546899(0x9cc)][_0x546899(0x261)]();const _0x487130=$gameTemp[_0x546899(0x878)],_0x21635d=$gameScreen[_0x546899(0x4a6)](_0x487130);if(!_0x21635d)return;this[_0x546899(0x465)]=_0x21635d[_0x546899(0x9a8)],this[_0x546899(0xa3e)]=_0x21635d['_x'],this[_0x546899(0x691)]=_0x21635d['_y'];const _0x482e91=ColorManager[_0x546899(0x2b5)]();this[_0x546899(0x9cc)][_0x546899(0x717)](0x0,0x0,this['innerWidth'],this[_0x546899(0x7fb)],_0x482e91);const _0x285a8c=_0x546899(0x3d9)['format'](_0x21635d[_0x546899(0x9a8)]===0x0?'Upper\x20Left':_0x546899(0x90b)),_0x66f855='X:\x20%1'[_0x546899(0x649)](_0x21635d['_x']),_0x22dfda=_0x546899(0xa4b)[_0x546899(0x649)](_0x21635d['_y']),_0x5ca4cf=_0x546899(0x984)['format'](TextManager[_0x546899(0x4f1)](_0x546899(0x908)));let _0x428541=Math['floor'](this[_0x546899(0x2c6)]/0x4);this['drawText'](_0x285a8c,_0x428541*0x0,0x0,_0x428541),this[_0x546899(0x60d)](_0x66f855,_0x428541*0x1,0x0,_0x428541,_0x546899(0x735)),this['drawText'](_0x22dfda,_0x428541*0x2,0x0,_0x428541,'center');const _0x10ff53=this[_0x546899(0x386)](_0x5ca4cf)[_0x546899(0x552)],_0x49e2cf=this[_0x546899(0x2c6)]-_0x10ff53;this['drawTextEx'](_0x5ca4cf,_0x49e2cf,0x0,_0x10ff53);},VisuMZ[_0x1c6d52(0x52a)]=function(_0x1827f8){const _0x5da95d=_0x1c6d52;if(Utils['isOptionValid'](_0x5da95d(0x218))){var _0x581d3e=require(_0x5da95d(0x47a))[_0x5da95d(0x5a1)]['get']();SceneManager[_0x5da95d(0x8ee)]();if(_0x1827f8)setTimeout(_0x581d3e[_0x5da95d(0x1ea)][_0x5da95d(0x2fe)](_0x581d3e),0x190);}},VisuMZ[_0x1c6d52(0x59f)]=function(_0x10efa9,_0x4b734d){const _0x23bfbd=_0x1c6d52;_0x4b734d=_0x4b734d['toUpperCase']();var _0xcaa9ea=1.70158,_0xede48b=0.7;switch(_0x4b734d){case'LINEAR':return _0x10efa9;case _0x23bfbd(0x954):return-0x1*Math[_0x23bfbd(0x827)](_0x10efa9*(Math['PI']/0x2))+0x1;case _0x23bfbd(0x424):return Math[_0x23bfbd(0x340)](_0x10efa9*(Math['PI']/0x2));case _0x23bfbd(0x436):return-0.5*(Math[_0x23bfbd(0x827)](Math['PI']*_0x10efa9)-0x1);case _0x23bfbd(0x3e8):return _0x10efa9*_0x10efa9;case _0x23bfbd(0x7e7):return _0x10efa9*(0x2-_0x10efa9);case _0x23bfbd(0x7e0):return _0x10efa9<0.5?0x2*_0x10efa9*_0x10efa9:-0x1+(0x4-0x2*_0x10efa9)*_0x10efa9;case'INCUBIC':return _0x10efa9*_0x10efa9*_0x10efa9;case _0x23bfbd(0x6fd):var _0x44cbda=_0x10efa9-0x1;return _0x44cbda*_0x44cbda*_0x44cbda+0x1;case _0x23bfbd(0x88f):return _0x10efa9<0.5?0x4*_0x10efa9*_0x10efa9*_0x10efa9:(_0x10efa9-0x1)*(0x2*_0x10efa9-0x2)*(0x2*_0x10efa9-0x2)+0x1;case'INQUART':return _0x10efa9*_0x10efa9*_0x10efa9*_0x10efa9;case'OUTQUART':var _0x44cbda=_0x10efa9-0x1;return 0x1-_0x44cbda*_0x44cbda*_0x44cbda*_0x44cbda;case _0x23bfbd(0x2ff):var _0x44cbda=_0x10efa9-0x1;return _0x10efa9<0.5?0x8*_0x10efa9*_0x10efa9*_0x10efa9*_0x10efa9:0x1-0x8*_0x44cbda*_0x44cbda*_0x44cbda*_0x44cbda;case'INQUINT':return _0x10efa9*_0x10efa9*_0x10efa9*_0x10efa9*_0x10efa9;case _0x23bfbd(0x28e):var _0x44cbda=_0x10efa9-0x1;return 0x1+_0x44cbda*_0x44cbda*_0x44cbda*_0x44cbda*_0x44cbda;case'INOUTQUINT':var _0x44cbda=_0x10efa9-0x1;return _0x10efa9<0.5?0x10*_0x10efa9*_0x10efa9*_0x10efa9*_0x10efa9*_0x10efa9:0x1+0x10*_0x44cbda*_0x44cbda*_0x44cbda*_0x44cbda*_0x44cbda;case _0x23bfbd(0x9e7):if(_0x10efa9===0x0){if(_0x23bfbd(0x229)!==_0x23bfbd(0x35c))return 0x0;else{const _0x26c8f9=_0x2ccbff['Symbol'];let _0x497e3f=_0x842a59[_0x23bfbd(0x374)];if(['',_0x23bfbd(0x3d3)]['includes'](_0x497e3f))_0x497e3f=_0x1e0a5[_0x23bfbd(0x2e6)][_0x23bfbd(0x78a)](this);const _0x20a8c5=_0x15b8e6[_0x23bfbd(0x262)][_0x23bfbd(0x78a)](this),_0x3ba785=_0xa1dd73[_0x23bfbd(0x22b)][_0x23bfbd(0x78a)](this);this[_0x23bfbd(0x53b)](_0x497e3f,_0x26c8f9,_0x20a8c5,_0x3ba785),this[_0x23bfbd(0xa00)](_0x26c8f9,_0x3aec46[_0x23bfbd(0x67e)]['bind'](this,_0x3ba785));}}return Math['pow'](0x2,0xa*(_0x10efa9-0x1));case _0x23bfbd(0x41e):if(_0x10efa9===0x1){if(_0x23bfbd(0x87d)!==_0x23bfbd(0x832))return 0x1;else this[_0x23bfbd(0x2cf)][_0x23bfbd(0x71d)]=this[_0x23bfbd(0x79e)],![]&&this[_0x23bfbd(0x2cf)][_0x23bfbd(0x552)]>0x0&&(this[_0x23bfbd(0x2cf)][_0x23bfbd(0x490)]=null,this[_0x23bfbd(0x6ad)]());}return-Math['pow'](0x2,-0xa*_0x10efa9)+0x1;case _0x23bfbd(0x1c3):if(_0x10efa9===0x0||_0x10efa9===0x1)return _0x10efa9;var _0x19a34b=_0x10efa9*0x2,_0x49127a=_0x19a34b-0x1;if(_0x19a34b<0x1)return 0.5*Math['pow'](0x2,0xa*_0x49127a);return 0.5*(-Math[_0x23bfbd(0x6a3)](0x2,-0xa*_0x49127a)+0x2);case _0x23bfbd(0x782):var _0x19a34b=_0x10efa9/0x1;return-0x1*(Math['sqrt'](0x1-_0x19a34b*_0x10efa9)-0x1);case'OUTCIRC':var _0x44cbda=_0x10efa9-0x1;return Math['sqrt'](0x1-_0x44cbda*_0x44cbda);case'INOUTCIRC':var _0x19a34b=_0x10efa9*0x2,_0x49127a=_0x19a34b-0x2;if(_0x19a34b<0x1)return-0.5*(Math[_0x23bfbd(0x1ca)](0x1-_0x19a34b*_0x19a34b)-0x1);return 0.5*(Math[_0x23bfbd(0x1ca)](0x1-_0x49127a*_0x49127a)+0x1);case _0x23bfbd(0x98e):return _0x10efa9*_0x10efa9*((_0xcaa9ea+0x1)*_0x10efa9-_0xcaa9ea);case _0x23bfbd(0x8ed):var _0x19a34b=_0x10efa9/0x1-0x1;return _0x19a34b*_0x19a34b*((_0xcaa9ea+0x1)*_0x19a34b+_0xcaa9ea)+0x1;break;case _0x23bfbd(0x6fe):var _0x19a34b=_0x10efa9*0x2,_0x3f8139=_0x19a34b-0x2,_0x2a0ef9=_0xcaa9ea*1.525;if(_0x19a34b<0x1){if(_0x23bfbd(0x549)===_0x23bfbd(0x2ce))_0x22d723[_0x23bfbd(0x7b7)][_0x23bfbd(0x945)]['call'](this,_0x5e9379,_0x1542a5,_0x3955ca),_0x58b416[_0x23bfbd(0x52a)](![]);else return 0.5*_0x19a34b*_0x19a34b*((_0x2a0ef9+0x1)*_0x19a34b-_0x2a0ef9);}return 0.5*(_0x3f8139*_0x3f8139*((_0x2a0ef9+0x1)*_0x3f8139+_0x2a0ef9)+0x2);case _0x23bfbd(0x8e2):if(_0x10efa9===0x0||_0x10efa9===0x1)return _0x10efa9;var _0x19a34b=_0x10efa9/0x1,_0x49127a=_0x19a34b-0x1,_0x216aaf=0x1-_0xede48b,_0x2a0ef9=_0x216aaf/(0x2*Math['PI'])*Math[_0x23bfbd(0x6b6)](0x1);return-(Math[_0x23bfbd(0x6a3)](0x2,0xa*_0x49127a)*Math['sin']((_0x49127a-_0x2a0ef9)*(0x2*Math['PI'])/_0x216aaf));case _0x23bfbd(0x206):var _0x216aaf=0x1-_0xede48b,_0x19a34b=_0x10efa9*0x2;if(_0x10efa9===0x0||_0x10efa9===0x1)return _0x10efa9;var _0x2a0ef9=_0x216aaf/(0x2*Math['PI'])*Math[_0x23bfbd(0x6b6)](0x1);return Math[_0x23bfbd(0x6a3)](0x2,-0xa*_0x19a34b)*Math['sin']((_0x19a34b-_0x2a0ef9)*(0x2*Math['PI'])/_0x216aaf)+0x1;case _0x23bfbd(0x3a0):var _0x216aaf=0x1-_0xede48b;if(_0x10efa9===0x0||_0x10efa9===0x1)return _0x10efa9;var _0x19a34b=_0x10efa9*0x2,_0x49127a=_0x19a34b-0x1,_0x2a0ef9=_0x216aaf/(0x2*Math['PI'])*Math['asin'](0x1);if(_0x19a34b<0x1)return-0.5*(Math['pow'](0x2,0xa*_0x49127a)*Math[_0x23bfbd(0x340)]((_0x49127a-_0x2a0ef9)*(0x2*Math['PI'])/_0x216aaf));return Math[_0x23bfbd(0x6a3)](0x2,-0xa*_0x49127a)*Math[_0x23bfbd(0x340)]((_0x49127a-_0x2a0ef9)*(0x2*Math['PI'])/_0x216aaf)*0.5+0x1;case _0x23bfbd(0x74a):var _0x19a34b=_0x10efa9/0x1;if(_0x19a34b<0x1/2.75){if(_0x23bfbd(0x69d)!=='GFzPl')_0x30a428(_0x23bfbd(0x264)['format'](_0x25a0bc));else return 7.5625*_0x19a34b*_0x19a34b;}else{if(_0x19a34b<0x2/2.75){var _0x3f8139=_0x19a34b-1.5/2.75;return 7.5625*_0x3f8139*_0x3f8139+0.75;}else{if(_0x19a34b<2.5/2.75){var _0x3f8139=_0x19a34b-2.25/2.75;return 7.5625*_0x3f8139*_0x3f8139+0.9375;}else{var _0x3f8139=_0x19a34b-2.625/2.75;return 7.5625*_0x3f8139*_0x3f8139+0.984375;}}}case _0x23bfbd(0x622):var _0x10bdc0=0x1-VisuMZ['ApplyEasing'](0x1-_0x10efa9,'outbounce');return _0x10bdc0;case _0x23bfbd(0x729):if(_0x10efa9<0.5){if('jpTgB'===_0x23bfbd(0x63c)){var _0x3fcca3=_0x3592e0(_0x3c76f8['$1'])/0x64;_0x5e39a4+=_0x3fcca3;}else var _0x10bdc0=VisuMZ[_0x23bfbd(0x59f)](_0x10efa9*0x2,'inbounce')*0.5;}else var _0x10bdc0=VisuMZ[_0x23bfbd(0x59f)](_0x10efa9*0x2-0x1,'outbounce')*0.5+0.5;return _0x10bdc0;default:return _0x10efa9;}},VisuMZ[_0x1c6d52(0x896)]=function(_0x5df138){const _0x51b370=_0x1c6d52;_0x5df138=String(_0x5df138)[_0x51b370(0x5dd)]();const _0x3e99cf=VisuMZ[_0x51b370(0x7b7)]['Settings'][_0x51b370(0x8a8)];if(_0x5df138===_0x51b370(0x4bb))return _0x3e99cf['IconParam0'];if(_0x5df138===_0x51b370(0x999))return _0x3e99cf['IconParam1'];if(_0x5df138==='ATK')return _0x3e99cf[_0x51b370(0x60a)];if(_0x5df138===_0x51b370(0x36d))return _0x3e99cf[_0x51b370(0x1cb)];if(_0x5df138===_0x51b370(0x4d3))return _0x3e99cf[_0x51b370(0x61e)];if(_0x5df138===_0x51b370(0x724))return _0x3e99cf[_0x51b370(0x2db)];if(_0x5df138===_0x51b370(0x494))return _0x3e99cf[_0x51b370(0x93c)];if(_0x5df138===_0x51b370(0x27f))return _0x3e99cf[_0x51b370(0x322)];if(_0x5df138===_0x51b370(0x3f9))return _0x3e99cf[_0x51b370(0x5b4)];if(_0x5df138===_0x51b370(0x959))return _0x3e99cf[_0x51b370(0x60c)];if(_0x5df138===_0x51b370(0x360))return _0x3e99cf[_0x51b370(0x933)];if(_0x5df138===_0x51b370(0x787))return _0x3e99cf['IconXParam3'];if(_0x5df138===_0x51b370(0x57e))return _0x3e99cf[_0x51b370(0x447)];if(_0x5df138===_0x51b370(0x2e0))return _0x3e99cf['IconXParam5'];if(_0x5df138===_0x51b370(0x8f3))return _0x3e99cf['IconXParam6'];if(_0x5df138===_0x51b370(0x76d))return _0x3e99cf[_0x51b370(0x272)];if(_0x5df138===_0x51b370(0x781))return _0x3e99cf['IconXParam8'];if(_0x5df138==='TRG')return _0x3e99cf[_0x51b370(0x34f)];if(_0x5df138===_0x51b370(0x480))return _0x3e99cf[_0x51b370(0x83e)];if(_0x5df138===_0x51b370(0x311))return _0x3e99cf[_0x51b370(0x3e6)];if(_0x5df138===_0x51b370(0x84e))return _0x3e99cf[_0x51b370(0x376)];if(_0x5df138==='PHA')return _0x3e99cf[_0x51b370(0x407)];if(_0x5df138===_0x51b370(0x626))return _0x3e99cf[_0x51b370(0x23d)];if(_0x5df138===_0x51b370(0x406))return _0x3e99cf[_0x51b370(0x751)];if(_0x5df138===_0x51b370(0x555))return _0x3e99cf[_0x51b370(0x41b)];if(_0x5df138===_0x51b370(0x30d))return _0x3e99cf[_0x51b370(0x58f)];if(_0x5df138==='FDR')return _0x3e99cf['IconSParam8'];if(_0x5df138===_0x51b370(0x3a9))return _0x3e99cf[_0x51b370(0x928)];if(VisuMZ[_0x51b370(0x7b7)][_0x51b370(0x56b)][_0x5df138])return VisuMZ[_0x51b370(0x7b7)]['CustomParamIcons'][_0x5df138]||0x0;return 0x0;},VisuMZ[_0x1c6d52(0x4d7)]=function(_0x401079,_0x49f6ec,_0x378d8d){const _0x5f9ade=_0x1c6d52;if(_0x378d8d===undefined&&_0x401079%0x1===0x0)return _0x401079;if(_0x378d8d!==undefined&&[_0x5f9ade(0x4bb),_0x5f9ade(0x999),_0x5f9ade(0x24f),_0x5f9ade(0x36d),'MAT',_0x5f9ade(0x724),_0x5f9ade(0x494),_0x5f9ade(0x27f)][_0x5f9ade(0xa04)](String(_0x378d8d)[_0x5f9ade(0x5dd)]()[_0x5f9ade(0x40e)]()))return _0x401079;_0x49f6ec=_0x49f6ec||0x0;if(VisuMZ[_0x5f9ade(0x7b7)][_0x5f9ade(0x476)][_0x378d8d]){if(VisuMZ['CoreEngine'][_0x5f9ade(0x1ba)][_0x378d8d]===_0x5f9ade(0x3d4))return _0x401079;else{if(_0x5f9ade(0x3f0)===_0x5f9ade(0x836))this[_0x5f9ade(0x534)]=![];else return String((_0x401079*0x64)[_0x5f9ade(0x6f7)](_0x49f6ec))+'%';}}return String((_0x401079*0x64)[_0x5f9ade(0x6f7)](_0x49f6ec))+'%';},VisuMZ[_0x1c6d52(0x279)]=function(_0x190a49){const _0x5043d6=_0x1c6d52;_0x190a49=String(_0x190a49);if(!_0x190a49)return _0x190a49;if(typeof _0x190a49!==_0x5043d6(0x39d))return _0x190a49;const _0x1a1ad1=VisuMZ[_0x5043d6(0x7b7)][_0x5043d6(0x719)][_0x5043d6(0x858)][_0x5043d6(0x8b6)]||_0x5043d6(0x9d2),_0x107e1c={'maximumFractionDigits':0x6};_0x190a49=_0x190a49[_0x5043d6(0x9c5)](/\[(.*?)\]/g,(_0x3c7a20,_0x293446)=>{const _0x566e6f=_0x5043d6;return VisuMZ[_0x566e6f(0x78c)](_0x293446,'[',']');}),_0x190a49=_0x190a49[_0x5043d6(0x9c5)](/<(.*?)>/g,(_0x4d4d4f,_0x496425)=>{return VisuMZ['PreserveNumbers'](_0x496425,'<','>');}),_0x190a49=_0x190a49['replace'](/\{\{(.*?)\}\}/g,(_0x3adca6,_0x5eaae7)=>{const _0x58272c=_0x5043d6;return VisuMZ[_0x58272c(0x78c)](_0x5eaae7,'','');}),_0x190a49=_0x190a49[_0x5043d6(0x9c5)](/(\d+\.?\d*)/g,(_0x277bbe,_0x510b36)=>{const _0x13a018=_0x5043d6;let _0x327b09=_0x510b36;if(_0x327b09[0x0]==='0')return _0x327b09;if(_0x327b09[_0x327b09[_0x13a018(0x3bf)]-0x1]==='.'){if(_0x13a018(0x1b0)!==_0x13a018(0x1b0))this['cursorPagedown']();else return Number(_0x327b09)[_0x13a018(0x2f1)](_0x1a1ad1,_0x107e1c)+'.';}else{if(_0x327b09[_0x327b09[_0x13a018(0x3bf)]-0x1]===','){if(_0x13a018(0x7f3)==='sLZRt'){const _0x1f15c=_0xa84658[_0x4ecd4f['parameters'][0x0]];if(_0x1f15c&&this[_0x13a018(0x417)]<=0xa){this[_0x13a018(0x417)]++;let _0x516b33=_0x11f6e4[_0x13a018(0x7b7)][_0x13a018(0x21b)](_0x1f15c[_0x13a018(0x5c4)]);_0x516b33[_0x13a018(0x3bf)]>0x0&&(_0x2085de+=_0x1df2b0,_0x206a73+=_0x24731d,_0x51a9a0+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'[_0x13a018(0x649)](_0x1f15c['id'],_0x1f15c[_0x13a018(0x4fb)]),_0x59e8e8+=_0x430224,_0x5ba88b+=_0x516b33,_0x467c30+=_0xe7a7c5,_0x531742+=_0x13a018(0x22a)[_0x13a018(0x649)](_0x1f15c['id'],_0x1f15c[_0x13a018(0x4fb)]),_0x322c44+=_0x2f5618),this['_commonEventLayers']--;}}else return Number(_0x327b09)[_0x13a018(0x2f1)](_0x1a1ad1,_0x107e1c)+',';}else{if(_0x13a018(0x54d)!==_0x13a018(0x54d))this[_0x13a018(0x30e)]=this[_0x13a018(0x30e)]||[],this[_0x13a018(0x30e)][_0x13a018(0x9d0)](_0xc6a643);else return Number(_0x327b09)[_0x13a018(0x2f1)](_0x1a1ad1,_0x107e1c);}}});let _0x5094b4=0x3;while(_0x5094b4--){_0x190a49=VisuMZ[_0x5043d6(0x95a)](_0x190a49);}return _0x190a49;},VisuMZ[_0x1c6d52(0x78c)]=function(_0x1356f0,_0x39f71c,_0x56cfea){const _0x396678=_0x1c6d52;return _0x1356f0=_0x1356f0[_0x396678(0x9c5)](/(\d)/gi,(_0x574ce7,_0x511bb0)=>'PRESERVCONVERSION(%1)'[_0x396678(0x649)](Number(_0x511bb0))),'%2%1%3'[_0x396678(0x649)](_0x1356f0,_0x39f71c,_0x56cfea);},VisuMZ[_0x1c6d52(0x95a)]=function(_0x24fc1e){const _0x530e39=_0x1c6d52;return _0x24fc1e=_0x24fc1e[_0x530e39(0x9c5)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x196263,_0x987ad5)=>Number(parseInt(_0x987ad5))),_0x24fc1e;},VisuMZ[_0x1c6d52(0x4cf)]=function(_0x577ee0){const _0x5a4e07=_0x1c6d52;SoundManager['playOk']();if(!Utils[_0x5a4e07(0x75b)]()){if(_0x5a4e07(0x329)===_0x5a4e07(0x882))return _0x3fc1a3[_0x5a4e07(0x872)][_0x5a4e07(0x44b)][_0x5a4e07(0x78a)](this);else{const _0x239c4d=window['open'](_0x577ee0,_0x5a4e07(0x244));}}else{const _0x7cbab=process[_0x5a4e07(0x7c4)]==_0x5a4e07(0x37f)?_0x5a4e07(0x63d):process[_0x5a4e07(0x7c4)]==_0x5a4e07(0xa28)?_0x5a4e07(0x9d7):_0x5a4e07(0x81d);require(_0x5a4e07(0x4ff))[_0x5a4e07(0x71c)](_0x7cbab+'\x20'+_0x577ee0);}},VisuMZ[_0x1c6d52(0x4e3)]=function(_0x3fa400,_0x3bf286){const _0x3a9a28=_0x1c6d52;if(!_0x3fa400)return'';const _0x1e6e5f=_0x3fa400[_0x3a9a28(0x7f9)]||_0x3fa400['id'];let _0x340e1f='';_0x3fa400[_0x3a9a28(0x47d)]!==undefined&&_0x3fa400[_0x3a9a28(0x61b)]!==undefined&&(_0x340e1f='Actor-%1-%2'[_0x3a9a28(0x649)](_0x1e6e5f,_0x3bf286));_0x3fa400[_0x3a9a28(0x830)]!==undefined&&_0x3fa400['learnings']!==undefined&&(_0x340e1f=_0x3a9a28(0x22c)['format'](_0x1e6e5f,_0x3bf286));_0x3fa400['stypeId']!==undefined&&_0x3fa400[_0x3a9a28(0x37a)]!==undefined&&(_0x340e1f=_0x3a9a28(0x93d)[_0x3a9a28(0x649)](_0x1e6e5f,_0x3bf286));_0x3fa400[_0x3a9a28(0x1b6)]!==undefined&&_0x3fa400[_0x3a9a28(0x6ca)]!==undefined&&(_0x340e1f='Item-%1-%2'[_0x3a9a28(0x649)](_0x1e6e5f,_0x3bf286));_0x3fa400[_0x3a9a28(0x3e4)]!==undefined&&_0x3fa400[_0x3a9a28(0x57a)]===0x1&&(_0x340e1f='Weapon-%1-%2'[_0x3a9a28(0x649)](_0x1e6e5f,_0x3bf286));_0x3fa400[_0x3a9a28(0x21e)]!==undefined&&_0x3fa400[_0x3a9a28(0x57a)]>0x1&&(_0x340e1f=_0x3a9a28(0x74f)[_0x3a9a28(0x649)](_0x1e6e5f,_0x3bf286));if(_0x3fa400[_0x3a9a28(0x94d)]!==undefined&&_0x3fa400['battlerHue']!==undefined){if(_0x3a9a28(0x5ea)===_0x3a9a28(0x5ea))_0x340e1f=_0x3a9a28(0x894)[_0x3a9a28(0x649)](_0x1e6e5f,_0x3bf286);else{var _0x4e25e5=_0x167387(_0x5dc311['$1']);_0x36482d+=_0x4e25e5;}}return _0x3fa400[_0x3a9a28(0x617)]!==undefined&&_0x3fa400[_0x3a9a28(0x327)]!==undefined&&(_0x3a9a28(0x76b)===_0x3a9a28(0x76b)?_0x340e1f=_0x3a9a28(0x766)[_0x3a9a28(0x649)](_0x1e6e5f,_0x3bf286):this[_0x3a9a28(0x3c1)]='CTB'),_0x340e1f;},Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x67b)]=function(){const _0x43cc0b=_0x1c6d52;return this[_0x43cc0b(0x69b)];},VisuMZ['CoreEngine'][_0x1c6d52(0xa13)]=Game_Picture[_0x1c6d52(0x721)]['initBasic'],Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x884)]=function(){const _0x241e1b=_0x1c6d52;VisuMZ[_0x241e1b(0x7b7)][_0x241e1b(0xa13)][_0x241e1b(0x78a)](this),this['_anchor']={'x':0x0,'y':0x0},this[_0x241e1b(0x7b2)]={'x':0x0,'y':0x0};},VisuMZ['CoreEngine'][_0x1c6d52(0x234)]=Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x9c3)],Game_Picture['prototype'][_0x1c6d52(0x9c3)]=function(){const _0x3345ce=_0x1c6d52;this[_0x3345ce(0x6ef)]();const _0x3157d8=this['_duration'];VisuMZ['CoreEngine']['Game_Picture_updateMove']['call'](this),_0x3157d8>0x0&&this[_0x3345ce(0x55e)]<=0x0&&(_0x3345ce(0x5ef)===_0x3345ce(0x2ee)?this[_0x3345ce(0x7ab)](_0x3e6647):(this['_x']=this[_0x3345ce(0x6d2)],this['_y']=this[_0x3345ce(0x48e)],this['_scaleX']=this[_0x3345ce(0x49c)],this[_0x3345ce(0x35b)]=this[_0x3345ce(0x33f)],this[_0x3345ce(0x37b)]=this[_0x3345ce(0x968)],this[_0x3345ce(0x69b)]&&(this[_0x3345ce(0x69b)]['x']=this['_targetAnchor']['x'],this[_0x3345ce(0x69b)]['y']=this['_targetAnchor']['y'])));},VisuMZ[_0x1c6d52(0x7b7)]['Game_Picture_show']=Game_Picture['prototype'][_0x1c6d52(0x810)],Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x810)]=function(_0x372ea7,_0x2b7c6a,_0x45faf2,_0x549616,_0x58a835,_0x4760c4,_0x3789ca,_0x1d7738){const _0x17d1ce=_0x1c6d52;VisuMZ['CoreEngine']['Game_Picture_show'][_0x17d1ce(0x78a)](this,_0x372ea7,_0x2b7c6a,_0x45faf2,_0x549616,_0x58a835,_0x4760c4,_0x3789ca,_0x1d7738),this[_0x17d1ce(0x462)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x2b7c6a]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x1c6d52(0x663)]=Game_Picture['prototype'][_0x1c6d52(0x773)],Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x773)]=function(_0x3a2bdd,_0x323a4c,_0x31610a,_0x35dc70,_0x5e91ef,_0x5cc23b,_0x201849,_0x4a9105,_0x6a52f1){const _0x4859ae=_0x1c6d52;VisuMZ[_0x4859ae(0x7b7)][_0x4859ae(0x663)][_0x4859ae(0x78a)](this,_0x3a2bdd,_0x323a4c,_0x31610a,_0x35dc70,_0x5e91ef,_0x5cc23b,_0x201849,_0x4a9105,_0x6a52f1),this[_0x4859ae(0x777)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3a2bdd]||{'x':0x0,'y':0x0});},Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x6ef)]=function(){const _0x4c17e7=_0x1c6d52;if(this['_duration']>0x0){if('VFNKT'===_0x4c17e7(0x297))this['_anchor']['x']=this['applyEasing'](this[_0x4c17e7(0x69b)]['x'],this['_targetAnchor']['x']),this[_0x4c17e7(0x69b)]['y']=this[_0x4c17e7(0x9d6)](this[_0x4c17e7(0x69b)]['y'],this[_0x4c17e7(0x7b2)]['y']);else{let _0x288cdd=_0x3d4a8f;if(_0x288cdd[0x0]==='0')return _0x288cdd;if(_0x288cdd[_0x288cdd['length']-0x1]==='.')return _0x45efea(_0x288cdd)[_0x4c17e7(0x2f1)](_0x3f08f9,_0x55ec41)+'.';else return _0x288cdd[_0x288cdd[_0x4c17e7(0x3bf)]-0x1]===','?_0x10a90e(_0x288cdd)[_0x4c17e7(0x2f1)](_0x1d9313,_0x8e3b9f)+',':_0x4d3369(_0x288cdd)[_0x4c17e7(0x2f1)](_0x31cd20,_0x1cb992);}}},Game_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x462)]=function(_0x5e3639){const _0x5f1aa0=_0x1c6d52;this['_anchor']=_0x5e3639,this[_0x5f1aa0(0x7b2)]=JsonEx[_0x5f1aa0(0x1d8)](this[_0x5f1aa0(0x69b)]);},Game_Picture['prototype'][_0x1c6d52(0x777)]=function(_0xec5db6){this['_targetAnchor']=_0xec5db6;},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x936)]=Sprite_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x863)],Sprite_Picture[_0x1c6d52(0x721)][_0x1c6d52(0x863)]=function(){const _0x50677d=_0x1c6d52,_0x2af133=this['picture']();!_0x2af133[_0x50677d(0x67b)]()?VisuMZ['CoreEngine']['Sprite_Picture_updateOrigin'][_0x50677d(0x78a)](this):(this[_0x50677d(0x67b)]['x']=_0x2af133[_0x50677d(0x67b)]()['x'],this['anchor']['y']=_0x2af133[_0x50677d(0x67b)]()['y']);},Game_Action[_0x1c6d52(0x721)]['setEnemyAction']=function(_0x5ad5b){const _0x335486=_0x1c6d52;if(_0x5ad5b){const _0x2fcaba=_0x5ad5b[_0x335486(0x7b9)];if(_0x2fcaba===0x1&&this[_0x335486(0x6de)]()[_0x335486(0x5ec)]()!==0x1)this[_0x335486(0x7ee)]();else _0x2fcaba===0x2&&this[_0x335486(0x6de)]()['guardSkillId']()!==0x2?_0x335486(0x9bf)!==_0x335486(0x9bf)?this['smoothSelect'](_0x44c0ad[_0x335486(0x42f)](this[_0x335486(0x428)](),0x0)):this[_0x335486(0x4b1)]():_0x335486(0x8a1)!==_0x335486(0x8a1)?(_0x1a1f8b('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x335486(0x649)](_0x500369,_0x498f41)),_0x383c81[_0x335486(0x2d5)]()):this['setSkill'](_0x2fcaba);}else this[_0x335486(0x261)]();},Game_Actor[_0x1c6d52(0x721)]['usableSkills']=function(){const _0x1bd6d2=_0x1c6d52;return this[_0x1bd6d2(0x368)]()[_0x1bd6d2(0x230)](_0x11d2a4=>this[_0x1bd6d2(0x7e3)](_0x11d2a4)&&this[_0x1bd6d2(0x4e2)]()[_0x1bd6d2(0xa04)](_0x11d2a4[_0x1bd6d2(0x336)]));},Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0xa14)]=function(){const _0x2d7923=_0x1c6d52;this[_0x2d7923(0x2cc)]=new Sprite(),this[_0x2d7923(0x2cc)][_0x2d7923(0x33a)]=new Bitmap(0x0,0x0),this[_0x2d7923(0x2cc)]['x']=0x0,this[_0x2d7923(0xa11)](this['_dimmerSprite']);},Window_Base[_0x1c6d52(0x721)][_0x1c6d52(0x249)]=function(){const _0x1af01c=_0x1c6d52;if(this['_dimmerSprite']){const _0x34ccf1=this[_0x1af01c(0x2cc)]['bitmap'],_0x7e15ff=this[_0x1af01c(0x552)],_0x199232=this[_0x1af01c(0x81f)],_0x5bbe21=this[_0x1af01c(0x88d)],_0x4b2860=ColorManager['dimColor1'](),_0x553ced=ColorManager[_0x1af01c(0x9a3)]();_0x34ccf1[_0x1af01c(0x6d0)](_0x7e15ff,_0x199232),_0x34ccf1[_0x1af01c(0x2b7)](0x0,0x0,_0x7e15ff,_0x5bbe21,_0x553ced,_0x4b2860,!![]),_0x34ccf1[_0x1af01c(0x717)](0x0,_0x5bbe21,_0x7e15ff,_0x199232-_0x5bbe21*0x2,_0x4b2860),_0x34ccf1[_0x1af01c(0x2b7)](0x0,_0x199232-_0x5bbe21,_0x7e15ff,_0x5bbe21,_0x4b2860,_0x553ced,!![]),this[_0x1af01c(0x2cc)][_0x1af01c(0x6ce)](0x0,0x0,_0x7e15ff,_0x199232);}},Game_Actor[_0x1c6d52(0x721)][_0x1c6d52(0x349)]=function(){const _0x289c3e=_0x1c6d52;for(let _0x4479ab=0x0;_0x4479ab<this[_0x289c3e(0x885)]();_0x4479ab++){if(_0x289c3e(0x35e)!==_0x289c3e(0x8d5)){const _0x53f9e9=this[_0x289c3e(0x431)]();let _0x53bcd2=Number['MIN_SAFE_INTEGER'];this['setAction'](_0x4479ab,_0x53f9e9[0x0]);for(const _0x5a2d7f of _0x53f9e9){if(_0x289c3e(0x353)!==_0x289c3e(0x1bc)){const _0x34481b=_0x5a2d7f[_0x289c3e(0x305)]();_0x34481b>_0x53bcd2&&(_0x53bcd2=_0x34481b,this['setAction'](_0x4479ab,_0x5a2d7f));}else{let _0x39cdf7=_0x26c29a['CoreEngine'][_0x289c3e(0xa08)][_0x289c3e(0x78a)](this);return _0x39cdf7;}}}else return _0x32b62b[_0x289c3e(0x7b7)][_0x289c3e(0x719)][_0x289c3e(0x8a8)][_0x289c3e(0x437)][_0x289c3e(0x3bf)];}this['setActionState'](_0x289c3e(0x753));},Window_BattleItem['prototype'][_0x1c6d52(0xa25)]=function(_0x5bde03){const _0x410b34=_0x1c6d52;return BattleManager[_0x410b34(0x8d6)]()?BattleManager['actor']()[_0x410b34(0x7e3)](_0x5bde03):Window_ItemList[_0x410b34(0x721)][_0x410b34(0xa25)][_0x410b34(0x78a)](this,_0x5bde03);},VisuMZ['CoreEngine'][_0x1c6d52(0x556)]=Scene_Map['prototype'][_0x1c6d52(0x9d8)],Scene_Map[_0x1c6d52(0x721)]['createSpriteset']=function(){const _0x216ade=_0x1c6d52;VisuMZ[_0x216ade(0x7b7)][_0x216ade(0x556)][_0x216ade(0x78a)](this);const _0x4f1c30=this[_0x216ade(0x87b)][_0x216ade(0x32d)];if(_0x4f1c30)this[_0x216ade(0x81b)](_0x4f1c30);},VisuMZ[_0x1c6d52(0x7b7)][_0x1c6d52(0x9be)]=Scene_Battle['prototype'][_0x1c6d52(0x9d8)],Scene_Battle[_0x1c6d52(0x721)]['createSpriteset']=function(){const _0x3a961e=_0x1c6d52;VisuMZ[_0x3a961e(0x7b7)]['Scene_Battle_createSpritesetFix'][_0x3a961e(0x78a)](this);const _0x1b20d0=this[_0x3a961e(0x87b)][_0x3a961e(0x32d)];if(_0x1b20d0)this[_0x3a961e(0x81b)](_0x1b20d0);},Sprite_Actor[_0x1c6d52(0x721)][_0x1c6d52(0xa50)]=function(){const _0x496af1=_0x1c6d52;Sprite_Battler[_0x496af1(0x721)][_0x496af1(0xa50)][_0x496af1(0x78a)](this),this[_0x496af1(0x323)]();if(this['_actor'])this[_0x496af1(0x1ec)]();else this[_0x496af1(0x3e5)]!==''&&(this[_0x496af1(0x3e5)]='');},Window[_0x1c6d52(0x721)][_0x1c6d52(0x8ff)]=function(){const _0x3f1e42=_0x1c6d52,_0x3ef467=this[_0x3f1e42(0x318)],_0x199c3b=this[_0x3f1e42(0x94b)],_0x1cbc76=0x18,_0x56e103=_0x1cbc76/0x2,_0x238587=0x60+_0x1cbc76,_0xf6b271=0x0+_0x1cbc76;this[_0x3f1e42(0x906)][_0x3f1e42(0x33a)]=this[_0x3f1e42(0x86b)],this['_downArrowSprite'][_0x3f1e42(0x67b)]['x']=0.5,this[_0x3f1e42(0x906)][_0x3f1e42(0x67b)]['y']=0.5,this['_downArrowSprite'][_0x3f1e42(0x6ce)](_0x238587+_0x56e103,_0xf6b271+_0x56e103+_0x1cbc76,_0x1cbc76,_0x56e103),this[_0x3f1e42(0x906)][_0x3f1e42(0x773)](Math[_0x3f1e42(0x5c2)](_0x3ef467/0x2),Math[_0x3f1e42(0x5c2)](_0x199c3b-_0x56e103)),this['_upArrowSprite']['bitmap']=this[_0x3f1e42(0x86b)],this[_0x3f1e42(0x4c0)][_0x3f1e42(0x67b)]['x']=0.5,this[_0x3f1e42(0x4c0)]['anchor']['y']=0.5,this['_upArrowSprite']['setFrame'](_0x238587+_0x56e103,_0xf6b271,_0x1cbc76,_0x56e103),this['_upArrowSprite']['move'](Math[_0x3f1e42(0x5c2)](_0x3ef467/0x2),Math[_0x3f1e42(0x5c2)](_0x56e103));},Window[_0x1c6d52(0x721)][_0x1c6d52(0x211)]=function(){const _0x5af0a9=_0x1c6d52,_0x5288b7=0x90,_0x96a64c=0x60,_0x5950d3=0x18;this[_0x5af0a9(0x662)][_0x5af0a9(0x33a)]=this[_0x5af0a9(0x86b)],this[_0x5af0a9(0x662)]['anchor']['x']=0.5,this['_pauseSignSprite']['anchor']['y']=0x1,this[_0x5af0a9(0x662)][_0x5af0a9(0x773)](Math[_0x5af0a9(0x5c2)](this[_0x5af0a9(0x318)]/0x2),this[_0x5af0a9(0x94b)]),this['_pauseSignSprite'][_0x5af0a9(0x6ce)](_0x5288b7,_0x96a64c,_0x5950d3,_0x5950d3),this[_0x5af0a9(0x662)][_0x5af0a9(0x69f)]=0xff;},Window[_0x1c6d52(0x721)][_0x1c6d52(0x1ce)]=function(){const _0xc95786=_0x1c6d52,_0x3198ea=this[_0xc95786(0x2b8)][_0xc95786(0x702)][_0xc95786(0x501)](new Point(0x0,0x0)),_0x188839=this['_clientArea']['filterArea'];_0x188839['x']=_0x3198ea['x']+this[_0xc95786(0x44a)]['x'],_0x188839['y']=_0x3198ea['y']+this[_0xc95786(0x44a)]['y'],_0x188839[_0xc95786(0x552)]=Math[_0xc95786(0x65c)](this['innerWidth']*this['scale']['x']),_0x188839[_0xc95786(0x81f)]=Math['ceil'](this[_0xc95786(0x7fb)]*this[_0xc95786(0x46c)]['y']);},Window[_0x1c6d52(0x721)][_0x1c6d52(0x9f0)]=function(){const _0x2481a8=_0x1c6d52,_0x265e13=this[_0x2481a8(0xa42)],_0x2cd07a=Math[_0x2481a8(0x269)](0x0,this[_0x2481a8(0x318)]-_0x265e13*0x2),_0x10564e=Math['max'](0x0,this[_0x2481a8(0x94b)]-_0x265e13*0x2),_0x156280=this[_0x2481a8(0x6df)],_0x1fd510=_0x156280[_0x2481a8(0x4e4)][0x0];_0x156280[_0x2481a8(0x33a)]=this[_0x2481a8(0x86b)],_0x156280['setFrame'](0x0,0x0,0x60,0x60),_0x156280['move'](_0x265e13,_0x265e13),_0x156280[_0x2481a8(0x46c)]['x']=_0x2cd07a/0x60,_0x156280[_0x2481a8(0x46c)]['y']=_0x10564e/0x60,_0x1fd510[_0x2481a8(0x33a)]=this[_0x2481a8(0x86b)],_0x1fd510['setFrame'](0x0,0x60,0x60,0x60),_0x1fd510[_0x2481a8(0x773)](0x0,0x0,_0x2cd07a,_0x10564e),_0x1fd510['scale']['x']=0x1/_0x156280[_0x2481a8(0x46c)]['x'],_0x1fd510[_0x2481a8(0x46c)]['y']=0x1/_0x156280[_0x2481a8(0x46c)]['y'],_0x156280[_0x2481a8(0x71b)](this[_0x2481a8(0x65a)]);},Game_Temp['prototype']['sceneTerminationClearEffects']=function(){const _0x143063=_0x1c6d52;this['_animationQueue']=[],this[_0x143063(0x8b2)]=[],this[_0x143063(0x844)]=[],this[_0x143063(0x3b1)]=[];},VisuMZ[_0x1c6d52(0x7b7)]['Scene_Base_terminateAnimationClearBugFix']=Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x204)],Scene_Base[_0x1c6d52(0x721)][_0x1c6d52(0x204)]=function(){const _0x8c7f4f=_0x1c6d52;if($gameTemp)$gameTemp[_0x8c7f4f(0x897)]();VisuMZ[_0x8c7f4f(0x7b7)][_0x8c7f4f(0x2a5)]['call'](this);},Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x991)]=function(_0x527771){const _0xb5a81c=_0x1c6d52,_0x222e16=this[_0xb5a81c(0x3c5)];_0x222e16['save'](),_0x222e16[_0xb5a81c(0x865)]=this[_0xb5a81c(0x481)]();const _0xaa378=_0x222e16[_0xb5a81c(0x4d6)](_0x527771)[_0xb5a81c(0x552)];return _0x222e16[_0xb5a81c(0x833)](),_0xaa378;},Window_Message[_0x1c6d52(0x721)][_0x1c6d52(0x70d)]=function(_0x5db254){const _0x4ec18a=_0x1c6d52;if(this['useFontWidthFix']())return this[_0x4ec18a(0x9cc)][_0x4ec18a(0x991)](_0x5db254);else{if('juXmF'===_0x4ec18a(0x803))return Window_Base[_0x4ec18a(0x721)][_0x4ec18a(0x70d)][_0x4ec18a(0x78a)](this,_0x5db254);else{if(this[_0x4ec18a(0x3de)]())_0x247eb7=_0x4d8e8b[_0x4ec18a(0x279)](_0x27ffbd);_0x4b8f89['CoreEngine'][_0x4ec18a(0x84d)][_0x4ec18a(0x78a)](this,_0x1c9776,_0x1d12b8,_0x4cad66,_0x15a715,_0x24387d);}}},Window_Message[_0x1c6d52(0x721)][_0x1c6d52(0x3c8)]=function(){const _0x2e391c=_0x1c6d52;return VisuMZ[_0x2e391c(0x7b7)]['Settings'][_0x2e391c(0x858)][_0x2e391c(0x56e)]??!![];},VisuMZ[_0x1c6d52(0x7b7)]['Game_Action_numRepeats']=Game_Action[_0x1c6d52(0x721)]['numRepeats'],Game_Action[_0x1c6d52(0x721)]['numRepeats']=function(){const _0x1a7050=_0x1c6d52;if(this[_0x1a7050(0x5b7)]()){if(_0x1a7050(0x1e8)===_0x1a7050(0x1e8))return VisuMZ[_0x1a7050(0x7b7)][_0x1a7050(0x6a8)]['call'](this);else{let _0x388475=_0x3489ca[_0x1a7050(0x7b7)][_0x1a7050(0x502)][_0x1a7050(0x78a)](this);return this[_0x1a7050(0x7ac)]()&&(_0x388475*=_0x525b6a[_0x1a7050(0x212)]()),_0x388475;}}else return 0x0;},VisuMZ[_0x1c6d52(0x7b7)]['Game_Action_setAttack']=Game_Action['prototype'][_0x1c6d52(0x7ee)],Game_Action[_0x1c6d52(0x721)][_0x1c6d52(0x7ee)]=function(){const _0x15f025=_0x1c6d52;if(this[_0x15f025(0x6de)]()&&this['subject']()['canAttack']()){if(_0x15f025(0x287)!=='fvdFH')VisuMZ[_0x15f025(0x7b7)][_0x15f025(0x770)][_0x15f025(0x78a)](this);else return this[_0x15f025(0x62e)]&&this[_0x15f025(0x62e)]instanceof _0x3313da;}else this['clear']();},Sprite_Name[_0x1c6d52(0x721)][_0x1c6d52(0x50e)]=function(){return 0x24;},Sprite_Name[_0x1c6d52(0x721)][_0x1c6d52(0x482)]=function(){const _0xd0517d=_0x1c6d52,_0x15cb00=this[_0xd0517d(0x4fb)](),_0x4e9d13=this[_0xd0517d(0x46a)](),_0x17a863=this['bitmapHeight']();this[_0xd0517d(0x3ad)](),this['bitmap'][_0xd0517d(0x261)](),this[_0xd0517d(0x33a)][_0xd0517d(0x3f2)](_0x15cb00,0x4,0x0,_0x4e9d13,_0x17a863,'left');},Bitmap[_0x1c6d52(0x721)][_0x1c6d52(0x3f2)]=function(_0x2139af,_0x1f2216,_0x11eacc,_0x489897,_0x4fb6af,_0x265fc4){const _0x4107ee=_0x1c6d52,_0x143b09=this[_0x4107ee(0x3c5)],_0x14f28e=_0x143b09[_0x4107ee(0x1e2)];_0x489897=_0x489897||0xffffffff;let _0x258cdc=_0x1f2216,_0x328d34=Math[_0x4107ee(0x5c2)](_0x11eacc+0x18/0x2+this[_0x4107ee(0x35f)]*0.35);_0x265fc4==='center'&&('LvNJZ'===_0x4107ee(0x5fe)?(this[_0x4107ee(0x7f7)]=this[_0x4107ee(0x87a)](),_0x3dd6f3['CoreEngine'][_0x4107ee(0x50c)]['call'](this,_0x5ca71d),this['_mode']===_0x4107ee(0x66c)?this[_0x4107ee(0x5dc)](0x0):(_0x5d8229[_0x4107ee(0x261)](),this[_0x4107ee(0x2d7)]())):_0x258cdc+=_0x489897/0x2),_0x265fc4===_0x4107ee(0x60e)&&(_0x4107ee(0xa39)!==_0x4107ee(0x883)?_0x258cdc+=_0x489897:_0x2b3f8c+=_0x3dbf55),_0x143b09[_0x4107ee(0x309)](),_0x143b09[_0x4107ee(0x865)]=this['_makeFontNameText'](),_0x143b09[_0x4107ee(0x616)]=_0x265fc4,_0x143b09['textBaseline']=_0x4107ee(0x795),_0x143b09[_0x4107ee(0x1e2)]=0x1,this[_0x4107ee(0x8e0)](_0x2139af,_0x258cdc,_0x328d34,_0x489897),_0x143b09[_0x4107ee(0x1e2)]=_0x14f28e,this['_drawTextBody'](_0x2139af,_0x258cdc,_0x328d34,_0x489897),_0x143b09[_0x4107ee(0x833)](),this[_0x4107ee(0x28f)]['update']();},VisuMZ['CoreEngine'][_0x1c6d52(0x1cc)]=BattleManager[_0x1c6d52(0x8b1)],BattleManager[_0x1c6d52(0x8b1)]=function(_0x58a22d){const _0x3f3eb1=_0x1c6d52;if(this['_action']['isForFriend']())return![];return VisuMZ[_0x3f3eb1(0x7b7)][_0x3f3eb1(0x1cc)][_0x3f3eb1(0x78a)](this,_0x58a22d);},BattleManager['endAction']=function(){const _0x235c5a=_0x1c6d52;if(this[_0x235c5a(0x8ef)])this['_logWindow'][_0x235c5a(0x6bf)](this[_0x235c5a(0x8ef)]);this[_0x235c5a(0x505)]='turn',this['_subject']&&this['_subject'][_0x235c5a(0x885)]()===0x0&&(this[_0x235c5a(0x613)](this['_subject']),this[_0x235c5a(0x8ef)]=null);},Bitmap['prototype']['_startLoading']=function(){const _0x81e256=_0x1c6d52;this[_0x81e256(0x2cf)]=new Image(),this[_0x81e256(0x2cf)][_0x81e256(0x490)]=this[_0x81e256(0x6ad)]['bind'](this),this['_image'][_0x81e256(0x7c9)]=this[_0x81e256(0x5e5)][_0x81e256(0x2fe)](this),this[_0x81e256(0x6fa)](),this['_loadingState']=_0x81e256(0x6bc),Utils[_0x81e256(0x372)]()?this['_startDecrypting']():(this[_0x81e256(0x2cf)][_0x81e256(0x71d)]=this[_0x81e256(0x79e)],![]&&this[_0x81e256(0x2cf)]['width']>0x0&&(this[_0x81e256(0x2cf)][_0x81e256(0x490)]=null,this[_0x81e256(0x6ad)]()));};