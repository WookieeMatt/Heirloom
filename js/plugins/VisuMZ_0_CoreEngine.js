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

function _0x5c9d(){const _0x1d0da2=['_url','smoothSelect','Input_pollGamepads','DETACH_PICTURE_CONTAINER','isEnabled','setActorHomeRepositioned','Input_update','CustomParamAbb','setSkill','getBackgroundOpacity','hUyrZ','NewGameCommonEvent','SlotRect','enemies','DummyBgType','mainAreaTopSideButtonLayout','DigitGroupingStandardText','CRSEL','_smooth','targets','Sprite_Picture_loadBitmap','vertical','_coreEasing','isOpen','getLastGamepadUsed','ParseActorNotetags','Graphics_printError','processKeyboardDigitChange','PRINT','IconParam6','setSideButtonLayout','_screenX','alphabetic','Scene_Boot_loadSystemImages','ColorPowerUp','updatePositionCoreEngine','OTB','processDigitChange','WyPIs','SystemSetSideView','Enemy','encounterStepsMinimum','removeChild','right','setBattleSystem','alwaysDash','AutoScrollLockX','textColor','RIGHT','IconParam5','Enemy-%1-%2','_mirror','yyPvy','AnimationMirrorOffset','WIN_OEM_FJ_LOYA','PIPE','%1:\x20Exit\x20','retrievePointAnimation','helpAreaTopSideButtonLayout','Game_System_initialize','isMapScrollLinked','tQktI','changeTextColor','checkCoreEngineDisplayCenter','isSceneBattle','_storedStack','onerror','ATK','wholeDuration','VDQcS','ParseEnemyNotetags','AnimationPoint','movePageButtonSideButtonLayout','ExportAllTroopText','Graphics_defaultStretchMode','performEscape','RightMenus','Spriteset_Base_update','repositionEnemiesByResolution','CommonEventID','move','BoxMargin','gradientFillRect','BTestAddedQuantity','JbRUl','useFontWidthFix','switchModes','Origin','processCursorMove','Scene_Map_updateMainMultiply','targetScaleY','isPhysical','fIztz','powerUpColor','Icon','ParamChange','F13','playTestF7','pop','destroyed','zmQxT','_pictureCoordinatesMode','writeFile','Scene_Battle_createSpriteset_detach','SfALq','ShowDevTools','OMzvW','paramY','_animation','MvAnimationRate','sparamPlus','writeText','parse','setWindowPadding','_lastOrigin','IconSet','makeCoreEngineCommandList','WIN_OEM_WSCTRL','QuZms','SWirZ','MSfjL','XParamVocab0','RPGMAKER_VERSION','UPTrO','createFauxAnimationSprite','Game_BattlerBase_initMembers','INEXPO','IconXParam7','paramRate','_internalTextures','CancelText','round','IconXParam5','areButtonsOutsideMainUI','attackSkillId','Game_BattlerBase_refresh','buttonAssistWindowSideRect','dISnm','NJQyc','INOUTBOUNCE','NumberBgType','children','Graphics','LATIN1','Flat1','initialLevel','backgroundBitmap','text%1','_startLoading','cEkhZ','parseForcedGameTroopSettingsCoreEngine','context','Scene_Battle_update','isNumpadPressed','IconParam0','jUxXs','updateTransform','VeBpf','tOdgr','ceil','status','mVyLI','Game_Picture_scaleX','updatePlayTestF7','Max','INQUART','pageup','imageSmoothingEnabled','WMNnF','ColorGaugeBack','MINUS','KUjca','Scene_Boot_onDatabaseLoaded','setLastGamepadUsed','gdQRt','iscGT','toFixed','waiting','F23','ProfileRect','match','updateOpacity','watjs','makeActionList','targetY','showDevTools','_dimmerSprite','MIyZt','doesNameContainBannedWords','setMainFontSize','getControllerInputButtonMatch','blockWidth','_data','moveCancelButtonSideButtonLayout','_encounterCount','pzYAM','rZlGA','HGcwe','button','CTRL','WIN_OEM_FJ_ROYA','_currentBgs','AdFAX','battlebacks1','MenuLayout','useDigitGrouping','child_process','_goldWindow','updateAnchor','TpXGP','gameTitle','GetParamIcon','OUTEXPO','uDgYy','openness','ColorCTGauge1','JkrFt','BramG','Window_EquipItem_isEnabled','isActor','Window_Base_update','IconSParam9','getKeyboardInputButtonString','GoldOverlap','_muteSound','createPointAnimationSprite','SideButtons','bgsVolume','Manual','areTileShadowsHidden','itemEva','_shakePower','1847152mvWRYc','exportAllTroopStrings','missed','advanced','_changingClass','axes','DimColor1','tpColor','setup','areButtonsHidden','pitch','LoadError','RBbcN','Keyboard','F12','globalAlpha','usableSkills','xparamPlusJS','ItemMenu','setSize','isItemStyle','BuyRect','commandWindowRows','sparam','WmZmn','bitmapHeight','DOWN','adjustBoxSize','visible','CZsHZ','Plus1','WBLNM','optionsWindowRect','TPB\x20ACTIVE','clearForcedGameTroopSettingsCoreEngine','substring','wAVOw','_shakeSpeed','DLGxt','loadSystemImages','active','<JS\x20%1\x20%2:[\x20](.*)>','getButtonAssistLocation','IconSParam3','XParameterFormula','vaJHB','_clientArea','OUTQUINT','CommandWidth','applyEasing','cXudT','indexOf','cNtQN','VOLUME_UP','retrieveFauxAnimation','ShowActorLevel','_pagedownButton','createCommandWindow','pixelated','getColorDataFromPluginParameters','processKeyboardBackspace','_CoreEngineSettings','itemBackColor2','CreateBattleSystemID','updateDocumentTitle','SEPARATOR','EDPZV','xmOXZ','drawGameVersion','Rate','KANA','ColorExpGauge1','registerCommand','targetX','UpdatePictureCoordinates','ItemStyle','SParamVocab5','src','keyRepeatWait','getBattleSystem','ScaleY','up2','note','hasEncryptedImages','SKSVZ','isItem','xparamFlat2','DashToggleR','_active','lineHeight','ImprovedAccuracySystem','_scene','drawCircle','replace','Bitmap_measureTextWidth','ExtDisplayedParams','Window_StatusBase_drawActorLevel','_destroyInternalTextures','EKuni','onload','lXXmS','_forcedBattleSys','AlDhB','Window_Selectable_cursorDown','EVA','isFullDocumentTitle','iyDxa','SceneManager_exit','lfWOJ','_inputSpecialKeyCode','TOqXP','yScrollLinkedOffset','ExportStrFromAllMaps','cursorPagedown','picture','titles1','isNormalPriority','Window_NameInput_cursorPagedown','buttonAreaHeight','scrollLeft','_displayY','startAutoNewGame','params','buttonAssistKey1','NLORD','NpFHm','Color','F7key','cursorUp','_battleField','scrollDown','AUZTC','_statusWindow','WIN_OEM_AUTO','default','onButtonImageLoad','drawBackgroundRect','measureTextWidth','OUTBOUNCE','tileWidth','VisuMZ_2_BattleSystemFTB','INBACK','targetEvaRate','processCursorMoveModernControls','bOVcT','_movementWholeDuration','yDtjs','sZDxf','AntiZoomPictures','Mirror','apply','strokeRect','Window_MapName_refresh','exportAllMapStrings','CIRCUMFLEX','pmOYQ','IconParam2','getLastPluginCommandInterpreter','Spriteset_Base_updatePosition','getLastUsedGamepadType','refresh','Game_Actor_changeClass','CoreEngine','Power','_pictureCoordinatesWindow','Ipvmt','popScene','STENCIL_TEST','WIN_OEM_ATTN','calcEasing','INCUBIC','clipboard','xparamRate','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','_profileWindow','createPageButtons','$dataMap','gainSilentTp','EnableJS','Game_Screen_initialize','NUMPAD7','AllTroops','playTestF6','flush','processKeyboardEnd','mev','ARRAYFUNC','drawSegment','MAX_SAFE_INTEGER','nextLevelExp','cXyPs','index','textSizeEx','_commonEventLayers','IconXParam8','checkSubstitute','updateKeyText','ParseStateNotetags','_onceParallelInterpreters','BgFilename2','F22','Window_Base_initialize','isSideButtonLayout','_rate','ogWpW','_displayX','fsGIJ','ColorManager_loadWindowskin','nickname','WIN_OEM_FJ_JISHO','sparamPlus1','_backgroundFilter','Renderer','CTB','_hideButtons','TextCodeNicknames','Graphics_centerElement','applyForcedGameTroopSettingsCoreEngine','FontSize','removePointAnimation','makeInputButtonString','isActiveTpb','isArrowPressed','DigitGroupingExText','pDcXj','_clickHandler','goldWindowRect','command357','buttonAssistText4','terms','pagedownShowButton','initCoreEasing','gaugeHeight','CategoryRect','oFgwW','categoryWindowRect','5865092NNaofl','END','_itemWindow','INOUTSINE','GoldIcon','IconParam1','paramValueByName','Scene_Battle_createSpritesetFix','Window_NameInput_initialize','_downArrowSprite','outlineColorDmg','mute','playCursor','PositionJS','MainMenu','ixGRY','_hideTileShadows','_viewportSize','enemy','RpUvf','_cacheScaleY','VisuMZ_1_BattleCore','isExpGaugeDrawn','processKeyboardHandling','_lastY','command355','eventsXyNt','INEbJ','setValue','ActorMPColor','valueOutlineColor','GRD','iNUyX','_cancelButton','TAB','paramFlat','_stored_ctGaugeColor1','open','Scene_Map_update','filter','_dummyWindow','buyWindowRect','pendingColor','getCoreEngineScreenShakeStyle','isEnemy','down','wumXM','processKeyboardDelete','JESqZ','randomInt','addCommand','iuSzQ','requestFauxAnimation','#%1','destroy','escape','createTroopNote','allowShiftScrolling','IxJWp','_stored_expGaugeColor2','requestMotion','createPointAnimationTargets','changeClass','OUTCUBIC','PwYTQ','Input_clear','FadeSpeed','opacity','Padding','%2%1%3','isNwjs','_registerKeyInput','dropItems','isPlaytest','Subtitle','centerCameraCheckData','setHandler','ModernControls','IconParam7','MRF','process_VisuMZ_CoreEngine_ControllerButtons','initButtonHidden','Window_NameInput_cursorLeft','_addShadow','traitsPi','Layer','turn','Scene_Item_create','getCombinedScrollingText','YAltp','RScih','forceOutOfPlaytest','create','VisuMZ_2_BattleSystemCTB','EtieH','addLoadListener','%1/','paramRate1','nVgim','atypeId','QocAX','Scene_Skill_create','pages','FontWidthFix','czXoi','measureText','scaleMode','dummyWindowRect','processEscape','_mp','%1%2','updateOrigin','BlendMode','_centerCameraCheck','qKqHX','addEventListener','Game_Interpreter_command122','Sprite_AnimationMV_updatePosition','colSpacing','playBuzzer','ARRAYSTRUCT','PRINTSCREEN','_subject','TILDE','OUTELASTIC','iwfhw','Game_Interpreter_command111','nlayq','sv_enemies','stencilOp','isPressed','Scene_Map_createSpriteset_detach','IconSParam6','Rate2','showPicture','stop','StatusEquipRect','removeFauxAnimation','damageColor','TCR','isMVAnimation','_gamepadWait','fJHCW','pow','Skill-%1-%2','Game_Action_numRepeats','contentsBack','drawGoldItemStyle','XParamVocab9','titles2','paramMaxJS','BottomButtons','includes','OUTCIRC','EVAL','ActorHPColor','pagedown','EUqjv','Linear','padding','ControllerMatches','updatePositionCoreEngineShakeOriginal','INCIRC','UMyde','RepositionEnemies130','SkdCm','numActions','deselect','format','Game_Actor_levelUp','lKwDr','ctGaugeColor2','makeDocumentTitle','buttonY','TKvxs','setViewport','ZTheg','VisuMZ_2_BattleSystemETB','_list','renderNoMask','updateMove','scrollUp','cursorRight','uXwnu','_stored_tpGaugeColor2','forceStencil','repeat','original','catchLoadError','GameEnd','BannedWords','OptionsBgType','jsQuickFunc','CAPSLOCK','updateCoreEasing','charCode','home','zcLce','NumberRect','playLoad','parallaxes','mpGaugeColor1','setFrame','DummyRect','_closing','printError','_onKeyDown','win32','refreshWithTextCodeSupport','UzoWc','Sprite_Button_updateOpacity','XfdQX','RegExp','FDR','listWindowRect','Game_Action_updateLastTarget','INOUTBACK','JHIPI','PreserveNumbers','TPB\x20WAIT','\x20Origin:\x20%1','EscapeAlways','easingType','ColorExpGauge2','uLnov','initMembers','skillId','_isButtonHidden','_digitGrouping','_buttonAssistWindow','title','Game_Map_scrollRight','【%1】\x0a','Version','WPLAv','onLoad','isMaxLevel','start','ParseAllNotetags','paramBaseAboveLevel99','goto','save','_stored_crisisColor','numRepeats','NUMPAD2','upuZm','ColorMPCost','Input_shouldPreventDefault','EndingID','setClickHandler','Sprite_Gauge_currentValue','sparamPlusJS','maxTp','statusWindowRect','uiAreaWidth','_pauseSignSprite','_tilemap','requiredWtypeId1','Control\x20Variables\x20Script\x20Error','_offsetY','_updateGamepadState','_slotWindow','COMMA','phGcB','_stored_powerUpColor','initMembersCoreEngine','SCALE_MODES','Window_Selectable_itemRect','paramFlatBonus','ATTN','concat','_refreshBack','drawNewParam','PLAY','_maxDigits','NewGameCommonEventAll','setCoreEngineUpdateWindowBg','_opening','image-rendering','processBack','maxLvGaugeColor1','itemBackColor1','_onLoad','onInputBannedWords','yhxKQ','ESC','hit','hideButtonFromView','ExtractStrFromMap','animationId','erasePicture','SaveMenu','Scene_MenuBase_helpAreaTop','font','tpGaugeColor1','inputWindowRect','buttonAssistText5','TBhAA','MIN_SAFE_INTEGER','responseText','createFauxAnimationQueue','Duration','processCursorHomeEndTrigger','updateMain','StatusMenu','Window_NameInput_cursorDown','CallHandlerJS','anchorCoreEasing','outlineColorGauge','transform','ANcED','Game_Interpreter_command355','innerHeight','jznVQ','mainAreaTop','ParseClassNotetags','drawCharacter','_targetOffsetY','expGaugeColor2','itypeId','loadPicture','volume','_stored_tpGaugeColor1','sin','test','SellRect','ImgLoad','createBuffer','centerY','Game_Picture_x','XwscF','pNgQz','expGaugeColor1','determineSideButtonLayoutValid','isMenuButtonAssistEnabled','qdFwM','_defaultStretchMode','playBgm','isAnimationOffsetXMirrored','buttonAssistText3','mainAreaBottom','paramFlatJS','prototype','SCROLL_LOCK','position','min','Game_Map_setup','_sideButtonLayout','HelpBgType','editWindowRect','isGamepadTriggered','paramBase','drawActorLevel','AudioChangeBgsPitch','2175GYObiH','resetBattleSystem','_effectsContainer','OutlineColorGauge','StatusParamsBgType','rYBSb','markCoreEngineModified','hjiiW','xBMKb','Bitmap_drawText','NUMPAD4','processPointAnimationRequests','ypMFO','_stored_tpCostColor','onEscapeSuccess','Scene_Battle_createSpriteset','mpGaugeColor2','([\x5c+\x5c-]\x5cd+)([%％])>','_stored_mpCostColor','Game_Actor_paramBase','ACCEPT','_lastPluginCommandInterpreter','enableDigitGrouping','F15','_isWindow','_commandWindow','random','createCustomParameter','mirror','length','XParamVocab7','buttonAssistOffset%1','DrawItemBackgroundJS','pictureId','members','VisuMZ_2_BattleSystemOTB','VariableJsBlock','_logWindow','VisuMZ_2_BattleSystemSTB','_loadingState','setAction','SEMICOLON','Scene_Base_createWindowLayer','isTpb','isClosed','DetachMapPictureContainer','F21','log','〘Show\x20Text〙\x0a','_digitGroupingEx','isBottomButtonMode','overrideMimeType','runCombinedScrollingTextAsCode','SystemSetWindowPadding','DGROl','HYPHEN_MINUS','drawGameSubtitle','WxVYB','AMPERSAND','push','MDF','_cacheScaleX','moveRelativeToResolutionChange','_pictureName','currentExp','fontSize','(\x5cd+\x5c.?\x5cd+)>','stypeId','drawAllParams','MNdAU','TGR','max','createFauxAnimation','IconXParam3','AnimationID','FTqRz','LmOdx','Sprite_Battler_startMove','ZOMQf','ETiNb','_phase','hdZXN','vVRBG','mpColor','VisuMZ_1_OptionsCore','rjtYu','rgba(0,\x200,\x200,\x201.0)','ARRAYJSON','OPEN_CURLY_BRACKET','506561FOYLen','deflate','shift','offsetX','KySnN','terminate','_statusParamsWindow','setAttack','uJzQW','calcCoreEasing','makeFontSmaller','drawParamText','equips','NUMPAD3','LESS_THAN','createWindowLayer','actor','PictureID','jELbT','_isPlaytest','ControllerButtons','PAUSE','faceHeight','FCvZb','uBtpJ','normal','uIywe','Scene_Boot_startNormalGame','gIkhF','StatusParamsRect','makeDeepCopy','setActorHome','DEF','_balloonQueue','_updateFilterArea','StartID','CustomParamType','update','PTDbV','buttonAssistText%1','WASD','TKHnc','buttonAssistText1','Scene_Battle_createCancelButton','enter','wuDUD','keyMapper','KEEP','UCQMv','maxTurns','addWindow','vWWJq','IsNLx','setupCoreEngine','anchor','F19','iKqwh','OJybB','Sprite_AnimationMV_processTimingData','windowRect','(\x5cd+)>','EquipMenu','EXR','battlebacks2','CsinA','duration','ExportString','VGEnR','encounterStep','keyCode','paramWidth','%1\x0a','playCancel','dimColor2','Chance','_destroyCanvas','_stored_hpGaugeColor1','ButtonHeight','Game_Interpreter_command105','inBattle','xScrollLinkedOffset','faceWidth','abs','wait','StatusRect','Title','Game_Picture_calcEasing','animationShouldMirror','targetContentsOpacity','NlsTf','_pollGamepads','updateScene','\x5c}❪TAB❫\x5c{','createPointAnimation','INQUINT','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','mainAreaHeight','IconParam3','MRG','LINEAR','originalJS','ExportAllMapText','itemHitImprovedAccuracy','_skillTypeWindow','framebuffer','fromCharCode','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','SLEEP','MAX_GL_TEXTURES','TcRng','ToFxi','drawItem','cursorDown','destroyCoreEngineMarkedBitmaps','join','tab','ZUlPI','ColorNormal','startAnimation','Game_Troop_setup','KeyItemProtect','_context','xparamRate2','IconSParam5','_opacity','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','process_VisuMZ_CoreEngine_Settings','adjustPictureAntiZoom','IconSParam1','MDrHC','endAction','bgm','_helpWindow','OUTBACK','jYzGG','Scene_Boot_updateDocumentTitle','mainAreaHeightSideButtonLayout','updateClose','playOk','Window_NameInput_cursorPageup','ShRdo','_stored_deathColor','updateShadow','textAlign','ApplyEasing','drawActorSimpleStatus','Window_NameInput_cursorUp','Center','split','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','seVolume','MCR','Input_updateGamepadState','Tilemap_addShadow','PixelateImageRendering','_coreEngineShakeStyle','processTouchModernControls','_currentMap','gaugeBackColor','systemColor','createButtonAssistWindow','JSON','iYfYz','dimColor1','GroupDigits','dIgaQ','_troopId','storeMapData','drawGameTitle','itemWindowRect','AudioChangeBgmPan','ColorPowerDown','RZljM','dExYL','width','_pageupButton','_coreEasingType','StatusBgType','asin','slotWindowRect','cIyek','_backSprite2','setHome','yTOtl','isSmartEventCollisionOn','loadWindowskin','uajMy','qYzTF','version','ntnOb','iHKaj','onKeyDownKeysF6F7','canAttack','JWbOl','ParamArrow','loadBitmap','parameters','_baseTexture','boxWidth','306QQBonG','_offsetX','ColorHPGauge1','isCollidedWithEvents','Game_Temp_initialize','dWDbd','IconXParam4','UCMSe','call','checkSmartEventCollision','SkillMenu','paramRate2','isRepeated','XpnkB','getGamepads','F10','PictureShowIcon','7kwoGhQ','BattleManager_processEscape','MRHGU','_targetAnchor','ItemRect','MAXHP','BXBsP','nQUtF','_height','FontShadows','KeyUnlisted','_targetScaleY','Window_Base_drawText','PBkrA','itemSuccessRate','addChildToBack','BTB','ColorTPGauge1','_actor','PTB','removeOnceParallelInterpreter','coreEngineRepositionEnemies','loadMapData','buttonAssistWindowButtonRect','subtitle','DamageColor','tWAtr','iSPxv','scale','TimeProgress','_onKeyPress','JbQWK','FTB','_onError','bitmap','_repositioned','Sprite_Actor_setActorHome','CLOSE_PAREN','AKHmZ','Name','LjeXz','_numberWindow','QTlMa','drawIcon','SParamVocab4','_stored_maxLvGaugeColor2','clearRect','Symbol','text','TextManager_param','ctGaugeColor1','initDigitGrouping','_origin','_colorCache','NqAke','initCoreEngine','updatePadding','itemHeight','WIN_ICO_HELP','isPlaying','Bksvs','openingSpeed','BgFilename1','Troop%1','CommandRect','IconIndex','isPointAnimationPlaying','BgType','_stored_normalColor','paramX','pressed','_playTestFastMode','makeEncounterCount','DigitGroupingGaugeSprites','_mode','Scene_MenuBase_createCancelButton','YSsxY','helpAreaTop','INOUTQUAD','CustomParamIcons','exp','EXECUTE','layoutSettings','centerSprite','initVisuMZCoreEngine','contents','useDigitGroupingEx','height','STB','AeiZa','_tempActor','_windowLayer','NEAREST','_centerElement','UlEus','ctrl','HOME','scaleX','Game_Action_itemHit','OptionsRect','currentLevelExp','successRate','alrif','Scene_Base_terminateAnimationClearBugFix','loadSystem','_targetScaleX','bFniC','Plus','REPLACE','_screenY','Scene_Title_drawGameTitle','BZQQP','PRESERVCONVERSION(%1)','IconSParam7','INELASTIC','IconSParam2','qWTwT','connected','removeAllPointAnimations','dGFLA','ActorTPColor','QvHWo','applyCoreEasing','SgGWz','reduce','KeyTAB','ScreenResolution','zUFIY','gaugeRate','endBattlerActions','reserveNewGameCommonEvent','mapId','XParamVocab3','STRUCT','cos','XParamVocab6','horzJS','data/','rIZJl','makeTargetSprites','skipBranch','ykIxu','EISU','kFQuW','iVmLs','itemHit','_stored_mpGaugeColor1','center','subject','_targetX','_shouldPreventDefault','VZrNI','IaTEk','_optionsWindow','maxLevel','SParamVocab3','setupValueFont','updateFauxAnimations','_paramPlus','_statusEquipWindow','Key%1','ParseArmorNotetags','Scene_Status_create','statusParamsWindowRect','fGzHC','LoadMenu','drawRightArrow','Sprite_Animation_setViewport','displayName','OnLoadJS','_sellWindow','BTestWeapons','PictureEasingType','isOpenAndActive','Untitled','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','drawText','ScaleX','meVolume','DefaultMode','dashToggle','backOpacity','ShowItemBackground','Scene_MenuBase_createBackground','isInputting','_battlerName','xparamPlus','ENTER','UMzdl','batch','GREATER_THAN','gainItem','sparamFlatJS','hpGaugeColor1','alignBottom','smallParamFontSize','isAlive','goMVC','updateData','string','key%1','SubfolderParse','setupFont','〘Common\x20Event\x20%1:\x20%2〙\x20Start','menu','_createInternalTextures','Match','MAXMP','KvXrE','Window_StatusBase_drawActorSimpleStatus','Scene_Map_createSpriteset','\x0a\x0a\x0a\x0a\x0a','constructor','command122','EnableMasking','animationBaseDelay','_lastX','IconXParam9','onXhrError','cursorPageup','adjustSprite','isGameActive','ANMOQ','BTestArmors','xparamPlus1','Abbreviation','SystemLoadAudio','skillTypeWindowRect','NUMPAD6','CuRnH','en-US','initialize','LevelUpFullHp','NUMPAD9','_listWindow','drawFace','StPVz','Opacity','FbTUO','drawActorExpGauge','ActorBgType','DisplayedParams','Window_Base_drawFace','fvBac','_moveEasingType','JqvSb','_inputString','Gold','ScreenShake','down2','isGamepadAxisMoved','wprWl','scrollRight','ACbBv','CLEAR','_refreshArrows','_spriteset','profileWindowRect','code','ListRect','stringKeyMap','bgs','setupCustomRateCoreEngine','updateMainMultiply','fadeSpeed','setTargetAnchor','updateEffekseer','evaded','_pictureContainer','_stored_pendingColor','SlotBgType','inbounce','ZTjhM','value','Input_setupEventHandlers','pan','TextJS','ViKVo','resize','DOUBLE_QUOTE','Game_Interpreter_updateWaitMode','vertJS','onMoveEnd','clearOnceParallelInterpreters','setLastPluginCommandInterpreter','ExportStrFromAllTroops','bJIAn','setupBattleTestItems','BZbmO','loadTitle2','updatePositionCoreEngineShakeRand','cTFnY','Param','requestPointAnimation','META','loadTitle1','Window_NameInput_processHandling','ARRAYNUM','mqolW','1.4.4','ADD','SParamVocab9','numberWindowRect','RqyQo','Window_NameInput_processTouch','_pointAnimationQueue','uicHc','VMdUj','MTBXT','bGwNI','MenuBg','xglNu','canUse','drawActorNickname','description','getControllerInputButtonString','ItemBackColor2','xdg-open','BlurFilter','ExtractStrFromTroop','IconXParam6','playOnceParallelInterpreter','focus','clear','NONCONVERT','createDigits','FvPwT','DimColor2','ABnEn','updatePictureAntiZoom','ETB','BaseTexture','Scene_GameEnd_createBackground','bdnTn','FINAL','_makeFontNameText','targetPosition','NUMPAD8','getPointAnimationLayer','kneLz','setSideView','itemPadding','_blank','Sprite_Button_initialize','bmcJD','createTitleButtons','SaLPb','style','setupButtonImage','checkCacheKey','xparamRateJS','shake','Game_Action_setAttack','command105','HANJA','fuHrE','setupCoreEasing','ConvertNumberToString','makeCommandList','oiFhu','option','DetachBattlePictureContainer','isUseModernControls','vFypj','IconSParam8','AudioChangeBgmVolume','PERCENT','SideView','Spriteset_Base_destroy','CONTEXT_MENU','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setColorTone','font-smooth','createJsQuickFunction','SkillTypeRect','loadGameImagesCoreEngine','rpskv','Sprite_Gauge_gaugeRate','RevertPreserveNumbers','processTimingData','pictures','Speed','Game_Interpreter_PluginCommand','Scene_Base_terminate','setupRate','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','RowSpacing','itemRect','CyRka','Scene_Shop_create','actorWindowRect','_action','PHA','backspace','removeAllFauxAnimations','process_VisuMZ_CoreEngine_jsQuickFunctions','buttonAssistSwitch','_anchor','skills','ExXyt','OutlineColorDmg','maxCols','subjectHitRate','buttonAssistWindowRect','paIMg','JMtWy','displayX','\x5c}❪SHIFT❫\x5c{','BhUqC','CategoryBgType','nCRGX','OUTQUART','ENTER_SPECIAL','updatePositionCoreEngineShakeVert','ARRAYEVAL','_targets','XParamVocab8','defineProperty','ParseWeaponNotetags','loading','nAcpT','maxLvGaugeColor2','vNZzC','FunctionName','iXnLz','_hp','process_VisuMZ_CoreEngine_Functions','BxeuU','Upper\x20Left','isGamepadButtonPressed','CRI','needsUpdate','ParseItemNotetags','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','cursorLeft','kCOkR','SwitchRandomizeOne','Window_Selectable_drawBackgroundRect','none','Actor','centerX','stretch','initialBattleSystem','Bitmap_blt','setAnchor','process_VisuMZ_CoreEngine_RegExp','TobBT','processTouch','TranslucentOpacity','Class-%1-%2','blt','ExtJS','VzKMo','EditBgType','HotAk','LUK','ExportCurMapText','_buyWindow','X:\x20%1','Scene_Map_initialize','uWGAh','34264800xUMHTP','hAZZW','keyboard','cancelShowButton','scaleY','processHandling','ColorTPCost','MQMYo','setActionState','WIN_OEM_COPY','guardSkillId','buttonAssistOffset4','_targetY','VLytB','BTestItems','evade','Input_onKeyDown','_refreshPauseSign','YEtWH','dURNP','moveMenuButtonSideButtonLayout','F17','worldTransform','buttonAssistKey3','DATABASE','_targetOpacity','setCoreEngineScreenShakeStyle','Armor-%1-%2','drawCurrencyValue','ijowZ','WIN_OEM_FJ_TOUROKU','buttonAssistKey5','playTestCtrlT','sv_actors','Game_Picture_updateMove','_inputWindow','xparamRate1','INOUTQUINT','textWidth','reservePlayTestNewGameCommonEvent','MAT','ColorCTGauge2','_windowskin','maxItems','eJAsx','eUBBq','_cache','ActorRect','iDJty','Window_NameInput_cursorRight','commandWindowRect','ItemBackColor1','updatePictureCoordinates','_fauxAnimationSprites','paramMax','name','AutoScrollLockY','Bitmap_initialize','ColorCrisis','_currentBgm','crisisColor','Window_Selectable_cursorUp','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','F18','atbActive','HelpRect','currencyUnit','showFauxAnimations','Hkjdg','buttonAssistOk','setCommonEvent','Game_Event_isCollidedWithEvents','GoldFontSize','PGUP','drawParamName','isBottomHelpMode','QUESTION_MARK','isCancelled','hpColor','vwyYW','NkzHz','Wait','BattleManager_checkSubstitute','EoUiC','INOUTEXPO','ValueJS','SHIFT','CfLyN','map','alyNi','HRG','_actorWindow','HXIFC','_pointAnimationSprites','isBusy','Sprite_destroy','nXNAM','Window_Base_createTextState','startMove','ItemPadding','isTriggered','_upArrowSprite','%1〘Choice\x20%2〙\x20%3%1','uLgrZ','wtypeId','Game_Picture_show','_stored_expGaugeColor1','ParamMax','quit','SParamVocab1','updateCurrentEvent','initCoreEngineScreenShake','Window','Spriteset_Base_initialize','_stored_mpGaugeColor2','([\x5c+\x5c-]\x5cd+)>','mainFontSize','_scaleX','mhp','gaugeLineHeight','GoldRect','BlYgL','SmartEventCollisionPriority','get','iPIXe','URL','Bitmap_drawCircle','rPnrs','endAnimation','_duration','EnableNumberInput','BattleSystem','ShortcutScripts','TFloc','origin','Window_Selectable_processTouch','iconWidth','AutoStretch','rOlMa','addOnceParallelInterpreter','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','learnings','createCustomBackgroundImages','OkText','ShowJS','_playtestF7Looping','tilesets','CONVERT','sqrt','NRqWd','sellWindowRect','QoL','animationNextDelay','processMoveCommand','WIN_OEM_RESET','Game_Picture_initBasic','_centerElementCoreEngine','〘Scrolling\x20Text〙\x0a','GoldMax','_number','clearZoom','Window_NameInput_refresh','Scene_Name_create','xparam','isTouchedInsideFrame','amJuB','EvNoG','openURL','redraw','return\x200','faoKM','578193qXpHoK','BuyBgType','ColorTPGauge2','bind','szWPE','updateBackOpacity','operand','Game_Action_itemEva','Pixelated','ColorHPGauge2','evaluate','updateOnceParallelInterpreters','currentClass','startNormalGame','drawCurrentParam','yOiiu','initBasic','F20','processSoundTimings','AccuracyBoost','guLNb','baseId','loadIconBitmap','ButtonAssist','CkFjS','nDsZj','onKeyDown','NUMPAD1','_commandList','Unnamed','isSpecialCode','PRhXB','Bitmap_gradientFillRect','type','HIT','contentsOpacity','Game_Character_processMoveCommand','State-%1-%2','keypress','DOLLAR','SswQM','_drawTextOutline','catchUnknownError','Window_Gold_refresh','_image','targetObjects','innerWidth','_backgroundSprite','Scene_MenuBase_mainAreaTop','JUNJA','AGI','PictureFilename','Scene_Map_updateMain','GIPBU','vRLWG','ASTERISK','expRate','_fauxAnimationQueue','FontSmoothing','OPEN_BRACKET','_scaleY','_backSprite1','OpenURL','AllMaps','RLpoy','charAt','setBackgroundType','Scene_Base_create','EnableNameInput','exec','FoRKm','lETjk','AudioChangeBgsPan','ForceNoPlayTest','Map%1.json','_drawTextShadow','DELETE','TextCodeClassNames','ZFPrj','ColorSystem','Game_Map_scrollDown','CLOSE_BRACKET','Window_NumberInput_processDigitChange','performMiss','_mainSprite','processAlwaysEscape','jnupM','_buttonType','F16','kDbef','OpenSpeed','UrUAT','left','Y:\x20%1','jpQEU','WIN_OEM_CUSEL','outbounce','GCkMi','_storedMapText','xtAmt','setMoveEasingType','_movementDuration','buttonAssistKey2','iUsKE','iWfvw','randomJS','dVout','EoWxt','SParameterFormula','PictureEraseAll','MEV','select','traitObjects','isAnimationPlaying','nOsov','TRG','_editWindow','getLevel','outlineColor','isMaskingEnabled','WIN_OEM_CLEAR','getInputButtonString','Plus2','INSINE','ZJuig','BACK_SLASH','vGzZa','Mute','createBackground','getCustomBackgroundSettings','ColorMPGauge1','etypeId','boxHeight','sceneTerminationClearEffects','buttonAssistOffset2','ZYxNK','_pressed','nah','Total','windowOpacity','COLON','disable','altKey','levelUpRecovery','eva','Scene_Map_createMenuButton','NoTileShadows','Game_Map_scrollLeft','_width','isWindowMaskingEnabled','Flat2','ParseSkillNotetags','InputBgType','filters','toLowerCase','targetBackOpacity','tpGaugeColor2','xDyNm','UIUSx','isSceneMap','bBJdk','PDR','drawIconBySize','ZsMiX','makeFontBigger','VariableEvalReference','sparamRate2','_targetOffsetX','processKeyboardHome','Window_ShopSell_isEnabled','drawValue','10ifsPAd','CustomParamNames','SPACE','SELECT','Piwbi','ParseTilesetNotetags','command111','getInputMultiButtonStrings','SLASH','11962928jGXEbz','setMute','IconSParam4','createEnemies','isCursorMovable','xparamFlatJS','playBgs','Scene_MenuBase_createPageButtons','remove','VPtoI','VisuMZ_2_BattleSystemPTB','CEV','xHoCj','zoomScale','skillTypes','XParamVocab5','SceneManager_isGameActive','Game_Picture_y','drawTextEx','trim','kDcEh','_stored_systemColor','1.3.0','Map%1','HEMcC','setViewportCoreEngineFix','Window_Base_drawIcon','getColor','_customModified','isRightInputMode','DrawIcons','level','updateWaitMode','onDatabaseLoaded','param','paramchangeTextColor','_lastGamepad','GZtGM','playEscape','ConvertParams','xVmgm','drawTextTopAligned','canEquip','reserveCommonEvent','DxatZ','SwitchRandomizeRange','_margin','setEnemyAction','stencilFunc','catchException','iYUGO','itemLineRect','XParamVocab2','list','sparamRate','_target','numberShowButton','VisuMZ_2_BattleSystemBTB','buttonAssistCancel','TextStr','FOSsr','createCancelButton','createSpriteset','faces','ListBgType','EXCLAMATION','SkillTypeBgType','zduFA','addChild','enableDigitGroupingEx','PkJDl','Sprite_Picture_updateOrigin','cancel','isKeyItem','darwin','Scene_Map_createSpritesetFix','QUOTE','updateDashToggle','createPointAnimationQueue','ButtonFadeSpeed','process_VisuMZ_CoreEngine_Notetags','PLUS','pOZWF','NUMPAD0','_mapNameWindow','padZero','DisplayLockY','Game_Event_start','DisplayLockX','textBaseline','tileHeight','buttons','nIYSa','pictureButtons','displayY','Spriteset_Base_isAnimationPlaying','PGDN','DefaultStyle','StatusEquipBgType','OutlineColor','process_VisuMZ_CoreEngine_CustomParameters','Settings','drawBackground','_realScale','playMiss','%1〘Choice\x20Cancel〙%1','AudioChangeBgmPitch','buttonAssistOffset1','JtUQm','updatePosition','toLocaleString','_colorTone','item','_animationQueue','WIN_OEM_PA3','Window_Base_drawCharacter','EncounterRateMinimum','MapOnceParallel','WIN_OEM_JUMP','fillRect','Scene_MenuBase_mainAreaHeight','Game_Picture_scaleY','INBOUNCE','Show\x20Scrolling\x20Text\x20Script\x20Error','TitlePicButtons','STR','paramRateJS','paramPlus','NameMenu','fillText','nw.gui','toUpperCase','Scene_Map_updateScene','WdaPA','processFauxAnimationRequests','GGJdU','buttonAssistKey%1','ItemHeight','bgmVolume','_timerSprite','CNT','ItemBgType','Bitmap_drawTextOutline','OUTQUAD','Bitmap_clearRect','CLOSE_CURLY_BRACKET','Window_Selectable_processCursorMove','SParamVocab8','smooth','KeyboardInput','Game_Picture_move','render','SceneManager_initialize','Apbkr','Rate1','GoldBgType','Game_Map_scrollUp','NUMPAD5','SwitchToggleOne','DocumentTitleFmt','HqqQf','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','jcXpE','defaultInputMode','result','nHfrf','ZOOM','HphiB','MDR','object','textHeight','blendFunc','updatePositionCoreEngineShakeHorz','Sprite_Animation_processSoundTimings','restore','end','_forcedTroopView','XNiLM','floor','filterArea','Game_Party_consumeItem','BattleManager_update','setEasingType','InputRect','EQUALS','Bitmap_strokeRect','currentValue','scaleSprite','RepositionActors','isGamepadConnected','isHandled','PCPlb','repositionCancelButtonSideButtonLayout','F24','targetScaleX','gold','bqgbY','ONE','resetFontSettings','application/json','isMagical','measureTextWidthNoRounding','ALWAYS','PERIOD','Scene_Name_onInputOk','helpAreaHeight','setBackgroundOpacity','Scene_Menu_create','ExtractStrFromList','slice','rkcog','isAnimationForEach','REC','inmpM','exit','UNDERSCORE','valueOutlineWidth','nYkFH','Type','VfxqV','INSERT','WxSfM','createMenuButton','Scene_Equip_create','jsonToZip','top','alpha','_shakeDuration','updatePointAnimations','0.00','helpWindowRect','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','characters','clamp','KxqYt','Bitmap_resize','onInputOk','buttonAssistText2','Spriteset_Battle_createEnemies','TitleCommandList','isLoopVertical','isSideView','integer','expParams','isForFriend','App','playCursorSound','createTextState','QpZYp','VOLUME_DOWN','》Comment《\x0a%1\x0a','resetTextColor','clearCachedKeys','hide','DataManager_setupNewGame','iconHeight','CommandBgType','_categoryWindow','setGuard','fillStyle','〘Common\x20Event\x20%1:\x20%2〙\x20End'];_0x5c9d=function(){return _0x1d0da2;};return _0x5c9d();}const _0x161145=_0x34c4;(function(_0x2d62d2,_0x5b1713){const _0x3b561e=_0x34c4,_0x172b0f=_0x2d62d2();while(!![]){try{const _0xba82eb=parseInt(_0x3b561e(0x33c))/0x1+parseInt(_0x3b561e(0x92d))/0x2+parseInt(_0x3b561e(0x68c))/0x3+parseInt(_0x3b561e(0x181))/0x4+-parseInt(_0x3b561e(0x2e3))/0x5*(-parseInt(_0x3b561e(0x403))/0x6)+-parseInt(_0x3b561e(0x414))/0x7*(-parseInt(_0x3b561e(0x740))/0x8)+parseInt(_0x3b561e(0x5e1))/0x9*(-parseInt(_0x3b561e(0x737))/0xa);if(_0xba82eb===_0x5b1713)break;else _0x172b0f['push'](_0x172b0f['shift']());}catch(_0x2024e5){_0x172b0f['push'](_0x172b0f['shift']());}}}(_0x5c9d,0xc3304));var label=_0x161145(0x9cf),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x161145(0x1a8)](function(_0x58bb0e){const _0x4e450d=_0x161145;return _0x58bb0e[_0x4e450d(0x8e5)]&&_0x58bb0e[_0x4e450d(0x54e)][_0x4e450d(0x219)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x161145(0x767)]=function(_0x5b741f,_0xf57ca1){const _0xbbdef1=_0x161145;for(const _0x5e6766 in _0xf57ca1){if(_0x5e6766[_0xbbdef1(0x8f9)](/(.*):(.*)/i)){const _0x3f88e8=String(RegExp['$1']),_0x1ffb4b=String(RegExp['$2'])['toUpperCase']()[_0xbbdef1(0x753)]();let _0x344939,_0x27965b,_0x502b0a;switch(_0x1ffb4b){case'NUM':_0x344939=_0xf57ca1[_0x5e6766]!==''?Number(_0xf57ca1[_0x5e6766]):0x0;break;case _0xbbdef1(0x53d):_0x27965b=_0xf57ca1[_0x5e6766]!==''?JSON[_0xbbdef1(0x8b5)](_0xf57ca1[_0x5e6766]):[],_0x344939=_0x27965b[_0xbbdef1(0x639)](_0x2c9672=>Number(_0x2c9672));break;case _0xbbdef1(0x21b):_0x344939=_0xf57ca1[_0x5e6766]!==''?eval(_0xf57ca1[_0x5e6766]):null;break;case _0xbbdef1(0x5b2):_0x27965b=_0xf57ca1[_0x5e6766]!==''?JSON[_0xbbdef1(0x8b5)](_0xf57ca1[_0x5e6766]):[],_0x344939=_0x27965b[_0xbbdef1(0x639)](_0xdb5f48=>eval(_0xdb5f48));break;case _0xbbdef1(0x3dd):_0x344939=_0xf57ca1[_0x5e6766]!==''?JSON[_0xbbdef1(0x8b5)](_0xf57ca1[_0x5e6766]):'';break;case _0xbbdef1(0x33a):_0x27965b=_0xf57ca1[_0x5e6766]!==''?JSON[_0xbbdef1(0x8b5)](_0xf57ca1[_0x5e6766]):[],_0x344939=_0x27965b['map'](_0x1d51b4=>JSON[_0xbbdef1(0x8b5)](_0x1d51b4));break;case'FUNC':_0x344939=_0xf57ca1[_0x5e6766]!==''?new Function(JSON[_0xbbdef1(0x8b5)](_0xf57ca1[_0x5e6766])):new Function(_0xbbdef1(0x68a));break;case _0xbbdef1(0x14f):_0x27965b=_0xf57ca1[_0x5e6766]!==''?JSON[_0xbbdef1(0x8b5)](_0xf57ca1[_0x5e6766]):[],_0x344939=_0x27965b[_0xbbdef1(0x639)](_0x62565b=>new Function(JSON[_0xbbdef1(0x8b5)](_0x62565b)));break;case _0xbbdef1(0x7bd):_0x344939=_0xf57ca1[_0x5e6766]!==''?String(_0xf57ca1[_0x5e6766]):'';break;case'ARRAYSTR':_0x27965b=_0xf57ca1[_0x5e6766]!==''?JSON[_0xbbdef1(0x8b5)](_0xf57ca1[_0x5e6766]):[],_0x344939=_0x27965b[_0xbbdef1(0x639)](_0x244300=>String(_0x244300));break;case _0xbbdef1(0x499):_0x502b0a=_0xf57ca1[_0x5e6766]!==''?JSON[_0xbbdef1(0x8b5)](_0xf57ca1[_0x5e6766]):{},_0x5b741f[_0x3f88e8]={},VisuMZ['ConvertParams'](_0x5b741f[_0x3f88e8],_0x502b0a);continue;case _0xbbdef1(0x1f9):_0x27965b=_0xf57ca1[_0x5e6766]!==''?JSON[_0xbbdef1(0x8b5)](_0xf57ca1[_0x5e6766]):[],_0x344939=_0x27965b[_0xbbdef1(0x639)](_0x4057a4=>VisuMZ['ConvertParams']({},JSON[_0xbbdef1(0x8b5)](_0x4057a4)));break;default:continue;}_0x5b741f[_0x3f88e8]=_0x344939;}}return _0x5b741f;},VisuMZ[_0x161145(0x9cf)]['SceneManager_exit']=SceneManager['exit'],SceneManager[_0x161145(0x816)]=function(){const _0x5c1496=_0x161145;VisuMZ[_0x5c1496(0x9cf)][_0x5c1496(0x998)]['call'](this);if(Utils[_0x5c1496(0x8bf)]>=_0x5c1496(0x53f)){if(typeof nw===_0x5c1496(0x7e9))nw[_0x5c1496(0x835)][_0x5c1496(0x64d)]();}},(_0x465d80=>{const _0x499e0b=_0x161145,_0x497d57=_0x465d80[_0x499e0b(0x618)];for(const _0x20a8e0 of dependencies){if(_0x499e0b(0x713)!=='AbkbO'){if(!Imported[_0x20a8e0]){alert(_0x499e0b(0x586)[_0x499e0b(0x229)](_0x497d57,_0x20a8e0)),SceneManager[_0x499e0b(0x816)]();break;}}else return this[_0x499e0b(0x854)]();}const _0x276166=_0x465d80['description'];if(_0x276166['match'](/\[Version[ ](.*?)\]/i)){const _0x3b4632=Number(RegExp['$1']);_0x3b4632!==VisuMZ[label][_0x499e0b(0x3f8)]&&(alert(_0x499e0b(0x66d)[_0x499e0b(0x229)](_0x497d57,_0x3b4632)),SceneManager['exit']());}if(_0x276166[_0x499e0b(0x8f9)](/\[Tier[ ](\d+)\]/i)){const _0x163ba5=Number(RegExp['$1']);_0x163ba5<tier?(alert(_0x499e0b(0x3a6)['format'](_0x497d57,_0x163ba5,tier)),SceneManager['exit']()):tier=Math['max'](_0x163ba5,tier);}VisuMZ[_0x499e0b(0x767)](VisuMZ[label][_0x499e0b(0x7a5)],_0x465d80['parameters']);})(pluginData),((()=>{const _0x4e1c7=_0x161145;if(VisuMZ[_0x4e1c7(0x9cf)][_0x4e1c7(0x7a5)]['QoL'][_0x4e1c7(0x4dd)]??!![])for(const _0x5ce384 in $plugins){const _0x34ee1e=$plugins[_0x5ce384];if(_0x34ee1e[_0x4e1c7(0x618)][_0x4e1c7(0x8f9)](/(.*)\/(.*)/i)){if(_0x4e1c7(0x190)===_0x4e1c7(0x5f4)){return _0x586371['prototype'][_0x4e1c7(0x44d)][_0x4e1c7(0x40b)](this)+_0x2c049f['CoreEngine'][_0x4e1c7(0x7a5)]['Window'][_0x4e1c7(0x7c9)];;}else _0x34ee1e[_0x4e1c7(0x618)]=String(RegExp['$2'][_0x4e1c7(0x753)]());}}})()),PluginManager[_0x161145(0x975)](pluginData['name'],_0x161145(0x88c),_0x2e0c27=>{const _0x4bfd98=_0x161145;if(!SceneManager[_0x4bfd98(0x988)])return;if(!SceneManager[_0x4bfd98(0x988)][_0x4bfd98(0x514)])return;VisuMZ['ConvertParams'](_0x2e0c27,_0x2e0c27);const _0x54bbac=Math['round'](_0x2e0c27['pointX']),_0x1a4af1=Math[_0x4bfd98(0x8c8)](_0x2e0c27['pointY']);$gameTemp[_0x4bfd98(0x539)](_0x54bbac,_0x1a4af1,_0x2e0c27[_0x4bfd98(0x32d)],_0x2e0c27[_0x4bfd98(0x9c2)],_0x2e0c27[_0x4bfd98(0x70b)]);}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],_0x161145(0x581),_0xd415cc=>{const _0x441eb2=_0x161145;VisuMZ[_0x441eb2(0x767)](_0xd415cc,_0xd415cc);const _0x99a597=Math[_0x441eb2(0x8c8)](_0xd415cc[_0x441eb2(0x2c2)])[_0x441eb2(0x829)](0x0,0x64),_0x30fdf7=AudioManager[_0x441eb2(0x61c)];if(_0x30fdf7){if(_0x441eb2(0x993)!=='AlDhB')return _0x387b4c((_0x1d44eb*0x64)[_0x441eb2(0x8f5)](_0x120a79))+'%';else _0x30fdf7[_0x441eb2(0x2c2)]=_0x99a597,console[_0x441eb2(0x312)](_0x30fdf7),AudioManager[_0x441eb2(0x2d2)](_0x30fdf7);}}),PluginManager[_0x161145(0x975)](pluginData['name'],_0x161145(0x7aa),_0x549d08=>{const _0x58d6ac=_0x161145;VisuMZ[_0x58d6ac(0x767)](_0x549d08,_0x549d08);const _0x3fb078=Math[_0x58d6ac(0x8c8)](_0x549d08[_0x58d6ac(0x937)])[_0x58d6ac(0x829)](0x32,0x96),_0x3566b8=AudioManager[_0x58d6ac(0x61c)];_0x3566b8&&(_0x3566b8['pitch']=_0x3fb078,AudioManager['playBgm'](_0x3566b8));}),PluginManager[_0x161145(0x975)](pluginData['name'],_0x161145(0x3e6),_0x1b8db9=>{const _0x5e2138=_0x161145;VisuMZ[_0x5e2138(0x767)](_0x1b8db9,_0x1b8db9);const _0x3f7dc8=Math[_0x5e2138(0x8c8)](_0x1b8db9[_0x5e2138(0x527)])[_0x5e2138(0x829)](-0x64,0x64),_0x1b3ecd=AudioManager[_0x5e2138(0x61c)];_0x1b3ecd&&(_0x1b3ecd[_0x5e2138(0x527)]=_0x3f7dc8,AudioManager['playBgm'](_0x1b3ecd));}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],'AudioChangeBgsVolume',_0x266ed9=>{const _0x98018f=_0x161145;VisuMZ[_0x98018f(0x767)](_0x266ed9,_0x266ed9);const _0x50c4b9=Math['round'](_0x266ed9['volume'])[_0x98018f(0x829)](0x0,0x64),_0x427c0c=AudioManager[_0x98018f(0x90e)];_0x427c0c&&(_0x427c0c[_0x98018f(0x2c2)]=_0x50c4b9,AudioManager[_0x98018f(0x746)](_0x427c0c));}),PluginManager[_0x161145(0x975)](pluginData['name'],_0x161145(0x2e2),_0x5a7ee5=>{const _0x1e4057=_0x161145;VisuMZ[_0x1e4057(0x767)](_0x5a7ee5,_0x5a7ee5);const _0x518542=Math['round'](_0x5a7ee5[_0x1e4057(0x937)])[_0x1e4057(0x829)](0x32,0x96),_0x481a37=AudioManager[_0x1e4057(0x90e)];_0x481a37&&(_0x481a37[_0x1e4057(0x937)]=_0x518542,AudioManager[_0x1e4057(0x746)](_0x481a37));}),PluginManager[_0x161145(0x975)](pluginData['name'],_0x161145(0x6d4),_0x5dc5a5=>{const _0x445912=_0x161145;VisuMZ[_0x445912(0x767)](_0x5dc5a5,_0x5dc5a5);const _0x52ab3c=Math[_0x445912(0x8c8)](_0x5dc5a5[_0x445912(0x527)])[_0x445912(0x829)](-0x64,0x64),_0x29bf1a=AudioManager[_0x445912(0x90e)];_0x29bf1a&&(_0x29bf1a['pan']=_0x52ab3c,AudioManager[_0x445912(0x746)](_0x29bf1a));}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],'DebugConsoleLastControllerID',_0x58c3f6=>{const _0x202ca5=_0x161145;if(!$gameTemp[_0x202ca5(0x1ca)]())return;const _0x34f422=Input['getLastUsedGamepadType']();navigator[_0x202ca5(0x9d8)]&&(_0x202ca5(0x686)!=='amJuB'?(_0x2a5877[_0x202ca5(0x2d7)][_0x202ca5(0x4fb)][_0x202ca5(0x40b)](this),this['_data']=_0x4c405f,this[_0x202ca5(0x176)]=null,this[_0x202ca5(0x935)]()):navigator[_0x202ca5(0x9d8)][_0x202ca5(0x8b4)](_0x34f422));}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],_0x161145(0x3a1),_0x801fdc=>{const _0x25c938=_0x161145;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x25c938(0x1c7)]())return;SceneManager[_0x25c938(0x988)][_0x25c938(0x985)]=![],VisuMZ[_0x25c938(0x9cf)][_0x25c938(0x99d)]();}),PluginManager['registerCommand'](pluginData[_0x161145(0x618)],_0x161145(0x88e),_0x382db6=>{const _0xd505fd=_0x161145;if(!$gameTemp[_0xd505fd(0x1ca)]())return;if(!Utils[_0xd505fd(0x1c7)]())return;SceneManager[_0xd505fd(0x988)][_0xd505fd(0x985)]=![],VisuMZ[_0xd505fd(0x9cf)][_0xd505fd(0x531)]();}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],_0x161145(0x5dc),_0x4cb8b6=>{const _0x371740=_0x161145;if(!$gameTemp[_0x371740(0x1ca)]())return;if(!Utils[_0x371740(0x1c7)]())return;if(!$gameMap)return;if($gameMap[_0x371740(0x497)]()<=0x0)return;VisuMZ[_0x371740(0x767)](_0x4cb8b6,_0x4cb8b6);const _0x35dfab=_0x371740(0x757)[_0x371740(0x229)]($gameMap[_0x371740(0x497)]()[_0x371740(0x795)](0x3)),_0x54bdc1=VisuMZ[_0x371740(0x9cf)][_0x371740(0x2a1)]($gameMap[_0x371740(0x497)]());VisuMZ[_0x371740(0x9cf)][_0x371740(0x37e)](_0x54bdc1,_0x35dfab,!![]);}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],'ExportCurTroopText',_0x293ccb=>{const _0x5d2011=_0x161145;if(!$gameTemp[_0x5d2011(0x1ca)]())return;if(!Utils[_0x5d2011(0x1c7)]())return;if(!$gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x293ccb,_0x293ccb);const _0x36aae3=_0x5d2011(0x453)[_0x5d2011(0x229)]($gameTroop[_0x5d2011(0x3e2)]['padZero'](0x4)),_0x45c6f3=VisuMZ[_0x5d2011(0x9cf)][_0x5d2011(0x553)]($gameTroop[_0x5d2011(0x3e2)]);VisuMZ[_0x5d2011(0x9cf)]['ExportString'](_0x45c6f3,_0x36aae3,!![]);}),VisuMZ['CoreEngine']['ExportString']=function(_0x5dda67,_0x4b152b,_0x58395e){const _0x55d54e=_0x161145,_0x407b98=require('fs');let _0x3586f='Exported_Script_%1.txt'[_0x55d54e(0x229)](_0x4b152b||'0');_0x407b98[_0x55d54e(0x8ab)](_0x3586f,_0x5dda67,_0x42f93b=>{const _0x2ce857=_0x55d54e;if(_0x42f93b){if(_0x2ce857(0x690)!==_0x2ce857(0x8f0))throw err;else _0x470b28=_0x29a6d8[_0x2ce857(0x28f)](_0x13c56c);}else _0x58395e&&alert('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'[_0x2ce857(0x229)](_0x3586f));});},VisuMZ[_0x161145(0x9cf)]['ExportStrFromAllMaps']=function(){const _0x2047b1=_0x161145,_0x4bbeb3=[];for(const _0x1cb172 of $dataMapInfos){if(_0x2047b1(0x32f)==='yRLec')_0x32ae7a[_0x2047b1(0x9cf)][_0x2047b1(0x640)]['call'](this),this['destroyCoreEngineMarkedBitmaps']();else{if(!_0x1cb172)continue;_0x4bbeb3['push'](_0x1cb172['id']);}}const _0x1f87a9=_0x4bbeb3[_0x2047b1(0x300)]*0x64+Math[_0x2047b1(0x1b2)](0x64);alert(_0x2047b1(0x827)[_0x2047b1(0x229)](_0x1f87a9)),this['_storedMapText']=[],this[_0x2047b1(0x3d9)]=$dataMap;for(const _0x252fd0 of _0x4bbeb3){VisuMZ['CoreEngine'][_0x2047b1(0x42a)](_0x252fd0);}setTimeout(VisuMZ[_0x2047b1(0x9cf)][_0x2047b1(0x9c6)]['bind'](this),_0x1f87a9);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x42a)]=function(_0x396fae){const _0x90ff44=_0x161145,_0x1712c7=_0x90ff44(0x6d6)['format'](_0x396fae[_0x90ff44(0x795)](0x3)),_0x5a4c83=new XMLHttpRequest(),_0x42c99a=_0x90ff44(0x49d)+_0x1712c7;_0x5a4c83[_0x90ff44(0x1a6)]('GET',_0x42c99a),_0x5a4c83[_0x90ff44(0x316)](_0x90ff44(0x807)),_0x5a4c83[_0x90ff44(0x990)]=()=>this[_0x90ff44(0x3e3)](_0x5a4c83,_0x396fae,_0x1712c7,_0x42c99a),_0x5a4c83[_0x90ff44(0x887)]=()=>DataManager[_0x90ff44(0x4ee)](_0x90ff44(0x9dd),_0x1712c7,_0x42c99a),_0x5a4c83['send']();},VisuMZ['CoreEngine']['storeMapData']=function(_0x509096,_0x26ffe9,_0x42de87,_0x1fe274){const _0x532667=_0x161145;$dataMap=JSON[_0x532667(0x8b5)](_0x509096[_0x532667(0x2ac)]),DataManager[_0x532667(0x26c)]($dataMap),this[_0x532667(0x6ee)][_0x26ffe9]=VisuMZ[_0x532667(0x9cf)][_0x532667(0x2a1)](_0x26ffe9),$dataMap=this[_0x532667(0x3d9)];},VisuMZ[_0x161145(0x9cf)]['exportAllMapStrings']=function(){const _0x4fb01e=_0x161145,_0xe423c8=_0x4fb01e(0x6cb);this[_0x4fb01e(0x6ee)][_0x4fb01e(0x748)](undefined)[_0x4fb01e(0x748)]('')[_0x4fb01e(0x748)](null);const _0x6c1fe0=this[_0x4fb01e(0x6ee)][_0x4fb01e(0x3ae)](_0x4fb01e(0x4e7))[_0x4fb01e(0x753)]();VisuMZ[_0x4fb01e(0x9cf)][_0x4fb01e(0x37e)](_0x6c1fe0,_0xe423c8,!![]),SceneManager['_scene'][_0x4fb01e(0x985)]=!![];},VisuMZ[_0x161145(0x9cf)][_0x161145(0x2a1)]=function(_0x4fd287){const _0x5d968b=_0x161145;if(!$dataMap)return'';let _0x1f5ee6='█'[_0x5d968b(0x23b)](0x46)+'\x0a\x0a',_0x4f1bb3='═'[_0x5d968b(0x23b)](0x46)+'\x0a\x0a',_0x5c0903='';this[_0x5d968b(0x156)]=0x0;for(const _0x9f6608 of $dataMap['events']){if(!_0x9f6608)continue;let _0x287f3c=_0x9f6608['id'],_0x1d3a41=_0x9f6608[_0x5d968b(0x618)],_0x71d003=_0x9f6608[_0x5d968b(0x1e7)];for(const _0x5c9cae of _0x71d003){const _0x439c0c=_0x71d003[_0x5d968b(0x960)](_0x5c9cae)+0x1;let _0x50bf61=_0x4f1bb3+_0x5d968b(0x5c5),_0x1df266=VisuMZ[_0x5d968b(0x9cf)][_0x5d968b(0x810)](_0x5c9cae[_0x5d968b(0x775)]);if(_0x1df266[_0x5d968b(0x300)]>0x0){if(_0x5c0903[_0x5d968b(0x300)]>0x0)_0x5d968b(0x1b4)==='aiYWG'?(_0x35ce3a=_0x5a0c4e[_0x5d968b(0x8c8)](_0x4d1da1),_0x2949fc=_0xa79067[_0x5d968b(0x8c8)](_0xb0cd7e),_0x331e46[_0x5d968b(0x9cf)][_0x5d968b(0x75a)][_0x5d968b(0x40b)](this,_0x2a7815,_0x5f4e18,_0x2d03d0)):_0x5c0903+=_0x4f1bb3+_0x5d968b(0x4e7);else{if(_0x5d968b(0x2cc)===_0x5d968b(0x2cc)){const _0x12a1ef=$dataMapInfos[_0x4fd287][_0x5d968b(0x618)];_0x5c0903+=_0x1f5ee6+_0x5d968b(0x9da)[_0x5d968b(0x229)](_0x4fd287,_0x12a1ef||_0x5d968b(0x6a9))+_0x1f5ee6;}else this['_closing']=![];}_0x5c0903+=_0x50bf61[_0x5d968b(0x229)](_0x287f3c,_0x1d3a41,_0x439c0c,_0x1df266);}}}return _0x5c0903[_0x5d968b(0x300)]>0x0&&(_0x5c0903+=_0x4f1bb3),_0x5c0903;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x531)]=function(){const _0x52ac71=_0x161145,_0x4bbebb=$dataTroops['length']*0xa+Math[_0x52ac71(0x1b2)](0xa);alert(_0x52ac71(0x3d1)[_0x52ac71(0x229)](_0x4bbebb));const _0x24e76d=[];for(const _0x45702e of $dataTroops){if(!_0x45702e)continue;const _0x1d6162=_0x45702e['id'];_0x24e76d[_0x1d6162]=VisuMZ['CoreEngine'][_0x52ac71(0x553)](_0x1d6162);}setTimeout(VisuMZ[_0x52ac71(0x9cf)][_0x52ac71(0x92e)]['bind'](this,_0x24e76d),_0x4bbebb);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x553)]=function(_0x3a9df2){const _0x3f8ccb=_0x161145;if(!$dataTroops[_0x3a9df2])return'';let _0x51a000='█'[_0x3f8ccb(0x23b)](0x46)+'\x0a\x0a',_0x2fa2f8='═'['repeat'](0x46)+'\x0a\x0a',_0x1ab7d3='';this[_0x3f8ccb(0x156)]=0x0;const _0x2e3e19=$dataTroops[_0x3a9df2];let _0x577b52=_0x2e3e19[_0x3f8ccb(0x1e7)];for(const _0x11f3db of _0x577b52){const _0x664f5c=_0x577b52[_0x3f8ccb(0x960)](_0x11f3db)+0x1;let _0xb78eed=_0x2fa2f8+'《《《\x20Page\x20%1\x20》》》\x0a%2\x0a',_0x4c340c=VisuMZ[_0x3f8ccb(0x9cf)][_0x3f8ccb(0x810)](_0x11f3db['list']);if(_0x4c340c[_0x3f8ccb(0x300)]>0x0){if(_0x1ab7d3['length']>0x0)'POmyx'!=='dKsik'?_0x1ab7d3+=_0x2fa2f8+_0x3f8ccb(0x4e7):(_0x492a9a['CoreEngine'][_0x3f8ccb(0x67c)]['call'](this),this['_anchor']={'x':0x0,'y':0x0},this[_0x3f8ccb(0x417)]={'x':0x0,'y':0x0});else{if(_0x3f8ccb(0x3de)!==_0x3f8ccb(0x3de)){const _0x47856d=this['innerWidth']/0x5,_0x5d3993=_0x33df47[_0x3f8ccb(0x988)],_0x5b2a56=_0x5d3993[_0x3f8ccb(0x7c8)[_0x3f8ccb(0x229)](_0x48e44a)](),_0x19435a=_0x5d3993['buttonAssistText%1'[_0x3f8ccb(0x229)](_0x273e28)]();this[_0x3f8ccb(0x905)][_0x3f8ccb(0x4dc)[_0x3f8ccb(0x229)](_0x3ff251)]=_0x5b2a56,this[_0x3f8ccb(0x905)][_0x3f8ccb(0x8d8)[_0x3f8ccb(0x229)](_0x1377e4)]=_0x19435a;if(_0x5b2a56==='')return;if(_0x19435a==='')return;const _0x23a144=_0x5d3993['buttonAssistOffset%1'[_0x3f8ccb(0x229)](_0x12a0a0)](),_0x59e62a=this[_0x3f8ccb(0x569)](),_0x3bd8b9=_0x47856d*(_0x5caf76-0x1)+_0x59e62a+_0x23a144,_0x11542f=_0x2de0a8[_0x3f8ccb(0x9cf)][_0x3f8ccb(0x7a5)]['ButtonAssist']['TextFmt'];this['drawTextEx'](_0x11542f[_0x3f8ccb(0x229)](_0x5b2a56,_0x19435a),_0x3bd8b9,0x0,_0x47856d-_0x59e62a*0x2);}else _0x1ab7d3+=_0x51a000+_0x3f8ccb(0x39b)['format'](_0x3a9df2,_0x2e3e19['name']||_0x3f8ccb(0x6a9))+_0x51a000;}_0x1ab7d3+=_0xb78eed['format'](_0x664f5c,_0x4c340c);}}if(_0x1ab7d3['length']>0x0){if(_0x3f8ccb(0x6cc)==='jwRtV')return _0x24f464['layoutSettings'][_0x3f8ccb(0x58a)][_0x3f8ccb(0x40b)](this);else _0x1ab7d3+=_0x2fa2f8;}return _0x1ab7d3;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x92e)]=function(_0x27475b){const _0xa2d3bd=_0x161145,_0x18bfee=_0xa2d3bd(0x9e2);_0x27475b[_0xa2d3bd(0x748)](undefined)[_0xa2d3bd(0x748)]('')[_0xa2d3bd(0x748)](null);const _0x10f658=_0x27475b['join']('\x0a\x0a\x0a\x0a\x0a')[_0xa2d3bd(0x753)]();VisuMZ[_0xa2d3bd(0x9cf)][_0xa2d3bd(0x37e)](_0x10f658,_0x18bfee,!![]),SceneManager[_0xa2d3bd(0x988)][_0xa2d3bd(0x985)]=!![];},VisuMZ[_0x161145(0x9cf)][_0x161145(0x810)]=function(_0xcb16f5){const _0x5e01c2=_0x161145;let _0x491349='\x0a'+'─'['repeat'](0x46)+'\x0a',_0x4bcf9b='\x0a'+'┄'['repeat'](0x46)+'\x0a',_0x512c88='';for(const _0x61151b of _0xcb16f5){if(!_0x61151b)continue;if(_0x61151b[_0x5e01c2(0x516)]===0x65)_0x512c88+=_0x491349+'\x0a',_0x512c88+=_0x5e01c2(0x313),_0x61151b[_0x5e01c2(0x400)][0x4]!==''&&_0x61151b['parameters'][0x4]!==undefined&&(_0x5e01c2(0x953)===_0x5e01c2(0x953)?_0x512c88+=_0x5e01c2(0x269)[_0x5e01c2(0x229)](_0x61151b['parameters'][0x4]):(_0x443a2e+=_0x12ec8f+'\x0a',_0x17dd5b+=_0x5e01c2(0x67e)));else{if(_0x61151b[_0x5e01c2(0x516)]===0x191)_0x512c88+='%1\x0a'[_0x5e01c2(0x229)](_0x61151b[_0x5e01c2(0x400)][0x0]);else{if(_0x61151b[_0x5e01c2(0x516)]===0x192)_0x512c88+=_0x491349,_0x512c88+=_0x5e01c2(0x647)[_0x5e01c2(0x229)](_0x4bcf9b,_0x61151b[_0x5e01c2(0x400)][0x0]+0x1,_0x61151b['parameters'][0x1]);else{if(_0x61151b[_0x5e01c2(0x516)]===0x193)_0x512c88+=_0x491349,_0x512c88+=_0x5e01c2(0x7a9)[_0x5e01c2(0x229)](_0x4bcf9b);else{if(_0x61151b[_0x5e01c2(0x516)]===0x194)_0x512c88+=_0x491349,_0x512c88+='%1〘End\x20Choice\x20Selection〙%1'[_0x5e01c2(0x229)](_0x4bcf9b);else{if(_0x61151b['code']===0x69)_0x5e01c2(0x631)===_0x5e01c2(0x631)?(_0x512c88+=_0x491349+'\x0a',_0x512c88+=_0x5e01c2(0x67e)):this[_0x5e01c2(0x96a)]={'SideView':_0x877ceb['optSideView'],'BattleSystem':this[_0x5e01c2(0x5ce)](),'FontSize':_0x30c993['advanced'][_0x5e01c2(0x324)],'Padding':0xc};else{if(_0x61151b[_0x5e01c2(0x516)]===0x6c){if('jELbT'!==_0x5e01c2(0x34e))return this[_0x5e01c2(0x982)](_0x114df9)&&_0x170408['itypeId']===0x2;else _0x512c88+=_0x491349+'\x0a',_0x512c88+=_0x5e01c2(0x83a)[_0x5e01c2(0x229)](_0x61151b[_0x5e01c2(0x400)][0x0]);}else{if(_0x61151b[_0x5e01c2(0x516)]===0x198){if('iUsKE'===_0x5e01c2(0x6f3))_0x512c88+=_0x5e01c2(0x383)[_0x5e01c2(0x229)](_0x61151b[_0x5e01c2(0x400)][0x0]);else{var _0x25a572=_0x57f1dd(_0x156854['$1']);if(_0x25a572===0x0)_0x25a572=_0x2f0434['MAX_SAFE_INTEGER'];_0x12d948=_0x4303b8[_0x5e01c2(0x32a)](_0x52f130,_0x25a572);}}else{if(_0x61151b[_0x5e01c2(0x516)]===0x75){if('YiObU'!==_0x5e01c2(0x46d)){const _0x4fad20=$dataCommonEvents[_0x61151b['parameters'][0x0]];if(_0x4fad20&&this[_0x5e01c2(0x156)]<=0xa){this[_0x5e01c2(0x156)]++;let _0x25d6b8=VisuMZ[_0x5e01c2(0x9cf)][_0x5e01c2(0x810)](_0x4fad20[_0x5e01c2(0x775)]);_0x25d6b8[_0x5e01c2(0x300)]>0x0&&(_0x5e01c2(0x1db)===_0x5e01c2(0x6ea)?(_0x3731c1[_0x5e01c2(0x9cf)][_0x5e01c2(0x367)][_0x5e01c2(0x40b)](this),_0x301f4a[_0x5e01c2(0x15f)]()&&this[_0x5e01c2(0x800)]()):(_0x512c88+=_0x491349,_0x512c88+=_0x4bcf9b,_0x512c88+=_0x5e01c2(0x4df)[_0x5e01c2(0x229)](_0x4fad20['id'],_0x4fad20[_0x5e01c2(0x618)]),_0x512c88+=_0x4bcf9b,_0x512c88+=_0x25d6b8,_0x512c88+=_0x4bcf9b,_0x512c88+='〘Common\x20Event\x20%1:\x20%2〙\x20End'[_0x5e01c2(0x229)](_0x4fad20['id'],_0x4fad20['name']),_0x512c88+=_0x4bcf9b)),this[_0x5e01c2(0x156)]--;}}else{if(this['_hideTileShadows']===_0x547862)this[_0x5e01c2(0x371)]();return this[_0x5e01c2(0x191)];}}}}}}}}}}}return _0x512c88['length']>0x0&&(_0x512c88+=_0x491349),_0x512c88;},PluginManager[_0x161145(0x975)](pluginData['name'],_0x161145(0x6ca),_0x3e17c6=>{const _0x572338=_0x161145;VisuMZ['ConvertParams'](_0x3e17c6,_0x3e17c6);const _0x49a6d6=_0x3e17c6[_0x572338(0x65e)];VisuMZ['openURL'](_0x49a6d6);}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],'GoldChange',_0x59b76b=>{const _0xe4ccb7=_0x161145;VisuMZ[_0xe4ccb7(0x767)](_0x59b76b,_0x59b76b);const _0x24d9f4=_0x59b76b[_0xe4ccb7(0x525)]||0x0;$gameParty['gainGold'](_0x24d9f4);}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],_0x161145(0x7b5),_0x5d5d30=>{const _0x275ac9=_0x161145;if(!SceneManager[_0x275ac9(0x72b)]())return;VisuMZ[_0x275ac9(0x767)](_0x5d5d30,_0x5d5d30);const _0x2fff3e=_0x5d5d30[_0x275ac9(0x894)];SceneManager[_0x275ac9(0x988)][_0x275ac9(0x555)](_0x2fff3e);}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],'PictureCoordinatesMode',_0x21d7bf=>{const _0x35e62d=_0x161145;if(!$gameTemp[_0x35e62d(0x1ca)]())return;if(!Utils[_0x35e62d(0x1c7)]())return;VisuMZ[_0x35e62d(0x767)](_0x21d7bf,_0x21d7bf);const _0x3f0815=_0x21d7bf[_0x35e62d(0x34d)]||0x1;$gameTemp[_0x35e62d(0x8aa)]=_0x3f0815;}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],_0x161145(0x4c0),_0x326aa4=>{const _0x440e32=_0x161145;VisuMZ[_0x440e32(0x767)](_0x326aa4,_0x326aa4);const _0x24534a=_0x326aa4[_0x440e32(0x304)]||0x1,_0x17bd77=_0x326aa4[_0x440e32(0x25f)]||_0x440e32(0x21f),_0x21769e=$gameScreen[_0x440e32(0x99f)](_0x24534a);if(_0x21769e){if(_0x440e32(0x5a9)===_0x440e32(0x433))return this[_0x440e32(0x99c)]();else _0x21769e[_0x440e32(0x7f6)](_0x17bd77);}}),PluginManager['registerCommand'](pluginData[_0x161145(0x618)],_0x161145(0x6f9),_0x3ec502=>{for(let _0x13e6c7=0x1;_0x13e6c7<=0x64;_0x13e6c7++){$gameScreen['erasePicture'](_0x13e6c7);}}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],'PictureEraseRange',_0x26c6a1=>{const _0x1b568b=_0x161145;VisuMZ[_0x1b568b(0x767)](_0x26c6a1,_0x26c6a1);const _0x227268=Math['min'](_0x26c6a1['StartID'],_0x26c6a1[_0x1b568b(0x279)]),_0x42bb42=Math[_0x1b568b(0x32a)](_0x26c6a1[_0x1b568b(0x35f)],_0x26c6a1[_0x1b568b(0x279)]);for(let _0x10f948=_0x227268;_0x10f948<=_0x42bb42;_0x10f948++){$gameScreen[_0x1b568b(0x2a3)](_0x10f948);}}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],_0x161145(0x413),_0x36b7a5=>{const _0x1bb05a=_0x161145;VisuMZ[_0x1bb05a(0x767)](_0x36b7a5,_0x36b7a5);const _0x3c5e6d=Math[_0x1bb05a(0x8c8)](_0x36b7a5[_0x1bb05a(0x34d)])['clamp'](0x1,0x64),_0x10b8d3=_0x36b7a5['Settings'],_0x3d843b=_0x10b8d3[_0x1bb05a(0x89c)][_0x1bb05a(0x829)](0x0,0x1),_0x222b59=Math[_0x1bb05a(0x8c8)](_0x10b8d3['PositionX']||0x0),_0x5292ce=Math[_0x1bb05a(0x8c8)](_0x10b8d3['PositionY']||0x0),_0x596609=Math[_0x1bb05a(0x8c8)](_0x10b8d3[_0x1bb05a(0x4c5)]||0x0),_0x4125be=Math['round'](_0x10b8d3[_0x1bb05a(0x97d)]||0x0),_0x7d3178=Math[_0x1bb05a(0x8c8)](_0x10b8d3[_0x1bb05a(0x501)])['clamp'](0x0,0xff),_0x2b9e35=_0x10b8d3[_0x1bb05a(0x1f1)],_0x35b68d='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0x554992=_0x36b7a5['Smooth']?'Smooth':_0x1bb05a(0x694),_0x274ebd=_0x35b68d[_0x1bb05a(0x229)](_0x36b7a5[_0x1bb05a(0x455)],_0x554992);$gameScreen[_0x1bb05a(0x207)](_0x3c5e6d,_0x274ebd,_0x3d843b,_0x222b59,_0x5292ce,_0x596609,_0x4125be,_0x7d3178,_0x2b9e35);}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],_0x161145(0x50c),_0xe13ad1=>{const _0x59fdc2=_0x161145;VisuMZ[_0x59fdc2(0x767)](_0xe13ad1,_0xe13ad1);const _0x3cce23=_0xe13ad1[_0x59fdc2(0x81a)]||_0x59fdc2(0x2fd),_0x5bd000=_0xe13ad1[_0x59fdc2(0x9d0)][_0x59fdc2(0x829)](0x1,0x9),_0x53cacc=_0xe13ad1[_0x59fdc2(0x591)]['clamp'](0x1,0x9),_0x1609de=_0xe13ad1[_0x59fdc2(0x2ae)]||0x1,_0x4da290=_0xe13ad1[_0x59fdc2(0x632)];$gameScreen[_0x59fdc2(0x5fb)](_0x3cce23),$gameScreen['startShake'](_0x5bd000,_0x53cacc,_0x1609de);if(_0x4da290){const _0x4c5676=$gameTemp['getLastPluginCommandInterpreter']();if(_0x4c5676)_0x4c5676[_0x59fdc2(0x38f)](_0x1609de);}}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],_0x161145(0x5c8),_0x132c9b=>{const _0xe76cb3=_0x161145;if($gameParty['inBattle']())return;VisuMZ[_0xe76cb3(0x767)](_0x132c9b,_0x132c9b);const _0x409da4=_0x132c9b['IDs'],_0x56d128=(_0x132c9b[_0xe76cb3(0x386)]||0x0)/0x64;for(const _0x511a5b of _0x409da4){if(_0xe76cb3(0x900)===_0xe76cb3(0x900)){const _0x42e639=Math[_0xe76cb3(0x2fd)]()<=_0x56d128;$gameSwitches[_0xe76cb3(0x19d)](_0x511a5b,_0x42e639);}else _0x378927+=_0xe76cb3(0x2f4);}}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],_0x161145(0x76d),_0x1e6812=>{const _0x3f32fe=_0x161145;if($gameParty['inBattle']())return;VisuMZ[_0x3f32fe(0x767)](_0x1e6812,_0x1e6812);const _0x4fbf95=Math[_0x3f32fe(0x2da)](_0x1e6812[_0x3f32fe(0x35f)],_0x1e6812[_0x3f32fe(0x279)]),_0x53c4fa=Math['max'](_0x1e6812[_0x3f32fe(0x35f)],_0x1e6812[_0x3f32fe(0x279)]),_0x49ed5b=(_0x1e6812[_0x3f32fe(0x386)]||0x0)/0x64;for(let _0x3eed7f=_0x4fbf95;_0x3eed7f<=_0x53c4fa;_0x3eed7f++){if('EvNoG'!==_0x3f32fe(0x687))_0x3f479a[_0x3f32fe(0x31e)](_0x5df4ee);else{const _0x17dfb9=Math['random']()<=_0x49ed5b;$gameSwitches[_0x3f32fe(0x19d)](_0x3eed7f,_0x17dfb9);}}}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],_0x161145(0x7de),_0x2a9060=>{const _0x5465ae=_0x161145;if($gameParty[_0x5465ae(0x38b)]())return;VisuMZ[_0x5465ae(0x767)](_0x2a9060,_0x2a9060);const _0x2559bd=_0x2a9060['IDs'];for(const _0x1f8f08 of _0x2559bd){if(_0x5465ae(0x416)===_0x5465ae(0x416)){const _0x5f2799=$gameSwitches['value'](_0x1f8f08);$gameSwitches['setValue'](_0x1f8f08,!_0x5f2799);}else{const _0x5e0385=_0x4c1e68[_0x709aca];if(!_0x5e0385)return'';let _0x43b677='';_0x43b677+=_0x5e0385[_0x5465ae(0x618)];for(const _0x757084 of _0x5e0385[_0x5465ae(0x1e7)]){for(const _0x50314e of _0x757084[_0x5465ae(0x775)]){[0x6c,0x198][_0x5465ae(0x219)](_0x50314e['code'])&&(_0x43b677+='\x0a',_0x43b677+=_0x50314e[_0x5465ae(0x400)][0x0]);}}return _0x43b677;}}}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],'SwitchToggleRange',_0x4ef10b=>{const _0x2bc919=_0x161145;if($gameParty[_0x2bc919(0x38b)]())return;VisuMZ['ConvertParams'](_0x4ef10b,_0x4ef10b);const _0x57853a=Math[_0x2bc919(0x2da)](_0x4ef10b['StartID'],_0x4ef10b[_0x2bc919(0x279)]),_0x4024ae=Math[_0x2bc919(0x32a)](_0x4ef10b[_0x2bc919(0x35f)],_0x4ef10b[_0x2bc919(0x279)]);for(let _0x2ce239=_0x57853a;_0x2ce239<=_0x4024ae;_0x2ce239++){const _0x2f4803=$gameSwitches[_0x2bc919(0x525)](_0x2ce239);$gameSwitches['setValue'](_0x2ce239,!_0x2f4803);}}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],'SystemSetFontSize',_0x16d35a=>{const _0x3d13cf=_0x161145;VisuMZ[_0x3d13cf(0x767)](_0x16d35a,_0x16d35a);const _0x185824=_0x16d35a[_0x3d13cf(0x57c)]||0x1;$gameSystem[_0x3d13cf(0x902)](_0x185824);}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],_0x161145(0x86c),_0x353906=>{const _0x2f151f=_0x161145;if($gameParty[_0x2f151f(0x38b)]())return;VisuMZ[_0x2f151f(0x767)](_0x353906,_0x353906);const _0x546b60=_0x353906[_0x2f151f(0x57c)];if(_0x546b60[_0x2f151f(0x8f9)](/Front/i))$gameSystem[_0x2f151f(0x568)](![]);else _0x546b60['match'](/Side/i)?$gameSystem[_0x2f151f(0x568)](!![]):_0x2f151f(0x5da)===_0x2f151f(0x5da)?$gameSystem[_0x2f151f(0x568)](!$gameSystem[_0x2f151f(0x831)]()):(_0x223908[_0x2f151f(0x9cf)][_0x2f151f(0x45f)][_0x2f151f(0x40b)](this),_0x3b36ea[_0x2f151f(0x15f)]()&&this[_0x2f151f(0x906)]());}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],_0x161145(0x4f6),_0x2bbae2=>{const _0x17efdc=_0x161145;if($gameParty[_0x17efdc(0x38b)]())return;VisuMZ['ConvertParams'](_0x2bbae2,_0x2bbae2);const _0x54ee78=[_0x17efdc(0x3bf),_0x17efdc(0x519),'me','se'];for(const _0x319f08 of _0x54ee78){if(_0x17efdc(0x6f4)!=='iWfvw')this[_0x17efdc(0x59f)]();else{const _0x2b0e2c=_0x2bbae2[_0x319f08],_0x210d80=_0x17efdc(0x1e1)[_0x17efdc(0x229)](_0x319f08);for(const _0x57c168 of _0x2b0e2c){AudioManager[_0x17efdc(0x2c8)](_0x210d80,_0x57c168);}}}}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],'SystemLoadImages',_0x493a44=>{const _0x2755bd=_0x161145;if($gameParty['inBattle']())return;VisuMZ[_0x2755bd(0x767)](_0x493a44,_0x493a44);const _0x2c5a71=['animations',_0x2755bd(0x910),_0x2755bd(0x37b),_0x2755bd(0x828),_0x2755bd(0x852),_0x2755bd(0x77f),'parallaxes',_0x2755bd(0x590),_0x2755bd(0x602),_0x2755bd(0x201),'system',_0x2755bd(0x673),'titles1',_0x2755bd(0x216)];for(const _0x338a4f of _0x2c5a71){if(_0x2755bd(0x749)!==_0x2755bd(0x749))_0x49f62b[_0x2755bd(0x9cf)][_0x2755bd(0x7a5)][_0x2755bd(0x678)][_0x2755bd(0x6d5)]&&(this[_0x2755bd(0x34f)]=![]);else{const _0x524ffc=_0x493a44[_0x338a4f],_0x1db6d2='img/%1/'[_0x2755bd(0x229)](_0x338a4f);for(const _0x3c2573 of _0x524ffc){ImageManager['loadBitmap'](_0x1db6d2,_0x3c2573);}}}}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],'SystemSetBattleSystem',_0x5c1549=>{const _0x409730=_0x161145;if($gameParty[_0x409730(0x38b)]())return;VisuMZ['ConvertParams'](_0x5c1549,_0x5c1549);const _0x1be881=_0x5c1549[_0x409730(0x57c)][_0x409730(0x7c3)]()['trim'](),_0xd6f4e=VisuMZ['CoreEngine'][_0x409730(0x96c)](_0x1be881);$gameSystem[_0x409730(0x871)](_0xd6f4e);}),VisuMZ[_0x161145(0x9cf)][_0x161145(0x96c)]=function(_0x5a9d37){const _0x3102c3=_0x161145;_0x5a9d37=_0x5a9d37||'DATABASE',_0x5a9d37=String(_0x5a9d37)['toUpperCase']()[_0x3102c3(0x753)]();switch(_0x5a9d37){case'DTB':return 0x0;case _0x3102c3(0x94e):Imported[_0x3102c3(0x337)]&&(ConfigManager[_0x3102c3(0x621)]=!![]);return 0x1;case _0x3102c3(0x25c):Imported[_0x3102c3(0x337)]&&(ConfigManager[_0x3102c3(0x621)]=![]);return 0x2;case _0x3102c3(0x16a):if(Imported[_0x3102c3(0x1de)]){if(_0x3102c3(0x8e6)==='mVyLI')return _0x3102c3(0x16a);else this[_0x3102c3(0x3c0)]&&this['_helpWindow']['setBackgroundType'](_0x33cf5b[_0x3102c3(0x466)]['HelpBgType']),this['_listWindow']&&this['_listWindow'][_0x3102c3(0x6ce)](_0x1e740c[_0x3102c3(0x466)]['ListBgType']);}break;case _0x3102c3(0x46c):if(Imported[_0x3102c3(0x309)]){if(_0x3102c3(0x5f3)!==_0x3102c3(0x5f3))_0x3b2ed2[_0x3102c3(0x557)](),this[_0x3102c3(0x228)]();else return _0x3102c3(0x46c);}break;case _0x3102c3(0x424):if(Imported[_0x3102c3(0x779)])return'xWwdS'==='xWwdS'?_0x3102c3(0x424):this[_0x3102c3(0x54f)](_0x1fda25,_0x3430c9);break;case _0x3102c3(0x434):if(Imported[_0x3102c3(0x9b9)])return _0x3102c3(0x434);break;case'OTB':if(Imported['VisuMZ_2_BattleSystemOTB'])return _0x3102c3(0x869);break;case _0x3102c3(0x55e):if(Imported['VisuMZ_2_BattleSystemETB'])return'FTUWC'!=='FTUWC'?_0x472b6c[_0x3102c3(0x705)](_0x3102c3(0x788)):_0x3102c3(0x55e);break;case'PTB':if(Imported['VisuMZ_2_BattleSystemPTB'])return _0x3102c3(0x427);break;}return $dataSystem['battleSystem'];},PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],_0x161145(0x318),_0x26a37a=>{const _0x4bc257=_0x161145;VisuMZ['ConvertParams'](_0x26a37a,_0x26a37a);const _0x3e51ec=_0x26a37a[_0x4bc257(0x57c)]||0x1;$gameSystem[_0x4bc257(0x8b6)](_0x3e51ec);}),PluginManager[_0x161145(0x975)](pluginData[_0x161145(0x618)],_0x161145(0x731),_0x1a905a=>{const _0xdd8bdc=_0x161145;VisuMZ[_0xdd8bdc(0x767)](_0x1a905a,_0x1a905a);const _0x359ea8=_0x1a905a['id']||0x1,_0x164bd6=_0x1a905a['operation'],_0x516734=_0x1a905a[_0xdd8bdc(0x692)]||0x0;let _0x3a74c4=$gameVariables['value'](_0x359ea8)||0x0;switch(_0x164bd6){case'=':_0x3a74c4=_0x516734;break;case'+':_0x3a74c4+=_0x516734;break;case'-':_0x3a74c4-=_0x516734;break;case'*':_0x3a74c4*=_0x516734;break;case'/':_0x3a74c4/=_0x516734;break;case'%':_0x3a74c4%=_0x516734;break;}_0x3a74c4=_0x3a74c4||0x0,$gameVariables[_0xdd8bdc(0x19d)](_0x359ea8,_0x3a74c4);}),PluginManager[_0x161145(0x975)](pluginData['name'],_0x161145(0x307),_0x943fc3=>{const _0x37f6c9=_0x161145;VisuMZ[_0x37f6c9(0x767)](_0x943fc3,_0x943fc3);const _0x763cda=_0x943fc3['id']()||0x1,_0x184610=_0x943fc3['operation'],_0x49880b=_0x943fc3[_0x37f6c9(0x692)]()||0x0;let _0x2f3a00=$gameVariables[_0x37f6c9(0x525)](_0x763cda)||0x0;switch(_0x184610){case'=':_0x2f3a00=_0x49880b;break;case'+':_0x2f3a00+=_0x49880b;break;case'-':_0x2f3a00-=_0x49880b;break;case'*':_0x2f3a00*=_0x49880b;break;case'/':_0x2f3a00/=_0x49880b;break;case'%':_0x2f3a00%=_0x49880b;break;}_0x2f3a00=_0x2f3a00||0x0,$gameVariables[_0x37f6c9(0x19d)](_0x763cda,_0x2f3a00);}),VisuMZ[_0x161145(0x9cf)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x161145(0x2d7)][_0x161145(0x761)]=function(){const _0x1ad249=_0x161145;VisuMZ[_0x1ad249(0x9cf)][_0x1ad249(0x8f1)][_0x1ad249(0x40b)](this),this[_0x1ad249(0x5d1)](),this[_0x1ad249(0x790)](),this[_0x1ad249(0x3ba)](),this[_0x1ad249(0x5be)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),this[_0x1ad249(0x1d1)](),VisuMZ['ParseAllNotetags']();},VisuMZ[_0x161145(0x9cf)]['RegExp']={},Scene_Boot['prototype'][_0x161145(0x5d1)]=function(){const _0xa854b8=_0x161145,_0x1ad73f=['MAXHP','MAXMP',_0xa854b8(0x888),_0xa854b8(0x35c),_0xa854b8(0x609),_0xa854b8(0x31f),_0xa854b8(0x6be),'LUK'],_0x263353=['HIT',_0xa854b8(0x995),'CRI',_0xa854b8(0x74b),_0xa854b8(0x6fa),_0xa854b8(0x1d0),'CNT','HRG',_0xa854b8(0x39e),_0xa854b8(0x6ff)],_0x155a87=[_0xa854b8(0x329),'GRD','REC',_0xa854b8(0x59c),_0xa854b8(0x3d3),_0xa854b8(0x20c),'PDR','MDR',_0xa854b8(0x256),_0xa854b8(0x37a)],_0x297baa=[_0x1ad73f,_0x263353,_0x155a87],_0xf521d=[_0xa854b8(0x47f),'Plus1','Plus2',_0xa854b8(0x8e9),_0xa854b8(0x972),'Rate1',_0xa854b8(0x206),'Flat',_0xa854b8(0x8d5),_0xa854b8(0x722)];for(const _0x245c0d of _0x297baa){let _0x1c0636='';if(_0x245c0d===_0x1ad73f)_0x1c0636=_0xa854b8(0x762);if(_0x245c0d===_0x263353)_0x1c0636=_0xa854b8(0x684);if(_0x245c0d===_0x155a87)_0x1c0636=_0xa854b8(0x944);for(const _0x3e449c of _0xf521d){let _0xa77de1=_0xa854b8(0x1ef)[_0xa854b8(0x229)](_0x1c0636,_0x3e449c);VisuMZ[_0xa854b8(0x9cf)]['RegExp'][_0xa77de1]=[],VisuMZ[_0xa854b8(0x9cf)][_0xa854b8(0x255)][_0xa77de1+'JS']=[];let _0x24704d='<%1\x20%2:[\x20]';if([_0xa854b8(0x47f),'Flat'][_0xa854b8(0x219)](_0x3e449c))_0x24704d+=_0xa854b8(0x654);else{if([_0xa854b8(0x94b),_0xa854b8(0x8d5)][_0xa854b8(0x219)](_0x3e449c))_0x24704d+=_0xa854b8(0x2f4);else{if([_0xa854b8(0x706),_0xa854b8(0x722)][_0xa854b8(0x219)](_0x3e449c))_0x24704d+=_0xa854b8(0x595);else{if(_0x3e449c==='Max'){if(_0xa854b8(0x7d9)!==_0xa854b8(0x261))_0x24704d+=_0xa854b8(0x378);else{let _0x5d7ba9=_0xa854b8(0x684)+_0x4bdebc+_0xa854b8(0x716);if(this[_0xa854b8(0x571)](_0x5d7ba9))return this[_0xa854b8(0x60f)][_0x5d7ba9];return this[_0xa854b8(0x60f)][_0x5d7ba9]=_0x1052dc['CoreEngine'][_0xa854b8(0x7a5)]['Param'][_0xa854b8(0x959)][_0xa854b8(0x40b)](this,_0x407f6f),this[_0xa854b8(0x60f)][_0x5d7ba9];}}else{if(_0x3e449c===_0xa854b8(0x7da))_0xa854b8(0x32e)!=='wTgzT'?_0x24704d+='(\x5cd+)([%％])>':_0x28d2dc[_0xa854b8(0x9cf)][_0xa854b8(0x668)]['call'](this);else{if(_0x3e449c==='Rate2'){if(_0xa854b8(0x57b)!==_0xa854b8(0x6ef))_0x24704d+=_0xa854b8(0x325);else{if(_0x3e9190[_0xa854b8(0x1ca)]())_0x552963[_0xa854b8(0x312)](_0x53bfd9);}}}}}}}for(const _0x40a806 of _0x245c0d){if('ALKNg'!==_0xa854b8(0x5ba)){let _0x4eb26c=_0x3e449c[_0xa854b8(0x98a)](/[\d+]/g,'')[_0xa854b8(0x7c3)]();const _0x549ed8=_0x24704d['format'](_0x40a806,_0x4eb26c);VisuMZ[_0xa854b8(0x9cf)][_0xa854b8(0x255)][_0xa77de1]['push'](new RegExp(_0x549ed8,'i'));const _0x2d0fde=_0xa854b8(0x956)['format'](_0x40a806,_0x4eb26c);VisuMZ[_0xa854b8(0x9cf)][_0xa854b8(0x255)][_0xa77de1+'JS'][_0xa854b8(0x31e)](new RegExp(_0x2d0fde,'i'));}else this[_0xa854b8(0x7fb)](_0xb20166),this[_0xa854b8(0x467)](_0x3b433b);}}}},Scene_Boot[_0x161145(0x2d7)]['process_VisuMZ_CoreEngine_Notetags']=function(){const _0xe15e97=_0x161145;if(VisuMZ[_0xe15e97(0x26f)])return;},Scene_Boot['prototype'][_0x161145(0x3ba)]=function(){const _0x30c048=_0x161145,_0xdbcc3a=VisuMZ[_0x30c048(0x9cf)][_0x30c048(0x7a5)];_0xdbcc3a['QoL']['OpenConsole']&&VisuMZ[_0x30c048(0x8ae)](!![]);_0xdbcc3a[_0x30c048(0x678)][_0x30c048(0x1ce)]&&(_0x30c048(0x6a4)!==_0x30c048(0x6a4)?_0x24f986+=_0x5daab3(_0xa6a228):(Input['keyMapper'][0x23]=_0x30c048(0x7ef),Input['keyMapper'][0x24]=_0x30c048(0x245)));if(_0xdbcc3a[_0x30c048(0x6a3)]){const _0x5b88d9=_0xdbcc3a[_0x30c048(0x6a3)];_0x5b88d9['KeySHIFT']=_0x5b88d9['KeySHIFT']||_0x30c048(0x5ab),_0x5b88d9['KeyTAB']=_0x5b88d9[_0x30c048(0x491)]||_0x30c048(0x398);}_0xdbcc3a['KeyboardInput'][_0x30c048(0x364)]&&(Input['keyMapper'][0x57]='up',Input['keyMapper'][0x41]=_0x30c048(0x6e8),Input[_0x30c048(0x36a)][0x53]=_0x30c048(0x1ae),Input[_0x30c048(0x36a)][0x44]='right',Input['keyMapper'][0x45]='pagedown');if(_0xdbcc3a['KeyboardInput'][_0x30c048(0x984)]){if('QACSW'!=='QACSW'){if(!_0x557969[_0x30c048(0x1ca)]())return;if(!_0x5ee3f7['isNwjs']())return;_0xf6bd53[_0x30c048(0x988)][_0x30c048(0x985)]=![],_0x185aa8[_0x30c048(0x9cf)][_0x30c048(0x99d)]();}else Input['keyMapper'][0x52]=_0x30c048(0x4c8);}_0xdbcc3a[_0x30c048(0x538)]['DisplayedParams']=_0xdbcc3a['Param'][_0x30c048(0x505)][_0x30c048(0x639)](_0x246eb6=>_0x246eb6['toUpperCase']()[_0x30c048(0x753)]()),_0xdbcc3a[_0x30c048(0x538)][_0x30c048(0x98c)]=_0xdbcc3a['Param'][_0x30c048(0x98c)][_0x30c048(0x639)](_0x179770=>_0x179770[_0x30c048(0x7c3)]()[_0x30c048(0x753)]());},Scene_Boot[_0x161145(0x2d7)][_0x161145(0x5be)]=function(){const _0x20bc0a=_0x161145;this[_0x20bc0a(0x59f)]();},Scene_Boot[_0x161145(0x2d7)][_0x161145(0x59f)]=function(){const _0x1bdef9=_0x161145,_0x11b7fe=VisuMZ[_0x1bdef9(0x9cf)][_0x1bdef9(0x7a5)][_0x1bdef9(0x241)];for(const _0x347c30 of _0x11b7fe){if('sKdim'===_0x1bdef9(0x246))for(_0x548e7d of _0x328fc0[_0x1bdef9(0x305)]()){_0x2b0c8d[_0x1bdef9(0x321)]();}else{const _0x164fa8=_0x347c30[_0x1bdef9(0x5bb)][_0x1bdef9(0x98a)](/[ ]/g,''),_0xb3770f=_0x347c30['CodeJS'];VisuMZ[_0x1bdef9(0x9cf)][_0x1bdef9(0x589)](_0x164fa8,_0xb3770f);}}},VisuMZ[_0x161145(0x9cf)][_0x161145(0x589)]=function(_0x12189f,_0x3dce0c){const _0x4f8cca=_0x161145;if(!!window[_0x12189f]){if($gameTemp[_0x4f8cca(0x1ca)]())console[_0x4f8cca(0x312)](_0x4f8cca(0x4c3)[_0x4f8cca(0x229)](_0x12189f));}const _0x2fb0f8=_0x4f8cca(0x61f)[_0x4f8cca(0x229)](_0x12189f,_0x3dce0c);window[_0x12189f]=new Function(_0x2fb0f8);},Scene_Boot[_0x161145(0x2d7)][_0x161145(0x7a4)]=function(){const _0x308afb=_0x161145,_0x504c1d=VisuMZ[_0x308afb(0x9cf)]['Settings']['CustomParam'];if(!_0x504c1d)return;for(const _0x85a68 of _0x504c1d){if(_0x308afb(0x91e)!==_0x308afb(0x91e))_0x46aff1[_0x308afb(0x621)]=![];else{if(!_0x85a68)continue;VisuMZ['CoreEngine'][_0x308afb(0x2fe)](_0x85a68);}}},VisuMZ[_0x161145(0x9cf)][_0x161145(0x738)]={},VisuMZ['CoreEngine'][_0x161145(0x463)]={},VisuMZ[_0x161145(0x9cf)][_0x161145(0x360)]={},VisuMZ[_0x161145(0x9cf)][_0x161145(0x84c)]={},VisuMZ['CoreEngine'][_0x161145(0x2fe)]=function(_0x5893e4){const _0x479eb9=_0x161145,_0x3755e4=_0x5893e4[_0x479eb9(0x4f5)],_0x8f00cf=_0x5893e4['ParamName'],_0x31b177=_0x5893e4[_0x479eb9(0x8a3)],_0x4d5d24=_0x5893e4['Type'],_0x22c30d=new Function(_0x5893e4[_0x479eb9(0x636)]);VisuMZ['CoreEngine']['CustomParamNames'][_0x3755e4[_0x479eb9(0x7c3)]()['trim']()]=_0x8f00cf,VisuMZ[_0x479eb9(0x9cf)][_0x479eb9(0x463)][_0x3755e4[_0x479eb9(0x7c3)]()[_0x479eb9(0x753)]()]=_0x31b177,VisuMZ['CoreEngine'][_0x479eb9(0x360)][_0x3755e4['toUpperCase']()['trim']()]=_0x4d5d24,VisuMZ[_0x479eb9(0x9cf)][_0x479eb9(0x84c)][_0x3755e4[_0x479eb9(0x7c3)]()['trim']()]=_0x3755e4,Object[_0x479eb9(0x5b5)](Game_BattlerBase['prototype'],_0x3755e4,{'get'(){const _0x55092e=_0x479eb9;if(_0x55092e(0x91a)!==_0x55092e(0x91a))_0x48b4c5['se'][_0x55092e(0x2c2)]=0x0;else{const _0x41f69d=_0x22c30d[_0x55092e(0x40b)](this);return _0x4d5d24==='integer'?Math['round'](_0x41f69d):_0x41f69d;}}});},VisuMZ[_0x161145(0x9cf)][_0x161145(0x350)]={},VisuMZ[_0x161145(0x9cf)][_0x161145(0x221)]={},Scene_Boot[_0x161145(0x2d7)]['process_VisuMZ_CoreEngine_ControllerButtons']=function(){const _0x5941bf=_0x161145,_0xb04938=VisuMZ[_0x5941bf(0x9cf)]['Settings'][_0x5941bf(0x350)];for(const _0x259e36 of _0xb04938){const _0x47808=(_0x259e36[_0x5941bf(0x43b)]||'')[_0x5941bf(0x726)]()[_0x5941bf(0x753)](),_0x21f214=(_0x259e36[_0x5941bf(0x4e2)]||'')[_0x5941bf(0x726)]()['trim']();VisuMZ[_0x5941bf(0x9cf)][_0x5941bf(0x350)][_0x47808]=_0x259e36,VisuMZ[_0x5941bf(0x9cf)][_0x5941bf(0x221)][_0x21f214]=_0x47808;}},VisuMZ[_0x161145(0x26f)]=function(){const _0x1ddf65=_0x161145;for(const _0x52efdd of $dataActors){if(_0x1ddf65(0x970)==='xmOXZ'){if(_0x52efdd)VisuMZ[_0x1ddf65(0x85e)](_0x52efdd);}else return _0x1d0ae3[_0x1ddf65(0x9cf)][_0x1ddf65(0x628)]['call'](this,_0x4e8bf4,_0x5e384b);}for(const _0x2209ad of $dataClasses){if(_0x1ddf65(0x58c)===_0x1ddf65(0x58c)){if(_0x2209ad)VisuMZ[_0x1ddf65(0x2bc)](_0x2209ad);}else{const _0x4bc670=this['rightArrowWidth']();this[_0x1ddf65(0x883)](_0xcea43e[_0x1ddf65(0x3db)]());const _0x2eb2f4=_0x3f9b41['CoreEngine'][_0x1ddf65(0x7a5)]['UI'][_0x1ddf65(0x3fe)];this[_0x1ddf65(0x4c4)](_0x2eb2f4,_0x4b6052,_0x36ac15,_0x4bc670,_0x1ddf65(0x4a7));}}for(const _0x5abf27 of $dataSkills){if(_0x1ddf65(0x55a)!=='DCCfT'){if(_0x5abf27)VisuMZ[_0x1ddf65(0x723)](_0x5abf27);}else this[_0x1ddf65(0x5a1)]['x']=this['_targetAnchor']['x'],this[_0x1ddf65(0x5a1)]['y']=this['_targetAnchor']['y'];}for(const _0xb4bbb0 of $dataItems){if(_0xb4bbb0)VisuMZ[_0x1ddf65(0x5c4)](_0xb4bbb0);}for(const _0x5bd8b8 of $dataWeapons){if(_0x5bd8b8)VisuMZ['ParseWeaponNotetags'](_0x5bd8b8);}for(const _0x45b085 of $dataArmors){if(_0x45b085)VisuMZ[_0x1ddf65(0x4b5)](_0x45b085);}for(const _0x456d0 of $dataEnemies){if(_0x1ddf65(0x6d2)!=='FoRKm')_0x2ab45c=_0x9edac4[_0x1ddf65(0x35a)](_0x181fad),_0x2a5932['se']&&(_0x4437d1['se']['volume']=0x0);else{if(_0x456d0)VisuMZ[_0x1ddf65(0x88b)](_0x456d0);}}for(const _0x360f1d of $dataStates){if(_0x360f1d)VisuMZ[_0x1ddf65(0x15a)](_0x360f1d);}for(const _0x1a27c7 of $dataTilesets){if(_0x1ddf65(0x7e2)===_0x1ddf65(0x951))return this['isSmartEventCollisionOn']()?this[_0x1ddf65(0x40c)](_0x43ba2a,_0x1717fb):_0x29456[_0x1ddf65(0x9cf)]['Game_Event_isCollidedWithEvents'][_0x1ddf65(0x40b)](this,_0x164569,_0x2f86bd);else{if(_0x1a27c7)VisuMZ[_0x1ddf65(0x73c)](_0x1a27c7);}}},VisuMZ[_0x161145(0x85e)]=function(_0x4dc6dc){},VisuMZ[_0x161145(0x2bc)]=function(_0xa644c7){},VisuMZ[_0x161145(0x723)]=function(_0x1e0695){},VisuMZ[_0x161145(0x5c4)]=function(_0x14b447){},VisuMZ[_0x161145(0x5b6)]=function(_0x70b84d){},VisuMZ[_0x161145(0x4b5)]=function(_0xe8804f){},VisuMZ[_0x161145(0x88b)]=function(_0xe402e0){},VisuMZ[_0x161145(0x15a)]=function(_0x33c309){},VisuMZ['ParseTilesetNotetags']=function(_0x1102fc){},VisuMZ[_0x161145(0x9cf)]['ParseActorNotetags']=VisuMZ[_0x161145(0x85e)],VisuMZ['ParseActorNotetags']=function(_0x4a6137){const _0x1ed3c=_0x161145;VisuMZ[_0x1ed3c(0x9cf)]['ParseActorNotetags']['call'](this,_0x4a6137);const _0x4fed98=_0x4a6137[_0x1ed3c(0x97f)];if(_0x4fed98[_0x1ed3c(0x8f9)](/<MAX LEVEL:[ ](\d+)>/i)){_0x4a6137['maxLevel']=Number(RegExp['$1']);if(_0x4a6137[_0x1ed3c(0x4ae)]===0x0)_0x4a6137[_0x1ed3c(0x4ae)]=Number[_0x1ed3c(0x151)];}if(_0x4fed98['match'](/<INITIAL LEVEL:[ ](\d+)>/i)){if(_0x1ed3c(0x95a)===_0x1ed3c(0x37c))return'';else _0x4a6137[_0x1ed3c(0x8d6)]=Math[_0x1ed3c(0x2da)](Number(RegExp['$1']),_0x4a6137[_0x1ed3c(0x4ae)]);}},VisuMZ[_0x161145(0x9cf)][_0x161145(0x2bc)]=VisuMZ[_0x161145(0x2bc)],VisuMZ[_0x161145(0x2bc)]=function(_0x42d807){const _0x1019d1=_0x161145;VisuMZ['CoreEngine'][_0x1019d1(0x2bc)][_0x1019d1(0x40b)](this,_0x42d807);if(_0x42d807[_0x1019d1(0x66e)])for(const _0x4394de of _0x42d807[_0x1019d1(0x66e)]){if(_0x1019d1(0x4f9)!==_0x1019d1(0x4f9))return!![];else{if(_0x4394de[_0x1019d1(0x97f)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)){if(_0x1019d1(0x2d0)===_0x1019d1(0x1bb)){if(_0x2a3f4c[_0x1019d1(0x671)][_0x1019d1(0x40b)](this)){const _0x397740=_0x3fc8fd[_0x1019d1(0x443)];let _0x20c0fa=_0x4c99f0['TextStr'];if(['',_0x1019d1(0x4c2)][_0x1019d1(0x219)](_0x20c0fa))_0x20c0fa=_0x22bfc3[_0x1019d1(0x528)]['call'](this);const _0x4e78b1=_0x306959[_0x1019d1(0x9df)]['call'](this),_0x25c161=_0x4af391['ExtJS'][_0x1019d1(0x40b)](this);this['addCommand'](_0x20c0fa,_0x397740,_0x4e78b1,_0x25c161),this[_0x1019d1(0x1cd)](_0x397740,_0x24cba5[_0x1019d1(0x2b3)]['bind'](this,_0x25c161));}}else _0x4394de[_0x1019d1(0x75f)]=Math[_0x1019d1(0x32a)](Number(RegExp['$1']),0x1);}}}},VisuMZ[_0x161145(0x9cf)]['ParseEnemyNotetags']=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x161145(0x88b)]=function(_0x409331){const _0xadb5f2=_0x161145;VisuMZ[_0xadb5f2(0x9cf)][_0xadb5f2(0x88b)][_0xadb5f2(0x40b)](this,_0x409331),_0x409331[_0xadb5f2(0x75f)]=0x1;const _0x5049f0=_0x409331['note'];if(_0x5049f0[_0xadb5f2(0x8f9)](/<LEVEL:[ ](\d+)>/i))_0x409331['level']=Number(RegExp['$1']);if(_0x5049f0[_0xadb5f2(0x8f9)](/<MAXHP:[ ](\d+)>/i))_0x409331[_0xadb5f2(0x9a7)][0x0]=Number(RegExp['$1']);if(_0x5049f0[_0xadb5f2(0x8f9)](/<MAXMP:[ ](\d+)>/i))_0x409331[_0xadb5f2(0x9a7)][0x1]=Number(RegExp['$1']);if(_0x5049f0['match'](/<ATK:[ ](\d+)>/i))_0x409331['params'][0x2]=Number(RegExp['$1']);if(_0x5049f0['match'](/<DEF:[ ](\d+)>/i))_0x409331[_0xadb5f2(0x9a7)][0x3]=Number(RegExp['$1']);if(_0x5049f0[_0xadb5f2(0x8f9)](/<MAT:[ ](\d+)>/i))_0x409331[_0xadb5f2(0x9a7)][0x4]=Number(RegExp['$1']);if(_0x5049f0[_0xadb5f2(0x8f9)](/<MDF:[ ](\d+)>/i))_0x409331[_0xadb5f2(0x9a7)][0x5]=Number(RegExp['$1']);if(_0x5049f0['match'](/<AGI:[ ](\d+)>/i))_0x409331[_0xadb5f2(0x9a7)][0x6]=Number(RegExp['$1']);if(_0x5049f0['match'](/<LUK:[ ](\d+)>/i))_0x409331['params'][0x7]=Number(RegExp['$1']);if(_0x5049f0[_0xadb5f2(0x8f9)](/<EXP:[ ](\d+)>/i))_0x409331[_0xadb5f2(0x464)]=Number(RegExp['$1']);if(_0x5049f0['match'](/<GOLD:[ ](\d+)>/i))_0x409331[_0xadb5f2(0x803)]=Number(RegExp['$1']);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x88f)]=Graphics[_0x161145(0x2d1)],Graphics[_0x161145(0x2d1)]=function(){const _0x20adb8=_0x161145;switch(VisuMZ['CoreEngine'][_0x20adb8(0x7a5)][_0x20adb8(0x678)][_0x20adb8(0x66a)]){case _0x20adb8(0x5cd):return!![];case _0x20adb8(0x355):return![];default:return VisuMZ['CoreEngine'][_0x20adb8(0x88f)][_0x20adb8(0x40b)](this);}},VisuMZ['CoreEngine'][_0x161145(0x85f)]=Graphics[_0x161145(0x24e)],Graphics[_0x161145(0x24e)]=function(_0x175c9c,_0xfd78e,_0x39f7fd=null){const _0x58354c=_0x161145;VisuMZ['CoreEngine'][_0x58354c(0x85f)][_0x58354c(0x40b)](this,_0x175c9c,_0xfd78e,_0x39f7fd),VisuMZ[_0x58354c(0x8ae)](![]);},VisuMZ[_0x161145(0x9cf)]['Graphics_centerElement']=Graphics[_0x161145(0x471)],Graphics[_0x161145(0x471)]=function(_0x1b8bc3){const _0x32d1f3=_0x161145;VisuMZ['CoreEngine'][_0x32d1f3(0x16d)][_0x32d1f3(0x40b)](this,_0x1b8bc3),this[_0x32d1f3(0x67d)](_0x1b8bc3);},Graphics[_0x161145(0x67d)]=function(_0x273485){const _0x1b2424=_0x161145;VisuMZ[_0x1b2424(0x9cf)][_0x1b2424(0x7a5)][_0x1b2424(0x678)][_0x1b2424(0x6c6)]&&(_0x273485[_0x1b2424(0x56f)][_0x1b2424(0x588)]=_0x1b2424(0x5ca));if(VisuMZ[_0x1b2424(0x9cf)][_0x1b2424(0x7a5)]['QoL'][_0x1b2424(0x3d6)]){if(_0x1b2424(0x5e8)!==_0x1b2424(0x5e8)){if(!this[_0x1b2424(0x85b)])return _0x2956c3;const _0x29aa4d=this[_0x1b2424(0x85b)][_0x1b2424(0x37d)],_0x313a2c=this[_0x1b2424(0x85b)]['wholeDuration'],_0x2cf7f0=this[_0x1b2424(0x345)]((_0x313a2c-_0x29aa4d)/_0x313a2c),_0x1ae6de=this[_0x1b2424(0x345)]((_0x313a2c-_0x29aa4d+0x1)/_0x313a2c),_0x2ebaad=(_0x158464-_0x5156c5*_0x2cf7f0)/(0x1-_0x2cf7f0);return _0x2ebaad+(_0x10462d-_0x2ebaad)*_0x1ae6de;}else _0x273485[_0x1b2424(0x56f)][_0x1b2424(0x297)]=_0x1b2424(0x967);}const _0x3e676f=Math['max'](0x0,Math['floor'](_0x273485[_0x1b2424(0x3ea)]*this[_0x1b2424(0x7a7)])),_0x5382a0=Math[_0x1b2424(0x32a)](0x0,Math[_0x1b2424(0x7f2)](_0x273485[_0x1b2424(0x46b)]*this[_0x1b2424(0x7a7)]));_0x273485[_0x1b2424(0x56f)][_0x1b2424(0x3ea)]=_0x3e676f+'px',_0x273485['style'][_0x1b2424(0x46b)]=_0x5382a0+'px';},VisuMZ['CoreEngine'][_0x161145(0x61a)]=Bitmap[_0x161145(0x2d7)][_0x161145(0x4fb)],Bitmap[_0x161145(0x2d7)][_0x161145(0x4fb)]=function(_0x74ed2b,_0x3fa99e){const _0x4e6acb=_0x161145;VisuMZ['CoreEngine'][_0x4e6acb(0x61a)][_0x4e6acb(0x40b)](this,_0x74ed2b,_0x3fa99e),this[_0x4e6acb(0x857)]=!(VisuMZ[_0x4e6acb(0x9cf)][_0x4e6acb(0x7a5)][_0x4e6acb(0x678)][_0x4e6acb(0x3d6)]??!![]);},Bitmap[_0x161145(0x2d7)]['markCoreEngineModified']=function(){const _0x46268d=_0x161145;this[_0x46268d(0x75c)]=!![];},VisuMZ[_0x161145(0x9cf)][_0x161145(0x640)]=Sprite[_0x161145(0x2d7)][_0x161145(0x1b7)],Sprite['prototype'][_0x161145(0x1b7)]=function(){const _0x5ba2bb=_0x161145;VisuMZ[_0x5ba2bb(0x9cf)][_0x5ba2bb(0x640)][_0x5ba2bb(0x40b)](this),this[_0x5ba2bb(0x3ad)]();},Sprite['prototype']['destroyCoreEngineMarkedBitmaps']=function(){const _0x50f2bc=_0x161145;if(!this['bitmap'])return;if(!this[_0x50f2bc(0x436)]['_customModified'])return;this['bitmap']['_baseTexture']&&!this['_bitmap'][_0x50f2bc(0x401)][_0x50f2bc(0x8a8)]&&this['bitmap']['destroy']();},VisuMZ['CoreEngine'][_0x161145(0x82b)]=Bitmap[_0x161145(0x2d7)][_0x161145(0x52a)],Bitmap[_0x161145(0x2d7)][_0x161145(0x52a)]=function(_0x3ada8c,_0x41394b){const _0x4f7d27=_0x161145;VisuMZ['CoreEngine']['Bitmap_resize'][_0x4f7d27(0x40b)](this,_0x3ada8c,_0x41394b),this[_0x4f7d27(0x2e9)]();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x5cf)]=Bitmap[_0x161145(0x2d7)][_0x161145(0x5d6)],Bitmap['prototype'][_0x161145(0x5d6)]=function(_0x305388,_0x26d9bd,_0x3b4eb1,_0x432336,_0x4f9a77,_0x53eb00,_0x3dcf30,_0x4da192,_0x41a188){const _0x5e9ecc=_0x161145;_0x26d9bd=Math[_0x5e9ecc(0x8c8)](_0x26d9bd),_0x3b4eb1=Math[_0x5e9ecc(0x8c8)](_0x3b4eb1),_0x432336=Math[_0x5e9ecc(0x8c8)](_0x432336),_0x4f9a77=Math[_0x5e9ecc(0x8c8)](_0x4f9a77),_0x53eb00=Math[_0x5e9ecc(0x8c8)](_0x53eb00),_0x3dcf30=Math['round'](_0x3dcf30),VisuMZ[_0x5e9ecc(0x9cf)][_0x5e9ecc(0x5cf)][_0x5e9ecc(0x40b)](this,_0x305388,_0x26d9bd,_0x3b4eb1,_0x432336,_0x4f9a77,_0x53eb00,_0x3dcf30,_0x4da192,_0x41a188),this[_0x5e9ecc(0x2e9)]();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x7d0)]=Bitmap['prototype'][_0x161145(0x442)],Bitmap[_0x161145(0x2d7)][_0x161145(0x442)]=function(_0x217b66,_0x54d46e,_0x6560ec,_0x330819){const _0x1365b1=_0x161145;VisuMZ[_0x1365b1(0x9cf)][_0x1365b1(0x7d0)][_0x1365b1(0x40b)](this,_0x217b66,_0x54d46e,_0x6560ec,_0x330819),this['markCoreEngineModified']();},VisuMZ[_0x161145(0x9cf)]['Bitmap_fillRect']=Bitmap[_0x161145(0x2d7)][_0x161145(0x7b7)],Bitmap['prototype'][_0x161145(0x7b7)]=function(_0x1a1873,_0x4a7a6e,_0x1cb625,_0x3096d2,_0x4db78a){const _0x1ad9b5=_0x161145;VisuMZ['CoreEngine']['Bitmap_fillRect'][_0x1ad9b5(0x40b)](this,_0x1a1873,_0x4a7a6e,_0x1cb625,_0x3096d2,_0x4db78a),this[_0x1ad9b5(0x2e9)]();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x7f9)]=Bitmap[_0x161145(0x2d7)]['strokeRect'],Bitmap['prototype'][_0x161145(0x9c4)]=function(_0x1bdb7e,_0x12dd47,_0x45720d,_0x5799c2,_0x851e91){const _0xf78afc=_0x161145;VisuMZ[_0xf78afc(0x9cf)][_0xf78afc(0x7f9)][_0xf78afc(0x40b)](this,_0x1bdb7e,_0x12dd47,_0x45720d,_0x5799c2,_0x851e91),this[_0xf78afc(0x2e9)]();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x6ac)]=Bitmap[_0x161145(0x2d7)][_0x161145(0x897)],Bitmap[_0x161145(0x2d7)][_0x161145(0x897)]=function(_0x9eda9,_0x1d15e9,_0xfcb50d,_0x16e743,_0x157064,_0xf57b4c,_0x2ce4b4){const _0xf362f0=_0x161145;VisuMZ[_0xf362f0(0x9cf)]['Bitmap_gradientFillRect']['call'](this,_0x9eda9,_0x1d15e9,_0xfcb50d,_0x16e743,_0x157064,_0xf57b4c,_0x2ce4b4),this[_0xf362f0(0x2e9)]();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x65f)]=Bitmap[_0x161145(0x2d7)]['drawCircle'],Bitmap[_0x161145(0x2d7)][_0x161145(0x989)]=function(_0x23c111,_0x15a5ac,_0x1df21b,_0x3cd225){const _0x2889ba=_0x161145;_0x23c111=Math[_0x2889ba(0x8c8)](_0x23c111),_0x15a5ac=Math['round'](_0x15a5ac),_0x1df21b=Math[_0x2889ba(0x8c8)](_0x1df21b),VisuMZ[_0x2889ba(0x9cf)][_0x2889ba(0x65f)][_0x2889ba(0x40b)](this,_0x23c111,_0x15a5ac,_0x1df21b,_0x3cd225),this[_0x2889ba(0x2e9)]();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x98b)]=Bitmap[_0x161145(0x2d7)][_0x161145(0x9b6)],Bitmap[_0x161145(0x2d7)]['measureTextWidth']=function(_0x43177b){const _0x3dd83c=_0x161145;return Math['ceil'](VisuMZ[_0x3dd83c(0x9cf)][_0x3dd83c(0x98b)][_0x3dd83c(0x40b)](this,_0x43177b));},VisuMZ[_0x161145(0x9cf)][_0x161145(0x2ec)]=Bitmap[_0x161145(0x2d7)][_0x161145(0x4c4)],Bitmap[_0x161145(0x2d7)][_0x161145(0x4c4)]=function(_0x3a6556,_0x2f7f05,_0x1dcf5b,_0x100af9,_0xe33227,_0x2c8c1a){const _0x47574c=_0x161145;_0x2f7f05=Math[_0x47574c(0x8c8)](_0x2f7f05),_0x1dcf5b=Math['round'](_0x1dcf5b),_0x100af9=Math[_0x47574c(0x8c8)](_0x100af9),_0xe33227=Math[_0x47574c(0x8c8)](_0xe33227),VisuMZ['CoreEngine']['Bitmap_drawText'][_0x47574c(0x40b)](this,_0x3a6556,_0x2f7f05,_0x1dcf5b,_0x100af9,_0xe33227,_0x2c8c1a),this[_0x47574c(0x2e9)]();},VisuMZ['CoreEngine'][_0x161145(0x7ce)]=Bitmap[_0x161145(0x2d7)][_0x161145(0x6b5)],Bitmap[_0x161145(0x2d7)][_0x161145(0x6b5)]=function(_0x3f7e6a,_0x519bbd,_0x528c75,_0x442e36){const _0x587895=_0x161145;if(VisuMZ[_0x587895(0x9cf)][_0x587895(0x7a5)][_0x587895(0x678)][_0x587895(0x41d)]){if(_0x587895(0x79c)===_0x587895(0x79c))this[_0x587895(0x6d7)](_0x3f7e6a,_0x519bbd,_0x528c75,_0x442e36);else{const _0x1e39ea=_0x26e8a3(_0x1641c6['$1']);_0x1e39ea!==_0xeea703[_0x4a552d][_0x587895(0x3f8)]&&(_0x53784b(_0x587895(0x66d)[_0x587895(0x229)](_0x630093,_0x1e39ea)),_0x2c1081['exit']());}}else VisuMZ['CoreEngine'][_0x587895(0x7ce)][_0x587895(0x40b)](this,_0x3f7e6a,_0x519bbd,_0x528c75,_0x442e36);},Bitmap[_0x161145(0x2d7)][_0x161145(0x6d7)]=function(_0x56d4c6,_0x4cd47d,_0x456402,_0x44339c){const _0x416de7=_0x161145,_0x39810b=this[_0x416de7(0x8dc)];_0x39810b[_0x416de7(0x843)]=this['outlineColor'],_0x39810b[_0x416de7(0x7c1)](_0x56d4c6,_0x4cd47d+0x2,_0x456402+0x2,_0x44339c);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x1c2)]=Input[_0x161145(0x557)],Input[_0x161145(0x557)]=function(){const _0x32d333=_0x161145;VisuMZ['CoreEngine'][_0x32d333(0x1c2)][_0x32d333(0x40b)](this),this[_0x32d333(0x50a)]=undefined,this[_0x32d333(0x99a)]=undefined,this[_0x32d333(0x20e)]=Input[_0x32d333(0x97b)];},VisuMZ[_0x161145(0x9cf)][_0x161145(0x84b)]=Input[_0x161145(0x361)],Input[_0x161145(0x361)]=function(){const _0x1c1e02=_0x161145;VisuMZ[_0x1c1e02(0x9cf)][_0x1c1e02(0x84b)][_0x1c1e02(0x40b)](this);if(this[_0x1c1e02(0x20e)])this[_0x1c1e02(0x20e)]--;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x847)]=Input[_0x161145(0x396)],Input[_0x161145(0x396)]=function(){const _0x18e3ad=_0x161145;if(this[_0x18e3ad(0x20e)])return;VisuMZ[_0x18e3ad(0x9cf)][_0x18e3ad(0x847)]['call'](this);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x526)]=Input['_setupEventHandlers'],Input['_setupEventHandlers']=function(){const _0x3d781e=_0x161145;VisuMZ[_0x3d781e(0x9cf)][_0x3d781e(0x526)][_0x3d781e(0x40b)](this),document[_0x3d781e(0x1f4)](_0x3d781e(0x6b2),this[_0x3d781e(0x432)][_0x3d781e(0x68f)](this));},VisuMZ[_0x161145(0x9cf)]['Input_onKeyDown']=Input[_0x161145(0x24f)],Input['_onKeyDown']=function(_0x5ee36e){const _0x54e22f=_0x161145;this[_0x54e22f(0x99a)]=_0x5ee36e[_0x54e22f(0x381)],VisuMZ['CoreEngine'][_0x54e22f(0x5f1)]['call'](this,_0x5ee36e),this['setLastGamepadUsed'](null);},Input[_0x161145(0x432)]=function(_0x3aa39a){const _0x20a2db=_0x161145;this[_0x20a2db(0x1c8)](_0x3aa39a);},Input[_0x161145(0x1c8)]=function(_0x139024){const _0x43fb5d=_0x161145;this[_0x43fb5d(0x99a)]=_0x139024[_0x43fb5d(0x381)];let _0x568d71=String[_0x43fb5d(0x3a5)](_0x139024[_0x43fb5d(0x244)]);if(this['_inputString']===undefined)_0x43fb5d(0x3f3)===_0x43fb5d(0x5b8)?(_0x4a3814[_0x43fb5d(0x937)]=_0x35ce7e,_0x3210cd[_0x43fb5d(0x2d2)](_0x1ccbdf)):this['_inputString']=_0x568d71;else{if('cmkAG'!=='tAitD')this[_0x43fb5d(0x50a)]+=_0x568d71;else{const _0x266049=_0x4cc596['y']+(this[_0x43fb5d(0x986)]()-_0xf8a61b['iconHeight'])/0x2;this['drawIcon'](_0x3725f6,_0x488e56['x'],_0x266049);const _0x14a91c=_0x25c422['iconWidth']+0x4;_0x44a1d2['x']+=_0x14a91c,_0x1ea528['width']-=_0x14a91c;}}},VisuMZ[_0x161145(0x9cf)][_0x161145(0x278)]=Input[_0x161145(0x4aa)],Input[_0x161145(0x4aa)]=function(_0x562e16){const _0x1bc32e=_0x161145;if(_0x562e16===0x8)return![];return VisuMZ[_0x1bc32e(0x9cf)][_0x1bc32e(0x278)][_0x1bc32e(0x40b)](this,_0x562e16);},Input[_0x161145(0x6aa)]=function(_0x2e88f0){const _0x29633a=_0x161145;if(_0x2e88f0['match'](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x2e88f0[_0x29633a(0x8f9)](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0x2e88f0[_0x29633a(0x8f9)](/escape/i))return this[_0x29633a(0x99a)]===0x1b;},Input[_0x161145(0x8de)]=function(){const _0x56c7f8=_0x161145;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x56c7f8(0x99a)]);},Input[_0x161145(0x173)]=function(){return[0x25,0x26,0x27,0x28]['contains'](this['_inputSpecialKeyCode']);},Input[_0x161145(0x7fd)]=function(){const _0x3a982b=_0x161145;if(navigator[_0x3a982b(0x411)]){if(_0x3a982b(0x483)===_0x3a982b(0x483)){const _0x580fbc=navigator[_0x3a982b(0x411)]();if(_0x580fbc)for(const _0x493a63 of _0x580fbc){if(_0x3a982b(0x56e)===_0x3a982b(0x56e)){if(_0x493a63&&_0x493a63[_0x3a982b(0x489)])return!![];}else return _0x5d3988['_scene'][_0x3a982b(0x721)]();}}else{const _0x45b249=_0x4426c9['boxWidth'],_0x37abcb=_0x979c94[_0x3a982b(0x2d7)][_0x3a982b(0x986)](),_0x23e9b1=0x0;let _0x1bb935=0x0;return this[_0x3a982b(0x957)]()===_0x3a982b(0x821)?_0x1bb935=0x0:_0x1bb935=_0x27df4f[_0x3a982b(0x710)]-_0x37abcb,new _0x278bf2(_0x23e9b1,_0x1bb935,_0x45b249,_0x37abcb);}}return![];},Input[_0x161145(0x2df)]=function(){const _0x458cff=_0x161145;if(navigator[_0x458cff(0x411)]){const _0x31a431=navigator[_0x458cff(0x411)]();if(_0x31a431)for(const _0x3f2bc9 of _0x31a431){if(_0x3f2bc9&&_0x3f2bc9[_0x458cff(0x489)]){if(this['isGamepadButtonPressed'](_0x3f2bc9))return!![];if(this[_0x458cff(0x50e)](_0x3f2bc9))return!![];}}}return![];},Input[_0x161145(0x5c1)]=function(_0x28e84c){const _0x2d175c=_0x161145,_0x1e0a10=_0x28e84c[_0x2d175c(0x79b)];for(let _0x45b3bf=0x0;_0x45b3bf<_0x1e0a10[_0x2d175c(0x300)];_0x45b3bf++){if(_0x2d175c(0x997)==='Iqars'){if(this['_CoreEngineSettings']===_0x468028)this[_0x2d175c(0x44b)]();if(this[_0x2d175c(0x96a)][_0x2d175c(0x16f)]===_0x3a0089)this[_0x2d175c(0x44b)]();return this[_0x2d175c(0x96a)][_0x2d175c(0x16f)];}else{if(_0x1e0a10[_0x45b3bf][_0x2d175c(0x45a)])return!![];}}return![];},Input['isGamepadAxisMoved']=function(_0x4312e7){const _0x34f23b=_0x4312e7['axes'],_0x45f2da=0.5;if(_0x34f23b[0x0]<-_0x45f2da)return!![];if(_0x34f23b[0x0]>_0x45f2da)return!![];if(_0x34f23b[0x1]<-_0x45f2da)return!![];if(_0x34f23b[0x1]>_0x45f2da)return!![];return![];},Input[_0x161145(0x85d)]=function(){const _0x317417=_0x161145;return this[_0x317417(0x764)]||null;},Input['setLastGamepadUsed']=function(_0x5cbd56){this['_lastGamepad']=_0x5cbd56;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x3d4)]=Input[_0x161145(0x285)],Input[_0x161145(0x285)]=function(_0x505d98){const _0x74459f=_0x161145;VisuMZ[_0x74459f(0x9cf)][_0x74459f(0x3d4)]['call'](this,_0x505d98),(this[_0x74459f(0x5c1)](_0x505d98)||this[_0x74459f(0x50e)](_0x505d98))&&this[_0x74459f(0x8f2)](_0x505d98);},Input[_0x161145(0x9cc)]=function(){const _0x5038d2=_0x161145;return this[_0x5038d2(0x764)]?this['_lastGamepad']['id']:_0x5038d2(0x93a);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x3d5)]=Tilemap[_0x161145(0x2d7)][_0x161145(0x1d4)],Tilemap[_0x161145(0x2d7)]['_addShadow']=function(_0x542fba,_0x48a618,_0xb54850,_0x2f9abf){const _0x204bf2=_0x161145;if($gameMap&&$gameMap[_0x204bf2(0x92a)]())return;VisuMZ[_0x204bf2(0x9cf)]['Tilemap_addShadow'][_0x204bf2(0x40b)](this,_0x542fba,_0x48a618,_0xb54850,_0x2f9abf);},Tilemap[_0x161145(0x169)][_0x161145(0x2d7)][_0x161145(0x4e1)]=function(){const _0x46fa2c=_0x161145;this[_0x46fa2c(0x98e)]();for(let _0x291572=0x0;_0x291572<Tilemap[_0x46fa2c(0x1d6)][_0x46fa2c(0x3a8)];_0x291572++){const _0x9cffe7=new PIXI[(_0x46fa2c(0x55f))]();_0x9cffe7[_0x46fa2c(0x940)](0x800,0x800),VisuMZ[_0x46fa2c(0x9cf)]['Settings'][_0x46fa2c(0x678)][_0x46fa2c(0x3d6)]&&(_0x9cffe7[_0x46fa2c(0x1eb)]=PIXI[_0x46fa2c(0x28b)][_0x46fa2c(0x470)]),this[_0x46fa2c(0x8c6)][_0x46fa2c(0x31e)](_0x9cffe7);}},WindowLayer[_0x161145(0x2d7)][_0x161145(0x703)]=function(){const _0x12316b=_0x161145;if(SceneManager&&SceneManager[_0x12316b(0x988)]){if(_0x12316b(0x238)===_0x12316b(0x8ed))_0x57ea37['CoreEngine'][_0x12316b(0x797)][_0x12316b(0x40b)](this),_0x49df01=this;else return SceneManager[_0x12316b(0x988)]['isWindowMaskingEnabled']();}else{if(_0x12316b(0x6a5)===_0x12316b(0x6a5))return!![];else{const _0x43614e=_0xca105f[_0x12316b(0x2d7)]['traitObjects'][_0x12316b(0x40b)](this);for(const _0x8f52a6 of this['equips']()){_0x8f52a6&&_0x43614e[_0x12316b(0x31e)](_0x8f52a6);}return _0x43614e[_0x12316b(0x31e)](this[_0x12316b(0x698)](),this[_0x12316b(0x34c)]()),_0x43614e;}}},VisuMZ['CoreEngine']['WindowLayer_render']=WindowLayer[_0x161145(0x2d7)]['render'],WindowLayer[_0x161145(0x2d7)][_0x161145(0x7d7)]=function render(_0x9211ed){const _0x5a9322=_0x161145;if(this[_0x5a9322(0x703)]())VisuMZ['CoreEngine']['WindowLayer_render'][_0x5a9322(0x40b)](this,_0x9211ed);else{if(_0x5a9322(0x91d)!=='JkrFt'){if(this[_0x5a9322(0x26d)]())return 0x1;const _0x55273e=this[_0x5a9322(0x152)]()-this[_0x5a9322(0x478)](),_0x444645=this[_0x5a9322(0x323)]()-this['currentLevelExp']();return(_0x444645/_0x55273e)[_0x5a9322(0x829)](0x0,0x1);}else this['renderNoMask'](_0x9211ed);}},WindowLayer[_0x161145(0x2d7)][_0x161145(0x234)]=function render(_0x1bda89){const _0x52395d=_0x161145;if(!this[_0x52395d(0x949)])return;const _0x37eec4=new PIXI[(_0x52395d(0x8d3))](),_0x2f4734=_0x1bda89['gl'],_0x102ffa=this[_0x52395d(0x8d2)]['clone']();_0x1bda89[_0x52395d(0x3a4)][_0x52395d(0x23a)](),_0x37eec4[_0x52395d(0x2b6)]=this[_0x52395d(0x2b6)],_0x1bda89[_0x52395d(0x4d1)]['flush'](),_0x2f4734['enable'](_0x2f4734[_0x52395d(0x9d4)]);while(_0x102ffa[_0x52395d(0x300)]>0x0){const _0x10f161=_0x102ffa[_0x52395d(0x33e)]();if(_0x10f161[_0x52395d(0x2fb)]&&_0x10f161[_0x52395d(0x949)]&&_0x10f161[_0x52395d(0x91b)]>0x0){if('GIPBU'===_0x52395d(0x6c1))_0x2f4734[_0x52395d(0x770)](_0x2f4734['EQUAL'],0x0,~0x0),_0x2f4734['stencilOp'](_0x2f4734[_0x52395d(0x36b)],_0x2f4734[_0x52395d(0x36b)],_0x2f4734[_0x52395d(0x36b)]),_0x10f161['render'](_0x1bda89),_0x1bda89[_0x52395d(0x4d1)][_0x52395d(0x14c)](),_0x37eec4[_0x52395d(0x557)](),_0x2f4734[_0x52395d(0x770)](_0x2f4734[_0x52395d(0x80a)],0x1,~0x0),_0x2f4734[_0x52395d(0x202)](_0x2f4734[_0x52395d(0x480)],_0x2f4734[_0x52395d(0x480)],_0x2f4734[_0x52395d(0x480)]),_0x2f4734[_0x52395d(0x7eb)](_0x2f4734['ZERO'],_0x2f4734[_0x52395d(0x805)]),_0x37eec4[_0x52395d(0x7d7)](_0x1bda89),_0x1bda89['batch'][_0x52395d(0x14c)](),_0x2f4734[_0x52395d(0x7eb)](_0x2f4734[_0x52395d(0x805)],_0x2f4734['ONE_MINUS_SRC_ALPHA']);else{if(this[_0x52395d(0x45e)]===_0x52395d(0x5e3))return;if(_0x2e533c[_0x52395d(0x8de)]())return;_0x1867a3[_0x52395d(0x9cf)][_0x52395d(0x9a2)]['call'](this),this[_0x52395d(0x89b)](_0x52395d(0x9b3));}}}_0x2f4734[_0x52395d(0x719)](_0x2f4734[_0x52395d(0x9d4)]),_0x2f4734[_0x52395d(0x557)](_0x2f4734['STENCIL_BUFFER_BIT']),_0x2f4734['clearStencil'](0x0),_0x1bda89['batch'][_0x52395d(0x14c)]();for(const _0x7b9d87 of this[_0x52395d(0x8d2)]){!_0x7b9d87['_isWindow']&&_0x7b9d87[_0x52395d(0x949)]&&_0x7b9d87['render'](_0x1bda89);}_0x1bda89[_0x52395d(0x4d1)][_0x52395d(0x14c)]();},DataManager['isKeyItem']=function(_0x14afc9){const _0x5589ef=_0x161145;return this['isItem'](_0x14afc9)&&_0x14afc9[_0x5589ef(0x2c0)]===0x2;},VisuMZ[_0x161145(0x9cf)]['DataManager_setupNewGame']=DataManager['setupNewGame'],DataManager['setupNewGame']=function(){const _0x25f3ba=_0x161145;VisuMZ[_0x25f3ba(0x9cf)][_0x25f3ba(0x83e)][_0x25f3ba(0x40b)](this),this[_0x25f3ba(0x608)](),this['reserveNewGameCommonEvent']();},DataManager[_0x161145(0x608)]=function(){const _0x4cd5ca=_0x161145;if($gameTemp[_0x4cd5ca(0x1ca)]()){const _0x1ca498=VisuMZ[_0x4cd5ca(0x9cf)][_0x4cd5ca(0x7a5)][_0x4cd5ca(0x678)][_0x4cd5ca(0x850)];if(_0x1ca498>0x0)$gameTemp['reserveCommonEvent'](_0x1ca498);}},DataManager[_0x161145(0x496)]=function(){const _0x289f68=_0x161145,_0x35828e=VisuMZ[_0x289f68(0x9cf)]['Settings'][_0x289f68(0x678)][_0x289f68(0x294)]||0x0;if(_0x35828e>0x0)$gameTemp[_0x289f68(0x76b)](_0x35828e);},DataManager[_0x161145(0x1b9)]=function(_0x52960b){const _0x35f283=_0x161145,_0x34df5d=$dataTroops[_0x52960b];if(!_0x34df5d)return'';let _0x105e6a='';_0x105e6a+=_0x34df5d[_0x35f283(0x618)];for(const _0x2add3a of _0x34df5d[_0x35f283(0x1e7)]){for(const _0x4a6e53 of _0x2add3a[_0x35f283(0x775)]){[0x6c,0x198]['includes'](_0x4a6e53[_0x35f283(0x516)])&&(_0x105e6a+='\x0a',_0x105e6a+=_0x4a6e53[_0x35f283(0x400)][0x0]);}}return _0x105e6a;};(VisuMZ[_0x161145(0x9cf)][_0x161145(0x7a5)]['QoL'][_0x161145(0x665)]??!![])&&($scene=null,VisuMZ[_0x161145(0x9cf)][_0x161145(0x6cf)]=Scene_Base[_0x161145(0x2d7)][_0x161145(0x1dd)],Scene_Base[_0x161145(0x2d7)]['create']=function(){const _0x30fcbe=_0x161145;VisuMZ[_0x30fcbe(0x9cf)]['Scene_Base_create']['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x161145(0x9cf)][_0x161145(0x4e6)]=Scene_Map[_0x161145(0x2d7)][_0x161145(0x77e)],Scene_Map[_0x161145(0x2d7)][_0x161145(0x77e)]=function(){const _0x23c09f=_0x161145;VisuMZ[_0x23c09f(0x9cf)][_0x23c09f(0x4e6)][_0x23c09f(0x40b)](this),$spriteset=this[_0x23c09f(0x514)];},VisuMZ[_0x161145(0x9cf)]['Scene_Battle_createSpriteset']=Scene_Battle[_0x161145(0x2d7)][_0x161145(0x77e)],Scene_Battle['prototype'][_0x161145(0x77e)]=function(){const _0x5dd7b0=_0x161145;VisuMZ[_0x5dd7b0(0x9cf)][_0x5dd7b0(0x2f2)]['call'](this),$spriteset=this[_0x5dd7b0(0x514)];},VisuMZ['CoreEngine'][_0x161145(0x593)]=Scene_Base[_0x161145(0x2d7)][_0x161145(0x341)],Scene_Base[_0x161145(0x2d7)][_0x161145(0x341)]=function(){const _0x55fba6=_0x161145;VisuMZ[_0x55fba6(0x9cf)][_0x55fba6(0x593)][_0x55fba6(0x40b)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x161145(0x9cf)][_0x161145(0x7f5)]=BattleManager[_0x161145(0x361)],BattleManager[_0x161145(0x361)]=function(_0x2f765f){const _0x4ae9ff=_0x161145;VisuMZ['CoreEngine'][_0x4ae9ff(0x7f5)][_0x4ae9ff(0x40b)](this,_0x2f765f),$subject=this['_subject'],$targets=this[_0x4ae9ff(0x5b3)],$target=this[_0x4ae9ff(0x777)]||this[_0x4ae9ff(0x5b3)][0x0];},$event=null,VisuMZ[_0x161145(0x9cf)][_0x161145(0x797)]=Game_Event[_0x161145(0x2d7)][_0x161145(0x26e)],Game_Event[_0x161145(0x2d7)]['start']=function(){const _0x5c900a=_0x161145;VisuMZ[_0x5c900a(0x9cf)][_0x5c900a(0x797)][_0x5c900a(0x40b)](this),$event=this;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x1a7)]=Scene_Map['prototype']['update'],Scene_Map[_0x161145(0x2d7)][_0x161145(0x361)]=function(){const _0x230b41=_0x161145;VisuMZ['CoreEngine'][_0x230b41(0x1a7)][_0x230b41(0x40b)](this),$gameMap[_0x230b41(0x64f)]();},Game_Map[_0x161145(0x2d7)][_0x161145(0x64f)]=function(){!this['isEventRunning']()&&$event!==null&&($event=null);},$commonEvent=function(_0x5be9e0){const _0x5d2032=_0x161145;if($gameTemp)$gameTemp[_0x5d2032(0x76b)](_0x5be9e0);},$onceParallel=function(_0x3a2473){const _0x4cf27c=_0x161145;if(SceneManager[_0x4cf27c(0x72b)]())$scene['playOnceParallelInterpreter'](_0x3a2473);else{if(SceneManager[_0x4cf27c(0x885)]()){if(_0x4cf27c(0x1e5)!==_0x4cf27c(0x1e5))return this[_0x4cf27c(0x764)]||null;else{if(Imported[_0x4cf27c(0x196)])_0x4cf27c(0x548)===_0x4cf27c(0x548)?$scene['playOnceParallelInterpreter'](_0x3a2473):(_0x1926d1[_0x4cf27c(0x9cf)][_0x4cf27c(0x9e0)][_0x4cf27c(0x40b)](this),this['initCoreEngineScreenShake']());else $gameTemp&&$gameTemp[_0x4cf27c(0x1ca)]()&&alert(_0x4cf27c(0x3b9));}}else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x4cf27c(0x7e1));}});function _0x34c4(_0x54ffd4,_0x341608){const _0x5c9d52=_0x5c9d();return _0x34c4=function(_0x34c489,_0x42632e){_0x34c489=_0x34c489-0x14c;let _0x62bdc6=_0x5c9d52[_0x34c489];return _0x62bdc6;},_0x34c4(_0x54ffd4,_0x341608);};StorageManager[_0x161145(0x820)]=function(_0x44cda6){return new Promise((_0x59029b,_0x5be4b9)=>{const _0x457509=_0x34c4;try{if(_0x457509(0x1b1)===_0x457509(0x1b1)){const _0x5b13aa=pako[_0x457509(0x33d)](_0x44cda6,{'to':_0x457509(0x4db),'level':0x1});if(_0x5b13aa[_0x457509(0x300)]>=0xc350){}_0x59029b(_0x5b13aa);}else{_0x3b6a09[_0x457509(0x3d2)]!==0x0?(_0x25ebe3[_0x457509(0x7ca)]=0x0,_0x27bb77[_0x457509(0x928)]=0x0,_0x2f10c1[_0x457509(0x4c6)]=0x0,_0x3b8eb4[_0x457509(0x3d2)]=0x0):(_0x43176e['bgmVolume']=0x64,_0xec10aa[_0x457509(0x928)]=0x64,_0x2010e0['meVolume']=0x64,_0x3be180[_0x457509(0x3d2)]=0x64);_0x493f3e[_0x457509(0x272)]();if(this[_0x457509(0x988)][_0x457509(0x4e8)]===_0x33cc65){if(this['_scene'][_0x457509(0x4ad)])this[_0x457509(0x988)]['_optionsWindow'][_0x457509(0x9cd)]();if(this[_0x457509(0x988)][_0x457509(0x4fe)])this[_0x457509(0x988)][_0x457509(0x4fe)][_0x457509(0x9cd)]();}}}catch(_0x3ef8f9){_0x5be4b9(_0x3ef8f9);}});},TextManager[_0x161145(0x518)]=['','','','CANCEL','','','HELP','','BACKSPACE',_0x161145(0x1a3),'','',_0x161145(0x512),_0x161145(0x4cf),_0x161145(0x5b0),'',_0x161145(0x637),_0x161145(0x90c),'ALT',_0x161145(0x351),_0x161145(0x242),_0x161145(0x973),_0x161145(0x4a2),_0x161145(0x6bd),_0x161145(0x562),_0x161145(0x576),'',_0x161145(0x29e),_0x161145(0x674),_0x161145(0x558),_0x161145(0x2f7),'MODECHANGE',_0x161145(0x739),_0x161145(0x62a),_0x161145(0x7a0),_0x161145(0x182),_0x161145(0x474),'LEFT','UP',_0x161145(0x875),_0x161145(0x947),_0x161145(0x73a),_0x161145(0x861),_0x161145(0x465),_0x161145(0x1fa),_0x161145(0x81c),_0x161145(0x6d8),'','0','1','2','3','4','5','6','7','8','9',_0x161145(0x718),_0x161145(0x30c),_0x161145(0x34a),_0x161145(0x7f8),_0x161145(0x4d2),_0x161145(0x62d),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0x161145(0x585),'',_0x161145(0x3a7),_0x161145(0x793),_0x161145(0x6a7),_0x161145(0x275),_0x161145(0x349),_0x161145(0x2ed),_0x161145(0x7dd),_0x161145(0x4f8),_0x161145(0x9e1),_0x161145(0x565),_0x161145(0x4fd),'MULTIPLY',_0x161145(0x540),_0x161145(0x96e),'SUBTRACT','DECIMAL','DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x161145(0x412),'F11',_0x161145(0x93b),_0x161145(0x8a5),'F14',_0x161145(0x2fa),_0x161145(0x6e4),_0x161145(0x5f6),_0x161145(0x620),_0x161145(0x373),_0x161145(0x69d),_0x161145(0x311),_0x161145(0x15d),_0x161145(0x8f7),_0x161145(0x801),'','','','','','','','','NUM_LOCK',_0x161145(0x2d8),_0x161145(0x166),'WIN_OEM_FJ_MASSHOU',_0x161145(0x5ff),_0x161145(0x87b),_0x161145(0x90d),'','','','','','','','','',_0x161145(0x9c7),_0x161145(0x781),_0x161145(0x52b),'HASH',_0x161145(0x6b3),_0x161145(0x582),_0x161145(0x31d),_0x161145(0x817),'OPEN_PAREN',_0x161145(0x439),_0x161145(0x6c3),_0x161145(0x791),_0x161145(0x87c),_0x161145(0x31a),_0x161145(0x33b),_0x161145(0x7d1),_0x161145(0x1fc),'','','','','VOLUME_MUTE',_0x161145(0x839),_0x161145(0x962),'','',_0x161145(0x30c),_0x161145(0x7f8),_0x161145(0x287),_0x161145(0x8ef),_0x161145(0x80b),_0x161145(0x73f),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x161145(0x6c7),_0x161145(0x709),_0x161145(0x6dd),_0x161145(0x78c),'',_0x161145(0x53a),'ALTGR','',_0x161145(0x44e),'WIN_ICO_00','','WIN_ICO_CLEAR','','',_0x161145(0x67b),_0x161145(0x7b6),'WIN_OEM_PA1','WIN_OEM_PA2',_0x161145(0x7b2),_0x161145(0x8ba),_0x161145(0x6eb),_0x161145(0x9d5),'WIN_OEM_FINISH',_0x161145(0x5ea),_0x161145(0x9b2),'WIN_OEM_ENLW','WIN_OEM_BACKTAB',_0x161145(0x28e),_0x161145(0x856),'EXSEL','EREOF',_0x161145(0x292),_0x161145(0x7e6),'','PA1',_0x161145(0x704),''],TextManager[_0x161145(0x626)]=VisuMZ['CoreEngine']['Settings'][_0x161145(0x6a3)][_0x161145(0x670)],TextManager['buttonAssistCancel']=VisuMZ[_0x161145(0x9cf)]['Settings'][_0x161145(0x6a3)][_0x161145(0x8c7)],TextManager[_0x161145(0x5a0)]=VisuMZ[_0x161145(0x9cf)]['Settings'][_0x161145(0x6a3)]['SwitchActorText'],VisuMZ[_0x161145(0x9cf)][_0x161145(0x445)]=TextManager[_0x161145(0x762)],TextManager[_0x161145(0x762)]=function(_0x6beabf){const _0xdcea79=_0x161145;return typeof _0x6beabf==='number'?VisuMZ[_0xdcea79(0x9cf)][_0xdcea79(0x445)]['call'](this,_0x6beabf):this['paramName'](_0x6beabf);},TextManager['paramName']=function(_0x1fa41d){const _0x2fb9d9=_0x161145;_0x1fa41d=String(_0x1fa41d||'')[_0x2fb9d9(0x7c3)]();const _0x48fbf9=VisuMZ[_0x2fb9d9(0x9cf)][_0x2fb9d9(0x7a5)]['Param'];if(_0x1fa41d==='MAXHP')return $dataSystem['terms'][_0x2fb9d9(0x9a7)][0x0];if(_0x1fa41d===_0x2fb9d9(0x4e3))return $dataSystem['terms'][_0x2fb9d9(0x9a7)][0x1];if(_0x1fa41d===_0x2fb9d9(0x888))return $dataSystem['terms'][_0x2fb9d9(0x9a7)][0x2];if(_0x1fa41d===_0x2fb9d9(0x35c))return $dataSystem[_0x2fb9d9(0x17a)][_0x2fb9d9(0x9a7)][0x3];if(_0x1fa41d===_0x2fb9d9(0x609))return $dataSystem[_0x2fb9d9(0x17a)]['params'][0x4];if(_0x1fa41d===_0x2fb9d9(0x31f))return $dataSystem['terms'][_0x2fb9d9(0x9a7)][0x5];if(_0x1fa41d===_0x2fb9d9(0x6be))return $dataSystem[_0x2fb9d9(0x17a)]['params'][0x6];if(_0x1fa41d===_0x2fb9d9(0x5db))return $dataSystem['terms'][_0x2fb9d9(0x9a7)][0x7];if(_0x1fa41d===_0x2fb9d9(0x6ae))return _0x48fbf9[_0x2fb9d9(0x8be)];if(_0x1fa41d===_0x2fb9d9(0x995))return _0x48fbf9['XParamVocab1'];if(_0x1fa41d===_0x2fb9d9(0x5c2))return _0x48fbf9[_0x2fb9d9(0x774)];if(_0x1fa41d===_0x2fb9d9(0x74b))return _0x48fbf9[_0x2fb9d9(0x498)];if(_0x1fa41d===_0x2fb9d9(0x6fa))return _0x48fbf9['XParamVocab4'];if(_0x1fa41d===_0x2fb9d9(0x1d0))return _0x48fbf9[_0x2fb9d9(0x74f)];if(_0x1fa41d==='CNT')return _0x48fbf9[_0x2fb9d9(0x49b)];if(_0x1fa41d===_0x2fb9d9(0x63b))return _0x48fbf9[_0x2fb9d9(0x301)];if(_0x1fa41d==='MRG')return _0x48fbf9[_0x2fb9d9(0x5b4)];if(_0x1fa41d===_0x2fb9d9(0x6ff))return _0x48fbf9[_0x2fb9d9(0x215)];if(_0x1fa41d===_0x2fb9d9(0x329))return _0x48fbf9['SParamVocab0'];if(_0x1fa41d==='GRD')return _0x48fbf9[_0x2fb9d9(0x64e)];if(_0x1fa41d===_0x2fb9d9(0x814))return _0x48fbf9['SParamVocab2'];if(_0x1fa41d===_0x2fb9d9(0x59c))return _0x48fbf9[_0x2fb9d9(0x4af)];if(_0x1fa41d===_0x2fb9d9(0x3d3))return _0x48fbf9[_0x2fb9d9(0x440)];if(_0x1fa41d===_0x2fb9d9(0x20c))return _0x48fbf9[_0x2fb9d9(0x979)];if(_0x1fa41d===_0x2fb9d9(0x72d))return _0x48fbf9['SParamVocab6'];if(_0x1fa41d==='MDR')return _0x48fbf9['SParamVocab7'];if(_0x1fa41d===_0x2fb9d9(0x256))return _0x48fbf9[_0x2fb9d9(0x7d3)];if(_0x1fa41d===_0x2fb9d9(0x37a))return _0x48fbf9[_0x2fb9d9(0x541)];if(VisuMZ[_0x2fb9d9(0x9cf)][_0x2fb9d9(0x738)][_0x1fa41d]){if(_0x2fb9d9(0x96f)===_0x2fb9d9(0x47a))_0x47f0c1[_0x2fb9d9(0x36a)][0x57]='up',_0x3fa636[_0x2fb9d9(0x36a)][0x41]=_0x2fb9d9(0x6e8),_0x3e3882[_0x2fb9d9(0x36a)][0x53]=_0x2fb9d9(0x1ae),_0x1b1c1a[_0x2fb9d9(0x36a)][0x44]=_0x2fb9d9(0x870),_0x2f6e00[_0x2fb9d9(0x36a)][0x45]=_0x2fb9d9(0x21d);else return VisuMZ[_0x2fb9d9(0x9cf)]['CustomParamNames'][_0x1fa41d];}return'';},TextManager['getInputButtonString']=function(_0x3d7820){const _0x3a6c73=_0x161145,_0x22bf18=Input[_0x3a6c73(0x9cc)]();if(_0x22bf18===_0x3a6c73(0x93a))return _0x3a6c73(0x3f7)!==_0x3a6c73(0x3f7)?![]:this[_0x3a6c73(0x923)](_0x3d7820);else{if('EtieH'===_0x3a6c73(0x1df))return this[_0x3a6c73(0x54f)](_0x22bf18,_0x3d7820);else{_0x5645d9[_0x3a6c73(0x9cf)]['ParseEnemyNotetags'][_0x3a6c73(0x40b)](this,_0x29fc15),_0x43f762[_0x3a6c73(0x75f)]=0x1;const _0x40b61a=_0x2dabcc[_0x3a6c73(0x97f)];if(_0x40b61a[_0x3a6c73(0x8f9)](/<LEVEL:[ ](\d+)>/i))_0x448874['level']=_0x25afc8(_0x95d891['$1']);if(_0x40b61a['match'](/<MAXHP:[ ](\d+)>/i))_0x216fa9[_0x3a6c73(0x9a7)][0x0]=_0x34acf9(_0x2b609c['$1']);if(_0x40b61a[_0x3a6c73(0x8f9)](/<MAXMP:[ ](\d+)>/i))_0x83dda[_0x3a6c73(0x9a7)][0x1]=_0x7a9c04(_0x5e93db['$1']);if(_0x40b61a[_0x3a6c73(0x8f9)](/<ATK:[ ](\d+)>/i))_0x1d6740['params'][0x2]=_0x5cfb66(_0x941d7d['$1']);if(_0x40b61a[_0x3a6c73(0x8f9)](/<DEF:[ ](\d+)>/i))_0x45fe7d[_0x3a6c73(0x9a7)][0x3]=_0x57675e(_0x21bfbc['$1']);if(_0x40b61a[_0x3a6c73(0x8f9)](/<MAT:[ ](\d+)>/i))_0x15a801[_0x3a6c73(0x9a7)][0x4]=_0x29ef97(_0x52a07f['$1']);if(_0x40b61a[_0x3a6c73(0x8f9)](/<MDF:[ ](\d+)>/i))_0x949b35[_0x3a6c73(0x9a7)][0x5]=_0x78e14a(_0x3e4b68['$1']);if(_0x40b61a['match'](/<AGI:[ ](\d+)>/i))_0x5aa9b1['params'][0x6]=_0x3b2488(_0x4e3780['$1']);if(_0x40b61a[_0x3a6c73(0x8f9)](/<LUK:[ ](\d+)>/i))_0x138c78['params'][0x7]=_0x9eb28a(_0x3f1a10['$1']);if(_0x40b61a[_0x3a6c73(0x8f9)](/<EXP:[ ](\d+)>/i))_0x167916['exp']=_0x3facfb(_0x244457['$1']);if(_0x40b61a[_0x3a6c73(0x8f9)](/<GOLD:[ ](\d+)>/i))_0x2cdeb8['gold']=_0x579792(_0x9e50f1['$1']);}}},TextManager['getKeyboardInputButtonString']=function(_0x24338b){const _0x9d9bc8=_0x161145;if(_0x24338b===_0x9d9bc8(0x788))_0x24338b=_0x9d9bc8(0x1b8);if(_0x24338b==='menu')_0x24338b=_0x9d9bc8(0x1b8);let _0x1096d3=[];for(let _0x2fbdc6 in Input[_0x9d9bc8(0x36a)]){if(_0x9d9bc8(0x48d)!==_0x9d9bc8(0x163)){_0x2fbdc6=Number(_0x2fbdc6);if(_0x2fbdc6>=0x60&&_0x2fbdc6<=0x69)continue;if([0x12,0x20][_0x9d9bc8(0x219)](_0x2fbdc6))continue;if(_0x24338b===Input[_0x9d9bc8(0x36a)][_0x2fbdc6]){if('jwwgL'==='jwwgL')_0x1096d3[_0x9d9bc8(0x31e)](_0x2fbdc6);else{var _0x45bb9f=_0x487cb8(_0x13e1e7['$1']);try{_0x368c8b+=_0x48ffdb(_0x45bb9f);}catch(_0x5a1ca2){if(_0x511d06['isPlaytest']())_0xdfca2e[_0x9d9bc8(0x312)](_0x5a1ca2);}}}}else this[_0x9d9bc8(0x220)]=0x0;}for(let _0x449dcf=0x0;_0x449dcf<_0x1096d3[_0x9d9bc8(0x300)];_0x449dcf++){'nKjCH'===_0x9d9bc8(0x50f)?_0x1c345d[_0x9d9bc8(0x661)]():_0x1096d3[_0x449dcf]=TextManager[_0x9d9bc8(0x518)][_0x1096d3[_0x449dcf]];}return this[_0x9d9bc8(0x171)](_0x1096d3);},TextManager['makeInputButtonString']=function(_0x644c8a){const _0x28e5d6=_0x161145,_0x56cc37=VisuMZ[_0x28e5d6(0x9cf)][_0x28e5d6(0x7a5)]['ButtonAssist'],_0x224e80=_0x56cc37[_0x28e5d6(0x41e)],_0x1ae5cd=_0x644c8a[_0x28e5d6(0x8a7)](),_0x35d2c7=_0x28e5d6(0x4b4)[_0x28e5d6(0x229)](_0x1ae5cd);return _0x56cc37[_0x35d2c7]?_0x56cc37[_0x35d2c7]:_0x224e80[_0x28e5d6(0x229)](_0x1ae5cd);},TextManager[_0x161145(0x73e)]=function(_0x3a45e1,_0x21edb5){const _0x2d9ee1=_0x161145,_0x3f5030=VisuMZ[_0x2d9ee1(0x9cf)][_0x2d9ee1(0x7a5)]['ButtonAssist'],_0x3be97e=_0x3f5030['MultiKeyFmt'],_0x27f1b6=this[_0x2d9ee1(0x705)](_0x3a45e1),_0x31f74e=this[_0x2d9ee1(0x705)](_0x21edb5);return _0x3be97e['format'](_0x27f1b6,_0x31f74e);},TextManager[_0x161145(0x54f)]=function(_0x5b8e3f,_0x44dce6){const _0x138cef=_0x161145,_0x3e0f06=_0x5b8e3f[_0x138cef(0x726)]()['trim'](),_0x5434a5=VisuMZ['CoreEngine'][_0x138cef(0x350)][_0x3e0f06];if(!_0x5434a5)return this[_0x138cef(0x903)](_0x5b8e3f,_0x44dce6);return _0x5434a5[_0x44dce6]||this[_0x138cef(0x923)](_0x5b8e3f,_0x44dce6);},TextManager[_0x161145(0x903)]=function(_0x26fc0f,_0x4a737d){const _0x5ebe07=_0x161145,_0x244663=_0x26fc0f['toLowerCase']()['trim']();for(const _0x1071fb in VisuMZ[_0x5ebe07(0x9cf)][_0x5ebe07(0x221)]){if(_0x5ebe07(0x288)!==_0x5ebe07(0x288))this[_0x5ebe07(0x992)]=0x2;else{if(_0x244663['includes'](_0x1071fb)){const _0x2b80eb=VisuMZ[_0x5ebe07(0x9cf)][_0x5ebe07(0x221)][_0x1071fb],_0x4dede7=VisuMZ[_0x5ebe07(0x9cf)]['ControllerButtons'][_0x2b80eb];return _0x4dede7[_0x4a737d]||this[_0x5ebe07(0x923)](_0x4a737d);}}}return this[_0x5ebe07(0x923)](_0x4a737d);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x164)]=ColorManager[_0x161145(0x3f5)],ColorManager[_0x161145(0x3f5)]=function(){const _0x1159f4=_0x161145;VisuMZ[_0x1159f4(0x9cf)]['ColorManager_loadWindowskin'][_0x1159f4(0x40b)](this),this['_colorCache']=this['_colorCache']||{};},ColorManager['getColorDataFromPluginParameters']=function(_0x241ef2,_0x2a2a69){const _0xf2b3ad=_0x161145;return _0x2a2a69=String(_0x2a2a69),this[_0xf2b3ad(0x449)]=this[_0xf2b3ad(0x449)]||{},_0x2a2a69[_0xf2b3ad(0x8f9)](/#(.*)/i)?this[_0xf2b3ad(0x449)][_0x241ef2]=_0xf2b3ad(0x1b6)[_0xf2b3ad(0x229)](String(RegExp['$1'])):this['_colorCache'][_0x241ef2]=this[_0xf2b3ad(0x874)](Number(_0x2a2a69)),this[_0xf2b3ad(0x449)][_0x241ef2];},ColorManager[_0x161145(0x75b)]=function(_0xcea5f1){const _0x2a142c=_0x161145;return _0xcea5f1=String(_0xcea5f1),_0xcea5f1[_0x2a142c(0x8f9)](/#(.*)/i)?_0x2a142c(0x1b6)[_0x2a142c(0x229)](String(RegExp['$1'])):_0x2a142c(0x175)!==_0x2a142c(0x43e)?this[_0x2a142c(0x874)](Number(_0xcea5f1)):(_0x5773ee=_0xb18a49(_0x251325),this[_0x2a142c(0x449)]=this['_colorCache']||{},_0x2ae0a4[_0x2a142c(0x8f9)](/#(.*)/i)?this[_0x2a142c(0x449)][_0x4f21e7]=_0x2a142c(0x1b6)[_0x2a142c(0x229)](_0x21cc4e(_0x1b42a1['$1'])):this[_0x2a142c(0x449)][_0x526dbd]=this['textColor'](_0x3d0f79(_0x2dd730)),this['_colorCache'][_0x26e7a9]);},ColorManager[_0x161145(0x83c)]=function(){const _0x428549=_0x161145;this[_0x428549(0x449)]={};},ColorManager['normalColor']=function(){const _0x552be2=_0x161145,_0x2e54fc=_0x552be2(0x458);this['_colorCache']=this[_0x552be2(0x449)]||{};if(this[_0x552be2(0x449)][_0x2e54fc])return this['_colorCache'][_0x2e54fc];const _0x2d7b60=VisuMZ['CoreEngine'][_0x552be2(0x7a5)][_0x552be2(0x9ab)][_0x552be2(0x3b1)];return this[_0x552be2(0x968)](_0x2e54fc,_0x2d7b60);},ColorManager[_0x161145(0x3db)]=function(){const _0x27e59a=_0x161145,_0x149c56=_0x27e59a(0x755);this[_0x27e59a(0x449)]=this[_0x27e59a(0x449)]||{};if(this[_0x27e59a(0x449)][_0x149c56])return this[_0x27e59a(0x449)][_0x149c56];const _0xf36838=VisuMZ[_0x27e59a(0x9cf)][_0x27e59a(0x7a5)][_0x27e59a(0x9ab)][_0x27e59a(0x6db)];return this[_0x27e59a(0x968)](_0x149c56,_0xf36838);},ColorManager[_0x161145(0x61d)]=function(){const _0x22787e=_0x161145,_0x23b78a=_0x22787e(0x273);this['_colorCache']=this['_colorCache']||{};if(this[_0x22787e(0x449)][_0x23b78a])return this[_0x22787e(0x449)][_0x23b78a];const _0x39dc6f=VisuMZ[_0x22787e(0x9cf)][_0x22787e(0x7a5)][_0x22787e(0x9ab)][_0x22787e(0x61b)];return this['getColorDataFromPluginParameters'](_0x23b78a,_0x39dc6f);},ColorManager['deathColor']=function(){const _0x5bffee=_0x161145,_0x1907be=_0x5bffee(0x3c9);this[_0x5bffee(0x449)]=this[_0x5bffee(0x449)]||{};if(this[_0x5bffee(0x449)][_0x1907be])return this['_colorCache'][_0x1907be];const _0xeabcf3=VisuMZ['CoreEngine'][_0x5bffee(0x7a5)][_0x5bffee(0x9ab)]['ColorDeath'];return this[_0x5bffee(0x968)](_0x1907be,_0xeabcf3);},ColorManager[_0x161145(0x3da)]=function(){const _0x41405d=_0x161145,_0x546849='_stored_gaugeBackColor';this[_0x41405d(0x449)]=this[_0x41405d(0x449)]||{};if(this[_0x41405d(0x449)][_0x546849])return this['_colorCache'][_0x546849];const _0x4637a8=VisuMZ[_0x41405d(0x9cf)][_0x41405d(0x7a5)][_0x41405d(0x9ab)][_0x41405d(0x8ee)];return this[_0x41405d(0x968)](_0x546849,_0x4637a8);},ColorManager[_0x161145(0x4d5)]=function(){const _0x5b5e9f=_0x161145,_0x5d4867=_0x5b5e9f(0x388);this['_colorCache']=this[_0x5b5e9f(0x449)]||{};if(this[_0x5b5e9f(0x449)][_0x5d4867])return this[_0x5b5e9f(0x449)][_0x5d4867];const _0x3f7109=VisuMZ['CoreEngine']['Settings'][_0x5b5e9f(0x9ab)][_0x5b5e9f(0x405)];return this[_0x5b5e9f(0x968)](_0x5d4867,_0x3f7109);},ColorManager['hpGaugeColor2']=function(){const _0x29be35=_0x161145,_0x28eb14='_stored_hpGaugeColor2';this[_0x29be35(0x449)]=this[_0x29be35(0x449)]||{};if(this['_colorCache'][_0x28eb14])return this[_0x29be35(0x449)][_0x28eb14];const _0x889af4=VisuMZ[_0x29be35(0x9cf)][_0x29be35(0x7a5)][_0x29be35(0x9ab)][_0x29be35(0x695)];return this[_0x29be35(0x968)](_0x28eb14,_0x889af4);},ColorManager[_0x161145(0x24a)]=function(){const _0x47532f=_0x161145,_0x20c982='_stored_mpGaugeColor1';this[_0x47532f(0x449)]=this['_colorCache']||{};if(this[_0x47532f(0x449)][_0x20c982])return this[_0x47532f(0x449)][_0x20c982];const _0x5d393e=VisuMZ[_0x47532f(0x9cf)]['Settings'][_0x47532f(0x9ab)]['ColorMPGauge1'];return this[_0x47532f(0x968)](_0x20c982,_0x5d393e);},ColorManager[_0x161145(0x2f3)]=function(){const _0x2f0420=_0x161145,_0x5cfa1f=_0x2f0420(0x653);this[_0x2f0420(0x449)]=this[_0x2f0420(0x449)]||{};if(this[_0x2f0420(0x449)][_0x5cfa1f])return this[_0x2f0420(0x449)][_0x5cfa1f];const _0x42bacb=VisuMZ[_0x2f0420(0x9cf)][_0x2f0420(0x7a5)][_0x2f0420(0x9ab)]['ColorMPGauge2'];return this[_0x2f0420(0x968)](_0x5cfa1f,_0x42bacb);},ColorManager['mpCostColor']=function(){const _0x5dafe9=_0x161145,_0x4d8ad2=_0x5dafe9(0x2f5);this['_colorCache']=this[_0x5dafe9(0x449)]||{};if(this[_0x5dafe9(0x449)][_0x4d8ad2])return this['_colorCache'][_0x4d8ad2];const _0x369496=VisuMZ[_0x5dafe9(0x9cf)][_0x5dafe9(0x7a5)][_0x5dafe9(0x9ab)][_0x5dafe9(0x277)];return this[_0x5dafe9(0x968)](_0x4d8ad2,_0x369496);},ColorManager[_0x161145(0x8a2)]=function(){const _0x88af=_0x161145,_0x7c22f=_0x88af(0x289);this['_colorCache']=this[_0x88af(0x449)]||{};if(this[_0x88af(0x449)][_0x7c22f])return this[_0x88af(0x449)][_0x7c22f];const _0x63bd04=VisuMZ[_0x88af(0x9cf)]['Settings']['Color'][_0x88af(0x867)];return this[_0x88af(0x968)](_0x7c22f,_0x63bd04);},ColorManager['powerDownColor']=function(){const _0x55f113=_0x161145,_0xdd3f3e='_stored_powerDownColor';this[_0x55f113(0x449)]=this['_colorCache']||{};if(this['_colorCache'][_0xdd3f3e])return this[_0x55f113(0x449)][_0xdd3f3e];const _0x3bdfb2=VisuMZ[_0x55f113(0x9cf)][_0x55f113(0x7a5)][_0x55f113(0x9ab)][_0x55f113(0x3e7)];return this['getColorDataFromPluginParameters'](_0xdd3f3e,_0x3bdfb2);},ColorManager[_0x161145(0x446)]=function(){const _0x5eaa27=_0x161145,_0x30ad6f=_0x5eaa27(0x1a5);this['_colorCache']=this['_colorCache']||{};if(this[_0x5eaa27(0x449)][_0x30ad6f])return this['_colorCache'][_0x30ad6f];const _0x363daf=VisuMZ[_0x5eaa27(0x9cf)][_0x5eaa27(0x7a5)][_0x5eaa27(0x9ab)][_0x5eaa27(0x91c)];return this[_0x5eaa27(0x968)](_0x30ad6f,_0x363daf);},ColorManager[_0x161145(0x22c)]=function(){const _0x143225=_0x161145,_0xad57aa='_stored_ctGaugeColor2';this['_colorCache']=this[_0x143225(0x449)]||{};if(this[_0x143225(0x449)][_0xad57aa])return this[_0x143225(0x449)][_0xad57aa];const _0x5f4a6f=VisuMZ[_0x143225(0x9cf)][_0x143225(0x7a5)][_0x143225(0x9ab)][_0x143225(0x60a)];return this['getColorDataFromPluginParameters'](_0xad57aa,_0x5f4a6f);},ColorManager[_0x161145(0x2a7)]=function(){const _0x57a53a=_0x161145,_0x39372b=_0x57a53a(0x2c3);this[_0x57a53a(0x449)]=this['_colorCache']||{};if(this[_0x57a53a(0x449)][_0x39372b])return this[_0x57a53a(0x449)][_0x39372b];const _0x7dff07=VisuMZ[_0x57a53a(0x9cf)]['Settings']['Color'][_0x57a53a(0x425)];return this[_0x57a53a(0x968)](_0x39372b,_0x7dff07);},ColorManager[_0x161145(0x728)]=function(){const _0xb237a=_0x161145,_0x3417f1=_0xb237a(0x239);this['_colorCache']=this[_0xb237a(0x449)]||{};if(this[_0xb237a(0x449)][_0x3417f1])return this['_colorCache'][_0x3417f1];const _0x46434d=VisuMZ['CoreEngine'][_0xb237a(0x7a5)][_0xb237a(0x9ab)][_0xb237a(0x68e)];return this[_0xb237a(0x968)](_0x3417f1,_0x46434d);},ColorManager['tpCostColor']=function(){const _0x53e123=_0x161145,_0x4a9150=_0x53e123(0x2f0);this[_0x53e123(0x449)]=this[_0x53e123(0x449)]||{};if(this['_colorCache'][_0x4a9150])return this['_colorCache'][_0x4a9150];const _0x1c339c=VisuMZ[_0x53e123(0x9cf)][_0x53e123(0x7a5)][_0x53e123(0x9ab)][_0x53e123(0x5e7)];return this['getColorDataFromPluginParameters'](_0x4a9150,_0x1c339c);},ColorManager[_0x161145(0x1ab)]=function(){const _0x597fd7=_0x161145,_0x4da90b=_0x597fd7(0x521);this[_0x597fd7(0x449)]=this[_0x597fd7(0x449)]||{};if(this['_colorCache'][_0x4da90b])return this[_0x597fd7(0x449)][_0x4da90b];const _0x3d2620=VisuMZ[_0x597fd7(0x9cf)][_0x597fd7(0x7a5)]['Color'][_0x597fd7(0x5e7)];return this[_0x597fd7(0x968)](_0x4da90b,_0x3d2620);},ColorManager[_0x161145(0x2cd)]=function(){const _0x57b261=_0x161145,_0x300a45=_0x57b261(0x64b);this[_0x57b261(0x449)]=this[_0x57b261(0x449)]||{};if(this[_0x57b261(0x449)][_0x300a45])return this[_0x57b261(0x449)][_0x300a45];const _0x2496ad=VisuMZ[_0x57b261(0x9cf)][_0x57b261(0x7a5)][_0x57b261(0x9ab)][_0x57b261(0x974)];return this[_0x57b261(0x968)](_0x300a45,_0x2496ad);},ColorManager[_0x161145(0x2bf)]=function(){const _0x55a2b2=_0x161145,_0x273132=_0x55a2b2(0x1bc);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x273132])return this[_0x55a2b2(0x449)][_0x273132];const _0x442d84=VisuMZ[_0x55a2b2(0x9cf)][_0x55a2b2(0x7a5)]['Color'][_0x55a2b2(0x260)];return this[_0x55a2b2(0x968)](_0x273132,_0x442d84);},ColorManager[_0x161145(0x299)]=function(){const _0x354d11=_0x161145,_0x450473='_stored_maxLvGaugeColor1';this['_colorCache']=this[_0x354d11(0x449)]||{};if(this['_colorCache'][_0x450473])return this[_0x354d11(0x449)][_0x450473];const _0x2502e1=VisuMZ[_0x354d11(0x9cf)]['Settings'][_0x354d11(0x9ab)]['ColorMaxLvGauge1'];return this[_0x354d11(0x968)](_0x450473,_0x2502e1);},ColorManager[_0x161145(0x5b9)]=function(){const _0x43079a=_0x161145,_0x1e82ce=_0x43079a(0x441);this[_0x43079a(0x449)]=this[_0x43079a(0x449)]||{};if(this['_colorCache'][_0x1e82ce])return this['_colorCache'][_0x1e82ce];const _0x1d6a12=VisuMZ[_0x43079a(0x9cf)]['Settings'][_0x43079a(0x9ab)]['ColorMaxLvGauge2'];return this[_0x43079a(0x968)](_0x1e82ce,_0x1d6a12);},ColorManager[_0x161145(0x62f)]=function(_0x3de487){const _0x5949eb=_0x161145;return VisuMZ[_0x5949eb(0x9cf)]['Settings'][_0x5949eb(0x9ab)][_0x5949eb(0x21c)][_0x5949eb(0x40b)](this,_0x3de487);},ColorManager[_0x161145(0x336)]=function(_0x17ac39){const _0x2d2b20=_0x161145;return VisuMZ[_0x2d2b20(0x9cf)][_0x2d2b20(0x7a5)]['Color'][_0x2d2b20(0x19e)][_0x2d2b20(0x40b)](this,_0x17ac39);},ColorManager[_0x161145(0x934)]=function(_0x4a82bb){const _0x1f80be=_0x161145;return VisuMZ['CoreEngine']['Settings'][_0x1f80be(0x9ab)]['ActorTPColor']['call'](this,_0x4a82bb);},ColorManager[_0x161145(0x763)]=function(_0x4e71a9){const _0x15f5b8=_0x161145;return VisuMZ[_0x15f5b8(0x9cf)]['Settings'][_0x15f5b8(0x9ab)][_0x15f5b8(0x8a4)][_0x15f5b8(0x40b)](this,_0x4e71a9);},ColorManager[_0x161145(0x20b)]=function(_0x4dca37){const _0x2caa83=_0x161145;return VisuMZ['CoreEngine'][_0x2caa83(0x7a5)][_0x2caa83(0x9ab)][_0x2caa83(0x42d)][_0x2caa83(0x40b)](this,_0x4dca37);},ColorManager[_0x161145(0x702)]=function(){const _0x22c2c8=_0x161145;return VisuMZ['CoreEngine']['Settings'][_0x22c2c8(0x9ab)][_0x22c2c8(0x7a3)];},ColorManager['outlineColorDmg']=function(){const _0x4e1d56=_0x161145;return VisuMZ[_0x4e1d56(0x9cf)]['Settings'][_0x4e1d56(0x9ab)][_0x4e1d56(0x5a4)]||'rgba(0,\x200,\x200,\x200.7)';},ColorManager[_0x161145(0x2b5)]=function(){const _0x41b59d=_0x161145;return VisuMZ[_0x41b59d(0x9cf)]['Settings']['Color'][_0x41b59d(0x2e6)]||_0x41b59d(0x339);},ColorManager[_0x161145(0x3df)]=function(){const _0x185c62=_0x161145;return VisuMZ[_0x185c62(0x9cf)][_0x185c62(0x7a5)]['Color'][_0x185c62(0x933)];},ColorManager[_0x161145(0x385)]=function(){const _0x40d2cd=_0x161145;return VisuMZ[_0x40d2cd(0x9cf)][_0x40d2cd(0x7a5)][_0x40d2cd(0x9ab)][_0x40d2cd(0x55b)];},ColorManager[_0x161145(0x29a)]=function(){const _0x3ea83e=_0x161145;return VisuMZ[_0x3ea83e(0x9cf)][_0x3ea83e(0x7a5)][_0x3ea83e(0x9ab)][_0x3ea83e(0x614)];},ColorManager[_0x161145(0x96b)]=function(){const _0x1314c0=_0x161145;return VisuMZ['CoreEngine'][_0x1314c0(0x7a5)]['Color'][_0x1314c0(0x550)];},SceneManager[_0x161145(0x886)]=[],SceneManager['isSceneBattle']=function(){const _0x58fa8a=_0x161145;return this[_0x58fa8a(0x988)]&&this[_0x58fa8a(0x988)][_0x58fa8a(0x4e8)]===Scene_Battle;},SceneManager[_0x161145(0x72b)]=function(){const _0x2c4fef=_0x161145;return this[_0x2c4fef(0x988)]&&this[_0x2c4fef(0x988)][_0x2c4fef(0x4e8)]===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){const _0x2097c9=_0x161145;return this[_0x2097c9(0x988)]&&this[_0x2097c9(0x988)]instanceof Scene_Map;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x7d8)]=SceneManager['initialize'],SceneManager[_0x161145(0x4fb)]=function(){const _0x24c916=_0x161145;VisuMZ[_0x24c916(0x9cf)][_0x24c916(0x7d8)][_0x24c916(0x40b)](this),this[_0x24c916(0x468)]();},VisuMZ[_0x161145(0x9cf)]['SceneManager_onKeyDown']=SceneManager[_0x161145(0x6a6)],SceneManager['onKeyDown']=function(_0x3c55c6){const _0x13781d=_0x161145;if($gameTemp)this['onKeyDownKeysF6F7'](_0x3c55c6);VisuMZ[_0x13781d(0x9cf)]['SceneManager_onKeyDown'][_0x13781d(0x40b)](this,_0x3c55c6);},SceneManager[_0x161145(0x3fb)]=function(_0x35dac6){const _0x3473a6=_0x161145;if(!_0x35dac6['ctrlKey']&&!_0x35dac6[_0x3473a6(0x71a)])switch(_0x35dac6[_0x3473a6(0x381)]){case 0x54:this[_0x3473a6(0x601)]();break;case 0x75:this['playTestF6']();break;case 0x76:if(Input[_0x3473a6(0x203)](_0x3473a6(0x33e))||Input['isPressed'](_0x3473a6(0x473)))return;this[_0x3473a6(0x8a6)]();break;}},SceneManager[_0x161145(0x9e3)]=function(){const _0x13840c=_0x161145;if($gameTemp['isPlaytest']()&&VisuMZ[_0x13840c(0x9cf)][_0x13840c(0x7a5)][_0x13840c(0x678)]['F6key']){if(_0x13840c(0x98f)===_0x13840c(0x276))_0x57a275['VisuMZ_2_BattleSystemCTB']&&(this['_forcedBattleSys']=_0x13840c(0x16a));else{if(ConfigManager['seVolume']!==0x0){if('TzhRv'==='lGuDD'){_0x38aed8[_0x13840c(0x9cf)][_0x13840c(0x998)][_0x13840c(0x40b)](this);if(_0x4359eb[_0x13840c(0x8bf)]>=_0x13840c(0x53f)){if(typeof _0x484142===_0x13840c(0x7e9))_0x402a5a[_0x13840c(0x835)][_0x13840c(0x64d)]();}}else ConfigManager[_0x13840c(0x7ca)]=0x0,ConfigManager[_0x13840c(0x928)]=0x0,ConfigManager[_0x13840c(0x4c6)]=0x0,ConfigManager['seVolume']=0x0;}else ConfigManager[_0x13840c(0x7ca)]=0x64,ConfigManager[_0x13840c(0x928)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager['seVolume']=0x64;ConfigManager['save']();if(this[_0x13840c(0x988)][_0x13840c(0x4e8)]===Scene_Options){if(_0x13840c(0x981)!==_0x13840c(0x37f)){if(this[_0x13840c(0x988)][_0x13840c(0x4ad)])this[_0x13840c(0x988)][_0x13840c(0x4ad)][_0x13840c(0x9cd)]();if(this[_0x13840c(0x988)]['_listWindow'])this[_0x13840c(0x988)][_0x13840c(0x4fe)][_0x13840c(0x9cd)]();}else _0x2d02f2['CoreEngine']['Scene_Map_createSpriteset']['call'](this),_0x26b83a=this[_0x13840c(0x514)];}}}},SceneManager[_0x161145(0x8a6)]=function(){const _0x5ea2ac=_0x161145;$gameTemp[_0x5ea2ac(0x1ca)]()&&VisuMZ['CoreEngine'][_0x5ea2ac(0x7a5)][_0x5ea2ac(0x678)][_0x5ea2ac(0x9ac)]&&(_0x5ea2ac(0x41b)===_0x5ea2ac(0x26b)?(_0x35d0b2[_0x5ea2ac(0x9cf)][_0x5ea2ac(0x7f5)][_0x5ea2ac(0x40b)](this,_0x42635c),_0x3cb534=this[_0x5ea2ac(0x1fb)],_0x3e1c94=this[_0x5ea2ac(0x5b3)],_0x368568=this[_0x5ea2ac(0x777)]||this[_0x5ea2ac(0x5b3)][0x0]):$gameTemp[_0x5ea2ac(0x45b)]=!$gameTemp[_0x5ea2ac(0x45b)]);},SceneManager['playTestCtrlT']=function(){const _0x29d31f=_0x161145;if(!$gameTemp['isPlaytest']())return;if(!SceneManager[_0x29d31f(0x885)]())return;for(const _0x40335d of $gameParty[_0x29d31f(0x305)]()){if(!_0x40335d)continue;_0x40335d[_0x29d31f(0x9de)](_0x40335d[_0x29d31f(0x27d)]());}},SceneManager[_0x161145(0x468)]=function(){const _0x16b7b1=_0x161145;this[_0x16b7b1(0x2dc)]=![],this[_0x16b7b1(0x16b)]=!VisuMZ[_0x16b7b1(0x9cf)][_0x16b7b1(0x7a5)]['UI']['ShowButtons'];},SceneManager['setSideButtonLayout']=function(_0x930154){const _0x41dfa6=_0x161145;VisuMZ[_0x41dfa6(0x9cf)][_0x41dfa6(0x7a5)]['UI'][_0x41dfa6(0x927)]&&(this['_sideButtonLayout']=_0x930154);},SceneManager[_0x161145(0x15f)]=function(){const _0x430825=_0x161145;return this[_0x430825(0x2dc)];},SceneManager[_0x161145(0x936)]=function(){const _0x1bd850=_0x161145;return this[_0x1bd850(0x16b)];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x1da6fb=_0x161145;return this[_0x1da6fb(0x936)]()||this['isSideButtonLayout']();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x750)]=SceneManager['isGameActive'],SceneManager[_0x161145(0x4f1)]=function(){const _0x4196a3=_0x161145;if(VisuMZ[_0x4196a3(0x9cf)][_0x4196a3(0x7a5)][_0x4196a3(0x678)]['RequireFocus'])return VisuMZ[_0x4196a3(0x9cf)][_0x4196a3(0x750)][_0x4196a3(0x40b)](this);else{if(_0x4196a3(0x40a)===_0x4196a3(0x8af))_0x5099ad=!_0x5ab175;else return!![];}},SceneManager[_0x161145(0x771)]=function(_0x56c6b1){const _0x3219a0=_0x161145;if(_0x56c6b1 instanceof Error){if(_0x3219a0(0x6a0)!==_0x3219a0(0x6a0)){if(this[_0x3219a0(0x45e)]===_0x3219a0(0x5e3))return;if(_0x4f305a[_0x3219a0(0x8de)]())return;_0x5bdff2[_0x3219a0(0x9cf)][_0x3219a0(0x3c7)][_0x3219a0(0x40b)](this),this['switchModes']('default');}else this['catchNormalError'](_0x56c6b1);}else _0x56c6b1 instanceof Array&&_0x56c6b1[0x0]===_0x3219a0(0x938)?this[_0x3219a0(0x23d)](_0x56c6b1):this[_0x3219a0(0x6b6)](_0x56c6b1);this[_0x3219a0(0x208)]();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x415)]=BattleManager[_0x161145(0x1ed)],BattleManager[_0x161145(0x1ed)]=function(){const _0x22708b=_0x161145;if(VisuMZ[_0x22708b(0x9cf)][_0x22708b(0x7a5)]['QoL'][_0x22708b(0x25e)])_0x22708b(0x648)===_0x22708b(0x648)?this['processAlwaysEscape']():this[_0x22708b(0x469)][_0x22708b(0x324)]>=0x18&&(this[_0x22708b(0x469)][_0x22708b(0x324)]-=0x6);else return _0x22708b(0x1da)!==_0x22708b(0x899)?VisuMZ[_0x22708b(0x9cf)][_0x22708b(0x415)]['call'](this):_0x4ffdbc[_0x22708b(0x9cf)][_0x22708b(0x7a5)][_0x22708b(0x538)][_0x22708b(0x505)]['length'];},BattleManager['processAlwaysEscape']=function(){const _0x2be57c=_0x161145;return $gameParty[_0x2be57c(0x890)](),SoundManager[_0x2be57c(0x766)](),this[_0x2be57c(0x2f1)](),!![];},BattleManager[_0x161145(0x30e)]=function(){const _0x4bbbbf=_0x161145;return $gameSystem[_0x4bbbbf(0x97c)]()>=0x1;},BattleManager[_0x161145(0x172)]=function(){const _0x55dbb2=_0x161145;return $gameSystem[_0x55dbb2(0x97c)]()===0x1;},VisuMZ['CoreEngine']['Game_Temp_initialize']=Game_Temp['prototype'][_0x161145(0x4fb)],Game_Temp[_0x161145(0x2d7)][_0x161145(0x4fb)]=function(){const _0x28d68a=_0x161145;VisuMZ[_0x28d68a(0x9cf)][_0x28d68a(0x407)]['call'](this),this[_0x28d68a(0x1dc)](),this['createFauxAnimationQueue'](),this[_0x28d68a(0x78e)]();},Game_Temp[_0x161145(0x2d7)][_0x161145(0x1dc)]=function(){const _0xa12c=_0x161145;if(VisuMZ[_0xa12c(0x9cf)][_0xa12c(0x7a5)][_0xa12c(0x678)][_0xa12c(0x6d5)]){if('fGzHC'!==_0xa12c(0x4b8)){let _0x792d55=0x0;return _0x261126[_0xa12c(0x8ca)]()?_0x792d55=this[_0xa12c(0x87f)]():_0x792d55=_0x1c1542[_0xa12c(0x9cf)]['Scene_MenuBase_helpAreaTop'][_0xa12c(0x40b)](this),_0x792d55;}else this[_0xa12c(0x34f)]=![];}},Game_Temp[_0x161145(0x2d7)][_0x161145(0x530)]=function(_0x73c23d){const _0x372d0b=_0x161145;this[_0x372d0b(0x2f8)]=_0x73c23d;},Game_Temp['prototype'][_0x161145(0x9ca)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x161145(0x2d7)][_0x161145(0x94f)]=function(){const _0x407731=_0x161145;this[_0x407731(0x7f0)]=undefined,this[_0x407731(0x992)]=undefined;},Game_Temp[_0x161145(0x2d7)][_0x161145(0x16e)]=function(_0x1ab487){const _0x36a4b6=_0x161145;$gameMap&&$dataMap&&$dataMap[_0x36a4b6(0x97f)]&&(_0x36a4b6(0x611)!=='Ofnmq'?this[_0x36a4b6(0x8db)]($dataMap[_0x36a4b6(0x97f)]):(this['x']=_0x3354c2['width'],this['y']=_0x4d12dc[_0x36a4b6(0x46b)],this[_0x36a4b6(0x949)]=![],this['setupButtonImage']()));const _0x30fa7a=$dataTroops[_0x1ab487];if(_0x30fa7a){if(_0x36a4b6(0x332)===_0x36a4b6(0x332)){let _0x113ffa=DataManager['createTroopNote'](_0x30fa7a['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x113ffa);}else{if(_0x387892['inBattle']())return;_0x34bd90[_0x36a4b6(0x767)](_0x5874b9,_0x7a07);const _0x43ddb5=_0x19e31c[_0x36a4b6(0x2da)](_0x1cab2a[_0x36a4b6(0x35f)],_0xc1d167[_0x36a4b6(0x279)]),_0x486225=_0x14ffcb[_0x36a4b6(0x32a)](_0x137bee[_0x36a4b6(0x35f)],_0x430863[_0x36a4b6(0x279)]);for(let _0x4aca2e=_0x43ddb5;_0x4aca2e<=_0x486225;_0x4aca2e++){const _0x5c5ac6=_0x28c5c2[_0x36a4b6(0x525)](_0x4aca2e);_0x586a41[_0x36a4b6(0x19d)](_0x4aca2e,!_0x5c5ac6);}}}},Game_Temp[_0x161145(0x2d7)][_0x161145(0x8db)]=function(_0x18e8bd){const _0x5f950=_0x161145;if(!_0x18e8bd)return;if(_0x18e8bd[_0x5f950(0x8f9)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i)){if(_0x5f950(0x961)===_0x5f950(0x3aa))return _0x3524da[_0x5f950(0x9cf)][_0x5f950(0x7a5)][_0x5f950(0x9ab)][_0x5f950(0x7a3)];else this[_0x5f950(0x7f0)]='FV';}else{if(_0x18e8bd[_0x5f950(0x8f9)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i)){if(_0x5f950(0x7ff)!==_0x5f950(0x7ff))return _0x42828d[_0x5f950(0x9cf)]['Settings'][_0x5f950(0x678)]['DigitGroupingDamageSprites'];else this[_0x5f950(0x7f0)]='SV';}else{if(_0x18e8bd[_0x5f950(0x8f9)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2c0a58=String(RegExp['$1']);if(_0x2c0a58[_0x5f950(0x8f9)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x5f950(0x7f0)]='FV';else _0x2c0a58['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}}}if(_0x18e8bd[_0x5f950(0x8f9)](/<(?:DTB)>/i))this[_0x5f950(0x992)]=0x0;else{if(_0x18e8bd[_0x5f950(0x8f9)](/<(?:TPB|ATB)[ ]ACTIVE>/i)){if(_0x5f950(0x356)===_0x5f950(0x356))this[_0x5f950(0x992)]=0x1;else return this[_0x5f950(0x2d5)]();}else{if(_0x18e8bd['match'](/<(?:TPB|ATB)[ ]WAIT>/i)){if('hUvlN'!=='yAdcH')this['_forcedBattleSys']=0x2;else return 0x0;}else{if(_0x18e8bd['match'](/<(?:CTB)>/i)){if(Imported[_0x5f950(0x1de)]){if(_0x5f950(0x1a1)!=='gelzF')this[_0x5f950(0x992)]='CTB';else return _0x3dfcd8[_0x5f950(0x9cf)][_0x5f950(0x977)]();}}else{if(_0x18e8bd['match'](/<(?:STB)>/i)){if(Imported[_0x5f950(0x309)]){if(_0x5f950(0x70a)!==_0x5f950(0x70a)){let _0x123e7f=_0x1d0616[_0x5f950(0x9cf)]['Game_Picture_scaleX'][_0x5f950(0x40b)](this);return this[_0x5f950(0x881)]()&&(_0x123e7f*=_0x267f6e[_0x5f950(0x74d)]()),_0x123e7f;}else this[_0x5f950(0x992)]='STB';}}else{if(_0x18e8bd[_0x5f950(0x8f9)](/<(?:BTB)>/i)){if(_0x5f950(0x334)===_0x5f950(0x5a3))return this[_0x5f950(0x193)]()[_0x5f950(0x75f)];else Imported[_0x5f950(0x779)]&&(_0x5f950(0x6fe)!==_0x5f950(0x94c)?this[_0x5f950(0x992)]=_0x5f950(0x424):this[_0x5f950(0x992)]=_0x5f950(0x424));}else{if(_0x18e8bd['match'](/<(?:FTB)>/i)){if(Imported['VisuMZ_2_BattleSystemFTB']){if(_0x5f950(0x47e)!==_0x5f950(0x2ea))this[_0x5f950(0x992)]='FTB';else{if(this['_movementDuration']<=0x0)return;const _0x27f2a1=this[_0x5f950(0x6f1)],_0x4049a0=this[_0x5f950(0x9be)],_0x56138a=this[_0x5f950(0x508)];this[_0x5f950(0x404)]=this['applyEasing'](this[_0x5f950(0x404)],this[_0x5f950(0x733)],_0x27f2a1,_0x4049a0,_0x56138a),this[_0x5f950(0x284)]=this[_0x5f950(0x95e)](this[_0x5f950(0x284)],this['_targetOffsetY'],_0x27f2a1,_0x4049a0,_0x56138a),this[_0x5f950(0x6f1)]--;if(this[_0x5f950(0x6f1)]<=0x0)this[_0x5f950(0x52e)]();}}}else{if(_0x18e8bd['match'](/<(?:OTB)>/i))Imported[_0x5f950(0x306)]&&(this['_forcedBattleSys']=_0x5f950(0x869));else{if(_0x18e8bd[_0x5f950(0x8f9)](/<(?:ETB)>/i))Imported['VisuMZ_2_BattleSystemETB']&&(this['_forcedBattleSys']=_0x5f950(0x55e));else{if(_0x18e8bd[_0x5f950(0x8f9)](/<(?:PTB)>/i))Imported[_0x5f950(0x74a)]&&(this['_forcedBattleSys']=_0x5f950(0x427));else{if(_0x18e8bd[_0x5f950(0x8f9)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x397d61=String(RegExp['$1']);if(_0x397d61[_0x5f950(0x8f9)](/DTB/i)){if('VWdpG'===_0x5f950(0x4d9)){const _0x4d6d68=_0x5f950(0x2f5);this[_0x5f950(0x449)]=this['_colorCache']||{};if(this[_0x5f950(0x449)][_0x4d6d68])return this[_0x5f950(0x449)][_0x4d6d68];const _0x31347a=_0x4da56b[_0x5f950(0x9cf)][_0x5f950(0x7a5)][_0x5f950(0x9ab)][_0x5f950(0x277)];return this['getColorDataFromPluginParameters'](_0x4d6d68,_0x31347a);}else this['_forcedBattleSys']=0x0;}else{if(_0x397d61[_0x5f950(0x8f9)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x5f950(0x992)]=0x1;else{if(_0x397d61[_0x5f950(0x8f9)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x5f950(0x992)]=0x2;else{if(_0x397d61['match'](/CTB/i)){if(_0x5f950(0x8cf)!==_0x5f950(0x8cf))this[_0x5f950(0x8b9)]();else{if(Imported['VisuMZ_2_BattleSystemCTB']){if('IPiWX'!==_0x5f950(0x500))this['_forcedBattleSys']=_0x5f950(0x16a);else{if(_0x3528ec[_0x5f950(0x9cf)][_0x5f950(0x7a5)][_0x5f950(0x678)][_0x5f950(0x25e)])this[_0x5f950(0x6e1)]();else return _0x2e142f[_0x5f950(0x9cf)][_0x5f950(0x415)]['call'](this);}}}}else{if(_0x397d61[_0x5f950(0x8f9)](/STB/i)){if(_0x5f950(0x1af)!=='vgDIN'){if(Imported[_0x5f950(0x309)]){if(_0x5f950(0x8e2)===_0x5f950(0x7e0)){_0xe736c8=_0x506e86||0x10e,this[_0x5f950(0x83b)]();if(_0x518621['CoreEngine'][_0x5f950(0x7a5)]['UI'][_0x5f950(0x16c)])this[_0x5f950(0x752)](_0x2200aa[_0x5f950(0x165)](),_0x1d0946,_0xe681c0,_0x45c491);else{const _0x39e30a=_0x331e50[_0x5f950(0x165)]()[_0x5f950(0x98a)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x225449[_0x5f950(0x165)](),_0x4a73c7,_0x3b9665,_0x43b45e);}}else this['_forcedBattleSys']='STB';}}else{_0x444e82['CoreEngine'][_0x5f950(0x84b)][_0x5f950(0x40b)](this);if(this[_0x5f950(0x20e)])this[_0x5f950(0x20e)]--;}}else{if(_0x397d61[_0x5f950(0x8f9)](/BTB/i)){if(_0x5f950(0x598)!==_0x5f950(0x598))return this['skills']()['filter'](_0x2aed88=>this['canUse'](_0x2aed88)&&this[_0x5f950(0x74e)]()['includes'](_0x2aed88['stypeId']));else Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x5f950(0x992)]=_0x5f950(0x424));}else{if(_0x397d61['match'](/FTB/i)){if('Vfmlm'==='iwIoy'){_0x3bcb44[_0x5f950(0x9cf)]['Scene_Battle_createSpritesetFix'][_0x5f950(0x40b)](this);const _0x11cbb6=this['_spriteset']['_timerSprite'];if(_0x11cbb6)this[_0x5f950(0x784)](_0x11cbb6);}else Imported[_0x5f950(0x9b9)]&&(this[_0x5f950(0x992)]=_0x5f950(0x434));}else{if(_0x397d61[_0x5f950(0x8f9)](/OTB/i))Imported[_0x5f950(0x306)]&&(this[_0x5f950(0x992)]=_0x5f950(0x869));else{if(_0x397d61[_0x5f950(0x8f9)](/ETB/i))Imported[_0x5f950(0x232)]&&(this[_0x5f950(0x992)]=_0x5f950(0x55e));else{if(_0x397d61[_0x5f950(0x8f9)](/PTB/i)){if(_0x5f950(0x9a9)===_0x5f950(0x532))for(const _0x4bd2cb of _0x121ced[_0x5f950(0x66e)]){_0x4bd2cb[_0x5f950(0x97f)][_0x5f950(0x8f9)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x4bd2cb['level']=_0x575527[_0x5f950(0x32a)](_0x21f335(_0x2207c0['$1']),0x1));}else Imported[_0x5f950(0x74a)]&&(this[_0x5f950(0x992)]=_0x5f950(0x427));}}}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x161145(0x2d7)][_0x161145(0x2ad)]=function(){const _0x1f69a3=_0x161145;this[_0x1f69a3(0x6c5)]=[];},Game_Temp[_0x161145(0x2d7)][_0x161145(0x1b5)]=function(_0x7e638c,_0xeae0f3,_0x2c6dee,_0x4a76e8){const _0x562e3f=_0x161145;if(!this[_0x562e3f(0x624)]())return;_0x2c6dee=_0x2c6dee||![],_0x4a76e8=_0x4a76e8||![];if($dataAnimations[_0xeae0f3]){if(_0x562e3f(0x48b)===_0x562e3f(0x41a)){const _0x15a009=this[_0x562e3f(0x8ff)][_0x562e3f(0x436)],_0x40e692=this[_0x562e3f(0x3ea)],_0x412ec4=this['height'],_0x22292a=this[_0x562e3f(0x220)],_0x5e75d5=_0x715285[_0x562e3f(0x3df)](),_0x566c38=_0x34e8fc['dimColor2']();_0x15a009['resize'](_0x40e692,_0x412ec4),_0x15a009[_0x562e3f(0x897)](0x0,0x0,_0x40e692,_0x22292a,_0x566c38,_0x5e75d5,!![]),_0x15a009[_0x562e3f(0x7b7)](0x0,_0x22292a,_0x40e692,_0x412ec4-_0x22292a*0x2,_0x5e75d5),_0x15a009['gradientFillRect'](0x0,_0x412ec4-_0x22292a,_0x40e692,_0x22292a,_0x5e75d5,_0x566c38,!![]),this[_0x562e3f(0x8ff)][_0x562e3f(0x24b)](0x0,0x0,_0x40e692,_0x412ec4);}else{const _0x3caeb2={'targets':_0x7e638c,'animationId':_0xeae0f3,'mirror':_0x2c6dee,'mute':_0x4a76e8};this[_0x562e3f(0x6c5)]['push'](_0x3caeb2);for(const _0x2bdfec of _0x7e638c){_0x2bdfec[_0x562e3f(0x3b2)]&&_0x2bdfec['startAnimation']();}}}},Game_Temp[_0x161145(0x2d7)][_0x161145(0x624)]=function(){return!![];},Game_Temp[_0x161145(0x2d7)][_0x161145(0x963)]=function(){const _0x59287d=_0x161145;return this[_0x59287d(0x6c5)][_0x59287d(0x33e)]();},Game_Temp[_0x161145(0x2d7)]['createPointAnimationQueue']=function(){const _0xe75e8e=_0x161145;this[_0xe75e8e(0x545)]=[];},Game_Temp['prototype'][_0x161145(0x539)]=function(_0x2c37b1,_0xb699d,_0x47fbff,_0xd0fc11,_0x5670bb){const _0x3d6e67=_0x161145;if(!this['showPointAnimations']())return;_0xd0fc11=_0xd0fc11||![],_0x5670bb=_0x5670bb||![];if($dataAnimations[_0x47fbff]){if('upjLM'!==_0x3d6e67(0x534)){const _0x25882f={'x':_0x2c37b1,'y':_0xb699d,'animationId':_0x47fbff,'mirror':_0xd0fc11,'mute':_0x5670bb};this['_pointAnimationQueue'][_0x3d6e67(0x31e)](_0x25882f);}else!_0x3caf3e[_0x3d6e67(0x2fb)]&&_0x134711['visible']&&_0x1f54ec[_0x3d6e67(0x7d7)](_0x541e46);}},Game_Temp[_0x161145(0x2d7)]['showPointAnimations']=function(){return!![];},Game_Temp[_0x161145(0x2d7)][_0x161145(0x87e)]=function(){const _0x45215d=_0x161145;return this[_0x45215d(0x545)][_0x45215d(0x33e)]();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x880)]=Game_System['prototype'][_0x161145(0x4fb)],Game_System[_0x161145(0x2d7)][_0x161145(0x4fb)]=function(){const _0x4c2eee=_0x161145;VisuMZ[_0x4c2eee(0x9cf)]['Game_System_initialize']['call'](this),this['initCoreEngine']();},Game_System[_0x161145(0x2d7)][_0x161145(0x44b)]=function(){const _0x4fe7c4=_0x161145;this['_CoreEngineSettings']={'SideView':$dataSystem['optSideView'],'BattleSystem':this['initialBattleSystem'](),'FontSize':$dataSystem['advanced'][_0x4fe7c4(0x324)],'Padding':0xc};},Game_System[_0x161145(0x2d7)][_0x161145(0x831)]=function(){const _0x5e0046=_0x161145;if($gameTemp[_0x5e0046(0x7f0)]==='SV')return _0x5e0046(0x86b)!==_0x5e0046(0x5e2)?!![]:_0x348c51[_0x5e0046(0x9cf)][_0x5e0046(0x751)][_0x5e0046(0x40b)](this);else{if($gameTemp[_0x5e0046(0x7f0)]==='FV')return![];}if(this[_0x5e0046(0x96a)]===undefined)this['initCoreEngine']();if(this[_0x5e0046(0x96a)][_0x5e0046(0x583)]===undefined)this['initCoreEngine']();return this[_0x5e0046(0x96a)][_0x5e0046(0x583)];},Game_System['prototype'][_0x161145(0x568)]=function(_0x3f1847){const _0x589442=_0x161145;if(this[_0x589442(0x96a)]===undefined)this[_0x589442(0x44b)]();if(this['_CoreEngineSettings'][_0x589442(0x583)]===undefined)this[_0x589442(0x44b)]();this[_0x589442(0x96a)]['SideView']=_0x3f1847;},Game_System[_0x161145(0x2d7)][_0x161145(0x2e4)]=function(){const _0x33fd7a=_0x161145;if(this['_CoreEngineSettings']===undefined)this[_0x33fd7a(0x44b)]();this[_0x33fd7a(0x96a)][_0x33fd7a(0x664)]=this[_0x33fd7a(0x5ce)]();},Game_System['prototype'][_0x161145(0x5ce)]=function(){const _0x53849d=_0x161145,_0x32b11a=(VisuMZ['CoreEngine'][_0x53849d(0x7a5)]['BattleSystem']||_0x53849d(0x5f9))['toUpperCase']()[_0x53849d(0x753)]();return VisuMZ['CoreEngine'][_0x53849d(0x96c)](_0x32b11a);},Game_System[_0x161145(0x2d7)]['getBattleSystem']=function(){const _0x148df9=_0x161145;if($gameTemp[_0x148df9(0x992)]!==undefined)return $gameTemp[_0x148df9(0x992)];if(this[_0x148df9(0x96a)]===undefined)this[_0x148df9(0x44b)]();if(this[_0x148df9(0x96a)]['BattleSystem']===undefined)this[_0x148df9(0x2e4)]();return this[_0x148df9(0x96a)][_0x148df9(0x664)];},Game_System['prototype']['setBattleSystem']=function(_0x1861c6){const _0x548b70=_0x161145;if(this[_0x548b70(0x96a)]===undefined)this[_0x548b70(0x44b)]();if(this[_0x548b70(0x96a)][_0x548b70(0x664)]===undefined)this[_0x548b70(0x2e4)]();this['_CoreEngineSettings'][_0x548b70(0x664)]=_0x1861c6;},Game_System['prototype'][_0x161145(0x655)]=function(){const _0xadc5e6=_0x161145;if(this[_0xadc5e6(0x96a)]===undefined)this[_0xadc5e6(0x44b)]();if(this[_0xadc5e6(0x96a)]['FontSize']===undefined)this['initCoreEngine']();return this['_CoreEngineSettings'][_0xadc5e6(0x16f)];},Game_System[_0x161145(0x2d7)][_0x161145(0x902)]=function(_0x254bf4){const _0x4375ec=_0x161145;if(this[_0x4375ec(0x96a)]===undefined)this['initCoreEngine']();if(this[_0x4375ec(0x96a)][_0x4375ec(0x431)]===undefined)this[_0x4375ec(0x44b)]();this[_0x4375ec(0x96a)][_0x4375ec(0x16f)]=_0x254bf4;},Game_System['prototype']['windowPadding']=function(){const _0x4285c0=_0x161145;if(this[_0x4285c0(0x96a)]===undefined)this[_0x4285c0(0x44b)]();if(this[_0x4285c0(0x96a)][_0x4285c0(0x1c5)]===undefined)this[_0x4285c0(0x44b)]();return this['_CoreEngineSettings']['Padding'];},Game_System[_0x161145(0x2d7)][_0x161145(0x8b6)]=function(_0x1bb8e2){const _0x484b95=_0x161145;if(this[_0x484b95(0x96a)]===undefined)this[_0x484b95(0x44b)]();if(this[_0x484b95(0x96a)][_0x484b95(0x431)]===undefined)this[_0x484b95(0x44b)]();this[_0x484b95(0x96a)][_0x484b95(0x1c5)]=_0x1bb8e2;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x9e0)]=Game_Screen[_0x161145(0x2d7)][_0x161145(0x4fb)],Game_Screen['prototype']['initialize']=function(){const _0x3034b1=_0x161145;VisuMZ['CoreEngine'][_0x3034b1(0x9e0)]['call'](this),this[_0x3034b1(0x650)]();},Game_Screen[_0x161145(0x2d7)][_0x161145(0x650)]=function(){const _0x1dcb15=_0x161145,_0x516903=VisuMZ[_0x1dcb15(0x9cf)][_0x1dcb15(0x7a5)]['ScreenShake'];this[_0x1dcb15(0x3d7)]=_0x516903?.[_0x1dcb15(0x7a1)]||_0x1dcb15(0x2fd);},Game_Screen[_0x161145(0x2d7)][_0x161145(0x1ac)]=function(){const _0x154fe0=_0x161145;if(this['_coreEngineShakeStyle']===undefined)this[_0x154fe0(0x650)]();return this[_0x154fe0(0x3d7)];},Game_Screen['prototype'][_0x161145(0x5fb)]=function(_0x1a2366){const _0x456bca=_0x161145;if(this[_0x456bca(0x3d7)]===undefined)this[_0x456bca(0x650)]();this[_0x456bca(0x3d7)]=_0x1a2366['toLowerCase']()[_0x456bca(0x753)]();},Game_Picture[_0x161145(0x2d7)][_0x161145(0x881)]=function(){const _0x4a4b6f=_0x161145;if($gameParty[_0x4a4b6f(0x38b)]())return![];return this[_0x4a4b6f(0x618)]()&&this[_0x4a4b6f(0x618)]()[_0x4a4b6f(0x6cd)](0x0)==='!';},VisuMZ[_0x161145(0x9cf)][_0x161145(0x2ca)]=Game_Picture[_0x161145(0x2d7)]['x'],Game_Picture[_0x161145(0x2d7)]['x']=function(){const _0x25db33=_0x161145;if(this[_0x25db33(0x881)]()){if('yAiWf'!=='cKoqN')return this[_0x25db33(0x38c)]();else{if(!this[_0x25db33(0x8b1)])return![];const _0x54f0cb=this['_animation'][_0x25db33(0x618)]||'';if(_0x54f0cb['match'](/<MIRROR OFFSET X>/i))return!![];if(_0x54f0cb[_0x25db33(0x8f9)](/<NO MIRROR OFFSET X>/i))return![];return _0x25c213[_0x25db33(0x9cf)][_0x25db33(0x7a5)][_0x25db33(0x678)][_0x25db33(0x87a)];}}else return VisuMZ[_0x25db33(0x9cf)]['Game_Picture_x'][_0x25db33(0x40b)](this);},Game_Picture[_0x161145(0x2d7)][_0x161145(0x38c)]=function(){const _0x37fca2=_0x161145,_0x4111ed=$gameMap[_0x37fca2(0x5aa)]()*$gameMap['tileWidth']();return(this['_x']-_0x4111ed)*$gameScreen[_0x37fca2(0x74d)]();},VisuMZ['CoreEngine']['Game_Picture_y']=Game_Picture[_0x161145(0x2d7)]['y'],Game_Picture[_0x161145(0x2d7)]['y']=function(){const _0x4786e3=_0x161145;return this[_0x4786e3(0x881)]()?this['yScrollLinkedOffset']():VisuMZ[_0x4786e3(0x9cf)][_0x4786e3(0x751)][_0x4786e3(0x40b)](this);},Game_Picture[_0x161145(0x2d7)][_0x161145(0x99c)]=function(){const _0x522671=_0x161145,_0x2dd255=$gameMap[_0x522671(0x79e)]()*$gameMap[_0x522671(0x79a)]();return(this['_y']-_0x2dd255)*$gameScreen[_0x522671(0x74d)]();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x8e7)]=Game_Picture[_0x161145(0x2d7)]['scaleX'],Game_Picture[_0x161145(0x2d7)][_0x161145(0x475)]=function(){const _0x14bccb=_0x161145;let _0x63c785=VisuMZ[_0x14bccb(0x9cf)][_0x14bccb(0x8e7)][_0x14bccb(0x40b)](this);return this['isMapScrollLinked']()&&(_0x14bccb(0x5e0)!==_0x14bccb(0x5e0)?(_0x1b4356>=_0x35260a||_0x4955ba&&_0x33f182===0x1)&&this[_0x14bccb(0x846)]((_0x50f101-_0x4b3881+_0x149cc6)%_0x33fe0f):_0x63c785*=$gameScreen[_0x14bccb(0x74d)]()),_0x63c785;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x7b9)]=Game_Picture[_0x161145(0x2d7)][_0x161145(0x5e5)],Game_Picture[_0x161145(0x2d7)]['scaleY']=function(){const _0x334aef=_0x161145;let _0x5820cb=VisuMZ['CoreEngine'][_0x334aef(0x7b9)][_0x334aef(0x40b)](this);return this['isMapScrollLinked']()&&(_0x5820cb*=$gameScreen[_0x334aef(0x74d)]()),_0x5820cb;},Game_Picture['prototype']['setEasingType']=function(_0x53d6c9){const _0x113e64=_0x161145;this[_0x113e64(0x3ec)]=_0x53d6c9;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x392)]=Game_Picture[_0x161145(0x2d7)]['calcEasing'],Game_Picture['prototype'][_0x161145(0x9d6)]=function(_0x24c2c6){const _0x47e7ee=_0x161145;this[_0x47e7ee(0x3ec)]=this['_coreEasingType']||0x0;if([0x0,0x1,0x2,0x3][_0x47e7ee(0x219)](this['_coreEasingType']))return VisuMZ[_0x47e7ee(0x9cf)][_0x47e7ee(0x392)][_0x47e7ee(0x40b)](this,_0x24c2c6);else{if(_0x47e7ee(0x1e3)===_0x47e7ee(0x1e3))return VisuMZ[_0x47e7ee(0x3cc)](_0x24c2c6,this[_0x47e7ee(0x3ec)]);else this['_forcedBattleSys']=_0x47e7ee(0x46c);}},VisuMZ['CoreEngine'][_0x161145(0x476)]=Game_Action['prototype'][_0x161145(0x4a5)],Game_Action[_0x161145(0x2d7)]['itemHit']=function(_0x354164){const _0x1faa09=_0x161145;if(VisuMZ[_0x1faa09(0x9cf)][_0x1faa09(0x7a5)]['QoL']['ImprovedAccuracySystem'])return this[_0x1faa09(0x3a2)](_0x354164);else{if(_0x1faa09(0x7ac)===_0x1faa09(0x7ac))return VisuMZ[_0x1faa09(0x9cf)][_0x1faa09(0x476)][_0x1faa09(0x40b)](this,_0x354164);else{const _0x5e5084=_0x1faa09(0x4a6);this[_0x1faa09(0x449)]=this[_0x1faa09(0x449)]||{};if(this[_0x1faa09(0x449)][_0x5e5084])return this[_0x1faa09(0x449)][_0x5e5084];const _0x10bd8f=_0x412093[_0x1faa09(0x9cf)][_0x1faa09(0x7a5)][_0x1faa09(0x9ab)][_0x1faa09(0x70e)];return this[_0x1faa09(0x968)](_0x5e5084,_0x10bd8f);}}},Game_Action[_0x161145(0x2d7)][_0x161145(0x3a2)]=function(_0xd8979){const _0x2ad9eb=_0x161145,_0xbf2ad7=this[_0x2ad9eb(0x422)](_0xd8979),_0x23d664=this['subjectHitRate'](_0xd8979),_0x3b3da7=this[_0x2ad9eb(0x9bb)](_0xd8979);return _0xbf2ad7*(_0x23d664-_0x3b3da7);},VisuMZ['CoreEngine'][_0x161145(0x693)]=Game_Action[_0x161145(0x2d7)][_0x161145(0x92b)],Game_Action['prototype'][_0x161145(0x92b)]=function(_0x197a93){const _0x996d71=_0x161145;if(VisuMZ[_0x996d71(0x9cf)][_0x996d71(0x7a5)][_0x996d71(0x678)]['ImprovedAccuracySystem']){if(_0x996d71(0x55c)!==_0x996d71(0x815))return 0x0;else{for(const _0x519a01 of this[_0x996d71(0x616)]){!_0x519a01[_0x996d71(0x44f)]()&&this[_0x996d71(0x20a)](_0x519a01);}this[_0x996d71(0x7c6)]();}}else return VisuMZ[_0x996d71(0x9cf)][_0x996d71(0x693)]['call'](this,_0x197a93);},Game_Action[_0x161145(0x2d7)][_0x161145(0x422)]=function(_0x44a422){const _0x42f785=_0x161145;return this[_0x42f785(0x7b0)]()[_0x42f785(0x479)]*0.01;},Game_Action['prototype'][_0x161145(0x5a6)]=function(_0xe3533c){const _0x5407e6=_0x161145;if(VisuMZ['CoreEngine'][_0x5407e6(0x7a5)]['QoL'][_0x5407e6(0x69f)]&&this[_0x5407e6(0x982)]())return 0x1;if(this[_0x5407e6(0x8a0)]()){if(_0x5407e6(0x340)===_0x5407e6(0x226))_0x16152f+=_0x2b7985;else return VisuMZ[_0x5407e6(0x9cf)][_0x5407e6(0x7a5)][_0x5407e6(0x678)]['AccuracyBoost']&&this['subject']()['isActor']()?_0x5407e6(0x641)!==_0x5407e6(0x641)?this[_0x5407e6(0x988)]&&this[_0x5407e6(0x988)][_0x5407e6(0x4e8)]===_0x5e0920:this[_0x5407e6(0x4a8)]()['hit']+0.05:_0x5407e6(0x6f7)!==_0x5407e6(0x7e5)?this[_0x5407e6(0x4a8)]()[_0x5407e6(0x29f)]:this['EnableNameInput']()?_0x14cbf3[_0x5407e6(0x705)](_0x5407e6(0x3af)):_0x27ac7e['prototype'][_0x5407e6(0x9a8)][_0x5407e6(0x40b)](this);}else{if('tCKjE'===_0x5407e6(0x638)){if(_0x210262[_0x5407e6(0x38b)]())return;_0x53b17e[_0x5407e6(0x767)](_0x52e176,_0x136dee);const _0x4916f5=_0x1ac1ad[_0x5407e6(0x2da)](_0x52b4fd[_0x5407e6(0x35f)],_0x144bb9[_0x5407e6(0x279)]),_0x4882a2=_0x339f15['max'](_0x50939f[_0x5407e6(0x35f)],_0x3c210f[_0x5407e6(0x279)]),_0xa0c75e=(_0x5c732f[_0x5407e6(0x386)]||0x0)/0x64;for(let _0xa90136=_0x4916f5;_0xa90136<=_0x4882a2;_0xa90136++){const _0x148db6=_0x150c41[_0x5407e6(0x2fd)]()<=_0xa0c75e;_0x24c189[_0x5407e6(0x19d)](_0xa90136,_0x148db6);}}else return 0x1;}},Game_Action[_0x161145(0x2d7)][_0x161145(0x9bb)]=function(_0x4dd70a){const _0x38ba01=_0x161145;if(this[_0x38ba01(0x4a8)]()[_0x38ba01(0x920)]()===_0x4dd70a[_0x38ba01(0x920)]())return 0x0;if(this[_0x38ba01(0x8a0)]())return VisuMZ[_0x38ba01(0x9cf)][_0x38ba01(0x7a5)]['QoL'][_0x38ba01(0x69f)]&&_0x4dd70a[_0x38ba01(0x1ad)]()?_0x4dd70a[_0x38ba01(0x71c)]-0.05:_0x4dd70a[_0x38ba01(0x71c)];else return this[_0x38ba01(0x808)]()?_0x4dd70a[_0x38ba01(0x14e)]:0x0;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x258)]=Game_Action['prototype']['updateLastTarget'],Game_Action[_0x161145(0x2d7)]['updateLastTarget']=function(_0x15bb00){const _0x3ac706=_0x161145;VisuMZ['CoreEngine'][_0x3ac706(0x258)][_0x3ac706(0x40b)](this,_0x15bb00);if(VisuMZ['CoreEngine'][_0x3ac706(0x7a5)][_0x3ac706(0x678)][_0x3ac706(0x987)])return;const _0x3f8db5=_0x15bb00[_0x3ac706(0x7e4)]();_0x3f8db5[_0x3ac706(0x92f)]&&(0x1-this[_0x3ac706(0x92b)](_0x15bb00)>this[_0x3ac706(0x4a5)](_0x15bb00)&&(_0x3f8db5[_0x3ac706(0x92f)]=![],_0x3f8db5[_0x3ac706(0x51f)]=!![]));},VisuMZ['CoreEngine'][_0x161145(0x8c2)]=Game_BattlerBase[_0x161145(0x2d7)][_0x161145(0x262)],Game_BattlerBase[_0x161145(0x2d7)][_0x161145(0x262)]=function(){const _0x2a25b7=_0x161145;this['_cache']={},VisuMZ[_0x2a25b7(0x9cf)]['Game_BattlerBase_initMembers'][_0x2a25b7(0x40b)](this);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x8cc)]=Game_BattlerBase['prototype'][_0x161145(0x9cd)],Game_BattlerBase[_0x161145(0x2d7)]['refresh']=function(){const _0x2910cc=_0x161145;this[_0x2910cc(0x60f)]={},VisuMZ[_0x2910cc(0x9cf)][_0x2910cc(0x8cc)][_0x2910cc(0x40b)](this);},Game_BattlerBase[_0x161145(0x2d7)][_0x161145(0x571)]=function(_0x18d37a){const _0x3af310=_0x161145;return this['_cache']=this['_cache']||{},this[_0x3af310(0x60f)][_0x18d37a]!==undefined;},Game_BattlerBase[_0x161145(0x2d7)][_0x161145(0x7bf)]=function(_0x4bef22){const _0x6c06b0=_0x161145,_0x59ca26=(_0x3ea197,_0x38dd82)=>{const _0x5222cf=_0x34c4;if(!_0x38dd82)return _0x3ea197;if(_0x38dd82[_0x5222cf(0x97f)][_0x5222cf(0x8f9)](VisuMZ[_0x5222cf(0x9cf)][_0x5222cf(0x255)]['paramPlus'][_0x4bef22])){if(_0x5222cf(0x21e)==='EUqjv'){var _0x4e2bd5=Number(RegExp['$1']);_0x3ea197+=_0x4e2bd5;}else _0x4e3413['CoreEngine'][_0x5222cf(0x994)][_0x5222cf(0x40b)](this,_0x170cf5);}if(_0x38dd82[_0x5222cf(0x97f)]['match'](VisuMZ[_0x5222cf(0x9cf)][_0x5222cf(0x255)]['paramPlusJS'][_0x4bef22])){if('mvNeg'!==_0x5222cf(0x6c2)){var _0x58f121=String(RegExp['$1']);try{_0x3ea197+=eval(_0x58f121);}catch(_0x77ea20){if($gameTemp['isPlaytest']())console['log'](_0x77ea20);}}else _0x3cf4e6[_0x5222cf(0x9d8)][_0x5222cf(0x8b4)](_0x1a5a20);}return _0x3ea197;};return this['traitObjects']()['reduce'](_0x59ca26,this[_0x6c06b0(0x4b2)][_0x4bef22]);},Game_BattlerBase[_0x161145(0x2d7)][_0x161145(0x617)]=function(_0x3ac68e){const _0x3392f6=_0x161145;var _0x40c76e='Basic'+(this[_0x3392f6(0x920)]()?_0x3392f6(0x5cb):_0x3392f6(0x86d))+_0x3392f6(0x64c)+_0x3ac68e;if(this[_0x3392f6(0x571)](_0x40c76e))return this[_0x3392f6(0x60f)][_0x40c76e];this[_0x3392f6(0x60f)][_0x40c76e]=eval(VisuMZ[_0x3392f6(0x9cf)][_0x3392f6(0x7a5)]['Param'][_0x40c76e]);const _0x41393f=(_0x437627,_0x5d1524)=>{const _0x54b53e=_0x3392f6;if(!_0x5d1524)return _0x437627;if(_0x5d1524[_0x54b53e(0x97f)][_0x54b53e(0x8f9)](VisuMZ[_0x54b53e(0x9cf)][_0x54b53e(0x255)][_0x54b53e(0x617)][_0x3ac68e])){if(_0x54b53e(0x6ed)!==_0x54b53e(0x65a)){var _0x45787e=Number(RegExp['$1']);if(_0x45787e===0x0)_0x45787e=Number[_0x54b53e(0x151)];_0x437627=Math['max'](_0x437627,_0x45787e);}else _0x765071&&_0x5f0ad4['update']();}if(_0x5d1524[_0x54b53e(0x97f)]['match'](VisuMZ[_0x54b53e(0x9cf)][_0x54b53e(0x255)][_0x54b53e(0x217)][_0x3ac68e])){var _0x137d96=String(RegExp['$1']);try{_0x437627=Math['max'](_0x437627,Number(eval(_0x137d96)));}catch(_0x3f7562){if($gameTemp[_0x54b53e(0x1ca)]())console[_0x54b53e(0x312)](_0x3f7562);}}return _0x437627;};if(this[_0x3392f6(0x60f)][_0x40c76e]===0x0)this[_0x3392f6(0x60f)][_0x40c76e]=Number[_0x3392f6(0x151)];return this[_0x3392f6(0x60f)][_0x40c76e]=this[_0x3392f6(0x6fc)]()['reduce'](_0x41393f,this[_0x3392f6(0x60f)][_0x40c76e]),this['_cache'][_0x40c76e];},Game_BattlerBase[_0x161145(0x2d7)][_0x161145(0x8c5)]=function(_0x721856){const _0x63ebf9=_0x161145,_0x2c814d=this[_0x63ebf9(0x1d5)](Game_BattlerBase['TRAIT_PARAM'],_0x721856),_0x5e0963=(_0x177fe6,_0x12e3da)=>{const _0x36ad42=_0x63ebf9;if(!_0x12e3da)return _0x177fe6;if(_0x12e3da['note']['match'](VisuMZ[_0x36ad42(0x9cf)][_0x36ad42(0x255)][_0x36ad42(0x1e2)][_0x721856])){if(_0x36ad42(0x60d)===_0x36ad42(0x493))this[_0x36ad42(0x1cc)]()[_0x36ad42(0x5cc)]=!![],this['centerCameraCheckData']()[_0x36ad42(0x5aa)]=_0x24670d['DisplayLockX'];else{var _0x12bb3e=Number(RegExp['$1'])/0x64;_0x177fe6*=_0x12bb3e;}}if(_0x12e3da[_0x36ad42(0x97f)][_0x36ad42(0x8f9)](VisuMZ['CoreEngine']['RegExp'][_0x36ad42(0x40e)][_0x721856])){var _0x12bb3e=Number(RegExp['$1']);_0x177fe6*=_0x12bb3e;}if(_0x12e3da['note'][_0x36ad42(0x8f9)](VisuMZ[_0x36ad42(0x9cf)]['RegExp'][_0x36ad42(0x7be)][_0x721856])){if(_0x36ad42(0x5bf)!==_0x36ad42(0x758)){var _0x15a485=String(RegExp['$1']);try{if(_0x36ad42(0x69b)!==_0x36ad42(0x5fe))_0x177fe6*=eval(_0x15a485);else return this[_0x36ad42(0x469)][_0x36ad42(0x809)](_0x352de7);}catch(_0x40341c){if(_0x36ad42(0x5bc)!==_0x36ad42(0x362)){if($gameTemp[_0x36ad42(0x1ca)]())console[_0x36ad42(0x312)](_0x40341c);}else this[_0x36ad42(0x2fc)][_0x36ad42(0x6ce)](_0x2b38d1[_0x36ad42(0x466)][_0x36ad42(0x840)]);}}else this[_0x36ad42(0x800)]();}return _0x177fe6;};return this['traitObjects']()[_0x63ebf9(0x490)](_0x5e0963,_0x2c814d);},Game_BattlerBase['prototype'][_0x161145(0x28d)]=function(_0x1f5ab1){const _0x2e0450=_0x161145,_0x29464b=(_0x215f1d,_0x34b99a)=>{const _0xf99583=_0x34c4;if(_0xf99583(0x625)===_0xf99583(0x625)){if(!_0x34b99a)return _0x215f1d;if(_0x34b99a[_0xf99583(0x97f)][_0xf99583(0x8f9)](VisuMZ[_0xf99583(0x9cf)][_0xf99583(0x255)][_0xf99583(0x1a4)][_0x1f5ab1])){if(_0xf99583(0x4ac)!=='HWGqN'){var _0x19de05=Number(RegExp['$1']);_0x215f1d+=_0x19de05;}else this[_0xf99583(0x176)]&&this['_clickHandler']();}if(_0x34b99a['note'][_0xf99583(0x8f9)](VisuMZ[_0xf99583(0x9cf)]['RegExp'][_0xf99583(0x2d6)][_0x1f5ab1])){if('nsAwq'===_0xf99583(0x460))this[_0xf99583(0x34f)]=![];else{var _0x122f81=String(RegExp['$1']);try{_0x215f1d+=eval(_0x122f81);}catch(_0x400332){if(_0xf99583(0x2ba)===_0xf99583(0x2ba)){if($gameTemp[_0xf99583(0x1ca)]())console[_0xf99583(0x312)](_0x400332);}else{if(_0x3862aa[_0xf99583(0x992)]!==_0x7af25d)return _0x46549a[_0xf99583(0x992)];if(this[_0xf99583(0x96a)]===_0x164697)this[_0xf99583(0x44b)]();if(this[_0xf99583(0x96a)]['BattleSystem']===_0x3fe5eb)this['resetBattleSystem']();return this['_CoreEngineSettings'][_0xf99583(0x664)];}}}}return _0x215f1d;}else{const _0x5ae33a=_0x557459[_0xf99583(0x525)](_0x3cbe14);_0x59e36d[_0xf99583(0x19d)](_0x5e8d74,!_0x5ae33a);}};return this[_0x2e0450(0x6fc)]()['reduce'](_0x29464b,0x0);},Game_BattlerBase[_0x161145(0x2d7)][_0x161145(0x762)]=function(_0x575110){const _0x94713d=_0x161145;let _0x136438=_0x94713d(0x762)+_0x575110+_0x94713d(0x716);if(this[_0x94713d(0x571)](_0x136438))return this['_cache'][_0x136438];return this[_0x94713d(0x60f)][_0x136438]=Math['round'](VisuMZ['CoreEngine'][_0x94713d(0x7a5)][_0x94713d(0x538)]['BasicParameterFormula'][_0x94713d(0x40b)](this,_0x575110)),this[_0x94713d(0x60f)][_0x136438];},Game_BattlerBase['prototype'][_0x161145(0x4ce)]=function(_0x15634e){const _0x437644=_0x161145,_0x2cf5b6=(_0x5acf5e,_0x20f64e)=>{const _0x1349bf=_0x34c4;if(_0x1349bf(0x812)==='rkcog'){if(!_0x20f64e)return _0x5acf5e;if(_0x20f64e[_0x1349bf(0x97f)]['match'](VisuMZ[_0x1349bf(0x9cf)]['RegExp'][_0x1349bf(0x4f4)][_0x15634e])){var _0x5dd56f=Number(RegExp['$1'])/0x64;_0x5acf5e+=_0x5dd56f;}if(_0x20f64e[_0x1349bf(0x97f)]['match'](VisuMZ[_0x1349bf(0x9cf)][_0x1349bf(0x255)]['xparamPlus2'][_0x15634e])){if(_0x1349bf(0x819)==='nYkFH'){var _0x5dd56f=Number(RegExp['$1']);_0x5acf5e+=_0x5dd56f;}else _0x6d94e9[_0x1349bf(0x9cf)][_0x1349bf(0x8f1)][_0x1349bf(0x40b)](this),this['process_VisuMZ_CoreEngine_RegExp'](),this[_0x1349bf(0x790)](),this[_0x1349bf(0x3ba)](),this[_0x1349bf(0x5be)](),this[_0x1349bf(0x7a4)](),this[_0x1349bf(0x1d1)](),_0x166a0f['ParseAllNotetags']();}if(_0x20f64e['note']['match'](VisuMZ[_0x1349bf(0x9cf)][_0x1349bf(0x255)][_0x1349bf(0x93e)][_0x15634e])){if(_0x1349bf(0x916)===_0x1349bf(0x916)){var _0x2ab9ac=String(RegExp['$1']);try{_0x5acf5e+=eval(_0x2ab9ac);}catch(_0x44691b){if($gameTemp[_0x1349bf(0x1ca)]())console[_0x1349bf(0x312)](_0x44691b);}}else _0x145f6b=_0x4de0e7[_0x1349bf(0x299)](),_0x470c67=_0x10c30c['maxLvGaugeColor2']();}return _0x5acf5e;}else{const _0x573523=_0x31e54c[_0x1349bf(0x932)],_0x93fa48=0.5;if(_0x573523[0x0]<-_0x93fa48)return!![];if(_0x573523[0x0]>_0x93fa48)return!![];if(_0x573523[0x1]<-_0x93fa48)return!![];if(_0x573523[0x1]>_0x93fa48)return!![];return![];}};return this[_0x437644(0x6fc)]()[_0x437644(0x490)](_0x2cf5b6,0x0);},Game_BattlerBase[_0x161145(0x2d7)][_0x161145(0x9d9)]=function(_0x11a3da){const _0x1bc392=(_0x2e340f,_0x1c2787)=>{const _0xdc2923=_0x34c4;if('YhKiR'!==_0xdc2923(0x6e7)){if(!_0x1c2787)return _0x2e340f;if(_0x1c2787[_0xdc2923(0x97f)][_0xdc2923(0x8f9)](VisuMZ[_0xdc2923(0x9cf)]['RegExp'][_0xdc2923(0x605)][_0x11a3da])){if(_0xdc2923(0x6da)===_0xdc2923(0x6da)){var _0x331798=Number(RegExp['$1'])/0x64;_0x2e340f*=_0x331798;}else return _0x174c85[_0xdc2923(0x466)][_0xdc2923(0x390)]['call'](this);}if(_0x1c2787['note'][_0xdc2923(0x8f9)](VisuMZ[_0xdc2923(0x9cf)][_0xdc2923(0x255)][_0xdc2923(0x3b6)][_0x11a3da])){var _0x331798=Number(RegExp['$1']);_0x2e340f*=_0x331798;}if(_0x1c2787[_0xdc2923(0x97f)][_0xdc2923(0x8f9)](VisuMZ[_0xdc2923(0x9cf)][_0xdc2923(0x255)][_0xdc2923(0x572)][_0x11a3da])){var _0x26928e=String(RegExp['$1']);try{_0x2e340f*=eval(_0x26928e);}catch(_0x3c7675){if($gameTemp[_0xdc2923(0x1ca)]())console[_0xdc2923(0x312)](_0x3c7675);}}return _0x2e340f;}else{var _0x5052c6=_0x9b910d(_0xbe6668['$1']);try{_0x13d412+=_0xaca2b1(_0x5052c6);}catch(_0x2d0d29){if(_0x34efe5[_0xdc2923(0x1ca)]())_0x58b9a8[_0xdc2923(0x312)](_0x2d0d29);}}};return this['traitObjects']()['reduce'](_0x1bc392,0x1);},Game_BattlerBase['prototype']['xparamFlatBonus']=function(_0x19595b){const _0x116641=_0x161145,_0x21847f=(_0x498b1c,_0x1ef5da)=>{const _0x50d019=_0x34c4;if(!_0x1ef5da)return _0x498b1c;if(_0x1ef5da[_0x50d019(0x97f)][_0x50d019(0x8f9)](VisuMZ[_0x50d019(0x9cf)][_0x50d019(0x255)]['xparamFlat1'][_0x19595b])){var _0xa163e6=Number(RegExp['$1'])/0x64;_0x498b1c+=_0xa163e6;}if(_0x1ef5da[_0x50d019(0x97f)][_0x50d019(0x8f9)](VisuMZ['CoreEngine'][_0x50d019(0x255)][_0x50d019(0x983)][_0x19595b])){if(_0x50d019(0x1e9)!=='czXoi'){const _0x57e53b=_0x141296[_0x50d019(0x9cf)][_0x50d019(0x7a5)][_0x50d019(0x50c)];if(_0x57e53b&&_0x57e53b['horzJS'])return _0x57e53b['horzJS']['call'](this);const _0x52c4dd=_0x3f9b2e[_0x50d019(0x92c)]*0.75,_0x4325ac=_0x11151c[_0x50d019(0x952)]*0.6,_0x4f3152=_0x444ab6['_shakeDuration'];this['x']+=_0x15ebd1[_0x50d019(0x8c8)](_0x371693[_0x50d019(0x1b2)](_0x52c4dd)-_0x53c2e9[_0x50d019(0x1b2)](_0x4325ac))*(_0x49fbea[_0x50d019(0x2da)](_0x4f3152,0x1e)*0.5);}else{var _0xa163e6=Number(RegExp['$1']);_0x498b1c+=_0xa163e6;}}if(_0x1ef5da['note'][_0x50d019(0x8f9)](VisuMZ[_0x50d019(0x9cf)][_0x50d019(0x255)][_0x50d019(0x745)][_0x19595b])){var _0x4a11a1=String(RegExp['$1']);try{_0x498b1c+=eval(_0x4a11a1);}catch(_0x147b0b){if($gameTemp['isPlaytest']())console[_0x50d019(0x312)](_0x147b0b);}}return _0x498b1c;};return this[_0x116641(0x6fc)]()[_0x116641(0x490)](_0x21847f,0x0);},Game_BattlerBase['prototype'][_0x161145(0x684)]=function(_0x55bf96){const _0x68231d=_0x161145;let _0x729155='xparam'+_0x55bf96+_0x68231d(0x716);if(this[_0x68231d(0x571)](_0x729155))return this[_0x68231d(0x60f)][_0x729155];return this[_0x68231d(0x60f)][_0x729155]=VisuMZ[_0x68231d(0x9cf)][_0x68231d(0x7a5)][_0x68231d(0x538)]['XParameterFormula'][_0x68231d(0x40b)](this,_0x55bf96),this['_cache'][_0x729155];},Game_BattlerBase[_0x161145(0x2d7)][_0x161145(0x8b3)]=function(_0x473d76){const _0x4835d5=_0x161145,_0x23ba8f=(_0x1d4a1e,_0x121ab3)=>{const _0x6b5f5f=_0x34c4;if(_0x6b5f5f(0x68b)!=='FKRty'){if(!_0x121ab3)return _0x1d4a1e;if(_0x121ab3['note'][_0x6b5f5f(0x8f9)](VisuMZ[_0x6b5f5f(0x9cf)][_0x6b5f5f(0x255)][_0x6b5f5f(0x167)][_0x473d76])){var _0x4ded8c=Number(RegExp['$1'])/0x64;_0x1d4a1e+=_0x4ded8c;}if(_0x121ab3[_0x6b5f5f(0x97f)][_0x6b5f5f(0x8f9)](VisuMZ[_0x6b5f5f(0x9cf)]['RegExp']['sparamPlus2'][_0x473d76])){if(_0x6b5f5f(0x5ac)!==_0x6b5f5f(0x5ac))this[_0x6b5f5f(0x992)]=_0x6b5f5f(0x16a);else{var _0x4ded8c=Number(RegExp['$1']);_0x1d4a1e+=_0x4ded8c;}}if(_0x121ab3['note']['match'](VisuMZ[_0x6b5f5f(0x9cf)]['RegExp'][_0x6b5f5f(0x27c)][_0x473d76])){var _0x324944=String(RegExp['$1']);try{_0x1d4a1e+=eval(_0x324944);}catch(_0x5d5153){if('TOqXP'!==_0x6b5f5f(0x99b)){const _0x36d58f=_0x6a8312[_0x6b5f5f(0x7f2)]((_0x3fc64c-0x2)*_0x4b8bf9),_0x59ca7a=_0x1ce984[_0x6b5f5f(0x2d7)]['gaugeHeight'][_0x6b5f5f(0x40b)](this),_0x3d1f00=_0x2428bc+this[_0x6b5f5f(0x986)]()-_0x59ca7a-0x2;this[_0x6b5f5f(0x469)]['fillRect'](_0x3c866a,_0x3d1f00,_0x31d06e,_0x59ca7a,_0x2950e2['gaugeBackColor']()),this[_0x6b5f5f(0x469)]['gradientFillRect'](_0x1d52df+0x1,_0x3d1f00+0x1,_0x36d58f,_0x59ca7a-0x2,_0x311808,_0x610dc7);}else{if($gameTemp[_0x6b5f5f(0x1ca)]())console[_0x6b5f5f(0x312)](_0x5d5153);}}}return _0x1d4a1e;}else _0x4be007['x']=_0x1b108d[_0x6b5f5f(0x8c8)](_0x36242f['x']),_0x470b76['y']=_0x10672e[_0x6b5f5f(0x8c8)](_0x412f09['y']),_0x3f6e7a[_0x6b5f5f(0x3ea)]=_0x381741['round'](_0x586e9e[_0x6b5f5f(0x3ea)]),_0x36fa02['height']=_0x585d86[_0x6b5f5f(0x8c8)](_0x11676a[_0x6b5f5f(0x46b)]),this['initDigitGrouping'](),_0x52283e[_0x6b5f5f(0x9cf)][_0x6b5f5f(0x15e)][_0x6b5f5f(0x40b)](this,_0x3c8f98),this[_0x6b5f5f(0x17c)]();};return this[_0x4835d5(0x6fc)]()[_0x4835d5(0x490)](_0x23ba8f,0x0);},Game_BattlerBase[_0x161145(0x2d7)][_0x161145(0x776)]=function(_0x48fabe){const _0x598eb5=_0x161145,_0x4fce0e=(_0x4e0f55,_0x1b33f2)=>{const _0x5649d9=_0x34c4;if(!_0x1b33f2)return _0x4e0f55;if(_0x1b33f2[_0x5649d9(0x97f)][_0x5649d9(0x8f9)](VisuMZ[_0x5649d9(0x9cf)][_0x5649d9(0x255)]['sparamRate1'][_0x48fabe])){if('rlBUc'!==_0x5649d9(0x3f6)){var _0x41097a=Number(RegExp['$1'])/0x64;_0x4e0f55*=_0x41097a;}else{const _0x21a9c5=new _0x35772a();_0x21a9c5['x']=_0x12ee77['x'],_0x21a9c5['y']=_0x4dd381['y'],_0x21a9c5['z']=0x64;const _0x27a215=this['getPointAnimationLayer']();return _0x27a215['addChild'](_0x21a9c5),[_0x21a9c5];}}if(_0x1b33f2[_0x5649d9(0x97f)][_0x5649d9(0x8f9)](VisuMZ[_0x5649d9(0x9cf)]['RegExp'][_0x5649d9(0x732)][_0x48fabe])){var _0x41097a=Number(RegExp['$1']);_0x4e0f55*=_0x41097a;}if(_0x1b33f2[_0x5649d9(0x97f)][_0x5649d9(0x8f9)](VisuMZ[_0x5649d9(0x9cf)][_0x5649d9(0x255)]['sparamRateJS'][_0x48fabe])){if('jYzGG'!==_0x5649d9(0x3c2))_0x40d32e[_0x5649d9(0x9cf)][_0x5649d9(0x5df)]['call'](this),_0x2253fb[_0x5649d9(0x94f)](),this[_0x5649d9(0x52f)]();else{var _0x47ab4d=String(RegExp['$1']);try{_0x4e0f55*=eval(_0x47ab4d);}catch(_0x82e09){if('ZTheg'!==_0x5649d9(0x231))_0x226c68['pan']=_0x3b298e,_0x3bfb31[_0x5649d9(0x746)](_0x48aad1);else{if($gameTemp['isPlaytest']())console[_0x5649d9(0x312)](_0x82e09);}}}}return _0x4e0f55;};return this[_0x598eb5(0x6fc)]()['reduce'](_0x4fce0e,0x1);},Game_BattlerBase[_0x161145(0x2d7)]['sparamFlatBonus']=function(_0x1dc9d3){const _0x348bdb=_0x161145,_0x17aca2=(_0x56ae06,_0x4b7569)=>{const _0x537ff1=_0x34c4;if(!_0x4b7569)return _0x56ae06;if(_0x4b7569[_0x537ff1(0x97f)]['match'](VisuMZ['CoreEngine'][_0x537ff1(0x255)]['sparamFlat1'][_0x1dc9d3])){var _0x1ea3c6=Number(RegExp['$1'])/0x64;_0x56ae06+=_0x1ea3c6;}if(_0x4b7569[_0x537ff1(0x97f)][_0x537ff1(0x8f9)](VisuMZ['CoreEngine'][_0x537ff1(0x255)]['sparamFlat2'][_0x1dc9d3])){var _0x1ea3c6=Number(RegExp['$1']);_0x56ae06+=_0x1ea3c6;}if(_0x4b7569[_0x537ff1(0x97f)][_0x537ff1(0x8f9)](VisuMZ[_0x537ff1(0x9cf)][_0x537ff1(0x255)][_0x537ff1(0x4d4)][_0x1dc9d3])){var _0x2d0df6=String(RegExp['$1']);try{if(_0x537ff1(0x9c8)===_0x537ff1(0x49e)){const _0x414711=_0x537ff1(0x1a5);this[_0x537ff1(0x449)]=this[_0x537ff1(0x449)]||{};if(this['_colorCache'][_0x414711])return this[_0x537ff1(0x449)][_0x414711];const _0x18cac0=_0x37c103[_0x537ff1(0x9cf)][_0x537ff1(0x7a5)]['Color'][_0x537ff1(0x91c)];return this['getColorDataFromPluginParameters'](_0x414711,_0x18cac0);}else _0x56ae06+=eval(_0x2d0df6);}catch(_0x36c711){if($gameTemp[_0x537ff1(0x1ca)]())console[_0x537ff1(0x312)](_0x36c711);}}return _0x56ae06;};return this[_0x348bdb(0x6fc)]()[_0x348bdb(0x490)](_0x17aca2,0x0);},Game_BattlerBase[_0x161145(0x2d7)][_0x161145(0x944)]=function(_0x5ced3f){const _0x486d7a=_0x161145;let _0x413fe6=_0x486d7a(0x944)+_0x5ced3f+_0x486d7a(0x716);if(this[_0x486d7a(0x571)](_0x413fe6))return this[_0x486d7a(0x60f)][_0x413fe6];return this[_0x486d7a(0x60f)][_0x413fe6]=VisuMZ['CoreEngine'][_0x486d7a(0x7a5)]['Param'][_0x486d7a(0x6f8)][_0x486d7a(0x40b)](this,_0x5ced3f),this[_0x486d7a(0x60f)][_0x413fe6];},Game_BattlerBase[_0x161145(0x2d7)][_0x161145(0x187)]=function(_0x30cd9c,_0x166209){const _0x55b2c6=_0x161145;if(typeof paramId==='number')return this['param'](_0x30cd9c);_0x30cd9c=String(_0x30cd9c||'')[_0x55b2c6(0x7c3)]();if(_0x30cd9c===_0x55b2c6(0x419))return this[_0x55b2c6(0x762)](0x0);if(_0x30cd9c===_0x55b2c6(0x4e3))return this[_0x55b2c6(0x762)](0x1);if(_0x30cd9c===_0x55b2c6(0x888))return this[_0x55b2c6(0x762)](0x2);if(_0x30cd9c===_0x55b2c6(0x35c))return this['param'](0x3);if(_0x30cd9c===_0x55b2c6(0x609))return this['param'](0x4);if(_0x30cd9c===_0x55b2c6(0x31f))return this[_0x55b2c6(0x762)](0x5);if(_0x30cd9c===_0x55b2c6(0x6be))return this[_0x55b2c6(0x762)](0x6);if(_0x30cd9c==='LUK')return this[_0x55b2c6(0x762)](0x7);if(_0x30cd9c==='HIT')return _0x166209?String(Math[_0x55b2c6(0x8c8)](this[_0x55b2c6(0x684)](0x0)*0x64))+'%':this[_0x55b2c6(0x684)](0x0);if(_0x30cd9c===_0x55b2c6(0x995))return _0x166209?String(Math[_0x55b2c6(0x8c8)](this['xparam'](0x1)*0x64))+'%':this[_0x55b2c6(0x684)](0x1);if(_0x30cd9c==='CRI')return _0x166209?String(Math['round'](this[_0x55b2c6(0x684)](0x2)*0x64))+'%':this[_0x55b2c6(0x684)](0x2);if(_0x30cd9c===_0x55b2c6(0x74b))return _0x166209?String(Math[_0x55b2c6(0x8c8)](this['xparam'](0x3)*0x64))+'%':this[_0x55b2c6(0x684)](0x3);if(_0x30cd9c===_0x55b2c6(0x6fa))return _0x166209?String(Math[_0x55b2c6(0x8c8)](this['xparam'](0x4)*0x64))+'%':this[_0x55b2c6(0x684)](0x4);if(_0x30cd9c===_0x55b2c6(0x1d0))return _0x166209?String(Math[_0x55b2c6(0x8c8)](this[_0x55b2c6(0x684)](0x5)*0x64))+'%':this[_0x55b2c6(0x684)](0x5);if(_0x30cd9c===_0x55b2c6(0x7cc))return _0x166209?String(Math['round'](this['xparam'](0x6)*0x64))+'%':this[_0x55b2c6(0x684)](0x6);if(_0x30cd9c===_0x55b2c6(0x63b))return _0x166209?String(Math[_0x55b2c6(0x8c8)](this[_0x55b2c6(0x684)](0x7)*0x64))+'%':this[_0x55b2c6(0x684)](0x7);if(_0x30cd9c===_0x55b2c6(0x39e))return _0x166209?String(Math[_0x55b2c6(0x8c8)](this['xparam'](0x8)*0x64))+'%':this[_0x55b2c6(0x684)](0x8);if(_0x30cd9c===_0x55b2c6(0x6ff))return _0x166209?String(Math[_0x55b2c6(0x8c8)](this[_0x55b2c6(0x684)](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x30cd9c==='TGR')return _0x166209?String(Math[_0x55b2c6(0x8c8)](this[_0x55b2c6(0x944)](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x30cd9c===_0x55b2c6(0x1a0))return _0x166209?String(Math[_0x55b2c6(0x8c8)](this[_0x55b2c6(0x944)](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x30cd9c==='REC')return _0x166209?String(Math[_0x55b2c6(0x8c8)](this[_0x55b2c6(0x944)](0x2)*0x64))+'%':this['sparam'](0x2);if(_0x30cd9c===_0x55b2c6(0x59c))return _0x166209?String(Math['round'](this[_0x55b2c6(0x944)](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x30cd9c===_0x55b2c6(0x3d3))return _0x166209?String(Math[_0x55b2c6(0x8c8)](this[_0x55b2c6(0x944)](0x4)*0x64))+'%':this[_0x55b2c6(0x944)](0x4);if(_0x30cd9c===_0x55b2c6(0x20c))return _0x166209?String(Math[_0x55b2c6(0x8c8)](this['sparam'](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x30cd9c==='PDR')return _0x166209?String(Math[_0x55b2c6(0x8c8)](this[_0x55b2c6(0x944)](0x6)*0x64))+'%':this[_0x55b2c6(0x944)](0x6);if(_0x30cd9c===_0x55b2c6(0x7e8))return _0x166209?String(Math[_0x55b2c6(0x8c8)](this[_0x55b2c6(0x944)](0x7)*0x64))+'%':this[_0x55b2c6(0x944)](0x7);if(_0x30cd9c===_0x55b2c6(0x256))return _0x166209?String(Math[_0x55b2c6(0x8c8)](this['sparam'](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x30cd9c===_0x55b2c6(0x37a))return _0x166209?String(Math[_0x55b2c6(0x8c8)](this[_0x55b2c6(0x944)](0x9)*0x64))+'%':this[_0x55b2c6(0x944)](0x9);if(VisuMZ[_0x55b2c6(0x9cf)][_0x55b2c6(0x84c)][_0x30cd9c]){const _0x2fd722=VisuMZ[_0x55b2c6(0x9cf)][_0x55b2c6(0x84c)][_0x30cd9c],_0x198eaa=this[_0x2fd722];if(VisuMZ[_0x55b2c6(0x9cf)][_0x55b2c6(0x360)][_0x30cd9c]===_0x55b2c6(0x832)){if(_0x55b2c6(0x772)!=='czood')return _0x198eaa;else _0x5ac39c+='\x0a',_0x1ef429+=_0x24a1cb[_0x55b2c6(0x400)][0x0];}else return _0x166209?String(Math[_0x55b2c6(0x8c8)](_0x198eaa*0x64))+'%':_0x198eaa;}return'';},Game_BattlerBase[_0x161145(0x2d7)]['isDying']=function(){const _0x522bea=_0x161145;return this[_0x522bea(0x4d8)]()&&this[_0x522bea(0x5bd)]<this[_0x522bea(0x657)]*VisuMZ[_0x522bea(0x9cf)]['Settings'][_0x522bea(0x538)]['CrisisRate'];},Game_Battler[_0x161145(0x2d7)][_0x161145(0x6df)]=function(){const _0x4b37b4=_0x161145;SoundManager[_0x4b37b4(0x7a8)](),this[_0x4b37b4(0x1bd)](_0x4b37b4(0x5f0));},VisuMZ['CoreEngine']['Game_Actor_paramBase']=Game_Actor['prototype'][_0x161145(0x2e0)],Game_Actor[_0x161145(0x2d7)][_0x161145(0x2e0)]=function(_0x308936){const _0x59bd6c=_0x161145;if(this['level']>0x63)return this[_0x59bd6c(0x270)](_0x308936);return VisuMZ[_0x59bd6c(0x9cf)][_0x59bd6c(0x2f6)][_0x59bd6c(0x40b)](this,_0x308936);},Game_Actor['prototype']['paramBaseAboveLevel99']=function(_0x2cfd5a){const _0x1aaf25=_0x161145,_0x379443=this[_0x1aaf25(0x698)]()[_0x1aaf25(0x9a7)][_0x2cfd5a][0x63],_0x384a44=this[_0x1aaf25(0x698)]()['params'][_0x2cfd5a][0x62];return _0x379443+(_0x379443-_0x384a44)*(this[_0x1aaf25(0x75f)]-0x63);},VisuMZ['CoreEngine']['Game_Actor_changeClass']=Game_Actor[_0x161145(0x2d7)][_0x161145(0x1bf)],Game_Actor[_0x161145(0x2d7)][_0x161145(0x1bf)]=function(_0x59370c,_0x319d6d){const _0x16a883=_0x161145;$gameTemp['_changingClass']=!![],VisuMZ[_0x16a883(0x9cf)][_0x16a883(0x9ce)][_0x16a883(0x40b)](this,_0x59370c,_0x319d6d),$gameTemp['_changingClass']=undefined;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x22a)]=Game_Actor[_0x161145(0x2d7)]['levelUp'],Game_Actor[_0x161145(0x2d7)]['levelUp']=function(){const _0x13000d=_0x161145;VisuMZ['CoreEngine']['Game_Actor_levelUp'][_0x13000d(0x40b)](this);if(!$gameTemp[_0x13000d(0x931)])this[_0x13000d(0x71b)]();},Game_Actor[_0x161145(0x2d7)]['levelUpRecovery']=function(){const _0x2c8abb=_0x161145;this[_0x2c8abb(0x60f)]={};if(VisuMZ[_0x2c8abb(0x9cf)]['Settings'][_0x2c8abb(0x678)][_0x2c8abb(0x4fc)])this[_0x2c8abb(0x5bd)]=this[_0x2c8abb(0x657)];if(VisuMZ[_0x2c8abb(0x9cf)][_0x2c8abb(0x7a5)]['QoL']['LevelUpFullMp'])this[_0x2c8abb(0x1ee)]=this['mmp'];},Game_Actor[_0x161145(0x2d7)][_0x161145(0x6c4)]=function(){const _0x4397eb=_0x161145;if(this[_0x4397eb(0x26d)]())return 0x1;const _0x14d295=this['nextLevelExp']()-this['currentLevelExp'](),_0x14b952=this[_0x4397eb(0x323)]()-this['currentLevelExp']();return(_0x14b952/_0x14d295)[_0x4397eb(0x829)](0x0,0x1);},Game_Actor[_0x161145(0x2d7)]['traitObjects']=function(){const _0x421d48=_0x161145,_0x5e9e09=Game_Battler[_0x421d48(0x2d7)]['traitObjects']['call'](this);for(const _0x32fa39 of this[_0x421d48(0x348)]()){if(_0x32fa39){if(_0x421d48(0x472)===_0x421d48(0x472))_0x5e9e09[_0x421d48(0x31e)](_0x32fa39);else return _0x4597b8=_0x26cbd7['replace'](/(\d)/gi,(_0x2e40e4,_0x233916)=>_0x421d48(0x484)[_0x421d48(0x229)](_0x259efc(_0x233916))),_0x421d48(0x1c6)[_0x421d48(0x229)](_0x1e45ae,_0xd4f1bc,_0x286d83);}}return _0x5e9e09[_0x421d48(0x31e)](this[_0x421d48(0x698)](),this[_0x421d48(0x34c)]()),_0x5e9e09;},Object[_0x161145(0x5b5)](Game_Enemy['prototype'],'level',{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy[_0x161145(0x2d7)][_0x161145(0x701)]=function(){const _0x185d08=_0x161145;return this[_0x185d08(0x193)]()[_0x185d08(0x75f)];},Game_Enemy[_0x161145(0x2d7)][_0x161145(0x321)]=function(){const _0x4e02f8=_0x161145;!this['_repositioned']&&(this[_0x4e02f8(0x481)]+=Math[_0x4e02f8(0x8c8)]((Graphics[_0x4e02f8(0x46b)]-0x270)/0x2),this['_screenY']-=Math['floor']((Graphics[_0x4e02f8(0x46b)]-Graphics[_0x4e02f8(0x710)])/0x2),$gameSystem[_0x4e02f8(0x831)]()?this[_0x4e02f8(0x864)]-=Math[_0x4e02f8(0x7f2)]((Graphics['width']-Graphics['boxWidth'])/0x2):this['_screenX']+=Math[_0x4e02f8(0x8c8)]((Graphics[_0x4e02f8(0x402)]-0x330)/0x2)),this[_0x4e02f8(0x437)]=!![];},Game_Party['prototype']['maxGold']=function(){const _0x15a82d=_0x161145;return VisuMZ[_0x15a82d(0x9cf)][_0x15a82d(0x7a5)][_0x15a82d(0x50b)][_0x15a82d(0x67f)];},VisuMZ[_0x161145(0x9cf)][_0x161145(0x7f4)]=Game_Party[_0x161145(0x2d7)]['consumeItem'],Game_Party[_0x161145(0x2d7)]['consumeItem']=function(_0x56eacf){const _0x5a6fd3=_0x161145;if(VisuMZ[_0x5a6fd3(0x9cf)][_0x5a6fd3(0x7a5)]['QoL'][_0x5a6fd3(0x3b4)]&&DataManager[_0x5a6fd3(0x789)](_0x56eacf))return;VisuMZ['CoreEngine'][_0x5a6fd3(0x7f4)][_0x5a6fd3(0x40b)](this,_0x56eacf);},Game_Party[_0x161145(0x2d7)][_0x161145(0x533)]=function(){const _0x15b644=_0x161145,_0x1d37ae=VisuMZ['CoreEngine'][_0x15b644(0x7a5)]['QoL'],_0x5e7292=_0x1d37ae[_0x15b644(0x898)]??0x63;let _0x2d9ef5=[];(_0x1d37ae[_0x15b644(0x5ef)]??!![])&&(_0x2d9ef5=_0x2d9ef5[_0x15b644(0x28f)]($dataItems));if(_0x1d37ae[_0x15b644(0x4bf)]??!![]){if(_0x15b644(0x9c0)==='sZDxf')_0x2d9ef5=_0x2d9ef5['concat']($dataWeapons);else{const _0x41546e=_0x3c8a87[_0x15b644(0x726)]()[_0x15b644(0x753)]();for(const _0x34fcf3 in _0x444289[_0x15b644(0x9cf)]['ControllerMatches']){if(_0x41546e[_0x15b644(0x219)](_0x34fcf3)){const _0x1d5324=_0x53b9c9[_0x15b644(0x9cf)][_0x15b644(0x221)][_0x34fcf3],_0x8dedc5=_0x148018[_0x15b644(0x9cf)][_0x15b644(0x350)][_0x1d5324];return _0x8dedc5[_0x29240a]||this['getKeyboardInputButtonString'](_0xa8606e);}}return this['getKeyboardInputButtonString'](_0x3c2be8);}}if(_0x1d37ae[_0x15b644(0x4f3)]??!![]){if(_0x15b644(0x6b4)!==_0x15b644(0x74c))_0x2d9ef5=_0x2d9ef5['concat']($dataArmors);else{this['contents'][_0x15b644(0x557)]();if(_0x2b3450[_0x15b644(0x4bc)]()){const _0x8d92e1=this[_0x15b644(0x6ba)];this[_0x15b644(0x7a6)](0x0,0x0,_0x8d92e1,this[_0x15b644(0x986)]());const _0x34b795=this['textSizeEx'](_0x1e2758[_0x15b644(0x4bc)]())[_0x15b644(0x3ea)];this[_0x15b644(0x752)](_0x514476[_0x15b644(0x4bc)](),_0x206133[_0x15b644(0x7f2)]((_0x8d92e1-_0x34b795)/0x2),0x0);}}}for(const _0x5eb2f5 of _0x2d9ef5){if(_0x15b644(0x65d)!==_0x15b644(0x65d))this[_0x15b644(0x32b)](_0x5ee4a5);else{if(!_0x5eb2f5)continue;if(_0x5eb2f5[_0x15b644(0x618)][_0x15b644(0x753)]()<=0x0)continue;if(_0x5eb2f5[_0x15b644(0x618)][_0x15b644(0x8f9)](/-----/i))continue;this[_0x15b644(0x4d3)](_0x5eb2f5,_0x5e7292);}}},VisuMZ['CoreEngine'][_0x161145(0x3b3)]=Game_Troop[_0x161145(0x2d7)][_0x161145(0x935)],Game_Troop['prototype'][_0x161145(0x935)]=function(_0x3555ce){const _0x25114f=_0x161145;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0x25114f(0x16e)](_0x3555ce),VisuMZ[_0x25114f(0x9cf)][_0x25114f(0x3b3)][_0x25114f(0x40b)](this,_0x3555ce);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x2db)]=Game_Map[_0x161145(0x2d7)][_0x161145(0x935)],Game_Map[_0x161145(0x2d7)][_0x161145(0x935)]=function(_0xb576c2){const _0xe490ef=_0x161145;VisuMZ['CoreEngine'][_0xe490ef(0x2db)]['call'](this,_0xb576c2),this[_0xe490ef(0x884)](),this[_0xe490ef(0x371)](_0xb576c2);},Game_Map['prototype'][_0x161145(0x371)]=function(){const _0x343453=_0x161145;this[_0x343453(0x191)]=VisuMZ['CoreEngine'][_0x343453(0x7a5)][_0x343453(0x678)][_0x343453(0x71e)]||![];const _0x1e0c89=VisuMZ['CoreEngine'][_0x343453(0x7a5)]['ScreenResolution'],_0x456c77=$dataMap?$dataMap[_0x343453(0x97f)]||'':'';if(_0x456c77[_0x343453(0x8f9)](/<SHOW TILE SHADOWS>/i))this[_0x343453(0x191)]=![];else _0x456c77[_0x343453(0x8f9)](/<HIDE TILE SHADOWS>/i)&&(this[_0x343453(0x191)]=!![]);if(_0x456c77['match'](/<SCROLL LOCK X>/i))'lIFjU'==='pTRyt'?_0x183a3a[_0x343453(0x661)]():(this['centerCameraCheckData']()[_0x343453(0x5cc)]=!![],this[_0x343453(0x1cc)]()[_0x343453(0x5aa)]=_0x1e0c89[_0x343453(0x798)]);else{if(_0x456c77[_0x343453(0x8f9)](/<SCROLL LOCK X: (.*?)>/i)){if(_0x343453(0x939)===_0x343453(0x939))this[_0x343453(0x1cc)]()['centerX']=!![],this['centerCameraCheckData']()['displayX']=Number(RegExp['$1']);else{if(this[_0x343453(0x1cc)]()['centerX']&&_0x5a5f39[_0x343453(0x74d)]()===0x1){this[_0x343453(0x162)]=this['centerCameraCheckData']()[_0x343453(0x5aa)];return;}_0x3a3b4b['CoreEngine'][_0x343453(0x268)][_0x343453(0x40b)](this,_0x2951c0);}}}if(_0x456c77[_0x343453(0x8f9)](/<SCROLL LOCK Y>/i))this[_0x343453(0x1cc)]()[_0x343453(0x2c9)]=!![],this[_0x343453(0x1cc)]()[_0x343453(0x79e)]=_0x1e0c89[_0x343453(0x796)];else _0x456c77[_0x343453(0x8f9)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x343453(0x1cc)]()['centerY']=!![],this['centerCameraCheckData']()[_0x343453(0x79e)]=Number(RegExp['$1']));},Game_Map[_0x161145(0x2d7)][_0x161145(0x92a)]=function(){const _0x3343b9=_0x161145;if(this[_0x3343b9(0x191)]===undefined)this[_0x3343b9(0x371)]();return this[_0x3343b9(0x191)];},Game_Map[_0x161145(0x2d7)][_0x161145(0x884)]=function(){const _0x10cee2=_0x161145,_0x471aca=VisuMZ[_0x10cee2(0x9cf)][_0x10cee2(0x7a5)][_0x10cee2(0x492)];this[_0x10cee2(0x1f2)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x471aca[_0x10cee2(0x873)]){const _0x2a0317=Graphics[_0x10cee2(0x3ea)]/this[_0x10cee2(0x9b8)]();_0x2a0317%0x1!==0x0&&Math['ceil'](_0x2a0317)===this[_0x10cee2(0x3ea)]()&&!this['isLoopHorizontal']()&&(this[_0x10cee2(0x1f2)][_0x10cee2(0x5cc)]=!![],this[_0x10cee2(0x1f2)][_0x10cee2(0x5aa)]=_0x471aca[_0x10cee2(0x798)]||0x0);}if(_0x471aca[_0x10cee2(0x619)]){const _0x52b273=Graphics[_0x10cee2(0x46b)]/this[_0x10cee2(0x79a)]();_0x52b273%0x1!==0x0&&Math['ceil'](_0x52b273)===this['height']()&&!this[_0x10cee2(0x830)]()&&(_0x10cee2(0x879)!==_0x10cee2(0x783)?(this[_0x10cee2(0x1f2)]['centerY']=!![],this[_0x10cee2(0x1f2)]['displayY']=_0x471aca[_0x10cee2(0x796)]||0x0):this[_0x10cee2(0x941)]()?this[_0x10cee2(0x214)]():_0x323218[_0x10cee2(0x9cf)][_0x10cee2(0x6b7)][_0x10cee2(0x40b)](this));}},Game_Map['prototype']['centerCameraCheckData']=function(){if(this['_centerCameraCheck']===undefined)this['checkCoreEngineDisplayCenter']();return this['_centerCameraCheck'];},VisuMZ[_0x161145(0x9cf)][_0x161145(0x6dc)]=Game_Map[_0x161145(0x2d7)][_0x161145(0x9af)],Game_Map[_0x161145(0x2d7)][_0x161145(0x9af)]=function(_0x4be072){const _0x7fcddc=_0x161145;if(this['centerCameraCheckData']()[_0x7fcddc(0x2c9)]&&$gameScreen['zoomScale']()===0x1){this[_0x7fcddc(0x9a5)]=this[_0x7fcddc(0x1cc)]()[_0x7fcddc(0x79e)];return;}VisuMZ[_0x7fcddc(0x9cf)][_0x7fcddc(0x6dc)][_0x7fcddc(0x40b)](this,_0x4be072);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x71f)]=Game_Map[_0x161145(0x2d7)]['scrollLeft'],Game_Map[_0x161145(0x2d7)][_0x161145(0x9a4)]=function(_0xb90c58){const _0xc8f46e=_0x161145;if(this[_0xc8f46e(0x1cc)]()[_0xc8f46e(0x5cc)]&&$gameScreen['zoomScale']()===0x1){this[_0xc8f46e(0x162)]=this[_0xc8f46e(0x1cc)]()[_0xc8f46e(0x5aa)];return;}VisuMZ[_0xc8f46e(0x9cf)][_0xc8f46e(0x71f)][_0xc8f46e(0x40b)](this,_0xb90c58);},VisuMZ[_0x161145(0x9cf)]['Game_Map_scrollRight']=Game_Map[_0x161145(0x2d7)][_0x161145(0x510)],Game_Map[_0x161145(0x2d7)][_0x161145(0x510)]=function(_0x5ad5dd){const _0x386e12=_0x161145;if(this[_0x386e12(0x1cc)]()[_0x386e12(0x5cc)]&&$gameScreen['zoomScale']()===0x1){if(_0x386e12(0x29d)===_0x386e12(0x7c5))_0x3220a6+=_0x2ee0de+'\x0a',_0x4fda8c+='》Comment《\x0a%1\x0a'[_0x386e12(0x229)](_0x9a5af5['parameters'][0x0]);else{this[_0x386e12(0x162)]=this[_0x386e12(0x1cc)]()['displayX'];return;}}VisuMZ[_0x386e12(0x9cf)][_0x386e12(0x268)][_0x386e12(0x40b)](this,_0x5ad5dd);},VisuMZ[_0x161145(0x9cf)]['Game_Map_scrollUp']=Game_Map['prototype'][_0x161145(0x236)],Game_Map['prototype'][_0x161145(0x236)]=function(_0x25f5b2){const _0x408404=_0x161145;if(this[_0x408404(0x1cc)]()[_0x408404(0x2c9)]&&$gameScreen[_0x408404(0x74d)]()===0x1){this[_0x408404(0x9a5)]=this[_0x408404(0x1cc)]()['displayY'];return;}VisuMZ[_0x408404(0x9cf)][_0x408404(0x7dc)][_0x408404(0x40b)](this,_0x25f5b2);},VisuMZ[_0x161145(0x9cf)]['Game_Character_processMoveCommand']=Game_Character[_0x161145(0x2d7)]['processMoveCommand'],Game_Character[_0x161145(0x2d7)][_0x161145(0x67a)]=function(_0x596afe){const _0x2cc07c=_0x161145;try{_0x2cc07c(0x708)===_0x2cc07c(0x73b)?this['_drawTextShadow'](_0x236ee2,_0x47cfe2,_0x8da407,_0x2a0c73):VisuMZ[_0x2cc07c(0x9cf)]['Game_Character_processMoveCommand'][_0x2cc07c(0x40b)](this,_0x596afe);}catch(_0x1a2200){if($gameTemp[_0x2cc07c(0x1ca)]())console[_0x2cc07c(0x312)](_0x1a2200);}},Game_Player[_0x161145(0x2d7)][_0x161145(0x45c)]=function(){const _0x286540=_0x161145,_0x39690c=$gameMap[_0x286540(0x380)]();this[_0x286540(0x907)]=Math[_0x286540(0x1b2)](_0x39690c)+Math[_0x286540(0x1b2)](_0x39690c)+this['encounterStepsMinimum']();},Game_Player[_0x161145(0x2d7)][_0x161145(0x86e)]=function(){const _0x1eadd0=_0x161145;if($dataMap&&$dataMap[_0x1eadd0(0x97f)]&&$dataMap[_0x1eadd0(0x97f)][_0x1eadd0(0x8f9)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)){if('UPTrO'!==_0x1eadd0(0x8c0))this[_0x1eadd0(0x992)]=_0x1eadd0(0x55e);else return Number(RegExp['$1']);}else return _0x1eadd0(0x3e9)!==_0x1eadd0(0x3e9)?_0x295efd(_0x5e0964['$1']):VisuMZ[_0x1eadd0(0x9cf)][_0x1eadd0(0x7a5)]['QoL'][_0x1eadd0(0x7b4)];},VisuMZ[_0x161145(0x9cf)][_0x161145(0x628)]=Game_Event[_0x161145(0x2d7)][_0x161145(0x406)],Game_Event['prototype']['isCollidedWithEvents']=function(_0x207bfe,_0x43c3e9){const _0x2b1914=_0x161145;if(this['isSmartEventCollisionOn']())return this['checkSmartEventCollision'](_0x207bfe,_0x43c3e9);else{if('xXGBv'===_0x2b1914(0x6e2))this[_0x2b1914(0x3c0)]&&this[_0x2b1914(0x3c0)][_0x2b1914(0x6ce)](_0x3c7b86[_0x2b1914(0x466)]['HelpBgType']),this['_listWindow']&&this[_0x2b1914(0x4fe)][_0x2b1914(0x6ce)](_0x787a48[_0x2b1914(0x466)]['ListBgType']);else return VisuMZ['CoreEngine'][_0x2b1914(0x628)][_0x2b1914(0x40b)](this,_0x207bfe,_0x43c3e9);}},Game_Event[_0x161145(0x2d7)][_0x161145(0x3f4)]=function(){const _0x286aa8=_0x161145;return VisuMZ[_0x286aa8(0x9cf)][_0x286aa8(0x7a5)][_0x286aa8(0x678)][_0x286aa8(0x65b)];},Game_Event[_0x161145(0x2d7)][_0x161145(0x40c)]=function(_0x462a92,_0x41fb0f){const _0x235a00=_0x161145;if(!this[_0x235a00(0x9a1)]())return![];else{const _0x32719b=$gameMap[_0x235a00(0x19b)](_0x462a92,_0x41fb0f)[_0x235a00(0x1a8)](_0xb0e9cc=>_0xb0e9cc['isNormalPriority']());return _0x32719b['length']>0x0;}},VisuMZ[_0x161145(0x9cf)][_0x161145(0x38a)]=Game_Interpreter[_0x161145(0x2d7)][_0x161145(0x575)],Game_Interpreter['prototype'][_0x161145(0x575)]=function(_0x1a0e2f){const _0x434ccf=_0x161145,_0x32499a=this['getCombinedScrollingText']();if(_0x32499a[_0x434ccf(0x8f9)](/\/\/[ ]SCRIPT[ ]CALL/i)){if(_0x434ccf(0x66b)!=='rOlMa'){var _0x20219c=_0x1b46c7(_0x1f2f9b['$1']);try{_0x111d77*=_0x3df1e5(_0x20219c);}catch(_0xe2a6d4){if(_0x5e1d36[_0x434ccf(0x1ca)]())_0x1aca08['log'](_0xe2a6d4);}}else return this[_0x434ccf(0x317)](_0x32499a);}else return VisuMZ[_0x434ccf(0x9cf)][_0x434ccf(0x38a)]['call'](this,_0x1a0e2f);},Game_Interpreter[_0x161145(0x2d7)][_0x161145(0x1d9)]=function(){const _0x331523=_0x161145;let _0xdea5e9='',_0x49c943=this['_index']+0x1;while(this[_0x331523(0x233)][_0x49c943]&&this['_list'][_0x49c943][_0x331523(0x516)]===0x195){_0xdea5e9+=this[_0x331523(0x233)][_0x49c943]['parameters'][0x0]+'\x0a',_0x49c943++;}return _0xdea5e9;},Game_Interpreter[_0x161145(0x2d7)][_0x161145(0x317)]=function(_0x55dbc6){const _0x13d2ed=_0x161145;try{if('NavAK'==='QoZkk'){_0x318754[_0x13d2ed(0x9cf)]['Sprite_AnimationMV_updatePosition'][_0x13d2ed(0x40b)](this);if(this[_0x13d2ed(0x8b1)][_0x13d2ed(0x2d9)]===0x3){if(this['x']===0x0)this['x']=_0x29f1ca[_0x13d2ed(0x8c8)](_0x4e7bb3[_0x13d2ed(0x3ea)]/0x2);if(this['y']===0x0)this['y']=_0x3cef30[_0x13d2ed(0x8c8)](_0x38729e[_0x13d2ed(0x46b)]/0x2);}}else eval(_0x55dbc6);}catch(_0x5888cc){if(_0x13d2ed(0x630)===_0x13d2ed(0x344))return _0x18fbb9[_0x13d2ed(0x466)][_0x13d2ed(0x622)][_0x13d2ed(0x40b)](this);else{if($gameTemp['isPlaytest']()){if(_0x13d2ed(0x450)===_0x13d2ed(0x450))console[_0x13d2ed(0x312)]('Show\x20Scrolling\x20Text\x20Script\x20Error'),console[_0x13d2ed(0x312)](_0x5888cc);else return _0x227e63&&_0x24017a[_0x13d2ed(0x988)]?_0x353fd1[_0x13d2ed(0x988)][_0x13d2ed(0x721)]():!![];}}}return!![];},VisuMZ[_0x161145(0x9cf)][_0x161145(0x1ff)]=Game_Interpreter[_0x161145(0x2d7)][_0x161145(0x73d)],Game_Interpreter[_0x161145(0x2d7)][_0x161145(0x73d)]=function(_0x291c8d){const _0x38ffb3=_0x161145;try{VisuMZ[_0x38ffb3(0x9cf)][_0x38ffb3(0x1ff)][_0x38ffb3(0x40b)](this,_0x291c8d);}catch(_0x323425){_0x38ffb3(0x42e)!==_0x38ffb3(0x502)?($gameTemp[_0x38ffb3(0x1ca)]()&&(console[_0x38ffb3(0x312)]('Conditional\x20Branch\x20Script\x20Error'),console['log'](_0x323425)),this[_0x38ffb3(0x4a0)]()):this[_0x38ffb3(0x89b)]('keyboard');}return!![];},VisuMZ[_0x161145(0x9cf)][_0x161145(0x1f5)]=Game_Interpreter[_0x161145(0x2d7)][_0x161145(0x4e9)],Game_Interpreter['prototype']['command122']=function(_0xc480b5){const _0x188045=_0x161145;try{if(_0x188045(0x82a)!==_0x188045(0x82a))return this['helpAreaBottom']();else VisuMZ[_0x188045(0x9cf)]['Game_Interpreter_command122']['call'](this,_0xc480b5);}catch(_0x33e6d6){$gameTemp[_0x188045(0x1ca)]()&&(console[_0x188045(0x312)](_0x188045(0x283)),console[_0x188045(0x312)](_0x33e6d6));}return!![];},VisuMZ['CoreEngine']['Game_Interpreter_command355']=Game_Interpreter[_0x161145(0x2d7)][_0x161145(0x19a)],Game_Interpreter[_0x161145(0x2d7)][_0x161145(0x19a)]=function(){const _0x31f88c=_0x161145;try{if('QBXym'!=='QBXym'){if(_0x542462[_0x1fb1be][_0x31f88c(0x45a)])return!![];}else VisuMZ['CoreEngine'][_0x31f88c(0x2b8)][_0x31f88c(0x40b)](this);}catch(_0x2835c4){if(_0x31f88c(0x72a)!==_0x31f88c(0x72a))return![];else{if($gameTemp[_0x31f88c(0x1ca)]()){if(_0x31f88c(0x7c7)===_0x31f88c(0x786)){const _0x26a284=_0x93f071[_0x31f88c(0x3ea)]-_0xb4cbca[_0x31f88c(0x402)]-_0x5e9641['CoreEngine'][_0x31f88c(0x7a5)]['UI'][_0x31f88c(0x896)]*0x2,_0x2f954c=_0x569b87[_0x31f88c(0x2d7)][_0x31f88c(0x904)][_0x31f88c(0x40b)](this)*0x4;if(_0x26a284>=_0x2f954c)_0x64faa1[_0x31f88c(0x863)](!![]);}else console['log']('Script\x20Call\x20Error'),console['log'](_0x2835c4);}}}return!![];},VisuMZ['CoreEngine'][_0x161145(0x592)]=Game_Interpreter['prototype'][_0x161145(0x178)],Game_Interpreter[_0x161145(0x2d7)][_0x161145(0x178)]=function(_0x5a75e5){const _0x48198b=_0x161145;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x48198b(0x9cf)]['Game_Interpreter_PluginCommand'][_0x48198b(0x40b)](this,_0x5a75e5);},Scene_Base['prototype']['fadeSpeed']=function(){const _0x392034=_0x161145;return VisuMZ[_0x392034(0x9cf)][_0x392034(0x7a5)]['UI'][_0x392034(0x1c3)];},Scene_Base['prototype']['isBottomHelpMode']=function(){const _0x5a5df5=_0x161145;return VisuMZ[_0x5a5df5(0x9cf)][_0x5a5df5(0x7a5)]['UI']['BottomHelp'];},Scene_Base[_0x161145(0x2d7)]['isBottomButtonMode']=function(){const _0x27d328=_0x161145;return VisuMZ[_0x27d328(0x9cf)]['Settings']['UI'][_0x27d328(0x218)];},Scene_Base[_0x161145(0x2d7)][_0x161145(0x75d)]=function(){const _0x579f5b=_0x161145;return VisuMZ[_0x579f5b(0x9cf)][_0x579f5b(0x7a5)]['UI'][_0x579f5b(0x891)];},Scene_Base[_0x161145(0x2d7)]['mainCommandWidth']=function(){const _0x19b91d=_0x161145;return VisuMZ[_0x19b91d(0x9cf)]['Settings']['UI'][_0x19b91d(0x95d)];},Scene_Base['prototype'][_0x161145(0x9a3)]=function(){const _0xbd336c=_0x161145;return VisuMZ[_0xbd336c(0x9cf)][_0xbd336c(0x7a5)]['UI'][_0xbd336c(0x389)];},Scene_Base[_0x161145(0x2d7)][_0x161145(0x721)]=function(){const _0xf4268d=_0x161145;return VisuMZ[_0xf4268d(0x9cf)][_0xf4268d(0x7a5)][_0xf4268d(0x651)][_0xf4268d(0x4ea)];},VisuMZ['CoreEngine'][_0x161145(0x30d)]=Scene_Base[_0x161145(0x2d7)][_0x161145(0x34b)],Scene_Base[_0x161145(0x2d7)][_0x161145(0x34b)]=function(){const _0x156500=_0x161145;VisuMZ['CoreEngine']['Scene_Base_createWindowLayer']['call'](this),this['createButtonAssistWindow'](),this[_0x156500(0x46f)]['x']=Math[_0x156500(0x8c8)](this[_0x156500(0x46f)]['x']),this[_0x156500(0x46f)]['y']=Math[_0x156500(0x8c8)](this[_0x156500(0x46f)]['y']);},Scene_Base[_0x161145(0x2d7)]['createButtonAssistWindow']=function(){},Scene_Base[_0x161145(0x2d7)][_0x161145(0x9a8)]=function(){const _0x2fb9cc=_0x161145;return TextManager[_0x2fb9cc(0x73e)]('pageup',_0x2fb9cc(0x21d));},Scene_Base[_0x161145(0x2d7)][_0x161145(0x6f2)]=function(){const _0x1cf1d7=_0x161145;return TextManager[_0x1cf1d7(0x705)]('tab');},Scene_Base['prototype'][_0x161145(0x5f8)]=function(){const _0x231d59=_0x161145;return TextManager['getInputButtonString'](_0x231d59(0x33e));},Scene_Base[_0x161145(0x2d7)]['buttonAssistKey4']=function(){const _0x57eeed=_0x161145;return TextManager[_0x57eeed(0x705)]('ok');},Scene_Base['prototype'][_0x161145(0x600)]=function(){const _0x213cbf=_0x161145;return TextManager[_0x213cbf(0x705)]('cancel');},Scene_Base[_0x161145(0x2d7)][_0x161145(0x366)]=function(){const _0x29eb30=_0x161145;return this[_0x29eb30(0x3eb)]&&this['_pageupButton']['visible']?TextManager[_0x29eb30(0x5a0)]:'';},Scene_Base[_0x161145(0x2d7)][_0x161145(0x82d)]=function(){return'';},Scene_Base[_0x161145(0x2d7)][_0x161145(0x2d4)]=function(){return'';},Scene_Base[_0x161145(0x2d7)][_0x161145(0x179)]=function(){const _0xf2d21c=_0x161145;return TextManager[_0xf2d21c(0x626)];},Scene_Base[_0x161145(0x2d7)][_0x161145(0x2a9)]=function(){const _0x5b075d=_0x161145;return TextManager[_0x5b075d(0x77a)];},Scene_Base['prototype'][_0x161145(0x7ab)]=function(){return 0x0;},Scene_Base['prototype'][_0x161145(0x712)]=function(){return 0x0;},Scene_Base[_0x161145(0x2d7)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base['prototype'][_0x161145(0x5ec)]=function(){return 0x0;},Scene_Base[_0x161145(0x2d7)]['buttonAssistOffset5']=function(){return 0x0;},VisuMZ['CoreEngine'][_0x161145(0x866)]=Scene_Boot[_0x161145(0x2d7)]['loadSystemImages'],Scene_Boot[_0x161145(0x2d7)][_0x161145(0x954)]=function(){const _0x27fd79=_0x161145;VisuMZ[_0x27fd79(0x9cf)][_0x27fd79(0x866)][_0x27fd79(0x40b)](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x161145(0x2d7)][_0x161145(0x58b)]=function(){const _0x587808=_0x161145,_0x1155f2=['animations',_0x587808(0x910),_0x587808(0x37b),_0x587808(0x828),_0x587808(0x852),'faces',_0x587808(0x249),'pictures',_0x587808(0x602),_0x587808(0x201),'system',_0x587808(0x673),_0x587808(0x9a0),'titles2'];for(const _0x49a546 of _0x1155f2){if(_0x587808(0x2cb)===_0x587808(0x765)){if(_0x2a8e6d[_0x587808(0x38b)]())return![];return this[_0x587808(0x618)]()&&this[_0x587808(0x618)]()[_0x587808(0x6cd)](0x0)==='!';}else{const _0x332eb6=VisuMZ[_0x587808(0x9cf)]['Settings'][_0x587808(0x2c7)][_0x49a546],_0x1ff567='img/%1/'['format'](_0x49a546);for(const _0x343a47 of _0x332eb6){ImageManager[_0x587808(0x3ff)](_0x1ff567,_0x343a47);}}}},VisuMZ['CoreEngine'][_0x161145(0x357)]=Scene_Boot[_0x161145(0x2d7)]['startNormalGame'],Scene_Boot[_0x161145(0x2d7)][_0x161145(0x699)]=function(){const _0xc7bda6=_0x161145;Utils['isOptionValid'](_0xc7bda6(0x2c5))&&VisuMZ[_0xc7bda6(0x9cf)]['Settings'][_0xc7bda6(0x678)]['NewGameBoot']?this[_0xc7bda6(0x9a6)]():VisuMZ[_0xc7bda6(0x9cf)][_0xc7bda6(0x357)][_0xc7bda6(0x40b)](this);},Scene_Boot[_0x161145(0x2d7)][_0x161145(0x9a6)]=function(){const _0x50f538=_0x161145;DataManager['setupNewGame'](),SceneManager[_0x50f538(0x271)](Scene_Map);},Scene_Boot[_0x161145(0x2d7)][_0x161145(0x948)]=function(){const _0x111961=_0x161145,_0xbe8d5d=$dataSystem[_0x111961(0x930)][_0x111961(0x27f)],_0x63ea41=$dataSystem[_0x111961(0x930)]['uiAreaHeight'],_0x463b66=VisuMZ['CoreEngine']['Settings']['UI'][_0x111961(0x896)];Graphics[_0x111961(0x402)]=_0xbe8d5d-_0x463b66*0x2,Graphics[_0x111961(0x710)]=_0x63ea41-_0x463b66*0x2,this[_0x111961(0x2ce)]();},VisuMZ[_0x161145(0x9cf)]['Scene_Boot_updateDocumentTitle']=Scene_Boot[_0x161145(0x2d7)][_0x161145(0x96d)],Scene_Boot['prototype'][_0x161145(0x96d)]=function(){const _0x5311ca=_0x161145;if(this[_0x5311ca(0x996)]()){if(_0x5311ca(0x22f)===_0x5311ca(0x22f))this[_0x5311ca(0x22d)]();else return this[_0x5311ca(0x60f)]=this['_cache']||{},this[_0x5311ca(0x60f)][_0x489956]!==_0x39f3fb;}else VisuMZ[_0x5311ca(0x9cf)][_0x5311ca(0x3c3)]['call'](this);},Scene_Boot[_0x161145(0x2d7)]['isFullDocumentTitle']=function(){const _0x18db76=_0x161145;if(Scene_Title[_0x18db76(0x42c)]==='')return![];if(Scene_Title[_0x18db76(0x42c)]==='Subtitle')return![];if(Scene_Title['version']==='')return![];if(Scene_Title[_0x18db76(0x3f8)]===_0x18db76(0x825))return![];return!![];},Scene_Boot[_0x161145(0x2d7)][_0x161145(0x22d)]=function(){const _0x28d861=_0x161145,_0xff1fb9=$dataSystem[_0x28d861(0x917)],_0x256433=Scene_Title[_0x28d861(0x42c)]||'',_0x2ec65f=Scene_Title[_0x28d861(0x3f8)]||'',_0x136e06=VisuMZ[_0x28d861(0x9cf)][_0x28d861(0x7a5)][_0x28d861(0x911)]['Title'][_0x28d861(0x7df)],_0x14a3e2=_0x136e06['format'](_0xff1fb9,_0x256433,_0x2ec65f);document[_0x28d861(0x267)]=_0x14a3e2;},Scene_Boot[_0x161145(0x2d7)][_0x161145(0x2ce)]=function(){const _0x4201f2=_0x161145;if(VisuMZ[_0x4201f2(0x9cf)][_0x4201f2(0x7a5)]['UI'][_0x4201f2(0x927)]){const _0x272879=Graphics['width']-Graphics['boxWidth']-VisuMZ['CoreEngine']['Settings']['UI'][_0x4201f2(0x896)]*0x2,_0x350006=Sprite_Button[_0x4201f2(0x2d7)][_0x4201f2(0x904)][_0x4201f2(0x40b)](this)*0x4;if(_0x272879>=_0x350006)SceneManager[_0x4201f2(0x863)](!![]);}},Scene_Title[_0x161145(0x42c)]=VisuMZ[_0x161145(0x9cf)][_0x161145(0x7a5)][_0x161145(0x911)][_0x161145(0x391)][_0x161145(0x1cb)],Scene_Title[_0x161145(0x3f8)]=VisuMZ[_0x161145(0x9cf)][_0x161145(0x7a5)]['MenuLayout'][_0x161145(0x391)][_0x161145(0x26a)],Scene_Title[_0x161145(0x79d)]=VisuMZ['CoreEngine']['Settings'][_0x161145(0x7bc)],VisuMZ[_0x161145(0x9cf)][_0x161145(0x482)]=Scene_Title['prototype'][_0x161145(0x3e4)],Scene_Title[_0x161145(0x2d7)][_0x161145(0x3e4)]=function(){const _0x36753a=_0x161145;VisuMZ[_0x36753a(0x9cf)][_0x36753a(0x7a5)][_0x36753a(0x911)][_0x36753a(0x391)][_0x36753a(0x3e4)]['call'](this);if(Scene_Title[_0x36753a(0x42c)]!==''&&Scene_Title[_0x36753a(0x42c)]!==_0x36753a(0x1cb))this[_0x36753a(0x31b)]();if(Scene_Title[_0x36753a(0x3f8)]!==''&&Scene_Title[_0x36753a(0x3f8)]!=='0.00')this[_0x36753a(0x971)]();},Scene_Title[_0x161145(0x2d7)][_0x161145(0x31b)]=function(){const _0x5ef2a5=_0x161145;VisuMZ[_0x5ef2a5(0x9cf)]['Settings']['MenuLayout']['Title'][_0x5ef2a5(0x31b)][_0x5ef2a5(0x40b)](this);},Scene_Title['prototype']['drawGameVersion']=function(){const _0x3ae168=_0x161145;VisuMZ[_0x3ae168(0x9cf)][_0x3ae168(0x7a5)][_0x3ae168(0x911)]['Title']['drawGameVersion']['call'](this);},Scene_Title['prototype'][_0x161145(0x966)]=function(){const _0x2ff4f5=_0x161145;this[_0x2ff4f5(0x56d)]();const _0x245d16=$dataSystem['titleCommandWindow']['background'],_0xb54f6c=this[_0x2ff4f5(0x613)]();this[_0x2ff4f5(0x2fc)]=new Window_TitleCommand(_0xb54f6c),this[_0x2ff4f5(0x2fc)][_0x2ff4f5(0x6ce)](_0x245d16);const _0x44fa3a=this['commandWindowRect']();this[_0x2ff4f5(0x2fc)]['move'](_0x44fa3a['x'],_0x44fa3a['y'],_0x44fa3a[_0x2ff4f5(0x3ea)],_0x44fa3a[_0x2ff4f5(0x46b)]),this['addWindow'](this[_0x2ff4f5(0x2fc)]);},Scene_Title[_0x161145(0x2d7)][_0x161145(0x943)]=function(){const _0x151591=_0x161145;if(this[_0x151591(0x2fc)]){if('uhpgc'===_0x151591(0x22b))_0x4c4bd0['_changingClass']=!![],_0x51f266['CoreEngine']['Game_Actor_changeClass'][_0x151591(0x40b)](this,_0x18a343,_0x232a0a),_0x5d28ed['_changingClass']=_0x362e99;else return this['_commandWindow'][_0x151591(0x60c)]();}else{if('IzmiP'==='DZaFh')this[_0x151591(0x2fc)]['setBackgroundType'](_0xeee117[_0x151591(0x466)][_0x151591(0x840)]);else return VisuMZ[_0x151591(0x9cf)][_0x151591(0x7a5)][_0x151591(0x82f)][_0x151591(0x300)];}},Scene_Title[_0x161145(0x2d7)]['commandWindowRect']=function(){const _0x10a4e3=_0x161145;return VisuMZ['CoreEngine'][_0x10a4e3(0x7a5)][_0x10a4e3(0x911)][_0x10a4e3(0x391)][_0x10a4e3(0x454)][_0x10a4e3(0x40b)](this);},Scene_Title[_0x161145(0x2d7)]['createTitleButtons']=function(){const _0x1b0622=_0x161145;for(const _0xaee1b2 of Scene_Title['pictureButtons']){const _0x5c9e52=new Sprite_TitlePictureButton(_0xaee1b2);this[_0x1b0622(0x784)](_0x5c9e52);}},VisuMZ[_0x161145(0x9cf)][_0x161145(0x5df)]=Scene_Map[_0x161145(0x2d7)][_0x161145(0x4fb)],Scene_Map['prototype'][_0x161145(0x4fb)]=function(){const _0x19efff=_0x161145;VisuMZ[_0x19efff(0x9cf)][_0x19efff(0x5df)]['call'](this),$gameTemp[_0x19efff(0x94f)](),this[_0x19efff(0x52f)]();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x89e)]=Scene_Map[_0x161145(0x2d7)][_0x161145(0x51b)],Scene_Map[_0x161145(0x2d7)]['updateMainMultiply']=function(){const _0xc97802=_0x161145;VisuMZ[_0xc97802(0x9cf)][_0xc97802(0x89e)][_0xc97802(0x40b)](this),$gameTemp['_playTestFastMode']&&!$gameMessage[_0xc97802(0x63f)]()&&('BIEKb'!==_0xc97802(0x909)?(this[_0xc97802(0x2b0)](),SceneManager[_0xc97802(0x51e)]()):_0x289397[_0xc97802(0x3b2)]());},Scene_Map[_0x161145(0x2d7)][_0x161145(0x341)]=function(){const _0x16f13e=_0x161145;Scene_Message[_0x16f13e(0x2d7)][_0x16f13e(0x341)][_0x16f13e(0x40b)](this),!SceneManager['isNextScene'](Scene_Battle)&&(this[_0x16f13e(0x514)][_0x16f13e(0x361)](),this[_0x16f13e(0x794)][_0x16f13e(0x83d)](),this['_windowLayer'][_0x16f13e(0x949)]=![],SceneManager['snapForBackground']()),$gameScreen[_0x16f13e(0x681)](),this[_0x16f13e(0x52f)]();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x71d)]=Scene_Map[_0x161145(0x2d7)][_0x161145(0x81e)],Scene_Map[_0x161145(0x2d7)]['createMenuButton']=function(){const _0x3ccc91=_0x161145;VisuMZ[_0x3ccc91(0x9cf)][_0x3ccc91(0x71d)][_0x3ccc91(0x40b)](this),SceneManager[_0x3ccc91(0x15f)]()&&this[_0x3ccc91(0x5f5)]();},Scene_Map['prototype'][_0x161145(0x5f5)]=function(){this['_menuButton']['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x7c4)]=Scene_Map[_0x161145(0x2d7)][_0x161145(0x397)],Scene_Map[_0x161145(0x2d7)]['updateScene']=function(){const _0x262a44=_0x161145;VisuMZ[_0x262a44(0x9cf)]['Scene_Map_updateScene'][_0x262a44(0x40b)](this),this[_0x262a44(0x78d)]();},Scene_Map[_0x161145(0x2d7)][_0x161145(0x78d)]=function(){const _0x140642=_0x161145;if(Input[_0x140642(0x645)]('dashToggle')){if('qWZTT'!==_0x140642(0x1c1))ConfigManager[_0x140642(0x872)]=!ConfigManager[_0x140642(0x872)],ConfigManager[_0x140642(0x272)]();else return _0x38f621[_0x140642(0x466)]['ItemRect'][_0x140642(0x40b)](this);}},VisuMZ[_0x161145(0x9cf)][_0x161145(0x6c0)]=Scene_Map[_0x161145(0x2d7)][_0x161145(0x2b0)],Scene_Map[_0x161145(0x2d7)][_0x161145(0x2b0)]=function(){const _0x293edb=_0x161145;VisuMZ[_0x293edb(0x9cf)][_0x293edb(0x6c0)][_0x293edb(0x40b)](this),this['updateOnceParallelInterpreters']();},Scene_Map[_0x161145(0x2d7)]['clearOnceParallelInterpreters']=function(){const _0x12cc57=_0x161145;this[_0x12cc57(0x15b)]=[];},Scene_Map[_0x161145(0x2d7)][_0x161145(0x697)]=function(){const _0x3d7c63=_0x161145;if(!this[_0x3d7c63(0x15b)])return;for(const _0x4e676a of this['_onceParallelInterpreters']){if(_0x3d7c63(0x2ef)==='ypMFO')_0x4e676a&&(_0x3d7c63(0x8da)==='GIKjG'?this[_0x3d7c63(0x7f0)]='FV':_0x4e676a[_0x3d7c63(0x361)]());else return _0x378957[_0x3d7c63(0x2b5)]();}},Scene_Map['prototype']['playOnceParallelInterpreter']=function(_0x3d385c){const _0x490707=_0x161145,_0x429675=$dataCommonEvents[_0x3d385c];if(!_0x429675)return;const _0x5b5e61=new Game_OnceParallelInterpreter();this[_0x490707(0x66c)](_0x5b5e61),_0x5b5e61[_0x490707(0x627)](_0x3d385c);},Scene_Map[_0x161145(0x2d7)]['addOnceParallelInterpreter']=function(_0x1c9899){const _0x599156=_0x161145;this[_0x599156(0x15b)]=this[_0x599156(0x15b)]||[],this[_0x599156(0x15b)]['push'](_0x1c9899);},Scene_Map['prototype']['removeOnceParallelInterpreter']=function(_0x594593){const _0x4a9b0f=_0x161145;this[_0x4a9b0f(0x15b)]=this[_0x4a9b0f(0x15b)]||[],this[_0x4a9b0f(0x15b)][_0x4a9b0f(0x748)](_0x594593);};function Game_OnceParallelInterpreter(){const _0x5f36ab=_0x161145;this[_0x5f36ab(0x4fb)](...arguments);}Game_OnceParallelInterpreter[_0x161145(0x2d7)]=Object[_0x161145(0x1dd)](Game_Interpreter[_0x161145(0x2d7)]),Game_OnceParallelInterpreter[_0x161145(0x2d7)][_0x161145(0x4e8)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype'][_0x161145(0x627)]=function(_0x4ed6cc){const _0xcd709b=_0x161145,_0x2032bd=$dataCommonEvents[_0x4ed6cc];_0x2032bd?this['setup'](_0x2032bd['list'],0x0):this[_0xcd709b(0x341)]();},Game_OnceParallelInterpreter[_0x161145(0x2d7)][_0x161145(0x341)]=function(){const _0x39c168=_0x161145;if(!SceneManager['isSceneMap']())return;SceneManager[_0x39c168(0x988)][_0x39c168(0x428)](this),Game_Interpreter[_0x39c168(0x2d7)][_0x39c168(0x341)][_0x39c168(0x40b)](this);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x2a5)]=Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x461)],Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x461)]=function(){const _0x417f2a=_0x161145;let _0x1358c6=0x0;return SceneManager[_0x417f2a(0x8ca)]()?_0x1358c6=this[_0x417f2a(0x87f)]():_0x1358c6=VisuMZ[_0x417f2a(0x9cf)][_0x417f2a(0x2a5)][_0x417f2a(0x40b)](this),_0x1358c6;},Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x87f)]=function(){const _0xfdfc89=_0x161145;return this[_0xfdfc89(0x62c)]()?this[_0xfdfc89(0x2d5)]():0x0;},VisuMZ['CoreEngine'][_0x161145(0x6bc)]=Scene_MenuBase['prototype'][_0x161145(0x2bb)],Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x2bb)]=function(){const _0x3fa752=_0x161145;if(SceneManager[_0x3fa752(0x8ca)]()){if(_0x3fa752(0x511)==='ACbBv')return this[_0x3fa752(0x854)]();else this['drawSegment'](_0x4c5a0e);}else{if(_0x3fa752(0x36f)!==_0x3fa752(0x36f))_0x39eca6[_0x3fa752(0x384)](),_0x5d9738['removeChild'](_0x15e403[_0x3fa752(0x9d1)]),_0x522bf6[_0x3fa752(0x9d1)]=_0x19d2fd;else return VisuMZ[_0x3fa752(0x9cf)]['Scene_MenuBase_mainAreaTop'][_0x3fa752(0x40b)](this);}},Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x854)]=function(){const _0xf71fb3=_0x161145;if(!this[_0xf71fb3(0x62c)]())return this['helpAreaBottom']();else return this[_0xf71fb3(0x2cf)]()&&this['getButtonAssistLocation']()===_0xf71fb3(0x821)?Window_ButtonAssist['prototype'][_0xf71fb3(0x986)]():0x0;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x7b8)]=Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x39c)],Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x39c)]=function(){const _0x3ad1bf=_0x161145;let _0x203409=0x0;SceneManager[_0x3ad1bf(0x8ca)]()?_0x3ad1bf(0x991)===_0x3ad1bf(0x84f)?(_0x2f5dfa[_0x3ad1bf(0x2c2)]=_0x1b9e9a,_0x173795[_0x3ad1bf(0x312)](_0xd0c640),_0x29a0fb[_0x3ad1bf(0x2d2)](_0x281d09)):_0x203409=this[_0x3ad1bf(0x3c4)]():_0x203409=VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaHeight']['call'](this);if(this['isMenuButtonAssistEnabled']()&&this[_0x3ad1bf(0x957)]()!==_0x3ad1bf(0x90b)){if(_0x3ad1bf(0x358)!=='gIkhF'){const _0x226c78=_0x58f4f4['random']()<=_0xa3dc07;_0x4c2367[_0x3ad1bf(0x19d)](_0x51b4c8,_0x226c78);}else _0x203409-=Window_ButtonAssist[_0x3ad1bf(0x2d7)][_0x3ad1bf(0x986)]();}return _0x203409;},Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x3c4)]=function(){const _0x408471=_0x161145;return Graphics[_0x408471(0x710)]-this[_0x408471(0x80d)]();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x4cb)]=Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x70c)],Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x70c)]=function(){const _0x36da2e=_0x161145;this[_0x36da2e(0x168)]=new PIXI['filters'][(_0x36da2e(0x552))](clamp=!![]),this[_0x36da2e(0x6bb)]=new Sprite(),this[_0x36da2e(0x6bb)][_0x36da2e(0x436)]=SceneManager[_0x36da2e(0x8d7)](),this[_0x36da2e(0x6bb)][_0x36da2e(0x725)]=[this['_backgroundFilter']],this[_0x36da2e(0x784)](this[_0x36da2e(0x6bb)]),this[_0x36da2e(0x80e)](0xc0),this['setBackgroundOpacity'](this['getBackgroundOpacity']()),this[_0x36da2e(0x66f)]();},Scene_MenuBase['prototype'][_0x161145(0x84e)]=function(){const _0x2f4e93=_0x161145,_0x53ab91=String(this[_0x2f4e93(0x4e8)]['name']),_0x27afcd=this[_0x2f4e93(0x70d)](_0x53ab91);if(_0x27afcd)return _0x27afcd['SnapshotOpacity'];else{if('VZrNI'!==_0x2f4e93(0x4ab)){const _0x1cffbd=_0xb48bf2[_0x5bc579[_0x2f4e93(0x400)][0x0]];if(_0x1cffbd&&this[_0x2f4e93(0x156)]<=0xa){this[_0x2f4e93(0x156)]++;let _0x2686ac=_0x20f702[_0x2f4e93(0x9cf)][_0x2f4e93(0x810)](_0x1cffbd[_0x2f4e93(0x775)]);_0x2686ac[_0x2f4e93(0x300)]>0x0&&(_0x2b111b+=_0x20e8f0,_0x60158a+=_0x5a47f9,_0x9730f3+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'['format'](_0x1cffbd['id'],_0x1cffbd['name']),_0x1323fd+=_0x77fa64,_0x12bcb4+=_0x2686ac,_0x3cc8d8+=_0x412082,_0x277389+=_0x2f4e93(0x844)[_0x2f4e93(0x229)](_0x1cffbd['id'],_0x1cffbd[_0x2f4e93(0x618)]),_0x9335d6+=_0x3dd6da),this[_0x2f4e93(0x156)]--;}}else return 0xc0;}},Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x66f)]=function(){const _0x1ed6b0=_0x161145,_0x5d9f83=String(this[_0x1ed6b0(0x4e8)][_0x1ed6b0(0x618)]),_0x1406f4=this[_0x1ed6b0(0x70d)](_0x5d9f83);_0x1406f4&&(_0x1406f4[_0x1ed6b0(0x452)]!==''||_0x1406f4[_0x1ed6b0(0x15c)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x1ed6b0(0x53b)](_0x1406f4[_0x1ed6b0(0x452)])),this[_0x1ed6b0(0x3f1)]=new Sprite(ImageManager[_0x1ed6b0(0x535)](_0x1406f4[_0x1ed6b0(0x15c)])),this['addChild'](this[_0x1ed6b0(0x6c9)]),this['addChild'](this[_0x1ed6b0(0x3f1)]),this['_backSprite1']['bitmap'][_0x1ed6b0(0x1e0)](this[_0x1ed6b0(0x4f0)][_0x1ed6b0(0x68f)](this,this['_backSprite1'])),this[_0x1ed6b0(0x3f1)][_0x1ed6b0(0x436)][_0x1ed6b0(0x1e0)](this[_0x1ed6b0(0x4f0)][_0x1ed6b0(0x68f)](this,this[_0x1ed6b0(0x3f1)])));},Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x70d)]=function(_0x580866){const _0x2255b9=_0x161145;return VisuMZ[_0x2255b9(0x9cf)][_0x2255b9(0x7a5)]['MenuBg'][_0x580866]||VisuMZ[_0x2255b9(0x9cf)][_0x2255b9(0x7a5)][_0x2255b9(0x54a)]['Scene_Unlisted'];},Scene_MenuBase['prototype']['adjustSprite']=function(_0x44d8a0){const _0x4bef9a=_0x161145;this[_0x4bef9a(0x7fb)](_0x44d8a0),this[_0x4bef9a(0x467)](_0x44d8a0);},VisuMZ['CoreEngine'][_0x161145(0x45f)]=Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x77d)],Scene_MenuBase['prototype']['createCancelButton']=function(){const _0x7c3e3c=_0x161145;VisuMZ[_0x7c3e3c(0x9cf)][_0x7c3e3c(0x45f)][_0x7c3e3c(0x40b)](this),SceneManager[_0x7c3e3c(0x15f)]()&&this[_0x7c3e3c(0x906)]();},Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x906)]=function(){this['_cancelButton']['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x747)]=Scene_MenuBase[_0x161145(0x2d7)]['createPageButtons'],Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x9dc)]=function(){const _0xd00ac3=_0x161145;VisuMZ[_0xd00ac3(0x9cf)][_0xd00ac3(0x747)][_0xd00ac3(0x40b)](this);if(SceneManager['isSideButtonLayout']()){if(_0xd00ac3(0x3f9)===_0xd00ac3(0x353)){const _0x20c774=this[_0xd00ac3(0x8dc)];_0x20c774[_0xd00ac3(0x843)]=this[_0xd00ac3(0x702)],_0x20c774[_0xd00ac3(0x7c1)](_0x53ba78,_0xd71330+0x2,_0x4cc4fa+0x2,_0x1ae636);}else this['movePageButtonSideButtonLayout']();}},Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x88d)]=function(){const _0x2d21cc=_0x161145;this[_0x2d21cc(0x3eb)]['x']=-0x1*(this[_0x2d21cc(0x3eb)][_0x2d21cc(0x3ea)]+this[_0x2d21cc(0x965)][_0x2d21cc(0x3ea)]+0x8),this['_pagedownButton']['x']=-0x1*(this[_0x2d21cc(0x965)][_0x2d21cc(0x3ea)]+0x4);},Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x2cf)]=function(){const _0x500c94=_0x161145;return VisuMZ[_0x500c94(0x9cf)][_0x500c94(0x7a5)][_0x500c94(0x6a3)]['Enable'];},Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x957)]=function(){const _0x30269d=_0x161145;if(SceneManager[_0x30269d(0x15f)]()||SceneManager['areButtonsHidden']()){if('tzYMZ'!=='TUmdC')return VisuMZ['CoreEngine'][_0x30269d(0x7a5)]['ButtonAssist']['Location'];else _0x8bdf2f['playOnceParallelInterpreter'](_0x4877a0);}else return _0x30269d(0x4e4)!==_0x30269d(0x2eb)?'button':_0x39733a[_0x30269d(0x2d7)][_0x30269d(0x986)]();},Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x3dc)]=function(){const _0x1c697c=_0x161145;if(!this[_0x1c697c(0x2cf)]())return;const _0x3b64f4=this['buttonAssistWindowRect']();this[_0x1c697c(0x266)]=new Window_ButtonAssist(_0x3b64f4),this['addWindow'](this[_0x1c697c(0x266)]);},Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x5a7)]=function(){const _0x15b028=_0x161145;if(this['getButtonAssistLocation']()===_0x15b028(0x90b)){if(_0x15b028(0x634)!=='fagAW')return this[_0x15b028(0x42b)]();else this[_0x15b028(0x6c9)]=new _0x53d4a0(_0x3bbdd9['loadTitle1'](_0x39af5[_0x15b028(0x452)])),this[_0x15b028(0x3f1)]=new _0x4ea5a0(_0x69175b['loadTitle2'](_0x26f7bc[_0x15b028(0x15c)])),this[_0x15b028(0x784)](this[_0x15b028(0x6c9)]),this[_0x15b028(0x784)](this[_0x15b028(0x3f1)]),this[_0x15b028(0x6c9)][_0x15b028(0x436)]['addLoadListener'](this[_0x15b028(0x4f0)][_0x15b028(0x68f)](this,this[_0x15b028(0x6c9)])),this[_0x15b028(0x3f1)][_0x15b028(0x436)][_0x15b028(0x1e0)](this[_0x15b028(0x4f0)][_0x15b028(0x68f)](this,this['_backSprite2']));}else return this[_0x15b028(0x8cd)]();},Scene_MenuBase['prototype'][_0x161145(0x42b)]=function(){const _0x4bf780=_0x161145,_0xeef4d=ConfigManager['touchUI']?(Sprite_Button[_0x4bf780(0x2d7)][_0x4bf780(0x904)]()+0x6)*0x2:0x0,_0x1396d6=this[_0x4bf780(0x22e)](),_0x22dea6=Graphics[_0x4bf780(0x402)]-_0xeef4d*0x2,_0x434f2b=this[_0x4bf780(0x9a3)]();return new Rectangle(_0xeef4d,_0x1396d6,_0x22dea6,_0x434f2b);},Scene_MenuBase[_0x161145(0x2d7)][_0x161145(0x8cd)]=function(){const _0x29cf4c=_0x161145,_0x51babc=Graphics[_0x29cf4c(0x402)],_0x5ea76c=Window_ButtonAssist[_0x29cf4c(0x2d7)][_0x29cf4c(0x986)](),_0x4bd5c2=0x0;let _0x7ed51b=0x0;return this[_0x29cf4c(0x957)]()===_0x29cf4c(0x821)?_0x7ed51b=0x0:_0x7ed51b=Graphics[_0x29cf4c(0x710)]-_0x5ea76c,new Rectangle(_0x4bd5c2,_0x7ed51b,_0x51babc,_0x5ea76c);},Scene_Menu[_0x161145(0x466)]=VisuMZ[_0x161145(0x9cf)][_0x161145(0x7a5)][_0x161145(0x911)][_0x161145(0x18f)],VisuMZ[_0x161145(0x9cf)][_0x161145(0x80f)]=Scene_Menu[_0x161145(0x2d7)]['create'],Scene_Menu[_0x161145(0x2d7)]['create']=function(){const _0x5eaa9b=_0x161145;VisuMZ[_0x5eaa9b(0x9cf)][_0x5eaa9b(0x80f)][_0x5eaa9b(0x40b)](this),this[_0x5eaa9b(0x295)]();},Scene_Menu[_0x161145(0x2d7)][_0x161145(0x295)]=function(){const _0x57aa54=_0x161145;this[_0x57aa54(0x2fc)]&&this['_commandWindow'][_0x57aa54(0x6ce)](Scene_Menu[_0x57aa54(0x466)][_0x57aa54(0x840)]),this[_0x57aa54(0x914)]&&this[_0x57aa54(0x914)][_0x57aa54(0x6ce)](Scene_Menu[_0x57aa54(0x466)]['GoldBgType']),this[_0x57aa54(0x9b1)]&&this[_0x57aa54(0x9b1)]['setBackgroundType'](Scene_Menu[_0x57aa54(0x466)][_0x57aa54(0x3ed)]);},Scene_Menu[_0x161145(0x2d7)][_0x161145(0x613)]=function(){const _0x6d483c=_0x161145;return Scene_Menu[_0x6d483c(0x466)][_0x6d483c(0x454)][_0x6d483c(0x40b)](this);},Scene_Menu['prototype'][_0x161145(0x177)]=function(){const _0x743734=_0x161145;return Scene_Menu[_0x743734(0x466)][_0x743734(0x659)][_0x743734(0x40b)](this);},Scene_Menu[_0x161145(0x2d7)][_0x161145(0x27e)]=function(){const _0x1dc538=_0x161145;return Scene_Menu[_0x1dc538(0x466)][_0x1dc538(0x390)][_0x1dc538(0x40b)](this);},Scene_Item[_0x161145(0x466)]=VisuMZ['CoreEngine'][_0x161145(0x7a5)][_0x161145(0x911)][_0x161145(0x93f)],VisuMZ[_0x161145(0x9cf)][_0x161145(0x1d8)]=Scene_Item[_0x161145(0x2d7)][_0x161145(0x1dd)],Scene_Item['prototype']['create']=function(){const _0x354242=_0x161145;VisuMZ[_0x354242(0x9cf)][_0x354242(0x1d8)][_0x354242(0x40b)](this),this[_0x354242(0x295)]();},Scene_Item['prototype'][_0x161145(0x295)]=function(){const _0x44c970=_0x161145;this[_0x44c970(0x3c0)]&&this[_0x44c970(0x3c0)][_0x44c970(0x6ce)](Scene_Item[_0x44c970(0x466)][_0x44c970(0x2dd)]);this['_categoryWindow']&&this[_0x44c970(0x841)][_0x44c970(0x6ce)](Scene_Item[_0x44c970(0x466)][_0x44c970(0x5ad)]);this[_0x44c970(0x183)]&&this[_0x44c970(0x183)][_0x44c970(0x6ce)](Scene_Item['layoutSettings'][_0x44c970(0x7cd)]);if(this[_0x44c970(0x63c)]){if('eupdi'!=='LdeKS')this[_0x44c970(0x63c)][_0x44c970(0x6ce)](Scene_Item[_0x44c970(0x466)][_0x44c970(0x504)]);else return _0x16cc5b[_0x44c970(0x14e)];}},Scene_Item[_0x161145(0x2d7)]['helpWindowRect']=function(){const _0x3f2997=_0x161145;return Scene_Item[_0x3f2997(0x466)][_0x3f2997(0x622)][_0x3f2997(0x40b)](this);},Scene_Item['prototype'][_0x161145(0x180)]=function(){const _0x4ac792=_0x161145;return Scene_Item[_0x4ac792(0x466)][_0x4ac792(0x17e)][_0x4ac792(0x40b)](this);},Scene_Item['prototype'][_0x161145(0x3e5)]=function(){const _0xeebefc=_0x161145;return Scene_Item[_0xeebefc(0x466)][_0xeebefc(0x418)][_0xeebefc(0x40b)](this);},Scene_Item[_0x161145(0x2d7)][_0x161145(0x59a)]=function(){const _0x302350=_0x161145;return Scene_Item['layoutSettings'][_0x302350(0x610)]['call'](this);},Scene_Skill[_0x161145(0x466)]=VisuMZ[_0x161145(0x9cf)]['Settings'][_0x161145(0x911)][_0x161145(0x40d)],VisuMZ[_0x161145(0x9cf)]['Scene_Skill_create']=Scene_Skill[_0x161145(0x2d7)][_0x161145(0x1dd)],Scene_Skill[_0x161145(0x2d7)][_0x161145(0x1dd)]=function(){const _0x149aba=_0x161145;VisuMZ['CoreEngine'][_0x149aba(0x1e6)][_0x149aba(0x40b)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill['prototype'][_0x161145(0x295)]=function(){const _0x44c66f=_0x161145;this[_0x44c66f(0x3c0)]&&this[_0x44c66f(0x3c0)][_0x44c66f(0x6ce)](Scene_Skill[_0x44c66f(0x466)][_0x44c66f(0x2dd)]);this[_0x44c66f(0x3a3)]&&this[_0x44c66f(0x3a3)][_0x44c66f(0x6ce)](Scene_Skill['layoutSettings']['SkillTypeBgType']);if(this[_0x44c66f(0x9b1)]){if('Miwfs'===_0x44c66f(0x666)){if(this[_0x44c66f(0x45e)]===_0x44c66f(0x5e3)&&!_0x3ea3c6[_0x44c66f(0x173)]())return;if(_0x423e3d[_0x44c66f(0x8de)]())return;_0x2a3f6b[_0x44c66f(0x9cf)][_0x44c66f(0x3ce)][_0x44c66f(0x40b)](this,_0x9967fe),this[_0x44c66f(0x89b)](_0x44c66f(0x9b3));}else this[_0x44c66f(0x9b1)][_0x44c66f(0x6ce)](Scene_Skill['layoutSettings'][_0x44c66f(0x3ed)]);}if(this[_0x44c66f(0x183)]){if(_0x44c66f(0x88a)!==_0x44c66f(0x88a)){this[_0x44c66f(0x9a5)]=this['centerCameraCheckData']()[_0x44c66f(0x79e)];return;}else this[_0x44c66f(0x183)][_0x44c66f(0x6ce)](Scene_Skill[_0x44c66f(0x466)][_0x44c66f(0x7cd)]);}this[_0x44c66f(0x63c)]&&this['_actorWindow'][_0x44c66f(0x6ce)](Scene_Skill[_0x44c66f(0x466)][_0x44c66f(0x504)]);},Scene_Skill['prototype']['helpWindowRect']=function(){const _0x132f78=_0x161145;return Scene_Skill['layoutSettings'][_0x132f78(0x622)][_0x132f78(0x40b)](this);},Scene_Skill[_0x161145(0x2d7)][_0x161145(0x4f7)]=function(){const _0x40b244=_0x161145;return Scene_Skill[_0x40b244(0x466)][_0x40b244(0x58a)][_0x40b244(0x40b)](this);},Scene_Skill[_0x161145(0x2d7)]['statusWindowRect']=function(){const _0x21769f=_0x161145;return Scene_Skill[_0x21769f(0x466)]['StatusRect'][_0x21769f(0x40b)](this);},Scene_Skill[_0x161145(0x2d7)][_0x161145(0x3e5)]=function(){const _0x16ccc7=_0x161145;return Scene_Skill[_0x16ccc7(0x466)][_0x16ccc7(0x418)]['call'](this);},Scene_Skill[_0x161145(0x2d7)][_0x161145(0x59a)]=function(){const _0x14419b=_0x161145;return Scene_Skill[_0x14419b(0x466)][_0x14419b(0x610)]['call'](this);},Scene_Equip[_0x161145(0x466)]=VisuMZ[_0x161145(0x9cf)][_0x161145(0x7a5)][_0x161145(0x911)][_0x161145(0x379)],VisuMZ['CoreEngine'][_0x161145(0x81f)]=Scene_Equip[_0x161145(0x2d7)]['create'],Scene_Equip['prototype'][_0x161145(0x1dd)]=function(){const _0x168283=_0x161145;VisuMZ[_0x168283(0x9cf)][_0x168283(0x81f)][_0x168283(0x40b)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip[_0x161145(0x2d7)]['setCoreEngineUpdateWindowBg']=function(){const _0x28c582=_0x161145;this[_0x28c582(0x3c0)]&&('INEbJ'!==_0x28c582(0x19c)?_0x44e43a['CoreEngine']['Window_MapName_refresh']['call'](this):this[_0x28c582(0x3c0)]['setBackgroundType'](Scene_Equip[_0x28c582(0x466)]['HelpBgType']));this['_statusWindow']&&this[_0x28c582(0x9b1)][_0x28c582(0x6ce)](Scene_Equip[_0x28c582(0x466)][_0x28c582(0x3ed)]);this['_commandWindow']&&this['_commandWindow'][_0x28c582(0x6ce)](Scene_Equip['layoutSettings'][_0x28c582(0x840)]);if(this[_0x28c582(0x286)]){if(_0x28c582(0x4a4)!==_0x28c582(0x8bb))this[_0x28c582(0x286)][_0x28c582(0x6ce)](Scene_Equip[_0x28c582(0x466)][_0x28c582(0x522)]);else{const _0x564bf8=this[_0x28c582(0x20d)](_0xd495fa),_0x1d92c7=new(_0x564bf8?_0x14399f:_0x4a0da5)();_0x1d92c7['targetObjects']=_0x3c5521,_0x1d92c7[_0x28c582(0x935)](_0x284e53,_0x5e43dd,_0x1dc115,_0x5a6f7a),_0x1d92c7[_0x28c582(0x741)](_0x5b255e),this[_0x28c582(0x2e5)][_0x28c582(0x784)](_0x1d92c7),this[_0x28c582(0x63e)][_0x28c582(0x31e)](_0x1d92c7);}}this[_0x28c582(0x183)]&&this[_0x28c582(0x183)][_0x28c582(0x6ce)](Scene_Equip[_0x28c582(0x466)][_0x28c582(0x7cd)]);},Scene_Equip[_0x161145(0x2d7)][_0x161145(0x826)]=function(){const _0xfe51fe=_0x161145;return Scene_Equip[_0xfe51fe(0x466)][_0xfe51fe(0x622)]['call'](this);},Scene_Equip[_0x161145(0x2d7)][_0x161145(0x27e)]=function(){const _0x142873=_0x161145;return Scene_Equip[_0x142873(0x466)][_0x142873(0x390)][_0x142873(0x40b)](this);},Scene_Equip[_0x161145(0x2d7)]['commandWindowRect']=function(){const _0x62a6f3=_0x161145;return Scene_Equip[_0x62a6f3(0x466)]['CommandRect'][_0x62a6f3(0x40b)](this);},Scene_Equip[_0x161145(0x2d7)][_0x161145(0x3ef)]=function(){const _0x243bad=_0x161145;return Scene_Equip[_0x243bad(0x466)][_0x243bad(0x851)][_0x243bad(0x40b)](this);},Scene_Equip['prototype']['itemWindowRect']=function(){const _0x2bd8a1=_0x161145;return Scene_Equip[_0x2bd8a1(0x466)][_0x2bd8a1(0x418)]['call'](this);},Scene_Status[_0x161145(0x466)]=VisuMZ[_0x161145(0x9cf)]['Settings'][_0x161145(0x911)][_0x161145(0x2b1)],VisuMZ['CoreEngine'][_0x161145(0x4b6)]=Scene_Status['prototype'][_0x161145(0x1dd)],Scene_Status['prototype']['create']=function(){const _0x27e5da=_0x161145;VisuMZ[_0x27e5da(0x9cf)]['Scene_Status_create'][_0x27e5da(0x40b)](this),this[_0x27e5da(0x295)]();},Scene_Status[_0x161145(0x2d7)][_0x161145(0x295)]=function(){const _0x29edf2=_0x161145;if(this[_0x29edf2(0x9db)]){if(_0x29edf2(0x1fe)===_0x29edf2(0x1fe))this[_0x29edf2(0x9db)]['setBackgroundType'](Scene_Status[_0x29edf2(0x466)]['ProfileBgType']);else return _0x589d57[_0x29edf2(0x9cf)]['Settings'][_0x29edf2(0x651)][_0x29edf2(0x596)];}if(this['_statusWindow']){if('gsLYl'!=='bUdtL')this[_0x29edf2(0x9b1)][_0x29edf2(0x6ce)](Scene_Status['layoutSettings'][_0x29edf2(0x3ed)]);else{const _0x23390a=_0x29edf2(0x458);this['_colorCache']=this['_colorCache']||{};if(this[_0x29edf2(0x449)][_0x23390a])return this[_0x29edf2(0x449)][_0x23390a];const _0x400f19=_0x73445b['CoreEngine']['Settings'][_0x29edf2(0x9ab)]['ColorNormal'];return this[_0x29edf2(0x968)](_0x23390a,_0x400f19);}}this[_0x29edf2(0x342)]&&(_0x29edf2(0x54b)==='EIYeb'?_0x21d676[_0x29edf2(0x1f8)]():this['_statusParamsWindow'][_0x29edf2(0x6ce)](Scene_Status[_0x29edf2(0x466)][_0x29edf2(0x2e7)])),this[_0x29edf2(0x4b3)]&&('cIyek'===_0x29edf2(0x3f0)?this[_0x29edf2(0x4b3)]['setBackgroundType'](Scene_Status[_0x29edf2(0x466)][_0x29edf2(0x7a2)]):this[_0x29edf2(0x63c)][_0x29edf2(0x6ce)](_0x3c8552[_0x29edf2(0x466)][_0x29edf2(0x504)]));},Scene_Status['prototype'][_0x161145(0x515)]=function(){const _0x2f895c=_0x161145;return Scene_Status['layoutSettings'][_0x2f895c(0x8f8)][_0x2f895c(0x40b)](this);},Scene_Status[_0x161145(0x2d7)][_0x161145(0x27e)]=function(){const _0x31bf77=_0x161145;return Scene_Status[_0x31bf77(0x466)][_0x31bf77(0x390)][_0x31bf77(0x40b)](this);},Scene_Status[_0x161145(0x2d7)][_0x161145(0x4b7)]=function(){const _0x18e349=_0x161145;return Scene_Status[_0x18e349(0x466)][_0x18e349(0x359)][_0x18e349(0x40b)](this);},Scene_Status[_0x161145(0x2d7)]['statusEquipWindowRect']=function(){const _0x4e2114=_0x161145;return Scene_Status[_0x4e2114(0x466)][_0x4e2114(0x209)][_0x4e2114(0x40b)](this);},Scene_Options[_0x161145(0x466)]=VisuMZ['CoreEngine'][_0x161145(0x7a5)][_0x161145(0x911)]['OptionsMenu'],VisuMZ['CoreEngine']['Scene_Options_create']=Scene_Options['prototype']['create'],Scene_Options[_0x161145(0x2d7)]['create']=function(){const _0x20b10c=_0x161145;VisuMZ[_0x20b10c(0x9cf)]['Scene_Options_create'][_0x20b10c(0x40b)](this),this[_0x20b10c(0x295)]();},Scene_Options[_0x161145(0x2d7)]['setCoreEngineUpdateWindowBg']=function(){const _0x3847fb=_0x161145;this[_0x3847fb(0x4ad)]&&this['_optionsWindow']['setBackgroundType'](Scene_Options['layoutSettings'][_0x3847fb(0x240)]);},Scene_Options['prototype'][_0x161145(0x94d)]=function(){const _0x114987=_0x161145;return Scene_Options[_0x114987(0x466)][_0x114987(0x477)][_0x114987(0x40b)](this);},Scene_Save['layoutSettings']=VisuMZ[_0x161145(0x9cf)][_0x161145(0x7a5)][_0x161145(0x911)][_0x161145(0x2a4)],Scene_Save[_0x161145(0x2d7)][_0x161145(0x1dd)]=function(){const _0xbd8aa2=_0x161145;Scene_File[_0xbd8aa2(0x2d7)][_0xbd8aa2(0x1dd)][_0xbd8aa2(0x40b)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save['prototype'][_0x161145(0x295)]=function(){const _0x9f7f9a=_0x161145;this[_0x9f7f9a(0x3c0)]&&this[_0x9f7f9a(0x3c0)][_0x9f7f9a(0x6ce)](Scene_Save[_0x9f7f9a(0x466)][_0x9f7f9a(0x2dd)]);if(this[_0x9f7f9a(0x4fe)]){if(_0x9f7f9a(0x8a1)===_0x9f7f9a(0x8a1))this[_0x9f7f9a(0x4fe)][_0x9f7f9a(0x6ce)](Scene_Save[_0x9f7f9a(0x466)][_0x9f7f9a(0x780)]);else return!![];}},Scene_Save['prototype'][_0x161145(0x826)]=function(){const _0x56215c=_0x161145;return Scene_Save[_0x56215c(0x466)]['HelpRect'][_0x56215c(0x40b)](this);},Scene_Save['prototype']['listWindowRect']=function(){const _0x17d0fc=_0x161145;return Scene_Save['layoutSettings'][_0x17d0fc(0x517)][_0x17d0fc(0x40b)](this);},Scene_Load['layoutSettings']=VisuMZ[_0x161145(0x9cf)][_0x161145(0x7a5)][_0x161145(0x911)][_0x161145(0x4b9)],Scene_Load[_0x161145(0x2d7)][_0x161145(0x1dd)]=function(){const _0x4cbc07=_0x161145;Scene_File['prototype']['create']['call'](this),this[_0x4cbc07(0x295)]();},Scene_Load[_0x161145(0x2d7)][_0x161145(0x295)]=function(){const _0x2a67b7=_0x161145;this[_0x2a67b7(0x3c0)]&&this['_helpWindow']['setBackgroundType'](Scene_Load[_0x2a67b7(0x466)][_0x2a67b7(0x2dd)]),this['_listWindow']&&(_0x2a67b7(0x56c)===_0x2a67b7(0x56c)?this[_0x2a67b7(0x4fe)][_0x2a67b7(0x6ce)](Scene_Load['layoutSettings'][_0x2a67b7(0x780)]):(this[_0x2a67b7(0x43f)](_0x193cd7,_0x1194ac+0x2,_0x2c4fcc+0x2),_0x5a6378-=_0x2b9c16[_0x2a67b7(0x669)]+0x4,_0xc208c1+=_0x37af20[_0x2a67b7(0x669)]+0x4));},Scene_Load[_0x161145(0x2d7)]['helpWindowRect']=function(){const _0x28d052=_0x161145;return Scene_Load['layoutSettings']['HelpRect'][_0x28d052(0x40b)](this);},Scene_Load['prototype'][_0x161145(0x257)]=function(){const _0x20f253=_0x161145;return Scene_Load[_0x20f253(0x466)][_0x20f253(0x517)][_0x20f253(0x40b)](this);},Scene_GameEnd[_0x161145(0x466)]=VisuMZ['CoreEngine'][_0x161145(0x7a5)][_0x161145(0x911)][_0x161145(0x23e)],VisuMZ[_0x161145(0x9cf)][_0x161145(0x560)]=Scene_GameEnd[_0x161145(0x2d7)][_0x161145(0x70c)],Scene_GameEnd['prototype']['createBackground']=function(){const _0x4a9783=_0x161145;Scene_MenuBase[_0x4a9783(0x2d7)][_0x4a9783(0x70c)]['call'](this);},Scene_GameEnd[_0x161145(0x2d7)]['createCommandWindow']=function(){const _0xcae627=_0x161145,_0x587ae6=this[_0xcae627(0x613)]();this[_0xcae627(0x2fc)]=new Window_GameEnd(_0x587ae6),this[_0xcae627(0x2fc)][_0xcae627(0x1cd)](_0xcae627(0x788),this[_0xcae627(0x9d3)][_0xcae627(0x68f)](this)),this[_0xcae627(0x36e)](this['_commandWindow']),this[_0xcae627(0x2fc)][_0xcae627(0x6ce)](Scene_GameEnd[_0xcae627(0x466)][_0xcae627(0x840)]);},Scene_GameEnd[_0x161145(0x2d7)]['commandWindowRect']=function(){const _0x4511e7=_0x161145;return Scene_GameEnd[_0x4511e7(0x466)][_0x4511e7(0x454)][_0x4511e7(0x40b)](this);},Scene_Shop['layoutSettings']=VisuMZ[_0x161145(0x9cf)][_0x161145(0x7a5)][_0x161145(0x911)]['ShopMenu'],VisuMZ[_0x161145(0x9cf)][_0x161145(0x599)]=Scene_Shop[_0x161145(0x2d7)][_0x161145(0x1dd)],Scene_Shop[_0x161145(0x2d7)][_0x161145(0x1dd)]=function(){const _0x38f06d=_0x161145;VisuMZ['CoreEngine']['Scene_Shop_create'][_0x38f06d(0x40b)](this),this[_0x38f06d(0x295)]();},Scene_Shop[_0x161145(0x2d7)][_0x161145(0x295)]=function(){const _0x573d11=_0x161145;this[_0x573d11(0x3c0)]&&this[_0x573d11(0x3c0)][_0x573d11(0x6ce)](Scene_Shop[_0x573d11(0x466)][_0x573d11(0x2dd)]);this['_goldWindow']&&this[_0x573d11(0x914)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x573d11(0x7db)]);if(this[_0x573d11(0x2fc)]){if(_0x573d11(0x410)!==_0x573d11(0x410))return this[_0x573d11(0x701)]();else this[_0x573d11(0x2fc)]['setBackgroundType'](Scene_Shop[_0x573d11(0x466)]['CommandBgType']);}if(this[_0x573d11(0x1a9)]){if(_0x573d11(0x5d2)!=='dLkhq')this[_0x573d11(0x1a9)][_0x573d11(0x6ce)](Scene_Shop[_0x573d11(0x466)][_0x573d11(0x853)]);else{const _0x465638=_0x5ed0a0[_0x573d11(0x411)]();if(_0x465638)for(const _0x543e75 of _0x465638){if(_0x543e75&&_0x543e75[_0x573d11(0x489)]){if(this[_0x573d11(0x5c1)](_0x543e75))return!![];if(this['isGamepadAxisMoved'](_0x543e75))return!![];}}}}this[_0x573d11(0x43d)]&&this[_0x573d11(0x43d)][_0x573d11(0x6ce)](Scene_Shop[_0x573d11(0x466)][_0x573d11(0x8d1)]),this['_statusWindow']&&this[_0x573d11(0x9b1)][_0x573d11(0x6ce)](Scene_Shop[_0x573d11(0x466)][_0x573d11(0x3ed)]),this[_0x573d11(0x5dd)]&&this[_0x573d11(0x5dd)]['setBackgroundType'](Scene_Shop[_0x573d11(0x466)][_0x573d11(0x68d)]),this[_0x573d11(0x841)]&&this['_categoryWindow'][_0x573d11(0x6ce)](Scene_Shop[_0x573d11(0x466)]['CategoryBgType']),this[_0x573d11(0x4be)]&&this[_0x573d11(0x4be)][_0x573d11(0x6ce)](Scene_Shop['layoutSettings']['SellBgType']);},Scene_Shop[_0x161145(0x2d7)][_0x161145(0x826)]=function(){const _0x4d05b8=_0x161145;return Scene_Shop['layoutSettings'][_0x4d05b8(0x622)][_0x4d05b8(0x40b)](this);},Scene_Shop['prototype']['goldWindowRect']=function(){const _0x2d5a8d=_0x161145;return Scene_Shop[_0x2d5a8d(0x466)]['GoldRect']['call'](this);},Scene_Shop[_0x161145(0x2d7)][_0x161145(0x613)]=function(){const _0x3d1657=_0x161145;return Scene_Shop[_0x3d1657(0x466)][_0x3d1657(0x454)][_0x3d1657(0x40b)](this);},Scene_Shop[_0x161145(0x2d7)][_0x161145(0x1ec)]=function(){const _0x5414b4=_0x161145;return Scene_Shop[_0x5414b4(0x466)][_0x5414b4(0x24c)]['call'](this);},Scene_Shop[_0x161145(0x2d7)][_0x161145(0x542)]=function(){const _0x214abc=_0x161145;return Scene_Shop[_0x214abc(0x466)][_0x214abc(0x247)][_0x214abc(0x40b)](this);},Scene_Shop[_0x161145(0x2d7)][_0x161145(0x27e)]=function(){const _0x14e288=_0x161145;return Scene_Shop[_0x14e288(0x466)][_0x14e288(0x390)][_0x14e288(0x40b)](this);},Scene_Shop['prototype'][_0x161145(0x1aa)]=function(){const _0x475685=_0x161145;return Scene_Shop[_0x475685(0x466)][_0x475685(0x942)][_0x475685(0x40b)](this);},Scene_Shop[_0x161145(0x2d7)][_0x161145(0x180)]=function(){const _0x335a50=_0x161145;return Scene_Shop['layoutSettings']['CategoryRect'][_0x335a50(0x40b)](this);},Scene_Shop[_0x161145(0x2d7)][_0x161145(0x677)]=function(){const _0x1942a6=_0x161145;return Scene_Shop[_0x1942a6(0x466)][_0x1942a6(0x2c6)][_0x1942a6(0x40b)](this);},Scene_Name[_0x161145(0x466)]=VisuMZ[_0x161145(0x9cf)]['Settings'][_0x161145(0x911)][_0x161145(0x7c0)],VisuMZ[_0x161145(0x9cf)][_0x161145(0x683)]=Scene_Name['prototype'][_0x161145(0x1dd)],Scene_Name['prototype'][_0x161145(0x1dd)]=function(){const _0x338c2e=_0x161145;VisuMZ[_0x338c2e(0x9cf)][_0x338c2e(0x683)]['call'](this),this[_0x338c2e(0x295)]();},Scene_Name['prototype'][_0x161145(0x295)]=function(){const _0x4b5d55=_0x161145;this[_0x4b5d55(0x700)]&&this[_0x4b5d55(0x700)][_0x4b5d55(0x6ce)](Scene_Name['layoutSettings'][_0x4b5d55(0x5d9)]),this['_inputWindow']&&this[_0x4b5d55(0x604)]['setBackgroundType'](Scene_Name[_0x4b5d55(0x466)][_0x4b5d55(0x724)]);},Scene_Name[_0x161145(0x2d7)][_0x161145(0x80d)]=function(){return 0x0;},Scene_Name[_0x161145(0x2d7)][_0x161145(0x2de)]=function(){const _0x2686e8=_0x161145;return Scene_Name['layoutSettings']['EditRect'][_0x2686e8(0x40b)](this);},Scene_Name[_0x161145(0x2d7)][_0x161145(0x2a8)]=function(){const _0x224d68=_0x161145;return Scene_Name[_0x224d68(0x466)][_0x224d68(0x7f7)][_0x224d68(0x40b)](this);},Scene_Name['prototype'][_0x161145(0x6d0)]=function(){const _0x46f66b=_0x161145;if(!this[_0x46f66b(0x604)])return![];return VisuMZ[_0x46f66b(0x9cf)][_0x46f66b(0x7a5)][_0x46f66b(0x7d5)][_0x46f66b(0x6d0)];},Scene_Name[_0x161145(0x2d7)][_0x161145(0x9a8)]=function(){const _0xd14031=_0x161145;return this[_0xd14031(0x6d0)]()?TextManager[_0xd14031(0x705)](_0xd14031(0x3af)):Scene_MenuBase[_0xd14031(0x2d7)][_0xd14031(0x9a8)][_0xd14031(0x40b)](this);},Scene_Name[_0x161145(0x2d7)][_0x161145(0x366)]=function(){const _0x4baeb2=_0x161145;if(this[_0x4baeb2(0x6d0)]()){const _0x9ca380=VisuMZ['CoreEngine'][_0x4baeb2(0x7a5)][_0x4baeb2(0x7d5)];if(this[_0x4baeb2(0x604)][_0x4baeb2(0x45e)]==='keyboard')return _0x9ca380[_0x4baeb2(0x93a)]||_0x4baeb2(0x93a);else{if('JGpJO'===_0x4baeb2(0x31c))this[_0x4baeb2(0x7f0)]=_0x4232d1,this[_0x4baeb2(0x992)]=_0x38d929;else return _0x9ca380[_0x4baeb2(0x929)]||_0x4baeb2(0x929);}}else return _0x4baeb2(0x48f)!==_0x4baeb2(0x48f)?_0x1e70b2[_0x4baeb2(0x97c)]()===0x1:Scene_MenuBase[_0x4baeb2(0x2d7)]['buttonAssistText1'][_0x4baeb2(0x40b)](this);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x80c)]=Scene_Name['prototype'][_0x161145(0x82c)],Scene_Name['prototype']['onInputOk']=function(){const _0x114521=_0x161145;this['doesNameContainBannedWords']()?this['onInputBannedWords']():VisuMZ['CoreEngine'][_0x114521(0x80c)][_0x114521(0x40b)](this);},Scene_Name[_0x161145(0x2d7)][_0x161145(0x901)]=function(){const _0xf52961=_0x161145,_0x41e2ff=VisuMZ[_0xf52961(0x9cf)][_0xf52961(0x7a5)][_0xf52961(0x7d5)];if(!_0x41e2ff)return![];const _0x154dc8=_0x41e2ff[_0xf52961(0x23f)];if(!_0x154dc8)return![];const _0x1e923d=this[_0xf52961(0x700)][_0xf52961(0x618)]()['toLowerCase']();for(const _0x2357b2 of _0x154dc8){if(_0x1e923d[_0xf52961(0x219)](_0x2357b2[_0xf52961(0x726)]()))return!![];}return![];},Scene_Name[_0x161145(0x2d7)][_0x161145(0x29c)]=function(){SoundManager['playBuzzer']();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x8dd)]=Scene_Battle[_0x161145(0x2d7)][_0x161145(0x361)],Scene_Battle[_0x161145(0x2d7)]['update']=function(){const _0x11ded2=_0x161145;VisuMZ[_0x11ded2(0x9cf)][_0x11ded2(0x8dd)][_0x11ded2(0x40b)](this);if($gameTemp['_playTestFastMode'])this['updatePlayTestF7']();},Scene_Battle[_0x161145(0x2d7)][_0x161145(0x8e8)]=function(){const _0x5be453=_0x161145;!BattleManager[_0x5be453(0x4cc)]()&&!this[_0x5be453(0x672)]&&!$gameMessage['isBusy']()&&(this[_0x5be453(0x672)]=!![],this['update'](),SceneManager['updateEffekseer'](),this[_0x5be453(0x672)]=![]);},VisuMZ[_0x161145(0x9cf)]['Scene_Battle_createCancelButton']=Scene_Battle[_0x161145(0x2d7)][_0x161145(0x77d)],Scene_Battle[_0x161145(0x2d7)][_0x161145(0x77d)]=function(){const _0x169137=_0x161145;VisuMZ[_0x169137(0x9cf)][_0x169137(0x367)][_0x169137(0x40b)](this),SceneManager[_0x169137(0x15f)]()&&this[_0x169137(0x800)]();},Scene_Battle[_0x161145(0x2d7)]['repositionCancelButtonSideButtonLayout']=function(){const _0x1b5f7c=_0x161145;this[_0x1b5f7c(0x1a2)]['x']=Graphics[_0x1b5f7c(0x402)]+0x4;if(this[_0x1b5f7c(0x315)]())'NlsTf'!==_0x1b5f7c(0x395)?this[_0x1b5f7c(0x399)](_0x262a9e):this['_cancelButton']['y']=Graphics['boxHeight']-this[_0x1b5f7c(0x9a3)]();else{if('YpymL'!==_0x1b5f7c(0x421))this['_cancelButton']['y']=0x0;else{const _0x9abea8=_0x5837fe[_0x1b5f7c(0x46b)]/this[_0x1b5f7c(0x79a)]();_0x9abea8%0x1!==0x0&&_0x1b3125[_0x1b5f7c(0x8e4)](_0x9abea8)===this[_0x1b5f7c(0x46b)]()&&!this[_0x1b5f7c(0x830)]()&&(this[_0x1b5f7c(0x1f2)]['centerY']=!![],this['_centerCameraCheck'][_0x1b5f7c(0x79e)]=_0xe997fa[_0x1b5f7c(0x796)]||0x0);}}},VisuMZ['CoreEngine']['Sprite_Button_initialize']=Sprite_Button[_0x161145(0x2d7)]['initialize'],Sprite_Button[_0x161145(0x2d7)][_0x161145(0x4fb)]=function(_0x292540){const _0x16488d=_0x161145;VisuMZ[_0x16488d(0x9cf)][_0x16488d(0x56b)][_0x16488d(0x40b)](this,_0x292540),this[_0x16488d(0x1d2)]();},Sprite_Button['prototype'][_0x161145(0x1d2)]=function(){const _0x242460=_0x161145,_0x397cb5=VisuMZ[_0x242460(0x9cf)][_0x242460(0x7a5)]['UI'];this[_0x242460(0x264)]=![];switch(this[_0x242460(0x6e3)]){case'cancel':this[_0x242460(0x264)]=!_0x397cb5[_0x242460(0x5e4)];break;case _0x242460(0x8eb):case _0x242460(0x21d):this['_isButtonHidden']=!_0x397cb5[_0x242460(0x17b)];break;case _0x242460(0x1ae):case'up':case _0x242460(0x50d):case _0x242460(0x97e):case'ok':this['_isButtonHidden']=!_0x397cb5[_0x242460(0x778)];break;case _0x242460(0x4e0):this[_0x242460(0x264)]=!_0x397cb5['menuShowButton'];break;}},VisuMZ[_0x161145(0x9cf)]['Sprite_Button_updateOpacity']=Sprite_Button[_0x161145(0x2d7)][_0x161145(0x8fa)],Sprite_Button[_0x161145(0x2d7)][_0x161145(0x8fa)]=function(){const _0x2bb45b=_0x161145;if(SceneManager[_0x2bb45b(0x936)]()||this[_0x2bb45b(0x264)])this['hideButtonFromView']();else{if('NRqWd'!==_0x2bb45b(0x676)){if(_0x18a909[_0x2bb45b(0x9cf)][_0x2bb45b(0x7a5)]['Param'][_0x2bb45b(0x964)]===![])return;if(this[_0x2bb45b(0x197)]())this[_0x2bb45b(0x503)](_0x1b5a79,_0x973cad,_0x2b7101);_0x2912db[_0x2bb45b(0x9cf)]['Window_StatusBase_drawActorLevel'][_0x2bb45b(0x40b)](this,_0x46afbf,_0x1d77ab,_0x44c0d1);}else VisuMZ[_0x2bb45b(0x9cf)][_0x2bb45b(0x253)][_0x2bb45b(0x40b)](this);}},Sprite_Button[_0x161145(0x2d7)][_0x161145(0x2a0)]=function(){const _0x5f453f=_0x161145;this['visible']=![],this['opacity']=0x0,this['x']=Graphics[_0x5f453f(0x3ea)]*0xa,this['y']=Graphics[_0x5f453f(0x46b)]*0xa;},VisuMZ[_0x161145(0x9cf)]['Sprite_Battler_startMove']=Sprite_Battler['prototype'][_0x161145(0x643)],Sprite_Battler[_0x161145(0x2d7)][_0x161145(0x643)]=function(_0x2cad78,_0xc7fcc3,_0x2a5e31){const _0x5da90a=_0x161145;(this[_0x5da90a(0x733)]!==_0x2cad78||this[_0x5da90a(0x2be)]!==_0xc7fcc3)&&('fuHrE'===_0x5da90a(0x577)?(this[_0x5da90a(0x6f0)]('Linear'),this[_0x5da90a(0x9be)]=_0x2a5e31):(_0x15ebf0=_0x304d58['round'](_0x9c2109),_0x1330a3=_0x18ccaf[_0x5da90a(0x8c8)](_0x5270f9),_0x51e295=_0x48d8c7[_0x5da90a(0x8c8)](_0x2a7bbe),_0x11236a=_0x2b3150[_0x5da90a(0x8c8)](_0x3c24e5),_0x162367[_0x5da90a(0x9cf)][_0x5da90a(0x2ec)][_0x5da90a(0x40b)](this,_0x426296,_0x27d93d,_0x2d74af,_0x10c9d3,_0x38d6cc,_0x280276),this['markCoreEngineModified']())),VisuMZ[_0x5da90a(0x9cf)][_0x5da90a(0x330)]['call'](this,_0x2cad78,_0xc7fcc3,_0x2a5e31);},Sprite_Battler[_0x161145(0x2d7)][_0x161145(0x6f0)]=function(_0x1a0eda){const _0x49b9c5=_0x161145;this[_0x49b9c5(0x508)]=_0x1a0eda;},Sprite_Battler['prototype'][_0x161145(0x235)]=function(){const _0x55ec6c=_0x161145;if(this['_movementDuration']<=0x0)return;const _0x3a649b=this[_0x55ec6c(0x6f1)],_0x531b64=this[_0x55ec6c(0x9be)],_0x35c34e=this['_moveEasingType'];this['_offsetX']=this[_0x55ec6c(0x95e)](this[_0x55ec6c(0x404)],this[_0x55ec6c(0x733)],_0x3a649b,_0x531b64,_0x35c34e),this[_0x55ec6c(0x284)]=this[_0x55ec6c(0x95e)](this['_offsetY'],this[_0x55ec6c(0x2be)],_0x3a649b,_0x531b64,_0x35c34e),this[_0x55ec6c(0x6f1)]--;if(this['_movementDuration']<=0x0)this[_0x55ec6c(0x52e)]();},Sprite_Battler['prototype'][_0x161145(0x95e)]=function(_0x3d7321,_0x3de7ef,_0xa45e7f,_0x5cd086,_0x50f22b){const _0x2b08b0=_0x161145,_0x1e97e4=VisuMZ['ApplyEasing']((_0x5cd086-_0xa45e7f)/_0x5cd086,_0x50f22b||_0x2b08b0(0x21f)),_0x49ebf1=VisuMZ[_0x2b08b0(0x3cc)]((_0x5cd086-_0xa45e7f+0x1)/_0x5cd086,_0x50f22b||_0x2b08b0(0x21f)),_0x32ced7=(_0x3d7321-_0x3de7ef*_0x1e97e4)/(0x1-_0x1e97e4);return _0x32ced7+(_0x3de7ef-_0x32ced7)*_0x49ebf1;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x438)]=Sprite_Actor[_0x161145(0x2d7)][_0x161145(0x35b)],Sprite_Actor[_0x161145(0x2d7)][_0x161145(0x35b)]=function(_0x399c94){const _0x12afad=_0x161145;VisuMZ[_0x12afad(0x9cf)]['Settings']['UI'][_0x12afad(0x7fc)]?this[_0x12afad(0x84a)](_0x399c94):VisuMZ[_0x12afad(0x9cf)]['Sprite_Actor_setActorHome'][_0x12afad(0x40b)](this,_0x399c94);},Sprite_Actor[_0x161145(0x2d7)]['setActorHomeRepositioned']=function(_0x54d684){const _0x3219b2=_0x161145;let _0x34dd6a=Math[_0x3219b2(0x8c8)](Graphics[_0x3219b2(0x3ea)]/0x2+0xc0);_0x34dd6a-=Math[_0x3219b2(0x7f2)]((Graphics[_0x3219b2(0x3ea)]-Graphics[_0x3219b2(0x402)])/0x2),_0x34dd6a+=_0x54d684*0x20;let _0x5383ef=Graphics[_0x3219b2(0x46b)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x5383ef-=Math['floor']((Graphics['height']-Graphics['boxHeight'])/0x2),_0x5383ef+=_0x54d684*0x30,this[_0x3219b2(0x3f2)](_0x34dd6a,_0x5383ef);},Sprite_Actor[_0x161145(0x2d7)]['retreat']=function(){this['startMove'](0x4b0,0x0,0x78);},Sprite_Animation[_0x161145(0x2d7)][_0x161145(0x741)]=function(_0x59eb01){const _0x522b72=_0x161145;this[_0x522b72(0x925)]=_0x59eb01;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x7ed)]=Sprite_Animation[_0x161145(0x2d7)][_0x161145(0x69e)],Sprite_Animation[_0x161145(0x2d7)]['processSoundTimings']=function(){const _0x3dc2c3=_0x161145;if(this['_muteSound'])return;VisuMZ[_0x3dc2c3(0x9cf)][_0x3dc2c3(0x7ed)][_0x3dc2c3(0x40b)](this);},VisuMZ[_0x161145(0x9cf)]['Sprite_Animation_setViewport']=Sprite_Animation[_0x161145(0x2d7)]['setViewport'],Sprite_Animation[_0x161145(0x2d7)][_0x161145(0x230)]=function(_0x1482cb){const _0x26c673=_0x161145;if(this[_0x26c673(0x2d3)]())this[_0x26c673(0x759)](_0x1482cb);else{if('MDrHC'!==_0x26c673(0x3bd)){const _0x4ea927=_0x4c927e+(this['lineHeight']()-_0x36ce2b[_0x26c673(0x83f)])/0x2;this['drawIcon'](_0x494c21,_0x2144f9+(_0x547089-_0x3a970c[_0x26c673(0x669)]),_0x4ea927),_0x403523-=_0xd4da62[_0x26c673(0x669)]+0x4;}else VisuMZ[_0x26c673(0x9cf)][_0x26c673(0x4bb)]['call'](this,_0x1482cb);}},Sprite_Animation[_0x161145(0x2d7)]['isAnimationOffsetXMirrored']=function(){const _0x1f5d23=_0x161145;if(!this['_animation'])return![];const _0x598eae=this['_animation'][_0x1f5d23(0x618)]||'';if(_0x598eae[_0x1f5d23(0x8f9)](/<MIRROR OFFSET X>/i))return!![];if(_0x598eae[_0x1f5d23(0x8f9)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x1f5d23(0x9cf)][_0x1f5d23(0x7a5)][_0x1f5d23(0x678)][_0x1f5d23(0x87a)];},Sprite_Animation[_0x161145(0x2d7)][_0x161145(0x759)]=function(_0x2bf7a6){const _0x1ff64d=_0x161145,_0x195e68=this[_0x1ff64d(0x192)],_0xb03f9c=this[_0x1ff64d(0x192)],_0x5e0564=this[_0x1ff64d(0x8b1)][_0x1ff64d(0x33f)]*(this[_0x1ff64d(0x878)]?-0x1:0x1)-_0x195e68/0x2,_0x57d768=this['_animation']['offsetY']-_0xb03f9c/0x2,_0xebcdd5=this[_0x1ff64d(0x564)](_0x2bf7a6);_0x2bf7a6['gl']['viewport'](_0x5e0564+_0xebcdd5['x'],_0x57d768+_0xebcdd5['y'],_0x195e68,_0xb03f9c);},Sprite_Animation[_0x161145(0x2d7)]['targetSpritePosition']=function(_0x586d16){const _0x382276=_0x161145;if(_0x586d16[_0x382276(0x6e0)]){}const _0x33f9e9=this[_0x382276(0x8b1)][_0x382276(0x618)];let _0x869beb=_0x586d16['height']*_0x586d16[_0x382276(0x430)]['y'],_0x6771eb=0x0,_0xa53b12=-_0x869beb/0x2;if(_0x33f9e9[_0x382276(0x8f9)](/<(?:HEAD|HEADER|TOP)>/i))_0xa53b12=-_0x869beb;if(_0x33f9e9[_0x382276(0x8f9)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0xa53b12=0x0;if(this[_0x382276(0x8b1)][_0x382276(0x4d6)])_0xa53b12=0x0;if(_0x33f9e9[_0x382276(0x8f9)](/<(?:LEFT)>/i))_0x6771eb=-_0x586d16['width']/0x2;if(_0x33f9e9[_0x382276(0x8f9)](/<(?:RIGHT)>/i))_0x6771eb=_0x586d16['width']/0x2;_0x33f9e9['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&('SLjsD'===_0x382276(0x8f3)?_0x210dd2['style'][_0x382276(0x297)]=_0x382276(0x967):_0x6771eb=Number(RegExp['$1'])*_0x586d16[_0x382276(0x3ea)]);_0x33f9e9['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x382276(0x2b7)===_0x382276(0x2b7)?_0xa53b12=(0x1-Number(RegExp['$1']))*-_0x869beb:_0x231786[_0x382276(0x1ca)]()&&(_0x5ad736[_0x382276(0x312)](_0x382276(0x7bb)),_0x503f92[_0x382276(0x312)](_0x5c8e6a)));_0x33f9e9[_0x382276(0x8f9)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x6771eb=Number(RegExp['$1'])*_0x586d16[_0x382276(0x3ea)],_0xa53b12=(0x1-Number(RegExp['$2']))*-_0x869beb);if(_0x33f9e9[_0x382276(0x8f9)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x6771eb+=Number(RegExp['$1']);if(_0x33f9e9[_0x382276(0x8f9)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0xa53b12+=Number(RegExp['$1']);_0x33f9e9[_0x382276(0x8f9)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&('iSPxv'===_0x382276(0x42f)?(_0x6771eb+=Number(RegExp['$1']),_0xa53b12+=Number(RegExp['$2'])):(_0x5aa870[_0x382276(0x2d7)][_0x382276(0x361)][_0x382276(0x40b)](this),this[_0x382276(0x159)]()));const _0x5a584d=new Point(_0x6771eb,_0xa53b12);return _0x586d16[_0x382276(0x8e1)](),_0x586d16[_0x382276(0x5f7)][_0x382276(0x9c3)](_0x5a584d);},Sprite_AnimationMV['prototype'][_0x161145(0x594)]=function(){const _0x4a6320=_0x161145;this[_0x4a6320(0x160)]=VisuMZ['CoreEngine'][_0x4a6320(0x7a5)]['QoL'][_0x4a6320(0x8b2)]??0x4,this[_0x4a6320(0x51a)](),this[_0x4a6320(0x160)]=this[_0x4a6320(0x160)][_0x4a6320(0x829)](0x1,0xa);},Sprite_AnimationMV[_0x161145(0x2d7)][_0x161145(0x51a)]=function(){const _0x43588c=_0x161145;if(!this[_0x43588c(0x8b1)]);const _0x6ad941=this[_0x43588c(0x8b1)]['name']||'';_0x6ad941[_0x43588c(0x8f9)](/<RATE:[ ](\d+)>/i)&&(this[_0x43588c(0x160)]=(Number(RegExp['$1'])||0x1)[_0x43588c(0x829)](0x1,0xa));},Sprite_AnimationMV['prototype'][_0x161145(0x741)]=function(_0x4031af){this['_muteSound']=_0x4031af;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x376)]=Sprite_AnimationMV[_0x161145(0x2d7)][_0x161145(0x58f)],Sprite_AnimationMV[_0x161145(0x2d7)]['processTimingData']=function(_0x7679ba){const _0x5a10fd=_0x161145;this[_0x5a10fd(0x925)]&&(_0x5a10fd(0x375)===_0x5a10fd(0x375)?(_0x7679ba=JsonEx[_0x5a10fd(0x35a)](_0x7679ba),_0x7679ba['se']&&(_0x7679ba['se'][_0x5a10fd(0x2c2)]=0x0)):this['_forcedBattleSys']=_0x5a10fd(0x869)),VisuMZ[_0x5a10fd(0x9cf)][_0x5a10fd(0x376)][_0x5a10fd(0x40b)](this,_0x7679ba);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x1f6)]=Sprite_AnimationMV['prototype']['updatePosition'],Sprite_AnimationMV[_0x161145(0x2d7)][_0x161145(0x7ad)]=function(){const _0xddfe7d=_0x161145;VisuMZ[_0xddfe7d(0x9cf)][_0xddfe7d(0x1f6)][_0xddfe7d(0x40b)](this);if(this[_0xddfe7d(0x8b1)][_0xddfe7d(0x2d9)]===0x3){if(this['x']===0x0)this['x']=Math[_0xddfe7d(0x8c8)](Graphics[_0xddfe7d(0x3ea)]/0x2);if(this['y']===0x0)this['y']=Math['round'](Graphics[_0xddfe7d(0x46b)]/0x2);}},Sprite_Damage[_0x161145(0x2d7)][_0x161145(0x559)]=function(_0x4d4fbf){const _0x3481f9=_0x161145;let _0x3f1ed9=Math[_0x3481f9(0x38e)](_0x4d4fbf)['toString']();this[_0x3481f9(0x912)]()&&(_0x3f1ed9=VisuMZ[_0x3481f9(0x3e0)](_0x3f1ed9));const _0x1d0bea=this[_0x3481f9(0x324)](),_0x5a6498=Math[_0x3481f9(0x7f2)](_0x1d0bea*0.75);for(let _0xd6b367=0x0;_0xd6b367<_0x3f1ed9['length'];_0xd6b367++){if(_0x3481f9(0x4a3)!==_0x3481f9(0x529)){const _0x4ae112=this['createChildSprite'](_0x5a6498,_0x1d0bea);_0x4ae112[_0x3481f9(0x436)]['drawText'](_0x3f1ed9[_0xd6b367],0x0,0x0,_0x5a6498,_0x1d0bea,'center'),_0x4ae112['x']=(_0xd6b367-(_0x3f1ed9[_0x3481f9(0x300)]-0x1)/0x2)*_0x5a6498,_0x4ae112['dy']=-_0xd6b367;}else this['refreshWithTextCodeSupport']();}},Sprite_Damage[_0x161145(0x2d7)][_0x161145(0x912)]=function(){const _0x2fc338=_0x161145;return VisuMZ['CoreEngine']['Settings'][_0x2fc338(0x678)]['DigitGroupingDamageSprites'];},Sprite_Damage[_0x161145(0x2d7)][_0x161145(0x19f)]=function(){const _0x224155=_0x161145;return ColorManager[_0x224155(0x18b)]();},VisuMZ['CoreEngine'][_0x161145(0x58d)]=Sprite_Gauge[_0x161145(0x2d7)][_0x161145(0x494)],Sprite_Gauge[_0x161145(0x2d7)][_0x161145(0x494)]=function(){const _0x115848=_0x161145;return VisuMZ['CoreEngine']['Sprite_Gauge_gaugeRate'][_0x115848(0x40b)](this)[_0x115848(0x829)](0x0,0x1);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x27b)]=Sprite_Gauge['prototype'][_0x161145(0x7fa)],Sprite_Gauge[_0x161145(0x2d7)][_0x161145(0x7fa)]=function(){const _0x171314=_0x161145;let _0x1026bb=VisuMZ[_0x171314(0x9cf)][_0x171314(0x27b)][_0x171314(0x40b)](this);return _0x1026bb;},Sprite_Gauge['prototype'][_0x161145(0x736)]=function(){const _0x5ebd3a=_0x161145;let _0x40f6c0=this[_0x5ebd3a(0x7fa)]();this[_0x5ebd3a(0x912)]()&&(_0x40f6c0=VisuMZ[_0x5ebd3a(0x3e0)](_0x40f6c0));const _0x4c99d9=this['bitmapWidth']()-0x1,_0x2859a1=this[_0x5ebd3a(0x7ea)]?this[_0x5ebd3a(0x7ea)]():this['bitmapHeight']();this[_0x5ebd3a(0x4b0)](),this[_0x5ebd3a(0x436)]['drawText'](_0x40f6c0,0x0,0x0,_0x4c99d9,_0x2859a1,'right');},Sprite_Gauge[_0x161145(0x2d7)][_0x161145(0x818)]=function(){return 0x3;},Sprite_Gauge['prototype'][_0x161145(0x912)]=function(){const _0x5b9ca7=_0x161145;return VisuMZ[_0x5b9ca7(0x9cf)]['Settings'][_0x5b9ca7(0x678)][_0x5b9ca7(0x45d)];},Sprite_Gauge['prototype'][_0x161145(0x19f)]=function(){return ColorManager['outlineColorGauge']();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x859)]=Sprite_Picture[_0x161145(0x2d7)][_0x161145(0x3ff)],Sprite_Picture[_0x161145(0x2d7)][_0x161145(0x3ff)]=function(){const _0x2867da=_0x161145;this['_pictureName']&&this[_0x2867da(0x322)][_0x2867da(0x8f9)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x2867da(0x6a2)](Number(RegExp['$1'])):VisuMZ[_0x2867da(0x9cf)][_0x2867da(0x859)][_0x2867da(0x40b)](this);},Sprite_Picture['prototype'][_0x161145(0x6a2)]=function(_0x239d6c){const _0x2e7492=_0x161145,_0x12aa6c=ImageManager[_0x2e7492(0x669)],_0x2e50b9=ImageManager[_0x2e7492(0x83f)],_0x476cbb=this['_pictureName'][_0x2e7492(0x8f9)](/SMOOTH/i);this[_0x2e7492(0x436)]=new Bitmap(_0x12aa6c,_0x2e50b9);const _0x29485f=ImageManager[_0x2e7492(0x47c)](_0x2e7492(0x8b8)),_0x14925e=_0x239d6c%0x10*_0x12aa6c,_0x3d3ade=Math[_0x2e7492(0x7f2)](_0x239d6c/0x10)*_0x2e50b9;this[_0x2e7492(0x436)][_0x2e7492(0x7d4)]=_0x476cbb,this[_0x2e7492(0x436)][_0x2e7492(0x5d6)](_0x29485f,_0x14925e,_0x3d3ade,_0x12aa6c,_0x2e50b9,0x0,0x0,_0x12aa6c,_0x2e50b9);};function Sprite_TitlePictureButton(){const _0x912cf6=_0x161145;this[_0x912cf6(0x4fb)](...arguments);}Sprite_TitlePictureButton[_0x161145(0x2d7)]=Object['create'](Sprite_Clickable['prototype']),Sprite_TitlePictureButton[_0x161145(0x2d7)][_0x161145(0x4e8)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x161145(0x2d7)][_0x161145(0x4fb)]=function(_0x486c76){const _0x3b8b0b=_0x161145;Sprite_Clickable[_0x3b8b0b(0x2d7)]['initialize'][_0x3b8b0b(0x40b)](this),this[_0x3b8b0b(0x905)]=_0x486c76,this[_0x3b8b0b(0x176)]=null,this[_0x3b8b0b(0x935)]();},Sprite_TitlePictureButton[_0x161145(0x2d7)]['setup']=function(){const _0x42297b=_0x161145;this['x']=Graphics[_0x42297b(0x3ea)],this['y']=Graphics[_0x42297b(0x46b)],this[_0x42297b(0x949)]=![],this[_0x42297b(0x570)]();},Sprite_TitlePictureButton[_0x161145(0x2d7)][_0x161145(0x570)]=function(){const _0x1d317d=_0x161145;this[_0x1d317d(0x436)]=ImageManager[_0x1d317d(0x2c1)](this['_data'][_0x1d317d(0x6bf)]),this[_0x1d317d(0x436)][_0x1d317d(0x1e0)](this[_0x1d317d(0x9b4)][_0x1d317d(0x68f)](this));},Sprite_TitlePictureButton[_0x161145(0x2d7)]['onButtonImageLoad']=function(){const _0x2b30a0=_0x161145;this[_0x2b30a0(0x905)][_0x2b30a0(0x4bd)][_0x2b30a0(0x40b)](this),this[_0x2b30a0(0x905)][_0x2b30a0(0x18e)][_0x2b30a0(0x40b)](this),this[_0x2b30a0(0x27a)](this[_0x2b30a0(0x905)][_0x2b30a0(0x2b3)][_0x2b30a0(0x68f)](this));},Sprite_TitlePictureButton[_0x161145(0x2d7)][_0x161145(0x361)]=function(){const _0x360ba6=_0x161145;Sprite_Clickable[_0x360ba6(0x2d7)][_0x360ba6(0x361)][_0x360ba6(0x40b)](this),this['updateOpacity'](),this[_0x360ba6(0x5d3)]();},Sprite_TitlePictureButton[_0x161145(0x2d7)][_0x161145(0x51c)]=function(){const _0x1db911=_0x161145;return VisuMZ[_0x1db911(0x9cf)][_0x1db911(0x7a5)][_0x1db911(0x911)][_0x1db911(0x391)][_0x1db911(0x78f)];},Sprite_TitlePictureButton['prototype']['updateOpacity']=function(){const _0x18565d=_0x161145;this[_0x18565d(0x714)]||this['_hovered']?this['opacity']=0xff:(this[_0x18565d(0x1c4)]+=this[_0x18565d(0x949)]?this[_0x18565d(0x51c)]():-0x1*this[_0x18565d(0x51c)](),this['opacity']=Math[_0x18565d(0x2da)](0xc0,this['opacity']));},Sprite_TitlePictureButton[_0x161145(0x2d7)]['setClickHandler']=function(_0x7cd95f){const _0x2ed174=_0x161145;this[_0x2ed174(0x176)]=_0x7cd95f;},Sprite_TitlePictureButton[_0x161145(0x2d7)]['onClick']=function(){const _0xf2fa1a=_0x161145;this['_clickHandler']&&(_0xf2fa1a(0x567)===_0xf2fa1a(0x17f)?(_0x5bfbd6[_0xf2fa1a(0x8aa)]=_0x674d68,_0x52baac[_0xf2fa1a(0x557)](),_0x5b6316[_0xf2fa1a(0x557)]()):this['_clickHandler']());},VisuMZ[_0x161145(0x9cf)][_0x161145(0x652)]=Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x4fb)],Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x4fb)]=function(){const _0x23d12d=_0x161145;VisuMZ['CoreEngine'][_0x23d12d(0x652)][_0x23d12d(0x40b)](this),this[_0x23d12d(0x28a)]();},Spriteset_Base['prototype'][_0x161145(0x28a)]=function(){const _0x568b82=_0x161145;this['_fauxAnimationSprites']=[],this[_0x568b82(0x63e)]=[],this[_0x568b82(0x320)]=this[_0x568b82(0x430)]['x'],this[_0x568b82(0x195)]=this[_0x568b82(0x430)]['y'];},VisuMZ[_0x161145(0x9cf)][_0x161145(0x584)]=Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x1b7)],Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x1b7)]=function(_0x2ae3d6){const _0x593d55=_0x161145;this[_0x593d55(0x59e)](),this[_0x593d55(0x48a)](),VisuMZ['CoreEngine']['Spriteset_Base_destroy'][_0x593d55(0x40b)](this,_0x2ae3d6);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x892)]=Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x361)],Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x361)]=function(){const _0x10f7cd=_0x161145;VisuMZ['CoreEngine'][_0x10f7cd(0x892)][_0x10f7cd(0x40b)](this),this['updatePictureAntiZoom'](),this[_0x10f7cd(0x4b1)](),this[_0x10f7cd(0x824)]();},Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x55d)]=function(){const _0x2b4bb8=_0x161145;if(!VisuMZ['CoreEngine'][_0x2b4bb8(0x7a5)][_0x2b4bb8(0x678)][_0x2b4bb8(0x9c1)])return;if(this['_cacheScaleX']===this[_0x2b4bb8(0x430)]['x']&&this['_cacheScaleY']===this[_0x2b4bb8(0x430)]['y'])return;this[_0x2b4bb8(0x3bb)](),this['_cacheScaleX']=this['scale']['x'],this[_0x2b4bb8(0x195)]=this['scale']['y'];},Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x3bb)]=function(){const _0x2d0883=_0x161145;if(SceneManager[_0x2d0883(0x72b)]()&&Spriteset_Map[_0x2d0883(0x848)]){if(_0x2d0883(0x94a)===_0x2d0883(0x2e8)){const _0x246048=this['itemLineRect'](_0x323352),_0x417d56=_0x2ca1b6[_0x2d0883(0x9cf)][_0x2d0883(0x7a5)]['Param']['DisplayedParams'][_0x41737a],_0x1a57e9=_0x391783[_0x2d0883(0x762)](_0x417d56),_0x551fed=this[_0x2d0883(0x426)][_0x2d0883(0x187)](_0x417d56,!![]);this[_0x2d0883(0x347)](_0x246048['x'],_0x246048['y'],0xa0,_0x417d56,![]),this[_0x2d0883(0x83b)](),this[_0x2d0883(0x4c4)](_0x551fed,_0x246048['x']+0xa0,_0x246048['y'],0x3c,_0x2d0883(0x870));}else return;}else{if(SceneManager[_0x2d0883(0x885)]()&&Spriteset_Battle['DETACH_PICTURE_CONTAINER']){if('eBYAk'!=='RZtSy')return;else{_0x2c603a[_0x2d0883(0x767)](_0x36b478,_0x2cdc74);const _0x29dad6=_0x20e824[_0x2d0883(0x8c8)](_0x13ae79['volume'])[_0x2d0883(0x829)](0x0,0x64),_0x35e2d7=_0x37ee7d[_0x2d0883(0x90e)];_0x35e2d7&&(_0x35e2d7[_0x2d0883(0x2c2)]=_0x29dad6,_0x58a244[_0x2d0883(0x746)](_0x35e2d7));}}}if(this[_0x2d0883(0x430)]['x']!==0x0){if(_0x2d0883(0x3fd)===_0x2d0883(0x4f2))return _0x1957cf[_0x2d0883(0x9cf)][_0x2d0883(0x7a5)][_0x2d0883(0x9ab)][_0x2d0883(0x48c)]['call'](this,_0x22296a);else this['_pictureContainer'][_0x2d0883(0x430)]['x']=0x1/this[_0x2d0883(0x430)]['x'],this[_0x2d0883(0x520)]['x']=-(this['x']/this[_0x2d0883(0x430)]['x']);}if(this[_0x2d0883(0x430)]['y']!==0x0){if(_0x2d0883(0x8a9)!==_0x2d0883(0x2aa))this['_pictureContainer']['scale']['y']=0x1/this['scale']['y'],this[_0x2d0883(0x520)]['y']=-(this['y']/this[_0x2d0883(0x430)]['y']);else{if(_0x228b2a[_0x2d0883(0x42c)]==='')return![];if(_0x41c6cb[_0x2d0883(0x42c)]===_0x2d0883(0x1cb))return![];if(_0x3acab1[_0x2d0883(0x3f8)]==='')return![];if(_0x2b4f5a[_0x2d0883(0x3f8)]===_0x2d0883(0x825))return![];return!![];}}},VisuMZ[_0x161145(0x9cf)][_0x161145(0x9cb)]=Spriteset_Base[_0x161145(0x2d7)]['updatePosition'],Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x7ad)]=function(){const _0x673e2c=_0x161145;VisuMZ[_0x673e2c(0x9cf)][_0x673e2c(0x9cb)][_0x673e2c(0x40b)](this),this[_0x673e2c(0x868)]();},Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x868)]=function(){const _0x28d5c6=_0x161145;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0x28d5c6(0x8c8)]($gameScreen[_0x28d5c6(0x573)]());const _0x5ebd6a=$gameScreen[_0x28d5c6(0x1ac)]();switch($gameScreen[_0x28d5c6(0x1ac)]()){case _0x28d5c6(0x23c):this[_0x28d5c6(0x222)]();break;case'horizontal':this[_0x28d5c6(0x7ec)]();break;case _0x28d5c6(0x85a):this[_0x28d5c6(0x5b1)]();break;default:this[_0x28d5c6(0x536)]();break;}},Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x222)]=function(){const _0x545b88=_0x161145,_0x146386=VisuMZ[_0x545b88(0x9cf)]['Settings']['ScreenShake'];if(_0x146386&&_0x146386[_0x545b88(0x3a0)])return _0x146386[_0x545b88(0x3a0)][_0x545b88(0x40b)](this);this['x']+=Math['round']($gameScreen[_0x545b88(0x573)]());},Spriteset_Base[_0x161145(0x2d7)]['updatePositionCoreEngineShakeRand']=function(){const _0x3dad57=_0x161145,_0xc2ae11=VisuMZ[_0x3dad57(0x9cf)]['Settings'][_0x3dad57(0x50c)];if(_0xc2ae11&&_0xc2ae11[_0x3dad57(0x6f5)])return _0xc2ae11[_0x3dad57(0x6f5)][_0x3dad57(0x40b)](this);const _0x29c53c=$gameScreen[_0x3dad57(0x92c)]*0.75,_0x335c1a=$gameScreen[_0x3dad57(0x952)]*0.6,_0x567c48=$gameScreen['_shakeDuration'];this['x']+=Math[_0x3dad57(0x8c8)](Math[_0x3dad57(0x1b2)](_0x29c53c)-Math['randomInt'](_0x335c1a))*(Math[_0x3dad57(0x2da)](_0x567c48,0x1e)*0.5),this['y']+=Math[_0x3dad57(0x8c8)](Math[_0x3dad57(0x1b2)](_0x29c53c)-Math[_0x3dad57(0x1b2)](_0x335c1a))*(Math['min'](_0x567c48,0x1e)*0.5);},Spriteset_Base[_0x161145(0x2d7)]['updatePositionCoreEngineShakeHorz']=function(){const _0x4cf74c=_0x161145,_0x152983=VisuMZ[_0x4cf74c(0x9cf)][_0x4cf74c(0x7a5)][_0x4cf74c(0x50c)];if(_0x152983&&_0x152983[_0x4cf74c(0x49c)]){if(_0x4cf74c(0x224)===_0x4cf74c(0x224))return _0x152983[_0x4cf74c(0x49c)]['call'](this);else _0x20d5e1[_0x4cf74c(0x568)](!_0x1a8bbd['isSideView']());}const _0x489434=$gameScreen[_0x4cf74c(0x92c)]*0.75,_0x340fdf=$gameScreen[_0x4cf74c(0x952)]*0.6,_0x43b3e9=$gameScreen[_0x4cf74c(0x823)];this['x']+=Math[_0x4cf74c(0x8c8)](Math[_0x4cf74c(0x1b2)](_0x489434)-Math[_0x4cf74c(0x1b2)](_0x340fdf))*(Math['min'](_0x43b3e9,0x1e)*0.5);},Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x5b1)]=function(){const _0x2243aa=_0x161145,_0x533226=VisuMZ[_0x2243aa(0x9cf)][_0x2243aa(0x7a5)]['ScreenShake'];if(_0x533226&&_0x533226[_0x2243aa(0x52d)])return _0x533226[_0x2243aa(0x52d)][_0x2243aa(0x40b)](this);const _0x1aa8c9=$gameScreen[_0x2243aa(0x92c)]*0.75,_0x24b2f0=$gameScreen[_0x2243aa(0x952)]*0.6,_0x13be74=$gameScreen['_shakeDuration'];this['y']+=Math[_0x2243aa(0x8c8)](Math[_0x2243aa(0x1b2)](_0x1aa8c9)-Math[_0x2243aa(0x1b2)](_0x24b2f0))*(Math[_0x2243aa(0x2da)](_0x13be74,0x1e)*0.5);},Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x4b1)]=function(){const _0x4dd2e7=_0x161145;for(const _0x4c0534 of this['_fauxAnimationSprites']){!_0x4c0534[_0x4dd2e7(0x44f)]()&&this[_0x4dd2e7(0x20a)](_0x4c0534);}this[_0x4dd2e7(0x7c6)]();},Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x7c6)]=function(){const _0x4ef901=_0x161145;for(;;){const _0x2b61c4=$gameTemp[_0x4ef901(0x963)]();if(_0x2b61c4)this[_0x4ef901(0x32b)](_0x2b61c4);else break;}},Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x32b)]=function(_0xa88993){const _0x4c5c9c=_0x161145,_0x1b7db6=$dataAnimations[_0xa88993[_0x4c5c9c(0x2a2)]],_0x1d9f17=_0xa88993[_0x4c5c9c(0x858)],_0x5d1c3f=_0xa88993[_0x4c5c9c(0x2ff)],_0x41476d=_0xa88993[_0x4c5c9c(0x18c)];let _0x178792=this[_0x4c5c9c(0x4eb)]();const _0xd07a3e=this[_0x4c5c9c(0x679)]();if(this[_0x4c5c9c(0x813)](_0x1b7db6)){if(_0x4c5c9c(0x200)===_0x4c5c9c(0x908)){const _0xf81bf0=(_0x145d59[_0x4c5c9c(0x9cf)][_0x4c5c9c(0x7a5)]['BattleSystem']||_0x4c5c9c(0x5f9))[_0x4c5c9c(0x7c3)]()[_0x4c5c9c(0x753)]();return _0x27671c[_0x4c5c9c(0x9cf)][_0x4c5c9c(0x96c)](_0xf81bf0);}else for(const _0x3f787f of _0x1d9f17){this[_0x4c5c9c(0x8c1)]([_0x3f787f],_0x1b7db6,_0x5d1c3f,_0x178792,_0x41476d),_0x178792+=_0xd07a3e;}}else this[_0x4c5c9c(0x8c1)](_0x1d9f17,_0x1b7db6,_0x5d1c3f,_0x178792,_0x41476d);},Spriteset_Base[_0x161145(0x2d7)]['createFauxAnimationSprite']=function(_0x69a003,_0x254168,_0x316756,_0x83d18,_0x3585a4){const _0x50dff3=_0x161145,_0x374784=this['isMVAnimation'](_0x254168),_0x34e89f=new(_0x374784?Sprite_AnimationMV:Sprite_Animation)(),_0x453c2d=this[_0x50dff3(0x49f)](_0x69a003);this[_0x50dff3(0x393)](_0x69a003[0x0])&&(_0x316756=!_0x316756),_0x34e89f[_0x50dff3(0x6b9)]=_0x69a003,_0x34e89f[_0x50dff3(0x935)](_0x453c2d,_0x254168,_0x316756,_0x83d18),_0x34e89f[_0x50dff3(0x741)](_0x3585a4),this[_0x50dff3(0x2e5)][_0x50dff3(0x784)](_0x34e89f),this[_0x50dff3(0x616)][_0x50dff3(0x31e)](_0x34e89f);},Spriteset_Base['prototype']['removeFauxAnimation']=function(_0x3dd990){const _0x178b01=_0x161145;this[_0x178b01(0x616)][_0x178b01(0x748)](_0x3dd990),this[_0x178b01(0x2e5)][_0x178b01(0x86f)](_0x3dd990);for(const _0x48c729 of _0x3dd990[_0x178b01(0x6b9)]){if('HXIFC'===_0x178b01(0x63d)){if(_0x48c729['endAnimation']){if('cXudT'===_0x178b01(0x95f))_0x48c729[_0x178b01(0x661)]();else{const _0x14ae75=_0x583f63[_0x178b01(0x1a6)](_0x460cfd,_0x178b01(0x56a));}}}else this[_0x178b01(0x508)]=_0x4acfac;}_0x3dd990['destroy']();},Spriteset_Base['prototype'][_0x161145(0x59e)]=function(){const _0x3e27bf=_0x161145;for(const _0x5db65a of this[_0x3e27bf(0x616)]){if(_0x3e27bf(0x561)!=='bdnTn')try{_0x560e1c[_0x3e27bf(0x9cf)][_0x3e27bf(0x6b0)][_0x3e27bf(0x40b)](this,_0x1e29bb);}catch(_0xce1a54){if(_0x406d02['isPlaytest']())_0x45efcf[_0x3e27bf(0x312)](_0xce1a54);}else this[_0x3e27bf(0x20a)](_0x5db65a);}},Spriteset_Base['prototype']['isFauxAnimationPlaying']=function(){const _0x2660c4=_0x161145;return this[_0x2660c4(0x616)][_0x2660c4(0x300)]>0x0;},Spriteset_Base[_0x161145(0x2d7)]['updatePointAnimations']=function(){const _0x1f9f18=_0x161145;for(const _0x1600cb of this['_pointAnimationSprites']){_0x1f9f18(0x8bc)==='kTAKq'?this[_0x1f9f18(0x836)]():!_0x1600cb[_0x1f9f18(0x44f)]()&&('bduxa'===_0x1f9f18(0x9d2)?this['removePointAnimation'](_0x4e2f0c):this[_0x1f9f18(0x170)](_0x1600cb));}this['processPointAnimationRequests']();},Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x2ee)]=function(){const _0x12b6a3=_0x161145;for(;;){if(_0x12b6a3(0x5a8)!==_0x12b6a3(0x5a8))_0x194ee4['isTriggered'](_0x12b6a3(0x4c8))&&(_0x499a61[_0x12b6a3(0x872)]=!_0x40cef9['alwaysDash'],_0x1f3844[_0x12b6a3(0x272)]());else{const _0x39e3e5=$gameTemp[_0x12b6a3(0x87e)]();if(_0x39e3e5)'kqIhy'==='kqIhy'?this[_0x12b6a3(0x399)](_0x39e3e5):(_0x1f1a03[_0x12b6a3(0x9cf)][_0x12b6a3(0x7d6)][_0x12b6a3(0x40b)](this,_0x17697d,_0x2808cd,_0x4d2555,_0x57df2b,_0x1f72f3,_0x5dc49b,_0x177d57,_0x44a8a6,_0x21fcfc),this['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0xafd2b9]||{'x':0x0,'y':0x0}));else break;}}},Spriteset_Base['prototype'][_0x161145(0x399)]=function(_0x1c15db){const _0x170aca=_0x161145,_0x511fea=$dataAnimations[_0x1c15db[_0x170aca(0x2a2)]],_0x1d8fa5=this['createPointAnimationTargets'](_0x1c15db),_0x17d092=_0x1c15db[_0x170aca(0x2ff)],_0x3bb577=_0x1c15db[_0x170aca(0x18c)];let _0x12b5c2=this[_0x170aca(0x4eb)]();const _0x1daae9=this[_0x170aca(0x679)]();if(this['isAnimationForEach'](_0x511fea))for(const _0x1d824d of _0x1d8fa5){this[_0x170aca(0x926)]([_0x1d824d],_0x511fea,_0x17d092,_0x12b5c2,_0x3bb577),_0x12b5c2+=_0x1daae9;}else this['createPointAnimationSprite'](_0x1d8fa5,_0x511fea,_0x17d092,_0x12b5c2,_0x3bb577);},Spriteset_Base['prototype'][_0x161145(0x1be)]=function(_0x128494){const _0x52b7ff=_0x161145,_0x1e56ff=new Sprite_Clickable();_0x1e56ff['x']=_0x128494['x'],_0x1e56ff['y']=_0x128494['y'],_0x1e56ff['z']=0x64;const _0xdfba0a=this[_0x52b7ff(0x566)]();return _0xdfba0a[_0x52b7ff(0x784)](_0x1e56ff),[_0x1e56ff];},Spriteset_Base[_0x161145(0x2d7)]['getPointAnimationLayer']=function(){return this;},Spriteset_Map[_0x161145(0x2d7)]['getPointAnimationLayer']=function(){const _0x26a1d5=_0x161145;return this[_0x26a1d5(0x281)]||this;},Spriteset_Battle['prototype'][_0x161145(0x566)]=function(){const _0x4d06ff=_0x161145;return this[_0x4d06ff(0x9ae)]||this;},Spriteset_Base[_0x161145(0x2d7)]['createPointAnimationSprite']=function(_0x476c0f,_0x2893d9,_0x437d33,_0x5ca2fa,_0x2fac47){const _0x47d362=_0x161145,_0x2255f3=this[_0x47d362(0x20d)](_0x2893d9),_0x28ac11=new(_0x2255f3?Sprite_AnimationMV:Sprite_Animation)();_0x28ac11[_0x47d362(0x6b9)]=_0x476c0f,_0x28ac11[_0x47d362(0x935)](_0x476c0f,_0x2893d9,_0x437d33,_0x5ca2fa),_0x28ac11['setMute'](_0x2fac47),this[_0x47d362(0x2e5)]['addChild'](_0x28ac11),this[_0x47d362(0x63e)][_0x47d362(0x31e)](_0x28ac11);},Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x170)]=function(_0x23850e){const _0x548f60=_0x161145;this[_0x548f60(0x63e)][_0x548f60(0x748)](_0x23850e),this[_0x548f60(0x2e5)][_0x548f60(0x86f)](_0x23850e);for(const _0x3a90cc of _0x23850e[_0x548f60(0x6b9)]){_0x3a90cc[_0x548f60(0x661)]&&(_0x548f60(0x7f1)!==_0x548f60(0x7f1)?0x1-this['itemEva'](_0x5295b7)>this[_0x548f60(0x4a5)](_0x185828)&&(_0x22dfe3[_0x548f60(0x92f)]=![],_0x14cccf['evaded']=!![]):_0x3a90cc[_0x548f60(0x661)]());const _0x29ee62=this['getPointAnimationLayer']();if(_0x29ee62)_0x29ee62['removeChild'](_0x3a90cc);}_0x23850e[_0x548f60(0x1b7)]();},Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x48a)]=function(){const _0x25b028=_0x161145;for(const _0x654250 of this[_0x25b028(0x63e)]){this['removePointAnimation'](_0x654250);}},Spriteset_Base['prototype'][_0x161145(0x456)]=function(){const _0x2ea37f=_0x161145;return this[_0x2ea37f(0x63e)][_0x2ea37f(0x300)]>0x0;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x79f)]=Spriteset_Base[_0x161145(0x2d7)][_0x161145(0x6fd)],Spriteset_Base[_0x161145(0x2d7)]['isAnimationPlaying']=function(){const _0x87640c=_0x161145;return VisuMZ['CoreEngine'][_0x87640c(0x79f)]['call'](this)||this[_0x87640c(0x456)]();},Spriteset_Map['DETACH_PICTURE_CONTAINER']=VisuMZ['CoreEngine'][_0x161145(0x7a5)][_0x161145(0x678)][_0x161145(0x310)]||![],VisuMZ[_0x161145(0x9cf)][_0x161145(0x204)]=Scene_Map[_0x161145(0x2d7)][_0x161145(0x77e)],Scene_Map[_0x161145(0x2d7)][_0x161145(0x77e)]=function(){const _0xf5c7d3=_0x161145;VisuMZ[_0xf5c7d3(0x9cf)][_0xf5c7d3(0x204)][_0xf5c7d3(0x40b)](this);if(!Spriteset_Map['DETACH_PICTURE_CONTAINER'])return;const _0x122063=this[_0xf5c7d3(0x514)];if(!_0x122063)return;this[_0xf5c7d3(0x520)]=_0x122063[_0xf5c7d3(0x520)];if(!this[_0xf5c7d3(0x520)])return;this[_0xf5c7d3(0x784)](this[_0xf5c7d3(0x520)]);},Spriteset_Battle[_0x161145(0x848)]=VisuMZ[_0x161145(0x9cf)][_0x161145(0x7a5)][_0x161145(0x678)][_0x161145(0x57d)]||![],VisuMZ['CoreEngine'][_0x161145(0x8ac)]=Scene_Battle[_0x161145(0x2d7)][_0x161145(0x77e)],Scene_Battle[_0x161145(0x2d7)][_0x161145(0x77e)]=function(){const _0x14ab71=_0x161145;VisuMZ['CoreEngine'][_0x14ab71(0x8ac)][_0x14ab71(0x40b)](this);if(!Spriteset_Battle[_0x14ab71(0x848)])return;const _0x296641=this[_0x14ab71(0x514)];if(!_0x296641)return;this['_pictureContainer']=_0x296641['_pictureContainer'];if(!this['_pictureContainer'])return;this['addChild'](this[_0x14ab71(0x520)]);},Spriteset_Battle['prototype'][_0x161145(0x70c)]=function(){const _0x43e4e4=_0x161145;this[_0x43e4e4(0x168)]=new PIXI[(_0x43e4e4(0x725))][(_0x43e4e4(0x552))](clamp=!![]),this[_0x43e4e4(0x6bb)]=new Sprite(),this['_backgroundSprite'][_0x43e4e4(0x436)]=SceneManager['backgroundBitmap'](),this[_0x43e4e4(0x6bb)]['filters']=[this[_0x43e4e4(0x168)]],this['_baseSprite']['addChild'](this[_0x43e4e4(0x6bb)]);},VisuMZ['CoreEngine'][_0x161145(0x82e)]=Spriteset_Battle[_0x161145(0x2d7)][_0x161145(0x743)],Spriteset_Battle[_0x161145(0x2d7)][_0x161145(0x743)]=function(){const _0x340887=_0x161145;this[_0x340887(0x429)]()&&this[_0x340887(0x893)](),VisuMZ['CoreEngine'][_0x340887(0x82e)][_0x340887(0x40b)](this);},Spriteset_Battle[_0x161145(0x2d7)]['coreEngineRepositionEnemies']=function(){const _0x4341ac=_0x161145,_0x3a890a=VisuMZ[_0x4341ac(0x9cf)][_0x4341ac(0x7a5)][_0x4341ac(0x492)];if(!_0x3a890a)return![];if(Utils['RPGMAKER_VERSION']>=_0x4341ac(0x756)&&!_0x3a890a[_0x4341ac(0x225)])return![];return _0x3a890a['RepositionEnemies'];},Spriteset_Battle[_0x161145(0x2d7)]['repositionEnemiesByResolution']=function(){const _0x45d599=_0x161145;for(member of $gameTroop[_0x45d599(0x305)]()){member[_0x45d599(0x321)]();}},VisuMZ[_0x161145(0x9cf)][_0x161145(0x15e)]=Window_Base['prototype'][_0x161145(0x4fb)],Window_Base[_0x161145(0x2d7)][_0x161145(0x4fb)]=function(_0x55361d){const _0x4bd525=_0x161145;_0x55361d['x']=Math[_0x4bd525(0x8c8)](_0x55361d['x']),_0x55361d['y']=Math[_0x4bd525(0x8c8)](_0x55361d['y']),_0x55361d['width']=Math[_0x4bd525(0x8c8)](_0x55361d[_0x4bd525(0x3ea)]),_0x55361d['height']=Math[_0x4bd525(0x8c8)](_0x55361d[_0x4bd525(0x46b)]),this[_0x4bd525(0x447)](),VisuMZ[_0x4bd525(0x9cf)][_0x4bd525(0x15e)][_0x4bd525(0x40b)](this,_0x55361d),this[_0x4bd525(0x17c)]();},Window_Base[_0x161145(0x2d7)][_0x161145(0x447)]=function(){const _0x5d62b3=_0x161145;this[_0x5d62b3(0x265)]=VisuMZ[_0x5d62b3(0x9cf)][_0x5d62b3(0x7a5)][_0x5d62b3(0x678)][_0x5d62b3(0x855)],this[_0x5d62b3(0x314)]=VisuMZ['CoreEngine'][_0x5d62b3(0x7a5)][_0x5d62b3(0x678)][_0x5d62b3(0x174)];},Window_Base['prototype'][_0x161145(0x986)]=function(){const _0x43e78b=_0x161145;return VisuMZ['CoreEngine'][_0x43e78b(0x7a5)]['Window']['LineHeight'];},Window_Base[_0x161145(0x2d7)]['itemPadding']=function(){const _0x5f12f6=_0x161145;return VisuMZ[_0x5f12f6(0x9cf)]['Settings'][_0x5f12f6(0x651)][_0x5f12f6(0x644)];},Window_Base[_0x161145(0x2d7)][_0x161145(0x691)]=function(){const _0x5bced3=_0x161145;$gameSystem[_0x5bced3(0x717)]?_0x5bced3(0x4a1)==='vulps'?_0x5a23a8['CoreEngine'][_0x5bced3(0x80c)][_0x5bced3(0x40b)](this):this[_0x5bced3(0x4c9)]=$gameSystem[_0x5bced3(0x717)]():this[_0x5bced3(0x4c9)]=VisuMZ[_0x5bced3(0x9cf)][_0x5bced3(0x7a5)][_0x5bced3(0x651)]['BackOpacity'];},Window_Base[_0x161145(0x2d7)]['translucentOpacity']=function(){const _0x2d4350=_0x161145;return VisuMZ[_0x2d4350(0x9cf)][_0x2d4350(0x7a5)][_0x2d4350(0x651)][_0x2d4350(0x5d4)];},Window_Base['prototype'][_0x161145(0x451)]=function(){const _0x56f7ff=_0x161145;return VisuMZ[_0x56f7ff(0x9cf)][_0x56f7ff(0x7a5)][_0x56f7ff(0x651)][_0x56f7ff(0x6e6)];},VisuMZ[_0x161145(0x9cf)][_0x161145(0x921)]=Window_Base['prototype']['update'],Window_Base[_0x161145(0x2d7)][_0x161145(0x361)]=function(){const _0x4863ae=_0x161145;VisuMZ[_0x4863ae(0x9cf)][_0x4863ae(0x921)][_0x4863ae(0x40b)](this),this[_0x4863ae(0x243)]();},Window_Base[_0x161145(0x2d7)]['updateOpen']=function(){const _0x1ae3be=_0x161145;this[_0x1ae3be(0x296)]&&(this[_0x1ae3be(0x91b)]+=this['openingSpeed'](),this['isOpen']()&&(this['_opening']=![]));},Window_Base[_0x161145(0x2d7)][_0x161145(0x3c5)]=function(){const _0x35dcdc=_0x161145;if(this[_0x35dcdc(0x24d)]){if(_0x35dcdc(0x319)===_0x35dcdc(0x319))this['openness']-=this['openingSpeed'](),this[_0x35dcdc(0x30f)]()&&(this[_0x35dcdc(0x24d)]=![]);else{if(_0xad3d10(this[_0x35dcdc(0x680)])['length']>=this[_0x35dcdc(0x293)])return;const _0x57c334=_0x413032(_0xd01a4d(this[_0x35dcdc(0x680)])+_0x160129[_0x35dcdc(0x50a)]);if(_0x2811da(_0x57c334))return;this[_0x35dcdc(0x680)]=_0x57c334;const _0x5e501c='9'[_0x35dcdc(0x23b)](this[_0x35dcdc(0x293)]);this[_0x35dcdc(0x680)]=this[_0x35dcdc(0x680)][_0x35dcdc(0x829)](0x0,_0x5e501c),_0xb455e[_0x35dcdc(0x557)](),this[_0x35dcdc(0x9cd)](),_0x44cf64['playCursor'](),this[_0x35dcdc(0x6fb)](this['_maxDigits']-0x1);}}},VisuMZ[_0x161145(0x9cf)][_0x161145(0x420)]=Window_Base[_0x161145(0x2d7)][_0x161145(0x4c4)],Window_Base[_0x161145(0x2d7)]['drawText']=function(_0x515f29,_0x52c17d,_0x3b30a1,_0x4cefa9,_0x56252e){const _0x151d53=_0x161145;if(this[_0x151d53(0x912)]())_0x515f29=VisuMZ[_0x151d53(0x3e0)](_0x515f29);VisuMZ[_0x151d53(0x9cf)][_0x151d53(0x420)][_0x151d53(0x40b)](this,_0x515f29,_0x52c17d,_0x3b30a1,_0x4cefa9,_0x56252e);},Window_Base['prototype']['useDigitGrouping']=function(){return this['_digitGrouping'];},VisuMZ[_0x161145(0x9cf)][_0x161145(0x642)]=Window_Base['prototype'][_0x161145(0x837)],Window_Base[_0x161145(0x2d7)][_0x161145(0x837)]=function(_0x169603,_0x423053,_0x20eebc,_0x4e4162){const _0xe9cf93=_0x161145;var _0x2b7746=VisuMZ[_0xe9cf93(0x9cf)][_0xe9cf93(0x642)][_0xe9cf93(0x40b)](this,_0x169603,_0x423053,_0x20eebc,_0x4e4162);if(this[_0xe9cf93(0x46a)]())_0x2b7746[_0xe9cf93(0x444)]=VisuMZ[_0xe9cf93(0x3e0)](_0x2b7746[_0xe9cf93(0x444)]);return _0x2b7746;},Window_Base[_0x161145(0x2d7)]['useDigitGroupingEx']=function(){const _0x200831=_0x161145;return this[_0x200831(0x314)];},Window_Base[_0x161145(0x2d7)][_0x161145(0x2f9)]=function(_0x4d3a6f){this['_digitGrouping']=_0x4d3a6f;},Window_Base[_0x161145(0x2d7)][_0x161145(0x785)]=function(_0x463bf8){const _0x10fdb7=_0x161145;this[_0x10fdb7(0x314)]=_0x463bf8;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x75a)]=Window_Base[_0x161145(0x2d7)][_0x161145(0x43f)],Window_Base['prototype'][_0x161145(0x43f)]=function(_0x216c49,_0x3ddff6,_0x4abe23){const _0x30cf00=_0x161145;_0x3ddff6=Math[_0x30cf00(0x8c8)](_0x3ddff6),_0x4abe23=Math[_0x30cf00(0x8c8)](_0x4abe23),VisuMZ[_0x30cf00(0x9cf)]['Window_Base_drawIcon'][_0x30cf00(0x40b)](this,_0x216c49,_0x3ddff6,_0x4abe23);},VisuMZ['CoreEngine'][_0x161145(0x506)]=Window_Base['prototype'][_0x161145(0x4ff)],Window_Base['prototype']['drawFace']=function(_0x34a568,_0xd3349f,_0xf4e3b3,_0x149b69,_0x590a44,_0x2d7871){const _0x2067b7=_0x161145;_0x590a44=_0x590a44||ImageManager[_0x2067b7(0x38d)],_0x2d7871=_0x2d7871||ImageManager[_0x2067b7(0x352)],_0xf4e3b3=Math[_0x2067b7(0x8c8)](_0xf4e3b3),_0x149b69=Math[_0x2067b7(0x8c8)](_0x149b69),_0x590a44=Math['round'](_0x590a44),_0x2d7871=Math[_0x2067b7(0x8c8)](_0x2d7871),VisuMZ[_0x2067b7(0x9cf)]['Window_Base_drawFace']['call'](this,_0x34a568,_0xd3349f,_0xf4e3b3,_0x149b69,_0x590a44,_0x2d7871);},VisuMZ['CoreEngine']['Window_Base_drawCharacter']=Window_Base['prototype']['drawCharacter'],Window_Base[_0x161145(0x2d7)][_0x161145(0x2bd)]=function(_0x26ad7c,_0x1cb5b6,_0x1b4265,_0x594e41){const _0x59bfa3=_0x161145;_0x1b4265=Math['round'](_0x1b4265),_0x594e41=Math[_0x59bfa3(0x8c8)](_0x594e41),VisuMZ['CoreEngine'][_0x59bfa3(0x7b3)][_0x59bfa3(0x40b)](this,_0x26ad7c,_0x1cb5b6,_0x1b4265,_0x594e41);},VisuMZ[_0x161145(0x9cf)]['Window_Selectable_itemRect']=Window_Selectable[_0x161145(0x2d7)][_0x161145(0x597)],Window_Selectable[_0x161145(0x2d7)]['itemRect']=function(_0x305766){const _0x42130e=_0x161145;let _0x5cef90=VisuMZ['CoreEngine'][_0x42130e(0x28c)][_0x42130e(0x40b)](this,_0x305766);return _0x5cef90['x']=Math[_0x42130e(0x8c8)](_0x5cef90['x']),_0x5cef90['y']=Math['round'](_0x5cef90['y']),_0x5cef90['width']=Math['round'](_0x5cef90['width']),_0x5cef90[_0x42130e(0x46b)]=Math[_0x42130e(0x8c8)](_0x5cef90['height']),_0x5cef90;},VisuMZ[_0x161145(0x9cf)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase[_0x161145(0x2d7)]['drawActorSimpleStatus'],Window_StatusBase[_0x161145(0x2d7)][_0x161145(0x3cd)]=function(_0x505dd5,_0x1ba6e5,_0x308cd6){const _0x2036ca=_0x161145;_0x1ba6e5=Math[_0x2036ca(0x8c8)](_0x1ba6e5),_0x308cd6=Math['round'](_0x308cd6),VisuMZ['CoreEngine'][_0x2036ca(0x4e5)][_0x2036ca(0x40b)](this,_0x505dd5,_0x1ba6e5,_0x308cd6);},Window_Base[_0x161145(0x2d7)]['initCoreEasing']=function(){const _0x1fa1f6=_0x161145;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x1fa1f6(0x430)]['y'],'targetOpacity':this[_0x1fa1f6(0x1c4)],'targetBackOpacity':this[_0x1fa1f6(0x4c9)],'targetContentsOpacity':this[_0x1fa1f6(0x6af)]};},Window_Base[_0x161145(0x2d7)]['updateCoreEasing']=function(){const _0x2dba25=_0x161145;if(!this[_0x2dba25(0x85b)])return;if(this[_0x2dba25(0x85b)][_0x2dba25(0x37d)]<=0x0)return;this['x']=this[_0x2dba25(0x48e)](this['x'],this['_coreEasing'][_0x2dba25(0x976)]),this['y']=this[_0x2dba25(0x48e)](this['y'],this[_0x2dba25(0x85b)][_0x2dba25(0x8fd)]),this[_0x2dba25(0x430)]['x']=this[_0x2dba25(0x48e)](this[_0x2dba25(0x430)]['x'],this[_0x2dba25(0x85b)][_0x2dba25(0x802)]),this['scale']['y']=this['applyCoreEasing'](this[_0x2dba25(0x430)]['y'],this['_coreEasing'][_0x2dba25(0x89f)]),this['opacity']=this['applyCoreEasing'](this['opacity'],this[_0x2dba25(0x85b)]['targetOpacity']),this[_0x2dba25(0x4c9)]=this[_0x2dba25(0x48e)](this[_0x2dba25(0x4c9)],this[_0x2dba25(0x85b)]['targetBackOpacity']),this[_0x2dba25(0x6af)]=this['applyCoreEasing'](this['contentsOpacity'],this[_0x2dba25(0x85b)][_0x2dba25(0x394)]),this[_0x2dba25(0x85b)][_0x2dba25(0x37d)]--;},Window_Base[_0x161145(0x2d7)][_0x161145(0x48e)]=function(_0x312325,_0x1503cf){const _0x314fef=_0x161145;if(!this[_0x314fef(0x85b)])return _0x1503cf;const _0x5164d7=this['_coreEasing'][_0x314fef(0x37d)],_0x5d2bae=this[_0x314fef(0x85b)][_0x314fef(0x889)],_0x88e717=this[_0x314fef(0x345)]((_0x5d2bae-_0x5164d7)/_0x5d2bae),_0x2f27ee=this[_0x314fef(0x345)]((_0x5d2bae-_0x5164d7+0x1)/_0x5d2bae),_0x57f98d=(_0x312325-_0x1503cf*_0x88e717)/(0x1-_0x88e717);return _0x57f98d+(_0x1503cf-_0x57f98d)*_0x2f27ee;},Window_Base[_0x161145(0x2d7)][_0x161145(0x345)]=function(_0x12c0c1){const _0x559eff=_0x161145;if(!this[_0x559eff(0x85b)])return _0x12c0c1;return VisuMZ['ApplyEasing'](_0x12c0c1,this[_0x559eff(0x85b)][_0x559eff(0x6ad)]||_0x559eff(0x39f));},Window_Base[_0x161145(0x2d7)][_0x161145(0x2b4)]=function(_0x4f3708,_0x298b44){const _0x2bda13=_0x161145;if(!this[_0x2bda13(0x85b)])return;this['x']=this[_0x2bda13(0x85b)][_0x2bda13(0x976)],this['y']=this['_coreEasing']['targetY'],this[_0x2bda13(0x430)]['x']=this[_0x2bda13(0x85b)][_0x2bda13(0x802)],this[_0x2bda13(0x430)]['y']=this[_0x2bda13(0x85b)][_0x2bda13(0x89f)],this[_0x2bda13(0x1c4)]=this[_0x2bda13(0x85b)]['targetOpacity'],this[_0x2bda13(0x4c9)]=this[_0x2bda13(0x85b)][_0x2bda13(0x727)],this[_0x2bda13(0x6af)]=this[_0x2bda13(0x85b)][_0x2bda13(0x394)],this[_0x2bda13(0x578)](_0x4f3708,_0x298b44,this['x'],this['y'],this['scale']['x'],this[_0x2bda13(0x430)]['y'],this[_0x2bda13(0x1c4)],this['backOpacity'],this[_0x2bda13(0x6af)]);},Window_Base[_0x161145(0x2d7)][_0x161145(0x578)]=function(_0x464e6,_0x5abfd0,_0x29e3e2,_0x549aef,_0x848462,_0x3487f1,_0x3ac110,_0x1b320a,_0x4c2b21){const _0x4ae33d=_0x161145;this[_0x4ae33d(0x85b)]={'duration':_0x464e6,'wholeDuration':_0x464e6,'type':_0x5abfd0,'targetX':_0x29e3e2,'targetY':_0x549aef,'targetScaleX':_0x848462,'targetScaleY':_0x3487f1,'targetOpacity':_0x3ac110,'targetBackOpacity':_0x1b320a,'targetContentsOpacity':_0x4c2b21};},Window_Base[_0x161145(0x2d7)][_0x161145(0x5fd)]=function(_0x2b41e8,_0x4b05dc,_0x5979fa,_0x2597e5,_0x42580f){const _0x10d927=_0x161145;this[_0x10d927(0x806)](),this[_0x10d927(0x469)][_0x10d927(0x324)]=VisuMZ[_0x10d927(0x9cf)][_0x10d927(0x7a5)][_0x10d927(0x50b)][_0x10d927(0x629)];const _0x5804ef=VisuMZ[_0x10d927(0x9cf)]['Settings']['Gold'][_0x10d927(0x185)];if(_0x5804ef>0x0&&_0x4b05dc===TextManager[_0x10d927(0x623)]){const _0x192fa9=_0x2597e5+(this['lineHeight']()-ImageManager[_0x10d927(0x83f)])/0x2;this[_0x10d927(0x43f)](_0x5804ef,_0x5979fa+(_0x42580f-ImageManager[_0x10d927(0x669)]),_0x192fa9),_0x42580f-=ImageManager[_0x10d927(0x669)]+0x4;}else'VdgKs'!=='lIArr'?(this[_0x10d927(0x883)](ColorManager['systemColor']()),this[_0x10d927(0x4c4)](_0x4b05dc,_0x5979fa,_0x2597e5,_0x42580f,_0x10d927(0x870)),_0x42580f-=this[_0x10d927(0x607)](_0x4b05dc)+0x6):(this['changeTextColor'](_0x409726['systemColor']()),this[_0x10d927(0x4c4)](_0x3eb2c0,_0x3ab54b,_0x3d5942,_0x542ee5,_0x10d927(0x870)),_0x21dbe3-=this[_0x10d927(0x607)](_0x5ba502)+0x6);this[_0x10d927(0x83b)]();const _0xf2a127=this['textWidth'](this[_0x10d927(0x265)]?VisuMZ['GroupDigits'](_0x2b41e8):_0x2b41e8);if(_0xf2a127>_0x42580f)_0x10d927(0x20f)===_0x10d927(0x6f6)?(this[_0x10d927(0x9bc)](),this[_0x10d927(0x2af)]()):this['drawText'](VisuMZ[_0x10d927(0x9cf)][_0x10d927(0x7a5)][_0x10d927(0x50b)]['GoldOverlap'],_0x5979fa,_0x2597e5,_0x42580f,_0x10d927(0x870));else{if(_0x10d927(0x328)===_0x10d927(0x328))this[_0x10d927(0x4c4)](_0x2b41e8,_0x5979fa,_0x2597e5,_0x42580f,_0x10d927(0x870));else{if(this['_scene']['_optionsWindow'])this['_scene'][_0x10d927(0x4ad)][_0x10d927(0x9cd)]();if(this[_0x10d927(0x988)]['_listWindow'])this['_scene']['_listWindow'][_0x10d927(0x9cd)]();}}this[_0x10d927(0x806)]();},Window_Base[_0x161145(0x2d7)][_0x161145(0x72e)]=function(_0x5d4c62,_0x2f21b7,_0x370c50,_0x3464fe,_0x20dd32){const _0x26a936=_0x161145,_0x5f4458=ImageManager[_0x26a936(0x47c)](_0x26a936(0x8b8)),_0x51e439=ImageManager[_0x26a936(0x669)],_0x340a47=ImageManager['iconHeight'],_0x567227=_0x5d4c62%0x10*_0x51e439,_0x32f5ef=Math['floor'](_0x5d4c62/0x10)*_0x340a47,_0x10aa34=_0x3464fe,_0x159622=_0x3464fe;this['contents'][_0x26a936(0x3b5)][_0x26a936(0x8ec)]=_0x20dd32,this[_0x26a936(0x469)][_0x26a936(0x5d6)](_0x5f4458,_0x567227,_0x32f5ef,_0x51e439,_0x340a47,_0x2f21b7,_0x370c50,_0x10aa34,_0x159622),this['contents']['_context'][_0x26a936(0x8ec)]=!![];},Window_Base[_0x161145(0x2d7)]['drawGauge']=function(_0x39c0aa,_0x819fe3,_0x537c1a,_0x51938a,_0x4261fe,_0x56c228){const _0x4de811=_0x161145,_0x3366df=Math[_0x4de811(0x7f2)]((_0x537c1a-0x2)*_0x51938a),_0x181861=Sprite_Gauge['prototype'][_0x4de811(0x17d)][_0x4de811(0x40b)](this),_0x267fc8=_0x819fe3+this[_0x4de811(0x986)]()-_0x181861-0x2;this[_0x4de811(0x469)][_0x4de811(0x7b7)](_0x39c0aa,_0x267fc8,_0x537c1a,_0x181861,ColorManager[_0x4de811(0x3da)]()),this[_0x4de811(0x469)][_0x4de811(0x897)](_0x39c0aa+0x1,_0x267fc8+0x1,_0x3366df,_0x181861-0x2,_0x4261fe,_0x56c228);},Window_Selectable[_0x161145(0x2d7)][_0x161145(0x3ac)]=function(_0x514010){const _0x4887d7=_0x161145;let _0x975920=this[_0x4887d7(0x154)]();const _0x590d51=this[_0x4887d7(0x60c)](),_0x402788=this['maxCols']();if(this[_0x4887d7(0x57e)]()&&(_0x975920<_0x590d51||_0x514010&&_0x402788===0x1)){_0x975920+=_0x402788;if(_0x975920>=_0x590d51)_0x975920=_0x590d51-0x1;this[_0x4887d7(0x846)](_0x975920);}else!this[_0x4887d7(0x57e)]()&&((_0x975920<_0x590d51-_0x402788||_0x514010&&_0x402788===0x1)&&this['smoothSelect']((_0x975920+_0x402788)%_0x590d51));},VisuMZ['CoreEngine'][_0x161145(0x994)]=Window_Selectable[_0x161145(0x2d7)][_0x161145(0x3ac)],Window_Selectable[_0x161145(0x2d7)]['cursorDown']=function(_0x2f89e2){const _0x2bc6b=_0x161145;if(this[_0x2bc6b(0x57e)]()&&_0x2f89e2&&this[_0x2bc6b(0x5a5)]()===0x1&&this[_0x2bc6b(0x154)]()===this[_0x2bc6b(0x60c)]()-0x1){if(_0x2bc6b(0x369)===_0x2bc6b(0x369))this[_0x2bc6b(0x846)](0x0);else{if(this['x']===0x0)this['x']=_0x2547ce[_0x2bc6b(0x8c8)](_0x4a5e7a['width']/0x2);if(this['y']===0x0)this['y']=_0x29a4e3[_0x2bc6b(0x8c8)](_0x30e924['height']/0x2);}}else _0x2bc6b(0x252)!==_0x2bc6b(0x509)?VisuMZ[_0x2bc6b(0x9cf)][_0x2bc6b(0x994)][_0x2bc6b(0x40b)](this,_0x2f89e2):(this[_0x2bc6b(0x372)]['x']=_0x2b4378[_0x2bc6b(0x372)]()['x'],this['anchor']['y']=_0x56bbf8[_0x2bc6b(0x372)]()['y']);},Window_Selectable[_0x161145(0x2d7)][_0x161145(0x9ad)]=function(_0x570294){const _0x5bdc7a=_0x161145;let _0x41496c=Math[_0x5bdc7a(0x32a)](0x0,this[_0x5bdc7a(0x154)]());const _0x3d3827=this[_0x5bdc7a(0x60c)](),_0x2abc44=this[_0x5bdc7a(0x5a5)]();if(this[_0x5bdc7a(0x57e)]()&&_0x41496c>0x0||_0x570294&&_0x2abc44===0x1){if(_0x5bdc7a(0x43c)!==_0x5bdc7a(0x43c))return 0x0;else{_0x41496c-=_0x2abc44;if(_0x41496c<=0x0)_0x41496c=0x0;this[_0x5bdc7a(0x846)](_0x41496c);}}else!this['isUseModernControls']()&&((_0x41496c>=_0x2abc44||_0x570294&&_0x2abc44===0x1)&&(_0x5bdc7a(0x331)===_0x5bdc7a(0x8e3)?this[_0x5bdc7a(0x925)]=_0x3ba746:this[_0x5bdc7a(0x846)]((_0x41496c-_0x2abc44+_0x3d3827)%_0x3d3827)));},VisuMZ[_0x161145(0x9cf)][_0x161145(0x61e)]=Window_Selectable[_0x161145(0x2d7)]['cursorUp'],Window_Selectable['prototype'][_0x161145(0x9ad)]=function(_0x11062c){const _0x3fe7fa=_0x161145;this[_0x3fe7fa(0x57e)]()&&_0x11062c&&this[_0x3fe7fa(0x5a5)]()===0x1&&this['index']()===0x0?this[_0x3fe7fa(0x846)](this[_0x3fe7fa(0x60c)]()-0x1):VisuMZ[_0x3fe7fa(0x9cf)][_0x3fe7fa(0x61e)][_0x3fe7fa(0x40b)](this,_0x11062c);},Window_Selectable[_0x161145(0x2d7)][_0x161145(0x57e)]=function(){const _0x1d500c=_0x161145;return VisuMZ['CoreEngine'][_0x1d500c(0x7a5)]['QoL'][_0x1d500c(0x1ce)];},VisuMZ[_0x161145(0x9cf)][_0x161145(0x7d2)]=Window_Selectable['prototype'][_0x161145(0x89d)],Window_Selectable['prototype'][_0x161145(0x89d)]=function(){const _0x4bac4c=_0x161145;if(this[_0x4bac4c(0x57e)]())this['processCursorMoveModernControls'](),this['processCursorHomeEndTrigger']();else{if(_0x4bac4c(0x365)===_0x4bac4c(0x194)){const _0x35a57a=_0x3db714[_0x4bac4c(0x380)]();this[_0x4bac4c(0x907)]=_0x1531e0[_0x4bac4c(0x1b2)](_0x35a57a)+_0x2b94eb[_0x4bac4c(0x1b2)](_0x35a57a)+this['encounterStepsMinimum']();}else VisuMZ['CoreEngine']['Window_Selectable_processCursorMove'][_0x4bac4c(0x40b)](this);}},Window_Selectable['prototype'][_0x161145(0x1ba)]=function(){return!![];},Window_Selectable[_0x161145(0x2d7)][_0x161145(0x9bc)]=function(){const _0x56b2cd=_0x161145;if(this['isCursorMovable']()){if(_0x56b2cd(0x338)!==_0x56b2cd(0x25a)){const _0xc7ca19=this['index']();if(Input['isRepeated'](_0x56b2cd(0x1ae))){if(Input[_0x56b2cd(0x203)](_0x56b2cd(0x33e))&&this[_0x56b2cd(0x1ba)]())this['cursorPagedown']();else{if(_0x56b2cd(0x43a)===_0x56b2cd(0x408)){const _0x55b9de=this[_0x56b2cd(0x8dc)],_0x2f8939=_0x55b9de['globalAlpha'];_0x9ec874=_0xb9ee98||0xffffffff;let _0x74a4b9=_0x578713,_0x27a79d=_0x3c24c7[_0x56b2cd(0x8c8)](_0x55a938+0x18/0x2+this['fontSize']*0.35);_0x3dd15===_0x56b2cd(0x4a7)&&(_0x74a4b9+=_0x135a6e/0x2),_0x4d5858===_0x56b2cd(0x870)&&(_0x74a4b9+=_0x3760d7),_0x55b9de[_0x56b2cd(0x272)](),_0x55b9de[_0x56b2cd(0x2a6)]=this[_0x56b2cd(0x563)](),_0x55b9de['textAlign']=_0x53e5be,_0x55b9de[_0x56b2cd(0x799)]='alphabetic',_0x55b9de['globalAlpha']=0x1,this['_drawTextOutline'](_0x49df52,_0x74a4b9,_0x27a79d,_0x1e0cc3),_0x55b9de[_0x56b2cd(0x93c)]=_0x2f8939,this['_drawTextBody'](_0x31e40d,_0x74a4b9,_0x27a79d,_0x1d6fd2),_0x55b9de[_0x56b2cd(0x7ee)](),this['_baseTexture'][_0x56b2cd(0x361)]();}else this[_0x56b2cd(0x3ac)](Input[_0x56b2cd(0x645)]('down'));}}Input[_0x56b2cd(0x40f)]('up')&&(Input[_0x56b2cd(0x203)](_0x56b2cd(0x33e))&&this['allowShiftScrolling']()?this['cursorPageup']():this[_0x56b2cd(0x9ad)](Input['isTriggered']('up'))),Input[_0x56b2cd(0x40f)](_0x56b2cd(0x870))&&this[_0x56b2cd(0x237)](Input[_0x56b2cd(0x645)](_0x56b2cd(0x870))),Input[_0x56b2cd(0x40f)](_0x56b2cd(0x6e8))&&this[_0x56b2cd(0x5c6)](Input[_0x56b2cd(0x645)](_0x56b2cd(0x6e8))),!this[_0x56b2cd(0x7fe)](_0x56b2cd(0x21d))&&Input[_0x56b2cd(0x40f)](_0x56b2cd(0x21d))&&this[_0x56b2cd(0x99e)](),!this[_0x56b2cd(0x7fe)](_0x56b2cd(0x8eb))&&Input['isRepeated']('pageup')&&this[_0x56b2cd(0x4ef)](),this[_0x56b2cd(0x154)]()!==_0xc7ca19&&this[_0x56b2cd(0x836)]();}else _0x1eab29[_0x56b2cd(0x312)]('Control\x20Variables\x20Script\x20Error'),_0x414ebe['log'](_0x5e70ea);}},Window_Selectable[_0x161145(0x2d7)]['processCursorHomeEndTrigger']=function(){const _0x45e886=_0x161145;if(this['isCursorMovable']()){const _0x5a1a1a=this[_0x45e886(0x154)]();Input[_0x45e886(0x645)](_0x45e886(0x245))&&this['smoothSelect'](Math['min'](this['index'](),0x0)),Input[_0x45e886(0x645)](_0x45e886(0x7ef))&&this[_0x45e886(0x846)](Math[_0x45e886(0x32a)](this[_0x45e886(0x154)](),this['maxItems']()-0x1)),this[_0x45e886(0x154)]()!==_0x5a1a1a&&('EZdWK'===_0x45e886(0x768)?(_0x2196cf=_0x2841e8[_0x45e886(0x8c8)](_0x244909),_0x45740c=_0x390203[_0x45e886(0x8c8)](_0xa51e25),_0x5884a6[_0x45e886(0x9cf)][_0x45e886(0x4e5)][_0x45e886(0x40b)](this,_0x4194ff,_0x4d435c,_0x2d1562)):this[_0x45e886(0x836)]());}},VisuMZ[_0x161145(0x9cf)][_0x161145(0x668)]=Window_Selectable[_0x161145(0x2d7)][_0x161145(0x5d3)],Window_Selectable[_0x161145(0x2d7)][_0x161145(0x5d3)]=function(){const _0x5b2189=_0x161145;if(this['isUseModernControls']()){if(_0x5b2189(0x546)!==_0x5b2189(0x8bd))this[_0x5b2189(0x3d8)]();else{const _0x483b51=this[_0x5b2189(0x95b)][_0x5b2189(0x5f7)][_0x5b2189(0x9c3)](new _0xf80e57(0x0,0x0)),_0x5118fd=this[_0x5b2189(0x95b)][_0x5b2189(0x7f3)];_0x5118fd['x']=_0x483b51['x']+this['origin']['x'],_0x5118fd['y']=_0x483b51['y']+this[_0x5b2189(0x667)]['y'],_0x5118fd[_0x5b2189(0x3ea)]=_0x31601e[_0x5b2189(0x8e4)](this[_0x5b2189(0x6ba)]*this[_0x5b2189(0x430)]['x']),_0x5118fd[_0x5b2189(0x46b)]=_0x1ca821[_0x5b2189(0x8e4)](this[_0x5b2189(0x2b9)]*this[_0x5b2189(0x430)]['y']);}}else VisuMZ[_0x5b2189(0x9cf)][_0x5b2189(0x668)][_0x5b2189(0x40b)](this);},Window_Selectable[_0x161145(0x2d7)][_0x161145(0x3d8)]=function(){const _0x312f30=_0x161145;VisuMZ[_0x312f30(0x9cf)]['Window_Selectable_processTouch'][_0x312f30(0x40b)](this);},Window_Selectable[_0x161145(0x2d7)][_0x161145(0x1f7)]=function(){const _0x31d15d=_0x161145;return VisuMZ[_0x31d15d(0x9cf)][_0x31d15d(0x7a5)][_0x31d15d(0x651)]['ColSpacing'];},Window_Selectable[_0x161145(0x2d7)]['rowSpacing']=function(){const _0x1c1be0=_0x161145;return VisuMZ[_0x1c1be0(0x9cf)][_0x1c1be0(0x7a5)][_0x1c1be0(0x651)][_0x1c1be0(0x596)];},Window_Selectable[_0x161145(0x2d7)]['itemHeight']=function(){const _0x1c5979=_0x161145;return Window_Scrollable['prototype'][_0x1c5979(0x44d)][_0x1c5979(0x40b)](this)+VisuMZ[_0x1c5979(0x9cf)]['Settings'][_0x1c5979(0x651)][_0x1c5979(0x7c9)];;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x5c9)]=Window_Selectable[_0x161145(0x2d7)][_0x161145(0x9b5)],Window_Selectable[_0x161145(0x2d7)][_0x161145(0x9b5)]=function(_0x4ddbb4){const _0x61135e=_0x161145,_0x195117=VisuMZ[_0x61135e(0x9cf)][_0x61135e(0x7a5)][_0x61135e(0x651)];if(_0x195117[_0x61135e(0x4ca)]===![])return;_0x195117['DrawItemBackgroundJS']?_0x195117[_0x61135e(0x303)][_0x61135e(0x40b)](this,_0x4ddbb4):_0x61135e(0x90f)!=='AhjYM'?VisuMZ['CoreEngine'][_0x61135e(0x5c9)][_0x61135e(0x40b)](this,_0x4ddbb4):_0x2f98b0[_0x61135e(0x36a)][0x52]=_0x61135e(0x4c8);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x6b7)]=Window_Gold[_0x161145(0x2d7)][_0x161145(0x9cd)],Window_Gold[_0x161145(0x2d7)][_0x161145(0x9cd)]=function(){const _0x4ca1d8=_0x161145;if(this[_0x4ca1d8(0x941)]())this['drawGoldItemStyle']();else{if(_0x4ca1d8(0x729)!==_0x4ca1d8(0x729))return _0x97c415[_0x4ca1d8(0x466)][_0x4ca1d8(0x454)][_0x4ca1d8(0x40b)](this);else VisuMZ[_0x4ca1d8(0x9cf)][_0x4ca1d8(0x6b7)][_0x4ca1d8(0x40b)](this);}},Window_Gold[_0x161145(0x2d7)]['isItemStyle']=function(){const _0x459212=_0x161145;if(TextManager['currencyUnit']!==this[_0x459212(0x623)]())return![];return VisuMZ[_0x459212(0x9cf)][_0x459212(0x7a5)][_0x459212(0x50b)][_0x459212(0x978)];},Window_Gold['prototype'][_0x161145(0x214)]=function(){const _0x38392d=_0x161145;this['resetFontSettings'](),this['contents'][_0x38392d(0x557)](),this[_0x38392d(0x469)][_0x38392d(0x324)]=VisuMZ[_0x38392d(0x9cf)]['Settings'][_0x38392d(0x50b)][_0x38392d(0x629)];const _0x4c685f=VisuMZ['CoreEngine'][_0x38392d(0x7a5)][_0x38392d(0x50b)][_0x38392d(0x185)],_0x1768a1=this[_0x38392d(0x773)](0x0);if(_0x4c685f>0x0){if('kXdzX'!==_0x38392d(0x57f)){const _0x4f9472=_0x1768a1['y']+(this[_0x38392d(0x986)]()-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x4c685f,_0x1768a1['x'],_0x4f9472);const _0x50f5c3=ImageManager['iconWidth']+0x4;_0x1768a1['x']+=_0x50f5c3,_0x1768a1[_0x38392d(0x3ea)]-=_0x50f5c3;}else _0x31385d['CoreEngine'][_0x38392d(0x599)]['call'](this),this[_0x38392d(0x295)]();}this[_0x38392d(0x883)](ColorManager[_0x38392d(0x3db)]()),this[_0x38392d(0x4c4)](this[_0x38392d(0x623)](),_0x1768a1['x'],_0x1768a1['y'],_0x1768a1['width'],_0x38392d(0x6e8));const _0x3c01ed=this[_0x38392d(0x607)](this[_0x38392d(0x623)]())+0x6;;_0x1768a1['x']+=_0x3c01ed,_0x1768a1['width']-=_0x3c01ed,this['resetTextColor']();const _0x1d0a6f=this['value'](),_0x4a8729=this[_0x38392d(0x607)](this[_0x38392d(0x265)]?VisuMZ[_0x38392d(0x3e0)](this[_0x38392d(0x525)]()):this['value']());_0x4a8729>_0x1768a1['width']?this[_0x38392d(0x4c4)](VisuMZ['CoreEngine']['Settings']['Gold'][_0x38392d(0x924)],_0x1768a1['x'],_0x1768a1['y'],_0x1768a1['width'],_0x38392d(0x870)):this[_0x38392d(0x4c4)](this[_0x38392d(0x525)](),_0x1768a1['x'],_0x1768a1['y'],_0x1768a1['width'],_0x38392d(0x870)),this['resetFontSettings']();},Window_StatusBase[_0x161145(0x2d7)][_0x161145(0x347)]=function(_0x3546b8,_0x777bfb,_0x449abd,_0x4ba25c,_0x449c57){const _0x4e4b04=_0x161145;_0x4ba25c=String(_0x4ba25c||'')[_0x4e4b04(0x7c3)]();if(VisuMZ[_0x4e4b04(0x9cf)][_0x4e4b04(0x7a5)][_0x4e4b04(0x538)][_0x4e4b04(0x75e)]){if(_0x4e4b04(0x9b0)===_0x4e4b04(0x161))this[_0x4e4b04(0x992)]=0x0;else{const _0x4f6c6e=VisuMZ[_0x4e4b04(0x918)](_0x4ba25c);_0x449c57?_0x4e4b04(0x5d8)==='VzKMo'?(this[_0x4e4b04(0x72e)](_0x4f6c6e,_0x3546b8,_0x777bfb,this['gaugeLineHeight']()),_0x449abd-=this[_0x4e4b04(0x658)]()+0x2,_0x3546b8+=this['gaugeLineHeight']()+0x2):this[_0x4e4b04(0x63c)]['setBackgroundType'](_0x3aecf3[_0x4e4b04(0x466)][_0x4e4b04(0x504)]):_0x4e4b04(0x72f)!==_0x4e4b04(0x72f)?_0x5aa6c7[_0x4e4b04(0x3ff)](_0xe0dcb,_0x416ea2):(this[_0x4e4b04(0x43f)](_0x4f6c6e,_0x3546b8+0x2,_0x777bfb+0x2),_0x449abd-=ImageManager['iconWidth']+0x4,_0x3546b8+=ImageManager[_0x4e4b04(0x669)]+0x4);}}const _0x1e9709=TextManager[_0x4e4b04(0x762)](_0x4ba25c);this['resetFontSettings'](),this[_0x4e4b04(0x883)](ColorManager['systemColor']()),_0x449c57?(this[_0x4e4b04(0x469)][_0x4e4b04(0x324)]=this[_0x4e4b04(0x4d7)](),this[_0x4e4b04(0x469)]['drawText'](_0x1e9709,_0x3546b8,_0x777bfb,_0x449abd,this[_0x4e4b04(0x658)](),_0x4e4b04(0x6e8))):_0x4e4b04(0x547)!=='VMdUj'?(_0x12af45['log']('Script\x20Call\x20Error'),_0x4f7de6[_0x4e4b04(0x312)](_0x1b34fb)):this['drawText'](_0x1e9709,_0x3546b8,_0x777bfb,_0x449abd),this[_0x4e4b04(0x806)]();},Window_StatusBase['prototype']['smallParamFontSize']=function(){const _0x3604d2=_0x161145;return $gameSystem[_0x3604d2(0x655)]()-0x8;},Window_StatusBase[_0x161145(0x2d7)]['drawActorClass']=function(_0x368320,_0x2e8ed1,_0xadc51c,_0x5a2f1f){const _0x2cbec9=_0x161145;_0x5a2f1f=_0x5a2f1f||0xa8,this[_0x2cbec9(0x83b)]();if(VisuMZ[_0x2cbec9(0x9cf)][_0x2cbec9(0x7a5)]['UI'][_0x2cbec9(0x6d9)])this[_0x2cbec9(0x752)](_0x368320['currentClass']()[_0x2cbec9(0x618)],_0x2e8ed1,_0xadc51c,_0x5a2f1f);else{const _0x46adc7=_0x368320[_0x2cbec9(0x698)]()[_0x2cbec9(0x618)][_0x2cbec9(0x98a)](/\\I\[(\d+)\]/gi,'');this[_0x2cbec9(0x4c4)](_0x46adc7,_0x2e8ed1,_0xadc51c,_0x5a2f1f);}},Window_StatusBase[_0x161145(0x2d7)][_0x161145(0x54d)]=function(_0x3d38ab,_0x2061d8,_0x4119f7,_0x2fc916){const _0x2d3cf6=_0x161145;_0x2fc916=_0x2fc916||0x10e,this[_0x2d3cf6(0x83b)]();if(VisuMZ[_0x2d3cf6(0x9cf)][_0x2d3cf6(0x7a5)]['UI'][_0x2d3cf6(0x16c)])'bBJdk'!==_0x2d3cf6(0x72c)?this['_commandWindow'][_0x2d3cf6(0x6ce)](_0x3ef7a0['layoutSettings'][_0x2d3cf6(0x840)]):this['drawTextEx'](_0x3d38ab[_0x2d3cf6(0x165)](),_0x2061d8,_0x4119f7,_0x2fc916);else{const _0x66a5b=_0x3d38ab[_0x2d3cf6(0x165)]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x2d3cf6(0x4c4)](_0x3d38ab[_0x2d3cf6(0x165)](),_0x2061d8,_0x4119f7,_0x2fc916);}},VisuMZ[_0x161145(0x9cf)][_0x161145(0x98d)]=Window_StatusBase[_0x161145(0x2d7)][_0x161145(0x2e1)],Window_StatusBase['prototype'][_0x161145(0x2e1)]=function(_0x55a839,_0x5054e3,_0x2d7c68){const _0x357682=_0x161145;if(VisuMZ['CoreEngine'][_0x357682(0x7a5)][_0x357682(0x538)]['ShowActorLevel']===![])return;if(this[_0x357682(0x197)]())this[_0x357682(0x503)](_0x55a839,_0x5054e3,_0x2d7c68);VisuMZ[_0x357682(0x9cf)][_0x357682(0x98d)]['call'](this,_0x55a839,_0x5054e3,_0x2d7c68);},Window_StatusBase[_0x161145(0x2d7)]['isExpGaugeDrawn']=function(){const _0x18004b=_0x161145;return VisuMZ[_0x18004b(0x9cf)]['Settings']['UI']['LvExpGauge'];},Window_StatusBase[_0x161145(0x2d7)]['drawActorExpGauge']=function(_0x4c10dc,_0x3dd3cd,_0x1769bb){const _0x3d8165=_0x161145;if(!_0x4c10dc)return;if(!_0x4c10dc[_0x3d8165(0x920)]())return;const _0x9063d6=0x80,_0x45f936=_0x4c10dc['expRate']();let _0x2f6773=ColorManager[_0x3d8165(0x2cd)](),_0x152db1=ColorManager[_0x3d8165(0x2bf)]();_0x45f936>=0x1&&(_0x2f6773=ColorManager[_0x3d8165(0x299)](),_0x152db1=ColorManager['maxLvGaugeColor2']()),this['drawGauge'](_0x3dd3cd,_0x1769bb,_0x9063d6,_0x45f936,_0x2f6773,_0x152db1);},Window_EquipStatus[_0x161145(0x2d7)][_0x161145(0x327)]=function(){const _0x5c623e=_0x161145;let _0x4be9fe=0x0;for(const _0x2da553 of VisuMZ[_0x5c623e(0x9cf)][_0x5c623e(0x7a5)][_0x5c623e(0x538)][_0x5c623e(0x505)]){const _0x2ea5b6=this['itemPadding'](),_0x4a402f=this[_0x5c623e(0x8b0)](_0x4be9fe);this[_0x5c623e(0x3ab)](_0x2ea5b6,_0x4a402f,_0x2da553),_0x4be9fe++;}},Window_EquipStatus[_0x161145(0x2d7)][_0x161145(0x62b)]=function(_0x22fd88,_0x192346,_0x12786b){const _0x96ffd2=_0x161145,_0x5b17b2=this[_0x96ffd2(0x459)]()-this['itemPadding']()*0x2;this[_0x96ffd2(0x347)](_0x22fd88,_0x192346,_0x5b17b2,_0x12786b,![]);},Window_EquipStatus[_0x161145(0x2d7)][_0x161145(0x69a)]=function(_0x1929b4,_0xc13919,_0x4b2ccc){const _0x5a43fd=_0x161145,_0x254846=this['paramWidth']();this[_0x5a43fd(0x83b)](),this[_0x5a43fd(0x4c4)](this[_0x5a43fd(0x426)][_0x5a43fd(0x187)](_0x4b2ccc,!![]),_0x1929b4,_0xc13919,_0x254846,_0x5a43fd(0x870));},Window_EquipStatus[_0x161145(0x2d7)][_0x161145(0x4ba)]=function(_0x58938e,_0xfb4674){const _0x257566=_0x161145,_0x5e2ac9=this['rightArrowWidth']();this[_0x257566(0x883)](ColorManager[_0x257566(0x3db)]());const _0xdabbf5=VisuMZ[_0x257566(0x9cf)]['Settings']['UI'][_0x257566(0x3fe)];this[_0x257566(0x4c4)](_0xdabbf5,_0x58938e,_0xfb4674,_0x5e2ac9,_0x257566(0x4a7));},Window_EquipStatus[_0x161145(0x2d7)][_0x161145(0x291)]=function(_0x5bda3e,_0x44930a,_0x248572){const _0x1a0dd2=_0x161145,_0x37e5b2=this[_0x1a0dd2(0x382)](),_0x249702=this[_0x1a0dd2(0x46e)]['paramValueByName'](_0x248572),_0x391dc4=_0x249702-this[_0x1a0dd2(0x426)][_0x1a0dd2(0x187)](_0x248572);this[_0x1a0dd2(0x883)](ColorManager['paramchangeTextColor'](_0x391dc4)),this[_0x1a0dd2(0x4c4)](this['_tempActor'][_0x1a0dd2(0x187)](_0x248572,!![]),_0x5bda3e,_0x44930a,_0x37e5b2,_0x1a0dd2(0x870));},VisuMZ[_0x161145(0x9cf)]['Window_EquipItem_isEnabled']=Window_EquipItem['prototype']['isEnabled'],Window_EquipItem['prototype']['isEnabled']=function(_0x3742ac){const _0x3cc3b3=_0x161145;if(_0x3742ac&&this['_actor']){if('sEnvA'==='dHDix')this['smoothSelect']((_0x6d3627+_0x3d7c81)%_0x49a2d8);else return this[_0x3cc3b3(0x426)][_0x3cc3b3(0x76a)](_0x3742ac);}else{if(_0x3cc3b3(0x549)!==_0x3cc3b3(0x549))this[_0x3cc3b3(0x4a8)]()&&this[_0x3cc3b3(0x4a8)]()[_0x3cc3b3(0x3fc)]()?_0x58a95a[_0x3cc3b3(0x9cf)]['Game_Action_setAttack'][_0x3cc3b3(0x40b)](this):this['clear']();else return VisuMZ['CoreEngine'][_0x3cc3b3(0x91f)]['call'](this,_0x3742ac);}},Window_StatusParams[_0x161145(0x2d7)][_0x161145(0x60c)]=function(){const _0x4e2942=_0x161145;return VisuMZ['CoreEngine'][_0x4e2942(0x7a5)][_0x4e2942(0x538)][_0x4e2942(0x505)][_0x4e2942(0x300)];},Window_StatusParams[_0x161145(0x2d7)][_0x161145(0x3ab)]=function(_0x381516){const _0x3c6804=_0x161145,_0x45e0d4=this[_0x3c6804(0x773)](_0x381516),_0x20a989=VisuMZ[_0x3c6804(0x9cf)][_0x3c6804(0x7a5)][_0x3c6804(0x538)][_0x3c6804(0x505)][_0x381516],_0xa05195=TextManager[_0x3c6804(0x762)](_0x20a989),_0x159bfd=this['_actor'][_0x3c6804(0x187)](_0x20a989,!![]);this['drawParamText'](_0x45e0d4['x'],_0x45e0d4['y'],0xa0,_0x20a989,![]),this[_0x3c6804(0x83b)](),this[_0x3c6804(0x4c4)](_0x159bfd,_0x45e0d4['x']+0xa0,_0x45e0d4['y'],0x3c,'right');};if(VisuMZ[_0x161145(0x9cf)][_0x161145(0x7a5)][_0x161145(0x7d5)]['EnableNameInput']){VisuMZ[_0x161145(0x9cf)]['Settings']['KeyboardInput']['QwertyLayout']&&(Window_NameInput[_0x161145(0x8d4)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK']);;VisuMZ['CoreEngine']['Window_NameInput_initialize']=Window_NameInput['prototype'][_0x161145(0x4fb)],Window_NameInput['prototype'][_0x161145(0x4fb)]=function(_0x9ac38a){const _0x3b6938=_0x161145;this[_0x3b6938(0x45e)]=this[_0x3b6938(0x7e3)](),VisuMZ['CoreEngine'][_0x3b6938(0x189)]['call'](this,_0x9ac38a);if(this[_0x3b6938(0x45e)]===_0x3b6938(0x9b3))_0x3b6938(0x354)!==_0x3b6938(0x354)?this[_0x3b6938(0x3a3)][_0x3b6938(0x6ce)](_0x3b2887[_0x3b6938(0x466)][_0x3b6938(0x782)]):this[_0x3b6938(0x6fb)](0x0);else{if(_0x3b6938(0x81b)!==_0x3b6938(0x81b)){const _0x3b8bee=this[_0x3b6938(0x422)](_0x9b1fd4),_0x145726=this[_0x3b6938(0x5a6)](_0x279e16),_0x34a424=this[_0x3b6938(0x9bb)](_0x41fd47);return _0x3b8bee*(_0x145726-_0x34a424);}else Input['clear'](),this[_0x3b6938(0x228)]();}},Window_NameInput['prototype']['defaultInputMode']=function(){const _0x4b619a=_0x161145;if(Input[_0x4b619a(0x7fd)]())return _0x4b619a(0x9b3);return VisuMZ[_0x4b619a(0x9cf)][_0x4b619a(0x7a5)][_0x4b619a(0x7d5)][_0x4b619a(0x4c7)]||_0x4b619a(0x5e3);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x53c)]=Window_NameInput[_0x161145(0x2d7)]['processHandling'],Window_NameInput[_0x161145(0x2d7)][_0x161145(0x5e6)]=function(){const _0x2c7c22=_0x161145;if(!this[_0x2c7c22(0x85c)]())return;if(!this[_0x2c7c22(0x955)])return;if(this[_0x2c7c22(0x45e)]===_0x2c7c22(0x5e3)&&Input[_0x2c7c22(0x2df)]())this[_0x2c7c22(0x89b)]('default');else{if(Input[_0x2c7c22(0x6aa)](_0x2c7c22(0x59d)))Input['clear'](),this[_0x2c7c22(0x298)]();else{if(Input['isTriggered'](_0x2c7c22(0x3af))){Input[_0x2c7c22(0x557)]();if(this[_0x2c7c22(0x45e)]==='keyboard'){if(_0x2c7c22(0x6e5)===_0x2c7c22(0x6e5))this[_0x2c7c22(0x89b)](_0x2c7c22(0x9b3));else{let _0x21c9d5=this[_0x2c7c22(0x45e)];this[_0x2c7c22(0x45e)]=_0x5538d2,_0x21c9d5!==this[_0x2c7c22(0x45e)]&&(this[_0x2c7c22(0x9cd)](),_0x2b1bc8[_0x2c7c22(0x3c6)](),this[_0x2c7c22(0x45e)]==='default'?this[_0x2c7c22(0x6fb)](0x0):this[_0x2c7c22(0x6fb)](-0x1));}}else this['switchModes'](_0x2c7c22(0x5e3));}else{if(this[_0x2c7c22(0x45e)]===_0x2c7c22(0x5e3))this[_0x2c7c22(0x198)]();else{if(Input[_0x2c7c22(0x6aa)]('escape'))Input[_0x2c7c22(0x557)](),this[_0x2c7c22(0x89b)](_0x2c7c22(0x5e3));else{if(_0x2c7c22(0x9bd)!==_0x2c7c22(0x9bd))return _0x3d3ec6(_0x3bd38a)[_0x2c7c22(0x7ae)](_0x14d1af,_0x47169b)+',';else VisuMZ[_0x2c7c22(0x9cf)][_0x2c7c22(0x53c)][_0x2c7c22(0x40b)](this);}}}}}},VisuMZ['CoreEngine']['Window_NameInput_processTouch']=Window_NameInput[_0x161145(0x2d7)]['processTouch'],Window_NameInput[_0x161145(0x2d7)][_0x161145(0x5d3)]=function(){const _0x31334c=_0x161145;if(!this['isOpenAndActive']())return;if(this['_mode']===_0x31334c(0x5e3)){if(TouchInput[_0x31334c(0x645)]()&&this[_0x31334c(0x685)]()){if(_0x31334c(0x838)===_0x31334c(0x838))this[_0x31334c(0x89b)]('default');else return _0x3a4f10[_0x31334c(0x9cf)][_0x31334c(0x38a)]['call'](this,_0x3e2f3d);}else TouchInput['isCancelled']()&&this[_0x31334c(0x89b)]('default');}else VisuMZ[_0x31334c(0x9cf)][_0x31334c(0x544)][_0x31334c(0x40b)](this);},Window_NameInput['prototype'][_0x161145(0x198)]=function(){const _0x455128=_0x161145;if(Input[_0x455128(0x6aa)](_0x455128(0x368))){if(_0x455128(0x7e7)!==_0x455128(0x60e))Input[_0x455128(0x557)](),this['onNameOk']();else return!![];}else{if(Input['_inputString']!==undefined){let _0x28d537=Input[_0x455128(0x50a)],_0x21bd61=_0x28d537[_0x455128(0x300)];for(let _0x50044e=0x0;_0x50044e<_0x21bd61;++_0x50044e){this[_0x455128(0x700)]['add'](_0x28d537[_0x50044e])?SoundManager['playOk']():SoundManager[_0x455128(0x1f8)]();}Input[_0x455128(0x557)]();}}},Window_NameInput[_0x161145(0x2d7)][_0x161145(0x89b)]=function(_0x51b676){const _0x3e4040=_0x161145;let _0x2f890a=this[_0x3e4040(0x45e)];this['_mode']=_0x51b676,_0x2f890a!==this[_0x3e4040(0x45e)]&&(this[_0x3e4040(0x9cd)](),SoundManager[_0x3e4040(0x3c6)](),this[_0x3e4040(0x45e)]===_0x3e4040(0x9b3)?this[_0x3e4040(0x6fb)](0x0):this[_0x3e4040(0x6fb)](-0x1));},VisuMZ['CoreEngine'][_0x161145(0x2b2)]=Window_NameInput[_0x161145(0x2d7)][_0x161145(0x3ac)],Window_NameInput[_0x161145(0x2d7)]['cursorDown']=function(_0x1cb7a3){const _0x84ce01=_0x161145;if(this[_0x84ce01(0x45e)]===_0x84ce01(0x5e3)&&!Input[_0x84ce01(0x173)]())return;if(Input[_0x84ce01(0x8de)]())return;VisuMZ[_0x84ce01(0x9cf)][_0x84ce01(0x2b2)][_0x84ce01(0x40b)](this,_0x1cb7a3),this[_0x84ce01(0x89b)](_0x84ce01(0x9b3));},VisuMZ[_0x161145(0x9cf)][_0x161145(0x3ce)]=Window_NameInput['prototype'][_0x161145(0x9ad)],Window_NameInput[_0x161145(0x2d7)][_0x161145(0x9ad)]=function(_0x469edd){const _0x332dd5=_0x161145;if(this[_0x332dd5(0x45e)]===_0x332dd5(0x5e3)&&!Input[_0x332dd5(0x173)]())return;if(Input[_0x332dd5(0x8de)]())return;VisuMZ[_0x332dd5(0x9cf)][_0x332dd5(0x3ce)][_0x332dd5(0x40b)](this,_0x469edd),this[_0x332dd5(0x89b)](_0x332dd5(0x9b3));},VisuMZ[_0x161145(0x9cf)]['Window_NameInput_cursorRight']=Window_NameInput[_0x161145(0x2d7)][_0x161145(0x237)],Window_NameInput[_0x161145(0x2d7)][_0x161145(0x237)]=function(_0x4eef33){const _0x4d0baa=_0x161145;if(this[_0x4d0baa(0x45e)]===_0x4d0baa(0x5e3)&&!Input[_0x4d0baa(0x173)]())return;if(Input[_0x4d0baa(0x8de)]())return;VisuMZ['CoreEngine'][_0x4d0baa(0x612)]['call'](this,_0x4eef33),this[_0x4d0baa(0x89b)](_0x4d0baa(0x9b3));},VisuMZ['CoreEngine']['Window_NameInput_cursorLeft']=Window_NameInput[_0x161145(0x2d7)][_0x161145(0x5c6)],Window_NameInput[_0x161145(0x2d7)]['cursorLeft']=function(_0x159fed){const _0x558c54=_0x161145;if(this['_mode']===_0x558c54(0x5e3)&&!Input[_0x558c54(0x173)]())return;if(Input[_0x558c54(0x8de)]())return;VisuMZ[_0x558c54(0x9cf)][_0x558c54(0x1d3)][_0x558c54(0x40b)](this,_0x159fed),this[_0x558c54(0x89b)]('default');},VisuMZ[_0x161145(0x9cf)][_0x161145(0x9a2)]=Window_NameInput[_0x161145(0x2d7)]['cursorPagedown'],Window_NameInput[_0x161145(0x2d7)][_0x161145(0x99e)]=function(){const _0x466dd1=_0x161145;if(this['_mode']===_0x466dd1(0x5e3))return;if(Input[_0x466dd1(0x8de)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorPagedown'][_0x466dd1(0x40b)](this),this[_0x466dd1(0x89b)](_0x466dd1(0x9b3));},VisuMZ[_0x161145(0x9cf)][_0x161145(0x3c7)]=Window_NameInput[_0x161145(0x2d7)][_0x161145(0x4ef)],Window_NameInput[_0x161145(0x2d7)][_0x161145(0x4ef)]=function(){const _0x29c7d5=_0x161145;if(this[_0x29c7d5(0x45e)]==='keyboard')return;if(Input[_0x29c7d5(0x8de)]())return;VisuMZ[_0x29c7d5(0x9cf)][_0x29c7d5(0x3c7)][_0x29c7d5(0x40b)](this),this[_0x29c7d5(0x89b)](_0x29c7d5(0x9b3));},VisuMZ[_0x161145(0x9cf)][_0x161145(0x682)]=Window_NameInput['prototype']['refresh'],Window_NameInput[_0x161145(0x2d7)][_0x161145(0x9cd)]=function(){const _0x2ffe6b=_0x161145;if(this[_0x2ffe6b(0x45e)]===_0x2ffe6b(0x5e3)){if(_0x2ffe6b(0x8e0)===_0x2ffe6b(0x8e0)){this[_0x2ffe6b(0x469)]['clear'](),this[_0x2ffe6b(0x213)][_0x2ffe6b(0x557)](),this[_0x2ffe6b(0x83b)]();let _0x27092=VisuMZ[_0x2ffe6b(0x9cf)]['Settings']['KeyboardInput']['NameInputMessage'][_0x2ffe6b(0x3d0)]('\x0a'),_0x1c9671=_0x27092[_0x2ffe6b(0x300)],_0x5554f0=(this[_0x2ffe6b(0x2b9)]-_0x1c9671*this['lineHeight']())/0x2;for(let _0x3a1891=0x0;_0x3a1891<_0x1c9671;++_0x3a1891){let _0x3d424e=_0x27092[_0x3a1891],_0x2ba07e=this[_0x2ffe6b(0x155)](_0x3d424e)[_0x2ffe6b(0x3ea)],_0x2c2cf4=Math[_0x2ffe6b(0x7f2)]((this['contents']['width']-_0x2ba07e)/0x2);this[_0x2ffe6b(0x752)](_0x3d424e,_0x2c2cf4,_0x5554f0),_0x5554f0+=this['lineHeight']();}}else return this[_0x2ffe6b(0x16b)];}else VisuMZ[_0x2ffe6b(0x9cf)][_0x2ffe6b(0x682)][_0x2ffe6b(0x40b)](this);};};VisuMZ[_0x161145(0x9cf)][_0x161145(0x735)]=Window_ShopSell[_0x161145(0x2d7)]['isEnabled'],Window_ShopSell[_0x161145(0x2d7)][_0x161145(0x849)]=function(_0xceadf0){const _0x3c8076=_0x161145;if(VisuMZ['CoreEngine'][_0x3c8076(0x7a5)][_0x3c8076(0x678)][_0x3c8076(0x3b4)]&&DataManager[_0x3c8076(0x789)](_0xceadf0)){if(_0x3c8076(0x507)===_0x3c8076(0x507))return![];else this[_0x3c8076(0x4fb)](...arguments);}else return VisuMZ[_0x3c8076(0x9cf)][_0x3c8076(0x735)][_0x3c8076(0x40b)](this,_0xceadf0);},Window_NumberInput[_0x161145(0x2d7)]['isUseModernControls']=function(){return![];};VisuMZ[_0x161145(0x9cf)][_0x161145(0x7a5)]['KeyboardInput'][_0x161145(0x663)]&&(VisuMZ[_0x161145(0x9cf)]['Window_NumberInput_start']=Window_NumberInput[_0x161145(0x2d7)][_0x161145(0x26e)],Window_NumberInput[_0x161145(0x2d7)]['start']=function(){const _0xe9d16c=_0x161145;VisuMZ[_0xe9d16c(0x9cf)]['Window_NumberInput_start'][_0xe9d16c(0x40b)](this),this[_0xe9d16c(0x6fb)](this[_0xe9d16c(0x293)]-0x1),Input[_0xe9d16c(0x557)]();},VisuMZ['CoreEngine'][_0x161145(0x6de)]=Window_NumberInput['prototype'][_0x161145(0x86a)],Window_NumberInput['prototype'][_0x161145(0x86a)]=function(){const _0x519afd=_0x161145;if(!this[_0x519afd(0x4c1)]())return;if(Input['isNumpadPressed']())this[_0x519afd(0x860)]();else{if(Input[_0x519afd(0x6aa)]('backspace'))this['processKeyboardBackspace']();else{if(Input['_inputSpecialKeyCode']===0x2e)_0x519afd(0x537)==='woess'?(_0x33ba04[_0x519afd(0x1ca)]()&&(_0x12a407['log']('Conditional\x20Branch\x20Script\x20Error'),_0x5d848f[_0x519afd(0x312)](_0x49c080)),this[_0x519afd(0x4a0)]()):this['processKeyboardDelete']();else{if(Input[_0x519afd(0x99a)]===0x24)_0x519afd(0x53e)!=='foZOV'?this['processKeyboardHome']():this[_0x519afd(0x15b)]=[];else Input[_0x519afd(0x99a)]===0x23?_0x519afd(0x5c7)==='EEpxP'?this['parseForcedGameTroopSettingsCoreEngine'](_0x42395c[_0x519afd(0x97f)]):this['processKeyboardEnd']():VisuMZ[_0x519afd(0x9cf)][_0x519afd(0x6de)][_0x519afd(0x40b)](this);}}}},Window_NumberInput['prototype'][_0x161145(0x89d)]=function(){const _0x10810d=_0x161145;if(!this[_0x10810d(0x744)]())return;Input['isNumpadPressed']()?this['processKeyboardDigitChange']():Window_Selectable['prototype'][_0x10810d(0x89d)]['call'](this);},Window_NumberInput[_0x161145(0x2d7)][_0x161145(0x2af)]=function(){},Window_NumberInput[_0x161145(0x2d7)][_0x161145(0x860)]=function(){const _0x1b8512=_0x161145;if(String(this[_0x1b8512(0x680)])['length']>=this[_0x1b8512(0x293)])return;const _0x1e119c=Number(String(this[_0x1b8512(0x680)])+Input[_0x1b8512(0x50a)]);if(isNaN(_0x1e119c))return;this[_0x1b8512(0x680)]=_0x1e119c;const _0x367778='9'['repeat'](this['_maxDigits']);this[_0x1b8512(0x680)]=this[_0x1b8512(0x680)][_0x1b8512(0x829)](0x0,_0x367778),Input['clear'](),this[_0x1b8512(0x9cd)](),SoundManager[_0x1b8512(0x18d)](),this[_0x1b8512(0x6fb)](this[_0x1b8512(0x293)]-0x1);},Window_NumberInput[_0x161145(0x2d7)][_0x161145(0x969)]=function(){const _0xb80478=_0x161145;this[_0xb80478(0x680)]=Number(String(this['_number'])[_0xb80478(0x811)](0x0,-0x1)),this['_number']=Math[_0xb80478(0x32a)](0x0,this['_number']),Input[_0xb80478(0x557)](),this[_0xb80478(0x9cd)](),SoundManager[_0xb80478(0x18d)](),this[_0xb80478(0x6fb)](this[_0xb80478(0x293)]-0x1);},Window_NumberInput[_0x161145(0x2d7)][_0x161145(0x1b0)]=function(){const _0x589a8e=_0x161145;this['_number']=Number(String(this[_0x589a8e(0x680)])[_0x589a8e(0x950)](0x1)),this[_0x589a8e(0x680)]=Math[_0x589a8e(0x32a)](0x0,this[_0x589a8e(0x680)]),Input[_0x589a8e(0x557)](),this['refresh'](),SoundManager['playCursor'](),this['select'](this[_0x589a8e(0x293)]-0x1);},Window_NumberInput[_0x161145(0x2d7)][_0x161145(0x734)]=function(){const _0x4ca7bb=_0x161145;if(this[_0x4ca7bb(0x154)]()===0x0)return;Input[_0x4ca7bb(0x557)](),this[_0x4ca7bb(0x9cd)](),SoundManager[_0x4ca7bb(0x18d)](),this[_0x4ca7bb(0x6fb)](0x0);},Window_NumberInput[_0x161145(0x2d7)][_0x161145(0x14d)]=function(){const _0x373f5a=_0x161145;if(this[_0x373f5a(0x154)]()===this['_maxDigits']-0x1)return;Input['clear'](),this['refresh'](),SoundManager[_0x373f5a(0x18d)](),this[_0x373f5a(0x6fb)](this[_0x373f5a(0x293)]-0x1);});;VisuMZ[_0x161145(0x9cf)]['Window_MapName_refresh']=Window_MapName[_0x161145(0x2d7)][_0x161145(0x9cd)],Window_MapName[_0x161145(0x2d7)]['refresh']=function(){const _0x58fdb2=_0x161145;if(VisuMZ['CoreEngine'][_0x58fdb2(0x7a5)][_0x58fdb2(0x678)]['MapNameTextCode']){if(_0x58fdb2(0x999)!==_0x58fdb2(0x999)){_0x5be927=_0x2813da||0xa8,this['resetTextColor']();if(_0x146097[_0x58fdb2(0x9cf)][_0x58fdb2(0x7a5)]['UI'][_0x58fdb2(0x6d9)])this[_0x58fdb2(0x752)](_0x56ea90[_0x58fdb2(0x698)]()[_0x58fdb2(0x618)],_0x2420c3,_0x12b2a8,_0xd668b5);else{const _0x40cacd=_0x5c5fd3[_0x58fdb2(0x698)]()[_0x58fdb2(0x618)][_0x58fdb2(0x98a)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x40cacd,_0x379983,_0x32a338,_0x2d4608);}}else this[_0x58fdb2(0x251)]();}else VisuMZ['CoreEngine'][_0x58fdb2(0x9c5)][_0x58fdb2(0x40b)](this);},Window_MapName['prototype'][_0x161145(0x251)]=function(){const _0x2005ac=_0x161145;this[_0x2005ac(0x469)][_0x2005ac(0x557)]();if($gameMap[_0x2005ac(0x4bc)]()){const _0x14b794=this[_0x2005ac(0x6ba)];this[_0x2005ac(0x7a6)](0x0,0x0,_0x14b794,this[_0x2005ac(0x986)]());const _0x5307eb=this['textSizeEx']($gameMap[_0x2005ac(0x4bc)]())[_0x2005ac(0x3ea)];this[_0x2005ac(0x752)]($gameMap[_0x2005ac(0x4bc)](),Math[_0x2005ac(0x7f2)]((_0x14b794-_0x5307eb)/0x2),0x0);}},Window_TitleCommand[_0x161145(0x6a8)]=VisuMZ[_0x161145(0x9cf)]['Settings'][_0x161145(0x82f)],Window_TitleCommand[_0x161145(0x2d7)]['makeCommandList']=function(){const _0x206ca2=_0x161145;this[_0x206ca2(0x8b9)]();},Window_TitleCommand[_0x161145(0x2d7)][_0x161145(0x8b9)]=function(){const _0x9860a2=_0x161145;for(const _0x65ffe8 of Window_TitleCommand[_0x9860a2(0x6a8)]){if(_0x9860a2(0x8f4)===_0x9860a2(0x76c))_0x306ad2=_0x7f4e9c||_0x48c69d['faceWidth'],_0x4b796c=_0x2c2d9f||_0x329cff[_0x9860a2(0x352)],_0x54a508=_0x31cc27[_0x9860a2(0x8c8)](_0x302078),_0x4cf25c=_0x58c23f[_0x9860a2(0x8c8)](_0x10166f),_0x117b37=_0x57947e[_0x9860a2(0x8c8)](_0x30bbd2),_0x1ed48f=_0x35123a[_0x9860a2(0x8c8)](_0x2e7f74),_0x3b3cb0[_0x9860a2(0x9cf)]['Window_Base_drawFace'][_0x9860a2(0x40b)](this,_0x367fc1,_0x5e7cee,_0x13bdf4,_0x498c5e,_0x54242f,_0x426f0c);else{if(_0x65ffe8[_0x9860a2(0x671)][_0x9860a2(0x40b)](this)){if(_0x9860a2(0x1f3)==='mmmFq'){this[_0x9860a2(0x469)][_0x9860a2(0x557)]();for(let _0x38736a=0x1;_0x38736a<=0x5;_0x38736a++){this[_0x9860a2(0x150)](_0x38736a);}}else{const _0x347abc=_0x65ffe8[_0x9860a2(0x443)];let _0x17c0fc=_0x65ffe8['TextStr'];if(['',_0x9860a2(0x4c2)][_0x9860a2(0x219)](_0x17c0fc))_0x17c0fc=_0x65ffe8['TextJS'][_0x9860a2(0x40b)](this);const _0x31e312=_0x65ffe8[_0x9860a2(0x9df)][_0x9860a2(0x40b)](this),_0x389efc=_0x65ffe8[_0x9860a2(0x5d7)][_0x9860a2(0x40b)](this);this[_0x9860a2(0x1b3)](_0x17c0fc,_0x347abc,_0x31e312,_0x389efc),this['setHandler'](_0x347abc,_0x65ffe8[_0x9860a2(0x2b3)][_0x9860a2(0x68f)](this,_0x389efc));}}}}},Window_GameEnd['_commandList']=VisuMZ[_0x161145(0x9cf)][_0x161145(0x7a5)][_0x161145(0x911)][_0x161145(0x23e)]['CommandList'],Window_GameEnd[_0x161145(0x2d7)][_0x161145(0x57a)]=function(){this['makeCoreEngineCommandList']();},Window_GameEnd[_0x161145(0x2d7)][_0x161145(0x8b9)]=function(){const _0xaf80a9=_0x161145;for(const _0x5162e4 of Window_GameEnd[_0xaf80a9(0x6a8)]){if(_0xaf80a9(0x754)==='kDcEh'){if(_0x5162e4[_0xaf80a9(0x671)][_0xaf80a9(0x40b)](this)){const _0x1f9a8e=_0x5162e4[_0xaf80a9(0x443)];let _0x48f78f=_0x5162e4[_0xaf80a9(0x77b)];if(['',_0xaf80a9(0x4c2)][_0xaf80a9(0x219)](_0x48f78f))_0x48f78f=_0x5162e4[_0xaf80a9(0x528)][_0xaf80a9(0x40b)](this);const _0x13df97=_0x5162e4[_0xaf80a9(0x9df)]['call'](this),_0x5f1e7d=_0x5162e4['ExtJS'][_0xaf80a9(0x40b)](this);this[_0xaf80a9(0x1b3)](_0x48f78f,_0x1f9a8e,_0x13df97,_0x5f1e7d),this[_0xaf80a9(0x1cd)](_0x1f9a8e,_0x5162e4[_0xaf80a9(0x2b3)]['bind'](this,_0x5f1e7d));}}else return _0x5f1022[_0xaf80a9(0x9cf)]['Sprite_Gauge_gaugeRate'][_0xaf80a9(0x40b)](this)['clamp'](0x0,0x1);}};function Window_ButtonAssist(){const _0x4a19f9=_0x161145;this[_0x4a19f9(0x4fb)](...arguments);}Window_ButtonAssist[_0x161145(0x2d7)]=Object['create'](Window_Base[_0x161145(0x2d7)]),Window_ButtonAssist[_0x161145(0x2d7)][_0x161145(0x4e8)]=Window_ButtonAssist,Window_ButtonAssist[_0x161145(0x2d7)][_0x161145(0x4fb)]=function(_0xebbb24){const _0x1c28a5=_0x161145;this[_0x1c28a5(0x905)]={},Window_Base['prototype'][_0x1c28a5(0x4fb)][_0x1c28a5(0x40b)](this,_0xebbb24),this[_0x1c28a5(0x6ce)](VisuMZ['CoreEngine']['Settings'][_0x1c28a5(0x6a3)][_0x1c28a5(0x457)]||0x0),this[_0x1c28a5(0x9cd)]();},Window_ButtonAssist[_0x161145(0x2d7)][_0x161145(0x730)]=function(){const _0x54519a=_0x161145;this['contents'][_0x54519a(0x324)]<=0x60&&(this['contents']['fontSize']+=0x6);},Window_ButtonAssist['prototype'][_0x161145(0x346)]=function(){const _0x5984b7=_0x161145;this[_0x5984b7(0x469)]['fontSize']>=0x18&&(this[_0x5984b7(0x469)]['fontSize']-=0x6);},Window_ButtonAssist[_0x161145(0x2d7)][_0x161145(0x361)]=function(){const _0xf0dcd4=_0x161145;Window_Base['prototype'][_0xf0dcd4(0x361)]['call'](this),this[_0xf0dcd4(0x159)]();},Window_ButtonAssist['prototype'][_0x161145(0x44c)]=function(){const _0x46b9dd=_0x161145;this['padding']=SceneManager[_0x46b9dd(0x988)][_0x46b9dd(0x957)]()!==_0x46b9dd(0x90b)?0x0:0x8;},Window_ButtonAssist['prototype'][_0x161145(0x159)]=function(){const _0x73895b=_0x161145,_0x5bb1ec=SceneManager['_scene'];for(let _0x58f7fe=0x1;_0x58f7fe<=0x5;_0x58f7fe++){if(_0x73895b(0x153)===_0x73895b(0x153)){if(this['_data'][_0x73895b(0x4dc)[_0x73895b(0x229)](_0x58f7fe)]!==_0x5bb1ec[_0x73895b(0x7c8)[_0x73895b(0x229)](_0x58f7fe)]())return this[_0x73895b(0x9cd)]();if(this[_0x73895b(0x905)][_0x73895b(0x8d8)[_0x73895b(0x229)](_0x58f7fe)]!==_0x5bb1ec['buttonAssistText%1'[_0x73895b(0x229)](_0x58f7fe)]())return this[_0x73895b(0x9cd)]();}else return _0x184148[_0x73895b(0x466)][_0x73895b(0x209)][_0x73895b(0x40b)](this);}},Window_ButtonAssist['prototype']['refresh']=function(){const _0x27f5f1=_0x161145;this[_0x27f5f1(0x469)][_0x27f5f1(0x557)]();for(let _0x14d460=0x1;_0x14d460<=0x5;_0x14d460++){if(_0x27f5f1(0x9aa)===_0x27f5f1(0x8ad)){const _0xef67e4=_0x5c59ee[_0x27f5f1(0x988)];for(let _0x27c0ad=0x1;_0x27c0ad<=0x5;_0x27c0ad++){if(this['_data']['key%1'[_0x27f5f1(0x229)](_0x27c0ad)]!==_0xef67e4[_0x27f5f1(0x7c8)['format'](_0x27c0ad)]())return this[_0x27f5f1(0x9cd)]();if(this[_0x27f5f1(0x905)][_0x27f5f1(0x8d8)['format'](_0x27c0ad)]!==_0xef67e4[_0x27f5f1(0x363)['format'](_0x27c0ad)]())return this[_0x27f5f1(0x9cd)]();}}else this[_0x27f5f1(0x150)](_0x14d460);}},Window_ButtonAssist['prototype']['drawSegment']=function(_0x5fd29f){const _0xbeabbd=_0x161145,_0x162abe=this[_0xbeabbd(0x6ba)]/0x5,_0x238dbd=SceneManager['_scene'],_0x3792fd=_0x238dbd[_0xbeabbd(0x7c8)[_0xbeabbd(0x229)](_0x5fd29f)](),_0x50109e=_0x238dbd['buttonAssistText%1'[_0xbeabbd(0x229)](_0x5fd29f)]();this['_data'][_0xbeabbd(0x4dc)[_0xbeabbd(0x229)](_0x5fd29f)]=_0x3792fd,this[_0xbeabbd(0x905)][_0xbeabbd(0x8d8)[_0xbeabbd(0x229)](_0x5fd29f)]=_0x50109e;if(_0x3792fd==='')return;if(_0x50109e==='')return;const _0x1ef2a5=_0x238dbd[_0xbeabbd(0x302)[_0xbeabbd(0x229)](_0x5fd29f)](),_0x34479a=this[_0xbeabbd(0x569)](),_0x34cf94=_0x162abe*(_0x5fd29f-0x1)+_0x34479a+_0x1ef2a5,_0xeacc99=VisuMZ[_0xbeabbd(0x9cf)][_0xbeabbd(0x7a5)][_0xbeabbd(0x6a3)]['TextFmt'];this[_0xbeabbd(0x752)](_0xeacc99[_0xbeabbd(0x229)](_0x3792fd,_0x50109e),_0x34cf94,0x0,_0x162abe-_0x34479a*0x2);},VisuMZ['CoreEngine'][_0x161145(0x52c)]=Game_Interpreter['prototype'][_0x161145(0x760)],Game_Interpreter[_0x161145(0x2d7)][_0x161145(0x760)]=function(){const _0x265fd3=_0x161145;if($gameTemp[_0x265fd3(0x8aa)]!==undefined){if('RriSh'===_0x265fd3(0x3e8))_0x255d38['CoreEngine']['Window_Base_update'][_0x265fd3(0x40b)](this),this[_0x265fd3(0x243)]();else return VisuMZ['CoreEngine']['UpdatePictureCoordinates']();}return VisuMZ[_0x265fd3(0x9cf)]['Game_Interpreter_updateWaitMode'][_0x265fd3(0x40b)](this);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x977)]=function(){const _0x4966c6=_0x161145,_0x335254=$gameTemp[_0x4966c6(0x8aa)]||0x0;(_0x335254<0x0||_0x335254>0x64||TouchInput[_0x4966c6(0x62e)]()||Input[_0x4966c6(0x645)](_0x4966c6(0x788)))&&($gameTemp[_0x4966c6(0x8aa)]=undefined,Input[_0x4966c6(0x557)](),TouchInput[_0x4966c6(0x557)]());const _0x33d953=$gameScreen['picture'](_0x335254);return _0x33d953&&(_0x33d953['_x']=TouchInput['_x'],_0x33d953['_y']=TouchInput['_y']),VisuMZ[_0x4966c6(0x9cf)][_0x4966c6(0x615)](),$gameTemp[_0x4966c6(0x8aa)]!==undefined;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x615)]=function(){const _0x3ac7e0=_0x161145,_0x525c7e=SceneManager[_0x3ac7e0(0x988)];if(!_0x525c7e)return;!_0x525c7e['_pictureCoordinatesWindow']&&(SoundManager[_0x3ac7e0(0x248)](),_0x525c7e[_0x3ac7e0(0x9d1)]=new Window_PictureCoordinates(),_0x525c7e[_0x3ac7e0(0x784)](_0x525c7e[_0x3ac7e0(0x9d1)])),$gameTemp[_0x3ac7e0(0x8aa)]===undefined&&(_0x3ac7e0(0x945)!==_0x3ac7e0(0x945)?this[_0x3ac7e0(0x198)]():(SoundManager[_0x3ac7e0(0x384)](),_0x525c7e['removeChild'](_0x525c7e[_0x3ac7e0(0x9d1)]),_0x525c7e[_0x3ac7e0(0x9d1)]=undefined));};function Window_PictureCoordinates(){const _0xa34a8d=_0x161145;this[_0xa34a8d(0x4fb)](...arguments);}Window_PictureCoordinates[_0x161145(0x2d7)]=Object[_0x161145(0x1dd)](Window_Base[_0x161145(0x2d7)]),Window_PictureCoordinates[_0x161145(0x2d7)]['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x161145(0x2d7)]['initialize']=function(){const _0x51c21d=_0x161145;this['_lastOrigin']='nah',this[_0x51c21d(0x4ec)]=_0x51c21d(0x715),this[_0x51c21d(0x199)]=_0x51c21d(0x715);const _0x18f7f9=this['windowRect']();Window_Base['prototype']['initialize'][_0x51c21d(0x40b)](this,_0x18f7f9),this[_0x51c21d(0x6ce)](0x2);},Window_PictureCoordinates[_0x161145(0x2d7)][_0x161145(0x377)]=function(){const _0x492054=_0x161145;let _0x6b6af7=0x0,_0x1992a3=Graphics['height']-this[_0x492054(0x986)](),_0x49e597=Graphics['width'],_0x3695a2=this[_0x492054(0x986)]();return new Rectangle(_0x6b6af7,_0x1992a3,_0x49e597,_0x3695a2);},Window_PictureCoordinates[_0x161145(0x2d7)][_0x161145(0x44c)]=function(){const _0x523357=_0x161145;this[_0x523357(0x220)]=0x0;},Window_PictureCoordinates[_0x161145(0x2d7)][_0x161145(0x361)]=function(){const _0x509b90=_0x161145;Window_Base[_0x509b90(0x2d7)][_0x509b90(0x361)][_0x509b90(0x40b)](this),this[_0x509b90(0x4da)]();},Window_PictureCoordinates[_0x161145(0x2d7)][_0x161145(0x4da)]=function(){const _0x270edc=_0x161145;if(!this[_0x270edc(0x5c3)]())return;this[_0x270edc(0x9cd)]();},Window_PictureCoordinates[_0x161145(0x2d7)]['needsUpdate']=function(){const _0x583678=_0x161145,_0x524a0=$gameTemp['_pictureCoordinatesMode'],_0x5dc87d=$gameScreen[_0x583678(0x99f)](_0x524a0);if(_0x5dc87d)return this[_0x583678(0x8b7)]!==_0x5dc87d['_origin']||this[_0x583678(0x4ec)]!==_0x5dc87d['_x']||this[_0x583678(0x199)]!==_0x5dc87d['_y'];else{if(_0x583678(0x792)===_0x583678(0x792))return![];else{const _0x1d3594=_0x323a3c['touchUI']?(_0x4f5895['prototype'][_0x583678(0x904)]()+0x6)*0x2:0x0,_0x1b701b=this['buttonY'](),_0x670dc8=_0x55b16a[_0x583678(0x402)]-_0x1d3594*0x2,_0x504af0=this['buttonAreaHeight']();return new _0x27ea02(_0x1d3594,_0x1b701b,_0x670dc8,_0x504af0);}}},Window_PictureCoordinates[_0x161145(0x2d7)][_0x161145(0x9cd)]=function(){const _0x555663=_0x161145;this[_0x555663(0x469)][_0x555663(0x557)]();const _0x34fa2b=$gameTemp[_0x555663(0x8aa)],_0xca0323=$gameScreen[_0x555663(0x99f)](_0x34fa2b);if(!_0xca0323)return;this[_0x555663(0x8b7)]=_0xca0323['_origin'],this[_0x555663(0x4ec)]=_0xca0323['_x'],this[_0x555663(0x199)]=_0xca0323['_y'];const _0x18f9f9=ColorManager['itemBackColor1']();this[_0x555663(0x469)]['fillRect'](0x0,0x0,this[_0x555663(0x6ba)],this[_0x555663(0x2b9)],_0x18f9f9);const _0xc348f9=_0x555663(0x25d)[_0x555663(0x229)](_0xca0323[_0x555663(0x448)]===0x0?_0x555663(0x5c0):_0x555663(0x3cf)),_0x5ca3fe=_0x555663(0x5de)[_0x555663(0x229)](_0xca0323['_x']),_0x9e6605=_0x555663(0x6e9)[_0x555663(0x229)](_0xca0323['_y']),_0x3adef4=_0x555663(0x87d)[_0x555663(0x229)](TextManager['getInputButtonString']('cancel'));let _0x240222=Math[_0x555663(0x7f2)](this[_0x555663(0x6ba)]/0x4);this['drawText'](_0xc348f9,_0x240222*0x0,0x0,_0x240222),this['drawText'](_0x5ca3fe,_0x240222*0x1,0x0,_0x240222,'center'),this[_0x555663(0x4c4)](_0x9e6605,_0x240222*0x2,0x0,_0x240222,_0x555663(0x4a7));const _0x25448e=this[_0x555663(0x155)](_0x3adef4)[_0x555663(0x3ea)],_0x46719d=this['innerWidth']-_0x25448e;this[_0x555663(0x752)](_0x3adef4,_0x46719d,0x0,_0x25448e);},VisuMZ[_0x161145(0x8ae)]=function(_0xdd2f62){const _0x44651e=_0x161145;if(Utils['isOptionValid'](_0x44651e(0x2c5))){var _0x97f5b0=require(_0x44651e(0x7c2))[_0x44651e(0x651)][_0x44651e(0x65c)]();SceneManager[_0x44651e(0x8fe)]();if(_0xdd2f62)setTimeout(_0x97f5b0['focus'][_0x44651e(0x68f)](_0x97f5b0),0x190);}},VisuMZ[_0x161145(0x3cc)]=function(_0x3dac39,_0x480db8){const _0x593939=_0x161145;_0x480db8=_0x480db8['toUpperCase']();var _0x40f69e=1.70158,_0x2584fa=0.7;switch(_0x480db8){case'LINEAR':return _0x3dac39;case _0x593939(0x707):return-0x1*Math[_0x593939(0x49a)](_0x3dac39*(Math['PI']/0x2))+0x1;case'OUTSINE':return Math['sin'](_0x3dac39*(Math['PI']/0x2));case _0x593939(0x184):return-0.5*(Math['cos'](Math['PI']*_0x3dac39)-0x1);case'INQUAD':return _0x3dac39*_0x3dac39;case _0x593939(0x7cf):return _0x3dac39*(0x2-_0x3dac39);case _0x593939(0x462):return _0x3dac39<0.5?0x2*_0x3dac39*_0x3dac39:-0x1+(0x4-0x2*_0x3dac39)*_0x3dac39;case _0x593939(0x9d7):return _0x3dac39*_0x3dac39*_0x3dac39;case _0x593939(0x1c0):var _0x306f1a=_0x3dac39-0x1;return _0x306f1a*_0x306f1a*_0x306f1a+0x1;case'INOUTCUBIC':return _0x3dac39<0.5?0x4*_0x3dac39*_0x3dac39*_0x3dac39:(_0x3dac39-0x1)*(0x2*_0x3dac39-0x2)*(0x2*_0x3dac39-0x2)+0x1;case _0x593939(0x8ea):return _0x3dac39*_0x3dac39*_0x3dac39*_0x3dac39;case _0x593939(0x5af):var _0x306f1a=_0x3dac39-0x1;return 0x1-_0x306f1a*_0x306f1a*_0x306f1a*_0x306f1a;case'INOUTQUART':var _0x306f1a=_0x3dac39-0x1;return _0x3dac39<0.5?0x8*_0x3dac39*_0x3dac39*_0x3dac39*_0x3dac39:0x1-0x8*_0x306f1a*_0x306f1a*_0x306f1a*_0x306f1a;case _0x593939(0x39a):return _0x3dac39*_0x3dac39*_0x3dac39*_0x3dac39*_0x3dac39;case _0x593939(0x95c):var _0x306f1a=_0x3dac39-0x1;return 0x1+_0x306f1a*_0x306f1a*_0x306f1a*_0x306f1a*_0x306f1a;case _0x593939(0x606):var _0x306f1a=_0x3dac39-0x1;return _0x3dac39<0.5?0x10*_0x3dac39*_0x3dac39*_0x3dac39*_0x3dac39*_0x3dac39:0x1+0x10*_0x306f1a*_0x306f1a*_0x306f1a*_0x306f1a*_0x306f1a;case _0x593939(0x8c3):if(_0x3dac39===0x0)return 0x0;return Math[_0x593939(0x210)](0x2,0xa*(_0x3dac39-0x1));case _0x593939(0x919):if(_0x3dac39===0x1)return 0x1;return-Math[_0x593939(0x210)](0x2,-0xa*_0x3dac39)+0x1;case _0x593939(0x635):if(_0x3dac39===0x0||_0x3dac39===0x1)return _0x3dac39;var _0x166d4e=_0x3dac39*0x2,_0xad4750=_0x166d4e-0x1;if(_0x166d4e<0x1){if(_0x593939(0x882)===_0x593939(0x543)){const _0x352874=this['createChildSprite'](_0x5c700c,_0x34d346);_0x352874[_0x593939(0x436)]['drawText'](_0x4e73cb[_0x54297d],0x0,0x0,_0x25d4e5,_0x2587a8,_0x593939(0x4a7)),_0x352874['x']=(_0x1af07a-(_0x5722ea[_0x593939(0x300)]-0x1)/0x2)*_0xf99d26,_0x352874['dy']=-_0x179119;}else return 0.5*Math[_0x593939(0x210)](0x2,0xa*_0xad4750);}return 0.5*(-Math['pow'](0x2,-0xa*_0xad4750)+0x2);case _0x593939(0x223):var _0x166d4e=_0x3dac39/0x1;return-0x1*(Math[_0x593939(0x675)](0x1-_0x166d4e*_0x3dac39)-0x1);case _0x593939(0x21a):var _0x306f1a=_0x3dac39-0x1;return Math['sqrt'](0x1-_0x306f1a*_0x306f1a);case'INOUTCIRC':var _0x166d4e=_0x3dac39*0x2,_0xad4750=_0x166d4e-0x2;if(_0x166d4e<0x1)return-0.5*(Math[_0x593939(0x675)](0x1-_0x166d4e*_0x166d4e)-0x1);return 0.5*(Math[_0x593939(0x675)](0x1-_0xad4750*_0xad4750)+0x1);case _0x593939(0x9ba):return _0x3dac39*_0x3dac39*((_0x40f69e+0x1)*_0x3dac39-_0x40f69e);case _0x593939(0x3c1):var _0x166d4e=_0x3dac39/0x1-0x1;return _0x166d4e*_0x166d4e*((_0x40f69e+0x1)*_0x166d4e+_0x40f69e)+0x1;break;case _0x593939(0x259):var _0x166d4e=_0x3dac39*0x2,_0x120d90=_0x166d4e-0x2,_0x59e0d0=_0x40f69e*1.525;if(_0x166d4e<0x1)return 0.5*_0x166d4e*_0x166d4e*((_0x59e0d0+0x1)*_0x166d4e-_0x59e0d0);return 0.5*(_0x120d90*_0x120d90*((_0x59e0d0+0x1)*_0x120d90+_0x59e0d0)+0x2);case _0x593939(0x486):if(_0x3dac39===0x0||_0x3dac39===0x1)return _0x593939(0x3fa)!==_0x593939(0x3fa)?_0x5dbc01[_0x593939(0x466)]['StatusRect'][_0x593939(0x40b)](this):_0x3dac39;var _0x166d4e=_0x3dac39/0x1,_0xad4750=_0x166d4e-0x1,_0x363e2d=0x1-_0x2584fa,_0x59e0d0=_0x363e2d/(0x2*Math['PI'])*Math[_0x593939(0x3ee)](0x1);return-(Math[_0x593939(0x210)](0x2,0xa*_0xad4750)*Math[_0x593939(0x2c4)]((_0xad4750-_0x59e0d0)*(0x2*Math['PI'])/_0x363e2d));case _0x593939(0x1fd):var _0x363e2d=0x1-_0x2584fa,_0x166d4e=_0x3dac39*0x2;if(_0x3dac39===0x0||_0x3dac39===0x1)return _0x3dac39;var _0x59e0d0=_0x363e2d/(0x2*Math['PI'])*Math[_0x593939(0x3ee)](0x1);return Math[_0x593939(0x210)](0x2,-0xa*_0x166d4e)*Math[_0x593939(0x2c4)]((_0x166d4e-_0x59e0d0)*(0x2*Math['PI'])/_0x363e2d)+0x1;case'INOUTELASTIC':var _0x363e2d=0x1-_0x2584fa;if(_0x3dac39===0x0||_0x3dac39===0x1){if('dEEia'==='OOeoY')_0x552434[_0x593939(0x7ca)]=0x0,_0x4c2343['bgsVolume']=0x0,_0x284eeb[_0x593939(0x4c6)]=0x0,_0x58522f['seVolume']=0x0;else return _0x3dac39;}var _0x166d4e=_0x3dac39*0x2,_0xad4750=_0x166d4e-0x1,_0x59e0d0=_0x363e2d/(0x2*Math['PI'])*Math[_0x593939(0x3ee)](0x1);if(_0x166d4e<0x1){if('lETjk'!==_0x593939(0x6d3)){const _0x4a45cb='AllMaps';this['_storedMapText']['remove'](_0x73f7a0)[_0x593939(0x748)]('')[_0x593939(0x748)](null);const _0x64d2d5=this['_storedMapText']['join'](_0x593939(0x4e7))['trim']();_0x40b241[_0x593939(0x9cf)][_0x593939(0x37e)](_0x64d2d5,_0x4a45cb,!![]),_0x57bc32['_scene'][_0x593939(0x985)]=!![];}else return-0.5*(Math[_0x593939(0x210)](0x2,0xa*_0xad4750)*Math[_0x593939(0x2c4)]((_0xad4750-_0x59e0d0)*(0x2*Math['PI'])/_0x363e2d));}return Math[_0x593939(0x210)](0x2,-0xa*_0xad4750)*Math[_0x593939(0x2c4)]((_0xad4750-_0x59e0d0)*(0x2*Math['PI'])/_0x363e2d)*0.5+0x1;case _0x593939(0x9b7):var _0x166d4e=_0x3dac39/0x1;if(_0x166d4e<0x1/2.75){if(_0x593939(0x3b0)!=='vAwUc')return 7.5625*_0x166d4e*_0x166d4e;else _0x179b79['CoreEngine'][_0x593939(0x3c3)][_0x593939(0x40b)](this);}else{if(_0x166d4e<0x2/2.75){var _0x120d90=_0x166d4e-1.5/2.75;return 7.5625*_0x120d90*_0x120d90+0.75;}else{if(_0x166d4e<2.5/2.75){var _0x120d90=_0x166d4e-2.25/2.75;return 7.5625*_0x120d90*_0x120d90+0.9375;}else{var _0x120d90=_0x166d4e-2.625/2.75;return 7.5625*_0x120d90*_0x120d90+0.984375;}}}case _0x593939(0x7ba):var _0x309721=0x1-VisuMZ[_0x593939(0x3cc)](0x1-_0x3dac39,_0x593939(0x6ec));return _0x309721;case _0x593939(0x8d0):if(_0x3dac39<0.5){if(_0x593939(0x77c)!=='SQjUN')var _0x309721=VisuMZ['ApplyEasing'](_0x3dac39*0x2,_0x593939(0x523))*0.5;else{const _0x1d4ce1=this['innerWidth'];this[_0x593939(0x7a6)](0x0,0x0,_0x1d4ce1,this[_0x593939(0x986)]());const _0x226b6f=this['textSizeEx'](_0x40578a[_0x593939(0x4bc)]())['width'];this['drawTextEx'](_0x248bf1[_0x593939(0x4bc)](),_0x1b081e[_0x593939(0x7f2)]((_0x1d4ce1-_0x226b6f)/0x2),0x0);}}else var _0x309721=VisuMZ[_0x593939(0x3cc)](_0x3dac39*0x2-0x1,'outbounce')*0.5+0.5;return _0x309721;default:return _0x3dac39;}},VisuMZ['GetParamIcon']=function(_0x4cd812){const _0x22b569=_0x161145;_0x4cd812=String(_0x4cd812)['toUpperCase']();const _0x5744ef=VisuMZ[_0x22b569(0x9cf)]['Settings'][_0x22b569(0x538)];if(_0x4cd812===_0x22b569(0x419))return _0x5744ef[_0x22b569(0x8df)];if(_0x4cd812===_0x22b569(0x4e3))return _0x5744ef[_0x22b569(0x186)];if(_0x4cd812===_0x22b569(0x888))return _0x5744ef[_0x22b569(0x9c9)];if(_0x4cd812===_0x22b569(0x35c))return _0x5744ef[_0x22b569(0x39d)];if(_0x4cd812===_0x22b569(0x609))return _0x5744ef['IconParam4'];if(_0x4cd812===_0x22b569(0x31f))return _0x5744ef[_0x22b569(0x876)];if(_0x4cd812==='AGI')return _0x5744ef[_0x22b569(0x862)];if(_0x4cd812==='LUK')return _0x5744ef[_0x22b569(0x1cf)];if(_0x4cd812===_0x22b569(0x6ae))return _0x5744ef['IconXParam0'];if(_0x4cd812===_0x22b569(0x995))return _0x5744ef['IconXParam1'];if(_0x4cd812===_0x22b569(0x5c2))return _0x5744ef['IconXParam2'];if(_0x4cd812===_0x22b569(0x74b))return _0x5744ef[_0x22b569(0x32c)];if(_0x4cd812===_0x22b569(0x6fa))return _0x5744ef[_0x22b569(0x409)];if(_0x4cd812===_0x22b569(0x1d0))return _0x5744ef[_0x22b569(0x8c9)];if(_0x4cd812===_0x22b569(0x7cc))return _0x5744ef[_0x22b569(0x554)];if(_0x4cd812===_0x22b569(0x63b))return _0x5744ef[_0x22b569(0x8c4)];if(_0x4cd812===_0x22b569(0x39e))return _0x5744ef[_0x22b569(0x157)];if(_0x4cd812===_0x22b569(0x6ff))return _0x5744ef[_0x22b569(0x4ed)];if(_0x4cd812===_0x22b569(0x329))return _0x5744ef['IconSParam0'];if(_0x4cd812===_0x22b569(0x1a0))return _0x5744ef[_0x22b569(0x3bc)];if(_0x4cd812==='REC')return _0x5744ef[_0x22b569(0x487)];if(_0x4cd812===_0x22b569(0x59c))return _0x5744ef[_0x22b569(0x958)];if(_0x4cd812===_0x22b569(0x3d3))return _0x5744ef[_0x22b569(0x742)];if(_0x4cd812===_0x22b569(0x20c))return _0x5744ef[_0x22b569(0x3b7)];if(_0x4cd812===_0x22b569(0x72d))return _0x5744ef[_0x22b569(0x205)];if(_0x4cd812==='MDR')return _0x5744ef[_0x22b569(0x485)];if(_0x4cd812==='FDR')return _0x5744ef[_0x22b569(0x580)];if(_0x4cd812===_0x22b569(0x37a))return _0x5744ef[_0x22b569(0x922)];if(VisuMZ[_0x22b569(0x9cf)][_0x22b569(0x463)][_0x4cd812])return VisuMZ[_0x22b569(0x9cf)][_0x22b569(0x463)][_0x4cd812]||0x0;return 0x0;},VisuMZ[_0x161145(0x579)]=function(_0x4eda23,_0xf9f630,_0x6e8d2f){const _0x1c2588=_0x161145;if(_0x6e8d2f===undefined&&_0x4eda23%0x1===0x0)return _0x4eda23;if(_0x6e8d2f!==undefined&&[_0x1c2588(0x419),_0x1c2588(0x4e3),_0x1c2588(0x888),'DEF','MAT',_0x1c2588(0x31f),_0x1c2588(0x6be),_0x1c2588(0x5db)][_0x1c2588(0x219)](String(_0x6e8d2f)['toUpperCase']()[_0x1c2588(0x753)]()))return _0x4eda23;_0xf9f630=_0xf9f630||0x0;if(VisuMZ['CoreEngine'][_0x1c2588(0x84c)][_0x6e8d2f]){if(VisuMZ[_0x1c2588(0x9cf)][_0x1c2588(0x360)][_0x6e8d2f]===_0x1c2588(0x832)){if(_0x1c2588(0x3a9)===_0x1c2588(0x3a9))return _0x4eda23;else this[_0x1c2588(0x4fb)](...arguments);}else{if(_0x1c2588(0x6ab)===_0x1c2588(0x6ab))return String((_0x4eda23*0x64)[_0x1c2588(0x8f5)](_0xf9f630))+'%';else{var _0x3cda18=_0x1bdf00(_0x1c2588(0x7c2))[_0x1c2588(0x651)][_0x1c2588(0x65c)]();_0x54f854[_0x1c2588(0x8fe)]();if(_0x463379)_0x539bee(_0x3cda18[_0x1c2588(0x556)][_0x1c2588(0x68f)](_0x3cda18),0x190);}}}return String((_0x4eda23*0x64)[_0x1c2588(0x8f5)](_0xf9f630))+'%';},VisuMZ[_0x161145(0x3e0)]=function(_0x201ef0){const _0x1c5798=_0x161145;_0x201ef0=String(_0x201ef0);if(!_0x201ef0)return _0x201ef0;if(typeof _0x201ef0!==_0x1c5798(0x4db))return _0x201ef0;const _0x3319c2=VisuMZ[_0x1c5798(0x9cf)]['Settings'][_0x1c5798(0x678)]['DigitGroupingLocale']||_0x1c5798(0x4fa),_0x1c7350={'maximumFractionDigits':0x6};_0x201ef0=_0x201ef0[_0x1c5798(0x98a)](/\[(.*?)\]/g,(_0x5de5a8,_0xdfe2a7)=>{const _0x3e9a02=_0x1c5798;if(_0x3e9a02(0x9bf)===_0x3e9a02(0x9bf))return VisuMZ[_0x3e9a02(0x25b)](_0xdfe2a7,'[',']');else _0x29c6c7[_0x3e9a02(0x9cf)]['loadMapData'](_0x4a9a2f);}),_0x201ef0=_0x201ef0[_0x1c5798(0x98a)](/<(.*?)>/g,(_0x36ca63,_0x160a46)=>{const _0x1fc26d=_0x1c5798;return'fkFtG'===_0x1fc26d(0x90a)?_0x337ed7[_0x1fc26d(0x97c)]()>=0x1:VisuMZ[_0x1fc26d(0x25b)](_0x160a46,'<','>');}),_0x201ef0=_0x201ef0['replace'](/\{\{(.*?)\}\}/g,(_0x98be15,_0x3c5711)=>{return VisuMZ['PreserveNumbers'](_0x3c5711,'','');}),_0x201ef0=_0x201ef0[_0x1c5798(0x98a)](/(\d+\.?\d*)/g,(_0x1834b8,_0x2fa034)=>{const _0x3f558b=_0x1c5798;if(_0x3f558b(0x524)===_0x3f558b(0x374))this['cursorPageup']();else{let _0x116231=_0x2fa034;if(_0x116231[0x0]==='0')return _0x116231;if(_0x116231[_0x116231[_0x3f558b(0x300)]-0x1]==='.')return Number(_0x116231)[_0x3f558b(0x7ae)](_0x3319c2,_0x1c7350)+'.';else{if(_0x116231[_0x116231[_0x3f558b(0x300)]-0x1]===',')return Number(_0x116231)[_0x3f558b(0x7ae)](_0x3319c2,_0x1c7350)+',';else{if('ZroPJ'!==_0x3f558b(0x660))return Number(_0x116231)[_0x3f558b(0x7ae)](_0x3319c2,_0x1c7350);else _0x4cdff7[_0x3f558b(0x2d7)]['update'][_0x3f558b(0x40b)](this),this['updateOpacity'](),this[_0x3f558b(0x5d3)]();}}}});let _0x131af9=0x3;while(_0x131af9--){_0x201ef0=VisuMZ[_0x1c5798(0x58e)](_0x201ef0);}return _0x201ef0;},VisuMZ['PreserveNumbers']=function(_0x16136c,_0x3e1c13,_0x4252c6){const _0x5a00be=_0x161145;return _0x16136c=_0x16136c[_0x5a00be(0x98a)](/(\d)/gi,(_0x39a11d,_0x41b85e)=>_0x5a00be(0x484)[_0x5a00be(0x229)](Number(_0x41b85e))),'%2%1%3'[_0x5a00be(0x229)](_0x16136c,_0x3e1c13,_0x4252c6);},VisuMZ[_0x161145(0x58e)]=function(_0x5d496b){const _0x436bcd=_0x161145;return _0x5d496b=_0x5d496b[_0x436bcd(0x98a)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x24b215,_0x20a54a)=>Number(parseInt(_0x20a54a))),_0x5d496b;},VisuMZ[_0x161145(0x688)]=function(_0x3c7b0f){const _0xad220e=_0x161145;SoundManager[_0xad220e(0x3c6)]();if(!Utils[_0xad220e(0x1c7)]()){const _0x304dd8=window[_0xad220e(0x1a6)](_0x3c7b0f,'_blank');}else{const _0x37fc3b=process['platform']==_0xad220e(0x78a)?_0xad220e(0x1a6):process['platform']==_0xad220e(0x250)?'start':_0xad220e(0x551);require(_0xad220e(0x913))[_0xad220e(0x6d1)](_0x37fc3b+'\x20'+_0x3c7b0f);}},VisuMZ['createKeyJS']=function(_0x5b1c31,_0x469d1e){const _0x4b25a2=_0x161145;if(!_0x5b1c31)return'';const _0x37173b=_0x5b1c31[_0x4b25a2(0x6a1)]||_0x5b1c31['id'];let _0x38aba9='';return _0x5b1c31[_0x4b25a2(0x8d6)]!==undefined&&_0x5b1c31[_0x4b25a2(0x165)]!==undefined&&(_0x38aba9='Actor-%1-%2'['format'](_0x37173b,_0x469d1e)),_0x5b1c31[_0x4b25a2(0x833)]!==undefined&&_0x5b1c31[_0x4b25a2(0x66e)]!==undefined&&(_0x4b25a2(0x63a)===_0x4b25a2(0x8ce)?(_0x3f76c8[_0x4b25a2(0x9cf)][_0x4b25a2(0x7f9)][_0x4b25a2(0x40b)](this,_0x2187c3,_0x36a3e6,_0x18e735,_0x236e98,_0x179285),this[_0x4b25a2(0x2e9)]()):_0x38aba9=_0x4b25a2(0x5d5)['format'](_0x37173b,_0x469d1e)),_0x5b1c31[_0x4b25a2(0x326)]!==undefined&&_0x5b1c31[_0x4b25a2(0x282)]!==undefined&&(_0x4b25a2(0x335)!==_0x4b25a2(0x335)?_0x2c5932[_0x4b25a2(0x3c6)]():_0x38aba9=_0x4b25a2(0x211)[_0x4b25a2(0x229)](_0x37173b,_0x469d1e)),_0x5b1c31[_0x4b25a2(0x2c0)]!==undefined&&_0x5b1c31['consumable']!==undefined&&('oRJdF'!==_0x4b25a2(0x36c)?_0x38aba9='Item-%1-%2'[_0x4b25a2(0x229)](_0x37173b,_0x469d1e):this[_0x4b25a2(0x557)]()),_0x5b1c31[_0x4b25a2(0x649)]!==undefined&&_0x5b1c31[_0x4b25a2(0x70f)]===0x1&&(_0x4b25a2(0x5ae)!==_0x4b25a2(0x5ae)?this['_inputString']=_0x48feb3:_0x38aba9='Weapon-%1-%2'[_0x4b25a2(0x229)](_0x37173b,_0x469d1e)),_0x5b1c31[_0x4b25a2(0x1e4)]!==undefined&&_0x5b1c31[_0x4b25a2(0x70f)]>0x1&&('UMzdl'===_0x4b25a2(0x4d0)?_0x38aba9=_0x4b25a2(0x5fc)[_0x4b25a2(0x229)](_0x37173b,_0x469d1e):this[_0x4b25a2(0x8c1)](_0x3afa49,_0x37debe,_0x7d3aa5,_0x501531,_0x16186a)),_0x5b1c31[_0x4b25a2(0x1c9)]!==undefined&&_0x5b1c31['battlerHue']!==undefined&&('ShRdo'===_0x4b25a2(0x3c8)?_0x38aba9=_0x4b25a2(0x877)['format'](_0x37173b,_0x469d1e):_0x2c2c4a='Actor-%1-%2'[_0x4b25a2(0x229)](_0x5b55cc,_0x168670)),_0x5b1c31['autoRemovalTiming']!==undefined&&_0x5b1c31[_0x4b25a2(0x36d)]!==undefined&&(_0x38aba9=_0x4b25a2(0x6b1)[_0x4b25a2(0x229)](_0x37173b,_0x469d1e)),_0x38aba9;},Game_Picture[_0x161145(0x2d7)]['anchor']=function(){const _0x306e6a=_0x161145;return this[_0x306e6a(0x5a1)];},VisuMZ[_0x161145(0x9cf)][_0x161145(0x67c)]=Game_Picture[_0x161145(0x2d7)][_0x161145(0x69c)],Game_Picture['prototype'][_0x161145(0x69c)]=function(){const _0x11357a=_0x161145;VisuMZ['CoreEngine'][_0x11357a(0x67c)]['call'](this),this[_0x11357a(0x5a1)]={'x':0x0,'y':0x0},this[_0x11357a(0x417)]={'x':0x0,'y':0x0};},VisuMZ[_0x161145(0x9cf)][_0x161145(0x603)]=Game_Picture[_0x161145(0x2d7)]['updateMove'],Game_Picture['prototype']['updateMove']=function(){const _0x2fdb0d=_0x161145;this['updateAnchor']();const _0x4ded46=this[_0x2fdb0d(0x662)];VisuMZ[_0x2fdb0d(0x9cf)]['Game_Picture_updateMove'][_0x2fdb0d(0x40b)](this);if(_0x4ded46>0x0&&this[_0x2fdb0d(0x662)]<=0x0){if(_0x2fdb0d(0x5ee)!=='VLytB'){this[_0x2fdb0d(0x915)]();const _0x1686df=this[_0x2fdb0d(0x662)];_0x2ea783[_0x2fdb0d(0x9cf)][_0x2fdb0d(0x603)][_0x2fdb0d(0x40b)](this),_0x1686df>0x0&&this[_0x2fdb0d(0x662)]<=0x0&&(this['_x']=this['_targetX'],this['_y']=this[_0x2fdb0d(0x5ed)],this[_0x2fdb0d(0x656)]=this[_0x2fdb0d(0x47d)],this[_0x2fdb0d(0x6c8)]=this['_targetScaleY'],this['_opacity']=this[_0x2fdb0d(0x5fa)],this['_anchor']&&(this[_0x2fdb0d(0x5a1)]['x']=this['_targetAnchor']['x'],this[_0x2fdb0d(0x5a1)]['y']=this['_targetAnchor']['y']));}else{this['_x']=this[_0x2fdb0d(0x4a9)],this['_y']=this[_0x2fdb0d(0x5ed)],this['_scaleX']=this[_0x2fdb0d(0x47d)],this[_0x2fdb0d(0x6c8)]=this[_0x2fdb0d(0x41f)],this[_0x2fdb0d(0x3b8)]=this['_targetOpacity'];if(this[_0x2fdb0d(0x5a1)]){if(_0x2fdb0d(0x3e1)!==_0x2fdb0d(0x3e1)){const _0x4fd17a=_0x32116b[_0x2fdb0d(0x3cc)]((_0x1f3e2c-_0x3e854e)/_0x4c08fc,_0x4d8553||_0x2fdb0d(0x21f)),_0x2f4f50=_0x4dd5a8[_0x2fdb0d(0x3cc)]((_0x2a7d69-_0x1ff663+0x1)/_0x432379,_0xd5c0e4||_0x2fdb0d(0x21f)),_0x1635f3=(_0x412734-_0x58f89e*_0x4fd17a)/(0x1-_0x4fd17a);return _0x1635f3+(_0x247c03-_0x1635f3)*_0x2f4f50;}else this[_0x2fdb0d(0x5a1)]['x']=this[_0x2fdb0d(0x417)]['x'],this['_anchor']['y']=this[_0x2fdb0d(0x417)]['y'];}}}},VisuMZ['CoreEngine'][_0x161145(0x64a)]=Game_Picture['prototype']['show'],Game_Picture[_0x161145(0x2d7)]['show']=function(_0x50fc8d,_0x3d03e4,_0x2741b4,_0x390331,_0x3ecaec,_0x34aa8,_0x542541,_0x117c18){const _0xbff3bd=_0x161145;VisuMZ[_0xbff3bd(0x9cf)]['Game_Picture_show']['call'](this,_0x50fc8d,_0x3d03e4,_0x2741b4,_0x390331,_0x3ecaec,_0x34aa8,_0x542541,_0x117c18),this[_0xbff3bd(0x5d0)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3d03e4]||{'x':0x0,'y':0x0});},VisuMZ[_0x161145(0x9cf)]['Game_Picture_move']=Game_Picture[_0x161145(0x2d7)][_0x161145(0x895)],Game_Picture[_0x161145(0x2d7)][_0x161145(0x895)]=function(_0x29f64a,_0x592e31,_0x101484,_0x44aaf5,_0x4ee720,_0xa39f84,_0x2c18f1,_0x588430,_0x24c358){const _0x340571=_0x161145;VisuMZ[_0x340571(0x9cf)][_0x340571(0x7d6)]['call'](this,_0x29f64a,_0x592e31,_0x101484,_0x44aaf5,_0x4ee720,_0xa39f84,_0x2c18f1,_0x588430,_0x24c358),this[_0x340571(0x51d)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x29f64a]||{'x':0x0,'y':0x0});},Game_Picture['prototype']['updateAnchor']=function(){const _0x55c77d=_0x161145;this[_0x55c77d(0x662)]>0x0&&(this[_0x55c77d(0x5a1)]['x']=this[_0x55c77d(0x95e)](this[_0x55c77d(0x5a1)]['x'],this['_targetAnchor']['x']),this['_anchor']['y']=this[_0x55c77d(0x95e)](this[_0x55c77d(0x5a1)]['y'],this[_0x55c77d(0x417)]['y']));},Game_Picture[_0x161145(0x2d7)][_0x161145(0x5d0)]=function(_0x5568bd){const _0x43b76b=_0x161145;this[_0x43b76b(0x5a1)]=_0x5568bd,this[_0x43b76b(0x417)]=JsonEx[_0x43b76b(0x35a)](this[_0x43b76b(0x5a1)]);},Game_Picture[_0x161145(0x2d7)][_0x161145(0x51d)]=function(_0x359c7f){this['_targetAnchor']=_0x359c7f;},VisuMZ[_0x161145(0x9cf)]['Sprite_Picture_updateOrigin']=Sprite_Picture[_0x161145(0x2d7)][_0x161145(0x1f0)],Sprite_Picture[_0x161145(0x2d7)][_0x161145(0x1f0)]=function(){const _0x3983c0=_0x161145,_0x5b0a65=this[_0x3983c0(0x99f)]();!_0x5b0a65[_0x3983c0(0x372)]()?VisuMZ['CoreEngine'][_0x3983c0(0x787)][_0x3983c0(0x40b)](this):(this['anchor']['x']=_0x5b0a65['anchor']()['x'],this[_0x3983c0(0x372)]['y']=_0x5b0a65['anchor']()['y']);},Game_Action[_0x161145(0x2d7)][_0x161145(0x76f)]=function(_0x5861c4){const _0x5c14e5=_0x161145;if(_0x5861c4){if(_0x5c14e5(0x804)!==_0x5c14e5(0x804)){var _0x2a1a4d=_0x2f8eb5(_0x1467e4['$1']);_0x258c00+=_0x2a1a4d;}else{const _0x2c9c07=_0x5861c4['skillId'];if(_0x2c9c07===0x1&&this['subject']()['attackSkillId']()!==0x1)this[_0x5c14e5(0x343)]();else _0x2c9c07===0x2&&this['subject']()[_0x5c14e5(0x5eb)]()!==0x2?this[_0x5c14e5(0x842)]():this[_0x5c14e5(0x84d)](_0x2c9c07);}}else this[_0x5c14e5(0x557)]();},Game_Actor[_0x161145(0x2d7)][_0x161145(0x93d)]=function(){const _0x2e267a=_0x161145;return this[_0x2e267a(0x5a2)]()[_0x2e267a(0x1a8)](_0xb9ecf1=>this[_0x2e267a(0x54c)](_0xb9ecf1)&&this['skillTypes']()['includes'](_0xb9ecf1[_0x2e267a(0x326)]));},Window_Base[_0x161145(0x2d7)]['createDimmerSprite']=function(){const _0x5c4074=_0x161145;this[_0x5c4074(0x8ff)]=new Sprite(),this[_0x5c4074(0x8ff)]['bitmap']=new Bitmap(0x0,0x0),this[_0x5c4074(0x8ff)]['x']=0x0,this[_0x5c4074(0x423)](this[_0x5c4074(0x8ff)]);},Window_Base[_0x161145(0x2d7)]['refreshDimmerBitmap']=function(){const _0x218611=_0x161145;if(this[_0x218611(0x8ff)]){const _0x509911=this[_0x218611(0x8ff)][_0x218611(0x436)],_0x2f642a=this[_0x218611(0x3ea)],_0x37d9c3=this[_0x218611(0x46b)],_0x25a458=this[_0x218611(0x220)],_0x59bebb=ColorManager[_0x218611(0x3df)](),_0x5875cb=ColorManager['dimColor2']();_0x509911[_0x218611(0x52a)](_0x2f642a,_0x37d9c3),_0x509911[_0x218611(0x897)](0x0,0x0,_0x2f642a,_0x25a458,_0x5875cb,_0x59bebb,!![]),_0x509911[_0x218611(0x7b7)](0x0,_0x25a458,_0x2f642a,_0x37d9c3-_0x25a458*0x2,_0x59bebb),_0x509911['gradientFillRect'](0x0,_0x37d9c3-_0x25a458,_0x2f642a,_0x25a458,_0x59bebb,_0x5875cb,!![]),this[_0x218611(0x8ff)]['setFrame'](0x0,0x0,_0x2f642a,_0x37d9c3);}},Game_Actor[_0x161145(0x2d7)]['makeAutoBattleActions']=function(){const _0x4d5ff5=_0x161145;for(let _0x2395be=0x0;_0x2395be<this['numActions']();_0x2395be++){const _0x2feb75=this[_0x4d5ff5(0x8fc)]();let _0x22321b=Number[_0x4d5ff5(0x2ab)];this[_0x4d5ff5(0x30b)](_0x2395be,_0x2feb75[0x0]);for(const _0x1eba7c of _0x2feb75){const _0x476edc=_0x1eba7c[_0x4d5ff5(0x696)]();_0x476edc>_0x22321b&&(_0x22321b=_0x476edc,this['setAction'](_0x2395be,_0x1eba7c));}}this[_0x4d5ff5(0x5e9)](_0x4d5ff5(0x8f6));},Window_BattleItem[_0x161145(0x2d7)][_0x161145(0x849)]=function(_0x56cec3){const _0x466887=_0x161145;if(BattleManager[_0x466887(0x34c)]()){if('mToDC'==='XYCEN'){if(!_0x29e1ba[_0x466887(0x1ca)]())return;if(!_0x220d51['isNwjs']())return;if(!_0x3acd49[_0x466887(0x38b)]())return;_0x13efe6[_0x466887(0x767)](_0x5580bc,_0x1b1c98);const _0x545d2a=_0x466887(0x453)[_0x466887(0x229)](_0xc9b0f4['_troopId']['padZero'](0x4)),_0x1eb5f3=_0xd37247[_0x466887(0x9cf)][_0x466887(0x553)](_0x583add[_0x466887(0x3e2)]);_0x5489a2['CoreEngine'][_0x466887(0x37e)](_0x1eb5f3,_0x545d2a,!![]);}else return BattleManager[_0x466887(0x34c)]()[_0x466887(0x54c)](_0x56cec3);}else return'IsNLx'!==_0x466887(0x370)?_0x43f349[_0x466887(0x73e)]('pageup',_0x466887(0x21d)):Window_ItemList['prototype']['isEnabled'][_0x466887(0x40b)](this,_0x56cec3);},VisuMZ['CoreEngine'][_0x161145(0x78b)]=Scene_Map[_0x161145(0x2d7)]['createSpriteset'],Scene_Map[_0x161145(0x2d7)]['createSpriteset']=function(){const _0x1754c8=_0x161145;VisuMZ[_0x1754c8(0x9cf)][_0x1754c8(0x78b)]['call'](this);const _0x49d168=this[_0x1754c8(0x514)][_0x1754c8(0x7cb)];if(_0x49d168)this[_0x1754c8(0x784)](_0x49d168);},VisuMZ[_0x161145(0x9cf)][_0x161145(0x188)]=Scene_Battle[_0x161145(0x2d7)]['createSpriteset'],Scene_Battle[_0x161145(0x2d7)][_0x161145(0x77e)]=function(){const _0x4075b0=_0x161145;VisuMZ[_0x4075b0(0x9cf)][_0x4075b0(0x188)][_0x4075b0(0x40b)](this);const _0x4546bb=this[_0x4075b0(0x514)]['_timerSprite'];if(_0x4546bb)this[_0x4075b0(0x784)](_0x4546bb);},Sprite_Actor[_0x161145(0x2d7)]['update']=function(){const _0x5b8b86=_0x161145;Sprite_Battler[_0x5b8b86(0x2d7)][_0x5b8b86(0x361)][_0x5b8b86(0x40b)](this),this[_0x5b8b86(0x3ca)]();if(this[_0x5b8b86(0x426)])this['updateMotion']();else this[_0x5b8b86(0x4cd)]!==''&&(this[_0x5b8b86(0x4cd)]='');},Window[_0x161145(0x2d7)][_0x161145(0x513)]=function(){const _0x20284f=_0x161145,_0x482145=this['_width'],_0x5c0030=this['_height'],_0x440444=0x18,_0x1a2c49=_0x440444/0x2,_0x5550a7=0x60+_0x440444,_0x4f275c=0x0+_0x440444;this['_downArrowSprite']['bitmap']=this[_0x20284f(0x60b)],this[_0x20284f(0x18a)]['anchor']['x']=0.5,this['_downArrowSprite']['anchor']['y']=0.5,this[_0x20284f(0x18a)]['setFrame'](_0x5550a7+_0x1a2c49,_0x4f275c+_0x1a2c49+_0x440444,_0x440444,_0x1a2c49),this[_0x20284f(0x18a)][_0x20284f(0x895)](Math[_0x20284f(0x8c8)](_0x482145/0x2),Math[_0x20284f(0x8c8)](_0x5c0030-_0x1a2c49)),this['_upArrowSprite'][_0x20284f(0x436)]=this[_0x20284f(0x60b)],this[_0x20284f(0x646)][_0x20284f(0x372)]['x']=0.5,this['_upArrowSprite']['anchor']['y']=0.5,this[_0x20284f(0x646)]['setFrame'](_0x5550a7+_0x1a2c49,_0x4f275c,_0x440444,_0x1a2c49),this[_0x20284f(0x646)][_0x20284f(0x895)](Math['round'](_0x482145/0x2),Math[_0x20284f(0x8c8)](_0x1a2c49));},Window['prototype'][_0x161145(0x5f2)]=function(){const _0x2a6857=_0x161145,_0x40c461=0x90,_0x56d34c=0x60,_0x29e8fc=0x18;this['_pauseSignSprite'][_0x2a6857(0x436)]=this[_0x2a6857(0x60b)],this[_0x2a6857(0x280)][_0x2a6857(0x372)]['x']=0.5,this[_0x2a6857(0x280)][_0x2a6857(0x372)]['y']=0x1,this['_pauseSignSprite']['move'](Math['round'](this[_0x2a6857(0x720)]/0x2),this[_0x2a6857(0x41c)]),this[_0x2a6857(0x280)][_0x2a6857(0x24b)](_0x40c461,_0x56d34c,_0x29e8fc,_0x29e8fc),this[_0x2a6857(0x280)][_0x2a6857(0x822)]=0xff;},Window[_0x161145(0x2d7)][_0x161145(0x35e)]=function(){const _0x3e6f73=_0x161145,_0x1f687a=this[_0x3e6f73(0x95b)][_0x3e6f73(0x5f7)][_0x3e6f73(0x9c3)](new Point(0x0,0x0)),_0x3124d0=this[_0x3e6f73(0x95b)][_0x3e6f73(0x7f3)];_0x3124d0['x']=_0x1f687a['x']+this[_0x3e6f73(0x667)]['x'],_0x3124d0['y']=_0x1f687a['y']+this[_0x3e6f73(0x667)]['y'],_0x3124d0['width']=Math[_0x3e6f73(0x8e4)](this[_0x3e6f73(0x6ba)]*this[_0x3e6f73(0x430)]['x']),_0x3124d0[_0x3e6f73(0x46b)]=Math[_0x3e6f73(0x8e4)](this['innerHeight']*this[_0x3e6f73(0x430)]['y']);},Window[_0x161145(0x2d7)][_0x161145(0x290)]=function(){const _0x3f15ab=_0x161145,_0x2f071e=this[_0x3f15ab(0x76e)],_0x491f68=Math['max'](0x0,this[_0x3f15ab(0x720)]-_0x2f071e*0x2),_0x3d8fcd=Math['max'](0x0,this[_0x3f15ab(0x41c)]-_0x2f071e*0x2),_0x2272ec=this['_backSprite'],_0x399a7f=_0x2272ec[_0x3f15ab(0x8d2)][0x0];_0x2272ec[_0x3f15ab(0x436)]=this[_0x3f15ab(0x60b)],_0x2272ec['setFrame'](0x0,0x0,0x60,0x60),_0x2272ec['move'](_0x2f071e,_0x2f071e),_0x2272ec[_0x3f15ab(0x430)]['x']=_0x491f68/0x60,_0x2272ec['scale']['y']=_0x3d8fcd/0x60,_0x399a7f[_0x3f15ab(0x436)]=this[_0x3f15ab(0x60b)],_0x399a7f['setFrame'](0x0,0x60,0x60,0x60),_0x399a7f[_0x3f15ab(0x895)](0x0,0x0,_0x491f68,_0x3d8fcd),_0x399a7f[_0x3f15ab(0x430)]['x']=0x1/_0x2272ec[_0x3f15ab(0x430)]['x'],_0x399a7f['scale']['y']=0x1/_0x2272ec[_0x3f15ab(0x430)]['y'],_0x2272ec[_0x3f15ab(0x587)](this[_0x3f15ab(0x7af)]);},Game_Temp[_0x161145(0x2d7)][_0x161145(0x711)]=function(){const _0x378697=_0x161145;this[_0x378697(0x7b1)]=[],this[_0x378697(0x6c5)]=[],this[_0x378697(0x545)]=[],this[_0x378697(0x35d)]=[];},VisuMZ[_0x161145(0x9cf)][_0x161145(0x47b)]=Scene_Base[_0x161145(0x2d7)][_0x161145(0x341)],Scene_Base['prototype'][_0x161145(0x341)]=function(){const _0x51ce1b=_0x161145;if($gameTemp)$gameTemp[_0x51ce1b(0x711)]();VisuMZ[_0x51ce1b(0x9cf)][_0x51ce1b(0x47b)][_0x51ce1b(0x40b)](this);},Bitmap['prototype'][_0x161145(0x809)]=function(_0x4b94a9){const _0x315708=_0x161145,_0x3d6c23=this['context'];_0x3d6c23[_0x315708(0x272)](),_0x3d6c23[_0x315708(0x2a6)]=this['_makeFontNameText']();const _0x480621=_0x3d6c23[_0x315708(0x1ea)](_0x4b94a9)['width'];return _0x3d6c23[_0x315708(0x7ee)](),_0x480621;},Window_Message['prototype']['textWidth']=function(_0x1125a9){const _0x474a11=_0x161145;if(this[_0x474a11(0x89a)]()){if(_0x474a11(0x8fb)!==_0x474a11(0x8fb))this[_0x474a11(0x89b)](_0x474a11(0x9b3));else return this[_0x474a11(0x469)][_0x474a11(0x809)](_0x1125a9);}else{if('dnURn'!=='dnURn')this['_pictureContainer'][_0x474a11(0x430)]['x']=0x1/this['scale']['x'],this[_0x474a11(0x520)]['x']=-(this['x']/this[_0x474a11(0x430)]['x']);else return Window_Base['prototype'][_0x474a11(0x607)][_0x474a11(0x40b)](this,_0x1125a9);}},Window_Message['prototype'][_0x161145(0x89a)]=function(){const _0x509d79=_0x161145;return VisuMZ[_0x509d79(0x9cf)][_0x509d79(0x7a5)][_0x509d79(0x678)][_0x509d79(0x1e8)]??!![];},VisuMZ['CoreEngine'][_0x161145(0x212)]=Game_Action['prototype'][_0x161145(0x274)],Game_Action[_0x161145(0x2d7)][_0x161145(0x274)]=function(){const _0x4115c4=_0x161145;return this[_0x4115c4(0x7b0)]()?VisuMZ[_0x4115c4(0x9cf)][_0x4115c4(0x212)][_0x4115c4(0x40b)](this):0x0;},VisuMZ[_0x161145(0x9cf)][_0x161145(0x574)]=Game_Action['prototype'][_0x161145(0x343)],Game_Action[_0x161145(0x2d7)][_0x161145(0x343)]=function(){const _0xfadb98=_0x161145;if(this['subject']()&&this[_0xfadb98(0x4a8)]()[_0xfadb98(0x3fc)]())VisuMZ[_0xfadb98(0x9cf)][_0xfadb98(0x574)][_0xfadb98(0x40b)](this);else{if(_0xfadb98(0x81d)!==_0xfadb98(0x254))this['clear']();else{let _0x410697=_0x3ae6c3[_0xfadb98(0x1b9)](_0x125a2b['id']);this[_0xfadb98(0x8db)](_0x410697);}}},Sprite_Name[_0x161145(0x2d7)][_0x161145(0x946)]=function(){return 0x24;},Sprite_Name[_0x161145(0x2d7)][_0x161145(0x689)]=function(){const _0x132224=_0x161145,_0xb2189f=this[_0x132224(0x618)](),_0x24312b=this['bitmapWidth'](),_0x1af36d=this['bitmapHeight']();this[_0x132224(0x4de)](),this['bitmap'][_0x132224(0x557)](),this[_0x132224(0x436)][_0x132224(0x769)](_0xb2189f,0x4,0x0,_0x24312b,_0x1af36d,_0x132224(0x6e8));},Bitmap['prototype'][_0x161145(0x769)]=function(_0x4a2c4c,_0x4856a0,_0x30a578,_0x5c4a5f,_0x220bd2,_0x373293){const _0x88f341=_0x161145,_0x183a58=this[_0x88f341(0x8dc)],_0x35bd04=_0x183a58['globalAlpha'];_0x5c4a5f=_0x5c4a5f||0xffffffff;let _0xcbdd2e=_0x4856a0,_0x46c6aa=Math[_0x88f341(0x8c8)](_0x30a578+0x18/0x2+this[_0x88f341(0x324)]*0.35);if(_0x373293==='center'){if(_0x88f341(0x488)!==_0x88f341(0x488)){const _0xf7fc96=_0x32ba30[_0x88f341(0x263)];if(_0xf7fc96===0x1&&this['subject']()[_0x88f341(0x8cb)]()!==0x1)this[_0x88f341(0x343)]();else _0xf7fc96===0x2&&this[_0x88f341(0x4a8)]()[_0x88f341(0x5eb)]()!==0x2?this[_0x88f341(0x842)]():this['setSkill'](_0xf7fc96);}else _0xcbdd2e+=_0x5c4a5f/0x2;}_0x373293===_0x88f341(0x870)&&(_0xcbdd2e+=_0x5c4a5f),_0x183a58[_0x88f341(0x272)](),_0x183a58[_0x88f341(0x2a6)]=this[_0x88f341(0x563)](),_0x183a58[_0x88f341(0x3cb)]=_0x373293,_0x183a58[_0x88f341(0x799)]=_0x88f341(0x865),_0x183a58['globalAlpha']=0x1,this[_0x88f341(0x6b5)](_0x4a2c4c,_0xcbdd2e,_0x46c6aa,_0x5c4a5f),_0x183a58[_0x88f341(0x93c)]=_0x35bd04,this['_drawTextBody'](_0x4a2c4c,_0xcbdd2e,_0x46c6aa,_0x5c4a5f),_0x183a58[_0x88f341(0x7ee)](),this[_0x88f341(0x401)]['update']();},VisuMZ[_0x161145(0x9cf)][_0x161145(0x633)]=BattleManager['checkSubstitute'],BattleManager[_0x161145(0x158)]=function(_0x1f8633){const _0x2ffd9a=_0x161145;if(this[_0x2ffd9a(0x59b)][_0x2ffd9a(0x834)]())return![];return VisuMZ['CoreEngine'][_0x2ffd9a(0x633)][_0x2ffd9a(0x40b)](this,_0x1f8633);},BattleManager['endAction']=function(){const _0x3c4709=_0x161145;if(this[_0x3c4709(0x1fb)])this[_0x3c4709(0x308)][_0x3c4709(0x3be)](this['_subject']);this[_0x3c4709(0x333)]=_0x3c4709(0x1d7),this['_subject']&&this[_0x3c4709(0x1fb)][_0x3c4709(0x227)]()===0x0&&('WyCTQ'!==_0x3c4709(0x44a)?(this[_0x3c4709(0x495)](this[_0x3c4709(0x1fb)]),this['_subject']=null):this[_0x3c4709(0x160)]=(_0x49f013(_0x124b9a['$1'])||0x1)['clamp'](0x1,0xa));},Bitmap[_0x161145(0x2d7)][_0x161145(0x8d9)]=function(){const _0x4a6709=_0x161145;this['_image']=new Image(),this[_0x4a6709(0x6b8)][_0x4a6709(0x990)]=this[_0x4a6709(0x29b)][_0x4a6709(0x68f)](this),this[_0x4a6709(0x6b8)][_0x4a6709(0x887)]=this[_0x4a6709(0x435)][_0x4a6709(0x68f)](this),this[_0x4a6709(0x387)](),this[_0x4a6709(0x30a)]=_0x4a6709(0x5b7),Utils[_0x4a6709(0x980)]()?this['_startDecrypting']():(this[_0x4a6709(0x6b8)][_0x4a6709(0x97a)]=this[_0x4a6709(0x845)],![]&&this['_image'][_0x4a6709(0x3ea)]>0x0&&(this[_0x4a6709(0x6b8)][_0x4a6709(0x990)]=null,this[_0x4a6709(0x29b)]()));};