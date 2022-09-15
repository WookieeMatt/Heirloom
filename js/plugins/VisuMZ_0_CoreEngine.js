//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.69;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.69] [CoreEngine]
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

const _0x3a5d8e=_0x23aa;(function(_0x250fc7,_0x19d428){const _0x151199=_0x23aa,_0x30df40=_0x250fc7();while(!![]){try{const _0x3c1345=parseInt(_0x151199(0x539))/0x1*(-parseInt(_0x151199(0x40f))/0x2)+-parseInt(_0x151199(0x326))/0x3*(parseInt(_0x151199(0x384))/0x4)+parseInt(_0x151199(0x1dc))/0x5*(parseInt(_0x151199(0x2ba))/0x6)+parseInt(_0x151199(0x775))/0x7*(parseInt(_0x151199(0x74c))/0x8)+-parseInt(_0x151199(0x714))/0x9*(parseInt(_0x151199(0x37e))/0xa)+-parseInt(_0x151199(0x3e3))/0xb*(parseInt(_0x151199(0x80f))/0xc)+parseInt(_0x151199(0x29d))/0xd*(parseInt(_0x151199(0x6d6))/0xe);if(_0x3c1345===_0x19d428)break;else _0x30df40['push'](_0x30df40['shift']());}catch(_0x531d07){_0x30df40['push'](_0x30df40['shift']());}}}(_0x2be0,0x8b19f));var label=_0x3a5d8e(0x690),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x1dd185){const _0x36a504=_0x3a5d8e;return _0x1dd185['status']&&_0x1dd185[_0x36a504(0x7a1)][_0x36a504(0x2c6)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x3a5d8e(0x227)]||{},VisuMZ[_0x3a5d8e(0x306)]=function(_0x585ce9,_0x5c9604){const _0x3a8df0=_0x3a5d8e;for(const _0x417b4e in _0x5c9604){if(_0x417b4e['match'](/(.*):(.*)/i)){if(_0x3a8df0(0x701)===_0x3a8df0(0x701)){const _0x42e4ed=String(RegExp['$1']),_0x50e64a=String(RegExp['$2'])[_0x3a8df0(0x987)]()[_0x3a8df0(0x3ab)]();let _0x2d0b94,_0x24d546,_0x3dbfba;switch(_0x50e64a){case _0x3a8df0(0x88d):_0x2d0b94=_0x5c9604[_0x417b4e]!==''?Number(_0x5c9604[_0x417b4e]):0x0;break;case _0x3a8df0(0x1b3):_0x24d546=_0x5c9604[_0x417b4e]!==''?JSON[_0x3a8df0(0x931)](_0x5c9604[_0x417b4e]):[],_0x2d0b94=_0x24d546[_0x3a8df0(0x319)](_0x95e136=>Number(_0x95e136));break;case'EVAL':_0x2d0b94=_0x5c9604[_0x417b4e]!==''?eval(_0x5c9604[_0x417b4e]):null;break;case'ARRAYEVAL':_0x24d546=_0x5c9604[_0x417b4e]!==''?JSON['parse'](_0x5c9604[_0x417b4e]):[],_0x2d0b94=_0x24d546['map'](_0xf82d7e=>eval(_0xf82d7e));break;case'JSON':_0x2d0b94=_0x5c9604[_0x417b4e]!==''?JSON[_0x3a8df0(0x931)](_0x5c9604[_0x417b4e]):'';break;case'ARRAYJSON':_0x24d546=_0x5c9604[_0x417b4e]!==''?JSON['parse'](_0x5c9604[_0x417b4e]):[],_0x2d0b94=_0x24d546[_0x3a8df0(0x319)](_0x2b49ba=>JSON[_0x3a8df0(0x931)](_0x2b49ba));break;case _0x3a8df0(0x778):_0x2d0b94=_0x5c9604[_0x417b4e]!==''?new Function(JSON[_0x3a8df0(0x931)](_0x5c9604[_0x417b4e])):new Function(_0x3a8df0(0x6a2));break;case _0x3a8df0(0x6ca):_0x24d546=_0x5c9604[_0x417b4e]!==''?JSON[_0x3a8df0(0x931)](_0x5c9604[_0x417b4e]):[],_0x2d0b94=_0x24d546[_0x3a8df0(0x319)](_0x5d6ebe=>new Function(JSON['parse'](_0x5d6ebe)));break;case _0x3a8df0(0x759):_0x2d0b94=_0x5c9604[_0x417b4e]!==''?String(_0x5c9604[_0x417b4e]):'';break;case _0x3a8df0(0x2be):_0x24d546=_0x5c9604[_0x417b4e]!==''?JSON[_0x3a8df0(0x931)](_0x5c9604[_0x417b4e]):[],_0x2d0b94=_0x24d546['map'](_0x145c38=>String(_0x145c38));break;case _0x3a8df0(0x8c6):_0x3dbfba=_0x5c9604[_0x417b4e]!==''?JSON[_0x3a8df0(0x931)](_0x5c9604[_0x417b4e]):{},_0x585ce9[_0x42e4ed]={},VisuMZ[_0x3a8df0(0x306)](_0x585ce9[_0x42e4ed],_0x3dbfba);continue;case _0x3a8df0(0x745):_0x24d546=_0x5c9604[_0x417b4e]!==''?JSON[_0x3a8df0(0x931)](_0x5c9604[_0x417b4e]):[],_0x2d0b94=_0x24d546['map'](_0xb4559a=>VisuMZ[_0x3a8df0(0x306)]({},JSON[_0x3a8df0(0x931)](_0xb4559a)));break;default:continue;}_0x585ce9[_0x42e4ed]=_0x2d0b94;}else{if(this['_data'][_0x3a8df0(0x2a0)[_0x3a8df0(0x5a1)](_0x489b02)]!==_0x51597d[_0x3a8df0(0x755)[_0x3a8df0(0x5a1)](_0x443087)]())return this[_0x3a8df0(0x81b)]();if(this['_data'][_0x3a8df0(0x78f)[_0x3a8df0(0x5a1)](_0x409129)]!==_0x593cdd[_0x3a8df0(0x988)[_0x3a8df0(0x5a1)](_0x3a6bb1)]())return this[_0x3a8df0(0x81b)]();}}}return _0x585ce9;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x431)]=SceneManager[_0x3a5d8e(0x5e5)],SceneManager[_0x3a5d8e(0x5e5)]=function(){const _0x4f719a=_0x3a5d8e;VisuMZ[_0x4f719a(0x690)][_0x4f719a(0x431)]['call'](this);if(Utils[_0x4f719a(0x444)]>=_0x4f719a(0x74f)){if('TmVyA'!==_0x4f719a(0x5aa))return _0x1ff1b4[_0x4f719a(0x998)][_0x4f719a(0x4f2)][_0x4f719a(0x528)](this);else{if(typeof nw===_0x4f719a(0x3e0))nw['App'][_0x4f719a(0x34d)]();}}},(_0x90453=>{const _0x38792c=_0x3a5d8e,_0x4f739b=_0x90453[_0x38792c(0x53e)];for(const _0x5ee6d3 of dependencies){if(_0x38792c(0x60e)===_0x38792c(0x997))_0x3984bf[_0x38792c(0x690)][_0x38792c(0x5e3)][_0x38792c(0x528)](this),this[_0x38792c(0x15a)]();else{if(!Imported[_0x5ee6d3]){if(_0x38792c(0x799)===_0x38792c(0x799)){alert(_0x38792c(0x7e6)[_0x38792c(0x5a1)](_0x4f739b,_0x5ee6d3)),SceneManager['exit']();break;}else return _0x1d5a76[_0x38792c(0x690)][_0x38792c(0x227)][_0x38792c(0x169)][_0x38792c(0x437)];}}}const _0x213b12=_0x90453[_0x38792c(0x7a1)];if(_0x213b12[_0x38792c(0x4d7)](/\[Version[ ](.*?)\]/i)){const _0x5ea350=Number(RegExp['$1']);_0x5ea350!==VisuMZ[label][_0x38792c(0x19e)]&&(alert(_0x38792c(0x2d0)[_0x38792c(0x5a1)](_0x4f739b,_0x5ea350)),SceneManager[_0x38792c(0x5e5)]());}if(_0x213b12[_0x38792c(0x4d7)](/\[Tier[ ](\d+)\]/i)){const _0x99b2e5=Number(RegExp['$1']);_0x99b2e5<tier?(alert(_0x38792c(0x190)[_0x38792c(0x5a1)](_0x4f739b,_0x99b2e5,tier)),SceneManager['exit']()):tier=Math[_0x38792c(0x2bb)](_0x99b2e5,tier);}VisuMZ[_0x38792c(0x306)](VisuMZ[label][_0x38792c(0x227)],_0x90453[_0x38792c(0x16a)]);})(pluginData),((()=>{const _0x36321f=_0x3a5d8e;if(VisuMZ[_0x36321f(0x690)][_0x36321f(0x227)][_0x36321f(0x169)]['SubfolderParse']??!![]){if(_0x36321f(0x16f)===_0x36321f(0x16f))for(const _0x1c6d5f in $plugins){if(_0x36321f(0x45d)===_0x36321f(0x45f))_0x45a431+=_0x36321f(0x81c);else{const _0x502f8d=$plugins[_0x1c6d5f];_0x502f8d[_0x36321f(0x53e)][_0x36321f(0x4d7)](/(.*)\/(.*)/i)&&(_0x36321f(0x753)==='Qejbr'?(_0x26b85c[_0x36321f(0x690)]['Scene_Base_createWindowLayer']['call'](this),this[_0x36321f(0x5f5)](),this[_0x36321f(0x613)]['x']=_0x239978[_0x36321f(0x6dd)](this[_0x36321f(0x613)]['x']),this['_windowLayer']['y']=_0x5003ba[_0x36321f(0x6dd)](this[_0x36321f(0x613)]['y'])):_0x502f8d[_0x36321f(0x53e)]=String(RegExp['$2'][_0x36321f(0x3ab)]()));}}else _0x2deaed(_0x36321f(0x2d0)['format'](_0xb63d9c,_0x3702f2)),_0x5b8c1c[_0x36321f(0x5e5)]();}})()),PluginManager[_0x3a5d8e(0x22d)](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x7bc),_0x577e83=>{const _0x51c0da=_0x3a5d8e;if(!SceneManager[_0x51c0da(0x3bb)])return;if(!SceneManager[_0x51c0da(0x3bb)][_0x51c0da(0x91e)])return;VisuMZ[_0x51c0da(0x306)](_0x577e83,_0x577e83);const _0x5c95a7=Math['round'](_0x577e83[_0x51c0da(0x352)]),_0x1a9f52=Math['round'](_0x577e83[_0x51c0da(0x2a4)]);$gameTemp[_0x51c0da(0x677)](_0x5c95a7,_0x1a9f52,_0x577e83[_0x51c0da(0x6e5)],_0x577e83[_0x51c0da(0x246)],_0x577e83[_0x51c0da(0x65d)]);}),PluginManager['registerCommand'](pluginData['name'],_0x3a5d8e(0x421),_0x1aeced=>{const _0x349b16=_0x3a5d8e;VisuMZ[_0x349b16(0x306)](_0x1aeced,_0x1aeced);const _0x36afc1=Math['round'](_0x1aeced[_0x349b16(0x6fd)])[_0x349b16(0x2e9)](0x0,0x64),_0x5e75e1=AudioManager[_0x349b16(0x2ab)];_0x5e75e1&&(_0x349b16(0x399)!==_0x349b16(0x399)?_0x40cd5e=this['helpAreaTopSideButtonLayout']():(_0x5e75e1[_0x349b16(0x6fd)]=_0x36afc1,console[_0x349b16(0x298)](_0x5e75e1),AudioManager[_0x349b16(0x333)](_0x5e75e1)));}),PluginManager[_0x3a5d8e(0x22d)](pluginData[_0x3a5d8e(0x53e)],'AudioChangeBgmPitch',_0x8af9e3=>{const _0x302eb9=_0x3a5d8e;VisuMZ[_0x302eb9(0x306)](_0x8af9e3,_0x8af9e3);const _0x4cf449=Math[_0x302eb9(0x6dd)](_0x8af9e3[_0x302eb9(0x2af)])[_0x302eb9(0x2e9)](0x32,0x96),_0x765066=AudioManager['_currentBgm'];_0x765066&&(_0x765066['pitch']=_0x4cf449,AudioManager[_0x302eb9(0x333)](_0x765066));}),PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x972),_0xc34395=>{const _0x2619e4=_0x3a5d8e;VisuMZ['ConvertParams'](_0xc34395,_0xc34395);const _0xc9fb40=Math[_0x2619e4(0x6dd)](_0xc34395['pan'])[_0x2619e4(0x2e9)](-0x64,0x64),_0x17270f=AudioManager[_0x2619e4(0x2ab)];if(_0x17270f){if(_0x2619e4(0x343)==='uylJn')return 0x1;else _0x17270f[_0x2619e4(0x843)]=_0xc9fb40,AudioManager[_0x2619e4(0x333)](_0x17270f);}}),PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x152),_0x4378f9=>{const _0x70a455=_0x3a5d8e;VisuMZ[_0x70a455(0x306)](_0x4378f9,_0x4378f9);const _0x5d093d=Math[_0x70a455(0x6dd)](_0x4378f9[_0x70a455(0x6fd)])[_0x70a455(0x2e9)](0x0,0x64),_0x3fc42d=AudioManager[_0x70a455(0x19d)];_0x3fc42d&&(_0x3fc42d['volume']=_0x5d093d,AudioManager[_0x70a455(0x30e)](_0x3fc42d));}),PluginManager[_0x3a5d8e(0x22d)](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x494),_0x14927d=>{const _0x45d887=_0x3a5d8e;VisuMZ[_0x45d887(0x306)](_0x14927d,_0x14927d);const _0x15a787=Math['round'](_0x14927d[_0x45d887(0x2af)])['clamp'](0x32,0x96),_0x28722c=AudioManager['_currentBgs'];_0x28722c&&(_0x28722c[_0x45d887(0x2af)]=_0x15a787,AudioManager[_0x45d887(0x30e)](_0x28722c));}),PluginManager[_0x3a5d8e(0x22d)](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x547),_0x59099b=>{const _0x2d907e=_0x3a5d8e;VisuMZ[_0x2d907e(0x306)](_0x59099b,_0x59099b);const _0x2db7f1=Math[_0x2d907e(0x6dd)](_0x59099b['pan'])[_0x2d907e(0x2e9)](-0x64,0x64),_0x359828=AudioManager[_0x2d907e(0x19d)];_0x359828&&(_0x2d907e(0x695)!==_0x2d907e(0x486)?(_0x359828[_0x2d907e(0x843)]=_0x2db7f1,AudioManager[_0x2d907e(0x30e)](_0x359828)):this[_0x2d907e(0x667)]='FV');}),PluginManager[_0x3a5d8e(0x22d)](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x467),_0x162e57=>{const _0x28a047=_0x3a5d8e;if(!$gameTemp[_0x28a047(0x583)]())return;const _0x5ac1aa=Input['getLastUsedGamepadType']();navigator[_0x28a047(0x725)]&&navigator[_0x28a047(0x725)][_0x28a047(0x276)](_0x5ac1aa);}),PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],'ExportAllMapText',_0x3e091a=>{const _0x32e8ed=_0x3a5d8e;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x32e8ed(0x3cb)]())return;SceneManager['_scene'][_0x32e8ed(0x7e9)]=![],VisuMZ[_0x32e8ed(0x690)]['ExportStrFromAllMaps']();}),PluginManager[_0x3a5d8e(0x22d)](pluginData['name'],_0x3a5d8e(0x6aa),_0x463f26=>{const _0x38dcf2=_0x3a5d8e;if(!$gameTemp[_0x38dcf2(0x583)]())return;if(!Utils[_0x38dcf2(0x3cb)]())return;SceneManager['_scene'][_0x38dcf2(0x7e9)]=![],VisuMZ['CoreEngine'][_0x38dcf2(0x8f1)]();}),PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x5bb),_0x4ce6b5=>{const _0x50c480=_0x3a5d8e;if(!$gameTemp[_0x50c480(0x583)]())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0x50c480(0x658)]()<=0x0)return;VisuMZ[_0x50c480(0x306)](_0x4ce6b5,_0x4ce6b5);const _0x1088ac=_0x50c480(0x34e)['format']($gameMap[_0x50c480(0x658)]()[_0x50c480(0x70d)](0x3)),_0x37ac6b=VisuMZ[_0x50c480(0x690)][_0x50c480(0x846)]($gameMap['mapId']());VisuMZ[_0x50c480(0x690)]['ExportString'](_0x37ac6b,_0x1088ac,!![]);}),PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x821),_0x38079d=>{const _0x3f71c6=_0x3a5d8e;if(!$gameTemp[_0x3f71c6(0x583)]())return;if(!Utils[_0x3f71c6(0x3cb)]())return;if(!$gameParty[_0x3f71c6(0x8c0)]())return;VisuMZ['ConvertParams'](_0x38079d,_0x38079d);const _0x390191='Troop%1'['format']($gameTroop[_0x3f71c6(0x438)]['padZero'](0x4)),_0x598faf=VisuMZ['CoreEngine'][_0x3f71c6(0x5c3)]($gameTroop['_troopId']);VisuMZ[_0x3f71c6(0x690)][_0x3f71c6(0x96a)](_0x598faf,_0x390191,!![]);}),VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x96a)]=function(_0x508d3c,_0x34fb6b,_0x502d79){const _0x6f2e9a=_0x3a5d8e,_0x31ca83=require('fs');let _0x55da03=_0x6f2e9a(0x76b)[_0x6f2e9a(0x5a1)](_0x34fb6b||'0');_0x31ca83[_0x6f2e9a(0x5e9)](_0x55da03,_0x508d3c,_0x125082=>{const _0x50516=_0x6f2e9a;if('SGKau'===_0x50516(0x88f)){if(_0x125082){if(_0x50516(0x4a9)===_0x50516(0x4a9))throw err;else _0x545cef[_0x305da5]=_0x55357a['stringKeyMap'][_0x462ca5[_0x5e51bd]];}else _0x502d79&&(_0x50516(0x65f)===_0x50516(0x742)?_0x488497=_0x50516(0x723)[_0x50516(0x5a1)](_0x6707b4,_0x4b1d81):alert(_0x50516(0x890)[_0x50516(0x5a1)](_0x55da03)));}else return _0x3fb3a8[_0x50516(0x715)][_0x50516(0x66d)]();});},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x21e)]=function(){const _0x30361e=_0x3a5d8e,_0x37cbdf=[];for(const _0x2fb0c1 of $dataMapInfos){if('SiHlV'===_0x30361e(0x83a))this[_0x30361e(0x922)]=_0x531ce9;else{if(!_0x2fb0c1)continue;_0x37cbdf[_0x30361e(0x429)](_0x2fb0c1['id']);}}const _0x1ab425=_0x37cbdf[_0x30361e(0x3fe)]*0x64+Math['randomInt'](0x64);alert(_0x30361e(0x6be)[_0x30361e(0x5a1)](_0x1ab425)),this[_0x30361e(0x75b)]=[],this[_0x30361e(0x4a4)]=$dataMap;for(const _0x160e91 of _0x37cbdf){VisuMZ['CoreEngine'][_0x30361e(0x703)](_0x160e91);}setTimeout(VisuMZ[_0x30361e(0x690)][_0x30361e(0x18c)][_0x30361e(0x8b1)](this),_0x1ab425);},VisuMZ[_0x3a5d8e(0x690)]['loadMapData']=function(_0x60568d){const _0x157fee=_0x3a5d8e,_0x213cd0=_0x157fee(0x708)['format'](_0x60568d['padZero'](0x3)),_0xf5b9b6=new XMLHttpRequest(),_0x217491=_0x157fee(0x67a)+_0x213cd0;_0xf5b9b6[_0x157fee(0x8f5)]('GET',_0x217491),_0xf5b9b6[_0x157fee(0x837)](_0x157fee(0x6ef)),_0xf5b9b6[_0x157fee(0x9a9)]=()=>this[_0x157fee(0x8a8)](_0xf5b9b6,_0x60568d,_0x213cd0,_0x217491),_0xf5b9b6[_0x157fee(0x4f7)]=()=>DataManager[_0x157fee(0x879)]('$dataMap',_0x213cd0,_0x217491),_0xf5b9b6['send']();},VisuMZ['CoreEngine']['storeMapData']=function(_0x35c659,_0x300e81,_0x205329,_0x318218){const _0x47154=_0x3a5d8e;$dataMap=JSON[_0x47154(0x931)](_0x35c659[_0x47154(0x58e)]),DataManager['onLoad']($dataMap),this[_0x47154(0x75b)][_0x300e81]=VisuMZ[_0x47154(0x690)]['ExtractStrFromMap'](_0x300e81),$dataMap=this[_0x47154(0x4a4)];},VisuMZ['CoreEngine'][_0x3a5d8e(0x18c)]=function(){const _0x20d814=_0x3a5d8e,_0x3982de=_0x20d814(0x2f8);this[_0x20d814(0x75b)][_0x20d814(0x21f)](undefined)[_0x20d814(0x21f)]('')['remove'](null);const _0x12ddc9=this[_0x20d814(0x75b)][_0x20d814(0x713)](_0x20d814(0x946))[_0x20d814(0x3ab)]();VisuMZ[_0x20d814(0x690)][_0x20d814(0x96a)](_0x12ddc9,_0x3982de,!![]),SceneManager[_0x20d814(0x3bb)][_0x20d814(0x7e9)]=!![];},VisuMZ[_0x3a5d8e(0x690)]['ExtractStrFromMap']=function(_0xb6b03f){const _0x453a22=_0x3a5d8e;if(!$dataMap)return'';let _0x22e5fc='█'[_0x453a22(0x877)](0x46)+'\x0a\x0a',_0x4dc913='═'[_0x453a22(0x877)](0x46)+'\x0a\x0a',_0x49a957='';this[_0x453a22(0x207)]=0x0;for(const _0x549295 of $dataMap[_0x453a22(0x920)]){if(!_0x549295)continue;let _0x29982d=_0x549295['id'],_0x17edfd=_0x549295[_0x453a22(0x53e)],_0x4ca568=_0x549295[_0x453a22(0x2f9)];for(const _0x4eb9bf of _0x4ca568){const _0x3eef1c=_0x4ca568['indexOf'](_0x4eb9bf)+0x1;let _0x4dc40d=_0x4dc913+_0x453a22(0x28b),_0x2b7f7f=VisuMZ[_0x453a22(0x690)][_0x453a22(0x350)](_0x4eb9bf[_0x453a22(0x521)]);if(_0x2b7f7f['length']>0x0){if(_0x453a22(0x971)===_0x453a22(0x971)){if(_0x49a957[_0x453a22(0x3fe)]>0x0)_0x49a957+=_0x4dc913+_0x453a22(0x946);else{if(_0x453a22(0x92e)!==_0x453a22(0x337)){const _0x231038=$dataMapInfos[_0xb6b03f][_0x453a22(0x53e)];_0x49a957+=_0x22e5fc+_0x453a22(0x74b)['format'](_0xb6b03f,_0x231038||_0x453a22(0x6cb))+_0x22e5fc;}else return _0x333b13[_0x453a22(0x3dd)](_0x453a22(0x3a4));}_0x49a957+=_0x4dc40d['format'](_0x29982d,_0x17edfd,_0x3eef1c,_0x2b7f7f);}else{if(_0x5bfe59[_0x453a22(0x8c0)]())return;_0x2ce17a['ConvertParams'](_0x4b71b4,_0x1ac48e);const _0x41f3d0=_0x567992[_0x453a22(0x63b)];if(_0x41f3d0[_0x453a22(0x4d7)](/Front/i))_0x169e5c[_0x453a22(0x291)](![]);else _0x41f3d0[_0x453a22(0x4d7)](/Side/i)?_0xeab40[_0x453a22(0x291)](!![]):_0x24b0bb[_0x453a22(0x291)](!_0x437f15['isSideView']());}}}}return _0x49a957[_0x453a22(0x3fe)]>0x0&&(_0x49a957+=_0x4dc913),_0x49a957;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x8f1)]=function(){const _0x5cde9f=_0x3a5d8e,_0x3653c5=$dataTroops['length']*0xa+Math[_0x5cde9f(0x38e)](0xa);alert(_0x5cde9f(0x3e8)[_0x5cde9f(0x5a1)](_0x3653c5));const _0x2e62cc=[];for(const _0x4de3e0 of $dataTroops){if(!_0x4de3e0)continue;const _0x379534=_0x4de3e0['id'];_0x2e62cc[_0x379534]=VisuMZ['CoreEngine'][_0x5cde9f(0x5c3)](_0x379534);}setTimeout(VisuMZ['CoreEngine'][_0x5cde9f(0x817)][_0x5cde9f(0x8b1)](this,_0x2e62cc),_0x3653c5);},VisuMZ['CoreEngine'][_0x3a5d8e(0x5c3)]=function(_0x13b02b){const _0x27cd1b=_0x3a5d8e;if(!$dataTroops[_0x13b02b])return'';let _0x26364d='█'['repeat'](0x46)+'\x0a\x0a',_0x35cd2d='═'['repeat'](0x46)+'\x0a\x0a',_0x22ece5='';this[_0x27cd1b(0x207)]=0x0;const _0x4fd2de=$dataTroops[_0x13b02b];let _0x46b13f=_0x4fd2de[_0x27cd1b(0x2f9)];for(const _0x54ccfb of _0x46b13f){const _0x2a8334=_0x46b13f[_0x27cd1b(0x864)](_0x54ccfb)+0x1;let _0xbbc853=_0x35cd2d+_0x27cd1b(0x643),_0x18d592=VisuMZ[_0x27cd1b(0x690)][_0x27cd1b(0x350)](_0x54ccfb[_0x27cd1b(0x521)]);_0x18d592['length']>0x0&&(_0x22ece5[_0x27cd1b(0x3fe)]>0x0?_0x22ece5+=_0x35cd2d+_0x27cd1b(0x946):_0x22ece5+=_0x26364d+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x27cd1b(0x5a1)](_0x13b02b,_0x4fd2de[_0x27cd1b(0x53e)]||_0x27cd1b(0x6cb))+_0x26364d,_0x22ece5+=_0xbbc853[_0x27cd1b(0x5a1)](_0x2a8334,_0x18d592));}return _0x22ece5['length']>0x0&&(_0x22ece5+=_0x35cd2d),_0x22ece5;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x817)]=function(_0x448872){const _0x436523=_0x3a5d8e,_0x326e2b=_0x436523(0x559);_0x448872[_0x436523(0x21f)](undefined)['remove']('')['remove'](null);const _0x140cd7=_0x448872[_0x436523(0x713)](_0x436523(0x946))[_0x436523(0x3ab)]();VisuMZ[_0x436523(0x690)][_0x436523(0x96a)](_0x140cd7,_0x326e2b,!![]),SceneManager[_0x436523(0x3bb)]['_active']=!![];},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x350)]=function(_0x2c5fbc){const _0x3348bc=_0x3a5d8e;let _0x3f6968='\x0a'+'─'[_0x3348bc(0x877)](0x46)+'\x0a',_0x56d8cd='\x0a'+'┄'[_0x3348bc(0x877)](0x46)+'\x0a',_0x39322e='';for(const _0xe05fe9 of _0x2c5fbc){if('nMuFR'===_0x3348bc(0x5db))return _0x5564aa[_0x3348bc(0x998)][_0x3348bc(0x335)][_0x3348bc(0x528)](this);else{if(!_0xe05fe9)continue;if(_0xe05fe9[_0x3348bc(0x75e)]===0x65){if('PEaSa'===_0x3348bc(0x7c8))_0x39322e+=_0x3f6968+'\x0a',_0x39322e+=_0x3348bc(0x15d),_0xe05fe9[_0x3348bc(0x16a)][0x4]!==''&&_0xe05fe9[_0x3348bc(0x16a)][0x4]!==undefined&&(_0x39322e+=_0x3348bc(0x2b9)[_0x3348bc(0x5a1)](_0xe05fe9[_0x3348bc(0x16a)][0x4]));else return _0x3350ff[_0x3348bc(0x998)]['ItemRect'][_0x3348bc(0x528)](this);}else{if(_0xe05fe9[_0x3348bc(0x75e)]===0x191)_0x39322e+='%1\x0a'['format'](_0xe05fe9[_0x3348bc(0x16a)][0x0]);else{if(_0xe05fe9[_0x3348bc(0x75e)]===0x192)_0x39322e+=_0x3f6968,_0x39322e+=_0x3348bc(0x727)[_0x3348bc(0x5a1)](_0x56d8cd,_0xe05fe9[_0x3348bc(0x16a)][0x0]+0x1,_0xe05fe9['parameters'][0x1]);else{if(_0xe05fe9[_0x3348bc(0x75e)]===0x193){if('IqSBN'===_0x3348bc(0x863))return 0x0;else _0x39322e+=_0x3f6968,_0x39322e+='%1〘Choice\x20Cancel〙%1'['format'](_0x56d8cd);}else{if(_0xe05fe9[_0x3348bc(0x75e)]===0x194){if(_0x3348bc(0x4e7)!==_0x3348bc(0x4e7))return this['_fauxAnimationSprites'][_0x3348bc(0x3fe)]>0x0;else _0x39322e+=_0x3f6968,_0x39322e+=_0x3348bc(0x739)[_0x3348bc(0x5a1)](_0x56d8cd);}else{if(_0xe05fe9[_0x3348bc(0x75e)]===0x69)_0x39322e+=_0x3f6968+'\x0a',_0x39322e+='〘Scrolling\x20Text〙\x0a';else{if(_0xe05fe9[_0x3348bc(0x75e)]===0x6c)_0x39322e+=_0x3f6968+'\x0a',_0x39322e+=_0x3348bc(0x937)[_0x3348bc(0x5a1)](_0xe05fe9[_0x3348bc(0x16a)][0x0]);else{if(_0xe05fe9['code']===0x198){if(_0x3348bc(0x65c)!==_0x3348bc(0x4e5))_0x39322e+=_0x3348bc(0x301)[_0x3348bc(0x5a1)](_0xe05fe9[_0x3348bc(0x16a)][0x0]);else{_0x131d7a['CoreEngine'][_0x3348bc(0x431)][_0x3348bc(0x528)](this);if(_0x1b4f24[_0x3348bc(0x444)]>=_0x3348bc(0x74f)){if(typeof _0x559353==='object')_0x3b5ddf[_0x3348bc(0x4ea)]['quit']();}}}else{if(_0xe05fe9[_0x3348bc(0x75e)]===0x75){if('GgAZv'===_0x3348bc(0x552)){const _0x48c1ce=$dataCommonEvents[_0xe05fe9[_0x3348bc(0x16a)][0x0]];if(_0x48c1ce&&this[_0x3348bc(0x207)]<=0xa){if(_0x3348bc(0x535)!=='QhWqx'){this[_0x3348bc(0x207)]++;let _0x2e40d8=VisuMZ['CoreEngine'][_0x3348bc(0x350)](_0x48c1ce[_0x3348bc(0x521)]);_0x2e40d8[_0x3348bc(0x3fe)]>0x0&&(_0x3348bc(0x9b5)===_0x3348bc(0x9b5)?(_0x39322e+=_0x3f6968,_0x39322e+=_0x56d8cd,_0x39322e+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'[_0x3348bc(0x5a1)](_0x48c1ce['id'],_0x48c1ce[_0x3348bc(0x53e)]),_0x39322e+=_0x56d8cd,_0x39322e+=_0x2e40d8,_0x39322e+=_0x56d8cd,_0x39322e+='〘Common\x20Event\x20%1:\x20%2〙\x20End'[_0x3348bc(0x5a1)](_0x48c1ce['id'],_0x48c1ce[_0x3348bc(0x53e)]),_0x39322e+=_0x56d8cd):_0x414ab6=_0x3b6268['CoreEngine'][_0x3348bc(0x85b)][_0x3348bc(0x528)](this)),this['_commonEventLayers']--;}else return this[_0x3348bc(0x3bb)]&&this[_0x3348bc(0x3bb)]instanceof _0x580e1f;}}else this[_0x3348bc(0x52c)]['x']=this[_0x3348bc(0x67b)](this[_0x3348bc(0x52c)]['x'],this['_targetAnchor']['x']),this[_0x3348bc(0x52c)]['y']=this[_0x3348bc(0x67b)](this[_0x3348bc(0x52c)]['y'],this[_0x3348bc(0x85c)]['y']);}}}}}}}}}}}if(_0x39322e['length']>0x0){if(_0x3348bc(0x19a)===_0x3348bc(0x57b)){_0x49049a[_0x3348bc(0x690)]['ParseActorNotetags'][_0x3348bc(0x528)](this,_0x573781);const _0x32de96=_0x55b862[_0x3348bc(0x6ff)];if(_0x32de96[_0x3348bc(0x4d7)](/<MAX LEVEL:[ ](\d+)>/i)){_0x444388[_0x3348bc(0x1b1)]=_0x27ddac(_0x583eb7['$1']);if(_0x308d46[_0x3348bc(0x1b1)]===0x0)_0x2451b6[_0x3348bc(0x1b1)]=_0x56d387[_0x3348bc(0x8bd)];}_0x32de96['match'](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x7f56de[_0x3348bc(0x299)]=_0x4d6608[_0x3348bc(0x84c)](_0x2d5c89(_0x4f2c33['$1']),_0x28a0f7[_0x3348bc(0x1b1)]));}else _0x39322e+=_0x3f6968;}return _0x39322e;},PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x23b),_0xe64208=>{const _0x1f79e9=_0x3a5d8e;VisuMZ[_0x1f79e9(0x306)](_0xe64208,_0xe64208);const _0x12d4de=_0xe64208[_0x1f79e9(0x522)];VisuMZ[_0x1f79e9(0x520)](_0x12d4de);}),PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x1c2),_0x24666f=>{const _0x490328=_0x3a5d8e;VisuMZ[_0x490328(0x306)](_0x24666f,_0x24666f);const _0x36536e=_0x24666f['value']||0x0;$gameParty[_0x490328(0x4d9)](_0x36536e);}),PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x1a7),_0x6e57df=>{const _0x2e2c15=_0x3a5d8e;if(!SceneManager['isSceneMap']())return;VisuMZ['ConvertParams'](_0x6e57df,_0x6e57df);const _0x1fcd7a=_0x6e57df[_0x2e2c15(0x93b)];SceneManager['_scene']['playOnceParallelInterpreter'](_0x1fcd7a);}),PluginManager[_0x3a5d8e(0x22d)](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x371),_0x348669=>{const _0x54cfc5=_0x3a5d8e;if(!$gameTemp[_0x54cfc5(0x583)]())return;if(!Utils[_0x54cfc5(0x3cb)]())return;VisuMZ[_0x54cfc5(0x306)](_0x348669,_0x348669);const _0x103fed=_0x348669['PictureID']||0x1;$gameTemp[_0x54cfc5(0x2c2)]=_0x103fed;}),PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x365),_0x477360=>{const _0x2ff55d=_0x3a5d8e;VisuMZ[_0x2ff55d(0x306)](_0x477360,_0x477360);const _0x148dc4=_0x477360[_0x2ff55d(0x6fa)]||0x1,_0x316b0c=_0x477360[_0x2ff55d(0x915)]||_0x2ff55d(0x5d4),_0x2e448e=$gameScreen[_0x2ff55d(0x43a)](_0x148dc4);_0x2e448e&&_0x2e448e['setEasingType'](_0x316b0c);}),PluginManager[_0x3a5d8e(0x22d)](pluginData[_0x3a5d8e(0x53e)],'PictureEraseAll',_0x232345=>{const _0x5ce998=_0x3a5d8e;for(let _0x41d5d0=0x1;_0x41d5d0<=0x64;_0x41d5d0++){$gameScreen[_0x5ce998(0x6b1)](_0x41d5d0);}}),PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],'PictureEraseRange',_0x5ce5c6=>{const _0x45f8e9=_0x3a5d8e;VisuMZ['ConvertParams'](_0x5ce5c6,_0x5ce5c6);const _0x1f5437=Math[_0x45f8e9(0x84c)](_0x5ce5c6[_0x45f8e9(0x584)],_0x5ce5c6[_0x45f8e9(0x6b0)]),_0x388de9=Math[_0x45f8e9(0x2bb)](_0x5ce5c6[_0x45f8e9(0x584)],_0x5ce5c6[_0x45f8e9(0x6b0)]);for(let _0x51b5e1=_0x1f5437;_0x51b5e1<=_0x388de9;_0x51b5e1++){$gameScreen[_0x45f8e9(0x6b1)](_0x51b5e1);}}),PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x505),_0x515a19=>{const _0x40be5d=_0x3a5d8e;VisuMZ['ConvertParams'](_0x515a19,_0x515a19);const _0x20f367=Math[_0x40be5d(0x6dd)](_0x515a19[_0x40be5d(0x15b)])[_0x40be5d(0x2e9)](0x1,0x64),_0x301fe0=_0x515a19[_0x40be5d(0x227)],_0x366d5a=_0x301fe0[_0x40be5d(0x85e)]['clamp'](0x0,0x1),_0x9cd79=Math[_0x40be5d(0x6dd)](_0x301fe0[_0x40be5d(0x7aa)]||0x0),_0x10d7f4=Math[_0x40be5d(0x6dd)](_0x301fe0[_0x40be5d(0x37f)]||0x0),_0x584a56=Math['round'](_0x301fe0[_0x40be5d(0x3c8)]||0x0),_0x17a33d=Math[_0x40be5d(0x6dd)](_0x301fe0[_0x40be5d(0x487)]||0x0),_0x18d59d=Math[_0x40be5d(0x6dd)](_0x301fe0[_0x40be5d(0x396)])[_0x40be5d(0x2e9)](0x0,0xff),_0x34f418=_0x301fe0[_0x40be5d(0x95e)],_0x5a3521=_0x40be5d(0x76e),_0x32985f=_0x515a19[_0x40be5d(0x4ec)]?_0x40be5d(0x4ec):_0x40be5d(0x72e),_0x38b76f=_0x5a3521['format'](_0x515a19[_0x40be5d(0x705)],_0x32985f);$gameScreen[_0x40be5d(0x22f)](_0x20f367,_0x38b76f,_0x366d5a,_0x9cd79,_0x10d7f4,_0x584a56,_0x17a33d,_0x18d59d,_0x34f418);}),PluginManager[_0x3a5d8e(0x22d)](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x897),_0x616b6f=>{const _0x565b7c=_0x3a5d8e;VisuMZ[_0x565b7c(0x306)](_0x616b6f,_0x616b6f);const _0x20781d=_0x616b6f[_0x565b7c(0x2cf)]||_0x565b7c(0x33a),_0x568540=_0x616b6f[_0x565b7c(0x8ed)]['clamp'](0x1,0x9),_0x3549ab=_0x616b6f[_0x565b7c(0x205)][_0x565b7c(0x2e9)](0x1,0x9),_0x14f76f=_0x616b6f[_0x565b7c(0x407)]||0x1,_0x3f6f86=_0x616b6f[_0x565b7c(0x478)];$gameScreen['setCoreEngineScreenShakeStyle'](_0x20781d),$gameScreen[_0x565b7c(0x174)](_0x568540,_0x3549ab,_0x14f76f);if(_0x3f6f86){const _0x174c46=$gameTemp['getLastPluginCommandInterpreter']();if(_0x174c46)_0x174c46[_0x565b7c(0x78a)](_0x14f76f);}}),PluginManager[_0x3a5d8e(0x22d)](pluginData['name'],_0x3a5d8e(0x25b),_0x3b04f5=>{const _0x11bc14=_0x3a5d8e;if($gameParty[_0x11bc14(0x8c0)]())return;VisuMZ['ConvertParams'](_0x3b04f5,_0x3b04f5);const _0x63a0a6=_0x3b04f5[_0x11bc14(0x22a)],_0x45305d=(_0x3b04f5[_0x11bc14(0x760)]||0x0)/0x64;for(const _0xd8ec40 of _0x63a0a6){const _0x543445=Math[_0x11bc14(0x33a)]()<=_0x45305d;$gameSwitches['setValue'](_0xd8ec40,_0x543445);}}),PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x2b2),_0x363d04=>{const _0x1d7e95=_0x3a5d8e;if($gameParty[_0x1d7e95(0x8c0)]())return;VisuMZ[_0x1d7e95(0x306)](_0x363d04,_0x363d04);const _0x3f4c98=Math[_0x1d7e95(0x84c)](_0x363d04[_0x1d7e95(0x584)],_0x363d04[_0x1d7e95(0x6b0)]),_0x2f4722=Math[_0x1d7e95(0x2bb)](_0x363d04['StartID'],_0x363d04[_0x1d7e95(0x6b0)]),_0x213c09=(_0x363d04['Chance']||0x0)/0x64;for(let _0x229731=_0x3f4c98;_0x229731<=_0x2f4722;_0x229731++){if(_0x1d7e95(0x7e2)===_0x1d7e95(0x2f4)){if(!this[_0x1d7e95(0x418)])return![];return _0x4bedd5['CoreEngine'][_0x1d7e95(0x227)][_0x1d7e95(0x380)][_0x1d7e95(0x7a6)];}else{const _0x508661=Math['random']()<=_0x213c09;$gameSwitches[_0x1d7e95(0x869)](_0x229731,_0x508661);}}}),PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],'SwitchToggleOne',_0x161c6a=>{const _0x132fd6=_0x3a5d8e;if($gameParty[_0x132fd6(0x8c0)]())return;VisuMZ[_0x132fd6(0x306)](_0x161c6a,_0x161c6a);const _0x2a5001=_0x161c6a[_0x132fd6(0x22a)];for(const _0x1fbe7a of _0x2a5001){const _0x5325cd=$gameSwitches[_0x132fd6(0x61e)](_0x1fbe7a);$gameSwitches['setValue'](_0x1fbe7a,!_0x5325cd);}}),PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x471),_0x4284b7=>{const _0x1d99de=_0x3a5d8e;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x4284b7,_0x4284b7);const _0xcc6429=Math['min'](_0x4284b7[_0x1d99de(0x584)],_0x4284b7[_0x1d99de(0x6b0)]),_0x53a52f=Math[_0x1d99de(0x2bb)](_0x4284b7[_0x1d99de(0x584)],_0x4284b7[_0x1d99de(0x6b0)]);for(let _0x5701bd=_0xcc6429;_0x5701bd<=_0x53a52f;_0x5701bd++){const _0x290b71=$gameSwitches[_0x1d99de(0x61e)](_0x5701bd);$gameSwitches['setValue'](_0x5701bd,!_0x290b71);}}),PluginManager['registerCommand'](pluginData['name'],'SystemSetFontSize',_0x5b23e1=>{const _0x5ea971=_0x3a5d8e;VisuMZ[_0x5ea971(0x306)](_0x5b23e1,_0x5b23e1);const _0x4ad80c=_0x5b23e1[_0x5ea971(0x63b)]||0x1;$gameSystem['setMainFontSize'](_0x4ad80c);}),PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x1f7),_0x5d65aa=>{const _0xa84e91=_0x3a5d8e;if($gameParty[_0xa84e91(0x8c0)]())return;VisuMZ[_0xa84e91(0x306)](_0x5d65aa,_0x5d65aa);const _0x5b5602=_0x5d65aa[_0xa84e91(0x63b)];if(_0x5b5602[_0xa84e91(0x4d7)](/Front/i))$gameSystem[_0xa84e91(0x291)](![]);else _0x5b5602[_0xa84e91(0x4d7)](/Side/i)?$gameSystem['setSideView'](!![]):$gameSystem['setSideView'](!$gameSystem[_0xa84e91(0x235)]());}),PluginManager[_0x3a5d8e(0x22d)](pluginData['name'],'SystemLoadAudio',_0x4f424a=>{const _0x58a09e=_0x3a5d8e;if($gameParty[_0x58a09e(0x8c0)]())return;VisuMZ['ConvertParams'](_0x4f424a,_0x4f424a);const _0x1e4eb2=[_0x58a09e(0x815),_0x58a09e(0x20d),'me','se'];for(const _0x2f54fc of _0x1e4eb2){const _0x4b0e7c=_0x4f424a[_0x2f54fc],_0x34ace1=_0x58a09e(0x752)[_0x58a09e(0x5a1)](_0x2f54fc);for(const _0x15522e of _0x4b0e7c){_0x58a09e(0x85f)===_0x58a09e(0x85f)?AudioManager[_0x58a09e(0x1e7)](_0x34ace1,_0x15522e):(this['visible']=![],this['opacity']=0x0,this['x']=_0xd76a76[_0x58a09e(0x89a)]*0xa,this['y']=_0x32a025[_0x58a09e(0x223)]*0xa);}}}),PluginManager[_0x3a5d8e(0x22d)](pluginData[_0x3a5d8e(0x53e)],'SystemLoadImages',_0x2875d9=>{const _0x2d2a18=_0x3a5d8e;if($gameParty['inBattle']())return;VisuMZ[_0x2d2a18(0x306)](_0x2875d9,_0x2875d9);const _0x2bd1e9=['animations',_0x2d2a18(0x790),_0x2d2a18(0x17f),_0x2d2a18(0x7ff),'enemies','faces',_0x2d2a18(0x376),_0x2d2a18(0x617),_0x2d2a18(0x7d9),_0x2d2a18(0x841),_0x2d2a18(0x94a),_0x2d2a18(0x18b),'titles1','titles2'];for(const _0xa0558d of _0x2bd1e9){if(_0x2d2a18(0x724)==='xZaMp')this[_0x2d2a18(0x6b8)]()?(this[_0x2d2a18(0x6e8)](),this[_0x2d2a18(0x36a)]()):_0x23cabb[_0x2d2a18(0x690)][_0x2d2a18(0x933)][_0x2d2a18(0x528)](this);else{const _0x2a41e2=_0x2875d9[_0xa0558d],_0x2f0914='img/%1/'[_0x2d2a18(0x5a1)](_0xa0558d);for(const _0x45571a of _0x2a41e2){if('dpWIq'!==_0x2d2a18(0x231))return _0x190190[_0x2d2a18(0x690)]['Settings'][_0x2d2a18(0x169)]['ImprovedAccuracySystem']?0x0:_0x2bc46e[_0x2d2a18(0x690)]['Game_Action_itemEva'][_0x2d2a18(0x528)](this,_0x173a4a);else ImageManager[_0x2d2a18(0x90f)](_0x2f0914,_0x45571a);}}}}),PluginManager[_0x3a5d8e(0x22d)](pluginData['name'],'SystemSetBattleSystem',_0x3011e1=>{const _0x58dd17=_0x3a5d8e;if($gameParty[_0x58dd17(0x8c0)]())return;VisuMZ[_0x58dd17(0x306)](_0x3011e1,_0x3011e1);const _0x5dfb85=_0x3011e1[_0x58dd17(0x63b)][_0x58dd17(0x987)]()[_0x58dd17(0x3ab)](),_0x16d849=VisuMZ[_0x58dd17(0x690)][_0x58dd17(0x8fa)](_0x5dfb85);$gameSystem[_0x58dd17(0x203)](_0x16d849);}),VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x8fa)]=function(_0x584b06){const _0x5a6924=_0x3a5d8e;_0x584b06=_0x584b06||_0x5a6924(0x48a),_0x584b06=String(_0x584b06)[_0x5a6924(0x987)]()[_0x5a6924(0x3ab)]();switch(_0x584b06){case _0x5a6924(0x598):return 0x0;case _0x5a6924(0x48d):Imported[_0x5a6924(0x466)]&&(ConfigManager[_0x5a6924(0x830)]=!![]);return 0x1;case _0x5a6924(0x99b):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x5a6924(0x830)]=![]);return 0x2;case _0x5a6924(0x781):if(Imported[_0x5a6924(0x2db)])return _0x5a6924(0x781);break;case _0x5a6924(0x5f4):if(Imported[_0x5a6924(0x8d8)]){if(_0x5a6924(0x24f)==='qYmZP')_0x4df3ed[_0x5a6924(0x690)][_0x5a6924(0x1f4)][_0x5a6924(0x528)](this),this[_0x5a6924(0x7ac)]();else return _0x5a6924(0x5f4);}break;case _0x5a6924(0x888):if(Imported[_0x5a6924(0x9ac)])return _0x5a6924(0x888);break;case _0x5a6924(0x303):if(Imported['VisuMZ_2_BattleSystemFTB'])return _0x5a6924(0x303);break;case _0x5a6924(0x8fb):if(Imported[_0x5a6924(0x35e)])return _0x5a6924(0x3ca)===_0x5a6924(0x3ca)?'OTB':this[_0x5a6924(0x995)]();break;case _0x5a6924(0x408):if(Imported[_0x5a6924(0x573)])return'ETB';break;case _0x5a6924(0x6f9):if(Imported[_0x5a6924(0x50a)])return _0x5a6924(0x6f9);break;}return $dataSystem[_0x5a6924(0x55f)];},PluginManager['registerCommand'](pluginData[_0x3a5d8e(0x53e)],'SystemSetWindowPadding',_0x1ee8df=>{const _0x472648=_0x3a5d8e;VisuMZ[_0x472648(0x306)](_0x1ee8df,_0x1ee8df);const _0x3991d2=_0x1ee8df[_0x472648(0x63b)]||0x1;$gameSystem['setWindowPadding'](_0x3991d2);}),PluginManager[_0x3a5d8e(0x22d)](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x1d3),_0x46bf9f=>{const _0x309a7b=_0x3a5d8e;VisuMZ[_0x309a7b(0x306)](_0x46bf9f,_0x46bf9f);const _0x12678d=_0x46bf9f['id']||0x1,_0x38650a=_0x46bf9f[_0x309a7b(0x49a)],_0x21c2ca=_0x46bf9f[_0x309a7b(0x305)]||0x0;let _0x39848c=$gameVariables[_0x309a7b(0x61e)](_0x12678d)||0x0;switch(_0x38650a){case'=':_0x39848c=_0x21c2ca;break;case'+':_0x39848c+=_0x21c2ca;break;case'-':_0x39848c-=_0x21c2ca;break;case'*':_0x39848c*=_0x21c2ca;break;case'/':_0x39848c/=_0x21c2ca;break;case'%':_0x39848c%=_0x21c2ca;break;}_0x39848c=_0x39848c||0x0,$gameVariables['setValue'](_0x12678d,_0x39848c);}),PluginManager[_0x3a5d8e(0x22d)](pluginData[_0x3a5d8e(0x53e)],_0x3a5d8e(0x416),_0x40669d=>{const _0x28d77b=_0x3a5d8e;VisuMZ[_0x28d77b(0x306)](_0x40669d,_0x40669d);const _0x4ebbd2=_0x40669d['id']()||0x1,_0x233adb=_0x40669d[_0x28d77b(0x49a)],_0x548877=_0x40669d[_0x28d77b(0x305)]()||0x0;let _0x17438b=$gameVariables[_0x28d77b(0x61e)](_0x4ebbd2)||0x0;switch(_0x233adb){case'=':_0x17438b=_0x548877;break;case'+':_0x17438b+=_0x548877;break;case'-':_0x17438b-=_0x548877;break;case'*':_0x17438b*=_0x548877;break;case'/':_0x17438b/=_0x548877;break;case'%':_0x17438b%=_0x548877;break;}_0x17438b=_0x17438b||0x0,$gameVariables['setValue'](_0x4ebbd2,_0x17438b);}),VisuMZ[_0x3a5d8e(0x690)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x3a5d8e(0x715)][_0x3a5d8e(0x783)],Scene_Boot['prototype'][_0x3a5d8e(0x783)]=function(){const _0x291f5=_0x3a5d8e;VisuMZ['CoreEngine']['Scene_Boot_onDatabaseLoaded']['call'](this),this['process_VisuMZ_CoreEngine_RegExp'](),this[_0x291f5(0x5a4)](),this[_0x291f5(0x675)](),this[_0x291f5(0x47c)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),this[_0x291f5(0x69a)](),VisuMZ['ParseAllNotetags']();},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x8dc)]={},Scene_Boot[_0x3a5d8e(0x715)][_0x3a5d8e(0x440)]=function(){const _0x32543f=_0x3a5d8e,_0x2930ca=[_0x32543f(0x188),_0x32543f(0x229),_0x32543f(0x6e0),_0x32543f(0x977),_0x32543f(0x856),_0x32543f(0x97c),_0x32543f(0x833),_0x32543f(0x4ed)],_0x36f399=[_0x32543f(0x5b4),_0x32543f(0x27d),_0x32543f(0x7e1),_0x32543f(0x76d),_0x32543f(0x766),_0x32543f(0x621),_0x32543f(0x765),_0x32543f(0x245),_0x32543f(0x212),_0x32543f(0x3d9)],_0x4b72d2=['TGR',_0x32543f(0x450),_0x32543f(0x8ab),_0x32543f(0x56a),_0x32543f(0x769),_0x32543f(0x8db),_0x32543f(0x1de),_0x32543f(0x4a2),_0x32543f(0x5f0),'EXR'],_0x1ef654=[_0x2930ca,_0x36f399,_0x4b72d2],_0x3ec9a2=['Plus',_0x32543f(0x75f),_0x32543f(0x327),'Max',_0x32543f(0x41f),_0x32543f(0x1d8),'Rate2',_0x32543f(0x92f),_0x32543f(0x991),'Flat2'];for(const _0x3c3206 of _0x1ef654){let _0x2e8628='';if(_0x3c3206===_0x2930ca)_0x2e8628=_0x32543f(0x4c4);if(_0x3c3206===_0x36f399)_0x2e8628=_0x32543f(0x4e0);if(_0x3c3206===_0x4b72d2)_0x2e8628=_0x32543f(0x6a7);for(const _0x57cea1 of _0x3ec9a2){if('JzdvS'===_0x32543f(0x924)){let _0x6bdf03=_0x32543f(0x46b)[_0x32543f(0x5a1)](_0x2e8628,_0x57cea1);VisuMZ[_0x32543f(0x690)]['RegExp'][_0x6bdf03]=[],VisuMZ[_0x32543f(0x690)][_0x32543f(0x8dc)][_0x6bdf03+'JS']=[];let _0x15cb65=_0x32543f(0x47e);if([_0x32543f(0x3c5),_0x32543f(0x92f)]['includes'](_0x57cea1))_0x15cb65+=_0x32543f(0x80d);else{if(['Plus1',_0x32543f(0x991)][_0x32543f(0x2c6)](_0x57cea1))_0x15cb65+=_0x32543f(0x81c);else{if([_0x32543f(0x327),'Flat2'][_0x32543f(0x2c6)](_0x57cea1)){if(_0x32543f(0x908)!==_0x32543f(0x908)){this[_0x32543f(0x2b8)]['clear']();if(_0x5be612['displayName']()){const _0x5f5bd2=this[_0x32543f(0x511)];this[_0x32543f(0x512)](0x0,0x0,_0x5f5bd2,this[_0x32543f(0x66d)]());const _0x4312cf=this[_0x32543f(0x192)](_0x501f30[_0x32543f(0x8cb)]())[_0x32543f(0x89a)];this[_0x32543f(0x283)](_0x2ffd33[_0x32543f(0x8cb)](),_0xed8deb[_0x32543f(0x3de)]((_0x5f5bd2-_0x4312cf)/0x2),0x0);}}else _0x15cb65+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';}else{if(_0x57cea1===_0x32543f(0x55b))_0x15cb65+=_0x32543f(0x99c);else{if(_0x57cea1===_0x32543f(0x1d8))'FrKPj'!==_0x32543f(0x5d1)?_0x15cb65+=_0x32543f(0x6e6):this['drawSegment'](_0x3ce381);else _0x57cea1==='Rate2'&&(_0x15cb65+=_0x32543f(0x367));}}}}for(const _0x3e288b of _0x3c3206){let _0x575e14=_0x57cea1['replace'](/[\d+]/g,'')['toUpperCase']();const _0x2ecfcd=_0x15cb65[_0x32543f(0x5a1)](_0x3e288b,_0x575e14);VisuMZ[_0x32543f(0x690)]['RegExp'][_0x6bdf03][_0x32543f(0x429)](new RegExp(_0x2ecfcd,'i'));const _0x1f8c30=_0x32543f(0x7a2)[_0x32543f(0x5a1)](_0x3e288b,_0x575e14);VisuMZ['CoreEngine'][_0x32543f(0x8dc)][_0x6bdf03+'JS'][_0x32543f(0x429)](new RegExp(_0x1f8c30,'i'));}}else _0x1ca012[_0x32543f(0x690)][_0x32543f(0x7da)][_0x32543f(0x528)](this),this[_0x32543f(0x440)](),this[_0x32543f(0x5a4)](),this['process_VisuMZ_CoreEngine_Settings'](),this['process_VisuMZ_CoreEngine_Functions'](),this[_0x32543f(0x7d4)](),this[_0x32543f(0x69a)](),_0x4501cb['ParseAllNotetags']();}}},Scene_Boot[_0x3a5d8e(0x715)][_0x3a5d8e(0x5a4)]=function(){if(VisuMZ['ParseAllNotetags'])return;},Scene_Boot[_0x3a5d8e(0x715)][_0x3a5d8e(0x675)]=function(){const _0x2dfbae=_0x3a5d8e,_0x136e7c=VisuMZ['CoreEngine'][_0x2dfbae(0x227)];_0x136e7c['QoL']['OpenConsole']&&VisuMZ[_0x2dfbae(0x943)](!![]);_0x136e7c[_0x2dfbae(0x169)][_0x2dfbae(0x437)]&&(_0x2dfbae(0x3b4)===_0x2dfbae(0x3b4)?(Input[_0x2dfbae(0x98b)][0x23]=_0x2dfbae(0x4bf),Input['keyMapper'][0x24]='home'):this[_0x2dfbae(0x854)]=_0x5efabd);if(_0x136e7c['ButtonAssist']){if(_0x2dfbae(0x932)===_0x2dfbae(0x932)){const _0x4b48eb=_0x136e7c[_0x2dfbae(0x947)];_0x4b48eb[_0x2dfbae(0x7a8)]=_0x4b48eb[_0x2dfbae(0x7a8)]||'\x5c}❪SHIFT❫\x5c{',_0x4b48eb[_0x2dfbae(0x6c0)]=_0x4b48eb[_0x2dfbae(0x6c0)]||_0x2dfbae(0x704);}else _0x16b72b=_0x1cd6d4,this[_0x2dfbae(0x2a2)](_0x550f5a,_0x30a8a3);}_0x136e7c[_0x2dfbae(0x380)][_0x2dfbae(0x6d7)]&&(Input[_0x2dfbae(0x98b)][0x57]='up',Input[_0x2dfbae(0x98b)][0x41]=_0x2dfbae(0x554),Input[_0x2dfbae(0x98b)][0x53]=_0x2dfbae(0x20e),Input[_0x2dfbae(0x98b)][0x44]=_0x2dfbae(0x8ec),Input['keyMapper'][0x45]=_0x2dfbae(0x331)),_0x136e7c[_0x2dfbae(0x380)][_0x2dfbae(0x676)]&&(Input[_0x2dfbae(0x98b)][0x52]=_0x2dfbae(0x25f)),_0x136e7c[_0x2dfbae(0x2fe)][_0x2dfbae(0x84d)]=_0x136e7c[_0x2dfbae(0x2fe)]['DisplayedParams'][_0x2dfbae(0x319)](_0x46782f=>_0x46782f[_0x2dfbae(0x987)]()[_0x2dfbae(0x3ab)]()),_0x136e7c['Param'][_0x2dfbae(0x7ae)]=_0x136e7c[_0x2dfbae(0x2fe)][_0x2dfbae(0x7ae)]['map'](_0x12ae10=>_0x12ae10[_0x2dfbae(0x987)]()[_0x2dfbae(0x3ab)]());},Scene_Boot[_0x3a5d8e(0x715)][_0x3a5d8e(0x47c)]=function(){const _0x2aaef7=_0x3a5d8e;this[_0x2aaef7(0x40e)]();},Scene_Boot[_0x3a5d8e(0x715)][_0x3a5d8e(0x40e)]=function(){const _0x57d9bc=_0x3a5d8e,_0xbc9398=VisuMZ[_0x57d9bc(0x690)][_0x57d9bc(0x227)][_0x57d9bc(0x29b)];for(const _0x492e8a of _0xbc9398){const _0x5a0f74=_0x492e8a['FunctionName']['replace'](/[ ]/g,''),_0x24e331=_0x492e8a[_0x57d9bc(0x68b)];VisuMZ[_0x57d9bc(0x690)][_0x57d9bc(0x253)](_0x5a0f74,_0x24e331);}},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x253)]=function(_0x176e8c,_0x5cc94e){const _0x1cf89e=_0x3a5d8e;if(!!window[_0x176e8c]){if(_0x1cf89e(0x550)==='ohkvy'){if($gameTemp['isPlaytest']())console[_0x1cf89e(0x298)](_0x1cf89e(0x581)['format'](_0x176e8c));}else return _0x596dfe['layoutSettings']['ListRect'][_0x1cf89e(0x528)](this);}const _0x43af94='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x1cf89e(0x5a1)](_0x176e8c,_0x5cc94e);window[_0x176e8c]=new Function(_0x43af94);},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x3a3eb8=_0x3a5d8e,_0x4f7a31=VisuMZ[_0x3a3eb8(0x690)][_0x3a3eb8(0x227)]['CustomParam'];if(!_0x4f7a31)return;for(const _0x22c4a5 of _0x4f7a31){if(_0x3a3eb8(0x211)!==_0x3a3eb8(0x70c)){if(!_0x22c4a5)continue;VisuMZ[_0x3a3eb8(0x690)][_0x3a3eb8(0x19f)](_0x22c4a5);}else return _0x2b0d1c[_0x3a3eb8(0x998)][_0x3a3eb8(0x624)][_0x3a3eb8(0x528)](this);}},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x2f5)]={},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x1d0)]={},VisuMZ['CoreEngine'][_0x3a5d8e(0x670)]={},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x409)]={},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x19f)]=function(_0x2e7f0f){const _0x5738db=_0x3a5d8e,_0x24a2a2=_0x2e7f0f['Abbreviation'],_0x3dd504=_0x2e7f0f['ParamName'],_0x5a864b=_0x2e7f0f[_0x5738db(0x2e4)],_0x241a21=_0x2e7f0f[_0x5738db(0x2cf)],_0x33a9e0=new Function(_0x2e7f0f[_0x5738db(0x63c)]);VisuMZ[_0x5738db(0x690)][_0x5738db(0x2f5)][_0x24a2a2[_0x5738db(0x987)]()[_0x5738db(0x3ab)]()]=_0x3dd504,VisuMZ[_0x5738db(0x690)][_0x5738db(0x1d0)][_0x24a2a2[_0x5738db(0x987)]()[_0x5738db(0x3ab)]()]=_0x5a864b,VisuMZ[_0x5738db(0x690)]['CustomParamType'][_0x24a2a2['toUpperCase']()[_0x5738db(0x3ab)]()]=_0x241a21,VisuMZ[_0x5738db(0x690)][_0x5738db(0x409)][_0x24a2a2[_0x5738db(0x987)]()[_0x5738db(0x3ab)]()]=_0x24a2a2,Object[_0x5738db(0x5b0)](Game_BattlerBase[_0x5738db(0x715)],_0x24a2a2,{'get'(){const _0xe58e23=_0x5738db,_0x2f5f37=_0x33a9e0[_0xe58e23(0x528)](this);return _0x241a21===_0xe58e23(0x348)?Math[_0xe58e23(0x6dd)](_0x2f5f37):_0x2f5f37;}});},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x91d)]={},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x1cf)]={},Scene_Boot[_0x3a5d8e(0x715)][_0x3a5d8e(0x69a)]=function(){const _0x4c8342=_0x3a5d8e,_0x4f2a79=VisuMZ[_0x4c8342(0x690)][_0x4c8342(0x227)][_0x4c8342(0x91d)];for(const _0x760c5d of _0x4f2a79){const _0x7040e6=(_0x760c5d[_0x4c8342(0x9b6)]||'')[_0x4c8342(0x8bb)]()[_0x4c8342(0x3ab)](),_0x285793=(_0x760c5d[_0x4c8342(0x318)]||'')[_0x4c8342(0x8bb)]()[_0x4c8342(0x3ab)]();VisuMZ['CoreEngine']['ControllerButtons'][_0x7040e6]=_0x760c5d,VisuMZ[_0x4c8342(0x690)][_0x4c8342(0x1cf)][_0x285793]=_0x7040e6;}},VisuMZ[_0x3a5d8e(0x2c9)]=function(){const _0x59ffaf=_0x3a5d8e;for(const _0x19f59f of $dataActors){if(_0x19f59f)VisuMZ[_0x59ffaf(0x758)](_0x19f59f);}for(const _0x4b51f5 of $dataClasses){if(_0x4b51f5)VisuMZ['ParseClassNotetags'](_0x4b51f5);}for(const _0x1b9327 of $dataSkills){if('vniuU'===_0x59ffaf(0x480)){if(_0x1b9327)VisuMZ[_0x59ffaf(0x940)](_0x1b9327);}else return _0x37fb68[_0x59ffaf(0x690)]['Settings'][_0x59ffaf(0x75a)]['length'];}for(const _0x286e77 of $dataItems){if(_0x286e77)VisuMZ[_0x59ffaf(0x45b)](_0x286e77);}for(const _0x129241 of $dataWeapons){if('wvhaf'!==_0x59ffaf(0x609)){if(this['_CoreEngineSettings']===_0x52b5a5)this[_0x59ffaf(0x387)]();if(this[_0x59ffaf(0x8a9)][_0x59ffaf(0x950)]===_0x5484c8)this['initCoreEngine']();return this['_CoreEngineSettings'][_0x59ffaf(0x950)];}else{if(_0x129241)VisuMZ[_0x59ffaf(0x560)](_0x129241);}}for(const _0x2a1f70 of $dataArmors){if(_0x59ffaf(0x59a)!==_0x59ffaf(0x59a))this[_0x59ffaf(0x6ce)][_0x59ffaf(0x7c7)]=this[_0x59ffaf(0x7d6)],![]&&this[_0x59ffaf(0x6ce)][_0x59ffaf(0x89a)]>0x0&&(this[_0x59ffaf(0x6ce)]['onload']=null,this[_0x59ffaf(0x34c)]());else{if(_0x2a1f70)VisuMZ[_0x59ffaf(0x43f)](_0x2a1f70);}}for(const _0x44becd of $dataEnemies){if(_0x44becd)VisuMZ[_0x59ffaf(0x89e)](_0x44becd);}for(const _0x2a88d9 of $dataStates){if(_0x2a88d9)VisuMZ[_0x59ffaf(0x57e)](_0x2a88d9);}for(const _0x4da538 of $dataTilesets){if(_0x4da538)VisuMZ[_0x59ffaf(0x596)](_0x4da538);}},VisuMZ[_0x3a5d8e(0x758)]=function(_0x502543){},VisuMZ[_0x3a5d8e(0x4b2)]=function(_0xf3ca4a){},VisuMZ[_0x3a5d8e(0x940)]=function(_0x1feceb){},VisuMZ[_0x3a5d8e(0x45b)]=function(_0x459763){},VisuMZ[_0x3a5d8e(0x560)]=function(_0x54c8df){},VisuMZ['ParseArmorNotetags']=function(_0x255338){},VisuMZ[_0x3a5d8e(0x89e)]=function(_0x535e71){},VisuMZ[_0x3a5d8e(0x57e)]=function(_0x522741){},VisuMZ[_0x3a5d8e(0x596)]=function(_0x25bda5){},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x758)]=VisuMZ[_0x3a5d8e(0x758)],VisuMZ[_0x3a5d8e(0x758)]=function(_0x5b27f5){const _0x418400=_0x3a5d8e;VisuMZ['CoreEngine'][_0x418400(0x758)]['call'](this,_0x5b27f5);const _0x264d93=_0x5b27f5['note'];if(_0x264d93[_0x418400(0x4d7)](/<MAX LEVEL:[ ](\d+)>/i)){_0x5b27f5[_0x418400(0x1b1)]=Number(RegExp['$1']);if(_0x5b27f5[_0x418400(0x1b1)]===0x0)_0x5b27f5[_0x418400(0x1b1)]=Number[_0x418400(0x8bd)];}_0x264d93[_0x418400(0x4d7)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x5b27f5['initialLevel']=Math['min'](Number(RegExp['$1']),_0x5b27f5[_0x418400(0x1b1)]));},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x4b2)]=VisuMZ[_0x3a5d8e(0x4b2)],VisuMZ[_0x3a5d8e(0x4b2)]=function(_0x4c9770){const _0x3c4915=_0x3a5d8e;VisuMZ['CoreEngine']['ParseClassNotetags'][_0x3c4915(0x528)](this,_0x4c9770);if(_0x4c9770[_0x3c4915(0x76a)])for(const _0x3d0eaf of _0x4c9770[_0x3c4915(0x76a)]){if(_0x3c4915(0x4b7)===_0x3c4915(0x4b7))_0x3d0eaf['note'][_0x3c4915(0x4d7)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x3d0eaf[_0x3c4915(0x889)]=Math[_0x3c4915(0x2bb)](Number(RegExp['$1']),0x1));else return _0x33c7e0[_0x3c4915(0x998)]['ItemRect'][_0x3c4915(0x528)](this);}},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x89e)]=VisuMZ[_0x3a5d8e(0x89e)],VisuMZ[_0x3a5d8e(0x89e)]=function(_0x2bb297){const _0x1b248c=_0x3a5d8e;VisuMZ[_0x1b248c(0x690)]['ParseEnemyNotetags'][_0x1b248c(0x528)](this,_0x2bb297),_0x2bb297[_0x1b248c(0x889)]=0x1;const _0x10d9fb=_0x2bb297['note'];if(_0x10d9fb[_0x1b248c(0x4d7)](/<LEVEL:[ ](\d+)>/i))_0x2bb297[_0x1b248c(0x889)]=Number(RegExp['$1']);if(_0x10d9fb[_0x1b248c(0x4d7)](/<MAXHP:[ ](\d+)>/i))_0x2bb297['params'][0x0]=Number(RegExp['$1']);if(_0x10d9fb['match'](/<MAXMP:[ ](\d+)>/i))_0x2bb297[_0x1b248c(0x706)][0x1]=Number(RegExp['$1']);if(_0x10d9fb[_0x1b248c(0x4d7)](/<ATK:[ ](\d+)>/i))_0x2bb297[_0x1b248c(0x706)][0x2]=Number(RegExp['$1']);if(_0x10d9fb[_0x1b248c(0x4d7)](/<DEF:[ ](\d+)>/i))_0x2bb297['params'][0x3]=Number(RegExp['$1']);if(_0x10d9fb[_0x1b248c(0x4d7)](/<MAT:[ ](\d+)>/i))_0x2bb297[_0x1b248c(0x706)][0x4]=Number(RegExp['$1']);if(_0x10d9fb['match'](/<MDF:[ ](\d+)>/i))_0x2bb297[_0x1b248c(0x706)][0x5]=Number(RegExp['$1']);if(_0x10d9fb[_0x1b248c(0x4d7)](/<AGI:[ ](\d+)>/i))_0x2bb297[_0x1b248c(0x706)][0x6]=Number(RegExp['$1']);if(_0x10d9fb['match'](/<LUK:[ ](\d+)>/i))_0x2bb297[_0x1b248c(0x706)][0x7]=Number(RegExp['$1']);if(_0x10d9fb[_0x1b248c(0x4d7)](/<EXP:[ ](\d+)>/i))_0x2bb297[_0x1b248c(0x4c2)]=Number(RegExp['$1']);if(_0x10d9fb['match'](/<GOLD:[ ](\d+)>/i))_0x2bb297[_0x1b248c(0x7f1)]=Number(RegExp['$1']);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x332)]=Graphics['_defaultStretchMode'],Graphics['_defaultStretchMode']=function(){const _0x51a074=_0x3a5d8e;switch(VisuMZ[_0x51a074(0x690)][_0x51a074(0x227)][_0x51a074(0x169)][_0x51a074(0x679)]){case'stretch':return!![];case _0x51a074(0x8cd):return![];default:return VisuMZ[_0x51a074(0x690)][_0x51a074(0x332)][_0x51a074(0x528)](this);}},VisuMZ['CoreEngine'][_0x3a5d8e(0x516)]=Graphics[_0x3a5d8e(0x860)],Graphics['printError']=function(_0x426f3f,_0x5cd17b,_0x4373b6=null){const _0x471531=_0x3a5d8e;VisuMZ[_0x471531(0x690)][_0x471531(0x516)][_0x471531(0x528)](this,_0x426f3f,_0x5cd17b,_0x4373b6),VisuMZ[_0x471531(0x943)](![]);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x2e1)]=Graphics['_centerElement'],Graphics[_0x3a5d8e(0x8de)]=function(_0x30d20a){const _0x110cc3=_0x3a5d8e;VisuMZ['CoreEngine'][_0x110cc3(0x2e1)][_0x110cc3(0x528)](this,_0x30d20a),this[_0x110cc3(0x290)](_0x30d20a);},Graphics[_0x3a5d8e(0x290)]=function(_0x1c84c5){const _0x351d9e=_0x3a5d8e;VisuMZ[_0x351d9e(0x690)]['Settings'][_0x351d9e(0x169)]['FontSmoothing']&&(_0x1c84c5['style']['font-smooth']=_0x351d9e(0x737));VisuMZ[_0x351d9e(0x690)][_0x351d9e(0x227)][_0x351d9e(0x169)][_0x351d9e(0x21c)]&&(_0x1c84c5[_0x351d9e(0x414)][_0x351d9e(0x237)]=_0x351d9e(0x5c6));const _0x8456e4=Math['max'](0x0,Math['floor'](_0x1c84c5[_0x351d9e(0x89a)]*this['_realScale'])),_0xd116a7=Math[_0x351d9e(0x2bb)](0x0,Math[_0x351d9e(0x3de)](_0x1c84c5[_0x351d9e(0x223)]*this[_0x351d9e(0x329)]));_0x1c84c5[_0x351d9e(0x414)][_0x351d9e(0x89a)]=_0x8456e4+'px',_0x1c84c5[_0x351d9e(0x414)][_0x351d9e(0x223)]=_0xd116a7+'px';},VisuMZ[_0x3a5d8e(0x690)]['Bitmap_initialize']=Bitmap['prototype']['initialize'],Bitmap['prototype']['initialize']=function(_0x55664f,_0x2b0745){const _0x199795=_0x3a5d8e;VisuMZ[_0x199795(0x690)]['Bitmap_initialize'][_0x199795(0x528)](this,_0x55664f,_0x2b0745),this['_smooth']=!(VisuMZ['CoreEngine'][_0x199795(0x227)]['QoL'][_0x199795(0x21c)]??!![]);},Bitmap['prototype'][_0x3a5d8e(0x353)]=function(){const _0xc87853=_0x3a5d8e;this[_0xc87853(0x912)]=!![];},VisuMZ[_0x3a5d8e(0x690)]['Sprite_destroy']=Sprite[_0x3a5d8e(0x715)][_0x3a5d8e(0x1c3)],Sprite[_0x3a5d8e(0x715)][_0x3a5d8e(0x1c3)]=function(){const _0x47f639=_0x3a5d8e;VisuMZ[_0x47f639(0x690)][_0x47f639(0x8aa)][_0x47f639(0x528)](this),this[_0x47f639(0x4e4)]();},Sprite['prototype'][_0x3a5d8e(0x4e4)]=function(){const _0x114c38=_0x3a5d8e;if(!this[_0x114c38(0x247)])return;if(!this[_0x114c38(0x247)][_0x114c38(0x912)])return;this[_0x114c38(0x247)][_0x114c38(0x599)]&&!this[_0x114c38(0x462)][_0x114c38(0x599)][_0x114c38(0x8b3)]&&('zREiq'!==_0x114c38(0x97f)?this[_0x114c38(0x247)][_0x114c38(0x1c3)]():this[_0x114c38(0x241)](_0x33a0c7[_0x114c38(0x2bb)](this[_0x114c38(0x481)](),this[_0x114c38(0x5c5)]()-0x1)));},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x218)]=Bitmap[_0x3a5d8e(0x715)][_0x3a5d8e(0x427)],Bitmap[_0x3a5d8e(0x715)][_0x3a5d8e(0x427)]=function(_0x21155f,_0x39712f){const _0x4dfc88=_0x3a5d8e;VisuMZ['CoreEngine'][_0x4dfc88(0x218)][_0x4dfc88(0x528)](this,_0x21155f,_0x39712f),this[_0x4dfc88(0x353)]();},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x3c4)]=Bitmap[_0x3a5d8e(0x715)][_0x3a5d8e(0x870)],Bitmap[_0x3a5d8e(0x715)][_0x3a5d8e(0x870)]=function(_0x1a5ee0,_0x3fb440,_0x3e1796,_0x5c2361,_0x3c5b2c,_0x594fa5,_0x1b1631,_0x2495ea,_0x2713bb){const _0x44553a=_0x3a5d8e;_0x3fb440=Math[_0x44553a(0x6dd)](_0x3fb440),_0x3e1796=Math['round'](_0x3e1796),_0x5c2361=Math[_0x44553a(0x6dd)](_0x5c2361),_0x3c5b2c=Math[_0x44553a(0x6dd)](_0x3c5b2c),_0x594fa5=Math[_0x44553a(0x6dd)](_0x594fa5),_0x1b1631=Math[_0x44553a(0x6dd)](_0x1b1631),VisuMZ['CoreEngine']['Bitmap_blt'][_0x44553a(0x528)](this,_0x1a5ee0,_0x3fb440,_0x3e1796,_0x5c2361,_0x3c5b2c,_0x594fa5,_0x1b1631,_0x2495ea,_0x2713bb),this[_0x44553a(0x353)]();},VisuMZ['CoreEngine'][_0x3a5d8e(0x761)]=Bitmap['prototype']['clearRect'],Bitmap[_0x3a5d8e(0x715)][_0x3a5d8e(0x611)]=function(_0x5d6718,_0x74105f,_0x17d977,_0x6b4f2b){const _0x3258ae=_0x3a5d8e;VisuMZ[_0x3258ae(0x690)][_0x3258ae(0x761)][_0x3258ae(0x528)](this,_0x5d6718,_0x74105f,_0x17d977,_0x6b4f2b),this[_0x3258ae(0x353)]();},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x728)]=Bitmap[_0x3a5d8e(0x715)][_0x3a5d8e(0x8d2)],Bitmap[_0x3a5d8e(0x715)][_0x3a5d8e(0x8d2)]=function(_0x1ad517,_0x37affe,_0x586a61,_0x325778,_0x3919b1){const _0x1a71eb=_0x3a5d8e;VisuMZ['CoreEngine'][_0x1a71eb(0x728)][_0x1a71eb(0x528)](this,_0x1ad517,_0x37affe,_0x586a61,_0x325778,_0x3919b1),this[_0x1a71eb(0x353)]();},VisuMZ['CoreEngine'][_0x3a5d8e(0x420)]=Bitmap['prototype'][_0x3a5d8e(0x7d0)],Bitmap['prototype'][_0x3a5d8e(0x7d0)]=function(_0x5d012e,_0x5d7972,_0x5a9afb,_0x345060,_0x38f9f5){const _0x8afb4e=_0x3a5d8e;VisuMZ[_0x8afb4e(0x690)][_0x8afb4e(0x420)][_0x8afb4e(0x528)](this,_0x5d012e,_0x5d7972,_0x5a9afb,_0x345060,_0x38f9f5),this[_0x8afb4e(0x353)]();},VisuMZ['CoreEngine'][_0x3a5d8e(0x6bf)]=Bitmap[_0x3a5d8e(0x715)][_0x3a5d8e(0x1d5)],Bitmap[_0x3a5d8e(0x715)]['gradientFillRect']=function(_0x4d739e,_0x1bccae,_0x58eba9,_0x245cc3,_0x30c9da,_0x28fb26,_0x4add90){const _0x5d2737=_0x3a5d8e;VisuMZ[_0x5d2737(0x690)][_0x5d2737(0x6bf)][_0x5d2737(0x528)](this,_0x4d739e,_0x1bccae,_0x58eba9,_0x245cc3,_0x30c9da,_0x28fb26,_0x4add90),this['markCoreEngineModified']();},VisuMZ['CoreEngine']['Bitmap_drawCircle']=Bitmap[_0x3a5d8e(0x715)][_0x3a5d8e(0x4f4)],Bitmap[_0x3a5d8e(0x715)][_0x3a5d8e(0x4f4)]=function(_0x205a3f,_0x15b623,_0x2631ec,_0x515ff9){const _0x360b17=_0x3a5d8e;_0x205a3f=Math['round'](_0x205a3f),_0x15b623=Math[_0x360b17(0x6dd)](_0x15b623),_0x2631ec=Math[_0x360b17(0x6dd)](_0x2631ec),VisuMZ[_0x360b17(0x690)][_0x360b17(0x2d2)][_0x360b17(0x528)](this,_0x205a3f,_0x15b623,_0x2631ec,_0x515ff9),this['markCoreEngineModified']();},VisuMZ[_0x3a5d8e(0x690)]['Bitmap_measureTextWidth']=Bitmap['prototype'][_0x3a5d8e(0x381)],Bitmap['prototype'][_0x3a5d8e(0x381)]=function(_0x316329){const _0xd9964=_0x3a5d8e;return Math[_0xd9964(0x2bd)](VisuMZ[_0xd9964(0x690)][_0xd9964(0x851)]['call'](this,_0x316329));},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x4ca)]=Bitmap['prototype'][_0x3a5d8e(0x159)],Bitmap[_0x3a5d8e(0x715)][_0x3a5d8e(0x159)]=function(_0x32c834,_0x460f51,_0x432447,_0x46b5a6,_0x596dd4,_0x52a46a){const _0x29b69a=_0x3a5d8e;_0x460f51=Math[_0x29b69a(0x6dd)](_0x460f51),_0x432447=Math[_0x29b69a(0x6dd)](_0x432447),_0x46b5a6=Math[_0x29b69a(0x6dd)](_0x46b5a6),_0x596dd4=Math[_0x29b69a(0x6dd)](_0x596dd4),VisuMZ[_0x29b69a(0x690)][_0x29b69a(0x4ca)][_0x29b69a(0x528)](this,_0x32c834,_0x460f51,_0x432447,_0x46b5a6,_0x596dd4,_0x52a46a),this[_0x29b69a(0x353)]();},VisuMZ['CoreEngine'][_0x3a5d8e(0x515)]=Bitmap[_0x3a5d8e(0x715)][_0x3a5d8e(0x62f)],Bitmap[_0x3a5d8e(0x715)][_0x3a5d8e(0x62f)]=function(_0x180ede,_0x8cd232,_0x5a2779,_0x409c5d){const _0x199bbb=_0x3a5d8e;VisuMZ[_0x199bbb(0x690)][_0x199bbb(0x227)][_0x199bbb(0x169)][_0x199bbb(0x82f)]?this[_0x199bbb(0x1b9)](_0x180ede,_0x8cd232,_0x5a2779,_0x409c5d):VisuMZ[_0x199bbb(0x690)][_0x199bbb(0x515)][_0x199bbb(0x528)](this,_0x180ede,_0x8cd232,_0x5a2779,_0x409c5d);},Bitmap['prototype'][_0x3a5d8e(0x1b9)]=function(_0xf3c95a,_0x1834da,_0x73e848,_0x47056e){const _0x55fa9a=_0x3a5d8e,_0x33cac8=this['context'];_0x33cac8[_0x55fa9a(0x8a0)]=this['outlineColor'],_0x33cac8[_0x55fa9a(0x577)](_0xf3c95a,_0x1834da+0x2,_0x73e848+0x2,_0x47056e);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x35c)]=Input[_0x3a5d8e(0x166)],Input[_0x3a5d8e(0x166)]=function(){const _0x876fbb=_0x3a5d8e;VisuMZ['CoreEngine'][_0x876fbb(0x35c)][_0x876fbb(0x528)](this),this[_0x876fbb(0x476)]=undefined,this[_0x876fbb(0x7e5)]=undefined,this[_0x876fbb(0x5c2)]=Input[_0x876fbb(0x996)];},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x7b5)]=Input[_0x3a5d8e(0x24a)],Input[_0x3a5d8e(0x24a)]=function(){const _0xa6d404=_0x3a5d8e;VisuMZ[_0xa6d404(0x690)][_0xa6d404(0x7b5)][_0xa6d404(0x528)](this);if(this[_0xa6d404(0x5c2)])this[_0xa6d404(0x5c2)]--;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x268)]=Input[_0x3a5d8e(0x3ed)],Input[_0x3a5d8e(0x3ed)]=function(){const _0x4a5afb=_0x3a5d8e;if(this['_gamepadWait'])return;VisuMZ[_0x4a5afb(0x690)][_0x4a5afb(0x268)][_0x4a5afb(0x528)](this);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x989)]=Input[_0x3a5d8e(0x5dc)],Input[_0x3a5d8e(0x5dc)]=function(){const _0x29df95=_0x3a5d8e;VisuMZ[_0x29df95(0x690)][_0x29df95(0x989)]['call'](this),document[_0x29df95(0x6c3)](_0x29df95(0x311),this[_0x29df95(0x962)][_0x29df95(0x8b1)](this));},VisuMZ[_0x3a5d8e(0x690)]['Input_onKeyDown']=Input[_0x3a5d8e(0x28c)],Input[_0x3a5d8e(0x28c)]=function(_0x2ca10a){const _0x498b61=_0x3a5d8e;this[_0x498b61(0x7e5)]=_0x2ca10a[_0x498b61(0x173)],VisuMZ['CoreEngine'][_0x498b61(0x2eb)][_0x498b61(0x528)](this,_0x2ca10a),this['setLastGamepadUsed'](null);},Input[_0x3a5d8e(0x962)]=function(_0x5e1888){this['_registerKeyInput'](_0x5e1888);},Input[_0x3a5d8e(0x22c)]=function(_0x5526a6){const _0x229054=_0x3a5d8e;this[_0x229054(0x7e5)]=_0x5526a6[_0x229054(0x173)];let _0x2c2d2f=String[_0x229054(0x266)](_0x5526a6['charCode']);if(this['_inputString']===undefined){if(_0x229054(0x234)===_0x229054(0x2d3))return _0xf7c63b[_0x229054(0x508)]()>=0x1;else this['_inputString']=_0x2c2d2f;}else _0x229054(0x6d5)!==_0x229054(0x151)?this[_0x229054(0x476)]+=_0x2c2d2f:this[_0x229054(0x957)]=_0x229054(0x408);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x24c)]=Input['_shouldPreventDefault'],Input['_shouldPreventDefault']=function(_0x37771a){const _0x448dd7=_0x3a5d8e;if(_0x37771a===0x8)return![];return VisuMZ[_0x448dd7(0x690)][_0x448dd7(0x24c)][_0x448dd7(0x528)](this,_0x37771a);},Input['isSpecialCode']=function(_0x3ad1a8){const _0x3acc3d=_0x3a5d8e;if(_0x3ad1a8[_0x3acc3d(0x4d7)](/backspace/i))return this[_0x3acc3d(0x7e5)]===0x8;if(_0x3ad1a8[_0x3acc3d(0x4d7)](/enter/i))return this[_0x3acc3d(0x7e5)]===0xd;if(_0x3ad1a8[_0x3acc3d(0x4d7)](/escape/i))return this[_0x3acc3d(0x7e5)]===0x1b;},Input[_0x3a5d8e(0x896)]=function(){const _0x2cbe9f=_0x3a5d8e;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x2cbe9f(0x820)](this['_inputSpecialKeyCode']);},Input[_0x3a5d8e(0x1ac)]=function(){const _0x3b5481=_0x3a5d8e;return[0x25,0x26,0x27,0x28][_0x3b5481(0x820)](this[_0x3b5481(0x7e5)]);},Input[_0x3a5d8e(0x8dd)]=function(){const _0x522fe8=_0x3a5d8e;if(navigator[_0x522fe8(0x905)]){const _0x532125=navigator[_0x522fe8(0x905)]();if(_0x532125)for(const _0x3d83d9 of _0x532125){if(_0x3d83d9&&_0x3d83d9[_0x522fe8(0x32c)])return!![];}}return![];},Input[_0x3a5d8e(0x359)]=function(){const _0x5865a1=_0x3a5d8e;if(navigator[_0x5865a1(0x905)]){if(_0x5865a1(0x52f)===_0x5865a1(0x52f)){const _0x408d07=navigator[_0x5865a1(0x905)]();if(_0x408d07)for(const _0x5b5693 of _0x408d07){if(_0x5b5693&&_0x5b5693[_0x5865a1(0x32c)]){if(this[_0x5865a1(0x21a)](_0x5b5693))return!![];if(this[_0x5865a1(0x1d1)](_0x5b5693))return!![];}}}else[0x6c,0x198]['includes'](_0x5021a9[_0x5865a1(0x75e)])&&(_0x4bb7d9+='\x0a',_0x493224+=_0x583ce0['parameters'][0x0]);}return![];},Input['isGamepadButtonPressed']=function(_0x5f3335){const _0x5e83ab=_0x3a5d8e,_0x53abf1=_0x5f3335[_0x5e83ab(0x47d)];for(let _0x384c0c=0x0;_0x384c0c<_0x53abf1['length'];_0x384c0c++){if(_0x53abf1[_0x384c0c][_0x5e83ab(0x27e)])return!![];}return![];},Input[_0x3a5d8e(0x1d1)]=function(_0x2623aa){const _0x22cc05=_0x3a5d8e,_0x3dbc9e=_0x2623aa[_0x22cc05(0x533)],_0x26be7c=0.5;if(_0x3dbc9e[0x0]<-_0x26be7c)return!![];if(_0x3dbc9e[0x0]>_0x26be7c)return!![];if(_0x3dbc9e[0x1]<-_0x26be7c)return!![];if(_0x3dbc9e[0x1]>_0x26be7c)return!![];return![];},Input[_0x3a5d8e(0x316)]=function(){const _0xa64c1b=_0x3a5d8e;return this[_0xa64c1b(0x96d)]||null;},Input['setLastGamepadUsed']=function(_0x23eca2){const _0x393659=_0x3a5d8e;this[_0x393659(0x96d)]=_0x23eca2;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x4a1)]=Input[_0x3a5d8e(0x941)],Input['_updateGamepadState']=function(_0x3ac368){const _0x5b2222=_0x3a5d8e;VisuMZ[_0x5b2222(0x690)][_0x5b2222(0x4a1)]['call'](this,_0x3ac368),(this[_0x5b2222(0x21a)](_0x3ac368)||this[_0x5b2222(0x1d1)](_0x3ac368))&&(_0x5b2222(0x927)!=='oAqDM'?this[_0x5b2222(0x773)](_0x3ac368):this[_0x5b2222(0x3b5)]());},Input[_0x3a5d8e(0x4fe)]=function(){const _0x4f3621=_0x3a5d8e;return this[_0x4f3621(0x96d)]?this[_0x4f3621(0x96d)]['id']:'Keyboard';},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x45c)]=Tilemap[_0x3a5d8e(0x715)][_0x3a5d8e(0x49e)],Tilemap[_0x3a5d8e(0x715)][_0x3a5d8e(0x49e)]=function(_0x364def,_0x23758f,_0x2f9022,_0x4cf57d){const _0x171b5a=_0x3a5d8e;if($gameMap&&$gameMap[_0x171b5a(0x534)]())return;VisuMZ[_0x171b5a(0x690)]['Tilemap_addShadow']['call'](this,_0x364def,_0x23758f,_0x2f9022,_0x4cf57d);},Tilemap['Renderer'][_0x3a5d8e(0x715)]['_createInternalTextures']=function(){const _0x4d6751=_0x3a5d8e;this[_0x4d6751(0x3a1)]();for(let _0x4307f6=0x0;_0x4307f6<Tilemap[_0x4d6751(0x83c)]['MAX_GL_TEXTURES'];_0x4307f6++){const _0x41a18f=new PIXI[(_0x4d6751(0x623))]();_0x41a18f['setSize'](0x800,0x800),VisuMZ['CoreEngine'][_0x4d6751(0x227)]['QoL'][_0x4d6751(0x21c)]&&(_0x41a18f[_0x4d6751(0x3ea)]=PIXI[_0x4d6751(0x81d)][_0x4d6751(0x6b9)]),this[_0x4d6751(0x2d7)][_0x4d6751(0x429)](_0x41a18f);}},WindowLayer[_0x3a5d8e(0x715)][_0x3a5d8e(0x68c)]=function(){const _0x35fbe5=_0x3a5d8e;if(SceneManager&&SceneManager[_0x35fbe5(0x3bb)])return SceneManager[_0x35fbe5(0x3bb)]['isWindowMaskingEnabled']();else{if(_0x35fbe5(0x1b8)!==_0x35fbe5(0x1b8)){const _0x212eff=this[_0x35fbe5(0x53e)](),_0x4048da=this[_0x35fbe5(0x780)](),_0x5e41e2=this[_0x35fbe5(0x2dd)]();this[_0x35fbe5(0x878)](),this['bitmap'][_0x35fbe5(0x166)](),this[_0x35fbe5(0x247)][_0x35fbe5(0x503)](_0x212eff,0x0,0x0,_0x4048da,_0x5e41e2,_0x35fbe5(0x554));}else return!![];}},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x38f)]=WindowLayer[_0x3a5d8e(0x715)][_0x3a5d8e(0x60d)],WindowLayer[_0x3a5d8e(0x715)][_0x3a5d8e(0x60d)]=function render(_0x1acd96){const _0x2e8fd6=_0x3a5d8e;if(this[_0x2e8fd6(0x68c)]())VisuMZ['CoreEngine']['WindowLayer_render'][_0x2e8fd6(0x528)](this,_0x1acd96);else{if(_0x2e8fd6(0x1e1)==='bwNnF')this[_0x2e8fd6(0x591)](_0x1acd96);else return _0x4a58c2['_scene'][_0x2e8fd6(0x179)]();}},WindowLayer[_0x3a5d8e(0x715)]['renderNoMask']=function render(_0x3966e){const _0x5560e9=_0x3a5d8e;if(!this[_0x5560e9(0x8c3)])return;const _0x2761cd=new PIXI[(_0x5560e9(0x252))](),_0x369ecd=_0x3966e['gl'],_0xecbfbe=this[_0x5560e9(0x2c5)]['clone']();_0x3966e['framebuffer'][_0x5560e9(0x6b2)](),_0x2761cd['transform']=this['transform'],_0x3966e[_0x5560e9(0x720)][_0x5560e9(0x4a6)](),_0x369ecd['enable'](_0x369ecd['STENCIL_TEST']);while(_0xecbfbe[_0x5560e9(0x3fe)]>0x0){if(_0x5560e9(0x5d6)!==_0x5560e9(0x5d6)){const _0x4ac36d=_0x2e2e48(_0x2bda4a['$1']);_0x4ac36d<_0x22558c?(_0x39f9bc(_0x5560e9(0x190)[_0x5560e9(0x5a1)](_0x2d7577,_0x4ac36d,_0x56426c)),_0x56bd87[_0x5560e9(0x5e5)]()):_0x2fcb2a=_0x1e6bc8['max'](_0x4ac36d,_0x17ed19);}else{const _0xe9eba1=_0xecbfbe['shift']();_0xe9eba1['_isWindow']&&_0xe9eba1['visible']&&_0xe9eba1[_0x5560e9(0x5eb)]>0x0&&(_0x369ecd[_0x5560e9(0x884)](_0x369ecd[_0x5560e9(0x63f)],0x0,~0x0),_0x369ecd[_0x5560e9(0x20f)](_0x369ecd[_0x5560e9(0x411)],_0x369ecd[_0x5560e9(0x411)],_0x369ecd[_0x5560e9(0x411)]),_0xe9eba1['render'](_0x3966e),_0x3966e[_0x5560e9(0x720)][_0x5560e9(0x4a6)](),_0x2761cd['clear'](),_0x369ecd['stencilFunc'](_0x369ecd[_0x5560e9(0x791)],0x1,~0x0),_0x369ecd[_0x5560e9(0x20f)](_0x369ecd[_0x5560e9(0x361)],_0x369ecd[_0x5560e9(0x361)],_0x369ecd['REPLACE']),_0x369ecd[_0x5560e9(0x2b3)](_0x369ecd[_0x5560e9(0x579)],_0x369ecd[_0x5560e9(0x85a)]),_0x2761cd['render'](_0x3966e),_0x3966e['batch'][_0x5560e9(0x4a6)](),_0x369ecd['blendFunc'](_0x369ecd[_0x5560e9(0x85a)],_0x369ecd[_0x5560e9(0x5ed)]));}}_0x369ecd[_0x5560e9(0x893)](_0x369ecd[_0x5560e9(0x504)]),_0x369ecd['clear'](_0x369ecd[_0x5560e9(0x880)]),_0x369ecd[_0x5560e9(0x19b)](0x0),_0x3966e['batch'][_0x5560e9(0x4a6)]();for(const _0x181027 of this[_0x5560e9(0x2c5)]){if(!_0x181027['_isWindow']&&_0x181027[_0x5560e9(0x8c3)]){if(_0x5560e9(0x806)===_0x5560e9(0x90a)){if(_0x55a8f2)_0x429f29[_0x5560e9(0x468)]();_0x2d741f[_0x5560e9(0x690)]['Scene_Base_terminateAnimationClearBugFix'][_0x5560e9(0x528)](this);}else _0x181027[_0x5560e9(0x60d)](_0x3966e);}}_0x3966e[_0x5560e9(0x720)][_0x5560e9(0x4a6)]();},DataManager[_0x3a5d8e(0x603)]=function(_0xd780cb){const _0x5ebe68=_0x3a5d8e;return this['isItem'](_0xd780cb)&&_0xd780cb[_0x5ebe68(0x960)]===0x2;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x5f9)]=DataManager[_0x3a5d8e(0x939)],DataManager[_0x3a5d8e(0x939)]=function(){const _0x199cf3=_0x3a5d8e;VisuMZ[_0x199cf3(0x690)]['DataManager_setupNewGame'][_0x199cf3(0x528)](this),this[_0x199cf3(0x6dc)](),this[_0x199cf3(0x741)]();},DataManager[_0x3a5d8e(0x6dc)]=function(){const _0x319954=_0x3a5d8e;if($gameTemp[_0x319954(0x583)]()){const _0x58ec73=VisuMZ[_0x319954(0x690)][_0x319954(0x227)]['QoL'][_0x319954(0x4b4)];if(_0x58ec73>0x0)$gameTemp['reserveCommonEvent'](_0x58ec73);}},DataManager[_0x3a5d8e(0x741)]=function(){const _0xcd23c6=_0x3a5d8e,_0x125a97=VisuMZ['CoreEngine']['Settings'][_0xcd23c6(0x169)][_0xcd23c6(0x370)]||0x0;if(_0x125a97>0x0)$gameTemp[_0xcd23c6(0x2cc)](_0x125a97);},DataManager[_0x3a5d8e(0x7bb)]=function(_0x701064){const _0x11c6c4=_0x3a5d8e,_0x2e1672=$dataTroops[_0x701064];if(!_0x2e1672)return'';let _0x3ff4b3='';_0x3ff4b3+=_0x2e1672[_0x11c6c4(0x53e)];for(const _0x1ecae7 of _0x2e1672[_0x11c6c4(0x2f9)]){for(const _0x1eb07e of _0x1ecae7[_0x11c6c4(0x521)]){if(_0x11c6c4(0x82d)==='MAwjQ')_0x3b7384['CoreEngine']['Scene_Boot_startNormalGame'][_0x11c6c4(0x528)](this);else{if([0x6c,0x198]['includes'](_0x1eb07e[_0x11c6c4(0x75e)])){if(_0x11c6c4(0x3d6)!==_0x11c6c4(0x3d6)){if(_0x228501[_0x11c6c4(0x287)][_0x11c6c4(0x528)](this)){const _0xd2d7fb=_0x4e104a[_0x11c6c4(0x153)];let _0x53c1ee=_0x1719b0[_0x11c6c4(0x570)];if(['',_0x11c6c4(0x426)]['includes'](_0x53c1ee))_0x53c1ee=_0x2143f8[_0x11c6c4(0x5d8)][_0x11c6c4(0x528)](this);const _0x266569=_0x1bb374['EnableJS'][_0x11c6c4(0x528)](this),_0x411376=_0x1b576a[_0x11c6c4(0x8b6)][_0x11c6c4(0x528)](this);this[_0x11c6c4(0x51e)](_0x53c1ee,_0xd2d7fb,_0x266569,_0x411376),this[_0x11c6c4(0x390)](_0xd2d7fb,_0x1f182d[_0x11c6c4(0x907)]['bind'](this,_0x411376));}}else _0x3ff4b3+='\x0a',_0x3ff4b3+=_0x1eb07e[_0x11c6c4(0x16a)][0x0];}}}}return _0x3ff4b3;};(VisuMZ['CoreEngine'][_0x3a5d8e(0x227)][_0x3a5d8e(0x169)][_0x3a5d8e(0x81e)]??!![])&&($scene=null,VisuMZ['CoreEngine'][_0x3a5d8e(0x181)]=Scene_Base['prototype'][_0x3a5d8e(0x1e9)],Scene_Base['prototype'][_0x3a5d8e(0x1e9)]=function(){const _0x31c1da=_0x3a5d8e;VisuMZ[_0x31c1da(0x690)]['Scene_Base_create'][_0x31c1da(0x528)](this),$scene=this;},$spriteset=null,VisuMZ['CoreEngine'][_0x3a5d8e(0x1ce)]=Scene_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x8d3)],Scene_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x8d3)]=function(){const _0x38ee94=_0x3a5d8e;VisuMZ[_0x38ee94(0x690)]['Scene_Map_createSpriteset'][_0x38ee94(0x528)](this),$spriteset=this[_0x38ee94(0x91e)];},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x4ab)]=Scene_Battle[_0x3a5d8e(0x715)][_0x3a5d8e(0x8d3)],Scene_Battle[_0x3a5d8e(0x715)][_0x3a5d8e(0x8d3)]=function(){const _0x1232b2=_0x3a5d8e;VisuMZ['CoreEngine'][_0x1232b2(0x4ab)][_0x1232b2(0x528)](this),$spriteset=this[_0x1232b2(0x91e)];},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x7b3)]=Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x53a)],Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x53a)]=function(){const _0x55dc9d=_0x3a5d8e;VisuMZ[_0x55dc9d(0x690)][_0x55dc9d(0x7b3)][_0x55dc9d(0x528)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ['CoreEngine'][_0x3a5d8e(0x5da)]=BattleManager[_0x3a5d8e(0x24a)],BattleManager[_0x3a5d8e(0x24a)]=function(_0x189b6b){const _0x514ea9=_0x3a5d8e;VisuMZ[_0x514ea9(0x690)]['BattleManager_update'][_0x514ea9(0x528)](this,_0x189b6b),$subject=this[_0x514ea9(0x388)],$targets=this[_0x514ea9(0x1e0)],$target=this['_target']||this[_0x514ea9(0x1e0)][0x0];},$event=null,VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x2a7)]=Game_Event['prototype'][_0x3a5d8e(0x4fb)],Game_Event[_0x3a5d8e(0x715)][_0x3a5d8e(0x4fb)]=function(){const _0x2962be=_0x3a5d8e;VisuMZ['CoreEngine'][_0x2962be(0x2a7)][_0x2962be(0x528)](this),$event=this;},VisuMZ['CoreEngine'][_0x3a5d8e(0x659)]=Scene_Map[_0x3a5d8e(0x715)]['update'],Scene_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x24a)]=function(){const _0x23b790=_0x3a5d8e;VisuMZ[_0x23b790(0x690)]['Scene_Map_update']['call'](this),$gameMap['updateCurrentEvent']();},Game_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x1a4)]=function(){const _0x2fb69d=_0x3a5d8e;!this['isEventRunning']()&&$event!==null&&('qsyCE'===_0x2fb69d(0x72b)?$event=null:_0x4a7269+=_0x5e3a48);},$commonEvent=function(_0x40f2a9){const _0x5888e9=_0x3a5d8e;if($gameTemp)$gameTemp[_0x5888e9(0x2cc)](_0x40f2a9);},$onceParallel=function(_0x28a5e4){const _0xf7e11e=_0x3a5d8e;if(SceneManager['isSceneMap']()){if(_0xf7e11e(0x5a7)==='VJvdQ')$scene['playOnceParallelInterpreter'](_0x28a5e4);else return _0x20c8cb[_0xf7e11e(0x690)][_0xf7e11e(0x395)]['call'](this,_0x1f42a2);}else{if(SceneManager[_0xf7e11e(0x7ba)]()){if(_0xf7e11e(0x4b8)!==_0xf7e11e(0x4ce)){if(Imported[_0xf7e11e(0x3fa)])_0xf7e11e(0x264)==='oPuZK'?$scene[_0xf7e11e(0x527)](_0x28a5e4):(_0x1be67a[_0xf7e11e(0x690)][_0xf7e11e(0x196)][_0xf7e11e(0x528)](this),this[_0xf7e11e(0x21d)]());else $gameTemp&&$gameTemp['isPlaytest']()&&alert('Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!');}else return 0x0;}else $gameTemp&&$gameTemp[_0xf7e11e(0x583)]()&&(_0xf7e11e(0x1f0)===_0xf7e11e(0x1f0)?alert(_0xf7e11e(0x307)):(this[_0xf7e11e(0x748)][_0xf7e11e(0x88e)]=!![],this[_0xf7e11e(0x748)]['displayX']=_0x1e5e66[_0xf7e11e(0x40b)]||0x0));}});function _0x2be0(){const _0x30b124=['NHwSO','StatusParamsBgType','vertical','》Comment《\x0a%1\x0a','isPlaying','setupNewGame','_backSprite2','CommonEventID','xparamPlus2','DetachBattlePictureContainer','_repositioned','_statusParamsWindow','ParseSkillNotetags','_updateGamepadState','processBack','ShowDevTools','iconHeight','SideButtons','\x0a\x0a\x0a\x0a\x0a','ButtonAssist','expParams','Window_Selectable_cursorDown','system','_commandList','InputBgType','makeFontBigger','TXZIi','ALTGR','Padding','opacity','NONCONVERT','updateMove','EgZDx','setGuard','targetOpacity','_forcedBattleSys','OHGFw','titles2','playTestF6','Window_StatusBase_drawActorSimpleStatus','drawItem','Upper\x20Left','BlendMode','Game_Action_updateLastTarget','itypeId','isBusy','_onKeyPress','pow','Window_NameInput_initialize','inputWindowRect','playLoad','consumable','_optionsWindow','ColorPowerUp','ExportString','helpAreaTop','beeYb','_lastGamepad','gaugeBackColor','clearForcedGameTroopSettingsCoreEngine','setEnemyAction','HcIIC','AudioChangeBgmPan','uhiCP','WIN_OEM_PA1','traitsPi','resetFontSettings','DEF','CpVTk','jijhx','NRCQh','catchLoadError','MDF','kxgrS','_target','SIjdh','UhAFe','_lastX','Scene_Map_createMenuButton','MlObC','eUVip','HNtAZ','useDigitGroupingEx','toUpperCase','buttonAssistText%1','Input_setupEventHandlers','gRmwW','keyMapper','DOWN','move','listWindowRect','NUMPAD7','orRTB','Flat1','JNAYn','skillTypeWindowRect','startAnimation','mainAreaBottom','keyRepeatWait','VulJk','layoutSettings','LevelUpFullHp','JotqA','TPB\x20WAIT','(\x5cd+)>','createWindowLayer','createDimmerSprite','ctGaugeColor1','apply','OutlineColorDmg','Spriteset_Battle_createEnemies','pUyMR','SParamVocab7','itemRect','scrollLeft','CommandBgType','switchModes','onload','INQUART','Kdmgw','VisuMZ_2_BattleSystemBTB','updateKeyText','_helpWindow','KKDmA','ALold','systemColor','Game_Picture_move','item','Scene_Name_onInputOk','lVdVw','Name','MULTIPLY','outlineColorGauge','ColorMaxLvGauge2','rgba(0,\x200,\x200,\x200.7)','isMVAnimation','_duration','Game_Troop_setup','MEAfQ','mOZIC','AudioChangeBgsVolume','Symbol','levelUpRecovery','fpgzZ','_width','terms','Scene_Title_drawGameTitle','drawText','updatePositionCoreEngine','PictureID','tpGaugeColor1','〘Show\x20Text〙\x0a','ActorHPColor','command105','Game_Action_setAttack','buttonAssistOffset2','addChild','HSKSP','paramPlus','gaugeRate','clear','initialBattleSystem','PERCENT','QoL','parameters','ryFKc','CIRCUMFLEX','Sprite_Button_updateOpacity','oPUrs','mXPRf','UpdatePictureCoordinates','fontSize','pYEji','keyCode','startShake','ColorMPCost','loadTitle2','pictureButtons','onEscapeSuccess','isWindowMaskingEnabled','IconParam6','targetEvaRate','enter','_isPlaytest','NoTileShadows','battlebacks2','processTouch','Scene_Base_create','setEasingType','LevelUpFullMp','DrawIcons','JmsaV','SmartEventCollisionPriority','removePointAnimation','MAXHP','BuyBgType','GameEnd','tilesets','exportAllMapStrings','_stored_mpGaugeColor2','IconParam1','RowSpacing','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','SdOwG','textSizeEx','XASbh','IiIDz','INCIRC','Scene_Item_create','AnimationMirrorOffset','dimColor2','createPageButtons','zKOOr','clearStencil','button','_currentBgs','version','createCustomParameter','loadIconBitmap','setMute','ferEW','createKeyJS','updateCurrentEvent','BCJEQ','vAjCC','MapOnceParallel','LMnsa','WIN_OEM_FJ_ROYA','IconXParam4','WIN_OEM_CLEAR','isArrowPressed','makeActionList','DefaultMode','nzkjH','PIPE','maxLevel','smallParamFontSize','ARRAYNUM','repositionCancelButtonSideButtonLayout','_cancelButton','alignBottom','RfnKr','XtxiG','_drawTextShadow','IconParam3','GoldFontSize','editWindowRect','keyboard','processKeyboardHandling','horizontal','setCoreEngineScreenShakeStyle','IconSet','GoldChange','destroy','_lastY','drawActorLevel','bQmXh','textWidth','setupCoreEasing','ZOOM','ItemStyle','maxCols','EREOF','INOUTBACK','Scene_Map_createSpriteset','ControllerMatches','CustomParamIcons','isGamepadAxisMoved','oWBNc','VariableEvalReference','updateOpen','gradientFillRect','createBackground','textAlign','Rate1','makeEncounterCount','_movementDuration','getPointAnimationLayer','5lqeydh','refreshWithTextCodeSupport','PDR','SwitchActorText','_targets','bwNnF','changeClass','Scene_Boot_loadSystemImages','optSideView','sparamFlatJS','BTestItems','createBuffer','Window_Selectable_drawBackgroundRect','create','DGVYC','WIN_OEM_FJ_LOYA','sQqle','setHome','ColorTPCost','createTitleButtons','oVFkC','ESsRV','_stored_deathColor','setClickHandler','Window_Base_update','Scene_Shop_create','_stored_hpGaugeColor1','SystemSetSideView','_colorTone','#%1','setAttack','getCoreEngineScreenShakeStyle','Scene_Equip_create','endAnimation','innerHeight','buttonAssistWindowButtonRect','makeCommandList','WIN_OEM_RESET','BottomButtons','setBattleSystem','FhrQt','Speed','requiredWtypeId1','_commonEventLayers','StatusRect','GetParamIcon','_screenY','isCancelled','eZmbk','bgs','down','stencilOp','Key%1','tfWgy','MRG','encounterStepsMinimum','ColorMPGauge1','Window_NameInput_cursorRight','mainFontSize','paramBase','Bitmap_resize','JUNJA','isGamepadButtonPressed','_profileWindow','PixelateImageRendering','setCoreEngineUpdateWindowBg','ExportStrFromAllMaps','remove','NUMPAD5','Game_Party_consumeItem','Window_NameInput_cursorPageup','height','_stored_powerDownColor','TJFIL','_pageupButton','Settings','Scene_Map_createSpritesetFix','MAXMP','IDs','targetScaleY','_registerKeyInput','registerCommand','LFhXC','showPicture','PKFbq','dpWIq','replace','wjyMs','RnCDv','isSideView','_moveEasingType','image-rendering','yScrollLinkedOffset','OptionsRect','KwmNh','OpenURL','sparamRate1','F6key','VMXpy','rLqbJ','cursorPageup','smoothSelect','Sprite_Actor_setActorHome','buttonAssistOffset1','mpGaugeColor2','HRG','Mirror','bitmap','KeyUnlisted','OUTEXPO','update','top','Input_shouldPreventDefault','_tilemap','Y:\x20%1','hofcP','dWUEI','IconXParam8','Graphics','createJsQuickFunction','OPEN_CURLY_BRACKET','TtcCi','currentClass','F23','SceneManager_initialize','startAutoNewGame','_height','SwitchRandomizeOne','updatePositionCoreEngineShakeVert','XhGCu','Game_Action_itemEva','dashToggle','uiAreaHeight','_action','playOk','DsAHN','oPuZK','\x5c}❪SHIFT❫\x5c{','fromCharCode','mPMMd','Input_pollGamepads','SkillTypeRect','_stored_expGaugeColor1','contentsOpacity','toLocaleString','hpGaugeColor1','jXlyo','buttonAssistKey1','skipBranch','Conditional\x20Branch\x20Script\x20Error','createCustomBackgroundImages','Pfjxf','DigitGroupingStandardText','select','writeText','font-smooth','RevertPreserveNumbers','DisplayLockY','Window_NameInput_cursorPagedown','wjtgS','onMoveEnd','EVA','pressed','displayY','Window_Base_drawIcon','tePTq','_pressed','drawTextEx','pendingColor','DigitGroupingGaugeSprites','_colorCache','ShowJS','_displayY','X:\x20%1','DrbGW','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','_onKeyDown','WIN_OEM_JUMP','menuShowButton','_viewportSize','_centerElementCoreEngine','setSideView','EvDax','mainAreaHeight','anchorCoreEasing','isAlive','VOLUME_MUTE','OUTQUART','log','initialLevel','skillId','jsQuickFunc','UYjbJ','14151020BjQgZy','commandWindowRect','_clientArea','key%1','seVolume','setAction','_stored_crisisColor','pointY','onNameOk','IconParam4','Game_Event_start','jGtmo','updateMainMultiply','gainItem','_currentBgm','loadTitle1','animations','YGduG','pitch','dDAEO','dummyWindowRect','SwitchRandomizeRange','blendFunc','ImprovedAccuracySystem','BEcBZ','performEscape','_storedStack','contents','【%1】\x0a','4425822FEGufG','max','kNJTM','ceil','ARRAYSTR','targetX','determineSideButtonLayoutValid','eva','_pictureCoordinatesMode','removeFauxAnimation','IconXParam6','children','includes','setupButtonImage','cursorDown','ParseAllNotetags','GoldBgType','playCancel','reserveCommonEvent','constructor','OutlineColorGauge','Type','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','paramX','Bitmap_drawCircle','UvZsk','applyForcedGameTroopSettingsCoreEngine','SEMICOLON','getColorDataFromPluginParameters','_internalTextures','xparamRate1','paramRate','_origin','VisuMZ_2_BattleSystemCTB','MvAnimationRate','bitmapHeight','initDigitGrouping','rZcai','XParamVocab7','Graphics_centerElement','drawActorNickname','createPointAnimationQueue','Icon','Game_Map_scrollUp','Scene_Map_createSpriteset_detach','isSpecialCode','StatusMenu','clamp','ItemRect','Input_onKeyDown','RSAnE','centerY','UPTjN','wBULw','ColorCrisis','Window_Base_drawCharacter','HOME','OnLoadJS','piqTG','CustomParamNames','command357','Game_Picture_updateMove','AllMaps','pages','blockWidth','battlerHue','createPointAnimation','isRightInputMode','Param','_playtestF7Looping','_slotWindow','%1\x0a','RcOuW','FTB','vWGaI','operand','ConvertParams','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','Window_Base_initialize','Window_NameInput_cursorLeft','SsoeF','setup','drawCharacter','backspace','playBgs','anchor','DamageColor','keypress','RvmID','Sprite_Picture_updateOrigin','DigitGroupingLocale','getKeyboardInputButtonString','getLastGamepadUsed','Scene_Map_initialize','Match','map','bgsVolume','DETACH_PICTURE_CONTAINER','SceneManager_onKeyDown','NUwre','OUTSINE','helpAreaHeight','_lastOrigin','targetContentsOpacity','SlotBgType','buttonAssistKey4','loadSystem','LiXHv','511593LacsZA','Plus2','skills','_realScale','showDevTools','IconSParam4','connected','buttonAssistWindowRect','numActions','dropItems','traitObjects','pagedown','Graphics_defaultStretchMode','playBgm','ActorBgType','SellRect','calcCoreEasing','WURfm','_downArrowSprite','IconSParam5','random','ENTER','paramName','LineHeight','hpGaugeColor2','viewport','isSideButtonLayout','setActorHomeRepositioned','KSYql','LijDY','CrisisRate','maxBattleMembers','_listWindow','UYlFI','integer','showFauxAnimations','createCommandWindow','imageSmoothingEnabled','_onLoad','quit','Map%1','kHAEp','ExtractStrFromList','F22','pointX','markCoreEngineModified','setFrame','ProfileBgType','zuxmd','setBackgroundType','EncounterRateMinimum','isGamepadTriggered','pUcZN','crisisColor','Input_clear','buttonAssistSwitch','VisuMZ_2_BattleSystemOTB','numberWindowRect','areButtonsOutsideMainUI','REPLACE','qdUsj','background','statusEquipWindowRect','PictureEasingType','gAqnr','(\x5cd+\x5c.?\x5cd+)>','F10','ciLRk','processCursorHomeEndTrigger','itemHitImprovedAccuracy','updatePointAnimations','mtxki','initialize','_targetScaleX','NewGameCommonEventAll','PictureCoordinatesMode','updateTransform','BgFilename2','concat','_stored_maxLvGaugeColor1','parallaxes','XParamVocab0','_windowskin','gaugeLineHeight','bgmVolume','INOUTCIRC','SParamVocab5','cancel','482930JNuqsg','PositionY','KeyboardInput','measureTextWidth','DECIMAL','LATIN1','12ldBFlI','processKeyboardHome','NameInputMessage','initCoreEngine','_subject','_backgroundSprite','ColorCTGauge1','updateFauxAnimations','textColor','createChildSprite','randomInt','WindowLayer_render','setHandler','LoadError','valueOutlineWidth','checkSmartEventCollision','F17','TextManager_param','Opacity','yNdtS','BjfMG','pcmua','baseId','createFauxAnimationQueue','_digitGrouping','sparamRate2','targetSpritePosition','maxTurns','OUTQUINT','_destroyInternalTextures','paramchangeTextColor','IconSParam7','tab','ESC','BACKSPACE','GGQGP','Game_Action_itemHit','animationShouldMirror','mZJpK','trim','sparamPlus','retrievePointAnimation','_numberWindow','addOnceParallelInterpreter','nyyUa','TextCodeNicknames','mainAreaTopSideButtonLayout','_battleField','TUAsO','repositionEnemiesByResolution','HEUsi','drawActorClass','_animation','buttonAssistOk','_destroyCanvas','_scene','TLKvO','toString','WIN_OEM_ATTN','oHcWA','DimColor2','bMqjJ','ColorSystem','isPressed','Bitmap_blt','Plus','contentsBack','wholeDuration','ScaleX','_mode','nLpAa','isNwjs','paramMax','loading','ProfileRect','animationBaseDelay','MODECHANGE','_targetX','Game_Map_scrollLeft','createEnemies','Scene_MenuBase_mainAreaTop','Scene_MenuBase_createPageButtons','IkCMy','updateMotion','Show\x20Scrolling\x20Text\x20Script\x20Error','TRG','processTouchModernControls','alpha','equips','getInputButtonString','floor','gameTitle','object','PreserveNumbers','Scene_Map_updateMainMultiply','3245XsRZPr','sparamPlus1','Window_NumberInput_start','scaleX','_targetOffsetX','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','createFauxAnimationSprite','scaleMode','processFauxAnimationRequests','needsUpdate','_pollGamepads','ColSpacing','test','ActorRect','_stored_pendingColor','Scene_Menu_create','DimColor1','checkCoreEngineDisplayCenter','INOUTQUINT','SkillTypeBgType','text','Armor-%1-%2','maxTp','VisuMZ_1_BattleCore','INQUINT','jmZin','scale','length','dOWmN','_list','levelUp','Window_Selectable_cursorUp','WIN_OEM_CUSEL','windowPadding','LvExpGauge','playCursor','Duration','ETB','CustomParamAbb','isBottomHelpMode','DisplayLockX','filter','rightArrowWidth','process_VisuMZ_CoreEngine_jsQuickFunctions','6SsEWRI','Window_Selectable_processTouch','KEEP','processDigitChange','Window_Selectable_itemRect','style','zoomScale','VariableJsBlock','CommandRect','_inputWindow','SuLhU','lCxOe','EISU','ColorTPGauge1','INOUTSINE','default','Rate','Bitmap_strokeRect','AudioChangeBgmVolume','CLEAR','mainAreaHeightSideButtonLayout','HSVep','_offsetX','Untitled','resize','IconSParam9','push','ColorExpGauge2','setupBattleTestItems','TextCodeClassNames','_stored_mpGaugeColor1','helpWindowRect','position','MultiKeyFmt','SceneManager_exit','Sprite_Button_initialize','StatusEquipRect','StatusEquipBgType','drawActorExpGauge','RMref','ModernControls','_troopId','horzJS','picture','MenuBg','PGDN','_closing','goto','ParseArmorNotetags','process_VisuMZ_CoreEngine_RegExp','itemLineRect','number','isLoopVertical','RPGMAKER_VERSION','tsttr','paramFlatJS','gsazu','XNUVY','qJSHc','_onError','initButtonHidden','Scene_Status_create','initCoreEngineScreenShake','Scene_GameEnd_createBackground','isCollidedWithEvents','GRD','BACK_SLASH','isOptionValid','updatePictureAntiZoom','onKeyDownKeysF6F7','ShowButtons','XParamVocab6','EnableJS','ButtonFadeSpeed','NumberBgType','NUMPAD4','ParseItemNotetags','Tilemap_addShadow','fkKTa','drawGameSubtitle','irNKF','Game_Event_isCollidedWithEvents','ListRect','_bitmap','BasicParameterFormula','IconSParam2','KZHbz','VisuMZ_1_OptionsCore','DebugConsoleLastControllerID','sceneTerminationClearEffects','Gold','runCombinedScrollingTextAsCode','%1%2','ayjIJ','RcdIi','isFauxAnimationPlaying','XParamVocab8','rYoNX','SwitchToggleRange','Sprite_AnimationMV_processTimingData','processTimingData','F11','Game_Screen_initialize','_inputString','mute','Wait','setMoveEasingType','ColorPowerDown','padding','process_VisuMZ_CoreEngine_Functions','buttons','<%1\x20%2:[\x20]','OUTBOUNCE','vniuU','index','ImgLoad','subjectHitRate','sparamPlusJS','PictureFilename','UAAuK','ScaleY','_data','createMenuButton','DATABASE','CLOSE_CURLY_BRACKET','zRHGu','TPB\x20ACTIVE','isInstanceOfSceneMap','HELP','updateWaitMode','home','_dimmerSprite','StatusBgType','AudioChangeBgsPitch','_actor','updateDashToggle','mmp','VFIkm','_rate','operation','moveCancelButtonSideButtonLayout','Game_Character_processMoveCommand','endBattlerActions','_addShadow','_stored_ctGaugeColor1','gaugeHeight','Input_updateGamepadState','MDR','BattleManager_checkSubstitute','_currentMap','kHbvd','flush','translucentOpacity','meVolume','ZKNtw','EQUALS','Scene_Battle_createSpriteset','_margin','pop','checkSubstitute','titles1','NUMPAD6','ylFMl','ParseClassNotetags','fxHJM','NewGameCommonEvent','_itemWindow','Skill-%1-%2','TbCKN','VbZnl','onInputOk','win32','playEscape','ItemBgType','MenuLayout','_isButtonHidden','end','ShowItemBackground','clearZoom','exp','maxGold','param','AdFkD','mhp','createFauxAnimation','PERIOD','_context','Bitmap_drawText','fadeSpeed','Igvve','createPointAnimationTargets','vBnrC','dMPEb','CTRL','_makeFontNameText','setAnchor','tcZKC','type','Game_Picture_x','deselect','match','createDigits','gainGold','processEscape','_effectsContainer','_phase','startNormalGame','isTpb','OUTQUAD','xparam','F24','isMaxLevel','updateOpacity','destroyCoreEngineMarkedBitmaps','kLPJQ','changeTextColor','oDCuP','qceCX','juxBk','App','retreat','Smooth','LUK','END','ffkfH','UalBt','Game_Actor_paramBase','HelpRect','mainAreaTop','drawCircle','_scaleX','fCMbq','onerror','_maxDigits','applyCoreEasing','processKeyboardDigitChange','start','paramWidth','WIN_OEM_FINISH','getLastUsedGamepadType','ListBgType','_stored_systemColor','glncC','Game_Actor_levelUp','drawTextTopAligned','STENCIL_TEST','PictureShowIcon','Game_Interpreter_command105','QNlgM','getBattleSystem','Scene_Boot_startNormalGame','VisuMZ_2_BattleSystemPTB','ctGaugeColor2','FontWidthFix','reduce','Game_Map_scrollDown','Game_Interpreter_PluginCommand','DetachMapPictureContainer','innerWidth','drawBackground','movePageButtonSideButtonLayout','Window_NameInput_cursorUp','Bitmap_drawTextOutline','Graphics_printError','exec','_targetOpacity','BgFilename1','PeEkr','AGbzU','maxLvGaugeColor1','ColorNormal','addCommand','Game_BattlerBase_initMembers','openURL','list','URL','parseForcedGameTroopSettingsCoreEngine','HiJrx','playTestF7','centerSprite','playOnceParallelInterpreter','call','usableSkills','nTWiT','_dummyWindow','_anchor','buttonAssistCancel','MIN_SAFE_INTEGER','dgGxE','rIAHZ','qXafo','Scene_Boot_updateDocumentTitle','axes','areTileShadowsHidden','HCsDr','isEnabled','playCursorSound','AutoScrollLockY','81893gjLsjY','terminate','tileWidth','PlzdM','Spriteset_Base_isAnimationPlaying','name','Game_Map_setup','setupRate','fHaik','YQOCU','QUESTION_MARK','IconSParam0','ColorGaugeBack','SnapshotOpacity','AudioChangeBgsPan','aWokY','evaded','EpPQc','updateEffekseer','wlwLm','gduUc','isBottomButtonMode','enemies','ohkvy','CAPSLOCK','GgAZv','xlZJw','left','DOLLAR','alwaysDash','YhgBB','ctrl','AllTroops','_mapNameWindow','Max','updateDocumentTitle','_movementWholeDuration','tpColor','battleSystem','ParseWeaponNotetags','original','drawRightArrow','advanced','setCommonEvent','mHlPp','cursorPagedown','isSmartEventCollisionOn','ZDBaY','evade','PHA','KeyItemProtect','mwZRi','SParamVocab2','_stored_tpGaugeColor1','sparamRateJS','TextStr','sparamRate','DeTrE','VisuMZ_2_BattleSystemETB','ColorManager_loadWindowskin','font','xparamPlus1','fillText','RDzvG','ZERO','currencyUnit','wJhIX','Sprite_AnimationMV_updatePosition','currentLevelExp','ParseStateNotetags','sparamFlat1','_cacheScaleY','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','altKey','isPlaytest','StartID','buttonAssistWindowSideRect','isCursorMovable','stypeId','cos','FKCjH','itemEva','Game_Interpreter_command122','QwertyLayout','backOpacity','responseText','F7key','_shakeDuration','renderNoMask','TitlePicButtons','INOUTELASTIC','windowOpacity','Window_NameInput_processTouch','ParseTilesetNotetags','SParamVocab8','DTB','_baseTexture','LSJaH','nextLevelExp','ItemBackColor2','OkText','BsrLb','removeOnceParallelInterpreter','autoRemovalTiming','format','ScreenResolution','showPointAnimations','process_VisuMZ_CoreEngine_Notetags','Game_Action_numRepeats','GREATER_THAN','VJvdQ','isFullDocumentTitle','currentExp','TmVyA','drawGameTitle','_lastPluginCommandInterpreter','normalColor','etypeId','INBACK','defineProperty','INSINE','textHeight','XParamVocab2','HIT','_backgroundFilter','ActorTPColor','INOUTQUAD','makeCoreEngineCommandList','drawGameVersion','VhRWB','ExportCurMapText','QWzQa','GroupDigits','OPEN_PAREN','INOUTBOUNCE','isEnemy','SideView','_gamepadWait','ExtractStrFromTroop','isAnimationPlaying','maxItems','pixelated','LESS_THAN','isActiveTpb','BoxMargin','centerCameraCheckData','globalAlpha','_shakePower','drawIconBySize','Page','MapNameTextCode','LINEAR','cwiKF','SELECT','TRAIT_PARAM','Linear','DefaultStyle','jAIAB','getControllerInputButtonMatch','TextJS','itemHit','BattleManager_update','wWhHA','_setupEventHandlers','ApplyEasing','makeInputButtonString','isMenuButtonAssistEnabled','dimColor1','buttonY','setSideButtonLayout','Spriteset_Base_updatePosition','kOYXo','exit','CommandList','setSkill','dWjAz','writeFile','isPointAnimationPlaying','openness','PTezO','ONE_MINUS_SRC_ALPHA','WIN_OEM_FJ_MASSHOU','Spriteset_Base_destroy','FDR','IconParam0','guardSkillId','_stored_powerUpColor','STB','createButtonAssistWindow','_opening','_actorWindow','sparamPlus2','DataManager_setupNewGame','BlurFilter','_number','SJSWA','_animationQueue','AutoScrollLockX','BHtyH','xparamPlusJS','EXR','MSWQx','isKeyItem','Window_ShopSell_isEnabled','HASH','buttonAssistKey5','ViqUm','CTRWk','wvhaf','processKeyboardDelete','oPkWu','command122','render','PHlVw','GoldRect','WIN_OEM_FJ_TOUROKU','clearRect','oPSfo','_windowLayer','DrawItemBackgroundJS','isAnimationOffsetXMirrored','_hideButtons','pictures','addLoadListener','startMove','getControllerInputButtonString','vkYEo','onInputBannedWords','center','value','OPEN_BRACKET','loadGameImagesCoreEngine','MRF','_pauseSignSprite','BaseTexture','StatusParamsRect','BannedWords','XGBYe','isMapScrollLinked','Game_Picture_initBasic','resetTextColor','ONTXt','uHtnO','ColorTPGauge2','_stored_mpCostColor','SParamVocab0','_drawTextOutline','Sprite_Battler_startMove','_pagedownButton','damageColor','stringKeyMap','ACCEPT','Window_Base_createTextState','setBackgroundOpacity','displayX','setupValueFont','EnableNumberInput','VisuMZ_2_BattleSystemFTB','option','ValueJS','OUTBACK','RepositionActors','EQUAL','hideButtonFromView','command111','KTwlC','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','members','F16','cSYyG','pagedownShowButton','isSceneMap','PLAY','getCombinedScrollingText','DigitGroupingDamageSprites','buttonAssistKey2','SHIFT','QUOTE','initMembers','xScrollLinkedOffset','_stored_ctGaugeColor2','targets','_balloonQueue','Game_Map_scrollRight','WIN_OEM_AUTO','titleCommandWindow','grdRI','mapId','Scene_Map_update','Game_Interpreter_updateWaitMode','WIN_OEM_FJ_JISHO','AsKNd','Mute','Sprite_Animation_setViewport','PJtjT','cVheb','Keyboard','DummyBgType','hit','_buttonAssistWindow','setColorTone','Game_Picture_show','_forcedTroopView','\x20Origin:\x20%1','PRESERVCONVERSION(%1)','tileHeight','removeAllPointAnimations','doesNameContainBannedWords','lineHeight','_stored_maxLvGaugeColor2','scrollDown','CustomParamType','ForceNoPlayTest','_refreshPauseSign','origin','ParamChange','process_VisuMZ_CoreEngine_Settings','DashToggleR','requestPointAnimation','aOjXX','AutoStretch','data/','applyEasing','updateMain','GFhAS','Color','_skillTypeWindow','F15','Game_Picture_y','show','processHandling','clearCachedKeys','pxeFx','adjustBoxSize','stop','retrieveFauxAnimation','menu','F20','CodeJS','isMaskingEnabled','_pointAnimationSprites','Window_EquipItem_isEnabled','_digitGroupingEx','CoreEngine','targetY','mainCommandWidth','tpCostColor','WIN_OEM_PA3','CxOXC','Game_Temp_initialize','Enemy','_targetOffsetY','waiting','process_VisuMZ_CoreEngine_ControllerButtons','IconSParam1','eaFWP','MMzwE','_startLoading','updateShadow','wiPTP','canUse','return\x200','makeFontSmaller','_hp','_loadingState','_stored_tpGaugeColor2','sparam','buttonAssistOffset4','%1:\x20Exit\x20','ExportAllTroopText','areButtonsHidden','_stored_hpGaugeColor2','MazKN','colSpacing','GoldMax','EndingID','erasePicture','forceStencil','Class-%1-%2','cvsHZ','save','processSoundTimings','buttonAssistText2','isUseModernControls','NEAREST','initVisuMZCoreEngine','processAlwaysEscape','SUBTRACT','WIN_OEM_WSCTRL','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','Bitmap_gradientFillRect','KeyTAB','Scene_Name_create','EXSEL','addEventListener','isRepeated','buttonAssistText4','getBackgroundOpacity','sparamFlatBonus','outlineColorDmg','pSJsg','ARRAYFUNC','Unnamed','SceneManager_isGameActive','targetBackOpacity','_image','isOpen','pThXD','BackOpacity','CONTEXT_MENU','numberShowButton','xparamFlat2','rJqvk','28iXFcWO','WASD','itemBackColor1','addWindow','sellWindowRect','_playTestFastMode','reservePlayTestNewGameCommonEvent','round','getInputMultiButtonStrings','NUMPAD2','ATK','faceWidth','tpGaugeColor2','HANJA','Window_NumberInput_processDigitChange','AnimationID','(\x5cd+)([%％])>','iconWidth','processCursorMoveModernControls','Scene_MenuBase_createCancelButton','Game_BattlerBase_refresh','actorWindowRect','shift','_displayX','QrcQo','application/json','inbounce','defaultInputMode','getColor','getLevel','requestFauxAnimation','FCYqe','windowRect','Game_Picture_scaleX','subject','PTB','pictureId','INSERT','FontSmoothing','volume','Scene_Battle_createCancelButton','note','isActor','ceNFJ','apukm','loadMapData','\x5c}❪TAB❫\x5c{','IconIndex','params','ColorHPGauge2','Map%1.json','onButtonImageLoad','context','_pictureCoordinatesWindow','UqBbX','padZero','Scene_MenuBase_helpAreaTop','ColorDeath','_shakeSpeed','EXCLAMATION','canEquip','join','189WIITHa','prototype','loadWindowskin','_backSprite1','_pictureContainer','_mp','MzUDf','GoldIcon','_statusWindow','isNextScene','JoLnd','BattleManager_processEscape','batch','INOUTCUBIC','meSJq','Actor-%1-%2','YEGiQ','clipboard','endAction','%1〘Choice\x20%2〙\x20%3%1','Bitmap_fillRect','NckyE','_mirror','qsyCE','isAnimationForEach','helpAreaTopSideButtonLayout','Pixelated','EfiMj','split','SParamVocab9','setTargetAnchor','BWFTW','drawNewParam','_screenX','loadSystemImages','none','initCoreEasing','%1〘End\x20Choice\x20Selection〙%1','_menuButton','CtSmp','textBaseline','_coreEasing','VCUAI','oMzNB','performMiss','reserveNewGameCommonEvent','CCLty','active','setLastPluginCommandInterpreter','ARRAYSTRUCT','TranslucentOpacity','GOPcC','_centerCameraCheck','powerUpColor','Scene_Base_createWindowLayer','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','16LQsAGn','Sprite_Picture_loadBitmap','moveRelativeToResolutionChange','1.4.4','ffywy','INOUTQUART','%1/','oZdHr','animationNextDelay','buttonAssistKey%1','forceOutOfPlaytest','MINUS','ParseActorNotetags','STR','TitleCommandList','_storedMapText','alphabetic','ActorMPColor','code','Plus1','Chance','Bitmap_clearRect','FINAL','buttonAssistText3','_coreEasingType','CNT','MEV','attackSkillId','initMembersCoreEngine','MCR','learnings','Exported_Script_%1.txt','ItemMenu','CEV','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','cursorUp','DummyRect','paramBaseAboveLevel99','catchNormalError','setLastGamepadUsed','Window_Base_drawFace','1171702bOWpOM','_pointAnimationQueue','isItemStyle','FUNC','resetBattleSystem','SParamVocab4','GrYcZ','INOUTEXPO','Center','Game_Picture_calcEasing','ConvertNumberToString','bitmapWidth','CTB','_onceParallelInterpreters','onDatabaseLoaded','RequireFocus','SWnpf','playMiss','currentValue','drawGoldItemStyle','toFixed','wait','removeAllFauxAnimations','_targetY','deflate','HelpBgType','text%1','battlebacks1','ALWAYS','FIBUc','_refreshBack','EVhBm','createPointAnimationSprite','calcEasing','filters','EscapeAlways','iexhW','mpYzs','FhMnq','asin','vfjMG','zsKJd','Enemy-%1-%2','wtypeId','description','<JS\x20%1\x20%2:[\x20](.*)>','Window_NameInput_cursorDown','_targetScaleY','itemBackColor2','EnableNameInput','BTestAddedQuantity','KeySHIFT','WIN_OEM_COPY','PositionX','buttonAssistOffset3','updateCoreEasing','jfbLr','ExtDisplayedParams','redraw','Scene_Options_create','ctrlKey','updateScene','Scene_Base_terminate','requestMotion','Input_update','Actor','playBuzzer','scrollUp','AccuracyBoost','isSceneBattle','createTroopNote','AnimationPoint','ijgJW','XParamVocab9','cursorLeft','SParamVocab6','Spriteset_Base_initialize','drawFace','FontSize','IconSParam8','bgLzo','_fauxAnimationSprites','src','PEaSa','LdZqx','paramRate2','duration','waIRz','statusWindowRect','restore','IconSParam3','strokeRect','updateAnchor','setupCoreEngine','_sellWindow','process_VisuMZ_CoreEngine_CustomParameters','BACK_QUOTE','_url','updateOrigin','F13','sv_actors','Scene_Boot_onDatabaseLoaded','subtitle','createTextState','_sideButtonLayout','SubfolderParse','gudPZ','_commandWindow','CRI','eAsmI','darwin','XParamVocab4','_inputSpecialKeyCode','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','F21','targetObjects','_active','paramPlusJS','pnVJq','skillTypes','command355','fFHBY','Game_System_initialize','Window','gold','AntiZoomPictures','WIN_OEM_PA2','Title','BgType','hYjDD','GHClJ','helpAreaBottom','valueOutlineColor','_goldWindow','Window_Gold_refresh','updatePlayTestF7','playTestCtrlT','OUTELASTIC','characters','makeDocumentTitle','title','DSIuM','xparamRateJS','updatePadding','Window_NameInput_processHandling','uQyaU','animationId','adjustPictureAntiZoom','updatePosition','_fauxAnimationQueue','isClosed','0.00','([\x5c+\x5c-]\x5cd+)>','escape','36948PWmIOB','Weapon-%1-%2','_stored_gaugeBackColor','BoKbv','buttonAssistOffset%1','coreEngineRepositionEnemies','bgm','sparamFlat2','exportAllTroopStrings','img/%1/','ocQuA','sqrt','refresh','([\x5c+\x5c-]\x5cd+)([%％])>','SCALE_MODES','ShortcutScripts','updatePositionCoreEngineShakeHorz','contains','ExportCurTroopText','RepositionEnemies','_coreEngineShakeStyle','isHandled','yRvhw','sEwek','updatePositionCoreEngineShakeRand','Window_MapName_refresh','State-%1-%2','DEuRq','_battlerName','PA1','mgdyF','ItemBackColor1','FontShadows','atbActive','numRepeats','_tempActor','AGI','ShopMenu','processMoveCommand','nah','overrideMimeType','fIjRP','CRSEL','lVTXc','expGaugeColor1','Layer','updateData','ALT','UAjcL','gPUnf','sv_enemies','allowShiftScrolling','pan','drawParamText','Sprite_Gauge_gaugeRate','ExtractStrFromMap','Vaiyz','buttonAreaHeight','yJmIZ','backgroundBitmap','Game_Actor_changeClass','min','DisplayedParams','aBzlO','setActorHome','isGameActive','Bitmap_measureTextWidth','outbounce','hasEncryptedImages','_clickHandler','processCursorMove','MAT','jsonToZip','useFontWidthFix','ZcyLa','ONE','Scene_MenuBase_mainAreaHeight','_targetAnchor','platform','Origin','lzblc','printError','drawIcon','mpGaugeColor1','ftwEw','indexOf','_drawTextBody','Game_Picture_scaleY','xIRKE','_scaleY','setValue','OptionsBgType','CzEog','ucbMp','Scene_Map_updateScene','isMagical','hZiHo','blt','processPointAnimationRequests','zpdYs','isTriggered','itemWindowRect','measureText','DOUBLE_QUOTE','repeat','setupFont','onXhrError','BpRNB','_buyWindow','Scene_Skill_create','boxWidth','wfNvO','1.3.0','STENCIL_BUFFER_BIT','hpColor','_index','IconXParam1','stencilFunc','_upArrowSprite','smooth','getCustomBackgroundSettings','BTB','level','CancelText','kbLFW','XParameterFormula','NUM','centerX','SGKau','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','setViewport','CategoryRect','disable','drawCurrentParam','InputRect','isNumpadPressed','ScreenShake','pdXrk','createCancelButton','width','_paramPlus','CrMBf','_editWindow','ParseEnemyNotetags','eqDEB','fillStyle','SParameterFormula','useDigitGrouping','EXITl','isPhysical','Sprite_Animation_processSoundTimings','getButtonAssistLocation','buttonAssistKey3','storeMapData','_CoreEngineSettings','Sprite_destroy','REC','getLastPluginCommandInterpreter','itemPadding','JfhSr','cursorRight','boxHeight','bind','child_process','destroyed','Sprite_Gauge_currentValue','_pictureName','ExtJS','F19','GoldOverlap','drawValue','targetScaleX','toLowerCase','IconXParam2','MAX_SAFE_INTEGER','OutlineColor','_baseSprite','inBattle','_cache','drawBackgroundRect','visible','pageup','wxZpM','STRUCT','Window_Base_drawText','_offsetY','OysFu','Spriteset_Base_update','displayName','MainMenu','normal','FadeSpeed','_statusEquipWindow','drawActorSimpleStatus','checkCacheKey','fillRect','createSpriteset','ujKEY','missed','_changingClass','LEFT','VisuMZ_2_BattleSystemSTB','isNormalPriority','itemSuccessRate','TCR','RegExp','isGamepadConnected','_centerElement','setViewportCoreEngineFix','_categoryWindow','DtydF','expGaugeColor2','yheCQ','ADD','openingSpeed','fqLSX','VOLUME_DOWN','isTouchedInsideFrame','sin','clearOnceParallelInterpreters','VhFbJ','right','Power','scrollRight','Enable','adjustSprite','ExportStrFromAllTroops','KMpCZ','worldTransform','ZTPSi','open','Scene_Base_terminateAnimationClearBugFix','offsetX','IconParam5','OptionsMenu','CreateBattleSystemID','OTB','NumberRect','ATTN','uZebG','uiAreaWidth','actor','nETKD','COMMA','XParamVocab3','NUMPAD0','getGamepads','LoadMenu','CallHandlerJS','zXqlT','updatePositionCoreEngineShakeOriginal','MJull','BattleSystem','paramValueByName','F18','faces','loadBitmap','pFTFb','goldWindowRect','_customModified','moveMenuButtonSideButtonLayout','paramMaxJS','easingType','PGUP','nw.gui','scaleSprite','SaveMenu','string','Total','removeChild','ControllerButtons','_spriteset','isOpenAndActive','events','scaleY','_muteSound','Window_NameInput_refresh','JzdvS','Scene_Battle_createSpriteset_detach','RightMenus','epAEr','CategoryBgType','Subtitle','_cacheScaleX','turn','_hideTileShadows','processKeyboardBackspace','KzpRF','Flat','Scene_Battle_update','parse','ScxxH','Window_Selectable_processCursorMove'];_0x2be0=function(){return _0x30b124;};return _0x2be0();};StorageManager[_0x3a5d8e(0x857)]=function(_0xe41318){return new Promise((_0x4e99d2,_0x136be5)=>{const _0x2e6b24=_0x23aa;try{const _0x45b40d=pako[_0x2e6b24(0x78d)](_0xe41318,{'to':_0x2e6b24(0x91a),'level':0x1});if(_0x45b40d[_0x2e6b24(0x3fe)]>=0xc350){}_0x4e99d2(_0x45b40d);}catch(_0x45b4d6){_0x136be5(_0x45b4d6);}});},TextManager['stringKeyMap']=['','','','CANCEL','','',_0x3a5d8e(0x48f),'',_0x3a5d8e(0x3a6),'TAB','','',_0x3a5d8e(0x422),_0x3a5d8e(0x33b),'ENTER_SPECIAL','',_0x3a5d8e(0x64d),_0x3a5d8e(0x4d0),_0x3a5d8e(0x83e),'PAUSE',_0x3a5d8e(0x551),'KANA',_0x3a5d8e(0x41b),_0x3a5d8e(0x219),_0x3a5d8e(0x762),_0x3a5d8e(0x6e3),'',_0x3a5d8e(0x3a5),'CONVERT',_0x3a5d8e(0x952),_0x3a5d8e(0x634),_0x3a5d8e(0x3d0),'SPACE',_0x3a5d8e(0x916),_0x3a5d8e(0x43c),_0x3a5d8e(0x4ee),_0x3a5d8e(0x2f2),_0x3a5d8e(0x8d7),'UP','RIGHT',_0x3a5d8e(0x98c),_0x3a5d8e(0x5d2),'PRINT','EXECUTE','PRINTSCREEN',_0x3a5d8e(0x6fb),'DELETE','','0','1','2','3','4','5','6','7','8','9','COLON',_0x3a5d8e(0x2d5),_0x3a5d8e(0x5c7),_0x3a5d8e(0x4aa),_0x3a5d8e(0x5a6),_0x3a5d8e(0x543),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0x3a5d8e(0x6d2),'','SLEEP',_0x3a5d8e(0x904),'NUMPAD1',_0x3a5d8e(0x6df),'NUMPAD3',_0x3a5d8e(0x45a),_0x3a5d8e(0x220),_0x3a5d8e(0x4b0),_0x3a5d8e(0x98f),'NUMPAD8','NUMPAD9',_0x3a5d8e(0x9b7),_0x3a5d8e(0x8e4),'SEPARATOR',_0x3a5d8e(0x6bc),_0x3a5d8e(0x382),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x3a5d8e(0x368),_0x3a5d8e(0x474),'F12',_0x3a5d8e(0x7d8),'F14',_0x3a5d8e(0x680),_0x3a5d8e(0x645),_0x3a5d8e(0x394),_0x3a5d8e(0x90d),_0x3a5d8e(0x8b7),_0x3a5d8e(0x68a),_0x3a5d8e(0x7e7),_0x3a5d8e(0x351),_0x3a5d8e(0x257),_0x3a5d8e(0x4e1),'','','','','','','','','NUM_LOCK','SCROLL_LOCK',_0x3a5d8e(0x65b),_0x3a5d8e(0x5ee),_0x3a5d8e(0x610),_0x3a5d8e(0x1eb),_0x3a5d8e(0x1a9),'','','','','','','','','',_0x3a5d8e(0x16c),_0x3a5d8e(0x711),_0x3a5d8e(0x876),_0x3a5d8e(0x605),_0x3a5d8e(0x555),_0x3a5d8e(0x168),'AMPERSAND','UNDERSCORE',_0x3a5d8e(0x5be),'CLOSE_PAREN','ASTERISK','PLUS',_0x3a5d8e(0x1b0),'HYPHEN_MINUS',_0x3a5d8e(0x254),_0x3a5d8e(0x48b),'TILDE','','','','',_0x3a5d8e(0x296),_0x3a5d8e(0x8e7),'VOLUME_UP','','',_0x3a5d8e(0x2d5),_0x3a5d8e(0x4aa),_0x3a5d8e(0x902),_0x3a5d8e(0x757),_0x3a5d8e(0x4c8),'SLASH',_0x3a5d8e(0x7d5),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x3a5d8e(0x61f),_0x3a5d8e(0x451),'CLOSE_BRACKET',_0x3a5d8e(0x64e),'','META',_0x3a5d8e(0x94f),'','WIN_ICO_HELP','WIN_ICO_00','','WIN_ICO_CLEAR','','',_0x3a5d8e(0x201),_0x3a5d8e(0x28d),_0x3a5d8e(0x974),_0x3a5d8e(0x7f3),_0x3a5d8e(0x694),_0x3a5d8e(0x6bd),_0x3a5d8e(0x403),_0x3a5d8e(0x3be),_0x3a5d8e(0x4fd),_0x3a5d8e(0x7a9),_0x3a5d8e(0x655),'WIN_OEM_ENLW','WIN_OEM_BACKTAB',_0x3a5d8e(0x8fd),_0x3a5d8e(0x839),_0x3a5d8e(0x6c2),_0x3a5d8e(0x1cc),_0x3a5d8e(0x649),_0x3a5d8e(0x1c9),'',_0x3a5d8e(0x82c),_0x3a5d8e(0x1ab),''],TextManager[_0x3a5d8e(0x3b9)]=VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x227)][_0x3a5d8e(0x947)][_0x3a5d8e(0x59d)],TextManager[_0x3a5d8e(0x52d)]=VisuMZ[_0x3a5d8e(0x690)]['Settings']['ButtonAssist'][_0x3a5d8e(0x88a)],TextManager[_0x3a5d8e(0x35d)]=VisuMZ['CoreEngine'][_0x3a5d8e(0x227)][_0x3a5d8e(0x947)][_0x3a5d8e(0x1df)],VisuMZ[_0x3a5d8e(0x690)]['TextManager_param']=TextManager[_0x3a5d8e(0x4c4)],TextManager['param']=function(_0x2e4085){const _0x2b2b57=_0x3a5d8e;if(typeof _0x2e4085===_0x2b2b57(0x442))return VisuMZ[_0x2b2b57(0x690)][_0x2b2b57(0x395)]['call'](this,_0x2e4085);else{if(_0x2b2b57(0x34f)===_0x2b2b57(0x530)){_0x3dab93['ConvertParams'](_0x4d6792,_0x1182e8);const _0x171e66=_0x33abdd[_0x2b2b57(0x6dd)](_0x418e29[_0x2b2b57(0x6fd)])['clamp'](0x0,0x64),_0x5eb611=_0x52f5f5['_currentBgs'];_0x5eb611&&(_0x5eb611[_0x2b2b57(0x6fd)]=_0x171e66,_0x3b7182[_0x2b2b57(0x30e)](_0x5eb611));}else return this[_0x2b2b57(0x33c)](_0x2e4085);}},TextManager['paramName']=function(_0x38ab2e){const _0x2a63f3=_0x3a5d8e;_0x38ab2e=String(_0x38ab2e||'')[_0x2a63f3(0x987)]();const _0xf09ca=VisuMZ[_0x2a63f3(0x690)][_0x2a63f3(0x227)][_0x2a63f3(0x2fe)];if(_0x38ab2e===_0x2a63f3(0x188))return $dataSystem[_0x2a63f3(0x157)][_0x2a63f3(0x706)][0x0];if(_0x38ab2e===_0x2a63f3(0x229))return $dataSystem[_0x2a63f3(0x157)][_0x2a63f3(0x706)][0x1];if(_0x38ab2e===_0x2a63f3(0x6e0))return $dataSystem['terms']['params'][0x2];if(_0x38ab2e===_0x2a63f3(0x977))return $dataSystem['terms'][_0x2a63f3(0x706)][0x3];if(_0x38ab2e===_0x2a63f3(0x856))return $dataSystem[_0x2a63f3(0x157)][_0x2a63f3(0x706)][0x4];if(_0x38ab2e===_0x2a63f3(0x97c))return $dataSystem['terms']['params'][0x5];if(_0x38ab2e==='AGI')return $dataSystem[_0x2a63f3(0x157)][_0x2a63f3(0x706)][0x6];if(_0x38ab2e==='LUK')return $dataSystem[_0x2a63f3(0x157)]['params'][0x7];if(_0x38ab2e==='HIT')return _0xf09ca[_0x2a63f3(0x377)];if(_0x38ab2e===_0x2a63f3(0x27d))return _0xf09ca['XParamVocab1'];if(_0x38ab2e==='CRI')return _0xf09ca[_0x2a63f3(0x5b3)];if(_0x38ab2e==='CEV')return _0xf09ca[_0x2a63f3(0x903)];if(_0x38ab2e==='MEV')return _0xf09ca[_0x2a63f3(0x7e4)];if(_0x38ab2e===_0x2a63f3(0x621))return _0xf09ca['XParamVocab5'];if(_0x38ab2e===_0x2a63f3(0x765))return _0xf09ca[_0x2a63f3(0x456)];if(_0x38ab2e===_0x2a63f3(0x245))return _0xf09ca[_0x2a63f3(0x2e0)];if(_0x38ab2e==='MRG')return _0xf09ca[_0x2a63f3(0x46f)];if(_0x38ab2e===_0x2a63f3(0x3d9))return _0xf09ca[_0x2a63f3(0x7be)];if(_0x38ab2e==='TGR')return _0xf09ca[_0x2a63f3(0x62e)];if(_0x38ab2e===_0x2a63f3(0x450))return _0xf09ca['SParamVocab1'];if(_0x38ab2e===_0x2a63f3(0x8ab))return _0xf09ca[_0x2a63f3(0x56d)];if(_0x38ab2e===_0x2a63f3(0x56a))return _0xf09ca['SParamVocab3'];if(_0x38ab2e===_0x2a63f3(0x769))return _0xf09ca[_0x2a63f3(0x77a)];if(_0x38ab2e==='TCR')return _0xf09ca[_0x2a63f3(0x37c)];if(_0x38ab2e===_0x2a63f3(0x1de))return _0xf09ca[_0x2a63f3(0x7c0)];if(_0x38ab2e===_0x2a63f3(0x4a2))return _0xf09ca[_0x2a63f3(0x9a4)];if(_0x38ab2e===_0x2a63f3(0x5f0))return _0xf09ca[_0x2a63f3(0x597)];if(_0x38ab2e===_0x2a63f3(0x601))return _0xf09ca[_0x2a63f3(0x731)];if(VisuMZ[_0x2a63f3(0x690)][_0x2a63f3(0x2f5)][_0x38ab2e]){if(_0x2a63f3(0x524)!==_0x2a63f3(0x36d))return VisuMZ[_0x2a63f3(0x690)][_0x2a63f3(0x2f5)][_0x38ab2e];else _0x5802da['prototype'][_0x2a63f3(0x855)][_0x2a63f3(0x528)](this);}return'';},TextManager['getInputButtonString']=function(_0x27ec8){const _0x7751c0=_0x3a5d8e,_0x25063a=Input['getLastUsedGamepadType']();return _0x25063a===_0x7751c0(0x661)?this['getKeyboardInputButtonString'](_0x27ec8):'RvmID'===_0x7751c0(0x312)?this[_0x7751c0(0x61a)](_0x25063a,_0x27ec8):![];},TextManager[_0x3a5d8e(0x315)]=function(_0x3a439f){const _0x328e8c=_0x3a5d8e;if(_0x3a439f==='cancel')_0x3a439f=_0x328e8c(0x80e);if(_0x3a439f==='menu')_0x3a439f=_0x328e8c(0x80e);let _0x2062f1=[];for(let _0x2e1ffe in Input[_0x328e8c(0x98b)]){if(_0x328e8c(0x3ff)===_0x328e8c(0x84e))this['_centerCameraCheck'][_0x328e8c(0x2ed)]=!![],this[_0x328e8c(0x748)][_0x328e8c(0x27f)]=_0x2bb4e8[_0x328e8c(0x279)]||0x0;else{_0x2e1ffe=Number(_0x2e1ffe);if(_0x2e1ffe>=0x60&&_0x2e1ffe<=0x69)continue;if([0x12,0x20]['includes'](_0x2e1ffe))continue;_0x3a439f===Input[_0x328e8c(0x98b)][_0x2e1ffe]&&(_0x328e8c(0x1a2)!==_0x328e8c(0x1a2)?this[_0x328e8c(0x957)]=_0x328e8c(0x888):_0x2062f1[_0x328e8c(0x429)](_0x2e1ffe));}}for(let _0x31bb52=0x0;_0x31bb52<_0x2062f1[_0x328e8c(0x3fe)];_0x31bb52++){_0x2062f1[_0x31bb52]=TextManager[_0x328e8c(0x633)][_0x2062f1[_0x31bb52]];}return this[_0x328e8c(0x5de)](_0x2062f1);},TextManager[_0x3a5d8e(0x5de)]=function(_0x52017a){const _0x452c72=_0x3a5d8e,_0xb40500=VisuMZ[_0x452c72(0x690)][_0x452c72(0x227)][_0x452c72(0x947)],_0x1b0de5=_0xb40500[_0x452c72(0x248)],_0x55dabf=_0x52017a[_0x452c72(0x4ad)](),_0xd10bf2=_0x452c72(0x210)['format'](_0x55dabf);return _0xb40500[_0xd10bf2]?_0xb40500[_0xd10bf2]:_0x1b0de5[_0x452c72(0x5a1)](_0x55dabf);},TextManager['getInputMultiButtonStrings']=function(_0x301dd0,_0x1eeb12){const _0x5e015b=_0x3a5d8e,_0x2c5aff=VisuMZ[_0x5e015b(0x690)]['Settings']['ButtonAssist'],_0x5ad1d5=_0x2c5aff[_0x5e015b(0x430)],_0x190d65=this['getInputButtonString'](_0x301dd0),_0x4f9afc=this[_0x5e015b(0x3dd)](_0x1eeb12);return _0x5ad1d5[_0x5e015b(0x5a1)](_0x190d65,_0x4f9afc);},TextManager[_0x3a5d8e(0x61a)]=function(_0x37bdc8,_0x1af0b3){const _0x126b68=_0x3a5d8e,_0x38e2ac=_0x37bdc8[_0x126b68(0x8bb)]()[_0x126b68(0x3ab)](),_0x3a6b23=VisuMZ['CoreEngine']['ControllerButtons'][_0x38e2ac];if(!_0x3a6b23)return this[_0x126b68(0x5d7)](_0x37bdc8,_0x1af0b3);return _0x3a6b23[_0x1af0b3]||this[_0x126b68(0x315)](_0x37bdc8,_0x1af0b3);},TextManager[_0x3a5d8e(0x5d7)]=function(_0x342cbb,_0x302ed5){const _0x18548c=_0x3a5d8e,_0x41700e=_0x342cbb[_0x18548c(0x8bb)]()['trim']();for(const _0x531654 in VisuMZ['CoreEngine']['ControllerMatches']){if(_0x41700e[_0x18548c(0x2c6)](_0x531654)){const _0x53af07=VisuMZ[_0x18548c(0x690)]['ControllerMatches'][_0x531654],_0x44c323=VisuMZ[_0x18548c(0x690)][_0x18548c(0x91d)][_0x53af07];return _0x44c323[_0x302ed5]||this['getKeyboardInputButtonString'](_0x302ed5);}}return this['getKeyboardInputButtonString'](_0x302ed5);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x574)]=ColorManager[_0x3a5d8e(0x716)],ColorManager['loadWindowskin']=function(){const _0x41afab=_0x3a5d8e;VisuMZ[_0x41afab(0x690)][_0x41afab(0x574)]['call'](this),this['_colorCache']=this[_0x41afab(0x286)]||{};},ColorManager[_0x3a5d8e(0x2d6)]=function(_0x393adf,_0x28311c){const _0x3c94af=_0x3a5d8e;return _0x28311c=String(_0x28311c),this['_colorCache']=this['_colorCache']||{},_0x28311c[_0x3c94af(0x4d7)](/#(.*)/i)?this[_0x3c94af(0x286)][_0x393adf]=_0x3c94af(0x1f9)[_0x3c94af(0x5a1)](String(RegExp['$1'])):this[_0x3c94af(0x286)][_0x393adf]=this[_0x3c94af(0x38c)](Number(_0x28311c)),this[_0x3c94af(0x286)][_0x393adf];},ColorManager[_0x3a5d8e(0x6f2)]=function(_0x176615){const _0x306414=_0x3a5d8e;return _0x176615=String(_0x176615),_0x176615[_0x306414(0x4d7)](/#(.*)/i)?_0x306414(0x7ee)==='fFHBY'?_0x306414(0x1f9)[_0x306414(0x5a1)](String(RegExp['$1'])):0x0:_0x306414(0x8ae)==='JfhSr'?this['textColor'](Number(_0x176615)):_0x5d9a08[_0x306414(0x998)]['HelpRect'][_0x306414(0x528)](this);},ColorManager[_0x3a5d8e(0x684)]=function(){const _0x356662=_0x3a5d8e;this[_0x356662(0x286)]={};},ColorManager[_0x3a5d8e(0x5ad)]=function(){const _0x3b9d03=_0x3a5d8e,_0x57fce2='_stored_normalColor';this[_0x3b9d03(0x286)]=this[_0x3b9d03(0x286)]||{};if(this[_0x3b9d03(0x286)][_0x57fce2])return this[_0x3b9d03(0x286)][_0x57fce2];const _0x126f33=VisuMZ[_0x3b9d03(0x690)][_0x3b9d03(0x227)][_0x3b9d03(0x67e)][_0x3b9d03(0x51d)];return this[_0x3b9d03(0x2d6)](_0x57fce2,_0x126f33);},ColorManager[_0x3a5d8e(0x9b1)]=function(){const _0x3aea4d=_0x3a5d8e,_0x11c1d7=_0x3aea4d(0x500);this[_0x3aea4d(0x286)]=this[_0x3aea4d(0x286)]||{};if(this[_0x3aea4d(0x286)][_0x11c1d7])return this[_0x3aea4d(0x286)][_0x11c1d7];const _0x29f205=VisuMZ[_0x3aea4d(0x690)][_0x3aea4d(0x227)][_0x3aea4d(0x67e)][_0x3aea4d(0x3c2)];return this[_0x3aea4d(0x2d6)](_0x11c1d7,_0x29f205);},ColorManager[_0x3a5d8e(0x35b)]=function(){const _0x24b58e=_0x3a5d8e,_0x96832d=_0x24b58e(0x2a3);this[_0x24b58e(0x286)]=this[_0x24b58e(0x286)]||{};if(this['_colorCache'][_0x96832d])return this[_0x24b58e(0x286)][_0x96832d];const _0x462d50=VisuMZ['CoreEngine'][_0x24b58e(0x227)][_0x24b58e(0x67e)][_0x24b58e(0x2f0)];return this['getColorDataFromPluginParameters'](_0x96832d,_0x462d50);},ColorManager['deathColor']=function(){const _0x3e2d01=_0x3a5d8e,_0x97191a=_0x3e2d01(0x1f2);this[_0x3e2d01(0x286)]=this[_0x3e2d01(0x286)]||{};if(this['_colorCache'][_0x97191a])return this['_colorCache'][_0x97191a];const _0x1436ca=VisuMZ[_0x3e2d01(0x690)][_0x3e2d01(0x227)]['Color'][_0x3e2d01(0x70f)];return this['getColorDataFromPluginParameters'](_0x97191a,_0x1436ca);},ColorManager[_0x3a5d8e(0x96e)]=function(){const _0x229544=_0x3a5d8e,_0x43da4a=_0x229544(0x811);this[_0x229544(0x286)]=this[_0x229544(0x286)]||{};if(this[_0x229544(0x286)][_0x43da4a])return this['_colorCache'][_0x43da4a];const _0x223a07=VisuMZ['CoreEngine'][_0x229544(0x227)][_0x229544(0x67e)][_0x229544(0x545)];return this[_0x229544(0x2d6)](_0x43da4a,_0x223a07);},ColorManager[_0x3a5d8e(0x26d)]=function(){const _0xb10f95=_0x3a5d8e,_0x15c131=_0xb10f95(0x1f6);this[_0xb10f95(0x286)]=this[_0xb10f95(0x286)]||{};if(this[_0xb10f95(0x286)][_0x15c131])return this['_colorCache'][_0x15c131];const _0x4e3041=VisuMZ[_0xb10f95(0x690)][_0xb10f95(0x227)]['Color']['ColorHPGauge1'];return this[_0xb10f95(0x2d6)](_0x15c131,_0x4e3041);},ColorManager[_0x3a5d8e(0x33e)]=function(){const _0x56d338=_0x3a5d8e,_0x3e3afc=_0x56d338(0x6ac);this[_0x56d338(0x286)]=this[_0x56d338(0x286)]||{};if(this[_0x56d338(0x286)][_0x3e3afc])return this['_colorCache'][_0x3e3afc];const _0x47cc49=VisuMZ[_0x56d338(0x690)]['Settings'][_0x56d338(0x67e)][_0x56d338(0x707)];return this[_0x56d338(0x2d6)](_0x3e3afc,_0x47cc49);},ColorManager[_0x3a5d8e(0x862)]=function(){const _0x1dad16=_0x3a5d8e,_0x270a5b=_0x1dad16(0x42d);this[_0x1dad16(0x286)]=this[_0x1dad16(0x286)]||{};if(this['_colorCache'][_0x270a5b])return this['_colorCache'][_0x270a5b];const _0x4efe29=VisuMZ[_0x1dad16(0x690)][_0x1dad16(0x227)][_0x1dad16(0x67e)][_0x1dad16(0x214)];return this[_0x1dad16(0x2d6)](_0x270a5b,_0x4efe29);},ColorManager[_0x3a5d8e(0x244)]=function(){const _0x4aa1ec=_0x3a5d8e,_0x14944e='_stored_mpGaugeColor2';this[_0x4aa1ec(0x286)]=this[_0x4aa1ec(0x286)]||{};if(this[_0x4aa1ec(0x286)][_0x14944e])return this[_0x4aa1ec(0x286)][_0x14944e];const _0x58528f=VisuMZ[_0x4aa1ec(0x690)][_0x4aa1ec(0x227)][_0x4aa1ec(0x67e)]['ColorMPGauge2'];return this[_0x4aa1ec(0x2d6)](_0x14944e,_0x58528f);},ColorManager['mpCostColor']=function(){const _0x3e5e26=_0x3a5d8e,_0x4e678d=_0x3e5e26(0x62d);this[_0x3e5e26(0x286)]=this[_0x3e5e26(0x286)]||{};if(this['_colorCache'][_0x4e678d])return this[_0x3e5e26(0x286)][_0x4e678d];const _0x72e818=VisuMZ[_0x3e5e26(0x690)][_0x3e5e26(0x227)][_0x3e5e26(0x67e)]['ColorMPCost'];return this[_0x3e5e26(0x2d6)](_0x4e678d,_0x72e818);},ColorManager[_0x3a5d8e(0x749)]=function(){const _0x56ffd9=_0x3a5d8e,_0x1e65e3='_stored_powerUpColor';this[_0x56ffd9(0x286)]=this['_colorCache']||{};if(this['_colorCache'][_0x1e65e3])return this[_0x56ffd9(0x286)][_0x1e65e3];const _0x52f1ee=VisuMZ['CoreEngine'][_0x56ffd9(0x227)][_0x56ffd9(0x67e)]['ColorPowerUp'];return this[_0x56ffd9(0x2d6)](_0x1e65e3,_0x52f1ee);},ColorManager['powerDownColor']=function(){const _0x1e5eff=_0x3a5d8e,_0x281fe8=_0x1e5eff(0x224);this[_0x1e5eff(0x286)]=this[_0x1e5eff(0x286)]||{};if(this[_0x1e5eff(0x286)][_0x281fe8])return this[_0x1e5eff(0x286)][_0x281fe8];const _0x431efc=VisuMZ[_0x1e5eff(0x690)][_0x1e5eff(0x227)][_0x1e5eff(0x67e)][_0x1e5eff(0x47a)];return this[_0x1e5eff(0x2d6)](_0x281fe8,_0x431efc);},ColorManager[_0x3a5d8e(0x99f)]=function(){const _0x8c0e09=_0x3a5d8e,_0x1eaea8=_0x8c0e09(0x49f);this[_0x8c0e09(0x286)]=this[_0x8c0e09(0x286)]||{};if(this['_colorCache'][_0x1eaea8])return this[_0x8c0e09(0x286)][_0x1eaea8];const _0x421a9d=VisuMZ[_0x8c0e09(0x690)][_0x8c0e09(0x227)][_0x8c0e09(0x67e)][_0x8c0e09(0x38a)];return this[_0x8c0e09(0x2d6)](_0x1eaea8,_0x421a9d);},ColorManager[_0x3a5d8e(0x50b)]=function(){const _0x18ac8a=_0x3a5d8e,_0x4406ff=_0x18ac8a(0x651);this[_0x18ac8a(0x286)]=this[_0x18ac8a(0x286)]||{};if(this[_0x18ac8a(0x286)][_0x4406ff])return this[_0x18ac8a(0x286)][_0x4406ff];const _0x59cfc4=VisuMZ['CoreEngine'][_0x18ac8a(0x227)][_0x18ac8a(0x67e)]['ColorCTGauge2'];return this['getColorDataFromPluginParameters'](_0x4406ff,_0x59cfc4);},ColorManager[_0x3a5d8e(0x15c)]=function(){const _0x4af782=_0x3a5d8e,_0x155008='_stored_tpGaugeColor1';this[_0x4af782(0x286)]=this[_0x4af782(0x286)]||{};if(this['_colorCache'][_0x155008])return this[_0x4af782(0x286)][_0x155008];const _0x3c917c=VisuMZ['CoreEngine'][_0x4af782(0x227)][_0x4af782(0x67e)]['ColorTPGauge1'];return this[_0x4af782(0x2d6)](_0x155008,_0x3c917c);},ColorManager[_0x3a5d8e(0x6e2)]=function(){const _0x103bdd=_0x3a5d8e,_0x1ba739=_0x103bdd(0x6a6);this[_0x103bdd(0x286)]=this[_0x103bdd(0x286)]||{};if(this[_0x103bdd(0x286)][_0x1ba739])return this['_colorCache'][_0x1ba739];const _0x1ee6a2=VisuMZ[_0x103bdd(0x690)]['Settings'][_0x103bdd(0x67e)][_0x103bdd(0x62c)];return this[_0x103bdd(0x2d6)](_0x1ba739,_0x1ee6a2);},ColorManager[_0x3a5d8e(0x693)]=function(){const _0x1f2e61=_0x3a5d8e,_0x4ada89='_stored_tpCostColor';this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x4ada89])return this[_0x1f2e61(0x286)][_0x4ada89];const _0x52ca63=VisuMZ[_0x1f2e61(0x690)]['Settings']['Color'][_0x1f2e61(0x1ee)];return this[_0x1f2e61(0x2d6)](_0x4ada89,_0x52ca63);},ColorManager[_0x3a5d8e(0x284)]=function(){const _0x5a2605=_0x3a5d8e,_0x358522=_0x5a2605(0x3f1);this[_0x5a2605(0x286)]=this[_0x5a2605(0x286)]||{};if(this[_0x5a2605(0x286)][_0x358522])return this[_0x5a2605(0x286)][_0x358522];const _0x2d2e34=VisuMZ[_0x5a2605(0x690)][_0x5a2605(0x227)][_0x5a2605(0x67e)][_0x5a2605(0x1ee)];return this[_0x5a2605(0x2d6)](_0x358522,_0x2d2e34);},ColorManager[_0x3a5d8e(0x83b)]=function(){const _0x2965e7=_0x3a5d8e,_0xffaf07=_0x2965e7(0x26a);this[_0x2965e7(0x286)]=this['_colorCache']||{};if(this['_colorCache'][_0xffaf07])return this[_0x2965e7(0x286)][_0xffaf07];const _0x502cf0=VisuMZ[_0x2965e7(0x690)][_0x2965e7(0x227)][_0x2965e7(0x67e)]['ColorExpGauge1'];return this['getColorDataFromPluginParameters'](_0xffaf07,_0x502cf0);},ColorManager[_0x3a5d8e(0x8e2)]=function(){const _0x57f5bf=_0x3a5d8e,_0x227995='_stored_expGaugeColor2';this[_0x57f5bf(0x286)]=this['_colorCache']||{};if(this[_0x57f5bf(0x286)][_0x227995])return this[_0x57f5bf(0x286)][_0x227995];const _0x3177b6=VisuMZ['CoreEngine']['Settings'][_0x57f5bf(0x67e)][_0x57f5bf(0x42a)];return this[_0x57f5bf(0x2d6)](_0x227995,_0x3177b6);},ColorManager[_0x3a5d8e(0x51c)]=function(){const _0x27c05d=_0x3a5d8e,_0x33adad=_0x27c05d(0x375);this[_0x27c05d(0x286)]=this[_0x27c05d(0x286)]||{};if(this[_0x27c05d(0x286)][_0x33adad])return this[_0x27c05d(0x286)][_0x33adad];const _0x590f56=VisuMZ['CoreEngine'][_0x27c05d(0x227)][_0x27c05d(0x67e)]['ColorMaxLvGauge1'];return this['getColorDataFromPluginParameters'](_0x33adad,_0x590f56);},ColorManager['maxLvGaugeColor2']=function(){const _0xc7a825=_0x3a5d8e,_0x5f57d9='_stored_maxLvGaugeColor2';this[_0xc7a825(0x286)]=this[_0xc7a825(0x286)]||{};if(this['_colorCache'][_0x5f57d9])return this[_0xc7a825(0x286)][_0x5f57d9];const _0x1733d3=VisuMZ[_0xc7a825(0x690)][_0xc7a825(0x227)]['Color'][_0xc7a825(0x9b9)];return this[_0xc7a825(0x2d6)](_0x5f57d9,_0x1733d3);},ColorManager[_0x3a5d8e(0x881)]=function(_0x45a198){const _0x4b211b=_0x3a5d8e;return VisuMZ[_0x4b211b(0x690)][_0x4b211b(0x227)][_0x4b211b(0x67e)][_0x4b211b(0x15e)][_0x4b211b(0x528)](this,_0x45a198);},ColorManager['mpColor']=function(_0x1adf70){const _0x5f0e76=_0x3a5d8e;return VisuMZ['CoreEngine'][_0x5f0e76(0x227)][_0x5f0e76(0x67e)][_0x5f0e76(0x75d)][_0x5f0e76(0x528)](this,_0x1adf70);},ColorManager[_0x3a5d8e(0x55e)]=function(_0x426d90){const _0x11b0b3=_0x3a5d8e;return VisuMZ[_0x11b0b3(0x690)][_0x11b0b3(0x227)][_0x11b0b3(0x67e)][_0x11b0b3(0x5b6)][_0x11b0b3(0x528)](this,_0x426d90);},ColorManager[_0x3a5d8e(0x3a2)]=function(_0x252a84){const _0x22da4d=_0x3a5d8e;return VisuMZ['CoreEngine'][_0x22da4d(0x227)][_0x22da4d(0x67e)][_0x22da4d(0x674)]['call'](this,_0x252a84);},ColorManager[_0x3a5d8e(0x632)]=function(_0x1af1c0){const _0x28d283=_0x3a5d8e;return VisuMZ[_0x28d283(0x690)]['Settings'][_0x28d283(0x67e)][_0x28d283(0x310)]['call'](this,_0x1af1c0);},ColorManager['outlineColor']=function(){const _0x19bedf=_0x3a5d8e;return VisuMZ[_0x19bedf(0x690)][_0x19bedf(0x227)]['Color'][_0x19bedf(0x8be)];},ColorManager[_0x3a5d8e(0x6c8)]=function(){const _0x158b66=_0x3a5d8e;return VisuMZ[_0x158b66(0x690)][_0x158b66(0x227)]['Color'][_0x158b66(0x9a1)]||_0x158b66(0x14c);},ColorManager[_0x3a5d8e(0x9b8)]=function(){const _0x21990d=_0x3a5d8e;return VisuMZ[_0x21990d(0x690)][_0x21990d(0x227)][_0x21990d(0x67e)][_0x21990d(0x2ce)]||'rgba(0,\x200,\x200,\x201.0)';},ColorManager[_0x3a5d8e(0x5e0)]=function(){const _0x51eb66=_0x3a5d8e;return VisuMZ[_0x51eb66(0x690)][_0x51eb66(0x227)][_0x51eb66(0x67e)][_0x51eb66(0x3f3)];},ColorManager[_0x3a5d8e(0x198)]=function(){const _0x26f696=_0x3a5d8e;return VisuMZ[_0x26f696(0x690)][_0x26f696(0x227)][_0x26f696(0x67e)][_0x26f696(0x3c0)];},ColorManager[_0x3a5d8e(0x6d8)]=function(){const _0x2e082d=_0x3a5d8e;return VisuMZ[_0x2e082d(0x690)][_0x2e082d(0x227)][_0x2e082d(0x67e)][_0x2e082d(0x82e)];},ColorManager[_0x3a5d8e(0x7a5)]=function(){const _0x45713d=_0x3a5d8e;return VisuMZ[_0x45713d(0x690)][_0x45713d(0x227)]['Color'][_0x45713d(0x59c)];},SceneManager[_0x3a5d8e(0x2b7)]=[],SceneManager['isSceneBattle']=function(){const _0x50fc7b=_0x3a5d8e;return this[_0x50fc7b(0x3bb)]&&this[_0x50fc7b(0x3bb)][_0x50fc7b(0x2cd)]===Scene_Battle;},SceneManager[_0x3a5d8e(0x648)]=function(){const _0x4a39ea=_0x3a5d8e;return this['_scene']&&this[_0x4a39ea(0x3bb)][_0x4a39ea(0x2cd)]===Scene_Map;},SceneManager[_0x3a5d8e(0x48e)]=function(){const _0x4f4c47=_0x3a5d8e;return this[_0x4f4c47(0x3bb)]&&this['_scene']instanceof Scene_Map;},VisuMZ['CoreEngine'][_0x3a5d8e(0x258)]=SceneManager[_0x3a5d8e(0x36e)],SceneManager[_0x3a5d8e(0x36e)]=function(){const _0x4749c5=_0x3a5d8e;VisuMZ['CoreEngine'][_0x4749c5(0x258)][_0x4749c5(0x528)](this),this[_0x4749c5(0x6ba)]();},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x31c)]=SceneManager['onKeyDown'],SceneManager['onKeyDown']=function(_0x3d4021){const _0x8257c4=_0x3a5d8e;if($gameTemp)this[_0x8257c4(0x454)](_0x3d4021);VisuMZ[_0x8257c4(0x690)][_0x8257c4(0x31c)][_0x8257c4(0x528)](this,_0x3d4021);},SceneManager[_0x3a5d8e(0x454)]=function(_0x32933c){const _0x280d6c=_0x3a5d8e;if(!_0x32933c[_0x280d6c(0x7b1)]&&!_0x32933c[_0x280d6c(0x582)])switch(_0x32933c[_0x280d6c(0x173)]){case 0x54:this['playTestCtrlT']();break;case 0x75:this['playTestF6']();break;case 0x76:if(Input['isPressed']('shift')||Input['isPressed'](_0x280d6c(0x558)))return;this[_0x280d6c(0x525)]();break;}},SceneManager[_0x3a5d8e(0x95a)]=function(){const _0x1e627e=_0x3a5d8e;if($gameTemp[_0x1e627e(0x583)]()&&VisuMZ[_0x1e627e(0x690)][_0x1e627e(0x227)]['QoL'][_0x1e627e(0x23d)]){ConfigManager[_0x1e627e(0x2a1)]!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0x1e627e(0x31a)]=0x0,ConfigManager['meVolume']=0x0,ConfigManager[_0x1e627e(0x2a1)]=0x0):(ConfigManager[_0x1e627e(0x37a)]=0x64,ConfigManager[_0x1e627e(0x31a)]=0x64,ConfigManager[_0x1e627e(0x4a8)]=0x64,ConfigManager[_0x1e627e(0x2a1)]=0x64);ConfigManager[_0x1e627e(0x6b5)]();if(this['_scene'][_0x1e627e(0x2cd)]===Scene_Options){if(this['_scene'][_0x1e627e(0x968)])this['_scene']['_optionsWindow'][_0x1e627e(0x81b)]();if(this[_0x1e627e(0x3bb)]['_listWindow'])this[_0x1e627e(0x3bb)][_0x1e627e(0x346)][_0x1e627e(0x81b)]();}}},SceneManager[_0x3a5d8e(0x525)]=function(){const _0x470c85=_0x3a5d8e;$gameTemp[_0x470c85(0x583)]()&&VisuMZ[_0x470c85(0x690)][_0x470c85(0x227)]['QoL']['F7key']&&($gameTemp[_0x470c85(0x6db)]=!$gameTemp[_0x470c85(0x6db)]);},SceneManager[_0x3a5d8e(0x7fd)]=function(){const _0x458c93=_0x3a5d8e;if(!$gameTemp[_0x458c93(0x583)]())return;if(!SceneManager['isSceneBattle']())return;for(const _0x1089a8 of $gameParty[_0x458c93(0x644)]()){if(!_0x1089a8)continue;_0x1089a8['gainSilentTp'](_0x1089a8[_0x458c93(0x3f9)]());}},SceneManager[_0x3a5d8e(0x6ba)]=function(){const _0x12e408=_0x3a5d8e;this[_0x12e408(0x7dd)]=![],this[_0x12e408(0x616)]=!VisuMZ[_0x12e408(0x690)][_0x12e408(0x227)]['UI'][_0x12e408(0x455)];},SceneManager[_0x3a5d8e(0x5e2)]=function(_0x516ce5){const _0x132152=_0x3a5d8e;VisuMZ['CoreEngine'][_0x132152(0x227)]['UI'][_0x132152(0x945)]&&(this[_0x132152(0x7dd)]=_0x516ce5);},SceneManager['isSideButtonLayout']=function(){return this['_sideButtonLayout'];},SceneManager[_0x3a5d8e(0x6ab)]=function(){const _0x575562=_0x3a5d8e;return this[_0x575562(0x616)];},SceneManager[_0x3a5d8e(0x360)]=function(){const _0x2615a3=_0x3a5d8e;return this[_0x2615a3(0x6ab)]()||this['isSideButtonLayout']();},VisuMZ['CoreEngine'][_0x3a5d8e(0x6cc)]=SceneManager[_0x3a5d8e(0x850)],SceneManager['isGameActive']=function(){const _0x1fb615=_0x3a5d8e;return VisuMZ[_0x1fb615(0x690)][_0x1fb615(0x227)][_0x1fb615(0x169)][_0x1fb615(0x784)]?VisuMZ[_0x1fb615(0x690)][_0x1fb615(0x6cc)]['call'](this):!![];},SceneManager['catchException']=function(_0x4cf905){const _0xe1a9db=_0x3a5d8e;if(_0x4cf905 instanceof Error)this[_0xe1a9db(0x772)](_0x4cf905);else{if(_0x4cf905 instanceof Array&&_0x4cf905[0x0]===_0xe1a9db(0x391)){if('TtcCi'!==_0xe1a9db(0x255))return this[_0xe1a9db(0x3b2)]();else this[_0xe1a9db(0x97b)](_0x4cf905);}else this['catchUnknownError'](_0x4cf905);}this[_0xe1a9db(0x687)]();},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x71f)]=BattleManager['processEscape'],BattleManager[_0x3a5d8e(0x4da)]=function(){const _0x2de58f=_0x3a5d8e;if(VisuMZ[_0x2de58f(0x690)]['Settings'][_0x2de58f(0x169)][_0x2de58f(0x798)])this['processAlwaysEscape']();else return _0x2de58f(0x302)==='RcOuW'?VisuMZ[_0x2de58f(0x690)][_0x2de58f(0x71f)][_0x2de58f(0x528)](this):_0x290c1f?_0x284731(_0x6aa7f5[_0x2de58f(0x6dd)](_0x1b6618*0x64))+'%':_0x1a228;},BattleManager[_0x3a5d8e(0x6bb)]=function(){const _0x4673a5=_0x3a5d8e;return $gameParty[_0x4673a5(0x2b6)](),SoundManager[_0x4673a5(0x4bb)](),this[_0x4673a5(0x178)](),!![];},BattleManager[_0x3a5d8e(0x4de)]=function(){const _0x346397=_0x3a5d8e;return $gameSystem[_0x346397(0x508)]()>=0x1;},BattleManager[_0x3a5d8e(0x5c8)]=function(){const _0x43433c=_0x3a5d8e;return $gameSystem[_0x43433c(0x508)]()===0x1;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x696)]=Game_Temp[_0x3a5d8e(0x715)][_0x3a5d8e(0x36e)],Game_Temp[_0x3a5d8e(0x715)][_0x3a5d8e(0x36e)]=function(){const _0x1ad399=_0x3a5d8e;VisuMZ['CoreEngine'][_0x1ad399(0x696)][_0x1ad399(0x528)](this),this[_0x1ad399(0x756)](),this[_0x1ad399(0x39b)](),this[_0x1ad399(0x2e3)]();},Game_Temp[_0x3a5d8e(0x715)][_0x3a5d8e(0x756)]=function(){const _0x26e163=_0x3a5d8e;VisuMZ['CoreEngine'][_0x26e163(0x227)]['QoL'][_0x26e163(0x671)]&&(this[_0x26e163(0x17d)]=![]);},Game_Temp[_0x3a5d8e(0x715)][_0x3a5d8e(0x744)]=function(_0x89008d){const _0x14c578=_0x3a5d8e;this[_0x14c578(0x5ac)]=_0x89008d;},Game_Temp[_0x3a5d8e(0x715)][_0x3a5d8e(0x8ac)]=function(){const _0xd60c3=_0x3a5d8e;return this[_0xd60c3(0x5ac)];},Game_Temp['prototype'][_0x3a5d8e(0x96f)]=function(){const _0x2827a2=_0x3a5d8e;this['_forcedTroopView']=undefined,this[_0x2827a2(0x957)]=undefined;},Game_Temp[_0x3a5d8e(0x715)][_0x3a5d8e(0x2d4)]=function(_0x45e0a1){const _0x22aacb=_0x3a5d8e;$gameMap&&$dataMap&&$dataMap[_0x22aacb(0x6ff)]&&this['parseForcedGameTroopSettingsCoreEngine']($dataMap[_0x22aacb(0x6ff)]);const _0x3d8719=$dataTroops[_0x45e0a1];if(_0x3d8719){let _0x594408=DataManager['createTroopNote'](_0x3d8719['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x594408);}},Game_Temp[_0x3a5d8e(0x715)][_0x3a5d8e(0x523)]=function(_0x2dc331){const _0x4d6279=_0x3a5d8e;if(!_0x2dc331)return;if(_0x2dc331[_0x4d6279(0x4d7)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this['_forcedTroopView']='FV';else{if(_0x2dc331['match'](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))_0x4d6279(0x56c)!==_0x4d6279(0x8e6)?this[_0x4d6279(0x667)]='SV':this['_forcedBattleSys']=0x0;else{if(_0x2dc331[_0x4d6279(0x4d7)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x4d6279(0x1ea)===_0x4d6279(0x1ea)){const _0x49e761=String(RegExp['$1']);if(_0x49e761[_0x4d6279(0x4d7)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x49e761['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x4d6279(0x667)]='SV');}else{if(!_0x58dd95[_0x4d6279(0x3bb)])return;if(!_0x517a62[_0x4d6279(0x3bb)][_0x4d6279(0x91e)])return;_0x4c26f7['ConvertParams'](_0x425a4f,_0x9a8eef);const _0x1e92b3=_0x2daa3a[_0x4d6279(0x6dd)](_0x4af6c6[_0x4d6279(0x352)]),_0x355c54=_0x2afe7f[_0x4d6279(0x6dd)](_0x3b10f4['pointY']);_0x5e53a7[_0x4d6279(0x677)](_0x1e92b3,_0x355c54,_0x288ab3[_0x4d6279(0x6e5)],_0x49580d[_0x4d6279(0x246)],_0x5b0e4b[_0x4d6279(0x65d)]);}}}}if(_0x2dc331[_0x4d6279(0x4d7)](/<(?:DTB)>/i))_0x4d6279(0x3fc)===_0x4d6279(0x6c9)?_0x35d5db[_0x4d6279(0x573)]&&(this['_forcedBattleSys']=_0x4d6279(0x408)):this[_0x4d6279(0x957)]=0x0;else{if(_0x2dc331['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i)){if('kHbvd'===_0x4d6279(0x4a5))this['_forcedBattleSys']=0x1;else return 0xc0;}else{if(_0x2dc331[_0x4d6279(0x4d7)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x4d6279(0x957)]=0x2;else{if(_0x2dc331[_0x4d6279(0x4d7)](/<(?:CTB)>/i)){if(_0x4d6279(0x602)!=='MSWQx')return _0x3804e2[_0x4d6279(0x690)][_0x4d6279(0x227)][_0x4d6279(0x169)]['AccuracyBoost']&&_0xc0d5e8[_0x4d6279(0x5c0)]()?_0xc97a1f[_0x4d6279(0x2c1)]-0.05:_0x13b28f[_0x4d6279(0x2c1)];else Imported[_0x4d6279(0x2db)]&&(this[_0x4d6279(0x957)]='CTB');}else{if(_0x2dc331[_0x4d6279(0x4d7)](/<(?:STB)>/i)){if('sBaYW'!==_0x4d6279(0x4e9)){if(Imported['VisuMZ_2_BattleSystemSTB']){if(_0x4d6279(0x86c)!==_0x4d6279(0x86c))return _0x17cca3['layoutSettings'][_0x4d6279(0x770)][_0x4d6279(0x528)](this);else this[_0x4d6279(0x957)]=_0x4d6279(0x5f4);}}else _0x133b94[_0x4d6279(0x166)](),this[_0x4d6279(0x942)]();}else{if(_0x2dc331[_0x4d6279(0x4d7)](/<(?:BTB)>/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x4d6279(0x957)]=_0x4d6279(0x888));else{if(_0x2dc331['match'](/<(?:FTB)>/i))Imported[_0x4d6279(0x63a)]&&(this[_0x4d6279(0x957)]='FTB');else{if(_0x2dc331['match'](/<(?:OTB)>/i))_0x4d6279(0x79e)===_0x4d6279(0x79e)?Imported[_0x4d6279(0x35e)]&&(this['_forcedBattleSys']=_0x4d6279(0x8fb)):this['backOpacity']=_0x13ace0[_0x4d6279(0x594)]();else{if(_0x2dc331['match'](/<(?:ETB)>/i))_0x4d6279(0x77b)!==_0x4d6279(0x77b)?_0x2b14b8=_0x4d6279(0x3f8)[_0x4d6279(0x5a1)](_0x13e4a7,_0x12d51e):Imported[_0x4d6279(0x573)]&&(this['_forcedBattleSys']=_0x4d6279(0x408));else{if(_0x2dc331[_0x4d6279(0x4d7)](/<(?:PTB)>/i))Imported[_0x4d6279(0x50a)]&&(this[_0x4d6279(0x957)]=_0x4d6279(0x6f9));else{if(_0x2dc331[_0x4d6279(0x4d7)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x492137=String(RegExp['$1']);if(_0x492137[_0x4d6279(0x4d7)](/DTB/i)){if('QbKeA'===_0x4d6279(0x51b))return'FTB';else this[_0x4d6279(0x957)]=0x0;}else{if(_0x492137['match'](/(?:TPB|ATB)[ ]ACTIVE/i))this['_forcedBattleSys']=0x1;else{if(_0x492137[_0x4d6279(0x4d7)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x4d6279(0x957)]=0x2;else{if(_0x492137[_0x4d6279(0x4d7)](/CTB/i))_0x4d6279(0x983)!==_0x4d6279(0x608)?Imported[_0x4d6279(0x2db)]&&(this['_forcedBattleSys']=_0x4d6279(0x781)):(this[_0x4d6279(0x5fd)]=[],this[_0x4d6279(0x80a)]=[],this[_0x4d6279(0x776)]=[],this[_0x4d6279(0x653)]=[]);else{if(_0x492137[_0x4d6279(0x4d7)](/STB/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this['_forcedBattleSys']='STB');else{if(_0x492137[_0x4d6279(0x4d7)](/BTB/i))Imported[_0x4d6279(0x9ac)]&&(_0x4d6279(0x802)===_0x4d6279(0x802)?this['_forcedBattleSys']=_0x4d6279(0x888):_0x2a1ec7[_0x4d6279(0x690)][_0x4d6279(0x1e8)][_0x4d6279(0x528)](this,_0x462607));else{if(_0x492137['match'](/FTB/i))Imported[_0x4d6279(0x63a)]&&(this['_forcedBattleSys']=_0x4d6279(0x303));else{if(_0x492137['match'](/OTB/i))Imported[_0x4d6279(0x35e)]&&(this[_0x4d6279(0x957)]=_0x4d6279(0x8fb));else{if(_0x492137[_0x4d6279(0x4d7)](/ETB/i)){if(_0x4d6279(0x61b)!=='vkYEo')return _0x120072[_0x4d6279(0x998)][_0x4d6279(0x3f0)][_0x4d6279(0x528)](this);else Imported['VisuMZ_2_BattleSystemETB']&&(this[_0x4d6279(0x957)]='ETB');}else _0x492137[_0x4d6279(0x4d7)](/PTB/i)&&(Imported[_0x4d6279(0x50a)]&&(_0x4d6279(0x5bc)!==_0x4d6279(0x347)?this[_0x4d6279(0x957)]=_0x4d6279(0x6f9):this['_helpWindow'][_0x4d6279(0x357)](_0x144cdb['layoutSettings'][_0x4d6279(0x78e)])));}}}}}}}}}}}}}}}}}}}},Game_Temp['prototype']['createFauxAnimationQueue']=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x3a5d8e(0x715)][_0x3a5d8e(0x6f4)]=function(_0x1a27c7,_0x3eb7d3,_0x5396d9,_0x273522){const _0x42e083=_0x3a5d8e;if(!this[_0x42e083(0x349)]())return;_0x5396d9=_0x5396d9||![],_0x273522=_0x273522||![];if($dataAnimations[_0x3eb7d3]){const _0x3f833b={'targets':_0x1a27c7,'animationId':_0x3eb7d3,'mirror':_0x5396d9,'mute':_0x273522};this[_0x42e083(0x80a)][_0x42e083(0x429)](_0x3f833b);for(const _0x5820a4 of _0x1a27c7){_0x5820a4[_0x42e083(0x994)]&&(_0x42e083(0x626)!==_0x42e083(0x7bd)?_0x5820a4['startAnimation']():(this[_0x42e083(0x918)](_0x47c157),this[_0x42e083(0x526)](_0x174d31)));}}},Game_Temp[_0x3a5d8e(0x715)][_0x3a5d8e(0x349)]=function(){return!![];},Game_Temp['prototype'][_0x3a5d8e(0x688)]=function(){return this['_fauxAnimationQueue']['shift']();},Game_Temp[_0x3a5d8e(0x715)][_0x3a5d8e(0x2e3)]=function(){const _0x21b380=_0x3a5d8e;this[_0x21b380(0x776)]=[];},Game_Temp['prototype'][_0x3a5d8e(0x677)]=function(_0x2abded,_0xd239eb,_0x431a8a,_0x55f4a2,_0x5733c2){const _0x58a260=_0x3a5d8e;if(!this['showPointAnimations']())return;_0x55f4a2=_0x55f4a2||![],_0x5733c2=_0x5733c2||![];if($dataAnimations[_0x431a8a]){const _0x70531={'x':_0x2abded,'y':_0xd239eb,'animationId':_0x431a8a,'mirror':_0x55f4a2,'mute':_0x5733c2};this[_0x58a260(0x776)]['push'](_0x70531);}},Game_Temp['prototype'][_0x3a5d8e(0x5a3)]=function(){return!![];},Game_Temp['prototype']['retrievePointAnimation']=function(){const _0x2bd6a7=_0x3a5d8e;return this[_0x2bd6a7(0x776)][_0x2bd6a7(0x6ec)]();},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x7ef)]=Game_System[_0x3a5d8e(0x715)]['initialize'],Game_System[_0x3a5d8e(0x715)]['initialize']=function(){const _0x5d38ca=_0x3a5d8e;VisuMZ[_0x5d38ca(0x690)][_0x5d38ca(0x7ef)]['call'](this),this[_0x5d38ca(0x387)]();},Game_System[_0x3a5d8e(0x715)][_0x3a5d8e(0x387)]=function(){const _0x1d40f9=_0x3a5d8e;this[_0x1d40f9(0x8a9)]={'SideView':$dataSystem[_0x1d40f9(0x1e4)],'BattleSystem':this[_0x1d40f9(0x167)](),'FontSize':$dataSystem[_0x1d40f9(0x563)][_0x1d40f9(0x171)],'Padding':0xc};},Game_System[_0x3a5d8e(0x715)][_0x3a5d8e(0x235)]=function(){const _0x137471=_0x3a5d8e;if($gameTemp[_0x137471(0x667)]==='SV'){if(_0x137471(0x847)==='TlJBe'){var _0x58c064=_0x153d50(_0x1bcfb5['$1'])/0x64;_0xa1d0d0+=_0x58c064;}else return!![];}else{if($gameTemp[_0x137471(0x667)]==='FV')return _0x137471(0x263)===_0x137471(0x263)?![]:this['_pointAnimationSprites'][_0x137471(0x3fe)]>0x0;}if(this['_CoreEngineSettings']===undefined)this[_0x137471(0x387)]();if(this[_0x137471(0x8a9)][_0x137471(0x5c1)]===undefined)this[_0x137471(0x387)]();return this[_0x137471(0x8a9)]['SideView'];},Game_System['prototype'][_0x3a5d8e(0x291)]=function(_0x12d9a4){const _0x312b17=_0x3a5d8e;if(this[_0x312b17(0x8a9)]===undefined)this[_0x312b17(0x387)]();if(this[_0x312b17(0x8a9)][_0x312b17(0x5c1)]===undefined)this['initCoreEngine']();this[_0x312b17(0x8a9)][_0x312b17(0x5c1)]=_0x12d9a4;},Game_System[_0x3a5d8e(0x715)]['resetBattleSystem']=function(){const _0x275f99=_0x3a5d8e;if(this[_0x275f99(0x8a9)]===undefined)this[_0x275f99(0x387)]();this[_0x275f99(0x8a9)][_0x275f99(0x90b)]=this[_0x275f99(0x167)]();},Game_System[_0x3a5d8e(0x715)][_0x3a5d8e(0x167)]=function(){const _0x3b0aee=_0x3a5d8e,_0xea1f24=(VisuMZ[_0x3b0aee(0x690)][_0x3b0aee(0x227)][_0x3b0aee(0x90b)]||_0x3b0aee(0x48a))['toUpperCase']()[_0x3b0aee(0x3ab)]();return VisuMZ[_0x3b0aee(0x690)][_0x3b0aee(0x8fa)](_0xea1f24);},Game_System[_0x3a5d8e(0x715)][_0x3a5d8e(0x508)]=function(){const _0x31bd3d=_0x3a5d8e;if($gameTemp[_0x31bd3d(0x957)]!==undefined)return $gameTemp['_forcedBattleSys'];if(this[_0x31bd3d(0x8a9)]===undefined)this[_0x31bd3d(0x387)]();if(this[_0x31bd3d(0x8a9)][_0x31bd3d(0x90b)]===undefined)this[_0x31bd3d(0x779)]();return this[_0x31bd3d(0x8a9)][_0x31bd3d(0x90b)];},Game_System[_0x3a5d8e(0x715)][_0x3a5d8e(0x203)]=function(_0x1e01ea){const _0x757091=_0x3a5d8e;if(this[_0x757091(0x8a9)]===undefined)this['initCoreEngine']();if(this[_0x757091(0x8a9)]['BattleSystem']===undefined)this['resetBattleSystem']();this[_0x757091(0x8a9)][_0x757091(0x90b)]=_0x1e01ea;},Game_System[_0x3a5d8e(0x715)]['mainFontSize']=function(){const _0x384289=_0x3a5d8e;if(this[_0x384289(0x8a9)]===undefined)this['initCoreEngine']();if(this[_0x384289(0x8a9)]['FontSize']===undefined)this['initCoreEngine']();return this[_0x384289(0x8a9)][_0x384289(0x7c3)];},Game_System[_0x3a5d8e(0x715)]['setMainFontSize']=function(_0x5b4ed4){const _0x3fd3d8=_0x3a5d8e;if(this['_CoreEngineSettings']===undefined)this[_0x3fd3d8(0x387)]();if(this[_0x3fd3d8(0x8a9)]['TimeProgress']===undefined)this[_0x3fd3d8(0x387)]();this[_0x3fd3d8(0x8a9)][_0x3fd3d8(0x7c3)]=_0x5b4ed4;},Game_System[_0x3a5d8e(0x715)][_0x3a5d8e(0x404)]=function(){const _0x1ea062=_0x3a5d8e;if(this['_CoreEngineSettings']===undefined)this[_0x1ea062(0x387)]();if(this[_0x1ea062(0x8a9)][_0x1ea062(0x950)]===undefined)this[_0x1ea062(0x387)]();return this[_0x1ea062(0x8a9)][_0x1ea062(0x950)];},Game_System[_0x3a5d8e(0x715)]['setWindowPadding']=function(_0x5a647c){const _0x47713a=_0x3a5d8e;if(this[_0x47713a(0x8a9)]===undefined)this[_0x47713a(0x387)]();if(this['_CoreEngineSettings']['TimeProgress']===undefined)this['initCoreEngine']();this[_0x47713a(0x8a9)][_0x47713a(0x950)]=_0x5a647c;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x475)]=Game_Screen['prototype'][_0x3a5d8e(0x36e)],Game_Screen['prototype'][_0x3a5d8e(0x36e)]=function(){const _0x4a6af2=_0x3a5d8e;VisuMZ[_0x4a6af2(0x690)][_0x4a6af2(0x475)][_0x4a6af2(0x528)](this),this['initCoreEngineScreenShake']();},Game_Screen[_0x3a5d8e(0x715)]['initCoreEngineScreenShake']=function(){const _0x2870b7=_0x3a5d8e,_0x5ab329=VisuMZ[_0x2870b7(0x690)][_0x2870b7(0x227)]['ScreenShake'];this[_0x2870b7(0x823)]=_0x5ab329?.[_0x2870b7(0x5d5)]||'random';},Game_Screen['prototype'][_0x3a5d8e(0x1fb)]=function(){const _0x59cc3f=_0x3a5d8e;if(this[_0x59cc3f(0x823)]===undefined)this[_0x59cc3f(0x44d)]();return this[_0x59cc3f(0x823)];},Game_Screen['prototype'][_0x3a5d8e(0x1c0)]=function(_0x3fc673){const _0x1835ff=_0x3a5d8e;if(this[_0x1835ff(0x823)]===undefined)this['initCoreEngineScreenShake']();this[_0x1835ff(0x823)]=_0x3fc673[_0x1835ff(0x8bb)]()[_0x1835ff(0x3ab)]();},Game_Picture['prototype']['isMapScrollLinked']=function(){const _0x2b9685=_0x3a5d8e;if($gameParty[_0x2b9685(0x8c0)]())return![];return this[_0x2b9685(0x53e)]()&&this['name']()['charAt'](0x0)==='!';},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x4d5)]=Game_Picture[_0x3a5d8e(0x715)]['x'],Game_Picture[_0x3a5d8e(0x715)]['x']=function(){const _0xa1bbbb=_0x3a5d8e;return this[_0xa1bbbb(0x627)]()?this[_0xa1bbbb(0x650)]():VisuMZ[_0xa1bbbb(0x690)][_0xa1bbbb(0x4d5)][_0xa1bbbb(0x528)](this);},Game_Picture['prototype'][_0x3a5d8e(0x650)]=function(){const _0x46db56=_0x3a5d8e,_0x40e6ec=$gameMap[_0x46db56(0x637)]()*$gameMap[_0x46db56(0x53b)]();return(this['_x']-_0x40e6ec)*$gameScreen[_0x46db56(0x415)]();},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x681)]=Game_Picture['prototype']['y'],Game_Picture[_0x3a5d8e(0x715)]['y']=function(){const _0xde00e1=_0x3a5d8e;if(this[_0xde00e1(0x627)]())return this[_0xde00e1(0x238)]();else{if(_0xde00e1(0x541)!==_0xde00e1(0x87a))return VisuMZ[_0xde00e1(0x690)][_0xde00e1(0x681)][_0xde00e1(0x528)](this);else _0x2d0cf2[_0xde00e1(0x690)]['BattleManager_update'][_0xde00e1(0x528)](this,_0x2128c2),_0x3d8532=this['_subject'],_0x28bcb6=this[_0xde00e1(0x1e0)],_0x232223=this[_0xde00e1(0x97e)]||this[_0xde00e1(0x1e0)][0x0];}},Game_Picture[_0x3a5d8e(0x715)][_0x3a5d8e(0x238)]=function(){const _0x2807af=_0x3a5d8e,_0x43e0cb=$gameMap[_0x2807af(0x27f)]()*$gameMap[_0x2807af(0x66a)]();return(this['_y']-_0x43e0cb)*$gameScreen[_0x2807af(0x415)]();},VisuMZ['CoreEngine'][_0x3a5d8e(0x6f7)]=Game_Picture[_0x3a5d8e(0x715)][_0x3a5d8e(0x3e6)],Game_Picture['prototype']['scaleX']=function(){const _0x401555=_0x3a5d8e;let _0x437a4e=VisuMZ[_0x401555(0x690)][_0x401555(0x6f7)][_0x401555(0x528)](this);if(this[_0x401555(0x627)]()){if(_0x401555(0x69d)==='MMzwE')_0x437a4e*=$gameScreen[_0x401555(0x415)]();else{if(_0x38e0d2[_0x401555(0x8c0)]())return;_0x225c07['ConvertParams'](_0x5a2424,_0x54c5c2);const _0x524e0f=[_0x401555(0x2ad),_0x401555(0x790),_0x401555(0x17f),_0x401555(0x7ff),_0x401555(0x54f),_0x401555(0x90e),_0x401555(0x376),_0x401555(0x617),_0x401555(0x7d9),_0x401555(0x841),'system','tilesets',_0x401555(0x4af),_0x401555(0x959)];for(const _0x1cd980 of _0x524e0f){const _0x2aca28=_0x145b0c[_0x1cd980],_0x45b69c='img/%1/'[_0x401555(0x5a1)](_0x1cd980);for(const _0x361687 of _0x2aca28){_0x349f30[_0x401555(0x90f)](_0x45b69c,_0x361687);}}}}return _0x437a4e;},VisuMZ[_0x3a5d8e(0x690)]['Game_Picture_scaleY']=Game_Picture['prototype'][_0x3a5d8e(0x921)],Game_Picture[_0x3a5d8e(0x715)][_0x3a5d8e(0x921)]=function(){const _0x57d58c=_0x3a5d8e;let _0x53251c=VisuMZ['CoreEngine'][_0x57d58c(0x866)][_0x57d58c(0x528)](this);if(this[_0x57d58c(0x627)]()){if('Kdmgw'===_0x57d58c(0x9ab))_0x53251c*=$gameScreen[_0x57d58c(0x415)]();else{var _0x647083=_0x2102c0(_0x2abcc5['$1']);_0x50e89b*=_0x647083;}}return _0x53251c;},Game_Picture['prototype'][_0x3a5d8e(0x182)]=function(_0x5190ef){const _0x5bec2d=_0x3a5d8e;this[_0x5bec2d(0x764)]=_0x5190ef;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x77e)]=Game_Picture[_0x3a5d8e(0x715)][_0x3a5d8e(0x796)],Game_Picture[_0x3a5d8e(0x715)]['calcEasing']=function(_0x33134e){const _0x3506fb=_0x3a5d8e;this[_0x3506fb(0x764)]=this['_coreEasingType']||0x0;if([0x0,0x1,0x2,0x3][_0x3506fb(0x2c6)](this[_0x3506fb(0x764)])){if(_0x3506fb(0x792)==='uWffX')_0x1da465[_0x3506fb(0x690)]['Sprite_Animation_setViewport'][_0x3506fb(0x528)](this,_0x46cd33);else return VisuMZ[_0x3506fb(0x690)][_0x3506fb(0x77e)][_0x3506fb(0x528)](this,_0x33134e);}else{if(_0x3506fb(0x4cc)===_0x3506fb(0x872)){if(_0x4d0a39)_0x598198['ParseTilesetNotetags'](_0x16682e);}else return VisuMZ['ApplyEasing'](_0x33134e,this[_0x3506fb(0x764)]);}},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x3a8)]=Game_Action[_0x3a5d8e(0x715)][_0x3a5d8e(0x5d9)],Game_Action['prototype']['itemHit']=function(_0xa61833){const _0x2b7d29=_0x3a5d8e;return VisuMZ[_0x2b7d29(0x690)][_0x2b7d29(0x227)][_0x2b7d29(0x169)][_0x2b7d29(0x2b4)]?this[_0x2b7d29(0x36b)](_0xa61833):VisuMZ[_0x2b7d29(0x690)][_0x2b7d29(0x3a8)][_0x2b7d29(0x528)](this,_0xa61833);},Game_Action[_0x3a5d8e(0x715)][_0x3a5d8e(0x36b)]=function(_0x133175){const _0x15c7cb=_0x3a5d8e,_0x512066=this['itemSuccessRate'](_0x133175),_0x5803cd=this[_0x15c7cb(0x483)](_0x133175),_0x34fb50=this[_0x15c7cb(0x17b)](_0x133175);return _0x512066*(_0x5803cd-_0x34fb50);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x25e)]=Game_Action[_0x3a5d8e(0x715)][_0x3a5d8e(0x58a)],Game_Action['prototype'][_0x3a5d8e(0x58a)]=function(_0xea8397){const _0x48a733=_0x3a5d8e;if(VisuMZ[_0x48a733(0x690)][_0x48a733(0x227)]['QoL'][_0x48a733(0x2b4)])return _0x48a733(0x7cc)===_0x48a733(0x7cc)?0x0:this[_0x48a733(0x24d)]||this;else{if(_0x48a733(0x54d)===_0x48a733(0x5ba))this[_0x48a733(0x67c)](),_0x25bdf7[_0x48a733(0x54b)]();else return VisuMZ[_0x48a733(0x690)][_0x48a733(0x25e)]['call'](this,_0xea8397);}},Game_Action[_0x3a5d8e(0x715)][_0x3a5d8e(0x8da)]=function(_0x2ad407){const _0x520b71=_0x3a5d8e;return this[_0x520b71(0x9b3)]()['successRate']*0.01;},Game_Action[_0x3a5d8e(0x715)][_0x3a5d8e(0x483)]=function(_0x481f76){const _0x287de3=_0x3a5d8e;if(VisuMZ[_0x287de3(0x690)][_0x287de3(0x227)][_0x287de3(0x169)]['AccuracyBoost']&&this['isItem']())return 0x1;if(this[_0x287de3(0x8a4)]())return VisuMZ[_0x287de3(0x690)]['Settings'][_0x287de3(0x169)][_0x287de3(0x7b9)]&&this[_0x287de3(0x6f8)]()[_0x287de3(0x700)]()?this[_0x287de3(0x6f8)]()[_0x287de3(0x663)]+0.05:this[_0x287de3(0x6f8)]()[_0x287de3(0x663)];else{if('YYpCb'===_0x287de3(0x397))_0x4a30c7[_0x287de3(0x583)]()&&_0x2c9a0b[_0x287de3(0x690)][_0x287de3(0x227)]['QoL'][_0x287de3(0x58f)]&&(_0x56cc06[_0x287de3(0x6db)]=!_0x49737e[_0x287de3(0x6db)]);else return 0x1;}},Game_Action['prototype'][_0x3a5d8e(0x17b)]=function(_0x314afd){const _0x352254=_0x3a5d8e;if(this[_0x352254(0x6f8)]()[_0x352254(0x700)]()===_0x314afd[_0x352254(0x700)]())return 0x0;if(this[_0x352254(0x8a4)]()){if(VisuMZ['CoreEngine']['Settings'][_0x352254(0x169)][_0x352254(0x7b9)]&&_0x314afd[_0x352254(0x5c0)]()){if(_0x352254(0x48c)===_0x352254(0x48c))return _0x314afd['eva']-0.05;else this[_0x352254(0x159)](this[_0x352254(0x61e)](),_0x1f9898['x'],_0x38b667['y'],_0x215355[_0x352254(0x89a)],_0x352254(0x8ec));}else{if(_0x352254(0x542)===_0x352254(0x542))return _0x314afd[_0x352254(0x2c1)];else{_0x1400a2[_0x352254(0x306)](_0x233fa8,_0x5c7bb8);const _0x55df65=_0x1959ed[_0x352254(0x6dd)](_0x44c1ab[_0x352254(0x843)])[_0x352254(0x2e9)](-0x64,0x64),_0x33881d=_0x41e1a7[_0x352254(0x2ab)];_0x33881d&&(_0x33881d['pan']=_0x55df65,_0x3c75ca['playBgm'](_0x33881d));}}}else return this[_0x352254(0x86e)]()?_0x314afd['mev']:0x0;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x95f)]=Game_Action[_0x3a5d8e(0x715)]['updateLastTarget'],Game_Action['prototype']['updateLastTarget']=function(_0x13c1ab){const _0x23add8=_0x3a5d8e;VisuMZ['CoreEngine']['Game_Action_updateLastTarget']['call'](this,_0x13c1ab);if(VisuMZ[_0x23add8(0x690)][_0x23add8(0x227)][_0x23add8(0x169)]['ImprovedAccuracySystem'])return;const _0x53106b=_0x13c1ab['result']();if(_0x53106b[_0x23add8(0x8d5)]){if(_0x23add8(0x607)!==_0x23add8(0x607))return _0xa50924[_0x23add8(0x661)]||_0x23add8(0x661);else 0x1-this[_0x23add8(0x58a)](_0x13c1ab)>this['itemHit'](_0x13c1ab)&&(_0x53106b['missed']=![],_0x53106b[_0x23add8(0x549)]=!![]);}},VisuMZ['CoreEngine']['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x3a5d8e(0x715)]['initMembers'],Game_BattlerBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x64f)]=function(){const _0x3dbedd=_0x3a5d8e;this[_0x3dbedd(0x8c1)]={},VisuMZ[_0x3dbedd(0x690)][_0x3dbedd(0x51f)]['call'](this);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x6ea)]=Game_BattlerBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x81b)],Game_BattlerBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x81b)]=function(){const _0x4813bc=_0x3a5d8e;this[_0x4813bc(0x8c1)]={},VisuMZ[_0x4813bc(0x690)][_0x4813bc(0x6ea)][_0x4813bc(0x528)](this);},Game_BattlerBase['prototype']['checkCacheKey']=function(_0x1d57aa){const _0x7079b2=_0x3a5d8e;return this[_0x7079b2(0x8c1)]=this[_0x7079b2(0x8c1)]||{},this['_cache'][_0x1d57aa]!==undefined;},Game_BattlerBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x164)]=function(_0x58fc20){const _0x297ee4=_0x3a5d8e,_0x238982=(_0x300ecf,_0x4dc52f)=>{const _0x5eda5f=_0x23aa;if('mQizY'==='EXTNG')_0x332e17['CoreEngine'][_0x5eda5f(0x58b)][_0x5eda5f(0x528)](this,_0x1a5d94);else{if(!_0x4dc52f)return _0x300ecf;if(_0x4dc52f[_0x5eda5f(0x6ff)]['match'](VisuMZ[_0x5eda5f(0x690)][_0x5eda5f(0x8dc)][_0x5eda5f(0x164)][_0x58fc20])){var _0x585fb0=Number(RegExp['$1']);_0x300ecf+=_0x585fb0;}if(_0x4dc52f[_0x5eda5f(0x6ff)][_0x5eda5f(0x4d7)](VisuMZ[_0x5eda5f(0x690)]['RegExp'][_0x5eda5f(0x7ea)][_0x58fc20])){if(_0x5eda5f(0x859)==='ZcyLa'){var _0x3acad3=String(RegExp['$1']);try{_0x5eda5f(0x750)!==_0x5eda5f(0x304)?_0x300ecf+=eval(_0x3acad3):this[_0x5eda5f(0x3da)]();}catch(_0x2530a1){if('XhMiV'===_0x5eda5f(0x4b1)){if(_0x2f97ba[_0x5eda5f(0x690)][_0x5eda5f(0x227)][_0x5eda5f(0x169)][_0x5eda5f(0x7de)]??!![])for(const _0x1f63e9 in _0x5a2382){const _0x50757f=_0x3c1e80[_0x1f63e9];_0x50757f[_0x5eda5f(0x53e)][_0x5eda5f(0x4d7)](/(.*)\/(.*)/i)&&(_0x50757f[_0x5eda5f(0x53e)]=_0x17aef5(_0x1e4d37['$2'][_0x5eda5f(0x3ab)]()));}}else{if($gameTemp['isPlaytest']())console[_0x5eda5f(0x298)](_0x2530a1);}}}else _0x5bcb49['CoreEngine'][_0x5eda5f(0x7fb)][_0x5eda5f(0x528)](this);}return _0x300ecf;}};return this[_0x297ee4(0x330)]()['reduce'](_0x238982,this[_0x297ee4(0x89b)][_0x58fc20]);},Game_BattlerBase[_0x3a5d8e(0x715)]['paramMax']=function(_0x2f8478){const _0x11df8f=_0x3a5d8e;var _0x2aca4d='Basic'+(this['isActor']()?_0x11df8f(0x7b6):_0x11df8f(0x697))+'ParamMax'+_0x2f8478;if(this[_0x11df8f(0x8d1)](_0x2aca4d))return this['_cache'][_0x2aca4d];this[_0x11df8f(0x8c1)][_0x2aca4d]=eval(VisuMZ[_0x11df8f(0x690)][_0x11df8f(0x227)][_0x11df8f(0x2fe)][_0x2aca4d]);const _0x277d6f=(_0x2cd88f,_0x179554)=>{const _0x3b19e5=_0x11df8f;if('wjtgS'===_0x3b19e5(0x27b)){if(!_0x179554)return _0x2cd88f;if(_0x179554[_0x3b19e5(0x6ff)]['match'](VisuMZ[_0x3b19e5(0x690)][_0x3b19e5(0x8dc)][_0x3b19e5(0x3cc)][_0x2f8478])){var _0x2d3119=Number(RegExp['$1']);if(_0x2d3119===0x0)_0x2d3119=Number[_0x3b19e5(0x8bd)];_0x2cd88f=Math[_0x3b19e5(0x2bb)](_0x2cd88f,_0x2d3119);}if(_0x179554[_0x3b19e5(0x6ff)]['match'](VisuMZ[_0x3b19e5(0x690)]['RegExp'][_0x3b19e5(0x914)][_0x2f8478])){if(_0x3b19e5(0x849)!==_0x3b19e5(0x424)){var _0x508aa1=String(RegExp['$1']);try{_0x2cd88f=Math[_0x3b19e5(0x2bb)](_0x2cd88f,Number(eval(_0x508aa1)));}catch(_0x43feb2){if($gameTemp[_0x3b19e5(0x583)]())console[_0x3b19e5(0x298)](_0x43feb2);}}else{this[_0x3b19e5(0x2b8)][_0x3b19e5(0x166)]();const _0x25b541=_0x1c78f6[_0x3b19e5(0x2c2)],_0x4811ee=_0x22ec8c['picture'](_0x25b541);if(!_0x4811ee)return;this[_0x3b19e5(0x320)]=_0x4811ee['_origin'],this[_0x3b19e5(0x981)]=_0x4811ee['_x'],this['_lastY']=_0x4811ee['_y'];const _0x4e0783=_0x1484ed[_0x3b19e5(0x6d8)]();this[_0x3b19e5(0x2b8)]['fillRect'](0x0,0x0,this['innerWidth'],this[_0x3b19e5(0x1fe)],_0x4e0783);const _0x22ae1d=_0x3b19e5(0x668)[_0x3b19e5(0x5a1)](_0x4811ee[_0x3b19e5(0x2da)]===0x0?_0x3b19e5(0x95d):_0x3b19e5(0x77d)),_0x42e88a=_0x3b19e5(0x289)['format'](_0x4811ee['_x']),_0x5506e2=_0x3b19e5(0x24e)[_0x3b19e5(0x5a1)](_0x4811ee['_y']),_0x3299c2=_0x3b19e5(0x6a9)['format'](_0x102f80[_0x3b19e5(0x3dd)](_0x3b19e5(0x37d)));let _0x2b281e=_0x5dfdee[_0x3b19e5(0x3de)](this[_0x3b19e5(0x511)]/0x4);this[_0x3b19e5(0x159)](_0x22ae1d,_0x2b281e*0x0,0x0,_0x2b281e),this[_0x3b19e5(0x159)](_0x42e88a,_0x2b281e*0x1,0x0,_0x2b281e,_0x3b19e5(0x61d)),this[_0x3b19e5(0x159)](_0x5506e2,_0x2b281e*0x2,0x0,_0x2b281e,'center');const _0x2fcde1=this['textSizeEx'](_0x3299c2)[_0x3b19e5(0x89a)],_0x323981=this[_0x3b19e5(0x511)]-_0x2fcde1;this[_0x3b19e5(0x283)](_0x3299c2,_0x323981,0x0,_0x2fcde1);}}return _0x2cd88f;}else{const _0x41107d=_0x21ac2b('fs');let _0x23d53b=_0x3b19e5(0x76b)['format'](_0x29da0c||'0');_0x41107d[_0x3b19e5(0x5e9)](_0x23d53b,_0x1a1489,_0x5071de=>{const _0x30633b=_0x3b19e5;if(_0x5071de)throw _0x38026c;else _0x1d7208&&_0x29e558(_0x30633b(0x890)[_0x30633b(0x5a1)](_0x23d53b));});}};if(this[_0x11df8f(0x8c1)][_0x2aca4d]===0x0)this[_0x11df8f(0x8c1)][_0x2aca4d]=Number[_0x11df8f(0x8bd)];return this[_0x11df8f(0x8c1)][_0x2aca4d]=this[_0x11df8f(0x330)]()[_0x11df8f(0x50d)](_0x277d6f,this['_cache'][_0x2aca4d]),this[_0x11df8f(0x8c1)][_0x2aca4d];},Game_BattlerBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x2d9)]=function(_0x2c7447){const _0x8269f8=_0x3a5d8e,_0x457800=this[_0x8269f8(0x975)](Game_BattlerBase[_0x8269f8(0x5d3)],_0x2c7447),_0x1bc84f=(_0x2a7193,_0x41e46c)=>{const _0x3d89a5=_0x8269f8;if(!_0x41e46c)return _0x2a7193;if(_0x41e46c[_0x3d89a5(0x6ff)][_0x3d89a5(0x4d7)](VisuMZ[_0x3d89a5(0x690)]['RegExp']['paramRate1'][_0x2c7447])){var _0x1c360a=Number(RegExp['$1'])/0x64;_0x2a7193*=_0x1c360a;}if(_0x41e46c[_0x3d89a5(0x6ff)][_0x3d89a5(0x4d7)](VisuMZ['CoreEngine']['RegExp'][_0x3d89a5(0x7ca)][_0x2c7447])){var _0x1c360a=Number(RegExp['$1']);_0x2a7193*=_0x1c360a;}if(_0x41e46c[_0x3d89a5(0x6ff)]['match'](VisuMZ['CoreEngine'][_0x3d89a5(0x8dc)]['paramRateJS'][_0x2c7447])){if(_0x3d89a5(0x29c)===_0x3d89a5(0x29c)){var _0x5c6e32=String(RegExp['$1']);try{_0x2a7193*=eval(_0x5c6e32);}catch(_0x264b52){if('xwuYT'!==_0x3d89a5(0x436)){if($gameTemp[_0x3d89a5(0x583)]())console['log'](_0x264b52);}else{if(_0x2503cd[_0x3d89a5(0x667)]==='SV')return!![];else{if(_0x5ec51a[_0x3d89a5(0x667)]==='FV')return![];}if(this['_CoreEngineSettings']===_0x44044a)this[_0x3d89a5(0x387)]();if(this['_CoreEngineSettings'][_0x3d89a5(0x5c1)]===_0x33b7a5)this[_0x3d89a5(0x387)]();return this[_0x3d89a5(0x8a9)][_0x3d89a5(0x5c1)];}}}else return _0x27bcbf['outlineColorGauge']();}return _0x2a7193;};return this[_0x8269f8(0x330)]()[_0x8269f8(0x50d)](_0x1bc84f,_0x457800);},Game_BattlerBase[_0x3a5d8e(0x715)]['paramFlatBonus']=function(_0x380658){const _0x9f9a83=_0x3a5d8e,_0x4d1879=(_0x159bbc,_0x248394)=>{const _0x353d55=_0x23aa;if(!_0x248394)return _0x159bbc;if(_0x248394[_0x353d55(0x6ff)][_0x353d55(0x4d7)](VisuMZ[_0x353d55(0x690)][_0x353d55(0x8dc)]['paramFlat'][_0x380658])){var _0xf302df=Number(RegExp['$1']);_0x159bbc+=_0xf302df;}if(_0x248394[_0x353d55(0x6ff)]['match'](VisuMZ[_0x353d55(0x690)][_0x353d55(0x8dc)][_0x353d55(0x446)][_0x380658])){if('cSYyG'!==_0x353d55(0x646)){if(!this['isCursorMovable']())return;_0x252eed['isNumpadPressed']()?this['processKeyboardDigitChange']():_0x50edab[_0x353d55(0x715)][_0x353d55(0x855)][_0x353d55(0x528)](this);}else{var _0x46628d=String(RegExp['$1']);try{_0x159bbc+=eval(_0x46628d);}catch(_0x3d0959){if($gameTemp[_0x353d55(0x583)]())console[_0x353d55(0x298)](_0x3d0959);}}}return _0x159bbc;};return this[_0x9f9a83(0x330)]()[_0x9f9a83(0x50d)](_0x4d1879,0x0);},Game_BattlerBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x4c4)]=function(_0x8e7d2f){const _0x1fbd0d=_0x3a5d8e;let _0x364b01=_0x1fbd0d(0x4c4)+_0x8e7d2f+_0x1fbd0d(0x91b);if(this[_0x1fbd0d(0x8d1)](_0x364b01))return this[_0x1fbd0d(0x8c1)][_0x364b01];return this[_0x1fbd0d(0x8c1)][_0x364b01]=Math[_0x1fbd0d(0x6dd)](VisuMZ[_0x1fbd0d(0x690)][_0x1fbd0d(0x227)][_0x1fbd0d(0x2fe)][_0x1fbd0d(0x463)][_0x1fbd0d(0x528)](this,_0x8e7d2f)),this[_0x1fbd0d(0x8c1)][_0x364b01];},Game_BattlerBase[_0x3a5d8e(0x715)]['xparamPlus']=function(_0x598d51){const _0x1111cf=_0x3a5d8e,_0x48dc64=(_0x63407c,_0x486224)=>{const _0x25aebc=_0x23aa;if(!_0x486224)return _0x63407c;if(_0x486224[_0x25aebc(0x6ff)][_0x25aebc(0x4d7)](VisuMZ[_0x25aebc(0x690)][_0x25aebc(0x8dc)][_0x25aebc(0x576)][_0x598d51])){var _0x3567ba=Number(RegExp['$1'])/0x64;_0x63407c+=_0x3567ba;}if(_0x486224[_0x25aebc(0x6ff)][_0x25aebc(0x4d7)](VisuMZ[_0x25aebc(0x690)]['RegExp'][_0x25aebc(0x93c)][_0x598d51])){var _0x3567ba=Number(RegExp['$1']);_0x63407c+=_0x3567ba;}if(_0x486224[_0x25aebc(0x6ff)][_0x25aebc(0x4d7)](VisuMZ[_0x25aebc(0x690)][_0x25aebc(0x8dc)][_0x25aebc(0x600)][_0x598d51])){var _0x1c3f04=String(RegExp['$1']);try{_0x63407c+=eval(_0x1c3f04);}catch(_0xab3bf0){if($gameTemp[_0x25aebc(0x583)]())console['log'](_0xab3bf0);}}return _0x63407c;};return this[_0x1111cf(0x330)]()['reduce'](_0x48dc64,0x0);},Game_BattlerBase[_0x3a5d8e(0x715)]['xparamRate']=function(_0x71ccc){const _0x177bb4=_0x3a5d8e,_0x1a0ca6=(_0x555407,_0x2ba6ec)=>{const _0x3c6865=_0x23aa;if('trUWj'==='CZwoj')for(const _0x49b589 of _0x4f4391[_0x3c6865(0x177)]){const _0x30bd32=new _0x4171fa(_0x49b589);this[_0x3c6865(0x162)](_0x30bd32);}else{if(!_0x2ba6ec)return _0x555407;if(_0x2ba6ec[_0x3c6865(0x6ff)][_0x3c6865(0x4d7)](VisuMZ[_0x3c6865(0x690)][_0x3c6865(0x8dc)][_0x3c6865(0x2d8)][_0x71ccc])){var _0x668a46=Number(RegExp['$1'])/0x64;_0x555407*=_0x668a46;}if(_0x2ba6ec[_0x3c6865(0x6ff)]['match'](VisuMZ[_0x3c6865(0x690)][_0x3c6865(0x8dc)]['xparamRate2'][_0x71ccc])){var _0x668a46=Number(RegExp['$1']);_0x555407*=_0x668a46;}if(_0x2ba6ec[_0x3c6865(0x6ff)][_0x3c6865(0x4d7)](VisuMZ[_0x3c6865(0x690)]['RegExp'][_0x3c6865(0x803)][_0x71ccc])){var _0x91994f=String(RegExp['$1']);try{_0x555407*=eval(_0x91994f);}catch(_0x529456){if($gameTemp['isPlaytest']())console[_0x3c6865(0x298)](_0x529456);}}return _0x555407;}};return this[_0x177bb4(0x330)]()[_0x177bb4(0x50d)](_0x1a0ca6,0x1);},Game_BattlerBase[_0x3a5d8e(0x715)]['xparamFlatBonus']=function(_0x2b22cb){const _0x546dfd=_0x3a5d8e,_0x43b784=(_0x1c00e7,_0x4177a8)=>{const _0x3ad1d1=_0x23aa;if(!_0x4177a8)return _0x1c00e7;if(_0x4177a8[_0x3ad1d1(0x6ff)][_0x3ad1d1(0x4d7)](VisuMZ[_0x3ad1d1(0x690)]['RegExp']['xparamFlat1'][_0x2b22cb])){if(_0x3ad1d1(0x7c9)===_0x3ad1d1(0x9b0))return _0x120414[_0x3ad1d1(0x690)]['Settings']['Color'][_0x3ad1d1(0x2ce)]||'rgba(0,\x200,\x200,\x201.0)';else{var _0xb4d278=Number(RegExp['$1'])/0x64;_0x1c00e7+=_0xb4d278;}}if(_0x4177a8[_0x3ad1d1(0x6ff)][_0x3ad1d1(0x4d7)](VisuMZ[_0x3ad1d1(0x690)][_0x3ad1d1(0x8dc)][_0x3ad1d1(0x6d4)][_0x2b22cb])){var _0xb4d278=Number(RegExp['$1']);_0x1c00e7+=_0xb4d278;}if(_0x4177a8[_0x3ad1d1(0x6ff)][_0x3ad1d1(0x4d7)](VisuMZ[_0x3ad1d1(0x690)][_0x3ad1d1(0x8dc)]['xparamFlatJS'][_0x2b22cb])){var _0x341f08=String(RegExp['$1']);try{_0x1c00e7+=eval(_0x341f08);}catch(_0x1090ad){if($gameTemp[_0x3ad1d1(0x583)]())console['log'](_0x1090ad);}}return _0x1c00e7;};return this[_0x546dfd(0x330)]()[_0x546dfd(0x50d)](_0x43b784,0x0);},Game_BattlerBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x4e0)]=function(_0x555319){const _0x21babb=_0x3a5d8e;let _0x40bd25=_0x21babb(0x4e0)+_0x555319+_0x21babb(0x91b);if(this[_0x21babb(0x8d1)](_0x40bd25))return this[_0x21babb(0x8c1)][_0x40bd25];return this['_cache'][_0x40bd25]=VisuMZ['CoreEngine']['Settings'][_0x21babb(0x2fe)][_0x21babb(0x88c)]['call'](this,_0x555319),this[_0x21babb(0x8c1)][_0x40bd25];},Game_BattlerBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x3ac)]=function(_0x20c0a3){const _0x44742b=_0x3a5d8e,_0x1c9704=(_0x277232,_0x3e8eda)=>{const _0x202c39=_0x23aa;if(_0x202c39(0x3bf)===_0x202c39(0x53c))_0x46bde3('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'['format'](_0x3ab65a));else{if(!_0x3e8eda)return _0x277232;if(_0x3e8eda[_0x202c39(0x6ff)]['match'](VisuMZ[_0x202c39(0x690)][_0x202c39(0x8dc)][_0x202c39(0x3e4)][_0x20c0a3])){var _0x140f44=Number(RegExp['$1'])/0x64;_0x277232+=_0x140f44;}if(_0x3e8eda[_0x202c39(0x6ff)][_0x202c39(0x4d7)](VisuMZ['CoreEngine'][_0x202c39(0x8dc)][_0x202c39(0x5f8)][_0x20c0a3])){var _0x140f44=Number(RegExp['$1']);_0x277232+=_0x140f44;}if(_0x3e8eda[_0x202c39(0x6ff)][_0x202c39(0x4d7)](VisuMZ[_0x202c39(0x690)][_0x202c39(0x8dc)][_0x202c39(0x484)][_0x20c0a3])){var _0x2d15d5=String(RegExp['$1']);try{_0x277232+=eval(_0x2d15d5);}catch(_0x29d92a){if(_0x202c39(0x25d)!==_0x202c39(0x155)){if($gameTemp[_0x202c39(0x583)]())console['log'](_0x29d92a);}else this[_0x202c39(0x58d)]=_0x3b14fa[_0x202c39(0x690)][_0x202c39(0x227)]['Window'][_0x202c39(0x6d1)];}}return _0x277232;}};return this[_0x44742b(0x330)]()[_0x44742b(0x50d)](_0x1c9704,0x0);},Game_BattlerBase['prototype'][_0x3a5d8e(0x571)]=function(_0x7dc446){const _0x14e5b8=_0x3a5d8e,_0xdaeb8d=(_0x53afc7,_0x4fc51d)=>{const _0x394038=_0x23aa;if(!_0x4fc51d)return _0x53afc7;if(_0x4fc51d[_0x394038(0x6ff)][_0x394038(0x4d7)](VisuMZ[_0x394038(0x690)][_0x394038(0x8dc)][_0x394038(0x23c)][_0x7dc446])){var _0x4a02d2=Number(RegExp['$1'])/0x64;_0x53afc7*=_0x4a02d2;}if(_0x4fc51d[_0x394038(0x6ff)][_0x394038(0x4d7)](VisuMZ['CoreEngine'][_0x394038(0x8dc)][_0x394038(0x39d)][_0x7dc446])){if(_0x394038(0x87e)!=='wfNvO')_0x2ad43a[_0x394038(0x690)][_0x394038(0x659)][_0x394038(0x528)](this),_0xea9377['updateCurrentEvent']();else{var _0x4a02d2=Number(RegExp['$1']);_0x53afc7*=_0x4a02d2;}}if(_0x4fc51d[_0x394038(0x6ff)][_0x394038(0x4d7)](VisuMZ[_0x394038(0x690)][_0x394038(0x8dc)][_0x394038(0x56f)][_0x7dc446])){if('wdVAA'!==_0x394038(0x642)){var _0xcba90=String(RegExp['$1']);try{_0x394038(0x54a)===_0x394038(0x54a)?_0x53afc7*=eval(_0xcba90):this['clear']();}catch(_0x3f4ee0){if(_0x394038(0x678)!==_0x394038(0x678))return _0x512bb4&&this[_0x394038(0x495)]?this['_actor'][_0x394038(0x712)](_0x4fba35):_0x11f880[_0x394038(0x690)][_0x394038(0x68e)][_0x394038(0x528)](this,_0x10a64a);else{if($gameTemp[_0x394038(0x583)]())console[_0x394038(0x298)](_0x3f4ee0);}}}else return 0x1;}return _0x53afc7;};return this[_0x14e5b8(0x330)]()['reduce'](_0xdaeb8d,0x1);},Game_BattlerBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x6c7)]=function(_0x103189){const _0x5524ca=_0x3a5d8e,_0x353132=(_0x1bb7d4,_0x5bb9b7)=>{const _0x24ca74=_0x23aa;if(_0x24ca74(0x16b)===_0x24ca74(0x16b)){if(!_0x5bb9b7)return _0x1bb7d4;if(_0x5bb9b7[_0x24ca74(0x6ff)][_0x24ca74(0x4d7)](VisuMZ[_0x24ca74(0x690)][_0x24ca74(0x8dc)][_0x24ca74(0x57f)][_0x103189])){var _0x1b8631=Number(RegExp['$1'])/0x64;_0x1bb7d4+=_0x1b8631;}if(_0x5bb9b7['note'][_0x24ca74(0x4d7)](VisuMZ[_0x24ca74(0x690)][_0x24ca74(0x8dc)][_0x24ca74(0x816)][_0x103189])){if(_0x24ca74(0x990)===_0x24ca74(0x990)){var _0x1b8631=Number(RegExp['$1']);_0x1bb7d4+=_0x1b8631;}else{if(this['_CoreEngineSettings']===_0x5c8c05)this[_0x24ca74(0x387)]();if(this[_0x24ca74(0x8a9)]['FontSize']===_0x5ca695)this[_0x24ca74(0x387)]();return this['_CoreEngineSettings'][_0x24ca74(0x7c3)];}}if(_0x5bb9b7[_0x24ca74(0x6ff)]['match'](VisuMZ['CoreEngine']['RegExp'][_0x24ca74(0x1e5)][_0x103189])){var _0x546f0e=String(RegExp['$1']);try{_0x1bb7d4+=eval(_0x546f0e);}catch(_0x37ab5e){if('RYydC'===_0x24ca74(0x71a))_0x3fa5b6[_0x24ca74(0x690)][_0x24ca74(0x1f5)][_0x24ca74(0x528)](this),this[_0x24ca74(0x21d)]();else{if($gameTemp['isPlaytest']())console[_0x24ca74(0x298)](_0x37ab5e);}}}return _0x1bb7d4;}else return _0x18a4b4[_0x24ca74(0x52d)];};return this[_0x5524ca(0x330)]()[_0x5524ca(0x50d)](_0x353132,0x0);},Game_BattlerBase['prototype'][_0x3a5d8e(0x6a7)]=function(_0x2c4d4a){const _0x40abaf=_0x3a5d8e;let _0x41684b=_0x40abaf(0x6a7)+_0x2c4d4a+_0x40abaf(0x91b);if(this[_0x40abaf(0x8d1)](_0x41684b))return this[_0x40abaf(0x8c1)][_0x41684b];return this[_0x40abaf(0x8c1)][_0x41684b]=VisuMZ[_0x40abaf(0x690)]['Settings'][_0x40abaf(0x2fe)][_0x40abaf(0x8a1)][_0x40abaf(0x528)](this,_0x2c4d4a),this[_0x40abaf(0x8c1)][_0x41684b];},Game_BattlerBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x90c)]=function(_0x312c89,_0x875653){const _0x1a02e6=_0x3a5d8e;if(typeof paramId==='number')return this['param'](_0x312c89);_0x312c89=String(_0x312c89||'')[_0x1a02e6(0x987)]();if(_0x312c89===_0x1a02e6(0x188))return this[_0x1a02e6(0x4c4)](0x0);if(_0x312c89==='MAXMP')return this['param'](0x1);if(_0x312c89===_0x1a02e6(0x6e0))return this[_0x1a02e6(0x4c4)](0x2);if(_0x312c89==='DEF')return this[_0x1a02e6(0x4c4)](0x3);if(_0x312c89==='MAT')return this[_0x1a02e6(0x4c4)](0x4);if(_0x312c89==='MDF')return this[_0x1a02e6(0x4c4)](0x5);if(_0x312c89===_0x1a02e6(0x833))return this[_0x1a02e6(0x4c4)](0x6);if(_0x312c89===_0x1a02e6(0x4ed))return this['param'](0x7);if(_0x312c89===_0x1a02e6(0x5b4))return _0x875653?String(Math['round'](this[_0x1a02e6(0x4e0)](0x0)*0x64))+'%':this[_0x1a02e6(0x4e0)](0x0);if(_0x312c89===_0x1a02e6(0x27d))return _0x875653?String(Math[_0x1a02e6(0x6dd)](this[_0x1a02e6(0x4e0)](0x1)*0x64))+'%':this[_0x1a02e6(0x4e0)](0x1);if(_0x312c89===_0x1a02e6(0x7e1))return _0x875653?String(Math[_0x1a02e6(0x6dd)](this['xparam'](0x2)*0x64))+'%':this[_0x1a02e6(0x4e0)](0x2);if(_0x312c89===_0x1a02e6(0x76d))return _0x875653?String(Math['round'](this[_0x1a02e6(0x4e0)](0x3)*0x64))+'%':this[_0x1a02e6(0x4e0)](0x3);if(_0x312c89===_0x1a02e6(0x766))return _0x875653?String(Math[_0x1a02e6(0x6dd)](this['xparam'](0x4)*0x64))+'%':this[_0x1a02e6(0x4e0)](0x4);if(_0x312c89===_0x1a02e6(0x621))return _0x875653?String(Math[_0x1a02e6(0x6dd)](this['xparam'](0x5)*0x64))+'%':this[_0x1a02e6(0x4e0)](0x5);if(_0x312c89===_0x1a02e6(0x765))return _0x875653?String(Math[_0x1a02e6(0x6dd)](this[_0x1a02e6(0x4e0)](0x6)*0x64))+'%':this[_0x1a02e6(0x4e0)](0x6);if(_0x312c89===_0x1a02e6(0x245))return _0x875653?String(Math['round'](this[_0x1a02e6(0x4e0)](0x7)*0x64))+'%':this['xparam'](0x7);if(_0x312c89===_0x1a02e6(0x212))return _0x875653?String(Math[_0x1a02e6(0x6dd)](this[_0x1a02e6(0x4e0)](0x8)*0x64))+'%':this[_0x1a02e6(0x4e0)](0x8);if(_0x312c89==='TRG')return _0x875653?String(Math[_0x1a02e6(0x6dd)](this[_0x1a02e6(0x4e0)](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x312c89==='TGR')return _0x875653?String(Math['round'](this[_0x1a02e6(0x6a7)](0x0)*0x64))+'%':this[_0x1a02e6(0x6a7)](0x0);if(_0x312c89===_0x1a02e6(0x450))return _0x875653?String(Math[_0x1a02e6(0x6dd)](this[_0x1a02e6(0x6a7)](0x1)*0x64))+'%':this[_0x1a02e6(0x6a7)](0x1);if(_0x312c89===_0x1a02e6(0x8ab))return _0x875653?String(Math[_0x1a02e6(0x6dd)](this[_0x1a02e6(0x6a7)](0x2)*0x64))+'%':this[_0x1a02e6(0x6a7)](0x2);if(_0x312c89===_0x1a02e6(0x56a))return _0x875653?String(Math[_0x1a02e6(0x6dd)](this['sparam'](0x3)*0x64))+'%':this[_0x1a02e6(0x6a7)](0x3);if(_0x312c89===_0x1a02e6(0x769))return _0x875653?String(Math[_0x1a02e6(0x6dd)](this[_0x1a02e6(0x6a7)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x312c89==='TCR')return _0x875653?String(Math[_0x1a02e6(0x6dd)](this['sparam'](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x312c89===_0x1a02e6(0x1de))return _0x875653?String(Math[_0x1a02e6(0x6dd)](this[_0x1a02e6(0x6a7)](0x6)*0x64))+'%':this[_0x1a02e6(0x6a7)](0x6);if(_0x312c89===_0x1a02e6(0x4a2))return _0x875653?String(Math[_0x1a02e6(0x6dd)](this[_0x1a02e6(0x6a7)](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x312c89===_0x1a02e6(0x5f0))return _0x875653?String(Math[_0x1a02e6(0x6dd)](this[_0x1a02e6(0x6a7)](0x8)*0x64))+'%':this[_0x1a02e6(0x6a7)](0x8);if(_0x312c89===_0x1a02e6(0x601))return _0x875653?String(Math[_0x1a02e6(0x6dd)](this[_0x1a02e6(0x6a7)](0x9)*0x64))+'%':this[_0x1a02e6(0x6a7)](0x9);if(VisuMZ[_0x1a02e6(0x690)]['CustomParamAbb'][_0x312c89]){const _0x128205=VisuMZ[_0x1a02e6(0x690)][_0x1a02e6(0x409)][_0x312c89],_0x4b85e4=this[_0x128205];return VisuMZ[_0x1a02e6(0x690)][_0x1a02e6(0x670)][_0x312c89]==='integer'?_0x4b85e4:_0x875653?String(Math[_0x1a02e6(0x6dd)](_0x4b85e4*0x64))+'%':_0x4b85e4;}return'';},Game_BattlerBase[_0x3a5d8e(0x715)]['isDying']=function(){const _0x407702=_0x3a5d8e;return this[_0x407702(0x295)]()&&this[_0x407702(0x6a4)]<this['mhp']*VisuMZ['CoreEngine']['Settings'][_0x407702(0x2fe)][_0x407702(0x344)];},Game_Battler['prototype'][_0x3a5d8e(0x740)]=function(){const _0x2a3180=_0x3a5d8e;SoundManager[_0x2a3180(0x786)](),this[_0x2a3180(0x7b4)](_0x2a3180(0x569));},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x4f1)]=Game_Actor[_0x3a5d8e(0x715)]['paramBase'],Game_Actor[_0x3a5d8e(0x715)][_0x3a5d8e(0x217)]=function(_0x3dfd75){const _0x2653f5=_0x3a5d8e;if(this[_0x2653f5(0x889)]>0x63)return this['paramBaseAboveLevel99'](_0x3dfd75);return VisuMZ[_0x2653f5(0x690)][_0x2653f5(0x4f1)]['call'](this,_0x3dfd75);},Game_Actor[_0x3a5d8e(0x715)][_0x3a5d8e(0x771)]=function(_0x4845f1){const _0x3d8369=_0x3a5d8e,_0xaf2170=this[_0x3d8369(0x256)]()[_0x3d8369(0x706)][_0x4845f1][0x63],_0x3b06b2=this['currentClass']()['params'][_0x4845f1][0x62];return _0xaf2170+(_0xaf2170-_0x3b06b2)*(this[_0x3d8369(0x889)]-0x63);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x84b)]=Game_Actor[_0x3a5d8e(0x715)][_0x3a5d8e(0x1e2)],Game_Actor[_0x3a5d8e(0x715)][_0x3a5d8e(0x1e2)]=function(_0x278bff,_0x253f4d){const _0x434f92=_0x3a5d8e;$gameTemp[_0x434f92(0x8d6)]=!![],VisuMZ[_0x434f92(0x690)][_0x434f92(0x84b)][_0x434f92(0x528)](this,_0x278bff,_0x253f4d),$gameTemp[_0x434f92(0x8d6)]=undefined;},VisuMZ[_0x3a5d8e(0x690)]['Game_Actor_levelUp']=Game_Actor[_0x3a5d8e(0x715)][_0x3a5d8e(0x401)],Game_Actor['prototype'][_0x3a5d8e(0x401)]=function(){const _0x2368c7=_0x3a5d8e;VisuMZ[_0x2368c7(0x690)][_0x2368c7(0x502)][_0x2368c7(0x528)](this);if(!$gameTemp[_0x2368c7(0x8d6)])this[_0x2368c7(0x154)]();},Game_Actor['prototype'][_0x3a5d8e(0x154)]=function(){const _0x43abd5=_0x3a5d8e;this[_0x43abd5(0x8c1)]={};if(VisuMZ['CoreEngine']['Settings']['QoL'][_0x43abd5(0x999)])this[_0x43abd5(0x6a4)]=this[_0x43abd5(0x4c6)];if(VisuMZ[_0x43abd5(0x690)][_0x43abd5(0x227)][_0x43abd5(0x169)][_0x43abd5(0x183)])this[_0x43abd5(0x719)]=this[_0x43abd5(0x497)];},Game_Actor[_0x3a5d8e(0x715)]['expRate']=function(){const _0x4079ed=_0x3a5d8e;if(this[_0x4079ed(0x4e2)]())return 0x1;const _0x501390=this[_0x4079ed(0x59b)]()-this['currentLevelExp'](),_0x2d8b1a=this[_0x4079ed(0x5a9)]()-this[_0x4079ed(0x57d)]();return(_0x2d8b1a/_0x501390)[_0x4079ed(0x2e9)](0x0,0x1);},Game_Actor[_0x3a5d8e(0x715)][_0x3a5d8e(0x330)]=function(){const _0x283113=_0x3a5d8e,_0x162ab4=Game_Battler[_0x283113(0x715)][_0x283113(0x330)][_0x283113(0x528)](this);for(const _0x5cf59a of this['equips']()){_0x5cf59a&&_0x162ab4[_0x283113(0x429)](_0x5cf59a);}return _0x162ab4[_0x283113(0x429)](this['currentClass'](),this['actor']()),_0x162ab4;},Object[_0x3a5d8e(0x5b0)](Game_Enemy[_0x3a5d8e(0x715)],_0x3a5d8e(0x889),{'get':function(){const _0x36ced8=_0x3a5d8e;return this[_0x36ced8(0x6f3)]();},'configurable':!![]}),Game_Enemy[_0x3a5d8e(0x715)][_0x3a5d8e(0x6f3)]=function(){const _0x266575=_0x3a5d8e;return this['enemy']()[_0x266575(0x889)];},Game_Enemy[_0x3a5d8e(0x715)][_0x3a5d8e(0x74e)]=function(){const _0x544eb6=_0x3a5d8e;if(!this['_repositioned']){this[_0x544eb6(0x20a)]+=Math[_0x544eb6(0x6dd)]((Graphics[_0x544eb6(0x223)]-0x270)/0x2),this[_0x544eb6(0x20a)]-=Math[_0x544eb6(0x3de)]((Graphics['height']-Graphics[_0x544eb6(0x8b0)])/0x2);if($gameSystem['isSideView']()){if('IdUHz'!==_0x544eb6(0x2df))this[_0x544eb6(0x735)]-=Math[_0x544eb6(0x3de)]((Graphics['width']-Graphics[_0x544eb6(0x87d)])/0x2);else{if(_0xbf66f9[_0x544eb6(0x8c0)]())return;_0x1bc85a[_0x544eb6(0x306)](_0x26e589,_0x9937d2);const _0x50089a=_0x2a45e5[_0x544eb6(0x84c)](_0x3bede3[_0x544eb6(0x584)],_0x594166[_0x544eb6(0x6b0)]),_0xd5b882=_0x3d5640['max'](_0x24ace0['StartID'],_0x5421d3[_0x544eb6(0x6b0)]),_0x2707e8=(_0x1ef247[_0x544eb6(0x760)]||0x0)/0x64;for(let _0x52eecd=_0x50089a;_0x52eecd<=_0xd5b882;_0x52eecd++){const _0x457f9c=_0x2b9199[_0x544eb6(0x33a)]()<=_0x2707e8;_0x38185f[_0x544eb6(0x869)](_0x52eecd,_0x457f9c);}}}else this['_screenX']+=Math[_0x544eb6(0x6dd)]((Graphics[_0x544eb6(0x87d)]-0x330)/0x2);}this[_0x544eb6(0x93e)]=!![];},Game_Party[_0x3a5d8e(0x715)][_0x3a5d8e(0x4c3)]=function(){const _0x8398=_0x3a5d8e;return VisuMZ[_0x8398(0x690)][_0x8398(0x227)][_0x8398(0x469)][_0x8398(0x6af)];},VisuMZ['CoreEngine'][_0x3a5d8e(0x221)]=Game_Party[_0x3a5d8e(0x715)]['consumeItem'],Game_Party[_0x3a5d8e(0x715)]['consumeItem']=function(_0x2c0501){const _0x30794a=_0x3a5d8e;if(VisuMZ['CoreEngine']['Settings'][_0x30794a(0x169)][_0x30794a(0x56b)]&&DataManager[_0x30794a(0x603)](_0x2c0501))return;VisuMZ[_0x30794a(0x690)]['Game_Party_consumeItem']['call'](this,_0x2c0501);},Game_Party['prototype'][_0x3a5d8e(0x42b)]=function(){const _0x657327=_0x3a5d8e,_0x30950a=VisuMZ[_0x657327(0x690)][_0x657327(0x227)][_0x657327(0x169)],_0x342de5=_0x30950a[_0x657327(0x7a7)]??0x63;let _0x4a7fff=[];(_0x30950a[_0x657327(0x1e6)]??!![])&&(_0x657327(0x73f)!==_0x657327(0x31d)?_0x4a7fff=_0x4a7fff[_0x657327(0x374)]($dataItems):(_0x516acc[_0x657327(0x843)]=_0x140d58,_0x58656e['playBgs'](_0x26c1d8)));(_0x30950a['BTestWeapons']??!![])&&('mzPUH'!==_0x657327(0x79d)?_0x4a7fff=_0x4a7fff['concat']($dataWeapons):_0x113e43+=_0x5a2188/0x2);(_0x30950a['BTestArmors']??!![])&&('OHGFw'!==_0x657327(0x958)?_0x3beff2[_0x657327(0x690)][_0x657327(0x227)]['QoL'][_0x657327(0x671)]&&(this[_0x657327(0x17d)]=![]):_0x4a7fff=_0x4a7fff[_0x657327(0x374)]($dataArmors));for(const _0x21f65c of _0x4a7fff){if(!_0x21f65c)continue;if(_0x21f65c[_0x657327(0x53e)][_0x657327(0x3ab)]()<=0x0)continue;if(_0x21f65c[_0x657327(0x53e)][_0x657327(0x4d7)](/-----/i))continue;this[_0x657327(0x2aa)](_0x21f65c,_0x342de5);}},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x14f)]=Game_Troop[_0x3a5d8e(0x715)][_0x3a5d8e(0x30b)],Game_Troop['prototype'][_0x3a5d8e(0x30b)]=function(_0x2cdab3){const _0x4f1642=_0x3a5d8e;$gameTemp[_0x4f1642(0x96f)](),$gameTemp[_0x4f1642(0x2d4)](_0x2cdab3),VisuMZ[_0x4f1642(0x690)]['Game_Troop_setup'][_0x4f1642(0x528)](this,_0x2cdab3);},VisuMZ['CoreEngine']['Game_Map_setup']=Game_Map['prototype']['setup'],Game_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x30b)]=function(_0x3dd5a7){const _0xf03675=_0x3a5d8e;VisuMZ['CoreEngine'][_0xf03675(0x53f)][_0xf03675(0x528)](this,_0x3dd5a7),this[_0xf03675(0x3f4)](),this['setupCoreEngine'](_0x3dd5a7);},Game_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x7d2)]=function(){const _0x1cd567=_0x3a5d8e;this[_0x1cd567(0x92c)]=VisuMZ['CoreEngine']['Settings'][_0x1cd567(0x169)][_0x1cd567(0x17e)]||![];const _0x1dd113=VisuMZ[_0x1cd567(0x690)][_0x1cd567(0x227)][_0x1cd567(0x5a2)],_0x29797d=$dataMap?$dataMap['note']||'':'';if(_0x29797d[_0x1cd567(0x4d7)](/<SHOW TILE SHADOWS>/i))this[_0x1cd567(0x92c)]=![];else _0x29797d[_0x1cd567(0x4d7)](/<HIDE TILE SHADOWS>/i)&&(this['_hideTileShadows']=!![]);if(_0x29797d[_0x1cd567(0x4d7)](/<SCROLL LOCK X>/i))this[_0x1cd567(0x5ca)]()[_0x1cd567(0x88e)]=!![],this['centerCameraCheckData']()['displayX']=_0x1dd113[_0x1cd567(0x40b)];else _0x29797d[_0x1cd567(0x4d7)](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x1cd567(0x5ca)]()[_0x1cd567(0x88e)]=!![],this['centerCameraCheckData']()['displayX']=Number(RegExp['$1']));if(_0x29797d[_0x1cd567(0x4d7)](/<SCROLL LOCK Y>/i))this[_0x1cd567(0x5ca)]()[_0x1cd567(0x2ed)]=!![],this[_0x1cd567(0x5ca)]()['displayY']=_0x1dd113[_0x1cd567(0x279)];else _0x29797d[_0x1cd567(0x4d7)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x1cd567(0x5ca)]()[_0x1cd567(0x2ed)]=!![],this[_0x1cd567(0x5ca)]()['displayY']=Number(RegExp['$1']));},Game_Map['prototype'][_0x3a5d8e(0x534)]=function(){const _0x423140=_0x3a5d8e;if(this[_0x423140(0x92c)]===undefined)this[_0x423140(0x7d2)]();return this['_hideTileShadows'];},Game_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x3f4)]=function(){const _0x517b70=_0x3a5d8e,_0x36ccf1=VisuMZ['CoreEngine']['Settings'][_0x517b70(0x5a2)];this[_0x517b70(0x748)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x36ccf1[_0x517b70(0x5fe)]){if(_0x517b70(0x901)!=='nETKD')this[_0x517b70(0x8c1)]={},_0x34c8d7['CoreEngine'][_0x517b70(0x51f)][_0x517b70(0x528)](this);else{const _0x2e3122=Graphics['width']/this[_0x517b70(0x53b)]();_0x2e3122%0x1!==0x0&&Math['ceil'](_0x2e3122)===this['width']()&&!this['isLoopHorizontal']()&&(this[_0x517b70(0x748)][_0x517b70(0x88e)]=!![],this[_0x517b70(0x748)][_0x517b70(0x637)]=_0x36ccf1[_0x517b70(0x40b)]||0x0);}}if(_0x36ccf1[_0x517b70(0x538)]){if('RTkZg'==='wrhse')this[_0x517b70(0x283)](_0x4f65f3['nickname'](),_0x4f8332,_0x4e4bf4,_0x362aee);else{const _0x1bf3fb=Graphics[_0x517b70(0x223)]/this['tileHeight']();_0x1bf3fb%0x1!==0x0&&Math[_0x517b70(0x2bd)](_0x1bf3fb)===this[_0x517b70(0x223)]()&&!this[_0x517b70(0x443)]()&&(this[_0x517b70(0x748)][_0x517b70(0x2ed)]=!![],this['_centerCameraCheck'][_0x517b70(0x27f)]=_0x36ccf1['DisplayLockY']||0x0);}}},Game_Map[_0x3a5d8e(0x715)]['centerCameraCheckData']=function(){const _0x5400bb=_0x3a5d8e;if(this[_0x5400bb(0x748)]===undefined)this[_0x5400bb(0x3f4)]();return this[_0x5400bb(0x748)];},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x50e)]=Game_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x66f)],Game_Map['prototype'][_0x3a5d8e(0x66f)]=function(_0x1152d3){const _0x28bee1=_0x3a5d8e;if(this[_0x28bee1(0x5ca)]()['centerY']&&$gameScreen[_0x28bee1(0x415)]()===0x1){this[_0x28bee1(0x288)]=this[_0x28bee1(0x5ca)]()['displayY'];return;}VisuMZ[_0x28bee1(0x690)]['Game_Map_scrollDown'][_0x28bee1(0x528)](this,_0x1152d3);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x3d2)]=Game_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x9a6)],Game_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x9a6)]=function(_0xa00a6d){const _0x648e41=_0x3a5d8e;if(this['centerCameraCheckData']()[_0x648e41(0x88e)]&&$gameScreen['zoomScale']()===0x1){this[_0x648e41(0x6ed)]=this[_0x648e41(0x5ca)]()[_0x648e41(0x637)];return;}VisuMZ[_0x648e41(0x690)][_0x648e41(0x3d2)][_0x648e41(0x528)](this,_0xa00a6d);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x654)]=Game_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x8ee)],Game_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x8ee)]=function(_0x537152){const _0x111e99=_0x3a5d8e;if(this[_0x111e99(0x5ca)]()[_0x111e99(0x88e)]&&$gameScreen['zoomScale']()===0x1){this[_0x111e99(0x6ed)]=this[_0x111e99(0x5ca)]()[_0x111e99(0x637)];return;}VisuMZ[_0x111e99(0x690)][_0x111e99(0x654)][_0x111e99(0x528)](this,_0x537152);},VisuMZ[_0x3a5d8e(0x690)]['Game_Map_scrollUp']=Game_Map[_0x3a5d8e(0x715)]['scrollUp'],Game_Map['prototype'][_0x3a5d8e(0x7b8)]=function(_0x56e5bd){const _0x2ba7ce=_0x3a5d8e;if(this['centerCameraCheckData']()[_0x2ba7ce(0x2ed)]&&$gameScreen[_0x2ba7ce(0x415)]()===0x1){this['_displayY']=this[_0x2ba7ce(0x5ca)]()[_0x2ba7ce(0x27f)];return;}VisuMZ[_0x2ba7ce(0x690)][_0x2ba7ce(0x2e5)][_0x2ba7ce(0x528)](this,_0x56e5bd);},VisuMZ[_0x3a5d8e(0x690)]['Game_Character_processMoveCommand']=Game_Character[_0x3a5d8e(0x715)]['processMoveCommand'],Game_Character[_0x3a5d8e(0x715)][_0x3a5d8e(0x835)]=function(_0x499e5d){const _0x372743=_0x3a5d8e;try{'BHtyH'===_0x372743(0x5ff)?VisuMZ[_0x372743(0x690)][_0x372743(0x49c)][_0x372743(0x528)](this,_0x499e5d):!_0x25a7ee[_0x372743(0x938)]()&&this[_0x372743(0x187)](_0x2f8fd8);}catch(_0x56ada1){if(_0x372743(0x8f4)===_0x372743(0x8f4)){if($gameTemp[_0x372743(0x583)]())console['log'](_0x56ada1);}else{const _0x355428=_0x39c4eb['ButtonAssist'];_0x355428[_0x372743(0x7a8)]=_0x355428[_0x372743(0x7a8)]||_0x372743(0x265),_0x355428[_0x372743(0x6c0)]=_0x355428[_0x372743(0x6c0)]||_0x372743(0x704);}}},Game_Player[_0x3a5d8e(0x715)][_0x3a5d8e(0x1d9)]=function(){const _0x5cf898=_0x3a5d8e,_0x14bc96=$gameMap['encounterStep']();this['_encounterCount']=Math[_0x5cf898(0x38e)](_0x14bc96)+Math[_0x5cf898(0x38e)](_0x14bc96)+this[_0x5cf898(0x213)]();},Game_Player[_0x3a5d8e(0x715)][_0x3a5d8e(0x213)]=function(){const _0x38222a=_0x3a5d8e;if($dataMap&&$dataMap[_0x38222a(0x6ff)]&&$dataMap[_0x38222a(0x6ff)][_0x38222a(0x4d7)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)){if(_0x38222a(0x979)===_0x38222a(0x819))(_0x1777e9>=_0x20b3d5||_0x50beca&&_0x1b5052===0x1)&&this['smoothSelect']((_0x5082b2-_0x47f70d+_0x51aa2e)%_0x56902a);else return Number(RegExp['$1']);}else{if('GOPcC'===_0x38222a(0x747))return VisuMZ[_0x38222a(0x690)][_0x38222a(0x227)][_0x38222a(0x169)][_0x38222a(0x358)];else this[_0x38222a(0x159)](_0x5320ff[_0x38222a(0x690)][_0x38222a(0x227)]['Gold'][_0x38222a(0x8b8)],_0x286d40['x'],_0x4902b8['y'],_0x3f6756[_0x38222a(0x89a)],_0x38222a(0x8ec));}},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x460)]=Game_Event['prototype'][_0x3a5d8e(0x44f)],Game_Event[_0x3a5d8e(0x715)][_0x3a5d8e(0x44f)]=function(_0x23dc9c,_0x58fc75){const _0x24f113=_0x3a5d8e;return this[_0x24f113(0x567)]()?this[_0x24f113(0x393)](_0x23dc9c,_0x58fc75):VisuMZ[_0x24f113(0x690)][_0x24f113(0x460)]['call'](this,_0x23dc9c,_0x58fc75);},Game_Event['prototype'][_0x3a5d8e(0x567)]=function(){const _0xde84f6=_0x3a5d8e;return VisuMZ['CoreEngine']['Settings'][_0xde84f6(0x169)][_0xde84f6(0x186)];},Game_Event[_0x3a5d8e(0x715)]['checkSmartEventCollision']=function(_0x3ba40d,_0x5213e){const _0x2ef92a=_0x3a5d8e;if(!this[_0x2ef92a(0x8d9)]()){if('ntcPS'===_0x2ef92a(0x41a))_0x191330[_0x2ef92a(0x1fd)]&&_0x5c1598['endAnimation']();else return![];}else{const _0x181e47=$gameMap['eventsXyNt'](_0x3ba40d,_0x5213e)[_0x2ef92a(0x40c)](_0x1324e6=>_0x1324e6[_0x2ef92a(0x8d9)]());return _0x181e47[_0x2ef92a(0x3fe)]>0x0;}},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x506)]=Game_Interpreter[_0x3a5d8e(0x715)][_0x3a5d8e(0x15f)],Game_Interpreter[_0x3a5d8e(0x715)][_0x3a5d8e(0x15f)]=function(_0xc4b584){const _0x536494=_0x3a5d8e,_0x2d6171=this[_0x536494(0x64a)]();if(_0x2d6171[_0x536494(0x4d7)](/\/\/[ ]SCRIPT[ ]CALL/i)){if(_0x536494(0x8d4)===_0x536494(0x194)){_0x1764b6-=_0x1334e9;if(_0x1efaab<=0x0)_0xa0f017=0x0;this[_0x536494(0x241)](_0x4d2b27);}else return this['runCombinedScrollingTextAsCode'](_0x2d6171);}else return VisuMZ[_0x536494(0x690)][_0x536494(0x506)][_0x536494(0x528)](this,_0xc4b584);},Game_Interpreter[_0x3a5d8e(0x715)][_0x3a5d8e(0x64a)]=function(){const _0x2fee8a=_0x3a5d8e;let _0x2b9b84='',_0x21e38f=this[_0x2fee8a(0x882)]+0x1;while(this[_0x2fee8a(0x400)][_0x21e38f]&&this[_0x2fee8a(0x400)][_0x21e38f]['code']===0x195){_0x2b9b84+=this[_0x2fee8a(0x400)][_0x21e38f][_0x2fee8a(0x16a)][0x0]+'\x0a',_0x21e38f++;}return _0x2b9b84;},Game_Interpreter[_0x3a5d8e(0x715)]['runCombinedScrollingTextAsCode']=function(_0x55a038){const _0x4b8050=_0x3a5d8e;try{if(_0x4b8050(0x1c6)===_0x4b8050(0x1c6))eval(_0x55a038);else var _0x155d79=_0x343f0c[_0x4b8050(0x5dd)](_0x5783df*0x2,_0x4b8050(0x6f0))*0.5;}catch(_0x4b087b){if(_0x4b8050(0x898)!==_0x4b8050(0x898))return this[_0x4b8050(0x3bb)]&&this[_0x4b8050(0x3bb)][_0x4b8050(0x2cd)]===_0xa17ed4;else $gameTemp[_0x4b8050(0x583)]()&&(console[_0x4b8050(0x298)](_0x4b8050(0x3d8)),console[_0x4b8050(0x298)](_0x4b087b));}return!![];},VisuMZ[_0x3a5d8e(0x690)]['Game_Interpreter_command111']=Game_Interpreter[_0x3a5d8e(0x715)]['command111'],Game_Interpreter['prototype'][_0x3a5d8e(0x641)]=function(_0x19e537){const _0x261ce7=_0x3a5d8e;try{VisuMZ[_0x261ce7(0x690)]['Game_Interpreter_command111'][_0x261ce7(0x528)](this,_0x19e537);}catch(_0x30e455){$gameTemp[_0x261ce7(0x583)]()&&(console[_0x261ce7(0x298)](_0x261ce7(0x271)),console[_0x261ce7(0x298)](_0x30e455)),this[_0x261ce7(0x270)]();}return!![];},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x58b)]=Game_Interpreter[_0x3a5d8e(0x715)]['command122'],Game_Interpreter[_0x3a5d8e(0x715)][_0x3a5d8e(0x60c)]=function(_0x32f7bd){const _0x1372b4=_0x3a5d8e;try{VisuMZ['CoreEngine'][_0x1372b4(0x58b)]['call'](this,_0x32f7bd);}catch(_0x3103b5){if(_0x1372b4(0x568)===_0x1372b4(0x568))$gameTemp['isPlaytest']()&&(console[_0x1372b4(0x298)]('Control\x20Variables\x20Script\x20Error'),console[_0x1372b4(0x298)](_0x3103b5));else{const _0x954a45=_0x1372b4(0x2f8);this[_0x1372b4(0x75b)][_0x1372b4(0x21f)](_0x4804cc)[_0x1372b4(0x21f)]('')[_0x1372b4(0x21f)](null);const _0x3888e8=this['_storedMapText'][_0x1372b4(0x713)](_0x1372b4(0x946))[_0x1372b4(0x3ab)]();_0x3469cd[_0x1372b4(0x690)][_0x1372b4(0x96a)](_0x3888e8,_0x954a45,!![]),_0x43a0a3[_0x1372b4(0x3bb)][_0x1372b4(0x7e9)]=!![];}}return!![];},VisuMZ['CoreEngine']['Game_Interpreter_command355']=Game_Interpreter[_0x3a5d8e(0x715)][_0x3a5d8e(0x7ed)],Game_Interpreter[_0x3a5d8e(0x715)][_0x3a5d8e(0x7ed)]=function(){const _0x445a73=_0x3a5d8e;try{_0x445a73(0x2ee)===_0x445a73(0x2a8)?_0x24da19[_0x445a73(0x943)](!![]):VisuMZ[_0x445a73(0x690)]['Game_Interpreter_command355']['call'](this);}catch(_0x7ac154){if('XNUVY'===_0x445a73(0x448))$gameTemp['isPlaytest']()&&(_0x445a73(0x325)===_0x445a73(0x572)?this[_0x445a73(0x43d)]&&(this[_0x445a73(0x5eb)]-=this[_0x445a73(0x8e5)](),this[_0x445a73(0x80b)]()&&(this[_0x445a73(0x43d)]=![])):(console[_0x445a73(0x298)]('Script\x20Call\x20Error'),console[_0x445a73(0x298)](_0x7ac154)));else return _0x5e57a0[_0x445a73(0x690)][_0x445a73(0x227)]['QoL'][_0x445a73(0x64b)];}return!![];},VisuMZ['CoreEngine'][_0x3a5d8e(0x50f)]=Game_Interpreter[_0x3a5d8e(0x715)][_0x3a5d8e(0x2f6)],Game_Interpreter[_0x3a5d8e(0x715)][_0x3a5d8e(0x2f6)]=function(_0x327d95){const _0x5a40c5=_0x3a5d8e;return $gameTemp[_0x5a40c5(0x744)](this),VisuMZ[_0x5a40c5(0x690)][_0x5a40c5(0x50f)][_0x5a40c5(0x528)](this,_0x327d95);},Scene_Base[_0x3a5d8e(0x715)]['fadeSpeed']=function(){const _0x49d08d=_0x3a5d8e;return VisuMZ[_0x49d08d(0x690)]['Settings']['UI'][_0x49d08d(0x8ce)];},Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x40a)]=function(){const _0x3a20e9=_0x3a5d8e;return VisuMZ[_0x3a20e9(0x690)][_0x3a20e9(0x227)]['UI']['BottomHelp'];},Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x54e)]=function(){const _0x43435d=_0x3a5d8e;return VisuMZ['CoreEngine'][_0x43435d(0x227)]['UI'][_0x43435d(0x202)];},Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x2fd)]=function(){const _0x4f81aa=_0x3a5d8e;return VisuMZ[_0x4f81aa(0x690)][_0x4f81aa(0x227)]['UI'][_0x4f81aa(0x926)];},Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x692)]=function(){const _0xcad364=_0x3a5d8e;return VisuMZ[_0xcad364(0x690)][_0xcad364(0x227)]['UI']['CommandWidth'];},Scene_Base['prototype'][_0x3a5d8e(0x848)]=function(){const _0x33b879=_0x3a5d8e;return VisuMZ[_0x33b879(0x690)]['Settings']['UI']['ButtonHeight'];},Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x179)]=function(){const _0x20e670=_0x3a5d8e;return VisuMZ['CoreEngine'][_0x20e670(0x227)]['Window']['EnableMasking'];},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x74a)]=Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x99d)],Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x99d)]=function(){const _0x3c59b1=_0x3a5d8e;VisuMZ[_0x3c59b1(0x690)][_0x3c59b1(0x74a)]['call'](this),this['createButtonAssistWindow'](),this['_windowLayer']['x']=Math['round'](this['_windowLayer']['x']),this['_windowLayer']['y']=Math[_0x3c59b1(0x6dd)](this[_0x3c59b1(0x613)]['y']);},Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x5f5)]=function(){},Scene_Base[_0x3a5d8e(0x715)]['buttonAssistKey1']=function(){const _0x3f2169=_0x3a5d8e;return TextManager[_0x3f2169(0x6de)](_0x3f2169(0x8c4),_0x3f2169(0x331));},Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x64c)]=function(){const _0x3b95f6=_0x3a5d8e;return TextManager[_0x3b95f6(0x3dd)](_0x3b95f6(0x3a4));},Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x8a7)]=function(){const _0x503b99=_0x3a5d8e;return TextManager[_0x503b99(0x3dd)]('shift');},Scene_Base['prototype'][_0x3a5d8e(0x323)]=function(){const _0x4ab636=_0x3a5d8e;return TextManager[_0x4ab636(0x3dd)]('ok');},Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x606)]=function(){const _0x4395ff=_0x3a5d8e;return TextManager[_0x4395ff(0x3dd)](_0x4395ff(0x37d));},Scene_Base[_0x3a5d8e(0x715)]['buttonAssistText1']=function(){const _0x45bff4=_0x3a5d8e;return this[_0x45bff4(0x226)]&&this['_pageupButton'][_0x45bff4(0x8c3)]?TextManager[_0x45bff4(0x35d)]:'';},Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x6b7)]=function(){return'';},Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x763)]=function(){return'';},Scene_Base['prototype'][_0x3a5d8e(0x6c5)]=function(){const _0x331a26=_0x3a5d8e;return TextManager[_0x331a26(0x3b9)];},Scene_Base[_0x3a5d8e(0x715)]['buttonAssistText5']=function(){const _0x4529df=_0x3a5d8e;return TextManager[_0x4529df(0x52d)];},Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x243)]=function(){return 0x0;},Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x161)]=function(){return 0x0;},Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x7ab)]=function(){return 0x0;},Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x6a8)]=function(){return 0x0;},Scene_Base[_0x3a5d8e(0x715)]['buttonAssistOffset5']=function(){return 0x0;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x1e3)]=Scene_Boot['prototype'][_0x3a5d8e(0x736)],Scene_Boot['prototype']['loadSystemImages']=function(){const _0x509745=_0x3a5d8e;VisuMZ[_0x509745(0x690)][_0x509745(0x1e3)][_0x509745(0x528)](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x3a5d8e(0x715)][_0x3a5d8e(0x620)]=function(){const _0x4e08b5=_0x3a5d8e,_0x535222=[_0x4e08b5(0x2ad),_0x4e08b5(0x790),_0x4e08b5(0x17f),_0x4e08b5(0x7ff),_0x4e08b5(0x54f),_0x4e08b5(0x90e),_0x4e08b5(0x376),_0x4e08b5(0x617),_0x4e08b5(0x7d9),_0x4e08b5(0x841),_0x4e08b5(0x94a),_0x4e08b5(0x18b),_0x4e08b5(0x4af),_0x4e08b5(0x959)];for(const _0x131cc5 of _0x535222){const _0x5cd0c8=VisuMZ[_0x4e08b5(0x690)][_0x4e08b5(0x227)][_0x4e08b5(0x482)][_0x131cc5],_0x1baca9=_0x4e08b5(0x818)[_0x4e08b5(0x5a1)](_0x131cc5);for(const _0x3f755b of _0x5cd0c8){ImageManager[_0x4e08b5(0x90f)](_0x1baca9,_0x3f755b);}}},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x509)]=Scene_Boot['prototype'][_0x3a5d8e(0x4dd)],Scene_Boot[_0x3a5d8e(0x715)][_0x3a5d8e(0x4dd)]=function(){const _0x4cb56f=_0x3a5d8e;if(Utils[_0x4cb56f(0x452)](_0x4cb56f(0x3ef))&&VisuMZ[_0x4cb56f(0x690)][_0x4cb56f(0x227)][_0x4cb56f(0x169)]['NewGameBoot'])this[_0x4cb56f(0x259)]();else{if(_0x4cb56f(0x46d)===_0x4cb56f(0x98a)){if(this[_0x4cb56f(0x889)]>0x63)return this[_0x4cb56f(0x771)](_0x2b6874);return _0x2e7919[_0x4cb56f(0x690)][_0x4cb56f(0x4f1)]['call'](this,_0x30e7f1);}else VisuMZ[_0x4cb56f(0x690)][_0x4cb56f(0x509)]['call'](this);}},Scene_Boot[_0x3a5d8e(0x715)][_0x3a5d8e(0x259)]=function(){const _0x54cbc6=_0x3a5d8e;DataManager[_0x54cbc6(0x939)](),SceneManager[_0x54cbc6(0x43e)](Scene_Map);},Scene_Boot[_0x3a5d8e(0x715)][_0x3a5d8e(0x686)]=function(){const _0x36634f=_0x3a5d8e,_0x2c0103=$dataSystem[_0x36634f(0x563)][_0x36634f(0x8ff)],_0x3fe384=$dataSystem[_0x36634f(0x563)][_0x36634f(0x260)],_0x200591=VisuMZ[_0x36634f(0x690)]['Settings']['UI']['BoxMargin'];Graphics[_0x36634f(0x87d)]=_0x2c0103-_0x200591*0x2,Graphics['boxHeight']=_0x3fe384-_0x200591*0x2,this[_0x36634f(0x2c0)]();},VisuMZ[_0x3a5d8e(0x690)]['Scene_Boot_updateDocumentTitle']=Scene_Boot['prototype'][_0x3a5d8e(0x55c)],Scene_Boot[_0x3a5d8e(0x715)][_0x3a5d8e(0x55c)]=function(){const _0x45d519=_0x3a5d8e;this['isFullDocumentTitle']()?_0x45d519(0x366)==='gAqnr'?this[_0x45d519(0x800)]():this[_0x45d519(0x566)]():VisuMZ[_0x45d519(0x690)][_0x45d519(0x532)][_0x45d519(0x528)](this);},Scene_Boot[_0x3a5d8e(0x715)][_0x3a5d8e(0x5a8)]=function(){const _0x42c84e=_0x3a5d8e;if(Scene_Title['subtitle']==='')return![];if(Scene_Title[_0x42c84e(0x7db)]===_0x42c84e(0x929))return![];if(Scene_Title[_0x42c84e(0x19e)]==='')return![];if(Scene_Title[_0x42c84e(0x19e)]==='0.00')return![];return!![];},Scene_Boot['prototype'][_0x3a5d8e(0x800)]=function(){const _0x1f3381=_0x3a5d8e,_0x584ab8=$dataSystem[_0x1f3381(0x3df)],_0x4b1195=Scene_Title[_0x1f3381(0x7db)]||'',_0x1cdad0=Scene_Title[_0x1f3381(0x19e)]||'',_0x3cf4b3=VisuMZ[_0x1f3381(0x690)]['Settings']['MenuLayout'][_0x1f3381(0x7f4)]['DocumentTitleFmt'],_0x1c41fd=_0x3cf4b3[_0x1f3381(0x5a1)](_0x584ab8,_0x4b1195,_0x1cdad0);document[_0x1f3381(0x801)]=_0x1c41fd;},Scene_Boot['prototype'][_0x3a5d8e(0x2c0)]=function(){const _0x386f09=_0x3a5d8e;if(VisuMZ[_0x386f09(0x690)][_0x386f09(0x227)]['UI'][_0x386f09(0x945)]){const _0x1b162b=Graphics[_0x386f09(0x89a)]-Graphics[_0x386f09(0x87d)]-VisuMZ[_0x386f09(0x690)][_0x386f09(0x227)]['UI'][_0x386f09(0x5c9)]*0x2,_0x24b5b9=Sprite_Button[_0x386f09(0x715)][_0x386f09(0x2fa)][_0x386f09(0x528)](this)*0x4;if(_0x1b162b>=_0x24b5b9)SceneManager[_0x386f09(0x5e2)](!![]);}},Scene_Title[_0x3a5d8e(0x7db)]=VisuMZ['CoreEngine']['Settings'][_0x3a5d8e(0x4bd)]['Title'][_0x3a5d8e(0x929)],Scene_Title[_0x3a5d8e(0x19e)]=VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x227)][_0x3a5d8e(0x4bd)]['Title']['Version'],Scene_Title['pictureButtons']=VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x227)][_0x3a5d8e(0x592)],VisuMZ['CoreEngine'][_0x3a5d8e(0x158)]=Scene_Title[_0x3a5d8e(0x715)][_0x3a5d8e(0x5ab)],Scene_Title[_0x3a5d8e(0x715)][_0x3a5d8e(0x5ab)]=function(){const _0x23aeaf=_0x3a5d8e;VisuMZ[_0x23aeaf(0x690)][_0x23aeaf(0x227)][_0x23aeaf(0x4bd)][_0x23aeaf(0x7f4)][_0x23aeaf(0x5ab)]['call'](this);if(Scene_Title[_0x23aeaf(0x7db)]!==''&&Scene_Title[_0x23aeaf(0x7db)]!==_0x23aeaf(0x929))this['drawGameSubtitle']();if(Scene_Title[_0x23aeaf(0x19e)]!==''&&Scene_Title['version']!==_0x23aeaf(0x80c))this['drawGameVersion']();},Scene_Title[_0x3a5d8e(0x715)][_0x3a5d8e(0x45e)]=function(){const _0x4611e5=_0x3a5d8e;VisuMZ['CoreEngine']['Settings']['MenuLayout'][_0x4611e5(0x7f4)][_0x4611e5(0x45e)][_0x4611e5(0x528)](this);},Scene_Title[_0x3a5d8e(0x715)]['drawGameVersion']=function(){const _0x58c42b=_0x3a5d8e;VisuMZ['CoreEngine'][_0x58c42b(0x227)]['MenuLayout'][_0x58c42b(0x7f4)][_0x58c42b(0x5b9)][_0x58c42b(0x528)](this);},Scene_Title[_0x3a5d8e(0x715)][_0x3a5d8e(0x34a)]=function(){const _0x1b0f0d=_0x3a5d8e;this[_0x1b0f0d(0x1ef)]();const _0x5c40ad=$dataSystem[_0x1b0f0d(0x656)][_0x1b0f0d(0x363)],_0x32bf12=this[_0x1b0f0d(0x29e)]();this[_0x1b0f0d(0x7e0)]=new Window_TitleCommand(_0x32bf12),this[_0x1b0f0d(0x7e0)][_0x1b0f0d(0x357)](_0x5c40ad);const _0x2393cc=this[_0x1b0f0d(0x29e)]();this[_0x1b0f0d(0x7e0)][_0x1b0f0d(0x98d)](_0x2393cc['x'],_0x2393cc['y'],_0x2393cc[_0x1b0f0d(0x89a)],_0x2393cc['height']),this[_0x1b0f0d(0x6d9)](this[_0x1b0f0d(0x7e0)]);},Scene_Title['prototype']['commandWindowRows']=function(){const _0x38f46e=_0x3a5d8e;if(this[_0x38f46e(0x7e0)])return _0x38f46e(0x2ef)===_0x38f46e(0x4f6)?this[_0x38f46e(0x7e0)]?this[_0x38f46e(0x7e0)][_0x38f46e(0x5c5)]():_0x250613[_0x38f46e(0x690)]['Settings'][_0x38f46e(0x75a)][_0x38f46e(0x3fe)]:this[_0x38f46e(0x7e0)][_0x38f46e(0x5c5)]();else{if(_0x38f46e(0x445)!==_0x38f46e(0x445)){_0x50e20f+=_0xd3fc31;if(_0x104996>=_0x48ea82)_0x3d83e8=_0x45e497-0x1;this[_0x38f46e(0x241)](_0x48b9af);}else return VisuMZ[_0x38f46e(0x690)]['Settings'][_0x38f46e(0x75a)][_0x38f46e(0x3fe)];}},Scene_Title['prototype'][_0x3a5d8e(0x29e)]=function(){const _0x2c3c3a=_0x3a5d8e;return VisuMZ[_0x2c3c3a(0x690)][_0x2c3c3a(0x227)][_0x2c3c3a(0x4bd)][_0x2c3c3a(0x7f4)][_0x2c3c3a(0x417)][_0x2c3c3a(0x528)](this);},Scene_Title[_0x3a5d8e(0x715)][_0x3a5d8e(0x1ef)]=function(){const _0x4e22d3=_0x3a5d8e;for(const _0x3a588c of Scene_Title[_0x4e22d3(0x177)]){const _0xbb3637=new Sprite_TitlePictureButton(_0x3a588c);this[_0x4e22d3(0x162)](_0xbb3637);}},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x317)]=Scene_Map[_0x3a5d8e(0x715)]['initialize'],Scene_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x36e)]=function(){const _0x1c77f9=_0x3a5d8e;VisuMZ[_0x1c77f9(0x690)]['Scene_Map_initialize'][_0x1c77f9(0x528)](this),$gameTemp[_0x1c77f9(0x96f)](),this[_0x1c77f9(0x8ea)]();},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x3e2)]=Scene_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x2a9)],Scene_Map['prototype']['updateMainMultiply']=function(){const _0x2befda=_0x3a5d8e;VisuMZ[_0x2befda(0x690)][_0x2befda(0x3e2)][_0x2befda(0x528)](this),$gameTemp[_0x2befda(0x6db)]&&!$gameMessage[_0x2befda(0x961)]()&&(this[_0x2befda(0x67c)](),SceneManager['updateEffekseer']());},Scene_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x53a)]=function(){const _0x39d457=_0x3a5d8e;Scene_Message[_0x39d457(0x715)][_0x39d457(0x53a)]['call'](this),!SceneManager[_0x39d457(0x71d)](Scene_Battle)&&(this[_0x39d457(0x91e)]['update'](),this[_0x39d457(0x55a)]['hide'](),this[_0x39d457(0x613)][_0x39d457(0x8c3)]=![],SceneManager['snapForBackground']()),$gameScreen[_0x39d457(0x4c1)](),this[_0x39d457(0x8ea)]();},VisuMZ[_0x3a5d8e(0x690)]['Scene_Map_createMenuButton']=Scene_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x489)],Scene_Map[_0x3a5d8e(0x715)]['createMenuButton']=function(){const _0x42153a=_0x3a5d8e;VisuMZ[_0x42153a(0x690)][_0x42153a(0x982)][_0x42153a(0x528)](this),SceneManager[_0x42153a(0x340)]()&&(_0x42153a(0x465)!=='kkliV'?this[_0x42153a(0x913)]():this[_0x42153a(0x957)]=_0x42153a(0x888));},Scene_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x913)]=function(){const _0x3e4c6a=_0x3a5d8e;this[_0x3e4c6a(0x73a)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x3a5d8e(0x690)]['Scene_Map_updateScene']=Scene_Map['prototype'][_0x3a5d8e(0x7b2)],Scene_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x7b2)]=function(){const _0x247e23=_0x3a5d8e;VisuMZ[_0x247e23(0x690)][_0x247e23(0x86d)]['call'](this),this[_0x247e23(0x496)]();},Scene_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x496)]=function(){const _0x2b6579=_0x3a5d8e;if(Input[_0x2b6579(0x873)](_0x2b6579(0x25f))){if(_0x2b6579(0x531)===_0x2b6579(0x531))ConfigManager[_0x2b6579(0x556)]=!ConfigManager[_0x2b6579(0x556)],ConfigManager[_0x2b6579(0x6b5)]();else return _0x47a779[_0x2b6579(0x900)]()?_0x3eb71e[_0x2b6579(0x900)]()[_0x2b6579(0x6a1)](_0x384725):_0x45108b[_0x2b6579(0x715)][_0x2b6579(0x536)][_0x2b6579(0x528)](this,_0x5c3cfb);}},VisuMZ[_0x3a5d8e(0x690)]['Scene_Map_updateMain']=Scene_Map['prototype'][_0x3a5d8e(0x67c)],Scene_Map[_0x3a5d8e(0x715)]['updateMain']=function(){const _0x33a5ea=_0x3a5d8e;VisuMZ[_0x33a5ea(0x690)]['Scene_Map_updateMain']['call'](this),this['updateOnceParallelInterpreters']();},Scene_Map[_0x3a5d8e(0x715)]['clearOnceParallelInterpreters']=function(){this['_onceParallelInterpreters']=[];},Scene_Map['prototype']['updateOnceParallelInterpreters']=function(){const _0xa772f3=_0x3a5d8e;if(!this[_0xa772f3(0x782)])return;for(const _0x488440 of this[_0xa772f3(0x782)]){if('ffkfH'===_0xa772f3(0x4ef))_0x488440&&_0x488440['update']();else{_0x41e837['CoreEngine'][_0xa772f3(0x57c)][_0xa772f3(0x528)](this);if(this['_animation'][_0xa772f3(0x42f)]===0x3){if(this['x']===0x0)this['x']=_0x3851cb[_0xa772f3(0x6dd)](_0x20064e[_0xa772f3(0x89a)]/0x2);if(this['y']===0x0)this['y']=_0x5be126[_0xa772f3(0x6dd)](_0x25c977[_0xa772f3(0x223)]/0x2);}}}},Scene_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x527)]=function(_0x28ec25){const _0x7fa3fe=_0x3a5d8e,_0x3f2bcb=$dataCommonEvents[_0x28ec25];if(!_0x3f2bcb)return;const _0x1d1c44=new Game_OnceParallelInterpreter();this['addOnceParallelInterpreter'](_0x1d1c44),_0x1d1c44[_0x7fa3fe(0x564)](_0x28ec25);},Scene_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x3af)]=function(_0x23b33d){const _0x1a4ed0=_0x3a5d8e;this[_0x1a4ed0(0x782)]=this[_0x1a4ed0(0x782)]||[],this[_0x1a4ed0(0x782)][_0x1a4ed0(0x429)](_0x23b33d);},Scene_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x59f)]=function(_0x1b3199){const _0x533111=_0x3a5d8e;this[_0x533111(0x782)]=this[_0x533111(0x782)]||[],this[_0x533111(0x782)][_0x533111(0x21f)](_0x1b3199);};function Game_OnceParallelInterpreter(){const _0x52e1f0=_0x3a5d8e;this[_0x52e1f0(0x36e)](...arguments);}Game_OnceParallelInterpreter[_0x3a5d8e(0x715)]=Object[_0x3a5d8e(0x1e9)](Game_Interpreter[_0x3a5d8e(0x715)]),Game_OnceParallelInterpreter[_0x3a5d8e(0x715)]['constructor']=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x3a5d8e(0x715)][_0x3a5d8e(0x564)]=function(_0x35b1ab){const _0x3efcaf=_0x3a5d8e,_0x4b17e9=$dataCommonEvents[_0x35b1ab];if(_0x4b17e9)this[_0x3efcaf(0x30b)](_0x4b17e9[_0x3efcaf(0x521)],0x0);else{if(_0x3efcaf(0x685)==='pxeFx')this[_0x3efcaf(0x53a)]();else{if(_0x36aa6f===_0x332b7d&&_0x1dae02%0x1===0x0)return _0x1361f3;if(_0x5d7b27!==_0x525fbc&&[_0x3efcaf(0x188),_0x3efcaf(0x229),'ATK',_0x3efcaf(0x977),_0x3efcaf(0x856),_0x3efcaf(0x97c),_0x3efcaf(0x833),_0x3efcaf(0x4ed)][_0x3efcaf(0x2c6)](_0x466a39(_0x34d9e9)[_0x3efcaf(0x987)]()[_0x3efcaf(0x3ab)]()))return _0x48e93b;_0x3387ca=_0x22a5f1||0x0;if(_0x1adf6d['CoreEngine'][_0x3efcaf(0x409)][_0xe50d66])return _0x1a3bc5[_0x3efcaf(0x690)][_0x3efcaf(0x670)][_0x3a87f2]===_0x3efcaf(0x348)?_0x2225d1:_0x4fab57((_0x222751*0x64)['toFixed'](_0x1697b5))+'%';return _0x21e66e((_0x1e4bbf*0x64)['toFixed'](_0x536499))+'%';}}},Game_OnceParallelInterpreter[_0x3a5d8e(0x715)][_0x3a5d8e(0x53a)]=function(){const _0x5ae6d4=_0x3a5d8e;if(!SceneManager[_0x5ae6d4(0x648)]())return;SceneManager[_0x5ae6d4(0x3bb)][_0x5ae6d4(0x59f)](this),Game_Interpreter[_0x5ae6d4(0x715)][_0x5ae6d4(0x53a)]['call'](this);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x70e)]=Scene_MenuBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x96b)],Scene_MenuBase[_0x3a5d8e(0x715)]['helpAreaTop']=function(){const _0x28e366=_0x3a5d8e;let _0x1d4b4d=0x0;if(SceneManager[_0x28e366(0x360)]()){if(_0x28e366(0x838)!==_0x28e366(0x838))for(const _0x546ddd of _0x53a4a5['_commandList']){if(_0x546ddd[_0x28e366(0x287)][_0x28e366(0x528)](this)){const _0x589214=_0x546ddd[_0x28e366(0x153)];let _0x25ae71=_0x546ddd['TextStr'];if(['','Untitled'][_0x28e366(0x2c6)](_0x25ae71))_0x25ae71=_0x546ddd[_0x28e366(0x5d8)]['call'](this);const _0xb6e657=_0x546ddd[_0x28e366(0x457)][_0x28e366(0x528)](this),_0x1d6b08=_0x546ddd['ExtJS']['call'](this);this['addCommand'](_0x25ae71,_0x589214,_0xb6e657,_0x1d6b08),this[_0x28e366(0x390)](_0x589214,_0x546ddd[_0x28e366(0x907)][_0x28e366(0x8b1)](this,_0x1d6b08));}}else _0x1d4b4d=this['helpAreaTopSideButtonLayout']();}else _0x1d4b4d=VisuMZ[_0x28e366(0x690)]['Scene_MenuBase_helpAreaTop'][_0x28e366(0x528)](this);return _0x1d4b4d;},Scene_MenuBase['prototype'][_0x3a5d8e(0x72d)]=function(){const _0x2d1b9c=_0x3a5d8e;if(this[_0x2d1b9c(0x40a)]()){if('iWdJE'!==_0x2d1b9c(0x973))return this[_0x2d1b9c(0x995)]();else _0x7059df[_0x2d1b9c(0x690)]['Graphics_centerElement'][_0x2d1b9c(0x528)](this,_0x272bb9),this[_0x2d1b9c(0x290)](_0x587587);}else return 0x0;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x3d4)]=Scene_MenuBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x4f3)],Scene_MenuBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x4f3)]=function(){const _0x1937b2=_0x3a5d8e;return SceneManager[_0x1937b2(0x360)]()?this[_0x1937b2(0x3b2)]():VisuMZ[_0x1937b2(0x690)][_0x1937b2(0x3d4)][_0x1937b2(0x528)](this);},Scene_MenuBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x3b2)]=function(){const _0xd5383d=_0x3a5d8e;if(!this[_0xd5383d(0x40a)]())return this[_0xd5383d(0x7f8)]();else{if(this[_0xd5383d(0x5df)]()&&this['getButtonAssistLocation']()===_0xd5383d(0x24b))return'gaGTS'!==_0xd5383d(0x20c)?Window_ButtonAssist[_0xd5383d(0x715)][_0xd5383d(0x66d)]():this['_pageupButton']&&this['_pageupButton'][_0xd5383d(0x8c3)]?_0x42f9d1['buttonAssistSwitch']:'';else{if(_0xd5383d(0x23f)==='rLqbJ')return 0x0;else _0x114e11[_0xd5383d(0x690)][_0xd5383d(0x761)][_0xd5383d(0x528)](this,_0x16330a,_0x36a286,_0x4a6c26,_0x15f66c),this[_0xd5383d(0x353)]();}}},VisuMZ[_0x3a5d8e(0x690)]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase['prototype'][_0x3a5d8e(0x293)],Scene_MenuBase['prototype']['mainAreaHeight']=function(){const _0x489ef8=_0x3a5d8e;let _0x58d139=0x0;if(SceneManager[_0x489ef8(0x360)]()){if(_0x489ef8(0x52a)===_0x489ef8(0x4b3)){this[_0x489ef8(0x288)]=this[_0x489ef8(0x5ca)]()['displayY'];return;}else _0x58d139=this[_0x489ef8(0x423)]();}else _0x58d139=VisuMZ[_0x489ef8(0x690)][_0x489ef8(0x85b)][_0x489ef8(0x528)](this);return this[_0x489ef8(0x5df)]()&&this['getButtonAssistLocation']()!=='button'&&(_0x58d139-=Window_ButtonAssist[_0x489ef8(0x715)]['lineHeight']()),_0x58d139;},Scene_MenuBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x423)]=function(){const _0x2a4dbb=_0x3a5d8e;return Graphics[_0x2a4dbb(0x8b0)]-this[_0x2a4dbb(0x31f)]();},VisuMZ[_0x3a5d8e(0x690)]['Scene_MenuBase_createBackground']=Scene_MenuBase['prototype'][_0x3a5d8e(0x1d6)],Scene_MenuBase['prototype'][_0x3a5d8e(0x1d6)]=function(){const _0x5eb437=_0x3a5d8e;this['_backgroundFilter']=new PIXI[(_0x5eb437(0x797))][(_0x5eb437(0x5fa))](clamp=!![]),this[_0x5eb437(0x389)]=new Sprite(),this[_0x5eb437(0x389)]['bitmap']=SceneManager['backgroundBitmap'](),this[_0x5eb437(0x389)][_0x5eb437(0x797)]=[this[_0x5eb437(0x5b5)]],this[_0x5eb437(0x162)](this[_0x5eb437(0x389)]),this[_0x5eb437(0x636)](0xc0),this[_0x5eb437(0x636)](this[_0x5eb437(0x6c6)]()),this[_0x5eb437(0x272)]();},Scene_MenuBase['prototype'][_0x3a5d8e(0x6c6)]=function(){const _0x2898b7=_0x3a5d8e,_0x398584=String(this[_0x2898b7(0x2cd)][_0x2898b7(0x53e)]),_0x100094=this[_0x2898b7(0x887)](_0x398584);return _0x100094?_0x100094[_0x2898b7(0x546)]:0xc0;},Scene_MenuBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x272)]=function(){const _0x15dd07=_0x3a5d8e,_0x413764=String(this['constructor']['name']),_0x3c4370=this['getCustomBackgroundSettings'](_0x413764);_0x3c4370&&(_0x3c4370[_0x15dd07(0x519)]!==''||_0x3c4370[_0x15dd07(0x373)]!=='')&&(this[_0x15dd07(0x717)]=new Sprite(ImageManager[_0x15dd07(0x2ac)](_0x3c4370[_0x15dd07(0x519)])),this[_0x15dd07(0x93a)]=new Sprite(ImageManager[_0x15dd07(0x176)](_0x3c4370[_0x15dd07(0x373)])),this[_0x15dd07(0x162)](this[_0x15dd07(0x717)]),this[_0x15dd07(0x162)](this[_0x15dd07(0x93a)]),this[_0x15dd07(0x717)][_0x15dd07(0x247)][_0x15dd07(0x618)](this[_0x15dd07(0x8f0)][_0x15dd07(0x8b1)](this,this[_0x15dd07(0x717)])),this[_0x15dd07(0x93a)]['bitmap'][_0x15dd07(0x618)](this[_0x15dd07(0x8f0)]['bind'](this,this[_0x15dd07(0x93a)])));},Scene_MenuBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x887)]=function(_0xd5e7e5){const _0x11b1ab=_0x3a5d8e;return VisuMZ[_0x11b1ab(0x690)][_0x11b1ab(0x227)][_0x11b1ab(0x43b)][_0xd5e7e5]||VisuMZ[_0x11b1ab(0x690)]['Settings'][_0x11b1ab(0x43b)]['Scene_Unlisted'];},Scene_MenuBase[_0x3a5d8e(0x715)]['adjustSprite']=function(_0xcb38ee){const _0x398cd7=_0x3a5d8e;this[_0x398cd7(0x918)](_0xcb38ee),this[_0x398cd7(0x526)](_0xcb38ee);},VisuMZ['CoreEngine'][_0x3a5d8e(0x6e9)]=Scene_MenuBase[_0x3a5d8e(0x715)]['createCancelButton'],Scene_MenuBase['prototype'][_0x3a5d8e(0x899)]=function(){const _0x458319=_0x3a5d8e;VisuMZ['CoreEngine'][_0x458319(0x6e9)]['call'](this);if(SceneManager[_0x458319(0x340)]()){if(_0x458319(0x8e3)!==_0x458319(0x8e3)){if(this[_0x458319(0x1da)]<=0x0)return;const _0x5cdd39=this[_0x458319(0x1da)],_0xe270d4=this[_0x458319(0x55d)],_0x205764=this[_0x458319(0x236)];this[_0x458319(0x425)]=this[_0x458319(0x67b)](this[_0x458319(0x425)],this[_0x458319(0x3e7)],_0x5cdd39,_0xe270d4,_0x205764),this['_offsetY']=this['applyEasing'](this[_0x458319(0x8c8)],this[_0x458319(0x698)],_0x5cdd39,_0xe270d4,_0x205764),this[_0x458319(0x1da)]--;if(this['_movementDuration']<=0x0)this[_0x458319(0x27c)]();}else this[_0x458319(0x49b)]();}},Scene_MenuBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x49b)]=function(){const _0x4cd2b4=_0x3a5d8e;this[_0x4cd2b4(0x1b5)]['x']=Graphics[_0x4cd2b4(0x87d)]+0x4;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x3d5)]=Scene_MenuBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x199)],Scene_MenuBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x199)]=function(){const _0x35b2a5=_0x3a5d8e;VisuMZ['CoreEngine']['Scene_MenuBase_createPageButtons']['call'](this),SceneManager[_0x35b2a5(0x340)]()&&this[_0x35b2a5(0x513)]();},Scene_MenuBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x513)]=function(){const _0x3bc29a=_0x3a5d8e;this[_0x3bc29a(0x226)]['x']=-0x1*(this[_0x3bc29a(0x226)]['width']+this['_pagedownButton'][_0x3bc29a(0x89a)]+0x8),this[_0x3bc29a(0x631)]['x']=-0x1*(this[_0x3bc29a(0x631)][_0x3bc29a(0x89a)]+0x4);},Scene_MenuBase['prototype'][_0x3a5d8e(0x5df)]=function(){const _0x4a32c4=_0x3a5d8e;return VisuMZ['CoreEngine'][_0x4a32c4(0x227)][_0x4a32c4(0x947)][_0x4a32c4(0x8ef)];},Scene_MenuBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x8a6)]=function(){const _0xdf0ccf=_0x3a5d8e;if(SceneManager[_0xdf0ccf(0x340)]()||SceneManager[_0xdf0ccf(0x6ab)]()){if('lUGfb'!==_0xdf0ccf(0x273))return VisuMZ[_0xdf0ccf(0x690)][_0xdf0ccf(0x227)][_0xdf0ccf(0x947)]['Location'];else _0x2b7b41*=_0x309f27(_0x155777);}else{if(_0xdf0ccf(0x86b)===_0xdf0ccf(0x86b))return'button';else this['_lastGamepad']=_0x2c04f4;}},Scene_MenuBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x5f5)]=function(){const _0x3d390a=_0x3a5d8e;if(!this[_0x3d390a(0x5df)]())return;const _0x313bd0=this['buttonAssistWindowRect']();this[_0x3d390a(0x664)]=new Window_ButtonAssist(_0x313bd0),this['addWindow'](this[_0x3d390a(0x664)]);},Scene_MenuBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x32d)]=function(){const _0x102e1a=_0x3a5d8e;if(this['getButtonAssistLocation']()===_0x102e1a(0x19c)){if(_0x102e1a(0x5fc)===_0x102e1a(0x5fc))return this[_0x102e1a(0x1ff)]();else{_0x2c15d5[_0x102e1a(0x690)][_0x102e1a(0x227)][_0x102e1a(0x169)][_0x102e1a(0x6fc)]&&(_0x57c8c1[_0x102e1a(0x414)][_0x102e1a(0x277)]=_0x102e1a(0x737));_0x579d83[_0x102e1a(0x690)]['Settings'][_0x102e1a(0x169)][_0x102e1a(0x21c)]&&(_0x56cad2[_0x102e1a(0x414)][_0x102e1a(0x237)]='pixelated');const _0x76dc05=_0x3e46e3[_0x102e1a(0x2bb)](0x0,_0x5465a2['floor'](_0x184a2f['width']*this[_0x102e1a(0x329)])),_0x4ea23e=_0x5de40f[_0x102e1a(0x2bb)](0x0,_0x12d4a5['floor'](_0x4208e0[_0x102e1a(0x223)]*this['_realScale']));_0x312573[_0x102e1a(0x414)][_0x102e1a(0x89a)]=_0x76dc05+'px',_0x2ac039['style']['height']=_0x4ea23e+'px';}}else{if(_0x102e1a(0x292)===_0x102e1a(0x292))return this['buttonAssistWindowSideRect']();else this[_0x102e1a(0x159)](_0x1f6790,_0x3a14e4,_0x3d9b23,_0x192f28);}},Scene_MenuBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x1ff)]=function(){const _0x3ca0ab=_0x3a5d8e,_0x4ed4ab=ConfigManager['touchUI']?(Sprite_Button['prototype'][_0x3ca0ab(0x2fa)]()+0x6)*0x2:0x0,_0x53ebbd=this[_0x3ca0ab(0x5e1)](),_0x3b9f7c=Graphics[_0x3ca0ab(0x87d)]-_0x4ed4ab*0x2,_0x4da5c5=this[_0x3ca0ab(0x848)]();return new Rectangle(_0x4ed4ab,_0x53ebbd,_0x3b9f7c,_0x4da5c5);},Scene_MenuBase['prototype'][_0x3a5d8e(0x585)]=function(){const _0x5852a6=_0x3a5d8e,_0x5a0761=Graphics[_0x5852a6(0x87d)],_0x2ed368=Window_ButtonAssist[_0x5852a6(0x715)][_0x5852a6(0x66d)](),_0x1aa247=0x0;let _0x2531b3=0x0;if(this[_0x5852a6(0x8a6)]()===_0x5852a6(0x24b))_0x2531b3=0x0;else{if(_0x5852a6(0x449)!==_0x5852a6(0x449))return _0xc9dafb[_0x5852a6(0x690)]['Settings']['UI']['RightMenus'];else _0x2531b3=Graphics[_0x5852a6(0x8b0)]-_0x2ed368;}return new Rectangle(_0x1aa247,_0x2531b3,_0x5a0761,_0x2ed368);},Scene_Menu[_0x3a5d8e(0x998)]=VisuMZ[_0x3a5d8e(0x690)]['Settings'][_0x3a5d8e(0x4bd)][_0x3a5d8e(0x8cc)],VisuMZ['CoreEngine']['Scene_Menu_create']=Scene_Menu[_0x3a5d8e(0x715)][_0x3a5d8e(0x1e9)],Scene_Menu[_0x3a5d8e(0x715)][_0x3a5d8e(0x1e9)]=function(){const _0x1f1ef8=_0x3a5d8e;VisuMZ['CoreEngine'][_0x1f1ef8(0x3f2)][_0x1f1ef8(0x528)](this),this[_0x1f1ef8(0x21d)]();},Scene_Menu[_0x3a5d8e(0x715)][_0x3a5d8e(0x21d)]=function(){const _0x35b351=_0x3a5d8e;if(this[_0x35b351(0x7e0)]){if(_0x35b351(0x2b0)===_0x35b351(0x2b0))this[_0x35b351(0x7e0)][_0x35b351(0x357)](Scene_Menu[_0x35b351(0x998)][_0x35b351(0x9a7)]);else return _0x54d08e['buttonAssistOk'];}if(this[_0x35b351(0x7fa)]){if(_0x35b351(0x6f5)==='FCYqe')this[_0x35b351(0x7fa)][_0x35b351(0x357)](Scene_Menu[_0x35b351(0x998)][_0x35b351(0x2ca)]);else{var _0x38b38c=_0x4b28e9(_0x36fa66['$1']);try{_0x126388*=_0x63852d(_0x38b38c);}catch(_0x25637e){if(_0x50f3b0[_0x35b351(0x583)]())_0xbf6007['log'](_0x25637e);}}}this[_0x35b351(0x71c)]&&this['_statusWindow'][_0x35b351(0x357)](Scene_Menu[_0x35b351(0x998)][_0x35b351(0x493)]);},Scene_Menu[_0x3a5d8e(0x715)][_0x3a5d8e(0x29e)]=function(){const _0x3bbfcb=_0x3a5d8e;return Scene_Menu[_0x3bbfcb(0x998)][_0x3bbfcb(0x417)][_0x3bbfcb(0x528)](this);},Scene_Menu['prototype'][_0x3a5d8e(0x911)]=function(){const _0x260e57=_0x3a5d8e;return Scene_Menu[_0x260e57(0x998)][_0x260e57(0x60f)][_0x260e57(0x528)](this);},Scene_Menu[_0x3a5d8e(0x715)][_0x3a5d8e(0x7cd)]=function(){const _0x44e843=_0x3a5d8e;return Scene_Menu[_0x44e843(0x998)][_0x44e843(0x208)][_0x44e843(0x528)](this);},Scene_Item['layoutSettings']=VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x227)][_0x3a5d8e(0x4bd)][_0x3a5d8e(0x76c)],VisuMZ['CoreEngine'][_0x3a5d8e(0x196)]=Scene_Item[_0x3a5d8e(0x715)][_0x3a5d8e(0x1e9)],Scene_Item[_0x3a5d8e(0x715)][_0x3a5d8e(0x1e9)]=function(){const _0x39dc62=_0x3a5d8e;VisuMZ[_0x39dc62(0x690)][_0x39dc62(0x196)][_0x39dc62(0x528)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item[_0x3a5d8e(0x715)][_0x3a5d8e(0x21d)]=function(){const _0x5c7caf=_0x3a5d8e;this[_0x5c7caf(0x9ae)]&&(_0x5c7caf(0x369)===_0x5c7caf(0x369)?this[_0x5c7caf(0x9ae)][_0x5c7caf(0x357)](Scene_Item[_0x5c7caf(0x998)][_0x5c7caf(0x78e)]):this[_0x5c7caf(0x247)][_0x5c7caf(0x1c3)]());this[_0x5c7caf(0x8e0)]&&this[_0x5c7caf(0x8e0)][_0x5c7caf(0x357)](Scene_Item['layoutSettings'][_0x5c7caf(0x928)]);this[_0x5c7caf(0x4b5)]&&this['_itemWindow']['setBackgroundType'](Scene_Item[_0x5c7caf(0x998)][_0x5c7caf(0x4bc)]);if(this['_actorWindow']){if('tKKSW'===_0x5c7caf(0x281))return _0x427afe[_0x5c7caf(0x3e1)](_0xe17d85,'[',']');else this[_0x5c7caf(0x5f7)]['setBackgroundType'](Scene_Item[_0x5c7caf(0x998)][_0x5c7caf(0x334)]);}},Scene_Item[_0x3a5d8e(0x715)][_0x3a5d8e(0x42e)]=function(){const _0x105daf=_0x3a5d8e;return Scene_Item[_0x105daf(0x998)][_0x105daf(0x4f2)]['call'](this);},Scene_Item[_0x3a5d8e(0x715)]['categoryWindowRect']=function(){const _0x3ca993=_0x3a5d8e;return Scene_Item[_0x3ca993(0x998)][_0x3ca993(0x892)][_0x3ca993(0x528)](this);},Scene_Item['prototype'][_0x3a5d8e(0x874)]=function(){const _0x22fdc8=_0x3a5d8e;return Scene_Item[_0x22fdc8(0x998)][_0x22fdc8(0x2ea)][_0x22fdc8(0x528)](this);},Scene_Item[_0x3a5d8e(0x715)][_0x3a5d8e(0x6eb)]=function(){const _0x401b9b=_0x3a5d8e;return Scene_Item[_0x401b9b(0x998)][_0x401b9b(0x3f0)][_0x401b9b(0x528)](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x227)][_0x3a5d8e(0x4bd)]['SkillMenu'],VisuMZ['CoreEngine']['Scene_Skill_create']=Scene_Skill[_0x3a5d8e(0x715)][_0x3a5d8e(0x1e9)],Scene_Skill[_0x3a5d8e(0x715)]['create']=function(){const _0x12a53f=_0x3a5d8e;VisuMZ[_0x12a53f(0x690)][_0x12a53f(0x87c)][_0x12a53f(0x528)](this),this[_0x12a53f(0x21d)]();},Scene_Skill[_0x3a5d8e(0x715)][_0x3a5d8e(0x21d)]=function(){const _0x2141b9=_0x3a5d8e;this[_0x2141b9(0x9ae)]&&this[_0x2141b9(0x9ae)][_0x2141b9(0x357)](Scene_Skill['layoutSettings']['HelpBgType']);if(this[_0x2141b9(0x67f)]){if(_0x2141b9(0x82a)!=='QnEPo')this[_0x2141b9(0x67f)][_0x2141b9(0x357)](Scene_Skill[_0x2141b9(0x998)][_0x2141b9(0x3f6)]);else{_0x3bf30c[_0x2141b9(0x306)](_0xb257d3,_0x4e45a1);const _0xc23c35=_0x54da06['min'](_0xb6075b['StartID'],_0x606d8d[_0x2141b9(0x6b0)]),_0x1d9297=_0x13110b['max'](_0x50019c[_0x2141b9(0x584)],_0xae413[_0x2141b9(0x6b0)]);for(let _0x32a7a1=_0xc23c35;_0x32a7a1<=_0x1d9297;_0x32a7a1++){_0x45ba6f[_0x2141b9(0x6b1)](_0x32a7a1);}}}if(this[_0x2141b9(0x71c)]){if('mxhyk'==='mxhyk')this[_0x2141b9(0x71c)][_0x2141b9(0x357)](Scene_Skill[_0x2141b9(0x998)][_0x2141b9(0x493)]);else{if(!_0x23b7e4['isPlaytest']())return;if(!_0x15626d[_0x2141b9(0x3cb)]())return;_0x260d44[_0x2141b9(0x3bb)]['_active']=![],_0x57d5c2['CoreEngine'][_0x2141b9(0x21e)]();}}this[_0x2141b9(0x4b5)]&&this[_0x2141b9(0x4b5)][_0x2141b9(0x357)](Scene_Skill[_0x2141b9(0x998)][_0x2141b9(0x4bc)]),this[_0x2141b9(0x5f7)]&&this[_0x2141b9(0x5f7)][_0x2141b9(0x357)](Scene_Skill[_0x2141b9(0x998)][_0x2141b9(0x334)]);},Scene_Skill['prototype'][_0x3a5d8e(0x42e)]=function(){const _0x2cc3b1=_0x3a5d8e;return Scene_Skill[_0x2cc3b1(0x998)]['HelpRect'][_0x2cc3b1(0x528)](this);},Scene_Skill['prototype'][_0x3a5d8e(0x993)]=function(){const _0x4aac22=_0x3a5d8e;return Scene_Skill[_0x4aac22(0x998)][_0x4aac22(0x269)][_0x4aac22(0x528)](this);},Scene_Skill[_0x3a5d8e(0x715)]['statusWindowRect']=function(){const _0x2a5dea=_0x3a5d8e;return Scene_Skill[_0x2a5dea(0x998)][_0x2a5dea(0x208)][_0x2a5dea(0x528)](this);},Scene_Skill['prototype'][_0x3a5d8e(0x874)]=function(){const _0x5810d5=_0x3a5d8e;return Scene_Skill[_0x5810d5(0x998)]['ItemRect'][_0x5810d5(0x528)](this);},Scene_Skill[_0x3a5d8e(0x715)][_0x3a5d8e(0x6eb)]=function(){const _0x552584=_0x3a5d8e;return Scene_Skill[_0x552584(0x998)]['ActorRect'][_0x552584(0x528)](this);},Scene_Equip[_0x3a5d8e(0x998)]=VisuMZ[_0x3a5d8e(0x690)]['Settings'][_0x3a5d8e(0x4bd)]['EquipMenu'],VisuMZ['CoreEngine'][_0x3a5d8e(0x1fc)]=Scene_Equip[_0x3a5d8e(0x715)]['create'],Scene_Equip['prototype'][_0x3a5d8e(0x1e9)]=function(){const _0x1310a0=_0x3a5d8e;VisuMZ['CoreEngine'][_0x1310a0(0x1fc)]['call'](this),this[_0x1310a0(0x21d)]();},Scene_Equip[_0x3a5d8e(0x715)][_0x3a5d8e(0x21d)]=function(){const _0x5e9d4a=_0x3a5d8e;this[_0x5e9d4a(0x9ae)]&&this[_0x5e9d4a(0x9ae)]['setBackgroundType'](Scene_Equip[_0x5e9d4a(0x998)][_0x5e9d4a(0x78e)]);if(this['_statusWindow']){if(_0x5e9d4a(0x7c5)!==_0x5e9d4a(0x7c5)){if(_0x8908b7[_0x5e9d4a(0x2c2)]!==_0x5a336f)return _0x2564a9[_0x5e9d4a(0x690)][_0x5e9d4a(0x170)]();return _0x47c34d[_0x5e9d4a(0x690)][_0x5e9d4a(0x65a)][_0x5e9d4a(0x528)](this);}else this[_0x5e9d4a(0x71c)][_0x5e9d4a(0x357)](Scene_Equip['layoutSettings'][_0x5e9d4a(0x493)]);}this['_commandWindow']&&this['_commandWindow'][_0x5e9d4a(0x357)](Scene_Equip[_0x5e9d4a(0x998)]['CommandBgType']),this['_slotWindow']&&this[_0x5e9d4a(0x300)][_0x5e9d4a(0x357)](Scene_Equip[_0x5e9d4a(0x998)][_0x5e9d4a(0x322)]),this[_0x5e9d4a(0x4b5)]&&this[_0x5e9d4a(0x4b5)][_0x5e9d4a(0x357)](Scene_Equip[_0x5e9d4a(0x998)]['ItemBgType']);},Scene_Equip['prototype']['helpWindowRect']=function(){const _0x2cdae7=_0x3a5d8e;return Scene_Equip[_0x2cdae7(0x998)]['HelpRect'][_0x2cdae7(0x528)](this);},Scene_Equip['prototype'][_0x3a5d8e(0x7cd)]=function(){const _0x28772e=_0x3a5d8e;return Scene_Equip['layoutSettings']['StatusRect'][_0x28772e(0x528)](this);},Scene_Equip[_0x3a5d8e(0x715)][_0x3a5d8e(0x29e)]=function(){const _0x5b2f20=_0x3a5d8e;return Scene_Equip['layoutSettings'][_0x5b2f20(0x417)][_0x5b2f20(0x528)](this);},Scene_Equip[_0x3a5d8e(0x715)]['slotWindowRect']=function(){const _0x4237fb=_0x3a5d8e;return Scene_Equip[_0x4237fb(0x998)]['SlotRect'][_0x4237fb(0x528)](this);},Scene_Equip[_0x3a5d8e(0x715)][_0x3a5d8e(0x874)]=function(){const _0x466d9a=_0x3a5d8e;return Scene_Equip[_0x466d9a(0x998)]['ItemRect']['call'](this);},Scene_Status[_0x3a5d8e(0x998)]=VisuMZ['CoreEngine'][_0x3a5d8e(0x227)][_0x3a5d8e(0x4bd)][_0x3a5d8e(0x2e8)],VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x44c)]=Scene_Status[_0x3a5d8e(0x715)][_0x3a5d8e(0x1e9)],Scene_Status['prototype'][_0x3a5d8e(0x1e9)]=function(){const _0x45ab1d=_0x3a5d8e;VisuMZ[_0x45ab1d(0x690)][_0x45ab1d(0x44c)]['call'](this),this[_0x45ab1d(0x21d)]();},Scene_Status[_0x3a5d8e(0x715)][_0x3a5d8e(0x21d)]=function(){const _0x558cd2=_0x3a5d8e;this[_0x558cd2(0x21b)]&&this[_0x558cd2(0x21b)][_0x558cd2(0x357)](Scene_Status[_0x558cd2(0x998)][_0x558cd2(0x355)]);this[_0x558cd2(0x71c)]&&this['_statusWindow'][_0x558cd2(0x357)](Scene_Status[_0x558cd2(0x998)]['StatusBgType']);this[_0x558cd2(0x93f)]&&this['_statusParamsWindow'][_0x558cd2(0x357)](Scene_Status['layoutSettings'][_0x558cd2(0x935)]);if(this['_statusEquipWindow']){if(_0x558cd2(0x233)!==_0x558cd2(0x233)){var _0x321aa0=_0x240fb1(_0xaf1264['$1']);_0x4c4664*=_0x321aa0;}else this[_0x558cd2(0x8cf)][_0x558cd2(0x357)](Scene_Status[_0x558cd2(0x998)][_0x558cd2(0x434)]);}},Scene_Status[_0x3a5d8e(0x715)]['profileWindowRect']=function(){const _0x4b857d=_0x3a5d8e;return Scene_Status[_0x4b857d(0x998)][_0x4b857d(0x3ce)][_0x4b857d(0x528)](this);},Scene_Status[_0x3a5d8e(0x715)][_0x3a5d8e(0x7cd)]=function(){const _0x3baf86=_0x3a5d8e;return Scene_Status[_0x3baf86(0x998)][_0x3baf86(0x208)][_0x3baf86(0x528)](this);},Scene_Status[_0x3a5d8e(0x715)]['statusParamsWindowRect']=function(){const _0x488ff1=_0x3a5d8e;return Scene_Status[_0x488ff1(0x998)][_0x488ff1(0x624)]['call'](this);},Scene_Status[_0x3a5d8e(0x715)][_0x3a5d8e(0x364)]=function(){const _0x30920c=_0x3a5d8e;return Scene_Status[_0x30920c(0x998)][_0x30920c(0x433)][_0x30920c(0x528)](this);},Scene_Options[_0x3a5d8e(0x998)]=VisuMZ['CoreEngine'][_0x3a5d8e(0x227)][_0x3a5d8e(0x4bd)][_0x3a5d8e(0x8f9)],VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x7b0)]=Scene_Options[_0x3a5d8e(0x715)][_0x3a5d8e(0x1e9)],Scene_Options['prototype'][_0x3a5d8e(0x1e9)]=function(){const _0x1cff63=_0x3a5d8e;VisuMZ[_0x1cff63(0x690)][_0x1cff63(0x7b0)][_0x1cff63(0x528)](this),this[_0x1cff63(0x21d)]();},Scene_Options[_0x3a5d8e(0x715)]['setCoreEngineUpdateWindowBg']=function(){const _0x485907=_0x3a5d8e;this[_0x485907(0x968)]&&this[_0x485907(0x968)]['setBackgroundType'](Scene_Options[_0x485907(0x998)]['OptionsBgType']);},Scene_Options[_0x3a5d8e(0x715)]['optionsWindowRect']=function(){const _0x2cc1f3=_0x3a5d8e;return Scene_Options[_0x2cc1f3(0x998)][_0x2cc1f3(0x239)][_0x2cc1f3(0x528)](this);},Scene_Save[_0x3a5d8e(0x998)]=VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x227)][_0x3a5d8e(0x4bd)][_0x3a5d8e(0x919)],Scene_Save['prototype'][_0x3a5d8e(0x1e9)]=function(){const _0x58d0df=_0x3a5d8e;Scene_File[_0x58d0df(0x715)][_0x58d0df(0x1e9)]['call'](this),this[_0x58d0df(0x21d)]();},Scene_Save[_0x3a5d8e(0x715)][_0x3a5d8e(0x21d)]=function(){const _0x2b5c6f=_0x3a5d8e;this[_0x2b5c6f(0x9ae)]&&this[_0x2b5c6f(0x9ae)][_0x2b5c6f(0x357)](Scene_Save[_0x2b5c6f(0x998)][_0x2b5c6f(0x78e)]);if(this[_0x2b5c6f(0x346)]){if(_0x2b5c6f(0x2ec)!==_0x2b5c6f(0x2ec)){const _0x21407e=_0x162fc0[_0x2b5c6f(0x690)]['Settings'][_0x2b5c6f(0x897)];if(_0x21407e&&_0x21407e[_0x2b5c6f(0x439)])return _0x21407e[_0x2b5c6f(0x439)]['call'](this);const _0x4897a6=_0x592263['_shakePower']*0.75,_0x44a2d7=_0x52e671[_0x2b5c6f(0x710)]*0.6,_0x53a531=_0x399d2f[_0x2b5c6f(0x590)];this['x']+=_0x3470b0[_0x2b5c6f(0x6dd)](_0x17ad8f[_0x2b5c6f(0x38e)](_0x4897a6)-_0x4556bf[_0x2b5c6f(0x38e)](_0x44a2d7))*(_0x354a6d[_0x2b5c6f(0x84c)](_0x53a531,0x1e)*0.5);}else this[_0x2b5c6f(0x346)][_0x2b5c6f(0x357)](Scene_Save['layoutSettings'][_0x2b5c6f(0x4ff)]);}},Scene_Save[_0x3a5d8e(0x715)][_0x3a5d8e(0x42e)]=function(){const _0x580313=_0x3a5d8e;return Scene_Save[_0x580313(0x998)][_0x580313(0x4f2)][_0x580313(0x528)](this);},Scene_Save[_0x3a5d8e(0x715)][_0x3a5d8e(0x98e)]=function(){const _0xf69658=_0x3a5d8e;return Scene_Save['layoutSettings'][_0xf69658(0x461)]['call'](this);},Scene_Load[_0x3a5d8e(0x998)]=VisuMZ[_0x3a5d8e(0x690)]['Settings'][_0x3a5d8e(0x4bd)][_0x3a5d8e(0x906)],Scene_Load[_0x3a5d8e(0x715)][_0x3a5d8e(0x1e9)]=function(){const _0x35ef10=_0x3a5d8e;Scene_File[_0x35ef10(0x715)][_0x35ef10(0x1e9)]['call'](this),this[_0x35ef10(0x21d)]();},Scene_Load['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x2b345d=_0x3a5d8e;this[_0x2b345d(0x9ae)]&&(_0x2b345d(0x470)===_0x2b345d(0x470)?this[_0x2b345d(0x9ae)][_0x2b345d(0x357)](Scene_Load['layoutSettings'][_0x2b345d(0x78e)]):(_0xab2e72[_0x2b345d(0x690)][_0x2b345d(0x87c)]['call'](this),this[_0x2b345d(0x21d)]())),this[_0x2b345d(0x346)]&&this['_listWindow'][_0x2b345d(0x357)](Scene_Load['layoutSettings'][_0x2b345d(0x4ff)]);},Scene_Load['prototype'][_0x3a5d8e(0x42e)]=function(){const _0x2335e0=_0x3a5d8e;return Scene_Load[_0x2335e0(0x998)]['HelpRect'][_0x2335e0(0x528)](this);},Scene_Load[_0x3a5d8e(0x715)][_0x3a5d8e(0x98e)]=function(){const _0x592098=_0x3a5d8e;return Scene_Load['layoutSettings'][_0x592098(0x461)][_0x592098(0x528)](this);},Scene_GameEnd['layoutSettings']=VisuMZ['CoreEngine']['Settings'][_0x3a5d8e(0x4bd)][_0x3a5d8e(0x18a)],VisuMZ['CoreEngine'][_0x3a5d8e(0x44e)]=Scene_GameEnd['prototype']['createBackground'],Scene_GameEnd[_0x3a5d8e(0x715)][_0x3a5d8e(0x1d6)]=function(){const _0x21f2dc=_0x3a5d8e;Scene_MenuBase[_0x21f2dc(0x715)][_0x21f2dc(0x1d6)][_0x21f2dc(0x528)](this);},Scene_GameEnd[_0x3a5d8e(0x715)][_0x3a5d8e(0x34a)]=function(){const _0x551d5c=_0x3a5d8e,_0xd0a8af=this[_0x551d5c(0x29e)]();this[_0x551d5c(0x7e0)]=new Window_GameEnd(_0xd0a8af),this['_commandWindow'][_0x551d5c(0x390)](_0x551d5c(0x37d),this['popScene'][_0x551d5c(0x8b1)](this)),this[_0x551d5c(0x6d9)](this[_0x551d5c(0x7e0)]),this[_0x551d5c(0x7e0)][_0x551d5c(0x357)](Scene_GameEnd['layoutSettings'][_0x551d5c(0x9a7)]);},Scene_GameEnd[_0x3a5d8e(0x715)][_0x3a5d8e(0x29e)]=function(){const _0x13a1a9=_0x3a5d8e;return Scene_GameEnd['layoutSettings'][_0x13a1a9(0x417)][_0x13a1a9(0x528)](this);},Scene_Shop[_0x3a5d8e(0x998)]=VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x227)][_0x3a5d8e(0x4bd)][_0x3a5d8e(0x834)],VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x1f5)]=Scene_Shop['prototype'][_0x3a5d8e(0x1e9)],Scene_Shop[_0x3a5d8e(0x715)][_0x3a5d8e(0x1e9)]=function(){const _0x22d222=_0x3a5d8e;VisuMZ['CoreEngine'][_0x22d222(0x1f5)][_0x22d222(0x528)](this),this[_0x22d222(0x21d)]();},Scene_Shop[_0x3a5d8e(0x715)]['setCoreEngineUpdateWindowBg']=function(){const _0x12996d=_0x3a5d8e;if(this[_0x12996d(0x9ae)]){if(_0x12996d(0x557)==='YhgBB')this[_0x12996d(0x9ae)][_0x12996d(0x357)](Scene_Shop[_0x12996d(0x998)][_0x12996d(0x78e)]);else return _0x1ad81c['layoutSettings'][_0x12996d(0x3f0)][_0x12996d(0x528)](this);}this['_goldWindow']&&this[_0x12996d(0x7fa)][_0x12996d(0x357)](Scene_Shop[_0x12996d(0x998)][_0x12996d(0x2ca)]);this[_0x12996d(0x7e0)]&&this['_commandWindow']['setBackgroundType'](Scene_Shop[_0x12996d(0x998)][_0x12996d(0x9a7)]);this[_0x12996d(0x52b)]&&this[_0x12996d(0x52b)][_0x12996d(0x357)](Scene_Shop[_0x12996d(0x998)]['DummyBgType']);if(this[_0x12996d(0x3ae)]){if(_0x12996d(0x794)===_0x12996d(0x984)){const _0x46fe74={'x':_0x50d21f,'y':_0x2f1e11,'animationId':_0x4c110f,'mirror':_0x49a97f,'mute':_0x4df5c2};this['_pointAnimationQueue']['push'](_0x46fe74);}else this[_0x12996d(0x3ae)]['setBackgroundType'](Scene_Shop[_0x12996d(0x998)][_0x12996d(0x459)]);}this[_0x12996d(0x71c)]&&this[_0x12996d(0x71c)][_0x12996d(0x357)](Scene_Shop[_0x12996d(0x998)][_0x12996d(0x493)]);this[_0x12996d(0x87b)]&&this[_0x12996d(0x87b)][_0x12996d(0x357)](Scene_Shop[_0x12996d(0x998)][_0x12996d(0x189)]);if(this[_0x12996d(0x8e0)]){if(_0x12996d(0x28a)==='ZUnvT')throw _0x1d7903;else this['_categoryWindow'][_0x12996d(0x357)](Scene_Shop['layoutSettings'][_0x12996d(0x928)]);}this[_0x12996d(0x7d3)]&&this[_0x12996d(0x7d3)][_0x12996d(0x357)](Scene_Shop['layoutSettings']['SellBgType']);},Scene_Shop[_0x3a5d8e(0x715)][_0x3a5d8e(0x42e)]=function(){const _0x29dc7d=_0x3a5d8e;return Scene_Shop[_0x29dc7d(0x998)][_0x29dc7d(0x4f2)]['call'](this);},Scene_Shop[_0x3a5d8e(0x715)][_0x3a5d8e(0x911)]=function(){const _0x1aae76=_0x3a5d8e;return Scene_Shop[_0x1aae76(0x998)][_0x1aae76(0x60f)][_0x1aae76(0x528)](this);},Scene_Shop[_0x3a5d8e(0x715)][_0x3a5d8e(0x29e)]=function(){const _0xe54bb2=_0x3a5d8e;return Scene_Shop[_0xe54bb2(0x998)][_0xe54bb2(0x417)][_0xe54bb2(0x528)](this);},Scene_Shop[_0x3a5d8e(0x715)][_0x3a5d8e(0x2b1)]=function(){const _0xcbd4d9=_0x3a5d8e;return Scene_Shop[_0xcbd4d9(0x998)]['DummyRect'][_0xcbd4d9(0x528)](this);},Scene_Shop['prototype'][_0x3a5d8e(0x35f)]=function(){const _0x3c5781=_0x3a5d8e;return Scene_Shop['layoutSettings'][_0x3c5781(0x8fc)][_0x3c5781(0x528)](this);},Scene_Shop[_0x3a5d8e(0x715)][_0x3a5d8e(0x7cd)]=function(){const _0x1a2aac=_0x3a5d8e;return Scene_Shop[_0x1a2aac(0x998)]['StatusRect'][_0x1a2aac(0x528)](this);},Scene_Shop['prototype']['buyWindowRect']=function(){const _0x2c8632=_0x3a5d8e;return Scene_Shop[_0x2c8632(0x998)]['BuyRect'][_0x2c8632(0x528)](this);},Scene_Shop[_0x3a5d8e(0x715)]['categoryWindowRect']=function(){const _0x4a8797=_0x3a5d8e;return Scene_Shop[_0x4a8797(0x998)][_0x4a8797(0x892)][_0x4a8797(0x528)](this);},Scene_Shop[_0x3a5d8e(0x715)][_0x3a5d8e(0x6da)]=function(){const _0x45b58e=_0x3a5d8e;return Scene_Shop['layoutSettings'][_0x45b58e(0x335)][_0x45b58e(0x528)](this);},Scene_Name['layoutSettings']=VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x227)][_0x3a5d8e(0x4bd)]['NameMenu'],VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x6c1)]=Scene_Name[_0x3a5d8e(0x715)][_0x3a5d8e(0x1e9)],Scene_Name[_0x3a5d8e(0x715)]['create']=function(){const _0x1281ea=_0x3a5d8e;VisuMZ['CoreEngine'][_0x1281ea(0x6c1)]['call'](this),this[_0x1281ea(0x21d)]();},Scene_Name[_0x3a5d8e(0x715)][_0x3a5d8e(0x21d)]=function(){const _0x66e843=_0x3a5d8e;if(this[_0x66e843(0x89d)]){if(_0x66e843(0x54c)===_0x66e843(0x185))for(const _0x1bb7a2 of this[_0x66e843(0x68d)]){this['removePointAnimation'](_0x1bb7a2);}else this[_0x66e843(0x89d)][_0x66e843(0x357)](Scene_Name['layoutSettings']['EditBgType']);}this['_inputWindow']&&(_0x66e843(0x6ee)!==_0x66e843(0x6ee)?_0x516ec8['CoreEngine'][_0x66e843(0x949)][_0x66e843(0x528)](this,_0x470e40):this[_0x66e843(0x418)]['setBackgroundType'](Scene_Name[_0x66e843(0x998)][_0x66e843(0x94c)]));},Scene_Name[_0x3a5d8e(0x715)][_0x3a5d8e(0x31f)]=function(){return 0x0;},Scene_Name['prototype'][_0x3a5d8e(0x1bc)]=function(){const _0x383256=_0x3a5d8e;return Scene_Name[_0x383256(0x998)]['EditRect']['call'](this);},Scene_Name[_0x3a5d8e(0x715)][_0x3a5d8e(0x965)]=function(){const _0x59a87b=_0x3a5d8e;return Scene_Name['layoutSettings'][_0x59a87b(0x895)][_0x59a87b(0x528)](this);},Scene_Name[_0x3a5d8e(0x715)][_0x3a5d8e(0x7a6)]=function(){const _0x5b3d86=_0x3a5d8e;if(!this[_0x5b3d86(0x418)])return![];return VisuMZ[_0x5b3d86(0x690)][_0x5b3d86(0x227)]['KeyboardInput'][_0x5b3d86(0x7a6)];},Scene_Name[_0x3a5d8e(0x715)][_0x3a5d8e(0x26f)]=function(){const _0x2d8d77=_0x3a5d8e;return this[_0x2d8d77(0x7a6)]()?TextManager[_0x2d8d77(0x3dd)]('tab'):Scene_MenuBase[_0x2d8d77(0x715)][_0x2d8d77(0x26f)][_0x2d8d77(0x528)](this);},Scene_Name[_0x3a5d8e(0x715)]['buttonAssistText1']=function(){const _0x46522b=_0x3a5d8e;if(this[_0x46522b(0x7a6)]()){const _0x349b60=VisuMZ['CoreEngine']['Settings'][_0x46522b(0x380)];if(this[_0x46522b(0x418)][_0x46522b(0x3c9)]===_0x46522b(0x1bd)){if(_0x46522b(0x3c1)!=='XAmJt')return _0x349b60[_0x46522b(0x661)]||_0x46522b(0x661);else{const _0x121845=_0x5d034f[_0x46522b(0x153)];let _0x13fdd3=_0x17bc69[_0x46522b(0x570)];if(['','Untitled'][_0x46522b(0x2c6)](_0x13fdd3))_0x13fdd3=_0x447bbf[_0x46522b(0x5d8)][_0x46522b(0x528)](this);const _0x1a1f1b=_0x67950a[_0x46522b(0x457)][_0x46522b(0x528)](this),_0x29d0f9=_0x17718f[_0x46522b(0x8b6)]['call'](this);this[_0x46522b(0x51e)](_0x13fdd3,_0x121845,_0x1a1f1b,_0x29d0f9),this['setHandler'](_0x121845,_0x47880a['CallHandlerJS'][_0x46522b(0x8b1)](this,_0x29d0f9));}}else return _0x349b60['Manual']||'Manual';}else return Scene_MenuBase[_0x46522b(0x715)]['buttonAssistText1'][_0x46522b(0x528)](this);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x9b4)]=Scene_Name[_0x3a5d8e(0x715)][_0x3a5d8e(0x4b9)],Scene_Name['prototype']['onInputOk']=function(){const _0x3f8b09=_0x3a5d8e;if(this[_0x3f8b09(0x66c)]()){if(_0x3f8b09(0x4d3)!==_0x3f8b09(0x4d3)){const _0x413e91=_0x12be20[_0x32bda8[_0x3f8b09(0x807)]],_0x278274=_0x533902['targets'],_0x127c1e=_0x1b6473['mirror'],_0x15d926=_0xb0a87d['mute'];let _0x3265d7=this['animationBaseDelay']();const _0x1abf36=this[_0x3f8b09(0x754)]();if(this['isAnimationForEach'](_0x413e91))for(const _0x4938e1 of _0x278274){this[_0x3f8b09(0x3e9)]([_0x4938e1],_0x413e91,_0x127c1e,_0x3265d7,_0x15d926),_0x3265d7+=_0x1abf36;}else this[_0x3f8b09(0x3e9)](_0x278274,_0x413e91,_0x127c1e,_0x3265d7,_0x15d926);}else this[_0x3f8b09(0x61c)]();}else VisuMZ[_0x3f8b09(0x690)][_0x3f8b09(0x9b4)][_0x3f8b09(0x528)](this);},Scene_Name[_0x3a5d8e(0x715)][_0x3a5d8e(0x66c)]=function(){const _0x1fc227=_0x3a5d8e,_0x2c62f1=VisuMZ[_0x1fc227(0x690)]['Settings'][_0x1fc227(0x380)];if(!_0x2c62f1)return![];const _0x223f76=_0x2c62f1[_0x1fc227(0x625)];if(!_0x223f76)return![];const _0x1c111f=this['_editWindow'][_0x1fc227(0x53e)]()[_0x1fc227(0x8bb)]();for(const _0x33885a of _0x223f76){if(_0x1c111f[_0x1fc227(0x2c6)](_0x33885a['toLowerCase']()))return!![];}return![];},Scene_Name['prototype'][_0x3a5d8e(0x61c)]=function(){const _0x2a5fee=_0x3a5d8e;SoundManager[_0x2a5fee(0x7b7)]();},VisuMZ[_0x3a5d8e(0x690)]['Scene_Battle_update']=Scene_Battle['prototype'][_0x3a5d8e(0x24a)],Scene_Battle[_0x3a5d8e(0x715)][_0x3a5d8e(0x24a)]=function(){const _0x1841b1=_0x3a5d8e;VisuMZ['CoreEngine'][_0x1841b1(0x930)][_0x1841b1(0x528)](this);if($gameTemp['_playTestFastMode'])this['updatePlayTestF7']();},Scene_Battle[_0x3a5d8e(0x715)][_0x3a5d8e(0x7fc)]=function(){const _0x56f912=_0x3a5d8e;!BattleManager['isInputting']()&&!this[_0x56f912(0x2ff)]&&!$gameMessage[_0x56f912(0x961)]()&&(_0x56f912(0x16e)!=='oPUrs'?(_0x1a81e1[_0x56f912(0x37a)]=0x0,_0x5c845f[_0x56f912(0x31a)]=0x0,_0x1ad8c3[_0x56f912(0x4a8)]=0x0,_0x2fb7a5[_0x56f912(0x2a1)]=0x0):(this[_0x56f912(0x2ff)]=!![],this['update'](),SceneManager[_0x56f912(0x54b)](),this[_0x56f912(0x2ff)]=![]));},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x6fe)]=Scene_Battle[_0x3a5d8e(0x715)][_0x3a5d8e(0x899)],Scene_Battle['prototype'][_0x3a5d8e(0x899)]=function(){const _0x2b28aa=_0x3a5d8e;VisuMZ[_0x2b28aa(0x690)][_0x2b28aa(0x6fe)]['call'](this),SceneManager['isSideButtonLayout']()&&(_0x2b28aa(0x6b4)===_0x2b28aa(0x729)?this[_0x2b28aa(0x67f)]['setBackgroundType'](_0x59c9d5[_0x2b28aa(0x998)]['SkillTypeBgType']):this[_0x2b28aa(0x1b4)]());},Scene_Battle[_0x3a5d8e(0x715)][_0x3a5d8e(0x1b4)]=function(){const _0x26e805=_0x3a5d8e;this[_0x26e805(0x1b5)]['x']=Graphics[_0x26e805(0x87d)]+0x4,this[_0x26e805(0x54e)]()?this[_0x26e805(0x1b5)]['y']=Graphics[_0x26e805(0x8b0)]-this[_0x26e805(0x848)]():this[_0x26e805(0x1b5)]['y']=0x0;},VisuMZ['CoreEngine']['Sprite_Button_initialize']=Sprite_Button['prototype'][_0x3a5d8e(0x36e)],Sprite_Button[_0x3a5d8e(0x715)][_0x3a5d8e(0x36e)]=function(_0x2b43b8){const _0x525c69=_0x3a5d8e;VisuMZ[_0x525c69(0x690)][_0x525c69(0x432)][_0x525c69(0x528)](this,_0x2b43b8),this[_0x525c69(0x44b)]();},Sprite_Button[_0x3a5d8e(0x715)][_0x3a5d8e(0x44b)]=function(){const _0xe44163=_0x3a5d8e,_0x3aad5f=VisuMZ[_0xe44163(0x690)]['Settings']['UI'];this[_0xe44163(0x4be)]=![];switch(this['_buttonType']){case'cancel':this[_0xe44163(0x4be)]=!_0x3aad5f['cancelShowButton'];break;case'pageup':case _0xe44163(0x331):this[_0xe44163(0x4be)]=!_0x3aad5f[_0xe44163(0x647)];break;case _0xe44163(0x20e):case'up':case'down2':case'up2':case'ok':this['_isButtonHidden']=!_0x3aad5f[_0xe44163(0x6d3)];break;case _0xe44163(0x689):this['_isButtonHidden']=!_0x3aad5f[_0xe44163(0x28e)];break;}},VisuMZ[_0x3a5d8e(0x690)]['Sprite_Button_updateOpacity']=Sprite_Button['prototype'][_0x3a5d8e(0x4e3)],Sprite_Button[_0x3a5d8e(0x715)][_0x3a5d8e(0x4e3)]=function(){const _0x36aa35=_0x3a5d8e;if(SceneManager[_0x36aa35(0x6ab)]()||this[_0x36aa35(0x4be)]){if('uzBEI'!==_0x36aa35(0x733))this[_0x36aa35(0x640)]();else return _0x3ccb9e;}else VisuMZ['CoreEngine'][_0x36aa35(0x16d)]['call'](this);},Sprite_Button['prototype'][_0x3a5d8e(0x640)]=function(){const _0x38a46d=_0x3a5d8e;this[_0x38a46d(0x8c3)]=![],this[_0x38a46d(0x951)]=0x0,this['x']=Graphics[_0x38a46d(0x89a)]*0xa,this['y']=Graphics[_0x38a46d(0x223)]*0xa;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x630)]=Sprite_Battler[_0x3a5d8e(0x715)][_0x3a5d8e(0x619)],Sprite_Battler['prototype'][_0x3a5d8e(0x619)]=function(_0x7db491,_0x1e2ed7,_0x369d86){const _0x3a4569=_0x3a5d8e;(this[_0x3a4569(0x3e7)]!==_0x7db491||this['_targetOffsetY']!==_0x1e2ed7)&&(_0x3a4569(0x1ec)===_0x3a4569(0x30a)?this[_0x3a4569(0x93f)][_0x3a4569(0x357)](_0x3e358d['layoutSettings'][_0x3a4569(0x935)]):(this[_0x3a4569(0x479)](_0x3a4569(0x5d4)),this[_0x3a4569(0x55d)]=_0x369d86)),VisuMZ['CoreEngine']['Sprite_Battler_startMove']['call'](this,_0x7db491,_0x1e2ed7,_0x369d86);},Sprite_Battler[_0x3a5d8e(0x715)]['setMoveEasingType']=function(_0x1cb3cb){const _0x56dc38=_0x3a5d8e;this[_0x56dc38(0x236)]=_0x1cb3cb;},Sprite_Battler[_0x3a5d8e(0x715)][_0x3a5d8e(0x953)]=function(){const _0xb264e4=_0x3a5d8e;if(this['_movementDuration']<=0x0)return;const _0x5d7499=this[_0xb264e4(0x1da)],_0xe39a93=this[_0xb264e4(0x55d)],_0x35f0a2=this['_moveEasingType'];this[_0xb264e4(0x425)]=this[_0xb264e4(0x67b)](this[_0xb264e4(0x425)],this[_0xb264e4(0x3e7)],_0x5d7499,_0xe39a93,_0x35f0a2),this[_0xb264e4(0x8c8)]=this['applyEasing'](this[_0xb264e4(0x8c8)],this[_0xb264e4(0x698)],_0x5d7499,_0xe39a93,_0x35f0a2),this[_0xb264e4(0x1da)]--;if(this['_movementDuration']<=0x0)this[_0xb264e4(0x27c)]();},Sprite_Battler[_0x3a5d8e(0x715)][_0x3a5d8e(0x67b)]=function(_0x420a54,_0xb1fad4,_0x4da35b,_0x5b80df,_0x3d472c){const _0x35b48c=_0x3a5d8e,_0x2a1fc4=VisuMZ['ApplyEasing']((_0x5b80df-_0x4da35b)/_0x5b80df,_0x3d472c||_0x35b48c(0x5d4)),_0xf2f5e1=VisuMZ[_0x35b48c(0x5dd)]((_0x5b80df-_0x4da35b+0x1)/_0x5b80df,_0x3d472c||_0x35b48c(0x5d4)),_0x2bc244=(_0x420a54-_0xb1fad4*_0x2a1fc4)/(0x1-_0x2a1fc4);return _0x2bc244+(_0xb1fad4-_0x2bc244)*_0xf2f5e1;},VisuMZ[_0x3a5d8e(0x690)]['Sprite_Actor_setActorHome']=Sprite_Actor['prototype'][_0x3a5d8e(0x84f)],Sprite_Actor['prototype']['setActorHome']=function(_0x7b9869){const _0x3f97f1=_0x3a5d8e;VisuMZ['CoreEngine'][_0x3f97f1(0x227)]['UI'][_0x3f97f1(0x63e)]?this[_0x3f97f1(0x341)](_0x7b9869):VisuMZ[_0x3f97f1(0x690)][_0x3f97f1(0x242)][_0x3f97f1(0x528)](this,_0x7b9869);},Sprite_Actor[_0x3a5d8e(0x715)][_0x3a5d8e(0x341)]=function(_0x4067ae){const _0x3a6aa4=_0x3a5d8e;let _0x2bcdda=Math[_0x3a6aa4(0x6dd)](Graphics[_0x3a6aa4(0x89a)]/0x2+0xc0);_0x2bcdda-=Math[_0x3a6aa4(0x3de)]((Graphics[_0x3a6aa4(0x89a)]-Graphics[_0x3a6aa4(0x87d)])/0x2),_0x2bcdda+=_0x4067ae*0x20;let _0x27cc14=Graphics[_0x3a6aa4(0x223)]-0xc8-$gameParty[_0x3a6aa4(0x345)]()*0x30;_0x27cc14-=Math[_0x3a6aa4(0x3de)]((Graphics[_0x3a6aa4(0x223)]-Graphics[_0x3a6aa4(0x8b0)])/0x2),_0x27cc14+=_0x4067ae*0x30,this[_0x3a6aa4(0x1ed)](_0x2bcdda,_0x27cc14);},Sprite_Actor[_0x3a5d8e(0x715)][_0x3a5d8e(0x4eb)]=function(){const _0x36cdc3=_0x3a5d8e;this[_0x36cdc3(0x619)](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x3a5d8e(0x1a1)]=function(_0x586344){this['_muteSound']=_0x586344;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x8a5)]=Sprite_Animation[_0x3a5d8e(0x715)][_0x3a5d8e(0x6b6)],Sprite_Animation[_0x3a5d8e(0x715)]['processSoundTimings']=function(){const _0x2a9a94=_0x3a5d8e;if(this[_0x2a9a94(0x922)])return;VisuMZ[_0x2a9a94(0x690)][_0x2a9a94(0x8a5)][_0x2a9a94(0x528)](this);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x65e)]=Sprite_Animation[_0x3a5d8e(0x715)]['setViewport'],Sprite_Animation['prototype'][_0x3a5d8e(0x891)]=function(_0x550eb4){const _0x470dba=_0x3a5d8e;this[_0x470dba(0x615)]()?this[_0x470dba(0x8df)](_0x550eb4):VisuMZ[_0x470dba(0x690)][_0x470dba(0x65e)]['call'](this,_0x550eb4);},Sprite_Animation[_0x3a5d8e(0x715)][_0x3a5d8e(0x615)]=function(){const _0x1906c2=_0x3a5d8e;if(!this[_0x1906c2(0x3b8)])return![];const _0x282c65=this[_0x1906c2(0x3b8)][_0x1906c2(0x53e)]||'';if(_0x282c65[_0x1906c2(0x4d7)](/<MIRROR OFFSET X>/i))return!![];if(_0x282c65[_0x1906c2(0x4d7)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x1906c2(0x690)][_0x1906c2(0x227)][_0x1906c2(0x169)][_0x1906c2(0x197)];},Sprite_Animation['prototype'][_0x3a5d8e(0x8df)]=function(_0xb9f1df){const _0x33d074=_0x3a5d8e,_0x282cd0=this[_0x33d074(0x28f)],_0x355231=this[_0x33d074(0x28f)],_0x262658=this['_animation'][_0x33d074(0x8f7)]*(this[_0x33d074(0x72a)]?-0x1:0x1)-_0x282cd0/0x2,_0x57196f=this['_animation']['offsetY']-_0x355231/0x2,_0x1135bb=this['targetPosition'](_0xb9f1df);_0xb9f1df['gl'][_0x33d074(0x33f)](_0x262658+_0x1135bb['x'],_0x57196f+_0x1135bb['y'],_0x282cd0,_0x355231);},Sprite_Animation[_0x3a5d8e(0x715)][_0x3a5d8e(0x39e)]=function(_0x26f044){const _0x5ad8e8=_0x3a5d8e;if(_0x26f044['_mainSprite']){}const _0x97c379=this['_animation'][_0x5ad8e8(0x53e)];let _0x456505=_0x26f044[_0x5ad8e8(0x223)]*_0x26f044[_0x5ad8e8(0x3fd)]['y'],_0x2d7dd3=0x0,_0x908dd5=-_0x456505/0x2;if(_0x97c379[_0x5ad8e8(0x4d7)](/<(?:HEAD|HEADER|TOP)>/i))_0x908dd5=-_0x456505;if(_0x97c379['match'](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x908dd5=0x0;if(this[_0x5ad8e8(0x3b8)][_0x5ad8e8(0x1b6)])_0x908dd5=0x0;if(_0x97c379[_0x5ad8e8(0x4d7)](/<(?:LEFT)>/i))_0x2d7dd3=-_0x26f044[_0x5ad8e8(0x89a)]/0x2;if(_0x97c379[_0x5ad8e8(0x4d7)](/<(?:RIGHT)>/i))_0x2d7dd3=_0x26f044['width']/0x2;if(_0x97c379[_0x5ad8e8(0x4d7)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)){if('GHClJ'===_0x5ad8e8(0x7f7))_0x2d7dd3=Number(RegExp['$1'])*_0x26f044['width'];else{let _0x183a21=_0x1c4314['CoreEngine'][_0x5ad8e8(0x8b4)][_0x5ad8e8(0x528)](this);return _0x183a21;}}if(_0x97c379['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)){if('TaCuC'!=='TaCuC'){if(_0x1021b4)_0x383b80[_0x5ad8e8(0x89e)](_0x25b2e8);}else _0x908dd5=(0x1-Number(RegExp['$1']))*-_0x456505;}_0x97c379[_0x5ad8e8(0x4d7)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x2d7dd3=Number(RegExp['$1'])*_0x26f044[_0x5ad8e8(0x89a)],_0x908dd5=(0x1-Number(RegExp['$2']))*-_0x456505);if(_0x97c379[_0x5ad8e8(0x4d7)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x2d7dd3+=Number(RegExp['$1']);if(_0x97c379[_0x5ad8e8(0x4d7)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x908dd5+=Number(RegExp['$1']);_0x97c379['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x2d7dd3+=Number(RegExp['$1']),_0x908dd5+=Number(RegExp['$2']));const _0x33b3e3=new Point(_0x2d7dd3,_0x908dd5);return _0x26f044[_0x5ad8e8(0x372)](),_0x26f044[_0x5ad8e8(0x8f3)][_0x5ad8e8(0x9a0)](_0x33b3e3);},Sprite_AnimationMV[_0x3a5d8e(0x715)][_0x3a5d8e(0x540)]=function(){const _0x549457=_0x3a5d8e;this[_0x549457(0x499)]=VisuMZ[_0x549457(0x690)][_0x549457(0x227)][_0x549457(0x169)][_0x549457(0x2dc)]??0x4,this['setupCustomRateCoreEngine'](),this[_0x549457(0x499)]=this[_0x549457(0x499)][_0x549457(0x2e9)](0x1,0xa);},Sprite_AnimationMV[_0x3a5d8e(0x715)]['setupCustomRateCoreEngine']=function(){const _0x3b5171=_0x3a5d8e;if(!this[_0x3b5171(0x3b8)]);const _0x68265f=this[_0x3b5171(0x3b8)]['name']||'';_0x68265f[_0x3b5171(0x4d7)](/<RATE:[ ](\d+)>/i)&&(this[_0x3b5171(0x499)]=(Number(RegExp['$1'])||0x1)[_0x3b5171(0x2e9)](0x1,0xa));},Sprite_AnimationMV[_0x3a5d8e(0x715)][_0x3a5d8e(0x1a1)]=function(_0x34a14c){const _0xe65fa6=_0x3a5d8e;this[_0xe65fa6(0x922)]=_0x34a14c;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x472)]=Sprite_AnimationMV[_0x3a5d8e(0x715)][_0x3a5d8e(0x473)],Sprite_AnimationMV['prototype'][_0x3a5d8e(0x473)]=function(_0x40e868){const _0x55ec6a=_0x3a5d8e;if(this[_0x55ec6a(0x922)]){_0x40e868=JsonEx['makeDeepCopy'](_0x40e868);if(_0x40e868['se']){if('ONTXt'!==_0x55ec6a(0x62a)){const _0x323c54=this[_0x55ec6a(0x2d1)]()-this[_0x55ec6a(0x8ad)]()*0x2;this[_0x55ec6a(0x844)](_0x510d29,_0x29c6b1,_0x323c54,_0x3e83b8,![]);}else _0x40e868['se'][_0x55ec6a(0x6fd)]=0x0;}}VisuMZ[_0x55ec6a(0x690)]['Sprite_AnimationMV_processTimingData'][_0x55ec6a(0x528)](this,_0x40e868);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x57c)]=Sprite_AnimationMV[_0x3a5d8e(0x715)]['updatePosition'],Sprite_AnimationMV[_0x3a5d8e(0x715)][_0x3a5d8e(0x809)]=function(){const _0x2d37a7=_0x3a5d8e;VisuMZ[_0x2d37a7(0x690)][_0x2d37a7(0x57c)]['call'](this);if(this[_0x2d37a7(0x3b8)][_0x2d37a7(0x42f)]===0x3){if(_0x2d37a7(0x825)!==_0x2d37a7(0x62b)){if(this['x']===0x0)this['x']=Math[_0x2d37a7(0x6dd)](Graphics[_0x2d37a7(0x89a)]/0x2);if(this['y']===0x0)this['y']=Math[_0x2d37a7(0x6dd)](Graphics['height']/0x2);}else this[_0x2d37a7(0x91e)][_0x2d37a7(0x24a)](),this[_0x2d37a7(0x55a)]['hide'](),this['_windowLayer'][_0x2d37a7(0x8c3)]=![],_0x5416ae['snapForBackground']();}},Sprite_Damage['prototype'][_0x3a5d8e(0x4d8)]=function(_0x4cfef1){const _0x57f51d=_0x3a5d8e;let _0x4a419b=Math['abs'](_0x4cfef1)[_0x57f51d(0x3bd)]();this[_0x57f51d(0x8a2)]()&&(_0x57f51d(0x3b0)!==_0x57f51d(0x1d2)?_0x4a419b=VisuMZ[_0x57f51d(0x5bd)](_0x4a419b):_0x236590[_0x57f51d(0x8d8)]&&(this[_0x57f51d(0x957)]='STB'));const _0x3d081f=this[_0x57f51d(0x171)](),_0x4dec3=Math[_0x57f51d(0x3de)](_0x3d081f*0.75);for(let _0x39d609=0x0;_0x39d609<_0x4a419b['length'];_0x39d609++){if(_0x57f51d(0x72f)!=='EfiMj')_0x46927e[_0x57f51d(0x690)]['Scene_Status_create'][_0x57f51d(0x528)](this),this['setCoreEngineUpdateWindowBg']();else{const _0x31c80f=this[_0x57f51d(0x38d)](_0x4dec3,_0x3d081f);_0x31c80f['bitmap']['drawText'](_0x4a419b[_0x39d609],0x0,0x0,_0x4dec3,_0x3d081f,_0x57f51d(0x61d)),_0x31c80f['x']=(_0x39d609-(_0x4a419b['length']-0x1)/0x2)*_0x4dec3,_0x31c80f['dy']=-_0x39d609;}}},Sprite_Damage[_0x3a5d8e(0x715)][_0x3a5d8e(0x8a2)]=function(){const _0x5a1cc7=_0x3a5d8e;return VisuMZ[_0x5a1cc7(0x690)][_0x5a1cc7(0x227)][_0x5a1cc7(0x169)][_0x5a1cc7(0x64b)];},Sprite_Damage[_0x3a5d8e(0x715)][_0x3a5d8e(0x7f9)]=function(){return ColorManager['outlineColorDmg']();},VisuMZ['CoreEngine']['Sprite_Gauge_gaugeRate']=Sprite_Gauge['prototype'][_0x3a5d8e(0x165)],Sprite_Gauge[_0x3a5d8e(0x715)]['gaugeRate']=function(){const _0x2f1355=_0x3a5d8e;return VisuMZ[_0x2f1355(0x690)][_0x2f1355(0x845)][_0x2f1355(0x528)](this)[_0x2f1355(0x2e9)](0x0,0x1);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x8b4)]=Sprite_Gauge[_0x3a5d8e(0x715)][_0x3a5d8e(0x787)],Sprite_Gauge[_0x3a5d8e(0x715)][_0x3a5d8e(0x787)]=function(){const _0x3e0209=_0x3a5d8e;let _0x209922=VisuMZ['CoreEngine'][_0x3e0209(0x8b4)][_0x3e0209(0x528)](this);return _0x209922;},Sprite_Gauge[_0x3a5d8e(0x715)][_0x3a5d8e(0x8b9)]=function(){const _0x449055=_0x3a5d8e;let _0x40f9d1=this['currentValue']();this[_0x449055(0x8a2)]()&&(_0x40f9d1=VisuMZ['GroupDigits'](_0x40f9d1));const _0x130312=this[_0x449055(0x780)]()-0x1,_0x21c7cf=this[_0x449055(0x5b2)]?this['textHeight']():this[_0x449055(0x2dd)]();this[_0x449055(0x638)](),this['bitmap'][_0x449055(0x159)](_0x40f9d1,0x0,0x0,_0x130312,_0x21c7cf,'right');},Sprite_Gauge[_0x3a5d8e(0x715)][_0x3a5d8e(0x392)]=function(){return 0x3;},Sprite_Gauge['prototype'][_0x3a5d8e(0x8a2)]=function(){const _0x19ea91=_0x3a5d8e;return VisuMZ[_0x19ea91(0x690)][_0x19ea91(0x227)]['QoL'][_0x19ea91(0x285)];},Sprite_Gauge['prototype'][_0x3a5d8e(0x7f9)]=function(){return ColorManager['outlineColorGauge']();},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x74d)]=Sprite_Picture['prototype'][_0x3a5d8e(0x90f)],Sprite_Picture[_0x3a5d8e(0x715)][_0x3a5d8e(0x90f)]=function(){const _0x4f9558=_0x3a5d8e;this[_0x4f9558(0x8b5)]&&this['_pictureName'][_0x4f9558(0x4d7)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x4f9558(0x1a0)](Number(RegExp['$1'])):VisuMZ[_0x4f9558(0x690)][_0x4f9558(0x74d)][_0x4f9558(0x528)](this);},Sprite_Picture[_0x3a5d8e(0x715)][_0x3a5d8e(0x1a0)]=function(_0x3bdd38){const _0xc316d0=_0x3a5d8e,_0x4bb51d=ImageManager[_0xc316d0(0x6e7)],_0x4f10ef=ImageManager[_0xc316d0(0x944)],_0x48a172=this[_0xc316d0(0x8b5)][_0xc316d0(0x4d7)](/SMOOTH/i);this[_0xc316d0(0x247)]=new Bitmap(_0x4bb51d,_0x4f10ef);const _0x382a1d=ImageManager[_0xc316d0(0x324)]('IconSet'),_0x5679c5=_0x3bdd38%0x10*_0x4bb51d,_0x3b6461=Math[_0xc316d0(0x3de)](_0x3bdd38/0x10)*_0x4f10ef;this[_0xc316d0(0x247)][_0xc316d0(0x886)]=_0x48a172,this[_0xc316d0(0x247)][_0xc316d0(0x870)](_0x382a1d,_0x5679c5,_0x3b6461,_0x4bb51d,_0x4f10ef,0x0,0x0,_0x4bb51d,_0x4f10ef);};function _0x23aa(_0x19ee81,_0x15b651){const _0x2be0d5=_0x2be0();return _0x23aa=function(_0x23aa02,_0x15f50f){_0x23aa02=_0x23aa02-0x14c;let _0x120d47=_0x2be0d5[_0x23aa02];return _0x120d47;},_0x23aa(_0x19ee81,_0x15b651);}function Sprite_TitlePictureButton(){this['initialize'](...arguments);}Sprite_TitlePictureButton[_0x3a5d8e(0x715)]=Object[_0x3a5d8e(0x1e9)](Sprite_Clickable[_0x3a5d8e(0x715)]),Sprite_TitlePictureButton[_0x3a5d8e(0x715)]['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x3a5d8e(0x715)][_0x3a5d8e(0x36e)]=function(_0x4629f9){const _0x41c032=_0x3a5d8e;Sprite_Clickable[_0x41c032(0x715)][_0x41c032(0x36e)][_0x41c032(0x528)](this),this['_data']=_0x4629f9,this[_0x41c032(0x854)]=null,this[_0x41c032(0x30b)]();},Sprite_TitlePictureButton[_0x3a5d8e(0x715)][_0x3a5d8e(0x30b)]=function(){const _0x1a516b=_0x3a5d8e;this['x']=Graphics[_0x1a516b(0x89a)],this['y']=Graphics['height'],this[_0x1a516b(0x8c3)]=![],this[_0x1a516b(0x2c7)]();},Sprite_TitlePictureButton['prototype'][_0x3a5d8e(0x2c7)]=function(){const _0xb1d866=_0x3a5d8e;this[_0xb1d866(0x247)]=ImageManager['loadPicture'](this[_0xb1d866(0x488)][_0xb1d866(0x485)]),this['bitmap'][_0xb1d866(0x618)](this[_0xb1d866(0x709)]['bind'](this));},Sprite_TitlePictureButton[_0x3a5d8e(0x715)][_0x3a5d8e(0x709)]=function(){const _0x350b60=_0x3a5d8e;this[_0x350b60(0x488)][_0x350b60(0x2f3)][_0x350b60(0x528)](this),this[_0x350b60(0x488)]['PositionJS'][_0x350b60(0x528)](this),this[_0x350b60(0x1f3)](this[_0x350b60(0x488)][_0x350b60(0x907)][_0x350b60(0x8b1)](this));},Sprite_TitlePictureButton[_0x3a5d8e(0x715)][_0x3a5d8e(0x24a)]=function(){const _0x153905=_0x3a5d8e;Sprite_Clickable[_0x153905(0x715)]['update'][_0x153905(0x528)](this),this['updateOpacity'](),this[_0x153905(0x180)]();},Sprite_TitlePictureButton[_0x3a5d8e(0x715)]['fadeSpeed']=function(){const _0x54029d=_0x3a5d8e;return VisuMZ[_0x54029d(0x690)][_0x54029d(0x227)][_0x54029d(0x4bd)][_0x54029d(0x7f4)][_0x54029d(0x458)];},Sprite_TitlePictureButton[_0x3a5d8e(0x715)][_0x3a5d8e(0x4e3)]=function(){const _0x2bc410=_0x3a5d8e;this[_0x2bc410(0x282)]||this['_hovered']?this[_0x2bc410(0x951)]=0xff:(this[_0x2bc410(0x951)]+=this[_0x2bc410(0x8c3)]?this['fadeSpeed']():-0x1*this[_0x2bc410(0x4cb)](),this[_0x2bc410(0x951)]=Math['min'](0xc0,this[_0x2bc410(0x951)]));},Sprite_TitlePictureButton[_0x3a5d8e(0x715)][_0x3a5d8e(0x1f3)]=function(_0x226264){const _0x2dbbd5=_0x3a5d8e;this[_0x2dbbd5(0x854)]=_0x226264;},Sprite_TitlePictureButton[_0x3a5d8e(0x715)]['onClick']=function(){const _0x453cae=_0x3a5d8e;this[_0x453cae(0x854)]&&this['_clickHandler']();},VisuMZ[_0x3a5d8e(0x690)]['Spriteset_Base_initialize']=Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x36e)],Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x36e)]=function(){const _0x20d6b8=_0x3a5d8e;VisuMZ[_0x20d6b8(0x690)][_0x20d6b8(0x7c1)][_0x20d6b8(0x528)](this),this[_0x20d6b8(0x768)]();},Spriteset_Base[_0x3a5d8e(0x715)]['initMembersCoreEngine']=function(){const _0x8e844e=_0x3a5d8e;this[_0x8e844e(0x7c6)]=[],this['_pointAnimationSprites']=[],this[_0x8e844e(0x92a)]=this[_0x8e844e(0x3fd)]['x'],this[_0x8e844e(0x580)]=this[_0x8e844e(0x3fd)]['y'];},VisuMZ[_0x3a5d8e(0x690)]['Spriteset_Base_destroy']=Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x1c3)],Spriteset_Base['prototype'][_0x3a5d8e(0x1c3)]=function(_0x2138cd){const _0x11e88a=_0x3a5d8e;this[_0x11e88a(0x78b)](),this[_0x11e88a(0x66b)](),VisuMZ[_0x11e88a(0x690)][_0x11e88a(0x5ef)][_0x11e88a(0x528)](this,_0x2138cd);},VisuMZ['CoreEngine'][_0x3a5d8e(0x8ca)]=Spriteset_Base[_0x3a5d8e(0x715)]['update'],Spriteset_Base[_0x3a5d8e(0x715)]['update']=function(){const _0x5567cb=_0x3a5d8e;VisuMZ[_0x5567cb(0x690)][_0x5567cb(0x8ca)][_0x5567cb(0x528)](this),this[_0x5567cb(0x453)](),this[_0x5567cb(0x38b)](),this[_0x5567cb(0x36c)]();},Spriteset_Base['prototype'][_0x3a5d8e(0x453)]=function(){const _0x2ab98d=_0x3a5d8e;if(!VisuMZ['CoreEngine']['Settings'][_0x2ab98d(0x169)][_0x2ab98d(0x7f2)])return;if(this['_cacheScaleX']===this[_0x2ab98d(0x3fd)]['x']&&this['_cacheScaleY']===this[_0x2ab98d(0x3fd)]['y'])return;this[_0x2ab98d(0x808)](),this[_0x2ab98d(0x92a)]=this[_0x2ab98d(0x3fd)]['x'],this[_0x2ab98d(0x580)]=this[_0x2ab98d(0x3fd)]['y'];},Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x808)]=function(){const _0x19ac4a=_0x3a5d8e;if(SceneManager[_0x19ac4a(0x648)]()&&Spriteset_Map[_0x19ac4a(0x31b)]){if(_0x19ac4a(0x51a)!=='PeEkr'){if(!this[_0x19ac4a(0x3b8)]);const _0x1fa998=this[_0x19ac4a(0x3b8)]['name']||'';_0x1fa998['match'](/<RATE:[ ](\d+)>/i)&&(this[_0x19ac4a(0x499)]=(_0x206f30(_0x44537a['$1'])||0x1)['clamp'](0x1,0xa));}else return;}else{if(SceneManager[_0x19ac4a(0x7ba)]()&&Spriteset_Battle[_0x19ac4a(0x31b)])return;}this[_0x19ac4a(0x3fd)]['x']!==0x0&&('zokha'!==_0x19ac4a(0x978)?(this[_0x19ac4a(0x718)][_0x19ac4a(0x3fd)]['x']=0x1/this[_0x19ac4a(0x3fd)]['x'],this['_pictureContainer']['x']=-(this['x']/this['scale']['x'])):this[_0x19ac4a(0x788)]()),this[_0x19ac4a(0x3fd)]['y']!==0x0&&(this[_0x19ac4a(0x718)]['scale']['y']=0x1/this[_0x19ac4a(0x3fd)]['y'],this[_0x19ac4a(0x718)]['y']=-(this['y']/this[_0x19ac4a(0x3fd)]['y']));},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x5e3)]=Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x809)],Spriteset_Base['prototype'][_0x3a5d8e(0x809)]=function(){const _0x10a946=_0x3a5d8e;VisuMZ[_0x10a946(0x690)][_0x10a946(0x5e3)]['call'](this),this[_0x10a946(0x15a)]();},Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x15a)]=function(){const _0x103246=_0x3a5d8e;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0x103246(0x6dd)]($gameScreen['shake']());const _0x4fdd02=$gameScreen[_0x103246(0x1fb)]();switch($gameScreen[_0x103246(0x1fb)]()){case _0x103246(0x561):this[_0x103246(0x909)]();break;case _0x103246(0x1bf):this['updatePositionCoreEngineShakeHorz']();break;case _0x103246(0x936):this[_0x103246(0x25c)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x909)]=function(){const _0x40e9cb=_0x3a5d8e,_0x3ffad9=VisuMZ[_0x40e9cb(0x690)][_0x40e9cb(0x227)][_0x40e9cb(0x897)];if(_0x3ffad9&&_0x3ffad9['originalJS'])return _0x3ffad9['originalJS']['call'](this);this['x']+=Math[_0x40e9cb(0x6dd)]($gameScreen['shake']());},Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x827)]=function(){const _0x976f62=_0x3a5d8e,_0x462052=VisuMZ[_0x976f62(0x690)][_0x976f62(0x227)][_0x976f62(0x897)];if(_0x462052&&_0x462052['randomJS'])return _0x462052['randomJS']['call'](this);const _0x3a2ae9=$gameScreen[_0x976f62(0x5cc)]*0.75,_0x522e5b=$gameScreen[_0x976f62(0x710)]*0.6,_0x34f32a=$gameScreen[_0x976f62(0x590)];this['x']+=Math[_0x976f62(0x6dd)](Math['randomInt'](_0x3a2ae9)-Math['randomInt'](_0x522e5b))*(Math[_0x976f62(0x84c)](_0x34f32a,0x1e)*0.5),this['y']+=Math[_0x976f62(0x6dd)](Math[_0x976f62(0x38e)](_0x3a2ae9)-Math[_0x976f62(0x38e)](_0x522e5b))*(Math[_0x976f62(0x84c)](_0x34f32a,0x1e)*0.5);},Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x81f)]=function(){const _0x53a9c5=_0x3a5d8e,_0x337529=VisuMZ[_0x53a9c5(0x690)][_0x53a9c5(0x227)][_0x53a9c5(0x897)];if(_0x337529&&_0x337529['horzJS'])return _0x337529[_0x53a9c5(0x439)][_0x53a9c5(0x528)](this);const _0x21b7cf=$gameScreen[_0x53a9c5(0x5cc)]*0.75,_0x57c2e3=$gameScreen[_0x53a9c5(0x710)]*0.6,_0x59c2a6=$gameScreen[_0x53a9c5(0x590)];this['x']+=Math[_0x53a9c5(0x6dd)](Math[_0x53a9c5(0x38e)](_0x21b7cf)-Math[_0x53a9c5(0x38e)](_0x57c2e3))*(Math[_0x53a9c5(0x84c)](_0x59c2a6,0x1e)*0.5);},Spriteset_Base[_0x3a5d8e(0x715)]['updatePositionCoreEngineShakeVert']=function(){const _0x194292=_0x3a5d8e,_0xaa33c0=VisuMZ['CoreEngine'][_0x194292(0x227)][_0x194292(0x897)];if(_0xaa33c0&&_0xaa33c0['vertJS'])return _0xaa33c0['vertJS']['call'](this);const _0xf17cc9=$gameScreen[_0x194292(0x5cc)]*0.75,_0x2dbc50=$gameScreen[_0x194292(0x710)]*0.6,_0x5671d5=$gameScreen['_shakeDuration'];this['y']+=Math['round'](Math[_0x194292(0x38e)](_0xf17cc9)-Math[_0x194292(0x38e)](_0x2dbc50))*(Math[_0x194292(0x84c)](_0x5671d5,0x1e)*0.5);},Spriteset_Base['prototype'][_0x3a5d8e(0x38b)]=function(){const _0x5babf9=_0x3a5d8e;for(const _0x45b994 of this[_0x5babf9(0x7c6)]){if(!_0x45b994[_0x5babf9(0x938)]()){if('RfnKr'===_0x5babf9(0x1b7))this[_0x5babf9(0x2c3)](_0x45b994);else{const _0x517a8e=(_0x1fcadb[_0x5babf9(0x9b6)]||'')[_0x5babf9(0x8bb)]()[_0x5babf9(0x3ab)](),_0x880ede=(_0x3d939a[_0x5babf9(0x318)]||'')['toLowerCase']()['trim']();_0x8bc77f[_0x5babf9(0x690)]['ControllerButtons'][_0x517a8e]=_0x253b50,_0x4bf5d6[_0x5babf9(0x690)][_0x5babf9(0x1cf)][_0x880ede]=_0x517a8e;}}}this[_0x5babf9(0x3eb)]();},Spriteset_Base[_0x3a5d8e(0x715)]['processFauxAnimationRequests']=function(){const _0x567c40=_0x3a5d8e;for(;;){if(_0x567c40(0x163)!=='MBxXU'){const _0x5b2cf4=$gameTemp[_0x567c40(0x688)]();if(_0x5b2cf4)this[_0x567c40(0x4c7)](_0x5b2cf4);else break;}else this[_0x567c40(0x6e8)](),this[_0x567c40(0x36a)]();}},Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x4c7)]=function(_0x2779d0){const _0x32239f=_0x3a5d8e,_0x57cb3a=$dataAnimations[_0x2779d0[_0x32239f(0x807)]],_0x1341ec=_0x2779d0[_0x32239f(0x652)],_0x185eba=_0x2779d0['mirror'],_0x306f74=_0x2779d0[_0x32239f(0x477)];let _0x4b1c39=this[_0x32239f(0x3cf)]();const _0x302cea=this[_0x32239f(0x754)]();if(this[_0x32239f(0x72c)](_0x57cb3a)){if(_0x32239f(0x447)===_0x32239f(0x447))for(const _0x33f968 of _0x1341ec){'mgAnL'===_0x32239f(0x96c)?this['opacity']=0xff:(this[_0x32239f(0x3e9)]([_0x33f968],_0x57cb3a,_0x185eba,_0x4b1c39,_0x306f74),_0x4b1c39+=_0x302cea);}else{if(_0x3dec35[_0x32239f(0x7db)]==='')return![];if(_0x4e4ed9[_0x32239f(0x7db)]===_0x32239f(0x929))return![];if(_0x18ae40[_0x32239f(0x19e)]==='')return![];if(_0x524c16['version']===_0x32239f(0x80c))return![];return!![];}}else this[_0x32239f(0x3e9)](_0x1341ec,_0x57cb3a,_0x185eba,_0x4b1c39,_0x306f74);},Spriteset_Base[_0x3a5d8e(0x715)]['createFauxAnimationSprite']=function(_0x361d93,_0x4c3c6f,_0x16efeb,_0x41fb61,_0x18a8e5){const _0x41879b=_0x3a5d8e,_0x4789d1=this[_0x41879b(0x14d)](_0x4c3c6f),_0x5b189f=new(_0x4789d1?Sprite_AnimationMV:Sprite_Animation)(),_0x4025eb=this['makeTargetSprites'](_0x361d93);this[_0x41879b(0x3a9)](_0x361d93[0x0])&&(_0x16efeb=!_0x16efeb),_0x5b189f['targetObjects']=_0x361d93,_0x5b189f[_0x41879b(0x30b)](_0x4025eb,_0x4c3c6f,_0x16efeb,_0x41fb61),_0x5b189f[_0x41879b(0x1a1)](_0x18a8e5),this[_0x41879b(0x4db)]['addChild'](_0x5b189f),this[_0x41879b(0x7c6)][_0x41879b(0x429)](_0x5b189f);},Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x2c3)]=function(_0x18d49f){const _0x1c5824=_0x3a5d8e;this[_0x1c5824(0x7c6)][_0x1c5824(0x21f)](_0x18d49f),this[_0x1c5824(0x4db)][_0x1c5824(0x91c)](_0x18d49f);for(const _0x2d392f of _0x18d49f[_0x1c5824(0x7e8)]){if(_0x1c5824(0x419)!=='oIGin')_0x2d392f[_0x1c5824(0x1fd)]&&_0x2d392f[_0x1c5824(0x1fd)]();else{const _0x5b3f90=_0x15b662[_0x4fec57][_0x1c5824(0x53e)];_0xcb8639+=_0x163b0d+_0x1c5824(0x74b)[_0x1c5824(0x5a1)](_0x38b241,_0x5b3f90||_0x1c5824(0x6cb))+_0x238ebb;}}_0x18d49f[_0x1c5824(0x1c3)]();},Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x78b)]=function(){const _0x2d2bad=_0x3a5d8e;for(const _0x1dbb0b of this['_fauxAnimationSprites']){if('JoLnd'===_0x2d2bad(0x71e))this['removeFauxAnimation'](_0x1dbb0b);else{let _0x414c84=_0x3370fa[_0x2d2bad(0x690)][_0x2d2bad(0x866)][_0x2d2bad(0x528)](this);return this[_0x2d2bad(0x627)]()&&(_0x414c84*=_0x48bb72[_0x2d2bad(0x415)]()),_0x414c84;}}},Spriteset_Base['prototype'][_0x3a5d8e(0x46e)]=function(){const _0x420ec6=_0x3a5d8e;return this[_0x420ec6(0x7c6)][_0x420ec6(0x3fe)]>0x0;},Spriteset_Base['prototype'][_0x3a5d8e(0x36c)]=function(){const _0x461f47=_0x3a5d8e;for(const _0xe7aaa8 of this['_pointAnimationSprites']){if(_0x461f47(0x1f1)===_0x461f47(0x1f1))!_0xe7aaa8[_0x461f47(0x938)]()&&this[_0x461f47(0x187)](_0xe7aaa8);else{if(!_0x43c514[_0x461f47(0x583)]())return;const _0x8f9fe8=_0x386f71['getLastUsedGamepadType']();_0x4c6dfa[_0x461f47(0x725)]&&_0x213d54['clipboard'][_0x461f47(0x276)](_0x8f9fe8);}}this['processPointAnimationRequests']();},Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x871)]=function(){const _0x6a4018=_0x3a5d8e;for(;;){const _0x3f5039=$gameTemp[_0x6a4018(0x3ad)]();if(_0x3f5039)this[_0x6a4018(0x2fc)](_0x3f5039);else break;}},Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x2fc)]=function(_0x2eaf9a){const _0x47a150=_0x3a5d8e,_0x2bfe0a=$dataAnimations[_0x2eaf9a[_0x47a150(0x807)]],_0x1691db=this[_0x47a150(0x4cd)](_0x2eaf9a),_0x28cddc=_0x2eaf9a['mirror'],_0x524dd1=_0x2eaf9a[_0x47a150(0x477)];let _0x3fd159=this[_0x47a150(0x3cf)]();const _0x5838bf=this['animationNextDelay']();if(this[_0x47a150(0x72c)](_0x2bfe0a))for(const _0x4222e8 of _0x1691db){this[_0x47a150(0x795)]([_0x4222e8],_0x2bfe0a,_0x28cddc,_0x3fd159,_0x524dd1),_0x3fd159+=_0x5838bf;}else{if(_0x47a150(0x910)!==_0x47a150(0x99a))this[_0x47a150(0x795)](_0x1691db,_0x2bfe0a,_0x28cddc,_0x3fd159,_0x524dd1);else return _0x1ad1a4[_0x47a150(0x690)][_0x47a150(0x227)]['Color'][_0x47a150(0x5b6)]['call'](this,_0x5684ba);}},Spriteset_Base['prototype'][_0x3a5d8e(0x4cd)]=function(_0x2766b0){const _0x5654a0=_0x3a5d8e,_0x4fd8d3=new Sprite_Clickable();_0x4fd8d3['x']=_0x2766b0['x'],_0x4fd8d3['y']=_0x2766b0['y'],_0x4fd8d3['z']=0x64;const _0x4c4f35=this[_0x5654a0(0x1db)]();return _0x4c4f35[_0x5654a0(0x162)](_0x4fd8d3),[_0x4fd8d3];},Spriteset_Base[_0x3a5d8e(0x715)]['getPointAnimationLayer']=function(){return this;},Spriteset_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x1db)]=function(){const _0x3c6238=_0x3a5d8e;return this[_0x3c6238(0x24d)]||this;},Spriteset_Battle[_0x3a5d8e(0x715)][_0x3a5d8e(0x1db)]=function(){const _0x508998=_0x3a5d8e;return this[_0x508998(0x3b3)]||this;},Spriteset_Base['prototype']['createPointAnimationSprite']=function(_0x452544,_0x21c3d5,_0x651521,_0x88a48e,_0x155215){const _0x2a2d8e=_0x3a5d8e,_0x42825e=this['isMVAnimation'](_0x21c3d5),_0x5353a0=new(_0x42825e?Sprite_AnimationMV:Sprite_Animation)();_0x5353a0['targetObjects']=_0x452544,_0x5353a0[_0x2a2d8e(0x30b)](_0x452544,_0x21c3d5,_0x651521,_0x88a48e),_0x5353a0[_0x2a2d8e(0x1a1)](_0x155215),this[_0x2a2d8e(0x4db)]['addChild'](_0x5353a0),this['_pointAnimationSprites'][_0x2a2d8e(0x429)](_0x5353a0);},Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x187)]=function(_0x222d4e){const _0x2e36ff=_0x3a5d8e;this[_0x2e36ff(0x68d)][_0x2e36ff(0x21f)](_0x222d4e),this[_0x2e36ff(0x4db)][_0x2e36ff(0x91c)](_0x222d4e);for(const _0x18d5b8 of _0x222d4e[_0x2e36ff(0x7e8)]){if(_0x18d5b8[_0x2e36ff(0x1fd)]){if(_0x2e36ff(0x35a)!=='pUcZN'){const _0x39f089=this[_0x2e36ff(0x14d)](_0x5e7cbe),_0x3a1407=new(_0x39f089?_0x354337:_0x20a240)();_0x3a1407[_0x2e36ff(0x7e8)]=_0x11e519,_0x3a1407[_0x2e36ff(0x30b)](_0x253bff,_0x54bdda,_0x1ed09d,_0x34bc35),_0x3a1407[_0x2e36ff(0x1a1)](_0x49eb42),this[_0x2e36ff(0x4db)][_0x2e36ff(0x162)](_0x3a1407),this[_0x2e36ff(0x68d)][_0x2e36ff(0x429)](_0x3a1407);}else _0x18d5b8[_0x2e36ff(0x1fd)]();}const _0x243962=this[_0x2e36ff(0x1db)]();if(_0x243962)_0x243962[_0x2e36ff(0x91c)](_0x18d5b8);}_0x222d4e[_0x2e36ff(0x1c3)]();},Spriteset_Base[_0x3a5d8e(0x715)]['removeAllPointAnimations']=function(){const _0x42a9af=_0x3a5d8e;for(const _0x434fbc of this['_pointAnimationSprites']){_0x42a9af(0x954)===_0x42a9af(0x9af)?_0x2ca92f[_0x42a9af(0x1e7)](_0xf05b95,_0x5c09b4):this['removePointAnimation'](_0x434fbc);}},Spriteset_Base['prototype'][_0x3a5d8e(0x5ea)]=function(){const _0x2b8f87=_0x3a5d8e;return this[_0x2b8f87(0x68d)][_0x2b8f87(0x3fe)]>0x0;},VisuMZ['CoreEngine'][_0x3a5d8e(0x53d)]=Spriteset_Base['prototype'][_0x3a5d8e(0x5c4)],Spriteset_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x5c4)]=function(){const _0x32a61f=_0x3a5d8e;return VisuMZ['CoreEngine'][_0x32a61f(0x53d)][_0x32a61f(0x528)](this)||this[_0x32a61f(0x5ea)]();},Spriteset_Map[_0x3a5d8e(0x31b)]=VisuMZ['CoreEngine']['Settings']['QoL'][_0x3a5d8e(0x510)]||![],VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x2e6)]=Scene_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x8d3)],Scene_Map['prototype'][_0x3a5d8e(0x8d3)]=function(){const _0x32b80a=_0x3a5d8e;VisuMZ[_0x32b80a(0x690)]['Scene_Map_createSpriteset_detach'][_0x32b80a(0x528)](this);if(!Spriteset_Map[_0x32b80a(0x31b)])return;const _0x4ed0a0=this['_spriteset'];if(!_0x4ed0a0)return;this[_0x32b80a(0x718)]=_0x4ed0a0[_0x32b80a(0x718)];if(!this[_0x32b80a(0x718)])return;this[_0x32b80a(0x162)](this[_0x32b80a(0x718)]);},Spriteset_Battle[_0x3a5d8e(0x31b)]=VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x227)][_0x3a5d8e(0x169)][_0x3a5d8e(0x93d)]||![],VisuMZ[_0x3a5d8e(0x690)]['Scene_Battle_createSpriteset_detach']=Scene_Battle[_0x3a5d8e(0x715)]['createSpriteset'],Scene_Battle[_0x3a5d8e(0x715)]['createSpriteset']=function(){const _0x17c325=_0x3a5d8e;VisuMZ['CoreEngine'][_0x17c325(0x925)][_0x17c325(0x528)](this);if(!Spriteset_Battle[_0x17c325(0x31b)])return;const _0x2f5f31=this[_0x17c325(0x91e)];if(!_0x2f5f31)return;this[_0x17c325(0x718)]=_0x2f5f31['_pictureContainer'];if(!this[_0x17c325(0x718)])return;this[_0x17c325(0x162)](this[_0x17c325(0x718)]);},Spriteset_Battle[_0x3a5d8e(0x715)][_0x3a5d8e(0x1d6)]=function(){const _0x32bdc8=_0x3a5d8e;this[_0x32bdc8(0x5b5)]=new PIXI[(_0x32bdc8(0x797))][(_0x32bdc8(0x5fa))](clamp=!![]),this[_0x32bdc8(0x389)]=new Sprite(),this['_backgroundSprite'][_0x32bdc8(0x247)]=SceneManager[_0x32bdc8(0x84a)](),this['_backgroundSprite'][_0x32bdc8(0x797)]=[this[_0x32bdc8(0x5b5)]],this[_0x32bdc8(0x8bf)][_0x32bdc8(0x162)](this['_backgroundSprite']);},VisuMZ[_0x3a5d8e(0x690)]['Spriteset_Battle_createEnemies']=Spriteset_Battle['prototype']['createEnemies'],Spriteset_Battle['prototype'][_0x3a5d8e(0x3d3)]=function(){const _0x31c505=_0x3a5d8e;this[_0x31c505(0x814)]()&&this[_0x31c505(0x3b5)](),VisuMZ['CoreEngine'][_0x31c505(0x9a2)]['call'](this);},Spriteset_Battle[_0x3a5d8e(0x715)][_0x3a5d8e(0x814)]=function(){const _0x1b14ce=_0x3a5d8e,_0x5a2bba=VisuMZ[_0x1b14ce(0x690)][_0x1b14ce(0x227)]['ScreenResolution'];if(!_0x5a2bba)return![];if(Utils[_0x1b14ce(0x444)]>=_0x1b14ce(0x87f)&&!_0x5a2bba['RepositionEnemies130'])return![];return _0x5a2bba[_0x1b14ce(0x822)];},Spriteset_Battle['prototype'][_0x3a5d8e(0x3b5)]=function(){const _0x4611dc=_0x3a5d8e;for(member of $gameTroop['members']()){'HrOhB'!==_0x4611dc(0x1a5)?member['moveRelativeToResolutionChange']():this[_0x4611dc(0x73d)]={'duration':_0x3b083a,'wholeDuration':_0x32525d,'type':_0x764ac9,'targetX':_0x36c3b3,'targetY':_0x12913a,'targetScaleX':_0x151248,'targetScaleY':_0x1e822e,'targetOpacity':_0x5a6f9f,'targetBackOpacity':_0x2623a4,'targetContentsOpacity':_0x47a221};}},VisuMZ['CoreEngine']['Window_Base_initialize']=Window_Base[_0x3a5d8e(0x715)]['initialize'],Window_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x36e)]=function(_0x34ef8f){const _0x5b4fbd=_0x3a5d8e;_0x34ef8f['x']=Math['round'](_0x34ef8f['x']),_0x34ef8f['y']=Math['round'](_0x34ef8f['y']),_0x34ef8f[_0x5b4fbd(0x89a)]=Math[_0x5b4fbd(0x6dd)](_0x34ef8f[_0x5b4fbd(0x89a)]),_0x34ef8f[_0x5b4fbd(0x223)]=Math['round'](_0x34ef8f[_0x5b4fbd(0x223)]),this['initDigitGrouping'](),VisuMZ['CoreEngine'][_0x5b4fbd(0x308)][_0x5b4fbd(0x528)](this,_0x34ef8f),this['initCoreEasing']();},Window_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x2de)]=function(){const _0x217fa4=_0x3a5d8e;this[_0x217fa4(0x39c)]=VisuMZ[_0x217fa4(0x690)][_0x217fa4(0x227)][_0x217fa4(0x169)][_0x217fa4(0x274)],this[_0x217fa4(0x68f)]=VisuMZ[_0x217fa4(0x690)][_0x217fa4(0x227)][_0x217fa4(0x169)]['DigitGroupingExText'];},Window_Base['prototype'][_0x3a5d8e(0x66d)]=function(){const _0x3f6f78=_0x3a5d8e;return VisuMZ['CoreEngine'][_0x3f6f78(0x227)][_0x3f6f78(0x7f0)][_0x3f6f78(0x33d)];},Window_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x8ad)]=function(){const _0x4c5ca8=_0x3a5d8e;return VisuMZ[_0x4c5ca8(0x690)][_0x4c5ca8(0x227)][_0x4c5ca8(0x7f0)]['ItemPadding'];},Window_Base[_0x3a5d8e(0x715)]['updateBackOpacity']=function(){const _0x3fbde0=_0x3a5d8e;$gameSystem[_0x3fbde0(0x594)]?this[_0x3fbde0(0x58d)]=$gameSystem[_0x3fbde0(0x594)]():this[_0x3fbde0(0x58d)]=VisuMZ[_0x3fbde0(0x690)][_0x3fbde0(0x227)][_0x3fbde0(0x7f0)][_0x3fbde0(0x6d1)];},Window_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x4a7)]=function(){const _0x283590=_0x3a5d8e;return VisuMZ['CoreEngine']['Settings'][_0x283590(0x7f0)][_0x283590(0x746)];},Window_Base[_0x3a5d8e(0x715)]['openingSpeed']=function(){const _0x768073=_0x3a5d8e;return VisuMZ['CoreEngine'][_0x768073(0x227)][_0x768073(0x7f0)]['OpenSpeed'];},VisuMZ['CoreEngine']['Window_Base_update']=Window_Base[_0x3a5d8e(0x715)]['update'],Window_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x24a)]=function(){const _0x11cfed=_0x3a5d8e;VisuMZ['CoreEngine'][_0x11cfed(0x1f4)][_0x11cfed(0x528)](this),this[_0x11cfed(0x7ac)]();},Window_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x1d4)]=function(){const _0x1fa089=_0x3a5d8e;this[_0x1fa089(0x5f6)]&&(this[_0x1fa089(0x5eb)]+=this[_0x1fa089(0x8e5)](),this[_0x1fa089(0x6cf)]()&&(this['_opening']=![]));},Window_Base[_0x3a5d8e(0x715)]['updateClose']=function(){const _0x5e81b0=_0x3a5d8e;this[_0x5e81b0(0x43d)]&&(this[_0x5e81b0(0x5eb)]-=this[_0x5e81b0(0x8e5)](),this[_0x5e81b0(0x80b)]()&&(this[_0x5e81b0(0x43d)]=![]));},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x8c7)]=Window_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x159)],Window_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x159)]=function(_0x5a8155,_0x352111,_0x50da9b,_0x1cfec0,_0x4dc63d){const _0xf49bad=_0x3a5d8e;if(this[_0xf49bad(0x8a2)]())_0x5a8155=VisuMZ['GroupDigits'](_0x5a8155);VisuMZ[_0xf49bad(0x690)]['Window_Base_drawText']['call'](this,_0x5a8155,_0x352111,_0x50da9b,_0x1cfec0,_0x4dc63d);},Window_Base['prototype'][_0x3a5d8e(0x8a2)]=function(){const _0x180077=_0x3a5d8e;return this[_0x180077(0x39c)];},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x635)]=Window_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x7dc)],Window_Base['prototype']['createTextState']=function(_0xa63a57,_0x59a863,_0x4a5144,_0x352d03){const _0x515070=_0x3a5d8e;var _0xcc92d3=VisuMZ[_0x515070(0x690)][_0x515070(0x635)][_0x515070(0x528)](this,_0xa63a57,_0x59a863,_0x4a5144,_0x352d03);if(this['useDigitGroupingEx']())_0xcc92d3[_0x515070(0x3f7)]=VisuMZ[_0x515070(0x5bd)](_0xcc92d3[_0x515070(0x3f7)]);return _0xcc92d3;},Window_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x986)]=function(){const _0x7402c2=_0x3a5d8e;return this[_0x7402c2(0x68f)];},Window_Base[_0x3a5d8e(0x715)]['enableDigitGrouping']=function(_0x3d9e04){const _0x2bc23b=_0x3a5d8e;this[_0x2bc23b(0x39c)]=_0x3d9e04;},Window_Base[_0x3a5d8e(0x715)]['enableDigitGroupingEx']=function(_0x52c51){const _0x4228f3=_0x3a5d8e;this[_0x4228f3(0x68f)]=_0x52c51;},VisuMZ['CoreEngine'][_0x3a5d8e(0x280)]=Window_Base[_0x3a5d8e(0x715)]['drawIcon'],Window_Base['prototype'][_0x3a5d8e(0x861)]=function(_0x3a0c44,_0x25efc2,_0x2f4889){const _0x1d538d=_0x3a5d8e;_0x25efc2=Math[_0x1d538d(0x6dd)](_0x25efc2),_0x2f4889=Math[_0x1d538d(0x6dd)](_0x2f4889),VisuMZ['CoreEngine'][_0x1d538d(0x280)][_0x1d538d(0x528)](this,_0x3a0c44,_0x25efc2,_0x2f4889);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x774)]=Window_Base['prototype'][_0x3a5d8e(0x7c2)],Window_Base[_0x3a5d8e(0x715)]['drawFace']=function(_0x545847,_0x470f31,_0x5beee1,_0x23abc3,_0x11cd1,_0x16629e){const _0x56248a=_0x3a5d8e;_0x11cd1=_0x11cd1||ImageManager[_0x56248a(0x6e1)],_0x16629e=_0x16629e||ImageManager['faceHeight'],_0x5beee1=Math[_0x56248a(0x6dd)](_0x5beee1),_0x23abc3=Math[_0x56248a(0x6dd)](_0x23abc3),_0x11cd1=Math['round'](_0x11cd1),_0x16629e=Math[_0x56248a(0x6dd)](_0x16629e),VisuMZ['CoreEngine'][_0x56248a(0x774)][_0x56248a(0x528)](this,_0x545847,_0x470f31,_0x5beee1,_0x23abc3,_0x11cd1,_0x16629e);},VisuMZ['CoreEngine']['Window_Base_drawCharacter']=Window_Base['prototype'][_0x3a5d8e(0x30c)],Window_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x30c)]=function(_0x121d71,_0x3aade7,_0x3c264e,_0x4c4058){const _0x49c036=_0x3a5d8e;_0x3c264e=Math['round'](_0x3c264e),_0x4c4058=Math['round'](_0x4c4058),VisuMZ[_0x49c036(0x690)]['Window_Base_drawCharacter'][_0x49c036(0x528)](this,_0x121d71,_0x3aade7,_0x3c264e,_0x4c4058);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x413)]=Window_Selectable[_0x3a5d8e(0x715)][_0x3a5d8e(0x9a5)],Window_Selectable[_0x3a5d8e(0x715)][_0x3a5d8e(0x9a5)]=function(_0x15528b){const _0x4fa52f=_0x3a5d8e;let _0x20d509=VisuMZ[_0x4fa52f(0x690)][_0x4fa52f(0x413)]['call'](this,_0x15528b);return _0x20d509['x']=Math[_0x4fa52f(0x6dd)](_0x20d509['x']),_0x20d509['y']=Math[_0x4fa52f(0x6dd)](_0x20d509['y']),_0x20d509[_0x4fa52f(0x89a)]=Math[_0x4fa52f(0x6dd)](_0x20d509['width']),_0x20d509['height']=Math[_0x4fa52f(0x6dd)](_0x20d509['height']),_0x20d509;},VisuMZ[_0x3a5d8e(0x690)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x8d0)],Window_StatusBase['prototype'][_0x3a5d8e(0x8d0)]=function(_0x4f8836,_0x3dba28,_0xdd0e1){const _0x160d36=_0x3a5d8e;_0x3dba28=Math[_0x160d36(0x6dd)](_0x3dba28),_0xdd0e1=Math[_0x160d36(0x6dd)](_0xdd0e1),VisuMZ['CoreEngine'][_0x160d36(0x95b)]['call'](this,_0x4f8836,_0x3dba28,_0xdd0e1);},Window_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x738)]=function(){const _0x40ebc7=_0x3a5d8e;this[_0x40ebc7(0x73d)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x40ebc7(0x3fd)]['x'],'targetScaleY':this[_0x40ebc7(0x3fd)]['y'],'targetOpacity':this[_0x40ebc7(0x951)],'targetBackOpacity':this[_0x40ebc7(0x58d)],'targetContentsOpacity':this[_0x40ebc7(0x26b)]};},Window_Base[_0x3a5d8e(0x715)]['updateCoreEasing']=function(){const _0x5f00d3=_0x3a5d8e;if(!this[_0x5f00d3(0x73d)])return;if(this[_0x5f00d3(0x73d)]['duration']<=0x0)return;this['x']=this[_0x5f00d3(0x4f9)](this['x'],this[_0x5f00d3(0x73d)]['targetX']),this['y']=this[_0x5f00d3(0x4f9)](this['y'],this[_0x5f00d3(0x73d)]['targetY']),this['scale']['x']=this[_0x5f00d3(0x4f9)](this[_0x5f00d3(0x3fd)]['x'],this[_0x5f00d3(0x73d)][_0x5f00d3(0x8ba)]),this[_0x5f00d3(0x3fd)]['y']=this[_0x5f00d3(0x4f9)](this[_0x5f00d3(0x3fd)]['y'],this[_0x5f00d3(0x73d)][_0x5f00d3(0x22b)]),this[_0x5f00d3(0x951)]=this[_0x5f00d3(0x4f9)](this[_0x5f00d3(0x951)],this[_0x5f00d3(0x73d)][_0x5f00d3(0x956)]),this[_0x5f00d3(0x58d)]=this['applyCoreEasing'](this[_0x5f00d3(0x58d)],this[_0x5f00d3(0x73d)][_0x5f00d3(0x6cd)]),this['contentsOpacity']=this['applyCoreEasing'](this[_0x5f00d3(0x26b)],this['_coreEasing'][_0x5f00d3(0x321)]),this['_coreEasing'][_0x5f00d3(0x7cb)]--;},Window_Base[_0x3a5d8e(0x715)]['applyCoreEasing']=function(_0x3c78e9,_0x3151be){const _0x439018=_0x3a5d8e;if(!this[_0x439018(0x73d)])return _0x3151be;const _0x22c83d=this[_0x439018(0x73d)]['duration'],_0x1ba780=this[_0x439018(0x73d)][_0x439018(0x3c7)],_0x45c13e=this[_0x439018(0x336)]((_0x1ba780-_0x22c83d)/_0x1ba780),_0x5ada8e=this[_0x439018(0x336)]((_0x1ba780-_0x22c83d+0x1)/_0x1ba780),_0x3cd57e=(_0x3c78e9-_0x3151be*_0x45c13e)/(0x1-_0x45c13e);return _0x3cd57e+(_0x3151be-_0x3cd57e)*_0x5ada8e;},Window_Base['prototype'][_0x3a5d8e(0x336)]=function(_0x100516){const _0x357fb7=_0x3a5d8e;if(!this[_0x357fb7(0x73d)])return _0x100516;return VisuMZ[_0x357fb7(0x5dd)](_0x100516,this[_0x357fb7(0x73d)][_0x357fb7(0x4d4)]||_0x357fb7(0x5d0));},Window_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x294)]=function(_0x5c0654,_0x242c85){const _0x555df6=_0x3a5d8e;if(!this[_0x555df6(0x73d)])return;this['x']=this[_0x555df6(0x73d)][_0x555df6(0x2bf)],this['y']=this[_0x555df6(0x73d)][_0x555df6(0x691)],this['scale']['x']=this[_0x555df6(0x73d)][_0x555df6(0x8ba)],this[_0x555df6(0x3fd)]['y']=this[_0x555df6(0x73d)]['targetScaleY'],this[_0x555df6(0x951)]=this[_0x555df6(0x73d)][_0x555df6(0x956)],this['backOpacity']=this['_coreEasing'][_0x555df6(0x6cd)],this[_0x555df6(0x26b)]=this[_0x555df6(0x73d)][_0x555df6(0x321)],this[_0x555df6(0x1c8)](_0x5c0654,_0x242c85,this['x'],this['y'],this[_0x555df6(0x3fd)]['x'],this['scale']['y'],this[_0x555df6(0x951)],this[_0x555df6(0x58d)],this[_0x555df6(0x26b)]);},Window_Base[_0x3a5d8e(0x715)]['setupCoreEasing']=function(_0x26a3f6,_0x54554a,_0x1a38be,_0x1f5329,_0x3ae81d,_0x5db9c2,_0x4cb815,_0x104985,_0x421487){const _0x15f4ce=_0x3a5d8e;this[_0x15f4ce(0x73d)]={'duration':_0x26a3f6,'wholeDuration':_0x26a3f6,'type':_0x54554a,'targetX':_0x1a38be,'targetY':_0x1f5329,'targetScaleX':_0x3ae81d,'targetScaleY':_0x5db9c2,'targetOpacity':_0x4cb815,'targetBackOpacity':_0x104985,'targetContentsOpacity':_0x421487};},Window_Base[_0x3a5d8e(0x715)]['drawCurrencyValue']=function(_0x780a3e,_0x3f4386,_0x205863,_0x149329,_0x29c601){const _0x20fe90=_0x3a5d8e;this[_0x20fe90(0x976)](),this[_0x20fe90(0x2b8)][_0x20fe90(0x171)]=VisuMZ[_0x20fe90(0x690)][_0x20fe90(0x227)][_0x20fe90(0x469)][_0x20fe90(0x1bb)];const _0x264473=VisuMZ['CoreEngine'][_0x20fe90(0x227)][_0x20fe90(0x469)][_0x20fe90(0x71b)];if(_0x264473>0x0&&_0x3f4386===TextManager[_0x20fe90(0x57a)]){const _0x1aae13=_0x149329+(this[_0x20fe90(0x66d)]()-ImageManager[_0x20fe90(0x944)])/0x2;this[_0x20fe90(0x861)](_0x264473,_0x205863+(_0x29c601-ImageManager[_0x20fe90(0x6e7)]),_0x1aae13),_0x29c601-=ImageManager[_0x20fe90(0x6e7)]+0x4;}else{if(_0x20fe90(0x578)===_0x20fe90(0x578))this[_0x20fe90(0x4e6)](ColorManager[_0x20fe90(0x9b1)]()),this[_0x20fe90(0x159)](_0x3f4386,_0x205863,_0x149329,_0x29c601,_0x20fe90(0x8ec)),_0x29c601-=this[_0x20fe90(0x1c7)](_0x3f4386)+0x6;else return _0x343aa2['layoutSettings'][_0x20fe90(0x208)][_0x20fe90(0x528)](this);}this[_0x20fe90(0x629)]();const _0x283d32=this[_0x20fe90(0x1c7)](this['_digitGrouping']?VisuMZ[_0x20fe90(0x5bd)](_0x780a3e):_0x780a3e);_0x283d32>_0x29c601?_0x20fe90(0x204)==='FhrQt'?this[_0x20fe90(0x159)](VisuMZ['CoreEngine'][_0x20fe90(0x227)][_0x20fe90(0x469)]['GoldOverlap'],_0x205863,_0x149329,_0x29c601,_0x20fe90(0x8ec)):this[_0x20fe90(0x52b)][_0x20fe90(0x357)](_0x11be6f[_0x20fe90(0x998)][_0x20fe90(0x662)]):_0x20fe90(0x267)!==_0x20fe90(0x267)?_0x14b136=_0x20fe90(0x79f)['format'](_0x3e38ec,_0x1353fb):this[_0x20fe90(0x159)](_0x780a3e,_0x205863,_0x149329,_0x29c601,_0x20fe90(0x8ec)),this[_0x20fe90(0x976)]();},Window_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x5cd)]=function(_0xbbd116,_0xd8823a,_0x512241,_0x38c09f,_0xa5ce32){const _0x3e3f65=_0x3a5d8e,_0x463e7a=ImageManager[_0x3e3f65(0x324)](_0x3e3f65(0x1c1)),_0xb8495f=ImageManager[_0x3e3f65(0x6e7)],_0x378174=ImageManager[_0x3e3f65(0x944)],_0x3c457b=_0xbbd116%0x10*_0xb8495f,_0x53d551=Math[_0x3e3f65(0x3de)](_0xbbd116/0x10)*_0x378174,_0x46808e=_0x38c09f,_0x5e5c11=_0x38c09f;this[_0x3e3f65(0x2b8)][_0x3e3f65(0x4c9)][_0x3e3f65(0x34b)]=_0xa5ce32,this['contents'][_0x3e3f65(0x870)](_0x463e7a,_0x3c457b,_0x53d551,_0xb8495f,_0x378174,_0xd8823a,_0x512241,_0x46808e,_0x5e5c11),this[_0x3e3f65(0x2b8)][_0x3e3f65(0x4c9)][_0x3e3f65(0x34b)]=!![];},Window_Base[_0x3a5d8e(0x715)]['drawGauge']=function(_0x5806ba,_0x5a6dd8,_0x117e88,_0x20783b,_0x1c359a,_0x53980f){const _0x2f8a6e=_0x3a5d8e,_0x313c3b=Math['floor']((_0x117e88-0x2)*_0x20783b),_0x1ff72b=Sprite_Gauge[_0x2f8a6e(0x715)][_0x2f8a6e(0x4a0)][_0x2f8a6e(0x528)](this),_0x37f873=_0x5a6dd8+this[_0x2f8a6e(0x66d)]()-_0x1ff72b-0x2;this[_0x2f8a6e(0x2b8)][_0x2f8a6e(0x8d2)](_0x5806ba,_0x37f873,_0x117e88,_0x1ff72b,ColorManager['gaugeBackColor']()),this['contents']['gradientFillRect'](_0x5806ba+0x1,_0x37f873+0x1,_0x313c3b,_0x1ff72b-0x2,_0x1c359a,_0x53980f);},Window_Selectable[_0x3a5d8e(0x715)][_0x3a5d8e(0x2c8)]=function(_0xd807c6){const _0x245f45=_0x3a5d8e;let _0x230839=this['index']();const _0x48a800=this[_0x245f45(0x5c5)](),_0x4df6e0=this[_0x245f45(0x1cb)]();if(this[_0x245f45(0x6b8)]()&&(_0x230839<_0x48a800||_0xd807c6&&_0x4df6e0===0x1)){_0x230839+=_0x4df6e0;if(_0x230839>=_0x48a800)_0x230839=_0x48a800-0x1;this['smoothSelect'](_0x230839);}else{if(!this[_0x245f45(0x6b8)]()){if(_0x230839<_0x48a800-_0x4df6e0||_0xd807c6&&_0x4df6e0===0x1){if(_0x245f45(0x225)!==_0x245f45(0x225)){const _0x2db709=_0xc4fe05['value'](_0x17cbf4);_0x329198[_0x245f45(0x869)](_0x489ece,!_0x2db709);}else this[_0x245f45(0x241)]((_0x230839+_0x4df6e0)%_0x48a800);}}}},VisuMZ[_0x3a5d8e(0x690)]['Window_Selectable_cursorDown']=Window_Selectable[_0x3a5d8e(0x715)]['cursorDown'],Window_Selectable[_0x3a5d8e(0x715)][_0x3a5d8e(0x2c8)]=function(_0x2ec722){const _0x149dbb=_0x3a5d8e;if(this['isUseModernControls']()&&_0x2ec722&&this[_0x149dbb(0x1cb)]()===0x1&&this[_0x149dbb(0x481)]()===this[_0x149dbb(0x5c5)]()-0x1){if('NoXNu'!=='NoXNu'){var _0x63748d=_0xbe5be0(_0x2559f5['$1']);_0x541754+=_0x63748d;}else this[_0x149dbb(0x241)](0x0);}else VisuMZ[_0x149dbb(0x690)][_0x149dbb(0x949)]['call'](this,_0x2ec722);},Window_Selectable[_0x3a5d8e(0x715)]['cursorUp']=function(_0x5ec9c4){const _0x37b254=_0x3a5d8e;let _0x5dab81=Math[_0x37b254(0x2bb)](0x0,this[_0x37b254(0x481)]());const _0xd714ea=this[_0x37b254(0x5c5)](),_0x43fa92=this[_0x37b254(0x1cb)]();if(this[_0x37b254(0x6b8)]()&&_0x5dab81>0x0||_0x5ec9c4&&_0x43fa92===0x1){_0x5dab81-=_0x43fa92;if(_0x5dab81<=0x0)_0x5dab81=0x0;this[_0x37b254(0x241)](_0x5dab81);}else!this[_0x37b254(0x6b8)]()&&((_0x5dab81>=_0x43fa92||_0x5ec9c4&&_0x43fa92===0x1)&&this[_0x37b254(0x241)]((_0x5dab81-_0x43fa92+_0xd714ea)%_0xd714ea));},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x402)]=Window_Selectable[_0x3a5d8e(0x715)]['cursorUp'],Window_Selectable[_0x3a5d8e(0x715)][_0x3a5d8e(0x76f)]=function(_0x22147d){const _0x53752a=_0x3a5d8e;this[_0x53752a(0x6b8)]()&&_0x22147d&&this[_0x53752a(0x1cb)]()===0x1&&this['index']()===0x0?this[_0x53752a(0x241)](this[_0x53752a(0x5c5)]()-0x1):VisuMZ[_0x53752a(0x690)]['Window_Selectable_cursorUp'][_0x53752a(0x528)](this,_0x22147d);},Window_Selectable[_0x3a5d8e(0x715)][_0x3a5d8e(0x6b8)]=function(){const _0x16939f=_0x3a5d8e;return VisuMZ[_0x16939f(0x690)][_0x16939f(0x227)][_0x16939f(0x169)][_0x16939f(0x437)];},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x933)]=Window_Selectable[_0x3a5d8e(0x715)]['processCursorMove'],Window_Selectable[_0x3a5d8e(0x715)][_0x3a5d8e(0x855)]=function(){const _0x50a1f0=_0x3a5d8e;this[_0x50a1f0(0x6b8)]()?(this[_0x50a1f0(0x6e8)](),this[_0x50a1f0(0x36a)]()):VisuMZ[_0x50a1f0(0x690)][_0x50a1f0(0x933)]['call'](this);},Window_Selectable[_0x3a5d8e(0x715)][_0x3a5d8e(0x842)]=function(){return!![];},Window_Selectable[_0x3a5d8e(0x715)][_0x3a5d8e(0x6e8)]=function(){const _0x351406=_0x3a5d8e;if(this[_0x351406(0x586)]()){if('gudPZ'!==_0x351406(0x7df))return _0x4fce9f[_0x351406(0x690)][_0x351406(0x227)]['QoL']['ImprovedAccuracySystem']?this['itemHitImprovedAccuracy'](_0x3d0e49):_0x247b53[_0x351406(0x690)][_0x351406(0x3a8)][_0x351406(0x528)](this,_0x364044);else{const _0x5ee5d3=this['index']();if(Input[_0x351406(0x6c4)](_0x351406(0x20e))){if(Input[_0x351406(0x3c3)]('shift')&&this[_0x351406(0x842)]()){if(_0x351406(0x4cf)===_0x351406(0x7f6)){const _0x386e28=_0x509a21['height']/this[_0x351406(0x66a)]();_0x386e28%0x1!==0x0&&_0x39a472['ceil'](_0x386e28)===this[_0x351406(0x223)]()&&!this['isLoopVertical']()&&(this[_0x351406(0x748)]['centerY']=!![],this['_centerCameraCheck'][_0x351406(0x27f)]=_0x3d989f[_0x351406(0x279)]||0x0);}else this['cursorPagedown']();}else this[_0x351406(0x2c8)](Input[_0x351406(0x873)](_0x351406(0x20e)));}Input[_0x351406(0x6c4)]('up')&&(Input[_0x351406(0x3c3)]('shift')&&this['allowShiftScrolling']()?this[_0x351406(0x240)]():this['cursorUp'](Input[_0x351406(0x873)]('up')));Input[_0x351406(0x6c4)](_0x351406(0x8ec))&&this[_0x351406(0x8af)](Input[_0x351406(0x873)](_0x351406(0x8ec)));if(Input[_0x351406(0x6c4)](_0x351406(0x554))){if(_0x351406(0x60b)===_0x351406(0x60b))this[_0x351406(0x7bf)](Input[_0x351406(0x873)](_0x351406(0x554)));else return 0.5*_0xa16a42*_0x15bfba*((_0x49aef0+0x1)*_0x2956ed-_0x5f23fc);}if(!this[_0x351406(0x824)](_0x351406(0x331))&&Input[_0x351406(0x6c4)]('pagedown')){if(_0x351406(0x79a)==='VwenV'){_0x2ff6f5[_0x351406(0x306)](_0x2eb88b,_0x1e5b6e);const _0x19e4db=_0x35023c[_0x351406(0x6dd)](_0x45a70e['pan'])[_0x351406(0x2e9)](-0x64,0x64),_0x2c7bb8=_0x79792c[_0x351406(0x19d)];_0x2c7bb8&&(_0x2c7bb8[_0x351406(0x843)]=_0x19e4db,_0x59b3f0[_0x351406(0x30e)](_0x2c7bb8));}else this[_0x351406(0x566)]();}!this[_0x351406(0x824)](_0x351406(0x8c4))&&Input[_0x351406(0x6c4)](_0x351406(0x8c4))&&this['cursorPageup'](),this[_0x351406(0x481)]()!==_0x5ee5d3&&this[_0x351406(0x537)]();}}},Window_Selectable[_0x3a5d8e(0x715)][_0x3a5d8e(0x36a)]=function(){const _0x1eddb2=_0x3a5d8e;if(this[_0x1eddb2(0x586)]()){const _0x390190=this[_0x1eddb2(0x481)]();Input[_0x1eddb2(0x873)](_0x1eddb2(0x491))&&this[_0x1eddb2(0x241)](Math[_0x1eddb2(0x84c)](this[_0x1eddb2(0x481)](),0x0));Input[_0x1eddb2(0x873)]('end')&&this['smoothSelect'](Math[_0x1eddb2(0x2bb)](this[_0x1eddb2(0x481)](),this[_0x1eddb2(0x5c5)]()-0x1));if(this[_0x1eddb2(0x481)]()!==_0x390190){if(_0x1eddb2(0x9a3)===_0x1eddb2(0x9a3))this[_0x1eddb2(0x537)]();else return![];}}},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x410)]=Window_Selectable[_0x3a5d8e(0x715)][_0x3a5d8e(0x180)],Window_Selectable[_0x3a5d8e(0x715)][_0x3a5d8e(0x180)]=function(){const _0x9dcdea=_0x3a5d8e;this[_0x9dcdea(0x6b8)]()?this['processTouchModernControls']():VisuMZ[_0x9dcdea(0x690)][_0x9dcdea(0x410)][_0x9dcdea(0x528)](this);},Window_Selectable[_0x3a5d8e(0x715)][_0x3a5d8e(0x3da)]=function(){const _0x6dad68=_0x3a5d8e;VisuMZ['CoreEngine'][_0x6dad68(0x410)][_0x6dad68(0x528)](this);},Window_Selectable[_0x3a5d8e(0x715)][_0x3a5d8e(0x6ae)]=function(){const _0x145339=_0x3a5d8e;return VisuMZ['CoreEngine'][_0x145339(0x227)]['Window'][_0x145339(0x3ee)];},Window_Selectable[_0x3a5d8e(0x715)]['rowSpacing']=function(){const _0x53ee34=_0x3a5d8e;return VisuMZ['CoreEngine']['Settings'][_0x53ee34(0x7f0)][_0x53ee34(0x18f)];},Window_Selectable['prototype']['itemHeight']=function(){const _0x12c05c=_0x3a5d8e;return Window_Scrollable[_0x12c05c(0x715)]['itemHeight'][_0x12c05c(0x528)](this)+VisuMZ['CoreEngine'][_0x12c05c(0x227)][_0x12c05c(0x7f0)]['ItemHeight'];;},VisuMZ[_0x3a5d8e(0x690)]['Window_Selectable_drawBackgroundRect']=Window_Selectable[_0x3a5d8e(0x715)][_0x3a5d8e(0x8c2)],Window_Selectable[_0x3a5d8e(0x715)]['drawBackgroundRect']=function(_0x451689){const _0x41a64c=_0x3a5d8e,_0x2dd58e=VisuMZ[_0x41a64c(0x690)][_0x41a64c(0x227)]['Window'];if(_0x2dd58e[_0x41a64c(0x4c0)]===![])return;_0x2dd58e[_0x41a64c(0x614)]?'RmuJS'!=='aNKSG'?_0x2dd58e[_0x41a64c(0x614)][_0x41a64c(0x528)](this,_0x451689):this['_clickHandler']&&this[_0x41a64c(0x854)]():VisuMZ[_0x41a64c(0x690)][_0x41a64c(0x1e8)][_0x41a64c(0x528)](this,_0x451689);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x7fb)]=Window_Gold['prototype']['refresh'],Window_Gold[_0x3a5d8e(0x715)][_0x3a5d8e(0x81b)]=function(){const _0x22010a=_0x3a5d8e;if(this[_0x22010a(0x777)]()){if(_0x22010a(0x97d)===_0x22010a(0x398)){this['contents'][_0x22010a(0x166)](),this['contentsBack']['clear'](),this[_0x22010a(0x629)]();let _0x2524e8=_0x3d0083[_0x22010a(0x690)][_0x22010a(0x227)]['KeyboardInput'][_0x22010a(0x386)][_0x22010a(0x730)]('\x0a'),_0x17cf90=_0x2524e8['length'],_0x9f3f82=(this['innerHeight']-_0x17cf90*this[_0x22010a(0x66d)]())/0x2;for(let _0x27b706=0x0;_0x27b706<_0x17cf90;++_0x27b706){let _0x52b5a4=_0x2524e8[_0x27b706],_0x3a5a62=this[_0x22010a(0x192)](_0x52b5a4)['width'],_0xd99aae=_0x403d46[_0x22010a(0x3de)]((this[_0x22010a(0x2b8)][_0x22010a(0x89a)]-_0x3a5a62)/0x2);this[_0x22010a(0x283)](_0x52b5a4,_0xd99aae,_0x9f3f82),_0x9f3f82+=this[_0x22010a(0x66d)]();}}else this['drawGoldItemStyle']();}else VisuMZ['CoreEngine'][_0x22010a(0x7fb)]['call'](this);},Window_Gold[_0x3a5d8e(0x715)][_0x3a5d8e(0x777)]=function(){const _0x6ab1f6=_0x3a5d8e;if(TextManager['currencyUnit']!==this[_0x6ab1f6(0x57a)]())return![];return VisuMZ[_0x6ab1f6(0x690)][_0x6ab1f6(0x227)][_0x6ab1f6(0x469)][_0x6ab1f6(0x1ca)];},Window_Gold[_0x3a5d8e(0x715)][_0x3a5d8e(0x788)]=function(){const _0x53ef8b=_0x3a5d8e;this[_0x53ef8b(0x976)](),this[_0x53ef8b(0x2b8)][_0x53ef8b(0x166)](),this[_0x53ef8b(0x2b8)][_0x53ef8b(0x171)]=VisuMZ['CoreEngine']['Settings'][_0x53ef8b(0x469)]['GoldFontSize'];const _0x53071b=VisuMZ[_0x53ef8b(0x690)][_0x53ef8b(0x227)][_0x53ef8b(0x469)][_0x53ef8b(0x71b)],_0x1da987=this[_0x53ef8b(0x441)](0x0);if(_0x53071b>0x0){if(_0x53ef8b(0x6d0)===_0x53ef8b(0x702)){const _0x98ab03=_0x53ef8b(0x62d);this['_colorCache']=this[_0x53ef8b(0x286)]||{};if(this[_0x53ef8b(0x286)][_0x98ab03])return this[_0x53ef8b(0x286)][_0x98ab03];const _0x381a1a=_0x5d3c84[_0x53ef8b(0x690)]['Settings'][_0x53ef8b(0x67e)][_0x53ef8b(0x175)];return this[_0x53ef8b(0x2d6)](_0x98ab03,_0x381a1a);}else{const _0x305ea1=_0x1da987['y']+(this[_0x53ef8b(0x66d)]()-ImageManager['iconHeight'])/0x2;this[_0x53ef8b(0x861)](_0x53071b,_0x1da987['x'],_0x305ea1);const _0x3d275b=ImageManager[_0x53ef8b(0x6e7)]+0x4;_0x1da987['x']+=_0x3d275b,_0x1da987[_0x53ef8b(0x89a)]-=_0x3d275b;}}this[_0x53ef8b(0x4e6)](ColorManager['systemColor']()),this[_0x53ef8b(0x159)](this[_0x53ef8b(0x57a)](),_0x1da987['x'],_0x1da987['y'],_0x1da987[_0x53ef8b(0x89a)],'left');const _0x5515e4=this[_0x53ef8b(0x1c7)](this[_0x53ef8b(0x57a)]())+0x6;;_0x1da987['x']+=_0x5515e4,_0x1da987[_0x53ef8b(0x89a)]-=_0x5515e4,this['resetTextColor']();const _0x1c96cd=this['value'](),_0x25b3f4=this[_0x53ef8b(0x1c7)](this['_digitGrouping']?VisuMZ[_0x53ef8b(0x5bd)](this[_0x53ef8b(0x61e)]()):this['value']());_0x25b3f4>_0x1da987['width']?_0x53ef8b(0x73b)===_0x53ef8b(0x73b)?this['drawText'](VisuMZ['CoreEngine']['Settings'][_0x53ef8b(0x469)][_0x53ef8b(0x8b8)],_0x1da987['x'],_0x1da987['y'],_0x1da987[_0x53ef8b(0x89a)],_0x53ef8b(0x8ec)):this['_optionsWindow'][_0x53ef8b(0x357)](_0x52bf34['layoutSettings'][_0x53ef8b(0x86a)]):_0x53ef8b(0x4c5)===_0x53ef8b(0x1af)?(_0x51e47e[_0x53ef8b(0x690)][_0x53ef8b(0x1fc)][_0x53ef8b(0x528)](this),this[_0x53ef8b(0x21d)]()):this['drawText'](this[_0x53ef8b(0x61e)](),_0x1da987['x'],_0x1da987['y'],_0x1da987['width'],_0x53ef8b(0x8ec)),this[_0x53ef8b(0x976)]();},Window_StatusBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x844)]=function(_0xf13a11,_0x386f39,_0x3ffed1,_0x35e121,_0x33c306){const _0xe927c=_0x3a5d8e;_0x35e121=String(_0x35e121||'')[_0xe927c(0x987)]();if(VisuMZ['CoreEngine'][_0xe927c(0x227)][_0xe927c(0x2fe)][_0xe927c(0x184)]){if(_0xe927c(0x992)!==_0xe927c(0x193)){const _0x4872f4=VisuMZ[_0xe927c(0x209)](_0x35e121);_0x33c306?_0xe927c(0x501)!==_0xe927c(0x501)?_0x4fcdee&&_0x12f995[_0xe927c(0x429)](_0x5e1d38):(this['drawIconBySize'](_0x4872f4,_0xf13a11,_0x386f39,this[_0xe927c(0x379)]()),_0x3ffed1-=this[_0xe927c(0x379)]()+0x2,_0xf13a11+=this[_0xe927c(0x379)]()+0x2):_0xe927c(0x812)===_0xe927c(0x46c)?_0x4e45b7['DrawItemBackgroundJS'][_0xe927c(0x528)](this,_0x5b5b98):(this['drawIcon'](_0x4872f4,_0xf13a11+0x2,_0x386f39+0x2),_0x3ffed1-=ImageManager['iconWidth']+0x4,_0xf13a11+=ImageManager[_0xe927c(0x6e7)]+0x4);}else{const _0x1ba15e=this[_0xe927c(0x70a)],_0x304dde=_0x1ba15e['globalAlpha'];_0x91d85d=_0x3cefeb||0xffffffff;let _0x4c018d=_0x4b09a1,_0x426e7b=_0x41af60[_0xe927c(0x6dd)](_0x1ee50e+0x18/0x2+this[_0xe927c(0x171)]*0.35);_0x4cf36d==='center'&&(_0x4c018d+=_0x4bf085/0x2),_0x943437===_0xe927c(0x8ec)&&(_0x4c018d+=_0x340cc7),_0x1ba15e[_0xe927c(0x6b5)](),_0x1ba15e[_0xe927c(0x575)]=this[_0xe927c(0x4d1)](),_0x1ba15e[_0xe927c(0x1d7)]=_0xc89547,_0x1ba15e['textBaseline']=_0xe927c(0x75c),_0x1ba15e[_0xe927c(0x5cb)]=0x1,this[_0xe927c(0x62f)](_0x228a9c,_0x4c018d,_0x426e7b,_0x337dff),_0x1ba15e[_0xe927c(0x5cb)]=_0x304dde,this[_0xe927c(0x865)](_0x56bbf7,_0x4c018d,_0x426e7b,_0x1f9f22),_0x1ba15e[_0xe927c(0x7ce)](),this[_0xe927c(0x599)][_0xe927c(0x24a)]();}}const _0x52abb2=TextManager[_0xe927c(0x4c4)](_0x35e121);this['resetFontSettings'](),this['changeTextColor'](ColorManager[_0xe927c(0x9b1)]()),_0x33c306?(this[_0xe927c(0x2b8)]['fontSize']=this['smallParamFontSize'](),this[_0xe927c(0x2b8)]['drawText'](_0x52abb2,_0xf13a11,_0x386f39,_0x3ffed1,this[_0xe927c(0x379)](),_0xe927c(0x554))):this[_0xe927c(0x159)](_0x52abb2,_0xf13a11,_0x386f39,_0x3ffed1),this['resetFontSettings']();},Window_StatusBase['prototype'][_0x3a5d8e(0x1b2)]=function(){const _0x2528c6=_0x3a5d8e;return $gameSystem[_0x2528c6(0x216)]()-0x8;},Window_StatusBase['prototype'][_0x3a5d8e(0x3b7)]=function(_0x1e37c3,_0x2473a3,_0x57ecac,_0x528efd){const _0x58d5ab=_0x3a5d8e;_0x528efd=_0x528efd||0xa8,this[_0x58d5ab(0x629)]();if(VisuMZ['CoreEngine'][_0x58d5ab(0x227)]['UI'][_0x58d5ab(0x42c)])this[_0x58d5ab(0x283)](_0x1e37c3[_0x58d5ab(0x256)]()[_0x58d5ab(0x53e)],_0x2473a3,_0x57ecac,_0x528efd);else{const _0x4d2343=_0x1e37c3[_0x58d5ab(0x256)]()[_0x58d5ab(0x53e)]['replace'](/\\I\[(\d+)\]/gi,'');this[_0x58d5ab(0x159)](_0x4d2343,_0x2473a3,_0x57ecac,_0x528efd);}},Window_StatusBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x2e2)]=function(_0x1210b9,_0x2c24e7,_0x18e701,_0x1556ae){const _0x2592bd=_0x3a5d8e;_0x1556ae=_0x1556ae||0x10e,this[_0x2592bd(0x629)]();if(VisuMZ[_0x2592bd(0x690)][_0x2592bd(0x227)]['UI'][_0x2592bd(0x3b1)])this[_0x2592bd(0x283)](_0x1210b9['nickname'](),_0x2c24e7,_0x18e701,_0x1556ae);else{const _0x328fdd=_0x1210b9['nickname']()[_0x2592bd(0x232)](/\\I\[(\d+)\]/gi,'');this[_0x2592bd(0x159)](_0x1210b9['nickname'](),_0x2c24e7,_0x18e701,_0x1556ae);}},VisuMZ[_0x3a5d8e(0x690)]['Window_StatusBase_drawActorLevel']=Window_StatusBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x1c5)],Window_StatusBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x1c5)]=function(_0x31fafb,_0x5222ef,_0x4ef4ef){const _0x1b4251=_0x3a5d8e;if(VisuMZ[_0x1b4251(0x690)][_0x1b4251(0x227)][_0x1b4251(0x2fe)]['ShowActorLevel']===![])return;if(this['isExpGaugeDrawn']())this[_0x1b4251(0x435)](_0x31fafb,_0x5222ef,_0x4ef4ef);VisuMZ['CoreEngine']['Window_StatusBase_drawActorLevel'][_0x1b4251(0x528)](this,_0x31fafb,_0x5222ef,_0x4ef4ef);},Window_StatusBase['prototype']['isExpGaugeDrawn']=function(){const _0x55bf7b=_0x3a5d8e;return VisuMZ[_0x55bf7b(0x690)][_0x55bf7b(0x227)]['UI'][_0x55bf7b(0x405)];},Window_StatusBase[_0x3a5d8e(0x715)][_0x3a5d8e(0x435)]=function(_0x24b168,_0x45cb99,_0x5155b0){const _0x377e9c=_0x3a5d8e;if(!_0x24b168)return;if(!_0x24b168[_0x377e9c(0x700)]())return;const _0x13041e=0x80,_0x3658e4=_0x24b168['expRate']();let _0x122b62=ColorManager[_0x377e9c(0x83b)](),_0x1f5309=ColorManager[_0x377e9c(0x8e2)]();_0x3658e4>=0x1&&(_0x122b62=ColorManager[_0x377e9c(0x51c)](),_0x1f5309=ColorManager['maxLvGaugeColor2']()),this['drawGauge'](_0x45cb99,_0x5155b0,_0x13041e,_0x3658e4,_0x122b62,_0x1f5309);},Window_EquipStatus[_0x3a5d8e(0x715)]['drawAllParams']=function(){const _0x1b9c68=_0x3a5d8e;let _0x1e78b0=0x0;for(const _0x24e18e of VisuMZ['CoreEngine'][_0x1b9c68(0x227)]['Param'][_0x1b9c68(0x84d)]){const _0x3cd4f8=this['itemPadding'](),_0x393620=this['paramY'](_0x1e78b0);this[_0x1b9c68(0x95c)](_0x3cd4f8,_0x393620,_0x24e18e),_0x1e78b0++;}},Window_EquipStatus[_0x3a5d8e(0x715)]['drawParamName']=function(_0x5078fa,_0x5d3522,_0x2909cd){const _0x277af4=_0x3a5d8e,_0x251d72=this[_0x277af4(0x2d1)]()-this[_0x277af4(0x8ad)]()*0x2;this[_0x277af4(0x844)](_0x5078fa,_0x5d3522,_0x251d72,_0x2909cd,![]);},Window_EquipStatus['prototype'][_0x3a5d8e(0x894)]=function(_0x2e50cd,_0x2c2fd6,_0xe04fa3){const _0x388123=_0x3a5d8e,_0x4ef4f6=this['paramWidth']();this[_0x388123(0x629)](),this[_0x388123(0x159)](this[_0x388123(0x495)][_0x388123(0x90c)](_0xe04fa3,!![]),_0x2e50cd,_0x2c2fd6,_0x4ef4f6,_0x388123(0x8ec));},Window_EquipStatus[_0x3a5d8e(0x715)][_0x3a5d8e(0x562)]=function(_0x2e3a51,_0x22bae3){const _0x11f68d=_0x3a5d8e,_0x35cb83=this[_0x11f68d(0x40d)]();this[_0x11f68d(0x4e6)](ColorManager[_0x11f68d(0x9b1)]());const _0xcb0504=VisuMZ[_0x11f68d(0x690)][_0x11f68d(0x227)]['UI']['ParamArrow'];this[_0x11f68d(0x159)](_0xcb0504,_0x2e3a51,_0x22bae3,_0x35cb83,_0x11f68d(0x61d));},Window_EquipStatus[_0x3a5d8e(0x715)][_0x3a5d8e(0x734)]=function(_0x23e2bb,_0x5e692f,_0x1776c9){const _0x426419=_0x3a5d8e,_0x2f9e4a=this[_0x426419(0x4fc)](),_0x24435e=this[_0x426419(0x832)][_0x426419(0x90c)](_0x1776c9),_0x5e45b8=_0x24435e-this[_0x426419(0x495)][_0x426419(0x90c)](_0x1776c9);this[_0x426419(0x4e6)](ColorManager['paramchangeTextColor'](_0x5e45b8)),this[_0x426419(0x159)](this[_0x426419(0x832)]['paramValueByName'](_0x1776c9,!![]),_0x23e2bb,_0x5e692f,_0x2f9e4a,_0x426419(0x8ec));},VisuMZ[_0x3a5d8e(0x690)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x3a5d8e(0x715)][_0x3a5d8e(0x536)],Window_EquipItem[_0x3a5d8e(0x715)][_0x3a5d8e(0x536)]=function(_0x428e92){const _0x40aa1d=_0x3a5d8e;if(_0x428e92&&this[_0x40aa1d(0x495)])return this[_0x40aa1d(0x495)][_0x40aa1d(0x712)](_0x428e92);else{if(_0x40aa1d(0x69c)===_0x40aa1d(0x69c))return VisuMZ[_0x40aa1d(0x690)][_0x40aa1d(0x68e)][_0x40aa1d(0x528)](this,_0x428e92);else _0x2fd648=_0x35f6ae['round'](_0x131f49),_0x546f19=_0x326ed1[_0x40aa1d(0x6dd)](_0x5e5f3),_0x3c2d2d['CoreEngine'][_0x40aa1d(0x2f1)][_0x40aa1d(0x528)](this,_0x172b3b,_0x58b244,_0x540fdc,_0x21cd3b);}},Window_StatusParams[_0x3a5d8e(0x715)][_0x3a5d8e(0x5c5)]=function(){const _0x22c18a=_0x3a5d8e;return VisuMZ[_0x22c18a(0x690)]['Settings'][_0x22c18a(0x2fe)][_0x22c18a(0x84d)][_0x22c18a(0x3fe)];},Window_StatusParams['prototype'][_0x3a5d8e(0x95c)]=function(_0x1a881b){const _0x133f92=_0x3a5d8e,_0x3cf00b=this[_0x133f92(0x441)](_0x1a881b),_0x3c39e6=VisuMZ[_0x133f92(0x690)]['Settings'][_0x133f92(0x2fe)]['DisplayedParams'][_0x1a881b],_0x493a8d=TextManager[_0x133f92(0x4c4)](_0x3c39e6),_0x574054=this[_0x133f92(0x495)][_0x133f92(0x90c)](_0x3c39e6,!![]);this[_0x133f92(0x844)](_0x3cf00b['x'],_0x3cf00b['y'],0xa0,_0x3c39e6,![]),this[_0x133f92(0x629)](),this[_0x133f92(0x159)](_0x574054,_0x3cf00b['x']+0xa0,_0x3cf00b['y'],0x3c,_0x133f92(0x8ec));};if(VisuMZ['CoreEngine'][_0x3a5d8e(0x227)][_0x3a5d8e(0x380)][_0x3a5d8e(0x7a6)]){VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x227)]['KeyboardInput'][_0x3a5d8e(0x58c)]&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x3a5d8e(0x5ce),'OK']);;VisuMZ[_0x3a5d8e(0x690)]['Window_NameInput_initialize']=Window_NameInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x36e)],Window_NameInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x36e)]=function(_0x20d053){const _0x45d0ff=_0x3a5d8e;this[_0x45d0ff(0x3c9)]=this[_0x45d0ff(0x6f1)](),VisuMZ[_0x45d0ff(0x690)][_0x45d0ff(0x964)]['call'](this,_0x20d053),this[_0x45d0ff(0x3c9)]===_0x45d0ff(0x41e)?this[_0x45d0ff(0x275)](0x0):(Input[_0x45d0ff(0x166)](),this[_0x45d0ff(0x4d6)]());},Window_NameInput[_0x3a5d8e(0x715)]['defaultInputMode']=function(){const _0x489ad8=_0x3a5d8e;if(Input[_0x489ad8(0x8dd)]())return'default';return VisuMZ[_0x489ad8(0x690)][_0x489ad8(0x227)][_0x489ad8(0x380)][_0x489ad8(0x1ae)]||'keyboard';},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x805)]=Window_NameInput['prototype'][_0x3a5d8e(0x683)],Window_NameInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x683)]=function(){const _0x34566b=_0x3a5d8e;if(!this[_0x34566b(0x6cf)]())return;if(!this[_0x34566b(0x743)])return;if(this[_0x34566b(0x3c9)]===_0x34566b(0x1bd)&&Input[_0x34566b(0x359)]())'VMXpy'===_0x34566b(0x23e)?this['switchModes'](_0x34566b(0x41e)):this[_0x34566b(0x71c)]['setBackgroundType'](_0x4ea09f[_0x34566b(0x998)]['StatusBgType']);else{if(Input['isSpecialCode'](_0x34566b(0x30d))){if(_0x34566b(0x5e4)!==_0x34566b(0x5e4))return this[_0x34566b(0x46a)](_0x510092);else Input[_0x34566b(0x166)](),this[_0x34566b(0x942)]();}else{if(Input[_0x34566b(0x873)]('tab'))Input[_0x34566b(0x166)](),this[_0x34566b(0x3c9)]==='keyboard'?_0x34566b(0x342)!==_0x34566b(0x342)?(_0xa85219=_0x43749b[_0x34566b(0x6dd)](_0x523115),_0x5c08b8=_0x3fb673[_0x34566b(0x6dd)](_0x4661cd),_0x1efe47=_0x5a34f1[_0x34566b(0x6dd)](_0x134808),_0x3573bd=_0xdded92[_0x34566b(0x6dd)](_0x5e6dac),_0x4ce7b6[_0x34566b(0x690)][_0x34566b(0x4ca)][_0x34566b(0x528)](this,_0x4e3e48,_0x181be7,_0x555875,_0x4bb920,_0x45c4c2,_0x3e40d7),this[_0x34566b(0x353)]()):this[_0x34566b(0x9a8)](_0x34566b(0x41e)):this['switchModes'](_0x34566b(0x1bd));else{if(this[_0x34566b(0x3c9)]===_0x34566b(0x1bd))_0x34566b(0x2bc)!==_0x34566b(0x2bc)?(this[_0x34566b(0x7c6)]=[],this[_0x34566b(0x68d)]=[],this[_0x34566b(0x92a)]=this[_0x34566b(0x3fd)]['x'],this['_cacheScaleY']=this['scale']['y']):this[_0x34566b(0x1be)]();else Input[_0x34566b(0x2e7)](_0x34566b(0x80e))?_0x34566b(0x94e)==='sGSgY'?_0x3277ab[_0x34566b(0x690)]['Game_Action_setAttack'][_0x34566b(0x528)](this):(Input[_0x34566b(0x166)](),this['switchModes']('keyboard')):_0x34566b(0x67d)!==_0x34566b(0x7ad)?VisuMZ[_0x34566b(0x690)][_0x34566b(0x805)][_0x34566b(0x528)](this):((this[_0x34566b(0x3e7)]!==_0xb50556||this[_0x34566b(0x698)]!==_0x25a293)&&(this[_0x34566b(0x479)](_0x34566b(0x5d4)),this['_movementWholeDuration']=_0x2a5704),_0x5dcd4d['CoreEngine'][_0x34566b(0x630)][_0x34566b(0x528)](this,_0xf115df,_0x285103,_0x38ff67));}}}},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x595)]=Window_NameInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x180)],Window_NameInput['prototype'][_0x3a5d8e(0x180)]=function(){const _0x1db458=_0x3a5d8e;if(!this[_0x1db458(0x91f)]())return;if(this[_0x1db458(0x3c9)]==='keyboard'){if(_0x1db458(0x1a8)===_0x1db458(0x6ad))_0x309e9e[_0x1db458(0x2af)]=_0x52e82f,_0x4e54f7[_0x1db458(0x30e)](_0x4a9e7d);else{if(TouchInput['isTriggered']()&&this[_0x1db458(0x8e8)]())this['switchModes'](_0x1db458(0x41e));else TouchInput[_0x1db458(0x20b)]()&&this[_0x1db458(0x9a8)]('default');}}else _0x1db458(0x23a)===_0x1db458(0x23a)?VisuMZ['CoreEngine'][_0x1db458(0x595)]['call'](this):(_0x76f89c[_0x1db458(0x166)](),this[_0x1db458(0x2a5)]());},Window_NameInput['prototype']['processKeyboardHandling']=function(){const _0x271862=_0x3a5d8e;if(Input[_0x271862(0x2e7)](_0x271862(0x17c)))Input['clear'](),this[_0x271862(0x2a5)]();else{if(Input[_0x271862(0x476)]!==undefined){let _0xf5c5ac=Input[_0x271862(0x476)],_0x3f64de=_0xf5c5ac[_0x271862(0x3fe)];for(let _0x495d6c=0x0;_0x495d6c<_0x3f64de;++_0x495d6c){if(this[_0x271862(0x89d)]['add'](_0xf5c5ac[_0x495d6c]))SoundManager[_0x271862(0x262)]();else{if(_0x271862(0x826)===_0x271862(0x86f))return this['checkSmartEventCollision'](_0x4eafa3,_0x652b7a);else SoundManager['playBuzzer']();}}Input[_0x271862(0x166)]();}}},Window_NameInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x9a8)]=function(_0x3fd253){const _0x43d6f7=_0x3a5d8e;let _0x43bb40=this[_0x43d6f7(0x3c9)];this['_mode']=_0x3fd253,_0x43bb40!==this[_0x43d6f7(0x3c9)]&&(_0x43d6f7(0x1a6)!==_0x43d6f7(0x660)?(this[_0x43d6f7(0x81b)](),SoundManager[_0x43d6f7(0x262)](),this['_mode']===_0x43d6f7(0x41e)?this[_0x43d6f7(0x275)](0x0):_0x43d6f7(0x2ae)===_0x43d6f7(0x985)?_0x100152+=_0x43d6f7(0x99c):this['select'](-0x1)):this[_0x43d6f7(0x476)]=_0x1b4c37);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x7a3)]=Window_NameInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x2c8)],Window_NameInput['prototype']['cursorDown']=function(_0x20fe34){const _0x515efa=_0x3a5d8e;if(this['_mode']==='keyboard'&&!Input[_0x515efa(0x1ac)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x515efa(0x690)][_0x515efa(0x7a3)][_0x515efa(0x528)](this,_0x20fe34),this[_0x515efa(0x9a8)](_0x515efa(0x41e));},VisuMZ[_0x3a5d8e(0x690)]['Window_NameInput_cursorUp']=Window_NameInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x76f)],Window_NameInput['prototype'][_0x3a5d8e(0x76f)]=function(_0x1000a3){const _0x8797c6=_0x3a5d8e;if(this['_mode']===_0x8797c6(0x1bd)&&!Input[_0x8797c6(0x1ac)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x8797c6(0x690)][_0x8797c6(0x514)][_0x8797c6(0x528)](this,_0x1000a3),this[_0x8797c6(0x9a8)](_0x8797c6(0x41e));},VisuMZ[_0x3a5d8e(0x690)]['Window_NameInput_cursorRight']=Window_NameInput['prototype']['cursorRight'],Window_NameInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x8af)]=function(_0x57b1ce){const _0x2eaee9=_0x3a5d8e;if(this['_mode']===_0x2eaee9(0x1bd)&&!Input['isArrowPressed']())return;if(Input[_0x2eaee9(0x896)]())return;VisuMZ[_0x2eaee9(0x690)][_0x2eaee9(0x215)][_0x2eaee9(0x528)](this,_0x57b1ce),this[_0x2eaee9(0x9a8)](_0x2eaee9(0x41e));},VisuMZ['CoreEngine'][_0x3a5d8e(0x309)]=Window_NameInput[_0x3a5d8e(0x715)]['cursorLeft'],Window_NameInput[_0x3a5d8e(0x715)]['cursorLeft']=function(_0x28036f){const _0x443938=_0x3a5d8e;if(this[_0x443938(0x3c9)]==='keyboard'&&!Input[_0x443938(0x1ac)]())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0x443938(0x309)]['call'](this,_0x28036f),this['switchModes'](_0x443938(0x41e));},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x27a)]=Window_NameInput['prototype'][_0x3a5d8e(0x566)],Window_NameInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x566)]=function(){const _0x3a86a3=_0x3a5d8e;if(this[_0x3a86a3(0x3c9)]===_0x3a86a3(0x1bd))return;if(Input[_0x3a86a3(0x896)]())return;VisuMZ['CoreEngine'][_0x3a86a3(0x27a)][_0x3a86a3(0x528)](this),this['switchModes'](_0x3a86a3(0x41e));},VisuMZ[_0x3a5d8e(0x690)]['Window_NameInput_cursorPageup']=Window_NameInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x240)],Window_NameInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x240)]=function(){const _0x492ad0=_0x3a5d8e;if(this[_0x492ad0(0x3c9)]==='keyboard')return;if(Input[_0x492ad0(0x896)]())return;VisuMZ[_0x492ad0(0x690)][_0x492ad0(0x222)]['call'](this),this['switchModes'](_0x492ad0(0x41e));},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x923)]=Window_NameInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x81b)],Window_NameInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x81b)]=function(){const _0x16c443=_0x3a5d8e;if(this['_mode']===_0x16c443(0x1bd)){this['contents'][_0x16c443(0x166)](),this[_0x16c443(0x3c6)][_0x16c443(0x166)](),this[_0x16c443(0x629)]();let _0x1fa12c=VisuMZ[_0x16c443(0x690)][_0x16c443(0x227)][_0x16c443(0x380)]['NameInputMessage']['split']('\x0a'),_0x578761=_0x1fa12c[_0x16c443(0x3fe)],_0x253df1=(this[_0x16c443(0x1fe)]-_0x578761*this[_0x16c443(0x66d)]())/0x2;for(let _0x868527=0x0;_0x868527<_0x578761;++_0x868527){let _0x435b61=_0x1fa12c[_0x868527],_0x37e7b2=this[_0x16c443(0x192)](_0x435b61)[_0x16c443(0x89a)],_0x20fe9c=Math[_0x16c443(0x3de)]((this[_0x16c443(0x2b8)][_0x16c443(0x89a)]-_0x37e7b2)/0x2);this['drawTextEx'](_0x435b61,_0x20fe9c,_0x253df1),_0x253df1+=this[_0x16c443(0x66d)]();}}else{if(_0x16c443(0x89f)!==_0x16c443(0x79b))VisuMZ[_0x16c443(0x690)][_0x16c443(0x923)][_0x16c443(0x528)](this);else{const _0x12567e=_0x16c443(0x18d);this['_colorCache']=this['_colorCache']||{};if(this[_0x16c443(0x286)][_0x12567e])return this[_0x16c443(0x286)][_0x12567e];const _0xafcd01=_0x189472[_0x16c443(0x690)][_0x16c443(0x227)][_0x16c443(0x67e)]['ColorMPGauge2'];return this[_0x16c443(0x2d6)](_0x12567e,_0xafcd01);}}};};VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x604)]=Window_ShopSell[_0x3a5d8e(0x715)]['isEnabled'],Window_ShopSell['prototype'][_0x3a5d8e(0x536)]=function(_0x4a1142){const _0x2daf90=_0x3a5d8e;return VisuMZ[_0x2daf90(0x690)][_0x2daf90(0x227)][_0x2daf90(0x169)][_0x2daf90(0x56b)]&&DataManager[_0x2daf90(0x603)](_0x4a1142)?![]:VisuMZ[_0x2daf90(0x690)][_0x2daf90(0x604)]['call'](this,_0x4a1142);},Window_NumberInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x6b8)]=function(){return![];};VisuMZ['CoreEngine']['Settings'][_0x3a5d8e(0x380)][_0x3a5d8e(0x639)]&&(VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x3e5)]=Window_NumberInput['prototype'][_0x3a5d8e(0x4fb)],Window_NumberInput[_0x3a5d8e(0x715)]['start']=function(){const _0x2a5eb2=_0x3a5d8e;VisuMZ[_0x2a5eb2(0x690)][_0x2a5eb2(0x3e5)][_0x2a5eb2(0x528)](this),this['select'](this[_0x2a5eb2(0x4f8)]-0x1),Input[_0x2a5eb2(0x166)]();},VisuMZ['CoreEngine'][_0x3a5d8e(0x6e4)]=Window_NumberInput['prototype'][_0x3a5d8e(0x412)],Window_NumberInput[_0x3a5d8e(0x715)]['processDigitChange']=function(){const _0x355e06=_0x3a5d8e;if(!this['isOpenAndActive']())return;if(Input[_0x355e06(0x896)]())this[_0x355e06(0x4fa)]();else{if(Input[_0x355e06(0x2e7)](_0x355e06(0x30d))){if(_0x355e06(0x3b6)!==_0x355e06(0x2b5))this[_0x355e06(0x92d)]();else return _0x12ec66[_0x355e06(0x998)][_0x355e06(0x3ce)]['call'](this);}else{if(Input[_0x355e06(0x7e5)]===0x2e)this[_0x355e06(0x60a)]();else{if(Input[_0x355e06(0x7e5)]===0x24)_0x355e06(0x3aa)==='mZJpK'?this[_0x355e06(0x385)]():this[_0x355e06(0x1dd)]();else{if(Input[_0x355e06(0x7e5)]===0x23){if(_0x355e06(0x97a)===_0x355e06(0x26e))return _0x2ea09b[_0x355e06(0x690)][_0x355e06(0x227)]['Color'][_0x355e06(0x3f3)];else this['processKeyboardEnd']();}else _0x355e06(0x5e8)!==_0x355e06(0x980)?VisuMZ[_0x355e06(0x690)][_0x355e06(0x6e4)][_0x355e06(0x528)](this):this[_0x355e06(0x4b5)]['setBackgroundType'](_0x18e079[_0x355e06(0x998)]['ItemBgType']);}}}}},Window_NumberInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x855)]=function(){const _0x4581f8=_0x3a5d8e;if(!this[_0x4581f8(0x586)]())return;if(Input[_0x4581f8(0x896)]()){if(_0x4581f8(0x22e)===_0x4581f8(0x22e))this['processKeyboardDigitChange']();else{if(_0x614489[_0x4581f8(0x8dd)]())return _0x4581f8(0x41e);return _0x323f7a[_0x4581f8(0x690)][_0x4581f8(0x227)][_0x4581f8(0x380)][_0x4581f8(0x1ae)]||_0x4581f8(0x1bd);}}else'wxZpM'!==_0x4581f8(0x8c5)?this[_0x4581f8(0x60a)]():Window_Selectable[_0x4581f8(0x715)][_0x4581f8(0x855)][_0x4581f8(0x528)](this);},Window_NumberInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x36a)]=function(){},Window_NumberInput['prototype'][_0x3a5d8e(0x4fa)]=function(){const _0x1cd714=_0x3a5d8e;if(String(this[_0x1cd714(0x5fb)])[_0x1cd714(0x3fe)]>=this['_maxDigits'])return;const _0x1f6cbe=Number(String(this[_0x1cd714(0x5fb)])+Input[_0x1cd714(0x476)]);if(isNaN(_0x1f6cbe))return;this[_0x1cd714(0x5fb)]=_0x1f6cbe;const _0x3916d6='9'[_0x1cd714(0x877)](this[_0x1cd714(0x4f8)]);this[_0x1cd714(0x5fb)]=this[_0x1cd714(0x5fb)]['clamp'](0x0,_0x3916d6),Input[_0x1cd714(0x166)](),this['refresh'](),SoundManager['playCursor'](),this['select'](this[_0x1cd714(0x4f8)]-0x1);},Window_NumberInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x92d)]=function(){const _0x323173=_0x3a5d8e;this[_0x323173(0x5fb)]=Number(String(this[_0x323173(0x5fb)])['slice'](0x0,-0x1)),this[_0x323173(0x5fb)]=Math[_0x323173(0x2bb)](0x0,this['_number']),Input[_0x323173(0x166)](),this[_0x323173(0x81b)](),SoundManager[_0x323173(0x406)](),this[_0x323173(0x275)](this[_0x323173(0x4f8)]-0x1);},Window_NumberInput[_0x3a5d8e(0x715)]['processKeyboardDelete']=function(){const _0x40a6ec=_0x3a5d8e;this[_0x40a6ec(0x5fb)]=Number(String(this[_0x40a6ec(0x5fb)])['substring'](0x1)),this['_number']=Math[_0x40a6ec(0x2bb)](0x0,this[_0x40a6ec(0x5fb)]),Input[_0x40a6ec(0x166)](),this[_0x40a6ec(0x81b)](),SoundManager[_0x40a6ec(0x406)](),this[_0x40a6ec(0x275)](this[_0x40a6ec(0x4f8)]-0x1);},Window_NumberInput[_0x3a5d8e(0x715)][_0x3a5d8e(0x385)]=function(){const _0x4140ae=_0x3a5d8e;if(this['index']()===0x0)return;Input[_0x4140ae(0x166)](),this[_0x4140ae(0x81b)](),SoundManager[_0x4140ae(0x406)](),this[_0x4140ae(0x275)](0x0);},Window_NumberInput[_0x3a5d8e(0x715)]['processKeyboardEnd']=function(){const _0x42a8a6=_0x3a5d8e;if(this[_0x42a8a6(0x481)]()===this['_maxDigits']-0x1)return;Input[_0x42a8a6(0x166)](),this[_0x42a8a6(0x81b)](),SoundManager[_0x42a8a6(0x406)](),this['select'](this['_maxDigits']-0x1);});;VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x828)]=Window_MapName['prototype']['refresh'],Window_MapName['prototype'][_0x3a5d8e(0x81b)]=function(){const _0x41460a=_0x3a5d8e;VisuMZ[_0x41460a(0x690)][_0x41460a(0x227)][_0x41460a(0x169)][_0x41460a(0x5cf)]?this[_0x41460a(0x1dd)]():VisuMZ['CoreEngine'][_0x41460a(0x828)]['call'](this);},Window_MapName[_0x3a5d8e(0x715)][_0x3a5d8e(0x1dd)]=function(){const _0x4acfe3=_0x3a5d8e;this[_0x4acfe3(0x2b8)][_0x4acfe3(0x166)]();if($gameMap[_0x4acfe3(0x8cb)]()){const _0x460da0=this['innerWidth'];this[_0x4acfe3(0x512)](0x0,0x0,_0x460da0,this[_0x4acfe3(0x66d)]());const _0x4936b2=this[_0x4acfe3(0x192)]($gameMap[_0x4acfe3(0x8cb)]())[_0x4acfe3(0x89a)];this[_0x4acfe3(0x283)]($gameMap[_0x4acfe3(0x8cb)](),Math[_0x4acfe3(0x3de)]((_0x460da0-_0x4936b2)/0x2),0x0);}},Window_TitleCommand['_commandList']=VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x227)][_0x3a5d8e(0x75a)],Window_TitleCommand[_0x3a5d8e(0x715)][_0x3a5d8e(0x200)]=function(){const _0xe5cb1=_0x3a5d8e;this[_0xe5cb1(0x5b8)]();},Window_TitleCommand[_0x3a5d8e(0x715)][_0x3a5d8e(0x5b8)]=function(){const _0x80f200=_0x3a5d8e;for(const _0x32bfdb of Window_TitleCommand['_commandList']){if(_0x32bfdb[_0x80f200(0x287)][_0x80f200(0x528)](this)){const _0x308e93=_0x32bfdb['Symbol'];let _0x8a1419=_0x32bfdb[_0x80f200(0x570)];if(['',_0x80f200(0x426)][_0x80f200(0x2c6)](_0x8a1419))_0x8a1419=_0x32bfdb[_0x80f200(0x5d8)]['call'](this);const _0x5a4b0f=_0x32bfdb[_0x80f200(0x457)]['call'](this),_0x863f92=_0x32bfdb[_0x80f200(0x8b6)][_0x80f200(0x528)](this);this[_0x80f200(0x51e)](_0x8a1419,_0x308e93,_0x5a4b0f,_0x863f92),this['setHandler'](_0x308e93,_0x32bfdb[_0x80f200(0x907)][_0x80f200(0x8b1)](this,_0x863f92));}}},Window_GameEnd[_0x3a5d8e(0x94b)]=VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x227)][_0x3a5d8e(0x4bd)][_0x3a5d8e(0x18a)][_0x3a5d8e(0x5e6)],Window_GameEnd['prototype']['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_GameEnd['prototype'][_0x3a5d8e(0x5b8)]=function(){const _0x530eb8=_0x3a5d8e;for(const _0x4b2b43 of Window_GameEnd[_0x530eb8(0x94b)]){if(_0x530eb8(0x59e)===_0x530eb8(0x498))return 0x0;else{if(_0x4b2b43[_0x530eb8(0x287)]['call'](this)){if(_0x530eb8(0x8a3)!==_0x530eb8(0x4e8)){const _0x402679=_0x4b2b43[_0x530eb8(0x153)];let _0x3ee5f9=_0x4b2b43[_0x530eb8(0x570)];if(['',_0x530eb8(0x426)][_0x530eb8(0x2c6)](_0x3ee5f9))_0x3ee5f9=_0x4b2b43[_0x530eb8(0x5d8)]['call'](this);const _0x547931=_0x4b2b43[_0x530eb8(0x457)][_0x530eb8(0x528)](this),_0xc529af=_0x4b2b43['ExtJS'][_0x530eb8(0x528)](this);this[_0x530eb8(0x51e)](_0x3ee5f9,_0x402679,_0x547931,_0xc529af),this[_0x530eb8(0x390)](_0x402679,_0x4b2b43[_0x530eb8(0x907)]['bind'](this,_0xc529af));}else{const _0x2b72b1=_0x633d0e[_0x530eb8(0x209)](_0x48b53f);_0x28e201?(this[_0x530eb8(0x5cd)](_0x2b72b1,_0x19bacf,_0x4cf507,this[_0x530eb8(0x379)]()),_0x49d863-=this[_0x530eb8(0x379)]()+0x2,_0x23fc52+=this[_0x530eb8(0x379)]()+0x2):(this[_0x530eb8(0x861)](_0x2b72b1,_0x4dd7f6+0x2,_0x3bf261+0x2),_0x42692e-=_0x148967[_0x530eb8(0x6e7)]+0x4,_0x129f67+=_0x19cbf8[_0x530eb8(0x6e7)]+0x4);}}}}};function Window_ButtonAssist(){const _0x963aba=_0x3a5d8e;this[_0x963aba(0x36e)](...arguments);}Window_ButtonAssist[_0x3a5d8e(0x715)]=Object[_0x3a5d8e(0x1e9)](Window_Base[_0x3a5d8e(0x715)]),Window_ButtonAssist[_0x3a5d8e(0x715)][_0x3a5d8e(0x2cd)]=Window_ButtonAssist,Window_ButtonAssist[_0x3a5d8e(0x715)][_0x3a5d8e(0x36e)]=function(_0x4b9d42){const _0x4f945f=_0x3a5d8e;this[_0x4f945f(0x488)]={},Window_Base[_0x4f945f(0x715)][_0x4f945f(0x36e)][_0x4f945f(0x528)](this,_0x4b9d42),this[_0x4f945f(0x357)](VisuMZ[_0x4f945f(0x690)][_0x4f945f(0x227)][_0x4f945f(0x947)][_0x4f945f(0x7f5)]||0x0),this[_0x4f945f(0x81b)]();},Window_ButtonAssist[_0x3a5d8e(0x715)][_0x3a5d8e(0x94d)]=function(){const _0x45622a=_0x3a5d8e;if(this[_0x45622a(0x2b8)][_0x45622a(0x171)]<=0x60){if(_0x45622a(0x657)!==_0x45622a(0x657)){if(_0x2d6023[_0x45622a(0x583)]())_0x5a4cb9[_0x45622a(0x298)](_0x1cf045);}else this[_0x45622a(0x2b8)][_0x45622a(0x171)]+=0x6;}},Window_ButtonAssist[_0x3a5d8e(0x715)][_0x3a5d8e(0x6a3)]=function(){const _0x4e5a48=_0x3a5d8e;this[_0x4e5a48(0x2b8)]['fontSize']>=0x18&&(this['contents'][_0x4e5a48(0x171)]-=0x6);},Window_ButtonAssist[_0x3a5d8e(0x715)][_0x3a5d8e(0x24a)]=function(){const _0x3c6f97=_0x3a5d8e;Window_Base[_0x3c6f97(0x715)][_0x3c6f97(0x24a)][_0x3c6f97(0x528)](this),this[_0x3c6f97(0x9ad)]();},Window_ButtonAssist['prototype'][_0x3a5d8e(0x804)]=function(){const _0x50a2ea=_0x3a5d8e;this['padding']=SceneManager[_0x50a2ea(0x3bb)]['getButtonAssistLocation']()!==_0x50a2ea(0x19c)?0x0:0x8;},Window_ButtonAssist[_0x3a5d8e(0x715)][_0x3a5d8e(0x9ad)]=function(){const _0x16b46e=_0x3a5d8e,_0x77adf=SceneManager[_0x16b46e(0x3bb)];for(let _0x2fa7df=0x1;_0x2fa7df<=0x5;_0x2fa7df++){if(_0x16b46e(0x8fe)!==_0x16b46e(0x8fe))_0x19f81b[_0x16b46e(0x383)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK'];else{if(this['_data']['key%1'[_0x16b46e(0x5a1)](_0x2fa7df)]!==_0x77adf['buttonAssistKey%1'['format'](_0x2fa7df)]()){if(_0x16b46e(0x362)==='nmsek')this['initialize'](...arguments);else return this['refresh']();}if(this[_0x16b46e(0x488)][_0x16b46e(0x78f)[_0x16b46e(0x5a1)](_0x2fa7df)]!==_0x77adf[_0x16b46e(0x988)[_0x16b46e(0x5a1)](_0x2fa7df)]())return this['refresh']();}}},Window_ButtonAssist[_0x3a5d8e(0x715)][_0x3a5d8e(0x81b)]=function(){const _0x44647d=_0x3a5d8e;this[_0x44647d(0x2b8)][_0x44647d(0x166)]();for(let _0x1f878a=0x1;_0x1f878a<=0x5;_0x1f878a++){_0x44647d(0x553)!==_0x44647d(0x553)?this['smoothSelect'](0x0):this['drawSegment'](_0x1f878a);}},Window_ButtonAssist[_0x3a5d8e(0x715)]['drawSegment']=function(_0x3ef9c6){const _0x4b9ccb=_0x3a5d8e,_0x50191d=this[_0x4b9ccb(0x511)]/0x5,_0x2b01eb=SceneManager[_0x4b9ccb(0x3bb)],_0xbd1d30=_0x2b01eb[_0x4b9ccb(0x755)['format'](_0x3ef9c6)](),_0x10fbad=_0x2b01eb[_0x4b9ccb(0x988)[_0x4b9ccb(0x5a1)](_0x3ef9c6)]();this['_data'][_0x4b9ccb(0x2a0)['format'](_0x3ef9c6)]=_0xbd1d30,this['_data'][_0x4b9ccb(0x78f)[_0x4b9ccb(0x5a1)](_0x3ef9c6)]=_0x10fbad;if(_0xbd1d30==='')return;if(_0x10fbad==='')return;const _0x3d6562=_0x2b01eb[_0x4b9ccb(0x813)[_0x4b9ccb(0x5a1)](_0x3ef9c6)](),_0x45781a=this['itemPadding'](),_0x36d3c6=_0x50191d*(_0x3ef9c6-0x1)+_0x45781a+_0x3d6562,_0x5587e4=VisuMZ[_0x4b9ccb(0x690)]['Settings']['ButtonAssist']['TextFmt'];this[_0x4b9ccb(0x283)](_0x5587e4[_0x4b9ccb(0x5a1)](_0xbd1d30,_0x10fbad),_0x36d3c6,0x0,_0x50191d-_0x45781a*0x2);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x65a)]=Game_Interpreter['prototype'][_0x3a5d8e(0x490)],Game_Interpreter[_0x3a5d8e(0x715)][_0x3a5d8e(0x490)]=function(){const _0x40bebc=_0x3a5d8e;if($gameTemp['_pictureCoordinatesMode']!==undefined)return VisuMZ[_0x40bebc(0x690)][_0x40bebc(0x170)]();return VisuMZ[_0x40bebc(0x690)]['Game_Interpreter_updateWaitMode']['call'](this);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x170)]=function(){const _0x536cca=_0x3a5d8e,_0x418e35=$gameTemp[_0x536cca(0x2c2)]||0x0;(_0x418e35<0x0||_0x418e35>0x64||TouchInput[_0x536cca(0x20b)]()||Input['isTriggered'](_0x536cca(0x37d)))&&($gameTemp[_0x536cca(0x2c2)]=undefined,Input['clear'](),TouchInput[_0x536cca(0x166)]());const _0x2e33b5=$gameScreen[_0x536cca(0x43a)](_0x418e35);return _0x2e33b5&&(_0x536cca(0x4f0)!==_0x536cca(0x4f0)?_0x1d8f78(_0x1a7d8b):(_0x2e33b5['_x']=TouchInput['_x'],_0x2e33b5['_y']=TouchInput['_y'])),VisuMZ[_0x536cca(0x690)]['updatePictureCoordinates'](),$gameTemp[_0x536cca(0x2c2)]!==undefined;},VisuMZ['CoreEngine']['updatePictureCoordinates']=function(){const _0x21220f=_0x3a5d8e,_0x3716f8=SceneManager[_0x21220f(0x3bb)];if(!_0x3716f8)return;!_0x3716f8[_0x21220f(0x70b)]&&(SoundManager[_0x21220f(0x966)](),_0x3716f8[_0x21220f(0x70b)]=new Window_PictureCoordinates(),_0x3716f8[_0x21220f(0x162)](_0x3716f8[_0x21220f(0x70b)])),$gameTemp['_pictureCoordinatesMode']===undefined&&(SoundManager[_0x21220f(0x2cb)](),_0x3716f8[_0x21220f(0x91c)](_0x3716f8[_0x21220f(0x70b)]),_0x3716f8[_0x21220f(0x70b)]=undefined);};function Window_PictureCoordinates(){const _0x25676d=_0x3a5d8e;this[_0x25676d(0x36e)](...arguments);}Window_PictureCoordinates[_0x3a5d8e(0x715)]=Object[_0x3a5d8e(0x1e9)](Window_Base[_0x3a5d8e(0x715)]),Window_PictureCoordinates[_0x3a5d8e(0x715)][_0x3a5d8e(0x2cd)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x3a5d8e(0x715)][_0x3a5d8e(0x36e)]=function(){const _0x2b24c0=_0x3a5d8e;this['_lastOrigin']=_0x2b24c0(0x836),this[_0x2b24c0(0x981)]=_0x2b24c0(0x836),this[_0x2b24c0(0x1c4)]=_0x2b24c0(0x836);const _0x3d34bd=this['windowRect']();Window_Base['prototype'][_0x2b24c0(0x36e)]['call'](this,_0x3d34bd),this['setBackgroundType'](0x2);},Window_PictureCoordinates['prototype'][_0x3a5d8e(0x6f6)]=function(){const _0x14365e=_0x3a5d8e;let _0x15f354=0x0,_0xd9b670=Graphics[_0x14365e(0x223)]-this['lineHeight'](),_0x2b0805=Graphics[_0x14365e(0x89a)],_0x4831f2=this[_0x14365e(0x66d)]();return new Rectangle(_0x15f354,_0xd9b670,_0x2b0805,_0x4831f2);},Window_PictureCoordinates[_0x3a5d8e(0x715)][_0x3a5d8e(0x804)]=function(){const _0xdf871=_0x3a5d8e;this[_0xdf871(0x47b)]=0x0;},Window_PictureCoordinates[_0x3a5d8e(0x715)][_0x3a5d8e(0x24a)]=function(){const _0xe3272b=_0x3a5d8e;Window_Base['prototype'][_0xe3272b(0x24a)][_0xe3272b(0x528)](this),this[_0xe3272b(0x83d)]();},Window_PictureCoordinates[_0x3a5d8e(0x715)][_0x3a5d8e(0x83d)]=function(){const _0x42022b=_0x3a5d8e;if(!this['needsUpdate']())return;this[_0x42022b(0x81b)]();},Window_PictureCoordinates['prototype'][_0x3a5d8e(0x3ec)]=function(){const _0x139232=_0x3a5d8e,_0x2bb23e=$gameTemp[_0x139232(0x2c2)],_0x25676e=$gameScreen[_0x139232(0x43a)](_0x2bb23e);return _0x25676e?this[_0x139232(0x320)]!==_0x25676e[_0x139232(0x2da)]||this[_0x139232(0x981)]!==_0x25676e['_x']||this[_0x139232(0x1c4)]!==_0x25676e['_y']:![];},Window_PictureCoordinates[_0x3a5d8e(0x715)][_0x3a5d8e(0x81b)]=function(){const _0x44373a=_0x3a5d8e;this[_0x44373a(0x2b8)]['clear']();const _0x1eada5=$gameTemp[_0x44373a(0x2c2)],_0x5308a1=$gameScreen[_0x44373a(0x43a)](_0x1eada5);if(!_0x5308a1)return;this[_0x44373a(0x320)]=_0x5308a1['_origin'],this[_0x44373a(0x981)]=_0x5308a1['_x'],this['_lastY']=_0x5308a1['_y'];const _0x38c67c=ColorManager[_0x44373a(0x6d8)]();this[_0x44373a(0x2b8)][_0x44373a(0x8d2)](0x0,0x0,this[_0x44373a(0x511)],this[_0x44373a(0x1fe)],_0x38c67c);const _0x174259=_0x44373a(0x668)['format'](_0x5308a1[_0x44373a(0x2da)]===0x0?_0x44373a(0x95d):_0x44373a(0x77d)),_0x2c2a2f=_0x44373a(0x289)[_0x44373a(0x5a1)](_0x5308a1['_x']),_0x9289d5='Y:\x20%1'[_0x44373a(0x5a1)](_0x5308a1['_y']),_0x6dc1d2=_0x44373a(0x6a9)[_0x44373a(0x5a1)](TextManager[_0x44373a(0x3dd)]('cancel'));let _0x16a769=Math[_0x44373a(0x3de)](this[_0x44373a(0x511)]/0x4);this[_0x44373a(0x159)](_0x174259,_0x16a769*0x0,0x0,_0x16a769),this[_0x44373a(0x159)](_0x2c2a2f,_0x16a769*0x1,0x0,_0x16a769,_0x44373a(0x61d)),this[_0x44373a(0x159)](_0x9289d5,_0x16a769*0x2,0x0,_0x16a769,_0x44373a(0x61d));const _0x14bc3e=this['textSizeEx'](_0x6dc1d2)[_0x44373a(0x89a)],_0x479e00=this['innerWidth']-_0x14bc3e;this['drawTextEx'](_0x6dc1d2,_0x479e00,0x0,_0x14bc3e);},VisuMZ[_0x3a5d8e(0x943)]=function(_0x3b1b92){const _0x2e0cb3=_0x3a5d8e;if(Utils[_0x2e0cb3(0x452)]('test')){var _0x173a42=require(_0x2e0cb3(0x917))[_0x2e0cb3(0x7f0)]['get']();SceneManager[_0x2e0cb3(0x32a)]();if(_0x3b1b92)setTimeout(_0x173a42['focus'][_0x2e0cb3(0x8b1)](_0x173a42),0x190);}},VisuMZ['ApplyEasing']=function(_0x107e32,_0x5c5955){const _0x2107fb=_0x3a5d8e;_0x5c5955=_0x5c5955[_0x2107fb(0x987)]();var _0x5405d4=1.70158,_0x3416d3=0.7;switch(_0x5c5955){case'LINEAR':return _0x107e32;case _0x2107fb(0x5b1):return-0x1*Math[_0x2107fb(0x588)](_0x107e32*(Math['PI']/0x2))+0x1;case _0x2107fb(0x31e):return Math[_0x2107fb(0x8e9)](_0x107e32*(Math['PI']/0x2));case _0x2107fb(0x41d):return-0.5*(Math[_0x2107fb(0x588)](Math['PI']*_0x107e32)-0x1);case'INQUAD':return _0x107e32*_0x107e32;case _0x2107fb(0x4df):return _0x107e32*(0x2-_0x107e32);case _0x2107fb(0x5b7):return _0x107e32<0.5?0x2*_0x107e32*_0x107e32:-0x1+(0x4-0x2*_0x107e32)*_0x107e32;case'INCUBIC':return _0x107e32*_0x107e32*_0x107e32;case'OUTCUBIC':var _0x4e8eb7=_0x107e32-0x1;return _0x4e8eb7*_0x4e8eb7*_0x4e8eb7+0x1;case _0x2107fb(0x721):return _0x107e32<0.5?0x4*_0x107e32*_0x107e32*_0x107e32:(_0x107e32-0x1)*(0x2*_0x107e32-0x2)*(0x2*_0x107e32-0x2)+0x1;case _0x2107fb(0x9aa):return _0x107e32*_0x107e32*_0x107e32*_0x107e32;case _0x2107fb(0x297):var _0x4e8eb7=_0x107e32-0x1;return 0x1-_0x4e8eb7*_0x4e8eb7*_0x4e8eb7*_0x4e8eb7;case _0x2107fb(0x751):var _0x4e8eb7=_0x107e32-0x1;return _0x107e32<0.5?0x8*_0x107e32*_0x107e32*_0x107e32*_0x107e32:0x1-0x8*_0x4e8eb7*_0x4e8eb7*_0x4e8eb7*_0x4e8eb7;case _0x2107fb(0x3fb):return _0x107e32*_0x107e32*_0x107e32*_0x107e32*_0x107e32;case _0x2107fb(0x3a0):var _0x4e8eb7=_0x107e32-0x1;return 0x1+_0x4e8eb7*_0x4e8eb7*_0x4e8eb7*_0x4e8eb7*_0x4e8eb7;case _0x2107fb(0x3f5):var _0x4e8eb7=_0x107e32-0x1;return _0x107e32<0.5?0x10*_0x107e32*_0x107e32*_0x107e32*_0x107e32*_0x107e32:0x1+0x10*_0x4e8eb7*_0x4e8eb7*_0x4e8eb7*_0x4e8eb7*_0x4e8eb7;case'INEXPO':if(_0x107e32===0x0){if('kDkmC'==='kDkmC')return 0x0;else this[_0x2107fb(0x85c)]=_0x92f392;}return Math[_0x2107fb(0x963)](0x2,0xa*(_0x107e32-0x1));case _0x2107fb(0x249):if(_0x107e32===0x1){if(_0x2107fb(0x7eb)===_0x2107fb(0x5ec)){const _0x5696a8=_0x2107fb(0x5f3);this[_0x2107fb(0x286)]=this[_0x2107fb(0x286)]||{};if(this[_0x2107fb(0x286)][_0x5696a8])return this[_0x2107fb(0x286)][_0x5696a8];const _0x11941a=_0xcbcabb[_0x2107fb(0x690)][_0x2107fb(0x227)][_0x2107fb(0x67e)][_0x2107fb(0x969)];return this[_0x2107fb(0x2d6)](_0x5696a8,_0x11941a);}else return 0x1;}return-Math[_0x2107fb(0x963)](0x2,-0xa*_0x107e32)+0x1;case _0x2107fb(0x77c):if(_0x107e32===0x0||_0x107e32===0x1)return _0x107e32;var _0x37da3a=_0x107e32*0x2,_0x54a8be=_0x37da3a-0x1;if(_0x37da3a<0x1)return 0.5*Math['pow'](0x2,0xa*_0x54a8be);return 0.5*(-Math[_0x2107fb(0x963)](0x2,-0xa*_0x54a8be)+0x2);case _0x2107fb(0x195):var _0x37da3a=_0x107e32/0x1;return-0x1*(Math[_0x2107fb(0x81a)](0x1-_0x37da3a*_0x107e32)-0x1);case'OUTCIRC':var _0x4e8eb7=_0x107e32-0x1;return Math[_0x2107fb(0x81a)](0x1-_0x4e8eb7*_0x4e8eb7);case _0x2107fb(0x37b):var _0x37da3a=_0x107e32*0x2,_0x54a8be=_0x37da3a-0x2;if(_0x37da3a<0x1)return-0.5*(Math[_0x2107fb(0x81a)](0x1-_0x37da3a*_0x37da3a)-0x1);return 0.5*(Math[_0x2107fb(0x81a)](0x1-_0x54a8be*_0x54a8be)+0x1);case _0x2107fb(0x5af):return _0x107e32*_0x107e32*((_0x5405d4+0x1)*_0x107e32-_0x5405d4);case _0x2107fb(0x63d):var _0x37da3a=_0x107e32/0x1-0x1;return _0x37da3a*_0x37da3a*((_0x5405d4+0x1)*_0x37da3a+_0x5405d4)+0x1;break;case _0x2107fb(0x1cd):var _0x37da3a=_0x107e32*0x2,_0x3c1841=_0x37da3a-0x2,_0x1a88df=_0x5405d4*1.525;if(_0x37da3a<0x1)return 0.5*_0x37da3a*_0x37da3a*((_0x1a88df+0x1)*_0x37da3a-_0x1a88df);return 0.5*(_0x3c1841*_0x3c1841*((_0x1a88df+0x1)*_0x3c1841+_0x1a88df)+0x2);case'INELASTIC':if(_0x107e32===0x0||_0x107e32===0x1){if(_0x2107fb(0x230)!==_0x2107fb(0x507))return _0x107e32;else this[_0x2107fb(0x782)]=[];}var _0x37da3a=_0x107e32/0x1,_0x54a8be=_0x37da3a-0x1,_0x128984=0x1-_0x3416d3,_0x1a88df=_0x128984/(0x2*Math['PI'])*Math[_0x2107fb(0x79c)](0x1);return-(Math[_0x2107fb(0x963)](0x2,0xa*_0x54a8be)*Math[_0x2107fb(0x8e9)]((_0x54a8be-_0x1a88df)*(0x2*Math['PI'])/_0x128984));case _0x2107fb(0x7fe):var _0x128984=0x1-_0x3416d3,_0x37da3a=_0x107e32*0x2;if(_0x107e32===0x0||_0x107e32===0x1)return _0x107e32;var _0x1a88df=_0x128984/(0x2*Math['PI'])*Math['asin'](0x1);return Math[_0x2107fb(0x963)](0x2,-0xa*_0x37da3a)*Math[_0x2107fb(0x8e9)]((_0x37da3a-_0x1a88df)*(0x2*Math['PI'])/_0x128984)+0x1;case _0x2107fb(0x593):var _0x128984=0x1-_0x3416d3;if(_0x107e32===0x0||_0x107e32===0x1)return _0x2107fb(0x934)===_0x2107fb(0x840)?_0x29d39b['layoutSettings'][_0x2107fb(0x208)][_0x2107fb(0x528)](this):_0x107e32;var _0x37da3a=_0x107e32*0x2,_0x54a8be=_0x37da3a-0x1,_0x1a88df=_0x128984/(0x2*Math['PI'])*Math[_0x2107fb(0x79c)](0x1);if(_0x37da3a<0x1){if(_0x2107fb(0x89c)===_0x2107fb(0x89c))return-0.5*(Math[_0x2107fb(0x963)](0x2,0xa*_0x54a8be)*Math[_0x2107fb(0x8e9)]((_0x54a8be-_0x1a88df)*(0x2*Math['PI'])/_0x128984));else{if(_0x6d589d[_0x2107fb(0x690)]['Settings'][_0x2107fb(0x169)][_0x2107fb(0x56b)]&&_0x486e06['isKeyItem'](_0x5436ad))return;_0x560f35[_0x2107fb(0x690)][_0x2107fb(0x221)]['call'](this,_0x3da143);}}return Math[_0x2107fb(0x963)](0x2,-0xa*_0x54a8be)*Math[_0x2107fb(0x8e9)]((_0x54a8be-_0x1a88df)*(0x2*Math['PI'])/_0x128984)*0.5+0x1;case _0x2107fb(0x47f):var _0x37da3a=_0x107e32/0x1;if(_0x37da3a<0x1/2.75){if('EtDAc'!==_0x2107fb(0x73e))return 7.5625*_0x37da3a*_0x37da3a;else this[_0x2107fb(0x14e)]>0x0&&(this[_0x2107fb(0x52c)]['x']=this[_0x2107fb(0x67b)](this[_0x2107fb(0x52c)]['x'],this[_0x2107fb(0x85c)]['x']),this[_0x2107fb(0x52c)]['y']=this[_0x2107fb(0x67b)](this[_0x2107fb(0x52c)]['y'],this[_0x2107fb(0x85c)]['y']));}else{if(_0x37da3a<0x2/2.75){if('MyIJt'==='CSVCR'){const _0x48fca3=_0x2107fb(0x66e);this[_0x2107fb(0x286)]=this['_colorCache']||{};if(this[_0x2107fb(0x286)][_0x48fca3])return this[_0x2107fb(0x286)][_0x48fca3];const _0x2d34ff=_0x5e250e[_0x2107fb(0x690)]['Settings']['Color'][_0x2107fb(0x9b9)];return this[_0x2107fb(0x2d6)](_0x48fca3,_0x2d34ff);}else{var _0x3c1841=_0x37da3a-1.5/2.75;return 7.5625*_0x3c1841*_0x3c1841+0.75;}}else{if(_0x37da3a<2.5/2.75){if(_0x2107fb(0x589)==='jFCaI')_0x2abd29[_0x2107fb(0x429)](_0x5c9e44);else{var _0x3c1841=_0x37da3a-2.25/2.75;return 7.5625*_0x3c1841*_0x3c1841+0.9375;}}else{if(_0x2107fb(0x867)===_0x2107fb(0x83f))_0x1a0b20[_0x2107fb(0x690)][_0x2107fb(0x728)][_0x2107fb(0x528)](this,_0x9e673,_0x400b98,_0x19bf3d,_0xaf953b,_0x310626),this['markCoreEngineModified']();else{var _0x3c1841=_0x37da3a-2.625/2.75;return 7.5625*_0x3c1841*_0x3c1841+0.984375;}}}}case'INBOUNCE':var _0x593b45=0x1-VisuMZ[_0x2107fb(0x5dd)](0x1-_0x107e32,_0x2107fb(0x852));return _0x593b45;case _0x2107fb(0x5bf):if(_0x107e32<0.5)var _0x593b45=VisuMZ[_0x2107fb(0x5dd)](_0x107e32*0x2,_0x2107fb(0x6f0))*0.5;else{if(_0x2107fb(0x722)===_0x2107fb(0x250))this['smoothSelect']((_0x37544a-_0x32ca21+_0x2764aa)%_0x13d170);else var _0x593b45=VisuMZ[_0x2107fb(0x5dd)](_0x107e32*0x2-0x1,_0x2107fb(0x852))*0.5+0.5;}return _0x593b45;default:return _0x107e32;}},VisuMZ[_0x3a5d8e(0x209)]=function(_0x45c193){const _0x5dec84=_0x3a5d8e;_0x45c193=String(_0x45c193)[_0x5dec84(0x987)]();const _0x7229b1=VisuMZ[_0x5dec84(0x690)][_0x5dec84(0x227)][_0x5dec84(0x2fe)];if(_0x45c193===_0x5dec84(0x188))return _0x7229b1[_0x5dec84(0x5f1)];if(_0x45c193===_0x5dec84(0x229))return _0x7229b1[_0x5dec84(0x18e)];if(_0x45c193==='ATK')return _0x7229b1['IconParam2'];if(_0x45c193==='DEF')return _0x7229b1[_0x5dec84(0x1ba)];if(_0x45c193===_0x5dec84(0x856))return _0x7229b1[_0x5dec84(0x2a6)];if(_0x45c193===_0x5dec84(0x97c))return _0x7229b1[_0x5dec84(0x8f8)];if(_0x45c193==='AGI')return _0x7229b1[_0x5dec84(0x17a)];if(_0x45c193==='LUK')return _0x7229b1['IconParam7'];if(_0x45c193==='HIT')return _0x7229b1['IconXParam0'];if(_0x45c193===_0x5dec84(0x27d))return _0x7229b1[_0x5dec84(0x883)];if(_0x45c193===_0x5dec84(0x7e1))return _0x7229b1[_0x5dec84(0x8bc)];if(_0x45c193===_0x5dec84(0x76d))return _0x7229b1['IconXParam3'];if(_0x45c193===_0x5dec84(0x766))return _0x7229b1[_0x5dec84(0x1aa)];if(_0x45c193===_0x5dec84(0x621))return _0x7229b1['IconXParam5'];if(_0x45c193==='CNT')return _0x7229b1[_0x5dec84(0x2c4)];if(_0x45c193===_0x5dec84(0x245))return _0x7229b1['IconXParam7'];if(_0x45c193==='MRG')return _0x7229b1[_0x5dec84(0x251)];if(_0x45c193==='TRG')return _0x7229b1['IconXParam9'];if(_0x45c193==='TGR')return _0x7229b1[_0x5dec84(0x544)];if(_0x45c193===_0x5dec84(0x450))return _0x7229b1[_0x5dec84(0x69b)];if(_0x45c193==='REC')return _0x7229b1[_0x5dec84(0x464)];if(_0x45c193===_0x5dec84(0x56a))return _0x7229b1[_0x5dec84(0x7cf)];if(_0x45c193===_0x5dec84(0x769))return _0x7229b1[_0x5dec84(0x32b)];if(_0x45c193===_0x5dec84(0x8db))return _0x7229b1[_0x5dec84(0x339)];if(_0x45c193===_0x5dec84(0x1de))return _0x7229b1['IconSParam6'];if(_0x45c193===_0x5dec84(0x4a2))return _0x7229b1[_0x5dec84(0x3a3)];if(_0x45c193==='FDR')return _0x7229b1[_0x5dec84(0x7c4)];if(_0x45c193===_0x5dec84(0x601))return _0x7229b1[_0x5dec84(0x428)];if(VisuMZ[_0x5dec84(0x690)]['CustomParamIcons'][_0x45c193])return VisuMZ[_0x5dec84(0x690)][_0x5dec84(0x1d0)][_0x45c193]||0x0;return 0x0;},VisuMZ[_0x3a5d8e(0x77f)]=function(_0x29c8c6,_0x1f991a,_0x7854df){const _0x15350f=_0x3a5d8e;if(_0x7854df===undefined&&_0x29c8c6%0x1===0x0)return _0x29c8c6;if(_0x7854df!==undefined&&[_0x15350f(0x188),_0x15350f(0x229),_0x15350f(0x6e0),_0x15350f(0x977),'MAT',_0x15350f(0x97c),_0x15350f(0x833),_0x15350f(0x4ed)][_0x15350f(0x2c6)](String(_0x7854df)[_0x15350f(0x987)]()[_0x15350f(0x3ab)]()))return _0x29c8c6;_0x1f991a=_0x1f991a||0x0;if(VisuMZ[_0x15350f(0x690)][_0x15350f(0x409)][_0x7854df]){if(VisuMZ['CoreEngine'][_0x15350f(0x670)][_0x7854df]===_0x15350f(0x348))return _0x29c8c6;else{if(_0x15350f(0x191)===_0x15350f(0x191))return String((_0x29c8c6*0x64)[_0x15350f(0x789)](_0x1f991a))+'%';else _0x3b7b96[_0x15350f(0x690)][_0x15350f(0x313)][_0x15350f(0x528)](this);}}return String((_0x29c8c6*0x64)['toFixed'](_0x1f991a))+'%';},VisuMZ[_0x3a5d8e(0x5bd)]=function(_0x42c5f1){const _0x341c0c=_0x3a5d8e;_0x42c5f1=String(_0x42c5f1);if(!_0x42c5f1)return _0x42c5f1;if(typeof _0x42c5f1!=='string')return _0x42c5f1;const _0x526c64=VisuMZ[_0x341c0c(0x690)][_0x341c0c(0x227)][_0x341c0c(0x169)][_0x341c0c(0x314)]||'en-US',_0x55b7c4={'maximumFractionDigits':0x6};_0x42c5f1=_0x42c5f1[_0x341c0c(0x232)](/\[(.*?)\]/g,(_0x185df1,_0x485113)=>{const _0x2546f2=_0x341c0c;if(_0x2546f2(0x8f2)===_0x2546f2(0x8f2))return VisuMZ[_0x2546f2(0x3e1)](_0x485113,'[',']');else{this[_0x2546f2(0x320)]=_0x2546f2(0x836),this[_0x2546f2(0x981)]=_0x2546f2(0x836),this[_0x2546f2(0x1c4)]='nah';const _0x51bc59=this[_0x2546f2(0x6f6)]();_0x4c0c32[_0x2546f2(0x715)]['initialize']['call'](this,_0x51bc59),this['setBackgroundType'](0x2);}}),_0x42c5f1=_0x42c5f1[_0x341c0c(0x232)](/<(.*?)>/g,(_0x265ddb,_0x2194dc)=>{const _0x3860f3=_0x341c0c;return VisuMZ[_0x3860f3(0x3e1)](_0x2194dc,'<','>');}),_0x42c5f1=_0x42c5f1['replace'](/\{\{(.*?)\}\}/g,(_0x4fccc5,_0x455a67)=>{const _0x2ed574=_0x341c0c;if(_0x2ed574(0x8c9)==='OysFu')return VisuMZ[_0x2ed574(0x3e1)](_0x455a67,'','');else{const _0x5643ca=_0x74ff6[_0x2ed574(0x715)][_0x2ed574(0x330)][_0x2ed574(0x528)](this);for(const _0x41a691 of this[_0x2ed574(0x3dc)]()){_0x41a691&&_0x5643ca[_0x2ed574(0x429)](_0x41a691);}return _0x5643ca[_0x2ed574(0x429)](this[_0x2ed574(0x256)](),this[_0x2ed574(0x900)]()),_0x5643ca;}}),_0x42c5f1=_0x42c5f1[_0x341c0c(0x232)](/(\d+\.?\d*)/g,(_0x35010d,_0xb9622d)=>{const _0x2d8eb8=_0x341c0c;if(_0x2d8eb8(0x3a7)===_0x2d8eb8(0x150)){const _0x35c37c=_0x3bb132[_0x15d3e2];_0x35c37c?this[_0x2d8eb8(0x30b)](_0x35c37c[_0x2d8eb8(0x521)],0x0):this[_0x2d8eb8(0x53a)]();}else{let _0x5a6849=_0xb9622d;if(_0x5a6849[0x0]==='0')return _0x5a6849;if(_0x5a6849[_0x5a6849[_0x2d8eb8(0x3fe)]-0x1]==='.'){if(_0x2d8eb8(0x88b)!==_0x2d8eb8(0x3bc))return Number(_0x5a6849)[_0x2d8eb8(0x26c)](_0x526c64,_0x55b7c4)+'.';else{const _0x3a9fc3=_0x2d8eb8(0x56e);this[_0x2d8eb8(0x286)]=this['_colorCache']||{};if(this['_colorCache'][_0x3a9fc3])return this[_0x2d8eb8(0x286)][_0x3a9fc3];const _0x2f7808=_0x39f241[_0x2d8eb8(0x690)][_0x2d8eb8(0x227)]['Color'][_0x2d8eb8(0x41c)];return this['getColorDataFromPluginParameters'](_0x3a9fc3,_0x2f7808);}}else{if(_0x5a6849[_0x5a6849[_0x2d8eb8(0x3fe)]-0x1]===','){if('oPSfo'===_0x2d8eb8(0x612))return Number(_0x5a6849)[_0x2d8eb8(0x26c)](_0x526c64,_0x55b7c4)+',';else this[_0x2d8eb8(0x92d)]();}else return Number(_0x5a6849)[_0x2d8eb8(0x26c)](_0x526c64,_0x55b7c4);}}});let _0xa2abe6=0x3;while(_0xa2abe6--){_0x341c0c(0x6a0)===_0x341c0c(0x6a0)?_0x42c5f1=VisuMZ['RevertPreserveNumbers'](_0x42c5f1):_0x378c7d['startAnimation']();}return _0x42c5f1;},VisuMZ[_0x3a5d8e(0x3e1)]=function(_0x3848ee,_0x4e5863,_0x58679e){const _0x48ae5e=_0x3a5d8e;return _0x3848ee=_0x3848ee[_0x48ae5e(0x232)](/(\d)/gi,(_0x298f1f,_0x530a5d)=>_0x48ae5e(0x669)[_0x48ae5e(0x5a1)](Number(_0x530a5d))),'%2%1%3'[_0x48ae5e(0x5a1)](_0x3848ee,_0x4e5863,_0x58679e);},VisuMZ[_0x3a5d8e(0x278)]=function(_0x4e5a00){const _0x137daf=_0x3a5d8e;return _0x4e5a00=_0x4e5a00[_0x137daf(0x232)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x5cb4be,_0x37eb28)=>Number(parseInt(_0x37eb28))),_0x4e5a00;},VisuMZ[_0x3a5d8e(0x520)]=function(_0x546efb){const _0x1407af=_0x3a5d8e;SoundManager['playOk']();if(!Utils[_0x1407af(0x3cb)]()){if('DwLUk'!==_0x1407af(0x548)){const _0x55294b=window[_0x1407af(0x8f5)](_0x546efb,'_blank');}else{let _0x3653d1=this[_0x1407af(0x787)]();this[_0x1407af(0x8a2)]()&&(_0x3653d1=_0x34a53b[_0x1407af(0x5bd)](_0x3653d1));const _0x344aee=this[_0x1407af(0x780)]()-0x1,_0x10efc5=this[_0x1407af(0x5b2)]?this[_0x1407af(0x5b2)]():this['bitmapHeight']();this['setupValueFont'](),this[_0x1407af(0x247)][_0x1407af(0x159)](_0x3653d1,0x0,0x0,_0x344aee,_0x10efc5,_0x1407af(0x8ec));}}else{const _0x151c90=process[_0x1407af(0x85d)]==_0x1407af(0x7e3)?_0x1407af(0x8f5):process[_0x1407af(0x85d)]==_0x1407af(0x4ba)?_0x1407af(0x4fb):'xdg-open';require(_0x1407af(0x8b2))[_0x1407af(0x517)](_0x151c90+'\x20'+_0x546efb);}},VisuMZ[_0x3a5d8e(0x1a3)]=function(_0x3b780f,_0x14b6e9){const _0x79212=_0x3a5d8e;if(!_0x3b780f)return'';const _0x39886b=_0x3b780f[_0x79212(0x39a)]||_0x3b780f['id'];let _0x179813='';_0x3b780f[_0x79212(0x299)]!==undefined&&_0x3b780f['nickname']!==undefined&&(_0x179813=_0x79212(0x723)[_0x79212(0x5a1)](_0x39886b,_0x14b6e9));_0x3b780f[_0x79212(0x948)]!==undefined&&_0x3b780f[_0x79212(0x76a)]!==undefined&&(_0x179813=_0x79212(0x6b3)['format'](_0x39886b,_0x14b6e9));if(_0x3b780f['stypeId']!==undefined&&_0x3b780f[_0x79212(0x206)]!==undefined){if('SWnpf'!==_0x79212(0x785)){if(this[_0x79212(0x3bb)][_0x79212(0x968)])this['_scene'][_0x79212(0x968)][_0x79212(0x81b)]();if(this[_0x79212(0x3bb)][_0x79212(0x346)])this['_scene'][_0x79212(0x346)][_0x79212(0x81b)]();}else _0x179813=_0x79212(0x4b6)[_0x79212(0x5a1)](_0x39886b,_0x14b6e9);}_0x3b780f['itypeId']!==undefined&&_0x3b780f[_0x79212(0x967)]!==undefined&&(_0x179813='Item-%1-%2'['format'](_0x39886b,_0x14b6e9));_0x3b780f[_0x79212(0x7a0)]!==undefined&&_0x3b780f['etypeId']===0x1&&(_0x179813=_0x79212(0x810)['format'](_0x39886b,_0x14b6e9));_0x3b780f['atypeId']!==undefined&&_0x3b780f[_0x79212(0x5ae)]>0x1&&(_0x179813=_0x79212(0x3f8)['format'](_0x39886b,_0x14b6e9));_0x3b780f[_0x79212(0x32f)]!==undefined&&_0x3b780f[_0x79212(0x2fb)]!==undefined&&(_0x179813=_0x79212(0x79f)['format'](_0x39886b,_0x14b6e9));if(_0x3b780f[_0x79212(0x5a0)]!==undefined&&_0x3b780f[_0x79212(0x39f)]!==undefined){if('OFGaQ'==='OFGaQ')_0x179813=_0x79212(0x829)[_0x79212(0x5a1)](_0x39886b,_0x14b6e9);else{if(this[_0x79212(0x922)])return;_0x2d7b75[_0x79212(0x690)][_0x79212(0x8a5)]['call'](this);}}return _0x179813;},Game_Picture['prototype']['anchor']=function(){const _0x125164=_0x3a5d8e;return this[_0x125164(0x52c)];},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x628)]=Game_Picture[_0x3a5d8e(0x715)]['initBasic'],Game_Picture['prototype']['initBasic']=function(){const _0x7fa88a=_0x3a5d8e;VisuMZ[_0x7fa88a(0x690)][_0x7fa88a(0x628)]['call'](this),this['_anchor']={'x':0x0,'y':0x0},this[_0x7fa88a(0x85c)]={'x':0x0,'y':0x0};},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x2f7)]=Game_Picture[_0x3a5d8e(0x715)]['updateMove'],Game_Picture[_0x3a5d8e(0x715)][_0x3a5d8e(0x953)]=function(){const _0x5b306c=_0x3a5d8e;this['updateAnchor']();const _0xcae484=this['_duration'];VisuMZ[_0x5b306c(0x690)][_0x5b306c(0x2f7)][_0x5b306c(0x528)](this),_0xcae484>0x0&&this[_0x5b306c(0x14e)]<=0x0&&(this['_x']=this[_0x5b306c(0x3d1)],this['_y']=this[_0x5b306c(0x78c)],this[_0x5b306c(0x4f5)]=this[_0x5b306c(0x36f)],this[_0x5b306c(0x868)]=this[_0x5b306c(0x7a4)],this['_opacity']=this[_0x5b306c(0x518)],this[_0x5b306c(0x52c)]&&(this['_anchor']['x']=this[_0x5b306c(0x85c)]['x'],this[_0x5b306c(0x52c)]['y']=this[_0x5b306c(0x85c)]['y']));},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x666)]=Game_Picture['prototype'][_0x3a5d8e(0x682)],Game_Picture[_0x3a5d8e(0x715)][_0x3a5d8e(0x682)]=function(_0x5bacdf,_0x1a6575,_0x4530d2,_0x37f5fd,_0x1cfeb4,_0x341046,_0x3b880a,_0x474e7d){const _0x46548d=_0x3a5d8e;VisuMZ[_0x46548d(0x690)][_0x46548d(0x666)][_0x46548d(0x528)](this,_0x5bacdf,_0x1a6575,_0x4530d2,_0x37f5fd,_0x1cfeb4,_0x341046,_0x3b880a,_0x474e7d),this[_0x46548d(0x4d2)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1a6575]||{'x':0x0,'y':0x0});},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x9b2)]=Game_Picture[_0x3a5d8e(0x715)][_0x3a5d8e(0x98d)],Game_Picture[_0x3a5d8e(0x715)][_0x3a5d8e(0x98d)]=function(_0x435131,_0x3c6c72,_0x5b8b64,_0x306e2e,_0x3413f8,_0x4274b4,_0x39c619,_0x12d1f3,_0x32326c){const _0x511121=_0x3a5d8e;VisuMZ['CoreEngine'][_0x511121(0x9b2)][_0x511121(0x528)](this,_0x435131,_0x3c6c72,_0x5b8b64,_0x306e2e,_0x3413f8,_0x4274b4,_0x39c619,_0x12d1f3,_0x32326c),this[_0x511121(0x732)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x435131]||{'x':0x0,'y':0x0});},Game_Picture[_0x3a5d8e(0x715)][_0x3a5d8e(0x7d1)]=function(){const _0x9b365e=_0x3a5d8e;if(this[_0x9b365e(0x14e)]>0x0){if(_0x9b365e(0x8eb)==='VhFbJ')this[_0x9b365e(0x52c)]['x']=this[_0x9b365e(0x67b)](this['_anchor']['x'],this[_0x9b365e(0x85c)]['x']),this[_0x9b365e(0x52c)]['y']=this[_0x9b365e(0x67b)](this[_0x9b365e(0x52c)]['y'],this[_0x9b365e(0x85c)]['y']);else return _0x4c0c5a[_0x9b365e(0x690)][_0x9b365e(0x3d4)]['call'](this);}},Game_Picture[_0x3a5d8e(0x715)][_0x3a5d8e(0x4d2)]=function(_0x34eb73){const _0x261bfa=_0x3a5d8e;this[_0x261bfa(0x52c)]=_0x34eb73,this['_targetAnchor']=JsonEx['makeDeepCopy'](this['_anchor']);},Game_Picture[_0x3a5d8e(0x715)][_0x3a5d8e(0x732)]=function(_0x150363){const _0x87671=_0x3a5d8e;this[_0x87671(0x85c)]=_0x150363;},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x313)]=Sprite_Picture['prototype']['updateOrigin'],Sprite_Picture['prototype'][_0x3a5d8e(0x7d7)]=function(){const _0x1dedea=_0x3a5d8e,_0x5eabc1=this[_0x1dedea(0x43a)]();!_0x5eabc1[_0x1dedea(0x30f)]()?_0x1dedea(0x8e1)===_0x1dedea(0x8e1)?VisuMZ['CoreEngine'][_0x1dedea(0x313)][_0x1dedea(0x528)](this):(_0xe2cf83['CoreEngine'][_0x1dedea(0x1e3)]['call'](this),this[_0x1dedea(0x620)]()):(this[_0x1dedea(0x30f)]['x']=_0x5eabc1[_0x1dedea(0x30f)]()['x'],this['anchor']['y']=_0x5eabc1[_0x1dedea(0x30f)]()['y']);},Game_Action[_0x3a5d8e(0x715)][_0x3a5d8e(0x970)]=function(_0x352f30){const _0x40d1eb=_0x3a5d8e;if(_0x352f30){const _0x542935=_0x352f30[_0x40d1eb(0x29a)];if(_0x542935===0x1&&this[_0x40d1eb(0x6f8)]()[_0x40d1eb(0x767)]()!==0x1)this[_0x40d1eb(0x1fa)]();else _0x542935===0x2&&this[_0x40d1eb(0x6f8)]()[_0x40d1eb(0x5f2)]()!==0x2?this[_0x40d1eb(0x955)]():this[_0x40d1eb(0x5e7)](_0x542935);}else this[_0x40d1eb(0x166)]();},Game_Actor[_0x3a5d8e(0x715)][_0x3a5d8e(0x529)]=function(){const _0x4fb144=_0x3a5d8e;return this[_0x4fb144(0x328)]()[_0x4fb144(0x40c)](_0x4d335a=>this['canUse'](_0x4d335a)&&this[_0x4fb144(0x7ec)]()[_0x4fb144(0x2c6)](_0x4d335a[_0x4fb144(0x587)]));},Window_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x99e)]=function(){const _0x4b9ff0=_0x3a5d8e;this[_0x4b9ff0(0x492)]=new Sprite(),this['_dimmerSprite']['bitmap']=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this['addChildToBack'](this[_0x4b9ff0(0x492)]);},Window_Base[_0x3a5d8e(0x715)]['refreshDimmerBitmap']=function(){const _0xe64454=_0x3a5d8e;if(this[_0xe64454(0x492)]){const _0x432ea9=this[_0xe64454(0x492)]['bitmap'],_0x11a306=this[_0xe64454(0x89a)],_0x2cddb4=this[_0xe64454(0x223)],_0x9a8eeb=this[_0xe64454(0x47b)],_0x24572d=ColorManager[_0xe64454(0x5e0)](),_0x10dd2d=ColorManager[_0xe64454(0x198)]();_0x432ea9[_0xe64454(0x427)](_0x11a306,_0x2cddb4),_0x432ea9[_0xe64454(0x1d5)](0x0,0x0,_0x11a306,_0x9a8eeb,_0x10dd2d,_0x24572d,!![]),_0x432ea9[_0xe64454(0x8d2)](0x0,_0x9a8eeb,_0x11a306,_0x2cddb4-_0x9a8eeb*0x2,_0x24572d),_0x432ea9[_0xe64454(0x1d5)](0x0,_0x2cddb4-_0x9a8eeb,_0x11a306,_0x9a8eeb,_0x24572d,_0x10dd2d,!![]),this[_0xe64454(0x492)][_0xe64454(0x354)](0x0,0x0,_0x11a306,_0x2cddb4);}},Game_Actor[_0x3a5d8e(0x715)]['makeAutoBattleActions']=function(){const _0x526fea=_0x3a5d8e;for(let _0x34d532=0x0;_0x34d532<this[_0x526fea(0x32e)]();_0x34d532++){const _0x14130b=this[_0x526fea(0x1ad)]();let _0x6fff7=Number[_0x526fea(0x52e)];this[_0x526fea(0x2a2)](_0x34d532,_0x14130b[0x0]);for(const _0xbf83b3 of _0x14130b){const _0x4bf094=_0xbf83b3['evaluate']();_0x4bf094>_0x6fff7&&(_0x526fea(0x356)!=='MtMAU'?(_0x6fff7=_0x4bf094,this['setAction'](_0x34d532,_0xbf83b3)):this['_inputString']+=_0x1149ae);}}this['setActionState'](_0x526fea(0x699));},Window_BattleItem[_0x3a5d8e(0x715)]['isEnabled']=function(_0x239a58){const _0x4ef2c6=_0x3a5d8e;return BattleManager[_0x4ef2c6(0x900)]()?BattleManager[_0x4ef2c6(0x900)]()[_0x4ef2c6(0x6a1)](_0x239a58):Window_ItemList[_0x4ef2c6(0x715)][_0x4ef2c6(0x536)][_0x4ef2c6(0x528)](this,_0x239a58);},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x228)]=Scene_Map[_0x3a5d8e(0x715)][_0x3a5d8e(0x8d3)],Scene_Map[_0x3a5d8e(0x715)]['createSpriteset']=function(){const _0x13c3e4=_0x3a5d8e;VisuMZ[_0x13c3e4(0x690)][_0x13c3e4(0x228)][_0x13c3e4(0x528)](this);const _0x3b3e3d=this[_0x13c3e4(0x91e)]['_timerSprite'];if(_0x3b3e3d)this['addChild'](_0x3b3e3d);},VisuMZ[_0x3a5d8e(0x690)]['Scene_Battle_createSpritesetFix']=Scene_Battle[_0x3a5d8e(0x715)][_0x3a5d8e(0x8d3)],Scene_Battle['prototype'][_0x3a5d8e(0x8d3)]=function(){const _0x3bc1c7=_0x3a5d8e;VisuMZ[_0x3bc1c7(0x690)]['Scene_Battle_createSpritesetFix'][_0x3bc1c7(0x528)](this);const _0x5d5416=this[_0x3bc1c7(0x91e)]['_timerSprite'];if(_0x5d5416)this[_0x3bc1c7(0x162)](_0x5d5416);},Sprite_Actor[_0x3a5d8e(0x715)][_0x3a5d8e(0x24a)]=function(){const _0x30da22=_0x3a5d8e;Sprite_Battler['prototype'][_0x30da22(0x24a)][_0x30da22(0x528)](this),this[_0x30da22(0x69f)]();if(this['_actor'])this[_0x30da22(0x3d7)]();else this[_0x30da22(0x82b)]!==''&&('TnmoE'!=='TnmoE'?(this[_0x30da22(0x5eb)]-=this['openingSpeed'](),this[_0x30da22(0x80b)]()&&(this[_0x30da22(0x43d)]=![])):this[_0x30da22(0x82b)]='');},Window['prototype']['_refreshArrows']=function(){const _0x3a3820=_0x3a5d8e,_0x13ba4d=this[_0x3a3820(0x156)],_0x419a07=this['_height'],_0x365065=0x18,_0x553744=_0x365065/0x2,_0x2ea4df=0x60+_0x365065,_0x55d665=0x0+_0x365065;this[_0x3a3820(0x338)]['bitmap']=this[_0x3a3820(0x378)],this[_0x3a3820(0x338)][_0x3a3820(0x30f)]['x']=0.5,this[_0x3a3820(0x338)][_0x3a3820(0x30f)]['y']=0.5,this[_0x3a3820(0x338)][_0x3a3820(0x354)](_0x2ea4df+_0x553744,_0x55d665+_0x553744+_0x365065,_0x365065,_0x553744),this[_0x3a3820(0x338)][_0x3a3820(0x98d)](Math[_0x3a3820(0x6dd)](_0x13ba4d/0x2),Math[_0x3a3820(0x6dd)](_0x419a07-_0x553744)),this[_0x3a3820(0x885)][_0x3a3820(0x247)]=this[_0x3a3820(0x378)],this[_0x3a3820(0x885)][_0x3a3820(0x30f)]['x']=0.5,this[_0x3a3820(0x885)][_0x3a3820(0x30f)]['y']=0.5,this[_0x3a3820(0x885)][_0x3a3820(0x354)](_0x2ea4df+_0x553744,_0x55d665,_0x365065,_0x553744),this[_0x3a3820(0x885)][_0x3a3820(0x98d)](Math['round'](_0x13ba4d/0x2),Math['round'](_0x553744));},Window['prototype'][_0x3a5d8e(0x672)]=function(){const _0x536a4c=_0x3a5d8e,_0x59248f=0x90,_0x5bee46=0x60,_0x19e93b=0x18;this[_0x536a4c(0x622)][_0x536a4c(0x247)]=this['_windowskin'],this[_0x536a4c(0x622)]['anchor']['x']=0.5,this[_0x536a4c(0x622)][_0x536a4c(0x30f)]['y']=0x1,this['_pauseSignSprite'][_0x536a4c(0x98d)](Math['round'](this[_0x536a4c(0x156)]/0x2),this['_height']),this[_0x536a4c(0x622)]['setFrame'](_0x59248f,_0x5bee46,_0x19e93b,_0x19e93b),this['_pauseSignSprite'][_0x536a4c(0x3db)]=0xff;},Window[_0x3a5d8e(0x715)]['_updateFilterArea']=function(){const _0x18d522=_0x3a5d8e,_0x4c4bb7=this[_0x18d522(0x29f)][_0x18d522(0x8f3)]['apply'](new Point(0x0,0x0)),_0x2c9024=this[_0x18d522(0x29f)]['filterArea'];_0x2c9024['x']=_0x4c4bb7['x']+this[_0x18d522(0x673)]['x'],_0x2c9024['y']=_0x4c4bb7['y']+this[_0x18d522(0x673)]['y'],_0x2c9024['width']=Math[_0x18d522(0x2bd)](this[_0x18d522(0x511)]*this[_0x18d522(0x3fd)]['x']),_0x2c9024[_0x18d522(0x223)]=Math['ceil'](this[_0x18d522(0x1fe)]*this[_0x18d522(0x3fd)]['y']);},Window[_0x3a5d8e(0x715)][_0x3a5d8e(0x793)]=function(){const _0x332a1c=_0x3a5d8e,_0x278467=this[_0x332a1c(0x4ac)],_0x2e0dce=Math[_0x332a1c(0x2bb)](0x0,this[_0x332a1c(0x156)]-_0x278467*0x2),_0x1971a5=Math[_0x332a1c(0x2bb)](0x0,this[_0x332a1c(0x25a)]-_0x278467*0x2),_0xf1f6c=this['_backSprite'],_0x8320a8=_0xf1f6c[_0x332a1c(0x2c5)][0x0];_0xf1f6c['bitmap']=this[_0x332a1c(0x378)],_0xf1f6c[_0x332a1c(0x354)](0x0,0x0,0x60,0x60),_0xf1f6c[_0x332a1c(0x98d)](_0x278467,_0x278467),_0xf1f6c[_0x332a1c(0x3fd)]['x']=_0x2e0dce/0x60,_0xf1f6c[_0x332a1c(0x3fd)]['y']=_0x1971a5/0x60,_0x8320a8['bitmap']=this['_windowskin'],_0x8320a8[_0x332a1c(0x354)](0x0,0x60,0x60,0x60),_0x8320a8[_0x332a1c(0x98d)](0x0,0x0,_0x2e0dce,_0x1971a5),_0x8320a8[_0x332a1c(0x3fd)]['x']=0x1/_0xf1f6c[_0x332a1c(0x3fd)]['x'],_0x8320a8['scale']['y']=0x1/_0xf1f6c[_0x332a1c(0x3fd)]['y'],_0xf1f6c[_0x332a1c(0x665)](this[_0x332a1c(0x1f8)]);},Game_Temp['prototype'][_0x3a5d8e(0x468)]=function(){const _0x1a574f=_0x3a5d8e;this[_0x1a574f(0x5fd)]=[],this[_0x1a574f(0x80a)]=[],this[_0x1a574f(0x776)]=[],this[_0x1a574f(0x653)]=[];},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x8f6)]=Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x53a)],Scene_Base[_0x3a5d8e(0x715)][_0x3a5d8e(0x53a)]=function(){const _0x291ca3=_0x3a5d8e;if($gameTemp)$gameTemp[_0x291ca3(0x468)]();VisuMZ[_0x291ca3(0x690)]['Scene_Base_terminateAnimationClearBugFix'][_0x291ca3(0x528)](this);},Bitmap[_0x3a5d8e(0x715)]['measureTextWidthNoRounding']=function(_0x5d3e32){const _0x4c1e20=_0x3a5d8e,_0x381051=this['context'];_0x381051['save'](),_0x381051[_0x4c1e20(0x575)]=this[_0x4c1e20(0x4d1)]();const _0x124ed5=_0x381051[_0x4c1e20(0x875)](_0x5d3e32)[_0x4c1e20(0x89a)];return _0x381051['restore'](),_0x124ed5;},Window_Message[_0x3a5d8e(0x715)][_0x3a5d8e(0x1c7)]=function(_0x2a9546){const _0x51cd63=_0x3a5d8e;return this[_0x51cd63(0x858)]()?this[_0x51cd63(0x2b8)]['measureTextWidthNoRounding'](_0x2a9546):Window_Base[_0x51cd63(0x715)][_0x51cd63(0x1c7)]['call'](this,_0x2a9546);},Window_Message[_0x3a5d8e(0x715)][_0x3a5d8e(0x858)]=function(){const _0x3c9075=_0x3a5d8e;return VisuMZ[_0x3c9075(0x690)][_0x3c9075(0x227)][_0x3c9075(0x169)][_0x3c9075(0x50c)]??!![];},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x5a5)]=Game_Action[_0x3a5d8e(0x715)]['numRepeats'],Game_Action[_0x3a5d8e(0x715)][_0x3a5d8e(0x831)]=function(){const _0x57dbd7=_0x3a5d8e;if(this[_0x57dbd7(0x9b3)]())return VisuMZ[_0x57dbd7(0x690)][_0x57dbd7(0x5a5)][_0x57dbd7(0x528)](this);else{if(_0x57dbd7(0x565)===_0x57dbd7(0x565))return 0x0;else(_0x9d9710<_0x114ac6-_0x350dc0||_0x54056a&&_0xaace2e===0x1)&&this[_0x57dbd7(0x241)]((_0x3f4fcc+_0x20721e)%_0x3096ff);}},VisuMZ[_0x3a5d8e(0x690)][_0x3a5d8e(0x160)]=Game_Action[_0x3a5d8e(0x715)]['setAttack'],Game_Action[_0x3a5d8e(0x715)][_0x3a5d8e(0x1fa)]=function(){const _0x36e60b=_0x3a5d8e;this[_0x36e60b(0x6f8)]()&&this[_0x36e60b(0x6f8)]()['canAttack']()?VisuMZ['CoreEngine']['Game_Action_setAttack'][_0x36e60b(0x528)](this):this['clear']();},Sprite_Name[_0x3a5d8e(0x715)][_0x3a5d8e(0x2dd)]=function(){return 0x24;},Sprite_Name[_0x3a5d8e(0x715)][_0x3a5d8e(0x7af)]=function(){const _0x1729b1=_0x3a5d8e,_0x318db8=this[_0x1729b1(0x53e)](),_0x4fea1e=this[_0x1729b1(0x780)](),_0x1eeb87=this[_0x1729b1(0x2dd)]();this['setupFont'](),this[_0x1729b1(0x247)][_0x1729b1(0x166)](),this[_0x1729b1(0x247)][_0x1729b1(0x503)](_0x318db8,0x0,0x0,_0x4fea1e,_0x1eeb87,'left');},Bitmap[_0x3a5d8e(0x715)][_0x3a5d8e(0x503)]=function(_0x57a58c,_0x187bb3,_0x13c536,_0x4c1cb9,_0x1e0bf8,_0x41ffed){const _0x198480=_0x3a5d8e,_0x5c6149=this[_0x198480(0x70a)],_0x5e8ff6=_0x5c6149['globalAlpha'];_0x4c1cb9=_0x4c1cb9||0xffffffff;let _0x1f8051=_0x187bb3,_0x5b8209=Math[_0x198480(0x6dd)](_0x13c536+0x18/0x2+this['fontSize']*0.35);_0x41ffed==='center'&&(_0x1f8051+=_0x4c1cb9/0x2),_0x41ffed===_0x198480(0x8ec)&&(_0x1f8051+=_0x4c1cb9),_0x5c6149[_0x198480(0x6b5)](),_0x5c6149['font']=this[_0x198480(0x4d1)](),_0x5c6149[_0x198480(0x1d7)]=_0x41ffed,_0x5c6149[_0x198480(0x73c)]=_0x198480(0x75c),_0x5c6149['globalAlpha']=0x1,this['_drawTextOutline'](_0x57a58c,_0x1f8051,_0x5b8209,_0x4c1cb9),_0x5c6149[_0x198480(0x5cb)]=_0x5e8ff6,this['_drawTextBody'](_0x57a58c,_0x1f8051,_0x5b8209,_0x4c1cb9),_0x5c6149[_0x198480(0x7ce)](),this[_0x198480(0x599)][_0x198480(0x24a)]();},VisuMZ[_0x3a5d8e(0x690)]['BattleManager_checkSubstitute']=BattleManager[_0x3a5d8e(0x4ae)],BattleManager['checkSubstitute']=function(_0x117284){const _0x393841=_0x3a5d8e;if(this[_0x393841(0x261)]['isForFriend']())return![];return VisuMZ[_0x393841(0x690)][_0x393841(0x4a3)][_0x393841(0x528)](this,_0x117284);},BattleManager[_0x3a5d8e(0x726)]=function(){const _0x5aa9ef=_0x3a5d8e;if(this['_subject'])this['_logWindow'][_0x5aa9ef(0x726)](this[_0x5aa9ef(0x388)]);this[_0x5aa9ef(0x4dc)]=_0x5aa9ef(0x92b),this['_subject']&&this[_0x5aa9ef(0x388)][_0x5aa9ef(0x32e)]()===0x0&&(this[_0x5aa9ef(0x49d)](this[_0x5aa9ef(0x388)]),this['_subject']=null);},Bitmap[_0x3a5d8e(0x715)][_0x3a5d8e(0x69e)]=function(){const _0x5b3956=_0x3a5d8e;this[_0x5b3956(0x6ce)]=new Image(),this[_0x5b3956(0x6ce)][_0x5b3956(0x9a9)]=this[_0x5b3956(0x34c)][_0x5b3956(0x8b1)](this),this['_image'][_0x5b3956(0x4f7)]=this[_0x5b3956(0x44a)][_0x5b3956(0x8b1)](this),this[_0x5b3956(0x3ba)](),this[_0x5b3956(0x6a5)]=_0x5b3956(0x3cd);if(Utils[_0x5b3956(0x853)]())this['_startDecrypting']();else{if(_0x5b3956(0x172)!==_0x5b3956(0x172))return _0x3b04ba[_0x5b3956(0x690)][_0x5b3956(0x227)][_0x5b3956(0x947)]['Location'];else this[_0x5b3956(0x6ce)][_0x5b3956(0x7c7)]=this[_0x5b3956(0x7d6)],![]&&this[_0x5b3956(0x6ce)][_0x5b3956(0x89a)]>0x0&&(this[_0x5b3956(0x6ce)][_0x5b3956(0x9a9)]=null,this['_onLoad']());}};