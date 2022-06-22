//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.64;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.64] [CoreEngine]
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
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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

const _0xebc2c6=_0x1f8b;(function(_0x3a28d8,_0x2190b9){const _0x19f506=_0x1f8b,_0x3826ee=_0x3a28d8();while(!![]){try{const _0x39bc14=-parseInt(_0x19f506(0x65a))/0x1+-parseInt(_0x19f506(0x232))/0x2*(parseInt(_0x19f506(0x161))/0x3)+parseInt(_0x19f506(0x17c))/0x4*(-parseInt(_0x19f506(0xb3))/0x5)+parseInt(_0x19f506(0x1af))/0x6+parseInt(_0x19f506(0x686))/0x7+-parseInt(_0x19f506(0x54c))/0x8+parseInt(_0x19f506(0x1dc))/0x9*(parseInt(_0x19f506(0x35a))/0xa);if(_0x39bc14===_0x2190b9)break;else _0x3826ee['push'](_0x3826ee['shift']());}catch(_0x168c3e){_0x3826ee['push'](_0x3826ee['shift']());}}}(_0x52dd,0x99ee7));var label=_0xebc2c6(0x71a),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xebc2c6(0x427)](function(_0x1bdaed){const _0x56902d=_0xebc2c6;return _0x1bdaed['status']&&_0x1bdaed['description'][_0x56902d(0x6f5)]('['+label+']');})[0x0];VisuMZ[label][_0xebc2c6(0x74)]=VisuMZ[label]['Settings']||{},VisuMZ[_0xebc2c6(0x516)]=function(_0x174255,_0xb6dff2){const _0x3d20ea=_0xebc2c6;for(const _0x41c767 in _0xb6dff2){if(_0x41c767[_0x3d20ea(0x3f9)](/(.*):(.*)/i)){const _0x4b74d2=String(RegExp['$1']),_0x41c158=String(RegExp['$2'])['toUpperCase']()[_0x3d20ea(0x4d5)]();let _0x2ecde7,_0x2161d8,_0x5d1535;switch(_0x41c158){case _0x3d20ea(0x1c2):_0x2ecde7=_0xb6dff2[_0x41c767]!==''?Number(_0xb6dff2[_0x41c767]):0x0;break;case _0x3d20ea(0x44f):_0x2161d8=_0xb6dff2[_0x41c767]!==''?JSON[_0x3d20ea(0x1d6)](_0xb6dff2[_0x41c767]):[],_0x2ecde7=_0x2161d8['map'](_0x45a4ad=>Number(_0x45a4ad));break;case _0x3d20ea(0xee):_0x2ecde7=_0xb6dff2[_0x41c767]!==''?eval(_0xb6dff2[_0x41c767]):null;break;case _0x3d20ea(0x25a):_0x2161d8=_0xb6dff2[_0x41c767]!==''?JSON[_0x3d20ea(0x1d6)](_0xb6dff2[_0x41c767]):[],_0x2ecde7=_0x2161d8['map'](_0x4f9cf5=>eval(_0x4f9cf5));break;case _0x3d20ea(0x51d):_0x2ecde7=_0xb6dff2[_0x41c767]!==''?JSON['parse'](_0xb6dff2[_0x41c767]):'';break;case _0x3d20ea(0x287):_0x2161d8=_0xb6dff2[_0x41c767]!==''?JSON[_0x3d20ea(0x1d6)](_0xb6dff2[_0x41c767]):[],_0x2ecde7=_0x2161d8[_0x3d20ea(0x2d8)](_0x5224a6=>JSON[_0x3d20ea(0x1d6)](_0x5224a6));break;case _0x3d20ea(0x18e):_0x2ecde7=_0xb6dff2[_0x41c767]!==''?new Function(JSON[_0x3d20ea(0x1d6)](_0xb6dff2[_0x41c767])):new Function('return\x200');break;case _0x3d20ea(0x6cd):_0x2161d8=_0xb6dff2[_0x41c767]!==''?JSON['parse'](_0xb6dff2[_0x41c767]):[],_0x2ecde7=_0x2161d8[_0x3d20ea(0x2d8)](_0x339bb9=>new Function(JSON[_0x3d20ea(0x1d6)](_0x339bb9)));break;case _0x3d20ea(0x54a):_0x2ecde7=_0xb6dff2[_0x41c767]!==''?String(_0xb6dff2[_0x41c767]):'';break;case _0x3d20ea(0x588):_0x2161d8=_0xb6dff2[_0x41c767]!==''?JSON[_0x3d20ea(0x1d6)](_0xb6dff2[_0x41c767]):[],_0x2ecde7=_0x2161d8[_0x3d20ea(0x2d8)](_0x37317c=>String(_0x37317c));break;case _0x3d20ea(0x6e2):_0x5d1535=_0xb6dff2[_0x41c767]!==''?JSON[_0x3d20ea(0x1d6)](_0xb6dff2[_0x41c767]):{},_0x174255[_0x4b74d2]={},VisuMZ['ConvertParams'](_0x174255[_0x4b74d2],_0x5d1535);continue;case _0x3d20ea(0x2cd):_0x2161d8=_0xb6dff2[_0x41c767]!==''?JSON[_0x3d20ea(0x1d6)](_0xb6dff2[_0x41c767]):[],_0x2ecde7=_0x2161d8[_0x3d20ea(0x2d8)](_0x3b225d=>VisuMZ['ConvertParams']({},JSON[_0x3d20ea(0x1d6)](_0x3b225d)));break;default:continue;}_0x174255[_0x4b74d2]=_0x2ecde7;}}return _0x174255;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x4c5)]=SceneManager[_0xebc2c6(0x489)],SceneManager['exit']=function(){const _0x504e9c=_0xebc2c6;VisuMZ['CoreEngine'][_0x504e9c(0x4c5)]['call'](this);if(Utils[_0x504e9c(0x7a)]>=_0x504e9c(0x17e)){if(typeof nw===_0x504e9c(0x28d))nw[_0x504e9c(0x2ce)][_0x504e9c(0xf3)]();}},(_0x41bc81=>{const _0x322a79=_0xebc2c6,_0x4ff1f8=_0x41bc81[_0x322a79(0x4d0)];for(const _0x433c34 of dependencies){if(!Imported[_0x433c34]){alert(_0x322a79(0x18c)['format'](_0x4ff1f8,_0x433c34)),SceneManager[_0x322a79(0x489)]();break;}}const _0x2f8b25=_0x41bc81['description'];if(_0x2f8b25[_0x322a79(0x3f9)](/\[Version[ ](.*?)\]/i)){const _0xbcddc2=Number(RegExp['$1']);_0xbcddc2!==VisuMZ[label]['version']&&(alert(_0x322a79(0x84)['format'](_0x4ff1f8,_0xbcddc2)),SceneManager[_0x322a79(0x489)]());}if(_0x2f8b25[_0x322a79(0x3f9)](/\[Tier[ ](\d+)\]/i)){const _0x1e5b08=Number(RegExp['$1']);_0x1e5b08<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x322a79(0x5ce)](_0x4ff1f8,_0x1e5b08,tier)),SceneManager[_0x322a79(0x489)]()):tier=Math[_0x322a79(0x631)](_0x1e5b08,tier);}VisuMZ[_0x322a79(0x516)](VisuMZ[label]['Settings'],_0x41bc81[_0x322a79(0x6b5)]);})(pluginData),((()=>{const _0x336dc0=_0xebc2c6;if(VisuMZ[_0x336dc0(0x71a)]['Settings'][_0x336dc0(0x4b2)][_0x336dc0(0x6bc)]??!![])for(const _0x3aa46f in $plugins){const _0x30837c=$plugins[_0x3aa46f];_0x30837c[_0x336dc0(0x4d0)][_0x336dc0(0x3f9)](/(.*)\/(.*)/i)&&(_0x30837c[_0x336dc0(0x4d0)]=String(RegExp['$2'][_0x336dc0(0x4d5)]()));}})()),PluginManager['registerCommand'](pluginData['name'],_0xebc2c6(0x272),_0x1c13fc=>{const _0x4677bf=_0xebc2c6;if(!SceneManager[_0x4677bf(0x4e5)])return;if(!SceneManager['_scene'][_0x4677bf(0x4be)])return;VisuMZ['ConvertParams'](_0x1c13fc,_0x1c13fc);const _0x4202f9=Math[_0x4677bf(0x6b6)](_0x1c13fc['pointX']),_0x3fe9d4=Math[_0x4677bf(0x6b6)](_0x1c13fc['pointY']);$gameTemp[_0x4677bf(0x229)](_0x4202f9,_0x3fe9d4,_0x1c13fc[_0x4677bf(0x188)],_0x1c13fc[_0x4677bf(0x21f)],_0x1c13fc[_0x4677bf(0x5b4)]);}),PluginManager[_0xebc2c6(0x68d)](pluginData[_0xebc2c6(0x4d0)],_0xebc2c6(0x61b),_0x290e80=>{const _0x1252ff=_0xebc2c6;if(!$gameTemp[_0x1252ff(0x72d)]())return;const _0x127b13=Input[_0x1252ff(0x2a5)]();navigator[_0x1252ff(0x23a)]&&navigator['clipboard'][_0x1252ff(0x5ff)](_0x127b13);}),PluginManager[_0xebc2c6(0x68d)](pluginData[_0xebc2c6(0x4d0)],_0xebc2c6(0x4c0),_0x909487=>{const _0xd4a762=_0xebc2c6;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0xd4a762(0x37a)]())return;SceneManager[_0xd4a762(0x4e5)]['_active']=![],VisuMZ[_0xd4a762(0x71a)][_0xd4a762(0x744)]();}),PluginManager['registerCommand'](pluginData[_0xebc2c6(0x4d0)],_0xebc2c6(0x177),_0x1a5d34=>{const _0x14dab4=_0xebc2c6;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x14dab4(0x37a)]())return;SceneManager[_0x14dab4(0x4e5)][_0x14dab4(0x1bf)]=![],VisuMZ[_0x14dab4(0x71a)][_0x14dab4(0x7f)]();}),PluginManager[_0xebc2c6(0x68d)](pluginData[_0xebc2c6(0x4d0)],_0xebc2c6(0xb6),_0x26efcf=>{const _0x2c845b=_0xebc2c6;if(!$gameTemp[_0x2c845b(0x72d)]())return;if(!Utils[_0x2c845b(0x37a)]())return;if(!$gameMap)return;if($gameMap[_0x2c845b(0x392)]()<=0x0)return;VisuMZ[_0x2c845b(0x516)](_0x26efcf,_0x26efcf);const _0x19269f=_0x2c845b(0x259)[_0x2c845b(0x5ce)]($gameMap['mapId']()['padZero'](0x3)),_0x5a6283=VisuMZ[_0x2c845b(0x71a)][_0x2c845b(0x396)]($gameMap['mapId']());VisuMZ['CoreEngine']['ExportString'](_0x5a6283,_0x19269f,!![]);}),PluginManager[_0xebc2c6(0x68d)](pluginData[_0xebc2c6(0x4d0)],_0xebc2c6(0x62f),_0x90dcd3=>{const _0x4bb4e5=_0xebc2c6;if(!$gameTemp[_0x4bb4e5(0x72d)]())return;if(!Utils[_0x4bb4e5(0x37a)]())return;if(!$gameParty[_0x4bb4e5(0xce)]())return;VisuMZ[_0x4bb4e5(0x516)](_0x90dcd3,_0x90dcd3);const _0x5b8605=_0x4bb4e5(0x12e)['format']($gameTroop[_0x4bb4e5(0x132)][_0x4bb4e5(0x31b)](0x4)),_0x4afcab=VisuMZ['CoreEngine']['ExtractStrFromTroop']($gameTroop[_0x4bb4e5(0x132)]);VisuMZ['CoreEngine'][_0x4bb4e5(0x414)](_0x4afcab,_0x5b8605,!![]);}),VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x414)]=function(_0x3ba16e,_0x2c589f,_0x54e562){const _0xbdfcd1=_0xebc2c6,_0x900947=require('fs');let _0x23f520=_0xbdfcd1(0x22c)[_0xbdfcd1(0x5ce)](_0x2c589f||'0');_0x900947[_0xbdfcd1(0x524)](_0x23f520,_0x3ba16e,_0x2bbb28=>{const _0x40e051=_0xbdfcd1;if(_0x2bbb28)throw err;else _0x54e562&&alert('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'[_0x40e051(0x5ce)](_0x23f520));});},VisuMZ[_0xebc2c6(0x71a)]['ExportStrFromAllMaps']=function(){const _0x3c1245=_0xebc2c6,_0x4fcca0=[];for(const _0x9bce94 of $dataMapInfos){if(!_0x9bce94)continue;_0x4fcca0['push'](_0x9bce94['id']);}const _0x308c29=_0x4fcca0[_0x3c1245(0x749)]*0x64+Math[_0x3c1245(0x3b5)](0x64);alert(_0x3c1245(0xd6)['format'](_0x308c29)),this[_0x3c1245(0x629)]=[],this[_0x3c1245(0x24a)]=$dataMap;for(const _0x124d02 of _0x4fcca0){VisuMZ[_0x3c1245(0x71a)]['loadMapData'](_0x124d02);}setTimeout(VisuMZ[_0x3c1245(0x71a)][_0x3c1245(0x94)]['bind'](this),_0x308c29);},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0xd8)]=function(_0x402780){const _0x2f5e87=_0xebc2c6,_0xb187da=_0x2f5e87(0x5b8)[_0x2f5e87(0x5ce)](_0x402780[_0x2f5e87(0x31b)](0x3)),_0x185fe1=new XMLHttpRequest(),_0x1162a8=_0x2f5e87(0x600)+_0xb187da;_0x185fe1[_0x2f5e87(0x3ac)](_0x2f5e87(0x25d),_0x1162a8),_0x185fe1[_0x2f5e87(0x58a)]('application/json'),_0x185fe1['onload']=()=>this[_0x2f5e87(0x60c)](_0x185fe1,_0x402780,_0xb187da,_0x1162a8),_0x185fe1['onerror']=()=>DataManager[_0x2f5e87(0x594)](_0x2f5e87(0x113),_0xb187da,_0x1162a8),_0x185fe1[_0x2f5e87(0x6d)]();},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x60c)]=function(_0x5597f1,_0x4c3b2b,_0x38fbe3,_0x13eb48){const _0x4d085a=_0xebc2c6;$dataMap=JSON['parse'](_0x5597f1[_0x4d085a(0x448)]),DataManager[_0x4d085a(0x2f5)]($dataMap),this[_0x4d085a(0x629)][_0x4c3b2b]=VisuMZ['CoreEngine'][_0x4d085a(0x396)](_0x4c3b2b),$dataMap=this[_0x4d085a(0x24a)];},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x94)]=function(){const _0x5c950d=_0xebc2c6,_0x563570=_0x5c950d(0x313);this[_0x5c950d(0x629)]['remove'](undefined)[_0x5c950d(0x218)]('')[_0x5c950d(0x218)](null);const _0x3002dc=this['_storedMapText'][_0x5c950d(0x5d6)](_0x5c950d(0x5a3))[_0x5c950d(0x4d5)]();VisuMZ[_0x5c950d(0x71a)]['ExportString'](_0x3002dc,_0x563570,!![]),SceneManager[_0x5c950d(0x4e5)]['_active']=!![];},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x396)]=function(_0x121585){const _0x1b3d50=_0xebc2c6;if(!$dataMap)return'';let _0x1eab77='█'[_0x1b3d50(0x1c4)](0x46)+'\x0a\x0a',_0x1cedfe='═'[_0x1b3d50(0x1c4)](0x46)+'\x0a\x0a',_0x119aa4='';this[_0x1b3d50(0x7b)]=0x0;for(const _0x3d514d of $dataMap[_0x1b3d50(0x114)]){if(!_0x3d514d)continue;let _0x310e6b=_0x3d514d['id'],_0x4a5d7f=_0x3d514d['name'],_0x1cb8fa=_0x3d514d[_0x1b3d50(0x2a8)];for(const _0x52ff35 of _0x1cb8fa){const _0x4e8a24=_0x1cb8fa[_0x1b3d50(0x6fb)](_0x52ff35)+0x1;let _0x31a391=_0x1cedfe+_0x1b3d50(0x2a0),_0x47a551=VisuMZ[_0x1b3d50(0x71a)]['ExtractStrFromList'](_0x52ff35[_0x1b3d50(0x1cb)]);if(_0x47a551['length']>0x0){if(_0x119aa4[_0x1b3d50(0x749)]>0x0)_0x119aa4+=_0x1cedfe+'\x0a\x0a\x0a\x0a\x0a';else{const _0x30bd8f=$dataMapInfos[_0x121585][_0x1b3d50(0x4d0)];_0x119aa4+=_0x1eab77+_0x1b3d50(0x329)['format'](_0x121585,_0x30bd8f||_0x1b3d50(0x52f))+_0x1eab77;}_0x119aa4+=_0x31a391['format'](_0x310e6b,_0x4a5d7f,_0x4e8a24,_0x47a551);}}}return _0x119aa4[_0x1b3d50(0x749)]>0x0&&(_0x119aa4+=_0x1cedfe),_0x119aa4;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x7f)]=function(){const _0x17e495=_0xebc2c6,_0xd88475=$dataTroops[_0x17e495(0x749)]*0xa+Math[_0x17e495(0x3b5)](0xa);alert(_0x17e495(0x376)[_0x17e495(0x5ce)](_0xd88475));const _0x2360f8=[];for(const _0x1b621b of $dataTroops){if(!_0x1b621b)continue;const _0x3bb225=_0x1b621b['id'];_0x2360f8[_0x3bb225]=VisuMZ['CoreEngine'][_0x17e495(0x347)](_0x3bb225);}setTimeout(VisuMZ[_0x17e495(0x71a)][_0x17e495(0x5a8)][_0x17e495(0x563)](this,_0x2360f8),_0xd88475);},VisuMZ[_0xebc2c6(0x71a)]['ExtractStrFromTroop']=function(_0xccb905){const _0x575287=_0xebc2c6;if(!$dataTroops[_0xccb905])return'';let _0x380302='█'[_0x575287(0x1c4)](0x46)+'\x0a\x0a',_0x195e84='═'[_0x575287(0x1c4)](0x46)+'\x0a\x0a',_0x5f0a74='';this[_0x575287(0x7b)]=0x0;const _0x2f284c=$dataTroops[_0xccb905];let _0x873b30=_0x2f284c[_0x575287(0x2a8)];for(const _0x308190 of _0x873b30){const _0x5c7d39=_0x873b30[_0x575287(0x6fb)](_0x308190)+0x1;let _0x39f2cb=_0x195e84+_0x575287(0x675),_0x950d50=VisuMZ[_0x575287(0x71a)][_0x575287(0x3c9)](_0x308190[_0x575287(0x1cb)]);_0x950d50[_0x575287(0x749)]>0x0&&(_0x5f0a74['length']>0x0?_0x5f0a74+=_0x195e84+_0x575287(0x5a3):_0x5f0a74+=_0x380302+_0x575287(0x23f)[_0x575287(0x5ce)](_0xccb905,_0x2f284c['name']||_0x575287(0x52f))+_0x380302,_0x5f0a74+=_0x39f2cb[_0x575287(0x5ce)](_0x5c7d39,_0x950d50));}return _0x5f0a74['length']>0x0&&(_0x5f0a74+=_0x195e84),_0x5f0a74;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x5a8)]=function(_0x5e8a04){const _0x12f3b0=_0xebc2c6,_0x3239b4=_0x12f3b0(0x14e);_0x5e8a04[_0x12f3b0(0x218)](undefined)['remove']('')['remove'](null);const _0x1d6fe7=_0x5e8a04[_0x12f3b0(0x5d6)]('\x0a\x0a\x0a\x0a\x0a')[_0x12f3b0(0x4d5)]();VisuMZ[_0x12f3b0(0x71a)][_0x12f3b0(0x414)](_0x1d6fe7,_0x3239b4,!![]),SceneManager[_0x12f3b0(0x4e5)]['_active']=!![];},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x3c9)]=function(_0x53c5a){const _0x3d8101=_0xebc2c6;let _0x302e08='\x0a'+'─'['repeat'](0x46)+'\x0a',_0x13a150='\x0a'+'┄'[_0x3d8101(0x1c4)](0x46)+'\x0a',_0x2e3c32='';for(const _0x3fa2ca of _0x53c5a){if(!_0x3fa2ca)continue;if(_0x3fa2ca[_0x3d8101(0x417)]===0x65)_0x2e3c32+=_0x302e08+'\x0a',_0x2e3c32+=_0x3d8101(0x2fb),_0x3fa2ca[_0x3d8101(0x6b5)][0x4]!==''&&_0x3fa2ca[_0x3d8101(0x6b5)][0x4]!==undefined&&(_0x2e3c32+='【%1】\x0a'['format'](_0x3fa2ca[_0x3d8101(0x6b5)][0x4]));else{if(_0x3fa2ca[_0x3d8101(0x417)]===0x191)_0x2e3c32+='%1\x0a'['format'](_0x3fa2ca[_0x3d8101(0x6b5)][0x0]);else{if(_0x3fa2ca[_0x3d8101(0x417)]===0x192)_0x2e3c32+=_0x302e08,_0x2e3c32+=_0x3d8101(0x696)[_0x3d8101(0x5ce)](_0x13a150,_0x3fa2ca['parameters'][0x0]+0x1,_0x3fa2ca[_0x3d8101(0x6b5)][0x1]);else{if(_0x3fa2ca[_0x3d8101(0x417)]===0x193)_0x2e3c32+=_0x302e08,_0x2e3c32+='%1〘Choice\x20Cancel〙%1'[_0x3d8101(0x5ce)](_0x13a150);else{if(_0x3fa2ca['code']===0x194)_0x2e3c32+=_0x302e08,_0x2e3c32+=_0x3d8101(0x120)[_0x3d8101(0x5ce)](_0x13a150);else{if(_0x3fa2ca[_0x3d8101(0x417)]===0x69)_0x2e3c32+=_0x302e08+'\x0a',_0x2e3c32+=_0x3d8101(0x556);else{if(_0x3fa2ca['code']===0x6c)_0x2e3c32+=_0x302e08+'\x0a',_0x2e3c32+=_0x3d8101(0x6a6)[_0x3d8101(0x5ce)](_0x3fa2ca[_0x3d8101(0x6b5)][0x0]);else{if(_0x3fa2ca['code']===0x198)_0x2e3c32+='%1\x0a'['format'](_0x3fa2ca[_0x3d8101(0x6b5)][0x0]);else{if(_0x3fa2ca['code']===0x75){const _0x596dec=$dataCommonEvents[_0x3fa2ca[_0x3d8101(0x6b5)][0x0]];if(_0x596dec&&this['_commonEventLayers']<=0xa){this[_0x3d8101(0x7b)]++;let _0x5b799f=VisuMZ[_0x3d8101(0x71a)][_0x3d8101(0x3c9)](_0x596dec[_0x3d8101(0x1cb)]);_0x5b799f['length']>0x0&&(_0x2e3c32+=_0x302e08,_0x2e3c32+=_0x13a150,_0x2e3c32+=_0x3d8101(0x20d)[_0x3d8101(0x5ce)](_0x596dec['id'],_0x596dec['name']),_0x2e3c32+=_0x13a150,_0x2e3c32+=_0x5b799f,_0x2e3c32+=_0x13a150,_0x2e3c32+=_0x3d8101(0x339)[_0x3d8101(0x5ce)](_0x596dec['id'],_0x596dec[_0x3d8101(0x4d0)]),_0x2e3c32+=_0x13a150),this['_commonEventLayers']--;}}}}}}}}}}}return _0x2e3c32[_0x3d8101(0x749)]>0x0&&(_0x2e3c32+=_0x302e08),_0x2e3c32;},PluginManager['registerCommand'](pluginData[_0xebc2c6(0x4d0)],'OpenURL',_0x1d180d=>{const _0x4e9d0f=_0xebc2c6;VisuMZ[_0x4e9d0f(0x516)](_0x1d180d,_0x1d180d);const _0x215622=_0x1d180d['URL'];VisuMZ[_0x4e9d0f(0x728)](_0x215622);}),PluginManager[_0xebc2c6(0x68d)](pluginData[_0xebc2c6(0x4d0)],_0xebc2c6(0x616),_0x1920a1=>{const _0x18b990=_0xebc2c6;VisuMZ[_0x18b990(0x516)](_0x1920a1,_0x1920a1);const _0x3d32dc=_0x1920a1[_0x18b990(0x308)]||0x0;$gameParty[_0x18b990(0x539)](_0x3d32dc);}),PluginManager[_0xebc2c6(0x68d)](pluginData[_0xebc2c6(0x4d0)],_0xebc2c6(0x652),_0x167975=>{const _0x51a59c=_0xebc2c6;if(!SceneManager[_0x51a59c(0x70d)]())return;VisuMZ[_0x51a59c(0x516)](_0x167975,_0x167975);const _0x1273c0=_0x167975['CommonEventID'];SceneManager[_0x51a59c(0x4e5)][_0x51a59c(0x1e2)](_0x1273c0);}),PluginManager[_0xebc2c6(0x68d)](pluginData[_0xebc2c6(0x4d0)],_0xebc2c6(0x1fa),_0x1d1dab=>{const _0xa293cd=_0xebc2c6;if(!$gameTemp[_0xa293cd(0x72d)]())return;if(!Utils['isNwjs']())return;VisuMZ['ConvertParams'](_0x1d1dab,_0x1d1dab);const _0x1e6afb=_0x1d1dab['PictureID']||0x1;$gameTemp[_0xa293cd(0x618)]=_0x1e6afb;}),PluginManager[_0xebc2c6(0x68d)](pluginData[_0xebc2c6(0x4d0)],'PictureEasingType',_0x3d37b5=>{const _0x4eb0be=_0xebc2c6;VisuMZ[_0x4eb0be(0x516)](_0x3d37b5,_0x3d37b5);const _0x3c8283=_0x3d37b5[_0x4eb0be(0x30c)]||0x1,_0x22352b=_0x3d37b5[_0x4eb0be(0x2d5)]||'Linear',_0x5d6829=$gameScreen[_0x4eb0be(0x191)](_0x3c8283);_0x5d6829&&_0x5d6829[_0x4eb0be(0x190)](_0x22352b);}),PluginManager[_0xebc2c6(0x68d)](pluginData['name'],_0xebc2c6(0x471),_0x5c247d=>{const _0x4c022c=_0xebc2c6;for(let _0x60fef8=0x1;_0x60fef8<=0x64;_0x60fef8++){$gameScreen[_0x4c022c(0x1ab)](_0x60fef8);}}),PluginManager['registerCommand'](pluginData[_0xebc2c6(0x4d0)],_0xebc2c6(0xed),_0x269ddc=>{const _0x288545=_0xebc2c6;VisuMZ['ConvertParams'](_0x269ddc,_0x269ddc);const _0x2daf83=Math[_0x288545(0x134)](_0x269ddc[_0x288545(0x637)],_0x269ddc['EndingID']),_0x2e0f5a=Math['max'](_0x269ddc[_0x288545(0x637)],_0x269ddc[_0x288545(0x20b)]);for(let _0x2a8699=_0x2daf83;_0x2a8699<=_0x2e0f5a;_0x2a8699++){$gameScreen['erasePicture'](_0x2a8699);}}),PluginManager['registerCommand'](pluginData['name'],_0xebc2c6(0x41d),_0x33dd09=>{const _0x1aaf3f=_0xebc2c6;VisuMZ[_0x1aaf3f(0x516)](_0x33dd09,_0x33dd09);const _0x337d59=Math[_0x1aaf3f(0x6b6)](_0x33dd09[_0x1aaf3f(0x3ad)])['clamp'](0x1,0x64),_0x575c21=_0x33dd09[_0x1aaf3f(0x74)],_0x49a5d0=_0x575c21['Origin'][_0x1aaf3f(0x1cc)](0x0,0x1),_0x47b063=Math[_0x1aaf3f(0x6b6)](_0x575c21['PositionX']||0x0),_0x419f9e=Math[_0x1aaf3f(0x6b6)](_0x575c21['PositionY']||0x0),_0x326cbf=Math['round'](_0x575c21[_0x1aaf3f(0x605)]||0x0),_0x44afe6=Math[_0x1aaf3f(0x6b6)](_0x575c21[_0x1aaf3f(0x3e5)]||0x0),_0x279533=Math[_0x1aaf3f(0x6b6)](_0x575c21[_0x1aaf3f(0x3d9)])[_0x1aaf3f(0x1cc)](0x0,0xff),_0x36236f=_0x575c21[_0x1aaf3f(0x2dd)],_0x52d48c='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0x1a256b=_0x33dd09[_0x1aaf3f(0x14f)]?_0x1aaf3f(0x14f):'Pixelated',_0x1633d8=_0x52d48c[_0x1aaf3f(0x5ce)](_0x33dd09[_0x1aaf3f(0x5ea)],_0x1a256b);$gameScreen[_0x1aaf3f(0x239)](_0x337d59,_0x1633d8,_0x49a5d0,_0x47b063,_0x419f9e,_0x326cbf,_0x44afe6,_0x279533,_0x36236f);}),PluginManager[_0xebc2c6(0x68d)](pluginData['name'],_0xebc2c6(0x402),_0x4b31a3=>{const _0x201833=_0xebc2c6;VisuMZ['ConvertParams'](_0x4b31a3,_0x4b31a3);const _0x4ace62=_0x4b31a3['Type']||'random',_0x26a3ad=_0x4b31a3['Power'][_0x201833(0x1cc)](0x1,0x9),_0x5c59f0=_0x4b31a3['Speed'][_0x201833(0x1cc)](0x1,0x9),_0xa58ce4=_0x4b31a3[_0x201833(0x5a5)]||0x1,_0x133c25=_0x4b31a3[_0x201833(0x2b3)];$gameScreen[_0x201833(0x59e)](_0x4ace62),$gameScreen[_0x201833(0x61f)](_0x26a3ad,_0x5c59f0,_0xa58ce4);if(_0x133c25){const _0x3d72b7=$gameTemp[_0x201833(0x472)]();if(_0x3d72b7)_0x3d72b7['wait'](_0xa58ce4);}}),PluginManager[_0xebc2c6(0x68d)](pluginData[_0xebc2c6(0x4d0)],'SwitchRandomizeOne',_0x35a999=>{const _0x403e8c=_0xebc2c6;if($gameParty[_0x403e8c(0xce)]())return;VisuMZ['ConvertParams'](_0x35a999,_0x35a999);const _0x2035dd=_0x35a999[_0x403e8c(0x599)],_0x56f5f2=(_0x35a999[_0x403e8c(0x300)]||0x0)/0x64;for(const _0x1f297e of _0x2035dd){const _0x471d90=Math[_0x403e8c(0x70f)]()<=_0x56f5f2;$gameSwitches['setValue'](_0x1f297e,_0x471d90);}}),PluginManager['registerCommand'](pluginData[_0xebc2c6(0x4d0)],'SwitchRandomizeRange',_0x57f032=>{const _0x353b4d=_0xebc2c6;if($gameParty[_0x353b4d(0xce)]())return;VisuMZ[_0x353b4d(0x516)](_0x57f032,_0x57f032);const _0x1d7fb2=Math['min'](_0x57f032[_0x353b4d(0x637)],_0x57f032[_0x353b4d(0x20b)]),_0x51027c=Math[_0x353b4d(0x631)](_0x57f032[_0x353b4d(0x637)],_0x57f032['EndingID']),_0x3fe6b9=(_0x57f032[_0x353b4d(0x300)]||0x0)/0x64;for(let _0x21fe4d=_0x1d7fb2;_0x21fe4d<=_0x51027c;_0x21fe4d++){const _0x579ce4=Math[_0x353b4d(0x70f)]()<=_0x3fe6b9;$gameSwitches[_0x353b4d(0x2e8)](_0x21fe4d,_0x579ce4);}}),PluginManager['registerCommand'](pluginData['name'],_0xebc2c6(0x10b),_0x535b88=>{const _0x21bfe8=_0xebc2c6;if($gameParty['inBattle']())return;VisuMZ[_0x21bfe8(0x516)](_0x535b88,_0x535b88);const _0x30cbb9=_0x535b88[_0x21bfe8(0x599)];for(const _0x40b162 of _0x30cbb9){const _0x11af61=$gameSwitches[_0x21bfe8(0x308)](_0x40b162);$gameSwitches['setValue'](_0x40b162,!_0x11af61);}}),PluginManager[_0xebc2c6(0x68d)](pluginData[_0xebc2c6(0x4d0)],_0xebc2c6(0xe8),_0x5160dd=>{const _0x3c9aa4=_0xebc2c6;if($gameParty[_0x3c9aa4(0xce)]())return;VisuMZ[_0x3c9aa4(0x516)](_0x5160dd,_0x5160dd);const _0x5636fa=Math[_0x3c9aa4(0x134)](_0x5160dd[_0x3c9aa4(0x637)],_0x5160dd[_0x3c9aa4(0x20b)]),_0x4cdb09=Math[_0x3c9aa4(0x631)](_0x5160dd['StartID'],_0x5160dd[_0x3c9aa4(0x20b)]);for(let _0x31cd68=_0x5636fa;_0x31cd68<=_0x4cdb09;_0x31cd68++){const _0x15b348=$gameSwitches[_0x3c9aa4(0x308)](_0x31cd68);$gameSwitches[_0x3c9aa4(0x2e8)](_0x31cd68,!_0x15b348);}}),PluginManager[_0xebc2c6(0x68d)](pluginData['name'],_0xebc2c6(0x6b1),_0x4cb57a=>{const _0x21fd9a=_0xebc2c6;VisuMZ[_0x21fd9a(0x516)](_0x4cb57a,_0x4cb57a);const _0x3fc2e7=_0x4cb57a[_0x21fd9a(0x39b)]||0x1;$gameSystem['setMainFontSize'](_0x3fc2e7);}),PluginManager['registerCommand'](pluginData[_0xebc2c6(0x4d0)],'SystemSetSideView',_0x17491c=>{const _0x35eeae=_0xebc2c6;if($gameParty[_0x35eeae(0xce)]())return;VisuMZ['ConvertParams'](_0x17491c,_0x17491c);const _0x2ede19=_0x17491c[_0x35eeae(0x39b)];if(_0x2ede19[_0x35eeae(0x3f9)](/Front/i))$gameSystem['setSideView'](![]);else _0x2ede19['match'](/Side/i)?$gameSystem[_0x35eeae(0x437)](!![]):$gameSystem[_0x35eeae(0x437)](!$gameSystem[_0x35eeae(0x220)]());}),PluginManager[_0xebc2c6(0x68d)](pluginData['name'],'SystemLoadAudio',_0x5490f=>{const _0x4835ea=_0xebc2c6;if($gameParty[_0x4835ea(0xce)]())return;VisuMZ[_0x4835ea(0x516)](_0x5490f,_0x5490f);const _0x16e3d2=[_0x4835ea(0x47d),_0x4835ea(0x5c7),'me','se'];for(const _0x5c9faa of _0x16e3d2){const _0x29fdeb=_0x5490f[_0x5c9faa],_0x1d82f8=_0x4835ea(0x58f)[_0x4835ea(0x5ce)](_0x5c9faa);for(const _0x4560d4 of _0x29fdeb){AudioManager[_0x4835ea(0x676)](_0x1d82f8,_0x4560d4);}}}),PluginManager[_0xebc2c6(0x68d)](pluginData[_0xebc2c6(0x4d0)],_0xebc2c6(0x3c7),_0x5a6b65=>{const _0x390b05=_0xebc2c6;if($gameParty[_0x390b05(0xce)]())return;VisuMZ['ConvertParams'](_0x5a6b65,_0x5a6b65);const _0x59fcc4=[_0x390b05(0xcb),_0x390b05(0x592),_0x390b05(0x2ec),_0x390b05(0x130),_0x390b05(0x342),_0x390b05(0x487),_0x390b05(0x60d),_0x390b05(0xec),'sv_actors',_0x390b05(0x701),_0x390b05(0x506),_0x390b05(0x479),_0x390b05(0x415),'titles2'];for(const _0x291386 of _0x59fcc4){const _0x5c3b8c=_0x5a6b65[_0x291386],_0x2577fe=_0x390b05(0x164)[_0x390b05(0x5ce)](_0x291386);for(const _0x2d61eb of _0x5c3b8c){ImageManager[_0x390b05(0x678)](_0x2577fe,_0x2d61eb);}}}),PluginManager[_0xebc2c6(0x68d)](pluginData[_0xebc2c6(0x4d0)],'SystemSetBattleSystem',_0x2ee433=>{const _0x4b94a9=_0xebc2c6;if($gameParty['inBattle']())return;VisuMZ[_0x4b94a9(0x516)](_0x2ee433,_0x2ee433);const _0x381160=_0x2ee433[_0x4b94a9(0x39b)]['toUpperCase']()[_0x4b94a9(0x4d5)](),_0x17b8d7=VisuMZ['CoreEngine']['CreateBattleSystemID'](_0x381160);$gameSystem[_0x4b94a9(0x3fe)](_0x17b8d7);}),VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x569)]=function(_0x1b51dd){const _0x2d14fc=_0xebc2c6;_0x1b51dd=_0x1b51dd||_0x2d14fc(0x6e5),_0x1b51dd=String(_0x1b51dd)[_0x2d14fc(0x70a)]()[_0x2d14fc(0x4d5)]();switch(_0x1b51dd){case _0x2d14fc(0x723):return 0x0;case _0x2d14fc(0x332):Imported[_0x2d14fc(0x43d)]&&(ConfigManager['atbActive']=!![]);return 0x1;case _0x2d14fc(0x4d7):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x2d14fc(0x4e1)]=![]);return 0x2;case _0x2d14fc(0x12b):if(Imported[_0x2d14fc(0x50f)])return _0x2d14fc(0x12b);break;case _0x2d14fc(0x1f6):if(Imported[_0x2d14fc(0x310)])return _0x2d14fc(0x1f6);break;case _0x2d14fc(0x67a):if(Imported[_0x2d14fc(0x5ef)])return _0x2d14fc(0x67a);break;case'FTB':if(Imported[_0x2d14fc(0x348)])return'FTB';break;case'OTB':if(Imported[_0x2d14fc(0x46d)])return _0x2d14fc(0x1b4);break;case _0x2d14fc(0x399):if(Imported[_0x2d14fc(0x5ee)])return _0x2d14fc(0x399);break;case'PTB':if(Imported[_0x2d14fc(0x5f7)])return _0x2d14fc(0xd5);break;}return $dataSystem[_0x2d14fc(0x602)];},PluginManager[_0xebc2c6(0x68d)](pluginData['name'],_0xebc2c6(0x5f0),_0x28101e=>{const _0x552df2=_0xebc2c6;VisuMZ[_0x552df2(0x516)](_0x28101e,_0x28101e);const _0x5ab14e=_0x28101e['option']||0x1;$gameSystem['setWindowPadding'](_0x5ab14e);}),PluginManager[_0xebc2c6(0x68d)](pluginData[_0xebc2c6(0x4d0)],'VariableEvalReference',_0x2653be=>{const _0x1c019c=_0xebc2c6;VisuMZ['ConvertParams'](_0x2653be,_0x2653be);const _0x337904=_0x2653be['id']||0x1,_0x12277b=_0x2653be[_0x1c019c(0x6d8)],_0x45354c=_0x2653be[_0x1c019c(0x3de)]||0x0;let _0x373cdb=$gameVariables['value'](_0x337904)||0x0;switch(_0x12277b){case'=':_0x373cdb=_0x45354c;break;case'+':_0x373cdb+=_0x45354c;break;case'-':_0x373cdb-=_0x45354c;break;case'*':_0x373cdb*=_0x45354c;break;case'/':_0x373cdb/=_0x45354c;break;case'%':_0x373cdb%=_0x45354c;break;}_0x373cdb=_0x373cdb||0x0,$gameVariables['setValue'](_0x337904,_0x373cdb);}),PluginManager[_0xebc2c6(0x68d)](pluginData['name'],_0xebc2c6(0x365),_0x4a389a=>{const _0x4d43f1=_0xebc2c6;VisuMZ[_0x4d43f1(0x516)](_0x4a389a,_0x4a389a);const _0x413f1c=_0x4a389a['id']()||0x1,_0x24753b=_0x4a389a[_0x4d43f1(0x6d8)],_0x5ca090=_0x4a389a[_0x4d43f1(0x3de)]()||0x0;let _0x339a7e=$gameVariables[_0x4d43f1(0x308)](_0x413f1c)||0x0;switch(_0x24753b){case'=':_0x339a7e=_0x5ca090;break;case'+':_0x339a7e+=_0x5ca090;break;case'-':_0x339a7e-=_0x5ca090;break;case'*':_0x339a7e*=_0x5ca090;break;case'/':_0x339a7e/=_0x5ca090;break;case'%':_0x339a7e%=_0x5ca090;break;}_0x339a7e=_0x339a7e||0x0,$gameVariables[_0x4d43f1(0x2e8)](_0x413f1c,_0x339a7e);}),VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x4b3)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0xebc2c6(0x2c3)][_0xebc2c6(0xe5)]=function(){const _0x14dad5=_0xebc2c6;VisuMZ[_0x14dad5(0x71a)]['Scene_Boot_onDatabaseLoaded'][_0x14dad5(0x32f)](this),this['process_VisuMZ_CoreEngine_RegExp'](),this[_0x14dad5(0x430)](),this[_0x14dad5(0x1ae)](),this['process_VisuMZ_CoreEngine_Functions'](),this[_0x14dad5(0xa9)](),this[_0x14dad5(0x30e)](),VisuMZ[_0x14dad5(0x275)]();},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x279)]={},Scene_Boot[_0xebc2c6(0x2c3)][_0xebc2c6(0x317)]=function(){const _0x5e1538=_0xebc2c6,_0x5433c2=['MAXHP','MAXMP',_0x5e1538(0x32a),_0x5e1538(0x5d4),'MAT',_0x5e1538(0x2ea),_0x5e1538(0x137),_0x5e1538(0x17b)],_0x57033f=[_0x5e1538(0x6e6),_0x5e1538(0x5a2),_0x5e1538(0x3c3),'CEV','MEV',_0x5e1538(0x28b),_0x5e1538(0x401),_0x5e1538(0x548),_0x5e1538(0x66d),_0x5e1538(0x1f3)],_0x2854b0=[_0x5e1538(0x151),_0x5e1538(0x4da),_0x5e1538(0x2c1),_0x5e1538(0x86),_0x5e1538(0x545),_0x5e1538(0x17d),_0x5e1538(0x101),'MDR',_0x5e1538(0x610),_0x5e1538(0x29b)],_0x4df834=[_0x5433c2,_0x57033f,_0x2854b0],_0x313a71=[_0x5e1538(0x475),_0x5e1538(0x6a9),_0x5e1538(0x3a7),_0x5e1538(0x1d5),_0x5e1538(0x640),_0x5e1538(0x4d6),_0x5e1538(0x736),'Flat',_0x5e1538(0x49d),_0x5e1538(0x3d4)];for(const _0x2461e1 of _0x4df834){let _0x1b5ad9='';if(_0x2461e1===_0x5433c2)_0x1b5ad9=_0x5e1538(0x3e8);if(_0x2461e1===_0x57033f)_0x1b5ad9=_0x5e1538(0x6cb);if(_0x2461e1===_0x2854b0)_0x1b5ad9='sparam';for(const _0x1efa77 of _0x313a71){let _0x33d2a0=_0x5e1538(0xbb)['format'](_0x1b5ad9,_0x1efa77);VisuMZ[_0x5e1538(0x71a)][_0x5e1538(0x279)][_0x33d2a0]=[],VisuMZ[_0x5e1538(0x71a)][_0x5e1538(0x279)][_0x33d2a0+'JS']=[];let _0x5e5e82='<%1\x20%2:[\x20]';if(['Plus',_0x5e1538(0x16d)][_0x5e1538(0x6f5)](_0x1efa77))_0x5e5e82+=_0x5e1538(0x697);else{if(['Plus1',_0x5e1538(0x49d)][_0x5e1538(0x6f5)](_0x1efa77))_0x5e5e82+=_0x5e1538(0x2ae);else{if([_0x5e1538(0x3a7),_0x5e1538(0x3d4)][_0x5e1538(0x6f5)](_0x1efa77))_0x5e5e82+=_0x5e1538(0xa8);else{if(_0x1efa77===_0x5e1538(0x1d5))_0x5e5e82+=_0x5e1538(0x553);else{if(_0x1efa77===_0x5e1538(0x4d6))_0x5e5e82+=_0x5e1538(0x226);else _0x1efa77==='Rate2'&&(_0x5e5e82+=_0x5e1538(0x51a));}}}}for(const _0x7fdc72 of _0x2461e1){let _0x5f5ac1=_0x1efa77[_0x5e1538(0x613)](/[\d+]/g,'')[_0x5e1538(0x70a)]();const _0x234c68=_0x5e5e82[_0x5e1538(0x5ce)](_0x7fdc72,_0x5f5ac1);VisuMZ[_0x5e1538(0x71a)]['RegExp'][_0x33d2a0][_0x5e1538(0x710)](new RegExp(_0x234c68,'i'));const _0x1b251f=_0x5e1538(0x153)[_0x5e1538(0x5ce)](_0x7fdc72,_0x5f5ac1);VisuMZ[_0x5e1538(0x71a)][_0x5e1538(0x279)][_0x33d2a0+'JS'][_0x5e1538(0x710)](new RegExp(_0x1b251f,'i'));}}}},Scene_Boot[_0xebc2c6(0x2c3)][_0xebc2c6(0x430)]=function(){const _0x81cfc=_0xebc2c6;if(VisuMZ[_0x81cfc(0x275)])return;},Scene_Boot[_0xebc2c6(0x2c3)]['process_VisuMZ_CoreEngine_Settings']=function(){const _0x188cf6=_0xebc2c6,_0x5ebe41=VisuMZ[_0x188cf6(0x71a)][_0x188cf6(0x74)];_0x5ebe41[_0x188cf6(0x4b2)][_0x188cf6(0x383)]&&VisuMZ[_0x188cf6(0x6ab)](!![]);_0x5ebe41['QoL'][_0x188cf6(0x14d)]&&(Input[_0x188cf6(0xd7)][0x23]=_0x188cf6(0x33e),Input[_0x188cf6(0xd7)][0x24]=_0x188cf6(0x59b));if(_0x5ebe41[_0x188cf6(0x642)]){const _0x2e5b13=_0x5ebe41[_0x188cf6(0x642)];_0x2e5b13[_0x188cf6(0x577)]=_0x2e5b13[_0x188cf6(0x577)]||_0x188cf6(0x117),_0x2e5b13[_0x188cf6(0x71c)]=_0x2e5b13['KeyTAB']||_0x188cf6(0x262);}_0x5ebe41[_0x188cf6(0x464)][_0x188cf6(0x35b)]&&(Input[_0x188cf6(0xd7)][0x57]='up',Input['keyMapper'][0x41]=_0x188cf6(0x4b0),Input[_0x188cf6(0xd7)][0x53]='down',Input[_0x188cf6(0xd7)][0x44]=_0x188cf6(0x63b),Input['keyMapper'][0x45]='pagedown'),_0x5ebe41['KeyboardInput'][_0x188cf6(0x73b)]&&(Input[_0x188cf6(0xd7)][0x52]=_0x188cf6(0x601)),_0x5ebe41[_0x188cf6(0x4c8)][_0x188cf6(0x5de)]=_0x5ebe41['Param']['DisplayedParams'][_0x188cf6(0x2d8)](_0x55aaaf=>_0x55aaaf[_0x188cf6(0x70a)]()[_0x188cf6(0x4d5)]()),_0x5ebe41[_0x188cf6(0x4c8)]['ExtDisplayedParams']=_0x5ebe41[_0x188cf6(0x4c8)][_0x188cf6(0x4e4)][_0x188cf6(0x2d8)](_0x5213b5=>_0x5213b5[_0x188cf6(0x70a)]()[_0x188cf6(0x4d5)]());},Scene_Boot['prototype'][_0xebc2c6(0xb9)]=function(){const _0x1060de=_0xebc2c6;this[_0x1060de(0x542)]();},Scene_Boot['prototype'][_0xebc2c6(0x542)]=function(){const _0x23a6e5=_0xebc2c6,_0x3646b6=VisuMZ[_0x23a6e5(0x71a)][_0x23a6e5(0x74)][_0x23a6e5(0x72c)];for(const _0x5bd3f6 of _0x3646b6){const _0x27f3bd=_0x5bd3f6[_0x23a6e5(0x22d)][_0x23a6e5(0x613)](/[ ]/g,''),_0x1dd4f6=_0x5bd3f6['CodeJS'];VisuMZ[_0x23a6e5(0x71a)][_0x23a6e5(0x2ad)](_0x27f3bd,_0x1dd4f6);}},VisuMZ[_0xebc2c6(0x71a)]['createJsQuickFunction']=function(_0x244745,_0xb6bc8){const _0x5caef7=_0xebc2c6;if(!!window[_0x244745]){if($gameTemp[_0x5caef7(0x72d)]())console[_0x5caef7(0x242)]('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'['format'](_0x244745));}const _0xa444c0=_0x5caef7(0x1b9)[_0x5caef7(0x5ce)](_0x244745,_0xb6bc8);window[_0x244745]=new Function(_0xa444c0);},Scene_Boot[_0xebc2c6(0x2c3)][_0xebc2c6(0xa9)]=function(){const _0x1a337d=_0xebc2c6,_0x5c5e8e=VisuMZ[_0x1a337d(0x71a)]['Settings'][_0x1a337d(0x4f6)];if(!_0x5c5e8e)return;for(const _0x57117d of _0x5c5e8e){if(!_0x57117d)continue;VisuMZ[_0x1a337d(0x71a)][_0x1a337d(0x1c6)](_0x57117d);}},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x290)]={},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x49b)]={},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x689)]={},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x4ee)]={},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x1c6)]=function(_0x195251){const _0x4e47d7=_0xebc2c6,_0x4ce28e=_0x195251[_0x4e47d7(0x139)],_0x58774d=_0x195251['ParamName'],_0x517049=_0x195251[_0x4e47d7(0x1ca)],_0x416d5d=_0x195251[_0x4e47d7(0x6c5)],_0x4e7382=new Function(_0x195251[_0x4e47d7(0x3e3)]);VisuMZ[_0x4e47d7(0x71a)]['CustomParamNames'][_0x4ce28e[_0x4e47d7(0x70a)]()[_0x4e47d7(0x4d5)]()]=_0x58774d,VisuMZ[_0x4e47d7(0x71a)][_0x4e47d7(0x49b)][_0x4ce28e['toUpperCase']()['trim']()]=_0x517049,VisuMZ[_0x4e47d7(0x71a)][_0x4e47d7(0x689)][_0x4ce28e['toUpperCase']()[_0x4e47d7(0x4d5)]()]=_0x416d5d,VisuMZ[_0x4e47d7(0x71a)][_0x4e47d7(0x4ee)][_0x4ce28e['toUpperCase']()['trim']()]=_0x4ce28e,Object['defineProperty'](Game_BattlerBase[_0x4e47d7(0x2c3)],_0x4ce28e,{'get'(){const _0x183131=_0x4e47d7,_0x6210f1=_0x4e7382[_0x183131(0x32f)](this);return _0x416d5d===_0x183131(0x621)?Math[_0x183131(0x6b6)](_0x6210f1):_0x6210f1;}});},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x398)]={},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x692)]={},Scene_Boot[_0xebc2c6(0x2c3)][_0xebc2c6(0x30e)]=function(){const _0x12665e=_0xebc2c6,_0x3de4e7=VisuMZ[_0x12665e(0x71a)]['Settings'][_0x12665e(0x398)];for(const _0x28df76 of _0x3de4e7){const _0x5c71c4=(_0x28df76[_0x12665e(0x6db)]||'')['toLowerCase']()[_0x12665e(0x4d5)](),_0x5238a8=(_0x28df76[_0x12665e(0xc9)]||'')[_0x12665e(0x281)]()[_0x12665e(0x4d5)]();VisuMZ[_0x12665e(0x71a)][_0x12665e(0x398)][_0x5c71c4]=_0x28df76,VisuMZ['CoreEngine'][_0x12665e(0x692)][_0x5238a8]=_0x5c71c4;}},VisuMZ[_0xebc2c6(0x275)]=function(){const _0xe7a25e=_0xebc2c6;for(const _0x167b5f of $dataActors){if(_0x167b5f)VisuMZ[_0xe7a25e(0x12c)](_0x167b5f);}for(const _0x11382a of $dataClasses){if(_0x11382a)VisuMZ[_0xe7a25e(0x406)](_0x11382a);}for(const _0x4c5c8a of $dataSkills){if(_0x4c5c8a)VisuMZ[_0xe7a25e(0x20e)](_0x4c5c8a);}for(const _0x537442 of $dataItems){if(_0x537442)VisuMZ[_0xe7a25e(0x19c)](_0x537442);}for(const _0x29d3aa of $dataWeapons){if(_0x29d3aa)VisuMZ[_0xe7a25e(0xa3)](_0x29d3aa);}for(const _0xd30e3a of $dataArmors){if(_0xd30e3a)VisuMZ[_0xe7a25e(0x224)](_0xd30e3a);}for(const _0x82bc52 of $dataEnemies){if(_0x82bc52)VisuMZ[_0xe7a25e(0x21b)](_0x82bc52);}for(const _0x415460 of $dataStates){if(_0x415460)VisuMZ[_0xe7a25e(0x691)](_0x415460);}for(const _0x435538 of $dataTilesets){if(_0x435538)VisuMZ[_0xe7a25e(0x12d)](_0x435538);}},VisuMZ[_0xebc2c6(0x12c)]=function(_0x384f68){},VisuMZ[_0xebc2c6(0x406)]=function(_0x447761){},VisuMZ[_0xebc2c6(0x20e)]=function(_0x329845){},VisuMZ[_0xebc2c6(0x19c)]=function(_0x418f15){},VisuMZ[_0xebc2c6(0xa3)]=function(_0x2b64b1){},VisuMZ[_0xebc2c6(0x224)]=function(_0x323fef){},VisuMZ[_0xebc2c6(0x21b)]=function(_0x1bfdcc){},VisuMZ['ParseStateNotetags']=function(_0x16196e){},VisuMZ[_0xebc2c6(0x12d)]=function(_0x2e4e3f){},VisuMZ[_0xebc2c6(0x71a)]['ParseActorNotetags']=VisuMZ[_0xebc2c6(0x12c)],VisuMZ[_0xebc2c6(0x12c)]=function(_0xe9ce89){const _0x2d4bb3=_0xebc2c6;VisuMZ['CoreEngine'][_0x2d4bb3(0x12c)]['call'](this,_0xe9ce89);const _0x4b8fd3=_0xe9ce89[_0x2d4bb3(0x2f7)];if(_0x4b8fd3['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0xe9ce89[_0x2d4bb3(0x5f6)]=Number(RegExp['$1']);if(_0xe9ce89[_0x2d4bb3(0x5f6)]===0x0)_0xe9ce89[_0x2d4bb3(0x5f6)]=Number[_0x2d4bb3(0x368)];}_0x4b8fd3[_0x2d4bb3(0x3f9)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0xe9ce89[_0x2d4bb3(0x283)]=Math[_0x2d4bb3(0x134)](Number(RegExp['$1']),_0xe9ce89[_0x2d4bb3(0x5f6)]));},VisuMZ['CoreEngine'][_0xebc2c6(0x406)]=VisuMZ['ParseClassNotetags'],VisuMZ['ParseClassNotetags']=function(_0x2761a0){const _0x1294f3=_0xebc2c6;VisuMZ[_0x1294f3(0x71a)][_0x1294f3(0x406)][_0x1294f3(0x32f)](this,_0x2761a0);if(_0x2761a0[_0x1294f3(0x731)])for(const _0x2542ce of _0x2761a0['learnings']){_0x2542ce[_0x1294f3(0x2f7)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x2542ce[_0x1294f3(0x15d)]=Math['max'](Number(RegExp['$1']),0x1));}},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x21b)]=VisuMZ[_0xebc2c6(0x21b)],VisuMZ[_0xebc2c6(0x21b)]=function(_0x2ea97c){const _0x125053=_0xebc2c6;VisuMZ['CoreEngine']['ParseEnemyNotetags'][_0x125053(0x32f)](this,_0x2ea97c),_0x2ea97c[_0x125053(0x15d)]=0x1;const _0x1b2a66=_0x2ea97c['note'];if(_0x1b2a66[_0x125053(0x3f9)](/<LEVEL:[ ](\d+)>/i))_0x2ea97c[_0x125053(0x15d)]=Number(RegExp['$1']);if(_0x1b2a66[_0x125053(0x3f9)](/<MAXHP:[ ](\d+)>/i))_0x2ea97c[_0x125053(0x9a)][0x0]=Number(RegExp['$1']);if(_0x1b2a66[_0x125053(0x3f9)](/<MAXMP:[ ](\d+)>/i))_0x2ea97c[_0x125053(0x9a)][0x1]=Number(RegExp['$1']);if(_0x1b2a66[_0x125053(0x3f9)](/<ATK:[ ](\d+)>/i))_0x2ea97c[_0x125053(0x9a)][0x2]=Number(RegExp['$1']);if(_0x1b2a66['match'](/<DEF:[ ](\d+)>/i))_0x2ea97c[_0x125053(0x9a)][0x3]=Number(RegExp['$1']);if(_0x1b2a66[_0x125053(0x3f9)](/<MAT:[ ](\d+)>/i))_0x2ea97c[_0x125053(0x9a)][0x4]=Number(RegExp['$1']);if(_0x1b2a66[_0x125053(0x3f9)](/<MDF:[ ](\d+)>/i))_0x2ea97c[_0x125053(0x9a)][0x5]=Number(RegExp['$1']);if(_0x1b2a66[_0x125053(0x3f9)](/<AGI:[ ](\d+)>/i))_0x2ea97c['params'][0x6]=Number(RegExp['$1']);if(_0x1b2a66[_0x125053(0x3f9)](/<LUK:[ ](\d+)>/i))_0x2ea97c['params'][0x7]=Number(RegExp['$1']);if(_0x1b2a66[_0x125053(0x3f9)](/<EXP:[ ](\d+)>/i))_0x2ea97c[_0x125053(0x37c)]=Number(RegExp['$1']);if(_0x1b2a66['match'](/<GOLD:[ ](\d+)>/i))_0x2ea97c[_0x125053(0x44a)]=Number(RegExp['$1']);},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x438)]=Graphics['_defaultStretchMode'],Graphics[_0xebc2c6(0x410)]=function(){const _0x27ceab=_0xebc2c6;switch(VisuMZ[_0x27ceab(0x71a)][_0x27ceab(0x74)][_0x27ceab(0x4b2)][_0x27ceab(0xc1)]){case _0x27ceab(0x457):return!![];case _0x27ceab(0x33f):return![];default:return VisuMZ['CoreEngine'][_0x27ceab(0x438)]['call'](this);}},VisuMZ['CoreEngine'][_0xebc2c6(0x5b6)]=Graphics[_0xebc2c6(0x40b)],Graphics['printError']=function(_0x213ede,_0x53973b,_0x8d829=null){const _0xe7b340=_0xebc2c6;VisuMZ[_0xe7b340(0x71a)][_0xe7b340(0x5b6)]['call'](this,_0x213ede,_0x53973b,_0x8d829),VisuMZ[_0xe7b340(0x6ab)](![]);},VisuMZ[_0xebc2c6(0x71a)]['Graphics_centerElement']=Graphics['_centerElement'],Graphics['_centerElement']=function(_0x54bdb7){const _0x491cf8=_0xebc2c6;VisuMZ[_0x491cf8(0x71a)][_0x491cf8(0x1ee)][_0x491cf8(0x32f)](this,_0x54bdb7),this['_centerElementCoreEngine'](_0x54bdb7);},Graphics['_centerElementCoreEngine']=function(_0x4f3ac7){const _0x554835=_0xebc2c6;VisuMZ[_0x554835(0x71a)][_0x554835(0x74)]['QoL']['FontSmoothing']&&(_0x4f3ac7[_0x554835(0x617)][_0x554835(0x4c9)]=_0x554835(0x474));VisuMZ['CoreEngine'][_0x554835(0x74)][_0x554835(0x4b2)][_0x554835(0xf0)]&&(_0x4f3ac7[_0x554835(0x617)][_0x554835(0x49f)]='pixelated');const _0xdba8d8=Math[_0x554835(0x631)](0x0,Math[_0x554835(0x125)](_0x4f3ac7['width']*this[_0x554835(0x5e5)])),_0x5d985a=Math[_0x554835(0x631)](0x0,Math[_0x554835(0x125)](_0x4f3ac7[_0x554835(0x102)]*this[_0x554835(0x5e5)]));_0x4f3ac7[_0x554835(0x617)][_0x554835(0x20a)]=_0xdba8d8+'px',_0x4f3ac7[_0x554835(0x617)]['height']=_0x5d985a+'px';},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x380)]=Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x1dd)],Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x1dd)]=function(_0x105f11,_0x2c6571){const _0x1afe53=_0xebc2c6;VisuMZ['CoreEngine'][_0x1afe53(0x380)][_0x1afe53(0x32f)](this,_0x105f11,_0x2c6571),this['_smooth']=!(VisuMZ[_0x1afe53(0x71a)][_0x1afe53(0x74)][_0x1afe53(0x4b2)][_0x1afe53(0xf0)]??!![]);},Bitmap[_0xebc2c6(0x2c3)]['markCoreEngineModified']=function(){const _0x1b442d=_0xebc2c6;this[_0x1b442d(0x2b9)]=!![];},VisuMZ['CoreEngine'][_0xebc2c6(0x679)]=Sprite['prototype'][_0xebc2c6(0x5d3)],Sprite['prototype'][_0xebc2c6(0x5d3)]=function(){const _0x54a206=_0xebc2c6;VisuMZ[_0x54a206(0x71a)][_0x54a206(0x679)][_0x54a206(0x32f)](this),this[_0x54a206(0x61c)]();},Sprite[_0xebc2c6(0x2c3)][_0xebc2c6(0x61c)]=function(){const _0x49f05c=_0xebc2c6;if(!this['bitmap'])return;if(!this[_0x49f05c(0x2d3)][_0x49f05c(0x2b9)])return;this[_0x49f05c(0x2d3)][_0x49f05c(0x330)]&&!this[_0x49f05c(0x62e)][_0x49f05c(0x330)]['destroyed']&&this[_0x49f05c(0x2d3)][_0x49f05c(0x5d3)]();},VisuMZ['CoreEngine'][_0xebc2c6(0x13f)]=Bitmap[_0xebc2c6(0x2c3)]['resize'],Bitmap['prototype'][_0xebc2c6(0x4d8)]=function(_0x3a4166,_0x17c7fa){const _0x599385=_0xebc2c6;VisuMZ[_0x599385(0x71a)]['Bitmap_resize'][_0x599385(0x32f)](this,_0x3a4166,_0x17c7fa),this['markCoreEngineModified']();},VisuMZ[_0xebc2c6(0x71a)]['Bitmap_blt']=Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x1a7)],Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x1a7)]=function(_0x5b0e06,_0x3e953c,_0x2de2d1,_0x32f5c5,_0x3cfc6e,_0x6d4cbb,_0xc53f54,_0x161924,_0xe5d634){const _0x272e04=_0xebc2c6;_0x3e953c=Math[_0x272e04(0x6b6)](_0x3e953c),_0x2de2d1=Math[_0x272e04(0x6b6)](_0x2de2d1),_0x32f5c5=Math[_0x272e04(0x6b6)](_0x32f5c5),_0x3cfc6e=Math[_0x272e04(0x6b6)](_0x3cfc6e),_0x6d4cbb=Math[_0x272e04(0x6b6)](_0x6d4cbb),_0xc53f54=Math[_0x272e04(0x6b6)](_0xc53f54),VisuMZ[_0x272e04(0x71a)][_0x272e04(0x63c)][_0x272e04(0x32f)](this,_0x5b0e06,_0x3e953c,_0x2de2d1,_0x32f5c5,_0x3cfc6e,_0x6d4cbb,_0xc53f54,_0x161924,_0xe5d634),this['markCoreEngineModified']();},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x55a)]=Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x34f)],Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x34f)]=function(_0x553a66,_0x20a62c,_0xe00f07,_0x971d3d){const _0x5b7a2e=_0xebc2c6;VisuMZ[_0x5b7a2e(0x71a)][_0x5b7a2e(0x55a)]['call'](this,_0x553a66,_0x20a62c,_0xe00f07,_0x971d3d),this[_0x5b7a2e(0x593)]();},VisuMZ['CoreEngine']['Bitmap_fillRect']=Bitmap[_0xebc2c6(0x2c3)]['fillRect'],Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x11e)]=function(_0x5df9e3,_0x510c97,_0xe7ec,_0x4ba4df,_0x56df23){const _0x1a101a=_0xebc2c6;VisuMZ['CoreEngine']['Bitmap_fillRect'][_0x1a101a(0x32f)](this,_0x5df9e3,_0x510c97,_0xe7ec,_0x4ba4df,_0x56df23),this[_0x1a101a(0x593)]();},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x2e9)]=Bitmap['prototype'][_0xebc2c6(0x73a)],Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x73a)]=function(_0x53064d,_0x5c17f7,_0x3bb3f0,_0x3d46e3,_0x593685){const _0xae52b8=_0xebc2c6;VisuMZ[_0xae52b8(0x71a)][_0xae52b8(0x2e9)][_0xae52b8(0x32f)](this,_0x53064d,_0x5c17f7,_0x3bb3f0,_0x3d46e3,_0x593685),this[_0xae52b8(0x593)]();},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0xfb)]=Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x10c)],Bitmap[_0xebc2c6(0x2c3)]['gradientFillRect']=function(_0x203b35,_0x383cc0,_0x40ab52,_0x40901e,_0x13f713,_0x4d93b1,_0x42349e){const _0x2cb59f=_0xebc2c6;VisuMZ[_0x2cb59f(0x71a)][_0x2cb59f(0xfb)]['call'](this,_0x203b35,_0x383cc0,_0x40ab52,_0x40901e,_0x13f713,_0x4d93b1,_0x42349e),this[_0x2cb59f(0x593)]();},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x3f2)]=Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x19d)],Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x19d)]=function(_0x3c0ab5,_0x509ae3,_0x19fa61,_0x3e98e0){const _0x51a001=_0xebc2c6;_0x3c0ab5=Math[_0x51a001(0x6b6)](_0x3c0ab5),_0x509ae3=Math['round'](_0x509ae3),_0x19fa61=Math[_0x51a001(0x6b6)](_0x19fa61),VisuMZ[_0x51a001(0x71a)][_0x51a001(0x3f2)][_0x51a001(0x32f)](this,_0x3c0ab5,_0x509ae3,_0x19fa61,_0x3e98e0),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0xebc2c6(0x46b)]=Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x424)],Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x424)]=function(_0x482411){const _0x526b3d=_0xebc2c6;return Math['ceil'](VisuMZ[_0x526b3d(0x71a)][_0x526b3d(0x46b)][_0x526b3d(0x32f)](this,_0x482411));},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x56a)]=Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x109)],Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x109)]=function(_0x574a86,_0x434d6a,_0x3396b9,_0xb668a9,_0x3cfa04,_0x24763f){const _0x4185a6=_0xebc2c6;_0x434d6a=Math['round'](_0x434d6a),_0x3396b9=Math['round'](_0x3396b9),_0xb668a9=Math[_0x4185a6(0x6b6)](_0xb668a9),_0x3cfa04=Math[_0x4185a6(0x6b6)](_0x3cfa04),VisuMZ[_0x4185a6(0x71a)]['Bitmap_drawText']['call'](this,_0x574a86,_0x434d6a,_0x3396b9,_0xb668a9,_0x3cfa04,_0x24763f),this[_0x4185a6(0x593)]();},VisuMZ['CoreEngine']['Bitmap_drawTextOutline']=Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x681)],Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x681)]=function(_0x59e853,_0x79fb2f,_0x401a95,_0x81c3d2){const _0x4b9b39=_0xebc2c6;VisuMZ['CoreEngine'][_0x4b9b39(0x74)][_0x4b9b39(0x4b2)]['FontShadows']?this['_drawTextShadow'](_0x59e853,_0x79fb2f,_0x401a95,_0x81c3d2):VisuMZ[_0x4b9b39(0x71a)][_0x4b9b39(0x1b7)][_0x4b9b39(0x32f)](this,_0x59e853,_0x79fb2f,_0x401a95,_0x81c3d2);},Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x4ac)]=function(_0x42c9a3,_0x5b27a0,_0x50f606,_0x86ef6b){const _0x1e864b=_0xebc2c6,_0x1ed742=this[_0x1e864b(0x54b)];_0x1ed742['fillStyle']=this[_0x1e864b(0x2c7)],_0x1ed742[_0x1e864b(0x3d1)](_0x42c9a3,_0x5b27a0+0x2,_0x50f606+0x2,_0x86ef6b);},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x4f1)]=Input[_0xebc2c6(0x6c0)],Input['clear']=function(){const _0x26e8b5=_0xebc2c6;VisuMZ[_0x26e8b5(0x71a)]['Input_clear'][_0x26e8b5(0x32f)](this),this['_inputString']=undefined,this[_0x26e8b5(0x422)]=undefined,this[_0x26e8b5(0x666)]=Input['keyRepeatWait'];},VisuMZ['CoreEngine']['Input_update']=Input[_0xebc2c6(0x3a8)],Input[_0xebc2c6(0x3a8)]=function(){const _0x436da8=_0xebc2c6;VisuMZ[_0x436da8(0x71a)]['Input_update']['call'](this);if(this[_0x436da8(0x666)])this[_0x436da8(0x666)]--;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0xca)]=Input[_0xebc2c6(0x319)],Input['_pollGamepads']=function(){const _0x502b81=_0xebc2c6;if(this[_0x502b81(0x666)])return;VisuMZ[_0x502b81(0x71a)][_0x502b81(0xca)][_0x502b81(0x32f)](this);},VisuMZ[_0xebc2c6(0x71a)]['Input_setupEventHandlers']=Input[_0xebc2c6(0x3e1)],Input[_0xebc2c6(0x3e1)]=function(){const _0x504467=_0xebc2c6;VisuMZ['CoreEngine']['Input_setupEventHandlers'][_0x504467(0x32f)](this),document[_0x504467(0x70e)](_0x504467(0x5fa),this[_0x504467(0x5a0)][_0x504467(0x563)](this));},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x4eb)]=Input['_onKeyDown'],Input[_0xebc2c6(0x578)]=function(_0x42d662){const _0x36c48f=_0xebc2c6;this[_0x36c48f(0x422)]=_0x42d662[_0x36c48f(0x5ac)],VisuMZ[_0x36c48f(0x71a)][_0x36c48f(0x4eb)][_0x36c48f(0x32f)](this,_0x42d662),this[_0x36c48f(0xaa)](null);},Input[_0xebc2c6(0x5a0)]=function(_0x4afeb4){const _0x597023=_0xebc2c6;this[_0x597023(0x15a)](_0x4afeb4);},Input[_0xebc2c6(0x15a)]=function(_0xa2d30d){const _0x2d2e9c=_0xebc2c6;this[_0x2d2e9c(0x422)]=_0xa2d30d[_0x2d2e9c(0x5ac)];let _0xb1976b=String[_0x2d2e9c(0x614)](_0xa2d30d[_0x2d2e9c(0x155)]);this['_inputString']===undefined?this[_0x2d2e9c(0x203)]=_0xb1976b:this['_inputString']+=_0xb1976b;},VisuMZ[_0xebc2c6(0x71a)]['Input_shouldPreventDefault']=Input[_0xebc2c6(0x37b)],Input[_0xebc2c6(0x37b)]=function(_0x4d973d){const _0x146f5c=_0xebc2c6;if(_0x4d973d===0x8)return![];return VisuMZ[_0x146f5c(0x71a)][_0x146f5c(0x44b)][_0x146f5c(0x32f)](this,_0x4d973d);},Input[_0xebc2c6(0x707)]=function(_0x4b45a1){const _0x2d3a23=_0xebc2c6;if(_0x4b45a1['match'](/backspace/i))return this[_0x2d3a23(0x422)]===0x8;if(_0x4b45a1['match'](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0x4b45a1[_0x2d3a23(0x3f9)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0xebc2c6(0x67c)]=function(){const _0x219ba8=_0xebc2c6;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x219ba8(0x57b)](this['_inputSpecialKeyCode']);},Input[_0xebc2c6(0x2fc)]=function(){const _0x1915e9=_0xebc2c6;return[0x25,0x26,0x27,0x28][_0x1915e9(0x57b)](this[_0x1915e9(0x422)]);},Input[_0xebc2c6(0x1ea)]=function(){const _0x1607b3=_0xebc2c6;if(navigator[_0x1607b3(0xb8)]){const _0x44c98c=navigator[_0x1607b3(0xb8)]();if(_0x44c98c)for(const _0x3ccc94 of _0x44c98c){if(_0x3ccc94&&_0x3ccc94[_0x1607b3(0x4a7)])return!![];}}return![];},Input[_0xebc2c6(0x6af)]=function(){const _0xf6ec30=_0xebc2c6;if(navigator[_0xf6ec30(0xb8)]){const _0x518763=navigator[_0xf6ec30(0xb8)]();if(_0x518763)for(const _0x10b471 of _0x518763){if(_0x10b471&&_0x10b471[_0xf6ec30(0x4a7)]){if(this[_0xf6ec30(0x38e)](_0x10b471))return!![];if(this[_0xf6ec30(0x4e0)](_0x10b471))return!![];}}}return![];},Input[_0xebc2c6(0x38e)]=function(_0xb3eef9){const _0x262c59=_0xebc2c6,_0x5b30ab=_0xb3eef9[_0x262c59(0x307)];for(let _0x43cfbd=0x0;_0x43cfbd<_0x5b30ab['length'];_0x43cfbd++){if(_0x5b30ab[_0x43cfbd]['pressed'])return!![];}return![];},Input[_0xebc2c6(0x4e0)]=function(_0x5a82d0){const _0x1a9b9a=_0xebc2c6,_0x5c2ce6=_0x5a82d0[_0x1a9b9a(0x6e9)],_0x50970e=0.5;if(_0x5c2ce6[0x0]<-_0x50970e)return!![];if(_0x5c2ce6[0x0]>_0x50970e)return!![];if(_0x5c2ce6[0x1]<-_0x50970e)return!![];if(_0x5c2ce6[0x1]>_0x50970e)return!![];return![];},Input['getLastGamepadUsed']=function(){const _0x549e1e=_0xebc2c6;return this[_0x549e1e(0x304)]||null;},Input['setLastGamepadUsed']=function(_0x1812a2){const _0x18a0e9=_0xebc2c6;this[_0x18a0e9(0x304)]=_0x1812a2;},VisuMZ[_0xebc2c6(0x71a)]['Input_updateGamepadState']=Input[_0xebc2c6(0x408)],Input['_updateGamepadState']=function(_0x483ec4){const _0x3ffd0a=_0xebc2c6;VisuMZ[_0x3ffd0a(0x71a)][_0x3ffd0a(0x729)][_0x3ffd0a(0x32f)](this,_0x483ec4),(this[_0x3ffd0a(0x38e)](_0x483ec4)||this[_0x3ffd0a(0x4e0)](_0x483ec4))&&this[_0x3ffd0a(0xaa)](_0x483ec4);},Input[_0xebc2c6(0x2a5)]=function(){const _0x1d6097=_0xebc2c6;return this['_lastGamepad']?this[_0x1d6097(0x304)]['id']:_0x1d6097(0x105);},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x9c)]=Tilemap[_0xebc2c6(0x2c3)][_0xebc2c6(0x23e)],Tilemap[_0xebc2c6(0x2c3)][_0xebc2c6(0x23e)]=function(_0x5ad895,_0x5c41da,_0x20141d,_0x252346){const _0x1157cf=_0xebc2c6;if($gameMap&&$gameMap[_0x1157cf(0x5e9)]())return;VisuMZ['CoreEngine'][_0x1157cf(0x9c)][_0x1157cf(0x32f)](this,_0x5ad895,_0x5c41da,_0x20141d,_0x252346);},Tilemap[_0xebc2c6(0x3d8)][_0xebc2c6(0x2c3)][_0xebc2c6(0x3f1)]=function(){const _0x3a51ec=_0xebc2c6;this[_0x3a51ec(0x485)]();for(let _0x49ad27=0x0;_0x49ad27<Tilemap['Layer'][_0x3a51ec(0x361)];_0x49ad27++){const _0xd6167e=new PIXI[(_0x3a51ec(0x295))]();_0xd6167e[_0x3a51ec(0x528)](0x800,0x800),VisuMZ[_0x3a51ec(0x71a)]['Settings']['QoL'][_0x3a51ec(0xf0)]&&(_0xd6167e[_0x3a51ec(0x384)]=PIXI[_0x3a51ec(0x98)][_0x3a51ec(0x699)]),this['_internalTextures'][_0x3a51ec(0x710)](_0xd6167e);}},WindowLayer[_0xebc2c6(0x2c3)][_0xebc2c6(0x4f7)]=function(){const _0x5008d0=_0xebc2c6;return SceneManager&&SceneManager[_0x5008d0(0x4e5)]?SceneManager[_0x5008d0(0x4e5)]['isWindowMaskingEnabled']():!![];},VisuMZ['CoreEngine'][_0xebc2c6(0x237)]=WindowLayer[_0xebc2c6(0x2c3)][_0xebc2c6(0x2ee)],WindowLayer[_0xebc2c6(0x2c3)][_0xebc2c6(0x2ee)]=function render(_0x36e170){const _0x1afad2=_0xebc2c6;this[_0x1afad2(0x4f7)]()?VisuMZ[_0x1afad2(0x71a)][_0x1afad2(0x237)][_0x1afad2(0x32f)](this,_0x36e170):this[_0x1afad2(0x82)](_0x36e170);},WindowLayer[_0xebc2c6(0x2c3)]['renderNoMask']=function render(_0x25f441){const _0x161c1f=_0xebc2c6;if(!this[_0x161c1f(0x5e8)])return;const _0x31c083=new PIXI['Graphics'](),_0x44735f=_0x25f441['gl'],_0xb8e75e=this[_0x161c1f(0xea)][_0x161c1f(0x216)]();_0x25f441[_0x161c1f(0x638)][_0x161c1f(0xf9)](),_0x31c083[_0x161c1f(0x208)]=this[_0x161c1f(0x208)],_0x25f441[_0x161c1f(0x708)]['flush'](),_0x44735f[_0x161c1f(0x585)](_0x44735f[_0x161c1f(0x715)]);while(_0xb8e75e[_0x161c1f(0x749)]>0x0){const _0x78a2=_0xb8e75e[_0x161c1f(0x2d0)]();_0x78a2['_isWindow']&&_0x78a2[_0x161c1f(0x5e8)]&&_0x78a2[_0x161c1f(0x567)]>0x0&&(_0x44735f['stencilFunc'](_0x44735f[_0x161c1f(0x1f0)],0x0,~0x0),_0x44735f[_0x161c1f(0x228)](_0x44735f[_0x161c1f(0x115)],_0x44735f['KEEP'],_0x44735f['KEEP']),_0x78a2['render'](_0x25f441),_0x25f441['batch'][_0x161c1f(0x583)](),_0x31c083[_0x161c1f(0x6c0)](),_0x44735f[_0x161c1f(0x541)](_0x44735f[_0x161c1f(0x6ad)],0x1,~0x0),_0x44735f[_0x161c1f(0x228)](_0x44735f['REPLACE'],_0x44735f['REPLACE'],_0x44735f['REPLACE']),_0x44735f[_0x161c1f(0x1b0)](_0x44735f[_0x161c1f(0x76)],_0x44735f[_0x161c1f(0x423)]),_0x31c083[_0x161c1f(0x2ee)](_0x25f441),_0x25f441[_0x161c1f(0x708)][_0x161c1f(0x583)](),_0x44735f[_0x161c1f(0x1b0)](_0x44735f[_0x161c1f(0x423)],_0x44735f[_0x161c1f(0x23d)]));}_0x44735f['disable'](_0x44735f['STENCIL_TEST']),_0x44735f[_0x161c1f(0x6c0)](_0x44735f[_0x161c1f(0x450)]),_0x44735f[_0x161c1f(0x97)](0x0),_0x25f441[_0x161c1f(0x708)][_0x161c1f(0x583)]();for(const _0x71f687 of this[_0x161c1f(0xea)]){!_0x71f687[_0x161c1f(0x722)]&&_0x71f687[_0x161c1f(0x5e8)]&&_0x71f687[_0x161c1f(0x2ee)](_0x25f441);}_0x25f441[_0x161c1f(0x708)][_0x161c1f(0x583)]();},DataManager[_0xebc2c6(0x81)]=function(_0x2be248){const _0x250776=_0xebc2c6;return this[_0x250776(0xa2)](_0x2be248)&&_0x2be248[_0x250776(0x711)]===0x2;},VisuMZ['CoreEngine'][_0xebc2c6(0x6aa)]=DataManager['setupNewGame'],DataManager[_0xebc2c6(0x6d3)]=function(){const _0x23d7cb=_0xebc2c6;VisuMZ['CoreEngine'][_0x23d7cb(0x6aa)]['call'](this),this[_0x23d7cb(0xb2)](),this['reserveNewGameCommonEvent']();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x4848e9=_0xebc2c6;if($gameTemp[_0x4848e9(0x72d)]()){const _0x3f624a=VisuMZ[_0x4848e9(0x71a)]['Settings'][_0x4848e9(0x4b2)][_0x4848e9(0x24b)];if(_0x3f624a>0x0)$gameTemp[_0x4848e9(0x555)](_0x3f624a);}},DataManager[_0xebc2c6(0x5ed)]=function(){const _0x26dff4=_0xebc2c6,_0x58c22f=VisuMZ[_0x26dff4(0x71a)][_0x26dff4(0x74)][_0x26dff4(0x4b2)]['NewGameCommonEventAll']||0x0;if(_0x58c22f>0x0)$gameTemp[_0x26dff4(0x555)](_0x58c22f);},DataManager[_0xebc2c6(0x2d4)]=function(_0x3392e7){const _0x3f3d14=_0xebc2c6,_0x5aa6e6=$dataTroops[_0x3392e7];if(!_0x5aa6e6)return'';let _0x207756='';_0x207756+=_0x5aa6e6['name'];for(const _0x3c3238 of _0x5aa6e6[_0x3f3d14(0x2a8)]){for(const _0x27feb of _0x3c3238[_0x3f3d14(0x1cb)]){[0x6c,0x198][_0x3f3d14(0x6f5)](_0x27feb['code'])&&(_0x207756+='\x0a',_0x207756+=_0x27feb[_0x3f3d14(0x6b5)][0x0]);}}return _0x207756;};(VisuMZ['CoreEngine'][_0xebc2c6(0x74)][_0xebc2c6(0x4b2)][_0xebc2c6(0x50c)]??!![])&&($scene=null,VisuMZ[_0xebc2c6(0x71a)]['Scene_Base_create']=Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x549)],Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x549)]=function(){const _0x4aa9da=_0xebc2c6;VisuMZ['CoreEngine'][_0x4aa9da(0x6f)][_0x4aa9da(0x32f)](this),$scene=this;},$spriteset=null,VisuMZ['CoreEngine'][_0xebc2c6(0x373)]=Scene_Map['prototype']['createSpriteset'],Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x1e9)]=function(){const _0x16cc95=_0xebc2c6;VisuMZ['CoreEngine'][_0x16cc95(0x373)][_0x16cc95(0x32f)](this),$spriteset=this[_0x16cc95(0x4be)];},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0xbd)]=Scene_Battle[_0xebc2c6(0x2c3)][_0xebc2c6(0x1e9)],Scene_Battle[_0xebc2c6(0x2c3)][_0xebc2c6(0x1e9)]=function(){const _0xc15d29=_0xebc2c6;VisuMZ[_0xc15d29(0x71a)]['Scene_Battle_createSpriteset'][_0xc15d29(0x32f)](this),$spriteset=this[_0xc15d29(0x4be)];},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x323)]=Scene_Base[_0xebc2c6(0x2c3)]['terminate'],Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x273)]=function(){const _0x4d4270=_0xebc2c6;VisuMZ[_0x4d4270(0x71a)][_0x4d4270(0x323)][_0x4d4270(0x32f)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ['CoreEngine']['BattleManager_update']=BattleManager[_0xebc2c6(0x3a8)],BattleManager[_0xebc2c6(0x3a8)]=function(_0x352e4a){const _0x1c7bd2=_0xebc2c6;VisuMZ[_0x1c7bd2(0x71a)][_0x1c7bd2(0x627)]['call'](this,_0x352e4a),$subject=this[_0x1c7bd2(0x167)],$targets=this[_0x1c7bd2(0x1f7)],$target=this[_0x1c7bd2(0x62b)]||this[_0x1c7bd2(0x1f7)][0x0];},$event=null,VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x1e3)]=Game_Event[_0xebc2c6(0x2c3)][_0xebc2c6(0x1c0)],Game_Event[_0xebc2c6(0x2c3)][_0xebc2c6(0x1c0)]=function(){const _0x416aa9=_0xebc2c6;VisuMZ[_0x416aa9(0x71a)][_0x416aa9(0x1e3)][_0x416aa9(0x32f)](this),$event=this;},VisuMZ['CoreEngine'][_0xebc2c6(0x238)]=Scene_Map['prototype'][_0xebc2c6(0x3a8)],Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x3a8)]=function(){const _0x35e1e7=_0xebc2c6;VisuMZ[_0x35e1e7(0x71a)][_0x35e1e7(0x238)][_0x35e1e7(0x32f)](this),$gameMap[_0x35e1e7(0x197)]();},Game_Map['prototype'][_0xebc2c6(0x197)]=function(){!this['isEventRunning']()&&$event!==null&&($event=null);},$commonEvent=function(_0x3f4efd){if($gameTemp)$gameTemp['reserveCommonEvent'](_0x3f4efd);},$onceParallel=function(_0xd9097f){const _0x3c5ff6=_0xebc2c6;if(SceneManager['isSceneMap']())$scene['playOnceParallelInterpreter'](_0xd9097f);else{if(SceneManager[_0x3c5ff6(0x4ea)]()){if(Imported[_0x3c5ff6(0x379)])$scene[_0x3c5ff6(0x1e2)](_0xd9097f);else $gameTemp&&$gameTemp['isPlaytest']()&&alert('Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!');}else $gameTemp&&$gameTemp[_0x3c5ff6(0x72d)]()&&alert('This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!');}});;StorageManager[_0xebc2c6(0x6e3)]=function(_0x1f0674){return new Promise((_0x2a643f,_0x1261f4)=>{const _0x211ec6=_0x1f8b;try{const _0x21fdb3=pako['deflate'](_0x1f0674,{'to':_0x211ec6(0x57e),'level':0x1});if(_0x21fdb3[_0x211ec6(0x749)]>=0xc350){}_0x2a643f(_0x21fdb3);}catch(_0x3921a7){_0x1261f4(_0x3921a7);}});},TextManager['stringKeyMap']=['','','',_0xebc2c6(0x42b),'','','HELP','',_0xebc2c6(0x486),_0xebc2c6(0x748),'','',_0xebc2c6(0x2e5),'ENTER',_0xebc2c6(0x11a),'',_0xebc2c6(0x3bb),_0xebc2c6(0xeb),_0xebc2c6(0x6f4),_0xebc2c6(0x636),_0xebc2c6(0x24c),_0xebc2c6(0x3ed),_0xebc2c6(0x14a),'JUNJA',_0xebc2c6(0x179),'HANJA','',_0xebc2c6(0x66a),_0xebc2c6(0x3fd),_0xebc2c6(0x3dd),'ACCEPT','MODECHANGE','SPACE','PGUP',_0xebc2c6(0x2dc),'END',_0xebc2c6(0xd0),_0xebc2c6(0x5ab),'UP',_0xebc2c6(0x4fb),_0xebc2c6(0x1b3),_0xebc2c6(0x39e),_0xebc2c6(0x29f),_0xebc2c6(0x18a),_0xebc2c6(0x3a3),_0xebc2c6(0x366),_0xebc2c6(0x38d),'','0','1','2','3','4','5','6','7','8','9',_0xebc2c6(0x649),_0xebc2c6(0x8d),_0xebc2c6(0x72b),_0xebc2c6(0x1c9),_0xebc2c6(0x70c),_0xebc2c6(0x67e),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0xebc2c6(0x6ef),'',_0xebc2c6(0x22a),_0xebc2c6(0x515),'NUMPAD1',_0xebc2c6(0x316),'NUMPAD3',_0xebc2c6(0x1a9),_0xebc2c6(0x5c1),_0xebc2c6(0x3b7),'NUMPAD7',_0xebc2c6(0xff),_0xebc2c6(0x580),_0xebc2c6(0x36a),'ADD',_0xebc2c6(0x257),_0xebc2c6(0x6d0),_0xebc2c6(0x6ae),_0xebc2c6(0x412),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11',_0xebc2c6(0x40f),_0xebc2c6(0x4d9),_0xebc2c6(0x65f),_0xebc2c6(0x51c),'F16',_0xebc2c6(0x385),_0xebc2c6(0x382),_0xebc2c6(0x16e),'F20',_0xebc2c6(0x6ed),_0xebc2c6(0x250),_0xebc2c6(0x185),_0xebc2c6(0x55c),'','','','','','','','','NUM_LOCK',_0xebc2c6(0x4f8),'WIN_OEM_FJ_JISHO',_0xebc2c6(0x64e),'WIN_OEM_FJ_TOUROKU',_0xebc2c6(0x5aa),_0xebc2c6(0x3c6),'','','','','','','','','',_0xebc2c6(0x441),_0xebc2c6(0x206),_0xebc2c6(0x4ad),'HASH',_0xebc2c6(0x263),_0xebc2c6(0x419),_0xebc2c6(0x357),'UNDERSCORE','OPEN_PAREN','CLOSE_PAREN',_0xebc2c6(0x473),_0xebc2c6(0x13a),_0xebc2c6(0x2e3),_0xebc2c6(0x27d),_0xebc2c6(0x43a),_0xebc2c6(0x187),_0xebc2c6(0x2fa),'','','','',_0xebc2c6(0x3a0),'VOLUME_DOWN',_0xebc2c6(0x1fd),'','',_0xebc2c6(0x8d),_0xebc2c6(0x1c9),_0xebc2c6(0x619),_0xebc2c6(0x2bd),'PERIOD',_0xebc2c6(0x425),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0xebc2c6(0x690),_0xebc2c6(0x54e),_0xebc2c6(0x65e),_0xebc2c6(0x2c6),'',_0xebc2c6(0x458),_0xebc2c6(0x200),'',_0xebc2c6(0x6a3),_0xebc2c6(0x575),'',_0xebc2c6(0x5f2),'','',_0xebc2c6(0x511),_0xebc2c6(0x3f5),_0xebc2c6(0x66e),_0xebc2c6(0x355),_0xebc2c6(0x421),_0xebc2c6(0x1b1),'WIN_OEM_CUSEL',_0xebc2c6(0x35e),_0xebc2c6(0x397),'WIN_OEM_COPY',_0xebc2c6(0x2bb),'WIN_OEM_ENLW',_0xebc2c6(0x38c),_0xebc2c6(0xc6),_0xebc2c6(0x706),'EXSEL',_0xebc2c6(0x630),'PLAY','ZOOM','',_0xebc2c6(0x215),_0xebc2c6(0x5d9),''],TextManager[_0xebc2c6(0x302)]=VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)][_0xebc2c6(0x642)][_0xebc2c6(0x13d)],TextManager[_0xebc2c6(0x654)]=VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)][_0xebc2c6(0x642)]['CancelText'],TextManager[_0xebc2c6(0x5bd)]=VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)][_0xebc2c6(0x642)][_0xebc2c6(0x350)],VisuMZ['CoreEngine'][_0xebc2c6(0x230)]=TextManager[_0xebc2c6(0x3e8)],TextManager[_0xebc2c6(0x3e8)]=function(_0x13b56b){const _0x1ea5e5=_0xebc2c6;return typeof _0x13b56b===_0x1ea5e5(0x43c)?VisuMZ[_0x1ea5e5(0x71a)][_0x1ea5e5(0x230)][_0x1ea5e5(0x32f)](this,_0x13b56b):this[_0x1ea5e5(0x513)](_0x13b56b);},TextManager['paramName']=function(_0x33d125){const _0x5dca12=_0xebc2c6;_0x33d125=String(_0x33d125||'')[_0x5dca12(0x70a)]();const _0x42fc68=VisuMZ[_0x5dca12(0x71a)][_0x5dca12(0x74)][_0x5dca12(0x4c8)];if(_0x33d125===_0x5dca12(0x668))return $dataSystem[_0x5dca12(0x28a)][_0x5dca12(0x9a)][0x0];if(_0x33d125==='MAXMP')return $dataSystem['terms']['params'][0x1];if(_0x33d125==='ATK')return $dataSystem[_0x5dca12(0x28a)][_0x5dca12(0x9a)][0x2];if(_0x33d125===_0x5dca12(0x5d4))return $dataSystem[_0x5dca12(0x28a)][_0x5dca12(0x9a)][0x3];if(_0x33d125===_0x5dca12(0x1c8))return $dataSystem[_0x5dca12(0x28a)][_0x5dca12(0x9a)][0x4];if(_0x33d125===_0x5dca12(0x2ea))return $dataSystem[_0x5dca12(0x28a)]['params'][0x5];if(_0x33d125===_0x5dca12(0x137))return $dataSystem[_0x5dca12(0x28a)][_0x5dca12(0x9a)][0x6];if(_0x33d125==='LUK')return $dataSystem[_0x5dca12(0x28a)][_0x5dca12(0x9a)][0x7];if(_0x33d125===_0x5dca12(0x6e6))return _0x42fc68['XParamVocab0'];if(_0x33d125==='EVA')return _0x42fc68['XParamVocab1'];if(_0x33d125===_0x5dca12(0x3c3))return _0x42fc68[_0x5dca12(0x106)];if(_0x33d125===_0x5dca12(0x720))return _0x42fc68[_0x5dca12(0x5af)];if(_0x33d125==='MEV')return _0x42fc68[_0x5dca12(0x289)];if(_0x33d125===_0x5dca12(0x28b))return _0x42fc68[_0x5dca12(0x324)];if(_0x33d125===_0x5dca12(0x401))return _0x42fc68['XParamVocab6'];if(_0x33d125===_0x5dca12(0x548))return _0x42fc68[_0x5dca12(0x606)];if(_0x33d125==='MRG')return _0x42fc68[_0x5dca12(0x2f6)];if(_0x33d125===_0x5dca12(0x1f3))return _0x42fc68['XParamVocab9'];if(_0x33d125===_0x5dca12(0x151))return _0x42fc68['SParamVocab0'];if(_0x33d125===_0x5dca12(0x4da))return _0x42fc68[_0x5dca12(0x4dc)];if(_0x33d125===_0x5dca12(0x2c1))return _0x42fc68[_0x5dca12(0xf5)];if(_0x33d125===_0x5dca12(0x86))return _0x42fc68['SParamVocab3'];if(_0x33d125==='MCR')return _0x42fc68[_0x5dca12(0x55d)];if(_0x33d125===_0x5dca12(0x17d))return _0x42fc68['SParamVocab5'];if(_0x33d125===_0x5dca12(0x101))return _0x42fc68[_0x5dca12(0x303)];if(_0x33d125===_0x5dca12(0x60a))return _0x42fc68[_0x5dca12(0x41c)];if(_0x33d125===_0x5dca12(0x610))return _0x42fc68['SParamVocab8'];if(_0x33d125===_0x5dca12(0x29b))return _0x42fc68[_0x5dca12(0xdb)];if(VisuMZ[_0x5dca12(0x71a)][_0x5dca12(0x290)][_0x33d125])return VisuMZ[_0x5dca12(0x71a)][_0x5dca12(0x290)][_0x33d125];return'';},TextManager['getInputButtonString']=function(_0x305ecb){const _0x5a5573=_0xebc2c6,_0x14a9a5=Input[_0x5a5573(0x2a5)]();return _0x14a9a5===_0x5a5573(0x105)?this[_0x5a5573(0x27a)](_0x305ecb):this[_0x5a5573(0x67d)](_0x14a9a5,_0x305ecb);},TextManager[_0xebc2c6(0x27a)]=function(_0x51c367){const _0x52f95f=_0xebc2c6;if(_0x51c367===_0x52f95f(0x52b))_0x51c367=_0x52f95f(0x546);if(_0x51c367===_0x52f95f(0x2a7))_0x51c367='escape';let _0x3225db=[];for(let _0x30e776 in Input[_0x52f95f(0xd7)]){_0x30e776=Number(_0x30e776);if(_0x30e776>=0x60&&_0x30e776<=0x69)continue;if([0x12,0x20]['includes'](_0x30e776))continue;_0x51c367===Input[_0x52f95f(0xd7)][_0x30e776]&&_0x3225db[_0x52f95f(0x710)](_0x30e776);}for(let _0x21465b=0x0;_0x21465b<_0x3225db[_0x52f95f(0x749)];_0x21465b++){_0x3225db[_0x21465b]=TextManager[_0x52f95f(0x55e)][_0x3225db[_0x21465b]];}return this['makeInputButtonString'](_0x3225db);},TextManager['makeInputButtonString']=function(_0x4c848e){const _0xa86a8a=_0xebc2c6,_0x18fbee=VisuMZ[_0xa86a8a(0x71a)][_0xa86a8a(0x74)][_0xa86a8a(0x642)],_0x234dd5=_0x18fbee[_0xa86a8a(0x3b3)],_0x2be083=_0x4c848e[_0xa86a8a(0x3a2)](),_0x1d490e=_0xa86a8a(0x35c)[_0xa86a8a(0x5ce)](_0x2be083);return _0x18fbee[_0x1d490e]?_0x18fbee[_0x1d490e]:_0x234dd5['format'](_0x2be083);},TextManager['getInputMultiButtonStrings']=function(_0x10bf06,_0x406049){const _0x520a17=_0xebc2c6,_0x281ccc=VisuMZ['CoreEngine']['Settings'][_0x520a17(0x642)],_0x27531a=_0x281ccc[_0x520a17(0x1a2)],_0x480e73=this['getInputButtonString'](_0x10bf06),_0x108f2b=this[_0x520a17(0x6da)](_0x406049);return _0x27531a[_0x520a17(0x5ce)](_0x480e73,_0x108f2b);},TextManager[_0xebc2c6(0x67d)]=function(_0x2ad8c3,_0x25ddee){const _0x21816e=_0xebc2c6,_0x1f0328=_0x2ad8c3[_0x21816e(0x281)]()['trim'](),_0x21690e=VisuMZ[_0x21816e(0x71a)][_0x21816e(0x398)][_0x1f0328];if(!_0x21690e)return this[_0x21816e(0x4ce)](_0x2ad8c3,_0x25ddee);return _0x21690e[_0x25ddee]||this[_0x21816e(0x27a)](_0x2ad8c3,_0x25ddee);},TextManager[_0xebc2c6(0x4ce)]=function(_0x1e1cb1,_0x362347){const _0x3ddf04=_0xebc2c6,_0x28e757=_0x1e1cb1[_0x3ddf04(0x281)]()[_0x3ddf04(0x4d5)]();for(const _0x487f87 in VisuMZ[_0x3ddf04(0x71a)][_0x3ddf04(0x692)]){if(_0x28e757[_0x3ddf04(0x6f5)](_0x487f87)){const _0xa5ea3d=VisuMZ[_0x3ddf04(0x71a)][_0x3ddf04(0x692)][_0x487f87],_0x4309d8=VisuMZ[_0x3ddf04(0x71a)][_0x3ddf04(0x398)][_0xa5ea3d];return _0x4309d8[_0x362347]||this[_0x3ddf04(0x27a)](_0x362347);}}return this[_0x3ddf04(0x27a)](_0x362347);},VisuMZ['CoreEngine'][_0xebc2c6(0x57a)]=ColorManager['loadWindowskin'],ColorManager[_0xebc2c6(0x5dd)]=function(){const _0x5de309=_0xebc2c6;VisuMZ['CoreEngine'][_0x5de309(0x57a)][_0x5de309(0x32f)](this),this['_colorCache']=this[_0x5de309(0x6f3)]||{};},ColorManager['getColorDataFromPluginParameters']=function(_0x5da830,_0x8290f4){const _0x42f89e=_0xebc2c6;return _0x8290f4=String(_0x8290f4),this[_0x42f89e(0x6f3)]=this[_0x42f89e(0x6f3)]||{},_0x8290f4[_0x42f89e(0x3f9)](/#(.*)/i)?this['_colorCache'][_0x5da830]=_0x42f89e(0x493)['format'](String(RegExp['$1'])):this['_colorCache'][_0x5da830]=this[_0x42f89e(0x3a5)](Number(_0x8290f4)),this[_0x42f89e(0x6f3)][_0x5da830];},ColorManager[_0xebc2c6(0x4bd)]=function(_0x1ae3f6){const _0x48360c=_0xebc2c6;return _0x1ae3f6=String(_0x1ae3f6),_0x1ae3f6[_0x48360c(0x3f9)](/#(.*)/i)?_0x48360c(0x493)[_0x48360c(0x5ce)](String(RegExp['$1'])):this[_0x48360c(0x3a5)](Number(_0x1ae3f6));},ColorManager['clearCachedKeys']=function(){const _0x14210=_0xebc2c6;this[_0x14210(0x6f3)]={};},ColorManager[_0xebc2c6(0x345)]=function(){const _0x50ee89=_0xebc2c6,_0x25c1d4=_0x50ee89(0xfe);this[_0x50ee89(0x6f3)]=this[_0x50ee89(0x6f3)]||{};if(this[_0x50ee89(0x6f3)][_0x25c1d4])return this[_0x50ee89(0x6f3)][_0x25c1d4];const _0x51eb77=VisuMZ[_0x50ee89(0x71a)][_0x50ee89(0x74)][_0x50ee89(0x2a4)]['ColorNormal'];return this[_0x50ee89(0x24e)](_0x25c1d4,_0x51eb77);},ColorManager[_0xebc2c6(0x659)]=function(){const _0xe1229d=_0xebc2c6,_0xd09d6c=_0xe1229d(0x37d);this['_colorCache']=this[_0xe1229d(0x6f3)]||{};if(this[_0xe1229d(0x6f3)][_0xd09d6c])return this[_0xe1229d(0x6f3)][_0xd09d6c];const _0x3fd223=VisuMZ['CoreEngine'][_0xe1229d(0x74)][_0xe1229d(0x2a4)][_0xe1229d(0x3e6)];return this[_0xe1229d(0x24e)](_0xd09d6c,_0x3fd223);},ColorManager[_0xebc2c6(0x705)]=function(){const _0x33a3d0=_0xebc2c6,_0xa14c2=_0x33a3d0(0x3d2);this[_0x33a3d0(0x6f3)]=this[_0x33a3d0(0x6f3)]||{};if(this[_0x33a3d0(0x6f3)][_0xa14c2])return this[_0x33a3d0(0x6f3)][_0xa14c2];const _0x100315=VisuMZ[_0x33a3d0(0x71a)]['Settings'][_0x33a3d0(0x2a4)][_0x33a3d0(0x21e)];return this[_0x33a3d0(0x24e)](_0xa14c2,_0x100315);},ColorManager[_0xebc2c6(0x343)]=function(){const _0x337b05=_0xebc2c6,_0x45cd26=_0x337b05(0x6c2);this[_0x337b05(0x6f3)]=this['_colorCache']||{};if(this['_colorCache'][_0x45cd26])return this[_0x337b05(0x6f3)][_0x45cd26];const _0x260e05=VisuMZ[_0x337b05(0x71a)][_0x337b05(0x74)][_0x337b05(0x2a4)]['ColorDeath'];return this[_0x337b05(0x24e)](_0x45cd26,_0x260e05);},ColorManager[_0xebc2c6(0x581)]=function(){const _0x5c29a7=_0xebc2c6,_0x587553=_0x5c29a7(0x17f);this[_0x5c29a7(0x6f3)]=this[_0x5c29a7(0x6f3)]||{};if(this[_0x5c29a7(0x6f3)][_0x587553])return this[_0x5c29a7(0x6f3)][_0x587553];const _0x280737=VisuMZ['CoreEngine'][_0x5c29a7(0x74)]['Color'][_0x5c29a7(0x6cc)];return this[_0x5c29a7(0x24e)](_0x587553,_0x280737);},ColorManager[_0xebc2c6(0x502)]=function(){const _0x30c9fe=_0xebc2c6,_0x4b5c75=_0x30c9fe(0x45f);this[_0x30c9fe(0x6f3)]=this[_0x30c9fe(0x6f3)]||{};if(this['_colorCache'][_0x4b5c75])return this[_0x30c9fe(0x6f3)][_0x4b5c75];const _0x5b0660=VisuMZ['CoreEngine'][_0x30c9fe(0x74)][_0x30c9fe(0x2a4)][_0x30c9fe(0x16b)];return this[_0x30c9fe(0x24e)](_0x4b5c75,_0x5b0660);},ColorManager[_0xebc2c6(0x131)]=function(){const _0x2ffd50=_0xebc2c6,_0x96f593=_0x2ffd50(0x341);this[_0x2ffd50(0x6f3)]=this[_0x2ffd50(0x6f3)]||{};if(this[_0x2ffd50(0x6f3)][_0x96f593])return this['_colorCache'][_0x96f593];const _0x24e10f=VisuMZ['CoreEngine'][_0x2ffd50(0x74)][_0x2ffd50(0x2a4)][_0x2ffd50(0x1cd)];return this[_0x2ffd50(0x24e)](_0x96f593,_0x24e10f);},ColorManager['mpGaugeColor1']=function(){const _0x50b112=_0xebc2c6,_0x49a885='_stored_mpGaugeColor1';this[_0x50b112(0x6f3)]=this[_0x50b112(0x6f3)]||{};if(this[_0x50b112(0x6f3)][_0x49a885])return this[_0x50b112(0x6f3)][_0x49a885];const _0x409804=VisuMZ[_0x50b112(0x71a)][_0x50b112(0x74)][_0x50b112(0x2a4)]['ColorMPGauge1'];return this['getColorDataFromPluginParameters'](_0x49a885,_0x409804);},ColorManager['mpGaugeColor2']=function(){const _0x3d182c=_0xebc2c6,_0x1acb02=_0x3d182c(0x39d);this[_0x3d182c(0x6f3)]=this[_0x3d182c(0x6f3)]||{};if(this[_0x3d182c(0x6f3)][_0x1acb02])return this[_0x3d182c(0x6f3)][_0x1acb02];const _0x3aed44=VisuMZ[_0x3d182c(0x71a)][_0x3d182c(0x74)][_0x3d182c(0x2a4)]['ColorMPGauge2'];return this[_0x3d182c(0x24e)](_0x1acb02,_0x3aed44);},ColorManager[_0xebc2c6(0x1a0)]=function(){const _0x250111=_0xebc2c6,_0x2a43a3='_stored_mpCostColor';this[_0x250111(0x6f3)]=this['_colorCache']||{};if(this['_colorCache'][_0x2a43a3])return this[_0x250111(0x6f3)][_0x2a43a3];const _0x23a9e1=VisuMZ['CoreEngine']['Settings'][_0x250111(0x2a4)][_0x250111(0x79)];return this['getColorDataFromPluginParameters'](_0x2a43a3,_0x23a9e1);},ColorManager[_0xebc2c6(0x241)]=function(){const _0x45f3e8=_0xebc2c6,_0x3eca18='_stored_powerUpColor';this['_colorCache']=this[_0x45f3e8(0x6f3)]||{};if(this[_0x45f3e8(0x6f3)][_0x3eca18])return this[_0x45f3e8(0x6f3)][_0x3eca18];const _0x5f1354=VisuMZ[_0x45f3e8(0x71a)][_0x45f3e8(0x74)][_0x45f3e8(0x2a4)][_0x45f3e8(0x3eb)];return this[_0x45f3e8(0x24e)](_0x3eca18,_0x5f1354);},ColorManager[_0xebc2c6(0x481)]=function(){const _0x2aea66=_0xebc2c6,_0xd4d0b=_0x2aea66(0x2e0);this[_0x2aea66(0x6f3)]=this[_0x2aea66(0x6f3)]||{};if(this['_colorCache'][_0xd4d0b])return this[_0x2aea66(0x6f3)][_0xd4d0b];const _0x2c4fc4=VisuMZ['CoreEngine'][_0x2aea66(0x74)][_0x2aea66(0x2a4)][_0x2aea66(0x265)];return this[_0x2aea66(0x24e)](_0xd4d0b,_0x2c4fc4);},ColorManager[_0xebc2c6(0x4b4)]=function(){const _0x307897=_0xebc2c6,_0xa0c2c2='_stored_ctGaugeColor1';this[_0x307897(0x6f3)]=this['_colorCache']||{};if(this[_0x307897(0x6f3)][_0xa0c2c2])return this['_colorCache'][_0xa0c2c2];const _0x30b6c6=VisuMZ[_0x307897(0x71a)]['Settings'][_0x307897(0x2a4)][_0x307897(0x6f2)];return this[_0x307897(0x24e)](_0xa0c2c2,_0x30b6c6);},ColorManager['ctGaugeColor2']=function(){const _0x52da2f=_0xebc2c6,_0xc11769=_0x52da2f(0x521);this['_colorCache']=this[_0x52da2f(0x6f3)]||{};if(this[_0x52da2f(0x6f3)][_0xc11769])return this[_0x52da2f(0x6f3)][_0xc11769];const _0x85f7fe=VisuMZ['CoreEngine'][_0x52da2f(0x74)]['Color'][_0x52da2f(0x2e1)];return this[_0x52da2f(0x24e)](_0xc11769,_0x85f7fe);},ColorManager['tpGaugeColor1']=function(){const _0x5cc706=_0xebc2c6,_0x59ae97=_0x5cc706(0x6ec);this[_0x5cc706(0x6f3)]=this[_0x5cc706(0x6f3)]||{};if(this[_0x5cc706(0x6f3)][_0x59ae97])return this[_0x5cc706(0x6f3)][_0x59ae97];const _0x5ab53d=VisuMZ[_0x5cc706(0x71a)][_0x5cc706(0x74)][_0x5cc706(0x2a4)]['ColorTPGauge1'];return this[_0x5cc706(0x24e)](_0x59ae97,_0x5ab53d);},ColorManager[_0xebc2c6(0x68e)]=function(){const _0x36b588=_0xebc2c6,_0x2fd353='_stored_tpGaugeColor2';this['_colorCache']=this[_0x36b588(0x6f3)]||{};if(this[_0x36b588(0x6f3)][_0x2fd353])return this[_0x36b588(0x6f3)][_0x2fd353];const _0x3ebeda=VisuMZ[_0x36b588(0x71a)][_0x36b588(0x74)][_0x36b588(0x2a4)][_0x36b588(0x5a6)];return this[_0x36b588(0x24e)](_0x2fd353,_0x3ebeda);},ColorManager[_0xebc2c6(0x1ad)]=function(){const _0x268fa6=_0xebc2c6,_0x546163=_0x268fa6(0x5b3);this['_colorCache']=this[_0x268fa6(0x6f3)]||{};if(this[_0x268fa6(0x6f3)][_0x546163])return this[_0x268fa6(0x6f3)][_0x546163];const _0x1d4a8a=VisuMZ[_0x268fa6(0x71a)]['Settings']['Color'][_0x268fa6(0x68a)];return this[_0x268fa6(0x24e)](_0x546163,_0x1d4a8a);},ColorManager[_0xebc2c6(0x270)]=function(){const _0x5de5f8=_0xebc2c6,_0x4d162c=_0x5de5f8(0x45c);this[_0x5de5f8(0x6f3)]=this[_0x5de5f8(0x6f3)]||{};if(this[_0x5de5f8(0x6f3)][_0x4d162c])return this[_0x5de5f8(0x6f3)][_0x4d162c];const _0x569792=VisuMZ[_0x5de5f8(0x71a)][_0x5de5f8(0x74)][_0x5de5f8(0x2a4)]['ColorTPCost'];return this[_0x5de5f8(0x24e)](_0x4d162c,_0x569792);},ColorManager[_0xebc2c6(0x66f)]=function(){const _0x4e0aee=_0xebc2c6,_0x3f19b0=_0x4e0aee(0x6c1);this[_0x4e0aee(0x6f3)]=this[_0x4e0aee(0x6f3)]||{};if(this[_0x4e0aee(0x6f3)][_0x3f19b0])return this[_0x4e0aee(0x6f3)][_0x3f19b0];const _0x48b791=VisuMZ[_0x4e0aee(0x71a)][_0x4e0aee(0x74)][_0x4e0aee(0x2a4)]['ColorExpGauge1'];return this['getColorDataFromPluginParameters'](_0x3f19b0,_0x48b791);},ColorManager[_0xebc2c6(0x442)]=function(){const _0x5d4d78=_0xebc2c6,_0x33b9d1=_0x5d4d78(0x6d2);this[_0x5d4d78(0x6f3)]=this[_0x5d4d78(0x6f3)]||{};if(this['_colorCache'][_0x33b9d1])return this[_0x5d4d78(0x6f3)][_0x33b9d1];const _0x58a043=VisuMZ[_0x5d4d78(0x71a)][_0x5d4d78(0x74)][_0x5d4d78(0x2a4)][_0x5d4d78(0x111)];return this['getColorDataFromPluginParameters'](_0x33b9d1,_0x58a043);},ColorManager[_0xebc2c6(0x682)]=function(){const _0x5942bc=_0xebc2c6,_0x27f4cf='_stored_maxLvGaugeColor1';this[_0x5942bc(0x6f3)]=this['_colorCache']||{};if(this['_colorCache'][_0x27f4cf])return this[_0x5942bc(0x6f3)][_0x27f4cf];const _0x5f3093=VisuMZ['CoreEngine']['Settings'][_0x5942bc(0x2a4)][_0x5942bc(0x1e0)];return this[_0x5942bc(0x24e)](_0x27f4cf,_0x5f3093);},ColorManager[_0xebc2c6(0x716)]=function(){const _0x2c3e5b=_0xebc2c6,_0x47f712='_stored_maxLvGaugeColor2';this[_0x2c3e5b(0x6f3)]=this[_0x2c3e5b(0x6f3)]||{};if(this[_0x2c3e5b(0x6f3)][_0x47f712])return this[_0x2c3e5b(0x6f3)][_0x47f712];const _0x4cb3c1=VisuMZ[_0x2c3e5b(0x71a)][_0x2c3e5b(0x74)][_0x2c3e5b(0x2a4)][_0x2c3e5b(0x512)];return this['getColorDataFromPluginParameters'](_0x47f712,_0x4cb3c1);},ColorManager[_0xebc2c6(0x498)]=function(_0x428bab){const _0x1b421c=_0xebc2c6;return VisuMZ[_0x1b421c(0x71a)]['Settings'][_0x1b421c(0x2a4)]['ActorHPColor'][_0x1b421c(0x32f)](this,_0x428bab);},ColorManager['mpColor']=function(_0x26c764){const _0x568769=_0xebc2c6;return VisuMZ[_0x568769(0x71a)]['Settings'][_0x568769(0x2a4)][_0x568769(0xdf)][_0x568769(0x32f)](this,_0x26c764);},ColorManager['tpColor']=function(_0x4036b2){const _0x3903f2=_0xebc2c6;return VisuMZ[_0x3903f2(0x71a)][_0x3903f2(0x74)][_0x3903f2(0x2a4)][_0x3903f2(0x14b)][_0x3903f2(0x32f)](this,_0x4036b2);},ColorManager[_0xebc2c6(0x6f7)]=function(_0x383e6a){const _0x38b686=_0xebc2c6;return VisuMZ[_0x38b686(0x71a)][_0x38b686(0x74)][_0x38b686(0x2a4)][_0x38b686(0x4a5)][_0x38b686(0x32f)](this,_0x383e6a);},ColorManager[_0xebc2c6(0x305)]=function(_0x486b8f){const _0x2751e5=_0xebc2c6;return VisuMZ[_0x2751e5(0x71a)][_0x2751e5(0x74)][_0x2751e5(0x2a4)][_0x2751e5(0x6ff)]['call'](this,_0x486b8f);},ColorManager['outlineColor']=function(){const _0x3f79c8=_0xebc2c6;return VisuMZ[_0x3f79c8(0x71a)][_0x3f79c8(0x74)][_0x3f79c8(0x2a4)][_0x3f79c8(0x72e)];},ColorManager[_0xebc2c6(0x6fe)]=function(){const _0x5b2610=_0xebc2c6;return VisuMZ['CoreEngine']['Settings'][_0x5b2610(0x2a4)][_0x5b2610(0x446)]||_0x5b2610(0x534);},ColorManager['outlineColorGauge']=function(){const _0x4117b0=_0xebc2c6;return VisuMZ[_0x4117b0(0x71a)][_0x4117b0(0x74)]['Color'][_0x4117b0(0x59c)]||_0x4117b0(0x28f);},ColorManager[_0xebc2c6(0x48e)]=function(){const _0x53f81a=_0xebc2c6;return VisuMZ[_0x53f81a(0x71a)][_0x53f81a(0x74)][_0x53f81a(0x2a4)][_0x53f81a(0x4cc)];},ColorManager[_0xebc2c6(0x5bf)]=function(){const _0x351c37=_0xebc2c6;return VisuMZ['CoreEngine'][_0x351c37(0x74)]['Color']['DimColor2'];},ColorManager[_0xebc2c6(0x10e)]=function(){const _0x8896b5=_0xebc2c6;return VisuMZ['CoreEngine']['Settings'][_0x8896b5(0x2a4)][_0x8896b5(0xef)];},ColorManager[_0xebc2c6(0x6f8)]=function(){const _0x385782=_0xebc2c6;return VisuMZ[_0x385782(0x71a)][_0x385782(0x74)][_0x385782(0x2a4)]['ItemBackColor2'];},SceneManager[_0xebc2c6(0x44c)]=[],SceneManager[_0xebc2c6(0x4ea)]=function(){const _0x533977=_0xebc2c6;return this[_0x533977(0x4e5)]&&this[_0x533977(0x4e5)][_0x533977(0x680)]===Scene_Battle;},SceneManager[_0xebc2c6(0x70d)]=function(){const _0x1a4360=_0xebc2c6;return this['_scene']&&this[_0x1a4360(0x4e5)][_0x1a4360(0x680)]===Scene_Map;},SceneManager[_0xebc2c6(0x6f0)]=function(){const _0x2fbfec=_0xebc2c6;return this['_scene']&&this[_0x2fbfec(0x4e5)]instanceof Scene_Map;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x123)]=SceneManager[_0xebc2c6(0x1dd)],SceneManager[_0xebc2c6(0x1dd)]=function(){const _0x5067c2=_0xebc2c6;VisuMZ['CoreEngine'][_0x5067c2(0x123)][_0x5067c2(0x32f)](this),this[_0x5067c2(0x1a1)]();},VisuMZ['CoreEngine'][_0xebc2c6(0x54f)]=SceneManager['onKeyDown'],SceneManager[_0xebc2c6(0x364)]=function(_0x1f7f2a){const _0x260df3=_0xebc2c6;if($gameTemp)this[_0x260df3(0x6c6)](_0x1f7f2a);VisuMZ[_0x260df3(0x71a)][_0x260df3(0x54f)]['call'](this,_0x1f7f2a);},SceneManager['onKeyDownKeysF6F7']=function(_0x414405){const _0x4823fb=_0xebc2c6;if(!_0x414405[_0x4823fb(0x5dc)]&&!_0x414405['altKey'])switch(_0x414405['keyCode']){case 0x54:this['playTestCtrlT']();break;case 0x75:this['playTestF6']();break;case 0x76:if(Input['isPressed']('shift')||Input[_0x4823fb(0x56b)](_0x4823fb(0x75)))return;this['playTestF7']();break;}},SceneManager[_0xebc2c6(0x411)]=function(){const _0x149cb4=_0xebc2c6;if($gameTemp[_0x149cb4(0x72d)]()&&VisuMZ['CoreEngine']['Settings']['QoL']['F6key']){ConfigManager[_0x149cb4(0x641)]!==0x0?(ConfigManager[_0x149cb4(0x452)]=0x0,ConfigManager[_0x149cb4(0x47e)]=0x0,ConfigManager[_0x149cb4(0x1d1)]=0x0,ConfigManager[_0x149cb4(0x641)]=0x0):(ConfigManager[_0x149cb4(0x452)]=0x64,ConfigManager[_0x149cb4(0x47e)]=0x64,ConfigManager[_0x149cb4(0x1d1)]=0x64,ConfigManager[_0x149cb4(0x641)]=0x64);ConfigManager[_0x149cb4(0x53c)]();if(this[_0x149cb4(0x4e5)][_0x149cb4(0x680)]===Scene_Options){if(this[_0x149cb4(0x4e5)]['_optionsWindow'])this['_scene'][_0x149cb4(0x4f5)][_0x149cb4(0x4d3)]();if(this[_0x149cb4(0x4e5)][_0x149cb4(0x4f4)])this[_0x149cb4(0x4e5)][_0x149cb4(0x4f4)][_0x149cb4(0x4d3)]();}}},SceneManager['playTestF7']=function(){const _0xd688e=_0xebc2c6;$gameTemp[_0xd688e(0x72d)]()&&VisuMZ[_0xd688e(0x71a)][_0xd688e(0x74)][_0xd688e(0x4b2)]['F7key']&&($gameTemp['_playTestFastMode']=!$gameTemp['_playTestFastMode']);},SceneManager[_0xebc2c6(0x1c5)]=function(){const _0x3b4e11=_0xebc2c6;if(!$gameTemp[_0x3b4e11(0x72d)]())return;if(!SceneManager[_0x3b4e11(0x4ea)]())return;for(const _0x286682 of $gameParty['members']()){if(!_0x286682)continue;_0x286682['gainSilentTp'](_0x286682['maxTp']());}},SceneManager['initVisuMZCoreEngine']=function(){const _0x403a22=_0xebc2c6;this['_sideButtonLayout']=![],this[_0x403a22(0x41a)]=!VisuMZ[_0x403a22(0x71a)][_0x403a22(0x74)]['UI'][_0x403a22(0x71)];},SceneManager[_0xebc2c6(0x6a2)]=function(_0xaa5a7d){const _0x52ef98=_0xebc2c6;VisuMZ[_0x52ef98(0x71a)][_0x52ef98(0x74)]['UI'][_0x52ef98(0xf1)]&&(this[_0x52ef98(0x389)]=_0xaa5a7d);},SceneManager['isSideButtonLayout']=function(){const _0x43227e=_0xebc2c6;return this[_0x43227e(0x389)];},SceneManager[_0xebc2c6(0x447)]=function(){const _0x370eff=_0xebc2c6;return this[_0x370eff(0x41a)];},SceneManager[_0xebc2c6(0x171)]=function(){const _0x280c71=_0xebc2c6;return this[_0x280c71(0x447)]()||this[_0x280c71(0x733)]();},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x126)]=SceneManager[_0xebc2c6(0x3cc)],SceneManager[_0xebc2c6(0x3cc)]=function(){const _0x3248ad=_0xebc2c6;return VisuMZ['CoreEngine'][_0x3248ad(0x74)][_0x3248ad(0x4b2)][_0x3248ad(0x204)]?VisuMZ[_0x3248ad(0x71a)][_0x3248ad(0x126)]['call'](this):!![];},SceneManager[_0xebc2c6(0x653)]=function(_0x306f29){const _0xfa94a2=_0xebc2c6;if(_0x306f29 instanceof Error)this['catchNormalError'](_0x306f29);else _0x306f29 instanceof Array&&_0x306f29[0x0]===_0xfa94a2(0x99)?this[_0xfa94a2(0x1d8)](_0x306f29):this[_0xfa94a2(0x45a)](_0x306f29);this['stop']();},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x112)]=BattleManager[_0xebc2c6(0x55f)],BattleManager['processEscape']=function(){const _0x197905=_0xebc2c6;if(VisuMZ[_0x197905(0x71a)][_0x197905(0x74)][_0x197905(0x4b2)][_0x197905(0x50d)])this[_0x197905(0x146)]();else return VisuMZ[_0x197905(0x71a)]['BattleManager_processEscape'][_0x197905(0x32f)](this);},BattleManager['processAlwaysEscape']=function(){const _0x4af0f4=_0xebc2c6;return $gameParty[_0x4af0f4(0x4ed)](),SoundManager[_0x4af0f4(0xb1)](),this[_0x4af0f4(0x5e6)](),!![];},BattleManager[_0xebc2c6(0x536)]=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager[_0xebc2c6(0x6b3)]=function(){const _0x3dcdbe=_0xebc2c6;return $gameSystem[_0x3dcdbe(0x6e8)]()===0x1;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x466)]=Game_Temp['prototype']['initialize'],Game_Temp[_0xebc2c6(0x2c3)][_0xebc2c6(0x1dd)]=function(){const _0xf2f775=_0xebc2c6;VisuMZ[_0xf2f775(0x71a)]['Game_Temp_initialize'][_0xf2f775(0x32f)](this),this[_0xf2f775(0x4a1)](),this[_0xf2f775(0x143)](),this[_0xf2f775(0xa4)]();},Game_Temp[_0xebc2c6(0x2c3)][_0xebc2c6(0x4a1)]=function(){const _0x427530=_0xebc2c6;VisuMZ[_0x427530(0x71a)][_0x427530(0x74)]['QoL'][_0x427530(0x483)]&&(this['_isPlaytest']=![]);},Game_Temp[_0xebc2c6(0x2c3)][_0xebc2c6(0xcf)]=function(_0x46167b){const _0x159183=_0xebc2c6;this[_0x159183(0xdd)]=_0x46167b;},Game_Temp[_0xebc2c6(0x2c3)][_0xebc2c6(0x472)]=function(){const _0x5714d5=_0xebc2c6;return this[_0x5714d5(0xdd)];},Game_Temp['prototype'][_0xebc2c6(0x428)]=function(){const _0x4b7ddb=_0xebc2c6;this[_0x4b7ddb(0x25e)]=undefined,this[_0x4b7ddb(0x284)]=undefined;},Game_Temp[_0xebc2c6(0x2c3)]['applyForcedGameTroopSettingsCoreEngine']=function(_0x236a07){const _0x5e52c5=_0xebc2c6;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x5e52c5(0x463)]($dataMap[_0x5e52c5(0x2f7)]);const _0x25dc8e=$dataTroops[_0x236a07];if(_0x25dc8e){let _0x30d933=DataManager[_0x5e52c5(0x2d4)](_0x25dc8e['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x30d933);}},Game_Temp['prototype'][_0xebc2c6(0x463)]=function(_0x3ccda3){const _0x302ae2=_0xebc2c6;if(!_0x3ccda3)return;if(_0x3ccda3['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x302ae2(0x25e)]='FV';else{if(_0x3ccda3['match'](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x3ccda3[_0x302ae2(0x3f9)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x426214=String(RegExp['$1']);if(_0x426214[_0x302ae2(0x3f9)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x302ae2(0x25e)]='FV';else _0x426214[_0x302ae2(0x3f9)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x302ae2(0x25e)]='SV');}}}if(_0x3ccda3[_0x302ae2(0x3f9)](/<(?:DTB)>/i))this['_forcedBattleSys']=0x0;else{if(_0x3ccda3['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i))this['_forcedBattleSys']=0x1;else{if(_0x3ccda3[_0x302ae2(0x3f9)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x302ae2(0x284)]=0x2;else{if(_0x3ccda3[_0x302ae2(0x3f9)](/<(?:CTB)>/i))Imported[_0x302ae2(0x50f)]&&(this[_0x302ae2(0x284)]=_0x302ae2(0x12b));else{if(_0x3ccda3[_0x302ae2(0x3f9)](/<(?:STB)>/i))Imported[_0x302ae2(0x310)]&&(this[_0x302ae2(0x284)]=_0x302ae2(0x1f6));else{if(_0x3ccda3['match'](/<(?:BTB)>/i))Imported[_0x302ae2(0x5ef)]&&(this[_0x302ae2(0x284)]=_0x302ae2(0x67a));else{if(_0x3ccda3[_0x302ae2(0x3f9)](/<(?:FTB)>/i))Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x302ae2(0x284)]=_0x302ae2(0x4bc));else{if(_0x3ccda3[_0x302ae2(0x3f9)](/<(?:OTB)>/i))Imported[_0x302ae2(0x46d)]&&(this[_0x302ae2(0x284)]='OTB');else{if(_0x3ccda3[_0x302ae2(0x3f9)](/<(?:ETB)>/i))Imported[_0x302ae2(0x5ee)]&&(this[_0x302ae2(0x284)]=_0x302ae2(0x399));else{if(_0x3ccda3[_0x302ae2(0x3f9)](/<(?:PTB)>/i))Imported['VisuMZ_2_BattleSystemPTB']&&(this[_0x302ae2(0x284)]=_0x302ae2(0xd5));else{if(_0x3ccda3['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x89eaf9=String(RegExp['$1']);if(_0x89eaf9[_0x302ae2(0x3f9)](/DTB/i))this[_0x302ae2(0x284)]=0x0;else{if(_0x89eaf9[_0x302ae2(0x3f9)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x302ae2(0x284)]=0x1;else{if(_0x89eaf9['match'](/(?:TPB|ATB)[ ]WAIT/i))this[_0x302ae2(0x284)]=0x2;else{if(_0x89eaf9[_0x302ae2(0x3f9)](/CTB/i))Imported[_0x302ae2(0x50f)]&&(this[_0x302ae2(0x284)]='CTB');else{if(_0x89eaf9[_0x302ae2(0x3f9)](/STB/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x302ae2(0x284)]='STB');else{if(_0x89eaf9[_0x302ae2(0x3f9)](/BTB/i))Imported[_0x302ae2(0x5ef)]&&(this[_0x302ae2(0x284)]=_0x302ae2(0x67a));else{if(_0x89eaf9[_0x302ae2(0x3f9)](/FTB/i))Imported[_0x302ae2(0x348)]&&(this[_0x302ae2(0x284)]=_0x302ae2(0x4bc));else{if(_0x89eaf9['match'](/OTB/i))Imported[_0x302ae2(0x46d)]&&(this[_0x302ae2(0x284)]=_0x302ae2(0x1b4));else{if(_0x89eaf9[_0x302ae2(0x3f9)](/ETB/i))Imported[_0x302ae2(0x5ee)]&&(this[_0x302ae2(0x284)]=_0x302ae2(0x399));else _0x89eaf9[_0x302ae2(0x3f9)](/PTB/i)&&(Imported[_0x302ae2(0x5f7)]&&(this[_0x302ae2(0x284)]=_0x302ae2(0xd5)));}}}}}}}}}}}}}}}}}}}},Game_Temp[_0xebc2c6(0x2c3)][_0xebc2c6(0x143)]=function(){const _0x4ee231=_0xebc2c6;this[_0x4ee231(0x595)]=[];},Game_Temp[_0xebc2c6(0x2c3)][_0xebc2c6(0x2e7)]=function(_0x4c78fe,_0x46df41,_0x3c45a1,_0xa9a5a0){const _0x1f8c07=_0xebc2c6;if(!this[_0x1f8c07(0x4e6)]())return;_0x3c45a1=_0x3c45a1||![],_0xa9a5a0=_0xa9a5a0||![];if($dataAnimations[_0x46df41]){const _0x10b4ec={'targets':_0x4c78fe,'animationId':_0x46df41,'mirror':_0x3c45a1,'mute':_0xa9a5a0};this[_0x1f8c07(0x595)][_0x1f8c07(0x710)](_0x10b4ec);for(const _0x22e8a9 of _0x4c78fe){_0x22e8a9[_0x1f8c07(0x298)]&&_0x22e8a9[_0x1f8c07(0x298)]();}}},Game_Temp[_0xebc2c6(0x2c3)][_0xebc2c6(0x4e6)]=function(){return!![];},Game_Temp[_0xebc2c6(0x2c3)]['retrieveFauxAnimation']=function(){const _0x11ec5c=_0xebc2c6;return this[_0x11ec5c(0x595)]['shift']();},Game_Temp[_0xebc2c6(0x2c3)][_0xebc2c6(0xa4)]=function(){const _0x1c6e4b=_0xebc2c6;this[_0x1c6e4b(0x18f)]=[];},Game_Temp['prototype'][_0xebc2c6(0x229)]=function(_0x289545,_0x566339,_0x3266f6,_0x5dabd1,_0x5194b5){const _0x2cccae=_0xebc2c6;if(!this[_0x2cccae(0x34c)]())return;_0x5dabd1=_0x5dabd1||![],_0x5194b5=_0x5194b5||![];if($dataAnimations[_0x3266f6]){const _0x49efeb={'x':_0x289545,'y':_0x566339,'animationId':_0x3266f6,'mirror':_0x5dabd1,'mute':_0x5194b5};this[_0x2cccae(0x18f)][_0x2cccae(0x710)](_0x49efeb);}},Game_Temp['prototype'][_0xebc2c6(0x34c)]=function(){return!![];},Game_Temp[_0xebc2c6(0x2c3)]['retrievePointAnimation']=function(){const _0x398214=_0xebc2c6;return this['_pointAnimationQueue'][_0x398214(0x2d0)]();},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x576)]=Game_System[_0xebc2c6(0x2c3)][_0xebc2c6(0x1dd)],Game_System['prototype']['initialize']=function(){const _0x46f861=_0xebc2c6;VisuMZ['CoreEngine'][_0x46f861(0x576)]['call'](this),this['initCoreEngine']();},Game_System[_0xebc2c6(0x2c3)][_0xebc2c6(0xe6)]=function(){const _0x4bd4f9=_0xebc2c6;this['_CoreEngineSettings']={'SideView':$dataSystem[_0x4bd4f9(0x6f9)],'BattleSystem':this[_0x4bd4f9(0x391)](),'FontSize':$dataSystem[_0x4bd4f9(0xfa)][_0x4bd4f9(0x213)],'Padding':0xc};},Game_System['prototype'][_0xebc2c6(0x220)]=function(){const _0x3eb9b6=_0xebc2c6;if($gameTemp[_0x3eb9b6(0x25e)]==='SV')return!![];else{if($gameTemp[_0x3eb9b6(0x25e)]==='FV')return![];}if(this[_0x3eb9b6(0x16c)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x3eb9b6(0x9f)]===undefined)this[_0x3eb9b6(0xe6)]();return this['_CoreEngineSettings'][_0x3eb9b6(0x9f)];},Game_System[_0xebc2c6(0x2c3)][_0xebc2c6(0x437)]=function(_0x1fbc73){const _0x479da1=_0xebc2c6;if(this[_0x479da1(0x16c)]===undefined)this['initCoreEngine']();if(this[_0x479da1(0x16c)][_0x479da1(0x9f)]===undefined)this[_0x479da1(0xe6)]();this['_CoreEngineSettings'][_0x479da1(0x9f)]=_0x1fbc73;},Game_System[_0xebc2c6(0x2c3)][_0xebc2c6(0x2d7)]=function(){const _0x51dde0=_0xebc2c6;if(this[_0x51dde0(0x16c)]===undefined)this[_0x51dde0(0xe6)]();this['_CoreEngineSettings'][_0x51dde0(0xb7)]=this['initialBattleSystem']();},Game_System[_0xebc2c6(0x2c3)][_0xebc2c6(0x391)]=function(){const _0x2fa71c=_0xebc2c6,_0x1744df=(VisuMZ['CoreEngine'][_0x2fa71c(0x74)]['BattleSystem']||'DATABASE')[_0x2fa71c(0x70a)]()['trim']();return VisuMZ[_0x2fa71c(0x71a)]['CreateBattleSystemID'](_0x1744df);},Game_System[_0xebc2c6(0x2c3)][_0xebc2c6(0x6e8)]=function(){const _0x4ee92d=_0xebc2c6;if($gameTemp[_0x4ee92d(0x284)]!==undefined)return $gameTemp[_0x4ee92d(0x284)];if(this[_0x4ee92d(0x16c)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x4ee92d(0xb7)]===undefined)this['resetBattleSystem']();return this['_CoreEngineSettings'][_0x4ee92d(0xb7)];},Game_System[_0xebc2c6(0x2c3)]['setBattleSystem']=function(_0x12b30e){const _0x56ef5f=_0xebc2c6;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x56ef5f(0xb7)]===undefined)this['resetBattleSystem']();this[_0x56ef5f(0x16c)][_0x56ef5f(0xb7)]=_0x12b30e;},Game_System[_0xebc2c6(0x2c3)][_0xebc2c6(0x478)]=function(){const _0x5a6325=_0xebc2c6;if(this['_CoreEngineSettings']===undefined)this[_0x5a6325(0xe6)]();if(this[_0x5a6325(0x16c)]['FontSize']===undefined)this[_0x5a6325(0xe6)]();return this[_0x5a6325(0x16c)][_0x5a6325(0x5c9)];},Game_System['prototype'][_0xebc2c6(0x455)]=function(_0x3d0d21){const _0x49db18=_0xebc2c6;if(this[_0x49db18(0x16c)]===undefined)this[_0x49db18(0xe6)]();if(this['_CoreEngineSettings']['TimeProgress']===undefined)this[_0x49db18(0xe6)]();this[_0x49db18(0x16c)][_0x49db18(0x5c9)]=_0x3d0d21;},Game_System[_0xebc2c6(0x2c3)][_0xebc2c6(0x1c3)]=function(){const _0xc0b900=_0xebc2c6;if(this[_0xc0b900(0x16c)]===undefined)this[_0xc0b900(0xe6)]();if(this[_0xc0b900(0x16c)][_0xc0b900(0x5d8)]===undefined)this[_0xc0b900(0xe6)]();return this['_CoreEngineSettings']['Padding'];},Game_System[_0xebc2c6(0x2c3)][_0xebc2c6(0x584)]=function(_0x2a1a60){const _0x3d0cd6=_0xebc2c6;if(this[_0x3d0cd6(0x16c)]===undefined)this[_0x3d0cd6(0xe6)]();if(this['_CoreEngineSettings'][_0x3d0cd6(0x3c4)]===undefined)this[_0x3d0cd6(0xe6)]();this['_CoreEngineSettings'][_0x3d0cd6(0x5d8)]=_0x2a1a60;},VisuMZ[_0xebc2c6(0x71a)]['Game_Screen_initialize']=Game_Screen['prototype']['initialize'],Game_Screen[_0xebc2c6(0x2c3)]['initialize']=function(){const _0x592c5c=_0xebc2c6;VisuMZ[_0x592c5c(0x71a)]['Game_Screen_initialize']['call'](this),this[_0x592c5c(0x201)]();},Game_Screen[_0xebc2c6(0x2c3)]['initCoreEngineScreenShake']=function(){const _0x1ec7aa=_0xebc2c6,_0x177be0=VisuMZ[_0x1ec7aa(0x71a)]['Settings'][_0x1ec7aa(0x402)];this[_0x1ec7aa(0x33d)]=_0x177be0?.[_0x1ec7aa(0x4f9)]||'random';},Game_Screen['prototype'][_0xebc2c6(0x738)]=function(){const _0x33a5b3=_0xebc2c6;if(this['_coreEngineShakeStyle']===undefined)this[_0x33a5b3(0x201)]();return this['_coreEngineShakeStyle'];},Game_Screen[_0xebc2c6(0x2c3)][_0xebc2c6(0x59e)]=function(_0x133285){const _0x21f982=_0xebc2c6;if(this[_0x21f982(0x33d)]===undefined)this[_0x21f982(0x201)]();this['_coreEngineShakeStyle']=_0x133285[_0x21f982(0x281)]()['trim']();},Game_Picture[_0xebc2c6(0x2c3)][_0xebc2c6(0x42d)]=function(){const _0x5f2405=_0xebc2c6;if($gameParty[_0x5f2405(0xce)]())return![];return this['name']()&&this['name']()[_0x5f2405(0x559)](0x0)==='!';},VisuMZ[_0xebc2c6(0x71a)]['Game_Picture_x']=Game_Picture['prototype']['x'],Game_Picture['prototype']['x']=function(){const _0x2bc3de=_0xebc2c6;return this[_0x2bc3de(0x42d)]()?this[_0x2bc3de(0x299)]():VisuMZ[_0x2bc3de(0x71a)][_0x2bc3de(0x4e7)][_0x2bc3de(0x32f)](this);},Game_Picture[_0xebc2c6(0x2c3)][_0xebc2c6(0x299)]=function(){const _0x3213bc=_0xebc2c6,_0x5160f0=$gameMap[_0x3213bc(0x4cf)]()*$gameMap[_0x3213bc(0x19e)]();return this['_x']-_0x5160f0;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x1d2)]=Game_Picture[_0xebc2c6(0x2c3)]['y'],Game_Picture[_0xebc2c6(0x2c3)]['y']=function(){const _0x41bf0a=_0xebc2c6;return this[_0x41bf0a(0x42d)]()?this['yScrollLinkedOffset']():VisuMZ['CoreEngine']['Game_Picture_y']['call'](this);},Game_Picture[_0xebc2c6(0x2c3)]['yScrollLinkedOffset']=function(){const _0x48bfbc=_0xebc2c6,_0x25fec2=$gameMap[_0x48bfbc(0x2b1)]()*$gameMap['tileHeight']();return this['_y']-_0x25fec2;},Game_Picture[_0xebc2c6(0x2c3)][_0xebc2c6(0x190)]=function(_0x2c9091){const _0x6a9859=_0xebc2c6;this[_0x6a9859(0x4f2)]=_0x2c9091;},VisuMZ[_0xebc2c6(0x71a)]['Game_Picture_calcEasing']=Game_Picture[_0xebc2c6(0x2c3)][_0xebc2c6(0x266)],Game_Picture[_0xebc2c6(0x2c3)][_0xebc2c6(0x266)]=function(_0x5244af){const _0x3e03b8=_0xebc2c6;return this[_0x3e03b8(0x4f2)]=this[_0x3e03b8(0x4f2)]||0x0,[0x0,0x1,0x2,0x3]['includes'](this[_0x3e03b8(0x4f2)])?VisuMZ['CoreEngine'][_0x3e03b8(0x121)][_0x3e03b8(0x32f)](this,_0x5244af):VisuMZ[_0x3e03b8(0x28c)](_0x5244af,this[_0x3e03b8(0x4f2)]);},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x58b)]=Game_Action['prototype'][_0xebc2c6(0x4fa)],Game_Action[_0xebc2c6(0x2c3)][_0xebc2c6(0x4fa)]=function(_0x241f35){const _0x134302=_0xebc2c6;return VisuMZ[_0x134302(0x71a)][_0x134302(0x74)][_0x134302(0x4b2)][_0x134302(0x507)]?this[_0x134302(0x658)](_0x241f35):VisuMZ['CoreEngine'][_0x134302(0x58b)][_0x134302(0x32f)](this,_0x241f35);},Game_Action['prototype'][_0xebc2c6(0x658)]=function(_0x3e8ec0){const _0x5ae9fb=_0xebc2c6,_0x443e3c=this['itemSuccessRate'](_0x3e8ec0),_0x1ce251=this[_0x5ae9fb(0x499)](_0x3e8ec0),_0x22821c=this['targetEvaRate'](_0x3e8ec0);return _0x443e3c*(_0x1ce251-_0x22821c);},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x611)]=Game_Action['prototype'][_0xebc2c6(0x1d7)],Game_Action['prototype'][_0xebc2c6(0x1d7)]=function(_0x3b03cb){const _0x5dc977=_0xebc2c6;return VisuMZ[_0x5dc977(0x71a)]['Settings'][_0x5dc977(0x4b2)]['ImprovedAccuracySystem']?0x0:VisuMZ['CoreEngine'][_0x5dc977(0x611)][_0x5dc977(0x32f)](this,_0x3b03cb);},Game_Action[_0xebc2c6(0x2c3)]['itemSuccessRate']=function(_0x472bc5){const _0x41d394=_0xebc2c6;return this['item']()[_0x41d394(0x3d0)]*0.01;},Game_Action[_0xebc2c6(0x2c3)][_0xebc2c6(0x499)]=function(_0x3ee078){const _0x20f79e=_0xebc2c6;if(VisuMZ['CoreEngine']['Settings'][_0x20f79e(0x4b2)]['AccuracyBoost']&&this[_0x20f79e(0xa2)]())return 0x1;return this[_0x20f79e(0x67f)]()?VisuMZ[_0x20f79e(0x71a)][_0x20f79e(0x74)][_0x20f79e(0x4b2)][_0x20f79e(0x74a)]&&this[_0x20f79e(0x356)]()[_0x20f79e(0x409)]()?this[_0x20f79e(0x356)]()[_0x20f79e(0x353)]+0.05:this['subject']()[_0x20f79e(0x353)]:0x1;},Game_Action[_0xebc2c6(0x2c3)][_0xebc2c6(0x51b)]=function(_0x5b431c){const _0x280fe2=_0xebc2c6;if(this['subject']()['isActor']()===_0x5b431c[_0x280fe2(0x409)]())return 0x0;if(this[_0x280fe2(0x67f)]())return VisuMZ[_0x280fe2(0x71a)][_0x280fe2(0x74)][_0x280fe2(0x4b2)][_0x280fe2(0x74a)]&&_0x5b431c[_0x280fe2(0x527)]()?_0x5b431c[_0x280fe2(0x2cf)]-0.05:_0x5b431c[_0x280fe2(0x2cf)];else return this[_0x280fe2(0x1aa)]()?_0x5b431c['mev']:0x0;},VisuMZ[_0xebc2c6(0x71a)]['Game_Action_updateLastTarget']=Game_Action[_0xebc2c6(0x2c3)][_0xebc2c6(0x280)],Game_Action[_0xebc2c6(0x2c3)][_0xebc2c6(0x280)]=function(_0x964fda){const _0x364abb=_0xebc2c6;VisuMZ[_0x364abb(0x71a)][_0x364abb(0x390)]['call'](this,_0x964fda);if(VisuMZ[_0x364abb(0x71a)][_0x364abb(0x74)][_0x364abb(0x4b2)][_0x364abb(0x507)])return;const _0x54ad5a=_0x964fda[_0x364abb(0x32b)]();_0x54ad5a['missed']&&(0x1-this[_0x364abb(0x1d7)](_0x964fda)>this[_0x364abb(0x4fa)](_0x964fda)&&(_0x54ad5a[_0x364abb(0x53d)]=![],_0x54ad5a[_0x364abb(0x3d5)]=!![]));},VisuMZ['CoreEngine'][_0xebc2c6(0x407)]=Game_BattlerBase['prototype'][_0xebc2c6(0x36e)],Game_BattlerBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x36e)]=function(){const _0x2f7231=_0xebc2c6;this['_cache']={},VisuMZ[_0x2f7231(0x71a)][_0x2f7231(0x407)]['call'](this);},VisuMZ[_0xebc2c6(0x71a)]['Game_BattlerBase_refresh']=Game_BattlerBase['prototype'][_0xebc2c6(0x4d3)],Game_BattlerBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x4d3)]=function(){const _0x5e5c2a=_0xebc2c6;this['_cache']={},VisuMZ[_0x5e5c2a(0x71a)]['Game_BattlerBase_refresh'][_0x5e5c2a(0x32f)](this);},Game_BattlerBase[_0xebc2c6(0x2c3)]['checkCacheKey']=function(_0x300747){const _0x59b297=_0xebc2c6;return this[_0x59b297(0x36b)]=this[_0x59b297(0x36b)]||{},this[_0x59b297(0x36b)][_0x300747]!==undefined;},Game_BattlerBase['prototype'][_0xebc2c6(0x8a)]=function(_0x3f50a4){const _0x4b111b=_0xebc2c6,_0x20c06e=(_0x149e95,_0x3ceb46)=>{const _0xdc6308=_0x1f8b;if(!_0x3ceb46)return _0x149e95;if(_0x3ceb46[_0xdc6308(0x2f7)][_0xdc6308(0x3f9)](VisuMZ[_0xdc6308(0x71a)][_0xdc6308(0x279)]['paramPlus'][_0x3f50a4])){var _0x56bf10=Number(RegExp['$1']);_0x149e95+=_0x56bf10;}if(_0x3ceb46[_0xdc6308(0x2f7)]['match'](VisuMZ[_0xdc6308(0x71a)][_0xdc6308(0x279)][_0xdc6308(0x4fd)][_0x3f50a4])){var _0x182553=String(RegExp['$1']);try{_0x149e95+=eval(_0x182553);}catch(_0x5c6dbb){if($gameTemp['isPlaytest']())console['log'](_0x5c6dbb);}}return _0x149e95;};return this['traitObjects']()[_0x4b111b(0x8f)](_0x20c06e,this[_0x4b111b(0x5ca)][_0x3f50a4]);},Game_BattlerBase[_0xebc2c6(0x2c3)][_0xebc2c6(0xb0)]=function(_0x4009a2){const _0x1f570d=_0xebc2c6;var _0x73ab18='Basic'+(this[_0x1f570d(0x409)]()?_0x1f570d(0x6c8):'Enemy')+'ParamMax'+_0x4009a2;if(this['checkCacheKey'](_0x73ab18))return this[_0x1f570d(0x36b)][_0x73ab18];this['_cache'][_0x73ab18]=eval(VisuMZ[_0x1f570d(0x71a)][_0x1f570d(0x74)][_0x1f570d(0x4c8)][_0x73ab18]);const _0x273fb4=(_0x563150,_0x2a797e)=>{const _0x2bf1bd=_0x1f570d;if(!_0x2a797e)return _0x563150;if(_0x2a797e[_0x2bf1bd(0x2f7)][_0x2bf1bd(0x3f9)](VisuMZ[_0x2bf1bd(0x71a)][_0x2bf1bd(0x279)][_0x2bf1bd(0xb0)][_0x4009a2])){var _0x58503b=Number(RegExp['$1']);if(_0x58503b===0x0)_0x58503b=Number[_0x2bf1bd(0x368)];_0x563150=Math[_0x2bf1bd(0x631)](_0x563150,_0x58503b);}if(_0x2a797e['note']['match'](VisuMZ[_0x2bf1bd(0x71a)][_0x2bf1bd(0x279)][_0x2bf1bd(0x5df)][_0x4009a2])){var _0xa4ad07=String(RegExp['$1']);try{_0x563150=Math[_0x2bf1bd(0x631)](_0x563150,Number(eval(_0xa4ad07)));}catch(_0x4ede48){if($gameTemp[_0x2bf1bd(0x72d)]())console[_0x2bf1bd(0x242)](_0x4ede48);}}return _0x563150;};if(this['_cache'][_0x73ab18]===0x0)this[_0x1f570d(0x36b)][_0x73ab18]=Number['MAX_SAFE_INTEGER'];return this[_0x1f570d(0x36b)][_0x73ab18]=this[_0x1f570d(0x46f)]()[_0x1f570d(0x8f)](_0x273fb4,this[_0x1f570d(0x36b)][_0x73ab18]),this[_0x1f570d(0x36b)][_0x73ab18];},Game_BattlerBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x19f)]=function(_0x37b110){const _0x23623f=_0xebc2c6,_0xa45627=this['traitsPi'](Game_BattlerBase[_0x23623f(0x311)],_0x37b110),_0x24787f=(_0x5f67,_0x3a9a1d)=>{const _0x4626b3=_0x23623f;if(!_0x3a9a1d)return _0x5f67;if(_0x3a9a1d[_0x4626b3(0x2f7)]['match'](VisuMZ[_0x4626b3(0x71a)][_0x4626b3(0x279)][_0x4626b3(0x3b2)][_0x37b110])){var _0x318b16=Number(RegExp['$1'])/0x64;_0x5f67*=_0x318b16;}if(_0x3a9a1d[_0x4626b3(0x2f7)][_0x4626b3(0x3f9)](VisuMZ[_0x4626b3(0x71a)]['RegExp'][_0x4626b3(0x3ec)][_0x37b110])){var _0x318b16=Number(RegExp['$1']);_0x5f67*=_0x318b16;}if(_0x3a9a1d[_0x4626b3(0x2f7)]['match'](VisuMZ[_0x4626b3(0x71a)]['RegExp'][_0x4626b3(0x3c0)][_0x37b110])){var _0x47c871=String(RegExp['$1']);try{_0x5f67*=eval(_0x47c871);}catch(_0x216754){if($gameTemp['isPlaytest']())console[_0x4626b3(0x242)](_0x216754);}}return _0x5f67;};return this[_0x23623f(0x46f)]()[_0x23623f(0x8f)](_0x24787f,_0xa45627);},Game_BattlerBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x4b5)]=function(_0x1524ec){const _0x53ce3e=_0xebc2c6,_0x1bf722=(_0x4ee752,_0x329a0b)=>{const _0x570e56=_0x1f8b;if(!_0x329a0b)return _0x4ee752;if(_0x329a0b['note'][_0x570e56(0x3f9)](VisuMZ[_0x570e56(0x71a)]['RegExp'][_0x570e56(0x3a1)][_0x1524ec])){var _0x5eabe1=Number(RegExp['$1']);_0x4ee752+=_0x5eabe1;}if(_0x329a0b[_0x570e56(0x2f7)][_0x570e56(0x3f9)](VisuMZ[_0x570e56(0x71a)][_0x570e56(0x279)][_0x570e56(0x27b)][_0x1524ec])){var _0x4fd6e0=String(RegExp['$1']);try{_0x4ee752+=eval(_0x4fd6e0);}catch(_0x264ad1){if($gameTemp['isPlaytest']())console[_0x570e56(0x242)](_0x264ad1);}}return _0x4ee752;};return this['traitObjects']()[_0x53ce3e(0x8f)](_0x1bf722,0x0);},Game_BattlerBase[_0xebc2c6(0x2c3)]['param']=function(_0xc900d9){const _0x1eea0c=_0xebc2c6;let _0x3ff6dd='param'+_0xc900d9+_0x1eea0c(0xfc);if(this[_0x1eea0c(0x61a)](_0x3ff6dd))return this[_0x1eea0c(0x36b)][_0x3ff6dd];return this[_0x1eea0c(0x36b)][_0x3ff6dd]=Math[_0x1eea0c(0x6b6)](VisuMZ['CoreEngine'][_0x1eea0c(0x74)]['Param'][_0x1eea0c(0xc2)][_0x1eea0c(0x32f)](this,_0xc900d9)),this[_0x1eea0c(0x36b)][_0x3ff6dd];},Game_BattlerBase['prototype'][_0xebc2c6(0x39c)]=function(_0xc9b27e){const _0x10f82f=_0xebc2c6,_0xe211cc=(_0x52e4a5,_0x2d40a6)=>{const _0x1a383b=_0x1f8b;if(!_0x2d40a6)return _0x52e4a5;if(_0x2d40a6[_0x1a383b(0x2f7)][_0x1a383b(0x3f9)](VisuMZ[_0x1a383b(0x71a)][_0x1a383b(0x279)]['xparamPlus1'][_0xc9b27e])){var _0x4656c5=Number(RegExp['$1'])/0x64;_0x52e4a5+=_0x4656c5;}if(_0x2d40a6[_0x1a383b(0x2f7)][_0x1a383b(0x3f9)](VisuMZ['CoreEngine'][_0x1a383b(0x279)][_0x1a383b(0x8b)][_0xc9b27e])){var _0x4656c5=Number(RegExp['$1']);_0x52e4a5+=_0x4656c5;}if(_0x2d40a6[_0x1a383b(0x2f7)][_0x1a383b(0x3f9)](VisuMZ[_0x1a383b(0x71a)]['RegExp'][_0x1a383b(0x321)][_0xc9b27e])){var _0x225253=String(RegExp['$1']);try{_0x52e4a5+=eval(_0x225253);}catch(_0x34c9a7){if($gameTemp[_0x1a383b(0x72d)]())console[_0x1a383b(0x242)](_0x34c9a7);}}return _0x52e4a5;};return this[_0x10f82f(0x46f)]()[_0x10f82f(0x8f)](_0xe211cc,0x0);},Game_BattlerBase['prototype'][_0xebc2c6(0x53a)]=function(_0x2c27c6){const _0x20438e=_0xebc2c6,_0x1198e5=(_0x3e0210,_0x2ec6d7)=>{const _0x3f5070=_0x1f8b;if(!_0x2ec6d7)return _0x3e0210;if(_0x2ec6d7[_0x3f5070(0x2f7)][_0x3f5070(0x3f9)](VisuMZ[_0x3f5070(0x71a)]['RegExp'][_0x3f5070(0x3bf)][_0x2c27c6])){var _0x39e91c=Number(RegExp['$1'])/0x64;_0x3e0210*=_0x39e91c;}if(_0x2ec6d7[_0x3f5070(0x2f7)][_0x3f5070(0x3f9)](VisuMZ[_0x3f5070(0x71a)][_0x3f5070(0x279)][_0x3f5070(0x337)][_0x2c27c6])){var _0x39e91c=Number(RegExp['$1']);_0x3e0210*=_0x39e91c;}if(_0x2ec6d7[_0x3f5070(0x2f7)][_0x3f5070(0x3f9)](VisuMZ[_0x3f5070(0x71a)]['RegExp']['xparamRateJS'][_0x2c27c6])){var _0x277b25=String(RegExp['$1']);try{_0x3e0210*=eval(_0x277b25);}catch(_0x2f4eb0){if($gameTemp[_0x3f5070(0x72d)]())console[_0x3f5070(0x242)](_0x2f4eb0);}}return _0x3e0210;};return this[_0x20438e(0x46f)]()[_0x20438e(0x8f)](_0x1198e5,0x1);},Game_BattlerBase['prototype'][_0xebc2c6(0x43f)]=function(_0x1e6be4){const _0x43419e=_0xebc2c6,_0x330fe5=(_0x305a32,_0x2c00d1)=>{const _0x1e9027=_0x1f8b;if(!_0x2c00d1)return _0x305a32;if(_0x2c00d1[_0x1e9027(0x2f7)][_0x1e9027(0x3f9)](VisuMZ[_0x1e9027(0x71a)][_0x1e9027(0x279)][_0x1e9027(0x4a4)][_0x1e6be4])){var _0x117a65=Number(RegExp['$1'])/0x64;_0x305a32+=_0x117a65;}if(_0x2c00d1[_0x1e9027(0x2f7)]['match'](VisuMZ[_0x1e9027(0x71a)][_0x1e9027(0x279)]['xparamFlat2'][_0x1e6be4])){var _0x117a65=Number(RegExp['$1']);_0x305a32+=_0x117a65;}if(_0x2c00d1[_0x1e9027(0x2f7)][_0x1e9027(0x3f9)](VisuMZ[_0x1e9027(0x71a)][_0x1e9027(0x279)][_0x1e9027(0x741)][_0x1e6be4])){var _0x343c21=String(RegExp['$1']);try{_0x305a32+=eval(_0x343c21);}catch(_0x227970){if($gameTemp[_0x1e9027(0x72d)]())console[_0x1e9027(0x242)](_0x227970);}}return _0x305a32;};return this[_0x43419e(0x46f)]()['reduce'](_0x330fe5,0x0);},Game_BattlerBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x6cb)]=function(_0x3a3858){const _0x386c0c=_0xebc2c6;let _0x1cafa7=_0x386c0c(0x6cb)+_0x3a3858+_0x386c0c(0xfc);if(this[_0x386c0c(0x61a)](_0x1cafa7))return this[_0x386c0c(0x36b)][_0x1cafa7];return this[_0x386c0c(0x36b)][_0x1cafa7]=VisuMZ[_0x386c0c(0x71a)][_0x386c0c(0x74)][_0x386c0c(0x4c8)][_0x386c0c(0x1e6)][_0x386c0c(0x32f)](this,_0x3a3858),this['_cache'][_0x1cafa7];},Game_BattlerBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x739)]=function(_0x2b7904){const _0x49baf4=_0xebc2c6,_0x18301d=(_0x156e1b,_0x3dd26f)=>{const _0x41ce51=_0x1f8b;if(!_0x3dd26f)return _0x156e1b;if(_0x3dd26f['note'][_0x41ce51(0x3f9)](VisuMZ[_0x41ce51(0x71a)]['RegExp']['sparamPlus1'][_0x2b7904])){var _0x1c6429=Number(RegExp['$1'])/0x64;_0x156e1b+=_0x1c6429;}if(_0x3dd26f[_0x41ce51(0x2f7)][_0x41ce51(0x3f9)](VisuMZ['CoreEngine'][_0x41ce51(0x279)]['sparamPlus2'][_0x2b7904])){var _0x1c6429=Number(RegExp['$1']);_0x156e1b+=_0x1c6429;}if(_0x3dd26f[_0x41ce51(0x2f7)][_0x41ce51(0x3f9)](VisuMZ['CoreEngine'][_0x41ce51(0x279)][_0x41ce51(0x3f0)][_0x2b7904])){var _0x224335=String(RegExp['$1']);try{_0x156e1b+=eval(_0x224335);}catch(_0x3f561f){if($gameTemp[_0x41ce51(0x72d)]())console[_0x41ce51(0x242)](_0x3f561f);}}return _0x156e1b;};return this[_0x49baf4(0x46f)]()[_0x49baf4(0x8f)](_0x18301d,0x0);},Game_BattlerBase['prototype'][_0xebc2c6(0x4bb)]=function(_0x13c9f0){const _0xd80a70=_0xebc2c6,_0x1ae69f=(_0x29cd6e,_0x158071)=>{const _0x54dd21=_0x1f8b;if(!_0x158071)return _0x29cd6e;if(_0x158071[_0x54dd21(0x2f7)][_0x54dd21(0x3f9)](VisuMZ['CoreEngine'][_0x54dd21(0x279)][_0x54dd21(0x152)][_0x13c9f0])){var _0x21ec2b=Number(RegExp['$1'])/0x64;_0x29cd6e*=_0x21ec2b;}if(_0x158071[_0x54dd21(0x2f7)][_0x54dd21(0x3f9)](VisuMZ[_0x54dd21(0x71a)][_0x54dd21(0x279)][_0x54dd21(0x52c)][_0x13c9f0])){var _0x21ec2b=Number(RegExp['$1']);_0x29cd6e*=_0x21ec2b;}if(_0x158071['note'][_0x54dd21(0x3f9)](VisuMZ[_0x54dd21(0x71a)][_0x54dd21(0x279)][_0x54dd21(0xac)][_0x13c9f0])){var _0x5b9b8d=String(RegExp['$1']);try{_0x29cd6e*=eval(_0x5b9b8d);}catch(_0x520572){if($gameTemp['isPlaytest']())console[_0x54dd21(0x242)](_0x520572);}}return _0x29cd6e;};return this[_0xd80a70(0x46f)]()[_0xd80a70(0x8f)](_0x1ae69f,0x1);},Game_BattlerBase['prototype']['sparamFlatBonus']=function(_0x53a30d){const _0x111383=_0xebc2c6,_0x23c2ce=(_0x3f255d,_0x5b7f50)=>{const _0xe25fc=_0x1f8b;if(!_0x5b7f50)return _0x3f255d;if(_0x5b7f50[_0xe25fc(0x2f7)][_0xe25fc(0x3f9)](VisuMZ[_0xe25fc(0x71a)]['RegExp'][_0xe25fc(0xe2)][_0x53a30d])){var _0x3044fd=Number(RegExp['$1'])/0x64;_0x3f255d+=_0x3044fd;}if(_0x5b7f50[_0xe25fc(0x2f7)]['match'](VisuMZ[_0xe25fc(0x71a)]['RegExp']['sparamFlat2'][_0x53a30d])){var _0x3044fd=Number(RegExp['$1']);_0x3f255d+=_0x3044fd;}if(_0x5b7f50['note'][_0xe25fc(0x3f9)](VisuMZ[_0xe25fc(0x71a)]['RegExp']['sparamFlatJS'][_0x53a30d])){var _0x551ffd=String(RegExp['$1']);try{_0x3f255d+=eval(_0x551ffd);}catch(_0x41a91d){if($gameTemp['isPlaytest']())console[_0xe25fc(0x242)](_0x41a91d);}}return _0x3f255d;};return this['traitObjects']()[_0x111383(0x8f)](_0x23c2ce,0x0);},Game_BattlerBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x400)]=function(_0x3ba784){const _0xc77533=_0xebc2c6;let _0x1d7398='sparam'+_0x3ba784+_0xc77533(0xfc);if(this[_0xc77533(0x61a)](_0x1d7398))return this['_cache'][_0x1d7398];return this[_0xc77533(0x36b)][_0x1d7398]=VisuMZ[_0xc77533(0x71a)][_0xc77533(0x74)][_0xc77533(0x4c8)][_0xc77533(0x47b)][_0xc77533(0x32f)](this,_0x3ba784),this[_0xc77533(0x36b)][_0x1d7398];},Game_BattlerBase['prototype'][_0xebc2c6(0x476)]=function(_0x3e237f,_0x59ede7){const _0x4f7e55=_0xebc2c6;if(typeof paramId===_0x4f7e55(0x43c))return this[_0x4f7e55(0x3e8)](_0x3e237f);_0x3e237f=String(_0x3e237f||'')['toUpperCase']();if(_0x3e237f==='MAXHP')return this[_0x4f7e55(0x3e8)](0x0);if(_0x3e237f==='MAXMP')return this[_0x4f7e55(0x3e8)](0x1);if(_0x3e237f===_0x4f7e55(0x32a))return this['param'](0x2);if(_0x3e237f===_0x4f7e55(0x5d4))return this['param'](0x3);if(_0x3e237f===_0x4f7e55(0x1c8))return this[_0x4f7e55(0x3e8)](0x4);if(_0x3e237f===_0x4f7e55(0x2ea))return this[_0x4f7e55(0x3e8)](0x5);if(_0x3e237f===_0x4f7e55(0x137))return this['param'](0x6);if(_0x3e237f==='LUK')return this['param'](0x7);if(_0x3e237f===_0x4f7e55(0x6e6))return _0x59ede7?String(Math[_0x4f7e55(0x6b6)](this[_0x4f7e55(0x6cb)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x3e237f==='EVA')return _0x59ede7?String(Math[_0x4f7e55(0x6b6)](this['xparam'](0x1)*0x64))+'%':this[_0x4f7e55(0x6cb)](0x1);if(_0x3e237f===_0x4f7e55(0x3c3))return _0x59ede7?String(Math[_0x4f7e55(0x6b6)](this['xparam'](0x2)*0x64))+'%':this[_0x4f7e55(0x6cb)](0x2);if(_0x3e237f===_0x4f7e55(0x720))return _0x59ede7?String(Math[_0x4f7e55(0x6b6)](this['xparam'](0x3)*0x64))+'%':this['xparam'](0x3);if(_0x3e237f===_0x4f7e55(0x694))return _0x59ede7?String(Math['round'](this[_0x4f7e55(0x6cb)](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x3e237f===_0x4f7e55(0x28b))return _0x59ede7?String(Math[_0x4f7e55(0x6b6)](this[_0x4f7e55(0x6cb)](0x5)*0x64))+'%':this[_0x4f7e55(0x6cb)](0x5);if(_0x3e237f==='CNT')return _0x59ede7?String(Math[_0x4f7e55(0x6b6)](this[_0x4f7e55(0x6cb)](0x6)*0x64))+'%':this[_0x4f7e55(0x6cb)](0x6);if(_0x3e237f==='HRG')return _0x59ede7?String(Math[_0x4f7e55(0x6b6)](this['xparam'](0x7)*0x64))+'%':this[_0x4f7e55(0x6cb)](0x7);if(_0x3e237f==='MRG')return _0x59ede7?String(Math['round'](this['xparam'](0x8)*0x64))+'%':this[_0x4f7e55(0x6cb)](0x8);if(_0x3e237f==='TRG')return _0x59ede7?String(Math[_0x4f7e55(0x6b6)](this[_0x4f7e55(0x6cb)](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x3e237f===_0x4f7e55(0x151))return _0x59ede7?String(Math[_0x4f7e55(0x6b6)](this['sparam'](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x3e237f===_0x4f7e55(0x4da))return _0x59ede7?String(Math['round'](this[_0x4f7e55(0x400)](0x1)*0x64))+'%':this[_0x4f7e55(0x400)](0x1);if(_0x3e237f===_0x4f7e55(0x2c1))return _0x59ede7?String(Math[_0x4f7e55(0x6b6)](this[_0x4f7e55(0x400)](0x2)*0x64))+'%':this[_0x4f7e55(0x400)](0x2);if(_0x3e237f==='PHA')return _0x59ede7?String(Math[_0x4f7e55(0x6b6)](this['sparam'](0x3)*0x64))+'%':this[_0x4f7e55(0x400)](0x3);if(_0x3e237f===_0x4f7e55(0x545))return _0x59ede7?String(Math['round'](this['sparam'](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x3e237f===_0x4f7e55(0x17d))return _0x59ede7?String(Math[_0x4f7e55(0x6b6)](this[_0x4f7e55(0x400)](0x5)*0x64))+'%':this[_0x4f7e55(0x400)](0x5);if(_0x3e237f===_0x4f7e55(0x101))return _0x59ede7?String(Math['round'](this['sparam'](0x6)*0x64))+'%':this[_0x4f7e55(0x400)](0x6);if(_0x3e237f==='MDR')return _0x59ede7?String(Math[_0x4f7e55(0x6b6)](this['sparam'](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x3e237f===_0x4f7e55(0x610))return _0x59ede7?String(Math[_0x4f7e55(0x6b6)](this[_0x4f7e55(0x400)](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x3e237f==='EXR')return _0x59ede7?String(Math[_0x4f7e55(0x6b6)](this['sparam'](0x9)*0x64))+'%':this[_0x4f7e55(0x400)](0x9);if(VisuMZ[_0x4f7e55(0x71a)][_0x4f7e55(0x4ee)][_0x3e237f]){const _0xdf009d=VisuMZ[_0x4f7e55(0x71a)][_0x4f7e55(0x4ee)][_0x3e237f],_0xdb3a65=this[_0xdf009d];return VisuMZ['CoreEngine'][_0x4f7e55(0x689)][_0x3e237f]==='integer'?_0xdb3a65:_0x59ede7?String(Math[_0x4f7e55(0x6b6)](_0xdb3a65*0x64))+'%':_0xdb3a65;}return'';},Game_BattlerBase[_0xebc2c6(0x2c3)]['isDying']=function(){const _0x755b7b=_0xebc2c6;return this[_0x755b7b(0x255)]()&&this['_hp']<this[_0x755b7b(0x2df)]*VisuMZ[_0x755b7b(0x71a)][_0x755b7b(0x74)][_0x755b7b(0x4c8)][_0x755b7b(0x429)];},Game_Battler['prototype'][_0xebc2c6(0x4cd)]=function(){const _0x139bbb=_0xebc2c6;SoundManager[_0x139bbb(0x4d1)](),this[_0x139bbb(0x725)](_0x139bbb(0x2ff));},VisuMZ[_0xebc2c6(0x71a)]['Game_Actor_paramBase']=Game_Actor[_0xebc2c6(0x2c3)][_0xebc2c6(0x42c)],Game_Actor[_0xebc2c6(0x2c3)][_0xebc2c6(0x42c)]=function(_0xd967a7){const _0x393357=_0xebc2c6;if(this[_0x393357(0x15d)]>0x63)return this[_0x393357(0x1cf)](_0xd967a7);return VisuMZ[_0x393357(0x71a)]['Game_Actor_paramBase'][_0x393357(0x32f)](this,_0xd967a7);},Game_Actor[_0xebc2c6(0x2c3)][_0xebc2c6(0x1cf)]=function(_0x2a1bc9){const _0x48f890=_0xebc2c6,_0x2dffcc=this[_0x48f890(0x491)]()[_0x48f890(0x9a)][_0x2a1bc9][0x63],_0xdf61d0=this[_0x48f890(0x491)]()[_0x48f890(0x9a)][_0x2a1bc9][0x62];return _0x2dffcc+(_0x2dffcc-_0xdf61d0)*(this[_0x48f890(0x15d)]-0x63);},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x211)]=Game_Actor[_0xebc2c6(0x2c3)][_0xebc2c6(0x293)],Game_Actor[_0xebc2c6(0x2c3)][_0xebc2c6(0x293)]=function(_0xf47117,_0x1c81f1){const _0x4e03ac=_0xebc2c6;$gameTemp['_changingClass']=!![],VisuMZ[_0x4e03ac(0x71a)][_0x4e03ac(0x211)][_0x4e03ac(0x32f)](this,_0xf47117,_0x1c81f1),$gameTemp[_0x4e03ac(0x6c3)]=undefined;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x64a)]=Game_Actor[_0xebc2c6(0x2c3)]['levelUp'],Game_Actor[_0xebc2c6(0x2c3)][_0xebc2c6(0x4ff)]=function(){const _0x5ce565=_0xebc2c6;VisuMZ[_0x5ce565(0x71a)][_0x5ce565(0x64a)][_0x5ce565(0x32f)](this);if(!$gameTemp[_0x5ce565(0x6c3)])this[_0x5ce565(0xc0)]();},Game_Actor[_0xebc2c6(0x2c3)]['levelUpRecovery']=function(){const _0x942a2a=_0xebc2c6;this[_0x942a2a(0x36b)]={};if(VisuMZ[_0x942a2a(0x71a)]['Settings'][_0x942a2a(0x4b2)][_0x942a2a(0x306)])this[_0x942a2a(0x3f7)]=this[_0x942a2a(0x2df)];if(VisuMZ[_0x942a2a(0x71a)]['Settings'][_0x942a2a(0x4b2)][_0x942a2a(0x4c1)])this[_0x942a2a(0x673)]=this['mmp'];},Game_Actor[_0xebc2c6(0x2c3)][_0xebc2c6(0x4de)]=function(){const _0x1baf46=_0xebc2c6;if(this[_0x1baf46(0x2db)]())return 0x1;const _0x2ed248=this['nextLevelExp']()-this[_0x1baf46(0x59f)](),_0x34c559=this['currentExp']()-this[_0x1baf46(0x59f)]();return(_0x34c559/_0x2ed248)[_0x1baf46(0x1cc)](0x0,0x1);},Game_Actor[_0xebc2c6(0x2c3)][_0xebc2c6(0x46f)]=function(){const _0x10b7b8=_0xebc2c6,_0x36c724=Game_Battler[_0x10b7b8(0x2c3)][_0x10b7b8(0x46f)][_0x10b7b8(0x32f)](this);for(const _0x4dac25 of this[_0x10b7b8(0x3ab)]()){_0x4dac25&&_0x36c724['push'](_0x4dac25);}return _0x36c724[_0x10b7b8(0x710)](this[_0x10b7b8(0x491)](),this[_0x10b7b8(0x529)]()),_0x36c724;},Object[_0xebc2c6(0x2f1)](Game_Enemy[_0xebc2c6(0x2c3)],_0xebc2c6(0x15d),{'get':function(){const _0x26c4a6=_0xebc2c6;return this[_0x26c4a6(0x72)]();},'configurable':!![]}),Game_Enemy[_0xebc2c6(0x2c3)][_0xebc2c6(0x72)]=function(){const _0x29e6b7=_0xebc2c6;return this[_0x29e6b7(0x4cb)]()[_0x29e6b7(0x15d)];},Game_Enemy[_0xebc2c6(0x2c3)][_0xebc2c6(0xf6)]=function(){const _0x209c30=_0xebc2c6;!this[_0x209c30(0x5f8)]&&(this[_0x209c30(0x77)]+=Math[_0x209c30(0x6b6)]((Graphics[_0x209c30(0x102)]-0x270)/0x2),this[_0x209c30(0x77)]-=Math[_0x209c30(0x125)]((Graphics['height']-Graphics[_0x209c30(0x247)])/0x2),$gameSystem[_0x209c30(0x220)]()?this[_0x209c30(0x5d0)]-=Math['floor']((Graphics[_0x209c30(0x20a)]-Graphics['boxWidth'])/0x2):this[_0x209c30(0x5d0)]+=Math[_0x209c30(0x6b6)]((Graphics['boxWidth']-0x330)/0x2)),this[_0x209c30(0x5f8)]=!![];},Game_Party[_0xebc2c6(0x2c3)]['maxGold']=function(){const _0x42e06d=_0xebc2c6;return VisuMZ[_0x42e06d(0x71a)][_0x42e06d(0x74)][_0x42e06d(0x570)][_0x42e06d(0x33c)];},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x2af)]=Game_Party[_0xebc2c6(0x2c3)][_0xebc2c6(0x3fc)],Game_Party[_0xebc2c6(0x2c3)][_0xebc2c6(0x3fc)]=function(_0x544d64){const _0x14a60c=_0xebc2c6;if(VisuMZ['CoreEngine'][_0x14a60c(0x74)][_0x14a60c(0x4b2)][_0x14a60c(0x526)]&&DataManager[_0x14a60c(0x81)](_0x544d64))return;VisuMZ[_0x14a60c(0x71a)][_0x14a60c(0x2af)][_0x14a60c(0x32f)](this,_0x544d64);},Game_Party['prototype']['setupBattleTestItems']=function(){const _0x2284a6=_0xebc2c6,_0x334a2d=VisuMZ[_0x2284a6(0x71a)]['Settings']['QoL'],_0x5c3b24=_0x334a2d[_0x2284a6(0x95)]??0x63;let _0x40098c=[];(_0x334a2d[_0x2284a6(0x136)]??!![])&&(_0x40098c=_0x40098c[_0x2284a6(0x165)]($dataItems));(_0x334a2d[_0x2284a6(0x44d)]??!![])&&(_0x40098c=_0x40098c[_0x2284a6(0x165)]($dataWeapons));(_0x334a2d['BTestArmors']??!![])&&(_0x40098c=_0x40098c[_0x2284a6(0x165)]($dataArmors));for(const _0x5001f4 of _0x40098c){if(!_0x5001f4)continue;if(_0x5001f4[_0x2284a6(0x4d0)][_0x2284a6(0x4d5)]()<=0x0)continue;if(_0x5001f4[_0x2284a6(0x4d0)][_0x2284a6(0x3f9)](/-----/i))continue;this[_0x2284a6(0x4c4)](_0x5001f4,_0x5c3b24);}},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x34e)]=Game_Troop[_0xebc2c6(0x2c3)]['setup'],Game_Troop[_0xebc2c6(0x2c3)][_0xebc2c6(0x418)]=function(_0x4dfbe7){const _0x4f926c=_0xebc2c6;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0x4f926c(0x532)](_0x4dfbe7),VisuMZ['CoreEngine'][_0x4f926c(0x34e)]['call'](this,_0x4dfbe7);},VisuMZ[_0xebc2c6(0x71a)]['Game_Map_setup']=Game_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x418)],Game_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x418)]=function(_0x10bb04){const _0x3ee200=_0xebc2c6;VisuMZ[_0x3ee200(0x71a)][_0x3ee200(0x212)][_0x3ee200(0x32f)](this,_0x10bb04),this['setupCoreEngine'](_0x10bb04);},Game_Map[_0xebc2c6(0x2c3)]['setupCoreEngine']=function(){const _0x4b697f=_0xebc2c6;this[_0x4b697f(0x3af)]=VisuMZ[_0x4b697f(0x71a)][_0x4b697f(0x74)]['QoL']['NoTileShadows']||![];if($dataMap&&$dataMap[_0x4b697f(0x2f7)]){if($dataMap[_0x4b697f(0x2f7)]['match'](/<SHOW TILE SHADOWS>/i))this[_0x4b697f(0x3af)]=![];if($dataMap[_0x4b697f(0x2f7)][_0x4b697f(0x3f9)](/<HIDE TILE SHADOWS>/i))this[_0x4b697f(0x3af)]=!![];}},Game_Map['prototype'][_0xebc2c6(0x5e9)]=function(){const _0x5658d1=_0xebc2c6;if(this[_0x5658d1(0x3af)]===undefined)this[_0x5658d1(0x509)]();return this[_0x5658d1(0x3af)];},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x1df)]=Game_Character[_0xebc2c6(0x2c3)][_0xebc2c6(0x623)],Game_Character[_0xebc2c6(0x2c3)][_0xebc2c6(0x623)]=function(_0xc33468){const _0x47a8f7=_0xebc2c6;try{VisuMZ['CoreEngine']['Game_Character_processMoveCommand'][_0x47a8f7(0x32f)](this,_0xc33468);}catch(_0x2437cf){if($gameTemp['isPlaytest']())console[_0x47a8f7(0x242)](_0x2437cf);}},Game_Player[_0xebc2c6(0x2c3)]['makeEncounterCount']=function(){const _0x572630=_0xebc2c6,_0x12fe3f=$gameMap[_0x572630(0xf2)]();this[_0x572630(0x7c)]=Math[_0x572630(0x3b5)](_0x12fe3f)+Math[_0x572630(0x3b5)](_0x12fe3f)+this[_0x572630(0x349)]();},Game_Player[_0xebc2c6(0x2c3)]['encounterStepsMinimum']=function(){const _0x15bb17=_0xebc2c6;return $dataMap&&$dataMap['note']&&$dataMap[_0x15bb17(0x2f7)][_0x15bb17(0x3f9)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x15bb17(0x71a)][_0x15bb17(0x74)][_0x15bb17(0x4b2)][_0x15bb17(0x100)];},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x632)]=Game_Event[_0xebc2c6(0x2c3)]['isCollidedWithEvents'],Game_Event['prototype'][_0xebc2c6(0x3b9)]=function(_0x4eeea0,_0x500db){const _0x49ee1f=_0xebc2c6;return this['isSmartEventCollisionOn']()?this[_0x49ee1f(0x1ed)](_0x4eeea0,_0x500db):VisuMZ[_0x49ee1f(0x71a)][_0x49ee1f(0x632)][_0x49ee1f(0x32f)](this,_0x4eeea0,_0x500db);},Game_Event[_0xebc2c6(0x2c3)]['isSmartEventCollisionOn']=function(){const _0x412dd2=_0xebc2c6;return VisuMZ[_0x412dd2(0x71a)][_0x412dd2(0x74)][_0x412dd2(0x4b2)][_0x412dd2(0x648)];},Game_Event[_0xebc2c6(0x2c3)][_0xebc2c6(0x1ed)]=function(_0x2360f9,_0x5312a9){const _0x3017aa=_0xebc2c6;if(!this[_0x3017aa(0x740)]())return![];else{const _0x7e7fb1=$gameMap['eventsXyNt'](_0x2360f9,_0x5312a9)[_0x3017aa(0x427)](_0x5d333d=>_0x5d333d[_0x3017aa(0x740)]());return _0x7e7fb1[_0x3017aa(0x749)]>0x0;}},VisuMZ['CoreEngine'][_0xebc2c6(0x205)]=Game_Interpreter[_0xebc2c6(0x2c3)][_0xebc2c6(0x2ab)],Game_Interpreter[_0xebc2c6(0x2c3)][_0xebc2c6(0x2ab)]=function(_0x5b1216){const _0x5cf398=_0xebc2c6,_0x33edbe=this['getCombinedScrollingText']();return _0x33edbe['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x5cf398(0x5da)](_0x33edbe):VisuMZ[_0x5cf398(0x71a)][_0x5cf398(0x205)][_0x5cf398(0x32f)](this,_0x5b1216);},Game_Interpreter[_0xebc2c6(0x2c3)][_0xebc2c6(0x3c5)]=function(){const _0x4a70b5=_0xebc2c6;let _0x33b3ea='',_0x5d1a97=this[_0x4a70b5(0x6fd)]+0x1;while(this[_0x4a70b5(0x495)][_0x5d1a97]&&this[_0x4a70b5(0x495)][_0x5d1a97][_0x4a70b5(0x417)]===0x195){_0x33b3ea+=this[_0x4a70b5(0x495)][_0x5d1a97][_0x4a70b5(0x6b5)][0x0]+'\x0a',_0x5d1a97++;}return _0x33b3ea;},Game_Interpreter[_0xebc2c6(0x2c3)][_0xebc2c6(0x5da)]=function(_0x4d82b9){const _0x19ca1e=_0xebc2c6;try{eval(_0x4d82b9);}catch(_0x312fe1){$gameTemp[_0x19ca1e(0x72d)]()&&(console[_0x19ca1e(0x242)](_0x19ca1e(0x274)),console['log'](_0x312fe1));}return!![];},VisuMZ[_0xebc2c6(0x71a)]['Game_Interpreter_command111']=Game_Interpreter[_0xebc2c6(0x2c3)]['command111'],Game_Interpreter[_0xebc2c6(0x2c3)][_0xebc2c6(0x4bf)]=function(_0x210cbb){const _0xe0e79d=_0xebc2c6;try{VisuMZ['CoreEngine'][_0xe0e79d(0x128)][_0xe0e79d(0x32f)](this,_0x210cbb);}catch(_0x12d631){$gameTemp['isPlaytest']()&&(console[_0xe0e79d(0x242)](_0xe0e79d(0x2b0)),console[_0xe0e79d(0x242)](_0x12d631)),this[_0xe0e79d(0x186)]();}return!![];},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x6d4)]=Game_Interpreter[_0xebc2c6(0x2c3)][_0xebc2c6(0x747)],Game_Interpreter[_0xebc2c6(0x2c3)][_0xebc2c6(0x747)]=function(_0x12da9c){const _0x233c15=_0xebc2c6;try{VisuMZ['CoreEngine'][_0x233c15(0x6d4)][_0x233c15(0x32f)](this,_0x12da9c);}catch(_0x3476d2){$gameTemp[_0x233c15(0x72d)]()&&(console[_0x233c15(0x242)]('Control\x20Variables\x20Script\x20Error'),console['log'](_0x3476d2));}return!![];},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x4b8)]=Game_Interpreter[_0xebc2c6(0x2c3)][_0xebc2c6(0x660)],Game_Interpreter[_0xebc2c6(0x2c3)][_0xebc2c6(0x660)]=function(){const _0x12a946=_0xebc2c6;try{VisuMZ[_0x12a946(0x71a)][_0x12a946(0x4b8)]['call'](this);}catch(_0xc0c8c9){$gameTemp['isPlaytest']()&&(console[_0x12a946(0x242)](_0x12a946(0x5cf)),console[_0x12a946(0x242)](_0xc0c8c9));}return!![];},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x63f)]=Game_Interpreter[_0xebc2c6(0x2c3)][_0xebc2c6(0x169)],Game_Interpreter['prototype']['command357']=function(_0x191f2f){const _0x53d0fa=_0xebc2c6;return $gameTemp[_0x53d0fa(0xcf)](this),VisuMZ['CoreEngine'][_0x53d0fa(0x63f)][_0x53d0fa(0x32f)](this,_0x191f2f);},Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0xad)]=function(){const _0x3617e2=_0xebc2c6;return VisuMZ[_0x3617e2(0x71a)][_0x3617e2(0x74)]['UI'][_0x3617e2(0x3e4)];},Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x5f4)]=function(){const _0x2a5361=_0xebc2c6;return VisuMZ[_0x2a5361(0x71a)][_0x2a5361(0x74)]['UI'][_0x2a5361(0x4c6)];},Scene_Base['prototype'][_0xebc2c6(0x2bc)]=function(){const _0x55628b=_0xebc2c6;return VisuMZ[_0x55628b(0x71a)][_0x55628b(0x74)]['UI'][_0x55628b(0x39f)];},Scene_Base['prototype'][_0xebc2c6(0x58e)]=function(){const _0x483a34=_0xebc2c6;return VisuMZ[_0x483a34(0x71a)][_0x483a34(0x74)]['UI'][_0x483a34(0x2b6)];},Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x61e)]=function(){const _0x58506e=_0xebc2c6;return VisuMZ['CoreEngine'][_0x58506e(0x74)]['UI'][_0x58506e(0xa5)];},Scene_Base['prototype'][_0xebc2c6(0x1a5)]=function(){const _0x40b561=_0xebc2c6;return VisuMZ[_0x40b561(0x71a)]['Settings']['UI'][_0x40b561(0x2c4)];},Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x3a9)]=function(){const _0x4e0482=_0xebc2c6;return VisuMZ[_0x4e0482(0x71a)]['Settings'][_0x4e0482(0x1f9)][_0x4e0482(0x57d)];},VisuMZ[_0xebc2c6(0x71a)]['Scene_Base_createWindowLayer']=Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x268)],Scene_Base[_0xebc2c6(0x2c3)]['createWindowLayer']=function(){const _0x2a58b1=_0xebc2c6;VisuMZ['CoreEngine'][_0x2a58b1(0x5d2)][_0x2a58b1(0x32f)](this),this[_0x2a58b1(0x717)](),this[_0x2a58b1(0x6b7)]['x']=Math[_0x2a58b1(0x6b6)](this['_windowLayer']['x']),this[_0x2a58b1(0x6b7)]['y']=Math['round'](this[_0x2a58b1(0x6b7)]['y']);},Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x717)]=function(){},Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x3da)]=function(){const _0x3e4f11=_0xebc2c6;return TextManager[_0x3e4f11(0x62d)](_0x3e4f11(0x26b),_0x3e4f11(0x70));},Scene_Base[_0xebc2c6(0x2c3)]['buttonAssistKey2']=function(){const _0x238a48=_0xebc2c6;return TextManager[_0x238a48(0x6da)](_0x238a48(0x5b7));},Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x38b)]=function(){const _0x7d208a=_0xebc2c6;return TextManager[_0x7d208a(0x6da)](_0x7d208a(0x2d0));},Scene_Base['prototype'][_0xebc2c6(0x3d3)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base['prototype'][_0xebc2c6(0x291)]=function(){const _0x501989=_0xebc2c6;return TextManager[_0x501989(0x6da)]('cancel');},Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x2c5)]=function(){const _0x25790c=_0xebc2c6;return this[_0x25790c(0x517)]&&this[_0x25790c(0x517)][_0x25790c(0x5e8)]?TextManager[_0x25790c(0x5bd)]:'';},Scene_Base[_0xebc2c6(0x2c3)]['buttonAssistText2']=function(){return'';},Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x252)]=function(){return'';},Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x624)]=function(){const _0x49ff76=_0xebc2c6;return TextManager[_0x49ff76(0x302)];},Scene_Base['prototype'][_0xebc2c6(0x2ac)]=function(){const _0x1836ee=_0xebc2c6;return TextManager[_0x1836ee(0x654)];},Scene_Base['prototype'][_0xebc2c6(0x160)]=function(){return 0x0;},Scene_Base['prototype'][_0xebc2c6(0x249)]=function(){return 0x0;},Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x596)]=function(){return 0x0;},Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x312)]=function(){return 0x0;},Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x222)]=function(){return 0x0;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x1f5)]=Scene_Boot[_0xebc2c6(0x2c3)]['loadSystemImages'],Scene_Boot[_0xebc2c6(0x2c3)]['loadSystemImages']=function(){const _0xa08574=_0xebc2c6;VisuMZ[_0xa08574(0x71a)][_0xa08574(0x1f5)][_0xa08574(0x32f)](this),this[_0xa08574(0xc5)]();},Scene_Boot[_0xebc2c6(0x2c3)][_0xebc2c6(0xc5)]=function(){const _0x387fb1=_0xebc2c6,_0x499d52=['animations',_0x387fb1(0x592),_0x387fb1(0x2ec),'characters',_0x387fb1(0x342),_0x387fb1(0x487),_0x387fb1(0x60d),_0x387fb1(0xec),'sv_actors','sv_enemies',_0x387fb1(0x506),_0x387fb1(0x479),_0x387fb1(0x415),_0x387fb1(0x11c)];for(const _0x146144 of _0x499d52){const _0x360cee=VisuMZ[_0x387fb1(0x71a)][_0x387fb1(0x74)][_0x387fb1(0x53b)][_0x146144],_0x1fdd2d=_0x387fb1(0x164)['format'](_0x146144);for(const _0x52e68b of _0x360cee){ImageManager[_0x387fb1(0x678)](_0x1fdd2d,_0x52e68b);}}},VisuMZ['CoreEngine'][_0xebc2c6(0x560)]=Scene_Boot[_0xebc2c6(0x2c3)][_0xebc2c6(0x73)],Scene_Boot[_0xebc2c6(0x2c3)][_0xebc2c6(0x73)]=function(){const _0xa528fe=_0xebc2c6;Utils[_0xa528fe(0x271)](_0xa528fe(0x51f))&&VisuMZ[_0xa528fe(0x71a)][_0xa528fe(0x74)]['QoL']['NewGameBoot']?this[_0xa528fe(0x147)]():VisuMZ['CoreEngine']['Scene_Boot_startNormalGame'][_0xa528fe(0x32f)](this);},Scene_Boot[_0xebc2c6(0x2c3)][_0xebc2c6(0x147)]=function(){const _0x2ee335=_0xebc2c6;DataManager[_0x2ee335(0x6d3)](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0xebc2c6(0x2c3)][_0xebc2c6(0x26e)]=function(){const _0x39db38=_0xebc2c6,_0x174052=$dataSystem[_0x39db38(0xfa)][_0x39db38(0x58d)],_0x76734e=$dataSystem[_0x39db38(0xfa)][_0x39db38(0x557)],_0x4116bf=VisuMZ[_0x39db38(0x71a)][_0x39db38(0x74)]['UI'][_0x39db38(0x598)];Graphics[_0x39db38(0x371)]=_0x174052-_0x4116bf*0x2,Graphics['boxHeight']=_0x76734e-_0x4116bf*0x2,this[_0x39db38(0x633)]();},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x334)]=Scene_Boot[_0xebc2c6(0x2c3)]['updateDocumentTitle'],Scene_Boot[_0xebc2c6(0x2c3)]['updateDocumentTitle']=function(){const _0x15aa22=_0xebc2c6;this[_0x15aa22(0xbf)]()?this['makeDocumentTitle']():VisuMZ[_0x15aa22(0x71a)][_0x15aa22(0x334)][_0x15aa22(0x32f)](this);},Scene_Boot[_0xebc2c6(0x2c3)]['isFullDocumentTitle']=function(){const _0x47500b=_0xebc2c6;if(Scene_Title[_0x47500b(0x3c1)]==='')return![];if(Scene_Title[_0x47500b(0x3c1)]===_0x47500b(0x4ba))return![];if(Scene_Title[_0x47500b(0x45d)]==='')return![];if(Scene_Title['version']==='0.00')return![];return!![];},Scene_Boot[_0xebc2c6(0x2c3)][_0xebc2c6(0x4af)]=function(){const _0x28e542=_0xebc2c6,_0x24aeda=$dataSystem[_0x28e542(0x35d)],_0x3293d7=Scene_Title[_0x28e542(0x3c1)]||'',_0x1a4367=Scene_Title[_0x28e542(0x45d)]||'',_0x482cce=VisuMZ[_0x28e542(0x71a)][_0x28e542(0x74)][_0x28e542(0x74b)][_0x28e542(0x49c)]['DocumentTitleFmt'],_0xb892d3=_0x482cce['format'](_0x24aeda,_0x3293d7,_0x1a4367);document[_0x28e542(0x2a9)]=_0xb892d3;},Scene_Boot[_0xebc2c6(0x2c3)][_0xebc2c6(0x633)]=function(){const _0x13d69f=_0xebc2c6;if(VisuMZ[_0x13d69f(0x71a)]['Settings']['UI'][_0x13d69f(0xf1)]){const _0x217775=Graphics[_0x13d69f(0x20a)]-Graphics[_0x13d69f(0x371)]-VisuMZ[_0x13d69f(0x71a)][_0x13d69f(0x74)]['UI'][_0x13d69f(0x598)]*0x2,_0x1b5fd8=Sprite_Button[_0x13d69f(0x2c3)][_0x13d69f(0x328)][_0x13d69f(0x32f)](this)*0x4;if(_0x217775>=_0x1b5fd8)SceneManager['setSideButtonLayout'](!![]);}},Scene_Title[_0xebc2c6(0x3c1)]=VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)][_0xebc2c6(0x74b)][_0xebc2c6(0x49c)][_0xebc2c6(0x4ba)],Scene_Title['version']=VisuMZ[_0xebc2c6(0x71a)]['Settings'][_0xebc2c6(0x74b)][_0xebc2c6(0x49c)]['Version'],Scene_Title[_0xebc2c6(0x25b)]=VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)]['TitlePicButtons'],VisuMZ[_0xebc2c6(0x71a)]['Scene_Title_drawGameTitle']=Scene_Title['prototype']['drawGameTitle'],Scene_Title[_0xebc2c6(0x2c3)][_0xebc2c6(0x7d)]=function(){const _0x548872=_0xebc2c6;VisuMZ[_0x548872(0x71a)]['Settings'][_0x548872(0x74b)][_0x548872(0x49c)][_0x548872(0x7d)][_0x548872(0x32f)](this);if(Scene_Title['subtitle']!==''&&Scene_Title[_0x548872(0x3c1)]!==_0x548872(0x4ba))this['drawGameSubtitle']();if(Scene_Title[_0x548872(0x45d)]!==''&&Scene_Title['version']!==_0x548872(0x70b))this['drawGameVersion']();},Scene_Title[_0xebc2c6(0x2c3)][_0xebc2c6(0x32c)]=function(){const _0x4b8c7f=_0xebc2c6;VisuMZ['CoreEngine']['Settings'][_0x4b8c7f(0x74b)][_0x4b8c7f(0x49c)]['drawGameSubtitle'][_0x4b8c7f(0x32f)](this);},Scene_Title[_0xebc2c6(0x2c3)][_0xebc2c6(0x338)]=function(){const _0xdba2bd=_0xebc2c6;VisuMZ[_0xdba2bd(0x71a)][_0xdba2bd(0x74)][_0xdba2bd(0x74b)][_0xdba2bd(0x49c)][_0xdba2bd(0x338)]['call'](this);},Scene_Title[_0xebc2c6(0x2c3)][_0xebc2c6(0x135)]=function(){const _0x89e636=_0xebc2c6;this[_0x89e636(0x667)]();const _0x4eb793=$dataSystem['titleCommandWindow'][_0x89e636(0x35f)],_0x59507b=this['commandWindowRect']();this[_0x89e636(0x10f)]=new Window_TitleCommand(_0x59507b),this[_0x89e636(0x10f)]['setBackgroundType'](_0x4eb793);const _0x5dc6a3=this[_0x89e636(0x6ea)]();this[_0x89e636(0x10f)][_0x89e636(0x603)](_0x5dc6a3['x'],_0x5dc6a3['y'],_0x5dc6a3[_0x89e636(0x20a)],_0x5dc6a3[_0x89e636(0x102)]),this[_0x89e636(0x1e7)](this['_commandWindow']);},Scene_Title[_0xebc2c6(0x2c3)][_0xebc2c6(0xa0)]=function(){const _0x590f23=_0xebc2c6;return this['_commandWindow']?this[_0x590f23(0x10f)][_0x590f23(0x639)]():VisuMZ[_0x590f23(0x71a)]['Settings']['TitleCommandList']['length'];},Scene_Title['prototype']['commandWindowRect']=function(){const _0x23cb63=_0xebc2c6;return VisuMZ[_0x23cb63(0x71a)][_0x23cb63(0x74)]['MenuLayout'][_0x23cb63(0x49c)][_0x23cb63(0x494)][_0x23cb63(0x32f)](this);},Scene_Title[_0xebc2c6(0x2c3)]['createTitleButtons']=function(){const _0x770bc3=_0xebc2c6;for(const _0x4d2483 of Scene_Title[_0x770bc3(0x25b)]){const _0x487cd6=new Sprite_TitlePictureButton(_0x4d2483);this['addChild'](_0x487cd6);}},VisuMZ[_0xebc2c6(0x71a)]['Scene_Map_initialize']=Scene_Map[_0xebc2c6(0x2c3)]['initialize'],Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x1dd)]=function(){const _0x2ee418=_0xebc2c6;VisuMZ['CoreEngine'][_0x2ee418(0xf7)][_0x2ee418(0x32f)](this),$gameTemp[_0x2ee418(0x428)](),this['clearOnceParallelInterpreters']();},VisuMZ['CoreEngine'][_0xebc2c6(0x3df)]=Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x604)],Scene_Map['prototype'][_0xebc2c6(0x604)]=function(){const _0x58a285=_0xebc2c6;VisuMZ[_0x58a285(0x71a)]['Scene_Map_updateMainMultiply'][_0x58a285(0x32f)](this),$gameTemp[_0x58a285(0x4a6)]&&!$gameMessage['isBusy']()&&(this[_0x58a285(0x393)](),SceneManager[_0x58a285(0x150)]());},Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x273)]=function(){const _0x390cea=_0xebc2c6;Scene_Message[_0x390cea(0x2c3)][_0x390cea(0x273)]['call'](this),!SceneManager[_0x390cea(0x6d6)](Scene_Battle)&&(this[_0x390cea(0x4be)][_0x390cea(0x3a8)](),this[_0x390cea(0x322)]['hide'](),this[_0x390cea(0x6b7)][_0x390cea(0x5e8)]=![],SceneManager[_0x390cea(0x470)]()),$gameScreen[_0x390cea(0x119)](),this[_0x390cea(0x2a3)]();},VisuMZ['CoreEngine'][_0xebc2c6(0x6dd)]=Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x178)],Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x178)]=function(){const _0x2afbdc=_0xebc2c6;VisuMZ[_0x2afbdc(0x71a)][_0x2afbdc(0x6dd)][_0x2afbdc(0x32f)](this),SceneManager[_0x2afbdc(0x733)]()&&this['moveMenuButtonSideButtonLayout']();},Scene_Map['prototype'][_0xebc2c6(0x453)]=function(){const _0x46491d=_0xebc2c6;this[_0x46491d(0x3e0)]['x']=Graphics[_0x46491d(0x371)]+0x4;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x1ba)]=Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x122)],Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x122)]=function(){const _0x30667f=_0xebc2c6;VisuMZ[_0x30667f(0x71a)][_0x30667f(0x1ba)][_0x30667f(0x32f)](this),this['updateDashToggle']();},Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x620)]=function(){const _0x315d0c=_0xebc2c6;Input[_0x315d0c(0x1d3)](_0x315d0c(0x601))&&(ConfigManager[_0x315d0c(0x4dd)]=!ConfigManager[_0x315d0c(0x4dd)],ConfigManager[_0x315d0c(0x53c)]());},VisuMZ['CoreEngine'][_0xebc2c6(0xab)]=Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x393)],Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x393)]=function(){const _0x4f1a98=_0xebc2c6;VisuMZ[_0x4f1a98(0x71a)][_0x4f1a98(0xab)][_0x4f1a98(0x32f)](this),this[_0x4f1a98(0x525)]();},Scene_Map['prototype'][_0xebc2c6(0x2a3)]=function(){const _0x465688=_0xebc2c6;this[_0x465688(0x445)]=[];},Scene_Map['prototype'][_0xebc2c6(0x525)]=function(){const _0x5652b0=_0xebc2c6;if(!this['_onceParallelInterpreters'])return;for(const _0x432072 of this[_0x5652b0(0x445)]){_0x432072&&_0x432072[_0x5652b0(0x3a8)]();}},Scene_Map[_0xebc2c6(0x2c3)]['playOnceParallelInterpreter']=function(_0x34c2d9){const _0x5af598=$dataCommonEvents[_0x34c2d9];if(!_0x5af598)return;const _0x13d28d=new Game_OnceParallelInterpreter();this['addOnceParallelInterpreter'](_0x13d28d),_0x13d28d['setCommonEvent'](_0x34c2d9);},Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x24d)]=function(_0x38a7ce){const _0x33b605=_0xebc2c6;this[_0x33b605(0x445)]=this[_0x33b605(0x445)]||[],this['_onceParallelInterpreters'][_0x33b605(0x710)](_0x38a7ce);},Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x346)]=function(_0x391cc6){const _0x39bd47=_0xebc2c6;this[_0x39bd47(0x445)]=this[_0x39bd47(0x445)]||[],this[_0x39bd47(0x445)][_0x39bd47(0x218)](_0x391cc6);};function Game_OnceParallelInterpreter(){const _0x5b32=_0xebc2c6;this[_0x5b32(0x1dd)](...arguments);}Game_OnceParallelInterpreter['prototype']=Object[_0xebc2c6(0x549)](Game_Interpreter['prototype']),Game_OnceParallelInterpreter[_0xebc2c6(0x2c3)][_0xebc2c6(0x680)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0xebc2c6(0x2c3)][_0xebc2c6(0x231)]=function(_0x3dc8d1){const _0x38c064=_0xebc2c6,_0x2acff8=$dataCommonEvents[_0x3dc8d1];_0x2acff8?this['setup'](_0x2acff8[_0x38c064(0x1cb)],0x0):this[_0x38c064(0x273)]();},Game_OnceParallelInterpreter['prototype'][_0xebc2c6(0x273)]=function(){const _0x37c88a=_0xebc2c6;if(!SceneManager[_0x37c88a(0x70d)]())return;SceneManager[_0x37c88a(0x4e5)]['removeOnceParallelInterpreter'](this),Game_Interpreter[_0x37c88a(0x2c3)][_0x37c88a(0x273)][_0x37c88a(0x32f)](this);},VisuMZ[_0xebc2c6(0x71a)]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase['prototype'][_0xebc2c6(0x6bb)],Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x6bb)]=function(){const _0x33ada7=_0xebc2c6;let _0x2cc94f=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x2cc94f=this[_0x33ada7(0x40c)]():_0x2cc94f=VisuMZ[_0x33ada7(0x71a)]['Scene_MenuBase_helpAreaTop'][_0x33ada7(0x32f)](this),this[_0x33ada7(0x9e)]()&&this[_0x33ada7(0x176)]()===_0x33ada7(0x565)&&(_0x2cc94f+=Window_ButtonAssist[_0x33ada7(0x2c3)][_0x33ada7(0x468)]()),_0x2cc94f;},Scene_MenuBase['prototype'][_0xebc2c6(0x40c)]=function(){const _0xd0a3b3=_0xebc2c6;return this[_0xd0a3b3(0x5f4)]()?this[_0xd0a3b3(0x671)]():0x0;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x5cc)]=Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x62c)],Scene_MenuBase[_0xebc2c6(0x2c3)]['mainAreaTop']=function(){const _0x811e43=_0xebc2c6;return SceneManager[_0x811e43(0x171)]()?this[_0x811e43(0x360)]():VisuMZ[_0x811e43(0x71a)][_0x811e43(0x5cc)][_0x811e43(0x32f)](this);},Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x360)]=function(){const _0x14fbef=_0xebc2c6;return!this[_0x14fbef(0x5f4)]()?this[_0x14fbef(0x558)]():0x0;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x34b)]=Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x3dc)],Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x3dc)]=function(){const _0x28ea41=_0xebc2c6;let _0x50cbff=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x50cbff=this[_0x28ea41(0x4fc)]():_0x50cbff=VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaHeight'][_0x28ea41(0x32f)](this),this[_0x28ea41(0x9e)]()&&this['getButtonAssistLocation']()!=='button'&&(_0x50cbff-=Window_ButtonAssist['prototype'][_0x28ea41(0x468)]()),_0x50cbff;},Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x4fc)]=function(){const _0x589826=_0xebc2c6;return Graphics[_0x589826(0x247)]-this[_0x589826(0x6a4)]();},VisuMZ[_0xebc2c6(0x71a)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x46e)],Scene_MenuBase['prototype'][_0xebc2c6(0x46e)]=function(){const _0x8f0db4=_0xebc2c6;this[_0x8f0db4(0x41b)]=new PIXI[(_0x8f0db4(0x4b1))][(_0x8f0db4(0x33a))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0x8f0db4(0x309)][_0x8f0db4(0x2d3)]=SceneManager[_0x8f0db4(0x159)](),this[_0x8f0db4(0x309)][_0x8f0db4(0x4b1)]=[this['_backgroundFilter']],this['addChild'](this[_0x8f0db4(0x309)]),this['setBackgroundOpacity'](0xc0),this['setBackgroundOpacity'](this[_0x8f0db4(0x10a)]()),this[_0x8f0db4(0x47f)]();},Scene_MenuBase['prototype'][_0xebc2c6(0x10a)]=function(){const _0x2082c0=_0xebc2c6,_0x14ffb6=String(this[_0x2082c0(0x680)][_0x2082c0(0x4d0)]),_0x34b37f=this[_0x2082c0(0x129)](_0x14ffb6);return _0x34b37f?_0x34b37f[_0x2082c0(0x5bc)]:0xc0;},Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x47f)]=function(){const _0x508c36=_0xebc2c6,_0x566fc5=String(this[_0x508c36(0x680)]['name']),_0x1bdb04=this[_0x508c36(0x129)](_0x566fc5);_0x1bdb04&&(_0x1bdb04[_0x508c36(0x3b4)]!==''||_0x1bdb04[_0x508c36(0x154)]!=='')&&(this[_0x508c36(0x2bf)]=new Sprite(ImageManager['loadTitle1'](_0x1bdb04['BgFilename1'])),this['_backSprite2']=new Sprite(ImageManager[_0x508c36(0x15b)](_0x1bdb04['BgFilename2'])),this[_0x508c36(0x148)](this[_0x508c36(0x2bf)]),this[_0x508c36(0x148)](this[_0x508c36(0x5e4)]),this[_0x508c36(0x2bf)][_0x508c36(0x2d3)][_0x508c36(0x5fe)](this[_0x508c36(0x31d)][_0x508c36(0x563)](this,this[_0x508c36(0x2bf)])),this['_backSprite2'][_0x508c36(0x2d3)][_0x508c36(0x5fe)](this[_0x508c36(0x31d)][_0x508c36(0x563)](this,this[_0x508c36(0x5e4)])));},Scene_MenuBase[_0xebc2c6(0x2c3)]['getCustomBackgroundSettings']=function(_0x1b6ea9){const _0xe72550=_0xebc2c6;return VisuMZ[_0xe72550(0x71a)][_0xe72550(0x74)][_0xe72550(0x1e4)][_0x1b6ea9]||VisuMZ['CoreEngine'][_0xe72550(0x74)][_0xe72550(0x1e4)][_0xe72550(0x6b2)];},Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x31d)]=function(_0x55e4d7){const _0x38e13e=_0xebc2c6;this['scaleSprite'](_0x55e4d7),this[_0x38e13e(0xb5)](_0x55e4d7);},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x4e9)]=Scene_MenuBase['prototype'][_0xebc2c6(0x55b)],Scene_MenuBase['prototype']['createCancelButton']=function(){const _0x39c1f7=_0xebc2c6;VisuMZ[_0x39c1f7(0x71a)][_0x39c1f7(0x4e9)][_0x39c1f7(0x32f)](this),SceneManager[_0x39c1f7(0x733)]()&&this[_0x39c1f7(0x6d1)]();},Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x6d1)]=function(){const _0x57789a=_0xebc2c6;this['_cancelButton']['x']=Graphics[_0x57789a(0x371)]+0x4;},VisuMZ['CoreEngine'][_0xebc2c6(0x1da)]=Scene_MenuBase[_0xebc2c6(0x2c3)]['createPageButtons'],Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x6d9)]=function(){const _0x519eea=_0xebc2c6;VisuMZ[_0x519eea(0x71a)][_0x519eea(0x1da)][_0x519eea(0x32f)](this),SceneManager[_0x519eea(0x733)]()&&this[_0x519eea(0x386)]();},Scene_MenuBase['prototype'][_0xebc2c6(0x386)]=function(){const _0xa47e40=_0xebc2c6;this[_0xa47e40(0x517)]['x']=-0x1*(this['_pageupButton']['width']+this[_0xa47e40(0x484)][_0xa47e40(0x20a)]+0x8),this[_0xa47e40(0x484)]['x']=-0x1*(this[_0xa47e40(0x484)][_0xa47e40(0x20a)]+0x4);},Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x9e)]=function(){const _0x2cf6b5=_0xebc2c6;return VisuMZ[_0x2cf6b5(0x71a)][_0x2cf6b5(0x74)][_0x2cf6b5(0x642)][_0x2cf6b5(0xfd)];},Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x176)]=function(){const _0x37fca8=_0xebc2c6;return SceneManager[_0x37fca8(0x733)]()||SceneManager[_0x37fca8(0x447)]()?VisuMZ[_0x37fca8(0x71a)][_0x37fca8(0x74)]['ButtonAssist'][_0x37fca8(0x196)]:_0x37fca8(0x26c);},Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x717)]=function(){const _0x405605=_0xebc2c6;if(!this['isMenuButtonAssistEnabled']())return;const _0x37712a=this['buttonAssistWindowRect']();this[_0x405605(0x742)]=new Window_ButtonAssist(_0x37712a),this[_0x405605(0x1e7)](this[_0x405605(0x742)]);},Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x4e2)]=function(){const _0x3aa4a6=_0xebc2c6;return this['getButtonAssistLocation']()===_0x3aa4a6(0x26c)?this['buttonAssistWindowButtonRect']():this[_0x3aa4a6(0x40a)]();},Scene_MenuBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x626)]=function(){const _0x15cb61=_0xebc2c6,_0x3a3aa7=ConfigManager['touchUI']?(Sprite_Button[_0x15cb61(0x2c3)][_0x15cb61(0x328)]()+0x6)*0x2:0x0,_0x71f954=this[_0x15cb61(0x80)](),_0x4c7501=Graphics[_0x15cb61(0x371)]-_0x3a3aa7*0x2,_0x5c9881=this['buttonAreaHeight']();return new Rectangle(_0x3a3aa7,_0x71f954,_0x4c7501,_0x5c9881);},Scene_MenuBase['prototype'][_0xebc2c6(0x40a)]=function(){const _0x924d14=_0xebc2c6,_0x20a998=Graphics[_0x924d14(0x371)],_0x38cc5b=Window_ButtonAssist[_0x924d14(0x2c3)][_0x924d14(0x468)](),_0x13d4c9=0x0;let _0x473863=0x0;return this[_0x924d14(0x176)]()===_0x924d14(0x565)?_0x473863=0x0:_0x473863=Graphics[_0x924d14(0x247)]-_0x38cc5b,new Rectangle(_0x13d4c9,_0x473863,_0x20a998,_0x38cc5b);},Scene_Menu[_0xebc2c6(0x5fc)]=VisuMZ['CoreEngine'][_0xebc2c6(0x74)][_0xebc2c6(0x74b)][_0xebc2c6(0x64f)],VisuMZ['CoreEngine']['Scene_Menu_create']=Scene_Menu[_0xebc2c6(0x2c3)][_0xebc2c6(0x549)],Scene_Menu['prototype'][_0xebc2c6(0x549)]=function(){const _0x1d8c76=_0xebc2c6;VisuMZ[_0x1d8c76(0x71a)][_0x1d8c76(0x354)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Menu[_0xebc2c6(0x2c3)]['setCoreEngineUpdateWindowBg']=function(){const _0x3434e3=_0xebc2c6;this['_commandWindow']&&this[_0x3434e3(0x10f)][_0x3434e3(0x49a)](Scene_Menu['layoutSettings'][_0x3434e3(0x202)]),this[_0x3434e3(0x449)]&&this[_0x3434e3(0x449)][_0x3434e3(0x49a)](Scene_Menu[_0x3434e3(0x5fc)][_0x3434e3(0x288)]),this['_statusWindow']&&this[_0x3434e3(0x1e1)][_0x3434e3(0x49a)](Scene_Menu[_0x3434e3(0x5fc)][_0x3434e3(0x47a)]);},Scene_Menu[_0xebc2c6(0x2c3)][_0xebc2c6(0x6ea)]=function(){const _0x560345=_0xebc2c6;return Scene_Menu[_0x560345(0x5fc)]['CommandRect'][_0x560345(0x32f)](this);},Scene_Menu[_0xebc2c6(0x2c3)][_0xebc2c6(0x2a2)]=function(){const _0x36f67b=_0xebc2c6;return Scene_Menu[_0x36f67b(0x5fc)][_0x36f67b(0x118)][_0x36f67b(0x32f)](this);},Scene_Menu[_0xebc2c6(0x2c3)]['statusWindowRect']=function(){const _0x4e7d65=_0xebc2c6;return Scene_Menu['layoutSettings'][_0x4e7d65(0x5b5)][_0x4e7d65(0x32f)](this);},Scene_Item[_0xebc2c6(0x5fc)]=VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)]['MenuLayout'][_0xebc2c6(0x685)],VisuMZ['CoreEngine'][_0xebc2c6(0x6d5)]=Scene_Item[_0xebc2c6(0x2c3)][_0xebc2c6(0x549)],Scene_Item['prototype']['create']=function(){const _0x141ec0=_0xebc2c6;VisuMZ[_0x141ec0(0x71a)]['Scene_Item_create'][_0x141ec0(0x32f)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item[_0xebc2c6(0x2c3)]['setCoreEngineUpdateWindowBg']=function(){const _0x513413=_0xebc2c6;this[_0x513413(0x566)]&&this['_helpWindow'][_0x513413(0x49a)](Scene_Item[_0x513413(0x5fc)]['HelpBgType']),this['_categoryWindow']&&this['_categoryWindow'][_0x513413(0x49a)](Scene_Item[_0x513413(0x5fc)]['CategoryBgType']),this[_0x513413(0x50b)]&&this[_0x513413(0x50b)][_0x513413(0x49a)](Scene_Item[_0x513413(0x5fc)][_0x513413(0x730)]),this[_0x513413(0xf4)]&&this[_0x513413(0xf4)]['setBackgroundType'](Scene_Item[_0x513413(0x5fc)][_0x513413(0x664)]);},Scene_Item[_0xebc2c6(0x2c3)][_0xebc2c6(0x1f4)]=function(){const _0x1bcd60=_0xebc2c6;return Scene_Item['layoutSettings'][_0x1bcd60(0x431)]['call'](this);},Scene_Item[_0xebc2c6(0x2c3)][_0xebc2c6(0x12a)]=function(){const _0x5784c4=_0xebc2c6;return Scene_Item[_0x5784c4(0x5fc)][_0x5784c4(0x4ae)][_0x5784c4(0x32f)](this);},Scene_Item[_0xebc2c6(0x2c3)][_0xebc2c6(0x6be)]=function(){const _0x3d11d3=_0xebc2c6;return Scene_Item['layoutSettings'][_0x3d11d3(0x4d4)][_0x3d11d3(0x32f)](this);},Scene_Item[_0xebc2c6(0x2c3)]['actorWindowRect']=function(){const _0x24dcc5=_0xebc2c6;return Scene_Item[_0x24dcc5(0x5fc)]['ActorRect'][_0x24dcc5(0x32f)](this);},Scene_Skill[_0xebc2c6(0x5fc)]=VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)][_0xebc2c6(0x74b)][_0xebc2c6(0xc7)],VisuMZ[_0xebc2c6(0x71a)]['Scene_Skill_create']=Scene_Skill[_0xebc2c6(0x2c3)][_0xebc2c6(0x549)],Scene_Skill['prototype'][_0xebc2c6(0x549)]=function(){const _0x438496=_0xebc2c6;VisuMZ[_0x438496(0x71a)][_0x438496(0x90)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0xebc2c6(0x2c3)][_0xebc2c6(0x451)]=function(){const _0x31293e=_0xebc2c6;this[_0x31293e(0x566)]&&this[_0x31293e(0x566)]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x31293e(0x85)]),this[_0x31293e(0x6bf)]&&this[_0x31293e(0x6bf)][_0x31293e(0x49a)](Scene_Skill[_0x31293e(0x5fc)][_0x31293e(0x210)]),this[_0x31293e(0x1e1)]&&this['_statusWindow'][_0x31293e(0x49a)](Scene_Skill['layoutSettings'][_0x31293e(0x47a)]),this['_itemWindow']&&this[_0x31293e(0x50b)][_0x31293e(0x49a)](Scene_Skill[_0x31293e(0x5fc)][_0x31293e(0x730)]),this[_0x31293e(0xf4)]&&this[_0x31293e(0xf4)][_0x31293e(0x49a)](Scene_Skill[_0x31293e(0x5fc)][_0x31293e(0x664)]);},Scene_Skill['prototype']['helpWindowRect']=function(){const _0x5df0af=_0xebc2c6;return Scene_Skill[_0x5df0af(0x5fc)][_0x5df0af(0x431)][_0x5df0af(0x32f)](this);},Scene_Skill[_0xebc2c6(0x2c3)][_0xebc2c6(0x5be)]=function(){const _0x4e1f22=_0xebc2c6;return Scene_Skill['layoutSettings'][_0x4e1f22(0x267)][_0x4e1f22(0x32f)](this);},Scene_Skill[_0xebc2c6(0x2c3)][_0xebc2c6(0x66c)]=function(){const _0x1936ba=_0xebc2c6;return Scene_Skill['layoutSettings']['StatusRect'][_0x1936ba(0x32f)](this);},Scene_Skill[_0xebc2c6(0x2c3)][_0xebc2c6(0x6be)]=function(){const _0x4e7e0f=_0xebc2c6;return Scene_Skill[_0x4e7e0f(0x5fc)][_0x4e7e0f(0x4d4)]['call'](this);},Scene_Skill[_0xebc2c6(0x2c3)][_0xebc2c6(0x709)]=function(){const _0x9f5370=_0xebc2c6;return Scene_Skill[_0x9f5370(0x5fc)][_0x9f5370(0x66b)][_0x9f5370(0x32f)](this);},Scene_Equip['layoutSettings']=VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)][_0xebc2c6(0x74b)]['EquipMenu'],VisuMZ['CoreEngine'][_0xebc2c6(0x2ef)]=Scene_Equip[_0xebc2c6(0x2c3)][_0xebc2c6(0x549)],Scene_Equip[_0xebc2c6(0x2c3)][_0xebc2c6(0x549)]=function(){const _0x50c5be=_0xebc2c6;VisuMZ[_0x50c5be(0x71a)][_0x50c5be(0x2ef)][_0x50c5be(0x32f)](this),this[_0x50c5be(0x451)]();},Scene_Equip[_0xebc2c6(0x2c3)][_0xebc2c6(0x451)]=function(){const _0x896e92=_0xebc2c6;this['_helpWindow']&&this[_0x896e92(0x566)][_0x896e92(0x49a)](Scene_Equip[_0x896e92(0x5fc)]['HelpBgType']),this['_statusWindow']&&this[_0x896e92(0x1e1)]['setBackgroundType'](Scene_Equip[_0x896e92(0x5fc)][_0x896e92(0x47a)]),this['_commandWindow']&&this[_0x896e92(0x10f)][_0x896e92(0x49a)](Scene_Equip[_0x896e92(0x5fc)][_0x896e92(0x202)]),this[_0x896e92(0x89)]&&this[_0x896e92(0x89)][_0x896e92(0x49a)](Scene_Equip[_0x896e92(0x5fc)][_0x896e92(0x72f)]),this[_0x896e92(0x50b)]&&this['_itemWindow'][_0x896e92(0x49a)](Scene_Equip[_0x896e92(0x5fc)][_0x896e92(0x730)]);},Scene_Equip[_0xebc2c6(0x2c3)][_0xebc2c6(0x1f4)]=function(){const _0x409e43=_0xebc2c6;return Scene_Equip[_0x409e43(0x5fc)][_0x409e43(0x431)][_0x409e43(0x32f)](this);},Scene_Equip[_0xebc2c6(0x2c3)][_0xebc2c6(0x66c)]=function(){const _0x5b737e=_0xebc2c6;return Scene_Equip[_0x5b737e(0x5fc)][_0x5b737e(0x5b5)][_0x5b737e(0x32f)](this);},Scene_Equip[_0xebc2c6(0x2c3)][_0xebc2c6(0x6ea)]=function(){const _0xe43953=_0xebc2c6;return Scene_Equip[_0xe43953(0x5fc)]['CommandRect'][_0xe43953(0x32f)](this);},Scene_Equip['prototype'][_0xebc2c6(0x608)]=function(){const _0x30c522=_0xebc2c6;return Scene_Equip[_0x30c522(0x5fc)][_0x30c522(0x286)][_0x30c522(0x32f)](this);},Scene_Equip['prototype']['itemWindowRect']=function(){const _0x519654=_0xebc2c6;return Scene_Equip[_0x519654(0x5fc)][_0x519654(0x4d4)]['call'](this);},Scene_Status[_0xebc2c6(0x5fc)]=VisuMZ['CoreEngine'][_0xebc2c6(0x74)][_0xebc2c6(0x74b)][_0xebc2c6(0x297)],VisuMZ[_0xebc2c6(0x71a)]['Scene_Status_create']=Scene_Status['prototype']['create'],Scene_Status[_0xebc2c6(0x2c3)]['create']=function(){const _0x4cfb40=_0xebc2c6;VisuMZ[_0x4cfb40(0x71a)][_0x4cfb40(0x6ce)][_0x4cfb40(0x32f)](this),this[_0x4cfb40(0x451)]();},Scene_Status[_0xebc2c6(0x2c3)]['setCoreEngineUpdateWindowBg']=function(){const _0x52467f=_0xebc2c6;this[_0x52467f(0x11d)]&&this[_0x52467f(0x11d)]['setBackgroundType'](Scene_Status[_0x52467f(0x5fc)][_0x52467f(0x140)]),this['_statusWindow']&&this[_0x52467f(0x1e1)][_0x52467f(0x49a)](Scene_Status[_0x52467f(0x5fc)]['StatusBgType']),this['_statusParamsWindow']&&this[_0x52467f(0x510)]['setBackgroundType'](Scene_Status[_0x52467f(0x5fc)][_0x52467f(0x194)]),this[_0x52467f(0x436)]&&this[_0x52467f(0x436)][_0x52467f(0x49a)](Scene_Status[_0x52467f(0x5fc)]['StatusEquipBgType']);},Scene_Status['prototype'][_0xebc2c6(0x141)]=function(){const _0x6d05ef=_0xebc2c6;return Scene_Status[_0x6d05ef(0x5fc)]['ProfileRect'][_0x6d05ef(0x32f)](this);},Scene_Status[_0xebc2c6(0x2c3)]['statusWindowRect']=function(){const _0x4beaae=_0xebc2c6;return Scene_Status[_0x4beaae(0x5fc)][_0x4beaae(0x5b5)][_0x4beaae(0x32f)](this);},Scene_Status[_0xebc2c6(0x2c3)]['statusParamsWindowRect']=function(){const _0x50337e=_0xebc2c6;return Scene_Status[_0x50337e(0x5fc)][_0x50337e(0x650)]['call'](this);},Scene_Status['prototype'][_0xebc2c6(0x3aa)]=function(){const _0x14c31a=_0xebc2c6;return Scene_Status[_0x14c31a(0x5fc)][_0x14c31a(0x16f)][_0x14c31a(0x32f)](this);},Scene_Options['layoutSettings']=VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)][_0xebc2c6(0x74b)][_0xebc2c6(0x2aa)],VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x127)]=Scene_Options['prototype']['create'],Scene_Options[_0xebc2c6(0x2c3)][_0xebc2c6(0x549)]=function(){const _0xe1ae56=_0xebc2c6;VisuMZ[_0xe1ae56(0x71a)][_0xe1ae56(0x127)][_0xe1ae56(0x32f)](this),this[_0xe1ae56(0x451)]();},Scene_Options['prototype'][_0xebc2c6(0x451)]=function(){const _0x318722=_0xebc2c6;this[_0x318722(0x4f5)]&&this[_0x318722(0x4f5)][_0x318722(0x49a)](Scene_Options['layoutSettings'][_0x318722(0x2d1)]);},Scene_Options[_0xebc2c6(0x2c3)][_0xebc2c6(0x110)]=function(){const _0x5e8cd9=_0xebc2c6;return Scene_Options[_0x5e8cd9(0x5fc)][_0x5e8cd9(0x5e2)]['call'](this);},Scene_Save['layoutSettings']=VisuMZ['CoreEngine']['Settings'][_0xebc2c6(0x74b)]['SaveMenu'],Scene_Save['prototype'][_0xebc2c6(0x549)]=function(){const _0x497f3a=_0xebc2c6;Scene_File[_0x497f3a(0x2c3)][_0x497f3a(0x549)][_0x497f3a(0x32f)](this),this[_0x497f3a(0x451)]();},Scene_Save[_0xebc2c6(0x2c3)]['setCoreEngineUpdateWindowBg']=function(){const _0x3d381d=_0xebc2c6;this['_helpWindow']&&this[_0x3d381d(0x566)][_0x3d381d(0x49a)](Scene_Save[_0x3d381d(0x5fc)][_0x3d381d(0x85)]),this['_listWindow']&&this[_0x3d381d(0x4f4)][_0x3d381d(0x49a)](Scene_Save[_0x3d381d(0x5fc)][_0x3d381d(0x564)]);},Scene_Save[_0xebc2c6(0x2c3)][_0xebc2c6(0x1f4)]=function(){const _0x8287af=_0xebc2c6;return Scene_Save['layoutSettings'][_0x8287af(0x431)][_0x8287af(0x32f)](this);},Scene_Save['prototype'][_0xebc2c6(0x2f4)]=function(){const _0x1d79ab=_0xebc2c6;return Scene_Save['layoutSettings'][_0x1d79ab(0x15e)]['call'](this);},Scene_Load['layoutSettings']=VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)][_0xebc2c6(0x74b)]['LoadMenu'],Scene_Load['prototype'][_0xebc2c6(0x549)]=function(){const _0x555ad3=_0xebc2c6;Scene_File[_0x555ad3(0x2c3)][_0x555ad3(0x549)][_0x555ad3(0x32f)](this),this[_0x555ad3(0x451)]();},Scene_Load[_0xebc2c6(0x2c3)][_0xebc2c6(0x451)]=function(){const _0x2bf3db=_0xebc2c6;this[_0x2bf3db(0x566)]&&this[_0x2bf3db(0x566)]['setBackgroundType'](Scene_Load[_0x2bf3db(0x5fc)][_0x2bf3db(0x85)]),this[_0x2bf3db(0x4f4)]&&this[_0x2bf3db(0x4f4)]['setBackgroundType'](Scene_Load[_0x2bf3db(0x5fc)]['ListBgType']);},Scene_Load[_0xebc2c6(0x2c3)]['helpWindowRect']=function(){const _0x121ca5=_0xebc2c6;return Scene_Load[_0x121ca5(0x5fc)][_0x121ca5(0x431)][_0x121ca5(0x32f)](this);},Scene_Load[_0xebc2c6(0x2c3)]['listWindowRect']=function(){const _0x4c2a42=_0xebc2c6;return Scene_Load['layoutSettings'][_0x4c2a42(0x15e)][_0x4c2a42(0x32f)](this);},Scene_GameEnd[_0xebc2c6(0x5fc)]=VisuMZ['CoreEngine'][_0xebc2c6(0x74)][_0xebc2c6(0x74b)][_0xebc2c6(0x60e)],VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x704)]=Scene_GameEnd['prototype']['createBackground'],Scene_GameEnd[_0xebc2c6(0x2c3)][_0xebc2c6(0x46e)]=function(){const _0x49ddf9=_0xebc2c6;Scene_MenuBase['prototype'][_0x49ddf9(0x46e)][_0x49ddf9(0x32f)](this);},Scene_GameEnd[_0xebc2c6(0x2c3)][_0xebc2c6(0x135)]=function(){const _0x2a5d75=_0xebc2c6,_0x40cef3=this[_0x2a5d75(0x6ea)]();this[_0x2a5d75(0x10f)]=new Window_GameEnd(_0x40cef3),this['_commandWindow'][_0x2a5d75(0x42f)](_0x2a5d75(0x52b),this[_0x2a5d75(0x2c2)][_0x2a5d75(0x563)](this)),this['addWindow'](this['_commandWindow']),this[_0x2a5d75(0x10f)][_0x2a5d75(0x49a)](Scene_GameEnd['layoutSettings'][_0x2a5d75(0x202)]);},Scene_GameEnd[_0xebc2c6(0x2c3)][_0xebc2c6(0x6ea)]=function(){const _0xf4f17=_0xebc2c6;return Scene_GameEnd[_0xf4f17(0x5fc)][_0xf4f17(0x494)]['call'](this);},Scene_Shop[_0xebc2c6(0x5fc)]=VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)][_0xebc2c6(0x74b)][_0xebc2c6(0x745)],VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x2b2)]=Scene_Shop[_0xebc2c6(0x2c3)][_0xebc2c6(0x549)],Scene_Shop[_0xebc2c6(0x2c3)][_0xebc2c6(0x549)]=function(){const _0x3c2e99=_0xebc2c6;VisuMZ[_0x3c2e99(0x71a)][_0x3c2e99(0x2b2)]['call'](this),this[_0x3c2e99(0x451)]();},Scene_Shop[_0xebc2c6(0x2c3)]['setCoreEngineUpdateWindowBg']=function(){const _0x179a07=_0xebc2c6;this['_helpWindow']&&this[_0x179a07(0x566)][_0x179a07(0x49a)](Scene_Shop['layoutSettings'][_0x179a07(0x85)]),this['_goldWindow']&&this[_0x179a07(0x449)]['setBackgroundType'](Scene_Shop[_0x179a07(0x5fc)]['GoldBgType']),this['_commandWindow']&&this[_0x179a07(0x10f)]['setBackgroundType'](Scene_Shop[_0x179a07(0x5fc)]['CommandBgType']),this[_0x179a07(0x6f1)]&&this[_0x179a07(0x6f1)][_0x179a07(0x49a)](Scene_Shop[_0x179a07(0x5fc)][_0x179a07(0x2ed)]),this[_0x179a07(0x26a)]&&this[_0x179a07(0x26a)]['setBackgroundType'](Scene_Shop[_0x179a07(0x5fc)][_0x179a07(0x443)]),this['_statusWindow']&&this[_0x179a07(0x1e1)]['setBackgroundType'](Scene_Shop[_0x179a07(0x5fc)]['StatusBgType']),this['_buyWindow']&&this[_0x179a07(0x1f8)][_0x179a07(0x49a)](Scene_Shop[_0x179a07(0x5fc)][_0x179a07(0x15c)]),this['_categoryWindow']&&this[_0x179a07(0x3ca)]['setBackgroundType'](Scene_Shop[_0x179a07(0x5fc)][_0x179a07(0x703)]),this[_0x179a07(0x1ce)]&&this[_0x179a07(0x1ce)][_0x179a07(0x49a)](Scene_Shop[_0x179a07(0x5fc)]['SellBgType']);},Scene_Shop['prototype'][_0xebc2c6(0x1f4)]=function(){const _0x1ef6a0=_0xebc2c6;return Scene_Shop[_0x1ef6a0(0x5fc)]['HelpRect'][_0x1ef6a0(0x32f)](this);},Scene_Shop['prototype'][_0xebc2c6(0x2a2)]=function(){const _0x2dd3b2=_0xebc2c6;return Scene_Shop[_0x2dd3b2(0x5fc)][_0x2dd3b2(0x118)]['call'](this);},Scene_Shop[_0xebc2c6(0x2c3)][_0xebc2c6(0x6ea)]=function(){const _0xa5a390=_0xebc2c6;return Scene_Shop[_0xa5a390(0x5fc)][_0xa5a390(0x494)][_0xa5a390(0x32f)](this);},Scene_Shop[_0xebc2c6(0x2c3)][_0xebc2c6(0x3c8)]=function(){const _0x454fed=_0xebc2c6;return Scene_Shop[_0x454fed(0x5fc)][_0x454fed(0x144)][_0x454fed(0x32f)](this);},Scene_Shop['prototype'][_0xebc2c6(0x492)]=function(){const _0x49fea4=_0xebc2c6;return Scene_Shop['layoutSettings'][_0x49fea4(0x69f)][_0x49fea4(0x32f)](this);},Scene_Shop['prototype']['statusWindowRect']=function(){const _0x1c2476=_0xebc2c6;return Scene_Shop[_0x1c2476(0x5fc)][_0x1c2476(0x5b5)][_0x1c2476(0x32f)](this);},Scene_Shop[_0xebc2c6(0x2c3)]['buyWindowRect']=function(){const _0x4267bf=_0xebc2c6;return Scene_Shop[_0x4267bf(0x5fc)]['BuyRect'][_0x4267bf(0x32f)](this);},Scene_Shop[_0xebc2c6(0x2c3)][_0xebc2c6(0x12a)]=function(){const _0x454221=_0xebc2c6;return Scene_Shop['layoutSettings'][_0x454221(0x4ae)][_0x454221(0x32f)](this);},Scene_Shop['prototype'][_0xebc2c6(0x634)]=function(){const _0x557485=_0xebc2c6;return Scene_Shop['layoutSettings'][_0x557485(0x48d)][_0x557485(0x32f)](this);},Scene_Name[_0xebc2c6(0x5fc)]=VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)][_0xebc2c6(0x74b)]['NameMenu'],VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x11b)]=Scene_Name['prototype']['create'],Scene_Name[_0xebc2c6(0x2c3)][_0xebc2c6(0x549)]=function(){const _0x23ea01=_0xebc2c6;VisuMZ[_0x23ea01(0x71a)][_0x23ea01(0x11b)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name[_0xebc2c6(0x2c3)][_0xebc2c6(0x451)]=function(){const _0xb58008=_0xebc2c6;this[_0xb58008(0x1b5)]&&this[_0xb58008(0x1b5)][_0xb58008(0x49a)](Scene_Name[_0xb58008(0x5fc)][_0xb58008(0x27f)]),this[_0xb58008(0x5b2)]&&this[_0xb58008(0x5b2)]['setBackgroundType'](Scene_Name[_0xb58008(0x5fc)]['InputBgType']);},Scene_Name[_0xebc2c6(0x2c3)][_0xebc2c6(0x6a4)]=function(){return 0x0;},Scene_Name[_0xebc2c6(0x2c3)][_0xebc2c6(0x199)]=function(){const _0x353791=_0xebc2c6;return Scene_Name[_0x353791(0x5fc)]['EditRect'][_0x353791(0x32f)](this);},Scene_Name[_0xebc2c6(0x2c3)][_0xebc2c6(0x2c9)]=function(){const _0x2dcfc1=_0xebc2c6;return Scene_Name[_0x2dcfc1(0x5fc)][_0x2dcfc1(0x58c)][_0x2dcfc1(0x32f)](this);},Scene_Name['prototype'][_0xebc2c6(0x68c)]=function(){const _0xb0877e=_0xebc2c6;if(!this[_0xb0877e(0x5b2)])return![];return VisuMZ[_0xb0877e(0x71a)][_0xb0877e(0x74)]['KeyboardInput']['EnableNameInput'];},Scene_Name[_0xebc2c6(0x2c3)][_0xebc2c6(0x3da)]=function(){const _0x5a3421=_0xebc2c6;return this[_0x5a3421(0x68c)]()?TextManager['getInputButtonString'](_0x5a3421(0x5b7)):Scene_MenuBase['prototype'][_0x5a3421(0x3da)][_0x5a3421(0x32f)](this);},Scene_Name['prototype'][_0xebc2c6(0x2c5)]=function(){const _0x5ce9e7=_0xebc2c6;if(this[_0x5ce9e7(0x68c)]()){const _0x324c8c=VisuMZ[_0x5ce9e7(0x71a)][_0x5ce9e7(0x74)]['KeyboardInput'];return this[_0x5ce9e7(0x5b2)][_0x5ce9e7(0x65d)]===_0x5ce9e7(0x315)?_0x324c8c[_0x5ce9e7(0x105)]||'Keyboard':_0x324c8c[_0x5ce9e7(0x29c)]||_0x5ce9e7(0x29c);}else return Scene_MenuBase[_0x5ce9e7(0x2c3)]['buttonAssistText1'][_0x5ce9e7(0x32f)](this);},VisuMZ['CoreEngine'][_0xebc2c6(0x6e7)]=Scene_Name['prototype'][_0xebc2c6(0x27e)],Scene_Name[_0xebc2c6(0x2c3)][_0xebc2c6(0x27e)]=function(){const _0x560337=_0xebc2c6;this[_0x560337(0x325)]()?this[_0x560337(0x71b)]():VisuMZ[_0x560337(0x71a)][_0x560337(0x6e7)][_0x560337(0x32f)](this);},Scene_Name['prototype'][_0xebc2c6(0x325)]=function(){const _0x3397c8=_0xebc2c6,_0x3943a3=VisuMZ[_0x3397c8(0x71a)][_0x3397c8(0x74)][_0x3397c8(0x464)];if(!_0x3943a3)return![];const _0x311d9a=_0x3943a3[_0x3397c8(0x296)];if(!_0x311d9a)return![];const _0x1fde2c=this[_0x3397c8(0x1b5)][_0x3397c8(0x4d0)]()[_0x3397c8(0x281)]();for(const _0x7d179c of _0x311d9a){if(_0x1fde2c[_0x3397c8(0x6f5)](_0x7d179c[_0x3397c8(0x281)]()))return!![];}return![];},Scene_Name['prototype']['onInputBannedWords']=function(){const _0xea34f1=_0xebc2c6;SoundManager[_0xea34f1(0x2f0)]();},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x520)]=Scene_Battle[_0xebc2c6(0x2c3)][_0xebc2c6(0x3a8)],Scene_Battle['prototype'][_0xebc2c6(0x3a8)]=function(){const _0x29d0c0=_0xebc2c6;VisuMZ[_0x29d0c0(0x71a)][_0x29d0c0(0x520)]['call'](this);if($gameTemp[_0x29d0c0(0x4a6)])this[_0x29d0c0(0x1a4)]();},Scene_Battle[_0xebc2c6(0x2c3)]['updatePlayTestF7']=function(){const _0x73b7ab=_0xebc2c6;!BattleManager[_0x73b7ab(0x5c2)]()&&!this['_playtestF7Looping']&&!$gameMessage['isBusy']()&&(this[_0x73b7ab(0x1b2)]=!![],this['update'](),SceneManager[_0x73b7ab(0x150)](),this[_0x73b7ab(0x1b2)]=![]);},VisuMZ['CoreEngine'][_0xebc2c6(0x52a)]=Scene_Battle[_0xebc2c6(0x2c3)][_0xebc2c6(0x55b)],Scene_Battle[_0xebc2c6(0x2c3)]['createCancelButton']=function(){const _0xd595c3=_0xebc2c6;VisuMZ[_0xd595c3(0x71a)][_0xd595c3(0x52a)][_0xd595c3(0x32f)](this),SceneManager[_0xd595c3(0x733)]()&&this[_0xd595c3(0x1d4)]();},Scene_Battle[_0xebc2c6(0x2c3)][_0xebc2c6(0x1d4)]=function(){const _0x34f39d=_0xebc2c6;this[_0x34f39d(0x27c)]['x']=Graphics[_0x34f39d(0x371)]+0x4,this[_0x34f39d(0x2bc)]()?this[_0x34f39d(0x27c)]['y']=Graphics[_0x34f39d(0x247)]-this['buttonAreaHeight']():this[_0x34f39d(0x27c)]['y']=0x0;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x657)]=Sprite_Button['prototype'][_0xebc2c6(0x1dd)],Sprite_Button[_0xebc2c6(0x2c3)]['initialize']=function(_0x39bac9){const _0x7dfd2e=_0xebc2c6;VisuMZ[_0x7dfd2e(0x71a)][_0x7dfd2e(0x657)][_0x7dfd2e(0x32f)](this,_0x39bac9),this['initButtonHidden']();},Sprite_Button[_0xebc2c6(0x2c3)][_0xebc2c6(0x488)]=function(){const _0xabae65=_0xebc2c6,_0x4835bf=VisuMZ[_0xabae65(0x71a)][_0xabae65(0x74)]['UI'];this[_0xabae65(0x248)]=![];switch(this[_0xabae65(0x358)]){case'cancel':this[_0xabae65(0x248)]=!_0x4835bf[_0xabae65(0x568)];break;case _0xabae65(0x26b):case _0xabae65(0x70):this[_0xabae65(0x248)]=!_0x4835bf[_0xabae65(0x49e)];break;case _0xabae65(0xc4):case'up':case _0xabae65(0x3f8):case _0xabae65(0x6cf):case'ok':this['_isButtonHidden']=!_0x4835bf['numberShowButton'];break;case _0xabae65(0x2a7):this[_0xabae65(0x248)]=!_0x4835bf[_0xabae65(0x8c)];break;}},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x48c)]=Sprite_Button[_0xebc2c6(0x2c3)][_0xebc2c6(0x651)],Sprite_Button[_0xebc2c6(0x2c3)]['updateOpacity']=function(){const _0x40ad69=_0xebc2c6;SceneManager[_0x40ad69(0x447)]()||this[_0x40ad69(0x248)]?this[_0x40ad69(0x497)]():VisuMZ[_0x40ad69(0x71a)][_0x40ad69(0x48c)][_0x40ad69(0x32f)](this);},Sprite_Button['prototype']['hideButtonFromView']=function(){const _0x3ec22d=_0xebc2c6;this[_0x3ec22d(0x5e8)]=![],this[_0x3ec22d(0x64d)]=0x0,this['x']=Graphics['width']*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x543)]=Sprite_Battler['prototype'][_0xebc2c6(0x387)],Sprite_Battler[_0xebc2c6(0x2c3)][_0xebc2c6(0x387)]=function(_0x18fe99,_0x32d9a4,_0xa8dfe2){const _0x50ec4e=_0xebc2c6;(this[_0x50ec4e(0x462)]!==_0x18fe99||this['_targetOffsetY']!==_0x32d9a4)&&(this[_0x50ec4e(0xe9)](_0x50ec4e(0x318)),this['_movementWholeDuration']=_0xa8dfe2),VisuMZ[_0x50ec4e(0x71a)]['Sprite_Battler_startMove']['call'](this,_0x18fe99,_0x32d9a4,_0xa8dfe2);},Sprite_Battler[_0xebc2c6(0x2c3)][_0xebc2c6(0xe9)]=function(_0x42e6f7){this['_moveEasingType']=_0x42e6f7;},Sprite_Battler[_0xebc2c6(0x2c3)][_0xebc2c6(0x477)]=function(){const _0x31002b=_0xebc2c6;if(this['_movementDuration']<=0x0)return;const _0x4a73d5=this[_0x31002b(0x1eb)],_0x2de8bb=this[_0x31002b(0x643)],_0x1c2511=this[_0x31002b(0x388)];this[_0x31002b(0x702)]=this[_0x31002b(0x78)](this[_0x31002b(0x702)],this[_0x31002b(0x462)],_0x4a73d5,_0x2de8bb,_0x1c2511),this['_offsetY']=this[_0x31002b(0x78)](this[_0x31002b(0x198)],this['_targetOffsetY'],_0x4a73d5,_0x2de8bb,_0x1c2511),this[_0x31002b(0x1eb)]--;if(this[_0x31002b(0x1eb)]<=0x0)this[_0x31002b(0x72a)]();},Sprite_Battler[_0xebc2c6(0x2c3)][_0xebc2c6(0x78)]=function(_0x279579,_0x1ba51d,_0x5d84ef,_0x332ed9,_0x9fec00){const _0xea9007=_0xebc2c6,_0xd6caee=VisuMZ[_0xea9007(0x28c)]((_0x332ed9-_0x5d84ef)/_0x332ed9,_0x9fec00||_0xea9007(0x318)),_0x150861=VisuMZ[_0xea9007(0x28c)]((_0x332ed9-_0x5d84ef+0x1)/_0x332ed9,_0x9fec00||'Linear'),_0xe57cab=(_0x279579-_0x1ba51d*_0xd6caee)/(0x1-_0xd6caee);return _0xe57cab+(_0x1ba51d-_0xe57cab)*_0x150861;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x43e)]=Sprite_Actor['prototype']['setActorHome'],Sprite_Actor['prototype']['setActorHome']=function(_0x4afe3f){const _0x5200c8=_0xebc2c6;VisuMZ[_0x5200c8(0x71a)][_0x5200c8(0x74)]['UI'][_0x5200c8(0x74c)]?this[_0x5200c8(0x2c8)](_0x4afe3f):VisuMZ[_0x5200c8(0x71a)][_0x5200c8(0x43e)]['call'](this,_0x4afe3f);},Sprite_Actor[_0xebc2c6(0x2c3)][_0xebc2c6(0x2c8)]=function(_0x180030){const _0x2acc51=_0xebc2c6;let _0x43ee44=Math[_0x2acc51(0x6b6)](Graphics['width']/0x2+0xc0);_0x43ee44-=Math[_0x2acc51(0x125)]((Graphics[_0x2acc51(0x20a)]-Graphics['boxWidth'])/0x2),_0x43ee44+=_0x180030*0x20;let _0x304fc0=Graphics[_0x2acc51(0x102)]-0xc8-$gameParty[_0x2acc51(0xda)]()*0x30;_0x304fc0-=Math[_0x2acc51(0x125)]((Graphics[_0x2acc51(0x102)]-Graphics[_0x2acc51(0x247)])/0x2),_0x304fc0+=_0x180030*0x30,this[_0x2acc51(0x5b9)](_0x43ee44,_0x304fc0);},Sprite_Actor[_0xebc2c6(0x2c3)][_0xebc2c6(0x217)]=function(){const _0x4e70b7=_0xebc2c6;this[_0x4e70b7(0x387)](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0xebc2c6(0x32d)]=function(_0x43c4eb){const _0x12d8e1=_0xebc2c6;this[_0x12d8e1(0x5c5)]=_0x43c4eb;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x6e)]=Sprite_Animation[_0xebc2c6(0x2c3)][_0xebc2c6(0x207)],Sprite_Animation[_0xebc2c6(0x2c3)][_0xebc2c6(0x207)]=function(){const _0x194345=_0xebc2c6;if(this[_0x194345(0x5c5)])return;VisuMZ[_0x194345(0x71a)]['Sprite_Animation_processSoundTimings'][_0x194345(0x32f)](this);},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x3ce)]=Sprite_Animation[_0xebc2c6(0x2c3)][_0xebc2c6(0x183)],Sprite_Animation[_0xebc2c6(0x2c3)]['setViewport']=function(_0x3e497c){const _0x2cc52f=_0xebc2c6;this[_0x2cc52f(0x670)]()?this[_0x2cc52f(0x5cb)](_0x3e497c):VisuMZ['CoreEngine']['Sprite_Animation_setViewport']['call'](this,_0x3e497c);},Sprite_Animation[_0xebc2c6(0x2c3)][_0xebc2c6(0x670)]=function(){const _0x86e93c=_0xebc2c6;if(!this[_0x86e93c(0x29e)])return![];const _0x65a8c=this[_0x86e93c(0x29e)][_0x86e93c(0x4d0)]||'';if(_0x65a8c[_0x86e93c(0x3f9)](/<MIRROR OFFSET X>/i))return!![];if(_0x65a8c[_0x86e93c(0x3f9)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x86e93c(0x71a)][_0x86e93c(0x74)][_0x86e93c(0x4b2)][_0x86e93c(0x30b)];},Sprite_Animation[_0xebc2c6(0x2c3)]['setViewportCoreEngineFix']=function(_0x50dbb6){const _0x226ba2=_0xebc2c6,_0x87927c=this['_viewportSize'],_0x39c51d=this['_viewportSize'],_0xf4a0fd=this[_0x226ba2(0x29e)][_0x226ba2(0x13b)]*(this['_mirror']?-0x1:0x1)-_0x87927c/0x2,_0x486e8f=this['_animation'][_0x226ba2(0x727)]-_0x39c51d/0x2,_0x1630d3=this[_0x226ba2(0x5b0)](_0x50dbb6);_0x50dbb6['gl']['viewport'](_0xf4a0fd+_0x1630d3['x'],_0x486e8f+_0x1630d3['y'],_0x87927c,_0x39c51d);},Sprite_Animation[_0xebc2c6(0x2c3)][_0xebc2c6(0x2da)]=function(_0xabb61b){const _0x1c424a=_0xebc2c6;if(_0xabb61b[_0x1c424a(0x240)]){}const _0x2e4003=this['_animation']['name'];let _0x283ff8=_0xabb61b[_0x1c424a(0x102)]*_0xabb61b['scale']['y'],_0xf75d8e=0x0,_0x76ba34=-_0x283ff8/0x2;if(_0x2e4003[_0x1c424a(0x3f9)](/<(?:HEAD|HEADER|TOP)>/i))_0x76ba34=-_0x283ff8;if(_0x2e4003[_0x1c424a(0x3f9)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x76ba34=0x0;if(this[_0x1c424a(0x29e)][_0x1c424a(0x5db)])_0x76ba34=0x0;if(_0x2e4003[_0x1c424a(0x3f9)](/<(?:LEFT)>/i))_0xf75d8e=-_0xabb61b[_0x1c424a(0x20a)]/0x2;if(_0x2e4003[_0x1c424a(0x3f9)](/<(?:RIGHT)>/i))_0xf75d8e=_0xabb61b['width']/0x2;_0x2e4003['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0xf75d8e=Number(RegExp['$1'])*_0xabb61b[_0x1c424a(0x20a)]);_0x2e4003[_0x1c424a(0x3f9)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x76ba34=(0x1-Number(RegExp['$1']))*-_0x283ff8);_0x2e4003[_0x1c424a(0x3f9)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0xf75d8e=Number(RegExp['$1'])*_0xabb61b[_0x1c424a(0x20a)],_0x76ba34=(0x1-Number(RegExp['$2']))*-_0x283ff8);if(_0x2e4003['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0xf75d8e+=Number(RegExp['$1']);if(_0x2e4003[_0x1c424a(0x3f9)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x76ba34+=Number(RegExp['$1']);_0x2e4003['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0xf75d8e+=Number(RegExp['$1']),_0x76ba34+=Number(RegExp['$2']));const _0x3fa43a=new Point(_0xf75d8e,_0x76ba34);return _0xabb61b[_0x1c424a(0x1e8)](),_0xabb61b[_0x1c424a(0x1de)][_0x1c424a(0x1ff)](_0x3fa43a);},Sprite_AnimationMV[_0xebc2c6(0x2c3)][_0xebc2c6(0x69b)]=function(){const _0x31da81=_0xebc2c6;this[_0x31da81(0x282)]=VisuMZ[_0x31da81(0x71a)][_0x31da81(0x74)]['QoL'][_0x31da81(0x47c)]??0x4,this[_0x31da81(0x246)](),this[_0x31da81(0x282)]=this[_0x31da81(0x282)][_0x31da81(0x1cc)](0x1,0xa);},Sprite_AnimationMV['prototype']['setupCustomRateCoreEngine']=function(){const _0x204ea5=_0xebc2c6;if(!this[_0x204ea5(0x29e)]);const _0x4105e8=this[_0x204ea5(0x29e)][_0x204ea5(0x4d0)]||'';_0x4105e8[_0x204ea5(0x3f9)](/<RATE:[ ](\d+)>/i)&&(this['_rate']=(Number(RegExp['$1'])||0x1)['clamp'](0x1,0xa));},Sprite_AnimationMV[_0xebc2c6(0x2c3)][_0xebc2c6(0x32d)]=function(_0x452d90){const _0x901fdf=_0xebc2c6;this[_0x901fdf(0x5c5)]=_0x452d90;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x662)]=Sprite_AnimationMV[_0xebc2c6(0x2c3)]['processTimingData'],Sprite_AnimationMV[_0xebc2c6(0x2c3)][_0xebc2c6(0x138)]=function(_0xea7de3){const _0xba5207=_0xebc2c6;this[_0xba5207(0x5c5)]&&(_0xea7de3=JsonEx['makeDeepCopy'](_0xea7de3),_0xea7de3['se']&&(_0xea7de3['se'][_0xba5207(0x1b8)]=0x0)),VisuMZ[_0xba5207(0x71a)][_0xba5207(0x662)][_0xba5207(0x32f)](this,_0xea7de3);},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x59d)]=Sprite_AnimationMV[_0xebc2c6(0x2c3)][_0xebc2c6(0x461)],Sprite_AnimationMV[_0xebc2c6(0x2c3)][_0xebc2c6(0x461)]=function(){const _0x4a69f4=_0xebc2c6;VisuMZ['CoreEngine'][_0x4a69f4(0x59d)][_0x4a69f4(0x32f)](this);if(this[_0x4a69f4(0x29e)][_0x4a69f4(0x2b8)]===0x3){if(this['x']===0x0)this['x']=Math[_0x4a69f4(0x6b6)](Graphics[_0x4a69f4(0x20a)]/0x2);if(this['y']===0x0)this['y']=Math[_0x4a69f4(0x6b6)](Graphics[_0x4a69f4(0x102)]/0x2);}},Sprite_Damage[_0xebc2c6(0x2c3)][_0xebc2c6(0x1fb)]=function(_0xfc680e){const _0x43e762=_0xebc2c6;let _0x2e8b6e=Math[_0x43e762(0x13e)](_0xfc680e)[_0x43e762(0x413)]();this[_0x43e762(0x501)]()&&(_0x2e8b6e=VisuMZ[_0x43e762(0x256)](_0x2e8b6e));const _0x3458d2=this[_0x43e762(0x213)](),_0x3e24fc=Math[_0x43e762(0x125)](_0x3458d2*0.75);for(let _0x48247e=0x0;_0x48247e<_0x2e8b6e['length'];_0x48247e++){const _0x1aeb11=this[_0x43e762(0x719)](_0x3e24fc,_0x3458d2);_0x1aeb11[_0x43e762(0x2d3)][_0x43e762(0x109)](_0x2e8b6e[_0x48247e],0x0,0x0,_0x3e24fc,_0x3458d2,_0x43e762(0x4fe)),_0x1aeb11['x']=(_0x48247e-(_0x2e8b6e[_0x43e762(0x749)]-0x1)/0x2)*_0x3e24fc,_0x1aeb11['dy']=-_0x48247e;}},Sprite_Damage[_0xebc2c6(0x2c3)][_0xebc2c6(0x501)]=function(){const _0xf885e9=_0xebc2c6;return VisuMZ['CoreEngine'][_0xf885e9(0x74)][_0xf885e9(0x4b2)][_0xf885e9(0x74e)];},Sprite_Damage[_0xebc2c6(0x2c3)][_0xebc2c6(0x574)]=function(){const _0x1fe6e4=_0xebc2c6;return ColorManager[_0x1fe6e4(0x6fe)]();},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x6ca)]=Sprite_Gauge[_0xebc2c6(0x2c3)][_0xebc2c6(0x496)],Sprite_Gauge[_0xebc2c6(0x2c3)]['gaugeRate']=function(){const _0xcfdd04=_0xebc2c6;return VisuMZ[_0xcfdd04(0x71a)][_0xcfdd04(0x6ca)][_0xcfdd04(0x32f)](this)[_0xcfdd04(0x1cc)](0x0,0x1);},VisuMZ['CoreEngine'][_0xebc2c6(0x404)]=Sprite_Gauge[_0xebc2c6(0x2c3)][_0xebc2c6(0x12f)],Sprite_Gauge['prototype'][_0xebc2c6(0x12f)]=function(){const _0xb08493=_0xebc2c6;let _0x5f2b3e=VisuMZ[_0xb08493(0x71a)][_0xb08493(0x404)][_0xb08493(0x32f)](this);return _0x5f2b3e;},Sprite_Gauge[_0xebc2c6(0x2c3)][_0xebc2c6(0x726)]=function(){const _0x5201c3=_0xebc2c6;let _0x411c44=this[_0x5201c3(0x12f)]();this[_0x5201c3(0x501)]()&&(_0x411c44=VisuMZ['GroupDigits'](_0x411c44));const _0x4e4408=this[_0x5201c3(0x508)]()-0x1,_0xedbe19=this[_0x5201c3(0x561)]?this['textHeight']():this[_0x5201c3(0x2f9)]();this[_0x5201c3(0x336)](),this[_0x5201c3(0x2d3)][_0x5201c3(0x109)](_0x411c44,0x0,0x0,_0x4e4408,_0xedbe19,_0x5201c3(0x63b));},Sprite_Gauge[_0xebc2c6(0x2c3)]['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge[_0xebc2c6(0x2c3)][_0xebc2c6(0x501)]=function(){const _0x26a43a=_0xebc2c6;return VisuMZ[_0x26a43a(0x71a)][_0x26a43a(0x74)]['QoL'][_0x26a43a(0x6a7)];},Sprite_Gauge['prototype'][_0xebc2c6(0x574)]=function(){const _0x3bb84f=_0xebc2c6;return ColorManager[_0x3bb84f(0x1bd)]();},VisuMZ[_0xebc2c6(0x71a)]['Sprite_Picture_loadBitmap']=Sprite_Picture['prototype']['loadBitmap'],Sprite_Picture['prototype']['loadBitmap']=function(){const _0x51a85d=_0xebc2c6;this[_0x51a85d(0x261)][_0x51a85d(0x3f9)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this['loadIconBitmap'](Number(RegExp['$1'])):VisuMZ['CoreEngine'][_0x51a85d(0x3d7)][_0x51a85d(0x32f)](this);},Sprite_Picture[_0xebc2c6(0x2c3)][_0xebc2c6(0x23c)]=function(_0x981fef){const _0x139760=_0xebc2c6,_0x2d228d=ImageManager[_0x139760(0x6fa)],_0x32b186=ImageManager[_0x139760(0x1a8)],_0x5e6973=this['_pictureName'][_0x139760(0x3f9)](/SMOOTH/i);this[_0x139760(0x2d3)]=new Bitmap(_0x2d228d,_0x32b186);const _0x1b8908=ImageManager[_0x139760(0x572)]('IconSet'),_0x4c798e=_0x981fef%0x10*_0x2d228d,_0x1a6ba1=Math[_0x139760(0x125)](_0x981fef/0x10)*_0x32b186;this['bitmap'][_0x139760(0x6b9)]=_0x5e6973,this[_0x139760(0x2d3)][_0x139760(0x1a7)](_0x1b8908,_0x4c798e,_0x1a6ba1,_0x2d228d,_0x32b186,0x0,0x0,_0x2d228d,_0x32b186);};function Sprite_TitlePictureButton(){const _0x36e66b=_0xebc2c6;this[_0x36e66b(0x1dd)](...arguments);}Sprite_TitlePictureButton['prototype']=Object[_0xebc2c6(0x549)](Sprite_Clickable[_0xebc2c6(0x2c3)]),Sprite_TitlePictureButton[_0xebc2c6(0x2c3)][_0xebc2c6(0x680)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0xebc2c6(0x2c3)][_0xebc2c6(0x1dd)]=function(_0x51aa3f){const _0x4d4bb5=_0xebc2c6;Sprite_Clickable['prototype'][_0x4d4bb5(0x1dd)][_0x4d4bb5(0x32f)](this),this[_0x4d4bb5(0x56e)]=_0x51aa3f,this[_0x4d4bb5(0x439)]=null,this[_0x4d4bb5(0x418)]();},Sprite_TitlePictureButton[_0xebc2c6(0x2c3)][_0xebc2c6(0x418)]=function(){const _0x4e7aac=_0xebc2c6;this['x']=Graphics['width'],this['y']=Graphics[_0x4e7aac(0x102)],this['visible']=![],this[_0x4e7aac(0x1be)]();},Sprite_TitlePictureButton[_0xebc2c6(0x2c3)][_0xebc2c6(0x1be)]=function(){const _0x2b9c53=_0xebc2c6;this[_0x2b9c53(0x2d3)]=ImageManager[_0x2b9c53(0x156)](this['_data']['PictureFilename']),this[_0x2b9c53(0x2d3)][_0x2b9c53(0x5fe)](this[_0x2b9c53(0x6ac)][_0x2b9c53(0x563)](this));},Sprite_TitlePictureButton['prototype'][_0xebc2c6(0x6ac)]=function(){const _0x2b2b2e=_0xebc2c6;this[_0x2b2b2e(0x56e)][_0x2b2b2e(0x258)][_0x2b2b2e(0x32f)](this),this[_0x2b2b2e(0x56e)][_0x2b2b2e(0x42e)]['call'](this),this[_0x2b2b2e(0x18d)](this['_data'][_0x2b2b2e(0x538)][_0x2b2b2e(0x563)](this));},Sprite_TitlePictureButton['prototype'][_0xebc2c6(0x3a8)]=function(){const _0x3c5633=_0xebc2c6;Sprite_Clickable[_0x3c5633(0x2c3)][_0x3c5633(0x3a8)][_0x3c5633(0x32f)](this),this['updateOpacity'](),this[_0x3c5633(0x301)]();},Sprite_TitlePictureButton['prototype'][_0xebc2c6(0xad)]=function(){const _0x613aa1=_0xebc2c6;return VisuMZ[_0x613aa1(0x71a)][_0x613aa1(0x74)][_0x613aa1(0x74b)][_0x613aa1(0x49c)][_0x613aa1(0x2fd)];},Sprite_TitlePictureButton[_0xebc2c6(0x2c3)][_0xebc2c6(0x651)]=function(){const _0x4b9a08=_0xebc2c6;this[_0x4b9a08(0x36f)]||this[_0x4b9a08(0x14c)]?this[_0x4b9a08(0x64d)]=0xff:(this[_0x4b9a08(0x64d)]+=this[_0x4b9a08(0x5e8)]?this[_0x4b9a08(0xad)]():-0x1*this[_0x4b9a08(0xad)](),this[_0x4b9a08(0x64d)]=Math['min'](0xc0,this[_0x4b9a08(0x64d)]));},Sprite_TitlePictureButton[_0xebc2c6(0x2c3)][_0xebc2c6(0x18d)]=function(_0x5ca2ab){const _0x518f7d=_0xebc2c6;this[_0x518f7d(0x439)]=_0x5ca2ab;},Sprite_TitlePictureButton[_0xebc2c6(0x2c3)][_0xebc2c6(0x2d6)]=function(){this['_clickHandler']&&this['_clickHandler']();},VisuMZ['CoreEngine']['Spriteset_Base_initialize']=Spriteset_Base[_0xebc2c6(0x2c3)]['initialize'],Spriteset_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x1dd)]=function(){const _0x5c00a0=_0xebc2c6;VisuMZ[_0x5c00a0(0x71a)][_0x5c00a0(0x245)][_0x5c00a0(0x32f)](this),this['initMembersCoreEngine']();},Spriteset_Base[_0xebc2c6(0x2c3)]['initMembersCoreEngine']=function(){const _0x5419d3=_0xebc2c6;this['_fauxAnimationSprites']=[],this[_0x5419d3(0x4a2)]=[],this['_cacheScaleX']=this['scale']['x'],this['_cacheScaleY']=this[_0x5419d3(0x4b7)]['y'];},VisuMZ[_0xebc2c6(0x71a)]['Spriteset_Base_destroy']=Spriteset_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x5d3)],Spriteset_Base['prototype']['destroy']=function(_0x4d6de5){const _0x4701f9=_0xebc2c6;this[_0x4701f9(0x3db)](),this['removeAllPointAnimations'](),VisuMZ[_0x4701f9(0x71a)][_0x4701f9(0x48a)][_0x4701f9(0x32f)](this,_0x4d6de5);},VisuMZ[_0xebc2c6(0x71a)]['Spriteset_Base_update']=Spriteset_Base[_0xebc2c6(0x2c3)]['update'],Spriteset_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x3a8)]=function(){const _0xc45db1=_0xebc2c6;VisuMZ[_0xc45db1(0x71a)][_0xc45db1(0x700)][_0xc45db1(0x32f)](this),this[_0xc45db1(0x173)](),this['updateFauxAnimations'](),this[_0xc45db1(0x688)]();},Spriteset_Base['prototype'][_0xebc2c6(0x173)]=function(){const _0x5d6cfb=_0xebc2c6;if(!VisuMZ[_0x5d6cfb(0x71a)][_0x5d6cfb(0x74)][_0x5d6cfb(0x4b2)][_0x5d6cfb(0x456)])return;if(this['_cacheScaleX']===this['scale']['x']&&this['_cacheScaleY']===this[_0x5d6cfb(0x4b7)]['y'])return;this[_0x5d6cfb(0x3ff)](),this[_0x5d6cfb(0x6f6)]=this[_0x5d6cfb(0x4b7)]['x'],this[_0x5d6cfb(0x5ad)]=this[_0x5d6cfb(0x4b7)]['y'];},Spriteset_Base[_0xebc2c6(0x2c3)]['adjustPictureAntiZoom']=function(){const _0x7bf348=_0xebc2c6;if(SceneManager[_0x7bf348(0x70d)]()&&Spriteset_Map['DETACH_PICTURE_CONTAINER'])return;else{if(SceneManager[_0x7bf348(0x4ea)]()&&Spriteset_Battle[_0x7bf348(0x2f8)])return;}this['scale']['x']!==0x0&&(this['_pictureContainer'][_0x7bf348(0x4b7)]['x']=0x1/this[_0x7bf348(0x4b7)]['x'],this[_0x7bf348(0x6c4)]['x']=-(this['x']/this[_0x7bf348(0x4b7)]['x'])),this[_0x7bf348(0x4b7)]['y']!==0x0&&(this['_pictureContainer'][_0x7bf348(0x4b7)]['y']=0x1/this[_0x7bf348(0x4b7)]['y'],this[_0x7bf348(0x6c4)]['y']=-(this['y']/this[_0x7bf348(0x4b7)]['y']));},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x168)]=Spriteset_Base[_0xebc2c6(0x2c3)]['updatePosition'],Spriteset_Base[_0xebc2c6(0x2c3)]['updatePosition']=function(){const _0x3d0ae8=_0xebc2c6;VisuMZ[_0x3d0ae8(0x71a)]['Spriteset_Base_updatePosition'][_0x3d0ae8(0x32f)](this),this['updatePositionCoreEngine']();},Spriteset_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x6d7)]=function(){const _0x2c32be=_0xebc2c6;if(!$gameScreen)return;if($gameScreen[_0x2c32be(0x30a)]<=0x0)return;this['x']-=Math[_0x2c32be(0x6b6)]($gameScreen[_0x2c32be(0x465)]());const _0xa1ff65=$gameScreen[_0x2c32be(0x738)]();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case'original':this['updatePositionCoreEngineShakeOriginal']();break;case _0x2c32be(0x269):this[_0x2c32be(0xd4)]();break;case _0x2c32be(0x687):this[_0x2c32be(0x39a)]();break;default:this[_0x2c32be(0x142)]();break;}},Spriteset_Base['prototype']['updatePositionCoreEngineShakeOriginal']=function(){const _0xc39ed9=_0xebc2c6,_0x4e155a=VisuMZ[_0xc39ed9(0x71a)][_0xc39ed9(0x74)]['ScreenShake'];if(_0x4e155a&&_0x4e155a[_0xc39ed9(0x551)])return _0x4e155a['originalJS'][_0xc39ed9(0x32f)](this);this['x']+=Math[_0xc39ed9(0x6b6)]($gameScreen[_0xc39ed9(0x465)]());},Spriteset_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x142)]=function(){const _0x224a0d=_0xebc2c6,_0x2c8399=VisuMZ['CoreEngine'][_0x224a0d(0x74)]['ScreenShake'];if(_0x2c8399&&_0x2c8399[_0x224a0d(0x253)])return _0x2c8399[_0x224a0d(0x253)][_0x224a0d(0x32f)](this);const _0x9479b4=$gameScreen[_0x224a0d(0x22f)]*0.75,_0x4428de=$gameScreen[_0x224a0d(0x9b)]*0.6,_0x19d641=$gameScreen[_0x224a0d(0x30a)];this['x']+=Math[_0x224a0d(0x6b6)](Math['randomInt'](_0x9479b4)-Math[_0x224a0d(0x3b5)](_0x4428de))*(Math[_0x224a0d(0x134)](_0x19d641,0x1e)*0.5),this['y']+=Math['round'](Math[_0x224a0d(0x3b5)](_0x9479b4)-Math[_0x224a0d(0x3b5)](_0x4428de))*(Math[_0x224a0d(0x134)](_0x19d641,0x1e)*0.5);},Spriteset_Base['prototype'][_0xebc2c6(0xd4)]=function(){const _0x3d977d=_0xebc2c6,_0x56ffc2=VisuMZ[_0x3d977d(0x71a)][_0x3d977d(0x74)][_0x3d977d(0x402)];if(_0x56ffc2&&_0x56ffc2[_0x3d977d(0x93)])return _0x56ffc2[_0x3d977d(0x93)][_0x3d977d(0x32f)](this);const _0x4cd403=$gameScreen[_0x3d977d(0x22f)]*0.75,_0x207f6a=$gameScreen[_0x3d977d(0x9b)]*0.6,_0x3045e4=$gameScreen[_0x3d977d(0x30a)];this['x']+=Math['round'](Math[_0x3d977d(0x3b5)](_0x4cd403)-Math['randomInt'](_0x207f6a))*(Math[_0x3d977d(0x134)](_0x3045e4,0x1e)*0.5);},Spriteset_Base[_0xebc2c6(0x2c3)]['updatePositionCoreEngineShakeVert']=function(){const _0x4a0900=_0xebc2c6,_0x33e782=VisuMZ['CoreEngine']['Settings'][_0x4a0900(0x402)];if(_0x33e782&&_0x33e782[_0x4a0900(0x615)])return _0x33e782['vertJS']['call'](this);const _0x4d3b65=$gameScreen[_0x4a0900(0x22f)]*0.75,_0x26a5ad=$gameScreen[_0x4a0900(0x9b)]*0.6,_0x5c55df=$gameScreen[_0x4a0900(0x30a)];this['y']+=Math[_0x4a0900(0x6b6)](Math['randomInt'](_0x4d3b65)-Math[_0x4a0900(0x3b5)](_0x26a5ad))*(Math[_0x4a0900(0x134)](_0x5c55df,0x1e)*0.5);},Spriteset_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x718)]=function(){const _0x43a6b3=_0xebc2c6;for(const _0x2a8dd1 of this[_0x43a6b3(0x30d)]){!_0x2a8dd1[_0x43a6b3(0x13c)]()&&this[_0x43a6b3(0x68b)](_0x2a8dd1);}this['processFauxAnimationRequests']();},Spriteset_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x5ec)]=function(){const _0x458f88=_0xebc2c6;for(;;){const _0x46b1f2=$gameTemp['retrieveFauxAnimation']();if(_0x46b1f2)this[_0x458f88(0x590)](_0x46b1f2);else break;}},Spriteset_Base[_0xebc2c6(0x2c3)]['createFauxAnimation']=function(_0x464671){const _0xfca3f1=_0xebc2c6,_0x12651e=$dataAnimations[_0x464671['animationId']],_0x3fe7c1=_0x464671[_0xfca3f1(0x158)],_0x44ba7d=_0x464671[_0xfca3f1(0x535)],_0x1cc668=_0x464671[_0xfca3f1(0x454)];let _0xcb0d3a=this['animationBaseDelay']();const _0x19be34=this['animationNextDelay']();if(this[_0xfca3f1(0x4c2)](_0x12651e))for(const _0xb95b48 of _0x3fe7c1){this[_0xfca3f1(0x587)]([_0xb95b48],_0x12651e,_0x44ba7d,_0xcb0d3a,_0x1cc668),_0xcb0d3a+=_0x19be34;}else this['createFauxAnimationSprite'](_0x3fe7c1,_0x12651e,_0x44ba7d,_0xcb0d3a,_0x1cc668);},Spriteset_Base['prototype'][_0xebc2c6(0x587)]=function(_0x3be228,_0x44ad27,_0x200340,_0x2e691e,_0x168fc0){const _0x3ede5a=_0xebc2c6,_0x3d141a=this['isMVAnimation'](_0x44ad27),_0x489fe8=new(_0x3d141a?Sprite_AnimationMV:Sprite_Animation)(),_0x38e630=this[_0x3ede5a(0x52d)](_0x3be228);this['animationShouldMirror'](_0x3be228[0x0])&&(_0x200340=!_0x200340),_0x489fe8['targetObjects']=_0x3be228,_0x489fe8['setup'](_0x38e630,_0x44ad27,_0x200340,_0x2e691e),_0x489fe8['setMute'](_0x168fc0),this[_0x3ede5a(0xb4)]['addChild'](_0x489fe8),this[_0x3ede5a(0x30d)][_0x3ede5a(0x710)](_0x489fe8);},Spriteset_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x68b)]=function(_0x3737b9){const _0x1526f3=_0xebc2c6;this[_0x1526f3(0x30d)][_0x1526f3(0x218)](_0x3737b9),this['_effectsContainer'][_0x1526f3(0x6c)](_0x3737b9);for(const _0xe39faa of _0x3737b9['targetObjects']){_0xe39faa['endAnimation']&&_0xe39faa['endAnimation']();}_0x3737b9['destroy']();},Spriteset_Base['prototype']['removeAllFauxAnimations']=function(){const _0x3be69a=_0xebc2c6;for(const _0x26b8f9 of this[_0x3be69a(0x30d)]){this[_0x3be69a(0x68b)](_0x26b8f9);}},Spriteset_Base['prototype'][_0xebc2c6(0x21c)]=function(){return this['_fauxAnimationSprites']['length']>0x0;},Spriteset_Base[_0xebc2c6(0x2c3)]['updatePointAnimations']=function(){const _0x5c3502=_0xebc2c6;for(const _0x4d505e of this[_0x5c3502(0x4a2)]){!_0x4d505e[_0x5c3502(0x13c)]()&&this[_0x5c3502(0x4a0)](_0x4d505e);}this['processPointAnimationRequests']();},Spriteset_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x41e)]=function(){const _0xd5838=_0xebc2c6;for(;;){const _0x278727=$gameTemp[_0xd5838(0x522)]();if(_0x278727)this['createPointAnimation'](_0x278727);else break;}},Spriteset_Base[_0xebc2c6(0x2c3)]['createPointAnimation']=function(_0x2bf132){const _0xa963bc=_0xebc2c6,_0x328b3b=$dataAnimations[_0x2bf132['animationId']],_0x754833=this[_0xa963bc(0x628)](_0x2bf132),_0x312292=_0x2bf132[_0xa963bc(0x535)],_0x4ac349=_0x2bf132[_0xa963bc(0x454)];let _0x5eb333=this[_0xa963bc(0x586)]();const _0x325d5b=this[_0xa963bc(0x5ae)]();if(this[_0xa963bc(0x4c2)](_0x328b3b))for(const _0x4dafac of _0x754833){this[_0xa963bc(0x184)]([_0x4dafac],_0x328b3b,_0x312292,_0x5eb333,_0x4ac349),_0x5eb333+=_0x325d5b;}else this[_0xa963bc(0x184)](_0x754833,_0x328b3b,_0x312292,_0x5eb333,_0x4ac349);},Spriteset_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x628)]=function(_0x2055f9){const _0x239eec=_0xebc2c6,_0x501011=new Sprite_Clickable();_0x501011['x']=_0x2055f9['x'],_0x501011['y']=_0x2055f9['y'],_0x501011['z']=0x64;const _0x4dcb87=this[_0x239eec(0x751)]();return _0x4dcb87[_0x239eec(0x148)](_0x501011),[_0x501011];},Spriteset_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x751)]=function(){return this;},Spriteset_Map['prototype'][_0xebc2c6(0x751)]=function(){const _0x193ca2=_0xebc2c6;return this[_0x193ca2(0x3e2)]||this;},Spriteset_Battle['prototype'][_0xebc2c6(0x751)]=function(){const _0x18fc63=_0xebc2c6;return this[_0x18fc63(0x195)]||this;},Spriteset_Base[_0xebc2c6(0x2c3)]['createPointAnimationSprite']=function(_0x73f2c5,_0x445ba0,_0x579994,_0x55a426,_0x5984a8){const _0x419f08=_0xebc2c6,_0x3a2c1c=this[_0x419f08(0xaf)](_0x445ba0),_0x3a4325=new(_0x3a2c1c?Sprite_AnimationMV:Sprite_Animation)();_0x3a4325['targetObjects']=_0x73f2c5,_0x3a4325[_0x419f08(0x418)](_0x73f2c5,_0x445ba0,_0x579994,_0x55a426),_0x3a4325[_0x419f08(0x32d)](_0x5984a8),this[_0x419f08(0xb4)][_0x419f08(0x148)](_0x3a4325),this[_0x419f08(0x4a2)][_0x419f08(0x710)](_0x3a4325);},Spriteset_Base['prototype'][_0xebc2c6(0x4a0)]=function(_0x453d9a){const _0x1790f9=_0xebc2c6;this[_0x1790f9(0x4a2)][_0x1790f9(0x218)](_0x453d9a),this[_0x1790f9(0xb4)][_0x1790f9(0x6c)](_0x453d9a);for(const _0x12a56c of _0x453d9a[_0x1790f9(0x4db)]){_0x12a56c[_0x1790f9(0x591)]&&_0x12a56c[_0x1790f9(0x591)]();const _0x3e20eb=this[_0x1790f9(0x751)]();if(_0x3e20eb)_0x3e20eb[_0x1790f9(0x6c)](_0x12a56c);}_0x453d9a[_0x1790f9(0x5d3)]();},Spriteset_Base['prototype']['removeAllPointAnimations']=function(){const _0x24020=_0xebc2c6;for(const _0x4c98c4 of this[_0x24020(0x4a2)]){this[_0x24020(0x4a0)](_0x4c98c4);}},Spriteset_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x394)]=function(){return this['_pointAnimationSprites']['length']>0x0;},VisuMZ['CoreEngine'][_0xebc2c6(0x233)]=Spriteset_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x254)],Spriteset_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x254)]=function(){const _0x5a79d6=_0xebc2c6;return VisuMZ[_0x5a79d6(0x71a)][_0x5a79d6(0x233)][_0x5a79d6(0x32f)](this)||this[_0x5a79d6(0x394)]();},Spriteset_Map[_0xebc2c6(0x2f8)]=VisuMZ[_0xebc2c6(0x71a)]['Settings'][_0xebc2c6(0x4b2)][_0xebc2c6(0x1ac)]||![],VisuMZ['CoreEngine'][_0xebc2c6(0x61d)]=Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x1e9)],Scene_Map[_0xebc2c6(0x2c3)][_0xebc2c6(0x1e9)]=function(){const _0x2dfbe9=_0xebc2c6;VisuMZ[_0x2dfbe9(0x71a)][_0x2dfbe9(0x61d)][_0x2dfbe9(0x32f)](this);if(!Spriteset_Map['DETACH_PICTURE_CONTAINER'])return;const _0x4f8e8a=this[_0x2dfbe9(0x4be)];if(!_0x4f8e8a)return;this[_0x2dfbe9(0x6c4)]=_0x4f8e8a[_0x2dfbe9(0x6c4)];if(!this['_pictureContainer'])return;this['addChild'](this['_pictureContainer']);},Spriteset_Battle['DETACH_PICTURE_CONTAINER']=VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)][_0xebc2c6(0x4b2)][_0xebc2c6(0x674)]||![],VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x50a)]=Scene_Battle['prototype'][_0xebc2c6(0x1e9)],Scene_Battle[_0xebc2c6(0x2c3)][_0xebc2c6(0x1e9)]=function(){const _0x40a6c1=_0xebc2c6;VisuMZ['CoreEngine'][_0x40a6c1(0x50a)]['call'](this);if(!Spriteset_Battle[_0x40a6c1(0x2f8)])return;const _0x4e28a5=this[_0x40a6c1(0x4be)];if(!_0x4e28a5)return;this[_0x40a6c1(0x6c4)]=_0x4e28a5[_0x40a6c1(0x6c4)];if(!this[_0x40a6c1(0x6c4)])return;this[_0x40a6c1(0x148)](this['_pictureContainer']);},Spriteset_Battle[_0xebc2c6(0x2c3)][_0xebc2c6(0x46e)]=function(){const _0x356b9f=_0xebc2c6;this[_0x356b9f(0x41b)]=new PIXI[(_0x356b9f(0x4b1))][(_0x356b9f(0x33a))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0x356b9f(0x309)][_0x356b9f(0x2d3)]=SceneManager['backgroundBitmap'](),this[_0x356b9f(0x309)][_0x356b9f(0x4b1)]=[this[_0x356b9f(0x41b)]],this[_0x356b9f(0x4d2)][_0x356b9f(0x148)](this[_0x356b9f(0x309)]);},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x523)]=Spriteset_Battle['prototype']['createEnemies'],Spriteset_Battle[_0xebc2c6(0x2c3)][_0xebc2c6(0x235)]=function(){const _0x2ccdf8=_0xebc2c6;this[_0x2ccdf8(0x5d7)]()&&this[_0x2ccdf8(0x6bd)](),VisuMZ[_0x2ccdf8(0x71a)][_0x2ccdf8(0x523)][_0x2ccdf8(0x32f)](this);},Spriteset_Battle[_0xebc2c6(0x2c3)][_0xebc2c6(0x5d7)]=function(){const _0xea54c4=_0xebc2c6,_0xdbb32f=VisuMZ[_0xea54c4(0x71a)]['Settings'][_0xea54c4(0x133)];if(!_0xdbb32f)return![];if(Utils[_0xea54c4(0x7a)]>=_0xea54c4(0x43b)&&!_0xdbb32f['RepositionEnemies130'])return![];return _0xdbb32f[_0xea54c4(0x31e)];},Spriteset_Battle[_0xebc2c6(0x2c3)][_0xebc2c6(0x6bd)]=function(){const _0x37a673=_0xebc2c6;for(member of $gameTroop['members']()){member[_0x37a673(0xf6)]();}},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x219)]=Window_Base['prototype'][_0xebc2c6(0x1dd)],Window_Base['prototype']['initialize']=function(_0x485206){const _0x2aeabd=_0xebc2c6;_0x485206['x']=Math[_0x2aeabd(0x6b6)](_0x485206['x']),_0x485206['y']=Math[_0x2aeabd(0x6b6)](_0x485206['y']),_0x485206[_0x2aeabd(0x20a)]=Math['round'](_0x485206['width']),_0x485206['height']=Math['round'](_0x485206[_0x2aeabd(0x102)]),this[_0x2aeabd(0x635)](),VisuMZ[_0x2aeabd(0x71a)][_0x2aeabd(0x219)]['call'](this,_0x485206),this[_0x2aeabd(0x363)]();},Window_Base['prototype']['initDigitGrouping']=function(){const _0x5dc662=_0xebc2c6;this[_0x5dc662(0x1db)]=VisuMZ[_0x5dc662(0x71a)][_0x5dc662(0x74)][_0x5dc662(0x4b2)][_0x5dc662(0x333)],this[_0x5dc662(0x29d)]=VisuMZ[_0x5dc662(0x71a)][_0x5dc662(0x74)][_0x5dc662(0x4b2)][_0x5dc662(0x607)];},Window_Base[_0xebc2c6(0x2c3)]['lineHeight']=function(){const _0x35ba8d=_0xebc2c6;return VisuMZ[_0x35ba8d(0x71a)][_0x35ba8d(0x74)]['Window'][_0x35ba8d(0x73e)];},Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x25f)]=function(){const _0x127344=_0xebc2c6;return VisuMZ[_0x127344(0x71a)][_0x127344(0x74)][_0x127344(0x1f9)]['ItemPadding'];},Window_Base[_0xebc2c6(0x2c3)]['updateBackOpacity']=function(){const _0xc8c676=_0xebc2c6;$gameSystem[_0xc8c676(0xd1)]?this['backOpacity']=$gameSystem['windowOpacity']():this[_0xc8c676(0x540)]=VisuMZ[_0xc8c676(0x71a)][_0xc8c676(0x74)][_0xc8c676(0x1f9)][_0xc8c676(0x1ef)];},Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x4ef)]=function(){const _0x39bcf1=_0xebc2c6;return VisuMZ[_0x39bcf1(0x71a)][_0x39bcf1(0x74)][_0x39bcf1(0x1f9)][_0x39bcf1(0x31c)];},Window_Base[_0xebc2c6(0x2c3)]['openingSpeed']=function(){const _0x29da63=_0xebc2c6;return VisuMZ['CoreEngine'][_0x29da63(0x74)][_0x29da63(0x1f9)]['OpenSpeed'];},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x665)]=Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x3a8)],Window_Base['prototype'][_0xebc2c6(0x3a8)]=function(){const _0x27bb39=_0xebc2c6;VisuMZ['CoreEngine'][_0x27bb39(0x665)][_0x27bb39(0x32f)](this),this[_0x27bb39(0x2cc)]();},Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x359)]=function(){const _0x117b4f=_0xebc2c6;this[_0x117b4f(0x9d)]&&(this['openness']+=this['openingSpeed'](),this[_0x117b4f(0x6eb)]()&&(this['_opening']=![]));},Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x87)]=function(){const _0x544ae1=_0xebc2c6;this[_0x544ae1(0x3c2)]&&(this[_0x544ae1(0x567)]-=this['openingSpeed'](),this[_0x544ae1(0x1b6)]()&&(this['_closing']=![]));},VisuMZ['CoreEngine'][_0xebc2c6(0x260)]=Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x109)],Window_Base['prototype'][_0xebc2c6(0x109)]=function(_0x16bce3,_0x28bc65,_0x5cc8a7,_0x44a2d5,_0x131bac){const _0xab0225=_0xebc2c6;if(this['useDigitGrouping']())_0x16bce3=VisuMZ[_0xab0225(0x256)](_0x16bce3);VisuMZ[_0xab0225(0x71a)]['Window_Base_drawText'][_0xab0225(0x32f)](this,_0x16bce3,_0x28bc65,_0x5cc8a7,_0x44a2d5,_0x131bac);},Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x501)]=function(){return this['_digitGrouping'];},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x276)]=Window_Base[_0xebc2c6(0x2c3)]['createTextState'],Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x40e)]=function(_0x21dfc2,_0x2e3788,_0x1bd8e8,_0x111179){const _0x144bbb=_0xebc2c6;var _0x51588e=VisuMZ[_0x144bbb(0x71a)][_0x144bbb(0x276)][_0x144bbb(0x32f)](this,_0x21dfc2,_0x2e3788,_0x1bd8e8,_0x111179);if(this[_0x144bbb(0x327)]())_0x51588e['text']=VisuMZ[_0x144bbb(0x256)](_0x51588e[_0x144bbb(0x64c)]);return _0x51588e;},Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x327)]=function(){const _0x3ff052=_0xebc2c6;return this[_0x3ff052(0x29d)];},Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0xa6)]=function(_0x1b2bc0){const _0xac54f9=_0xebc2c6;this[_0xac54f9(0x1db)]=_0x1b2bc0;},Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x4df)]=function(_0x316517){const _0x3d56e5=_0xebc2c6;this[_0x3d56e5(0x29d)]=_0x316517;},VisuMZ['CoreEngine'][_0xebc2c6(0x2c0)]=Window_Base['prototype'][_0xebc2c6(0x251)],Window_Base['prototype'][_0xebc2c6(0x251)]=function(_0x2833c9,_0x46e54b,_0x164b87){const _0x5764e8=_0xebc2c6;_0x46e54b=Math[_0x5764e8(0x6b6)](_0x46e54b),_0x164b87=Math[_0x5764e8(0x6b6)](_0x164b87),VisuMZ['CoreEngine'][_0x5764e8(0x2c0)][_0x5764e8(0x32f)](this,_0x2833c9,_0x46e54b,_0x164b87);},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x108)]=Window_Base['prototype']['drawFace'],Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x6fc)]=function(_0x256bbd,_0x28bd9b,_0x5047e4,_0x38553f,_0x335a62,_0x1095a3){const _0x531e6a=_0xebc2c6;_0x335a62=_0x335a62||ImageManager[_0x531e6a(0x2d9)],_0x1095a3=_0x1095a3||ImageManager['faceHeight'],_0x5047e4=Math[_0x531e6a(0x6b6)](_0x5047e4),_0x38553f=Math[_0x531e6a(0x6b6)](_0x38553f),_0x335a62=Math[_0x531e6a(0x6b6)](_0x335a62),_0x1095a3=Math[_0x531e6a(0x6b6)](_0x1095a3),VisuMZ['CoreEngine'][_0x531e6a(0x108)]['call'](this,_0x256bbd,_0x28bd9b,_0x5047e4,_0x38553f,_0x335a62,_0x1095a3);},VisuMZ[_0xebc2c6(0x71a)]['Window_Base_drawCharacter']=Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x6df)],Window_Base[_0xebc2c6(0x2c3)]['drawCharacter']=function(_0x39ea7b,_0x3ad7b1,_0x3dd01b,_0x55a49d){const _0x57f30d=_0xebc2c6;_0x3dd01b=Math[_0x57f30d(0x6b6)](_0x3dd01b),_0x55a49d=Math[_0x57f30d(0x6b6)](_0x55a49d),VisuMZ[_0x57f30d(0x71a)][_0x57f30d(0x54d)]['call'](this,_0x39ea7b,_0x3ad7b1,_0x3dd01b,_0x55a49d);},VisuMZ['CoreEngine'][_0xebc2c6(0x62a)]=Window_Selectable[_0xebc2c6(0x2c3)][_0xebc2c6(0x5c3)],Window_Selectable[_0xebc2c6(0x2c3)][_0xebc2c6(0x5c3)]=function(_0x59cd89){const _0x54b6f6=_0xebc2c6;let _0x49a31d=VisuMZ[_0x54b6f6(0x71a)]['Window_Selectable_itemRect'][_0x54b6f6(0x32f)](this,_0x59cd89);return _0x49a31d['x']=Math['round'](_0x49a31d['x']),_0x49a31d['y']=Math[_0x54b6f6(0x6b6)](_0x49a31d['y']),_0x49a31d[_0x54b6f6(0x20a)]=Math[_0x54b6f6(0x6b6)](_0x49a31d[_0x54b6f6(0x20a)]),_0x49a31d[_0x54b6f6(0x102)]=Math[_0x54b6f6(0x6b6)](_0x49a31d[_0x54b6f6(0x102)]),_0x49a31d;},VisuMZ[_0xebc2c6(0x71a)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase['prototype'][_0xebc2c6(0xde)],Window_StatusBase[_0xebc2c6(0x2c3)]['drawActorSimpleStatus']=function(_0x397826,_0x1b1e57,_0x5911af){const _0x104256=_0xebc2c6;_0x1b1e57=Math[_0x104256(0x6b6)](_0x1b1e57),_0x5911af=Math['round'](_0x5911af),VisuMZ[_0x104256(0x71a)][_0x104256(0x612)][_0x104256(0x32f)](this,_0x397826,_0x1b1e57,_0x5911af);},Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x363)]=function(){const _0x58544c=_0xebc2c6;this[_0x58544c(0x3fa)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x58544c(0x64d)],'targetBackOpacity':this[_0x58544c(0x540)],'targetContentsOpacity':this[_0x58544c(0x33b)]};},Window_Base[_0xebc2c6(0x2c3)]['updateCoreEasing']=function(){const _0x4b00fb=_0xebc2c6;if(!this['_coreEasing'])return;if(this[_0x4b00fb(0x3fa)][_0x4b00fb(0x352)]<=0x0)return;this['x']=this[_0x4b00fb(0x6b4)](this['x'],this[_0x4b00fb(0x3fa)]['targetX']),this['y']=this['applyCoreEasing'](this['y'],this[_0x4b00fb(0x3fa)][_0x4b00fb(0x597)]),this['scale']['x']=this[_0x4b00fb(0x6b4)](this[_0x4b00fb(0x4b7)]['x'],this[_0x4b00fb(0x3fa)][_0x4b00fb(0x326)]),this[_0x4b00fb(0x4b7)]['y']=this[_0x4b00fb(0x6b4)](this[_0x4b00fb(0x4b7)]['y'],this[_0x4b00fb(0x3fa)][_0x4b00fb(0x6b8)]),this[_0x4b00fb(0x64d)]=this[_0x4b00fb(0x6b4)](this[_0x4b00fb(0x64d)],this['_coreEasing'][_0x4b00fb(0x64b)]),this[_0x4b00fb(0x540)]=this['applyCoreEasing'](this[_0x4b00fb(0x540)],this[_0x4b00fb(0x3fa)][_0x4b00fb(0x69d)]),this['contentsOpacity']=this['applyCoreEasing'](this['contentsOpacity'],this[_0x4b00fb(0x3fa)]['targetContentsOpacity']),this['_coreEasing']['duration']--;},Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x6b4)]=function(_0xec5215,_0x4515c7){const _0x15e4f=_0xebc2c6;if(!this[_0x15e4f(0x3fa)])return _0x4515c7;const _0x455234=this['_coreEasing'][_0x15e4f(0x352)],_0x2afbd8=this[_0x15e4f(0x3fa)]['wholeDuration'],_0x42b27c=this['calcCoreEasing']((_0x2afbd8-_0x455234)/_0x2afbd8),_0x241550=this[_0x15e4f(0xcc)]((_0x2afbd8-_0x455234+0x1)/_0x2afbd8),_0x2a0492=(_0xec5215-_0x4515c7*_0x42b27c)/(0x1-_0x42b27c);return _0x2a0492+(_0x4515c7-_0x2a0492)*_0x241550;},Window_Base['prototype'][_0xebc2c6(0xcc)]=function(_0x3d8646){const _0x420d3b=_0xebc2c6;if(!this['_coreEasing'])return _0x3d8646;return VisuMZ[_0x420d3b(0x28c)](_0x3d8646,this['_coreEasing'][_0x420d3b(0x1f2)]||'LINEAR');},Window_Base[_0xebc2c6(0x2c3)]['anchorCoreEasing']=function(_0x5e5f17,_0x3d3d9f){const _0x45c7c9=_0xebc2c6;if(!this[_0x45c7c9(0x3fa)])return;this['x']=this[_0x45c7c9(0x3fa)][_0x45c7c9(0x712)],this['y']=this[_0x45c7c9(0x3fa)]['targetY'],this[_0x45c7c9(0x4b7)]['x']=this[_0x45c7c9(0x3fa)][_0x45c7c9(0x326)],this[_0x45c7c9(0x4b7)]['y']=this[_0x45c7c9(0x3fa)][_0x45c7c9(0x6b8)],this[_0x45c7c9(0x64d)]=this[_0x45c7c9(0x3fa)]['targetOpacity'],this[_0x45c7c9(0x540)]=this[_0x45c7c9(0x3fa)][_0x45c7c9(0x69d)],this[_0x45c7c9(0x33b)]=this[_0x45c7c9(0x3fa)][_0x45c7c9(0x547)],this[_0x45c7c9(0x5d1)](_0x5e5f17,_0x3d3d9f,this['x'],this['y'],this[_0x45c7c9(0x4b7)]['x'],this[_0x45c7c9(0x4b7)]['y'],this[_0x45c7c9(0x64d)],this['backOpacity'],this[_0x45c7c9(0x33b)]);},Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x5d1)]=function(_0x2ae566,_0x54ac89,_0x5248ec,_0x2f72e4,_0x3179c1,_0x1d96e1,_0x132fb6,_0x3937ca,_0x234a8d){this['_coreEasing']={'duration':_0x2ae566,'wholeDuration':_0x2ae566,'type':_0x54ac89,'targetX':_0x5248ec,'targetY':_0x2f72e4,'targetScaleX':_0x3179c1,'targetScaleY':_0x1d96e1,'targetOpacity':_0x132fb6,'targetBackOpacity':_0x3937ca,'targetContentsOpacity':_0x234a8d};},Window_Base['prototype']['drawCurrencyValue']=function(_0x1560fb,_0x48f203,_0x4add9a,_0x23d36d,_0x5f43cc){const _0x4c4945=_0xebc2c6;this[_0x4c4945(0x11f)](),this[_0x4c4945(0x44e)][_0x4c4945(0x213)]=VisuMZ['CoreEngine'][_0x4c4945(0x74)][_0x4c4945(0x570)][_0x4c4945(0x3be)];const _0x4f6d7b=VisuMZ[_0x4c4945(0x71a)][_0x4c4945(0x74)][_0x4c4945(0x570)][_0x4c4945(0x2d2)];if(_0x4f6d7b>0x0&&_0x48f203===TextManager['currencyUnit']){const _0x2e5144=_0x23d36d+(this[_0x4c4945(0x468)]()-ImageManager['iconHeight'])/0x2;this[_0x4c4945(0x251)](_0x4f6d7b,_0x4add9a+(_0x5f43cc-ImageManager[_0x4c4945(0x6fa)]),_0x2e5144),_0x5f43cc-=ImageManager['iconWidth']+0x4;}else this[_0x4c4945(0x48b)](ColorManager['systemColor']()),this[_0x4c4945(0x109)](_0x48f203,_0x4add9a,_0x23d36d,_0x5f43cc,_0x4c4945(0x63b)),_0x5f43cc-=this['textWidth'](_0x48f203)+0x6;this[_0x4c4945(0x60b)]();const _0x1f4614=this[_0x4c4945(0x5e1)](this[_0x4c4945(0x1db)]?VisuMZ[_0x4c4945(0x256)](_0x1560fb):_0x1560fb);_0x1f4614>_0x5f43cc?this[_0x4c4945(0x109)](VisuMZ[_0x4c4945(0x71a)]['Settings'][_0x4c4945(0x570)][_0x4c4945(0x6e1)],_0x4add9a,_0x23d36d,_0x5f43cc,_0x4c4945(0x63b)):this[_0x4c4945(0x109)](_0x1560fb,_0x4add9a,_0x23d36d,_0x5f43cc,_0x4c4945(0x63b)),this[_0x4c4945(0x11f)]();},Window_Base[_0xebc2c6(0x2c3)]['drawIconBySize']=function(_0x141b9e,_0x196769,_0x17d2b9,_0x2fefe5,_0x34a405){const _0x1c99ab=_0xebc2c6,_0x27a94b=ImageManager[_0x1c99ab(0x572)](_0x1c99ab(0x1fe)),_0x27e6e6=ImageManager['iconWidth'],_0x1f8ac9=ImageManager[_0x1c99ab(0x1a8)],_0x584dc5=_0x141b9e%0x10*_0x27e6e6,_0x2402c2=Math[_0x1c99ab(0x125)](_0x141b9e/0x10)*_0x1f8ac9,_0x4f8991=_0x2fefe5,_0x321d63=_0x2fefe5;this['contents'][_0x1c99ab(0x162)]['imageSmoothingEnabled']=_0x34a405,this[_0x1c99ab(0x44e)]['blt'](_0x27a94b,_0x584dc5,_0x2402c2,_0x27e6e6,_0x1f8ac9,_0x196769,_0x17d2b9,_0x4f8991,_0x321d63),this[_0x1c99ab(0x44e)][_0x1c99ab(0x162)][_0x1c99ab(0x225)]=!![];},Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x34d)]=function(_0x16b61c,_0x2499ed,_0x12a26c,_0x33e1a8,_0xabe3ee,_0x5aa110){const _0x30ac2d=_0xebc2c6,_0x281f18=Math[_0x30ac2d(0x125)]((_0x12a26c-0x2)*_0x33e1a8),_0x2389d1=Sprite_Gauge[_0x30ac2d(0x2c3)]['gaugeHeight'][_0x30ac2d(0x32f)](this),_0x2516c5=_0x2499ed+this[_0x30ac2d(0x468)]()-_0x2389d1-0x2;this[_0x30ac2d(0x44e)][_0x30ac2d(0x11e)](_0x16b61c,_0x2516c5,_0x12a26c,_0x2389d1,ColorManager['gaugeBackColor']()),this[_0x30ac2d(0x44e)][_0x30ac2d(0x10c)](_0x16b61c+0x1,_0x2516c5+0x1,_0x281f18,_0x2389d1-0x2,_0xabe3ee,_0x5aa110);},Window_Selectable['prototype'][_0xebc2c6(0x351)]=function(_0x502b1a){const _0x435b63=_0xebc2c6;let _0x2ac459=this['index']();const _0x11b48a=this[_0x435b63(0x639)](),_0x427da8=this['maxCols']();if(this['isUseModernControls']()&&(_0x2ac459<_0x11b48a||_0x502b1a&&_0x427da8===0x1)){_0x2ac459+=_0x427da8;if(_0x2ac459>=_0x11b48a)_0x2ac459=_0x11b48a-0x1;this['smoothSelect'](_0x2ac459);}else!this[_0x435b63(0x5e7)]()&&((_0x2ac459<_0x11b48a-_0x427da8||_0x502b1a&&_0x427da8===0x1)&&this[_0x435b63(0x434)]((_0x2ac459+_0x427da8)%_0x11b48a));},VisuMZ[_0xebc2c6(0x71a)]['Window_Selectable_cursorDown']=Window_Selectable[_0xebc2c6(0x2c3)][_0xebc2c6(0x351)],Window_Selectable['prototype'][_0xebc2c6(0x351)]=function(_0x200956){const _0x862806=_0xebc2c6;this['isUseModernControls']()&&_0x200956&&this['maxCols']()===0x1&&this[_0x862806(0x2b4)]()===this[_0x862806(0x639)]()-0x1?this[_0x862806(0x434)](0x0):VisuMZ['CoreEngine'][_0x862806(0x23b)][_0x862806(0x32f)](this,_0x200956);},Window_Selectable['prototype'][_0xebc2c6(0x3e7)]=function(_0x2ec0b2){const _0x46b6fa=_0xebc2c6;let _0x515936=Math[_0x46b6fa(0x631)](0x0,this[_0x46b6fa(0x2b4)]());const _0xb8e55=this[_0x46b6fa(0x639)](),_0x4a85b9=this['maxCols']();if(this[_0x46b6fa(0x5e7)]()&&_0x515936>0x0||_0x2ec0b2&&_0x4a85b9===0x1){_0x515936-=_0x4a85b9;if(_0x515936<=0x0)_0x515936=0x0;this[_0x46b6fa(0x434)](_0x515936);}else!this[_0x46b6fa(0x5e7)]()&&((_0x515936>=_0x4a85b9||_0x2ec0b2&&_0x4a85b9===0x1)&&this['smoothSelect']((_0x515936-_0x4a85b9+_0xb8e55)%_0xb8e55));},VisuMZ['CoreEngine'][_0xebc2c6(0x189)]=Window_Selectable[_0xebc2c6(0x2c3)]['cursorUp'],Window_Selectable[_0xebc2c6(0x2c3)][_0xebc2c6(0x3e7)]=function(_0x19992c){const _0x3abc29=_0xebc2c6;this[_0x3abc29(0x5e7)]()&&_0x19992c&&this[_0x3abc29(0x1d0)]()===0x1&&this[_0x3abc29(0x2b4)]()===0x0?this[_0x3abc29(0x434)](this[_0x3abc29(0x639)]()-0x1):VisuMZ[_0x3abc29(0x71a)][_0x3abc29(0x189)][_0x3abc29(0x32f)](this,_0x19992c);},Window_Selectable[_0xebc2c6(0x2c3)][_0xebc2c6(0x5e7)]=function(){const _0xd87b43=_0xebc2c6;return VisuMZ[_0xd87b43(0x71a)][_0xd87b43(0x74)][_0xd87b43(0x4b2)][_0xd87b43(0x14d)];},VisuMZ['CoreEngine'][_0xebc2c6(0x663)]=Window_Selectable['prototype']['processCursorMove'],Window_Selectable[_0xebc2c6(0x2c3)][_0xebc2c6(0x750)]=function(){const _0x293728=_0xebc2c6;this['isUseModernControls']()?(this[_0x293728(0x3f4)](),this[_0x293728(0x65b)]()):VisuMZ[_0x293728(0x71a)]['Window_Selectable_processCursorMove'][_0x293728(0x32f)](this);},Window_Selectable['prototype']['allowShiftScrolling']=function(){return!![];},Window_Selectable[_0xebc2c6(0x2c3)][_0xebc2c6(0x3f4)]=function(){const _0x11f0bc=_0xebc2c6;if(this['isCursorMovable']()){const _0x5dad46=this[_0x11f0bc(0x2b4)]();Input[_0x11f0bc(0x5a1)](_0x11f0bc(0xc4))&&(Input[_0x11f0bc(0x56b)](_0x11f0bc(0x2d0))&&this[_0x11f0bc(0x45b)]()?this[_0x11f0bc(0x2ca)]():this[_0x11f0bc(0x351)](Input[_0x11f0bc(0x1d3)](_0x11f0bc(0xc4)))),Input['isRepeated']('up')&&(Input[_0x11f0bc(0x56b)](_0x11f0bc(0x2d0))&&this[_0x11f0bc(0x45b)]()?this['cursorPageup']():this[_0x11f0bc(0x3e7)](Input['isTriggered']('up'))),Input[_0x11f0bc(0x5a1)]('right')&&this[_0x11f0bc(0x625)](Input[_0x11f0bc(0x1d3)](_0x11f0bc(0x63b))),Input[_0x11f0bc(0x5a1)](_0x11f0bc(0x4b0))&&this[_0x11f0bc(0x107)](Input[_0x11f0bc(0x1d3)](_0x11f0bc(0x4b0))),!this[_0x11f0bc(0x223)](_0x11f0bc(0x70))&&Input['isRepeated'](_0x11f0bc(0x70))&&this['cursorPagedown'](),!this[_0x11f0bc(0x223)](_0x11f0bc(0x26b))&&Input['isRepeated'](_0x11f0bc(0x26b))&&this[_0x11f0bc(0x2cb)](),this[_0x11f0bc(0x2b4)]()!==_0x5dad46&&this[_0x11f0bc(0x180)]();}},Window_Selectable[_0xebc2c6(0x2c3)][_0xebc2c6(0x65b)]=function(){const _0x1d1a12=_0xebc2c6;if(this[_0x1d1a12(0x20c)]()){const _0x9da54e=this[_0x1d1a12(0x2b4)]();Input[_0x1d1a12(0x1d3)](_0x1d1a12(0x59b))&&this['smoothSelect'](Math[_0x1d1a12(0x134)](this['index'](),0x0)),Input[_0x1d1a12(0x1d3)](_0x1d1a12(0x33e))&&this[_0x1d1a12(0x434)](Math['max'](this[_0x1d1a12(0x2b4)](),this[_0x1d1a12(0x639)]()-0x1)),this['index']()!==_0x9da54e&&this[_0x1d1a12(0x180)]();}},VisuMZ['CoreEngine'][_0xebc2c6(0x182)]=Window_Selectable[_0xebc2c6(0x2c3)][_0xebc2c6(0x301)],Window_Selectable[_0xebc2c6(0x2c3)][_0xebc2c6(0x301)]=function(){const _0x4c1a1d=_0xebc2c6;this[_0x4c1a1d(0x5e7)]()?this['processTouchModernControls']():VisuMZ['CoreEngine'][_0x4c1a1d(0x182)]['call'](this);},Window_Selectable[_0xebc2c6(0x2c3)]['processTouchModernControls']=function(){const _0x13f078=_0xebc2c6;VisuMZ[_0x13f078(0x71a)][_0x13f078(0x182)][_0x13f078(0x32f)](this);},Window_Selectable[_0xebc2c6(0x2c3)]['colSpacing']=function(){const _0x111639=_0xebc2c6;return VisuMZ['CoreEngine'][_0x111639(0x74)][_0x111639(0x1f9)][_0x111639(0x214)];},Window_Selectable[_0xebc2c6(0x2c3)][_0xebc2c6(0x440)]=function(){const _0x335782=_0xebc2c6;return VisuMZ[_0x335782(0x71a)][_0x335782(0x74)][_0x335782(0x1f9)][_0x335782(0x5eb)];},Window_Selectable['prototype'][_0xebc2c6(0x2eb)]=function(){const _0x5d5902=_0xebc2c6;return Window_Scrollable[_0x5d5902(0x2c3)][_0x5d5902(0x2eb)][_0x5d5902(0x32f)](this)+VisuMZ['CoreEngine'][_0x5d5902(0x74)][_0x5d5902(0x1f9)][_0x5d5902(0xe0)];;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x22b)]=Window_Selectable[_0xebc2c6(0x2c3)][_0xebc2c6(0x519)],Window_Selectable['prototype'][_0xebc2c6(0x519)]=function(_0x2f427d){const _0x43ba4d=_0xebc2c6,_0x4f9043=VisuMZ[_0x43ba4d(0x71a)][_0x43ba4d(0x74)][_0x43ba4d(0x1f9)];if(_0x4f9043[_0x43ba4d(0x193)]===![])return;_0x4f9043[_0x43ba4d(0x56c)]?_0x4f9043[_0x43ba4d(0x56c)][_0x43ba4d(0x32f)](this,_0x2f427d):VisuMZ['CoreEngine'][_0x43ba4d(0x22b)][_0x43ba4d(0x32f)](this,_0x2f427d);},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x7e)]=Window_Gold[_0xebc2c6(0x2c3)]['refresh'],Window_Gold[_0xebc2c6(0x2c3)][_0xebc2c6(0x4d3)]=function(){const _0xf77e71=_0xebc2c6;this['isItemStyle']()?this[_0xf77e71(0x562)]():VisuMZ['CoreEngine'][_0xf77e71(0x7e)][_0xf77e71(0x32f)](this);},Window_Gold[_0xebc2c6(0x2c3)][_0xebc2c6(0x46a)]=function(){const _0x47ddf3=_0xebc2c6;if(TextManager[_0x47ddf3(0x5cd)]!==this[_0x47ddf3(0x5cd)]())return![];return VisuMZ[_0x47ddf3(0x71a)][_0x47ddf3(0x74)][_0x47ddf3(0x570)]['ItemStyle'];},Window_Gold[_0xebc2c6(0x2c3)][_0xebc2c6(0x562)]=function(){const _0x3d207c=_0xebc2c6;this[_0x3d207c(0x11f)](),this[_0x3d207c(0x44e)][_0x3d207c(0x6c0)](),this[_0x3d207c(0x44e)]['fontSize']=VisuMZ[_0x3d207c(0x71a)]['Settings'][_0x3d207c(0x570)][_0x3d207c(0x3be)];const _0x5030b4=VisuMZ[_0x3d207c(0x71a)][_0x3d207c(0x74)][_0x3d207c(0x570)][_0x3d207c(0x2d2)],_0x56c5d9=this[_0x3d207c(0x96)](0x0);if(_0x5030b4>0x0){const _0x42697c=_0x56c5d9['y']+(this[_0x3d207c(0x468)]()-ImageManager[_0x3d207c(0x1a8)])/0x2;this[_0x3d207c(0x251)](_0x5030b4,_0x56c5d9['x'],_0x42697c);const _0x20771b=ImageManager[_0x3d207c(0x6fa)]+0x4;_0x56c5d9['x']+=_0x20771b,_0x56c5d9[_0x3d207c(0x20a)]-=_0x20771b;}this[_0x3d207c(0x48b)](ColorManager[_0x3d207c(0x659)]()),this[_0x3d207c(0x109)](this['currencyUnit'](),_0x56c5d9['x'],_0x56c5d9['y'],_0x56c5d9['width'],_0x3d207c(0x4b0));const _0x4ab781=this[_0x3d207c(0x5e1)](this[_0x3d207c(0x5cd)]())+0x6;;_0x56c5d9['x']+=_0x4ab781,_0x56c5d9[_0x3d207c(0x20a)]-=_0x4ab781,this[_0x3d207c(0x60b)]();const _0x5d16de=this[_0x3d207c(0x308)](),_0x19be21=this[_0x3d207c(0x5e1)](this['_digitGrouping']?VisuMZ[_0x3d207c(0x256)](this[_0x3d207c(0x308)]()):this['value']());_0x19be21>_0x56c5d9['width']?this[_0x3d207c(0x109)](VisuMZ[_0x3d207c(0x71a)][_0x3d207c(0x74)][_0x3d207c(0x570)]['GoldOverlap'],_0x56c5d9['x'],_0x56c5d9['y'],_0x56c5d9['width'],_0x3d207c(0x63b)):this['drawText'](this[_0x3d207c(0x308)](),_0x56c5d9['x'],_0x56c5d9['y'],_0x56c5d9[_0x3d207c(0x20a)],_0x3d207c(0x63b)),this[_0x3d207c(0x11f)]();},Window_StatusBase[_0xebc2c6(0x2c3)]['drawParamText']=function(_0x35efef,_0x46d7fe,_0x449da8,_0x35e56a,_0x3510da){const _0x49ce91=_0xebc2c6;_0x35e56a=String(_0x35e56a||'')[_0x49ce91(0x70a)]();if(VisuMZ[_0x49ce91(0x71a)]['Settings'][_0x49ce91(0x4c8)][_0x49ce91(0x40d)]){const _0x1af195=VisuMZ[_0x49ce91(0x655)](_0x35e56a);_0x3510da?(this[_0x49ce91(0x53f)](_0x1af195,_0x35efef,_0x46d7fe,this[_0x49ce91(0x677)]()),_0x449da8-=this[_0x49ce91(0x677)]()+0x2,_0x35efef+=this[_0x49ce91(0x677)]()+0x2):(this['drawIcon'](_0x1af195,_0x35efef+0x2,_0x46d7fe+0x2),_0x449da8-=ImageManager[_0x49ce91(0x6fa)]+0x4,_0x35efef+=ImageManager[_0x49ce91(0x6fa)]+0x4);}const _0x111bd4=TextManager['param'](_0x35e56a);this[_0x49ce91(0x11f)](),this[_0x49ce91(0x48b)](ColorManager[_0x49ce91(0x659)]()),_0x3510da?(this['contents']['fontSize']=this[_0x49ce91(0x292)](),this[_0x49ce91(0x44e)][_0x49ce91(0x109)](_0x111bd4,_0x35efef,_0x46d7fe,_0x449da8,this[_0x49ce91(0x677)](),_0x49ce91(0x4b0))):this[_0x49ce91(0x109)](_0x111bd4,_0x35efef,_0x46d7fe,_0x449da8),this[_0x49ce91(0x11f)]();},Window_StatusBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x292)]=function(){const _0x24ecea=_0xebc2c6;return $gameSystem[_0x24ecea(0x478)]()-0x8;},Window_StatusBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x2e4)]=function(_0x44e0a9,_0x45a446,_0x550ad2,_0x5a9baf){const _0x55d261=_0xebc2c6;_0x5a9baf=_0x5a9baf||0xa8,this[_0x55d261(0x60b)]();if(VisuMZ[_0x55d261(0x71a)]['Settings']['UI']['TextCodeClassNames'])this[_0x55d261(0x369)](_0x44e0a9[_0x55d261(0x491)]()[_0x55d261(0x4d0)],_0x45a446,_0x550ad2,_0x5a9baf);else{const _0x13a293=_0x44e0a9[_0x55d261(0x491)]()[_0x55d261(0x4d0)]['replace'](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x13a293,_0x45a446,_0x550ad2,_0x5a9baf);}},Window_StatusBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x503)]=function(_0x375323,_0x12faf8,_0x390cd3,_0x3b2023){const _0x3d5ba2=_0xebc2c6;_0x3b2023=_0x3b2023||0x10e,this[_0x3d5ba2(0x60b)]();if(VisuMZ[_0x3d5ba2(0x71a)]['Settings']['UI'][_0x3d5ba2(0x6c7)])this['drawTextEx'](_0x375323[_0x3d5ba2(0x37f)](),_0x12faf8,_0x390cd3,_0x3b2023);else{const _0x44c6eb=_0x375323[_0x3d5ba2(0x37f)]()[_0x3d5ba2(0x613)](/\\I\[(\d+)\]/gi,'');this[_0x3d5ba2(0x109)](_0x375323['nickname'](),_0x12faf8,_0x390cd3,_0x3b2023);}},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x172)]=Window_StatusBase[_0xebc2c6(0x2c3)]['drawActorLevel'],Window_StatusBase[_0xebc2c6(0x2c3)]['drawActorLevel']=function(_0x2369e9,_0x1c99d6,_0x8717ee){const _0x5eeedf=_0xebc2c6;if(this['isExpGaugeDrawn']())this[_0x5eeedf(0x236)](_0x2369e9,_0x1c99d6,_0x8717ee);VisuMZ[_0x5eeedf(0x71a)][_0x5eeedf(0x172)][_0x5eeedf(0x32f)](this,_0x2369e9,_0x1c99d6,_0x8717ee);},Window_StatusBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x362)]=function(){const _0x5cb3d3=_0xebc2c6;return VisuMZ[_0x5cb3d3(0x71a)]['Settings']['UI']['LvExpGauge'];},Window_StatusBase[_0xebc2c6(0x2c3)][_0xebc2c6(0x236)]=function(_0x59d2b9,_0x2bfa02,_0x3eb9c1){const _0x23a1ea=_0xebc2c6;if(!_0x59d2b9)return;if(!_0x59d2b9[_0x23a1ea(0x409)]())return;const _0x19ce7f=0x80,_0x3703a1=_0x59d2b9[_0x23a1ea(0x4de)]();let _0xdc3f46=ColorManager[_0x23a1ea(0x66f)](),_0x1f2195=ColorManager[_0x23a1ea(0x442)]();_0x3703a1>=0x1&&(_0xdc3f46=ColorManager[_0x23a1ea(0x682)](),_0x1f2195=ColorManager[_0x23a1ea(0x716)]()),this[_0x23a1ea(0x34d)](_0x2bfa02,_0x3eb9c1,_0x19ce7f,_0x3703a1,_0xdc3f46,_0x1f2195);},Window_EquipStatus[_0xebc2c6(0x2c3)]['drawAllParams']=function(){const _0x1ff8db=_0xebc2c6;let _0x254fb6=0x0;for(const _0x3ced61 of VisuMZ[_0x1ff8db(0x71a)][_0x1ff8db(0x74)][_0x1ff8db(0x4c8)][_0x1ff8db(0x5de)]){const _0x162591=this['itemPadding'](),_0x514522=this[_0x1ff8db(0x3ee)](_0x254fb6);this[_0x1ff8db(0x175)](_0x162591,_0x514522,_0x3ced61),_0x254fb6++;}},Window_EquipStatus[_0xebc2c6(0x2c3)]['drawParamName']=function(_0x38870d,_0x5a88ce,_0x21ba98){const _0x204144=_0xebc2c6,_0x5a0097=this[_0x204144(0x647)]()-this['itemPadding']()*0x2;this[_0x204144(0x8e)](_0x38870d,_0x5a88ce,_0x5a0097,_0x21ba98,![]);},Window_EquipStatus[_0xebc2c6(0x2c3)][_0xebc2c6(0x4f3)]=function(_0x379faf,_0x53cd5a,_0x5eb1ce){const _0x38eb2b=_0xebc2c6,_0x32338b=this['paramWidth']();this[_0x38eb2b(0x60b)](),this[_0x38eb2b(0x109)](this[_0x38eb2b(0xd3)][_0x38eb2b(0x476)](_0x5eb1ce,!![]),_0x379faf,_0x53cd5a,_0x32338b,'right');},Window_EquipStatus['prototype'][_0xebc2c6(0x1fc)]=function(_0x488cc3,_0x43eedf){const _0x3dc93b=_0xebc2c6,_0x4c945f=this[_0x3dc93b(0x116)]();this['changeTextColor'](ColorManager['systemColor']());const _0x273acb=VisuMZ[_0x3dc93b(0x71a)][_0x3dc93b(0x74)]['UI'][_0x3dc93b(0x174)];this[_0x3dc93b(0x109)](_0x273acb,_0x488cc3,_0x43eedf,_0x4c945f,_0x3dc93b(0x4fe));},Window_EquipStatus[_0xebc2c6(0x2c3)]['drawNewParam']=function(_0x405989,_0x4acb43,_0x22e699){const _0x2b929c=_0xebc2c6,_0x1807ca=this[_0x2b929c(0x735)](),_0x48ed2e=this['_tempActor'][_0x2b929c(0x476)](_0x22e699),_0x212e2b=_0x48ed2e-this[_0x2b929c(0xd3)][_0x2b929c(0x476)](_0x22e699);this[_0x2b929c(0x48b)](ColorManager[_0x2b929c(0x6f7)](_0x212e2b)),this['drawText'](this['_tempActor'][_0x2b929c(0x476)](_0x22e699,!![]),_0x405989,_0x4acb43,_0x1807ca,_0x2b929c(0x63b));},VisuMZ['CoreEngine'][_0xebc2c6(0x3b0)]=Window_EquipItem[_0xebc2c6(0x2c3)][_0xebc2c6(0x294)],Window_EquipItem['prototype'][_0xebc2c6(0x294)]=function(_0x24514f){const _0x18de67=_0xebc2c6;return _0x24514f&&this[_0x18de67(0xd3)]?this['_actor'][_0x18de67(0x5c6)](_0x24514f):VisuMZ['CoreEngine']['Window_EquipItem_isEnabled'][_0x18de67(0x32f)](this,_0x24514f);},Window_StatusParams[_0xebc2c6(0x2c3)][_0xebc2c6(0x639)]=function(){const _0x7d4726=_0xebc2c6;return VisuMZ[_0x7d4726(0x71a)][_0x7d4726(0x74)][_0x7d4726(0x4c8)][_0x7d4726(0x5de)][_0x7d4726(0x749)];},Window_StatusParams[_0xebc2c6(0x2c3)][_0xebc2c6(0x175)]=function(_0x51bbe9){const _0x21866c=_0xebc2c6,_0x55e8e1=this[_0x21866c(0x96)](_0x51bbe9),_0x4574bb=VisuMZ[_0x21866c(0x71a)][_0x21866c(0x74)][_0x21866c(0x4c8)][_0x21866c(0x5de)][_0x51bbe9],_0x58a342=TextManager[_0x21866c(0x3e8)](_0x4574bb),_0x3060c0=this[_0x21866c(0xd3)][_0x21866c(0x476)](_0x4574bb,!![]);this[_0x21866c(0x8e)](_0x55e8e1['x'],_0x55e8e1['y'],0xa0,_0x4574bb,![]),this[_0x21866c(0x60b)](),this[_0x21866c(0x109)](_0x3060c0,_0x55e8e1['x']+0xa0,_0x55e8e1['y'],0x3c,_0x21866c(0x63b));};if(VisuMZ['CoreEngine'][_0xebc2c6(0x74)][_0xebc2c6(0x464)][_0xebc2c6(0x68c)]){VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)][_0xebc2c6(0x464)][_0xebc2c6(0x1e5)]&&(Window_NameInput[_0xebc2c6(0x277)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0xebc2c6(0x4b9),'OK']);;VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x5f5)]=Window_NameInput[_0xebc2c6(0x2c3)]['initialize'],Window_NameInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x1dd)]=function(_0x4b57f8){const _0x5e8de2=_0xebc2c6;this[_0x5e8de2(0x65d)]=this['defaultInputMode'](),VisuMZ[_0x5e8de2(0x71a)]['Window_NameInput_initialize']['call'](this,_0x4b57f8),this[_0x5e8de2(0x65d)]===_0x5e8de2(0x3cf)?this[_0x5e8de2(0x5e3)](0x0):(Input[_0x5e8de2(0x6c0)](),this[_0x5e8de2(0x5a7)]());},Window_NameInput[_0xebc2c6(0x2c3)]['defaultInputMode']=function(){const _0x42e5a8=_0xebc2c6;if(Input[_0x42e5a8(0x1ea)]())return _0x42e5a8(0x3cf);return VisuMZ[_0x42e5a8(0x71a)]['Settings'][_0x42e5a8(0x464)][_0x42e5a8(0x4c7)]||'keyboard';},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x88)]=Window_NameInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x67b)],Window_NameInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x67b)]=function(){const _0xd31aba=_0xebc2c6;if(!this[_0xd31aba(0x6eb)]())return;if(!this[_0xd31aba(0x2f2)])return;if(this[_0xd31aba(0x65d)]===_0xd31aba(0x315)&&Input[_0xd31aba(0x6af)]())this['switchModes'](_0xd31aba(0x3cf));else{if(Input[_0xd31aba(0x707)](_0xd31aba(0x518)))Input[_0xd31aba(0x6c0)](),this[_0xd31aba(0x1a6)]();else{if(Input['isTriggered'](_0xd31aba(0x5b7)))Input[_0xd31aba(0x6c0)](),this[_0xd31aba(0x65d)]===_0xd31aba(0x315)?this[_0xd31aba(0x34a)](_0xd31aba(0x3cf)):this[_0xd31aba(0x34a)](_0xd31aba(0x315));else{if(this[_0xd31aba(0x65d)]===_0xd31aba(0x315))this[_0xd31aba(0x1bc)]();else Input['isSpecialCode']('escape')?(Input[_0xd31aba(0x6c0)](),this[_0xd31aba(0x34a)](_0xd31aba(0x315))):VisuMZ[_0xd31aba(0x71a)]['Window_NameInput_processHandling'][_0xd31aba(0x32f)](this);}}}},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x3ef)]=Window_NameInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x301)],Window_NameInput[_0xebc2c6(0x2c3)]['processTouch']=function(){const _0x4851a9=_0xebc2c6;if(!this['isOpenAndActive']())return;if(this[_0x4851a9(0x65d)]===_0x4851a9(0x315)){if(TouchInput[_0x4851a9(0x1d3)]()&&this['isTouchedInsideFrame']())this[_0x4851a9(0x34a)](_0x4851a9(0x3cf));else TouchInput[_0x4851a9(0x74f)]()&&this[_0x4851a9(0x34a)]('default');}else VisuMZ[_0x4851a9(0x71a)]['Window_NameInput_processTouch'][_0x4851a9(0x32f)](this);},Window_NameInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x1bc)]=function(){const _0x4c06f9=_0xebc2c6;if(Input[_0x4c06f9(0x707)](_0x4c06f9(0x6ba)))Input['clear'](),this[_0x4c06f9(0x732)]();else{if(Input[_0x4c06f9(0x203)]!==undefined){let _0x498b3d=Input[_0x4c06f9(0x203)],_0x2cfb3a=_0x498b3d['length'];for(let _0x426625=0x0;_0x426625<_0x2cfb3a;++_0x426625){this[_0x4c06f9(0x1b5)][_0x4c06f9(0x69a)](_0x498b3d[_0x426625])?SoundManager[_0x4c06f9(0x5c8)]():SoundManager['playBuzzer']();}Input[_0x4c06f9(0x6c0)]();}}},Window_NameInput[_0xebc2c6(0x2c3)]['switchModes']=function(_0x539a7e){const _0x1e3789=_0xebc2c6;let _0x1561c7=this[_0x1e3789(0x65d)];this['_mode']=_0x539a7e,_0x1561c7!==this[_0x1e3789(0x65d)]&&(this[_0x1e3789(0x4d3)](),SoundManager[_0x1e3789(0x5c8)](),this[_0x1e3789(0x65d)]==='default'?this['select'](0x0):this[_0x1e3789(0x5e3)](-0x1));},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x3b8)]=Window_NameInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x351)],Window_NameInput[_0xebc2c6(0x2c3)]['cursorDown']=function(_0x3ecc33){const _0x27db7b=_0xebc2c6;if(this[_0x27db7b(0x65d)]==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0x27db7b(0x67c)]())return;VisuMZ[_0x27db7b(0x71a)][_0x27db7b(0x3b8)][_0x27db7b(0x32f)](this,_0x3ecc33),this[_0x27db7b(0x34a)]('default');},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x2be)]=Window_NameInput[_0xebc2c6(0x2c3)]['cursorUp'],Window_NameInput['prototype'][_0xebc2c6(0x3e7)]=function(_0xe0c545){const _0x12d45d=_0xebc2c6;if(this[_0x12d45d(0x65d)]==='keyboard'&&!Input[_0x12d45d(0x2fc)]())return;if(Input[_0x12d45d(0x67c)]())return;VisuMZ[_0x12d45d(0x71a)][_0x12d45d(0x2be)][_0x12d45d(0x32f)](this,_0xe0c545),this['switchModes']('default');},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x24f)]=Window_NameInput['prototype'][_0xebc2c6(0x625)],Window_NameInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x625)]=function(_0xe2ef44){const _0x4df998=_0xebc2c6;if(this['_mode']===_0x4df998(0x315)&&!Input['isArrowPressed']())return;if(Input[_0x4df998(0x67c)]())return;VisuMZ[_0x4df998(0x71a)][_0x4df998(0x24f)][_0x4df998(0x32f)](this,_0xe2ef44),this[_0x4df998(0x34a)](_0x4df998(0x3cf));},VisuMZ[_0xebc2c6(0x71a)]['Window_NameInput_cursorLeft']=Window_NameInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x107)],Window_NameInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x107)]=function(_0x3984b4){const _0x21376a=_0xebc2c6;if(this['_mode']===_0x21376a(0x315)&&!Input[_0x21376a(0x2fc)]())return;if(Input[_0x21376a(0x67c)]())return;VisuMZ[_0x21376a(0x71a)][_0x21376a(0x367)][_0x21376a(0x32f)](this,_0x3984b4),this[_0x21376a(0x34a)](_0x21376a(0x3cf));},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x1bb)]=Window_NameInput['prototype']['cursorPagedown'],Window_NameInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x2ca)]=function(){const _0xb8a7eb=_0xebc2c6;if(this['_mode']===_0xb8a7eb(0x315))return;if(Input[_0xb8a7eb(0x67c)]())return;VisuMZ[_0xb8a7eb(0x71a)][_0xb8a7eb(0x1bb)]['call'](this),this[_0xb8a7eb(0x34a)]('default');},VisuMZ[_0xebc2c6(0x71a)]['Window_NameInput_cursorPageup']=Window_NameInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x2cb)],Window_NameInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x2cb)]=function(){const _0x28bad4=_0xebc2c6;if(this[_0x28bad4(0x65d)]===_0x28bad4(0x315))return;if(Input[_0x28bad4(0x67c)]())return;VisuMZ[_0x28bad4(0x71a)][_0x28bad4(0x53e)]['call'](this),this[_0x28bad4(0x34a)](_0x28bad4(0x3cf));},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x57f)]=Window_NameInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x4d3)],Window_NameInput[_0xebc2c6(0x2c3)]['refresh']=function(){const _0x3e0060=_0xebc2c6;if(this[_0x3e0060(0x65d)]==='keyboard'){this['contents'][_0x3e0060(0x6c0)](),this[_0x3e0060(0x743)][_0x3e0060(0x6c0)](),this[_0x3e0060(0x60b)]();let _0x323318=VisuMZ['CoreEngine'][_0x3e0060(0x74)]['KeyboardInput'][_0x3e0060(0x4ab)][_0x3e0060(0x500)]('\x0a'),_0x366c9b=_0x323318['length'],_0x200d6c=(this[_0x3e0060(0x170)]-_0x366c9b*this[_0x3e0060(0x468)]())/0x2;for(let _0x4f6eb6=0x0;_0x4f6eb6<_0x366c9b;++_0x4f6eb6){let _0x3441eb=_0x323318[_0x4f6eb6],_0x1c389f=this[_0x3e0060(0x50e)](_0x3441eb)[_0x3e0060(0x20a)],_0x11b038=Math[_0x3e0060(0x125)]((this[_0x3e0060(0x44e)][_0x3e0060(0x20a)]-_0x1c389f)/0x2);this[_0x3e0060(0x369)](_0x3441eb,_0x11b038,_0x200d6c),_0x200d6c+=this[_0x3e0060(0x468)]();}}else VisuMZ['CoreEngine'][_0x3e0060(0x57f)]['call'](this);};};VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x16a)]=Window_ShopSell[_0xebc2c6(0x2c3)][_0xebc2c6(0x294)],Window_ShopSell[_0xebc2c6(0x2c3)]['isEnabled']=function(_0x25ac25){const _0x245501=_0xebc2c6;return VisuMZ[_0x245501(0x71a)]['Settings']['QoL'][_0x245501(0x526)]&&DataManager['isKeyItem'](_0x25ac25)?![]:VisuMZ[_0x245501(0x71a)]['Window_ShopSell_isEnabled'][_0x245501(0x32f)](this,_0x25ac25);},Window_NumberInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x5e7)]=function(){return![];};VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)]['KeyboardInput']['EnableNumberInput']&&(VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x83)]=Window_NumberInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x1c0)],Window_NumberInput[_0xebc2c6(0x2c3)]['start']=function(){const _0x25a470=_0xebc2c6;VisuMZ['CoreEngine'][_0x25a470(0x83)]['call'](this),this[_0x25a470(0x5e3)](this[_0x25a470(0x56d)]-0x1),Input[_0x25a470(0x6c0)]();},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x30f)]=Window_NumberInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x550)],Window_NumberInput[_0xebc2c6(0x2c3)]['processDigitChange']=function(){const _0x8b122=_0xebc2c6;if(!this['isOpenAndActive']())return;if(Input[_0x8b122(0x67c)]())this[_0x8b122(0x3b6)]();else{if(Input[_0x8b122(0x707)](_0x8b122(0x518)))this[_0x8b122(0x4e8)]();else{if(Input['_inputSpecialKeyCode']===0x2e)this[_0x8b122(0x19b)]();else{if(Input[_0x8b122(0x422)]===0x24)this[_0x8b122(0x31f)]();else Input[_0x8b122(0x422)]===0x23?this[_0x8b122(0x432)]():VisuMZ[_0x8b122(0x71a)]['Window_NumberInput_processDigitChange']['call'](this);}}}},Window_NumberInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x750)]=function(){const _0x4acda0=_0xebc2c6;if(!this[_0x4acda0(0x20c)]())return;Input[_0x4acda0(0x67c)]()?this[_0x4acda0(0x3b6)]():Window_Selectable[_0x4acda0(0x2c3)][_0x4acda0(0x750)][_0x4acda0(0x32f)](this);},Window_NumberInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x65b)]=function(){},Window_NumberInput['prototype'][_0xebc2c6(0x3b6)]=function(){const _0x40bafe=_0xebc2c6;if(String(this[_0x40bafe(0x29a)])[_0x40bafe(0x749)]>=this[_0x40bafe(0x56d)])return;const _0x3a7686=Number(String(this['_number'])+Input['_inputString']);if(isNaN(_0x3a7686))return;this['_number']=_0x3a7686;const _0xfde1e3='9'[_0x40bafe(0x1c4)](this['_maxDigits']);this[_0x40bafe(0x29a)]=this['_number'][_0x40bafe(0x1cc)](0x0,_0xfde1e3),Input[_0x40bafe(0x6c0)](),this[_0x40bafe(0x4d3)](),SoundManager[_0x40bafe(0x285)](),this[_0x40bafe(0x5e3)](this[_0x40bafe(0x56d)]-0x1);},Window_NumberInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x4e8)]=function(){const _0x2d7ad0=_0xebc2c6;this['_number']=Number(String(this[_0x2d7ad0(0x29a)])['slice'](0x0,-0x1)),this[_0x2d7ad0(0x29a)]=Math[_0x2d7ad0(0x631)](0x0,this[_0x2d7ad0(0x29a)]),Input[_0x2d7ad0(0x6c0)](),this[_0x2d7ad0(0x4d3)](),SoundManager[_0x2d7ad0(0x285)](),this[_0x2d7ad0(0x5e3)](this['_maxDigits']-0x1);},Window_NumberInput[_0xebc2c6(0x2c3)]['processKeyboardDelete']=function(){const _0x518d8a=_0xebc2c6;this['_number']=Number(String(this['_number'])[_0x518d8a(0x646)](0x1)),this['_number']=Math[_0x518d8a(0x631)](0x0,this[_0x518d8a(0x29a)]),Input[_0x518d8a(0x6c0)](),this[_0x518d8a(0x4d3)](),SoundManager[_0x518d8a(0x285)](),this[_0x518d8a(0x5e3)](this[_0x518d8a(0x56d)]-0x1);},Window_NumberInput[_0xebc2c6(0x2c3)][_0xebc2c6(0x31f)]=function(){const _0x387e1d=_0xebc2c6;if(this[_0x387e1d(0x2b4)]()===0x0)return;Input['clear'](),this[_0x387e1d(0x4d3)](),SoundManager[_0x387e1d(0x285)](),this['select'](0x0);},Window_NumberInput[_0xebc2c6(0x2c3)]['processKeyboardEnd']=function(){const _0x29c553=_0xebc2c6;if(this[_0x29c553(0x2b4)]()===this[_0x29c553(0x56d)]-0x1)return;Input[_0x29c553(0x6c0)](),this[_0x29c553(0x4d3)](),SoundManager[_0x29c553(0x285)](),this[_0x29c553(0x5e3)](this['_maxDigits']-0x1);});;VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x5c0)]=Window_MapName[_0xebc2c6(0x2c3)][_0xebc2c6(0x4d3)],Window_MapName['prototype'][_0xebc2c6(0x4d3)]=function(){const _0x2635ca=_0xebc2c6;VisuMZ[_0x2635ca(0x71a)][_0x2635ca(0x74)][_0x2635ca(0x4b2)][_0x2635ca(0x166)]?this['refreshWithTextCodeSupport']():VisuMZ[_0x2635ca(0x71a)][_0x2635ca(0x5c0)][_0x2635ca(0x32f)](this);},Window_MapName['prototype'][_0xebc2c6(0x4aa)]=function(){const _0x54a631=_0xebc2c6;this[_0x54a631(0x44e)][_0x54a631(0x6c0)]();if($gameMap[_0x54a631(0x3bd)]()){const _0x1cfe12=this[_0x54a631(0x340)];this[_0x54a631(0x2fe)](0x0,0x0,_0x1cfe12,this[_0x54a631(0x468)]());const _0x3f31ab=this[_0x54a631(0x50e)]($gameMap[_0x54a631(0x3bd)]())[_0x54a631(0x20a)];this[_0x54a631(0x369)]($gameMap[_0x54a631(0x3bd)](),Math[_0x54a631(0x125)]((_0x1cfe12-_0x3f31ab)/0x2),0x0);}},Window_TitleCommand[_0xebc2c6(0x544)]=VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)][_0xebc2c6(0x460)],Window_TitleCommand['prototype'][_0xebc2c6(0x4a8)]=function(){const _0x2ca5e4=_0xebc2c6;this[_0x2ca5e4(0x71f)]();},Window_TitleCommand[_0xebc2c6(0x2c3)]['makeCoreEngineCommandList']=function(){const _0x46c194=_0xebc2c6;for(const _0x2258e7 of Window_TitleCommand[_0x46c194(0x544)]){if(_0x2258e7['ShowJS'][_0x46c194(0x32f)](this)){const _0x52f6d3=_0x2258e7['Symbol'];let _0x3af3b5=_0x2258e7[_0x46c194(0x377)];if(['','Untitled'][_0x46c194(0x6f5)](_0x3af3b5))_0x3af3b5=_0x2258e7[_0x46c194(0x6e4)]['call'](this);const _0x8dc98f=_0x2258e7['EnableJS']['call'](this),_0x3f4379=_0x2258e7['ExtJS']['call'](this);this[_0x46c194(0x5fb)](_0x3af3b5,_0x52f6d3,_0x8dc98f,_0x3f4379),this[_0x46c194(0x42f)](_0x52f6d3,_0x2258e7[_0x46c194(0x538)][_0x46c194(0x563)](this,_0x3f4379));}}},Window_GameEnd[_0xebc2c6(0x544)]=VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x74)][_0xebc2c6(0x74b)][_0xebc2c6(0x60e)][_0xebc2c6(0xa1)],Window_GameEnd[_0xebc2c6(0x2c3)][_0xebc2c6(0x4a8)]=function(){this['makeCoreEngineCommandList']();},Window_GameEnd[_0xebc2c6(0x2c3)][_0xebc2c6(0x71f)]=function(){const _0x4128d0=_0xebc2c6;for(const _0x13dc91 of Window_GameEnd[_0x4128d0(0x544)]){if(_0x13dc91[_0x4128d0(0x370)][_0x4128d0(0x32f)](this)){const _0x4d353d=_0x13dc91[_0x4128d0(0x2e2)];let _0x44819c=_0x13dc91[_0x4128d0(0x377)];if(['',_0x4128d0(0x645)][_0x4128d0(0x6f5)](_0x44819c))_0x44819c=_0x13dc91['TextJS'][_0x4128d0(0x32f)](this);const _0x55e3d2=_0x13dc91[_0x4128d0(0x672)][_0x4128d0(0x32f)](this),_0x1c2155=_0x13dc91[_0x4128d0(0x19a)][_0x4128d0(0x32f)](this);this[_0x4128d0(0x5fb)](_0x44819c,_0x4d353d,_0x55e3d2,_0x1c2155),this[_0x4128d0(0x42f)](_0x4d353d,_0x13dc91['CallHandlerJS'][_0x4128d0(0x563)](this,_0x1c2155));}}};function Window_ButtonAssist(){const _0x4dab1b=_0xebc2c6;this[_0x4dab1b(0x1dd)](...arguments);}Window_ButtonAssist[_0xebc2c6(0x2c3)]=Object['create'](Window_Base[_0xebc2c6(0x2c3)]),Window_ButtonAssist[_0xebc2c6(0x2c3)][_0xebc2c6(0x680)]=Window_ButtonAssist,Window_ButtonAssist['prototype']['initialize']=function(_0x23cb92){const _0x78d9c8=_0xebc2c6;this[_0x78d9c8(0x56e)]={},Window_Base[_0x78d9c8(0x2c3)]['initialize']['call'](this,_0x23cb92),this[_0x78d9c8(0x49a)](VisuMZ[_0x78d9c8(0x71a)][_0x78d9c8(0x74)]['ButtonAssist'][_0x78d9c8(0x320)]||0x0),this[_0x78d9c8(0x4d3)]();},Window_ButtonAssist[_0xebc2c6(0x2c3)][_0xebc2c6(0x3cd)]=function(){const _0x4043c8=_0xebc2c6;this['contents'][_0x4043c8(0x213)]<=0x60&&(this[_0x4043c8(0x44e)]['fontSize']+=0x6);},Window_ButtonAssist[_0xebc2c6(0x2c3)][_0xebc2c6(0x746)]=function(){const _0x18c04f=_0xebc2c6;this[_0x18c04f(0x44e)][_0x18c04f(0x213)]>=0x18&&(this[_0x18c04f(0x44e)][_0x18c04f(0x213)]-=0x6);},Window_ButtonAssist['prototype'][_0xebc2c6(0x3a8)]=function(){const _0x57bd75=_0xebc2c6;Window_Base[_0x57bd75(0x2c3)][_0x57bd75(0x3a8)]['call'](this),this[_0x57bd75(0x41f)]();},Window_ButtonAssist[_0xebc2c6(0x2c3)][_0xebc2c6(0x3e9)]=function(){const _0x5e5dea=_0xebc2c6;this[_0x5e5dea(0x6a5)]=SceneManager[_0x5e5dea(0x4e5)][_0x5e5dea(0x176)]()!==_0x5e5dea(0x26c)?0x0:0x8;},Window_ButtonAssist[_0xebc2c6(0x2c3)]['updateKeyText']=function(){const _0xaeef54=_0xebc2c6,_0x506407=SceneManager[_0xaeef54(0x4e5)];for(let _0x42be17=0x1;_0x42be17<=0x5;_0x42be17++){if(this[_0xaeef54(0x56e)][_0xaeef54(0x714)[_0xaeef54(0x5ce)](_0x42be17)]!==_0x506407[_0xaeef54(0x181)[_0xaeef54(0x5ce)](_0x42be17)]())return this[_0xaeef54(0x4d3)]();if(this[_0xaeef54(0x56e)][_0xaeef54(0x684)[_0xaeef54(0x5ce)](_0x42be17)]!==_0x506407['buttonAssistText%1'[_0xaeef54(0x5ce)](_0x42be17)]())return this['refresh']();}},Window_ButtonAssist['prototype'][_0xebc2c6(0x4d3)]=function(){const _0x59c1a4=_0xebc2c6;this['contents']['clear']();for(let _0x26c121=0x1;_0x26c121<=0x5;_0x26c121++){this[_0x59c1a4(0x60f)](_0x26c121);}},Window_ButtonAssist[_0xebc2c6(0x2c3)][_0xebc2c6(0x60f)]=function(_0x48fd10){const _0x40b0a0=_0xebc2c6,_0x1510e8=this[_0x40b0a0(0x340)]/0x5,_0x563178=SceneManager[_0x40b0a0(0x4e5)],_0x25e3ba=_0x563178[_0x40b0a0(0x181)['format'](_0x48fd10)](),_0x2b9540=_0x563178['buttonAssistText%1'[_0x40b0a0(0x5ce)](_0x48fd10)]();this['_data'][_0x40b0a0(0x714)[_0x40b0a0(0x5ce)](_0x48fd10)]=_0x25e3ba,this[_0x40b0a0(0x56e)][_0x40b0a0(0x684)['format'](_0x48fd10)]=_0x2b9540;if(_0x25e3ba==='')return;if(_0x2b9540==='')return;const _0xe34080=_0x563178[_0x40b0a0(0x37e)[_0x40b0a0(0x5ce)](_0x48fd10)](),_0xc6f538=this[_0x40b0a0(0x25f)](),_0x4e7abc=_0x1510e8*(_0x48fd10-0x1)+_0xc6f538+_0xe34080,_0x51fb48=VisuMZ['CoreEngine']['Settings'][_0x40b0a0(0x642)][_0x40b0a0(0x2de)];this['drawTextEx'](_0x51fb48[_0x40b0a0(0x5ce)](_0x25e3ba,_0x2b9540),_0x4e7abc,0x0,_0x1510e8-_0xc6f538*0x2);},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x17a)]=Game_Interpreter[_0xebc2c6(0x2c3)][_0xebc2c6(0x4ec)],Game_Interpreter[_0xebc2c6(0x2c3)]['updateWaitMode']=function(){const _0xdf3d25=_0xebc2c6;if($gameTemp['_pictureCoordinatesMode']!==undefined)return VisuMZ['CoreEngine'][_0xdf3d25(0x467)]();return VisuMZ[_0xdf3d25(0x71a)][_0xdf3d25(0x17a)][_0xdf3d25(0x32f)](this);},VisuMZ['CoreEngine'][_0xebc2c6(0x467)]=function(){const _0x5d27f1=_0xebc2c6,_0x5822d2=$gameTemp[_0x5d27f1(0x618)]||0x0;(_0x5822d2<0x0||_0x5822d2>0x64||TouchInput['isCancelled']()||Input[_0x5d27f1(0x1d3)](_0x5d27f1(0x52b)))&&($gameTemp['_pictureCoordinatesMode']=undefined,Input['clear'](),TouchInput[_0x5d27f1(0x6c0)]());const _0x513774=$gameScreen[_0x5d27f1(0x191)](_0x5822d2);return _0x513774&&(_0x513774['_x']=TouchInput['_x'],_0x513774['_y']=TouchInput['_y']),VisuMZ[_0x5d27f1(0x71a)][_0x5d27f1(0xba)](),$gameTemp['_pictureCoordinatesMode']!==undefined;},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0xba)]=function(){const _0xd9e193=_0xebc2c6,_0x1c4b90=SceneManager[_0xd9e193(0x4e5)];if(!_0x1c4b90)return;!_0x1c4b90[_0xd9e193(0x4e3)]&&(SoundManager[_0xd9e193(0x5bb)](),_0x1c4b90[_0xd9e193(0x4e3)]=new Window_PictureCoordinates(),_0x1c4b90[_0xd9e193(0x148)](_0x1c4b90[_0xd9e193(0x4e3)])),$gameTemp['_pictureCoordinatesMode']===undefined&&(SoundManager[_0xd9e193(0x6de)](),_0x1c4b90['removeChild'](_0x1c4b90[_0xd9e193(0x4e3)]),_0x1c4b90[_0xd9e193(0x4e3)]=undefined);};function Window_PictureCoordinates(){const _0x343fdc=_0xebc2c6;this[_0x343fdc(0x1dd)](...arguments);}function _0x1f8b(_0x42da92,_0x1d1c06){const _0x52dd00=_0x52dd();return _0x1f8b=function(_0x1f8bb8,_0x15248a){_0x1f8bb8=_0x1f8bb8-0x6c;let _0x122dcc=_0x52dd00[_0x1f8bb8];return _0x122dcc;},_0x1f8b(_0x42da92,_0x1d1c06);}Window_PictureCoordinates[_0xebc2c6(0x2c3)]=Object[_0xebc2c6(0x549)](Window_Base[_0xebc2c6(0x2c3)]),Window_PictureCoordinates[_0xebc2c6(0x2c3)][_0xebc2c6(0x680)]=Window_PictureCoordinates,Window_PictureCoordinates[_0xebc2c6(0x2c3)]['initialize']=function(){const _0x137cab=_0xebc2c6;this[_0x137cab(0x335)]=_0x137cab(0x20f),this[_0x137cab(0x514)]='nah',this['_lastY']='nah';const _0x178a3d=this[_0x137cab(0x56f)]();Window_Base[_0x137cab(0x2c3)]['initialize'][_0x137cab(0x32f)](this,_0x178a3d),this[_0x137cab(0x49a)](0x2);},Window_PictureCoordinates[_0xebc2c6(0x2c3)][_0xebc2c6(0x56f)]=function(){const _0x19d66a=_0xebc2c6;let _0x56a701=0x0,_0x2bbe5e=Graphics[_0x19d66a(0x102)]-this[_0x19d66a(0x468)](),_0x130c13=Graphics[_0x19d66a(0x20a)],_0x543f20=this[_0x19d66a(0x468)]();return new Rectangle(_0x56a701,_0x2bbe5e,_0x130c13,_0x543f20);},Window_PictureCoordinates[_0xebc2c6(0x2c3)][_0xebc2c6(0x3e9)]=function(){const _0x6a8dc8=_0xebc2c6;this[_0x6a8dc8(0x6a5)]=0x0;},Window_PictureCoordinates[_0xebc2c6(0x2c3)][_0xebc2c6(0x3a8)]=function(){const _0x2f2e8=_0xebc2c6;Window_Base[_0x2f2e8(0x2c3)][_0x2f2e8(0x3a8)][_0x2f2e8(0x32f)](this),this[_0x2f2e8(0x244)]();},Window_PictureCoordinates[_0xebc2c6(0x2c3)][_0xebc2c6(0x244)]=function(){if(!this['needsUpdate']())return;this['refresh']();},Window_PictureCoordinates[_0xebc2c6(0x2c3)]['needsUpdate']=function(){const _0x3ffb94=_0xebc2c6,_0x44b757=$gameTemp[_0x3ffb94(0x618)],_0x148880=$gameScreen[_0x3ffb94(0x191)](_0x44b757);return _0x148880?this[_0x3ffb94(0x335)]!==_0x148880[_0x3ffb94(0x2e6)]||this[_0x3ffb94(0x514)]!==_0x148880['_x']||this['_lastY']!==_0x148880['_y']:![];},Window_PictureCoordinates[_0xebc2c6(0x2c3)][_0xebc2c6(0x4d3)]=function(){const _0x5ef75c=_0xebc2c6;this[_0x5ef75c(0x44e)][_0x5ef75c(0x6c0)]();const _0x285df0=$gameTemp[_0x5ef75c(0x618)],_0x3e12a3=$gameScreen[_0x5ef75c(0x191)](_0x285df0);if(!_0x3e12a3)return;this['_lastOrigin']=_0x3e12a3[_0x5ef75c(0x2e6)],this[_0x5ef75c(0x514)]=_0x3e12a3['_x'],this['_lastY']=_0x3e12a3['_y'];const _0x5c42a8=ColorManager['itemBackColor1']();this[_0x5ef75c(0x44e)][_0x5ef75c(0x11e)](0x0,0x0,this[_0x5ef75c(0x340)],this[_0x5ef75c(0x170)],_0x5c42a8);const _0x739332=_0x5ef75c(0xa7)[_0x5ef75c(0x5ce)](_0x3e12a3[_0x5ef75c(0x2e6)]===0x0?_0x5ef75c(0x381):'Center'),_0x5e9c75=_0x5ef75c(0x21d)[_0x5ef75c(0x5ce)](_0x3e12a3['_x']),_0x2889fb=_0x5ef75c(0x3ba)[_0x5ef75c(0x5ce)](_0x3e12a3['_y']),_0x44146f=_0x5ef75c(0x683)[_0x5ef75c(0x5ce)](TextManager[_0x5ef75c(0x6da)](_0x5ef75c(0x52b)));let _0x40b2a7=Math['floor'](this[_0x5ef75c(0x340)]/0x4);this['drawText'](_0x739332,_0x40b2a7*0x0,0x0,_0x40b2a7),this[_0x5ef75c(0x109)](_0x5e9c75,_0x40b2a7*0x1,0x0,_0x40b2a7,'center'),this[_0x5ef75c(0x109)](_0x2889fb,_0x40b2a7*0x2,0x0,_0x40b2a7,_0x5ef75c(0x4fe));const _0x5a4487=this[_0x5ef75c(0x50e)](_0x44146f)[_0x5ef75c(0x20a)],_0x45a3df=this[_0x5ef75c(0x340)]-_0x5a4487;this['drawTextEx'](_0x44146f,_0x45a3df,0x0,_0x5a4487);},VisuMZ['ShowDevTools']=function(_0x16f2b0){const _0x1e254e=_0xebc2c6;if(Utils[_0x1e254e(0x271)](_0x1e254e(0x51f))){var _0x5435fc=require(_0x1e254e(0x344))[_0x1e254e(0x1f9)][_0x1e254e(0x18b)]();SceneManager[_0x1e254e(0x52e)]();if(_0x16f2b0)setTimeout(_0x5435fc[_0x1e254e(0x36d)][_0x1e254e(0x563)](_0x5435fc),0x190);}},VisuMZ[_0xebc2c6(0x28c)]=function(_0x10823a,_0x4f4a01){const _0x358a93=_0xebc2c6;_0x4f4a01=_0x4f4a01['toUpperCase']();var _0x57cb58=1.70158,_0x340ab3=0.7;switch(_0x4f4a01){case'LINEAR':return _0x10823a;case _0x358a93(0x480):return-0x1*Math[_0x358a93(0x4f0)](_0x10823a*(Math['PI']/0x2))+0x1;case _0x358a93(0x3fb):return Math[_0x358a93(0x157)](_0x10823a*(Math['PI']/0x2));case _0x358a93(0x145):return-0.5*(Math['cos'](Math['PI']*_0x10823a)-0x1);case _0x358a93(0x2a6):return _0x10823a*_0x10823a;case _0x358a93(0x264):return _0x10823a*(0x2-_0x10823a);case'INOUTQUAD':return _0x10823a<0.5?0x2*_0x10823a*_0x10823a:-0x1+(0x4-0x2*_0x10823a)*_0x10823a;case _0x358a93(0x4a9):return _0x10823a*_0x10823a*_0x10823a;case'OUTCUBIC':var _0x4e768f=_0x10823a-0x1;return _0x4e768f*_0x4e768f*_0x4e768f+0x1;case _0x358a93(0xbe):return _0x10823a<0.5?0x4*_0x10823a*_0x10823a*_0x10823a:(_0x10823a-0x1)*(0x2*_0x10823a-0x2)*(0x2*_0x10823a-0x2)+0x1;case _0x358a93(0x504):return _0x10823a*_0x10823a*_0x10823a*_0x10823a;case'OUTQUART':var _0x4e768f=_0x10823a-0x1;return 0x1-_0x4e768f*_0x4e768f*_0x4e768f*_0x4e768f;case _0x358a93(0xc8):var _0x4e768f=_0x10823a-0x1;return _0x10823a<0.5?0x8*_0x10823a*_0x10823a*_0x10823a*_0x10823a:0x1-0x8*_0x4e768f*_0x4e768f*_0x4e768f*_0x4e768f;case'INQUINT':return _0x10823a*_0x10823a*_0x10823a*_0x10823a*_0x10823a;case'OUTQUINT':var _0x4e768f=_0x10823a-0x1;return 0x1+_0x4e768f*_0x4e768f*_0x4e768f*_0x4e768f*_0x4e768f;case'INOUTQUINT':var _0x4e768f=_0x10823a-0x1;return _0x10823a<0.5?0x10*_0x10823a*_0x10823a*_0x10823a*_0x10823a*_0x10823a:0x1+0x10*_0x4e768f*_0x4e768f*_0x4e768f*_0x4e768f*_0x4e768f;case'INEXPO':if(_0x10823a===0x0)return 0x0;return Math['pow'](0x2,0xa*(_0x10823a-0x1));case _0x358a93(0x734):if(_0x10823a===0x1)return 0x1;return-Math[_0x358a93(0x3cb)](0x2,-0xa*_0x10823a)+0x1;case _0x358a93(0xcd):if(_0x10823a===0x0||_0x10823a===0x1)return _0x10823a;var _0x402127=_0x10823a*0x2,_0x5c274c=_0x402127-0x1;if(_0x402127<0x1)return 0.5*Math[_0x358a93(0x3cb)](0x2,0xa*_0x5c274c);return 0.5*(-Math[_0x358a93(0x3cb)](0x2,-0xa*_0x5c274c)+0x2);case _0x358a93(0x372):var _0x402127=_0x10823a/0x1;return-0x1*(Math[_0x358a93(0x2b5)](0x1-_0x402127*_0x10823a)-0x1);case _0x358a93(0x4b6):var _0x4e768f=_0x10823a-0x1;return Math[_0x358a93(0x2b5)](0x1-_0x4e768f*_0x4e768f);case _0x358a93(0x505):var _0x402127=_0x10823a*0x2,_0x5c274c=_0x402127-0x2;if(_0x402127<0x1)return-0.5*(Math[_0x358a93(0x2b5)](0x1-_0x402127*_0x402127)-0x1);return 0.5*(Math['sqrt'](0x1-_0x5c274c*_0x5c274c)+0x1);case _0x358a93(0x2b7):return _0x10823a*_0x10823a*((_0x57cb58+0x1)*_0x10823a-_0x57cb58);case'OUTBACK':var _0x402127=_0x10823a/0x1-0x1;return _0x402127*_0x402127*((_0x57cb58+0x1)*_0x402127+_0x57cb58)+0x1;break;case'INOUTBACK':var _0x402127=_0x10823a*0x2,_0x5b8ca0=_0x402127-0x2,_0x3a52e1=_0x57cb58*1.525;if(_0x402127<0x1)return 0.5*_0x402127*_0x402127*((_0x3a52e1+0x1)*_0x402127-_0x3a52e1);return 0.5*(_0x5b8ca0*_0x5b8ca0*((_0x3a52e1+0x1)*_0x5b8ca0+_0x3a52e1)+0x2);case'INELASTIC':if(_0x10823a===0x0||_0x10823a===0x1)return _0x10823a;var _0x402127=_0x10823a/0x1,_0x5c274c=_0x402127-0x1,_0x4c5999=0x1-_0x340ab3,_0x3a52e1=_0x4c5999/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math['pow'](0x2,0xa*_0x5c274c)*Math['sin']((_0x5c274c-_0x3a52e1)*(0x2*Math['PI'])/_0x4c5999));case'OUTELASTIC':var _0x4c5999=0x1-_0x340ab3,_0x402127=_0x10823a*0x2;if(_0x10823a===0x0||_0x10823a===0x1)return _0x10823a;var _0x3a52e1=_0x4c5999/(0x2*Math['PI'])*Math[_0x358a93(0x63d)](0x1);return Math[_0x358a93(0x3cb)](0x2,-0xa*_0x402127)*Math[_0x358a93(0x157)]((_0x402127-_0x3a52e1)*(0x2*Math['PI'])/_0x4c5999)+0x1;case _0x358a93(0x63e):var _0x4c5999=0x1-_0x340ab3;if(_0x10823a===0x0||_0x10823a===0x1)return _0x10823a;var _0x402127=_0x10823a*0x2,_0x5c274c=_0x402127-0x1,_0x3a52e1=_0x4c5999/(0x2*Math['PI'])*Math[_0x358a93(0x63d)](0x1);if(_0x402127<0x1)return-0.5*(Math[_0x358a93(0x3cb)](0x2,0xa*_0x5c274c)*Math[_0x358a93(0x157)]((_0x5c274c-_0x3a52e1)*(0x2*Math['PI'])/_0x4c5999));return Math['pow'](0x2,-0xa*_0x5c274c)*Math[_0x358a93(0x157)]((_0x5c274c-_0x3a52e1)*(0x2*Math['PI'])/_0x4c5999)*0.5+0x1;case'OUTBOUNCE':var _0x402127=_0x10823a/0x1;if(_0x402127<0x1/2.75)return 7.5625*_0x402127*_0x402127;else{if(_0x402127<0x2/2.75){var _0x5b8ca0=_0x402127-1.5/2.75;return 7.5625*_0x5b8ca0*_0x5b8ca0+0.75;}else{if(_0x402127<2.5/2.75){var _0x5b8ca0=_0x402127-2.25/2.75;return 7.5625*_0x5b8ca0*_0x5b8ca0+0.9375;}else{var _0x5b8ca0=_0x402127-2.625/2.75;return 7.5625*_0x5b8ca0*_0x5b8ca0+0.984375;}}}case _0x358a93(0x68f):var _0x1bf168=0x1-VisuMZ[_0x358a93(0x28c)](0x1-_0x10823a,_0x358a93(0x5a9));return _0x1bf168;case'INOUTBOUNCE':if(_0x10823a<0.5)var _0x1bf168=VisuMZ[_0x358a93(0x28c)](_0x10823a*0x2,'inbounce')*0.5;else var _0x1bf168=VisuMZ[_0x358a93(0x28c)](_0x10823a*0x2-0x1,'outbounce')*0.5+0.5;return _0x1bf168;default:return _0x10823a;}},VisuMZ[_0xebc2c6(0x655)]=function(_0x585e2a){const _0x2bee6f=_0xebc2c6;_0x585e2a=String(_0x585e2a)['toUpperCase']();const _0x16637d=VisuMZ[_0x2bee6f(0x71a)][_0x2bee6f(0x74)][_0x2bee6f(0x4c8)];if(_0x585e2a===_0x2bee6f(0x668))return _0x16637d['IconParam0'];if(_0x585e2a===_0x2bee6f(0xf8))return _0x16637d[_0x2bee6f(0x1a3)];if(_0x585e2a==='ATK')return _0x16637d[_0x2bee6f(0x2f3)];if(_0x585e2a==='DEF')return _0x16637d[_0x2bee6f(0xe7)];if(_0x585e2a===_0x2bee6f(0x1c8))return _0x16637d[_0x2bee6f(0x26d)];if(_0x585e2a===_0x2bee6f(0x2ea))return _0x16637d[_0x2bee6f(0x6a1)];if(_0x585e2a===_0x2bee6f(0x137))return _0x16637d[_0x2bee6f(0x5f3)];if(_0x585e2a===_0x2bee6f(0x17b))return _0x16637d[_0x2bee6f(0x609)];if(_0x585e2a===_0x2bee6f(0x6e6))return _0x16637d[_0x2bee6f(0x403)];if(_0x585e2a===_0x2bee6f(0x5a2))return _0x16637d[_0x2bee6f(0x6a8)];if(_0x585e2a===_0x2bee6f(0x3c3))return _0x16637d[_0x2bee6f(0x71e)];if(_0x585e2a===_0x2bee6f(0x720))return _0x16637d['IconXParam3'];if(_0x585e2a===_0x2bee6f(0x694))return _0x16637d[_0x2bee6f(0x234)];if(_0x585e2a===_0x2bee6f(0x28b))return _0x16637d['IconXParam5'];if(_0x585e2a==='CNT')return _0x16637d[_0x2bee6f(0xc3)];if(_0x585e2a===_0x2bee6f(0x548))return _0x16637d[_0x2bee6f(0x4a3)];if(_0x585e2a===_0x2bee6f(0x66d))return _0x16637d['IconXParam8'];if(_0x585e2a==='TRG')return _0x16637d[_0x2bee6f(0x36c)];if(_0x585e2a===_0x2bee6f(0x151))return _0x16637d[_0x2bee6f(0x378)];if(_0x585e2a==='GRD')return _0x16637d['IconSParam1'];if(_0x585e2a===_0x2bee6f(0x2c1))return _0x16637d['IconSParam2'];if(_0x585e2a===_0x2bee6f(0x86))return _0x16637d[_0x2bee6f(0x420)];if(_0x585e2a===_0x2bee6f(0x545))return _0x16637d[_0x2bee6f(0x533)];if(_0x585e2a===_0x2bee6f(0x17d))return _0x16637d[_0x2bee6f(0x3d6)];if(_0x585e2a===_0x2bee6f(0x101))return _0x16637d['IconSParam6'];if(_0x585e2a===_0x2bee6f(0x60a))return _0x16637d[_0x2bee6f(0x22e)];if(_0x585e2a===_0x2bee6f(0x610))return _0x16637d[_0x2bee6f(0x622)];if(_0x585e2a===_0x2bee6f(0x29b))return _0x16637d[_0x2bee6f(0x435)];if(VisuMZ[_0x2bee6f(0x71a)]['CustomParamIcons'][_0x585e2a])return VisuMZ[_0x2bee6f(0x71a)]['CustomParamIcons'][_0x585e2a]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0xd4c3d7,_0x1970e8,_0x30657d){const _0xb115b=_0xebc2c6;if(_0x30657d===undefined&&_0xd4c3d7%0x1===0x0)return _0xd4c3d7;if(_0x30657d!==undefined&&[_0xb115b(0x668),_0xb115b(0xf8),_0xb115b(0x32a),_0xb115b(0x5d4),_0xb115b(0x1c8),_0xb115b(0x2ea),'AGI',_0xb115b(0x17b)][_0xb115b(0x6f5)](String(_0x30657d)['toUpperCase']()['trim']()))return _0xd4c3d7;_0x1970e8=_0x1970e8||0x0;if(VisuMZ['CoreEngine'][_0xb115b(0x4ee)][_0x30657d])return VisuMZ[_0xb115b(0x71a)][_0xb115b(0x689)][_0x30657d]===_0xb115b(0x621)?_0xd4c3d7:String((_0xd4c3d7*0x64)[_0xb115b(0x46c)](_0x1970e8))+'%';return String((_0xd4c3d7*0x64)['toFixed'](_0x1970e8))+'%';},VisuMZ[_0xebc2c6(0x256)]=function(_0x3d405c){const _0x5a60d0=_0xebc2c6;_0x3d405c=String(_0x3d405c);if(!_0x3d405c)return _0x3d405c;if(typeof _0x3d405c!==_0x5a60d0(0x57e))return _0x3d405c;const _0x58f043=VisuMZ['CoreEngine'][_0x5a60d0(0x74)][_0x5a60d0(0x4b2)][_0x5a60d0(0x3bc)]||_0x5a60d0(0x192),_0x20a72f={'maximumFractionDigits':0x6};_0x3d405c=_0x3d405c[_0x5a60d0(0x613)](/\[(.*?)\]/g,(_0xf2a17a,_0x10f73c)=>{const _0x184f59=_0x5a60d0;return VisuMZ[_0x184f59(0x25c)](_0x10f73c,'[',']');}),_0x3d405c=_0x3d405c[_0x5a60d0(0x613)](/<(.*?)>/g,(_0x2b6b27,_0x44fa30)=>{const _0x51e245=_0x5a60d0;return VisuMZ[_0x51e245(0x25c)](_0x44fa30,'<','>');}),_0x3d405c=_0x3d405c['replace'](/\{\{(.*?)\}\}/g,(_0x2af3ee,_0x4ab10f)=>{const _0xac01c9=_0x5a60d0;return VisuMZ[_0xac01c9(0x25c)](_0x4ab10f,'','');}),_0x3d405c=_0x3d405c[_0x5a60d0(0x613)](/(\d+\.?\d*)/g,(_0x5598f7,_0x234bfa)=>{const _0x4e9d86=_0x5a60d0;let _0x555f7c=_0x234bfa;if(_0x555f7c[0x0]==='0')return _0x555f7c;if(_0x555f7c[_0x555f7c[_0x4e9d86(0x749)]-0x1]==='.')return Number(_0x555f7c)[_0x4e9d86(0x5b1)](_0x58f043,_0x20a72f)+'.';else return _0x555f7c[_0x555f7c['length']-0x1]===','?Number(_0x555f7c)[_0x4e9d86(0x5b1)](_0x58f043,_0x20a72f)+',':Number(_0x555f7c)[_0x4e9d86(0x5b1)](_0x58f043,_0x20a72f);});let _0x2a3fa8=0x3;while(_0x2a3fa8--){_0x3d405c=VisuMZ[_0x5a60d0(0x51e)](_0x3d405c);}return _0x3d405c;},VisuMZ[_0xebc2c6(0x25c)]=function(_0xb0f628,_0x201ec6,_0x8d223c){const _0x136726=_0xebc2c6;return _0xb0f628=_0xb0f628[_0x136726(0x613)](/(\d)/gi,(_0x247041,_0x409122)=>_0x136726(0x375)[_0x136726(0x5ce)](Number(_0x409122))),_0x136726(0x737)[_0x136726(0x5ce)](_0xb0f628,_0x201ec6,_0x8d223c);},VisuMZ[_0xebc2c6(0x51e)]=function(_0xc71cbf){const _0x49ee8a=_0xebc2c6;return _0xc71cbf=_0xc71cbf[_0x49ee8a(0x613)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x222336,_0x31998d)=>Number(parseInt(_0x31998d))),_0xc71cbf;},VisuMZ[_0xebc2c6(0x728)]=function(_0x78e64f){const _0x489b2c=_0xebc2c6;SoundManager[_0x489b2c(0x5c8)]();if(!Utils[_0x489b2c(0x37a)]()){const _0x53c235=window['open'](_0x78e64f,'_blank');}else{const _0x406c5a=process[_0x489b2c(0x6c9)]=='darwin'?'open':process[_0x489b2c(0x6c9)]=='win32'?_0x489b2c(0x1c0):_0x489b2c(0x69c);require(_0x489b2c(0x243))[_0x489b2c(0x278)](_0x406c5a+'\x20'+_0x78e64f);}},VisuMZ[_0xebc2c6(0x2ba)]=function(_0x3bdbc1,_0x185d26){const _0x55aff7=_0xebc2c6;if(!_0x3bdbc1)return'';const _0x29fa26=_0x3bdbc1[_0x55aff7(0x69e)]||_0x3bdbc1['id'];let _0x14089c='';return _0x3bdbc1[_0x55aff7(0x283)]!==undefined&&_0x3bdbc1['nickname']!==undefined&&(_0x14089c=_0x55aff7(0x482)['format'](_0x29fa26,_0x185d26)),_0x3bdbc1[_0x55aff7(0x28e)]!==undefined&&_0x3bdbc1['learnings']!==undefined&&(_0x14089c=_0x55aff7(0x444)[_0x55aff7(0x5ce)](_0x29fa26,_0x185d26)),_0x3bdbc1[_0x55aff7(0x227)]!==undefined&&_0x3bdbc1[_0x55aff7(0x1c1)]!==undefined&&(_0x14089c=_0x55aff7(0x38a)[_0x55aff7(0x5ce)](_0x29fa26,_0x185d26)),_0x3bdbc1[_0x55aff7(0x711)]!==undefined&&_0x3bdbc1['consumable']!==undefined&&(_0x14089c=_0x55aff7(0x73f)[_0x55aff7(0x5ce)](_0x29fa26,_0x185d26)),_0x3bdbc1[_0x55aff7(0x5e0)]!==undefined&&_0x3bdbc1['etypeId']===0x1&&(_0x14089c=_0x55aff7(0x6ee)[_0x55aff7(0x5ce)](_0x29fa26,_0x185d26)),_0x3bdbc1['atypeId']!==undefined&&_0x3bdbc1[_0x55aff7(0x459)]>0x1&&(_0x14089c=_0x55aff7(0x163)['format'](_0x29fa26,_0x185d26)),_0x3bdbc1[_0x55aff7(0x669)]!==undefined&&_0x3bdbc1['battlerHue']!==undefined&&(_0x14089c=_0x55aff7(0x698)[_0x55aff7(0x5ce)](_0x29fa26,_0x185d26)),_0x3bdbc1[_0x55aff7(0x65c)]!==undefined&&_0x3bdbc1['maxTurns']!==undefined&&(_0x14089c='State-%1-%2'[_0x55aff7(0x5ce)](_0x29fa26,_0x185d26)),_0x14089c;},Game_Picture['prototype'][_0xebc2c6(0x490)]=function(){const _0x4b1f68=_0xebc2c6;return this[_0x4b1f68(0xbc)];},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x32e)]=Game_Picture[_0xebc2c6(0x2c3)][_0xebc2c6(0xe1)],Game_Picture[_0xebc2c6(0x2c3)][_0xebc2c6(0xe1)]=function(){const _0x16c200=_0xebc2c6;VisuMZ[_0x16c200(0x71a)][_0x16c200(0x32e)][_0x16c200(0x32f)](this),this['_anchor']={'x':0x0,'y':0x0},this['_targetAnchor']={'x':0x0,'y':0x0};},VisuMZ['CoreEngine'][_0xebc2c6(0x752)]=Game_Picture['prototype'][_0xebc2c6(0x477)],Game_Picture[_0xebc2c6(0x2c3)][_0xebc2c6(0x477)]=function(){const _0x3f7d16=_0xebc2c6;this[_0x3f7d16(0x331)]();const _0x3e5472=this[_0x3f7d16(0x552)];VisuMZ[_0x3f7d16(0x71a)][_0x3f7d16(0x752)][_0x3f7d16(0x32f)](this),_0x3e5472>0x0&&this['_duration']<=0x0&&(this['_x']=this[_0x3f7d16(0x695)],this['_y']=this[_0x3f7d16(0x103)],this[_0x3f7d16(0x644)]=this[_0x3f7d16(0x6e0)],this[_0x3f7d16(0x73d)]=this[_0x3f7d16(0x26f)],this['_opacity']=this[_0x3f7d16(0x149)],this[_0x3f7d16(0xbc)]&&(this['_anchor']['x']=this[_0x3f7d16(0x6b0)]['x'],this[_0x3f7d16(0xbc)]['y']=this[_0x3f7d16(0x6b0)]['y']));},VisuMZ['CoreEngine'][_0xebc2c6(0x59a)]=Game_Picture[_0xebc2c6(0x2c3)]['show'],Game_Picture[_0xebc2c6(0x2c3)]['show']=function(_0x213896,_0x4ee565,_0x3e65fd,_0x1cd1fd,_0x159464,_0x34c405,_0x2a796b,_0x5aa52c){const _0x31a940=_0xebc2c6;VisuMZ['CoreEngine'][_0x31a940(0x59a)]['call'](this,_0x213896,_0x4ee565,_0x3e65fd,_0x1cd1fd,_0x159464,_0x34c405,_0x2a796b,_0x5aa52c),this[_0x31a940(0x6a0)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4ee565]||{'x':0x0,'y':0x0});},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x5ba)]=Game_Picture['prototype'][_0xebc2c6(0x603)],Game_Picture[_0xebc2c6(0x2c3)][_0xebc2c6(0x603)]=function(_0x5a95a9,_0xda612c,_0x442bd4,_0x185286,_0x2e5be4,_0x59799e,_0x3f98ad,_0x1c8700,_0x5a9177){const _0x4c61b4=_0xebc2c6;VisuMZ[_0x4c61b4(0x71a)]['Game_Picture_move']['call'](this,_0x5a95a9,_0xda612c,_0x442bd4,_0x185286,_0x2e5be4,_0x59799e,_0x3f98ad,_0x1c8700,_0x5a9177),this[_0x4c61b4(0x579)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x5a95a9]||{'x':0x0,'y':0x0});},Game_Picture['prototype']['updateAnchor']=function(){const _0x24d8ae=_0xebc2c6;this['_duration']>0x0&&(this[_0x24d8ae(0xbc)]['x']=this[_0x24d8ae(0x78)](this[_0x24d8ae(0xbc)]['x'],this['_targetAnchor']['x']),this[_0x24d8ae(0xbc)]['y']=this[_0x24d8ae(0x78)](this[_0x24d8ae(0xbc)]['y'],this[_0x24d8ae(0x6b0)]['y']));},Game_Picture[_0xebc2c6(0x2c3)][_0xebc2c6(0x6a0)]=function(_0x412f63){const _0x2cc9cd=_0xebc2c6;this[_0x2cc9cd(0xbc)]=_0x412f63,this[_0x2cc9cd(0x6b0)]=JsonEx['makeDeepCopy'](this[_0x2cc9cd(0xbc)]);},Game_Picture[_0xebc2c6(0x2c3)]['setTargetAnchor']=function(_0x19da17){const _0xafddaa=_0xebc2c6;this[_0xafddaa(0x6b0)]=_0x19da17;},VisuMZ['CoreEngine']['Sprite_Picture_updateOrigin']=Sprite_Picture[_0xebc2c6(0x2c3)]['updateOrigin'],Sprite_Picture['prototype'][_0xebc2c6(0x73c)]=function(){const _0x5c027b=_0xebc2c6,_0x1c8a22=this['picture']();!_0x1c8a22[_0x5c027b(0x490)]()?VisuMZ[_0x5c027b(0x71a)][_0x5c027b(0x5f9)][_0x5c027b(0x32f)](this):(this[_0x5c027b(0x490)]['x']=_0x1c8a22['anchor']()['x'],this['anchor']['y']=_0x1c8a22[_0x5c027b(0x490)]()['y']);},Game_Action[_0xebc2c6(0x2c3)][_0xebc2c6(0x21a)]=function(_0x42604d){const _0x384a2a=_0xebc2c6;if(_0x42604d){const _0x36a2c2=_0x42604d[_0x384a2a(0x38f)];if(_0x36a2c2===0x1&&this[_0x384a2a(0x356)]()[_0x384a2a(0x2a1)]()!==0x1)this[_0x384a2a(0x656)]();else _0x36a2c2===0x2&&this[_0x384a2a(0x356)]()['guardSkillId']()!==0x2?this[_0x384a2a(0x721)]():this[_0x384a2a(0x5a4)](_0x36a2c2);}else this['clear']();},Game_Actor[_0xebc2c6(0x2c3)][_0xebc2c6(0x433)]=function(){const _0x10527b=_0xebc2c6;return this[_0x10527b(0x63a)]()['filter'](_0x473b82=>this[_0x10527b(0x582)](_0x473b82)&&this['skillTypes']()[_0x10527b(0x6f5)](_0x473b82['stypeId']));},Window_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x15f)]=function(){const _0x46a5c7=_0xebc2c6;this[_0x46a5c7(0x124)]=new Sprite(),this[_0x46a5c7(0x124)][_0x46a5c7(0x2d3)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x46a5c7(0x3b1)](this['_dimmerSprite']);},Window_Base[_0xebc2c6(0x2c3)]['refreshDimmerBitmap']=function(){const _0xbfd533=_0xebc2c6;if(this[_0xbfd533(0x124)]){const _0x2d0670=this[_0xbfd533(0x124)]['bitmap'],_0x4ecc2e=this[_0xbfd533(0x20a)],_0x41dd31=this[_0xbfd533(0x102)],_0x2f4d19=this['padding'],_0x20ab13=ColorManager[_0xbfd533(0x48e)](),_0x194fff=ColorManager[_0xbfd533(0x5bf)]();_0x2d0670[_0xbfd533(0x4d8)](_0x4ecc2e,_0x41dd31),_0x2d0670[_0xbfd533(0x10c)](0x0,0x0,_0x4ecc2e,_0x2f4d19,_0x194fff,_0x20ab13,!![]),_0x2d0670[_0xbfd533(0x11e)](0x0,_0x2f4d19,_0x4ecc2e,_0x41dd31-_0x2f4d19*0x2,_0x20ab13),_0x2d0670[_0xbfd533(0x10c)](0x0,_0x41dd31-_0x2f4d19,_0x4ecc2e,_0x2f4d19,_0x20ab13,_0x194fff,!![]),this['_dimmerSprite']['setFrame'](0x0,0x0,_0x4ecc2e,_0x41dd31);}},Game_Actor[_0xebc2c6(0x2c3)][_0xebc2c6(0x3a4)]=function(){const _0x3f799d=_0xebc2c6;for(let _0x4bed8a=0x0;_0x4bed8a<this['numActions']();_0x4bed8a++){const _0x1707e5=this['makeActionList']();let _0x32ddeb=Number['MIN_SAFE_INTEGER'];this['setAction'](_0x4bed8a,_0x1707e5[0x0]);for(const _0x4cc910 of _0x1707e5){const _0x5369bd=_0x4cc910[_0x3f799d(0x57c)]();_0x5369bd>_0x32ddeb&&(_0x32ddeb=_0x5369bd,this[_0x3f799d(0x1ec)](_0x4bed8a,_0x4cc910));}}this[_0x3f799d(0xae)](_0x3f799d(0x5c4));},Window_BattleItem[_0xebc2c6(0x2c3)][_0xebc2c6(0x294)]=function(_0x23d2b0){const _0x865785=_0xebc2c6;return BattleManager['actor']()?BattleManager[_0x865785(0x529)]()[_0x865785(0x582)](_0x23d2b0):Window_ItemList['prototype'][_0x865785(0x294)]['call'](this,_0x23d2b0);},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x1d9)]=Scene_Map[_0xebc2c6(0x2c3)]['createSpriteset'],Scene_Map[_0xebc2c6(0x2c3)]['createSpriteset']=function(){const _0x4ca8d6=_0xebc2c6;VisuMZ[_0x4ca8d6(0x71a)][_0x4ca8d6(0x1d9)][_0x4ca8d6(0x32f)](this);const _0x4e1912=this[_0x4ca8d6(0x4be)][_0x4ca8d6(0x713)];if(_0x4e1912)this['addChild'](_0x4e1912);},VisuMZ['CoreEngine'][_0xebc2c6(0x3ea)]=Scene_Battle[_0xebc2c6(0x2c3)][_0xebc2c6(0x1e9)],Scene_Battle['prototype'][_0xebc2c6(0x1e9)]=function(){const _0x1706e8=_0xebc2c6;VisuMZ['CoreEngine']['Scene_Battle_createSpritesetFix'][_0x1706e8(0x32f)](this);const _0x268eef=this[_0x1706e8(0x4be)][_0x1706e8(0x713)];if(_0x268eef)this['addChild'](_0x268eef);},Sprite_Actor['prototype'][_0xebc2c6(0x3a8)]=function(){const _0x29632f=_0xebc2c6;Sprite_Battler['prototype'][_0x29632f(0x3a8)][_0x29632f(0x32f)](this),this['updateShadow']();if(this['_actor'])this[_0x29632f(0x48f)]();else this[_0x29632f(0x571)]!==''&&(this[_0x29632f(0x571)]='');},Window['prototype'][_0xebc2c6(0x589)]=function(){const _0xe94ce5=_0xebc2c6,_0x4eff6d=this[_0xe94ce5(0x554)],_0x495a5f=this['_height'],_0x3617e4=0x18,_0x39e089=_0x3617e4/0x2,_0x3bc484=0x60+_0x3617e4,_0x5547f4=0x0+_0x3617e4;this[_0xe94ce5(0x1c7)][_0xe94ce5(0x2d3)]=this[_0xe94ce5(0x693)],this['_downArrowSprite'][_0xe94ce5(0x490)]['x']=0.5,this[_0xe94ce5(0x1c7)][_0xe94ce5(0x490)]['y']=0.5,this[_0xe94ce5(0x1c7)][_0xe94ce5(0x531)](_0x3bc484+_0x39e089,_0x5547f4+_0x39e089+_0x3617e4,_0x3617e4,_0x39e089),this[_0xe94ce5(0x1c7)][_0xe94ce5(0x603)](Math[_0xe94ce5(0x6b6)](_0x4eff6d/0x2),Math[_0xe94ce5(0x6b6)](_0x495a5f-_0x39e089)),this['_upArrowSprite'][_0xe94ce5(0x2d3)]=this['_windowskin'],this['_upArrowSprite'][_0xe94ce5(0x490)]['x']=0.5,this[_0xe94ce5(0x530)]['anchor']['y']=0.5,this[_0xe94ce5(0x530)][_0xe94ce5(0x531)](_0x3bc484+_0x39e089,_0x5547f4,_0x3617e4,_0x39e089),this[_0xe94ce5(0x530)][_0xe94ce5(0x603)](Math['round'](_0x4eff6d/0x2),Math[_0xe94ce5(0x6b6)](_0x39e089));},Window[_0xebc2c6(0x2c3)][_0xebc2c6(0x74d)]=function(){const _0x241d35=_0xebc2c6,_0x4da110=0x90,_0x56eb3c=0x60,_0x30785c=0x18;this[_0x241d35(0x209)]['bitmap']=this['_windowskin'],this[_0x241d35(0x209)][_0x241d35(0x490)]['x']=0.5,this[_0x241d35(0x209)][_0x241d35(0x490)]['y']=0x1,this[_0x241d35(0x209)]['move'](Math[_0x241d35(0x6b6)](this[_0x241d35(0x554)]/0x2),this[_0x241d35(0x5f1)]),this[_0x241d35(0x209)]['setFrame'](_0x4da110,_0x56eb3c,_0x30785c,_0x30785c),this[_0x241d35(0x209)]['alpha']=0xff;},Window[_0xebc2c6(0x2c3)][_0xebc2c6(0x537)]=function(){const _0x56a554=_0xebc2c6,_0x36782c=this[_0x56a554(0x3a6)][_0x56a554(0x1de)][_0x56a554(0x1ff)](new Point(0x0,0x0)),_0x1034ba=this[_0x56a554(0x3a6)][_0x56a554(0x573)];_0x1034ba['x']=_0x36782c['x']+this['origin']['x'],_0x1034ba['y']=_0x36782c['y']+this[_0x56a554(0x71d)]['y'],_0x1034ba['width']=Math[_0x56a554(0xe3)](this['innerWidth']*this['scale']['x']),_0x1034ba['height']=Math[_0x56a554(0xe3)](this['innerHeight']*this[_0x56a554(0x4b7)]['y']);},Window['prototype'][_0xebc2c6(0x92)]=function(){const _0x188486=_0xebc2c6,_0xc407cc=this['_margin'],_0x33f70c=Math['max'](0x0,this[_0x188486(0x554)]-_0xc407cc*0x2),_0x3bf841=Math[_0x188486(0x631)](0x0,this['_height']-_0xc407cc*0x2),_0x4b34c7=this[_0x188486(0xd9)],_0x1c1ac9=_0x4b34c7[_0x188486(0xea)][0x0];_0x4b34c7['bitmap']=this[_0x188486(0x693)],_0x4b34c7[_0x188486(0x531)](0x0,0x0,0x60,0x60),_0x4b34c7['move'](_0xc407cc,_0xc407cc),_0x4b34c7[_0x188486(0x4b7)]['x']=_0x33f70c/0x60,_0x4b34c7[_0x188486(0x4b7)]['y']=_0x3bf841/0x60,_0x1c1ac9[_0x188486(0x2d3)]=this['_windowskin'],_0x1c1ac9['setFrame'](0x0,0x60,0x60,0x60),_0x1c1ac9[_0x188486(0x603)](0x0,0x0,_0x33f70c,_0x3bf841),_0x1c1ac9['scale']['x']=0x1/_0x4b34c7[_0x188486(0x4b7)]['x'],_0x1c1ac9[_0x188486(0x4b7)]['y']=0x1/_0x4b34c7[_0x188486(0x4b7)]['y'],_0x4b34c7[_0x188486(0x42a)](this[_0x188486(0x4c3)]);},Game_Temp[_0xebc2c6(0x2c3)][_0xebc2c6(0x3f6)]=function(){const _0x30586c=_0xebc2c6;this['_animationQueue']=[],this['_fauxAnimationQueue']=[],this[_0x30586c(0x18f)]=[],this['_balloonQueue']=[];},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x6dc)]=Scene_Base[_0xebc2c6(0x2c3)]['terminate'],Scene_Base[_0xebc2c6(0x2c3)][_0xebc2c6(0x273)]=function(){const _0x15adb7=_0xebc2c6;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ['CoreEngine']['Scene_Base_terminateAnimationClearBugFix'][_0x15adb7(0x32f)](this);},Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x221)]=function(_0x5619de){const _0x4c6394=_0xebc2c6,_0x1a1de4=this[_0x4c6394(0x54b)];_0x1a1de4[_0x4c6394(0x53c)](),_0x1a1de4['font']=this[_0x4c6394(0x3ae)]();const _0x34d8d8=_0x1a1de4[_0x4c6394(0x45e)](_0x5619de)['width'];return _0x1a1de4[_0x4c6394(0xd2)](),_0x34d8d8;},Window_Message[_0xebc2c6(0x2c3)]['textWidth']=function(_0x2855c6){const _0x1651a7=_0xebc2c6;return this[_0x1651a7(0x4ca)]()?this['contents'][_0x1651a7(0x221)](_0x2855c6):Window_Base[_0x1651a7(0x2c3)][_0x1651a7(0x5e1)][_0x1651a7(0x32f)](this,_0x2855c6);},Window_Message['prototype'][_0xebc2c6(0x4ca)]=function(){const _0x3a0040=_0xebc2c6;return VisuMZ['CoreEngine'][_0x3a0040(0x74)][_0x3a0040(0x4b2)]['FontWidthFix']??!![];},VisuMZ['CoreEngine'][_0xebc2c6(0x91)]=Game_Action['prototype'][_0xebc2c6(0x395)],Game_Action[_0xebc2c6(0x2c3)][_0xebc2c6(0x395)]=function(){const _0x3b4763=_0xebc2c6;return this[_0x3b4763(0x405)]()?VisuMZ[_0x3b4763(0x71a)][_0x3b4763(0x91)]['call'](this):0x0;},VisuMZ['CoreEngine']['Game_Action_setAttack']=Game_Action[_0xebc2c6(0x2c3)][_0xebc2c6(0x656)],Game_Action['prototype']['setAttack']=function(){const _0x32ef2f=_0xebc2c6;this[_0x32ef2f(0x356)]()&&this['subject']()[_0x32ef2f(0xe4)]()?VisuMZ['CoreEngine'][_0x32ef2f(0x10d)][_0x32ef2f(0x32f)](this):this[_0x32ef2f(0x6c0)]();},Sprite_Name[_0xebc2c6(0x2c3)]['bitmapHeight']=function(){return 0x24;},Sprite_Name['prototype'][_0xebc2c6(0x31a)]=function(){const _0x16bc16=_0xebc2c6,_0x12d23c=this['name'](),_0x4bfd29=this[_0x16bc16(0x508)](),_0x1a64ab=this['bitmapHeight']();this[_0x16bc16(0x661)](),this[_0x16bc16(0x2d3)][_0x16bc16(0x6c0)](),this[_0x16bc16(0x2d3)][_0x16bc16(0x5d5)](_0x12d23c,0x0,0x0,_0x4bfd29,_0x1a64ab,_0x16bc16(0x4b0));},Bitmap[_0xebc2c6(0x2c3)][_0xebc2c6(0x5d5)]=function(_0x96fa40,_0x200c88,_0x3541c3,_0x2eb96e,_0x4b7421,_0x319958){const _0x2af8c4=_0xebc2c6,_0x1be474=this[_0x2af8c4(0x54b)],_0x298df4=_0x1be474[_0x2af8c4(0x374)];_0x2eb96e=_0x2eb96e||0xffffffff;let _0x2b7b4d=_0x200c88,_0x1145b4=Math[_0x2af8c4(0x6b6)](_0x3541c3+0x18/0x2+this['fontSize']*0.35);_0x319958===_0x2af8c4(0x4fe)&&(_0x2b7b4d+=_0x2eb96e/0x2),_0x319958===_0x2af8c4(0x63b)&&(_0x2b7b4d+=_0x2eb96e),_0x1be474['save'](),_0x1be474['font']=this[_0x2af8c4(0x3ae)](),_0x1be474['textAlign']=_0x319958,_0x1be474['textBaseline']=_0x2af8c4(0x416),_0x1be474[_0x2af8c4(0x374)]=0x1,this[_0x2af8c4(0x681)](_0x96fa40,_0x2b7b4d,_0x1145b4,_0x2eb96e),_0x1be474[_0x2af8c4(0x374)]=_0x298df4,this[_0x2af8c4(0x426)](_0x96fa40,_0x2b7b4d,_0x1145b4,_0x2eb96e),_0x1be474['restore'](),this[_0x2af8c4(0x330)][_0x2af8c4(0x3a8)]();},VisuMZ[_0xebc2c6(0x71a)][_0xebc2c6(0x724)]=BattleManager[_0xebc2c6(0x1f1)],BattleManager[_0xebc2c6(0x1f1)]=function(_0x10cea1){const _0xf204bc=_0xebc2c6;if(this['_action'][_0xf204bc(0xdc)]())return![];return VisuMZ['CoreEngine'][_0xf204bc(0x724)][_0xf204bc(0x32f)](this,_0x10cea1);},BattleManager['endAction']=function(){const _0x245341=_0xebc2c6;if(this[_0x245341(0x167)])this[_0x245341(0x104)][_0x245341(0x314)](this[_0x245341(0x167)]);this[_0x245341(0x5fd)]='turn',this[_0x245341(0x167)]&&this[_0x245341(0x167)][_0x245341(0x3f3)]()===0x0&&(this[_0x245341(0x469)](this[_0x245341(0x167)]),this['_subject']=null);};function _0x52dd(){const _0x5df646=['NEAREST','add','setupRate','xdg-open','targetBackOpacity','baseId','NumberRect','setAnchor','IconParam5','setSideButtonLayout','WIN_ICO_HELP','helpAreaHeight','padding','》Comment《\x0a%1\x0a','DigitGroupingGaugeSprites','IconXParam1','Plus1','DataManager_setupNewGame','ShowDevTools','onButtonImageLoad','ALWAYS','DECIMAL','isGamepadTriggered','_targetAnchor','SystemSetFontSize','Scene_Unlisted','isActiveTpb','applyCoreEasing','parameters','round','_windowLayer','targetScaleY','smooth','enter','helpAreaTop','SubfolderParse','repositionEnemiesByResolution','itemWindowRect','_skillTypeWindow','clear','_stored_expGaugeColor1','_stored_deathColor','_changingClass','_pictureContainer','Type','onKeyDownKeysF6F7','TextCodeNicknames','Actor','platform','Sprite_Gauge_gaugeRate','xparam','ColorGaugeBack','ARRAYFUNC','Scene_Status_create','up2','SUBTRACT','moveCancelButtonSideButtonLayout','_stored_expGaugeColor2','setupNewGame','Game_Interpreter_command122','Scene_Item_create','isNextScene','updatePositionCoreEngine','operation','createPageButtons','getInputButtonString','Name','Scene_Base_terminateAnimationClearBugFix','Scene_Map_createMenuButton','playCancel','drawCharacter','_targetScaleX','GoldOverlap','STRUCT','jsonToZip','TextJS','DATABASE','HIT','Scene_Name_onInputOk','getBattleSystem','axes','commandWindowRect','isOpen','_stored_tpGaugeColor1','F21','Weapon-%1-%2','CONTEXT_MENU','isInstanceOfSceneMap','_dummyWindow','ColorCTGauge1','_colorCache','ALT','includes','_cacheScaleX','paramchangeTextColor','itemBackColor2','optSideView','iconWidth','indexOf','drawFace','_index','outlineColorDmg','DamageColor','Spriteset_Base_update','sv_enemies','_offsetX','CategoryBgType','Scene_GameEnd_createBackground','crisisColor','CRSEL','isSpecialCode','batch','actorWindowRect','toUpperCase','0.00','GREATER_THAN','isSceneMap','addEventListener','random','push','itypeId','targetX','_timerSprite','key%1','STENCIL_TEST','maxLvGaugeColor2','createButtonAssistWindow','updateFauxAnimations','createChildSprite','CoreEngine','onInputBannedWords','KeyTAB','origin','IconXParam2','makeCoreEngineCommandList','CEV','setGuard','_isWindow','DTB','BattleManager_checkSubstitute','requestMotion','drawValue','offsetY','openURL','Input_updateGamepadState','onMoveEnd','LESS_THAN','jsQuickFunc','isPlaytest','OutlineColor','SlotBgType','ItemBgType','learnings','onNameOk','isSideButtonLayout','OUTEXPO','paramWidth','Rate2','%2%1%3','getCoreEngineScreenShakeStyle','sparamPlus','strokeRect','DashToggleR','updateOrigin','_scaleY','LineHeight','Item-%1-%2','isNormalPriority','xparamFlatJS','_buttonAssistWindow','contentsBack','ExportStrFromAllMaps','ShopMenu','makeFontSmaller','command122','TAB','length','AccuracyBoost','MenuLayout','RepositionActors','_refreshPauseSign','DigitGroupingDamageSprites','isCancelled','processCursorMove','getPointAnimationLayer','Game_Picture_updateMove','removeChild','send','Sprite_Animation_processSoundTimings','Scene_Base_create','pagedown','ShowButtons','getLevel','startNormalGame','Settings','ctrl','ZERO','_screenY','applyEasing','ColorMPCost','RPGMAKER_VERSION','_commonEventLayers','_encounterCount','drawGameTitle','Window_Gold_refresh','ExportStrFromAllTroops','buttonY','isKeyItem','renderNoMask','Window_NumberInput_start','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','HelpBgType','PHA','updateClose','Window_NameInput_processHandling','_slotWindow','paramPlus','xparamPlus2','menuShowButton','SEMICOLON','drawParamText','reduce','Scene_Skill_create','Game_Action_numRepeats','_refreshBack','horzJS','exportAllMapStrings','BTestAddedQuantity','itemLineRect','clearStencil','SCALE_MODES','LoadError','params','_shakeSpeed','Tilemap_addShadow','_opening','isMenuButtonAssistEnabled','SideView','commandWindowRows','CommandList','isItem','ParseWeaponNotetags','createPointAnimationQueue','CommandWidth','enableDigitGrouping','\x20Origin:\x20%1','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','process_VisuMZ_CoreEngine_CustomParameters','setLastGamepadUsed','Scene_Map_updateMain','sparamRateJS','fadeSpeed','setActionState','isMVAnimation','paramMax','playEscape','reservePlayTestNewGameCommonEvent','40945JETrhx','_effectsContainer','centerSprite','ExportCurMapText','BattleSystem','getGamepads','process_VisuMZ_CoreEngine_Functions','updatePictureCoordinates','%1%2','_anchor','Scene_Battle_createSpriteset','INOUTCUBIC','isFullDocumentTitle','levelUpRecovery','AutoStretch','BasicParameterFormula','IconXParam6','down','loadGameImagesCoreEngine','ATTN','SkillMenu','INOUTQUART','Match','Input_pollGamepads','animations','calcCoreEasing','INOUTEXPO','inBattle','setLastPluginCommandInterpreter','HOME','windowOpacity','restore','_actor','updatePositionCoreEngineShakeHorz','PTB','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','keyMapper','loadMapData','_backSprite','maxBattleMembers','SParamVocab9','isForFriend','_lastPluginCommandInterpreter','drawActorSimpleStatus','ActorMPColor','ItemHeight','initBasic','sparamFlat1','ceil','canAttack','onDatabaseLoaded','initCoreEngine','IconParam3','SwitchToggleRange','setMoveEasingType','children','CTRL','pictures','PictureEraseRange','EVAL','ItemBackColor1','PixelateImageRendering','SideButtons','encounterStep','quit','_actorWindow','SParamVocab2','moveRelativeToResolutionChange','Scene_Map_initialize','MAXMP','forceStencil','advanced','Bitmap_gradientFillRect','Total','Enable','_stored_normalColor','NUMPAD8','EncounterRateMinimum','PDR','height','_targetY','_logWindow','Keyboard','XParamVocab2','cursorLeft','Window_Base_drawFace','drawText','getBackgroundOpacity','SwitchToggleOne','gradientFillRect','Game_Action_setAttack','itemBackColor1','_commandWindow','optionsWindowRect','ColorExpGauge2','BattleManager_processEscape','$dataMap','events','KEEP','rightArrowWidth','\x5c}❪SHIFT❫\x5c{','GoldRect','clearZoom','ENTER_SPECIAL','Scene_Name_create','titles2','_profileWindow','fillRect','resetFontSettings','%1〘End\x20Choice\x20Selection〙%1','Game_Picture_calcEasing','updateScene','SceneManager_initialize','_dimmerSprite','floor','SceneManager_isGameActive','Scene_Options_create','Game_Interpreter_command111','getCustomBackgroundSettings','categoryWindowRect','CTB','ParseActorNotetags','ParseTilesetNotetags','Troop%1','currentValue','characters','hpGaugeColor2','_troopId','ScreenResolution','min','createCommandWindow','BTestItems','AGI','processTimingData','Abbreviation','PLUS','offsetX','isPlaying','OkText','abs','Bitmap_resize','ProfileBgType','profileWindowRect','updatePositionCoreEngineShakeRand','createFauxAnimationQueue','DummyRect','INOUTSINE','processAlwaysEscape','startAutoNewGame','addChild','_targetOpacity','EISU','ActorTPColor','_hovered','ModernControls','AllTroops','Smooth','updateEffekseer','TGR','sparamRate1','<JS\x20%1\x20%2:[\x20](.*)>','BgFilename2','charCode','loadPicture','sin','targets','backgroundBitmap','_registerKeyInput','loadTitle2','BuyBgType','level','ListRect','createDimmerSprite','buttonAssistOffset1','1077HPBthO','_context','Armor-%1-%2','img/%1/','concat','MapNameTextCode','_subject','Spriteset_Base_updatePosition','command357','Window_ShopSell_isEnabled','ColorHPGauge1','_CoreEngineSettings','Flat','F19','StatusEquipRect','innerHeight','areButtonsOutsideMainUI','Window_StatusBase_drawActorLevel','updatePictureAntiZoom','ParamArrow','drawItem','getButtonAssistLocation','ExportAllTroopText','createMenuButton','FINAL','Game_Interpreter_updateWaitMode','LUK','428AmgQwD','TCR','1.4.4','_stored_gaugeBackColor','playCursorSound','buttonAssistKey%1','Window_Selectable_processTouch','setViewport','createPointAnimationSprite','F23','skipBranch','CLOSE_CURLY_BRACKET','AnimationID','Window_Selectable_cursorUp','EXECUTE','get','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setClickHandler','FUNC','_pointAnimationQueue','setEasingType','picture','en-US','ShowItemBackground','StatusParamsBgType','_battleField','Location','updateCurrentEvent','_offsetY','editWindowRect','ExtJS','processKeyboardDelete','ParseItemNotetags','drawCircle','tileWidth','paramRate','mpCostColor','initVisuMZCoreEngine','MultiKeyFmt','IconParam1','updatePlayTestF7','buttonAreaHeight','processBack','blt','iconHeight','NUMPAD4','isMagical','erasePicture','DetachMapPictureContainer','tpCostColor','process_VisuMZ_CoreEngine_Settings','4387020qHnEEN','blendFunc','WIN_OEM_WSCTRL','_playtestF7Looping','DOWN','OTB','_editWindow','isClosed','Bitmap_drawTextOutline','volume','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','Scene_Map_updateScene','Window_NameInput_cursorPagedown','processKeyboardHandling','outlineColorGauge','setupButtonImage','_active','start','requiredWtypeId1','NUM','windowPadding','repeat','playTestCtrlT','createCustomParameter','_downArrowSprite','MAT','EQUALS','Icon','list','clamp','ColorHPGauge2','_sellWindow','paramBaseAboveLevel99','maxCols','meVolume','Game_Picture_y','isTriggered','repositionCancelButtonSideButtonLayout','Max','parse','itemEva','catchLoadError','Scene_Map_createSpritesetFix','Scene_MenuBase_createPageButtons','_digitGrouping','36ZnfmBs','initialize','worldTransform','Game_Character_processMoveCommand','ColorMaxLvGauge1','_statusWindow','playOnceParallelInterpreter','Game_Event_start','MenuBg','QwertyLayout','XParameterFormula','addWindow','updateTransform','createSpriteset','isGamepadConnected','_movementDuration','setAction','checkSmartEventCollision','Graphics_centerElement','BackOpacity','EQUAL','checkSubstitute','type','TRG','helpWindowRect','Scene_Boot_loadSystemImages','STB','_targets','_buyWindow','Window','PictureCoordinatesMode','createDigits','drawRightArrow','VOLUME_UP','IconSet','apply','ALTGR','initCoreEngineScreenShake','CommandBgType','_inputString','RequireFocus','Game_Interpreter_command105','EXCLAMATION','processSoundTimings','transform','_pauseSignSprite','width','EndingID','isCursorMovable','〘Common\x20Event\x20%1:\x20%2〙\x20Start','ParseSkillNotetags','nah','SkillTypeBgType','Game_Actor_changeClass','Game_Map_setup','fontSize','ColSpacing','PA1','clone','retreat','remove','Window_Base_initialize','setEnemyAction','ParseEnemyNotetags','isFauxAnimationPlaying','X:\x20%1','ColorCrisis','Mirror','isSideView','measureTextWidthNoRounding','buttonAssistOffset5','isHandled','ParseArmorNotetags','imageSmoothingEnabled','(\x5cd+)([%％])>','stypeId','stencilOp','requestPointAnimation','SLEEP','Window_Selectable_drawBackgroundRect','Exported_Script_%1.txt','FunctionName','IconSParam7','_shakePower','TextManager_param','setCommonEvent','3802nJxzHJ','Spriteset_Base_isAnimationPlaying','IconXParam4','createEnemies','drawActorExpGauge','WindowLayer_render','Scene_Map_update','showPicture','clipboard','Window_Selectable_cursorDown','loadIconBitmap','ONE_MINUS_SRC_ALPHA','_addShadow','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','_mainSprite','powerUpColor','log','child_process','updateData','Spriteset_Base_initialize','setupCustomRateCoreEngine','boxHeight','_isButtonHidden','buttonAssistOffset2','_currentMap','NewGameCommonEvent','CAPSLOCK','addOnceParallelInterpreter','getColorDataFromPluginParameters','Window_NameInput_cursorRight','F22','drawIcon','buttonAssistText3','randomJS','isAnimationPlaying','isAlive','GroupDigits','SEPARATOR','OnLoadJS','Map%1','ARRAYEVAL','pictureButtons','PreserveNumbers','GET','_forcedTroopView','itemPadding','Window_Base_drawText','_pictureName','\x5c}❪TAB❫\x5c{','DOLLAR','OUTQUAD','ColorPowerDown','calcEasing','SkillTypeRect','createWindowLayer','horizontal','_numberWindow','pageup','button','IconParam4','adjustBoxSize','_targetScaleY','pendingColor','isOptionValid','AnimationPoint','terminate','Show\x20Scrolling\x20Text\x20Script\x20Error','ParseAllNotetags','Window_Base_createTextState','LATIN1','exec','RegExp','getKeyboardInputButtonString','paramFlatJS','_cancelButton','HYPHEN_MINUS','onInputOk','EditBgType','updateLastTarget','toLowerCase','_rate','initialLevel','_forcedBattleSys','playCursor','SlotRect','ARRAYJSON','GoldBgType','XParamVocab4','terms','MRF','ApplyEasing','object','expParams','rgba(0,\x200,\x200,\x201.0)','CustomParamNames','buttonAssistKey5','smallParamFontSize','changeClass','isEnabled','BaseTexture','BannedWords','StatusMenu','startAnimation','xScrollLinkedOffset','_number','EXR','Manual','_digitGroupingEx','_animation','PRINT','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','attackSkillId','goldWindowRect','clearOnceParallelInterpreters','Color','getLastUsedGamepadType','INQUAD','menu','pages','title','OptionsMenu','command105','buttonAssistText5','createJsQuickFunction','([\x5c+\x5c-]\x5cd+)([%％])>','Game_Party_consumeItem','Conditional\x20Branch\x20Script\x20Error','displayY','Scene_Shop_create','Wait','index','sqrt','RightMenus','INBACK','position','_customModified','createKeyJS','WIN_OEM_AUTO','isBottomButtonMode','MINUS','Window_NameInput_cursorUp','_backSprite1','Window_Base_drawIcon','REC','popScene','prototype','ButtonHeight','buttonAssistText1','QUOTE','outlineColor','setActorHomeRepositioned','inputWindowRect','cursorPagedown','cursorPageup','updateCoreEasing','ARRAYSTRUCT','App','eva','shift','OptionsBgType','GoldIcon','bitmap','createTroopNote','easingType','onClick','resetBattleSystem','map','faceWidth','targetSpritePosition','isMaxLevel','PGDN','BlendMode','TextFmt','mhp','_stored_powerDownColor','ColorCTGauge2','Symbol','PIPE','drawActorClass','CLEAR','_origin','requestFauxAnimation','setValue','Bitmap_strokeRect','MDF','itemHeight','battlebacks2','DummyBgType','render','Scene_Equip_create','playBuzzer','defineProperty','active','IconParam2','listWindowRect','onLoad','XParamVocab8','note','DETACH_PICTURE_CONTAINER','bitmapHeight','TILDE','〘Show\x20Text〙\x0a','isArrowPressed','ButtonFadeSpeed','drawBackground','evade','Chance','processTouch','buttonAssistOk','SParamVocab6','_lastGamepad','damageColor','LevelUpFullHp','buttons','value','_backgroundSprite','_shakeDuration','AnimationMirrorOffset','pictureId','_fauxAnimationSprites','process_VisuMZ_CoreEngine_ControllerButtons','Window_NumberInput_processDigitChange','VisuMZ_2_BattleSystemSTB','TRAIT_PARAM','buttonAssistOffset4','AllMaps','endAction','keyboard','NUMPAD2','process_VisuMZ_CoreEngine_RegExp','Linear','_pollGamepads','redraw','padZero','TranslucentOpacity','adjustSprite','RepositionEnemies','processKeyboardHome','BgType','xparamPlusJS','_mapNameWindow','Scene_Base_terminate','XParamVocab5','doesNameContainBannedWords','targetScaleX','useDigitGroupingEx','blockWidth','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','ATK','result','drawGameSubtitle','setMute','Game_Picture_initBasic','call','_baseTexture','updateAnchor','TPB\x20ACTIVE','DigitGroupingStandardText','Scene_Boot_updateDocumentTitle','_lastOrigin','setupValueFont','xparamRate2','drawGameVersion','〘Common\x20Event\x20%1:\x20%2〙\x20End','BlurFilter','contentsOpacity','GoldMax','_coreEngineShakeStyle','end','normal','innerWidth','_stored_hpGaugeColor2','enemies','deathColor','nw.gui','normalColor','removeOnceParallelInterpreter','ExtractStrFromTroop','VisuMZ_2_BattleSystemFTB','encounterStepsMinimum','switchModes','Scene_MenuBase_mainAreaHeight','showPointAnimations','drawGauge','Game_Troop_setup','clearRect','SwitchActorText','cursorDown','duration','hit','Scene_Menu_create','WIN_OEM_PA2','subject','AMPERSAND','_buttonType','updateOpen','5193950gOfadg','WASD','Key%1','gameTitle','WIN_OEM_ATTN','background','mainAreaTopSideButtonLayout','MAX_GL_TEXTURES','isExpGaugeDrawn','initCoreEasing','onKeyDown','VariableJsBlock','INSERT','Window_NameInput_cursorLeft','MAX_SAFE_INTEGER','drawTextEx','MULTIPLY','_cache','IconXParam9','focus','initMembers','_pressed','ShowJS','boxWidth','INCIRC','Scene_Map_createSpriteset','globalAlpha','PRESERVCONVERSION(%1)','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','TextStr','IconSParam0','VisuMZ_1_BattleCore','isNwjs','_shouldPreventDefault','exp','_stored_systemColor','buttonAssistOffset%1','nickname','Bitmap_initialize','Upper\x20Left','F18','OpenConsole','scaleMode','F17','movePageButtonSideButtonLayout','startMove','_moveEasingType','_sideButtonLayout','Skill-%1-%2','buttonAssistKey3','WIN_OEM_BACKTAB','DELETE','isGamepadButtonPressed','skillId','Game_Action_updateLastTarget','initialBattleSystem','mapId','updateMain','isPointAnimationPlaying','numRepeats','ExtractStrFromMap','WIN_OEM_FINISH','ControllerButtons','ETB','updatePositionCoreEngineShakeVert','option','xparamPlus','_stored_mpGaugeColor2','SELECT','BottomButtons','VOLUME_MUTE','paramFlat','pop','PRINTSCREEN','makeAutoBattleActions','textColor','_clientArea','Plus2','update','isWindowMaskingEnabled','statusEquipWindowRect','equips','open','PictureID','_makeFontNameText','_hideTileShadows','Window_EquipItem_isEnabled','addChildToBack','paramRate1','KeyUnlisted','BgFilename1','randomInt','processKeyboardDigitChange','NUMPAD6','Window_NameInput_cursorDown','isCollidedWithEvents','Y:\x20%1','SHIFT','DigitGroupingLocale','displayName','GoldFontSize','xparamRate1','paramRateJS','subtitle','_closing','CRI','TimeProgress','getCombinedScrollingText','WIN_OEM_FJ_ROYA','SystemLoadImages','dummyWindowRect','ExtractStrFromList','_categoryWindow','pow','isGameActive','makeFontBigger','Sprite_Animation_setViewport','default','successRate','fillText','_stored_crisisColor','buttonAssistKey4','Flat2','evaded','IconSParam5','Sprite_Picture_loadBitmap','Renderer','Opacity','buttonAssistKey1','removeAllFauxAnimations','mainAreaHeight','NONCONVERT','operand','Scene_Map_updateMainMultiply','_menuButton','_setupEventHandlers','_tilemap','ValueJS','FadeSpeed','ScaleY','ColorSystem','cursorUp','param','updatePadding','Scene_Battle_createSpritesetFix','ColorPowerUp','paramRate2','KANA','paramY','Window_NameInput_processTouch','sparamPlusJS','_createInternalTextures','Bitmap_drawCircle','numActions','processCursorMoveModernControls','WIN_OEM_JUMP','sceneTerminationClearEffects','_hp','down2','match','_coreEasing','OUTSINE','consumeItem','CONVERT','setBattleSystem','adjustPictureAntiZoom','sparam','CNT','ScreenShake','IconXParam0','Sprite_Gauge_currentValue','item','ParseClassNotetags','Game_BattlerBase_initMembers','_updateGamepadState','isActor','buttonAssistWindowSideRect','printError','helpAreaTopSideButtonLayout','DrawIcons','createTextState','F12','_defaultStretchMode','playTestF6','DIVIDE','toString','ExportString','titles1','alphabetic','code','setup','PERCENT','_hideButtons','_backgroundFilter','SParamVocab7','PictureShowIcon','processPointAnimationRequests','updateKeyText','IconSParam3','WIN_OEM_PA3','_inputSpecialKeyCode','ONE','measureTextWidth','SLASH','_drawTextBody','filter','clearForcedGameTroopSettingsCoreEngine','CrisisRate','setColorTone','CANCEL','paramBase','isMapScrollLinked','PositionJS','setHandler','process_VisuMZ_CoreEngine_Notetags','HelpRect','processKeyboardEnd','usableSkills','smoothSelect','IconSParam9','_statusEquipWindow','setSideView','Graphics_defaultStretchMode','_clickHandler','OPEN_CURLY_BRACKET','1.3.0','number','VisuMZ_1_OptionsCore','Sprite_Actor_setActorHome','xparamFlatBonus','rowSpacing','CIRCUMFLEX','expGaugeColor2','NumberBgType','Class-%1-%2','_onceParallelInterpreters','OutlineColorDmg','areButtonsHidden','responseText','_goldWindow','gold','Input_shouldPreventDefault','_storedStack','BTestWeapons','contents','ARRAYNUM','STENCIL_BUFFER_BIT','setCoreEngineUpdateWindowBg','bgmVolume','moveMenuButtonSideButtonLayout','mute','setMainFontSize','AntiZoomPictures','stretch','META','etypeId','catchUnknownError','allowShiftScrolling','_stored_pendingColor','version','measureText','_stored_hpGaugeColor1','TitleCommandList','updatePosition','_targetOffsetX','parseForcedGameTroopSettingsCoreEngine','KeyboardInput','shake','Game_Temp_initialize','UpdatePictureCoordinates','lineHeight','endBattlerActions','isItemStyle','Bitmap_measureTextWidth','toFixed','VisuMZ_2_BattleSystemOTB','createBackground','traitObjects','snapForBackground','PictureEraseAll','getLastPluginCommandInterpreter','ASTERISK','none','Plus','paramValueByName','updateMove','mainFontSize','tilesets','StatusBgType','SParameterFormula','MvAnimationRate','bgm','bgsVolume','createCustomBackgroundImages','INSINE','powerDownColor','Actor-%1-%2','ForceNoPlayTest','_pagedownButton','_destroyInternalTextures','BACKSPACE','faces','initButtonHidden','exit','Spriteset_Base_destroy','changeTextColor','Sprite_Button_updateOpacity','SellRect','dimColor1','updateMotion','anchor','currentClass','numberWindowRect','#%1','CommandRect','_list','gaugeRate','hideButtonFromView','hpColor','subjectHitRate','setBackgroundType','CustomParamIcons','Title','Flat1','pagedownShowButton','image-rendering','removePointAnimation','forceOutOfPlaytest','_pointAnimationSprites','IconXParam7','xparamFlat1','ParamChange','_playTestFastMode','connected','makeCommandList','INCUBIC','refreshWithTextCodeSupport','NameInputMessage','_drawTextShadow','DOUBLE_QUOTE','CategoryRect','makeDocumentTitle','left','filters','QoL','Scene_Boot_onDatabaseLoaded','ctGaugeColor1','paramFlatBonus','OUTCIRC','scale','Game_Interpreter_command355','Page','Subtitle','sparamRate','FTB','getColor','_spriteset','command111','ExportAllMapText','LevelUpFullMp','isAnimationForEach','_colorTone','gainItem','SceneManager_exit','BottomHelp','DefaultMode','Param','font-smooth','useFontWidthFix','enemy','DimColor1','performMiss','getControllerInputButtonMatch','displayX','name','playMiss','_baseSprite','refresh','ItemRect','trim','Rate1','TPB\x20WAIT','resize','F13','GRD','targetObjects','SParamVocab1','alwaysDash','expRate','enableDigitGroupingEx','isGamepadAxisMoved','atbActive','buttonAssistWindowRect','_pictureCoordinatesWindow','ExtDisplayedParams','_scene','showFauxAnimations','Game_Picture_x','processKeyboardBackspace','Scene_MenuBase_createCancelButton','isSceneBattle','Input_onKeyDown','updateWaitMode','performEscape','CustomParamAbb','translucentOpacity','cos','Input_clear','_coreEasingType','drawCurrentParam','_listWindow','_optionsWindow','CustomParam','isMaskingEnabled','SCROLL_LOCK','DefaultStyle','itemHit','RIGHT','mainAreaHeightSideButtonLayout','paramPlusJS','center','levelUp','split','useDigitGrouping','hpGaugeColor1','drawActorNickname','INQUART','INOUTCIRC','system','ImprovedAccuracySystem','bitmapWidth','setupCoreEngine','Scene_Battle_createSpriteset_detach','_itemWindow','ShortcutScripts','EscapeAlways','textSizeEx','VisuMZ_2_BattleSystemCTB','_statusParamsWindow','WIN_OEM_RESET','ColorMaxLvGauge2','paramName','_lastX','NUMPAD0','ConvertParams','_pageupButton','backspace','drawBackgroundRect','(\x5cd+\x5c.?\x5cd+)>','targetEvaRate','F15','JSON','RevertPreserveNumbers','test','Scene_Battle_update','_stored_ctGaugeColor2','retrievePointAnimation','Spriteset_Battle_createEnemies','writeFile','updateOnceParallelInterpreters','KeyItemProtect','isEnemy','setSize','actor','Scene_Battle_createCancelButton','cancel','sparamRate2','makeTargetSprites','showDevTools','Unnamed','_upArrowSprite','setFrame','applyForcedGameTroopSettingsCoreEngine','IconSParam4','rgba(0,\x200,\x200,\x200.7)','mirror','isTpb','_updateFilterArea','CallHandlerJS','gainGold','xparamRate','ImgLoad','save','missed','Window_NameInput_cursorPageup','drawIconBySize','backOpacity','stencilFunc','process_VisuMZ_CoreEngine_jsQuickFunctions','Sprite_Battler_startMove','_commandList','MCR','escape','targetContentsOpacity','HRG','create','STR','context','6429720EeTSwn','Window_Base_drawCharacter','BACK_SLASH','SceneManager_onKeyDown','processDigitChange','originalJS','_duration','(\x5cd+)>','_width','reserveCommonEvent','〘Scrolling\x20Text〙\x0a','uiAreaHeight','helpAreaBottom','charAt','Bitmap_clearRect','createCancelButton','F24','SParamVocab4','stringKeyMap','processEscape','Scene_Boot_startNormalGame','textHeight','drawGoldItemStyle','bind','ListBgType','top','_helpWindow','openness','cancelShowButton','CreateBattleSystemID','Bitmap_drawText','isPressed','DrawItemBackgroundJS','_maxDigits','_data','windowRect','Gold','_battlerName','loadSystem','filterArea','valueOutlineColor','WIN_ICO_00','Game_System_initialize','KeySHIFT','_onKeyDown','setTargetAnchor','ColorManager_loadWindowskin','contains','evaluate','EnableMasking','string','Window_NameInput_refresh','NUMPAD9','gaugeBackColor','canUse','flush','setWindowPadding','enable','animationBaseDelay','createFauxAnimationSprite','ARRAYSTR','_refreshArrows','overrideMimeType','Game_Action_itemHit','InputRect','uiAreaWidth','isRightInputMode','%1/','createFauxAnimation','endAnimation','battlebacks1','markCoreEngineModified','onXhrError','_fauxAnimationQueue','buttonAssistOffset3','targetY','BoxMargin','IDs','Game_Picture_show','home','OutlineColorGauge','Sprite_AnimationMV_updatePosition','setCoreEngineScreenShakeStyle','currentLevelExp','_onKeyPress','isRepeated','EVA','\x0a\x0a\x0a\x0a\x0a','setSkill','Duration','ColorTPGauge2','deselect','exportAllTroopStrings','outbounce','WIN_OEM_FJ_LOYA','LEFT','keyCode','_cacheScaleY','animationNextDelay','XParamVocab3','targetPosition','toLocaleString','_inputWindow','_stored_tpCostColor','Mute','StatusRect','Graphics_printError','tab','Map%1.json','setHome','Game_Picture_move','playLoad','SnapshotOpacity','buttonAssistSwitch','skillTypeWindowRect','dimColor2','Window_MapName_refresh','NUMPAD5','isInputting','itemRect','waiting','_muteSound','canEquip','bgs','playOk','FontSize','_paramPlus','setViewportCoreEngineFix','Scene_MenuBase_mainAreaTop','currencyUnit','format','Script\x20Call\x20Error','_screenX','setupCoreEasing','Scene_Base_createWindowLayer','destroy','DEF','drawTextTopAligned','join','coreEngineRepositionEnemies','Padding','WIN_OEM_CLEAR','runCombinedScrollingTextAsCode','alignBottom','ctrlKey','loadWindowskin','DisplayedParams','paramMaxJS','wtypeId','textWidth','OptionsRect','select','_backSprite2','_realScale','onEscapeSuccess','isUseModernControls','visible','areTileShadowsHidden','IconIndex','RowSpacing','processFauxAnimationRequests','reserveNewGameCommonEvent','VisuMZ_2_BattleSystemETB','VisuMZ_2_BattleSystemBTB','SystemSetWindowPadding','_height','WIN_ICO_CLEAR','IconParam6','isBottomHelpMode','Window_NameInput_initialize','maxLevel','VisuMZ_2_BattleSystemPTB','_repositioned','Sprite_Picture_updateOrigin','keypress','addCommand','layoutSettings','_phase','addLoadListener','writeText','data/','dashToggle','battleSystem','move','updateMainMultiply','ScaleX','XParamVocab7','DigitGroupingExText','slotWindowRect','IconParam7','MDR','resetTextColor','storeMapData','parallaxes','GameEnd','drawSegment','FDR','Game_Action_itemEva','Window_StatusBase_drawActorSimpleStatus','replace','fromCharCode','vertJS','GoldChange','style','_pictureCoordinatesMode','COMMA','checkCacheKey','DebugConsoleLastControllerID','destroyCoreEngineMarkedBitmaps','Scene_Map_createSpriteset_detach','mainCommandWidth','startShake','updateDashToggle','integer','IconSParam8','processMoveCommand','buttonAssistText4','cursorRight','buttonAssistWindowButtonRect','BattleManager_update','createPointAnimationTargets','_storedMapText','Window_Selectable_itemRect','_target','mainAreaTop','getInputMultiButtonStrings','_bitmap','ExportCurTroopText','EREOF','max','Game_Event_isCollidedWithEvents','determineSideButtonLayoutValid','sellWindowRect','initDigitGrouping','PAUSE','StartID','framebuffer','maxItems','skills','right','Bitmap_blt','asin','INOUTELASTIC','Game_Interpreter_PluginCommand','Rate','seVolume','ButtonAssist','_movementWholeDuration','_scaleX','Untitled','substring','paramX','SmartEventCollisionPriority','COLON','Game_Actor_levelUp','targetOpacity','text','opacity','WIN_OEM_FJ_MASSHOU','MainMenu','StatusParamsRect','updateOpacity','MapOnceParallel','catchException','buttonAssistCancel','GetParamIcon','setAttack','Sprite_Button_initialize','itemHitImprovedAccuracy','systemColor','596988nxzxMp','processCursorHomeEndTrigger','autoRemovalTiming','_mode','CLOSE_BRACKET','F14','command355','setupFont','Sprite_AnimationMV_processTimingData','Window_Selectable_processCursorMove','ActorBgType','Window_Base_update','_gamepadWait','createTitleButtons','MAXHP','dropItems','ESC','ActorRect','statusWindowRect','MRG','WIN_OEM_PA1','expGaugeColor1','isAnimationOffsetXMirrored','mainAreaBottom','EnableJS','_mp','DetachBattlePictureContainer','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','createBuffer','gaugeLineHeight','loadBitmap','Sprite_destroy','BTB','processHandling','isNumpadPressed','getControllerInputButtonString','QUESTION_MARK','isPhysical','constructor','_drawTextOutline','maxLvGaugeColor1','%1:\x20Exit\x20','text%1','ItemMenu','5467966uzDwwR','vertical','updatePointAnimations','CustomParamType','ColorTPCost','removeFauxAnimation','EnableNameInput','registerCommand','tpGaugeColor2','INBOUNCE','OPEN_BRACKET','ParseStateNotetags','ControllerMatches','_windowskin','MEV','_targetX','%1〘Choice\x20%2〙\x20%3%1','([\x5c+\x5c-]\x5cd+)>','Enemy-%1-%2'];_0x52dd=function(){return _0x5df646;};return _0x52dd();}