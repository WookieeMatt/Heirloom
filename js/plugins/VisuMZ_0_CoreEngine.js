//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.68;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.68] [CoreEngine]
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

const _0x2a56e3=_0x3166;(function(_0x391da8,_0x38212d){const _0x36f84f=_0x3166,_0x52ee7d=_0x391da8();while(!![]){try{const _0xd3f043=-parseInt(_0x36f84f(0x7fd))/0x1+parseInt(_0x36f84f(0x4fc))/0x2*(parseInt(_0x36f84f(0x8a0))/0x3)+parseInt(_0x36f84f(0x915))/0x4+-parseInt(_0x36f84f(0x213))/0x5+parseInt(_0x36f84f(0x8e7))/0x6+-parseInt(_0x36f84f(0x4e3))/0x7+parseInt(_0x36f84f(0x3f1))/0x8*(parseInt(_0x36f84f(0x358))/0x9);if(_0xd3f043===_0x38212d)break;else _0x52ee7d['push'](_0x52ee7d['shift']());}catch(_0x520870){_0x52ee7d['push'](_0x52ee7d['shift']());}}}(_0x4df4,0x5e477));var label=_0x2a56e3(0x803),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2a56e3(0x513)](function(_0x55d4b5){const _0x254c1e=_0x2a56e3;return _0x55d4b5[_0x254c1e(0x21c)]&&_0x55d4b5[_0x254c1e(0x2bf)]['includes']('['+label+']');})[0x0];function _0x3166(_0x4fb702,_0x464a99){const _0x4df419=_0x4df4();return _0x3166=function(_0x31669a,_0xcfd293){_0x31669a=_0x31669a-0x118;let _0x185390=_0x4df419[_0x31669a];return _0x185390;},_0x3166(_0x4fb702,_0x464a99);}VisuMZ[label][_0x2a56e3(0x3f7)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x2a56e3(0x820)]=function(_0x6dcd9f,_0x5ea1d1){const _0x398f73=_0x2a56e3;for(const _0x2b83d3 in _0x5ea1d1){if(_0x2b83d3['match'](/(.*):(.*)/i)){const _0x326052=String(RegExp['$1']),_0x33c379=String(RegExp['$2'])[_0x398f73(0x67c)]()[_0x398f73(0x74d)]();let _0x40f39c,_0x3a3600,_0x158a56;switch(_0x33c379){case _0x398f73(0x5d9):_0x40f39c=_0x5ea1d1[_0x2b83d3]!==''?Number(_0x5ea1d1[_0x2b83d3]):0x0;break;case'ARRAYNUM':_0x3a3600=_0x5ea1d1[_0x2b83d3]!==''?JSON[_0x398f73(0x198)](_0x5ea1d1[_0x2b83d3]):[],_0x40f39c=_0x3a3600[_0x398f73(0x48a)](_0x3a15c1=>Number(_0x3a15c1));break;case _0x398f73(0x215):_0x40f39c=_0x5ea1d1[_0x2b83d3]!==''?eval(_0x5ea1d1[_0x2b83d3]):null;break;case'ARRAYEVAL':_0x3a3600=_0x5ea1d1[_0x2b83d3]!==''?JSON[_0x398f73(0x198)](_0x5ea1d1[_0x2b83d3]):[],_0x40f39c=_0x3a3600[_0x398f73(0x48a)](_0x572dbb=>eval(_0x572dbb));break;case _0x398f73(0x724):_0x40f39c=_0x5ea1d1[_0x2b83d3]!==''?JSON[_0x398f73(0x198)](_0x5ea1d1[_0x2b83d3]):'';break;case _0x398f73(0x236):_0x3a3600=_0x5ea1d1[_0x2b83d3]!==''?JSON['parse'](_0x5ea1d1[_0x2b83d3]):[],_0x40f39c=_0x3a3600[_0x398f73(0x48a)](_0x5311fb=>JSON[_0x398f73(0x198)](_0x5311fb));break;case'FUNC':_0x40f39c=_0x5ea1d1[_0x2b83d3]!==''?new Function(JSON[_0x398f73(0x198)](_0x5ea1d1[_0x2b83d3])):new Function(_0x398f73(0x3a4));break;case'ARRAYFUNC':_0x3a3600=_0x5ea1d1[_0x2b83d3]!==''?JSON[_0x398f73(0x198)](_0x5ea1d1[_0x2b83d3]):[],_0x40f39c=_0x3a3600[_0x398f73(0x48a)](_0x4de509=>new Function(JSON[_0x398f73(0x198)](_0x4de509)));break;case _0x398f73(0x268):_0x40f39c=_0x5ea1d1[_0x2b83d3]!==''?String(_0x5ea1d1[_0x2b83d3]):'';break;case _0x398f73(0x3be):_0x3a3600=_0x5ea1d1[_0x2b83d3]!==''?JSON[_0x398f73(0x198)](_0x5ea1d1[_0x2b83d3]):[],_0x40f39c=_0x3a3600['map'](_0x2cfdef=>String(_0x2cfdef));break;case _0x398f73(0x74f):_0x158a56=_0x5ea1d1[_0x2b83d3]!==''?JSON[_0x398f73(0x198)](_0x5ea1d1[_0x2b83d3]):{},_0x6dcd9f[_0x326052]={},VisuMZ[_0x398f73(0x820)](_0x6dcd9f[_0x326052],_0x158a56);continue;case _0x398f73(0x5e1):_0x3a3600=_0x5ea1d1[_0x2b83d3]!==''?JSON[_0x398f73(0x198)](_0x5ea1d1[_0x2b83d3]):[],_0x40f39c=_0x3a3600[_0x398f73(0x48a)](_0x1fa048=>VisuMZ[_0x398f73(0x820)]({},JSON[_0x398f73(0x198)](_0x1fa048)));break;default:continue;}_0x6dcd9f[_0x326052]=_0x40f39c;}}return _0x6dcd9f;},VisuMZ['CoreEngine'][_0x2a56e3(0x4cb)]=SceneManager[_0x2a56e3(0x8ec)],SceneManager['exit']=function(){const _0x8fa0b1=_0x2a56e3;VisuMZ[_0x8fa0b1(0x803)][_0x8fa0b1(0x4cb)][_0x8fa0b1(0x697)](this);if(Utils[_0x8fa0b1(0x675)]>=_0x8fa0b1(0x1a3)){if(typeof nw==='object')nw[_0x8fa0b1(0x47b)][_0x8fa0b1(0x4e6)]();}},(_0x572059=>{const _0x5dcff9=_0x2a56e3,_0x4d0146=_0x572059['name'];for(const _0x684e29 of dependencies){if('hpdIz'===_0x5dcff9(0x6ff))this[_0x5dcff9(0x590)](0x0);else{if(!Imported[_0x684e29]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x5dcff9(0x6ba)](_0x4d0146,_0x684e29)),SceneManager[_0x5dcff9(0x8ec)]();break;}}}const _0xbb899b=_0x572059['description'];if(_0xbb899b[_0x5dcff9(0x76d)](/\[Version[ ](.*?)\]/i)){const _0x4f58e6=Number(RegExp['$1']);_0x4f58e6!==VisuMZ[label][_0x5dcff9(0x266)]&&('SQTaS'===_0x5dcff9(0x3eb)?(_0x18e86a[_0x5dcff9(0x803)][_0x5dcff9(0x57b)][_0x5dcff9(0x697)](this),this[_0x5dcff9(0x45c)]()):(alert(_0x5dcff9(0x53a)[_0x5dcff9(0x6ba)](_0x4d0146,_0x4f58e6)),SceneManager[_0x5dcff9(0x8ec)]()));}if(_0xbb899b[_0x5dcff9(0x76d)](/\[Tier[ ](\d+)\]/i)){const _0x23fe91=Number(RegExp['$1']);_0x23fe91<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x4d0146,_0x23fe91,tier)),SceneManager[_0x5dcff9(0x8ec)]()):tier=Math[_0x5dcff9(0x81b)](_0x23fe91,tier);}VisuMZ[_0x5dcff9(0x820)](VisuMZ[label][_0x5dcff9(0x3f7)],_0x572059[_0x5dcff9(0x9b6)]);})(pluginData),((()=>{const _0x4376ad=_0x2a56e3;if(VisuMZ[_0x4376ad(0x803)][_0x4376ad(0x3f7)][_0x4376ad(0x2fc)]['SubfolderParse']??!![])for(const _0x37b035 in $plugins){if(_0x4376ad(0x53c)===_0x4376ad(0x3ba))_0x3f7d8a+=_0x516750(_0x13978d);else{const _0x43eb53=$plugins[_0x37b035];_0x43eb53[_0x4376ad(0x6f5)][_0x4376ad(0x76d)](/(.*)\/(.*)/i)&&(_0x43eb53[_0x4376ad(0x6f5)]=String(RegExp['$2'][_0x4376ad(0x74d)]()));}}})()),PluginManager['registerCommand'](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x421),_0x308806=>{const _0x1b2374=_0x2a56e3;if(!SceneManager[_0x1b2374(0x97a)])return;if(!SceneManager[_0x1b2374(0x97a)][_0x1b2374(0x482)])return;VisuMZ[_0x1b2374(0x820)](_0x308806,_0x308806);const _0x15fb7c=Math[_0x1b2374(0x377)](_0x308806['pointX']),_0x342fa2=Math[_0x1b2374(0x377)](_0x308806['pointY']);$gameTemp['requestPointAnimation'](_0x15fb7c,_0x342fa2,_0x308806[_0x1b2374(0x672)],_0x308806['Mirror'],_0x308806[_0x1b2374(0x691)]);}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],'AudioChangeBgmVolume',_0x1b8187=>{const _0x487d2e=_0x2a56e3;VisuMZ[_0x487d2e(0x820)](_0x1b8187,_0x1b8187);const _0x3d6800=Math[_0x487d2e(0x377)](_0x1b8187[_0x487d2e(0x16b)])[_0x487d2e(0x459)](0x0,0x64),_0x534a8f=AudioManager[_0x487d2e(0x263)];if(_0x534a8f){if('oDFlR'!=='oDFlR')return _0x2d19af['CoreEngine'][_0x487d2e(0x3f7)]['UI'][_0x487d2e(0x4ba)];else _0x534a8f[_0x487d2e(0x16b)]=_0x3d6800,console[_0x487d2e(0x68a)](_0x534a8f),AudioManager[_0x487d2e(0x87f)](_0x534a8f);}}),PluginManager[_0x2a56e3(0x35c)](pluginData['name'],_0x2a56e3(0x90e),_0x369bce=>{const _0x4599f8=_0x2a56e3;VisuMZ[_0x4599f8(0x820)](_0x369bce,_0x369bce);const _0x3a8cc0=Math[_0x4599f8(0x377)](_0x369bce['pitch'])[_0x4599f8(0x459)](0x32,0x96),_0x250622=AudioManager['_currentBgm'];_0x250622&&(_0x250622[_0x4599f8(0x3b9)]=_0x3a8cc0,AudioManager[_0x4599f8(0x87f)](_0x250622));}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x930),_0x47eec5=>{const _0x81b761=_0x2a56e3;VisuMZ[_0x81b761(0x820)](_0x47eec5,_0x47eec5);const _0x3de45a=Math[_0x81b761(0x377)](_0x47eec5[_0x81b761(0x5f3)])['clamp'](-0x64,0x64),_0x406406=AudioManager['_currentBgm'];if(_0x406406){if(_0x81b761(0x6ca)!==_0x81b761(0x6ca)){var _0x444db4=_0x1c0ea7(_0x118c19['$1']);try{_0x155e1d*=_0x4d81f1(_0x444db4);}catch(_0x3a5ad0){if(_0x2bfb95[_0x81b761(0x7f4)]())_0xa73357['log'](_0x3a5ad0);}}else _0x406406['pan']=_0x3de45a,AudioManager[_0x81b761(0x87f)](_0x406406);}}),PluginManager['registerCommand'](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x1e0),_0x598736=>{const _0x4cd5e3=_0x2a56e3;VisuMZ[_0x4cd5e3(0x820)](_0x598736,_0x598736);const _0x1cdf9e=Math[_0x4cd5e3(0x377)](_0x598736[_0x4cd5e3(0x16b)])['clamp'](0x0,0x64),_0x40a0ef=AudioManager[_0x4cd5e3(0x157)];_0x40a0ef&&(_0x40a0ef[_0x4cd5e3(0x16b)]=_0x1cdf9e,AudioManager['playBgs'](_0x40a0ef));}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x3bd),_0x16a7b7=>{const _0x23538e=_0x2a56e3;VisuMZ['ConvertParams'](_0x16a7b7,_0x16a7b7);const _0x3682d8=Math[_0x23538e(0x377)](_0x16a7b7['pitch'])['clamp'](0x32,0x96),_0x2ddc4d=AudioManager['_currentBgs'];_0x2ddc4d&&(_0x2ddc4d[_0x23538e(0x3b9)]=_0x3682d8,AudioManager[_0x23538e(0x2e6)](_0x2ddc4d));}),PluginManager[_0x2a56e3(0x35c)](pluginData['name'],_0x2a56e3(0x2c2),_0x2e6c1f=>{const _0x1b0622=_0x2a56e3;VisuMZ[_0x1b0622(0x820)](_0x2e6c1f,_0x2e6c1f);const _0x503f64=Math[_0x1b0622(0x377)](_0x2e6c1f[_0x1b0622(0x5f3)])['clamp'](-0x64,0x64),_0x6b603c=AudioManager[_0x1b0622(0x157)];_0x6b603c&&(_0x6b603c[_0x1b0622(0x5f3)]=_0x503f64,AudioManager[_0x1b0622(0x2e6)](_0x6b603c));}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],'DebugConsoleLastControllerID',_0x24b548=>{const _0x45654f=_0x2a56e3;if(!$gameTemp[_0x45654f(0x7f4)]())return;const _0x537e2d=Input[_0x45654f(0x638)]();navigator[_0x45654f(0x72c)]&&navigator[_0x45654f(0x72c)]['writeText'](_0x537e2d);}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x799),_0x29360f=>{const _0xad74a2=_0x2a56e3;if(!$gameTemp[_0xad74a2(0x7f4)]())return;if(!Utils['isNwjs']())return;SceneManager['_scene']['_active']=![],VisuMZ['CoreEngine'][_0xad74a2(0x486)]();}),PluginManager[_0x2a56e3(0x35c)](pluginData['name'],_0x2a56e3(0x462),_0xf3604a=>{const _0xa00033=_0x2a56e3;if(!$gameTemp[_0xa00033(0x7f4)]())return;if(!Utils[_0xa00033(0x363)]())return;SceneManager[_0xa00033(0x97a)][_0xa00033(0x531)]=![],VisuMZ[_0xa00033(0x803)][_0xa00033(0x8a2)]();}),PluginManager['registerCommand'](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x54a),_0x5f2edf=>{const _0x5ea112=_0x2a56e3;if(!$gameTemp[_0x5ea112(0x7f4)]())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap['mapId']()<=0x0)return;VisuMZ[_0x5ea112(0x820)](_0x5f2edf,_0x5f2edf);const _0x5e095d='Map%1'[_0x5ea112(0x6ba)]($gameMap[_0x5ea112(0x6f3)]()[_0x5ea112(0x58b)](0x3)),_0x440eb2=VisuMZ['CoreEngine'][_0x5ea112(0x926)]($gameMap['mapId']());VisuMZ[_0x5ea112(0x803)][_0x5ea112(0x415)](_0x440eb2,_0x5e095d,!![]);}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x8c7),_0x26d21c=>{const _0x4badea=_0x2a56e3;if(!$gameTemp[_0x4badea(0x7f4)]())return;if(!Utils[_0x4badea(0x363)]())return;if(!$gameParty[_0x4badea(0x141)]())return;VisuMZ[_0x4badea(0x820)](_0x26d21c,_0x26d21c);const _0x4e78f3='Troop%1'[_0x4badea(0x6ba)]($gameTroop[_0x4badea(0x40c)][_0x4badea(0x58b)](0x4)),_0x443f7d=VisuMZ[_0x4badea(0x803)][_0x4badea(0x5ff)]($gameTroop[_0x4badea(0x40c)]);VisuMZ['CoreEngine'][_0x4badea(0x415)](_0x443f7d,_0x4e78f3,!![]);}),VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x415)]=function(_0x119aaa,_0x2d39b7,_0x121a40){const _0x26adeb=_0x2a56e3,_0x16515e=require('fs');let _0x50058f=_0x26adeb(0x844)[_0x26adeb(0x6ba)](_0x2d39b7||'0');_0x16515e[_0x26adeb(0x781)](_0x50058f,_0x119aaa,_0x3c8985=>{const _0x2a202e=_0x26adeb;if(_0x3c8985)throw err;else _0x121a40&&alert(_0x2a202e(0x6d9)['format'](_0x50058f));});},VisuMZ['CoreEngine'][_0x2a56e3(0x486)]=function(){const _0x12d3f5=_0x2a56e3,_0x30d3c8=[];for(const _0x4ded59 of $dataMapInfos){if(!_0x4ded59)continue;_0x30d3c8[_0x12d3f5(0x487)](_0x4ded59['id']);}const _0x368472=_0x30d3c8[_0x12d3f5(0x9b5)]*0x64+Math[_0x12d3f5(0x5de)](0x64);alert(_0x12d3f5(0x262)[_0x12d3f5(0x6ba)](_0x368472)),this[_0x12d3f5(0x183)]=[],this[_0x12d3f5(0x7a3)]=$dataMap;for(const _0x21b49d of _0x30d3c8){VisuMZ[_0x12d3f5(0x803)][_0x12d3f5(0x8f5)](_0x21b49d);}setTimeout(VisuMZ[_0x12d3f5(0x803)][_0x12d3f5(0x903)][_0x12d3f5(0x63d)](this),_0x368472);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x8f5)]=function(_0x714ed){const _0x439926=_0x2a56e3,_0x44e5b9=_0x439926(0x9af)['format'](_0x714ed[_0x439926(0x58b)](0x3)),_0x200b22=new XMLHttpRequest(),_0x3cd571=_0x439926(0x727)+_0x44e5b9;_0x200b22['open']('GET',_0x3cd571),_0x200b22[_0x439926(0x6a8)](_0x439926(0x845)),_0x200b22[_0x439926(0x382)]=()=>this[_0x439926(0x878)](_0x200b22,_0x714ed,_0x44e5b9,_0x3cd571),_0x200b22[_0x439926(0x7f9)]=()=>DataManager[_0x439926(0x26a)]('$dataMap',_0x44e5b9,_0x3cd571),_0x200b22[_0x439926(0x57f)]();},VisuMZ['CoreEngine']['storeMapData']=function(_0x1fcda0,_0x32eebe,_0xb55bfb,_0x4a745f){const _0x117372=_0x2a56e3;$dataMap=JSON['parse'](_0x1fcda0[_0x117372(0x29c)]),DataManager[_0x117372(0x225)]($dataMap),this[_0x117372(0x183)][_0x32eebe]=VisuMZ[_0x117372(0x803)][_0x117372(0x926)](_0x32eebe),$dataMap=this['_currentMap'];},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x903)]=function(){const _0x41614b=_0x2a56e3,_0x19253f='AllMaps';this[_0x41614b(0x183)]['remove'](undefined)['remove']('')[_0x41614b(0x738)](null);const _0x1645c2=this[_0x41614b(0x183)]['join'](_0x41614b(0x56f))[_0x41614b(0x74d)]();VisuMZ[_0x41614b(0x803)][_0x41614b(0x415)](_0x1645c2,_0x19253f,!![]),SceneManager[_0x41614b(0x97a)][_0x41614b(0x531)]=!![];},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x926)]=function(_0x4932b8){const _0x43a1de=_0x2a56e3;if(!$dataMap)return'';let _0x263b35='█'[_0x43a1de(0x8ef)](0x46)+'\x0a\x0a',_0x134823='═'['repeat'](0x46)+'\x0a\x0a',_0x3581b4='';this[_0x43a1de(0x1a5)]=0x0;for(const _0x5c2f35 of $dataMap[_0x43a1de(0x4d7)]){if(!_0x5c2f35)continue;let _0x343366=_0x5c2f35['id'],_0x158c3e=_0x5c2f35[_0x43a1de(0x6f5)],_0x19ef16=_0x5c2f35[_0x43a1de(0x5a7)];for(const _0x296b67 of _0x19ef16){if('dPTku'===_0x43a1de(0x26b))return _0x58783f[_0x43a1de(0x803)][_0x43a1de(0x4a0)][_0x43a1de(0x697)](this,_0x45f3cc);else{const _0xdb3d44=_0x19ef16['indexOf'](_0x296b67)+0x1;let _0x54e707=_0x134823+_0x43a1de(0x7d4),_0x494f75=VisuMZ[_0x43a1de(0x803)][_0x43a1de(0x574)](_0x296b67[_0x43a1de(0x327)]);if(_0x494f75[_0x43a1de(0x9b5)]>0x0){if(_0x43a1de(0x8ab)!=='alwid')return _0x192037;else{if(_0x3581b4[_0x43a1de(0x9b5)]>0x0){if(_0x43a1de(0x42d)!==_0x43a1de(0x42d)){var _0x29b69b=_0x3fdee7(_0x2b3f7b['$1']);try{_0x4e986f*=_0x296fbb(_0x29b69b);}catch(_0x1110b7){if(_0x427df4['isPlaytest']())_0x50281b[_0x43a1de(0x68a)](_0x1110b7);}}else _0x3581b4+=_0x134823+_0x43a1de(0x56f);}else{const _0x21caab=$dataMapInfos[_0x4932b8][_0x43a1de(0x6f5)];_0x3581b4+=_0x263b35+_0x43a1de(0x69b)[_0x43a1de(0x6ba)](_0x4932b8,_0x21caab||_0x43a1de(0x1f9))+_0x263b35;}_0x3581b4+=_0x54e707['format'](_0x343366,_0x158c3e,_0xdb3d44,_0x494f75);}}}}}return _0x3581b4[_0x43a1de(0x9b5)]>0x0&&(_0x43a1de(0x83b)!==_0x43a1de(0x83b)?this['setup'](_0x31e7e7[_0x43a1de(0x327)],0x0):_0x3581b4+=_0x134823),_0x3581b4;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x8a2)]=function(){const _0x5627a9=_0x2a56e3,_0x40fae2=$dataTroops[_0x5627a9(0x9b5)]*0xa+Math[_0x5627a9(0x5de)](0xa);alert('Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x5627a9(0x6ba)](_0x40fae2));const _0x4f7c6f=[];for(const _0xdf9299 of $dataTroops){if(_0x5627a9(0x422)===_0x5627a9(0x422)){if(!_0xdf9299)continue;const _0x3e5d59=_0xdf9299['id'];_0x4f7c6f[_0x3e5d59]=VisuMZ['CoreEngine'][_0x5627a9(0x5ff)](_0x3e5d59);}else return this[_0x5627a9(0x5d8)]()?this[_0x5627a9(0x695)](_0x2892ab,_0x39a47d):_0x582fc4[_0x5627a9(0x803)][_0x5627a9(0x7f8)]['call'](this,_0x522963,_0x2321d1);}setTimeout(VisuMZ['CoreEngine'][_0x5627a9(0x4ef)][_0x5627a9(0x63d)](this,_0x4f7c6f),_0x40fae2);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x5ff)]=function(_0x573165){const _0x59c1b5=_0x2a56e3;if(!$dataTroops[_0x573165])return'';let _0x5aa534='█'[_0x59c1b5(0x8ef)](0x46)+'\x0a\x0a',_0x239d7a='═'[_0x59c1b5(0x8ef)](0x46)+'\x0a\x0a',_0x1c3ca0='';this['_commonEventLayers']=0x0;const _0x3f173d=$dataTroops[_0x573165];let _0x3f325a=_0x3f173d[_0x59c1b5(0x5a7)];for(const _0x3a9154 of _0x3f325a){const _0x3d8188=_0x3f325a[_0x59c1b5(0x90a)](_0x3a9154)+0x1;let _0x1019ef=_0x239d7a+_0x59c1b5(0x978),_0x12835c=VisuMZ['CoreEngine'][_0x59c1b5(0x574)](_0x3a9154[_0x59c1b5(0x327)]);_0x12835c[_0x59c1b5(0x9b5)]>0x0&&(_0x1c3ca0[_0x59c1b5(0x9b5)]>0x0?_0x59c1b5(0x376)!=='lTZUH'?_0x1c3ca0+=_0x239d7a+'\x0a\x0a\x0a\x0a\x0a':(this['scaleSprite'](_0xd1dd64),this[_0x59c1b5(0x8c3)](_0x22e151)):_0x1c3ca0+=_0x5aa534+_0x59c1b5(0x4bb)[_0x59c1b5(0x6ba)](_0x573165,_0x3f173d[_0x59c1b5(0x6f5)]||_0x59c1b5(0x1f9))+_0x5aa534,_0x1c3ca0+=_0x1019ef[_0x59c1b5(0x6ba)](_0x3d8188,_0x12835c));}if(_0x1c3ca0['length']>0x0){if(_0x59c1b5(0x17c)!==_0x59c1b5(0x77f))_0x1c3ca0+=_0x239d7a;else{for(const _0x3b0100 of this[_0x59c1b5(0x280)]){!_0x3b0100[_0x59c1b5(0x372)]()&&this[_0x59c1b5(0x7b6)](_0x3b0100);}this['processFauxAnimationRequests']();}}return _0x1c3ca0;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x4ef)]=function(_0x7d0fef){const _0x5bcfba=_0x2a56e3,_0x55414c=_0x5bcfba(0x5e3);_0x7d0fef['remove'](undefined)[_0x5bcfba(0x738)]('')[_0x5bcfba(0x738)](null);const _0x2de739=_0x7d0fef[_0x5bcfba(0x3f6)](_0x5bcfba(0x56f))[_0x5bcfba(0x74d)]();VisuMZ['CoreEngine']['ExportString'](_0x2de739,_0x55414c,!![]),SceneManager[_0x5bcfba(0x97a)]['_active']=!![];},VisuMZ['CoreEngine'][_0x2a56e3(0x574)]=function(_0x33f7d8){const _0x19f347=_0x2a56e3;let _0x2db146='\x0a'+'─'[_0x19f347(0x8ef)](0x46)+'\x0a',_0x1f256f='\x0a'+'┄'[_0x19f347(0x8ef)](0x46)+'\x0a',_0x204525='';for(const _0xdb21cf of _0x33f7d8){if(!_0xdb21cf)continue;if(_0xdb21cf[_0x19f347(0x4bf)]===0x65)_0x204525+=_0x2db146+'\x0a',_0x204525+='〘Show\x20Text〙\x0a',_0xdb21cf[_0x19f347(0x9b6)][0x4]!==''&&_0xdb21cf['parameters'][0x4]!==undefined&&(_0x204525+='【%1】\x0a'[_0x19f347(0x6ba)](_0xdb21cf[_0x19f347(0x9b6)][0x4]));else{if(_0xdb21cf[_0x19f347(0x4bf)]===0x191)_0x19f347(0x54d)!==_0x19f347(0x54d)?this[_0x19f347(0x94d)]['setBackgroundType'](_0xdff75[_0x19f347(0x7c9)][_0x19f347(0x411)]):_0x204525+='%1\x0a'[_0x19f347(0x6ba)](_0xdb21cf['parameters'][0x0]);else{if(_0xdb21cf['code']===0x192)'JeKUn'==='JeKUn'?(_0x204525+=_0x2db146,_0x204525+=_0x19f347(0x4ff)[_0x19f347(0x6ba)](_0x1f256f,_0xdb21cf[_0x19f347(0x9b6)][0x0]+0x1,_0xdb21cf[_0x19f347(0x9b6)][0x1])):this[_0x19f347(0x206)]=![];else{if(_0xdb21cf[_0x19f347(0x4bf)]===0x193){if('fHorf'===_0x19f347(0x6a1))return 0xc0;else _0x204525+=_0x2db146,_0x204525+=_0x19f347(0x44d)[_0x19f347(0x6ba)](_0x1f256f);}else{if(_0xdb21cf['code']===0x194)_0x204525+=_0x2db146,_0x204525+=_0x19f347(0x445)[_0x19f347(0x6ba)](_0x1f256f);else{if(_0xdb21cf['code']===0x69)_0x204525+=_0x2db146+'\x0a',_0x204525+=_0x19f347(0x6f6);else{if(_0xdb21cf['code']===0x6c){if(_0x19f347(0x1b5)===_0x19f347(0x1b5))_0x204525+=_0x2db146+'\x0a',_0x204525+='》Comment《\x0a%1\x0a'[_0x19f347(0x6ba)](_0xdb21cf['parameters'][0x0]);else return _0x3777f8['layoutSettings'][_0x19f347(0x348)][_0x19f347(0x697)](this);}else{if(_0xdb21cf['code']===0x198)_0x204525+=_0x19f347(0x6e2)[_0x19f347(0x6ba)](_0xdb21cf[_0x19f347(0x9b6)][0x0]);else{if(_0xdb21cf['code']===0x75){if(_0x19f347(0x23d)===_0x19f347(0x23d)){const _0x4165a2=$dataCommonEvents[_0xdb21cf['parameters'][0x0]];if(_0x4165a2&&this[_0x19f347(0x1a5)]<=0xa){if(_0x19f347(0x98b)!==_0x19f347(0x98b))return _0x2d2443[_0x19f347(0x7c9)]['StatusRect'][_0x19f347(0x697)](this);else{this[_0x19f347(0x1a5)]++;let _0x498908=VisuMZ[_0x19f347(0x803)][_0x19f347(0x574)](_0x4165a2[_0x19f347(0x327)]);_0x498908[_0x19f347(0x9b5)]>0x0&&(_0x204525+=_0x2db146,_0x204525+=_0x1f256f,_0x204525+=_0x19f347(0x396)[_0x19f347(0x6ba)](_0x4165a2['id'],_0x4165a2['name']),_0x204525+=_0x1f256f,_0x204525+=_0x498908,_0x204525+=_0x1f256f,_0x204525+=_0x19f347(0x582)[_0x19f347(0x6ba)](_0x4165a2['id'],_0x4165a2[_0x19f347(0x6f5)]),_0x204525+=_0x1f256f),this['_commonEventLayers']--;}}}else{if(_0x430ea8[_0x19f347(0x148)]==='SV')return!![];else{if(_0x4db548[_0x19f347(0x148)]==='FV')return![];}if(this[_0x19f347(0x472)]===_0x49a293)this[_0x19f347(0x2d6)]();if(this[_0x19f347(0x472)][_0x19f347(0x302)]===_0x1b1f84)this[_0x19f347(0x2d6)]();return this[_0x19f347(0x472)][_0x19f347(0x302)];}}}}}}}}}}}return _0x204525[_0x19f347(0x9b5)]>0x0&&(_0x204525+=_0x2db146),_0x204525;},PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x3a0),_0x1f9a30=>{const _0x2f7f2e=_0x2a56e3;VisuMZ[_0x2f7f2e(0x820)](_0x1f9a30,_0x1f9a30);const _0x1d92ea=_0x1f9a30['URL'];VisuMZ[_0x2f7f2e(0x8a3)](_0x1d92ea);}),PluginManager[_0x2a56e3(0x35c)](pluginData['name'],_0x2a56e3(0x703),_0x330072=>{const _0x34f30f=_0x2a56e3;VisuMZ[_0x34f30f(0x820)](_0x330072,_0x330072);const _0x1c823b=_0x330072[_0x34f30f(0x7f0)]||0x0;$gameParty['gainGold'](_0x1c823b);}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x932),_0x47fafc=>{const _0x47f6a9=_0x2a56e3;if(!SceneManager[_0x47f6a9(0x47a)]())return;VisuMZ[_0x47f6a9(0x820)](_0x47fafc,_0x47fafc);const _0x171598=_0x47fafc['CommonEventID'];SceneManager['_scene'][_0x47f6a9(0x85d)](_0x171598);}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x1c5),_0x4d2381=>{const _0x290a6f=_0x2a56e3;if(!$gameTemp[_0x290a6f(0x7f4)]())return;if(!Utils[_0x290a6f(0x363)]())return;VisuMZ[_0x290a6f(0x820)](_0x4d2381,_0x4d2381);const _0x33a26c=_0x4d2381[_0x290a6f(0x2ca)]||0x1;$gameTemp[_0x290a6f(0x4ce)]=_0x33a26c;}),PluginManager[_0x2a56e3(0x35c)](pluginData['name'],_0x2a56e3(0x919),_0x13c288=>{const _0x5493e8=_0x2a56e3;VisuMZ[_0x5493e8(0x820)](_0x13c288,_0x13c288);const _0x37951e=_0x13c288[_0x5493e8(0x7c3)]||0x1,_0x228fba=_0x13c288[_0x5493e8(0x9b2)]||'Linear',_0x14b9d4=$gameScreen[_0x5493e8(0x1a8)](_0x37951e);_0x14b9d4&&_0x14b9d4[_0x5493e8(0x3e7)](_0x228fba);}),PluginManager[_0x2a56e3(0x35c)](pluginData['name'],_0x2a56e3(0x6b5),_0x1e6e24=>{const _0x31363e=_0x2a56e3;for(let _0x468d33=0x1;_0x468d33<=0x64;_0x468d33++){'NkVsp'!==_0x31363e(0x432)?$gameScreen[_0x31363e(0x751)](_0x468d33):this[_0x31363e(0x5b9)][_0x31363e(0x7a2)](_0x13772f[_0x31363e(0x7c9)][_0x31363e(0x907)]);}}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x72f),_0x56ee3f=>{const _0x541318=_0x2a56e3;VisuMZ['ConvertParams'](_0x56ee3f,_0x56ee3f);const _0x504049=Math[_0x541318(0x4c9)](_0x56ee3f[_0x541318(0x1dd)],_0x56ee3f['EndingID']),_0xffa6ab=Math['max'](_0x56ee3f[_0x541318(0x1dd)],_0x56ee3f[_0x541318(0x356)]);for(let _0x63ecd5=_0x504049;_0x63ecd5<=_0xffa6ab;_0x63ecd5++){_0x541318(0x428)===_0x541318(0x3b7)?_0x2de693+=_0x1d8489(_0x3cc890):$gameScreen[_0x541318(0x751)](_0x63ecd5);}}),PluginManager[_0x2a56e3(0x35c)](pluginData['name'],_0x2a56e3(0x43e),_0x4bd221=>{const _0xd1c510=_0x2a56e3;VisuMZ[_0xd1c510(0x820)](_0x4bd221,_0x4bd221);const _0x3b1d36=Math[_0xd1c510(0x377)](_0x4bd221[_0xd1c510(0x2ca)])['clamp'](0x1,0x64),_0x584ab6=_0x4bd221[_0xd1c510(0x3f7)],_0x3e4221=_0x584ab6[_0xd1c510(0x8d0)][_0xd1c510(0x459)](0x0,0x1),_0xb92fd9=Math[_0xd1c510(0x377)](_0x584ab6[_0xd1c510(0x26c)]||0x0),_0x105fe5=Math[_0xd1c510(0x377)](_0x584ab6[_0xd1c510(0x773)]||0x0),_0x24a699=Math['round'](_0x584ab6[_0xd1c510(0x7c5)]||0x0),_0x1a3a35=Math[_0xd1c510(0x377)](_0x584ab6['ScaleY']||0x0),_0x296645=Math[_0xd1c510(0x377)](_0x584ab6[_0xd1c510(0x6da)])[_0xd1c510(0x459)](0x0,0xff),_0x489c33=_0x584ab6[_0xd1c510(0x134)],_0x315c22=_0xd1c510(0x20c),_0x2945ff=_0x4bd221['Smooth']?_0xd1c510(0x92a):'Pixelated',_0x539372=_0x315c22[_0xd1c510(0x6ba)](_0x4bd221[_0xd1c510(0x818)],_0x2945ff);$gameScreen[_0xd1c510(0x8d8)](_0x3b1d36,_0x539372,_0x3e4221,_0xb92fd9,_0x105fe5,_0x24a699,_0x1a3a35,_0x296645,_0x489c33);}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x1d6),_0x46c303=>{const _0xb0d0ab=_0x2a56e3;VisuMZ['ConvertParams'](_0x46c303,_0x46c303);const _0x39e9c6=_0x46c303['Type']||_0xb0d0ab(0x300),_0x1914d6=_0x46c303[_0xb0d0ab(0x66c)][_0xb0d0ab(0x459)](0x1,0x9),_0x2dddb8=_0x46c303['Speed']['clamp'](0x1,0x9),_0x36dd06=_0x46c303[_0xb0d0ab(0x1f1)]||0x1,_0x3d557d=_0x46c303['Wait'];$gameScreen[_0xb0d0ab(0x4d6)](_0x39e9c6),$gameScreen[_0xb0d0ab(0x560)](_0x1914d6,_0x2dddb8,_0x36dd06);if(_0x3d557d){const _0x50f86d=$gameTemp[_0xb0d0ab(0x860)]();if(_0x50f86d)_0x50f86d[_0xb0d0ab(0x22b)](_0x36dd06);}}),PluginManager[_0x2a56e3(0x35c)](pluginData['name'],_0x2a56e3(0x6c5),_0x10d6f0=>{const _0x3d0c1c=_0x2a56e3;if($gameParty[_0x3d0c1c(0x141)]())return;VisuMZ[_0x3d0c1c(0x820)](_0x10d6f0,_0x10d6f0);const _0x3741f2=_0x10d6f0[_0x3d0c1c(0x7df)],_0x5ea02d=(_0x10d6f0['Chance']||0x0)/0x64;for(const _0xdff250 of _0x3741f2){if(_0x3d0c1c(0x282)===_0x3d0c1c(0x282)){const _0x345789=Math[_0x3d0c1c(0x300)]()<=_0x5ea02d;$gameSwitches[_0x3d0c1c(0x295)](_0xdff250,_0x345789);}else return _0x272a9b[_0x3d0c1c(0x803)][_0x3d0c1c(0x3f7)][_0x3d0c1c(0x2fc)]['ImprovedAccuracySystem']?0x0:_0x1344b6[_0x3d0c1c(0x803)]['Game_Action_itemEva'][_0x3d0c1c(0x697)](this,_0x2b8ba3);}}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],'SwitchRandomizeRange',_0x4d32ca=>{const _0x177631=_0x2a56e3;if($gameParty[_0x177631(0x141)]())return;VisuMZ[_0x177631(0x820)](_0x4d32ca,_0x4d32ca);const _0x46a600=Math[_0x177631(0x4c9)](_0x4d32ca['StartID'],_0x4d32ca[_0x177631(0x356)]),_0x3bf609=Math[_0x177631(0x81b)](_0x4d32ca[_0x177631(0x1dd)],_0x4d32ca[_0x177631(0x356)]),_0x254f61=(_0x4d32ca['Chance']||0x0)/0x64;for(let _0x573307=_0x46a600;_0x573307<=_0x3bf609;_0x573307++){if(_0x177631(0x35f)!==_0x177631(0x34e)){const _0x58af61=Math[_0x177631(0x300)]()<=_0x254f61;$gameSwitches[_0x177631(0x295)](_0x573307,_0x58af61);}else _0x169777['VisuMZ_2_BattleSystemSTB']&&(this['_forcedBattleSys']=_0x177631(0x339));}}),PluginManager[_0x2a56e3(0x35c)](pluginData['name'],_0x2a56e3(0x1a1),_0x40c5a8=>{const _0x458d08=_0x2a56e3;if($gameParty[_0x458d08(0x141)]())return;VisuMZ[_0x458d08(0x820)](_0x40c5a8,_0x40c5a8);const _0x2c026f=_0x40c5a8[_0x458d08(0x7df)];for(const _0x571e90 of _0x2c026f){if(_0x458d08(0x780)==='WbrbS'){const _0x42d7e1=$gameSwitches[_0x458d08(0x7f0)](_0x571e90);$gameSwitches[_0x458d08(0x295)](_0x571e90,!_0x42d7e1);}else _0x56bd25[_0x458d08(0x803)][_0x458d08(0x3a5)]['call'](this),_0x46e935[_0x458d08(0x45e)]()&&this[_0x458d08(0x502)]();}}),PluginManager['registerCommand'](pluginData['name'],_0x2a56e3(0x5e2),_0x4b9def=>{const _0x4ac950=_0x2a56e3;if($gameParty[_0x4ac950(0x141)]())return;VisuMZ[_0x4ac950(0x820)](_0x4b9def,_0x4b9def);const _0x2c8a13=Math[_0x4ac950(0x4c9)](_0x4b9def[_0x4ac950(0x1dd)],_0x4b9def[_0x4ac950(0x356)]),_0x3755ab=Math[_0x4ac950(0x81b)](_0x4b9def[_0x4ac950(0x1dd)],_0x4b9def[_0x4ac950(0x356)]);for(let _0x1e42eb=_0x2c8a13;_0x1e42eb<=_0x3755ab;_0x1e42eb++){if(_0x4ac950(0x627)===_0x4ac950(0x627)){const _0x162a95=$gameSwitches['value'](_0x1e42eb);$gameSwitches[_0x4ac950(0x295)](_0x1e42eb,!_0x162a95);}else return _0x3081f3[_0x4ac950(0x7c9)][_0x4ac950(0x3f9)][_0x4ac950(0x697)](this);}}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x288),_0x1fa74c=>{const _0x4059d4=_0x2a56e3;VisuMZ[_0x4059d4(0x820)](_0x1fa74c,_0x1fa74c);const _0xcb5f7d=_0x1fa74c[_0x4059d4(0x989)]||0x1;$gameSystem[_0x4059d4(0x5bc)](_0xcb5f7d);}),PluginManager[_0x2a56e3(0x35c)](pluginData['name'],_0x2a56e3(0x8e9),_0x3be4e8=>{const _0x1e2fc9=_0x2a56e3;if($gameParty['inBattle']())return;VisuMZ[_0x1e2fc9(0x820)](_0x3be4e8,_0x3be4e8);const _0x5673e1=_0x3be4e8[_0x1e2fc9(0x989)];if(_0x5673e1[_0x1e2fc9(0x76d)](/Front/i))$gameSystem[_0x1e2fc9(0x8ba)](![]);else{if(_0x5673e1['match'](/Side/i)){if(_0x1e2fc9(0x404)!==_0x1e2fc9(0x8db))$gameSystem[_0x1e2fc9(0x8ba)](!![]);else return this[_0x1e2fc9(0x809)]&&this[_0x1e2fc9(0x809)][_0x1e2fc9(0x575)]?_0x3da109['buttonAssistSwitch']:'';}else $gameSystem[_0x1e2fc9(0x8ba)](!$gameSystem['isSideView']());}}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x27b),_0x992566=>{const _0xc356cf=_0x2a56e3;if($gameParty[_0xc356cf(0x141)]())return;VisuMZ[_0xc356cf(0x820)](_0x992566,_0x992566);const _0x245822=[_0xc356cf(0x62f),_0xc356cf(0x7ce),'me','se'];for(const _0x247eb1 of _0x245822){if(_0xc356cf(0x624)!==_0xc356cf(0x7cf)){const _0x257816=_0x992566[_0x247eb1],_0x12ffb5=_0xc356cf(0x2e3)[_0xc356cf(0x6ba)](_0x247eb1);for(const _0x42715c of _0x257816){if('vZoxI'==='vZoxI')AudioManager[_0xc356cf(0x8e5)](_0x12ffb5,_0x42715c);else{const _0x52ab4c=_0xc356cf(0x1bb);this[_0xc356cf(0x853)]=this[_0xc356cf(0x853)]||{};if(this[_0xc356cf(0x853)][_0x52ab4c])return this[_0xc356cf(0x853)][_0x52ab4c];const _0x505a17=_0x7e547d[_0xc356cf(0x803)]['Settings'][_0xc356cf(0x784)]['ColorMPGauge2'];return this[_0xc356cf(0x70c)](_0x52ab4c,_0x505a17);}}}else return _0x116e70[_0xc356cf(0x746)](_0xca138f,'<','>');}}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],'SystemLoadImages',_0x3f3031=>{const _0x529145=_0x2a56e3;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x3f3031,_0x3f3031);const _0x1d7299=['animations',_0x529145(0x4a8),'battlebacks2',_0x529145(0x210),_0x529145(0x8fb),_0x529145(0x745),'parallaxes',_0x529145(0x390),_0x529145(0x1dc),_0x529145(0x505),'system',_0x529145(0x1c6),_0x529145(0x91b),_0x529145(0x894)];for(const _0x51890e of _0x1d7299){const _0x41eda1=_0x3f3031[_0x51890e],_0x2a9482='img/%1/'[_0x529145(0x6ba)](_0x51890e);for(const _0x433df2 of _0x41eda1){ImageManager[_0x529145(0x673)](_0x2a9482,_0x433df2);}}}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],'SystemSetBattleSystem',_0x231cae=>{const _0x3318ae=_0x2a56e3;if($gameParty[_0x3318ae(0x141)]())return;VisuMZ['ConvertParams'](_0x231cae,_0x231cae);const _0x3a243f=_0x231cae[_0x3318ae(0x989)][_0x3318ae(0x67c)]()[_0x3318ae(0x74d)](),_0x57adb1=VisuMZ['CoreEngine'][_0x3318ae(0x75a)](_0x3a243f);$gameSystem['setBattleSystem'](_0x57adb1);}),VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x75a)]=function(_0x1af926){const _0x525606=_0x2a56e3;_0x1af926=_0x1af926||_0x525606(0x2f6),_0x1af926=String(_0x1af926)[_0x525606(0x67c)]()[_0x525606(0x74d)]();switch(_0x1af926){case'DTB':return 0x0;case _0x525606(0x9ad):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x525606(0x3c7)]=!![]);return 0x1;case'TPB\x20WAIT':if(Imported[_0x525606(0x6ac)]){if(_0x525606(0x902)!==_0x525606(0x589))ConfigManager[_0x525606(0x3c7)]=![];else{let _0x4630d4=0x0,_0x1ef681=_0x2d7d96[_0x525606(0x8c0)]-this['lineHeight'](),_0x1bba40=_0x1d6146['width'],_0x5e5b82=this[_0x525606(0x5c9)]();return new _0x2344d9(_0x4630d4,_0x1ef681,_0x1bba40,_0x5e5b82);}}return 0x2;case _0x525606(0x52d):if(Imported['VisuMZ_2_BattleSystemCTB'])return _0x525606(0x52d);break;case _0x525606(0x339):if(Imported[_0x525606(0x1ad)])return _0x525606(0x7b5)===_0x525606(0x4ae)?_0x1f7635[_0x525606(0x240)]:_0x525606(0x339);break;case'BTB':if(Imported['VisuMZ_2_BattleSystemBTB'])return _0x525606(0x563);break;case _0x525606(0x873):if(Imported[_0x525606(0x6f2)])return _0x525606(0x873);break;case _0x525606(0x299):if(Imported[_0x525606(0x36d)]){if(_0x525606(0x72b)!=='VBnXS')!this['_repositioned']&&(this[_0x525606(0x6dc)]+=_0x1d81d5[_0x525606(0x377)]((_0x2d0021[_0x525606(0x8c0)]-0x270)/0x2),this[_0x525606(0x6dc)]-=_0x308c4b[_0x525606(0x6ad)]((_0x308cd3[_0x525606(0x8c0)]-_0x5837c0['boxHeight'])/0x2),_0x3b9cf7[_0x525606(0x351)]()?this[_0x525606(0x291)]-=_0x1d4985[_0x525606(0x6ad)]((_0x3f6aa2[_0x525606(0x290)]-_0x170b3f[_0x525606(0x3dd)])/0x2):this[_0x525606(0x291)]+=_0x2e662b[_0x525606(0x377)]((_0xff9a3b['boxWidth']-0x330)/0x2)),this[_0x525606(0x495)]=!![];else return'OTB';}break;case _0x525606(0x32f):if(Imported['VisuMZ_2_BattleSystemETB'])return _0x525606(0x32f);break;case _0x525606(0x653):if(Imported[_0x525606(0x570)]){if('WvQCR'!==_0x525606(0x82e))_0x525b0e[_0x525606(0x8ba)](![]);else return _0x525606(0x653);}break;}return $dataSystem[_0x525606(0x21e)];},PluginManager['registerCommand'](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x400),_0x44d69d=>{const _0x4fd539=_0x2a56e3;VisuMZ[_0x4fd539(0x820)](_0x44d69d,_0x44d69d);const _0x3976d0=_0x44d69d[_0x4fd539(0x989)]||0x1;$gameSystem[_0x4fd539(0x4e7)](_0x3976d0);}),PluginManager[_0x2a56e3(0x35c)](pluginData['name'],_0x2a56e3(0x35d),_0x298185=>{const _0x267ad3=_0x2a56e3;VisuMZ[_0x267ad3(0x820)](_0x298185,_0x298185);const _0x42db02=_0x298185['id']||0x1,_0x4f9922=_0x298185[_0x267ad3(0x4ad)],_0x3b210b=_0x298185[_0x267ad3(0x5a2)]||0x0;let _0x3519ac=$gameVariables[_0x267ad3(0x7f0)](_0x42db02)||0x0;switch(_0x4f9922){case'=':_0x3519ac=_0x3b210b;break;case'+':_0x3519ac+=_0x3b210b;break;case'-':_0x3519ac-=_0x3b210b;break;case'*':_0x3519ac*=_0x3b210b;break;case'/':_0x3519ac/=_0x3b210b;break;case'%':_0x3519ac%=_0x3b210b;break;}_0x3519ac=_0x3519ac||0x0,$gameVariables['setValue'](_0x42db02,_0x3519ac);}),PluginManager[_0x2a56e3(0x35c)](pluginData[_0x2a56e3(0x6f5)],_0x2a56e3(0x32d),_0x4ea335=>{const _0x43521d=_0x2a56e3;VisuMZ[_0x43521d(0x820)](_0x4ea335,_0x4ea335);const _0x45c940=_0x4ea335['id']()||0x1,_0x5a54a5=_0x4ea335[_0x43521d(0x4ad)],_0xe82d30=_0x4ea335[_0x43521d(0x5a2)]()||0x0;let _0x2496db=$gameVariables['value'](_0x45c940)||0x0;switch(_0x5a54a5){case'=':_0x2496db=_0xe82d30;break;case'+':_0x2496db+=_0xe82d30;break;case'-':_0x2496db-=_0xe82d30;break;case'*':_0x2496db*=_0xe82d30;break;case'/':_0x2496db/=_0xe82d30;break;case'%':_0x2496db%=_0xe82d30;break;}_0x2496db=_0x2496db||0x0,$gameVariables[_0x43521d(0x295)](_0x45c940,_0x2496db);}),VisuMZ['CoreEngine']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x2a56e3(0x948)][_0x2a56e3(0x2e0)],Scene_Boot[_0x2a56e3(0x948)][_0x2a56e3(0x2e0)]=function(){const _0x4d6f99=_0x2a56e3;VisuMZ[_0x4d6f99(0x803)][_0x4d6f99(0x621)][_0x4d6f99(0x697)](this),this[_0x4d6f99(0x4f3)](),this[_0x4d6f99(0x28b)](),this[_0x4d6f99(0x145)](),this['process_VisuMZ_CoreEngine_Functions'](),this[_0x4d6f99(0x683)](),this[_0x4d6f99(0x547)](),VisuMZ[_0x4d6f99(0x6ec)]();},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x59c)]={},Scene_Boot[_0x2a56e3(0x948)]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x119510=_0x2a56e3,_0x3b82d3=['MAXHP',_0x119510(0x990),_0x119510(0x500),'DEF',_0x119510(0x7bf),_0x119510(0x1e3),_0x119510(0x2f9),_0x119510(0x623)],_0x239e23=[_0x119510(0x98e),_0x119510(0x59a),_0x119510(0x16a),'CEV',_0x119510(0x227),_0x119510(0x5f0),_0x119510(0x388),_0x119510(0x9b0),'MRG',_0x119510(0x51a)],_0x5688ce=[_0x119510(0x2b0),_0x119510(0x8d6),'REC',_0x119510(0x3ec),'MCR',_0x119510(0x3d4),_0x119510(0x8eb),_0x119510(0x436),_0x119510(0x4ca),_0x119510(0x92e)],_0xd8c1b0=[_0x3b82d3,_0x239e23,_0x5688ce],_0x181162=[_0x119510(0x565),_0x119510(0x31d),'Plus2',_0x119510(0x968),'Rate',_0x119510(0x25a),_0x119510(0x3c5),_0x119510(0x441),_0x119510(0x63f),'Flat2'];for(const _0x3aedba of _0xd8c1b0){if(_0x119510(0x2de)!=='NcYqI'){let _0x4bb40b='';if(_0x3aedba===_0x3b82d3)_0x4bb40b='param';if(_0x3aedba===_0x239e23)_0x4bb40b=_0x119510(0x35e);if(_0x3aedba===_0x5688ce)_0x4bb40b=_0x119510(0x2ef);for(const _0x51c802 of _0x181162){let _0x39291c=_0x119510(0x347)[_0x119510(0x6ba)](_0x4bb40b,_0x51c802);VisuMZ[_0x119510(0x803)]['RegExp'][_0x39291c]=[],VisuMZ['CoreEngine'][_0x119510(0x59c)][_0x39291c+'JS']=[];let _0x4650a4=_0x119510(0x1ae);if([_0x119510(0x565),_0x119510(0x441)]['includes'](_0x51c802))'zMZVH'===_0x119510(0x57e)?_0x4650a4+=_0x119510(0x49d):this[_0x119510(0x8f9)]=_0x119510(0x653);else{if([_0x119510(0x31d),_0x119510(0x63f)]['includes'](_0x51c802))_0x4650a4+=_0x119510(0x688);else{if(['Plus2',_0x119510(0x14b)]['includes'](_0x51c802)){if(_0x119510(0x155)!==_0x119510(0x523))_0x4650a4+=_0x119510(0x76e);else return this[_0x119510(0x767)]();}else{if(_0x51c802===_0x119510(0x968))_0x4650a4+=_0x119510(0x274);else{if(_0x51c802===_0x119510(0x25a)){if(_0x119510(0x910)!==_0x119510(0x910))return this['subject']()[_0x119510(0x756)]+0.05;else _0x4650a4+=_0x119510(0x8ff);}else _0x51c802==='Rate2'&&(_0x4650a4+=_0x119510(0x6c8));}}}}for(const _0x88782a of _0x3aedba){let _0x125b1b=_0x51c802[_0x119510(0x725)](/[\d+]/g,'')[_0x119510(0x67c)]();const _0x7575eb=_0x4650a4[_0x119510(0x6ba)](_0x88782a,_0x125b1b);VisuMZ['CoreEngine'][_0x119510(0x59c)][_0x39291c][_0x119510(0x487)](new RegExp(_0x7575eb,'i'));const _0x21f198='<JS\x20%1\x20%2:[\x20](.*)>'[_0x119510(0x6ba)](_0x88782a,_0x125b1b);VisuMZ[_0x119510(0x803)][_0x119510(0x59c)][_0x39291c+'JS'][_0x119510(0x487)](new RegExp(_0x21f198,'i'));}}}else{const _0x2856d0=(_0x1cba4a[_0x119510(0x803)][_0x119510(0x3f7)][_0x119510(0x961)]||_0x119510(0x2f6))[_0x119510(0x67c)]()[_0x119510(0x74d)]();return _0x48e445['CoreEngine']['CreateBattleSystemID'](_0x2856d0);}}},Scene_Boot[_0x2a56e3(0x948)][_0x2a56e3(0x28b)]=function(){const _0x521a78=_0x2a56e3;if(VisuMZ[_0x521a78(0x6ec)])return;},Scene_Boot['prototype'][_0x2a56e3(0x145)]=function(){const _0x44b009=_0x2a56e3,_0x3baf4b=VisuMZ['CoreEngine'][_0x44b009(0x3f7)];_0x3baf4b[_0x44b009(0x2fc)][_0x44b009(0x671)]&&('KpXIZ'!==_0x44b009(0x3f5)?this[_0x44b009(0x66d)]():VisuMZ[_0x44b009(0x64f)](!![]));_0x3baf4b[_0x44b009(0x2fc)][_0x44b009(0x200)]&&(Input[_0x44b009(0x54b)][0x23]=_0x44b009(0x8ca),Input[_0x44b009(0x54b)][0x24]=_0x44b009(0x9a8));if(_0x3baf4b['ButtonAssist']){const _0x5636d0=_0x3baf4b['ButtonAssist'];_0x5636d0[_0x44b009(0x985)]=_0x5636d0[_0x44b009(0x985)]||_0x44b009(0x663),_0x5636d0[_0x44b009(0x77a)]=_0x5636d0[_0x44b009(0x77a)]||_0x44b009(0x9b7);}if(_0x3baf4b['KeyboardInput'][_0x44b009(0x1f8)]){if(_0x44b009(0x669)===_0x44b009(0x669))Input[_0x44b009(0x54b)][0x57]='up',Input[_0x44b009(0x54b)][0x41]=_0x44b009(0x58e),Input[_0x44b009(0x54b)][0x53]=_0x44b009(0x882),Input['keyMapper'][0x44]='right',Input[_0x44b009(0x54b)][0x45]=_0x44b009(0x465);else{if(_0xa0768d[_0x44b009(0x141)]())return;_0x1ed25c[_0x44b009(0x820)](_0x1a845d,_0x56e338);const _0xf2fa79=_0x3347e8[_0x44b009(0x7df)];for(const _0x3ce97e of _0xf2fa79){const _0x4de825=_0x2456b5[_0x44b009(0x7f0)](_0x3ce97e);_0x330446[_0x44b009(0x295)](_0x3ce97e,!_0x4de825);}}}_0x3baf4b['KeyboardInput'][_0x44b009(0x17b)]&&(Input[_0x44b009(0x54b)][0x52]=_0x44b009(0x6be)),_0x3baf4b[_0x44b009(0x4b7)][_0x44b009(0x97e)]=_0x3baf4b[_0x44b009(0x4b7)]['DisplayedParams']['map'](_0x5e54e6=>_0x5e54e6[_0x44b009(0x67c)]()[_0x44b009(0x74d)]()),_0x3baf4b['Param'][_0x44b009(0x7ad)]=_0x3baf4b['Param'][_0x44b009(0x7ad)][_0x44b009(0x48a)](_0xa7eaf1=>_0xa7eaf1[_0x44b009(0x67c)]()['trim']());},Scene_Boot[_0x2a56e3(0x948)][_0x2a56e3(0x633)]=function(){this['process_VisuMZ_CoreEngine_jsQuickFunctions']();},Scene_Boot['prototype'][_0x2a56e3(0x51b)]=function(){const _0x364ceb=_0x2a56e3,_0x371eb3=VisuMZ[_0x364ceb(0x803)][_0x364ceb(0x3f7)][_0x364ceb(0x120)];for(const _0x25124d of _0x371eb3){if(_0x364ceb(0x3b3)===_0x364ceb(0x3b3)){const _0x302fb1=_0x25124d['FunctionName'][_0x364ceb(0x725)](/[ ]/g,''),_0x1d2767=_0x25124d[_0x364ceb(0x19a)];VisuMZ[_0x364ceb(0x803)][_0x364ceb(0x180)](_0x302fb1,_0x1d2767);}else this[_0x364ceb(0x3b5)]['setBackgroundType'](_0x5eb098['layoutSettings'][_0x364ceb(0x975)]);}},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x180)]=function(_0x142de7,_0xff2cf7){const _0x187159=_0x2a56e3;if(!!window[_0x142de7]){if($gameTemp[_0x187159(0x7f4)]())console['log']('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x187159(0x6ba)](_0x142de7));}const _0x29c09f=_0x187159(0x385)[_0x187159(0x6ba)](_0x142de7,_0xff2cf7);window[_0x142de7]=new Function(_0x29c09f);},Scene_Boot[_0x2a56e3(0x948)][_0x2a56e3(0x683)]=function(){const _0x3f7cc1=_0x2a56e3,_0x173320=VisuMZ['CoreEngine'][_0x3f7cc1(0x3f7)][_0x3f7cc1(0x139)];if(!_0x173320)return;for(const _0x141806 of _0x173320){if(_0x3f7cc1(0x795)!=='sdpIy'){if(!_0x141806)continue;VisuMZ[_0x3f7cc1(0x803)]['createCustomParameter'](_0x141806);}else _0x44e416+='【%1】\x0a'[_0x3f7cc1(0x6ba)](_0x28d161['parameters'][0x4]);}},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x55f)]={},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x1de)]={},VisuMZ['CoreEngine'][_0x2a56e3(0x966)]={},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x3c9)]={},VisuMZ['CoreEngine'][_0x2a56e3(0x62d)]=function(_0x4a0fb9){const _0x3abca2=_0x2a56e3,_0x35c080=_0x4a0fb9[_0x3abca2(0x684)],_0x4ecae0=_0x4a0fb9[_0x3abca2(0x911)],_0x308dfc=_0x4a0fb9[_0x3abca2(0x59d)],_0x27262d=_0x4a0fb9[_0x3abca2(0x953)],_0x3c4224=new Function(_0x4a0fb9[_0x3abca2(0x947)]);VisuMZ[_0x3abca2(0x803)]['CustomParamNames'][_0x35c080[_0x3abca2(0x67c)]()[_0x3abca2(0x74d)]()]=_0x4ecae0,VisuMZ[_0x3abca2(0x803)]['CustomParamIcons'][_0x35c080[_0x3abca2(0x67c)]()['trim']()]=_0x308dfc,VisuMZ['CoreEngine'][_0x3abca2(0x966)][_0x35c080[_0x3abca2(0x67c)]()['trim']()]=_0x27262d,VisuMZ[_0x3abca2(0x803)][_0x3abca2(0x3c9)][_0x35c080[_0x3abca2(0x67c)]()['trim']()]=_0x35c080,Object[_0x3abca2(0x619)](Game_BattlerBase[_0x3abca2(0x948)],_0x35c080,{'get'(){const _0x35fff6=_0x3abca2;if(_0x35fff6(0x4f4)!==_0x35fff6(0x4f4))this['createFauxAnimationSprite'](_0x500e85,_0x321b80,_0x335a0d,_0xf14df1,_0x4609dd);else{const _0x37c33f=_0x3c4224[_0x35fff6(0x697)](this);return _0x27262d===_0x35fff6(0x4f1)?Math['round'](_0x37c33f):_0x37c33f;}}});},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x60b)]={},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x4bd)]={},Scene_Boot['prototype'][_0x2a56e3(0x547)]=function(){const _0x28af01=_0x2a56e3,_0x44db45=VisuMZ[_0x28af01(0x803)]['Settings'][_0x28af01(0x60b)];for(const _0x13dcb2 of _0x44db45){const _0x197ca4=(_0x13dcb2[_0x28af01(0x723)]||'')[_0x28af01(0x4ee)]()[_0x28af01(0x74d)](),_0x428a51=(_0x13dcb2[_0x28af01(0x168)]||'')[_0x28af01(0x4ee)]()[_0x28af01(0x74d)]();VisuMZ[_0x28af01(0x803)][_0x28af01(0x60b)][_0x197ca4]=_0x13dcb2,VisuMZ[_0x28af01(0x803)][_0x28af01(0x4bd)][_0x428a51]=_0x197ca4;}},VisuMZ[_0x2a56e3(0x6ec)]=function(){const _0x45dad6=_0x2a56e3;for(const _0x2f71fe of $dataActors){if(_0x2f71fe)VisuMZ[_0x45dad6(0x97b)](_0x2f71fe);}for(const _0x5ee654 of $dataClasses){if(_0x45dad6(0x7bd)!=='xmcsY'){if(_0x5ee654)VisuMZ['ParseClassNotetags'](_0x5ee654);}else this[_0x45dad6(0x3b5)][_0x45dad6(0x7a2)](_0x25c1fa[_0x45dad6(0x7c9)][_0x45dad6(0x975)]);}for(const _0x3e7384 of $dataSkills){if('acALa'!=='Tpvux'){if(_0x3e7384)VisuMZ['ParseSkillNotetags'](_0x3e7384);}else{const _0x2e3f07=_0x227a42[_0x45dad6(0x4a2)]()[_0x45dad6(0x725)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x45e1db[_0x45dad6(0x4a2)](),_0x50c1fc,_0xa49406,_0xeb64aa);}}for(const _0x3aee35 of $dataItems){if(_0x3aee35)VisuMZ[_0x45dad6(0x933)](_0x3aee35);}for(const _0x6cbd50 of $dataWeapons){if(_0x6cbd50)VisuMZ['ParseWeaponNotetags'](_0x6cbd50);}for(const _0x1857fd of $dataArmors){if(_0x45dad6(0x5ba)===_0x45dad6(0x46e)){let _0x44c727=_0x500f65[_0x45dad6(0x803)]['Game_Picture_scaleX'][_0x45dad6(0x697)](this);return this[_0x45dad6(0x6fc)]()&&(_0x44c727*=_0x5af51a[_0x45dad6(0x173)]()),_0x44c727;}else{if(_0x1857fd)VisuMZ[_0x45dad6(0x261)](_0x1857fd);}}for(const _0x48cea4 of $dataEnemies){if('wZjjK'!==_0x45dad6(0x6e7)){if(_0x48cea4)VisuMZ['ParseEnemyNotetags'](_0x48cea4);}else return _0x45dad6(0x879);}for(const _0x2ca832 of $dataStates){if(_0x2ca832)VisuMZ[_0x45dad6(0x790)](_0x2ca832);}for(const _0x2645f8 of $dataTilesets){if(_0x2645f8)VisuMZ['ParseTilesetNotetags'](_0x2645f8);}},VisuMZ['ParseActorNotetags']=function(_0x285dc9){},VisuMZ[_0x2a56e3(0x1d3)]=function(_0x4c4578){},VisuMZ['ParseSkillNotetags']=function(_0x420b93){},VisuMZ[_0x2a56e3(0x933)]=function(_0x1cc2dd){},VisuMZ[_0x2a56e3(0x890)]=function(_0x22b4c2){},VisuMZ[_0x2a56e3(0x261)]=function(_0x67361d){},VisuMZ[_0x2a56e3(0x6b9)]=function(_0x597d92){},VisuMZ[_0x2a56e3(0x790)]=function(_0x4adf16){},VisuMZ[_0x2a56e3(0x7e0)]=function(_0x19c1d2){},VisuMZ['CoreEngine'][_0x2a56e3(0x97b)]=VisuMZ[_0x2a56e3(0x97b)],VisuMZ[_0x2a56e3(0x97b)]=function(_0x29e539){const _0x17b426=_0x2a56e3;VisuMZ[_0x17b426(0x803)][_0x17b426(0x97b)][_0x17b426(0x697)](this,_0x29e539);const _0xacf367=_0x29e539[_0x17b426(0x276)];if(_0xacf367['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0x29e539[_0x17b426(0x233)]=Number(RegExp['$1']);if(_0x29e539[_0x17b426(0x233)]===0x0)_0x29e539[_0x17b426(0x233)]=Number[_0x17b426(0x60f)];}if(_0xacf367[_0x17b426(0x76d)](/<INITIAL LEVEL:[ ](\d+)>/i)){if(_0x17b426(0x1d9)===_0x17b426(0x1d9))_0x29e539[_0x17b426(0x380)]=Math[_0x17b426(0x4c9)](Number(RegExp['$1']),_0x29e539[_0x17b426(0x233)]);else{const _0x40ad73={'x':_0xfb4013,'y':_0x2f79c9,'animationId':_0x3381b6,'mirror':_0xb837b8,'mute':_0x1cab3b};this[_0x17b426(0x191)][_0x17b426(0x487)](_0x40ad73);}}},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x1d3)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x2a56e3(0x1d3)]=function(_0x4e648e){const _0x2910a4=_0x2a56e3;VisuMZ['CoreEngine'][_0x2910a4(0x1d3)][_0x2910a4(0x697)](this,_0x4e648e);if(_0x4e648e[_0x2910a4(0x8a7)])for(const _0x5d7908 of _0x4e648e[_0x2910a4(0x8a7)]){'rYoop'!=='rYoop'?(this[_0x2910a4(0x397)]=_0x3a9ca1[_0x2910a4(0x803)][_0x2910a4(0x3f7)][_0x2910a4(0x2fc)][_0x2910a4(0x41b)],this['_digitGroupingEx']=_0x2d3a74[_0x2910a4(0x803)]['Settings']['QoL'][_0x2910a4(0x8a1)]):_0x5d7908[_0x2910a4(0x276)][_0x2910a4(0x76d)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x5d7908[_0x2910a4(0x2b2)]=Math[_0x2910a4(0x81b)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x6b9)]=VisuMZ[_0x2a56e3(0x6b9)],VisuMZ[_0x2a56e3(0x6b9)]=function(_0x4de606){const _0x58d884=_0x2a56e3;VisuMZ['CoreEngine'][_0x58d884(0x6b9)][_0x58d884(0x697)](this,_0x4de606),_0x4de606[_0x58d884(0x2b2)]=0x1;const _0x49ee39=_0x4de606['note'];if(_0x49ee39[_0x58d884(0x76d)](/<LEVEL:[ ](\d+)>/i))_0x4de606[_0x58d884(0x2b2)]=Number(RegExp['$1']);if(_0x49ee39['match'](/<MAXHP:[ ](\d+)>/i))_0x4de606[_0x58d884(0x5a0)][0x0]=Number(RegExp['$1']);if(_0x49ee39['match'](/<MAXMP:[ ](\d+)>/i))_0x4de606['params'][0x1]=Number(RegExp['$1']);if(_0x49ee39[_0x58d884(0x76d)](/<ATK:[ ](\d+)>/i))_0x4de606[_0x58d884(0x5a0)][0x2]=Number(RegExp['$1']);if(_0x49ee39['match'](/<DEF:[ ](\d+)>/i))_0x4de606[_0x58d884(0x5a0)][0x3]=Number(RegExp['$1']);if(_0x49ee39[_0x58d884(0x76d)](/<MAT:[ ](\d+)>/i))_0x4de606[_0x58d884(0x5a0)][0x4]=Number(RegExp['$1']);if(_0x49ee39['match'](/<MDF:[ ](\d+)>/i))_0x4de606[_0x58d884(0x5a0)][0x5]=Number(RegExp['$1']);if(_0x49ee39[_0x58d884(0x76d)](/<AGI:[ ](\d+)>/i))_0x4de606[_0x58d884(0x5a0)][0x6]=Number(RegExp['$1']);if(_0x49ee39[_0x58d884(0x76d)](/<LUK:[ ](\d+)>/i))_0x4de606['params'][0x7]=Number(RegExp['$1']);if(_0x49ee39[_0x58d884(0x76d)](/<EXP:[ ](\d+)>/i))_0x4de606[_0x58d884(0x996)]=Number(RegExp['$1']);if(_0x49ee39[_0x58d884(0x76d)](/<GOLD:[ ](\d+)>/i))_0x4de606[_0x58d884(0x2c4)]=Number(RegExp['$1']);},VisuMZ[_0x2a56e3(0x803)]['Graphics_defaultStretchMode']=Graphics[_0x2a56e3(0x64e)],Graphics['_defaultStretchMode']=function(){const _0x53a3a8=_0x2a56e3;switch(VisuMZ[_0x53a3a8(0x803)]['Settings'][_0x53a3a8(0x2fc)][_0x53a3a8(0x722)]){case _0x53a3a8(0x74b):return!![];case _0x53a3a8(0x5f1):return![];default:return VisuMZ['CoreEngine']['Graphics_defaultStretchMode'][_0x53a3a8(0x697)](this);}},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x4c7)]=Graphics[_0x2a56e3(0x473)],Graphics[_0x2a56e3(0x473)]=function(_0x11e55c,_0x2df6ff,_0x3e3cb3=null){const _0xcad335=_0x2a56e3;VisuMZ[_0xcad335(0x803)][_0xcad335(0x4c7)][_0xcad335(0x697)](this,_0x11e55c,_0x2df6ff,_0x3e3cb3),VisuMZ[_0xcad335(0x64f)](![]);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x950)]=Graphics[_0x2a56e3(0x2d9)],Graphics['_centerElement']=function(_0x6df991){const _0x200a22=_0x2a56e3;VisuMZ['CoreEngine'][_0x200a22(0x950)]['call'](this,_0x6df991),this['_centerElementCoreEngine'](_0x6df991);},Graphics[_0x2a56e3(0x142)]=function(_0x91eb3){const _0xed9e38=_0x2a56e3;if(VisuMZ['CoreEngine'][_0xed9e38(0x3f7)][_0xed9e38(0x2fc)][_0xed9e38(0x1d5)]){if(_0xed9e38(0x88b)===_0xed9e38(0x4cc)){const _0x2a998d=this[_0xed9e38(0x1e4)],_0x13e0ca=this[_0xed9e38(0x1e4)],_0x336a79=this[_0xed9e38(0x91a)][_0xed9e38(0x223)]*(this[_0xed9e38(0x3dc)]?-0x1:0x1)-_0x2a998d/0x2,_0x5cd27b=this[_0xed9e38(0x91a)]['offsetY']-_0x13e0ca/0x2,_0xaebc94=this[_0xed9e38(0x599)](_0x2759b5);_0x3a79cf['gl'][_0xed9e38(0x232)](_0x336a79+_0xaebc94['x'],_0x5cd27b+_0xaebc94['y'],_0x2a998d,_0x13e0ca);}else _0x91eb3[_0xed9e38(0x2f8)][_0xed9e38(0x334)]=_0xed9e38(0x217);}VisuMZ[_0xed9e38(0x803)]['Settings'][_0xed9e38(0x2fc)]['PixelateImageRendering']&&(_0x91eb3[_0xed9e38(0x2f8)]['image-rendering']=_0xed9e38(0x47e));const _0x5b1e83=Math[_0xed9e38(0x81b)](0x0,Math[_0xed9e38(0x6ad)](_0x91eb3['width']*this[_0xed9e38(0x8b9)])),_0x215cf1=Math[_0xed9e38(0x81b)](0x0,Math[_0xed9e38(0x6ad)](_0x91eb3[_0xed9e38(0x8c0)]*this['_realScale']));_0x91eb3['style'][_0xed9e38(0x290)]=_0x5b1e83+'px',_0x91eb3[_0xed9e38(0x2f8)][_0xed9e38(0x8c0)]=_0x215cf1+'px';},VisuMZ['CoreEngine']['Bitmap_initialize']=Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x14c)],Bitmap[_0x2a56e3(0x948)]['initialize']=function(_0x2496e0,_0x87de11){const _0x36ce34=_0x2a56e3;VisuMZ[_0x36ce34(0x803)][_0x36ce34(0x981)][_0x36ce34(0x697)](this,_0x2496e0,_0x87de11),this[_0x36ce34(0x899)]=!(VisuMZ[_0x36ce34(0x803)][_0x36ce34(0x3f7)][_0x36ce34(0x2fc)][_0x36ce34(0x48c)]??!![]);},Bitmap[_0x2a56e3(0x948)]['markCoreEngineModified']=function(){const _0x3be171=_0x2a56e3;this[_0x3be171(0x78d)]=!![];},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x7c4)]=Sprite['prototype']['destroy'],Sprite[_0x2a56e3(0x948)][_0x2a56e3(0x1d7)]=function(){const _0x9522f4=_0x2a56e3;VisuMZ[_0x9522f4(0x803)][_0x9522f4(0x7c4)][_0x9522f4(0x697)](this),this[_0x9522f4(0x610)]();},Sprite[_0x2a56e3(0x948)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x4eba6a=_0x2a56e3;if(!this['bitmap'])return;if(!this[_0x4eba6a(0x65e)][_0x4eba6a(0x78d)])return;if(this['bitmap']['_baseTexture']&&!this['_bitmap'][_0x4eba6a(0x976)][_0x4eba6a(0x3c0)]){if(_0x4eba6a(0x27f)===_0x4eba6a(0x20f)){const _0x509afb=_0x114e8c(_0x412f2f['$1']);_0x509afb<_0x390222?(_0x3e003b('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x4eba6a(0x6ba)](_0x3fdb07,_0x509afb,_0x3683af)),_0x269c12[_0x4eba6a(0x8ec)]()):_0x18a8df=_0x104a1d[_0x4eba6a(0x81b)](_0x509afb,_0x3b1ff5);}else this[_0x4eba6a(0x65e)][_0x4eba6a(0x1d7)]();}},VisuMZ[_0x2a56e3(0x803)]['Bitmap_resize']=Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x4f6)],Bitmap['prototype'][_0x2a56e3(0x4f6)]=function(_0x59201d,_0x4e59dc){const _0x26a15e=_0x2a56e3;VisuMZ[_0x26a15e(0x803)]['Bitmap_resize'][_0x26a15e(0x697)](this,_0x59201d,_0x4e59dc),this['markCoreEngineModified']();},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x8d7)]=Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x2c0)],Bitmap['prototype'][_0x2a56e3(0x2c0)]=function(_0x13dcb5,_0x28273c,_0x192abd,_0x35c8b1,_0x557144,_0x56243e,_0x32c9c9,_0xc4afad,_0x412772){const _0x4d0721=_0x2a56e3;_0x28273c=Math[_0x4d0721(0x377)](_0x28273c),_0x192abd=Math[_0x4d0721(0x377)](_0x192abd),_0x35c8b1=Math['round'](_0x35c8b1),_0x557144=Math[_0x4d0721(0x377)](_0x557144),_0x56243e=Math[_0x4d0721(0x377)](_0x56243e),_0x32c9c9=Math[_0x4d0721(0x377)](_0x32c9c9),VisuMZ['CoreEngine'][_0x4d0721(0x8d7)][_0x4d0721(0x697)](this,_0x13dcb5,_0x28273c,_0x192abd,_0x35c8b1,_0x557144,_0x56243e,_0x32c9c9,_0xc4afad,_0x412772),this[_0x4d0721(0x7e6)]();},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x123)]=Bitmap['prototype'][_0x2a56e3(0x690)],Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x690)]=function(_0x2ccc4e,_0x26f370,_0x192ef8,_0x12b032){const _0x34c915=_0x2a56e3;VisuMZ[_0x34c915(0x803)][_0x34c915(0x123)][_0x34c915(0x697)](this,_0x2ccc4e,_0x26f370,_0x192ef8,_0x12b032),this[_0x34c915(0x7e6)]();},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x696)]=Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x5e6)],Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x5e6)]=function(_0x3c6a64,_0x58b3b5,_0x200937,_0x31b37a,_0x79310a){const _0x183ad3=_0x2a56e3;VisuMZ[_0x183ad3(0x803)][_0x183ad3(0x696)]['call'](this,_0x3c6a64,_0x58b3b5,_0x200937,_0x31b37a,_0x79310a),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x2a56e3(0x6c6)]=Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x305)],Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x305)]=function(_0x578854,_0x50853d,_0x1b0e6f,_0x58e87f,_0x41458f){const _0x29daba=_0x2a56e3;VisuMZ['CoreEngine'][_0x29daba(0x6c6)][_0x29daba(0x697)](this,_0x578854,_0x50853d,_0x1b0e6f,_0x58e87f,_0x41458f),this['markCoreEngineModified']();},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x28d)]=Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x3d8)],Bitmap['prototype'][_0x2a56e3(0x3d8)]=function(_0x3cf6c5,_0x2866c2,_0x5c2a31,_0x4288f6,_0x7611e,_0x2dad2a,_0x39180c){const _0x38c26e=_0x2a56e3;VisuMZ['CoreEngine'][_0x38c26e(0x28d)][_0x38c26e(0x697)](this,_0x3cf6c5,_0x2866c2,_0x5c2a31,_0x4288f6,_0x7611e,_0x2dad2a,_0x39180c),this[_0x38c26e(0x7e6)]();},VisuMZ[_0x2a56e3(0x803)]['Bitmap_drawCircle']=Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x7b8)],Bitmap['prototype'][_0x2a56e3(0x7b8)]=function(_0x249e85,_0x56e0b7,_0x5711fe,_0x22140b){const _0x1f2f30=_0x2a56e3;_0x249e85=Math[_0x1f2f30(0x377)](_0x249e85),_0x56e0b7=Math[_0x1f2f30(0x377)](_0x56e0b7),_0x5711fe=Math[_0x1f2f30(0x377)](_0x5711fe),VisuMZ[_0x1f2f30(0x803)][_0x1f2f30(0x220)][_0x1f2f30(0x697)](this,_0x249e85,_0x56e0b7,_0x5711fe,_0x22140b),this[_0x1f2f30(0x7e6)]();},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x4e9)]=Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x204)],Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x204)]=function(_0x65a721){const _0x2bafbc=_0x2a56e3;return Math[_0x2bafbc(0x631)](VisuMZ[_0x2bafbc(0x803)]['Bitmap_measureTextWidth'][_0x2bafbc(0x697)](this,_0x65a721));},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x81d)]=Bitmap['prototype'][_0x2a56e3(0x21a)],Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x21a)]=function(_0x27d15c,_0x5ea0fa,_0x27666e,_0x77baca,_0x53cd80,_0x408744){const _0x41d444=_0x2a56e3;_0x5ea0fa=Math[_0x41d444(0x377)](_0x5ea0fa),_0x27666e=Math[_0x41d444(0x377)](_0x27666e),_0x77baca=Math['round'](_0x77baca),_0x53cd80=Math['round'](_0x53cd80),VisuMZ[_0x41d444(0x803)][_0x41d444(0x81d)][_0x41d444(0x697)](this,_0x27d15c,_0x5ea0fa,_0x27666e,_0x77baca,_0x53cd80,_0x408744),this[_0x41d444(0x7e6)]();},VisuMZ['CoreEngine'][_0x2a56e3(0x881)]=Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x19b)],Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x19b)]=function(_0x30e4af,_0x37cf0f,_0x5dbadd,_0x270a83){const _0x2974e0=_0x2a56e3;if(VisuMZ[_0x2974e0(0x803)][_0x2974e0(0x3f7)]['QoL'][_0x2974e0(0x7fa)])this[_0x2974e0(0x3c1)](_0x30e4af,_0x37cf0f,_0x5dbadd,_0x270a83);else{if('rFOgA'!==_0x2974e0(0x257)){const _0x33cb73=_0x2ea106[_0x2974e0(0x1e5)]()[_0x2974e0(0x6f5)]['replace'](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x33cb73,_0x5e7999,_0x39be8c,_0xe5b4cc);}else VisuMZ[_0x2974e0(0x803)][_0x2974e0(0x881)]['call'](this,_0x30e4af,_0x37cf0f,_0x5dbadd,_0x270a83);}},Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x3c1)]=function(_0x2d0fc5,_0x20270c,_0x295292,_0x200f8b){const _0x1a020f=_0x2a56e3,_0x4575ca=this[_0x1a020f(0x69d)];_0x4575ca['fillStyle']=this[_0x1a020f(0x2ee)],_0x4575ca[_0x1a020f(0x744)](_0x2d0fc5,_0x20270c+0x2,_0x295292+0x2,_0x200f8b);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x371)]=Input['clear'],Input[_0x2a56e3(0x3a9)]=function(){const _0x17e538=_0x2a56e3;VisuMZ['CoreEngine'][_0x17e538(0x371)]['call'](this),this[_0x17e538(0x60d)]=undefined,this['_inputSpecialKeyCode']=undefined,this[_0x17e538(0x30f)]=Input[_0x17e538(0x89f)];},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x61b)]=Input['update'],Input[_0x2a56e3(0x1cd)]=function(){const _0x370b9e=_0x2a56e3;VisuMZ[_0x370b9e(0x803)]['Input_update'][_0x370b9e(0x697)](this);if(this[_0x370b9e(0x30f)])this[_0x370b9e(0x30f)]--;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x229)]=Input[_0x2a56e3(0x5cb)],Input[_0x2a56e3(0x5cb)]=function(){const _0x114da6=_0x2a56e3;if(this[_0x114da6(0x30f)])return;VisuMZ['CoreEngine'][_0x114da6(0x229)][_0x114da6(0x697)](this);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x439)]=Input[_0x2a56e3(0x218)],Input['_setupEventHandlers']=function(){const _0x506846=_0x2a56e3;VisuMZ[_0x506846(0x803)][_0x506846(0x439)]['call'](this),document[_0x506846(0x4e4)](_0x506846(0x151),this[_0x506846(0x1ca)]['bind'](this));},VisuMZ[_0x2a56e3(0x803)]['Input_onKeyDown']=Input[_0x2a56e3(0x75c)],Input[_0x2a56e3(0x75c)]=function(_0x25d29d){const _0x758f60=_0x2a56e3;this[_0x758f60(0x71c)]=_0x25d29d['keyCode'],VisuMZ[_0x758f60(0x803)][_0x758f60(0x98a)][_0x758f60(0x697)](this,_0x25d29d),this[_0x758f60(0x55a)](null);},Input[_0x2a56e3(0x1ca)]=function(_0x229f3a){const _0x4ba4ac=_0x2a56e3;this[_0x4ba4ac(0x25f)](_0x229f3a);},Input['_registerKeyInput']=function(_0x430258){const _0x57861c=_0x2a56e3;this[_0x57861c(0x71c)]=_0x430258['keyCode'];let _0x44a369=String[_0x57861c(0x2d7)](_0x430258['charCode']);this['_inputString']===undefined?_0x57861c(0x73e)===_0x57861c(0x5b8)?this[_0x57861c(0x716)]=0xff:this[_0x57861c(0x60d)]=_0x44a369:this[_0x57861c(0x60d)]+=_0x44a369;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x6bb)]=Input['_shouldPreventDefault'],Input[_0x2a56e3(0x73f)]=function(_0x5ea34f){const _0x3cccaa=_0x2a56e3;if(_0x5ea34f===0x8)return![];return VisuMZ[_0x3cccaa(0x803)][_0x3cccaa(0x6bb)][_0x3cccaa(0x697)](this,_0x5ea34f);},Input[_0x2a56e3(0x5c1)]=function(_0x1ea150){const _0x3d390b=_0x2a56e3;if(_0x1ea150[_0x3d390b(0x76d)](/backspace/i))return this[_0x3d390b(0x71c)]===0x8;if(_0x1ea150['match'](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0x1ea150['match'](/escape/i))return this[_0x3d390b(0x71c)]===0x1b;},Input[_0x2a56e3(0x1f6)]=function(){const _0x534b45=_0x2a56e3;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x534b45(0x71c)]);},Input['isArrowPressed']=function(){const _0x473477=_0x2a56e3;return[0x25,0x26,0x27,0x28]['contains'](this[_0x473477(0x71c)]);},Input[_0x2a56e3(0x4b3)]=function(){const _0x44ef8a=_0x2a56e3;if(navigator['getGamepads']){const _0x49c0f7=navigator[_0x44ef8a(0x1be)]();if(_0x49c0f7)for(const _0x1ef5bd of _0x49c0f7){if(_0x44ef8a(0x7be)===_0x44ef8a(0x33c))!_0x457931[_0x44ef8a(0x655)]&&_0x106cef['visible']&&_0x48e8b7[_0x44ef8a(0x69a)](_0x30ec6e);else{if(_0x1ef5bd&&_0x1ef5bd[_0x44ef8a(0x316)]){if(_0x44ef8a(0x3af)!==_0x44ef8a(0x3af))_0x47fd31[_0x44ef8a(0x5f3)]=_0x21fc6f,_0xa01717[_0x44ef8a(0x2e6)](_0x478590);else return!![];}}}}return![];},Input[_0x2a56e3(0x131)]=function(){const _0x69e35b=_0x2a56e3;if(navigator[_0x69e35b(0x1be)]){if(_0x69e35b(0x8f7)===_0x69e35b(0x32b))_0x3b78a0[_0x69e35b(0x732)](),_0x466732[_0x69e35b(0x705)](_0x260d25),_0x4bd8ff[_0x69e35b(0x803)][_0x69e35b(0x82d)][_0x69e35b(0x697)](this,_0x503adb);else{const _0x1e9c59=navigator[_0x69e35b(0x1be)]();if(_0x1e9c59)for(const _0x1961ad of _0x1e9c59){if(_0x1961ad&&_0x1961ad[_0x69e35b(0x316)]){if(this[_0x69e35b(0x43b)](_0x1961ad))return!![];if(this['isGamepadAxisMoved'](_0x1961ad))return!![];}}}}return![];},Input['isGamepadButtonPressed']=function(_0xc29492){const _0x11a581=_0x2a56e3,_0x1b2d8d=_0xc29492[_0x11a581(0x41a)];for(let _0x3ad33a=0x0;_0x3ad33a<_0x1b2d8d[_0x11a581(0x9b5)];_0x3ad33a++){if(_0x1b2d8d[_0x3ad33a]['pressed'])return!![];}return![];},Input[_0x2a56e3(0x524)]=function(_0x259d77){const _0x1bf594=_0x2a56e3,_0x5be658=_0x259d77[_0x1bf594(0x752)],_0x3689bd=0.5;if(_0x5be658[0x0]<-_0x3689bd)return!![];if(_0x5be658[0x0]>_0x3689bd)return!![];if(_0x5be658[0x1]<-_0x3689bd)return!![];if(_0x5be658[0x1]>_0x3689bd)return!![];return![];},Input[_0x2a56e3(0x934)]=function(){const _0x5515ac=_0x2a56e3;return this[_0x5515ac(0x865)]||null;},Input[_0x2a56e3(0x55a)]=function(_0x41d8ae){const _0x4c810e=_0x2a56e3;this[_0x4c810e(0x865)]=_0x41d8ae;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x584)]=Input[_0x2a56e3(0x530)],Input[_0x2a56e3(0x530)]=function(_0x270b19){const _0x1868a4=_0x2a56e3;VisuMZ['CoreEngine']['Input_updateGamepadState'][_0x1868a4(0x697)](this,_0x270b19),(this[_0x1868a4(0x43b)](_0x270b19)||this[_0x1868a4(0x524)](_0x270b19))&&('gligg'!==_0x1868a4(0x618)?this[_0x1868a4(0x55a)](_0x270b19):(this[_0x1868a4(0x89d)](_0x316559['systemColor']()),this[_0x1868a4(0x21a)](_0x2e490f,_0xa4b779,_0x5d7662,_0x300231,_0x1868a4(0x179)),_0x3a4846-=this[_0x1868a4(0x2c7)](_0x5ca05c)+0x6));},Input[_0x2a56e3(0x638)]=function(){const _0xa0d67b=_0x2a56e3;return this[_0xa0d67b(0x865)]?this[_0xa0d67b(0x865)]['id']:_0xa0d67b(0x5fb);},VisuMZ['CoreEngine'][_0x2a56e3(0x96d)]=Tilemap[_0x2a56e3(0x948)][_0x2a56e3(0x190)],Tilemap['prototype']['_addShadow']=function(_0x518f99,_0x2d07fc,_0x1c46e3,_0x5ddb69){const _0x17b597=_0x2a56e3;if($gameMap&&$gameMap[_0x17b597(0x249)]())return;VisuMZ['CoreEngine'][_0x17b597(0x96d)][_0x17b597(0x697)](this,_0x518f99,_0x2d07fc,_0x1c46e3,_0x5ddb69);},Tilemap[_0x2a56e3(0x3a6)][_0x2a56e3(0x948)][_0x2a56e3(0x699)]=function(){const _0x5ee2fd=_0x2a56e3;this['_destroyInternalTextures']();for(let _0x43befd=0x0;_0x43befd<Tilemap[_0x5ee2fd(0x6a2)][_0x5ee2fd(0x132)];_0x43befd++){const _0x3236b3=new PIXI[(_0x5ee2fd(0x713))]();_0x3236b3[_0x5ee2fd(0x67a)](0x800,0x800),VisuMZ[_0x5ee2fd(0x803)][_0x5ee2fd(0x3f7)][_0x5ee2fd(0x2fc)][_0x5ee2fd(0x48c)]&&(_0x3236b3[_0x5ee2fd(0x628)]=PIXI[_0x5ee2fd(0x93e)][_0x5ee2fd(0x817)]),this[_0x5ee2fd(0x92b)][_0x5ee2fd(0x487)](_0x3236b3);}},WindowLayer[_0x2a56e3(0x948)]['isMaskingEnabled']=function(){const _0x42fa3b=_0x2a56e3;return SceneManager&&SceneManager[_0x42fa3b(0x97a)]?SceneManager['_scene'][_0x42fa3b(0x94b)]():!![];},VisuMZ[_0x2a56e3(0x803)]['WindowLayer_render']=WindowLayer[_0x2a56e3(0x948)][_0x2a56e3(0x69a)],WindowLayer[_0x2a56e3(0x948)][_0x2a56e3(0x69a)]=function render(_0x22f883){const _0x48117a=_0x2a56e3;if(this['isMaskingEnabled']()){if(_0x48117a(0x62b)!==_0x48117a(0x277))VisuMZ['CoreEngine'][_0x48117a(0x85b)][_0x48117a(0x697)](this,_0x22f883);else return 0.5*_0x4b2fd7*_0x343f8c*((_0x516d38+0x1)*_0xf32e85-_0x2145f2);}else _0x48117a(0x177)!==_0x48117a(0x177)?(_0x1ec2bc['clear'](),this[_0x48117a(0x4a1)]===_0x48117a(0x29d)?this[_0x48117a(0x5f9)]('default'):this[_0x48117a(0x5f9)](_0x48117a(0x29d))):this['renderNoMask'](_0x22f883);},WindowLayer[_0x2a56e3(0x948)]['renderNoMask']=function render(_0x17532d){const _0x51166b=_0x2a56e3;if(!this[_0x51166b(0x575)])return;const _0x423665=new PIXI[(_0x51166b(0x58f))](),_0x3c9f5d=_0x17532d['gl'],_0x452ab0=this[_0x51166b(0x677)][_0x51166b(0x55c)]();_0x17532d[_0x51166b(0x512)][_0x51166b(0x1a7)](),_0x423665[_0x51166b(0x5da)]=this[_0x51166b(0x5da)],_0x17532d['batch'][_0x51166b(0x6c3)](),_0x3c9f5d['enable'](_0x3c9f5d[_0x51166b(0x8d5)]);while(_0x452ab0['length']>0x0){if('TPVJu'!==_0x51166b(0x273))[0x6c,0x198][_0x51166b(0x559)](_0x1ae934['code'])&&(_0x1bc284+='\x0a',_0x218bcb+=_0x211a73[_0x51166b(0x9b6)][0x0]);else{const _0x2509df=_0x452ab0[_0x51166b(0x6fd)]();_0x2509df[_0x51166b(0x655)]&&_0x2509df[_0x51166b(0x575)]&&_0x2509df[_0x51166b(0x17d)]>0x0&&(_0x3c9f5d['stencilFunc'](_0x3c9f5d['EQUAL'],0x0,~0x0),_0x3c9f5d[_0x51166b(0x325)](_0x3c9f5d[_0x51166b(0x687)],_0x3c9f5d[_0x51166b(0x687)],_0x3c9f5d[_0x51166b(0x687)]),_0x2509df['render'](_0x17532d),_0x17532d[_0x51166b(0x6d5)][_0x51166b(0x6c3)](),_0x423665[_0x51166b(0x3a9)](),_0x3c9f5d['stencilFunc'](_0x3c9f5d['ALWAYS'],0x1,~0x0),_0x3c9f5d[_0x51166b(0x325)](_0x3c9f5d['REPLACE'],_0x3c9f5d[_0x51166b(0x66a)],_0x3c9f5d[_0x51166b(0x66a)]),_0x3c9f5d[_0x51166b(0x835)](_0x3c9f5d[_0x51166b(0x510)],_0x3c9f5d[_0x51166b(0x3ee)]),_0x423665[_0x51166b(0x69a)](_0x17532d),_0x17532d[_0x51166b(0x6d5)][_0x51166b(0x6c3)](),_0x3c9f5d[_0x51166b(0x835)](_0x3c9f5d[_0x51166b(0x3ee)],_0x3c9f5d[_0x51166b(0x2d0)]));}}_0x3c9f5d[_0x51166b(0x4b8)](_0x3c9f5d[_0x51166b(0x8d5)]),_0x3c9f5d[_0x51166b(0x3a9)](_0x3c9f5d[_0x51166b(0x5b6)]),_0x3c9f5d['clearStencil'](0x0),_0x17532d[_0x51166b(0x6d5)][_0x51166b(0x6c3)]();for(const _0x57f51c of this[_0x51166b(0x677)]){!_0x57f51c[_0x51166b(0x655)]&&_0x57f51c[_0x51166b(0x575)]&&(_0x51166b(0x940)!==_0x51166b(0x940)?this['terminate']():_0x57f51c[_0x51166b(0x69a)](_0x17532d));}_0x17532d[_0x51166b(0x6d5)]['flush']();},DataManager[_0x2a56e3(0x31c)]=function(_0xbd5c5c){const _0x4905b7=_0x2a56e3;return this[_0x4905b7(0x387)](_0xbd5c5c)&&_0xbd5c5c[_0x4905b7(0x629)]===0x2;},VisuMZ['CoreEngine']['DataManager_setupNewGame']=DataManager[_0x2a56e3(0x4f9)],DataManager['setupNewGame']=function(){const _0x269ef3=_0x2a56e3;VisuMZ[_0x269ef3(0x803)][_0x269ef3(0x490)]['call'](this),this[_0x269ef3(0x702)](),this[_0x269ef3(0x4ed)]();},DataManager[_0x2a56e3(0x702)]=function(){const _0x563c1e=_0x2a56e3;if($gameTemp[_0x563c1e(0x7f4)]()){if('wTAOh'==='wTAOh'){const _0x3d90b0=VisuMZ['CoreEngine'][_0x563c1e(0x3f7)][_0x563c1e(0x2fc)][_0x563c1e(0x772)];if(_0x3d90b0>0x0)$gameTemp[_0x563c1e(0x866)](_0x3d90b0);}else this[_0x563c1e(0x19e)]=_0x4a199f;}},DataManager['reserveNewGameCommonEvent']=function(){const _0x40c381=_0x2a56e3,_0x51fc65=VisuMZ[_0x40c381(0x803)]['Settings'][_0x40c381(0x2fc)][_0x40c381(0x84f)]||0x0;if(_0x51fc65>0x0)$gameTemp['reserveCommonEvent'](_0x51fc65);},DataManager[_0x2a56e3(0x301)]=function(_0x304856){const _0x56abb9=_0x2a56e3,_0x4c1b2d=$dataTroops[_0x304856];if(!_0x4c1b2d)return'';let _0x45c544='';_0x45c544+=_0x4c1b2d['name'];for(const _0xe27694 of _0x4c1b2d['pages']){for(const _0x4d191f of _0xe27694[_0x56abb9(0x327)]){if(_0x56abb9(0x62e)!==_0x56abb9(0x62e)){const _0x573fbb=_0x56abb9(0x5e3);_0x484c94[_0x56abb9(0x738)](_0x335c4a)['remove']('')[_0x56abb9(0x738)](null);const _0x4e0988=_0x575beb[_0x56abb9(0x3f6)](_0x56abb9(0x56f))[_0x56abb9(0x74d)]();_0x6c22c0['CoreEngine'][_0x56abb9(0x415)](_0x4e0988,_0x573fbb,!![]),_0x8bf403[_0x56abb9(0x97a)]['_active']=!![];}else{if([0x6c,0x198][_0x56abb9(0x559)](_0x4d191f[_0x56abb9(0x4bf)])){if(_0x56abb9(0x5a5)!==_0x56abb9(0x5a5)){const _0x4a3eb5=_0x24bf5b['platform']==_0x56abb9(0x7d6)?_0x56abb9(0x70e):_0x4f34b1[_0x56abb9(0x7f5)]==_0x56abb9(0x927)?_0x56abb9(0x427):_0x56abb9(0x606);_0x8040a2(_0x56abb9(0x504))[_0x56abb9(0x601)](_0x4a3eb5+'\x20'+_0x30383f);}else _0x45c544+='\x0a',_0x45c544+=_0x4d191f[_0x56abb9(0x9b6)][0x0];}}}}return _0x45c544;};(VisuMZ[_0x2a56e3(0x803)]['Settings']['QoL']['ShortcutScripts']??!![])&&($scene=null,VisuMZ[_0x2a56e3(0x803)]['Scene_Base_create']=Scene_Base[_0x2a56e3(0x948)]['create'],Scene_Base[_0x2a56e3(0x948)][_0x2a56e3(0x3ab)]=function(){const _0x3ac2d2=_0x2a56e3;VisuMZ[_0x3ac2d2(0x803)]['Scene_Base_create']['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x1c8)]=Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x508)],Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x508)]=function(){VisuMZ['CoreEngine']['Scene_Map_createSpriteset']['call'](this),$spriteset=this['_spriteset'];},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x9bb)]=Scene_Battle['prototype'][_0x2a56e3(0x508)],Scene_Battle[_0x2a56e3(0x948)]['createSpriteset']=function(){const _0x15e50a=_0x2a56e3;VisuMZ[_0x15e50a(0x803)]['Scene_Battle_createSpriteset'][_0x15e50a(0x697)](this),$spriteset=this[_0x15e50a(0x482)];},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x8e0)]=Scene_Base[_0x2a56e3(0x948)][_0x2a56e3(0x2b4)],Scene_Base[_0x2a56e3(0x948)][_0x2a56e3(0x2b4)]=function(){const _0x1af3ff=_0x2a56e3;VisuMZ[_0x1af3ff(0x803)][_0x1af3ff(0x8e0)][_0x1af3ff(0x697)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x2dd)]=BattleManager[_0x2a56e3(0x1cd)],BattleManager[_0x2a56e3(0x1cd)]=function(_0x151f27){const _0x307a=_0x2a56e3;VisuMZ[_0x307a(0x803)][_0x307a(0x2dd)]['call'](this,_0x151f27),$subject=this[_0x307a(0x1b7)],$targets=this[_0x307a(0x8af)],$target=this[_0x307a(0x264)]||this[_0x307a(0x8af)][0x0];},$event=null,VisuMZ['CoreEngine'][_0x2a56e3(0x7f3)]=Game_Event[_0x2a56e3(0x948)][_0x2a56e3(0x427)],Game_Event['prototype'][_0x2a56e3(0x427)]=function(){const _0x2acd8c=_0x2a56e3;VisuMZ[_0x2acd8c(0x803)][_0x2acd8c(0x7f3)][_0x2acd8c(0x697)](this),$event=this;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x434)]=Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x1cd)],Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x1cd)]=function(){const _0x9b869c=_0x2a56e3;VisuMZ[_0x9b869c(0x803)][_0x9b869c(0x434)]['call'](this),$gameMap['updateCurrentEvent']();},Game_Map[_0x2a56e3(0x948)][_0x2a56e3(0x1ce)]=function(){const _0x1d086d=_0x2a56e3;!this[_0x1d086d(0x742)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x2b6425){const _0x415bf9=_0x2a56e3;if($gameTemp)$gameTemp[_0x415bf9(0x866)](_0x2b6425);},$onceParallel=function(_0x1b2ee4){const _0x383a60=_0x2a56e3;if(SceneManager[_0x383a60(0x47a)]())'CwNRc'===_0x383a60(0x6bc)?$scene[_0x383a60(0x85d)](_0x1b2ee4):(this['createPointAnimationSprite']([_0x23a174],_0x4ddee6,_0x1742c8,_0x5ea4ce,_0x276690),_0x360794+=_0x3b3490);else{if(SceneManager[_0x383a60(0x405)]()){if(_0x383a60(0x972)!=='OzYbL'){if(Imported[_0x383a60(0x56d)])'DdclI'!=='gjOot'?$scene['playOnceParallelInterpreter'](_0x1b2ee4):(_0x376ca5=_0x25a4ff[_0x383a60(0x377)](_0x1ce094),_0x35a703=_0x5b593a[_0x383a60(0x377)](_0x36b639),_0x27de94=_0x4d98ee['round'](_0x408544),_0x4f30d6[_0x383a60(0x803)]['Bitmap_drawCircle'][_0x383a60(0x697)](this,_0x23686f,_0x652dc2,_0x5780bc,_0x4ae587),this[_0x383a60(0x7e6)]());else $gameTemp&&$gameTemp[_0x383a60(0x7f4)]()&&alert(_0x383a60(0x5fc));}else this[_0x383a60(0x96f)][_0x383a60(0x7a2)](_0xd0fc81[_0x383a60(0x7c9)][_0x383a60(0x201)]);}else{if($gameTemp&&$gameTemp['isPlaytest']()){if('XycbA'===_0x383a60(0x4c1))return _0x14917f[_0x383a60(0x803)][_0x383a60(0x3f7)][_0x383a60(0x784)][_0x383a60(0x31b)]['call'](this,_0x498d07);else alert('This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!');}}}});;StorageManager['jsonToZip']=function(_0xf434c8){return new Promise((_0x307558,_0xa15699)=>{const _0x2028c7=_0x3166;if(_0x2028c7(0x47f)===_0x2028c7(0x9a3))_0x151538[_0x2028c7(0x72c)][_0x2028c7(0x369)](_0x3efbe6);else try{const _0x33f9a9=pako[_0x2028c7(0x5c7)](_0xf434c8,{'to':_0x2028c7(0x87a),'level':0x1});if(_0x33f9a9[_0x2028c7(0x9b5)]>=0xc350){}_0x307558(_0x33f9a9);}catch(_0x49109f){if(_0x2028c7(0x7fc)!==_0x2028c7(0x20b))_0xa15699(_0x49109f);else{if(this['_subject'])this['_logWindow'][_0x2028c7(0x29a)](this[_0x2028c7(0x1b7)]);this[_0x2028c7(0x85f)]=_0x2028c7(0x4d5),this['_subject']&&this['_subject'][_0x2028c7(0x33b)]()===0x0&&(this[_0x2028c7(0x33a)](this[_0x2028c7(0x1b7)]),this[_0x2028c7(0x1b7)]=null);}}});},TextManager['stringKeyMap']=['','','',_0x2a56e3(0x202),'','','HELP','',_0x2a56e3(0x5d7),_0x2a56e3(0x271),'','',_0x2a56e3(0x634),_0x2a56e3(0x497),_0x2a56e3(0x214),'',_0x2a56e3(0x6e4),'CTRL','ALT','PAUSE','CAPSLOCK',_0x2a56e3(0x33f),_0x2a56e3(0x12f),'JUNJA',_0x2a56e3(0x89e),_0x2a56e3(0x3f3),'',_0x2a56e3(0x3c4),_0x2a56e3(0x8c4),_0x2a56e3(0x775),_0x2a56e3(0x4ab),'MODECHANGE',_0x2a56e3(0x5cc),_0x2a56e3(0x9b4),'PGDN','END',_0x2a56e3(0x172),'LEFT','UP',_0x2a56e3(0x45b),_0x2a56e3(0x379),_0x2a56e3(0x321),_0x2a56e3(0x7dd),_0x2a56e3(0x457),_0x2a56e3(0x704),_0x2a56e3(0x38a),_0x2a56e3(0x1f0),'','0','1','2','3','4','5','6','7','8','9','COLON',_0x2a56e3(0x8da),_0x2a56e3(0x80d),_0x2a56e3(0x224),_0x2a56e3(0x16c),_0x2a56e3(0x646),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x2a56e3(0x67d),'',_0x2a56e3(0x5c5),'',_0x2a56e3(0x222),_0x2a56e3(0x294),_0x2a56e3(0x594),'NUMPAD2',_0x2a56e3(0x391),'NUMPAD4','NUMPAD5','NUMPAD6','NUMPAD7',_0x2a56e3(0x79f),_0x2a56e3(0x30c),_0x2a56e3(0x7d1),_0x2a56e3(0x872),'SEPARATOR',_0x2a56e3(0x9ac),_0x2a56e3(0x6a4),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x2a56e3(0x626),_0x2a56e3(0x825),'F13',_0x2a56e3(0x451),_0x2a56e3(0x192),_0x2a56e3(0x146),_0x2a56e3(0x79b),_0x2a56e3(0x96b),_0x2a56e3(0x1ac),'F20',_0x2a56e3(0x53b),_0x2a56e3(0x1fc),_0x2a56e3(0x8e4),'F24','','','','','','','','',_0x2a56e3(0x964),_0x2a56e3(0x743),_0x2a56e3(0x794),_0x2a56e3(0x6a7),_0x2a56e3(0x478),_0x2a56e3(0x2ff),_0x2a56e3(0x26f),'','','','','','','','','',_0x2a56e3(0x61e),_0x2a56e3(0x162),'DOUBLE_QUOTE','HASH',_0x2a56e3(0x1f4),_0x2a56e3(0x468),_0x2a56e3(0x50b),_0x2a56e3(0x29e),_0x2a56e3(0x2e1),_0x2a56e3(0x69f),_0x2a56e3(0x598),'PLUS',_0x2a56e3(0x96a),_0x2a56e3(0x2d5),_0x2a56e3(0x498),_0x2a56e3(0x698),_0x2a56e3(0x3ca),'','','','',_0x2a56e3(0x331),'VOLUME_DOWN','VOLUME_UP','','',_0x2a56e3(0x8da),'EQUALS','COMMA',_0x2a56e3(0x771),_0x2a56e3(0x119),_0x2a56e3(0x24d),_0x2a56e3(0x156),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x2a56e3(0x3ce),'BACK_SLASH',_0x2a56e3(0x812),_0x2a56e3(0x8f8),'',_0x2a56e3(0x1bd),'ALTGR','',_0x2a56e3(0x525),_0x2a56e3(0x287),'',_0x2a56e3(0x99c),'','','WIN_OEM_RESET',_0x2a56e3(0x886),_0x2a56e3(0x5dc),_0x2a56e3(0x454),_0x2a56e3(0x971),_0x2a56e3(0x64b),'WIN_OEM_CUSEL',_0x2a56e3(0x5ed),_0x2a56e3(0x1f5),_0x2a56e3(0x208),_0x2a56e3(0x3c3),_0x2a56e3(0x50a),'WIN_OEM_BACKTAB',_0x2a56e3(0x45f),_0x2a56e3(0x952),'EXSEL',_0x2a56e3(0x4d4),_0x2a56e3(0x960),'ZOOM','',_0x2a56e3(0x59e),_0x2a56e3(0x557),''],TextManager[_0x2a56e3(0x41e)]=VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x3f7)][_0x2a56e3(0x635)][_0x2a56e3(0x748)],TextManager[_0x2a56e3(0x83a)]=VisuMZ[_0x2a56e3(0x803)]['Settings'][_0x2a56e3(0x635)][_0x2a56e3(0x6c1)],TextManager[_0x2a56e3(0x51f)]=VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x3f7)]['ButtonAssist'][_0x2a56e3(0x46a)],VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x4a0)]=TextManager[_0x2a56e3(0x53e)],TextManager[_0x2a56e3(0x53e)]=function(_0x40720d){const _0x159a67=_0x2a56e3;if(typeof _0x40720d==='number')return VisuMZ[_0x159a67(0x803)][_0x159a67(0x4a0)][_0x159a67(0x697)](this,_0x40720d);else{if('JrkEC'!=='JrkEC'){const _0x5dd6ff=_0x2bcf09[_0x159a67(0x697)](this);return _0x3ae3c6===_0x159a67(0x4f1)?_0x1d3342['round'](_0x5dd6ff):_0x5dd6ff;}else return this[_0x159a67(0x528)](_0x40720d);}},TextManager[_0x2a56e3(0x528)]=function(_0x1ee577){const _0x471f90=_0x2a56e3;_0x1ee577=String(_0x1ee577||'')[_0x471f90(0x67c)]();const _0x299174=VisuMZ['CoreEngine'][_0x471f90(0x3f7)]['Param'];if(_0x1ee577===_0x471f90(0x39c))return $dataSystem[_0x471f90(0x712)]['params'][0x0];if(_0x1ee577===_0x471f90(0x990))return $dataSystem['terms'][_0x471f90(0x5a0)][0x1];if(_0x1ee577==='ATK')return $dataSystem['terms'][_0x471f90(0x5a0)][0x2];if(_0x1ee577==='DEF')return $dataSystem[_0x471f90(0x712)][_0x471f90(0x5a0)][0x3];if(_0x1ee577===_0x471f90(0x7bf))return $dataSystem['terms'][_0x471f90(0x5a0)][0x4];if(_0x1ee577==='MDF')return $dataSystem[_0x471f90(0x712)]['params'][0x5];if(_0x1ee577===_0x471f90(0x2f9))return $dataSystem[_0x471f90(0x712)][_0x471f90(0x5a0)][0x6];if(_0x1ee577==='LUK')return $dataSystem[_0x471f90(0x712)]['params'][0x7];if(_0x1ee577===_0x471f90(0x98e))return _0x299174[_0x471f90(0x4a3)];if(_0x1ee577===_0x471f90(0x59a))return _0x299174['XParamVocab1'];if(_0x1ee577===_0x471f90(0x16a))return _0x299174['XParamVocab2'];if(_0x1ee577===_0x471f90(0x58c))return _0x299174[_0x471f90(0x958)];if(_0x1ee577===_0x471f90(0x227))return _0x299174[_0x471f90(0x90c)];if(_0x1ee577===_0x471f90(0x5f0))return _0x299174[_0x471f90(0x57a)];if(_0x1ee577===_0x471f90(0x388))return _0x299174[_0x471f90(0x21b)];if(_0x1ee577===_0x471f90(0x9b0))return _0x299174[_0x471f90(0x470)];if(_0x1ee577==='MRG')return _0x299174[_0x471f90(0x80f)];if(_0x1ee577==='TRG')return _0x299174[_0x471f90(0x1c2)];if(_0x1ee577===_0x471f90(0x2b0))return _0x299174['SParamVocab0'];if(_0x1ee577==='GRD')return _0x299174[_0x471f90(0x11b)];if(_0x1ee577===_0x471f90(0x7d3))return _0x299174[_0x471f90(0x588)];if(_0x1ee577==='PHA')return _0x299174[_0x471f90(0x937)];if(_0x1ee577===_0x471f90(0x2c1))return _0x299174[_0x471f90(0x230)];if(_0x1ee577===_0x471f90(0x3d4))return _0x299174[_0x471f90(0x56c)];if(_0x1ee577==='PDR')return _0x299174['SParamVocab6'];if(_0x1ee577===_0x471f90(0x436))return _0x299174[_0x471f90(0x4fa)];if(_0x1ee577===_0x471f90(0x4ca))return _0x299174[_0x471f90(0x9b9)];if(_0x1ee577==='EXR')return _0x299174[_0x471f90(0x7e8)];if(VisuMZ[_0x471f90(0x803)][_0x471f90(0x55f)][_0x1ee577]){if(_0x471f90(0x169)!==_0x471f90(0x5c4))return VisuMZ[_0x471f90(0x803)]['CustomParamNames'][_0x1ee577];else{let _0x5b6f78=_0x471f90(0x35e)+_0x50161b+_0x471f90(0x5db);if(this[_0x471f90(0x8c1)](_0x5b6f78))return this[_0x471f90(0x5e9)][_0x5b6f78];return this[_0x471f90(0x5e9)][_0x5b6f78]=_0x11f127[_0x471f90(0x803)][_0x471f90(0x3f7)]['Param']['XParameterFormula'][_0x471f90(0x697)](this,_0x27b6f2),this['_cache'][_0x5b6f78];}}return'';},TextManager[_0x2a56e3(0x849)]=function(_0x51609c){const _0x307816=_0x2a56e3,_0x2887ef=Input['getLastUsedGamepadType']();if(_0x2887ef===_0x307816(0x5fb))return this[_0x307816(0x870)](_0x51609c);else{if(_0x307816(0x4ec)===_0x307816(0x4ec))return this[_0x307816(0x800)](_0x2887ef,_0x51609c);else _0x5c051f[_0x307816(0x764)]=!![],_0x5b0705[_0x307816(0x803)][_0x307816(0x572)][_0x307816(0x697)](this,_0x48f51f,_0x452169),_0x4ed73d[_0x307816(0x764)]=_0x11c727;}},TextManager[_0x2a56e3(0x870)]=function(_0x5ad2ff){const _0x252b95=_0x2a56e3;if(_0x5ad2ff===_0x252b95(0x71b))_0x5ad2ff='escape';if(_0x5ad2ff===_0x252b95(0x3d5))_0x5ad2ff=_0x252b95(0x78c);let _0x347e25=[];for(let _0x103b2d in Input[_0x252b95(0x54b)]){if(_0x252b95(0x403)===_0x252b95(0x2a6))_0x560d69+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{_0x103b2d=Number(_0x103b2d);if(_0x103b2d>=0x60&&_0x103b2d<=0x69)continue;if([0x12,0x20]['includes'](_0x103b2d))continue;_0x5ad2ff===Input['keyMapper'][_0x103b2d]&&_0x347e25[_0x252b95(0x487)](_0x103b2d);}}for(let _0x1adfa3=0x0;_0x1adfa3<_0x347e25[_0x252b95(0x9b5)];_0x1adfa3++){_0x347e25[_0x1adfa3]=TextManager[_0x252b95(0x481)][_0x347e25[_0x1adfa3]];}return this['makeInputButtonString'](_0x347e25);},TextManager[_0x2a56e3(0x558)]=function(_0x49e823){const _0x2d9b94=_0x2a56e3,_0x583de8=VisuMZ['CoreEngine'][_0x2d9b94(0x3f7)][_0x2d9b94(0x635)],_0x30d7f6=_0x583de8[_0x2d9b94(0x813)],_0x41d637=_0x49e823[_0x2d9b94(0x71f)](),_0x238574='Key%1'[_0x2d9b94(0x6ba)](_0x41d637);return _0x583de8[_0x238574]?_0x583de8[_0x238574]:_0x30d7f6['format'](_0x41d637);},TextManager[_0x2a56e3(0x8ae)]=function(_0x3a9c3e,_0x553751){const _0x12415c=_0x2a56e3,_0x32ac5b=VisuMZ[_0x12415c(0x803)]['Settings'][_0x12415c(0x635)],_0x5f5db6=_0x32ac5b[_0x12415c(0x585)],_0x2e4312=this[_0x12415c(0x849)](_0x3a9c3e),_0x3cc001=this[_0x12415c(0x849)](_0x553751);return _0x5f5db6[_0x12415c(0x6ba)](_0x2e4312,_0x3cc001);},TextManager[_0x2a56e3(0x800)]=function(_0x5f97c2,_0x1d6c49){const _0x1aca71=_0x2a56e3,_0x48b9c5=_0x5f97c2[_0x1aca71(0x4ee)]()[_0x1aca71(0x74d)](),_0x1b17d9=VisuMZ[_0x1aca71(0x803)][_0x1aca71(0x60b)][_0x48b9c5];if(!_0x1b17d9)return this[_0x1aca71(0x962)](_0x5f97c2,_0x1d6c49);return _0x1b17d9[_0x1d6c49]||this[_0x1aca71(0x870)](_0x5f97c2,_0x1d6c49);},TextManager[_0x2a56e3(0x962)]=function(_0xd14e19,_0x765ef8){const _0x38827d=_0x2a56e3,_0xb74444=_0xd14e19['toLowerCase']()[_0x38827d(0x74d)]();for(const _0x51c37f in VisuMZ[_0x38827d(0x803)][_0x38827d(0x4bd)]){if(_0xb74444[_0x38827d(0x559)](_0x51c37f)){const _0x41fb36=VisuMZ[_0x38827d(0x803)][_0x38827d(0x4bd)][_0x51c37f],_0x2da416=VisuMZ[_0x38827d(0x803)][_0x38827d(0x60b)][_0x41fb36];return _0x2da416[_0x765ef8]||this[_0x38827d(0x870)](_0x765ef8);}}return this[_0x38827d(0x870)](_0x765ef8);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x46b)]=ColorManager[_0x2a56e3(0x93d)],ColorManager[_0x2a56e3(0x93d)]=function(){const _0x2f2a3c=_0x2a56e3;VisuMZ['CoreEngine'][_0x2f2a3c(0x46b)][_0x2f2a3c(0x697)](this),this[_0x2f2a3c(0x853)]=this[_0x2f2a3c(0x853)]||{};},ColorManager[_0x2a56e3(0x70c)]=function(_0x41b40e,_0x1ef888){const _0x247918=_0x2a56e3;_0x1ef888=String(_0x1ef888),this[_0x247918(0x853)]=this[_0x247918(0x853)]||{};if(_0x1ef888[_0x247918(0x76d)](/#(.*)/i)){if(_0x247918(0x52c)!==_0x247918(0x783))this['_colorCache'][_0x41b40e]=_0x247918(0x518)[_0x247918(0x6ba)](String(RegExp['$1']));else{var _0x10a83c=_0x447f48(_0x340213['$1']);try{_0x216e20+=_0x4ab46b(_0x10a83c);}catch(_0x1e8210){if(_0xc8171c[_0x247918(0x7f4)]())_0x4b1de2[_0x247918(0x68a)](_0x1e8210);}}}else{if('WJTGY'!==_0x247918(0x12c))this[_0x247918(0x853)][_0x41b40e]=this[_0x247918(0x535)](Number(_0x1ef888));else{if(_0x3fc25d)_0x435e89[_0x247918(0x866)](_0x34f1d8);}}return this[_0x247918(0x853)][_0x41b40e];},ColorManager['getColor']=function(_0x5d3be1){const _0x56a9eb=_0x2a56e3;return _0x5d3be1=String(_0x5d3be1),_0x5d3be1['match'](/#(.*)/i)?_0x56a9eb(0x518)[_0x56a9eb(0x6ba)](String(RegExp['$1'])):this['textColor'](Number(_0x5d3be1));},ColorManager[_0x2a56e3(0x636)]=function(){const _0x1b54c2=_0x2a56e3;this[_0x1b54c2(0x853)]={};},ColorManager['normalColor']=function(){const _0x10c0c6=_0x2a56e3,_0x590228=_0x10c0c6(0x1a0);this['_colorCache']=this['_colorCache']||{};if(this[_0x10c0c6(0x853)][_0x590228])return this[_0x10c0c6(0x853)][_0x590228];const _0x151dd=VisuMZ[_0x10c0c6(0x803)][_0x10c0c6(0x3f7)]['Color'][_0x10c0c6(0x583)];return this[_0x10c0c6(0x70c)](_0x590228,_0x151dd);},ColorManager['systemColor']=function(){const _0x125d16=_0x2a56e3,_0x28d8af=_0x125d16(0x5d2);this['_colorCache']=this[_0x125d16(0x853)]||{};if(this[_0x125d16(0x853)][_0x28d8af])return this[_0x125d16(0x853)][_0x28d8af];const _0x3077bb=VisuMZ[_0x125d16(0x803)][_0x125d16(0x3f7)][_0x125d16(0x784)][_0x125d16(0x14e)];return this['getColorDataFromPluginParameters'](_0x28d8af,_0x3077bb);},ColorManager['crisisColor']=function(){const _0x197ff4=_0x2a56e3,_0x305fec=_0x197ff4(0x13a);this['_colorCache']=this[_0x197ff4(0x853)]||{};if(this[_0x197ff4(0x853)][_0x305fec])return this['_colorCache'][_0x305fec];const _0x840d7b=VisuMZ['CoreEngine']['Settings'][_0x197ff4(0x784)][_0x197ff4(0x77d)];return this[_0x197ff4(0x70c)](_0x305fec,_0x840d7b);},ColorManager[_0x2a56e3(0x4b6)]=function(){const _0x1dc410=_0x2a56e3,_0x25adf2=_0x1dc410(0x2ba);this['_colorCache']=this[_0x1dc410(0x853)]||{};if(this[_0x1dc410(0x853)][_0x25adf2])return this['_colorCache'][_0x25adf2];const _0x75eed4=VisuMZ['CoreEngine'][_0x1dc410(0x3f7)][_0x1dc410(0x784)][_0x1dc410(0x8f3)];return this[_0x1dc410(0x70c)](_0x25adf2,_0x75eed4);},ColorManager['gaugeBackColor']=function(){const _0x28b4db=_0x2a56e3,_0x2ab6d9='_stored_gaugeBackColor';this[_0x28b4db(0x853)]=this['_colorCache']||{};if(this[_0x28b4db(0x853)][_0x2ab6d9])return this['_colorCache'][_0x2ab6d9];const _0x242f81=VisuMZ['CoreEngine'][_0x28b4db(0x3f7)][_0x28b4db(0x784)][_0x28b4db(0x289)];return this['getColorDataFromPluginParameters'](_0x2ab6d9,_0x242f81);},ColorManager['hpGaugeColor1']=function(){const _0x4068a9=_0x2a56e3,_0x52642b='_stored_hpGaugeColor1';this[_0x4068a9(0x853)]=this['_colorCache']||{};if(this[_0x4068a9(0x853)][_0x52642b])return this[_0x4068a9(0x853)][_0x52642b];const _0x4ba4bc=VisuMZ[_0x4068a9(0x803)]['Settings'][_0x4068a9(0x784)]['ColorHPGauge1'];return this['getColorDataFromPluginParameters'](_0x52642b,_0x4ba4bc);},ColorManager[_0x2a56e3(0x56a)]=function(){const _0x978802=_0x2a56e3,_0x42c1b6=_0x978802(0x8e2);this['_colorCache']=this['_colorCache']||{};if(this[_0x978802(0x853)][_0x42c1b6])return this['_colorCache'][_0x42c1b6];const _0x47495c=VisuMZ[_0x978802(0x803)][_0x978802(0x3f7)][_0x978802(0x784)]['ColorHPGauge2'];return this[_0x978802(0x70c)](_0x42c1b6,_0x47495c);},ColorManager['mpGaugeColor1']=function(){const _0x535a71=_0x2a56e3,_0x35a81a=_0x535a71(0x303);this['_colorCache']=this['_colorCache']||{};if(this[_0x535a71(0x853)][_0x35a81a])return this[_0x535a71(0x853)][_0x35a81a];const _0xed5e1a=VisuMZ[_0x535a71(0x803)]['Settings'][_0x535a71(0x784)]['ColorMPGauge1'];return this[_0x535a71(0x70c)](_0x35a81a,_0xed5e1a);},ColorManager[_0x2a56e3(0x437)]=function(){const _0xeb832=_0x2a56e3,_0x16771b='_stored_mpGaugeColor2';this[_0xeb832(0x853)]=this['_colorCache']||{};if(this[_0xeb832(0x853)][_0x16771b])return this[_0xeb832(0x853)][_0x16771b];const _0x2dbf72=VisuMZ['CoreEngine'][_0xeb832(0x3f7)][_0xeb832(0x784)][_0xeb832(0x12b)];return this[_0xeb832(0x70c)](_0x16771b,_0x2dbf72);},ColorManager[_0x2a56e3(0x6f8)]=function(){const _0x5acf00=_0x2a56e3,_0x2c5f7a=_0x5acf00(0x378);this[_0x5acf00(0x853)]=this[_0x5acf00(0x853)]||{};if(this[_0x5acf00(0x853)][_0x2c5f7a])return this[_0x5acf00(0x853)][_0x2c5f7a];const _0x2ebd94=VisuMZ[_0x5acf00(0x803)][_0x5acf00(0x3f7)][_0x5acf00(0x784)][_0x5acf00(0x1e9)];return this[_0x5acf00(0x70c)](_0x2c5f7a,_0x2ebd94);},ColorManager['powerUpColor']=function(){const _0x27835b=_0x2a56e3,_0x234780='_stored_powerUpColor';this['_colorCache']=this[_0x27835b(0x853)]||{};if(this[_0x27835b(0x853)][_0x234780])return this['_colorCache'][_0x234780];const _0x142db5=VisuMZ[_0x27835b(0x803)][_0x27835b(0x3f7)][_0x27835b(0x784)]['ColorPowerUp'];return this[_0x27835b(0x70c)](_0x234780,_0x142db5);},ColorManager['powerDownColor']=function(){const _0x54b305=_0x2a56e3,_0x27dbcb=_0x54b305(0x923);this[_0x54b305(0x853)]=this[_0x54b305(0x853)]||{};if(this[_0x54b305(0x853)][_0x27dbcb])return this[_0x54b305(0x853)][_0x27dbcb];const _0x576013=VisuMZ['CoreEngine'][_0x54b305(0x3f7)]['Color'][_0x54b305(0x84c)];return this[_0x54b305(0x70c)](_0x27dbcb,_0x576013);},ColorManager['ctGaugeColor1']=function(){const _0x3b3313=_0x2a56e3,_0x200231=_0x3b3313(0x642);this[_0x3b3313(0x853)]=this[_0x3b3313(0x853)]||{};if(this['_colorCache'][_0x200231])return this['_colorCache'][_0x200231];const _0x39ed13=VisuMZ[_0x3b3313(0x803)][_0x3b3313(0x3f7)][_0x3b3313(0x784)][_0x3b3313(0x37b)];return this['getColorDataFromPluginParameters'](_0x200231,_0x39ed13);},ColorManager['ctGaugeColor2']=function(){const _0x5cc9f3=_0x2a56e3,_0x185bc2=_0x5cc9f3(0x833);this[_0x5cc9f3(0x853)]=this[_0x5cc9f3(0x853)]||{};if(this['_colorCache'][_0x185bc2])return this[_0x5cc9f3(0x853)][_0x185bc2];const _0x27a699=VisuMZ['CoreEngine'][_0x5cc9f3(0x3f7)][_0x5cc9f3(0x784)][_0x5cc9f3(0x7ea)];return this['getColorDataFromPluginParameters'](_0x185bc2,_0x27a699);},ColorManager[_0x2a56e3(0x383)]=function(){const _0x17217b=_0x2a56e3,_0x21f240=_0x17217b(0x44c);this[_0x17217b(0x853)]=this[_0x17217b(0x853)]||{};if(this[_0x17217b(0x853)][_0x21f240])return this[_0x17217b(0x853)][_0x21f240];const _0x272491=VisuMZ[_0x17217b(0x803)]['Settings']['Color'][_0x17217b(0x824)];return this[_0x17217b(0x70c)](_0x21f240,_0x272491);},ColorManager['tpGaugeColor2']=function(){const _0x58b0ea=_0x2a56e3,_0x3abe2b=_0x58b0ea(0x861);this[_0x58b0ea(0x853)]=this['_colorCache']||{};if(this['_colorCache'][_0x3abe2b])return this[_0x58b0ea(0x853)][_0x3abe2b];const _0x119bcb=VisuMZ[_0x58b0ea(0x803)][_0x58b0ea(0x3f7)][_0x58b0ea(0x784)][_0x58b0ea(0x3ad)];return this['getColorDataFromPluginParameters'](_0x3abe2b,_0x119bcb);},ColorManager[_0x2a56e3(0x3d2)]=function(){const _0x12189c=_0x2a56e3,_0x53cbfe=_0x12189c(0x31f);this[_0x12189c(0x853)]=this[_0x12189c(0x853)]||{};if(this[_0x12189c(0x853)][_0x53cbfe])return this[_0x12189c(0x853)][_0x53cbfe];const _0x504e83=VisuMZ[_0x12189c(0x803)]['Settings']['Color'][_0x12189c(0x322)];return this[_0x12189c(0x70c)](_0x53cbfe,_0x504e83);},ColorManager[_0x2a56e3(0x3d7)]=function(){const _0x30b749=_0x2a56e3,_0x4a5d3a=_0x30b749(0x8ce);this[_0x30b749(0x853)]=this['_colorCache']||{};if(this[_0x30b749(0x853)][_0x4a5d3a])return this[_0x30b749(0x853)][_0x4a5d3a];const _0x3e68b5=VisuMZ[_0x30b749(0x803)][_0x30b749(0x3f7)]['Color'][_0x30b749(0x322)];return this[_0x30b749(0x70c)](_0x4a5d3a,_0x3e68b5);},ColorManager['expGaugeColor1']=function(){const _0x1999dd=_0x2a56e3,_0x549cc0='_stored_expGaugeColor1';this[_0x1999dd(0x853)]=this['_colorCache']||{};if(this[_0x1999dd(0x853)][_0x549cc0])return this[_0x1999dd(0x853)][_0x549cc0];const _0x1942da=VisuMZ[_0x1999dd(0x803)][_0x1999dd(0x3f7)]['Color'][_0x1999dd(0x6b8)];return this['getColorDataFromPluginParameters'](_0x549cc0,_0x1942da);},ColorManager[_0x2a56e3(0x720)]=function(){const _0x3bb1a5=_0x2a56e3,_0x97a262=_0x3bb1a5(0x8cd);this[_0x3bb1a5(0x853)]=this[_0x3bb1a5(0x853)]||{};if(this[_0x3bb1a5(0x853)][_0x97a262])return this[_0x3bb1a5(0x853)][_0x97a262];const _0x3cbfe8=VisuMZ[_0x3bb1a5(0x803)][_0x3bb1a5(0x3f7)][_0x3bb1a5(0x784)][_0x3bb1a5(0x32c)];return this['getColorDataFromPluginParameters'](_0x97a262,_0x3cbfe8);},ColorManager['maxLvGaugeColor1']=function(){const _0x4d5db9=_0x2a56e3,_0x59937c=_0x4d5db9(0x5f6);this[_0x4d5db9(0x853)]=this['_colorCache']||{};if(this[_0x4d5db9(0x853)][_0x59937c])return this[_0x4d5db9(0x853)][_0x59937c];const _0x542d74=VisuMZ[_0x4d5db9(0x803)]['Settings'][_0x4d5db9(0x784)][_0x4d5db9(0x2f0)];return this[_0x4d5db9(0x70c)](_0x59937c,_0x542d74);},ColorManager[_0x2a56e3(0x719)]=function(){const _0x3cd08b=_0x2a56e3,_0x28a5bb=_0x3cd08b(0x5bd);this[_0x3cd08b(0x853)]=this['_colorCache']||{};if(this[_0x3cd08b(0x853)][_0x28a5bb])return this[_0x3cd08b(0x853)][_0x28a5bb];const _0x297275=VisuMZ['CoreEngine'][_0x3cd08b(0x3f7)][_0x3cd08b(0x784)][_0x3cd08b(0x360)];return this[_0x3cd08b(0x70c)](_0x28a5bb,_0x297275);},ColorManager['hpColor']=function(_0x397b91){const _0x1d5696=_0x2a56e3;return VisuMZ[_0x1d5696(0x803)][_0x1d5696(0x3f7)][_0x1d5696(0x784)][_0x1d5696(0x1a6)][_0x1d5696(0x697)](this,_0x397b91);},ColorManager['mpColor']=function(_0x50e61e){const _0x22ba1e=_0x2a56e3;return VisuMZ[_0x22ba1e(0x803)][_0x22ba1e(0x3f7)][_0x22ba1e(0x784)][_0x22ba1e(0x617)]['call'](this,_0x50e61e);},ColorManager[_0x2a56e3(0x76b)]=function(_0x345267){const _0x2ee7e3=_0x2a56e3;return VisuMZ['CoreEngine'][_0x2ee7e3(0x3f7)]['Color'][_0x2ee7e3(0x31b)][_0x2ee7e3(0x697)](this,_0x345267);},ColorManager['paramchangeTextColor']=function(_0x46f449){const _0x5056dc=_0x2a56e3;return VisuMZ[_0x5056dc(0x803)][_0x5056dc(0x3f7)][_0x5056dc(0x784)][_0x5056dc(0x88a)]['call'](this,_0x46f449);},ColorManager['damageColor']=function(_0x43b6a9){const _0x40aad4=_0x2a56e3;return VisuMZ[_0x40aad4(0x803)][_0x40aad4(0x3f7)][_0x40aad4(0x784)][_0x40aad4(0x639)][_0x40aad4(0x697)](this,_0x43b6a9);},ColorManager[_0x2a56e3(0x2ee)]=function(){const _0x13b074=_0x2a56e3;return VisuMZ['CoreEngine'][_0x13b074(0x3f7)][_0x13b074(0x784)][_0x13b074(0x782)];},ColorManager[_0x2a56e3(0x1fd)]=function(){const _0x15d10a=_0x2a56e3;return VisuMZ[_0x15d10a(0x803)]['Settings'][_0x15d10a(0x784)][_0x15d10a(0x711)]||_0x15d10a(0x39a);},ColorManager[_0x2a56e3(0x2a8)]=function(){const _0x59f988=_0x2a56e3;return VisuMZ['CoreEngine']['Settings'][_0x59f988(0x784)][_0x59f988(0x4f5)]||'rgba(0,\x200,\x200,\x201.0)';},ColorManager['dimColor1']=function(){const _0x67cdc3=_0x2a56e3;return VisuMZ[_0x67cdc3(0x803)][_0x67cdc3(0x3f7)]['Color'][_0x67cdc3(0x6d4)];},ColorManager['dimColor2']=function(){const _0x104d31=_0x2a56e3;return VisuMZ['CoreEngine'][_0x104d31(0x3f7)][_0x104d31(0x784)]['DimColor2'];},ColorManager['itemBackColor1']=function(){const _0x24532a=_0x2a56e3;return VisuMZ[_0x24532a(0x803)][_0x24532a(0x3f7)][_0x24532a(0x784)][_0x24532a(0x889)];},ColorManager[_0x2a56e3(0x77b)]=function(){const _0x1bed3c=_0x2a56e3;return VisuMZ[_0x1bed3c(0x803)][_0x1bed3c(0x3f7)][_0x1bed3c(0x784)][_0x1bed3c(0x7c7)];},SceneManager[_0x2a56e3(0x87b)]=[],SceneManager['isSceneBattle']=function(){const _0x490f8e=_0x2a56e3;return this[_0x490f8e(0x97a)]&&this[_0x490f8e(0x97a)][_0x490f8e(0x34f)]===Scene_Battle;},SceneManager[_0x2a56e3(0x47a)]=function(){const _0xb6fa78=_0x2a56e3;return this[_0xb6fa78(0x97a)]&&this[_0xb6fa78(0x97a)][_0xb6fa78(0x34f)]===Scene_Map;},SceneManager[_0x2a56e3(0x955)]=function(){const _0x28945d=_0x2a56e3;return this[_0x28945d(0x97a)]&&this[_0x28945d(0x97a)]instanceof Scene_Map;},VisuMZ[_0x2a56e3(0x803)]['SceneManager_initialize']=SceneManager[_0x2a56e3(0x14c)],SceneManager[_0x2a56e3(0x14c)]=function(){const _0x562722=_0x2a56e3;VisuMZ['CoreEngine'][_0x562722(0x57b)][_0x562722(0x697)](this),this[_0x562722(0x45c)]();},VisuMZ[_0x2a56e3(0x803)]['SceneManager_onKeyDown']=SceneManager['onKeyDown'],SceneManager[_0x2a56e3(0x819)]=function(_0x2eeea4){const _0x22611a=_0x2a56e3;if($gameTemp)this['onKeyDownKeysF6F7'](_0x2eeea4);VisuMZ['CoreEngine'][_0x22611a(0x7a1)]['call'](this,_0x2eeea4);},SceneManager[_0x2a56e3(0x2ea)]=function(_0x2dc9ac){const _0x1b57c7=_0x2a56e3;if(!_0x2dc9ac['ctrlKey']&&!_0x2dc9ac[_0x1b57c7(0x1c7)])switch(_0x2dc9ac['keyCode']){case 0x54:this['playTestCtrlT']();break;case 0x75:this[_0x1b57c7(0x876)]();break;case 0x76:if(Input['isPressed'](_0x1b57c7(0x6fd))||Input[_0x1b57c7(0x2a1)](_0x1b57c7(0x5ab)))return;this[_0x1b57c7(0x398)]();break;}},SceneManager['playTestF6']=function(){const _0x4adf83=_0x2a56e3;if($gameTemp['isPlaytest']()&&VisuMZ[_0x4adf83(0x803)][_0x4adf83(0x3f7)][_0x4adf83(0x2fc)][_0x4adf83(0x9a6)]){if('iwADT'!=='gUYAD'){ConfigManager[_0x4adf83(0x2cd)]!==0x0?(ConfigManager[_0x4adf83(0x648)]=0x0,ConfigManager[_0x4adf83(0x92c)]=0x0,ConfigManager[_0x4adf83(0x143)]=0x0,ConfigManager[_0x4adf83(0x2cd)]=0x0):(ConfigManager[_0x4adf83(0x648)]=0x64,ConfigManager[_0x4adf83(0x92c)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager[_0x4adf83(0x2cd)]=0x64);ConfigManager[_0x4adf83(0x3da)]();if(this[_0x4adf83(0x97a)]['constructor']===Scene_Options){if(this['_scene'][_0x4adf83(0x95b)])this['_scene']['_optionsWindow'][_0x4adf83(0x5fe)]();if(this[_0x4adf83(0x97a)][_0x4adf83(0x6c2)])this[_0x4adf83(0x97a)][_0x4adf83(0x6c2)]['refresh']();}}else return![];}},SceneManager[_0x2a56e3(0x398)]=function(){const _0x1eff25=_0x2a56e3;$gameTemp[_0x1eff25(0x7f4)]()&&VisuMZ['CoreEngine'][_0x1eff25(0x3f7)][_0x1eff25(0x2fc)]['F7key']&&($gameTemp[_0x1eff25(0x97c)]=!$gameTemp[_0x1eff25(0x97c)]);},SceneManager[_0x2a56e3(0x9a4)]=function(){const _0xf4deec=_0x2a56e3;if(!$gameTemp[_0xf4deec(0x7f4)]())return;if(!SceneManager[_0xf4deec(0x405)]())return;for(const _0x31df32 of $gameParty['members']()){if(!_0x31df32)continue;_0x31df32[_0xf4deec(0x4db)](_0x31df32[_0xf4deec(0x2be)]());}},SceneManager[_0x2a56e3(0x45c)]=function(){const _0x373bf9=_0x2a56e3;this[_0x373bf9(0x29b)]=![],this[_0x373bf9(0x1d1)]=!VisuMZ['CoreEngine'][_0x373bf9(0x3f7)]['UI'][_0x373bf9(0x29f)];},SceneManager[_0x2a56e3(0x8e1)]=function(_0x1b8b26){const _0x2bd0c7=_0x2a56e3;VisuMZ[_0x2bd0c7(0x803)][_0x2bd0c7(0x3f7)]['UI'][_0x2bd0c7(0x887)]&&(this[_0x2bd0c7(0x29b)]=_0x1b8b26);},SceneManager[_0x2a56e3(0x45e)]=function(){return this['_sideButtonLayout'];},SceneManager[_0x2a56e3(0x55b)]=function(){const _0x461600=_0x2a56e3;return this[_0x461600(0x1d1)];},SceneManager[_0x2a56e3(0x3e1)]=function(){const _0x1f55bf=_0x2a56e3;return this[_0x1f55bf(0x55b)]()||this['isSideButtonLayout']();},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x4aa)]=SceneManager['isGameActive'],SceneManager['isGameActive']=function(){const _0x92de4f=_0x2a56e3;return VisuMZ[_0x92de4f(0x803)]['Settings'][_0x92de4f(0x2fc)]['RequireFocus']?VisuMZ[_0x92de4f(0x803)][_0x92de4f(0x4aa)][_0x92de4f(0x697)](this):!![];},SceneManager[_0x2a56e3(0x848)]=function(_0x2c21f8){const _0x453f97=_0x2a56e3;if(_0x2c21f8 instanceof Error){if(_0x453f97(0x60c)!=='pIgdR')this[_0x453f97(0x7e2)](_0x2c21f8);else return this[_0x453f97(0x3e8)](_0x37dce4);}else _0x2c21f8 instanceof Array&&_0x2c21f8[0x0]===_0x453f97(0x228)?this[_0x453f97(0x765)](_0x2c21f8):this[_0x453f97(0x740)](_0x2c21f8);this[_0x453f97(0x34a)]();},VisuMZ[_0x2a56e3(0x803)]['BattleManager_processEscape']=BattleManager[_0x2a56e3(0x8bd)],BattleManager[_0x2a56e3(0x8bd)]=function(){const _0x4e7495=_0x2a56e3;if(VisuMZ[_0x4e7495(0x803)][_0x4e7495(0x3f7)][_0x4e7495(0x2fc)][_0x4e7495(0x47d)])this[_0x4e7495(0x8de)]();else return VisuMZ['CoreEngine'][_0x4e7495(0x982)][_0x4e7495(0x697)](this);},BattleManager[_0x2a56e3(0x8de)]=function(){const _0x49a353=_0x2a56e3;return $gameParty[_0x49a353(0x8f4)](),SoundManager[_0x49a353(0x810)](),this[_0x49a353(0x83d)](),!![];},BattleManager[_0x2a56e3(0x6d2)]=function(){const _0x1548d9=_0x2a56e3;return $gameSystem[_0x1548d9(0x42c)]()>=0x1;},BattleManager['isActiveTpb']=function(){return $gameSystem['getBattleSystem']()===0x1;},VisuMZ['CoreEngine'][_0x2a56e3(0x2bd)]=Game_Temp[_0x2a56e3(0x948)][_0x2a56e3(0x14c)],Game_Temp[_0x2a56e3(0x948)]['initialize']=function(){const _0x25d1b1=_0x2a56e3;VisuMZ[_0x25d1b1(0x803)][_0x25d1b1(0x2bd)]['call'](this),this[_0x25d1b1(0x450)](),this[_0x25d1b1(0x7ed)](),this[_0x25d1b1(0x5c0)]();},Game_Temp[_0x2a56e3(0x948)]['forceOutOfPlaytest']=function(){const _0xc9b301=_0x2a56e3;if(VisuMZ['CoreEngine']['Settings']['QoL'][_0xc9b301(0x308)]){if(_0xc9b301(0x48d)!==_0xc9b301(0x1c4))this[_0xc9b301(0x93a)]=![];else{if(_0x20e273)_0xeef5fc['ParseItemNotetags'](_0x17e968);}}},Game_Temp[_0x2a56e3(0x948)][_0x2a56e3(0x827)]=function(_0x2e3678){const _0x27599f=_0x2a56e3;this[_0x27599f(0x335)]=_0x2e3678;},Game_Temp['prototype'][_0x2a56e3(0x860)]=function(){const _0x1dc747=_0x2a56e3;return this[_0x1dc747(0x335)];},Game_Temp['prototype'][_0x2a56e3(0x732)]=function(){const _0x2fbef5=_0x2a56e3;this['_forcedTroopView']=undefined,this[_0x2fbef5(0x8f9)]=undefined;},Game_Temp[_0x2a56e3(0x948)][_0x2a56e3(0x705)]=function(_0x4ae813){const _0x618bd3=_0x2a56e3;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x618bd3(0x89c)]($dataMap['note']);const _0x432be5=$dataTroops[_0x4ae813];if(_0x432be5){let _0x32cd4b=DataManager[_0x618bd3(0x301)](_0x432be5['id']);this[_0x618bd3(0x89c)](_0x32cd4b);}},Game_Temp[_0x2a56e3(0x948)]['parseForcedGameTroopSettingsCoreEngine']=function(_0x296ccd){const _0x1cd111=_0x2a56e3;if(!_0x296ccd)return;if(_0x296ccd[_0x1cd111(0x76d)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))'XQPaS'!==_0x1cd111(0x212)?this[_0x1cd111(0x8f9)]=_0x1cd111(0x873):this[_0x1cd111(0x148)]='FV';else{if(_0x296ccd[_0x1cd111(0x76d)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i)){if(_0x1cd111(0x480)==='lGEhL')this[_0x1cd111(0x148)]='SV';else return this[_0x1cd111(0x535)](_0x2bd8a0(_0x5e9203));}else{if(_0x296ccd[_0x1cd111(0x76d)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x5c7547=String(RegExp['$1']);if(_0x5c7547[_0x1cd111(0x76d)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x1cd111(0x148)]='FV';else _0x5c7547[_0x1cd111(0x76d)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x1cd111(0x148)]='SV');}}}if(_0x296ccd[_0x1cd111(0x76d)](/<(?:DTB)>/i))this[_0x1cd111(0x8f9)]=0x0;else{if(_0x296ccd[_0x1cd111(0x76d)](/<(?:TPB|ATB)[ ]ACTIVE>/i)){if(_0x1cd111(0x88e)!==_0x1cd111(0x44e))this[_0x1cd111(0x8f9)]=0x1;else for(const _0x27cfc1 of _0x3c57d1){if(_0x27cfc1&&_0x27cfc1['connected']){if(this['isGamepadButtonPressed'](_0x27cfc1))return!![];if(this['isGamepadAxisMoved'](_0x27cfc1))return!![];}}}else{if(_0x296ccd['match'](/<(?:TPB|ATB)[ ]WAIT>/i)){if(_0x1cd111(0x2e4)===_0x1cd111(0x539))return _0x16f642['vertJS'][_0x1cd111(0x697)](this);else this[_0x1cd111(0x8f9)]=0x2;}else{if(_0x296ccd[_0x1cd111(0x76d)](/<(?:CTB)>/i))Imported[_0x1cd111(0x5f2)]&&(this[_0x1cd111(0x8f9)]=_0x1cd111(0x52d));else{if(_0x296ccd[_0x1cd111(0x76d)](/<(?:STB)>/i))Imported['VisuMZ_2_BattleSystemSTB']&&(_0x1cd111(0x199)!==_0x1cd111(0x37c)?this[_0x1cd111(0x8f9)]='STB':(this[_0x1cd111(0x251)]()[_0x1cd111(0x15f)]=!![],this[_0x1cd111(0x251)]()[_0x1cd111(0x70a)]=_0x7befbd(_0x58a579['$1'])));else{if(_0x296ccd[_0x1cd111(0x76d)](/<(?:BTB)>/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x1cd111(0x8f9)]=_0x1cd111(0x563));else{if(_0x296ccd[_0x1cd111(0x76d)](/<(?:FTB)>/i))Imported[_0x1cd111(0x6f2)]&&(_0x1cd111(0x3ff)!=='poZEA'?this[_0x1cd111(0x65e)][_0x1cd111(0x1d7)]():this[_0x1cd111(0x8f9)]=_0x1cd111(0x873));else{if(_0x296ccd[_0x1cd111(0x76d)](/<(?:OTB)>/i)){if(_0x1cd111(0x5bf)===_0x1cd111(0x44f))_0x2fb76c=!_0x22a6be;else{if(Imported[_0x1cd111(0x36d)]){if('rTwCO'!=='rTwCO'){if(this[_0x1cd111(0x43b)](_0x3be61a))return!![];if(this[_0x1cd111(0x524)](_0x1b807f))return!![];}else this[_0x1cd111(0x8f9)]=_0x1cd111(0x299);}}}else{if(_0x296ccd[_0x1cd111(0x76d)](/<(?:ETB)>/i)){if(_0x1cd111(0x8b3)!==_0x1cd111(0x874))Imported[_0x1cd111(0x3a2)]&&(this[_0x1cd111(0x8f9)]='ETB');else{var _0x5c0496=_0x538e7c(_0x1cd111(0x77c))[_0x1cd111(0x431)][_0x1cd111(0x918)]();_0x99f22e[_0x1cd111(0x3de)]();if(_0xfbd489)_0x23bfe0(_0x5c0496['focus'][_0x1cd111(0x63d)](_0x5c0496),0x190);}}else{if(_0x296ccd[_0x1cd111(0x76d)](/<(?:PTB)>/i))Imported['VisuMZ_2_BattleSystemPTB']&&(this['_forcedBattleSys']=_0x1cd111(0x653));else{if(_0x296ccd[_0x1cd111(0x76d)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x12473c=String(RegExp['$1']);if(_0x12473c['match'](/DTB/i))this['_forcedBattleSys']=0x0;else{if(_0x12473c[_0x1cd111(0x76d)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x1cd111(0x8f9)]=0x1;else{if(_0x12473c[_0x1cd111(0x76d)](/(?:TPB|ATB)[ ]WAIT/i))_0x1cd111(0x2d4)!==_0x1cd111(0x2d4)?_0x37d3be[_0x1cd111(0x36c)]&&(this[_0x1cd111(0x8f9)]=_0x1cd111(0x563)):this['_forcedBattleSys']=0x2;else{if(_0x12473c[_0x1cd111(0x76d)](/CTB/i))Imported[_0x1cd111(0x5f2)]&&('HoLVI'===_0x1cd111(0x3ea)?this[_0x1cd111(0x6aa)]['setBackgroundType'](_0x107a44[_0x1cd111(0x7c9)][_0x1cd111(0x832)]):this['_forcedBattleSys']=_0x1cd111(0x52d));else{if(_0x12473c['match'](/STB/i)){if(Imported['VisuMZ_2_BattleSystemSTB']){if(_0x1cd111(0x840)!=='oWmYN')this[_0x1cd111(0x8f9)]=_0x1cd111(0x339);else{_0x4de7a9['CoreEngine']['Scene_Battle_createSpriteset_detach'][_0x1cd111(0x697)](this);if(!_0x29539f[_0x1cd111(0x135)])return;const _0x395895=this['_spriteset'];if(!_0x395895)return;this['_pictureContainer']=_0x395895[_0x1cd111(0x735)];if(!this['_pictureContainer'])return;this[_0x1cd111(0x7bb)](this[_0x1cd111(0x735)]);}}}else{if(_0x12473c[_0x1cd111(0x76d)](/BTB/i))Imported[_0x1cd111(0x36c)]&&(this[_0x1cd111(0x8f9)]=_0x1cd111(0x563));else{if(_0x12473c[_0x1cd111(0x76d)](/FTB/i))Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x1cd111(0x8f9)]=_0x1cd111(0x873));else{if(_0x12473c[_0x1cd111(0x76d)](/OTB/i))Imported[_0x1cd111(0x36d)]&&(this[_0x1cd111(0x8f9)]=_0x1cd111(0x299));else{if(_0x12473c[_0x1cd111(0x76d)](/ETB/i)){if(_0x1cd111(0x30b)!=='Ibggm'){const _0x11623e=_0x526736[_0x1cd111(0x90a)](_0x3b17d6)+0x1;let _0x1dfe9c=_0x251905+_0x1cd111(0x978),_0x13bf49=_0x3c9fe6['CoreEngine']['ExtractStrFromList'](_0x40f813['list']);_0x13bf49[_0x1cd111(0x9b5)]>0x0&&(_0x5c112a['length']>0x0?_0x26a03b+=_0x2625e9+_0x1cd111(0x56f):_0x27e92d+=_0x1a5f46+_0x1cd111(0x4bb)['format'](_0x476397,_0x310edd[_0x1cd111(0x6f5)]||_0x1cd111(0x1f9))+_0x25d053,_0x12caba+=_0x1dfe9c[_0x1cd111(0x6ba)](_0x11623e,_0x13bf49));}else Imported[_0x1cd111(0x3a2)]&&(this[_0x1cd111(0x8f9)]=_0x1cd111(0x32f));}else _0x12473c['match'](/PTB/i)&&(_0x1cd111(0x913)!==_0x1cd111(0x368)?Imported[_0x1cd111(0x570)]&&('qiHUu'===_0x1cd111(0x2b3)?(this[_0x1cd111(0x251)]()[_0x1cd111(0x15f)]=!![],this[_0x1cd111(0x251)]()['displayX']=_0x5acf9b[_0x1cd111(0x875)]):this[_0x1cd111(0x8f9)]='PTB'):_0x3bb1bb[_0x1cd111(0x803)]['Sprite_Animation_setViewport'][_0x1cd111(0x697)](this,_0x2f9fb9));}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x2a56e3(0x948)][_0x2a56e3(0x7ed)]=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x2a56e3(0x948)][_0x2a56e3(0x4b4)]=function(_0x3d0634,_0x5388e1,_0x17401c,_0x36710b){const _0x14edef=_0x2a56e3;if(!this['showFauxAnimations']())return;_0x17401c=_0x17401c||![],_0x36710b=_0x36710b||![];if($dataAnimations[_0x5388e1]){const _0x92b153={'targets':_0x3d0634,'animationId':_0x5388e1,'mirror':_0x17401c,'mute':_0x36710b};this[_0x14edef(0x8f2)][_0x14edef(0x487)](_0x92b153);for(const _0x57b3bf of _0x3d0634){_0x57b3bf[_0x14edef(0x7a5)]&&(_0x14edef(0x39e)!==_0x14edef(0x935)?_0x57b3bf[_0x14edef(0x7a5)]():this[_0x14edef(0x4b0)]());}}},Game_Temp[_0x2a56e3(0x948)][_0x2a56e3(0x3cb)]=function(){return!![];},Game_Temp[_0x2a56e3(0x948)][_0x2a56e3(0x885)]=function(){const _0x41f0e1=_0x2a56e3;return this[_0x41f0e1(0x8f2)][_0x41f0e1(0x6fd)]();},Game_Temp['prototype'][_0x2a56e3(0x5c0)]=function(){const _0xf5525b=_0x2a56e3;this[_0xf5525b(0x191)]=[];},Game_Temp[_0x2a56e3(0x948)][_0x2a56e3(0x4e8)]=function(_0x339a42,_0x2ac413,_0x22fd31,_0x3fb643,_0x26e187){const _0x53b683=_0x2a56e3;if(!this[_0x53b683(0x83f)]())return;_0x3fb643=_0x3fb643||![],_0x26e187=_0x26e187||![];if($dataAnimations[_0x22fd31]){if(_0x53b683(0x419)===_0x53b683(0x419)){const _0x269e99={'x':_0x339a42,'y':_0x2ac413,'animationId':_0x22fd31,'mirror':_0x3fb643,'mute':_0x26e187};this['_pointAnimationQueue']['push'](_0x269e99);}else this[_0x53b683(0x8f9)]=0x2;}},Game_Temp['prototype'][_0x2a56e3(0x83f)]=function(){return!![];},Game_Temp[_0x2a56e3(0x948)][_0x2a56e3(0x4e5)]=function(){const _0x13aba9=_0x2a56e3;return this[_0x13aba9(0x191)][_0x13aba9(0x6fd)]();},VisuMZ['CoreEngine']['Game_System_initialize']=Game_System[_0x2a56e3(0x948)][_0x2a56e3(0x14c)],Game_System['prototype']['initialize']=function(){const _0x2cad12=_0x2a56e3;VisuMZ[_0x2cad12(0x803)]['Game_System_initialize']['call'](this),this['initCoreEngine']();},Game_System[_0x2a56e3(0x948)][_0x2a56e3(0x2d6)]=function(){const _0x48e84d=_0x2a56e3;this[_0x48e84d(0x472)]={'SideView':$dataSystem[_0x48e84d(0x44a)],'BattleSystem':this[_0x48e84d(0x306)](),'FontSize':$dataSystem[_0x48e84d(0x87e)][_0x48e84d(0x1fa)],'Padding':0xc};},Game_System['prototype']['isSideView']=function(){const _0x28f236=_0x2a56e3;if($gameTemp['_forcedTroopView']==='SV')return _0x28f236(0x3e5)!==_0x28f236(0x5df)?!![]:_0xb0bf9f['CoreEngine']['Window_ShopSell_isEnabled']['call'](this,_0x3cbd45);else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this[_0x28f236(0x472)]===undefined)this['initCoreEngine']();if(this[_0x28f236(0x472)]['SideView']===undefined)this[_0x28f236(0x2d6)]();return this['_CoreEngineSettings'][_0x28f236(0x302)];},Game_System[_0x2a56e3(0x948)][_0x2a56e3(0x8ba)]=function(_0x434f8f){const _0x582793=_0x2a56e3;if(this[_0x582793(0x472)]===undefined)this[_0x582793(0x2d6)]();if(this[_0x582793(0x472)][_0x582793(0x302)]===undefined)this[_0x582793(0x2d6)]();this['_CoreEngineSettings'][_0x582793(0x302)]=_0x434f8f;},Game_System[_0x2a56e3(0x948)][_0x2a56e3(0x75f)]=function(){const _0x3205de=_0x2a56e3;if(this[_0x3205de(0x472)]===undefined)this[_0x3205de(0x2d6)]();this[_0x3205de(0x472)]['BattleSystem']=this[_0x3205de(0x306)]();},Game_System['prototype'][_0x2a56e3(0x306)]=function(){const _0x15683e=_0x2a56e3,_0x124839=(VisuMZ[_0x15683e(0x803)]['Settings'][_0x15683e(0x961)]||_0x15683e(0x2f6))['toUpperCase']()['trim']();return VisuMZ[_0x15683e(0x803)][_0x15683e(0x75a)](_0x124839);},Game_System[_0x2a56e3(0x948)][_0x2a56e3(0x42c)]=function(){const _0x4fd068=_0x2a56e3;if($gameTemp[_0x4fd068(0x8f9)]!==undefined)return $gameTemp['_forcedBattleSys'];if(this[_0x4fd068(0x472)]===undefined)this[_0x4fd068(0x2d6)]();if(this[_0x4fd068(0x472)]['BattleSystem']===undefined)this[_0x4fd068(0x75f)]();return this[_0x4fd068(0x472)][_0x4fd068(0x961)];},Game_System['prototype']['setBattleSystem']=function(_0x22fc07){const _0x563f52=_0x2a56e3;if(this[_0x563f52(0x472)]===undefined)this[_0x563f52(0x2d6)]();if(this['_CoreEngineSettings'][_0x563f52(0x961)]===undefined)this['resetBattleSystem']();this[_0x563f52(0x472)][_0x563f52(0x961)]=_0x22fc07;},Game_System[_0x2a56e3(0x948)][_0x2a56e3(0x595)]=function(){const _0x4f9798=_0x2a56e3;if(this['_CoreEngineSettings']===undefined)this[_0x4f9798(0x2d6)]();if(this['_CoreEngineSettings'][_0x4f9798(0x613)]===undefined)this[_0x4f9798(0x2d6)]();return this['_CoreEngineSettings'][_0x4f9798(0x613)];},Game_System[_0x2a56e3(0x948)][_0x2a56e3(0x5bc)]=function(_0x1e9e9a){const _0x2f4625=_0x2a56e3;if(this[_0x2f4625(0x472)]===undefined)this['initCoreEngine']();if(this[_0x2f4625(0x472)][_0x2f4625(0x8df)]===undefined)this[_0x2f4625(0x2d6)]();this[_0x2f4625(0x472)][_0x2f4625(0x613)]=_0x1e9e9a;},Game_System[_0x2a56e3(0x948)][_0x2a56e3(0x15c)]=function(){const _0x568227=_0x2a56e3;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x568227(0x472)][_0x568227(0x1e6)]===undefined)this[_0x568227(0x2d6)]();return this[_0x568227(0x472)][_0x568227(0x1e6)];},Game_System[_0x2a56e3(0x948)][_0x2a56e3(0x4e7)]=function(_0x2938a0){const _0x1541b2=_0x2a56e3;if(this['_CoreEngineSettings']===undefined)this[_0x1541b2(0x2d6)]();if(this[_0x1541b2(0x472)][_0x1541b2(0x8df)]===undefined)this['initCoreEngine']();this[_0x1541b2(0x472)][_0x1541b2(0x1e6)]=_0x2938a0;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x1e7)]=Game_Screen['prototype']['initialize'],Game_Screen[_0x2a56e3(0x948)]['initialize']=function(){const _0x3432b9=_0x2a56e3;VisuMZ[_0x3432b9(0x803)][_0x3432b9(0x1e7)][_0x3432b9(0x697)](this),this[_0x3432b9(0x562)]();},Game_Screen[_0x2a56e3(0x948)][_0x2a56e3(0x562)]=function(){const _0x206fa8=_0x2a56e3,_0x13fd8f=VisuMZ['CoreEngine']['Settings'][_0x206fa8(0x1d6)];this[_0x206fa8(0x93f)]=_0x13fd8f?.[_0x206fa8(0x23a)]||'random';},Game_Screen[_0x2a56e3(0x948)][_0x2a56e3(0x297)]=function(){const _0x2c7ac5=_0x2a56e3;if(this[_0x2c7ac5(0x93f)]===undefined)this[_0x2c7ac5(0x562)]();return this[_0x2c7ac5(0x93f)];},Game_Screen[_0x2a56e3(0x948)]['setCoreEngineScreenShakeStyle']=function(_0x55d48f){const _0x5ec1d1=_0x2a56e3;if(this[_0x5ec1d1(0x93f)]===undefined)this[_0x5ec1d1(0x562)]();this[_0x5ec1d1(0x93f)]=_0x55d48f['toLowerCase']()['trim']();},Game_Picture[_0x2a56e3(0x948)]['isMapScrollLinked']=function(){const _0x6369b6=_0x2a56e3;if($gameParty[_0x6369b6(0x141)]())return![];return this['name']()&&this['name']()['charAt'](0x0)==='!';},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x97f)]=Game_Picture[_0x2a56e3(0x948)]['x'],Game_Picture[_0x2a56e3(0x948)]['x']=function(){const _0x36946f=_0x2a56e3;if(this['isMapScrollLinked']()){if(_0x36946f(0x3c6)!=='IRSOq')return this['xScrollLinkedOffset']();else{try{_0x54a933[_0x36946f(0x803)][_0x36946f(0x492)][_0x36946f(0x697)](this,_0x1a0f67);}catch(_0x135761){_0x3ac14c[_0x36946f(0x7f4)]()&&(_0x1e76f8['log'](_0x36946f(0x2c5)),_0x117ced[_0x36946f(0x68a)](_0x135761)),this['skipBranch']();}return!![];}}else{if(_0x36946f(0x17e)!==_0x36946f(0x17e))this[_0x36946f(0x36e)]=_0x1e853c[_0x36946f(0x803)]['Settings'][_0x36946f(0x2fc)][_0x36946f(0x184)]??0x4,this['setupCustomRateCoreEngine'](),this[_0x36946f(0x36e)]=this['_rate'][_0x36946f(0x459)](0x1,0xa);else return VisuMZ[_0x36946f(0x803)][_0x36946f(0x97f)][_0x36946f(0x697)](this);}},Game_Picture[_0x2a56e3(0x948)][_0x2a56e3(0x2dc)]=function(){const _0x2f3df2=_0x2a56e3,_0x284f1b=$gameMap[_0x2f3df2(0x70a)]()*$gameMap['tileWidth']();return(this['_x']-_0x284f1b)*$gameScreen[_0x2f3df2(0x173)]();},VisuMZ['CoreEngine'][_0x2a56e3(0x13f)]=Game_Picture[_0x2a56e3(0x948)]['y'],Game_Picture[_0x2a56e3(0x948)]['y']=function(){const _0x202aee=_0x2a56e3;return this[_0x202aee(0x6fc)]()?this[_0x202aee(0x130)]():VisuMZ[_0x202aee(0x803)][_0x202aee(0x13f)][_0x202aee(0x697)](this);},Game_Picture[_0x2a56e3(0x948)][_0x2a56e3(0x130)]=function(){const _0xfee3cf=_0x2a56e3,_0x7d57c5=$gameMap[_0xfee3cf(0x992)]()*$gameMap[_0xfee3cf(0x94a)]();return(this['_y']-_0x7d57c5)*$gameScreen[_0xfee3cf(0x173)]();},VisuMZ[_0x2a56e3(0x803)]['Game_Picture_scaleX']=Game_Picture['prototype']['scaleX'],Game_Picture['prototype'][_0x2a56e3(0x3c8)]=function(){const _0x432923=_0x2a56e3;let _0x518f0d=VisuMZ[_0x432923(0x803)][_0x432923(0x608)][_0x432923(0x697)](this);return this[_0x432923(0x6fc)]()&&(_0x518f0d*=$gameScreen[_0x432923(0x173)]()),_0x518f0d;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x2bc)]=Game_Picture[_0x2a56e3(0x948)][_0x2a56e3(0x7fe)],Game_Picture[_0x2a56e3(0x948)][_0x2a56e3(0x7fe)]=function(){const _0x5e04b0=_0x2a56e3;let _0x3146a9=VisuMZ['CoreEngine']['Game_Picture_scaleY'][_0x5e04b0(0x697)](this);return this[_0x5e04b0(0x6fc)]()&&(_0x3146a9*=$gameScreen[_0x5e04b0(0x173)]()),_0x3146a9;},Game_Picture[_0x2a56e3(0x948)][_0x2a56e3(0x3e7)]=function(_0x35b928){const _0x2bd749=_0x2a56e3;this[_0x2bd749(0x564)]=_0x35b928;},VisuMZ['CoreEngine'][_0x2a56e3(0x42f)]=Game_Picture[_0x2a56e3(0x948)]['calcEasing'],Game_Picture['prototype']['calcEasing']=function(_0x3bf6ae){const _0x5e9a28=_0x2a56e3;this[_0x5e9a28(0x564)]=this[_0x5e9a28(0x564)]||0x0;if([0x0,0x1,0x2,0x3][_0x5e9a28(0x559)](this[_0x5e9a28(0x564)])){if('JPioo'!==_0x5e9a28(0x801))_0x4b92ae[_0x5e9a28(0x36d)]&&(this['_forcedBattleSys']=_0x5e9a28(0x299));else return VisuMZ['CoreEngine'][_0x5e9a28(0x42f)][_0x5e9a28(0x697)](this,_0x3bf6ae);}else return VisuMZ['ApplyEasing'](_0x3bf6ae,this['_coreEasingType']);},VisuMZ['CoreEngine'][_0x2a56e3(0x2b1)]=Game_Action[_0x2a56e3(0x948)]['itemHit'],Game_Action['prototype'][_0x2a56e3(0x834)]=function(_0x3d19fe){const _0x1fa339=_0x2a56e3;if(VisuMZ[_0x1fa339(0x803)][_0x1fa339(0x3f7)][_0x1fa339(0x2fc)][_0x1fa339(0x8b0)])return this['itemHitImprovedAccuracy'](_0x3d19fe);else{if(_0x1fa339(0x681)!==_0x1fa339(0x7dc))return VisuMZ[_0x1fa339(0x803)]['Game_Action_itemHit'][_0x1fa339(0x697)](this,_0x3d19fe);else{this['_inputSpecialKeyCode']=_0x578646[_0x1fa339(0x609)];let _0x77f89d=_0x1ba9e5[_0x1fa339(0x2d7)](_0xa71e9a[_0x1fa339(0x5cf)]);this[_0x1fa339(0x60d)]===_0x38a4cb?this[_0x1fa339(0x60d)]=_0x77f89d:this[_0x1fa339(0x60d)]+=_0x77f89d;}}},Game_Action['prototype'][_0x2a56e3(0x747)]=function(_0x3d53cb){const _0x5299d5=_0x2a56e3,_0x535ab2=this['itemSuccessRate'](_0x3d53cb),_0x17996c=this[_0x5299d5(0x2c9)](_0x3d53cb),_0x528907=this[_0x5299d5(0x409)](_0x3d53cb);return _0x535ab2*(_0x17996c-_0x528907);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x2cb)]=Game_Action[_0x2a56e3(0x948)][_0x2a56e3(0x51c)],Game_Action[_0x2a56e3(0x948)][_0x2a56e3(0x51c)]=function(_0x461f2d){const _0x2c917c=_0x2a56e3;if(VisuMZ[_0x2c917c(0x803)]['Settings'][_0x2c917c(0x2fc)]['ImprovedAccuracySystem'])return 0x0;else{if(_0x2c917c(0x793)!=='rpfLm')return VisuMZ[_0x2c917c(0x803)][_0x2c917c(0x2cb)][_0x2c917c(0x697)](this,_0x461f2d);else _0x278f87[_0x2c917c(0x803)][_0x2c917c(0x2bd)]['call'](this),this[_0x2c917c(0x450)](),this[_0x2c917c(0x7ed)](),this[_0x2c917c(0x5c0)]();}},Game_Action[_0x2a56e3(0x948)][_0x2a56e3(0x6cf)]=function(_0x47ec3a){const _0x5cb3a2=_0x2a56e3;return this['item']()[_0x5cb3a2(0x417)]*0.01;},Game_Action['prototype'][_0x2a56e3(0x2c9)]=function(_0x4342fe){const _0x2a876e=_0x2a56e3;if(VisuMZ[_0x2a876e(0x803)][_0x2a876e(0x3f7)][_0x2a876e(0x2fc)][_0x2a876e(0x1b1)]&&this['isItem']())return 0x1;return this[_0x2a876e(0x1e1)]()?VisuMZ[_0x2a876e(0x803)][_0x2a876e(0x3f7)][_0x2a876e(0x2fc)][_0x2a876e(0x1b1)]&&this['subject']()[_0x2a876e(0x939)]()?this[_0x2a876e(0x27d)]()[_0x2a876e(0x756)]+0.05:this[_0x2a876e(0x27d)]()[_0x2a876e(0x756)]:_0x2a876e(0x94c)===_0x2a876e(0x94c)?0x1:_0x175f66[_0x2a876e(0x7c9)][_0x2a876e(0x221)]['call'](this);},Game_Action[_0x2a56e3(0x948)][_0x2a56e3(0x409)]=function(_0xc1ad9f){const _0x1a397b=_0x2a56e3;if(this[_0x1a397b(0x27d)]()[_0x1a397b(0x939)]()===_0xc1ad9f[_0x1a397b(0x939)]())return 0x0;if(this['isPhysical']()){if(VisuMZ[_0x1a397b(0x803)][_0x1a397b(0x3f7)][_0x1a397b(0x2fc)][_0x1a397b(0x1b1)]&&_0xc1ad9f[_0x1a397b(0x81e)]()){if(_0x1a397b(0x792)===_0x1a397b(0x792))return _0xc1ad9f[_0x1a397b(0x1af)]-0.05;else _0x497c7b+=_0x1a397b(0x6e2)['format'](_0xc1e4c9['parameters'][0x0]);}else{if(_0x1a397b(0x620)===_0x1a397b(0x3b4))_0x5dff33[_0x1a397b(0x7f4)]()&&(_0x38cfeb[_0x1a397b(0x68a)](_0x1a397b(0x2c5)),_0x12825e['log'](_0x24bbf9)),this[_0x1a397b(0x79a)]();else return _0xc1ad9f[_0x1a397b(0x1af)];}}else return this[_0x1a397b(0x7cd)]()?_0xc1ad9f[_0x1a397b(0x240)]:0x0;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x357)]=Game_Action[_0x2a56e3(0x948)][_0x2a56e3(0x6c0)],Game_Action[_0x2a56e3(0x948)]['updateLastTarget']=function(_0x488bf4){const _0x5e46d9=_0x2a56e3;VisuMZ['CoreEngine'][_0x5e46d9(0x357)][_0x5e46d9(0x697)](this,_0x488bf4);if(VisuMZ[_0x5e46d9(0x803)][_0x5e46d9(0x3f7)][_0x5e46d9(0x2fc)][_0x5e46d9(0x8b0)])return;const _0x507ead=_0x488bf4[_0x5e46d9(0x226)]();_0x507ead[_0x5e46d9(0x7ef)]&&(0x1-this[_0x5e46d9(0x51c)](_0x488bf4)>this[_0x5e46d9(0x834)](_0x488bf4)&&(_0x507ead['missed']=![],_0x507ead['evaded']=!![]));},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x182)]=Game_BattlerBase[_0x2a56e3(0x948)][_0x2a56e3(0x650)],Game_BattlerBase['prototype'][_0x2a56e3(0x650)]=function(){const _0x188983=_0x2a56e3;this[_0x188983(0x5e9)]={},VisuMZ['CoreEngine'][_0x188983(0x182)][_0x188983(0x697)](this);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x8aa)]=Game_BattlerBase[_0x2a56e3(0x948)][_0x2a56e3(0x5fe)],Game_BattlerBase[_0x2a56e3(0x948)][_0x2a56e3(0x5fe)]=function(){const _0x2d5d8b=_0x2a56e3;this[_0x2d5d8b(0x5e9)]={},VisuMZ[_0x2d5d8b(0x803)][_0x2d5d8b(0x8aa)][_0x2d5d8b(0x697)](this);},Game_BattlerBase[_0x2a56e3(0x948)]['checkCacheKey']=function(_0x474f88){const _0x1f92d8=_0x2a56e3;return this[_0x1f92d8(0x5e9)]=this[_0x1f92d8(0x5e9)]||{},this[_0x1f92d8(0x5e9)][_0x474f88]!==undefined;},Game_BattlerBase[_0x2a56e3(0x948)][_0x2a56e3(0x1a2)]=function(_0x3ededa){const _0x2924ad=_0x2a56e3,_0x5b16e8=(_0x3e47a5,_0x31b45d)=>{const _0x5dae31=_0x3166;if(_0x5dae31(0x76a)!==_0x5dae31(0x76a))_0xb3d3bd['pan']=_0x2c32e,_0x3b24e2['playBgm'](_0x239674);else{if(!_0x31b45d)return _0x3e47a5;if(_0x31b45d['note'][_0x5dae31(0x76d)](VisuMZ[_0x5dae31(0x803)][_0x5dae31(0x59c)]['paramPlus'][_0x3ededa])){var _0x26682d=Number(RegExp['$1']);_0x3e47a5+=_0x26682d;}if(_0x31b45d[_0x5dae31(0x276)]['match'](VisuMZ[_0x5dae31(0x803)][_0x5dae31(0x59c)]['paramPlusJS'][_0x3ededa])){var _0x21ce92=String(RegExp['$1']);try{_0x3e47a5+=eval(_0x21ce92);}catch(_0x347fa3){if($gameTemp['isPlaytest']())console[_0x5dae31(0x68a)](_0x347fa3);}}return _0x3e47a5;}};return this[_0x2924ad(0x1fe)]()[_0x2924ad(0x5a9)](_0x5b16e8,this[_0x2924ad(0x76c)][_0x3ededa]);},Game_BattlerBase[_0x2a56e3(0x948)]['paramMax']=function(_0x3ea265){const _0x26ed03=_0x2a56e3;var _0x28f767=_0x26ed03(0x3e6)+(this[_0x26ed03(0x939)]()?_0x26ed03(0x30d):_0x26ed03(0x6fb))+_0x26ed03(0x7b9)+_0x3ea265;if(this['checkCacheKey'](_0x28f767))return this[_0x26ed03(0x5e9)][_0x28f767];this[_0x26ed03(0x5e9)][_0x28f767]=eval(VisuMZ['CoreEngine'][_0x26ed03(0x3f7)]['Param'][_0x28f767]);const _0x277bd9=(_0x17ac9a,_0x4b8689)=>{const _0x11ac96=_0x26ed03;if(!_0x4b8689)return _0x17ac9a;if(_0x4b8689[_0x11ac96(0x276)][_0x11ac96(0x76d)](VisuMZ[_0x11ac96(0x803)]['RegExp'][_0x11ac96(0x7ff)][_0x3ea265])){var _0x5c1fe0=Number(RegExp['$1']);if(_0x5c1fe0===0x0)_0x5c1fe0=Number[_0x11ac96(0x60f)];_0x17ac9a=Math[_0x11ac96(0x81b)](_0x17ac9a,_0x5c1fe0);}if(_0x4b8689[_0x11ac96(0x276)][_0x11ac96(0x76d)](VisuMZ[_0x11ac96(0x803)][_0x11ac96(0x59c)][_0x11ac96(0x537)][_0x3ea265])){if(_0x11ac96(0x969)!=='wLQLO'){var _0x2342eb=String(RegExp['$1']);try{_0x17ac9a=Math[_0x11ac96(0x81b)](_0x17ac9a,Number(eval(_0x2342eb)));}catch(_0x507143){if($gameTemp['isPlaytest']())console[_0x11ac96(0x68a)](_0x507143);}}else{_0x3c1a07[_0x11ac96(0x822)]();if(!_0x332412[_0x11ac96(0x363)]()){const _0x296b64=_0x390245['open'](_0x461dca,_0x11ac96(0x759));}else{const _0x129d34=_0x4c33b7[_0x11ac96(0x7f5)]==_0x11ac96(0x7d6)?'open':_0x344e7c['platform']==_0x11ac96(0x927)?_0x11ac96(0x427):_0x11ac96(0x606);_0x3a4c86(_0x11ac96(0x504))['exec'](_0x129d34+'\x20'+_0x4c0365);}}}return _0x17ac9a;};if(this[_0x26ed03(0x5e9)][_0x28f767]===0x0)this[_0x26ed03(0x5e9)][_0x28f767]=Number['MAX_SAFE_INTEGER'];return this[_0x26ed03(0x5e9)][_0x28f767]=this[_0x26ed03(0x1fe)]()['reduce'](_0x277bd9,this[_0x26ed03(0x5e9)][_0x28f767]),this[_0x26ed03(0x5e9)][_0x28f767];},Game_BattlerBase[_0x2a56e3(0x948)][_0x2a56e3(0x916)]=function(_0x58633d){const _0x4b187a=_0x2a56e3,_0x1f4dff=this[_0x4b187a(0x941)](Game_BattlerBase[_0x4b187a(0x797)],_0x58633d),_0xcfd78c=(_0x20e34a,_0x5df5e5)=>{const _0x5dd8ed=_0x4b187a;if(!_0x5df5e5)return _0x20e34a;if(_0x5df5e5[_0x5dd8ed(0x276)][_0x5dd8ed(0x76d)](VisuMZ[_0x5dd8ed(0x803)][_0x5dd8ed(0x59c)][_0x5dd8ed(0x71a)][_0x58633d])){if(_0x5dd8ed(0x4d0)!==_0x5dd8ed(0x22f)){var _0x424bd0=Number(RegExp['$1'])/0x64;_0x20e34a*=_0x424bd0;}else this[_0x5dd8ed(0x3b0)]()?this[_0x5dd8ed(0x616)]():_0xca36b7[_0x5dd8ed(0x803)][_0x5dd8ed(0x461)][_0x5dd8ed(0x697)](this);}if(_0x5df5e5[_0x5dd8ed(0x276)]['match'](VisuMZ[_0x5dd8ed(0x803)][_0x5dd8ed(0x59c)][_0x5dd8ed(0x2df)][_0x58633d])){if(_0x5dd8ed(0x286)!==_0x5dd8ed(0x337)){var _0x424bd0=Number(RegExp['$1']);_0x20e34a*=_0x424bd0;}else{if(typeof _0x1dd7fa==='number')return this['param'](_0x4e4228);_0x55a0a9=_0x555e6a(_0x18b50b||'')[_0x5dd8ed(0x67c)]();if(_0x44f2cb==='MAXHP')return this[_0x5dd8ed(0x53e)](0x0);if(_0xe0b853===_0x5dd8ed(0x990))return this[_0x5dd8ed(0x53e)](0x1);if(_0x1232be===_0x5dd8ed(0x500))return this['param'](0x2);if(_0x433b3c===_0x5dd8ed(0x66b))return this[_0x5dd8ed(0x53e)](0x3);if(_0x595e8e===_0x5dd8ed(0x7bf))return this[_0x5dd8ed(0x53e)](0x4);if(_0x3931a5==='MDF')return this[_0x5dd8ed(0x53e)](0x5);if(_0x398388===_0x5dd8ed(0x2f9))return this[_0x5dd8ed(0x53e)](0x6);if(_0x4ccfd9===_0x5dd8ed(0x623))return this['param'](0x7);if(_0x3c87d9===_0x5dd8ed(0x98e))return _0x383b7c?_0x543f80(_0x5e773e[_0x5dd8ed(0x377)](this[_0x5dd8ed(0x35e)](0x0)*0x64))+'%':this[_0x5dd8ed(0x35e)](0x0);if(_0x37d1b6===_0x5dd8ed(0x59a))return _0x3a8abd?_0x1ac6ab(_0x2ce67e[_0x5dd8ed(0x377)](this[_0x5dd8ed(0x35e)](0x1)*0x64))+'%':this[_0x5dd8ed(0x35e)](0x1);if(_0x180308===_0x5dd8ed(0x16a))return _0x4801f1?_0x1ad82a(_0x4f83ef[_0x5dd8ed(0x377)](this[_0x5dd8ed(0x35e)](0x2)*0x64))+'%':this[_0x5dd8ed(0x35e)](0x2);if(_0x36dcff==='CEV')return _0xe0118?_0x4f163d(_0x524f08[_0x5dd8ed(0x377)](this[_0x5dd8ed(0x35e)](0x3)*0x64))+'%':this['xparam'](0x3);if(_0x3bd661===_0x5dd8ed(0x227))return _0x49c913?_0x5a0bff(_0x30ea01[_0x5dd8ed(0x377)](this[_0x5dd8ed(0x35e)](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x2ad0ff===_0x5dd8ed(0x5f0))return _0x46c1e7?_0x34fad2(_0x5ea68a[_0x5dd8ed(0x377)](this[_0x5dd8ed(0x35e)](0x5)*0x64))+'%':this[_0x5dd8ed(0x35e)](0x5);if(_0x31578d===_0x5dd8ed(0x388))return _0x55414f?_0x253117(_0x335405['round'](this[_0x5dd8ed(0x35e)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x2d1f90===_0x5dd8ed(0x9b0))return _0x17bf22?_0x4ab999(_0x9df45[_0x5dd8ed(0x377)](this['xparam'](0x7)*0x64))+'%':this['xparam'](0x7);if(_0x335c8a==='MRG')return _0x570093?_0x3e4d35(_0x2f1075[_0x5dd8ed(0x377)](this['xparam'](0x8)*0x64))+'%':this[_0x5dd8ed(0x35e)](0x8);if(_0x2b03e3===_0x5dd8ed(0x51a))return _0x59e914?_0xf27e04(_0x572578[_0x5dd8ed(0x377)](this[_0x5dd8ed(0x35e)](0x9)*0x64))+'%':this[_0x5dd8ed(0x35e)](0x9);if(_0x22f49c==='TGR')return _0x1f6c9d?_0x583ec5(_0x20907c[_0x5dd8ed(0x377)](this[_0x5dd8ed(0x2ef)](0x0)*0x64))+'%':this[_0x5dd8ed(0x2ef)](0x0);if(_0x25b670===_0x5dd8ed(0x8d6))return _0x413217?_0x52cd0d(_0x8120e2[_0x5dd8ed(0x377)](this[_0x5dd8ed(0x2ef)](0x1)*0x64))+'%':this[_0x5dd8ed(0x2ef)](0x1);if(_0xe997ab===_0x5dd8ed(0x7d3))return _0x5572d7?_0x365953(_0x59adc9[_0x5dd8ed(0x377)](this[_0x5dd8ed(0x2ef)](0x2)*0x64))+'%':this['sparam'](0x2);if(_0xe601cd===_0x5dd8ed(0x3ec))return _0x29e228?_0x9cb48b(_0x19befa[_0x5dd8ed(0x377)](this[_0x5dd8ed(0x2ef)](0x3)*0x64))+'%':this[_0x5dd8ed(0x2ef)](0x3);if(_0x3c378e===_0x5dd8ed(0x2c1))return _0x4c3515?_0x2a5c43(_0x2033f6[_0x5dd8ed(0x377)](this['sparam'](0x4)*0x64))+'%':this[_0x5dd8ed(0x2ef)](0x4);if(_0x3f19d0===_0x5dd8ed(0x3d4))return _0x2595e6?_0x55d7c2(_0x4a1af3[_0x5dd8ed(0x377)](this[_0x5dd8ed(0x2ef)](0x5)*0x64))+'%':this[_0x5dd8ed(0x2ef)](0x5);if(_0x5264fb==='PDR')return _0x4a2bde?_0x389972(_0x530722[_0x5dd8ed(0x377)](this['sparam'](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x4a8eeb===_0x5dd8ed(0x436))return _0x69bd5?_0x592369(_0x6d3f88['round'](this[_0x5dd8ed(0x2ef)](0x7)*0x64))+'%':this[_0x5dd8ed(0x2ef)](0x7);if(_0xffd026===_0x5dd8ed(0x4ca))return _0x4dc944?_0x1abe9b(_0x2d920a['round'](this[_0x5dd8ed(0x2ef)](0x8)*0x64))+'%':this['sparam'](0x8);if(_0xccfca3==='EXR')return _0x4395cf?_0x486e01(_0x27b481[_0x5dd8ed(0x377)](this[_0x5dd8ed(0x2ef)](0x9)*0x64))+'%':this[_0x5dd8ed(0x2ef)](0x9);if(_0x1f74ee[_0x5dd8ed(0x803)][_0x5dd8ed(0x3c9)][_0x225206]){const _0x35836f=_0x8f38ea[_0x5dd8ed(0x803)][_0x5dd8ed(0x3c9)][_0x4d24ff],_0x5e6c3f=this[_0x35836f];return _0x19d1b2[_0x5dd8ed(0x803)][_0x5dd8ed(0x966)][_0x27b932]==='integer'?_0x5e6c3f:_0x25364e?_0xc23647(_0x585876['round'](_0x5e6c3f*0x64))+'%':_0x5e6c3f;}return'';}}if(_0x5df5e5['note']['match'](VisuMZ[_0x5dd8ed(0x803)]['RegExp'][_0x5dd8ed(0x763)][_0x58633d])){var _0x2fcb71=String(RegExp['$1']);try{if(_0x5dd8ed(0x53f)!==_0x5dd8ed(0x4c6))_0x20e34a*=eval(_0x2fcb71);else{if(_0x1918fa['includes'](_0x45c565[_0x5dd8ed(0x4ee)]()))return!![];}}catch(_0x28206c){if(_0x5dd8ed(0x3d6)===_0x5dd8ed(0x678))this['_number']=_0x2fdd12(_0x32c607(this[_0x5dd8ed(0x7a6)])[_0x5dd8ed(0x6fa)](0x1)),this[_0x5dd8ed(0x7a6)]=_0x304cab[_0x5dd8ed(0x81b)](0x0,this[_0x5dd8ed(0x7a6)]),_0x307ea4[_0x5dd8ed(0x3a9)](),this[_0x5dd8ed(0x5fe)](),_0x4678f6[_0x5dd8ed(0x38f)](),this[_0x5dd8ed(0x590)](this[_0x5dd8ed(0x463)]-0x1);else{if($gameTemp[_0x5dd8ed(0x7f4)]())console[_0x5dd8ed(0x68a)](_0x28206c);}}}return _0x20e34a;};return this[_0x4b187a(0x1fe)]()['reduce'](_0xcfd78c,_0x1f4dff);},Game_BattlerBase[_0x2a56e3(0x948)]['paramFlatBonus']=function(_0x36ba32){const _0x394b1b=_0x2a56e3,_0x36cd98=(_0x40ae8a,_0x43ffb7)=>{const _0x439a4f=_0x3166;if(_0x439a4f(0x188)===_0x439a4f(0x607))this['_forcedTroopView']='FV';else{if(!_0x43ffb7)return _0x40ae8a;if(_0x43ffb7['note']['match'](VisuMZ[_0x439a4f(0x803)][_0x439a4f(0x59c)][_0x439a4f(0x757)][_0x36ba32])){var _0x4af224=Number(RegExp['$1']);_0x40ae8a+=_0x4af224;}if(_0x43ffb7[_0x439a4f(0x276)][_0x439a4f(0x76d)](VisuMZ[_0x439a4f(0x803)][_0x439a4f(0x59c)]['paramFlatJS'][_0x36ba32])){if(_0x439a4f(0x420)===_0x439a4f(0x420)){var _0x22e677=String(RegExp['$1']);try{_0x40ae8a+=eval(_0x22e677);}catch(_0x3aff42){if(_0x439a4f(0x237)!==_0x439a4f(0x532)){if($gameTemp[_0x439a4f(0x7f4)]())console[_0x439a4f(0x68a)](_0x3aff42);}else{const _0x1979bd=_0x3fc6a2['ButtonAssist'];_0x1979bd[_0x439a4f(0x985)]=_0x1979bd[_0x439a4f(0x985)]||'\x5c}❪SHIFT❫\x5c{',_0x1979bd[_0x439a4f(0x77a)]=_0x1979bd[_0x439a4f(0x77a)]||_0x439a4f(0x9b7);}}}else this[_0x439a4f(0x89c)](_0x132e0e[_0x439a4f(0x276)]);}return _0x40ae8a;}};return this[_0x394b1b(0x1fe)]()['reduce'](_0x36cd98,0x0);},Game_BattlerBase['prototype']['param']=function(_0x459c7b){const _0x580df9=_0x2a56e3;let _0x41870d=_0x580df9(0x53e)+_0x459c7b+_0x580df9(0x5db);if(this[_0x580df9(0x8c1)](_0x41870d))return this[_0x580df9(0x5e9)][_0x41870d];return this[_0x580df9(0x5e9)][_0x41870d]=Math[_0x580df9(0x377)](VisuMZ[_0x580df9(0x803)]['Settings'][_0x580df9(0x4b7)][_0x580df9(0x6f4)][_0x580df9(0x697)](this,_0x459c7b)),this[_0x580df9(0x5e9)][_0x41870d];},Game_BattlerBase[_0x2a56e3(0x948)][_0x2a56e3(0x717)]=function(_0x4685fd){const _0x4091fd=_0x2a56e3,_0x73110=(_0x52377a,_0x4f604c)=>{const _0x203d93=_0x3166;if(!_0x4f604c)return _0x52377a;if(_0x4f604c[_0x203d93(0x276)][_0x203d93(0x76d)](VisuMZ[_0x203d93(0x803)][_0x203d93(0x59c)][_0x203d93(0x5ce)][_0x4685fd])){var _0x147f70=Number(RegExp['$1'])/0x64;_0x52377a+=_0x147f70;}if(_0x4f604c[_0x203d93(0x276)][_0x203d93(0x76d)](VisuMZ[_0x203d93(0x803)][_0x203d93(0x59c)][_0x203d93(0x5ae)][_0x4685fd])){var _0x147f70=Number(RegExp['$1']);_0x52377a+=_0x147f70;}if(_0x4f604c[_0x203d93(0x276)][_0x203d93(0x76d)](VisuMZ['CoreEngine'][_0x203d93(0x59c)]['xparamPlusJS'][_0x4685fd])){var _0x1dda61=String(RegExp['$1']);try{_0x52377a+=eval(_0x1dda61);}catch(_0x990e15){if($gameTemp['isPlaytest']())console['log'](_0x990e15);}}return _0x52377a;};return this['traitObjects']()[_0x4091fd(0x5a9)](_0x73110,0x0);},Game_BattlerBase[_0x2a56e3(0x948)][_0x2a56e3(0x281)]=function(_0x4cfbea){const _0x5a8262=_0x2a56e3,_0x4917f9=(_0x59a169,_0x1cf7de)=>{const _0x376758=_0x3166;if(!_0x1cf7de)return _0x59a169;if(_0x1cf7de[_0x376758(0x276)][_0x376758(0x76d)](VisuMZ[_0x376758(0x803)]['RegExp'][_0x376758(0x55e)][_0x4cfbea])){var _0x3684f3=Number(RegExp['$1'])/0x64;_0x59a169*=_0x3684f3;}if(_0x1cf7de[_0x376758(0x276)][_0x376758(0x76d)](VisuMZ[_0x376758(0x803)][_0x376758(0x59c)][_0x376758(0x3ed)][_0x4cfbea])){if(_0x376758(0x945)===_0x376758(0x945)){var _0x3684f3=Number(RegExp['$1']);_0x59a169*=_0x3684f3;}else this['_colorCache'][_0x336d25]=_0x376758(0x518)['format'](_0x3ff8c0(_0x37199e['$1']));}if(_0x1cf7de['note'][_0x376758(0x76d)](VisuMZ[_0x376758(0x803)][_0x376758(0x59c)]['xparamRateJS'][_0x4cfbea])){if(_0x376758(0x770)===_0x376758(0x770)){var _0x34d4b4=String(RegExp['$1']);try{if(_0x376758(0x1b9)===_0x376758(0x1b9))_0x59a169*=eval(_0x34d4b4);else{_0x293f29&&_0x5b8aca&&_0x4deede[_0x376758(0x276)]&&this[_0x376758(0x89c)](_0x5eae44['note']);const _0x26c832=_0x47f6a2[_0x569261];if(_0x26c832){let _0x1e4a51=_0x1fbf4b[_0x376758(0x301)](_0x26c832['id']);this[_0x376758(0x89c)](_0x1e4a51);}}}catch(_0x43e527){if($gameTemp[_0x376758(0x7f4)]())console[_0x376758(0x68a)](_0x43e527);}}else return!this['isBottomHelpMode']()?this['helpAreaBottom']():0x0;}return _0x59a169;};return this[_0x5a8262(0x1fe)]()[_0x5a8262(0x5a9)](_0x4917f9,0x1);},Game_BattlerBase[_0x2a56e3(0x948)][_0x2a56e3(0x8ed)]=function(_0x3f1868){const _0x151745=_0x2a56e3,_0x53c6de=(_0x2795e1,_0x4eaa11)=>{const _0x198d6d=_0x3166;if(!_0x4eaa11)return _0x2795e1;if(_0x4eaa11['note'][_0x198d6d(0x76d)](VisuMZ[_0x198d6d(0x803)][_0x198d6d(0x59c)][_0x198d6d(0x991)][_0x3f1868])){var _0x58d652=Number(RegExp['$1'])/0x64;_0x2795e1+=_0x58d652;}if(_0x4eaa11['note'][_0x198d6d(0x76d)](VisuMZ[_0x198d6d(0x803)][_0x198d6d(0x59c)]['xparamFlat2'][_0x3f1868])){var _0x58d652=Number(RegExp['$1']);_0x2795e1+=_0x58d652;}if(_0x4eaa11[_0x198d6d(0x276)]['match'](VisuMZ[_0x198d6d(0x803)]['RegExp'][_0x198d6d(0x884)][_0x3f1868])){var _0x472e57=String(RegExp['$1']);try{if(_0x198d6d(0x567)!==_0x198d6d(0x567))return;else _0x2795e1+=eval(_0x472e57);}catch(_0x45159b){if($gameTemp[_0x198d6d(0x7f4)]())console[_0x198d6d(0x68a)](_0x45159b);}}return _0x2795e1;};return this[_0x151745(0x1fe)]()['reduce'](_0x53c6de,0x0);},Game_BattlerBase[_0x2a56e3(0x948)][_0x2a56e3(0x35e)]=function(_0x4916c8){const _0x15fe25=_0x2a56e3;let _0x418bec='xparam'+_0x4916c8+_0x15fe25(0x5db);if(this['checkCacheKey'](_0x418bec))return this[_0x15fe25(0x5e9)][_0x418bec];return this[_0x15fe25(0x5e9)][_0x418bec]=VisuMZ['CoreEngine'][_0x15fe25(0x3f7)][_0x15fe25(0x4b7)][_0x15fe25(0x77e)][_0x15fe25(0x697)](this,_0x4916c8),this[_0x15fe25(0x5e9)][_0x418bec];},Game_BattlerBase['prototype']['sparamPlus']=function(_0x2ea9bd){const _0x491253=_0x2a56e3,_0x37a555=(_0xa4cb1c,_0x110902)=>{const _0xb9d63a=_0x3166;if('DVjka'!=='PgrGE'){if(!_0x110902)return _0xa4cb1c;if(_0x110902['note'][_0xb9d63a(0x76d)](VisuMZ[_0xb9d63a(0x803)][_0xb9d63a(0x59c)][_0xb9d63a(0x2a2)][_0x2ea9bd])){var _0x28a7c8=Number(RegExp['$1'])/0x64;_0xa4cb1c+=_0x28a7c8;}if(_0x110902['note']['match'](VisuMZ[_0xb9d63a(0x803)][_0xb9d63a(0x59c)]['sparamPlus2'][_0x2ea9bd])){var _0x28a7c8=Number(RegExp['$1']);_0xa4cb1c+=_0x28a7c8;}if(_0x110902[_0xb9d63a(0x276)][_0xb9d63a(0x76d)](VisuMZ[_0xb9d63a(0x803)][_0xb9d63a(0x59c)][_0xb9d63a(0x959)][_0x2ea9bd])){var _0x42ac70=String(RegExp['$1']);try{if('qfHaF'===_0xb9d63a(0x147))return _0x338ba1[_0xb9d63a(0x7c9)][_0xb9d63a(0x999)][_0xb9d63a(0x697)](this);else _0xa4cb1c+=eval(_0x42ac70);}catch(_0x20686d){if($gameTemp[_0xb9d63a(0x7f4)]())console[_0xb9d63a(0x68a)](_0x20686d);}}return _0xa4cb1c;}else this[_0xb9d63a(0x197)]['x']=_0x3f6e26['boxWidth']+0x4;};return this[_0x491253(0x1fe)]()[_0x491253(0x5a9)](_0x37a555,0x0);},Game_BattlerBase[_0x2a56e3(0x948)]['sparamRate']=function(_0x53de94){const _0x40266c=_0x2a56e3,_0x120eab=(_0xa28761,_0x54fe85)=>{const _0x1a55f4=_0x3166;if(!_0x54fe85)return _0xa28761;if(_0x54fe85[_0x1a55f4(0x276)][_0x1a55f4(0x76d)](VisuMZ[_0x1a55f4(0x803)][_0x1a55f4(0x59c)][_0x1a55f4(0x1e8)][_0x53de94])){var _0x4b4504=Number(RegExp['$1'])/0x64;_0xa28761*=_0x4b4504;}if(_0x54fe85[_0x1a55f4(0x276)]['match'](VisuMZ['CoreEngine'][_0x1a55f4(0x59c)][_0x1a55f4(0x6e3)][_0x53de94])){if('gRjUg'!==_0x1a55f4(0x8a5))return this[_0x1a55f4(0x2f7)][_0x1a55f4(0x9b5)]>0x0;else{var _0x4b4504=Number(RegExp['$1']);_0xa28761*=_0x4b4504;}}if(_0x54fe85[_0x1a55f4(0x276)]['match'](VisuMZ[_0x1a55f4(0x803)]['RegExp'][_0x1a55f4(0x3e9)][_0x53de94])){var _0x1555ed=String(RegExp['$1']);try{_0xa28761*=eval(_0x1555ed);}catch(_0x359d1e){if($gameTemp['isPlaytest']())console[_0x1a55f4(0x68a)](_0x359d1e);}}return _0xa28761;};return this[_0x40266c(0x1fe)]()[_0x40266c(0x5a9)](_0x120eab,0x1);},Game_BattlerBase[_0x2a56e3(0x948)][_0x2a56e3(0x13d)]=function(_0x710c8b){const _0x1fb56c=_0x2a56e3,_0x47c651=(_0x4e4000,_0x3006f7)=>{const _0x55565c=_0x3166;if(!_0x3006f7)return _0x4e4000;if(_0x3006f7[_0x55565c(0x276)][_0x55565c(0x76d)](VisuMZ['CoreEngine'][_0x55565c(0x59c)][_0x55565c(0x7b4)][_0x710c8b])){if(_0x55565c(0x278)==='kknZz'){var _0x42c265=Number(RegExp['$1'])/0x64;_0x4e4000+=_0x42c265;}else _0xbea87b[_0x55565c(0x3a9)](),this[_0x55565c(0x4ea)]();}if(_0x3006f7[_0x55565c(0x276)][_0x55565c(0x76d)](VisuMZ[_0x55565c(0x803)][_0x55565c(0x59c)][_0x55565c(0x8f6)][_0x710c8b])){if(_0x55565c(0x1aa)===_0x55565c(0x449))this['catchLoadError'](_0x364d87);else{var _0x42c265=Number(RegExp['$1']);_0x4e4000+=_0x42c265;}}if(_0x3006f7[_0x55565c(0x276)][_0x55565c(0x76d)](VisuMZ[_0x55565c(0x803)][_0x55565c(0x59c)][_0x55565c(0x16d)][_0x710c8b])){var _0x23ebd3=String(RegExp['$1']);try{_0x4e4000+=eval(_0x23ebd3);}catch(_0x276a7d){if($gameTemp[_0x55565c(0x7f4)]())console[_0x55565c(0x68a)](_0x276a7d);}}return _0x4e4000;};return this[_0x1fb56c(0x1fe)]()[_0x1fb56c(0x5a9)](_0x47c651,0x0);},Game_BattlerBase['prototype'][_0x2a56e3(0x2ef)]=function(_0x10e3e1){const _0x29d3bd=_0x2a56e3;let _0x56ba64=_0x29d3bd(0x2ef)+_0x10e3e1+_0x29d3bd(0x5db);if(this[_0x29d3bd(0x8c1)](_0x56ba64))return this[_0x29d3bd(0x5e9)][_0x56ba64];return this[_0x29d3bd(0x5e9)][_0x56ba64]=VisuMZ[_0x29d3bd(0x803)][_0x29d3bd(0x3f7)][_0x29d3bd(0x4b7)]['SParameterFormula'][_0x29d3bd(0x697)](this,_0x10e3e1),this[_0x29d3bd(0x5e9)][_0x56ba64];},Game_BattlerBase[_0x2a56e3(0x948)][_0x2a56e3(0x5d3)]=function(_0x41c52b,_0x3e287a){const _0x521842=_0x2a56e3;if(typeof paramId===_0x521842(0x867))return this['param'](_0x41c52b);_0x41c52b=String(_0x41c52b||'')['toUpperCase']();if(_0x41c52b===_0x521842(0x39c))return this[_0x521842(0x53e)](0x0);if(_0x41c52b==='MAXMP')return this[_0x521842(0x53e)](0x1);if(_0x41c52b===_0x521842(0x500))return this[_0x521842(0x53e)](0x2);if(_0x41c52b===_0x521842(0x66b))return this['param'](0x3);if(_0x41c52b==='MAT')return this[_0x521842(0x53e)](0x4);if(_0x41c52b===_0x521842(0x1e3))return this['param'](0x5);if(_0x41c52b===_0x521842(0x2f9))return this['param'](0x6);if(_0x41c52b===_0x521842(0x623))return this[_0x521842(0x53e)](0x7);if(_0x41c52b===_0x521842(0x98e))return _0x3e287a?String(Math[_0x521842(0x377)](this[_0x521842(0x35e)](0x0)*0x64))+'%':this[_0x521842(0x35e)](0x0);if(_0x41c52b===_0x521842(0x59a))return _0x3e287a?String(Math[_0x521842(0x377)](this['xparam'](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x41c52b===_0x521842(0x16a))return _0x3e287a?String(Math[_0x521842(0x377)](this[_0x521842(0x35e)](0x2)*0x64))+'%':this[_0x521842(0x35e)](0x2);if(_0x41c52b==='CEV')return _0x3e287a?String(Math['round'](this[_0x521842(0x35e)](0x3)*0x64))+'%':this[_0x521842(0x35e)](0x3);if(_0x41c52b===_0x521842(0x227))return _0x3e287a?String(Math[_0x521842(0x377)](this['xparam'](0x4)*0x64))+'%':this[_0x521842(0x35e)](0x4);if(_0x41c52b===_0x521842(0x5f0))return _0x3e287a?String(Math[_0x521842(0x377)](this[_0x521842(0x35e)](0x5)*0x64))+'%':this[_0x521842(0x35e)](0x5);if(_0x41c52b==='CNT')return _0x3e287a?String(Math['round'](this[_0x521842(0x35e)](0x6)*0x64))+'%':this[_0x521842(0x35e)](0x6);if(_0x41c52b===_0x521842(0x9b0))return _0x3e287a?String(Math[_0x521842(0x377)](this[_0x521842(0x35e)](0x7)*0x64))+'%':this[_0x521842(0x35e)](0x7);if(_0x41c52b===_0x521842(0x815))return _0x3e287a?String(Math['round'](this['xparam'](0x8)*0x64))+'%':this[_0x521842(0x35e)](0x8);if(_0x41c52b==='TRG')return _0x3e287a?String(Math[_0x521842(0x377)](this[_0x521842(0x35e)](0x9)*0x64))+'%':this[_0x521842(0x35e)](0x9);if(_0x41c52b===_0x521842(0x2b0))return _0x3e287a?String(Math['round'](this[_0x521842(0x2ef)](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x41c52b===_0x521842(0x8d6))return _0x3e287a?String(Math['round'](this['sparam'](0x1)*0x64))+'%':this[_0x521842(0x2ef)](0x1);if(_0x41c52b===_0x521842(0x7d3))return _0x3e287a?String(Math[_0x521842(0x377)](this[_0x521842(0x2ef)](0x2)*0x64))+'%':this[_0x521842(0x2ef)](0x2);if(_0x41c52b===_0x521842(0x3ec))return _0x3e287a?String(Math['round'](this['sparam'](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x41c52b===_0x521842(0x2c1))return _0x3e287a?String(Math[_0x521842(0x377)](this['sparam'](0x4)*0x64))+'%':this[_0x521842(0x2ef)](0x4);if(_0x41c52b===_0x521842(0x3d4))return _0x3e287a?String(Math['round'](this[_0x521842(0x2ef)](0x5)*0x64))+'%':this[_0x521842(0x2ef)](0x5);if(_0x41c52b===_0x521842(0x8eb))return _0x3e287a?String(Math['round'](this[_0x521842(0x2ef)](0x6)*0x64))+'%':this[_0x521842(0x2ef)](0x6);if(_0x41c52b===_0x521842(0x436))return _0x3e287a?String(Math['round'](this[_0x521842(0x2ef)](0x7)*0x64))+'%':this[_0x521842(0x2ef)](0x7);if(_0x41c52b===_0x521842(0x4ca))return _0x3e287a?String(Math[_0x521842(0x377)](this['sparam'](0x8)*0x64))+'%':this[_0x521842(0x2ef)](0x8);if(_0x41c52b==='EXR')return _0x3e287a?String(Math[_0x521842(0x377)](this[_0x521842(0x2ef)](0x9)*0x64))+'%':this[_0x521842(0x2ef)](0x9);if(VisuMZ[_0x521842(0x803)][_0x521842(0x3c9)][_0x41c52b]){if(_0x521842(0x9aa)!==_0x521842(0x4d2)){const _0x4a4139=VisuMZ[_0x521842(0x803)][_0x521842(0x3c9)][_0x41c52b],_0x551c5a=this[_0x4a4139];if(VisuMZ[_0x521842(0x803)][_0x521842(0x966)][_0x41c52b]===_0x521842(0x4f1))return _0x551c5a;else{if(_0x521842(0x4af)===_0x521842(0x4af))return _0x3e287a?String(Math[_0x521842(0x377)](_0x551c5a*0x64))+'%':_0x551c5a;else{if(_0x98321f&&_0x5aeca5[_0x521842(0x316)])return!![];}}}else _0x263e5d[_0x521842(0x803)][_0x521842(0x7c4)][_0x521842(0x697)](this),this['destroyCoreEngineMarkedBitmaps']();}return'';},Game_BattlerBase[_0x2a56e3(0x948)][_0x2a56e3(0x1c0)]=function(){const _0x17e957=_0x2a56e3;return this[_0x17e957(0x2eb)]()&&this[_0x17e957(0x67f)]<this['mhp']*VisuMZ[_0x17e957(0x803)][_0x17e957(0x3f7)]['Param'][_0x17e957(0x6b2)];},Game_Battler[_0x2a56e3(0x948)][_0x2a56e3(0x728)]=function(){const _0x366e5d=_0x2a56e3;SoundManager[_0x366e5d(0x7f1)](),this[_0x366e5d(0x253)]('evade');},VisuMZ[_0x2a56e3(0x803)]['Game_Actor_paramBase']=Game_Actor['prototype'][_0x2a56e3(0x6a0)],Game_Actor[_0x2a56e3(0x948)][_0x2a56e3(0x6a0)]=function(_0x5cc511){const _0x26667c=_0x2a56e3;if(this['level']>0x63)return this['paramBaseAboveLevel99'](_0x5cc511);return VisuMZ[_0x26667c(0x803)][_0x26667c(0x5b0)][_0x26667c(0x697)](this,_0x5cc511);},Game_Actor[_0x2a56e3(0x948)][_0x2a56e3(0x30e)]=function(_0x706c9){const _0x3cdf5e=_0x2a56e3,_0x3c2b12=this[_0x3cdf5e(0x1e5)]()[_0x3cdf5e(0x5a0)][_0x706c9][0x63],_0x2db065=this['currentClass']()['params'][_0x706c9][0x62];return _0x3c2b12+(_0x3c2b12-_0x2db065)*(this['level']-0x63);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x572)]=Game_Actor[_0x2a56e3(0x948)][_0x2a56e3(0x768)],Game_Actor[_0x2a56e3(0x948)][_0x2a56e3(0x768)]=function(_0x347342,_0xcf9427){const _0x2075fe=_0x2a56e3;$gameTemp[_0x2075fe(0x764)]=!![],VisuMZ[_0x2075fe(0x803)][_0x2075fe(0x572)][_0x2075fe(0x697)](this,_0x347342,_0xcf9427),$gameTemp[_0x2075fe(0x764)]=undefined;},VisuMZ[_0x2a56e3(0x803)]['Game_Actor_levelUp']=Game_Actor[_0x2a56e3(0x948)][_0x2a56e3(0x63e)],Game_Actor[_0x2a56e3(0x948)]['levelUp']=function(){const _0x2ec30d=_0x2a56e3;VisuMZ[_0x2ec30d(0x803)][_0x2ec30d(0x786)][_0x2ec30d(0x697)](this);if(!$gameTemp[_0x2ec30d(0x764)])this[_0x2ec30d(0x65b)]();},Game_Actor['prototype'][_0x2a56e3(0x65b)]=function(){const _0x39b69c=_0x2a56e3;this[_0x39b69c(0x5e9)]={};if(VisuMZ[_0x39b69c(0x803)]['Settings'][_0x39b69c(0x2fc)][_0x39b69c(0x21f)])this[_0x39b69c(0x67f)]=this[_0x39b69c(0x4b5)];if(VisuMZ[_0x39b69c(0x803)][_0x39b69c(0x3f7)][_0x39b69c(0x2fc)][_0x39b69c(0x89b)])this['_mp']=this[_0x39b69c(0x8b7)];},Game_Actor[_0x2a56e3(0x948)]['expRate']=function(){const _0x20bee4=_0x2a56e3;if(this[_0x20bee4(0x333)]())return 0x1;const _0x559e84=this[_0x20bee4(0x802)]()-this[_0x20bee4(0x2c8)](),_0x47e170=this[_0x20bee4(0x329)]()-this[_0x20bee4(0x2c8)]();return(_0x47e170/_0x559e84)[_0x20bee4(0x459)](0x0,0x1);},Game_Actor[_0x2a56e3(0x948)][_0x2a56e3(0x1fe)]=function(){const _0x487843=_0x2a56e3,_0x1bb064=Game_Battler[_0x487843(0x948)][_0x487843(0x1fe)][_0x487843(0x697)](this);for(const _0x5dcf02 of this[_0x487843(0x6e1)]()){_0x487843(0x5e4)===_0x487843(0x40f)?this[_0x487843(0x246)][_0x487843(0x7a2)](_0x2cbe43[_0x487843(0x7c9)][_0x487843(0x366)]):_0x5dcf02&&_0x1bb064[_0x487843(0x487)](_0x5dcf02);}return _0x1bb064[_0x487843(0x487)](this['currentClass'](),this[_0x487843(0x4ac)]()),_0x1bb064;},Object[_0x2a56e3(0x619)](Game_Enemy[_0x2a56e3(0x948)],_0x2a56e3(0x2b2),{'get':function(){const _0x10791e=_0x2a56e3;return this[_0x10791e(0x52e)]();},'configurable':!![]}),Game_Enemy[_0x2a56e3(0x948)][_0x2a56e3(0x52e)]=function(){const _0x429d1f=_0x2a56e3;return this['enemy']()[_0x429d1f(0x2b2)];},Game_Enemy[_0x2a56e3(0x948)][_0x2a56e3(0x540)]=function(){const _0x49b686=_0x2a56e3;!this[_0x49b686(0x495)]&&(this[_0x49b686(0x6dc)]+=Math[_0x49b686(0x377)]((Graphics['height']-0x270)/0x2),this[_0x49b686(0x6dc)]-=Math[_0x49b686(0x6ad)]((Graphics[_0x49b686(0x8c0)]-Graphics['boxHeight'])/0x2),$gameSystem[_0x49b686(0x351)]()?'ELqgD'!==_0x49b686(0x2e8)?this['_screenX']-=Math['floor']((Graphics['width']-Graphics[_0x49b686(0x3dd)])/0x2):(this['opacity']+=this['visible']?this[_0x49b686(0x576)]():-0x1*this[_0x49b686(0x576)](),this[_0x49b686(0x716)]=_0x1bcc5b[_0x49b686(0x4c9)](0xc0,this[_0x49b686(0x716)])):this[_0x49b686(0x291)]+=Math[_0x49b686(0x377)]((Graphics[_0x49b686(0x3dd)]-0x330)/0x2)),this[_0x49b686(0x495)]=!![];},Game_Party[_0x2a56e3(0x948)][_0x2a56e3(0x7d5)]=function(){const _0x4937a4=_0x2a56e3;return VisuMZ[_0x4937a4(0x803)][_0x4937a4(0x3f7)]['Gold'][_0x4937a4(0x7b1)];},VisuMZ[_0x2a56e3(0x803)]['Game_Party_consumeItem']=Game_Party['prototype']['consumeItem'],Game_Party[_0x2a56e3(0x948)][_0x2a56e3(0x186)]=function(_0x543f62){const _0xf9bd06=_0x2a56e3;if(VisuMZ['CoreEngine'][_0xf9bd06(0x3f7)][_0xf9bd06(0x2fc)][_0xf9bd06(0x256)]&&DataManager[_0xf9bd06(0x31c)](_0x543f62))return;VisuMZ[_0xf9bd06(0x803)][_0xf9bd06(0x788)][_0xf9bd06(0x697)](this,_0x543f62);},Game_Party[_0x2a56e3(0x948)][_0x2a56e3(0x345)]=function(){const _0x37988f=_0x2a56e3,_0x26b1b1=VisuMZ[_0x37988f(0x803)]['Settings']['QoL'],_0x29689a=_0x26b1b1[_0x37988f(0x7e4)]??0x63;let _0x554f03=[];(_0x26b1b1[_0x37988f(0x452)]??!![])&&(_0x554f03=_0x554f03[_0x37988f(0x74e)]($dataItems));(_0x26b1b1[_0x37988f(0x496)]??!![])&&(_0x554f03=_0x554f03[_0x37988f(0x74e)]($dataWeapons));if(_0x26b1b1[_0x37988f(0x53d)]??!![]){if(_0x37988f(0x279)===_0x37988f(0x279))_0x554f03=_0x554f03[_0x37988f(0x74e)]($dataArmors);else{_0x3d6d79['ConvertParams'](_0x254df0,_0x22836b);const _0x36b498=_0x4402c9[_0x37988f(0x377)](_0x54104f[_0x37988f(0x5f3)])['clamp'](-0x64,0x64),_0x564e25=_0x10575e[_0x37988f(0x263)];_0x564e25&&(_0x564e25['pan']=_0x36b498,_0x2212b9[_0x37988f(0x87f)](_0x564e25));}}for(const _0x288df0 of _0x554f03){if(_0x37988f(0x7db)==='lMqIg'){if(!_0x288df0)continue;if(_0x288df0[_0x37988f(0x6f5)][_0x37988f(0x74d)]()<=0x0)continue;if(_0x288df0[_0x37988f(0x6f5)][_0x37988f(0x76d)](/-----/i))continue;this['gainItem'](_0x288df0,_0x29689a);}else _0x395a2f['endAnimation']();}},VisuMZ[_0x2a56e3(0x803)]['Game_Troop_setup']=Game_Troop['prototype'][_0x2a56e3(0x5d4)],Game_Troop[_0x2a56e3(0x948)][_0x2a56e3(0x5d4)]=function(_0x500cfa){const _0x3e7a6f=_0x2a56e3;$gameTemp[_0x3e7a6f(0x732)](),$gameTemp[_0x3e7a6f(0x705)](_0x500cfa),VisuMZ['CoreEngine'][_0x3e7a6f(0x82d)][_0x3e7a6f(0x697)](this,_0x500cfa);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x5ea)]=Game_Map['prototype'][_0x2a56e3(0x5d4)],Game_Map[_0x2a56e3(0x948)][_0x2a56e3(0x5d4)]=function(_0x2cb63e){const _0x5a4abd=_0x2a56e3;VisuMZ[_0x5a4abd(0x803)]['Game_Map_setup'][_0x5a4abd(0x697)](this,_0x2cb63e),this['checkCoreEngineDisplayCenter'](),this[_0x5a4abd(0x888)](_0x2cb63e);},Game_Map['prototype'][_0x2a56e3(0x888)]=function(){const _0x8805a7=_0x2a56e3;this['_hideTileShadows']=VisuMZ[_0x8805a7(0x803)][_0x8805a7(0x3f7)][_0x8805a7(0x2fc)][_0x8805a7(0x591)]||![];const _0x260f7f=VisuMZ['CoreEngine']['Settings'][_0x8805a7(0x707)],_0x5cba88=$dataMap?$dataMap[_0x8805a7(0x276)]||'':'';if(_0x5cba88[_0x8805a7(0x76d)](/<SHOW TILE SHADOWS>/i))_0x8805a7(0x18d)==='kMpge'?this[_0x8805a7(0x95a)]=![]:this['_forcedBattleSys']=_0x8805a7(0x339);else _0x5cba88[_0x8805a7(0x76d)](/<HIDE TILE SHADOWS>/i)&&(this[_0x8805a7(0x95a)]=!![]);if(_0x5cba88[_0x8805a7(0x76d)](/<SCROLL LOCK X>/i))'ghmMl'==='AIwZE'?this[_0x8805a7(0x6f7)](_0x5a1801):(this['centerCameraCheckData']()[_0x8805a7(0x15f)]=!![],this['centerCameraCheckData']()[_0x8805a7(0x70a)]=_0x260f7f['DisplayLockX']);else{if(_0x5cba88[_0x8805a7(0x76d)](/<SCROLL LOCK X: (.*?)>/i)){if(_0x8805a7(0x973)===_0x8805a7(0x973))this[_0x8805a7(0x251)]()[_0x8805a7(0x15f)]=!![],this[_0x8805a7(0x251)]()[_0x8805a7(0x70a)]=Number(RegExp['$1']);else return _0x560476[_0x8805a7(0x7c9)][_0x8805a7(0x999)][_0x8805a7(0x697)](this);}}if(_0x5cba88[_0x8805a7(0x76d)](/<SCROLL LOCK Y>/i))'uzAcE'!==_0x8805a7(0x67b)?(this[_0x8805a7(0x251)]()[_0x8805a7(0x3b6)]=!![],this[_0x8805a7(0x251)]()['displayY']=_0x260f7f['DisplayLockY']):_0x3ac127(_0x577f65);else _0x5cba88[_0x8805a7(0x76d)](/<SCROLL LOCK Y: (.*?)>/i)&&(this['centerCameraCheckData']()[_0x8805a7(0x3b6)]=!![],this[_0x8805a7(0x251)]()[_0x8805a7(0x992)]=Number(RegExp['$1']));},Game_Map[_0x2a56e3(0x948)]['areTileShadowsHidden']=function(){const _0x1807a0=_0x2a56e3;if(this['_hideTileShadows']===undefined)this['setupCoreEngine']();return this[_0x1807a0(0x95a)];},Game_Map[_0x2a56e3(0x948)]['checkCoreEngineDisplayCenter']=function(){const _0x322100=_0x2a56e3,_0x1086c6=VisuMZ[_0x322100(0x803)][_0x322100(0x3f7)]['ScreenResolution'];this[_0x322100(0x18f)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x1086c6[_0x322100(0x721)]){const _0x491f09=Graphics[_0x322100(0x290)]/this['tileWidth']();_0x491f09%0x1!==0x0&&Math['ceil'](_0x491f09)===this[_0x322100(0x290)]()&&!this[_0x322100(0x241)]()&&(this['_centerCameraCheck']['centerX']=!![],this[_0x322100(0x18f)][_0x322100(0x70a)]=_0x1086c6[_0x322100(0x875)]||0x0);}if(_0x1086c6[_0x322100(0x68b)]){const _0x200f8d=Graphics['height']/this['tileHeight']();_0x200f8d%0x1!==0x0&&Math['ceil'](_0x200f8d)===this[_0x322100(0x8c0)]()&&!this[_0x322100(0x36f)]()&&(this[_0x322100(0x18f)][_0x322100(0x3b6)]=!![],this[_0x322100(0x18f)]['displayY']=_0x1086c6[_0x322100(0x823)]||0x0);}},Game_Map[_0x2a56e3(0x948)][_0x2a56e3(0x251)]=function(){const _0x913243=_0x2a56e3;if(this[_0x913243(0x18f)]===undefined)this[_0x913243(0x195)]();return this[_0x913243(0x18f)];},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x954)]=Game_Map[_0x2a56e3(0x948)][_0x2a56e3(0x70b)],Game_Map[_0x2a56e3(0x948)][_0x2a56e3(0x70b)]=function(_0x1f3f60){const _0x5ec779=_0x2a56e3;if(this[_0x5ec779(0x251)]()[_0x5ec779(0x3b6)]&&$gameScreen[_0x5ec779(0x173)]()===0x1){if(_0x5ec779(0x6c9)===_0x5ec779(0x6c9)){this['_displayY']=this[_0x5ec779(0x251)]()[_0x5ec779(0x992)];return;}else this[_0x5ec779(0x86d)]&&this['_editWindow'][_0x5ec779(0x7a2)](_0x112816[_0x5ec779(0x7c9)][_0x5ec779(0x314)]),this[_0x5ec779(0x178)]&&this[_0x5ec779(0x178)][_0x5ec779(0x7a2)](_0x26c344['layoutSettings'][_0x5ec779(0x58a)]);}VisuMZ['CoreEngine']['Game_Map_scrollDown']['call'](this,_0x1f3f60);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x494)]=Game_Map[_0x2a56e3(0x948)][_0x2a56e3(0x82f)],Game_Map[_0x2a56e3(0x948)][_0x2a56e3(0x82f)]=function(_0x449078){const _0x14b9eb=_0x2a56e3;if(this[_0x14b9eb(0x251)]()[_0x14b9eb(0x15f)]&&$gameScreen[_0x14b9eb(0x173)]()===0x1){this[_0x14b9eb(0x464)]=this['centerCameraCheckData']()[_0x14b9eb(0x70a)];return;}VisuMZ[_0x14b9eb(0x803)][_0x14b9eb(0x494)][_0x14b9eb(0x697)](this,_0x449078);},VisuMZ['CoreEngine'][_0x2a56e3(0x956)]=Game_Map[_0x2a56e3(0x948)][_0x2a56e3(0x6d8)],Game_Map[_0x2a56e3(0x948)][_0x2a56e3(0x6d8)]=function(_0x43017e){const _0x56ee7b=_0x2a56e3;if(this[_0x56ee7b(0x251)]()[_0x56ee7b(0x15f)]&&$gameScreen['zoomScale']()===0x1){if(_0x56ee7b(0x7ba)!==_0x56ee7b(0x538)){this[_0x56ee7b(0x464)]=this[_0x56ee7b(0x251)]()[_0x56ee7b(0x70a)];return;}else return _0x18e843['CoreEngine'][_0x56ee7b(0x519)][_0x56ee7b(0x697)](this)||this[_0x56ee7b(0x47c)]();}VisuMZ['CoreEngine'][_0x56ee7b(0x956)][_0x56ee7b(0x697)](this,_0x43017e);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x808)]=Game_Map['prototype'][_0x2a56e3(0x852)],Game_Map[_0x2a56e3(0x948)]['scrollUp']=function(_0x2275e0){const _0x842518=_0x2a56e3;if(this[_0x842518(0x251)]()[_0x842518(0x3b6)]&&$gameScreen[_0x842518(0x173)]()===0x1){this['_displayY']=this['centerCameraCheckData']()[_0x842518(0x992)];return;}VisuMZ[_0x842518(0x803)]['Game_Map_scrollUp'][_0x842518(0x697)](this,_0x2275e0);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x787)]=Game_Character['prototype'][_0x2a56e3(0x994)],Game_Character[_0x2a56e3(0x948)][_0x2a56e3(0x994)]=function(_0x27adaf){const _0x3c0553=_0x2a56e3;try{_0x3c0553(0x340)!==_0x3c0553(0x5d0)?VisuMZ[_0x3c0553(0x803)][_0x3c0553(0x787)][_0x3c0553(0x697)](this,_0x27adaf):this[_0x3c0553(0x60a)]()?_0x3cdc23[_0x3c0553(0x803)][_0x3c0553(0x85b)][_0x3c0553(0x697)](this,_0x3ddd04):this[_0x3c0553(0x841)](_0x4c2703);}catch(_0x428701){if($gameTemp[_0x3c0553(0x7f4)]())console['log'](_0x428701);}},Game_Player['prototype'][_0x2a56e3(0x34c)]=function(){const _0x4aca0f=_0x2a56e3,_0x66b67f=$gameMap[_0x4aca0f(0x4c0)]();this[_0x4aca0f(0x475)]=Math[_0x4aca0f(0x5de)](_0x66b67f)+Math[_0x4aca0f(0x5de)](_0x66b67f)+this[_0x4aca0f(0x34b)]();},Game_Player['prototype'][_0x2a56e3(0x34b)]=function(){const _0x1c11b4=_0x2a56e3;if($dataMap&&$dataMap[_0x1c11b4(0x276)]&&$dataMap['note'][_0x1c11b4(0x76d)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i))return Number(RegExp['$1']);else{if(_0x1c11b4(0x94e)===_0x1c11b4(0x4fd)){const _0x5759d2=_0x470eaf[_0x1c11b4(0x803)][_0x1c11b4(0x3f7)]['ScreenShake'];if(_0x5759d2&&_0x5759d2[_0x1c11b4(0x857)])return _0x5759d2[_0x1c11b4(0x857)][_0x1c11b4(0x697)](this);this['x']+=_0x26345f['round'](_0x57be95[_0x1c11b4(0x154)]());}else return VisuMZ[_0x1c11b4(0x803)]['Settings'][_0x1c11b4(0x2fc)]['EncounterRateMinimum'];}},VisuMZ['CoreEngine'][_0x2a56e3(0x7f8)]=Game_Event[_0x2a56e3(0x948)][_0x2a56e3(0x8bb)],Game_Event['prototype'][_0x2a56e3(0x8bb)]=function(_0x5c5e0e,_0x593519){const _0xda069f=_0x2a56e3;if(this['isSmartEventCollisionOn']())return this[_0xda069f(0x695)](_0x5c5e0e,_0x593519);else{if(_0xda069f(0x843)===_0xda069f(0x843))return VisuMZ[_0xda069f(0x803)][_0xda069f(0x7f8)][_0xda069f(0x697)](this,_0x5c5e0e,_0x593519);else{_0xea145f[_0xda069f(0x820)](_0x162f4b,_0x5a5e38);const _0x1e956a=_0x2bdb52['option']||0x1;_0x21e2b5[_0xda069f(0x4e7)](_0x1e956a);}}},Game_Event[_0x2a56e3(0x948)]['isSmartEventCollisionOn']=function(){const _0x49ec3d=_0x2a56e3;return VisuMZ[_0x49ec3d(0x803)][_0x49ec3d(0x3f7)][_0x49ec3d(0x2fc)][_0x49ec3d(0x97d)];},Game_Event[_0x2a56e3(0x948)]['checkSmartEventCollision']=function(_0x23b6e3,_0x38ebde){const _0x3776aa=_0x2a56e3;if(!this[_0x3776aa(0x868)]())return![];else{if('dagZI'!==_0x3776aa(0x455)){const _0x497b0b=$gameMap[_0x3776aa(0x2b7)](_0x23b6e3,_0x38ebde)[_0x3776aa(0x513)](_0x1691fb=>_0x1691fb[_0x3776aa(0x868)]());return _0x497b0b[_0x3776aa(0x9b5)]>0x0;}else try{const _0x22d33e=_0x16713c[_0x3776aa(0x5c7)](_0x2c9c1e,{'to':'string','level':0x1});if(_0x22d33e[_0x3776aa(0x9b5)]>=0xc350){}_0x2ad361(_0x22d33e);}catch(_0x13bc28){_0x18febd(_0x13bc28);}}},VisuMZ[_0x2a56e3(0x803)]['Game_Interpreter_command105']=Game_Interpreter[_0x2a56e3(0x948)][_0x2a56e3(0x83c)],Game_Interpreter[_0x2a56e3(0x948)][_0x2a56e3(0x83c)]=function(_0x885e21){const _0x3e7740=_0x2a56e3,_0x87b80e=this[_0x3e7740(0x682)]();if(_0x87b80e[_0x3e7740(0x76d)](/\/\/[ ]SCRIPT[ ]CALL/i)){if('GbCLt'!==_0x3e7740(0x163)){let _0x1e103a=_0x6c375a[_0x3e7740(0x72a)](_0x291420)[_0x3e7740(0x6fe)]();this[_0x3e7740(0x1ee)]()&&(_0x1e103a=_0x58be62[_0x3e7740(0x85a)](_0x1e103a));const _0x18cc4e=this[_0x3e7740(0x1fa)](),_0x134ec7=_0x595a7e[_0x3e7740(0x6ad)](_0x18cc4e*0.75);for(let _0x5c2595=0x0;_0x5c2595<_0x1e103a[_0x3e7740(0x9b5)];_0x5c2595++){const _0xab14e9=this[_0x3e7740(0x70f)](_0x134ec7,_0x18cc4e);_0xab14e9[_0x3e7740(0x65e)][_0x3e7740(0x21a)](_0x1e103a[_0x5c2595],0x0,0x0,_0x134ec7,_0x18cc4e,_0x3e7740(0x4e1)),_0xab14e9['x']=(_0x5c2595-(_0x1e103a['length']-0x1)/0x2)*_0x134ec7,_0xab14e9['dy']=-_0x5c2595;}}else return this['runCombinedScrollingTextAsCode'](_0x87b80e);}else return VisuMZ['CoreEngine'][_0x3e7740(0x5b2)][_0x3e7740(0x697)](this,_0x885e21);},Game_Interpreter['prototype'][_0x2a56e3(0x682)]=function(){const _0x2611bb=_0x2a56e3;let _0x5a746b='',_0x458ac0=this[_0x2611bb(0x435)]+0x1;while(this[_0x2611bb(0x796)][_0x458ac0]&&this[_0x2611bb(0x796)][_0x458ac0][_0x2611bb(0x4bf)]===0x195){_0x5a746b+=this['_list'][_0x458ac0][_0x2611bb(0x9b6)][0x0]+'\x0a',_0x458ac0++;}return _0x5a746b;},Game_Interpreter[_0x2a56e3(0x948)][_0x2a56e3(0x3e8)]=function(_0x37d57b){const _0x5eb347=_0x2a56e3;try{if(_0x5eb347(0x839)===_0x5eb347(0x839))eval(_0x37d57b);else return _0x4063c8[_0x5eb347(0x7c9)][_0x5eb347(0x999)][_0x5eb347(0x697)](this);}catch(_0x578e2b){if($gameTemp[_0x5eb347(0x7f4)]()){if(_0x5eb347(0x2c6)===_0x5eb347(0x929)){const _0x1d2665=_0x43070d+(this[_0x5eb347(0x5c9)]()-_0x21cde3[_0x5eb347(0x27e)])/0x2;this[_0x5eb347(0x7a0)](_0x2edbbc,_0x5c8193+(_0x52e603-_0x2e5a94[_0x5eb347(0x6cd)]),_0x1d2665),_0x92bab6-=_0x50f8ad[_0x5eb347(0x6cd)]+0x4;}else console[_0x5eb347(0x68a)](_0x5eb347(0x864)),console[_0x5eb347(0x68a)](_0x578e2b);}}return!![];},VisuMZ[_0x2a56e3(0x803)]['Game_Interpreter_command111']=Game_Interpreter[_0x2a56e3(0x948)][_0x2a56e3(0x354)],Game_Interpreter[_0x2a56e3(0x948)]['command111']=function(_0x17457c){const _0x33de42=_0x2a56e3;try{VisuMZ[_0x33de42(0x803)][_0x33de42(0x492)][_0x33de42(0x697)](this,_0x17457c);}catch(_0x22af01){if($gameTemp['isPlaytest']()){if(_0x33de42(0x2e7)!=='HcvTU')console[_0x33de42(0x68a)]('Conditional\x20Branch\x20Script\x20Error'),console['log'](_0x22af01);else return _0x5734e4[_0x33de42(0x803)][_0x33de42(0x3f7)]['QoL'][_0x33de42(0x293)];}this[_0x33de42(0x79a)]();}return!![];},VisuMZ['CoreEngine'][_0x2a56e3(0x252)]=Game_Interpreter[_0x2a56e3(0x948)][_0x2a56e3(0x78e)],Game_Interpreter[_0x2a56e3(0x948)]['command122']=function(_0x1be949){const _0x164fa7=_0x2a56e3;try{_0x164fa7(0x503)===_0x164fa7(0x1eb)?_0x4b87a6('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'[_0x164fa7(0x6ba)](_0x2a197d)):VisuMZ['CoreEngine'][_0x164fa7(0x252)]['call'](this,_0x1be949);}catch(_0x218a6f){if($gameTemp[_0x164fa7(0x7f4)]()){if(_0x164fa7(0x31a)!==_0x164fa7(0x31a))return this[_0x164fa7(0x7de)]()?this['contents'][_0x164fa7(0x424)](_0x4171df):_0xb06355[_0x164fa7(0x948)][_0x164fa7(0x2c7)][_0x164fa7(0x697)](this,_0x2a432b);else console[_0x164fa7(0x68a)](_0x164fa7(0x95e)),console[_0x164fa7(0x68a)](_0x218a6f);}}return!![];},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x554)]=Game_Interpreter[_0x2a56e3(0x948)][_0x2a56e3(0x57c)],Game_Interpreter[_0x2a56e3(0x948)][_0x2a56e3(0x57c)]=function(){const _0x8f6a92=_0x2a56e3;try{if(_0x8f6a92(0x359)===_0x8f6a92(0x359))VisuMZ[_0x8f6a92(0x803)]['Game_Interpreter_command355'][_0x8f6a92(0x697)](this);else{if(_0xc56c5d[_0x8f6a92(0x559)](_0x4a143c)){const _0x3f803a=_0x22132d[_0x8f6a92(0x803)]['ControllerMatches'][_0x373601],_0x19bd9c=_0x40d707[_0x8f6a92(0x803)][_0x8f6a92(0x60b)][_0x3f803a];return _0x19bd9c[_0x2917e4]||this[_0x8f6a92(0x870)](_0x1a1121);}}}catch(_0x2133d0){_0x8f6a92(0x284)!=='uKmxW'?(_0x1abe77[_0x8f6a92(0x803)]['Game_Picture_move'][_0x8f6a92(0x697)](this,_0xf22809,_0x56a19c,_0x28ecf5,_0x14696a,_0x150c24,_0x5c0692,_0x49827d,_0x1e9f1a,_0x19f178),this[_0x8f6a92(0x7c1)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x2cda05]||{'x':0x0,'y':0x0})):$gameTemp[_0x8f6a92(0x7f4)]()&&(console[_0x8f6a92(0x68a)](_0x8f6a92(0x8bf)),console[_0x8f6a92(0x68a)](_0x2133d0));}return!![];},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x7aa)]=Game_Interpreter[_0x2a56e3(0x948)][_0x2a56e3(0x8d4)],Game_Interpreter[_0x2a56e3(0x948)][_0x2a56e3(0x8d4)]=function(_0x1c2a68){const _0x3d20c6=_0x2a56e3;return $gameTemp[_0x3d20c6(0x827)](this),VisuMZ['CoreEngine'][_0x3d20c6(0x7aa)][_0x3d20c6(0x697)](this,_0x1c2a68);},Scene_Base['prototype']['fadeSpeed']=function(){const _0x3c5775=_0x2a56e3;return VisuMZ[_0x3c5775(0x803)][_0x3c5775(0x3f7)]['UI']['FadeSpeed'];},Scene_Base['prototype'][_0x2a56e3(0x99a)]=function(){const _0x1d1fd9=_0x2a56e3;return VisuMZ[_0x1d1fd9(0x803)][_0x1d1fd9(0x3f7)]['UI']['BottomHelp'];},Scene_Base['prototype'][_0x2a56e3(0x914)]=function(){const _0x31e729=_0x2a56e3;return VisuMZ[_0x31e729(0x803)][_0x31e729(0x3f7)]['UI']['BottomButtons'];},Scene_Base['prototype'][_0x2a56e3(0x5dd)]=function(){const _0x297ee1=_0x2a56e3;return VisuMZ[_0x297ee1(0x803)][_0x297ee1(0x3f7)]['UI']['RightMenus'];},Scene_Base[_0x2a56e3(0x948)][_0x2a56e3(0x8a4)]=function(){const _0x249c26=_0x2a56e3;return VisuMZ[_0x249c26(0x803)][_0x249c26(0x3f7)]['UI']['CommandWidth'];},Scene_Base[_0x2a56e3(0x948)][_0x2a56e3(0x9bd)]=function(){const _0xb0ee3b=_0x2a56e3;return VisuMZ['CoreEngine'][_0xb0ee3b(0x3f7)]['UI'][_0xb0ee3b(0x7af)];},Scene_Base[_0x2a56e3(0x948)]['isWindowMaskingEnabled']=function(){const _0x31eec6=_0x2a56e3;return VisuMZ[_0x31eec6(0x803)][_0x31eec6(0x3f7)]['Window'][_0x31eec6(0x92d)];},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x593)]=Scene_Base[_0x2a56e3(0x948)][_0x2a56e3(0x44b)],Scene_Base[_0x2a56e3(0x948)][_0x2a56e3(0x44b)]=function(){const _0x31e0fe=_0x2a56e3;VisuMZ['CoreEngine'][_0x31e0fe(0x593)][_0x31e0fe(0x697)](this),this['createButtonAssistWindow'](),this[_0x31e0fe(0x733)]['x']=Math['round'](this[_0x31e0fe(0x733)]['x']),this[_0x31e0fe(0x733)]['y']=Math[_0x31e0fe(0x377)](this['_windowLayer']['y']);},Scene_Base[_0x2a56e3(0x948)][_0x2a56e3(0x80a)]=function(){},Scene_Base[_0x2a56e3(0x948)]['buttonAssistKey1']=function(){const _0xb28e96=_0x2a56e3;return TextManager['getInputMultiButtonStrings'](_0xb28e96(0x81a),_0xb28e96(0x465));},Scene_Base['prototype'][_0x2a56e3(0x438)]=function(){const _0x18e2aa=_0x2a56e3;return TextManager[_0x18e2aa(0x849)](_0x18e2aa(0x78b));},Scene_Base['prototype'][_0x2a56e3(0x6d6)]=function(){const _0x2904d4=_0x2a56e3;return TextManager[_0x2904d4(0x849)](_0x2904d4(0x6fd));},Scene_Base['prototype']['buttonAssistKey4']=function(){const _0x21092e=_0x2a56e3;return TextManager[_0x21092e(0x849)]('ok');},Scene_Base[_0x2a56e3(0x948)]['buttonAssistKey5']=function(){const _0x411d8b=_0x2a56e3;return TextManager['getInputButtonString'](_0x411d8b(0x71b));},Scene_Base[_0x2a56e3(0x948)][_0x2a56e3(0x187)]=function(){const _0x1a3e92=_0x2a56e3;return this[_0x1a3e92(0x809)]&&this['_pageupButton'][_0x1a3e92(0x575)]?TextManager[_0x1a3e92(0x51f)]:'';},Scene_Base[_0x2a56e3(0x948)]['buttonAssistText2']=function(){return'';},Scene_Base[_0x2a56e3(0x948)][_0x2a56e3(0x40b)]=function(){return'';},Scene_Base[_0x2a56e3(0x948)][_0x2a56e3(0x365)]=function(){const _0x21cda6=_0x2a56e3;return TextManager[_0x21cda6(0x41e)];},Scene_Base[_0x2a56e3(0x948)]['buttonAssistText5']=function(){const _0x351f6e=_0x2a56e3;return TextManager[_0x351f6e(0x83a)];},Scene_Base[_0x2a56e3(0x948)][_0x2a56e3(0x346)]=function(){return 0x0;},Scene_Base[_0x2a56e3(0x948)]['buttonAssistOffset2']=function(){return 0x0;},Scene_Base[_0x2a56e3(0x948)][_0x2a56e3(0x467)]=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset4']=function(){return 0x0;},Scene_Base[_0x2a56e3(0x948)][_0x2a56e3(0x69e)]=function(){return 0x0;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x766)]=Scene_Boot['prototype'][_0x2a56e3(0x56b)],Scene_Boot[_0x2a56e3(0x948)][_0x2a56e3(0x56b)]=function(){const _0x631a0=_0x2a56e3;VisuMZ[_0x631a0(0x803)][_0x631a0(0x766)]['call'](this),this[_0x631a0(0x99e)]();},Scene_Boot['prototype'][_0x2a56e3(0x99e)]=function(){const _0x390c36=_0x2a56e3,_0x4ae74d=[_0x390c36(0x43c),_0x390c36(0x4a8),_0x390c36(0x5ec),'characters',_0x390c36(0x8fb),'faces',_0x390c36(0x11c),_0x390c36(0x390),_0x390c36(0x1dc),_0x390c36(0x505),'system',_0x390c36(0x1c6),_0x390c36(0x91b),_0x390c36(0x894)];for(const _0x5d4d62 of _0x4ae74d){const _0x889582=VisuMZ['CoreEngine']['Settings']['ImgLoad'][_0x5d4d62],_0x28ef83=_0x390c36(0x605)[_0x390c36(0x6ba)](_0x5d4d62);for(const _0x10c806 of _0x889582){ImageManager[_0x390c36(0x673)](_0x28ef83,_0x10c806);}}},VisuMZ['CoreEngine']['Scene_Boot_startNormalGame']=Scene_Boot[_0x2a56e3(0x948)][_0x2a56e3(0x798)],Scene_Boot[_0x2a56e3(0x948)]['startNormalGame']=function(){const _0x4fbde4=_0x2a56e3;Utils[_0x4fbde4(0x245)]('test')&&VisuMZ[_0x4fbde4(0x803)][_0x4fbde4(0x3f7)][_0x4fbde4(0x2fc)][_0x4fbde4(0x4cd)]?this[_0x4fbde4(0x514)]():VisuMZ['CoreEngine'][_0x4fbde4(0x60e)]['call'](this);},Scene_Boot['prototype']['startAutoNewGame']=function(){const _0x5de780=_0x2a56e3;DataManager['setupNewGame'](),SceneManager[_0x5de780(0x736)](Scene_Map);},Scene_Boot['prototype'][_0x2a56e3(0x33e)]=function(){const _0x576840=_0x2a56e3,_0x1e2d82=$dataSystem[_0x576840(0x87e)]['uiAreaWidth'],_0x312c41=$dataSystem[_0x576840(0x87e)]['uiAreaHeight'],_0x5e7975=VisuMZ[_0x576840(0x803)][_0x576840(0x3f7)]['UI'][_0x576840(0x126)];Graphics[_0x576840(0x3dd)]=_0x1e2d82-_0x5e7975*0x2,Graphics[_0x576840(0x662)]=_0x312c41-_0x5e7975*0x2,this[_0x576840(0x7cc)]();},VisuMZ['CoreEngine']['Scene_Boot_updateDocumentTitle']=Scene_Boot[_0x2a56e3(0x948)]['updateDocumentTitle'],Scene_Boot[_0x2a56e3(0x948)][_0x2a56e3(0x40a)]=function(){const _0x1f7997=_0x2a56e3;this[_0x1f7997(0x3b0)]()?this['makeDocumentTitle']():VisuMZ['CoreEngine'][_0x1f7997(0x461)][_0x1f7997(0x697)](this);},Scene_Boot['prototype'][_0x2a56e3(0x3b0)]=function(){const _0x5239f8=_0x2a56e3;if(Scene_Title[_0x5239f8(0x8b5)]==='')return![];if(Scene_Title['subtitle']==='Subtitle')return![];if(Scene_Title['version']==='')return![];if(Scene_Title[_0x5239f8(0x266)]===_0x5239f8(0x980))return![];return!![];},Scene_Boot['prototype'][_0x2a56e3(0x616)]=function(){const _0x2baa37=_0x2a56e3,_0x9125b3=$dataSystem[_0x2baa37(0x355)],_0x1e9b55=Scene_Title[_0x2baa37(0x8b5)]||'',_0x287aed=Scene_Title[_0x2baa37(0x266)]||'',_0x3f0760=VisuMZ['CoreEngine'][_0x2baa37(0x3f7)][_0x2baa37(0x8fd)]['Title']['DocumentTitleFmt'],_0x363155=_0x3f0760[_0x2baa37(0x6ba)](_0x9125b3,_0x1e9b55,_0x287aed);document[_0x2baa37(0x23b)]=_0x363155;},Scene_Boot[_0x2a56e3(0x948)]['determineSideButtonLayoutValid']=function(){const _0x5207b0=_0x2a56e3;if(VisuMZ[_0x5207b0(0x803)][_0x5207b0(0x3f7)]['UI'][_0x5207b0(0x887)]){if('aMpLm'===_0x5207b0(0x566))return this['_commandWindow']['maxItems']();else{const _0x433a47=Graphics[_0x5207b0(0x290)]-Graphics['boxWidth']-VisuMZ[_0x5207b0(0x803)][_0x5207b0(0x3f7)]['UI']['BoxMargin']*0x2,_0x356091=Sprite_Button[_0x5207b0(0x948)]['blockWidth'][_0x5207b0(0x697)](this)*0x4;if(_0x433a47>=_0x356091)SceneManager[_0x5207b0(0x8e1)](!![]);}}},Scene_Title[_0x2a56e3(0x8b5)]=VisuMZ[_0x2a56e3(0x803)]['Settings']['MenuLayout'][_0x2a56e3(0x7b7)][_0x2a56e3(0x5a1)],Scene_Title[_0x2a56e3(0x266)]=VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x3f7)]['MenuLayout'][_0x2a56e3(0x7b7)][_0x2a56e3(0x38d)],Scene_Title[_0x2a56e3(0x3fa)]=VisuMZ[_0x2a56e3(0x803)]['Settings'][_0x2a56e3(0x42b)],VisuMZ[_0x2a56e3(0x803)]['Scene_Title_drawGameTitle']=Scene_Title[_0x2a56e3(0x948)]['drawGameTitle'],Scene_Title[_0x2a56e3(0x948)][_0x2a56e3(0x87d)]=function(){const _0x564cd2=_0x2a56e3;VisuMZ[_0x564cd2(0x803)][_0x564cd2(0x3f7)][_0x564cd2(0x8fd)][_0x564cd2(0x7b7)][_0x564cd2(0x87d)]['call'](this);if(Scene_Title[_0x564cd2(0x8b5)]!==''&&Scene_Title[_0x564cd2(0x8b5)]!==_0x564cd2(0x5a1))this['drawGameSubtitle']();if(Scene_Title[_0x564cd2(0x266)]!==''&&Scene_Title[_0x564cd2(0x266)]!=='0.00')this['drawGameVersion']();},Scene_Title[_0x2a56e3(0x948)][_0x2a56e3(0x855)]=function(){const _0x120606=_0x2a56e3;VisuMZ[_0x120606(0x803)][_0x120606(0x3f7)]['MenuLayout'][_0x120606(0x7b7)][_0x120606(0x855)][_0x120606(0x697)](this);},Scene_Title[_0x2a56e3(0x948)]['drawGameVersion']=function(){const _0x3e81a4=_0x2a56e3;VisuMZ[_0x3e81a4(0x803)][_0x3e81a4(0x3f7)][_0x3e81a4(0x8fd)][_0x3e81a4(0x7b7)][_0x3e81a4(0x3ae)][_0x3e81a4(0x697)](this);},Scene_Title[_0x2a56e3(0x948)]['createCommandWindow']=function(){const _0x44128d=_0x2a56e3;this[_0x44128d(0x647)]();const _0x129aca=$dataSystem[_0x44128d(0x5be)][_0x44128d(0x27a)],_0x7f00a2=this['commandWindowRect']();this[_0x44128d(0x96f)]=new Window_TitleCommand(_0x7f00a2),this[_0x44128d(0x96f)]['setBackgroundType'](_0x129aca);const _0x7c61b2=this[_0x44128d(0x406)]();this['_commandWindow'][_0x44128d(0x8ea)](_0x7c61b2['x'],_0x7c61b2['y'],_0x7c61b2['width'],_0x7c61b2['height']),this[_0x44128d(0x25b)](this[_0x44128d(0x96f)]);},Scene_Title[_0x2a56e3(0x948)][_0x2a56e3(0x3fd)]=function(){const _0x4c0cf8=_0x2a56e3;return this[_0x4c0cf8(0x96f)]?this['_commandWindow'][_0x4c0cf8(0x571)]():VisuMZ['CoreEngine'][_0x4c0cf8(0x3f7)][_0x4c0cf8(0x664)][_0x4c0cf8(0x9b5)];},Scene_Title[_0x2a56e3(0x948)][_0x2a56e3(0x406)]=function(){const _0x2d9f4d=_0x2a56e3;return VisuMZ[_0x2d9f4d(0x803)][_0x2d9f4d(0x3f7)][_0x2d9f4d(0x8fd)][_0x2d9f4d(0x7b7)][_0x2d9f4d(0x37e)][_0x2d9f4d(0x697)](this);},Scene_Title['prototype'][_0x2a56e3(0x647)]=function(){for(const _0x2a0a9 of Scene_Title['pictureButtons']){const _0x72768e=new Sprite_TitlePictureButton(_0x2a0a9);this['addChild'](_0x72768e);}},VisuMZ[_0x2a56e3(0x803)]['Scene_Map_initialize']=Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x14c)],Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x14c)]=function(){const _0x52fb68=_0x2a56e3;VisuMZ[_0x52fb68(0x803)][_0x52fb68(0x4d8)][_0x52fb68(0x697)](this),$gameTemp[_0x52fb68(0x732)](),this['clearOnceParallelInterpreters']();},VisuMZ['CoreEngine']['Scene_Map_updateMainMultiply']=Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x25c)],Scene_Map['prototype']['updateMainMultiply']=function(){const _0x508af5=_0x2a56e3;VisuMZ[_0x508af5(0x803)]['Scene_Map_updateMainMultiply']['call'](this),$gameTemp[_0x508af5(0x97c)]&&!$gameMessage[_0x508af5(0x7e1)]()&&(this[_0x508af5(0x194)](),SceneManager[_0x508af5(0x883)]());},Scene_Map['prototype'][_0x2a56e3(0x2b4)]=function(){const _0x15a1f4=_0x2a56e3;Scene_Message[_0x15a1f4(0x948)][_0x15a1f4(0x2b4)][_0x15a1f4(0x697)](this),!SceneManager[_0x15a1f4(0x174)](Scene_Battle)&&(this[_0x15a1f4(0x482)][_0x15a1f4(0x1cd)](),this[_0x15a1f4(0x370)][_0x15a1f4(0x942)](),this[_0x15a1f4(0x733)]['visible']=![],SceneManager[_0x15a1f4(0x580)]()),$gameScreen[_0x15a1f4(0x501)](),this[_0x15a1f4(0x6b4)]();},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x374)]=Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x830)],Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x830)]=function(){const _0x49026b=_0x2a56e3;VisuMZ[_0x49026b(0x803)][_0x49026b(0x374)]['call'](this);if(SceneManager[_0x49026b(0x45e)]()){if(_0x49026b(0x807)===_0x49026b(0x904)){if(_0x1f6f85[_0x49026b(0x7f4)]())_0x48aa5c[_0x49026b(0x68a)](_0x543445);}else this[_0x49026b(0x8e8)]();}},Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x8e8)]=function(){const _0x17a180=_0x2a56e3;this[_0x17a180(0x6eb)]['x']=Graphics[_0x17a180(0x3dd)]+0x4;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x6f9)]=Scene_Map['prototype'][_0x2a56e3(0x367)],Scene_Map[_0x2a56e3(0x948)]['updateScene']=function(){const _0x327e84=_0x2a56e3;VisuMZ[_0x327e84(0x803)]['Scene_Map_updateScene'][_0x327e84(0x697)](this),this[_0x327e84(0x67e)]();},Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x67e)]=function(){const _0xaaf6b=_0x2a56e3;Input[_0xaaf6b(0x350)](_0xaaf6b(0x6be))&&(ConfigManager[_0xaaf6b(0x68e)]=!ConfigManager[_0xaaf6b(0x68e)],ConfigManager['save']());},VisuMZ[_0x2a56e3(0x803)]['Scene_Map_updateMain']=Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x194)],Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x194)]=function(){const _0x334168=_0x2a56e3;VisuMZ['CoreEngine'][_0x334168(0x175)][_0x334168(0x697)](this),this[_0x334168(0x62a)]();},Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x6b4)]=function(){this['_onceParallelInterpreters']=[];},Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x62a)]=function(){const _0x4d7298=_0x2a56e3;if(!this[_0x4d7298(0x657)])return;for(const _0x1750de of this[_0x4d7298(0x657)]){_0x4d7298(0x7bc)===_0x4d7298(0x72e)?(_0x2da59a['CoreEngine'][_0x4d7298(0x28d)]['call'](this,_0x77a0c9,_0x207f6d,_0x534e6e,_0x58f106,_0x58477b,_0x26ef9b,_0x13e13e),this[_0x4d7298(0x7e6)]()):_0x1750de&&_0x1750de[_0x4d7298(0x1cd)]();}},Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x85d)]=function(_0x509887){const _0x52d8ad=_0x2a56e3,_0x58b995=$dataCommonEvents[_0x509887];if(!_0x58b995)return;const _0x1cffad=new Game_OnceParallelInterpreter();this[_0x52d8ad(0x2aa)](_0x1cffad),_0x1cffad[_0x52d8ad(0x344)](_0x509887);},Scene_Map[_0x2a56e3(0x948)]['addOnceParallelInterpreter']=function(_0x5617c6){const _0x2a5bb5=_0x2a56e3;this[_0x2a5bb5(0x657)]=this[_0x2a5bb5(0x657)]||[],this['_onceParallelInterpreters'][_0x2a5bb5(0x487)](_0x5617c6);},Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x323)]=function(_0x2218f6){const _0x583ab2=_0x2a56e3;this[_0x583ab2(0x657)]=this[_0x583ab2(0x657)]||[],this['_onceParallelInterpreters'][_0x583ab2(0x738)](_0x2218f6);};function Game_OnceParallelInterpreter(){const _0x537ce1=_0x2a56e3;this[_0x537ce1(0x14c)](...arguments);}Game_OnceParallelInterpreter['prototype']=Object[_0x2a56e3(0x3ab)](Game_Interpreter[_0x2a56e3(0x948)]),Game_OnceParallelInterpreter[_0x2a56e3(0x948)][_0x2a56e3(0x34f)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype'][_0x2a56e3(0x344)]=function(_0x3e08df){const _0x4a2dec=_0x2a56e3,_0x47a372=$dataCommonEvents[_0x3e08df];if(_0x47a372){if('eWZHa'===_0x4a2dec(0x659))return this[_0x4a2dec(0x97a)]&&this['_scene'][_0x4a2dec(0x34f)]===_0x52a7a2;else this[_0x4a2dec(0x5d4)](_0x47a372[_0x4a2dec(0x327)],0x0);}else _0x4a2dec(0x543)===_0x4a2dec(0x1cf)?this[_0x4a2dec(0x38c)]():this[_0x4a2dec(0x2b4)]();},Game_OnceParallelInterpreter[_0x2a56e3(0x948)][_0x2a56e3(0x2b4)]=function(){const _0x4128e5=_0x2a56e3;if(!SceneManager[_0x4128e5(0x47a)]())return;SceneManager[_0x4128e5(0x97a)][_0x4128e5(0x323)](this),Game_Interpreter[_0x4128e5(0x948)][_0x4128e5(0x2b4)][_0x4128e5(0x697)](this);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x831)]=Scene_MenuBase[_0x2a56e3(0x948)]['helpAreaTop'],Scene_MenuBase[_0x2a56e3(0x948)]['helpAreaTop']=function(){const _0x4dbde8=_0x2a56e3;let _0x21c156=0x0;return SceneManager[_0x4dbde8(0x3e1)]()?_0x21c156=this[_0x4dbde8(0x9ba)]():_0x21c156=VisuMZ[_0x4dbde8(0x803)][_0x4dbde8(0x831)][_0x4dbde8(0x697)](this),this[_0x4dbde8(0x1da)]()&&this[_0x4dbde8(0x283)]()===_0x4dbde8(0x9a0)&&(_0x21c156+=Window_ButtonAssist[_0x4dbde8(0x948)]['lineHeight']()),_0x21c156;},Scene_MenuBase[_0x2a56e3(0x948)][_0x2a56e3(0x9ba)]=function(){const _0x5216bf=_0x2a56e3;if(this[_0x5216bf(0x99a)]())return this[_0x5216bf(0x1b4)]();else{if('qMZtf'!=='ZcaFh')return 0x0;else this['smoothSelect'](this[_0x5216bf(0x571)]()-0x1);}},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x61f)]=Scene_MenuBase[_0x2a56e3(0x948)][_0x2a56e3(0x414)],Scene_MenuBase['prototype'][_0x2a56e3(0x414)]=function(){const _0x10d789=_0x2a56e3;if(SceneManager[_0x10d789(0x3e1)]())return this['mainAreaTopSideButtonLayout']();else{if('oMdyD'===_0x10d789(0x50e))return VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaTop']['call'](this);else _0x37d4cd[_0x10d789(0x803)]['loadMapData'](_0x497821);}},Scene_MenuBase[_0x2a56e3(0x948)][_0x2a56e3(0x8be)]=function(){const _0x270c9b=_0x2a56e3;if(!this['isBottomHelpMode']()){if(_0x270c9b(0x769)!==_0x270c9b(0x769)){const _0x25252b=_0x3550b6[_0x270c9b(0x37d)];if(_0x25252b===0x1&&this[_0x270c9b(0x27d)]()[_0x270c9b(0x5d6)]()!==0x1)this[_0x270c9b(0x569)]();else _0x25252b===0x2&&this[_0x270c9b(0x27d)]()[_0x270c9b(0x8b8)]()!==0x2?this[_0x270c9b(0x1df)]():this['setSkill'](_0x25252b);}else return this[_0x270c9b(0x767)]();}else{if(_0x270c9b(0x586)!=='mApxc')_0x586a38['keyMapper'][0x57]='up',_0x3b9c06[_0x270c9b(0x54b)][0x41]=_0x270c9b(0x58e),_0x49df67['keyMapper'][0x53]=_0x270c9b(0x882),_0x5bf3c5[_0x270c9b(0x54b)][0x44]=_0x270c9b(0x179),_0x34fc70['keyMapper'][0x45]=_0x270c9b(0x465);else return 0x0;}},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x285)]=Scene_MenuBase[_0x2a56e3(0x948)][_0x2a56e3(0x6bd)],Scene_MenuBase['prototype'][_0x2a56e3(0x6bd)]=function(){const _0x1279aa=_0x2a56e3;let _0xdfb5ca=0x0;return SceneManager[_0x1279aa(0x3e1)]()?_0xdfb5ca=this[_0x1279aa(0x66e)]():_0xdfb5ca=VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaHeight']['call'](this),this[_0x1279aa(0x1da)]()&&this['getButtonAssistLocation']()!==_0x1279aa(0x879)&&(_0xdfb5ca-=Window_ButtonAssist[_0x1279aa(0x948)][_0x1279aa(0x5c9)]()),_0xdfb5ca;},Scene_MenuBase[_0x2a56e3(0x948)][_0x2a56e3(0x66e)]=function(){const _0x50aede=_0x2a56e3;return Graphics[_0x50aede(0x662)]-this[_0x50aede(0x998)]();},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x536)]=Scene_MenuBase['prototype'][_0x2a56e3(0x656)],Scene_MenuBase[_0x2a56e3(0x948)][_0x2a56e3(0x656)]=function(){const _0x49d5ae=_0x2a56e3;this[_0x49d5ae(0x15a)]=new PIXI['filters'][(_0x49d5ae(0x275))](clamp=!![]),this[_0x49d5ae(0x877)]=new Sprite(),this[_0x49d5ae(0x877)][_0x49d5ae(0x65e)]=SceneManager[_0x49d5ae(0x24f)](),this[_0x49d5ae(0x877)][_0x49d5ae(0x645)]=[this[_0x49d5ae(0x15a)]],this[_0x49d5ae(0x7bb)](this[_0x49d5ae(0x877)]),this['setBackgroundOpacity'](0xc0),this[_0x49d5ae(0x41c)](this[_0x49d5ae(0x5f7)]()),this[_0x49d5ae(0x5eb)]();},Scene_MenuBase['prototype'][_0x2a56e3(0x5f7)]=function(){const _0x5933ed=_0x2a56e3,_0x41e44e=String(this[_0x5933ed(0x34f)][_0x5933ed(0x6f5)]),_0x35d1b8=this[_0x5933ed(0x3f2)](_0x41e44e);if(_0x35d1b8){if('LZAox'!==_0x5933ed(0x5ee))this[_0x5933ed(0x96f)]['setBackgroundType'](_0x49dbf6[_0x5933ed(0x7c9)][_0x5933ed(0x201)]);else return _0x35d1b8[_0x5933ed(0x897)];}else return 0xc0;},Scene_MenuBase['prototype'][_0x2a56e3(0x5eb)]=function(){const _0x13056d=_0x2a56e3,_0x4772c9=String(this[_0x13056d(0x34f)][_0x13056d(0x6f5)]),_0x2f5656=this[_0x13056d(0x3f2)](_0x4772c9);_0x2f5656&&(_0x2f5656[_0x13056d(0x7f6)]!==''||_0x2f5656['BgFilename2']!=='')&&(this[_0x13056d(0x4b1)]=new Sprite(ImageManager['loadTitle1'](_0x2f5656[_0x13056d(0x7f6)])),this[_0x13056d(0x970)]=new Sprite(ImageManager[_0x13056d(0x750)](_0x2f5656['BgFilename2'])),this[_0x13056d(0x7bb)](this['_backSprite1']),this['addChild'](this[_0x13056d(0x970)]),this[_0x13056d(0x4b1)][_0x13056d(0x65e)][_0x13056d(0x458)](this['adjustSprite']['bind'](this,this[_0x13056d(0x4b1)])),this[_0x13056d(0x970)]['bitmap'][_0x13056d(0x458)](this[_0x13056d(0x3a7)][_0x13056d(0x63d)](this,this[_0x13056d(0x970)])));},Scene_MenuBase[_0x2a56e3(0x948)]['getCustomBackgroundSettings']=function(_0x31edd1){const _0xbeab10=_0x2a56e3;return VisuMZ[_0xbeab10(0x803)]['Settings'][_0xbeab10(0x6f1)][_0x31edd1]||VisuMZ[_0xbeab10(0x803)]['Settings'][_0xbeab10(0x6f1)][_0xbeab10(0x20d)];},Scene_MenuBase[_0x2a56e3(0x948)]['adjustSprite']=function(_0x31160c){const _0x795c38=_0x2a56e3;this[_0x795c38(0x761)](_0x31160c),this[_0x795c38(0x8c3)](_0x31160c);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x19c)]=Scene_MenuBase['prototype'][_0x2a56e3(0x3fc)],Scene_MenuBase[_0x2a56e3(0x948)]['createCancelButton']=function(){const _0x3a1fe6=_0x2a56e3;VisuMZ['CoreEngine'][_0x3a1fe6(0x19c)]['call'](this),SceneManager['isSideButtonLayout']()&&(_0x3a1fe6(0x2a0)!==_0x3a1fe6(0x477)?this[_0x3a1fe6(0x842)]():_0x1554fa[_0x3a1fe6(0x250)]?this[_0x3a1fe6(0x6d1)]=_0x5e57be[_0x3a1fe6(0x250)]():this['backOpacity']=_0x513191[_0x3a1fe6(0x803)][_0x3a1fe6(0x3f7)]['Window'][_0x3a1fe6(0x804)]);},Scene_MenuBase['prototype'][_0x2a56e3(0x842)]=function(){const _0x2bf0e1=_0x2a56e3;this['_cancelButton']['x']=Graphics[_0x2bf0e1(0x3dd)]+0x4;},VisuMZ['CoreEngine'][_0x2a56e3(0x3a5)]=Scene_MenuBase[_0x2a56e3(0x948)][_0x2a56e3(0x9a9)],Scene_MenuBase[_0x2a56e3(0x948)]['createPageButtons']=function(){const _0x13ab2b=_0x2a56e3;VisuMZ[_0x13ab2b(0x803)][_0x13ab2b(0x3a5)]['call'](this),SceneManager[_0x13ab2b(0x45e)]()&&this[_0x13ab2b(0x502)]();},Scene_MenuBase[_0x2a56e3(0x948)][_0x2a56e3(0x502)]=function(){const _0x549690=_0x2a56e3;this[_0x549690(0x809)]['x']=-0x1*(this['_pageupButton'][_0x549690(0x290)]+this[_0x549690(0x8dc)][_0x549690(0x290)]+0x8),this[_0x549690(0x8dc)]['x']=-0x1*(this[_0x549690(0x8dc)][_0x549690(0x290)]+0x4);},Scene_MenuBase['prototype']['isMenuButtonAssistEnabled']=function(){const _0x146f58=_0x2a56e3;return VisuMZ[_0x146f58(0x803)]['Settings'][_0x146f58(0x635)][_0x146f58(0x6e9)];},Scene_MenuBase['prototype'][_0x2a56e3(0x283)]=function(){const _0x14e0bf=_0x2a56e3;if(SceneManager['isSideButtonLayout']()||SceneManager[_0x14e0bf(0x55b)]())return VisuMZ[_0x14e0bf(0x803)]['Settings']['ButtonAssist']['Location'];else{if(_0x14e0bf(0x5f4)===_0x14e0bf(0x5f4))return _0x14e0bf(0x879);else{if(_0x42ef83&&_0x219e85[_0x14e0bf(0x316)]){if(this['isGamepadButtonPressed'](_0x1fa170))return!![];if(this[_0x14e0bf(0x524)](_0x51aaf7))return!![];}}}},Scene_MenuBase[_0x2a56e3(0x948)][_0x2a56e3(0x80a)]=function(){const _0x396689=_0x2a56e3;if(!this[_0x396689(0x1da)]())return;const _0x35b5c5=this[_0x396689(0x133)]();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x35b5c5),this[_0x396689(0x25b)](this[_0x396689(0x170)]);},Scene_MenuBase[_0x2a56e3(0x948)][_0x2a56e3(0x133)]=function(){const _0x1fb7b4=_0x2a56e3;return this[_0x1fb7b4(0x283)]()==='button'?this['buttonAssistWindowButtonRect']():_0x1fb7b4(0x811)!==_0x1fb7b4(0x49b)?this['buttonAssistWindowSideRect']():0x0;},Scene_MenuBase[_0x2a56e3(0x948)][_0x2a56e3(0x1c9)]=function(){const _0x322f2b=_0x2a56e3,_0x43e154=ConfigManager['touchUI']?(Sprite_Button['prototype'][_0x322f2b(0x189)]()+0x6)*0x2:0x0,_0x26b153=this['buttonY'](),_0x31fe01=Graphics[_0x322f2b(0x3dd)]-_0x43e154*0x2,_0x5e9842=this[_0x322f2b(0x9bd)]();return new Rectangle(_0x43e154,_0x26b153,_0x31fe01,_0x5e9842);},Scene_MenuBase[_0x2a56e3(0x948)][_0x2a56e3(0x7ec)]=function(){const _0x159368=_0x2a56e3,_0x328e63=Graphics[_0x159368(0x3dd)],_0x215282=Window_ButtonAssist[_0x159368(0x948)]['lineHeight'](),_0x1f2574=0x0;let _0x5e5822=0x0;return this[_0x159368(0x283)]()===_0x159368(0x9a0)?_0x159368(0x2cf)!=='TFhVy'?this['_screenX']-=_0x444556[_0x159368(0x6ad)]((_0x2a9d0b[_0x159368(0x290)]-_0x40705a[_0x159368(0x3dd)])/0x2):_0x5e5822=0x0:_0x5e5822=Graphics[_0x159368(0x662)]-_0x215282,new Rectangle(_0x1f2574,_0x5e5822,_0x328e63,_0x215282);},Scene_Menu[_0x2a56e3(0x7c9)]=VisuMZ['CoreEngine'][_0x2a56e3(0x3f7)][_0x2a56e3(0x8fd)][_0x2a56e3(0x4a4)],VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x52f)]=Scene_Menu[_0x2a56e3(0x948)][_0x2a56e3(0x3ab)],Scene_Menu['prototype'][_0x2a56e3(0x3ab)]=function(){const _0x46299e=_0x2a56e3;VisuMZ[_0x46299e(0x803)]['Scene_Menu_create'][_0x46299e(0x697)](this),this[_0x46299e(0x925)]();},Scene_Menu[_0x2a56e3(0x948)][_0x2a56e3(0x925)]=function(){const _0x498a19=_0x2a56e3;if(this['_commandWindow']){if(_0x498a19(0x49a)!==_0x498a19(0x85e))this[_0x498a19(0x96f)][_0x498a19(0x7a2)](Scene_Menu[_0x498a19(0x7c9)][_0x498a19(0x201)]);else return _0x38f601['layoutSettings'][_0x498a19(0x3f9)][_0x498a19(0x697)](this);}this[_0x498a19(0x307)]&&(_0x498a19(0x541)!==_0x498a19(0x541)?(_0x350427[_0x498a19(0x803)][_0x498a19(0x490)][_0x498a19(0x697)](this),this[_0x498a19(0x702)](),this[_0x498a19(0x4ed)]()):this[_0x498a19(0x307)][_0x498a19(0x7a2)](Scene_Menu[_0x498a19(0x7c9)]['GoldBgType'])),this['_statusWindow']&&this[_0x498a19(0x246)][_0x498a19(0x7a2)](Scene_Menu['layoutSettings']['StatusBgType']);},Scene_Menu[_0x2a56e3(0x948)][_0x2a56e3(0x406)]=function(){const _0x483a5d=_0x2a56e3;return Scene_Menu[_0x483a5d(0x7c9)][_0x483a5d(0x37e)]['call'](this);},Scene_Menu[_0x2a56e3(0x948)]['goldWindowRect']=function(){const _0x85fa67=_0x2a56e3;return Scene_Menu['layoutSettings']['GoldRect'][_0x85fa67(0x697)](this);},Scene_Menu[_0x2a56e3(0x948)][_0x2a56e3(0x949)]=function(){const _0x58f10a=_0x2a56e3;return Scene_Menu['layoutSettings'][_0x58f10a(0x221)]['call'](this);},Scene_Item[_0x2a56e3(0x7c9)]=VisuMZ['CoreEngine'][_0x2a56e3(0x3f7)][_0x2a56e3(0x8fd)][_0x2a56e3(0x6c7)],VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x8a6)]=Scene_Item['prototype']['create'],Scene_Item['prototype'][_0x2a56e3(0x3ab)]=function(){const _0x5cda48=_0x2a56e3;VisuMZ[_0x5cda48(0x803)][_0x5cda48(0x8a6)][_0x5cda48(0x697)](this),this[_0x5cda48(0x925)]();},Scene_Item['prototype'][_0x2a56e3(0x925)]=function(){const _0x1ea313=_0x2a56e3;this['_helpWindow']&&this[_0x1ea313(0x3b5)][_0x1ea313(0x7a2)](Scene_Item[_0x1ea313(0x7c9)][_0x1ea313(0x975)]),this[_0x1ea313(0x94d)]&&this[_0x1ea313(0x94d)][_0x1ea313(0x7a2)](Scene_Item['layoutSettings'][_0x1ea313(0x411)]),this[_0x1ea313(0x2b6)]&&(_0x1ea313(0x205)!==_0x1ea313(0x205)?(_0x4c0e0b+=_0x65c432+'\x0a',_0xd3f5e0+=_0x1ea313(0x3b2)[_0x1ea313(0x6ba)](_0x5b164c[_0x1ea313(0x9b6)][0x0])):this['_itemWindow'][_0x1ea313(0x7a2)](Scene_Item[_0x1ea313(0x7c9)]['ItemBgType'])),this[_0x1ea313(0x4c4)]&&this[_0x1ea313(0x4c4)][_0x1ea313(0x7a2)](Scene_Item[_0x1ea313(0x7c9)][_0x1ea313(0x71e)]);},Scene_Item[_0x2a56e3(0x948)][_0x2a56e3(0x474)]=function(){const _0x4682a2=_0x2a56e3;return Scene_Item['layoutSettings']['HelpRect'][_0x4682a2(0x697)](this);},Scene_Item[_0x2a56e3(0x948)][_0x2a56e3(0x753)]=function(){const _0x530694=_0x2a56e3;return Scene_Item[_0x530694(0x7c9)][_0x530694(0x542)][_0x530694(0x697)](this);},Scene_Item[_0x2a56e3(0x948)][_0x2a56e3(0x235)]=function(){const _0x3ffc5e=_0x2a56e3;return Scene_Item[_0x3ffc5e(0x7c9)][_0x3ffc5e(0x3f9)][_0x3ffc5e(0x697)](this);},Scene_Item[_0x2a56e3(0x948)][_0x2a56e3(0x80e)]=function(){const _0x5b7577=_0x2a56e3;return Scene_Item['layoutSettings'][_0x5b7577(0x18e)][_0x5b7577(0x697)](this);},Scene_Skill[_0x2a56e3(0x7c9)]=VisuMZ['CoreEngine']['Settings'][_0x2a56e3(0x8fd)]['SkillMenu'],VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x5a8)]=Scene_Skill[_0x2a56e3(0x948)][_0x2a56e3(0x3ab)],Scene_Skill[_0x2a56e3(0x948)]['create']=function(){const _0x122a1d=_0x2a56e3;VisuMZ[_0x122a1d(0x803)]['Scene_Skill_create'][_0x122a1d(0x697)](this),this[_0x122a1d(0x925)]();},Scene_Skill[_0x2a56e3(0x948)]['setCoreEngineUpdateWindowBg']=function(){const _0x29beee=_0x2a56e3;this[_0x29beee(0x3b5)]&&this['_helpWindow'][_0x29beee(0x7a2)](Scene_Skill['layoutSettings'][_0x29beee(0x975)]);if(this[_0x29beee(0x38e)]){if(_0x29beee(0x1cb)!=='iIEea')this[_0x29beee(0x38e)]['setBackgroundType'](Scene_Skill[_0x29beee(0x7c9)][_0x29beee(0x469)]);else{if(this[_0x29beee(0x472)]===_0x33d133)this[_0x29beee(0x2d6)]();if(this[_0x29beee(0x472)][_0x29beee(0x961)]===_0x306041)this[_0x29beee(0x75f)]();this['_CoreEngineSettings'][_0x29beee(0x961)]=_0x509acc;}}if(this[_0x29beee(0x246)]){if(_0x29beee(0x3d9)!==_0x29beee(0x401))this[_0x29beee(0x246)]['setBackgroundType'](Scene_Skill[_0x29beee(0x7c9)][_0x29beee(0x366)]);else return _0x9fc064[_0x29beee(0x595)]()-0x8;}this[_0x29beee(0x2b6)]&&(_0x29beee(0x600)===_0x29beee(0x311)?_0x435a86=_0x69d375[_0x29beee(0x803)][_0x29beee(0x285)][_0x29beee(0x697)](this):this['_itemWindow'][_0x29beee(0x7a2)](Scene_Skill[_0x29beee(0x7c9)]['ItemBgType']));if(this[_0x29beee(0x4c4)]){if('doUjx'!=='lYisI')this[_0x29beee(0x4c4)]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x29beee(0x71e)]);else{const _0x3abadb=this['index']();_0x300a2b['isTriggered'](_0x29beee(0x9a8))&&this[_0x29beee(0x317)](_0x4d10b4[_0x29beee(0x4c9)](this['index'](),0x0)),_0x1395ed['isTriggered']('end')&&this['smoothSelect'](_0xae8285[_0x29beee(0x81b)](this[_0x29beee(0x125)](),this[_0x29beee(0x571)]()-0x1)),this['index']()!==_0x3abadb&&this[_0x29beee(0x2f5)]();}}},Scene_Skill[_0x2a56e3(0x948)][_0x2a56e3(0x474)]=function(){const _0x5e5ab5=_0x2a56e3;return Scene_Skill['layoutSettings'][_0x5e5ab5(0x999)][_0x5e5ab5(0x697)](this);},Scene_Skill[_0x2a56e3(0x948)][_0x2a56e3(0x3a3)]=function(){const _0xe4889c=_0x2a56e3;return Scene_Skill[_0xe4889c(0x7c9)][_0xe4889c(0x384)][_0xe4889c(0x697)](this);},Scene_Skill[_0x2a56e3(0x948)][_0x2a56e3(0x949)]=function(){const _0x24a94b=_0x2a56e3;return Scene_Skill[_0x24a94b(0x7c9)][_0x24a94b(0x221)][_0x24a94b(0x697)](this);},Scene_Skill[_0x2a56e3(0x948)][_0x2a56e3(0x235)]=function(){const _0x2872a9=_0x2a56e3;return Scene_Skill['layoutSettings'][_0x2872a9(0x3f9)]['call'](this);},Scene_Skill[_0x2a56e3(0x948)][_0x2a56e3(0x80e)]=function(){const _0x416e68=_0x2a56e3;return Scene_Skill[_0x416e68(0x7c9)][_0x416e68(0x18e)][_0x416e68(0x697)](this);},Scene_Equip['layoutSettings']=VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x3f7)][_0x2a56e3(0x8fd)][_0x2a56e3(0x4a9)],VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x3a8)]=Scene_Equip[_0x2a56e3(0x948)][_0x2a56e3(0x3ab)],Scene_Equip[_0x2a56e3(0x948)][_0x2a56e3(0x3ab)]=function(){const _0x38d64c=_0x2a56e3;VisuMZ['CoreEngine'][_0x38d64c(0x3a8)][_0x38d64c(0x697)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip[_0x2a56e3(0x948)][_0x2a56e3(0x925)]=function(){const _0x1a3409=_0x2a56e3;if(this['_helpWindow']){if(_0x1a3409(0x485)==='ZIrOR')this[_0x1a3409(0x3b5)][_0x1a3409(0x7a2)](Scene_Equip[_0x1a3409(0x7c9)][_0x1a3409(0x975)]);else{if(this[_0x1a3409(0x472)]===_0x2da7eb)this[_0x1a3409(0x2d6)]();this['_CoreEngineSettings']['BattleSystem']=this[_0x1a3409(0x306)]();}}this[_0x1a3409(0x246)]&&(_0x1a3409(0x6ee)!==_0x1a3409(0x6ee)?_0x51601b[_0x1a3409(0x803)]['Window_Gold_refresh'][_0x1a3409(0x697)](this):this[_0x1a3409(0x246)][_0x1a3409(0x7a2)](Scene_Equip[_0x1a3409(0x7c9)]['StatusBgType']));this[_0x1a3409(0x96f)]&&this[_0x1a3409(0x96f)][_0x1a3409(0x7a2)](Scene_Equip[_0x1a3409(0x7c9)][_0x1a3409(0x201)]);if(this['_slotWindow']){if(_0x1a3409(0x129)!==_0x1a3409(0x129))return _0x462e6b[_0x1a3409(0x803)][_0x1a3409(0x13f)][_0x1a3409(0x697)](this);else this['_slotWindow']['setBackgroundType'](Scene_Equip['layoutSettings']['SlotBgType']);}if(this['_itemWindow']){if(_0x1a3409(0x587)!==_0x1a3409(0x5b5))this[_0x1a3409(0x2b6)][_0x1a3409(0x7a2)](Scene_Equip['layoutSettings']['ItemBgType']);else{if(_0x3ea3a8[_0x1a3409(0x76d)](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x29283a['match'](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0xe06f0a[_0x1a3409(0x76d)](/escape/i))return this[_0x1a3409(0x71c)]===0x1b;}}},Scene_Equip['prototype'][_0x2a56e3(0x474)]=function(){const _0x516ecc=_0x2a56e3;return Scene_Equip[_0x516ecc(0x7c9)]['HelpRect'][_0x516ecc(0x697)](this);},Scene_Equip[_0x2a56e3(0x948)][_0x2a56e3(0x949)]=function(){const _0x52558a=_0x2a56e3;return Scene_Equip['layoutSettings'][_0x52558a(0x221)][_0x52558a(0x697)](this);},Scene_Equip['prototype']['commandWindowRect']=function(){const _0x2b5264=_0x2a56e3;return Scene_Equip[_0x2b5264(0x7c9)][_0x2b5264(0x37e)][_0x2b5264(0x697)](this);},Scene_Equip[_0x2a56e3(0x948)]['slotWindowRect']=function(){const _0x18b574=_0x2a56e3;return Scene_Equip[_0x18b574(0x7c9)][_0x18b574(0x91c)]['call'](this);},Scene_Equip[_0x2a56e3(0x948)][_0x2a56e3(0x235)]=function(){const _0x2813a9=_0x2a56e3;return Scene_Equip[_0x2813a9(0x7c9)][_0x2813a9(0x3f9)][_0x2813a9(0x697)](this);},Scene_Status[_0x2a56e3(0x7c9)]=VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x3f7)][_0x2a56e3(0x8fd)][_0x2a56e3(0x402)],VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x381)]=Scene_Status[_0x2a56e3(0x948)][_0x2a56e3(0x3ab)],Scene_Status[_0x2a56e3(0x948)]['create']=function(){const _0x5de716=_0x2a56e3;VisuMZ['CoreEngine'][_0x5de716(0x381)][_0x5de716(0x697)](this),this[_0x5de716(0x925)]();},Scene_Status[_0x2a56e3(0x948)]['setCoreEngineUpdateWindowBg']=function(){const _0x17122f=_0x2a56e3;if(this[_0x17122f(0x3c2)]){if(_0x17122f(0x545)!==_0x17122f(0x545))return _0x11dc7e['buttonAssistCancel'];else this[_0x17122f(0x3c2)][_0x17122f(0x7a2)](Scene_Status['layoutSettings']['ProfileBgType']);}this['_statusWindow']&&this['_statusWindow'][_0x17122f(0x7a2)](Scene_Status['layoutSettings'][_0x17122f(0x366)]),this[_0x17122f(0x730)]&&this[_0x17122f(0x730)]['setBackgroundType'](Scene_Status[_0x17122f(0x7c9)][_0x17122f(0x5ad)]),this['_statusEquipWindow']&&this[_0x17122f(0x791)][_0x17122f(0x7a2)](Scene_Status[_0x17122f(0x7c9)][_0x17122f(0x65a)]);},Scene_Status['prototype'][_0x2a56e3(0x57d)]=function(){const _0x179a1c=_0x2a56e3;return Scene_Status[_0x179a1c(0x7c9)][_0x179a1c(0x6ce)][_0x179a1c(0x697)](this);},Scene_Status[_0x2a56e3(0x948)][_0x2a56e3(0x949)]=function(){const _0x12962b=_0x2a56e3;return Scene_Status[_0x12962b(0x7c9)][_0x12962b(0x221)][_0x12962b(0x697)](this);},Scene_Status[_0x2a56e3(0x948)][_0x2a56e3(0x447)]=function(){const _0x4dd4e7=_0x2a56e3;return Scene_Status[_0x4dd4e7(0x7c9)][_0x4dd4e7(0x144)]['call'](this);},Scene_Status['prototype'][_0x2a56e3(0x30a)]=function(){const _0x616a7f=_0x2a56e3;return Scene_Status[_0x616a7f(0x7c9)][_0x616a7f(0x315)][_0x616a7f(0x697)](this);},Scene_Options[_0x2a56e3(0x7c9)]=VisuMZ[_0x2a56e3(0x803)]['Settings'][_0x2a56e3(0x8fd)]['OptionsMenu'],VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x160)]=Scene_Options['prototype'][_0x2a56e3(0x3ab)],Scene_Options['prototype'][_0x2a56e3(0x3ab)]=function(){const _0x1646ff=_0x2a56e3;VisuMZ['CoreEngine']['Scene_Options_create'][_0x1646ff(0x697)](this),this[_0x1646ff(0x925)]();},Scene_Options[_0x2a56e3(0x948)][_0x2a56e3(0x925)]=function(){const _0x2963e8=_0x2a56e3;this[_0x2963e8(0x95b)]&&this['_optionsWindow'][_0x2963e8(0x7a2)](Scene_Options[_0x2963e8(0x7c9)][_0x2963e8(0x94f)]);},Scene_Options[_0x2a56e3(0x948)][_0x2a56e3(0x7f7)]=function(){const _0x5dad73=_0x2a56e3;return Scene_Options[_0x5dad73(0x7c9)][_0x5dad73(0x6e8)][_0x5dad73(0x697)](this);},Scene_Save[_0x2a56e3(0x7c9)]=VisuMZ['CoreEngine'][_0x2a56e3(0x3f7)][_0x2a56e3(0x8fd)]['SaveMenu'],Scene_Save[_0x2a56e3(0x948)][_0x2a56e3(0x3ab)]=function(){const _0xeabfb2=_0x2a56e3;Scene_File[_0xeabfb2(0x948)][_0xeabfb2(0x3ab)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save[_0x2a56e3(0x948)][_0x2a56e3(0x925)]=function(){const _0x5bc813=_0x2a56e3;this[_0x5bc813(0x3b5)]&&this['_helpWindow'][_0x5bc813(0x7a2)](Scene_Save[_0x5bc813(0x7c9)][_0x5bc813(0x975)]);if(this[_0x5bc813(0x6c2)]){if(_0x5bc813(0x4cf)==='MtvWK'){_0x10991b['CoreEngine'][_0x5bc813(0x3f7)][_0x5bc813(0x2fc)]['FontSmoothing']&&(_0x53ba4b[_0x5bc813(0x2f8)]['font-smooth']='none');_0x458fa2[_0x5bc813(0x803)]['Settings'][_0x5bc813(0x2fc)][_0x5bc813(0x48c)]&&(_0x1a06c4[_0x5bc813(0x2f8)]['image-rendering']='pixelated');const _0x424018=_0x3c0781[_0x5bc813(0x81b)](0x0,_0x28961f[_0x5bc813(0x6ad)](_0x39beb8[_0x5bc813(0x290)]*this[_0x5bc813(0x8b9)])),_0x18dcdd=_0xef82c8[_0x5bc813(0x81b)](0x0,_0x48a77e['floor'](_0x1763a4[_0x5bc813(0x8c0)]*this[_0x5bc813(0x8b9)]));_0x4d5384[_0x5bc813(0x2f8)]['width']=_0x424018+'px',_0x528494[_0x5bc813(0x2f8)][_0x5bc813(0x8c0)]=_0x18dcdd+'px';}else this[_0x5bc813(0x6c2)][_0x5bc813(0x7a2)](Scene_Save['layoutSettings']['ListBgType']);}},Scene_Save['prototype'][_0x2a56e3(0x474)]=function(){const _0x2f5567=_0x2a56e3;return Scene_Save[_0x2f5567(0x7c9)]['HelpRect'][_0x2f5567(0x697)](this);},Scene_Save[_0x2a56e3(0x948)][_0x2a56e3(0x5ac)]=function(){const _0x84bc8a=_0x2a56e3;return Scene_Save[_0x84bc8a(0x7c9)][_0x84bc8a(0x856)]['call'](this);},Scene_Load[_0x2a56e3(0x7c9)]=VisuMZ['CoreEngine'][_0x2a56e3(0x3f7)][_0x2a56e3(0x8fd)][_0x2a56e3(0x544)],Scene_Load['prototype']['create']=function(){const _0x460c8a=_0x2a56e3;Scene_File['prototype']['create'][_0x460c8a(0x697)](this),this[_0x460c8a(0x925)]();},Scene_Load[_0x2a56e3(0x948)][_0x2a56e3(0x925)]=function(){const _0x1924b1=_0x2a56e3;this[_0x1924b1(0x3b5)]&&('bYoPw'===_0x1924b1(0x82c)?_0x6cc14d[_0x1924b1(0x673)](_0x10eb8b,_0x50bb42):this[_0x1924b1(0x3b5)][_0x1924b1(0x7a2)](Scene_Load[_0x1924b1(0x7c9)]['HelpBgType'])),this[_0x1924b1(0x6c2)]&&this[_0x1924b1(0x6c2)][_0x1924b1(0x7a2)](Scene_Load[_0x1924b1(0x7c9)][_0x1924b1(0x38b)]);},Scene_Load[_0x2a56e3(0x948)][_0x2a56e3(0x474)]=function(){const _0x3d7c83=_0x2a56e3;return Scene_Load[_0x3d7c83(0x7c9)]['HelpRect'][_0x3d7c83(0x697)](this);},Scene_Load[_0x2a56e3(0x948)][_0x2a56e3(0x5ac)]=function(){const _0x58623c=_0x2a56e3;return Scene_Load[_0x58623c(0x7c9)][_0x58623c(0x856)]['call'](this);},Scene_GameEnd[_0x2a56e3(0x7c9)]=VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x3f7)][_0x2a56e3(0x8fd)][_0x2a56e3(0x6af)],VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x666)]=Scene_GameEnd['prototype']['createBackground'],Scene_GameEnd['prototype'][_0x2a56e3(0x656)]=function(){const _0x553f6f=_0x2a56e3;Scene_MenuBase[_0x553f6f(0x948)]['createBackground'][_0x553f6f(0x697)](this);},Scene_GameEnd['prototype'][_0x2a56e3(0x73b)]=function(){const _0x15910a=_0x2a56e3,_0x90c560=this[_0x15910a(0x406)]();this[_0x15910a(0x96f)]=new Window_GameEnd(_0x90c560),this[_0x15910a(0x96f)][_0x15910a(0x137)](_0x15910a(0x71b),this[_0x15910a(0x35b)][_0x15910a(0x63d)](this)),this[_0x15910a(0x25b)](this[_0x15910a(0x96f)]),this[_0x15910a(0x96f)]['setBackgroundType'](Scene_GameEnd[_0x15910a(0x7c9)][_0x15910a(0x201)]);},Scene_GameEnd[_0x2a56e3(0x948)][_0x2a56e3(0x406)]=function(){const _0x5a2d14=_0x2a56e3;return Scene_GameEnd[_0x5a2d14(0x7c9)]['CommandRect'][_0x5a2d14(0x697)](this);},Scene_Shop['layoutSettings']=VisuMZ[_0x2a56e3(0x803)]['Settings'][_0x2a56e3(0x8fd)][_0x2a56e3(0x729)],VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x63a)]=Scene_Shop[_0x2a56e3(0x948)][_0x2a56e3(0x3ab)],Scene_Shop[_0x2a56e3(0x948)][_0x2a56e3(0x3ab)]=function(){const _0x5a44e0=_0x2a56e3;VisuMZ[_0x5a44e0(0x803)][_0x5a44e0(0x63a)][_0x5a44e0(0x697)](this),this[_0x5a44e0(0x925)]();},Scene_Shop[_0x2a56e3(0x948)][_0x2a56e3(0x925)]=function(){const _0x4c3f1e=_0x2a56e3;this['_helpWindow']&&this[_0x4c3f1e(0x3b5)][_0x4c3f1e(0x7a2)](Scene_Shop[_0x4c3f1e(0x7c9)][_0x4c3f1e(0x975)]);if(this[_0x4c3f1e(0x307)]){if('szEjn'!==_0x4c3f1e(0x79d))return _0xf7b349[_0x4c3f1e(0x948)][_0x4c3f1e(0x207)][_0x4c3f1e(0x697)](this);else this['_goldWindow'][_0x4c3f1e(0x7a2)](Scene_Shop[_0x4c3f1e(0x7c9)]['GoldBgType']);}if(this[_0x4c3f1e(0x96f)]){if('opKrM'!==_0x4c3f1e(0x977))return _0x3f31a1(_0x6e482e)['toLocaleString'](_0x220aa7,_0xf542d3);else this[_0x4c3f1e(0x96f)]['setBackgroundType'](Scene_Shop[_0x4c3f1e(0x7c9)][_0x4c3f1e(0x201)]);}if(this[_0x4c3f1e(0x6ae)]){if(_0x4c3f1e(0x946)===_0x4c3f1e(0x946))this[_0x4c3f1e(0x6ae)][_0x4c3f1e(0x7a2)](Scene_Shop[_0x4c3f1e(0x7c9)][_0x4c3f1e(0x4fb)]);else{var _0x5b312b=_0x5c5cd1-2.625/2.75;return 7.5625*_0x5b312b*_0x5b312b+0.984375;}}if(this[_0x4c3f1e(0x5b9)]){if(_0x4c3f1e(0x84d)===_0x4c3f1e(0x84d))this[_0x4c3f1e(0x5b9)][_0x4c3f1e(0x7a2)](Scene_Shop[_0x4c3f1e(0x7c9)]['NumberBgType']);else return'ETB';}this[_0x4c3f1e(0x246)]&&this[_0x4c3f1e(0x246)][_0x4c3f1e(0x7a2)](Scene_Shop['layoutSettings']['StatusBgType']),this[_0x4c3f1e(0x6aa)]&&this['_buyWindow'][_0x4c3f1e(0x7a2)](Scene_Shop[_0x4c3f1e(0x7c9)]['BuyBgType']),this[_0x4c3f1e(0x94d)]&&this[_0x4c3f1e(0x94d)]['setBackgroundType'](Scene_Shop[_0x4c3f1e(0x7c9)][_0x4c3f1e(0x411)]),this[_0x4c3f1e(0x99f)]&&this[_0x4c3f1e(0x99f)]['setBackgroundType'](Scene_Shop[_0x4c3f1e(0x7c9)]['SellBgType']);},Scene_Shop['prototype'][_0x2a56e3(0x474)]=function(){const _0x1a9012=_0x2a56e3;return Scene_Shop[_0x1a9012(0x7c9)][_0x1a9012(0x999)]['call'](this);},Scene_Shop[_0x2a56e3(0x948)][_0x2a56e3(0x938)]=function(){const _0x31fd64=_0x2a56e3;return Scene_Shop[_0x31fd64(0x7c9)][_0x31fd64(0x348)][_0x31fd64(0x697)](this);},Scene_Shop[_0x2a56e3(0x948)][_0x2a56e3(0x406)]=function(){const _0x5734d2=_0x2a56e3;return Scene_Shop[_0x5734d2(0x7c9)]['CommandRect'][_0x5734d2(0x697)](this);},Scene_Shop[_0x2a56e3(0x948)][_0x2a56e3(0x6d3)]=function(){const _0x229525=_0x2a56e3;return Scene_Shop[_0x229525(0x7c9)][_0x229525(0x2a9)][_0x229525(0x697)](this);},Scene_Shop[_0x2a56e3(0x948)][_0x2a56e3(0x90b)]=function(){const _0x27980b=_0x2a56e3;return Scene_Shop['layoutSettings'][_0x27980b(0x806)]['call'](this);},Scene_Shop['prototype'][_0x2a56e3(0x949)]=function(){const _0x55a05a=_0x2a56e3;return Scene_Shop[_0x55a05a(0x7c9)][_0x55a05a(0x221)][_0x55a05a(0x697)](this);},Scene_Shop[_0x2a56e3(0x948)][_0x2a56e3(0x304)]=function(){const _0x15c0f0=_0x2a56e3;return Scene_Shop['layoutSettings'][_0x15c0f0(0x755)][_0x15c0f0(0x697)](this);},Scene_Shop[_0x2a56e3(0x948)][_0x2a56e3(0x753)]=function(){const _0x1bddfb=_0x2a56e3;return Scene_Shop[_0x1bddfb(0x7c9)][_0x1bddfb(0x542)][_0x1bddfb(0x697)](this);},Scene_Shop['prototype'][_0x2a56e3(0x84b)]=function(){const _0x49fc23=_0x2a56e3;return Scene_Shop[_0x49fc23(0x7c9)][_0x49fc23(0x176)]['call'](this);},Scene_Name[_0x2a56e3(0x7c9)]=VisuMZ[_0x2a56e3(0x803)]['Settings']['MenuLayout']['NameMenu'],VisuMZ['CoreEngine']['Scene_Name_create']=Scene_Name[_0x2a56e3(0x948)][_0x2a56e3(0x3ab)],Scene_Name[_0x2a56e3(0x948)][_0x2a56e3(0x3ab)]=function(){const _0x59e63e=_0x2a56e3;VisuMZ[_0x59e63e(0x803)][_0x59e63e(0x8cf)][_0x59e63e(0x697)](this),this[_0x59e63e(0x925)]();},Scene_Name[_0x2a56e3(0x948)][_0x2a56e3(0x925)]=function(){const _0x369312=_0x2a56e3;this[_0x369312(0x86d)]&&this['_editWindow'][_0x369312(0x7a2)](Scene_Name['layoutSettings']['EditBgType']);if(this[_0x369312(0x178)]){if(_0x369312(0x39f)!=='lCcAN')this[_0x369312(0x178)][_0x369312(0x7a2)](Scene_Name[_0x369312(0x7c9)]['InputBgType']);else{const _0x3fb22b=_0x369312(0x1db);this['_colorCache']=this[_0x369312(0x853)]||{};if(this[_0x369312(0x853)][_0x3fb22b])return this[_0x369312(0x853)][_0x3fb22b];const _0x52485d=_0x26c1c8['CoreEngine'][_0x369312(0x3f7)][_0x369312(0x784)][_0x369312(0x6b8)];return this['getColorDataFromPluginParameters'](_0x3fb22b,_0x52485d);}}},Scene_Name[_0x2a56e3(0x948)][_0x2a56e3(0x998)]=function(){return 0x0;},Scene_Name[_0x2a56e3(0x948)][_0x2a56e3(0x158)]=function(){const _0x283e10=_0x2a56e3;return Scene_Name[_0x283e10(0x7c9)][_0x283e10(0x65d)][_0x283e10(0x697)](this);},Scene_Name['prototype']['inputWindowRect']=function(){const _0xf69d71=_0x2a56e3;return Scene_Name[_0xf69d71(0x7c9)][_0xf69d71(0x862)][_0xf69d71(0x697)](this);},Scene_Name['prototype']['EnableNameInput']=function(){const _0x30dc86=_0x2a56e3;if(!this[_0x30dc86(0x178)])return![];return VisuMZ[_0x30dc86(0x803)]['Settings'][_0x30dc86(0x7c0)][_0x30dc86(0x150)];},Scene_Name[_0x2a56e3(0x948)][_0x2a56e3(0x207)]=function(){const _0x21182d=_0x2a56e3;if(this[_0x21182d(0x150)]()){if(_0x21182d(0x247)==='OOPtB')return TextManager[_0x21182d(0x849)](_0x21182d(0x78b));else _0x5b6c85+=_0x39d6a5;}else{if(_0x21182d(0x1b0)!==_0x21182d(0x8b4))return Scene_MenuBase[_0x21182d(0x948)][_0x21182d(0x207)]['call'](this);else(_0x56ddf3>=_0x949731||_0x306123&&_0x3f45e3===0x1)&&this[_0x21182d(0x317)]((_0x1f7d38-_0x185352+_0x3e188f)%_0x3b691c);}},Scene_Name[_0x2a56e3(0x948)][_0x2a56e3(0x187)]=function(){const _0x11b1e4=_0x2a56e3;if(this['EnableNameInput']()){const _0x85649e=VisuMZ[_0x11b1e4(0x803)][_0x11b1e4(0x3f7)][_0x11b1e4(0x7c0)];if(this['_inputWindow']['_mode']===_0x11b1e4(0x29d))return _0x85649e['Keyboard']||_0x11b1e4(0x5fb);else{if(_0x11b1e4(0x61a)==='OpYbU'){if(_0x4cc7b1['_pictureCoordinatesMode']!==_0x3ee2fa)return _0x9eaa4b[_0x11b1e4(0x803)][_0x11b1e4(0x6ed)]();return _0x5e6a1d['CoreEngine']['Game_Interpreter_updateWaitMode'][_0x11b1e4(0x697)](this);}else return _0x85649e[_0x11b1e4(0x34d)]||_0x11b1e4(0x34d);}}else return Scene_MenuBase[_0x11b1e4(0x948)][_0x11b1e4(0x187)][_0x11b1e4(0x697)](this);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x5f5)]=Scene_Name['prototype'][_0x2a56e3(0x3df)],Scene_Name[_0x2a56e3(0x948)][_0x2a56e3(0x3df)]=function(){const _0x3e3075=_0x2a56e3;this[_0x3e3075(0x5bb)]()?this[_0x3e3075(0x1b3)]():VisuMZ[_0x3e3075(0x803)][_0x3e3075(0x5f5)][_0x3e3075(0x697)](this);},Scene_Name[_0x2a56e3(0x948)][_0x2a56e3(0x5bb)]=function(){const _0x4e646f=_0x2a56e3,_0x2ca313=VisuMZ['CoreEngine'][_0x4e646f(0x3f7)][_0x4e646f(0x7c0)];if(!_0x2ca313)return![];const _0x173951=_0x2ca313[_0x4e646f(0x5ef)];if(!_0x173951)return![];const _0x59efb8=this[_0x4e646f(0x86d)][_0x4e646f(0x6f5)]()[_0x4e646f(0x4ee)]();for(const _0x5f3dd2 of _0x173951){if(_0x59efb8[_0x4e646f(0x559)](_0x5f3dd2[_0x4e646f(0x4ee)]()))return!![];}return![];},Scene_Name[_0x2a56e3(0x948)][_0x2a56e3(0x1b3)]=function(){const _0x4cb68b=_0x2a56e3;SoundManager[_0x4cb68b(0x63c)]();},VisuMZ['CoreEngine'][_0x2a56e3(0x7f2)]=Scene_Battle[_0x2a56e3(0x948)][_0x2a56e3(0x1cd)],Scene_Battle['prototype']['update']=function(){const _0x1be777=_0x2a56e3;VisuMZ[_0x1be777(0x803)][_0x1be777(0x7f2)][_0x1be777(0x697)](this);if($gameTemp['_playTestFastMode'])this[_0x1be777(0x734)]();},Scene_Battle['prototype'][_0x2a56e3(0x734)]=function(){const _0x413fe4=_0x2a56e3;if(!BattleManager[_0x413fe4(0x49f)]()&&!this[_0x413fe4(0x7eb)]&&!$gameMessage[_0x413fe4(0x7e1)]()){if(_0x413fe4(0x330)!=='IxEPs')this[_0x413fe4(0x7eb)]=!![],this[_0x413fe4(0x1cd)](),SceneManager[_0x413fe4(0x883)](),this[_0x413fe4(0x7eb)]=![];else{const _0x444912=_0x413fe4(0x2ba);this[_0x413fe4(0x853)]=this['_colorCache']||{};if(this[_0x413fe4(0x853)][_0x444912])return this['_colorCache'][_0x444912];const _0x22b310=_0xe6cd44['CoreEngine'][_0x413fe4(0x3f7)][_0x413fe4(0x784)]['ColorDeath'];return this[_0x413fe4(0x70c)](_0x444912,_0x22b310);}}},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x5cd)]=Scene_Battle[_0x2a56e3(0x948)][_0x2a56e3(0x3fc)],Scene_Battle['prototype'][_0x2a56e3(0x3fc)]=function(){const _0x2652a8=_0x2a56e3;VisuMZ[_0x2652a8(0x803)]['Scene_Battle_createCancelButton']['call'](this),SceneManager[_0x2652a8(0x45e)]()&&(_0x2652a8(0x75b)===_0x2652a8(0x75b)?this['repositionCancelButtonSideButtonLayout']():_0x11d44a=this['mainAreaHeightSideButtonLayout']());},Scene_Battle[_0x2a56e3(0x948)][_0x2a56e3(0x38c)]=function(){const _0xcacfa5=_0x2a56e3;this[_0xcacfa5(0x197)]['x']=Graphics[_0xcacfa5(0x3dd)]+0x4,this[_0xcacfa5(0x914)]()?this[_0xcacfa5(0x197)]['y']=Graphics[_0xcacfa5(0x662)]-this['buttonAreaHeight']():this[_0xcacfa5(0x197)]['y']=0x0;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x13c)]=Sprite_Button[_0x2a56e3(0x948)][_0x2a56e3(0x14c)],Sprite_Button[_0x2a56e3(0x948)][_0x2a56e3(0x14c)]=function(_0x30a9d4){const _0x30edf8=_0x2a56e3;VisuMZ[_0x30edf8(0x803)][_0x30edf8(0x13c)][_0x30edf8(0x697)](this,_0x30a9d4),this[_0x30edf8(0x466)]();},Sprite_Button[_0x2a56e3(0x948)][_0x2a56e3(0x466)]=function(){const _0x478e16=_0x2a56e3,_0x43f74b=VisuMZ[_0x478e16(0x803)][_0x478e16(0x3f7)]['UI'];this['_isButtonHidden']=![];switch(this[_0x478e16(0x181)]){case _0x478e16(0x71b):this['_isButtonHidden']=!_0x43f74b[_0x478e16(0x7ae)];break;case'pageup':case'pagedown':this[_0x478e16(0x2f1)]=!_0x43f74b[_0x478e16(0x706)];break;case _0x478e16(0x882):case'up':case _0x478e16(0x6de):case _0x478e16(0x86f):case'ok':this['_isButtonHidden']=!_0x43f74b['numberShowButton'];break;case _0x478e16(0x3d5):this[_0x478e16(0x2f1)]=!_0x43f74b[_0x478e16(0x46f)];break;}},VisuMZ[_0x2a56e3(0x803)]['Sprite_Button_updateOpacity']=Sprite_Button[_0x2a56e3(0x948)][_0x2a56e3(0x243)],Sprite_Button['prototype'][_0x2a56e3(0x243)]=function(){const _0x5adf6e=_0x2a56e3;if(SceneManager[_0x5adf6e(0x55b)]()||this[_0x5adf6e(0x2f1)]){if('gTgVE'!==_0x5adf6e(0x31e))return _0x7d4a22[_0x5adf6e(0x803)]['Game_Interpreter_command105'][_0x5adf6e(0x697)](this,_0x5cdb9c);else this[_0x5adf6e(0x649)]();}else VisuMZ['CoreEngine'][_0x5adf6e(0x731)][_0x5adf6e(0x697)](this);},Sprite_Button[_0x2a56e3(0x948)]['hideButtonFromView']=function(){const _0x1b1746=_0x2a56e3;this['visible']=![],this[_0x1b1746(0x716)]=0x0,this['x']=Graphics['width']*0xa,this['y']=Graphics[_0x1b1746(0x8c0)]*0xa;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x901)]=Sprite_Battler[_0x2a56e3(0x948)][_0x2a56e3(0x1ff)],Sprite_Battler[_0x2a56e3(0x948)][_0x2a56e3(0x1ff)]=function(_0x374301,_0x957dc,_0xc4ef3f){const _0x776c59=_0x2a56e3;(this['_targetOffsetX']!==_0x374301||this[_0x776c59(0x161)]!==_0x957dc)&&(this[_0x776c59(0x614)](_0x776c59(0x318)),this[_0x776c59(0x7ab)]=_0xc4ef3f),VisuMZ[_0x776c59(0x803)][_0x776c59(0x901)]['call'](this,_0x374301,_0x957dc,_0xc4ef3f);},Sprite_Battler['prototype']['setMoveEasingType']=function(_0x47d55b){const _0x22f9cd=_0x2a56e3;this[_0x22f9cd(0x2bb)]=_0x47d55b;},Sprite_Battler[_0x2a56e3(0x948)][_0x2a56e3(0x18a)]=function(){const _0x2cbc43=_0x2a56e3;if(this[_0x2cbc43(0x127)]<=0x0)return;const _0xa6acf9=this[_0x2cbc43(0x127)],_0x596f91=this[_0x2cbc43(0x7ab)],_0x5a282e=this[_0x2cbc43(0x2bb)];this[_0x2cbc43(0x7b3)]=this[_0x2cbc43(0x550)](this[_0x2cbc43(0x7b3)],this[_0x2cbc43(0x74c)],_0xa6acf9,_0x596f91,_0x5a282e),this[_0x2cbc43(0x49c)]=this['applyEasing'](this[_0x2cbc43(0x49c)],this['_targetOffsetY'],_0xa6acf9,_0x596f91,_0x5a282e),this[_0x2cbc43(0x127)]--;if(this['_movementDuration']<=0x0)this[_0x2cbc43(0x46c)]();},Sprite_Battler['prototype']['applyEasing']=function(_0xc2901f,_0x5e6980,_0x34439a,_0x1e47d9,_0x8e4e86){const _0x40350c=_0x2a56e3,_0x79acad=VisuMZ[_0x40350c(0x709)]((_0x1e47d9-_0x34439a)/_0x1e47d9,_0x8e4e86||_0x40350c(0x318)),_0x21e55f=VisuMZ[_0x40350c(0x709)]((_0x1e47d9-_0x34439a+0x1)/_0x1e47d9,_0x8e4e86||_0x40350c(0x318)),_0x4858ed=(_0xc2901f-_0x5e6980*_0x79acad)/(0x1-_0x79acad);return _0x4858ed+(_0x5e6980-_0x4858ed)*_0x21e55f;},VisuMZ['CoreEngine'][_0x2a56e3(0x45d)]=Sprite_Actor['prototype'][_0x2a56e3(0x984)],Sprite_Actor[_0x2a56e3(0x948)][_0x2a56e3(0x984)]=function(_0x5db1cc){const _0x217d07=_0x2a56e3;VisuMZ[_0x217d07(0x803)][_0x217d07(0x3f7)]['UI']['RepositionActors']?this[_0x217d07(0x6f7)](_0x5db1cc):'PNpUI'===_0x217d07(0x5d1)?VisuMZ['CoreEngine']['Sprite_Actor_setActorHome'][_0x217d07(0x697)](this,_0x5db1cc):(_0x5c7571[_0x217d07(0x803)]['Input_clear']['call'](this),this[_0x217d07(0x60d)]=_0x3d963f,this[_0x217d07(0x71c)]=_0x390fd9,this['_gamepadWait']=_0xc87702['keyRepeatWait']);},Sprite_Actor[_0x2a56e3(0x948)][_0x2a56e3(0x6f7)]=function(_0x4be32a){const _0x4cdc76=_0x2a56e3;let _0x5ce724=Math[_0x4cdc76(0x377)](Graphics[_0x4cdc76(0x290)]/0x2+0xc0);_0x5ce724-=Math[_0x4cdc76(0x6ad)]((Graphics[_0x4cdc76(0x290)]-Graphics[_0x4cdc76(0x3dd)])/0x2),_0x5ce724+=_0x4be32a*0x20;let _0x5248df=Graphics[_0x4cdc76(0x8c0)]-0xc8-$gameParty[_0x4cdc76(0x5c2)]()*0x30;_0x5248df-=Math[_0x4cdc76(0x6ad)]((Graphics['height']-Graphics[_0x4cdc76(0x662)])/0x2),_0x5248df+=_0x4be32a*0x30,this[_0x4cdc76(0x7a8)](_0x5ce724,_0x5248df);},Sprite_Actor['prototype'][_0x2a56e3(0x40d)]=function(){const _0xb8bcb0=_0x2a56e3;this[_0xb8bcb0(0x1ff)](0x4b0,0x0,0x78);},Sprite_Animation[_0x2a56e3(0x948)][_0x2a56e3(0x715)]=function(_0x4a2471){const _0x53365f=_0x2a56e3;this[_0x53365f(0x22d)]=_0x4a2471;},VisuMZ['CoreEngine']['Sprite_Animation_processSoundTimings']=Sprite_Animation[_0x2a56e3(0x948)][_0x2a56e3(0x5b7)],Sprite_Animation[_0x2a56e3(0x948)][_0x2a56e3(0x5b7)]=function(){const _0x5967ef=_0x2a56e3;if(this[_0x5967ef(0x22d)])return;VisuMZ[_0x5967ef(0x803)][_0x5967ef(0x165)][_0x5967ef(0x697)](this);},VisuMZ['CoreEngine']['Sprite_Animation_setViewport']=Sprite_Animation[_0x2a56e3(0x948)][_0x2a56e3(0x7c2)],Sprite_Animation[_0x2a56e3(0x948)]['setViewport']=function(_0x24d235){const _0xbb9c38=_0x2a56e3;this[_0xbb9c38(0x644)]()?this[_0xbb9c38(0x361)](_0x24d235):VisuMZ[_0xbb9c38(0x803)][_0xbb9c38(0x255)]['call'](this,_0x24d235);},Sprite_Animation[_0x2a56e3(0x948)][_0x2a56e3(0x644)]=function(){const _0x1c1b58=_0x2a56e3;if(!this[_0x1c1b58(0x91a)])return![];const _0x1264e8=this[_0x1c1b58(0x91a)][_0x1c1b58(0x6f5)]||'';if(_0x1264e8[_0x1c1b58(0x76d)](/<MIRROR OFFSET X>/i))return!![];if(_0x1264e8[_0x1c1b58(0x76d)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x1c1b58(0x803)][_0x1c1b58(0x3f7)]['QoL']['AnimationMirrorOffset'];},Sprite_Animation[_0x2a56e3(0x948)][_0x2a56e3(0x361)]=function(_0x1840d6){const _0x3111ae=_0x2a56e3,_0x1e635a=this[_0x3111ae(0x1e4)],_0xb770eb=this[_0x3111ae(0x1e4)],_0x358960=this['_animation'][_0x3111ae(0x223)]*(this['_mirror']?-0x1:0x1)-_0x1e635a/0x2,_0x2d37d7=this[_0x3111ae(0x91a)][_0x3111ae(0x5fa)]-_0xb770eb/0x2,_0x1da9b2=this['targetPosition'](_0x1840d6);_0x1840d6['gl'][_0x3111ae(0x232)](_0x358960+_0x1da9b2['x'],_0x2d37d7+_0x1da9b2['y'],_0x1e635a,_0xb770eb);},Sprite_Animation[_0x2a56e3(0x948)][_0x2a56e3(0x324)]=function(_0x41f227){const _0x3ce505=_0x2a56e3;if(_0x41f227[_0x3ce505(0x71d)]){}const _0xce9900=this[_0x3ce505(0x91a)][_0x3ce505(0x6f5)];let _0x464578=_0x41f227[_0x3ce505(0x8c0)]*_0x41f227['scale']['y'],_0x35db53=0x0,_0x52ae07=-_0x464578/0x2;if(_0xce9900['match'](/<(?:HEAD|HEADER|TOP)>/i))_0x52ae07=-_0x464578;if(_0xce9900['match'](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x52ae07=0x0;if(this[_0x3ce505(0x91a)]['alignBottom'])_0x52ae07=0x0;if(_0xce9900[_0x3ce505(0x76d)](/<(?:LEFT)>/i))_0x35db53=-_0x41f227[_0x3ce505(0x290)]/0x2;if(_0xce9900[_0x3ce505(0x76d)](/<(?:RIGHT)>/i))_0x35db53=_0x41f227[_0x3ce505(0x290)]/0x2;if(_0xce9900[_0x3ce505(0x76d)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)){if(_0x3ce505(0x446)!==_0x3ce505(0x319))_0x35db53=Number(RegExp['$1'])*_0x41f227[_0x3ce505(0x290)];else return 0x0;}_0xce9900[_0x3ce505(0x76d)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x3ce505(0x552)==='BkwAg'?(_0xcfe119[_0x3ce505(0x803)][_0x3ce505(0x584)][_0x3ce505(0x697)](this,_0x2b0f06),(this[_0x3ce505(0x43b)](_0x3a3e73)||this[_0x3ce505(0x524)](_0x1b0160))&&this[_0x3ce505(0x55a)](_0x3da16b)):_0x52ae07=(0x1-Number(RegExp['$1']))*-_0x464578);_0xce9900[_0x3ce505(0x76d)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x35db53=Number(RegExp['$1'])*_0x41f227[_0x3ce505(0x290)],_0x52ae07=(0x1-Number(RegExp['$2']))*-_0x464578);if(_0xce9900[_0x3ce505(0x76d)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x35db53+=Number(RegExp['$1']);if(_0xce9900['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x52ae07+=Number(RegExp['$1']);_0xce9900[_0x3ce505(0x76d)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x35db53+=Number(RegExp['$1']),_0x52ae07+=Number(RegExp['$2']));const _0x2a3c52=new Point(_0x35db53,_0x52ae07);return _0x41f227[_0x3ce505(0x2e9)](),_0x41f227[_0x3ce505(0x581)][_0x3ce505(0x4d1)](_0x2a3c52);},Sprite_AnimationMV[_0x2a56e3(0x948)][_0x2a56e3(0x710)]=function(){const _0x5ed8f7=_0x2a56e3;this[_0x5ed8f7(0x36e)]=VisuMZ['CoreEngine'][_0x5ed8f7(0x3f7)][_0x5ed8f7(0x2fc)][_0x5ed8f7(0x184)]??0x4,this['setupCustomRateCoreEngine'](),this[_0x5ed8f7(0x36e)]=this['_rate'][_0x5ed8f7(0x459)](0x1,0xa);},Sprite_AnimationMV[_0x2a56e3(0x948)][_0x2a56e3(0x392)]=function(){const _0x10111b=_0x2a56e3;if(!this[_0x10111b(0x91a)]);const _0x127b1c=this[_0x10111b(0x91a)]['name']||'';_0x127b1c['match'](/<RATE:[ ](\d+)>/i)&&(this[_0x10111b(0x36e)]=(Number(RegExp['$1'])||0x1)[_0x10111b(0x459)](0x1,0xa));},Sprite_AnimationMV['prototype'][_0x2a56e3(0x715)]=function(_0x3b7ac3){const _0x51ad29=_0x2a56e3;this[_0x51ad29(0x22d)]=_0x3b7ac3;},VisuMZ['CoreEngine'][_0x2a56e3(0x6c4)]=Sprite_AnimationMV[_0x2a56e3(0x948)][_0x2a56e3(0x292)],Sprite_AnimationMV['prototype'][_0x2a56e3(0x292)]=function(_0x595b4c){const _0x18c1ab=_0x2a56e3;this['_muteSound']&&(_0x18c1ab(0x555)===_0x18c1ab(0x555)?(_0x595b4c=JsonEx[_0x18c1ab(0x219)](_0x595b4c),_0x595b4c['se']&&(_0x595b4c['se'][_0x18c1ab(0x16b)]=0x0)):(_0x195d4c=_0x4f717f,this[_0x18c1ab(0x37f)](_0x359497,_0x354833))),VisuMZ[_0x18c1ab(0x803)][_0x18c1ab(0x6c4)][_0x18c1ab(0x697)](this,_0x595b4c);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x5a3)]=Sprite_AnimationMV['prototype']['updatePosition'],Sprite_AnimationMV[_0x2a56e3(0x948)][_0x2a56e3(0x6b6)]=function(){const _0xf6d495=_0x2a56e3;VisuMZ[_0xf6d495(0x803)][_0xf6d495(0x5a3)][_0xf6d495(0x697)](this);if(this[_0xf6d495(0x91a)][_0xf6d495(0x908)]===0x3){if('ZScKo'!==_0xf6d495(0x6b7)){if(this['x']===0x0)this['x']=Math[_0xf6d495(0x377)](Graphics[_0xf6d495(0x290)]/0x2);if(this['y']===0x0)this['y']=Math[_0xf6d495(0x377)](Graphics[_0xf6d495(0x8c0)]/0x2);}else return _0x3e58d0['horzJS'][_0xf6d495(0x697)](this);}},Sprite_Damage[_0x2a56e3(0x948)][_0x2a56e3(0x25e)]=function(_0x16a526){const _0x4daf3b=_0x2a56e3;let _0x3d6b9c=Math[_0x4daf3b(0x72a)](_0x16a526)['toString']();if(this[_0x4daf3b(0x1ee)]()){if(_0x4daf3b(0x2db)!==_0x4daf3b(0x596))_0x3d6b9c=VisuMZ[_0x4daf3b(0x85a)](_0x3d6b9c);else{if(this[_0x4daf3b(0x4a1)]==='keyboard'&&!_0x3b802f[_0x4daf3b(0x2fb)]())return;if(_0x275926[_0x4daf3b(0x1f6)]())return;_0x7cb7fc[_0x4daf3b(0x803)][_0x4daf3b(0x8c2)][_0x4daf3b(0x697)](this,_0x2a7116),this[_0x4daf3b(0x5f9)](_0x4daf3b(0x3ac));}}const _0x2530ef=this['fontSize'](),_0x2502b8=Math['floor'](_0x2530ef*0.75);for(let _0xdd7f4=0x0;_0xdd7f4<_0x3d6b9c[_0x4daf3b(0x9b5)];_0xdd7f4++){if('nunyG'!==_0x4daf3b(0x983))this[_0x4daf3b(0x38e)][_0x4daf3b(0x7a2)](_0x5c6f78['layoutSettings']['SkillTypeBgType']);else{const _0x151686=this[_0x4daf3b(0x70f)](_0x2502b8,_0x2530ef);_0x151686[_0x4daf3b(0x65e)][_0x4daf3b(0x21a)](_0x3d6b9c[_0xdd7f4],0x0,0x0,_0x2502b8,_0x2530ef,_0x4daf3b(0x4e1)),_0x151686['x']=(_0xdd7f4-(_0x3d6b9c['length']-0x1)/0x2)*_0x2502b8,_0x151686['dy']=-_0xdd7f4;}}},Sprite_Damage[_0x2a56e3(0x948)][_0x2a56e3(0x1ee)]=function(){const _0x1007c3=_0x2a56e3;return VisuMZ['CoreEngine'][_0x1007c3(0x3f7)]['QoL'][_0x1007c3(0x517)];},Sprite_Damage[_0x2a56e3(0x948)][_0x2a56e3(0x95d)]=function(){return ColorManager['outlineColorDmg']();},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x50f)]=Sprite_Gauge[_0x2a56e3(0x948)]['gaugeRate'],Sprite_Gauge[_0x2a56e3(0x948)]['gaugeRate']=function(){const _0x3b0843=_0x2a56e3;return VisuMZ[_0x3b0843(0x803)][_0x3b0843(0x50f)][_0x3b0843(0x697)](this)[_0x3b0843(0x459)](0x0,0x1);},VisuMZ['CoreEngine'][_0x2a56e3(0x658)]=Sprite_Gauge['prototype']['currentValue'],Sprite_Gauge[_0x2a56e3(0x948)][_0x2a56e3(0x6cc)]=function(){const _0xcc158=_0x2a56e3;let _0x4ff0d1=VisuMZ[_0xcc158(0x803)][_0xcc158(0x658)][_0xcc158(0x697)](this);return _0x4ff0d1;},Sprite_Gauge[_0x2a56e3(0x948)]['drawValue']=function(){const _0x4d0033=_0x2a56e3;let _0x1034aa=this[_0x4d0033(0x6cc)]();if(this[_0x4d0033(0x1ee)]()){if(_0x4d0033(0x754)===_0x4d0033(0x754))_0x1034aa=VisuMZ[_0x4d0033(0x85a)](_0x1034aa);else{if(_0x2e1bf5[_0x4d0033(0x141)]())return;_0x49ae1c[_0x4d0033(0x820)](_0x30faa5,_0x5ed5ae);const _0x121110=_0x5d164f['min'](_0x172feb[_0x4d0033(0x1dd)],_0x170fb5[_0x4d0033(0x356)]),_0x35ff31=_0x2322d5[_0x4d0033(0x81b)](_0x360931['StartID'],_0x5c956f[_0x4d0033(0x356)]),_0xab1e0b=(_0x54f28a[_0x4d0033(0x2a4)]||0x0)/0x64;for(let _0x1a7dae=_0x121110;_0x1a7dae<=_0x35ff31;_0x1a7dae++){const _0x31556d=_0x5ef911['random']()<=_0xab1e0b;_0x4fe6bf[_0x4d0033(0x295)](_0x1a7dae,_0x31556d);}}}const _0x128349=this[_0x4d0033(0x87c)]()-0x1,_0x540792=this[_0x4d0033(0x1ef)]?this[_0x4d0033(0x1ef)]():this[_0x4d0033(0x6ab)]();this[_0x4d0033(0x1b2)](),this[_0x4d0033(0x65e)][_0x4d0033(0x21a)](_0x1034aa,0x0,0x0,_0x128349,_0x540792,'right');},Sprite_Gauge[_0x2a56e3(0x948)]['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge['prototype']['useDigitGrouping']=function(){const _0xa40aaf=_0x2a56e3;return VisuMZ[_0xa40aaf(0x803)][_0xa40aaf(0x3f7)][_0xa40aaf(0x2fc)][_0xa40aaf(0x2b9)];},Sprite_Gauge[_0x2a56e3(0x948)][_0x2a56e3(0x95d)]=function(){const _0x1a7bd1=_0x2a56e3;return ColorManager[_0x1a7bd1(0x2a8)]();},VisuMZ[_0x2a56e3(0x803)]['Sprite_Picture_loadBitmap']=Sprite_Picture[_0x2a56e3(0x948)][_0x2a56e3(0x673)],Sprite_Picture['prototype'][_0x2a56e3(0x673)]=function(){const _0x150ae1=_0x2a56e3;this[_0x150ae1(0x556)][_0x150ae1(0x76d)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?_0x150ae1(0x73d)!==_0x150ae1(0x3d1)?this[_0x150ae1(0x399)](Number(RegExp['$1'])):_0x3cadd7['CoreEngine'][_0x150ae1(0x52b)][_0x150ae1(0x697)](this):VisuMZ[_0x150ae1(0x803)][_0x150ae1(0x9a5)][_0x150ae1(0x697)](this);},Sprite_Picture[_0x2a56e3(0x948)][_0x2a56e3(0x399)]=function(_0x126a62){const _0x49c0af=_0x2a56e3,_0x5b41e9=ImageManager[_0x49c0af(0x6cd)],_0x2fed6f=ImageManager[_0x49c0af(0x27e)],_0x34196c=this[_0x49c0af(0x556)][_0x49c0af(0x76d)](/SMOOTH/i);this['bitmap']=new Bitmap(_0x5b41e9,_0x2fed6f);const _0x4666df=ImageManager[_0x49c0af(0x700)](_0x49c0af(0x9ae)),_0x1b9f90=_0x126a62%0x10*_0x5b41e9,_0x11cf12=Math[_0x49c0af(0x6ad)](_0x126a62/0x10)*_0x2fed6f;this[_0x49c0af(0x65e)][_0x49c0af(0x68d)]=_0x34196c,this[_0x49c0af(0x65e)][_0x49c0af(0x2c0)](_0x4666df,_0x1b9f90,_0x11cf12,_0x5b41e9,_0x2fed6f,0x0,0x0,_0x5b41e9,_0x2fed6f);};function Sprite_TitlePictureButton(){const _0x27959e=_0x2a56e3;this[_0x27959e(0x14c)](...arguments);}Sprite_TitlePictureButton[_0x2a56e3(0x948)]=Object[_0x2a56e3(0x3ab)](Sprite_Clickable[_0x2a56e3(0x948)]),Sprite_TitlePictureButton[_0x2a56e3(0x948)]['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x2a56e3(0x948)][_0x2a56e3(0x14c)]=function(_0x5de5fa){const _0x553878=_0x2a56e3;Sprite_Clickable[_0x553878(0x948)][_0x553878(0x14c)][_0x553878(0x697)](this),this[_0x553878(0x22e)]=_0x5de5fa,this[_0x553878(0x19e)]=null,this[_0x553878(0x5d4)]();},Sprite_TitlePictureButton[_0x2a56e3(0x948)][_0x2a56e3(0x5d4)]=function(){const _0x31bff4=_0x2a56e3;this['x']=Graphics[_0x31bff4(0x290)],this['y']=Graphics[_0x31bff4(0x8c0)],this[_0x31bff4(0x575)]=![],this[_0x31bff4(0x42e)]();},Sprite_TitlePictureButton[_0x2a56e3(0x948)][_0x2a56e3(0x42e)]=function(){const _0x53cd74=_0x2a56e3;this[_0x53cd74(0x65e)]=ImageManager[_0x53cd74(0x74a)](this[_0x53cd74(0x22e)][_0x53cd74(0x854)]),this[_0x53cd74(0x65e)]['addLoadListener'](this['onButtonImageLoad']['bind'](this));},Sprite_TitlePictureButton[_0x2a56e3(0x948)]['onButtonImageLoad']=function(){const _0x147583=_0x2a56e3;this[_0x147583(0x22e)][_0x147583(0x534)][_0x147583(0x697)](this),this[_0x147583(0x22e)][_0x147583(0x153)][_0x147583(0x697)](this),this['setClickHandler'](this[_0x147583(0x22e)][_0x147583(0x338)][_0x147583(0x63d)](this));},Sprite_TitlePictureButton['prototype'][_0x2a56e3(0x1cd)]=function(){const _0x187c61=_0x2a56e3;Sprite_Clickable['prototype'][_0x187c61(0x1cd)]['call'](this),this[_0x187c61(0x243)](),this[_0x187c61(0x493)]();},Sprite_TitlePictureButton[_0x2a56e3(0x948)]['fadeSpeed']=function(){const _0x1cbc88=_0x2a56e3;return VisuMZ['CoreEngine']['Settings'][_0x1cbc88(0x8fd)][_0x1cbc88(0x7b7)][_0x1cbc88(0x6df)];},Sprite_TitlePictureButton[_0x2a56e3(0x948)]['updateOpacity']=function(){const _0x5d030d=_0x2a56e3;this[_0x5d030d(0x9b1)]||this['_hovered']?this[_0x5d030d(0x716)]=0xff:(this[_0x5d030d(0x716)]+=this[_0x5d030d(0x575)]?this[_0x5d030d(0x576)]():-0x1*this[_0x5d030d(0x576)](),this[_0x5d030d(0x716)]=Math['min'](0xc0,this[_0x5d030d(0x716)]));},Sprite_TitlePictureButton[_0x2a56e3(0x948)][_0x2a56e3(0x8fc)]=function(_0x1a6ea5){this['_clickHandler']=_0x1a6ea5;},Sprite_TitlePictureButton['prototype']['onClick']=function(){const _0x1b4f91=_0x2a56e3;if(this[_0x1b4f91(0x19e)]){if('OcZiw'!=='OcZiw'){let _0x56b992=_0x40a145[_0x1b4f91(0x803)][_0x1b4f91(0x3f4)][_0x1b4f91(0x697)](this,_0x17c4e2);return _0x56b992['x']=_0x3a5d7c[_0x1b4f91(0x377)](_0x56b992['x']),_0x56b992['y']=_0x431718[_0x1b4f91(0x377)](_0x56b992['y']),_0x56b992[_0x1b4f91(0x290)]=_0x4646f5['round'](_0x56b992[_0x1b4f91(0x290)]),_0x56b992[_0x1b4f91(0x8c0)]=_0xd51bda[_0x1b4f91(0x377)](_0x56b992[_0x1b4f91(0x8c0)]),_0x56b992;}else this[_0x1b4f91(0x19e)]();}},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x4eb)]=Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x14c)],Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x14c)]=function(){const _0xc6b1c5=_0x2a56e3;VisuMZ[_0xc6b1c5(0x803)][_0xc6b1c5(0x4eb)][_0xc6b1c5(0x697)](this),this[_0xc6b1c5(0x394)]();},Spriteset_Base['prototype'][_0x2a56e3(0x394)]=function(){const _0xd8c195=_0x2a56e3;this[_0xd8c195(0x280)]=[],this['_pointAnimationSprites']=[],this[_0xd8c195(0x9b3)]=this['scale']['x'],this['_cacheScaleY']=this[_0xd8c195(0x8ad)]['y'];},VisuMZ[_0x2a56e3(0x803)]['Spriteset_Base_destroy']=Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x1d7)],Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x1d7)]=function(_0x2e13f6){const _0x380f64=_0x2a56e3;this[_0x380f64(0x3bc)](),this[_0x380f64(0x762)](),VisuMZ[_0x380f64(0x803)][_0x380f64(0x714)][_0x380f64(0x697)](this,_0x2e13f6);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x99d)]=Spriteset_Base['prototype'][_0x2a56e3(0x1cd)],Spriteset_Base['prototype'][_0x2a56e3(0x1cd)]=function(){const _0x335838=_0x2a56e3;VisuMZ[_0x335838(0x803)][_0x335838(0x99d)][_0x335838(0x697)](this),this[_0x335838(0x15d)](),this[_0x335838(0x5c3)](),this[_0x335838(0x4f0)]();},Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x15d)]=function(){const _0x31d9c4=_0x2a56e3;if(!VisuMZ[_0x31d9c4(0x803)][_0x31d9c4(0x3f7)][_0x31d9c4(0x2fc)]['AntiZoomPictures'])return;if(this[_0x31d9c4(0x9b3)]===this['scale']['x']&&this[_0x31d9c4(0x701)]===this['scale']['y'])return;this[_0x31d9c4(0x4d3)](),this['_cacheScaleX']=this['scale']['x'],this[_0x31d9c4(0x701)]=this[_0x31d9c4(0x8ad)]['y'];},Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x4d3)]=function(){const _0x3ad26f=_0x2a56e3;if(SceneManager['isSceneMap']()&&Spriteset_Map[_0x3ad26f(0x135)])return;else{if(SceneManager[_0x3ad26f(0x405)]()&&Spriteset_Battle[_0x3ad26f(0x135)]){if(_0x3ad26f(0x96c)===_0x3ad26f(0x98c)){const _0x541dc9=_0x3ad26f(0x13a);this[_0x3ad26f(0x853)]=this[_0x3ad26f(0x853)]||{};if(this[_0x3ad26f(0x853)][_0x541dc9])return this['_colorCache'][_0x541dc9];const _0x339efe=_0x4b8fe3[_0x3ad26f(0x803)][_0x3ad26f(0x3f7)][_0x3ad26f(0x784)][_0x3ad26f(0x77d)];return this[_0x3ad26f(0x70c)](_0x541dc9,_0x339efe);}else return;}}this[_0x3ad26f(0x8ad)]['x']!==0x0&&(this['_pictureContainer'][_0x3ad26f(0x8ad)]['x']=0x1/this[_0x3ad26f(0x8ad)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x3ad26f(0x8ad)]['x'])),this[_0x3ad26f(0x8ad)]['y']!==0x0&&(this[_0x3ad26f(0x735)]['scale']['y']=0x1/this[_0x3ad26f(0x8ad)]['y'],this['_pictureContainer']['y']=-(this['y']/this[_0x3ad26f(0x8ad)]['y']));},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x821)]=Spriteset_Base['prototype'][_0x2a56e3(0x6b6)],Spriteset_Base[_0x2a56e3(0x948)]['updatePosition']=function(){const _0x5b13dc=_0x2a56e3;VisuMZ[_0x5b13dc(0x803)]['Spriteset_Base_updatePosition'][_0x5b13dc(0x697)](this),this[_0x5b13dc(0x203)]();},Spriteset_Base['prototype'][_0x2a56e3(0x203)]=function(){const _0x30264f=_0x2a56e3;if(!$gameScreen)return;if($gameScreen[_0x30264f(0x90d)]<=0x0)return;this['x']-=Math[_0x30264f(0x377)]($gameScreen[_0x30264f(0x154)]());const _0x4eef74=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case _0x30264f(0x259):this['updatePositionCoreEngineShakeOriginal']();break;case _0x30264f(0x75e):this[_0x30264f(0x3e2)]();break;case _0x30264f(0x6f0):this[_0x30264f(0x88c)]();break;default:this[_0x30264f(0x527)]();break;}},Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x95f)]=function(){const _0x3ecd68=_0x2a56e3,_0x1c9b52=VisuMZ['CoreEngine'][_0x3ecd68(0x3f7)]['ScreenShake'];if(_0x1c9b52&&_0x1c9b52[_0x3ecd68(0x857)]){if(_0x3ecd68(0x17f)!==_0x3ecd68(0x17f))_0x7cfa00[_0x3ecd68(0x487)](_0x5de661);else return _0x1c9b52['originalJS'][_0x3ecd68(0x697)](this);}this['x']+=Math['round']($gameScreen[_0x3ecd68(0x154)]());},Spriteset_Base[_0x2a56e3(0x948)]['updatePositionCoreEngineShakeRand']=function(){const _0x54ebd9=_0x2a56e3,_0x1699cf=VisuMZ['CoreEngine'][_0x54ebd9(0x3f7)][_0x54ebd9(0x1d6)];if(_0x1699cf&&_0x1699cf['randomJS'])return _0x54ebd9(0x8cb)==='MyGIb'?_0x5be50f[_0x54ebd9(0x803)][_0x54ebd9(0x982)][_0x54ebd9(0x697)](this):_0x1699cf[_0x54ebd9(0x59f)][_0x54ebd9(0x697)](this);const _0x4c10c8=$gameScreen[_0x54ebd9(0x33d)]*0.75,_0x1558d7=$gameScreen[_0x54ebd9(0x6d0)]*0.6,_0x13554f=$gameScreen[_0x54ebd9(0x90d)];this['x']+=Math[_0x54ebd9(0x377)](Math[_0x54ebd9(0x5de)](_0x4c10c8)-Math[_0x54ebd9(0x5de)](_0x1558d7))*(Math[_0x54ebd9(0x4c9)](_0x13554f,0x1e)*0.5),this['y']+=Math[_0x54ebd9(0x377)](Math[_0x54ebd9(0x5de)](_0x4c10c8)-Math[_0x54ebd9(0x5de)](_0x1558d7))*(Math[_0x54ebd9(0x4c9)](_0x13554f,0x1e)*0.5);},Spriteset_Base[_0x2a56e3(0x948)]['updatePositionCoreEngineShakeHorz']=function(){const _0x596cb6=_0x2a56e3,_0x4e9697=VisuMZ[_0x596cb6(0x803)]['Settings'][_0x596cb6(0x1d6)];if(_0x4e9697&&_0x4e9697['horzJS']){if('lIZLO'!==_0x596cb6(0x674))return _0x4e9697[_0x596cb6(0x974)][_0x596cb6(0x697)](this);else throw _0x15ff17;}const _0x676fec=$gameScreen[_0x596cb6(0x33d)]*0.75,_0x54927c=$gameScreen[_0x596cb6(0x6d0)]*0.6,_0x281afa=$gameScreen['_shakeDuration'];this['x']+=Math[_0x596cb6(0x377)](Math['randomInt'](_0x676fec)-Math[_0x596cb6(0x5de)](_0x54927c))*(Math[_0x596cb6(0x4c9)](_0x281afa,0x1e)*0.5);},Spriteset_Base[_0x2a56e3(0x948)]['updatePositionCoreEngineShakeVert']=function(){const _0x492b2a=_0x2a56e3,_0x5ca01f=VisuMZ['CoreEngine'][_0x492b2a(0x3f7)][_0x492b2a(0x1d6)];if(_0x5ca01f&&_0x5ca01f[_0x492b2a(0x460)]){if(_0x492b2a(0x93b)!==_0x492b2a(0x8d9))return _0x5ca01f[_0x492b2a(0x460)]['call'](this);else _0x306ec3[_0x492b2a(0x8e5)](_0x21bc7b,_0xa9a9d1);}const _0x3893ef=$gameScreen[_0x492b2a(0x33d)]*0.75,_0x1ebde3=$gameScreen[_0x492b2a(0x6d0)]*0.6,_0x25088d=$gameScreen[_0x492b2a(0x90d)];this['y']+=Math['round'](Math[_0x492b2a(0x5de)](_0x3893ef)-Math[_0x492b2a(0x5de)](_0x1ebde3))*(Math['min'](_0x25088d,0x1e)*0.5);},Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x5c3)]=function(){const _0x3582c9=_0x2a56e3;for(const _0x513700 of this[_0x3582c9(0x280)]){!_0x513700[_0x3582c9(0x372)]()&&(_0x3582c9(0x993)!==_0x3582c9(0x320)?this[_0x3582c9(0x7b6)](_0x513700):this[_0x3582c9(0x95b)][_0x3582c9(0x7a2)](_0x5d01ac[_0x3582c9(0x7c9)][_0x3582c9(0x94f)]));}this[_0x3582c9(0x660)]();},Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x660)]=function(){const _0x5c5ad2=_0x2a56e3;for(;;){if(_0x5c5ad2(0x7ac)===_0x5c5ad2(0x7ac)){const _0x47a6f8=$gameTemp[_0x5c5ad2(0x885)]();if(_0x47a6f8){if(_0x5c5ad2(0x896)!==_0x5c5ad2(0x896)){const _0x239218=this[_0x5c5ad2(0x69d)];_0x239218[_0x5c5ad2(0x22a)]=this[_0x5c5ad2(0x2ee)],_0x239218['fillText'](_0x539aef,_0x3cf273+0x2,_0x52641a+0x2,_0x274f38);}else this[_0x5c5ad2(0x3d3)](_0x47a6f8);}else{if(_0x5c5ad2(0x6b1)!=='LzvYT')break;else this['initialize'](...arguments);}}else _0x252a6b+=_0x5c5ad2(0x49d);}},Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x3d3)]=function(_0x5956b0){const _0x190f99=_0x2a56e3,_0x36f6de=$dataAnimations[_0x5956b0[_0x190f99(0x737)]],_0x51b25a=_0x5956b0[_0x190f99(0x15b)],_0x22524c=_0x5956b0[_0x190f99(0x43a)],_0x123a70=_0x5956b0[_0x190f99(0x5a4)];let _0x2dc326=this['animationBaseDelay']();const _0x35aa73=this[_0x190f99(0x258)]();if(this[_0x190f99(0x6db)](_0x36f6de))for(const _0x2aaa86 of _0x51b25a){this[_0x190f99(0x58d)]([_0x2aaa86],_0x36f6de,_0x22524c,_0x2dc326,_0x123a70),_0x2dc326+=_0x35aa73;}else this['createFauxAnimationSprite'](_0x51b25a,_0x36f6de,_0x22524c,_0x2dc326,_0x123a70);},Spriteset_Base[_0x2a56e3(0x948)]['createFauxAnimationSprite']=function(_0x340e47,_0x19d8f3,_0x1563df,_0x30dd08,_0x8711b8){const _0x1e033d=_0x2a56e3,_0x5465bd=this['isMVAnimation'](_0x19d8f3),_0x41c340=new(_0x5465bd?Sprite_AnimationMV:Sprite_Animation)(),_0x5d434b=this[_0x1e033d(0x5af)](_0x340e47);this[_0x1e033d(0x453)](_0x340e47[0x0])&&(_0x1563df=!_0x1563df),_0x41c340[_0x1e033d(0x433)]=_0x340e47,_0x41c340[_0x1e033d(0x5d4)](_0x5d434b,_0x19d8f3,_0x1563df,_0x30dd08),_0x41c340['setMute'](_0x8711b8),this['_effectsContainer'][_0x1e033d(0x7bb)](_0x41c340),this[_0x1e033d(0x280)][_0x1e033d(0x487)](_0x41c340);},Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x7b6)]=function(_0x3f88ce){const _0x13090a=_0x2a56e3;this['_fauxAnimationSprites'][_0x13090a(0x738)](_0x3f88ce),this[_0x13090a(0x741)][_0x13090a(0x2f3)](_0x3f88ce);for(const _0x3ae423 of _0x3f88ce[_0x13090a(0x433)]){_0x3ae423[_0x13090a(0x778)]&&_0x3ae423['endAnimation']();}_0x3f88ce[_0x13090a(0x1d7)]();},Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x3bc)]=function(){const _0x29d56b=_0x2a56e3;for(const _0x2f37ea of this[_0x29d56b(0x280)]){this['removeFauxAnimation'](_0x2f37ea);}},Spriteset_Base['prototype'][_0x2a56e3(0x758)]=function(){const _0x341d56=_0x2a56e3;return this[_0x341d56(0x280)][_0x341d56(0x9b5)]>0x0;},Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x4f0)]=function(){const _0x1f3488=_0x2a56e3;for(const _0x272e45 of this['_pointAnimationSprites']){if(!_0x272e45[_0x1f3488(0x372)]()){if(_0x1f3488(0x93c)===_0x1f3488(0x93c))this[_0x1f3488(0x124)](_0x272e45);else{const _0x495b74=(_0x250191[_0x1f3488(0x723)]||'')[_0x1f3488(0x4ee)]()[_0x1f3488(0x74d)](),_0x151fae=(_0x10ab13[_0x1f3488(0x168)]||'')[_0x1f3488(0x4ee)]()[_0x1f3488(0x74d)]();_0x28f5a7[_0x1f3488(0x803)]['ControllerButtons'][_0x495b74]=_0x28b4bc,_0xb780f1[_0x1f3488(0x803)][_0x1f3488(0x4bd)][_0x151fae]=_0x495b74;}}}this[_0x1f3488(0x3a1)]();},Spriteset_Base[_0x2a56e3(0x948)]['processPointAnimationRequests']=function(){const _0x16dc2f=_0x2a56e3;for(;;){const _0x543fdc=$gameTemp[_0x16dc2f(0x4e5)]();if(_0x543fdc)this[_0x16dc2f(0x82b)](_0x543fdc);else break;}},Spriteset_Base[_0x2a56e3(0x948)]['createPointAnimation']=function(_0x38b991){const _0x526f7a=_0x2a56e3,_0x242857=$dataAnimations[_0x38b991['animationId']],_0x5804c6=this['createPointAnimationTargets'](_0x38b991),_0x544284=_0x38b991['mirror'],_0x11d705=_0x38b991['mute'];let _0x2edfc6=this[_0x526f7a(0x785)]();const _0x422e7f=this[_0x526f7a(0x258)]();if(this[_0x526f7a(0x6db)](_0x242857)){if(_0x526f7a(0x632)!==_0x526f7a(0x12a))for(const _0x25e872 of _0x5804c6){this[_0x526f7a(0x92f)]([_0x25e872],_0x242857,_0x544284,_0x2edfc6,_0x11d705),_0x2edfc6+=_0x422e7f;}else{const _0x47541b=_0x526f7a(0x5bd);this[_0x526f7a(0x853)]=this[_0x526f7a(0x853)]||{};if(this[_0x526f7a(0x853)][_0x47541b])return this[_0x526f7a(0x853)][_0x47541b];const _0x2b2aac=_0x36cad8[_0x526f7a(0x803)][_0x526f7a(0x3f7)][_0x526f7a(0x784)][_0x526f7a(0x360)];return this['getColorDataFromPluginParameters'](_0x47541b,_0x2b2aac);}}else{if(_0x526f7a(0x1b6)!==_0x526f7a(0x3e0))this['createPointAnimationSprite'](_0x5804c6,_0x242857,_0x544284,_0x2edfc6,_0x11d705);else return _0x5e67e7[_0x526f7a(0x803)][_0x526f7a(0x3f7)]['UI'][_0x526f7a(0x850)];}},Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x898)]=function(_0x4cbc84){const _0x5aa916=_0x2a56e3,_0x30c674=new Sprite_Clickable();_0x30c674['x']=_0x4cbc84['x'],_0x30c674['y']=_0x4cbc84['y'],_0x30c674['z']=0x64;const _0x32d0cd=this[_0x5aa916(0x65f)]();return _0x32d0cd[_0x5aa916(0x7bb)](_0x30c674),[_0x30c674];},Spriteset_Base[_0x2a56e3(0x948)]['getPointAnimationLayer']=function(){return this;},Spriteset_Map[_0x2a56e3(0x948)]['getPointAnimationLayer']=function(){const _0x5dff72=_0x2a56e3;return this[_0x5dff72(0x577)]||this;},Spriteset_Battle['prototype'][_0x2a56e3(0x65f)]=function(){return this['_battleField']||this;},Spriteset_Base['prototype']['createPointAnimationSprite']=function(_0x308e2f,_0x31d264,_0x49a999,_0x4f3cfd,_0x6ddb0e){const _0x160066=_0x2a56e3,_0x47a356=this[_0x160066(0x471)](_0x31d264),_0x5bda63=new(_0x47a356?Sprite_AnimationMV:Sprite_Animation)();_0x5bda63['targetObjects']=_0x308e2f,_0x5bda63[_0x160066(0x5d4)](_0x308e2f,_0x31d264,_0x49a999,_0x4f3cfd),_0x5bda63['setMute'](_0x6ddb0e),this[_0x160066(0x741)]['addChild'](_0x5bda63),this[_0x160066(0x2f7)][_0x160066(0x487)](_0x5bda63);},Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x124)]=function(_0xff14ee){const _0xcc0e32=_0x2a56e3;this['_pointAnimationSprites']['remove'](_0xff14ee),this[_0xcc0e32(0x741)][_0xcc0e32(0x2f3)](_0xff14ee);for(const _0x3957ff of _0xff14ee['targetObjects']){if(_0xcc0e32(0x951)===_0xcc0e32(0x951)){_0x3957ff['endAnimation']&&_0x3957ff[_0xcc0e32(0x778)]();const _0x54544b=this[_0xcc0e32(0x65f)]();if(_0x54544b)_0x54544b[_0xcc0e32(0x2f3)](_0x3957ff);}else this[_0xcc0e32(0x364)]();}_0xff14ee['destroy']();},Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x762)]=function(){const _0x4c219a=_0x2a56e3;for(const _0x235107 of this[_0x4c219a(0x2f7)]){if('UnlJF'!=='TMJdO')this['removePointAnimation'](_0x235107);else return _0x395f05&&this['_actor']?this[_0x4c219a(0x418)][_0x4c219a(0x8fe)](_0x4ef9df):_0x25ad3d[_0x4c219a(0x803)][_0x4c219a(0x91f)]['call'](this,_0x36dfb2);}},Spriteset_Base['prototype'][_0x2a56e3(0x47c)]=function(){const _0x17edea=_0x2a56e3;return this[_0x17edea(0x2f7)][_0x17edea(0x9b5)]>0x0;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x519)]=Spriteset_Base[_0x2a56e3(0x948)][_0x2a56e3(0x8ac)],Spriteset_Base['prototype']['isAnimationPlaying']=function(){const _0x39ba9c=_0x2a56e3;return VisuMZ[_0x39ba9c(0x803)][_0x39ba9c(0x519)][_0x39ba9c(0x697)](this)||this[_0x39ba9c(0x47c)]();},Spriteset_Map[_0x2a56e3(0x135)]=VisuMZ['CoreEngine'][_0x2a56e3(0x3f7)][_0x2a56e3(0x2fc)]['DetachMapPictureContainer']||![],VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x83e)]=Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x508)],Scene_Map['prototype']['createSpriteset']=function(){const _0x456161=_0x2a56e3;VisuMZ[_0x456161(0x803)][_0x456161(0x83e)]['call'](this);if(!Spriteset_Map[_0x456161(0x135)])return;const _0x194f76=this[_0x456161(0x482)];if(!_0x194f76)return;this[_0x456161(0x735)]=_0x194f76[_0x456161(0x735)];if(!this[_0x456161(0x735)])return;this[_0x456161(0x7bb)](this[_0x456161(0x735)]);},Spriteset_Battle[_0x2a56e3(0x135)]=VisuMZ['CoreEngine'][_0x2a56e3(0x3f7)][_0x2a56e3(0x2fc)]['DetachBattlePictureContainer']||![],VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x789)]=Scene_Battle[_0x2a56e3(0x948)][_0x2a56e3(0x508)],Scene_Battle[_0x2a56e3(0x948)]['createSpriteset']=function(){const _0x107ce7=_0x2a56e3;VisuMZ[_0x107ce7(0x803)]['Scene_Battle_createSpriteset_detach']['call'](this);if(!Spriteset_Battle[_0x107ce7(0x135)])return;const _0x25754b=this['_spriteset'];if(!_0x25754b)return;this[_0x107ce7(0x735)]=_0x25754b['_pictureContainer'];if(!this[_0x107ce7(0x735)])return;this[_0x107ce7(0x7bb)](this[_0x107ce7(0x735)]);},Spriteset_Battle['prototype'][_0x2a56e3(0x656)]=function(){const _0xc8fdf8=_0x2a56e3;this['_backgroundFilter']=new PIXI[(_0xc8fdf8(0x645))][(_0xc8fdf8(0x275))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0xc8fdf8(0x877)][_0xc8fdf8(0x65e)]=SceneManager[_0xc8fdf8(0x24f)](),this[_0xc8fdf8(0x877)][_0xc8fdf8(0x645)]=[this['_backgroundFilter']],this[_0xc8fdf8(0x909)][_0xc8fdf8(0x7bb)](this[_0xc8fdf8(0x877)]);},VisuMZ[_0x2a56e3(0x803)]['Spriteset_Battle_createEnemies']=Spriteset_Battle[_0x2a56e3(0x948)][_0x2a56e3(0x1ed)],Spriteset_Battle[_0x2a56e3(0x948)]['createEnemies']=function(){const _0x5a0932=_0x2a56e3;this[_0x5a0932(0x386)]()&&this[_0x5a0932(0x651)](),VisuMZ[_0x5a0932(0x803)]['Spriteset_Battle_createEnemies'][_0x5a0932(0x697)](this);},Spriteset_Battle[_0x2a56e3(0x948)][_0x2a56e3(0x386)]=function(){const _0x2606c7=_0x2a56e3,_0x16b25b=VisuMZ[_0x2606c7(0x803)][_0x2606c7(0x3f7)][_0x2606c7(0x707)];if(!_0x16b25b)return![];if(Utils[_0x2606c7(0x675)]>=_0x2606c7(0x149)&&!_0x16b25b[_0x2606c7(0x5fd)]){if(_0x2606c7(0x412)===_0x2606c7(0x412))return![];else{let _0x224d6e=_0x535769[_0x2606c7(0x301)](_0x142b9f['id']);this[_0x2606c7(0x89c)](_0x224d6e);}}return _0x16b25b['RepositionEnemies'];},Spriteset_Battle[_0x2a56e3(0x948)][_0x2a56e3(0x651)]=function(){const _0x266faa=_0x2a56e3;for(member of $gameTroop[_0x266faa(0x1f3)]()){if(_0x266faa(0x18b)!=='LnUDe')return _0x3cd655&&_0x346f9c['_scene']?_0x14274b['_scene'][_0x266faa(0x94b)]():!![];else member[_0x266faa(0x540)]();}},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x429)]=Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x14c)],Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x14c)]=function(_0x165e18){const _0x2d1da1=_0x2a56e3;_0x165e18['x']=Math[_0x2d1da1(0x377)](_0x165e18['x']),_0x165e18['y']=Math[_0x2d1da1(0x377)](_0x165e18['y']),_0x165e18['width']=Math[_0x2d1da1(0x377)](_0x165e18[_0x2d1da1(0x290)]),_0x165e18['height']=Math[_0x2d1da1(0x377)](_0x165e18[_0x2d1da1(0x8c0)]),this['initDigitGrouping'](),VisuMZ[_0x2d1da1(0x803)]['Window_Base_initialize'][_0x2d1da1(0x697)](this,_0x165e18),this['initCoreEasing']();},Window_Base['prototype']['initDigitGrouping']=function(){const _0x1bd8e9=_0x2a56e3;this[_0x1bd8e9(0x397)]=VisuMZ[_0x1bd8e9(0x803)][_0x1bd8e9(0x3f7)][_0x1bd8e9(0x2fc)][_0x1bd8e9(0x41b)],this['_digitGroupingEx']=VisuMZ[_0x1bd8e9(0x803)][_0x1bd8e9(0x3f7)][_0x1bd8e9(0x2fc)][_0x1bd8e9(0x8a1)];},Window_Base[_0x2a56e3(0x948)]['lineHeight']=function(){const _0x59ad57=_0x2a56e3;return VisuMZ[_0x59ad57(0x803)][_0x59ad57(0x3f7)][_0x59ad57(0x431)][_0x59ad57(0x2b5)];},Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x138)]=function(){const _0x440b31=_0x2a56e3;return VisuMZ['CoreEngine'][_0x440b31(0x3f7)][_0x440b31(0x431)][_0x440b31(0x4fe)];},Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x86e)]=function(){const _0x20f9bd=_0x2a56e3;$gameSystem[_0x20f9bd(0x250)]?this[_0x20f9bd(0x6d1)]=$gameSystem[_0x20f9bd(0x250)]():_0x20f9bd(0x353)!=='CnWim'?this[_0x20f9bd(0x777)]():this[_0x20f9bd(0x6d1)]=VisuMZ[_0x20f9bd(0x803)]['Settings']['Window']['BackOpacity'];},Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x1d8)]=function(){const _0x556fed=_0x2a56e3;return VisuMZ['CoreEngine'][_0x556fed(0x3f7)][_0x556fed(0x431)][_0x556fed(0x905)];},Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x718)]=function(){const _0x391bb6=_0x2a56e3;return VisuMZ['CoreEngine']['Settings'][_0x391bb6(0x431)]['OpenSpeed'];},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x54e)]=Window_Base['prototype']['update'],Window_Base['prototype'][_0x2a56e3(0x1cd)]=function(){const _0x4db54c=_0x2a56e3;VisuMZ['CoreEngine'][_0x4db54c(0x54e)][_0x4db54c(0x697)](this),this[_0x4db54c(0x413)]();},Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x3f8)]=function(){const _0x41cb53=_0x2a56e3;if(this[_0x41cb53(0x3f0)]){if(_0x41cb53(0x895)===_0x41cb53(0x491))return _0x49f432[_0x41cb53(0x21c)]&&_0x5f4066[_0x41cb53(0x2bf)][_0x41cb53(0x559)]('['+_0x1c438f+']');else this[_0x41cb53(0x17d)]+=this['openingSpeed'](),this[_0x41cb53(0x4f2)]()&&(this[_0x41cb53(0x3f0)]=![]);}},Window_Base[_0x2a56e3(0x948)]['updateClose']=function(){const _0x2b6582=_0x2a56e3;if(this[_0x2b6582(0x206)]){if('gWUYk'!==_0x2b6582(0x912))_0x3fa5e7['isPressed'](_0x2b6582(0x6fd))&&this[_0x2b6582(0x40e)]()?this[_0x2b6582(0x66d)]():this[_0x2b6582(0x521)](_0x2cb4c8[_0x2b6582(0x350)](_0x2b6582(0x882)));else{this['openness']-=this['openingSpeed']();if(this['isClosed']()){if('ITDYO'===_0x2b6582(0x216)){if(this[_0x2b6582(0x2b2)]>0x63)return this[_0x2b6582(0x30e)](_0x3f51a5);return _0x554471[_0x2b6582(0x803)][_0x2b6582(0x5b0)]['call'](this,_0x4b1ffc);}else this[_0x2b6582(0x206)]=![];}}}},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x922)]=Window_Base['prototype'][_0x2a56e3(0x21a)],Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x21a)]=function(_0x444f98,_0x25e50c,_0x3cbc84,_0x1aa1a4,_0xc2ad2){const _0x4f32be=_0x2a56e3;if(this[_0x4f32be(0x1ee)]())_0x444f98=VisuMZ[_0x4f32be(0x85a)](_0x444f98);VisuMZ[_0x4f32be(0x803)][_0x4f32be(0x922)][_0x4f32be(0x697)](this,_0x444f98,_0x25e50c,_0x3cbc84,_0x1aa1a4,_0xc2ad2);},Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x1ee)]=function(){return this['_digitGrouping'];},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x99b)]=Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x7a7)],Window_Base[_0x2a56e3(0x948)]['createTextState']=function(_0x1fc930,_0x4a9966,_0x41e85f,_0x4472e0){const _0x2c2c22=_0x2a56e3;var _0x3a50a3=VisuMZ[_0x2c2c22(0x803)][_0x2c2c22(0x99b)][_0x2c2c22(0x697)](this,_0x1fc930,_0x4a9966,_0x41e85f,_0x4472e0);if(this['useDigitGroupingEx']())_0x3a50a3[_0x2c2c22(0x553)]=VisuMZ['GroupDigits'](_0x3a50a3[_0x2c2c22(0x553)]);return _0x3a50a3;},Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x8b6)]=function(){const _0x1872f0=_0x2a56e3;return this[_0x1872f0(0x342)];},Window_Base['prototype']['enableDigitGrouping']=function(_0x43dfa3){this['_digitGrouping']=_0x43dfa3;},Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x24c)]=function(_0x1b66f9){const _0x175686=_0x2a56e3;this[_0x175686(0x342)]=_0x1b66f9;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x603)]=Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x7a0)],Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x7a0)]=function(_0x524ec4,_0x353667,_0x10ed01){const _0x23a8b1=_0x2a56e3;_0x353667=Math[_0x23a8b1(0x377)](_0x353667),_0x10ed01=Math[_0x23a8b1(0x377)](_0x10ed01),VisuMZ[_0x23a8b1(0x803)][_0x23a8b1(0x603)][_0x23a8b1(0x697)](this,_0x524ec4,_0x353667,_0x10ed01);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x62c)]=Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x28c)],Window_Base['prototype']['drawFace']=function(_0x1ef15c,_0x3db9c2,_0x2dd075,_0x192135,_0x1ad329,_0x216064){const _0x4f154a=_0x2a56e3;_0x1ad329=_0x1ad329||ImageManager['faceWidth'],_0x216064=_0x216064||ImageManager['faceHeight'],_0x2dd075=Math[_0x4f154a(0x377)](_0x2dd075),_0x192135=Math[_0x4f154a(0x377)](_0x192135),_0x1ad329=Math[_0x4f154a(0x377)](_0x1ad329),_0x216064=Math['round'](_0x216064),VisuMZ[_0x4f154a(0x803)]['Window_Base_drawFace'][_0x4f154a(0x697)](this,_0x1ef15c,_0x3db9c2,_0x2dd075,_0x192135,_0x1ad329,_0x216064);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x979)]=Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x7cb)],Window_Base[_0x2a56e3(0x948)]['drawCharacter']=function(_0x3bd914,_0x32a5cf,_0x9e855d,_0x2da332){const _0x1f7c28=_0x2a56e3;_0x9e855d=Math['round'](_0x9e855d),_0x2da332=Math[_0x1f7c28(0x377)](_0x2da332),VisuMZ[_0x1f7c28(0x803)][_0x1f7c28(0x979)]['call'](this,_0x3bd914,_0x32a5cf,_0x9e855d,_0x2da332);},VisuMZ['CoreEngine'][_0x2a56e3(0x3f4)]=Window_Selectable[_0x2a56e3(0x948)]['itemRect'],Window_Selectable[_0x2a56e3(0x948)][_0x2a56e3(0x488)]=function(_0x439c79){const _0x1d880f=_0x2a56e3;let _0x26bfc9=VisuMZ[_0x1d880f(0x803)][_0x1d880f(0x3f4)][_0x1d880f(0x697)](this,_0x439c79);return _0x26bfc9['x']=Math[_0x1d880f(0x377)](_0x26bfc9['x']),_0x26bfc9['y']=Math['round'](_0x26bfc9['y']),_0x26bfc9[_0x1d880f(0x290)]=Math[_0x1d880f(0x377)](_0x26bfc9[_0x1d880f(0x290)]),_0x26bfc9[_0x1d880f(0x8c0)]=Math[_0x1d880f(0x377)](_0x26bfc9[_0x1d880f(0x8c0)]),_0x26bfc9;},VisuMZ['CoreEngine'][_0x2a56e3(0x708)]=Window_StatusBase[_0x2a56e3(0x948)]['drawActorSimpleStatus'],Window_StatusBase['prototype']['drawActorSimpleStatus']=function(_0xbc075d,_0x8e9d24,_0x4d37cd){const _0x497ae5=_0x2a56e3;_0x8e9d24=Math[_0x497ae5(0x377)](_0x8e9d24),_0x4d37cd=Math[_0x497ae5(0x377)](_0x4d37cd),VisuMZ[_0x497ae5(0x803)][_0x497ae5(0x708)][_0x497ae5(0x697)](this,_0xbc075d,_0x8e9d24,_0x4d37cd);},Window_Base[_0x2a56e3(0x948)]['initCoreEasing']=function(){const _0x18e686=_0x2a56e3;this[_0x18e686(0x85c)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x18e686(0x8ad)]['y'],'targetOpacity':this[_0x18e686(0x716)],'targetBackOpacity':this[_0x18e686(0x6d1)],'targetContentsOpacity':this['contentsOpacity']};},Window_Base[_0x2a56e3(0x948)]['updateCoreEasing']=function(){const _0x907d2d=_0x2a56e3;if(!this[_0x907d2d(0x85c)])return;if(this['_coreEasing'][_0x907d2d(0x6a9)]<=0x0)return;this['x']=this[_0x907d2d(0x312)](this['x'],this['_coreEasing']['targetX']),this['y']=this[_0x907d2d(0x312)](this['y'],this[_0x907d2d(0x85c)][_0x907d2d(0x3cd)]),this['scale']['x']=this[_0x907d2d(0x312)](this[_0x907d2d(0x8ad)]['x'],this[_0x907d2d(0x85c)][_0x907d2d(0x328)]),this[_0x907d2d(0x8ad)]['y']=this[_0x907d2d(0x312)](this['scale']['y'],this[_0x907d2d(0x85c)][_0x907d2d(0x4c5)]),this['opacity']=this['applyCoreEasing'](this[_0x907d2d(0x716)],this[_0x907d2d(0x85c)]['targetOpacity']),this[_0x907d2d(0x6d1)]=this['applyCoreEasing'](this['backOpacity'],this[_0x907d2d(0x85c)][_0x907d2d(0x118)]),this['contentsOpacity']=this['applyCoreEasing'](this[_0x907d2d(0x24b)],this['_coreEasing'][_0x907d2d(0x8ee)]),this[_0x907d2d(0x85c)]['duration']--;},Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x312)]=function(_0x2e1c45,_0x3448d8){const _0xb0d45=_0x2a56e3;if(!this[_0xb0d45(0x85c)])return _0x3448d8;const _0x4127f0=this['_coreEasing'][_0xb0d45(0x6a9)],_0xec0dac=this[_0xb0d45(0x85c)][_0xb0d45(0x4e0)],_0x4f1ae9=this[_0xb0d45(0x49e)]((_0xec0dac-_0x4127f0)/_0xec0dac),_0x3e8f7c=this[_0xb0d45(0x49e)]((_0xec0dac-_0x4127f0+0x1)/_0xec0dac),_0x164614=(_0x2e1c45-_0x3448d8*_0x4f1ae9)/(0x1-_0x4f1ae9);return _0x164614+(_0x3448d8-_0x164614)*_0x3e8f7c;},Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x49e)]=function(_0x48be24){const _0x432e93=_0x2a56e3;if(!this['_coreEasing'])return _0x48be24;return VisuMZ[_0x432e93(0x709)](_0x48be24,this[_0x432e93(0x85c)][_0x432e93(0x2ab)]||_0x432e93(0x16f));},Window_Base[_0x2a56e3(0x948)]['anchorCoreEasing']=function(_0x55bb71,_0x11c5e4){const _0x3e0a37=_0x2a56e3;if(!this[_0x3e0a37(0x85c)])return;this['x']=this[_0x3e0a37(0x85c)][_0x3e0a37(0x51e)],this['y']=this[_0x3e0a37(0x85c)]['targetY'],this[_0x3e0a37(0x8ad)]['x']=this['_coreEasing'][_0x3e0a37(0x328)],this['scale']['y']=this[_0x3e0a37(0x85c)][_0x3e0a37(0x4c5)],this[_0x3e0a37(0x716)]=this['_coreEasing'][_0x3e0a37(0x900)],this['backOpacity']=this[_0x3e0a37(0x85c)][_0x3e0a37(0x118)],this['contentsOpacity']=this[_0x3e0a37(0x85c)][_0x3e0a37(0x8ee)],this[_0x3e0a37(0x159)](_0x55bb71,_0x11c5e4,this['x'],this['y'],this['scale']['x'],this[_0x3e0a37(0x8ad)]['y'],this[_0x3e0a37(0x716)],this[_0x3e0a37(0x6d1)],this[_0x3e0a37(0x24b)]);},Window_Base[_0x2a56e3(0x948)]['setupCoreEasing']=function(_0x24495e,_0x385395,_0x11951a,_0x2c738a,_0xecc71e,_0x349b1d,_0x153e97,_0x226500,_0x7422c6){const _0x2792c2=_0x2a56e3;this[_0x2792c2(0x85c)]={'duration':_0x24495e,'wholeDuration':_0x24495e,'type':_0x385395,'targetX':_0x11951a,'targetY':_0x2c738a,'targetScaleX':_0xecc71e,'targetScaleY':_0x349b1d,'targetOpacity':_0x153e97,'targetBackOpacity':_0x226500,'targetContentsOpacity':_0x7422c6};},Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x196)]=function(_0x380ec6,_0x395f39,_0x3464d2,_0x58c17c,_0x4d45f5){const _0x323ab7=_0x2a56e3;this[_0x323ab7(0x8e3)](),this[_0x323ab7(0x640)][_0x323ab7(0x1fa)]=VisuMZ[_0x323ab7(0x803)][_0x323ab7(0x3f7)][_0x323ab7(0x1cc)][_0x323ab7(0x2d2)];const _0x5303e8=VisuMZ[_0x323ab7(0x803)][_0x323ab7(0x3f7)][_0x323ab7(0x1cc)][_0x323ab7(0x826)];if(_0x5303e8>0x0&&_0x395f39===TextManager[_0x323ab7(0x5c6)]){const _0x543a1=_0x58c17c+(this['lineHeight']()-ImageManager[_0x323ab7(0x27e)])/0x2;this['drawIcon'](_0x5303e8,_0x3464d2+(_0x4d45f5-ImageManager[_0x323ab7(0x6cd)]),_0x543a1),_0x4d45f5-=ImageManager[_0x323ab7(0x6cd)]+0x4;}else{if(_0x323ab7(0x43d)!==_0x323ab7(0x43d)){const _0x4bed6d='_stored_tpGaugeColor2';this[_0x323ab7(0x853)]=this[_0x323ab7(0x853)]||{};if(this[_0x323ab7(0x853)][_0x4bed6d])return this[_0x323ab7(0x853)][_0x4bed6d];const _0x49c172=_0x496ba2['CoreEngine'][_0x323ab7(0x3f7)]['Color']['ColorTPGauge2'];return this['getColorDataFromPluginParameters'](_0x4bed6d,_0x49c172);}else this[_0x323ab7(0x89d)](ColorManager[_0x323ab7(0x920)]()),this['drawText'](_0x395f39,_0x3464d2,_0x58c17c,_0x4d45f5,_0x323ab7(0x179)),_0x4d45f5-=this[_0x323ab7(0x2c7)](_0x395f39)+0x6;}this[_0x323ab7(0x602)]();const _0x3b356a=this[_0x323ab7(0x2c7)](this[_0x323ab7(0x397)]?VisuMZ['GroupDigits'](_0x380ec6):_0x380ec6);_0x3b356a>_0x4d45f5?this[_0x323ab7(0x21a)](VisuMZ['CoreEngine'][_0x323ab7(0x3f7)][_0x323ab7(0x1cc)][_0x323ab7(0x5b3)],_0x3464d2,_0x58c17c,_0x4d45f5,_0x323ab7(0x179)):this['drawText'](_0x380ec6,_0x3464d2,_0x58c17c,_0x4d45f5,_0x323ab7(0x179)),this[_0x323ab7(0x8e3)]();},Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x4c3)]=function(_0x28b81d,_0x33a7ab,_0x87093d,_0x1b2c2a,_0x2b2c98){const _0x12126b=_0x2a56e3,_0x20c4ee=ImageManager[_0x12126b(0x700)](_0x12126b(0x9ae)),_0x59750e=ImageManager[_0x12126b(0x6cd)],_0x2bc986=ImageManager[_0x12126b(0x27e)],_0x2e81e8=_0x28b81d%0x10*_0x59750e,_0x35701a=Math[_0x12126b(0x6ad)](_0x28b81d/0x10)*_0x2bc986,_0x16c2ec=_0x1b2c2a,_0xee82e5=_0x1b2c2a;this[_0x12126b(0x640)][_0x12126b(0x4dd)][_0x12126b(0x986)]=_0x2b2c98,this['contents']['blt'](_0x20c4ee,_0x2e81e8,_0x35701a,_0x59750e,_0x2bc986,_0x33a7ab,_0x87093d,_0x16c2ec,_0xee82e5),this[_0x12126b(0x640)][_0x12126b(0x4dd)][_0x12126b(0x986)]=!![];},Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x98f)]=function(_0x747129,_0x21c2f9,_0x46786f,_0x57b165,_0xa2ebca,_0x472229){const _0x2d67b7=_0x2a56e3,_0x12138e=Math['floor']((_0x46786f-0x2)*_0x57b165),_0x593265=Sprite_Gauge[_0x2d67b7(0x948)][_0x2d67b7(0x2ec)]['call'](this),_0xa29b8c=_0x21c2f9+this[_0x2d67b7(0x5c9)]()-_0x593265-0x2;this['contents'][_0x2d67b7(0x5e6)](_0x747129,_0xa29b8c,_0x46786f,_0x593265,ColorManager[_0x2d67b7(0x3bb)]()),this[_0x2d67b7(0x640)][_0x2d67b7(0x3d8)](_0x747129+0x1,_0xa29b8c+0x1,_0x12138e,_0x593265-0x2,_0xa2ebca,_0x472229);},Window_Selectable[_0x2a56e3(0x948)][_0x2a56e3(0x521)]=function(_0x1fe0c3){const _0x1d9ae6=_0x2a56e3;let _0x314080=this[_0x1d9ae6(0x125)]();const _0x2c8ef0=this[_0x1d9ae6(0x571)](),_0x51a926=this[_0x1d9ae6(0x28a)]();if(this['isUseModernControls']()&&(_0x314080<_0x2c8ef0||_0x1fe0c3&&_0x51a926===0x1)){_0x314080+=_0x51a926;if(_0x314080>=_0x2c8ef0)_0x314080=_0x2c8ef0-0x1;this['smoothSelect'](_0x314080);}else{if(!this[_0x1d9ae6(0x341)]()){if(_0x314080<_0x2c8ef0-_0x51a926||_0x1fe0c3&&_0x51a926===0x1){if(_0x1d9ae6(0x987)===_0x1d9ae6(0x63b)){_0x43513b=_0x506b79||0xa8,this[_0x1d9ae6(0x602)]();if(_0x4f3d95[_0x1d9ae6(0x803)]['Settings']['UI']['TextCodeClassNames'])this['drawTextEx'](_0x20cfa5[_0x1d9ae6(0x1e5)]()[_0x1d9ae6(0x6f5)],_0x403770,_0x2e3a8d,_0x4c6191);else{const _0x29b9a9=_0x5d4522[_0x1d9ae6(0x1e5)]()[_0x1d9ae6(0x6f5)][_0x1d9ae6(0x725)](/\\I\[(\d+)\]/gi,'');this[_0x1d9ae6(0x21a)](_0x29b9a9,_0x4b61a5,_0x55e59e,_0x42bf33);}}else this['smoothSelect']((_0x314080+_0x51a926)%_0x2c8ef0);}}}},VisuMZ[_0x2a56e3(0x803)]['Window_Selectable_cursorDown']=Window_Selectable['prototype']['cursorDown'],Window_Selectable[_0x2a56e3(0x948)][_0x2a56e3(0x521)]=function(_0x23ee9f){const _0x3267cb=_0x2a56e3;this[_0x3267cb(0x341)]()&&_0x23ee9f&&this[_0x3267cb(0x28a)]()===0x1&&this['index']()===this['maxItems']()-0x1?this['smoothSelect'](0x0):VisuMZ[_0x3267cb(0x803)][_0x3267cb(0x507)][_0x3267cb(0x697)](this,_0x23ee9f);},Window_Selectable['prototype'][_0x2a56e3(0x6a5)]=function(_0x54ac43){const _0x57eb30=_0x2a56e3;let _0x514e7a=Math[_0x57eb30(0x81b)](0x0,this[_0x57eb30(0x125)]());const _0x4b309b=this[_0x57eb30(0x571)](),_0x8b0a5a=this[_0x57eb30(0x28a)]();if(this[_0x57eb30(0x341)]()&&_0x514e7a>0x0||_0x54ac43&&_0x8b0a5a===0x1){_0x514e7a-=_0x8b0a5a;if(_0x514e7a<=0x0)_0x514e7a=0x0;this[_0x57eb30(0x317)](_0x514e7a);}else{if(!this[_0x57eb30(0x341)]()){if(_0x514e7a>=_0x8b0a5a||_0x54ac43&&_0x8b0a5a===0x1){if('ecGsz'!==_0x57eb30(0x551))this[_0x57eb30(0x317)]((_0x514e7a-_0x8b0a5a+_0x4b309b)%_0x4b309b);else{_0x273999-=_0x54a6f1;if(_0x11aae4<=0x0)_0x35c072=0x0;this[_0x57eb30(0x317)](_0x44912e);}}}}},VisuMZ['CoreEngine'][_0x2a56e3(0x549)]=Window_Selectable[_0x2a56e3(0x948)][_0x2a56e3(0x6a5)],Window_Selectable[_0x2a56e3(0x948)]['cursorUp']=function(_0x2f7f49){const _0x71a896=_0x2a56e3;if(this[_0x71a896(0x341)]()&&_0x2f7f49&&this[_0x71a896(0x28a)]()===0x1&&this[_0x71a896(0x125)]()===0x0){if('tdqdB'!==_0x71a896(0x32e)){const _0x1e0942=_0xf1418b[_0x71a896(0x290)]-_0x1164cc['boxWidth']-_0x19fb81['CoreEngine'][_0x71a896(0x3f7)]['UI'][_0x71a896(0x126)]*0x2,_0x1408a3=_0x14c67b[_0x71a896(0x948)][_0x71a896(0x189)][_0x71a896(0x697)](this)*0x4;if(_0x1e0942>=_0x1408a3)_0x19a5fd['setSideButtonLayout'](!![]);}else this[_0x71a896(0x317)](this[_0x71a896(0x571)]()-0x1);}else{if('vTILk'!=='vTILk'){_0x38ef25['prototype'][_0x71a896(0x1cd)][_0x71a896(0x697)](this),this[_0x71a896(0x430)]();if(this[_0x71a896(0x418)])this['updateMotion']();else this[_0x71a896(0x760)]!==''&&(this[_0x71a896(0x760)]='');}else VisuMZ[_0x71a896(0x803)]['Window_Selectable_cursorUp'][_0x71a896(0x697)](this,_0x2f7f49);}},Window_Selectable[_0x2a56e3(0x948)][_0x2a56e3(0x341)]=function(){const _0x1ea8d2=_0x2a56e3;return VisuMZ[_0x1ea8d2(0x803)][_0x1ea8d2(0x3f7)][_0x1ea8d2(0x2fc)][_0x1ea8d2(0x200)];},VisuMZ[_0x2a56e3(0x803)]['Window_Selectable_processCursorMove']=Window_Selectable[_0x2a56e3(0x948)]['processCursorMove'],Window_Selectable['prototype'][_0x2a56e3(0x4f7)]=function(){const _0x56b826=_0x2a56e3;this['isUseModernControls']()?(this['processCursorMoveModernControls'](),this[_0x56b826(0x829)]()):VisuMZ[_0x56b826(0x803)][_0x56b826(0x20a)][_0x56b826(0x697)](this);},Window_Selectable[_0x2a56e3(0x948)][_0x2a56e3(0x40e)]=function(){return!![];},Window_Selectable[_0x2a56e3(0x948)][_0x2a56e3(0x86a)]=function(){const _0x2556d0=_0x2a56e3;if(this['isCursorMovable']()){if('fGQjm'==='riUZM')this[_0x2556d0(0x4c4)][_0x2556d0(0x7a2)](_0x41d4c9[_0x2556d0(0x7c9)]['ActorBgType']);else{const _0x1b6b7a=this['index']();Input['isRepeated'](_0x2556d0(0x882))&&(Input[_0x2556d0(0x2a1)](_0x2556d0(0x6fd))&&this[_0x2556d0(0x40e)]()?this['cursorPagedown']():this[_0x2556d0(0x521)](Input[_0x2556d0(0x350)](_0x2556d0(0x882))));Input[_0x2556d0(0x12e)]('up')&&(Input[_0x2556d0(0x2a1)]('shift')&&this['allowShiftScrolling']()?this[_0x2556d0(0x4b0)]():this[_0x2556d0(0x6a5)](Input['isTriggered']('up')));if(Input[_0x2556d0(0x12e)]('right')){if(_0x2556d0(0x967)==='HZQLm')this[_0x2556d0(0x3bf)](Input[_0x2556d0(0x350)](_0x2556d0(0x179)));else{const _0x229925=_0x383ca8[_0x1c5a3e[_0x2556d0(0x737)]],_0x5b4e95=_0x3e87ad[_0x2556d0(0x15b)],_0x4e77e4=_0x246fd1['mirror'],_0x39d9e0=_0x8f967['mute'];let _0x597175=this[_0x2556d0(0x785)]();const _0x38696f=this[_0x2556d0(0x258)]();if(this['isAnimationForEach'](_0x229925))for(const _0x283892 of _0x5b4e95){this[_0x2556d0(0x58d)]([_0x283892],_0x229925,_0x4e77e4,_0x597175,_0x39d9e0),_0x597175+=_0x38696f;}else this['createFauxAnimationSprite'](_0x5b4e95,_0x229925,_0x4e77e4,_0x597175,_0x39d9e0);}}Input['isRepeated'](_0x2556d0(0x58e))&&this[_0x2556d0(0x416)](Input[_0x2556d0(0x350)](_0x2556d0(0x58e))),!this['isHandled'](_0x2556d0(0x465))&&Input[_0x2556d0(0x12e)](_0x2556d0(0x465))&&this[_0x2556d0(0x66d)](),!this[_0x2556d0(0x893)](_0x2556d0(0x81a))&&Input[_0x2556d0(0x12e)](_0x2556d0(0x81a))&&(_0x2556d0(0x7d8)!==_0x2556d0(0x7d8)?(_0x20dd54[_0x2556d0(0x4a6)](_0x46b335['EQUAL'],0x0,~0x0),_0x32e98f[_0x2556d0(0x325)](_0xc6122e[_0x2556d0(0x687)],_0xa63bb4[_0x2556d0(0x687)],_0x5cd2e0[_0x2556d0(0x687)]),_0x3f4fc5[_0x2556d0(0x69a)](_0x4df840),_0xd3dd8f[_0x2556d0(0x6d5)]['flush'](),_0x2177db[_0x2556d0(0x3a9)](),_0x188094[_0x2556d0(0x4a6)](_0x551f48[_0x2556d0(0x7b0)],0x1,~0x0),_0x387aa7[_0x2556d0(0x325)](_0x56f93f['REPLACE'],_0x229663['REPLACE'],_0xc572e2[_0x2556d0(0x66a)]),_0x443735[_0x2556d0(0x835)](_0x2c526a['ZERO'],_0x587040[_0x2556d0(0x3ee)]),_0x5c5e30[_0x2556d0(0x69a)](_0x535b02),_0x2b4236[_0x2556d0(0x6d5)][_0x2556d0(0x6c3)](),_0x4bee48[_0x2556d0(0x835)](_0x55b108['ONE'],_0x14b2a2[_0x2556d0(0x2d0)])):this[_0x2556d0(0x4b0)]()),this['index']()!==_0x1b6b7a&&this[_0x2556d0(0x2f5)]();}}},Window_Selectable[_0x2a56e3(0x948)][_0x2a56e3(0x829)]=function(){const _0x3363b2=_0x2a56e3;if(this[_0x3363b2(0x3cf)]()){const _0x4cb747=this[_0x3363b2(0x125)]();Input[_0x3363b2(0x350)](_0x3363b2(0x9a8))&&this[_0x3363b2(0x317)](Math['min'](this[_0x3363b2(0x125)](),0x0)),Input[_0x3363b2(0x350)](_0x3363b2(0x8ca))&&this[_0x3363b2(0x317)](Math['max'](this[_0x3363b2(0x125)](),this[_0x3363b2(0x571)]()-0x1)),this[_0x3363b2(0x125)]()!==_0x4cb747&&this[_0x3363b2(0x2f5)]();}},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x52b)]=Window_Selectable[_0x2a56e3(0x948)][_0x2a56e3(0x493)],Window_Selectable[_0x2a56e3(0x948)]['processTouch']=function(){const _0x4506c5=_0x2a56e3;if(this[_0x4506c5(0x341)]())this['processTouchModernControls']();else{if(_0x4506c5(0x313)!==_0x4506c5(0x9bc))VisuMZ['CoreEngine'][_0x4506c5(0x52b)][_0x4506c5(0x697)](this);else{if(_0x39d3f0[_0x4506c5(0x749)][_0x4506c5(0x697)](this)){const _0x7c03dd=_0x1e7f3e[_0x4506c5(0x84a)];let _0x35ab8b=_0x66f97a['TextStr'];if(['',_0x4506c5(0x456)][_0x4506c5(0x559)](_0x35ab8b))_0x35ab8b=_0x59b359[_0x4506c5(0x7e3)][_0x4506c5(0x697)](this);const _0x3ccafa=_0x1c6465[_0x4506c5(0x82a)][_0x4506c5(0x697)](this),_0x8fc742=_0x6522db[_0x4506c5(0x64d)][_0x4506c5(0x697)](this);this[_0x4506c5(0x4e2)](_0x35ab8b,_0x7c03dd,_0x3ccafa,_0x8fc742),this[_0x4506c5(0x137)](_0x7c03dd,_0x168e65[_0x4506c5(0x338)][_0x4506c5(0x63d)](this,_0x8fc742));}}}},Window_Selectable[_0x2a56e3(0x948)][_0x2a56e3(0x8e6)]=function(){const _0x5df7ea=_0x2a56e3;VisuMZ[_0x5df7ea(0x803)]['Window_Selectable_processTouch'][_0x5df7ea(0x697)](this);},Window_Selectable['prototype'][_0x2a56e3(0x7d2)]=function(){const _0x11998f=_0x2a56e3;return VisuMZ[_0x11998f(0x803)][_0x11998f(0x3f7)][_0x11998f(0x431)]['ColSpacing'];},Window_Selectable['prototype'][_0x2a56e3(0x676)]=function(){const _0x558fca=_0x2a56e3;return VisuMZ[_0x558fca(0x803)]['Settings'][_0x558fca(0x431)][_0x558fca(0x239)];},Window_Selectable[_0x2a56e3(0x948)][_0x2a56e3(0x272)]=function(){const _0x577f3a=_0x2a56e3;return Window_Scrollable[_0x577f3a(0x948)][_0x577f3a(0x272)][_0x577f3a(0x697)](this)+VisuMZ[_0x577f3a(0x803)][_0x577f3a(0x3f7)]['Window'][_0x577f3a(0x193)];;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x2ae)]=Window_Selectable[_0x2a56e3(0x948)]['drawBackgroundRect'],Window_Selectable[_0x2a56e3(0x948)]['drawBackgroundRect']=function(_0x2c749c){const _0x25ea4e=_0x2a56e3,_0x4d98d7=VisuMZ['CoreEngine'][_0x25ea4e(0x3f7)][_0x25ea4e(0x431)];if(_0x4d98d7[_0x25ea4e(0x9a7)]===![])return;if(_0x4d98d7[_0x25ea4e(0x42a)]){if(_0x25ea4e(0x68f)===_0x25ea4e(0x68f))_0x4d98d7[_0x25ea4e(0x42a)][_0x25ea4e(0x697)](this,_0x2c749c);else{const _0x152cb2=_0x25ea4e(0x833);this[_0x25ea4e(0x853)]=this[_0x25ea4e(0x853)]||{};if(this[_0x25ea4e(0x853)][_0x152cb2])return this[_0x25ea4e(0x853)][_0x152cb2];const _0x1ae186=_0x2d5118[_0x25ea4e(0x803)][_0x25ea4e(0x3f7)][_0x25ea4e(0x784)][_0x25ea4e(0x7ea)];return this[_0x25ea4e(0x70c)](_0x152cb2,_0x1ae186);}}else VisuMZ[_0x25ea4e(0x803)][_0x25ea4e(0x2ae)][_0x25ea4e(0x697)](this,_0x2c749c);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x814)]=Window_Gold['prototype'][_0x2a56e3(0x5fe)],Window_Gold[_0x2a56e3(0x948)][_0x2a56e3(0x5fe)]=function(){const _0x5915f3=_0x2a56e3;if(this[_0x5915f3(0x61c)]()){if(_0x5915f3(0x35a)!=='fteNN')this[_0x5915f3(0x90f)]();else for(const _0x7c26a in _0x305b60){const _0x515f16=_0x1e568d[_0x7c26a];_0x515f16[_0x5915f3(0x6f5)][_0x5915f3(0x76d)](/(.*)\/(.*)/i)&&(_0x515f16['name']=_0x4a33ea(_0x397d8f['$2'][_0x5915f3(0x74d)]()));}}else _0x5915f3(0x7c8)!==_0x5915f3(0x443)?VisuMZ[_0x5915f3(0x803)][_0x5915f3(0x814)][_0x5915f3(0x697)](this):this[_0x5915f3(0x148)]='SV';},Window_Gold[_0x2a56e3(0x948)][_0x2a56e3(0x61c)]=function(){const _0x31deee=_0x2a56e3;if(TextManager[_0x31deee(0x5c6)]!==this['currencyUnit']())return![];return VisuMZ[_0x31deee(0x803)][_0x31deee(0x3f7)][_0x31deee(0x1cc)]['ItemStyle'];},Window_Gold['prototype']['drawGoldItemStyle']=function(){const _0x5fdd3e=_0x2a56e3;this['resetFontSettings'](),this['contents']['clear'](),this[_0x5fdd3e(0x640)][_0x5fdd3e(0x1fa)]=VisuMZ[_0x5fdd3e(0x803)][_0x5fdd3e(0x3f7)][_0x5fdd3e(0x1cc)][_0x5fdd3e(0x2d2)];const _0x2a58b4=VisuMZ[_0x5fdd3e(0x803)]['Settings']['Gold'][_0x5fdd3e(0x826)],_0x244f98=this[_0x5fdd3e(0x522)](0x0);if(_0x2a58b4>0x0){const _0x3e8db8=_0x244f98['y']+(this['lineHeight']()-ImageManager['iconHeight'])/0x2;this[_0x5fdd3e(0x7a0)](_0x2a58b4,_0x244f98['x'],_0x3e8db8);const _0xf1fe92=ImageManager['iconWidth']+0x4;_0x244f98['x']+=_0xf1fe92,_0x244f98[_0x5fdd3e(0x290)]-=_0xf1fe92;}this[_0x5fdd3e(0x89d)](ColorManager[_0x5fdd3e(0x920)]()),this[_0x5fdd3e(0x21a)](this[_0x5fdd3e(0x5c6)](),_0x244f98['x'],_0x244f98['y'],_0x244f98['width'],_0x5fdd3e(0x58e));const _0x4383ec=this[_0x5fdd3e(0x2c7)](this[_0x5fdd3e(0x5c6)]())+0x6;;_0x244f98['x']+=_0x4383ec,_0x244f98[_0x5fdd3e(0x290)]-=_0x4383ec,this[_0x5fdd3e(0x602)]();const _0x1d2ae4=this['value'](),_0x845901=this[_0x5fdd3e(0x2c7)](this[_0x5fdd3e(0x397)]?VisuMZ[_0x5fdd3e(0x85a)](this['value']()):this[_0x5fdd3e(0x7f0)]());_0x845901>_0x244f98['width']?_0x5fdd3e(0x68c)===_0x5fdd3e(0x694)?(_0x1506e5[_0x5fdd3e(0x3a9)](),this[_0x5fdd3e(0x26e)]()):this[_0x5fdd3e(0x21a)](VisuMZ[_0x5fdd3e(0x803)][_0x5fdd3e(0x3f7)]['Gold'][_0x5fdd3e(0x5b3)],_0x244f98['x'],_0x244f98['y'],_0x244f98[_0x5fdd3e(0x290)],_0x5fdd3e(0x179)):this[_0x5fdd3e(0x21a)](this[_0x5fdd3e(0x7f0)](),_0x244f98['x'],_0x244f98['y'],_0x244f98[_0x5fdd3e(0x290)],_0x5fdd3e(0x179)),this[_0x5fdd3e(0x8e3)]();},Window_StatusBase[_0x2a56e3(0x948)][_0x2a56e3(0x520)]=function(_0x546dcd,_0x5c3b57,_0x1acec2,_0x257b09,_0x276dd1){const _0x1f8e3c=_0x2a56e3;_0x257b09=String(_0x257b09||'')[_0x1f8e3c(0x67c)]();if(VisuMZ[_0x1f8e3c(0x803)][_0x1f8e3c(0x3f7)][_0x1f8e3c(0x4b7)][_0x1f8e3c(0x2c3)]){const _0x5cbbac=VisuMZ[_0x1f8e3c(0x7fb)](_0x257b09);_0x276dd1?(this[_0x1f8e3c(0x4c3)](_0x5cbbac,_0x546dcd,_0x5c3b57,this[_0x1f8e3c(0x11a)]()),_0x1acec2-=this[_0x1f8e3c(0x11a)]()+0x2,_0x546dcd+=this[_0x1f8e3c(0x11a)]()+0x2):(this[_0x1f8e3c(0x7a0)](_0x5cbbac,_0x546dcd+0x2,_0x5c3b57+0x2),_0x1acec2-=ImageManager[_0x1f8e3c(0x6cd)]+0x4,_0x546dcd+=ImageManager[_0x1f8e3c(0x6cd)]+0x4);}const _0x5d5e58=TextManager[_0x1f8e3c(0x53e)](_0x257b09);this[_0x1f8e3c(0x8e3)](),this[_0x1f8e3c(0x89d)](ColorManager[_0x1f8e3c(0x920)]()),_0x276dd1?_0x1f8e3c(0x880)!==_0x1f8e3c(0x880)?(this['centerCameraCheckData']()[_0x1f8e3c(0x3b6)]=!![],this['centerCameraCheckData']()[_0x1f8e3c(0x992)]=_0x5f08fc(_0x3bac11['$1'])):(this[_0x1f8e3c(0x640)][_0x1f8e3c(0x1fa)]=this[_0x1f8e3c(0x4f8)](),this[_0x1f8e3c(0x640)]['drawText'](_0x5d5e58,_0x546dcd,_0x5c3b57,_0x1acec2,this['gaugeLineHeight'](),_0x1f8e3c(0x58e))):_0x1f8e3c(0x122)===_0x1f8e3c(0x122)?this[_0x1f8e3c(0x21a)](_0x5d5e58,_0x546dcd,_0x5c3b57,_0x1acec2):this[_0x1f8e3c(0x246)][_0x1f8e3c(0x7a2)](_0x518c62['layoutSettings'][_0x1f8e3c(0x366)]),this[_0x1f8e3c(0x8e3)]();},Window_StatusBase[_0x2a56e3(0x948)][_0x2a56e3(0x4f8)]=function(){const _0x4f98a0=_0x2a56e3;return $gameSystem[_0x4f98a0(0x595)]()-0x8;},Window_StatusBase[_0x2a56e3(0x948)][_0x2a56e3(0x349)]=function(_0x366631,_0x36c5fc,_0x475183,_0x42338e){const _0x1d1dd7=_0x2a56e3;_0x42338e=_0x42338e||0xa8,this[_0x1d1dd7(0x602)]();if(VisuMZ[_0x1d1dd7(0x803)][_0x1d1dd7(0x3f7)]['UI'][_0x1d1dd7(0x6d7)]){if('jObtN'!==_0x1d1dd7(0x7e5))return _0x3b6f9e[_0x1d1dd7(0x803)][_0x1d1dd7(0x3f7)][_0x1d1dd7(0x431)]['LineHeight'];else this[_0x1d1dd7(0x234)](_0x366631[_0x1d1dd7(0x1e5)]()[_0x1d1dd7(0x6f5)],_0x36c5fc,_0x475183,_0x42338e);}else{if(_0x1d1dd7(0x69c)!==_0x1d1dd7(0x69c)){if(this[_0x1d1dd7(0x97a)][_0x1d1dd7(0x95b)])this['_scene'][_0x1d1dd7(0x95b)][_0x1d1dd7(0x5fe)]();if(this[_0x1d1dd7(0x97a)][_0x1d1dd7(0x6c2)])this[_0x1d1dd7(0x97a)][_0x1d1dd7(0x6c2)][_0x1d1dd7(0x5fe)]();}else{const _0x5e4ddc=_0x366631['currentClass']()[_0x1d1dd7(0x6f5)][_0x1d1dd7(0x725)](/\\I\[(\d+)\]/gi,'');this[_0x1d1dd7(0x21a)](_0x5e4ddc,_0x36c5fc,_0x475183,_0x42338e);}}},Window_StatusBase['prototype'][_0x2a56e3(0x61d)]=function(_0x11f2bf,_0x52eda0,_0x3e9d04,_0x32f6a9){const _0x1958f9=_0x2a56e3;_0x32f6a9=_0x32f6a9||0x10e,this[_0x1958f9(0x602)]();if(VisuMZ['CoreEngine'][_0x1958f9(0x3f7)]['UI']['TextCodeNicknames'])this['drawTextEx'](_0x11f2bf[_0x1958f9(0x4a2)](),_0x52eda0,_0x3e9d04,_0x32f6a9);else{if(_0x1958f9(0x362)!=='HPbNY'){const _0x488c02=_0x11f2bf['nickname']()[_0x1958f9(0x725)](/\\I\[(\d+)\]/gi,'');this[_0x1958f9(0x21a)](_0x11f2bf[_0x1958f9(0x4a2)](),_0x52eda0,_0x3e9d04,_0x32f6a9);}else for(const _0x227021 of this['_fauxAnimationSprites']){this[_0x1958f9(0x7b6)](_0x227021);}}},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x66f)]=Window_StatusBase['prototype']['drawActorLevel'],Window_StatusBase[_0x2a56e3(0x948)][_0x2a56e3(0x2a3)]=function(_0x5d5f9e,_0x4c0253,_0x10b33a){const _0x24747b=_0x2a56e3;if(VisuMZ[_0x24747b(0x803)][_0x24747b(0x3f7)][_0x24747b(0x4b7)][_0x24747b(0x7b2)]===![])return;if(this[_0x24747b(0x611)]())this['drawActorExpGauge'](_0x5d5f9e,_0x4c0253,_0x10b33a);VisuMZ['CoreEngine']['Window_StatusBase_drawActorLevel'][_0x24747b(0x697)](this,_0x5d5f9e,_0x4c0253,_0x10b33a);},Window_StatusBase[_0x2a56e3(0x948)][_0x2a56e3(0x611)]=function(){const _0x21ce3a=_0x2a56e3;return VisuMZ[_0x21ce3a(0x803)]['Settings']['UI'][_0x21ce3a(0x98d)];},Window_StatusBase[_0x2a56e3(0x948)][_0x2a56e3(0x310)]=function(_0x19bdfb,_0x2e4299,_0x543aea){const _0x110af6=_0x2a56e3;if(!_0x19bdfb)return;if(!_0x19bdfb['isActor']())return;const _0x414059=0x80,_0x470c7d=_0x19bdfb['expRate']();let _0xee4a19=ColorManager[_0x110af6(0x625)](),_0x2feaf2=ColorManager[_0x110af6(0x720)]();_0x470c7d>=0x1&&(_0x110af6(0x24a)!==_0x110af6(0x24a)?this[_0x110af6(0x51b)]():(_0xee4a19=ColorManager[_0x110af6(0x8d2)](),_0x2feaf2=ColorManager['maxLvGaugeColor2']())),this[_0x110af6(0x98f)](_0x2e4299,_0x543aea,_0x414059,_0x470c7d,_0xee4a19,_0x2feaf2);},Window_EquipStatus['prototype'][_0x2a56e3(0x3cc)]=function(){const _0x48f3c5=_0x2a56e3;let _0x454895=0x0;for(const _0xadb4b9 of VisuMZ['CoreEngine']['Settings'][_0x48f3c5(0x4b7)][_0x48f3c5(0x97e)]){const _0x1ef0c1=this[_0x48f3c5(0x138)](),_0x2c1f92=this[_0x48f3c5(0x3fb)](_0x454895);this['drawItem'](_0x1ef0c1,_0x2c1f92,_0xadb4b9),_0x454895++;}},Window_EquipStatus[_0x2a56e3(0x948)][_0x2a56e3(0x80c)]=function(_0x2ed416,_0x5f1aef,_0x3cb4dc){const _0x4d220e=_0x2a56e3,_0x167382=this[_0x4d220e(0x1fb)]()-this[_0x4d220e(0x138)]()*0x2;this[_0x4d220e(0x520)](_0x2ed416,_0x5f1aef,_0x167382,_0x3cb4dc,![]);},Window_EquipStatus['prototype'][_0x2a56e3(0x231)]=function(_0x10e349,_0xaa2896,_0x20b510){const _0x496f92=_0x2a56e3,_0x41e8ec=this['paramWidth']();this[_0x496f92(0x602)](),this['drawText'](this[_0x496f92(0x418)][_0x496f92(0x5d3)](_0x20b510,!![]),_0x10e349,_0xaa2896,_0x41e8ec,_0x496f92(0x179));},Window_EquipStatus['prototype'][_0x2a56e3(0x3aa)]=function(_0x44a065,_0x312c2f){const _0x249840=_0x2a56e3,_0x6b569=this[_0x249840(0x963)]();this[_0x249840(0x89d)](ColorManager[_0x249840(0x920)]());const _0x4b3c16=VisuMZ['CoreEngine'][_0x249840(0x3f7)]['UI'][_0x249840(0x3e3)];this['drawText'](_0x4b3c16,_0x44a065,_0x312c2f,_0x6b569,_0x249840(0x4e1));},Window_EquipStatus[_0x2a56e3(0x948)][_0x2a56e3(0x2a7)]=function(_0x598619,_0x2e5a38,_0x404bbc){const _0x120033=_0x2a56e3,_0x51472c=this[_0x120033(0x39d)](),_0x549171=this[_0x120033(0x36b)]['paramValueByName'](_0x404bbc),_0x16315=_0x549171-this[_0x120033(0x418)][_0x120033(0x5d3)](_0x404bbc);this[_0x120033(0x89d)](ColorManager[_0x120033(0x6e0)](_0x16315)),this[_0x120033(0x21a)](this['_tempActor']['paramValueByName'](_0x404bbc,!![]),_0x598619,_0x2e5a38,_0x51472c,'right');},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x91f)]=Window_EquipItem['prototype'][_0x2a56e3(0x209)],Window_EquipItem['prototype'][_0x2a56e3(0x209)]=function(_0x16cae5){const _0x507342=_0x2a56e3;if(_0x16cae5&&this[_0x507342(0x418)]){if('eALtC'!==_0x507342(0x48b))_0x2e447a['loadBitmap'](_0x235c31,_0x302ee7);else return this[_0x507342(0x418)]['canEquip'](_0x16cae5);}else{if(_0x507342(0x2fd)!==_0x507342(0x2fd))this['hideButtonFromView']();else return VisuMZ[_0x507342(0x803)][_0x507342(0x91f)][_0x507342(0x697)](this,_0x16cae5);}},Window_StatusParams[_0x2a56e3(0x948)][_0x2a56e3(0x571)]=function(){const _0x3a872c=_0x2a56e3;return VisuMZ[_0x3a872c(0x803)][_0x3a872c(0x3f7)]['Param'][_0x3a872c(0x97e)][_0x3a872c(0x9b5)];},Window_StatusParams[_0x2a56e3(0x948)][_0x2a56e3(0x1c3)]=function(_0x5b3fc3){const _0xc389bf=_0x2a56e3,_0x112d31=this[_0xc389bf(0x522)](_0x5b3fc3),_0x36cad7=VisuMZ['CoreEngine'][_0xc389bf(0x3f7)][_0xc389bf(0x4b7)][_0xc389bf(0x97e)][_0x5b3fc3],_0x133200=TextManager[_0xc389bf(0x53e)](_0x36cad7),_0x1b5239=this[_0xc389bf(0x418)][_0xc389bf(0x5d3)](_0x36cad7,!![]);this[_0xc389bf(0x520)](_0x112d31['x'],_0x112d31['y'],0xa0,_0x36cad7,![]),this[_0xc389bf(0x602)](),this[_0xc389bf(0x21a)](_0x1b5239,_0x112d31['x']+0xa0,_0x112d31['y'],0x3c,_0xc389bf(0x179));};if(VisuMZ[_0x2a56e3(0x803)]['Settings'][_0x2a56e3(0x7c0)][_0x2a56e3(0x150)]){VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x3f7)][_0x2a56e3(0x7c0)][_0x2a56e3(0x6a3)]&&(Window_NameInput[_0x2a56e3(0x78f)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x2a56e3(0x526),'OK']);;VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x1f2)]=Window_NameInput['prototype'][_0x2a56e3(0x14c)],Window_NameInput[_0x2a56e3(0x948)][_0x2a56e3(0x14c)]=function(_0x5dbef5){const _0x1a256c=_0x2a56e3;this[_0x1a256c(0x4a1)]=this[_0x1a256c(0x9ab)](),VisuMZ[_0x1a256c(0x803)][_0x1a256c(0x1f2)][_0x1a256c(0x697)](this,_0x5dbef5);if(this['_mode']===_0x1a256c(0x3ac)){if('tpIgX'!==_0x1a256c(0x444))return 0.5*_0x59d22c['pow'](0x2,0xa*_0x33e46c);else this[_0x1a256c(0x590)](0x0);}else _0x1a256c(0x32a)===_0x1a256c(0x8c8)?this[_0x1a256c(0x82b)](_0x5bcab6):(Input['clear'](),this['deselect']());},Window_NameInput[_0x2a56e3(0x948)][_0x2a56e3(0x9ab)]=function(){const _0x45598f=_0x2a56e3;if(Input[_0x45598f(0x4b3)]())return _0x45598f(0x3ac);return VisuMZ['CoreEngine'][_0x45598f(0x3f7)][_0x45598f(0x7c0)]['DefaultMode']||_0x45598f(0x29d);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x3b1)]=Window_NameInput[_0x2a56e3(0x948)][_0x2a56e3(0x1ec)],Window_NameInput[_0x2a56e3(0x948)]['processHandling']=function(){const _0x1d2436=_0x2a56e3;if(!this['isOpen']())return;if(!this[_0x1d2436(0x270)])return;if(this[_0x1d2436(0x4a1)]==='keyboard'&&Input[_0x1d2436(0x131)]())'VnQbZ'===_0x1d2436(0x668)?this[_0x1d2436(0x5f9)](_0x1d2436(0x3ac)):this[_0x1d2436(0x41f)]=_0x266b8b;else{if(Input['isSpecialCode']('backspace'))Input[_0x1d2436(0x3a9)](),this[_0x1d2436(0x26e)]();else{if(Input[_0x1d2436(0x350)]('tab'))_0x1d2436(0x546)!==_0x1d2436(0x546)?(this[_0x1d2436(0x15a)]=new _0x2d079e['filters']['BlurFilter'](_0x8ff002=!![]),this[_0x1d2436(0x877)]=new _0xef6e27(),this[_0x1d2436(0x877)][_0x1d2436(0x65e)]=_0x4efb06[_0x1d2436(0x24f)](),this[_0x1d2436(0x877)][_0x1d2436(0x645)]=[this[_0x1d2436(0x15a)]],this['_baseSprite'][_0x1d2436(0x7bb)](this[_0x1d2436(0x877)])):(Input[_0x1d2436(0x3a9)](),this[_0x1d2436(0x4a1)]===_0x1d2436(0x29d)?this[_0x1d2436(0x5f9)](_0x1d2436(0x3ac)):'rjDBt'!==_0x1d2436(0x592)?this['switchModes'](_0x1d2436(0x29d)):this[_0x1d2436(0x341)]()?this['processTouchModernControls']():_0x34a438[_0x1d2436(0x803)][_0x1d2436(0x52b)][_0x1d2436(0x697)](this));else{if(this[_0x1d2436(0x4a1)]===_0x1d2436(0x29d))_0x1d2436(0x4df)===_0x1d2436(0x4df)?this[_0x1d2436(0x4c8)]():(_0x29dfcd[_0x1d2436(0x803)][_0x1d2436(0x5a8)][_0x1d2436(0x697)](this),this[_0x1d2436(0x925)]());else{if(Input[_0x1d2436(0x5c1)](_0x1d2436(0x78c))){if(_0x1d2436(0x5d5)===_0x1d2436(0x2cc))return 0x0;else Input[_0x1d2436(0x3a9)](),this[_0x1d2436(0x5f9)]('keyboard');}else _0x1d2436(0x5e0)===_0x1d2436(0x5e0)?VisuMZ[_0x1d2436(0x803)][_0x1d2436(0x3b1)][_0x1d2436(0x697)](this):(_0x4d4f47=_0x28351d[_0x1d2436(0x219)](_0x5bbe53),_0x4ba3c2['se']&&(_0x57db6['se'][_0x1d2436(0x16b)]=0x0));}}}}},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x686)]=Window_NameInput[_0x2a56e3(0x948)][_0x2a56e3(0x493)],Window_NameInput[_0x2a56e3(0x948)][_0x2a56e3(0x493)]=function(){const _0xb38557=_0x2a56e3;if(!this['isOpenAndActive']())return;if(this[_0xb38557(0x4a1)]===_0xb38557(0x29d)){if(_0xb38557(0x88f)===_0xb38557(0x91d))switch(_0x21ff6c[_0xb38557(0x803)][_0xb38557(0x3f7)][_0xb38557(0x2fc)][_0xb38557(0x722)]){case _0xb38557(0x74b):return!![];case _0xb38557(0x5f1):return![];default:return _0x28b760[_0xb38557(0x803)][_0xb38557(0x641)][_0xb38557(0x697)](this);}else{if(TouchInput[_0xb38557(0x350)]()&&this[_0xb38557(0x36a)]())this[_0xb38557(0x5f9)](_0xb38557(0x3ac));else TouchInput[_0xb38557(0x59b)]()&&this[_0xb38557(0x5f9)](_0xb38557(0x3ac));}}else{if(_0xb38557(0x846)==='vxWrO')VisuMZ[_0xb38557(0x803)][_0xb38557(0x686)][_0xb38557(0x697)](this);else{let _0x272542=this[_0xb38557(0x125)]();const _0x3d27df=this[_0xb38557(0x571)](),_0x5293ee=this[_0xb38557(0x28a)]();if(this[_0xb38557(0x341)]()&&(_0x272542<_0x3d27df||_0x5cc8ec&&_0x5293ee===0x1)){_0x272542+=_0x5293ee;if(_0x272542>=_0x3d27df)_0x272542=_0x3d27df-0x1;this['smoothSelect'](_0x272542);}else!this[_0xb38557(0x341)]()&&((_0x272542<_0x3d27df-_0x5293ee||_0x349537&&_0x5293ee===0x1)&&this['smoothSelect']((_0x272542+_0x5293ee)%_0x3d27df));}}},Window_NameInput[_0x2a56e3(0x948)][_0x2a56e3(0x4c8)]=function(){const _0x33a21b=_0x2a56e3;if(Input[_0x33a21b(0x5c1)](_0x33a21b(0x4de)))Input[_0x33a21b(0x3a9)](),this['onNameOk']();else{if(Input[_0x33a21b(0x60d)]!==undefined){let _0x1d27b6=Input[_0x33a21b(0x60d)],_0x477645=_0x1d27b6[_0x33a21b(0x9b5)];for(let _0xdb83c5=0x0;_0xdb83c5<_0x477645;++_0xdb83c5){_0x33a21b(0x2d3)===_0x33a21b(0x2d3)?this[_0x33a21b(0x86d)]['add'](_0x1d27b6[_0xdb83c5])?SoundManager[_0x33a21b(0x822)]():SoundManager['playBuzzer']():(this['bitmap']=_0x140a6b[_0x33a21b(0x74a)](this[_0x33a21b(0x22e)]['PictureFilename']),this[_0x33a21b(0x65e)]['addLoadListener'](this[_0x33a21b(0x573)][_0x33a21b(0x63d)](this)));}Input[_0x33a21b(0x3a9)]();}}},Window_NameInput[_0x2a56e3(0x948)][_0x2a56e3(0x5f9)]=function(_0x4b2dce){const _0x2cd895=_0x2a56e3;let _0x3cdca0=this[_0x2cd895(0x4a1)];this['_mode']=_0x4b2dce;if(_0x3cdca0!==this[_0x2cd895(0x4a1)]){if(_0x2cd895(0x393)===_0x2cd895(0x393)){this[_0x2cd895(0x5fe)](),SoundManager['playOk']();if(this[_0x2cd895(0x4a1)]===_0x2cd895(0x3ac))_0x2cd895(0x533)!==_0x2cd895(0x533)?_0x47e428[_0x2cd895(0x85d)](_0x2a6d5e):this[_0x2cd895(0x590)](0x0);else{if('QXGUm'!=='QXGUm'){if(this['_CoreEngineSettings']===_0x13c7f7)this[_0x2cd895(0x2d6)]();if(this[_0x2cd895(0x472)][_0x2cd895(0x1e6)]===_0x9f8d60)this[_0x2cd895(0x2d6)]();return this[_0x2cd895(0x472)]['Padding'];}else this[_0x2cd895(0x590)](-0x1);}}else _0x4cf20e[_0x2cd895(0x3e7)](_0x226b15);}},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x326)]=Window_NameInput[_0x2a56e3(0x948)]['cursorDown'],Window_NameInput[_0x2a56e3(0x948)]['cursorDown']=function(_0x325b42){const _0x273e0c=_0x2a56e3;if(this[_0x273e0c(0x4a1)]===_0x273e0c(0x29d)&&!Input[_0x273e0c(0x2fb)]())return;if(Input[_0x273e0c(0x1f6)]())return;VisuMZ[_0x273e0c(0x803)][_0x273e0c(0x326)]['call'](this,_0x325b42),this[_0x273e0c(0x5f9)]('default');},VisuMZ['CoreEngine']['Window_NameInput_cursorUp']=Window_NameInput[_0x2a56e3(0x948)]['cursorUp'],Window_NameInput[_0x2a56e3(0x948)]['cursorUp']=function(_0x1f3ace){const _0x922ee1=_0x2a56e3;if(this[_0x922ee1(0x4a1)]===_0x922ee1(0x29d)&&!Input[_0x922ee1(0x2fb)]())return;if(Input[_0x922ee1(0x1f6)]())return;VisuMZ[_0x922ee1(0x803)][_0x922ee1(0x395)][_0x922ee1(0x697)](this,_0x1f3ace),this[_0x922ee1(0x5f9)](_0x922ee1(0x3ac));},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x407)]=Window_NameInput[_0x2a56e3(0x948)]['cursorRight'],Window_NameInput['prototype']['cursorRight']=function(_0x2c99bb){const _0xa70ef1=_0x2a56e3;if(this[_0xa70ef1(0x4a1)]===_0xa70ef1(0x29d)&&!Input[_0xa70ef1(0x2fb)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0xa70ef1(0x803)][_0xa70ef1(0x407)][_0xa70ef1(0x697)](this,_0x2c99bb),this[_0xa70ef1(0x5f9)](_0xa70ef1(0x3ac));},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x8c2)]=Window_NameInput[_0x2a56e3(0x948)][_0x2a56e3(0x416)],Window_NameInput['prototype'][_0x2a56e3(0x416)]=function(_0x244917){const _0x46593f=_0x2a56e3;if(this[_0x46593f(0x4a1)]===_0x46593f(0x29d)&&!Input[_0x46593f(0x2fb)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x46593f(0x803)]['Window_NameInput_cursorLeft'][_0x46593f(0x697)](this,_0x244917),this[_0x46593f(0x5f9)](_0x46593f(0x3ac));},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x11e)]=Window_NameInput['prototype'][_0x2a56e3(0x66d)],Window_NameInput[_0x2a56e3(0x948)][_0x2a56e3(0x66d)]=function(){const _0x35e201=_0x2a56e3;if(this[_0x35e201(0x4a1)]==='keyboard')return;if(Input['isNumpadPressed']())return;VisuMZ[_0x35e201(0x803)][_0x35e201(0x11e)][_0x35e201(0x697)](this),this[_0x35e201(0x5f9)](_0x35e201(0x3ac));},VisuMZ['CoreEngine'][_0x2a56e3(0x14a)]=Window_NameInput[_0x2a56e3(0x948)][_0x2a56e3(0x4b0)],Window_NameInput[_0x2a56e3(0x948)][_0x2a56e3(0x4b0)]=function(){const _0x2b1717=_0x2a56e3;if(this['_mode']===_0x2b1717(0x29d))return;if(Input[_0x2b1717(0x1f6)]())return;VisuMZ[_0x2b1717(0x803)][_0x2b1717(0x14a)]['call'](this),this['switchModes'](_0x2b1717(0x3ac));},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x1c1)]=Window_NameInput[_0x2a56e3(0x948)]['refresh'],Window_NameInput['prototype'][_0x2a56e3(0x5fe)]=function(){const _0x811ed1=_0x2a56e3;if(this['_mode']===_0x811ed1(0x29d)){if(_0x811ed1(0x1b8)===_0x811ed1(0x568))this['removeAllFauxAnimations'](),this[_0x811ed1(0x762)](),_0xc133fc['CoreEngine']['Spriteset_Base_destroy'][_0x811ed1(0x697)](this,_0x17e5f1);else{this['contents'][_0x811ed1(0x3a9)](),this[_0x811ed1(0x6dd)][_0x811ed1(0x3a9)](),this[_0x811ed1(0x602)]();let _0x4a2828=VisuMZ[_0x811ed1(0x803)]['Settings'][_0x811ed1(0x7c0)][_0x811ed1(0x152)][_0x811ed1(0x7ee)]('\x0a'),_0x2c3eb8=_0x4a2828['length'],_0x3b4215=(this[_0x811ed1(0x78a)]-_0x2c3eb8*this[_0x811ed1(0x5c9)]())/0x2;for(let _0x7e0dde=0x0;_0x7e0dde<_0x2c3eb8;++_0x7e0dde){let _0x429f15=_0x4a2828[_0x7e0dde],_0x510245=this[_0x811ed1(0x578)](_0x429f15)[_0x811ed1(0x290)],_0x36b672=Math[_0x811ed1(0x6ad)]((this[_0x811ed1(0x640)][_0x811ed1(0x290)]-_0x510245)/0x2);this[_0x811ed1(0x234)](_0x429f15,_0x36b672,_0x3b4215),_0x3b4215+=this[_0x811ed1(0x5c9)]();}}}else{if(_0x811ed1(0x515)===_0x811ed1(0x5ca)){var _0x35aa9d=_0x14730(_0x4b649b['$1']);_0x299697*=_0x35aa9d;}else VisuMZ['CoreEngine'][_0x811ed1(0x1c1)][_0x811ed1(0x697)](this);}};};function _0x4df4(){const _0x38ab2f=['setupFont','Window_Base_drawText','_stored_powerDownColor','Enemy-%1-%2','setCoreEngineUpdateWindowBg','ExtractStrFromMap','win32','Item-%1-%2','OQonE','Smooth','_internalTextures','bgsVolume','EnableMasking','EXR','createPointAnimationSprite','AudioChangeBgmPan','OqQdt','MapOnceParallel','ParseItemNotetags','getLastGamepadUsed','nIKbY','_destroyCanvas','SParamVocab3','goldWindowRect','isActor','_isPlaytest','Zhznx','BmepW','loadWindowskin','SCALE_MODES','_coreEngineShakeStyle','zexFL','traitsPi','hide','_colorTone','XyUvx','WcszG','vJHus','ValueJS','prototype','statusWindowRect','tileHeight','isWindowMaskingEnabled','cTRnV','_categoryWindow','eNwOL','OptionsBgType','Graphics_centerElement','ynBAM','CRSEL','Type','Game_Map_scrollDown','isInstanceOfSceneMap','Game_Map_scrollRight','_targetX','XParamVocab3','sparamPlusJS','_hideTileShadows','_optionsWindow','SegPu','valueOutlineColor','Control\x20Variables\x20Script\x20Error','updatePositionCoreEngineShakeOriginal','PLAY','BattleSystem','getControllerInputButtonMatch','rightArrowWidth','NUM_LOCK','consumable','CustomParamType','HZQLm','Max','yryJv','PIPE','F18','OVyAJ','Tilemap_addShadow','INOUTELASTIC','_commandWindow','_backSprite2','WIN_OEM_PA3','FQrEy','ahDwU','horzJS','HelpBgType','_baseTexture','opKrM','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','Window_Base_drawCharacter','_scene','ParseActorNotetags','_playTestFastMode','SmartEventCollisionPriority','DisplayedParams','Game_Picture_x','0.00','Bitmap_initialize','BattleManager_processEscape','nunyG','setActorHome','KeySHIFT','imageSmoothingEnabled','ahKTP','IconSParam9','option','Input_onKeyDown','ZXKae','SiVEY','LvExpGauge','HIT','drawGauge','MAXMP','xparamFlat1','displayY','laHdM','processMoveCommand','Weapon-%1-%2','exp','pzNsr','helpAreaHeight','HelpRect','isBottomHelpMode','Window_Base_createTextState','WIN_ICO_CLEAR','Spriteset_Base_update','loadGameImagesCoreEngine','_sellWindow','top','makeCommandList','IconSParam1','yqGub','playTestCtrlT','Sprite_Picture_loadBitmap','F6key','ShowItemBackground','home','createPageButtons','Dkvgg','defaultInputMode','SUBTRACT','TPB\x20ACTIVE','IconSet','Map%1.json','HRG','_pressed','easingType','_cacheScaleX','PGUP','length','parameters','\x5c}❪TAB❫\x5c{','Upper\x20Left','SParamVocab8','helpAreaTopSideButtonLayout','Scene_Battle_createSpriteset','IYbBK','buttonAreaHeight','INBACK','targetBackOpacity','PERIOD','gaugeLineHeight','SParamVocab1','parallaxes','updatePictureCoordinates','Window_NameInput_cursorPagedown','Window_ShopSell_isEnabled','jsQuickFunc','gqtAk','wBFdN','Bitmap_clearRect','removePointAnimation','index','BoxMargin','_movementDuration','_targetY','LqBhh','CISli','ColorMPGauge2','uRbCM','_logWindow','isRepeated','EISU','yScrollLinkedOffset','isGamepadTriggered','MAX_GL_TEXTURES','buttonAssistWindowRect','BlendMode','DETACH_PICTURE_CONTAINER','INELASTIC','setHandler','itemPadding','CustomParam','_stored_crisisColor','MGSkv','Sprite_Button_initialize','sparamFlatBonus','buttonAssistKey%1','Game_Picture_y','Sprite_Picture_updateOrigin','inBattle','_centerElementCoreEngine','meVolume','StatusParamsRect','process_VisuMZ_CoreEngine_Settings','F16','XVZCM','_forcedTroopView','1.3.0','Window_NameInput_cursorPageup','Flat2','initialize','waiting','ColorSystem','JohWh','EnableNameInput','keypress','NameInputMessage','PositionJS','shake','ORPsp','BACK_QUOTE','_currentBgs','editWindowRect','setupCoreEasing','_backgroundFilter','targets','windowPadding','updatePictureAntiZoom','innerWidth','centerX','Scene_Options_create','_targetOffsetY','EXCLAMATION','GbCLt','ConvertNumberToString','Sprite_Animation_processSoundTimings','mzbjI','_commandList','Match','TNVPX','CRI','volume','GREATER_THAN','sparamFlatJS','show','LINEAR','_buttonAssistWindow','EoeoB','HOME','zoomScale','isNextScene','Scene_Map_updateMain','SellRect','babBg','_inputWindow','right','refreshWithTextCodeSupport','DashToggleR','xtSek','openness','SvPxO','XaGMd','createJsQuickFunction','_buttonType','Game_BattlerBase_initMembers','_storedMapText','MvAnimationRate','updateKeyText','consumeItem','buttonAssistText1','MtWfu','blockWidth','updateMove','LnUDe','restore','kMpge','ActorRect','_centerCameraCheck','_addShadow','_pointAnimationQueue','F15','ItemHeight','updateMain','checkCoreEngineDisplayCenter','drawCurrencyValue','_cancelButton','parse','Feomm','CodeJS','_drawTextOutline','Scene_MenuBase_createCancelButton','pow','_clickHandler','setAnchor','_stored_normalColor','SwitchToggleOne','paramPlus','1.4.4','font','_commonEventLayers','ActorHPColor','forceStencil','picture','drawTextTopAligned','egrjF','updateWaitMode','F19','VisuMZ_2_BattleSystemSTB','<%1\x20%2:[\x20]','eva','ZtpGI','AccuracyBoost','setupValueFont','onInputBannedWords','mainAreaBottom','cHOTl','oSLfN','_subject','FIdxm','MDUbE','IconXParam9','_stored_mpGaugeColor2','padding','META','getGamepads','Center','isDying','Window_NameInput_refresh','XParamVocab9','drawItem','XBphZ','PictureCoordinatesMode','tilesets','altKey','Scene_Map_createSpriteset','buttonAssistWindowButtonRect','_onKeyPress','ImpUO','Gold','update','updateCurrentEvent','gIzDb','_height','_hideButtons','_clientArea','ParseClassNotetags','xZerZ','FontSmoothing','ScreenShake','destroy','translucentOpacity','sUNDv','isMenuButtonAssistEnabled','_stored_expGaugeColor1','sv_actors','StartID','CustomParamIcons','setGuard','AudioChangeBgsVolume','isPhysical','INOUTSINE','MDF','_viewportSize','currentClass','Padding','Game_Screen_initialize','sparamRate1','ColorMPCost','_pictureCoordinatesWindow','PTWaX','processHandling','createEnemies','useDigitGrouping','textHeight','DELETE','Duration','Window_NameInput_initialize','members','DOLLAR','WIN_OEM_FINISH','isNumpadPressed','pUEWX','WASD','Unnamed','fontSize','paramX','F22','outlineColorDmg','traitObjects','startMove','ModernControls','CommandBgType','CANCEL','updatePositionCoreEngine','measureTextWidth','pYWnY','_closing','buttonAssistKey1','WIN_OEM_COPY','isEnabled','Window_Selectable_processCursorMove','RgbUF','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','Scene_Unlisted','Game_Picture_initBasic','XzoYV','characters','addChildToBack','XQPaS','3426685SEySIF','ENTER_SPECIAL','EVAL','eGcTG','none','_setupEventHandlers','makeDeepCopy','drawText','XParamVocab6','status','_origin','battleSystem','LevelUpFullHp','Bitmap_drawCircle','StatusRect','SLEEP','offsetX','EQUALS','onLoad','result','MEV','LoadError','Input_pollGamepads','fillStyle','wait','updateMotion','_muteSound','_data','iEtJJ','SParamVocab4','drawCurrentParam','viewport','maxLevel','drawTextEx','itemWindowRect','ARRAYJSON','NJGgd','_anchor','RowSpacing','DefaultStyle','title','Game_Picture_move','dfsQZ','Scene_Base_terminateAnimationClearBugFix','key%1','mev','isLoopHorizontal','FunctionName','updateOpacity','pbglT','isOptionValid','_statusWindow','OOPtB','text%1','areTileShadowsHidden','HItsG','contentsOpacity','enableDigitGroupingEx','SLASH','processKeyboardBackspace','backgroundBitmap','windowOpacity','centerCameraCheckData','Game_Interpreter_command122','requestMotion','EnableNumberInput','Sprite_Animation_setViewport','KeyItemProtect','rFOgA','animationNextDelay','original','Rate1','addWindow','updateMainMultiply','OUTBOUNCE','createDigits','_registerKeyInput','buttonAssistOffset%1','ParseArmorNotetags','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','_currentBgm','_target','MIN_SAFE_INTEGER','version','_drawTextBody','STR','MapNameTextCode','onXhrError','VIlno','PositionX','Skill-%1-%2','processBack','WIN_OEM_FJ_ROYA','active','TAB','itemHeight','TPVJu','(\x5cd+)>','BlurFilter','note','zGVOW','kknZz','pbAPS','background','SystemLoadAudio','fzVhl','subject','iconHeight','ElefC','_fauxAnimationSprites','xparamRate','AtJyS','getButtonAssistLocation','uKmxW','Scene_MenuBase_mainAreaHeight','avHHG','WIN_ICO_00','SystemSetFontSize','ColorGaugeBack','maxCols','process_VisuMZ_CoreEngine_Notetags','drawFace','Bitmap_gradientFillRect','YNEye','isOpenAndActive','width','_screenX','processTimingData','EncounterRateMinimum','NUMPAD0','setValue','filterArea','getCoreEngineScreenShakeStyle','sin','OTB','endAction','_sideButtonLayout','responseText','keyboard','UNDERSCORE','ShowButtons','qYhRP','isPressed','sparamPlus1','drawActorLevel','Chance','battlerHue','ifOup','drawNewParam','outlineColorGauge','DummyRect','addOnceParallelInterpreter','type','en-US','_pauseSignSprite','Window_Selectable_drawBackgroundRect','INOUTQUART','TGR','Game_Action_itemHit','level','RAQyj','terminate','LineHeight','_itemWindow','eventsXyNt','IconParam5','DigitGroupingGaugeSprites','_stored_deathColor','_moveEasingType','Game_Picture_scaleY','Game_Temp_initialize','maxTp','description','blt','MCR','AudioChangeBgsPan','DrawIcons','gold','Conditional\x20Branch\x20Script\x20Error','DCZOj','textWidth','currentLevelExp','subjectHitRate','PictureID','Game_Action_itemEva','CodcX','seVolume','src','TFhVy','ONE_MINUS_SRC_ALPHA','alphabetic','GoldFontSize','jvsEb','oAqSt','HYPHEN_MINUS','initCoreEngine','fromCharCode','ziGrW','_centerElement','OUTQUINT','AHdqF','xScrollLinkedOffset','BattleManager_update','GDalX','paramRate2','onDatabaseLoaded','OPEN_PAREN','outbounce','%1/','qxRrv','RvVuP','playBgs','moksP','NAdrw','updateTransform','onKeyDownKeysF6F7','isAlive','gaugeHeight','INOUTBACK','outlineColor','sparam','ColorMaxLvGauge1','_isButtonHidden','item','removeChild','xbOBA','playCursorSound','DATABASE','_pointAnimationSprites','style','AGI','checkSubstitute','isArrowPressed','QoL','vcnrv','TZKFu','WIN_OEM_FJ_LOYA','random','createTroopNote','SideView','_stored_mpGaugeColor1','buyWindowRect','strokeRect','initialBattleSystem','_goldWindow','ForceNoPlayTest','updateOrigin','statusEquipWindowRect','Ibggm','NUMPAD9','Actor','paramBaseAboveLevel99','_gamepadWait','drawActorExpGauge','SejXf','applyCoreEasing','DeAkn','EditBgType','StatusEquipRect','connected','smoothSelect','Linear','dOCJW','zcSBu','ActorTPColor','isKeyItem','Plus1','gTgVE','_stored_tpCostColor','jMPqM','SELECT','ColorTPCost','removeOnceParallelInterpreter','targetSpritePosition','stencilOp','Window_NameInput_cursorDown','list','targetScaleX','currentExp','FkGHU','xZYZq','ColorExpGauge2','VariableJsBlock','tdqdB','ETB','roEqS','VOLUME_MUTE','IconParam7','isMaxLevel','font-smooth','_lastPluginCommandInterpreter','IconXParam6','TBdAh','CallHandlerJS','STB','endBattlerActions','numActions','EjAkw','_shakePower','adjustBoxSize','KANA','DFHze','isUseModernControls','_digitGroupingEx','_dimmerSprite','setCommonEvent','setupBattleTestItems','buttonAssistOffset1','%1%2','GoldRect','drawActorClass','stop','encounterStepsMinimum','makeEncounterCount','Manual','SzifL','constructor','isTriggered','isSideView','GLhtv','CnWim','command111','gameTitle','EndingID','Game_Action_updateLastTarget','1878714ygvxtE','xvGuv','TBZZd','popScene','registerCommand','VariableEvalReference','xparam','SSVJQ','ColorMaxLvGauge2','setViewportCoreEngineFix','sNPyk','isNwjs','processKeyboardEnd','buttonAssistText4','StatusBgType','updateScene','ZEdhZ','writeText','isTouchedInsideFrame','_tempActor','VisuMZ_2_BattleSystemBTB','VisuMZ_2_BattleSystemOTB','_rate','isLoopVertical','_mapNameWindow','Input_clear','isPlaying','dXnLw','Scene_Map_createMenuButton','_targetScaleY','mxPdL','round','_stored_mpCostColor','DOWN','Game_Interpreter_updateWaitMode','ColorCTGauge1','jUmQC','skillId','CommandRect','setAction','initialLevel','Scene_Status_create','onload','tpGaugeColor1','SkillTypeRect','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','coreEngineRepositionEnemies','isItem','CNT','IconSParam0','INSERT','ListBgType','repositionCancelButtonSideButtonLayout','Version','_skillTypeWindow','playCursor','pictures','NUMPAD3','setupCustomRateCoreEngine','Wyvqh','initMembersCoreEngine','Window_NameInput_cursorUp','〘Common\x20Event\x20%1:\x20%2〙\x20Start','_digitGrouping','playTestF7','loadIconBitmap','rgba(0,\x200,\x200,\x200.7)','Window_MapName_refresh','MAXHP','paramWidth','xYJrB','pJxjf','OpenURL','processPointAnimationRequests','VisuMZ_2_BattleSystemETB','skillTypeWindowRect','return\x200','Scene_MenuBase_createPageButtons','Renderer','adjustSprite','Scene_Equip_create','clear','drawRightArrow','create','default','ColorTPGauge2','drawGameVersion','KznAm','isFullDocumentTitle','Window_NameInput_processHandling','》Comment《\x0a%1\x0a','wQiDA','nZXoF','_helpWindow','centerY','vuiZN','IconParam6','pitch','azVaT','gaugeBackColor','removeAllFauxAnimations','AudioChangeBgsPitch','ARRAYSTR','cursorRight','destroyed','_drawTextShadow','_profileWindow','WIN_OEM_AUTO','ESC','Rate2','flwqR','atbActive','scaleX','CustomParamAbb','TILDE','showFauxAnimations','drawAllParams','targetY','OPEN_BRACKET','isCursorMovable','autoRemovalTiming','TxDnp','tpCostColor','createFauxAnimation','TCR','menu','gBQqO','pendingColor','gradientFillRect','tpPHG','save','_action','_mirror','boxWidth','showDevTools','onInputOk','wAKUq','areButtonsOutsideMainUI','updatePositionCoreEngineShakeHorz','ParamArrow','INOUTQUAD','XYpZY','Basic','setEasingType','runCombinedScrollingTextAsCode','sparamRateJS','LKOZt','naFlD','PHA','xparamRate2','ONE','_lastX','_opening','32ZglXAP','getCustomBackgroundSettings','HANJA','Window_Selectable_itemRect','KpXIZ','join','Settings','updateOpen','ItemRect','pictureButtons','paramY','createCancelButton','commandWindowRows','_onError','poZEA','SystemSetWindowPadding','Kuwdj','StatusMenu','xWOBm','utSnB','isSceneBattle','commandWindowRect','Window_NameInput_cursorRight','CommandList','targetEvaRate','updateDocumentTitle','buttonAssistText3','_troopId','retreat','allowShiftScrolling','EpKla','%2%1%3','CategoryBgType','Dvkgd','updateCoreEasing','mainAreaTop','ExportString','cursorLeft','successRate','_actor','WQIDi','buttons','DigitGroupingStandardText','setBackgroundOpacity','_startLoading','buttonAssistOk','_targetAnchor','lmQIU','AnimationPoint','erwbn','playCancel','measureTextWidthNoRounding','stypeId','dimColor1','start','aebIl','Window_Base_initialize','DrawItemBackgroundJS','TitlePicButtons','getBattleSystem','aWfUK','setupButtonImage','Game_Picture_calcEasing','updateShadow','Window','ksjcW','targetObjects','Scene_Map_update','_index','MDR','mpGaugeColor2','buttonAssistKey2','Input_setupEventHandlers','mirror','isGamepadButtonPressed','animations','PLLQQ','PictureShowIcon','BattleManager_checkSubstitute','IconParam0','Flat','INCIRC','OusFe','tpIgX','%1〘End\x20Choice\x20Selection〙%1','qetDg','statusParamsWindowRect','toFixed','PtZIw','optSideView','createWindowLayer','_stored_tpGaugeColor1','%1〘Choice\x20Cancel〙%1','jwCzV','XpfpO','forceOutOfPlaytest','F14','BTestItems','animationShouldMirror','WIN_OEM_PA2','VzzEW','Untitled','EXECUTE','addLoadListener','clamp','IconXParam1','RIGHT','initVisuMZCoreEngine','Sprite_Actor_setActorHome','isSideButtonLayout','ATTN','vertJS','Scene_Boot_updateDocumentTitle','ExportAllTroopText','_maxDigits','_displayX','pagedown','initButtonHidden','buttonAssistOffset3','PERCENT','SkillTypeBgType','SwitchActorText','ColorManager_loadWindowskin','onMoveEnd','Armor-%1-%2','hQhwU','menuShowButton','XParamVocab7','isMVAnimation','_CoreEngineSettings','printError','helpWindowRect','_encounterCount','YXSWJ','HltYx','WIN_OEM_FJ_TOUROKU','test','isSceneMap','App','isPointAnimationPlaying','EscapeAlways','pixelated','OZzwt','lGEhL','stringKeyMap','_spriteset','makeCoreEngineCommandList','drawSegment','ZIrOR','ExportStrFromAllMaps','push','itemRect','nah','map','eALtC','PixelateImageRendering','lkHFh','IconXParam7','Window_NumberInput_processDigitChange','DataManager_setupNewGame','aqkOn','Game_Interpreter_command111','processTouch','Game_Map_scrollLeft','_repositioned','BTestWeapons','ENTER','OPEN_CURLY_BRACKET','_timerSprite','fFlfh','efwly','_offsetY','([\x5c+\x5c-]\x5cd+)>','calcCoreEasing','isInputting','TextManager_param','_mode','nickname','XParamVocab0','MainMenu','INEXPO','stencilFunc','initBasic','battlebacks1','EquipMenu','SceneManager_isGameActive','ACCEPT','actor','operation','OyrSm','pUlOY','cursorPageup','_backSprite1','Scene_Map_createSpritesetFix','isGamepadConnected','requestFauxAnimation','mhp','deathColor','Param','disable','processKeyboardHome','BottomHelp','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','_updateFilterArea','ControllerMatches','backspace','code','encounterStep','cNfLV','measureText','drawIconBySize','_actorWindow','targetScaleY','HWQLc','Graphics_printError','processKeyboardHandling','min','FDR','SceneManager_exit','cqvcH','NewGameBoot','_pictureCoordinatesMode','hqysy','qNRDo','apply','usfFu','adjustPictureAntiZoom','EREOF','turn','setCoreEngineScreenShakeStyle','events','Scene_Map_initialize','Pauxq','evaluate','gainSilentTp','uzneR','_context','enter','XXohk','wholeDuration','center','addCommand','4879665mwyeZc','addEventListener','retrievePointAnimation','quit','setWindowPadding','requestPointAnimation','Bitmap_measureTextWidth','deselect','Spriteset_Base_initialize','GHzro','reserveNewGameCommonEvent','toLowerCase','exportAllTroopStrings','updatePointAnimations','integer','isOpen','process_VisuMZ_CoreEngine_RegExp','SIFov','OutlineColorGauge','resize','processCursorMove','smallParamFontSize','setupNewGame','SParamVocab7','DummyBgType','6iMvnXE','CNDZH','ItemPadding','%1〘Choice\x20%2〙\x20%3%1','ATK','clearZoom','movePageButtonSideButtonLayout','KJYkM','child_process','sv_enemies','Game_Picture_show','Window_Selectable_cursorDown','createSpriteset','_refreshBack','WIN_OEM_ENLW','AMPERSAND','textAlign','xzpfC','oMdyD','Sprite_Gauge_gaugeRate','ZERO','Actor-%1-%2','framebuffer','filter','startAutoNewGame','TtfIb','processKeyboardDigitChange','DigitGroupingDamageSprites','#%1','Spriteset_Base_isAnimationPlaying','TRG','process_VisuMZ_CoreEngine_jsQuickFunctions','itemEva','ZMbPi','targetX','buttonAssistSwitch','drawParamText','cursorDown','itemLineRect','fIQiF','isGamepadAxisMoved','WIN_ICO_HELP','Page','updatePositionCoreEngineShakeRand','paramName','\x20Origin:\x20%1','_onLoad','Window_Selectable_processTouch','flEpt','CTB','getLevel','Scene_Menu_create','_updateGamepadState','_active','DuvUf','lMNZQ','OnLoadJS','textColor','Scene_MenuBase_createBackground','paramMaxJS','gTeSr','IFcLm','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','F21','ETYhh','BTestArmors','param','MPBjd','moveRelativeToResolutionChange','ASYbE','CategoryRect','qzlIH','LoadMenu','IyXMm','RBibs','process_VisuMZ_CoreEngine_ControllerButtons','INQUART','Window_Selectable_cursorUp','ExportCurMapText','keyMapper','IconSParam7','EyOIU','Window_Base_update','bawfi','applyEasing','ocCjs','QlJKJ','text','Game_Interpreter_command355','culmB','_pictureName','WIN_OEM_CLEAR','makeInputButtonString','includes','setLastGamepadUsed','areButtonsHidden','clone','_lastY','xparamRate1','CustomParamNames','startShake','setColorTone','initCoreEngineScreenShake','BTB','_coreEasingType','Plus','CmFYa','VMmZr','ZSjQE','setAttack','hpGaugeColor2','loadSystemImages','SParamVocab5','VisuMZ_1_BattleCore','aACKt','\x0a\x0a\x0a\x0a\x0a','VisuMZ_2_BattleSystemPTB','maxItems','Game_Actor_changeClass','onButtonImageLoad','ExtractStrFromList','visible','fadeSpeed','_tilemap','textSizeEx','OUTCIRC','XParamVocab5','SceneManager_initialize','command355','profileWindowRect','zMZVH','send','snapForBackground','worldTransform','〘Common\x20Event\x20%1:\x20%2〙\x20End','ColorNormal','Input_updateGamepadState','MultiKeyFmt','mApxc','RjUDx','SParamVocab2','NhEYJ','InputBgType','padZero','CEV','createFauxAnimationSprite','left','Graphics','select','NoTileShadows','UBMEY','Scene_Base_createWindowLayer','NUMPAD1','mainFontSize','SDoDA','cos','ASTERISK','targetPosition','EVA','isCancelled','RegExp','Icon','PA1','randomJS','params','Subtitle','operand','Sprite_AnimationMV_updatePosition','mute','emnLx','_makeFontNameText','pages','Scene_Skill_create','reduce','SZwTU','ctrl','listWindowRect','StatusParamsBgType','xparamPlus2','makeTargetSprites','Game_Actor_paramBase','processDigitChange','Game_Interpreter_command105','GoldOverlap','makeActionList','NrHkj','STENCIL_BUFFER_BIT','processSoundTimings','gIuSK','_numberWindow','kvQzR','doesNameContainBannedWords','setMainFontSize','_stored_maxLvGaugeColor2','titleCommandWindow','Metpu','createPointAnimationQueue','isSpecialCode','maxBattleMembers','updateFauxAnimations','IlRlx','CONTEXT_MENU','currencyUnit','deflate','OUTQUART','lineHeight','jYoAg','_pollGamepads','SPACE','Scene_Battle_createCancelButton','xparamPlus1','charCode','xiKts','PNpUI','_stored_systemColor','paramValueByName','setup','lfnKz','attackSkillId','BACKSPACE','isSmartEventCollisionOn','NUM','transform','Total','WIN_OEM_PA1','isRightInputMode','randomInt','cUfCV','rUUcg','ARRAYSTRUCT','SwitchToggleRange','AllTroops','vyBmY','_refreshArrows','fillRect','asin','_opacity','_cache','Game_Map_setup','createCustomBackgroundImages','battlebacks2','WIN_OEM_ATTN','LZAox','BannedWords','MRF','normal','VisuMZ_2_BattleSystemCTB','pan','pGvZo','Scene_Name_onInputOk','_stored_maxLvGaugeColor1','getBackgroundOpacity','hPJdY','switchModes','offsetY','Keyboard','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','RepositionEnemies130','refresh','ExtractStrFromTroop','mBSYj','exec','resetTextColor','Window_Base_drawIcon','_url','img/%1/','xdg-open','IIByb','Game_Picture_scaleX','keyCode','isMaskingEnabled','ControllerButtons','kQJwb','_inputString','Scene_Boot_startNormalGame','MAX_SAFE_INTEGER','destroyCoreEngineMarkedBitmaps','isExpGaugeDrawn','anchor','FontSize','setMoveEasingType','_refreshPauseSign','makeDocumentTitle','ActorMPColor','QquJq','defineProperty','llLPy','Input_update','isItemStyle','drawActorNickname','CIRCUMFLEX','Scene_MenuBase_mainAreaTop','BLgND','Scene_Boot_onDatabaseLoaded','OUTQUAD','LUK','EtgWw','expGaugeColor1','F11','OTuFm','scaleMode','itypeId','updateOnceParallelInterpreters','tjtFN','Window_Base_drawFace','createCustomParameter','bzESs','bgm','Window_NumberInput_start','ceil','INFte','process_VisuMZ_CoreEngine_Functions','CLEAR','ButtonAssist','clearCachedKeys','IconXParam8','getLastUsedGamepadType','DamageColor','Scene_Shop_create','QYLSw','playBuzzer','bind','levelUp','Flat1','contents','Graphics_defaultStretchMode','_stored_ctGaugeColor1','_targetOpacity','isAnimationOffsetXMirrored','filters','QUESTION_MARK','createTitleButtons','bgmVolume','hideButtonFromView','IconSParam6','WIN_OEM_WSCTRL','wtypeId','ExtJS','_defaultStretchMode','ShowDevTools','initMembers','repositionEnemiesByResolution','Game_Action_setAttack','PTB','dropItems','_isWindow','createBackground','_onceParallelInterpreters','Sprite_Gauge_currentValue','AbruI','StatusEquipBgType','levelUpRecovery','duTvT','EditRect','bitmap','getPointAnimationLayer','processFauxAnimationRequests','JJoDw','boxHeight','\x5c}❪SHIFT❫\x5c{','TitleCommandList','globalAlpha','Scene_GameEnd_createBackground','updateAnchor','VnQbZ','wDTOJ','REPLACE','DEF','Power','cursorPagedown','mainAreaHeightSideButtonLayout','Window_StatusBase_drawActorLevel','usableSkills','OpenConsole','AnimationID','loadBitmap','TmFmD','RPGMAKER_VERSION','rowSpacing','children','wVbWv','IwMTM','setSize','IGusY','toUpperCase','OS_KEY','updateDashToggle','_hp','INOUTEXPO','IORWs','getCombinedScrollingText','process_VisuMZ_CoreEngine_CustomParameters','Abbreviation','redraw','Window_NameInput_processTouch','KEEP','([\x5c+\x5c-]\x5cd+)([%％])>','IconParam3','log','AutoScrollLockY','bkVOe','smooth','alwaysDash','IJTFC','clearRect','Mute','Ajoak','HSsgs','qNHhd','checkSmartEventCollision','Bitmap_fillRect','call','CLOSE_CURLY_BRACKET','_createInternalTextures','render','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','rlKZJ','context','buttonAssistOffset5','CLOSE_PAREN','paramBase','iCLXo','Layer','QwertyLayout','DECIMAL','cursorUp','ebbzN','WIN_OEM_FJ_MASSHOU','overrideMimeType','duration','_buyWindow','bitmapHeight','VisuMZ_1_OptionsCore','floor','_dummyWindow','GameEnd','State-%1-%2','KfvXw','CrisisRate','ONIKE','clearOnceParallelInterpreters','PictureEraseAll','updatePosition','cAiHS','ColorExpGauge1','ParseEnemyNotetags','format','Input_shouldPreventDefault','CwNRc','mainAreaHeight','dashToggle','setEnemyAction','updateLastTarget','CancelText','_listWindow','flush','Sprite_AnimationMV_processTimingData','SwitchRandomizeOne','Bitmap_strokeRect','ItemMenu','(\x5cd+\x5c.?\x5cd+)>','KGvvk','imNwh','windowRect','currentValue','iconWidth','ProfileRect','itemSuccessRate','_shakeSpeed','backOpacity','isTpb','dummyWindowRect','DimColor1','batch','buttonAssistKey3','TextCodeClassNames','scrollRight','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','Opacity','isAnimationForEach','_screenY','contentsBack','down2','ButtonFadeSpeed','paramchangeTextColor','equips','%1\x0a','sparamRate2','SHIFT','_image','sjcZo','JMMKr','OptionsRect','Enable','setFrame','_menuButton','ParseAllNotetags','UpdatePictureCoordinates','vxUcO','slice','vertical','MenuBg','VisuMZ_2_BattleSystemFTB','mapId','BasicParameterFormula','name','〘Scrolling\x20Text〙\x0a','setActorHomeRepositioned','mpCostColor','Scene_Map_updateScene','substring','Enemy','isMapScrollLinked','shift','toString','HMUve','loadSystem','_cacheScaleY','reservePlayTestNewGameCommonEvent','GoldChange','PRINTSCREEN','applyForcedGameTroopSettingsCoreEngine','pagedownShowButton','ScreenResolution','Window_StatusBase_drawActorSimpleStatus','ApplyEasing','displayX','scrollDown','getColorDataFromPluginParameters','%1:\x20Exit\x20','open','createChildSprite','setupRate','OutlineColorDmg','terms','BaseTexture','Spriteset_Base_destroy','setMute','opacity','xparamPlus','openingSpeed','maxLvGaugeColor2','paramRate1','cancel','_inputSpecialKeyCode','_mainSprite','ActorBgType','pop','expGaugeColor2','AutoScrollLockX','AutoStretch','Name','JSON','replace','NYixS','data/','performMiss','ShopMenu','abs','VBnXS','clipboard','LnCXL','rJwzN','PictureEraseRange','_statusParamsWindow','Sprite_Button_updateOpacity','clearForcedGameTroopSettingsCoreEngine','_windowLayer','updatePlayTestF7','_pictureContainer','goto','animationId','remove','Khvob','toLocaleString','createCommandWindow','createKeyJS','mMuxI','StCEY','_shouldPreventDefault','catchUnknownError','_effectsContainer','isEventRunning','SCROLL_LOCK','fillText','faces','PreserveNumbers','itemHitImprovedAccuracy','OkText','ShowJS','loadPicture','stretch','_targetOffsetX','trim','concat','STRUCT','loadTitle2','erasePicture','axes','categoryWindowRect','UqjNB','BuyRect','hit','paramFlat','isFauxAnimationPlaying','_blank','CreateBattleSystemID','OPmBH','_onKeyDown','_scaleY','horizontal','resetBattleSystem','_battlerName','scaleSprite','removeAllPointAnimations','paramRateJS','_changingClass','catchLoadError','Scene_Boot_loadSystemImages','helpAreaBottom','changeClass','nlttv','tYcHP','tpColor','_paramPlus','match','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','INQUAD','XVARE','MINUS','NewGameCommonEvent','PositionY','BgType','NONCONVERT','numRepeats','processKeyboardDelete','endAnimation','Scene_Battle_createSpritesetFix','KeyTAB','itemBackColor2','nw.gui','ColorCrisis','XParameterFormula','nOSIx','WbrbS','writeFile','OutlineColor','TpUmh','Color','animationBaseDelay','Game_Actor_levelUp','Game_Character_processMoveCommand','Game_Party_consumeItem','Scene_Battle_createSpriteset_detach','innerHeight','tab','escape','_customModified','command122','LATIN1','ParseStateNotetags','_statusEquipWindow','TGpZr','jzyyg','WIN_OEM_FJ_JISHO','LucnK','_list','TRAIT_PARAM','startNormalGame','ExportAllMapText','skipBranch','F17','drawBackground','szEjn','canAttack','NUMPAD8','drawIcon','SceneManager_onKeyDown','setBackgroundType','_currentMap','sqrt','startAnimation','_number','createTextState','setHome','isForFriend','Game_Interpreter_PluginCommand','_movementWholeDuration','miFpQ','ExtDisplayedParams','cancelShowButton','ButtonHeight','ALWAYS','GoldMax','ShowActorLevel','_offsetX','sparamFlat1','gBooq','removeFauxAnimation','Title','drawCircle','ParamMax','ifijB','addChild','BsMFu','isaGG','VArYo','MAT','KeyboardInput','setTargetAnchor','setViewport','pictureId','Sprite_destroy','ScaleX','_downArrowSprite','ItemBackColor2','lILCN','layoutSettings','Game_Picture_updateMove','drawCharacter','determineSideButtonLayoutValid','isMagical','bgs','xCwHF','RevertPreserveNumbers','MULTIPLY','colSpacing','REC','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','maxGold','darwin','_margin','BKvcx','INCUBIC','_startDecrypting','lMqIg','fyZNt','PRINT','useFontWidthFix','IDs','ParseTilesetNotetags','isBusy','catchNormalError','TextJS','BTestAddedQuantity','jObtN','markCoreEngineModified','INSINE','SParamVocab9','makeFontSmaller','ColorCTGauge2','_playtestF7Looping','buttonAssistWindowSideRect','createFauxAnimationQueue','split','missed','value','playMiss','Scene_Battle_update','Game_Event_start','isPlaytest','platform','BgFilename1','optionsWindowRect','Game_Event_isCollidedWithEvents','onerror','FontShadows','GetParamIcon','DTiZN','78531VCzvGL','scaleY','paramMax','getControllerInputButtonString','JPioo','nextLevelExp','CoreEngine','BackOpacity','bEEbN','NumberRect','NsvzD','Game_Map_scrollUp','_pageupButton','createButtonAssistWindow','setSkill','drawParamName','LESS_THAN','actorWindowRect','XParamVocab8','playEscape','HzKhy','CLOSE_BRACKET','KeyUnlisted','Window_Gold_refresh','MRG','INOUTCUBIC','NEAREST','IconIndex','onKeyDown','pageup','max','EDvyG','Bitmap_drawText','isEnemy','buttonAssistText%1','ConvertParams','Spriteset_Base_updatePosition','playOk','DisplayLockY','ColorTPGauge1','F12','GoldIcon','setLastPluginCommandInterpreter','xGbcX','processCursorHomeEndTrigger','EnableJS','createPointAnimation','Hvzpu','Game_Troop_setup','WvQCR','scrollLeft','createMenuButton','Scene_MenuBase_helpAreaTop','BuyBgType','_stored_ctGaugeColor2','itemHit','blendFunc','_duration','BFsmT','maxTurns','xaFok','buttonAssistCancel','WVXHB','command105','onEscapeSuccess','Scene_Map_createSpriteset_detach','showPointAnimations','sGpXr','renderNoMask','moveCancelButtonSideButtonLayout','unMeu','Exported_Script_%1.txt','application/json','vxWrO','displayName','catchException','getInputButtonString','Symbol','sellWindowRect','ColorPowerDown','yxvui','updateData','NewGameCommonEventAll','CommandWidth','INOUTCIRC','scrollUp','_colorCache','PictureFilename','drawGameSubtitle','ListRect','originalJS','_balloonQueue','updatePadding','GroupDigits','WindowLayer_render','_coreEasing','playOnceParallelInterpreter','thFYM','_phase','getLastPluginCommandInterpreter','_stored_tpGaugeColor2','InputRect','_scaleX','Show\x20Scrolling\x20Text\x20Script\x20Error','_lastGamepad','reserveCommonEvent','number','isNormalPriority','PRESERVCONVERSION(%1)','processCursorMoveModernControls','lKtbg','INOUTQUINT','_editWindow','updateBackOpacity','up2','getKeyboardInputButtonString','_upArrowSprite','ADD','FTB','cmWLP','DisplayLockX','playTestF6','_backgroundSprite','storeMapData','button','string','_storedStack','bitmapWidth','drawGameTitle','advanced','playBgm','znLAb','Bitmap_drawTextOutline','down','updateEffekseer','xparamFlatJS','retrieveFauxAnimation','WIN_OEM_JUMP','SideButtons','setupCoreEngine','ItemBackColor1','ParamChange','hSDdR','updatePositionCoreEngineShakeVert','VdKBH','GCsgV','pmBXR','ParseWeaponNotetags','Cudub','_loadingState','isHandled','titles2','iJKnm','ZfMmH','SnapshotOpacity','createPointAnimationTargets','_smooth','canUse','LevelUpFullMp','parseForcedGameTroopSettingsCoreEngine','changeTextColor','FINAL','keyRepeatWait','762387cHLMPb','DigitGroupingExText','ExportStrFromAllTroops','openURL','mainCommandWidth','gRjUg','Scene_Item_create','learnings','_windowskin','inbounce','Game_BattlerBase_refresh','alwid','isAnimationPlaying','scale','getInputMultiButtonStrings','_targets','ImprovedAccuracySystem','etypeId','IconXParam0','TGyfO','JfnNG','subtitle','useDigitGroupingEx','mmp','guardSkillId','_realScale','setSideView','isCollidedWithEvents','skills','processEscape','mainAreaTopSideButtonLayout','Script\x20Call\x20Error','height','checkCacheKey','Window_NameInput_cursorLeft','centerSprite','CONVERT','alpha','playLoad','ExportCurTroopText','sHaoc','_width','end','tlytV','baseId','_stored_expGaugeColor2','_stored_pendingColor','Scene_Name_create','Origin','INQUINT','maxLvGaugeColor1','_lastOrigin','command357','STENCIL_TEST','GRD','Bitmap_blt','showPicture','BnuOL','SEMICOLON','jKTih','_pagedownButton','refreshDimmerBitmap','processAlwaysEscape','TimeProgress','Scene_Base_terminate','setSideButtonLayout','_stored_hpGaugeColor2','resetFontSettings','F23','createBuffer','processTouchModernControls','18696aTzpvA','moveMenuButtonSideButtonLayout','SystemSetSideView','move','PDR','exit','xparamFlatBonus','targetContentsOpacity','repeat','AQFLe','jHTKG','_fauxAnimationQueue','ColorDeath','performEscape','loadMapData','sparamFlat2','VMlpQ','QUOTE','_forcedBattleSys','sceneTerminationClearEffects','enemies','setClickHandler','MenuLayout','canEquip','(\x5cd+)([%％])>','targetOpacity','Sprite_Battler_startMove','ecJad','exportAllMapStrings','Lqdhr','TranslucentOpacity','IconXParam4','NumberBgType','position','_baseSprite','indexOf','numberWindowRect','XParamVocab4','_shakeDuration','AudioChangeBgmPitch','drawGoldItemStyle','Nbapu','ParamName','gWUYk','EXYPT','isBottomButtonMode','986572VFrDUG','paramRate','_backSprite','get','PictureEasingType','_animation','titles1','SlotRect','STuyO','needsUpdate','Window_EquipItem_isEnabled','systemColor'];_0x4df4=function(){return _0x38ab2f;};return _0x4df4();}VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x11f)]=Window_ShopSell['prototype'][_0x2a56e3(0x209)],Window_ShopSell[_0x2a56e3(0x948)][_0x2a56e3(0x209)]=function(_0x18f431){const _0x2aca7d=_0x2a56e3;if(VisuMZ[_0x2aca7d(0x803)][_0x2aca7d(0x3f7)][_0x2aca7d(0x2fc)][_0x2aca7d(0x256)]&&DataManager['isKeyItem'](_0x18f431))return![];else{if(_0x2aca7d(0x891)!==_0x2aca7d(0x891)){if(!_0x20d79f[_0x2aca7d(0x7f4)]())return;if(!_0x525e9e[_0x2aca7d(0x363)]())return;_0x316175['_scene'][_0x2aca7d(0x531)]=![],_0x4a8366['CoreEngine']['ExportStrFromAllTroops']();}else return VisuMZ[_0x2aca7d(0x803)][_0x2aca7d(0x11f)][_0x2aca7d(0x697)](this,_0x18f431);}},Window_NumberInput[_0x2a56e3(0x948)]['isUseModernControls']=function(){return![];};VisuMZ[_0x2a56e3(0x803)]['Settings'][_0x2a56e3(0x7c0)][_0x2a56e3(0x254)]&&(VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x630)]=Window_NumberInput[_0x2a56e3(0x948)][_0x2a56e3(0x427)],Window_NumberInput['prototype'][_0x2a56e3(0x427)]=function(){const _0x2c5a44=_0x2a56e3;VisuMZ['CoreEngine'][_0x2c5a44(0x630)][_0x2c5a44(0x697)](this),this[_0x2c5a44(0x590)](this[_0x2c5a44(0x463)]-0x1),Input[_0x2c5a44(0x3a9)]();},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x48f)]=Window_NumberInput[_0x2a56e3(0x948)][_0x2a56e3(0x5b1)],Window_NumberInput['prototype'][_0x2a56e3(0x5b1)]=function(){const _0x12aa9f=_0x2a56e3;if(!this[_0x12aa9f(0x28f)]())return;if(Input[_0x12aa9f(0x1f6)]()){if(_0x12aa9f(0x1f7)===_0x12aa9f(0x86b))return _0x140e8a[_0x12aa9f(0x803)][_0x12aa9f(0x91f)][_0x12aa9f(0x697)](this,_0x1ea60b);else this[_0x12aa9f(0x516)]();}else{if(Input[_0x12aa9f(0x5c1)](_0x12aa9f(0x4be)))this[_0x12aa9f(0x24e)]();else{if(Input[_0x12aa9f(0x71c)]===0x2e){if(_0x12aa9f(0x726)===_0x12aa9f(0x51d)){const _0x3ae5c9=new _0xc291e8[(_0x12aa9f(0x713))]();_0x3ae5c9[_0x12aa9f(0x67a)](0x800,0x800),_0x120482['CoreEngine'][_0x12aa9f(0x3f7)][_0x12aa9f(0x2fc)][_0x12aa9f(0x48c)]&&(_0x3ae5c9['scaleMode']=_0x326185['SCALE_MODES'][_0x12aa9f(0x817)]),this['_internalTextures']['push'](_0x3ae5c9);}else this[_0x12aa9f(0x777)]();}else{if(Input[_0x12aa9f(0x71c)]===0x24)this['processKeyboardHome']();else{if(Input[_0x12aa9f(0x71c)]===0x23)this[_0x12aa9f(0x364)]();else{if(_0x12aa9f(0x244)!=='BUgzl')VisuMZ[_0x12aa9f(0x803)][_0x12aa9f(0x48f)][_0x12aa9f(0x697)](this);else{if(this['_centerCameraCheck']===_0x5d0a52)this['checkCoreEngineDisplayCenter']();return this[_0x12aa9f(0x18f)];}}}}}}},Window_NumberInput['prototype'][_0x2a56e3(0x4f7)]=function(){const _0x24f617=_0x2a56e3;if(!this[_0x24f617(0x3cf)]())return;if(Input['isNumpadPressed']()){if('xGbcX'!==_0x24f617(0x828))return _0x179ebe&&_0x5e54c2[_0x24f617(0x276)]&&_0x36a433['note']['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?_0x52776f(_0x1eb07b['$1']):_0x640774[_0x24f617(0x803)]['Settings'][_0x24f617(0x2fc)][_0x24f617(0x293)];else this[_0x24f617(0x516)]();}else Window_Selectable[_0x24f617(0x948)][_0x24f617(0x4f7)][_0x24f617(0x697)](this);},Window_NumberInput[_0x2a56e3(0x948)][_0x2a56e3(0x829)]=function(){},Window_NumberInput[_0x2a56e3(0x948)][_0x2a56e3(0x516)]=function(){const _0x208a99=_0x2a56e3;if(String(this[_0x208a99(0x7a6)])['length']>=this[_0x208a99(0x463)])return;const _0x2467cd=Number(String(this['_number'])+Input['_inputString']);if(isNaN(_0x2467cd))return;this[_0x208a99(0x7a6)]=_0x2467cd;const _0x52a7fc='9'[_0x208a99(0x8ef)](this[_0x208a99(0x463)]);this['_number']=this[_0x208a99(0x7a6)][_0x208a99(0x459)](0x0,_0x52a7fc),Input[_0x208a99(0x3a9)](),this[_0x208a99(0x5fe)](),SoundManager[_0x208a99(0x38f)](),this[_0x208a99(0x590)](this['_maxDigits']-0x1);},Window_NumberInput[_0x2a56e3(0x948)][_0x2a56e3(0x24e)]=function(){const _0x6f80c0=_0x2a56e3;this['_number']=Number(String(this[_0x6f80c0(0x7a6)])[_0x6f80c0(0x6ef)](0x0,-0x1)),this[_0x6f80c0(0x7a6)]=Math[_0x6f80c0(0x81b)](0x0,this[_0x6f80c0(0x7a6)]),Input[_0x6f80c0(0x3a9)](),this[_0x6f80c0(0x5fe)](),SoundManager['playCursor'](),this[_0x6f80c0(0x590)](this[_0x6f80c0(0x463)]-0x1);},Window_NumberInput[_0x2a56e3(0x948)][_0x2a56e3(0x777)]=function(){const _0x11c31c=_0x2a56e3;this[_0x11c31c(0x7a6)]=Number(String(this[_0x11c31c(0x7a6)])[_0x11c31c(0x6fa)](0x1)),this[_0x11c31c(0x7a6)]=Math[_0x11c31c(0x81b)](0x0,this[_0x11c31c(0x7a6)]),Input[_0x11c31c(0x3a9)](),this[_0x11c31c(0x5fe)](),SoundManager[_0x11c31c(0x38f)](),this[_0x11c31c(0x590)](this[_0x11c31c(0x463)]-0x1);},Window_NumberInput['prototype'][_0x2a56e3(0x4b9)]=function(){const _0x40da3d=_0x2a56e3;if(this['index']()===0x0)return;Input[_0x40da3d(0x3a9)](),this[_0x40da3d(0x5fe)](),SoundManager['playCursor'](),this[_0x40da3d(0x590)](0x0);},Window_NumberInput[_0x2a56e3(0x948)]['processKeyboardEnd']=function(){const _0x57ffa1=_0x2a56e3;if(this[_0x57ffa1(0x125)]()===this[_0x57ffa1(0x463)]-0x1)return;Input[_0x57ffa1(0x3a9)](),this[_0x57ffa1(0x5fe)](),SoundManager[_0x57ffa1(0x38f)](),this[_0x57ffa1(0x590)](this[_0x57ffa1(0x463)]-0x1);});;VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x39b)]=Window_MapName['prototype'][_0x2a56e3(0x5fe)],Window_MapName[_0x2a56e3(0x948)][_0x2a56e3(0x5fe)]=function(){const _0x37159c=_0x2a56e3;VisuMZ[_0x37159c(0x803)][_0x37159c(0x3f7)][_0x37159c(0x2fc)][_0x37159c(0x269)]?this[_0x37159c(0x17a)]():VisuMZ[_0x37159c(0x803)][_0x37159c(0x39b)][_0x37159c(0x697)](this);},Window_MapName['prototype']['refreshWithTextCodeSupport']=function(){const _0x5188c6=_0x2a56e3;this[_0x5188c6(0x640)][_0x5188c6(0x3a9)]();if($gameMap['displayName']()){if('lyEnM'==='lyEnM'){const _0x126ec8=this[_0x5188c6(0x15e)];this[_0x5188c6(0x79c)](0x0,0x0,_0x126ec8,this[_0x5188c6(0x5c9)]());const _0x44bbaa=this[_0x5188c6(0x578)]($gameMap[_0x5188c6(0x847)]())['width'];this['drawTextEx']($gameMap[_0x5188c6(0x847)](),Math['floor']((_0x126ec8-_0x44bbaa)/0x2),0x0);}else this[_0x5188c6(0x865)]=_0x2a12ab;}},Window_TitleCommand[_0x2a56e3(0x167)]=VisuMZ['CoreEngine'][_0x2a56e3(0x3f7)]['TitleCommandList'],Window_TitleCommand[_0x2a56e3(0x948)][_0x2a56e3(0x9a1)]=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand[_0x2a56e3(0x948)]['makeCoreEngineCommandList']=function(){const _0x3fc6b2=_0x2a56e3;for(const _0x1514ef of Window_TitleCommand[_0x3fc6b2(0x167)]){if(_0x3fc6b2(0x1d4)===_0x3fc6b2(0x1d4)){if(_0x1514ef[_0x3fc6b2(0x749)][_0x3fc6b2(0x697)](this)){if(_0x3fc6b2(0x28e)!==_0x3fc6b2(0x28e))this[_0x3fc6b2(0x3a9)]();else{const _0x4dafb4=_0x1514ef[_0x3fc6b2(0x84a)];let _0x5cef50=_0x1514ef['TextStr'];if(['',_0x3fc6b2(0x456)][_0x3fc6b2(0x559)](_0x5cef50))_0x5cef50=_0x1514ef[_0x3fc6b2(0x7e3)][_0x3fc6b2(0x697)](this);const _0x1fc431=_0x1514ef[_0x3fc6b2(0x82a)][_0x3fc6b2(0x697)](this),_0x3dfd25=_0x1514ef['ExtJS']['call'](this);this[_0x3fc6b2(0x4e2)](_0x5cef50,_0x4dafb4,_0x1fc431,_0x3dfd25),this[_0x3fc6b2(0x137)](_0x4dafb4,_0x1514ef[_0x3fc6b2(0x338)]['bind'](this,_0x3dfd25));}}}else _0x45c5da[_0x3fc6b2(0x803)][_0x3fc6b2(0x175)][_0x3fc6b2(0x697)](this),this[_0x3fc6b2(0x62a)]();}},Window_GameEnd[_0x2a56e3(0x167)]=VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x3f7)][_0x2a56e3(0x8fd)][_0x2a56e3(0x6af)][_0x2a56e3(0x408)],Window_GameEnd[_0x2a56e3(0x948)][_0x2a56e3(0x9a1)]=function(){const _0x777658=_0x2a56e3;this[_0x777658(0x483)]();},Window_GameEnd['prototype']['makeCoreEngineCommandList']=function(){const _0x7b1f0b=_0x2a56e3;for(const _0x3caf3f of Window_GameEnd[_0x7b1f0b(0x167)]){if(_0x7b1f0b(0x6b3)!==_0x7b1f0b(0x88d)){if(_0x3caf3f[_0x7b1f0b(0x749)][_0x7b1f0b(0x697)](this)){const _0x274d78=_0x3caf3f['Symbol'];let _0x1dd1e7=_0x3caf3f['TextStr'];if(['','Untitled'][_0x7b1f0b(0x559)](_0x1dd1e7))_0x1dd1e7=_0x3caf3f[_0x7b1f0b(0x7e3)]['call'](this);const _0x438aa1=_0x3caf3f[_0x7b1f0b(0x82a)][_0x7b1f0b(0x697)](this),_0x1363cf=_0x3caf3f['ExtJS']['call'](this);this[_0x7b1f0b(0x4e2)](_0x1dd1e7,_0x274d78,_0x438aa1,_0x1363cf),this['setHandler'](_0x274d78,_0x3caf3f[_0x7b1f0b(0x338)][_0x7b1f0b(0x63d)](this,_0x1363cf));}}else return _0x55ad66['layoutSettings'][_0x7b1f0b(0x37e)][_0x7b1f0b(0x697)](this);}};function Window_ButtonAssist(){const _0x4edc30=_0x2a56e3;this[_0x4edc30(0x14c)](...arguments);}Window_ButtonAssist[_0x2a56e3(0x948)]=Object['create'](Window_Base[_0x2a56e3(0x948)]),Window_ButtonAssist['prototype']['constructor']=Window_ButtonAssist,Window_ButtonAssist[_0x2a56e3(0x948)]['initialize']=function(_0x2ac0c1){const _0x4b0814=_0x2a56e3;this[_0x4b0814(0x22e)]={},Window_Base[_0x4b0814(0x948)][_0x4b0814(0x14c)][_0x4b0814(0x697)](this,_0x2ac0c1),this[_0x4b0814(0x7a2)](VisuMZ[_0x4b0814(0x803)][_0x4b0814(0x3f7)][_0x4b0814(0x635)][_0x4b0814(0x774)]||0x0),this[_0x4b0814(0x5fe)]();},Window_ButtonAssist['prototype']['makeFontBigger']=function(){const _0x5121ac=_0x2a56e3;this[_0x5121ac(0x640)][_0x5121ac(0x1fa)]<=0x60&&(this[_0x5121ac(0x640)][_0x5121ac(0x1fa)]+=0x6);},Window_ButtonAssist['prototype'][_0x2a56e3(0x7e9)]=function(){const _0x4d416b=_0x2a56e3;this['contents'][_0x4d416b(0x1fa)]>=0x18&&(_0x4d416b(0x931)===_0x4d416b(0x931)?this['contents'][_0x4d416b(0x1fa)]-=0x6:this[_0x4d416b(0x8f9)]='PTB');},Window_ButtonAssist['prototype']['update']=function(){const _0x442173=_0x2a56e3;Window_Base[_0x442173(0x948)][_0x442173(0x1cd)][_0x442173(0x697)](this),this[_0x442173(0x185)]();},Window_ButtonAssist['prototype'][_0x2a56e3(0x859)]=function(){const _0x4f435c=_0x2a56e3;this[_0x4f435c(0x1bc)]=SceneManager['_scene'][_0x4f435c(0x283)]()!==_0x4f435c(0x879)?0x0:0x8;},Window_ButtonAssist[_0x2a56e3(0x948)]['updateKeyText']=function(){const _0x5ecf4d=_0x2a56e3,_0x5f1092=SceneManager['_scene'];for(let _0x31b2c0=0x1;_0x31b2c0<=0x5;_0x31b2c0++){if(this['_data']['key%1'[_0x5ecf4d(0x6ba)](_0x31b2c0)]!==_0x5f1092[_0x5ecf4d(0x13e)['format'](_0x31b2c0)]())return _0x5ecf4d(0x2fe)==='WOPpN'?this[_0x5ecf4d(0x800)](_0x14a88f,_0xe45ce5):this[_0x5ecf4d(0x5fe)]();if(this['_data'][_0x5ecf4d(0x248)[_0x5ecf4d(0x6ba)](_0x31b2c0)]!==_0x5f1092[_0x5ecf4d(0x81f)[_0x5ecf4d(0x6ba)](_0x31b2c0)]())return this[_0x5ecf4d(0x5fe)]();}},Window_ButtonAssist[_0x2a56e3(0x948)][_0x2a56e3(0x5fe)]=function(){const _0x3e2577=_0x2a56e3;this['contents']['clear']();for(let _0x2cf1fb=0x1;_0x2cf1fb<=0x5;_0x2cf1fb++){this[_0x3e2577(0x484)](_0x2cf1fb);}},Window_ButtonAssist[_0x2a56e3(0x948)][_0x2a56e3(0x484)]=function(_0x4d57f4){const _0x4c3d3b=_0x2a56e3,_0x40470f=this[_0x4c3d3b(0x15e)]/0x5,_0x5b5532=SceneManager['_scene'],_0x35f47b=_0x5b5532[_0x4c3d3b(0x13e)[_0x4c3d3b(0x6ba)](_0x4d57f4)](),_0x14e836=_0x5b5532[_0x4c3d3b(0x81f)[_0x4c3d3b(0x6ba)](_0x4d57f4)]();this['_data'][_0x4c3d3b(0x23f)[_0x4c3d3b(0x6ba)](_0x4d57f4)]=_0x35f47b,this[_0x4c3d3b(0x22e)][_0x4c3d3b(0x248)['format'](_0x4d57f4)]=_0x14e836;if(_0x35f47b==='')return;if(_0x14e836==='')return;const _0x53692d=_0x5b5532[_0x4c3d3b(0x260)[_0x4c3d3b(0x6ba)](_0x4d57f4)](),_0x3329a0=this[_0x4c3d3b(0x138)](),_0x3456d6=_0x40470f*(_0x4d57f4-0x1)+_0x3329a0+_0x53692d,_0x4eeab6=VisuMZ[_0x4c3d3b(0x803)][_0x4c3d3b(0x3f7)]['ButtonAssist']['TextFmt'];this['drawTextEx'](_0x4eeab6[_0x4c3d3b(0x6ba)](_0x35f47b,_0x14e836),_0x3456d6,0x0,_0x40470f-_0x3329a0*0x2);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x37a)]=Game_Interpreter[_0x2a56e3(0x948)][_0x2a56e3(0x1ab)],Game_Interpreter[_0x2a56e3(0x948)][_0x2a56e3(0x1ab)]=function(){const _0x2fdfe0=_0x2a56e3;if($gameTemp['_pictureCoordinatesMode']!==undefined){if(_0x2fdfe0(0x2e5)!==_0x2fdfe0(0x2e5))this[_0x2fdfe0(0x590)](-0x1);else return VisuMZ[_0x2fdfe0(0x803)][_0x2fdfe0(0x6ed)]();}return VisuMZ[_0x2fdfe0(0x803)][_0x2fdfe0(0x37a)][_0x2fdfe0(0x697)](this);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x6ed)]=function(){const _0x2436e4=_0x2a56e3,_0xf139be=$gameTemp[_0x2436e4(0x4ce)]||0x0;(_0xf139be<0x0||_0xf139be>0x64||TouchInput[_0x2436e4(0x59b)]()||Input['isTriggered'](_0x2436e4(0x71b)))&&($gameTemp[_0x2436e4(0x4ce)]=undefined,Input[_0x2436e4(0x3a9)](),TouchInput[_0x2436e4(0x3a9)]());const _0x1e674e=$gameScreen[_0x2436e4(0x1a8)](_0xf139be);return _0x1e674e&&('chEXy'===_0x2436e4(0x693)?(this[_0x2436e4(0x280)]=[],this[_0x2436e4(0x2f7)]=[],this[_0x2436e4(0x9b3)]=this['scale']['x'],this[_0x2436e4(0x701)]=this[_0x2436e4(0x8ad)]['y']):(_0x1e674e['_x']=TouchInput['_x'],_0x1e674e['_y']=TouchInput['_y'])),VisuMZ[_0x2436e4(0x803)]['updatePictureCoordinates'](),$gameTemp['_pictureCoordinatesMode']!==undefined;},VisuMZ['CoreEngine'][_0x2a56e3(0x11d)]=function(){const _0x8e939f=_0x2a56e3,_0x1eae49=SceneManager[_0x8e939f(0x97a)];if(!_0x1eae49)return;!_0x1eae49['_pictureCoordinatesWindow']&&(SoundManager[_0x8e939f(0x8c6)](),_0x1eae49[_0x8e939f(0x1ea)]=new Window_PictureCoordinates(),_0x1eae49[_0x8e939f(0x7bb)](_0x1eae49['_pictureCoordinatesWindow']));if($gameTemp['_pictureCoordinatesMode']===undefined){if(_0x8e939f(0x739)==='Khvob')SoundManager[_0x8e939f(0x423)](),_0x1eae49[_0x8e939f(0x2f3)](_0x1eae49[_0x8e939f(0x1ea)]),_0x1eae49['_pictureCoordinatesWindow']=undefined;else return _0x156187[_0x8e939f(0x7c9)]['CommandRect'][_0x8e939f(0x697)](this);}};function Window_PictureCoordinates(){this['initialize'](...arguments);}Window_PictureCoordinates[_0x2a56e3(0x948)]=Object['create'](Window_Base[_0x2a56e3(0x948)]),Window_PictureCoordinates[_0x2a56e3(0x948)][_0x2a56e3(0x34f)]=Window_PictureCoordinates,Window_PictureCoordinates['prototype'][_0x2a56e3(0x14c)]=function(){const _0x1b6116=_0x2a56e3;this[_0x1b6116(0x8d3)]=_0x1b6116(0x489),this[_0x1b6116(0x3ef)]=_0x1b6116(0x489),this[_0x1b6116(0x55d)]=_0x1b6116(0x489);const _0xba1577=this[_0x1b6116(0x6cb)]();Window_Base[_0x1b6116(0x948)][_0x1b6116(0x14c)][_0x1b6116(0x697)](this,_0xba1577),this[_0x1b6116(0x7a2)](0x2);},Window_PictureCoordinates[_0x2a56e3(0x948)][_0x2a56e3(0x6cb)]=function(){const _0x938d00=_0x2a56e3;let _0x23b689=0x0,_0x543622=Graphics[_0x938d00(0x8c0)]-this[_0x938d00(0x5c9)](),_0x54edee=Graphics[_0x938d00(0x290)],_0x2887a9=this[_0x938d00(0x5c9)]();return new Rectangle(_0x23b689,_0x543622,_0x54edee,_0x2887a9);},Window_PictureCoordinates[_0x2a56e3(0x948)][_0x2a56e3(0x859)]=function(){this['padding']=0x0;},Window_PictureCoordinates[_0x2a56e3(0x948)][_0x2a56e3(0x1cd)]=function(){const _0x41df7a=_0x2a56e3;Window_Base[_0x41df7a(0x948)][_0x41df7a(0x1cd)]['call'](this),this[_0x41df7a(0x84e)]();},Window_PictureCoordinates[_0x2a56e3(0x948)][_0x2a56e3(0x84e)]=function(){if(!this['needsUpdate']())return;this['refresh']();},Window_PictureCoordinates[_0x2a56e3(0x948)]['needsUpdate']=function(){const _0x3c9cfb=_0x2a56e3,_0x3caed4=$gameTemp['_pictureCoordinatesMode'],_0x3bb7d0=$gameScreen[_0x3c9cfb(0x1a8)](_0x3caed4);return _0x3bb7d0?this['_lastOrigin']!==_0x3bb7d0[_0x3c9cfb(0x21d)]||this['_lastX']!==_0x3bb7d0['_x']||this[_0x3c9cfb(0x55d)]!==_0x3bb7d0['_y']:![];},Window_PictureCoordinates[_0x2a56e3(0x948)]['refresh']=function(){const _0x4ea3b5=_0x2a56e3;this['contents'][_0x4ea3b5(0x3a9)]();const _0x2e7d92=$gameTemp[_0x4ea3b5(0x4ce)],_0x117b92=$gameScreen[_0x4ea3b5(0x1a8)](_0x2e7d92);if(!_0x117b92)return;this[_0x4ea3b5(0x8d3)]=_0x117b92[_0x4ea3b5(0x21d)],this['_lastX']=_0x117b92['_x'],this['_lastY']=_0x117b92['_y'];const _0x397b0d=ColorManager['itemBackColor1']();this[_0x4ea3b5(0x640)][_0x4ea3b5(0x5e6)](0x0,0x0,this[_0x4ea3b5(0x15e)],this[_0x4ea3b5(0x78a)],_0x397b0d);const _0x465bf1=_0x4ea3b5(0x529)[_0x4ea3b5(0x6ba)](_0x117b92[_0x4ea3b5(0x21d)]===0x0?_0x4ea3b5(0x9b8):_0x4ea3b5(0x1bf)),_0x29282b='X:\x20%1'[_0x4ea3b5(0x6ba)](_0x117b92['_x']),_0x4b468d='Y:\x20%1'[_0x4ea3b5(0x6ba)](_0x117b92['_y']),_0x654f21=_0x4ea3b5(0x70d)[_0x4ea3b5(0x6ba)](TextManager[_0x4ea3b5(0x849)](_0x4ea3b5(0x71b)));let _0x20ac4d=Math[_0x4ea3b5(0x6ad)](this[_0x4ea3b5(0x15e)]/0x4);this[_0x4ea3b5(0x21a)](_0x465bf1,_0x20ac4d*0x0,0x0,_0x20ac4d),this[_0x4ea3b5(0x21a)](_0x29282b,_0x20ac4d*0x1,0x0,_0x20ac4d,_0x4ea3b5(0x4e1)),this[_0x4ea3b5(0x21a)](_0x4b468d,_0x20ac4d*0x2,0x0,_0x20ac4d,_0x4ea3b5(0x4e1));const _0x2cb0d0=this[_0x4ea3b5(0x578)](_0x654f21)[_0x4ea3b5(0x290)],_0x3dbcd7=this[_0x4ea3b5(0x15e)]-_0x2cb0d0;this[_0x4ea3b5(0x234)](_0x654f21,_0x3dbcd7,0x0,_0x2cb0d0);},VisuMZ['ShowDevTools']=function(_0x43c7bf){const _0x1b22d8=_0x2a56e3;if(Utils[_0x1b22d8(0x245)](_0x1b22d8(0x479))){var _0x1f0b10=require(_0x1b22d8(0x77c))[_0x1b22d8(0x431)][_0x1b22d8(0x918)]();SceneManager['showDevTools']();if(_0x43c7bf)setTimeout(_0x1f0b10['focus'][_0x1b22d8(0x63d)](_0x1f0b10),0x190);}},VisuMZ['ApplyEasing']=function(_0x27e5c7,_0x47a793){const _0x41af39=_0x2a56e3;_0x47a793=_0x47a793[_0x41af39(0x67c)]();var _0x4abe21=1.70158,_0x26d08a=0.7;switch(_0x47a793){case'LINEAR':return _0x27e5c7;case _0x41af39(0x7e7):return-0x1*Math[_0x41af39(0x597)](_0x27e5c7*(Math['PI']/0x2))+0x1;case'OUTSINE':return Math[_0x41af39(0x298)](_0x27e5c7*(Math['PI']/0x2));case _0x41af39(0x1e2):return-0.5*(Math[_0x41af39(0x597)](Math['PI']*_0x27e5c7)-0x1);case _0x41af39(0x76f):return _0x27e5c7*_0x27e5c7;case _0x41af39(0x622):return _0x27e5c7*(0x2-_0x27e5c7);case _0x41af39(0x3e4):return _0x27e5c7<0.5?0x2*_0x27e5c7*_0x27e5c7:-0x1+(0x4-0x2*_0x27e5c7)*_0x27e5c7;case _0x41af39(0x7d9):return _0x27e5c7*_0x27e5c7*_0x27e5c7;case'OUTCUBIC':var _0x3f1048=_0x27e5c7-0x1;return _0x3f1048*_0x3f1048*_0x3f1048+0x1;case _0x41af39(0x816):return _0x27e5c7<0.5?0x4*_0x27e5c7*_0x27e5c7*_0x27e5c7:(_0x27e5c7-0x1)*(0x2*_0x27e5c7-0x2)*(0x2*_0x27e5c7-0x2)+0x1;case _0x41af39(0x548):return _0x27e5c7*_0x27e5c7*_0x27e5c7*_0x27e5c7;case _0x41af39(0x5c8):var _0x3f1048=_0x27e5c7-0x1;return 0x1-_0x3f1048*_0x3f1048*_0x3f1048*_0x3f1048;case _0x41af39(0x2af):var _0x3f1048=_0x27e5c7-0x1;return _0x27e5c7<0.5?0x8*_0x27e5c7*_0x27e5c7*_0x27e5c7*_0x27e5c7:0x1-0x8*_0x3f1048*_0x3f1048*_0x3f1048*_0x3f1048;case _0x41af39(0x8d1):return _0x27e5c7*_0x27e5c7*_0x27e5c7*_0x27e5c7*_0x27e5c7;case _0x41af39(0x2da):var _0x3f1048=_0x27e5c7-0x1;return 0x1+_0x3f1048*_0x3f1048*_0x3f1048*_0x3f1048*_0x3f1048;case _0x41af39(0x86c):var _0x3f1048=_0x27e5c7-0x1;return _0x27e5c7<0.5?0x10*_0x27e5c7*_0x27e5c7*_0x27e5c7*_0x27e5c7*_0x27e5c7:0x1+0x10*_0x3f1048*_0x3f1048*_0x3f1048*_0x3f1048*_0x3f1048;case _0x41af39(0x4a5):if(_0x27e5c7===0x0){if(_0x41af39(0x2f4)!=='HGPng')return 0x0;else this[_0x41af39(0x19e)]&&this[_0x41af39(0x19e)]();}return Math[_0x41af39(0x19d)](0x2,0xa*(_0x27e5c7-0x1));case'OUTEXPO':if(_0x27e5c7===0x1){if(_0x41af39(0x13b)===_0x41af39(0x13b))return 0x1;else{const _0x2b58fe=this['name'](),_0x4c7ce6=this[_0x41af39(0x87c)](),_0x11149c=this[_0x41af39(0x6ab)]();this['setupFont'](),this['bitmap'][_0x41af39(0x3a9)](),this[_0x41af39(0x65e)][_0x41af39(0x1a9)](_0x2b58fe,0x0,0x0,_0x4c7ce6,_0x11149c,_0x41af39(0x58e));}}return-Math['pow'](0x2,-0xa*_0x27e5c7)+0x1;case _0x41af39(0x680):if(_0x27e5c7===0x0||_0x27e5c7===0x1)return _0x27e5c7;var _0x294fdb=_0x27e5c7*0x2,_0x11dd24=_0x294fdb-0x1;if(_0x294fdb<0x1)return 0.5*Math[_0x41af39(0x19d)](0x2,0xa*_0x11dd24);return 0.5*(-Math[_0x41af39(0x19d)](0x2,-0xa*_0x11dd24)+0x2);case _0x41af39(0x442):var _0x294fdb=_0x27e5c7/0x1;return-0x1*(Math[_0x41af39(0x7a4)](0x1-_0x294fdb*_0x27e5c7)-0x1);case _0x41af39(0x579):var _0x3f1048=_0x27e5c7-0x1;return Math['sqrt'](0x1-_0x3f1048*_0x3f1048);case _0x41af39(0x851):var _0x294fdb=_0x27e5c7*0x2,_0x11dd24=_0x294fdb-0x2;if(_0x294fdb<0x1){if('Pauxq'===_0x41af39(0x4d9))return-0.5*(Math[_0x41af39(0x7a4)](0x1-_0x294fdb*_0x294fdb)-0x1);else _0x1843db+=_0x10c77e,_0x2cada9+=_0x4aa885,_0x4772de+=_0x41af39(0x396)['format'](_0x48f3ef['id'],_0x2d86a7[_0x41af39(0x6f5)]),_0x37e566+=_0x606fae,_0x56e119+=_0x292757,_0x2825c3+=_0x521e70,_0x167bfa+=_0x41af39(0x582)['format'](_0x10d957['id'],_0x337858[_0x41af39(0x6f5)]),_0x28a3f3+=_0x5e8f05;}return 0.5*(Math['sqrt'](0x1-_0x11dd24*_0x11dd24)+0x1);case _0x41af39(0x9be):return _0x27e5c7*_0x27e5c7*((_0x4abe21+0x1)*_0x27e5c7-_0x4abe21);case'OUTBACK':var _0x294fdb=_0x27e5c7/0x1-0x1;return _0x294fdb*_0x294fdb*((_0x4abe21+0x1)*_0x294fdb+_0x4abe21)+0x1;break;case _0x41af39(0x2ed):var _0x294fdb=_0x27e5c7*0x2,_0x12c717=_0x294fdb-0x2,_0x2300b5=_0x4abe21*1.525;if(_0x294fdb<0x1)return'bawfi'===_0x41af39(0x54f)?0.5*_0x294fdb*_0x294fdb*((_0x2300b5+0x1)*_0x294fdb-_0x2300b5):this[_0x41af39(0x747)](_0x3eb6e9);return 0.5*(_0x12c717*_0x12c717*((_0x2300b5+0x1)*_0x12c717+_0x2300b5)+0x2);case _0x41af39(0x136):if(_0x27e5c7===0x0||_0x27e5c7===0x1)return _0x27e5c7;var _0x294fdb=_0x27e5c7/0x1,_0x11dd24=_0x294fdb-0x1,_0x4b241f=0x1-_0x26d08a,_0x2300b5=_0x4b241f/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math[_0x41af39(0x19d)](0x2,0xa*_0x11dd24)*Math[_0x41af39(0x298)]((_0x11dd24-_0x2300b5)*(0x2*Math['PI'])/_0x4b241f));case'OUTELASTIC':var _0x4b241f=0x1-_0x26d08a,_0x294fdb=_0x27e5c7*0x2;if(_0x27e5c7===0x0||_0x27e5c7===0x1){if(_0x41af39(0x8f0)!==_0x41af39(0x4dc))return _0x27e5c7;else _0x35871b[_0x41af39(0x4ce)]=_0x4e97ac,_0x3d74f5['clear'](),_0x4fa405[_0x41af39(0x3a9)]();}var _0x2300b5=_0x4b241f/(0x2*Math['PI'])*Math[_0x41af39(0x5e7)](0x1);return Math[_0x41af39(0x19d)](0x2,-0xa*_0x294fdb)*Math[_0x41af39(0x298)]((_0x294fdb-_0x2300b5)*(0x2*Math['PI'])/_0x4b241f)+0x1;case _0x41af39(0x96e):var _0x4b241f=0x1-_0x26d08a;if(_0x27e5c7===0x0||_0x27e5c7===0x1)return _0x27e5c7;var _0x294fdb=_0x27e5c7*0x2,_0x11dd24=_0x294fdb-0x1,_0x2300b5=_0x4b241f/(0x2*Math['PI'])*Math[_0x41af39(0x5e7)](0x1);if(_0x294fdb<0x1)return-0.5*(Math[_0x41af39(0x19d)](0x2,0xa*_0x11dd24)*Math[_0x41af39(0x298)]((_0x11dd24-_0x2300b5)*(0x2*Math['PI'])/_0x4b241f));return Math[_0x41af39(0x19d)](0x2,-0xa*_0x11dd24)*Math[_0x41af39(0x298)]((_0x11dd24-_0x2300b5)*(0x2*Math['PI'])/_0x4b241f)*0.5+0x1;case _0x41af39(0x25d):var _0x294fdb=_0x27e5c7/0x1;if(_0x294fdb<0x1/2.75){if(_0x41af39(0x95c)==='mZQDQ')this[_0x41af39(0x640)][_0x41af39(0x1fa)]>=0x18&&(this[_0x41af39(0x640)]['fontSize']-=0x6);else return 7.5625*_0x294fdb*_0x294fdb;}else{if(_0x294fdb<0x2/2.75){if(_0x41af39(0x5f8)===_0x41af39(0x5f8)){var _0x12c717=_0x294fdb-1.5/2.75;return 7.5625*_0x12c717*_0x12c717+0.75;}else{_0x52c10c[_0x41af39(0x803)][_0x41af39(0x786)][_0x41af39(0x697)](this);if(!_0x3b4f37['_changingClass'])this[_0x41af39(0x65b)]();}}else{if(_0x294fdb<2.5/2.75){if(_0x41af39(0x50d)!==_0x41af39(0x121)){var _0x12c717=_0x294fdb-2.25/2.75;return 7.5625*_0x12c717*_0x12c717+0.9375;}else{const _0x37bd6c=_0x47bf3e[_0x41af39(0x70a)]()*_0x1e391d['tileWidth']();return(this['_x']-_0x37bd6c)*_0x1409ac[_0x41af39(0x173)]();}}else{var _0x12c717=_0x294fdb-2.625/2.75;return 7.5625*_0x12c717*_0x12c717+0.984375;}}}case'INBOUNCE':var _0x500d17=0x1-VisuMZ['ApplyEasing'](0x1-_0x27e5c7,_0x41af39(0x2e2));return _0x500d17;case'INOUTBOUNCE':if(_0x27e5c7<0.5)var _0x500d17=VisuMZ[_0x41af39(0x709)](_0x27e5c7*0x2,_0x41af39(0x8a9))*0.5;else{if(_0x41af39(0x373)==='dXnLw')var _0x500d17=VisuMZ[_0x41af39(0x709)](_0x27e5c7*0x2-0x1,_0x41af39(0x2e2))*0.5+0.5;else this[_0x41af39(0x2f5)]();}return _0x500d17;default:return _0x27e5c7;}},VisuMZ[_0x2a56e3(0x7fb)]=function(_0x39212b){const _0x1037d2=_0x2a56e3;_0x39212b=String(_0x39212b)[_0x1037d2(0x67c)]();const _0x540600=VisuMZ[_0x1037d2(0x803)][_0x1037d2(0x3f7)]['Param'];if(_0x39212b===_0x1037d2(0x39c))return _0x540600[_0x1037d2(0x440)];if(_0x39212b===_0x1037d2(0x990))return _0x540600['IconParam1'];if(_0x39212b==='ATK')return _0x540600['IconParam2'];if(_0x39212b===_0x1037d2(0x66b))return _0x540600[_0x1037d2(0x689)];if(_0x39212b===_0x1037d2(0x7bf))return _0x540600['IconParam4'];if(_0x39212b===_0x1037d2(0x1e3))return _0x540600[_0x1037d2(0x2b8)];if(_0x39212b===_0x1037d2(0x2f9))return _0x540600[_0x1037d2(0x3b8)];if(_0x39212b===_0x1037d2(0x623))return _0x540600[_0x1037d2(0x332)];if(_0x39212b===_0x1037d2(0x98e))return _0x540600[_0x1037d2(0x8b2)];if(_0x39212b==='EVA')return _0x540600[_0x1037d2(0x45a)];if(_0x39212b===_0x1037d2(0x16a))return _0x540600['IconXParam2'];if(_0x39212b===_0x1037d2(0x58c))return _0x540600['IconXParam3'];if(_0x39212b==='MEV')return _0x540600[_0x1037d2(0x906)];if(_0x39212b===_0x1037d2(0x5f0))return _0x540600['IconXParam5'];if(_0x39212b===_0x1037d2(0x388))return _0x540600[_0x1037d2(0x336)];if(_0x39212b===_0x1037d2(0x9b0))return _0x540600[_0x1037d2(0x48e)];if(_0x39212b==='MRG')return _0x540600[_0x1037d2(0x637)];if(_0x39212b===_0x1037d2(0x51a))return _0x540600[_0x1037d2(0x1ba)];if(_0x39212b==='TGR')return _0x540600[_0x1037d2(0x389)];if(_0x39212b===_0x1037d2(0x8d6))return _0x540600[_0x1037d2(0x9a2)];if(_0x39212b===_0x1037d2(0x7d3))return _0x540600['IconSParam2'];if(_0x39212b===_0x1037d2(0x3ec))return _0x540600['IconSParam3'];if(_0x39212b==='MCR')return _0x540600['IconSParam4'];if(_0x39212b===_0x1037d2(0x3d4))return _0x540600['IconSParam5'];if(_0x39212b===_0x1037d2(0x8eb))return _0x540600[_0x1037d2(0x64a)];if(_0x39212b===_0x1037d2(0x436))return _0x540600[_0x1037d2(0x54c)];if(_0x39212b===_0x1037d2(0x4ca))return _0x540600['IconSParam8'];if(_0x39212b===_0x1037d2(0x92e))return _0x540600[_0x1037d2(0x988)];if(VisuMZ[_0x1037d2(0x803)][_0x1037d2(0x1de)][_0x39212b])return VisuMZ['CoreEngine'][_0x1037d2(0x1de)][_0x39212b]||0x0;return 0x0;},VisuMZ[_0x2a56e3(0x164)]=function(_0x55ab5c,_0x155ac8,_0x541370){const _0x7edff6=_0x2a56e3;if(_0x541370===undefined&&_0x55ab5c%0x1===0x0)return _0x55ab5c;if(_0x541370!==undefined&&[_0x7edff6(0x39c),_0x7edff6(0x990),_0x7edff6(0x500),_0x7edff6(0x66b),'MAT',_0x7edff6(0x1e3),_0x7edff6(0x2f9),'LUK'][_0x7edff6(0x559)](String(_0x541370)[_0x7edff6(0x67c)]()[_0x7edff6(0x74d)]()))return _0x55ab5c;_0x155ac8=_0x155ac8||0x0;if(VisuMZ[_0x7edff6(0x803)][_0x7edff6(0x3c9)][_0x541370]){if(_0x7edff6(0x661)!==_0x7edff6(0x661)){var _0x53d418=_0x375075(_0x2868b6['$1'])/0x64;_0x4717c9*=_0x53d418;}else return VisuMZ['CoreEngine'][_0x7edff6(0x966)][_0x541370]==='integer'?_0x55ab5c:String((_0x55ab5c*0x64)[_0x7edff6(0x448)](_0x155ac8))+'%';}return String((_0x55ab5c*0x64)[_0x7edff6(0x448)](_0x155ac8))+'%';},VisuMZ['GroupDigits']=function(_0x5a11a5){const _0x2a8498=_0x2a56e3;_0x5a11a5=String(_0x5a11a5);if(!_0x5a11a5)return _0x5a11a5;if(typeof _0x5a11a5!=='string')return _0x5a11a5;const _0xefec8=VisuMZ[_0x2a8498(0x803)]['Settings'][_0x2a8498(0x2fc)]['DigitGroupingLocale']||_0x2a8498(0x2ac),_0x5647cc={'maximumFractionDigits':0x6};_0x5a11a5=_0x5a11a5[_0x2a8498(0x725)](/\[(.*?)\]/g,(_0xe51910,_0x3baf13)=>{const _0x17433d=_0x2a8498;if(_0x17433d(0x2d8)===_0x17433d(0x65c))_0x3e6933['setSideView'](!![]);else return VisuMZ[_0x17433d(0x746)](_0x3baf13,'[',']');}),_0x5a11a5=_0x5a11a5[_0x2a8498(0x725)](/<(.*?)>/g,(_0x1e4bdb,_0x332ee4)=>{const _0x2034b3=_0x2a8498;return VisuMZ[_0x2034b3(0x746)](_0x332ee4,'<','>');}),_0x5a11a5=_0x5a11a5['replace'](/\{\{(.*?)\}\}/g,(_0x2c3a7f,_0xdf117f)=>{const _0x5d1b9e=_0x2a8498;return VisuMZ[_0x5d1b9e(0x746)](_0xdf117f,'','');}),_0x5a11a5=_0x5a11a5[_0x2a8498(0x725)](/(\d+\.?\d*)/g,(_0x27c4ec,_0x1f8651)=>{const _0x84ff0c=_0x2a8498;let _0x4d298c=_0x1f8651;if(_0x4d298c[0x0]==='0')return _0x4d298c;if(_0x4d298c[_0x4d298c['length']-0x1]==='.'){if(_0x84ff0c(0x476)===_0x84ff0c(0x27c)){if(this[_0x84ff0c(0x95a)]===_0x317a25)this[_0x84ff0c(0x888)]();return this[_0x84ff0c(0x95a)];}else return Number(_0x4d298c)[_0x84ff0c(0x73a)](_0xefec8,_0x5647cc)+'.';}else return _0x4d298c[_0x4d298c[_0x84ff0c(0x9b5)]-0x1]===','?_0x84ff0c(0x166)!==_0x84ff0c(0x679)?Number(_0x4d298c)[_0x84ff0c(0x73a)](_0xefec8,_0x5647cc)+',':_0xe25461((_0x477850*0x64)[_0x84ff0c(0x448)](_0x420064))+'%':Number(_0x4d298c)['toLocaleString'](_0xefec8,_0x5647cc);});let _0x2f5773=0x3;while(_0x2f5773--){_0x5a11a5=VisuMZ['RevertPreserveNumbers'](_0x5a11a5);}return _0x5a11a5;},VisuMZ[_0x2a56e3(0x746)]=function(_0x3fc967,_0x3612bf,_0x2abfcf){const _0x588cb0=_0x2a56e3;return _0x3fc967=_0x3fc967[_0x588cb0(0x725)](/(\d)/gi,(_0x8f8faf,_0x2fe4ab)=>_0x588cb0(0x869)[_0x588cb0(0x6ba)](Number(_0x2fe4ab))),_0x588cb0(0x410)['format'](_0x3fc967,_0x3612bf,_0x2abfcf);},VisuMZ[_0x2a56e3(0x7d0)]=function(_0x2021ae){return _0x2021ae=_0x2021ae['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0xbb934f,_0x3130ae)=>Number(parseInt(_0x3130ae))),_0x2021ae;},VisuMZ['openURL']=function(_0x47f399){const _0x6346b1=_0x2a56e3;SoundManager[_0x6346b1(0x822)]();if(!Utils[_0x6346b1(0x363)]()){const _0x2191ce=window[_0x6346b1(0x70e)](_0x47f399,'_blank');}else{if('rXNyS'===_0x6346b1(0x5aa))_0x307438=_0x3e33d8['round'](_0x726fc4),_0x47a6b5=_0x5b2d6e[_0x6346b1(0x377)](_0x4dd6a9),_0x52da33[_0x6346b1(0x803)][_0x6346b1(0x979)]['call'](this,_0x2f5790,_0x54a9c5,_0x3ba883,_0x505b14);else{const _0x2f249f=process[_0x6346b1(0x7f5)]=='darwin'?_0x6346b1(0x70e):process[_0x6346b1(0x7f5)]==_0x6346b1(0x927)?'start':_0x6346b1(0x606);require(_0x6346b1(0x504))[_0x6346b1(0x601)](_0x2f249f+'\x20'+_0x47f399);}}},VisuMZ[_0x2a56e3(0x73c)]=function(_0x25c251,_0x4ff14c){const _0x936bcb=_0x2a56e3;if(!_0x25c251)return'';const _0x18aff8=_0x25c251[_0x936bcb(0x8cc)]||_0x25c251['id'];let _0x2dde20='';if(_0x25c251[_0x936bcb(0x380)]!==undefined&&_0x25c251['nickname']!==undefined){if('TpTHc'!=='TpTHc'){const _0x30d566=_0x4cbf6f[_0x936bcb(0x4ce)],_0x513581=_0x2af131[_0x936bcb(0x1a8)](_0x30d566);return _0x513581?this[_0x936bcb(0x8d3)]!==_0x513581[_0x936bcb(0x21d)]||this[_0x936bcb(0x3ef)]!==_0x513581['_x']||this[_0x936bcb(0x55d)]!==_0x513581['_y']:![];}else _0x2dde20=_0x936bcb(0x511)[_0x936bcb(0x6ba)](_0x18aff8,_0x4ff14c);}_0x25c251['expParams']!==undefined&&_0x25c251[_0x936bcb(0x8a7)]!==undefined&&(_0x2dde20='Class-%1-%2'['format'](_0x18aff8,_0x4ff14c));_0x25c251[_0x936bcb(0x425)]!==undefined&&_0x25c251['requiredWtypeId1']!==undefined&&(_0x2dde20=_0x936bcb(0x26d)[_0x936bcb(0x6ba)](_0x18aff8,_0x4ff14c));if(_0x25c251['itypeId']!==undefined&&_0x25c251[_0x936bcb(0x965)]!==undefined){if(_0x936bcb(0x805)!=='xNClB')_0x2dde20=_0x936bcb(0x928)[_0x936bcb(0x6ba)](_0x18aff8,_0x4ff14c);else return this['_scene']&&this['_scene'][_0x936bcb(0x34f)]===_0xc98481;}_0x25c251[_0x936bcb(0x64c)]!==undefined&&_0x25c251['etypeId']===0x1&&(_0x2dde20=_0x936bcb(0x995)['format'](_0x18aff8,_0x4ff14c));_0x25c251['atypeId']!==undefined&&_0x25c251[_0x936bcb(0x8b1)]>0x1&&('QscYw'===_0x936bcb(0x8f1)?this[_0x936bcb(0x246)][_0x936bcb(0x7a2)](_0x2b9150[_0x936bcb(0x7c9)][_0x936bcb(0x366)]):_0x2dde20=_0x936bcb(0x46d)[_0x936bcb(0x6ba)](_0x18aff8,_0x4ff14c));if(_0x25c251[_0x936bcb(0x654)]!==undefined&&_0x25c251[_0x936bcb(0x2a5)]!==undefined){if(_0x936bcb(0x352)==='GLhtv')_0x2dde20=_0x936bcb(0x924)[_0x936bcb(0x6ba)](_0x18aff8,_0x4ff14c);else return this[_0x936bcb(0x97a)]&&this['_scene']instanceof _0x158ec7;}return _0x25c251[_0x936bcb(0x3d0)]!==undefined&&_0x25c251[_0x936bcb(0x838)]!==undefined&&(_0x936bcb(0x6e6)===_0x936bcb(0x56e)?(_0x536739['CoreEngine'][_0x936bcb(0x52f)]['call'](this),this['setCoreEngineUpdateWindowBg']()):_0x2dde20=_0x936bcb(0x6b0)[_0x936bcb(0x6ba)](_0x18aff8,_0x4ff14c)),_0x2dde20;},Game_Picture[_0x2a56e3(0x948)][_0x2a56e3(0x612)]=function(){return this['_anchor'];},VisuMZ['CoreEngine'][_0x2a56e3(0x20e)]=Game_Picture[_0x2a56e3(0x948)][_0x2a56e3(0x4a7)],Game_Picture[_0x2a56e3(0x948)][_0x2a56e3(0x4a7)]=function(){const _0x1e97f7=_0x2a56e3;VisuMZ['CoreEngine']['Game_Picture_initBasic'][_0x1e97f7(0x697)](this),this[_0x1e97f7(0x238)]={'x':0x0,'y':0x0},this[_0x1e97f7(0x41f)]={'x':0x0,'y':0x0};},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x7ca)]=Game_Picture[_0x2a56e3(0x948)][_0x2a56e3(0x18a)],Game_Picture[_0x2a56e3(0x948)][_0x2a56e3(0x18a)]=function(){const _0x26ac58=_0x2a56e3;this['updateAnchor']();const _0x50aca3=this[_0x26ac58(0x836)];VisuMZ['CoreEngine'][_0x26ac58(0x7ca)]['call'](this),_0x50aca3>0x0&&this['_duration']<=0x0&&(this['_x']=this[_0x26ac58(0x957)],this['_y']=this[_0x26ac58(0x128)],this[_0x26ac58(0x863)]=this['_targetScaleX'],this[_0x26ac58(0x75d)]=this[_0x26ac58(0x375)],this[_0x26ac58(0x5e8)]=this[_0x26ac58(0x643)],this[_0x26ac58(0x238)]&&(this[_0x26ac58(0x238)]['x']=this[_0x26ac58(0x41f)]['x'],this[_0x26ac58(0x238)]['y']=this['_targetAnchor']['y']));},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x506)]=Game_Picture['prototype'][_0x2a56e3(0x16e)],Game_Picture['prototype'][_0x2a56e3(0x16e)]=function(_0x450077,_0x52b937,_0x28f1cd,_0x488c8a,_0xced85f,_0x4f92e5,_0x4573b0,_0x399783){const _0xc78233=_0x2a56e3;VisuMZ[_0xc78233(0x803)][_0xc78233(0x506)][_0xc78233(0x697)](this,_0x450077,_0x52b937,_0x28f1cd,_0x488c8a,_0xced85f,_0x4f92e5,_0x4573b0,_0x399783),this[_0xc78233(0x19f)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x52b937]||{'x':0x0,'y':0x0});},VisuMZ[_0x2a56e3(0x803)]['Game_Picture_move']=Game_Picture['prototype']['move'],Game_Picture['prototype']['move']=function(_0x48bcd7,_0x8be549,_0x184dcf,_0x2434ce,_0x3da79c,_0x122f98,_0x2cbbe8,_0x10bed3,_0x345184){const _0x42783e=_0x2a56e3;VisuMZ['CoreEngine'][_0x42783e(0x23c)][_0x42783e(0x697)](this,_0x48bcd7,_0x8be549,_0x184dcf,_0x2434ce,_0x3da79c,_0x122f98,_0x2cbbe8,_0x10bed3,_0x345184),this[_0x42783e(0x7c1)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x48bcd7]||{'x':0x0,'y':0x0});},Game_Picture[_0x2a56e3(0x948)][_0x2a56e3(0x667)]=function(){const _0x49a7f3=_0x2a56e3;this[_0x49a7f3(0x836)]>0x0&&(_0x49a7f3(0x72d)==='LnCXL'?(this[_0x49a7f3(0x238)]['x']=this[_0x49a7f3(0x550)](this[_0x49a7f3(0x238)]['x'],this['_targetAnchor']['x']),this['_anchor']['y']=this[_0x49a7f3(0x550)](this[_0x49a7f3(0x238)]['y'],this['_targetAnchor']['y'])):(_0x15bb89[_0x49a7f3(0x803)]['Scene_Battle_createSpriteset']['call'](this),_0x6d42f9=this[_0x49a7f3(0x482)]));},Game_Picture[_0x2a56e3(0x948)][_0x2a56e3(0x19f)]=function(_0x2e0498){const _0x5d8312=_0x2a56e3;this['_anchor']=_0x2e0498,this[_0x5d8312(0x41f)]=JsonEx[_0x5d8312(0x219)](this['_anchor']);},Game_Picture['prototype'][_0x2a56e3(0x7c1)]=function(_0x42f810){const _0x168633=_0x2a56e3;this[_0x168633(0x41f)]=_0x42f810;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x140)]=Sprite_Picture[_0x2a56e3(0x948)][_0x2a56e3(0x309)],Sprite_Picture['prototype'][_0x2a56e3(0x309)]=function(){const _0x2377b3=_0x2a56e3,_0x47465f=this['picture']();!_0x47465f[_0x2377b3(0x612)]()?VisuMZ[_0x2377b3(0x803)][_0x2377b3(0x140)][_0x2377b3(0x697)](this):(this[_0x2377b3(0x612)]['x']=_0x47465f['anchor']()['x'],this['anchor']['y']=_0x47465f[_0x2377b3(0x612)]()['y']);},Game_Action[_0x2a56e3(0x948)][_0x2a56e3(0x6bf)]=function(_0x54b47d){const _0x40420a=_0x2a56e3;if(_0x54b47d){const _0x2e003e=_0x54b47d[_0x40420a(0x37d)];if(_0x2e003e===0x1&&this['subject']()[_0x40420a(0x5d6)]()!==0x1)this[_0x40420a(0x569)]();else _0x2e003e===0x2&&this[_0x40420a(0x27d)]()[_0x40420a(0x8b8)]()!==0x2?this[_0x40420a(0x1df)]():_0x40420a(0x997)!==_0x40420a(0x997)?_0x1de2c0+=_0xcf2a9f(_0x71065d):this[_0x40420a(0x80b)](_0x2e003e);}else{if(_0x40420a(0x837)===_0x40420a(0x837))this[_0x40420a(0x3a9)]();else return 0x0;}},Game_Actor[_0x2a56e3(0x948)][_0x2a56e3(0x670)]=function(){const _0x677da=_0x2a56e3;return this[_0x677da(0x8bc)]()[_0x677da(0x513)](_0x5cbba4=>this[_0x677da(0x89a)](_0x5cbba4)&&this['skillTypes']()[_0x677da(0x559)](_0x5cbba4[_0x677da(0x425)]));},Window_Base[_0x2a56e3(0x948)]['createDimmerSprite']=function(){const _0x439ba6=_0x2a56e3;this['_dimmerSprite']=new Sprite(),this['_dimmerSprite']['bitmap']=new Bitmap(0x0,0x0),this[_0x439ba6(0x343)]['x']=0x0,this[_0x439ba6(0x211)](this[_0x439ba6(0x343)]);},Window_Base[_0x2a56e3(0x948)][_0x2a56e3(0x8dd)]=function(){const _0x9d5879=_0x2a56e3;if(this['_dimmerSprite']){const _0x4ea03c=this[_0x9d5879(0x343)]['bitmap'],_0x408784=this[_0x9d5879(0x290)],_0x48a961=this['height'],_0x5ca5aa=this[_0x9d5879(0x1bc)],_0x29c038=ColorManager[_0x9d5879(0x426)](),_0x52716f=ColorManager['dimColor2']();_0x4ea03c[_0x9d5879(0x4f6)](_0x408784,_0x48a961),_0x4ea03c[_0x9d5879(0x3d8)](0x0,0x0,_0x408784,_0x5ca5aa,_0x52716f,_0x29c038,!![]),_0x4ea03c[_0x9d5879(0x5e6)](0x0,_0x5ca5aa,_0x408784,_0x48a961-_0x5ca5aa*0x2,_0x29c038),_0x4ea03c['gradientFillRect'](0x0,_0x48a961-_0x5ca5aa,_0x408784,_0x5ca5aa,_0x29c038,_0x52716f,!![]),this['_dimmerSprite'][_0x9d5879(0x6ea)](0x0,0x0,_0x408784,_0x48a961);}},Game_Actor['prototype']['makeAutoBattleActions']=function(){const _0x39ddb0=_0x2a56e3;for(let _0x37b407=0x0;_0x37b407<this[_0x39ddb0(0x33b)]();_0x37b407++){const _0x5939be=this[_0x39ddb0(0x5b4)]();let _0x5f1b40=Number[_0x39ddb0(0x265)];this[_0x39ddb0(0x37f)](_0x37b407,_0x5939be[0x0]);for(const _0x24f78 of _0x5939be){const _0x530ace=_0x24f78[_0x39ddb0(0x4da)]();_0x530ace>_0x5f1b40&&(_0x5f1b40=_0x530ace,this[_0x39ddb0(0x37f)](_0x37b407,_0x24f78));}}this['setActionState'](_0x39ddb0(0x14d));},Window_BattleItem[_0x2a56e3(0x948)][_0x2a56e3(0x209)]=function(_0x2d646f){const _0x2c9280=_0x2a56e3;return BattleManager['actor']()?BattleManager[_0x2c9280(0x4ac)]()[_0x2c9280(0x89a)](_0x2d646f):_0x2c9280(0x171)!==_0x2c9280(0x171)?_0x7eaf32[_0x2c9280(0x948)]['textWidth']['call'](this,_0xfdc64f):Window_ItemList[_0x2c9280(0x948)]['isEnabled'][_0x2c9280(0x697)](this,_0x2d646f);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x4b2)]=Scene_Map[_0x2a56e3(0x948)][_0x2a56e3(0x508)],Scene_Map['prototype'][_0x2a56e3(0x508)]=function(){const _0x272162=_0x2a56e3;VisuMZ['CoreEngine'][_0x272162(0x4b2)][_0x272162(0x697)](this);const _0x2842d7=this['_spriteset'][_0x272162(0x499)];if(_0x2842d7)this[_0x272162(0x7bb)](_0x2842d7);},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x779)]=Scene_Battle[_0x2a56e3(0x948)]['createSpriteset'],Scene_Battle[_0x2a56e3(0x948)][_0x2a56e3(0x508)]=function(){const _0x5dad2d=_0x2a56e3;VisuMZ[_0x5dad2d(0x803)][_0x5dad2d(0x779)]['call'](this);const _0x8944ce=this[_0x5dad2d(0x482)][_0x5dad2d(0x499)];if(_0x8944ce)this[_0x5dad2d(0x7bb)](_0x8944ce);},Sprite_Actor[_0x2a56e3(0x948)]['update']=function(){const _0x2f7a62=_0x2a56e3;Sprite_Battler[_0x2f7a62(0x948)][_0x2f7a62(0x1cd)][_0x2f7a62(0x697)](this),this[_0x2f7a62(0x430)]();if(this['_actor']){if(_0x2f7a62(0x944)!==_0x2f7a62(0x944)){if(!this[_0x2f7a62(0x91e)]())return;this['refresh']();}else this[_0x2f7a62(0x22c)]();}else this[_0x2f7a62(0x760)]!==''&&(this[_0x2f7a62(0x760)]='');},Window[_0x2a56e3(0x948)][_0x2a56e3(0x5e5)]=function(){const _0x4b3e89=_0x2a56e3,_0x502934=this[_0x4b3e89(0x8c9)],_0x10de3d=this[_0x4b3e89(0x1d0)],_0x168866=0x18,_0x9c8940=_0x168866/0x2,_0x47cf5d=0x60+_0x168866,_0xb7a9a1=0x0+_0x168866;this['_downArrowSprite'][_0x4b3e89(0x65e)]=this[_0x4b3e89(0x8a8)],this[_0x4b3e89(0x7c6)][_0x4b3e89(0x612)]['x']=0.5,this[_0x4b3e89(0x7c6)]['anchor']['y']=0.5,this[_0x4b3e89(0x7c6)][_0x4b3e89(0x6ea)](_0x47cf5d+_0x9c8940,_0xb7a9a1+_0x9c8940+_0x168866,_0x168866,_0x9c8940),this[_0x4b3e89(0x7c6)]['move'](Math[_0x4b3e89(0x377)](_0x502934/0x2),Math[_0x4b3e89(0x377)](_0x10de3d-_0x9c8940)),this['_upArrowSprite']['bitmap']=this[_0x4b3e89(0x8a8)],this[_0x4b3e89(0x871)][_0x4b3e89(0x612)]['x']=0.5,this[_0x4b3e89(0x871)][_0x4b3e89(0x612)]['y']=0.5,this[_0x4b3e89(0x871)][_0x4b3e89(0x6ea)](_0x47cf5d+_0x9c8940,_0xb7a9a1,_0x168866,_0x9c8940),this[_0x4b3e89(0x871)]['move'](Math['round'](_0x502934/0x2),Math[_0x4b3e89(0x377)](_0x9c8940));},Window[_0x2a56e3(0x948)][_0x2a56e3(0x615)]=function(){const _0x5d8fb9=_0x2a56e3,_0x293929=0x90,_0x34835d=0x60,_0x13a7ed=0x18;this['_pauseSignSprite'][_0x5d8fb9(0x65e)]=this[_0x5d8fb9(0x8a8)],this[_0x5d8fb9(0x2ad)][_0x5d8fb9(0x612)]['x']=0.5,this[_0x5d8fb9(0x2ad)]['anchor']['y']=0x1,this[_0x5d8fb9(0x2ad)]['move'](Math[_0x5d8fb9(0x377)](this[_0x5d8fb9(0x8c9)]/0x2),this[_0x5d8fb9(0x1d0)]),this[_0x5d8fb9(0x2ad)][_0x5d8fb9(0x6ea)](_0x293929,_0x34835d,_0x13a7ed,_0x13a7ed),this[_0x5d8fb9(0x2ad)][_0x5d8fb9(0x8c5)]=0xff;},Window[_0x2a56e3(0x948)][_0x2a56e3(0x4bc)]=function(){const _0x3ce0a6=_0x2a56e3,_0x44d473=this[_0x3ce0a6(0x1d2)]['worldTransform'][_0x3ce0a6(0x4d1)](new Point(0x0,0x0)),_0x2c7b38=this[_0x3ce0a6(0x1d2)][_0x3ce0a6(0x296)];_0x2c7b38['x']=_0x44d473['x']+this['origin']['x'],_0x2c7b38['y']=_0x44d473['y']+this['origin']['y'],_0x2c7b38[_0x3ce0a6(0x290)]=Math[_0x3ce0a6(0x631)](this[_0x3ce0a6(0x15e)]*this[_0x3ce0a6(0x8ad)]['x']),_0x2c7b38[_0x3ce0a6(0x8c0)]=Math[_0x3ce0a6(0x631)](this[_0x3ce0a6(0x78a)]*this[_0x3ce0a6(0x8ad)]['y']);},Window[_0x2a56e3(0x948)][_0x2a56e3(0x509)]=function(){const _0x3bd8e9=_0x2a56e3,_0x3d43a7=this[_0x3bd8e9(0x7d7)],_0x518a48=Math[_0x3bd8e9(0x81b)](0x0,this[_0x3bd8e9(0x8c9)]-_0x3d43a7*0x2),_0x5c5278=Math[_0x3bd8e9(0x81b)](0x0,this[_0x3bd8e9(0x1d0)]-_0x3d43a7*0x2),_0x30ea22=this[_0x3bd8e9(0x917)],_0xe2f03f=_0x30ea22[_0x3bd8e9(0x677)][0x0];_0x30ea22[_0x3bd8e9(0x65e)]=this[_0x3bd8e9(0x8a8)],_0x30ea22[_0x3bd8e9(0x6ea)](0x0,0x0,0x60,0x60),_0x30ea22['move'](_0x3d43a7,_0x3d43a7),_0x30ea22[_0x3bd8e9(0x8ad)]['x']=_0x518a48/0x60,_0x30ea22[_0x3bd8e9(0x8ad)]['y']=_0x5c5278/0x60,_0xe2f03f[_0x3bd8e9(0x65e)]=this[_0x3bd8e9(0x8a8)],_0xe2f03f['setFrame'](0x0,0x60,0x60,0x60),_0xe2f03f[_0x3bd8e9(0x8ea)](0x0,0x0,_0x518a48,_0x5c5278),_0xe2f03f[_0x3bd8e9(0x8ad)]['x']=0x1/_0x30ea22['scale']['x'],_0xe2f03f[_0x3bd8e9(0x8ad)]['y']=0x1/_0x30ea22['scale']['y'],_0x30ea22[_0x3bd8e9(0x561)](this[_0x3bd8e9(0x943)]);},Game_Temp[_0x2a56e3(0x948)][_0x2a56e3(0x8fa)]=function(){const _0x3282f8=_0x2a56e3;this['_animationQueue']=[],this['_fauxAnimationQueue']=[],this[_0x3282f8(0x191)]=[],this[_0x3282f8(0x858)]=[];},VisuMZ[_0x2a56e3(0x803)]['Scene_Base_terminateAnimationClearBugFix']=Scene_Base['prototype'][_0x2a56e3(0x2b4)],Scene_Base[_0x2a56e3(0x948)][_0x2a56e3(0x2b4)]=function(){const _0xb6afe3=_0x2a56e3;if($gameTemp)$gameTemp[_0xb6afe3(0x8fa)]();VisuMZ[_0xb6afe3(0x803)][_0xb6afe3(0x23e)]['call'](this);},Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x424)]=function(_0x509667){const _0x441e8f=_0x2a56e3,_0xc44fbb=this[_0x441e8f(0x69d)];_0xc44fbb[_0x441e8f(0x3da)](),_0xc44fbb[_0x441e8f(0x1a4)]=this[_0x441e8f(0x5a6)]();const _0x4674ff=_0xc44fbb[_0x441e8f(0x4c2)](_0x509667)[_0x441e8f(0x290)];return _0xc44fbb[_0x441e8f(0x18c)](),_0x4674ff;},Window_Message['prototype'][_0x2a56e3(0x2c7)]=function(_0x19b263){const _0x17ec8f=_0x2a56e3;return this[_0x17ec8f(0x7de)]()?this[_0x17ec8f(0x640)][_0x17ec8f(0x424)](_0x19b263):Window_Base[_0x17ec8f(0x948)]['textWidth'][_0x17ec8f(0x697)](this,_0x19b263);},Window_Message[_0x2a56e3(0x948)][_0x2a56e3(0x7de)]=function(){const _0x13d46f=_0x2a56e3;return VisuMZ[_0x13d46f(0x803)][_0x13d46f(0x3f7)]['QoL']['FontWidthFix']??!![];},VisuMZ[_0x2a56e3(0x803)]['Game_Action_numRepeats']=Game_Action[_0x2a56e3(0x948)][_0x2a56e3(0x776)],Game_Action[_0x2a56e3(0x948)][_0x2a56e3(0x776)]=function(){const _0x289a4e=_0x2a56e3;return this[_0x289a4e(0x2f2)]()?VisuMZ[_0x289a4e(0x803)]['Game_Action_numRepeats'][_0x289a4e(0x697)](this):0x0;},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x652)]=Game_Action[_0x2a56e3(0x948)][_0x2a56e3(0x569)],Game_Action[_0x2a56e3(0x948)][_0x2a56e3(0x569)]=function(){const _0x49575f=_0x2a56e3;this[_0x49575f(0x27d)]()&&this['subject']()[_0x49575f(0x79e)]()?VisuMZ[_0x49575f(0x803)][_0x49575f(0x652)][_0x49575f(0x697)](this):this['clear']();},Sprite_Name[_0x2a56e3(0x948)][_0x2a56e3(0x6ab)]=function(){return 0x24;},Sprite_Name['prototype'][_0x2a56e3(0x685)]=function(){const _0x1c1218=_0x2a56e3,_0x2f9cfe=this[_0x1c1218(0x6f5)](),_0x2ec846=this['bitmapWidth'](),_0x8f46f4=this[_0x1c1218(0x6ab)]();this[_0x1c1218(0x921)](),this['bitmap'][_0x1c1218(0x3a9)](),this[_0x1c1218(0x65e)]['drawTextTopAligned'](_0x2f9cfe,0x0,0x0,_0x2ec846,_0x8f46f4,_0x1c1218(0x58e));},Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x1a9)]=function(_0x54cdae,_0x1fa543,_0x100470,_0x319c0a,_0x1efe72,_0x209795){const _0x5b18ea=_0x2a56e3,_0x42e6cb=this[_0x5b18ea(0x69d)],_0x33e5fe=_0x42e6cb[_0x5b18ea(0x665)];_0x319c0a=_0x319c0a||0xffffffff;let _0x482810=_0x1fa543,_0x2feed0=Math[_0x5b18ea(0x377)](_0x100470+0x18/0x2+this[_0x5b18ea(0x1fa)]*0.35);if(_0x209795===_0x5b18ea(0x4e1)){if(_0x5b18ea(0x14f)===_0x5b18ea(0x14f))_0x482810+=_0x319c0a/0x2;else{const _0x17caf4=_0x540e87['CoreEngine'][_0x5b18ea(0x3f7)][_0x5b18ea(0x120)];for(const _0x5b477c of _0x17caf4){const _0x18fcaa=_0x5b477c[_0x5b18ea(0x242)][_0x5b18ea(0x725)](/[ ]/g,''),_0x2d07b7=_0x5b477c[_0x5b18ea(0x19a)];_0x390ee3['CoreEngine'][_0x5b18ea(0x180)](_0x18fcaa,_0x2d07b7);}}}_0x209795===_0x5b18ea(0x179)&&(_0x482810+=_0x319c0a),_0x42e6cb['save'](),_0x42e6cb[_0x5b18ea(0x1a4)]=this[_0x5b18ea(0x5a6)](),_0x42e6cb[_0x5b18ea(0x50c)]=_0x209795,_0x42e6cb['textBaseline']=_0x5b18ea(0x2d1),_0x42e6cb[_0x5b18ea(0x665)]=0x1,this['_drawTextOutline'](_0x54cdae,_0x482810,_0x2feed0,_0x319c0a),_0x42e6cb[_0x5b18ea(0x665)]=_0x33e5fe,this[_0x5b18ea(0x267)](_0x54cdae,_0x482810,_0x2feed0,_0x319c0a),_0x42e6cb[_0x5b18ea(0x18c)](),this[_0x5b18ea(0x976)]['update']();},VisuMZ[_0x2a56e3(0x803)][_0x2a56e3(0x43f)]=BattleManager[_0x2a56e3(0x2fa)],BattleManager['checkSubstitute']=function(_0x561432){const _0x1144d8=_0x2a56e3;if(this[_0x1144d8(0x3db)][_0x1144d8(0x7a9)]())return![];return VisuMZ[_0x1144d8(0x803)][_0x1144d8(0x43f)][_0x1144d8(0x697)](this,_0x561432);},BattleManager[_0x2a56e3(0x29a)]=function(){const _0x431e17=_0x2a56e3;if(this[_0x431e17(0x1b7)])this[_0x431e17(0x12d)][_0x431e17(0x29a)](this[_0x431e17(0x1b7)]);this['_phase']=_0x431e17(0x4d5),this['_subject']&&this[_0x431e17(0x1b7)]['numActions']()===0x0&&(this[_0x431e17(0x33a)](this['_subject']),this[_0x431e17(0x1b7)]=null);},Bitmap[_0x2a56e3(0x948)][_0x2a56e3(0x41d)]=function(){const _0x391cf9=_0x2a56e3;this['_image']=new Image(),this[_0x391cf9(0x6e5)][_0x391cf9(0x382)]=this[_0x391cf9(0x52a)][_0x391cf9(0x63d)](this),this['_image'][_0x391cf9(0x7f9)]=this[_0x391cf9(0x3fe)][_0x391cf9(0x63d)](this),this[_0x391cf9(0x936)](),this[_0x391cf9(0x892)]='loading';if(Utils['hasEncryptedImages']()){if(_0x391cf9(0x692)===_0x391cf9(0x692))this[_0x391cf9(0x7da)]();else{const _0x6c1891=_0x20c8ba[_0x391cf9(0x803)][_0x391cf9(0x3f7)][_0x391cf9(0x1d6)];this['_coreEngineShakeStyle']=_0x6c1891?.[_0x391cf9(0x23a)]||_0x391cf9(0x300);}}else _0x391cf9(0x81c)===_0x391cf9(0x6a6)?this[_0x391cf9(0x514)]():(this[_0x391cf9(0x6e5)][_0x391cf9(0x2ce)]=this[_0x391cf9(0x604)],![]&&this['_image'][_0x391cf9(0x290)]>0x0&&(this[_0x391cf9(0x6e5)][_0x391cf9(0x382)]=null,this[_0x391cf9(0x52a)]()));};