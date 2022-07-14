//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.66;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.66] [CoreEngine]
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
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
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
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
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
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
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
 * Default: 8
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

const _0x41d84b=_0x17c6;function _0x17c6(_0x586b05,_0x1d1613){const _0x4ce958=_0x4ce9();return _0x17c6=function(_0x17c6b8,_0x5ea4b0){_0x17c6b8=_0x17c6b8-0xd6;let _0x214d41=_0x4ce958[_0x17c6b8];return _0x214d41;},_0x17c6(_0x586b05,_0x1d1613);}(function(_0x28d33a,_0x4d8f92){const _0x160a9a=_0x17c6,_0x34d9c8=_0x28d33a();while(!![]){try{const _0x4cd145=-parseInt(_0x160a9a(0x261))/0x1+parseInt(_0x160a9a(0x6bd))/0x2*(parseInt(_0x160a9a(0x18a))/0x3)+-parseInt(_0x160a9a(0x130))/0x4*(parseInt(_0x160a9a(0x735))/0x5)+-parseInt(_0x160a9a(0x85d))/0x6+-parseInt(_0x160a9a(0x615))/0x7+parseInt(_0x160a9a(0x8ab))/0x8*(parseInt(_0x160a9a(0x47e))/0x9)+-parseInt(_0x160a9a(0x3ae))/0xa*(-parseInt(_0x160a9a(0x45b))/0xb);if(_0x4cd145===_0x4d8f92)break;else _0x34d9c8['push'](_0x34d9c8['shift']());}catch(_0x4faa19){_0x34d9c8['push'](_0x34d9c8['shift']());}}}(_0x4ce9,0x8c7d8));var label=_0x41d84b(0x58f),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x41d84b(0x853)](function(_0x4694cb){const _0x10701b=_0x41d84b;return _0x4694cb['status']&&_0x4694cb[_0x10701b(0x1a9)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x41d84b(0x550)]=VisuMZ[label][_0x41d84b(0x550)]||{},VisuMZ[_0x41d84b(0x6d0)]=function(_0x434e9d,_0x73c50e){const _0x3a3723=_0x41d84b;for(const _0x36d38c in _0x73c50e){if(_0x36d38c[_0x3a3723(0x5a2)](/(.*):(.*)/i)){if(_0x3a3723(0x834)===_0x3a3723(0x834)){const _0x7ec93c=String(RegExp['$1']),_0xe82a9b=String(RegExp['$2'])[_0x3a3723(0x2c0)]()['trim']();let _0xebbdd8,_0x408f48,_0x30e830;switch(_0xe82a9b){case _0x3a3723(0x280):_0xebbdd8=_0x73c50e[_0x36d38c]!==''?Number(_0x73c50e[_0x36d38c]):0x0;break;case _0x3a3723(0x1f6):_0x408f48=_0x73c50e[_0x36d38c]!==''?JSON[_0x3a3723(0x580)](_0x73c50e[_0x36d38c]):[],_0xebbdd8=_0x408f48[_0x3a3723(0x21e)](_0x2d0f38=>Number(_0x2d0f38));break;case'EVAL':_0xebbdd8=_0x73c50e[_0x36d38c]!==''?eval(_0x73c50e[_0x36d38c]):null;break;case _0x3a3723(0x31d):_0x408f48=_0x73c50e[_0x36d38c]!==''?JSON[_0x3a3723(0x580)](_0x73c50e[_0x36d38c]):[],_0xebbdd8=_0x408f48[_0x3a3723(0x21e)](_0x32e821=>eval(_0x32e821));break;case _0x3a3723(0xee):_0xebbdd8=_0x73c50e[_0x36d38c]!==''?JSON['parse'](_0x73c50e[_0x36d38c]):'';break;case _0x3a3723(0x874):_0x408f48=_0x73c50e[_0x36d38c]!==''?JSON[_0x3a3723(0x580)](_0x73c50e[_0x36d38c]):[],_0xebbdd8=_0x408f48[_0x3a3723(0x21e)](_0x21b8d3=>JSON[_0x3a3723(0x580)](_0x21b8d3));break;case _0x3a3723(0x4be):_0xebbdd8=_0x73c50e[_0x36d38c]!==''?new Function(JSON[_0x3a3723(0x580)](_0x73c50e[_0x36d38c])):new Function(_0x3a3723(0x72f));break;case _0x3a3723(0x31a):_0x408f48=_0x73c50e[_0x36d38c]!==''?JSON[_0x3a3723(0x580)](_0x73c50e[_0x36d38c]):[],_0xebbdd8=_0x408f48[_0x3a3723(0x21e)](_0xa64462=>new Function(JSON['parse'](_0xa64462)));break;case _0x3a3723(0x8c5):_0xebbdd8=_0x73c50e[_0x36d38c]!==''?String(_0x73c50e[_0x36d38c]):'';break;case _0x3a3723(0x1ea):_0x408f48=_0x73c50e[_0x36d38c]!==''?JSON[_0x3a3723(0x580)](_0x73c50e[_0x36d38c]):[],_0xebbdd8=_0x408f48[_0x3a3723(0x21e)](_0x421381=>String(_0x421381));break;case _0x3a3723(0x616):_0x30e830=_0x73c50e[_0x36d38c]!==''?JSON[_0x3a3723(0x580)](_0x73c50e[_0x36d38c]):{},_0x434e9d[_0x7ec93c]={},VisuMZ['ConvertParams'](_0x434e9d[_0x7ec93c],_0x30e830);continue;case _0x3a3723(0x684):_0x408f48=_0x73c50e[_0x36d38c]!==''?JSON[_0x3a3723(0x580)](_0x73c50e[_0x36d38c]):[],_0xebbdd8=_0x408f48[_0x3a3723(0x21e)](_0x26165d=>VisuMZ[_0x3a3723(0x6d0)]({},JSON[_0x3a3723(0x580)](_0x26165d)));break;default:continue;}_0x434e9d[_0x7ec93c]=_0xebbdd8;}else{var _0x3cbf0=_0x36c1d5(_0x5c0673['$1']);_0x300eaa+=_0x3cbf0;}}}return _0x434e9d;},VisuMZ['CoreEngine'][_0x41d84b(0x6be)]=SceneManager['exit'],SceneManager['exit']=function(){const _0x38775e=_0x41d84b;VisuMZ[_0x38775e(0x58f)][_0x38775e(0x6be)][_0x38775e(0x212)](this);if(Utils[_0x38775e(0x5a3)]>=_0x38775e(0x901)){if(typeof nw==='object')nw[_0x38775e(0x300)]['quit']();}},(_0x21fc8d=>{const _0x44fbf9=_0x41d84b,_0x4669ba=_0x21fc8d[_0x44fbf9(0x37a)];for(const _0x3d6c88 of dependencies){if(!Imported[_0x3d6c88]){if(_0x44fbf9(0x6f3)!==_0x44fbf9(0x6f3))_0x73db22[_0x44fbf9(0x58f)][_0x44fbf9(0x574)]['call'](this),this[_0x44fbf9(0x264)]();else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x4669ba,_0x3d6c88)),SceneManager[_0x44fbf9(0x80e)]();break;}}}const _0x228786=_0x21fc8d[_0x44fbf9(0x1a9)];if(_0x228786[_0x44fbf9(0x5a2)](/\[Version[ ](.*?)\]/i)){if('ViwEz'===_0x44fbf9(0x46a)){_0x18ad8f[_0x44fbf9(0x58f)]['Scene_Battle_createSpritesetFix'][_0x44fbf9(0x212)](this);const _0x29a40c=this['_spriteset'][_0x44fbf9(0x495)];if(_0x29a40c)this[_0x44fbf9(0x41b)](_0x29a40c);}else{const _0x25af3a=Number(RegExp['$1']);_0x25af3a!==VisuMZ[label][_0x44fbf9(0x3a5)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x44fbf9(0x125)](_0x4669ba,_0x25af3a)),SceneManager[_0x44fbf9(0x80e)]());}}if(_0x228786[_0x44fbf9(0x5a2)](/\[Tier[ ](\d+)\]/i)){const _0x34e005=Number(RegExp['$1']);_0x34e005<tier?_0x44fbf9(0x16a)!==_0x44fbf9(0x32c)?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x4669ba,_0x34e005,tier)),SceneManager['exit']()):this[_0x44fbf9(0x522)]['setBackgroundType'](_0x4f4d03[_0x44fbf9(0x540)][_0x44fbf9(0x36f)]):tier=Math[_0x44fbf9(0x81e)](_0x34e005,tier);}VisuMZ[_0x44fbf9(0x6d0)](VisuMZ[label][_0x44fbf9(0x550)],_0x21fc8d['parameters']);})(pluginData),((()=>{const _0x3057f3=_0x41d84b;if(VisuMZ[_0x3057f3(0x58f)][_0x3057f3(0x550)][_0x3057f3(0x1bb)][_0x3057f3(0x477)]??!![])for(const _0x3b6e04 in $plugins){const _0x27ae25=$plugins[_0x3b6e04];_0x27ae25['name']['match'](/(.*)\/(.*)/i)&&('RQMGo'===_0x3057f3(0x1e9)?_0x27ae25['name']=String(RegExp['$2'][_0x3057f3(0x242)]()):_0x16871e[_0x3057f3(0x88d)]&&(this[_0x3057f3(0x1b0)]='ETB'));}})()),PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],_0x41d84b(0x6bc),_0x1267a2=>{const _0x55e244=_0x41d84b;if(!SceneManager[_0x55e244(0x512)])return;if(!SceneManager[_0x55e244(0x512)]['_spriteset'])return;VisuMZ[_0x55e244(0x6d0)](_0x1267a2,_0x1267a2);const _0x530990=Math[_0x55e244(0x7f6)](_0x1267a2['pointX']),_0x140a8f=Math['round'](_0x1267a2[_0x55e244(0x3f2)]);$gameTemp[_0x55e244(0x452)](_0x530990,_0x140a8f,_0x1267a2[_0x55e244(0x39b)],_0x1267a2['Mirror'],_0x1267a2['Mute']);}),PluginManager[_0x41d84b(0x770)](pluginData['name'],_0x41d84b(0x4b4),_0x1da3fe=>{const _0x2f7041=_0x41d84b;if(!$gameTemp[_0x2f7041(0x190)]())return;const _0x14367d=Input['getLastUsedGamepadType']();navigator[_0x2f7041(0x2c8)]&&navigator[_0x2f7041(0x2c8)]['writeText'](_0x14367d);}),PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],_0x41d84b(0x417),_0x1d03ce=>{const _0x1a316b=_0x41d84b;if(!$gameTemp[_0x1a316b(0x190)]())return;if(!Utils[_0x1a316b(0x66b)]())return;SceneManager[_0x1a316b(0x512)][_0x1a316b(0x307)]=![],VisuMZ['CoreEngine'][_0x1a316b(0x25b)]();}),PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],_0x41d84b(0x47f),_0x2d1fa2=>{const _0x3f1cc2=_0x41d84b;if(!$gameTemp[_0x3f1cc2(0x190)]())return;if(!Utils[_0x3f1cc2(0x66b)]())return;SceneManager[_0x3f1cc2(0x512)]['_active']=![],VisuMZ[_0x3f1cc2(0x58f)]['ExportStrFromAllTroops']();}),PluginManager[_0x41d84b(0x770)](pluginData['name'],_0x41d84b(0x410),_0x3c89cc=>{const _0x58661c=_0x41d84b;if(!$gameTemp[_0x58661c(0x190)]())return;if(!Utils[_0x58661c(0x66b)]())return;if(!$gameMap)return;if($gameMap[_0x58661c(0x763)]()<=0x0)return;VisuMZ[_0x58661c(0x6d0)](_0x3c89cc,_0x3c89cc);const _0x3a98c5='Map%1'[_0x58661c(0x125)]($gameMap['mapId']()[_0x58661c(0x1ed)](0x3)),_0x54bdb0=VisuMZ[_0x58661c(0x58f)][_0x58661c(0x474)]($gameMap[_0x58661c(0x763)]());VisuMZ[_0x58661c(0x58f)]['ExportString'](_0x54bdb0,_0x3a98c5,!![]);}),PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],_0x41d84b(0x668),_0x367844=>{const _0x95c049=_0x41d84b;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x95c049(0x66b)]())return;if(!$gameParty[_0x95c049(0x194)]())return;VisuMZ['ConvertParams'](_0x367844,_0x367844);const _0x4f7093=_0x95c049(0x2b7)['format']($gameTroop[_0x95c049(0x579)][_0x95c049(0x1ed)](0x4)),_0x51ef82=VisuMZ[_0x95c049(0x58f)][_0x95c049(0x623)]($gameTroop[_0x95c049(0x579)]);VisuMZ[_0x95c049(0x58f)][_0x95c049(0x8d4)](_0x51ef82,_0x4f7093,!![]);}),VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x8d4)]=function(_0x2422a2,_0x48f640,_0x245d2a){const _0x205ef6=_0x41d84b,_0x102ca1=require('fs');let _0x45505e=_0x205ef6(0x6e2)['format'](_0x48f640||'0');_0x102ca1['writeFile'](_0x45505e,_0x2422a2,_0x80897e=>{const _0x39c825=_0x205ef6;if(_0x80897e){if(_0x39c825(0x22a)===_0x39c825(0x22a))throw err;else this[_0x39c825(0x199)](_0x152f74[_0x39c825(0x868)]()[_0x39c825(0x37a)],_0x4bbdf7,_0x33053c,_0xbf3c19);}else _0x245d2a&&('vUpsb'===_0x39c825(0x6a8)?alert(_0x39c825(0x5f9)[_0x39c825(0x125)](_0x45505e)):_0x1430b9+=_0x39c825(0x2e7));});},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x25b)]=function(){const _0x3a6ba0=_0x41d84b,_0x3ca347=[];for(const _0x45ef8c of $dataMapInfos){if(!_0x45ef8c)continue;_0x3ca347[_0x3a6ba0(0x3dd)](_0x45ef8c['id']);}const _0x53569f=_0x3ca347[_0x3a6ba0(0x669)]*0x64+Math[_0x3a6ba0(0x737)](0x64);alert(_0x3a6ba0(0x175)[_0x3a6ba0(0x125)](_0x53569f)),this[_0x3a6ba0(0x348)]=[],this['_currentMap']=$dataMap;for(const _0x3cab55 of _0x3ca347){VisuMZ[_0x3a6ba0(0x58f)]['loadMapData'](_0x3cab55);}setTimeout(VisuMZ[_0x3a6ba0(0x58f)][_0x3a6ba0(0x6e7)][_0x3a6ba0(0x44f)](this),_0x53569f);},VisuMZ['CoreEngine'][_0x41d84b(0x8bd)]=function(_0x11323a){const _0x41082a=_0x41d84b,_0x15dc19=_0x41082a(0x1ba)[_0x41082a(0x125)](_0x11323a[_0x41082a(0x1ed)](0x3)),_0x463a82=new XMLHttpRequest(),_0x4c50ab=_0x41082a(0x713)+_0x15dc19;_0x463a82[_0x41082a(0x22d)](_0x41082a(0x514),_0x4c50ab),_0x463a82[_0x41082a(0x5e5)](_0x41082a(0x136)),_0x463a82[_0x41082a(0x858)]=()=>this[_0x41082a(0x556)](_0x463a82,_0x11323a,_0x15dc19,_0x4c50ab),_0x463a82[_0x41082a(0x604)]=()=>DataManager[_0x41082a(0x1d5)](_0x41082a(0x330),_0x15dc19,_0x4c50ab),_0x463a82[_0x41082a(0x291)]();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x556)]=function(_0x4541e0,_0x1bb340,_0x280543,_0x3b95b6){const _0x57b89c=_0x41d84b;$dataMap=JSON[_0x57b89c(0x580)](_0x4541e0[_0x57b89c(0x7df)]),DataManager[_0x57b89c(0x6bb)]($dataMap),this[_0x57b89c(0x348)][_0x1bb340]=VisuMZ[_0x57b89c(0x58f)][_0x57b89c(0x474)](_0x1bb340),$dataMap=this[_0x57b89c(0x4f0)];},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x6e7)]=function(){const _0x2502b4=_0x41d84b,_0x2722de=_0x2502b4(0x79b);this[_0x2502b4(0x348)]['remove'](undefined)['remove']('')[_0x2502b4(0x2bc)](null);const _0x2004f7=this['_storedMapText'][_0x2502b4(0x205)]('\x0a\x0a\x0a\x0a\x0a')['trim']();VisuMZ[_0x2502b4(0x58f)]['ExportString'](_0x2004f7,_0x2722de,!![]),SceneManager['_scene'][_0x2502b4(0x307)]=!![];},VisuMZ['CoreEngine'][_0x41d84b(0x474)]=function(_0x4f4d7e){const _0x564eb3=_0x41d84b;if(!$dataMap)return'';let _0x24e418='█'['repeat'](0x46)+'\x0a\x0a',_0x5d74ed='═'[_0x564eb3(0x76d)](0x46)+'\x0a\x0a',_0x49c1e7='';this[_0x564eb3(0x34e)]=0x0;for(const _0x38d967 of $dataMap[_0x564eb3(0x225)]){if(!_0x38d967)continue;let _0x4b6cf5=_0x38d967['id'],_0x4cc8b7=_0x38d967[_0x564eb3(0x37a)],_0x443369=_0x38d967['pages'];for(const _0x37a1ac of _0x443369){if('WrBIq'===_0x564eb3(0x3e4)){const _0x3e0738=_0x443369[_0x564eb3(0x272)](_0x37a1ac)+0x1;let _0x1f7c7f=_0x5d74ed+_0x564eb3(0x152),_0xab2398=VisuMZ[_0x564eb3(0x58f)][_0x564eb3(0x29e)](_0x37a1ac[_0x564eb3(0x3b8)]);if(_0xab2398[_0x564eb3(0x669)]>0x0){if(_0x49c1e7[_0x564eb3(0x669)]>0x0){if(_0x564eb3(0x24f)===_0x564eb3(0x7b8))return _0x2fecdc[_0x564eb3(0x354)](_0x3e9a7a['CoreEngine']['Bitmap_measureTextWidth'][_0x564eb3(0x212)](this,_0x9a950e));else _0x49c1e7+=_0x5d74ed+_0x564eb3(0x817);}else{const _0x39cd52=$dataMapInfos[_0x4f4d7e][_0x564eb3(0x37a)];_0x49c1e7+=_0x24e418+_0x564eb3(0x1e6)['format'](_0x4f4d7e,_0x39cd52||_0x564eb3(0x17d))+_0x24e418;}_0x49c1e7+=_0x1f7c7f[_0x564eb3(0x125)](_0x4b6cf5,_0x4cc8b7,_0x3e0738,_0xab2398);}}else this[_0x564eb3(0x275)]=_0x56e3e;}}return _0x49c1e7[_0x564eb3(0x669)]>0x0&&(_0x49c1e7+=_0x5d74ed),_0x49c1e7;},VisuMZ[_0x41d84b(0x58f)]['ExportStrFromAllTroops']=function(){const _0xaa652a=_0x41d84b,_0x5b288c=$dataTroops[_0xaa652a(0x669)]*0xa+Math[_0xaa652a(0x737)](0xa);alert('Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0xaa652a(0x125)](_0x5b288c));const _0x165301=[];for(const _0x307d91 of $dataTroops){if(!_0x307d91)continue;const _0x569750=_0x307d91['id'];_0x165301[_0x569750]=VisuMZ[_0xaa652a(0x58f)]['ExtractStrFromTroop'](_0x569750);}setTimeout(VisuMZ['CoreEngine']['exportAllTroopStrings'][_0xaa652a(0x44f)](this,_0x165301),_0x5b288c);},VisuMZ[_0x41d84b(0x58f)]['ExtractStrFromTroop']=function(_0x4ad103){const _0xea1511=_0x41d84b;if(!$dataTroops[_0x4ad103])return'';let _0x83f835='█'[_0xea1511(0x76d)](0x46)+'\x0a\x0a',_0x1b7496='═'[_0xea1511(0x76d)](0x46)+'\x0a\x0a',_0x1b2fc3='';this['_commonEventLayers']=0x0;const _0x2c52f1=$dataTroops[_0x4ad103];let _0xd7cc7b=_0x2c52f1[_0xea1511(0x8fe)];for(const _0x64ec05 of _0xd7cc7b){const _0x34a68c=_0xd7cc7b['indexOf'](_0x64ec05)+0x1;let _0x42063a=_0x1b7496+_0xea1511(0x6d9),_0x557d85=VisuMZ[_0xea1511(0x58f)][_0xea1511(0x29e)](_0x64ec05[_0xea1511(0x3b8)]);_0x557d85[_0xea1511(0x669)]>0x0&&(_0xea1511(0x73b)!=='fzTts'?this['subject']()&&this['subject']()[_0xea1511(0x780)]()?_0x1f7b4['CoreEngine'][_0xea1511(0x675)][_0xea1511(0x212)](this):this[_0xea1511(0x4df)]():(_0x1b2fc3[_0xea1511(0x669)]>0x0?_0x1b2fc3+=_0x1b7496+_0xea1511(0x817):_0x1b2fc3+=_0x83f835+_0xea1511(0x7f8)[_0xea1511(0x125)](_0x4ad103,_0x2c52f1[_0xea1511(0x37a)]||'Unnamed')+_0x83f835,_0x1b2fc3+=_0x42063a[_0xea1511(0x125)](_0x34a68c,_0x557d85)));}return _0x1b2fc3['length']>0x0&&(_0xea1511(0x8f6)!=='VACCg'?_0x1b2fc3+=_0x1b7496:this[_0xea1511(0x3b0)][_0xea1511(0x1b9)](_0x7b1daf[_0xb4feb5])?_0x2f8535[_0xea1511(0x60e)]():_0x487073[_0xea1511(0x392)]()),_0x1b2fc3;},VisuMZ[_0x41d84b(0x58f)]['exportAllTroopStrings']=function(_0x2c5473){const _0xe7c54a=_0x41d84b,_0x5d0a4e='AllTroops';_0x2c5473[_0xe7c54a(0x2bc)](undefined)[_0xe7c54a(0x2bc)]('')[_0xe7c54a(0x2bc)](null);const _0xf5f3cc=_0x2c5473['join'](_0xe7c54a(0x817))['trim']();VisuMZ[_0xe7c54a(0x58f)][_0xe7c54a(0x8d4)](_0xf5f3cc,_0x5d0a4e,!![]),SceneManager[_0xe7c54a(0x512)][_0xe7c54a(0x307)]=!![];},VisuMZ[_0x41d84b(0x58f)]['ExtractStrFromList']=function(_0x327c93){const _0x2797dd=_0x41d84b;let _0x1e4c8b='\x0a'+'─'[_0x2797dd(0x76d)](0x46)+'\x0a',_0x2d950b='\x0a'+'┄'[_0x2797dd(0x76d)](0x46)+'\x0a',_0x4fff68='';for(const _0x4b8ea6 of _0x327c93){if(!_0x4b8ea6)continue;if(_0x4b8ea6[_0x2797dd(0xec)]===0x65)_0x4fff68+=_0x1e4c8b+'\x0a',_0x4fff68+=_0x2797dd(0x45e),_0x4b8ea6[_0x2797dd(0x543)][0x4]!==''&&_0x4b8ea6[_0x2797dd(0x543)][0x4]!==undefined&&(_0x4fff68+=_0x2797dd(0x30e)['format'](_0x4b8ea6[_0x2797dd(0x543)][0x4]));else{if(_0x4b8ea6['code']===0x191)_0x2797dd(0x828)===_0x2797dd(0x828)?_0x4fff68+=_0x2797dd(0x396)[_0x2797dd(0x125)](_0x4b8ea6['parameters'][0x0]):this[_0x2797dd(0x5c9)][_0x2797dd(0x325)](_0x4e4725[_0x2797dd(0x540)]['ActorBgType']);else{if(_0x4b8ea6[_0x2797dd(0xec)]===0x192)_0x4fff68+=_0x1e4c8b,_0x4fff68+=_0x2797dd(0x62a)['format'](_0x2d950b,_0x4b8ea6[_0x2797dd(0x543)][0x0]+0x1,_0x4b8ea6['parameters'][0x1]);else{if(_0x4b8ea6[_0x2797dd(0xec)]===0x193)_0x4fff68+=_0x1e4c8b,_0x4fff68+=_0x2797dd(0x268)['format'](_0x2d950b);else{if(_0x4b8ea6[_0x2797dd(0xec)]===0x194)_0x4fff68+=_0x1e4c8b,_0x4fff68+='%1〘End\x20Choice\x20Selection〙%1'[_0x2797dd(0x125)](_0x2d950b);else{if(_0x4b8ea6[_0x2797dd(0xec)]===0x69)_0x4fff68+=_0x1e4c8b+'\x0a',_0x4fff68+='〘Scrolling\x20Text〙\x0a';else{if(_0x4b8ea6[_0x2797dd(0xec)]===0x6c)_0x4fff68+=_0x1e4c8b+'\x0a',_0x4fff68+='》Comment《\x0a%1\x0a'[_0x2797dd(0x125)](_0x4b8ea6[_0x2797dd(0x543)][0x0]);else{if(_0x4b8ea6[_0x2797dd(0xec)]===0x198)_0x4fff68+=_0x2797dd(0x396)[_0x2797dd(0x125)](_0x4b8ea6[_0x2797dd(0x543)][0x0]);else{if(_0x4b8ea6[_0x2797dd(0xec)]===0x75){if('nyyzC'!=='nyyzC')_0x82ae96[_0x2797dd(0x32a)]();else{const _0x138530=$dataCommonEvents[_0x4b8ea6[_0x2797dd(0x543)][0x0]];if(_0x138530&&this[_0x2797dd(0x34e)]<=0xa){this['_commonEventLayers']++;let _0x5548f9=VisuMZ[_0x2797dd(0x58f)][_0x2797dd(0x29e)](_0x138530[_0x2797dd(0x3b8)]);_0x5548f9[_0x2797dd(0x669)]>0x0&&(_0x4fff68+=_0x1e4c8b,_0x4fff68+=_0x2d950b,_0x4fff68+=_0x2797dd(0x14e)[_0x2797dd(0x125)](_0x138530['id'],_0x138530[_0x2797dd(0x37a)]),_0x4fff68+=_0x2d950b,_0x4fff68+=_0x5548f9,_0x4fff68+=_0x2d950b,_0x4fff68+=_0x2797dd(0x54e)['format'](_0x138530['id'],_0x138530[_0x2797dd(0x37a)]),_0x4fff68+=_0x2d950b),this[_0x2797dd(0x34e)]--;}}}}}}}}}}}}return _0x4fff68[_0x2797dd(0x669)]>0x0&&(_0x4fff68+=_0x1e4c8b),_0x4fff68;},PluginManager[_0x41d84b(0x770)](pluginData['name'],_0x41d84b(0x40a),_0x1fc1f8=>{const _0x2bd210=_0x41d84b;VisuMZ['ConvertParams'](_0x1fc1f8,_0x1fc1f8);const _0x3d405a=_0x1fc1f8[_0x2bd210(0x15f)];VisuMZ['openURL'](_0x3d405a);}),PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],'GoldChange',_0x1de337=>{const _0x2e5f4c=_0x41d84b;VisuMZ[_0x2e5f4c(0x6d0)](_0x1de337,_0x1de337);const _0x3c5cac=_0x1de337['value']||0x0;$gameParty[_0x2e5f4c(0x52b)](_0x3c5cac);}),PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],'MapOnceParallel',_0x245ff6=>{const _0x1aeff9=_0x41d84b;if(!SceneManager[_0x1aeff9(0x215)]())return;VisuMZ[_0x1aeff9(0x6d0)](_0x245ff6,_0x245ff6);const _0x88558e=_0x245ff6[_0x1aeff9(0x680)];SceneManager[_0x1aeff9(0x512)]['playOnceParallelInterpreter'](_0x88558e);}),PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],'PictureCoordinatesMode',_0x53994e=>{const _0xa66236=_0x41d84b;if(!$gameTemp[_0xa66236(0x190)]())return;if(!Utils['isNwjs']())return;VisuMZ[_0xa66236(0x6d0)](_0x53994e,_0x53994e);const _0x3e447a=_0x53994e[_0xa66236(0x384)]||0x1;$gameTemp['_pictureCoordinatesMode']=_0x3e447a;}),PluginManager[_0x41d84b(0x770)](pluginData['name'],_0x41d84b(0x58a),_0x2a809c=>{const _0x49ebe8=_0x41d84b;VisuMZ[_0x49ebe8(0x6d0)](_0x2a809c,_0x2a809c);const _0x5c630e=_0x2a809c['pictureId']||0x1,_0x3fdeba=_0x2a809c[_0x49ebe8(0x7b1)]||_0x49ebe8(0x1a7),_0x15f464=$gameScreen[_0x49ebe8(0x73c)](_0x5c630e);_0x15f464&&_0x15f464[_0x49ebe8(0x3a3)](_0x3fdeba);}),PluginManager['registerCommand'](pluginData[_0x41d84b(0x37a)],_0x41d84b(0x1d6),_0x391cf5=>{const _0x8dc494=_0x41d84b;for(let _0x370568=0x1;_0x370568<=0x64;_0x370568++){$gameScreen[_0x8dc494(0x4f7)](_0x370568);}}),PluginManager['registerCommand'](pluginData[_0x41d84b(0x37a)],_0x41d84b(0x7ad),_0x217d39=>{const _0x41f3f3=_0x41d84b;VisuMZ[_0x41f3f3(0x6d0)](_0x217d39,_0x217d39);const _0xd04bf=Math[_0x41f3f3(0x50d)](_0x217d39['StartID'],_0x217d39[_0x41f3f3(0x736)]),_0x4a48ff=Math[_0x41f3f3(0x81e)](_0x217d39[_0x41f3f3(0x523)],_0x217d39[_0x41f3f3(0x736)]);for(let _0x306219=_0xd04bf;_0x306219<=_0x4a48ff;_0x306219++){_0x41f3f3(0x594)!=='SUQNI'?$gameScreen[_0x41f3f3(0x4f7)](_0x306219):this[_0x41f3f3(0x61a)](_0x27e078,_0x18f582,_0x7d971,_0x297e4d);}}),PluginManager['registerCommand'](pluginData['name'],_0x41d84b(0x80a),_0x44b0f6=>{const _0x978551=_0x41d84b;VisuMZ[_0x978551(0x6d0)](_0x44b0f6,_0x44b0f6);const _0x24969a=Math[_0x978551(0x7f6)](_0x44b0f6[_0x978551(0x384)])[_0x978551(0x587)](0x1,0x64),_0x3b6482=_0x44b0f6[_0x978551(0x550)],_0x13baaa=_0x3b6482[_0x978551(0x1ff)][_0x978551(0x587)](0x0,0x1),_0xed1932=Math[_0x978551(0x7f6)](_0x3b6482[_0x978551(0x435)]||0x0),_0x371411=Math[_0x978551(0x7f6)](_0x3b6482[_0x978551(0x517)]||0x0),_0x52a81d=Math[_0x978551(0x7f6)](_0x3b6482[_0x978551(0x4c7)]||0x0),_0x48fc53=Math[_0x978551(0x7f6)](_0x3b6482['ScaleY']||0x0),_0x554b3e=Math[_0x978551(0x7f6)](_0x3b6482[_0x978551(0x386)])[_0x978551(0x587)](0x0,0xff),_0x294796=_0x3b6482[_0x978551(0x629)],_0x67246f=_0x978551(0x2cb),_0xa70136=_0x44b0f6[_0x978551(0x82c)]?_0x978551(0x82c):_0x978551(0x4a6),_0x1c3006=_0x67246f[_0x978551(0x125)](_0x44b0f6[_0x978551(0x8cc)],_0xa70136);$gameScreen[_0x978551(0x2e6)](_0x24969a,_0x1c3006,_0x13baaa,_0xed1932,_0x371411,_0x52a81d,_0x48fc53,_0x554b3e,_0x294796);}),PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],_0x41d84b(0x6ca),_0x318340=>{const _0x23248a=_0x41d84b;VisuMZ[_0x23248a(0x6d0)](_0x318340,_0x318340);const _0x2f0c5e=_0x318340['Type']||_0x23248a(0xe3),_0x2aa6c0=_0x318340[_0x23248a(0x63b)][_0x23248a(0x587)](0x1,0x9),_0x540175=_0x318340['Speed'][_0x23248a(0x587)](0x1,0x9),_0x34894b=_0x318340['Duration']||0x1,_0x113805=_0x318340[_0x23248a(0x201)];$gameScreen['setCoreEngineScreenShakeStyle'](_0x2f0c5e),$gameScreen[_0x23248a(0x822)](_0x2aa6c0,_0x540175,_0x34894b);if(_0x113805){const _0x3a3099=$gameTemp['getLastPluginCommandInterpreter']();if(_0x3a3099)_0x3a3099[_0x23248a(0x2be)](_0x34894b);}}),PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],'SwitchRandomizeOne',_0x19df80=>{const _0x488c78=_0x41d84b;if($gameParty[_0x488c78(0x194)]())return;VisuMZ['ConvertParams'](_0x19df80,_0x19df80);const _0x5a757b=_0x19df80[_0x488c78(0x42c)],_0xea30f5=(_0x19df80[_0x488c78(0x2ba)]||0x0)/0x64;for(const _0x2205c1 of _0x5a757b){const _0x55c369=Math[_0x488c78(0xe3)]()<=_0xea30f5;$gameSwitches[_0x488c78(0x353)](_0x2205c1,_0x55c369);}}),PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],_0x41d84b(0x1fa),_0x27810d=>{const _0x188e45=_0x41d84b;if($gameParty[_0x188e45(0x194)]())return;VisuMZ[_0x188e45(0x6d0)](_0x27810d,_0x27810d);const _0x2f82ad=Math['min'](_0x27810d[_0x188e45(0x523)],_0x27810d[_0x188e45(0x736)]),_0x5e91aa=Math[_0x188e45(0x81e)](_0x27810d[_0x188e45(0x523)],_0x27810d[_0x188e45(0x736)]),_0xb58b0e=(_0x27810d['Chance']||0x0)/0x64;for(let _0x533908=_0x2f82ad;_0x533908<=_0x5e91aa;_0x533908++){if(_0x188e45(0x16b)!==_0x188e45(0x7ba)){const _0x3a4aef=Math[_0x188e45(0xe3)]()<=_0xb58b0e;$gameSwitches[_0x188e45(0x353)](_0x533908,_0x3a4aef);}else _0x542b3e+=_0x287235,_0x1156e7+=_0x188e45(0x8b8)['format'](_0x365f2c);}}),PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],'SwitchToggleOne',_0x3bc490=>{const _0xadac78=_0x41d84b;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x3bc490,_0x3bc490);const _0x36e5da=_0x3bc490['IDs'];for(const _0x2653a1 of _0x36e5da){if('cUqqa'===_0xadac78(0x727)){const _0x2b5929=$gameSwitches[_0xadac78(0x3bb)](_0x2653a1);$gameSwitches['setValue'](_0x2653a1,!_0x2b5929);}else{if(this['_coreEngineShakeStyle']===_0x308c56)this['initCoreEngineScreenShake']();return this[_0xadac78(0x6bf)];}}}),PluginManager['registerCommand'](pluginData['name'],_0x41d84b(0x1d4),_0xa14432=>{const _0x280b4a=_0x41d84b;if($gameParty[_0x280b4a(0x194)]())return;VisuMZ[_0x280b4a(0x6d0)](_0xa14432,_0xa14432);const _0xac0c2f=Math[_0x280b4a(0x50d)](_0xa14432[_0x280b4a(0x523)],_0xa14432[_0x280b4a(0x736)]),_0x28bc1b=Math[_0x280b4a(0x81e)](_0xa14432['StartID'],_0xa14432['EndingID']);for(let _0x405cfb=_0xac0c2f;_0x405cfb<=_0x28bc1b;_0x405cfb++){const _0x365543=$gameSwitches[_0x280b4a(0x3bb)](_0x405cfb);$gameSwitches[_0x280b4a(0x353)](_0x405cfb,!_0x365543);}}),PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],_0x41d84b(0x5e7),_0x5aee9c=>{const _0x484374=_0x41d84b;VisuMZ['ConvertParams'](_0x5aee9c,_0x5aee9c);const _0x309187=_0x5aee9c['option']||0x1;$gameSystem[_0x484374(0x4b6)](_0x309187);}),PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],'SystemSetSideView',_0x6a20dc=>{const _0x3da931=_0x41d84b;if($gameParty[_0x3da931(0x194)]())return;VisuMZ[_0x3da931(0x6d0)](_0x6a20dc,_0x6a20dc);const _0x370c77=_0x6a20dc[_0x3da931(0x7a1)];if(_0x370c77[_0x3da931(0x5a2)](/Front/i)){if(_0x3da931(0x606)!=='WmjwY')return _0x5d4864[_0x3da931(0x58f)]['Game_Picture_calcEasing']['call'](this,_0x585e17);else $gameSystem['setSideView'](![]);}else _0x370c77[_0x3da931(0x5a2)](/Side/i)?$gameSystem[_0x3da931(0x3c2)](!![]):$gameSystem[_0x3da931(0x3c2)](!$gameSystem[_0x3da931(0x66e)]());}),PluginManager['registerCommand'](pluginData['name'],_0x41d84b(0x1ae),_0x5eb9c1=>{const _0x1e48b0=_0x41d84b;if($gameParty[_0x1e48b0(0x194)]())return;VisuMZ[_0x1e48b0(0x6d0)](_0x5eb9c1,_0x5eb9c1);const _0x4ee9cf=[_0x1e48b0(0x5d8),'bgs','me','se'];for(const _0x527f96 of _0x4ee9cf){const _0x154606=_0x5eb9c1[_0x527f96],_0x5e336a=_0x1e48b0(0x733)[_0x1e48b0(0x125)](_0x527f96);for(const _0x27c242 of _0x154606){AudioManager[_0x1e48b0(0x50f)](_0x5e336a,_0x27c242);}}}),PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],_0x41d84b(0x27f),_0x15696e=>{const _0x5c556c=_0x41d84b;if($gameParty[_0x5c556c(0x194)]())return;VisuMZ[_0x5c556c(0x6d0)](_0x15696e,_0x15696e);const _0x1de268=[_0x5c556c(0x653),_0x5c556c(0x382),'battlebacks2',_0x5c556c(0x188),_0x5c556c(0x1ee),'faces',_0x5c556c(0x429),_0x5c556c(0x426),'sv_actors',_0x5c556c(0x8c2),'system','tilesets',_0x5c556c(0x57b),'titles2'];for(const _0x7ab43c of _0x1de268){const _0x56de99=_0x15696e[_0x7ab43c],_0x43e7e5='img/%1/'[_0x5c556c(0x125)](_0x7ab43c);for(const _0x2e9038 of _0x56de99){ImageManager[_0x5c556c(0x3fa)](_0x43e7e5,_0x2e9038);}}}),PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],_0x41d84b(0x2d6),_0x829729=>{const _0x38edc8=_0x41d84b;if($gameParty[_0x38edc8(0x194)]())return;VisuMZ[_0x38edc8(0x6d0)](_0x829729,_0x829729);const _0x1b2b3b=_0x829729[_0x38edc8(0x7a1)]['toUpperCase']()[_0x38edc8(0x242)](),_0x422ea5=VisuMZ[_0x38edc8(0x58f)][_0x38edc8(0x4f6)](_0x1b2b3b);$gameSystem[_0x38edc8(0x5c5)](_0x422ea5);}),VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x4f6)]=function(_0x2fb74e){const _0x578341=_0x41d84b;_0x2fb74e=_0x2fb74e||'DATABASE',_0x2fb74e=String(_0x2fb74e)['toUpperCase']()[_0x578341(0x242)]();switch(_0x2fb74e){case _0x578341(0x356):return 0x0;case _0x578341(0x160):Imported[_0x578341(0x56d)]&&(ConfigManager[_0x578341(0x324)]=!![]);return 0x1;case _0x578341(0x81a):if(Imported[_0x578341(0x56d)]){if(_0x578341(0x38d)!=='PkqBx')return 0x0;else ConfigManager[_0x578341(0x324)]=![];}return 0x2;case _0x578341(0x267):if(Imported[_0x578341(0x466)])return'CTB';break;case'STB':if(Imported[_0x578341(0xf7)]){if(_0x578341(0x4af)!=='BkYNa')return _0x578341(0x681);else{let _0x212936=this[_0x578341(0x147)]();this[_0x578341(0x807)]()&&(_0x212936=_0x5c5217[_0x578341(0x636)](_0x212936));const _0x3811e0=this[_0x578341(0x442)]()-0x1,_0x340d39=this[_0x578341(0x551)]?this[_0x578341(0x551)]():this[_0x578341(0x598)]();this[_0x578341(0x3f4)](),this[_0x578341(0x4fd)][_0x578341(0x3e6)](_0x212936,0x0,0x0,_0x3811e0,_0x340d39,_0x578341(0x54b));}}break;case _0x578341(0x467):if(Imported[_0x578341(0x66a)])return'tHkaW'===_0x578341(0x1fb)?_0x578341(0x467):this[_0x578341(0x455)]||this;break;case _0x578341(0x233):if(Imported[_0x578341(0x863)])return'KqHeX'!==_0x578341(0x6f5)?_0x578341(0x233):_0x17976[_0x578341(0x58f)][_0x578341(0x550)][_0x578341(0x664)][_0x578341(0x6c4)];break;case'OTB':if(Imported[_0x578341(0x2e8)]){if(_0x578341(0x4b1)===_0x578341(0x906))_0x379a39[_0x578341(0x872)](),_0x9e3fba[_0x578341(0x3a8)](_0x535b5e),_0x211729[_0x578341(0x58f)][_0x578341(0x1cb)][_0x578341(0x212)](this,_0x589316);else return'OTB';}break;case _0x578341(0x104):if(Imported[_0x578341(0x88d)])return'ETB';break;case _0x578341(0x421):if(Imported[_0x578341(0x533)])return _0x578341(0x421);break;}return $dataSystem[_0x578341(0x248)];},PluginManager[_0x41d84b(0x770)](pluginData[_0x41d84b(0x37a)],_0x41d84b(0x903),_0x41af4b=>{const _0x6b6ff=_0x41d84b;VisuMZ[_0x6b6ff(0x6d0)](_0x41af4b,_0x41af4b);const _0x6ee399=_0x41af4b[_0x6b6ff(0x7a1)]||0x1;$gameSystem[_0x6b6ff(0x82d)](_0x6ee399);}),PluginManager['registerCommand'](pluginData['name'],_0x41d84b(0x877),_0x5d3010=>{const _0x2103dc=_0x41d84b;VisuMZ[_0x2103dc(0x6d0)](_0x5d3010,_0x5d3010);const _0x248c92=_0x5d3010['id']||0x1,_0x4ac7d4=_0x5d3010[_0x2103dc(0x18e)],_0x4b9f7b=_0x5d3010[_0x2103dc(0x4d5)]||0x0;let _0x234867=$gameVariables[_0x2103dc(0x3bb)](_0x248c92)||0x0;switch(_0x4ac7d4){case'=':_0x234867=_0x4b9f7b;break;case'+':_0x234867+=_0x4b9f7b;break;case'-':_0x234867-=_0x4b9f7b;break;case'*':_0x234867*=_0x4b9f7b;break;case'/':_0x234867/=_0x4b9f7b;break;case'%':_0x234867%=_0x4b9f7b;break;}_0x234867=_0x234867||0x0,$gameVariables[_0x2103dc(0x353)](_0x248c92,_0x234867);}),PluginManager['registerCommand'](pluginData['name'],_0x41d84b(0x718),_0x2d9c36=>{const _0x50ad48=_0x41d84b;VisuMZ[_0x50ad48(0x6d0)](_0x2d9c36,_0x2d9c36);const _0x2d36fd=_0x2d9c36['id']()||0x1,_0x52636f=_0x2d9c36[_0x50ad48(0x18e)],_0x394b6a=_0x2d9c36['operand']()||0x0;let _0x2866ed=$gameVariables[_0x50ad48(0x3bb)](_0x2d36fd)||0x0;switch(_0x52636f){case'=':_0x2866ed=_0x394b6a;break;case'+':_0x2866ed+=_0x394b6a;break;case'-':_0x2866ed-=_0x394b6a;break;case'*':_0x2866ed*=_0x394b6a;break;case'/':_0x2866ed/=_0x394b6a;break;case'%':_0x2866ed%=_0x394b6a;break;}_0x2866ed=_0x2866ed||0x0,$gameVariables['setValue'](_0x2d36fd,_0x2866ed);}),VisuMZ[_0x41d84b(0x58f)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x41d84b(0x806)][_0x41d84b(0x4a5)],Scene_Boot[_0x41d84b(0x806)]['onDatabaseLoaded']=function(){const _0x14f08=_0x41d84b;VisuMZ['CoreEngine'][_0x14f08(0x4a1)][_0x14f08(0x212)](this),this['process_VisuMZ_CoreEngine_RegExp'](),this['process_VisuMZ_CoreEngine_Notetags'](),this['process_VisuMZ_CoreEngine_Settings'](),this['process_VisuMZ_CoreEngine_Functions'](),this['process_VisuMZ_CoreEngine_CustomParameters'](),this['process_VisuMZ_CoreEngine_ControllerButtons'](),VisuMZ[_0x14f08(0x51e)]();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x3ca)]={},Scene_Boot[_0x41d84b(0x806)][_0x41d84b(0x35c)]=function(){const _0x2e80bf=_0x41d84b,_0x24314b=[_0x2e80bf(0x7f9),_0x2e80bf(0x1e5),'ATK','DEF',_0x2e80bf(0x8ac),'MDF',_0x2e80bf(0x86e),'LUK'],_0x5a7ac3=[_0x2e80bf(0x377),_0x2e80bf(0x2fc),_0x2e80bf(0x593),_0x2e80bf(0x7a3),_0x2e80bf(0x5bb),'MRF','CNT',_0x2e80bf(0x12a),_0x2e80bf(0x70e),_0x2e80bf(0x4ac)],_0xcb60e3=[_0x2e80bf(0x601),_0x2e80bf(0x3cd),'REC',_0x2e80bf(0x3e8),_0x2e80bf(0x3fd),'TCR',_0x2e80bf(0x2fb),_0x2e80bf(0x240),_0x2e80bf(0x1ad),_0x2e80bf(0x25c)],_0x43a42e=[_0x24314b,_0x5a7ac3,_0xcb60e3],_0x5c0682=[_0x2e80bf(0x2a8),_0x2e80bf(0x562),'Plus2',_0x2e80bf(0x149),_0x2e80bf(0x14c),_0x2e80bf(0x2b6),_0x2e80bf(0x4e4),_0x2e80bf(0x345),_0x2e80bf(0x84f),_0x2e80bf(0x5b7)];for(const _0x3168ff of _0x43a42e){let _0xe6a39e='';if(_0x3168ff===_0x24314b)_0xe6a39e='param';if(_0x3168ff===_0x5a7ac3)_0xe6a39e='xparam';if(_0x3168ff===_0xcb60e3)_0xe6a39e='sparam';for(const _0x1bd31e of _0x5c0682){if(_0x2e80bf(0x885)===_0x2e80bf(0x885)){let _0x5f3d78='%1%2'['format'](_0xe6a39e,_0x1bd31e);VisuMZ[_0x2e80bf(0x58f)][_0x2e80bf(0x3ca)][_0x5f3d78]=[],VisuMZ[_0x2e80bf(0x58f)][_0x2e80bf(0x3ca)][_0x5f3d78+'JS']=[];let _0xb798b3=_0x2e80bf(0x799);if([_0x2e80bf(0x2a8),_0x2e80bf(0x345)][_0x2e80bf(0x4c8)](_0x1bd31e))_0xb798b3+='([\x5c+\x5c-]\x5cd+)>';else{if(['Plus1','Flat1'][_0x2e80bf(0x4c8)](_0x1bd31e)){if(_0x2e80bf(0x5d6)==='bCnDg'){const _0x14c114=this[_0x2e80bf(0x357)]();this[_0x2e80bf(0x431)](_0x392dc7[_0x2e80bf(0x39f)]());const _0x2863e3=_0x50da2a[_0x2e80bf(0x58f)][_0x2e80bf(0x550)]['UI'][_0x2e80bf(0x48a)];this['drawText'](_0x2863e3,_0x2da5f0,_0x1bf1a5,_0x14c114,_0x2e80bf(0x43c));}else _0xb798b3+=_0x2e80bf(0x2e7);}else{if(['Plus2',_0x2e80bf(0x5b7)]['includes'](_0x1bd31e)){if(_0x2e80bf(0x3df)!==_0x2e80bf(0x3df)){if(!this[_0x2e80bf(0x621)]);const _0x14c71a=this['_animation'][_0x2e80bf(0x37a)]||'';_0x14c71a[_0x2e80bf(0x5a2)](/<RATE:[ ](\d+)>/i)&&(this[_0x2e80bf(0x909)]=(_0x4fb823(_0x4583a3['$1'])||0x1)[_0x2e80bf(0x587)](0x1,0xa));}else _0xb798b3+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';}else{if(_0x1bd31e==='Max'){if('VQqSX'==='lmLJr')return _0x1023de[_0x2e80bf(0x540)]['StatusRect'][_0x2e80bf(0x212)](this);else _0xb798b3+='(\x5cd+)>';}else{if(_0x1bd31e===_0x2e80bf(0x2b6))_0xb798b3+=_0x2e80bf(0x40b);else _0x1bd31e===_0x2e80bf(0x4e4)&&(_0xb798b3+=_0x2e80bf(0x5ae));}}}}for(const _0x205db0 of _0x3168ff){let _0x9576ea=_0x1bd31e[_0x2e80bf(0x1b5)](/[\d+]/g,'')[_0x2e80bf(0x2c0)]();const _0x50bba3=_0xb798b3['format'](_0x205db0,_0x9576ea);VisuMZ[_0x2e80bf(0x58f)][_0x2e80bf(0x3ca)][_0x5f3d78][_0x2e80bf(0x3dd)](new RegExp(_0x50bba3,'i'));const _0x144bef=_0x2e80bf(0x2fa)['format'](_0x205db0,_0x9576ea);VisuMZ['CoreEngine']['RegExp'][_0x5f3d78+'JS'][_0x2e80bf(0x3dd)](new RegExp(_0x144bef,'i'));}}else return _0x23ecc8['layoutSettings'][_0x2e80bf(0x824)]['call'](this);}}},Scene_Boot[_0x41d84b(0x806)][_0x41d84b(0x2c9)]=function(){const _0x90973e=_0x41d84b;if(VisuMZ[_0x90973e(0x51e)])return;},Scene_Boot[_0x41d84b(0x806)][_0x41d84b(0x7cc)]=function(){const _0x188ecf=_0x41d84b,_0x1380af=VisuMZ[_0x188ecf(0x58f)][_0x188ecf(0x550)];if(_0x1380af['QoL'][_0x188ecf(0x586)]){if(_0x188ecf(0x8f7)!==_0x188ecf(0x8f7)){const _0xe02812=this[_0x188ecf(0x7bf)]();return _0xe02812[_0x188ecf(0x5a2)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x188ecf(0x6c7)](_0xe02812):_0x4c16c8[_0x188ecf(0x58f)][_0x188ecf(0x118)]['call'](this,_0x4bd202);}else VisuMZ[_0x188ecf(0x5b9)](!![]);}_0x1380af['QoL'][_0x188ecf(0x7a7)]&&(Input[_0x188ecf(0x5fc)][0x23]='end',Input['keyMapper'][0x24]=_0x188ecf(0x55c));if(_0x1380af[_0x188ecf(0x451)]){const _0xdf0dde=_0x1380af['ButtonAssist'];_0xdf0dde[_0x188ecf(0x6fc)]=_0xdf0dde[_0x188ecf(0x6fc)]||_0x188ecf(0x5aa),_0xdf0dde['KeyTAB']=_0xdf0dde[_0x188ecf(0x1c1)]||_0x188ecf(0x8a4);}_0x1380af[_0x188ecf(0x59b)][_0x188ecf(0x849)]&&(Input[_0x188ecf(0x5fc)][0x57]='up',Input[_0x188ecf(0x5fc)][0x41]=_0x188ecf(0x6d6),Input[_0x188ecf(0x5fc)][0x53]=_0x188ecf(0x211),Input[_0x188ecf(0x5fc)][0x44]='right',Input['keyMapper'][0x45]=_0x188ecf(0x28e)),_0x1380af['KeyboardInput']['DashToggleR']&&(Input[_0x188ecf(0x5fc)][0x52]='dashToggle'),_0x1380af[_0x188ecf(0x195)][_0x188ecf(0x1d0)]=_0x1380af[_0x188ecf(0x195)]['DisplayedParams'][_0x188ecf(0x21e)](_0x222a95=>_0x222a95['toUpperCase']()[_0x188ecf(0x242)]()),_0x1380af[_0x188ecf(0x195)][_0x188ecf(0xfe)]=_0x1380af['Param'][_0x188ecf(0xfe)][_0x188ecf(0x21e)](_0x2ed27a=>_0x2ed27a[_0x188ecf(0x2c0)]()[_0x188ecf(0x242)]());},Scene_Boot[_0x41d84b(0x806)][_0x41d84b(0x866)]=function(){const _0xbfb15f=_0x41d84b;this[_0xbfb15f(0xde)]();},Scene_Boot[_0x41d84b(0x806)][_0x41d84b(0xde)]=function(){const _0x4f5bcd=_0x41d84b,_0x547c57=VisuMZ[_0x4f5bcd(0x58f)][_0x4f5bcd(0x550)][_0x4f5bcd(0xf8)];for(const _0x53160a of _0x547c57){if(_0x4f5bcd(0x21c)!=='wQuWl'){const _0x4986aa=_0x53160a[_0x4f5bcd(0x145)][_0x4f5bcd(0x1b5)](/[ ]/g,''),_0x2218cf=_0x53160a[_0x4f5bcd(0x87c)];VisuMZ[_0x4f5bcd(0x58f)][_0x4f5bcd(0xe7)](_0x4986aa,_0x2218cf);}else{const _0x1a54a4=(_0x3dd461[_0x4f5bcd(0x58f)]['Settings'][_0x4f5bcd(0x3f7)]||_0x4f5bcd(0x1cf))[_0x4f5bcd(0x2c0)]()[_0x4f5bcd(0x242)]();return _0x3b2513['CoreEngine'][_0x4f5bcd(0x4f6)](_0x1a54a4);}}},VisuMZ[_0x41d84b(0x58f)]['createJsQuickFunction']=function(_0x32d93f,_0x2f99c4){const _0xfbccf6=_0x41d84b;if(!!window[_0x32d93f]){if($gameTemp[_0xfbccf6(0x190)]())console[_0xfbccf6(0x5a6)](_0xfbccf6(0x28d)[_0xfbccf6(0x125)](_0x32d93f));}const _0x45b23f=_0xfbccf6(0x5a4)[_0xfbccf6(0x125)](_0x32d93f,_0x2f99c4);window[_0x32d93f]=new Function(_0x45b23f);},Scene_Boot[_0x41d84b(0x806)][_0x41d84b(0x8a3)]=function(){const _0x2d77df=_0x41d84b,_0x2f85f1=VisuMZ['CoreEngine'][_0x2d77df(0x550)]['CustomParam'];if(!_0x2f85f1)return;for(const _0x2d0af5 of _0x2f85f1){if(!_0x2d0af5)continue;VisuMZ[_0x2d77df(0x58f)][_0x2d77df(0x588)](_0x2d0af5);}},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x128)]={},VisuMZ['CoreEngine'][_0x41d84b(0x77e)]={},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x2fe)]={},VisuMZ['CoreEngine'][_0x41d84b(0x7ea)]={},VisuMZ['CoreEngine'][_0x41d84b(0x588)]=function(_0x34ca8d){const _0x1b608d=_0x41d84b,_0x1e0387=_0x34ca8d[_0x1b608d(0x394)],_0x58c16b=_0x34ca8d[_0x1b608d(0x80f)],_0x16ba90=_0x34ca8d[_0x1b608d(0x4ce)],_0x4e68de=_0x34ca8d[_0x1b608d(0x704)],_0xd0ce8b=new Function(_0x34ca8d['ValueJS']);VisuMZ[_0x1b608d(0x58f)][_0x1b608d(0x128)][_0x1e0387['toUpperCase']()[_0x1b608d(0x242)]()]=_0x58c16b,VisuMZ[_0x1b608d(0x58f)][_0x1b608d(0x77e)][_0x1e0387[_0x1b608d(0x2c0)]()[_0x1b608d(0x242)]()]=_0x16ba90,VisuMZ[_0x1b608d(0x58f)][_0x1b608d(0x2fe)][_0x1e0387[_0x1b608d(0x2c0)]()[_0x1b608d(0x242)]()]=_0x4e68de,VisuMZ[_0x1b608d(0x58f)][_0x1b608d(0x7ea)][_0x1e0387[_0x1b608d(0x2c0)]()[_0x1b608d(0x242)]()]=_0x1e0387,Object[_0x1b608d(0x54a)](Game_BattlerBase[_0x1b608d(0x806)],_0x1e0387,{'get'(){const _0x8aa39a=_0x1b608d;if(_0x8aa39a(0x811)==='gamVa')return 0x0;else{const _0x435bf1=_0xd0ce8b['call'](this);return _0x4e68de===_0x8aa39a(0x39c)?Math[_0x8aa39a(0x7f6)](_0x435bf1):_0x435bf1;}}});},VisuMZ['CoreEngine'][_0x41d84b(0x830)]={},VisuMZ['CoreEngine'][_0x41d84b(0x437)]={},Scene_Boot[_0x41d84b(0x806)][_0x41d84b(0x389)]=function(){const _0x25413e=_0x41d84b,_0x1f36b4=VisuMZ[_0x25413e(0x58f)]['Settings'][_0x25413e(0x830)];for(const _0x533d24 of _0x1f36b4){const _0x1063e0=(_0x533d24['Name']||'')['toLowerCase']()[_0x25413e(0x242)](),_0x1787f0=(_0x533d24[_0x25413e(0x263)]||'')[_0x25413e(0x403)]()[_0x25413e(0x242)]();VisuMZ[_0x25413e(0x58f)]['ControllerButtons'][_0x1063e0]=_0x533d24,VisuMZ[_0x25413e(0x58f)][_0x25413e(0x437)][_0x1787f0]=_0x1063e0;}},VisuMZ['ParseAllNotetags']=function(){const _0x556bfb=_0x41d84b;for(const _0x363353 of $dataActors){if(_0x363353)VisuMZ[_0x556bfb(0x4b7)](_0x363353);}for(const _0x5e39ca of $dataClasses){if(_0x5e39ca)VisuMZ['ParseClassNotetags'](_0x5e39ca);}for(const _0xa1d939 of $dataSkills){if(_0xa1d939)VisuMZ[_0x556bfb(0x73f)](_0xa1d939);}for(const _0x2b14d9 of $dataItems){if(_0x2b14d9)VisuMZ['ParseItemNotetags'](_0x2b14d9);}for(const _0x36d5f7 of $dataWeapons){if(_0x36d5f7)VisuMZ['ParseWeaponNotetags'](_0x36d5f7);}for(const _0x48171e of $dataArmors){if(_0x556bfb(0x3aa)===_0x556bfb(0x26d))return _0x4d1bcc[_0x556bfb(0x540)]['HelpRect']['call'](this);else{if(_0x48171e)VisuMZ['ParseArmorNotetags'](_0x48171e);}}for(const _0x59f6c1 of $dataEnemies){if(_0x59f6c1)VisuMZ[_0x556bfb(0x876)](_0x59f6c1);}for(const _0x71865c of $dataStates){if(_0x556bfb(0x6ed)!==_0x556bfb(0x89c)){if(_0x71865c)VisuMZ[_0x556bfb(0x38c)](_0x71865c);}else _0x2af260+=_0x599c43;}for(const _0x35ee2f of $dataTilesets){if(_0x556bfb(0x3ce)!=='TfHdA'){if(_0x35ee2f)VisuMZ[_0x556bfb(0x2dc)](_0x35ee2f);}else{const _0xd6be6b=_0x1e776d[_0x556bfb(0x69f)],_0x54e191=_0x3fa1fd['iconHeight'],_0x3a0fe5=this[_0x556bfb(0x552)][_0x556bfb(0x5a2)](/SMOOTH/i);this[_0x556bfb(0x4fd)]=new _0x124a5d(_0xd6be6b,_0x54e191);const _0x3cd370=_0x70b892[_0x556bfb(0x51a)](_0x556bfb(0x815)),_0x41a3e9=_0x5ed71e%0x10*_0xd6be6b,_0x486c73=_0x4e6a8a[_0x556bfb(0x5d1)](_0x4f5402/0x10)*_0x54e191;this[_0x556bfb(0x4fd)]['smooth']=_0x3a0fe5,this[_0x556bfb(0x4fd)][_0x556bfb(0x666)](_0x3cd370,_0x41a3e9,_0x486c73,_0xd6be6b,_0x54e191,0x0,0x0,_0xd6be6b,_0x54e191);}}},VisuMZ[_0x41d84b(0x4b7)]=function(_0x5ebdd1){},VisuMZ['ParseClassNotetags']=function(_0x48740b){},VisuMZ['ParseSkillNotetags']=function(_0xd62a4e){},VisuMZ[_0x41d84b(0x29f)]=function(_0x493cab){},VisuMZ[_0x41d84b(0x835)]=function(_0x2ad21b){},VisuMZ[_0x41d84b(0x782)]=function(_0x2e5c43){},VisuMZ[_0x41d84b(0x876)]=function(_0x562f27){},VisuMZ['ParseStateNotetags']=function(_0xedee8f){},VisuMZ[_0x41d84b(0x2dc)]=function(_0x38fd0b){},VisuMZ[_0x41d84b(0x58f)]['ParseActorNotetags']=VisuMZ[_0x41d84b(0x4b7)],VisuMZ['ParseActorNotetags']=function(_0x2dcf91){const _0x26cb52=_0x41d84b;VisuMZ[_0x26cb52(0x58f)]['ParseActorNotetags'][_0x26cb52(0x212)](this,_0x2dcf91);const _0x27014c=_0x2dcf91[_0x26cb52(0x326)];if(_0x27014c['match'](/<MAX LEVEL:[ ](\d+)>/i)){if(_0x26cb52(0x17c)===_0x26cb52(0x17c)){_0x2dcf91[_0x26cb52(0x4d6)]=Number(RegExp['$1']);if(_0x2dcf91['maxLevel']===0x0)_0x2dcf91[_0x26cb52(0x4d6)]=Number['MAX_SAFE_INTEGER'];}else var _0xd9269e=_0x208474[_0x26cb52(0x692)](_0x44b6c3*0x2-0x1,'outbounce')*0.5+0.5;}_0x27014c[_0x26cb52(0x5a2)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x2dcf91[_0x26cb52(0x82f)]=Math[_0x26cb52(0x50d)](Number(RegExp['$1']),_0x2dcf91['maxLevel']));},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x4ae)]=VisuMZ[_0x41d84b(0x4ae)],VisuMZ[_0x41d84b(0x4ae)]=function(_0x289f49){const _0x4c8d65=_0x41d84b;VisuMZ[_0x4c8d65(0x58f)][_0x4c8d65(0x4ae)][_0x4c8d65(0x212)](this,_0x289f49);if(_0x289f49[_0x4c8d65(0x864)])for(const _0x44ebca of _0x289f49[_0x4c8d65(0x864)]){if(_0x4c8d65(0x2e2)!=='kHSuz')return'FTB';else _0x44ebca['note'][_0x4c8d65(0x5a2)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x44ebca[_0x4c8d65(0x703)]=Math[_0x4c8d65(0x81e)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x876)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x41d84b(0x876)]=function(_0x4452a9){const _0xb12832=_0x41d84b;VisuMZ[_0xb12832(0x58f)]['ParseEnemyNotetags'][_0xb12832(0x212)](this,_0x4452a9),_0x4452a9[_0xb12832(0x703)]=0x1;const _0x12471e=_0x4452a9[_0xb12832(0x326)];if(_0x12471e['match'](/<LEVEL:[ ](\d+)>/i))_0x4452a9[_0xb12832(0x703)]=Number(RegExp['$1']);if(_0x12471e[_0xb12832(0x5a2)](/<MAXHP:[ ](\d+)>/i))_0x4452a9[_0xb12832(0x2fd)][0x0]=Number(RegExp['$1']);if(_0x12471e[_0xb12832(0x5a2)](/<MAXMP:[ ](\d+)>/i))_0x4452a9[_0xb12832(0x2fd)][0x1]=Number(RegExp['$1']);if(_0x12471e[_0xb12832(0x5a2)](/<ATK:[ ](\d+)>/i))_0x4452a9[_0xb12832(0x2fd)][0x2]=Number(RegExp['$1']);if(_0x12471e[_0xb12832(0x5a2)](/<DEF:[ ](\d+)>/i))_0x4452a9[_0xb12832(0x2fd)][0x3]=Number(RegExp['$1']);if(_0x12471e[_0xb12832(0x5a2)](/<MAT:[ ](\d+)>/i))_0x4452a9['params'][0x4]=Number(RegExp['$1']);if(_0x12471e['match'](/<MDF:[ ](\d+)>/i))_0x4452a9['params'][0x5]=Number(RegExp['$1']);if(_0x12471e[_0xb12832(0x5a2)](/<AGI:[ ](\d+)>/i))_0x4452a9[_0xb12832(0x2fd)][0x6]=Number(RegExp['$1']);if(_0x12471e[_0xb12832(0x5a2)](/<LUK:[ ](\d+)>/i))_0x4452a9[_0xb12832(0x2fd)][0x7]=Number(RegExp['$1']);if(_0x12471e[_0xb12832(0x5a2)](/<EXP:[ ](\d+)>/i))_0x4452a9[_0xb12832(0x471)]=Number(RegExp['$1']);if(_0x12471e[_0xb12832(0x5a2)](/<GOLD:[ ](\d+)>/i))_0x4452a9[_0xb12832(0x857)]=Number(RegExp['$1']);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x851)]=Graphics['_defaultStretchMode'],Graphics[_0x41d84b(0x156)]=function(){const _0x5216fa=_0x41d84b;switch(VisuMZ[_0x5216fa(0x58f)][_0x5216fa(0x550)][_0x5216fa(0x1bb)][_0x5216fa(0x637)]){case'stretch':return!![];case _0x5216fa(0x1e3):return![];default:return VisuMZ[_0x5216fa(0x58f)][_0x5216fa(0x851)][_0x5216fa(0x212)](this);}},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x1a3)]=Graphics[_0x41d84b(0x4a2)],Graphics[_0x41d84b(0x4a2)]=function(_0x23f695,_0x3a3505,_0x3dabba=null){const _0x55ae28=_0x41d84b;VisuMZ[_0x55ae28(0x58f)][_0x55ae28(0x1a3)]['call'](this,_0x23f695,_0x3a3505,_0x3dabba),VisuMZ['ShowDevTools'](![]);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x717)]=Graphics[_0x41d84b(0x729)],Graphics['_centerElement']=function(_0x3b5468){const _0x5cb697=_0x41d84b;VisuMZ[_0x5cb697(0x58f)][_0x5cb697(0x717)][_0x5cb697(0x212)](this,_0x3b5468),this[_0x5cb697(0x1a6)](_0x3b5468);},Graphics[_0x41d84b(0x1a6)]=function(_0x204066){const _0x3d70d9=_0x41d84b;VisuMZ[_0x3d70d9(0x58f)][_0x3d70d9(0x550)][_0x3d70d9(0x1bb)][_0x3d70d9(0x90b)]&&(_0x204066[_0x3d70d9(0x54c)][_0x3d70d9(0x787)]=_0x3d70d9(0x80d));VisuMZ['CoreEngine']['Settings'][_0x3d70d9(0x1bb)][_0x3d70d9(0x7ac)]&&(_0x204066[_0x3d70d9(0x54c)]['image-rendering']=_0x3d70d9(0x5ed));const _0x234ffe=Math[_0x3d70d9(0x81e)](0x0,Math[_0x3d70d9(0x5d1)](_0x204066[_0x3d70d9(0x3a6)]*this[_0x3d70d9(0x373)])),_0x249d27=Math['max'](0x0,Math[_0x3d70d9(0x5d1)](_0x204066[_0x3d70d9(0x536)]*this[_0x3d70d9(0x373)]));_0x204066[_0x3d70d9(0x54c)][_0x3d70d9(0x3a6)]=_0x234ffe+'px',_0x204066['style'][_0x3d70d9(0x536)]=_0x249d27+'px';},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x774)]=Bitmap[_0x41d84b(0x806)][_0x41d84b(0x3e9)],Bitmap['prototype']['initialize']=function(_0x4d9d0b,_0x4ee9c4){const _0x515979=_0x41d84b;VisuMZ[_0x515979(0x58f)]['Bitmap_initialize'][_0x515979(0x212)](this,_0x4d9d0b,_0x4ee9c4),this[_0x515979(0x7a9)]=!(VisuMZ[_0x515979(0x58f)][_0x515979(0x550)]['QoL'][_0x515979(0x7ac)]??!![]);},Bitmap[_0x41d84b(0x806)][_0x41d84b(0x116)]=function(){this['_customModified']=!![];},VisuMZ['CoreEngine']['Sprite_destroy']=Sprite[_0x41d84b(0x806)][_0x41d84b(0x3b6)],Sprite[_0x41d84b(0x806)][_0x41d84b(0x3b6)]=function(){const _0x3495ae=_0x41d84b;VisuMZ[_0x3495ae(0x58f)][_0x3495ae(0xfc)][_0x3495ae(0x212)](this),this[_0x3495ae(0x68c)]();},Sprite[_0x41d84b(0x806)][_0x41d84b(0x68c)]=function(){const _0x2b4ee2=_0x41d84b;if(!this[_0x2b4ee2(0x4fd)])return;if(!this[_0x2b4ee2(0x4fd)][_0x2b4ee2(0x54f)])return;this[_0x2b4ee2(0x4fd)][_0x2b4ee2(0xe0)]&&!this['_bitmap'][_0x2b4ee2(0xe0)]['destroyed']&&this['bitmap'][_0x2b4ee2(0x3b6)]();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x27d)]=Bitmap[_0x41d84b(0x806)][_0x41d84b(0x66f)],Bitmap[_0x41d84b(0x806)][_0x41d84b(0x66f)]=function(_0x4dca51,_0x2aa4fd){const _0x3ba810=_0x41d84b;VisuMZ['CoreEngine']['Bitmap_resize'][_0x3ba810(0x212)](this,_0x4dca51,_0x2aa4fd),this[_0x3ba810(0x116)]();},VisuMZ[_0x41d84b(0x58f)]['Bitmap_blt']=Bitmap[_0x41d84b(0x806)][_0x41d84b(0x666)],Bitmap[_0x41d84b(0x806)][_0x41d84b(0x666)]=function(_0x29a84f,_0x4c9b89,_0x55a934,_0x3d5039,_0x55f26d,_0x2c3f2,_0x12cff2,_0x42a770,_0x3f7bbd){const _0x5b83ee=_0x41d84b;_0x4c9b89=Math[_0x5b83ee(0x7f6)](_0x4c9b89),_0x55a934=Math[_0x5b83ee(0x7f6)](_0x55a934),_0x3d5039=Math[_0x5b83ee(0x7f6)](_0x3d5039),_0x55f26d=Math[_0x5b83ee(0x7f6)](_0x55f26d),_0x2c3f2=Math[_0x5b83ee(0x7f6)](_0x2c3f2),_0x12cff2=Math['round'](_0x12cff2),VisuMZ[_0x5b83ee(0x58f)][_0x5b83ee(0x671)][_0x5b83ee(0x212)](this,_0x29a84f,_0x4c9b89,_0x55a934,_0x3d5039,_0x55f26d,_0x2c3f2,_0x12cff2,_0x42a770,_0x3f7bbd),this['markCoreEngineModified']();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x249)]=Bitmap[_0x41d84b(0x806)][_0x41d84b(0x142)],Bitmap[_0x41d84b(0x806)][_0x41d84b(0x142)]=function(_0x3339a4,_0x45ca86,_0x3b5266,_0x1b651){const _0xefc1d1=_0x41d84b;VisuMZ[_0xefc1d1(0x58f)][_0xefc1d1(0x249)]['call'](this,_0x3339a4,_0x45ca86,_0x3b5266,_0x1b651),this[_0xefc1d1(0x116)]();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x6a6)]=Bitmap[_0x41d84b(0x806)][_0x41d84b(0x286)],Bitmap['prototype']['fillRect']=function(_0xbbd136,_0x7e2ed3,_0x5d3853,_0x2feef5,_0x381d96){const _0x3f228a=_0x41d84b;VisuMZ[_0x3f228a(0x58f)][_0x3f228a(0x6a6)][_0x3f228a(0x212)](this,_0xbbd136,_0x7e2ed3,_0x5d3853,_0x2feef5,_0x381d96),this[_0x3f228a(0x116)]();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x78b)]=Bitmap[_0x41d84b(0x806)][_0x41d84b(0x7dd)],Bitmap[_0x41d84b(0x806)][_0x41d84b(0x7dd)]=function(_0x518ee2,_0x5a2cd0,_0xcc1549,_0xd2f49d,_0x396a77){const _0x4ebc=_0x41d84b;VisuMZ['CoreEngine'][_0x4ebc(0x78b)][_0x4ebc(0x212)](this,_0x518ee2,_0x5a2cd0,_0xcc1549,_0xd2f49d,_0x396a77),this[_0x4ebc(0x116)]();},VisuMZ[_0x41d84b(0x58f)]['Bitmap_gradientFillRect']=Bitmap[_0x41d84b(0x806)][_0x41d84b(0x333)],Bitmap[_0x41d84b(0x806)][_0x41d84b(0x333)]=function(_0x4b3389,_0x3cc493,_0x29f52c,_0x456e11,_0x239e05,_0xff8c3,_0x12ae8f){const _0x47c2a0=_0x41d84b;VisuMZ[_0x47c2a0(0x58f)][_0x47c2a0(0x3ab)]['call'](this,_0x4b3389,_0x3cc493,_0x29f52c,_0x456e11,_0x239e05,_0xff8c3,_0x12ae8f),this[_0x47c2a0(0x116)]();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x1b1)]=Bitmap['prototype'][_0x41d84b(0x693)],Bitmap['prototype'][_0x41d84b(0x693)]=function(_0x494124,_0x733401,_0x3f9f7f,_0x44d6d5){const _0x471958=_0x41d84b;_0x494124=Math[_0x471958(0x7f6)](_0x494124),_0x733401=Math[_0x471958(0x7f6)](_0x733401),_0x3f9f7f=Math[_0x471958(0x7f6)](_0x3f9f7f),VisuMZ['CoreEngine'][_0x471958(0x1b1)][_0x471958(0x212)](this,_0x494124,_0x733401,_0x3f9f7f,_0x44d6d5),this['markCoreEngineModified']();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x5e2)]=Bitmap['prototype']['measureTextWidth'],Bitmap[_0x41d84b(0x806)][_0x41d84b(0x1ab)]=function(_0x375c98){const _0x319f46=_0x41d84b;return Math[_0x319f46(0x354)](VisuMZ['CoreEngine']['Bitmap_measureTextWidth'][_0x319f46(0x212)](this,_0x375c98));},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x77c)]=Bitmap['prototype'][_0x41d84b(0x3e6)],Bitmap['prototype']['drawText']=function(_0x1277f5,_0x22a3d7,_0x366586,_0x1b2758,_0x21fed9,_0x229e5e){const _0x3571a4=_0x41d84b;_0x22a3d7=Math[_0x3571a4(0x7f6)](_0x22a3d7),_0x366586=Math['round'](_0x366586),_0x1b2758=Math[_0x3571a4(0x7f6)](_0x1b2758),_0x21fed9=Math['round'](_0x21fed9),VisuMZ[_0x3571a4(0x58f)][_0x3571a4(0x77c)][_0x3571a4(0x212)](this,_0x1277f5,_0x22a3d7,_0x366586,_0x1b2758,_0x21fed9,_0x229e5e),this[_0x3571a4(0x116)]();},VisuMZ[_0x41d84b(0x58f)]['Bitmap_drawTextOutline']=Bitmap[_0x41d84b(0x806)][_0x41d84b(0xed)],Bitmap[_0x41d84b(0x806)][_0x41d84b(0xed)]=function(_0x49972a,_0x365ca2,_0x551fca,_0x29cc53){const _0x41f10b=_0x41d84b;if(VisuMZ[_0x41f10b(0x58f)][_0x41f10b(0x550)]['QoL']['FontShadows']){if(_0x41f10b(0x882)!==_0x41f10b(0x308))this['_drawTextShadow'](_0x49972a,_0x365ca2,_0x551fca,_0x29cc53);else{if(_0x5d3798[_0x41f10b(0x4c8)](_0x2de143[_0x41f10b(0x403)]()))return!![];}}else VisuMZ[_0x41f10b(0x58f)][_0x41f10b(0x547)][_0x41f10b(0x212)](this,_0x49972a,_0x365ca2,_0x551fca,_0x29cc53);},Bitmap[_0x41d84b(0x806)]['_drawTextShadow']=function(_0x384c10,_0xf4a283,_0x5cfa80,_0x123e68){const _0x11c156=_0x41d84b,_0x3b691f=this[_0x11c156(0xe5)];_0x3b691f[_0x11c156(0x229)]=this[_0x11c156(0x20b)],_0x3b691f[_0x11c156(0x355)](_0x384c10,_0xf4a283+0x2,_0x5cfa80+0x2,_0x123e68);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x63a)]=Input[_0x41d84b(0x4df)],Input[_0x41d84b(0x4df)]=function(){const _0x49041b=_0x41d84b;VisuMZ[_0x49041b(0x58f)]['Input_clear'][_0x49041b(0x212)](this),this['_inputString']=undefined,this[_0x49041b(0x44a)]=undefined,this[_0x49041b(0x655)]=Input[_0x49041b(0x6af)];},VisuMZ[_0x41d84b(0x58f)]['Input_update']=Input['update'],Input[_0x41d84b(0x75c)]=function(){const _0x47bb4d=_0x41d84b;VisuMZ[_0x47bb4d(0x58f)][_0x47bb4d(0x5ff)][_0x47bb4d(0x212)](this);if(this[_0x47bb4d(0x655)])this[_0x47bb4d(0x655)]--;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x283)]=Input[_0x41d84b(0x18c)],Input['_pollGamepads']=function(){const _0x50a4cc=_0x41d84b;if(this[_0x50a4cc(0x655)])return;VisuMZ[_0x50a4cc(0x58f)][_0x50a4cc(0x283)][_0x50a4cc(0x212)](this);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0xeb)]=Input[_0x41d84b(0x76b)],Input[_0x41d84b(0x76b)]=function(){const _0x264a0e=_0x41d84b;VisuMZ['CoreEngine']['Input_setupEventHandlers'][_0x264a0e(0x212)](this),document[_0x264a0e(0x6f6)]('keypress',this['_onKeyPress'][_0x264a0e(0x44f)](this));},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x408)]=Input[_0x41d84b(0x4ea)],Input[_0x41d84b(0x4ea)]=function(_0x4ae9ce){const _0x45e471=_0x41d84b;this[_0x45e471(0x44a)]=_0x4ae9ce['keyCode'],VisuMZ[_0x45e471(0x58f)]['Input_onKeyDown']['call'](this,_0x4ae9ce),this[_0x45e471(0x5b1)](null);},Input[_0x41d84b(0x111)]=function(_0x14e782){const _0x320fcb=_0x41d84b;this[_0x320fcb(0x6f1)](_0x14e782);},Input[_0x41d84b(0x6f1)]=function(_0x35148e){const _0x2ef66e=_0x41d84b;this[_0x2ef66e(0x44a)]=_0x35148e[_0x2ef66e(0x6c6)];let _0x5c9a90=String[_0x2ef66e(0x610)](_0x35148e['charCode']);this[_0x2ef66e(0x798)]===undefined?this[_0x2ef66e(0x798)]=_0x5c9a90:this[_0x2ef66e(0x798)]+=_0x5c9a90;},VisuMZ[_0x41d84b(0x58f)]['Input_shouldPreventDefault']=Input[_0x41d84b(0x561)],Input[_0x41d84b(0x561)]=function(_0x10c167){const _0x4dc86d=_0x41d84b;if(_0x10c167===0x8)return![];return VisuMZ[_0x4dc86d(0x58f)][_0x4dc86d(0x8d7)][_0x4dc86d(0x212)](this,_0x10c167);},Input[_0x41d84b(0x2f7)]=function(_0x3e5908){const _0x5b9931=_0x41d84b;if(_0x3e5908[_0x5b9931(0x5a2)](/backspace/i))return this[_0x5b9931(0x44a)]===0x8;if(_0x3e5908[_0x5b9931(0x5a2)](/enter/i))return this[_0x5b9931(0x44a)]===0xd;if(_0x3e5908[_0x5b9931(0x5a2)](/escape/i))return this[_0x5b9931(0x44a)]===0x1b;},Input[_0x41d84b(0x64c)]=function(){const _0x4c9687=_0x41d84b;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x4c9687(0x59c)](this[_0x4c9687(0x44a)]);},Input[_0x41d84b(0x8ce)]=function(){const _0x3338a4=_0x41d84b;return[0x25,0x26,0x27,0x28]['contains'](this[_0x3338a4(0x44a)]);},Input[_0x41d84b(0x3da)]=function(){const _0x293635=_0x41d84b;if(navigator[_0x293635(0x4c6)]){if('ExYiO'!==_0x293635(0x5ef))_0x53f1c0[_0x293635(0x58f)][_0x293635(0x238)]['call'](this,_0x38b56b,_0x449392,_0x407999,_0x136fee,_0x45ccdb,_0x5079cb,_0x31a5d5,_0x1dc37f),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1708bb]||{'x':0x0,'y':0x0});else{const _0x2796c1=navigator[_0x293635(0x4c6)]();if(_0x2796c1){if(_0x293635(0x2ef)===_0x293635(0x31b))this[_0x293635(0x423)]['x']=_0x5e25bf['boxWidth']+0x4;else for(const _0x4efd13 of _0x2796c1){if(_0x293635(0x554)===_0x293635(0x317)){this[_0x293635(0x48c)][_0x293635(0x2bc)](_0x2e5b4c),this[_0x293635(0x464)][_0x293635(0x568)](_0x33c01f);for(const _0x1d36a1 of _0x1fa5ea[_0x293635(0x899)]){_0x1d36a1[_0x293635(0x754)]&&_0x1d36a1[_0x293635(0x754)]();}_0x4d4531[_0x293635(0x3b6)]();}else{if(_0x4efd13&&_0x4efd13[_0x293635(0x555)])return!![];}}}}}return![];},Input[_0x41d84b(0x633)]=function(){const _0x4670f9=_0x41d84b;if(navigator[_0x4670f9(0x4c6)]){if(_0x4670f9(0x302)!==_0x4670f9(0x342)){const _0x26fafe=navigator['getGamepads']();if(_0x26fafe)for(const _0x303556 of _0x26fafe){if(_0x303556&&_0x303556['connected']){if(this['isGamepadButtonPressed'](_0x303556))return!![];if(this[_0x4670f9(0x10d)](_0x303556))return!![];}}}else return this[_0x4670f9(0x275)];}return![];},Input[_0x41d84b(0x501)]=function(_0x445bd3){const _0x24acae=_0x41d84b,_0x258bb6=_0x445bd3[_0x24acae(0x4e0)];for(let _0x106f0a=0x0;_0x106f0a<_0x258bb6[_0x24acae(0x669)];_0x106f0a++){if(_0x258bb6[_0x106f0a][_0x24acae(0x752)])return!![];}return![];},Input[_0x41d84b(0x10d)]=function(_0x4dc3d5){const _0x1d423c=_0x41d84b,_0x2ac1d7=_0x4dc3d5[_0x1d423c(0x5b6)],_0x515e43=0.5;if(_0x2ac1d7[0x0]<-_0x515e43)return!![];if(_0x2ac1d7[0x0]>_0x515e43)return!![];if(_0x2ac1d7[0x1]<-_0x515e43)return!![];if(_0x2ac1d7[0x1]>_0x515e43)return!![];return![];},Input[_0x41d84b(0x5d9)]=function(){const _0x5afb27=_0x41d84b;return this[_0x5afb27(0x58b)]||null;},Input[_0x41d84b(0x5b1)]=function(_0x2d3d48){const _0x4d3aed=_0x41d84b;this[_0x4d3aed(0x58b)]=_0x2d3d48;},VisuMZ['CoreEngine'][_0x41d84b(0x361)]=Input['_updateGamepadState'],Input['_updateGamepadState']=function(_0xb48ef4){const _0x5d3c9c=_0x41d84b;VisuMZ['CoreEngine'][_0x5d3c9c(0x361)]['call'](this,_0xb48ef4),(this[_0x5d3c9c(0x501)](_0xb48ef4)||this[_0x5d3c9c(0x10d)](_0xb48ef4))&&('JdtAN'!=='KspSY'?this[_0x5d3c9c(0x5b1)](_0xb48ef4):this[_0x5d3c9c(0x852)][_0x5d3c9c(0x325)](_0x42b45f[_0x5d3c9c(0x540)][_0x5d3c9c(0x8ed)]));},Input[_0x41d84b(0x129)]=function(){const _0x4af87f=_0x41d84b;return this[_0x4af87f(0x58b)]?this[_0x4af87f(0x58b)]['id']:_0x4af87f(0x296);},VisuMZ['CoreEngine'][_0x41d84b(0x327)]=Tilemap[_0x41d84b(0x806)][_0x41d84b(0x4e6)],Tilemap[_0x41d84b(0x806)]['_addShadow']=function(_0x227d6a,_0x17c08d,_0x1bed37,_0x109d9f){const _0x5c5339=_0x41d84b;if($gameMap&&$gameMap['areTileShadowsHidden']())return;VisuMZ[_0x5c5339(0x58f)][_0x5c5339(0x327)]['call'](this,_0x227d6a,_0x17c08d,_0x1bed37,_0x109d9f);},Tilemap[_0x41d84b(0x2a0)][_0x41d84b(0x806)][_0x41d84b(0x47a)]=function(){const _0x3c5b16=_0x41d84b;this['_destroyInternalTextures']();for(let _0x4d561a=0x0;_0x4d561a<Tilemap[_0x3c5b16(0x4e7)]['MAX_GL_TEXTURES'];_0x4d561a++){if(_0x3c5b16(0x43f)!=='porJL')return'';else{const _0x41bedc=new PIXI['BaseTexture']();_0x41bedc['setSize'](0x800,0x800),VisuMZ[_0x3c5b16(0x58f)]['Settings'][_0x3c5b16(0x1bb)][_0x3c5b16(0x7ac)]&&(_0x3c5b16(0x319)===_0x3c5b16(0x295)?_0x1c32c0=_0x40d64b[_0x3c5b16(0x5f1)](_0x53eb55):_0x41bedc[_0x3c5b16(0x81d)]=PIXI[_0x3c5b16(0x7f7)][_0x3c5b16(0x470)]),this[_0x3c5b16(0x139)][_0x3c5b16(0x3dd)](_0x41bedc);}}},WindowLayer[_0x41d84b(0x806)][_0x41d84b(0x705)]=function(){const _0x25f9fb=_0x41d84b;if(SceneManager&&SceneManager[_0x25f9fb(0x512)]){if(_0x25f9fb(0x164)===_0x25f9fb(0x8a6))_0x47f3a3[_0x25f9fb(0x58f)]['Sprite_Button_initialize'][_0x25f9fb(0x212)](this,_0x4ffde6),this[_0x25f9fb(0x75d)]();else return SceneManager[_0x25f9fb(0x512)]['isWindowMaskingEnabled']();}else{if(_0x25f9fb(0x724)===_0x25f9fb(0x724))return!![];else{const _0x5cd672=_0x25f9fb(0x5d5);this['_colorCache']=this['_colorCache']||{};if(this[_0x25f9fb(0x3d7)][_0x5cd672])return this[_0x25f9fb(0x3d7)][_0x5cd672];const _0x4bde25=_0x4ff4ed[_0x25f9fb(0x58f)][_0x25f9fb(0x550)][_0x25f9fb(0x664)][_0x25f9fb(0x5b3)];return this[_0x25f9fb(0x5df)](_0x5cd672,_0x4bde25);}}},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x7e7)]=WindowLayer['prototype'][_0x41d84b(0x5c3)],WindowLayer['prototype']['render']=function render(_0x1623b3){const _0x2925be=_0x41d84b;if(this[_0x2925be(0x705)]()){if(_0x2925be(0x3f5)!==_0x2925be(0x462))VisuMZ[_0x2925be(0x58f)][_0x2925be(0x7e7)][_0x2925be(0x212)](this,_0x1623b3);else{const _0x79e0e9=_0x1b00bb[_0x2925be(0x58f)][_0x2925be(0x550)][_0x2925be(0x73d)][_0x113243],_0x538544=_0x2925be(0x123)[_0x2925be(0x125)](_0x13f05f);for(const _0x20fae7 of _0x79e0e9){_0x1c12d8[_0x2925be(0x3fa)](_0x538544,_0x20fae7);}}}else this['renderNoMask'](_0x1623b3);},WindowLayer[_0x41d84b(0x806)]['renderNoMask']=function render(_0x43677d){const _0x266230=_0x41d84b;if(!this['visible'])return;const _0x5ddf02=new PIXI[(_0x266230(0x8b1))](),_0x23305e=_0x43677d['gl'],_0xd46b1b=this[_0x266230(0x192)][_0x266230(0x55b)]();_0x43677d[_0x266230(0x2b4)][_0x266230(0x641)](),_0x5ddf02['transform']=this[_0x266230(0x917)],_0x43677d[_0x266230(0x2a4)][_0x266230(0x7ef)](),_0x23305e[_0x266230(0x219)](_0x23305e[_0x266230(0x3fc)]);while(_0xd46b1b[_0x266230(0x669)]>0x0){const _0x16b085=_0xd46b1b[_0x266230(0x831)]();_0x16b085[_0x266230(0x2f8)]&&_0x16b085[_0x266230(0x7b6)]&&_0x16b085[_0x266230(0x7c4)]>0x0&&(_0x23305e[_0x266230(0x360)](_0x23305e[_0x266230(0x63e)],0x0,~0x0),_0x23305e[_0x266230(0x77b)](_0x23305e[_0x266230(0x362)],_0x23305e[_0x266230(0x362)],_0x23305e[_0x266230(0x362)]),_0x16b085[_0x266230(0x5c3)](_0x43677d),_0x43677d['batch'][_0x266230(0x7ef)](),_0x5ddf02['clear'](),_0x23305e[_0x266230(0x360)](_0x23305e['ALWAYS'],0x1,~0x0),_0x23305e['stencilOp'](_0x23305e['REPLACE'],_0x23305e['REPLACE'],_0x23305e['REPLACE']),_0x23305e['blendFunc'](_0x23305e['ZERO'],_0x23305e[_0x266230(0x5f2)]),_0x5ddf02['render'](_0x43677d),_0x43677d[_0x266230(0x2a4)][_0x266230(0x7ef)](),_0x23305e[_0x266230(0x8b4)](_0x23305e[_0x266230(0x5f2)],_0x23305e[_0x266230(0x1eb)]));}_0x23305e[_0x266230(0x6ab)](_0x23305e[_0x266230(0x3fc)]),_0x23305e[_0x266230(0x4df)](_0x23305e['STENCIL_BUFFER_BIT']),_0x23305e[_0x266230(0x11a)](0x0),_0x43677d[_0x266230(0x2a4)]['flush']();for(const _0x496572 of this[_0x266230(0x192)]){!_0x496572[_0x266230(0x2f8)]&&_0x496572[_0x266230(0x7b6)]&&_0x496572[_0x266230(0x5c3)](_0x43677d);}_0x43677d['batch'][_0x266230(0x7ef)]();},DataManager[_0x41d84b(0x352)]=function(_0x3663b6){const _0x5b1b2e=_0x41d84b;return this[_0x5b1b2e(0x4d1)](_0x3663b6)&&_0x3663b6['itypeId']===0x2;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x44c)]=DataManager['setupNewGame'],DataManager['setupNewGame']=function(){const _0x2177e5=_0x41d84b;VisuMZ['CoreEngine']['DataManager_setupNewGame'][_0x2177e5(0x212)](this),this[_0x2177e5(0x4a8)](),this[_0x2177e5(0x322)]();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x3c2276=_0x41d84b;if($gameTemp[_0x3c2276(0x190)]()){const _0x33f4ea=VisuMZ['CoreEngine'][_0x3c2276(0x550)]['QoL']['NewGameCommonEvent'];if(_0x33f4ea>0x0)$gameTemp[_0x3c2276(0x674)](_0x33f4ea);}},DataManager[_0x41d84b(0x322)]=function(){const _0x34f277=_0x41d84b,_0x2afb96=VisuMZ['CoreEngine'][_0x34f277(0x550)][_0x34f277(0x1bb)]['NewGameCommonEventAll']||0x0;if(_0x2afb96>0x0)$gameTemp[_0x34f277(0x674)](_0x2afb96);},DataManager[_0x41d84b(0x57f)]=function(_0x1591d3){const _0x354f00=_0x41d84b,_0x2c3e32=$dataTroops[_0x1591d3];if(!_0x2c3e32)return'';let _0x3f4037='';_0x3f4037+=_0x2c3e32[_0x354f00(0x37a)];for(const _0x55e392 of _0x2c3e32[_0x354f00(0x8fe)]){for(const _0xdc2f64 of _0x55e392['list']){[0x6c,0x198]['includes'](_0xdc2f64[_0x354f00(0xec)])&&(_0x3f4037+='\x0a',_0x3f4037+=_0xdc2f64[_0x354f00(0x543)][0x0]);}}return _0x3f4037;};function _0x4ce9(){const _0x99ab60=['TextManager_param','blendFunc','number','onButtonImageLoad','processMoveCommand','%1〘End\x20Choice\x20Selection〙%1','updateDocumentTitle','commandWindowRect','poyHw','WWdzB','loadMapData','TextCodeClassNames','getLevel','KoZer','buttonAssistWindowButtonRect','sv_enemies','NewGameBoot','processTouchModernControls','STR','HhzRo','statusWindowRect','itemWindowRect','TfRmy','fPOVF','original','IconIndex','xparam','isArrowPressed','cursorPageup','Window_StatusBase_drawActorLevel','Scene_Name_onInputOk','mainFontSize','TCR','ExportString','PAUSE','yjiOw','Input_shouldPreventDefault','_targetScaleY','YVcut','_dummyWindow','ENTER','endBattlerActions','_lastOrigin','DamageColor','EGiUb','targetPosition','XIYSK','ColorTPGauge1','isSideButtonLayout','startAutoNewGame','HelpRect','setHome','XRIzk','dashToggle','top','lXpcj','anchor','UuRcW','StatusBgType','buttonAssistOk','equips','adjustSprite','_mainSprite','paramY','sparamRate1','updatePointAnimations','Scene_Menu_create','MjHVu','wBKTf','createCancelButton','Padding','PvGlI','WIN_OEM_FJ_ROYA','FRrfe','kmkqM','pages','SDDDI','StatusParamsRect','1.4.4','slotWindowRect','SystemSetWindowPadding','ZFekJ','lmibk','YyGxr','isMapScrollLinked','offsetX','_rate','ATTN','FontSmoothing','Scene_MenuBase_createCancelButton','updatePictureAntiZoom','drawCurrentParam','ADD','Total','checkCacheKey','vZaHV','position','initCoreEngine','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','Sprite_Button_initialize','transform','ogdhT','JWqxQ','SideButtons','drawActorClass','SaveMenu','missed','OUTSINE','_coreEasing','exec','process_VisuMZ_CoreEngine_jsQuickFunctions','SceneManager_initialize','_baseTexture','ntGpz','drawAllParams','random','horzJS','context','buttonY','createJsQuickFunction','MULTIPLY','createKeyJS','setActorHome','Input_setupEventHandlers','code','_drawTextOutline','JSON','loadTitle1','iXglf','pwNvK','setMoveEasingType','OUTCUBIC','HYPHEN_MINUS','kgMdP','GoldBgType','VisuMZ_2_BattleSystemSTB','jsQuickFunc','JHRFV','textWidth','child_process','Sprite_destroy','playTestCtrlT','ExtDisplayedParams','sin','ssSWA','startMove','maxGold','buttonAssistCancel','ETB','Game_Party_consumeItem','_context','showPointAnimations','OUTQUINT','dimColor1','drawParamText','1.3.0','NewGameCommonEvent','isGamepadAxisMoved','ColorMaxLvGauge2','isEventRunning','_cacheScaleY','_onKeyPress','YNcdJ','Scene_Map_createSpritesetFix','XZrax','lineHeight','markCoreEngineModified','drawActorNickname','Game_Interpreter_command105','zONPx','clearStencil','Baniw','isPressed','isPlaying','result','CategoryRect','vHvAp','CategoryBgType','ProfileRect','img/%1/','rgba(0,\x200,\x200,\x201.0)','format','canUse','_refreshPauseSign','CustomParamNames','getLastUsedGamepadType','HRG','INOUTCIRC','_baseSprite','PRESERVCONVERSION(%1)','Game_Character_processMoveCommand','_listWindow','4LKmNLy','ENTER_SPECIAL','isPhysical','StatusMenu','Scene_Battle_createSpritesetFix','WIN_OEM_ENLW','application/json','apply','_hovered','_internalTextures','PLUS','INOUTBOUNCE','INELASTIC','NiICQ','CTRL','status','SideView','_viewportSize','clearRect','index','_refreshArrows','FunctionName','_screenY','currentValue','_buttonAssistWindow','Max','Game_Action_itemHit','eva','Rate','drawActorExpGauge','〘Common\x20Event\x20%1:\x20%2〙\x20Start','createEnemies','get','Show\x20Scrolling\x20Text\x20Script\x20Error','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','ActorBgType','onNameOk','initCoreEngineScreenShake','_defaultStretchMode','BoxMargin','consumable','allowShiftScrolling','charAt','targetBackOpacity','buttonAssistWindowSideRect','CLEAR','(\x5cd+)>','URL','TPB\x20ACTIVE','_storedStack','SceneManager_onKeyDown','backOpacity','OcvgC','smooth','PVeZT','Conditional\x20Branch\x20Script\x20Error','useDigitGroupingEx','updateCoreEasing','HJOlf','ejWZj','_battleField','Window_Selectable_processCursorMove','DELETE','Window_NameInput_cursorPagedown','WIN_OEM_PA2','switchModes','Scene_Map_updateScene','GREATER_THAN','Game_Map_setup','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','WIN_OEM_FJ_JISHO','CIRCUMFLEX','_scaleY','addLoadListener','SParamVocab9','_stored_maxLvGaugeColor1','OGHOT','Unnamed','DigitGroupingExText','Window','targetScaleX','COLON','IconXParam4','escape','kVtTc','xparamPlus2','F23','up2','characters','Game_Event_isCollidedWithEvents','7365ShUCqs','setAttack','_pollGamepads','pJfnZ','operation','ALTGR','isPlaytest','AntiZoomPictures','children','outlineColorDmg','inBattle','Param','isInputting','substring','mFWRu','drawTextEx','sqrMu','TQjLg','background','Scene_MenuBase_mainAreaTop','isTouchedInsideFrame','CallHandlerJS','drawParamName','endAction','FQzAF','Graphics_printError','INEXPO','ActorHPColor','_centerElementCoreEngine','Linear','TranslucentOpacity','description','buttonAssistWindowRect','measureTextWidth','boxWidth','FDR','SystemLoadAudio','RULLT','_forcedBattleSys','Bitmap_drawCircle','XParamVocab6','IconSParam1','_inputWindow','replace','catchLoadError','updatePadding','SUBTRACT','add','Map%1.json','QoL','JUNJA','WIN_OEM_PA3','Game_Actor_paramBase','xparamRate','IconParam1','KeyTAB','text','F14','skillTypes','isEnemy','_onLoad','LoEqO','nDICt','pBtLI','isUseModernControls','Game_Troop_setup','NUMPAD7','RepositionEnemies','OutlineColorDmg','DATABASE','DisplayedParams','adjustBoxSize','XParamVocab0','_stored_hpGaugeColor2','SwitchToggleRange','onXhrError','PictureEraseAll','CommandBgType','_mode','Window_Base_drawText','OutlineColor','TextStr','FRgRY','windowRect','itemHit','INBACK','XParamVocab2','bWJvU','_dimmerSprite','normal','BgFilename1','MAXMP','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','processSoundTimings','_maxDigits','RQMGo','ARRAYSTR','ONE_MINUS_SRC_ALPHA','mKJuN','padZero','enemies','targetY','processKeyboardDigitChange','RepositionActors','F24','IconXParam5','isAnimationOffsetXMirrored','font','ARRAYNUM','BuyBgType','tLnkq','UKeQk','SwitchRandomizeRange','tHkaW','changeClass','hasEncryptedImages','_isButtonHidden','Origin','kAvVH','Wait','WcXkA','InputBgType','WIN_OEM_FINISH','join','select','BTestWeapons','Scene_MenuBase_helpAreaTop','GameEnd','setCommonEvent','outlineColor','removeFauxAnimation','areButtonsOutsideMainUI','BannedWords','_duration','createFauxAnimation','down','call','shake','calcEasing','isSceneMap','CNT','ESC','AMUAf','enable','Window_NumberInput_processDigitChange','IxyXc','lutha','isPointAnimationPlaying','map','_drawTextBody','_targetOpacity','BattleManager_processEscape','param','AqUHS','menu','events','_startLoading','ItemStyle','deselect','fillStyle','TsVJl','OS_KEY','PreserveNumbers','open','EditRect','rgba(0,\x200,\x200,\x200.7)','SParamVocab7','F22','drawGameTitle','FTB','goldWindowRect','YSogx','INQUART','Enemy-%1-%2','Game_Picture_show','DrawIcons','_movementWholeDuration','ValueJS','SPZZL','buttonAssistKey5','State-%1-%2','gaugeLineHeight','MDR','updateMove','trim','WIN_OEM_RESET','FINAL','KzwcU','windowOpacity','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','battleSystem','Bitmap_clearRect','Game_System_initialize','drawTextTopAligned','getColor','Spriteset_Base_initialize','TAB','VsNQA','seVolume','SParamVocab5','_upArrowSprite','centerSprite','contents','setViewport','NUM_LOCK','Window_Selectable_itemRect','SParamVocab4','targetContentsOpacity','mhp','ExportStrFromAllMaps','EXR','processCursorMoveModernControls','_colorTone','paramRate1','IconParam4','504150TqbGCm','EnableJS','Match','setCoreEngineUpdateWindowBg','updateMotion','Window_NameInput_refresh','CTB','%1〘Choice\x20Cancel〙%1','dropItems','Game_BattlerBase_initMembers','putnq','mpGaugeColor1','DVcve','nextLevelExp','xparamPlus1','Actor','RbVQL','indexOf','IconParam5','_tempActor','_digitGroupingEx','LevelUpFullMp','AgmaX','deflate','Vezrm','filterArea','PGDN','SlotRect','Bitmap_resize','Spriteset_Base_isAnimationPlaying','SystemLoadImages','NUM','_lastY','NameInputMessage','Input_pollGamepads','_pointAnimationSprites','DfbDb','fillRect','VgjHY','sparamPlus2','SmartEventCollisionPriority','processFauxAnimationRequests','isBottomButtonMode','buttonAssistText1','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','pagedown','hpGaugeColor1','YXLss','send','itemBackColor1','SwitchActorText','WIN_OEM_COPY','WfEZp','Keyboard','focus','inbounce','_stored_hpGaugeColor1','sparamPlus','wtypeId','_closing','EXSEL','ExtractStrFromList','ParseItemNotetags','Renderer','Scene_Base_terminate','innerHeight','XParameterFormula','batch','udzCR','EnableMasking','sparamFlat2','Plus','kQYKd','ColorMPGauge1','actorWindowRect','buttonAssistOffset2','EnableNameInput','XSPLR','playMiss','paramchangeTextColor','itemBackColor2','isFullDocumentTitle','tilesets','framebuffer','ColorCTGauge2','Rate1','Troop%1','retrievePointAnimation','_fauxAnimationQueue','Chance','tLboP','remove','tileHeight','wait','backspace','toUpperCase','Actor-%1-%2','_screenX','CommandWidth','Skill-%1-%2','keyboard','isCursorMovable','GoldRect','clipboard','process_VisuMZ_CoreEngine_Notetags','optionsWindowRect','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','KRrIS','Scene_Map_createMenuButton','buttonAssistText%1','HelpBgType','_stored_mpCostColor','tpColor','_itemWindow','lUeJP','categoryWindowRect','default','SystemSetBattleSystem','ColorDeath','OUTELASTIC','initBasic','isMaxLevel','Sprite_Gauge_currentValue','ParseTilesetNotetags','inputWindowRect','type','encounterStepsMinimum','buttonAssistKey%1','getInputButtonString','kHSuz','addWindow','_scaleX','F7key','showPicture','([\x5c+\x5c-]\x5cd+)([%％])>','VisuMZ_2_BattleSystemOTB','QKrng','ColorCrisis','XtuVx','CLOSE_PAREN','onEscapeSuccess','buttonAssistKey2','UxtTU','RgEid','Manual','meVolume','anchorCoreEasing','DigitGroupingDamageSprites','createPageButtons','paramName','isSpecialCode','_isWindow','sparamFlatBonus','<JS\x20%1\x20%2:[\x20](.*)>','PDR','EVA','params','CustomParamType','SEMICOLON','App','msBKv','kkPOd','Subtitle','setActionState','_opacity','jVaJt','_active','bwymd','getCustomBackgroundSettings','YAxTM','SParamVocab6','areTileShadowsHidden','processCursorMove','【%1】\x0a','_stored_mpGaugeColor2','QwertyLayout','initMembers','DrawItemBackgroundJS','updateOnceParallelInterpreters','ColorHPGauge1','xWpfh','FWGVn','GQPeW','processKeyboardHandling','AIrsF','ARRAYFUNC','NncFl','loadWindowskin','ARRAYEVAL','globalAlpha','IconXParam3','bPYFW','isWindowMaskingEnabled','reserveNewGameCommonEvent','bCiQb','atbActive','setBackgroundType','note','Tilemap_addShadow','_commandList','start','moveRelativeToResolutionChange','Sprite_Battler_startMove','tPSTV','sceneTerminationClearEffects','F18','IconXParam6','$dataMap','KcuOk','SceneManager_isGameActive','gradientFillRect','mainAreaTopSideButtonLayout','cursorDown','_actor','hit','_action','outbounce','ColorMaxLvGauge1','F13','isMenuButtonAssistEnabled','platform','FontSize','updatePositionCoreEngineShakeHorz','ColorMPGauge2','Scene_Map_initialize','equGW','MIN_SAFE_INTEGER','gaugeBackColor','Flat','MODECHANGE','stypeId','_storedMapText','darwin','Window_Base_update','XParamVocab8','startAnimation','Game_Picture_move','_commonEventLayers','Spriteset_Battle_createEnemies','getInputMultiButtonStrings','_loadingState','isKeyItem','setValue','ceil','fillText','DTB','rightArrowWidth','xFhQN','Game_Picture_calcEasing','itemEva','mute','process_VisuMZ_CoreEngine_RegExp','GuYxl','Scene_Battle_update','EncounterRateMinimum','stencilFunc','Input_updateGamepadState','KEEP','nFjFi','vertical','_clientArea','_height','sv_actors','_lastPluginCommandInterpreter','processEscape','bgsVolume','subject','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','createPointAnimation','BXGOt','StatusParamsBgType','mirror','Center','refreshWithTextCodeSupport','_realScale','tTycC','ColorTPGauge2','Window_Base_drawCharacter','HIT','MRF','xlHDH','name','StatusEquipRect','NUMPAD1','DefaultStyle','OptionsMenu','resetTextColor','CbZbZ','Spriteset_Base_updatePosition','battlebacks1','createTextState','PictureID','paramMax','Opacity','drawSegment','faceWidth','process_VisuMZ_CoreEngine_ControllerButtons','vQcEp','LATIN1','ParseStateNotetags','PkqBx','ShopMenu','RequireFocus','drawGameVersion','getControllerInputButtonString','playBuzzer','updatePictureCoordinates','Abbreviation','BasicParameterFormula','%1\x0a','create','Window_Base_drawFace','_windowLayer','_goldWindow','AnimationID','integer','defaultInputMode','canEquip','systemColor','MAX_SAFE_INTEGER','Symbol','_playTestFastMode','setEasingType','zCidn','version','width','Location','applyForcedGameTroopSettingsCoreEngine','EZrPu','zNxGA','Bitmap_gradientFillRect','save','currencyUnit','134020dQpWuQ','encounterStep','_editWindow','createFauxAnimationQueue','removePointAnimation','_origin','createButtonAssistWindow','GoldMax','destroy','IconSParam7','list','_target','successRate','value','ColorHPGauge2','KaDeS','textAlign','makeDeepCopy','BuyRect','paramWidth','setSideView','isAnimationPlaying','active','showFauxAnimations','windowPadding','INCUBIC','DocumentTitleFmt','vAhLm','RegExp','ALT','Scene_Boot_startNormalGame','GRD','WCfxc','SkillTypeRect','repositionCancelButtonSideButtonLayout','Version','GoldOverlap','ACCEPT','Window_Base_initialize','buttonAssistOffset5','toLocaleString','_colorCache','updatePosition','qfKwA','isGamepadConnected','rwhqp','usableSkills','push','AEdxI','toPbS','cos','buttonAssistText4','TEZXu','INOUTEXPO','WrBIq','jarOh','drawText','measureTextWidthNoRounding','PHA','initialize','_backgroundSprite','_cache','RfvNG','Window_NameInput_cursorUp','OTB','Window_MapName_refresh','_movementDuration','EscapeAlways','pointY','helpWindowRect','setupValueFont','XYAiE','IGYzz','BattleSystem','Sprite_Button_updateOpacity','traitsPi','loadBitmap','OUTQUART','STENCIL_TEST','MCR','EEnQp','toFixed','_digitGrouping','_stored_ctGaugeColor1','setTargetAnchor','toLowerCase','isHandled','opacity','GWtYD','F16','Input_onKeyDown','isBottomHelpMode','OpenURL','(\x5cd+)([%％])>','addOnceParallelInterpreter','xparamRate2','OUTEXPO','DigitGroupingStandardText','ExportCurMapText','UpdatePictureCoordinates','KqjWf','updatePositionCoreEngineShakeVert','setGuard','playTestF7','clearZoom','ExportAllMapText','Scene_MenuBase_createPageButtons','ForceNoPlayTest','pageup','addChild','CecFp','OkText','xparamFlat2','alphabetic','cOSzj','PTB','isSmartEventCollisionOn','_menuButton','Game_Picture_x','_downArrowSprite','pictures','refresh','setMute','parallaxes','initVisuMZCoreEngine','_forcedTroopView','IDs','_number','Enemy','slice','mainAreaTop','changeTextColor','Window_NameInput_processTouch','updateDashToggle','X:\x20%1','PositionX','IconParam7','ControllerMatches','IconSParam6','isTriggered','sFXgb','_onceParallelInterpreters','center','_startDecrypting','itemPadding','porJL','playOnceParallelInterpreter','isInstanceOfSceneMap','bitmapWidth','breUV','openURL','WIN_OEM_BACKTAB','innerWidth','_hideTileShadows','WIN_OEM_WSCTRL','Zdavr','_inputSpecialKeyCode','CLOSE_CURLY_BRACKET','DataManager_setupNewGame','loadSystemImages','coreEngineRepositionEnemies','bind','mainAreaHeight','ButtonAssist','requestPointAnimation','_changingClass','owutD','_tilemap','XYggn','isMagical','qaLGI','isTpb','_battlerName','1023FHrRyb','hideButtonFromView','constructor','〘Show\x20Text〙\x0a','omXcd','WIN_ICO_CLEAR','sparamFlatJS','wQwrY','BackOpacity','_effectsContainer','NumberRect','VisuMZ_2_BattleSystemCTB','BTB','_profileWindow','OPRaW','lJupZ','evade','scaleSprite','makeFontBigger','RIGHT','createSpriteset','NEAREST','exp','xparamRateJS','DummyRect','ExtractStrFromMap','aXIXI','createBackground','SubfolderParse','_clickHandler','_mp','_createInternalTextures','mkTGQ','expGaugeColor2','outlineColorGauge','369znQqbm','ExportAllTroopText','bqqJG','horizontal','drawGoldItemStyle','loadPicture','pop','fontSize','commandWindowRows','LESS_THAN','setupCustomRateCoreEngine','WIN_ICO_00','ParamArrow','CYSpY','_fauxAnimationSprites','MINar','reduce','makeActionList','Scene_GameEnd_createBackground','PyWZU','_index','_categoryWindow','processDigitChange','_timerSprite','F15','updateShadow','Game_Action_updateLastTarget','isClosed','ColorPowerDown','isOpen','_shakePower','fusbI','makeEncounterCount','nPnzG','DETACH_PICTURE_CONTAINER','Scene_Boot_onDatabaseLoaded','printError','Spriteset_Base_update','ColorSystem','onDatabaseLoaded','Pixelated','valueOutlineColor','reservePlayTestNewGameCommonEvent','fadeSpeed','scale','sqrt','TRG','updateMain','ParseClassNotetags','tbqwR','Scene_Base_terminateAnimationClearBugFix','uygYO','updateEffekseer','NUMPAD0','DebugConsoleLastControllerID','SobbB','setMainFontSize','ParseActorNotetags','CxFui','hpColor','FadeSpeed','cursorUp','wkvyC','ctrl','FUNC','_muteSound','isMVAnimation','SMpmB','itemHeight','parseForcedGameTroopSettingsCoreEngine','Scene_Battle_createSpriteset_detach','applyCoreEasing','getGamepads','ScaleX','includes','vzvcA','ColorCTGauge1','sparam','wxsFW','BattleManager_update','Icon','INBOUNCE','IconSParam0','isItem','F6key','mainAreaHeightSideButtonLayout','_list','operand','maxLevel','HQAXV','paramFlat','DOUBLE_QUOTE','updatePositionCoreEngineShakeOriginal','statusParamsWindowRect','concat','_pictureContainer','LoadError','clear','buttons','LUK','Armor-%1-%2','_pressed','Rate2','numberShowButton','_addShadow','Layer','Sprite_AnimationMV_processTimingData','Window_ShopSell_isEnabled','_onKeyDown','ScreenResolution','PERIOD','_stored_powerDownColor','AccuracyBoost','clearCachedKeys','_currentMap','Window_NameInput_initialize','zUTKl','buttonAssistKey3','nickname','makeCoreEngineCommandList','CreateBattleSystemID','erasePicture','EquipMenu','yLRyo','LevelUpFullHp','playTestF6','WIN_OEM_JUMP','bitmap','processTimingData','SELECT','ZQatK','isGamepadButtonPressed','jFZKN','isOptionValid','RIvIe','paramBase','AuBCb','ButtonFadeSpeed','getCoreEngineScreenShakeStyle','Window_NameInput_cursorDown','ZIwKn','gainSilentTp','drawGameSubtitle','min','hTnAd','createBuffer','createDimmerSprite','crisisColor','_scene','setupCoreEasing','GET','MDF','_shakeDuration','PositionY','drawItem','KxzDw','loadSystem','translucentOpacity','_offsetY','getBattleSystem','ParseAllNotetags','smallParamFontSize','gaugeRate','_stored_crisisColor','_statusParamsWindow','StartID','retrieveFauxAnimation','OPEN_PAREN','BattleManager_checkSubstitute','evDed','GetParamIcon','Scene_Boot_updateDocumentTitle','updateAnchor','gainGold','button','DummyBgType','Window_Gold_refresh','\x20Origin:\x20%1','MapNameTextCode','PYuZT','XvSZp','VisuMZ_2_BattleSystemPTB','Game_Temp_initialize','dldlL','height','VOLUME_DOWN','UAZVH','createWindowLayer','xparamRate1','SkillTypeBgType','ImprovedAccuracySystem','cursorRight','lceIb','WIN_OEM_ATTN','layoutSettings','Game_Picture_updateMove','isEnabled','parameters','subtitle','command122','DIVIDE','Bitmap_drawTextOutline','cZNIG','Window_Selectable_cursorUp','defineProperty','right','style','_optionsWindow','〘Common\x20Event\x20%1:\x20%2〙\x20End','_customModified','Settings','textHeight','_pictureName','VfeFc','KMNKL','connected','storeMapData','MenuLayout','Page','pow','nVmJr','clone','home','updateCurrentEvent','titles2','BKruK','updatePositionCoreEngineShakeRand','_shouldPreventDefault','Plus1','catchException','IconSParam4','adjustPictureAntiZoom','ctGaugeColor1','PRINT','removeChild','Window_NameInput_cursorPageup','LINEAR','CRSEL','createPointAnimationTargets','VisuMZ_1_OptionsCore','expRate','mIdib','_pagedownButton','BgFilename2','blockWidth','moveMenuButtonSideButtonLayout','Scene_Equip_create','levelUp','mdEGE','setViewportCoreEngineFix','BgType','_troopId','removeAllPointAnimations','titles1','tpCostColor','_buyWindow','drawActorLevel','createTroopNote','parse','Game_Picture_y','isExpGaugeDrawn','Scene_Status_create','_pictureCoordinatesWindow','NmzYO','OpenConsole','clamp','createCustomParameter','setHandler','PictureEasingType','_lastGamepad','BmQiM','Scene_Skill_create','VhLQZ','CoreEngine','JvKsG','playCursor','iJwqc','CRI','yKXqy','HOME','ASTERISK','Gold','bitmapHeight','META','popScene','KeyboardInput','contains','xparamPlus','onMoveEnd','maxTurns','_skillTypeWindow','move','match','RPGMAKER_VERSION','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','udRKS','log','resetFontSettings','touchUI','isActiveTpb','\x5c}❪SHIFT❫\x5c{','animationShouldMirror','REC','isAlive','(\x5cd+\x5c.?\x5cd+)>','vTXza','setFrame','setLastGamepadUsed','drawBackgroundRect','ColorExpGauge1','CAPSLOCK','ItemBgType','axes','Flat2','RowSpacing','ShowDevTools','IconSParam2','MEV','titleCommandWindow','Scene_Item_create','ParamChange','powerUpColor','setAction','ucoLG','title','render','eeDjL','setBattleSystem','Sprite_Picture_loadBitmap','Fdbfw','ShowButtons','_actorWindow','_stored_ctGaugeColor2','_subject','XParamVocab3','LoadMenu','maxItems','_onError','FFTfP','floor','NUMPAD3','restore','Y:\x20%1','_stored_expGaugeColor1','WNATy','_hideButtons','bgm','getLastGamepadUsed','Scene_MenuBase_createBackground','updateOrigin','currentLevelExp','statusEquipWindowRect','LEFT','getColorDataFromPluginParameters','playEscape','Game_Actor_levelUp','Bitmap_measureTextWidth','xnIPt','mpCostColor','overrideMimeType','addCommand','SystemSetFontSize','EKQXK','_sideButtonLayout','isGameActive','vYVOf','COMMA','pixelated','updateLastTarget','ExYiO','BjdDl','RevertPreserveNumbers','ONE','paramBaseAboveLevel99','_targetAnchor','Scene_Shop_create','CONVERT','_stored_powerUpColor','createMenuButton','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','Untitled','_CoreEngineSettings','keyMapper','VLkHo','Game_Interpreter_updateWaitMode','Input_update','Scene_Base_create','TGR','TimeProgress','thuoU','onerror','catchUnknownError','WmjwY','JTKFw','cursorPagedown','INOUTQUART','cancelShowButton','IyFBr','helpAreaTopSideButtonLayout','ActorTPColor','playOk','JqoaT','fromCharCode','_stored_tpGaugeColor1','fvPcA','_encounterCount','OaqAY','5330038dFivGd','STRUCT','waiting','stop','IconParam3','_drawTextShadow','vCuVd','updateOpacity','INCIRC','_statusEquipWindow','sparamRate','stringKeyMap','_animation','Scene_Boot_loadSystemImages','ExtractStrFromTroop','makeTargetSprites','enemy','mmp','SPACE','buttonAssistKey1','BlendMode','%1〘Choice\x20%2〙\x20%3%1','updateWaitMode','VOLUME_MUTE','onKeyDownKeysF6F7','IconParam6','animationBaseDelay','jhKxs','0.00','updateKeyText','isGamepadTriggered','DigitGroupingGaugeSprites','consumeItem','GroupDigits','AutoStretch','vzaop','CONTEXT_MENU','Input_clear','Power','Script\x20Call\x20Error','Window_EquipItem_isEnabled','EQUAL','CrisisRate','fiHUB','forceStencil','sGypz','AWAuG','createPointAnimationSprite','createCustomBackgroundImages','openingSpeed','HASH','ExtJS','CancelText','_logWindow','INOUTCUBIC','isNumpadPressed','textSizeEx','StatusEquipBgType','mev','numActions','processKeyboardHome','setBackgroundOpacity','animations','processKeyboardBackspace','_gamepadWait','end','OnLoadJS','cancel','ColorGaugeBack','drawGauge','DetachBattlePictureContainer','OsPOJ','QUESTION_MARK','kSrwf','isRepeated','BACK_QUOTE','expGaugeColor1','F20','backgroundBitmap','Color','alwaysDash','blt','setActorHomeRepositioned','ExportCurTroopText','length','VisuMZ_2_BattleSystemBTB','isNwjs','buttonAssistSwitch','helpAreaHeight','isSideView','resize','cAstQ','Bitmap_blt','buttonAssistOffset1','GTzmo','reserveCommonEvent','Game_Action_setAttack','WIN_ICO_HELP','F10','INQUAD','altKey','movePageButtonSideButtonLayout','EDscl','_playtestF7Looping','OpenSpeed','removeAllFauxAnimations','_opening','CommonEventID','STB','HpmZv','WlCos','ARRAYSTRUCT','ColSpacing','createPointAnimationQueue','traitObjects','asin','vertJS','updateTransform','_helpWindow','destroyCoreEngineMarkedBitmaps','Game_Screen_initialize','actor','vIaup','_spriteset','setupNewGame','ApplyEasing','drawCircle','vQCsp','loadIconBitmap','ItemRect','Game_Interpreter_command111','updatePositionCoreEngine','performMiss','requiredWtypeId1','needsUpdate','members','_destroyCanvas','_pictureCoordinatesMode','iconWidth','JCvwf','PKkNj','_stored_tpCostColor','_anchor','command111','dimColor2','Bitmap_fillRect','getControllerInputButtonMatch','vUpsb','tYYFl','isAnimationForEach','disable','volume','listWindowRect','repositionEnemiesByResolution','keyRepeatWait','Scene_Map_updateMainMultiply','isActor','SParamVocab3','nah','isRightInputMode','drawBackground','Wlcnp','pendingColor','PiRzE','lVjRl','XpgKu','onLoad','AnimationPoint','804TiNBwq','SceneManager_exit','_coreEngineShakeStyle','isCollidedWithEvents','updateMainMultiply','PERCENT','paramValueByName','DimColor1','_stored_systemColor','keyCode','runCombinedScrollingTextAsCode','randomJS','_cacheScaleX','ScreenShake','_backSprite','DOWN','tileWidth','makeInputButtonString','%1:\x20Exit\x20','ConvertParams','Control\x20Variables\x20Script\x20Error','itemSuccessRate','useFontWidthFix','image-rendering','down2','left','hoOro','Window_Base_createTextState','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','TnQoX','lrIKM','EqdBc','XBHsx','drawIcon','drawFace','kCQED','_moveEasingType','Exported_Script_%1.txt','ATK','Scene_Map_update','vxgXo','uMTxP','exportAllMapStrings','show','isSceneBattle','_blank','Game_Interpreter_command355','vuqQB','QJVnz','targets','evaded','_offsetX','_registerKeyInput','fLAxI','ZskSW','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','RcUjG','addEventListener','zgZgJ','yEEMD','Game_Actor_changeClass','en-US','WMQkR','KeySHIFT','BlurFilter','levelUpRecovery','GZzHk','_stored_mpGaugeColor1','drawActorSimpleStatus','ELwaw','level','Type','isMaskingEnabled','BottomButtons','xScrollLinkedOffset','Gutts','buttonAssistText2','playCancel','KhniV','baseId','EywUa','MRG','_slotWindow','Window_NumberInput_start','Window_NameInput_processHandling','requestMotion','data/','KaqDN','onKeyDown','WIN_OEM_FJ_LOYA','Graphics_centerElement','VariableJsBlock','_targetY','Scene_Map_createSpriteset','addChildToBack','PRINTSCREEN','DOLLAR','Sprite_Animation_setViewport','_shakeSpeed','createCommandWindow','gSrIM','paramPlusJS','initialBattleSystem','jYyxw','WIN_OEM_CLEAR','Key%1','cUqqa','doesNameContainBannedWords','_centerElement','ItemBackColor1','ZlJdf','setSideButtonLayout','tXmwu','SParameterFormula','return\x200','makeDocumentTitle','PupCH','_stored_normalColor','%1/','itemLineRect','1437515pUKKXe','EndingID','randomInt','SLASH','OiVTF','OUTQUAD','fzTts','picture','ImgLoad','maxTp','ParseSkillNotetags','abs','Game_Interpreter_PluginCommand','Game_Action_itemEva','XParamVocab1','SXxer','animationNextDelay','jbNAi','padding','DEF','removeOnceParallelInterpreter','textColor','Slvzh','iconHeight','deathColor','Scene_Battle_createCancelButton','EREOF','%2%1%3','subjectHitRate','pressed','normalColor','endAnimation','WIN_OEM_CUSEL','WPACt','animationId','ListRect','itypeId','_data','MenuBg','update','initButtonHidden','initDigitGrouping','Game_Event_start','alignBottom','bxvuf','faceHeight','mapId','displayX','_backSprite2','drawIconBySize','ColorPowerUp','VErkr','redraw','_cancelButton','_setupEventHandlers','_paramPlus','repeat','itemHitImprovedAccuracy','ekbpv','registerCommand','ZSfCX','jsonToZip','_pauseSignSprite','Bitmap_initialize','uiAreaHeight','OUTCIRC','ZcwJS','Game_Interpreter_command122','smoothSelect','ZOOM','stencilOp','Bitmap_drawText','Scene_Map_updateMain','CustomParamIcons','Window_Selectable_processTouch','canAttack','ListBgType','ParseArmorNotetags','command355','Scene_Base_createWindowLayer','battlerHue','IconParam0','font-smooth','SEPARATOR','cursorLeft','UkEEo','Bitmap_strokeRect','terms','ButtonHeight','isBusy','_pointAnimationQueue','ColorExpGauge2','initCoreEasing','Scene_MenuBase_mainAreaHeight','ColorManager_loadWindowskin','SkillMenu','Sprite_Picture_updateOrigin','advanced','command357','_inputString','<%1\x20%2:[\x20]','_targetScaleX','AllMaps','_coreEasingType','ShowJS','tUEfS','updateFauxAnimations','MvAnimationRate','option','dummyWindowRect','CEV','NUMPAD9','zjRdq','Tortu','ModernControls','BACK_SLASH','_smooth','_width','_isPlaytest','PixelateImageRendering','PictureEraseRange','xparamFlatJS','MUgak','worldTransform','easingType','Window_NameInput_cursorRight','setAnchor','StatusRect','targetScaleY','visible','ActorMPColor','RBBsd','processTouch','lplae','applyEasing','setupCoreEngine','setColorTone','Scene_Map_createSpriteset_detach','getCombinedScrollingText','RCikq','uKYkm','Title','gTDLt','openness','menuShowButton','RwOgR','INOUTELASTIC','_makeFontNameText','IconParam2','buttonAssistOffset4','Item-%1-%2','process_VisuMZ_CoreEngine_Settings','updateScene','PositionJS','FcLTo','boxHeight','sparamRate2','tpGaugeColor1','buttonAssistOffset%1','maxCols','displayName','PictureFilename','BxzEe','Window_Selectable_drawBackgroundRect','playCursorSound','processCursorHomeEndTrigger','Spriteset_Base_destroy','BbERO','strokeRect','Scene_Name_create','responseText','Window_Base_drawIcon','Sprite_Actor_setActorHome','processHandling','PuVlT','_stored_pendingColor','makeFontSmaller','yScrollLinkedOffset','WindowLayer_render','_animationQueue','ObaOi','CustomParamAbb','getLastPluginCommandInterpreter','processAlwaysEscape','targetSpritePosition','NBsTN','flush','_image','PmPmm','wholeDuration','BTestArmors','WIN_OEM_PA1','aXMVh','round','SCALE_MODES','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','MAXHP','key%1','processKeyboardDelete','pictureButtons','contentsOpacity','Game_Picture_initBasic','viewport','Sprite_Animation_processSoundTimings','TdgnC','initMembersCoreEngine','KeyItemProtect','_lastX','gbxPm','prototype','useDigitGrouping','Sprite_Gauge_gaugeRate','performEscape','PictureShowIcon','END','FhguH','none','exit','ParamName','colSpacing','mbOoB','GoldIcon','helpAreaTop','DimColor2','IconSet','xmpvb','\x0a\x0a\x0a\x0a\x0a','isOpenAndActive','Window_NameInput_cursorLeft','TPB\x20WAIT','ColorMPCost','measureText','scaleMode','max','_margin','text%1','Scene_Battle_createSpriteset','startShake','TextJS','CommandRect','command105','setupButtonImage','xOvQW','CkoLQ','QyEfg','_repositioned','SlotBgType','Smooth','setWindowPadding','enableDigitGroupingEx','initialLevel','ControllerButtons','shift','playLoad','paramRate','bEEzc','ParseWeaponNotetags','setupFont','ujoJh','createFauxAnimationSprite','Vponz','createChildSprite','arTqZ','_backgroundFilter','processKeyboardEnd','currentExp','buttonAreaHeight','IconSParam9','determineSideButtonLayoutValid','processPointAnimationRequests','_targets','resetBattleSystem','OUTBOUNCE','isItemStyle','loadGameImagesCoreEngine','targetOpacity','WASD','buyWindowRect','filters','calcCoreEasing','setClickHandler','onInputBannedWords','Flat1','XParamVocab5','Graphics_defaultStretchMode','_statusWindow','filter','setup','createTitleButtons','_pageupButton','gold','onload','updateOpen','areButtonsHidden','ShortcutScripts','LineHeight','6044502cYByPT','terminate','TitleCommandList','tab','_balloonQueue','cxTOB','VisuMZ_2_BattleSystemFTB','learnings','TextCodeNicknames','process_VisuMZ_CoreEngine_Functions','test','currentClass','snapForBackground','isForFriend','eventsXyNt','MINUS','VBTDJ','AGI','ColorTPCost','checkSubstitute','BACKSPACE','clearForcedGameTroopSettingsCoreEngine','textBaseline','ARRAYJSON','getPointAnimationLayer','ParseEnemyNotetags','VariableEvalReference','RepositionEnemies130','_buttonType','_commandWindow','moveCancelButtonSideButtonLayout','CodeJS','updatePlayTestF7','paramPlus','getKeyboardInputButtonString','bgmVolume','ItemHeight','Asnbv','xparamFlat1','setupBattleTestItems','EAjgo','clearOnceParallelInterpreters','BTestItems','Window_StatusBase_drawActorSimpleStatus','gainItem','HANJA','cXAon','RkYAZ','VisuMZ_2_BattleSystemETB','loading','lkNTY','onClick','mainAreaBottom','_backSprite1','skillTypeWindowRect','IconXParam0','evaluate','maxLvGaugeColor2','imageSmoothingEnabled','Sprite_AnimationMV_updatePosition','targetObjects','sparamFlat1','xACeZ','Lcqnf','xparamPlusJS','isNormalPriority','ParamMax','OPEN_BRACKET','requestFauxAnimation','duration','process_VisuMZ_CoreEngine_CustomParameters','\x5c}❪TAB❫\x5c{','damageColor','oCxEH','EQUALS','ShowItemBackground','_windowskin','item','176128IXSLBf','MAT','alpha','HELP','tovEu','getButtonAssistLocation','Graphics','_targetX'];_0x4ce9=function(){return _0x99ab60;};return _0x4ce9();}(VisuMZ['CoreEngine']['Settings'][_0x41d84b(0x1bb)][_0x41d84b(0x85b)]??!![])&&($scene=null,VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x600)]=Scene_Base['prototype'][_0x41d84b(0x397)],Scene_Base[_0x41d84b(0x806)]['create']=function(){const _0x8618b2=_0x41d84b;VisuMZ['CoreEngine'][_0x8618b2(0x600)][_0x8618b2(0x212)](this),$scene=this;},$spriteset=null,VisuMZ['CoreEngine']['Scene_Map_createSpriteset']=Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x46f)],Scene_Map[_0x41d84b(0x806)]['createSpriteset']=function(){const _0x29050e=_0x41d84b;VisuMZ[_0x29050e(0x58f)]['Scene_Map_createSpriteset']['call'](this),$spriteset=this[_0x29050e(0x690)];},VisuMZ[_0x41d84b(0x58f)]['Scene_Battle_createSpriteset']=Scene_Battle[_0x41d84b(0x806)][_0x41d84b(0x46f)],Scene_Battle['prototype'][_0x41d84b(0x46f)]=function(){const _0x25bdb2=_0x41d84b;VisuMZ[_0x25bdb2(0x58f)][_0x25bdb2(0x821)][_0x25bdb2(0x212)](this),$spriteset=this[_0x25bdb2(0x690)];},VisuMZ['CoreEngine'][_0x41d84b(0x2a1)]=Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x85e)],Scene_Base['prototype']['terminate']=function(){const _0x5132f8=_0x41d84b;VisuMZ['CoreEngine'][_0x5132f8(0x2a1)]['call'](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ['CoreEngine']['BattleManager_update']=BattleManager['update'],BattleManager[_0x41d84b(0x75c)]=function(_0xa9920){const _0xf1e116=_0x41d84b;VisuMZ[_0xf1e116(0x58f)][_0xf1e116(0x4cd)][_0xf1e116(0x212)](this,_0xa9920),$subject=this[_0xf1e116(0x5cb)],$targets=this[_0xf1e116(0x843)],$target=this[_0xf1e116(0x3b9)]||this['_targets'][0x0];},$event=null,VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x75f)]=Game_Event[_0x41d84b(0x806)][_0x41d84b(0x329)],Game_Event[_0x41d84b(0x806)][_0x41d84b(0x329)]=function(){const _0x47bcc2=_0x41d84b;VisuMZ[_0x47bcc2(0x58f)][_0x47bcc2(0x75f)][_0x47bcc2(0x212)](this),$event=this;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x6e4)]=Scene_Map[_0x41d84b(0x806)]['update'],Scene_Map[_0x41d84b(0x806)]['update']=function(){const _0x20eaaf=_0x41d84b;VisuMZ[_0x20eaaf(0x58f)][_0x20eaaf(0x6e4)]['call'](this),$gameMap['updateCurrentEvent']();},Game_Map['prototype'][_0x41d84b(0x55d)]=function(){const _0x337b82=_0x41d84b;!this[_0x337b82(0x10f)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x4ab3f4){const _0x1ae2ec=_0x41d84b;if($gameTemp)$gameTemp[_0x1ae2ec(0x674)](_0x4ab3f4);},$onceParallel=function(_0x5bb8c7){const _0x26b4af=_0x41d84b;if(SceneManager['isSceneMap']())$scene[_0x26b4af(0x440)](_0x5bb8c7);else{if(SceneManager[_0x26b4af(0x6e9)]()){if(Imported['VisuMZ_1_BattleCore'])$scene[_0x26b4af(0x440)](_0x5bb8c7);else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x26b4af(0x915));}else $gameTemp&&$gameTemp[_0x26b4af(0x190)]()&&alert(_0x26b4af(0x247));}});;StorageManager[_0x41d84b(0x772)]=function(_0xeb5542){return new Promise((_0x5d7e59,_0xa62824)=>{const _0x397254=_0x17c6;if(_0x397254(0x904)!=='BjWQt')try{if(_0x397254(0x731)===_0x397254(0x731)){const _0x243488=pako[_0x397254(0x278)](_0xeb5542,{'to':'string','level':0x1});if(_0x243488[_0x397254(0x669)]>=0xc350){}_0x5d7e59(_0x243488);}else return _0xa15e62['layoutSettings'][_0x397254(0x8e5)]['call'](this);}catch(_0x4fe26f){_0xa62824(_0x4fe26f);}else return this;});},TextManager[_0x41d84b(0x620)]=['','','','CANCEL','','',_0x41d84b(0x8ae),'',_0x41d84b(0x871),_0x41d84b(0x24e),'','',_0x41d84b(0x15d),_0x41d84b(0x8db),_0x41d84b(0x131),'','SHIFT',_0x41d84b(0x13e),_0x41d84b(0x3cb),_0x41d84b(0x8d5),_0x41d84b(0x5b4),'KANA','EISU',_0x41d84b(0x1bc),_0x41d84b(0x244),_0x41d84b(0x88a),'',_0x41d84b(0x217),_0x41d84b(0x5f6),'NONCONVERT',_0x41d84b(0x3d3),_0x41d84b(0x346),_0x41d84b(0x627),'PGUP',_0x41d84b(0x27b),_0x41d84b(0x80b),_0x41d84b(0x595),_0x41d84b(0x5de),'UP',_0x41d84b(0x46e),_0x41d84b(0x6cc),_0x41d84b(0x4ff),_0x41d84b(0x567),'EXECUTE',_0x41d84b(0x71c),'INSERT',_0x41d84b(0x16e),'','0','1','2','3','4','5','6','7','8','9',_0x41d84b(0x181),'SEMICOLON',_0x41d84b(0x487),_0x41d84b(0x8a7),_0x41d84b(0x173),_0x41d84b(0x65d),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x41d84b(0x22b),'',_0x41d84b(0x639),'','SLEEP',_0x41d84b(0x4b3),_0x41d84b(0x37c),'NUMPAD2',_0x41d84b(0x5d2),'NUMPAD4','NUMPAD5','NUMPAD6',_0x41d84b(0x1cc),'NUMPAD8',_0x41d84b(0x7a4),_0x41d84b(0xe8),_0x41d84b(0x90f),_0x41d84b(0x788),_0x41d84b(0x1b8),'DECIMAL',_0x41d84b(0x546),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x41d84b(0x677),'F11','F12',_0x41d84b(0x33b),_0x41d84b(0x1c3),_0x41d84b(0x496),_0x41d84b(0x407),'F17',_0x41d84b(0x32e),'F19',_0x41d84b(0x662),'F21',_0x41d84b(0x231),_0x41d84b(0x186),_0x41d84b(0x1f2),'','','','','','','','',_0x41d84b(0x256),'SCROLL_LOCK',_0x41d84b(0x176),'WIN_OEM_FJ_MASSHOU','WIN_OEM_FJ_TOUROKU',_0x41d84b(0x716),_0x41d84b(0x8fb),'','','','','','','','','',_0x41d84b(0x177),'EXCLAMATION',_0x41d84b(0x4d9),_0x41d84b(0x647),_0x41d84b(0x71d),_0x41d84b(0x6c2),'AMPERSAND','UNDERSCORE',_0x41d84b(0x525),_0x41d84b(0x2ec),_0x41d84b(0x596),_0x41d84b(0x13a),'PIPE',_0x41d84b(0xf4),'OPEN_CURLY_BRACKET',_0x41d84b(0x44b),'TILDE','','','','',_0x41d84b(0x62c),_0x41d84b(0x537),'VOLUME_UP','','',_0x41d84b(0x2ff),'EQUALS',_0x41d84b(0x5ec),_0x41d84b(0x86c),_0x41d84b(0x4ec),_0x41d84b(0x738),_0x41d84b(0x660),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x41d84b(0x8a0),_0x41d84b(0x7a8),'CLOSE_BRACKET','QUOTE','',_0x41d84b(0x599),_0x41d84b(0x18f),'',_0x41d84b(0x676),_0x41d84b(0x489),'',_0x41d84b(0x460),'','',_0x41d84b(0x243),_0x41d84b(0x4fc),_0x41d84b(0x7f4),_0x41d84b(0x170),_0x41d84b(0x1bd),_0x41d84b(0x448),_0x41d84b(0x755),_0x41d84b(0x53f),_0x41d84b(0x204),_0x41d84b(0x294),'WIN_OEM_AUTO',_0x41d84b(0x135),_0x41d84b(0x445),_0x41d84b(0x90a),_0x41d84b(0x56b),_0x41d84b(0x29d),_0x41d84b(0x74f),'PLAY',_0x41d84b(0x77a),'','PA1',_0x41d84b(0x725),''],TextManager[_0x41d84b(0x8ee)]=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)]['ButtonAssist'][_0x41d84b(0x41d)],TextManager[_0x41d84b(0x103)]=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)][_0x41d84b(0x451)][_0x41d84b(0x649)],TextManager[_0x41d84b(0x66c)]=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)][_0x41d84b(0x451)][_0x41d84b(0x293)],VisuMZ['CoreEngine']['TextManager_param']=TextManager[_0x41d84b(0x222)],TextManager[_0x41d84b(0x222)]=function(_0x460d6a){const _0x5eb7e6=_0x41d84b;return typeof _0x460d6a===_0x5eb7e6(0x8b5)?VisuMZ[_0x5eb7e6(0x58f)][_0x5eb7e6(0x8b3)][_0x5eb7e6(0x212)](this,_0x460d6a):this[_0x5eb7e6(0x2f6)](_0x460d6a);},TextManager[_0x41d84b(0x2f6)]=function(_0x37cda8){const _0x4688aa=_0x41d84b;_0x37cda8=String(_0x37cda8||'')[_0x4688aa(0x2c0)]();const _0xeb327d=VisuMZ[_0x4688aa(0x58f)][_0x4688aa(0x550)][_0x4688aa(0x195)];if(_0x37cda8===_0x4688aa(0x7f9))return $dataSystem['terms'][_0x4688aa(0x2fd)][0x0];if(_0x37cda8===_0x4688aa(0x1e5))return $dataSystem[_0x4688aa(0x78c)]['params'][0x1];if(_0x37cda8===_0x4688aa(0x6e3))return $dataSystem[_0x4688aa(0x78c)][_0x4688aa(0x2fd)][0x2];if(_0x37cda8===_0x4688aa(0x748))return $dataSystem['terms'][_0x4688aa(0x2fd)][0x3];if(_0x37cda8===_0x4688aa(0x8ac))return $dataSystem['terms'][_0x4688aa(0x2fd)][0x4];if(_0x37cda8===_0x4688aa(0x515))return $dataSystem[_0x4688aa(0x78c)][_0x4688aa(0x2fd)][0x5];if(_0x37cda8===_0x4688aa(0x86e))return $dataSystem[_0x4688aa(0x78c)]['params'][0x6];if(_0x37cda8===_0x4688aa(0x4e1))return $dataSystem['terms'][_0x4688aa(0x2fd)][0x7];if(_0x37cda8===_0x4688aa(0x377))return _0xeb327d[_0x4688aa(0x1d2)];if(_0x37cda8===_0x4688aa(0x2fc))return _0xeb327d[_0x4688aa(0x743)];if(_0x37cda8===_0x4688aa(0x593))return _0xeb327d[_0x4688aa(0x1e0)];if(_0x37cda8===_0x4688aa(0x7a3))return _0xeb327d[_0x4688aa(0x5cc)];if(_0x37cda8===_0x4688aa(0x5bb))return _0xeb327d['XParamVocab4'];if(_0x37cda8==='MRF')return _0xeb327d[_0x4688aa(0x850)];if(_0x37cda8===_0x4688aa(0x216))return _0xeb327d[_0x4688aa(0x1b2)];if(_0x37cda8===_0x4688aa(0x12a))return _0xeb327d['XParamVocab7'];if(_0x37cda8===_0x4688aa(0x70e))return _0xeb327d[_0x4688aa(0x34b)];if(_0x37cda8===_0x4688aa(0x4ac))return _0xeb327d['XParamVocab9'];if(_0x37cda8==='TGR')return _0xeb327d['SParamVocab0'];if(_0x37cda8===_0x4688aa(0x3cd))return _0xeb327d['SParamVocab1'];if(_0x37cda8==='REC')return _0xeb327d['SParamVocab2'];if(_0x37cda8==='PHA')return _0xeb327d[_0x4688aa(0x6b2)];if(_0x37cda8===_0x4688aa(0x3fd))return _0xeb327d[_0x4688aa(0x258)];if(_0x37cda8==='TCR')return _0xeb327d[_0x4688aa(0x251)];if(_0x37cda8===_0x4688aa(0x2fb))return _0xeb327d[_0x4688aa(0x30b)];if(_0x37cda8===_0x4688aa(0x240))return _0xeb327d[_0x4688aa(0x230)];if(_0x37cda8===_0x4688aa(0x1ad))return _0xeb327d['SParamVocab8'];if(_0x37cda8===_0x4688aa(0x25c))return _0xeb327d[_0x4688aa(0x17a)];if(VisuMZ[_0x4688aa(0x58f)][_0x4688aa(0x128)][_0x37cda8])return VisuMZ[_0x4688aa(0x58f)][_0x4688aa(0x128)][_0x37cda8];return'';},TextManager[_0x41d84b(0x2e1)]=function(_0x215fd3){const _0x513f54=_0x41d84b,_0x3d9128=Input['getLastUsedGamepadType']();return _0x3d9128===_0x513f54(0x296)?'YSZcX'!==_0x513f54(0x320)?this['getKeyboardInputButtonString'](_0x215fd3):_0x52bc34[_0x513f54(0x540)]['CategoryRect'][_0x513f54(0x212)](this):this[_0x513f54(0x391)](_0x3d9128,_0x215fd3);},TextManager[_0x41d84b(0x87f)]=function(_0x50999e){const _0x1834fc=_0x41d84b;if(_0x50999e===_0x1834fc(0x658))_0x50999e=_0x1834fc(0x183);if(_0x50999e===_0x1834fc(0x224))_0x50999e=_0x1834fc(0x183);let _0x24bdba=[];for(let _0x35d2cd in Input[_0x1834fc(0x5fc)]){if(_0x1834fc(0x7cf)===_0x1834fc(0x7cf)){_0x35d2cd=Number(_0x35d2cd);if(_0x35d2cd>=0x60&&_0x35d2cd<=0x69)continue;if([0x12,0x20][_0x1834fc(0x4c8)](_0x35d2cd))continue;_0x50999e===Input[_0x1834fc(0x5fc)][_0x35d2cd]&&(_0x1834fc(0x200)!==_0x1834fc(0x443)?_0x24bdba['push'](_0x35d2cd):_0x500cec=_0x1834fc(0x2c4)[_0x1834fc(0x125)](_0x3e005d,_0x59a060));}else this[_0x1834fc(0x67e)](),this[_0x1834fc(0x57a)](),_0x5c58f0['CoreEngine']['Spriteset_Base_destroy']['call'](this,_0x5a2887);}for(let _0x3de0c7=0x0;_0x3de0c7<_0x24bdba['length'];_0x3de0c7++){_0x24bdba[_0x3de0c7]=TextManager[_0x1834fc(0x620)][_0x24bdba[_0x3de0c7]];}return this[_0x1834fc(0x6ce)](_0x24bdba);},TextManager[_0x41d84b(0x6ce)]=function(_0x12d627){const _0x35eaae=_0x41d84b,_0x3f6457=VisuMZ[_0x35eaae(0x58f)][_0x35eaae(0x550)][_0x35eaae(0x451)],_0x2e4e4e=_0x3f6457['KeyUnlisted'],_0x20d302=_0x12d627[_0x35eaae(0x484)](),_0x4a22fe=_0x35eaae(0x726)[_0x35eaae(0x125)](_0x20d302);return _0x3f6457[_0x4a22fe]?_0x3f6457[_0x4a22fe]:_0x2e4e4e[_0x35eaae(0x125)](_0x20d302);},TextManager['getInputMultiButtonStrings']=function(_0x3aa3e7,_0x585ab0){const _0x6ec7ae=_0x41d84b,_0x1aa918=VisuMZ[_0x6ec7ae(0x58f)][_0x6ec7ae(0x550)][_0x6ec7ae(0x451)],_0x2a2af9=_0x1aa918['MultiKeyFmt'],_0x450a06=this[_0x6ec7ae(0x2e1)](_0x3aa3e7),_0x529056=this['getInputButtonString'](_0x585ab0);return _0x2a2af9[_0x6ec7ae(0x125)](_0x450a06,_0x529056);},TextManager['getControllerInputButtonString']=function(_0x58142c,_0x53ce10){const _0x3ba831=_0x41d84b,_0x36ff1f=_0x58142c[_0x3ba831(0x403)]()[_0x3ba831(0x242)](),_0x1e6e99=VisuMZ[_0x3ba831(0x58f)]['ControllerButtons'][_0x36ff1f];if(!_0x1e6e99)return this[_0x3ba831(0x6a7)](_0x58142c,_0x53ce10);return _0x1e6e99[_0x53ce10]||this[_0x3ba831(0x87f)](_0x58142c,_0x53ce10);},TextManager[_0x41d84b(0x6a7)]=function(_0x193a2a,_0x33bb84){const _0x231276=_0x41d84b,_0x215830=_0x193a2a[_0x231276(0x403)]()[_0x231276(0x242)]();for(const _0x8ea526 in VisuMZ[_0x231276(0x58f)][_0x231276(0x437)]){if(_0x215830[_0x231276(0x4c8)](_0x8ea526)){const _0x3adaad=VisuMZ[_0x231276(0x58f)][_0x231276(0x437)][_0x8ea526],_0x4f0aea=VisuMZ[_0x231276(0x58f)][_0x231276(0x830)][_0x3adaad];return _0x4f0aea[_0x33bb84]||this[_0x231276(0x87f)](_0x33bb84);}}return this[_0x231276(0x87f)](_0x33bb84);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x793)]=ColorManager[_0x41d84b(0x31c)],ColorManager[_0x41d84b(0x31c)]=function(){const _0x5c3559=_0x41d84b;VisuMZ[_0x5c3559(0x58f)][_0x5c3559(0x793)][_0x5c3559(0x212)](this),this[_0x5c3559(0x3d7)]=this['_colorCache']||{};},ColorManager[_0x41d84b(0x5df)]=function(_0x7393a4,_0x297480){const _0x250151=_0x41d84b;_0x297480=String(_0x297480),this[_0x250151(0x3d7)]=this[_0x250151(0x3d7)]||{};if(_0x297480['match'](/#(.*)/i))this[_0x250151(0x3d7)][_0x7393a4]='#%1'[_0x250151(0x125)](String(RegExp['$1']));else{if(_0x250151(0x5c7)!==_0x250151(0x5c7))return _0xa71f4b[_0x250151(0x58f)]['UpdatePictureCoordinates']();else this[_0x250151(0x3d7)][_0x7393a4]=this['textColor'](Number(_0x297480));}return this[_0x250151(0x3d7)][_0x7393a4];},ColorManager[_0x41d84b(0x24c)]=function(_0x927b52){const _0x1226e8=_0x41d84b;_0x927b52=String(_0x927b52);if(_0x927b52[_0x1226e8(0x5a2)](/#(.*)/i)){if(_0x1226e8(0x801)===_0x1226e8(0x7e3))_0x11348b[_0x1226e8(0x58f)]['Scene_Base_createWindowLayer'][_0x1226e8(0x212)](this),this[_0x1226e8(0x3b4)](),this[_0x1226e8(0x399)]['x']=_0x3f825d[_0x1226e8(0x7f6)](this[_0x1226e8(0x399)]['x']),this[_0x1226e8(0x399)]['y']=_0x4e58a4[_0x1226e8(0x7f6)](this[_0x1226e8(0x399)]['y']);else return'#%1'[_0x1226e8(0x125)](String(RegExp['$1']));}else return _0x1226e8(0x1f8)===_0x1226e8(0x83b)?0x0:this['textColor'](Number(_0x927b52));},ColorManager[_0x41d84b(0x4ef)]=function(){const _0x306c9f=_0x41d84b;this[_0x306c9f(0x3d7)]={};},ColorManager[_0x41d84b(0x753)]=function(){const _0x331e63=_0x41d84b,_0x3a2296=_0x331e63(0x732);this[_0x331e63(0x3d7)]=this[_0x331e63(0x3d7)]||{};if(this[_0x331e63(0x3d7)][_0x3a2296])return this['_colorCache'][_0x3a2296];const _0x3cf4dd=VisuMZ[_0x331e63(0x58f)][_0x331e63(0x550)]['Color']['ColorNormal'];return this[_0x331e63(0x5df)](_0x3a2296,_0x3cf4dd);},ColorManager['systemColor']=function(){const _0x436d0b=_0x41d84b,_0x567dc1=_0x436d0b(0x6c5);this[_0x436d0b(0x3d7)]=this['_colorCache']||{};if(this[_0x436d0b(0x3d7)][_0x567dc1])return this[_0x436d0b(0x3d7)][_0x567dc1];const _0x31aaa7=VisuMZ[_0x436d0b(0x58f)]['Settings']['Color'][_0x436d0b(0x4a4)];return this[_0x436d0b(0x5df)](_0x567dc1,_0x31aaa7);},ColorManager[_0x41d84b(0x511)]=function(){const _0x2cb08d=_0x41d84b,_0x2a3e5b=_0x2cb08d(0x521);this[_0x2cb08d(0x3d7)]=this[_0x2cb08d(0x3d7)]||{};if(this['_colorCache'][_0x2a3e5b])return this['_colorCache'][_0x2a3e5b];const _0x35a42b=VisuMZ[_0x2cb08d(0x58f)][_0x2cb08d(0x550)][_0x2cb08d(0x664)][_0x2cb08d(0x2ea)];return this[_0x2cb08d(0x5df)](_0x2a3e5b,_0x35a42b);},ColorManager[_0x41d84b(0x74d)]=function(){const _0x529f7e=_0x41d84b,_0x4c34f9='_stored_deathColor';this[_0x529f7e(0x3d7)]=this[_0x529f7e(0x3d7)]||{};if(this[_0x529f7e(0x3d7)][_0x4c34f9])return this[_0x529f7e(0x3d7)][_0x4c34f9];const _0x116ac6=VisuMZ[_0x529f7e(0x58f)][_0x529f7e(0x550)]['Color'][_0x529f7e(0x2d7)];return this[_0x529f7e(0x5df)](_0x4c34f9,_0x116ac6);},ColorManager['gaugeBackColor']=function(){const _0x448eb5=_0x41d84b,_0x360ffc='_stored_gaugeBackColor';this[_0x448eb5(0x3d7)]=this[_0x448eb5(0x3d7)]||{};if(this[_0x448eb5(0x3d7)][_0x360ffc])return this['_colorCache'][_0x360ffc];const _0x88378c=VisuMZ[_0x448eb5(0x58f)][_0x448eb5(0x550)][_0x448eb5(0x664)][_0x448eb5(0x659)];return this[_0x448eb5(0x5df)](_0x360ffc,_0x88378c);},ColorManager[_0x41d84b(0x28f)]=function(){const _0x4fbb14=_0x41d84b,_0xd04ef4=_0x4fbb14(0x299);this['_colorCache']=this[_0x4fbb14(0x3d7)]||{};if(this[_0x4fbb14(0x3d7)][_0xd04ef4])return this[_0x4fbb14(0x3d7)][_0xd04ef4];const _0x5e94e9=VisuMZ[_0x4fbb14(0x58f)][_0x4fbb14(0x550)][_0x4fbb14(0x664)][_0x4fbb14(0x314)];return this['getColorDataFromPluginParameters'](_0xd04ef4,_0x5e94e9);},ColorManager['hpGaugeColor2']=function(){const _0x325a59=_0x41d84b,_0x1c2b69=_0x325a59(0x1d3);this[_0x325a59(0x3d7)]=this['_colorCache']||{};if(this[_0x325a59(0x3d7)][_0x1c2b69])return this[_0x325a59(0x3d7)][_0x1c2b69];const _0x5ea6af=VisuMZ[_0x325a59(0x58f)]['Settings'][_0x325a59(0x664)][_0x325a59(0x3bc)];return this[_0x325a59(0x5df)](_0x1c2b69,_0x5ea6af);},ColorManager[_0x41d84b(0x26c)]=function(){const _0x394265=_0x41d84b,_0x4208a2=_0x394265(0x700);this[_0x394265(0x3d7)]=this['_colorCache']||{};if(this[_0x394265(0x3d7)][_0x4208a2])return this[_0x394265(0x3d7)][_0x4208a2];const _0x9888d9=VisuMZ[_0x394265(0x58f)][_0x394265(0x550)]['Color'][_0x394265(0x2aa)];return this[_0x394265(0x5df)](_0x4208a2,_0x9888d9);},ColorManager['mpGaugeColor2']=function(){const _0x4a85f6=_0x41d84b,_0x5b3f63=_0x4a85f6(0x30f);this[_0x4a85f6(0x3d7)]=this['_colorCache']||{};if(this[_0x4a85f6(0x3d7)][_0x5b3f63])return this[_0x4a85f6(0x3d7)][_0x5b3f63];const _0x58f668=VisuMZ[_0x4a85f6(0x58f)]['Settings'][_0x4a85f6(0x664)][_0x4a85f6(0x340)];return this[_0x4a85f6(0x5df)](_0x5b3f63,_0x58f668);},ColorManager[_0x41d84b(0x5e4)]=function(){const _0x5a3cc6=_0x41d84b,_0x3d067e='_stored_mpCostColor';this[_0x5a3cc6(0x3d7)]=this[_0x5a3cc6(0x3d7)]||{};if(this['_colorCache'][_0x3d067e])return this[_0x5a3cc6(0x3d7)][_0x3d067e];const _0x3c2059=VisuMZ[_0x5a3cc6(0x58f)][_0x5a3cc6(0x550)][_0x5a3cc6(0x664)][_0x5a3cc6(0x81b)];return this[_0x5a3cc6(0x5df)](_0x3d067e,_0x3c2059);},ColorManager[_0x41d84b(0x5bf)]=function(){const _0x420e2b=_0x41d84b,_0x597014=_0x420e2b(0x5f7);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x597014])return this[_0x420e2b(0x3d7)][_0x597014];const _0xf57b49=VisuMZ['CoreEngine']['Settings']['Color'][_0x420e2b(0x767)];return this['getColorDataFromPluginParameters'](_0x597014,_0xf57b49);},ColorManager['powerDownColor']=function(){const _0x42d628=_0x41d84b,_0x527afc=_0x42d628(0x4ed);this[_0x42d628(0x3d7)]=this[_0x42d628(0x3d7)]||{};if(this[_0x42d628(0x3d7)][_0x527afc])return this[_0x42d628(0x3d7)][_0x527afc];const _0x1a2748=VisuMZ[_0x42d628(0x58f)][_0x42d628(0x550)][_0x42d628(0x664)][_0x42d628(0x49a)];return this[_0x42d628(0x5df)](_0x527afc,_0x1a2748);},ColorManager[_0x41d84b(0x566)]=function(){const _0x102009=_0x41d84b,_0x241a74=_0x102009(0x401);this[_0x102009(0x3d7)]=this[_0x102009(0x3d7)]||{};if(this[_0x102009(0x3d7)][_0x241a74])return this[_0x102009(0x3d7)][_0x241a74];const _0x42cd1d=VisuMZ[_0x102009(0x58f)]['Settings']['Color'][_0x102009(0x4ca)];return this['getColorDataFromPluginParameters'](_0x241a74,_0x42cd1d);},ColorManager['ctGaugeColor2']=function(){const _0x478713=_0x41d84b,_0x4557b1=_0x478713(0x5ca);this[_0x478713(0x3d7)]=this[_0x478713(0x3d7)]||{};if(this[_0x478713(0x3d7)][_0x4557b1])return this[_0x478713(0x3d7)][_0x4557b1];const _0x4db795=VisuMZ['CoreEngine'][_0x478713(0x550)]['Color'][_0x478713(0x2b5)];return this[_0x478713(0x5df)](_0x4557b1,_0x4db795);},ColorManager[_0x41d84b(0x7d2)]=function(){const _0x33fd20=_0x41d84b,_0x58eaa6=_0x33fd20(0x611);this[_0x33fd20(0x3d7)]=this[_0x33fd20(0x3d7)]||{};if(this[_0x33fd20(0x3d7)][_0x58eaa6])return this[_0x33fd20(0x3d7)][_0x58eaa6];const _0x3a9b0d=VisuMZ['CoreEngine'][_0x33fd20(0x550)][_0x33fd20(0x664)][_0x33fd20(0x8e2)];return this[_0x33fd20(0x5df)](_0x58eaa6,_0x3a9b0d);},ColorManager['tpGaugeColor2']=function(){const _0x3bc913=_0x41d84b,_0x482fb3='_stored_tpGaugeColor2';this[_0x3bc913(0x3d7)]=this[_0x3bc913(0x3d7)]||{};if(this[_0x3bc913(0x3d7)][_0x482fb3])return this[_0x3bc913(0x3d7)][_0x482fb3];const _0x4a3b0c=VisuMZ[_0x3bc913(0x58f)]['Settings'][_0x3bc913(0x664)][_0x3bc913(0x375)];return this[_0x3bc913(0x5df)](_0x482fb3,_0x4a3b0c);},ColorManager[_0x41d84b(0x57c)]=function(){const _0x26ec59=_0x41d84b,_0x1b9a51=_0x26ec59(0x6a2);this[_0x26ec59(0x3d7)]=this[_0x26ec59(0x3d7)]||{};if(this[_0x26ec59(0x3d7)][_0x1b9a51])return this[_0x26ec59(0x3d7)][_0x1b9a51];const _0x117772=VisuMZ[_0x26ec59(0x58f)][_0x26ec59(0x550)]['Color']['ColorTPCost'];return this['getColorDataFromPluginParameters'](_0x1b9a51,_0x117772);},ColorManager[_0x41d84b(0x6b7)]=function(){const _0x1350b8=_0x41d84b,_0x529066=_0x1350b8(0x7e4);this[_0x1350b8(0x3d7)]=this[_0x1350b8(0x3d7)]||{};if(this['_colorCache'][_0x529066])return this[_0x1350b8(0x3d7)][_0x529066];const _0x2cb3cf=VisuMZ[_0x1350b8(0x58f)][_0x1350b8(0x550)][_0x1350b8(0x664)][_0x1350b8(0x86f)];return this[_0x1350b8(0x5df)](_0x529066,_0x2cb3cf);},ColorManager[_0x41d84b(0x661)]=function(){const _0x440600=_0x41d84b,_0x512638=_0x440600(0x5d5);this[_0x440600(0x3d7)]=this[_0x440600(0x3d7)]||{};if(this['_colorCache'][_0x512638])return this[_0x440600(0x3d7)][_0x512638];const _0x5c3c96=VisuMZ[_0x440600(0x58f)]['Settings']['Color'][_0x440600(0x5b3)];return this[_0x440600(0x5df)](_0x512638,_0x5c3c96);},ColorManager[_0x41d84b(0x47c)]=function(){const _0x5da0c5=_0x41d84b,_0x450edc='_stored_expGaugeColor2';this[_0x5da0c5(0x3d7)]=this['_colorCache']||{};if(this[_0x5da0c5(0x3d7)][_0x450edc])return this['_colorCache'][_0x450edc];const _0x3752d6=VisuMZ['CoreEngine'][_0x5da0c5(0x550)][_0x5da0c5(0x664)][_0x5da0c5(0x790)];return this['getColorDataFromPluginParameters'](_0x450edc,_0x3752d6);},ColorManager['maxLvGaugeColor1']=function(){const _0x3ad297=_0x41d84b,_0x16f0ee=_0x3ad297(0x17b);this['_colorCache']=this[_0x3ad297(0x3d7)]||{};if(this[_0x3ad297(0x3d7)][_0x16f0ee])return this[_0x3ad297(0x3d7)][_0x16f0ee];const _0x3a2ead=VisuMZ[_0x3ad297(0x58f)][_0x3ad297(0x550)]['Color'][_0x3ad297(0x33a)];return this[_0x3ad297(0x5df)](_0x16f0ee,_0x3a2ead);},ColorManager['maxLvGaugeColor2']=function(){const _0x1be33b=_0x41d84b,_0x50ab69='_stored_maxLvGaugeColor2';this[_0x1be33b(0x3d7)]=this[_0x1be33b(0x3d7)]||{};if(this['_colorCache'][_0x50ab69])return this['_colorCache'][_0x50ab69];const _0x1b0bf4=VisuMZ['CoreEngine'][_0x1be33b(0x550)][_0x1be33b(0x664)][_0x1be33b(0x10e)];return this['getColorDataFromPluginParameters'](_0x50ab69,_0x1b0bf4);},ColorManager[_0x41d84b(0x4b9)]=function(_0x50d8fe){const _0xd901b4=_0x41d84b;return VisuMZ[_0xd901b4(0x58f)][_0xd901b4(0x550)][_0xd901b4(0x664)][_0xd901b4(0x1a5)][_0xd901b4(0x212)](this,_0x50d8fe);},ColorManager['mpColor']=function(_0x337460){const _0x37bfbd=_0x41d84b;return VisuMZ[_0x37bfbd(0x58f)]['Settings'][_0x37bfbd(0x664)][_0x37bfbd(0x7b7)][_0x37bfbd(0x212)](this,_0x337460);},ColorManager[_0x41d84b(0x2d1)]=function(_0x43c1b1){const _0x6fba9f=_0x41d84b;return VisuMZ[_0x6fba9f(0x58f)][_0x6fba9f(0x550)][_0x6fba9f(0x664)][_0x6fba9f(0x60d)]['call'](this,_0x43c1b1);},ColorManager['paramchangeTextColor']=function(_0x17e38b){const _0x3827a6=_0x41d84b;return VisuMZ[_0x3827a6(0x58f)][_0x3827a6(0x550)][_0x3827a6(0x664)][_0x3827a6(0x5be)][_0x3827a6(0x212)](this,_0x17e38b);},ColorManager[_0x41d84b(0x8a5)]=function(_0x577e07){const _0x1c2efb=_0x41d84b;return VisuMZ[_0x1c2efb(0x58f)][_0x1c2efb(0x550)][_0x1c2efb(0x664)][_0x1c2efb(0x8de)][_0x1c2efb(0x212)](this,_0x577e07);},ColorManager[_0x41d84b(0x20b)]=function(){const _0x2dcaa4=_0x41d84b;return VisuMZ[_0x2dcaa4(0x58f)][_0x2dcaa4(0x550)]['Color'][_0x2dcaa4(0x1da)];},ColorManager[_0x41d84b(0x193)]=function(){const _0x1a4708=_0x41d84b;return VisuMZ['CoreEngine'][_0x1a4708(0x550)][_0x1a4708(0x664)][_0x1a4708(0x1ce)]||_0x1a4708(0x22f);},ColorManager[_0x41d84b(0x47d)]=function(){const _0x462b7c=_0x41d84b;return VisuMZ[_0x462b7c(0x58f)][_0x462b7c(0x550)][_0x462b7c(0x664)]['OutlineColorGauge']||_0x462b7c(0x124);},ColorManager[_0x41d84b(0x109)]=function(){const _0x245b41=_0x41d84b;return VisuMZ[_0x245b41(0x58f)][_0x245b41(0x550)][_0x245b41(0x664)][_0x245b41(0x6c4)];},ColorManager[_0x41d84b(0x6a5)]=function(){const _0x2eb8ad=_0x41d84b;return VisuMZ[_0x2eb8ad(0x58f)]['Settings'][_0x2eb8ad(0x664)][_0x2eb8ad(0x814)];},ColorManager['itemBackColor1']=function(){const _0x348f7e=_0x41d84b;return VisuMZ[_0x348f7e(0x58f)][_0x348f7e(0x550)][_0x348f7e(0x664)][_0x348f7e(0x72a)];},ColorManager[_0x41d84b(0x2b1)]=function(){const _0x3765da=_0x41d84b;return VisuMZ[_0x3765da(0x58f)]['Settings'][_0x3765da(0x664)]['ItemBackColor2'];},SceneManager[_0x41d84b(0x161)]=[],SceneManager[_0x41d84b(0x6e9)]=function(){const _0x4fb6d5=_0x41d84b;return this[_0x4fb6d5(0x512)]&&this[_0x4fb6d5(0x512)][_0x4fb6d5(0x45d)]===Scene_Battle;},SceneManager[_0x41d84b(0x215)]=function(){const _0x30e243=_0x41d84b;return this[_0x30e243(0x512)]&&this['_scene'][_0x30e243(0x45d)]===Scene_Map;},SceneManager[_0x41d84b(0x441)]=function(){const _0x5e44d4=_0x41d84b;return this[_0x5e44d4(0x512)]&&this[_0x5e44d4(0x512)]instanceof Scene_Map;},VisuMZ[_0x41d84b(0x58f)]['SceneManager_initialize']=SceneManager[_0x41d84b(0x3e9)],SceneManager[_0x41d84b(0x3e9)]=function(){const _0x36f5d9=_0x41d84b;VisuMZ[_0x36f5d9(0x58f)][_0x36f5d9(0xdf)][_0x36f5d9(0x212)](this),this[_0x36f5d9(0x42a)]();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x162)]=SceneManager[_0x41d84b(0x715)],SceneManager[_0x41d84b(0x715)]=function(_0x1d1daf){const _0x3b9360=_0x41d84b;if($gameTemp)this[_0x3b9360(0x62d)](_0x1d1daf);VisuMZ[_0x3b9360(0x58f)][_0x3b9360(0x162)][_0x3b9360(0x212)](this,_0x1d1daf);},SceneManager[_0x41d84b(0x62d)]=function(_0x1dfdda){const _0x13fb0c=_0x41d84b;if(!_0x1dfdda['ctrlKey']&&!_0x1dfdda[_0x13fb0c(0x679)])switch(_0x1dfdda[_0x13fb0c(0x6c6)]){case 0x54:this['playTestCtrlT']();break;case 0x75:this[_0x13fb0c(0x4fb)]();break;case 0x76:if(Input[_0x13fb0c(0x11c)](_0x13fb0c(0x831))||Input[_0x13fb0c(0x11c)](_0x13fb0c(0x4bd)))return;this[_0x13fb0c(0x415)]();break;}},SceneManager[_0x41d84b(0x4fb)]=function(){const _0x212af6=_0x41d84b;if($gameTemp[_0x212af6(0x190)]()&&VisuMZ[_0x212af6(0x58f)]['Settings'][_0x212af6(0x1bb)][_0x212af6(0x4d2)]){if(_0x212af6(0x6e5)===_0x212af6(0x6e5)){if(ConfigManager['seVolume']!==0x0){if(_0x212af6(0x271)!==_0x212af6(0x271)){if(_0x9b97b0['_forcedTroopView']==='SV')return!![];else{if(_0x5beb7d['_forcedTroopView']==='FV')return![];}if(this[_0x212af6(0x5fb)]===_0x1884f4)this[_0x212af6(0x914)]();if(this[_0x212af6(0x5fb)][_0x212af6(0x140)]===_0x376d27)this[_0x212af6(0x914)]();return this[_0x212af6(0x5fb)][_0x212af6(0x140)];}else ConfigManager['bgmVolume']=0x0,ConfigManager[_0x212af6(0x36a)]=0x0,ConfigManager['meVolume']=0x0,ConfigManager['seVolume']=0x0;}else'wwYgh'===_0x212af6(0x6d7)?_0x10d08b[_0x212af6(0x58f)][_0x212af6(0x52e)][_0x212af6(0x212)](this):(ConfigManager[_0x212af6(0x880)]=0x64,ConfigManager[_0x212af6(0x36a)]=0x64,ConfigManager[_0x212af6(0x2f2)]=0x64,ConfigManager[_0x212af6(0x250)]=0x64);ConfigManager[_0x212af6(0x3ac)]();if(this[_0x212af6(0x512)][_0x212af6(0x45d)]===Scene_Options){if(_0x212af6(0x18d)===_0x212af6(0x18d)){if(this[_0x212af6(0x512)]['_optionsWindow'])this[_0x212af6(0x512)][_0x212af6(0x54d)][_0x212af6(0x427)]();if(this[_0x212af6(0x512)][_0x212af6(0x12f)])this[_0x212af6(0x512)][_0x212af6(0x12f)][_0x212af6(0x427)]();}else return _0x19d87d[_0x212af6(0x6c8)]['call'](this);}}else _0x59bd72[_0x212af6(0x54c)]['font-smooth']=_0x212af6(0x80d);}},SceneManager['playTestF7']=function(){const _0xa5e317=_0x41d84b;$gameTemp['isPlaytest']()&&VisuMZ[_0xa5e317(0x58f)][_0xa5e317(0x550)][_0xa5e317(0x1bb)][_0xa5e317(0x2e5)]&&(_0xa5e317(0x49d)!==_0xa5e317(0x49d)?this[_0xa5e317(0x42b)]='FV':$gameTemp[_0xa5e317(0x3a2)]=!$gameTemp[_0xa5e317(0x3a2)]);},SceneManager[_0x41d84b(0xfd)]=function(){const _0x230e91=_0x41d84b;if(!$gameTemp[_0x230e91(0x190)]())return;if(!SceneManager[_0x230e91(0x6e9)]())return;for(const _0xf721f3 of $gameParty[_0x230e91(0x69c)]()){if(!_0xf721f3)continue;_0xf721f3[_0x230e91(0x50b)](_0xf721f3[_0x230e91(0x73e)]());}},SceneManager[_0x41d84b(0x42a)]=function(){const _0x17ff81=_0x41d84b;this[_0x17ff81(0x5e9)]=![],this[_0x17ff81(0x5d7)]=!VisuMZ['CoreEngine'][_0x17ff81(0x550)]['UI'][_0x17ff81(0x5c8)];},SceneManager['setSideButtonLayout']=function(_0x4ff422){const _0x255b86=_0x41d84b;VisuMZ[_0x255b86(0x58f)][_0x255b86(0x550)]['UI'][_0x255b86(0xd7)]&&(this['_sideButtonLayout']=_0x4ff422);},SceneManager['isSideButtonLayout']=function(){const _0x3eef77=_0x41d84b;return this[_0x3eef77(0x5e9)];},SceneManager[_0x41d84b(0x85a)]=function(){return this['_hideButtons'];},SceneManager[_0x41d84b(0x20d)]=function(){const _0x2f27f1=_0x41d84b;return this['areButtonsHidden']()||this[_0x2f27f1(0x8e3)]();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x332)]=SceneManager['isGameActive'],SceneManager[_0x41d84b(0x5ea)]=function(){const _0x1267bb=_0x41d84b;return VisuMZ[_0x1267bb(0x58f)]['Settings'][_0x1267bb(0x1bb)][_0x1267bb(0x38f)]?VisuMZ[_0x1267bb(0x58f)][_0x1267bb(0x332)][_0x1267bb(0x212)](this):_0x1267bb(0x7d7)==='lKutb'?this[_0x1267bb(0x6d3)]()?this[_0x1267bb(0x254)][_0x1267bb(0x3e7)](_0x2dbc45):_0x4484d5[_0x1267bb(0x806)]['textWidth'][_0x1267bb(0x212)](this,_0x23a56a):!![];},SceneManager[_0x41d84b(0x563)]=function(_0x2741a9){const _0x12cda3=_0x41d84b;if(_0x2741a9 instanceof Error)'vZaHV'===_0x12cda3(0x912)?this['catchNormalError'](_0x2741a9):(_0x14c4c2[_0x12cda3(0x58f)][_0x12cda3(0x172)][_0x12cda3(0x212)](this),this[_0x12cda3(0x433)]());else _0x2741a9 instanceof Array&&_0x2741a9[0x0]===_0x12cda3(0x4de)?this[_0x12cda3(0x1b6)](_0x2741a9):this[_0x12cda3(0x605)](_0x2741a9);this[_0x12cda3(0x618)]();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x221)]=BattleManager[_0x41d84b(0x369)],BattleManager['processEscape']=function(){const _0x325cfc=_0x41d84b;if(VisuMZ['CoreEngine']['Settings'][_0x325cfc(0x1bb)][_0x325cfc(0x3f1)])this[_0x325cfc(0x7ec)]();else return VisuMZ[_0x325cfc(0x58f)][_0x325cfc(0x221)][_0x325cfc(0x212)](this);},BattleManager[_0x41d84b(0x7ec)]=function(){const _0x5dbda4=_0x41d84b;return $gameParty[_0x5dbda4(0x809)](),SoundManager[_0x5dbda4(0x5e0)](),this[_0x5dbda4(0x2ed)](),!![];},BattleManager[_0x41d84b(0x459)]=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager[_0x41d84b(0x5a9)]=function(){return $gameSystem['getBattleSystem']()===0x1;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x534)]=Game_Temp[_0x41d84b(0x806)]['initialize'],Game_Temp[_0x41d84b(0x806)][_0x41d84b(0x3e9)]=function(){const _0x5a7b99=_0x41d84b;VisuMZ[_0x5a7b99(0x58f)]['Game_Temp_initialize']['call'](this),this['forceOutOfPlaytest'](),this[_0x5a7b99(0x3b1)](),this[_0x5a7b99(0x686)]();},Game_Temp[_0x41d84b(0x806)]['forceOutOfPlaytest']=function(){const _0x4000ea=_0x41d84b;VisuMZ[_0x4000ea(0x58f)]['Settings'][_0x4000ea(0x1bb)]['ForceNoPlayTest']&&('Cplcq'!==_0x4000ea(0x1e1)?this['_isPlaytest']=![]:_0x5b8fdc[_0x4000ea(0x754)]());},Game_Temp['prototype']['setLastPluginCommandInterpreter']=function(_0x4db2fe){const _0xebd5c6=_0x41d84b;this[_0xebd5c6(0x368)]=_0x4db2fe;},Game_Temp[_0x41d84b(0x806)][_0x41d84b(0x7eb)]=function(){const _0x35a51c=_0x41d84b;return this[_0x35a51c(0x368)];},Game_Temp[_0x41d84b(0x806)][_0x41d84b(0x872)]=function(){const _0x2cd169=_0x41d84b;this[_0x2cd169(0x42b)]=undefined,this[_0x2cd169(0x1b0)]=undefined;},Game_Temp[_0x41d84b(0x806)][_0x41d84b(0x3a8)]=function(_0xf7267b){const _0x31d681=_0x41d84b;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x31d681(0x4c3)]($dataMap[_0x31d681(0x326)]);const _0x4fb79c=$dataTroops[_0xf7267b];if(_0x4fb79c){let _0xb33f83=DataManager[_0x31d681(0x57f)](_0x4fb79c['id']);this[_0x31d681(0x4c3)](_0xb33f83);}},Game_Temp[_0x41d84b(0x806)]['parseForcedGameTroopSettingsCoreEngine']=function(_0x54de7e){const _0x3f2ace=_0x41d84b;if(!_0x54de7e)return;if(_0x54de7e[_0x3f2ace(0x5a2)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x3f2ace(0x42b)]='FV';else{if(_0x54de7e[_0x3f2ace(0x5a2)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))_0x3f2ace(0x805)!==_0x3f2ace(0x8df)?this[_0x3f2ace(0x42b)]='SV':(this[_0x3f2ace(0x42d)]=_0x25e81d(_0x24ee26(this[_0x3f2ace(0x42d)])[_0x3f2ace(0x42f)](0x0,-0x1)),this[_0x3f2ace(0x42d)]=_0x1611c2[_0x3f2ace(0x81e)](0x0,this[_0x3f2ace(0x42d)]),_0x4ea115[_0x3f2ace(0x4df)](),this[_0x3f2ace(0x427)](),_0x183ec2[_0x3f2ace(0x591)](),this['select'](this[_0x3f2ace(0x1e8)]-0x1));else{if(_0x54de7e[_0x3f2ace(0x5a2)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x9c85d3=String(RegExp['$1']);if(_0x9c85d3[_0x3f2ace(0x5a2)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x3f2ace(0x42b)]='FV';else{if(_0x9c85d3[_0x3f2ace(0x5a2)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)){if(_0x3f2ace(0x714)==='KaqDN')this[_0x3f2ace(0x42b)]='SV';else return _0x1e0e5e[_0x3f2ace(0x58f)][_0x3f2ace(0x550)][_0x3f2ace(0x1bb)][_0x3f2ace(0x2f4)];}}}}}if(_0x54de7e['match'](/<(?:DTB)>/i)){if(_0x3f2ace(0x8bc)!==_0x3f2ace(0x6fb))this[_0x3f2ace(0x1b0)]=0x0;else return this[_0x3f2ace(0x284)][_0x3f2ace(0x669)]>0x0;}else{if(_0x54de7e[_0x3f2ace(0x5a2)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x3f2ace(0x1b0)]=0x1;else{if(_0x54de7e[_0x3f2ace(0x5a2)](/<(?:TPB|ATB)[ ]WAIT>/i)){if(_0x3f2ace(0x88b)!==_0x3f2ace(0x761))this[_0x3f2ace(0x1b0)]=0x2;else{for(const _0x25c8a5 of this[_0x3f2ace(0x284)]){!_0x25c8a5[_0x3f2ace(0x11d)]()&&this['removePointAnimation'](_0x25c8a5);}this[_0x3f2ace(0x842)]();}}else{if(_0x54de7e[_0x3f2ace(0x5a2)](/<(?:CTB)>/i)){if(_0x3f2ace(0x480)===_0x3f2ace(0x7c1))return _0xb53d49[_0x3f2ace(0x540)][_0x3f2ace(0x473)][_0x3f2ace(0x212)](this);else Imported[_0x3f2ace(0x466)]&&(this[_0x3f2ace(0x1b0)]=_0x3f2ace(0x267));}else{if(_0x54de7e[_0x3f2ace(0x5a2)](/<(?:STB)>/i))Imported[_0x3f2ace(0xf7)]&&('bnMrV'===_0x3f2ace(0x4f9)?this[_0x3f2ace(0x852)][_0x3f2ace(0x325)](_0x1d4e41['layoutSettings'][_0x3f2ace(0x8ed)]):this[_0x3f2ace(0x1b0)]='STB');else{if(_0x54de7e[_0x3f2ace(0x5a2)](/<(?:BTB)>/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x3f2ace(0x1b0)]=_0x3f2ace(0x467));else{if(_0x54de7e[_0x3f2ace(0x5a2)](/<(?:FTB)>/i))Imported[_0x3f2ace(0x863)]&&(this[_0x3f2ace(0x1b0)]=_0x3f2ace(0x233));else{if(_0x54de7e['match'](/<(?:OTB)>/i))Imported[_0x3f2ace(0x2e8)]&&(this['_forcedBattleSys']=_0x3f2ace(0x3ee));else{if(_0x54de7e[_0x3f2ace(0x5a2)](/<(?:ETB)>/i)){if(Imported[_0x3f2ace(0x88d)]){if(_0x3f2ace(0x6e6)===_0x3f2ace(0x6e6))this[_0x3f2ace(0x1b0)]=_0x3f2ace(0x104);else{var _0x5305f8=_0x3f4c2a(_0x1f6f77['$1'])/0x64;_0xdee404*=_0x5305f8;}}}else{if(_0x54de7e[_0x3f2ace(0x5a2)](/<(?:PTB)>/i))Imported[_0x3f2ace(0x533)]&&(_0x3f2ace(0x279)!=='ZTcii'?this['_forcedBattleSys']=_0x3f2ace(0x421):(_0x33bb48=_0x1d45d3[_0x3f2ace(0x7f6)](_0x376a23),_0x2d2b07=_0x49b10d[_0x3f2ace(0x7f6)](_0x376ffa),_0x3878c6=_0x3cd4d8['round'](_0x50285d),_0x324d86=_0x2592f2[_0x3f2ace(0x7f6)](_0x4685dc),_0xa968ab[_0x3f2ace(0x58f)][_0x3f2ace(0x77c)][_0x3f2ace(0x212)](this,_0x108d19,_0x56e6d3,_0x300605,_0x1f331e,_0x2dfccd,_0x46bde6),this[_0x3f2ace(0x116)]()));else{if(_0x54de7e[_0x3f2ace(0x5a2)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x3f2ace(0x6f7)===_0x3f2ace(0x6f7)){const _0x449ad8=String(RegExp['$1']);if(_0x449ad8[_0x3f2ace(0x5a2)](/DTB/i))this['_forcedBattleSys']=0x0;else{if(_0x449ad8[_0x3f2ace(0x5a2)](/(?:TPB|ATB)[ ]ACTIVE/i))this['_forcedBattleSys']=0x1;else{if(_0x449ad8['match'](/(?:TPB|ATB)[ ]WAIT/i)){if(_0x3f2ace(0x3e2)!==_0x3f2ace(0x315))this[_0x3f2ace(0x1b0)]=0x2;else return _0x5f6969[_0x3f2ace(0x58f)]['Settings'][_0x3f2ace(0x17f)]['ColSpacing'];}else{if(_0x449ad8[_0x3f2ace(0x5a2)](/CTB/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x3f2ace(0x1b0)]=_0x3f2ace(0x267));else{if(_0x449ad8[_0x3f2ace(0x5a2)](/STB/i)){if(_0x3f2ace(0x61b)!==_0x3f2ace(0x8af)){if(Imported[_0x3f2ace(0xf7)]){if(_0x3f2ace(0x114)==='XZrax')this[_0x3f2ace(0x1b0)]='STB';else{const _0x2c1ff5=_0x53ca76[_0x3f2ace(0x4c6)]();if(_0x2c1ff5)for(const _0x48bea4 of _0x2c1ff5){if(_0x48bea4&&_0x48bea4[_0x3f2ace(0x555)]){if(this['isGamepadButtonPressed'](_0x48bea4))return!![];if(this['isGamepadAxisMoved'](_0x48bea4))return!![];}}}}}else this['switchModes']('default');}else{if(_0x449ad8['match'](/BTB/i)){if(Imported[_0x3f2ace(0x66a)]){if(_0x3f2ace(0x5c1)===_0x3f2ace(0x245))return _0x3d5cb5[_0x3f2ace(0x540)][_0x3f2ace(0x465)][_0x3f2ace(0x212)](this);else this['_forcedBattleSys']='BTB';}}else{if(_0x449ad8[_0x3f2ace(0x5a2)](/FTB/i))_0x3f2ace(0x30a)!=='YAxTM'?_0x44bc12[_0x3f2ace(0x54c)][_0x3f2ace(0x6d4)]=_0x3f2ace(0x5ed):Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x3f2ace(0x1b0)]=_0x3f2ace(0x233));else{if(_0x449ad8[_0x3f2ace(0x5a2)](/OTB/i))Imported[_0x3f2ace(0x2e8)]&&(this[_0x3f2ace(0x1b0)]='OTB');else{if(_0x449ad8['match'](/ETB/i))Imported[_0x3f2ace(0x88d)]&&(this[_0x3f2ace(0x1b0)]=_0x3f2ace(0x104));else _0x449ad8[_0x3f2ace(0x5a2)](/PTB/i)&&(Imported[_0x3f2ace(0x533)]&&(this[_0x3f2ace(0x1b0)]=_0x3f2ace(0x421)));}}}}}}}}}else this[_0x3f2ace(0x852)][_0x3f2ace(0x325)](_0x4f40fb[_0x3f2ace(0x540)]['StatusBgType']);}}}}}}}}}}}},Game_Temp[_0x41d84b(0x806)][_0x41d84b(0x3b1)]=function(){const _0x43ef03=_0x41d84b;this[_0x43ef03(0x2b9)]=[];},Game_Temp[_0x41d84b(0x806)][_0x41d84b(0x8a1)]=function(_0x353862,_0x35c95b,_0x2bc713,_0x37b7e3){const _0x5cbf32=_0x41d84b;if(!this[_0x5cbf32(0x3c5)]())return;_0x2bc713=_0x2bc713||![],_0x37b7e3=_0x37b7e3||![];if($dataAnimations[_0x35c95b]){if(_0x5cbf32(0x527)!=='evDed'){let _0x28a2b4=_0x5cbf32(0x8cd)+_0xeb6df7+_0x5cbf32(0x910);if(this[_0x5cbf32(0x911)](_0x28a2b4))return this[_0x5cbf32(0x3eb)][_0x28a2b4];return this['_cache'][_0x28a2b4]=_0x3ec167[_0x5cbf32(0x58f)][_0x5cbf32(0x550)][_0x5cbf32(0x195)][_0x5cbf32(0x2a3)]['call'](this,_0x42d2a7),this[_0x5cbf32(0x3eb)][_0x28a2b4];}else{const _0x7845d6={'targets':_0x353862,'animationId':_0x35c95b,'mirror':_0x2bc713,'mute':_0x37b7e3};this[_0x5cbf32(0x2b9)]['push'](_0x7845d6);for(const _0x4e2925 of _0x353862){_0x4e2925[_0x5cbf32(0x34c)]&&_0x4e2925[_0x5cbf32(0x34c)]();}}}},Game_Temp[_0x41d84b(0x806)]['showFauxAnimations']=function(){return!![];},Game_Temp[_0x41d84b(0x806)][_0x41d84b(0x524)]=function(){const _0x233f43=_0x41d84b;return this[_0x233f43(0x2b9)][_0x233f43(0x831)]();},Game_Temp[_0x41d84b(0x806)][_0x41d84b(0x686)]=function(){this['_pointAnimationQueue']=[];},Game_Temp['prototype'][_0x41d84b(0x452)]=function(_0x4b399c,_0x8f5464,_0x3d45f0,_0x259fbc,_0x19ed0d){const _0x1781aa=_0x41d84b;if(!this[_0x1781aa(0x107)]())return;_0x259fbc=_0x259fbc||![],_0x19ed0d=_0x19ed0d||![];if($dataAnimations[_0x3d45f0]){const _0x4fd591={'x':_0x4b399c,'y':_0x8f5464,'animationId':_0x3d45f0,'mirror':_0x259fbc,'mute':_0x19ed0d};this[_0x1781aa(0x78f)][_0x1781aa(0x3dd)](_0x4fd591);}},Game_Temp[_0x41d84b(0x806)]['showPointAnimations']=function(){return!![];},Game_Temp[_0x41d84b(0x806)]['retrievePointAnimation']=function(){const _0x56ec91=_0x41d84b;return this[_0x56ec91(0x78f)][_0x56ec91(0x831)]();},VisuMZ['CoreEngine'][_0x41d84b(0x24a)]=Game_System[_0x41d84b(0x806)]['initialize'],Game_System[_0x41d84b(0x806)][_0x41d84b(0x3e9)]=function(){const _0x59b90f=_0x41d84b;VisuMZ[_0x59b90f(0x58f)][_0x59b90f(0x24a)][_0x59b90f(0x212)](this),this[_0x59b90f(0x914)]();},Game_System[_0x41d84b(0x806)]['initCoreEngine']=function(){const _0x2bf1fd=_0x41d84b;this['_CoreEngineSettings']={'SideView':$dataSystem['optSideView'],'BattleSystem':this[_0x2bf1fd(0x723)](),'FontSize':$dataSystem['advanced'][_0x2bf1fd(0x485)],'Padding':0xc};},Game_System[_0x41d84b(0x806)][_0x41d84b(0x66e)]=function(){const _0x5a7385=_0x41d84b;if($gameTemp[_0x5a7385(0x42b)]==='SV')return!![];else{if($gameTemp[_0x5a7385(0x42b)]==='FV')return![];}if(this['_CoreEngineSettings']===undefined)this[_0x5a7385(0x914)]();if(this[_0x5a7385(0x5fb)][_0x5a7385(0x140)]===undefined)this[_0x5a7385(0x914)]();return this[_0x5a7385(0x5fb)][_0x5a7385(0x140)];},Game_System[_0x41d84b(0x806)]['setSideView']=function(_0x56e9f2){const _0x12116b=_0x41d84b;if(this[_0x12116b(0x5fb)]===undefined)this['initCoreEngine']();if(this[_0x12116b(0x5fb)]['SideView']===undefined)this[_0x12116b(0x914)]();this[_0x12116b(0x5fb)]['SideView']=_0x56e9f2;},Game_System[_0x41d84b(0x806)][_0x41d84b(0x844)]=function(){const _0x2afae2=_0x41d84b;if(this[_0x2afae2(0x5fb)]===undefined)this[_0x2afae2(0x914)]();this[_0x2afae2(0x5fb)][_0x2afae2(0x3f7)]=this[_0x2afae2(0x723)]();},Game_System['prototype']['initialBattleSystem']=function(){const _0xa53d20=_0x41d84b,_0x236de5=(VisuMZ['CoreEngine'][_0xa53d20(0x550)][_0xa53d20(0x3f7)]||_0xa53d20(0x1cf))[_0xa53d20(0x2c0)]()[_0xa53d20(0x242)]();return VisuMZ[_0xa53d20(0x58f)][_0xa53d20(0x4f6)](_0x236de5);},Game_System['prototype'][_0x41d84b(0x51d)]=function(){const _0x24759f=_0x41d84b;if($gameTemp[_0x24759f(0x1b0)]!==undefined)return $gameTemp[_0x24759f(0x1b0)];if(this[_0x24759f(0x5fb)]===undefined)this[_0x24759f(0x914)]();if(this['_CoreEngineSettings'][_0x24759f(0x3f7)]===undefined)this['resetBattleSystem']();return this[_0x24759f(0x5fb)][_0x24759f(0x3f7)];},Game_System[_0x41d84b(0x806)][_0x41d84b(0x5c5)]=function(_0x57f6a2){const _0x5cbaf4=_0x41d84b;if(this['_CoreEngineSettings']===undefined)this[_0x5cbaf4(0x914)]();if(this['_CoreEngineSettings'][_0x5cbaf4(0x3f7)]===undefined)this[_0x5cbaf4(0x844)]();this[_0x5cbaf4(0x5fb)][_0x5cbaf4(0x3f7)]=_0x57f6a2;},Game_System['prototype'][_0x41d84b(0x8d2)]=function(){const _0x2cd675=_0x41d84b;if(this[_0x2cd675(0x5fb)]===undefined)this[_0x2cd675(0x914)]();if(this[_0x2cd675(0x5fb)][_0x2cd675(0x33e)]===undefined)this['initCoreEngine']();return this[_0x2cd675(0x5fb)][_0x2cd675(0x33e)];},Game_System[_0x41d84b(0x806)][_0x41d84b(0x4b6)]=function(_0x34eacb){const _0x3e0bc8=_0x41d84b;if(this[_0x3e0bc8(0x5fb)]===undefined)this[_0x3e0bc8(0x914)]();if(this['_CoreEngineSettings']['TimeProgress']===undefined)this['initCoreEngine']();this[_0x3e0bc8(0x5fb)]['FontSize']=_0x34eacb;},Game_System[_0x41d84b(0x806)][_0x41d84b(0x3c6)]=function(){const _0xb149a=_0x41d84b;if(this[_0xb149a(0x5fb)]===undefined)this['initCoreEngine']();if(this[_0xb149a(0x5fb)]['Padding']===undefined)this[_0xb149a(0x914)]();return this[_0xb149a(0x5fb)]['Padding'];},Game_System[_0x41d84b(0x806)][_0x41d84b(0x82d)]=function(_0x3dd9d8){const _0x2a13d2=_0x41d84b;if(this[_0x2a13d2(0x5fb)]===undefined)this[_0x2a13d2(0x914)]();if(this[_0x2a13d2(0x5fb)][_0x2a13d2(0x602)]===undefined)this[_0x2a13d2(0x914)]();this[_0x2a13d2(0x5fb)][_0x2a13d2(0x8f9)]=_0x3dd9d8;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x68d)]=Game_Screen[_0x41d84b(0x806)]['initialize'],Game_Screen['prototype'][_0x41d84b(0x3e9)]=function(){const _0x5e8077=_0x41d84b;VisuMZ[_0x5e8077(0x58f)]['Game_Screen_initialize'][_0x5e8077(0x212)](this),this[_0x5e8077(0x155)]();},Game_Screen[_0x41d84b(0x806)][_0x41d84b(0x155)]=function(){const _0x346b00=_0x41d84b,_0x704267=VisuMZ['CoreEngine'][_0x346b00(0x550)][_0x346b00(0x6ca)];this[_0x346b00(0x6bf)]=_0x704267?.[_0x346b00(0x37d)]||'random';},Game_Screen[_0x41d84b(0x806)][_0x41d84b(0x508)]=function(){const _0x2dfc07=_0x41d84b;if(this[_0x2dfc07(0x6bf)]===undefined)this[_0x2dfc07(0x155)]();return this['_coreEngineShakeStyle'];},Game_Screen[_0x41d84b(0x806)]['setCoreEngineScreenShakeStyle']=function(_0x198eb6){const _0x5e90e9=_0x41d84b;if(this['_coreEngineShakeStyle']===undefined)this[_0x5e90e9(0x155)]();this[_0x5e90e9(0x6bf)]=_0x198eb6[_0x5e90e9(0x403)]()[_0x5e90e9(0x242)]();},Game_Picture[_0x41d84b(0x806)][_0x41d84b(0x907)]=function(){const _0x3fdc7e=_0x41d84b;if($gameParty[_0x3fdc7e(0x194)]())return![];return this[_0x3fdc7e(0x37a)]()&&this[_0x3fdc7e(0x37a)]()[_0x3fdc7e(0x15a)](0x0)==='!';},VisuMZ['CoreEngine'][_0x41d84b(0x424)]=Game_Picture[_0x41d84b(0x806)]['x'],Game_Picture[_0x41d84b(0x806)]['x']=function(){const _0x561fdd=_0x41d84b;return this[_0x561fdd(0x907)]()?this['xScrollLinkedOffset']():VisuMZ[_0x561fdd(0x58f)][_0x561fdd(0x424)]['call'](this);},Game_Picture[_0x41d84b(0x806)][_0x41d84b(0x707)]=function(){const _0x2972e1=_0x41d84b,_0x22acde=$gameMap[_0x2972e1(0x764)]()*$gameMap[_0x2972e1(0x6cd)]();return this['_x']-_0x22acde;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x581)]=Game_Picture[_0x41d84b(0x806)]['y'],Game_Picture['prototype']['y']=function(){const _0x492b4f=_0x41d84b;if(this['isMapScrollLinked']())return this[_0x492b4f(0x7e6)]();else{if('kjGWw'==='kjGWw')return VisuMZ[_0x492b4f(0x58f)][_0x492b4f(0x581)][_0x492b4f(0x212)](this);else{let _0xc002ff='',_0x119ea1=this['_index']+0x1;while(this[_0x492b4f(0x4d4)][_0x119ea1]&&this['_list'][_0x119ea1][_0x492b4f(0xec)]===0x195){_0xc002ff+=this[_0x492b4f(0x4d4)][_0x119ea1][_0x492b4f(0x543)][0x0]+'\x0a',_0x119ea1++;}return _0xc002ff;}}},Game_Picture[_0x41d84b(0x806)][_0x41d84b(0x7e6)]=function(){const _0x32ba5b=_0x41d84b,_0x45f442=$gameMap['displayY']()*$gameMap[_0x32ba5b(0x2bd)]();return this['_y']-_0x45f442;},Game_Picture[_0x41d84b(0x806)]['setEasingType']=function(_0x3c6497){const _0x39afce=_0x41d84b;this[_0x39afce(0x79c)]=_0x3c6497;},VisuMZ['CoreEngine'][_0x41d84b(0x359)]=Game_Picture['prototype'][_0x41d84b(0x214)],Game_Picture[_0x41d84b(0x806)][_0x41d84b(0x214)]=function(_0x4b0031){const _0x13e30d=_0x41d84b;return this['_coreEasingType']=this[_0x13e30d(0x79c)]||0x0,[0x0,0x1,0x2,0x3][_0x13e30d(0x4c8)](this['_coreEasingType'])?VisuMZ[_0x13e30d(0x58f)][_0x13e30d(0x359)][_0x13e30d(0x212)](this,_0x4b0031):VisuMZ[_0x13e30d(0x692)](_0x4b0031,this['_coreEasingType']);},VisuMZ['CoreEngine'][_0x41d84b(0x14a)]=Game_Action['prototype'][_0x41d84b(0x1de)],Game_Action[_0x41d84b(0x806)][_0x41d84b(0x1de)]=function(_0x34b7b2){const _0x1f5724=_0x41d84b;return VisuMZ[_0x1f5724(0x58f)][_0x1f5724(0x550)]['QoL'][_0x1f5724(0x53c)]?_0x1f5724(0x89b)===_0x1f5724(0x89b)?this[_0x1f5724(0x76e)](_0x34b7b2):this[_0x1f5724(0x58b)]||null:VisuMZ['CoreEngine'][_0x1f5724(0x14a)][_0x1f5724(0x212)](this,_0x34b7b2);},Game_Action['prototype'][_0x41d84b(0x76e)]=function(_0x53145f){const _0x23535b=_0x41d84b,_0xc99dd9=this[_0x23535b(0x6d2)](_0x53145f),_0x5a6bb4=this['subjectHitRate'](_0x53145f),_0x807cd8=this['targetEvaRate'](_0x53145f);return _0xc99dd9*(_0x5a6bb4-_0x807cd8);},VisuMZ['CoreEngine'][_0x41d84b(0x742)]=Game_Action['prototype'][_0x41d84b(0x35a)],Game_Action[_0x41d84b(0x806)][_0x41d84b(0x35a)]=function(_0x55bca8){const _0x3fed84=_0x41d84b;return VisuMZ[_0x3fed84(0x58f)][_0x3fed84(0x550)][_0x3fed84(0x1bb)][_0x3fed84(0x53c)]?0x0:VisuMZ[_0x3fed84(0x58f)][_0x3fed84(0x742)][_0x3fed84(0x212)](this,_0x55bca8);},Game_Action[_0x41d84b(0x806)][_0x41d84b(0x6d2)]=function(_0x252b57){const _0x2363af=_0x41d84b;return this[_0x2363af(0x8aa)]()[_0x2363af(0x3ba)]*0.01;},Game_Action[_0x41d84b(0x806)][_0x41d84b(0x751)]=function(_0x59a469){const _0x5bd8f1=_0x41d84b;if(VisuMZ[_0x5bd8f1(0x58f)][_0x5bd8f1(0x550)][_0x5bd8f1(0x1bb)][_0x5bd8f1(0x4ee)]&&this[_0x5bd8f1(0x4d1)]())return 0x1;if(this['isPhysical']()){if(_0x5bd8f1(0x475)==='dYnIh')_0x99d2b9+=_0x32e5b8(_0x33c67c['$1']),_0x4a449f+=_0x941567(_0x69d7fe['$2']);else{if(VisuMZ[_0x5bd8f1(0x58f)][_0x5bd8f1(0x550)][_0x5bd8f1(0x1bb)][_0x5bd8f1(0x4ee)]&&this[_0x5bd8f1(0x36b)]()[_0x5bd8f1(0x6b1)]())return this[_0x5bd8f1(0x36b)]()[_0x5bd8f1(0x337)]+0.05;else{if('QbiXu'==='BGnsB'){if(!this['needsUpdate']())return;this[_0x5bd8f1(0x427)]();}else return this[_0x5bd8f1(0x36b)]()[_0x5bd8f1(0x337)];}}}else return 0x1;},Game_Action[_0x41d84b(0x806)]['targetEvaRate']=function(_0xc8c18e){const _0x2ee6b9=_0x41d84b;if(this[_0x2ee6b9(0x36b)]()[_0x2ee6b9(0x6b1)]()===_0xc8c18e[_0x2ee6b9(0x6b1)]())return 0x0;if(this[_0x2ee6b9(0x132)]()){if('CRmFY'==='bNkPw')_0x588411[_0x2ee6b9(0x88d)]&&(this[_0x2ee6b9(0x1b0)]=_0x2ee6b9(0x104));else{if(VisuMZ[_0x2ee6b9(0x58f)][_0x2ee6b9(0x550)][_0x2ee6b9(0x1bb)][_0x2ee6b9(0x4ee)]&&_0xc8c18e[_0x2ee6b9(0x1c5)]()){if(_0x2ee6b9(0x708)===_0x2ee6b9(0x67b))this[_0x2ee6b9(0x427)](),_0x310069['playOk'](),this[_0x2ee6b9(0x1d8)]==='default'?this[_0x2ee6b9(0x206)](0x0):this[_0x2ee6b9(0x206)](-0x1);else return _0xc8c18e[_0x2ee6b9(0x14b)]-0.05;}else{if(_0x2ee6b9(0x837)===_0x2ee6b9(0x837))return _0xc8c18e[_0x2ee6b9(0x14b)];else _0xb09c1f+=_0x4bff88;}}}else return this[_0x2ee6b9(0x457)]()?_0xc8c18e[_0x2ee6b9(0x64f)]:0x0;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x498)]=Game_Action[_0x41d84b(0x806)][_0x41d84b(0x5ee)],Game_Action[_0x41d84b(0x806)][_0x41d84b(0x5ee)]=function(_0x1536bc){const _0x530263=_0x41d84b;VisuMZ['CoreEngine']['Game_Action_updateLastTarget'][_0x530263(0x212)](this,_0x1536bc);if(VisuMZ[_0x530263(0x58f)][_0x530263(0x550)]['QoL'][_0x530263(0x53c)])return;const _0x3d5584=_0x1536bc[_0x530263(0x11e)]();if(_0x3d5584[_0x530263(0xda)]){if('DHTij'==='DHTij')0x1-this[_0x530263(0x35a)](_0x1536bc)>this[_0x530263(0x1de)](_0x1536bc)&&(_0x3d5584[_0x530263(0xda)]=![],_0x3d5584[_0x530263(0x6ef)]=!![]);else return _0x3a63ae[_0x530263(0x58f)]['Settings']['UI'][_0x530263(0x2c3)];}},VisuMZ['CoreEngine'][_0x41d84b(0x26a)]=Game_BattlerBase[_0x41d84b(0x806)][_0x41d84b(0x311)],Game_BattlerBase[_0x41d84b(0x806)][_0x41d84b(0x311)]=function(){const _0x326624=_0x41d84b;this[_0x326624(0x3eb)]={},VisuMZ[_0x326624(0x58f)][_0x326624(0x26a)][_0x326624(0x212)](this);},VisuMZ['CoreEngine']['Game_BattlerBase_refresh']=Game_BattlerBase[_0x41d84b(0x806)][_0x41d84b(0x427)],Game_BattlerBase[_0x41d84b(0x806)][_0x41d84b(0x427)]=function(){const _0xcdea1f=_0x41d84b;this['_cache']={},VisuMZ[_0xcdea1f(0x58f)]['Game_BattlerBase_refresh']['call'](this);},Game_BattlerBase[_0x41d84b(0x806)][_0x41d84b(0x911)]=function(_0x4c5716){const _0x202c5a=_0x41d84b;return this[_0x202c5a(0x3eb)]=this[_0x202c5a(0x3eb)]||{},this[_0x202c5a(0x3eb)][_0x4c5716]!==undefined;},Game_BattlerBase[_0x41d84b(0x806)][_0x41d84b(0x87e)]=function(_0x986ac1){const _0x506f17=_0x41d84b,_0x39d12a=(_0x54753b,_0x41fe9b)=>{const _0x2c7608=_0x17c6;if('XyynM'!=='XyynM')_0x3fb7aa[_0x2c7608(0x85a)]()||this['_isButtonHidden']?this[_0x2c7608(0x45c)]():_0x55dfff[_0x2c7608(0x58f)]['Sprite_Button_updateOpacity'][_0x2c7608(0x212)](this);else{if(!_0x41fe9b)return _0x54753b;if(_0x41fe9b[_0x2c7608(0x326)]['match'](VisuMZ[_0x2c7608(0x58f)][_0x2c7608(0x3ca)][_0x2c7608(0x87e)][_0x986ac1])){var _0x47aa9c=Number(RegExp['$1']);_0x54753b+=_0x47aa9c;}if(_0x41fe9b[_0x2c7608(0x326)][_0x2c7608(0x5a2)](VisuMZ[_0x2c7608(0x58f)]['RegExp'][_0x2c7608(0x722)][_0x986ac1])){var _0x2edc07=String(RegExp['$1']);try{_0x54753b+=eval(_0x2edc07);}catch(_0x2fa76f){if($gameTemp[_0x2c7608(0x190)]())console[_0x2c7608(0x5a6)](_0x2fa76f);}}return _0x54753b;}};return this[_0x506f17(0x687)]()[_0x506f17(0x48e)](_0x39d12a,this[_0x506f17(0x76c)][_0x986ac1]);},Game_BattlerBase['prototype']['paramMax']=function(_0x1a4e63){const _0x3225c6=_0x41d84b;var _0x5d777b='Basic'+(this['isActor']()?_0x3225c6(0x270):_0x3225c6(0x42e))+_0x3225c6(0x89f)+_0x1a4e63;if(this[_0x3225c6(0x911)](_0x5d777b))return this['_cache'][_0x5d777b];this[_0x3225c6(0x3eb)][_0x5d777b]=eval(VisuMZ[_0x3225c6(0x58f)][_0x3225c6(0x550)]['Param'][_0x5d777b]);const _0x36712f=(_0x10410d,_0x4b6b70)=>{const _0x308521=_0x3225c6;if(!_0x4b6b70)return _0x10410d;if(_0x4b6b70['note']['match'](VisuMZ[_0x308521(0x58f)][_0x308521(0x3ca)][_0x308521(0x385)][_0x1a4e63])){if('IPWFL'===_0x308521(0x79e)){_0x35ff3f+=_0x25d0a4;if(_0xda625c>=_0x163f37)_0x5d6b53=_0xad51a3-0x1;this[_0x308521(0x779)](_0x53dbf8);}else{var _0x55e27e=Number(RegExp['$1']);if(_0x55e27e===0x0)_0x55e27e=Number[_0x308521(0x3a0)];_0x10410d=Math[_0x308521(0x81e)](_0x10410d,_0x55e27e);}}if(_0x4b6b70[_0x308521(0x326)][_0x308521(0x5a2)](VisuMZ['CoreEngine'][_0x308521(0x3ca)]['paramMaxJS'][_0x1a4e63])){var _0x5df3c3=String(RegExp['$1']);try{_0x10410d=Math[_0x308521(0x81e)](_0x10410d,Number(eval(_0x5df3c3)));}catch(_0x27592f){if('PKkNj'===_0x308521(0x6a1)){if($gameTemp[_0x308521(0x190)]())console['log'](_0x27592f);}else return _0x308521(0x467);}}return _0x10410d;};if(this[_0x3225c6(0x3eb)][_0x5d777b]===0x0)this[_0x3225c6(0x3eb)][_0x5d777b]=Number['MAX_SAFE_INTEGER'];return this[_0x3225c6(0x3eb)][_0x5d777b]=this[_0x3225c6(0x687)]()[_0x3225c6(0x48e)](_0x36712f,this[_0x3225c6(0x3eb)][_0x5d777b]),this[_0x3225c6(0x3eb)][_0x5d777b];},Game_BattlerBase[_0x41d84b(0x806)][_0x41d84b(0x833)]=function(_0x225173){const _0xa3c370=_0x41d84b,_0x4d9035=this[_0xa3c370(0x3f9)](Game_BattlerBase['TRAIT_PARAM'],_0x225173),_0x58db45=(_0x3f0a2d,_0x223395)=>{const _0x15bd15=_0xa3c370;if(!_0x223395)return _0x3f0a2d;if(_0x223395[_0x15bd15(0x326)][_0x15bd15(0x5a2)](VisuMZ['CoreEngine'][_0x15bd15(0x3ca)][_0x15bd15(0x25f)][_0x225173])){var _0x391123=Number(RegExp['$1'])/0x64;_0x3f0a2d*=_0x391123;}if(_0x223395['note']['match'](VisuMZ[_0x15bd15(0x58f)][_0x15bd15(0x3ca)]['paramRate2'][_0x225173])){if('zxYUa'!==_0x15bd15(0x55f)){var _0x391123=Number(RegExp['$1']);_0x3f0a2d*=_0x391123;}else{const _0xbaa9a7=_0x15bd15(0x521);this[_0x15bd15(0x3d7)]=this[_0x15bd15(0x3d7)]||{};if(this[_0x15bd15(0x3d7)][_0xbaa9a7])return this[_0x15bd15(0x3d7)][_0xbaa9a7];const _0xacdfea=_0x44236d[_0x15bd15(0x58f)][_0x15bd15(0x550)][_0x15bd15(0x664)][_0x15bd15(0x2ea)];return this[_0x15bd15(0x5df)](_0xbaa9a7,_0xacdfea);}}if(_0x223395['note']['match'](VisuMZ[_0x15bd15(0x58f)][_0x15bd15(0x3ca)]['paramRateJS'][_0x225173])){var _0x5d8b65=String(RegExp['$1']);try{_0x3f0a2d*=eval(_0x5d8b65);}catch(_0xb36695){if($gameTemp[_0x15bd15(0x190)]())console[_0x15bd15(0x5a6)](_0xb36695);}}return _0x3f0a2d;};return this['traitObjects']()[_0xa3c370(0x48e)](_0x58db45,_0x4d9035);},Game_BattlerBase[_0x41d84b(0x806)]['paramFlatBonus']=function(_0x41c18c){const _0x77c274=_0x41d84b,_0xb56440=(_0x253771,_0x481860)=>{const _0x303b76=_0x17c6;if(!_0x481860)return _0x253771;if(_0x481860[_0x303b76(0x326)][_0x303b76(0x5a2)](VisuMZ[_0x303b76(0x58f)][_0x303b76(0x3ca)][_0x303b76(0x4d8)][_0x41c18c])){var _0x4856f3=Number(RegExp['$1']);_0x253771+=_0x4856f3;}if(_0x481860['note'][_0x303b76(0x5a2)](VisuMZ[_0x303b76(0x58f)][_0x303b76(0x3ca)]['paramFlatJS'][_0x41c18c])){if(_0x303b76(0x458)!==_0x303b76(0x456)){var _0x502e92=String(RegExp['$1']);try{'mFWRu'===_0x303b76(0x198)?_0x253771+=eval(_0x502e92):this['processKeyboardDigitChange']();}catch(_0x1d2559){if('KcuOk'===_0x303b76(0x331)){if($gameTemp[_0x303b76(0x190)]())console[_0x303b76(0x5a6)](_0x1d2559);}else return _0x258113[_0x303b76(0x58f)][_0x303b76(0x550)][_0x303b76(0x597)][_0x303b76(0x3b5)];}}else _0x44863b(_0x303b76(0x36c)[_0x303b76(0x125)](_0x1dd09e,_0x3a6efd)),_0x4c9e39[_0x303b76(0x80e)]();}return _0x253771;};return this[_0x77c274(0x687)]()['reduce'](_0xb56440,0x0);},Game_BattlerBase[_0x41d84b(0x806)][_0x41d84b(0x222)]=function(_0x19acaf){const _0x756a2c=_0x41d84b;let _0x284047=_0x756a2c(0x222)+_0x19acaf+_0x756a2c(0x910);if(this[_0x756a2c(0x911)](_0x284047))return this['_cache'][_0x284047];return this['_cache'][_0x284047]=Math[_0x756a2c(0x7f6)](VisuMZ[_0x756a2c(0x58f)][_0x756a2c(0x550)]['Param'][_0x756a2c(0x395)]['call'](this,_0x19acaf)),this[_0x756a2c(0x3eb)][_0x284047];},Game_BattlerBase[_0x41d84b(0x806)][_0x41d84b(0x59d)]=function(_0x2189c5){const _0x1c0e77=_0x41d84b,_0x589f19=(_0x429e68,_0x2014d0)=>{const _0x529d66=_0x17c6;if('dfQSb'!==_0x529d66(0x469)){if(!_0x2014d0)return _0x429e68;if(_0x2014d0[_0x529d66(0x326)][_0x529d66(0x5a2)](VisuMZ[_0x529d66(0x58f)][_0x529d66(0x3ca)][_0x529d66(0x26f)][_0x2189c5])){var _0x2aadce=Number(RegExp['$1'])/0x64;_0x429e68+=_0x2aadce;}if(_0x2014d0['note']['match'](VisuMZ['CoreEngine']['RegExp'][_0x529d66(0x185)][_0x2189c5])){if('QmQeS'!==_0x529d66(0x5af)){var _0x2aadce=Number(RegExp['$1']);_0x429e68+=_0x2aadce;}else!_0xb6a609[_0x529d66(0x196)]()&&!this[_0x529d66(0x67c)]&&!_0x2e7571[_0x529d66(0x78e)]()&&(this[_0x529d66(0x67c)]=!![],this[_0x529d66(0x75c)](),_0x150c48[_0x529d66(0x4b2)](),this[_0x529d66(0x67c)]=![]);}if(_0x2014d0[_0x529d66(0x326)][_0x529d66(0x5a2)](VisuMZ[_0x529d66(0x58f)][_0x529d66(0x3ca)][_0x529d66(0x89d)][_0x2189c5])){var _0x300cff=String(RegExp['$1']);try{_0x429e68+=eval(_0x300cff);}catch(_0xead596){if($gameTemp[_0x529d66(0x190)]())console[_0x529d66(0x5a6)](_0xead596);}}return _0x429e68;}else{const _0x94caf8=_0x529d66(0x2d0);this[_0x529d66(0x3d7)]=this['_colorCache']||{};if(this[_0x529d66(0x3d7)][_0x94caf8])return this[_0x529d66(0x3d7)][_0x94caf8];const _0x1f3c5f=_0x185439[_0x529d66(0x58f)][_0x529d66(0x550)][_0x529d66(0x664)][_0x529d66(0x81b)];return this[_0x529d66(0x5df)](_0x94caf8,_0x1f3c5f);}};return this[_0x1c0e77(0x687)]()[_0x1c0e77(0x48e)](_0x589f19,0x0);},Game_BattlerBase[_0x41d84b(0x806)][_0x41d84b(0x1bf)]=function(_0x5a9b77){const _0xbcd72d=_0x41d84b,_0x4e0b3b=(_0xae8ae8,_0x345008)=>{const _0x17dae4=_0x17c6;if(!_0x345008)return _0xae8ae8;if(_0x345008[_0x17dae4(0x326)][_0x17dae4(0x5a2)](VisuMZ[_0x17dae4(0x58f)][_0x17dae4(0x3ca)][_0x17dae4(0x53a)][_0x5a9b77])){var _0x467eb5=Number(RegExp['$1'])/0x64;_0xae8ae8*=_0x467eb5;}if(_0x345008['note'][_0x17dae4(0x5a2)](VisuMZ[_0x17dae4(0x58f)][_0x17dae4(0x3ca)][_0x17dae4(0x40d)][_0x5a9b77])){if('ObQRo'!=='ObQRo')_0x1d0a1b='Enemy-%1-%2'[_0x17dae4(0x125)](_0x46ca74,_0x46e480);else{var _0x467eb5=Number(RegExp['$1']);_0xae8ae8*=_0x467eb5;}}if(_0x345008[_0x17dae4(0x326)]['match'](VisuMZ[_0x17dae4(0x58f)][_0x17dae4(0x3ca)][_0x17dae4(0x472)][_0x5a9b77])){var _0x2dc535=String(RegExp['$1']);try{if('gTDLt'!==_0x17dae4(0x7c3))return![];else _0xae8ae8*=eval(_0x2dc535);}catch(_0x5de88c){if($gameTemp[_0x17dae4(0x190)]())console[_0x17dae4(0x5a6)](_0x5de88c);}}return _0xae8ae8;};return this[_0xbcd72d(0x687)]()[_0xbcd72d(0x48e)](_0x4e0b3b,0x1);},Game_BattlerBase[_0x41d84b(0x806)]['xparamFlatBonus']=function(_0x2cf826){const _0x2077f7=_0x41d84b,_0x7c3596=(_0x3793b6,_0x5196a3)=>{const _0x3dcbff=_0x17c6;if(!_0x5196a3)return _0x3793b6;if(_0x5196a3[_0x3dcbff(0x326)]['match'](VisuMZ[_0x3dcbff(0x58f)][_0x3dcbff(0x3ca)][_0x3dcbff(0x883)][_0x2cf826])){if(_0x3dcbff(0x721)===_0x3dcbff(0x2f0))_0x33fb50[_0x3dcbff(0x58f)]['Spriteset_Base_update']['call'](this),this['updatePictureAntiZoom'](),this[_0x3dcbff(0x79f)](),this[_0x3dcbff(0x8f4)]();else{var _0x108db5=Number(RegExp['$1'])/0x64;_0x3793b6+=_0x108db5;}}if(_0x5196a3[_0x3dcbff(0x326)][_0x3dcbff(0x5a2)](VisuMZ[_0x3dcbff(0x58f)][_0x3dcbff(0x3ca)][_0x3dcbff(0x41e)][_0x2cf826])){if(_0x3dcbff(0x38a)===_0x3dcbff(0x60b))_0x36df16[_0x3dcbff(0x58f)][_0x3dcbff(0x550)]['MenuLayout']['Title'][_0x3dcbff(0x390)][_0x3dcbff(0x212)](this);else{var _0x108db5=Number(RegExp['$1']);_0x3793b6+=_0x108db5;}}if(_0x5196a3[_0x3dcbff(0x326)][_0x3dcbff(0x5a2)](VisuMZ['CoreEngine'][_0x3dcbff(0x3ca)][_0x3dcbff(0x7ae)][_0x2cf826])){if('UJHGN'!=='lbtuV'){var _0x40686a=String(RegExp['$1']);try{_0x3793b6+=eval(_0x40686a);}catch(_0x35ef22){if(_0x3dcbff(0x41c)===_0x3dcbff(0x5a5))_0x15da68[_0x3dcbff(0x806)]['initialize']['call'](this),this[_0x3dcbff(0x75a)]=_0x218f12,this[_0x3dcbff(0x478)]=null,this[_0x3dcbff(0x854)]();else{if($gameTemp[_0x3dcbff(0x190)]())console['log'](_0x35ef22);}}}else{var _0x59524b=_0x444b57(_0x5eeede['$1'])/0x64;_0x18960e+=_0x59524b;}}return _0x3793b6;};return this['traitObjects']()[_0x2077f7(0x48e)](_0x7c3596,0x0);},Game_BattlerBase[_0x41d84b(0x806)][_0x41d84b(0x8cd)]=function(_0x7aec16){const _0x552c35=_0x41d84b;let _0x5bfb36='xparam'+_0x7aec16+_0x552c35(0x910);if(this[_0x552c35(0x911)](_0x5bfb36))return this[_0x552c35(0x3eb)][_0x5bfb36];return this['_cache'][_0x5bfb36]=VisuMZ[_0x552c35(0x58f)][_0x552c35(0x550)][_0x552c35(0x195)][_0x552c35(0x2a3)][_0x552c35(0x212)](this,_0x7aec16),this[_0x552c35(0x3eb)][_0x5bfb36];},Game_BattlerBase['prototype'][_0x41d84b(0x29a)]=function(_0x205452){const _0x2a76b0=_0x41d84b,_0x411c8f=(_0x116ee1,_0x3b9051)=>{const _0x48e5e4=_0x17c6;if(!_0x3b9051)return _0x116ee1;if(_0x3b9051['note'][_0x48e5e4(0x5a2)](VisuMZ['CoreEngine'][_0x48e5e4(0x3ca)]['sparamPlus1'][_0x205452])){var _0x58de4a=Number(RegExp['$1'])/0x64;_0x116ee1+=_0x58de4a;}if(_0x3b9051[_0x48e5e4(0x326)][_0x48e5e4(0x5a2)](VisuMZ[_0x48e5e4(0x58f)]['RegExp'][_0x48e5e4(0x288)][_0x205452])){if(_0x48e5e4(0x6f8)===_0x48e5e4(0x6f8)){var _0x58de4a=Number(RegExp['$1']);_0x116ee1+=_0x58de4a;}else _0x2c7d53['setSideView'](!![]);}if(_0x3b9051[_0x48e5e4(0x326)][_0x48e5e4(0x5a2)](VisuMZ[_0x48e5e4(0x58f)][_0x48e5e4(0x3ca)]['sparamPlusJS'][_0x205452])){var _0x33128e=String(RegExp['$1']);try{if(_0x48e5e4(0x746)===_0x48e5e4(0x746))_0x116ee1+=eval(_0x33128e);else return _0x38d647[_0x48e5e4(0x692)](_0x9b2eda,this[_0x48e5e4(0x79c)]);}catch(_0x40aeb1){if($gameTemp[_0x48e5e4(0x190)]())console[_0x48e5e4(0x5a6)](_0x40aeb1);}}return _0x116ee1;};return this[_0x2a76b0(0x687)]()[_0x2a76b0(0x48e)](_0x411c8f,0x0);},Game_BattlerBase[_0x41d84b(0x806)][_0x41d84b(0x61f)]=function(_0xef5a36){const _0x4b7376=_0x41d84b,_0x3fe2b9=(_0x33d463,_0x4c1884)=>{const _0xfaa8f6=_0x17c6;if(_0xfaa8f6(0x7af)===_0xfaa8f6(0x3d9))this[_0xfaa8f6(0x68b)][_0xfaa8f6(0x325)](_0x1a56c5['layoutSettings'][_0xfaa8f6(0x2cf)]);else{if(!_0x4c1884)return _0x33d463;if(_0x4c1884[_0xfaa8f6(0x326)][_0xfaa8f6(0x5a2)](VisuMZ['CoreEngine'][_0xfaa8f6(0x3ca)][_0xfaa8f6(0x8f3)][_0xef5a36])){var _0x1bb9b6=Number(RegExp['$1'])/0x64;_0x33d463*=_0x1bb9b6;}if(_0x4c1884[_0xfaa8f6(0x326)][_0xfaa8f6(0x5a2)](VisuMZ[_0xfaa8f6(0x58f)]['RegExp'][_0xfaa8f6(0x7d1)][_0xef5a36])){var _0x1bb9b6=Number(RegExp['$1']);_0x33d463*=_0x1bb9b6;}if(_0x4c1884[_0xfaa8f6(0x326)][_0xfaa8f6(0x5a2)](VisuMZ[_0xfaa8f6(0x58f)][_0xfaa8f6(0x3ca)]['sparamRateJS'][_0xef5a36])){if(_0xfaa8f6(0x670)==='cAstQ'){var _0x3d2552=String(RegExp['$1']);try{_0x33d463*=eval(_0x3d2552);}catch(_0x32a112){if(_0xfaa8f6(0x306)!==_0xfaa8f6(0x1a2)){if($gameTemp[_0xfaa8f6(0x190)]())console[_0xfaa8f6(0x5a6)](_0x32a112);}else for(const _0x5a45ad of _0x1ed348){if(_0x5a45ad&&_0x5a45ad['connected']){if(this[_0xfaa8f6(0x501)](_0x5a45ad))return!![];if(this[_0xfaa8f6(0x10d)](_0x5a45ad))return!![];}}}}else{const _0x5d0f99=_0x57e204[_0xfaa8f6(0x51a)](_0xfaa8f6(0x815)),_0x1c8b05=_0x499e8[_0xfaa8f6(0x69f)],_0x46f4eb=_0x21500e['iconHeight'],_0x41b802=_0x5b38d7%0x10*_0x1c8b05,_0x44b215=_0x5644df[_0xfaa8f6(0x5d1)](_0xb84027/0x10)*_0x46f4eb,_0x492210=_0x248d0f,_0x5d9fc0=_0x37fcbb;this['contents'][_0xfaa8f6(0x106)][_0xfaa8f6(0x897)]=_0x22aada,this[_0xfaa8f6(0x254)][_0xfaa8f6(0x666)](_0x5d0f99,_0x41b802,_0x44b215,_0x1c8b05,_0x46f4eb,_0x20989e,_0x30caf5,_0x492210,_0x5d9fc0),this['contents'][_0xfaa8f6(0x106)][_0xfaa8f6(0x897)]=!![];}}return _0x33d463;}};return this[_0x4b7376(0x687)]()[_0x4b7376(0x48e)](_0x3fe2b9,0x1);},Game_BattlerBase[_0x41d84b(0x806)][_0x41d84b(0x2f9)]=function(_0x67f0da){const _0x13e08e=_0x41d84b,_0x13412b=(_0x1b3f43,_0x524783)=>{const _0x123b23=_0x17c6;if(!_0x524783)return _0x1b3f43;if(_0x524783[_0x123b23(0x326)][_0x123b23(0x5a2)](VisuMZ[_0x123b23(0x58f)]['RegExp'][_0x123b23(0x89a)][_0x67f0da])){if('sqIfd'===_0x123b23(0x301))this[_0x123b23(0x909)]=(_0x2d122e(_0x315b20['$1'])||0x1)[_0x123b23(0x587)](0x1,0xa);else{var _0x56368f=Number(RegExp['$1'])/0x64;_0x1b3f43+=_0x56368f;}}if(_0x524783['note'][_0x123b23(0x5a2)](VisuMZ['CoreEngine']['RegExp'][_0x123b23(0x2a7)][_0x67f0da])){var _0x56368f=Number(RegExp['$1']);_0x1b3f43+=_0x56368f;}if(_0x524783[_0x123b23(0x326)][_0x123b23(0x5a2)](VisuMZ[_0x123b23(0x58f)][_0x123b23(0x3ca)][_0x123b23(0x461)][_0x67f0da])){if(_0x123b23(0x5e8)===_0x123b23(0x48d))_0x5c3515['CoreEngine']['Window_Selectable_processCursorMove'][_0x123b23(0x212)](this);else{var _0x358921=String(RegExp['$1']);try{_0x1b3f43+=eval(_0x358921);}catch(_0x2dd77b){if(_0x123b23(0x3ec)==='xeccK')this['removePointAnimation'](_0x59485d);else{if($gameTemp[_0x123b23(0x190)]())console[_0x123b23(0x5a6)](_0x2dd77b);}}}}return _0x1b3f43;};return this['traitObjects']()[_0x13e08e(0x48e)](_0x13412b,0x0);},Game_BattlerBase[_0x41d84b(0x806)][_0x41d84b(0x4cb)]=function(_0xb422a7){const _0x1de629=_0x41d84b;let _0x9a520f=_0x1de629(0x4cb)+_0xb422a7+'Total';if(this[_0x1de629(0x911)](_0x9a520f))return this[_0x1de629(0x3eb)][_0x9a520f];return this['_cache'][_0x9a520f]=VisuMZ['CoreEngine'][_0x1de629(0x550)][_0x1de629(0x195)][_0x1de629(0x72e)][_0x1de629(0x212)](this,_0xb422a7),this[_0x1de629(0x3eb)][_0x9a520f];},Game_BattlerBase[_0x41d84b(0x806)][_0x41d84b(0x6c3)]=function(_0x53bcb7,_0x37f761){const _0x417afa=_0x41d84b;if(typeof paramId===_0x417afa(0x8b5))return this[_0x417afa(0x222)](_0x53bcb7);_0x53bcb7=String(_0x53bcb7||'')[_0x417afa(0x2c0)]();if(_0x53bcb7==='MAXHP')return this['param'](0x0);if(_0x53bcb7===_0x417afa(0x1e5))return this[_0x417afa(0x222)](0x1);if(_0x53bcb7===_0x417afa(0x6e3))return this[_0x417afa(0x222)](0x2);if(_0x53bcb7===_0x417afa(0x748))return this[_0x417afa(0x222)](0x3);if(_0x53bcb7===_0x417afa(0x8ac))return this['param'](0x4);if(_0x53bcb7===_0x417afa(0x515))return this[_0x417afa(0x222)](0x5);if(_0x53bcb7===_0x417afa(0x86e))return this[_0x417afa(0x222)](0x6);if(_0x53bcb7===_0x417afa(0x4e1))return this[_0x417afa(0x222)](0x7);if(_0x53bcb7===_0x417afa(0x377))return _0x37f761?String(Math[_0x417afa(0x7f6)](this['xparam'](0x0)*0x64))+'%':this[_0x417afa(0x8cd)](0x0);if(_0x53bcb7===_0x417afa(0x2fc))return _0x37f761?String(Math[_0x417afa(0x7f6)](this[_0x417afa(0x8cd)](0x1)*0x64))+'%':this[_0x417afa(0x8cd)](0x1);if(_0x53bcb7==='CRI')return _0x37f761?String(Math['round'](this[_0x417afa(0x8cd)](0x2)*0x64))+'%':this[_0x417afa(0x8cd)](0x2);if(_0x53bcb7===_0x417afa(0x7a3))return _0x37f761?String(Math['round'](this[_0x417afa(0x8cd)](0x3)*0x64))+'%':this['xparam'](0x3);if(_0x53bcb7===_0x417afa(0x5bb))return _0x37f761?String(Math[_0x417afa(0x7f6)](this[_0x417afa(0x8cd)](0x4)*0x64))+'%':this[_0x417afa(0x8cd)](0x4);if(_0x53bcb7===_0x417afa(0x378))return _0x37f761?String(Math[_0x417afa(0x7f6)](this[_0x417afa(0x8cd)](0x5)*0x64))+'%':this['xparam'](0x5);if(_0x53bcb7===_0x417afa(0x216))return _0x37f761?String(Math[_0x417afa(0x7f6)](this[_0x417afa(0x8cd)](0x6)*0x64))+'%':this[_0x417afa(0x8cd)](0x6);if(_0x53bcb7==='HRG')return _0x37f761?String(Math[_0x417afa(0x7f6)](this[_0x417afa(0x8cd)](0x7)*0x64))+'%':this[_0x417afa(0x8cd)](0x7);if(_0x53bcb7==='MRG')return _0x37f761?String(Math[_0x417afa(0x7f6)](this[_0x417afa(0x8cd)](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x53bcb7==='TRG')return _0x37f761?String(Math['round'](this[_0x417afa(0x8cd)](0x9)*0x64))+'%':this[_0x417afa(0x8cd)](0x9);if(_0x53bcb7==='TGR')return _0x37f761?String(Math[_0x417afa(0x7f6)](this['sparam'](0x0)*0x64))+'%':this[_0x417afa(0x4cb)](0x0);if(_0x53bcb7===_0x417afa(0x3cd))return _0x37f761?String(Math['round'](this[_0x417afa(0x4cb)](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x53bcb7==='REC')return _0x37f761?String(Math[_0x417afa(0x7f6)](this['sparam'](0x2)*0x64))+'%':this['sparam'](0x2);if(_0x53bcb7==='PHA')return _0x37f761?String(Math[_0x417afa(0x7f6)](this['sparam'](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x53bcb7===_0x417afa(0x3fd))return _0x37f761?String(Math[_0x417afa(0x7f6)](this['sparam'](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x53bcb7===_0x417afa(0x8d3))return _0x37f761?String(Math[_0x417afa(0x7f6)](this[_0x417afa(0x4cb)](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x53bcb7===_0x417afa(0x2fb))return _0x37f761?String(Math[_0x417afa(0x7f6)](this[_0x417afa(0x4cb)](0x6)*0x64))+'%':this[_0x417afa(0x4cb)](0x6);if(_0x53bcb7==='MDR')return _0x37f761?String(Math[_0x417afa(0x7f6)](this[_0x417afa(0x4cb)](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x53bcb7===_0x417afa(0x1ad))return _0x37f761?String(Math[_0x417afa(0x7f6)](this[_0x417afa(0x4cb)](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x53bcb7===_0x417afa(0x25c))return _0x37f761?String(Math['round'](this['sparam'](0x9)*0x64))+'%':this[_0x417afa(0x4cb)](0x9);if(VisuMZ['CoreEngine'][_0x417afa(0x7ea)][_0x53bcb7]){const _0x52ab2f=VisuMZ[_0x417afa(0x58f)]['CustomParamAbb'][_0x53bcb7],_0x218474=this[_0x52ab2f];return VisuMZ['CoreEngine']['CustomParamType'][_0x53bcb7]===_0x417afa(0x39c)?_0x218474:_0x37f761?String(Math[_0x417afa(0x7f6)](_0x218474*0x64))+'%':_0x218474;}return'';},Game_BattlerBase[_0x41d84b(0x806)]['isDying']=function(){const _0x417af9=_0x41d84b;return this[_0x417af9(0x5ad)]()&&this['_hp']<this[_0x417af9(0x25a)]*VisuMZ[_0x417af9(0x58f)][_0x417af9(0x550)]['Param'][_0x417af9(0x63f)];},Game_Battler[_0x41d84b(0x806)][_0x41d84b(0x699)]=function(){const _0x4de30e=_0x41d84b;SoundManager[_0x4de30e(0x2af)](),this[_0x4de30e(0x712)](_0x4de30e(0x46b));},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x1be)]=Game_Actor[_0x41d84b(0x806)]['paramBase'],Game_Actor[_0x41d84b(0x806)][_0x41d84b(0x505)]=function(_0x3eff1e){const _0x5d6e68=_0x41d84b;if(this[_0x5d6e68(0x703)]>0x63)return this['paramBaseAboveLevel99'](_0x3eff1e);return VisuMZ['CoreEngine'][_0x5d6e68(0x1be)]['call'](this,_0x3eff1e);},Game_Actor[_0x41d84b(0x806)][_0x41d84b(0x5f3)]=function(_0x3d45fc){const _0x15abc6=_0x41d84b,_0x21e2ce=this['currentClass']()[_0x15abc6(0x2fd)][_0x3d45fc][0x63],_0x2ce439=this[_0x15abc6(0x868)]()['params'][_0x3d45fc][0x62];return _0x21e2ce+(_0x21e2ce-_0x2ce439)*(this[_0x15abc6(0x703)]-0x63);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x6f9)]=Game_Actor['prototype'][_0x41d84b(0x1fc)],Game_Actor[_0x41d84b(0x806)]['changeClass']=function(_0xb0bf22,_0x58ce5a){const _0x45e947=_0x41d84b;$gameTemp[_0x45e947(0x453)]=!![],VisuMZ['CoreEngine']['Game_Actor_changeClass'][_0x45e947(0x212)](this,_0xb0bf22,_0x58ce5a),$gameTemp[_0x45e947(0x453)]=undefined;},VisuMZ['CoreEngine'][_0x41d84b(0x5e1)]=Game_Actor[_0x41d84b(0x806)][_0x41d84b(0x575)],Game_Actor[_0x41d84b(0x806)][_0x41d84b(0x575)]=function(){const _0x58a634=_0x41d84b;VisuMZ[_0x58a634(0x58f)][_0x58a634(0x5e1)][_0x58a634(0x212)](this);if(!$gameTemp[_0x58a634(0x453)])this[_0x58a634(0x6fe)]();},Game_Actor['prototype'][_0x41d84b(0x6fe)]=function(){const _0x3efed9=_0x41d84b;this[_0x3efed9(0x3eb)]={};if(VisuMZ[_0x3efed9(0x58f)][_0x3efed9(0x550)]['QoL'][_0x3efed9(0x4fa)])this['_hp']=this[_0x3efed9(0x25a)];if(VisuMZ[_0x3efed9(0x58f)][_0x3efed9(0x550)][_0x3efed9(0x1bb)][_0x3efed9(0x276)])this[_0x3efed9(0x479)]=this[_0x3efed9(0x626)];},Game_Actor[_0x41d84b(0x806)][_0x41d84b(0x56e)]=function(){const _0x247144=_0x41d84b;if(this[_0x247144(0x2da)]())return 0x1;const _0x18d0d4=this[_0x247144(0x26e)]()-this[_0x247144(0x5dc)](),_0x5728cd=this[_0x247144(0x83e)]()-this[_0x247144(0x5dc)]();return(_0x5728cd/_0x18d0d4)[_0x247144(0x587)](0x0,0x1);},Game_Actor[_0x41d84b(0x806)][_0x41d84b(0x687)]=function(){const _0x40c243=_0x41d84b,_0x10348d=Game_Battler['prototype'][_0x40c243(0x687)]['call'](this);for(const _0x53b20f of this[_0x40c243(0x8ef)]()){_0x53b20f&&_0x10348d[_0x40c243(0x3dd)](_0x53b20f);}return _0x10348d[_0x40c243(0x3dd)](this['currentClass'](),this[_0x40c243(0x68e)]()),_0x10348d;},Object[_0x41d84b(0x54a)](Game_Enemy[_0x41d84b(0x806)],_0x41d84b(0x703),{'get':function(){const _0x4c2388=_0x41d84b;return this[_0x4c2388(0x8bf)]();},'configurable':!![]}),Game_Enemy[_0x41d84b(0x806)][_0x41d84b(0x8bf)]=function(){const _0x59dbff=_0x41d84b;return this[_0x59dbff(0x625)]()[_0x59dbff(0x703)];},Game_Enemy['prototype'][_0x41d84b(0x32a)]=function(){const _0x217ab0=_0x41d84b;if(!this[_0x217ab0(0x82a)]){if(_0x217ab0(0x1dc)===_0x217ab0(0x1dc))this['_screenY']+=Math[_0x217ab0(0x7f6)]((Graphics['height']-0x270)/0x2),this[_0x217ab0(0x146)]-=Math[_0x217ab0(0x5d1)]((Graphics[_0x217ab0(0x536)]-Graphics[_0x217ab0(0x7d0)])/0x2),$gameSystem[_0x217ab0(0x66e)]()?'JqoaT'===_0x217ab0(0x60f)?this[_0x217ab0(0x2c2)]-=Math[_0x217ab0(0x5d1)]((Graphics['width']-Graphics[_0x217ab0(0x1ac)])/0x2):_0x14696c=_0x1fabcb[_0x217ab0(0x81e)](_0x22ea25,_0x1abba8(_0x32ab2b(_0x4c4ff9))):_0x217ab0(0x4c9)==='PBvZO'?(_0xf98c71[_0x217ab0(0x58f)]['Input_updateGamepadState'][_0x217ab0(0x212)](this,_0x5a8989),(this[_0x217ab0(0x501)](_0x4a4b20)||this[_0x217ab0(0x10d)](_0x2c034e))&&this[_0x217ab0(0x5b1)](_0x4eff1f)):this[_0x217ab0(0x2c2)]+=Math[_0x217ab0(0x7f6)]((Graphics[_0x217ab0(0x1ac)]-0x330)/0x2);else for(const _0x48afbd of this[_0x217ab0(0x284)]){this['removePointAnimation'](_0x48afbd);}}this['_repositioned']=!![];},Game_Party[_0x41d84b(0x806)][_0x41d84b(0x102)]=function(){const _0x15d755=_0x41d84b;return VisuMZ[_0x15d755(0x58f)][_0x15d755(0x550)]['Gold']['GoldMax'];},VisuMZ['CoreEngine'][_0x41d84b(0x105)]=Game_Party[_0x41d84b(0x806)]['consumeItem'],Game_Party[_0x41d84b(0x806)][_0x41d84b(0x635)]=function(_0x4e2295){const _0x36c75f=_0x41d84b;if(VisuMZ[_0x36c75f(0x58f)][_0x36c75f(0x550)][_0x36c75f(0x1bb)][_0x36c75f(0x803)]&&DataManager[_0x36c75f(0x352)](_0x4e2295))return;VisuMZ[_0x36c75f(0x58f)][_0x36c75f(0x105)]['call'](this,_0x4e2295);},Game_Party[_0x41d84b(0x806)][_0x41d84b(0x884)]=function(){const _0xd6d1d0=_0x41d84b,_0x230993=VisuMZ[_0xd6d1d0(0x58f)][_0xd6d1d0(0x550)][_0xd6d1d0(0x1bb)],_0x2270f9=_0x230993['BTestAddedQuantity']??0x63;let _0x113c41=[];if(_0x230993[_0xd6d1d0(0x887)]??!![]){if(_0xd6d1d0(0x590)===_0xd6d1d0(0x4c1))return this[_0xd6d1d0(0x625)]()['level'];else _0x113c41=_0x113c41[_0xd6d1d0(0x4dc)]($dataItems);}if(_0x230993[_0xd6d1d0(0x207)]??!![]){if(_0xd6d1d0(0x3fe)!==_0xd6d1d0(0x777))_0x113c41=_0x113c41[_0xd6d1d0(0x4dc)]($dataWeapons);else return 0xc0;}if(_0x230993[_0xd6d1d0(0x7f3)]??!![]){if(_0xd6d1d0(0x614)===_0xd6d1d0(0x614))_0x113c41=_0x113c41['concat']($dataArmors);else{if(_0x2477bb[_0xd6d1d0(0x190)]())_0x386e48['log'](_0x110187);}}for(const _0x4bbfdf of _0x113c41){if(_0xd6d1d0(0x7a6)!==_0xd6d1d0(0xd6)){if(!_0x4bbfdf)continue;if(_0x4bbfdf[_0xd6d1d0(0x37a)]['trim']()<=0x0)continue;if(_0x4bbfdf['name'][_0xd6d1d0(0x5a2)](/-----/i))continue;this[_0xd6d1d0(0x889)](_0x4bbfdf,_0x2270f9);}else _0x21e5b7[_0xd6d1d0(0x50f)](_0x253572,_0x228e8e);}},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x1cb)]=Game_Troop[_0x41d84b(0x806)][_0x41d84b(0x854)],Game_Troop[_0x41d84b(0x806)]['setup']=function(_0x179b91){const _0x454c7e=_0x41d84b;$gameTemp[_0x454c7e(0x872)](),$gameTemp[_0x454c7e(0x3a8)](_0x179b91),VisuMZ[_0x454c7e(0x58f)][_0x454c7e(0x1cb)][_0x454c7e(0x212)](this,_0x179b91);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x174)]=Game_Map[_0x41d84b(0x806)][_0x41d84b(0x854)],Game_Map['prototype']['setup']=function(_0x378dfd){const _0x36c880=_0x41d84b;VisuMZ[_0x36c880(0x58f)][_0x36c880(0x174)][_0x36c880(0x212)](this,_0x378dfd),this['setupCoreEngine'](_0x378dfd);},Game_Map[_0x41d84b(0x806)][_0x41d84b(0x7bc)]=function(){const _0x1ed65b=_0x41d84b;this[_0x1ed65b(0x447)]=VisuMZ['CoreEngine'][_0x1ed65b(0x550)][_0x1ed65b(0x1bb)]['NoTileShadows']||![];if($dataMap&&$dataMap['note']){if($dataMap[_0x1ed65b(0x326)]['match'](/<SHOW TILE SHADOWS>/i))this['_hideTileShadows']=![];if($dataMap[_0x1ed65b(0x326)][_0x1ed65b(0x5a2)](/<HIDE TILE SHADOWS>/i))this['_hideTileShadows']=!![];}},Game_Map[_0x41d84b(0x806)][_0x41d84b(0x30c)]=function(){const _0x1ba881=_0x41d84b;if(this['_hideTileShadows']===undefined)this[_0x1ba881(0x7bc)]();return this[_0x1ba881(0x447)];},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x12e)]=Game_Character['prototype'][_0x41d84b(0x8b7)],Game_Character['prototype'][_0x41d84b(0x8b7)]=function(_0x544eb5){const _0x4e4bcc=_0x41d84b;try{if(_0x4e4bcc(0x506)==='ESxku'){const _0x49328d=_0x23a28c[_0x4e4bcc(0x58f)][_0x4e4bcc(0x550)]['ScreenShake'];this[_0x4e4bcc(0x6bf)]=_0x49328d?.[_0x4e4bcc(0x37d)]||_0x4e4bcc(0xe3);}else VisuMZ[_0x4e4bcc(0x58f)][_0x4e4bcc(0x12e)][_0x4e4bcc(0x212)](this,_0x544eb5);}catch(_0x4f9361){if($gameTemp[_0x4e4bcc(0x190)]())console[_0x4e4bcc(0x5a6)](_0x4f9361);}},Game_Player[_0x41d84b(0x806)][_0x41d84b(0x49e)]=function(){const _0x5e221b=_0x41d84b,_0x27015e=$gameMap[_0x5e221b(0x3af)]();this[_0x5e221b(0x613)]=Math['randomInt'](_0x27015e)+Math['randomInt'](_0x27015e)+this[_0x5e221b(0x2df)]();},Game_Player['prototype'][_0x41d84b(0x2df)]=function(){const _0xc3039=_0x41d84b;if($dataMap&&$dataMap[_0xc3039(0x326)]&&$dataMap[_0xc3039(0x326)][_0xc3039(0x5a2)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i))return _0xc3039(0x184)===_0xc3039(0x184)?Number(RegExp['$1']):this[_0xc3039(0x254)][_0xc3039(0x3e7)](_0x428a01);else{if(_0xc3039(0x6f2)!==_0xc3039(0x6f2)){let _0x829d65=_0xc3039(0x222)+_0x1f86bb+_0xc3039(0x910);if(this[_0xc3039(0x911)](_0x829d65))return this[_0xc3039(0x3eb)][_0x829d65];return this['_cache'][_0x829d65]=_0x2c1cd0['round'](_0x3277f2['CoreEngine']['Settings']['Param'][_0xc3039(0x395)][_0xc3039(0x212)](this,_0x4345c4)),this[_0xc3039(0x3eb)][_0x829d65];}else return VisuMZ[_0xc3039(0x58f)][_0xc3039(0x550)][_0xc3039(0x1bb)][_0xc3039(0x35f)];}},VisuMZ[_0x41d84b(0x58f)]['Game_Event_isCollidedWithEvents']=Game_Event[_0x41d84b(0x806)][_0x41d84b(0x6c0)],Game_Event[_0x41d84b(0x806)][_0x41d84b(0x6c0)]=function(_0x6c8aeb,_0x49491f){const _0x36137e=_0x41d84b;return this[_0x36137e(0x422)]()?this['checkSmartEventCollision'](_0x6c8aeb,_0x49491f):VisuMZ[_0x36137e(0x58f)][_0x36137e(0x189)][_0x36137e(0x212)](this,_0x6c8aeb,_0x49491f);},Game_Event['prototype'][_0x41d84b(0x422)]=function(){const _0xf8f889=_0x41d84b;return VisuMZ[_0xf8f889(0x58f)][_0xf8f889(0x550)][_0xf8f889(0x1bb)][_0xf8f889(0x289)];},Game_Event[_0x41d84b(0x806)]['checkSmartEventCollision']=function(_0x31bbb5,_0xb72b69){const _0x8bd312=_0x41d84b;if(!this[_0x8bd312(0x89e)]())return![];else{if(_0x8bd312(0x48b)!==_0x8bd312(0x6dd)){const _0x7fbf64=$gameMap[_0x8bd312(0x86b)](_0x31bbb5,_0xb72b69)[_0x8bd312(0x853)](_0x102c92=>_0x102c92[_0x8bd312(0x89e)]());return _0x7fbf64[_0x8bd312(0x669)]>0x0;}else return this[_0x8bd312(0x391)](_0x5d2851,_0x55a23a);}},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x118)]=Game_Interpreter[_0x41d84b(0x806)][_0x41d84b(0x825)],Game_Interpreter['prototype'][_0x41d84b(0x825)]=function(_0x473297){const _0x4d7448=_0x41d84b,_0xf54d15=this[_0x4d7448(0x7bf)]();if(_0xf54d15['match'](/\/\/[ ]SCRIPT[ ]CALL/i))return this[_0x4d7448(0x6c7)](_0xf54d15);else{if('HraeZ'==='XpECQ'){if(this[_0x4d7448(0x75a)]['key%1'[_0x4d7448(0x125)](_0x21c244)]!==_0x45d34d['buttonAssistKey%1'[_0x4d7448(0x125)](_0x5da91c)]())return this[_0x4d7448(0x427)]();if(this['_data'][_0x4d7448(0x820)[_0x4d7448(0x125)](_0x3621c0)]!==_0x1f0d04[_0x4d7448(0x2ce)[_0x4d7448(0x125)](_0x4a2d03)]())return this[_0x4d7448(0x427)]();}else return VisuMZ['CoreEngine'][_0x4d7448(0x118)][_0x4d7448(0x212)](this,_0x473297);}},Game_Interpreter['prototype']['getCombinedScrollingText']=function(){const _0x5d20b0=_0x41d84b;let _0x6722b1='',_0x4f2951=this[_0x5d20b0(0x492)]+0x1;while(this[_0x5d20b0(0x4d4)][_0x4f2951]&&this[_0x5d20b0(0x4d4)][_0x4f2951][_0x5d20b0(0xec)]===0x195){_0x6722b1+=this[_0x5d20b0(0x4d4)][_0x4f2951][_0x5d20b0(0x543)][0x0]+'\x0a',_0x4f2951++;}return _0x6722b1;},Game_Interpreter[_0x41d84b(0x806)][_0x41d84b(0x6c7)]=function(_0xe91f2f){const _0x58e3a0=_0x41d84b;try{if(_0x58e3a0(0x6db)==='lrIKM')eval(_0xe91f2f);else return _0x245c2e['CoreEngine'][_0x58e3a0(0x332)][_0x58e3a0(0x212)](this);}catch(_0x16e8cb){if(_0x58e3a0(0x43a)!==_0x58e3a0(0x744))$gameTemp[_0x58e3a0(0x190)]()&&(console[_0x58e3a0(0x5a6)](_0x58e3a0(0x151)),console['log'](_0x16e8cb));else{const _0x386e1c=_0x45b988['CoreEngine']['Settings'][_0x58e3a0(0x1bb)][_0x58e3a0(0x10c)];if(_0x386e1c>0x0)_0x3ccb21[_0x58e3a0(0x674)](_0x386e1c);}}return!![];},VisuMZ['CoreEngine']['Game_Interpreter_command111']=Game_Interpreter[_0x41d84b(0x806)][_0x41d84b(0x6a4)],Game_Interpreter[_0x41d84b(0x806)]['command111']=function(_0x191f51){const _0x529770=_0x41d84b;try{VisuMZ[_0x529770(0x58f)][_0x529770(0x697)][_0x529770(0x212)](this,_0x191f51);}catch(_0x34f0a6){$gameTemp['isPlaytest']()&&(console[_0x529770(0x5a6)](_0x529770(0x167)),console[_0x529770(0x5a6)](_0x34f0a6)),this['skipBranch']();}return!![];},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x778)]=Game_Interpreter[_0x41d84b(0x806)][_0x41d84b(0x545)],Game_Interpreter['prototype'][_0x41d84b(0x545)]=function(_0x7e48f1){const _0x32966c=_0x41d84b;try{_0x32966c(0x3a9)!==_0x32966c(0x3a9)?_0x752507[_0x32966c(0x58f)][_0x32966c(0x550)][_0x32966c(0x1bb)][_0x32966c(0x419)]&&(this[_0x32966c(0x7ab)]=![]):VisuMZ[_0x32966c(0x58f)][_0x32966c(0x778)][_0x32966c(0x212)](this,_0x7e48f1);}catch(_0x30746a){_0x32966c(0x756)!==_0x32966c(0x756)?_0x5b9065+='%1\x0a'['format'](_0x9b4841[_0x32966c(0x543)][0x0]):$gameTemp[_0x32966c(0x190)]()&&(console[_0x32966c(0x5a6)](_0x32966c(0x6d1)),console[_0x32966c(0x5a6)](_0x30746a));}return!![];},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x6eb)]=Game_Interpreter[_0x41d84b(0x806)]['command355'],Game_Interpreter[_0x41d84b(0x806)][_0x41d84b(0x783)]=function(){const _0x3c93ce=_0x41d84b;try{VisuMZ['CoreEngine'][_0x3c93ce(0x6eb)][_0x3c93ce(0x212)](this);}catch(_0x5a0063){$gameTemp[_0x3c93ce(0x190)]()&&(_0x3c93ce(0x531)===_0x3c93ce(0x531)?(console['log'](_0x3c93ce(0x63c)),console['log'](_0x5a0063)):this[_0x3c93ce(0x1b0)]=0x2);}return!![];},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x741)]=Game_Interpreter[_0x41d84b(0x806)][_0x41d84b(0x797)],Game_Interpreter['prototype'][_0x41d84b(0x797)]=function(_0x513321){const _0x3bf3d0=_0x41d84b;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x3bf3d0(0x58f)]['Game_Interpreter_PluginCommand'][_0x3bf3d0(0x212)](this,_0x513321);},Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x4a9)]=function(){const _0x5c317a=_0x41d84b;return VisuMZ['CoreEngine'][_0x5c317a(0x550)]['UI'][_0x5c317a(0x4ba)];},Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x409)]=function(){const _0x4e2112=_0x41d84b;return VisuMZ[_0x4e2112(0x58f)][_0x4e2112(0x550)]['UI']['BottomHelp'];},Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x28b)]=function(){const _0x47592b=_0x41d84b;return VisuMZ['CoreEngine'][_0x47592b(0x550)]['UI'][_0x47592b(0x706)];},Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x6b4)]=function(){const _0x3df298=_0x41d84b;return VisuMZ[_0x3df298(0x58f)]['Settings']['UI']['RightMenus'];},Scene_Base[_0x41d84b(0x806)]['mainCommandWidth']=function(){const _0x293038=_0x41d84b;return VisuMZ[_0x293038(0x58f)][_0x293038(0x550)]['UI'][_0x293038(0x2c3)];},Scene_Base[_0x41d84b(0x806)]['buttonAreaHeight']=function(){const _0x29bc74=_0x41d84b;return VisuMZ['CoreEngine'][_0x29bc74(0x550)]['UI'][_0x29bc74(0x78d)];},Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x321)]=function(){const _0x36aad0=_0x41d84b;return VisuMZ[_0x36aad0(0x58f)]['Settings'][_0x36aad0(0x17f)][_0x36aad0(0x2a6)];},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x784)]=Scene_Base['prototype'][_0x41d84b(0x539)],Scene_Base[_0x41d84b(0x806)]['createWindowLayer']=function(){const _0x47ae12=_0x41d84b;VisuMZ['CoreEngine'][_0x47ae12(0x784)][_0x47ae12(0x212)](this),this['createButtonAssistWindow'](),this['_windowLayer']['x']=Math[_0x47ae12(0x7f6)](this[_0x47ae12(0x399)]['x']),this[_0x47ae12(0x399)]['y']=Math[_0x47ae12(0x7f6)](this[_0x47ae12(0x399)]['y']);},Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x3b4)]=function(){},Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x628)]=function(){const _0x8a710=_0x41d84b;return TextManager[_0x8a710(0x350)]('pageup',_0x8a710(0x28e));},Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x2ee)]=function(){const _0x2b19e6=_0x41d84b;return TextManager[_0x2b19e6(0x2e1)](_0x2b19e6(0x860));},Scene_Base['prototype'][_0x41d84b(0x4f3)]=function(){const _0x1aec0e=_0x41d84b;return TextManager[_0x1aec0e(0x2e1)](_0x1aec0e(0x831));},Scene_Base[_0x41d84b(0x806)]['buttonAssistKey4']=function(){const _0x666b5c=_0x41d84b;return TextManager[_0x666b5c(0x2e1)]('ok');},Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x23d)]=function(){const _0x16503d=_0x41d84b;return TextManager['getInputButtonString'](_0x16503d(0x658));},Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x28c)]=function(){const _0x4762e7=_0x41d84b;return this[_0x4762e7(0x856)]&&this[_0x4762e7(0x856)][_0x4762e7(0x7b6)]?_0x4762e7(0x72b)!==_0x4762e7(0x218)?TextManager[_0x4762e7(0x66c)]:![]:'';},Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x709)]=function(){return'';},Scene_Base[_0x41d84b(0x806)]['buttonAssistText3']=function(){return'';},Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x3e1)]=function(){const _0x55467d=_0x41d84b;return TextManager[_0x55467d(0x8ee)];},Scene_Base[_0x41d84b(0x806)]['buttonAssistText5']=function(){const _0x472579=_0x41d84b;return TextManager[_0x472579(0x103)];},Scene_Base['prototype'][_0x41d84b(0x672)]=function(){return 0x0;},Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x2ac)]=function(){return 0x0;},Scene_Base[_0x41d84b(0x806)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x7ca)]=function(){return 0x0;},Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x3d5)]=function(){return 0x0;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x622)]=Scene_Boot[_0x41d84b(0x806)][_0x41d84b(0x44d)],Scene_Boot[_0x41d84b(0x806)][_0x41d84b(0x44d)]=function(){const _0x29352c=_0x41d84b;VisuMZ[_0x29352c(0x58f)][_0x29352c(0x622)][_0x29352c(0x212)](this),this[_0x29352c(0x847)]();},Scene_Boot[_0x41d84b(0x806)]['loadGameImagesCoreEngine']=function(){const _0xff2572=_0x41d84b,_0x48a238=[_0xff2572(0x653),_0xff2572(0x382),'battlebacks2','characters',_0xff2572(0x1ee),'faces','parallaxes',_0xff2572(0x426),_0xff2572(0x367),_0xff2572(0x8c2),'system',_0xff2572(0x2b3),_0xff2572(0x57b),_0xff2572(0x55e)];for(const _0x21902a of _0x48a238){if('AxKSj'!==_0xff2572(0x287)){const _0x59d6ab=VisuMZ[_0xff2572(0x58f)][_0xff2572(0x550)][_0xff2572(0x73d)][_0x21902a],_0x24c703=_0xff2572(0x123)[_0xff2572(0x125)](_0x21902a);for(const _0x2e23f2 of _0x59d6ab){_0xff2572(0x50a)===_0xff2572(0x120)?_0x51d7b7(_0x5e461a):ImageManager[_0xff2572(0x3fa)](_0x24c703,_0x2e23f2);}}else this[_0xff2572(0x7d9)]();}},VisuMZ['CoreEngine'][_0x41d84b(0x3cc)]=Scene_Boot['prototype']['startNormalGame'],Scene_Boot[_0x41d84b(0x806)]['startNormalGame']=function(){const _0x5951ec=_0x41d84b;Utils[_0x5951ec(0x503)](_0x5951ec(0x867))&&VisuMZ[_0x5951ec(0x58f)]['Settings'][_0x5951ec(0x1bb)][_0x5951ec(0x8c3)]?this['startAutoNewGame']():VisuMZ[_0x5951ec(0x58f)][_0x5951ec(0x3cc)]['call'](this);},Scene_Boot[_0x41d84b(0x806)][_0x41d84b(0x8e4)]=function(){const _0x465a2f=_0x41d84b;DataManager[_0x465a2f(0x691)](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0x41d84b(0x806)][_0x41d84b(0x1d1)]=function(){const _0x9da97d=_0x41d84b,_0x167081=$dataSystem['advanced']['uiAreaWidth'],_0x112108=$dataSystem[_0x9da97d(0x796)][_0x9da97d(0x775)],_0xc1440b=VisuMZ[_0x9da97d(0x58f)][_0x9da97d(0x550)]['UI'][_0x9da97d(0x157)];Graphics[_0x9da97d(0x1ac)]=_0x167081-_0xc1440b*0x2,Graphics[_0x9da97d(0x7d0)]=_0x112108-_0xc1440b*0x2,this['determineSideButtonLayoutValid']();},VisuMZ['CoreEngine'][_0x41d84b(0x529)]=Scene_Boot['prototype']['updateDocumentTitle'],Scene_Boot[_0x41d84b(0x806)][_0x41d84b(0x8b9)]=function(){const _0x12c86e=_0x41d84b;this['isFullDocumentTitle']()?_0x12c86e(0x49f)!==_0x12c86e(0x827)?this['makeDocumentTitle']():(_0x2c240a['prototype'][_0x12c86e(0x75c)][_0x12c86e(0x212)](this),this[_0x12c86e(0x632)]()):VisuMZ['CoreEngine'][_0x12c86e(0x529)]['call'](this);},Scene_Boot[_0x41d84b(0x806)][_0x41d84b(0x2b2)]=function(){const _0x553bc9=_0x41d84b;if(Scene_Title[_0x553bc9(0x544)]==='')return![];if(Scene_Title['subtitle']===_0x553bc9(0x303))return![];if(Scene_Title[_0x553bc9(0x3a5)]==='')return![];if(Scene_Title[_0x553bc9(0x3a5)]===_0x553bc9(0x631))return![];return!![];},Scene_Boot[_0x41d84b(0x806)]['makeDocumentTitle']=function(){const _0x517b87=_0x41d84b,_0x471965=$dataSystem['gameTitle'],_0x1ebc38=Scene_Title[_0x517b87(0x544)]||'',_0xc55168=Scene_Title[_0x517b87(0x3a5)]||'',_0x286127=VisuMZ[_0x517b87(0x58f)][_0x517b87(0x550)][_0x517b87(0x557)][_0x517b87(0x7c2)][_0x517b87(0x3c8)],_0x5be757=_0x286127[_0x517b87(0x125)](_0x471965,_0x1ebc38,_0xc55168);document[_0x517b87(0x5c2)]=_0x5be757;},Scene_Boot['prototype'][_0x41d84b(0x841)]=function(){const _0x2dbb59=_0x41d84b;if(VisuMZ['CoreEngine'][_0x2dbb59(0x550)]['UI'][_0x2dbb59(0xd7)]){if('AEdxI'!==_0x2dbb59(0x3de))return 0x0;else{const _0x46afd6=Graphics['width']-Graphics[_0x2dbb59(0x1ac)]-VisuMZ[_0x2dbb59(0x58f)]['Settings']['UI'][_0x2dbb59(0x157)]*0x2,_0x12905d=Sprite_Button[_0x2dbb59(0x806)][_0x2dbb59(0x572)][_0x2dbb59(0x212)](this)*0x4;if(_0x46afd6>=_0x12905d)SceneManager[_0x2dbb59(0x72c)](!![]);}}},Scene_Title[_0x41d84b(0x544)]=VisuMZ[_0x41d84b(0x58f)]['Settings'][_0x41d84b(0x557)][_0x41d84b(0x7c2)][_0x41d84b(0x303)],Scene_Title[_0x41d84b(0x3a5)]=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)][_0x41d84b(0x557)][_0x41d84b(0x7c2)][_0x41d84b(0x3d1)],Scene_Title[_0x41d84b(0x7fc)]=VisuMZ['CoreEngine'][_0x41d84b(0x550)]['TitlePicButtons'],VisuMZ[_0x41d84b(0x58f)]['Scene_Title_drawGameTitle']=Scene_Title[_0x41d84b(0x806)][_0x41d84b(0x232)],Scene_Title['prototype'][_0x41d84b(0x232)]=function(){const _0x485051=_0x41d84b;VisuMZ[_0x485051(0x58f)]['Settings'][_0x485051(0x557)][_0x485051(0x7c2)]['drawGameTitle'][_0x485051(0x212)](this);if(Scene_Title[_0x485051(0x544)]!==''&&Scene_Title['subtitle']!==_0x485051(0x303))this[_0x485051(0x50c)]();if(Scene_Title[_0x485051(0x3a5)]!==''&&Scene_Title[_0x485051(0x3a5)]!==_0x485051(0x631))this[_0x485051(0x390)]();},Scene_Title['prototype'][_0x41d84b(0x50c)]=function(){const _0x3b29bb=_0x41d84b;VisuMZ[_0x3b29bb(0x58f)]['Settings'][_0x3b29bb(0x557)][_0x3b29bb(0x7c2)][_0x3b29bb(0x50c)]['call'](this);},Scene_Title['prototype'][_0x41d84b(0x390)]=function(){const _0x3f84a1=_0x41d84b;VisuMZ[_0x3f84a1(0x58f)][_0x3f84a1(0x550)][_0x3f84a1(0x557)][_0x3f84a1(0x7c2)][_0x3f84a1(0x390)][_0x3f84a1(0x212)](this);},Scene_Title[_0x41d84b(0x806)][_0x41d84b(0x720)]=function(){const _0x2eca84=_0x41d84b;this['createTitleButtons']();const _0x392250=$dataSystem[_0x2eca84(0x5bc)][_0x2eca84(0x19c)],_0x2f583f=this[_0x2eca84(0x8ba)]();this[_0x2eca84(0x87a)]=new Window_TitleCommand(_0x2f583f),this[_0x2eca84(0x87a)]['setBackgroundType'](_0x392250);const _0xceea4a=this['commandWindowRect']();this[_0x2eca84(0x87a)][_0x2eca84(0x5a1)](_0xceea4a['x'],_0xceea4a['y'],_0xceea4a[_0x2eca84(0x3a6)],_0xceea4a['height']),this[_0x2eca84(0x2e3)](this[_0x2eca84(0x87a)]);},Scene_Title[_0x41d84b(0x806)][_0x41d84b(0x486)]=function(){const _0x34408f=_0x41d84b;if(this[_0x34408f(0x87a)]){if(_0x34408f(0x7c6)!==_0x34408f(0x8e1))return this[_0x34408f(0x87a)][_0x34408f(0x5ce)]();else{const _0x36e2f9=this[_0x34408f(0x6d2)](_0x3a745f),_0x5d7508=this[_0x34408f(0x751)](_0x281195),_0x371557=this['targetEvaRate'](_0x2f94c0);return _0x36e2f9*(_0x5d7508-_0x371557);}}else{if('biSxL'===_0x34408f(0x380)){_0x15bbe8[_0x34408f(0x754)]&&_0x3d97de[_0x34408f(0x754)]();const _0x3d33d4=this['getPointAnimationLayer']();if(_0x3d33d4)_0x3d33d4[_0x34408f(0x568)](_0x583776);}else return VisuMZ[_0x34408f(0x58f)][_0x34408f(0x550)][_0x34408f(0x85f)]['length'];}},Scene_Title[_0x41d84b(0x806)][_0x41d84b(0x8ba)]=function(){const _0x52b438=_0x41d84b;return VisuMZ[_0x52b438(0x58f)]['Settings'][_0x52b438(0x557)][_0x52b438(0x7c2)][_0x52b438(0x824)][_0x52b438(0x212)](this);},Scene_Title[_0x41d84b(0x806)][_0x41d84b(0x855)]=function(){const _0x1a9b93=_0x41d84b;for(const _0x13584a of Scene_Title[_0x1a9b93(0x7fc)]){const _0xdeaf8c=new Sprite_TitlePictureButton(_0x13584a);this['addChild'](_0xdeaf8c);}},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x341)]=Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x3e9)],Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x3e9)]=function(){const _0x7d7edb=_0x41d84b;VisuMZ[_0x7d7edb(0x58f)][_0x7d7edb(0x341)][_0x7d7edb(0x212)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this['clearOnceParallelInterpreters']();},VisuMZ['CoreEngine'][_0x41d84b(0x6b0)]=Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x6c1)],Scene_Map['prototype'][_0x41d84b(0x6c1)]=function(){const _0x1f5484=_0x41d84b;VisuMZ['CoreEngine']['Scene_Map_updateMainMultiply'][_0x1f5484(0x212)](this),$gameTemp[_0x1f5484(0x3a2)]&&!$gameMessage[_0x1f5484(0x78e)]()&&(_0x1f5484(0x7e9)!==_0x1f5484(0x7e9)?(_0x1891c8[_0x1f5484(0x58f)][_0x1f5484(0x71a)][_0x1f5484(0x212)](this),_0x4d5350=this[_0x1f5484(0x690)]):(this[_0x1f5484(0x4ad)](),SceneManager[_0x1f5484(0x4b2)]()));},Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x85e)]=function(){const _0x2b4460=_0x41d84b;Scene_Message[_0x2b4460(0x806)]['terminate'][_0x2b4460(0x212)](this),!SceneManager['isNextScene'](Scene_Battle)&&(_0x2b4460(0x7f5)!==_0x2b4460(0x6da)?(this[_0x2b4460(0x690)][_0x2b4460(0x75c)](),this['_mapNameWindow']['hide'](),this[_0x2b4460(0x399)]['visible']=![],SceneManager[_0x2b4460(0x869)]()):this['switchModes'](_0x2b4460(0x2d5))),$gameScreen[_0x2b4460(0x416)](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x2cd)]=Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x5f8)],Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x5f8)]=function(){const _0x19e0d1=_0x41d84b;VisuMZ[_0x19e0d1(0x58f)][_0x19e0d1(0x2cd)][_0x19e0d1(0x212)](this),SceneManager[_0x19e0d1(0x8e3)]()&&this[_0x19e0d1(0x573)]();},Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x573)]=function(){const _0x229d2f=_0x41d84b;this[_0x229d2f(0x423)]['x']=Graphics['boxWidth']+0x4;},VisuMZ['CoreEngine'][_0x41d84b(0x172)]=Scene_Map['prototype'][_0x41d84b(0x7cd)],Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x7cd)]=function(){const _0x40c905=_0x41d84b;VisuMZ[_0x40c905(0x58f)][_0x40c905(0x172)][_0x40c905(0x212)](this),this[_0x40c905(0x433)]();},Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x433)]=function(){const _0x262937=_0x41d84b;Input[_0x262937(0x439)](_0x262937(0x8e8))&&(ConfigManager['alwaysDash']=!ConfigManager[_0x262937(0x665)],ConfigManager[_0x262937(0x3ac)]());},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x77d)]=Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x4ad)],Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x4ad)]=function(){const _0x4fd240=_0x41d84b;VisuMZ['CoreEngine']['Scene_Map_updateMain'][_0x4fd240(0x212)](this),this[_0x4fd240(0x313)]();},Scene_Map['prototype'][_0x41d84b(0x886)]=function(){const _0x9e4601=_0x41d84b;this[_0x9e4601(0x43b)]=[];},Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x313)]=function(){const _0x5d67b3=_0x41d84b;if(!this[_0x5d67b3(0x43b)])return;for(const _0x5f0ccf of this[_0x5d67b3(0x43b)]){_0x5f0ccf&&_0x5f0ccf[_0x5d67b3(0x75c)]();}},Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x440)]=function(_0x1633aa){const _0x5e9a75=_0x41d84b,_0x2104ba=$dataCommonEvents[_0x1633aa];if(!_0x2104ba)return;const _0x4ec89d=new Game_OnceParallelInterpreter();this[_0x5e9a75(0x40c)](_0x4ec89d),_0x4ec89d[_0x5e9a75(0x20a)](_0x1633aa);},Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x40c)]=function(_0x2f9b40){const _0x1922fc=_0x41d84b;this['_onceParallelInterpreters']=this[_0x1922fc(0x43b)]||[],this[_0x1922fc(0x43b)][_0x1922fc(0x3dd)](_0x2f9b40);},Scene_Map['prototype']['removeOnceParallelInterpreter']=function(_0x1a5b1b){const _0x4d9daa=_0x41d84b;this[_0x4d9daa(0x43b)]=this['_onceParallelInterpreters']||[],this['_onceParallelInterpreters']['remove'](_0x1a5b1b);};function Game_OnceParallelInterpreter(){const _0x58c64b=_0x41d84b;this[_0x58c64b(0x3e9)](...arguments);}Game_OnceParallelInterpreter[_0x41d84b(0x806)]=Object[_0x41d84b(0x397)](Game_Interpreter['prototype']),Game_OnceParallelInterpreter['prototype'][_0x41d84b(0x45d)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x41d84b(0x806)]['setCommonEvent']=function(_0x1f2979){const _0x5bf986=_0x41d84b,_0x32907b=$dataCommonEvents[_0x1f2979];if(_0x32907b){if(_0x5bf986(0x7ee)!==_0x5bf986(0x47b))this['setup'](_0x32907b[_0x5bf986(0x3b8)],0x0);else return _0x4a0d86[_0x5bf986(0x58f)][_0x5bf986(0x550)][_0x5bf986(0x17f)][_0x5bf986(0x1a8)];}else this[_0x5bf986(0x85e)]();},Game_OnceParallelInterpreter[_0x41d84b(0x806)][_0x41d84b(0x85e)]=function(){const _0x536aa3=_0x41d84b;if(!SceneManager[_0x536aa3(0x215)]())return;SceneManager['_scene'][_0x536aa3(0x749)](this),Game_Interpreter['prototype'][_0x536aa3(0x85e)][_0x536aa3(0x212)](this);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x208)]=Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x813)],Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x813)]=function(){const _0x28c4d0=_0x41d84b;let _0x5a6a44=0x0;SceneManager[_0x28c4d0(0x20d)]()?_0x5a6a44=this[_0x28c4d0(0x60c)]():_0x28c4d0(0x603)!==_0x28c4d0(0xf1)?_0x5a6a44=VisuMZ['CoreEngine'][_0x28c4d0(0x208)]['call'](this):this[_0x28c4d0(0x68b)][_0x28c4d0(0x325)](_0x3da36d[_0x28c4d0(0x540)][_0x28c4d0(0x2cf)]);if(this[_0x28c4d0(0x33c)]()&&this[_0x28c4d0(0x8b0)]()===_0x28c4d0(0x8e9)){if(_0x28c4d0(0x88f)==='TZMYi')return _0xca3b83[_0x28c4d0(0x58f)][_0x28c4d0(0x77e)][_0x2a2727]||0x0;else _0x5a6a44+=Window_ButtonAssist['prototype'][_0x28c4d0(0x115)]();}return _0x5a6a44;},Scene_MenuBase['prototype'][_0x41d84b(0x60c)]=function(){const _0x2534c7=_0x41d84b;if(this[_0x2534c7(0x409)]()){if(_0x2534c7(0x4cc)!==_0x2534c7(0x5c4))return this[_0x2534c7(0x891)]();else _0x51c703[_0x2534c7(0x533)]&&(this[_0x2534c7(0x1b0)]=_0x2534c7(0x421));}else return 0x0;},VisuMZ[_0x41d84b(0x58f)]['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x430)],Scene_MenuBase[_0x41d84b(0x806)]['mainAreaTop']=function(){const _0x1b331f=_0x41d84b;if(SceneManager[_0x1b331f(0x20d)]())return this[_0x1b331f(0x334)]();else{if(_0x1b331f(0xf5)===_0x1b331f(0xf5))return VisuMZ[_0x1b331f(0x58f)][_0x1b331f(0x19d)][_0x1b331f(0x212)](this);else{const _0x5794f3=_0x1d32ba+(this[_0x1b331f(0x115)]()-_0x23a06f[_0x1b331f(0x74c)])/0x2;this['drawIcon'](_0xae9480,_0x1b24c6+(_0x24b975-_0x1e0dbe[_0x1b331f(0x69f)]),_0x5794f3),_0x4a100b-=_0x5d9c17[_0x1b331f(0x69f)]+0x4;}}},Scene_MenuBase['prototype'][_0x41d84b(0x334)]=function(){const _0x38af9c=_0x41d84b;if(!this[_0x38af9c(0x409)]())return this['helpAreaBottom']();else{if(_0x38af9c(0x35d)!=='MLZZe')return 0x0;else{if(_0x136959[_0x38af9c(0x79d)][_0x38af9c(0x212)](this)){const _0x165d6a=_0x3c0266['Symbol'];let _0x33caba=_0x29d6c5[_0x38af9c(0x1db)];if(['',_0x38af9c(0x5fa)][_0x38af9c(0x4c8)](_0x33caba))_0x33caba=_0x136a4f[_0x38af9c(0x823)]['call'](this);const _0x5ae478=_0x3d413e[_0x38af9c(0x262)][_0x38af9c(0x212)](this),_0x9fc40d=_0x210868[_0x38af9c(0x648)][_0x38af9c(0x212)](this);this[_0x38af9c(0x5e6)](_0x33caba,_0x165d6a,_0x5ae478,_0x9fc40d),this[_0x38af9c(0x589)](_0x165d6a,_0x24418c[_0x38af9c(0x19f)][_0x38af9c(0x44f)](this,_0x9fc40d));}}}},VisuMZ['CoreEngine'][_0x41d84b(0x792)]=Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x450)],Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x450)]=function(){const _0x51cb44=_0x41d84b;let _0x1e386f=0x0;if(SceneManager[_0x51cb44(0x20d)]()){if('jhKxs'!==_0x51cb44(0x630)){const _0x1a0cfd=_0x51cb44(0x1ba)['format'](_0x2fceb2[_0x51cb44(0x1ed)](0x3)),_0x133043=new _0x487934(),_0x4e2764='data/'+_0x1a0cfd;_0x133043[_0x51cb44(0x22d)](_0x51cb44(0x514),_0x4e2764),_0x133043['overrideMimeType'](_0x51cb44(0x136)),_0x133043[_0x51cb44(0x858)]=()=>this['storeMapData'](_0x133043,_0x280666,_0x1a0cfd,_0x4e2764),_0x133043[_0x51cb44(0x604)]=()=>_0x28a840[_0x51cb44(0x1d5)](_0x51cb44(0x330),_0x1a0cfd,_0x4e2764),_0x133043['send']();}else _0x1e386f=this[_0x51cb44(0x4d3)]();}else _0x1e386f=VisuMZ['CoreEngine'][_0x51cb44(0x792)][_0x51cb44(0x212)](this);if(this[_0x51cb44(0x33c)]()&&this[_0x51cb44(0x8b0)]()!==_0x51cb44(0x52c)){if(_0x51cb44(0x6b8)==='PiRzE')_0x1e386f-=Window_ButtonAssist[_0x51cb44(0x806)][_0x51cb44(0x115)]();else return _0x3fb628['CoreEngine'][_0x51cb44(0x4e9)][_0x51cb44(0x212)](this,_0x45db9d);}return _0x1e386f;},Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x4d3)]=function(){return Graphics['boxHeight']-this['helpAreaHeight']();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x5da)]=Scene_MenuBase['prototype']['createBackground'],Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x476)]=function(){const _0x44428b=_0x41d84b;this['_backgroundFilter']=new PIXI['filters']['BlurFilter'](clamp=!![]),this[_0x44428b(0x3ea)]=new Sprite(),this[_0x44428b(0x3ea)][_0x44428b(0x4fd)]=SceneManager[_0x44428b(0x663)](),this['_backgroundSprite'][_0x44428b(0x84b)]=[this['_backgroundFilter']],this[_0x44428b(0x41b)](this[_0x44428b(0x3ea)]),this['setBackgroundOpacity'](0xc0),this[_0x44428b(0x652)](this['getBackgroundOpacity']()),this[_0x44428b(0x645)]();},Scene_MenuBase[_0x41d84b(0x806)]['getBackgroundOpacity']=function(){const _0x506f90=_0x41d84b,_0x4a200c=String(this['constructor'][_0x506f90(0x37a)]),_0x15ebc5=this[_0x506f90(0x309)](_0x4a200c);if(_0x15ebc5)return _0x15ebc5['SnapshotOpacity'];else{if(_0x506f90(0x839)===_0x506f90(0x839))return 0xc0;else _0x1a0bc4[_0x506f90(0x58f)][_0x506f90(0x12e)][_0x506f90(0x212)](this,_0x3f1bb4);}},Scene_MenuBase[_0x41d84b(0x806)]['createCustomBackgroundImages']=function(){const _0x1dbe67=_0x41d84b,_0x3ca96f=String(this[_0x1dbe67(0x45d)][_0x1dbe67(0x37a)]),_0x48586e=this['getCustomBackgroundSettings'](_0x3ca96f);_0x48586e&&(_0x48586e[_0x1dbe67(0x1e4)]!==''||_0x48586e[_0x1dbe67(0x571)]!=='')&&(_0x1dbe67(0x166)===_0x1dbe67(0x1f9)?this[_0x1dbe67(0x779)]((_0x2e6e8e-_0x37fce1+_0x50e99b)%_0x46e876):(this['_backSprite1']=new Sprite(ImageManager[_0x1dbe67(0xef)](_0x48586e[_0x1dbe67(0x1e4)])),this[_0x1dbe67(0x765)]=new Sprite(ImageManager['loadTitle2'](_0x48586e[_0x1dbe67(0x571)])),this[_0x1dbe67(0x41b)](this[_0x1dbe67(0x892)]),this[_0x1dbe67(0x41b)](this[_0x1dbe67(0x765)]),this[_0x1dbe67(0x892)][_0x1dbe67(0x4fd)][_0x1dbe67(0x179)](this[_0x1dbe67(0x8f0)][_0x1dbe67(0x44f)](this,this[_0x1dbe67(0x892)])),this[_0x1dbe67(0x765)]['bitmap'][_0x1dbe67(0x179)](this[_0x1dbe67(0x8f0)]['bind'](this,this[_0x1dbe67(0x765)]))));},Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x309)]=function(_0x3ae39f){const _0x27df85=_0x41d84b;return VisuMZ['CoreEngine']['Settings'][_0x27df85(0x75b)][_0x3ae39f]||VisuMZ['CoreEngine'][_0x27df85(0x550)]['MenuBg']['Scene_Unlisted'];},Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x8f0)]=function(_0x3e43c7){const _0x22e46b=_0x41d84b;this[_0x22e46b(0x46c)](_0x3e43c7),this[_0x22e46b(0x253)](_0x3e43c7);},VisuMZ['CoreEngine']['Scene_MenuBase_createCancelButton']=Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x8f8)],Scene_MenuBase[_0x41d84b(0x806)]['createCancelButton']=function(){const _0x50c4f7=_0x41d84b;VisuMZ['CoreEngine'][_0x50c4f7(0x90c)][_0x50c4f7(0x212)](this),SceneManager[_0x50c4f7(0x8e3)]()&&('wBjlC'===_0x50c4f7(0x905)?this[_0x50c4f7(0x5a0)]['setBackgroundType'](_0x1bb778['layoutSettings'][_0x50c4f7(0x53b)]):this[_0x50c4f7(0x87b)]());},Scene_MenuBase[_0x41d84b(0x806)]['moveCancelButtonSideButtonLayout']=function(){const _0x1f97b9=_0x41d84b;this[_0x1f97b9(0x76a)]['x']=Graphics[_0x1f97b9(0x1ac)]+0x4;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x418)]=Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x2f5)],Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x2f5)]=function(){const _0xf2df4c=_0x41d84b;VisuMZ[_0xf2df4c(0x58f)][_0xf2df4c(0x418)][_0xf2df4c(0x212)](this),SceneManager[_0xf2df4c(0x8e3)]()&&('nDICt'!==_0xf2df4c(0x1c8)?_0x171ae0[_0xf2df4c(0x58f)]['Window_NameInput_processTouch'][_0xf2df4c(0x212)](this):this[_0xf2df4c(0x67a)]());},Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x67a)]=function(){const _0x4c5924=_0x41d84b;this[_0x4c5924(0x856)]['x']=-0x1*(this[_0x4c5924(0x856)][_0x4c5924(0x3a6)]+this['_pagedownButton'][_0x4c5924(0x3a6)]+0x8),this['_pagedownButton']['x']=-0x1*(this['_pagedownButton']['width']+0x4);},Scene_MenuBase[_0x41d84b(0x806)]['isMenuButtonAssistEnabled']=function(){const _0x14b069=_0x41d84b;return VisuMZ[_0x14b069(0x58f)][_0x14b069(0x550)][_0x14b069(0x451)]['Enable'];},Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x8b0)]=function(){const _0x330280=_0x41d84b;return SceneManager[_0x330280(0x8e3)]()||SceneManager['areButtonsHidden']()?VisuMZ[_0x330280(0x58f)][_0x330280(0x550)][_0x330280(0x451)][_0x330280(0x3a7)]:_0x330280(0x52c);},Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x3b4)]=function(){const _0xc40d28=_0x41d84b;if(!this['isMenuButtonAssistEnabled']())return;const _0x1f4a35=this[_0xc40d28(0x1aa)]();this[_0xc40d28(0x148)]=new Window_ButtonAssist(_0x1f4a35),this[_0xc40d28(0x2e3)](this['_buttonAssistWindow']);},Scene_MenuBase['prototype']['buttonAssistWindowRect']=function(){const _0x509c94=_0x41d84b;return this[_0x509c94(0x8b0)]()===_0x509c94(0x52c)?this['buttonAssistWindowButtonRect']():this[_0x509c94(0x15c)]();},Scene_MenuBase['prototype'][_0x41d84b(0x8c1)]=function(){const _0x54df0b=_0x41d84b,_0x4c6e27=ConfigManager[_0x54df0b(0x5a8)]?(Sprite_Button['prototype']['blockWidth']()+0x6)*0x2:0x0,_0x1b008e=this[_0x54df0b(0xe6)](),_0x279ace=Graphics[_0x54df0b(0x1ac)]-_0x4c6e27*0x2,_0x1695a1=this[_0x54df0b(0x83f)]();return new Rectangle(_0x4c6e27,_0x1b008e,_0x279ace,_0x1695a1);},Scene_MenuBase[_0x41d84b(0x806)][_0x41d84b(0x15c)]=function(){const _0x1c75b2=_0x41d84b,_0x55c38c=Graphics['boxWidth'],_0x5c7157=Window_ButtonAssist[_0x1c75b2(0x806)][_0x1c75b2(0x115)](),_0x3978cc=0x0;let _0x1a8abc=0x0;if(this[_0x1c75b2(0x8b0)]()===_0x1c75b2(0x8e9))_0x1a8abc=0x0;else{if('PmPmm'===_0x1c75b2(0x7f1))_0x1a8abc=Graphics[_0x1c75b2(0x7d0)]-_0x5c7157;else{const _0x42a639=this['name'](),_0x3ca3f6=this[_0x1c75b2(0x442)](),_0x1ed5b0=this['bitmapHeight']();this[_0x1c75b2(0x836)](),this[_0x1c75b2(0x4fd)]['clear'](),this[_0x1c75b2(0x4fd)][_0x1c75b2(0x24b)](_0x42a639,0x0,0x0,_0x3ca3f6,_0x1ed5b0,_0x1c75b2(0x6d6));}}return new Rectangle(_0x3978cc,_0x1a8abc,_0x55c38c,_0x5c7157);},Scene_Menu[_0x41d84b(0x540)]=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)][_0x41d84b(0x557)]['MainMenu'],VisuMZ['CoreEngine'][_0x41d84b(0x8f5)]=Scene_Menu['prototype'][_0x41d84b(0x397)],Scene_Menu[_0x41d84b(0x806)][_0x41d84b(0x397)]=function(){const _0x4c639b=_0x41d84b;VisuMZ[_0x4c639b(0x58f)][_0x4c639b(0x8f5)][_0x4c639b(0x212)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Menu[_0x41d84b(0x806)][_0x41d84b(0x264)]=function(){const _0x19d071=_0x41d84b;this[_0x19d071(0x87a)]&&this[_0x19d071(0x87a)][_0x19d071(0x325)](Scene_Menu[_0x19d071(0x540)]['CommandBgType']),this[_0x19d071(0x39a)]&&this[_0x19d071(0x39a)][_0x19d071(0x325)](Scene_Menu['layoutSettings'][_0x19d071(0xf6)]),this['_statusWindow']&&this['_statusWindow'][_0x19d071(0x325)](Scene_Menu[_0x19d071(0x540)]['StatusBgType']);},Scene_Menu[_0x41d84b(0x806)][_0x41d84b(0x8ba)]=function(){const _0x3a1074=_0x41d84b;return Scene_Menu['layoutSettings']['CommandRect'][_0x3a1074(0x212)](this);},Scene_Menu[_0x41d84b(0x806)][_0x41d84b(0x234)]=function(){const _0x54561e=_0x41d84b;return Scene_Menu[_0x54561e(0x540)][_0x54561e(0x2c7)][_0x54561e(0x212)](this);},Scene_Menu['prototype']['statusWindowRect']=function(){const _0x24f697=_0x41d84b;return Scene_Menu[_0x24f697(0x540)][_0x24f697(0x7b4)][_0x24f697(0x212)](this);},Scene_Item[_0x41d84b(0x540)]=VisuMZ['CoreEngine']['Settings'][_0x41d84b(0x557)]['ItemMenu'],VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x5bd)]=Scene_Item[_0x41d84b(0x806)][_0x41d84b(0x397)],Scene_Item['prototype'][_0x41d84b(0x397)]=function(){const _0x5cd19d=_0x41d84b;VisuMZ['CoreEngine'][_0x5cd19d(0x5bd)]['call'](this),this[_0x5cd19d(0x264)]();},Scene_Item['prototype'][_0x41d84b(0x264)]=function(){const _0x470b0f=_0x41d84b;this['_helpWindow']&&this[_0x470b0f(0x68b)][_0x470b0f(0x325)](Scene_Item[_0x470b0f(0x540)][_0x470b0f(0x2cf)]),this[_0x470b0f(0x493)]&&this[_0x470b0f(0x493)][_0x470b0f(0x325)](Scene_Item[_0x470b0f(0x540)][_0x470b0f(0x121)]),this[_0x470b0f(0x2d2)]&&this['_itemWindow'][_0x470b0f(0x325)](Scene_Item[_0x470b0f(0x540)][_0x470b0f(0x5b5)]),this[_0x470b0f(0x5c9)]&&this[_0x470b0f(0x5c9)][_0x470b0f(0x325)](Scene_Item[_0x470b0f(0x540)][_0x470b0f(0x153)]);},Scene_Item[_0x41d84b(0x806)][_0x41d84b(0x3f3)]=function(){const _0x31f911=_0x41d84b;return Scene_Item[_0x31f911(0x540)][_0x31f911(0x8e5)][_0x31f911(0x212)](this);},Scene_Item[_0x41d84b(0x806)][_0x41d84b(0x2d4)]=function(){const _0xd38c06=_0x41d84b;return Scene_Item[_0xd38c06(0x540)]['CategoryRect'][_0xd38c06(0x212)](this);},Scene_Item[_0x41d84b(0x806)]['itemWindowRect']=function(){const _0x5ad10e=_0x41d84b;return Scene_Item[_0x5ad10e(0x540)][_0x5ad10e(0x696)]['call'](this);},Scene_Item[_0x41d84b(0x806)][_0x41d84b(0x2ab)]=function(){const _0x36f4af=_0x41d84b;return Scene_Item[_0x36f4af(0x540)]['ActorRect'][_0x36f4af(0x212)](this);},Scene_Skill[_0x41d84b(0x540)]=VisuMZ['CoreEngine'][_0x41d84b(0x550)][_0x41d84b(0x557)][_0x41d84b(0x794)],VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x58d)]=Scene_Skill[_0x41d84b(0x806)][_0x41d84b(0x397)],Scene_Skill[_0x41d84b(0x806)][_0x41d84b(0x397)]=function(){const _0x3bba34=_0x41d84b;VisuMZ['CoreEngine'][_0x3bba34(0x58d)][_0x3bba34(0x212)](this),this[_0x3bba34(0x264)]();},Scene_Skill['prototype'][_0x41d84b(0x264)]=function(){const _0x3506ff=_0x41d84b;this[_0x3506ff(0x68b)]&&this['_helpWindow']['setBackgroundType'](Scene_Skill[_0x3506ff(0x540)][_0x3506ff(0x2cf)]),this[_0x3506ff(0x5a0)]&&this[_0x3506ff(0x5a0)][_0x3506ff(0x325)](Scene_Skill[_0x3506ff(0x540)][_0x3506ff(0x53b)]),this[_0x3506ff(0x852)]&&this[_0x3506ff(0x852)]['setBackgroundType'](Scene_Skill[_0x3506ff(0x540)][_0x3506ff(0x8ed)]),this[_0x3506ff(0x2d2)]&&this[_0x3506ff(0x2d2)][_0x3506ff(0x325)](Scene_Skill[_0x3506ff(0x540)][_0x3506ff(0x5b5)]),this[_0x3506ff(0x5c9)]&&this[_0x3506ff(0x5c9)][_0x3506ff(0x325)](Scene_Skill[_0x3506ff(0x540)]['ActorBgType']);},Scene_Skill[_0x41d84b(0x806)][_0x41d84b(0x3f3)]=function(){const _0x16fb4c=_0x41d84b;return Scene_Skill['layoutSettings'][_0x16fb4c(0x8e5)][_0x16fb4c(0x212)](this);},Scene_Skill[_0x41d84b(0x806)][_0x41d84b(0x893)]=function(){const _0x4a3d97=_0x41d84b;return Scene_Skill[_0x4a3d97(0x540)][_0x4a3d97(0x3cf)]['call'](this);},Scene_Skill[_0x41d84b(0x806)][_0x41d84b(0x8c7)]=function(){const _0x44007f=_0x41d84b;return Scene_Skill['layoutSettings'][_0x44007f(0x7b4)][_0x44007f(0x212)](this);},Scene_Skill[_0x41d84b(0x806)][_0x41d84b(0x8c8)]=function(){const _0x2868eb=_0x41d84b;return Scene_Skill[_0x2868eb(0x540)][_0x2868eb(0x696)][_0x2868eb(0x212)](this);},Scene_Skill[_0x41d84b(0x806)]['actorWindowRect']=function(){const _0x5be8cb=_0x41d84b;return Scene_Skill[_0x5be8cb(0x540)]['ActorRect'][_0x5be8cb(0x212)](this);},Scene_Equip['layoutSettings']=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)][_0x41d84b(0x557)][_0x41d84b(0x4f8)],VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x574)]=Scene_Equip['prototype'][_0x41d84b(0x397)],Scene_Equip[_0x41d84b(0x806)][_0x41d84b(0x397)]=function(){const _0x3766f4=_0x41d84b;VisuMZ[_0x3766f4(0x58f)][_0x3766f4(0x574)][_0x3766f4(0x212)](this),this[_0x3766f4(0x264)]();},Scene_Equip['prototype'][_0x41d84b(0x264)]=function(){const _0x12cb0d=_0x41d84b;this['_helpWindow']&&this[_0x12cb0d(0x68b)][_0x12cb0d(0x325)](Scene_Equip['layoutSettings'][_0x12cb0d(0x2cf)]);this[_0x12cb0d(0x852)]&&this[_0x12cb0d(0x852)][_0x12cb0d(0x325)](Scene_Equip[_0x12cb0d(0x540)][_0x12cb0d(0x8ed)]);this[_0x12cb0d(0x87a)]&&this[_0x12cb0d(0x87a)][_0x12cb0d(0x325)](Scene_Equip['layoutSettings']['CommandBgType']);this[_0x12cb0d(0x70f)]&&('WOmTc'===_0x12cb0d(0x3bd)?(this[_0x12cb0d(0x892)]=new _0x5c74d2(_0x343f4e['loadTitle1'](_0x3d86ef['BgFilename1'])),this[_0x12cb0d(0x765)]=new _0x947196(_0xed6aab['loadTitle2'](_0x4a3083[_0x12cb0d(0x571)])),this[_0x12cb0d(0x41b)](this['_backSprite1']),this[_0x12cb0d(0x41b)](this[_0x12cb0d(0x765)]),this[_0x12cb0d(0x892)]['bitmap'][_0x12cb0d(0x179)](this['adjustSprite'][_0x12cb0d(0x44f)](this,this['_backSprite1'])),this['_backSprite2'][_0x12cb0d(0x4fd)][_0x12cb0d(0x179)](this[_0x12cb0d(0x8f0)][_0x12cb0d(0x44f)](this,this[_0x12cb0d(0x765)]))):this['_slotWindow'][_0x12cb0d(0x325)](Scene_Equip[_0x12cb0d(0x540)][_0x12cb0d(0x82b)]));if(this[_0x12cb0d(0x2d2)]){if(_0x12cb0d(0x26b)===_0x12cb0d(0x26b))this[_0x12cb0d(0x2d2)][_0x12cb0d(0x325)](Scene_Equip[_0x12cb0d(0x540)][_0x12cb0d(0x5b5)]);else return this['_lastPluginCommandInterpreter'];}},Scene_Equip[_0x41d84b(0x806)]['helpWindowRect']=function(){const _0x1ba85f=_0x41d84b;return Scene_Equip[_0x1ba85f(0x540)][_0x1ba85f(0x8e5)][_0x1ba85f(0x212)](this);},Scene_Equip[_0x41d84b(0x806)][_0x41d84b(0x8c7)]=function(){const _0x1d2351=_0x41d84b;return Scene_Equip['layoutSettings'][_0x1d2351(0x7b4)][_0x1d2351(0x212)](this);},Scene_Equip[_0x41d84b(0x806)][_0x41d84b(0x8ba)]=function(){const _0xe48db0=_0x41d84b;return Scene_Equip[_0xe48db0(0x540)]['CommandRect'][_0xe48db0(0x212)](this);},Scene_Equip[_0x41d84b(0x806)][_0x41d84b(0x902)]=function(){const _0x1f48bb=_0x41d84b;return Scene_Equip[_0x1f48bb(0x540)][_0x1f48bb(0x27c)]['call'](this);},Scene_Equip[_0x41d84b(0x806)]['itemWindowRect']=function(){const _0x461f12=_0x41d84b;return Scene_Equip[_0x461f12(0x540)][_0x461f12(0x696)]['call'](this);},Scene_Status[_0x41d84b(0x540)]=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)]['MenuLayout'][_0x41d84b(0x133)],VisuMZ['CoreEngine']['Scene_Status_create']=Scene_Status[_0x41d84b(0x806)][_0x41d84b(0x397)],Scene_Status[_0x41d84b(0x806)][_0x41d84b(0x397)]=function(){const _0x195a12=_0x41d84b;VisuMZ[_0x195a12(0x58f)][_0x195a12(0x583)][_0x195a12(0x212)](this),this[_0x195a12(0x264)]();},Scene_Status[_0x41d84b(0x806)]['setCoreEngineUpdateWindowBg']=function(){const _0xbe7b4b=_0x41d84b;this[_0xbe7b4b(0x468)]&&(_0xbe7b4b(0x8fa)!==_0xbe7b4b(0x8fa)?this[_0xbe7b4b(0x552)][_0xbe7b4b(0x5a2)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0xbe7b4b(0x695)](_0x5f5620(_0x5135aa['$1'])):_0x5b48a1['CoreEngine'][_0xbe7b4b(0x5c6)][_0xbe7b4b(0x212)](this):this[_0xbe7b4b(0x468)][_0xbe7b4b(0x325)](Scene_Status[_0xbe7b4b(0x540)]['ProfileBgType']));if(this[_0xbe7b4b(0x852)]){if(_0xbe7b4b(0x358)!=='xFhQN'){_0x21cb84[_0xbe7b4b(0x6d0)](_0x1b26cc,_0x520865);const _0x469546=_0xa58367['option']||0x1;_0x15467c[_0xbe7b4b(0x82d)](_0x469546);}else this[_0xbe7b4b(0x852)][_0xbe7b4b(0x325)](Scene_Status[_0xbe7b4b(0x540)][_0xbe7b4b(0x8ed)]);}this[_0xbe7b4b(0x522)]&&(_0xbe7b4b(0x6e0)===_0xbe7b4b(0x45f)?_0x1162e1[_0xbe7b4b(0x58f)][_0xbe7b4b(0x550)]['UI'][_0xbe7b4b(0xd7)]&&(this['_sideButtonLayout']=_0x1bbd4a):this['_statusParamsWindow'][_0xbe7b4b(0x325)](Scene_Status[_0xbe7b4b(0x540)]['StatusParamsBgType'])),this['_statusEquipWindow']&&this[_0xbe7b4b(0x61e)][_0xbe7b4b(0x325)](Scene_Status[_0xbe7b4b(0x540)][_0xbe7b4b(0x64e)]);},Scene_Status[_0x41d84b(0x806)]['profileWindowRect']=function(){const _0x492b9e=_0x41d84b;return Scene_Status[_0x492b9e(0x540)][_0x492b9e(0x122)][_0x492b9e(0x212)](this);},Scene_Status[_0x41d84b(0x806)][_0x41d84b(0x8c7)]=function(){const _0x4bf756=_0x41d84b;return Scene_Status[_0x4bf756(0x540)][_0x4bf756(0x7b4)]['call'](this);},Scene_Status[_0x41d84b(0x806)][_0x41d84b(0x4db)]=function(){const _0x3582f3=_0x41d84b;return Scene_Status[_0x3582f3(0x540)][_0x3582f3(0x900)][_0x3582f3(0x212)](this);},Scene_Status[_0x41d84b(0x806)][_0x41d84b(0x5dd)]=function(){const _0x14b89c=_0x41d84b;return Scene_Status[_0x14b89c(0x540)][_0x14b89c(0x37b)][_0x14b89c(0x212)](this);},Scene_Options[_0x41d84b(0x540)]=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)]['MenuLayout'][_0x41d84b(0x37e)],VisuMZ['CoreEngine']['Scene_Options_create']=Scene_Options[_0x41d84b(0x806)][_0x41d84b(0x397)],Scene_Options[_0x41d84b(0x806)][_0x41d84b(0x397)]=function(){const _0x52d251=_0x41d84b;VisuMZ['CoreEngine']['Scene_Options_create'][_0x52d251(0x212)](this),this[_0x52d251(0x264)]();},Scene_Options[_0x41d84b(0x806)][_0x41d84b(0x264)]=function(){const _0x5682fa=_0x41d84b;this['_optionsWindow']&&(_0x5682fa(0x5e3)==='xJfvL'?(_0x1e9c40[_0x5682fa(0x4df)](),this['deselect']()):this[_0x5682fa(0x54d)]['setBackgroundType'](Scene_Options['layoutSettings']['OptionsBgType']));},Scene_Options[_0x41d84b(0x806)][_0x41d84b(0x2ca)]=function(){const _0x3a948b=_0x41d84b;return Scene_Options[_0x3a948b(0x540)]['OptionsRect']['call'](this);},Scene_Save['layoutSettings']=VisuMZ['CoreEngine'][_0x41d84b(0x550)][_0x41d84b(0x557)][_0x41d84b(0xd9)],Scene_Save[_0x41d84b(0x806)][_0x41d84b(0x397)]=function(){const _0x4ea133=_0x41d84b;Scene_File[_0x4ea133(0x806)][_0x4ea133(0x397)][_0x4ea133(0x212)](this),this[_0x4ea133(0x264)]();},Scene_Save[_0x41d84b(0x806)][_0x41d84b(0x264)]=function(){const _0x161d80=_0x41d84b;this[_0x161d80(0x68b)]&&('XXngV'!=='XXngV'?_0x4e2a56=0x0:this['_helpWindow']['setBackgroundType'](Scene_Save['layoutSettings']['HelpBgType'])),this[_0x161d80(0x12f)]&&this[_0x161d80(0x12f)]['setBackgroundType'](Scene_Save[_0x161d80(0x540)][_0x161d80(0x781)]);},Scene_Save[_0x41d84b(0x806)][_0x41d84b(0x3f3)]=function(){const _0x3f1b07=_0x41d84b;return Scene_Save[_0x3f1b07(0x540)][_0x3f1b07(0x8e5)][_0x3f1b07(0x212)](this);},Scene_Save[_0x41d84b(0x806)]['listWindowRect']=function(){const _0x12dfe9=_0x41d84b;return Scene_Save[_0x12dfe9(0x540)][_0x12dfe9(0x758)][_0x12dfe9(0x212)](this);},Scene_Load[_0x41d84b(0x540)]=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)]['MenuLayout'][_0x41d84b(0x5cd)],Scene_Load[_0x41d84b(0x806)][_0x41d84b(0x397)]=function(){const _0x34e8f9=_0x41d84b;Scene_File[_0x34e8f9(0x806)]['create'][_0x34e8f9(0x212)](this),this[_0x34e8f9(0x264)]();},Scene_Load[_0x41d84b(0x806)][_0x41d84b(0x264)]=function(){const _0x47ade4=_0x41d84b;if(this[_0x47ade4(0x68b)]){if(_0x47ade4(0x1af)!==_0x47ade4(0x1af)){var _0x1b01a8=_0xb217de(_0x17409a['$1']);_0x469282*=_0x1b01a8;}else this[_0x47ade4(0x68b)][_0x47ade4(0x325)](Scene_Load['layoutSettings'][_0x47ade4(0x2cf)]);}if(this['_listWindow']){if(_0x47ade4(0x5fd)===_0x47ade4(0x5fd))this[_0x47ade4(0x12f)][_0x47ade4(0x325)](Scene_Load['layoutSettings']['ListBgType']);else{if(this[_0x47ade4(0x5fb)]===_0x2c73fa)this[_0x47ade4(0x914)]();if(this[_0x47ade4(0x5fb)][_0x47ade4(0x602)]===_0x23d468)this[_0x47ade4(0x914)]();this[_0x47ade4(0x5fb)]['Padding']=_0x4d5c96;}}},Scene_Load[_0x41d84b(0x806)][_0x41d84b(0x3f3)]=function(){const _0x3506b2=_0x41d84b;return Scene_Load[_0x3506b2(0x540)][_0x3506b2(0x8e5)][_0x3506b2(0x212)](this);},Scene_Load[_0x41d84b(0x806)][_0x41d84b(0x6ad)]=function(){const _0x20f490=_0x41d84b;return Scene_Load[_0x20f490(0x540)]['ListRect']['call'](this);},Scene_GameEnd['layoutSettings']=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)][_0x41d84b(0x557)][_0x41d84b(0x209)],VisuMZ['CoreEngine'][_0x41d84b(0x490)]=Scene_GameEnd[_0x41d84b(0x806)][_0x41d84b(0x476)],Scene_GameEnd['prototype']['createBackground']=function(){const _0x58eaa1=_0x41d84b;Scene_MenuBase[_0x58eaa1(0x806)]['createBackground'][_0x58eaa1(0x212)](this);},Scene_GameEnd[_0x41d84b(0x806)]['createCommandWindow']=function(){const _0x1f44ee=_0x41d84b,_0x8fbba0=this[_0x1f44ee(0x8ba)]();this[_0x1f44ee(0x87a)]=new Window_GameEnd(_0x8fbba0),this[_0x1f44ee(0x87a)]['setHandler'](_0x1f44ee(0x658),this[_0x1f44ee(0x59a)][_0x1f44ee(0x44f)](this)),this[_0x1f44ee(0x2e3)](this[_0x1f44ee(0x87a)]),this[_0x1f44ee(0x87a)][_0x1f44ee(0x325)](Scene_GameEnd[_0x1f44ee(0x540)][_0x1f44ee(0x1d7)]);},Scene_GameEnd[_0x41d84b(0x806)][_0x41d84b(0x8ba)]=function(){const _0x1de060=_0x41d84b;return Scene_GameEnd[_0x1de060(0x540)][_0x1de060(0x824)][_0x1de060(0x212)](this);},Scene_Shop[_0x41d84b(0x540)]=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)][_0x41d84b(0x557)][_0x41d84b(0x38e)],VisuMZ[_0x41d84b(0x58f)]['Scene_Shop_create']=Scene_Shop[_0x41d84b(0x806)][_0x41d84b(0x397)],Scene_Shop[_0x41d84b(0x806)][_0x41d84b(0x397)]=function(){const _0x16f801=_0x41d84b;VisuMZ[_0x16f801(0x58f)][_0x16f801(0x5f5)][_0x16f801(0x212)](this),this[_0x16f801(0x264)]();},Scene_Shop[_0x41d84b(0x806)][_0x41d84b(0x264)]=function(){const _0x2f787a=_0x41d84b;this['_helpWindow']&&this['_helpWindow'][_0x2f787a(0x325)](Scene_Shop[_0x2f787a(0x540)]['HelpBgType']);this[_0x2f787a(0x39a)]&&(_0x2f787a(0x454)!==_0x2f787a(0x420)?this[_0x2f787a(0x39a)][_0x2f787a(0x325)](Scene_Shop[_0x2f787a(0x540)]['GoldBgType']):this['process_VisuMZ_CoreEngine_jsQuickFunctions']());this['_commandWindow']&&(_0x2f787a(0x4b8)===_0x2f787a(0x829)?(this['_x']=this[_0x2f787a(0x8b2)],this['_y']=this[_0x2f787a(0x719)],this[_0x2f787a(0x2e4)]=this[_0x2f787a(0x79a)],this['_scaleY']=this[_0x2f787a(0x8d8)],this[_0x2f787a(0x305)]=this[_0x2f787a(0x220)],this[_0x2f787a(0x6a3)]&&(this[_0x2f787a(0x6a3)]['x']=this['_targetAnchor']['x'],this['_anchor']['y']=this[_0x2f787a(0x5f4)]['y'])):this[_0x2f787a(0x87a)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x2f787a(0x1d7)]));this[_0x2f787a(0x8da)]&&this[_0x2f787a(0x8da)][_0x2f787a(0x325)](Scene_Shop['layoutSettings'][_0x2f787a(0x52d)]);if(this['_numberWindow']){if(_0x2f787a(0x6a9)!==_0x2f787a(0x6a9)){if(_0x8007ac)_0x4e92b8[_0x2f787a(0x782)](_0x5f11c9);}else this['_numberWindow'][_0x2f787a(0x325)](Scene_Shop[_0x2f787a(0x540)]['NumberBgType']);}this[_0x2f787a(0x852)]&&this[_0x2f787a(0x852)][_0x2f787a(0x325)](Scene_Shop[_0x2f787a(0x540)][_0x2f787a(0x8ed)]),this['_buyWindow']&&this[_0x2f787a(0x57d)][_0x2f787a(0x325)](Scene_Shop[_0x2f787a(0x540)][_0x2f787a(0x1f7)]),this['_categoryWindow']&&(_0x2f787a(0x8d9)===_0x2f787a(0x6ff)?this[_0x2f787a(0x4df)]():this[_0x2f787a(0x493)][_0x2f787a(0x325)](Scene_Shop[_0x2f787a(0x540)]['CategoryBgType'])),this['_sellWindow']&&this['_sellWindow'][_0x2f787a(0x325)](Scene_Shop[_0x2f787a(0x540)]['SellBgType']);},Scene_Shop[_0x41d84b(0x806)][_0x41d84b(0x3f3)]=function(){const _0x229831=_0x41d84b;return Scene_Shop[_0x229831(0x540)]['HelpRect'][_0x229831(0x212)](this);},Scene_Shop[_0x41d84b(0x806)][_0x41d84b(0x234)]=function(){const _0x2632c2=_0x41d84b;return Scene_Shop[_0x2632c2(0x540)][_0x2632c2(0x2c7)]['call'](this);},Scene_Shop['prototype'][_0x41d84b(0x8ba)]=function(){const _0x1b22d4=_0x41d84b;return Scene_Shop[_0x1b22d4(0x540)][_0x1b22d4(0x824)][_0x1b22d4(0x212)](this);},Scene_Shop[_0x41d84b(0x806)][_0x41d84b(0x7a2)]=function(){const _0x1ae293=_0x41d84b;return Scene_Shop[_0x1ae293(0x540)]['DummyRect'][_0x1ae293(0x212)](this);},Scene_Shop[_0x41d84b(0x806)]['numberWindowRect']=function(){const _0x248a95=_0x41d84b;return Scene_Shop[_0x248a95(0x540)]['NumberRect'][_0x248a95(0x212)](this);},Scene_Shop[_0x41d84b(0x806)][_0x41d84b(0x8c7)]=function(){const _0x24031c=_0x41d84b;return Scene_Shop[_0x24031c(0x540)][_0x24031c(0x7b4)][_0x24031c(0x212)](this);},Scene_Shop[_0x41d84b(0x806)][_0x41d84b(0x84a)]=function(){const _0x2c7128=_0x41d84b;return Scene_Shop['layoutSettings'][_0x2c7128(0x3c0)][_0x2c7128(0x212)](this);},Scene_Shop[_0x41d84b(0x806)][_0x41d84b(0x2d4)]=function(){const _0x97b561=_0x41d84b;return Scene_Shop['layoutSettings'][_0x97b561(0x11f)][_0x97b561(0x212)](this);},Scene_Shop['prototype']['sellWindowRect']=function(){const _0x27170f=_0x41d84b;return Scene_Shop['layoutSettings']['SellRect'][_0x27170f(0x212)](this);},Scene_Name[_0x41d84b(0x540)]=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)][_0x41d84b(0x557)]['NameMenu'],VisuMZ['CoreEngine']['Scene_Name_create']=Scene_Name['prototype']['create'],Scene_Name[_0x41d84b(0x806)][_0x41d84b(0x397)]=function(){const _0x54ee19=_0x41d84b;VisuMZ[_0x54ee19(0x58f)][_0x54ee19(0x7de)]['call'](this),this[_0x54ee19(0x264)]();},Scene_Name['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x4f6472=_0x41d84b;if(this[_0x4f6472(0x3b0)]){if(_0x4f6472(0x235)===_0x4f6472(0x235))this[_0x4f6472(0x3b0)][_0x4f6472(0x325)](Scene_Name['layoutSettings']['EditBgType']);else{const _0x14fb58=this[_0x4f6472(0x48f)]();let _0x31aed7=_0x3822c9[_0x4f6472(0x343)];this[_0x4f6472(0x5c0)](_0x1db48b,_0x14fb58[0x0]);for(const _0x579ddc of _0x14fb58){const _0x5cead3=_0x579ddc['evaluate']();_0x5cead3>_0x31aed7&&(_0x31aed7=_0x5cead3,this[_0x4f6472(0x5c0)](_0x18b914,_0x579ddc));}}}this[_0x4f6472(0x1b4)]&&this[_0x4f6472(0x1b4)][_0x4f6472(0x325)](Scene_Name[_0x4f6472(0x540)][_0x4f6472(0x203)]);},Scene_Name['prototype'][_0x41d84b(0x66d)]=function(){return 0x0;},Scene_Name['prototype']['editWindowRect']=function(){const _0x271f75=_0x41d84b;return Scene_Name[_0x271f75(0x540)][_0x271f75(0x22e)][_0x271f75(0x212)](this);},Scene_Name[_0x41d84b(0x806)][_0x41d84b(0x2dd)]=function(){const _0x25a194=_0x41d84b;return Scene_Name[_0x25a194(0x540)]['InputRect']['call'](this);},Scene_Name['prototype'][_0x41d84b(0x2ad)]=function(){const _0x5e2bc7=_0x41d84b;if(!this[_0x5e2bc7(0x1b4)])return![];return VisuMZ[_0x5e2bc7(0x58f)][_0x5e2bc7(0x550)][_0x5e2bc7(0x59b)][_0x5e2bc7(0x2ad)];},Scene_Name[_0x41d84b(0x806)][_0x41d84b(0x628)]=function(){const _0x1ab881=_0x41d84b;if(this[_0x1ab881(0x2ad)]()){if(_0x1ab881(0x76f)!=='dwEWS')return TextManager['getInputButtonString'](_0x1ab881(0x860));else{const _0x19a178=_0x1966df[_0x1ab881(0x528)](_0x2b0ca1);_0x42b249?(this[_0x1ab881(0x766)](_0x19a178,_0x3e6b89,_0x47e57d,this[_0x1ab881(0x23f)]()),_0x1412f8-=this[_0x1ab881(0x23f)]()+0x2,_0x3dc0b8+=this[_0x1ab881(0x23f)]()+0x2):(this[_0x1ab881(0x6de)](_0x19a178,_0x58050d+0x2,_0x4f9279+0x2),_0xcb8d53-=_0x231f23[_0x1ab881(0x69f)]+0x4,_0x744357+=_0x494de7[_0x1ab881(0x69f)]+0x4);}}else return'dFfIs'===_0x1ab881(0x6ec)?_0x8f72db:Scene_MenuBase['prototype'][_0x1ab881(0x628)][_0x1ab881(0x212)](this);},Scene_Name[_0x41d84b(0x806)][_0x41d84b(0x28c)]=function(){const _0x509796=_0x41d84b;if(this[_0x509796(0x2ad)]()){if(_0x509796(0x3c9)==='vAhLm'){const _0x59ff8f=VisuMZ[_0x509796(0x58f)][_0x509796(0x550)]['KeyboardInput'];if(this[_0x509796(0x1b4)][_0x509796(0x1d8)]===_0x509796(0x2c5)){if(_0x509796(0x1c7)===_0x509796(0x504))this[_0x509796(0x67f)]&&(this[_0x509796(0x7c4)]+=this[_0x509796(0x646)](),this[_0x509796(0x49b)]()&&(this['_opening']=![]));else return _0x59ff8f[_0x509796(0x296)]||'Keyboard';}else{if(_0x509796(0x74b)===_0x509796(0x5f0)){const _0x172dea=this[_0x509796(0x8ba)]();this[_0x509796(0x87a)]=new _0x21c24b(_0x172dea),this['_commandWindow']['setHandler'](_0x509796(0x658),this[_0x509796(0x59a)][_0x509796(0x44f)](this)),this[_0x509796(0x2e3)](this[_0x509796(0x87a)]),this['_commandWindow']['setBackgroundType'](_0x243779['layoutSettings']['CommandBgType']);}else return _0x59ff8f[_0x509796(0x2f1)]||'Manual';}}else _0x87755[_0x509796(0x58f)][_0x509796(0x793)][_0x509796(0x212)](this),this[_0x509796(0x3d7)]=this[_0x509796(0x3d7)]||{};}else return Scene_MenuBase['prototype']['buttonAssistText1'][_0x509796(0x212)](this);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x8d1)]=Scene_Name['prototype']['onInputOk'],Scene_Name[_0x41d84b(0x806)]['onInputOk']=function(){const _0x267f45=_0x41d84b;this[_0x267f45(0x728)]()?this[_0x267f45(0x84e)]():VisuMZ[_0x267f45(0x58f)]['Scene_Name_onInputOk'][_0x267f45(0x212)](this);},Scene_Name[_0x41d84b(0x806)][_0x41d84b(0x728)]=function(){const _0x48d94f=_0x41d84b,_0x5a35b2=VisuMZ[_0x48d94f(0x58f)][_0x48d94f(0x550)]['KeyboardInput'];if(!_0x5a35b2)return![];const _0x52c668=_0x5a35b2[_0x48d94f(0x20e)];if(!_0x52c668)return![];const _0x277776=this[_0x48d94f(0x3b0)][_0x48d94f(0x37a)]()[_0x48d94f(0x403)]();for(const _0x53732b of _0x52c668){if(_0x48d94f(0x379)===_0x48d94f(0x1c9))return _0x5acc62[_0x48d94f(0x540)][_0x48d94f(0x8e5)]['call'](this);else{if(_0x277776[_0x48d94f(0x4c8)](_0x53732b[_0x48d94f(0x403)]()))return!![];}}return![];},Scene_Name[_0x41d84b(0x806)]['onInputBannedWords']=function(){const _0x1004f0=_0x41d84b;SoundManager[_0x1004f0(0x392)]();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x35e)]=Scene_Battle[_0x41d84b(0x806)][_0x41d84b(0x75c)],Scene_Battle[_0x41d84b(0x806)][_0x41d84b(0x75c)]=function(){const _0x57e396=_0x41d84b;VisuMZ['CoreEngine'][_0x57e396(0x35e)][_0x57e396(0x212)](this);if($gameTemp[_0x57e396(0x3a2)])this[_0x57e396(0x87d)]();},Scene_Battle['prototype'][_0x41d84b(0x87d)]=function(){const _0x5c84d5=_0x41d84b;!BattleManager[_0x5c84d5(0x196)]()&&!this[_0x5c84d5(0x67c)]&&!$gameMessage[_0x5c84d5(0x78e)]()&&(this[_0x5c84d5(0x67c)]=!![],this[_0x5c84d5(0x75c)](),SceneManager['updateEffekseer'](),this[_0x5c84d5(0x67c)]=![]);},VisuMZ['CoreEngine'][_0x41d84b(0x74e)]=Scene_Battle[_0x41d84b(0x806)]['createCancelButton'],Scene_Battle[_0x41d84b(0x806)]['createCancelButton']=function(){const _0x17d549=_0x41d84b;VisuMZ['CoreEngine'][_0x17d549(0x74e)][_0x17d549(0x212)](this),SceneManager['isSideButtonLayout']()&&('EyGYs'==='EyGYs'?this[_0x17d549(0x3d0)]():(this['drawIconBySize'](_0x2fede2,_0x5aab17,_0x4cb664,this[_0x17d549(0x23f)]()),_0x44e885-=this[_0x17d549(0x23f)]()+0x2,_0x5bf445+=this[_0x17d549(0x23f)]()+0x2));},Scene_Battle[_0x41d84b(0x806)][_0x41d84b(0x3d0)]=function(){const _0x2dbf30=_0x41d84b;this[_0x2dbf30(0x76a)]['x']=Graphics[_0x2dbf30(0x1ac)]+0x4,this[_0x2dbf30(0x28b)]()?this[_0x2dbf30(0x76a)]['y']=Graphics[_0x2dbf30(0x7d0)]-this[_0x2dbf30(0x83f)]():_0x2dbf30(0x19b)!==_0x2dbf30(0x19b)?(this['_forcedTroopView']=_0x5d95b8,this[_0x2dbf30(0x1b0)]=_0x4b9b7b):this[_0x2dbf30(0x76a)]['y']=0x0;},VisuMZ[_0x41d84b(0x58f)]['Sprite_Button_initialize']=Sprite_Button[_0x41d84b(0x806)]['initialize'],Sprite_Button['prototype'][_0x41d84b(0x3e9)]=function(_0x5e9177){const _0x576174=_0x41d84b;VisuMZ['CoreEngine'][_0x576174(0x916)][_0x576174(0x212)](this,_0x5e9177),this[_0x576174(0x75d)]();},Sprite_Button[_0x41d84b(0x806)][_0x41d84b(0x75d)]=function(){const _0x3b12f1=_0x41d84b,_0x4d8db9=VisuMZ['CoreEngine'][_0x3b12f1(0x550)]['UI'];this[_0x3b12f1(0x1fe)]=![];switch(this[_0x3b12f1(0x879)]){case'cancel':this[_0x3b12f1(0x1fe)]=!_0x4d8db9[_0x3b12f1(0x60a)];break;case _0x3b12f1(0x41a):case _0x3b12f1(0x28e):this[_0x3b12f1(0x1fe)]=!_0x4d8db9['pagedownShowButton'];break;case _0x3b12f1(0x211):case'up':case _0x3b12f1(0x6d5):case _0x3b12f1(0x187):case'ok':this[_0x3b12f1(0x1fe)]=!_0x4d8db9[_0x3b12f1(0x4e5)];break;case _0x3b12f1(0x224):this[_0x3b12f1(0x1fe)]=!_0x4d8db9[_0x3b12f1(0x7c5)];break;}},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x3f8)]=Sprite_Button[_0x41d84b(0x806)][_0x41d84b(0x61c)],Sprite_Button[_0x41d84b(0x806)][_0x41d84b(0x61c)]=function(){const _0x4244af=_0x41d84b;SceneManager[_0x4244af(0x85a)]()||this[_0x4244af(0x1fe)]?this[_0x4244af(0x45c)]():VisuMZ[_0x4244af(0x58f)]['Sprite_Button_updateOpacity'][_0x4244af(0x212)](this);},Sprite_Button[_0x41d84b(0x806)][_0x41d84b(0x45c)]=function(){const _0x1addc0=_0x41d84b;this[_0x1addc0(0x7b6)]=![],this['opacity']=0x0,this['x']=Graphics[_0x1addc0(0x3a6)]*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0x41d84b(0x58f)]['Sprite_Battler_startMove']=Sprite_Battler[_0x41d84b(0x806)][_0x41d84b(0x101)],Sprite_Battler[_0x41d84b(0x806)]['startMove']=function(_0x2f9f6a,_0x1fad44,_0xd65dd1){const _0x12a8e3=_0x41d84b;(this['_targetOffsetX']!==_0x2f9f6a||this['_targetOffsetY']!==_0x1fad44)&&(this[_0x12a8e3(0xf2)](_0x12a8e3(0x1a7)),this[_0x12a8e3(0x23a)]=_0xd65dd1),VisuMZ[_0x12a8e3(0x58f)][_0x12a8e3(0x32b)]['call'](this,_0x2f9f6a,_0x1fad44,_0xd65dd1);},Sprite_Battler['prototype']['setMoveEasingType']=function(_0x5486ba){const _0x3d59d6=_0x41d84b;this[_0x3d59d6(0x6e1)]=_0x5486ba;},Sprite_Battler[_0x41d84b(0x806)][_0x41d84b(0x241)]=function(){const _0x36cfe9=_0x41d84b;if(this[_0x36cfe9(0x3f0)]<=0x0)return;const _0x8a8a22=this[_0x36cfe9(0x3f0)],_0x2bf399=this[_0x36cfe9(0x23a)],_0x4a9d1f=this[_0x36cfe9(0x6e1)];this[_0x36cfe9(0x6f0)]=this[_0x36cfe9(0x7bb)](this['_offsetX'],this['_targetOffsetX'],_0x8a8a22,_0x2bf399,_0x4a9d1f),this[_0x36cfe9(0x51c)]=this['applyEasing'](this[_0x36cfe9(0x51c)],this['_targetOffsetY'],_0x8a8a22,_0x2bf399,_0x4a9d1f),this[_0x36cfe9(0x3f0)]--;if(this[_0x36cfe9(0x3f0)]<=0x0)this[_0x36cfe9(0x59e)]();},Sprite_Battler[_0x41d84b(0x806)][_0x41d84b(0x7bb)]=function(_0x3cd3dc,_0x3cd7ec,_0x4165be,_0x4379b7,_0x5b8e23){const _0x4bcd73=_0x41d84b,_0x1e06bf=VisuMZ[_0x4bcd73(0x692)]((_0x4379b7-_0x4165be)/_0x4379b7,_0x5b8e23||_0x4bcd73(0x1a7)),_0x195811=VisuMZ[_0x4bcd73(0x692)]((_0x4379b7-_0x4165be+0x1)/_0x4379b7,_0x5b8e23||_0x4bcd73(0x1a7)),_0x14f7d7=(_0x3cd3dc-_0x3cd7ec*_0x1e06bf)/(0x1-_0x1e06bf);return _0x14f7d7+(_0x3cd7ec-_0x14f7d7)*_0x195811;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x7e1)]=Sprite_Actor[_0x41d84b(0x806)][_0x41d84b(0xea)],Sprite_Actor[_0x41d84b(0x806)][_0x41d84b(0xea)]=function(_0x30695e){const _0x45fad9=_0x41d84b;VisuMZ[_0x45fad9(0x58f)][_0x45fad9(0x550)]['UI'][_0x45fad9(0x1f1)]?this['setActorHomeRepositioned'](_0x30695e):VisuMZ[_0x45fad9(0x58f)][_0x45fad9(0x7e1)][_0x45fad9(0x212)](this,_0x30695e);},Sprite_Actor[_0x41d84b(0x806)][_0x41d84b(0x667)]=function(_0x91b8a9){const _0x3ea144=_0x41d84b;let _0x99204f=Math[_0x3ea144(0x7f6)](Graphics['width']/0x2+0xc0);_0x99204f-=Math[_0x3ea144(0x5d1)]((Graphics[_0x3ea144(0x3a6)]-Graphics[_0x3ea144(0x1ac)])/0x2),_0x99204f+=_0x91b8a9*0x20;let _0x47a7a0=Graphics[_0x3ea144(0x536)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x47a7a0-=Math['floor']((Graphics[_0x3ea144(0x536)]-Graphics[_0x3ea144(0x7d0)])/0x2),_0x47a7a0+=_0x91b8a9*0x30,this[_0x3ea144(0x8e6)](_0x99204f,_0x47a7a0);},Sprite_Actor[_0x41d84b(0x806)]['retreat']=function(){const _0x2fb281=_0x41d84b;this[_0x2fb281(0x101)](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x41d84b(0x428)]=function(_0x38b820){const _0x53a137=_0x41d84b;this[_0x53a137(0x4bf)]=_0x38b820;},VisuMZ['CoreEngine'][_0x41d84b(0x800)]=Sprite_Animation[_0x41d84b(0x806)]['processSoundTimings'],Sprite_Animation['prototype'][_0x41d84b(0x1e7)]=function(){const _0x5d452=_0x41d84b;if(this[_0x5d452(0x4bf)])return;VisuMZ['CoreEngine'][_0x5d452(0x800)][_0x5d452(0x212)](this);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x71e)]=Sprite_Animation[_0x41d84b(0x806)][_0x41d84b(0x255)],Sprite_Animation[_0x41d84b(0x806)]['setViewport']=function(_0x562620){const _0x519429=_0x41d84b;if(this[_0x519429(0x1f4)]()){if(_0x519429(0x862)!==_0x519429(0x862))return 0x3;else this[_0x519429(0x577)](_0x562620);}else{if(_0x519429(0x538)===_0x519429(0x285)){if(this[_0x519429(0x703)]>0x63)return this[_0x519429(0x5f3)](_0x2bbf85);return _0x1e0574[_0x519429(0x58f)][_0x519429(0x1be)][_0x519429(0x212)](this,_0x1545f0);}else VisuMZ[_0x519429(0x58f)]['Sprite_Animation_setViewport'][_0x519429(0x212)](this,_0x562620);}},Sprite_Animation[_0x41d84b(0x806)]['isAnimationOffsetXMirrored']=function(){const _0x2bc6c6=_0x41d84b;if(!this[_0x2bc6c6(0x621)])return![];const _0x239fb2=this[_0x2bc6c6(0x621)][_0x2bc6c6(0x37a)]||'';if(_0x239fb2[_0x2bc6c6(0x5a2)](/<MIRROR OFFSET X>/i))return!![];if(_0x239fb2['match'](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x2bc6c6(0x58f)][_0x2bc6c6(0x550)][_0x2bc6c6(0x1bb)]['AnimationMirrorOffset'];},Sprite_Animation[_0x41d84b(0x806)][_0x41d84b(0x577)]=function(_0x26336a){const _0x2ad352=_0x41d84b,_0x2c4c36=this[_0x2ad352(0x141)],_0x4e0e2f=this[_0x2ad352(0x141)],_0x2b39be=this[_0x2ad352(0x621)][_0x2ad352(0x908)]*(this['_mirror']?-0x1:0x1)-_0x2c4c36/0x2,_0x4c1af7=this[_0x2ad352(0x621)]['offsetY']-_0x4e0e2f/0x2,_0x21e6f0=this[_0x2ad352(0x8e0)](_0x26336a);_0x26336a['gl'][_0x2ad352(0x7ff)](_0x2b39be+_0x21e6f0['x'],_0x4c1af7+_0x21e6f0['y'],_0x2c4c36,_0x4e0e2f);},Sprite_Animation['prototype'][_0x41d84b(0x7ed)]=function(_0x438850){const _0x5c33eb=_0x41d84b;if(_0x438850[_0x5c33eb(0x8f1)]){}const _0x3d68d7=this[_0x5c33eb(0x621)]['name'];let _0x5646ef=_0x438850[_0x5c33eb(0x536)]*_0x438850['scale']['y'],_0x4f8921=0x0,_0x63ba16=-_0x5646ef/0x2;if(_0x3d68d7[_0x5c33eb(0x5a2)](/<(?:HEAD|HEADER|TOP)>/i))_0x63ba16=-_0x5646ef;if(_0x3d68d7[_0x5c33eb(0x5a2)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x63ba16=0x0;if(this[_0x5c33eb(0x621)][_0x5c33eb(0x760)])_0x63ba16=0x0;if(_0x3d68d7[_0x5c33eb(0x5a2)](/<(?:LEFT)>/i))_0x4f8921=-_0x438850[_0x5c33eb(0x3a6)]/0x2;if(_0x3d68d7['match'](/<(?:RIGHT)>/i))_0x4f8921=_0x438850[_0x5c33eb(0x3a6)]/0x2;if(_0x3d68d7[_0x5c33eb(0x5a2)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)){if('PaBmQ'!==_0x5c33eb(0x642))_0x4f8921=Number(RegExp['$1'])*_0x438850[_0x5c33eb(0x3a6)];else return _0x4d5af8[_0x5c33eb(0x58f)]['Spriteset_Base_isAnimationPlaying'][_0x5c33eb(0x212)](this)||this[_0x5c33eb(0x21d)]();}if(_0x3d68d7[_0x5c33eb(0x5a2)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)){if(_0x5c33eb(0x58c)!=='BmQiM'){if(!this[_0x5c33eb(0x107)]())return;_0x53563c=_0x7c199f||![],_0x1aabe0=_0x4cd757||![];if(_0x593204[_0x203a2f]){const _0x27c51d={'x':_0x5ecf31,'y':_0x19f000,'animationId':_0x443bd9,'mirror':_0xa57d24,'mute':_0x3e4746};this[_0x5c33eb(0x78f)][_0x5c33eb(0x3dd)](_0x27c51d);}}else _0x63ba16=(0x1-Number(RegExp['$1']))*-_0x5646ef;}_0x3d68d7['match'](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x4f8921=Number(RegExp['$1'])*_0x438850['width'],_0x63ba16=(0x1-Number(RegExp['$2']))*-_0x5646ef);if(_0x3d68d7['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x4f8921+=Number(RegExp['$1']);if(_0x3d68d7[_0x5c33eb(0x5a2)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x63ba16+=Number(RegExp['$1']);if(_0x3d68d7[_0x5c33eb(0x5a2)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x5c33eb(0x4d7)===_0x5c33eb(0x4d7))_0x4f8921+=Number(RegExp['$1']),_0x63ba16+=Number(RegExp['$2']);else{if(_0x33e797[_0x5c33eb(0x51e)])return;}}const _0xc71829=new Point(_0x4f8921,_0x63ba16);return _0x438850[_0x5c33eb(0x68a)](),_0x438850[_0x5c33eb(0x7b0)][_0x5c33eb(0x137)](_0xc71829);},Sprite_AnimationMV[_0x41d84b(0x806)]['setupRate']=function(){const _0x52719d=_0x41d84b;this['_rate']=VisuMZ['CoreEngine']['Settings'][_0x52719d(0x1bb)][_0x52719d(0x7a0)]??0x4,this['setupCustomRateCoreEngine'](),this['_rate']=this[_0x52719d(0x909)][_0x52719d(0x587)](0x1,0xa);},Sprite_AnimationMV[_0x41d84b(0x806)][_0x41d84b(0x488)]=function(){const _0x2b8437=_0x41d84b;if(!this[_0x2b8437(0x621)]);const _0x5314bc=this[_0x2b8437(0x621)]['name']||'';if(_0x5314bc[_0x2b8437(0x5a2)](/<RATE:[ ](\d+)>/i)){if(_0x2b8437(0x638)==='vzaop')this[_0x2b8437(0x909)]=(Number(RegExp['$1'])||0x1)[_0x2b8437(0x587)](0x1,0xa);else return this['helpAreaBottom']();}},Sprite_AnimationMV[_0x41d84b(0x806)][_0x41d84b(0x428)]=function(_0x22f2f7){const _0x24e072=_0x41d84b;this[_0x24e072(0x4bf)]=_0x22f2f7;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x4e8)]=Sprite_AnimationMV['prototype'][_0x41d84b(0x4fe)],Sprite_AnimationMV['prototype'][_0x41d84b(0x4fe)]=function(_0x20e021){const _0x199d5b=_0x41d84b;if(this[_0x199d5b(0x4bf)]){if(_0x199d5b(0x535)!==_0x199d5b(0x535)){if(_0x20c1f0===_0x2492d9&&_0x4bfad4%0x1===0x0)return _0x270281;if(_0x40fd88!==_0x2a6538&&[_0x199d5b(0x7f9),_0x199d5b(0x1e5),'ATK',_0x199d5b(0x748),'MAT','MDF',_0x199d5b(0x86e),'LUK'][_0x199d5b(0x4c8)](_0x2d7556(_0x267601)['toUpperCase']()[_0x199d5b(0x242)]()))return _0xadafc8;_0x19cdbe=_0x3ba312||0x0;if(_0x373b1d[_0x199d5b(0x58f)][_0x199d5b(0x7ea)][_0xcc3d94])return _0xa77991[_0x199d5b(0x58f)][_0x199d5b(0x2fe)][_0x398eca]===_0x199d5b(0x39c)?_0xc65590:_0x4ac04d((_0x1eb6bc*0x64)[_0x199d5b(0x3ff)](_0x1e6482))+'%';return _0x166e10((_0x1ac0b8*0x64)[_0x199d5b(0x3ff)](_0x49cee7))+'%';}else _0x20e021=JsonEx[_0x199d5b(0x3bf)](_0x20e021),_0x20e021['se']&&(_0x20e021['se']['volume']=0x0);}VisuMZ[_0x199d5b(0x58f)]['Sprite_AnimationMV_processTimingData']['call'](this,_0x20e021);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x898)]=Sprite_AnimationMV[_0x41d84b(0x806)][_0x41d84b(0x3d8)],Sprite_AnimationMV[_0x41d84b(0x806)][_0x41d84b(0x3d8)]=function(){const _0x3bcfa6=_0x41d84b;VisuMZ[_0x3bcfa6(0x58f)][_0x3bcfa6(0x898)][_0x3bcfa6(0x212)](this);if(this['_animation'][_0x3bcfa6(0x913)]===0x3){if(this['x']===0x0)this['x']=Math[_0x3bcfa6(0x7f6)](Graphics[_0x3bcfa6(0x3a6)]/0x2);if(this['y']===0x0)this['y']=Math['round'](Graphics[_0x3bcfa6(0x536)]/0x2);}},Sprite_Damage[_0x41d84b(0x806)]['createDigits']=function(_0x43f45a){const _0x4e5d0c=_0x41d84b;let _0x10b2da=Math[_0x4e5d0c(0x740)](_0x43f45a)['toString']();this[_0x4e5d0c(0x807)]()&&(_0x10b2da=VisuMZ[_0x4e5d0c(0x636)](_0x10b2da));const _0x4b45bc=this[_0x4e5d0c(0x485)](),_0x3d7d96=Math[_0x4e5d0c(0x5d1)](_0x4b45bc*0.75);for(let _0x5ec805=0x0;_0x5ec805<_0x10b2da[_0x4e5d0c(0x669)];_0x5ec805++){const _0x4b7d77=this[_0x4e5d0c(0x83a)](_0x3d7d96,_0x4b45bc);_0x4b7d77['bitmap'][_0x4e5d0c(0x3e6)](_0x10b2da[_0x5ec805],0x0,0x0,_0x3d7d96,_0x4b45bc,'center'),_0x4b7d77['x']=(_0x5ec805-(_0x10b2da[_0x4e5d0c(0x669)]-0x1)/0x2)*_0x3d7d96,_0x4b7d77['dy']=-_0x5ec805;}},Sprite_Damage[_0x41d84b(0x806)][_0x41d84b(0x807)]=function(){const _0x56ae0b=_0x41d84b;return VisuMZ['CoreEngine']['Settings'][_0x56ae0b(0x1bb)][_0x56ae0b(0x2f4)];},Sprite_Damage['prototype'][_0x41d84b(0x4a7)]=function(){const _0x14d240=_0x41d84b;return ColorManager[_0x14d240(0x193)]();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x808)]=Sprite_Gauge['prototype'][_0x41d84b(0x520)],Sprite_Gauge[_0x41d84b(0x806)][_0x41d84b(0x520)]=function(){const _0x117201=_0x41d84b;return VisuMZ['CoreEngine'][_0x117201(0x808)][_0x117201(0x212)](this)[_0x117201(0x587)](0x0,0x1);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x2db)]=Sprite_Gauge[_0x41d84b(0x806)][_0x41d84b(0x147)],Sprite_Gauge['prototype'][_0x41d84b(0x147)]=function(){const _0xc0bc0e=_0x41d84b;let _0x27fc33=VisuMZ['CoreEngine'][_0xc0bc0e(0x2db)][_0xc0bc0e(0x212)](this);return _0x27fc33;},Sprite_Gauge[_0x41d84b(0x806)]['drawValue']=function(){const _0x30e629=_0x41d84b;let _0x57866c=this[_0x30e629(0x147)]();this[_0x30e629(0x807)]()&&(_0x30e629(0x5eb)===_0x30e629(0x5eb)?_0x57866c=VisuMZ[_0x30e629(0x636)](_0x57866c):this[_0x30e629(0x2b9)]=[]);const _0x29abb9=this[_0x30e629(0x442)]()-0x1,_0x3c5292=this[_0x30e629(0x551)]?this[_0x30e629(0x551)]():this[_0x30e629(0x598)]();this[_0x30e629(0x3f4)](),this['bitmap'][_0x30e629(0x3e6)](_0x57866c,0x0,0x0,_0x29abb9,_0x3c5292,_0x30e629(0x54b));},Sprite_Gauge[_0x41d84b(0x806)]['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge[_0x41d84b(0x806)]['useDigitGrouping']=function(){const _0x324b8f=_0x41d84b;return VisuMZ[_0x324b8f(0x58f)]['Settings']['QoL'][_0x324b8f(0x634)];},Sprite_Gauge[_0x41d84b(0x806)][_0x41d84b(0x4a7)]=function(){const _0x200fbe=_0x41d84b;return ColorManager[_0x200fbe(0x47d)]();},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x5c6)]=Sprite_Picture[_0x41d84b(0x806)][_0x41d84b(0x3fa)],Sprite_Picture[_0x41d84b(0x806)][_0x41d84b(0x3fa)]=function(){const _0x59861d=_0x41d84b;this[_0x59861d(0x552)]['match'](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this['loadIconBitmap'](Number(RegExp['$1'])):VisuMZ[_0x59861d(0x58f)][_0x59861d(0x5c6)]['call'](this);},Sprite_Picture['prototype'][_0x41d84b(0x695)]=function(_0x256b6a){const _0x3192c0=_0x41d84b,_0x256d15=ImageManager[_0x3192c0(0x69f)],_0x381fec=ImageManager[_0x3192c0(0x74c)],_0x1a93c4=this[_0x3192c0(0x552)][_0x3192c0(0x5a2)](/SMOOTH/i);this[_0x3192c0(0x4fd)]=new Bitmap(_0x256d15,_0x381fec);const _0x47bd1d=ImageManager[_0x3192c0(0x51a)]('IconSet'),_0x349ac8=_0x256b6a%0x10*_0x256d15,_0x5d7c84=Math['floor'](_0x256b6a/0x10)*_0x381fec;this[_0x3192c0(0x4fd)][_0x3192c0(0x165)]=_0x1a93c4,this[_0x3192c0(0x4fd)]['blt'](_0x47bd1d,_0x349ac8,_0x5d7c84,_0x256d15,_0x381fec,0x0,0x0,_0x256d15,_0x381fec);};function Sprite_TitlePictureButton(){const _0x104ac1=_0x41d84b;this[_0x104ac1(0x3e9)](...arguments);}Sprite_TitlePictureButton[_0x41d84b(0x806)]=Object[_0x41d84b(0x397)](Sprite_Clickable['prototype']),Sprite_TitlePictureButton['prototype'][_0x41d84b(0x45d)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x41d84b(0x806)][_0x41d84b(0x3e9)]=function(_0x189f8b){const _0x13979f=_0x41d84b;Sprite_Clickable[_0x13979f(0x806)][_0x13979f(0x3e9)]['call'](this),this[_0x13979f(0x75a)]=_0x189f8b,this[_0x13979f(0x478)]=null,this[_0x13979f(0x854)]();},Sprite_TitlePictureButton['prototype'][_0x41d84b(0x854)]=function(){const _0x4bea94=_0x41d84b;this['x']=Graphics[_0x4bea94(0x3a6)],this['y']=Graphics[_0x4bea94(0x536)],this['visible']=![],this[_0x4bea94(0x826)]();},Sprite_TitlePictureButton[_0x41d84b(0x806)][_0x41d84b(0x826)]=function(){const _0x1151dd=_0x41d84b;this['bitmap']=ImageManager[_0x1151dd(0x483)](this[_0x1151dd(0x75a)][_0x1151dd(0x7d6)]),this[_0x1151dd(0x4fd)]['addLoadListener'](this[_0x1151dd(0x8b6)][_0x1151dd(0x44f)](this));},Sprite_TitlePictureButton[_0x41d84b(0x806)]['onButtonImageLoad']=function(){const _0x1c1e6f=_0x41d84b;this['_data'][_0x1c1e6f(0x657)][_0x1c1e6f(0x212)](this),this[_0x1c1e6f(0x75a)][_0x1c1e6f(0x7ce)][_0x1c1e6f(0x212)](this),this[_0x1c1e6f(0x84d)](this[_0x1c1e6f(0x75a)][_0x1c1e6f(0x19f)][_0x1c1e6f(0x44f)](this));},Sprite_TitlePictureButton[_0x41d84b(0x806)][_0x41d84b(0x75c)]=function(){const _0x5641c6=_0x41d84b;Sprite_Clickable[_0x5641c6(0x806)][_0x5641c6(0x75c)][_0x5641c6(0x212)](this),this['updateOpacity'](),this['processTouch']();},Sprite_TitlePictureButton[_0x41d84b(0x806)][_0x41d84b(0x4a9)]=function(){const _0x47779b=_0x41d84b;return VisuMZ[_0x47779b(0x58f)][_0x47779b(0x550)][_0x47779b(0x557)][_0x47779b(0x7c2)][_0x47779b(0x507)];},Sprite_TitlePictureButton[_0x41d84b(0x806)][_0x41d84b(0x61c)]=function(){const _0x116a0d=_0x41d84b;this[_0x116a0d(0x4e3)]||this[_0x116a0d(0x138)]?this['opacity']=0xff:(this[_0x116a0d(0x405)]+=this['visible']?this[_0x116a0d(0x4a9)]():-0x1*this[_0x116a0d(0x4a9)](),this['opacity']=Math[_0x116a0d(0x50d)](0xc0,this['opacity']));},Sprite_TitlePictureButton[_0x41d84b(0x806)][_0x41d84b(0x84d)]=function(_0x5e382d){const _0x4e8f7d=_0x41d84b;this[_0x4e8f7d(0x478)]=_0x5e382d;},Sprite_TitlePictureButton[_0x41d84b(0x806)][_0x41d84b(0x890)]=function(){const _0x39c5ec=_0x41d84b;this['_clickHandler']&&('UkEEo'===_0x39c5ec(0x78a)?this['_clickHandler']():this[_0x39c5ec(0x4f5)]());},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x24d)]=Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x3e9)],Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x3e9)]=function(){const _0x324dc4=_0x41d84b;VisuMZ[_0x324dc4(0x58f)]['Spriteset_Base_initialize'][_0x324dc4(0x212)](this),this[_0x324dc4(0x802)]();},Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x802)]=function(){const _0x5eeb28=_0x41d84b;this[_0x5eeb28(0x48c)]=[],this[_0x5eeb28(0x284)]=[],this[_0x5eeb28(0x6c9)]=this[_0x5eeb28(0x4aa)]['x'],this['_cacheScaleY']=this['scale']['y'];},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x7db)]=Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x3b6)],Spriteset_Base[_0x41d84b(0x806)]['destroy']=function(_0x1d2977){const _0x5583d7=_0x41d84b;this[_0x5583d7(0x67e)](),this[_0x5583d7(0x57a)](),VisuMZ[_0x5583d7(0x58f)][_0x5583d7(0x7db)][_0x5583d7(0x212)](this,_0x1d2977);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x4a3)]=Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x75c)],Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x75c)]=function(){const _0x47ba85=_0x41d84b;VisuMZ['CoreEngine']['Spriteset_Base_update'][_0x47ba85(0x212)](this),this[_0x47ba85(0x90d)](),this[_0x47ba85(0x79f)](),this[_0x47ba85(0x8f4)]();},Spriteset_Base[_0x41d84b(0x806)]['updatePictureAntiZoom']=function(){const _0x2a11e0=_0x41d84b;if(!VisuMZ[_0x2a11e0(0x58f)][_0x2a11e0(0x550)][_0x2a11e0(0x1bb)][_0x2a11e0(0x191)])return;if(this[_0x2a11e0(0x6c9)]===this[_0x2a11e0(0x4aa)]['x']&&this[_0x2a11e0(0x110)]===this['scale']['y'])return;this[_0x2a11e0(0x565)](),this[_0x2a11e0(0x6c9)]=this[_0x2a11e0(0x4aa)]['x'],this[_0x2a11e0(0x110)]=this[_0x2a11e0(0x4aa)]['y'];},Spriteset_Base['prototype'][_0x41d84b(0x565)]=function(){const _0x504e78=_0x41d84b;if(SceneManager[_0x504e78(0x215)]()&&Spriteset_Map[_0x504e78(0x4a0)]){if(_0x504e78(0x36e)===_0x504e78(0x36e))return;else _0x509ab7[_0x504e78(0x4df)](),this[_0x504e78(0x1d8)]===_0x504e78(0x2c5)?this['switchModes']('default'):this['switchModes'](_0x504e78(0x2c5));}else{if(SceneManager[_0x504e78(0x6e9)]()&&Spriteset_Battle[_0x504e78(0x4a0)])return;}if(this['scale']['x']!==0x0){if(_0x504e78(0x19a)!==_0x504e78(0x19a))return!![];else this[_0x504e78(0x4dd)]['scale']['x']=0x1/this[_0x504e78(0x4aa)]['x'],this[_0x504e78(0x4dd)]['x']=-(this['x']/this['scale']['x']);}this[_0x504e78(0x4aa)]['y']!==0x0&&(_0x504e78(0x449)===_0x504e78(0x290)?this[_0x504e78(0x3e6)](_0x69bb4c,_0x56d17d,_0x331092,_0x2bf4ca):(this[_0x504e78(0x4dd)][_0x504e78(0x4aa)]['y']=0x1/this['scale']['y'],this[_0x504e78(0x4dd)]['y']=-(this['y']/this[_0x504e78(0x4aa)]['y'])));},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x381)]=Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x3d8)],Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x3d8)]=function(){const _0x563ec7=_0x41d84b;VisuMZ[_0x563ec7(0x58f)][_0x563ec7(0x381)][_0x563ec7(0x212)](this),this['updatePositionCoreEngine']();},Spriteset_Base['prototype'][_0x41d84b(0x698)]=function(){const _0x13a4f0=_0x41d84b;if(!$gameScreen)return;if($gameScreen[_0x13a4f0(0x516)]<=0x0)return;this['x']-=Math['round']($gameScreen['shake']());const _0x5d978b=$gameScreen[_0x13a4f0(0x508)]();switch($gameScreen[_0x13a4f0(0x508)]()){case _0x13a4f0(0x8cb):this[_0x13a4f0(0x4da)]();break;case _0x13a4f0(0x481):this[_0x13a4f0(0x33f)]();break;case _0x13a4f0(0x364):this[_0x13a4f0(0x413)]();break;default:this[_0x13a4f0(0x560)]();break;}},Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x4da)]=function(){const _0x2c06f7=_0x41d84b,_0x58a636=VisuMZ[_0x2c06f7(0x58f)][_0x2c06f7(0x550)][_0x2c06f7(0x6ca)];if(_0x58a636&&_0x58a636['originalJS'])return _0x58a636['originalJS']['call'](this);this['x']+=Math[_0x2c06f7(0x7f6)]($gameScreen[_0x2c06f7(0x213)]());},Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x560)]=function(){const _0x4bcd4c=_0x41d84b,_0x5f20d7=VisuMZ[_0x4bcd4c(0x58f)][_0x4bcd4c(0x550)][_0x4bcd4c(0x6ca)];if(_0x5f20d7&&_0x5f20d7['randomJS'])return _0x5f20d7[_0x4bcd4c(0x6c8)][_0x4bcd4c(0x212)](this);const _0x1cedef=$gameScreen[_0x4bcd4c(0x49c)]*0.75,_0x15872e=$gameScreen[_0x4bcd4c(0x71f)]*0.6,_0x49ddd6=$gameScreen[_0x4bcd4c(0x516)];this['x']+=Math[_0x4bcd4c(0x7f6)](Math[_0x4bcd4c(0x737)](_0x1cedef)-Math['randomInt'](_0x15872e))*(Math[_0x4bcd4c(0x50d)](_0x49ddd6,0x1e)*0.5),this['y']+=Math[_0x4bcd4c(0x7f6)](Math[_0x4bcd4c(0x737)](_0x1cedef)-Math[_0x4bcd4c(0x737)](_0x15872e))*(Math[_0x4bcd4c(0x50d)](_0x49ddd6,0x1e)*0.5);},Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x33f)]=function(){const _0x2e4bf9=_0x41d84b,_0x14aa7d=VisuMZ[_0x2e4bf9(0x58f)][_0x2e4bf9(0x550)][_0x2e4bf9(0x6ca)];if(_0x14aa7d&&_0x14aa7d[_0x2e4bf9(0xe4)])return _0x14aa7d[_0x2e4bf9(0xe4)][_0x2e4bf9(0x212)](this);const _0x1349f0=$gameScreen[_0x2e4bf9(0x49c)]*0.75,_0x52ecff=$gameScreen[_0x2e4bf9(0x71f)]*0.6,_0x1c4dcd=$gameScreen[_0x2e4bf9(0x516)];this['x']+=Math[_0x2e4bf9(0x7f6)](Math[_0x2e4bf9(0x737)](_0x1349f0)-Math[_0x2e4bf9(0x737)](_0x52ecff))*(Math[_0x2e4bf9(0x50d)](_0x1c4dcd,0x1e)*0.5);},Spriteset_Base['prototype'][_0x41d84b(0x413)]=function(){const _0x1ff452=_0x41d84b,_0x470758=VisuMZ[_0x1ff452(0x58f)][_0x1ff452(0x550)][_0x1ff452(0x6ca)];if(_0x470758&&_0x470758[_0x1ff452(0x689)])return _0x470758[_0x1ff452(0x689)][_0x1ff452(0x212)](this);const _0x3922df=$gameScreen['_shakePower']*0.75,_0x228439=$gameScreen['_shakeSpeed']*0.6,_0x148c6e=$gameScreen[_0x1ff452(0x516)];this['y']+=Math[_0x1ff452(0x7f6)](Math[_0x1ff452(0x737)](_0x3922df)-Math[_0x1ff452(0x737)](_0x228439))*(Math['min'](_0x148c6e,0x1e)*0.5);},Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x79f)]=function(){const _0x2344e3=_0x41d84b;for(const _0x30842c of this['_fauxAnimationSprites']){_0x2344e3(0x11b)!==_0x2344e3(0x519)?!_0x30842c['isPlaying']()&&this[_0x2344e3(0x20c)](_0x30842c):_0x121a41[_0x2344e3(0x58f)][_0x2344e3(0x266)][_0x2344e3(0x212)](this);}this[_0x2344e3(0x28a)]();},Spriteset_Base['prototype']['processFauxAnimationRequests']=function(){const _0x401309=_0x41d84b;for(;;){const _0x335fc2=$gameTemp[_0x401309(0x524)]();if(_0x335fc2)this[_0x401309(0x210)](_0x335fc2);else{if(_0x401309(0x2cc)!==_0x401309(0x2cc)){const _0x21af24=_0x184525[_0x401309(0x4e0)];for(let _0x481cf1=0x0;_0x481cf1<_0x21af24[_0x401309(0x669)];_0x481cf1++){if(_0x21af24[_0x481cf1][_0x401309(0x752)])return!![];}return![];}else break;}}},Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x210)]=function(_0x5f5a21){const _0x42b517=_0x41d84b,_0x17bb92=$dataAnimations[_0x5f5a21['animationId']],_0x1aad93=_0x5f5a21[_0x42b517(0x6ee)],_0x3444ab=_0x5f5a21[_0x42b517(0x370)],_0x4dd4a9=_0x5f5a21[_0x42b517(0x35b)];let _0x587802=this[_0x42b517(0x62f)]();const _0xb4f848=this['animationNextDelay']();if(this[_0x42b517(0x6aa)](_0x17bb92)){if(_0x42b517(0x612)!==_0x42b517(0x2a5))for(const _0x5163de of _0x1aad93){this[_0x42b517(0x838)]([_0x5163de],_0x17bb92,_0x3444ab,_0x587802,_0x4dd4a9),_0x587802+=_0xb4f848;}else return _0x4e1c08['vertJS']['call'](this);}else this[_0x42b517(0x838)](_0x1aad93,_0x17bb92,_0x3444ab,_0x587802,_0x4dd4a9);},Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x838)]=function(_0xe06034,_0x6d71eb,_0x28dbb2,_0xd7c90c,_0x2cfffc){const _0xf6cbc9=_0x41d84b,_0x42af37=this['isMVAnimation'](_0x6d71eb),_0x143d49=new(_0x42af37?Sprite_AnimationMV:Sprite_Animation)(),_0x4151c2=this[_0xf6cbc9(0x624)](_0xe06034);if(this[_0xf6cbc9(0x5ab)](_0xe06034[0x0])){if(_0xf6cbc9(0x112)==='YNcdJ')_0x28dbb2=!_0x28dbb2;else{if(_0x4c1b86[_0xf6cbc9(0x58f)][_0xf6cbc9(0x550)][_0xf6cbc9(0x1bb)]['KeyItemProtect']&&_0x20b8b9['isKeyItem'](_0x574a5e))return;_0x52a38b[_0xf6cbc9(0x58f)][_0xf6cbc9(0x105)][_0xf6cbc9(0x212)](this,_0x1bc870);}}_0x143d49[_0xf6cbc9(0x899)]=_0xe06034,_0x143d49[_0xf6cbc9(0x854)](_0x4151c2,_0x6d71eb,_0x28dbb2,_0xd7c90c),_0x143d49[_0xf6cbc9(0x428)](_0x2cfffc),this[_0xf6cbc9(0x464)][_0xf6cbc9(0x41b)](_0x143d49),this[_0xf6cbc9(0x48c)][_0xf6cbc9(0x3dd)](_0x143d49);},Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x20c)]=function(_0x2c998d){const _0x51af25=_0x41d84b;this[_0x51af25(0x48c)][_0x51af25(0x2bc)](_0x2c998d),this[_0x51af25(0x464)][_0x51af25(0x568)](_0x2c998d);for(const _0x15b190 of _0x2c998d['targetObjects']){_0x15b190[_0x51af25(0x754)]&&('NiICQ'!==_0x51af25(0x13d)?(_0x4fa1f8(_0x51af25(0x6f4)[_0x51af25(0x125)](_0x3c409,_0x916d55,_0x4b7a5a)),_0x416257[_0x51af25(0x80e)]()):_0x15b190[_0x51af25(0x754)]());}_0x2c998d[_0x51af25(0x3b6)]();},Spriteset_Base['prototype'][_0x41d84b(0x67e)]=function(){const _0x39d6d0=_0x41d84b;for(const _0x14b1be of this[_0x39d6d0(0x48c)]){this[_0x39d6d0(0x20c)](_0x14b1be);}},Spriteset_Base[_0x41d84b(0x806)]['isFauxAnimationPlaying']=function(){const _0x37a27c=_0x41d84b;return this[_0x37a27c(0x48c)][_0x37a27c(0x669)]>0x0;},Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x8f4)]=function(){const _0x4b495b=_0x41d84b;for(const _0x57feac of this[_0x4b495b(0x284)]){!_0x57feac[_0x4b495b(0x11d)]()&&this[_0x4b495b(0x3b2)](_0x57feac);}this[_0x4b495b(0x842)]();},Spriteset_Base[_0x41d84b(0x806)]['processPointAnimationRequests']=function(){const _0x2162cd=_0x41d84b;for(;;){const _0x5709cf=$gameTemp[_0x2162cd(0x2b8)]();if(_0x5709cf)'pByKz'!=='pByKz'?(_0x45b160[_0x2162cd(0x58f)][_0x2162cd(0x4cd)][_0x2162cd(0x212)](this,_0x515a6c),_0x587163=this[_0x2162cd(0x5cb)],_0x39bef0=this[_0x2162cd(0x843)],_0x1cc7bd=this[_0x2162cd(0x3b9)]||this[_0x2162cd(0x843)][0x0]):this[_0x2162cd(0x36d)](_0x5709cf);else break;}},Spriteset_Base['prototype']['createPointAnimation']=function(_0x5a4b72){const _0x19d38f=_0x41d84b,_0x5c811e=$dataAnimations[_0x5a4b72[_0x19d38f(0x757)]],_0x34c89b=this[_0x19d38f(0x56c)](_0x5a4b72),_0x135a27=_0x5a4b72[_0x19d38f(0x370)],_0x5bdaa8=_0x5a4b72[_0x19d38f(0x35b)];let _0x1ac9cc=this['animationBaseDelay']();const _0x3df87c=this[_0x19d38f(0x745)]();if(this['isAnimationForEach'](_0x5c811e))for(const _0x1ec58e of _0x34c89b){_0x19d38f(0x2eb)===_0x19d38f(0x2eb)?(this[_0x19d38f(0x644)]([_0x1ec58e],_0x5c811e,_0x135a27,_0x1ac9cc,_0x5bdaa8),_0x1ac9cc+=_0x3df87c):this[_0x19d38f(0x3d7)][_0x2a108b]=this[_0x19d38f(0x74a)](_0x57c684(_0x51a91c));}else this['createPointAnimationSprite'](_0x34c89b,_0x5c811e,_0x135a27,_0x1ac9cc,_0x5bdaa8);},Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x56c)]=function(_0x174438){const _0x556a21=_0x41d84b,_0xb9b5a0=new Sprite_Clickable();_0xb9b5a0['x']=_0x174438['x'],_0xb9b5a0['y']=_0x174438['y'],_0xb9b5a0['z']=0x64;const _0x5183b7=this[_0x556a21(0x875)]();return _0x5183b7[_0x556a21(0x41b)](_0xb9b5a0),[_0xb9b5a0];},Spriteset_Base['prototype']['getPointAnimationLayer']=function(){return this;},Spriteset_Map['prototype'][_0x41d84b(0x875)]=function(){const _0x283ac7=_0x41d84b;return this[_0x283ac7(0x455)]||this;},Spriteset_Battle[_0x41d84b(0x806)]['getPointAnimationLayer']=function(){const _0x25a255=_0x41d84b;return this[_0x25a255(0x16c)]||this;},Spriteset_Base[_0x41d84b(0x806)]['createPointAnimationSprite']=function(_0x5b99bf,_0x18cdef,_0x526557,_0x2832ec,_0x1a5949){const _0x2b70f5=_0x41d84b,_0x559098=this[_0x2b70f5(0x4c0)](_0x18cdef),_0x4df7e9=new(_0x559098?Sprite_AnimationMV:Sprite_Animation)();_0x4df7e9[_0x2b70f5(0x899)]=_0x5b99bf,_0x4df7e9[_0x2b70f5(0x854)](_0x5b99bf,_0x18cdef,_0x526557,_0x2832ec),_0x4df7e9[_0x2b70f5(0x428)](_0x1a5949),this[_0x2b70f5(0x464)]['addChild'](_0x4df7e9),this[_0x2b70f5(0x284)][_0x2b70f5(0x3dd)](_0x4df7e9);},Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x3b2)]=function(_0x354d55){const _0x16cfc1=_0x41d84b;this[_0x16cfc1(0x284)][_0x16cfc1(0x2bc)](_0x354d55),this[_0x16cfc1(0x464)][_0x16cfc1(0x568)](_0x354d55);for(const _0x473c22 of _0x354d55[_0x16cfc1(0x899)]){if(_0x16cfc1(0x643)===_0x16cfc1(0x643)){if(_0x473c22['endAnimation']){if(_0x16cfc1(0x548)===_0x16cfc1(0x8fd))return;else _0x473c22[_0x16cfc1(0x754)]();}const _0x1d44e5=this[_0x16cfc1(0x875)]();if(_0x1d44e5)_0x1d44e5[_0x16cfc1(0x568)](_0x473c22);}else _0xa93959[_0x16cfc1(0x392)]();}_0x354d55['destroy']();},Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x57a)]=function(){const _0x206230=_0x41d84b;for(const _0x19e0ae of this[_0x206230(0x284)]){this['removePointAnimation'](_0x19e0ae);}},Spriteset_Base[_0x41d84b(0x806)][_0x41d84b(0x21d)]=function(){const _0x1881f3=_0x41d84b;return this['_pointAnimationSprites'][_0x1881f3(0x669)]>0x0;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x27e)]=Spriteset_Base['prototype'][_0x41d84b(0x3c3)],Spriteset_Base['prototype'][_0x41d84b(0x3c3)]=function(){const _0x58f9eb=_0x41d84b;return VisuMZ['CoreEngine'][_0x58f9eb(0x27e)][_0x58f9eb(0x212)](this)||this['isPointAnimationPlaying']();},Spriteset_Map['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)][_0x41d84b(0x1bb)]['DetachMapPictureContainer']||![],VisuMZ[_0x41d84b(0x58f)]['Scene_Map_createSpriteset_detach']=Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x46f)],Scene_Map[_0x41d84b(0x806)][_0x41d84b(0x46f)]=function(){const _0x2ab16b=_0x41d84b;VisuMZ[_0x2ab16b(0x58f)][_0x2ab16b(0x7be)][_0x2ab16b(0x212)](this);if(!Spriteset_Map[_0x2ab16b(0x4a0)])return;const _0x3b398f=this['_spriteset'];if(!_0x3b398f)return;this[_0x2ab16b(0x4dd)]=_0x3b398f[_0x2ab16b(0x4dd)];if(!this['_pictureContainer'])return;this['addChild'](this[_0x2ab16b(0x4dd)]);},Spriteset_Battle[_0x41d84b(0x4a0)]=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)]['QoL'][_0x41d84b(0x65b)]||![],VisuMZ['CoreEngine'][_0x41d84b(0x4c4)]=Scene_Battle[_0x41d84b(0x806)][_0x41d84b(0x46f)],Scene_Battle['prototype'][_0x41d84b(0x46f)]=function(){const _0x36600b=_0x41d84b;VisuMZ[_0x36600b(0x58f)][_0x36600b(0x4c4)]['call'](this);if(!Spriteset_Battle[_0x36600b(0x4a0)])return;const _0xc63b5e=this[_0x36600b(0x690)];if(!_0xc63b5e)return;this[_0x36600b(0x4dd)]=_0xc63b5e[_0x36600b(0x4dd)];if(!this[_0x36600b(0x4dd)])return;this[_0x36600b(0x41b)](this[_0x36600b(0x4dd)]);},Spriteset_Battle[_0x41d84b(0x806)]['createBackground']=function(){const _0x48cc8c=_0x41d84b;this[_0x48cc8c(0x83c)]=new PIXI[(_0x48cc8c(0x84b))][(_0x48cc8c(0x6fd))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0x48cc8c(0x3ea)][_0x48cc8c(0x4fd)]=SceneManager['backgroundBitmap'](),this['_backgroundSprite'][_0x48cc8c(0x84b)]=[this['_backgroundFilter']],this[_0x48cc8c(0x12c)][_0x48cc8c(0x41b)](this[_0x48cc8c(0x3ea)]);},VisuMZ['CoreEngine'][_0x41d84b(0x34f)]=Spriteset_Battle['prototype'][_0x41d84b(0x14f)],Spriteset_Battle[_0x41d84b(0x806)][_0x41d84b(0x14f)]=function(){const _0x14d12d=_0x41d84b;if(this[_0x14d12d(0x44e)]()){if('PVswd'!=='VJwLR')this[_0x14d12d(0x6ae)]();else{_0x594364[_0x14d12d(0x58f)]['ParseActorNotetags']['call'](this,_0x5d4b08);const _0x368c30=_0x29745e[_0x14d12d(0x326)];if(_0x368c30[_0x14d12d(0x5a2)](/<MAX LEVEL:[ ](\d+)>/i)){_0x5cb899[_0x14d12d(0x4d6)]=_0x45f496(_0x19d025['$1']);if(_0x53f4fa[_0x14d12d(0x4d6)]===0x0)_0x4dfedf['maxLevel']=_0x43fa6a[_0x14d12d(0x3a0)];}_0x368c30[_0x14d12d(0x5a2)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x854f00[_0x14d12d(0x82f)]=_0x4eae14['min'](_0x19d03a(_0x34f3d0['$1']),_0x56f23d[_0x14d12d(0x4d6)]));}}VisuMZ[_0x14d12d(0x58f)]['Spriteset_Battle_createEnemies']['call'](this);},Spriteset_Battle[_0x41d84b(0x806)][_0x41d84b(0x44e)]=function(){const _0x1f4fd9=_0x41d84b,_0x23094a=VisuMZ[_0x1f4fd9(0x58f)]['Settings'][_0x1f4fd9(0x4eb)];if(!_0x23094a)return![];if(Utils[_0x1f4fd9(0x5a3)]>=_0x1f4fd9(0x10b)&&!_0x23094a[_0x1f4fd9(0x878)])return![];return _0x23094a[_0x1f4fd9(0x1cd)];},Spriteset_Battle['prototype'][_0x41d84b(0x6ae)]=function(){const _0x27759f=_0x41d84b;for(member of $gameTroop['members']()){_0x27759f(0x323)==='egLmw'?this['_targetAnchor']=_0x556353:member['moveRelativeToResolutionChange']();}},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x3d4)]=Window_Base[_0x41d84b(0x806)]['initialize'],Window_Base[_0x41d84b(0x806)][_0x41d84b(0x3e9)]=function(_0x3b8b23){const _0x2edf81=_0x41d84b;_0x3b8b23['x']=Math['round'](_0x3b8b23['x']),_0x3b8b23['y']=Math['round'](_0x3b8b23['y']),_0x3b8b23[_0x2edf81(0x3a6)]=Math[_0x2edf81(0x7f6)](_0x3b8b23[_0x2edf81(0x3a6)]),_0x3b8b23['height']=Math[_0x2edf81(0x7f6)](_0x3b8b23[_0x2edf81(0x536)]),this[_0x2edf81(0x75e)](),VisuMZ['CoreEngine']['Window_Base_initialize'][_0x2edf81(0x212)](this,_0x3b8b23),this['initCoreEasing']();},Window_Base[_0x41d84b(0x806)][_0x41d84b(0x75e)]=function(){const _0x2442c2=_0x41d84b;this[_0x2442c2(0x400)]=VisuMZ['CoreEngine'][_0x2442c2(0x550)]['QoL'][_0x2442c2(0x40f)],this[_0x2442c2(0x275)]=VisuMZ['CoreEngine']['Settings'][_0x2442c2(0x1bb)][_0x2442c2(0x17e)];},Window_Base[_0x41d84b(0x806)][_0x41d84b(0x115)]=function(){const _0x59df9f=_0x41d84b;return VisuMZ[_0x59df9f(0x58f)][_0x59df9f(0x550)][_0x59df9f(0x17f)][_0x59df9f(0x85c)];},Window_Base[_0x41d84b(0x806)][_0x41d84b(0x43e)]=function(){const _0x1a1d27=_0x41d84b;return VisuMZ[_0x1a1d27(0x58f)][_0x1a1d27(0x550)]['Window']['ItemPadding'];},Window_Base[_0x41d84b(0x806)]['updateBackOpacity']=function(){const _0x2daff9=_0x41d84b;if($gameSystem[_0x2daff9(0x246)]){if(_0x2daff9(0x277)===_0x2daff9(0x56f))return-0.5*(_0x214c36[_0x2daff9(0x4ab)](0x1-_0x37cc1c*_0x47cec8)-0x1);else this[_0x2daff9(0x163)]=$gameSystem[_0x2daff9(0x246)]();}else this[_0x2daff9(0x163)]=VisuMZ['CoreEngine']['Settings']['Window'][_0x2daff9(0x463)];},Window_Base[_0x41d84b(0x806)][_0x41d84b(0x51b)]=function(){const _0x1e3fe1=_0x41d84b;return VisuMZ[_0x1e3fe1(0x58f)][_0x1e3fe1(0x550)][_0x1e3fe1(0x17f)][_0x1e3fe1(0x1a8)];},Window_Base[_0x41d84b(0x806)]['openingSpeed']=function(){const _0x1950e4=_0x41d84b;return VisuMZ[_0x1950e4(0x58f)][_0x1950e4(0x550)][_0x1950e4(0x17f)][_0x1950e4(0x67d)];},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x34a)]=Window_Base[_0x41d84b(0x806)][_0x41d84b(0x75c)],Window_Base[_0x41d84b(0x806)][_0x41d84b(0x75c)]=function(){const _0x2c103b=_0x41d84b;VisuMZ[_0x2c103b(0x58f)][_0x2c103b(0x34a)][_0x2c103b(0x212)](this),this[_0x2c103b(0x169)]();},Window_Base['prototype'][_0x41d84b(0x859)]=function(){const _0x4cb07c=_0x41d84b;this['_opening']&&(this[_0x4cb07c(0x7c4)]+=this[_0x4cb07c(0x646)](),this[_0x4cb07c(0x49b)]()&&(this['_opening']=![]));},Window_Base[_0x41d84b(0x806)]['updateClose']=function(){const _0x183159=_0x41d84b;this[_0x183159(0x29c)]&&(_0x183159(0x70d)!==_0x183159(0x70d)?this[_0x183159(0x79c)]=_0x5ca276:(this[_0x183159(0x7c4)]-=this[_0x183159(0x646)](),this[_0x183159(0x499)]()&&(this['_closing']=![])));},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x1d9)]=Window_Base[_0x41d84b(0x806)][_0x41d84b(0x3e6)],Window_Base[_0x41d84b(0x806)][_0x41d84b(0x3e6)]=function(_0x490721,_0x543eb5,_0x754013,_0x5204de,_0x3030f3){const _0x1b3a28=_0x41d84b;if(this[_0x1b3a28(0x807)]())_0x490721=VisuMZ[_0x1b3a28(0x636)](_0x490721);VisuMZ['CoreEngine'][_0x1b3a28(0x1d9)][_0x1b3a28(0x212)](this,_0x490721,_0x543eb5,_0x754013,_0x5204de,_0x3030f3);},Window_Base[_0x41d84b(0x806)][_0x41d84b(0x807)]=function(){const _0x1b3ba3=_0x41d84b;return this[_0x1b3ba3(0x400)];},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x6d8)]=Window_Base[_0x41d84b(0x806)]['createTextState'],Window_Base['prototype'][_0x41d84b(0x383)]=function(_0x2158d5,_0x51d462,_0x388c4b,_0x2fb4df){const _0xbbe16b=_0x41d84b;var _0x46f9a2=VisuMZ[_0xbbe16b(0x58f)][_0xbbe16b(0x6d8)]['call'](this,_0x2158d5,_0x51d462,_0x388c4b,_0x2fb4df);if(this['useDigitGroupingEx']())_0x46f9a2['text']=VisuMZ[_0xbbe16b(0x636)](_0x46f9a2[_0xbbe16b(0x1c2)]);return _0x46f9a2;},Window_Base[_0x41d84b(0x806)][_0x41d84b(0x168)]=function(){const _0x40857a=_0x41d84b;return this[_0x40857a(0x275)];},Window_Base[_0x41d84b(0x806)]['enableDigitGrouping']=function(_0x334ce3){this['_digitGrouping']=_0x334ce3;},Window_Base[_0x41d84b(0x806)][_0x41d84b(0x82e)]=function(_0x2afec8){const _0x23d531=_0x41d84b;this[_0x23d531(0x275)]=_0x2afec8;},VisuMZ[_0x41d84b(0x58f)]['Window_Base_drawIcon']=Window_Base['prototype'][_0x41d84b(0x6de)],Window_Base[_0x41d84b(0x806)][_0x41d84b(0x6de)]=function(_0xcf9698,_0x8d89e7,_0x2a691f){const _0x42d0d3=_0x41d84b;_0x8d89e7=Math['round'](_0x8d89e7),_0x2a691f=Math[_0x42d0d3(0x7f6)](_0x2a691f),VisuMZ['CoreEngine'][_0x42d0d3(0x7e0)][_0x42d0d3(0x212)](this,_0xcf9698,_0x8d89e7,_0x2a691f);},VisuMZ['CoreEngine'][_0x41d84b(0x398)]=Window_Base[_0x41d84b(0x806)][_0x41d84b(0x6df)],Window_Base[_0x41d84b(0x806)]['drawFace']=function(_0x4dc6ff,_0x4ed240,_0x4e21d6,_0x507e9e,_0x5417cf,_0x33cb9e){const _0x408ded=_0x41d84b;_0x5417cf=_0x5417cf||ImageManager[_0x408ded(0x388)],_0x33cb9e=_0x33cb9e||ImageManager[_0x408ded(0x762)],_0x4e21d6=Math['round'](_0x4e21d6),_0x507e9e=Math[_0x408ded(0x7f6)](_0x507e9e),_0x5417cf=Math[_0x408ded(0x7f6)](_0x5417cf),_0x33cb9e=Math['round'](_0x33cb9e),VisuMZ[_0x408ded(0x58f)][_0x408ded(0x398)][_0x408ded(0x212)](this,_0x4dc6ff,_0x4ed240,_0x4e21d6,_0x507e9e,_0x5417cf,_0x33cb9e);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x376)]=Window_Base[_0x41d84b(0x806)]['drawCharacter'],Window_Base[_0x41d84b(0x806)]['drawCharacter']=function(_0x41eabf,_0x51400f,_0x2260a4,_0x50b061){const _0x144ef2=_0x41d84b;_0x2260a4=Math[_0x144ef2(0x7f6)](_0x2260a4),_0x50b061=Math['round'](_0x50b061),VisuMZ[_0x144ef2(0x58f)]['Window_Base_drawCharacter']['call'](this,_0x41eabf,_0x51400f,_0x2260a4,_0x50b061);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x257)]=Window_Selectable[_0x41d84b(0x806)]['itemRect'],Window_Selectable[_0x41d84b(0x806)]['itemRect']=function(_0x405ab0){const _0x28a71a=_0x41d84b;let _0x3f5c1c=VisuMZ['CoreEngine'][_0x28a71a(0x257)][_0x28a71a(0x212)](this,_0x405ab0);return _0x3f5c1c['x']=Math[_0x28a71a(0x7f6)](_0x3f5c1c['x']),_0x3f5c1c['y']=Math[_0x28a71a(0x7f6)](_0x3f5c1c['y']),_0x3f5c1c[_0x28a71a(0x3a6)]=Math[_0x28a71a(0x7f6)](_0x3f5c1c['width']),_0x3f5c1c[_0x28a71a(0x536)]=Math[_0x28a71a(0x7f6)](_0x3f5c1c[_0x28a71a(0x536)]),_0x3f5c1c;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x888)]=Window_StatusBase['prototype'][_0x41d84b(0x701)],Window_StatusBase['prototype']['drawActorSimpleStatus']=function(_0x2a5703,_0x35f244,_0x1a071d){const _0xef48a4=_0x41d84b;_0x35f244=Math['round'](_0x35f244),_0x1a071d=Math['round'](_0x1a071d),VisuMZ[_0xef48a4(0x58f)]['Window_StatusBase_drawActorSimpleStatus'][_0xef48a4(0x212)](this,_0x2a5703,_0x35f244,_0x1a071d);},Window_Base[_0x41d84b(0x806)][_0x41d84b(0x791)]=function(){const _0x164a2b=_0x41d84b;this[_0x164a2b(0xdc)]={'duration':0x0,'wholeDuration':0x0,'type':_0x164a2b(0x56a),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x164a2b(0x4aa)]['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this[_0x164a2b(0x163)],'targetContentsOpacity':this[_0x164a2b(0x7fd)]};},Window_Base[_0x41d84b(0x806)][_0x41d84b(0x169)]=function(){const _0x1990c7=_0x41d84b;if(!this[_0x1990c7(0xdc)])return;if(this[_0x1990c7(0xdc)][_0x1990c7(0x8a2)]<=0x0)return;this['x']=this[_0x1990c7(0x4c5)](this['x'],this[_0x1990c7(0xdc)]['targetX']),this['y']=this['applyCoreEasing'](this['y'],this[_0x1990c7(0xdc)][_0x1990c7(0x1ef)]),this[_0x1990c7(0x4aa)]['x']=this['applyCoreEasing'](this[_0x1990c7(0x4aa)]['x'],this[_0x1990c7(0xdc)]['targetScaleX']),this['scale']['y']=this[_0x1990c7(0x4c5)](this[_0x1990c7(0x4aa)]['y'],this[_0x1990c7(0xdc)][_0x1990c7(0x7b5)]),this['opacity']=this[_0x1990c7(0x4c5)](this[_0x1990c7(0x405)],this[_0x1990c7(0xdc)][_0x1990c7(0x848)]),this['backOpacity']=this[_0x1990c7(0x4c5)](this[_0x1990c7(0x163)],this[_0x1990c7(0xdc)][_0x1990c7(0x15b)]),this['contentsOpacity']=this['applyCoreEasing'](this['contentsOpacity'],this[_0x1990c7(0xdc)][_0x1990c7(0x259)]),this[_0x1990c7(0xdc)][_0x1990c7(0x8a2)]--;},Window_Base[_0x41d84b(0x806)]['applyCoreEasing']=function(_0x2cdea2,_0x5783a7){const _0x819591=_0x41d84b;if(!this[_0x819591(0xdc)])return _0x5783a7;const _0x1f215a=this[_0x819591(0xdc)][_0x819591(0x8a2)],_0x1d0bcb=this[_0x819591(0xdc)][_0x819591(0x7f2)],_0x35be30=this[_0x819591(0x84c)]((_0x1d0bcb-_0x1f215a)/_0x1d0bcb),_0x3247b3=this[_0x819591(0x84c)]((_0x1d0bcb-_0x1f215a+0x1)/_0x1d0bcb),_0x5af57b=(_0x2cdea2-_0x5783a7*_0x35be30)/(0x1-_0x35be30);return _0x5af57b+(_0x5783a7-_0x5af57b)*_0x3247b3;},Window_Base[_0x41d84b(0x806)][_0x41d84b(0x84c)]=function(_0x4f7572){const _0x53ca68=_0x41d84b;if(!this[_0x53ca68(0xdc)])return _0x4f7572;return VisuMZ[_0x53ca68(0x692)](_0x4f7572,this[_0x53ca68(0xdc)][_0x53ca68(0x2de)]||_0x53ca68(0x56a));},Window_Base[_0x41d84b(0x806)][_0x41d84b(0x2f3)]=function(_0x488fdf,_0x3ba8d6){const _0x3d82ed=_0x41d84b;if(!this['_coreEasing'])return;this['x']=this[_0x3d82ed(0xdc)]['targetX'],this['y']=this[_0x3d82ed(0xdc)][_0x3d82ed(0x1ef)],this[_0x3d82ed(0x4aa)]['x']=this[_0x3d82ed(0xdc)][_0x3d82ed(0x180)],this[_0x3d82ed(0x4aa)]['y']=this[_0x3d82ed(0xdc)][_0x3d82ed(0x7b5)],this['opacity']=this[_0x3d82ed(0xdc)]['targetOpacity'],this[_0x3d82ed(0x163)]=this[_0x3d82ed(0xdc)]['targetBackOpacity'],this[_0x3d82ed(0x7fd)]=this['_coreEasing'][_0x3d82ed(0x259)],this[_0x3d82ed(0x513)](_0x488fdf,_0x3ba8d6,this['x'],this['y'],this['scale']['x'],this[_0x3d82ed(0x4aa)]['y'],this[_0x3d82ed(0x405)],this[_0x3d82ed(0x163)],this['contentsOpacity']);},Window_Base[_0x41d84b(0x806)][_0x41d84b(0x513)]=function(_0x54849e,_0x2448ad,_0x5cf1a9,_0x458481,_0x21304e,_0x3326a0,_0x3a3bd4,_0x106684,_0x3cd55c){const _0x42e1c8=_0x41d84b;this[_0x42e1c8(0xdc)]={'duration':_0x54849e,'wholeDuration':_0x54849e,'type':_0x2448ad,'targetX':_0x5cf1a9,'targetY':_0x458481,'targetScaleX':_0x21304e,'targetScaleY':_0x3326a0,'targetOpacity':_0x3a3bd4,'targetBackOpacity':_0x106684,'targetContentsOpacity':_0x3cd55c};},Window_Base[_0x41d84b(0x806)]['drawCurrencyValue']=function(_0x5614e8,_0x1ab0c9,_0x15d146,_0x2866ae,_0x179ce8){const _0x3db537=_0x41d84b;this['resetFontSettings'](),this['contents'][_0x3db537(0x485)]=VisuMZ['CoreEngine'][_0x3db537(0x550)][_0x3db537(0x597)]['GoldFontSize'];const _0x241e1b=VisuMZ['CoreEngine']['Settings'][_0x3db537(0x597)][_0x3db537(0x812)];if(_0x241e1b>0x0&&_0x1ab0c9===TextManager[_0x3db537(0x3ad)]){const _0x30be49=_0x2866ae+(this[_0x3db537(0x115)]()-ImageManager[_0x3db537(0x74c)])/0x2;this[_0x3db537(0x6de)](_0x241e1b,_0x15d146+(_0x179ce8-ImageManager[_0x3db537(0x69f)]),_0x30be49),_0x179ce8-=ImageManager[_0x3db537(0x69f)]+0x4;}else{if(_0x3db537(0x80c)!==_0x3db537(0x80c)){if(!this[_0x3db537(0x2c6)]())return;_0x77b9f5[_0x3db537(0x64c)]()?this[_0x3db537(0x1f0)]():_0x3311ea[_0x3db537(0x806)][_0x3db537(0x30d)][_0x3db537(0x212)](this);}else this['changeTextColor'](ColorManager['systemColor']()),this[_0x3db537(0x3e6)](_0x1ab0c9,_0x15d146,_0x2866ae,_0x179ce8,_0x3db537(0x54b)),_0x179ce8-=this[_0x3db537(0xfa)](_0x1ab0c9)+0x6;}this[_0x3db537(0x37f)]();const _0x1cee2e=this[_0x3db537(0xfa)](this[_0x3db537(0x400)]?VisuMZ['GroupDigits'](_0x5614e8):_0x5614e8);if(_0x1cee2e>_0x179ce8)this['drawText'](VisuMZ['CoreEngine']['Settings'][_0x3db537(0x597)][_0x3db537(0x3d2)],_0x15d146,_0x2866ae,_0x179ce8,_0x3db537(0x54b));else{if('JsRoa'!=='qqCzQ')this['drawText'](_0x5614e8,_0x15d146,_0x2866ae,_0x179ce8,'right');else{if(_0x1d993d===0x8)return![];return _0x18e844[_0x3db537(0x58f)]['Input_shouldPreventDefault'][_0x3db537(0x212)](this,_0x239f6f);}}this['resetFontSettings']();},Window_Base[_0x41d84b(0x806)]['drawIconBySize']=function(_0x771224,_0x2b26c0,_0x597d01,_0x484d65,_0x48c269){const _0x493490=_0x41d84b,_0x310e8e=ImageManager[_0x493490(0x51a)](_0x493490(0x815)),_0x1704ba=ImageManager[_0x493490(0x69f)],_0x810f37=ImageManager[_0x493490(0x74c)],_0x386d1f=_0x771224%0x10*_0x1704ba,_0x3775f0=Math[_0x493490(0x5d1)](_0x771224/0x10)*_0x810f37,_0xc1fefb=_0x484d65,_0x5b672e=_0x484d65;this[_0x493490(0x254)][_0x493490(0x106)]['imageSmoothingEnabled']=_0x48c269,this[_0x493490(0x254)][_0x493490(0x666)](_0x310e8e,_0x386d1f,_0x3775f0,_0x1704ba,_0x810f37,_0x2b26c0,_0x597d01,_0xc1fefb,_0x5b672e),this['contents']['_context'][_0x493490(0x897)]=!![];},Window_Base[_0x41d84b(0x806)][_0x41d84b(0x65a)]=function(_0x15d7b5,_0x4df293,_0x1a5601,_0x243333,_0x4ecc49,_0x37b28f){const _0x2cb69b=_0x41d84b,_0x52b6b8=Math['floor']((_0x1a5601-0x2)*_0x243333),_0x2482d5=Sprite_Gauge[_0x2cb69b(0x806)]['gaugeHeight']['call'](this),_0x538eaa=_0x4df293+this[_0x2cb69b(0x115)]()-_0x2482d5-0x2;this[_0x2cb69b(0x254)]['fillRect'](_0x15d7b5,_0x538eaa,_0x1a5601,_0x2482d5,ColorManager[_0x2cb69b(0x344)]()),this[_0x2cb69b(0x254)][_0x2cb69b(0x333)](_0x15d7b5+0x1,_0x538eaa+0x1,_0x52b6b8,_0x2482d5-0x2,_0x4ecc49,_0x37b28f);},Window_Selectable[_0x41d84b(0x806)][_0x41d84b(0x335)]=function(_0x4be495){const _0x5480cf=_0x41d84b;let _0x5e8294=this[_0x5480cf(0x143)]();const _0x49e193=this['maxItems'](),_0x2590ce=this['maxCols']();if(this[_0x5480cf(0x1ca)]()&&(_0x5e8294<_0x49e193||_0x4be495&&_0x2590ce===0x1)){_0x5e8294+=_0x2590ce;if(_0x5e8294>=_0x49e193)_0x5e8294=_0x49e193-0x1;this['smoothSelect'](_0x5e8294);}else!this[_0x5480cf(0x1ca)]()&&((_0x5e8294<_0x49e193-_0x2590ce||_0x4be495&&_0x2590ce===0x1)&&(_0x5480cf(0x585)===_0x5480cf(0x585)?this[_0x5480cf(0x779)]((_0x5e8294+_0x2590ce)%_0x49e193):(this[_0x5480cf(0x75a)]['OnLoadJS'][_0x5480cf(0x212)](this),this[_0x5480cf(0x75a)][_0x5480cf(0x7ce)][_0x5480cf(0x212)](this),this[_0x5480cf(0x84d)](this[_0x5480cf(0x75a)][_0x5480cf(0x19f)]['bind'](this)))));},VisuMZ['CoreEngine']['Window_Selectable_cursorDown']=Window_Selectable[_0x41d84b(0x806)]['cursorDown'],Window_Selectable['prototype'][_0x41d84b(0x335)]=function(_0x28301b){const _0x462f40=_0x41d84b;this[_0x462f40(0x1ca)]()&&_0x28301b&&this['maxCols']()===0x1&&this[_0x462f40(0x143)]()===this['maxItems']()-0x1?this[_0x462f40(0x779)](0x0):VisuMZ[_0x462f40(0x58f)]['Window_Selectable_cursorDown'][_0x462f40(0x212)](this,_0x28301b);},Window_Selectable[_0x41d84b(0x806)][_0x41d84b(0x4bb)]=function(_0xa1a5f8){const _0x5ed39b=_0x41d84b;let _0x38723d=Math[_0x5ed39b(0x81e)](0x0,this[_0x5ed39b(0x143)]());const _0x4ab904=this[_0x5ed39b(0x5ce)](),_0x2739d8=this[_0x5ed39b(0x7d4)]();if(this[_0x5ed39b(0x1ca)]()&&_0x38723d>0x0||_0xa1a5f8&&_0x2739d8===0x1){_0x38723d-=_0x2739d8;if(_0x38723d<=0x0)_0x38723d=0x0;this['smoothSelect'](_0x38723d);}else{if(!this[_0x5ed39b(0x1ca)]()){if(_0x5ed39b(0x8c6)!=='MnQwe'){if(_0x38723d>=_0x2739d8||_0xa1a5f8&&_0x2739d8===0x1){if(_0x5ed39b(0x58e)!==_0x5ed39b(0x673))this[_0x5ed39b(0x779)]((_0x38723d-_0x2739d8+_0x4ab904)%_0x4ab904);else{if(_0x36ab59)_0x33cb55['ParseActorNotetags'](_0x433c70);}}}else return this[_0x5ed39b(0x76e)](_0x2aa13c);}}},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x549)]=Window_Selectable[_0x41d84b(0x806)][_0x41d84b(0x4bb)],Window_Selectable['prototype'][_0x41d84b(0x4bb)]=function(_0x2173e9){const _0x29f9d5=_0x41d84b;if(this[_0x29f9d5(0x1ca)]()&&_0x2173e9&&this[_0x29f9d5(0x7d4)]()===0x1&&this['index']()===0x0){if(_0x29f9d5(0x2e9)!==_0x29f9d5(0x2e9))return _0x44a04d[_0x29f9d5(0x13f)]&&_0x30346f[_0x29f9d5(0x1a9)][_0x29f9d5(0x4c8)]('['+_0x2a20f7+']');else this[_0x29f9d5(0x779)](this[_0x29f9d5(0x5ce)]()-0x1);}else{if('FWGVn'!==_0x29f9d5(0x316))return _0x84889d['layoutSettings'][_0x29f9d5(0x122)][_0x29f9d5(0x212)](this);else VisuMZ[_0x29f9d5(0x58f)][_0x29f9d5(0x549)][_0x29f9d5(0x212)](this,_0x2173e9);}},Window_Selectable[_0x41d84b(0x806)][_0x41d84b(0x1ca)]=function(){const _0x4b53b0=_0x41d84b;return VisuMZ['CoreEngine'][_0x4b53b0(0x550)][_0x4b53b0(0x1bb)][_0x4b53b0(0x7a7)];},VisuMZ['CoreEngine'][_0x41d84b(0x16d)]=Window_Selectable[_0x41d84b(0x806)][_0x41d84b(0x30d)],Window_Selectable[_0x41d84b(0x806)][_0x41d84b(0x30d)]=function(){const _0x359e36=_0x41d84b;this[_0x359e36(0x1ca)]()?(this[_0x359e36(0x25d)](),this[_0x359e36(0x7da)]()):VisuMZ[_0x359e36(0x58f)]['Window_Selectable_processCursorMove']['call'](this);},Window_Selectable['prototype'][_0x41d84b(0x159)]=function(){return!![];},Window_Selectable[_0x41d84b(0x806)][_0x41d84b(0x25d)]=function(){const _0x149e56=_0x41d84b;if(this[_0x149e56(0x2c6)]()){const _0x3466f9=this[_0x149e56(0x143)]();if(Input[_0x149e56(0x65f)](_0x149e56(0x211))){if(Input[_0x149e56(0x11c)]('shift')&&this[_0x149e56(0x159)]()){if(_0x149e56(0x6b9)!==_0x149e56(0x363))this[_0x149e56(0x608)]();else return _0x35f484['layoutSettings']['GoldRect'][_0x149e56(0x212)](this);}else this[_0x149e56(0x335)](Input[_0x149e56(0x439)](_0x149e56(0x211)));}Input[_0x149e56(0x65f)]('up')&&(Input[_0x149e56(0x11c)](_0x149e56(0x831))&&this['allowShiftScrolling']()?this[_0x149e56(0x8cf)]():this[_0x149e56(0x4bb)](Input[_0x149e56(0x439)]('up')));Input[_0x149e56(0x65f)](_0x149e56(0x54b))&&this['cursorRight'](Input[_0x149e56(0x439)]('right'));if(Input[_0x149e56(0x65f)]('left')){if(_0x149e56(0x640)!==_0x149e56(0x640)){if(this[_0x149e56(0x5fb)]===_0x337590)this[_0x149e56(0x914)]();if(this[_0x149e56(0x5fb)]['Padding']===_0x1a5bc8)this['initCoreEngine']();return this[_0x149e56(0x5fb)][_0x149e56(0x8f9)];}else this[_0x149e56(0x789)](Input['isTriggered'](_0x149e56(0x6d6)));}if(!this[_0x149e56(0x404)](_0x149e56(0x28e))&&Input[_0x149e56(0x65f)](_0x149e56(0x28e))){if('mdEGE'===_0x149e56(0x576))this[_0x149e56(0x608)]();else{const _0x4f76d3=_0x138d95[_0x118f5d];if(!_0x4f76d3)return'';let _0x28c25c='';_0x28c25c+=_0x4f76d3[_0x149e56(0x37a)];for(const _0x250108 of _0x4f76d3[_0x149e56(0x8fe)]){for(const _0xe335d2 of _0x250108[_0x149e56(0x3b8)]){[0x6c,0x198]['includes'](_0xe335d2[_0x149e56(0xec)])&&(_0x28c25c+='\x0a',_0x28c25c+=_0xe335d2[_0x149e56(0x543)][0x0]);}}return _0x28c25c;}}!this['isHandled'](_0x149e56(0x41a))&&Input[_0x149e56(0x65f)](_0x149e56(0x41a))&&this[_0x149e56(0x8cf)](),this[_0x149e56(0x143)]()!==_0x3466f9&&('TqDFQ'==='aSwNw'?_0xfa4320+=_0x1bc3cd/0x2:this[_0x149e56(0x7d9)]());}},Window_Selectable[_0x41d84b(0x806)][_0x41d84b(0x7da)]=function(){const _0x2a3829=_0x41d84b;if(this[_0x2a3829(0x2c6)]()){const _0x17011e=this[_0x2a3829(0x143)]();if(Input['isTriggered'](_0x2a3829(0x55c))){if('sWPNW'!=='sWPNW'){var _0x108ef6=_0x3a3d6b(_0xef1135['$1']);_0x2fbfc0+=_0x108ef6;}else this[_0x2a3829(0x779)](Math[_0x2a3829(0x50d)](this[_0x2a3829(0x143)](),0x0));}Input[_0x2a3829(0x439)](_0x2a3829(0x656))&&this['smoothSelect'](Math[_0x2a3829(0x81e)](this['index'](),this['maxItems']()-0x1));if(this[_0x2a3829(0x143)]()!==_0x17011e){if(_0x2a3829(0x694)!==_0x2a3829(0x694))return _0x49bbc4['layoutSettings'][_0x2a3829(0x8e5)][_0x2a3829(0x212)](this);else this[_0x2a3829(0x7d9)]();}}},VisuMZ[_0x41d84b(0x58f)]['Window_Selectable_processTouch']=Window_Selectable[_0x41d84b(0x806)][_0x41d84b(0x7b9)],Window_Selectable[_0x41d84b(0x806)]['processTouch']=function(){const _0x3e46d9=_0x41d84b;this[_0x3e46d9(0x1ca)]()?this[_0x3e46d9(0x8c4)]():VisuMZ[_0x3e46d9(0x58f)][_0x3e46d9(0x77f)]['call'](this);},Window_Selectable[_0x41d84b(0x806)][_0x41d84b(0x8c4)]=function(){const _0x14188c=_0x41d84b;VisuMZ['CoreEngine'][_0x14188c(0x77f)][_0x14188c(0x212)](this);},Window_Selectable['prototype'][_0x41d84b(0x810)]=function(){const _0x2fb298=_0x41d84b;return VisuMZ[_0x2fb298(0x58f)][_0x2fb298(0x550)][_0x2fb298(0x17f)][_0x2fb298(0x685)];},Window_Selectable[_0x41d84b(0x806)]['rowSpacing']=function(){const _0x502ecb=_0x41d84b;return VisuMZ['CoreEngine'][_0x502ecb(0x550)]['Window'][_0x502ecb(0x5b8)];},Window_Selectable['prototype'][_0x41d84b(0x4c2)]=function(){const _0x1062a4=_0x41d84b;return Window_Scrollable[_0x1062a4(0x806)][_0x1062a4(0x4c2)]['call'](this)+VisuMZ[_0x1062a4(0x58f)][_0x1062a4(0x550)][_0x1062a4(0x17f)][_0x1062a4(0x881)];;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x7d8)]=Window_Selectable[_0x41d84b(0x806)][_0x41d84b(0x5b2)],Window_Selectable['prototype']['drawBackgroundRect']=function(_0x22ebc0){const _0x16eefe=_0x41d84b,_0x8f9118=VisuMZ[_0x16eefe(0x58f)][_0x16eefe(0x550)][_0x16eefe(0x17f)];if(_0x8f9118[_0x16eefe(0x8a8)]===![])return;_0x8f9118[_0x16eefe(0x312)]?_0x8f9118[_0x16eefe(0x312)][_0x16eefe(0x212)](this,_0x22ebc0):VisuMZ['CoreEngine'][_0x16eefe(0x7d8)][_0x16eefe(0x212)](this,_0x22ebc0);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x52e)]=Window_Gold[_0x41d84b(0x806)]['refresh'],Window_Gold[_0x41d84b(0x806)][_0x41d84b(0x427)]=function(){const _0x5025e0=_0x41d84b;if(this[_0x5025e0(0x846)]())this['drawGoldItemStyle']();else{if('jjgvA'!=='jjgvA'){if(_0x40990d)_0x43aa4b[_0x5025e0(0x674)](_0x1ea018);}else VisuMZ[_0x5025e0(0x58f)][_0x5025e0(0x52e)][_0x5025e0(0x212)](this);}},Window_Gold[_0x41d84b(0x806)][_0x41d84b(0x846)]=function(){const _0x29c8e2=_0x41d84b;if(TextManager['currencyUnit']!==this['currencyUnit']())return![];return VisuMZ[_0x29c8e2(0x58f)][_0x29c8e2(0x550)][_0x29c8e2(0x597)][_0x29c8e2(0x227)];},Window_Gold[_0x41d84b(0x806)][_0x41d84b(0x482)]=function(){const _0x110eee=_0x41d84b;this[_0x110eee(0x5a7)](),this[_0x110eee(0x254)][_0x110eee(0x4df)](),this[_0x110eee(0x254)][_0x110eee(0x485)]=VisuMZ[_0x110eee(0x58f)][_0x110eee(0x550)]['Gold']['GoldFontSize'];const _0x501fb4=VisuMZ[_0x110eee(0x58f)][_0x110eee(0x550)]['Gold'][_0x110eee(0x812)],_0x3a4169=this['itemLineRect'](0x0);if(_0x501fb4>0x0){if(_0x110eee(0x3db)!=='rwhqp'){this[_0x110eee(0x254)][_0x110eee(0x4df)]();if(_0x2447be['displayName']()){const _0x26664f=this[_0x110eee(0x446)];this[_0x110eee(0x6b5)](0x0,0x0,_0x26664f,this[_0x110eee(0x115)]());const _0xe48eca=this[_0x110eee(0x64d)](_0x45ee4c[_0x110eee(0x7d5)]())[_0x110eee(0x3a6)];this['drawTextEx'](_0x2f70fa[_0x110eee(0x7d5)](),_0x81d8c1[_0x110eee(0x5d1)]((_0x26664f-_0xe48eca)/0x2),0x0);}}else{const _0x338ac7=_0x3a4169['y']+(this['lineHeight']()-ImageManager[_0x110eee(0x74c)])/0x2;this[_0x110eee(0x6de)](_0x501fb4,_0x3a4169['x'],_0x338ac7);const _0x1926be=ImageManager[_0x110eee(0x69f)]+0x4;_0x3a4169['x']+=_0x1926be,_0x3a4169[_0x110eee(0x3a6)]-=_0x1926be;}}this['changeTextColor'](ColorManager[_0x110eee(0x39f)]()),this[_0x110eee(0x3e6)](this[_0x110eee(0x3ad)](),_0x3a4169['x'],_0x3a4169['y'],_0x3a4169[_0x110eee(0x3a6)],_0x110eee(0x6d6));const _0x32ce72=this['textWidth'](this[_0x110eee(0x3ad)]())+0x6;;_0x3a4169['x']+=_0x32ce72,_0x3a4169[_0x110eee(0x3a6)]-=_0x32ce72,this['resetTextColor']();const _0x4b532c=this[_0x110eee(0x3bb)](),_0x2cc340=this[_0x110eee(0xfa)](this[_0x110eee(0x400)]?VisuMZ['GroupDigits'](this['value']()):this[_0x110eee(0x3bb)]());_0x2cc340>_0x3a4169[_0x110eee(0x3a6)]?this['drawText'](VisuMZ['CoreEngine'][_0x110eee(0x550)]['Gold'][_0x110eee(0x3d2)],_0x3a4169['x'],_0x3a4169['y'],_0x3a4169['width'],_0x110eee(0x54b)):this[_0x110eee(0x3e6)](this['value'](),_0x3a4169['x'],_0x3a4169['y'],_0x3a4169[_0x110eee(0x3a6)],_0x110eee(0x54b)),this[_0x110eee(0x5a7)]();},Window_StatusBase['prototype'][_0x41d84b(0x10a)]=function(_0x56a4f6,_0x4e2657,_0x3f9450,_0x1e0424,_0xd7c676){const _0xf1f2d9=_0x41d84b;_0x1e0424=String(_0x1e0424||'')['toUpperCase']();if(VisuMZ[_0xf1f2d9(0x58f)][_0xf1f2d9(0x550)][_0xf1f2d9(0x195)][_0xf1f2d9(0x239)]){const _0x50fa74=VisuMZ[_0xf1f2d9(0x528)](_0x1e0424);_0xd7c676?(this[_0xf1f2d9(0x766)](_0x50fa74,_0x56a4f6,_0x4e2657,this[_0xf1f2d9(0x23f)]()),_0x3f9450-=this[_0xf1f2d9(0x23f)]()+0x2,_0x56a4f6+=this[_0xf1f2d9(0x23f)]()+0x2):(this[_0xf1f2d9(0x6de)](_0x50fa74,_0x56a4f6+0x2,_0x4e2657+0x2),_0x3f9450-=ImageManager['iconWidth']+0x4,_0x56a4f6+=ImageManager[_0xf1f2d9(0x69f)]+0x4);}const _0x3e45e3=TextManager[_0xf1f2d9(0x222)](_0x1e0424);this['resetFontSettings'](),this[_0xf1f2d9(0x431)](ColorManager[_0xf1f2d9(0x39f)]()),_0xd7c676?(this[_0xf1f2d9(0x254)][_0xf1f2d9(0x485)]=this[_0xf1f2d9(0x51f)](),this[_0xf1f2d9(0x254)][_0xf1f2d9(0x3e6)](_0x3e45e3,_0x56a4f6,_0x4e2657,_0x3f9450,this[_0xf1f2d9(0x23f)](),_0xf1f2d9(0x6d6))):this[_0xf1f2d9(0x3e6)](_0x3e45e3,_0x56a4f6,_0x4e2657,_0x3f9450),this[_0xf1f2d9(0x5a7)]();},Window_StatusBase['prototype'][_0x41d84b(0x51f)]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x41d84b(0x806)][_0x41d84b(0xd8)]=function(_0x1c96ba,_0x47c37b,_0x123757,_0x2ca9ab){const _0x287c5d=_0x41d84b;_0x2ca9ab=_0x2ca9ab||0xa8,this[_0x287c5d(0x37f)]();if(VisuMZ[_0x287c5d(0x58f)][_0x287c5d(0x550)]['UI'][_0x287c5d(0x8be)])_0x287c5d(0x2bb)!==_0x287c5d(0x8ff)?this[_0x287c5d(0x199)](_0x1c96ba[_0x287c5d(0x868)]()[_0x287c5d(0x37a)],_0x47c37b,_0x123757,_0x2ca9ab):(_0x3405ef[_0x287c5d(0x58f)][_0x287c5d(0x710)][_0x287c5d(0x212)](this),this[_0x287c5d(0x206)](this[_0x287c5d(0x1e8)]-0x1),_0x433d82[_0x287c5d(0x4df)]());else{const _0x23e956=_0x1c96ba['currentClass']()[_0x287c5d(0x37a)][_0x287c5d(0x1b5)](/\\I\[(\d+)\]/gi,'');this[_0x287c5d(0x3e6)](_0x23e956,_0x47c37b,_0x123757,_0x2ca9ab);}},Window_StatusBase['prototype'][_0x41d84b(0x117)]=function(_0x570b61,_0x3df78b,_0x281edf,_0x5883e1){const _0x537892=_0x41d84b;_0x5883e1=_0x5883e1||0x10e,this['resetTextColor']();if(VisuMZ['CoreEngine'][_0x537892(0x550)]['UI'][_0x537892(0x865)])this[_0x537892(0x199)](_0x570b61[_0x537892(0x4f4)](),_0x3df78b,_0x281edf,_0x5883e1);else{if('hTnAd'===_0x537892(0x50e)){const _0x4c65d4=_0x570b61[_0x537892(0x4f4)]()[_0x537892(0x1b5)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x570b61[_0x537892(0x4f4)](),_0x3df78b,_0x281edf,_0x5883e1);}else _0x71ab26['CoreEngine'][_0x537892(0x7e7)][_0x537892(0x212)](this,_0x1da8cc);}},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x8d0)]=Window_StatusBase['prototype'][_0x41d84b(0x57e)],Window_StatusBase[_0x41d84b(0x806)][_0x41d84b(0x57e)]=function(_0x38f688,_0x302708,_0x5d2e19){const _0xa0ebf9=_0x41d84b;if(VisuMZ['CoreEngine']['Settings'][_0xa0ebf9(0x195)]['ShowActorLevel']===![])return;if(this[_0xa0ebf9(0x582)]())this[_0xa0ebf9(0x14d)](_0x38f688,_0x302708,_0x5d2e19);VisuMZ['CoreEngine']['Window_StatusBase_drawActorLevel'][_0xa0ebf9(0x212)](this,_0x38f688,_0x302708,_0x5d2e19);},Window_StatusBase[_0x41d84b(0x806)][_0x41d84b(0x582)]=function(){const _0x171c37=_0x41d84b;return VisuMZ[_0x171c37(0x58f)][_0x171c37(0x550)]['UI']['LvExpGauge'];},Window_StatusBase['prototype'][_0x41d84b(0x14d)]=function(_0x1904b1,_0x593b28,_0x38ae91){const _0x2d7494=_0x41d84b;if(!_0x1904b1)return;if(!_0x1904b1['isActor']())return;const _0x4f956c=0x80,_0x421cdd=_0x1904b1[_0x2d7494(0x56e)]();let _0x302c21=ColorManager[_0x2d7494(0x661)](),_0x4c0dfa=ColorManager[_0x2d7494(0x47c)]();_0x421cdd>=0x1&&(_0x2d7494(0x816)!==_0x2d7494(0x816)?this[_0x2d7494(0x45a)]='':(_0x302c21=ColorManager['maxLvGaugeColor1'](),_0x4c0dfa=ColorManager[_0x2d7494(0x896)]())),this['drawGauge'](_0x593b28,_0x38ae91,_0x4f956c,_0x421cdd,_0x302c21,_0x4c0dfa);},Window_EquipStatus[_0x41d84b(0x806)][_0x41d84b(0xe2)]=function(){const _0x8536bd=_0x41d84b;let _0x681d02=0x0;for(const _0xa19dbf of VisuMZ[_0x8536bd(0x58f)][_0x8536bd(0x550)][_0x8536bd(0x195)][_0x8536bd(0x1d0)]){const _0x3d13b6=this[_0x8536bd(0x43e)](),_0x4d2444=this[_0x8536bd(0x8f2)](_0x681d02);this[_0x8536bd(0x518)](_0x3d13b6,_0x4d2444,_0xa19dbf),_0x681d02++;}},Window_EquipStatus[_0x41d84b(0x806)][_0x41d84b(0x1a0)]=function(_0x18aeca,_0x835be4,_0x110a2e){const _0x26a078=_0x41d84b,_0x1fb054=this['paramX']()-this[_0x26a078(0x43e)]()*0x2;this[_0x26a078(0x10a)](_0x18aeca,_0x835be4,_0x1fb054,_0x110a2e,![]);},Window_EquipStatus[_0x41d84b(0x806)][_0x41d84b(0x90e)]=function(_0x1ed033,_0x9a21bf,_0x10c699){const _0x102241=_0x41d84b,_0x1fb59d=this['paramWidth']();this[_0x102241(0x37f)](),this[_0x102241(0x3e6)](this[_0x102241(0x336)]['paramValueByName'](_0x10c699,!![]),_0x1ed033,_0x9a21bf,_0x1fb59d,_0x102241(0x54b));},Window_EquipStatus[_0x41d84b(0x806)]['drawRightArrow']=function(_0x522f52,_0x1bf001){const _0x3627d6=_0x41d84b,_0x47c96a=this[_0x3627d6(0x357)]();this['changeTextColor'](ColorManager['systemColor']());const _0x5c78f5=VisuMZ['CoreEngine'][_0x3627d6(0x550)]['UI'][_0x3627d6(0x48a)];this[_0x3627d6(0x3e6)](_0x5c78f5,_0x522f52,_0x1bf001,_0x47c96a,'center');},Window_EquipStatus[_0x41d84b(0x806)]['drawNewParam']=function(_0x17581a,_0x152c87,_0x2cbce3){const _0x557e0a=_0x41d84b,_0x3920ae=this[_0x557e0a(0x3c1)](),_0x38e3d7=this[_0x557e0a(0x274)][_0x557e0a(0x6c3)](_0x2cbce3),_0x56b2a2=_0x38e3d7-this[_0x557e0a(0x336)]['paramValueByName'](_0x2cbce3);this[_0x557e0a(0x431)](ColorManager[_0x557e0a(0x2b0)](_0x56b2a2)),this[_0x557e0a(0x3e6)](this['_tempActor'][_0x557e0a(0x6c3)](_0x2cbce3,!![]),_0x17581a,_0x152c87,_0x3920ae,_0x557e0a(0x54b));},VisuMZ[_0x41d84b(0x58f)]['Window_EquipItem_isEnabled']=Window_EquipItem['prototype'][_0x41d84b(0x542)],Window_EquipItem['prototype'][_0x41d84b(0x542)]=function(_0x190536){const _0x285f11=_0x41d84b;return _0x190536&&this[_0x285f11(0x336)]?this[_0x285f11(0x336)][_0x285f11(0x39e)](_0x190536):VisuMZ[_0x285f11(0x58f)][_0x285f11(0x63d)][_0x285f11(0x212)](this,_0x190536);},Window_StatusParams[_0x41d84b(0x806)][_0x41d84b(0x5ce)]=function(){const _0x12a824=_0x41d84b;return VisuMZ[_0x12a824(0x58f)][_0x12a824(0x550)][_0x12a824(0x195)][_0x12a824(0x1d0)][_0x12a824(0x669)];},Window_StatusParams[_0x41d84b(0x806)][_0x41d84b(0x518)]=function(_0x282bf0){const _0x499acd=_0x41d84b,_0x1d8a66=this[_0x499acd(0x734)](_0x282bf0),_0x177046=VisuMZ[_0x499acd(0x58f)][_0x499acd(0x550)][_0x499acd(0x195)][_0x499acd(0x1d0)][_0x282bf0],_0x57f02c=TextManager[_0x499acd(0x222)](_0x177046),_0x3f3b0c=this[_0x499acd(0x336)][_0x499acd(0x6c3)](_0x177046,!![]);this[_0x499acd(0x10a)](_0x1d8a66['x'],_0x1d8a66['y'],0xa0,_0x177046,![]),this[_0x499acd(0x37f)](),this['drawText'](_0x3f3b0c,_0x1d8a66['x']+0xa0,_0x1d8a66['y'],0x3c,'right');};if(VisuMZ['CoreEngine'][_0x41d84b(0x550)][_0x41d84b(0x59b)][_0x41d84b(0x2ad)]){VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)][_0x41d84b(0x59b)][_0x41d84b(0x310)]&&(Window_NameInput[_0x41d84b(0x38b)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x41d84b(0x558),'OK']);;VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x4f1)]=Window_NameInput[_0x41d84b(0x806)][_0x41d84b(0x3e9)],Window_NameInput[_0x41d84b(0x806)]['initialize']=function(_0x32a8bb){const _0x5ea858=_0x41d84b;this[_0x5ea858(0x1d8)]=this[_0x5ea858(0x39d)](),VisuMZ['CoreEngine'][_0x5ea858(0x4f1)][_0x5ea858(0x212)](this,_0x32a8bb),this['_mode']===_0x5ea858(0x2d5)?this[_0x5ea858(0x206)](0x0):_0x5ea858(0x8c0)===_0x5ea858(0x3f6)?this['_forcedBattleSys']=_0x5ea858(0x104):(Input[_0x5ea858(0x4df)](),this[_0x5ea858(0x228)]());},Window_NameInput['prototype'][_0x41d84b(0x39d)]=function(){const _0x44c9fa=_0x41d84b;if(Input[_0x44c9fa(0x3da)]())return _0x44c9fa(0x2d5);return VisuMZ[_0x44c9fa(0x58f)]['Settings'][_0x44c9fa(0x59b)]['DefaultMode']||'keyboard';},VisuMZ[_0x41d84b(0x58f)]['Window_NameInput_processHandling']=Window_NameInput[_0x41d84b(0x806)][_0x41d84b(0x7e2)],Window_NameInput[_0x41d84b(0x806)][_0x41d84b(0x7e2)]=function(){const _0x5a4c10=_0x41d84b;if(!this[_0x5a4c10(0x49b)]())return;if(!this[_0x5a4c10(0x3c4)])return;if(this[_0x5a4c10(0x1d8)]==='keyboard'&&Input['isGamepadTriggered']())this[_0x5a4c10(0x171)](_0x5a4c10(0x2d5));else{if(Input[_0x5a4c10(0x2f7)]('backspace'))Input[_0x5a4c10(0x4df)](),this['processBack']();else{if(Input['isTriggered'](_0x5a4c10(0x860)))Input[_0x5a4c10(0x4df)](),this[_0x5a4c10(0x1d8)]===_0x5a4c10(0x2c5)?_0x5a4c10(0x6a0)!==_0x5a4c10(0x6a0)?(_0x215dff[_0x5a4c10(0x70a)](),_0x1732c1[_0x5a4c10(0x568)](_0xb80283[_0x5a4c10(0x584)]),_0x4b3dfb[_0x5a4c10(0x584)]=_0x228452):this['switchModes'](_0x5a4c10(0x2d5)):_0x5a4c10(0x202)===_0x5a4c10(0x2ae)?_0x46db3a+=_0x5a4c10(0x15e):this[_0x5a4c10(0x171)](_0x5a4c10(0x2c5));else{if(this[_0x5a4c10(0x1d8)]==='keyboard'){if(_0x5a4c10(0x7dc)===_0x5a4c10(0xf0))return-0.5*(_0x333cf5[_0x5a4c10(0x559)](0x2,0xa*_0x3dcbd1)*_0x2654a2[_0x5a4c10(0xff)]((_0x56fe06-_0x4c06d2)*(0x2*_0x279303['PI'])/_0x5b5f9d));else this[_0x5a4c10(0x318)]();}else Input[_0x5a4c10(0x2f7)](_0x5a4c10(0x183))?(Input[_0x5a4c10(0x4df)](),this[_0x5a4c10(0x171)](_0x5a4c10(0x2c5))):_0x5a4c10(0x100)!=='jmSOK'?VisuMZ[_0x5a4c10(0x58f)][_0x5a4c10(0x711)][_0x5a4c10(0x212)](this):this[_0x5a4c10(0x789)](_0xaa7f4['isTriggered'](_0x5a4c10(0x6d6)));}}}},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x432)]=Window_NameInput['prototype'][_0x41d84b(0x7b9)],Window_NameInput[_0x41d84b(0x806)][_0x41d84b(0x7b9)]=function(){const _0x4914f2=_0x41d84b;if(!this[_0x4914f2(0x818)]())return;if(this[_0x4914f2(0x1d8)]===_0x4914f2(0x2c5)){if(_0x4914f2(0x70b)==='KhniV'){if(TouchInput[_0x4914f2(0x439)]()&&this[_0x4914f2(0x19e)]()){if(_0x4914f2(0x72d)!==_0x4914f2(0x8d6))this[_0x4914f2(0x171)]('default');else for(const _0xe1093d of _0x29233e){this[_0x4914f2(0x644)]([_0xe1093d],_0x349717,_0x36716f,_0x1fcb86,_0x53c9e4),_0x5bec03+=_0x54edfb;}}else TouchInput['isCancelled']()&&this[_0x4914f2(0x171)](_0x4914f2(0x2d5));}else this[_0x4914f2(0x577)](_0xb612c3);}else{if(_0x4914f2(0x55a)!==_0x4914f2(0x55a)){let _0x5a5aa0=_0x5ab633[_0x4914f2(0x58f)][_0x4914f2(0x257)][_0x4914f2(0x212)](this,_0x3f35c9);return _0x5a5aa0['x']=_0x44f3df[_0x4914f2(0x7f6)](_0x5a5aa0['x']),_0x5a5aa0['y']=_0x25f75e['round'](_0x5a5aa0['y']),_0x5a5aa0[_0x4914f2(0x3a6)]=_0x27edbb[_0x4914f2(0x7f6)](_0x5a5aa0['width']),_0x5a5aa0[_0x4914f2(0x536)]=_0x2437c9[_0x4914f2(0x7f6)](_0x5a5aa0[_0x4914f2(0x536)]),_0x5a5aa0;}else VisuMZ[_0x4914f2(0x58f)][_0x4914f2(0x432)][_0x4914f2(0x212)](this);}},Window_NameInput['prototype'][_0x41d84b(0x318)]=function(){const _0x84c21d=_0x41d84b;if(Input[_0x84c21d(0x2f7)]('enter'))Input[_0x84c21d(0x4df)](),this[_0x84c21d(0x154)]();else{if(Input[_0x84c21d(0x798)]!==undefined){let _0x3b68b8=Input[_0x84c21d(0x798)],_0x36db54=_0x3b68b8[_0x84c21d(0x669)];for(let _0x4567bc=0x0;_0x4567bc<_0x36db54;++_0x4567bc){this[_0x84c21d(0x3b0)]['add'](_0x3b68b8[_0x4567bc])?SoundManager[_0x84c21d(0x60e)]():_0x84c21d(0x6b6)!=='obUGL'?SoundManager[_0x84c21d(0x392)]():this['_slotWindow'][_0x84c21d(0x325)](_0x416ebe['layoutSettings'][_0x84c21d(0x82b)]);}Input[_0x84c21d(0x4df)]();}}},Window_NameInput[_0x41d84b(0x806)]['switchModes']=function(_0x346ae4){const _0x34a18b=_0x41d84b;let _0x5dc0f5=this[_0x34a18b(0x1d8)];this[_0x34a18b(0x1d8)]=_0x346ae4;if(_0x5dc0f5!==this[_0x34a18b(0x1d8)]){this[_0x34a18b(0x427)](),SoundManager[_0x34a18b(0x60e)]();if(this[_0x34a18b(0x1d8)]===_0x34a18b(0x2d5))this[_0x34a18b(0x206)](0x0);else{if(_0x34a18b(0x7c0)!==_0x34a18b(0x8ca))this[_0x34a18b(0x206)](-0x1);else{const _0x4d1cd3=_0x10a7e5['CoreEngine']['Settings'][_0x34a18b(0xf8)];for(const _0x4ec429 of _0x4d1cd3){const _0x1fd349=_0x4ec429['FunctionName'][_0x34a18b(0x1b5)](/[ ]/g,''),_0x585f03=_0x4ec429['CodeJS'];_0x40e139[_0x34a18b(0x58f)][_0x34a18b(0xe7)](_0x1fd349,_0x585f03);}}}}},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x509)]=Window_NameInput[_0x41d84b(0x806)]['cursorDown'],Window_NameInput['prototype'][_0x41d84b(0x335)]=function(_0x3d571e){const _0x10d71a=_0x41d84b;if(this['_mode']===_0x10d71a(0x2c5)&&!Input[_0x10d71a(0x8ce)]())return;if(Input[_0x10d71a(0x64c)]())return;VisuMZ['CoreEngine'][_0x10d71a(0x509)][_0x10d71a(0x212)](this,_0x3d571e),this[_0x10d71a(0x171)](_0x10d71a(0x2d5));},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x3ed)]=Window_NameInput[_0x41d84b(0x806)][_0x41d84b(0x4bb)],Window_NameInput[_0x41d84b(0x806)][_0x41d84b(0x4bb)]=function(_0x47315e){const _0x504814=_0x41d84b;if(this[_0x504814(0x1d8)]===_0x504814(0x2c5)&&!Input[_0x504814(0x8ce)]())return;if(Input[_0x504814(0x64c)]())return;VisuMZ[_0x504814(0x58f)][_0x504814(0x3ed)]['call'](this,_0x47315e),this[_0x504814(0x171)](_0x504814(0x2d5));},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x7b2)]=Window_NameInput['prototype'][_0x41d84b(0x53d)],Window_NameInput[_0x41d84b(0x806)][_0x41d84b(0x53d)]=function(_0x2b9e6f){const _0x1ea264=_0x41d84b;if(this[_0x1ea264(0x1d8)]===_0x1ea264(0x2c5)&&!Input[_0x1ea264(0x8ce)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x1ea264(0x58f)]['Window_NameInput_cursorRight']['call'](this,_0x2b9e6f),this['switchModes'](_0x1ea264(0x2d5));},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x819)]=Window_NameInput[_0x41d84b(0x806)][_0x41d84b(0x789)],Window_NameInput[_0x41d84b(0x806)]['cursorLeft']=function(_0x39cb8b){const _0x2e67bc=_0x41d84b;if(this[_0x2e67bc(0x1d8)]===_0x2e67bc(0x2c5)&&!Input[_0x2e67bc(0x8ce)]())return;if(Input[_0x2e67bc(0x64c)]())return;VisuMZ[_0x2e67bc(0x58f)][_0x2e67bc(0x819)]['call'](this,_0x39cb8b),this[_0x2e67bc(0x171)](_0x2e67bc(0x2d5));},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x16f)]=Window_NameInput['prototype'][_0x41d84b(0x608)],Window_NameInput[_0x41d84b(0x806)][_0x41d84b(0x608)]=function(){const _0x3d975b=_0x41d84b;if(this[_0x3d975b(0x1d8)]===_0x3d975b(0x2c5))return;if(Input[_0x3d975b(0x64c)]())return;VisuMZ[_0x3d975b(0x58f)][_0x3d975b(0x16f)][_0x3d975b(0x212)](this),this['switchModes']('default');},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x569)]=Window_NameInput[_0x41d84b(0x806)][_0x41d84b(0x8cf)],Window_NameInput[_0x41d84b(0x806)][_0x41d84b(0x8cf)]=function(){const _0x3c870a=_0x41d84b;if(this[_0x3c870a(0x1d8)]===_0x3c870a(0x2c5))return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0x3c870a(0x569)][_0x3c870a(0x212)](this),this[_0x3c870a(0x171)](_0x3c870a(0x2d5));},VisuMZ['CoreEngine']['Window_NameInput_refresh']=Window_NameInput['prototype']['refresh'],Window_NameInput[_0x41d84b(0x806)][_0x41d84b(0x427)]=function(){const _0x18e8f7=_0x41d84b;if(this[_0x18e8f7(0x1d8)]==='keyboard'){if(_0x18e8f7(0x8ec)===_0x18e8f7(0x8ec)){this[_0x18e8f7(0x254)][_0x18e8f7(0x4df)](),this['contentsBack']['clear'](),this[_0x18e8f7(0x37f)]();let _0x36d370=VisuMZ['CoreEngine'][_0x18e8f7(0x550)][_0x18e8f7(0x59b)][_0x18e8f7(0x282)]['split']('\x0a'),_0x5312d6=_0x36d370[_0x18e8f7(0x669)],_0x456496=(this[_0x18e8f7(0x2a2)]-_0x5312d6*this[_0x18e8f7(0x115)]())/0x2;for(let _0x5aa318=0x0;_0x5aa318<_0x5312d6;++_0x5aa318){let _0x24c22d=_0x36d370[_0x5aa318],_0x1074ce=this[_0x18e8f7(0x64d)](_0x24c22d)[_0x18e8f7(0x3a6)],_0x1aeceb=Math['floor']((this['contents'][_0x18e8f7(0x3a6)]-_0x1074ce)/0x2);this[_0x18e8f7(0x199)](_0x24c22d,_0x1aeceb,_0x456496),_0x456496+=this[_0x18e8f7(0x115)]();}}else this[_0x18e8f7(0x335)](_0x172f2e['isTriggered'](_0x18e8f7(0x211)));}else VisuMZ[_0x18e8f7(0x58f)][_0x18e8f7(0x266)][_0x18e8f7(0x212)](this);};};VisuMZ[_0x41d84b(0x58f)]['Window_ShopSell_isEnabled']=Window_ShopSell[_0x41d84b(0x806)][_0x41d84b(0x542)],Window_ShopSell['prototype'][_0x41d84b(0x542)]=function(_0x4e3646){const _0xa84566=_0x41d84b;if(VisuMZ[_0xa84566(0x58f)][_0xa84566(0x550)][_0xa84566(0x1bb)][_0xa84566(0x803)]&&DataManager[_0xa84566(0x352)](_0x4e3646)){if('shzdd'!=='shzdd')this['_inputWindow'][_0xa84566(0x325)](_0x29171f[_0xa84566(0x540)][_0xa84566(0x203)]);else return![];}else{if(_0xa84566(0x2d3)==='KPBBg')_0x29b0d2[_0xa84566(0x58f)]['Sprite_Picture_loadBitmap']['call'](this);else return VisuMZ[_0xa84566(0x58f)]['Window_ShopSell_isEnabled'][_0xa84566(0x212)](this,_0x4e3646);}},Window_NumberInput[_0x41d84b(0x806)]['isUseModernControls']=function(){return![];};VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)][_0x41d84b(0x59b)]['EnableNumberInput']&&(VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x710)]=Window_NumberInput[_0x41d84b(0x806)][_0x41d84b(0x329)],Window_NumberInput[_0x41d84b(0x806)][_0x41d84b(0x329)]=function(){const _0x480404=_0x41d84b;VisuMZ[_0x480404(0x58f)][_0x480404(0x710)][_0x480404(0x212)](this),this['select'](this['_maxDigits']-0x1),Input[_0x480404(0x4df)]();},VisuMZ[_0x41d84b(0x58f)]['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x41d84b(0x806)][_0x41d84b(0x494)],Window_NumberInput[_0x41d84b(0x806)][_0x41d84b(0x494)]=function(){const _0x45fbf8=_0x41d84b;if(!this[_0x45fbf8(0x818)]())return;if(Input['isNumpadPressed']())this['processKeyboardDigitChange']();else{if(Input[_0x45fbf8(0x2f7)](_0x45fbf8(0x2bf)))this[_0x45fbf8(0x654)]();else{if(Input['_inputSpecialKeyCode']===0x2e)this[_0x45fbf8(0x7fb)]();else{if(Input[_0x45fbf8(0x44a)]===0x24)'ntGpz'===_0x45fbf8(0xe1)?this[_0x45fbf8(0x651)]():this['switchModes']('default');else Input[_0x45fbf8(0x44a)]===0x23?this[_0x45fbf8(0x83d)]():VisuMZ['CoreEngine'][_0x45fbf8(0x21a)][_0x45fbf8(0x212)](this);}}}},Window_NumberInput[_0x41d84b(0x806)]['processCursorMove']=function(){const _0xdfb415=_0x41d84b;if(!this[_0xdfb415(0x2c6)]())return;if(Input[_0xdfb415(0x64c)]()){if(_0xdfb415(0x8e7)!==_0xdfb415(0x21b))this[_0xdfb415(0x1f0)]();else return _0x46797e=_0x48b973(_0x56dbe4),this['_colorCache']=this[_0xdfb415(0x3d7)]||{},_0x469a3f[_0xdfb415(0x5a2)](/#(.*)/i)?this['_colorCache'][_0x3b2423]='#%1'[_0xdfb415(0x125)](_0xae70ae(_0x522336['$1'])):this[_0xdfb415(0x3d7)][_0x1961c5]=this[_0xdfb415(0x74a)](_0xffd404(_0x58513c)),this[_0xdfb415(0x3d7)][_0x116649];}else Window_Selectable[_0xdfb415(0x806)]['processCursorMove'][_0xdfb415(0x212)](this);},Window_NumberInput[_0x41d84b(0x806)][_0x41d84b(0x7da)]=function(){},Window_NumberInput[_0x41d84b(0x806)]['processKeyboardDigitChange']=function(){const _0x5877f6=_0x41d84b;if(String(this[_0x5877f6(0x42d)])[_0x5877f6(0x669)]>=this[_0x5877f6(0x1e8)])return;const _0x100efe=Number(String(this[_0x5877f6(0x42d)])+Input[_0x5877f6(0x798)]);if(isNaN(_0x100efe))return;this[_0x5877f6(0x42d)]=_0x100efe;const _0x438af5='9'[_0x5877f6(0x76d)](this[_0x5877f6(0x1e8)]);this[_0x5877f6(0x42d)]=this['_number'][_0x5877f6(0x587)](0x0,_0x438af5),Input['clear'](),this[_0x5877f6(0x427)](),SoundManager['playCursor'](),this[_0x5877f6(0x206)](this[_0x5877f6(0x1e8)]-0x1);},Window_NumberInput[_0x41d84b(0x806)][_0x41d84b(0x654)]=function(){const _0x560637=_0x41d84b;this[_0x560637(0x42d)]=Number(String(this[_0x560637(0x42d)])['slice'](0x0,-0x1)),this[_0x560637(0x42d)]=Math[_0x560637(0x81e)](0x0,this[_0x560637(0x42d)]),Input['clear'](),this['refresh'](),SoundManager[_0x560637(0x591)](),this[_0x560637(0x206)](this['_maxDigits']-0x1);},Window_NumberInput['prototype'][_0x41d84b(0x7fb)]=function(){const _0x4ea9bf=_0x41d84b;this['_number']=Number(String(this[_0x4ea9bf(0x42d)])[_0x4ea9bf(0x197)](0x1)),this[_0x4ea9bf(0x42d)]=Math[_0x4ea9bf(0x81e)](0x0,this[_0x4ea9bf(0x42d)]),Input['clear'](),this[_0x4ea9bf(0x427)](),SoundManager[_0x4ea9bf(0x591)](),this[_0x4ea9bf(0x206)](this['_maxDigits']-0x1);},Window_NumberInput['prototype'][_0x41d84b(0x651)]=function(){const _0x2e76cf=_0x41d84b;if(this[_0x2e76cf(0x143)]()===0x0)return;Input[_0x2e76cf(0x4df)](),this[_0x2e76cf(0x427)](),SoundManager[_0x2e76cf(0x591)](),this[_0x2e76cf(0x206)](0x0);},Window_NumberInput[_0x41d84b(0x806)][_0x41d84b(0x83d)]=function(){const _0x533b57=_0x41d84b;if(this[_0x533b57(0x143)]()===this['_maxDigits']-0x1)return;Input[_0x533b57(0x4df)](),this[_0x533b57(0x427)](),SoundManager['playCursor'](),this[_0x533b57(0x206)](this[_0x533b57(0x1e8)]-0x1);});;VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x3ef)]=Window_MapName['prototype'][_0x41d84b(0x427)],Window_MapName[_0x41d84b(0x806)][_0x41d84b(0x427)]=function(){const _0x2ba8fb=_0x41d84b;VisuMZ['CoreEngine'][_0x2ba8fb(0x550)][_0x2ba8fb(0x1bb)][_0x2ba8fb(0x530)]?this[_0x2ba8fb(0x372)]():VisuMZ['CoreEngine'][_0x2ba8fb(0x3ef)][_0x2ba8fb(0x212)](this);},Window_MapName['prototype']['refreshWithTextCodeSupport']=function(){const _0xa1eac5=_0x41d84b;this[_0xa1eac5(0x254)]['clear']();if($gameMap['displayName']()){if(_0xa1eac5(0x532)===_0xa1eac5(0x406)){const _0x5cac64=_0x151be7[_0xa1eac5(0x394)],_0x3ebcc2=_0x5892a4['ParamName'],_0x3b5546=_0x2c688d[_0xa1eac5(0x4ce)],_0x286cd=_0x4a1b8f[_0xa1eac5(0x704)],_0x5b4f74=new _0x257fe9(_0x508959[_0xa1eac5(0x23b)]);_0x45b5a5[_0xa1eac5(0x58f)]['CustomParamNames'][_0x5cac64['toUpperCase']()['trim']()]=_0x3ebcc2,_0x17bed6[_0xa1eac5(0x58f)]['CustomParamIcons'][_0x5cac64['toUpperCase']()['trim']()]=_0x3b5546,_0x5dd476[_0xa1eac5(0x58f)][_0xa1eac5(0x2fe)][_0x5cac64[_0xa1eac5(0x2c0)]()[_0xa1eac5(0x242)]()]=_0x286cd,_0x117448['CoreEngine'][_0xa1eac5(0x7ea)][_0x5cac64[_0xa1eac5(0x2c0)]()[_0xa1eac5(0x242)]()]=_0x5cac64,_0x32066a['defineProperty'](_0x1e2faf[_0xa1eac5(0x806)],_0x5cac64,{'get'(){const _0x507d2a=_0xa1eac5,_0x402b63=_0x5b4f74['call'](this);return _0x286cd===_0x507d2a(0x39c)?_0x335368['round'](_0x402b63):_0x402b63;}});}else{const _0x3e9ec7=this[_0xa1eac5(0x446)];this[_0xa1eac5(0x6b5)](0x0,0x0,_0x3e9ec7,this['lineHeight']());const _0x5007e4=this[_0xa1eac5(0x64d)]($gameMap['displayName']())[_0xa1eac5(0x3a6)];this[_0xa1eac5(0x199)]($gameMap[_0xa1eac5(0x7d5)](),Math[_0xa1eac5(0x5d1)]((_0x3e9ec7-_0x5007e4)/0x2),0x0);}}},Window_TitleCommand[_0x41d84b(0x328)]=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)][_0x41d84b(0x85f)],Window_TitleCommand[_0x41d84b(0x806)]['makeCommandList']=function(){const _0x55bee5=_0x41d84b;this[_0x55bee5(0x4f5)]();},Window_TitleCommand[_0x41d84b(0x806)][_0x41d84b(0x4f5)]=function(){const _0x4bc50a=_0x41d84b;for(const _0x206df0 of Window_TitleCommand[_0x4bc50a(0x328)]){if(_0x206df0[_0x4bc50a(0x79d)][_0x4bc50a(0x212)](this)){if(_0x4bc50a(0x553)==='nhhgn')return _0x2702fd[_0x4bc50a(0x540)][_0x4bc50a(0x758)][_0x4bc50a(0x212)](this);else{const _0x4edb6e=_0x206df0[_0x4bc50a(0x3a1)];let _0x40834d=_0x206df0['TextStr'];if(['',_0x4bc50a(0x5fa)][_0x4bc50a(0x4c8)](_0x40834d))_0x40834d=_0x206df0['TextJS']['call'](this);const _0x130131=_0x206df0['EnableJS'][_0x4bc50a(0x212)](this),_0x2ea32f=_0x206df0['ExtJS'][_0x4bc50a(0x212)](this);this[_0x4bc50a(0x5e6)](_0x40834d,_0x4edb6e,_0x130131,_0x2ea32f),this[_0x4bc50a(0x589)](_0x4edb6e,_0x206df0[_0x4bc50a(0x19f)]['bind'](this,_0x2ea32f));}}}},Window_GameEnd[_0x41d84b(0x328)]=VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x550)][_0x41d84b(0x557)]['GameEnd']['CommandList'],Window_GameEnd[_0x41d84b(0x806)]['makeCommandList']=function(){const _0x49025d=_0x41d84b;this[_0x49025d(0x4f5)]();},Window_GameEnd[_0x41d84b(0x806)][_0x41d84b(0x4f5)]=function(){const _0x3b988e=_0x41d84b;for(const _0x22bdd4 of Window_GameEnd[_0x3b988e(0x328)]){if('tTycC'!==_0x3b988e(0x374))return _0x3cb1c3['CoreEngine']['TextManager_param']['call'](this,_0x43a66f);else{if(_0x22bdd4[_0x3b988e(0x79d)][_0x3b988e(0x212)](this)){const _0x9194a3=_0x22bdd4[_0x3b988e(0x3a1)];let _0x286e0d=_0x22bdd4['TextStr'];if(['',_0x3b988e(0x5fa)][_0x3b988e(0x4c8)](_0x286e0d))_0x286e0d=_0x22bdd4[_0x3b988e(0x823)][_0x3b988e(0x212)](this);const _0x2984fc=_0x22bdd4[_0x3b988e(0x262)][_0x3b988e(0x212)](this),_0x120445=_0x22bdd4[_0x3b988e(0x648)][_0x3b988e(0x212)](this);this[_0x3b988e(0x5e6)](_0x286e0d,_0x9194a3,_0x2984fc,_0x120445),this[_0x3b988e(0x589)](_0x9194a3,_0x22bdd4[_0x3b988e(0x19f)]['bind'](this,_0x120445));}}}};function Window_ButtonAssist(){const _0x3587c5=_0x41d84b;this[_0x3587c5(0x3e9)](...arguments);}Window_ButtonAssist['prototype']=Object['create'](Window_Base[_0x41d84b(0x806)]),Window_ButtonAssist['prototype']['constructor']=Window_ButtonAssist,Window_ButtonAssist[_0x41d84b(0x806)][_0x41d84b(0x3e9)]=function(_0x599557){const _0x78140b=_0x41d84b;this[_0x78140b(0x75a)]={},Window_Base[_0x78140b(0x806)][_0x78140b(0x3e9)][_0x78140b(0x212)](this,_0x599557),this[_0x78140b(0x325)](VisuMZ[_0x78140b(0x58f)]['Settings'][_0x78140b(0x451)][_0x78140b(0x578)]||0x0),this['refresh']();},Window_ButtonAssist[_0x41d84b(0x806)][_0x41d84b(0x46d)]=function(){const _0x2ca714=_0x41d84b;this[_0x2ca714(0x254)]['fontSize']<=0x60&&(this[_0x2ca714(0x254)][_0x2ca714(0x485)]+=0x6);},Window_ButtonAssist['prototype'][_0x41d84b(0x7e5)]=function(){const _0x3e86ea=_0x41d84b;this[_0x3e86ea(0x254)][_0x3e86ea(0x485)]>=0x18&&(this[_0x3e86ea(0x254)][_0x3e86ea(0x485)]-=0x6);},Window_ButtonAssist[_0x41d84b(0x806)][_0x41d84b(0x75c)]=function(){const _0xeb9884=_0x41d84b;Window_Base['prototype'][_0xeb9884(0x75c)]['call'](this),this[_0xeb9884(0x632)]();},Window_ButtonAssist[_0x41d84b(0x806)][_0x41d84b(0x1b7)]=function(){const _0x2d8b4a=_0x41d84b;this[_0x2d8b4a(0x747)]=SceneManager['_scene']['getButtonAssistLocation']()!==_0x2d8b4a(0x52c)?0x0:0x8;},Window_ButtonAssist[_0x41d84b(0x806)]['updateKeyText']=function(){const _0x3bfd83=_0x41d84b,_0x315c1b=SceneManager['_scene'];for(let _0x4babd0=0x1;_0x4babd0<=0x5;_0x4babd0++){if(_0x3bfd83(0x4f2)!=='WfVgP'){if(this[_0x3bfd83(0x75a)][_0x3bfd83(0x7fa)[_0x3bfd83(0x125)](_0x4babd0)]!==_0x315c1b['buttonAssistKey%1'[_0x3bfd83(0x125)](_0x4babd0)]()){if(_0x3bfd83(0x592)!==_0x3bfd83(0x65c))return this[_0x3bfd83(0x427)]();else _0x4f1e11['se'][_0x3bfd83(0x6ac)]=0x0;}if(this[_0x3bfd83(0x75a)][_0x3bfd83(0x820)[_0x3bfd83(0x125)](_0x4babd0)]!==_0x315c1b[_0x3bfd83(0x2ce)['format'](_0x4babd0)]()){if('VQayn'==='voOxl')(_0x8d5bd5>=_0x121c22||_0x31536b&&_0x20c249===0x1)&&this[_0x3bfd83(0x779)]((_0xd4dcaf-_0x3ab2ed+_0x5cf0e6)%_0x384cd1);else return this[_0x3bfd83(0x427)]();}}else return!![];}},Window_ButtonAssist[_0x41d84b(0x806)][_0x41d84b(0x427)]=function(){const _0x35a1e3=_0x41d84b;this['contents'][_0x35a1e3(0x4df)]();for(let _0x2e7c90=0x1;_0x2e7c90<=0x5;_0x2e7c90++){this[_0x35a1e3(0x387)](_0x2e7c90);}},Window_ButtonAssist[_0x41d84b(0x806)][_0x41d84b(0x387)]=function(_0x5e65c7){const _0x27e77d=_0x41d84b,_0x496596=this[_0x27e77d(0x446)]/0x5,_0x279aef=SceneManager[_0x27e77d(0x512)],_0x576e26=_0x279aef[_0x27e77d(0x2e0)[_0x27e77d(0x125)](_0x5e65c7)](),_0x39cdb0=_0x279aef[_0x27e77d(0x2ce)[_0x27e77d(0x125)](_0x5e65c7)]();this[_0x27e77d(0x75a)][_0x27e77d(0x7fa)[_0x27e77d(0x125)](_0x5e65c7)]=_0x576e26,this['_data'][_0x27e77d(0x820)['format'](_0x5e65c7)]=_0x39cdb0;if(_0x576e26==='')return;if(_0x39cdb0==='')return;const _0x362a15=_0x279aef[_0x27e77d(0x7d3)[_0x27e77d(0x125)](_0x5e65c7)](),_0x581739=this[_0x27e77d(0x43e)](),_0x174dd6=_0x496596*(_0x5e65c7-0x1)+_0x581739+_0x362a15,_0x1864e8=VisuMZ[_0x27e77d(0x58f)][_0x27e77d(0x550)][_0x27e77d(0x451)]['TextFmt'];this[_0x27e77d(0x199)](_0x1864e8[_0x27e77d(0x125)](_0x576e26,_0x39cdb0),_0x174dd6,0x0,_0x496596-_0x581739*0x2);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x5fe)]=Game_Interpreter['prototype'][_0x41d84b(0x62b)],Game_Interpreter['prototype'][_0x41d84b(0x62b)]=function(){const _0x3e0ea7=_0x41d84b;if($gameTemp[_0x3e0ea7(0x69e)]!==undefined)return VisuMZ[_0x3e0ea7(0x58f)][_0x3e0ea7(0x411)]();return VisuMZ['CoreEngine'][_0x3e0ea7(0x5fe)]['call'](this);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x411)]=function(){const _0x381209=_0x41d84b,_0x50ca86=$gameTemp[_0x381209(0x69e)]||0x0;(_0x50ca86<0x0||_0x50ca86>0x64||TouchInput['isCancelled']()||Input[_0x381209(0x439)](_0x381209(0x658)))&&(_0x381209(0x739)!=='OiVTF'?this[_0x381209(0x1b0)]='CTB':($gameTemp[_0x381209(0x69e)]=undefined,Input[_0x381209(0x4df)](),TouchInput[_0x381209(0x4df)]()));const _0x27203b=$gameScreen[_0x381209(0x73c)](_0x50ca86);return _0x27203b&&(_0x27203b['_x']=TouchInput['_x'],_0x27203b['_y']=TouchInput['_y']),VisuMZ[_0x381209(0x58f)][_0x381209(0x393)](),$gameTemp[_0x381209(0x69e)]!==undefined;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x393)]=function(){const _0x384518=_0x41d84b,_0x431fcd=SceneManager[_0x384518(0x512)];if(!_0x431fcd)return;!_0x431fcd[_0x384518(0x584)]&&(_0x384518(0xf9)===_0x384518(0x8fc)?(this[_0x384518(0x856)]['x']=-0x1*(this['_pageupButton'][_0x384518(0x3a6)]+this[_0x384518(0x570)]['width']+0x8),this[_0x384518(0x570)]['x']=-0x1*(this['_pagedownButton']['width']+0x4)):(SoundManager[_0x384518(0x832)](),_0x431fcd[_0x384518(0x584)]=new Window_PictureCoordinates(),_0x431fcd[_0x384518(0x41b)](_0x431fcd['_pictureCoordinatesWindow'])));if($gameTemp['_pictureCoordinatesMode']===undefined){if(_0x384518(0x119)==='vlNHZ'){try{_0x2d1dd9(_0x5c61f0);}catch(_0x53944f){_0x5f4e90[_0x384518(0x190)]()&&(_0x59b4fa[_0x384518(0x5a6)](_0x384518(0x151)),_0x4a02e2[_0x384518(0x5a6)](_0x53944f));}return!![];}else SoundManager[_0x384518(0x70a)](),_0x431fcd[_0x384518(0x568)](_0x431fcd['_pictureCoordinatesWindow']),_0x431fcd[_0x384518(0x584)]=undefined;}};function Window_PictureCoordinates(){const _0x14ca90=_0x41d84b;this[_0x14ca90(0x3e9)](...arguments);}Window_PictureCoordinates[_0x41d84b(0x806)]=Object[_0x41d84b(0x397)](Window_Base[_0x41d84b(0x806)]),Window_PictureCoordinates['prototype']['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x41d84b(0x806)]['initialize']=function(){const _0x10b182=_0x41d84b;this[_0x10b182(0x8dd)]=_0x10b182(0x6b3),this[_0x10b182(0x804)]='nah',this['_lastY']=_0x10b182(0x6b3);const _0x30f809=this[_0x10b182(0x1dd)]();Window_Base[_0x10b182(0x806)][_0x10b182(0x3e9)][_0x10b182(0x212)](this,_0x30f809),this[_0x10b182(0x325)](0x2);},Window_PictureCoordinates[_0x41d84b(0x806)][_0x41d84b(0x1dd)]=function(){const _0x1514ff=_0x41d84b;let _0x44a154=0x0,_0x478982=Graphics['height']-this[_0x1514ff(0x115)](),_0x2af9ac=Graphics['width'],_0x2e1828=this[_0x1514ff(0x115)]();return new Rectangle(_0x44a154,_0x478982,_0x2af9ac,_0x2e1828);},Window_PictureCoordinates[_0x41d84b(0x806)][_0x41d84b(0x1b7)]=function(){this['padding']=0x0;},Window_PictureCoordinates['prototype'][_0x41d84b(0x75c)]=function(){const _0x2e3e94=_0x41d84b;Window_Base[_0x2e3e94(0x806)][_0x2e3e94(0x75c)][_0x2e3e94(0x212)](this),this['updateData']();},Window_PictureCoordinates[_0x41d84b(0x806)]['updateData']=function(){const _0x51f37c=_0x41d84b;if(!this[_0x51f37c(0x69b)]())return;this[_0x51f37c(0x427)]();},Window_PictureCoordinates[_0x41d84b(0x806)][_0x41d84b(0x69b)]=function(){const _0x15f23f=_0x41d84b,_0x169d41=$gameTemp['_pictureCoordinatesMode'],_0x3c5d3c=$gameScreen[_0x15f23f(0x73c)](_0x169d41);if(_0x3c5d3c){if(_0x15f23f(0x23c)===_0x15f23f(0x23c))return this[_0x15f23f(0x8dd)]!==_0x3c5d3c['_origin']||this[_0x15f23f(0x804)]!==_0x3c5d3c['_x']||this[_0x15f23f(0x281)]!==_0x3c5d3c['_y'];else this[_0x15f23f(0x76a)]['y']=_0x4516d9['boxHeight']-this['buttonAreaHeight']();}else{if(_0x15f23f(0x88c)===_0x15f23f(0x68f)){const _0x3d4555=_0x49d2f1[_0x15f23f(0x5a8)]?(_0x4ce886[_0x15f23f(0x806)]['blockWidth']()+0x6)*0x2:0x0,_0x552c04=this[_0x15f23f(0xe6)](),_0x3bd022=_0x3c31e4['boxWidth']-_0x3d4555*0x2,_0x8e655c=this[_0x15f23f(0x83f)]();return new _0x9405f1(_0x3d4555,_0x552c04,_0x3bd022,_0x8e655c);}else return![];}},Window_PictureCoordinates['prototype'][_0x41d84b(0x427)]=function(){const _0x25cb9b=_0x41d84b;this['contents']['clear']();const _0x26cb5f=$gameTemp['_pictureCoordinatesMode'],_0x23832e=$gameScreen['picture'](_0x26cb5f);if(!_0x23832e)return;this[_0x25cb9b(0x8dd)]=_0x23832e[_0x25cb9b(0x3b3)],this['_lastX']=_0x23832e['_x'],this['_lastY']=_0x23832e['_y'];const _0x3dcd72=ColorManager[_0x25cb9b(0x292)]();this[_0x25cb9b(0x254)][_0x25cb9b(0x286)](0x0,0x0,this[_0x25cb9b(0x446)],this['innerHeight'],_0x3dcd72);const _0x2ae645=_0x25cb9b(0x52f)[_0x25cb9b(0x125)](_0x23832e[_0x25cb9b(0x3b3)]===0x0?'Upper\x20Left':_0x25cb9b(0x371)),_0x3ce6fb=_0x25cb9b(0x434)[_0x25cb9b(0x125)](_0x23832e['_x']),_0xa3fadc=_0x25cb9b(0x5d4)['format'](_0x23832e['_y']),_0x4a0be3=_0x25cb9b(0x6cf)[_0x25cb9b(0x125)](TextManager['getInputButtonString'](_0x25cb9b(0x658)));let _0x590c38=Math[_0x25cb9b(0x5d1)](this[_0x25cb9b(0x446)]/0x4);this[_0x25cb9b(0x3e6)](_0x2ae645,_0x590c38*0x0,0x0,_0x590c38),this[_0x25cb9b(0x3e6)](_0x3ce6fb,_0x590c38*0x1,0x0,_0x590c38,_0x25cb9b(0x43c)),this['drawText'](_0xa3fadc,_0x590c38*0x2,0x0,_0x590c38,_0x25cb9b(0x43c));const _0xeecc87=this[_0x25cb9b(0x64d)](_0x4a0be3)['width'],_0x4440cd=this[_0x25cb9b(0x446)]-_0xeecc87;this[_0x25cb9b(0x199)](_0x4a0be3,_0x4440cd,0x0,_0xeecc87);},VisuMZ[_0x41d84b(0x5b9)]=function(_0x2d08df){const _0xbca810=_0x41d84b;if(Utils[_0xbca810(0x503)](_0xbca810(0x867))){var _0x4f6b31=require('nw.gui')[_0xbca810(0x17f)][_0xbca810(0x150)]();SceneManager['showDevTools']();if(_0x2d08df)setTimeout(_0x4f6b31[_0xbca810(0x297)]['bind'](_0x4f6b31),0x190);}},VisuMZ['ApplyEasing']=function(_0x354491,_0x3d72c5){const _0x5f5cb3=_0x41d84b;_0x3d72c5=_0x3d72c5[_0x5f5cb3(0x2c0)]();var _0x50263b=1.70158,_0x42d0d4=0.7;switch(_0x3d72c5){case _0x5f5cb3(0x56a):return _0x354491;case'INSINE':return-0x1*Math['cos'](_0x354491*(Math['PI']/0x2))+0x1;case _0x5f5cb3(0xdb):return Math[_0x5f5cb3(0xff)](_0x354491*(Math['PI']/0x2));case'INOUTSINE':return-0.5*(Math[_0x5f5cb3(0x3e0)](Math['PI']*_0x354491)-0x1);case _0x5f5cb3(0x678):return _0x354491*_0x354491;case _0x5f5cb3(0x73a):return _0x354491*(0x2-_0x354491);case'INOUTQUAD':return _0x354491<0.5?0x2*_0x354491*_0x354491:-0x1+(0x4-0x2*_0x354491)*_0x354491;case _0x5f5cb3(0x3c7):return _0x354491*_0x354491*_0x354491;case _0x5f5cb3(0xf3):var _0xb4e771=_0x354491-0x1;return _0xb4e771*_0xb4e771*_0xb4e771+0x1;case _0x5f5cb3(0x64b):return _0x354491<0.5?0x4*_0x354491*_0x354491*_0x354491:(_0x354491-0x1)*(0x2*_0x354491-0x2)*(0x2*_0x354491-0x2)+0x1;case _0x5f5cb3(0x236):return _0x354491*_0x354491*_0x354491*_0x354491;case _0x5f5cb3(0x3fb):var _0xb4e771=_0x354491-0x1;return 0x1-_0xb4e771*_0xb4e771*_0xb4e771*_0xb4e771;case _0x5f5cb3(0x609):var _0xb4e771=_0x354491-0x1;return _0x354491<0.5?0x8*_0x354491*_0x354491*_0x354491*_0x354491:0x1-0x8*_0xb4e771*_0xb4e771*_0xb4e771*_0xb4e771;case'INQUINT':return _0x354491*_0x354491*_0x354491*_0x354491*_0x354491;case _0x5f5cb3(0x108):var _0xb4e771=_0x354491-0x1;return 0x1+_0xb4e771*_0xb4e771*_0xb4e771*_0xb4e771*_0xb4e771;case'INOUTQUINT':var _0xb4e771=_0x354491-0x1;return _0x354491<0.5?0x10*_0x354491*_0x354491*_0x354491*_0x354491*_0x354491:0x1+0x10*_0xb4e771*_0xb4e771*_0xb4e771*_0xb4e771*_0xb4e771;case _0x5f5cb3(0x1a4):if(_0x354491===0x0)return 0x0;return Math[_0x5f5cb3(0x559)](0x2,0xa*(_0x354491-0x1));case _0x5f5cb3(0x40e):if(_0x354491===0x1)return 0x1;return-Math[_0x5f5cb3(0x559)](0x2,-0xa*_0x354491)+0x1;case _0x5f5cb3(0x3e3):if(_0x354491===0x0||_0x354491===0x1)return _0x354491;var _0x4a407a=_0x354491*0x2,_0x8a5a7f=_0x4a407a-0x1;if(_0x4a407a<0x1)return 0.5*Math[_0x5f5cb3(0x559)](0x2,0xa*_0x8a5a7f);return 0.5*(-Math[_0x5f5cb3(0x559)](0x2,-0xa*_0x8a5a7f)+0x2);case _0x5f5cb3(0x61d):var _0x4a407a=_0x354491/0x1;return-0x1*(Math['sqrt'](0x1-_0x4a407a*_0x354491)-0x1);case _0x5f5cb3(0x776):var _0xb4e771=_0x354491-0x1;return Math[_0x5f5cb3(0x4ab)](0x1-_0xb4e771*_0xb4e771);case _0x5f5cb3(0x12b):var _0x4a407a=_0x354491*0x2,_0x8a5a7f=_0x4a407a-0x2;if(_0x4a407a<0x1)return-0.5*(Math['sqrt'](0x1-_0x4a407a*_0x4a407a)-0x1);return 0.5*(Math['sqrt'](0x1-_0x8a5a7f*_0x8a5a7f)+0x1);case _0x5f5cb3(0x1df):return _0x354491*_0x354491*((_0x50263b+0x1)*_0x354491-_0x50263b);case'OUTBACK':var _0x4a407a=_0x354491/0x1-0x1;return _0x4a407a*_0x4a407a*((_0x50263b+0x1)*_0x4a407a+_0x50263b)+0x1;break;case'INOUTBACK':var _0x4a407a=_0x354491*0x2,_0x35ecd1=_0x4a407a-0x2,_0x2fb634=_0x50263b*1.525;if(_0x4a407a<0x1)return 0.5*_0x4a407a*_0x4a407a*((_0x2fb634+0x1)*_0x4a407a-_0x2fb634);return 0.5*(_0x35ecd1*_0x35ecd1*((_0x2fb634+0x1)*_0x35ecd1+_0x2fb634)+0x2);case _0x5f5cb3(0x13c):if(_0x354491===0x0||_0x354491===0x1)return _0x354491;var _0x4a407a=_0x354491/0x1,_0x8a5a7f=_0x4a407a-0x1,_0x19ee5d=0x1-_0x42d0d4,_0x2fb634=_0x19ee5d/(0x2*Math['PI'])*Math[_0x5f5cb3(0x688)](0x1);return-(Math[_0x5f5cb3(0x559)](0x2,0xa*_0x8a5a7f)*Math['sin']((_0x8a5a7f-_0x2fb634)*(0x2*Math['PI'])/_0x19ee5d));case _0x5f5cb3(0x2d8):var _0x19ee5d=0x1-_0x42d0d4,_0x4a407a=_0x354491*0x2;if(_0x354491===0x0||_0x354491===0x1){if(_0x5f5cb3(0x491)==='YSFjQ'){let _0x55c34d=this[_0x5f5cb3(0x143)]();const _0x327ddf=this[_0x5f5cb3(0x5ce)](),_0x4641fd=this[_0x5f5cb3(0x7d4)]();if(this[_0x5f5cb3(0x1ca)]()&&(_0x55c34d<_0x327ddf||_0x317f25&&_0x4641fd===0x1)){_0x55c34d+=_0x4641fd;if(_0x55c34d>=_0x327ddf)_0x55c34d=_0x327ddf-0x1;this[_0x5f5cb3(0x779)](_0x55c34d);}else!this[_0x5f5cb3(0x1ca)]()&&((_0x55c34d<_0x327ddf-_0x4641fd||_0x23a0f6&&_0x4641fd===0x1)&&this['smoothSelect']((_0x55c34d+_0x4641fd)%_0x327ddf));}else return _0x354491;}var _0x2fb634=_0x19ee5d/(0x2*Math['PI'])*Math[_0x5f5cb3(0x688)](0x1);return Math[_0x5f5cb3(0x559)](0x2,-0xa*_0x4a407a)*Math[_0x5f5cb3(0xff)]((_0x4a407a-_0x2fb634)*(0x2*Math['PI'])/_0x19ee5d)+0x1;case _0x5f5cb3(0x7c7):var _0x19ee5d=0x1-_0x42d0d4;if(_0x354491===0x0||_0x354491===0x1)return _0x354491;var _0x4a407a=_0x354491*0x2,_0x8a5a7f=_0x4a407a-0x1,_0x2fb634=_0x19ee5d/(0x2*Math['PI'])*Math[_0x5f5cb3(0x688)](0x1);if(_0x4a407a<0x1){if(_0x5f5cb3(0x8ea)!=='lXpcj'){const _0x16a96e=_0x6dfea9[_0x5f5cb3(0x145)][_0x5f5cb3(0x1b5)](/[ ]/g,''),_0x543d2d=_0x3b130b[_0x5f5cb3(0x87c)];_0x86e429[_0x5f5cb3(0x58f)][_0x5f5cb3(0xe7)](_0x16a96e,_0x543d2d);}else return-0.5*(Math['pow'](0x2,0xa*_0x8a5a7f)*Math[_0x5f5cb3(0xff)]((_0x8a5a7f-_0x2fb634)*(0x2*Math['PI'])/_0x19ee5d));}return Math['pow'](0x2,-0xa*_0x8a5a7f)*Math[_0x5f5cb3(0xff)]((_0x8a5a7f-_0x2fb634)*(0x2*Math['PI'])/_0x19ee5d)*0.5+0x1;case _0x5f5cb3(0x845):var _0x4a407a=_0x354491/0x1;if(_0x4a407a<0x1/2.75)return 7.5625*_0x4a407a*_0x4a407a;else{if(_0x4a407a<0x2/2.75){var _0x35ecd1=_0x4a407a-1.5/2.75;return 7.5625*_0x35ecd1*_0x35ecd1+0.75;}else{if(_0x4a407a<2.5/2.75){if('EFSNo'!==_0x5f5cb3(0x682)){var _0x35ecd1=_0x4a407a-2.25/2.75;return 7.5625*_0x35ecd1*_0x35ecd1+0.9375;}else this[_0x5f5cb3(0x2b2)]()?this[_0x5f5cb3(0x730)]():_0x197181[_0x5f5cb3(0x58f)][_0x5f5cb3(0x529)][_0x5f5cb3(0x212)](this);}else{var _0x35ecd1=_0x4a407a-2.625/2.75;return 7.5625*_0x35ecd1*_0x35ecd1+0.984375;}}}case _0x5f5cb3(0x4cf):var _0x2eebf8=0x1-VisuMZ[_0x5f5cb3(0x692)](0x1-_0x354491,'outbounce');return _0x2eebf8;case _0x5f5cb3(0x13b):if(_0x354491<0.5)var _0x2eebf8=VisuMZ[_0x5f5cb3(0x692)](_0x354491*0x2,_0x5f5cb3(0x298))*0.5;else{if(_0x5f5cb3(0x502)!=='MUycs')var _0x2eebf8=VisuMZ[_0x5f5cb3(0x692)](_0x354491*0x2-0x1,_0x5f5cb3(0x339))*0.5+0.5;else{for(let _0x163f90=0x0;_0x163f90<this[_0x5f5cb3(0x650)]();_0x163f90++){const _0x5293e5=this[_0x5f5cb3(0x48f)]();let _0x12a94f=_0x31aa9b[_0x5f5cb3(0x343)];this[_0x5f5cb3(0x5c0)](_0x163f90,_0x5293e5[0x0]);for(const _0x9f1615 of _0x5293e5){const _0x1eb503=_0x9f1615[_0x5f5cb3(0x895)]();_0x1eb503>_0x12a94f&&(_0x12a94f=_0x1eb503,this['setAction'](_0x163f90,_0x9f1615));}}this['setActionState'](_0x5f5cb3(0x617));}}return _0x2eebf8;default:return _0x354491;}},VisuMZ['GetParamIcon']=function(_0x4c117a){const _0x4c448e=_0x41d84b;_0x4c117a=String(_0x4c117a)['toUpperCase']();const _0x29bb8c=VisuMZ['CoreEngine'][_0x4c448e(0x550)][_0x4c448e(0x195)];if(_0x4c117a===_0x4c448e(0x7f9))return _0x29bb8c[_0x4c448e(0x786)];if(_0x4c117a===_0x4c448e(0x1e5))return _0x29bb8c[_0x4c448e(0x1c0)];if(_0x4c117a===_0x4c448e(0x6e3))return _0x29bb8c[_0x4c448e(0x7c9)];if(_0x4c117a===_0x4c448e(0x748))return _0x29bb8c[_0x4c448e(0x619)];if(_0x4c117a===_0x4c448e(0x8ac))return _0x29bb8c[_0x4c448e(0x260)];if(_0x4c117a===_0x4c448e(0x515))return _0x29bb8c[_0x4c448e(0x273)];if(_0x4c117a===_0x4c448e(0x86e))return _0x29bb8c[_0x4c448e(0x62e)];if(_0x4c117a==='LUK')return _0x29bb8c[_0x4c448e(0x436)];if(_0x4c117a===_0x4c448e(0x377))return _0x29bb8c[_0x4c448e(0x894)];if(_0x4c117a===_0x4c448e(0x2fc))return _0x29bb8c['IconXParam1'];if(_0x4c117a==='CRI')return _0x29bb8c['IconXParam2'];if(_0x4c117a===_0x4c448e(0x7a3))return _0x29bb8c[_0x4c448e(0x31f)];if(_0x4c117a===_0x4c448e(0x5bb))return _0x29bb8c[_0x4c448e(0x182)];if(_0x4c117a==='MRF')return _0x29bb8c[_0x4c448e(0x1f3)];if(_0x4c117a===_0x4c448e(0x216))return _0x29bb8c[_0x4c448e(0x32f)];if(_0x4c117a==='HRG')return _0x29bb8c['IconXParam7'];if(_0x4c117a===_0x4c448e(0x70e))return _0x29bb8c['IconXParam8'];if(_0x4c117a===_0x4c448e(0x4ac))return _0x29bb8c['IconXParam9'];if(_0x4c117a===_0x4c448e(0x601))return _0x29bb8c[_0x4c448e(0x4d0)];if(_0x4c117a===_0x4c448e(0x3cd))return _0x29bb8c[_0x4c448e(0x1b3)];if(_0x4c117a===_0x4c448e(0x5ac))return _0x29bb8c[_0x4c448e(0x5ba)];if(_0x4c117a===_0x4c448e(0x3e8))return _0x29bb8c['IconSParam3'];if(_0x4c117a===_0x4c448e(0x3fd))return _0x29bb8c[_0x4c448e(0x564)];if(_0x4c117a===_0x4c448e(0x8d3))return _0x29bb8c['IconSParam5'];if(_0x4c117a===_0x4c448e(0x2fb))return _0x29bb8c[_0x4c448e(0x438)];if(_0x4c117a===_0x4c448e(0x240))return _0x29bb8c[_0x4c448e(0x3b7)];if(_0x4c117a===_0x4c448e(0x1ad))return _0x29bb8c['IconSParam8'];if(_0x4c117a===_0x4c448e(0x25c))return _0x29bb8c[_0x4c448e(0x840)];if(VisuMZ[_0x4c448e(0x58f)][_0x4c448e(0x77e)][_0x4c117a])return VisuMZ[_0x4c448e(0x58f)][_0x4c448e(0x77e)][_0x4c117a]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x459b24,_0x49d852,_0x9056d2){const _0x5f4cd1=_0x41d84b;if(_0x9056d2===undefined&&_0x459b24%0x1===0x0)return _0x459b24;if(_0x9056d2!==undefined&&[_0x5f4cd1(0x7f9),_0x5f4cd1(0x1e5),'ATK',_0x5f4cd1(0x748),'MAT','MDF','AGI','LUK'][_0x5f4cd1(0x4c8)](String(_0x9056d2)[_0x5f4cd1(0x2c0)]()['trim']()))return _0x459b24;_0x49d852=_0x49d852||0x0;if(VisuMZ[_0x5f4cd1(0x58f)][_0x5f4cd1(0x7ea)][_0x9056d2]){if(VisuMZ['CoreEngine'][_0x5f4cd1(0x2fe)][_0x9056d2]==='integer'){if('BBMUb'===_0x5f4cd1(0x6dc))this['_anchor']=_0x469426,this['_targetAnchor']=_0x43782c[_0x5f4cd1(0x3bf)](this[_0x5f4cd1(0x6a3)]);else return _0x459b24;}else{if('zsFqP'==='zsFqP')return String((_0x459b24*0x64)['toFixed'](_0x49d852))+'%';else this[_0x5f4cd1(0x798)]+=_0x447074;}}return String((_0x459b24*0x64)[_0x5f4cd1(0x3ff)](_0x49d852))+'%';},VisuMZ['GroupDigits']=function(_0x31913b){const _0x191a93=_0x41d84b;_0x31913b=String(_0x31913b);if(!_0x31913b)return _0x31913b;if(typeof _0x31913b!=='string')return _0x31913b;const _0x52299f=VisuMZ[_0x191a93(0x58f)][_0x191a93(0x550)][_0x191a93(0x1bb)]['DigitGroupingLocale']||_0x191a93(0x6fa),_0x129a2d={'maximumFractionDigits':0x6};_0x31913b=_0x31913b['replace'](/\[(.*?)\]/g,(_0x5fbb6c,_0x1b5458)=>{return VisuMZ['PreserveNumbers'](_0x1b5458,'[',']');}),_0x31913b=_0x31913b['replace'](/<(.*?)>/g,(_0x64d847,_0x3a369d)=>{const _0x37e112=_0x191a93;return VisuMZ[_0x37e112(0x22c)](_0x3a369d,'<','>');}),_0x31913b=_0x31913b['replace'](/\{\{(.*?)\}\}/g,(_0x21221f,_0x386336)=>{const _0x47ab79=_0x191a93;if(_0x47ab79(0x771)===_0x47ab79(0x771))return VisuMZ[_0x47ab79(0x22c)](_0x386336,'','');else _0x216954+=_0x47ab79(0x396)['format'](_0x26ec14[_0x47ab79(0x543)][0x0]);}),_0x31913b=_0x31913b[_0x191a93(0x1b5)](/(\d+\.?\d*)/g,(_0x177ada,_0x48e3f9)=>{const _0xd88252=_0x191a93;let _0xcfaf75=_0x48e3f9;if(_0xcfaf75[0x0]==='0')return _0xcfaf75;if(_0xcfaf75[_0xcfaf75[_0xd88252(0x669)]-0x1]==='.')return Number(_0xcfaf75)[_0xd88252(0x3d6)](_0x52299f,_0x129a2d)+'.';else return _0xcfaf75[_0xcfaf75[_0xd88252(0x669)]-0x1]===','?Number(_0xcfaf75)[_0xd88252(0x3d6)](_0x52299f,_0x129a2d)+',':Number(_0xcfaf75)['toLocaleString'](_0x52299f,_0x129a2d);});let _0x845ab8=0x3;while(_0x845ab8--){_0x31913b=VisuMZ['RevertPreserveNumbers'](_0x31913b);}return _0x31913b;},VisuMZ[_0x41d84b(0x22c)]=function(_0x32bbd7,_0x55dae9,_0x10ab0b){const _0x43e4d5=_0x41d84b;return _0x32bbd7=_0x32bbd7[_0x43e4d5(0x1b5)](/(\d)/gi,(_0x3499e3,_0xf6d5f6)=>_0x43e4d5(0x12d)['format'](Number(_0xf6d5f6))),_0x43e4d5(0x750)['format'](_0x32bbd7,_0x55dae9,_0x10ab0b);},VisuMZ[_0x41d84b(0x5f1)]=function(_0x4b58db){return _0x4b58db=_0x4b58db['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x35f2f8,_0x3a4652)=>Number(parseInt(_0x3a4652))),_0x4b58db;},VisuMZ[_0x41d84b(0x444)]=function(_0x4bfe91){const _0x4f6b2d=_0x41d84b;SoundManager[_0x4f6b2d(0x60e)]();if(!Utils[_0x4f6b2d(0x66b)]()){const _0x17745d=window['open'](_0x4bfe91,_0x4f6b2d(0x6ea));}else{if('iVNHm'==='yRxsN')return _0x4f6b2d(0x52c);else{const _0x431aae=process['platform']==_0x4f6b2d(0x349)?_0x4f6b2d(0x22d):process[_0x4f6b2d(0x33d)]=='win32'?_0x4f6b2d(0x329):'xdg-open';require(_0x4f6b2d(0xfb))[_0x4f6b2d(0xdd)](_0x431aae+'\x20'+_0x4bfe91);}}},VisuMZ[_0x41d84b(0xe9)]=function(_0xd53e18,_0x2bb3b5){const _0x345806=_0x41d84b;if(!_0xd53e18)return'';const _0x4fbd42=_0xd53e18[_0x345806(0x70c)]||_0xd53e18['id'];let _0x2e17dd='';_0xd53e18[_0x345806(0x82f)]!==undefined&&_0xd53e18[_0x345806(0x4f4)]!==undefined&&(_0x2e17dd=_0x345806(0x2c1)[_0x345806(0x125)](_0x4fbd42,_0x2bb3b5));_0xd53e18['expParams']!==undefined&&_0xd53e18[_0x345806(0x864)]!==undefined&&(_0x2e17dd='Class-%1-%2'[_0x345806(0x125)](_0x4fbd42,_0x2bb3b5));if(_0xd53e18['stypeId']!==undefined&&_0xd53e18[_0x345806(0x69a)]!==undefined){if(_0x345806(0x3a4)!==_0x345806(0x3a4))return this[_0x345806(0x36b)]()[_0x345806(0x337)]+0.05;else _0x2e17dd=_0x345806(0x2c4)['format'](_0x4fbd42,_0x2bb3b5);}return _0xd53e18[_0x345806(0x759)]!==undefined&&_0xd53e18[_0x345806(0x158)]!==undefined&&(_0x345806(0x918)===_0x345806(0x918)?_0x2e17dd='Item-%1-%2'['format'](_0x4fbd42,_0x2bb3b5):_0x48a49d[_0x345806(0x58f)][_0x345806(0x711)][_0x345806(0x212)](this)),_0xd53e18[_0x345806(0x29b)]!==undefined&&_0xd53e18['etypeId']===0x1&&(_0x2e17dd='Weapon-%1-%2'[_0x345806(0x125)](_0x4fbd42,_0x2bb3b5)),_0xd53e18['atypeId']!==undefined&&_0xd53e18['etypeId']>0x1&&(_0x2e17dd=_0x345806(0x4e2)[_0x345806(0x125)](_0x4fbd42,_0x2bb3b5)),_0xd53e18[_0x345806(0x269)]!==undefined&&_0xd53e18[_0x345806(0x785)]!==undefined&&(_0x345806(0x8c9)===_0x345806(0x65e)?(this[_0x345806(0x254)][_0x345806(0x485)]=this['smallParamFontSize'](),this[_0x345806(0x254)][_0x345806(0x3e6)](_0x2c431c,_0x4a1a23,_0x2847e4,_0x3973da,this[_0x345806(0x23f)](),_0x345806(0x6d6))):_0x2e17dd=_0x345806(0x237)[_0x345806(0x125)](_0x4fbd42,_0x2bb3b5)),_0xd53e18['autoRemovalTiming']!==undefined&&_0xd53e18[_0x345806(0x59f)]!==undefined&&(_0x345806(0x1ec)===_0x345806(0x1ec)?_0x2e17dd=_0x345806(0x23e)[_0x345806(0x125)](_0x4fbd42,_0x2bb3b5):_0x125bcf=_0x345806(0x7cb)['format'](_0x5744c0,_0xb2df79)),_0x2e17dd;},Game_Picture[_0x41d84b(0x806)][_0x41d84b(0x8eb)]=function(){return this['_anchor'];},VisuMZ['CoreEngine'][_0x41d84b(0x7fe)]=Game_Picture[_0x41d84b(0x806)][_0x41d84b(0x2d9)],Game_Picture[_0x41d84b(0x806)][_0x41d84b(0x2d9)]=function(){const _0x4bead6=_0x41d84b;VisuMZ[_0x4bead6(0x58f)][_0x4bead6(0x7fe)][_0x4bead6(0x212)](this),this[_0x4bead6(0x6a3)]={'x':0x0,'y':0x0},this[_0x4bead6(0x5f4)]={'x':0x0,'y':0x0};},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x541)]=Game_Picture['prototype'][_0x41d84b(0x241)],Game_Picture[_0x41d84b(0x806)][_0x41d84b(0x241)]=function(){const _0x2ec41d=_0x41d84b;this[_0x2ec41d(0x52a)]();const _0x15b618=this['_duration'];VisuMZ[_0x2ec41d(0x58f)][_0x2ec41d(0x541)][_0x2ec41d(0x212)](this);if(_0x15b618>0x0&&this[_0x2ec41d(0x20f)]<=0x0){if(_0x2ec41d(0x7a5)!==_0x2ec41d(0x7a5))this[_0x2ec41d(0x7e8)]=[],this['_fauxAnimationQueue']=[],this[_0x2ec41d(0x78f)]=[],this[_0x2ec41d(0x861)]=[];else{this['_x']=this[_0x2ec41d(0x8b2)],this['_y']=this[_0x2ec41d(0x719)],this[_0x2ec41d(0x2e4)]=this[_0x2ec41d(0x79a)],this[_0x2ec41d(0x178)]=this['_targetScaleY'],this[_0x2ec41d(0x305)]=this[_0x2ec41d(0x220)];if(this[_0x2ec41d(0x6a3)]){if(_0x2ec41d(0x4bc)===_0x2ec41d(0x4bc))this['_anchor']['x']=this['_targetAnchor']['x'],this['_anchor']['y']=this['_targetAnchor']['y'];else{const _0x1f4a61=this[_0x2ec41d(0x734)](_0x360735),_0x4175ce=_0x1b83ff[_0x2ec41d(0x58f)][_0x2ec41d(0x550)][_0x2ec41d(0x195)][_0x2ec41d(0x1d0)][_0x3e4b14],_0x14a1f2=_0x551c54[_0x2ec41d(0x222)](_0x4175ce),_0x3a1099=this[_0x2ec41d(0x336)][_0x2ec41d(0x6c3)](_0x4175ce,!![]);this[_0x2ec41d(0x10a)](_0x1f4a61['x'],_0x1f4a61['y'],0xa0,_0x4175ce,![]),this[_0x2ec41d(0x37f)](),this['drawText'](_0x3a1099,_0x1f4a61['x']+0xa0,_0x1f4a61['y'],0x3c,_0x2ec41d(0x54b));}}}}},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x238)]=Game_Picture[_0x41d84b(0x806)]['show'],Game_Picture[_0x41d84b(0x806)][_0x41d84b(0x6e8)]=function(_0x22e14d,_0x6d0648,_0x458245,_0x7b6d2a,_0x277286,_0x420c3e,_0x5e7f4f,_0xc87bd9){const _0x564794=_0x41d84b;VisuMZ['CoreEngine']['Game_Picture_show'][_0x564794(0x212)](this,_0x22e14d,_0x6d0648,_0x458245,_0x7b6d2a,_0x277286,_0x420c3e,_0x5e7f4f,_0xc87bd9),this[_0x564794(0x7b3)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x6d0648]||{'x':0x0,'y':0x0});},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x34d)]=Game_Picture[_0x41d84b(0x806)]['move'],Game_Picture[_0x41d84b(0x806)]['move']=function(_0x30ef02,_0x461fde,_0x4a4903,_0x4f1ffa,_0x5037d4,_0x56c6b7,_0x462f12,_0x157024,_0x4f6ebb){const _0x11cc2e=_0x41d84b;VisuMZ['CoreEngine']['Game_Picture_move'][_0x11cc2e(0x212)](this,_0x30ef02,_0x461fde,_0x4a4903,_0x4f1ffa,_0x5037d4,_0x56c6b7,_0x462f12,_0x157024,_0x4f6ebb),this[_0x11cc2e(0x402)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x30ef02]||{'x':0x0,'y':0x0});},Game_Picture['prototype'][_0x41d84b(0x52a)]=function(){const _0x3b516f=_0x41d84b;this[_0x3b516f(0x20f)]>0x0&&(_0x3b516f(0x223)===_0x3b516f(0x223)?(this[_0x3b516f(0x6a3)]['x']=this[_0x3b516f(0x7bb)](this[_0x3b516f(0x6a3)]['x'],this[_0x3b516f(0x5f4)]['x']),this[_0x3b516f(0x6a3)]['y']=this[_0x3b516f(0x7bb)](this[_0x3b516f(0x6a3)]['y'],this[_0x3b516f(0x5f4)]['y'])):this[_0x3b516f(0x43d)]());},Game_Picture['prototype'][_0x41d84b(0x7b3)]=function(_0x2dbe7d){const _0x5ac019=_0x41d84b;this[_0x5ac019(0x6a3)]=_0x2dbe7d,this[_0x5ac019(0x5f4)]=JsonEx['makeDeepCopy'](this[_0x5ac019(0x6a3)]);},Game_Picture[_0x41d84b(0x806)][_0x41d84b(0x402)]=function(_0x4a2bba){const _0x109c93=_0x41d84b;this[_0x109c93(0x5f4)]=_0x4a2bba;},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x795)]=Sprite_Picture[_0x41d84b(0x806)][_0x41d84b(0x5db)],Sprite_Picture[_0x41d84b(0x806)][_0x41d84b(0x5db)]=function(){const _0x444ed8=_0x41d84b,_0x23e1ad=this['picture']();if(!_0x23e1ad[_0x444ed8(0x8eb)]()){if(_0x444ed8(0x6ba)===_0x444ed8(0x6ba))VisuMZ[_0x444ed8(0x58f)][_0x444ed8(0x795)]['call'](this);else{let _0xcb3b91=this[_0x444ed8(0x1d8)];this[_0x444ed8(0x1d8)]=_0x23071c,_0xcb3b91!==this[_0x444ed8(0x1d8)]&&(this[_0x444ed8(0x427)](),_0x37dffc[_0x444ed8(0x60e)](),this[_0x444ed8(0x1d8)]==='default'?this[_0x444ed8(0x206)](0x0):this[_0x444ed8(0x206)](-0x1));}}else this[_0x444ed8(0x8eb)]['x']=_0x23e1ad[_0x444ed8(0x8eb)]()['x'],this[_0x444ed8(0x8eb)]['y']=_0x23e1ad['anchor']()['y'];},Game_Action[_0x41d84b(0x806)]['setEnemyAction']=function(_0xba10ef){const _0x36108b=_0x41d84b;if(_0xba10ef){const _0x59302e=_0xba10ef['skillId'];if(_0x59302e===0x1&&this['subject']()['attackSkillId']()!==0x1)this['setAttack']();else{if(_0x59302e===0x2&&this['subject']()['guardSkillId']()!==0x2){if(_0x36108b(0x4b5)!==_0x36108b(0x4b5)){if(_0x26454c['inBattle']())return;_0x301d40[_0x36108b(0x6d0)](_0xaa2357,_0x17e149);const _0x546722=_0x314699[_0x36108b(0x7a1)]['toUpperCase']()[_0x36108b(0x242)](),_0x1146fe=_0x3a60c4[_0x36108b(0x58f)][_0x36108b(0x4f6)](_0x546722);_0x9eaa29[_0x36108b(0x5c5)](_0x1146fe);}else this[_0x36108b(0x414)]();}else _0x36108b(0x86d)===_0x36108b(0x86d)?this['setSkill'](_0x59302e):this[_0x36108b(0x2c2)]-=_0x57c877[_0x36108b(0x5d1)]((_0x520e37[_0x36108b(0x3a6)]-_0x294c86[_0x36108b(0x1ac)])/0x2);}}else this['clear']();},Game_Actor['prototype'][_0x41d84b(0x3dc)]=function(){const _0x499b68=_0x41d84b;return this['skills']()[_0x499b68(0x853)](_0x1ac7c7=>this[_0x499b68(0x126)](_0x1ac7c7)&&this[_0x499b68(0x1c4)]()[_0x499b68(0x4c8)](_0x1ac7c7[_0x499b68(0x347)]));},Window_Base[_0x41d84b(0x806)][_0x41d84b(0x510)]=function(){const _0x1421f0=_0x41d84b;this['_dimmerSprite']=new Sprite(),this[_0x1421f0(0x1e2)]['bitmap']=new Bitmap(0x0,0x0),this[_0x1421f0(0x1e2)]['x']=0x0,this[_0x1421f0(0x71b)](this['_dimmerSprite']);},Window_Base[_0x41d84b(0x806)]['refreshDimmerBitmap']=function(){const _0x489429=_0x41d84b;if(this[_0x489429(0x1e2)]){if(_0x489429(0x683)!=='WlCos')return this[_0x489429(0x79c)]=this[_0x489429(0x79c)]||0x0,[0x0,0x1,0x2,0x3]['includes'](this[_0x489429(0x79c)])?_0x3aea75[_0x489429(0x58f)][_0x489429(0x359)]['call'](this,_0x447fb2):_0x26b400['ApplyEasing'](_0x3e1a8f,this[_0x489429(0x79c)]);else{const _0x203c5c=this[_0x489429(0x1e2)]['bitmap'],_0x4994fc=this[_0x489429(0x3a6)],_0x27b38a=this['height'],_0x40ff29=this[_0x489429(0x747)],_0x3f136a=ColorManager[_0x489429(0x109)](),_0x3578ce=ColorManager['dimColor2']();_0x203c5c[_0x489429(0x66f)](_0x4994fc,_0x27b38a),_0x203c5c[_0x489429(0x333)](0x0,0x0,_0x4994fc,_0x40ff29,_0x3578ce,_0x3f136a,!![]),_0x203c5c[_0x489429(0x286)](0x0,_0x40ff29,_0x4994fc,_0x27b38a-_0x40ff29*0x2,_0x3f136a),_0x203c5c['gradientFillRect'](0x0,_0x27b38a-_0x40ff29,_0x4994fc,_0x40ff29,_0x3f136a,_0x3578ce,!![]),this['_dimmerSprite'][_0x489429(0x5b0)](0x0,0x0,_0x4994fc,_0x27b38a);}}},Game_Actor[_0x41d84b(0x806)]['makeAutoBattleActions']=function(){const _0x19ab98=_0x41d84b;for(let _0x5a6049=0x0;_0x5a6049<this[_0x19ab98(0x650)]();_0x5a6049++){if(_0x19ab98(0x3e5)!==_0x19ab98(0x5d0)){const _0x59ca68=this[_0x19ab98(0x48f)]();let _0x134fd8=Number[_0x19ab98(0x343)];this[_0x19ab98(0x5c0)](_0x5a6049,_0x59ca68[0x0]);for(const _0x5a6499 of _0x59ca68){const _0x5e5b66=_0x5a6499[_0x19ab98(0x895)]();_0x5e5b66>_0x134fd8&&(_0x134fd8=_0x5e5b66,this['setAction'](_0x5a6049,_0x5a6499));}}else return!![];}this[_0x19ab98(0x304)](_0x19ab98(0x617));},Window_BattleItem[_0x41d84b(0x806)][_0x41d84b(0x542)]=function(_0x53c6a9){const _0x424045=_0x41d84b;return BattleManager[_0x424045(0x68e)]()?BattleManager[_0x424045(0x68e)]()['canUse'](_0x53c6a9):Window_ItemList['prototype']['isEnabled'][_0x424045(0x212)](this,_0x53c6a9);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x113)]=Scene_Map[_0x41d84b(0x806)]['createSpriteset'],Scene_Map[_0x41d84b(0x806)]['createSpriteset']=function(){const _0x5074a4=_0x41d84b;VisuMZ[_0x5074a4(0x58f)]['Scene_Map_createSpritesetFix'][_0x5074a4(0x212)](this);const _0x4dd61e=this['_spriteset'][_0x5074a4(0x495)];if(_0x4dd61e)this[_0x5074a4(0x41b)](_0x4dd61e);},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x134)]=Scene_Battle[_0x41d84b(0x806)][_0x41d84b(0x46f)],Scene_Battle[_0x41d84b(0x806)][_0x41d84b(0x46f)]=function(){const _0x1df295=_0x41d84b;VisuMZ[_0x1df295(0x58f)][_0x1df295(0x134)][_0x1df295(0x212)](this);const _0x1e77e2=this['_spriteset'][_0x1df295(0x495)];if(_0x1e77e2)this['addChild'](_0x1e77e2);},Sprite_Actor[_0x41d84b(0x806)][_0x41d84b(0x75c)]=function(){const _0x42d4c9=_0x41d84b;Sprite_Battler[_0x42d4c9(0x806)][_0x42d4c9(0x75c)][_0x42d4c9(0x212)](this),this[_0x42d4c9(0x497)]();if(this[_0x42d4c9(0x336)])this[_0x42d4c9(0x265)]();else this[_0x42d4c9(0x45a)]!==''&&(_0x42d4c9(0x607)!==_0x42d4c9(0x607)?_0x26fa2a[_0x42d4c9(0x440)](_0x48a7b5):this[_0x42d4c9(0x45a)]='');},Window[_0x41d84b(0x806)][_0x41d84b(0x144)]=function(){const _0x442d00=_0x41d84b,_0x2a035e=this[_0x442d00(0x7aa)],_0x76e132=this['_height'],_0x5df262=0x18,_0x2e7a89=_0x5df262/0x2,_0x1e7d05=0x60+_0x5df262,_0x5dd5f9=0x0+_0x5df262;this[_0x442d00(0x425)][_0x442d00(0x4fd)]=this['_windowskin'],this[_0x442d00(0x425)][_0x442d00(0x8eb)]['x']=0.5,this[_0x442d00(0x425)][_0x442d00(0x8eb)]['y']=0.5,this['_downArrowSprite'][_0x442d00(0x5b0)](_0x1e7d05+_0x2e7a89,_0x5dd5f9+_0x2e7a89+_0x5df262,_0x5df262,_0x2e7a89),this['_downArrowSprite'][_0x442d00(0x5a1)](Math[_0x442d00(0x7f6)](_0x2a035e/0x2),Math[_0x442d00(0x7f6)](_0x76e132-_0x2e7a89)),this['_upArrowSprite']['bitmap']=this[_0x442d00(0x8a9)],this[_0x442d00(0x252)][_0x442d00(0x8eb)]['x']=0.5,this[_0x442d00(0x252)][_0x442d00(0x8eb)]['y']=0.5,this['_upArrowSprite'][_0x442d00(0x5b0)](_0x1e7d05+_0x2e7a89,_0x5dd5f9,_0x5df262,_0x2e7a89),this[_0x442d00(0x252)]['move'](Math[_0x442d00(0x7f6)](_0x2a035e/0x2),Math[_0x442d00(0x7f6)](_0x2e7a89));},Window['prototype'][_0x41d84b(0x127)]=function(){const _0x3cc850=_0x41d84b,_0x37d33d=0x90,_0x586e5a=0x60,_0x109cb8=0x18;this[_0x3cc850(0x773)][_0x3cc850(0x4fd)]=this['_windowskin'],this['_pauseSignSprite'][_0x3cc850(0x8eb)]['x']=0.5,this[_0x3cc850(0x773)]['anchor']['y']=0x1,this['_pauseSignSprite']['move'](Math['round'](this['_width']/0x2),this[_0x3cc850(0x366)]),this[_0x3cc850(0x773)][_0x3cc850(0x5b0)](_0x37d33d,_0x586e5a,_0x109cb8,_0x109cb8),this[_0x3cc850(0x773)][_0x3cc850(0x8ad)]=0xff;},Window['prototype']['_updateFilterArea']=function(){const _0x26415a=_0x41d84b,_0x746216=this['_clientArea']['worldTransform'][_0x26415a(0x137)](new Point(0x0,0x0)),_0xbc3106=this[_0x26415a(0x365)][_0x26415a(0x27a)];_0xbc3106['x']=_0x746216['x']+this['origin']['x'],_0xbc3106['y']=_0x746216['y']+this['origin']['y'],_0xbc3106[_0x26415a(0x3a6)]=Math[_0x26415a(0x354)](this[_0x26415a(0x446)]*this['scale']['x']),_0xbc3106[_0x26415a(0x536)]=Math['ceil'](this['innerHeight']*this[_0x26415a(0x4aa)]['y']);},Window[_0x41d84b(0x806)]['_refreshBack']=function(){const _0x1d41ce=_0x41d84b,_0x4edd1b=this[_0x1d41ce(0x81f)],_0x1527c5=Math['max'](0x0,this['_width']-_0x4edd1b*0x2),_0x5be31c=Math[_0x1d41ce(0x81e)](0x0,this[_0x1d41ce(0x366)]-_0x4edd1b*0x2),_0x1f52ca=this[_0x1d41ce(0x6cb)],_0x11214d=_0x1f52ca[_0x1d41ce(0x192)][0x0];_0x1f52ca[_0x1d41ce(0x4fd)]=this[_0x1d41ce(0x8a9)],_0x1f52ca['setFrame'](0x0,0x0,0x60,0x60),_0x1f52ca[_0x1d41ce(0x5a1)](_0x4edd1b,_0x4edd1b),_0x1f52ca['scale']['x']=_0x1527c5/0x60,_0x1f52ca[_0x1d41ce(0x4aa)]['y']=_0x5be31c/0x60,_0x11214d[_0x1d41ce(0x4fd)]=this[_0x1d41ce(0x8a9)],_0x11214d[_0x1d41ce(0x5b0)](0x0,0x60,0x60,0x60),_0x11214d[_0x1d41ce(0x5a1)](0x0,0x0,_0x1527c5,_0x5be31c),_0x11214d['scale']['x']=0x1/_0x1f52ca[_0x1d41ce(0x4aa)]['x'],_0x11214d[_0x1d41ce(0x4aa)]['y']=0x1/_0x1f52ca['scale']['y'],_0x1f52ca[_0x1d41ce(0x7bd)](this[_0x1d41ce(0x25e)]);},Game_Temp[_0x41d84b(0x806)]['sceneTerminationClearEffects']=function(){const _0x59beff=_0x41d84b;this[_0x59beff(0x7e8)]=[],this['_fauxAnimationQueue']=[],this[_0x59beff(0x78f)]=[],this['_balloonQueue']=[];},VisuMZ[_0x41d84b(0x58f)][_0x41d84b(0x4b0)]=Scene_Base['prototype'][_0x41d84b(0x85e)],Scene_Base[_0x41d84b(0x806)][_0x41d84b(0x85e)]=function(){const _0x28c4dc=_0x41d84b;if($gameTemp)$gameTemp[_0x28c4dc(0x32d)]();VisuMZ[_0x28c4dc(0x58f)][_0x28c4dc(0x4b0)][_0x28c4dc(0x212)](this);},Bitmap['prototype'][_0x41d84b(0x3e7)]=function(_0x38256b){const _0x50639f=_0x41d84b,_0x5e19b7=this[_0x50639f(0xe5)];_0x5e19b7[_0x50639f(0x3ac)](),_0x5e19b7['font']=this['_makeFontNameText']();const _0x3ef1b1=_0x5e19b7[_0x50639f(0x81c)](_0x38256b)['width'];return _0x5e19b7['restore'](),_0x3ef1b1;},Window_Message[_0x41d84b(0x806)][_0x41d84b(0xfa)]=function(_0x2c470d){const _0x20eda2=_0x41d84b;return this[_0x20eda2(0x6d3)]()?this[_0x20eda2(0x254)][_0x20eda2(0x3e7)](_0x2c470d):Window_Base[_0x20eda2(0x806)][_0x20eda2(0xfa)][_0x20eda2(0x212)](this,_0x2c470d);},Window_Message[_0x41d84b(0x806)]['useFontWidthFix']=function(){const _0x3899cd=_0x41d84b;return VisuMZ[_0x3899cd(0x58f)][_0x3899cd(0x550)]['QoL']['FontWidthFix']??!![];},VisuMZ[_0x41d84b(0x58f)]['Game_Action_numRepeats']=Game_Action[_0x41d84b(0x806)]['numRepeats'],Game_Action[_0x41d84b(0x806)]['numRepeats']=function(){const _0x43acc7=_0x41d84b;if(this[_0x43acc7(0x8aa)]()){if(_0x43acc7(0x768)===_0x43acc7(0x768))return VisuMZ[_0x43acc7(0x58f)]['Game_Action_numRepeats'][_0x43acc7(0x212)](this);else{const _0x53514f=_0x43acc7(0x17b);this[_0x43acc7(0x3d7)]=this['_colorCache']||{};if(this[_0x43acc7(0x3d7)][_0x53514f])return this['_colorCache'][_0x53514f];const _0x240d85=_0x3cc6ad[_0x43acc7(0x58f)][_0x43acc7(0x550)][_0x43acc7(0x664)][_0x43acc7(0x33a)];return this[_0x43acc7(0x5df)](_0x53514f,_0x240d85);}}else{if(_0x43acc7(0x8bb)===_0x43acc7(0x8bb))return 0x0;else for(const _0x8788b1 of _0x5d4acf[_0x43acc7(0x7fc)]){const _0x3bb960=new _0x3954eb(_0x8788b1);this[_0x43acc7(0x41b)](_0x3bb960);}}},VisuMZ[_0x41d84b(0x58f)]['Game_Action_setAttack']=Game_Action[_0x41d84b(0x806)][_0x41d84b(0x18b)],Game_Action[_0x41d84b(0x806)][_0x41d84b(0x18b)]=function(){const _0x5136d0=_0x41d84b;this[_0x5136d0(0x36b)]()&&this['subject']()['canAttack']()?VisuMZ[_0x5136d0(0x58f)][_0x5136d0(0x675)][_0x5136d0(0x212)](this):this[_0x5136d0(0x4df)]();},Sprite_Name[_0x41d84b(0x806)][_0x41d84b(0x598)]=function(){return 0x24;},Sprite_Name[_0x41d84b(0x806)][_0x41d84b(0x769)]=function(){const _0x287c76=_0x41d84b,_0x1a68d7=this[_0x287c76(0x37a)](),_0x48569a=this['bitmapWidth'](),_0x18aca5=this[_0x287c76(0x598)]();this[_0x287c76(0x836)](),this[_0x287c76(0x4fd)][_0x287c76(0x4df)](),this[_0x287c76(0x4fd)]['drawTextTopAligned'](_0x1a68d7,0x0,0x0,_0x48569a,_0x18aca5,_0x287c76(0x6d6));},Bitmap[_0x41d84b(0x806)][_0x41d84b(0x24b)]=function(_0x47357d,_0x589251,_0x46d7d1,_0x485fae,_0x519310,_0x3b479e){const _0x31b78a=_0x41d84b,_0x4e20e5=this[_0x31b78a(0xe5)],_0x176695=_0x4e20e5['globalAlpha'];_0x485fae=_0x485fae||0xffffffff;let _0x5123c4=_0x589251,_0x2e194f=Math['round'](_0x46d7d1+0x18/0x2+this[_0x31b78a(0x485)]*0.35);if(_0x3b479e===_0x31b78a(0x43c)){if(_0x31b78a(0x412)===_0x31b78a(0x702))return _0x75ee1a[_0x31b78a(0x22c)](_0x323e89,'','');else _0x5123c4+=_0x485fae/0x2;}_0x3b479e===_0x31b78a(0x54b)&&('kQYKd'!==_0x31b78a(0x2a9)?_0x2437e0[_0x31b78a(0x190)]()&&(_0x25882c[_0x31b78a(0x5a6)](_0x31b78a(0x151)),_0x57a5c4['log'](_0x390183)):_0x5123c4+=_0x485fae),_0x4e20e5['save'](),_0x4e20e5[_0x31b78a(0x1f5)]=this[_0x31b78a(0x7c8)](),_0x4e20e5[_0x31b78a(0x3be)]=_0x3b479e,_0x4e20e5[_0x31b78a(0x873)]=_0x31b78a(0x41f),_0x4e20e5[_0x31b78a(0x31e)]=0x1,this[_0x31b78a(0xed)](_0x47357d,_0x5123c4,_0x2e194f,_0x485fae),_0x4e20e5[_0x31b78a(0x31e)]=_0x176695,this[_0x31b78a(0x21f)](_0x47357d,_0x5123c4,_0x2e194f,_0x485fae),_0x4e20e5[_0x31b78a(0x5d3)](),this[_0x31b78a(0xe0)][_0x31b78a(0x75c)]();},VisuMZ[_0x41d84b(0x58f)]['BattleManager_checkSubstitute']=BattleManager[_0x41d84b(0x870)],BattleManager[_0x41d84b(0x870)]=function(_0x38548b){const _0x233721=_0x41d84b;if(this[_0x233721(0x338)][_0x233721(0x86a)]())return![];return VisuMZ['CoreEngine'][_0x233721(0x526)]['call'](this,_0x38548b);},BattleManager[_0x41d84b(0x1a1)]=function(){const _0x5d93c8=_0x41d84b;if(this['_subject'])this[_0x5d93c8(0x64a)][_0x5d93c8(0x1a1)](this[_0x5d93c8(0x5cb)]);this['_phase']='turn';if(this[_0x5d93c8(0x5cb)]&&this['_subject'][_0x5d93c8(0x650)]()===0x0){if(_0x5d93c8(0x53e)===_0x5d93c8(0x500)){if(_0x3ad41d)this[_0x5d93c8(0x62d)](_0x58d32f);_0x5156ce['CoreEngine'][_0x5d93c8(0x162)]['call'](this,_0x331fc8);}else this[_0x5d93c8(0x8dc)](this[_0x5d93c8(0x5cb)]),this[_0x5d93c8(0x5cb)]=null;}},Bitmap[_0x41d84b(0x806)][_0x41d84b(0x226)]=function(){const _0x38e7fb=_0x41d84b;this[_0x38e7fb(0x7f0)]=new Image(),this[_0x38e7fb(0x7f0)][_0x38e7fb(0x858)]=this[_0x38e7fb(0x1c6)][_0x38e7fb(0x44f)](this),this[_0x38e7fb(0x7f0)][_0x38e7fb(0x604)]=this[_0x38e7fb(0x5cf)][_0x38e7fb(0x44f)](this),this[_0x38e7fb(0x69d)](),this[_0x38e7fb(0x351)]=_0x38e7fb(0x88e),Utils[_0x38e7fb(0x1fd)]()?this[_0x38e7fb(0x43d)]():(this[_0x38e7fb(0x7f0)]['src']=this['_url'],![]&&this[_0x38e7fb(0x7f0)]['width']>0x0&&(this['_image'][_0x38e7fb(0x858)]=null,this[_0x38e7fb(0x1c6)]()));};