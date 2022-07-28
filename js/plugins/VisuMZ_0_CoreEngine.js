//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.67;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.67] [CoreEngine]
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

const _0x5eb334=_0xd3e4;(function(_0x3f860c,_0x28d495){const _0x9c7a31=_0xd3e4,_0x3bd9b6=_0x3f860c();while(!![]){try{const _0x2a86b8=-parseInt(_0x9c7a31(0x394))/0x1+-parseInt(_0x9c7a31(0x782))/0x2*(-parseInt(_0x9c7a31(0x5f6))/0x3)+-parseInt(_0x9c7a31(0x2bd))/0x4*(-parseInt(_0x9c7a31(0x3f9))/0x5)+parseInt(_0x9c7a31(0x13f))/0x6+parseInt(_0x9c7a31(0x1cd))/0x7*(-parseInt(_0x9c7a31(0x66f))/0x8)+-parseInt(_0x9c7a31(0x836))/0x9*(parseInt(_0x9c7a31(0x343))/0xa)+parseInt(_0x9c7a31(0x5b7))/0xb;if(_0x2a86b8===_0x28d495)break;else _0x3bd9b6['push'](_0x3bd9b6['shift']());}catch(_0x3b80a3){_0x3bd9b6['push'](_0x3bd9b6['shift']());}}}(_0x192d,0xf31b9));function _0x192d(){const _0x4a25ee=['transform','operation','subtitle','Window_Base_initialize','INOUTSINE','BottomHelp','MRG','IconParam3','JQAqx','mqCKF','Game_BattlerBase_refresh','_shakeSpeed','KzOBw','EditRect','createFauxAnimationQueue','buttonAssistOffset%1','atypeId','OUTCIRC','ColorPowerUp','getButtonAssistLocation','hasEncryptedImages','MLHaw','buttonAssistText2','RCKAD','clearOnceParallelInterpreters','GoldRect','OUTQUINT','CTB','determineSideButtonLayoutValid','BTB','Class-%1-%2','offsetY','origin','innerWidth','FFGNs','tab','forceStencil','qVIcM','MapNameTextCode','itemLineRect','bRIkF','contentsOpacity','globalAlpha','note','checkCoreEngineDisplayCenter','drawActorSimpleStatus','catchUnknownError','Subtitle','_setupEventHandlers','initialLevel','uiAreaWidth','_effectsContainer','tpColor','Bitmap_drawCircle','Lvkbh','targetEvaRate','_commonEventLayers','SParamVocab5','_baseTexture','csOae','Enemy','DocumentTitleFmt','_inputWindow','CommandRect','processSoundTimings','pictureId','ZBRag','NUMPAD0','EscapeAlways','openness','_stored_normalColor','openingSpeed','popScene','command105','setCoreEngineScreenShakeStyle','Input_setupEventHandlers','parallaxes','checkCacheKey','Snukg','tqidH','SwitchToggleOne','turn','Game_Action_itemEva','_windowskin','smoothSelect','TextCodeNicknames','xparamRateJS','option','eXDHD','processTimingData','_numberWindow','processKeyboardHome','GiGpJ','animationId','equips','switchModes','AAmsR','currencyUnit','_troopId','XvJxI','endAnimation','ConvertNumberToString','TGQll','CLEAR','printError','isGameActive','param','updateCurrentEvent','textColor','BTestAddedQuantity','Layer','itemRect','displayX','playTestCtrlT','ListRect','_stored_tpCostColor','PTB','WIN_OEM_FJ_LOYA','drawCharacter','ATK','Game_Map_setup','PictureEraseAll','Tilemap_addShadow','picture','centerCameraCheckData','ParseEnemyNotetags','MenuBg','EXCLAMATION','setMainFontSize','onNameOk','ColorSystem','stringKeyMap','clear','setupBattleTestItems','battleSystem','consumable','advanced','ColorHPGauge2','updatePosition','centerX','ControllerButtons','fQmCT','TrARP','LzHxF','command355','isPlaytest','MCR','isNormalPriority','STENCIL_TEST','dPiWD','createPointAnimationSprite','qbfdf','isActor','BgFilename1','open','Flat1','GoldIcon','cFanu','menuShowButton','showFauxAnimations','Center','SwyuA','Scene_Battle_createSpriteset_detach','MvAnimationRate','isFullDocumentTitle','Scene_Equip_create','%1〘Choice\x20Cancel〙%1','_scene','powerDownColor','expGaugeColor1','volume','INQUAD','eventsXyNt','removeAllPointAnimations','_stored_pendingColor','getLastUsedGamepadType','itypeId','isCancelled','addLoadListener','TitlePicButtons','description','MRF','yQIIh','isGamepadConnected','drawActorLevel','Sprite_Battler_startMove','performEscape','cVWka','XParamVocab6','_stored_ctGaugeColor2','updateDocumentTitle','JSON','evade','nJmtf','isAnimationPlaying','areTileShadowsHidden','makeTargetSprites','_animation','_downArrowSprite','attackSkillId','isAnimationOffsetXMirrored','Scene_Boot_loadSystemImages','KeyTAB','PictureCoordinatesMode','DeTcs','_backSprite1','Map%1','EnableNumberInput','_isButtonHidden','OPEN_CURLY_BRACKET','isNumpadPressed','SystemSetWindowPadding','system','Scene_Base_terminate','NNXih','ttDES','wwcck','WOlQd','ExportCurMapText','retrieveFauxAnimation','writeText','horizontal','maxLevel','gaugeRate','inBattle','NONCONVERT','Max','zxcTL','updatePictureCoordinates','drawGameTitle','xparamFlat1','platform','repeat','TextStr','alwaysDash','_inputSpecialKeyCode','_buttonType','isMapScrollLinked','CommandBgType','%1:\x20Exit\x20','dFnio','Sprite_Picture_loadBitmap','_scaleY','smooth','HYPHEN_MINUS','render','sipBe','4557600yyNiEf','processKeyboardBackspace','IRmob','IconXParam6','mpCostColor','Scene_Base_terminateAnimationClearBugFix','textWidth','expGaugeColor2','_playTestFastMode','integer','getControllerInputButtonString','TTbjS','checkSubstitute','ColorManager_loadWindowskin','setGuard','evaded','InputBgType','mpColor','PictureFilename','requestPointAnimation','Window_Selectable_cursorUp','setAttack','_clientArea','ParseTilesetNotetags','CLOSE_BRACKET','Scene_Name_onInputOk','ParseAllNotetags','_subject','Game_Action_setAttack','Xeqgh','isSideView','Input_updateGamepadState','META','_offsetX','fQGIR','EkdHR','enemies','textBaseline','exportAllTroopStrings','cKPVe','Game_Map_scrollUp','Cugxc','IkALW','dimColor1','AntiZoomPictures','Keyboard','F6key','PcaYk','ShowActorLevel','gainItem','_onKeyPress','Sprite_Picture_updateOrigin','ColorCTGauge2','createButtonAssistWindow','ActorHPColor','Game_Action_numRepeats','_windowLayer','updateLastTarget','Name','viewport','F10','stypeId','enemy','COMMA','_stored_mpGaugeColor2','buttonY','createWindowLayer','nextLevelExp','mute','ExportAllTroopText','iVQOu','_pointAnimationQueue','ntPVF','updateFauxAnimations','TGR','ALT','actor','_list','App','SUBTRACT','paramWidth','initCoreEngineScreenShake','bnnvP','AQJkA','refreshDimmerBitmap','oHYae','TRG','EditBgType','SnapshotOpacity','INEXPO','IconXParam8','Window_NameInput_cursorRight','_mapNameWindow','flush','_width','_destroyCanvas','isGamepadButtonPressed','animations','hHIRY','MAX_GL_TEXTURES','button','REC','skills','blockWidth','TPB\x20WAIT','charAt','filter','toLocaleString','Match','reserveNewGameCommonEvent','visible','azhbw','initButtonHidden','Game_Map_scrollLeft','process_VisuMZ_CoreEngine_Notetags','paramValueByName','ItemPadding','AMPERSAND','mainAreaHeightSideButtonLayout','_createInternalTextures','ParseArmorNotetags','Plus2','_targetOffsetX','AOBbR','processAlwaysEscape','SwitchToggleRange','isWpd','alphabetic','buttonAssistText%1','loadBitmap','currentExp','numberShowButton','jFaFc','Graphics_defaultStretchMode','createTroopNote','CustomParam','STRUCT','processHandling','_closing','yHbtR','ddnMW','VOLUME_UP','2583NYNjMT','format','ARRAYEVAL','bbfJi','ExportCurTroopText','INBACK','process_VisuMZ_CoreEngine_CustomParameters','_statusParamsWindow','_moveEasingType','object','ExtractStrFromList','RDoMy','Game_Picture_calcEasing','applyEasing','strokeRect','default','sellWindowRect','_rate','isWindowMaskingEnabled','buttonAssistKey4','initialize','ZLVRD','Scene_Shop_create','successRate','createBackground','doesNameContainBannedWords','_stored_hpGaugeColor1','paramPlus','_registerKeyInput','NScPi','itemBackColor2','IuIkV','paramBaseAboveLevel99','qZWow','RKaxZ','anchorCoreEasing','resetTextColor','KEEP','%1/','NUMPAD6','Scene_Map_initialize','_internalTextures','ycfFl','yzTWV','Znjzl','bind','setEnemyAction','ImprovedAccuracySystem','numActions','mhp','Window_Base_drawCharacter','FeBha','ShowButtons','dropItems','onKeyDownKeysF6F7','ItemRect','XwvHw','NoTileShadows','buttonAssistCancel','StatusMenu','isTriggered','POXuC','requiredWtypeId1','pressed','FUfyr','OPEN_PAREN','SwitchRandomizeOne','JoCAj','HHAjN','qlbGg','updatePositionCoreEngineShakeRand','createCustomBackgroundImages','requestMotion','KjXja','lineHeight','Rate','tpCostColor','width','horzJS','Window_Selectable_processCursorMove','_makeFontNameText','setupCustomRateCoreEngine','UkXgR','TitleCommandList','ShopMenu','inbounce','_pressed','blt','DxPrk','Window_NumberInput_start','mirror','Armor-%1-%2','XParamVocab5','hpColor','_statusEquipWindow','updateEffekseer','cos','PositionX','left','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','createBuffer','loadSystem','_screenX','gameTitle','scrollUp','_forcedBattleSys','mainAreaTop','EVA','Bitmap_fillRect','createEnemies','WIN_OEM_FJ_MASSHOU','MULTIPLY','playOnceParallelInterpreter','getCustomBackgroundSettings','CategoryRect','sv_enemies','〘Common\x20Event\x20%1:\x20%2〙\x20End','RrSWl','drawBackground','WNeiP','CZCTW','F14','BkYpc','tpGaugeColor2','ShowJS','paramchangeTextColor','AGI','IconXParam2','_duration','checkSmartEventCollision','_refreshBack','Game_Actor_levelUp','Scene_GameEnd_createBackground','AutoScrollLockY','Bitmap_strokeRect','Symbol','_digitGroupingEx','BgType','tUsIL','createTitleButtons','NUeSD','connected','EnableNameInput','Scene_Battle_createCancelButton','focus','pictureButtons','makeCoreEngineCommandList','X:\x20%1','gaugeHeight','updateCoreEasing','expParams','setupFont','loadTitle2','Rate2','child_process','createPointAnimation','jrsLC','FbJgP','setWindowPadding','UNDERSCORE','buttonAssistWindowSideRect','_slotWindow','VOLUME_MUTE','BTestItems','updateMain','FTB','getInputButtonString','FINAL','original','DECIMAL','Scene_Boot_updateDocumentTitle','\x5c}❪SHIFT❫\x5c{','IBONB','ZTjeV','eLGuo','scaleMode','markCoreEngineModified','XParameterFormula','WCrPy','_CoreEngineSettings','processCursorMoveModernControls','hZoOd','BkOKy','Scene_Map_updateMain','Scene_Battle_update','Scene_MenuBase_createCancelButton','Window_Selectable_drawBackgroundRect','setupCoreEngine','height','_coreEasing','WIN_ICO_00','createPointAnimationQueue','easingType','isAlive','Scene_Item_create','DimColor2','PDR','isBusy','setupRate','mTMRo','Scene_Map_updateScene','Window_StatusBase_drawActorLevel','_battlerName','tLkgy','([\x5c+\x5c-]\x5cd+)>','WoWIs','bgs','makeDocumentTitle','parse','ExportAllMapText','exp','SParameterFormula','ExtractStrFromTroop','_cancelButton','maxCols','IconSParam4','_storedMapText','Window_Selectable_itemRect','BannedWords','ScaleY','updateWaitMode','qrNJj','makeInputButtonString','fvkkp','iXFcn','CXLuB','drawRightArrow','HqsBl','ShowDevTools','processCursorMove','AutoStretch','innerHeight','text','dummyWindowRect','showDevTools','IconXParam0','cursorDown','KeyboardInput','updateOrigin','value','4pQryNw','windowPadding','eKXaZ','axRkO','_sideButtonLayout','ALWAYS','XnZMh','_pauseSignSprite','diUZj','deathColor','etypeId','pagedownShowButton','contents','end','SParamVocab2','traitsPi','cursorPagedown','PKCNT','ZERO','faces','CompQ','_anchor','center','paramRate','SmartEventCollisionPriority','cfqut','pow','bitmapWidth','axes','GET','Sprite_Button_initialize','omvAc','_lastX','drawActorNickname','ceil','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','_defaultStretchMode','restore','_movementWholeDuration','mpGaugeColor1','Scene_Options_create','WZMtm','UhTXi','KeyItemProtect','loadIconBitmap','isRightInputMode','_target','ctTgz','ExportStrFromAllTroops','maxItems','Wait','hpGaugeColor1','paramFlat','adjustSprite','isMaxLevel','showPicture','_forcedTroopView','_itemWindow','isTpb','buttonAssistKey5','startNormalGame','<%1\x20%2:[\x20]','buttonAssistKey%1','_origin','useDigitGroupingEx','kcvYN','setHandler','move','WMjPc','events','RepositionActors','IconSParam3','createMenuButton','_stored_tpGaugeColor2','_categoryWindow','_battleField','GlgBH','onerror','cursorRight','INOUTQUART','KeySHIFT','OptionsMenu','scaleSprite','Script\x20Call\x20Error','updateOpacity','cTVJK','ColorExpGauge2','cursorLeft','_centerCameraCheck','BFZEl','VisuMZ_2_BattleSystemSTB','_colorCache','YAtHY','loadGameImagesCoreEngine','IconXParam9','OgBJh','Linear','mUfUj','drawNewParam','loadMapData','padding','isLoopHorizontal','optionsWindowRect','menu','OpenSpeed','MAXMP','SlotBgType','_drawTextShadow','moveCancelButtonSideButtonLayout','vbrXI','updateOpen','sparamFlat2','getColorDataFromPluginParameters','HIT','targetX','Window_NameInput_processHandling','actorWindowRect','getPointAnimationLayer','ColorGaugeBack','createTextState','loadWindowskin','DummyRect','addWindow','hideButtonFromView','_pictureCoordinatesWindow','_targetX','Scene_Battle_createSpritesetFix','_targets','zoomScale','playCancel','ProfileBgType','_balloonQueue','nCUUY','eva','968590eINbOI','ColorMPGauge2','YPFUp','pictures','EISU','XParamVocab9','SParamVocab7','HtFEH','_tilemap','CEV','PreserveNumbers','Game_Interpreter_command105','Scene_Map_updateMainMultiply','paramRate1','ItemBgType','Window_StatusBase_drawActorSimpleStatus','GYSBg','slotWindowRect','processEscape','erasePicture','command357','sparamRateJS','ExportString','mainCommandWidth','cGRFd','Jctcu','targetScaleX','F7key','DefaultMode','OkText','Sprite_AnimationMV_processTimingData','onMoveEnd','playEscape','Duration','changeTextColor','EXR','toLowerCase','GoldFontSize','XParamVocab7','filters','endAction','titles1','FZEtF','eQumW','getInputMultiButtonStrings','STENCIL_BUFFER_BIT','MultiKeyFmt','ShortcutScripts','enableDigitGrouping','F15','Troop%1','_targetScaleY','sUCtb','onInputBannedWords','sparamRate','WIN_OEM_ENLW','Window_EquipItem_isEnabled','URL','_targetOffsetY','tpGaugeColor1','buttonAssistOffset2','NUMPAD2','maxBattleMembers','_destroyInternalTextures','pDxty','gradientFillRect','NUM','Skill-%1-%2','bgmVolume','Power','CustomParamNames','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','_index','ScreenShake','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','BottomButtons','Scene_MenuBase_createBackground','zrWis','processCursorHomeEndTrigger','_statusWindow','helpWindowRect','1889303ZwhhPG','TextCodeClassNames','_stored_hpGaugeColor2','onDatabaseLoaded','BattleSystem','XParamVocab1','CancelText','toFixed','isKeyItem','F20','Game_Party_consumeItem','outlineColor','WHsdb','SVfzq','VisuMZ_2_BattleSystemOTB','zlOWC','setActorHome','ExtJS','oiJPQ','isDying','mmp','ywBea','NUMPAD1','Scene_Map_update','Game_Map_scrollDown','INOUTQUINT','NUMPAD4','updateScene','mainFontSize','targetObjects','Window_NumberInput_processDigitChange','_backgroundSprite','drawCircle','Window_Gold_refresh','_pointAnimationSprites','Sprite_Gauge_currentValue','FadeSpeed','SubfolderParse','expRate','setSkill','valueOutlineWidth','map','currentValue','WIN_OEM_AUTO','EXECUTE','fillStyle','bgsVolume','Afhhb','update','Bitmap_initialize','setHome','ENTER_SPECIAL','isActiveTpb','_menuButton','_spriteset','coreEngineRepositionEnemies','uJSYu','filterArea','overrideMimeType','CCEtT','WIN_OEM_FINISH','centerY','_skillTypeWindow','_scaleX','EnableMasking','NEAREST','MEV','setupNewGame','right','Item-%1-%2','renderNoMask','Scene_Battle_createSpriteset','Manual','SellRect','maxTurns','targetY','bGZFe','FDQRf','call','terms','tilesets','skillTypeWindowRect','INOUTBOUNCE','Game_Interpreter_updateWaitMode','Bitmap_gradientFillRect','gXTZD','style','itemHitImprovedAccuracy','children','SkillTypeRect','CRSEL','TPB\x20ACTIVE','_playtestF7Looping','sqrt','$dataMap','UpdatePictureCoordinates','INQUART','updateMove','Pixelated','Window_ShopSell_isEnabled','Window','6177690PQxRUf','STB','_stored_ctGaugeColor1','processBack','_commandWindow','encounterStepsMinimum','1.4.4','stretch','DataManager_setupNewGame','worldTransform','QKiuH','Unnamed','command122','_refreshArrows','Scene_MenuBase_helpAreaTop','Upper\x20Left','IconSParam1','nah','lmQHL','exit','Game_Interpreter_command355','enable','LevelUpFullMp','oAAxj','buttonAssistSwitch','VisuMZ_2_BattleSystemPTB','ypWRZ','setLastGamepadUsed','sLQan','_stored_crisisColor','_onError','mzFry','Window_Base_drawFace','initialBattleSystem','list','Input_shouldPreventDefault','DummyBgType','useDigitGrouping','Spriteset_Base_initialize','isPointAnimationPlaying','keyRepeatWait','ParseWeaponNotetags','xMVCB','Kryfg','_lastGamepad','outlineColorDmg','consumeItem','%2%1%3','ColorPowerDown','Window_NameInput_cursorPageup','animationNextDelay','measureTextWidthNoRounding','_sellWindow','drawText','processTouch','cancel','isInputting','setAnchor','OmDMH','adjustPictureAntiZoom','up2','initMembersCoreEngine','MODECHANGE','IconIndex','isRepeated','SHIFT','MainMenu','itemHit','krnGn','EWziR','resetFontSettings','vYkvL','KANA','GREATER_THAN','maxLvGaugeColor2','processPointAnimationRequests','applyForcedGameTroopSettingsCoreEngine','isPlaying','aFcYn','ALTGR','CTRL','_editWindow','DigitGroupingExText','_updateGamepadState','CustomParamType','catchLoadError','gainGold','buttonAssistWindowButtonRect','Game_Temp_initialize','uiAreaHeight','Input_pollGamepads','Sprite_destroy','Scene_Map_createSpriteset','DebugConsoleLastControllerID','pqNjM','paramBase','([\x5c+\x5c-]\x5cd+)([%％])>','_centerElement','_hovered','buttonAssistKey3','_logWindow','_targetOpacity','WindowLayer_render','BfMOF','ONE','drawIconBySize','Window_Selectable_cursorDown','hmUbt','darwin','YWZkW','Settings','AnimationMirrorOffset','_opening','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','QPlnT','VItmg','XParamVocab4','ActorRect','textSizeEx','TKcAR','text%1','commandWindowRect','exportAllMapStrings','PictureID','INOUTEXPO','lstSZ','initCoreEasing','BlurFilter','code','XGOTS','XIIIF','isOpen','SParamVocab3','ColorNormal','damageColor','VariableEvalReference','top','PHA','toString','offsetX','setBackgroundType','sZNAA','resetBattleSystem','HASH','isForFriend','ZXYSh','updatePlayTestF7','setMoveEasingType','createPageButtons','iconWidth','Game_Event_isCollidedWithEvents','clipboard','levelUp','removeChild','Bitmap_measureTextWidth','OXDri','canAttack','_targetAnchor','PLAY','makeAutoBattleActions','createCommandWindow','IconSParam5','cursorUp','DefaultStyle','Scene_Map_createSpritesetFix','createSpriteset','isExpGaugeDrawn','hpGaugeColor2','Game_Action_itemHit','FnVaW','oPocH','ngvWp','DisplayLockX','nw.gui','refresh','frBop','CustomParamAbb','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','performMiss','image-rendering','_pollGamepads','StatusRect','IemHN','SParamVocab6','EQUAL','numRepeats','gubuc','playLoad','CONVERT','lTZCh','registerCommand','drawAllParams','buttonAreaHeight','maxLvGaugeColor1','pagedown','VariableJsBlock','tBmwl','skipBranch','meVolume','_cacheScaleX','cursorPageup','Game_Character_processMoveCommand','SystemSetBattleSystem','AccuracyBoost','runCombinedScrollingTextAsCode','YKReC','INCUBIC','ColSpacing','translucentOpacity','removeOnceParallelInterpreter','_pageupButton','_coreEasingType','IKHAY','Sprite_Button_updateOpacity','processFauxAnimationRequests','isMaskingEnabled','SkillTypeBgType','Exported_Script_%1.txt','RbpAc','INSERT','moveMenuButtonSideButtonLayout','initMembers','zAlwR','UrBQT','hMBXt','_stored_deathColor','optSideView','FunctionName','editWindowRect','targetOpacity','TauYn','concat','setClickHandler','img/%1/','ItemHeight','OHWkV','mapId','INOUTELASTIC','makeFontSmaller','windowOpacity','HMiQE','drawCurrentParam','TRAIT_PARAM','Spriteset_Battle_createEnemies','_onLoad','Bitmap_resize','onKeyDown','ParseItemNotetags','trim','_stored_powerDownColor','drawTextEx','_context','updateKeyText','_number','MAT','_tempActor','setSize','DigitGroupingStandardText','_stored_tpGaugeColor1','sceneTerminationClearEffects','tileHeight','itemSuccessRate','Mirror','OUTQUART','CnhnV','playTestF6','Scene_Boot_onDatabaseLoaded','PGUP','catchNormalError','isHandled','INCIRC','createCancelButton','uGXWY','startAnimation','LSbxN','uBkUS','F17','%1%2','_data','Scene_Menu_create','DigitGroupingGaugeSprites','IconParam7','MapOnceParallel','YULeX','crisisColor','Chance','_pagedownButton','_upArrowSprite','ButtonFadeSpeed','updatePadding','PictureEasingType','sv_actors','_gamepadWait','drawItem','MWxEW','_mainSprite','reservePlayTestNewGameCommonEvent','_paramPlus','Scene_Base_create','LINEAR','Game_Actor_paramBase','IDs','END','getControllerInputButtonMatch','rightArrowWidth','Input_update','updateAnchor','isItem','helpAreaTopSideButtonLayout','BgFilename2','Enemy-%1-%2','Game_Picture_show','battlebacks1','process_VisuMZ_CoreEngine_jsQuickFunctions','isArrowPressed','_mp','tSmsU','name','abs','CrisisRate','escape','vertJS','ColorCrisis','nickname','VisuMZ_1_BattleCore','Input_clear','WIN_OEM_WSCTRL','RsXNl','CoreEngine','ypUuP','KXDCr','INELASTIC','storeMapData','onXhrError','Window_Selectable_processTouch','displayY','getGamepads','startMove','Scene_Map_createSpriteset_detach','DATABASE','makeCommandList','goto','PRINTSCREEN','MAXHP','replace','StatusParamsBgType','removePointAnimation','ETB','bgm','_offsetY','CommonEventID','onClick','buttonAssistOffset4','ValueJS','Flat','Actor','buttonAssistOffset1','EMRxn','getCoreEngineScreenShakeStyle','paramPlusJS','URhbp','displayName','status','process_VisuMZ_CoreEngine_ControllerButtons','isOptionValid','_startLoading','isEnemy','_drawTextBody','addChild','XQIOu','setupCoreEasing','autoRemovalTiming','playCursorSound','helpAreaTop','OS_KEY','MgXiZ','Flat2','GoldMax','ShowItemBackground','xGDZf','ZOOM','calcEasing','gPCim','tpGFw','charCode','_movementDuration','Game_Event_start','fQwWM','Location','isSceneMap','Bitmap_blt','OnLoadJS','EndingID','Sprite_Gauge_gaugeRate','buttonAssistOk','sparam','_stored_mpCostColor','isPhysical','【%1】\x0a','down','HELP','QTZKm','IconSParam6','dimColor2','subjectHitRate','MINUS','SceneManager_onKeyDown','INSINE','Spriteset_Base_destroy','paramName','XParamVocab0','canEquip','KbPYm','DOWN','isSpecialCode','_lastOrigin','Sprite_Actor_setActorHome','categoryWindowRect','WASD','vrDdt','xparamRate','_listWindow','ColorMaxLvGauge2','join','dUGNv','pixelated','EREOF','BYuuy','getLastGamepadUsed','CNT','colSpacing','measureTextWidth','setMute','_dimmerSprite','buttonAssistWindowRect','mainAreaTopSideButtonLayout','keyMapper','Abbreviation','zIjcm','CreateBattleSystemID','setCommonEvent','fqtsI','updatePositionCoreEngineShakeHorz','TRwoa','buttonAssistOffset3','save','26657334hRISDD','_stored_powerUpColor','ListBgType','mcJoc','RevertPreserveNumbers','Speed','removeFauxAnimation','aDzbP','Spriteset_Base_update','_stored_maxLvGaugeColor1','INOUTCIRC','_helpWindow','RaxCA','kBdfD','VlNfq','Enable','addOnceParallelInterpreter','backspace','qOgtk','type','onInputOk','drawTextTopAligned','processKeyboardDelete','stencilOp','ParseSkillNotetags','createDimmerSprite','GoldBgType','buttons','scale','myASr','BasicParameterFormula','startAutoNewGame','ActorTPColor','PRESERVCONVERSION(%1)','LckcV','ColorCTGauge1','setBackgroundOpacity','Game_Action_updateLastTarget','esJSR','createCustomParameter','sMZXG','pageup','titles2','_backSprite','statusWindowRect','IconSParam9','isItemStyle','profileWindowRect','jplws','endBattlerActions','ColorTPGauge1','_commandList','INBOUNCE','_shouldPreventDefault','Spriteset_Base_isAnimationPlaying','WIN_OEM_COPY','piAJZ','LoadError','rcPhk','bitmapHeight','index','item','traitObjects','1425EJdAhr','ColorMPCost','xScrollLinkedOffset','originalJS','LevelUpFullHp','iconHeight','Game_Actor_changeClass','CallHandlerJS','Color','PA1','STR','yScrollLinkedOffset','showPointAnimations','OqKjQ','SceneManager_initialize','TTLtq','updateBackOpacity','IconXParam1','QKSXe','drawFace','sparamPlus1','MDR','retrievePointAnimation','STnIr','characters','VisuMZ_2_BattleSystemETB','loadTitle1','apply','Gold','ItemMenu','_stored_systemColor','LQmFs','getBattleSystem','lJcUo','_bitmap','pkdyB','ColorTPGauge2','length','Game_Interpreter_command122','processKeyboardEnd','boxWidth','remove','gaugeBackColor','catchException','StatusParamsRect','PixelateImageRendering','Page','processDigitChange','Scene_MenuBase_mainAreaHeight','Map%1.json','_centerElementCoreEngine','DEF','constructor','members','_image','_coreEngineShakeStyle','F12','currentLevelExp','TimeProgress','Graphics_printError','_backSprite2','allowShiftScrolling','clearRect','test','_pictureName','show','seVolume','sin','measureText','prototype','_updateFilterArea','sparamRate2','getCombinedScrollingText','Plus1','min','_backgroundFilter','lXwqm','RepositionEnemies','updatePictureAntiZoom','GRD','slice','Rate1','isNextScene','ctrl','nvAff','deflate','FDR','defineProperty','hwrMj','down2','Window_NameInput_cursorDown','SideView','framebuffer','ugFTZ','responseText','asin','Window_NameInput_refresh','number','_opacity','BuyRect','_action','requestFauxAnimation','clearZoom','_stored_expGaugeColor1','PRINT','stencilFunc','DOLLAR','_digitGrouping','GoldChange','HelpRect','Graphics_centerElement','SaSfa','euhnq','SystemLoadImages','initCoreEngine','windowRect','Window_Base_drawIcon','F13','parseForcedGameTroopSettingsCoreEngine','isPressed','ZmObA','26264RKsyRa','EXSEL','EquipMenu','JjRWp','font','sparamRate1','itemPadding','setViewportCoreEngineFix','updatePointAnimations','Game_Picture_x','context','CONTEXT_MENU','_url','OQuvf','oPGdv','BHXHr','WIN_OEM_PA3','FoumI','DTB','enableDigitGroupingEx','GroupDigits','%1\x0a','_pictureCoordinatesMode','XParamVocab8','_inputString','HoZVq','SlotRect','isCursorMovable','SParamVocab9','drawActorExpGauge','nSmtx','SEMICOLON','active','F22','CRI','AutoScrollLockX','dTcxt','key%1','wait','cpRxV','_height','_isWindow','Game_Picture_y','maxGold','levelUpRecovery','_screenY','_baseSprite','ControllerMatches','updateData','_active','gaugeLineHeight','Version','acoYW','push','BattleManager_processEscape','playOk','paramX','TAB','ParseStateNotetags','aPcnV','_onKeyDown','VisuMZ_2_BattleSystemFTB','F16','isSideButtonLayout','backgroundBitmap','VOLUME_DOWN','Window_NameInput_cursorPagedown','kWVJB','createFauxAnimationSprite','contains','drawParamName','src','RegExp','randomJS','xparamRate2','keyboard','_lastY','ImFqP','\x0a\x0a\x0a\x0a\x0a','IconSParam7','mqvBB','LvExpGauge','DPcld','itemBackColor1','reduce','ColorHPGauge1','GiKOk','mdnGL','WIN_OEM_ATTN','JGJiN','match','subject','return\x200','repositionCancelButtonSideButtonLayout','UlfMw','IconParam1','qXjjT','NUMPAD5','MDF','Scene_Skill_create','F18','Type','areButtonsHidden','stop','movePageButtonSideButtonLayout','Game_BattlerBase_initMembers','playCursor','buttonAssistText5','ColorMPGauge1','_lastPluginCommandInterpreter','buyWindowRect','〘Common\x20Event\x20%1:\x20%2〙\x20Start','paramRate2','CodeJS','rialN','_hp','_realScale','DrawItemBackgroundJS','LoadMenu','buttonAssistText1','valueOutlineColor','ONE_MINUS_SRC_ALPHA','IconParam5','sparamFlatBonus','sparamPlusJS','reserveCommonEvent','ColorExpGauge1','Padding','atbActive','KeyUnlisted','duration','updateOnceParallelInterpreters','Param','destroyed','REPLACE','commandWindowRows','_changingClass','create','drawGauge','Window_Base_drawText','background','ARRAYSTR','AnimationID','Sprite_Animation_processSoundTimings','F21','LPxrs','TCR','eTdYE','playBuzzer','vDWTj','drawGameSubtitle','RightMenus','resize','IconSet','updateMainMultiply','QoL','rLFAK','%1〘Choice\x20%2〙\x20%3%1','isBottomHelpMode','isFauxAnimationPlaying','OutlineColor','setColorTone','IconXParam7','scrollLeft','ParamArrow','Spriteset_Base_updatePosition','isInstanceOfSceneMap','StatusEquipRect','OptionsBgType','updatePositionCoreEngineShakeVert','ARRAYJSON','PgXsc','skillId','pxzrU','ForceNoPlayTest','updateMotion','SaveMenu','Game_Picture_initBasic','setCoreEngineUpdateWindowBg','LineHeight','_animationQueue','pointY','imageSmoothingEnabled','RepositionEnemies130','ItemStyle','onload','BoxMargin','GFGhm','random','ceiwV','BACK_SLASH','Title','Scene_MenuBase_createPageButtons','BattleManager_update','Scene_Map_createMenuButton','baseId','RPGMAKER_VERSION','wOtYC','lDoEm','Window_Base_createTextState','XParamVocab3','RjmlW','scrollDown','initBasic','KBUbT','process_VisuMZ_CoreEngine_Settings','systemColor','BlendMode','mpGaugeColor2','Ktact','textHeight','normalColor','drawGameVersion','setSideView','setAction','buttonAssistText4','fIiMP','_maxDigits','_drawTextOutline','refreshWithTextCodeSupport','_hideTileShadows','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','deselect','TcxHc','setFrame','isCollidedWithEvents','jsonToZip','LJoIz','NewGameBoot','outbounce','ButtonAssist','Window_NameInput_cursorLeft','jBZbD','pages','smallParamFontSize','normal','font-smooth','PGDN','ExtractStrFromMap','FontWidthFix','title','xparam','_shakeDuration','_mode','Game_Picture_updateMove','string','scrollRight','makeActionList','makeFontBigger','SParamVocab1','canUse','getLastPluginCommandInterpreter','_stored_maxLvGaugeColor2','_addShadow','BattleManager_checkSubstitute','log','0.00','NumberBgType','openURL','drawGoldItemStyle','BaseTexture','HRG','INQUINT','keyCode','DiFix','kJcBQ','setEasingType','shake','isSmartEventCollisionOn','en-US','isGamepadTriggered','_clickHandler','dLTXF','#%1','processMoveCommand','3538QmrXfx','》Comment《\x0a%1\x0a','anchor','ADD','euFPD','boxHeight','QUOTE','_pictureContainer','xparamFlatJS','Scene_Name_create','isGamepadAxisMoved','maqwR','PaJrf','StartID','CommandWidth','IconSParam8','OUTELASTIC','Total','_mirror','DimColor1','contentsBack','isSceneBattle','ParamName','paramFlatBonus','WIN_OEM_RESET','EncounterRateMinimum','helpAreaHeight','Control\x20Variables\x20Script\x20Error','tileWidth','processTouchModernControls','PAUSE','goldWindowRect','onButtonImageLoad','IconSParam0','_dummyWindow','_shakePower','StatusBgType','Game_Troop_setup','Game_System_initialize','TextManager_param','Smooth','Scene_MenuBase_mainAreaTop','EBjiD','updateShadow','setBattleSystem','terminate','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','vcnZM','〘Show\x20Text〙\x0a','targetScaleY','substring','nqMyt','setupButtonImage','NUMPAD9','Game_Interpreter_PluginCommand','_targetY','drawParamText','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','lvyYS','Untitled','createKeyJS','data/','IconParam6','DigitGroupingDamageSprites','indexOf','_cacheScaleY','emCeh','_hideButtons','QUESTION_MARK','MAX_SAFE_INTEGER','_buyWindow','get','cancelShowButton','alignBottom','goTVl','_fauxAnimationQueue','quit','BpYza','dashToggle','_goldWindow','ActorBgType','rpCQw','WIN_OEM_BACKTAB','aplvk','Bitmap_clearRect','IVLUl','WIN_OEM_PA1','process_VisuMZ_CoreEngine_RegExp','nrhCZ','ParamChange','send','LuWkG','OJBRN','DELETE','_onceParallelInterpreters','_targetScaleX','ExportStrFromAllMaps','ymFvn','destroyCoreEngineMarkedBitmaps','SwggO','OutlineColorGauge','altKey','ZHVay','animationBaseDelay','loadSystemImages','itemEva','addEventListener','VisuMZ_2_BattleSystemBTB','FUNC','onLoad','OUTBACK','isClosed','CustomParamIcons','TextJS','Bitmap_drawText','isOpenAndActive','setActionState','OutlineColorDmg','_blank','tgtek','RequireFocus','LESS_THAN','ConvertParams','floor','Sprite_AnimationMV_updatePosition','wRJtA','ApplyEasing','QwertyLayout','makeEncounterCount','fontSize','CLOSE_PAREN','touchUI','gyvsQ','buttonAssistKey2','fillRect','ParseActorNotetags','_optionsWindow','sparamPlus','Plus','shift','Scene_Status_create','FontSize','buttonAssistText3','round','updateDashToggle','_fauxAnimationSprites','missed','guardSkillId','ASTERISK','ArLQz','drawIcon','ARRAYFUNC','SHMqS','gold','CategoryBgType','Game_Map_scrollRight','FontShadows','BRvHP','_buttonAssistWindow','SceneManager_exit','batch','params','Game_Picture_move','setViewport','paramY','ShchJ','snapForBackground','targetPosition','Window_Base_update','JFXQk','numberWindowRect','OTB','split','backOpacity','moveRelativeToResolutionChange','isEnabled','setTargetAnchor','xparamPlus1','_stored_mpGaugeColor1','VKXcb','108aeUHdf','isMenuButtonAssistEnabled','defaultInputMode','ParseClassNotetags','LUK','bitmap','BACKSPACE','FYbUH','statusEquipWindowRect','_customModified','ENTER','XLVyO','Origin','learnings','targetSpritePosition','ZtFhh','Scene_Unlisted','RowSpacing','clearForcedGameTroopSettingsCoreEngine','SLASH','GetParamIcon','_actor','xparamFlatBonus','result','F11','clamp','INOUTQUAD','itemWindowRect','max','DETACH_PICTURE_CONTAINER','Game_Interpreter_command111','RgImc','OUTQUAD','AllTroops','NameMenu','makeDeepCopy','OPEN_BRACKET','setActorHomeRepositioned','listWindowRect','WIN_OEM_FJ_TOUROKU','_stored_expGaugeColor2','applyCoreEasing','SmeDi','QyfaZ','padZero','addCommand','DisplayedParams','FIeRu','initVisuMZCoreEngine','ScreenResolution','destroy','getKeyboardInputButtonString','_startDecrypting','SideButtons','hide','version','SceneManager_isGameActive','createDigits','processKeyboardDigitChange','mainAreaHeight','qYjFu','createJsQuickFunction','waiting','drawValue','SzXvl','BackOpacity','ghWYX','F23','titleCommandWindow','GoldOverlap','blendFunc','ItemBackColor2','(\x5cd+)([%％])>','updatePositionCoreEngineShakeOriginal','createFauxAnimation','currentClass','opacity','Graphics','buttonAssistOffset5','layoutSettings','xdg-open','buttonAssistKey1','repositionEnemiesByResolution','vXocW','retreat','lqzIj','_repositioned','hit','ExtDisplayedParams','adjustBoxSize','isEventRunning','VisuMZ_2_BattleSystemCTB','helpAreaBottom','_profileWindow','createChildSprite','afmtP','drawSegment','maxTp','mvUuy','processKeyboardHandling','MenuLayout','_actorWindow','vertical','OUTCUBIC','nPQjp','RIGHT','PictureShowIcon','PictureEraseRange','level','PIPE','INOUTCUBIC','isMagical','_displayY','targetContentsOpacity','start','outlineColorGauge','none','loadPicture','QHeFv','Scene_Base_createWindowLayer','EQUALS','_cache','fadeSpeed','battlerHue','VisuMZ_1_OptionsCore','select','isNwjs','OLYBl','areButtonsOutsideMainUI','CommandList','SBFMA','sCjks','command111','Show\x20Scrolling\x20Text\x20Script\x20Error','rgba(0,\x200,\x200,\x200.7)','randomInt','centerSprite','SkillMenu','getBackgroundOpacity','vNotU','createPointAnimationTargets','encounterStep','_muteSound','Bitmap_drawTextOutline','parameters','mev','includes','setValue','rGMMH','ImgLoad','setSideButtonLayout','WIN_ICO_CLEAR','isUseModernControls','paramFlatJS','GtXwF','powXm','qvyRO','Scene_Title_drawGameTitle','HelpBgType','_viewportSize','toUpperCase','xparamPlusJS','beaRG','SwitchRandomizeRange','Window_NameInput_processTouch','home','setup'];_0x192d=function(){return _0x4a25ee;};return _0x192d();}var label=_0x5eb334(0x541),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5eb334(0x1a9)](function(_0x2e999b){const _0x5ac360=_0x5eb334;return _0x2e999b[_0x5ac360(0x563)]&&_0x2e999b[_0x5ac360(0x991)][_0x5ac360(0x8c8)]('['+label+']');})[0x0];VisuMZ[label][_0x5eb334(0x467)]=VisuMZ[label][_0x5eb334(0x467)]||{},VisuMZ[_0x5eb334(0x7fc)]=function(_0x205b3a,_0x6cc3ea){const _0x159bb8=_0x5eb334;for(const _0x404f8f in _0x6cc3ea){if(_0x404f8f[_0x159bb8(0x6c9)](/(.*):(.*)/i)){const _0x2a2920=String(RegExp['$1']),_0x453f0e=String(RegExp['$2'])[_0x159bb8(0x8d6)]()['trim']();let _0xa7fa6d,_0xb5201d,_0x34864f;switch(_0x453f0e){case _0x159bb8(0x385):_0xa7fa6d=_0x6cc3ea[_0x404f8f]!==''?Number(_0x6cc3ea[_0x404f8f]):0x0;break;case'ARRAYNUM':_0xb5201d=_0x6cc3ea[_0x404f8f]!==''?JSON[_0x159bb8(0x29d)](_0x6cc3ea[_0x404f8f]):[],_0xa7fa6d=_0xb5201d[_0x159bb8(0x3bd)](_0x3e199b=>Number(_0x3e199b));break;case'EVAL':_0xa7fa6d=_0x6cc3ea[_0x404f8f]!==''?eval(_0x6cc3ea[_0x404f8f]):null;break;case _0x159bb8(0x1cf):_0xb5201d=_0x6cc3ea[_0x404f8f]!==''?JSON[_0x159bb8(0x29d)](_0x6cc3ea[_0x404f8f]):[],_0xa7fa6d=_0xb5201d['map'](_0x3c778d=>eval(_0x3c778d));break;case _0x159bb8(0x99c):_0xa7fa6d=_0x6cc3ea[_0x404f8f]!==''?JSON[_0x159bb8(0x29d)](_0x6cc3ea[_0x404f8f]):'';break;case _0x159bb8(0x719):_0xb5201d=_0x6cc3ea[_0x404f8f]!==''?JSON[_0x159bb8(0x29d)](_0x6cc3ea[_0x404f8f]):[],_0xa7fa6d=_0xb5201d['map'](_0x4bfdad=>JSON[_0x159bb8(0x29d)](_0x4bfdad));break;case _0x159bb8(0x7ee):_0xa7fa6d=_0x6cc3ea[_0x404f8f]!==''?new Function(JSON['parse'](_0x6cc3ea[_0x404f8f])):new Function(_0x159bb8(0x6cb));break;case _0x159bb8(0x819):_0xb5201d=_0x6cc3ea[_0x404f8f]!==''?JSON['parse'](_0x6cc3ea[_0x404f8f]):[],_0xa7fa6d=_0xb5201d[_0x159bb8(0x3bd)](_0x3294a5=>new Function(JSON[_0x159bb8(0x29d)](_0x3294a5)));break;case _0x159bb8(0x600):_0xa7fa6d=_0x6cc3ea[_0x404f8f]!==''?String(_0x6cc3ea[_0x404f8f]):'';break;case _0x159bb8(0x6fc):_0xb5201d=_0x6cc3ea[_0x404f8f]!==''?JSON[_0x159bb8(0x29d)](_0x6cc3ea[_0x404f8f]):[],_0xa7fa6d=_0xb5201d[_0x159bb8(0x3bd)](_0x8124e3=>String(_0x8124e3));break;case _0x159bb8(0x1c7):_0x34864f=_0x6cc3ea[_0x404f8f]!==''?JSON[_0x159bb8(0x29d)](_0x6cc3ea[_0x404f8f]):{},_0x205b3a[_0x2a2920]={},VisuMZ[_0x159bb8(0x7fc)](_0x205b3a[_0x2a2920],_0x34864f);continue;case'ARRAYSTRUCT':_0xb5201d=_0x6cc3ea[_0x404f8f]!==''?JSON[_0x159bb8(0x29d)](_0x6cc3ea[_0x404f8f]):[],_0xa7fa6d=_0xb5201d[_0x159bb8(0x3bd)](_0xb1aaf4=>VisuMZ['ConvertParams']({},JSON[_0x159bb8(0x29d)](_0xb1aaf4)));break;default:continue;}_0x205b3a[_0x2a2920]=_0xa7fa6d;}}return _0x205b3a;},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x821)]=SceneManager[_0x5eb334(0x40c)],SceneManager['exit']=function(){const _0x4d2717=_0x5eb334;VisuMZ['CoreEngine'][_0x4d2717(0x821)][_0x4d2717(0x3e2)](this);if(Utils[_0x4d2717(0x733)]>='1.4.4'){if(typeof nw==='object')nw[_0x4d2717(0x18d)][_0x4d2717(0x7ce)]();}},(_0x53cc77=>{const _0x4139ab=_0x5eb334,_0x1cdda5=_0x53cc77[_0x4139ab(0x536)];for(const _0x3a239b of dependencies){if(!Imported[_0x3a239b]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x4139ab(0x1ce)](_0x1cdda5,_0x3a239b)),SceneManager[_0x4139ab(0x40c)]();break;}}const _0x23606f=_0x53cc77[_0x4139ab(0x991)];if(_0x23606f[_0x4139ab(0x6c9)](/\[Version[ ](.*?)\]/i)){if('vcBZJ'===_0x4139ab(0x4a3))this[_0x4139ab(0x636)][_0x4139ab(0x6c9)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x4139ab(0x2e9)](_0x4a0a03(_0x162252['$1'])):_0x2e5cca[_0x4139ab(0x541)]['Sprite_Picture_loadBitmap']['call'](this);else{const _0x3b9db9=Number(RegExp['$1']);_0x3b9db9!==VisuMZ[label][_0x4139ab(0x86d)]&&(alert(_0x4139ab(0x230)[_0x4139ab(0x1ce)](_0x1cdda5,_0x3b9db9)),SceneManager[_0x4139ab(0x40c)]());}}if(_0x23606f[_0x4139ab(0x6c9)](/\[Tier[ ](\d+)\]/i)){if('DcoCU'===_0x4139ab(0x734))_0x3fbfb4['scaleMode']=_0x2fb249['SCALE_MODES'][_0x4139ab(0x3d5)];else{const _0x14459d=Number(RegExp['$1']);if(_0x14459d<tier){if(_0x4139ab(0x4d3)==='DBtBV'){let _0x5374e5=_0x346260[_0x4139ab(0x541)][_0x4139ab(0x3b7)][_0x4139ab(0x3e2)](this);return _0x5374e5;}else alert(_0x4139ab(0x7bb)[_0x4139ab(0x1ce)](_0x1cdda5,_0x14459d,tier)),SceneManager[_0x4139ab(0x40c)]();}else tier=Math[_0x4139ab(0x852)](_0x14459d,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x4139ab(0x467)],_0x53cc77[_0x4139ab(0x8c6)]);})(pluginData),((()=>{const _0x44851e=_0x5eb334;if(VisuMZ[_0x44851e(0x541)][_0x44851e(0x467)][_0x44851e(0x70a)][_0x44851e(0x3b9)]??!![])for(const _0x51ddb1 in $plugins){if(_0x44851e(0x51f)!==_0x44851e(0x138)){const _0x26e85c=$plugins[_0x51ddb1];if(_0x26e85c[_0x44851e(0x536)][_0x44851e(0x6c9)](/(.*)\/(.*)/i)){if(_0x44851e(0x7ac)==='EBjiD')_0x26e85c[_0x44851e(0x536)]=String(RegExp['$2'][_0x44851e(0x4f1)]());else return _0x9ac773[_0x44851e(0x541)][_0x44851e(0x467)][_0x44851e(0x3f8)][_0x44851e(0x722)];}}else this[_0x44851e(0x223)]||this[_0x44851e(0x45b)]?this[_0x44851e(0x882)]=0xff:(this['opacity']+=this[_0x44851e(0x1ad)]?this[_0x44851e(0x8b0)]():-0x1*this[_0x44851e(0x8b0)](),this[_0x44851e(0x882)]=_0x2eb014[_0x44851e(0x640)](0xc0,this[_0x44851e(0x882)]));}})()),PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],'AnimationPoint',_0x1170d8=>{const _0x7904e6=_0x5eb334;if(!SceneManager[_0x7904e6(0x984)])return;if(!SceneManager[_0x7904e6(0x984)][_0x7904e6(0x3ca)])return;VisuMZ['ConvertParams'](_0x1170d8,_0x1170d8);const _0x210731=Math[_0x7904e6(0x811)](_0x1170d8['pointX']),_0xc8d584=Math[_0x7904e6(0x811)](_0x1170d8[_0x7904e6(0x724)]);$gameTemp[_0x7904e6(0x152)](_0x210731,_0xc8d584,_0x1170d8[_0x7904e6(0x6fd)],_0x1170d8[_0x7904e6(0x4ff)],_0x1170d8['Mute']);}),PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],_0x5eb334(0x456),_0x2d477e=>{const _0x4da883=_0x5eb334;if(!$gameTemp[_0x4da883(0x96e)]())return;const _0x5a63be=Input[_0x4da883(0x98c)]();if(navigator[_0x4da883(0x490)]){if('CompQ'===_0x4da883(0x2d1))navigator[_0x4da883(0x490)][_0x4da883(0x9b9)](_0x5a63be);else return _0x364eb8[_0x4da883(0x885)][_0x4da883(0x689)][_0x4da883(0x3e2)](this);}}),PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],_0x5eb334(0x29e),_0x3b2d94=>{const _0x20b950=_0x5eb334;if(!$gameTemp[_0x20b950(0x96e)]())return;if(!Utils[_0x20b950(0x8b4)]())return;SceneManager[_0x20b950(0x984)][_0x20b950(0x6a0)]=![],VisuMZ[_0x20b950(0x541)][_0x20b950(0x7e2)]();}),PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],_0x5eb334(0x184),_0x4e459f=>{const _0x442d9d=_0x5eb334;if(!$gameTemp[_0x442d9d(0x96e)]())return;if(!Utils[_0x442d9d(0x8b4)]())return;SceneManager[_0x442d9d(0x984)]['_active']=![],VisuMZ[_0x442d9d(0x541)][_0x442d9d(0x2ed)]();}),PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],_0x5eb334(0x9b7),_0x201134=>{const _0x3f9a85=_0x5eb334;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x3f9a85(0x8b4)]())return;if(!$gameMap)return;if($gameMap[_0x3f9a85(0x4e5)]()<=0x0)return;VisuMZ[_0x3f9a85(0x7fc)](_0x201134,_0x201134);const _0x48c399=_0x3f9a85(0x9ab)[_0x3f9a85(0x1ce)]($gameMap['mapId']()[_0x3f9a85(0x862)](0x3)),_0x221a7c=VisuMZ[_0x3f9a85(0x541)][_0x3f9a85(0x75d)]($gameMap[_0x3f9a85(0x4e5)]());VisuMZ['CoreEngine'][_0x3f9a85(0x359)](_0x221a7c,_0x48c399,!![]);}),PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],_0x5eb334(0x1d1),_0x2e1381=>{const _0x6d878a=_0x5eb334;if(!$gameTemp[_0x6d878a(0x96e)]())return;if(!Utils[_0x6d878a(0x8b4)]())return;if(!$gameParty['inBattle']())return;VisuMZ[_0x6d878a(0x7fc)](_0x2e1381,_0x2e1381);const _0x368502=_0x6d878a(0x375)['format']($gameTroop[_0x6d878a(0x93f)][_0x6d878a(0x862)](0x4)),_0xb0d6df=VisuMZ[_0x6d878a(0x541)][_0x6d878a(0x2a1)]($gameTroop[_0x6d878a(0x93f)]);VisuMZ[_0x6d878a(0x541)][_0x6d878a(0x359)](_0xb0d6df,_0x368502,!![]);}),VisuMZ[_0x5eb334(0x541)]['ExportString']=function(_0x5318fc,_0x5deabd,_0x2ea385){const _0x30e2f9=_0x5eb334,_0xa3ba40=require('fs');let _0x3d5220=_0x30e2f9(0x4d2)[_0x30e2f9(0x1ce)](_0x5deabd||'0');_0xa3ba40['writeFile'](_0x3d5220,_0x5318fc,_0x473c19=>{const _0x2dcec3=_0x30e2f9;if(_0x473c19)throw err;else{if(_0x2ea385){if(_0x2dcec3(0x806)!=='QJDdQ')alert(_0x2dcec3(0x46a)[_0x2dcec3(0x1ce)](_0x3d5220));else{if(_0x58a5cb[_0x2dcec3(0x96e)]())_0x496c31[_0x2dcec3(0x76e)](_0x5c862a);}}}});},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x7e2)]=function(){const _0x44cc51=_0x5eb334,_0x49bc83=[];for(const _0x2ba307 of $dataMapInfos){if(_0x44cc51(0x55e)!==_0x44cc51(0x55e))_0x61c16e=_0x1dc23e,this[_0x44cc51(0x745)](_0x366169,_0x163989);else{if(!_0x2ba307)continue;_0x49bc83[_0x44cc51(0x6a4)](_0x2ba307['id']);}}const _0x382cdc=_0x49bc83['length']*0x64+Math[_0x44cc51(0x8bd)](0x64);alert(_0x44cc51(0x74c)[_0x44cc51(0x1ce)](_0x382cdc)),this[_0x44cc51(0x2a5)]=[],this['_currentMap']=$dataMap;for(const _0x135243 of _0x49bc83){_0x44cc51(0x97e)!==_0x44cc51(0x301)?VisuMZ[_0x44cc51(0x541)][_0x44cc51(0x320)](_0x135243):(_0x5c1ccd=_0x3d59c5[_0x44cc51(0x811)](_0x43c26f),_0x4009d7=_0x2f577e['round'](_0x5b4cb2),_0x5ee9d9[_0x44cc51(0x541)][_0x44cc51(0x66a)][_0x44cc51(0x3e2)](this,_0x1f277e,_0x11d252,_0x174d5f));}setTimeout(VisuMZ[_0x44cc51(0x541)][_0x44cc51(0x473)][_0x44cc51(0x1fa)](this),_0x382cdc);},VisuMZ['CoreEngine'][_0x5eb334(0x320)]=function(_0x33ebb8){const _0xdf5693=_0x5eb334,_0x26288a=_0xdf5693(0x627)[_0xdf5693(0x1ce)](_0x33ebb8[_0xdf5693(0x862)](0x3)),_0x54e0f1=new XMLHttpRequest(),_0x2f2efa=_0xdf5693(0x7bf)+_0x26288a;_0x54e0f1[_0xdf5693(0x977)]('GET',_0x2f2efa),_0x54e0f1[_0xdf5693(0x3ce)]('application/json'),_0x54e0f1[_0xdf5693(0x728)]=()=>this[_0xdf5693(0x545)](_0x54e0f1,_0x33ebb8,_0x26288a,_0x2f2efa),_0x54e0f1['onerror']=()=>DataManager['onXhrError']('$dataMap',_0x26288a,_0x2f2efa),_0x54e0f1[_0xdf5693(0x7dc)]();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x545)]=function(_0x321f2c,_0x46fbd9,_0x28c7ab,_0x10c590){const _0x5415c3=_0x5eb334;$dataMap=JSON[_0x5415c3(0x29d)](_0x321f2c[_0x5415c3(0x654)]),DataManager[_0x5415c3(0x7ef)]($dataMap),this[_0x5415c3(0x2a5)][_0x46fbd9]=VisuMZ[_0x5415c3(0x541)]['ExtractStrFromMap'](_0x46fbd9),$dataMap=this['_currentMap'];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x473)]=function(){const _0x49ab7d=_0x5eb334,_0x130b4c='AllMaps';this[_0x49ab7d(0x2a5)][_0x49ab7d(0x61f)](undefined)[_0x49ab7d(0x61f)]('')[_0x49ab7d(0x61f)](null);const _0x10b266=this[_0x49ab7d(0x2a5)]['join']('\x0a\x0a\x0a\x0a\x0a')[_0x49ab7d(0x4f1)]();VisuMZ[_0x49ab7d(0x541)][_0x49ab7d(0x359)](_0x10b266,_0x130b4c,!![]),SceneManager[_0x49ab7d(0x984)][_0x49ab7d(0x6a0)]=!![];},VisuMZ['CoreEngine'][_0x5eb334(0x75d)]=function(_0x2b7148){const _0x112a6a=_0x5eb334;if(!$dataMap)return'';let _0x14f542='█'[_0x112a6a(0x130)](0x46)+'\x0a\x0a',_0x404d72='═'['repeat'](0x46)+'\x0a\x0a',_0x432501='';this[_0x112a6a(0x915)]=0x0;for(const _0x7cd82b of $dataMap[_0x112a6a(0x302)]){if(!_0x7cd82b)continue;let _0x313571=_0x7cd82b['id'],_0x50e51c=_0x7cd82b[_0x112a6a(0x536)],_0x117bb0=_0x7cd82b[_0x112a6a(0x758)];for(const _0xe13597 of _0x117bb0){if('jcXwg'===_0x112a6a(0x4e4)){_0x577ba4[_0x112a6a(0x7fc)](_0x2934f8,_0x126769);const _0x832f1e=_0xe3dfd9['pictureId']||0x1,_0x75bd24=_0x1d3782[_0x112a6a(0x28d)]||_0x112a6a(0x31d),_0x51f4e6=_0x4aacf6['picture'](_0x832f1e);_0x51f4e6&&_0x51f4e6[_0x112a6a(0x779)](_0x75bd24);}else{const _0x41f264=_0x117bb0['indexOf'](_0xe13597)+0x1;let _0x2d7263=_0x404d72+_0x112a6a(0x38d),_0x209b22=VisuMZ[_0x112a6a(0x541)][_0x112a6a(0x1d7)](_0xe13597[_0x112a6a(0x41b)]);if(_0x209b22[_0x112a6a(0x61b)]>0x0){if(_0x432501['length']>0x0){if(_0x112a6a(0x12b)!=='zxcTL')return _0x112a6a(0x780)['format'](_0x11af1b(_0x2b9703['$1']));else _0x432501+=_0x404d72+'\x0a\x0a\x0a\x0a\x0a';}else{const _0x109408=$dataMapInfos[_0x2b7148]['name'];_0x432501+=_0x14f542+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x112a6a(0x1ce)](_0x2b7148,_0x109408||_0x112a6a(0x404))+_0x14f542;}_0x432501+=_0x2d7263[_0x112a6a(0x1ce)](_0x313571,_0x50e51c,_0x41f264,_0x209b22);}}}}return _0x432501[_0x112a6a(0x61b)]>0x0&&(_0x432501+=_0x404d72),_0x432501;},VisuMZ['CoreEngine'][_0x5eb334(0x2ed)]=function(){const _0x22679c=_0x5eb334,_0x462359=$dataTroops[_0x22679c(0x61b)]*0xa+Math[_0x22679c(0x8bd)](0xa);alert('Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x22679c(0x1ce)](_0x462359));const _0x4a8ce9=[];for(const _0x293f50 of $dataTroops){if(_0x22679c(0x876)===_0x22679c(0x876)){if(!_0x293f50)continue;const _0x2c9687=_0x293f50['id'];_0x4a8ce9[_0x2c9687]=VisuMZ[_0x22679c(0x541)][_0x22679c(0x2a1)](_0x2c9687);}else return _0x368dcc&&_0x5da176[_0x22679c(0x908)]&&_0x52a06f[_0x22679c(0x908)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?_0x315b91(_0x553d16['$1']):_0x352cda['CoreEngine']['Settings'][_0x22679c(0x70a)][_0x22679c(0x79b)];}setTimeout(VisuMZ[_0x22679c(0x541)][_0x22679c(0x165)][_0x22679c(0x1fa)](this,_0x4a8ce9),_0x462359);},VisuMZ[_0x5eb334(0x541)]['ExtractStrFromTroop']=function(_0x19b6d9){const _0x2a0c90=_0x5eb334;if(!$dataTroops[_0x19b6d9])return'';let _0x5c29ed='█'[_0x2a0c90(0x130)](0x46)+'\x0a\x0a',_0x1aa54c='═'['repeat'](0x46)+'\x0a\x0a',_0x483565='';this['_commonEventLayers']=0x0;const _0x3be18b=$dataTroops[_0x19b6d9];let _0x2e54e3=_0x3be18b[_0x2a0c90(0x758)];for(const _0x153a6a of _0x2e54e3){if(_0x2a0c90(0x542)==='ypUuP'){const _0x377437=_0x2e54e3[_0x2a0c90(0x7c2)](_0x153a6a)+0x1;let _0x1e1c01=_0x1aa54c+_0x2a0c90(0x4aa),_0x27f4f5=VisuMZ['CoreEngine'][_0x2a0c90(0x1d7)](_0x153a6a[_0x2a0c90(0x41b)]);if(_0x27f4f5[_0x2a0c90(0x61b)]>0x0){if(_0x483565['length']>0x0)_0x483565+=_0x1aa54c+'\x0a\x0a\x0a\x0a\x0a';else{if(_0x2a0c90(0x200)!==_0x2a0c90(0x200)){const _0x507b63=_0x712e1b[_0x2a0c90(0x541)][_0x2a0c90(0x467)][_0x2a0c90(0x2ba)];return this['_inputWindow'][_0x2a0c90(0x762)]===_0x2a0c90(0x6ba)?_0x507b63[_0x2a0c90(0x16c)]||'Keyboard':_0x507b63[_0x2a0c90(0x3dc)]||_0x2a0c90(0x3dc);}else _0x483565+=_0x5c29ed+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'['format'](_0x19b6d9,_0x3be18b[_0x2a0c90(0x536)]||_0x2a0c90(0x404))+_0x5c29ed;}_0x483565+=_0x1e1c01['format'](_0x377437,_0x27f4f5);}}else{const _0x51a3fc=_0x446419[_0x2a0c90(0x53c)]()[_0x2a0c90(0x551)](/\\I\[(\d+)\]/gi,'');this[_0x2a0c90(0x42e)](_0x574ede[_0x2a0c90(0x53c)](),_0x10aced,_0x1fa551,_0x45255f);}}return _0x483565[_0x2a0c90(0x61b)]>0x0&&(_0x483565+=_0x1aa54c),_0x483565;},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x165)]=function(_0x436d67){const _0x5c5ce3=_0x5eb334,_0x155277=_0x5c5ce3(0x857);_0x436d67['remove'](undefined)[_0x5c5ce3(0x61f)]('')['remove'](null);const _0x4815d7=_0x436d67[_0x5c5ce3(0x5a0)](_0x5c5ce3(0x6bd))[_0x5c5ce3(0x4f1)]();VisuMZ['CoreEngine'][_0x5c5ce3(0x359)](_0x4815d7,_0x155277,!![]),SceneManager[_0x5c5ce3(0x984)][_0x5c5ce3(0x6a0)]=!![];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x1d7)]=function(_0x5eb461){const _0x218183=_0x5eb334;let _0x2cbef4='\x0a'+'─'[_0x218183(0x130)](0x46)+'\x0a',_0x51bd2f='\x0a'+'┄'[_0x218183(0x130)](0x46)+'\x0a',_0x3ee2af='';for(const _0x5e2b91 of _0x5eb461){if(!_0x5e2b91)continue;if(_0x5e2b91[_0x218183(0x479)]===0x65)'nCUUY'!==_0x218183(0x341)?_0x4623fa[_0x218183(0x830)]():(_0x3ee2af+=_0x2cbef4+'\x0a',_0x3ee2af+=_0x218183(0x7b2),_0x5e2b91[_0x218183(0x8c6)][0x4]!==''&&_0x5e2b91[_0x218183(0x8c6)][0x4]!==undefined&&(_0x3ee2af+=_0x218183(0x587)[_0x218183(0x1ce)](_0x5e2b91[_0x218183(0x8c6)][0x4])));else{if(_0x5e2b91['code']===0x191){if(_0x218183(0x21f)===_0x218183(0x3e0)){const _0x2aaf92=this['index']();_0x33c224[_0x218183(0x209)](_0x218183(0x8db))&&this[_0x218183(0x931)](_0x262bd7[_0x218183(0x640)](this[_0x218183(0x5f3)](),0x0)),_0x434bd1['isTriggered'](_0x218183(0x2ca))&&this[_0x218183(0x931)](_0x251812[_0x218183(0x852)](this[_0x218183(0x5f3)](),this[_0x218183(0x2ee)]()-0x1)),this[_0x218183(0x5f3)]()!==_0x2aaf92&&this[_0x218183(0x56d)]();}else _0x3ee2af+=_0x218183(0x684)[_0x218183(0x1ce)](_0x5e2b91['parameters'][0x0]);}else{if(_0x5e2b91[_0x218183(0x479)]===0x192)_0x218183(0x777)===_0x218183(0x777)?(_0x3ee2af+=_0x2cbef4,_0x3ee2af+=_0x218183(0x70c)[_0x218183(0x1ce)](_0x51bd2f,_0x5e2b91[_0x218183(0x8c6)][0x0]+0x1,_0x5e2b91[_0x218183(0x8c6)][0x1])):_0x59a4c5+=_0x218183(0x299);else{if(_0x5e2b91['code']===0x193)_0x3ee2af+=_0x2cbef4,_0x3ee2af+=_0x218183(0x983)[_0x218183(0x1ce)](_0x51bd2f);else{if(_0x5e2b91[_0x218183(0x479)]===0x194)_0x218183(0x6b2)!==_0x218183(0x653)?(_0x3ee2af+=_0x2cbef4,_0x3ee2af+='%1〘End\x20Choice\x20Selection〙%1'[_0x218183(0x1ce)](_0x51bd2f)):(_0x36aff0[_0x218183(0x5ad)][0x57]='up',_0x460b51[_0x218183(0x5ad)][0x41]=_0x218183(0x22f),_0xf3635c[_0x218183(0x5ad)][0x53]=_0x218183(0x588),_0x47fd16['keyMapper'][0x44]=_0x218183(0x3d8),_0x39966c[_0x218183(0x5ad)][0x45]='pagedown');else{if(_0x5e2b91['code']===0x69)_0x218183(0x1ee)!==_0x218183(0x688)?(_0x3ee2af+=_0x2cbef4+'\x0a',_0x3ee2af+='〘Scrolling\x20Text〙\x0a'):this[_0x218183(0x14d)]();else{if(_0x5e2b91[_0x218183(0x479)]===0x6c)_0x3ee2af+=_0x2cbef4+'\x0a',_0x3ee2af+=_0x218183(0x783)[_0x218183(0x1ce)](_0x5e2b91['parameters'][0x0]);else{if(_0x5e2b91[_0x218183(0x479)]===0x198)_0x218183(0x704)!==_0x218183(0x4c6)?_0x3ee2af+='%1\x0a'['format'](_0x5e2b91[_0x218183(0x8c6)][0x0]):_0x1fe9aa[_0x218183(0x96e)]()&&(_0x4d523d['log'](_0x218183(0x310)),_0xc05383['log'](_0x507737));else{if(_0x5e2b91[_0x218183(0x479)]===0x75){if(_0x218183(0x7d7)!=='IVLUl')return _0x9aa867&&_0x3c4938['_scene']?_0x4ef7ca[_0x218183(0x984)]['isWindowMaskingEnabled']():!![];else{const _0x280079=$dataCommonEvents[_0x5e2b91[_0x218183(0x8c6)][0x0]];if(_0x280079&&this[_0x218183(0x915)]<=0xa){this['_commonEventLayers']++;let _0x49c626=VisuMZ[_0x218183(0x541)][_0x218183(0x1d7)](_0x280079[_0x218183(0x41b)]);if(_0x49c626[_0x218183(0x61b)]>0x0){if('Ykogs'!==_0x218183(0x878))_0x3ee2af+=_0x2cbef4,_0x3ee2af+=_0x51bd2f,_0x3ee2af+=_0x218183(0x6de)[_0x218183(0x1ce)](_0x280079['id'],_0x280079[_0x218183(0x536)]),_0x3ee2af+=_0x51bd2f,_0x3ee2af+=_0x49c626,_0x3ee2af+=_0x51bd2f,_0x3ee2af+=_0x218183(0x241)[_0x218183(0x1ce)](_0x280079['id'],_0x280079['name']),_0x3ee2af+=_0x51bd2f;else{const _0x93c91d=this[_0x218183(0x679)],_0x2d9a91=_0x93c91d[_0x218183(0x907)];_0x266116=_0x34ac7c||0xffffffff;let _0x488bf4=_0x1f8892,_0x3be1c2=_0x152d92[_0x218183(0x811)](_0x3375e7+0x18/0x2+this[_0x218183(0x803)]*0.35);_0x4befc7===_0x218183(0x2d3)&&(_0x488bf4+=_0x41b9b7/0x2),_0x137704===_0x218183(0x3d8)&&(_0x488bf4+=_0x27038d),_0x93c91d[_0x218183(0x5b6)](),_0x93c91d['font']=this[_0x218183(0x21d)](),_0x93c91d['textAlign']=_0x55e9e8,_0x93c91d[_0x218183(0x164)]=_0x218183(0x1be),_0x93c91d[_0x218183(0x907)]=0x1,this[_0x218183(0x749)](_0x327cbc,_0x488bf4,_0x3be1c2,_0x3a8181),_0x93c91d[_0x218183(0x907)]=_0x2d9a91,this[_0x218183(0x568)](_0x9ccc9f,_0x488bf4,_0x3be1c2,_0x13f7c6),_0x93c91d[_0x218183(0x2e2)](),this[_0x218183(0x917)][_0x218183(0x3c4)]();}}this[_0x218183(0x915)]--;}}}}}}}}}}}}return _0x3ee2af[_0x218183(0x61b)]>0x0&&(_0x3ee2af+=_0x2cbef4),_0x3ee2af;},PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],'OpenURL',_0x2ddbf6=>{const _0x1ec4d8=_0x5eb334;VisuMZ[_0x1ec4d8(0x7fc)](_0x2ddbf6,_0x2ddbf6);const _0x487aad=_0x2ddbf6[_0x1ec4d8(0x37c)];VisuMZ['openURL'](_0x487aad);}),PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],_0x5eb334(0x662),_0x283173=>{const _0x34cb76=_0x5eb334;VisuMZ[_0x34cb76(0x7fc)](_0x283173,_0x283173);const _0xd41d4d=_0x283173['value']||0x0;$gameParty[_0x34cb76(0x44f)](_0xd41d4d);}),PluginManager['registerCommand'](pluginData[_0x5eb334(0x536)],_0x5eb334(0x513),_0x2815c4=>{const _0x6bc157=_0x5eb334;if(!SceneManager[_0x6bc157(0x57e)]())return;VisuMZ['ConvertParams'](_0x2815c4,_0x2815c4);const _0x59724f=_0x2815c4[_0x6bc157(0x557)];SceneManager[_0x6bc157(0x984)]['playOnceParallelInterpreter'](_0x59724f);}),PluginManager['registerCommand'](pluginData[_0x5eb334(0x536)],_0x5eb334(0x9a8),_0x18cc73=>{const _0x23260f=_0x5eb334;if(!$gameTemp[_0x23260f(0x96e)]())return;if(!Utils['isNwjs']())return;VisuMZ[_0x23260f(0x7fc)](_0x18cc73,_0x18cc73);const _0x5805d1=_0x18cc73['PictureID']||0x1;$gameTemp['_pictureCoordinatesMode']=_0x5805d1;}),PluginManager[_0x5eb334(0x4b7)](pluginData['name'],_0x5eb334(0x51b),_0x4475e7=>{const _0x40ee65=_0x5eb334;VisuMZ['ConvertParams'](_0x4475e7,_0x4475e7);const _0x42a001=_0x4475e7[_0x40ee65(0x91e)]||0x1,_0xd0ca10=_0x4475e7[_0x40ee65(0x28d)]||'Linear',_0x1b1641=$gameScreen[_0x40ee65(0x958)](_0x42a001);if(_0x1b1641){if('cmFPx'==='yzNkc')return-0.5*(_0x18941b[_0x40ee65(0x3f1)](0x1-_0x3a4b61*_0x315e40)-0x1);else _0x1b1641[_0x40ee65(0x779)](_0xd0ca10);}}),PluginManager['registerCommand'](pluginData[_0x5eb334(0x536)],_0x5eb334(0x956),_0x140377=>{const _0x29709e=_0x5eb334;for(let _0x2b598a=0x1;_0x2b598a<=0x64;_0x2b598a++){_0x29709e(0x940)===_0x29709e(0x64e)?(this['_x']=this[_0x29709e(0x33a)],this['_y']=this[_0x29709e(0x7b9)],this[_0x29709e(0x3d3)]=this[_0x29709e(0x7e1)],this[_0x29709e(0x13a)]=this[_0x29709e(0x376)],this['_opacity']=this[_0x29709e(0x45e)],this['_anchor']&&(this[_0x29709e(0x2d2)]['x']=this['_targetAnchor']['x'],this[_0x29709e(0x2d2)]['y']=this[_0x29709e(0x496)]['y'])):$gameScreen[_0x29709e(0x356)](_0x2b598a);}}),PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],_0x5eb334(0x8a1),_0x334e13=>{const _0x1fa0b7=_0x5eb334;VisuMZ['ConvertParams'](_0x334e13,_0x334e13);const _0x3d8355=Math[_0x1fa0b7(0x640)](_0x334e13[_0x1fa0b7(0x78f)],_0x334e13[_0x1fa0b7(0x581)]),_0x5b96f6=Math[_0x1fa0b7(0x852)](_0x334e13[_0x1fa0b7(0x78f)],_0x334e13['EndingID']);for(let _0x1c807a=_0x3d8355;_0x1c807a<=_0x5b96f6;_0x1c807a++){$gameScreen['erasePicture'](_0x1c807a);}}),PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],_0x5eb334(0x8a0),_0xaa22d0=>{const _0x290143=_0x5eb334;VisuMZ[_0x290143(0x7fc)](_0xaa22d0,_0xaa22d0);const _0x26e234=Math[_0x290143(0x811)](_0xaa22d0[_0x290143(0x474)])[_0x290143(0x84f)](0x1,0x64),_0x246aff=_0xaa22d0['Settings'],_0x5681ff=_0x246aff[_0x290143(0x842)]['clamp'](0x0,0x1),_0x5cd760=Math[_0x290143(0x811)](_0x246aff[_0x290143(0x22e)]||0x0),_0x376994=Math[_0x290143(0x811)](_0x246aff['PositionY']||0x0),_0x32f6fa=Math[_0x290143(0x811)](_0x246aff['ScaleX']||0x0),_0x4de5ef=Math[_0x290143(0x811)](_0x246aff[_0x290143(0x2a8)]||0x0),_0x13b3a0=Math['round'](_0x246aff['Opacity'])['clamp'](0x0,0xff),_0x36ee45=_0x246aff[_0x290143(0x73e)],_0xe695ff=_0x290143(0x38a),_0x52ee1f=_0xaa22d0['Smooth']?_0x290143(0x7aa):_0x290143(0x3f6),_0x4e0400=_0xe695ff[_0x290143(0x1ce)](_0xaa22d0[_0x290143(0x438)],_0x52ee1f);$gameScreen[_0x290143(0x2f4)](_0x26e234,_0x4e0400,_0x5681ff,_0x5cd760,_0x376994,_0x32f6fa,_0x4de5ef,_0x13b3a0,_0x36ee45);}),PluginManager['registerCommand'](pluginData['name'],_0x5eb334(0x38c),_0x38d44e=>{const _0x48b73e=_0x5eb334;VisuMZ['ConvertParams'](_0x38d44e,_0x38d44e);const _0x38f39e=_0x38d44e[_0x48b73e(0x6d4)]||_0x48b73e(0x72b),_0x3faea7=_0x38d44e[_0x48b73e(0x388)][_0x48b73e(0x84f)](0x1,0x9),_0x5cc855=_0x38d44e[_0x48b73e(0x5bc)][_0x48b73e(0x84f)](0x1,0x9),_0x4b257d=_0x38d44e[_0x48b73e(0x364)]||0x1,_0x5ac386=_0x38d44e[_0x48b73e(0x2ef)];$gameScreen[_0x48b73e(0x927)](_0x38f39e),$gameScreen['startShake'](_0x3faea7,_0x5cc855,_0x4b257d);if(_0x5ac386){const _0x3bfe07=$gameTemp[_0x48b73e(0x76a)]();if(_0x3bfe07)_0x3bfe07[_0x48b73e(0x695)](_0x4b257d);}}),PluginManager['registerCommand'](pluginData[_0x5eb334(0x536)],_0x5eb334(0x20f),_0xfa072=>{const _0xf79977=_0x5eb334;if($gameParty[_0xf79977(0x9bd)]())return;VisuMZ[_0xf79977(0x7fc)](_0xfa072,_0xfa072);const _0x11480c=_0xfa072[_0xf79977(0x526)],_0x69eedf=(_0xfa072['Chance']||0x0)/0x64;for(const _0x33cc27 of _0x11480c){const _0x3f5694=Math[_0xf79977(0x72b)]()<=_0x69eedf;$gameSwitches['setValue'](_0x33cc27,_0x3f5694);}}),PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],_0x5eb334(0x8d9),_0x1b80d1=>{const _0x590156=_0x5eb334;if($gameParty[_0x590156(0x9bd)]())return;VisuMZ['ConvertParams'](_0x1b80d1,_0x1b80d1);const _0x77c825=Math[_0x590156(0x640)](_0x1b80d1[_0x590156(0x78f)],_0x1b80d1['EndingID']),_0x5dd26e=Math[_0x590156(0x852)](_0x1b80d1['StartID'],_0x1b80d1[_0x590156(0x581)]),_0x457d80=(_0x1b80d1[_0x590156(0x516)]||0x0)/0x64;for(let _0x3c0c52=_0x77c825;_0x3c0c52<=_0x5dd26e;_0x3c0c52++){if('fvidl'!=='fvidl')_0x6c42a6[_0x590156(0x63b)][_0x590156(0x3c4)]['call'](this),this[_0x590156(0x311)](),this[_0x590156(0x42f)]();else{const _0xac0034=Math[_0x590156(0x72b)]()<=_0x457d80;$gameSwitches[_0x590156(0x8c9)](_0x3c0c52,_0xac0034);}}}),PluginManager[_0x5eb334(0x4b7)](pluginData['name'],_0x5eb334(0x92d),_0x1bd1e3=>{const _0x330242=_0x5eb334;if($gameParty[_0x330242(0x9bd)]())return;VisuMZ[_0x330242(0x7fc)](_0x1bd1e3,_0x1bd1e3);const _0xbd2095=_0x1bd1e3['IDs'];for(const _0x4af10a of _0xbd2095){const _0x5baf6c=$gameSwitches[_0x330242(0x2bc)](_0x4af10a);$gameSwitches['setValue'](_0x4af10a,!_0x5baf6c);}}),PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],_0x5eb334(0x1bc),_0x26268f=>{const _0x17abd1=_0x5eb334;if($gameParty[_0x17abd1(0x9bd)]())return;VisuMZ['ConvertParams'](_0x26268f,_0x26268f);const _0x9fbc2d=Math[_0x17abd1(0x640)](_0x26268f[_0x17abd1(0x78f)],_0x26268f[_0x17abd1(0x581)]),_0x69b052=Math[_0x17abd1(0x852)](_0x26268f[_0x17abd1(0x78f)],_0x26268f[_0x17abd1(0x581)]);for(let _0x1b643d=_0x9fbc2d;_0x1b643d<=_0x69b052;_0x1b643d++){const _0x2c6058=$gameSwitches[_0x17abd1(0x2bc)](_0x1b643d);$gameSwitches['setValue'](_0x1b643d,!_0x2c6058);}}),PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],'SystemSetFontSize',_0x42b7f2=>{const _0x356cc8=_0x5eb334;VisuMZ['ConvertParams'](_0x42b7f2,_0x42b7f2);const _0x10cd43=_0x42b7f2['option']||0x1;$gameSystem[_0x356cc8(0x95d)](_0x10cd43);}),PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],'SystemSetSideView',_0x96527=>{const _0x18abdb=_0x5eb334;if($gameParty[_0x18abdb(0x9bd)]())return;VisuMZ[_0x18abdb(0x7fc)](_0x96527,_0x96527);const _0x1d1ea7=_0x96527[_0x18abdb(0x934)];if(_0x1d1ea7[_0x18abdb(0x6c9)](/Front/i))$gameSystem['setSideView'](![]);else _0x1d1ea7['match'](/Side/i)?_0x18abdb(0x486)!==_0x18abdb(0x3cc)?$gameSystem[_0x18abdb(0x744)](!![]):this[_0x18abdb(0x5e5)]()?this[_0x18abdb(0x772)]():_0xaf4682[_0x18abdb(0x541)][_0x18abdb(0x3b5)][_0x18abdb(0x3e2)](this):$gameSystem['setSideView'](!$gameSystem['isSideView']());}),PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],'SystemLoadAudio',_0x5763cf=>{const _0x21a5ba=_0x5eb334;if($gameParty[_0x21a5ba(0x9bd)]())return;VisuMZ[_0x21a5ba(0x7fc)](_0x5763cf,_0x5763cf);const _0x2ab709=[_0x21a5ba(0x555),_0x21a5ba(0x29b),'me','se'];for(const _0x5484cd of _0x2ab709){const _0x4152e5=_0x5763cf[_0x5484cd],_0x3bd182=_0x21a5ba(0x1f3)[_0x21a5ba(0x1ce)](_0x5484cd);for(const _0x26db31 of _0x4152e5){AudioManager[_0x21a5ba(0x231)](_0x3bd182,_0x26db31);}}}),PluginManager[_0x5eb334(0x4b7)](pluginData['name'],_0x5eb334(0x667),_0x5be7aa=>{const _0x3b5fa1=_0x5eb334;if($gameParty[_0x3b5fa1(0x9bd)]())return;VisuMZ[_0x3b5fa1(0x7fc)](_0x5be7aa,_0x5be7aa);const _0x51c6c=[_0x3b5fa1(0x1a0),_0x3b5fa1(0x531),'battlebacks2',_0x3b5fa1(0x60e),'enemies',_0x3b5fa1(0x2d0),_0x3b5fa1(0x929),_0x3b5fa1(0x346),_0x3b5fa1(0x51c),_0x3b5fa1(0x240),_0x3b5fa1(0x9b1),_0x3b5fa1(0x3e4),'titles1',_0x3b5fa1(0x5e1)];for(const _0x24ddb5 of _0x51c6c){const _0x560fdd=_0x5be7aa[_0x24ddb5],_0x1096fb=_0x3b5fa1(0x4e2)[_0x3b5fa1(0x1ce)](_0x24ddb5);for(const _0x2b0d70 of _0x560fdd){ImageManager[_0x3b5fa1(0x1c0)](_0x1096fb,_0x2b0d70);}}}),PluginManager['registerCommand'](pluginData[_0x5eb334(0x536)],_0x5eb334(0x4c3),_0x13a1d=>{const _0x226a5c=_0x5eb334;if($gameParty[_0x226a5c(0x9bd)]())return;VisuMZ[_0x226a5c(0x7fc)](_0x13a1d,_0x13a1d);const _0x48e8d5=_0x13a1d[_0x226a5c(0x934)][_0x226a5c(0x8d6)]()[_0x226a5c(0x4f1)](),_0x23b952=VisuMZ[_0x226a5c(0x541)][_0x226a5c(0x5b0)](_0x48e8d5);$gameSystem[_0x226a5c(0x7ae)](_0x23b952);}),VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x5b0)]=function(_0x167ee7){const _0x4d50b6=_0x5eb334;_0x167ee7=_0x167ee7||'DATABASE',_0x167ee7=String(_0x167ee7)[_0x4d50b6(0x8d6)]()[_0x4d50b6(0x4f1)]();switch(_0x167ee7){case _0x4d50b6(0x681):return 0x0;case _0x4d50b6(0x3ef):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x4d50b6(0x6ef)]=!![]);return 0x1;case _0x4d50b6(0x1a7):Imported[_0x4d50b6(0x8b2)]&&(_0x4d50b6(0x827)!=='CWEgL'?ConfigManager[_0x4d50b6(0x6ef)]=![]:this[_0x4d50b6(0x236)]=0x1);return 0x2;case _0x4d50b6(0x8f8):if(Imported[_0x4d50b6(0x891)])return'CTB';break;case'STB':if(Imported['VisuMZ_2_BattleSystemSTB'])return _0x4d50b6(0x3fa);break;case _0x4d50b6(0x8fa):if(Imported[_0x4d50b6(0x7ed)]){if(_0x4d50b6(0x3c3)===_0x4d50b6(0x3c3))return'BTB';else this[_0x4d50b6(0x8af)]={},_0x387cc4[_0x4d50b6(0x541)][_0x4d50b6(0x8e7)][_0x4d50b6(0x3e2)](this);}break;case _0x4d50b6(0x272):if(Imported[_0x4d50b6(0x6ac)]){if(_0x4d50b6(0x5b2)===_0x4d50b6(0x43e)){_0x54b6d0[_0x4d50b6(0x541)][_0x4d50b6(0x33b)][_0x4d50b6(0x3e2)](this);const _0x1e600b=this['_spriteset']['_timerSprite'];if(_0x1e600b)this['addChild'](_0x1e600b);}else return _0x4d50b6(0x272);}break;case _0x4d50b6(0x82d):if(Imported[_0x4d50b6(0x3a2)])return _0x4d50b6(0x4d9)===_0x4d50b6(0x64a)?this['_sideButtonLayout']:_0x4d50b6(0x82d);break;case _0x4d50b6(0x554):if(Imported[_0x4d50b6(0x60f)])return _0x4d50b6(0x554);break;case _0x4d50b6(0x951):if(Imported['VisuMZ_2_BattleSystemPTB'])return _0x4d50b6(0x951);break;}return $dataSystem[_0x4d50b6(0x963)];},PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],_0x5eb334(0x9b0),_0x13824a=>{VisuMZ['ConvertParams'](_0x13824a,_0x13824a);const _0x519977=_0x13824a['option']||0x1;$gameSystem['setWindowPadding'](_0x519977);}),PluginManager['registerCommand'](pluginData[_0x5eb334(0x536)],_0x5eb334(0x480),_0x18ef74=>{const _0x16c719=_0x5eb334;VisuMZ[_0x16c719(0x7fc)](_0x18ef74,_0x18ef74);const _0x3f696c=_0x18ef74['id']||0x1,_0xdd09ab=_0x18ef74[_0x16c719(0x8de)],_0x5ac9b2=_0x18ef74['operand']||0x0;let _0x34e25a=$gameVariables[_0x16c719(0x2bc)](_0x3f696c)||0x0;switch(_0xdd09ab){case'=':_0x34e25a=_0x5ac9b2;break;case'+':_0x34e25a+=_0x5ac9b2;break;case'-':_0x34e25a-=_0x5ac9b2;break;case'*':_0x34e25a*=_0x5ac9b2;break;case'/':_0x34e25a/=_0x5ac9b2;break;case'%':_0x34e25a%=_0x5ac9b2;break;}_0x34e25a=_0x34e25a||0x0,$gameVariables[_0x16c719(0x8c9)](_0x3f696c,_0x34e25a);}),PluginManager[_0x5eb334(0x4b7)](pluginData[_0x5eb334(0x536)],_0x5eb334(0x4bc),_0x2aee29=>{const _0xb88685=_0x5eb334;VisuMZ[_0xb88685(0x7fc)](_0x2aee29,_0x2aee29);const _0x2928cf=_0x2aee29['id']()||0x1,_0x2011b2=_0x2aee29[_0xb88685(0x8de)],_0x3878eb=_0x2aee29['operand']()||0x0;let _0x5f0f31=$gameVariables[_0xb88685(0x2bc)](_0x2928cf)||0x0;switch(_0x2011b2){case'=':_0x5f0f31=_0x3878eb;break;case'+':_0x5f0f31+=_0x3878eb;break;case'-':_0x5f0f31-=_0x3878eb;break;case'*':_0x5f0f31*=_0x3878eb;break;case'/':_0x5f0f31/=_0x3878eb;break;case'%':_0x5f0f31%=_0x3878eb;break;}_0x5f0f31=_0x5f0f31||0x0,$gameVariables[_0xb88685(0x8c9)](_0x2928cf,_0x5f0f31);}),VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x503)]=Scene_Boot['prototype'][_0x5eb334(0x397)],Scene_Boot[_0x5eb334(0x63b)][_0x5eb334(0x397)]=function(){const _0x3aaec1=_0x5eb334;VisuMZ[_0x3aaec1(0x541)][_0x3aaec1(0x503)]['call'](this),this[_0x3aaec1(0x7d9)](),this[_0x3aaec1(0x1b1)](),this[_0x3aaec1(0x73c)](),this['process_VisuMZ_CoreEngine_Functions'](),this[_0x3aaec1(0x1d3)](),this[_0x3aaec1(0x564)](),VisuMZ['ParseAllNotetags']();},VisuMZ[_0x5eb334(0x541)]['RegExp']={},Scene_Boot[_0x5eb334(0x63b)][_0x5eb334(0x7d9)]=function(){const _0x149001=_0x5eb334,_0x402453=['MAXHP',_0x149001(0x326),'ATK','DEF',_0x149001(0x4f7),_0x149001(0x6d1),_0x149001(0x24b),_0x149001(0x83a)],_0x53ef4f=[_0x149001(0x32e),_0x149001(0x238),'CRI',_0x149001(0x34c),_0x149001(0x3d6),_0x149001(0x992),_0x149001(0x5a6),_0x149001(0x774),_0x149001(0x8e3),_0x149001(0x195)],_0x5eae09=[_0x149001(0x189),_0x149001(0x645),_0x149001(0x1a4),'PHA',_0x149001(0x96f),_0x149001(0x701),_0x149001(0x291),_0x149001(0x60b),'FDR',_0x149001(0x366)],_0x5f445b=[_0x402453,_0x53ef4f,_0x5eae09],_0x9afbdd=[_0x149001(0x80c),'Plus1',_0x149001(0x1b8),_0x149001(0x9bf),_0x149001(0x218),_0x149001(0x647),_0x149001(0x266),_0x149001(0x55b),_0x149001(0x978),_0x149001(0x571)];for(const _0x565822 of _0x5f445b){let _0x2d3e1b='';if(_0x565822===_0x402453)_0x2d3e1b='param';if(_0x565822===_0x53ef4f)_0x2d3e1b=_0x149001(0x760);if(_0x565822===_0x5eae09)_0x2d3e1b='sparam';for(const _0x509fb5 of _0x9afbdd){let _0x1bc75a=_0x149001(0x50e)['format'](_0x2d3e1b,_0x509fb5);VisuMZ['CoreEngine'][_0x149001(0x6b7)][_0x1bc75a]=[],VisuMZ[_0x149001(0x541)][_0x149001(0x6b7)][_0x1bc75a+'JS']=[];let _0x385c00=_0x149001(0x2fa);if([_0x149001(0x80c),_0x149001(0x55b)][_0x149001(0x8c8)](_0x509fb5))_0x149001(0x8e5)!==_0x149001(0x8e5)?(this[_0x149001(0x5c2)]&&this['_helpWindow'][_0x149001(0x485)](_0x481532[_0x149001(0x885)][_0x149001(0x8d4)]),this[_0x149001(0x59e)]&&this[_0x149001(0x59e)]['setBackgroundType'](_0x21219a[_0x149001(0x885)][_0x149001(0x5b9)])):_0x385c00+=_0x149001(0x299);else{if([_0x149001(0x63f),'Flat1']['includes'](_0x509fb5))_0x385c00+=_0x149001(0x459);else{if([_0x149001(0x1b8),'Flat2'][_0x149001(0x8c8)](_0x509fb5))_0x385c00+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{if(_0x509fb5===_0x149001(0x9bf))_0x385c00+='(\x5cd+)>';else{if(_0x509fb5===_0x149001(0x647))_0x385c00+=_0x149001(0x87e);else _0x509fb5===_0x149001(0x266)&&(_0x385c00+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x5c4c4d of _0x565822){let _0x3e1f1f=_0x509fb5['replace'](/[\d+]/g,'')['toUpperCase']();const _0x201821=_0x385c00[_0x149001(0x1ce)](_0x5c4c4d,_0x3e1f1f);VisuMZ[_0x149001(0x541)][_0x149001(0x6b7)][_0x1bc75a]['push'](new RegExp(_0x201821,'i'));const _0x285136='<JS\x20%1\x20%2:[\x20](.*)>'['format'](_0x5c4c4d,_0x3e1f1f);VisuMZ['CoreEngine'][_0x149001(0x6b7)][_0x1bc75a+'JS'][_0x149001(0x6a4)](new RegExp(_0x285136,'i'));}}}},Scene_Boot['prototype'][_0x5eb334(0x1b1)]=function(){const _0x1926ac=_0x5eb334;if(VisuMZ[_0x1926ac(0x159)])return;},Scene_Boot[_0x5eb334(0x63b)][_0x5eb334(0x73c)]=function(){const _0x4dfa33=_0x5eb334,_0x5c918a=VisuMZ[_0x4dfa33(0x541)][_0x4dfa33(0x467)];_0x5c918a[_0x4dfa33(0x70a)]['OpenConsole']&&(_0x4dfa33(0x9b6)==='nMBMp'?(_0x1c4edd[_0x4dfa33(0x541)]['Game_Picture_show'][_0x4dfa33(0x3e2)](this,_0x5a17f1,_0x4baa33,_0x396f50,_0x5985b3,_0xfab2a7,_0x29f9ba,_0x486e6a,_0x1f3fa5),this[_0x4dfa33(0x432)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4d7e99]||{'x':0x0,'y':0x0})):VisuMZ['ShowDevTools'](!![]));if(_0x5c918a[_0x4dfa33(0x70a)]['ModernControls']){if(_0x4dfa33(0x2bf)!==_0x4dfa33(0x2bf))return!![];else Input[_0x4dfa33(0x5ad)][0x23]='end',Input[_0x4dfa33(0x5ad)][0x24]=_0x4dfa33(0x8db);}if(_0x5c918a['ButtonAssist']){if(_0x4dfa33(0x7cc)!==_0x4dfa33(0x778)){const _0x33bee5=_0x5c918a[_0x4dfa33(0x755)];_0x33bee5[_0x4dfa33(0x30d)]=_0x33bee5[_0x4dfa33(0x30d)]||_0x4dfa33(0x278),_0x33bee5['KeyTAB']=_0x33bee5[_0x4dfa33(0x9a7)]||'\x5c}❪TAB❫\x5c{';}else _0x2cfb16='Armor-%1-%2'['format'](_0x4ef396,_0x26ad17);}_0x5c918a[_0x4dfa33(0x2ba)][_0x4dfa33(0x59b)]&&('XOWSC'===_0x4dfa33(0x7c4)?this['_actorWindow'][_0x4dfa33(0x485)](_0x4db6e6[_0x4dfa33(0x885)][_0x4dfa33(0x7d2)]):(Input[_0x4dfa33(0x5ad)][0x57]='up',Input[_0x4dfa33(0x5ad)][0x41]=_0x4dfa33(0x22f),Input[_0x4dfa33(0x5ad)][0x53]=_0x4dfa33(0x588),Input['keyMapper'][0x44]=_0x4dfa33(0x3d8),Input[_0x4dfa33(0x5ad)][0x45]=_0x4dfa33(0x4bb)));if(_0x5c918a[_0x4dfa33(0x2ba)]['DashToggleR']){if('btZlc'!==_0x4dfa33(0x7f9))Input[_0x4dfa33(0x5ad)][0x52]='dashToggle';else{if(_0x3f51d2[_0x4dfa33(0x96e)]())_0x26910c[_0x4dfa33(0x76e)](_0x45f93f);}}_0x5c918a[_0x4dfa33(0x6f3)][_0x4dfa33(0x864)]=_0x5c918a[_0x4dfa33(0x6f3)]['DisplayedParams']['map'](_0x41b4f9=>_0x41b4f9[_0x4dfa33(0x8d6)]()[_0x4dfa33(0x4f1)]()),_0x5c918a[_0x4dfa33(0x6f3)][_0x4dfa33(0x88e)]=_0x5c918a[_0x4dfa33(0x6f3)][_0x4dfa33(0x88e)][_0x4dfa33(0x3bd)](_0x49400a=>_0x49400a[_0x4dfa33(0x8d6)]()[_0x4dfa33(0x4f1)]());},Scene_Boot[_0x5eb334(0x63b)]['process_VisuMZ_CoreEngine_Functions']=function(){const _0x2346ea=_0x5eb334;this[_0x2346ea(0x532)]();},Scene_Boot[_0x5eb334(0x63b)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0xf9a6a8=_0x5eb334,_0x34b321=VisuMZ[_0xf9a6a8(0x541)]['Settings']['jsQuickFunc'];for(const _0x2a6b14 of _0x34b321){const _0x26e1b0=_0x2a6b14[_0xf9a6a8(0x4dc)][_0xf9a6a8(0x551)](/[ ]/g,''),_0x11ccae=_0x2a6b14[_0xf9a6a8(0x6e0)];VisuMZ[_0xf9a6a8(0x541)][_0xf9a6a8(0x873)](_0x26e1b0,_0x11ccae);}},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x873)]=function(_0x4744d1,_0x16f31e){const _0x4d42ed=_0x5eb334;if(!!window[_0x4744d1]){if($gameTemp[_0x4d42ed(0x96e)]())console['log']('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x4d42ed(0x1ce)](_0x4744d1));}const _0x501e95=_0x4d42ed(0x2e0)['format'](_0x4744d1,_0x16f31e);window[_0x4744d1]=new Function(_0x501e95);},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x1eb5e5=_0x5eb334,_0x48b3ca=VisuMZ['CoreEngine'][_0x1eb5e5(0x467)][_0x1eb5e5(0x1c6)];if(!_0x48b3ca)return;for(const _0x2ce785 of _0x48b3ca){if(!_0x2ce785)continue;VisuMZ[_0x1eb5e5(0x541)][_0x1eb5e5(0x5de)](_0x2ce785);}},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x389)]={},VisuMZ[_0x5eb334(0x541)]['CustomParamIcons']={},VisuMZ[_0x5eb334(0x541)]['CustomParamType']={},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x4a9)]={},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x5de)]=function(_0x4c2c28){const _0x1c565a=_0x5eb334,_0x5c393f=_0x4c2c28[_0x1c565a(0x5ae)],_0x208b63=_0x4c2c28[_0x1c565a(0x798)],_0x2ef2cd=_0x4c2c28['Icon'],_0x4dc2d6=_0x4c2c28[_0x1c565a(0x6d4)],_0x387861=new Function(_0x4c2c28[_0x1c565a(0x55a)]);VisuMZ[_0x1c565a(0x541)]['CustomParamNames'][_0x5c393f['toUpperCase']()[_0x1c565a(0x4f1)]()]=_0x208b63,VisuMZ[_0x1c565a(0x541)][_0x1c565a(0x7f2)][_0x5c393f[_0x1c565a(0x8d6)]()[_0x1c565a(0x4f1)]()]=_0x2ef2cd,VisuMZ[_0x1c565a(0x541)]['CustomParamType'][_0x5c393f['toUpperCase']()[_0x1c565a(0x4f1)]()]=_0x4dc2d6,VisuMZ['CoreEngine']['CustomParamAbb'][_0x5c393f['toUpperCase']()['trim']()]=_0x5c393f,Object[_0x1c565a(0x64d)](Game_BattlerBase[_0x1c565a(0x63b)],_0x5c393f,{'get'(){const _0x4c1404=_0x1c565a,_0x5d5a1a=_0x387861['call'](this);return _0x4dc2d6===_0x4c1404(0x148)?Math['round'](_0x5d5a1a):_0x5d5a1a;}});},VisuMZ['CoreEngine'][_0x5eb334(0x969)]={},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x69e)]={},Scene_Boot[_0x5eb334(0x63b)][_0x5eb334(0x564)]=function(){const _0x279bcf=_0x5eb334,_0x564e00=VisuMZ[_0x279bcf(0x541)]['Settings'][_0x279bcf(0x969)];for(const _0x2ab212 of _0x564e00){const _0x19eebe=(_0x2ab212[_0x279bcf(0x179)]||'')['toLowerCase']()[_0x279bcf(0x4f1)](),_0x29b550=(_0x2ab212[_0x279bcf(0x1ab)]||'')[_0x279bcf(0x367)]()[_0x279bcf(0x4f1)]();VisuMZ[_0x279bcf(0x541)][_0x279bcf(0x969)][_0x19eebe]=_0x2ab212,VisuMZ['CoreEngine'][_0x279bcf(0x69e)][_0x29b550]=_0x19eebe;}},VisuMZ[_0x5eb334(0x159)]=function(){const _0x426abd=_0x5eb334;for(const _0x32c782 of $dataActors){if(_0x32c782)VisuMZ[_0x426abd(0x809)](_0x32c782);}for(const _0x29b6dc of $dataClasses){if('TTbjS'===_0x426abd(0x14a)){if(_0x29b6dc)VisuMZ[_0x426abd(0x839)](_0x29b6dc);}else{if(!this[_0x426abd(0x9a2)])return![];const _0x222640=this['_animation'][_0x426abd(0x536)]||'';if(_0x222640[_0x426abd(0x6c9)](/<MIRROR OFFSET X>/i))return!![];if(_0x222640[_0x426abd(0x6c9)](/<NO MIRROR OFFSET X>/i))return![];return _0x2a3841[_0x426abd(0x541)][_0x426abd(0x467)]['QoL'][_0x426abd(0x468)];}}for(const _0x127426 of $dataSkills){if(_0x127426)VisuMZ[_0x426abd(0x5cf)](_0x127426);}for(const _0x2d4e97 of $dataItems){if(_0x2d4e97)VisuMZ[_0x426abd(0x4f0)](_0x2d4e97);}for(const _0x57e009 of $dataWeapons){if(_0x57e009)VisuMZ[_0x426abd(0x422)](_0x57e009);}for(const _0x380d06 of $dataArmors){if(_0x380d06)VisuMZ[_0x426abd(0x1b7)](_0x380d06);}for(const _0x187152 of $dataEnemies){if('cpmjU'!=='HjljG'){if(_0x187152)VisuMZ[_0x426abd(0x95a)](_0x187152);}else return this[_0x426abd(0x892)]();}for(const _0xd9fe9e of $dataStates){if(_0xd9fe9e)VisuMZ[_0x426abd(0x6a9)](_0xd9fe9e);}for(const _0x2d86f1 of $dataTilesets){if(_0x426abd(0x466)!==_0x426abd(0x943)){if(_0x2d86f1)VisuMZ[_0x426abd(0x156)](_0x2d86f1);}else this[_0x426abd(0x30b)](_0x13622e[_0x426abd(0x209)]('right'));}},VisuMZ['ParseActorNotetags']=function(_0x26dbd9){},VisuMZ[_0x5eb334(0x839)]=function(_0x1c91cc){},VisuMZ['ParseSkillNotetags']=function(_0x4b4cd4){},VisuMZ[_0x5eb334(0x4f0)]=function(_0xc03352){},VisuMZ[_0x5eb334(0x422)]=function(_0x433c7b){},VisuMZ[_0x5eb334(0x1b7)]=function(_0x41f836){},VisuMZ[_0x5eb334(0x95a)]=function(_0x2010a0){},VisuMZ[_0x5eb334(0x6a9)]=function(_0x530688){},VisuMZ[_0x5eb334(0x156)]=function(_0x4633df){},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x809)]=VisuMZ[_0x5eb334(0x809)],VisuMZ[_0x5eb334(0x809)]=function(_0xf1c938){const _0x2bf6f3=_0x5eb334;VisuMZ[_0x2bf6f3(0x541)]['ParseActorNotetags'][_0x2bf6f3(0x3e2)](this,_0xf1c938);const _0x52c0e7=_0xf1c938[_0x2bf6f3(0x908)];if(_0x52c0e7[_0x2bf6f3(0x6c9)](/<MAX LEVEL:[ ](\d+)>/i)){_0xf1c938['maxLevel']=Number(RegExp['$1']);if(_0xf1c938[_0x2bf6f3(0x9bb)]===0x0)_0xf1c938['maxLevel']=Number[_0x2bf6f3(0x7c7)];}_0x52c0e7['match'](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0xf1c938[_0x2bf6f3(0x90e)]=Math[_0x2bf6f3(0x640)](Number(RegExp['$1']),_0xf1c938['maxLevel']));},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x839)]=VisuMZ[_0x5eb334(0x839)],VisuMZ['ParseClassNotetags']=function(_0x2d5c38){const _0x2faa5c=_0x5eb334;VisuMZ[_0x2faa5c(0x541)][_0x2faa5c(0x839)][_0x2faa5c(0x3e2)](this,_0x2d5c38);if(_0x2d5c38[_0x2faa5c(0x843)])for(const _0x2e0370 of _0x2d5c38[_0x2faa5c(0x843)]){'ndwIj'!=='lAmIP'?_0x2e0370[_0x2faa5c(0x908)][_0x2faa5c(0x6c9)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x2e0370[_0x2faa5c(0x8a2)]=Math[_0x2faa5c(0x852)](Number(RegExp['$1']),0x1)):_0x322609+=_0x5d5284+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x2faa5c(0x1ce)](_0x3bdc66,_0x46ca0e[_0x2faa5c(0x536)]||_0x2faa5c(0x404))+_0x46e895;}},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x95a)]=VisuMZ[_0x5eb334(0x95a)],VisuMZ[_0x5eb334(0x95a)]=function(_0x4c72ee){const _0x1cac53=_0x5eb334;VisuMZ['CoreEngine'][_0x1cac53(0x95a)]['call'](this,_0x4c72ee),_0x4c72ee['level']=0x1;const _0xb5f739=_0x4c72ee[_0x1cac53(0x908)];if(_0xb5f739[_0x1cac53(0x6c9)](/<LEVEL:[ ](\d+)>/i))_0x4c72ee['level']=Number(RegExp['$1']);if(_0xb5f739[_0x1cac53(0x6c9)](/<MAXHP:[ ](\d+)>/i))_0x4c72ee[_0x1cac53(0x823)][0x0]=Number(RegExp['$1']);if(_0xb5f739[_0x1cac53(0x6c9)](/<MAXMP:[ ](\d+)>/i))_0x4c72ee[_0x1cac53(0x823)][0x1]=Number(RegExp['$1']);if(_0xb5f739[_0x1cac53(0x6c9)](/<ATK:[ ](\d+)>/i))_0x4c72ee[_0x1cac53(0x823)][0x2]=Number(RegExp['$1']);if(_0xb5f739[_0x1cac53(0x6c9)](/<DEF:[ ](\d+)>/i))_0x4c72ee[_0x1cac53(0x823)][0x3]=Number(RegExp['$1']);if(_0xb5f739[_0x1cac53(0x6c9)](/<MAT:[ ](\d+)>/i))_0x4c72ee[_0x1cac53(0x823)][0x4]=Number(RegExp['$1']);if(_0xb5f739['match'](/<MDF:[ ](\d+)>/i))_0x4c72ee['params'][0x5]=Number(RegExp['$1']);if(_0xb5f739[_0x1cac53(0x6c9)](/<AGI:[ ](\d+)>/i))_0x4c72ee[_0x1cac53(0x823)][0x6]=Number(RegExp['$1']);if(_0xb5f739[_0x1cac53(0x6c9)](/<LUK:[ ](\d+)>/i))_0x4c72ee[_0x1cac53(0x823)][0x7]=Number(RegExp['$1']);if(_0xb5f739['match'](/<EXP:[ ](\d+)>/i))_0x4c72ee[_0x1cac53(0x29f)]=Number(RegExp['$1']);if(_0xb5f739[_0x1cac53(0x6c9)](/<GOLD:[ ](\d+)>/i))_0x4c72ee[_0x1cac53(0x81b)]=Number(RegExp['$1']);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x1c4)]=Graphics[_0x5eb334(0x2e1)],Graphics['_defaultStretchMode']=function(){const _0x199dd6=_0x5eb334;switch(VisuMZ['CoreEngine'][_0x199dd6(0x467)][_0x199dd6(0x70a)][_0x199dd6(0x2b3)]){case _0x199dd6(0x400):return!![];case _0x199dd6(0x75a):return![];default:return VisuMZ[_0x199dd6(0x541)]['Graphics_defaultStretchMode'][_0x199dd6(0x3e2)](this);}},VisuMZ['CoreEngine'][_0x5eb334(0x631)]=Graphics['printError'],Graphics[_0x5eb334(0x945)]=function(_0x357846,_0x19bf24,_0x335299=null){const _0x124ef7=_0x5eb334;VisuMZ['CoreEngine'][_0x124ef7(0x631)][_0x124ef7(0x3e2)](this,_0x357846,_0x19bf24,_0x335299),VisuMZ[_0x124ef7(0x2b1)](![]);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x664)]=Graphics[_0x5eb334(0x45a)],Graphics[_0x5eb334(0x45a)]=function(_0xae2116){const _0x5c131a=_0x5eb334;VisuMZ[_0x5c131a(0x541)][_0x5c131a(0x664)][_0x5c131a(0x3e2)](this,_0xae2116),this[_0x5c131a(0x628)](_0xae2116);},Graphics[_0x5eb334(0x628)]=function(_0x5a6684){const _0x1b5116=_0x5eb334;VisuMZ[_0x1b5116(0x541)][_0x1b5116(0x467)][_0x1b5116(0x70a)]['FontSmoothing']&&(_0x5a6684['style'][_0x1b5116(0x75b)]=_0x1b5116(0x8aa));if(VisuMZ['CoreEngine'][_0x1b5116(0x467)][_0x1b5116(0x70a)][_0x1b5116(0x623)]){if(_0x1b5116(0x20d)!==_0x1b5116(0x7cf))_0x5a6684[_0x1b5116(0x3ea)][_0x1b5116(0x4ac)]=_0x1b5116(0x5a2);else{_0x54d4d5[_0x1b5116(0x541)][_0x1b5116(0x467)]['MenuLayout'][_0x1b5116(0x72e)][_0x1b5116(0x12d)][_0x1b5116(0x3e2)](this);if(_0x3c8c84['subtitle']!==''&&_0x5e8507[_0x1b5116(0x8df)]!=='Subtitle')this['drawGameSubtitle']();if(_0x39faab['version']!==''&&_0x320bed[_0x1b5116(0x86d)]!==_0x1b5116(0x76f))this['drawGameVersion']();}}const _0x229d1d=Math[_0x1b5116(0x852)](0x0,Math[_0x1b5116(0x7fd)](_0x5a6684[_0x1b5116(0x21a)]*this[_0x1b5116(0x6e3)])),_0x9dae0e=Math['max'](0x0,Math[_0x1b5116(0x7fd)](_0x5a6684['height']*this['_realScale']));_0x5a6684[_0x1b5116(0x3ea)][_0x1b5116(0x21a)]=_0x229d1d+'px',_0x5a6684[_0x1b5116(0x3ea)]['height']=_0x9dae0e+'px';},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x3c5)]=Bitmap['prototype'][_0x5eb334(0x1e1)],Bitmap[_0x5eb334(0x63b)]['initialize']=function(_0x8e22e7,_0x12df5c){const _0x242ba1=_0x5eb334;VisuMZ[_0x242ba1(0x541)][_0x242ba1(0x3c5)][_0x242ba1(0x3e2)](this,_0x8e22e7,_0x12df5c),this['_smooth']=!(VisuMZ['CoreEngine'][_0x242ba1(0x467)][_0x242ba1(0x70a)][_0x242ba1(0x623)]??!![]);},Bitmap[_0x5eb334(0x63b)][_0x5eb334(0x27d)]=function(){this['_customModified']=!![];},VisuMZ[_0x5eb334(0x541)]['Sprite_destroy']=Sprite[_0x5eb334(0x63b)][_0x5eb334(0x868)],Sprite[_0x5eb334(0x63b)][_0x5eb334(0x868)]=function(){const _0x32f877=_0x5eb334;VisuMZ[_0x32f877(0x541)][_0x32f877(0x454)][_0x32f877(0x3e2)](this),this[_0x32f877(0x7e4)]();},Sprite['prototype'][_0x5eb334(0x7e4)]=function(){const _0x257e66=_0x5eb334;if(!this[_0x257e66(0x83b)])return;if(!this[_0x257e66(0x83b)][_0x257e66(0x83f)])return;if(this[_0x257e66(0x83b)][_0x257e66(0x917)]&&!this[_0x257e66(0x618)]['_baseTexture'][_0x257e66(0x6f4)]){if(_0x257e66(0x247)===_0x257e66(0x247))this[_0x257e66(0x83b)][_0x257e66(0x868)]();else return _0x43bf50[_0x257e66(0x541)][_0x257e66(0x467)][_0x257e66(0x89a)][_0x257e66(0x72e)][_0x257e66(0x91c)]['call'](this);}},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x4ee)]=Bitmap['prototype'][_0x5eb334(0x707)],Bitmap['prototype']['resize']=function(_0x104c52,_0x33f84e){const _0x303c66=_0x5eb334;VisuMZ[_0x303c66(0x541)][_0x303c66(0x4ee)][_0x303c66(0x3e2)](this,_0x104c52,_0x33f84e),this[_0x303c66(0x27d)]();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x57f)]=Bitmap[_0x5eb334(0x63b)]['blt'],Bitmap[_0x5eb334(0x63b)][_0x5eb334(0x224)]=function(_0x311106,_0x4005be,_0x518266,_0x3ee7dc,_0x39360e,_0x464777,_0x296a9f,_0x5d7daf,_0x4ee702){const _0x65d51c=_0x5eb334;_0x4005be=Math['round'](_0x4005be),_0x518266=Math[_0x65d51c(0x811)](_0x518266),_0x3ee7dc=Math['round'](_0x3ee7dc),_0x39360e=Math['round'](_0x39360e),_0x464777=Math['round'](_0x464777),_0x296a9f=Math['round'](_0x296a9f),VisuMZ['CoreEngine'][_0x65d51c(0x57f)]['call'](this,_0x311106,_0x4005be,_0x518266,_0x3ee7dc,_0x39360e,_0x464777,_0x296a9f,_0x5d7daf,_0x4ee702),this[_0x65d51c(0x27d)]();},VisuMZ[_0x5eb334(0x541)]['Bitmap_clearRect']=Bitmap[_0x5eb334(0x63b)][_0x5eb334(0x634)],Bitmap[_0x5eb334(0x63b)][_0x5eb334(0x634)]=function(_0x2778a8,_0x519978,_0x5707e7,_0x462b62){const _0x4aa010=_0x5eb334;VisuMZ[_0x4aa010(0x541)][_0x4aa010(0x7d6)][_0x4aa010(0x3e2)](this,_0x2778a8,_0x519978,_0x5707e7,_0x462b62),this[_0x4aa010(0x27d)]();},VisuMZ['CoreEngine'][_0x5eb334(0x239)]=Bitmap['prototype']['fillRect'],Bitmap[_0x5eb334(0x63b)][_0x5eb334(0x808)]=function(_0x5bd754,_0x5b1506,_0xd11bd0,_0x71c130,_0x4a2f72){const _0xecca37=_0x5eb334;VisuMZ[_0xecca37(0x541)]['Bitmap_fillRect'][_0xecca37(0x3e2)](this,_0x5bd754,_0x5b1506,_0xd11bd0,_0x71c130,_0x4a2f72),this[_0xecca37(0x27d)]();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x253)]=Bitmap['prototype'][_0x5eb334(0x1db)],Bitmap[_0x5eb334(0x63b)][_0x5eb334(0x1db)]=function(_0x22218b,_0x20f607,_0x2efd45,_0x217be2,_0x477fda){const _0x31089e=_0x5eb334;VisuMZ[_0x31089e(0x541)][_0x31089e(0x253)][_0x31089e(0x3e2)](this,_0x22218b,_0x20f607,_0x2efd45,_0x217be2,_0x477fda),this[_0x31089e(0x27d)]();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x3e8)]=Bitmap[_0x5eb334(0x63b)][_0x5eb334(0x384)],Bitmap['prototype']['gradientFillRect']=function(_0x6b10a1,_0x5bfdf6,_0x308340,_0x2a4378,_0xf4193d,_0x409946,_0x4a5bbf){const _0x7af539=_0x5eb334;VisuMZ['CoreEngine']['Bitmap_gradientFillRect'][_0x7af539(0x3e2)](this,_0x6b10a1,_0x5bfdf6,_0x308340,_0x2a4378,_0xf4193d,_0x409946,_0x4a5bbf),this[_0x7af539(0x27d)]();},VisuMZ['CoreEngine'][_0x5eb334(0x912)]=Bitmap['prototype'][_0x5eb334(0x3b4)],Bitmap['prototype'][_0x5eb334(0x3b4)]=function(_0x4f2be0,_0x6dc252,_0x26f186,_0x18d079){const _0x3f5ebb=_0x5eb334;_0x4f2be0=Math[_0x3f5ebb(0x811)](_0x4f2be0),_0x6dc252=Math['round'](_0x6dc252),_0x26f186=Math['round'](_0x26f186),VisuMZ[_0x3f5ebb(0x541)][_0x3f5ebb(0x912)]['call'](this,_0x4f2be0,_0x6dc252,_0x26f186,_0x18d079),this[_0x3f5ebb(0x27d)]();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x493)]=Bitmap[_0x5eb334(0x63b)][_0x5eb334(0x5a8)],Bitmap['prototype'][_0x5eb334(0x5a8)]=function(_0x3ffb8){const _0x318ef5=_0x5eb334;return Math[_0x318ef5(0x2df)](VisuMZ[_0x318ef5(0x541)]['Bitmap_measureTextWidth'][_0x318ef5(0x3e2)](this,_0x3ffb8));},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x7f4)]=Bitmap['prototype'][_0x5eb334(0x42e)],Bitmap['prototype']['drawText']=function(_0x51b898,_0x274026,_0xed4d6c,_0x5c88c6,_0x5f1e92,_0x191735){const _0x5c4472=_0x5eb334;_0x274026=Math[_0x5c4472(0x811)](_0x274026),_0xed4d6c=Math['round'](_0xed4d6c),_0x5c88c6=Math[_0x5c4472(0x811)](_0x5c88c6),_0x5f1e92=Math[_0x5c4472(0x811)](_0x5f1e92),VisuMZ['CoreEngine'][_0x5c4472(0x7f4)]['call'](this,_0x51b898,_0x274026,_0xed4d6c,_0x5c88c6,_0x5f1e92,_0x191735),this['markCoreEngineModified']();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x8c5)]=Bitmap[_0x5eb334(0x63b)][_0x5eb334(0x749)],Bitmap[_0x5eb334(0x63b)]['_drawTextOutline']=function(_0x545300,_0x487093,_0x3f5646,_0x34602a){const _0x164c46=_0x5eb334;if(VisuMZ[_0x164c46(0x541)][_0x164c46(0x467)][_0x164c46(0x70a)][_0x164c46(0x81e)]){if(_0x164c46(0x6cd)===_0x164c46(0x6cd))this['_drawTextShadow'](_0x545300,_0x487093,_0x3f5646,_0x34602a);else{if(this[_0x164c46(0x762)]===_0x164c46(0x6ba)&&!_0x45d7c8[_0x164c46(0x533)]())return;if(_0x3a9367[_0x164c46(0x9af)]())return;_0x4b7302[_0x164c46(0x541)]['Window_NameInput_cursorUp'][_0x164c46(0x3e2)](this,_0x20e10a),this['switchModes'](_0x164c46(0x1dc));}}else VisuMZ[_0x164c46(0x541)]['Bitmap_drawTextOutline'][_0x164c46(0x3e2)](this,_0x545300,_0x487093,_0x3f5646,_0x34602a);},Bitmap[_0x5eb334(0x63b)][_0x5eb334(0x328)]=function(_0x33b956,_0x2b0a84,_0x402b84,_0x1fcac7){const _0x3f452b=_0x5eb334,_0x1f77e7=this['context'];_0x1f77e7[_0x3f452b(0x3c1)]=this[_0x3f452b(0x39f)],_0x1f77e7['fillText'](_0x33b956,_0x2b0a84+0x2,_0x402b84+0x2,_0x1fcac7);},VisuMZ['CoreEngine'][_0x5eb334(0x53e)]=Input[_0x5eb334(0x961)],Input[_0x5eb334(0x961)]=function(){const _0x19bb78=_0x5eb334;VisuMZ[_0x19bb78(0x541)][_0x19bb78(0x53e)][_0x19bb78(0x3e2)](this),this[_0x19bb78(0x687)]=undefined,this['_inputSpecialKeyCode']=undefined,this['_gamepadWait']=Input[_0x19bb78(0x421)];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x52a)]=Input[_0x5eb334(0x3c4)],Input[_0x5eb334(0x3c4)]=function(){const _0x1f5f10=_0x5eb334;VisuMZ[_0x1f5f10(0x541)][_0x1f5f10(0x52a)][_0x1f5f10(0x3e2)](this);if(this[_0x1f5f10(0x51d)])this[_0x1f5f10(0x51d)]--;},VisuMZ[_0x5eb334(0x541)]['Input_pollGamepads']=Input[_0x5eb334(0x4ad)],Input[_0x5eb334(0x4ad)]=function(){const _0x2221fb=_0x5eb334;if(this[_0x2221fb(0x51d)])return;VisuMZ['CoreEngine'][_0x2221fb(0x453)][_0x2221fb(0x3e2)](this);},VisuMZ['CoreEngine'][_0x5eb334(0x928)]=Input[_0x5eb334(0x90d)],Input[_0x5eb334(0x90d)]=function(){const _0x31d5ee=_0x5eb334;VisuMZ[_0x31d5ee(0x541)][_0x31d5ee(0x928)]['call'](this),document[_0x31d5ee(0x7ec)]('keypress',this['_onKeyPress'][_0x31d5ee(0x1fa)](this));},VisuMZ[_0x5eb334(0x541)]['Input_onKeyDown']=Input[_0x5eb334(0x6ab)],Input[_0x5eb334(0x6ab)]=function(_0x13539e){const _0x15b490=_0x5eb334;this[_0x15b490(0x133)]=_0x13539e[_0x15b490(0x776)],VisuMZ[_0x15b490(0x541)]['Input_onKeyDown']['call'](this,_0x13539e),this[_0x15b490(0x414)](null);},Input[_0x5eb334(0x171)]=function(_0x3bf7bf){const _0x3751af=_0x5eb334;this[_0x3751af(0x1e9)](_0x3bf7bf);},Input[_0x5eb334(0x1e9)]=function(_0xdeb77){const _0x8f27a5=_0x5eb334;this[_0x8f27a5(0x133)]=_0xdeb77[_0x8f27a5(0x776)];let _0xbe37c0=String['fromCharCode'](_0xdeb77[_0x8f27a5(0x579)]);if(this[_0x8f27a5(0x687)]===undefined){if(_0x8f27a5(0x6c8)==='JGJiN')this[_0x8f27a5(0x687)]=_0xbe37c0;else return _0x5ce422[_0x8f27a5(0x541)][_0x8f27a5(0x467)][_0x8f27a5(0x5fe)][_0x8f27a5(0x87d)];}else this[_0x8f27a5(0x687)]+=_0xbe37c0;},VisuMZ['CoreEngine'][_0x5eb334(0x41c)]=Input[_0x5eb334(0x5ec)],Input[_0x5eb334(0x5ec)]=function(_0x2766f3){const _0x1f85ca=_0x5eb334;if(_0x2766f3===0x8)return![];return VisuMZ[_0x1f85ca(0x541)][_0x1f85ca(0x41c)][_0x1f85ca(0x3e2)](this,_0x2766f3);},Input[_0x5eb334(0x597)]=function(_0x852260){const _0x1c5509=_0x5eb334;if(_0x852260[_0x1c5509(0x6c9)](/backspace/i))return this[_0x1c5509(0x133)]===0x8;if(_0x852260[_0x1c5509(0x6c9)](/enter/i))return this[_0x1c5509(0x133)]===0xd;if(_0x852260['match'](/escape/i))return this[_0x1c5509(0x133)]===0x1b;},Input[_0x5eb334(0x9af)]=function(){const _0x2b9dbc=_0x5eb334;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x2b9dbc(0x6b4)](this[_0x2b9dbc(0x133)]);},Input[_0x5eb334(0x533)]=function(){const _0x104389=_0x5eb334;return[0x25,0x26,0x27,0x28]['contains'](this[_0x104389(0x133)]);},Input[_0x5eb334(0x994)]=function(){const _0x3ece1f=_0x5eb334;if(navigator[_0x3ece1f(0x549)]){const _0x47ad8a=navigator[_0x3ece1f(0x549)]();if(_0x47ad8a){if(_0x3ece1f(0x57c)!==_0x3ece1f(0x169))for(const _0x4d5060 of _0x47ad8a){if(_0x3ece1f(0x319)==='YAtHY'){if(_0x4d5060&&_0x4d5060[_0x3ece1f(0x25a)])return!![];}else{var _0x4d54f4=_0x49df95(_0x32321e['$1']);try{_0x4c3960+=_0x5f3eab(_0x4d54f4);}catch(_0x57c0b4){if(_0x28b592[_0x3ece1f(0x96e)]())_0x12e272[_0x3ece1f(0x76e)](_0x57c0b4);}}}else this[_0x3ece1f(0x321)]=0x0;}}return![];},Input['isGamepadTriggered']=function(){const _0x318b30=_0x5eb334;if(navigator[_0x318b30(0x549)]){const _0x3e7e03=navigator[_0x318b30(0x549)]();if(_0x3e7e03){if(_0x318b30(0x3a6)===_0x318b30(0x3a6))for(const _0x1d5305 of _0x3e7e03){if(_0x318b30(0x8d0)!==_0x318b30(0x161)){if(_0x1d5305&&_0x1d5305[_0x318b30(0x25a)]){if(this[_0x318b30(0x19f)](_0x1d5305))return!![];if(this[_0x318b30(0x78c)](_0x1d5305))return!![];}}else this[_0x318b30(0x85b)](_0x56cec0);}else _0x3b5bba['setSideView'](![]);}}return![];},Input['isGamepadButtonPressed']=function(_0x368a58){const _0x3be80b=_0x5eb334,_0x39c928=_0x368a58[_0x3be80b(0x5d2)];for(let _0x186990=0x0;_0x186990<_0x39c928['length'];_0x186990++){if(_0x39c928[_0x186990][_0x3be80b(0x20c)])return!![];}return![];},Input[_0x5eb334(0x78c)]=function(_0x319cc6){const _0x3e5f10=_0x319cc6['axes'],_0x6b6e62=0.5;if(_0x3e5f10[0x0]<-_0x6b6e62)return!![];if(_0x3e5f10[0x0]>_0x6b6e62)return!![];if(_0x3e5f10[0x1]<-_0x6b6e62)return!![];if(_0x3e5f10[0x1]>_0x6b6e62)return!![];return![];},Input[_0x5eb334(0x5a5)]=function(){const _0x194024=_0x5eb334;return this[_0x194024(0x425)]||null;},Input[_0x5eb334(0x414)]=function(_0x1229a4){const _0x493a59=_0x5eb334;this[_0x493a59(0x425)]=_0x1229a4;},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x15e)]=Input['_updateGamepadState'],Input[_0x5eb334(0x44c)]=function(_0x19443b){const _0x385861=_0x5eb334;VisuMZ[_0x385861(0x541)][_0x385861(0x15e)][_0x385861(0x3e2)](this,_0x19443b),(this[_0x385861(0x19f)](_0x19443b)||this[_0x385861(0x78c)](_0x19443b))&&this['setLastGamepadUsed'](_0x19443b);},Input[_0x5eb334(0x98c)]=function(){const _0x55c942=_0x5eb334;return this[_0x55c942(0x425)]?this[_0x55c942(0x425)]['id']:'Keyboard';},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x957)]=Tilemap['prototype'][_0x5eb334(0x76c)],Tilemap[_0x5eb334(0x63b)][_0x5eb334(0x76c)]=function(_0x148cd2,_0xd607a5,_0x4ee96a,_0x1664f4){const _0x3e1560=_0x5eb334;if($gameMap&&$gameMap['areTileShadowsHidden']())return;VisuMZ[_0x3e1560(0x541)][_0x3e1560(0x957)]['call'](this,_0x148cd2,_0xd607a5,_0x4ee96a,_0x1664f4);},Tilemap['Renderer'][_0x5eb334(0x63b)][_0x5eb334(0x1b6)]=function(){const _0x1187cf=_0x5eb334;this[_0x1187cf(0x382)]();for(let _0x5c85c4=0x0;_0x5c85c4<Tilemap[_0x1187cf(0x94b)]['MAX_GL_TEXTURES'];_0x5c85c4++){if('iBFys'==='iBFys'){const _0x557a8f=new PIXI[(_0x1187cf(0x773))]();_0x557a8f[_0x1187cf(0x4f9)](0x800,0x800);if(VisuMZ[_0x1187cf(0x541)][_0x1187cf(0x467)][_0x1187cf(0x70a)][_0x1187cf(0x623)]){if(_0x1187cf(0x8b9)===_0x1187cf(0x8b9))_0x557a8f['scaleMode']=PIXI['SCALE_MODES'][_0x1187cf(0x3d5)];else return _0x453e75[_0x1187cf(0x18b)]()?_0x262648[_0x1187cf(0x18b)]()['canUse'](_0x213025):_0x5d83d8['prototype']['isEnabled'][_0x1187cf(0x3e2)](this,_0x3a0567);}this[_0x1187cf(0x1f6)][_0x1187cf(0x6a4)](_0x557a8f);}else return _0x132ce7['CoreEngine'][_0x1187cf(0x48f)][_0x1187cf(0x3e2)](this,_0x5d739c,_0x557b38);}},WindowLayer[_0x5eb334(0x63b)]['isMaskingEnabled']=function(){const _0x513b27=_0x5eb334;if(SceneManager&&SceneManager[_0x513b27(0x984)])return'qlbGg'===_0x513b27(0x212)?SceneManager[_0x513b27(0x984)][_0x513b27(0x1df)]():_0x2ebb1a[_0x513b27(0x541)][_0x513b27(0x467)]['Window'][_0x513b27(0x3d4)];else{if('Ppdlg'===_0x513b27(0x7e5)){if(this['_CoreEngineSettings']===_0x32931a)this[_0x513b27(0x668)]();this['_CoreEngineSettings'][_0x513b27(0x398)]=this[_0x513b27(0x41a)]();}else return!![];}},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x45f)]=WindowLayer['prototype'][_0x5eb334(0x13d)],WindowLayer[_0x5eb334(0x63b)][_0x5eb334(0x13d)]=function render(_0x37cda1){const _0x3c3363=_0x5eb334;this[_0x3c3363(0x4d0)]()?VisuMZ['CoreEngine']['WindowLayer_render'][_0x3c3363(0x3e2)](this,_0x37cda1):_0x3c3363(0x2aa)===_0x3c3363(0x60d)?_0x18fd18[_0x3c3363(0x490)][_0x3c3363(0x9b9)](_0x54dcd4):this['renderNoMask'](_0x37cda1);},WindowLayer[_0x5eb334(0x63b)][_0x5eb334(0x3da)]=function render(_0xdbbcd6){const _0x333484=_0x5eb334;if(!this['visible'])return;const _0x711da8=new PIXI[(_0x333484(0x883))](),_0x2c09e2=_0xdbbcd6['gl'],_0x54d157=this['children']['clone']();_0xdbbcd6[_0x333484(0x652)][_0x333484(0x901)](),_0x711da8[_0x333484(0x8dd)]=this['transform'],_0xdbbcd6['batch'][_0x333484(0x19c)](),_0x2c09e2[_0x333484(0x40e)](_0x2c09e2['STENCIL_TEST']);while(_0x54d157[_0x333484(0x61b)]>0x0){if('LpPgs'!=='wyJXH'){const _0x4ef43f=_0x54d157[_0x333484(0x80d)]();_0x4ef43f[_0x333484(0x698)]&&_0x4ef43f['visible']&&_0x4ef43f[_0x333484(0x922)]>0x0&&(_0x2c09e2[_0x333484(0x65f)](_0x2c09e2[_0x333484(0x4b1)],0x0,~0x0),_0x2c09e2[_0x333484(0x5ce)](_0x2c09e2[_0x333484(0x1f2)],_0x2c09e2['KEEP'],_0x2c09e2[_0x333484(0x1f2)]),_0x4ef43f[_0x333484(0x13d)](_0xdbbcd6),_0xdbbcd6['batch'][_0x333484(0x19c)](),_0x711da8[_0x333484(0x961)](),_0x2c09e2[_0x333484(0x65f)](_0x2c09e2[_0x333484(0x2c2)],0x1,~0x0),_0x2c09e2[_0x333484(0x5ce)](_0x2c09e2[_0x333484(0x6f5)],_0x2c09e2[_0x333484(0x6f5)],_0x2c09e2[_0x333484(0x6f5)]),_0x2c09e2[_0x333484(0x87c)](_0x2c09e2[_0x333484(0x2cf)],_0x2c09e2[_0x333484(0x461)]),_0x711da8[_0x333484(0x13d)](_0xdbbcd6),_0xdbbcd6[_0x333484(0x822)][_0x333484(0x19c)](),_0x2c09e2[_0x333484(0x87c)](_0x2c09e2[_0x333484(0x461)],_0x2c09e2[_0x333484(0x6e8)]));}else this['drawSegment'](_0x156ab2);}_0x2c09e2['disable'](_0x2c09e2[_0x333484(0x971)]),_0x2c09e2[_0x333484(0x961)](_0x2c09e2[_0x333484(0x370)]),_0x2c09e2['clearStencil'](0x0),_0xdbbcd6[_0x333484(0x822)]['flush']();for(const _0x5b1770 of this[_0x333484(0x3ec)]){!_0x5b1770['_isWindow']&&_0x5b1770[_0x333484(0x1ad)]&&_0x5b1770['render'](_0xdbbcd6);}_0xdbbcd6[_0x333484(0x822)][_0x333484(0x19c)]();},DataManager['isKeyItem']=function(_0xc2851d){const _0x449f45=_0x5eb334;return this[_0x449f45(0x52c)](_0xc2851d)&&_0xc2851d['itypeId']===0x2;},VisuMZ['CoreEngine'][_0x5eb334(0x401)]=DataManager[_0x5eb334(0x3d7)],DataManager['setupNewGame']=function(){const _0x52365e=_0x5eb334;VisuMZ[_0x52365e(0x541)]['DataManager_setupNewGame'][_0x52365e(0x3e2)](this),this[_0x52365e(0x521)](),this[_0x52365e(0x1ac)]();},DataManager[_0x5eb334(0x521)]=function(){const _0x15c26d=_0x5eb334;if($gameTemp[_0x15c26d(0x96e)]()){const _0xe41dd=VisuMZ[_0x15c26d(0x541)][_0x15c26d(0x467)][_0x15c26d(0x70a)]['NewGameCommonEvent'];if(_0xe41dd>0x0)$gameTemp[_0x15c26d(0x6ec)](_0xe41dd);}},DataManager[_0x5eb334(0x1ac)]=function(){const _0x82ed20=_0x5eb334,_0x462ca6=VisuMZ['CoreEngine'][_0x82ed20(0x467)][_0x82ed20(0x70a)]['NewGameCommonEventAll']||0x0;if(_0x462ca6>0x0)$gameTemp[_0x82ed20(0x6ec)](_0x462ca6);},DataManager['createTroopNote']=function(_0x24549a){const _0xb60ff7=_0x5eb334,_0x4d3f96=$dataTroops[_0x24549a];if(!_0x4d3f96)return'';let _0x5a4424='';_0x5a4424+=_0x4d3f96[_0xb60ff7(0x536)];for(const _0x358c8a of _0x4d3f96[_0xb60ff7(0x758)]){for(const _0x3d59c2 of _0x358c8a[_0xb60ff7(0x41b)]){if(_0xb60ff7(0x1e2)!=='ZLVRD'){if(_0x5c8c08[_0xb60ff7(0x565)](_0xb60ff7(0x635))){var _0xd6f17f=_0x11efb1(_0xb60ff7(0x4a6))['Window'][_0xb60ff7(0x7c9)]();_0x59bb1d['showDevTools']();if(_0x15120d)_0x48fddd(_0xd6f17f['focus'][_0xb60ff7(0x1fa)](_0xd6f17f),0x190);}}else[0x6c,0x198][_0xb60ff7(0x8c8)](_0x3d59c2[_0xb60ff7(0x479)])&&('phNch'!=='NQtdR'?(_0x5a4424+='\x0a',_0x5a4424+=_0x3d59c2['parameters'][0x0]):this[_0xb60ff7(0x880)](_0x2f15c1));}}return _0x5a4424;};(VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)]['QoL'][_0x5eb334(0x372)]??!![])&&($scene=null,VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x523)]=Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x6f8)],Scene_Base['prototype']['create']=function(){const _0x15f4ba=_0x5eb334;VisuMZ[_0x15f4ba(0x541)]['Scene_Base_create'][_0x15f4ba(0x3e2)](this),$scene=this;},$spriteset=null,VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x455)]=Scene_Map['prototype'][_0x5eb334(0x49e)],Scene_Map[_0x5eb334(0x63b)][_0x5eb334(0x49e)]=function(){const _0x40dec8=_0x5eb334;VisuMZ[_0x40dec8(0x541)][_0x40dec8(0x455)][_0x40dec8(0x3e2)](this),$spriteset=this['_spriteset'];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x3db)]=Scene_Battle[_0x5eb334(0x63b)][_0x5eb334(0x49e)],Scene_Battle[_0x5eb334(0x63b)][_0x5eb334(0x49e)]=function(){const _0x5ea75e=_0x5eb334;VisuMZ[_0x5ea75e(0x541)]['Scene_Battle_createSpriteset']['call'](this),$spriteset=this[_0x5ea75e(0x3ca)];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x9b2)]=Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x7af)],Scene_Base[_0x5eb334(0x63b)]['terminate']=function(){const _0x30e567=_0x5eb334;VisuMZ[_0x30e567(0x541)][_0x30e567(0x9b2)][_0x30e567(0x3e2)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x730)]=BattleManager['update'],BattleManager[_0x5eb334(0x3c4)]=function(_0x4841ed){const _0x4b135f=_0x5eb334;VisuMZ[_0x4b135f(0x541)][_0x4b135f(0x730)][_0x4b135f(0x3e2)](this,_0x4841ed),$subject=this[_0x4b135f(0x15a)],$targets=this[_0x4b135f(0x33c)],$target=this[_0x4b135f(0x2eb)]||this['_targets'][0x0];},$event=null,VisuMZ[_0x5eb334(0x541)]['Game_Event_start']=Game_Event[_0x5eb334(0x63b)][_0x5eb334(0x8a8)],Game_Event[_0x5eb334(0x63b)][_0x5eb334(0x8a8)]=function(){const _0x43d054=_0x5eb334;VisuMZ['CoreEngine'][_0x43d054(0x57b)][_0x43d054(0x3e2)](this),$event=this;},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x3ab)]=Scene_Map[_0x5eb334(0x63b)]['update'],Scene_Map[_0x5eb334(0x63b)]['update']=function(){const _0x206b80=_0x5eb334;VisuMZ[_0x206b80(0x541)][_0x206b80(0x3ab)]['call'](this),$gameMap[_0x206b80(0x948)]();},Game_Map[_0x5eb334(0x63b)]['updateCurrentEvent']=function(){const _0x29e94d=_0x5eb334;if(!this[_0x29e94d(0x890)]()&&$event!==null){if(_0x29e94d(0x6aa)===_0x29e94d(0x6aa))$event=null;else{const _0x4adbc=_0x237dbc[_0x29e94d(0x2d9)],_0xc189af=0.5;if(_0x4adbc[0x0]<-_0xc189af)return!![];if(_0x4adbc[0x0]>_0xc189af)return!![];if(_0x4adbc[0x1]<-_0xc189af)return!![];if(_0x4adbc[0x1]>_0xc189af)return!![];return![];}}},$commonEvent=function(_0x5079d2){const _0x53e099=_0x5eb334;if($gameTemp)$gameTemp[_0x53e099(0x6ec)](_0x5079d2);},$onceParallel=function(_0x25bdf0){const _0x49d6cd=_0x5eb334;if(SceneManager['isSceneMap']())$scene[_0x49d6cd(0x23d)](_0x25bdf0);else{if(SceneManager[_0x49d6cd(0x797)]()){if(Imported[_0x49d6cd(0x53d)])$scene[_0x49d6cd(0x23d)](_0x25bdf0);else $gameTemp&&$gameTemp[_0x49d6cd(0x96e)]()&&(_0x49d6cd(0x71a)!==_0x49d6cd(0x415)?alert(_0x49d6cd(0x7b0)):0x1-this['itemEva'](_0x2cc32b)>this['itemHit'](_0x1a0069)&&(_0x5ba372[_0x49d6cd(0x814)]=![],_0x165c0a[_0x49d6cd(0x14e)]=!![]));}else{if($gameTemp&&$gameTemp['isPlaytest']()){if(_0x49d6cd(0x577)===_0x49d6cd(0x577))alert('This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!');else{const _0x3f9534=_0x51206d['shift']();_0x3f9534['_isWindow']&&_0x3f9534[_0x49d6cd(0x1ad)]&&_0x3f9534[_0x49d6cd(0x922)]>0x0&&(_0x376d6a[_0x49d6cd(0x65f)](_0x3ca705[_0x49d6cd(0x4b1)],0x0,~0x0),_0x3b1e7d['stencilOp'](_0xc46163[_0x49d6cd(0x1f2)],_0x4b48ac[_0x49d6cd(0x1f2)],_0x5e2d77[_0x49d6cd(0x1f2)]),_0x3f9534[_0x49d6cd(0x13d)](_0x890018),_0x41c1ea['batch'][_0x49d6cd(0x19c)](),_0xf9b2dc[_0x49d6cd(0x961)](),_0xa4c4c[_0x49d6cd(0x65f)](_0x21eb5f[_0x49d6cd(0x2c2)],0x1,~0x0),_0x20ca22[_0x49d6cd(0x5ce)](_0x5990ff[_0x49d6cd(0x6f5)],_0x3e8bda[_0x49d6cd(0x6f5)],_0x195d58['REPLACE']),_0x4673c3[_0x49d6cd(0x87c)](_0x488b69[_0x49d6cd(0x2cf)],_0x17a9cd[_0x49d6cd(0x461)]),_0x17d4cf['render'](_0x263fa3),_0x17cd1d[_0x49d6cd(0x822)][_0x49d6cd(0x19c)](),_0x459e79['blendFunc'](_0x15d321[_0x49d6cd(0x461)],_0x7526ce[_0x49d6cd(0x6e8)]));}}}}});;StorageManager[_0x5eb334(0x751)]=function(_0x53ac62){return new Promise((_0x4617d8,_0x23ab6f)=>{const _0x5aee15=_0xd3e4;if('azhbw'!==_0x5aee15(0x1ae))return 0x0;else try{if('zRAdI'==='zRAdI'){const _0x26f9be=pako[_0x5aee15(0x64b)](_0x53ac62,{'to':_0x5aee15(0x764),'level':0x1});if(_0x26f9be[_0x5aee15(0x61b)]>=0xc350){}_0x4617d8(_0x26f9be);}else this[_0x5aee15(0x93c)](_0x5aee15(0x1dc));}catch(_0xe25918){if('cICKa'===_0x5aee15(0x8e9)){if(_0x8d95b&&_0x5bf20f[_0x5aee15(0x9a0)]())return;_0x3172df[_0x5aee15(0x541)][_0x5aee15(0x957)]['call'](this,_0x19a0dc,_0x473771,_0x4696d6,_0x5a6e3e);}else _0x23ab6f(_0xe25918);}});},TextManager[_0x5eb334(0x960)]=['','','','CANCEL','','',_0x5eb334(0x589),'',_0x5eb334(0x83c),_0x5eb334(0x6a8),'','',_0x5eb334(0x944),_0x5eb334(0x840),_0x5eb334(0x3c7),'',_0x5eb334(0x43a),_0x5eb334(0x449),_0x5eb334(0x18a),_0x5eb334(0x7a0),'CAPSLOCK',_0x5eb334(0x441),_0x5eb334(0x347),'JUNJA',_0x5eb334(0x274),'HANJA','','ESC',_0x5eb334(0x4b5),_0x5eb334(0x9be),'ACCEPT',_0x5eb334(0x437),'SPACE',_0x5eb334(0x504),_0x5eb334(0x75c),_0x5eb334(0x527),'HOME','LEFT','UP',_0x5eb334(0x89f),_0x5eb334(0x596),'SELECT',_0x5eb334(0x65e),_0x5eb334(0x3c0),_0x5eb334(0x54f),_0x5eb334(0x4d4),_0x5eb334(0x7df),'','0','1','2','3','4','5','6','7','8','9','COLON',_0x5eb334(0x68e),_0x5eb334(0x7fb),'EQUALS',_0x5eb334(0x442),_0x5eb334(0x7c6),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x5eb334(0x56f),'',_0x5eb334(0x67a),'','SLEEP',_0x5eb334(0x920),_0x5eb334(0x3aa),_0x5eb334(0x380),'NUMPAD3',_0x5eb334(0x3ae),_0x5eb334(0x6d0),_0x5eb334(0x1f4),'NUMPAD7','NUMPAD8',_0x5eb334(0x7b7),_0x5eb334(0x23c),_0x5eb334(0x785),'SEPARATOR',_0x5eb334(0x18e),_0x5eb334(0x276),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x5eb334(0x17b),_0x5eb334(0x84e),_0x5eb334(0x62e),_0x5eb334(0x66b),_0x5eb334(0x246),_0x5eb334(0x374),_0x5eb334(0x6ad),_0x5eb334(0x50d),_0x5eb334(0x6d3),'F19',_0x5eb334(0x39d),_0x5eb334(0x6ff),_0x5eb334(0x690),_0x5eb334(0x879),'F24','','','','','','','','','NUM_LOCK','SCROLL_LOCK','WIN_OEM_FJ_JISHO',_0x5eb334(0x23b),_0x5eb334(0x85d),_0x5eb334(0x952),'WIN_OEM_FJ_ROYA','','','','','','','','','','CIRCUMFLEX',_0x5eb334(0x95c),'DOUBLE_QUOTE',_0x5eb334(0x488),_0x5eb334(0x660),'PERCENT',_0x5eb334(0x1b4),_0x5eb334(0x26c),_0x5eb334(0x20e),_0x5eb334(0x804),_0x5eb334(0x816),'PLUS',_0x5eb334(0x8a3),_0x5eb334(0x13c),_0x5eb334(0x9ae),'CLOSE_CURLY_BRACKET','TILDE','','','','',_0x5eb334(0x26f),_0x5eb334(0x6b0),_0x5eb334(0x1cc),'','',_0x5eb334(0x68e),_0x5eb334(0x8ae),_0x5eb334(0x17e),_0x5eb334(0x58e),'PERIOD',_0x5eb334(0x849),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x5eb334(0x85a),_0x5eb334(0x72d),_0x5eb334(0x157),_0x5eb334(0x788),'',_0x5eb334(0x15f),_0x5eb334(0x448),'','WIN_ICO_HELP',_0x5eb334(0x28b),'',_0x5eb334(0x8cd),'','',_0x5eb334(0x79a),'WIN_OEM_JUMP',_0x5eb334(0x7d8),'WIN_OEM_PA2',_0x5eb334(0x67f),_0x5eb334(0x53f),'WIN_OEM_CUSEL',_0x5eb334(0x6c7),_0x5eb334(0x3d0),_0x5eb334(0x5ee),_0x5eb334(0x3bf),_0x5eb334(0x37a),_0x5eb334(0x7d4),'ATTN',_0x5eb334(0x3ee),_0x5eb334(0x670),_0x5eb334(0x5a3),_0x5eb334(0x497),_0x5eb334(0x575),'',_0x5eb334(0x5ff),'WIN_OEM_CLEAR',''],TextManager[_0x5eb334(0x583)]=VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)][_0x5eb334(0x755)][_0x5eb334(0x360)],TextManager[_0x5eb334(0x207)]=VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)][_0x5eb334(0x755)][_0x5eb334(0x39a)],TextManager[_0x5eb334(0x411)]=VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)]['ButtonAssist']['SwitchActorText'],VisuMZ['CoreEngine'][_0x5eb334(0x7a9)]=TextManager[_0x5eb334(0x947)],TextManager[_0x5eb334(0x947)]=function(_0xbbe5df){const _0x2441c5=_0x5eb334;if(typeof _0xbbe5df===_0x2441c5(0x657)){if(_0x2441c5(0x298)!==_0x2441c5(0x298))this[_0x2441c5(0x25f)]();else return VisuMZ[_0x2441c5(0x541)]['TextManager_param'][_0x2441c5(0x3e2)](this,_0xbbe5df);}else{if('nrhCZ'===_0x2441c5(0x7da))return this[_0x2441c5(0x592)](_0xbbe5df);else this['_dimmerSprite']=new _0x412c88(),this['_dimmerSprite'][_0x2441c5(0x83b)]=new _0x5442e2(0x0,0x0),this['_dimmerSprite']['x']=0x0,this['addChildToBack'](this[_0x2441c5(0x5aa)]);}},TextManager[_0x5eb334(0x592)]=function(_0x4cdf22){const _0x2e2d42=_0x5eb334;_0x4cdf22=String(_0x4cdf22||'')['toUpperCase']();const _0xb14a01=VisuMZ['CoreEngine'][_0x2e2d42(0x467)][_0x2e2d42(0x6f3)];if(_0x4cdf22===_0x2e2d42(0x550))return $dataSystem[_0x2e2d42(0x3e3)][_0x2e2d42(0x823)][0x0];if(_0x4cdf22==='MAXMP')return $dataSystem['terms'][_0x2e2d42(0x823)][0x1];if(_0x4cdf22==='ATK')return $dataSystem[_0x2e2d42(0x3e3)][_0x2e2d42(0x823)][0x2];if(_0x4cdf22===_0x2e2d42(0x629))return $dataSystem[_0x2e2d42(0x3e3)]['params'][0x3];if(_0x4cdf22==='MAT')return $dataSystem[_0x2e2d42(0x3e3)]['params'][0x4];if(_0x4cdf22===_0x2e2d42(0x6d1))return $dataSystem[_0x2e2d42(0x3e3)][_0x2e2d42(0x823)][0x5];if(_0x4cdf22==='AGI')return $dataSystem['terms']['params'][0x6];if(_0x4cdf22===_0x2e2d42(0x83a))return $dataSystem[_0x2e2d42(0x3e3)][_0x2e2d42(0x823)][0x7];if(_0x4cdf22==='HIT')return _0xb14a01[_0x2e2d42(0x593)];if(_0x4cdf22===_0x2e2d42(0x238))return _0xb14a01[_0x2e2d42(0x399)];if(_0x4cdf22===_0x2e2d42(0x691))return _0xb14a01['XParamVocab2'];if(_0x4cdf22===_0x2e2d42(0x34c))return _0xb14a01[_0x2e2d42(0x737)];if(_0x4cdf22==='MEV')return _0xb14a01[_0x2e2d42(0x46d)];if(_0x4cdf22===_0x2e2d42(0x992))return _0xb14a01[_0x2e2d42(0x229)];if(_0x4cdf22===_0x2e2d42(0x5a6))return _0xb14a01[_0x2e2d42(0x999)];if(_0x4cdf22===_0x2e2d42(0x774))return _0xb14a01[_0x2e2d42(0x369)];if(_0x4cdf22==='MRG')return _0xb14a01[_0x2e2d42(0x686)];if(_0x4cdf22===_0x2e2d42(0x195))return _0xb14a01[_0x2e2d42(0x348)];if(_0x4cdf22===_0x2e2d42(0x189))return _0xb14a01['SParamVocab0'];if(_0x4cdf22==='GRD')return _0xb14a01[_0x2e2d42(0x768)];if(_0x4cdf22===_0x2e2d42(0x1a4))return _0xb14a01[_0x2e2d42(0x2cb)];if(_0x4cdf22===_0x2e2d42(0x482))return _0xb14a01[_0x2e2d42(0x47d)];if(_0x4cdf22===_0x2e2d42(0x96f))return _0xb14a01['SParamVocab4'];if(_0x4cdf22===_0x2e2d42(0x701))return _0xb14a01[_0x2e2d42(0x916)];if(_0x4cdf22===_0x2e2d42(0x291))return _0xb14a01[_0x2e2d42(0x4b0)];if(_0x4cdf22===_0x2e2d42(0x60b))return _0xb14a01[_0x2e2d42(0x349)];if(_0x4cdf22===_0x2e2d42(0x64c))return _0xb14a01['SParamVocab8'];if(_0x4cdf22===_0x2e2d42(0x366))return _0xb14a01[_0x2e2d42(0x68b)];if(VisuMZ[_0x2e2d42(0x541)][_0x2e2d42(0x389)][_0x4cdf22]){if(_0x2e2d42(0x168)!=='MHcTz')return VisuMZ[_0x2e2d42(0x541)][_0x2e2d42(0x389)][_0x4cdf22];else _0x3eb221(_0x2e2d42(0x7b0));}return'';},TextManager[_0x5eb334(0x273)]=function(_0x4d9ec3){const _0x5d3c63=_0x5eb334,_0x3e08c4=Input[_0x5d3c63(0x98c)]();if(_0x3e08c4===_0x5d3c63(0x16c))return this[_0x5d3c63(0x869)](_0x4d9ec3);else{if(_0x5d3c63(0x47b)!=='XIIIF')_0x4bd3bb=_0x44dfef['round'](_0x1ef064),_0x26f2ce=_0xefa35f['round'](_0x331659),_0x4c8920=_0x4bdaf8[_0x5d3c63(0x811)](_0x4a9346),_0x23c35a=_0x15db22[_0x5d3c63(0x811)](_0x5232e1),_0x599034[_0x5d3c63(0x541)][_0x5d3c63(0x7f4)]['call'](this,_0x2dc0d3,_0xaaa47b,_0x5030cf,_0x1b94fb,_0x4cf418,_0x35a066),this[_0x5d3c63(0x27d)]();else return this[_0x5d3c63(0x149)](_0x3e08c4,_0x4d9ec3);}},TextManager['getKeyboardInputButtonString']=function(_0x5be778){const _0xfb269c=_0x5eb334;if(_0x5be778===_0xfb269c(0x430))_0x5be778=_0xfb269c(0x539);if(_0x5be778===_0xfb269c(0x324))_0x5be778=_0xfb269c(0x539);let _0x101a18=[];for(let _0x553e4d in Input[_0xfb269c(0x5ad)]){if(_0xfb269c(0x2ae)!==_0xfb269c(0x476)){_0x553e4d=Number(_0x553e4d);if(_0x553e4d>=0x60&&_0x553e4d<=0x69)continue;if([0x12,0x20][_0xfb269c(0x8c8)](_0x553e4d))continue;_0x5be778===Input['keyMapper'][_0x553e4d]&&_0x101a18[_0xfb269c(0x6a4)](_0x553e4d);}else _0x51e103[_0xfb269c(0x541)][_0xfb269c(0x78b)][_0xfb269c(0x3e2)](this),this['setCoreEngineUpdateWindowBg']();}for(let _0x2e6d11=0x0;_0x2e6d11<_0x101a18['length'];_0x2e6d11++){if('QKSXe'!==_0xfb269c(0x608)){const _0x24ee1f=_0x4485cb[_0xfb269c(0x541)][_0xfb269c(0x467)][_0xfb269c(0x8cb)][_0x21df38],_0x57c511='img/%1/'[_0xfb269c(0x1ce)](_0x74d53c);for(const _0x54c907 of _0x24ee1f){_0x58df6c['loadBitmap'](_0x57c511,_0x54c907);}}else _0x101a18[_0x2e6d11]=TextManager[_0xfb269c(0x960)][_0x101a18[_0x2e6d11]];}return this[_0xfb269c(0x2ab)](_0x101a18);},TextManager['makeInputButtonString']=function(_0x5ed407){const _0x392c8f=_0x5eb334,_0x1815f6=VisuMZ[_0x392c8f(0x541)][_0x392c8f(0x467)][_0x392c8f(0x755)],_0x3ece86=_0x1815f6[_0x392c8f(0x6f0)],_0x37dd63=_0x5ed407['pop'](),_0x57fc22='Key%1'[_0x392c8f(0x1ce)](_0x37dd63);return _0x1815f6[_0x57fc22]?_0x1815f6[_0x57fc22]:_0x3ece86[_0x392c8f(0x1ce)](_0x37dd63);},TextManager['getInputMultiButtonStrings']=function(_0x43af97,_0x149a8c){const _0x330f07=_0x5eb334,_0x28caf0=VisuMZ[_0x330f07(0x541)][_0x330f07(0x467)][_0x330f07(0x755)],_0x34ac2e=_0x28caf0[_0x330f07(0x371)],_0x3a8745=this[_0x330f07(0x273)](_0x43af97),_0x6868a2=this[_0x330f07(0x273)](_0x149a8c);return _0x34ac2e[_0x330f07(0x1ce)](_0x3a8745,_0x6868a2);},TextManager[_0x5eb334(0x149)]=function(_0x462bae,_0x3489e8){const _0x26089d=_0x5eb334,_0x44aa31=_0x462bae[_0x26089d(0x367)]()[_0x26089d(0x4f1)](),_0x3715f8=VisuMZ[_0x26089d(0x541)][_0x26089d(0x969)][_0x44aa31];if(!_0x3715f8)return this[_0x26089d(0x528)](_0x462bae,_0x3489e8);return _0x3715f8[_0x3489e8]||this[_0x26089d(0x869)](_0x462bae,_0x3489e8);},TextManager[_0x5eb334(0x528)]=function(_0x563fc5,_0x705608){const _0x1e727e=_0x5eb334,_0x56ac15=_0x563fc5[_0x1e727e(0x367)]()[_0x1e727e(0x4f1)]();for(const _0x2a357b in VisuMZ[_0x1e727e(0x541)][_0x1e727e(0x69e)]){if(_0x56ac15[_0x1e727e(0x8c8)](_0x2a357b)){const _0x220213=VisuMZ['CoreEngine'][_0x1e727e(0x69e)][_0x2a357b],_0x78e0a0=VisuMZ[_0x1e727e(0x541)]['ControllerButtons'][_0x220213];return _0x78e0a0[_0x705608]||this['getKeyboardInputButtonString'](_0x705608);}}return this['getKeyboardInputButtonString'](_0x705608);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x14c)]=ColorManager[_0x5eb334(0x335)],ColorManager[_0x5eb334(0x335)]=function(){const _0x2d3469=_0x5eb334;VisuMZ[_0x2d3469(0x541)][_0x2d3469(0x14c)][_0x2d3469(0x3e2)](this),this[_0x2d3469(0x318)]=this['_colorCache']||{};},ColorManager['getColorDataFromPluginParameters']=function(_0xa6d973,_0x5e904b){const _0x487d83=_0x5eb334;return _0x5e904b=String(_0x5e904b),this[_0x487d83(0x318)]=this['_colorCache']||{},_0x5e904b[_0x487d83(0x6c9)](/#(.*)/i)?this[_0x487d83(0x318)][_0xa6d973]=_0x487d83(0x780)[_0x487d83(0x1ce)](String(RegExp['$1'])):this[_0x487d83(0x318)][_0xa6d973]=this['textColor'](Number(_0x5e904b)),this[_0x487d83(0x318)][_0xa6d973];},ColorManager['getColor']=function(_0x24bf06){const _0x2866c7=_0x5eb334;return _0x24bf06=String(_0x24bf06),_0x24bf06[_0x2866c7(0x6c9)](/#(.*)/i)?_0x2866c7(0x780)['format'](String(RegExp['$1'])):this[_0x2866c7(0x949)](Number(_0x24bf06));},ColorManager['clearCachedKeys']=function(){const _0x369eff=_0x5eb334;this[_0x369eff(0x318)]={};},ColorManager[_0x5eb334(0x742)]=function(){const _0x8304fd=_0x5eb334,_0x5d5746=_0x8304fd(0x923);this[_0x8304fd(0x318)]=this[_0x8304fd(0x318)]||{};if(this[_0x8304fd(0x318)][_0x5d5746])return this[_0x8304fd(0x318)][_0x5d5746];const _0x4b937a=VisuMZ[_0x8304fd(0x541)][_0x8304fd(0x467)][_0x8304fd(0x5fe)][_0x8304fd(0x47e)];return this['getColorDataFromPluginParameters'](_0x5d5746,_0x4b937a);},ColorManager[_0x5eb334(0x73d)]=function(){const _0x3c5770=_0x5eb334,_0x545d76=_0x3c5770(0x614);this[_0x3c5770(0x318)]=this[_0x3c5770(0x318)]||{};if(this[_0x3c5770(0x318)][_0x545d76])return this[_0x3c5770(0x318)][_0x545d76];const _0x4ad10d=VisuMZ[_0x3c5770(0x541)]['Settings']['Color'][_0x3c5770(0x95f)];return this[_0x3c5770(0x32d)](_0x545d76,_0x4ad10d);},ColorManager[_0x5eb334(0x515)]=function(){const _0x5e2a1d=_0x5eb334,_0x23b9ef=_0x5e2a1d(0x416);this['_colorCache']=this[_0x5e2a1d(0x318)]||{};if(this['_colorCache'][_0x23b9ef])return this[_0x5e2a1d(0x318)][_0x23b9ef];const _0x53ead0=VisuMZ[_0x5e2a1d(0x541)][_0x5e2a1d(0x467)][_0x5e2a1d(0x5fe)][_0x5e2a1d(0x53b)];return this['getColorDataFromPluginParameters'](_0x23b9ef,_0x53ead0);},ColorManager[_0x5eb334(0x2c6)]=function(){const _0x18a38d=_0x5eb334,_0x576764=_0x18a38d(0x4da);this['_colorCache']=this[_0x18a38d(0x318)]||{};if(this[_0x18a38d(0x318)][_0x576764])return this[_0x18a38d(0x318)][_0x576764];const _0x45337e=VisuMZ[_0x18a38d(0x541)]['Settings'][_0x18a38d(0x5fe)]['ColorDeath'];return this[_0x18a38d(0x32d)](_0x576764,_0x45337e);},ColorManager[_0x5eb334(0x620)]=function(){const _0x1e2529=_0x5eb334,_0x283be0='_stored_gaugeBackColor';this[_0x1e2529(0x318)]=this[_0x1e2529(0x318)]||{};if(this[_0x1e2529(0x318)][_0x283be0])return this[_0x1e2529(0x318)][_0x283be0];const _0x124730=VisuMZ[_0x1e2529(0x541)][_0x1e2529(0x467)][_0x1e2529(0x5fe)][_0x1e2529(0x333)];return this['getColorDataFromPluginParameters'](_0x283be0,_0x124730);},ColorManager[_0x5eb334(0x2f0)]=function(){const _0x56ef9a=_0x5eb334,_0x4e736f=_0x56ef9a(0x1e7);this[_0x56ef9a(0x318)]=this['_colorCache']||{};if(this[_0x56ef9a(0x318)][_0x4e736f])return this[_0x56ef9a(0x318)][_0x4e736f];const _0x1c01f8=VisuMZ[_0x56ef9a(0x541)][_0x56ef9a(0x467)][_0x56ef9a(0x5fe)][_0x56ef9a(0x6c4)];return this[_0x56ef9a(0x32d)](_0x4e736f,_0x1c01f8);},ColorManager[_0x5eb334(0x4a0)]=function(){const _0x546cd6=_0x5eb334,_0x368ee9=_0x546cd6(0x396);this[_0x546cd6(0x318)]=this[_0x546cd6(0x318)]||{};if(this[_0x546cd6(0x318)][_0x368ee9])return this['_colorCache'][_0x368ee9];const _0x2ab201=VisuMZ[_0x546cd6(0x541)][_0x546cd6(0x467)]['Color'][_0x546cd6(0x966)];return this['getColorDataFromPluginParameters'](_0x368ee9,_0x2ab201);},ColorManager[_0x5eb334(0x2e4)]=function(){const _0x436503=_0x5eb334,_0x2311bc=_0x436503(0x834);this['_colorCache']=this['_colorCache']||{};if(this[_0x436503(0x318)][_0x2311bc])return this[_0x436503(0x318)][_0x2311bc];const _0x49bc57=VisuMZ[_0x436503(0x541)][_0x436503(0x467)][_0x436503(0x5fe)][_0x436503(0x6db)];return this[_0x436503(0x32d)](_0x2311bc,_0x49bc57);},ColorManager[_0x5eb334(0x73f)]=function(){const _0xa9b087=_0x5eb334,_0x18866a=_0xa9b087(0x17f);this[_0xa9b087(0x318)]=this[_0xa9b087(0x318)]||{};if(this[_0xa9b087(0x318)][_0x18866a])return this['_colorCache'][_0x18866a];const _0x362916=VisuMZ[_0xa9b087(0x541)][_0xa9b087(0x467)]['Color'][_0xa9b087(0x344)];return this['getColorDataFromPluginParameters'](_0x18866a,_0x362916);},ColorManager[_0x5eb334(0x143)]=function(){const _0x5a9895=_0x5eb334,_0x59bdf8=_0x5a9895(0x585);this[_0x5a9895(0x318)]=this['_colorCache']||{};if(this[_0x5a9895(0x318)][_0x59bdf8])return this[_0x5a9895(0x318)][_0x59bdf8];const _0x461011=VisuMZ[_0x5a9895(0x541)][_0x5a9895(0x467)]['Color'][_0x5a9895(0x5f7)];return this['getColorDataFromPluginParameters'](_0x59bdf8,_0x461011);},ColorManager['powerUpColor']=function(){const _0x2e0577=_0x5eb334,_0x945d68=_0x2e0577(0x5b8);this[_0x2e0577(0x318)]=this[_0x2e0577(0x318)]||{};if(this[_0x2e0577(0x318)][_0x945d68])return this['_colorCache'][_0x945d68];const _0x510ff1=VisuMZ['CoreEngine']['Settings'][_0x2e0577(0x5fe)][_0x2e0577(0x8ef)];return this[_0x2e0577(0x32d)](_0x945d68,_0x510ff1);},ColorManager[_0x5eb334(0x985)]=function(){const _0x5e4e95=_0x5eb334,_0xcd872d=_0x5e4e95(0x4f2);this[_0x5e4e95(0x318)]=this[_0x5e4e95(0x318)]||{};if(this[_0x5e4e95(0x318)][_0xcd872d])return this[_0x5e4e95(0x318)][_0xcd872d];const _0x51ec16=VisuMZ[_0x5e4e95(0x541)][_0x5e4e95(0x467)][_0x5e4e95(0x5fe)][_0x5e4e95(0x429)];return this[_0x5e4e95(0x32d)](_0xcd872d,_0x51ec16);},ColorManager['ctGaugeColor1']=function(){const _0x360854=_0x5eb334,_0x3b5ada=_0x360854(0x3fb);this[_0x360854(0x318)]=this['_colorCache']||{};if(this[_0x360854(0x318)][_0x3b5ada])return this[_0x360854(0x318)][_0x3b5ada];const _0x6371a0=VisuMZ[_0x360854(0x541)][_0x360854(0x467)]['Color'][_0x360854(0x5da)];return this[_0x360854(0x32d)](_0x3b5ada,_0x6371a0);},ColorManager['ctGaugeColor2']=function(){const _0x1f58ec=_0x5eb334,_0x14f423=_0x1f58ec(0x99a);this[_0x1f58ec(0x318)]=this['_colorCache']||{};if(this[_0x1f58ec(0x318)][_0x14f423])return this[_0x1f58ec(0x318)][_0x14f423];const _0x1acf20=VisuMZ['CoreEngine'][_0x1f58ec(0x467)][_0x1f58ec(0x5fe)][_0x1f58ec(0x173)];return this[_0x1f58ec(0x32d)](_0x14f423,_0x1acf20);},ColorManager[_0x5eb334(0x37e)]=function(){const _0x5bdd6e=_0x5eb334,_0x5145df=_0x5bdd6e(0x4fb);this['_colorCache']=this[_0x5bdd6e(0x318)]||{};if(this['_colorCache'][_0x5145df])return this[_0x5bdd6e(0x318)][_0x5145df];const _0x3c4735=VisuMZ[_0x5bdd6e(0x541)][_0x5bdd6e(0x467)][_0x5bdd6e(0x5fe)][_0x5bdd6e(0x5e9)];return this[_0x5bdd6e(0x32d)](_0x5145df,_0x3c4735);},ColorManager[_0x5eb334(0x248)]=function(){const _0x3a0261=_0x5eb334,_0x31b711=_0x3a0261(0x306);this['_colorCache']=this['_colorCache']||{};if(this[_0x3a0261(0x318)][_0x31b711])return this[_0x3a0261(0x318)][_0x31b711];const _0x2248fd=VisuMZ[_0x3a0261(0x541)][_0x3a0261(0x467)]['Color'][_0x3a0261(0x61a)];return this[_0x3a0261(0x32d)](_0x31b711,_0x2248fd);},ColorManager[_0x5eb334(0x219)]=function(){const _0x3581a1=_0x5eb334,_0xcd6bc7=_0x3581a1(0x950);this[_0x3581a1(0x318)]=this[_0x3581a1(0x318)]||{};if(this[_0x3581a1(0x318)][_0xcd6bc7])return this[_0x3581a1(0x318)][_0xcd6bc7];const _0xe92fae=VisuMZ['CoreEngine'][_0x3581a1(0x467)][_0x3581a1(0x5fe)]['ColorTPCost'];return this[_0x3581a1(0x32d)](_0xcd6bc7,_0xe92fae);},ColorManager['pendingColor']=function(){const _0x55a373=_0x5eb334,_0xb86102=_0x55a373(0x98b);this[_0x55a373(0x318)]=this[_0x55a373(0x318)]||{};if(this[_0x55a373(0x318)][_0xb86102])return this[_0x55a373(0x318)][_0xb86102];const _0x3c8287=VisuMZ[_0x55a373(0x541)][_0x55a373(0x467)][_0x55a373(0x5fe)]['ColorTPCost'];return this[_0x55a373(0x32d)](_0xb86102,_0x3c8287);},ColorManager[_0x5eb334(0x986)]=function(){const _0x26f360=_0x5eb334,_0x26e6ea=_0x26f360(0x65d);this[_0x26f360(0x318)]=this[_0x26f360(0x318)]||{};if(this[_0x26f360(0x318)][_0x26e6ea])return this[_0x26f360(0x318)][_0x26e6ea];const _0x5a8f54=VisuMZ[_0x26f360(0x541)][_0x26f360(0x467)][_0x26f360(0x5fe)][_0x26f360(0x6ed)];return this[_0x26f360(0x32d)](_0x26e6ea,_0x5a8f54);},ColorManager[_0x5eb334(0x146)]=function(){const _0x1b37d5=_0x5eb334,_0x41a1d6=_0x1b37d5(0x85e);this[_0x1b37d5(0x318)]=this[_0x1b37d5(0x318)]||{};if(this[_0x1b37d5(0x318)][_0x41a1d6])return this[_0x1b37d5(0x318)][_0x41a1d6];const _0x1481d7=VisuMZ[_0x1b37d5(0x541)]['Settings'][_0x1b37d5(0x5fe)][_0x1b37d5(0x313)];return this[_0x1b37d5(0x32d)](_0x41a1d6,_0x1481d7);},ColorManager[_0x5eb334(0x4ba)]=function(){const _0xa05580=_0x5eb334,_0x556ba9=_0xa05580(0x5c0);this['_colorCache']=this[_0xa05580(0x318)]||{};if(this[_0xa05580(0x318)][_0x556ba9])return this[_0xa05580(0x318)][_0x556ba9];const _0x2401b4=VisuMZ[_0xa05580(0x541)]['Settings'][_0xa05580(0x5fe)]['ColorMaxLvGauge1'];return this['getColorDataFromPluginParameters'](_0x556ba9,_0x2401b4);},ColorManager[_0x5eb334(0x443)]=function(){const _0x1872b3=_0x5eb334,_0x1585a7=_0x1872b3(0x76b);this[_0x1872b3(0x318)]=this[_0x1872b3(0x318)]||{};if(this[_0x1872b3(0x318)][_0x1585a7])return this[_0x1872b3(0x318)][_0x1585a7];const _0x4611e1=VisuMZ[_0x1872b3(0x541)][_0x1872b3(0x467)][_0x1872b3(0x5fe)][_0x1872b3(0x59f)];return this[_0x1872b3(0x32d)](_0x1585a7,_0x4611e1);},ColorManager[_0x5eb334(0x22a)]=function(_0x8cab39){const _0x5a1fc5=_0x5eb334;return VisuMZ[_0x5a1fc5(0x541)][_0x5a1fc5(0x467)][_0x5a1fc5(0x5fe)][_0x5a1fc5(0x175)][_0x5a1fc5(0x3e2)](this,_0x8cab39);},ColorManager[_0x5eb334(0x150)]=function(_0x3e128c){const _0x282087=_0x5eb334;return VisuMZ[_0x282087(0x541)][_0x282087(0x467)][_0x282087(0x5fe)]['ActorMPColor'][_0x282087(0x3e2)](this,_0x3e128c);},ColorManager[_0x5eb334(0x911)]=function(_0x22d0be){const _0x4420bb=_0x5eb334;return VisuMZ[_0x4420bb(0x541)][_0x4420bb(0x467)][_0x4420bb(0x5fe)][_0x4420bb(0x5d7)]['call'](this,_0x22d0be);},ColorManager[_0x5eb334(0x24a)]=function(_0xd606b0){const _0x3e86bf=_0x5eb334;return VisuMZ['CoreEngine'][_0x3e86bf(0x467)][_0x3e86bf(0x5fe)][_0x3e86bf(0x7db)][_0x3e86bf(0x3e2)](this,_0xd606b0);},ColorManager[_0x5eb334(0x47f)]=function(_0x5cfa48){const _0x4ad407=_0x5eb334;return VisuMZ[_0x4ad407(0x541)][_0x4ad407(0x467)][_0x4ad407(0x5fe)]['DamageColor']['call'](this,_0x5cfa48);},ColorManager['outlineColor']=function(){const _0x7fa7da=_0x5eb334;return VisuMZ[_0x7fa7da(0x541)]['Settings']['Color'][_0x7fa7da(0x70f)];},ColorManager[_0x5eb334(0x426)]=function(){const _0x572fc9=_0x5eb334;return VisuMZ[_0x572fc9(0x541)][_0x572fc9(0x467)]['Color'][_0x572fc9(0x7f7)]||_0x572fc9(0x8bc);},ColorManager[_0x5eb334(0x8a9)]=function(){const _0x1ec5e9=_0x5eb334;return VisuMZ[_0x1ec5e9(0x541)][_0x1ec5e9(0x467)][_0x1ec5e9(0x5fe)][_0x1ec5e9(0x7e6)]||'rgba(0,\x200,\x200,\x201.0)';},ColorManager[_0x5eb334(0x16a)]=function(){const _0x4e9422=_0x5eb334;return VisuMZ['CoreEngine'][_0x4e9422(0x467)][_0x4e9422(0x5fe)]['DimColor1'];},ColorManager[_0x5eb334(0x58c)]=function(){const _0x17f41c=_0x5eb334;return VisuMZ['CoreEngine'][_0x17f41c(0x467)][_0x17f41c(0x5fe)][_0x17f41c(0x290)];},ColorManager[_0x5eb334(0x6c2)]=function(){const _0x26bcf4=_0x5eb334;return VisuMZ[_0x26bcf4(0x541)][_0x26bcf4(0x467)]['Color']['ItemBackColor1'];},ColorManager[_0x5eb334(0x1eb)]=function(){const _0x5619aa=_0x5eb334;return VisuMZ[_0x5619aa(0x541)]['Settings'][_0x5619aa(0x5fe)]['ItemBackColor2'];},SceneManager['_storedStack']=[],SceneManager['isSceneBattle']=function(){const _0xe8322c=_0x5eb334;return this['_scene']&&this[_0xe8322c(0x984)][_0xe8322c(0x62a)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x52f0e2=_0x5eb334;return this[_0x52f0e2(0x984)]&&this[_0x52f0e2(0x984)]['constructor']===Scene_Map;},SceneManager[_0x5eb334(0x715)]=function(){const _0x32d595=_0x5eb334;return this['_scene']&&this[_0x32d595(0x984)]instanceof Scene_Map;},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x604)]=SceneManager[_0x5eb334(0x1e1)],SceneManager['initialize']=function(){const _0x43e4a5=_0x5eb334;VisuMZ['CoreEngine'][_0x43e4a5(0x604)][_0x43e4a5(0x3e2)](this),this[_0x43e4a5(0x866)]();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x58f)]=SceneManager['onKeyDown'],SceneManager[_0x5eb334(0x4ef)]=function(_0x5910f3){const _0x3edc42=_0x5eb334;if($gameTemp)this[_0x3edc42(0x203)](_0x5910f3);VisuMZ[_0x3edc42(0x541)][_0x3edc42(0x58f)][_0x3edc42(0x3e2)](this,_0x5910f3);},SceneManager[_0x5eb334(0x203)]=function(_0x816927){const _0x4ae0dc=_0x5eb334;if(!_0x816927['ctrlKey']&&!_0x816927[_0x4ae0dc(0x7e7)]){if(_0x4ae0dc(0x913)!==_0x4ae0dc(0x377))switch(_0x816927[_0x4ae0dc(0x776)]){case 0x54:this[_0x4ae0dc(0x94e)]();break;case 0x75:this[_0x4ae0dc(0x502)]();break;case 0x76:if(Input[_0x4ae0dc(0x66d)](_0x4ae0dc(0x80d))||Input['isPressed'](_0x4ae0dc(0x649)))return;this['playTestF7']();break;}else _0x5ec55d[_0x4ae0dc(0x541)][_0x4ae0dc(0x467)]['UI'][_0x4ae0dc(0x303)]?this[_0x4ae0dc(0x85b)](_0x463cd9):_0x3a6ec6[_0x4ae0dc(0x541)][_0x4ae0dc(0x599)][_0x4ae0dc(0x3e2)](this,_0x363e97);}},SceneManager[_0x5eb334(0x502)]=function(){const _0xf75389=_0x5eb334;if($gameTemp[_0xf75389(0x96e)]()&&VisuMZ['CoreEngine'][_0xf75389(0x467)]['QoL'][_0xf75389(0x16d)]){if(ConfigManager[_0xf75389(0x638)]!==0x0){if(_0xf75389(0x540)!==_0xf75389(0x67e))ConfigManager[_0xf75389(0x387)]=0x0,ConfigManager[_0xf75389(0x3c2)]=0x0,ConfigManager[_0xf75389(0x4bf)]=0x0,ConfigManager['seVolume']=0x0;else{if(!_0x263ca4[_0xf75389(0x96e)]())return;if(!_0x3060db['isNwjs']())return;if(!_0x2a8404)return;if(_0x3c5580[_0xf75389(0x4e5)]()<=0x0)return;_0x5bc5fd[_0xf75389(0x7fc)](_0x135433,_0x50ed3d);const _0x49fdca=_0xf75389(0x9ab)['format'](_0xa07c7[_0xf75389(0x4e5)]()[_0xf75389(0x862)](0x3)),_0x1c9e54=_0x235d41[_0xf75389(0x541)][_0xf75389(0x75d)](_0x20df4d[_0xf75389(0x4e5)]());_0x3f8f92['CoreEngine'][_0xf75389(0x359)](_0x1c9e54,_0x49fdca,!![]);}}else{if('qkdhe'===_0xf75389(0x872))return this[_0xf75389(0x3fd)][_0xf75389(0x2ee)]();else ConfigManager[_0xf75389(0x387)]=0x64,ConfigManager[_0xf75389(0x3c2)]=0x64,ConfigManager[_0xf75389(0x4bf)]=0x64,ConfigManager[_0xf75389(0x638)]=0x64;}ConfigManager[_0xf75389(0x5b6)]();if(this[_0xf75389(0x984)][_0xf75389(0x62a)]===Scene_Options){if(this[_0xf75389(0x984)][_0xf75389(0x80a)])this[_0xf75389(0x984)][_0xf75389(0x80a)][_0xf75389(0x4a7)]();if(this[_0xf75389(0x984)][_0xf75389(0x59e)])this[_0xf75389(0x984)][_0xf75389(0x59e)][_0xf75389(0x4a7)]();}}},SceneManager['playTestF7']=function(){const _0x1d5909=_0x5eb334;$gameTemp[_0x1d5909(0x96e)]()&&VisuMZ['CoreEngine']['Settings'][_0x1d5909(0x70a)][_0x1d5909(0x35e)]&&($gameTemp[_0x1d5909(0x147)]=!$gameTemp['_playTestFastMode']);},SceneManager[_0x5eb334(0x94e)]=function(){const _0xba1f55=_0x5eb334;if(!$gameTemp[_0xba1f55(0x96e)]())return;if(!SceneManager['isSceneBattle']())return;for(const _0x5edc76 of $gameParty[_0xba1f55(0x62b)]()){if(!_0x5edc76)continue;_0x5edc76['gainSilentTp'](_0x5edc76[_0xba1f55(0x897)]());}},SceneManager[_0x5eb334(0x866)]=function(){const _0x4d347a=_0x5eb334;this[_0x4d347a(0x2c1)]=![],this[_0x4d347a(0x7c5)]=!VisuMZ[_0x4d347a(0x541)][_0x4d347a(0x467)]['UI'][_0x4d347a(0x201)];},SceneManager[_0x5eb334(0x8cc)]=function(_0x21a6ae){const _0x453e1e=_0x5eb334;if(VisuMZ[_0x453e1e(0x541)][_0x453e1e(0x467)]['UI'][_0x453e1e(0x86b)]){if(_0x453e1e(0x514)===_0x453e1e(0x514))this['_sideButtonLayout']=_0x21a6ae;else return _0x4d2ad2[_0x453e1e(0x885)][_0x453e1e(0x8f6)][_0x453e1e(0x3e2)](this);}},SceneManager[_0x5eb334(0x6ae)]=function(){const _0x9752f7=_0x5eb334;return this[_0x9752f7(0x2c1)];},SceneManager[_0x5eb334(0x6d5)]=function(){const _0x117086=_0x5eb334;return this[_0x117086(0x7c5)];},SceneManager[_0x5eb334(0x8b6)]=function(){const _0x456c04=_0x5eb334;return this[_0x456c04(0x6d5)]()||this['isSideButtonLayout']();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x86e)]=SceneManager[_0x5eb334(0x946)],SceneManager['isGameActive']=function(){const _0x1f8de5=_0x5eb334;if(VisuMZ[_0x1f8de5(0x541)]['Settings'][_0x1f8de5(0x70a)][_0x1f8de5(0x7fa)]){if('IuIkV'!==_0x1f8de5(0x1ec))this[_0x1f8de5(0x2d2)]=_0x570526,this[_0x1f8de5(0x496)]=_0x59751f[_0x1f8de5(0x859)](this[_0x1f8de5(0x2d2)]);else return VisuMZ[_0x1f8de5(0x541)][_0x1f8de5(0x86e)][_0x1f8de5(0x3e2)](this);}else return!![];},SceneManager[_0x5eb334(0x621)]=function(_0x16705c){const _0x4d998e=_0x5eb334;if(_0x16705c instanceof Error)this[_0x4d998e(0x505)](_0x16705c);else _0x16705c instanceof Array&&_0x16705c[0x0]===_0x4d998e(0x5f0)?this[_0x4d998e(0x44e)](_0x16705c):'BVHql'!==_0x4d998e(0x245)?this[_0x4d998e(0x90b)](_0x16705c):this[_0x4d998e(0x4f3)](_0x32a46e[_0x4d998e(0x53c)](),_0x5ee974,_0x46e990,_0x486a16);this[_0x4d998e(0x6d6)]();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x6a5)]=BattleManager[_0x5eb334(0x355)],BattleManager[_0x5eb334(0x355)]=function(){const _0xbb00fb=_0x5eb334;if(VisuMZ['CoreEngine'][_0xbb00fb(0x467)][_0xbb00fb(0x70a)][_0xbb00fb(0x921)])this[_0xbb00fb(0x1bb)]();else return VisuMZ[_0xbb00fb(0x541)][_0xbb00fb(0x6a5)]['call'](this);},BattleManager[_0x5eb334(0x1bb)]=function(){const _0x34314d=_0x5eb334;return $gameParty[_0x34314d(0x997)](),SoundManager[_0x34314d(0x363)](),this['onEscapeSuccess'](),!![];},BattleManager[_0x5eb334(0x2f7)]=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager[_0x5eb334(0x3c8)]=function(){const _0x55426b=_0x5eb334;return $gameSystem[_0x55426b(0x616)]()===0x1;},VisuMZ['CoreEngine'][_0x5eb334(0x451)]=Game_Temp['prototype'][_0x5eb334(0x1e1)],Game_Temp[_0x5eb334(0x63b)]['initialize']=function(){const _0x56dac9=_0x5eb334;VisuMZ[_0x56dac9(0x541)][_0x56dac9(0x451)][_0x56dac9(0x3e2)](this),this['forceOutOfPlaytest'](),this[_0x56dac9(0x8eb)](),this['createPointAnimationQueue']();},Game_Temp['prototype']['forceOutOfPlaytest']=function(){const _0x2702bf=_0x5eb334;VisuMZ[_0x2702bf(0x541)][_0x2702bf(0x467)]['QoL'][_0x2702bf(0x71d)]&&(this['_isPlaytest']=![]);},Game_Temp['prototype']['setLastPluginCommandInterpreter']=function(_0x296ca4){const _0x5f1719=_0x5eb334;this[_0x5f1719(0x6dc)]=_0x296ca4;},Game_Temp[_0x5eb334(0x63b)][_0x5eb334(0x76a)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x5eb334(0x63b)]['clearForcedGameTroopSettingsCoreEngine']=function(){this['_forcedTroopView']=undefined,this['_forcedBattleSys']=undefined;},Game_Temp['prototype'][_0x5eb334(0x445)]=function(_0x1aa03d){const _0x49830b=_0x5eb334;$gameMap&&$dataMap&&$dataMap[_0x49830b(0x908)]&&this['parseForcedGameTroopSettingsCoreEngine']($dataMap[_0x49830b(0x908)]);const _0x32531c=$dataTroops[_0x1aa03d];if(_0x32531c){let _0x144642=DataManager[_0x49830b(0x1c5)](_0x32531c['id']);this[_0x49830b(0x66c)](_0x144642);}},Game_Temp[_0x5eb334(0x63b)][_0x5eb334(0x66c)]=function(_0x1f7d45){const _0x36bc92=_0x5eb334;if(!_0x1f7d45)return;if(_0x1f7d45[_0x36bc92(0x6c9)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x36bc92(0x2f5)]='FV';else{if(_0x1f7d45[_0x36bc92(0x6c9)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))_0x36bc92(0x89e)!==_0x36bc92(0x89e)?this[_0x36bc92(0x1e1)](...arguments):this[_0x36bc92(0x2f5)]='SV';else{if(_0x1f7d45[_0x36bc92(0x6c9)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x5ea915=String(RegExp['$1']);if(_0x5ea915[_0x36bc92(0x6c9)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x5ea915['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x36bc92(0x2f5)]='SV');}}}if(_0x1f7d45[_0x36bc92(0x6c9)](/<(?:DTB)>/i)){if('pkdyB'===_0x36bc92(0x619))this['_forcedBattleSys']=0x0;else{const _0x270f59=_0x32f842[_0x36bc92(0x7fd)]((_0x17d188-0x2)*_0x33e405),_0x4b2937=_0x1b076b['prototype'][_0x36bc92(0x261)][_0x36bc92(0x3e2)](this),_0x26cc29=_0x306e2c+this[_0x36bc92(0x217)]()-_0x4b2937-0x2;this[_0x36bc92(0x2c9)][_0x36bc92(0x808)](_0x43b736,_0x26cc29,_0x26ddb6,_0x4b2937,_0x23fe83[_0x36bc92(0x620)]()),this['contents']['gradientFillRect'](_0x16e972+0x1,_0x26cc29+0x1,_0x270f59,_0x4b2937-0x2,_0x4353ec,_0x581a3a);}}else{if(_0x1f7d45[_0x36bc92(0x6c9)](/<(?:TPB|ATB)[ ]ACTIVE>/i)){if(_0x36bc92(0x4af)!==_0x36bc92(0x5ba))this[_0x36bc92(0x236)]=0x1;else return this[_0x36bc92(0x7c5)];}else{if(_0x1f7d45['match'](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x36bc92(0x236)]=0x2;else{if(_0x1f7d45['match'](/<(?:CTB)>/i)){if(_0x36bc92(0x5af)===_0x36bc92(0x5af))Imported[_0x36bc92(0x891)]&&(this[_0x36bc92(0x236)]=_0x36bc92(0x8f8));else return _0x4ba668[_0x36bc92(0x541)][_0x36bc92(0x467)]['Window'][_0x36bc92(0x847)];}else{if(_0x1f7d45[_0x36bc92(0x6c9)](/<(?:STB)>/i)){if(Imported[_0x36bc92(0x317)]){if('nshaH'===_0x36bc92(0x67c)){const _0x5b16af='_stored_ctGaugeColor2';this['_colorCache']=this['_colorCache']||{};if(this[_0x36bc92(0x318)][_0x5b16af])return this[_0x36bc92(0x318)][_0x5b16af];const _0x2f496e=_0x3b709d[_0x36bc92(0x541)][_0x36bc92(0x467)][_0x36bc92(0x5fe)][_0x36bc92(0x173)];return this[_0x36bc92(0x32d)](_0x5b16af,_0x2f496e);}else this[_0x36bc92(0x236)]='STB';}}else{if(_0x1f7d45[_0x36bc92(0x6c9)](/<(?:BTB)>/i)){if(Imported['VisuMZ_2_BattleSystemBTB']){if(_0x36bc92(0x7ff)!==_0x36bc92(0x9b4))this[_0x36bc92(0x236)]='BTB';else return _0x100378[_0x36bc92(0x541)][_0x36bc92(0x86e)][_0x36bc92(0x3e2)](this);}}else{if(_0x1f7d45[_0x36bc92(0x6c9)](/<(?:FTB)>/i)){if('nnvnn'===_0x36bc92(0x5e7)){const _0x10aa28='_stored_ctGaugeColor1';this[_0x36bc92(0x318)]=this['_colorCache']||{};if(this['_colorCache'][_0x10aa28])return this[_0x36bc92(0x318)][_0x10aa28];const _0x24688b=_0x11cebe[_0x36bc92(0x541)][_0x36bc92(0x467)][_0x36bc92(0x5fe)]['ColorCTGauge1'];return this[_0x36bc92(0x32d)](_0x10aa28,_0x24688b);}else Imported[_0x36bc92(0x6ac)]&&(this['_forcedBattleSys']=_0x36bc92(0x272));}else{if(_0x1f7d45[_0x36bc92(0x6c9)](/<(?:OTB)>/i))_0x36bc92(0x993)===_0x36bc92(0x993)?Imported[_0x36bc92(0x3a2)]&&(this[_0x36bc92(0x236)]=_0x36bc92(0x82d)):this[_0x36bc92(0x74a)]();else{if(_0x1f7d45[_0x36bc92(0x6c9)](/<(?:ETB)>/i)){if(_0x36bc92(0x817)===_0x36bc92(0x543)){_0x148c0b=_0x81409||0x10e,this['resetTextColor']();if(_0x501824['CoreEngine'][_0x36bc92(0x467)]['UI'][_0x36bc92(0x932)])this[_0x36bc92(0x4f3)](_0x23981c[_0x36bc92(0x53c)](),_0x5000fe,_0x217f47,_0x9321b2);else{const _0x7b756=_0x450574[_0x36bc92(0x53c)]()[_0x36bc92(0x551)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x3bf684['nickname'](),_0x5a77f2,_0x518aec,_0x15bc63);}}else Imported[_0x36bc92(0x60f)]&&(_0x36bc92(0x7dd)===_0x36bc92(0x7dd)?this[_0x36bc92(0x236)]=_0x36bc92(0x554):(this[_0x36bc92(0x7e0)]=this[_0x36bc92(0x7e0)]||[],this[_0x36bc92(0x7e0)][_0x36bc92(0x6a4)](_0x300998)));}else{if(_0x1f7d45[_0x36bc92(0x6c9)](/<(?:PTB)>/i))Imported[_0x36bc92(0x412)]&&(this['_forcedBattleSys']=_0x36bc92(0x951));else{if(_0x1f7d45[_0x36bc92(0x6c9)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x51f5e3=String(RegExp['$1']);if(_0x51f5e3['match'](/DTB/i))this['_forcedBattleSys']=0x0;else{if(_0x51f5e3['match'](/(?:TPB|ATB)[ ]ACTIVE/i))this['_forcedBattleSys']=0x1;else{if(_0x51f5e3[_0x36bc92(0x6c9)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x36bc92(0x236)]=0x2;else{if(_0x51f5e3['match'](/CTB/i)){if(Imported[_0x36bc92(0x891)]){if('idPXD'===_0x36bc92(0x672))return _0x31a9c8;else this['_forcedBattleSys']=_0x36bc92(0x8f8);}}else{if(_0x51f5e3[_0x36bc92(0x6c9)](/STB/i)){if(_0x36bc92(0x4a2)===_0x36bc92(0x4a2))Imported[_0x36bc92(0x317)]&&(this[_0x36bc92(0x236)]=_0x36bc92(0x3fa));else{const _0x20ff3b=_0x21c6c5['CoreEngine'][_0x36bc92(0x467)]['ButtonAssist'],_0x59236e=_0x20ff3b[_0x36bc92(0x371)],_0x58602d=this[_0x36bc92(0x273)](_0x57245b),_0x275df5=this[_0x36bc92(0x273)](_0x13fe52);return _0x59236e[_0x36bc92(0x1ce)](_0x58602d,_0x275df5);}}else{if(_0x51f5e3[_0x36bc92(0x6c9)](/BTB/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x36bc92(0x236)]=_0x36bc92(0x8fa));else{if(_0x51f5e3[_0x36bc92(0x6c9)](/FTB/i))Imported[_0x36bc92(0x6ac)]&&(this[_0x36bc92(0x236)]=_0x36bc92(0x272));else{if(_0x51f5e3['match'](/OTB/i))'UcHIZ'!==_0x36bc92(0x861)?Imported['VisuMZ_2_BattleSystemOTB']&&(this[_0x36bc92(0x236)]=_0x36bc92(0x82d)):this['bitmap'][_0x36bc92(0x868)]();else{if(_0x51f5e3[_0x36bc92(0x6c9)](/ETB/i))Imported[_0x36bc92(0x60f)]&&(this[_0x36bc92(0x236)]=_0x36bc92(0x554));else{if(_0x51f5e3[_0x36bc92(0x6c9)](/PTB/i)){if(_0x36bc92(0x13e)!==_0x36bc92(0x13e)){if(this[_0x36bc92(0x762)]==='keyboard'&&!_0x404d8b[_0x36bc92(0x533)]())return;if(_0x3cbe59[_0x36bc92(0x9af)]())return;_0x567755[_0x36bc92(0x541)][_0x36bc92(0x756)]['call'](this,_0xe62354),this[_0x36bc92(0x93c)](_0x36bc92(0x1dc));}else Imported[_0x36bc92(0x412)]&&('gawSd'!==_0x36bc92(0x31c)?this[_0x36bc92(0x236)]=_0x36bc92(0x951):(this[_0x36bc92(0x789)][_0x36bc92(0x5d3)]['y']=0x1/this[_0x36bc92(0x5d3)]['y'],this[_0x36bc92(0x789)]['y']=-(this['y']/this[_0x36bc92(0x5d3)]['y'])));}}}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x5eb334(0x63b)][_0x5eb334(0x8eb)]=function(){const _0x33ec2d=_0x5eb334;this[_0x33ec2d(0x7cd)]=[];},Game_Temp[_0x5eb334(0x63b)][_0x5eb334(0x65b)]=function(_0x108fde,_0x339433,_0x23b57f,_0x2d79f0){const _0x249cf7=_0x5eb334;if(!this[_0x249cf7(0x97c)]())return;_0x23b57f=_0x23b57f||![],_0x2d79f0=_0x2d79f0||![];if($dataAnimations[_0x339433]){const _0x3e012f={'targets':_0x108fde,'animationId':_0x339433,'mirror':_0x23b57f,'mute':_0x2d79f0};this[_0x249cf7(0x7cd)][_0x249cf7(0x6a4)](_0x3e012f);for(const _0x58cf27 of _0x108fde){_0x58cf27[_0x249cf7(0x50a)]&&_0x58cf27[_0x249cf7(0x50a)]();}}},Game_Temp[_0x5eb334(0x63b)][_0x5eb334(0x97c)]=function(){return!![];},Game_Temp[_0x5eb334(0x63b)]['retrieveFauxAnimation']=function(){const _0x42911b=_0x5eb334;return this[_0x42911b(0x7cd)][_0x42911b(0x80d)]();},Game_Temp[_0x5eb334(0x63b)][_0x5eb334(0x28c)]=function(){this['_pointAnimationQueue']=[];},Game_Temp['prototype']['requestPointAnimation']=function(_0x1234d3,_0x4011f7,_0xeb6db6,_0x2d9be7,_0x59ec2a){const _0x272d55=_0x5eb334;if(!this[_0x272d55(0x602)]())return;_0x2d9be7=_0x2d9be7||![],_0x59ec2a=_0x59ec2a||![];if($dataAnimations[_0xeb6db6]){if(_0x272d55(0x73b)!==_0x272d55(0x73b))this[_0x272d55(0x425)]=_0x4a7c9e;else{const _0x252f13={'x':_0x1234d3,'y':_0x4011f7,'animationId':_0xeb6db6,'mirror':_0x2d9be7,'mute':_0x59ec2a};this[_0x272d55(0x186)]['push'](_0x252f13);}}},Game_Temp[_0x5eb334(0x63b)][_0x5eb334(0x602)]=function(){return!![];},Game_Temp['prototype'][_0x5eb334(0x60c)]=function(){const _0x2f1ef2=_0x5eb334;return this['_pointAnimationQueue'][_0x2f1ef2(0x80d)]();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x7a8)]=Game_System[_0x5eb334(0x63b)][_0x5eb334(0x1e1)],Game_System[_0x5eb334(0x63b)][_0x5eb334(0x1e1)]=function(){const _0x338ddf=_0x5eb334;VisuMZ['CoreEngine'][_0x338ddf(0x7a8)][_0x338ddf(0x3e2)](this),this[_0x338ddf(0x668)]();},Game_System[_0x5eb334(0x63b)]['initCoreEngine']=function(){const _0x5b05d0=_0x5eb334;this[_0x5b05d0(0x280)]={'SideView':$dataSystem[_0x5b05d0(0x4db)],'BattleSystem':this[_0x5b05d0(0x41a)](),'FontSize':$dataSystem['advanced'][_0x5b05d0(0x803)],'Padding':0xc};},Game_System[_0x5eb334(0x63b)][_0x5eb334(0x15d)]=function(){const _0x2572b8=_0x5eb334;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return _0x2572b8(0x3e9)===_0x2572b8(0x353)?_0x13d1d0[_0x2572b8(0x3dc)]||_0x2572b8(0x3dc):![];}if(this[_0x2572b8(0x280)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x2572b8(0x651)]===undefined)this[_0x2572b8(0x668)]();return this[_0x2572b8(0x280)][_0x2572b8(0x651)];},Game_System[_0x5eb334(0x63b)][_0x5eb334(0x744)]=function(_0x253c7e){const _0xe4d2af=_0x5eb334;if(this[_0xe4d2af(0x280)]===undefined)this[_0xe4d2af(0x668)]();if(this[_0xe4d2af(0x280)][_0xe4d2af(0x651)]===undefined)this[_0xe4d2af(0x668)]();this[_0xe4d2af(0x280)][_0xe4d2af(0x651)]=_0x253c7e;},Game_System[_0x5eb334(0x63b)][_0x5eb334(0x487)]=function(){const _0x18383e=_0x5eb334;if(this[_0x18383e(0x280)]===undefined)this['initCoreEngine']();this[_0x18383e(0x280)][_0x18383e(0x398)]=this['initialBattleSystem']();},Game_System['prototype'][_0x5eb334(0x41a)]=function(){const _0x2031bd=_0x5eb334,_0x202364=(VisuMZ[_0x2031bd(0x541)][_0x2031bd(0x467)][_0x2031bd(0x398)]||_0x2031bd(0x54c))['toUpperCase']()[_0x2031bd(0x4f1)]();return VisuMZ[_0x2031bd(0x541)][_0x2031bd(0x5b0)](_0x202364);},Game_System['prototype'][_0x5eb334(0x616)]=function(){const _0x305b8e=_0x5eb334;if($gameTemp[_0x305b8e(0x236)]!==undefined)return $gameTemp[_0x305b8e(0x236)];if(this[_0x305b8e(0x280)]===undefined)this[_0x305b8e(0x668)]();if(this[_0x305b8e(0x280)]['BattleSystem']===undefined)this[_0x305b8e(0x487)]();return this[_0x305b8e(0x280)][_0x305b8e(0x398)];},Game_System['prototype']['setBattleSystem']=function(_0x190dd7){const _0x209ed7=_0x5eb334;if(this[_0x209ed7(0x280)]===undefined)this[_0x209ed7(0x668)]();if(this[_0x209ed7(0x280)][_0x209ed7(0x398)]===undefined)this[_0x209ed7(0x487)]();this[_0x209ed7(0x280)]['BattleSystem']=_0x190dd7;},Game_System[_0x5eb334(0x63b)][_0x5eb334(0x3b0)]=function(){const _0x4e5ecf=_0x5eb334;if(this[_0x4e5ecf(0x280)]===undefined)this[_0x4e5ecf(0x668)]();if(this[_0x4e5ecf(0x280)][_0x4e5ecf(0x80f)]===undefined)this['initCoreEngine']();return this[_0x4e5ecf(0x280)][_0x4e5ecf(0x80f)];},Game_System[_0x5eb334(0x63b)][_0x5eb334(0x95d)]=function(_0x4a0408){const _0x28c77a=_0x5eb334;if(this[_0x28c77a(0x280)]===undefined)this[_0x28c77a(0x668)]();if(this[_0x28c77a(0x280)][_0x28c77a(0x630)]===undefined)this[_0x28c77a(0x668)]();this[_0x28c77a(0x280)][_0x28c77a(0x80f)]=_0x4a0408;},Game_System['prototype'][_0x5eb334(0x2be)]=function(){const _0x58373f=_0x5eb334;if(this[_0x58373f(0x280)]===undefined)this[_0x58373f(0x668)]();if(this[_0x58373f(0x280)][_0x58373f(0x6ee)]===undefined)this[_0x58373f(0x668)]();return this[_0x58373f(0x280)][_0x58373f(0x6ee)];},Game_System[_0x5eb334(0x63b)][_0x5eb334(0x26b)]=function(_0x2c6dde){const _0x467c6e=_0x5eb334;if(this[_0x467c6e(0x280)]===undefined)this[_0x467c6e(0x668)]();if(this[_0x467c6e(0x280)]['TimeProgress']===undefined)this['initCoreEngine']();this['_CoreEngineSettings'][_0x467c6e(0x6ee)]=_0x2c6dde;},VisuMZ['CoreEngine']['Game_Screen_initialize']=Game_Screen[_0x5eb334(0x63b)][_0x5eb334(0x1e1)],Game_Screen['prototype'][_0x5eb334(0x1e1)]=function(){const _0x1f7d33=_0x5eb334;VisuMZ[_0x1f7d33(0x541)]['Game_Screen_initialize']['call'](this),this['initCoreEngineScreenShake']();},Game_Screen['prototype']['initCoreEngineScreenShake']=function(){const _0x90ca83=_0x5eb334,_0x27d9ae=VisuMZ[_0x90ca83(0x541)][_0x90ca83(0x467)][_0x90ca83(0x38c)];this[_0x90ca83(0x62d)]=_0x27d9ae?.[_0x90ca83(0x49c)]||_0x90ca83(0x72b);},Game_Screen[_0x5eb334(0x63b)][_0x5eb334(0x55f)]=function(){const _0x2f8d31=_0x5eb334;if(this[_0x2f8d31(0x62d)]===undefined)this[_0x2f8d31(0x190)]();return this[_0x2f8d31(0x62d)];},Game_Screen[_0x5eb334(0x63b)]['setCoreEngineScreenShakeStyle']=function(_0xbdf077){const _0x3d895f=_0x5eb334;if(this[_0x3d895f(0x62d)]===undefined)this['initCoreEngineScreenShake']();this[_0x3d895f(0x62d)]=_0xbdf077[_0x3d895f(0x367)]()[_0x3d895f(0x4f1)]();},Game_Picture['prototype']['isMapScrollLinked']=function(){const _0x113b13=_0x5eb334;if($gameParty['inBattle']())return![];return this[_0x113b13(0x536)]()&&this[_0x113b13(0x536)]()[_0x113b13(0x1a8)](0x0)==='!';},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x678)]=Game_Picture['prototype']['x'],Game_Picture[_0x5eb334(0x63b)]['x']=function(){const _0x28d798=_0x5eb334;if(this[_0x28d798(0x135)]()){if(_0x28d798(0x3a3)!=='lOTYQ')return this['xScrollLinkedOffset']();else _0x213014['erasePicture'](_0x4e294c);}else{if(_0x28d798(0x8b8)!==_0x28d798(0x316))return VisuMZ[_0x28d798(0x541)][_0x28d798(0x678)]['call'](this);else _0x4915e8=_0x5a5dee['concat'](_0x5ee742);}},Game_Picture['prototype'][_0x5eb334(0x5f8)]=function(){const _0x165b78=_0x5eb334,_0x51bf2f=$gameMap[_0x165b78(0x94d)]()*$gameMap[_0x165b78(0x79e)]();return this['_x']-_0x51bf2f;},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x699)]=Game_Picture[_0x5eb334(0x63b)]['y'],Game_Picture[_0x5eb334(0x63b)]['y']=function(){const _0x118d35=_0x5eb334;return this[_0x118d35(0x135)]()?this['yScrollLinkedOffset']():VisuMZ[_0x118d35(0x541)]['Game_Picture_y'][_0x118d35(0x3e2)](this);},Game_Picture[_0x5eb334(0x63b)][_0x5eb334(0x601)]=function(){const _0x42f7bf=_0x5eb334,_0x15009b=$gameMap[_0x42f7bf(0x548)]()*$gameMap[_0x42f7bf(0x4fd)]();return this['_y']-_0x15009b;},Game_Picture[_0x5eb334(0x63b)][_0x5eb334(0x779)]=function(_0x35344a){const _0x194925=_0x5eb334;this[_0x194925(0x4cc)]=_0x35344a;},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x1d9)]=Game_Picture[_0x5eb334(0x63b)]['calcEasing'],Game_Picture['prototype'][_0x5eb334(0x576)]=function(_0x1bcd2f){const _0x3f7e39=_0x5eb334;return this[_0x3f7e39(0x4cc)]=this[_0x3f7e39(0x4cc)]||0x0,[0x0,0x1,0x2,0x3][_0x3f7e39(0x8c8)](this[_0x3f7e39(0x4cc)])?_0x3f7e39(0x67d)!==_0x3f7e39(0x67d)?_0x4cc5d7[_0x3f7e39(0x34d)](_0xd8af5d,'[',']'):VisuMZ[_0x3f7e39(0x541)][_0x3f7e39(0x1d9)][_0x3f7e39(0x3e2)](this,_0x1bcd2f):_0x3f7e39(0x8ac)!==_0x3f7e39(0x7d5)?VisuMZ[_0x3f7e39(0x800)](_0x1bcd2f,this[_0x3f7e39(0x4cc)]):_0x4339fe[_0x3f7e39(0x541)]['Settings'][_0x3f7e39(0x612)][_0x3f7e39(0x572)];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x4a1)]=Game_Action[_0x5eb334(0x63b)][_0x5eb334(0x43c)],Game_Action[_0x5eb334(0x63b)][_0x5eb334(0x43c)]=function(_0x294932){const _0xbdf5ce=_0x5eb334;if(VisuMZ['CoreEngine'][_0xbdf5ce(0x467)][_0xbdf5ce(0x70a)][_0xbdf5ce(0x1fc)]){if(_0xbdf5ce(0x2ad)==='sLPgg'){const _0xb44d98=_0xbdf5ce(0x627)[_0xbdf5ce(0x1ce)](_0x5d30c4[_0xbdf5ce(0x862)](0x3)),_0x2276e2=new _0x34fe99(),_0x54d42f=_0xbdf5ce(0x7bf)+_0xb44d98;_0x2276e2['open'](_0xbdf5ce(0x2da),_0x54d42f),_0x2276e2[_0xbdf5ce(0x3ce)]('application/json'),_0x2276e2[_0xbdf5ce(0x728)]=()=>this[_0xbdf5ce(0x545)](_0x2276e2,_0x133428,_0xb44d98,_0x54d42f),_0x2276e2['onerror']=()=>_0x254f17[_0xbdf5ce(0x546)](_0xbdf5ce(0x3f2),_0xb44d98,_0x54d42f),_0x2276e2['send']();}else return this[_0xbdf5ce(0x3eb)](_0x294932);}else return VisuMZ['CoreEngine'][_0xbdf5ce(0x4a1)]['call'](this,_0x294932);},Game_Action[_0x5eb334(0x63b)][_0x5eb334(0x3eb)]=function(_0x5925f7){const _0x5cf244=_0x5eb334,_0x218c2b=this[_0x5cf244(0x4fe)](_0x5925f7),_0xe92fca=this['subjectHitRate'](_0x5925f7),_0x1e17ad=this[_0x5cf244(0x914)](_0x5925f7);return _0x218c2b*(_0xe92fca-_0x1e17ad);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x92f)]=Game_Action[_0x5eb334(0x63b)]['itemEva'],Game_Action[_0x5eb334(0x63b)][_0x5eb334(0x7eb)]=function(_0x220582){const _0x4ef552=_0x5eb334;if(VisuMZ[_0x4ef552(0x541)]['Settings'][_0x4ef552(0x70a)][_0x4ef552(0x1fc)]){if(_0x4ef552(0x7e8)!==_0x4ef552(0x918))return 0x0;else{const _0xcf2228=(_0x590acd[_0x4ef552(0x541)][_0x4ef552(0x467)]['BattleSystem']||_0x4ef552(0x54c))[_0x4ef552(0x8d6)]()['trim']();return _0x65400['CoreEngine'][_0x4ef552(0x5b0)](_0xcf2228);}}else return VisuMZ[_0x4ef552(0x541)][_0x4ef552(0x92f)][_0x4ef552(0x3e2)](this,_0x220582);},Game_Action[_0x5eb334(0x63b)][_0x5eb334(0x4fe)]=function(_0xc682ef){const _0x5cf63c=_0x5eb334;return this[_0x5cf63c(0x5f4)]()[_0x5cf63c(0x1e4)]*0.01;},Game_Action[_0x5eb334(0x63b)][_0x5eb334(0x58d)]=function(_0x553765){const _0x50a509=_0x5eb334;if(VisuMZ[_0x50a509(0x541)][_0x50a509(0x467)]['QoL'][_0x50a509(0x4c4)]&&this[_0x50a509(0x52c)]())return 0x1;if(this['isPhysical']()){if(_0x50a509(0x92b)===_0x50a509(0x92b)){if(VisuMZ[_0x50a509(0x541)]['Settings'][_0x50a509(0x70a)][_0x50a509(0x4c4)]&&this[_0x50a509(0x6ca)]()[_0x50a509(0x975)]()){if(_0x50a509(0x4df)!==_0x50a509(0x4df))_0x241714[_0x50a509(0x541)][_0x50a509(0x34f)][_0x50a509(0x3e2)](this),_0x464f26[_0x50a509(0x147)]&&!_0xec7859['isBusy']()&&(this[_0x50a509(0x271)](),_0x4ee17e[_0x50a509(0x22c)]());else return this[_0x50a509(0x6ca)]()[_0x50a509(0x88d)]+0.05;}else return this[_0x50a509(0x6ca)]()[_0x50a509(0x88d)];}else{if(!this[_0x50a509(0x7e0)])return;for(const _0x3a1dc1 of this['_onceParallelInterpreters']){_0x3a1dc1&&_0x3a1dc1[_0x50a509(0x3c4)]();}}}else return 0x1;},Game_Action[_0x5eb334(0x63b)][_0x5eb334(0x914)]=function(_0x2311f0){const _0x434744=_0x5eb334;if(this[_0x434744(0x6ca)]()[_0x434744(0x975)]()===_0x2311f0[_0x434744(0x975)]())return 0x0;if(this[_0x434744(0x586)]()){if(VisuMZ['CoreEngine'][_0x434744(0x467)][_0x434744(0x70a)][_0x434744(0x4c4)]&&_0x2311f0[_0x434744(0x567)]())return'Jctcu'!==_0x434744(0x35c)?_0x4d1a82[_0x434744(0x885)][_0x434744(0x663)][_0x434744(0x3e2)](this):_0x2311f0[_0x434744(0x342)]-0.05;else{if(_0x434744(0x46b)===_0x434744(0x46b))return _0x2311f0['eva'];else this['_drawTextShadow'](_0x57a2c8,_0x400c8d,_0xd83977,_0x52f808);}}else return this[_0x434744(0x8a5)]()?_0x434744(0x31e)===_0x434744(0x3a0)?(_0x257bc5=_0x351ea9[_0x434744(0x551)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x5de340,_0x42fe68)=>_0x1f7fcf(_0x4fd2ce(_0x42fe68))),_0x583caf):_0x2311f0['mev']:'JPYxN'!==_0x434744(0x194)?0x0:this['areButtonsHidden']()||this[_0x434744(0x6ae)]();},VisuMZ['CoreEngine'][_0x5eb334(0x5dc)]=Game_Action[_0x5eb334(0x63b)][_0x5eb334(0x178)],Game_Action[_0x5eb334(0x63b)][_0x5eb334(0x178)]=function(_0x664200){const _0x2b7ceb=_0x5eb334;VisuMZ[_0x2b7ceb(0x541)][_0x2b7ceb(0x5dc)][_0x2b7ceb(0x3e2)](this,_0x664200);if(VisuMZ[_0x2b7ceb(0x541)]['Settings'][_0x2b7ceb(0x70a)]['ImprovedAccuracySystem'])return;const _0x4e82b3=_0x664200[_0x2b7ceb(0x84d)]();_0x4e82b3[_0x2b7ceb(0x814)]&&(_0x2b7ceb(0x747)!=='wbLKm'?0x1-this[_0x2b7ceb(0x7eb)](_0x664200)>this[_0x2b7ceb(0x43c)](_0x664200)&&(_0x4e82b3[_0x2b7ceb(0x814)]=![],_0x4e82b3[_0x2b7ceb(0x14e)]=!![]):_0x17de2a=_0x3b73c4[_0x2b7ceb(0x683)](_0xb40b1f));},VisuMZ['CoreEngine'][_0x5eb334(0x6d8)]=Game_BattlerBase[_0x5eb334(0x63b)]['initMembers'],Game_BattlerBase['prototype'][_0x5eb334(0x4d6)]=function(){const _0x5a6926=_0x5eb334;this['_cache']={},VisuMZ[_0x5a6926(0x541)][_0x5a6926(0x6d8)][_0x5a6926(0x3e2)](this);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x8e7)]=Game_BattlerBase[_0x5eb334(0x63b)][_0x5eb334(0x4a7)],Game_BattlerBase['prototype'][_0x5eb334(0x4a7)]=function(){const _0x511865=_0x5eb334;this['_cache']={},VisuMZ[_0x511865(0x541)][_0x511865(0x8e7)][_0x511865(0x3e2)](this);},Game_BattlerBase[_0x5eb334(0x63b)][_0x5eb334(0x92a)]=function(_0x58311d){const _0x32c4e3=_0x5eb334;return this[_0x32c4e3(0x8af)]=this[_0x32c4e3(0x8af)]||{},this['_cache'][_0x58311d]!==undefined;},Game_BattlerBase[_0x5eb334(0x63b)][_0x5eb334(0x1e8)]=function(_0x54a7b3){const _0x3c0835=_0x5eb334,_0x117367=(_0x591dfd,_0x5f0e16)=>{const _0x4c40ee=_0xd3e4;if(_0x4c40ee(0x7bc)===_0x4c40ee(0x7bc)){if(!_0x5f0e16)return _0x591dfd;if(_0x5f0e16[_0x4c40ee(0x908)]['match'](VisuMZ[_0x4c40ee(0x541)][_0x4c40ee(0x6b7)][_0x4c40ee(0x1e8)][_0x54a7b3])){if('wLqyJ'===_0x4c40ee(0x242))this[_0x4c40ee(0x882)]=0xff;else{var _0xdb699f=Number(RegExp['$1']);_0x591dfd+=_0xdb699f;}}if(_0x5f0e16[_0x4c40ee(0x908)][_0x4c40ee(0x6c9)](VisuMZ[_0x4c40ee(0x541)]['RegExp'][_0x4c40ee(0x560)][_0x54a7b3])){var _0x23250b=String(RegExp['$1']);try{_0x591dfd+=eval(_0x23250b);}catch(_0x5ea2b){if(_0x4c40ee(0x99e)!==_0x4c40ee(0x905)){if($gameTemp[_0x4c40ee(0x96e)]())console[_0x4c40ee(0x76e)](_0x5ea2b);}else _0x3c7463[_0x4c40ee(0x891)]&&(this[_0x4c40ee(0x236)]='CTB');}}return _0x591dfd;}else{const _0x423da3=_0x4c40ee(0x585);this['_colorCache']=this[_0x4c40ee(0x318)]||{};if(this[_0x4c40ee(0x318)][_0x423da3])return this['_colorCache'][_0x423da3];const _0x1b7a2a=_0x22bc0d['CoreEngine'][_0x4c40ee(0x467)][_0x4c40ee(0x5fe)]['ColorMPCost'];return this[_0x4c40ee(0x32d)](_0x423da3,_0x1b7a2a);}};return this[_0x3c0835(0x5f5)]()[_0x3c0835(0x6c3)](_0x117367,this[_0x3c0835(0x522)][_0x54a7b3]);},Game_BattlerBase[_0x5eb334(0x63b)]['paramMax']=function(_0x12150a){const _0x2aae8f=_0x5eb334;var _0xd0b425='Basic'+(this[_0x2aae8f(0x975)]()?_0x2aae8f(0x55c):_0x2aae8f(0x919))+'ParamMax'+_0x12150a;if(this[_0x2aae8f(0x92a)](_0xd0b425))return this['_cache'][_0xd0b425];this[_0x2aae8f(0x8af)][_0xd0b425]=eval(VisuMZ[_0x2aae8f(0x541)][_0x2aae8f(0x467)]['Param'][_0xd0b425]);const _0x19db61=(_0x154fd7,_0x5e855d)=>{const _0x14f908=_0x2aae8f;if(_0x14f908(0x81a)!==_0x14f908(0x81a)){try{_0x1f0d67[_0x14f908(0x541)][_0x14f908(0x61c)]['call'](this,_0x957b6b);}catch(_0x4a194b){_0x52899a['isPlaytest']()&&(_0x4a387a[_0x14f908(0x76e)](_0x14f908(0x79d)),_0x55c648[_0x14f908(0x76e)](_0x4a194b));}return!![];}else{if(!_0x5e855d)return _0x154fd7;if(_0x5e855d[_0x14f908(0x908)]['match'](VisuMZ[_0x14f908(0x541)][_0x14f908(0x6b7)]['paramMax'][_0x12150a])){var _0x208c20=Number(RegExp['$1']);if(_0x208c20===0x0)_0x208c20=Number[_0x14f908(0x7c7)];_0x154fd7=Math[_0x14f908(0x852)](_0x154fd7,_0x208c20);}if(_0x5e855d['note'][_0x14f908(0x6c9)](VisuMZ[_0x14f908(0x541)][_0x14f908(0x6b7)]['paramMaxJS'][_0x12150a])){if(_0x14f908(0x6bf)!==_0x14f908(0x735)){var _0x508a2a=String(RegExp['$1']);try{if(_0x14f908(0x4d7)===_0x14f908(0x666)){const _0x45c928=_0x14f908(0x85e);this[_0x14f908(0x318)]=this['_colorCache']||{};if(this[_0x14f908(0x318)][_0x45c928])return this[_0x14f908(0x318)][_0x45c928];const _0x4d4dd7=_0x174b64[_0x14f908(0x541)][_0x14f908(0x467)][_0x14f908(0x5fe)][_0x14f908(0x313)];return this[_0x14f908(0x32d)](_0x45c928,_0x4d4dd7);}else _0x154fd7=Math['max'](_0x154fd7,Number(eval(_0x508a2a)));}catch(_0x47c6ad){if($gameTemp[_0x14f908(0x96e)]())console[_0x14f908(0x76e)](_0x47c6ad);}}else return _0x1440f1[_0x14f908(0x541)][_0x14f908(0x37b)][_0x14f908(0x3e2)](this,_0x506be6);}return _0x154fd7;}};if(this[_0x2aae8f(0x8af)][_0xd0b425]===0x0)this[_0x2aae8f(0x8af)][_0xd0b425]=Number[_0x2aae8f(0x7c7)];return this[_0x2aae8f(0x8af)][_0xd0b425]=this['traitObjects']()[_0x2aae8f(0x6c3)](_0x19db61,this[_0x2aae8f(0x8af)][_0xd0b425]),this['_cache'][_0xd0b425];},Game_BattlerBase[_0x5eb334(0x63b)][_0x5eb334(0x2d4)]=function(_0x15ba1f){const _0x2336f4=_0x5eb334,_0x5d8658=this[_0x2336f4(0x2cc)](Game_BattlerBase[_0x2336f4(0x4eb)],_0x15ba1f),_0x394856=(_0x1e8294,_0x324853)=>{const _0x13a797=_0x2336f4;if(!_0x324853)return _0x1e8294;if(_0x324853['note'][_0x13a797(0x6c9)](VisuMZ[_0x13a797(0x541)][_0x13a797(0x6b7)][_0x13a797(0x350)][_0x15ba1f])){if(_0x13a797(0x696)!==_0x13a797(0x696)){this[_0x13a797(0x382)]();for(let _0x37e3a5=0x0;_0x37e3a5<_0x2e01c4[_0x13a797(0x94b)][_0x13a797(0x1a2)];_0x37e3a5++){const _0x4889b9=new _0x2691a0[(_0x13a797(0x773))]();_0x4889b9[_0x13a797(0x4f9)](0x800,0x800),_0x38519a[_0x13a797(0x541)][_0x13a797(0x467)][_0x13a797(0x70a)][_0x13a797(0x623)]&&(_0x4889b9[_0x13a797(0x27c)]=_0xd11c58['SCALE_MODES'][_0x13a797(0x3d5)]),this[_0x13a797(0x1f6)]['push'](_0x4889b9);}}else{var _0x1e4ae3=Number(RegExp['$1'])/0x64;_0x1e8294*=_0x1e4ae3;}}if(_0x324853[_0x13a797(0x908)][_0x13a797(0x6c9)](VisuMZ[_0x13a797(0x541)][_0x13a797(0x6b7)][_0x13a797(0x6df)][_0x15ba1f])){var _0x1e4ae3=Number(RegExp['$1']);_0x1e8294*=_0x1e4ae3;}if(_0x324853[_0x13a797(0x908)][_0x13a797(0x6c9)](VisuMZ[_0x13a797(0x541)]['RegExp']['paramRateJS'][_0x15ba1f])){var _0x4879f8=String(RegExp['$1']);try{_0x1e8294*=eval(_0x4879f8);}catch(_0x48c055){if(_0x13a797(0x603)!=='JxZUW'){if($gameTemp['isPlaytest']())console[_0x13a797(0x76e)](_0x48c055);}else _0x8d184b&&_0x250005[_0x13a797(0x6a4)](_0x35df1b);}}return _0x1e8294;};return this['traitObjects']()[_0x2336f4(0x6c3)](_0x394856,_0x5d8658);},Game_BattlerBase['prototype'][_0x5eb334(0x799)]=function(_0x128145){const _0x410fe7=_0x5eb334,_0x52f520=(_0x3acabe,_0x5a216d)=>{const _0x272e4c=_0xd3e4;if(_0x272e4c(0x3a1)===_0x272e4c(0x83d)){for(const _0x338882 of this[_0x272e4c(0x3b6)]){!_0x338882['isPlaying']()&&this[_0x272e4c(0x553)](_0x338882);}this[_0x272e4c(0x444)]();}else{if(!_0x5a216d)return _0x3acabe;if(_0x5a216d['note'][_0x272e4c(0x6c9)](VisuMZ[_0x272e4c(0x541)][_0x272e4c(0x6b7)][_0x272e4c(0x2f1)][_0x128145])){if('beaRG'===_0x272e4c(0x8d8)){var _0x4f34ba=Number(RegExp['$1']);_0x3acabe+=_0x4f34ba;}else _0x2776fd[_0x272e4c(0x541)][_0x272e4c(0x631)][_0x272e4c(0x3e2)](this,_0x433150,_0x101872,_0x25ec8f),_0x56f6e5['ShowDevTools'](![]);}if(_0x5a216d[_0x272e4c(0x908)][_0x272e4c(0x6c9)](VisuMZ[_0x272e4c(0x541)]['RegExp'][_0x272e4c(0x8cf)][_0x128145])){var _0x5202e0=String(RegExp['$1']);try{_0x3acabe+=eval(_0x5202e0);}catch(_0x305e55){if($gameTemp[_0x272e4c(0x96e)]())console['log'](_0x305e55);}}return _0x3acabe;}};return this[_0x410fe7(0x5f5)]()[_0x410fe7(0x6c3)](_0x52f520,0x0);},Game_BattlerBase['prototype']['param']=function(_0x35059c){const _0x31b4ea=_0x5eb334;let _0x29bd83=_0x31b4ea(0x947)+_0x35059c+_0x31b4ea(0x793);if(this['checkCacheKey'](_0x29bd83))return this[_0x31b4ea(0x8af)][_0x29bd83];return this[_0x31b4ea(0x8af)][_0x29bd83]=Math[_0x31b4ea(0x811)](VisuMZ[_0x31b4ea(0x541)][_0x31b4ea(0x467)][_0x31b4ea(0x6f3)][_0x31b4ea(0x5d5)][_0x31b4ea(0x3e2)](this,_0x35059c)),this['_cache'][_0x29bd83];},Game_BattlerBase[_0x5eb334(0x63b)]['xparamPlus']=function(_0x395c24){const _0x305ef2=_0x5eb334,_0xe940fd=(_0x50c02e,_0x447dc8)=>{const _0x43e996=_0xd3e4;if(!_0x447dc8)return _0x50c02e;if(_0x447dc8[_0x43e996(0x908)][_0x43e996(0x6c9)](VisuMZ[_0x43e996(0x541)][_0x43e996(0x6b7)][_0x43e996(0x833)][_0x395c24])){if('kHjXS'===_0x43e996(0x345))_0x31484a[_0x43e996(0x541)][_0x43e996(0x854)][_0x43e996(0x3e2)](this,_0x42a53b);else{var _0x33e07b=Number(RegExp['$1'])/0x64;_0x50c02e+=_0x33e07b;}}if(_0x447dc8[_0x43e996(0x908)][_0x43e996(0x6c9)](VisuMZ[_0x43e996(0x541)][_0x43e996(0x6b7)]['xparamPlus2'][_0x395c24])){if(_0x43e996(0x50b)===_0x43e996(0x6c1)){if(_0xf659f8[_0x43e996(0x96e)]())_0x2b2343['log'](_0x4b374d);}else{var _0x33e07b=Number(RegExp['$1']);_0x50c02e+=_0x33e07b;}}if(_0x447dc8[_0x43e996(0x908)][_0x43e996(0x6c9)](VisuMZ[_0x43e996(0x541)]['RegExp'][_0x43e996(0x8d7)][_0x395c24])){var _0x5af144=String(RegExp['$1']);try{if('BfMOF'!==_0x43e996(0x460)){var _0x346f40=_0x8a726e(_0x2df4b8['$1']);try{_0x46468d*=_0x199055(_0x346f40);}catch(_0x406378){if(_0xad9f17[_0x43e996(0x96e)]())_0x4e0188[_0x43e996(0x76e)](_0x406378);}}else _0x50c02e+=eval(_0x5af144);}catch(_0x1d327b){if($gameTemp[_0x43e996(0x96e)]())console[_0x43e996(0x76e)](_0x1d327b);}}return _0x50c02e;};return this['traitObjects']()[_0x305ef2(0x6c3)](_0xe940fd,0x0);},Game_BattlerBase['prototype'][_0x5eb334(0x59d)]=function(_0x2cb243){const _0x119b43=_0x5eb334,_0x497b7e=(_0x1bd91b,_0x3d4ca7)=>{const _0x43b0ea=_0xd3e4;if(!_0x3d4ca7)return _0x1bd91b;if(_0x3d4ca7[_0x43b0ea(0x908)][_0x43b0ea(0x6c9)](VisuMZ[_0x43b0ea(0x541)][_0x43b0ea(0x6b7)]['xparamRate1'][_0x2cb243])){if(_0x43b0ea(0x187)==='ntPVF'){var _0x42ca69=Number(RegExp['$1'])/0x64;_0x1bd91b*=_0x42ca69;}else{if(_0x2879cc)_0xb9bc08[_0x43b0ea(0x422)](_0x57ea1c);}}if(_0x3d4ca7['note'][_0x43b0ea(0x6c9)](VisuMZ[_0x43b0ea(0x541)][_0x43b0ea(0x6b7)][_0x43b0ea(0x6b9)][_0x2cb243])){var _0x42ca69=Number(RegExp['$1']);_0x1bd91b*=_0x42ca69;}if(_0x3d4ca7[_0x43b0ea(0x908)]['match'](VisuMZ['CoreEngine'][_0x43b0ea(0x6b7)][_0x43b0ea(0x933)][_0x2cb243])){if(_0x43b0ea(0x282)!==_0x43b0ea(0x282))_0x432367[_0x43b0ea(0x941)]();else{var _0x11ac83=String(RegExp['$1']);try{if('WFYmz'!==_0x43b0ea(0x410))_0x1bd91b*=eval(_0x11ac83);else{const _0x16d8df=_0x2e3983[_0x43b0ea(0x549)]();if(_0x16d8df)for(const _0x5e7fb3 of _0x16d8df){if(_0x5e7fb3&&_0x5e7fb3[_0x43b0ea(0x25a)]){if(this['isGamepadButtonPressed'](_0x5e7fb3))return!![];if(this[_0x43b0ea(0x78c)](_0x5e7fb3))return!![];}}}}catch(_0x24d5e8){if($gameTemp[_0x43b0ea(0x96e)]())console[_0x43b0ea(0x76e)](_0x24d5e8);}}}return _0x1bd91b;};return this[_0x119b43(0x5f5)]()[_0x119b43(0x6c3)](_0x497b7e,0x1);},Game_BattlerBase[_0x5eb334(0x63b)][_0x5eb334(0x84c)]=function(_0x2d1733){const _0x515515=(_0x49f7ba,_0x520c34)=>{const _0x759806=_0xd3e4;if(!_0x520c34)return _0x49f7ba;if(_0x520c34[_0x759806(0x908)][_0x759806(0x6c9)](VisuMZ[_0x759806(0x541)][_0x759806(0x6b7)][_0x759806(0x12e)][_0x2d1733])){var _0x43152e=Number(RegExp['$1'])/0x64;_0x49f7ba+=_0x43152e;}if(_0x520c34[_0x759806(0x908)][_0x759806(0x6c9)](VisuMZ[_0x759806(0x541)][_0x759806(0x6b7)]['xparamFlat2'][_0x2d1733])){if(_0x759806(0x457)==='xtaJi'){const _0x50f7b7=_0x49facf[_0x759806(0x965)][_0x759806(0x90f)],_0xbb1b52=_0x117f2c[_0x759806(0x965)][_0x759806(0x452)],_0x49080c=_0x1706b1[_0x759806(0x541)][_0x759806(0x467)]['UI'][_0x759806(0x729)];_0x1f2583[_0x759806(0x61e)]=_0x50f7b7-_0x49080c*0x2,_0x404a06['boxHeight']=_0xbb1b52-_0x49080c*0x2,this[_0x759806(0x8f9)]();}else{var _0x43152e=Number(RegExp['$1']);_0x49f7ba+=_0x43152e;}}if(_0x520c34['note'][_0x759806(0x6c9)](VisuMZ['CoreEngine'][_0x759806(0x6b7)][_0x759806(0x78a)][_0x2d1733])){if('tNtAt'===_0x759806(0x615)){const _0x472a5f=_0x241ef0['ApplyEasing']((_0x5b18b6-_0x9d2b7e)/_0x581772,_0x2b26e8||'Linear'),_0x39a172=_0x26c994['ApplyEasing']((_0x77475f-_0x32274a+0x1)/_0x5b0d8e,_0x52e824||_0x759806(0x31d)),_0x1a024b=(_0x4e40fb-_0xea34eb*_0x472a5f)/(0x1-_0x472a5f);return _0x1a024b+(_0x2d95a4-_0x1a024b)*_0x39a172;}else{var _0x19f144=String(RegExp['$1']);try{_0x49f7ba+=eval(_0x19f144);}catch(_0x26311b){if($gameTemp[_0x759806(0x96e)]())console[_0x759806(0x76e)](_0x26311b);}}}return _0x49f7ba;};return this['traitObjects']()['reduce'](_0x515515,0x0);},Game_BattlerBase['prototype'][_0x5eb334(0x760)]=function(_0x4f9a5d){const _0x1de086=_0x5eb334;let _0x141c83=_0x1de086(0x760)+_0x4f9a5d+_0x1de086(0x793);if(this[_0x1de086(0x92a)](_0x141c83))return this[_0x1de086(0x8af)][_0x141c83];return this[_0x1de086(0x8af)][_0x141c83]=VisuMZ['CoreEngine'][_0x1de086(0x467)][_0x1de086(0x6f3)][_0x1de086(0x27e)][_0x1de086(0x3e2)](this,_0x4f9a5d),this[_0x1de086(0x8af)][_0x141c83];},Game_BattlerBase[_0x5eb334(0x63b)][_0x5eb334(0x80b)]=function(_0x1dc155){const _0x3dee99=_0x5eb334,_0x63c39d=(_0x2f68ef,_0x2f36fd)=>{const _0x35843e=_0xd3e4;if(!_0x2f36fd)return _0x2f68ef;if(_0x2f36fd[_0x35843e(0x908)][_0x35843e(0x6c9)](VisuMZ[_0x35843e(0x541)][_0x35843e(0x6b7)][_0x35843e(0x60a)][_0x1dc155])){var _0x48a299=Number(RegExp['$1'])/0x64;_0x2f68ef+=_0x48a299;}if(_0x2f36fd[_0x35843e(0x908)]['match'](VisuMZ['CoreEngine'][_0x35843e(0x6b7)]['sparamPlus2'][_0x1dc155])){var _0x48a299=Number(RegExp['$1']);_0x2f68ef+=_0x48a299;}if(_0x2f36fd[_0x35843e(0x908)][_0x35843e(0x6c9)](VisuMZ[_0x35843e(0x541)][_0x35843e(0x6b7)][_0x35843e(0x6eb)][_0x1dc155])){var _0x288431=String(RegExp['$1']);try{_0x2f68ef+=eval(_0x288431);}catch(_0x395714){if($gameTemp[_0x35843e(0x96e)]())console['log'](_0x395714);}}return _0x2f68ef;};return this[_0x3dee99(0x5f5)]()[_0x3dee99(0x6c3)](_0x63c39d,0x0);},Game_BattlerBase[_0x5eb334(0x63b)][_0x5eb334(0x379)]=function(_0x144a23){const _0x4884de=_0x5eb334,_0x53c123=(_0x1e04d9,_0x4ecb7f)=>{const _0x14ca1b=_0xd3e4;if(!_0x4ecb7f)return _0x1e04d9;if(_0x4ecb7f['note'][_0x14ca1b(0x6c9)](VisuMZ[_0x14ca1b(0x541)][_0x14ca1b(0x6b7)][_0x14ca1b(0x674)][_0x144a23])){if(_0x14ca1b(0x141)!==_0x14ca1b(0x211)){var _0x56994e=Number(RegExp['$1'])/0x64;_0x1e04d9*=_0x56994e;}else return _0x4b807f[_0x14ca1b(0x885)]['OptionsRect'][_0x14ca1b(0x3e2)](this);}if(_0x4ecb7f[_0x14ca1b(0x908)][_0x14ca1b(0x6c9)](VisuMZ[_0x14ca1b(0x541)][_0x14ca1b(0x6b7)][_0x14ca1b(0x63d)][_0x144a23])){var _0x56994e=Number(RegExp['$1']);_0x1e04d9*=_0x56994e;}if(_0x4ecb7f['note'][_0x14ca1b(0x6c9)](VisuMZ['CoreEngine'][_0x14ca1b(0x6b7)][_0x14ca1b(0x358)][_0x144a23])){var _0x5ef004=String(RegExp['$1']);try{_0x1e04d9*=eval(_0x5ef004);}catch(_0x532692){if($gameTemp[_0x14ca1b(0x96e)]())console[_0x14ca1b(0x76e)](_0x532692);}}return _0x1e04d9;};return this[_0x4884de(0x5f5)]()[_0x4884de(0x6c3)](_0x53c123,0x1);},Game_BattlerBase[_0x5eb334(0x63b)][_0x5eb334(0x6ea)]=function(_0x35ce81){const _0x9fb19e=_0x5eb334,_0x4cd1c2=(_0x4539c6,_0x21e9fe)=>{const _0x2d54c0=_0xd3e4;if(_0x2d54c0(0x47a)===_0x2d54c0(0x447))this[_0x2d54c0(0x931)](_0x47cb5f[_0x2d54c0(0x640)](this['index'](),0x0));else{if(!_0x21e9fe)return _0x4539c6;if(_0x21e9fe['note'][_0x2d54c0(0x6c9)](VisuMZ[_0x2d54c0(0x541)][_0x2d54c0(0x6b7)]['sparamFlat1'][_0x35ce81])){var _0x19db34=Number(RegExp['$1'])/0x64;_0x4539c6+=_0x19db34;}if(_0x21e9fe[_0x2d54c0(0x908)]['match'](VisuMZ[_0x2d54c0(0x541)]['RegExp'][_0x2d54c0(0x32c)][_0x35ce81])){var _0x19db34=Number(RegExp['$1']);_0x4539c6+=_0x19db34;}if(_0x21e9fe[_0x2d54c0(0x908)][_0x2d54c0(0x6c9)](VisuMZ[_0x2d54c0(0x541)][_0x2d54c0(0x6b7)]['sparamFlatJS'][_0x35ce81])){if(_0x2d54c0(0x702)==='OJtcL')_0x13d87b['CoreEngine'][_0x2d54c0(0x320)](_0x2c0224);else{var _0x5b5456=String(RegExp['$1']);try{_0x4539c6+=eval(_0x5b5456);}catch(_0x14224c){if(_0x2d54c0(0x3e1)!==_0x2d54c0(0x3e1)){const _0x1fc118=_0x24bb90['CoreEngine']['Settings'][_0x2d54c0(0x38c)];this[_0x2d54c0(0x62d)]=_0x1fc118?.[_0x2d54c0(0x49c)]||'random';}else{if($gameTemp[_0x2d54c0(0x96e)]())console[_0x2d54c0(0x76e)](_0x14224c);}}}}return _0x4539c6;}};return this[_0x9fb19e(0x5f5)]()[_0x9fb19e(0x6c3)](_0x4cd1c2,0x0);},Game_BattlerBase[_0x5eb334(0x63b)][_0x5eb334(0x584)]=function(_0x317552){const _0x32739d=_0x5eb334;let _0x4814b8='sparam'+_0x317552+_0x32739d(0x793);if(this[_0x32739d(0x92a)](_0x4814b8))return this[_0x32739d(0x8af)][_0x4814b8];return this[_0x32739d(0x8af)][_0x4814b8]=VisuMZ[_0x32739d(0x541)][_0x32739d(0x467)][_0x32739d(0x6f3)][_0x32739d(0x2a0)][_0x32739d(0x3e2)](this,_0x317552),this[_0x32739d(0x8af)][_0x4814b8];},Game_BattlerBase['prototype']['paramValueByName']=function(_0x5a1220,_0x567134){const _0x47db32=_0x5eb334;if(typeof paramId===_0x47db32(0x657))return this[_0x47db32(0x947)](_0x5a1220);_0x5a1220=String(_0x5a1220||'')['toUpperCase']();if(_0x5a1220==='MAXHP')return this[_0x47db32(0x947)](0x0);if(_0x5a1220===_0x47db32(0x326))return this[_0x47db32(0x947)](0x1);if(_0x5a1220==='ATK')return this[_0x47db32(0x947)](0x2);if(_0x5a1220==='DEF')return this[_0x47db32(0x947)](0x3);if(_0x5a1220===_0x47db32(0x4f7))return this[_0x47db32(0x947)](0x4);if(_0x5a1220==='MDF')return this[_0x47db32(0x947)](0x5);if(_0x5a1220===_0x47db32(0x24b))return this[_0x47db32(0x947)](0x6);if(_0x5a1220===_0x47db32(0x83a))return this[_0x47db32(0x947)](0x7);if(_0x5a1220===_0x47db32(0x32e))return _0x567134?String(Math[_0x47db32(0x811)](this[_0x47db32(0x760)](0x0)*0x64))+'%':this[_0x47db32(0x760)](0x0);if(_0x5a1220===_0x47db32(0x238))return _0x567134?String(Math[_0x47db32(0x811)](this[_0x47db32(0x760)](0x1)*0x64))+'%':this[_0x47db32(0x760)](0x1);if(_0x5a1220===_0x47db32(0x691))return _0x567134?String(Math[_0x47db32(0x811)](this[_0x47db32(0x760)](0x2)*0x64))+'%':this[_0x47db32(0x760)](0x2);if(_0x5a1220===_0x47db32(0x34c))return _0x567134?String(Math[_0x47db32(0x811)](this[_0x47db32(0x760)](0x3)*0x64))+'%':this[_0x47db32(0x760)](0x3);if(_0x5a1220===_0x47db32(0x3d6))return _0x567134?String(Math[_0x47db32(0x811)](this[_0x47db32(0x760)](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x5a1220===_0x47db32(0x992))return _0x567134?String(Math[_0x47db32(0x811)](this[_0x47db32(0x760)](0x5)*0x64))+'%':this[_0x47db32(0x760)](0x5);if(_0x5a1220===_0x47db32(0x5a6))return _0x567134?String(Math['round'](this[_0x47db32(0x760)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x5a1220===_0x47db32(0x774))return _0x567134?String(Math[_0x47db32(0x811)](this[_0x47db32(0x760)](0x7)*0x64))+'%':this[_0x47db32(0x760)](0x7);if(_0x5a1220===_0x47db32(0x8e3))return _0x567134?String(Math[_0x47db32(0x811)](this[_0x47db32(0x760)](0x8)*0x64))+'%':this[_0x47db32(0x760)](0x8);if(_0x5a1220===_0x47db32(0x195))return _0x567134?String(Math[_0x47db32(0x811)](this[_0x47db32(0x760)](0x9)*0x64))+'%':this[_0x47db32(0x760)](0x9);if(_0x5a1220==='TGR')return _0x567134?String(Math[_0x47db32(0x811)](this['sparam'](0x0)*0x64))+'%':this[_0x47db32(0x584)](0x0);if(_0x5a1220===_0x47db32(0x645))return _0x567134?String(Math[_0x47db32(0x811)](this[_0x47db32(0x584)](0x1)*0x64))+'%':this[_0x47db32(0x584)](0x1);if(_0x5a1220==='REC')return _0x567134?String(Math[_0x47db32(0x811)](this[_0x47db32(0x584)](0x2)*0x64))+'%':this[_0x47db32(0x584)](0x2);if(_0x5a1220===_0x47db32(0x482))return _0x567134?String(Math[_0x47db32(0x811)](this[_0x47db32(0x584)](0x3)*0x64))+'%':this[_0x47db32(0x584)](0x3);if(_0x5a1220===_0x47db32(0x96f))return _0x567134?String(Math[_0x47db32(0x811)](this[_0x47db32(0x584)](0x4)*0x64))+'%':this[_0x47db32(0x584)](0x4);if(_0x5a1220===_0x47db32(0x701))return _0x567134?String(Math['round'](this[_0x47db32(0x584)](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x5a1220===_0x47db32(0x291))return _0x567134?String(Math['round'](this[_0x47db32(0x584)](0x6)*0x64))+'%':this[_0x47db32(0x584)](0x6);if(_0x5a1220===_0x47db32(0x60b))return _0x567134?String(Math[_0x47db32(0x811)](this['sparam'](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x5a1220===_0x47db32(0x64c))return _0x567134?String(Math[_0x47db32(0x811)](this['sparam'](0x8)*0x64))+'%':this[_0x47db32(0x584)](0x8);if(_0x5a1220===_0x47db32(0x366))return _0x567134?String(Math[_0x47db32(0x811)](this[_0x47db32(0x584)](0x9)*0x64))+'%':this[_0x47db32(0x584)](0x9);if(VisuMZ[_0x47db32(0x541)][_0x47db32(0x4a9)][_0x5a1220]){const _0x30a0a0=VisuMZ['CoreEngine'][_0x47db32(0x4a9)][_0x5a1220],_0x3a0441=this[_0x30a0a0];return VisuMZ[_0x47db32(0x541)][_0x47db32(0x44d)][_0x5a1220]===_0x47db32(0x148)?_0x3a0441:_0x567134?String(Math[_0x47db32(0x811)](_0x3a0441*0x64))+'%':_0x3a0441;}return'';},Game_BattlerBase[_0x5eb334(0x63b)][_0x5eb334(0x3a7)]=function(){const _0x5ad70e=_0x5eb334;return this[_0x5ad70e(0x28e)]()&&this[_0x5ad70e(0x6e2)]<this[_0x5ad70e(0x1fe)]*VisuMZ['CoreEngine'][_0x5ad70e(0x467)][_0x5ad70e(0x6f3)][_0x5ad70e(0x538)];},Game_Battler['prototype'][_0x5eb334(0x4ab)]=function(){SoundManager['playMiss'](),this['requestMotion']('evade');},VisuMZ[_0x5eb334(0x541)]['Game_Actor_paramBase']=Game_Actor[_0x5eb334(0x63b)][_0x5eb334(0x458)],Game_Actor[_0x5eb334(0x63b)][_0x5eb334(0x458)]=function(_0x1e3e42){const _0x5c4ca1=_0x5eb334;if(this['level']>0x63)return this[_0x5c4ca1(0x1ed)](_0x1e3e42);return VisuMZ[_0x5c4ca1(0x541)][_0x5c4ca1(0x525)]['call'](this,_0x1e3e42);},Game_Actor[_0x5eb334(0x63b)][_0x5eb334(0x1ed)]=function(_0x4af8e3){const _0x26d0f5=_0x5eb334,_0x3b2e55=this['currentClass']()[_0x26d0f5(0x823)][_0x4af8e3][0x63],_0x150869=this['currentClass']()['params'][_0x4af8e3][0x62];return _0x3b2e55+(_0x3b2e55-_0x150869)*(this[_0x26d0f5(0x8a2)]-0x63);},VisuMZ['CoreEngine'][_0x5eb334(0x5fc)]=Game_Actor[_0x5eb334(0x63b)]['changeClass'],Game_Actor['prototype']['changeClass']=function(_0x3f8ac0,_0xe23e9){const _0x1b3982=_0x5eb334;$gameTemp[_0x1b3982(0x6f7)]=!![],VisuMZ[_0x1b3982(0x541)][_0x1b3982(0x5fc)]['call'](this,_0x3f8ac0,_0xe23e9),$gameTemp[_0x1b3982(0x6f7)]=undefined;},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x250)]=Game_Actor[_0x5eb334(0x63b)][_0x5eb334(0x491)],Game_Actor['prototype']['levelUp']=function(){const _0x46d7c9=_0x5eb334;VisuMZ[_0x46d7c9(0x541)][_0x46d7c9(0x250)][_0x46d7c9(0x3e2)](this);if(!$gameTemp[_0x46d7c9(0x6f7)])this['levelUpRecovery']();},Game_Actor[_0x5eb334(0x63b)][_0x5eb334(0x69b)]=function(){const _0xdf459f=_0x5eb334;this[_0xdf459f(0x8af)]={};if(VisuMZ[_0xdf459f(0x541)][_0xdf459f(0x467)][_0xdf459f(0x70a)][_0xdf459f(0x5fa)])this[_0xdf459f(0x6e2)]=this[_0xdf459f(0x1fe)];if(VisuMZ[_0xdf459f(0x541)][_0xdf459f(0x467)][_0xdf459f(0x70a)][_0xdf459f(0x40f)])this[_0xdf459f(0x534)]=this[_0xdf459f(0x3a8)];},Game_Actor[_0x5eb334(0x63b)]['expRate']=function(){const _0x5e02b5=_0x5eb334;if(this[_0x5e02b5(0x2f3)]())return 0x1;const _0x50be17=this[_0x5e02b5(0x182)]()-this[_0x5e02b5(0x62f)](),_0x5e06c1=this[_0x5e02b5(0x1c1)]()-this['currentLevelExp']();return(_0x5e06c1/_0x50be17)[_0x5e02b5(0x84f)](0x0,0x1);},Game_Actor['prototype'][_0x5eb334(0x5f5)]=function(){const _0x3fdb3d=_0x5eb334,_0x176ccf=Game_Battler[_0x3fdb3d(0x63b)]['traitObjects'][_0x3fdb3d(0x3e2)](this);for(const _0x426940 of this[_0x3fdb3d(0x93b)]()){if(_0x426940){if('xMVCB'===_0x3fdb3d(0x423))_0x176ccf[_0x3fdb3d(0x6a4)](_0x426940);else{const _0x5ceb0d=_0x59c98d[_0x29a094];_0x5ceb0d?this[_0x3fdb3d(0x8dc)](_0x5ceb0d['list'],0x0):this[_0x3fdb3d(0x7af)]();}}}return _0x176ccf[_0x3fdb3d(0x6a4)](this[_0x3fdb3d(0x881)](),this[_0x3fdb3d(0x18b)]()),_0x176ccf;},Object[_0x5eb334(0x64d)](Game_Enemy[_0x5eb334(0x63b)],'level',{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy['prototype']['getLevel']=function(){const _0x1ca7df=_0x5eb334;return this[_0x1ca7df(0x17d)]()[_0x1ca7df(0x8a2)];},Game_Enemy['prototype']['moveRelativeToResolutionChange']=function(){const _0x21618d=_0x5eb334;!this[_0x21618d(0x88c)]&&(this[_0x21618d(0x69c)]+=Math[_0x21618d(0x811)]((Graphics[_0x21618d(0x289)]-0x270)/0x2),this[_0x21618d(0x69c)]-=Math[_0x21618d(0x7fd)]((Graphics['height']-Graphics[_0x21618d(0x787)])/0x2),$gameSystem[_0x21618d(0x15d)]()?this[_0x21618d(0x233)]-=Math[_0x21618d(0x7fd)]((Graphics['width']-Graphics[_0x21618d(0x61e)])/0x2):this[_0x21618d(0x233)]+=Math[_0x21618d(0x811)]((Graphics[_0x21618d(0x61e)]-0x330)/0x2)),this['_repositioned']=!![];},Game_Party[_0x5eb334(0x63b)][_0x5eb334(0x69a)]=function(){const _0x5a90fb=_0x5eb334;return VisuMZ['CoreEngine'][_0x5a90fb(0x467)][_0x5a90fb(0x612)][_0x5a90fb(0x572)];},VisuMZ[_0x5eb334(0x541)]['Game_Party_consumeItem']=Game_Party[_0x5eb334(0x63b)][_0x5eb334(0x427)],Game_Party[_0x5eb334(0x63b)][_0x5eb334(0x427)]=function(_0x3f8757){const _0x3be108=_0x5eb334;if(VisuMZ[_0x3be108(0x541)][_0x3be108(0x467)]['QoL']['KeyItemProtect']&&DataManager['isKeyItem'](_0x3f8757))return;VisuMZ[_0x3be108(0x541)][_0x3be108(0x39e)][_0x3be108(0x3e2)](this,_0x3f8757);},Game_Party[_0x5eb334(0x63b)][_0x5eb334(0x962)]=function(){const _0x301189=_0x5eb334,_0x264c99=VisuMZ[_0x301189(0x541)][_0x301189(0x467)]['QoL'],_0x427363=_0x264c99[_0x301189(0x94a)]??0x63;let _0x27a4dd=[];if(_0x264c99[_0x301189(0x270)]??!![]){if(_0x301189(0x8ff)==='FFGNs')_0x27a4dd=_0x27a4dd[_0x301189(0x4e0)]($dataItems);else{var _0x262107=_0x1eecfa(_0x289940['$1'])/0x64;_0x42ca38+=_0x262107;}}(_0x264c99['BTestWeapons']??!![])&&(_0x27a4dd=_0x27a4dd[_0x301189(0x4e0)]($dataWeapons));(_0x264c99['BTestArmors']??!![])&&(_0x27a4dd=_0x27a4dd[_0x301189(0x4e0)]($dataArmors));for(const _0x2247df of _0x27a4dd){if(!_0x2247df)continue;if(_0x2247df[_0x301189(0x536)]['trim']()<=0x0)continue;if(_0x2247df[_0x301189(0x536)][_0x301189(0x6c9)](/-----/i))continue;this[_0x301189(0x170)](_0x2247df,_0x427363);}},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x7a7)]=Game_Troop[_0x5eb334(0x63b)][_0x5eb334(0x8dc)],Game_Troop[_0x5eb334(0x63b)]['setup']=function(_0x20ce15){const _0x1a6e51=_0x5eb334;$gameTemp[_0x1a6e51(0x848)](),$gameTemp[_0x1a6e51(0x445)](_0x20ce15),VisuMZ[_0x1a6e51(0x541)][_0x1a6e51(0x7a7)][_0x1a6e51(0x3e2)](this,_0x20ce15);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x955)]=Game_Map['prototype'][_0x5eb334(0x8dc)],Game_Map[_0x5eb334(0x63b)][_0x5eb334(0x8dc)]=function(_0x8f4907){const _0x232b0f=_0x5eb334;VisuMZ['CoreEngine'][_0x232b0f(0x955)]['call'](this,_0x8f4907),this[_0x232b0f(0x909)](),this[_0x232b0f(0x288)](_0x8f4907);},Game_Map[_0x5eb334(0x63b)][_0x5eb334(0x288)]=function(){const _0x43d586=_0x5eb334;this['_hideTileShadows']=VisuMZ[_0x43d586(0x541)][_0x43d586(0x467)][_0x43d586(0x70a)][_0x43d586(0x206)]||![];const _0x7c4095=VisuMZ[_0x43d586(0x541)][_0x43d586(0x467)][_0x43d586(0x867)],_0x159e7a=$dataMap?$dataMap['note']||'':'';if(_0x159e7a[_0x43d586(0x6c9)](/<SHOW TILE SHADOWS>/i)){if('dAvqY'!==_0x43d586(0x8d1))this[_0x43d586(0x74b)]=![];else{const _0x5b08c8=_0x1af0a9['_scene'];for(let _0x5d9e71=0x1;_0x5d9e71<=0x5;_0x5d9e71++){if(this['_data'][_0x43d586(0x694)[_0x43d586(0x1ce)](_0x5d9e71)]!==_0x5b08c8[_0x43d586(0x2fb)[_0x43d586(0x1ce)](_0x5d9e71)]())return this[_0x43d586(0x4a7)]();if(this[_0x43d586(0x50f)][_0x43d586(0x471)[_0x43d586(0x1ce)](_0x5d9e71)]!==_0x5b08c8[_0x43d586(0x1bf)[_0x43d586(0x1ce)](_0x5d9e71)]())return this[_0x43d586(0x4a7)]();}}}else{if(_0x159e7a[_0x43d586(0x6c9)](/<HIDE TILE SHADOWS>/i)){if(_0x43d586(0x998)===_0x43d586(0x998))this[_0x43d586(0x74b)]=!![];else return _0x286ce4['layoutSettings'][_0x43d586(0x4ae)]['call'](this);}}if(_0x159e7a[_0x43d586(0x6c9)](/<SCROLL LOCK X>/i))this[_0x43d586(0x959)]()[_0x43d586(0x968)]=!![],this[_0x43d586(0x959)]()[_0x43d586(0x94d)]=_0x7c4095[_0x43d586(0x4a5)];else _0x159e7a[_0x43d586(0x6c9)](/<SCROLL LOCK X: (.*?)>/i)&&('mXJZM'!=='mXJZM'?_0x54302a=_0x50143d(_0x3ea347['$1'])*_0x34b78a['width']:(this[_0x43d586(0x959)]()['centerX']=!![],this[_0x43d586(0x959)]()[_0x43d586(0x94d)]=Number(RegExp['$1'])));if(_0x159e7a[_0x43d586(0x6c9)](/<SCROLL LOCK Y>/i))_0x43d586(0x3cf)===_0x43d586(0x4b6)?(_0x2c0361[_0x43d586(0x541)][_0x43d586(0x604)][_0x43d586(0x3e2)](this),this['initVisuMZCoreEngine']()):(this[_0x43d586(0x959)]()[_0x43d586(0x3d1)]=!![],this[_0x43d586(0x959)]()[_0x43d586(0x548)]=_0x7c4095['DisplayLockY']);else{if(_0x159e7a[_0x43d586(0x6c9)](/<SCROLL LOCK Y: (.*?)>/i)){if(_0x43d586(0x6a3)==='acoYW')this[_0x43d586(0x959)]()[_0x43d586(0x3d1)]=!![],this[_0x43d586(0x959)]()[_0x43d586(0x548)]=Number(RegExp['$1']);else{const _0xd68696=_0x59c70c[_0x43d586(0x549)]();if(_0xd68696)for(const _0x56aa41 of _0xd68696){if(_0x56aa41&&_0x56aa41['connected'])return!![];}}}}},Game_Map['prototype']['areTileShadowsHidden']=function(){const _0x38b48b=_0x5eb334;if(this[_0x38b48b(0x74b)]===undefined)this[_0x38b48b(0x288)]();return this[_0x38b48b(0x74b)];},Game_Map[_0x5eb334(0x63b)][_0x5eb334(0x909)]=function(){const _0x5b4c47=_0x5eb334,_0x5945b8=VisuMZ[_0x5b4c47(0x541)][_0x5b4c47(0x467)][_0x5b4c47(0x867)];this['_centerCameraCheck']={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x5945b8[_0x5b4c47(0x692)]){const _0x256070=Graphics[_0x5b4c47(0x21a)]/this[_0x5b4c47(0x79e)]();_0x256070%0x1!==0x0&&Math[_0x5b4c47(0x2df)](_0x256070)===this[_0x5b4c47(0x21a)]()&&!this[_0x5b4c47(0x322)]()&&('dLTXF'!==_0x5b4c47(0x77f)?(this[_0x5b4c47(0x62c)][_0x5b4c47(0x728)]=null,this[_0x5b4c47(0x4ed)]()):(this[_0x5b4c47(0x315)][_0x5b4c47(0x968)]=!![],this[_0x5b4c47(0x315)][_0x5b4c47(0x94d)]=_0x5945b8[_0x5b4c47(0x4a5)]||0x0));}if(_0x5945b8[_0x5b4c47(0x252)]){const _0x327b20=Graphics[_0x5b4c47(0x289)]/this[_0x5b4c47(0x4fd)]();if(_0x327b20%0x1!==0x0&&Math[_0x5b4c47(0x2df)](_0x327b20)===this[_0x5b4c47(0x289)]()&&!this['isLoopVertical']()){if('mMkYu'!=='mMkYu'){var _0xf05847=_0x44566e(_0x4e8575['$1'])/0x64;_0x6ea610*=_0xf05847;}else this[_0x5b4c47(0x315)][_0x5b4c47(0x3d1)]=!![],this[_0x5b4c47(0x315)]['displayY']=_0x5945b8['DisplayLockY']||0x0;}}},Game_Map[_0x5eb334(0x63b)][_0x5eb334(0x959)]=function(){const _0x51af1c=_0x5eb334;if(this['_centerCameraCheck']===undefined)this[_0x51af1c(0x909)]();return this[_0x51af1c(0x315)];},VisuMZ[_0x5eb334(0x541)]['Game_Map_scrollDown']=Game_Map[_0x5eb334(0x63b)][_0x5eb334(0x739)],Game_Map[_0x5eb334(0x63b)]['scrollDown']=function(_0x475b86){const _0xa66ca7=_0x5eb334;if(this[_0xa66ca7(0x959)]()[_0xa66ca7(0x3d1)]&&$gameScreen['zoomScale']()===0x1){if(_0xa66ca7(0x97a)!==_0xa66ca7(0x8c1)){this['_displayY']=this[_0xa66ca7(0x959)]()['displayY'];return;}else{const _0x291341={'x':_0x11a489,'y':_0x31cc4c,'animationId':_0x29216f,'mirror':_0x2c6893,'mute':_0x5e2fc1};this['_pointAnimationQueue'][_0xa66ca7(0x6a4)](_0x291341);}}VisuMZ[_0xa66ca7(0x541)][_0xa66ca7(0x3ac)]['call'](this,_0x475b86);},VisuMZ[_0x5eb334(0x541)]['Game_Map_scrollLeft']=Game_Map[_0x5eb334(0x63b)][_0x5eb334(0x712)],Game_Map[_0x5eb334(0x63b)][_0x5eb334(0x712)]=function(_0x4424e7){const _0x310ab9=_0x5eb334;if(this[_0x310ab9(0x959)]()['centerX']&&$gameScreen['zoomScale']()===0x1){if(_0x310ab9(0x5df)!==_0x310ab9(0x5df))return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x310ab9(0x133)]);else{this['_displayX']=this[_0x310ab9(0x959)]()['displayX'];return;}}VisuMZ[_0x310ab9(0x541)][_0x310ab9(0x1b0)]['call'](this,_0x4424e7);},VisuMZ['CoreEngine']['Game_Map_scrollRight']=Game_Map[_0x5eb334(0x63b)][_0x5eb334(0x765)],Game_Map[_0x5eb334(0x63b)][_0x5eb334(0x765)]=function(_0x2d4db1){const _0x193b21=_0x5eb334;if(this[_0x193b21(0x959)]()['centerX']&&$gameScreen[_0x193b21(0x33d)]()===0x1){this['_displayX']=this[_0x193b21(0x959)]()[_0x193b21(0x94d)];return;}VisuMZ[_0x193b21(0x541)][_0x193b21(0x81d)]['call'](this,_0x2d4db1);},VisuMZ['CoreEngine'][_0x5eb334(0x167)]=Game_Map[_0x5eb334(0x63b)]['scrollUp'],Game_Map[_0x5eb334(0x63b)][_0x5eb334(0x235)]=function(_0x5683bd){const _0x354616=_0x5eb334;if(this[_0x354616(0x959)]()[_0x354616(0x3d1)]&&$gameScreen[_0x354616(0x33d)]()===0x1){this[_0x354616(0x8a6)]=this[_0x354616(0x959)]()['displayY'];return;}VisuMZ['CoreEngine'][_0x354616(0x167)][_0x354616(0x3e2)](this,_0x5683bd);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x4c2)]=Game_Character[_0x5eb334(0x63b)][_0x5eb334(0x781)],Game_Character[_0x5eb334(0x63b)][_0x5eb334(0x781)]=function(_0x224587){const _0x42e255=_0x5eb334;try{if(_0x42e255(0x605)===_0x42e255(0x1c3)){if(_0x6602a5[_0x42e255(0x96e)]())_0x140f94['log'](_0x2fe213);}else VisuMZ[_0x42e255(0x541)]['Game_Character_processMoveCommand'][_0x42e255(0x3e2)](this,_0x224587);}catch(_0x100982){if($gameTemp[_0x42e255(0x96e)]())console[_0x42e255(0x76e)](_0x100982);}},Game_Player[_0x5eb334(0x63b)][_0x5eb334(0x802)]=function(){const _0x51c3f3=_0x5eb334,_0x367cee=$gameMap[_0x51c3f3(0x8c3)]();this['_encounterCount']=Math['randomInt'](_0x367cee)+Math['randomInt'](_0x367cee)+this[_0x51c3f3(0x3fe)]();},Game_Player['prototype'][_0x5eb334(0x3fe)]=function(){const _0x13e783=_0x5eb334;return $dataMap&&$dataMap[_0x13e783(0x908)]&&$dataMap[_0x13e783(0x908)][_0x13e783(0x6c9)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ['CoreEngine'][_0x13e783(0x467)][_0x13e783(0x70a)][_0x13e783(0x79b)];},VisuMZ[_0x5eb334(0x541)]['Game_Event_isCollidedWithEvents']=Game_Event[_0x5eb334(0x63b)]['isCollidedWithEvents'],Game_Event['prototype'][_0x5eb334(0x750)]=function(_0x383828,_0x361dc9){const _0xbe04e0=_0x5eb334;return this['isSmartEventCollisionOn']()?this[_0xbe04e0(0x24e)](_0x383828,_0x361dc9):VisuMZ[_0xbe04e0(0x541)][_0xbe04e0(0x48f)]['call'](this,_0x383828,_0x361dc9);},Game_Event[_0x5eb334(0x63b)][_0x5eb334(0x77b)]=function(){const _0xb336b5=_0x5eb334;return VisuMZ[_0xb336b5(0x541)][_0xb336b5(0x467)][_0xb336b5(0x70a)][_0xb336b5(0x2d5)];},Game_Event['prototype'][_0x5eb334(0x24e)]=function(_0x49ad47,_0x4b85b7){const _0xed9671=_0x5eb334;if(!this[_0xed9671(0x970)]()){if(_0xed9671(0x665)===_0xed9671(0x665))return![];else _0x21b6dd[_0xed9671(0x50a)]&&_0x4abd9c[_0xed9671(0x50a)]();}else{if(_0xed9671(0x2c3)!==_0xed9671(0x2c3)){var _0x469a24=_0x44f725(_0x220965['$1']);_0x9b51c5+=_0x469a24;}else{const _0x2f1ce8=$gameMap[_0xed9671(0x989)](_0x49ad47,_0x4b85b7)[_0xed9671(0x1a9)](_0x40b25a=>_0x40b25a['isNormalPriority']());return _0x2f1ce8[_0xed9671(0x61b)]>0x0;}}},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x34e)]=Game_Interpreter['prototype'][_0x5eb334(0x926)],Game_Interpreter[_0x5eb334(0x63b)][_0x5eb334(0x926)]=function(_0x3c918a){const _0x22e91f=_0x5eb334,_0x12ed16=this['getCombinedScrollingText']();return _0x12ed16[_0x22e91f(0x6c9)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x22e91f(0x4c5)](_0x12ed16):VisuMZ[_0x22e91f(0x541)][_0x22e91f(0x34e)][_0x22e91f(0x3e2)](this,_0x3c918a);},Game_Interpreter[_0x5eb334(0x63b)][_0x5eb334(0x63e)]=function(){const _0x49b584=_0x5eb334;let _0x3d8964='',_0x370ffd=this[_0x49b584(0x38b)]+0x1;while(this['_list'][_0x370ffd]&&this[_0x49b584(0x18c)][_0x370ffd][_0x49b584(0x479)]===0x195){_0x3d8964+=this[_0x49b584(0x18c)][_0x370ffd][_0x49b584(0x8c6)][0x0]+'\x0a',_0x370ffd++;}return _0x3d8964;},Game_Interpreter[_0x5eb334(0x63b)][_0x5eb334(0x4c5)]=function(_0x428e56){const _0x5943d2=_0x5eb334;try{_0x5943d2(0x88b)===_0x5943d2(0x27a)?this[_0x5943d2(0x6ca)]()&&this['subject']()['canAttack']()?_0x135f28['CoreEngine']['Game_Action_setAttack'][_0x5943d2(0x3e2)](this):this['clear']():eval(_0x428e56);}catch(_0x35915e){$gameTemp[_0x5943d2(0x96e)]()&&(_0x5943d2(0x5dd)===_0x5943d2(0x5dd)?(console['log'](_0x5943d2(0x8bb)),console[_0x5943d2(0x76e)](_0x35915e)):this['startMove'](0x4b0,0x0,0x78));}return!![];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x854)]=Game_Interpreter['prototype'][_0x5eb334(0x8ba)],Game_Interpreter[_0x5eb334(0x63b)][_0x5eb334(0x8ba)]=function(_0x462044){const _0x22224f=_0x5eb334;try{if(_0x22224f(0x2ec)!==_0x22224f(0x2ec))return 0x0;else VisuMZ['CoreEngine'][_0x22224f(0x854)]['call'](this,_0x462044);}catch(_0x53fff1){if($gameTemp['isPlaytest']()){if(_0x22224f(0x58a)===_0x22224f(0x58a))console[_0x22224f(0x76e)]('Conditional\x20Branch\x20Script\x20Error'),console[_0x22224f(0x76e)](_0x53fff1);else return this[_0x22224f(0x135)]()?this[_0x22224f(0x5f8)]():_0x59faf9[_0x22224f(0x541)][_0x22224f(0x678)]['call'](this);}this[_0x22224f(0x4be)]();}return!![];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x61c)]=Game_Interpreter[_0x5eb334(0x63b)][_0x5eb334(0x405)],Game_Interpreter[_0x5eb334(0x63b)][_0x5eb334(0x405)]=function(_0x285266){const _0x418fb5=_0x5eb334;try{if(_0x418fb5(0x2dc)!==_0x418fb5(0x2dc))return _0x5d7651[_0x418fb5(0x63b)][_0x418fb5(0x831)][_0x418fb5(0x3e2)](this,_0x39256d);else VisuMZ[_0x418fb5(0x541)][_0x418fb5(0x61c)][_0x418fb5(0x3e2)](this,_0x285266);}catch(_0x448856){$gameTemp[_0x418fb5(0x96e)]()&&(console[_0x418fb5(0x76e)](_0x418fb5(0x79d)),console['log'](_0x448856));}return!![];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x40d)]=Game_Interpreter[_0x5eb334(0x63b)][_0x5eb334(0x96d)],Game_Interpreter[_0x5eb334(0x63b)][_0x5eb334(0x96d)]=function(){const _0x8233e0=_0x5eb334;try{VisuMZ[_0x8233e0(0x541)][_0x8233e0(0x40d)][_0x8233e0(0x3e2)](this);}catch(_0x4b9cf4){$gameTemp[_0x8233e0(0x96e)]()&&(_0x8233e0(0x74e)!==_0x8233e0(0x74e)?this[_0x8233e0(0x42e)](_0x4602eb['CoreEngine'][_0x8233e0(0x467)]['Gold'][_0x8233e0(0x87b)],_0x4e3b89['x'],_0xeb4c64['y'],_0xd323f3[_0x8233e0(0x21a)],'right'):(console[_0x8233e0(0x76e)]('Script\x20Call\x20Error'),console[_0x8233e0(0x76e)](_0x4b9cf4)));}return!![];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x7b8)]=Game_Interpreter[_0x5eb334(0x63b)][_0x5eb334(0x357)],Game_Interpreter[_0x5eb334(0x63b)][_0x5eb334(0x357)]=function(_0x146be8){const _0x382b36=_0x5eb334;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x382b36(0x541)][_0x382b36(0x7b8)]['call'](this,_0x146be8);},Scene_Base[_0x5eb334(0x63b)]['fadeSpeed']=function(){const _0x4edffe=_0x5eb334;return VisuMZ[_0x4edffe(0x541)][_0x4edffe(0x467)]['UI'][_0x4edffe(0x3b8)];},Scene_Base[_0x5eb334(0x63b)]['isBottomHelpMode']=function(){const _0x226ebf=_0x5eb334;return VisuMZ['CoreEngine'][_0x226ebf(0x467)]['UI'][_0x226ebf(0x8e2)];},Scene_Base['prototype']['isBottomButtonMode']=function(){const _0x3a7565=_0x5eb334;return VisuMZ[_0x3a7565(0x541)]['Settings']['UI'][_0x3a7565(0x38e)];},Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x2ea)]=function(){const _0x23443f=_0x5eb334;return VisuMZ[_0x23443f(0x541)][_0x23443f(0x467)]['UI'][_0x23443f(0x706)];},Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x35a)]=function(){const _0x2b564c=_0x5eb334;return VisuMZ[_0x2b564c(0x541)][_0x2b564c(0x467)]['UI'][_0x2b564c(0x790)];},Scene_Base[_0x5eb334(0x63b)]['buttonAreaHeight']=function(){const _0x4dc4c6=_0x5eb334;return VisuMZ[_0x4dc4c6(0x541)][_0x4dc4c6(0x467)]['UI']['ButtonHeight'];},Scene_Base['prototype'][_0x5eb334(0x1df)]=function(){const _0x317891=_0x5eb334;return VisuMZ['CoreEngine'][_0x317891(0x467)]['Window']['EnableMasking'];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x8ad)]=Scene_Base[_0x5eb334(0x63b)]['createWindowLayer'],Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x181)]=function(){const _0x30291b=_0x5eb334;VisuMZ[_0x30291b(0x541)][_0x30291b(0x8ad)][_0x30291b(0x3e2)](this),this[_0x30291b(0x174)](),this[_0x30291b(0x177)]['x']=Math[_0x30291b(0x811)](this[_0x30291b(0x177)]['x']),this[_0x30291b(0x177)]['y']=Math[_0x30291b(0x811)](this[_0x30291b(0x177)]['y']);},Scene_Base[_0x5eb334(0x63b)]['createButtonAssistWindow']=function(){},Scene_Base['prototype'][_0x5eb334(0x887)]=function(){const _0x56561b=_0x5eb334;return TextManager[_0x56561b(0x36f)](_0x56561b(0x5e0),'pagedown');},Scene_Base['prototype'][_0x5eb334(0x807)]=function(){const _0x5b129e=_0x5eb334;return TextManager[_0x5b129e(0x273)](_0x5b129e(0x900));},Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x45c)]=function(){const _0x522a90=_0x5eb334;return TextManager[_0x522a90(0x273)](_0x522a90(0x80d));},Scene_Base['prototype'][_0x5eb334(0x1e0)]=function(){const _0x4f1a4e=_0x5eb334;return TextManager[_0x4f1a4e(0x273)]('ok');},Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x2f8)]=function(){const _0xac5181=_0x5eb334;return TextManager[_0xac5181(0x273)](_0xac5181(0x430));},Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x6e6)]=function(){const _0x5dc143=_0x5eb334;return this[_0x5dc143(0x4cb)]&&this[_0x5dc143(0x4cb)][_0x5dc143(0x1ad)]?TextManager['buttonAssistSwitch']:_0x5dc143(0x40b)==='lmQHL'?'':_0x23d676[_0x5dc143(0x8c7)];},Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x8f3)]=function(){return'';},Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x810)]=function(){return'';},Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x746)]=function(){const _0x486606=_0x5eb334;return TextManager[_0x486606(0x583)];},Scene_Base['prototype'][_0x5eb334(0x6da)]=function(){const _0x423707=_0x5eb334;return TextManager[_0x423707(0x207)];},Scene_Base['prototype'][_0x5eb334(0x55d)]=function(){return 0x0;},Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x37f)]=function(){return 0x0;},Scene_Base['prototype'][_0x5eb334(0x5b5)]=function(){return 0x0;},Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x559)]=function(){return 0x0;},Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x884)]=function(){return 0x0;},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x9a6)]=Scene_Boot[_0x5eb334(0x63b)][_0x5eb334(0x7ea)],Scene_Boot[_0x5eb334(0x63b)][_0x5eb334(0x7ea)]=function(){const _0xdb0f42=_0x5eb334;VisuMZ[_0xdb0f42(0x541)]['Scene_Boot_loadSystemImages']['call'](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x5eb334(0x63b)][_0x5eb334(0x31a)]=function(){const _0x30ccac=_0x5eb334,_0x4377fb=[_0x30ccac(0x1a0),_0x30ccac(0x531),'battlebacks2',_0x30ccac(0x60e),_0x30ccac(0x163),_0x30ccac(0x2d0),'parallaxes',_0x30ccac(0x346),_0x30ccac(0x51c),'sv_enemies','system',_0x30ccac(0x3e4),_0x30ccac(0x36c),'titles2'];for(const _0x232c42 of _0x4377fb){const _0x5a9ff8=VisuMZ[_0x30ccac(0x541)][_0x30ccac(0x467)]['ImgLoad'][_0x232c42],_0x955226=_0x30ccac(0x4e2)[_0x30ccac(0x1ce)](_0x232c42);for(const _0x1455f3 of _0x5a9ff8){ImageManager[_0x30ccac(0x1c0)](_0x955226,_0x1455f3);}}},VisuMZ[_0x5eb334(0x541)]['Scene_Boot_startNormalGame']=Scene_Boot[_0x5eb334(0x63b)][_0x5eb334(0x2f9)],Scene_Boot[_0x5eb334(0x63b)][_0x5eb334(0x2f9)]=function(){const _0x37ce4e=_0x5eb334;if(Utils[_0x37ce4e(0x565)]('test')&&VisuMZ[_0x37ce4e(0x541)][_0x37ce4e(0x467)][_0x37ce4e(0x70a)][_0x37ce4e(0x753)])this[_0x37ce4e(0x5d6)]();else{if(_0x37ce4e(0x1f7)===_0x37ce4e(0x1f7))VisuMZ[_0x37ce4e(0x541)]['Scene_Boot_startNormalGame'][_0x37ce4e(0x3e2)](this);else var _0x46ca62=_0x1b9358[_0x37ce4e(0x800)](_0x17d09b*0x2,_0x37ce4e(0x222))*0.5;}},Scene_Boot[_0x5eb334(0x63b)][_0x5eb334(0x5d6)]=function(){const _0x54132b=_0x5eb334;DataManager[_0x54132b(0x3d7)](),SceneManager[_0x54132b(0x54e)](Scene_Map);},Scene_Boot['prototype'][_0x5eb334(0x88f)]=function(){const _0x19f3ae=_0x5eb334,_0x54c4bc=$dataSystem[_0x19f3ae(0x965)][_0x19f3ae(0x90f)],_0x5c487b=$dataSystem[_0x19f3ae(0x965)][_0x19f3ae(0x452)],_0x5bd753=VisuMZ[_0x19f3ae(0x541)][_0x19f3ae(0x467)]['UI'][_0x19f3ae(0x729)];Graphics[_0x19f3ae(0x61e)]=_0x54c4bc-_0x5bd753*0x2,Graphics[_0x19f3ae(0x787)]=_0x5c487b-_0x5bd753*0x2,this[_0x19f3ae(0x8f9)]();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x277)]=Scene_Boot['prototype'][_0x5eb334(0x99b)],Scene_Boot[_0x5eb334(0x63b)][_0x5eb334(0x99b)]=function(){const _0x18db0e=_0x5eb334;this['isFullDocumentTitle']()?this[_0x18db0e(0x29c)]():VisuMZ['CoreEngine'][_0x18db0e(0x277)][_0x18db0e(0x3e2)](this);},Scene_Boot['prototype'][_0x5eb334(0x981)]=function(){const _0x2e67cd=_0x5eb334;if(Scene_Title[_0x2e67cd(0x8df)]==='')return![];if(Scene_Title[_0x2e67cd(0x8df)]===_0x2e67cd(0x90c))return![];if(Scene_Title[_0x2e67cd(0x86d)]==='')return![];if(Scene_Title[_0x2e67cd(0x86d)]==='0.00')return![];return!![];},Scene_Boot[_0x5eb334(0x63b)][_0x5eb334(0x29c)]=function(){const _0x1c4b6e=_0x5eb334,_0x220adb=$dataSystem[_0x1c4b6e(0x234)],_0x387e98=Scene_Title[_0x1c4b6e(0x8df)]||'',_0x38c68b=Scene_Title[_0x1c4b6e(0x86d)]||'',_0x5e59e2=VisuMZ[_0x1c4b6e(0x541)][_0x1c4b6e(0x467)][_0x1c4b6e(0x89a)][_0x1c4b6e(0x72e)][_0x1c4b6e(0x91a)],_0x85ed4a=_0x5e59e2[_0x1c4b6e(0x1ce)](_0x220adb,_0x387e98,_0x38c68b);document[_0x1c4b6e(0x75f)]=_0x85ed4a;},Scene_Boot[_0x5eb334(0x63b)][_0x5eb334(0x8f9)]=function(){const _0x349226=_0x5eb334;if(VisuMZ[_0x349226(0x541)][_0x349226(0x467)]['UI'][_0x349226(0x86b)]){const _0x37cb34=Graphics[_0x349226(0x21a)]-Graphics[_0x349226(0x61e)]-VisuMZ[_0x349226(0x541)]['Settings']['UI'][_0x349226(0x729)]*0x2,_0x3fcd66=Sprite_Button[_0x349226(0x63b)][_0x349226(0x1a6)][_0x349226(0x3e2)](this)*0x4;if(_0x37cb34>=_0x3fcd66)SceneManager[_0x349226(0x8cc)](!![]);}},Scene_Title['subtitle']=VisuMZ[_0x5eb334(0x541)]['Settings']['MenuLayout'][_0x5eb334(0x72e)][_0x5eb334(0x90c)],Scene_Title[_0x5eb334(0x86d)]=VisuMZ['CoreEngine']['Settings'][_0x5eb334(0x89a)][_0x5eb334(0x72e)][_0x5eb334(0x6a2)],Scene_Title[_0x5eb334(0x25e)]=VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)][_0x5eb334(0x990)],VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x8d3)]=Scene_Title[_0x5eb334(0x63b)][_0x5eb334(0x12d)],Scene_Title[_0x5eb334(0x63b)][_0x5eb334(0x12d)]=function(){const _0x3e4f16=_0x5eb334;VisuMZ['CoreEngine'][_0x3e4f16(0x467)][_0x3e4f16(0x89a)][_0x3e4f16(0x72e)][_0x3e4f16(0x12d)][_0x3e4f16(0x3e2)](this);if(Scene_Title[_0x3e4f16(0x8df)]!==''&&Scene_Title[_0x3e4f16(0x8df)]!==_0x3e4f16(0x90c))this['drawGameSubtitle']();if(Scene_Title[_0x3e4f16(0x86d)]!==''&&Scene_Title[_0x3e4f16(0x86d)]!==_0x3e4f16(0x76f))this['drawGameVersion']();},Scene_Title['prototype'][_0x5eb334(0x705)]=function(){const _0x275c8a=_0x5eb334;VisuMZ[_0x275c8a(0x541)][_0x275c8a(0x467)]['MenuLayout'][_0x275c8a(0x72e)][_0x275c8a(0x705)][_0x275c8a(0x3e2)](this);},Scene_Title['prototype'][_0x5eb334(0x743)]=function(){const _0x277f33=_0x5eb334;VisuMZ[_0x277f33(0x541)][_0x277f33(0x467)][_0x277f33(0x89a)]['Title'][_0x277f33(0x743)][_0x277f33(0x3e2)](this);},Scene_Title[_0x5eb334(0x63b)]['createCommandWindow']=function(){const _0x455bcc=_0x5eb334;this[_0x455bcc(0x258)]();const _0x23a6ef=$dataSystem[_0x455bcc(0x87a)][_0x455bcc(0x6fb)],_0x2809a0=this['commandWindowRect']();this[_0x455bcc(0x3fd)]=new Window_TitleCommand(_0x2809a0),this[_0x455bcc(0x3fd)][_0x455bcc(0x485)](_0x23a6ef);const _0xac30a=this[_0x455bcc(0x472)]();this[_0x455bcc(0x3fd)][_0x455bcc(0x300)](_0xac30a['x'],_0xac30a['y'],_0xac30a[_0x455bcc(0x21a)],_0xac30a[_0x455bcc(0x289)]),this[_0x455bcc(0x337)](this[_0x455bcc(0x3fd)]);},Scene_Title[_0x5eb334(0x63b)][_0x5eb334(0x6f6)]=function(){const _0x4fea0e=_0x5eb334;return this[_0x4fea0e(0x3fd)]?this[_0x4fea0e(0x3fd)][_0x4fea0e(0x2ee)]():_0x4fea0e(0x4cd)===_0x4fea0e(0x464)?this[_0x4fea0e(0x425)]||null:VisuMZ[_0x4fea0e(0x541)][_0x4fea0e(0x467)][_0x4fea0e(0x220)]['length'];},Scene_Title[_0x5eb334(0x63b)]['commandWindowRect']=function(){const _0x314133=_0x5eb334;return VisuMZ[_0x314133(0x541)]['Settings'][_0x314133(0x89a)][_0x314133(0x72e)]['CommandRect'][_0x314133(0x3e2)](this);},Scene_Title[_0x5eb334(0x63b)][_0x5eb334(0x258)]=function(){const _0x428ff0=_0x5eb334;for(const _0x1a4c77 of Scene_Title['pictureButtons']){if(_0x428ff0(0x5b4)==='TRwoa'){const _0x271694=new Sprite_TitlePictureButton(_0x1a4c77);this[_0x428ff0(0x569)](_0x271694);}else return!![];}},VisuMZ['CoreEngine'][_0x5eb334(0x1f5)]=Scene_Map[_0x5eb334(0x63b)]['initialize'],Scene_Map[_0x5eb334(0x63b)][_0x5eb334(0x1e1)]=function(){const _0x2a79b6=_0x5eb334;VisuMZ[_0x2a79b6(0x541)][_0x2a79b6(0x1f5)][_0x2a79b6(0x3e2)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x2a79b6(0x8f5)]();},VisuMZ['CoreEngine'][_0x5eb334(0x34f)]=Scene_Map['prototype']['updateMainMultiply'],Scene_Map[_0x5eb334(0x63b)][_0x5eb334(0x709)]=function(){const _0x42315e=_0x5eb334;VisuMZ[_0x42315e(0x541)]['Scene_Map_updateMainMultiply'][_0x42315e(0x3e2)](this),$gameTemp[_0x42315e(0x147)]&&!$gameMessage[_0x42315e(0x292)]()&&(this[_0x42315e(0x271)](),SceneManager[_0x42315e(0x22c)]());},Scene_Map['prototype'][_0x5eb334(0x7af)]=function(){const _0x2001b2=_0x5eb334;Scene_Message[_0x2001b2(0x63b)][_0x2001b2(0x7af)][_0x2001b2(0x3e2)](this),!SceneManager[_0x2001b2(0x648)](Scene_Battle)&&(this[_0x2001b2(0x3ca)]['update'](),this[_0x2001b2(0x19b)][_0x2001b2(0x86c)](),this[_0x2001b2(0x177)]['visible']=![],SceneManager[_0x2001b2(0x828)]()),$gameScreen[_0x2001b2(0x65c)](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x731)]=Scene_Map[_0x5eb334(0x63b)][_0x5eb334(0x305)],Scene_Map[_0x5eb334(0x63b)]['createMenuButton']=function(){const _0x46f57a=_0x5eb334;VisuMZ['CoreEngine'][_0x46f57a(0x731)]['call'](this),SceneManager[_0x46f57a(0x6ae)]()&&('kAsds'!=='kAsds'?_0x41a4c1[_0x46f57a(0x6e4)][_0x46f57a(0x3e2)](this,_0x685b60):this[_0x46f57a(0x4d5)]());},Scene_Map[_0x5eb334(0x63b)]['moveMenuButtonSideButtonLayout']=function(){const _0x4e8ac3=_0x5eb334;this[_0x4e8ac3(0x3c9)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x5eb334(0x541)]['Scene_Map_updateScene']=Scene_Map[_0x5eb334(0x63b)]['updateScene'],Scene_Map[_0x5eb334(0x63b)][_0x5eb334(0x3af)]=function(){const _0x50a80e=_0x5eb334;VisuMZ[_0x50a80e(0x541)][_0x50a80e(0x295)][_0x50a80e(0x3e2)](this),this[_0x50a80e(0x812)]();},Scene_Map[_0x5eb334(0x63b)]['updateDashToggle']=function(){const _0x552079=_0x5eb334;Input['isTriggered'](_0x552079(0x7d0))&&(ConfigManager['alwaysDash']=!ConfigManager[_0x552079(0x132)],ConfigManager[_0x552079(0x5b6)]());},VisuMZ['CoreEngine'][_0x5eb334(0x284)]=Scene_Map[_0x5eb334(0x63b)][_0x5eb334(0x271)],Scene_Map['prototype'][_0x5eb334(0x271)]=function(){const _0xcb509=_0x5eb334;VisuMZ['CoreEngine'][_0xcb509(0x284)]['call'](this),this[_0xcb509(0x6f2)]();},Scene_Map['prototype']['clearOnceParallelInterpreters']=function(){const _0xc9398c=_0x5eb334;this[_0xc9398c(0x7e0)]=[];},Scene_Map[_0x5eb334(0x63b)]['updateOnceParallelInterpreters']=function(){const _0x2e5fad=_0x5eb334;if(!this[_0x2e5fad(0x7e0)])return;for(const _0x5ab96a of this[_0x2e5fad(0x7e0)]){_0x5ab96a&&_0x5ab96a[_0x2e5fad(0x3c4)]();}},Scene_Map[_0x5eb334(0x63b)][_0x5eb334(0x23d)]=function(_0x25d644){const _0x489d83=_0x5eb334,_0x315f69=$dataCommonEvents[_0x25d644];if(!_0x315f69)return;const _0x1d8c90=new Game_OnceParallelInterpreter();this[_0x489d83(0x5c7)](_0x1d8c90),_0x1d8c90[_0x489d83(0x5b1)](_0x25d644);},Scene_Map['prototype'][_0x5eb334(0x5c7)]=function(_0x192ce3){const _0x54bcb6=_0x5eb334;this[_0x54bcb6(0x7e0)]=this['_onceParallelInterpreters']||[],this[_0x54bcb6(0x7e0)]['push'](_0x192ce3);},Scene_Map[_0x5eb334(0x63b)]['removeOnceParallelInterpreter']=function(_0x502401){const _0x4bda47=_0x5eb334;this[_0x4bda47(0x7e0)]=this[_0x4bda47(0x7e0)]||[],this['_onceParallelInterpreters'][_0x4bda47(0x61f)](_0x502401);};function _0xd3e4(_0x2c26b6,_0x257f16){const _0x192da7=_0x192d();return _0xd3e4=function(_0xd3e42f,_0x2d750e){_0xd3e42f=_0xd3e42f-0x12b;let _0x69357e=_0x192da7[_0xd3e42f];return _0x69357e;},_0xd3e4(_0x2c26b6,_0x257f16);}function Game_OnceParallelInterpreter(){const _0x453d42=_0x5eb334;this[_0x453d42(0x1e1)](...arguments);}Game_OnceParallelInterpreter['prototype']=Object['create'](Game_Interpreter['prototype']),Game_OnceParallelInterpreter['prototype'][_0x5eb334(0x62a)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype'][_0x5eb334(0x5b1)]=function(_0x198a7c){const _0x2f321b=_0x5eb334,_0x476e95=$dataCommonEvents[_0x198a7c];_0x476e95?this[_0x2f321b(0x8dc)](_0x476e95[_0x2f321b(0x41b)],0x0):_0x2f321b(0x418)!==_0x2f321b(0x972)?this['terminate']():this[_0x2f321b(0x89b)][_0x2f321b(0x485)](_0x2f26e5[_0x2f321b(0x885)][_0x2f321b(0x7d2)]);},Game_OnceParallelInterpreter[_0x5eb334(0x63b)][_0x5eb334(0x7af)]=function(){const _0x7acffe=_0x5eb334;if(!SceneManager[_0x7acffe(0x57e)]())return;SceneManager[_0x7acffe(0x984)][_0x7acffe(0x4ca)](this),Game_Interpreter[_0x7acffe(0x63b)][_0x7acffe(0x7af)]['call'](this);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x407)]=Scene_MenuBase[_0x5eb334(0x63b)][_0x5eb334(0x56e)],Scene_MenuBase[_0x5eb334(0x63b)]['helpAreaTop']=function(){const _0x1e986b=_0x5eb334;let _0x200750=0x0;if(SceneManager['areButtonsOutsideMainUI']())_0x200750=this['helpAreaTopSideButtonLayout']();else{if(_0x1e986b(0x403)==='QKiuH')_0x200750=VisuMZ[_0x1e986b(0x541)][_0x1e986b(0x407)]['call'](this);else return _0x50c79d[_0x1e986b(0x885)]['EditRect'][_0x1e986b(0x3e2)](this);}if(this[_0x1e986b(0x837)]()&&this[_0x1e986b(0x8f0)]()===_0x1e986b(0x481)){if('EhUeL'!=='EhUeL'){_0xa99ee6[_0x1e986b(0x638)]!==0x0?(_0x1c8ef6[_0x1e986b(0x387)]=0x0,_0x576a00[_0x1e986b(0x3c2)]=0x0,_0x49198c[_0x1e986b(0x4bf)]=0x0,_0x153090[_0x1e986b(0x638)]=0x0):(_0x428d4b[_0x1e986b(0x387)]=0x64,_0x4ad0f7['bgsVolume']=0x64,_0x4e3081[_0x1e986b(0x4bf)]=0x64,_0x7ec37e[_0x1e986b(0x638)]=0x64);_0x204e49[_0x1e986b(0x5b6)]();if(this[_0x1e986b(0x984)][_0x1e986b(0x62a)]===_0x573e8e){if(this[_0x1e986b(0x984)]['_optionsWindow'])this[_0x1e986b(0x984)][_0x1e986b(0x80a)][_0x1e986b(0x4a7)]();if(this[_0x1e986b(0x984)][_0x1e986b(0x59e)])this[_0x1e986b(0x984)]['_listWindow'][_0x1e986b(0x4a7)]();}}else _0x200750+=Window_ButtonAssist[_0x1e986b(0x63b)]['lineHeight']();}return _0x200750;},Scene_MenuBase['prototype'][_0x5eb334(0x52d)]=function(){const _0x1c3689=_0x5eb334;if(this[_0x1c3689(0x70d)]())return this['mainAreaBottom']();else{if(_0x1c3689(0x5c4)!==_0x1c3689(0x5c4))_0x695e37[_0x1c3689(0x744)](!_0xd297d9['isSideView']());else return 0x0;}},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x7ab)]=Scene_MenuBase[_0x5eb334(0x63b)][_0x5eb334(0x237)],Scene_MenuBase[_0x5eb334(0x63b)][_0x5eb334(0x237)]=function(){const _0x4346f7=_0x5eb334;if(SceneManager[_0x4346f7(0x8b6)]())return _0x4346f7(0x8e6)===_0x4346f7(0x8e6)?this[_0x4346f7(0x5ac)]():_0x23430c[_0x4346f7(0x8b6)]()?this[_0x4346f7(0x5ac)]():_0x109281[_0x4346f7(0x541)][_0x4346f7(0x7ab)]['call'](this);else{if(_0x4346f7(0x36e)!=='eQumW')_0x1f817a+=_0x4a5fed;else return VisuMZ[_0x4346f7(0x541)][_0x4346f7(0x7ab)]['call'](this);}},Scene_MenuBase['prototype'][_0x5eb334(0x5ac)]=function(){const _0x53db04=_0x5eb334;if(!this[_0x53db04(0x70d)]())return this[_0x53db04(0x892)]();else{if(_0x53db04(0x424)!==_0x53db04(0x16e))return 0x0;else this[_0x53db04(0x469)]&&(this['openness']+=this[_0x53db04(0x924)](),this[_0x53db04(0x47c)]()&&(this[_0x53db04(0x469)]=![]));}},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x626)]=Scene_MenuBase[_0x5eb334(0x63b)]['mainAreaHeight'],Scene_MenuBase['prototype'][_0x5eb334(0x871)]=function(){const _0x544d2e=_0x5eb334;let _0x47b42a=0x0;return SceneManager[_0x544d2e(0x8b6)]()?_0x47b42a=this[_0x544d2e(0x1b5)]():_0x47b42a=VisuMZ['CoreEngine'][_0x544d2e(0x626)][_0x544d2e(0x3e2)](this),this[_0x544d2e(0x837)]()&&this['getButtonAssistLocation']()!==_0x544d2e(0x1a3)&&(_0x47b42a-=Window_ButtonAssist['prototype'][_0x544d2e(0x217)]()),_0x47b42a;},Scene_MenuBase[_0x5eb334(0x63b)]['mainAreaHeightSideButtonLayout']=function(){const _0x42663c=_0x5eb334;return Graphics[_0x42663c(0x787)]-this[_0x42663c(0x79c)]();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x38f)]=Scene_MenuBase[_0x5eb334(0x63b)][_0x5eb334(0x1e5)],Scene_MenuBase[_0x5eb334(0x63b)][_0x5eb334(0x1e5)]=function(){const _0x5b3e65=_0x5eb334;this[_0x5b3e65(0x641)]=new PIXI[(_0x5b3e65(0x36a))][(_0x5b3e65(0x478))](clamp=!![]),this[_0x5b3e65(0x3b3)]=new Sprite(),this[_0x5b3e65(0x3b3)][_0x5b3e65(0x83b)]=SceneManager[_0x5b3e65(0x6af)](),this[_0x5b3e65(0x3b3)][_0x5b3e65(0x36a)]=[this[_0x5b3e65(0x641)]],this[_0x5b3e65(0x569)](this[_0x5b3e65(0x3b3)]),this[_0x5b3e65(0x5db)](0xc0),this[_0x5b3e65(0x5db)](this[_0x5b3e65(0x8c0)]()),this['createCustomBackgroundImages']();},Scene_MenuBase['prototype'][_0x5eb334(0x8c0)]=function(){const _0x5f0390=_0x5eb334,_0xa87c47=String(this[_0x5f0390(0x62a)][_0x5f0390(0x536)]),_0x4c8b5a=this[_0x5f0390(0x23e)](_0xa87c47);if(_0x4c8b5a){if(_0x5f0390(0x166)===_0x5f0390(0x9a9))this['_registerKeyInput'](_0x102f25);else return _0x4c8b5a[_0x5f0390(0x197)];}else{if('HyDRu'===_0x5f0390(0x78d)){const _0x34b3f3=this[_0x5f0390(0x536)](),_0x3ca003=this[_0x5f0390(0x2d8)](),_0x39f9af=this[_0x5f0390(0x5f2)]();this[_0x5f0390(0x264)](),this[_0x5f0390(0x83b)]['clear'](),this[_0x5f0390(0x83b)][_0x5f0390(0x5cc)](_0x34b3f3,0x0,0x0,_0x3ca003,_0x39f9af,_0x5f0390(0x22f));}else return 0xc0;}},Scene_MenuBase[_0x5eb334(0x63b)][_0x5eb334(0x214)]=function(){const _0x5559e2=_0x5eb334,_0x53de08=String(this['constructor'][_0x5559e2(0x536)]),_0x4fa9d5=this[_0x5559e2(0x23e)](_0x53de08);_0x4fa9d5&&(_0x4fa9d5[_0x5559e2(0x976)]!==''||_0x4fa9d5[_0x5559e2(0x52e)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x5559e2(0x610)](_0x4fa9d5[_0x5559e2(0x976)])),this['_backSprite2']=new Sprite(ImageManager['loadTitle2'](_0x4fa9d5[_0x5559e2(0x52e)])),this[_0x5559e2(0x569)](this[_0x5559e2(0x9aa)]),this[_0x5559e2(0x569)](this[_0x5559e2(0x632)]),this['_backSprite1']['bitmap'][_0x5559e2(0x98f)](this[_0x5559e2(0x2f2)][_0x5559e2(0x1fa)](this,this['_backSprite1'])),this[_0x5559e2(0x632)][_0x5559e2(0x83b)]['addLoadListener'](this[_0x5559e2(0x2f2)]['bind'](this,this[_0x5559e2(0x632)])));},Scene_MenuBase[_0x5eb334(0x63b)][_0x5eb334(0x23e)]=function(_0x4199f1){const _0x47a900=_0x5eb334;return VisuMZ[_0x47a900(0x541)]['Settings'][_0x47a900(0x95b)][_0x4199f1]||VisuMZ[_0x47a900(0x541)][_0x47a900(0x467)]['MenuBg'][_0x47a900(0x846)];},Scene_MenuBase[_0x5eb334(0x63b)][_0x5eb334(0x2f2)]=function(_0x2f3da4){const _0x530415=_0x5eb334;this[_0x530415(0x30f)](_0x2f3da4),this[_0x530415(0x8be)](_0x2f3da4);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x286)]=Scene_MenuBase['prototype'][_0x5eb334(0x508)],Scene_MenuBase[_0x5eb334(0x63b)]['createCancelButton']=function(){const _0x172231=_0x5eb334;VisuMZ[_0x172231(0x541)][_0x172231(0x286)]['call'](this),SceneManager[_0x172231(0x6ae)]()&&this[_0x172231(0x329)]();},Scene_MenuBase[_0x5eb334(0x63b)]['moveCancelButtonSideButtonLayout']=function(){const _0x4df493=_0x5eb334;this[_0x4df493(0x2a2)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x72f)]=Scene_MenuBase['prototype']['createPageButtons'],Scene_MenuBase[_0x5eb334(0x63b)][_0x5eb334(0x48d)]=function(){const _0x5b7ccb=_0x5eb334;VisuMZ['CoreEngine'][_0x5b7ccb(0x72f)][_0x5b7ccb(0x3e2)](this);if(SceneManager['isSideButtonLayout']()){if(_0x5b7ccb(0x509)!==_0x5b7ccb(0x509)){const _0xee1173=0x90,_0x8dc14=0x60,_0xde9db0=0x18;this[_0x5b7ccb(0x2c4)]['bitmap']=this[_0x5b7ccb(0x930)],this[_0x5b7ccb(0x2c4)][_0x5b7ccb(0x784)]['x']=0.5,this['_pauseSignSprite'][_0x5b7ccb(0x784)]['y']=0x1,this['_pauseSignSprite'][_0x5b7ccb(0x300)](_0x32bd3d[_0x5b7ccb(0x811)](this['_width']/0x2),this['_height']),this[_0x5b7ccb(0x2c4)]['setFrame'](_0xee1173,_0x8dc14,_0xde9db0,_0xde9db0),this['_pauseSignSprite']['alpha']=0xff;}else this[_0x5b7ccb(0x6d7)]();}},Scene_MenuBase[_0x5eb334(0x63b)][_0x5eb334(0x6d7)]=function(){const _0xeba696=_0x5eb334;this[_0xeba696(0x4cb)]['x']=-0x1*(this[_0xeba696(0x4cb)]['width']+this[_0xeba696(0x517)][_0xeba696(0x21a)]+0x8),this[_0xeba696(0x517)]['x']=-0x1*(this[_0xeba696(0x517)][_0xeba696(0x21a)]+0x4);},Scene_MenuBase['prototype']['isMenuButtonAssistEnabled']=function(){const _0xa6d3fb=_0x5eb334;return VisuMZ[_0xa6d3fb(0x541)]['Settings'][_0xa6d3fb(0x755)][_0xa6d3fb(0x5c6)];},Scene_MenuBase[_0x5eb334(0x63b)][_0x5eb334(0x8f0)]=function(){const _0x590cd2=_0x5eb334;if(SceneManager[_0x590cd2(0x6ae)]()||SceneManager['areButtonsHidden']()){if('ybarr'==='QpsZi'){const _0x3ede1a=_0x1dd1a5[_0x590cd2(0x48e)],_0x11bd13=_0x5a3e28['iconHeight'],_0x368146=this[_0x590cd2(0x636)][_0x590cd2(0x6c9)](/SMOOTH/i);this[_0x590cd2(0x83b)]=new _0x230888(_0x3ede1a,_0x11bd13);const _0x5a51e9=_0x13d51e[_0x590cd2(0x232)](_0x590cd2(0x708)),_0x5e7806=_0x427f8b%0x10*_0x3ede1a,_0x39eaf8=_0x5139d7[_0x590cd2(0x7fd)](_0xd2ee85/0x10)*_0x11bd13;this[_0x590cd2(0x83b)][_0x590cd2(0x13b)]=_0x368146,this[_0x590cd2(0x83b)][_0x590cd2(0x224)](_0x5a51e9,_0x5e7806,_0x39eaf8,_0x3ede1a,_0x11bd13,0x0,0x0,_0x3ede1a,_0x11bd13);}else return VisuMZ[_0x590cd2(0x541)]['Settings'][_0x590cd2(0x755)][_0x590cd2(0x57d)];}else return'button';},Scene_MenuBase['prototype'][_0x5eb334(0x174)]=function(){const _0x588ba8=_0x5eb334;if(!this[_0x588ba8(0x837)]())return;const _0x3e2aef=this[_0x588ba8(0x5ab)]();this[_0x588ba8(0x820)]=new Window_ButtonAssist(_0x3e2aef),this[_0x588ba8(0x337)](this[_0x588ba8(0x820)]);},Scene_MenuBase[_0x5eb334(0x63b)]['buttonAssistWindowRect']=function(){const _0x140ebb=_0x5eb334;return this[_0x140ebb(0x8f0)]()===_0x140ebb(0x1a3)?this[_0x140ebb(0x450)]():this[_0x140ebb(0x26d)]();},Scene_MenuBase[_0x5eb334(0x63b)][_0x5eb334(0x450)]=function(){const _0x584cb5=_0x5eb334,_0x2df04b=ConfigManager[_0x584cb5(0x805)]?(Sprite_Button[_0x584cb5(0x63b)]['blockWidth']()+0x6)*0x2:0x0,_0x394380=this[_0x584cb5(0x180)](),_0x3412f8=Graphics[_0x584cb5(0x61e)]-_0x2df04b*0x2,_0x3de159=this[_0x584cb5(0x4b9)]();return new Rectangle(_0x2df04b,_0x394380,_0x3412f8,_0x3de159);},Scene_MenuBase[_0x5eb334(0x63b)][_0x5eb334(0x26d)]=function(){const _0x4ad1bb=_0x5eb334,_0x27b1a0=Graphics[_0x4ad1bb(0x61e)],_0x5bcd1c=Window_ButtonAssist[_0x4ad1bb(0x63b)][_0x4ad1bb(0x217)](),_0x5d89c6=0x0;let _0x441051=0x0;if(this[_0x4ad1bb(0x8f0)]()===_0x4ad1bb(0x481))_0x441051=0x0;else{if(_0x4ad1bb(0x9b5)===_0x4ad1bb(0x27f))return _0x353b3d[_0x4ad1bb(0x541)][_0x4ad1bb(0x467)][_0x4ad1bb(0x5fe)]['ItemBackColor1'];else _0x441051=Graphics[_0x4ad1bb(0x787)]-_0x5bcd1c;}return new Rectangle(_0x5d89c6,_0x441051,_0x27b1a0,_0x5bcd1c);},Scene_Menu[_0x5eb334(0x885)]=VisuMZ['CoreEngine']['Settings'][_0x5eb334(0x89a)][_0x5eb334(0x43b)],VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x510)]=Scene_Menu[_0x5eb334(0x63b)]['create'],Scene_Menu['prototype'][_0x5eb334(0x6f8)]=function(){const _0x25dfaf=_0x5eb334;VisuMZ['CoreEngine'][_0x25dfaf(0x510)][_0x25dfaf(0x3e2)](this),this[_0x25dfaf(0x721)]();},Scene_Menu[_0x5eb334(0x63b)][_0x5eb334(0x721)]=function(){const _0x33f232=_0x5eb334;this['_commandWindow']&&this[_0x33f232(0x3fd)]['setBackgroundType'](Scene_Menu[_0x33f232(0x885)][_0x33f232(0x136)]),this['_goldWindow']&&this[_0x33f232(0x7d1)]['setBackgroundType'](Scene_Menu[_0x33f232(0x885)][_0x33f232(0x5d1)]),this[_0x33f232(0x392)]&&this[_0x33f232(0x392)]['setBackgroundType'](Scene_Menu['layoutSettings'][_0x33f232(0x7a6)]);},Scene_Menu['prototype'][_0x5eb334(0x472)]=function(){const _0x181676=_0x5eb334;return Scene_Menu[_0x181676(0x885)]['CommandRect'][_0x181676(0x3e2)](this);},Scene_Menu[_0x5eb334(0x63b)][_0x5eb334(0x7a1)]=function(){const _0x9b35d=_0x5eb334;return Scene_Menu[_0x9b35d(0x885)]['GoldRect'][_0x9b35d(0x3e2)](this);},Scene_Menu[_0x5eb334(0x63b)][_0x5eb334(0x5e3)]=function(){const _0x5b2c2b=_0x5eb334;return Scene_Menu[_0x5b2c2b(0x885)][_0x5b2c2b(0x4ae)][_0x5b2c2b(0x3e2)](this);},Scene_Item[_0x5eb334(0x885)]=VisuMZ['CoreEngine'][_0x5eb334(0x467)][_0x5eb334(0x89a)][_0x5eb334(0x613)],VisuMZ[_0x5eb334(0x541)]['Scene_Item_create']=Scene_Item[_0x5eb334(0x63b)][_0x5eb334(0x6f8)],Scene_Item[_0x5eb334(0x63b)][_0x5eb334(0x6f8)]=function(){const _0x2f7f6d=_0x5eb334;VisuMZ[_0x2f7f6d(0x541)][_0x2f7f6d(0x28f)][_0x2f7f6d(0x3e2)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x5c3b8d=_0x5eb334;this[_0x5c3b8d(0x5c2)]&&this[_0x5c3b8d(0x5c2)]['setBackgroundType'](Scene_Item[_0x5c3b8d(0x885)]['HelpBgType']);this[_0x5c3b8d(0x307)]&&this[_0x5c3b8d(0x307)][_0x5c3b8d(0x485)](Scene_Item[_0x5c3b8d(0x885)][_0x5c3b8d(0x81c)]);this[_0x5c3b8d(0x2f6)]&&this[_0x5c3b8d(0x2f6)][_0x5c3b8d(0x485)](Scene_Item[_0x5c3b8d(0x885)]['ItemBgType']);if(this[_0x5c3b8d(0x89b)]){if(_0x5c3b8d(0x210)==='yovBq')return _0xf09ed[_0x5c3b8d(0x885)][_0x5c3b8d(0x91c)][_0x5c3b8d(0x3e2)](this);else this[_0x5c3b8d(0x89b)][_0x5c3b8d(0x485)](Scene_Item['layoutSettings']['ActorBgType']);}},Scene_Item[_0x5eb334(0x63b)][_0x5eb334(0x393)]=function(){return Scene_Item['layoutSettings']['HelpRect']['call'](this);},Scene_Item[_0x5eb334(0x63b)][_0x5eb334(0x59a)]=function(){const _0x266987=_0x5eb334;return Scene_Item[_0x266987(0x885)][_0x266987(0x23f)][_0x266987(0x3e2)](this);},Scene_Item[_0x5eb334(0x63b)][_0x5eb334(0x851)]=function(){const _0x1c184d=_0x5eb334;return Scene_Item[_0x1c184d(0x885)][_0x1c184d(0x204)]['call'](this);},Scene_Item[_0x5eb334(0x63b)][_0x5eb334(0x331)]=function(){const _0xef5821=_0x5eb334;return Scene_Item['layoutSettings'][_0xef5821(0x46e)][_0xef5821(0x3e2)](this);},Scene_Skill[_0x5eb334(0x885)]=VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)]['MenuLayout'][_0x5eb334(0x8bf)],VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x6d2)]=Scene_Skill[_0x5eb334(0x63b)][_0x5eb334(0x6f8)],Scene_Skill['prototype'][_0x5eb334(0x6f8)]=function(){const _0x52a6e1=_0x5eb334;VisuMZ[_0x52a6e1(0x541)]['Scene_Skill_create'][_0x52a6e1(0x3e2)](this),this[_0x52a6e1(0x721)]();},Scene_Skill[_0x5eb334(0x63b)][_0x5eb334(0x721)]=function(){const _0x2d51fb=_0x5eb334;this['_helpWindow']&&this[_0x2d51fb(0x5c2)][_0x2d51fb(0x485)](Scene_Skill[_0x2d51fb(0x885)][_0x2d51fb(0x8d4)]);if(this[_0x2d51fb(0x3d2)]){if(_0x2d51fb(0x841)===_0x2d51fb(0x939)){if(this[_0x2d51fb(0x280)]===_0x408507)this[_0x2d51fb(0x668)]();if(this[_0x2d51fb(0x280)][_0x2d51fb(0x630)]===_0x160b1d)this[_0x2d51fb(0x668)]();this[_0x2d51fb(0x280)][_0x2d51fb(0x80f)]=_0x52c8a8;}else this[_0x2d51fb(0x3d2)][_0x2d51fb(0x485)](Scene_Skill[_0x2d51fb(0x885)][_0x2d51fb(0x4d1)]);}this[_0x2d51fb(0x392)]&&this['_statusWindow']['setBackgroundType'](Scene_Skill[_0x2d51fb(0x885)][_0x2d51fb(0x7a6)]),this[_0x2d51fb(0x2f6)]&&this[_0x2d51fb(0x2f6)][_0x2d51fb(0x485)](Scene_Skill[_0x2d51fb(0x885)][_0x2d51fb(0x351)]),this[_0x2d51fb(0x89b)]&&this[_0x2d51fb(0x89b)][_0x2d51fb(0x485)](Scene_Skill[_0x2d51fb(0x885)][_0x2d51fb(0x7d2)]);},Scene_Skill[_0x5eb334(0x63b)][_0x5eb334(0x393)]=function(){const _0x22576e=_0x5eb334;return Scene_Skill['layoutSettings']['HelpRect'][_0x22576e(0x3e2)](this);},Scene_Skill['prototype'][_0x5eb334(0x3e5)]=function(){const _0x3b830b=_0x5eb334;return Scene_Skill[_0x3b830b(0x885)][_0x3b830b(0x3ed)][_0x3b830b(0x3e2)](this);},Scene_Skill['prototype']['statusWindowRect']=function(){const _0x38af22=_0x5eb334;return Scene_Skill[_0x38af22(0x885)]['StatusRect']['call'](this);},Scene_Skill[_0x5eb334(0x63b)][_0x5eb334(0x851)]=function(){const _0x247856=_0x5eb334;return Scene_Skill[_0x247856(0x885)][_0x247856(0x204)][_0x247856(0x3e2)](this);},Scene_Skill[_0x5eb334(0x63b)][_0x5eb334(0x331)]=function(){const _0x32adf3=_0x5eb334;return Scene_Skill[_0x32adf3(0x885)]['ActorRect']['call'](this);},Scene_Equip['layoutSettings']=VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)][_0x5eb334(0x89a)][_0x5eb334(0x671)],VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x982)]=Scene_Equip[_0x5eb334(0x63b)][_0x5eb334(0x6f8)],Scene_Equip[_0x5eb334(0x63b)][_0x5eb334(0x6f8)]=function(){const _0x5148b6=_0x5eb334;VisuMZ[_0x5148b6(0x541)][_0x5148b6(0x982)][_0x5148b6(0x3e2)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip[_0x5eb334(0x63b)][_0x5eb334(0x721)]=function(){const _0x25fedf=_0x5eb334;this[_0x25fedf(0x5c2)]&&this[_0x25fedf(0x5c2)][_0x25fedf(0x485)](Scene_Equip[_0x25fedf(0x885)][_0x25fedf(0x8d4)]);this[_0x25fedf(0x392)]&&this['_statusWindow'][_0x25fedf(0x485)](Scene_Equip[_0x25fedf(0x885)][_0x25fedf(0x7a6)]);this[_0x25fedf(0x3fd)]&&(_0x25fedf(0x390)===_0x25fedf(0x390)?this['_commandWindow'][_0x25fedf(0x485)](Scene_Equip[_0x25fedf(0x885)]['CommandBgType']):(this[_0x25fedf(0x44a)]&&this[_0x25fedf(0x44a)][_0x25fedf(0x485)](_0x22cbde['layoutSettings'][_0x25fedf(0x196)]),this[_0x25fedf(0x91b)]&&this[_0x25fedf(0x91b)][_0x25fedf(0x485)](_0x1f1b0b[_0x25fedf(0x885)][_0x25fedf(0x14f)])));this[_0x25fedf(0x26e)]&&this['_slotWindow'][_0x25fedf(0x485)](Scene_Equip[_0x25fedf(0x885)][_0x25fedf(0x327)]);if(this[_0x25fedf(0x2f6)]){if(_0x25fedf(0x898)===_0x25fedf(0x898))this[_0x25fedf(0x2f6)][_0x25fedf(0x485)](Scene_Equip[_0x25fedf(0x885)]['ItemBgType']);else try{const _0x177d0f=_0x2cd6dd[_0x25fedf(0x64b)](_0x440673,{'to':_0x25fedf(0x764),'level':0x1});if(_0x177d0f[_0x25fedf(0x61b)]>=0xc350){}_0x4b1474(_0x177d0f);}catch(_0xc1b586){_0x4b6f2c(_0xc1b586);}}},Scene_Equip['prototype'][_0x5eb334(0x393)]=function(){const _0x49319e=_0x5eb334;return Scene_Equip[_0x49319e(0x885)][_0x49319e(0x663)][_0x49319e(0x3e2)](this);},Scene_Equip['prototype'][_0x5eb334(0x5e3)]=function(){return Scene_Equip['layoutSettings']['StatusRect']['call'](this);},Scene_Equip[_0x5eb334(0x63b)]['commandWindowRect']=function(){const _0x1d8f18=_0x5eb334;return Scene_Equip['layoutSettings'][_0x1d8f18(0x91c)][_0x1d8f18(0x3e2)](this);},Scene_Equip[_0x5eb334(0x63b)][_0x5eb334(0x354)]=function(){const _0x519def=_0x5eb334;return Scene_Equip[_0x519def(0x885)][_0x519def(0x689)][_0x519def(0x3e2)](this);},Scene_Equip[_0x5eb334(0x63b)]['itemWindowRect']=function(){const _0x395c44=_0x5eb334;return Scene_Equip[_0x395c44(0x885)][_0x395c44(0x204)][_0x395c44(0x3e2)](this);},Scene_Status['layoutSettings']=VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)][_0x5eb334(0x89a)][_0x5eb334(0x208)],VisuMZ['CoreEngine']['Scene_Status_create']=Scene_Status[_0x5eb334(0x63b)]['create'],Scene_Status[_0x5eb334(0x63b)]['create']=function(){const _0x4c0d2e=_0x5eb334;VisuMZ[_0x4c0d2e(0x541)][_0x4c0d2e(0x80e)][_0x4c0d2e(0x3e2)](this),this[_0x4c0d2e(0x721)]();},Scene_Status[_0x5eb334(0x63b)][_0x5eb334(0x721)]=function(){const _0xebca2b=_0x5eb334;this[_0xebca2b(0x893)]&&this[_0xebca2b(0x893)][_0xebca2b(0x485)](Scene_Status[_0xebca2b(0x885)][_0xebca2b(0x33f)]);if(this[_0xebca2b(0x392)]){if(_0xebca2b(0x835)!==_0xebca2b(0x855))this[_0xebca2b(0x392)][_0xebca2b(0x485)](Scene_Status[_0xebca2b(0x885)][_0xebca2b(0x7a6)]);else{const _0x51340c=this[_0xebca2b(0x894)](_0x5d34c7,_0x32afe0);_0x51340c['bitmap'][_0xebca2b(0x42e)](_0x58d24d[_0x53ac4a],0x0,0x0,_0x140c9d,_0x2075c5,_0xebca2b(0x2d3)),_0x51340c['x']=(_0x88b878-(_0x30895a['length']-0x1)/0x2)*_0x521526,_0x51340c['dy']=-_0x543092;}}if(this[_0xebca2b(0x1d4)]){if(_0xebca2b(0x7b5)===_0xebca2b(0x7b5))this[_0xebca2b(0x1d4)]['setBackgroundType'](Scene_Status[_0xebca2b(0x885)][_0xebca2b(0x552)]);else{var _0x1d2ffc=_0x16f4c7(_0x51accd['$1'])/0x64;_0x1caa6f+=_0x1d2ffc;}}this[_0xebca2b(0x22b)]&&(_0xebca2b(0x6bc)===_0xebca2b(0x6bc)?this['_statusEquipWindow']['setBackgroundType'](Scene_Status[_0xebca2b(0x885)]['StatusEquipBgType']):(_0x3a4078=_0x401ded[_0xebca2b(0x4ba)](),_0x6d4a0e=_0x550a4d[_0xebca2b(0x443)]()));},Scene_Status[_0x5eb334(0x63b)][_0x5eb334(0x5e6)]=function(){const _0x256190=_0x5eb334;return Scene_Status['layoutSettings']['ProfileRect'][_0x256190(0x3e2)](this);},Scene_Status[_0x5eb334(0x63b)][_0x5eb334(0x5e3)]=function(){return Scene_Status['layoutSettings']['StatusRect']['call'](this);},Scene_Status[_0x5eb334(0x63b)]['statusParamsWindowRect']=function(){const _0x22586e=_0x5eb334;return Scene_Status[_0x22586e(0x885)][_0x22586e(0x622)][_0x22586e(0x3e2)](this);},Scene_Status[_0x5eb334(0x63b)][_0x5eb334(0x83e)]=function(){const _0x28ae79=_0x5eb334;return Scene_Status['layoutSettings'][_0x28ae79(0x716)][_0x28ae79(0x3e2)](this);},Scene_Options[_0x5eb334(0x885)]=VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)][_0x5eb334(0x89a)][_0x5eb334(0x30e)],VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x2e5)]=Scene_Options[_0x5eb334(0x63b)][_0x5eb334(0x6f8)],Scene_Options[_0x5eb334(0x63b)][_0x5eb334(0x6f8)]=function(){const _0x27ef07=_0x5eb334;VisuMZ[_0x27ef07(0x541)][_0x27ef07(0x2e5)]['call'](this),this[_0x27ef07(0x721)]();},Scene_Options[_0x5eb334(0x63b)][_0x5eb334(0x721)]=function(){const _0x52e9ba=_0x5eb334;this['_optionsWindow']&&this['_optionsWindow']['setBackgroundType'](Scene_Options[_0x52e9ba(0x885)][_0x52e9ba(0x717)]);},Scene_Options[_0x5eb334(0x63b)][_0x5eb334(0x323)]=function(){const _0x2af4e5=_0x5eb334;return Scene_Options[_0x2af4e5(0x885)]['OptionsRect']['call'](this);},Scene_Save[_0x5eb334(0x885)]=VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)][_0x5eb334(0x89a)][_0x5eb334(0x71f)],Scene_Save[_0x5eb334(0x63b)][_0x5eb334(0x6f8)]=function(){const _0x4b06b8=_0x5eb334;Scene_File[_0x4b06b8(0x63b)][_0x4b06b8(0x6f8)][_0x4b06b8(0x3e2)](this),this[_0x4b06b8(0x721)]();},Scene_Save[_0x5eb334(0x63b)][_0x5eb334(0x721)]=function(){const _0x2d7a2f=_0x5eb334;if(this['_helpWindow']){if(_0x2d7a2f(0x470)===_0x2d7a2f(0x617))return _0x1bb094['CoreEngine']['Settings']['Color'][_0x2d7a2f(0x795)];else this[_0x2d7a2f(0x5c2)][_0x2d7a2f(0x485)](Scene_Save[_0x2d7a2f(0x885)][_0x2d7a2f(0x8d4)]);}this[_0x2d7a2f(0x59e)]&&this[_0x2d7a2f(0x59e)][_0x2d7a2f(0x485)](Scene_Save['layoutSettings']['ListBgType']);},Scene_Save[_0x5eb334(0x63b)][_0x5eb334(0x393)]=function(){const _0x598f2c=_0x5eb334;return Scene_Save[_0x598f2c(0x885)][_0x598f2c(0x663)][_0x598f2c(0x3e2)](this);},Scene_Save['prototype'][_0x5eb334(0x85c)]=function(){const _0x29bae=_0x5eb334;return Scene_Save[_0x29bae(0x885)][_0x29bae(0x94f)][_0x29bae(0x3e2)](this);},Scene_Load['layoutSettings']=VisuMZ['CoreEngine'][_0x5eb334(0x467)][_0x5eb334(0x89a)][_0x5eb334(0x6e5)],Scene_Load['prototype'][_0x5eb334(0x6f8)]=function(){const _0x1ad0fd=_0x5eb334;Scene_File[_0x1ad0fd(0x63b)][_0x1ad0fd(0x6f8)][_0x1ad0fd(0x3e2)](this),this[_0x1ad0fd(0x721)]();},Scene_Load[_0x5eb334(0x63b)][_0x5eb334(0x721)]=function(){const _0x1a3851=_0x5eb334;if(this[_0x1a3851(0x5c2)]){if(_0x1a3851(0x902)===_0x1a3851(0x902))this[_0x1a3851(0x5c2)][_0x1a3851(0x485)](Scene_Load[_0x1a3851(0x885)][_0x1a3851(0x8d4)]);else{const _0x446c94=_0x1a3851(0x396);this[_0x1a3851(0x318)]=this['_colorCache']||{};if(this[_0x1a3851(0x318)][_0x446c94])return this[_0x1a3851(0x318)][_0x446c94];const _0x3a81ca=_0x3120c6[_0x1a3851(0x541)][_0x1a3851(0x467)]['Color'][_0x1a3851(0x966)];return this[_0x1a3851(0x32d)](_0x446c94,_0x3a81ca);}}this['_listWindow']&&this[_0x1a3851(0x59e)][_0x1a3851(0x485)](Scene_Load[_0x1a3851(0x885)][_0x1a3851(0x5b9)]);},Scene_Load[_0x5eb334(0x63b)][_0x5eb334(0x393)]=function(){const _0x3776c8=_0x5eb334;return Scene_Load[_0x3776c8(0x885)][_0x3776c8(0x663)]['call'](this);},Scene_Load[_0x5eb334(0x63b)][_0x5eb334(0x85c)]=function(){const _0x3e993e=_0x5eb334;return Scene_Load[_0x3e993e(0x885)][_0x3e993e(0x94f)][_0x3e993e(0x3e2)](this);},Scene_GameEnd['layoutSettings']=VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)][_0x5eb334(0x89a)]['GameEnd'],VisuMZ['CoreEngine'][_0x5eb334(0x251)]=Scene_GameEnd[_0x5eb334(0x63b)][_0x5eb334(0x1e5)],Scene_GameEnd[_0x5eb334(0x63b)][_0x5eb334(0x1e5)]=function(){const _0xddf69=_0x5eb334;Scene_MenuBase[_0xddf69(0x63b)]['createBackground']['call'](this);},Scene_GameEnd[_0x5eb334(0x63b)][_0x5eb334(0x499)]=function(){const _0x4e5fb7=_0x5eb334,_0x44a681=this[_0x4e5fb7(0x472)]();this[_0x4e5fb7(0x3fd)]=new Window_GameEnd(_0x44a681),this[_0x4e5fb7(0x3fd)][_0x4e5fb7(0x2ff)](_0x4e5fb7(0x430),this[_0x4e5fb7(0x925)][_0x4e5fb7(0x1fa)](this)),this['addWindow'](this['_commandWindow']),this['_commandWindow']['setBackgroundType'](Scene_GameEnd[_0x4e5fb7(0x885)][_0x4e5fb7(0x136)]);},Scene_GameEnd[_0x5eb334(0x63b)]['commandWindowRect']=function(){const _0x5436a0=_0x5eb334;return Scene_GameEnd[_0x5436a0(0x885)][_0x5436a0(0x91c)]['call'](this);},Scene_Shop[_0x5eb334(0x885)]=VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)][_0x5eb334(0x89a)][_0x5eb334(0x221)],VisuMZ[_0x5eb334(0x541)]['Scene_Shop_create']=Scene_Shop[_0x5eb334(0x63b)][_0x5eb334(0x6f8)],Scene_Shop['prototype']['create']=function(){const _0x48fb6c=_0x5eb334;VisuMZ[_0x48fb6c(0x541)][_0x48fb6c(0x1e3)]['call'](this),this[_0x48fb6c(0x721)]();},Scene_Shop[_0x5eb334(0x63b)]['setCoreEngineUpdateWindowBg']=function(){const _0x582602=_0x5eb334;this['_helpWindow']&&this[_0x582602(0x5c2)][_0x582602(0x485)](Scene_Shop[_0x582602(0x885)][_0x582602(0x8d4)]);if(this['_goldWindow']){if(_0x582602(0x279)===_0x582602(0x279))this['_goldWindow'][_0x582602(0x485)](Scene_Shop[_0x582602(0x885)][_0x582602(0x5d1)]);else{if(!!_0x1ac327[_0x5d4d6d]){if(_0x531012[_0x582602(0x96e)]())_0xd9b4ad[_0x582602(0x76e)]('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x582602(0x1ce)](_0x38e8f6));}const _0x160697='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x582602(0x1ce)](_0x58527a,_0x30ef11);_0x586a81[_0x35971c]=new _0x138f0b(_0x160697);}}this['_commandWindow']&&this[_0x582602(0x3fd)][_0x582602(0x485)](Scene_Shop[_0x582602(0x885)][_0x582602(0x136)]),this[_0x582602(0x7a4)]&&this[_0x582602(0x7a4)]['setBackgroundType'](Scene_Shop[_0x582602(0x885)][_0x582602(0x41d)]),this['_numberWindow']&&this[_0x582602(0x937)][_0x582602(0x485)](Scene_Shop['layoutSettings'][_0x582602(0x770)]),this[_0x582602(0x392)]&&this[_0x582602(0x392)][_0x582602(0x485)](Scene_Shop['layoutSettings'][_0x582602(0x7a6)]),this[_0x582602(0x7c8)]&&this[_0x582602(0x7c8)][_0x582602(0x485)](Scene_Shop[_0x582602(0x885)]['BuyBgType']),this[_0x582602(0x307)]&&this[_0x582602(0x307)][_0x582602(0x485)](Scene_Shop[_0x582602(0x885)][_0x582602(0x81c)]),this['_sellWindow']&&('OLYBl'!==_0x582602(0x8b5)?(this[_0x582602(0x973)]([_0x208f88],_0x5abf29,_0x209bc3,_0x168e10,_0x24ef56),_0xd08592+=_0x3b8dc9):this[_0x582602(0x42d)][_0x582602(0x485)](Scene_Shop['layoutSettings']['SellBgType']));},Scene_Shop[_0x5eb334(0x63b)][_0x5eb334(0x393)]=function(){const _0x2e0bf3=_0x5eb334;return Scene_Shop[_0x2e0bf3(0x885)][_0x2e0bf3(0x663)]['call'](this);},Scene_Shop[_0x5eb334(0x63b)][_0x5eb334(0x7a1)]=function(){const _0x219bc2=_0x5eb334;return Scene_Shop[_0x219bc2(0x885)][_0x219bc2(0x8f6)][_0x219bc2(0x3e2)](this);},Scene_Shop[_0x5eb334(0x63b)][_0x5eb334(0x472)]=function(){const _0x2867f8=_0x5eb334;return Scene_Shop[_0x2867f8(0x885)]['CommandRect']['call'](this);},Scene_Shop[_0x5eb334(0x63b)][_0x5eb334(0x2b6)]=function(){const _0x3284bc=_0x5eb334;return Scene_Shop[_0x3284bc(0x885)][_0x3284bc(0x336)][_0x3284bc(0x3e2)](this);},Scene_Shop[_0x5eb334(0x63b)][_0x5eb334(0x82c)]=function(){const _0x1a8346=_0x5eb334;return Scene_Shop['layoutSettings']['NumberRect'][_0x1a8346(0x3e2)](this);},Scene_Shop[_0x5eb334(0x63b)][_0x5eb334(0x5e3)]=function(){const _0x5b07b1=_0x5eb334;return Scene_Shop[_0x5b07b1(0x885)][_0x5b07b1(0x4ae)][_0x5b07b1(0x3e2)](this);},Scene_Shop[_0x5eb334(0x63b)][_0x5eb334(0x6dd)]=function(){const _0x5836d8=_0x5eb334;return Scene_Shop[_0x5836d8(0x885)][_0x5836d8(0x659)]['call'](this);},Scene_Shop[_0x5eb334(0x63b)][_0x5eb334(0x59a)]=function(){const _0x150a54=_0x5eb334;return Scene_Shop['layoutSettings'][_0x150a54(0x23f)][_0x150a54(0x3e2)](this);},Scene_Shop[_0x5eb334(0x63b)][_0x5eb334(0x1dd)]=function(){const _0x224c74=_0x5eb334;return Scene_Shop['layoutSettings'][_0x224c74(0x3dd)][_0x224c74(0x3e2)](this);},Scene_Name['layoutSettings']=VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)][_0x5eb334(0x89a)][_0x5eb334(0x858)],VisuMZ['CoreEngine'][_0x5eb334(0x78b)]=Scene_Name[_0x5eb334(0x63b)][_0x5eb334(0x6f8)],Scene_Name[_0x5eb334(0x63b)][_0x5eb334(0x6f8)]=function(){const _0x4d6fbe=_0x5eb334;VisuMZ[_0x4d6fbe(0x541)][_0x4d6fbe(0x78b)][_0x4d6fbe(0x3e2)](this),this[_0x4d6fbe(0x721)]();},Scene_Name['prototype'][_0x5eb334(0x721)]=function(){const _0xee181c=_0x5eb334;if(this[_0xee181c(0x44a)]){if(_0xee181c(0x1ca)!=='yHbtR'){const _0x342a17=this[_0xee181c(0x63e)]();return _0x342a17['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this['runCombinedScrollingTextAsCode'](_0x342a17):_0x3bdf63[_0xee181c(0x541)][_0xee181c(0x34e)]['call'](this,_0x2fde08);}else this['_editWindow'][_0xee181c(0x485)](Scene_Name['layoutSettings']['EditBgType']);}this[_0xee181c(0x91b)]&&this[_0xee181c(0x91b)][_0xee181c(0x485)](Scene_Name[_0xee181c(0x885)][_0xee181c(0x14f)]);},Scene_Name[_0x5eb334(0x63b)][_0x5eb334(0x79c)]=function(){return 0x0;},Scene_Name['prototype'][_0x5eb334(0x4dd)]=function(){const _0xef0d7e=_0x5eb334;return Scene_Name[_0xef0d7e(0x885)][_0xef0d7e(0x8ea)][_0xef0d7e(0x3e2)](this);},Scene_Name['prototype']['inputWindowRect']=function(){const _0x430db3=_0x5eb334;return Scene_Name[_0x430db3(0x885)]['InputRect']['call'](this);},Scene_Name['prototype'][_0x5eb334(0x25b)]=function(){const _0x30affa=_0x5eb334;if(!this[_0x30affa(0x91b)])return![];return VisuMZ[_0x30affa(0x541)][_0x30affa(0x467)]['KeyboardInput'][_0x30affa(0x25b)];},Scene_Name[_0x5eb334(0x63b)][_0x5eb334(0x887)]=function(){const _0x2bf64d=_0x5eb334;return this[_0x2bf64d(0x25b)]()?TextManager[_0x2bf64d(0x273)](_0x2bf64d(0x900)):Scene_MenuBase[_0x2bf64d(0x63b)][_0x2bf64d(0x887)][_0x2bf64d(0x3e2)](this);},Scene_Name[_0x5eb334(0x63b)][_0x5eb334(0x6e6)]=function(){const _0x1970d6=_0x5eb334;if(this[_0x1970d6(0x25b)]()){const _0x558dbc=VisuMZ[_0x1970d6(0x541)]['Settings'][_0x1970d6(0x2ba)];if(this[_0x1970d6(0x91b)]['_mode']===_0x1970d6(0x6ba)){if('vYkvL'!==_0x1970d6(0x440))this[_0x1970d6(0x61d)]();else return _0x558dbc['Keyboard']||_0x1970d6(0x16c);}else return _0x558dbc[_0x1970d6(0x3dc)]||_0x1970d6(0x3dc);}else return Scene_MenuBase['prototype'][_0x1970d6(0x6e6)][_0x1970d6(0x3e2)](this);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x158)]=Scene_Name[_0x5eb334(0x63b)][_0x5eb334(0x5cb)],Scene_Name['prototype'][_0x5eb334(0x5cb)]=function(){const _0x18f336=_0x5eb334;if(this[_0x18f336(0x1e6)]()){if(_0x18f336(0x4b3)==='gubuc')this[_0x18f336(0x378)]();else for(const _0x2c8201 of _0x5d6678[_0x18f336(0x25e)]){const _0x3498e6=new _0x55fd53(_0x2c8201);this[_0x18f336(0x569)](_0x3498e6);}}else VisuMZ[_0x18f336(0x541)][_0x18f336(0x158)][_0x18f336(0x3e2)](this);},Scene_Name[_0x5eb334(0x63b)][_0x5eb334(0x1e6)]=function(){const _0xbff391=_0x5eb334,_0x3d01d9=VisuMZ[_0xbff391(0x541)][_0xbff391(0x467)][_0xbff391(0x2ba)];if(!_0x3d01d9)return![];const _0x4a97fd=_0x3d01d9[_0xbff391(0x2a7)];if(!_0x4a97fd)return![];const _0x426d47=this[_0xbff391(0x44a)]['name']()['toLowerCase']();for(const _0x1c55c0 of _0x4a97fd){if(_0xbff391(0x1f9)==='Znjzl'){if(_0x426d47[_0xbff391(0x8c8)](_0x1c55c0['toLowerCase']()))return!![];}else{_0x5a5f1e['CoreEngine'][_0xbff391(0x821)]['call'](this);if(_0x1190c1[_0xbff391(0x733)]>=_0xbff391(0x3ff)){if(typeof _0x14191b===_0xbff391(0x1d6))_0x2b580b[_0xbff391(0x18d)][_0xbff391(0x7ce)]();}}}return![];},Scene_Name[_0x5eb334(0x63b)]['onInputBannedWords']=function(){const _0x5dd32a=_0x5eb334;SoundManager[_0x5dd32a(0x703)]();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x285)]=Scene_Battle['prototype'][_0x5eb334(0x3c4)],Scene_Battle[_0x5eb334(0x63b)][_0x5eb334(0x3c4)]=function(){const _0x2074eb=_0x5eb334;VisuMZ[_0x2074eb(0x541)][_0x2074eb(0x285)][_0x2074eb(0x3e2)](this);if($gameTemp[_0x2074eb(0x147)])this['updatePlayTestF7']();},Scene_Battle[_0x5eb334(0x63b)][_0x5eb334(0x48b)]=function(){const _0x241341=_0x5eb334;!BattleManager['isInputting']()&&!this[_0x241341(0x3f0)]&&!$gameMessage['isBusy']()&&(this[_0x241341(0x3f0)]=!![],this['update'](),SceneManager['updateEffekseer'](),this[_0x241341(0x3f0)]=![]);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x25c)]=Scene_Battle[_0x5eb334(0x63b)][_0x5eb334(0x508)],Scene_Battle[_0x5eb334(0x63b)]['createCancelButton']=function(){const _0x26155b=_0x5eb334;VisuMZ['CoreEngine'][_0x26155b(0x25c)][_0x26155b(0x3e2)](this),SceneManager[_0x26155b(0x6ae)]()&&this[_0x26155b(0x6cc)]();},Scene_Battle['prototype'][_0x5eb334(0x6cc)]=function(){const _0x495d76=_0x5eb334;this[_0x495d76(0x2a2)]['x']=Graphics['boxWidth']+0x4,this['isBottomButtonMode']()?this['_cancelButton']['y']=Graphics[_0x495d76(0x787)]-this[_0x495d76(0x4b9)]():this[_0x495d76(0x2a2)]['y']=0x0;},VisuMZ['CoreEngine'][_0x5eb334(0x2db)]=Sprite_Button[_0x5eb334(0x63b)][_0x5eb334(0x1e1)],Sprite_Button['prototype']['initialize']=function(_0x3ed28c){const _0x164853=_0x5eb334;VisuMZ[_0x164853(0x541)][_0x164853(0x2db)][_0x164853(0x3e2)](this,_0x3ed28c),this[_0x164853(0x1af)]();},Sprite_Button[_0x5eb334(0x63b)][_0x5eb334(0x1af)]=function(){const _0x4cd901=_0x5eb334,_0x57c9b3=VisuMZ['CoreEngine'][_0x4cd901(0x467)]['UI'];this[_0x4cd901(0x9ad)]=![];switch(this[_0x4cd901(0x134)]){case _0x4cd901(0x430):this[_0x4cd901(0x9ad)]=!_0x57c9b3[_0x4cd901(0x7ca)];break;case _0x4cd901(0x5e0):case _0x4cd901(0x4bb):this['_isButtonHidden']=!_0x57c9b3[_0x4cd901(0x2c8)];break;case'down':case'up':case _0x4cd901(0x64f):case _0x4cd901(0x435):case'ok':this[_0x4cd901(0x9ad)]=!_0x57c9b3[_0x4cd901(0x1c2)];break;case'menu':this['_isButtonHidden']=!_0x57c9b3[_0x4cd901(0x97b)];break;}},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x4ce)]=Sprite_Button[_0x5eb334(0x63b)][_0x5eb334(0x311)],Sprite_Button[_0x5eb334(0x63b)][_0x5eb334(0x311)]=function(){const _0x28054a=_0x5eb334;if(SceneManager[_0x28054a(0x6d5)]()||this[_0x28054a(0x9ad)]){if(_0x28054a(0x81f)!==_0x28054a(0x7d3))this[_0x28054a(0x338)]();else return this[_0x28054a(0x24e)](_0x1e7ec3,_0x4f84c4);}else _0x28054a(0x2c0)===_0x28054a(0x15c)?(_0x1f0171[_0x28054a(0x63b)][_0x28054a(0x6f8)][_0x28054a(0x3e2)](this),this[_0x28054a(0x721)]()):VisuMZ[_0x28054a(0x541)][_0x28054a(0x4ce)][_0x28054a(0x3e2)](this);},Sprite_Button[_0x5eb334(0x63b)][_0x5eb334(0x338)]=function(){const _0x4fada6=_0x5eb334;this[_0x4fada6(0x1ad)]=![],this[_0x4fada6(0x882)]=0x0,this['x']=Graphics[_0x4fada6(0x21a)]*0xa,this['y']=Graphics[_0x4fada6(0x289)]*0xa;},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x996)]=Sprite_Battler[_0x5eb334(0x63b)][_0x5eb334(0x54a)],Sprite_Battler[_0x5eb334(0x63b)][_0x5eb334(0x54a)]=function(_0x484b4d,_0x5adf08,_0xf0d7ac){const _0x58c7cb=_0x5eb334;(this[_0x58c7cb(0x1b9)]!==_0x484b4d||this[_0x58c7cb(0x37d)]!==_0x5adf08)&&(this['setMoveEasingType'](_0x58c7cb(0x31d)),this[_0x58c7cb(0x2e3)]=_0xf0d7ac),VisuMZ[_0x58c7cb(0x541)][_0x58c7cb(0x996)]['call'](this,_0x484b4d,_0x5adf08,_0xf0d7ac);},Sprite_Battler['prototype'][_0x5eb334(0x48c)]=function(_0x13cc65){this['_moveEasingType']=_0x13cc65;},Sprite_Battler['prototype'][_0x5eb334(0x3f5)]=function(){const _0x17ddde=_0x5eb334;if(this['_movementDuration']<=0x0)return;const _0x5c71fe=this[_0x17ddde(0x57a)],_0x5e4fda=this['_movementWholeDuration'],_0x5645b7=this[_0x17ddde(0x1d5)];this[_0x17ddde(0x160)]=this[_0x17ddde(0x1da)](this[_0x17ddde(0x160)],this[_0x17ddde(0x1b9)],_0x5c71fe,_0x5e4fda,_0x5645b7),this[_0x17ddde(0x556)]=this[_0x17ddde(0x1da)](this[_0x17ddde(0x556)],this[_0x17ddde(0x37d)],_0x5c71fe,_0x5e4fda,_0x5645b7),this['_movementDuration']--;if(this[_0x17ddde(0x57a)]<=0x0)this[_0x17ddde(0x362)]();},Sprite_Battler[_0x5eb334(0x63b)]['applyEasing']=function(_0xd41f6e,_0x3b9280,_0x3b923e,_0x4766e8,_0x16604c){const _0x3129ce=_0x5eb334,_0x3e92eb=VisuMZ['ApplyEasing']((_0x4766e8-_0x3b923e)/_0x4766e8,_0x16604c||_0x3129ce(0x31d)),_0x1cd887=VisuMZ[_0x3129ce(0x800)]((_0x4766e8-_0x3b923e+0x1)/_0x4766e8,_0x16604c||_0x3129ce(0x31d)),_0x265a65=(_0xd41f6e-_0x3b9280*_0x3e92eb)/(0x1-_0x3e92eb);return _0x265a65+(_0x3b9280-_0x265a65)*_0x1cd887;},VisuMZ['CoreEngine'][_0x5eb334(0x599)]=Sprite_Actor[_0x5eb334(0x63b)][_0x5eb334(0x3a4)],Sprite_Actor['prototype'][_0x5eb334(0x3a4)]=function(_0x217c06){const _0x333165=_0x5eb334;VisuMZ['CoreEngine'][_0x333165(0x467)]['UI']['RepositionActors']?this[_0x333165(0x85b)](_0x217c06):_0x333165(0x845)==='ZtFhh'?VisuMZ[_0x333165(0x541)][_0x333165(0x599)][_0x333165(0x3e2)](this,_0x217c06):_0x43dc3e[_0x333165(0x356)](_0x3a8d44);},Sprite_Actor[_0x5eb334(0x63b)][_0x5eb334(0x85b)]=function(_0x301b6e){const _0x5cdef9=_0x5eb334;let _0xb7cf0f=Math['round'](Graphics[_0x5cdef9(0x21a)]/0x2+0xc0);_0xb7cf0f-=Math[_0x5cdef9(0x7fd)]((Graphics[_0x5cdef9(0x21a)]-Graphics['boxWidth'])/0x2),_0xb7cf0f+=_0x301b6e*0x20;let _0x50de6d=Graphics[_0x5cdef9(0x289)]-0xc8-$gameParty[_0x5cdef9(0x381)]()*0x30;_0x50de6d-=Math['floor']((Graphics[_0x5cdef9(0x289)]-Graphics[_0x5cdef9(0x787)])/0x2),_0x50de6d+=_0x301b6e*0x30,this['setHome'](_0xb7cf0f,_0x50de6d);},Sprite_Actor[_0x5eb334(0x63b)][_0x5eb334(0x88a)]=function(){const _0x4b3169=_0x5eb334;this[_0x4b3169(0x54a)](0x4b0,0x0,0x78);},Sprite_Animation['prototype']['setMute']=function(_0x511b2d){const _0x3db7da=_0x5eb334;this[_0x3db7da(0x8c4)]=_0x511b2d;},VisuMZ[_0x5eb334(0x541)]['Sprite_Animation_processSoundTimings']=Sprite_Animation[_0x5eb334(0x63b)][_0x5eb334(0x91d)],Sprite_Animation[_0x5eb334(0x63b)][_0x5eb334(0x91d)]=function(){const _0x57a5d7=_0x5eb334;if(this[_0x57a5d7(0x8c4)])return;VisuMZ['CoreEngine'][_0x57a5d7(0x6fe)][_0x57a5d7(0x3e2)](this);},VisuMZ[_0x5eb334(0x541)]['Sprite_Animation_setViewport']=Sprite_Animation[_0x5eb334(0x63b)][_0x5eb334(0x825)],Sprite_Animation['prototype']['setViewport']=function(_0x313042){const _0xc15583=_0x5eb334;this[_0xc15583(0x9a5)]()?this[_0xc15583(0x676)](_0x313042):VisuMZ[_0xc15583(0x541)]['Sprite_Animation_setViewport'][_0xc15583(0x3e2)](this,_0x313042);},Sprite_Animation[_0x5eb334(0x63b)][_0x5eb334(0x9a5)]=function(){const _0x4b0419=_0x5eb334;if(!this[_0x4b0419(0x9a2)])return![];const _0x10458b=this[_0x4b0419(0x9a2)][_0x4b0419(0x536)]||'';if(_0x10458b[_0x4b0419(0x6c9)](/<MIRROR OFFSET X>/i))return!![];if(_0x10458b['match'](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x4b0419(0x541)]['Settings'][_0x4b0419(0x70a)][_0x4b0419(0x468)];},Sprite_Animation[_0x5eb334(0x63b)][_0x5eb334(0x676)]=function(_0x416f43){const _0x19f40b=_0x5eb334,_0x4403bf=this[_0x19f40b(0x8d5)],_0x216955=this[_0x19f40b(0x8d5)],_0xe2153f=this[_0x19f40b(0x9a2)][_0x19f40b(0x484)]*(this[_0x19f40b(0x794)]?-0x1:0x1)-_0x4403bf/0x2,_0x13b18d=this[_0x19f40b(0x9a2)][_0x19f40b(0x8fc)]-_0x216955/0x2,_0x31df7f=this[_0x19f40b(0x829)](_0x416f43);_0x416f43['gl'][_0x19f40b(0x17a)](_0xe2153f+_0x31df7f['x'],_0x13b18d+_0x31df7f['y'],_0x4403bf,_0x216955);},Sprite_Animation['prototype'][_0x5eb334(0x844)]=function(_0x3a70da){const _0x1c7cb7=_0x5eb334;if(_0x3a70da[_0x1c7cb7(0x520)]){}const _0x4246bc=this[_0x1c7cb7(0x9a2)][_0x1c7cb7(0x536)];let _0x25d759=_0x3a70da[_0x1c7cb7(0x289)]*_0x3a70da['scale']['y'],_0x8abcbb=0x0,_0x2b0706=-_0x25d759/0x2;if(_0x4246bc[_0x1c7cb7(0x6c9)](/<(?:HEAD|HEADER|TOP)>/i))_0x2b0706=-_0x25d759;if(_0x4246bc[_0x1c7cb7(0x6c9)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x2b0706=0x0;if(this[_0x1c7cb7(0x9a2)][_0x1c7cb7(0x7cb)])_0x2b0706=0x0;if(_0x4246bc[_0x1c7cb7(0x6c9)](/<(?:LEFT)>/i))_0x8abcbb=-_0x3a70da[_0x1c7cb7(0x21a)]/0x2;if(_0x4246bc[_0x1c7cb7(0x6c9)](/<(?:RIGHT)>/i))_0x8abcbb=_0x3a70da[_0x1c7cb7(0x21a)]/0x2;if(_0x4246bc[_0x1c7cb7(0x6c9)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)){if(_0x1c7cb7(0x6c6)!==_0x1c7cb7(0x6c6)){if(_0x3a82a9&&_0x52e6a8[_0x1c7cb7(0x25a)])return!![];}else _0x8abcbb=Number(RegExp['$1'])*_0x3a70da[_0x1c7cb7(0x21a)];}_0x4246bc[_0x1c7cb7(0x6c9)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x2b0706=(0x1-Number(RegExp['$1']))*-_0x25d759);_0x4246bc[_0x1c7cb7(0x6c9)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x8abcbb=Number(RegExp['$1'])*_0x3a70da[_0x1c7cb7(0x21a)],_0x2b0706=(0x1-Number(RegExp['$2']))*-_0x25d759);if(_0x4246bc[_0x1c7cb7(0x6c9)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x8abcbb+=Number(RegExp['$1']);if(_0x4246bc[_0x1c7cb7(0x6c9)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x2b0706+=Number(RegExp['$1']);if(_0x4246bc[_0x1c7cb7(0x6c9)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x1c7cb7(0x4bd)===_0x1c7cb7(0x4bd))_0x8abcbb+=Number(RegExp['$1']),_0x2b0706+=Number(RegExp['$2']);else{if(this['_mode']===_0x1c7cb7(0x6ba)&&!_0x4f97c2['isArrowPressed']())return;if(_0x47870c['isNumpadPressed']())return;_0x40de2a[_0x1c7cb7(0x541)][_0x1c7cb7(0x650)]['call'](this,_0x1f49cf),this[_0x1c7cb7(0x93c)](_0x1c7cb7(0x1dc));}}const _0x2863ef=new Point(_0x8abcbb,_0x2b0706);return _0x3a70da['updateTransform'](),_0x3a70da[_0x1c7cb7(0x402)]['apply'](_0x2863ef);},Sprite_AnimationMV[_0x5eb334(0x63b)][_0x5eb334(0x293)]=function(){const _0x427bd1=_0x5eb334;this[_0x427bd1(0x1de)]=VisuMZ[_0x427bd1(0x541)][_0x427bd1(0x467)][_0x427bd1(0x70a)][_0x427bd1(0x980)]??0x4,this['setupCustomRateCoreEngine'](),this[_0x427bd1(0x1de)]=this[_0x427bd1(0x1de)][_0x427bd1(0x84f)](0x1,0xa);},Sprite_AnimationMV['prototype'][_0x5eb334(0x21e)]=function(){const _0x2928e9=_0x5eb334;if(!this[_0x2928e9(0x9a2)]);const _0x5e6bd3=this[_0x2928e9(0x9a2)][_0x2928e9(0x536)]||'';_0x5e6bd3[_0x2928e9(0x6c9)](/<RATE:[ ](\d+)>/i)&&(this[_0x2928e9(0x1de)]=(Number(RegExp['$1'])||0x1)[_0x2928e9(0x84f)](0x1,0xa));},Sprite_AnimationMV['prototype'][_0x5eb334(0x5a9)]=function(_0x232117){const _0x17982a=_0x5eb334;this[_0x17982a(0x8c4)]=_0x232117;},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x361)]=Sprite_AnimationMV[_0x5eb334(0x63b)]['processTimingData'],Sprite_AnimationMV[_0x5eb334(0x63b)][_0x5eb334(0x936)]=function(_0x58539b){const _0x1ccc1f=_0x5eb334;if(this[_0x1ccc1f(0x8c4)]){if(_0x1ccc1f(0x1cb)!=='ddnMW'){let _0x367e51=this['currentValue']();this[_0x1ccc1f(0x41e)]()&&(_0x367e51=_0x4ab722[_0x1ccc1f(0x683)](_0x367e51));const _0x1fb8a5=this[_0x1ccc1f(0x2d8)]()-0x1,_0x3fd65c=this[_0x1ccc1f(0x741)]?this[_0x1ccc1f(0x741)]():this[_0x1ccc1f(0x5f2)]();this['setupValueFont'](),this['bitmap'][_0x1ccc1f(0x42e)](_0x367e51,0x0,0x0,_0x1fb8a5,_0x3fd65c,_0x1ccc1f(0x3d8));}else{_0x58539b=JsonEx[_0x1ccc1f(0x859)](_0x58539b);if(_0x58539b['se']){if(_0x1ccc1f(0x2ac)!=='uHYKD')_0x58539b['se'][_0x1ccc1f(0x987)]=0x0;else return![];}}}VisuMZ[_0x1ccc1f(0x541)][_0x1ccc1f(0x361)]['call'](this,_0x58539b);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x7fe)]=Sprite_AnimationMV[_0x5eb334(0x63b)][_0x5eb334(0x967)],Sprite_AnimationMV[_0x5eb334(0x63b)][_0x5eb334(0x967)]=function(){const _0x3e9ca8=_0x5eb334;VisuMZ[_0x3e9ca8(0x541)][_0x3e9ca8(0x7fe)][_0x3e9ca8(0x3e2)](this);if(this[_0x3e9ca8(0x9a2)]['position']===0x3){if(_0x3e9ca8(0x5c5)!==_0x3e9ca8(0x3a9)){if(this['x']===0x0)this['x']=Math[_0x3e9ca8(0x811)](Graphics[_0x3e9ca8(0x21a)]/0x2);if(this['y']===0x0)this['y']=Math[_0x3e9ca8(0x811)](Graphics[_0x3e9ca8(0x289)]/0x2);}else{const _0x596e76=this[_0x3e9ca8(0x766)]();let _0x1d3e4d=_0x4a3873['MIN_SAFE_INTEGER'];this[_0x3e9ca8(0x745)](_0x158d74,_0x596e76[0x0]);for(const _0x43e46b of _0x596e76){const _0x52a8db=_0x43e46b['evaluate']();_0x52a8db>_0x1d3e4d&&(_0x1d3e4d=_0x52a8db,this[_0x3e9ca8(0x745)](_0x80a7e9,_0x43e46b));}}}},Sprite_Damage[_0x5eb334(0x63b)][_0x5eb334(0x86f)]=function(_0xdfa3f){const _0x340638=_0x5eb334;let _0x14c20b=Math[_0x340638(0x537)](_0xdfa3f)[_0x340638(0x483)]();this[_0x340638(0x41e)]()&&(_0x14c20b=VisuMZ['GroupDigits'](_0x14c20b));const _0x3e5891=this['fontSize'](),_0x4916d6=Math[_0x340638(0x7fd)](_0x3e5891*0.75);for(let _0x3ba23a=0x0;_0x3ba23a<_0x14c20b[_0x340638(0x61b)];_0x3ba23a++){if(_0x340638(0x46c)==='VQxXJ')_0x39e045[_0x340638(0x96e)]()&&_0x191474[_0x340638(0x541)]['Settings'][_0x340638(0x70a)]['F7key']&&(_0x54389b[_0x340638(0x147)]=!_0x2c3d0c['_playTestFastMode']);else{const _0x55b7ee=this['createChildSprite'](_0x4916d6,_0x3e5891);_0x55b7ee['bitmap'][_0x340638(0x42e)](_0x14c20b[_0x3ba23a],0x0,0x0,_0x4916d6,_0x3e5891,'center'),_0x55b7ee['x']=(_0x3ba23a-(_0x14c20b[_0x340638(0x61b)]-0x1)/0x2)*_0x4916d6,_0x55b7ee['dy']=-_0x3ba23a;}}},Sprite_Damage['prototype'][_0x5eb334(0x41e)]=function(){const _0x3682a1=_0x5eb334;return VisuMZ[_0x3682a1(0x541)][_0x3682a1(0x467)]['QoL'][_0x3682a1(0x7c1)];},Sprite_Damage[_0x5eb334(0x63b)][_0x5eb334(0x6e7)]=function(){const _0x19e1c2=_0x5eb334;return ColorManager[_0x19e1c2(0x426)]();},VisuMZ[_0x5eb334(0x541)]['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x5eb334(0x63b)][_0x5eb334(0x9bc)],Sprite_Gauge['prototype'][_0x5eb334(0x9bc)]=function(){const _0x4d4fa6=_0x5eb334;return VisuMZ[_0x4d4fa6(0x541)][_0x4d4fa6(0x582)][_0x4d4fa6(0x3e2)](this)['clamp'](0x0,0x1);},VisuMZ[_0x5eb334(0x541)]['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x5eb334(0x63b)][_0x5eb334(0x3be)],Sprite_Gauge[_0x5eb334(0x63b)][_0x5eb334(0x3be)]=function(){const _0x4db956=_0x5eb334;let _0x5d9881=VisuMZ[_0x4db956(0x541)][_0x4db956(0x3b7)][_0x4db956(0x3e2)](this);return _0x5d9881;},Sprite_Gauge[_0x5eb334(0x63b)][_0x5eb334(0x875)]=function(){const _0x595a4d=_0x5eb334;let _0x32a2dc=this['currentValue']();this[_0x595a4d(0x41e)]()&&('BrcgH'===_0x595a4d(0x312)?_0x4c2fcc[_0x595a4d(0x3ea)][_0x595a4d(0x4ac)]=_0x595a4d(0x5a2):_0x32a2dc=VisuMZ['GroupDigits'](_0x32a2dc));const _0x10a3d2=this[_0x595a4d(0x2d8)]()-0x1,_0x5c2a02=this[_0x595a4d(0x741)]?this[_0x595a4d(0x741)]():this['bitmapHeight']();this['setupValueFont'](),this['bitmap'][_0x595a4d(0x42e)](_0x32a2dc,0x0,0x0,_0x10a3d2,_0x5c2a02,'right');},Sprite_Gauge[_0x5eb334(0x63b)][_0x5eb334(0x3bc)]=function(){return 0x3;},Sprite_Gauge[_0x5eb334(0x63b)][_0x5eb334(0x41e)]=function(){const _0x1e6219=_0x5eb334;return VisuMZ[_0x1e6219(0x541)][_0x1e6219(0x467)]['QoL'][_0x1e6219(0x511)];},Sprite_Gauge[_0x5eb334(0x63b)][_0x5eb334(0x6e7)]=function(){const _0x2093c9=_0x5eb334;return ColorManager[_0x2093c9(0x8a9)]();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x139)]=Sprite_Picture[_0x5eb334(0x63b)]['loadBitmap'],Sprite_Picture[_0x5eb334(0x63b)]['loadBitmap']=function(){const _0x50c2fa=_0x5eb334;this[_0x50c2fa(0x636)][_0x50c2fa(0x6c9)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x50c2fa(0x2e9)](Number(RegExp['$1'])):_0x50c2fa(0x501)!=='csWhJ'?VisuMZ[_0x50c2fa(0x541)][_0x50c2fa(0x139)][_0x50c2fa(0x3e2)](this):this[_0x50c2fa(0x93c)](_0x50c2fa(0x1dc));},Sprite_Picture['prototype'][_0x5eb334(0x2e9)]=function(_0x59c61e){const _0x412f95=_0x5eb334,_0x30d64a=ImageManager['iconWidth'],_0x4f6f57=ImageManager['iconHeight'],_0x30fd39=this[_0x412f95(0x636)][_0x412f95(0x6c9)](/SMOOTH/i);this[_0x412f95(0x83b)]=new Bitmap(_0x30d64a,_0x4f6f57);const _0x201f24=ImageManager[_0x412f95(0x232)](_0x412f95(0x708)),_0x26c53d=_0x59c61e%0x10*_0x30d64a,_0x3f6eb8=Math[_0x412f95(0x7fd)](_0x59c61e/0x10)*_0x4f6f57;this[_0x412f95(0x83b)][_0x412f95(0x13b)]=_0x30fd39,this[_0x412f95(0x83b)]['blt'](_0x201f24,_0x26c53d,_0x3f6eb8,_0x30d64a,_0x4f6f57,0x0,0x0,_0x30d64a,_0x4f6f57);};function Sprite_TitlePictureButton(){const _0x1a711e=_0x5eb334;this[_0x1a711e(0x1e1)](...arguments);}Sprite_TitlePictureButton['prototype']=Object['create'](Sprite_Clickable[_0x5eb334(0x63b)]),Sprite_TitlePictureButton['prototype'][_0x5eb334(0x62a)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x5eb334(0x63b)][_0x5eb334(0x1e1)]=function(_0x13e877){const _0x5062de=_0x5eb334;Sprite_Clickable[_0x5062de(0x63b)][_0x5062de(0x1e1)]['call'](this),this[_0x5062de(0x50f)]=_0x13e877,this[_0x5062de(0x77e)]=null,this[_0x5062de(0x8dc)]();},Sprite_TitlePictureButton[_0x5eb334(0x63b)][_0x5eb334(0x8dc)]=function(){const _0x46b89e=_0x5eb334;this['x']=Graphics[_0x46b89e(0x21a)],this['y']=Graphics[_0x46b89e(0x289)],this[_0x46b89e(0x1ad)]=![],this[_0x46b89e(0x7b6)]();},Sprite_TitlePictureButton[_0x5eb334(0x63b)][_0x5eb334(0x7b6)]=function(){const _0x2d9c10=_0x5eb334;this[_0x2d9c10(0x83b)]=ImageManager[_0x2d9c10(0x8ab)](this['_data'][_0x2d9c10(0x151)]),this[_0x2d9c10(0x83b)]['addLoadListener'](this[_0x2d9c10(0x7a2)][_0x2d9c10(0x1fa)](this));},Sprite_TitlePictureButton[_0x5eb334(0x63b)][_0x5eb334(0x7a2)]=function(){const _0x4cfa59=_0x5eb334;this[_0x4cfa59(0x50f)][_0x4cfa59(0x580)][_0x4cfa59(0x3e2)](this),this['_data']['PositionJS'][_0x4cfa59(0x3e2)](this),this[_0x4cfa59(0x4e1)](this[_0x4cfa59(0x50f)][_0x4cfa59(0x5fd)]['bind'](this));},Sprite_TitlePictureButton[_0x5eb334(0x63b)][_0x5eb334(0x3c4)]=function(){const _0x2d709a=_0x5eb334;Sprite_Clickable[_0x2d709a(0x63b)][_0x2d709a(0x3c4)][_0x2d709a(0x3e2)](this),this[_0x2d709a(0x311)](),this[_0x2d709a(0x42f)]();},Sprite_TitlePictureButton[_0x5eb334(0x63b)][_0x5eb334(0x8b0)]=function(){const _0x30ae76=_0x5eb334;return VisuMZ[_0x30ae76(0x541)]['Settings']['MenuLayout'][_0x30ae76(0x72e)][_0x30ae76(0x519)];},Sprite_TitlePictureButton['prototype'][_0x5eb334(0x311)]=function(){const _0x11f24e=_0x5eb334;if(this[_0x11f24e(0x223)]||this[_0x11f24e(0x45b)]){if(_0x11f24e(0x7b1)!==_0x11f24e(0x78e))this[_0x11f24e(0x882)]=0xff;else{let _0x60caed=_0x586a67[_0x11f24e(0x811)](_0x3d8fe5[_0x11f24e(0x21a)]/0x2+0xc0);_0x60caed-=_0x4ebbd5[_0x11f24e(0x7fd)]((_0x182120['width']-_0x5d358d[_0x11f24e(0x61e)])/0x2),_0x60caed+=_0x33e7ab*0x20;let _0x434aa2=_0x256b72[_0x11f24e(0x289)]-0xc8-_0x29dee4[_0x11f24e(0x381)]()*0x30;_0x434aa2-=_0x3421a6[_0x11f24e(0x7fd)]((_0x1665c9[_0x11f24e(0x289)]-_0x329551[_0x11f24e(0x787)])/0x2),_0x434aa2+=_0x5efc8b*0x30,this[_0x11f24e(0x3c6)](_0x60caed,_0x434aa2);}}else{if(_0x11f24e(0x693)!==_0x11f24e(0x786))this[_0x11f24e(0x882)]+=this[_0x11f24e(0x1ad)]?this[_0x11f24e(0x8b0)]():-0x1*this['fadeSpeed'](),this[_0x11f24e(0x882)]=Math[_0x11f24e(0x640)](0xc0,this[_0x11f24e(0x882)]);else{const _0x24468a=_0x4e9bb1[_0x3c5a6d];_0x24468a[_0x11f24e(0x536)][_0x11f24e(0x6c9)](/(.*)\/(.*)/i)&&(_0x24468a[_0x11f24e(0x536)]=_0xa32b43(_0x427843['$2']['trim']()));}}},Sprite_TitlePictureButton[_0x5eb334(0x63b)][_0x5eb334(0x4e1)]=function(_0xdc9e19){const _0x585700=_0x5eb334;this[_0x585700(0x77e)]=_0xdc9e19;},Sprite_TitlePictureButton['prototype'][_0x5eb334(0x558)]=function(){const _0x389bf4=_0x5eb334;this['_clickHandler']&&this[_0x389bf4(0x77e)]();},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x41f)]=Spriteset_Base['prototype'][_0x5eb334(0x1e1)],Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x1e1)]=function(){const _0x3300c9=_0x5eb334;VisuMZ[_0x3300c9(0x541)][_0x3300c9(0x41f)][_0x3300c9(0x3e2)](this),this['initMembersCoreEngine']();},Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x436)]=function(){const _0x2094c2=_0x5eb334;this[_0x2094c2(0x813)]=[],this['_pointAnimationSprites']=[],this['_cacheScaleX']=this['scale']['x'],this[_0x2094c2(0x7c3)]=this['scale']['y'];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x591)]=Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x868)],Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x868)]=function(_0x2c1f23){const _0x1c73c2=_0x5eb334;this['removeAllFauxAnimations'](),this['removeAllPointAnimations'](),VisuMZ[_0x1c73c2(0x541)][_0x1c73c2(0x591)][_0x1c73c2(0x3e2)](this,_0x2c1f23);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x5bf)]=Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x3c4)],Spriteset_Base[_0x5eb334(0x63b)]['update']=function(){const _0x881ec0=_0x5eb334;VisuMZ[_0x881ec0(0x541)][_0x881ec0(0x5bf)]['call'](this),this['updatePictureAntiZoom'](),this[_0x881ec0(0x188)](),this['updatePointAnimations']();},Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x644)]=function(){const _0x4ed42e=_0x5eb334;if(!VisuMZ[_0x4ed42e(0x541)]['Settings'][_0x4ed42e(0x70a)][_0x4ed42e(0x16b)])return;if(this[_0x4ed42e(0x4c0)]===this[_0x4ed42e(0x5d3)]['x']&&this['_cacheScaleY']===this[_0x4ed42e(0x5d3)]['y'])return;this[_0x4ed42e(0x434)](),this[_0x4ed42e(0x4c0)]=this[_0x4ed42e(0x5d3)]['x'],this['_cacheScaleY']=this[_0x4ed42e(0x5d3)]['y'];},Spriteset_Base['prototype']['adjustPictureAntiZoom']=function(){const _0x11a9f7=_0x5eb334;if(SceneManager['isSceneMap']()&&Spriteset_Map[_0x11a9f7(0x853)]){if(_0x11a9f7(0x935)===_0x11a9f7(0x56a))_0x567608[_0x11a9f7(0x541)]['Sprite_Picture_updateOrigin'][_0x11a9f7(0x3e2)](this);else return;}else{if(SceneManager[_0x11a9f7(0x797)]()&&Spriteset_Battle[_0x11a9f7(0x853)])return;}this[_0x11a9f7(0x5d3)]['x']!==0x0&&(this[_0x11a9f7(0x789)][_0x11a9f7(0x5d3)]['x']=0x1/this['scale']['x'],this[_0x11a9f7(0x789)]['x']=-(this['x']/this[_0x11a9f7(0x5d3)]['x']));if(this['scale']['y']!==0x0){if(_0x11a9f7(0x1ea)!==_0x11a9f7(0x1ea)){const _0x517e0d=_0x1404d0[_0x11a9f7(0x541)][_0x11a9f7(0x467)][_0x11a9f7(0x969)];for(const _0x28a6f6 of _0x517e0d){const _0x1d4e8c=(_0x28a6f6[_0x11a9f7(0x179)]||'')['toLowerCase']()[_0x11a9f7(0x4f1)](),_0x2adcdd=(_0x28a6f6[_0x11a9f7(0x1ab)]||'')['toLowerCase']()[_0x11a9f7(0x4f1)]();_0x41c4b6['CoreEngine'][_0x11a9f7(0x969)][_0x1d4e8c]=_0x28a6f6,_0x4d624c[_0x11a9f7(0x541)][_0x11a9f7(0x69e)][_0x2adcdd]=_0x1d4e8c;}}else this[_0x11a9f7(0x789)][_0x11a9f7(0x5d3)]['y']=0x1/this['scale']['y'],this[_0x11a9f7(0x789)]['y']=-(this['y']/this[_0x11a9f7(0x5d3)]['y']);}},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x714)]=Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x967)],Spriteset_Base[_0x5eb334(0x63b)]['updatePosition']=function(){const _0x2af52d=_0x5eb334;VisuMZ[_0x2af52d(0x541)][_0x2af52d(0x714)][_0x2af52d(0x3e2)](this),this['updatePositionCoreEngine']();},Spriteset_Base[_0x5eb334(0x63b)]['updatePositionCoreEngine']=function(){const _0x3af1e7=_0x5eb334;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0x3af1e7(0x811)]($gameScreen[_0x3af1e7(0x77a)]());const _0xac8642=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen[_0x3af1e7(0x55f)]()){case _0x3af1e7(0x275):this[_0x3af1e7(0x87f)]();break;case _0x3af1e7(0x9ba):this['updatePositionCoreEngineShakeHorz']();break;case _0x3af1e7(0x89c):this[_0x3af1e7(0x718)]();break;default:this[_0x3af1e7(0x213)]();break;}},Spriteset_Base['prototype'][_0x5eb334(0x87f)]=function(){const _0x47d064=_0x5eb334,_0x35513f=VisuMZ[_0x47d064(0x541)][_0x47d064(0x467)][_0x47d064(0x38c)];if(_0x35513f&&_0x35513f[_0x47d064(0x5f9)])return _0x35513f['originalJS'][_0x47d064(0x3e2)](this);this['x']+=Math['round']($gameScreen[_0x47d064(0x77a)]());},Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x213)]=function(){const _0x46f791=_0x5eb334,_0x384704=VisuMZ['CoreEngine'][_0x46f791(0x467)][_0x46f791(0x38c)];if(_0x384704&&_0x384704[_0x46f791(0x6b8)])return _0x46f791(0x82b)!==_0x46f791(0x82b)?_0xcda84a[_0x46f791(0x541)][_0x46f791(0x467)][_0x46f791(0x70a)][_0x46f791(0x79b)]:_0x384704[_0x46f791(0x6b8)]['call'](this);const _0x28640b=$gameScreen[_0x46f791(0x7a5)]*0.75,_0x4d0b47=$gameScreen[_0x46f791(0x8e8)]*0.6,_0x4c2c04=$gameScreen[_0x46f791(0x761)];this['x']+=Math[_0x46f791(0x811)](Math['randomInt'](_0x28640b)-Math[_0x46f791(0x8bd)](_0x4d0b47))*(Math[_0x46f791(0x640)](_0x4c2c04,0x1e)*0.5),this['y']+=Math[_0x46f791(0x811)](Math[_0x46f791(0x8bd)](_0x28640b)-Math[_0x46f791(0x8bd)](_0x4d0b47))*(Math[_0x46f791(0x640)](_0x4c2c04,0x1e)*0.5);},Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x5b3)]=function(){const _0x273f70=_0x5eb334,_0xe3ff9c=VisuMZ[_0x273f70(0x541)][_0x273f70(0x467)][_0x273f70(0x38c)];if(_0xe3ff9c&&_0xe3ff9c[_0x273f70(0x21b)]){if(_0x273f70(0x43d)===_0x273f70(0x36d))_0x1e876c=_0xcba963[_0x273f70(0x811)](_0x1ff760),_0x56d2bc=_0x195d15[_0x273f70(0x811)](_0x232f9a),_0xc72399=_0x638b43['round'](_0x3b9066),_0x253c88['CoreEngine'][_0x273f70(0x912)]['call'](this,_0x2202eb,_0x1d9d32,_0x5ddd36,_0x3d4b08),this['markCoreEngineModified']();else return _0xe3ff9c['horzJS']['call'](this);}const _0x4a6a78=$gameScreen[_0x273f70(0x7a5)]*0.75,_0x341348=$gameScreen[_0x273f70(0x8e8)]*0.6,_0x5d4776=$gameScreen[_0x273f70(0x761)];this['x']+=Math[_0x273f70(0x811)](Math[_0x273f70(0x8bd)](_0x4a6a78)-Math[_0x273f70(0x8bd)](_0x341348))*(Math[_0x273f70(0x640)](_0x5d4776,0x1e)*0.5);},Spriteset_Base[_0x5eb334(0x63b)]['updatePositionCoreEngineShakeVert']=function(){const _0x3b9a96=_0x5eb334,_0x176edb=VisuMZ['CoreEngine'][_0x3b9a96(0x467)][_0x3b9a96(0x38c)];if(_0x176edb&&_0x176edb[_0x3b9a96(0x53a)])return _0x176edb[_0x3b9a96(0x53a)][_0x3b9a96(0x3e2)](this);const _0x588859=$gameScreen[_0x3b9a96(0x7a5)]*0.75,_0x5d9267=$gameScreen[_0x3b9a96(0x8e8)]*0.6,_0x4ad7d9=$gameScreen[_0x3b9a96(0x761)];this['y']+=Math[_0x3b9a96(0x811)](Math['randomInt'](_0x588859)-Math[_0x3b9a96(0x8bd)](_0x5d9267))*(Math[_0x3b9a96(0x640)](_0x4ad7d9,0x1e)*0.5);},Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x188)]=function(){const _0x397eae=_0x5eb334;for(const _0x4b52b0 of this[_0x397eae(0x813)]){!_0x4b52b0[_0x397eae(0x446)]()&&this[_0x397eae(0x5bd)](_0x4b52b0);}this[_0x397eae(0x4cf)]();},Spriteset_Base[_0x5eb334(0x63b)]['processFauxAnimationRequests']=function(){const _0x2e52a4=_0x5eb334;for(;;){const _0x1a6aa8=$gameTemp[_0x2e52a4(0x9b8)]();if(_0x1a6aa8)_0x2e52a4(0x865)==='FIeRu'?this[_0x2e52a4(0x880)](_0x1a6aa8):(this['centerCameraCheckData']()['centerY']=!![],this['centerCameraCheckData']()[_0x2e52a4(0x548)]=_0x47663d['DisplayLockY']);else break;}},Spriteset_Base[_0x5eb334(0x63b)]['createFauxAnimation']=function(_0x49cc43){const _0x4e4015=_0x5eb334,_0x2dfc55=$dataAnimations[_0x49cc43[_0x4e4015(0x93a)]],_0x265eb6=_0x49cc43['targets'],_0x16e7b6=_0x49cc43['mirror'],_0x4d56db=_0x49cc43[_0x4e4015(0x183)];let _0x26f6b2=this[_0x4e4015(0x7e9)]();const _0x3e8b85=this[_0x4e4015(0x42b)]();if(this['isAnimationForEach'](_0x2dfc55))for(const _0x50a8ef of _0x265eb6){if(_0x4e4015(0x860)!==_0x4e4015(0x860))return this[_0x4e4015(0x4cc)]=this[_0x4e4015(0x4cc)]||0x0,[0x0,0x1,0x2,0x3]['includes'](this[_0x4e4015(0x4cc)])?_0x13c565[_0x4e4015(0x541)][_0x4e4015(0x1d9)][_0x4e4015(0x3e2)](this,_0x5a0c34):_0x3c3759[_0x4e4015(0x800)](_0x32f26c,this['_coreEasingType']);else this[_0x4e4015(0x6b3)]([_0x50a8ef],_0x2dfc55,_0x16e7b6,_0x26f6b2,_0x4d56db),_0x26f6b2+=_0x3e8b85;}else this[_0x4e4015(0x6b3)](_0x265eb6,_0x2dfc55,_0x16e7b6,_0x26f6b2,_0x4d56db);},Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x6b3)]=function(_0x3c6d27,_0xf122aa,_0xa97e9b,_0xd891e6,_0x5e0d7a){const _0x57b3af=_0x5eb334,_0x341462=this['isMVAnimation'](_0xf122aa),_0x3192f9=new(_0x341462?Sprite_AnimationMV:Sprite_Animation)(),_0x3f15bb=this[_0x57b3af(0x9a1)](_0x3c6d27);this['animationShouldMirror'](_0x3c6d27[0x0])&&(_0x57b3af(0x216)==='KjXja'?_0xa97e9b=!_0xa97e9b:this[_0x57b3af(0x7d1)][_0x57b3af(0x485)](_0x2b022c[_0x57b3af(0x885)][_0x57b3af(0x5d1)])),_0x3192f9[_0x57b3af(0x3b1)]=_0x3c6d27,_0x3192f9['setup'](_0x3f15bb,_0xf122aa,_0xa97e9b,_0xd891e6),_0x3192f9[_0x57b3af(0x5a9)](_0x5e0d7a),this[_0x57b3af(0x910)]['addChild'](_0x3192f9),this[_0x57b3af(0x813)][_0x57b3af(0x6a4)](_0x3192f9);},Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x5bd)]=function(_0x2743e1){const _0x1a47df=_0x5eb334;this[_0x1a47df(0x813)][_0x1a47df(0x61f)](_0x2743e1),this[_0x1a47df(0x910)][_0x1a47df(0x492)](_0x2743e1);for(const _0x3437ea of _0x2743e1[_0x1a47df(0x3b1)]){if(_0x1a47df(0x244)!==_0x1a47df(0x244))this[_0x1a47df(0x74b)]=![];else{if(_0x3437ea['endAnimation']){if(_0x1a47df(0x740)===_0x1a47df(0x574)){if(this[_0x1a47df(0x280)]===_0x49cc06)this[_0x1a47df(0x668)]();if(this[_0x1a47df(0x280)][_0x1a47df(0x6ee)]===_0x588f05)this[_0x1a47df(0x668)]();return this[_0x1a47df(0x280)]['Padding'];}else _0x3437ea['endAnimation']();}}}_0x2743e1['destroy']();},Spriteset_Base[_0x5eb334(0x63b)]['removeAllFauxAnimations']=function(){const _0x1728e2=_0x5eb334;for(const _0x132e01 of this['_fauxAnimationSprites']){if(_0x1728e2(0x5d4)!=='myASr')return this['yScrollLinkedOffset']();else this['removeFauxAnimation'](_0x132e01);}},Spriteset_Base['prototype'][_0x5eb334(0x70e)]=function(){const _0x5b0d57=_0x5eb334;return this[_0x5b0d57(0x813)][_0x5b0d57(0x61b)]>0x0;},Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x677)]=function(){const _0x4ce0d4=_0x5eb334;for(const _0x273830 of this['_pointAnimationSprites']){!_0x273830[_0x4ce0d4(0x446)]()&&this['removePointAnimation'](_0x273830);}this[_0x4ce0d4(0x444)]();},Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x444)]=function(){const _0x2cd3da=_0x5eb334;for(;;){const _0x78f7c3=$gameTemp['retrievePointAnimation']();if(_0x78f7c3)this[_0x2cd3da(0x268)](_0x78f7c3);else{if(_0x2cd3da(0x7e3)!==_0x2cd3da(0x7e3)){const _0x302cc8=_0x224079[_0x2cd3da(0x7c2)](_0x372fbf)+0x1;let _0x5e2c79=_0xb94feb+_0x2cd3da(0x4aa),_0x430e1e=_0x193309['CoreEngine'][_0x2cd3da(0x1d7)](_0x59e03d[_0x2cd3da(0x41b)]);_0x430e1e[_0x2cd3da(0x61b)]>0x0&&(_0x3b4b35['length']>0x0?_0x44c550+=_0x4ff13b+_0x2cd3da(0x6bd):_0x167b5e+=_0x4e7fa9+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x2cd3da(0x1ce)](_0x292fdc,_0x3c9246[_0x2cd3da(0x536)]||_0x2cd3da(0x404))+_0x325826,_0x6c0e8e+=_0x5e2c79[_0x2cd3da(0x1ce)](_0x302cc8,_0x430e1e));}else break;}}},Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x268)]=function(_0x55872d){const _0x4001fa=_0x5eb334,_0x4b31b0=$dataAnimations[_0x55872d[_0x4001fa(0x93a)]],_0x32c166=this[_0x4001fa(0x8c2)](_0x55872d),_0x4ae257=_0x55872d[_0x4001fa(0x227)],_0x5ee637=_0x55872d[_0x4001fa(0x183)];let _0x2b9386=this[_0x4001fa(0x7e9)]();const _0x2756d5=this['animationNextDelay']();if(this['isAnimationForEach'](_0x4b31b0))for(const _0x5531d7 of _0x32c166){_0x4001fa(0x757)!==_0x4001fa(0x27b)?(this[_0x4001fa(0x973)]([_0x5531d7],_0x4b31b0,_0x4ae257,_0x2b9386,_0x5ee637),_0x2b9386+=_0x2756d5):this[_0x4001fa(0x8b3)](0x0);}else this[_0x4001fa(0x973)](_0x32c166,_0x4b31b0,_0x4ae257,_0x2b9386,_0x5ee637);},Spriteset_Base[_0x5eb334(0x63b)]['createPointAnimationTargets']=function(_0x45f995){const _0x472ef1=_0x5eb334,_0x494015=new Sprite_Clickable();_0x494015['x']=_0x45f995['x'],_0x494015['y']=_0x45f995['y'],_0x494015['z']=0x64;const _0xd465d9=this[_0x472ef1(0x332)]();return _0xd465d9[_0x472ef1(0x569)](_0x494015),[_0x494015];},Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x332)]=function(){return this;},Spriteset_Map[_0x5eb334(0x63b)][_0x5eb334(0x332)]=function(){const _0x5e107d=_0x5eb334;return this[_0x5e107d(0x34b)]||this;},Spriteset_Battle[_0x5eb334(0x63b)][_0x5eb334(0x332)]=function(){const _0x4d703c=_0x5eb334;return this[_0x4d703c(0x308)]||this;},Spriteset_Base[_0x5eb334(0x63b)]['createPointAnimationSprite']=function(_0x44ccad,_0x17a05a,_0x334314,_0x4c2c25,_0xff5beb){const _0x585be7=_0x5eb334,_0x58e9f7=this['isMVAnimation'](_0x17a05a),_0x485cbf=new(_0x58e9f7?Sprite_AnimationMV:Sprite_Animation)();_0x485cbf[_0x585be7(0x3b1)]=_0x44ccad,_0x485cbf['setup'](_0x44ccad,_0x17a05a,_0x334314,_0x4c2c25),_0x485cbf[_0x585be7(0x5a9)](_0xff5beb),this[_0x585be7(0x910)]['addChild'](_0x485cbf),this[_0x585be7(0x3b6)][_0x585be7(0x6a4)](_0x485cbf);},Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x553)]=function(_0x26ad34){const _0x459e18=_0x5eb334;this[_0x459e18(0x3b6)][_0x459e18(0x61f)](_0x26ad34),this[_0x459e18(0x910)][_0x459e18(0x492)](_0x26ad34);for(const _0x4474fe of _0x26ad34['targetObjects']){if('nzeXT'===_0x459e18(0x1d8))return _0x2611ed[_0x459e18(0x541)][_0x459e18(0x34e)]['call'](this,_0x13f1c1);else{_0x4474fe[_0x459e18(0x941)]&&('XHKiq'!==_0x459e18(0x570)?_0x4474fe[_0x459e18(0x941)]():(_0x614aa3[_0x459e18(0x961)](),this[_0x459e18(0x95e)]()));const _0x3613af=this[_0x459e18(0x332)]();if(_0x3613af)_0x3613af[_0x459e18(0x492)](_0x4474fe);}}_0x26ad34[_0x459e18(0x868)]();},Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x98a)]=function(){const _0x2bfa03=_0x5eb334;for(const _0x9f7b12 of this['_pointAnimationSprites']){this[_0x2bfa03(0x553)](_0x9f7b12);}},Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x420)]=function(){const _0x5ca558=_0x5eb334;return this[_0x5ca558(0x3b6)][_0x5ca558(0x61b)]>0x0;},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x5ed)]=Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x99f)],Spriteset_Base[_0x5eb334(0x63b)][_0x5eb334(0x99f)]=function(){const _0x499884=_0x5eb334;return VisuMZ[_0x499884(0x541)][_0x499884(0x5ed)][_0x499884(0x3e2)](this)||this[_0x499884(0x420)]();},Spriteset_Map[_0x5eb334(0x853)]=VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)][_0x5eb334(0x70a)]['DetachMapPictureContainer']||![],VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x54b)]=Scene_Map[_0x5eb334(0x63b)][_0x5eb334(0x49e)],Scene_Map[_0x5eb334(0x63b)]['createSpriteset']=function(){const _0x260897=_0x5eb334;VisuMZ[_0x260897(0x541)][_0x260897(0x54b)][_0x260897(0x3e2)](this);if(!Spriteset_Map[_0x260897(0x853)])return;const _0x41182c=this[_0x260897(0x3ca)];if(!_0x41182c)return;this[_0x260897(0x789)]=_0x41182c[_0x260897(0x789)];if(!this[_0x260897(0x789)])return;this[_0x260897(0x569)](this[_0x260897(0x789)]);},Spriteset_Battle[_0x5eb334(0x853)]=VisuMZ['CoreEngine'][_0x5eb334(0x467)]['QoL']['DetachBattlePictureContainer']||![],VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x97f)]=Scene_Battle[_0x5eb334(0x63b)]['createSpriteset'],Scene_Battle[_0x5eb334(0x63b)][_0x5eb334(0x49e)]=function(){const _0x4bf67e=_0x5eb334;VisuMZ['CoreEngine'][_0x4bf67e(0x97f)]['call'](this);if(!Spriteset_Battle['DETACH_PICTURE_CONTAINER'])return;const _0x5c7a2b=this[_0x4bf67e(0x3ca)];if(!_0x5c7a2b)return;this['_pictureContainer']=_0x5c7a2b[_0x4bf67e(0x789)];if(!this['_pictureContainer'])return;this['addChild'](this[_0x4bf67e(0x789)]);},Spriteset_Battle[_0x5eb334(0x63b)]['createBackground']=function(){const _0x24d8cc=_0x5eb334;this[_0x24d8cc(0x641)]=new PIXI['filters']['BlurFilter'](clamp=!![]),this[_0x24d8cc(0x3b3)]=new Sprite(),this[_0x24d8cc(0x3b3)][_0x24d8cc(0x83b)]=SceneManager[_0x24d8cc(0x6af)](),this[_0x24d8cc(0x3b3)][_0x24d8cc(0x36a)]=[this[_0x24d8cc(0x641)]],this[_0x24d8cc(0x69d)][_0x24d8cc(0x569)](this[_0x24d8cc(0x3b3)]);},VisuMZ['CoreEngine'][_0x5eb334(0x4ec)]=Spriteset_Battle['prototype'][_0x5eb334(0x23a)],Spriteset_Battle[_0x5eb334(0x63b)][_0x5eb334(0x23a)]=function(){const _0x2c3f29=_0x5eb334;this[_0x2c3f29(0x3cb)]()&&this[_0x2c3f29(0x888)](),VisuMZ[_0x2c3f29(0x541)]['Spriteset_Battle_createEnemies'][_0x2c3f29(0x3e2)](this);},Spriteset_Battle['prototype'][_0x5eb334(0x3cb)]=function(){const _0x1e5222=_0x5eb334,_0x2fd8ab=VisuMZ[_0x1e5222(0x541)][_0x1e5222(0x467)][_0x1e5222(0x867)];if(!_0x2fd8ab)return![];if(Utils[_0x1e5222(0x733)]>='1.3.0'&&!_0x2fd8ab[_0x1e5222(0x726)]){if('URhbp'===_0x1e5222(0x561))return![];else this['processKeyboardDelete']();}return _0x2fd8ab[_0x1e5222(0x643)];},Spriteset_Battle[_0x5eb334(0x63b)][_0x5eb334(0x888)]=function(){const _0x248902=_0x5eb334;for(member of $gameTroop[_0x248902(0x62b)]()){member[_0x248902(0x830)]();}},VisuMZ[_0x5eb334(0x541)]['Window_Base_initialize']=Window_Base['prototype'][_0x5eb334(0x1e1)],Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x1e1)]=function(_0x2b568a){const _0x127fb0=_0x5eb334;_0x2b568a['x']=Math[_0x127fb0(0x811)](_0x2b568a['x']),_0x2b568a['y']=Math['round'](_0x2b568a['y']),_0x2b568a[_0x127fb0(0x21a)]=Math['round'](_0x2b568a['width']),_0x2b568a['height']=Math[_0x127fb0(0x811)](_0x2b568a[_0x127fb0(0x289)]),this['initDigitGrouping'](),VisuMZ[_0x127fb0(0x541)][_0x127fb0(0x8e0)]['call'](this,_0x2b568a),this['initCoreEasing']();},Window_Base[_0x5eb334(0x63b)]['initDigitGrouping']=function(){const _0x52ab77=_0x5eb334;this[_0x52ab77(0x661)]=VisuMZ['CoreEngine'][_0x52ab77(0x467)][_0x52ab77(0x70a)][_0x52ab77(0x4fa)],this[_0x52ab77(0x255)]=VisuMZ['CoreEngine'][_0x52ab77(0x467)][_0x52ab77(0x70a)][_0x52ab77(0x44b)];},Window_Base[_0x5eb334(0x63b)]['lineHeight']=function(){const _0x557027=_0x5eb334;return VisuMZ[_0x557027(0x541)][_0x557027(0x467)][_0x557027(0x3f8)][_0x557027(0x722)];},Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x675)]=function(){const _0x44e797=_0x5eb334;return VisuMZ[_0x44e797(0x541)]['Settings']['Window'][_0x44e797(0x1b3)];},Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x606)]=function(){const _0x37816d=_0x5eb334;$gameSystem[_0x37816d(0x4e8)]?_0x37816d(0x257)==='tUsIL'?this[_0x37816d(0x82f)]=$gameSystem['windowOpacity']():this[_0x37816d(0x2cd)]():this[_0x37816d(0x82f)]=VisuMZ[_0x37816d(0x541)][_0x37816d(0x467)][_0x37816d(0x3f8)][_0x37816d(0x877)];},Window_Base['prototype'][_0x5eb334(0x4c9)]=function(){const _0xd0153e=_0x5eb334;return VisuMZ[_0xd0153e(0x541)]['Settings']['Window']['TranslucentOpacity'];},Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x924)]=function(){const _0x34bccb=_0x5eb334;return VisuMZ['CoreEngine'][_0x34bccb(0x467)][_0x34bccb(0x3f8)][_0x34bccb(0x325)];},VisuMZ['CoreEngine'][_0x5eb334(0x82a)]=Window_Base['prototype'][_0x5eb334(0x3c4)],Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x3c4)]=function(){const _0x2f9907=_0x5eb334;VisuMZ[_0x2f9907(0x541)][_0x2f9907(0x82a)][_0x2f9907(0x3e2)](this),this[_0x2f9907(0x262)]();},Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x32b)]=function(){const _0x122afb=_0x5eb334;this[_0x122afb(0x469)]&&(this[_0x122afb(0x922)]+=this[_0x122afb(0x924)](),this['isOpen']()&&(this[_0x122afb(0x469)]=![]));},Window_Base[_0x5eb334(0x63b)]['updateClose']=function(){const _0x1c48df=_0x5eb334;this['_closing']&&('GiKOk'!==_0x1c48df(0x6c5)?_0x3a2ee7['CoreEngine'][_0x1c48df(0x3b5)][_0x1c48df(0x3e2)](this):(this[_0x1c48df(0x922)]-=this['openingSpeed'](),this[_0x1c48df(0x7f1)]()&&(_0x1c48df(0x2fe)!==_0x1c48df(0x2fe)?_0x9bdf10[_0x1c48df(0x4e8)]?this['backOpacity']=_0x3e3408['windowOpacity']():this[_0x1c48df(0x82f)]=_0x56be26[_0x1c48df(0x541)][_0x1c48df(0x467)][_0x1c48df(0x3f8)]['BackOpacity']:this[_0x1c48df(0x1c9)]=![])));},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x6fa)]=Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x42e)],Window_Base[_0x5eb334(0x63b)]['drawText']=function(_0x34cb30,_0x1a370d,_0x255db8,_0x24d879,_0x1e9c85){const _0x1dbf5d=_0x5eb334;if(this[_0x1dbf5d(0x41e)]())_0x34cb30=VisuMZ[_0x1dbf5d(0x683)](_0x34cb30);VisuMZ[_0x1dbf5d(0x541)][_0x1dbf5d(0x6fa)][_0x1dbf5d(0x3e2)](this,_0x34cb30,_0x1a370d,_0x255db8,_0x24d879,_0x1e9c85);},Window_Base[_0x5eb334(0x63b)]['useDigitGrouping']=function(){return this['_digitGrouping'];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x736)]=Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x334)],Window_Base[_0x5eb334(0x63b)]['createTextState']=function(_0x155486,_0x1e9b19,_0x67112a,_0x2889d9){const _0x2b6500=_0x5eb334;var _0x17189d=VisuMZ[_0x2b6500(0x541)][_0x2b6500(0x736)][_0x2b6500(0x3e2)](this,_0x155486,_0x1e9b19,_0x67112a,_0x2889d9);if(this[_0x2b6500(0x2fd)]())_0x17189d[_0x2b6500(0x2b5)]=VisuMZ[_0x2b6500(0x683)](_0x17189d['text']);return _0x17189d;},Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x2fd)]=function(){return this['_digitGroupingEx'];},Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x373)]=function(_0x59eb5c){const _0x44b225=_0x5eb334;this[_0x44b225(0x661)]=_0x59eb5c;},Window_Base['prototype'][_0x5eb334(0x682)]=function(_0x4ae0ab){const _0xb37ed4=_0x5eb334;this[_0xb37ed4(0x255)]=_0x4ae0ab;},VisuMZ['CoreEngine']['Window_Base_drawIcon']=Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x818)],Window_Base['prototype'][_0x5eb334(0x818)]=function(_0xd246be,_0x2c9777,_0x426fff){const _0x486006=_0x5eb334;_0x2c9777=Math[_0x486006(0x811)](_0x2c9777),_0x426fff=Math[_0x486006(0x811)](_0x426fff),VisuMZ[_0x486006(0x541)]['Window_Base_drawIcon'][_0x486006(0x3e2)](this,_0xd246be,_0x2c9777,_0x426fff);},VisuMZ['CoreEngine']['Window_Base_drawFace']=Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x609)],Window_Base[_0x5eb334(0x63b)]['drawFace']=function(_0x21af40,_0xc3807d,_0x5f7bec,_0x23207e,_0x198718,_0x28aca5){const _0x44f635=_0x5eb334;_0x198718=_0x198718||ImageManager['faceWidth'],_0x28aca5=_0x28aca5||ImageManager['faceHeight'],_0x5f7bec=Math['round'](_0x5f7bec),_0x23207e=Math[_0x44f635(0x811)](_0x23207e),_0x198718=Math['round'](_0x198718),_0x28aca5=Math[_0x44f635(0x811)](_0x28aca5),VisuMZ[_0x44f635(0x541)][_0x44f635(0x419)]['call'](this,_0x21af40,_0xc3807d,_0x5f7bec,_0x23207e,_0x198718,_0x28aca5);},VisuMZ['CoreEngine']['Window_Base_drawCharacter']=Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x953)],Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x953)]=function(_0x905699,_0x568c7d,_0xaab8b1,_0x28fb7d){const _0x3635b5=_0x5eb334;_0xaab8b1=Math['round'](_0xaab8b1),_0x28fb7d=Math['round'](_0x28fb7d),VisuMZ[_0x3635b5(0x541)][_0x3635b5(0x1ff)][_0x3635b5(0x3e2)](this,_0x905699,_0x568c7d,_0xaab8b1,_0x28fb7d);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x2a6)]=Window_Selectable[_0x5eb334(0x63b)][_0x5eb334(0x94c)],Window_Selectable['prototype'][_0x5eb334(0x94c)]=function(_0x5af2db){const _0xae8132=_0x5eb334;let _0x4b743b=VisuMZ['CoreEngine'][_0xae8132(0x2a6)]['call'](this,_0x5af2db);return _0x4b743b['x']=Math['round'](_0x4b743b['x']),_0x4b743b['y']=Math[_0xae8132(0x811)](_0x4b743b['y']),_0x4b743b[_0xae8132(0x21a)]=Math[_0xae8132(0x811)](_0x4b743b['width']),_0x4b743b[_0xae8132(0x289)]=Math['round'](_0x4b743b[_0xae8132(0x289)]),_0x4b743b;},VisuMZ[_0x5eb334(0x541)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase[_0x5eb334(0x63b)]['drawActorSimpleStatus'],Window_StatusBase[_0x5eb334(0x63b)][_0x5eb334(0x90a)]=function(_0x150326,_0x1b23ed,_0x983964){const _0x18f5e0=_0x5eb334;_0x1b23ed=Math['round'](_0x1b23ed),_0x983964=Math[_0x18f5e0(0x811)](_0x983964),VisuMZ[_0x18f5e0(0x541)][_0x18f5e0(0x352)]['call'](this,_0x150326,_0x1b23ed,_0x983964);},Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x477)]=function(){const _0x574dab=_0x5eb334;this[_0x574dab(0x28a)]={'duration':0x0,'wholeDuration':0x0,'type':_0x574dab(0x524),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x574dab(0x5d3)]['x'],'targetScaleY':this[_0x574dab(0x5d3)]['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this[_0x574dab(0x82f)],'targetContentsOpacity':this[_0x574dab(0x906)]};},Window_Base['prototype'][_0x5eb334(0x262)]=function(){const _0x2d1028=_0x5eb334;if(!this[_0x2d1028(0x28a)])return;if(this['_coreEasing'][_0x2d1028(0x6f1)]<=0x0)return;this['x']=this[_0x2d1028(0x85f)](this['x'],this[_0x2d1028(0x28a)]['targetX']),this['y']=this[_0x2d1028(0x85f)](this['y'],this[_0x2d1028(0x28a)][_0x2d1028(0x3df)]),this['scale']['x']=this[_0x2d1028(0x85f)](this[_0x2d1028(0x5d3)]['x'],this['_coreEasing'][_0x2d1028(0x35d)]),this[_0x2d1028(0x5d3)]['y']=this['applyCoreEasing'](this['scale']['y'],this[_0x2d1028(0x28a)][_0x2d1028(0x7b3)]),this[_0x2d1028(0x882)]=this['applyCoreEasing'](this[_0x2d1028(0x882)],this[_0x2d1028(0x28a)][_0x2d1028(0x4de)]),this['backOpacity']=this[_0x2d1028(0x85f)](this[_0x2d1028(0x82f)],this[_0x2d1028(0x28a)]['targetBackOpacity']),this[_0x2d1028(0x906)]=this['applyCoreEasing'](this[_0x2d1028(0x906)],this[_0x2d1028(0x28a)][_0x2d1028(0x8a7)]),this['_coreEasing'][_0x2d1028(0x6f1)]--;},Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x85f)]=function(_0x3f6da4,_0x2b9714){const _0x164f97=_0x5eb334;if(!this['_coreEasing'])return _0x2b9714;const _0x7f21fe=this[_0x164f97(0x28a)][_0x164f97(0x6f1)],_0x23ca15=this[_0x164f97(0x28a)]['wholeDuration'],_0x1e9530=this['calcCoreEasing']((_0x23ca15-_0x7f21fe)/_0x23ca15),_0x5f24da=this['calcCoreEasing']((_0x23ca15-_0x7f21fe+0x1)/_0x23ca15),_0x4176af=(_0x3f6da4-_0x2b9714*_0x1e9530)/(0x1-_0x1e9530);return _0x4176af+(_0x2b9714-_0x4176af)*_0x5f24da;},Window_Base['prototype']['calcCoreEasing']=function(_0xd990c1){const _0x20924c=_0x5eb334;if(!this[_0x20924c(0x28a)])return _0xd990c1;return VisuMZ['ApplyEasing'](_0xd990c1,this[_0x20924c(0x28a)][_0x20924c(0x5ca)]||_0x20924c(0x524));},Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x1f0)]=function(_0x355f67,_0x338a70){const _0x4669c6=_0x5eb334;if(!this[_0x4669c6(0x28a)])return;this['x']=this['_coreEasing'][_0x4669c6(0x32f)],this['y']=this[_0x4669c6(0x28a)][_0x4669c6(0x3df)],this[_0x4669c6(0x5d3)]['x']=this[_0x4669c6(0x28a)][_0x4669c6(0x35d)],this[_0x4669c6(0x5d3)]['y']=this['_coreEasing'][_0x4669c6(0x7b3)],this[_0x4669c6(0x882)]=this[_0x4669c6(0x28a)][_0x4669c6(0x4de)],this['backOpacity']=this['_coreEasing']['targetBackOpacity'],this[_0x4669c6(0x906)]=this[_0x4669c6(0x28a)][_0x4669c6(0x8a7)],this['setupCoreEasing'](_0x355f67,_0x338a70,this['x'],this['y'],this[_0x4669c6(0x5d3)]['x'],this[_0x4669c6(0x5d3)]['y'],this[_0x4669c6(0x882)],this[_0x4669c6(0x82f)],this['contentsOpacity']);},Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x56b)]=function(_0x5a2792,_0x699476,_0x209ce3,_0x4f6337,_0x17f347,_0x3b14c5,_0x4e5adb,_0x4b8ca7,_0xc4d7f8){this['_coreEasing']={'duration':_0x5a2792,'wholeDuration':_0x5a2792,'type':_0x699476,'targetX':_0x209ce3,'targetY':_0x4f6337,'targetScaleX':_0x17f347,'targetScaleY':_0x3b14c5,'targetOpacity':_0x4e5adb,'targetBackOpacity':_0x4b8ca7,'targetContentsOpacity':_0xc4d7f8};},Window_Base[_0x5eb334(0x63b)]['drawCurrencyValue']=function(_0x40cc2f,_0x51d463,_0x45f270,_0x1210f6,_0x3a6454){const _0x1cd233=_0x5eb334;this[_0x1cd233(0x43f)](),this[_0x1cd233(0x2c9)][_0x1cd233(0x803)]=VisuMZ['CoreEngine']['Settings'][_0x1cd233(0x612)][_0x1cd233(0x368)];const _0x4bc42c=VisuMZ['CoreEngine'][_0x1cd233(0x467)][_0x1cd233(0x612)][_0x1cd233(0x979)];if(_0x4bc42c>0x0&&_0x51d463===TextManager['currencyUnit']){if(_0x1cd233(0x70b)===_0x1cd233(0x96a))_0x3ec3a5[_0x1cd233(0x23d)](_0x5f1d30);else{const _0x2a54a3=_0x1210f6+(this[_0x1cd233(0x217)]()-ImageManager['iconHeight'])/0x2;this[_0x1cd233(0x818)](_0x4bc42c,_0x45f270+(_0x3a6454-ImageManager[_0x1cd233(0x48e)]),_0x2a54a3),_0x3a6454-=ImageManager[_0x1cd233(0x48e)]+0x4;}}else{if(_0x1cd233(0x8ca)!==_0x1cd233(0x269))this[_0x1cd233(0x365)](ColorManager['systemColor']()),this['drawText'](_0x51d463,_0x45f270,_0x1210f6,_0x3a6454,_0x1cd233(0x3d8)),_0x3a6454-=this['textWidth'](_0x51d463)+0x6;else{if(_0x4bcc14)_0x1c34e6[_0x1cd233(0x839)](_0x1d1714);}}this[_0x1cd233(0x1f1)]();const _0x79ee2d=this[_0x1cd233(0x145)](this['_digitGrouping']?VisuMZ['GroupDigits'](_0x40cc2f):_0x40cc2f);_0x79ee2d>_0x3a6454?this[_0x1cd233(0x42e)](VisuMZ[_0x1cd233(0x541)][_0x1cd233(0x467)][_0x1cd233(0x612)][_0x1cd233(0x87b)],_0x45f270,_0x1210f6,_0x3a6454,_0x1cd233(0x3d8)):this[_0x1cd233(0x42e)](_0x40cc2f,_0x45f270,_0x1210f6,_0x3a6454,_0x1cd233(0x3d8)),this['resetFontSettings']();},Window_Base['prototype'][_0x5eb334(0x462)]=function(_0x2ead2c,_0x16977,_0x20e395,_0x3ad396,_0x16402c){const _0x18374e=_0x5eb334,_0xd934d6=ImageManager['loadSystem']('IconSet'),_0x38a063=ImageManager[_0x18374e(0x48e)],_0x37a05a=ImageManager['iconHeight'],_0x25362b=_0x2ead2c%0x10*_0x38a063,_0x8c3e08=Math[_0x18374e(0x7fd)](_0x2ead2c/0x10)*_0x37a05a,_0x2a45a3=_0x3ad396,_0x24d736=_0x3ad396;this[_0x18374e(0x2c9)][_0x18374e(0x4f4)][_0x18374e(0x725)]=_0x16402c,this[_0x18374e(0x2c9)]['blt'](_0xd934d6,_0x25362b,_0x8c3e08,_0x38a063,_0x37a05a,_0x16977,_0x20e395,_0x2a45a3,_0x24d736),this[_0x18374e(0x2c9)][_0x18374e(0x4f4)][_0x18374e(0x725)]=!![];},Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x6f9)]=function(_0x2654ad,_0x41946f,_0x2b4d4c,_0x344df2,_0x5a67a8,_0x3131e5){const _0x3d454a=_0x5eb334,_0x18c55f=Math[_0x3d454a(0x7fd)]((_0x2b4d4c-0x2)*_0x344df2),_0x47309f=Sprite_Gauge[_0x3d454a(0x63b)][_0x3d454a(0x261)][_0x3d454a(0x3e2)](this),_0x34f98b=_0x41946f+this[_0x3d454a(0x217)]()-_0x47309f-0x2;this[_0x3d454a(0x2c9)][_0x3d454a(0x808)](_0x2654ad,_0x34f98b,_0x2b4d4c,_0x47309f,ColorManager['gaugeBackColor']()),this['contents'][_0x3d454a(0x384)](_0x2654ad+0x1,_0x34f98b+0x1,_0x18c55f,_0x47309f-0x2,_0x5a67a8,_0x3131e5);},Window_Selectable[_0x5eb334(0x63b)][_0x5eb334(0x2b9)]=function(_0x5c2f49){const _0x4f7e02=_0x5eb334;let _0x40483b=this['index']();const _0x5ce418=this[_0x4f7e02(0x2ee)](),_0x354455=this['maxCols']();if(this[_0x4f7e02(0x8ce)]()&&(_0x40483b<_0x5ce418||_0x5c2f49&&_0x354455===0x1)){_0x40483b+=_0x354455;if(_0x40483b>=_0x5ce418)_0x40483b=_0x5ce418-0x1;this[_0x4f7e02(0x931)](_0x40483b);}else!this['isUseModernControls']()&&((_0x40483b<_0x5ce418-_0x354455||_0x5c2f49&&_0x354455===0x1)&&this[_0x4f7e02(0x931)]((_0x40483b+_0x354455)%_0x5ce418));},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x463)]=Window_Selectable[_0x5eb334(0x63b)]['cursorDown'],Window_Selectable[_0x5eb334(0x63b)]['cursorDown']=function(_0x533e16){const _0x3ee911=_0x5eb334;this[_0x3ee911(0x8ce)]()&&_0x533e16&&this[_0x3ee911(0x2a3)]()===0x1&&this[_0x3ee911(0x5f3)]()===this['maxItems']()-0x1?'bapKn'!=='GwFQG'?this['smoothSelect'](0x0):this[_0x3ee911(0x392)][_0x3ee911(0x485)](_0x43621f[_0x3ee911(0x885)][_0x3ee911(0x7a6)]):VisuMZ['CoreEngine'][_0x3ee911(0x463)][_0x3ee911(0x3e2)](this,_0x533e16);},Window_Selectable[_0x5eb334(0x63b)][_0x5eb334(0x49b)]=function(_0x4c4eeb){const _0x4af1ac=_0x5eb334;let _0x2e1d67=Math[_0x4af1ac(0x852)](0x0,this[_0x4af1ac(0x5f3)]());const _0x3ee1c8=this[_0x4af1ac(0x2ee)](),_0xf19054=this[_0x4af1ac(0x2a3)]();if(this[_0x4af1ac(0x8ce)]()&&_0x2e1d67>0x0||_0x4c4eeb&&_0xf19054===0x1){if(_0x4af1ac(0x191)!==_0x4af1ac(0x433)){_0x2e1d67-=_0xf19054;if(_0x2e1d67<=0x0)_0x2e1d67=0x0;this[_0x4af1ac(0x931)](_0x2e1d67);}else _0x96d0b1(_0x4af1ac(0x230)[_0x4af1ac(0x1ce)](_0xaf23dc,_0x25c1b2)),_0x30a18d[_0x4af1ac(0x40c)]();}else{if(!this['isUseModernControls']()){if('TrARP'!==_0x4af1ac(0x96b)){const _0x135829=_0x1c0790['platform']==_0x4af1ac(0x465)?_0x4af1ac(0x977):_0xe6f434[_0x4af1ac(0x12f)]=='win32'?_0x4af1ac(0x8a8):'xdg-open';_0x4285b7(_0x4af1ac(0x267))['exec'](_0x135829+'\x20'+_0x1ba260);}else(_0x2e1d67>=_0xf19054||_0x4c4eeb&&_0xf19054===0x1)&&this[_0x4af1ac(0x931)]((_0x2e1d67-_0xf19054+_0x3ee1c8)%_0x3ee1c8);}}},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x153)]=Window_Selectable['prototype'][_0x5eb334(0x49b)],Window_Selectable['prototype'][_0x5eb334(0x49b)]=function(_0x51e239){const _0x480238=_0x5eb334;if(this[_0x480238(0x8ce)]()&&_0x51e239&&this[_0x480238(0x2a3)]()===0x1&&this[_0x480238(0x5f3)]()===0x0){if(_0x480238(0x72c)!=='ceiwV')return this[_0x480238(0x3eb)](_0x102e40);else this[_0x480238(0x931)](this[_0x480238(0x2ee)]()-0x1);}else VisuMZ[_0x480238(0x541)][_0x480238(0x153)][_0x480238(0x3e2)](this,_0x51e239);},Window_Selectable[_0x5eb334(0x63b)][_0x5eb334(0x8ce)]=function(){const _0x5b7422=_0x5eb334;return VisuMZ['CoreEngine'][_0x5b7422(0x467)][_0x5b7422(0x70a)]['ModernControls'];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x21c)]=Window_Selectable['prototype']['processCursorMove'],Window_Selectable['prototype']['processCursorMove']=function(){const _0x32a8f2=_0x5eb334;this[_0x32a8f2(0x8ce)]()?(this[_0x32a8f2(0x281)](),this['processCursorHomeEndTrigger']()):VisuMZ['CoreEngine'][_0x32a8f2(0x21c)][_0x32a8f2(0x3e2)](this);},Window_Selectable[_0x5eb334(0x63b)][_0x5eb334(0x633)]=function(){return!![];},Window_Selectable[_0x5eb334(0x63b)][_0x5eb334(0x281)]=function(){const _0x393315=_0x5eb334;if(this['isCursorMovable']()){if(_0x393315(0x895)!==_0x393315(0x895))this[_0x393315(0x961)]();else{const _0x3fab24=this[_0x393315(0x5f3)]();if(Input[_0x393315(0x439)](_0x393315(0x588))){if(_0x393315(0x700)===_0x393315(0x1d0))return _0x393315(0x3fa);else Input['isPressed'](_0x393315(0x80d))&&this['allowShiftScrolling']()?'GFGhm'!==_0x393315(0x72a)?(_0x2957b6[_0x393315(0x6f7)]=!![],_0x47b088['CoreEngine'][_0x393315(0x5fc)]['call'](this,_0x3a7375,_0x593c60),_0xc574d9['_changingClass']=_0x1d7272):this['cursorPagedown']():this['cursorDown'](Input[_0x393315(0x209)](_0x393315(0x588)));}if(Input['isRepeated']('up')){if(_0x393315(0x4a8)!==_0x393315(0x93d))Input[_0x393315(0x66d)](_0x393315(0x80d))&&this[_0x393315(0x633)]()?this[_0x393315(0x4c1)]():this[_0x393315(0x49b)](Input[_0x393315(0x209)]('up'));else return'PTB';}Input[_0x393315(0x439)]('right')&&(_0x393315(0x5c9)===_0x393315(0x5c9)?this[_0x393315(0x30b)](Input[_0x393315(0x209)](_0x393315(0x3d8))):(this[_0x393315(0x315)][_0x393315(0x3d1)]=!![],this['_centerCameraCheck'][_0x393315(0x548)]=_0x7adf89['DisplayLockY']||0x0)),Input[_0x393315(0x439)]('left')&&('cfqut'!==_0x393315(0x2d6)?this[_0x393315(0x981)]()?this[_0x393315(0x29c)]():_0x261ee9[_0x393315(0x541)][_0x393315(0x277)]['call'](this):this[_0x393315(0x314)](Input[_0x393315(0x209)](_0x393315(0x22f)))),!this[_0x393315(0x506)](_0x393315(0x4bb))&&Input['isRepeated'](_0x393315(0x4bb))&&this[_0x393315(0x2cd)](),!this['isHandled']('pageup')&&Input[_0x393315(0x439)](_0x393315(0x5e0))&&this[_0x393315(0x4c1)](),this[_0x393315(0x5f3)]()!==_0x3fab24&&this[_0x393315(0x56d)]();}}},Window_Selectable[_0x5eb334(0x63b)][_0x5eb334(0x391)]=function(){const _0x4d98d4=_0x5eb334;if(this[_0x4d98d4(0x68a)]()){const _0x21ed7d=this[_0x4d98d4(0x5f3)]();Input['isTriggered']('home')&&('AAMHL'===_0x4d98d4(0x50c)?this[_0x4d98d4(0x318)][_0x300176]=this['textColor'](_0x206332(_0x14e197)):this['smoothSelect'](Math['min'](this[_0x4d98d4(0x5f3)](),0x0)));Input[_0x4d98d4(0x209)](_0x4d98d4(0x2ca))&&this['smoothSelect'](Math['max'](this['index'](),this['maxItems']()-0x1));if(this[_0x4d98d4(0x5f3)]()!==_0x21ed7d){if(_0x4d98d4(0x225)!=='DxPrk')return _0xe1f7e6[_0x4d98d4(0x885)][_0x4d98d4(0x91c)]['call'](this);else this[_0x4d98d4(0x56d)]();}}},VisuMZ['CoreEngine'][_0x5eb334(0x547)]=Window_Selectable[_0x5eb334(0x63b)][_0x5eb334(0x42f)],Window_Selectable[_0x5eb334(0x63b)]['processTouch']=function(){const _0x20c932=_0x5eb334;this[_0x20c932(0x8ce)]()?this[_0x20c932(0x79f)]():VisuMZ['CoreEngine'][_0x20c932(0x547)][_0x20c932(0x3e2)](this);},Window_Selectable[_0x5eb334(0x63b)][_0x5eb334(0x79f)]=function(){const _0x4dd2f2=_0x5eb334;VisuMZ[_0x4dd2f2(0x541)][_0x4dd2f2(0x547)][_0x4dd2f2(0x3e2)](this);},Window_Selectable[_0x5eb334(0x63b)][_0x5eb334(0x5a7)]=function(){const _0x4ae43f=_0x5eb334;return VisuMZ[_0x4ae43f(0x541)][_0x4ae43f(0x467)][_0x4ae43f(0x3f8)][_0x4ae43f(0x4c8)];},Window_Selectable[_0x5eb334(0x63b)]['rowSpacing']=function(){const _0x16d7ed=_0x5eb334;return VisuMZ[_0x16d7ed(0x541)][_0x16d7ed(0x467)]['Window'][_0x16d7ed(0x847)];},Window_Selectable[_0x5eb334(0x63b)]['itemHeight']=function(){const _0x33a8f6=_0x5eb334;return Window_Scrollable[_0x33a8f6(0x63b)]['itemHeight']['call'](this)+VisuMZ[_0x33a8f6(0x541)]['Settings'][_0x33a8f6(0x3f8)][_0x33a8f6(0x4e3)];;},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x287)]=Window_Selectable[_0x5eb334(0x63b)]['drawBackgroundRect'],Window_Selectable[_0x5eb334(0x63b)]['drawBackgroundRect']=function(_0x4ce833){const _0x4a4164=_0x5eb334,_0x24df3c=VisuMZ[_0x4a4164(0x541)]['Settings'][_0x4a4164(0x3f8)];if(_0x24df3c[_0x4a4164(0x573)]===![])return;if(_0x24df3c[_0x4a4164(0x6e4)])_0x24df3c[_0x4a4164(0x6e4)][_0x4a4164(0x3e2)](this,_0x4ce833);else{if(_0x4a4164(0x7de)!==_0x4a4164(0x29a))VisuMZ[_0x4a4164(0x541)]['Window_Selectable_drawBackgroundRect'][_0x4a4164(0x3e2)](this,_0x4ce833);else{const _0x3d27b7='_stored_gaugeBackColor';this['_colorCache']=this[_0x4a4164(0x318)]||{};if(this[_0x4a4164(0x318)][_0x3d27b7])return this['_colorCache'][_0x3d27b7];const _0x85af25=_0x49b950['CoreEngine'][_0x4a4164(0x467)]['Color'][_0x4a4164(0x333)];return this[_0x4a4164(0x32d)](_0x3d27b7,_0x85af25);}}},VisuMZ['CoreEngine']['Window_Gold_refresh']=Window_Gold['prototype'][_0x5eb334(0x4a7)],Window_Gold[_0x5eb334(0x63b)][_0x5eb334(0x4a7)]=function(){const _0x145ab5=_0x5eb334;this['isItemStyle']()?this['drawGoldItemStyle']():'ZBRag'===_0x145ab5(0x91f)?VisuMZ[_0x145ab5(0x541)][_0x145ab5(0x3b5)][_0x145ab5(0x3e2)](this):_0x4b9515[_0x145ab5(0x3a2)]&&(this['_forcedBattleSys']='OTB');},Window_Gold[_0x5eb334(0x63b)][_0x5eb334(0x5e5)]=function(){const _0x4e8697=_0x5eb334;if(TextManager[_0x4e8697(0x93e)]!==this['currencyUnit']())return![];return VisuMZ['CoreEngine'][_0x4e8697(0x467)][_0x4e8697(0x612)][_0x4e8697(0x727)];},Window_Gold[_0x5eb334(0x63b)]['drawGoldItemStyle']=function(){const _0x2e5942=_0x5eb334;this[_0x2e5942(0x43f)](),this[_0x2e5942(0x2c9)][_0x2e5942(0x961)](),this[_0x2e5942(0x2c9)]['fontSize']=VisuMZ[_0x2e5942(0x541)]['Settings'][_0x2e5942(0x612)][_0x2e5942(0x368)];const _0x731159=VisuMZ[_0x2e5942(0x541)]['Settings'][_0x2e5942(0x612)][_0x2e5942(0x979)],_0x21076c=this[_0x2e5942(0x904)](0x0);if(_0x731159>0x0){const _0x1e74d2=_0x21076c['y']+(this[_0x2e5942(0x217)]()-ImageManager[_0x2e5942(0x5fb)])/0x2;this[_0x2e5942(0x818)](_0x731159,_0x21076c['x'],_0x1e74d2);const _0x40719d=ImageManager[_0x2e5942(0x48e)]+0x4;_0x21076c['x']+=_0x40719d,_0x21076c[_0x2e5942(0x21a)]-=_0x40719d;}this[_0x2e5942(0x365)](ColorManager[_0x2e5942(0x73d)]()),this['drawText'](this[_0x2e5942(0x93e)](),_0x21076c['x'],_0x21076c['y'],_0x21076c[_0x2e5942(0x21a)],_0x2e5942(0x22f));const _0x265609=this[_0x2e5942(0x145)](this['currencyUnit']())+0x6;;_0x21076c['x']+=_0x265609,_0x21076c[_0x2e5942(0x21a)]-=_0x265609,this['resetTextColor']();const _0x477275=this['value'](),_0x5327fd=this[_0x2e5942(0x145)](this[_0x2e5942(0x661)]?VisuMZ[_0x2e5942(0x683)](this[_0x2e5942(0x2bc)]()):this['value']());if(_0x5327fd>_0x21076c[_0x2e5942(0x21a)]){if('gLAUy'===_0x2e5942(0x383))return _0x1ecfa5['CoreEngine'][_0x2e5942(0x467)][_0x2e5942(0x3f8)][_0x2e5942(0x4c8)];else this[_0x2e5942(0x42e)](VisuMZ[_0x2e5942(0x541)]['Settings']['Gold'][_0x2e5942(0x87b)],_0x21076c['x'],_0x21076c['y'],_0x21076c[_0x2e5942(0x21a)],_0x2e5942(0x3d8));}else this[_0x2e5942(0x42e)](this[_0x2e5942(0x2bc)](),_0x21076c['x'],_0x21076c['y'],_0x21076c[_0x2e5942(0x21a)],_0x2e5942(0x3d8));this[_0x2e5942(0x43f)]();},Window_StatusBase['prototype']['drawParamText']=function(_0x50d700,_0xa2bfb5,_0x359640,_0x55c41e,_0x34f43b){const _0x1d52a8=_0x5eb334;_0x55c41e=String(_0x55c41e||'')[_0x1d52a8(0x8d6)]();if(VisuMZ[_0x1d52a8(0x541)][_0x1d52a8(0x467)]['Param']['DrawIcons']){const _0x5a2a9a=VisuMZ[_0x1d52a8(0x84a)](_0x55c41e);_0x34f43b?(this[_0x1d52a8(0x462)](_0x5a2a9a,_0x50d700,_0xa2bfb5,this['gaugeLineHeight']()),_0x359640-=this[_0x1d52a8(0x6a1)]()+0x2,_0x50d700+=this[_0x1d52a8(0x6a1)]()+0x2):_0x1d52a8(0x8d2)!==_0x1d52a8(0x8d2)?(_0x57cfa2[_0x1d52a8(0x961)](),this[_0x1d52a8(0x3fc)]()):(this[_0x1d52a8(0x818)](_0x5a2a9a,_0x50d700+0x2,_0xa2bfb5+0x2),_0x359640-=ImageManager[_0x1d52a8(0x48e)]+0x4,_0x50d700+=ImageManager[_0x1d52a8(0x48e)]+0x4);}const _0x1cf294=TextManager[_0x1d52a8(0x947)](_0x55c41e);this[_0x1d52a8(0x43f)](),this['changeTextColor'](ColorManager[_0x1d52a8(0x73d)]());if(_0x34f43b)this[_0x1d52a8(0x2c9)][_0x1d52a8(0x803)]=this[_0x1d52a8(0x759)](),this[_0x1d52a8(0x2c9)][_0x1d52a8(0x42e)](_0x1cf294,_0x50d700,_0xa2bfb5,_0x359640,this[_0x1d52a8(0x6a1)](),_0x1d52a8(0x22f));else{if('bmjcZ'!==_0x1d52a8(0x642))this[_0x1d52a8(0x42e)](_0x1cf294,_0x50d700,_0xa2bfb5,_0x359640);else return _0x3f49f6[_0x1d52a8(0x885)][_0x1d52a8(0x4ae)]['call'](this);}this['resetFontSettings']();},Window_StatusBase[_0x5eb334(0x63b)][_0x5eb334(0x759)]=function(){const _0xc4db49=_0x5eb334;return $gameSystem[_0xc4db49(0x3b0)]()-0x8;},Window_StatusBase['prototype']['drawActorClass']=function(_0x45a1bb,_0x4ed846,_0x395a89,_0x4ee887){const _0x4c9933=_0x5eb334;_0x4ee887=_0x4ee887||0xa8,this[_0x4c9933(0x1f1)]();if(VisuMZ[_0x4c9933(0x541)][_0x4c9933(0x467)]['UI']['TextCodeClassNames'])this[_0x4c9933(0x4f3)](_0x45a1bb[_0x4c9933(0x881)]()[_0x4c9933(0x536)],_0x4ed846,_0x395a89,_0x4ee887);else{const _0x59c960=_0x45a1bb[_0x4c9933(0x881)]()[_0x4c9933(0x536)][_0x4c9933(0x551)](/\\I\[(\d+)\]/gi,'');this[_0x4c9933(0x42e)](_0x59c960,_0x4ed846,_0x395a89,_0x4ee887);}},Window_StatusBase[_0x5eb334(0x63b)][_0x5eb334(0x2de)]=function(_0x14370e,_0x256798,_0x420757,_0x3be767){const _0x5c723c=_0x5eb334;_0x3be767=_0x3be767||0x10e,this[_0x5c723c(0x1f1)]();if(VisuMZ[_0x5c723c(0x541)][_0x5c723c(0x467)]['UI'][_0x5c723c(0x932)])this[_0x5c723c(0x4f3)](_0x14370e[_0x5c723c(0x53c)](),_0x256798,_0x420757,_0x3be767);else{const _0x450353=_0x14370e[_0x5c723c(0x53c)]()[_0x5c723c(0x551)](/\\I\[(\d+)\]/gi,'');this[_0x5c723c(0x42e)](_0x14370e[_0x5c723c(0x53c)](),_0x256798,_0x420757,_0x3be767);}},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x296)]=Window_StatusBase[_0x5eb334(0x63b)][_0x5eb334(0x995)],Window_StatusBase[_0x5eb334(0x63b)][_0x5eb334(0x995)]=function(_0x330d6e,_0x218f16,_0x1059d1){const _0x265cdb=_0x5eb334;if(VisuMZ[_0x265cdb(0x541)][_0x265cdb(0x467)][_0x265cdb(0x6f3)][_0x265cdb(0x16f)]===![])return;if(this['isExpGaugeDrawn']())this['drawActorExpGauge'](_0x330d6e,_0x218f16,_0x1059d1);VisuMZ['CoreEngine'][_0x265cdb(0x296)][_0x265cdb(0x3e2)](this,_0x330d6e,_0x218f16,_0x1059d1);},Window_StatusBase['prototype'][_0x5eb334(0x49f)]=function(){const _0x2f0998=_0x5eb334;return VisuMZ[_0x2f0998(0x541)][_0x2f0998(0x467)]['UI'][_0x2f0998(0x6c0)];},Window_StatusBase[_0x5eb334(0x63b)][_0x5eb334(0x68c)]=function(_0x137e17,_0x51e067,_0x17885e){const _0x29dbc6=_0x5eb334;if(!_0x137e17)return;if(!_0x137e17['isActor']())return;const _0x4b8448=0x80,_0x530960=_0x137e17[_0x29dbc6(0x3ba)]();let _0x1df98b=ColorManager[_0x29dbc6(0x986)](),_0x46853=ColorManager['expGaugeColor2']();_0x530960>=0x1&&(_0x1df98b=ColorManager[_0x29dbc6(0x4ba)](),_0x46853=ColorManager[_0x29dbc6(0x443)]()),this[_0x29dbc6(0x6f9)](_0x51e067,_0x17885e,_0x4b8448,_0x530960,_0x1df98b,_0x46853);},Window_EquipStatus[_0x5eb334(0x63b)][_0x5eb334(0x4b8)]=function(){const _0x50a6a7=_0x5eb334;let _0x5a557c=0x0;for(const _0x2f66e2 of VisuMZ['CoreEngine'][_0x50a6a7(0x467)]['Param'][_0x50a6a7(0x864)]){if(_0x50a6a7(0x34a)===_0x50a6a7(0x34a)){const _0x1cb865=this[_0x50a6a7(0x675)](),_0x25d2cf=this[_0x50a6a7(0x826)](_0x5a557c);this['drawItem'](_0x1cb865,_0x25d2cf,_0x2f66e2),_0x5a557c++;}else _0xe4aef1[_0x50a6a7(0x96e)]()&&(_0x274626[_0x50a6a7(0x76e)](_0x50a6a7(0x8bb)),_0x3324a8['log'](_0x3ba28f));}},Window_EquipStatus[_0x5eb334(0x63b)][_0x5eb334(0x6b5)]=function(_0x1b1e92,_0xcf286a,_0x4555ac){const _0x58e28a=_0x5eb334,_0x1bf38b=this[_0x58e28a(0x6a7)]()-this[_0x58e28a(0x675)]()*0x2;this[_0x58e28a(0x7ba)](_0x1b1e92,_0xcf286a,_0x1bf38b,_0x4555ac,![]);},Window_EquipStatus[_0x5eb334(0x63b)][_0x5eb334(0x4ea)]=function(_0x34c879,_0x15632a,_0x6c2530){const _0x24fe9f=_0x5eb334,_0x15b011=this[_0x24fe9f(0x18f)]();this[_0x24fe9f(0x1f1)](),this[_0x24fe9f(0x42e)](this[_0x24fe9f(0x84b)]['paramValueByName'](_0x6c2530,!![]),_0x34c879,_0x15632a,_0x15b011,_0x24fe9f(0x3d8));},Window_EquipStatus[_0x5eb334(0x63b)][_0x5eb334(0x2af)]=function(_0x3fde14,_0x35b388){const _0x1688ae=_0x5eb334,_0x17d360=this[_0x1688ae(0x529)]();this[_0x1688ae(0x365)](ColorManager[_0x1688ae(0x73d)]());const _0x312fa3=VisuMZ['CoreEngine'][_0x1688ae(0x467)]['UI'][_0x1688ae(0x713)];this['drawText'](_0x312fa3,_0x3fde14,_0x35b388,_0x17d360,_0x1688ae(0x2d3));},Window_EquipStatus[_0x5eb334(0x63b)][_0x5eb334(0x31f)]=function(_0x2eb04c,_0x49920e,_0x444661){const _0x359c7f=_0x5eb334,_0x534482=this[_0x359c7f(0x18f)](),_0xf4fbc1=this[_0x359c7f(0x4f8)][_0x359c7f(0x1b2)](_0x444661),_0x238094=_0xf4fbc1-this['_actor']['paramValueByName'](_0x444661);this[_0x359c7f(0x365)](ColorManager[_0x359c7f(0x24a)](_0x238094)),this[_0x359c7f(0x42e)](this['_tempActor'][_0x359c7f(0x1b2)](_0x444661,!![]),_0x2eb04c,_0x49920e,_0x534482,_0x359c7f(0x3d8));},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x37b)]=Window_EquipItem[_0x5eb334(0x63b)][_0x5eb334(0x831)],Window_EquipItem[_0x5eb334(0x63b)][_0x5eb334(0x831)]=function(_0x3fa62c){const _0x588658=_0x5eb334;if(_0x3fa62c&&this[_0x588658(0x84b)])return this[_0x588658(0x84b)][_0x588658(0x594)](_0x3fa62c);else{if('ZtEBf'===_0x588658(0x535))_0x231a3b-=_0x28762d[_0x588658(0x63b)][_0x588658(0x217)]();else return VisuMZ[_0x588658(0x541)][_0x588658(0x37b)][_0x588658(0x3e2)](this,_0x3fa62c);}},Window_StatusParams[_0x5eb334(0x63b)][_0x5eb334(0x2ee)]=function(){const _0x2d2c20=_0x5eb334;return VisuMZ[_0x2d2c20(0x541)][_0x2d2c20(0x467)][_0x2d2c20(0x6f3)][_0x2d2c20(0x864)]['length'];},Window_StatusParams['prototype'][_0x5eb334(0x51e)]=function(_0x520332){const _0x3b2248=_0x5eb334,_0x5a7b0b=this[_0x3b2248(0x904)](_0x520332),_0x15bd75=VisuMZ[_0x3b2248(0x541)]['Settings'][_0x3b2248(0x6f3)][_0x3b2248(0x864)][_0x520332],_0x587270=TextManager[_0x3b2248(0x947)](_0x15bd75),_0x4d0636=this[_0x3b2248(0x84b)]['paramValueByName'](_0x15bd75,!![]);this[_0x3b2248(0x7ba)](_0x5a7b0b['x'],_0x5a7b0b['y'],0xa0,_0x15bd75,![]),this[_0x3b2248(0x1f1)](),this[_0x3b2248(0x42e)](_0x4d0636,_0x5a7b0b['x']+0xa0,_0x5a7b0b['y'],0x3c,'right');};if(VisuMZ['CoreEngine'][_0x5eb334(0x467)][_0x5eb334(0x2ba)]['EnableNameInput']){VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)]['KeyboardInput'][_0x5eb334(0x801)]&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x5eb334(0x624),'OK']);;VisuMZ['CoreEngine']['Window_NameInput_initialize']=Window_NameInput[_0x5eb334(0x63b)][_0x5eb334(0x1e1)],Window_NameInput[_0x5eb334(0x63b)][_0x5eb334(0x1e1)]=function(_0x54aaa3){const _0x52f20e=_0x5eb334;this['_mode']=this['defaultInputMode'](),VisuMZ[_0x52f20e(0x541)]['Window_NameInput_initialize'][_0x52f20e(0x3e2)](this,_0x54aaa3),this[_0x52f20e(0x762)]===_0x52f20e(0x1dc)?this['select'](0x0):'NUeSD'!==_0x52f20e(0x259)?!_0x376418[_0x52f20e(0x431)]()&&!this['_playtestF7Looping']&&!_0x47023b[_0x52f20e(0x292)]()&&(this[_0x52f20e(0x3f0)]=!![],this[_0x52f20e(0x3c4)](),_0x2f15c7[_0x52f20e(0x22c)](),this[_0x52f20e(0x3f0)]=![]):(Input[_0x52f20e(0x961)](),this[_0x52f20e(0x74d)]());},Window_NameInput[_0x5eb334(0x63b)][_0x5eb334(0x838)]=function(){const _0xe22e8f=_0x5eb334;if(Input['isGamepadConnected']())return _0xe22e8f(0x1dc);return VisuMZ[_0xe22e8f(0x541)][_0xe22e8f(0x467)][_0xe22e8f(0x2ba)][_0xe22e8f(0x35f)]||_0xe22e8f(0x6ba);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x330)]=Window_NameInput['prototype'][_0x5eb334(0x1c8)],Window_NameInput[_0x5eb334(0x63b)][_0x5eb334(0x1c8)]=function(){const _0x279e78=_0x5eb334;if(!this[_0x279e78(0x47c)]())return;if(!this[_0x279e78(0x68f)])return;if(this[_0x279e78(0x762)]===_0x279e78(0x6ba)&&Input[_0x279e78(0x77d)]())_0x279e78(0x1ba)===_0x279e78(0x283)?(this['_backSprite1']=new _0x25cb42(_0x1c8bd5[_0x279e78(0x610)](_0x43debf[_0x279e78(0x976)])),this['_backSprite2']=new _0x123a76(_0x172c59[_0x279e78(0x265)](_0x45d04b[_0x279e78(0x52e)])),this[_0x279e78(0x569)](this[_0x279e78(0x9aa)]),this[_0x279e78(0x569)](this[_0x279e78(0x632)]),this[_0x279e78(0x9aa)][_0x279e78(0x83b)][_0x279e78(0x98f)](this[_0x279e78(0x2f2)][_0x279e78(0x1fa)](this,this['_backSprite1'])),this[_0x279e78(0x632)]['bitmap'][_0x279e78(0x98f)](this[_0x279e78(0x2f2)]['bind'](this,this[_0x279e78(0x632)]))):this[_0x279e78(0x93c)](_0x279e78(0x1dc));else{if(Input[_0x279e78(0x597)](_0x279e78(0x5c8)))Input[_0x279e78(0x961)](),this[_0x279e78(0x3fc)]();else{if(Input[_0x279e78(0x209)]('tab'))_0x279e78(0x2ce)===_0x279e78(0x8f4)?this[_0x279e78(0x29c)]():(Input[_0x279e78(0x961)](),this[_0x279e78(0x762)]==='keyboard'?this[_0x279e78(0x93c)](_0x279e78(0x1dc)):this[_0x279e78(0x93c)](_0x279e78(0x6ba)));else{if(this[_0x279e78(0x762)]===_0x279e78(0x6ba))this[_0x279e78(0x899)]();else Input['isSpecialCode'](_0x279e78(0x539))?(Input[_0x279e78(0x961)](),this['switchModes'](_0x279e78(0x6ba))):VisuMZ[_0x279e78(0x541)][_0x279e78(0x330)][_0x279e78(0x3e2)](this);}}}},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x8da)]=Window_NameInput[_0x5eb334(0x63b)][_0x5eb334(0x42f)],Window_NameInput[_0x5eb334(0x63b)]['processTouch']=function(){const _0x3d8dfa=_0x5eb334;if(!this[_0x3d8dfa(0x7f5)]())return;if(this[_0x3d8dfa(0x762)]===_0x3d8dfa(0x6ba)){if(_0x3d8dfa(0x680)===_0x3d8dfa(0x5f1)){let _0x24bba7=_0x5f3930['createTroopNote'](_0x3e816f['id']);this[_0x3d8dfa(0x66c)](_0x24bba7);}else{if(TouchInput[_0x3d8dfa(0x209)]()&&this['isTouchedInsideFrame']())this[_0x3d8dfa(0x93c)]('default');else TouchInput['isCancelled']()&&this['switchModes'](_0x3d8dfa(0x1dc));}}else VisuMZ['CoreEngine'][_0x3d8dfa(0x8da)]['call'](this);},Window_NameInput['prototype'][_0x5eb334(0x899)]=function(){const _0x1b6263=_0x5eb334;if(Input[_0x1b6263(0x597)]('enter'))'LJoIz'===_0x1b6263(0x752)?(Input['clear'](),this[_0x1b6263(0x95e)]()):_0x4c83d6=this['mainAreaHeightSideButtonLayout']();else{if(Input[_0x1b6263(0x687)]!==undefined){let _0x4f11c8=Input[_0x1b6263(0x687)],_0x2709b2=_0x4f11c8[_0x1b6263(0x61b)];for(let _0xa17ef4=0x0;_0xa17ef4<_0x2709b2;++_0xa17ef4){if(_0x1b6263(0x68d)!==_0x1b6263(0x92c)){if(this['_editWindow']['add'](_0x4f11c8[_0xa17ef4])){if('xLJKO'===_0x1b6263(0x32a)){_0x5dc93f['ConvertParams'](_0x1b8a42,_0x13ee7a);const _0x329c03=_0x4e4f2f[_0x1b6263(0x934)]||0x1;_0x191776[_0x1b6263(0x95d)](_0x329c03);}else SoundManager[_0x1b6263(0x6a6)]();}else SoundManager[_0x1b6263(0x703)]();}else{var _0x3fe54b=_0xe7abf4(_0x1a3ae9['$1'])/0x64;_0x2f49dc+=_0x3fe54b;}}Input[_0x1b6263(0x961)]();}}},Window_NameInput[_0x5eb334(0x63b)][_0x5eb334(0x93c)]=function(_0x302c9f){const _0x2084d7=_0x5eb334;let _0xc43547=this[_0x2084d7(0x762)];this['_mode']=_0x302c9f,_0xc43547!==this[_0x2084d7(0x762)]&&(this[_0x2084d7(0x4a7)](),SoundManager[_0x2084d7(0x6a6)](),this['_mode']==='default'?this[_0x2084d7(0x8b3)](0x0):this[_0x2084d7(0x8b3)](-0x1));},VisuMZ['CoreEngine']['Window_NameInput_cursorDown']=Window_NameInput['prototype'][_0x5eb334(0x2b9)],Window_NameInput[_0x5eb334(0x63b)]['cursorDown']=function(_0x5c2d4e){const _0x4f6976=_0x5eb334;if(this[_0x4f6976(0x762)]===_0x4f6976(0x6ba)&&!Input['isArrowPressed']())return;if(Input[_0x4f6976(0x9af)]())return;VisuMZ[_0x4f6976(0x541)]['Window_NameInput_cursorDown'][_0x4f6976(0x3e2)](this,_0x5c2d4e),this[_0x4f6976(0x93c)](_0x4f6976(0x1dc));},VisuMZ[_0x5eb334(0x541)]['Window_NameInput_cursorUp']=Window_NameInput[_0x5eb334(0x63b)]['cursorUp'],Window_NameInput['prototype'][_0x5eb334(0x49b)]=function(_0x177dab){const _0x5b98fd=_0x5eb334;if(this[_0x5b98fd(0x762)]==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0x5b98fd(0x9af)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorUp'][_0x5b98fd(0x3e2)](this,_0x177dab),this[_0x5b98fd(0x93c)](_0x5b98fd(0x1dc));},VisuMZ['CoreEngine'][_0x5eb334(0x19a)]=Window_NameInput[_0x5eb334(0x63b)]['cursorRight'],Window_NameInput[_0x5eb334(0x63b)]['cursorRight']=function(_0x576338){const _0x2c662f=_0x5eb334;if(this['_mode']===_0x2c662f(0x6ba)&&!Input['isArrowPressed']())return;if(Input[_0x2c662f(0x9af)]())return;VisuMZ[_0x2c662f(0x541)][_0x2c662f(0x19a)][_0x2c662f(0x3e2)](this,_0x576338),this['switchModes'](_0x2c662f(0x1dc));},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x756)]=Window_NameInput[_0x5eb334(0x63b)][_0x5eb334(0x314)],Window_NameInput[_0x5eb334(0x63b)][_0x5eb334(0x314)]=function(_0x1d2506){const _0x1d05eb=_0x5eb334;if(this[_0x1d05eb(0x762)]===_0x1d05eb(0x6ba)&&!Input['isArrowPressed']())return;if(Input[_0x1d05eb(0x9af)]())return;VisuMZ[_0x1d05eb(0x541)][_0x1d05eb(0x756)]['call'](this,_0x1d2506),this[_0x1d05eb(0x93c)]('default');},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x6b1)]=Window_NameInput[_0x5eb334(0x63b)][_0x5eb334(0x2cd)],Window_NameInput[_0x5eb334(0x63b)][_0x5eb334(0x2cd)]=function(){const _0x10c142=_0x5eb334;if(this[_0x10c142(0x762)]===_0x10c142(0x6ba))return;if(Input[_0x10c142(0x9af)]())return;VisuMZ[_0x10c142(0x541)][_0x10c142(0x6b1)]['call'](this),this[_0x10c142(0x93c)](_0x10c142(0x1dc));},VisuMZ['CoreEngine']['Window_NameInput_cursorPageup']=Window_NameInput[_0x5eb334(0x63b)][_0x5eb334(0x4c1)],Window_NameInput[_0x5eb334(0x63b)][_0x5eb334(0x4c1)]=function(){const _0x508fbf=_0x5eb334;if(this[_0x508fbf(0x762)]==='keyboard')return;if(Input[_0x508fbf(0x9af)]())return;VisuMZ['CoreEngine'][_0x508fbf(0x42a)]['call'](this),this[_0x508fbf(0x93c)](_0x508fbf(0x1dc));},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x656)]=Window_NameInput[_0x5eb334(0x63b)]['refresh'],Window_NameInput[_0x5eb334(0x63b)][_0x5eb334(0x4a7)]=function(){const _0x3811df=_0x5eb334;if(this[_0x3811df(0x762)]===_0x3811df(0x6ba)){if(_0x3811df(0x9b3)!==_0x3811df(0x6cf)){this[_0x3811df(0x2c9)][_0x3811df(0x961)](),this[_0x3811df(0x796)][_0x3811df(0x961)](),this[_0x3811df(0x1f1)]();let _0x45a2e4=VisuMZ[_0x3811df(0x541)][_0x3811df(0x467)][_0x3811df(0x2ba)]['NameInputMessage'][_0x3811df(0x82e)]('\x0a'),_0x51cf22=_0x45a2e4['length'],_0xa37d23=(this[_0x3811df(0x2b4)]-_0x51cf22*this[_0x3811df(0x217)]())/0x2;for(let _0x512355=0x0;_0x512355<_0x51cf22;++_0x512355){if('dlGhm'!==_0x3811df(0x66e)){let _0x10bf28=_0x45a2e4[_0x512355],_0x59cfaf=this[_0x3811df(0x46f)](_0x10bf28)['width'],_0x292737=Math[_0x3811df(0x7fd)]((this[_0x3811df(0x2c9)]['width']-_0x59cfaf)/0x2);this[_0x3811df(0x4f3)](_0x10bf28,_0x292737,_0xa37d23),_0xa37d23+=this[_0x3811df(0x217)]();}else _0x5e6a24[_0x3811df(0x209)](_0x3811df(0x7d0))&&(_0x337ab7[_0x3811df(0x132)]=!_0x26ce88['alwaysDash'],_0x21243b[_0x3811df(0x5b6)]());}}else return![];}else{if('toeUt'!==_0x3811df(0x5a4))VisuMZ[_0x3811df(0x541)]['Window_NameInput_refresh'][_0x3811df(0x3e2)](this);else return _0x4ca6d7[_0x3811df(0x885)][_0x3811df(0x204)]['call'](this);}};};VisuMZ['CoreEngine'][_0x5eb334(0x3f7)]=Window_ShopSell[_0x5eb334(0x63b)][_0x5eb334(0x831)],Window_ShopSell['prototype']['isEnabled']=function(_0x1ee1df){const _0x13552c=_0x5eb334;return VisuMZ[_0x13552c(0x541)]['Settings']['QoL'][_0x13552c(0x2e8)]&&DataManager[_0x13552c(0x39c)](_0x1ee1df)?![]:VisuMZ['CoreEngine'][_0x13552c(0x3f7)][_0x13552c(0x3e2)](this,_0x1ee1df);},Window_NumberInput['prototype']['isUseModernControls']=function(){return![];};VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)][_0x5eb334(0x2ba)][_0x5eb334(0x9ac)]&&(VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x226)]=Window_NumberInput[_0x5eb334(0x63b)]['start'],Window_NumberInput[_0x5eb334(0x63b)][_0x5eb334(0x8a8)]=function(){const _0x425692=_0x5eb334;VisuMZ[_0x425692(0x541)][_0x425692(0x226)][_0x425692(0x3e2)](this),this['select'](this[_0x425692(0x748)]-0x1),Input[_0x425692(0x961)]();},VisuMZ['CoreEngine'][_0x5eb334(0x3b2)]=Window_NumberInput[_0x5eb334(0x63b)][_0x5eb334(0x625)],Window_NumberInput[_0x5eb334(0x63b)][_0x5eb334(0x625)]=function(){const _0x24fc9e=_0x5eb334;if(!this[_0x24fc9e(0x7f5)]())return;if(Input[_0x24fc9e(0x9af)]())this['processKeyboardDigitChange']();else{if(Input[_0x24fc9e(0x597)](_0x24fc9e(0x5c8)))_0x24fc9e(0x96c)!==_0x24fc9e(0x96c)?(_0x44b953['log'](_0x24fc9e(0x79d)),_0x51cf03['log'](_0x1659ab)):this[_0x24fc9e(0x140)]();else{if(Input[_0x24fc9e(0x133)]===0x2e)this[_0x24fc9e(0x5cd)]();else{if(Input[_0x24fc9e(0x133)]===0x24)_0x24fc9e(0x205)==='tQBFX'?(_0x221d64(_0x24fc9e(0x7bb)[_0x24fc9e(0x1ce)](_0x2eb3e2,_0x3d493d,_0x374355)),_0x3619ef[_0x24fc9e(0x40c)]()):this[_0x24fc9e(0x938)]();else Input[_0x24fc9e(0x133)]===0x23?'tpGFw'===_0x24fc9e(0x578)?this['processKeyboardEnd']():this[_0x24fc9e(0x80a)]&&this['_optionsWindow']['setBackgroundType'](_0x5b2aab['layoutSettings'][_0x24fc9e(0x717)]):VisuMZ['CoreEngine'][_0x24fc9e(0x3b2)][_0x24fc9e(0x3e2)](this);}}}},Window_NumberInput[_0x5eb334(0x63b)][_0x5eb334(0x2b2)]=function(){const _0x827056=_0x5eb334;if(!this[_0x827056(0x68a)]())return;Input[_0x827056(0x9af)]()?this[_0x827056(0x870)]():Window_Selectable['prototype'][_0x827056(0x2b2)][_0x827056(0x3e2)](this);},Window_NumberInput[_0x5eb334(0x63b)][_0x5eb334(0x391)]=function(){},Window_NumberInput[_0x5eb334(0x63b)][_0x5eb334(0x870)]=function(){const _0xb96892=_0x5eb334;if(String(this[_0xb96892(0x4f6)])[_0xb96892(0x61b)]>=this['_maxDigits'])return;const _0x24f1e6=Number(String(this['_number'])+Input[_0xb96892(0x687)]);if(isNaN(_0x24f1e6))return;this['_number']=_0x24f1e6;const _0x46d9c2='9'['repeat'](this[_0xb96892(0x748)]);this[_0xb96892(0x4f6)]=this[_0xb96892(0x4f6)][_0xb96892(0x84f)](0x0,_0x46d9c2),Input[_0xb96892(0x961)](),this[_0xb96892(0x4a7)](),SoundManager['playCursor'](),this[_0xb96892(0x8b3)](this[_0xb96892(0x748)]-0x1);},Window_NumberInput[_0x5eb334(0x63b)][_0x5eb334(0x140)]=function(){const _0x1434e6=_0x5eb334;this[_0x1434e6(0x4f6)]=Number(String(this['_number'])[_0x1434e6(0x646)](0x0,-0x1)),this[_0x1434e6(0x4f6)]=Math[_0x1434e6(0x852)](0x0,this[_0x1434e6(0x4f6)]),Input[_0x1434e6(0x961)](),this[_0x1434e6(0x4a7)](),SoundManager[_0x1434e6(0x6d9)](),this[_0x1434e6(0x8b3)](this['_maxDigits']-0x1);},Window_NumberInput[_0x5eb334(0x63b)][_0x5eb334(0x5cd)]=function(){const _0x160767=_0x5eb334;this['_number']=Number(String(this['_number'])[_0x160767(0x7b4)](0x1)),this[_0x160767(0x4f6)]=Math[_0x160767(0x852)](0x0,this[_0x160767(0x4f6)]),Input[_0x160767(0x961)](),this[_0x160767(0x4a7)](),SoundManager[_0x160767(0x6d9)](),this[_0x160767(0x8b3)](this[_0x160767(0x748)]-0x1);},Window_NumberInput['prototype'][_0x5eb334(0x938)]=function(){const _0xead634=_0x5eb334;if(this['index']()===0x0)return;Input[_0xead634(0x961)](),this[_0xead634(0x4a7)](),SoundManager[_0xead634(0x6d9)](),this['select'](0x0);},Window_NumberInput[_0x5eb334(0x63b)][_0x5eb334(0x61d)]=function(){const _0x78ef4b=_0x5eb334;if(this[_0x78ef4b(0x5f3)]()===this[_0x78ef4b(0x748)]-0x1)return;Input[_0x78ef4b(0x961)](),this[_0x78ef4b(0x4a7)](),SoundManager[_0x78ef4b(0x6d9)](),this['select'](this[_0x78ef4b(0x748)]-0x1);});;VisuMZ[_0x5eb334(0x541)]['Window_MapName_refresh']=Window_MapName[_0x5eb334(0x63b)][_0x5eb334(0x4a7)],Window_MapName[_0x5eb334(0x63b)][_0x5eb334(0x4a7)]=function(){const _0x7c802=_0x5eb334;VisuMZ['CoreEngine'][_0x7c802(0x467)]['QoL'][_0x7c802(0x903)]?this[_0x7c802(0x74a)]():VisuMZ[_0x7c802(0x541)]['Window_MapName_refresh'][_0x7c802(0x3e2)](this);},Window_MapName[_0x5eb334(0x63b)][_0x5eb334(0x74a)]=function(){const _0x191bc0=_0x5eb334;this[_0x191bc0(0x2c9)][_0x191bc0(0x961)]();if($gameMap[_0x191bc0(0x562)]()){const _0x7fcbb2=this[_0x191bc0(0x8fe)];this[_0x191bc0(0x243)](0x0,0x0,_0x7fcbb2,this[_0x191bc0(0x217)]());const _0x41bc6e=this[_0x191bc0(0x46f)]($gameMap[_0x191bc0(0x562)]())[_0x191bc0(0x21a)];this[_0x191bc0(0x4f3)]($gameMap[_0x191bc0(0x562)](),Math[_0x191bc0(0x7fd)]((_0x7fcbb2-_0x41bc6e)/0x2),0x0);}},Window_TitleCommand[_0x5eb334(0x5ea)]=VisuMZ[_0x5eb334(0x541)]['Settings'][_0x5eb334(0x220)],Window_TitleCommand[_0x5eb334(0x63b)][_0x5eb334(0x54d)]=function(){const _0x17c493=_0x5eb334;this[_0x17c493(0x25f)]();},Window_TitleCommand['prototype'][_0x5eb334(0x25f)]=function(){const _0x5025c8=_0x5eb334;for(const _0x2eacb2 of Window_TitleCommand['_commandList']){if(_0x2eacb2[_0x5025c8(0x249)][_0x5025c8(0x3e2)](this)){if('jkzZJ'!==_0x5025c8(0x2c5)){const _0x378f3f=_0x2eacb2[_0x5025c8(0x254)];let _0x188a39=_0x2eacb2['TextStr'];if(['','Untitled'][_0x5025c8(0x8c8)](_0x188a39))_0x188a39=_0x2eacb2[_0x5025c8(0x7f3)]['call'](this);const _0x4fdef4=_0x2eacb2['EnableJS'][_0x5025c8(0x3e2)](this),_0x31d7bc=_0x2eacb2[_0x5025c8(0x3a5)][_0x5025c8(0x3e2)](this);this['addCommand'](_0x188a39,_0x378f3f,_0x4fdef4,_0x31d7bc),this[_0x5025c8(0x2ff)](_0x378f3f,_0x2eacb2[_0x5025c8(0x5fd)][_0x5025c8(0x1fa)](this,_0x31d7bc));}else{_0x451d79=_0x57222e||0xa8,this['resetTextColor']();if(_0x274317[_0x5025c8(0x541)][_0x5025c8(0x467)]['UI'][_0x5025c8(0x395)])this[_0x5025c8(0x4f3)](_0x31265b['currentClass']()[_0x5025c8(0x536)],_0x50b3fc,_0x1923e5,_0x2ce255);else{const _0x2614ed=_0x294464[_0x5025c8(0x881)]()[_0x5025c8(0x536)][_0x5025c8(0x551)](/\\I\[(\d+)\]/gi,'');this[_0x5025c8(0x42e)](_0x2614ed,_0x430309,_0x1b183d,_0x58ef9c);}}}}},Window_GameEnd[_0x5eb334(0x5ea)]=VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x467)][_0x5eb334(0x89a)]['GameEnd'][_0x5eb334(0x8b7)],Window_GameEnd[_0x5eb334(0x63b)][_0x5eb334(0x54d)]=function(){const _0xae587b=_0x5eb334;this[_0xae587b(0x25f)]();},Window_GameEnd[_0x5eb334(0x63b)]['makeCoreEngineCommandList']=function(){const _0x4f9fec=_0x5eb334;for(const _0x298c9d of Window_GameEnd[_0x4f9fec(0x5ea)]){if(_0x298c9d[_0x4f9fec(0x249)][_0x4f9fec(0x3e2)](this)){const _0x3a8231=_0x298c9d[_0x4f9fec(0x254)];let _0xfb48a5=_0x298c9d[_0x4f9fec(0x131)];if(['',_0x4f9fec(0x7bd)]['includes'](_0xfb48a5))_0xfb48a5=_0x298c9d[_0x4f9fec(0x7f3)][_0x4f9fec(0x3e2)](this);const _0xf36500=_0x298c9d['EnableJS']['call'](this),_0x4bc509=_0x298c9d[_0x4f9fec(0x3a5)]['call'](this);this[_0x4f9fec(0x863)](_0xfb48a5,_0x3a8231,_0xf36500,_0x4bc509),this[_0x4f9fec(0x2ff)](_0x3a8231,_0x298c9d[_0x4f9fec(0x5fd)][_0x4f9fec(0x1fa)](this,_0x4bc509));}}};function Window_ButtonAssist(){const _0xfb637a=_0x5eb334;this[_0xfb637a(0x1e1)](...arguments);}Window_ButtonAssist['prototype']=Object['create'](Window_Base['prototype']),Window_ButtonAssist[_0x5eb334(0x63b)][_0x5eb334(0x62a)]=Window_ButtonAssist,Window_ButtonAssist[_0x5eb334(0x63b)][_0x5eb334(0x1e1)]=function(_0x46712b){const _0x55b278=_0x5eb334;this['_data']={},Window_Base[_0x55b278(0x63b)]['initialize']['call'](this,_0x46712b),this['setBackgroundType'](VisuMZ[_0x55b278(0x541)][_0x55b278(0x467)][_0x55b278(0x755)][_0x55b278(0x256)]||0x0),this[_0x55b278(0x4a7)]();},Window_ButtonAssist['prototype'][_0x5eb334(0x767)]=function(){const _0x5a45bb=_0x5eb334;this[_0x5a45bb(0x2c9)][_0x5a45bb(0x803)]<=0x60&&('oltfc'!=='WYYOP'?this['contents'][_0x5a45bb(0x803)]+=0x6:_0x387161=_0x5a45bb(0x386)[_0x5a45bb(0x1ce)](_0x4961f1,_0x40965d));},Window_ButtonAssist['prototype'][_0x5eb334(0x4e7)]=function(){const _0x45ebfb=_0x5eb334;this['contents'][_0x45ebfb(0x803)]>=0x18&&(this[_0x45ebfb(0x2c9)][_0x45ebfb(0x803)]-=0x6);},Window_ButtonAssist[_0x5eb334(0x63b)]['update']=function(){const _0x227d02=_0x5eb334;Window_Base[_0x227d02(0x63b)]['update'][_0x227d02(0x3e2)](this),this[_0x227d02(0x4f5)]();},Window_ButtonAssist[_0x5eb334(0x63b)][_0x5eb334(0x51a)]=function(){const _0x594fd0=_0x5eb334;this[_0x594fd0(0x321)]=SceneManager[_0x594fd0(0x984)][_0x594fd0(0x8f0)]()!=='button'?0x0:0x8;},Window_ButtonAssist[_0x5eb334(0x63b)]['updateKeyText']=function(){const _0x513e02=_0x5eb334,_0x3ce19d=SceneManager[_0x513e02(0x984)];for(let _0x1c0693=0x1;_0x1c0693<=0x5;_0x1c0693++){if(this[_0x513e02(0x50f)]['key%1'['format'](_0x1c0693)]!==_0x3ce19d[_0x513e02(0x2fb)['format'](_0x1c0693)]())return this[_0x513e02(0x4a7)]();if(this['_data'][_0x513e02(0x471)[_0x513e02(0x1ce)](_0x1c0693)]!==_0x3ce19d[_0x513e02(0x1bf)[_0x513e02(0x1ce)](_0x1c0693)]())return'VuJzs'===_0x513e02(0x413)?_0x51babb[_0x513e02(0x885)][_0x513e02(0x91c)][_0x513e02(0x3e2)](this):this['refresh']();}},Window_ButtonAssist['prototype'][_0x5eb334(0x4a7)]=function(){const _0x29d8c0=_0x5eb334;this['contents'][_0x29d8c0(0x961)]();for(let _0x49024b=0x1;_0x49024b<=0x5;_0x49024b++){if(_0x29d8c0(0x1ef)!==_0x29d8c0(0x8f2))this[_0x29d8c0(0x896)](_0x49024b);else{if(this['_data'][_0x29d8c0(0x694)[_0x29d8c0(0x1ce)](_0x1fc9f9)]!==_0x41eb38[_0x29d8c0(0x2fb)[_0x29d8c0(0x1ce)](_0x170c4d)]())return this[_0x29d8c0(0x4a7)]();if(this[_0x29d8c0(0x50f)]['text%1'[_0x29d8c0(0x1ce)](_0x6ab307)]!==_0x350e39[_0x29d8c0(0x1bf)[_0x29d8c0(0x1ce)](_0x2bc4ed)]())return this[_0x29d8c0(0x4a7)]();}}},Window_ButtonAssist['prototype'][_0x5eb334(0x896)]=function(_0x5a1d97){const _0x4668d8=_0x5eb334,_0x35eaf2=this[_0x4668d8(0x8fe)]/0x5,_0x13dc24=SceneManager[_0x4668d8(0x984)],_0x50c5ff=_0x13dc24['buttonAssistKey%1'[_0x4668d8(0x1ce)](_0x5a1d97)](),_0x2d70bf=_0x13dc24['buttonAssistText%1'['format'](_0x5a1d97)]();this[_0x4668d8(0x50f)][_0x4668d8(0x694)[_0x4668d8(0x1ce)](_0x5a1d97)]=_0x50c5ff,this['_data'][_0x4668d8(0x471)[_0x4668d8(0x1ce)](_0x5a1d97)]=_0x2d70bf;if(_0x50c5ff==='')return;if(_0x2d70bf==='')return;const _0x879f7a=_0x13dc24[_0x4668d8(0x8ec)['format'](_0x5a1d97)](),_0x5019b0=this[_0x4668d8(0x675)](),_0x4d9d2a=_0x35eaf2*(_0x5a1d97-0x1)+_0x5019b0+_0x879f7a,_0x4cb6ee=VisuMZ[_0x4668d8(0x541)][_0x4668d8(0x467)][_0x4668d8(0x755)]['TextFmt'];this['drawTextEx'](_0x4cb6ee[_0x4668d8(0x1ce)](_0x50c5ff,_0x2d70bf),_0x4d9d2a,0x0,_0x35eaf2-_0x5019b0*0x2);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x3e7)]=Game_Interpreter['prototype'][_0x5eb334(0x2a9)],Game_Interpreter[_0x5eb334(0x63b)]['updateWaitMode']=function(){const _0x18fa6a=_0x5eb334;if($gameTemp[_0x18fa6a(0x685)]!==undefined)return VisuMZ[_0x18fa6a(0x541)]['UpdatePictureCoordinates']();return VisuMZ['CoreEngine'][_0x18fa6a(0x3e7)][_0x18fa6a(0x3e2)](this);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x3f3)]=function(){const _0x13a34=_0x5eb334,_0x203ebe=$gameTemp[_0x13a34(0x685)]||0x0;(_0x203ebe<0x0||_0x203ebe>0x64||TouchInput[_0x13a34(0x98e)]()||Input[_0x13a34(0x209)]('cancel'))&&($gameTemp[_0x13a34(0x685)]=undefined,Input[_0x13a34(0x961)](),TouchInput[_0x13a34(0x961)]());const _0x1efc4c=$gameScreen['picture'](_0x203ebe);return _0x1efc4c&&(_0x13a34(0x5ef)===_0x13a34(0x595)?this[_0x13a34(0x280)]={'SideView':_0x59f53a[_0x13a34(0x4db)],'BattleSystem':this[_0x13a34(0x41a)](),'FontSize':_0x2fad8d[_0x13a34(0x965)][_0x13a34(0x803)],'Padding':0xc}:(_0x1efc4c['_x']=TouchInput['_x'],_0x1efc4c['_y']=TouchInput['_y'])),VisuMZ[_0x13a34(0x541)][_0x13a34(0x12c)](),$gameTemp[_0x13a34(0x685)]!==undefined;},VisuMZ[_0x5eb334(0x541)]['updatePictureCoordinates']=function(){const _0x25e367=_0x5eb334,_0x1b2108=SceneManager[_0x25e367(0x984)];if(!_0x1b2108)return;!_0x1b2108[_0x25e367(0x339)]&&(SoundManager[_0x25e367(0x4b4)](),_0x1b2108[_0x25e367(0x339)]=new Window_PictureCoordinates(),_0x1b2108[_0x25e367(0x569)](_0x1b2108[_0x25e367(0x339)])),$gameTemp[_0x25e367(0x685)]===undefined&&(SoundManager[_0x25e367(0x33e)](),_0x1b2108[_0x25e367(0x492)](_0x1b2108[_0x25e367(0x339)]),_0x1b2108[_0x25e367(0x339)]=undefined);};function Window_PictureCoordinates(){const _0x10d95c=_0x5eb334;this[_0x10d95c(0x1e1)](...arguments);}Window_PictureCoordinates[_0x5eb334(0x63b)]=Object[_0x5eb334(0x6f8)](Window_Base[_0x5eb334(0x63b)]),Window_PictureCoordinates[_0x5eb334(0x63b)]['constructor']=Window_PictureCoordinates,Window_PictureCoordinates['prototype'][_0x5eb334(0x1e1)]=function(){const _0xaf4f40=_0x5eb334;this[_0xaf4f40(0x598)]=_0xaf4f40(0x40a),this['_lastX']=_0xaf4f40(0x40a),this['_lastY']=_0xaf4f40(0x40a);const _0x4c68aa=this[_0xaf4f40(0x669)]();Window_Base[_0xaf4f40(0x63b)][_0xaf4f40(0x1e1)][_0xaf4f40(0x3e2)](this,_0x4c68aa),this['setBackgroundType'](0x2);},Window_PictureCoordinates[_0x5eb334(0x63b)]['windowRect']=function(){const _0x6ee994=_0x5eb334;let _0x2a4ff5=0x0,_0x21f6ce=Graphics['height']-this[_0x6ee994(0x217)](),_0x413b4b=Graphics['width'],_0x245aca=this['lineHeight']();return new Rectangle(_0x2a4ff5,_0x21f6ce,_0x413b4b,_0x245aca);},Window_PictureCoordinates[_0x5eb334(0x63b)]['updatePadding']=function(){const _0x2e072b=_0x5eb334;this[_0x2e072b(0x321)]=0x0;},Window_PictureCoordinates['prototype'][_0x5eb334(0x3c4)]=function(){const _0x43b7a2=_0x5eb334;Window_Base[_0x43b7a2(0x63b)]['update'][_0x43b7a2(0x3e2)](this),this[_0x43b7a2(0x69f)]();},Window_PictureCoordinates[_0x5eb334(0x63b)][_0x5eb334(0x69f)]=function(){if(!this['needsUpdate']())return;this['refresh']();},Window_PictureCoordinates[_0x5eb334(0x63b)]['needsUpdate']=function(){const _0x20f310=_0x5eb334,_0x2d86f6=$gameTemp['_pictureCoordinatesMode'],_0x4985f4=$gameScreen[_0x20f310(0x958)](_0x2d86f6);if(_0x4985f4)return this[_0x20f310(0x598)]!==_0x4985f4['_origin']||this['_lastX']!==_0x4985f4['_x']||this['_lastY']!==_0x4985f4['_y'];else{if(_0x20f310(0x974)===_0x20f310(0x738)){if(_0x19aea4[_0x1f524b]['pressed'])return!![];}else return![];}},Window_PictureCoordinates['prototype']['refresh']=function(){const _0x15aba7=_0x5eb334;this[_0x15aba7(0x2c9)][_0x15aba7(0x961)]();const _0x4b01dd=$gameTemp['_pictureCoordinatesMode'],_0x562f7a=$gameScreen[_0x15aba7(0x958)](_0x4b01dd);if(!_0x562f7a)return;this[_0x15aba7(0x598)]=_0x562f7a[_0x15aba7(0x2fc)],this[_0x15aba7(0x2dd)]=_0x562f7a['_x'],this[_0x15aba7(0x6bb)]=_0x562f7a['_y'];const _0x2adf45=ColorManager['itemBackColor1']();this['contents'][_0x15aba7(0x808)](0x0,0x0,this[_0x15aba7(0x8fe)],this[_0x15aba7(0x2b4)],_0x2adf45);const _0x3d0a5f='\x20Origin:\x20%1'[_0x15aba7(0x1ce)](_0x562f7a[_0x15aba7(0x2fc)]===0x0?_0x15aba7(0x408):_0x15aba7(0x97d)),_0x44d8ed=_0x15aba7(0x260)[_0x15aba7(0x1ce)](_0x562f7a['_x']),_0x238c71='Y:\x20%1'[_0x15aba7(0x1ce)](_0x562f7a['_y']),_0x58bae7=_0x15aba7(0x137)[_0x15aba7(0x1ce)](TextManager[_0x15aba7(0x273)](_0x15aba7(0x430)));let _0x4bed06=Math[_0x15aba7(0x7fd)](this[_0x15aba7(0x8fe)]/0x4);this[_0x15aba7(0x42e)](_0x3d0a5f,_0x4bed06*0x0,0x0,_0x4bed06),this[_0x15aba7(0x42e)](_0x44d8ed,_0x4bed06*0x1,0x0,_0x4bed06,'center'),this[_0x15aba7(0x42e)](_0x238c71,_0x4bed06*0x2,0x0,_0x4bed06,_0x15aba7(0x2d3));const _0x349062=this[_0x15aba7(0x46f)](_0x58bae7)['width'],_0x447e08=this[_0x15aba7(0x8fe)]-_0x349062;this[_0x15aba7(0x4f3)](_0x58bae7,_0x447e08,0x0,_0x349062);},VisuMZ['ShowDevTools']=function(_0x53de09){const _0x48790a=_0x5eb334;if(Utils[_0x48790a(0x565)]('test')){var _0x4e7f9b=require(_0x48790a(0x4a6))[_0x48790a(0x3f8)][_0x48790a(0x7c9)]();SceneManager[_0x48790a(0x2b7)]();if(_0x53de09)setTimeout(_0x4e7f9b[_0x48790a(0x25d)][_0x48790a(0x1fa)](_0x4e7f9b),0x190);}},VisuMZ[_0x5eb334(0x800)]=function(_0x248512,_0x500671){const _0x8b8a51=_0x5eb334;_0x500671=_0x500671[_0x8b8a51(0x8d6)]();var _0x1d0338=1.70158,_0x3d2378=0.7;switch(_0x500671){case _0x8b8a51(0x524):return _0x248512;case _0x8b8a51(0x590):return-0x1*Math['cos'](_0x248512*(Math['PI']/0x2))+0x1;case'OUTSINE':return Math[_0x8b8a51(0x639)](_0x248512*(Math['PI']/0x2));case _0x8b8a51(0x8e1):return-0.5*(Math[_0x8b8a51(0x22d)](Math['PI']*_0x248512)-0x1);case _0x8b8a51(0x988):return _0x248512*_0x248512;case _0x8b8a51(0x856):return _0x248512*(0x2-_0x248512);case _0x8b8a51(0x850):return _0x248512<0.5?0x2*_0x248512*_0x248512:-0x1+(0x4-0x2*_0x248512)*_0x248512;case _0x8b8a51(0x4c7):return _0x248512*_0x248512*_0x248512;case _0x8b8a51(0x89d):var _0x3604a1=_0x248512-0x1;return _0x3604a1*_0x3604a1*_0x3604a1+0x1;case _0x8b8a51(0x8a4):return _0x248512<0.5?0x4*_0x248512*_0x248512*_0x248512:(_0x248512-0x1)*(0x2*_0x248512-0x2)*(0x2*_0x248512-0x2)+0x1;case _0x8b8a51(0x3f4):return _0x248512*_0x248512*_0x248512*_0x248512;case _0x8b8a51(0x500):var _0x3604a1=_0x248512-0x1;return 0x1-_0x3604a1*_0x3604a1*_0x3604a1*_0x3604a1;case _0x8b8a51(0x30c):var _0x3604a1=_0x248512-0x1;return _0x248512<0.5?0x8*_0x248512*_0x248512*_0x248512*_0x248512:0x1-0x8*_0x3604a1*_0x3604a1*_0x3604a1*_0x3604a1;case _0x8b8a51(0x775):return _0x248512*_0x248512*_0x248512*_0x248512*_0x248512;case _0x8b8a51(0x8f7):var _0x3604a1=_0x248512-0x1;return 0x1+_0x3604a1*_0x3604a1*_0x3604a1*_0x3604a1*_0x3604a1;case _0x8b8a51(0x3ad):var _0x3604a1=_0x248512-0x1;return _0x248512<0.5?0x10*_0x248512*_0x248512*_0x248512*_0x248512*_0x248512:0x1+0x10*_0x3604a1*_0x3604a1*_0x3604a1*_0x3604a1*_0x3604a1;case _0x8b8a51(0x198):if(_0x248512===0x0){if('vXocW'===_0x8b8a51(0x889))return 0x0;else{const _0x5cbce6=new _0x7420cb(_0x1ca948);this[_0x8b8a51(0x569)](_0x5cbce6);}}return Math[_0x8b8a51(0x2d7)](0x2,0xa*(_0x248512-0x1));case'OUTEXPO':if(_0x248512===0x1)return'hHIRY'===_0x8b8a51(0x1a1)?0x1:_0x4b9e81[_0x8b8a51(0x63b)]['textWidth'][_0x8b8a51(0x3e2)](this,_0x394415);return-Math[_0x8b8a51(0x2d7)](0x2,-0xa*_0x248512)+0x1;case _0x8b8a51(0x475):if(_0x248512===0x0||_0x248512===0x1)return _0x248512;var _0x5e938e=_0x248512*0x2,_0x1ef4fc=_0x5e938e-0x1;if(_0x5e938e<0x1)return 0.5*Math[_0x8b8a51(0x2d7)](0x2,0xa*_0x1ef4fc);return 0.5*(-Math[_0x8b8a51(0x2d7)](0x2,-0xa*_0x1ef4fc)+0x2);case _0x8b8a51(0x507):var _0x5e938e=_0x248512/0x1;return-0x1*(Math[_0x8b8a51(0x3f1)](0x1-_0x5e938e*_0x248512)-0x1);case _0x8b8a51(0x8ee):var _0x3604a1=_0x248512-0x1;return Math[_0x8b8a51(0x3f1)](0x1-_0x3604a1*_0x3604a1);case _0x8b8a51(0x5c1):var _0x5e938e=_0x248512*0x2,_0x1ef4fc=_0x5e938e-0x2;if(_0x5e938e<0x1)return-0.5*(Math['sqrt'](0x1-_0x5e938e*_0x5e938e)-0x1);return 0.5*(Math[_0x8b8a51(0x3f1)](0x1-_0x1ef4fc*_0x1ef4fc)+0x1);case _0x8b8a51(0x1d2):return _0x248512*_0x248512*((_0x1d0338+0x1)*_0x248512-_0x1d0338);case _0x8b8a51(0x7f0):var _0x5e938e=_0x248512/0x1-0x1;return _0x5e938e*_0x5e938e*((_0x1d0338+0x1)*_0x5e938e+_0x1d0338)+0x1;break;case'INOUTBACK':var _0x5e938e=_0x248512*0x2,_0x516c9b=_0x5e938e-0x2,_0xd6b24c=_0x1d0338*1.525;if(_0x5e938e<0x1)return 0.5*_0x5e938e*_0x5e938e*((_0xd6b24c+0x1)*_0x5e938e-_0xd6b24c);return 0.5*(_0x516c9b*_0x516c9b*((_0xd6b24c+0x1)*_0x516c9b+_0xd6b24c)+0x2);case _0x8b8a51(0x544):if(_0x248512===0x0||_0x248512===0x1)return _0x248512;var _0x5e938e=_0x248512/0x1,_0x1ef4fc=_0x5e938e-0x1,_0x1a669e=0x1-_0x3d2378,_0xd6b24c=_0x1a669e/(0x2*Math['PI'])*Math[_0x8b8a51(0x655)](0x1);return-(Math[_0x8b8a51(0x2d7)](0x2,0xa*_0x1ef4fc)*Math[_0x8b8a51(0x639)]((_0x1ef4fc-_0xd6b24c)*(0x2*Math['PI'])/_0x1a669e));case _0x8b8a51(0x792):var _0x1a669e=0x1-_0x3d2378,_0x5e938e=_0x248512*0x2;if(_0x248512===0x0||_0x248512===0x1)return _0x248512;var _0xd6b24c=_0x1a669e/(0x2*Math['PI'])*Math['asin'](0x1);return Math[_0x8b8a51(0x2d7)](0x2,-0xa*_0x5e938e)*Math[_0x8b8a51(0x639)]((_0x5e938e-_0xd6b24c)*(0x2*Math['PI'])/_0x1a669e)+0x1;case _0x8b8a51(0x4e6):var _0x1a669e=0x1-_0x3d2378;if(_0x248512===0x0||_0x248512===0x1)return _0x248512;var _0x5e938e=_0x248512*0x2,_0x1ef4fc=_0x5e938e-0x1,_0xd6b24c=_0x1a669e/(0x2*Math['PI'])*Math[_0x8b8a51(0x655)](0x1);if(_0x5e938e<0x1){if(_0x8b8a51(0x4d8)==='EJERJ')_0x3de53e+=_0x486030+'\x0a',_0x3b91a5+=_0x8b8a51(0x783)[_0x8b8a51(0x1ce)](_0x106084[_0x8b8a51(0x8c6)][0x0]);else return-0.5*(Math[_0x8b8a51(0x2d7)](0x2,0xa*_0x1ef4fc)*Math['sin']((_0x1ef4fc-_0xd6b24c)*(0x2*Math['PI'])/_0x1a669e));}return Math[_0x8b8a51(0x2d7)](0x2,-0xa*_0x1ef4fc)*Math[_0x8b8a51(0x639)]((_0x1ef4fc-_0xd6b24c)*(0x2*Math['PI'])/_0x1a669e)*0.5+0x1;case'OUTBOUNCE':var _0x5e938e=_0x248512/0x1;if(_0x5e938e<0x1/2.75)return 7.5625*_0x5e938e*_0x5e938e;else{if(_0x5e938e<0x2/2.75){var _0x516c9b=_0x5e938e-1.5/2.75;return 7.5625*_0x516c9b*_0x516c9b+0.75;}else{if(_0x5e938e<2.5/2.75){var _0x516c9b=_0x5e938e-2.25/2.75;return 7.5625*_0x516c9b*_0x516c9b+0.9375;}else{if(_0x8b8a51(0x4a4)!==_0x8b8a51(0x59c)){var _0x516c9b=_0x5e938e-2.625/2.75;return 7.5625*_0x516c9b*_0x516c9b+0.984375;}else _0x41e57f=_0x5df842(_0x5696a6['$1'])*_0xe27dd5[_0x8b8a51(0x21a)],_0xdb2745=(0x1-_0x17d175(_0x46b925['$2']))*-_0x25b350;}}}case _0x8b8a51(0x5eb):var _0x577565=0x1-VisuMZ[_0x8b8a51(0x800)](0x1-_0x248512,'outbounce');return _0x577565;case _0x8b8a51(0x3e6):if(_0x248512<0.5){if(_0x8b8a51(0x162)!==_0x8b8a51(0x5d9))var _0x577565=VisuMZ[_0x8b8a51(0x800)](_0x248512*0x2,_0x8b8a51(0x222))*0.5;else _0x37d19a+=_0x5e6c8b+_0x8b8a51(0x6bd);}else var _0x577565=VisuMZ['ApplyEasing'](_0x248512*0x2-0x1,_0x8b8a51(0x754))*0.5+0.5;return _0x577565;default:return _0x248512;}},VisuMZ[_0x5eb334(0x84a)]=function(_0x5f316e){const _0xd251b6=_0x5eb334;_0x5f316e=String(_0x5f316e)[_0xd251b6(0x8d6)]();const _0x52ea9f=VisuMZ[_0xd251b6(0x541)][_0xd251b6(0x467)][_0xd251b6(0x6f3)];if(_0x5f316e===_0xd251b6(0x550))return _0x52ea9f['IconParam0'];if(_0x5f316e==='MAXMP')return _0x52ea9f[_0xd251b6(0x6ce)];if(_0x5f316e===_0xd251b6(0x954))return _0x52ea9f['IconParam2'];if(_0x5f316e===_0xd251b6(0x629))return _0x52ea9f[_0xd251b6(0x8e4)];if(_0x5f316e===_0xd251b6(0x4f7))return _0x52ea9f['IconParam4'];if(_0x5f316e===_0xd251b6(0x6d1))return _0x52ea9f[_0xd251b6(0x6e9)];if(_0x5f316e==='AGI')return _0x52ea9f[_0xd251b6(0x7c0)];if(_0x5f316e==='LUK')return _0x52ea9f[_0xd251b6(0x512)];if(_0x5f316e==='HIT')return _0x52ea9f[_0xd251b6(0x2b8)];if(_0x5f316e===_0xd251b6(0x238))return _0x52ea9f[_0xd251b6(0x607)];if(_0x5f316e===_0xd251b6(0x691))return _0x52ea9f[_0xd251b6(0x24c)];if(_0x5f316e===_0xd251b6(0x34c))return _0x52ea9f['IconXParam3'];if(_0x5f316e===_0xd251b6(0x3d6))return _0x52ea9f['IconXParam4'];if(_0x5f316e==='MRF')return _0x52ea9f['IconXParam5'];if(_0x5f316e==='CNT')return _0x52ea9f[_0xd251b6(0x142)];if(_0x5f316e===_0xd251b6(0x774))return _0x52ea9f[_0xd251b6(0x711)];if(_0x5f316e===_0xd251b6(0x8e3))return _0x52ea9f[_0xd251b6(0x199)];if(_0x5f316e===_0xd251b6(0x195))return _0x52ea9f[_0xd251b6(0x31b)];if(_0x5f316e===_0xd251b6(0x189))return _0x52ea9f[_0xd251b6(0x7a3)];if(_0x5f316e===_0xd251b6(0x645))return _0x52ea9f[_0xd251b6(0x409)];if(_0x5f316e===_0xd251b6(0x1a4))return _0x52ea9f['IconSParam2'];if(_0x5f316e===_0xd251b6(0x482))return _0x52ea9f[_0xd251b6(0x304)];if(_0x5f316e===_0xd251b6(0x96f))return _0x52ea9f[_0xd251b6(0x2a4)];if(_0x5f316e===_0xd251b6(0x701))return _0x52ea9f[_0xd251b6(0x49a)];if(_0x5f316e===_0xd251b6(0x291))return _0x52ea9f[_0xd251b6(0x58b)];if(_0x5f316e==='MDR')return _0x52ea9f[_0xd251b6(0x6be)];if(_0x5f316e===_0xd251b6(0x64c))return _0x52ea9f[_0xd251b6(0x791)];if(_0x5f316e==='EXR')return _0x52ea9f[_0xd251b6(0x5e4)];if(VisuMZ[_0xd251b6(0x541)]['CustomParamIcons'][_0x5f316e]){if('yipka'===_0xd251b6(0x1f8)){_0x9dacc2['ConvertParams'](_0x32fa4a,_0x2b2cf1);const _0x18665c=_0x4e48d7[_0xd251b6(0x2bc)]||0x0;_0x4c2fdd['gainGold'](_0x18665c);}else return VisuMZ['CoreEngine'][_0xd251b6(0x7f2)][_0x5f316e]||0x0;}return 0x0;},VisuMZ[_0x5eb334(0x942)]=function(_0x211579,_0x4ea0ee,_0x409676){const _0x4fd12c=_0x5eb334;if(_0x409676===undefined&&_0x211579%0x1===0x0)return _0x211579;if(_0x409676!==undefined&&[_0x4fd12c(0x550),_0x4fd12c(0x326),_0x4fd12c(0x954),_0x4fd12c(0x629),_0x4fd12c(0x4f7),_0x4fd12c(0x6d1),_0x4fd12c(0x24b),_0x4fd12c(0x83a)]['includes'](String(_0x409676)[_0x4fd12c(0x8d6)]()[_0x4fd12c(0x4f1)]()))return _0x211579;_0x4ea0ee=_0x4ea0ee||0x0;if(VisuMZ[_0x4fd12c(0x541)][_0x4fd12c(0x4a9)][_0x409676]){if(VisuMZ[_0x4fd12c(0x541)][_0x4fd12c(0x44d)][_0x409676]===_0x4fd12c(0x148))return _0x211579;else{if(_0x4fd12c(0x5be)===_0x4fd12c(0x20a)){if(typeof _0x2599bd===_0x4fd12c(0x1d6))_0x1ee543[_0x4fd12c(0x18d)]['quit']();}else return String((_0x211579*0x64)[_0x4fd12c(0x39b)](_0x4ea0ee))+'%';}}return String((_0x211579*0x64)[_0x4fd12c(0x39b)](_0x4ea0ee))+'%';},VisuMZ[_0x5eb334(0x683)]=function(_0x571e0c){const _0x2b97c7=_0x5eb334;_0x571e0c=String(_0x571e0c);if(!_0x571e0c)return _0x571e0c;if(typeof _0x571e0c!==_0x2b97c7(0x764))return _0x571e0c;const _0x368442=VisuMZ['CoreEngine'][_0x2b97c7(0x467)][_0x2b97c7(0x70a)]['DigitGroupingLocale']||_0x2b97c7(0x77c),_0x214f5e={'maximumFractionDigits':0x6};_0x571e0c=_0x571e0c['replace'](/\[(.*?)\]/g,(_0x177261,_0x4b56ca)=>{return VisuMZ['PreserveNumbers'](_0x4b56ca,'[',']');}),_0x571e0c=_0x571e0c[_0x2b97c7(0x551)](/<(.*?)>/g,(_0x59d076,_0x540063)=>{return VisuMZ['PreserveNumbers'](_0x540063,'<','>');}),_0x571e0c=_0x571e0c['replace'](/\{\{(.*?)\}\}/g,(_0x3b74de,_0x2e89fa)=>{const _0x5ee1bd=_0x2b97c7;if(_0x5ee1bd(0x2b0)!==_0x5ee1bd(0x2b0)){var _0x599fa9=_0x20d645(_0xfb9be8['$1']);_0x3f832e+=_0x599fa9;}else return VisuMZ[_0x5ee1bd(0x34d)](_0x2e89fa,'','');}),_0x571e0c=_0x571e0c[_0x2b97c7(0x551)](/(\d+\.?\d*)/g,(_0x5a6f80,_0x443750)=>{const _0x448cdc=_0x2b97c7;let _0x454adb=_0x443750;if(_0x454adb[0x0]==='0')return _0x454adb;if(_0x454adb[_0x454adb[_0x448cdc(0x61b)]-0x1]==='.')return Number(_0x454adb)[_0x448cdc(0x1aa)](_0x368442,_0x214f5e)+'.';else return _0x454adb[_0x454adb['length']-0x1]===','?Number(_0x454adb)['toLocaleString'](_0x368442,_0x214f5e)+',':Number(_0x454adb)[_0x448cdc(0x1aa)](_0x368442,_0x214f5e);});let _0x362350=0x3;while(_0x362350--){_0x571e0c=VisuMZ['RevertPreserveNumbers'](_0x571e0c);}return _0x571e0c;},VisuMZ[_0x5eb334(0x34d)]=function(_0x5c7141,_0x286da2,_0x55b8d7){const _0x5ac2e9=_0x5eb334;return _0x5c7141=_0x5c7141[_0x5ac2e9(0x551)](/(\d)/gi,(_0x4efb6f,_0x15608c)=>_0x5ac2e9(0x5d8)[_0x5ac2e9(0x1ce)](Number(_0x15608c))),_0x5ac2e9(0x428)[_0x5ac2e9(0x1ce)](_0x5c7141,_0x286da2,_0x55b8d7);},VisuMZ[_0x5eb334(0x5bb)]=function(_0x354a78){return _0x354a78=_0x354a78['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x4b9ba7,_0x2fc637)=>Number(parseInt(_0x2fc637))),_0x354a78;},VisuMZ[_0x5eb334(0x771)]=function(_0x17ddd9){const _0x5e5acd=_0x5eb334;SoundManager[_0x5e5acd(0x6a6)]();if(!Utils['isNwjs']()){const _0x2f8fa7=window[_0x5e5acd(0x977)](_0x17ddd9,_0x5e5acd(0x7f8));}else{const _0x1bb42d=process[_0x5e5acd(0x12f)]==_0x5e5acd(0x465)?_0x5e5acd(0x977):process[_0x5e5acd(0x12f)]=='win32'?'start':_0x5e5acd(0x886);require(_0x5e5acd(0x267))['exec'](_0x1bb42d+'\x20'+_0x17ddd9);}},VisuMZ[_0x5eb334(0x7be)]=function(_0x140bdd,_0x5093e3){const _0x3722b5=_0x5eb334;if(!_0x140bdd)return'';const _0x3c98e4=_0x140bdd[_0x3722b5(0x732)]||_0x140bdd['id'];let _0x2c4761='';_0x140bdd[_0x3722b5(0x90e)]!==undefined&&_0x140bdd['nickname']!==undefined&&(_0x3722b5(0x48a)===_0x3722b5(0x192)?(_0x38b452['playMiss'](),this[_0x3722b5(0x215)](_0x3722b5(0x99d))):_0x2c4761='Actor-%1-%2'['format'](_0x3c98e4,_0x5093e3));_0x140bdd[_0x3722b5(0x263)]!==undefined&&_0x140bdd['learnings']!==undefined&&(_0x2c4761=_0x3722b5(0x8fb)['format'](_0x3c98e4,_0x5093e3));_0x140bdd[_0x3722b5(0x17c)]!==undefined&&_0x140bdd[_0x3722b5(0x20b)]!==undefined&&(_0x2c4761=_0x3722b5(0x386)[_0x3722b5(0x1ce)](_0x3c98e4,_0x5093e3));_0x140bdd[_0x3722b5(0x98d)]!==undefined&&_0x140bdd[_0x3722b5(0x964)]!==undefined&&(_0x3722b5(0x2e7)===_0x3722b5(0x5c3)?this[_0x3722b5(0x236)]=0x2:_0x2c4761=_0x3722b5(0x3d9)[_0x3722b5(0x1ce)](_0x3c98e4,_0x5093e3));if(_0x140bdd['wtypeId']!==undefined&&_0x140bdd[_0x3722b5(0x2c7)]===0x1){if('VtNmF'!==_0x3722b5(0x4e9))_0x2c4761='Weapon-%1-%2'[_0x3722b5(0x1ce)](_0x3c98e4,_0x5093e3);else throw _0x141ca9;}return _0x140bdd[_0x3722b5(0x8ed)]!==undefined&&_0x140bdd[_0x3722b5(0x2c7)]>0x1&&(_0x2c4761=_0x3722b5(0x228)[_0x3722b5(0x1ce)](_0x3c98e4,_0x5093e3)),_0x140bdd[_0x3722b5(0x202)]!==undefined&&_0x140bdd[_0x3722b5(0x8b1)]!==undefined&&(_0x2c4761=_0x3722b5(0x52f)[_0x3722b5(0x1ce)](_0x3c98e4,_0x5093e3)),_0x140bdd[_0x3722b5(0x56c)]!==undefined&&_0x140bdd[_0x3722b5(0x3de)]!==undefined&&(_0x3722b5(0x26a)!==_0x3722b5(0x26a)?_0x420f59[_0x3722b5(0x541)]['Window_Selectable_drawBackgroundRect'][_0x3722b5(0x3e2)](this,_0x59b26e):_0x2c4761='State-%1-%2'[_0x3722b5(0x1ce)](_0x3c98e4,_0x5093e3)),_0x2c4761;},Game_Picture[_0x5eb334(0x63b)][_0x5eb334(0x784)]=function(){const _0x4117e6=_0x5eb334;return this[_0x4117e6(0x2d2)];},VisuMZ['CoreEngine'][_0x5eb334(0x720)]=Game_Picture[_0x5eb334(0x63b)][_0x5eb334(0x73a)],Game_Picture[_0x5eb334(0x63b)][_0x5eb334(0x73a)]=function(){const _0x3b96e6=_0x5eb334;VisuMZ[_0x3b96e6(0x541)]['Game_Picture_initBasic']['call'](this),this[_0x3b96e6(0x2d2)]={'x':0x0,'y':0x0},this[_0x3b96e6(0x496)]={'x':0x0,'y':0x0};},VisuMZ['CoreEngine'][_0x5eb334(0x763)]=Game_Picture[_0x5eb334(0x63b)]['updateMove'],Game_Picture[_0x5eb334(0x63b)]['updateMove']=function(){const _0x4524ac=_0x5eb334;this[_0x4524ac(0x52b)]();const _0x14a840=this[_0x4524ac(0x24d)];VisuMZ[_0x4524ac(0x541)][_0x4524ac(0x763)][_0x4524ac(0x3e2)](this),_0x14a840>0x0&&this['_duration']<=0x0&&(this['_x']=this[_0x4524ac(0x33a)],this['_y']=this[_0x4524ac(0x7b9)],this['_scaleX']=this[_0x4524ac(0x7e1)],this[_0x4524ac(0x13a)]=this[_0x4524ac(0x376)],this[_0x4524ac(0x658)]=this[_0x4524ac(0x45e)],this[_0x4524ac(0x2d2)]&&(this['_anchor']['x']=this[_0x4524ac(0x496)]['x'],this[_0x4524ac(0x2d2)]['y']=this[_0x4524ac(0x496)]['y']));},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x530)]=Game_Picture['prototype'][_0x5eb334(0x637)],Game_Picture[_0x5eb334(0x63b)][_0x5eb334(0x637)]=function(_0x11783d,_0x56b931,_0x5e5f1e,_0xc623f1,_0x1f69d2,_0x14b0ea,_0x4df7c2,_0x27e900){const _0x4c8e78=_0x5eb334;VisuMZ[_0x4c8e78(0x541)][_0x4c8e78(0x530)][_0x4c8e78(0x3e2)](this,_0x11783d,_0x56b931,_0x5e5f1e,_0xc623f1,_0x1f69d2,_0x14b0ea,_0x4df7c2,_0x27e900),this[_0x4c8e78(0x432)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x56b931]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x5eb334(0x824)]=Game_Picture[_0x5eb334(0x63b)]['move'],Game_Picture[_0x5eb334(0x63b)]['move']=function(_0x1436ae,_0x2d8ac6,_0x29bb60,_0x4c4ff8,_0x859154,_0x10b829,_0x981091,_0x2096a4,_0x13cb5d){const _0x14dd17=_0x5eb334;VisuMZ[_0x14dd17(0x541)][_0x14dd17(0x824)]['call'](this,_0x1436ae,_0x2d8ac6,_0x29bb60,_0x4c4ff8,_0x859154,_0x10b829,_0x981091,_0x2096a4,_0x13cb5d),this[_0x14dd17(0x832)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1436ae]||{'x':0x0,'y':0x0});},Game_Picture[_0x5eb334(0x63b)][_0x5eb334(0x52b)]=function(){const _0x5e9bb4=_0x5eb334;if(this[_0x5e9bb4(0x24d)]>0x0){if(_0x5e9bb4(0x71c)!==_0x5e9bb4(0x2e6))this['_anchor']['x']=this[_0x5e9bb4(0x1da)](this['_anchor']['x'],this[_0x5e9bb4(0x496)]['x']),this[_0x5e9bb4(0x2d2)]['y']=this[_0x5e9bb4(0x1da)](this[_0x5e9bb4(0x2d2)]['y'],this[_0x5e9bb4(0x496)]['y']);else return this[_0x5e9bb4(0x2c9)][_0x5e9bb4(0x42c)](_0x3914b0);}},Game_Picture[_0x5eb334(0x63b)]['setAnchor']=function(_0x29dc34){const _0x2282a0=_0x5eb334;this[_0x2282a0(0x2d2)]=_0x29dc34,this[_0x2282a0(0x496)]=JsonEx[_0x2282a0(0x859)](this[_0x2282a0(0x2d2)]);},Game_Picture['prototype'][_0x5eb334(0x832)]=function(_0x18de46){const _0x3d1696=_0x5eb334;this[_0x3d1696(0x496)]=_0x18de46;},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x172)]=Sprite_Picture['prototype'][_0x5eb334(0x2bb)],Sprite_Picture[_0x5eb334(0x63b)][_0x5eb334(0x2bb)]=function(){const _0x4323f9=_0x5eb334,_0x47b4cc=this[_0x4323f9(0x958)]();!_0x47b4cc[_0x4323f9(0x784)]()?VisuMZ['CoreEngine'][_0x4323f9(0x172)]['call'](this):(this[_0x4323f9(0x784)]['x']=_0x47b4cc['anchor']()['x'],this[_0x4323f9(0x784)]['y']=_0x47b4cc[_0x4323f9(0x784)]()['y']);},Game_Action['prototype'][_0x5eb334(0x1fb)]=function(_0x3e485a){const _0x2e99b2=_0x5eb334;if(_0x3e485a){const _0xf3bbb7=_0x3e485a[_0x2e99b2(0x71b)];if(_0xf3bbb7===0x1&&this[_0x2e99b2(0x6ca)]()[_0x2e99b2(0x9a4)]()!==0x1)this[_0x2e99b2(0x154)]();else{if(_0xf3bbb7===0x2&&this[_0x2e99b2(0x6ca)]()[_0x2e99b2(0x815)]()!==0x2){if(_0x2e99b2(0x5a1)==='dUGNv')this[_0x2e99b2(0x14d)]();else{if(_0x4f5143[_0x2e99b2(0x8c8)](_0x174dbe)){const _0x229eef=_0x2339af[_0x2e99b2(0x541)][_0x2e99b2(0x69e)][_0x9b82aa],_0x1a25c0=_0x11a01a[_0x2e99b2(0x541)]['ControllerButtons'][_0x229eef];return _0x1a25c0[_0x1d5496]||this[_0x2e99b2(0x869)](_0x3cc9a0);}}}else{if(_0x2e99b2(0x185)!==_0x2e99b2(0x185)){if(this[_0x2e99b2(0x19f)](_0x41592f))return!![];if(this[_0x2e99b2(0x78c)](_0x54e642))return!![];}else this[_0x2e99b2(0x3bb)](_0xf3bbb7);}}}else this[_0x2e99b2(0x961)]();},Game_Actor[_0x5eb334(0x63b)]['usableSkills']=function(){const _0x3fff96=_0x5eb334;return this[_0x3fff96(0x1a5)]()[_0x3fff96(0x1a9)](_0x13f013=>this[_0x3fff96(0x769)](_0x13f013)&&this['skillTypes']()[_0x3fff96(0x8c8)](_0x13f013[_0x3fff96(0x17c)]));},Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x5d0)]=function(){const _0x47c44b=_0x5eb334;this['_dimmerSprite']=new Sprite(),this[_0x47c44b(0x5aa)][_0x47c44b(0x83b)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this['addChildToBack'](this[_0x47c44b(0x5aa)]);},Window_Base[_0x5eb334(0x63b)][_0x5eb334(0x193)]=function(){const _0x526391=_0x5eb334;if(this[_0x526391(0x5aa)]){if(_0x526391(0x6e1)==='rialN'){const _0x25128c=this[_0x526391(0x5aa)][_0x526391(0x83b)],_0x130843=this[_0x526391(0x21a)],_0x15133b=this['height'],_0x450f48=this[_0x526391(0x321)],_0x468be3=ColorManager[_0x526391(0x16a)](),_0x10cf9e=ColorManager[_0x526391(0x58c)]();_0x25128c[_0x526391(0x707)](_0x130843,_0x15133b),_0x25128c[_0x526391(0x384)](0x0,0x0,_0x130843,_0x450f48,_0x10cf9e,_0x468be3,!![]),_0x25128c[_0x526391(0x808)](0x0,_0x450f48,_0x130843,_0x15133b-_0x450f48*0x2,_0x468be3),_0x25128c[_0x526391(0x384)](0x0,_0x15133b-_0x450f48,_0x130843,_0x450f48,_0x468be3,_0x10cf9e,!![]),this['_dimmerSprite']['setFrame'](0x0,0x0,_0x130843,_0x15133b);}else{var _0x57f87d=_0x5a50be(_0x3de03f['$1'])/0x64;_0x584ec8*=_0x57f87d;}}},Game_Actor[_0x5eb334(0x63b)][_0x5eb334(0x498)]=function(){const _0x2fcab1=_0x5eb334;for(let _0x451de7=0x0;_0x451de7<this[_0x2fcab1(0x1fd)]();_0x451de7++){if(_0x2fcab1(0x35b)!==_0x2fcab1(0x294)){const _0x1d2799=this['makeActionList']();let _0x8fbe62=Number['MIN_SAFE_INTEGER'];this['setAction'](_0x451de7,_0x1d2799[0x0]);for(const _0x3a2bb6 of _0x1d2799){const _0x35f791=_0x3a2bb6['evaluate']();if(_0x35f791>_0x8fbe62){if('sPLNF'!=='iMCcz')_0x8fbe62=_0x35f791,this[_0x2fcab1(0x745)](_0x451de7,_0x3a2bb6);else{if(_0x362fe6[_0x2fcab1(0x96e)]())_0x573d39[_0x2fcab1(0x76e)](_0x1a6a02);}}}}else this[_0x2fcab1(0x959)]()['centerX']=!![],this[_0x2fcab1(0x959)]()[_0x2fcab1(0x94d)]=_0x4023dd(_0x55f74d['$1']);}this[_0x2fcab1(0x7f6)](_0x2fcab1(0x874));},Window_BattleItem[_0x5eb334(0x63b)][_0x5eb334(0x831)]=function(_0x255d36){const _0x22b69d=_0x5eb334;if(BattleManager[_0x22b69d(0x18b)]()){if(_0x22b69d(0x309)==='GlgBH')return BattleManager[_0x22b69d(0x18b)]()['canUse'](_0x255d36);else _0x14ad58+=_0x3303b1;}else return Window_ItemList[_0x22b69d(0x63b)][_0x22b69d(0x831)][_0x22b69d(0x3e2)](this,_0x255d36);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x49d)]=Scene_Map[_0x5eb334(0x63b)]['createSpriteset'],Scene_Map['prototype']['createSpriteset']=function(){const _0x1e91f1=_0x5eb334;VisuMZ[_0x1e91f1(0x541)][_0x1e91f1(0x49d)][_0x1e91f1(0x3e2)](this);const _0x18bc7f=this['_spriteset']['_timerSprite'];if(_0x18bc7f)this['addChild'](_0x18bc7f);},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x33b)]=Scene_Battle[_0x5eb334(0x63b)][_0x5eb334(0x49e)],Scene_Battle[_0x5eb334(0x63b)][_0x5eb334(0x49e)]=function(){const _0x4701a2=_0x5eb334;VisuMZ['CoreEngine'][_0x4701a2(0x33b)]['call'](this);const _0x53f22e=this[_0x4701a2(0x3ca)]['_timerSprite'];if(_0x53f22e)this[_0x4701a2(0x569)](_0x53f22e);},Sprite_Actor[_0x5eb334(0x63b)][_0x5eb334(0x3c4)]=function(){const _0x25a17f=_0x5eb334;Sprite_Battler[_0x25a17f(0x63b)][_0x25a17f(0x3c4)][_0x25a17f(0x3e2)](this),this[_0x25a17f(0x7ad)]();if(this[_0x25a17f(0x84b)])this[_0x25a17f(0x71e)]();else{if(this[_0x25a17f(0x297)]!==''){if('bBMWE'!==_0x25a17f(0x1bd))this[_0x25a17f(0x297)]='';else return _0x40897b[_0x25a17f(0x541)][_0x25a17f(0x467)]['UI'][_0x25a17f(0x790)];}}},Window[_0x5eb334(0x63b)][_0x5eb334(0x406)]=function(){const _0x3e7964=_0x5eb334,_0x286c42=this[_0x3e7964(0x19d)],_0xc42907=this['_height'],_0x12ba51=0x18,_0x5e8cc2=_0x12ba51/0x2,_0x207efd=0x60+_0x12ba51,_0x1258e4=0x0+_0x12ba51;this[_0x3e7964(0x9a3)]['bitmap']=this[_0x3e7964(0x930)],this[_0x3e7964(0x9a3)]['anchor']['x']=0.5,this['_downArrowSprite']['anchor']['y']=0.5,this[_0x3e7964(0x9a3)][_0x3e7964(0x74f)](_0x207efd+_0x5e8cc2,_0x1258e4+_0x5e8cc2+_0x12ba51,_0x12ba51,_0x5e8cc2),this[_0x3e7964(0x9a3)]['move'](Math[_0x3e7964(0x811)](_0x286c42/0x2),Math[_0x3e7964(0x811)](_0xc42907-_0x5e8cc2)),this['_upArrowSprite']['bitmap']=this[_0x3e7964(0x930)],this[_0x3e7964(0x518)][_0x3e7964(0x784)]['x']=0.5,this['_upArrowSprite'][_0x3e7964(0x784)]['y']=0.5,this[_0x3e7964(0x518)]['setFrame'](_0x207efd+_0x5e8cc2,_0x1258e4,_0x12ba51,_0x5e8cc2),this[_0x3e7964(0x518)][_0x3e7964(0x300)](Math[_0x3e7964(0x811)](_0x286c42/0x2),Math['round'](_0x5e8cc2));},Window['prototype']['_refreshPauseSign']=function(){const _0x32d119=_0x5eb334,_0x2011a2=0x90,_0x41faf7=0x60,_0x85ca8=0x18;this['_pauseSignSprite'][_0x32d119(0x83b)]=this[_0x32d119(0x930)],this[_0x32d119(0x2c4)][_0x32d119(0x784)]['x']=0.5,this[_0x32d119(0x2c4)]['anchor']['y']=0x1,this[_0x32d119(0x2c4)][_0x32d119(0x300)](Math[_0x32d119(0x811)](this[_0x32d119(0x19d)]/0x2),this[_0x32d119(0x697)]),this[_0x32d119(0x2c4)]['setFrame'](_0x2011a2,_0x41faf7,_0x85ca8,_0x85ca8),this[_0x32d119(0x2c4)]['alpha']=0xff;},Window[_0x5eb334(0x63b)][_0x5eb334(0x63c)]=function(){const _0x132536=_0x5eb334,_0x4327c4=this[_0x132536(0x155)][_0x132536(0x402)][_0x132536(0x611)](new Point(0x0,0x0)),_0x311982=this[_0x132536(0x155)][_0x132536(0x3cd)];_0x311982['x']=_0x4327c4['x']+this[_0x132536(0x8fd)]['x'],_0x311982['y']=_0x4327c4['y']+this[_0x132536(0x8fd)]['y'],_0x311982[_0x132536(0x21a)]=Math['ceil'](this['innerWidth']*this['scale']['x']),_0x311982[_0x132536(0x289)]=Math[_0x132536(0x2df)](this[_0x132536(0x2b4)]*this[_0x132536(0x5d3)]['y']);},Window[_0x5eb334(0x63b)][_0x5eb334(0x24f)]=function(){const _0xe9ce6a=_0x5eb334,_0x3346fe=this['_margin'],_0x53cafc=Math[_0xe9ce6a(0x852)](0x0,this[_0xe9ce6a(0x19d)]-_0x3346fe*0x2),_0xce14ee=Math[_0xe9ce6a(0x852)](0x0,this[_0xe9ce6a(0x697)]-_0x3346fe*0x2),_0x3ab45e=this[_0xe9ce6a(0x5e2)],_0x16bb56=_0x3ab45e['children'][0x0];_0x3ab45e[_0xe9ce6a(0x83b)]=this[_0xe9ce6a(0x930)],_0x3ab45e[_0xe9ce6a(0x74f)](0x0,0x0,0x60,0x60),_0x3ab45e[_0xe9ce6a(0x300)](_0x3346fe,_0x3346fe),_0x3ab45e[_0xe9ce6a(0x5d3)]['x']=_0x53cafc/0x60,_0x3ab45e['scale']['y']=_0xce14ee/0x60,_0x16bb56[_0xe9ce6a(0x83b)]=this[_0xe9ce6a(0x930)],_0x16bb56['setFrame'](0x0,0x60,0x60,0x60),_0x16bb56[_0xe9ce6a(0x300)](0x0,0x0,_0x53cafc,_0xce14ee),_0x16bb56[_0xe9ce6a(0x5d3)]['x']=0x1/_0x3ab45e['scale']['x'],_0x16bb56[_0xe9ce6a(0x5d3)]['y']=0x1/_0x3ab45e['scale']['y'],_0x3ab45e[_0xe9ce6a(0x710)](this['_colorTone']);},Game_Temp[_0x5eb334(0x63b)]['sceneTerminationClearEffects']=function(){const _0xdc58a6=_0x5eb334;this[_0xdc58a6(0x723)]=[],this[_0xdc58a6(0x7cd)]=[],this[_0xdc58a6(0x186)]=[],this[_0xdc58a6(0x340)]=[];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x144)]=Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x7af)],Scene_Base[_0x5eb334(0x63b)][_0x5eb334(0x7af)]=function(){const _0x11341c=_0x5eb334;if($gameTemp)$gameTemp[_0x11341c(0x4fc)]();VisuMZ['CoreEngine'][_0x11341c(0x144)][_0x11341c(0x3e2)](this);},Bitmap[_0x5eb334(0x63b)][_0x5eb334(0x42c)]=function(_0x1f8a7d){const _0x4b86b3=_0x5eb334,_0x39b145=this[_0x4b86b3(0x679)];_0x39b145[_0x4b86b3(0x5b6)](),_0x39b145[_0x4b86b3(0x673)]=this['_makeFontNameText']();const _0x35d036=_0x39b145[_0x4b86b3(0x63a)](_0x1f8a7d)[_0x4b86b3(0x21a)];return _0x39b145['restore'](),_0x35d036;},Window_Message[_0x5eb334(0x63b)][_0x5eb334(0x145)]=function(_0x5086f5){const _0x60cb4e=_0x5eb334;return this['useFontWidthFix']()?this[_0x60cb4e(0x2c9)][_0x60cb4e(0x42c)](_0x5086f5):Window_Base[_0x60cb4e(0x63b)][_0x60cb4e(0x145)][_0x60cb4e(0x3e2)](this,_0x5086f5);},Window_Message[_0x5eb334(0x63b)]['useFontWidthFix']=function(){const _0x2e63=_0x5eb334;return VisuMZ[_0x2e63(0x541)][_0x2e63(0x467)][_0x2e63(0x70a)][_0x2e63(0x75e)]??!![];},VisuMZ[_0x5eb334(0x541)][_0x5eb334(0x176)]=Game_Action[_0x5eb334(0x63b)][_0x5eb334(0x4b2)],Game_Action[_0x5eb334(0x63b)]['numRepeats']=function(){const _0x39e431=_0x5eb334;return this[_0x39e431(0x5f4)]()?VisuMZ[_0x39e431(0x541)][_0x39e431(0x176)][_0x39e431(0x3e2)](this):0x0;},VisuMZ['CoreEngine']['Game_Action_setAttack']=Game_Action[_0x5eb334(0x63b)][_0x5eb334(0x154)],Game_Action[_0x5eb334(0x63b)][_0x5eb334(0x154)]=function(){const _0x395669=_0x5eb334;this[_0x395669(0x6ca)]()&&this[_0x395669(0x6ca)]()[_0x395669(0x495)]()?VisuMZ[_0x395669(0x541)][_0x395669(0x15b)]['call'](this):_0x395669(0x494)==='OXDri'?this['clear']():this[_0x395669(0x687)]+=_0x323d6c;},Sprite_Name[_0x5eb334(0x63b)][_0x5eb334(0x5f2)]=function(){return 0x24;},Sprite_Name[_0x5eb334(0x63b)]['redraw']=function(){const _0x3527b1=_0x5eb334,_0x518bb5=this[_0x3527b1(0x536)](),_0x590307=this[_0x3527b1(0x2d8)](),_0x52e400=this[_0x3527b1(0x5f2)]();this[_0x3527b1(0x264)](),this[_0x3527b1(0x83b)]['clear'](),this[_0x3527b1(0x83b)][_0x3527b1(0x5cc)](_0x518bb5,0x0,0x0,_0x590307,_0x52e400,_0x3527b1(0x22f));},Bitmap[_0x5eb334(0x63b)]['drawTextTopAligned']=function(_0x1641bb,_0x14877f,_0x40d9bf,_0x43fa00,_0x8d0150,_0x5667f3){const _0x36bcf1=_0x5eb334,_0x1edbea=this['context'],_0x42f1cf=_0x1edbea['globalAlpha'];_0x43fa00=_0x43fa00||0xffffffff;let _0x174cde=_0x14877f,_0x7480e2=Math[_0x36bcf1(0x811)](_0x40d9bf+0x18/0x2+this['fontSize']*0.35);_0x5667f3==='center'&&(_0x174cde+=_0x43fa00/0x2),_0x5667f3===_0x36bcf1(0x3d8)&&(_0x174cde+=_0x43fa00),_0x1edbea['save'](),_0x1edbea['font']=this['_makeFontNameText'](),_0x1edbea['textAlign']=_0x5667f3,_0x1edbea[_0x36bcf1(0x164)]='alphabetic',_0x1edbea[_0x36bcf1(0x907)]=0x1,this[_0x36bcf1(0x749)](_0x1641bb,_0x174cde,_0x7480e2,_0x43fa00),_0x1edbea[_0x36bcf1(0x907)]=_0x42f1cf,this[_0x36bcf1(0x568)](_0x1641bb,_0x174cde,_0x7480e2,_0x43fa00),_0x1edbea[_0x36bcf1(0x2e2)](),this[_0x36bcf1(0x917)][_0x36bcf1(0x3c4)]();},VisuMZ[_0x5eb334(0x541)]['BattleManager_checkSubstitute']=BattleManager[_0x5eb334(0x14b)],BattleManager['checkSubstitute']=function(_0x49afc1){const _0x53024d=_0x5eb334;if(this[_0x53024d(0x65a)][_0x53024d(0x489)]())return![];return VisuMZ[_0x53024d(0x541)][_0x53024d(0x76d)][_0x53024d(0x3e2)](this,_0x49afc1);},BattleManager['endAction']=function(){const _0x48abd2=_0x5eb334;if(this[_0x48abd2(0x15a)])this[_0x48abd2(0x45d)][_0x48abd2(0x36b)](this['_subject']);this['_phase']=_0x48abd2(0x92e),this['_subject']&&this[_0x48abd2(0x15a)][_0x48abd2(0x1fd)]()===0x0&&(this[_0x48abd2(0x5e8)](this[_0x48abd2(0x15a)]),this[_0x48abd2(0x15a)]=null);},Bitmap[_0x5eb334(0x63b)][_0x5eb334(0x566)]=function(){const _0x1c7d48=_0x5eb334;this[_0x1c7d48(0x62c)]=new Image(),this['_image'][_0x1c7d48(0x728)]=this[_0x1c7d48(0x4ed)]['bind'](this),this[_0x1c7d48(0x62c)][_0x1c7d48(0x30a)]=this[_0x1c7d48(0x417)][_0x1c7d48(0x1fa)](this),this[_0x1c7d48(0x19e)](),this['_loadingState']='loading',Utils[_0x1c7d48(0x8f1)]()?this[_0x1c7d48(0x86a)]():(this['_image'][_0x1c7d48(0x6b6)]=this[_0x1c7d48(0x67b)],![]&&this['_image'][_0x1c7d48(0x21a)]>0x0&&(this[_0x1c7d48(0x62c)][_0x1c7d48(0x728)]=null,this[_0x1c7d48(0x4ed)]()));};