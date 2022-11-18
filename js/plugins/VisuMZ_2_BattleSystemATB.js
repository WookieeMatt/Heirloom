//=============================================================================
// VisuStella MZ - Battle System ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.23;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.23] [BattleSystemATB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_ATB_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The RPG Maker MZ Time Progress Battle (TPB) system is only a few steps away
 * from the acclaimed Active Turn Battle (ATB) system. This plugin will grant
 * it the various features needed to turn it from TPB into ATB.
 * 
 * This plugin will grant control over how the various mechanics work, ranging
 * from penalties to calculations, to actions that can manipulate the ATB gauge
 * of battlers. Battlers that are in the middle of casting a spell can also be
 * interrupted with specific notetag traits.
 * 
 * ATB Gauges can also be displayed on enemies and/or allies, giving the player
 * full access to the current battle state. The ATB Gauges are also improved,
 * showing different colors for different states and showing a new gauge for
 * the casting state.
 * 
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB/ATB mechanics such as speed, calculations, etc.
 * * Notetags that give skills and items access to ATB Gauge manipulation, by
 *   altering how filled they are.
 * * Interrupts can be used on battlers in the middle of casting a skill.
 * * Visual ATB Gauges can be displayed over battlers' heads.
 * * ATB Gauges have extra coloring options added to them to let the player
 *   quickly know the current speed state of the ATB Gauge.
 * * A field-wide ATB Gauge that positions actor and enemy markers on it to
 *   show how far along actors and enemies are relative to each other's turns.
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
 * - VisuMZ_1_BattleCore
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
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * ATB Gauges
 * 
 * The gauges are now revamped to show different colors to depict the various
 * ATB states a battler can be in. These various states include the following:
 * 
 * - When a battler's speed is fully stopped.
 * - When a battler's speed is slower/faster past a specific rating.
 * - When a battler is ready for an action.
 * - When a battler is casting an action (those with negative speed values).
 * 
 * The colors used for these states can be found and altered in the Plugin
 * Parameters under Gauge Color Settings.
 *
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to ATB,
 * skills and items with positive speed values will have an impact on how full
 * their ATB Gauges will be in the following turn. A value of 2000 will put the
 * gauge at 50% full, 1000 will put the gauge at 25% full, 500 will put it at
 * 12.5% full, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
 * 
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 *
 * - ATB Interrupts can have animations played when they trigger if the
 * VisuStella Core Engine is installed.
 *
 * ---
 * 
 * VisuMZ_1_OptionsCore
 * 
 * - Having the VisuStella Options Core available will allow you to adjust the
 * speed at which the ATB gauges fill up.
 * 
 * - The VisuStella Options Core also gives the player the option to toggle
 * between Active and Wait-based ATB.
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
 * === General ATB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 *
 * ---
 * 
 * <ATB Help>
 *  description
 *  description
 * </ATB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under TPB/ATB.
 * - This is primarily used if the skill behaves differently in TPB/ATB versus
 *   any other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to TPB/ATB.
 * 
 * ---
 *
 * <Hide ATB Gauge>
 *
 * - Used for: Enemy Notetags
 * - If you don't want an enemy to show their ATB Gauge, use this notetag.
 * 
 * ---
 * 
 * === ATB Field Gauge-Related Notetags ===
 * 
 * These notetags only work if the ATB Field Gauge is enabled.
 * 
 * ---
 *
 * <ATB Field Gauge Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <ATB Field Gauge Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <ATB Field Gauge Face: Monster, 1>
 * 
 * ---
 * 
 * === ATB Gauge Manipulation-Related Notetags ===
 * 
 * These notetags are used for ATB Gauge manipulation purposes.
 * 
 * ---
 *
 * <ATB After Gauge: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's ATB Gauge will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   ATB Gauge to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <ATB Charge Gauge: x%>
 * <ATB Charge Gauge: +x%>
 * <ATB Charge Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <ATB Cast Gauge: x%>
 * <ATB Cast Gauge: +x%>
 * <ATB Cast Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 *
 * <ATB Interrupt>
 *
 * - Used for: Skill, Item Notetags
 * - If this skill/item hits a target who is in a casting state, interrupt that
 *   action to cancel it and reset the target's ATB Gauge to 0%.
 * 
 * ---
 *
 * <ATB Cannot Be Interrupted>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill/item immune to ATB Interruptions.
 * 
 * ---
 * 
 * <ATB Battle Start Gauge: +x%>
 * <ATB Battle Start Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determine how much extra or less ATB Gauge the battler will start with if
 *   associated with one of these database objects.
 * - Replace 'x' with a percentile value determining how much extra or less ATB
 *   Gauge value the battler will start battle with.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * <ATB After Gauge: +x%>
 * <ATB After Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Determine how much influence there is on the ATB Gauge after finishing a
 *   skill/item. Increase or decrease the amount after each action.
 * - Replace 'x' with a percentile value determining how much influence there
 *   is on the ATB Gauge after the skill/item has finished performing.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * === JavaScript Notetags: ATB Gauge Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional ATB Gauge Manipulation.
 * 
 * ---
 * 
 * <JS ATB Charge Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Charge Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a charging state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS ATB Cast Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Cast Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a casting state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS ATB After Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB After Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to after performing this skill/item action.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Field Gauge Icon
 * - Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change Field Gauge Face
 * - Changes the faces used for the specific actor(s) on the ATB Field Gauge.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   Face Name:
 *   - This is the filename for the target face graphic.
 * 
 *   Face Index:
 *   - This is the index for the target face graphic.
 * 
 * ---
 *
 * Actor: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Field Gauge Icon
 * - Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change Field Gauge Face
 * - Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: ATB Field Gauge Visibility
 * - Determine the visibility of the ATB Field Gauge.
 * 
 *   Visibility:
 *   - Changes the visibility of the ATB Field Gauge.
 * 
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System ATB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * Mechanics
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 * 
 *   Stuns Reset Gauge?:
 *   - Should stuns reset the ATB Gauge?
 * 
 *   JS: Initial Gauge:
 *   - JavaScript code to determine how much ATB gauge to give each battler at
 *     the start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Interrupt Settings
 * ============================================================================
 *
 * Interrupt settings used for Battle System ATB.
 *
 * ---
 *
 * Interrupt
 * 
 *   Animation ID:
 *   - Play this animation when a unit is interrupted.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mirror Animation:
 *     - Mirror the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mute Animation:
 *     - Mute the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *   Text Popup:
 *   - Text used for popup when interrupts happen.
 *   - Leave empty for no popup.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *     Flash Color:
 *     - Adjust the popup's flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *     Flash Duration:
 *     - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Gauge Settings
 * ============================================================================
 *
 * General gauge settings used for ATB Gauges.
 *
 * ---
 *
 * General
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the ATB Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the ATB Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the ATB Gauge's X/Y by?
 *
 * ---
 *
 * AGI Gauge Rates
 * 
 *   Slow Rate:
 *   - How much should the AGI rate be at to be considered slow?
 * 
 *   Fast Rate:
 *   - How much should the AGI rate be at to be considered fast?
 *
 * ---
 *
 * Actors
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Show Status Gauges:
 *   - Show ATB Gauges in the status window?
 *   - Applies only to sideview.
 *
 * ---
 *
 * Enemies
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the enemy sprites' heads?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Field Gauge Settings
 * ============================================================================
 * 
 * The ATB Field Gauge is a large gauge placed on the screen with all of the
 * current battle's active participants shown on it. The participants are
 * represented by a marker. Each marker's position on the gauge indicates its
 * battler's ATB progress towards a turn.
 * 
 * In order for this feature to work, enable "Use Field Gauge?" in the
 * Plugin Parameters.
 *
 * ---
 *
 * General
 * 
 *   Use Field Gauge?:
 *   - This value must be set to true in order for the ATB Field Gauge
 *     to appear.
 *   - This needs to be on in order for this feature to work.
 * 
 *   Display Position:
 *   - Select where the Field Gauge will appear on the screen.
 *   - Top
 *   - Bottom
 *   - Left
 *   - Right
 * 
 *   Offset X:
 *   Offset Y:
 *   - How much to offset the X/Y coordinates by.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the gauge when the
 *     help window is open?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Field Gauge.
 *   - Settings may vary depending on position.
 *   - Left to Right
 *   - Right to Left
 *   - Up to Down
 *   - Down to Up
 *
 * ---
 *
 * Field Gauge Settings
 * 
 *   Gauge Skin:
 *   - Optional. Select an image to place behind the gauge.
 *   - This will be centered on the Field Gauge's position.
 * 
 *   Show Gauge?:
 *   - Decide if you want the gauge to be shown.
 * 
 *   Horizontal Length:
 *   - The length of the Field Gauge if placed horizontally.
 * 
 *   Vertical Length:
 *   - The length of the Field Gauge if placed vertically.
 * 
 *   Thickness:
 *   - The thickness of the Field Gauge for either direction.
 * 
 *   Split Location:
 *   - Determine where the gauge should split.
 *   - Use 0.00 for the start. Use 1.00 for the end.
 *
 * ---
 *
 * Marker Sprites
 * 
 *   Actor Marker Side:
 *   - Which side do you want the actor markers to appear?
 * 
 *   Enemy Marker Side:
 *   - Which side do you want the enemy markers to appear?
 * 
 *   Marker Offset:
 *   - How many pixels do you want to offset the markers by?
 * 
 *   Marker Size:
 *   - How pixels wide and tall do you want the markers to be?
 * 
 *   Marker Speed:
 *   - How many pixels maximum can a marker travel in one frame?
 * 
 *   Opacity Rate:
 *   - If a marker has to change opacity, how fast should it change by?
 *
 * ---
 *
 * Marker Border
 * 
 *   Show Border?:
 *   - Show borders for the marker sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Marker Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Marker Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the marker sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Marker Background
 * 
 *   Show Background?:
 *   - Show the background on the marker sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 *
 * ---
 *
 * Marker Arrow
 * 
 *   Show Arrow?:
 *   - Show the arrow sprite pointing towards the Field Gauge?
 * 
 *   Arrow Skin:
 *   - Pick a window skin to draw arrows from.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Color Settings
 * ============================================================================
 *
 * Gauge color settings used for ATB Gauges.
 *
 * ---
 *
 * Colors
 * 
 *   Default Color 1:
 *   Default Color 2:
 *   Full Color 1:
 *   Full Color 2:
 *   Cast Color 1:
 *   Cast Color 2:
 *   Fast Color 1:
 *   Fast Color 2:
 *   Slow Color 1:
 *   Slow Color 2:
 *   Stop Color 1:
 *   Stop Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for Battle System ATB.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show ATB Gauges' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
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
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.23: November 10, 2022
 * * Bug Fixes!
 * ** ATB Gauges will now display for ANIMATED sideview enemies depending on
 *    the Show Enemy Gauge setting. Fix made by Olivia.
 * 
 * Version 1.22: September 29, 2022
 * * Bug Fixes!
 * ** After enemies recover from a stun, enemies no longer take an immediate
 *    action regardless of their time gauge state. Fix made by Olivia.
 * 
 * Version 1.21: August 25, 2022
 * * Bug Fixes!
 * ** Restricted enemies will no longer be action-locked after removing the
 *    restriction state. Fix made by Olivia.
 * 
 * Version 1.20: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the ATB Field Gauge faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.19: July 21, 2022
 * * Bug Fixes!
 * ** Battlers under a "Cannot Move" state will no longer reset their ATB gauge
 *    after their "turn" comes up to update it. Fix made by Olivia.
 * 
 * Version 1.18: June 2, 2022
 * * Bug Fixes!
 * ** Notetag effect for <ATB After Gauge: x%> should now be working properly.
 *    Fix made by Olivia.
 * ** Notetag effect for <JS ATB After Gauge> should now be working properly.
 *    Fix made by Olivia.
 * 
 * Version 1.17: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: August 13, 2021
 * * Bug Fixes!
 * ** Crash prevented with certain Plugin Parameter combinations enabled when
 *    the ATB Gauge is filled up. Fix made by Irina.
 * 
 * Version 1.15: July 23, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly for SV Enemies, too. Fix made by Irina.
 * 
 * Version 1.14: July 16, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly. Fix made by Olivia.
 * 
 * Version 1.13: May 21, 2021
 * * Bug Fixes!
 * ** When slip damage is allowed to kill, dying actors will have their TPB
 *    state reset to charging in order to prevent lock-ups. Fix by Olivia.
 * 
 * Version 1.12: May 7, 2021
 * * Feature Update!
 * ** Actions with 0 or positive speed will now act immediately without
 *    allowing a single gauge tick pass through. Update made by Olivia.
 * 
 * Version 1.11: April 16, 2021
 * * Bug Fixes!
 * ** ATB Gauge visibility is now properly updated across various events such
 *    as party removal and other obstruction effects. Fix made by Olivia.
 * 
 * Version 1.10: March 12, 2021
 * * Hot Fix!
 * ** Fixed calculation errors due to field gauge. Fix made by Olivia.
 * * Feature Update!
 * ** Slight change to the way calculations are made for the bottom aligned
 *    field gauge position. Update made by Olivia.
 * 
 * Version 1.09: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.08: November 22, 2020
 * * Feature Update!
 * ** ATB Interrupts will not clear all actions (including queued ones) for
 *    mechanical compatibility. Change made by Yanfly.
 * 
 * Version 1.07: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change Field Gauge Face
 * **** Changes the faces used for the specific actor(s) on the ATB
 *      Field Gauge.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin should now be compatible with older saves when changing to a save
 *    that didn't use a Field Gauge to one that does. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <ATB Field Gauge Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Documentation Update
 * ** Help file updated with new features.
 * * Feature Update!
 * ** Enemy letters are no longer drawn on the Field Gauge unless there are
 *    multiple enemies of the same type. Added by Arisu.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and Yanfly.
 * *** Plugin Parameters > Field Gauge > Offset X and Y
 * **** How much to offset the X/Y coordinates of the Field Gauge by.
 * 
 * Version 1.02: October 4, 2020
 * * New Features!
 * ** New Plugin Command added "System: ATB Field Gauge Visibility" to let you
 *    show or hide the Field Gauge during battle. Added by Arisu.
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** ATB Cast and Charge notetags no longer cause crashes. Fix made by Olivia.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > Mechanics > Stuns Reset Gauge?
 * **** Should stuns reset the ATB Gauge?
 *
 * Version 1.00: September 21, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeActorIcon
 * @text Actor: Change Field Gauge Icon
 * @desc Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeActorFace
 * @text Actor: Change Field Gauge Face
 * @desc Changes the faces used for the specific actor(s) on the ATB Field Gauge.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearActorGraphic
 * @text Actor: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeEnemyIcon
 * @text Enemy: Change Field Gauge Icon
 * @desc Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeEnemyFace
 * @text Enemy: Change Field Gauge Face
 * @desc Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearEnemyGraphic
 * @text Enemy: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemFieldGaugeVisibility
 * @text System: ATB Field Gauge Visibility
 * @desc Determine the visibility of the ATB Field Gauge.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the ATB Field Gauge.
 * @default true
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
 * @param BattleSystemATB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings used for Battle System ATB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","StunsResetGauge:eval":"false","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.5","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Interrupt:struct
 * @text Interrupt Settings
 * @type struct<Interrupt>
 * @desc Interrupt settings used for Battle System ATB.
 * @default {"Interrupt":"","InterruptAnimationID:num":"11","InterruptMirror:eval":"false","InterruptMute:eval":"false","InterruptText:str":"INTERRUPTED!","InterruptTextColor:str":"0","InterruptFlashColor:eval":"[255, 0, 0, 160]","InterruptFlashDuration:num":"60"}
 *
 * @param Gauge:struct
 * @text General Gauge Settings
 * @type struct<Gauge>
 * @desc General gauge settings used for ATB Gauges.
 * @default {"General":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"2","AGIGaugeRates":"","SlowRate:num":"0.60","FastRate:num":"1.40","Actors":"","ShowActorGauge:eval":"true","ShowStatusGauge:eval":"false","Enemies":"","ShowEnemyGauge:eval":"true"}
 *
 * @param FieldGauge:struct
 * @text Field Gauge Settings
 * @type struct<FieldGauge>
 * @desc Make a field-wide ATB gauge for all the battlers.
 * @default {"General":"","UseFieldGauge:eval":"false","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","GaugeDirection:eval":"true","Gauge":"","GaugeSystemSkin:str":"","DrawGauge:eval":"true","GaugeLengthHorz:num":"600","GaugeLengthVert:num":"400","GaugeThick:num":"16","GaugeSplit:num":"0.70","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"48","Markers":"","ActorSide:eval":"true","EnemySide:eval":"false","MarkerOffset:num":"28","MarkerSize:num":"32","MarkerSpeed:num":"36","OpacityRate:num":"4","BorderThickness:num":"2","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"1","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"10","EnemyBgColor2:str":"18","EnemySystemBg:str":"","Arrow":"","ShowMarkerArrow:eval":"true","MarkerArrowWindowSkin:str":"Window"}
 *
 * @param Color:struct
 * @text Gauge Color Settings
 * @type struct<Color>
 * @desc Gauge color settings used for ATB Gauges.
 * @default {"default1:str":"26","default2:str":"27","full1:str":"14","full2:str":"6","cast1:str":"2","cast2:str":"10","fast1:str":"27","fast2:str":"18","slow1:str":"22","slow2:str":"23","stop1:str":"7","stop2:str":"8"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for Battle System ATB.
 * @default {"Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show ATB Gauges"}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param StunsResetGauge:eval
 * @text Stuns Reset Gauge?
 * @parent General
 * @type boolean
 * @on Reset Gauge
 * @off Don't Reset
 * @desc Should stuns reset the ATB Gauge?
 * @default false
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Gauge
 * @parent JavaScript
 * @desc JavaScript code to determine how much ATB gauge to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Interrupt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Interrupt:
 *
 * @param Interrupt
 *
 * @param InterruptAnimationID:num
 * @text Animation ID
 * @parent Interrupt
 * @type animation
 * @desc Play this animation when a unit is interrupted.
 * Requires VisuMZ_0_CoreEngine.
 * @default 11
 *
 * @param InterruptMirror:eval
 * @text Mirror Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptMute:eval
 * @text Mute Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptText:str
 * @text Text Popup
 * @parent Interrupt
 * @desc Text used for popup when interrupts happen.
 * Leave empty for no popup.
 * @default INTERRUPTED!
 *
 * @param InterruptTextColor:str
 * @text Text Color
 * @parent InterruptText:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param InterruptFlashColor:eval
 * @text Flash Color
 * @parent InterruptText:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param InterruptFlashDuration:num
 * @text Flash Duration
 * @parent InterruptText:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param General
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent General
 * @desc How large/small do you want the ATB Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's Y by?
 * @default 2
 *
 * @param AGIGaugeRates
 * @text AGI Gauge Rates
 *
 * @param SlowRate:num
 * @text Slow Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered slow?
 * @default 0.60
 *
 * @param FastRate:num
 * @text Fast Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered fast?
 * @default 1.40
 *
 * @param Actors
 *
 * @param ShowActorGauge:eval
 * @text Show Sprite Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowStatusGauge:eval
 * @text Show Status Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges in the status window?
 * Applies only to sideview.
 * @default false
 *
 * @param Enemies
 *
 * @param ShowEnemyGauge:eval
 * @text Show Sprite Gauges
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the enemy sprites' heads?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param default1:str
 * @text Default Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param default2:str
 * @text Default Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param full1:str
 * @text Full Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param full2:str
 * @text Full Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param cast1:str
 * @text Cast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param cast2:str
 * @text Cast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param fast1:str
 * @text Fast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param fast2:str
 * @text Fast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param slow1:str
 * @text Slow Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param slow2:str
 * @text Slow Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param stop1:str
 * @text Stop Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param stop2:str
 * @text Stop Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show ATB Gauges' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show ATB Gauges
 *
 */
/* ----------------------------------------------------------------------------
 * Field Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FieldGauge:
 *
 * @param General
 *
 * @param UseFieldGauge:eval
 * @text Use Field Gauge?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc This value must be set to true in order for the ATB Field Gauge to appear.
 * @default false
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Field Gauge will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * gauge when the help window is open?
 * @default true
 *
 * @param GaugeDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Up to Down
 * @off Right to Left / Down to Up
 * @desc Decide on the direction of the Field Gauge.
 * Settings may vary depending on position.
 * @default true
 *
 * @param Gauge
 * @text Field Gauge Settings
 *
 * @param GaugeSystemSkin:str
 * @text Gauge Skin
 * @parent Gauge
 * @type file
 * @dir img/system/
 * @desc Optional. Select an image to place behind the gauge.
 * This will be centered on the Field Gauge's position.
 * @default 
 *
 * @param DrawGauge:eval
 * @text Show Gauge?
 * @parent Gauge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Decide if you want the gauge to be shown.
 * @default true
 *
 * @param GaugeLengthHorz:num
 * @text Horizontal Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed horizontally.
 * @default 600
 *
 * @param GaugeLengthVert:num
 * @text Vertical Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed vertically.
 * @default 400
 *
 * @param GaugeThick:num
 * @text Thickness
 * @parent Gauge
 * @type number
 * @min 3
 * @desc The thickness of the Field Gauge for either direction.
 * @default 16
 *
 * @param GaugeSplit:num
 * @text Split Location
 * @parent Gauge
 * @desc Determine where the gauge should split.
 * Use 0.00 for the start. Use 1.00 for the end.
 * @default 0.70
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the gauge's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the gauge's Y coordinates by this much when
 * the Help Window is visible.
 * @default 48
 *
 * @param Markers
 * @text Marker Sprites
 *
 * @param ActorSide:eval
 * @text Actor Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the actor markers to appear?
 * @default true
 *
 * @param EnemySide:eval
 * @text Enemy Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the enemy markers to appear?
 * @default false
 *
 * @param MarkerOffset:num
 * @text Marker Offset
 * @parent Markers
 * @desc How many pixels do you want to offset the markers by?
 * @default 28
 *
 * @param MarkerSize:num
 * @text Marker Size
 * @parent Markers
 * @type number
 * @min 10
 * @desc How pixels wide and tall do you want the markers to be?
 * @default 32
 *
 * @param MarkerSpeed:num
 * @text Marker Speed
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels maximum can a marker travel in one frame?
 * @default 36
 *
 * @param OpacityRate:num
 * @text Opacity Rate
 * @parent Markers
 * @type number
 * @min 1
 * @desc If a marker has to change opacity, how fast should it change by?
 * @default 4
 *
 * @param Border
 * @text Marker Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the marker sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Marker Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Marker Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the marker sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Marker Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the marker sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 1
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 * @param Arrow
 * @text Marker Arrow
 *
 * @param ShowMarkerArrow:eval
 * @text Show Arrow?
 * @parent Arrow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the arrow sprite pointing towards the Field Gauge?
 * @default true
 *
 * @param MarkerArrowWindowSkin:str
 * @text Arrow Skin
 * @parent Arrow
 * @type file
 * @dir img/system/
 * @desc Pick a window skin to draw arrows from.
 * @default Window
 *
 */
//=============================================================================

const _0x310c00=_0x292d;(function(_0x1b01ad,_0x3ba061){const _0x5afc92=_0x292d,_0x24805c=_0x1b01ad();while(!![]){try{const _0x2f1f16=-parseInt(_0x5afc92(0x329))/0x1+parseInt(_0x5afc92(0x26b))/0x2+parseInt(_0x5afc92(0x1d8))/0x3*(parseInt(_0x5afc92(0x362))/0x4)+-parseInt(_0x5afc92(0x32b))/0x5+parseInt(_0x5afc92(0x1ff))/0x6*(parseInt(_0x5afc92(0x178))/0x7)+-parseInt(_0x5afc92(0x17b))/0x8*(-parseInt(_0x5afc92(0x2a3))/0x9)+-parseInt(_0x5afc92(0x35c))/0xa;if(_0x2f1f16===_0x3ba061)break;else _0x24805c['push'](_0x24805c['shift']());}catch(_0x60971d){_0x24805c['push'](_0x24805c['shift']());}}}(_0x5ce9,0xbe4cb));var label='BattleSystemATB',tier=tier||0x0,dependencies=[_0x310c00(0x2bf)],pluginData=$plugins[_0x310c00(0x170)](function(_0x16034f){const _0x149ed2=_0x310c00;return _0x16034f[_0x149ed2(0x1c8)]&&_0x16034f[_0x149ed2(0x1ba)][_0x149ed2(0x232)]('['+label+']');})[0x0];function _0x5ce9(){const _0x344a1c=['disappear','members','textColor','IconIndex','GXvIU','nmuyn','createStateIconSprite','MbeOE','DisplayOffsetY','1872694WJGmge','TpbCastTimeJS','updatePosition','_battlerContainer','undecided','fieldAtbGraphicFaceName','atbStopped','updateAtbGaugeSpritePosition','iconWidth','ShowActorGauge','FUNC','gaugeRate','cOjBV','svactor','compareBattlerSprites','SqbWg','svBattlerName','ShowStatusGauge','%1Side','Game_Action_applyGlobal','(?:GAUGE|TIME|SPEED)','fOTYT','_battler','MANCv','EnemyBattlerIcon','CrzJH','Options','RjreB','blt','fast%1','_graphicSprite','createChildren','ParseSkillNotetags','Game_BattlerBase_die','PrdZe','FieldGaugeClearActorGraphic','bottom','stop%1','tpbRequiredCastTime','tpbRelativeSpeed','BorderThickness','_tpbTurnCount','_homeY','#000000','children','isShowAtbGauge','isEnemy','Window_Options_addGeneralOptions','constructor','createFieldAtbGraphicFaceName','#%1','setAtbAfterSpeed','EnemyBattlerFaceIndex','lyhUN','targetOpacity','eJmBz','13329cvEgoj','folAV','AddOption','skills','Game_Battler_applyTpbPenalty','Game_Actor_clearActions','After','_fieldAtbGaugeGraphicType','KQkpy','setFrame','rlddJ','isTpb','bfTgN','ctGaugeColor1','getStateTooltipBattler','GaugeLengthHorz','charging','Parse_Notetags_CreateJS','_letter','isAtbCastingState','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','zXZIl','Game_Action_applyItemUserEffect','setAtbChargeTime','_graphicSv','cAYYF','fieldAtbGraphicType','StunsResetGauge','VisuMZ_1_BattleCore','TeEmW','applyTpbPenalty','%1SystemBg','changeSvActorGraphicBitmap','MsUTv','requestFauxAnimation','Sprite_Enemy_createStateIconSprite','FieldGaugeActorIcon','ready','Enemy-%1-%2','trim','Sprite_Enemy_startEffect','isSceneBattle','Sprite_Battler_updateMain','yJHdw','canMove','addChild','applyGlobal','Game_Battler_tpbBaseSpeed','applyItemUserEffect','createJS','GaugeSplit','isAttack','juhlJ','battlerHue','zBVZm','BYFfT','maxCommands','setup','getColor','%1BgColor2','atbGaugeColor','setBattleSystemATBFieldGaugeVisible','opacity','fontFace','lgJAV','_graphicIconIndex','enemy','loadFace','Scene_Battle_createAllWindows','WDLtD','boxHeight','gradientFillRect','_atbGaugeSprite','ShowEnemyGauge','FieldGaugeEnemyIcon','Sprite_Gauge_gaugeColor2','svActorHorzCells','CxUMu','clearTpbChargeTime','BattleManager_isActiveTpb','showVisualAtbGauge','boxWidth','anchor','Aggro','process_VisuMZ_BattleSystemATB_JS_Notetags','ARRAYJSON','Sprite_Battler_setBattler','ColorManager_loadWindowskin','%1BgColor1','Sprite_Gauge_currentMaxValue','die','tpbSpeed','Game_Battler_onRestrict','battler','min','setAtbCastTime','isActor','initialize','parameters','round','lfell','isSideView','createBattlerSprite','_fieldAtbGaugeFaceName','GaugeLengthVert','dsCAK','Sprite_Actor_createStateSprite','faceIndex','OpacityRate','AnchorX','registerCommand','updateLetter','createEnemySprites','AdjustRect','Scene_Options_maxCommands','createAllWindows','targetPositionOnGauge','rBWIy','createFieldAtbGraphicIconIndex','KKTXb','EscapeFailPenalty','EnemyBattlerType','processUpdateGraphic','setBattler','Game_Battler_startTpbCasting','McKbO','Scene_Boot_onDatabaseLoaded','hKugS','_arrowSprite','applyATBPenalty','Game_BattlerBase_appear','default%1','mYpHR','EnemyBattlerDrawLetter','458967pVVcZv','isGaugeHorizontal','5261390PUcZeG','MRCwO','currentMaxValue','changeFaceGraphicBitmap','atbCurrentMaxValue','BattleCore','createFieldAtbGraphicFaceIndex','Armor-%1-%2','faceHeight','_tpbCastTime','Charge','Skill-%1-%2','Game_System_initialize','isTpbCharged','EnemyBattlerFontSize','xgWYE','FieldGaugeClearEnemyGraphic','bitmap','isBattleSystemATBFieldGaugeVisible','changeIconGraphicBitmap','ARRAYSTRUCT','MarkerOffset','isATB','svAoU','Item-%1-%2','atbColor','ABBgB','default','_index','clearFieldAtbGraphics','loadSystem','startEffect','RuGSV','_skinSprite','makeData','tpbAcceleration','toUpperCase','_atbColors','yPVoK','Zhuoi','Game_Battler_tpbAcceleration','setItem','face','_fieldAtbGaugeIconIndex','TpbSpeedCalcJS','ceil','EnemyBattlerFaceName','full','JSON','16181980vYDYtB','battleUIOffsetX','uCeTX','YDgnk','checkAggroControlSystemOffsetYAdjustment','concat','100neDamA','toQKS','createFieldGaugeSkin','BattlerRelativeSpeedJS','svActorVertCells','mainFontFace','vQFRD','Game_BattlerBase_revive','Sprite_Gauge_currentValue','lXPdR','yZUnN','setText','tpbChargeTime','STRUCT','createGaugeSprite','initMembers','GaugeThick','ParseAllNotetags','changeAtbCastTime','ARRAYNUM','TpbAccelerationJS','drawGaugeBitmap','eoVMX','onDatabaseLoaded','numActions','Enemies','currentValue','ConfigManager_applyData','version','attackSpeed','maxBattleMembers','bind','OffsetY','_statusType','_atbFieldGaugeVisible','appear','actor','createBattlerSprites','VisibleGauge','allBattleMembers','parse','visible','InterruptAnimationID','addBattleSystemATBCommands','makeTpbActions','createArrowSprite','speed','initBattleSystemATB','max','ueFYK','_windowLayer','updateTpb','filter','icon','setupArrowSprite','isAtbChargingState','Game_Battler_removeState','KAqOF','battleUIOffsetY','startTpbTurn','21UifhGM','currentAction','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','6488fqSsdJ','gRodz','_fnord','_fieldGaugeATB','Znozo','VisuMZ_0_CoreEngine','mainSprite','top','(?:ATB|TPB)','createLetterSprite','Game_Battler_tpbRequiredCastTime','gaugeColor2','ARRAYFUNC','tpbBaseSpeed','ActorBattlerType','getChildIndex','Game_Battler_tpbRelativeSpeed','addGeneralOptions','UseFieldGauge','BattleSystemATB','Actor','addBattleSystemATBShowGaugeCommand','Enemy','fieldAtbGraphicFaceIndex','getAtbCastTimeRate','_svBattlerSprite','GaugeSystemSkin','atbInterrupt','ARRAYSTR','gaugeColor1','updateGraphic','setActionState','faceWidth','applyBattleSystemATBUserEffect','match','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_backgroundSprite','SreZF','Game_Battler_tpbSpeed','fieldAtbGraphicIconIndex','toLowerCase','clamp','_graphicFaceName','Weapon-%1-%2','OffsetX','isAlive','NScvy','Cast','FaceName','map','_blendColor','JHPRj','visualAtbGauge','removeState','removeChild','DmrFZ','fontSize','name','_horz','ZYqrk','lineHeight','AnchorY','NUM','description','atbSpeed','NesqK','fast','KmGlA','createBorderSprite','height','FieldGaugeActorFace','ShowMarkerArrow','ConvertParams','Sprite_Battler_update','ShowMarkerBg','_graphicType','makeDeepCopy','status','FaceIndex','Game_Battler_clearTpbChargeTime','STR','SystemFieldGaugeVisibility','gayUf','startTpbCasting','VisuMZ_2_BattleSystemCTB','_gaugeSprite','FieldGauge','_tpbIdleTime','process_VisuMZ_BattleSystemATB_CreateRegExp','_subject','addChildAt','iconHeight','Visible','38769KHwQaG','iZZYi','update','isAppeared','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','createKeyJS','createBackgroundSprite','updatePositionOnGauge','_atbAfterSpeed','updateAtbGaugeSpriteVisibility','prototype','abs','cast','_forcing','Interrupt','setHue','Window_BattleStatus','createAtbGaugeSprite','State-%1-%2','createFieldGaugeSpriteATB','updateOpacity','AggroControlSystem','isActiveTpb','call','reduce','cast2','jcnUc','_plural','RegExp','time','tnpdP','Sprite_Gauge_gaugeColor1','slow%1','VvqRw','_tpbTurnEnd','placeGauge','updatePositionOffset','GaugeDirection','ggVdW','2896794PWYmuR','Settings','addLoadListener','createFieldGaugeContainerATB','OIfdb','_fieldAtbGaugeFaceIndex','note','setHomeLocation','erVfe','DisplayPosition','createFieldAtbGraphicType','Scale','_onRestrictBypassAtbReset','subject','_tpbState','bRCyZ','drawText','width','updateMain','sRiLB','atbActive','format','isHidden','loadEnemy','Game_Unit_updateTpb','createActorSprites','_scene','clearActions','_windowskin','Window_Help_setItem','EnemyBattlerFontFace','AhAkd','_graphicHue','MarkerSize','Actor-%1-%2','setupAtbGaugeSprite','changeAtbChargeTime','updateSelectionEffect','HbITh','item','updateBattleContainerOrder','exit','aRTum','ShowMarkerBorder','createGaugeBitmap','_letterSprite','create','atbAcceleration','IWgBd','applyGlobalBattleSystemATBEffects','RepositionTopHelpX','includes','InterruptFlashColor','_tpbChargeTime','vEDXH','BattleManager_endBattlerActions','ezTte','updateVisibility','casting','createStateSprite','createGraphicSprite','btjYZ','scale','canMakeTpbActionsAtStartTpbTurn','applyData','ParseItemNotetags','_fieldGaugeATB_Container','onAtbInterrupt','RepositionTopHelpY','loadSvActor','clear','setupBattleSystemATBColors','SqvKB','cast1','bOXDQ','Class-%1-%2','loadWindowskin','hasSvBattler','_unit','ctGaugeColor2','Gauge','pgIkT','_graphicEnemy','_graphicFaceIndex','InterruptText','stop','atbCurrentValue','_homeX','Mechanics','jfgTQ','changeEnemyGraphicBitmap','Actors','fillRect','EVAL','floor','endBattlerActions','length','battlerName','Window_StatusBase_placeGauge'];_0x5ce9=function(){return _0x344a1c;};return _0x5ce9();}VisuMZ[label]['Settings']=VisuMZ[label][_0x310c00(0x200)]||{},VisuMZ[_0x310c00(0x1c3)]=function(_0x2e43bc,_0x12cbe7){const _0x45f8c6=_0x310c00;for(const _0x5135e0 in _0x12cbe7){if(_0x5135e0[_0x45f8c6(0x19d)](/(.*):(.*)/i)){if('ILxsC'==='ILxsC'){const _0x54034c=String(RegExp['$1']),_0x2c85ed=String(RegExp['$2'])[_0x45f8c6(0x34f)]()[_0x45f8c6(0x2ca)]();let _0x1b929e,_0x4f3557,_0x50132d;switch(_0x2c85ed){case _0x45f8c6(0x1b9):_0x1b929e=_0x12cbe7[_0x5135e0]!==''?Number(_0x12cbe7[_0x5135e0]):0x0;break;case _0x45f8c6(0x375):_0x4f3557=_0x12cbe7[_0x5135e0]!==''?JSON[_0x45f8c6(0x38a)](_0x12cbe7[_0x5135e0]):[],_0x1b929e=_0x4f3557[_0x45f8c6(0x1ac)](_0x36b430=>Number(_0x36b430));break;case _0x45f8c6(0x25c):_0x1b929e=_0x12cbe7[_0x5135e0]!==''?eval(_0x12cbe7[_0x5135e0]):null;break;case'ARRAYEVAL':_0x4f3557=_0x12cbe7[_0x5135e0]!==''?JSON['parse'](_0x12cbe7[_0x5135e0]):[],_0x1b929e=_0x4f3557[_0x45f8c6(0x1ac)](_0x311f68=>eval(_0x311f68));break;case _0x45f8c6(0x35b):_0x1b929e=_0x12cbe7[_0x5135e0]!==''?JSON[_0x45f8c6(0x38a)](_0x12cbe7[_0x5135e0]):'';break;case _0x45f8c6(0x2f8):_0x4f3557=_0x12cbe7[_0x5135e0]!==''?JSON[_0x45f8c6(0x38a)](_0x12cbe7[_0x5135e0]):[],_0x1b929e=_0x4f3557[_0x45f8c6(0x1ac)](_0x3d1926=>JSON['parse'](_0x3d1926));break;case _0x45f8c6(0x275):_0x1b929e=_0x12cbe7[_0x5135e0]!==''?new Function(JSON[_0x45f8c6(0x38a)](_0x12cbe7[_0x5135e0])):new Function('return\x200');break;case _0x45f8c6(0x187):_0x4f3557=_0x12cbe7[_0x5135e0]!==''?JSON[_0x45f8c6(0x38a)](_0x12cbe7[_0x5135e0]):[],_0x1b929e=_0x4f3557[_0x45f8c6(0x1ac)](_0x3b65a4=>new Function(JSON[_0x45f8c6(0x38a)](_0x3b65a4)));break;case _0x45f8c6(0x1cb):_0x1b929e=_0x12cbe7[_0x5135e0]!==''?String(_0x12cbe7[_0x5135e0]):'';break;case _0x45f8c6(0x197):_0x4f3557=_0x12cbe7[_0x5135e0]!==''?JSON[_0x45f8c6(0x38a)](_0x12cbe7[_0x5135e0]):[],_0x1b929e=_0x4f3557[_0x45f8c6(0x1ac)](_0xdc2fe1=>String(_0xdc2fe1));break;case _0x45f8c6(0x36f):_0x50132d=_0x12cbe7[_0x5135e0]!==''?JSON[_0x45f8c6(0x38a)](_0x12cbe7[_0x5135e0]):{},_0x1b929e=VisuMZ['ConvertParams']({},_0x50132d);break;case _0x45f8c6(0x33f):_0x4f3557=_0x12cbe7[_0x5135e0]!==''?JSON[_0x45f8c6(0x38a)](_0x12cbe7[_0x5135e0]):[],_0x1b929e=_0x4f3557[_0x45f8c6(0x1ac)](_0x47dc76=>VisuMZ['ConvertParams']({},JSON['parse'](_0x47dc76)));break;default:continue;}_0x2e43bc[_0x54034c]=_0x1b929e;}else{const _0x27ac5d=new _0x47492f(_0xcce514,_0x252f46,this[_0x45f8c6(0x1d0)]);this[_0x45f8c6(0x26e)][_0x45f8c6(0x2d0)](_0x27ac5d);}}}return _0x2e43bc;},(_0x3e8034=>{const _0x39a047=_0x310c00,_0x1af3ba=_0x3e8034['name'];for(const _0x198a75 of dependencies){if(!Imported[_0x198a75]){if(_0x39a047(0x2a2)===_0x39a047(0x35e))this[_0x39a047(0x1e9)]();else{alert(_0x39a047(0x1dc)[_0x39a047(0x214)](_0x1af3ba,_0x198a75)),SceneManager[_0x39a047(0x228)]();break;}}}const _0x4c173c=_0x3e8034[_0x39a047(0x1ba)];if(_0x4c173c[_0x39a047(0x19d)](/\[Version[ ](.*?)\]/i)){const _0x49e36b=Number(RegExp['$1']);if(_0x49e36b!==VisuMZ[label][_0x39a047(0x37e)]){if('jfgTQ'!==_0x39a047(0x258))return _0x3e41ec[_0x39a047(0x341)]()?_0x81df97['BattleSystemATB']['Settings']['Mechanics'][_0x39a047(0x365)][_0x39a047(0x1ef)](this,this):_0x7096fc[_0x39a047(0x18e)][_0x39a047(0x18b)][_0x39a047(0x1ef)](this);else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x1af3ba,_0x49e36b)),SceneManager[_0x39a047(0x228)]();}}if(_0x4c173c[_0x39a047(0x19d)](/\[Tier[ ](\d+)\]/i)){const _0x25b8ac=Number(RegExp['$1']);_0x25b8ac<tier?(alert(_0x39a047(0x17a)[_0x39a047(0x214)](_0x1af3ba,_0x25b8ac,tier)),SceneManager[_0x39a047(0x228)]()):tier=Math['max'](_0x25b8ac,tier);}VisuMZ[_0x39a047(0x1c3)](VisuMZ[label][_0x39a047(0x200)],_0x3e8034[_0x39a047(0x305)]);})(pluginData),PluginManager[_0x310c00(0x311)](pluginData['name'],_0x310c00(0x2c7),_0x1bd1e6=>{const _0x911bf5=_0x310c00;VisuMZ[_0x911bf5(0x1c3)](_0x1bd1e6,_0x1bd1e6);const _0x5d80f2=_0x1bd1e6[_0x911bf5(0x25a)],_0x76cf8b=_0x1bd1e6[_0x911bf5(0x265)];for(const _0x507ede of _0x5d80f2){if(_0x911bf5(0x1b2)===_0x911bf5(0x17f)){const _0x1856be=this['actor']()[_0x911bf5(0x205)];if(_0x1856be[_0x911bf5(0x19d)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x30f88e(_0x1a98af['$1']);return this['faceName']();}else{const _0x4383bb=$gameActors[_0x911bf5(0x386)](_0x507ede);if(!_0x4383bb)continue;_0x4383bb[_0x911bf5(0x2aa)]=_0x911bf5(0x171),_0x4383bb[_0x911bf5(0x356)]=_0x76cf8b;}}}),PluginManager[_0x310c00(0x311)](pluginData[_0x310c00(0x1b4)],_0x310c00(0x1c1),_0x6f1946=>{const _0x11b95f=_0x310c00;VisuMZ['ConvertParams'](_0x6f1946,_0x6f1946);const _0x56a26c=_0x6f1946['Actors'],_0x2624bb=_0x6f1946[_0x11b95f(0x1ab)],_0x355f90=_0x6f1946[_0x11b95f(0x1c9)];for(const _0xed4457 of _0x56a26c){const _0x3e4189=$gameActors[_0x11b95f(0x386)](_0xed4457);if(!_0x3e4189)continue;_0x3e4189[_0x11b95f(0x2aa)]=_0x11b95f(0x355),_0x3e4189[_0x11b95f(0x30a)]=_0x2624bb,_0x3e4189[_0x11b95f(0x204)]=_0x355f90;}}),PluginManager[_0x310c00(0x311)](pluginData[_0x310c00(0x1b4)],_0x310c00(0x28e),_0xf43e96=>{const _0x13d3b6=_0x310c00;VisuMZ['ConvertParams'](_0xf43e96,_0xf43e96);const _0x2e4fa1=_0xf43e96[_0x13d3b6(0x25a)];for(const _0x4220b7 of _0x2e4fa1){if(_0x13d3b6(0x237)!==_0x13d3b6(0x322)){const _0x1278d3=$gameActors[_0x13d3b6(0x386)](_0x4220b7);if(!_0x1278d3)continue;_0x1278d3['clearFieldAtbGraphics']();}else return _0x2a2f5a(_0x37326f['$1']);}}),PluginManager['registerCommand'](pluginData['name'],_0x310c00(0x2ed),_0x2f44cb=>{const _0x2c5b26=_0x310c00;VisuMZ['ConvertParams'](_0x2f44cb,_0x2f44cb);const _0x4c633e=_0x2f44cb[_0x2c5b26(0x37b)],_0x31aed9=_0x2f44cb[_0x2c5b26(0x265)];for(const _0x579eb5 of _0x4c633e){if(_0x2c5b26(0x247)!=='FRfQm'){const _0x15528f=$gameTroop[_0x2c5b26(0x263)]()[_0x579eb5];if(!_0x15528f)continue;_0x15528f[_0x2c5b26(0x2aa)]=_0x2c5b26(0x171),_0x15528f[_0x2c5b26(0x356)]=_0x31aed9;}else _0x362781[_0x2c5b26(0x23d)]['x']=-_0x23c852['abs'](_0x32208f[_0x2c5b26(0x23d)]['x']);}}),PluginManager[_0x310c00(0x311)](pluginData[_0x310c00(0x1b4)],'FieldGaugeEnemyFace',_0x5a11cf=>{const _0x5036f3=_0x310c00;VisuMZ[_0x5036f3(0x1c3)](_0x5a11cf,_0x5a11cf);const _0x269b94=_0x5a11cf[_0x5036f3(0x37b)],_0x2cf54c=_0x5a11cf[_0x5036f3(0x1ab)],_0x3d3bd6=_0x5a11cf['FaceIndex'];for(const _0x4a3de6 of _0x269b94){const _0x5cc96d=$gameTroop[_0x5036f3(0x263)]()[_0x4a3de6];if(!_0x5cc96d)continue;_0x5cc96d[_0x5036f3(0x2aa)]=_0x5036f3(0x355),_0x5cc96d[_0x5036f3(0x30a)]=_0x2cf54c,_0x5cc96d[_0x5036f3(0x204)]=_0x3d3bd6;}}),PluginManager['registerCommand'](pluginData['name'],_0x310c00(0x33b),_0x55f283=>{const _0x6d5e1d=_0x310c00;VisuMZ[_0x6d5e1d(0x1c3)](_0x55f283,_0x55f283);const _0x23e16b=_0x55f283[_0x6d5e1d(0x37b)];for(const _0x4e2d3e of _0x23e16b){const _0x31e00c=$gameTroop['members']()[_0x4e2d3e];if(!_0x31e00c)continue;_0x31e00c[_0x6d5e1d(0x348)]();}}),PluginManager[_0x310c00(0x311)](pluginData[_0x310c00(0x1b4)],_0x310c00(0x1cc),_0x1faaaa=>{const _0x4ea650=_0x310c00;VisuMZ[_0x4ea650(0x1c3)](_0x1faaaa,_0x1faaaa);const _0x551785=_0x1faaaa[_0x4ea650(0x1d7)];$gameSystem[_0x4ea650(0x2e0)](_0x551785);}),VisuMZ[_0x310c00(0x18e)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot['prototype'][_0x310c00(0x379)]=function(){const _0x5b919c=_0x310c00;this['process_VisuMZ_BattleSystemATB_CreateRegExp'](),VisuMZ[_0x5b919c(0x18e)][_0x5b919c(0x321)][_0x5b919c(0x1ef)](this),this[_0x5b919c(0x2f7)]();},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x1f4)]={},Scene_Boot[_0x310c00(0x1e2)][_0x310c00(0x1d3)]=function(){const _0x3e02f9=_0x310c00,_0x4d5448=VisuMZ[_0x3e02f9(0x330)][_0x3e02f9(0x1f4)],_0x17a8c2=_0x3e02f9(0x2b7),_0x4b7ac6=['Charge','Cast',_0x3e02f9(0x2a9)];for(const _0x5afc48 of _0x4b7ac6){if(_0x3e02f9(0x267)!==_0x3e02f9(0x267))return _0x4def52['x']-_0x2e1c57['x'];else{const _0x5e67d3=_0x17a8c2[_0x3e02f9(0x214)](_0x5afc48[_0x3e02f9(0x34f)]()[_0x3e02f9(0x2ca)](),_0x3e02f9(0x183),_0x3e02f9(0x27f)),_0xa2a497=new RegExp(_0x5e67d3,'i');VisuMZ[_0x3e02f9(0x18e)][_0x3e02f9(0x1f4)][_0x5afc48]=_0xa2a497;}}},Scene_Boot[_0x310c00(0x1e2)][_0x310c00(0x2f7)]=function(){const _0x494793=_0x310c00;if(VisuMZ[_0x494793(0x373)])return;const _0x3cd9db=$dataSkills[_0x494793(0x361)]($dataItems);for(const _0x1558dd of _0x3cd9db){if(!_0x1558dd)continue;VisuMZ[_0x494793(0x18e)][_0x494793(0x2b4)](_0x1558dd);}},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x28b)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x310c00(0x28b)]=function(_0x3affa7){const _0x3e9785=_0x310c00;VisuMZ[_0x3e9785(0x18e)][_0x3e9785(0x28b)][_0x3e9785(0x1ef)](this,_0x3affa7),VisuMZ[_0x3e9785(0x18e)][_0x3e9785(0x2b4)](_0x3affa7);},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x240)]=VisuMZ[_0x310c00(0x240)],VisuMZ['ParseItemNotetags']=function(_0x2446d1){const _0x388327=_0x310c00;VisuMZ['BattleSystemATB'][_0x388327(0x240)]['call'](this,_0x2446d1),VisuMZ[_0x388327(0x18e)][_0x388327(0x2b4)](_0x2446d1);},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x2b4)]=function(_0x52b75c){const _0x529545=_0x310c00,_0x8b777a=[_0x529545(0x335),_0x529545(0x1aa),_0x529545(0x2a9)];for(const _0x32f4e8 of _0x8b777a){VisuMZ[_0x529545(0x18e)][_0x529545(0x2d4)](_0x52b75c,_0x32f4e8);}},VisuMZ[_0x310c00(0x18e)]['JS']={},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x2d4)]=function(_0x4f7ad9,_0x27247a){const _0x5f218f=_0x310c00,_0x3ceefb=_0x4f7ad9['note'];if(_0x3ceefb['match'](VisuMZ[_0x5f218f(0x18e)]['RegExp'][_0x27247a])){const _0x466a26=String(RegExp['$1']),_0x5b4425=_0x5f218f(0x19e)[_0x5f218f(0x214)](_0x466a26,_0x27247a),_0x391da7=VisuMZ['BattleSystemATB'][_0x5f218f(0x1dd)](_0x4f7ad9,_0x27247a);VisuMZ['BattleSystemATB']['JS'][_0x391da7]=new Function(_0x5b4425);}},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x1dd)]=function(_0x4dd7fb,_0x37c68e){const _0x364474=_0x310c00;if(VisuMZ['createKeyJS'])return VisuMZ[_0x364474(0x1dd)](_0x4dd7fb,_0x37c68e);let _0x32b5fe='';if($dataActors['includes'](_0x4dd7fb))_0x32b5fe=_0x364474(0x221)[_0x364474(0x214)](_0x4dd7fb['id'],_0x37c68e);if($dataClasses['includes'](_0x4dd7fb))_0x32b5fe=_0x364474(0x24a)[_0x364474(0x214)](_0x4dd7fb['id'],_0x37c68e);if($dataSkills[_0x364474(0x232)](_0x4dd7fb))_0x32b5fe='Skill-%1-%2'[_0x364474(0x214)](_0x4dd7fb['id'],_0x37c68e);if($dataItems[_0x364474(0x232)](_0x4dd7fb))_0x32b5fe=_0x364474(0x343)[_0x364474(0x214)](_0x4dd7fb['id'],_0x37c68e);if($dataWeapons['includes'](_0x4dd7fb))_0x32b5fe=_0x364474(0x1a6)['format'](_0x4dd7fb['id'],_0x37c68e);if($dataArmors['includes'](_0x4dd7fb))_0x32b5fe='Armor-%1-%2'[_0x364474(0x214)](_0x4dd7fb['id'],_0x37c68e);if($dataEnemies[_0x364474(0x232)](_0x4dd7fb))_0x32b5fe=_0x364474(0x2c9)[_0x364474(0x214)](_0x4dd7fb['id'],_0x37c68e);if($dataStates[_0x364474(0x232)](_0x4dd7fb))_0x32b5fe=_0x364474(0x1ea)[_0x364474(0x214)](_0x4dd7fb['id'],_0x37c68e);return _0x32b5fe;},ConfigManager[_0x310c00(0x1af)]=!![],VisuMZ[_0x310c00(0x18e)]['ConfigManager_makeData']=ConfigManager[_0x310c00(0x34d)],ConfigManager['makeData']=function(){const _0x5db30e=_0x310c00,_0x161a65=VisuMZ[_0x5db30e(0x18e)]['ConfigManager_makeData'][_0x5db30e(0x1ef)](this);return _0x161a65[_0x5db30e(0x1af)]=this[_0x5db30e(0x1af)],_0x161a65;},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x37d)]=ConfigManager[_0x310c00(0x23f)],ConfigManager[_0x310c00(0x23f)]=function(_0x16fa46){const _0xc8106c=_0x310c00;VisuMZ[_0xc8106c(0x18e)][_0xc8106c(0x37d)][_0xc8106c(0x1ef)](this,_0x16fa46),_0xc8106c(0x1af)in _0x16fa46?_0xc8106c(0x2ce)==='VHvKo'?(_0x4d8c40[_0xc8106c(0x1e2)]['update']['call'](this),this[_0xc8106c(0x26d)](),this[_0xc8106c(0x227)](),this[_0xc8106c(0x238)]()):this[_0xc8106c(0x1af)]=_0x16fa46[_0xc8106c(0x1af)]:_0xc8106c(0x318)!==_0xc8106c(0x2ad)?this[_0xc8106c(0x1af)]=!![]:(_0x21c371['BattleSystemATB'][_0xc8106c(0x2cd)][_0xc8106c(0x1ef)](this),this[_0xc8106c(0x272)]());},ImageManager[_0x310c00(0x2ef)]=ImageManager[_0x310c00(0x2ef)]||0x9,ImageManager[_0x310c00(0x366)]=ImageManager['svActorVertCells']||0x6,TextManager[_0x310c00(0x1af)]=VisuMZ[_0x310c00(0x18e)][_0x310c00(0x200)][_0x310c00(0x285)]['Name'],VisuMZ[_0x310c00(0x18e)][_0x310c00(0x2fa)]=ColorManager[_0x310c00(0x24b)],ColorManager[_0x310c00(0x24b)]=function(){const _0x55898c=_0x310c00;VisuMZ[_0x55898c(0x18e)][_0x55898c(0x2fa)][_0x55898c(0x1ef)](this),this[_0x55898c(0x21b)][_0x55898c(0x201)](this[_0x55898c(0x246)]['bind'](this));},ColorManager[_0x310c00(0x2dd)]=function(_0x36425d){const _0x1eb7fc=_0x310c00;_0x36425d=String(_0x36425d);if(_0x36425d['match'](/#(.*)/i))return _0x1eb7fc(0x29d)['format'](String(RegExp['$1']));else{if(_0x1eb7fc(0x21e)===_0x1eb7fc(0x1bc)){if(!_0x4322f3[_0x1eb7fc(0x341)]())return;if(!_0x4f456e[_0x1eb7fc(0x200)][_0x1eb7fc(0x18d)])return;if(!_0x4e764f[_0x1eb7fc(0x1af)])return;this[_0x1eb7fc(0x241)]=new _0x53c2ef(new _0x231f93(0x0,0x0,0x0,0x0));const _0x4606b7=this[_0x1eb7fc(0x18a)](this[_0x1eb7fc(0x16e)]);this[_0x1eb7fc(0x1d5)](this[_0x1eb7fc(0x241)],_0x4606b7);}else return this[_0x1eb7fc(0x264)](Number(_0x36425d));}},ColorManager['setupBattleSystemATBColors']=function(){const _0x4b1abb=_0x310c00,_0x3de739=[_0x4b1abb(0x346),_0x4b1abb(0x35a),_0x4b1abb(0x1e4),_0x4b1abb(0x1bd),'slow',_0x4b1abb(0x254)],_0x48a73c=VisuMZ[_0x4b1abb(0x18e)][_0x4b1abb(0x200)]['Color'];this[_0x4b1abb(0x350)]={};for(const _0x1906f6 of _0x3de739){for(let _0x19008d=0x1;_0x19008d<=0x2;_0x19008d++){if(_0x4b1abb(0x33a)!=='xgWYE'){if(this[_0x4b1abb(0x1b5)]!==_0x5d94a1)return this[_0x4b1abb(0x1b5)];const _0x88d7b6=_0x119252[_0x4b1abb(0x200)][_0x4b1abb(0x208)];return this[_0x4b1abb(0x1b5)]=[_0x4b1abb(0x182),_0x4b1abb(0x28f)][_0x4b1abb(0x232)](_0x88d7b6),this[_0x4b1abb(0x1b5)];}else{const _0x3cf5aa=_0x1906f6+_0x19008d;this['_atbColors'][_0x3cf5aa]=this[_0x4b1abb(0x2dd)](_0x48a73c[_0x3cf5aa]);}}}},ColorManager[_0x310c00(0x344)]=function(_0x10d521){const _0x227bb2=_0x310c00;if(this['_atbColors']===undefined)this[_0x227bb2(0x246)]();return this[_0x227bb2(0x350)][_0x10d521]||_0x227bb2(0x296);},SceneManager[_0x310c00(0x2cc)]=function(){const _0x1c8f7d=_0x310c00;return this['_scene']&&this[_0x1c8f7d(0x219)][_0x1c8f7d(0x29b)]===Scene_Battle;},BattleManager[_0x310c00(0x341)]=function(){const _0x48f9d4=_0x310c00;if(Imported[_0x48f9d4(0x1cf)]&&this['isCTB']())return![];return this[_0x48f9d4(0x2ae)]();},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x2f2)]=BattleManager[_0x310c00(0x1ee)],BattleManager[_0x310c00(0x1ee)]=function(){const _0x564b67=_0x310c00;if(!this[_0x564b67(0x2ae)]()){if(_0x564b67(0x280)===_0x564b67(0x280))return![];else _0x19999d[_0x564b67(0x341)]()&&_0x25486d&&_0x28214f['note']&&_0x41cc01[_0x564b67(0x205)][_0x564b67(0x19d)](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)?this[_0x564b67(0x36d)](_0x38c741(_0x429aea['$1'])):_0x120d42[_0x564b67(0x18e)]['Window_Help_setItem'][_0x564b67(0x1ef)](this,_0x41946f);}else return ConfigManager&&ConfigManager['atbActive']!==undefined?ConfigManager[_0x564b67(0x213)]:VisuMZ['BattleSystemATB'][_0x564b67(0x2f2)][_0x564b67(0x1ef)](this);},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x337)]=Game_System[_0x310c00(0x1e2)][_0x310c00(0x304)],Game_System[_0x310c00(0x1e2)]['initialize']=function(){const _0x46d809=_0x310c00;VisuMZ['BattleSystemATB'][_0x46d809(0x337)][_0x46d809(0x1ef)](this),this[_0x46d809(0x391)]();},Game_System[_0x310c00(0x1e2)][_0x310c00(0x391)]=function(){const _0x237b65=_0x310c00;this[_0x237b65(0x384)]=!![];},Game_System[_0x310c00(0x1e2)][_0x310c00(0x33d)]=function(){const _0xe626f0=_0x310c00;return this[_0xe626f0(0x384)]===undefined&&this[_0xe626f0(0x391)](),this[_0xe626f0(0x384)];},Game_System[_0x310c00(0x1e2)][_0x310c00(0x2e0)]=function(_0x25b66f){const _0x5128ef=_0x310c00;this[_0x5128ef(0x384)]===undefined&&this[_0x5128ef(0x391)](),this[_0x5128ef(0x384)]=_0x25b66f;},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x2b9)]=Game_Action[_0x310c00(0x1e2)][_0x310c00(0x2d3)],Game_Action[_0x310c00(0x1e2)][_0x310c00(0x2d3)]=function(_0x461616){const _0x2896bf=_0x310c00;VisuMZ['BattleSystemATB'][_0x2896bf(0x2b9)][_0x2896bf(0x1ef)](this,_0x461616),this[_0x2896bf(0x19c)](_0x461616);},Game_Action[_0x310c00(0x1e2)][_0x310c00(0x19c)]=function(_0x694871){const _0x224676=_0x310c00;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x224676(0x341)]())return;if(this[_0x224676(0x226)]())this['applyItemBattleSystemATBUserEffect'](_0x694871);},Game_Action[_0x310c00(0x1e2)]['applyItemBattleSystemATBUserEffect']=function(_0x53daa4){const _0x16b941=_0x310c00,_0x20bc63=this['item']()[_0x16b941(0x205)];if(_0x53daa4[_0x16b941(0x173)]()){const _0x15287d=VisuMZ[_0x16b941(0x18e)][_0x16b941(0x1dd)](this['item'](),_0x16b941(0x335));if(VisuMZ[_0x16b941(0x18e)]['JS'][_0x15287d]){const _0x9b8d93=VisuMZ[_0x16b941(0x18e)]['JS'][_0x15287d]['call'](this,this[_0x16b941(0x20c)](),_0x53daa4);_0x53daa4[_0x16b941(0x2ba)](_0x9b8d93);}_0x20bc63[_0x16b941(0x19d)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x53daa4[_0x16b941(0x2ba)](Number(RegExp['$1'])*0.01),_0x20bc63[_0x16b941(0x19d)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x53daa4[_0x16b941(0x223)](Number(RegExp['$1'])*0.01);}else{if(_0x53daa4[_0x16b941(0x2b6)]()){const _0x94135=VisuMZ['BattleSystemATB'][_0x16b941(0x1dd)](this[_0x16b941(0x226)](),'Cast');if(VisuMZ[_0x16b941(0x18e)]['JS'][_0x94135]){const _0x4ef2d6=VisuMZ['BattleSystemATB']['JS'][_0x94135][_0x16b941(0x1ef)](this,this['subject'](),_0x53daa4);_0x53daa4[_0x16b941(0x302)](_0x4ef2d6);}if(_0x20bc63[_0x16b941(0x19d)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if(_0x16b941(0x2a0)!=='lyhUN'){if(this[_0x16b941(0x299)]()){if(!this[_0x16b941(0x338)]())return![];}}else _0x53daa4[_0x16b941(0x302)](Number(RegExp['$1'])*0.01);}_0x20bc63[_0x16b941(0x19d)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x53daa4['changeAtbCastTime'](Number(RegExp['$1'])*0.01),_0x20bc63['match'](/<(?:ATB|TPB) INTERRUPT>/i)&&('lgJAV'===_0x16b941(0x2e3)?_0x53daa4[_0x16b941(0x196)]():this['initBattleSystemATB']());}}},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x27e)]=Game_Action['prototype']['applyGlobal'],Game_Action[_0x310c00(0x1e2)][_0x310c00(0x2d1)]=function(){const _0x4c65cb=_0x310c00;VisuMZ['BattleSystemATB'][_0x4c65cb(0x27e)]['call'](this),this['applyGlobalBattleSystemATBEffects']();},Game_Action[_0x310c00(0x1e2)][_0x310c00(0x230)]=function(){const _0x145dcc=_0x310c00;if(!this[_0x145dcc(0x226)]())return;if(!BattleManager[_0x145dcc(0x341)]())return;const _0x4a8fc5=this[_0x145dcc(0x226)]()['note'];let _0x3e46a5=0x0;this[_0x145dcc(0x1e5)]&&(_0x3e46a5=this[_0x145dcc(0x20c)]()[_0x145dcc(0x234)]);const _0x441429=VisuMZ[_0x145dcc(0x18e)][_0x145dcc(0x1dd)](this[_0x145dcc(0x226)](),_0x145dcc(0x2a9));VisuMZ[_0x145dcc(0x18e)]['JS'][_0x441429]&&(_0x3e46a5=VisuMZ['BattleSystemATB']['JS'][_0x441429][_0x145dcc(0x1ef)](this,this[_0x145dcc(0x20c)](),this[_0x145dcc(0x20c)]()));let _0x465fa2=this['item']()['speed']>0x0?this[_0x145dcc(0x226)]()[_0x145dcc(0x390)]:0x0;if(this[_0x145dcc(0x2d6)]())_0x465fa2+=this[_0x145dcc(0x20c)]()[_0x145dcc(0x37f)]();_0x3e46a5+=(_0x465fa2/0xfa0)[_0x145dcc(0x1a4)](0x0,0x1);this[_0x145dcc(0x226)]()['note'][_0x145dcc(0x19d)](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x3e46a5=Number(RegExp['$1'])*0.01);const _0x1507dd=this[_0x145dcc(0x20c)]()['traitObjects']()[_0x145dcc(0x361)](this['subject']()[_0x145dcc(0x2a6)]()),_0x258577=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x436b06=_0x1507dd[_0x145dcc(0x1ac)](_0x21e264=>_0x21e264&&_0x21e264[_0x145dcc(0x205)]['match'](_0x258577)?Number(RegExp['$1'])*0.01:0x0);_0x3e46a5=_0x436b06[_0x145dcc(0x1f0)]((_0x621979,_0x324c0d)=>_0x621979+_0x324c0d,_0x3e46a5),this[_0x145dcc(0x226)]()['note'][_0x145dcc(0x19d)](/<(?:ATB|TPB) INSTANT>/i)&&(_0x3e46a5=0xa),this['subject']()[_0x145dcc(0x29e)](_0x3e46a5);},Game_BattlerBase['prototype'][_0x310c00(0x2ba)]=function(_0x27de30){const _0x206080=_0x310c00;this[_0x206080(0x234)]=_0x27de30['clamp'](0x0,0x1);},Game_BattlerBase[_0x310c00(0x1e2)][_0x310c00(0x223)]=function(_0x35cd3f){const _0xc11f84=_0x310c00;this[_0xc11f84(0x2ba)](this[_0xc11f84(0x234)]+_0x35cd3f);},Game_BattlerBase[_0x310c00(0x1e2)][_0x310c00(0x302)]=function(_0x5a843f){const _0x2f6cfc=_0x310c00,_0x28b66f=this[_0x2f6cfc(0x291)]();this[_0x2f6cfc(0x334)]=(_0x28b66f*_0x5a843f)['clamp'](0x0,_0x28b66f);},Game_BattlerBase[_0x310c00(0x1e2)]['changeAtbCastTime']=function(_0x5a5215){const _0x59f152=_0x310c00,_0x1cef72=this[_0x59f152(0x291)](),_0x52adb0=_0x1cef72*_0x5a5215;this[_0x59f152(0x334)]=(this[_0x59f152(0x334)]+_0x52adb0)[_0x59f152(0x1a4)](0x0,_0x1cef72);},VisuMZ['BattleSystemATB'][_0x310c00(0x28c)]=Game_BattlerBase[_0x310c00(0x1e2)][_0x310c00(0x2fd)],Game_BattlerBase[_0x310c00(0x1e2)][_0x310c00(0x2fd)]=function(){const _0x2afd63=_0x310c00;VisuMZ['BattleSystemATB'][_0x2afd63(0x28c)][_0x2afd63(0x1ef)](this);if(BattleManager[_0x2afd63(0x2ae)]()){if(_0x2afd63(0x2b8)===_0x2afd63(0x31a))return _0x196193[_0x2afd63(0x18e)][_0x2afd63(0x2f2)]['call'](this);else this[_0x2afd63(0x2f1)]();}},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x369)]=Game_BattlerBase[_0x310c00(0x1e2)]['revive'],Game_BattlerBase['prototype']['revive']=function(){const _0x4eba89=_0x310c00;VisuMZ['BattleSystemATB'][_0x4eba89(0x369)][_0x4eba89(0x1ef)](this),BattleManager[_0x4eba89(0x2ae)]()&&this[_0x4eba89(0x2f1)]();},Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x173)]=function(){const _0x58f193=_0x310c00;return this[_0x58f193(0x20d)]===_0x58f193(0x2b3);},Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x2b6)]=function(){const _0x3c49b2=_0x310c00;return this[_0x3c49b2(0x20d)]===_0x3c49b2(0x239)&&this[_0x3c49b2(0x179)]()&&this[_0x3c49b2(0x179)]()[_0x3c49b2(0x226)]()&&this['currentAction']()[_0x3c49b2(0x226)]()[_0x3c49b2(0x390)]<0x0;},Game_BattlerBase[_0x310c00(0x1e2)][_0x310c00(0x193)]=function(){const _0x3d3bbc=_0x310c00;if(this['isAtbCastingState']())return this['_tpbCastTime']/this[_0x3d3bbc(0x291)]();else{if(_0x3d3bbc(0x1d9)!==_0x3d3bbc(0x1d9)){const _0x487f37=_0x2a086e(_0x4b6b1d['$1']);_0x487f37<_0x193e61?(_0x393ea3(_0x3d3bbc(0x17a)[_0x3d3bbc(0x214)](_0x4179ae,_0x487f37,_0x1cc61d)),_0x3c04e3[_0x3d3bbc(0x228)]()):_0x3c49d6=_0x1445e9['max'](_0x487f37,_0x33f003);}else return 0x0;}},Game_Battler[_0x310c00(0x1e2)]['atbStopped']=function(){const _0x244d0f=_0x310c00;return!this[_0x244d0f(0x2cf)]();},Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x29e)]=function(_0x14dccf){const _0xafc2e5=_0x310c00;this[_0xafc2e5(0x1e0)]=_0x14dccf;},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x236)]=BattleManager[_0x310c00(0x25e)],BattleManager[_0x310c00(0x25e)]=function(_0x2bc1ff){const _0x3d6137=_0x310c00;this['isTpb']()&&!_0x2bc1ff[_0x3d6137(0x2cf)]()&&(_0x2bc1ff[_0x3d6137(0x20b)]=!![]),VisuMZ['BattleSystemATB']['BattleManager_endBattlerActions'][_0x3d6137(0x1ef)](this,_0x2bc1ff),this[_0x3d6137(0x2ae)]()&&!_0x2bc1ff[_0x3d6137(0x2cf)]()&&(_0x2bc1ff[_0x3d6137(0x20b)]=![]);},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x1ca)]=Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x2f1)],Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x2f1)]=function(){const _0x4a2e95=_0x310c00;if(this[_0x4a2e95(0x20b)])return;VisuMZ[_0x4a2e95(0x18e)][_0x4a2e95(0x1ca)][_0x4a2e95(0x1ef)](this),this['_tpbChargeTime']+=this[_0x4a2e95(0x1e0)]||0x0;},Game_Battler['prototype'][_0x310c00(0x196)]=function(){const _0x51bf56=_0x310c00;if(!this[_0x51bf56(0x2b6)]())return;if(!this[_0x51bf56(0x179)]())return;if(!this[_0x51bf56(0x179)]()['item']())return;if(this[_0x51bf56(0x179)]()[_0x51bf56(0x226)]()[_0x51bf56(0x205)][_0x51bf56(0x19d)](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this[_0x51bf56(0x21a)](),this['clearTpbChargeTime'](),this['_tpbCastTime']=0x0,this['onAtbInterrupt']();},Game_Battler['prototype'][_0x310c00(0x242)]=function(){const _0x5a1276=_0x310c00,_0x1bade7=VisuMZ[_0x5a1276(0x18e)][_0x5a1276(0x200)][_0x5a1276(0x1e6)];if(Imported[_0x5a1276(0x180)]){if(_0x5a1276(0x225)!==_0x5a1276(0x225)){const _0x46fd95=_0x3e7e8e[_0x5a1276(0x200)],_0x48d355=this['battler'](),_0x1de73b=this[_0x5a1276(0x32a)](),_0x52996a=this[_0x5a1276(0x1d0)][_0x5a1276(0x33c)]['width'],_0x3610b5=this['_gaugeSprite'][_0x5a1276(0x33c)][_0x5a1276(0x1c0)],_0x3573c9=_0x46fd95[_0x5a1276(0x2d5)][_0x5a1276(0x1a4)](0x0,0x1),_0x41bae5=_0x46fd95[_0x5a1276(0x1fd)];let _0x1a950c=_0x48d355[_0x5a1276(0x36e)]()*_0x3573c9;_0x1a950c+=(0x1-_0x3573c9)*_0x48d355[_0x5a1276(0x193)]();if(_0x48d355===_0x142adb[_0x5a1276(0x1d4)])_0x1a950c=0x1;if(!_0x41bae5)_0x1a950c=0x1-_0x1a950c;let _0x3c396b=0x0;if(_0x1de73b)_0x3c396b=_0x1a950c*_0x52996a;else!_0x1de73b&&(_0x3c396b=_0x1a950c*_0x3610b5);return _0x280d15['round'](_0x3c396b);}else{const _0x532f09=_0x1bade7[_0x5a1276(0x38c)],_0x3e0186=_0x1bade7['InterruptMirror'],_0x162a95=_0x1bade7['InterruptMute'];$gameTemp[_0x5a1276(0x2c5)]([this],_0x532f09,_0x3e0186,_0x162a95);}}if(this[_0x5a1276(0x300)]()&&_0x1bade7[_0x5a1276(0x253)][_0x5a1276(0x25f)]>0x0){const _0x32e2e8=_0x1bade7[_0x5a1276(0x253)],_0x5cce4b={'textColor':ColorManager[_0x5a1276(0x2dd)](_0x1bade7['InterruptTextColor']),'flashColor':_0x1bade7[_0x5a1276(0x233)],'flashDuration':_0x1bade7['InterruptFlashDuration']};this['setupTextPopup'](_0x32e2e8,_0x5cce4b);}},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x31f)]=Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x1ce)],Game_Battler['prototype'][_0x310c00(0x1ce)]=function(){const _0x109631=_0x310c00;VisuMZ[_0x109631(0x18e)][_0x109631(0x31f)]['call'](this),BattleManager[_0x109631(0x341)]()&&(this[_0x109631(0x334)]>=this[_0x109631(0x291)]()&&(this[_0x109631(0x20d)]=_0x109631(0x2c8)));},VisuMZ[_0x310c00(0x18e)]['Game_Unit_updateTpb']=Game_Unit[_0x310c00(0x1e2)][_0x310c00(0x16f)],Game_Unit['prototype']['updateTpb']=function(){const _0x230852=_0x310c00;if(BattleManager['isATB']()){if(BattleManager[_0x230852(0x389)]()['some'](_0x498897=>_0x498897&&_0x498897[_0x230852(0x1a8)]()&&_0x498897[_0x230852(0x1db)]()&&_0x498897[_0x230852(0x20d)]===_0x230852(0x2c8)))return;}VisuMZ[_0x230852(0x18e)][_0x230852(0x217)]['call'](this);},VisuMZ[_0x310c00(0x18e)]['Game_Battler_onRestrict']=Game_Battler[_0x310c00(0x1e2)]['onRestrict'],Game_Battler[_0x310c00(0x1e2)]['onRestrict']=function(){const _0x36f9f5=_0x310c00;!VisuMZ['BattleSystemATB'][_0x36f9f5(0x200)][_0x36f9f5(0x257)][_0x36f9f5(0x2be)]&&(this['_onRestrictBypassAtbReset']=BattleManager[_0x36f9f5(0x341)]()),VisuMZ[_0x36f9f5(0x18e)][_0x36f9f5(0x2ff)][_0x36f9f5(0x1ef)](this),this['_onRestrictBypassAtbReset']=undefined;},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x2a8)]=Game_Actor[_0x310c00(0x1e2)][_0x310c00(0x21a)],Game_Actor['prototype'][_0x310c00(0x21a)]=function(){const _0x1d7371=_0x310c00;if(this[_0x1d7371(0x20b)]){if(_0x1d7371(0x2ab)===_0x1d7371(0x2ab)){if(!this[_0x1d7371(0x2b6)]())return;}else this[_0x1d7371(0x1de)](),this[_0x1d7371(0x23b)](),this[_0x1d7371(0x1bf)](),this['createLetterSprite'](),this[_0x1d7371(0x38f)](),this[_0x1d7371(0x1df)](!![]);}VisuMZ['BattleSystemATB'][_0x1d7371(0x2a8)][_0x1d7371(0x1ef)](this);},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x174)]=Game_Battler[_0x310c00(0x1e2)]['removeState'],Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x1b0)]=function(_0xffc0c9){const _0x56cdb3=_0x310c00,_0x5e3e90=!this[_0x56cdb3(0x2cf)]()&&BattleManager['isTpb']();VisuMZ[_0x56cdb3(0x18e)]['Game_Battler_removeState'][_0x56cdb3(0x1ef)](this,_0xffc0c9);if(this['isEnemy']())'SreZF'!==_0x56cdb3(0x1a0)?(!_0x2cd195[_0x56cdb3(0x18e)][_0x56cdb3(0x200)]['Mechanics'][_0x56cdb3(0x2be)]&&(this[_0x56cdb3(0x20b)]=_0x354a58[_0x56cdb3(0x341)]()),_0x211ee4[_0x56cdb3(0x18e)]['Game_Battler_onRestrict'][_0x56cdb3(0x1ef)](this),this[_0x56cdb3(0x20b)]=_0xede74e):this[_0x56cdb3(0x19a)](_0x56cdb3(0x26f));else _0x5e3e90&&this[_0x56cdb3(0x2cf)]()&&this[_0x56cdb3(0x37a)]()<=0x0&&(_0x56cdb3(0x269)===_0x56cdb3(0x235)?(this[_0x56cdb3(0x1d3)](),_0x25a0eb['BattleSystemATB'][_0x56cdb3(0x321)][_0x56cdb3(0x1ef)](this),this['process_VisuMZ_BattleSystemATB_JS_Notetags']()):(this['makeActions'](),this[_0x56cdb3(0x20d)]='charging',this[_0x56cdb3(0x20b)]=undefined));},Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x177)]=function(){const _0x37d0c7=_0x310c00;this[_0x37d0c7(0x1fa)]=![],this[_0x37d0c7(0x294)]++,this[_0x37d0c7(0x1d2)]=0x0,this[_0x37d0c7(0x23e)]()&&this[_0x37d0c7(0x38e)]();},Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x23e)]=function(){const _0xff137c=_0x310c00;if(this[_0xff137c(0x37a)]()!==0x0)return![];if(BattleManager[_0xff137c(0x341)]()){if(this['isEnemy']()){if(!this[_0xff137c(0x338)]())return![];}}return!![];},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x2a7)]=Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x2c1)],Game_Battler['prototype'][_0x310c00(0x2c1)]=function(){const _0x2aa530=_0x310c00;BattleManager[_0x2aa530(0x341)]()?this[_0x2aa530(0x324)]():'pgIkT'!==_0x2aa530(0x250)?(_0x47e335[_0x2aa530(0x18e)]['Game_Action_applyItemUserEffect'][_0x2aa530(0x1ef)](this,_0x5e72e4),this[_0x2aa530(0x19c)](_0xa2c1e7)):VisuMZ[_0x2aa530(0x18e)]['Game_Battler_applyTpbPenalty'][_0x2aa530(0x1ef)](this);},Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x324)]=function(){const _0x47bf88=_0x310c00;this[_0x47bf88(0x20d)]=_0x47bf88(0x2b3),this['_tpbChargeTime']+=VisuMZ[_0x47bf88(0x18e)][_0x47bf88(0x200)][_0x47bf88(0x257)][_0x47bf88(0x31b)]||0x0;},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x1a1)]=Game_Battler['prototype'][_0x310c00(0x2fe)],Game_Battler['prototype'][_0x310c00(0x2fe)]=function(){const _0x1c9554=_0x310c00;if(BattleManager[_0x1c9554(0x341)]())return VisuMZ['BattleSystemATB'][_0x1c9554(0x200)][_0x1c9554(0x257)][_0x1c9554(0x357)][_0x1c9554(0x1ef)](this,this);else{if('ueFYK'===_0x1c9554(0x16d))return VisuMZ[_0x1c9554(0x18e)][_0x1c9554(0x1a1)][_0x1c9554(0x1ef)](this);else{const _0x3e5be2=_0xd00db9[_0x1c9554(0x200)];if(!_0x3e5be2[_0x1c9554(0x328)])return;if(this['_unit']===_0x1052cd)return;const _0xd7f181=_0x3e5be2[_0x1c9554(0x220)],_0x592f1c=new _0x2f7f61();_0x592f1c[_0x1c9554(0x2f5)]['x']=this['anchor']['x'],_0x592f1c[_0x1c9554(0x2f5)]['y']=this[_0x1c9554(0x2f5)]['y'],_0x592f1c['bitmap']=new _0x29d35e(_0xd7f181,_0xd7f181),this[_0x1c9554(0x22c)]=_0x592f1c,this[_0x1c9554(0x2d0)](this['_letterSprite']);}}},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x2d2)]=Game_Battler[_0x310c00(0x1e2)]['tpbBaseSpeed'],Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x188)]=function(){const _0x4d52b7=_0x310c00;if(BattleManager['isATB']())return VisuMZ[_0x4d52b7(0x18e)][_0x4d52b7(0x200)][_0x4d52b7(0x257)]['TpbBaseSpeedCalcJS'][_0x4d52b7(0x1ef)](this,this);else{if(_0x4d52b7(0x277)===_0x4d52b7(0x1ae))for(let _0x12ff5e=0x1;_0x12ff5e<=0x2;_0x12ff5e++){const _0x1efab3=_0x1e996c+_0x12ff5e;this[_0x4d52b7(0x350)][_0x1efab3]=this[_0x4d52b7(0x2dd)](_0x2aca35[_0x1efab3]);}else return VisuMZ[_0x4d52b7(0x18e)][_0x4d52b7(0x2d2)]['call'](this);}},VisuMZ[_0x310c00(0x18e)]['Game_Battler_tpbRelativeSpeed']=Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x292)],Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x292)]=function(){const _0x4bf055=_0x310c00;if(BattleManager[_0x4bf055(0x341)]())return VisuMZ[_0x4bf055(0x18e)]['Settings']['Mechanics']['BattlerRelativeSpeedJS']['call'](this,this);else{if(_0x4bf055(0x229)===_0x4bf055(0x229))return VisuMZ[_0x4bf055(0x18e)][_0x4bf055(0x18b)][_0x4bf055(0x1ef)](this);else _0x4779b0[_0x4bf055(0x18e)][_0x4bf055(0x37d)]['call'](this,_0x4f2d86),'visualAtbGauge'in _0x3181e5?this[_0x4bf055(0x1af)]=_0x473701['visualAtbGauge']:this[_0x4bf055(0x1af)]=!![];}},VisuMZ['BattleSystemATB'][_0x310c00(0x353)]=Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x34e)],Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x34e)]=function(){const _0x2385da=_0x310c00;return BattleManager[_0x2385da(0x341)]()?this[_0x2385da(0x22e)]():VisuMZ[_0x2385da(0x18e)][_0x2385da(0x353)][_0x2385da(0x1ef)](this);},Game_Battler[_0x310c00(0x1e2)]['atbAcceleration']=function(){const _0x4f44e6=_0x310c00;let _0x54df1c=VisuMZ[_0x4f44e6(0x18e)][_0x4f44e6(0x200)][_0x4f44e6(0x257)][_0x4f44e6(0x376)][_0x4f44e6(0x1ef)](this,this);if(ConfigManager&&ConfigManager[_0x4f44e6(0x1bb)]!==undefined){const _0x4f1064=ConfigManager[_0x4f44e6(0x1bb)]-0x3;if(_0x4f1064>0x0)return _0x4f44e6(0x342)!=='svAoU'?_0x24b174*(_0x1f9635*0x2):_0x54df1c*(_0x4f1064*0x2);else{if(_0x4f1064<0x0)return _0x54df1c*(0x1/(_0x4f1064*-0x2));}}return _0x54df1c;},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x185)]=Game_Battler['prototype']['tpbRequiredCastTime'],Game_Battler[_0x310c00(0x1e2)][_0x310c00(0x291)]=function(){const _0x1da8f5=_0x310c00;if(BattleManager[_0x1da8f5(0x341)]()){if('mYpHR'===_0x1da8f5(0x327))return VisuMZ[_0x1da8f5(0x18e)][_0x1da8f5(0x200)][_0x1da8f5(0x257)][_0x1da8f5(0x26c)]['call'](this,this);else _0x335bb2=_0x1e2de1(_0x3d98b0['$1'])*0.01;}else return VisuMZ[_0x1da8f5(0x18e)][_0x1da8f5(0x185)]['call'](this);},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x315)]=Scene_Options['prototype'][_0x310c00(0x2db)],Scene_Options[_0x310c00(0x1e2)]['maxCommands']=function(){const _0x1eddff=_0x310c00;let _0x497f3d=VisuMZ['BattleSystemATB']['Scene_Options_maxCommands']['call'](this);const _0x4355e2=VisuMZ[_0x1eddff(0x18e)]['Settings'];if(_0x4355e2[_0x1eddff(0x285)][_0x1eddff(0x2a5)]&&_0x4355e2['Options'][_0x1eddff(0x314)]&&BattleManager[_0x1eddff(0x341)]())_0x497f3d++;return _0x497f3d;},Sprite_Battler['prototype']['createAtbGaugeSprite']=function(){const _0x2e0c71=_0x310c00;if(!BattleManager['isATB']())return;if(!ConfigManager[_0x2e0c71(0x1af)])return;const _0x3f46b7=VisuMZ[_0x2e0c71(0x18e)][_0x2e0c71(0x200)]['Gauge'],_0x131062=new Sprite_Gauge();_0x131062['anchor']['x']=_0x3f46b7['AnchorX'],_0x131062[_0x2e0c71(0x2f5)]['y']=_0x3f46b7[_0x2e0c71(0x1b8)],_0x131062[_0x2e0c71(0x23d)]['x']=_0x131062['scale']['y']=_0x3f46b7['Scale'],this[_0x2e0c71(0x2eb)]=_0x131062,this['addChild'](this[_0x2e0c71(0x2eb)]);},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x2f9)]=Sprite_Battler['prototype']['setBattler'],Sprite_Battler[_0x310c00(0x1e2)][_0x310c00(0x31e)]=function(_0x1c7564){const _0x5a5d5a=_0x310c00;VisuMZ['BattleSystemATB'][_0x5a5d5a(0x2f9)][_0x5a5d5a(0x1ef)](this,_0x1c7564),this[_0x5a5d5a(0x222)](_0x1c7564),this[_0x5a5d5a(0x1e1)]();},Sprite_Battler[_0x310c00(0x1e2)][_0x310c00(0x222)]=function(_0x2fb390){const _0x338b89=_0x310c00;if(!_0x2fb390)return;if(!this[_0x338b89(0x2eb)])return;if(_0x2fb390[_0x338b89(0x303)]()){}else{if(_0x2fb390[_0x338b89(0x299)]()){if(_0x338b89(0x1cd)===_0x338b89(0x1cd)){if(this[_0x338b89(0x29b)]===Sprite_Enemy&&_0x2fb390[_0x338b89(0x24c)]())return;if(this[_0x338b89(0x29b)]===Sprite_SvEnemy&&!_0x2fb390['hasSvBattler']())return;}else return _0x315413[_0x338b89(0x200)][_0x338b89(0x29f)];}}this[_0x338b89(0x2eb)][_0x338b89(0x2dc)](_0x2fb390,_0x338b89(0x1f5));},Sprite_Battler[_0x310c00(0x1e2)][_0x310c00(0x1e1)]=function(){const _0x7183f6=_0x310c00;if(!this[_0x7183f6(0x2eb)])return;const _0xd0dae0=this[_0x7183f6(0x281)]&&this[_0x7183f6(0x281)][_0x7183f6(0x1db)]()&&!this[_0x7183f6(0x281)][_0x7183f6(0x215)]();this[_0x7183f6(0x2eb)][_0x7183f6(0x38b)]=_0xd0dae0,this['_svBattlerSprite']&&this[_0x7183f6(0x194)]['_atbGaugeSprite']&&(this['_svBattlerSprite']['_atbGaugeSprite']['visible']=_0xd0dae0);},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x2cd)]=Sprite_Battler['prototype']['updateMain'],Sprite_Battler['prototype'][_0x310c00(0x211)]=function(){const _0x3a17ed=_0x310c00;VisuMZ['BattleSystemATB']['Sprite_Battler_updateMain'][_0x3a17ed(0x1ef)](this),this[_0x3a17ed(0x272)]();},Sprite_Battler['prototype']['updateAtbGaugeSpritePosition']=function(){const _0x2da740=_0x310c00;if(!this['_battler'])return;if(!this['_atbGaugeSprite'])return;const _0x23c654=VisuMZ[_0x2da740(0x18e)][_0x2da740(0x200)][_0x2da740(0x24f)],_0x59db18=this[_0x2da740(0x2eb)];let _0x1020e8=_0x23c654['OffsetX'];this['_battler'][_0x2da740(0x35d)]&&(_0x1020e8+=this['_battler'][_0x2da740(0x35d)]());let _0x2fc64b=_0x23c654[_0x2da740(0x382)];this[_0x2da740(0x281)][_0x2da740(0x176)]&&(_0x2da740(0x27a)!=='SqbWg'?this['setActionState'](_0x2da740(0x26f)):_0x2fc64b+=this[_0x2da740(0x281)][_0x2da740(0x176)]());_0x59db18['x']=_0x1020e8,_0x59db18['y']=-this[_0x2da740(0x1c0)]+_0x2fc64b;if(this[_0x2da740(0x281)][_0x2da740(0x299)]()){if('lXPdR'!==_0x2da740(0x36b))return _0x25cbb6[_0x2da740(0x341)]()?this[_0x2da740(0x22e)]():_0x224136[_0x2da740(0x18e)]['Game_Battler_tpbAcceleration'][_0x2da740(0x1ef)](this);else this[_0x2da740(0x281)]['enemy']()['note']['match'](/<HIDE (?:ATB|TPB) GAUGE>/i)&&(_0x59db18[_0x2da740(0x38b)]=![]);}if(this[_0x2da740(0x360)]()){if(_0x2da740(0x2da)!=='BYFfT')return _0x25994c[_0x2da740(0x18e)][_0x2da740(0x2fc)][_0x2da740(0x1ef)](this);else _0x59db18['y']+=_0x59db18['gaugeHeight']()*_0x23c654['Scale']-0x1;}this[_0x2da740(0x23d)]['x']<0x0&&(_0x59db18['scale']['x']=-Math[_0x2da740(0x1e3)](_0x59db18[_0x2da740(0x23d)]['x']));},Sprite_Battler[_0x310c00(0x1e2)][_0x310c00(0x360)]=function(){const _0x2cd9dc=_0x310c00;if(!Imported['VisuMZ_2_AggroControlSystem'])return![];if(this[_0x2cd9dc(0x281)]&&this[_0x2cd9dc(0x281)][_0x2cd9dc(0x299)]())return![];const _0x8802af=VisuMZ[_0x2cd9dc(0x1ed)]['Settings'][_0x2cd9dc(0x2f6)];if(!_0x8802af[_0x2cd9dc(0x388)])return![];if(!ConfigManager['aggroGauge'])return![];const _0x23d250=VisuMZ['BattleSystemATB'][_0x2cd9dc(0x200)][_0x2cd9dc(0x24f)];return _0x8802af[_0x2cd9dc(0x20a)]===_0x23d250['Scale']&&_0x8802af['AnchorX']===_0x23d250[_0x2cd9dc(0x310)]&&_0x8802af[_0x2cd9dc(0x1b8)]===_0x23d250['AnchorY']&&_0x8802af[_0x2cd9dc(0x1a7)]===_0x23d250[_0x2cd9dc(0x1a7)]&&_0x8802af[_0x2cd9dc(0x382)]===_0x23d250['OffsetY']&&!![];},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x1c4)]=Sprite_Battler['prototype'][_0x310c00(0x1da)],Sprite_Battler[_0x310c00(0x1e2)]['update']=function(){const _0x4e04d3=_0x310c00;VisuMZ['BattleSystemATB'][_0x4e04d3(0x1c4)][_0x4e04d3(0x1ef)](this);if(!this[_0x4e04d3(0x281)]&&this[_0x4e04d3(0x2eb)]){if(_0x4e04d3(0x22f)===_0x4e04d3(0x1f6)){if(!this[_0x4e04d3(0x2ae)]())return![];else return _0x2975c1&&_0x1a9bc8[_0x4e04d3(0x213)]!==_0x5ba48b?_0xcdac31[_0x4e04d3(0x213)]:_0x54ca0b['BattleSystemATB'][_0x4e04d3(0x2f2)]['call'](this);}else{this[_0x4e04d3(0x2eb)][_0x4e04d3(0x38b)]=![];if(this[_0x4e04d3(0x194)]){if('sExXh'!=='sExXh')return this[_0x4e04d3(0x31d)]();else this[_0x4e04d3(0x194)][_0x4e04d3(0x2eb)][_0x4e04d3(0x38b)]=![];}}}},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x30d)]=Sprite_Actor[_0x310c00(0x1e2)][_0x310c00(0x23a)],Sprite_Actor[_0x310c00(0x1e2)][_0x310c00(0x23a)]=function(){const _0x4d5d03=_0x310c00;VisuMZ[_0x4d5d03(0x18e)][_0x4d5d03(0x30d)][_0x4d5d03(0x1ef)](this),this[_0x4d5d03(0x298)]()&&(_0x4d5d03(0x2d7)==='Drxzl'?this[_0x4d5d03(0x304)](...arguments):this['createAtbGaugeSprite']());},Sprite_Actor[_0x310c00(0x1e2)][_0x310c00(0x298)]=function(){const _0x7bc2da=_0x310c00;return VisuMZ[_0x7bc2da(0x18e)][_0x7bc2da(0x200)]['Gauge'][_0x7bc2da(0x274)];},Sprite_SvEnemy['prototype'][_0x310c00(0x298)]=function(){const _0x4af350=_0x310c00;return VisuMZ['BattleSystemATB'][_0x4af350(0x200)][_0x4af350(0x24f)]['ShowEnemyGauge'];},VisuMZ[_0x310c00(0x18e)]['Sprite_Enemy_createStateIconSprite']=Sprite_Enemy[_0x310c00(0x1e2)][_0x310c00(0x268)],Sprite_Enemy[_0x310c00(0x1e2)][_0x310c00(0x268)]=function(){const _0x24c1f7=_0x310c00;VisuMZ[_0x24c1f7(0x18e)][_0x24c1f7(0x200)][_0x24c1f7(0x24f)][_0x24c1f7(0x2ec)]&&this[_0x24c1f7(0x1e9)](),VisuMZ[_0x24c1f7(0x18e)][_0x24c1f7(0x2c6)]['call'](this);},VisuMZ['BattleSystemATB'][_0x310c00(0x2cb)]=Sprite_Enemy[_0x310c00(0x1e2)][_0x310c00(0x34a)],Sprite_Enemy[_0x310c00(0x1e2)]['startEffect']=function(_0x56be33){const _0x4f3143=_0x310c00;VisuMZ[_0x4f3143(0x18e)][_0x4f3143(0x2cb)][_0x4f3143(0x1ef)](this,_0x56be33);if(_0x56be33===_0x4f3143(0x385)||_0x4f3143(0x262)){if(_0x4f3143(0x36c)!==_0x4f3143(0x36c)){const _0x288f1c=_0xb43653[_0x4f3143(0x200)],_0x23602d=this[_0x4f3143(0x32a)](),_0x85ab45=this['_unit']===_0x388c6b?_0x4f3143(0x18f):_0x4f3143(0x191),_0x4c507f=_0x288f1c['MarkerOffset'],_0x182e5c=_0x288f1c['%1Side'['format'](_0x85ab45)];_0x23602d?(this['y']=_0x288f1c[_0x4f3143(0x372)]/0x2,this['y']+=_0x182e5c?-_0x4c507f:_0x4c507f):(this['x']=_0x288f1c[_0x4f3143(0x372)]/0x2,this['x']+=_0x182e5c?_0x4c507f:-_0x4c507f);}else this[_0x4f3143(0x1e1)]();}},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x325)]=Game_BattlerBase[_0x310c00(0x1e2)][_0x310c00(0x385)],Game_BattlerBase[_0x310c00(0x1e2)][_0x310c00(0x385)]=function(){const _0x39f784=_0x310c00;VisuMZ[_0x39f784(0x18e)][_0x39f784(0x325)][_0x39f784(0x1ef)](this);if(this[_0x39f784(0x299)]()&&BattleManager[_0x39f784(0x341)]()&&this['battler']()){if(_0x39f784(0x2e8)===_0x39f784(0x2f0)){const _0x24289e=new _0x304dd4();_0x24289e[_0x39f784(0x2f5)]['x']=this[_0x39f784(0x2f5)]['x'],_0x24289e[_0x39f784(0x2f5)]['y']=this['anchor']['y'],this[_0x39f784(0x289)]=_0x24289e,this[_0x39f784(0x2d0)](this['_graphicSprite']),this[_0x39f784(0x31d)]();}else this[_0x39f784(0x300)]()[_0x39f784(0x17d)]=!![],this['battler']()['updateAtbGaugeSpriteVisibility']();}},VisuMZ['BattleSystemATB'][_0x310c00(0x1f7)]=Sprite_Gauge[_0x310c00(0x1e2)]['gaugeColor1'],Sprite_Gauge[_0x310c00(0x1e2)][_0x310c00(0x198)]=function(){const _0x133e56=_0x310c00;if(this[_0x133e56(0x383)]===_0x133e56(0x1f5))return this[_0x133e56(0x2df)](0x1);return VisuMZ[_0x133e56(0x18e)][_0x133e56(0x1f7)][_0x133e56(0x1ef)](this);},VisuMZ[_0x310c00(0x18e)]['Sprite_Gauge_gaugeColor2']=Sprite_Gauge[_0x310c00(0x1e2)][_0x310c00(0x186)],Sprite_Gauge[_0x310c00(0x1e2)]['gaugeColor2']=function(){const _0x4a5f20=_0x310c00;if(this[_0x4a5f20(0x383)]==='time')return this[_0x4a5f20(0x2df)](0x2);return VisuMZ[_0x4a5f20(0x18e)][_0x4a5f20(0x2ee)]['call'](this);},Sprite_Gauge[_0x310c00(0x1e2)]['atbGaugeColor']=function(_0x9aa496){const _0x812ee7=_0x310c00;if(!this[_0x812ee7(0x281)])return ColorManager[_0x812ee7(0x344)](_0x812ee7(0x326)[_0x812ee7(0x214)](_0x9aa496));if(this[_0x812ee7(0x281)][_0x812ee7(0x271)]())return ColorManager[_0x812ee7(0x344)](_0x812ee7(0x290)[_0x812ee7(0x214)](_0x9aa496));if(this['_battler']['isAtbCastingState']())return ColorManager['atbColor']('cast%1'[_0x812ee7(0x214)](_0x9aa496));if(this[_0x812ee7(0x276)]()>=0x1)return ColorManager['atbColor']('full%1'[_0x812ee7(0x214)](_0x9aa496));const _0x9233d7=VisuMZ['BattleSystemATB'][_0x812ee7(0x200)][_0x812ee7(0x24f)],_0x55710f=this[_0x812ee7(0x281)]['paramRate'](0x6)*this['_battler']['paramBuffRate'](0x6);if(_0x55710f<=_0x9233d7['SlowRate'])return ColorManager[_0x812ee7(0x344)](_0x812ee7(0x1f8)[_0x812ee7(0x214)](_0x9aa496));if(_0x55710f>=_0x9233d7['FastRate'])return ColorManager[_0x812ee7(0x344)](_0x812ee7(0x288)[_0x812ee7(0x214)](_0x9aa496));return ColorManager['atbColor'](_0x812ee7(0x326)[_0x812ee7(0x214)](_0x9aa496));},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x36a)]=Sprite_Gauge[_0x310c00(0x1e2)][_0x310c00(0x37c)],Sprite_Gauge['prototype'][_0x310c00(0x37c)]=function(){const _0x3fab91=_0x310c00;if(this[_0x3fab91(0x281)]&&this[_0x3fab91(0x383)]===_0x3fab91(0x1f5))return this[_0x3fab91(0x255)]();return VisuMZ[_0x3fab91(0x18e)][_0x3fab91(0x36a)]['call'](this);},Sprite_Gauge['prototype']['atbCurrentValue']=function(){const _0x11552a=_0x310c00;return this[_0x11552a(0x281)][_0x11552a(0x2b6)]()?'DMgAO'==='DMgAO'?Math['max'](this['_battler']['_tpbCastTime'],0x0):this[_0x11552a(0x31d)]():_0x11552a(0x212)!==_0x11552a(0x320)?VisuMZ['BattleSystemATB']['Sprite_Gauge_currentValue']['call'](this):_0x332951['isATB']()?_0x5ef3c3['BattleSystemATB']['Settings'][_0x11552a(0x257)][_0x11552a(0x357)][_0x11552a(0x1ef)](this,this):_0x1960dc[_0x11552a(0x18e)]['Game_Battler_tpbSpeed'][_0x11552a(0x1ef)](this);},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x2fc)]=Sprite_Gauge[_0x310c00(0x1e2)][_0x310c00(0x32d)],Sprite_Gauge[_0x310c00(0x1e2)][_0x310c00(0x32d)]=function(){const _0x11fb07=_0x310c00;if(this[_0x11fb07(0x281)]&&this[_0x11fb07(0x383)]===_0x11fb07(0x1f5))return this[_0x11fb07(0x32f)]();return VisuMZ[_0x11fb07(0x18e)][_0x11fb07(0x2fc)]['call'](this);},Sprite_Gauge['prototype']['atbCurrentMaxValue']=function(){const _0x530c1e=_0x310c00;return this[_0x530c1e(0x281)][_0x530c1e(0x2b6)]()?Math[_0x530c1e(0x392)](this[_0x530c1e(0x281)][_0x530c1e(0x291)](),0x1):VisuMZ[_0x530c1e(0x18e)][_0x530c1e(0x2fc)][_0x530c1e(0x1ef)](this);},VisuMZ['BattleSystemATB']['Window_Help_setItem']=Window_Help[_0x310c00(0x1e2)][_0x310c00(0x354)],Window_Help[_0x310c00(0x1e2)]['setItem']=function(_0x439a79){const _0x3ad5ca=_0x310c00;BattleManager['isATB']()&&_0x439a79&&_0x439a79[_0x3ad5ca(0x205)]&&_0x439a79['note']['match'](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)?'CrzJH'===_0x3ad5ca(0x284)?this[_0x3ad5ca(0x36d)](String(RegExp['$1'])):_0x14fabc[_0x3ad5ca(0x18e)][_0x3ad5ca(0x21c)][_0x3ad5ca(0x1ef)](this,_0xd744bd):VisuMZ[_0x3ad5ca(0x18e)]['Window_Help_setItem'][_0x3ad5ca(0x1ef)](this,_0x439a79);},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x261)]=Window_StatusBase[_0x310c00(0x1e2)][_0x310c00(0x1fb)],Window_StatusBase[_0x310c00(0x1e2)][_0x310c00(0x1fb)]=function(_0x42beaf,_0x1e031c,_0x1e1aec,_0x1b6963){const _0x23edcf=_0x310c00;if(!this['showVisualAtbGauge'](_0x1e031c))return;VisuMZ[_0x23edcf(0x18e)]['Window_StatusBase_placeGauge'][_0x23edcf(0x1ef)](this,_0x42beaf,_0x1e031c,_0x1e1aec,_0x1b6963);},Window_StatusBase[_0x310c00(0x1e2)][_0x310c00(0x2f3)]=function(_0x108b3b){const _0x3590a6=_0x310c00;if(_0x108b3b!==_0x3590a6(0x1f5))return!![];if(![_0x3590a6(0x1e8),'Window_SideviewUiBattleStatus'][_0x3590a6(0x232)](this['constructor'][_0x3590a6(0x1b4)]))return![];if(!BattleManager[_0x3590a6(0x341)]())return![];if(!ConfigManager[_0x3590a6(0x1af)])return![];return VisuMZ[_0x3590a6(0x18e)]['Settings'][_0x3590a6(0x24f)][_0x3590a6(0x27c)];},VisuMZ[_0x310c00(0x18e)][_0x310c00(0x29a)]=Window_Options[_0x310c00(0x1e2)][_0x310c00(0x18c)],Window_Options['prototype'][_0x310c00(0x18c)]=function(){const _0x233ff1=_0x310c00;VisuMZ[_0x233ff1(0x18e)][_0x233ff1(0x29a)][_0x233ff1(0x1ef)](this),this[_0x233ff1(0x38d)]();},Window_Options[_0x310c00(0x1e2)][_0x310c00(0x38d)]=function(){const _0x267cb5=_0x310c00;if(!BattleManager[_0x267cb5(0x341)]())return;VisuMZ['BattleSystemATB'][_0x267cb5(0x200)][_0x267cb5(0x285)][_0x267cb5(0x2a5)]&&this['addBattleSystemATBShowGaugeCommand']();},Window_Options[_0x310c00(0x1e2)][_0x310c00(0x190)]=function(){const _0x24a324=_0x310c00,_0x1f7ae6=TextManager[_0x24a324(0x1af)],_0x4a28d9='visualAtbGauge';this['addCommand'](_0x1f7ae6,_0x4a28d9);},Game_BattlerBase[_0x310c00(0x1e2)][_0x310c00(0x348)]=function(){const _0x13071a=_0x310c00;delete this[_0x13071a(0x2aa)],delete this[_0x13071a(0x30a)],delete this[_0x13071a(0x204)],delete this['_fieldAtbGaugeIconIndex'];},Game_BattlerBase['prototype'][_0x310c00(0x2bd)]=function(){const _0x5406aa=_0x310c00;return this['_fieldAtbGaugeGraphicType']===undefined&&(this[_0x5406aa(0x2aa)]=this[_0x5406aa(0x209)]()),this[_0x5406aa(0x2aa)];},Game_BattlerBase[_0x310c00(0x1e2)][_0x310c00(0x209)]=function(){const _0x5302c3=_0x310c00;return Sprite_FieldGaugeATB[_0x5302c3(0x200)][_0x5302c3(0x31c)];},Game_BattlerBase[_0x310c00(0x1e2)]['fieldAtbGraphicFaceName']=function(){const _0x59ccef=_0x310c00;return this[_0x59ccef(0x30a)]===undefined&&(this[_0x59ccef(0x30a)]=this[_0x59ccef(0x29c)]()),this[_0x59ccef(0x30a)];},Game_BattlerBase[_0x310c00(0x1e2)]['createFieldAtbGraphicFaceName']=function(){const _0x32cb5b=_0x310c00;return Sprite_FieldGaugeATB[_0x32cb5b(0x200)][_0x32cb5b(0x359)];},Game_BattlerBase['prototype']['fieldAtbGraphicFaceIndex']=function(){const _0x2ef55b=_0x310c00;return this[_0x2ef55b(0x204)]===undefined&&(this['_fieldAtbGaugeFaceIndex']=this[_0x2ef55b(0x331)]()),this['_fieldAtbGaugeFaceIndex'];},Game_BattlerBase[_0x310c00(0x1e2)][_0x310c00(0x331)]=function(){const _0x2d8448=_0x310c00;return Sprite_FieldGaugeATB[_0x2d8448(0x200)][_0x2d8448(0x29f)];},Game_BattlerBase['prototype'][_0x310c00(0x1a2)]=function(){const _0x5da6ed=_0x310c00;if(this[_0x5da6ed(0x356)]===undefined){if(_0x5da6ed(0x307)===_0x5da6ed(0x307))this[_0x5da6ed(0x356)]=this[_0x5da6ed(0x319)]();else{const _0x53e7b1=_0x3bfd93['maxBattleMembers']();for(let _0x15dd68=0x0;_0x15dd68<_0x53e7b1;_0x15dd68++){this[_0x5da6ed(0x309)](_0x15dd68,_0x37e4a9);}}}return this[_0x5da6ed(0x356)];},Game_BattlerBase[_0x310c00(0x1e2)][_0x310c00(0x319)]=function(){const _0x4dabc8=_0x310c00;return Sprite_FieldGaugeATB[_0x4dabc8(0x200)][_0x4dabc8(0x283)];},Game_BattlerBase['prototype']['setAtbGraphicIconIndex']=function(_0xc6e23b){this['_fieldAtbGaugeIconIndex']=_0xc6e23b;},Game_Actor[_0x310c00(0x1e2)][_0x310c00(0x209)]=function(){const _0x5c7d13=_0x310c00,_0x5a55b3=this[_0x5c7d13(0x386)]()['note'];if(_0x5a55b3[_0x5c7d13(0x19d)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x5c7d13(0x355);else{if(_0x5a55b3['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x5c7d13(0x171);}return Sprite_FieldGaugeATB['Settings'][_0x5c7d13(0x189)];},Game_Actor[_0x310c00(0x1e2)][_0x310c00(0x29c)]=function(){const _0xa3c088=_0x310c00,_0x47e303=this[_0xa3c088(0x386)]()['note'];if(_0x47e303[_0xa3c088(0x19d)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this['faceName']();},Game_Actor[_0x310c00(0x1e2)][_0x310c00(0x331)]=function(){const _0x8b82f3=_0x310c00,_0x37388e=this['actor']()[_0x8b82f3(0x205)];if(_0x37388e[_0x8b82f3(0x19d)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x8b82f3(0x30e)]();},Game_Actor[_0x310c00(0x1e2)]['createFieldAtbGraphicIconIndex']=function(){const _0x3d63f6=_0x310c00,_0x460722=this[_0x3d63f6(0x386)]()[_0x3d63f6(0x205)];if(_0x460722[_0x3d63f6(0x19d)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x3d63f6(0x200)]['ActorBattlerIcon'];},Game_Enemy['prototype']['createFieldAtbGraphicType']=function(){const _0x2ef2fa=_0x310c00,_0x253d84=this[_0x2ef2fa(0x2e5)]()['note'];if(_0x253d84[_0x2ef2fa(0x19d)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x2ef2fa(0x355);else{if(_0x253d84[_0x2ef2fa(0x19d)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i)){if(_0x2ef2fa(0x30c)!=='ZqtAr')return _0x2ef2fa(0x171);else{const _0x4cda4a=this[_0x2ef2fa(0x2e5)]()[_0x2ef2fa(0x205)];if(_0x4cda4a[_0x2ef2fa(0x19d)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x720082(_0x17c700['$1']);return _0x3083fc[_0x2ef2fa(0x200)][_0x2ef2fa(0x283)];}}}return Sprite_FieldGaugeATB[_0x2ef2fa(0x200)][_0x2ef2fa(0x31c)];},Game_Enemy[_0x310c00(0x1e2)][_0x310c00(0x29c)]=function(){const _0x10f57e=_0x310c00,_0x514f5b=this['enemy']()[_0x10f57e(0x205)];if(_0x514f5b['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x10f57e(0x2af)===_0x10f57e(0x2af)?String(RegExp['$1']):_0x42cf70(_0x28e01c['$1']);return Sprite_FieldGaugeATB[_0x10f57e(0x200)][_0x10f57e(0x359)];},Game_Enemy[_0x310c00(0x1e2)][_0x310c00(0x331)]=function(){const _0x4afa6c=_0x310c00,_0x390157=this['enemy']()[_0x4afa6c(0x205)];if(_0x390157[_0x4afa6c(0x19d)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x4afa6c(0x1b6)===_0x4afa6c(0x1b6)?Number(RegExp['$2']):_0x3b775f[_0x4afa6c(0x18e)][_0x4afa6c(0x200)]['Gauge'][_0x4afa6c(0x2ec)];return Sprite_FieldGaugeATB['Settings'][_0x4afa6c(0x29f)];},Game_Enemy[_0x310c00(0x1e2)][_0x310c00(0x319)]=function(){const _0x5a5846=_0x310c00,_0x3ddb62=this[_0x5a5846(0x2e5)]()[_0x5a5846(0x205)];if(_0x3ddb62[_0x5a5846(0x19d)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i)){if(_0x5a5846(0x2d9)!=='zBVZm'){const _0x3a2ef7=_0x4c281f(_0x84421e['$1']),_0x40b1bb=_0x5a5846(0x19e)['format'](_0x3a2ef7,_0x373c46),_0x606cf1=_0x3bcf49[_0x5a5846(0x18e)][_0x5a5846(0x1dd)](_0x149e8e,_0x47bd93);_0x2801c5['BattleSystemATB']['JS'][_0x606cf1]=new _0x311035(_0x40b1bb);}else return Number(RegExp['$1']);}return Sprite_FieldGaugeATB['Settings']['EnemyBattlerIcon'];},VisuMZ['BattleSystemATB'][_0x310c00(0x2e7)]=Scene_Battle[_0x310c00(0x1e2)][_0x310c00(0x316)],Scene_Battle[_0x310c00(0x1e2)]['createAllWindows']=function(){const _0x28be3a=_0x310c00;this['createFieldGaugeContainerATB'](),VisuMZ[_0x28be3a(0x18e)][_0x28be3a(0x2e7)][_0x28be3a(0x1ef)](this),this[_0x28be3a(0x1eb)]();},Scene_Battle[_0x310c00(0x1e2)]['createFieldGaugeContainerATB']=function(){const _0x57dfee=_0x310c00;if(!BattleManager[_0x57dfee(0x341)]())return;if(!Sprite_FieldGaugeATB[_0x57dfee(0x200)][_0x57dfee(0x18d)])return;if(!ConfigManager[_0x57dfee(0x1af)])return;this[_0x57dfee(0x241)]=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0x4a0465=this[_0x57dfee(0x18a)](this[_0x57dfee(0x16e)]);this[_0x57dfee(0x1d5)](this['_fieldGaugeATB_Container'],_0x4a0465);},Scene_Battle['prototype'][_0x310c00(0x1eb)]=function(){const _0x3f29ab=_0x310c00;if(!BattleManager['isATB']())return;if(!Sprite_FieldGaugeATB[_0x3f29ab(0x200)][_0x3f29ab(0x18d)])return;if(!ConfigManager[_0x3f29ab(0x1af)])return;this[_0x3f29ab(0x17e)]=new Sprite_FieldGaugeATB(),this[_0x3f29ab(0x241)][_0x3f29ab(0x2d0)](this['_fieldGaugeATB']);};function Sprite_FieldGaugeATB(){const _0xe2a3f5=_0x310c00;this[_0xe2a3f5(0x304)](...arguments);}function _0x292d(_0x1b1d90,_0x615c89){const _0x5ce978=_0x5ce9();return _0x292d=function(_0x292d78,_0x304f77){_0x292d78=_0x292d78-0x16d;let _0x43d5f9=_0x5ce978[_0x292d78];return _0x43d5f9;},_0x292d(_0x1b1d90,_0x615c89);}Sprite_FieldGaugeATB[_0x310c00(0x1e2)]=Object[_0x310c00(0x22d)](Sprite[_0x310c00(0x1e2)]),Sprite_FieldGaugeATB[_0x310c00(0x1e2)][_0x310c00(0x29b)]=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB[_0x310c00(0x200)]=JsonEx[_0x310c00(0x1c7)](VisuMZ['BattleSystemATB']['Settings'][_0x310c00(0x1d1)]),Sprite_FieldGaugeATB[_0x310c00(0x1e2)]['initialize']=function(){const _0x1c3513=_0x310c00;Sprite[_0x1c3513(0x1e2)][_0x1c3513(0x304)][_0x1c3513(0x1ef)](this),this[_0x1c3513(0x371)](),this[_0x1c3513(0x206)](),this['createChildren']();},Sprite_FieldGaugeATB['prototype'][_0x310c00(0x371)]=function(){const _0x1638b3=_0x310c00;this['anchor']['x']=0.5,this[_0x1638b3(0x2f5)]['y']=0.5;},Sprite_FieldGaugeATB[_0x310c00(0x1e2)][_0x310c00(0x32a)]=function(){const _0x5e9f7e=_0x310c00;if(this[_0x5e9f7e(0x1b5)]!==undefined)return this[_0x5e9f7e(0x1b5)];const _0xc9ecd6=Sprite_FieldGaugeATB['Settings'][_0x5e9f7e(0x208)];return this['_horz']=['top',_0x5e9f7e(0x28f)][_0x5e9f7e(0x232)](_0xc9ecd6),this[_0x5e9f7e(0x1b5)];},Sprite_FieldGaugeATB[_0x310c00(0x1e2)][_0x310c00(0x206)]=function(){const _0x3506cf=_0x310c00,_0xfe5811=Sprite_FieldGaugeATB[_0x3506cf(0x200)][_0x3506cf(0x208)][_0x3506cf(0x1a3)]()[_0x3506cf(0x2ca)](),_0x31d437=Window_Base[_0x3506cf(0x1e2)][_0x3506cf(0x1b7)](),_0x3b933e=SceneManager[_0x3506cf(0x219)]['_statusWindow'][_0x3506cf(0x1c0)]+Math['round'](_0x31d437*0.5);this[_0x3506cf(0x256)]=0x0,this[_0x3506cf(0x295)]=0x0;switch(_0xfe5811){case _0x3506cf(0x182):this[_0x3506cf(0x256)]=Math['round'](Graphics[_0x3506cf(0x2f4)]*0.5),this[_0x3506cf(0x295)]=0x60;break;case _0x3506cf(0x28f):this['_homeX']=Math[_0x3506cf(0x306)](Graphics[_0x3506cf(0x2f4)]*0.5),this['_homeY']=Graphics[_0x3506cf(0x2e9)]-_0x3b933e;break;case'left':this[_0x3506cf(0x256)]=0x50,this[_0x3506cf(0x295)]=Math[_0x3506cf(0x306)]((Graphics[_0x3506cf(0x2e9)]-_0x3b933e)/0x2);break;case'right':this[_0x3506cf(0x256)]=Graphics[_0x3506cf(0x2f4)]-0x50,this[_0x3506cf(0x295)]=Math[_0x3506cf(0x306)]((Graphics[_0x3506cf(0x2e9)]-_0x3b933e)/0x2);break;}this['_homeX']+=Sprite_FieldGaugeATB[_0x3506cf(0x200)]['DisplayOffsetX']||0x0,this[_0x3506cf(0x295)]+=Sprite_FieldGaugeATB[_0x3506cf(0x200)][_0x3506cf(0x26a)]||0x0,this['x']=this[_0x3506cf(0x256)],this['y']=this[_0x3506cf(0x295)];},Sprite_FieldGaugeATB['prototype'][_0x310c00(0x28a)]=function(){const _0x17b28d=_0x310c00;this[_0x17b28d(0x364)](),this[_0x17b28d(0x370)](),this['createBattlerContainer']();},Sprite_FieldGaugeATB['prototype'][_0x310c00(0x364)]=function(){const _0x21cb95=_0x310c00;this['_skinSprite']=new Sprite(),this['_skinSprite'][_0x21cb95(0x2f5)]['x']=0.5,this[_0x21cb95(0x34c)][_0x21cb95(0x2f5)]['y']=0.5,this[_0x21cb95(0x2d0)](this['_skinSprite']);const _0x445f09=Sprite_FieldGaugeATB[_0x21cb95(0x200)][_0x21cb95(0x195)];if(_0x445f09)this[_0x21cb95(0x34c)][_0x21cb95(0x33c)]=ImageManager[_0x21cb95(0x349)](_0x445f09);},Sprite_FieldGaugeATB[_0x310c00(0x1e2)]['createGaugeSprite']=function(){const _0x107894=_0x310c00;this[_0x107894(0x1d0)]=new Sprite(),this[_0x107894(0x2d0)](this['_gaugeSprite']),this[_0x107894(0x22b)]();},Sprite_FieldGaugeATB['prototype']['createGaugeBitmap']=function(){const _0x126909=_0x310c00,_0x26e4b9=Sprite_FieldGaugeATB[_0x126909(0x200)],_0xdad89e=this[_0x126909(0x32a)](),_0x486cd5=_0xdad89e?_0x26e4b9[_0x126909(0x2b2)]:_0x26e4b9[_0x126909(0x372)],_0x4b0063=_0xdad89e?_0x26e4b9[_0x126909(0x372)]:_0x26e4b9[_0x126909(0x30b)];this['_gaugeSprite']['bitmap']=new Bitmap(_0x486cd5,_0x4b0063),this[_0x126909(0x377)](),this[_0x126909(0x1d0)]['x']=Math['ceil'](_0x486cd5/-0x2),this[_0x126909(0x1d0)]['y']=Math[_0x126909(0x358)](_0x4b0063/-0x2);},Sprite_FieldGaugeATB[_0x310c00(0x1e2)]['drawGaugeBitmap']=function(){const _0x18904b=_0x310c00;if(!Sprite_FieldGaugeATB['Settings']['DrawGauge'])return;const _0x5e14dd=Sprite_FieldGaugeATB['Settings'],_0x5b9eb0=this[_0x18904b(0x1d0)][_0x18904b(0x33c)],_0x30e328=_0x5b9eb0['width'],_0x4bd1ec=_0x5b9eb0[_0x18904b(0x1c0)],_0xb6fcbc=ColorManager['gaugeBackColor'](),_0x3defae=ColorManager[_0x18904b(0x2b0)](),_0x483d95=ColorManager[_0x18904b(0x24e)](),_0x11c829=ColorManager[_0x18904b(0x344)](_0x18904b(0x248)),_0x4ba9ec=ColorManager[_0x18904b(0x344)](_0x18904b(0x1f1)),_0x2b31ca=this[_0x18904b(0x32a)](),_0x3751d2=_0x5e14dd[_0x18904b(0x1fd)],_0x2fe420=_0x5e14dd[_0x18904b(0x2d5)][_0x18904b(0x1a4)](0x0,0x1),_0x424dcd=Math[_0x18904b(0x358)](((_0x2b31ca?_0x30e328:_0x4bd1ec)-0x2)*_0x2fe420);_0x5b9eb0[_0x18904b(0x25b)](0x0,0x0,_0x30e328,_0x4bd1ec,_0xb6fcbc);let _0x19bb02=0x0,_0x4952d3=0x0,_0x20a13a=0x0,_0x5134ad=0x0;if(_0x2b31ca&&_0x3751d2){if(_0x18904b(0x363)===_0x18904b(0x363))_0x19bb02=_0x424dcd-0x1,_0x20a13a=_0x30e328-0x3-_0x19bb02,_0x5b9eb0[_0x18904b(0x2ea)](0x1,0x1,_0x19bb02,_0x4bd1ec-0x2,_0x3defae,_0x483d95,![]),_0x5b9eb0[_0x18904b(0x2ea)](0x2+_0x19bb02,0x1,_0x20a13a,_0x4bd1ec-0x2,_0x11c829,_0x4ba9ec,![]);else return this[_0x18904b(0x264)](_0x3f2ef7(_0x4e34e6));}else{if(_0x2b31ca&&!_0x3751d2)_0x18904b(0x20e)===_0x18904b(0x282)?_0x55ebdb[_0x18904b(0x374)](_0x4c22bc(_0x33353a['$1'])*0.01):(_0x19bb02=_0x424dcd-0x1,_0x20a13a=_0x30e328-0x3-_0x19bb02,_0x5b9eb0[_0x18904b(0x2ea)](0x2+_0x20a13a,0x1,_0x19bb02,_0x4bd1ec-0x2,_0x3defae,_0x483d95,![]),_0x5b9eb0['gradientFillRect'](0x1,0x1,_0x20a13a,_0x4bd1ec-0x2,_0x11c829,_0x4ba9ec,![]));else{if(!_0x2b31ca&&_0x3751d2)_0x4952d3=_0x424dcd-0x1,_0x5134ad=_0x4bd1ec-0x3-_0x4952d3,_0x5b9eb0[_0x18904b(0x2ea)](0x1,0x1,_0x30e328-0x2,_0x4952d3,_0x3defae,_0x483d95,!![]),_0x5b9eb0['gradientFillRect'](0x1,0x2+_0x4952d3,_0x30e328-0x2,_0x5134ad,_0x11c829,_0x4ba9ec,!![]);else!_0x2b31ca&&!_0x3751d2&&(_0x4952d3=_0x424dcd-0x1,_0x5134ad=_0x4bd1ec-0x3-_0x4952d3,_0x5b9eb0[_0x18904b(0x2ea)](0x1,0x2+_0x5134ad,_0x30e328-0x2,_0x4952d3,_0x3defae,_0x483d95,!![]),_0x5b9eb0[_0x18904b(0x2ea)](0x1,0x1,_0x30e328-0x2,_0x5134ad,_0x11c829,_0x4ba9ec,!![]));}}},Sprite_FieldGaugeATB['prototype']['createBattlerContainer']=function(){const _0x292295=_0x310c00;this[_0x292295(0x26e)]&&this[_0x292295(0x1d0)][_0x292295(0x1b1)](this[_0x292295(0x26e)]),this[_0x292295(0x26e)]=new Sprite(),this[_0x292295(0x1d0)][_0x292295(0x2d0)](this['_battlerContainer']),this[_0x292295(0x387)]();},Sprite_FieldGaugeATB['prototype'][_0x310c00(0x387)]=function(){const _0x3f9e1a=_0x310c00;this[_0x3f9e1a(0x313)](),this[_0x3f9e1a(0x218)]();},Sprite_FieldGaugeATB[_0x310c00(0x1e2)]['createEnemySprites']=function(){const _0x11bc4a=_0x310c00,_0x4071a3=$gameTroop[_0x11bc4a(0x263)](),_0x2fc2be=_0x4071a3[_0x11bc4a(0x25f)];for(let _0x15c470=0x0;_0x15c470<_0x2fc2be;_0x15c470++){if(_0x11bc4a(0x2c0)!==_0x11bc4a(0x175))this[_0x11bc4a(0x309)](_0x15c470,$gameTroop);else{const _0x30633f=this[_0x11bc4a(0x300)]();if(!_0x30633f)return;if(!_0x30633f[_0x11bc4a(0x299)]())return;if(this[_0x11bc4a(0x21f)]===_0x30633f[_0x11bc4a(0x2d8)]())return;this[_0x11bc4a(0x21f)]=_0x30633f[_0x11bc4a(0x2d8)]();if(_0x30633f[_0x11bc4a(0x24c)]())this[_0x11bc4a(0x21f)]=0x0;this['_graphicSprite'][_0x11bc4a(0x1e7)](this[_0x11bc4a(0x21f)]);}}},Sprite_FieldGaugeATB[_0x310c00(0x1e2)][_0x310c00(0x218)]=function(){const _0x3b3da6=_0x310c00,_0x38441f=$gameParty[_0x3b3da6(0x380)]();for(let _0x32e201=0x0;_0x32e201<_0x38441f;_0x32e201++){_0x3b3da6(0x378)!==_0x3b3da6(0x378)?(this[_0x3b3da6(0x202)](),_0x17f17d[_0x3b3da6(0x18e)][_0x3b3da6(0x2e7)][_0x3b3da6(0x1ef)](this),this[_0x3b3da6(0x1eb)]()):this[_0x3b3da6(0x309)](_0x32e201,$gameParty);}},Sprite_FieldGaugeATB['prototype'][_0x310c00(0x309)]=function(_0x2a705b,_0x464f99){const _0x4c7f39=_0x310c00,_0x5b43cf=new Sprite_FieldMarkerATB(_0x2a705b,_0x464f99,this[_0x4c7f39(0x1d0)]);this[_0x4c7f39(0x26e)][_0x4c7f39(0x2d0)](_0x5b43cf);},Sprite_FieldGaugeATB['prototype'][_0x310c00(0x1da)]=function(){const _0x10f82c=_0x310c00;Sprite[_0x10f82c(0x1e2)][_0x10f82c(0x1da)][_0x10f82c(0x1ef)](this),this['updatePosition'](),this['updateBattleContainerOrder'](),this[_0x10f82c(0x238)]();},Sprite_FieldGaugeATB['prototype'][_0x310c00(0x26d)]=function(){const _0x54f0db=_0x310c00,_0x5b3624=Sprite_FieldGaugeATB[_0x54f0db(0x200)];if(_0x5b3624[_0x54f0db(0x208)]!==_0x54f0db(0x182))return;if(!_0x5b3624['RepositionTopForHelp'])return;const _0x44a70b=SceneManager[_0x54f0db(0x219)]['_helpWindow'];if(!_0x44a70b)return;if(_0x44a70b[_0x54f0db(0x38b)]){if(_0x54f0db(0x203)!=='OIfdb'){const _0x51bd8d=_0x4c21b9[_0x54f0db(0x330)][_0x54f0db(0x1f4)],_0x2aed39=_0x54f0db(0x2b7),_0x4295c2=[_0x54f0db(0x335),'Cast',_0x54f0db(0x2a9)];for(const _0x1c71c9 of _0x4295c2){const _0x2c9017=_0x2aed39[_0x54f0db(0x214)](_0x1c71c9[_0x54f0db(0x34f)]()['trim'](),_0x54f0db(0x183),_0x54f0db(0x27f)),_0x5d4e7e=new _0x22fd3a(_0x2c9017,'i');_0x21b50c[_0x54f0db(0x18e)][_0x54f0db(0x1f4)][_0x1c71c9]=_0x5d4e7e;}}else this['x']=this[_0x54f0db(0x256)]+(_0x5b3624[_0x54f0db(0x231)]||0x0),this['y']=this[_0x54f0db(0x295)]+(_0x5b3624[_0x54f0db(0x243)]||0x0);}else _0x54f0db(0x351)!==_0x54f0db(0x351)?this[_0x54f0db(0x2aa)]=this[_0x54f0db(0x209)]():(this['x']=this[_0x54f0db(0x256)],this['y']=this['_homeY']);const _0x5edcff=SceneManager[_0x54f0db(0x219)][_0x54f0db(0x16e)];this['x']+=_0x5edcff['x'],this['y']+=_0x5edcff['y'];},Sprite_FieldGaugeATB[_0x310c00(0x1e2)][_0x310c00(0x227)]=function(){const _0x2875a5=_0x310c00;if(!this[_0x2875a5(0x26e)])return;const _0x20776e=this['_battlerContainer'][_0x2875a5(0x297)];if(!_0x20776e)return;_0x20776e['sort'](this[_0x2875a5(0x279)]['bind'](this));},Sprite_FieldGaugeATB['prototype'][_0x310c00(0x279)]=function(_0x3d1700,_0x1cf570){const _0x3baf68=_0x310c00,_0x246d5c=this[_0x3baf68(0x32a)](),_0x33c41c=Sprite_FieldGaugeATB[_0x3baf68(0x200)][_0x3baf68(0x1fd)];if(_0x246d5c&&_0x33c41c)return _0x3d1700['x']-_0x1cf570['x'];else{if(_0x246d5c&&!_0x33c41c){if(_0x3baf68(0x207)!==_0x3baf68(0x207)){const _0x5836b0=_0x423320+_0x104bd5;this[_0x3baf68(0x350)][_0x5836b0]=this[_0x3baf68(0x2dd)](_0x5cec5a[_0x5836b0]);}else return _0x1cf570['x']-_0x3d1700['x'];}else{if(!_0x246d5c&&_0x33c41c)return _0x3d1700['y']-_0x1cf570['y'];else{if(!_0x246d5c&&!_0x33c41c)return _0x1cf570['y']-_0x3d1700['y'];}}}},Sprite_FieldGaugeATB[_0x310c00(0x1e2)][_0x310c00(0x238)]=function(){const _0x352e7e=_0x310c00;this['visible']=$gameSystem[_0x352e7e(0x33d)]();};function Sprite_FieldMarkerATB(){const _0x38ed5f=_0x310c00;this[_0x38ed5f(0x304)](...arguments);}Sprite_FieldMarkerATB[_0x310c00(0x1e2)]=Object['create'](Sprite_Clickable[_0x310c00(0x1e2)]),Sprite_FieldMarkerATB[_0x310c00(0x1e2)][_0x310c00(0x29b)]=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB[_0x310c00(0x1e2)]['initialize']=function(_0x44a5df,_0x2cecb7,_0x50dd6b){const _0x2aa38b=_0x310c00;this['_index']=_0x44a5df,this['_unit']=_0x2cecb7,this[_0x2aa38b(0x1d0)]=_0x50dd6b,Sprite_Clickable[_0x2aa38b(0x1e2)][_0x2aa38b(0x304)][_0x2aa38b(0x1ef)](this),this['initMembers'](),this['createChildren'](),this[_0x2aa38b(0x2e1)]=this[_0x2aa38b(0x2a1)]();},Sprite_FieldMarkerATB[_0x310c00(0x1e2)][_0x310c00(0x371)]=function(){const _0x3e28e8=_0x310c00;this[_0x3e28e8(0x2f5)]['x']=0.5,this[_0x3e28e8(0x2f5)]['y']=0.5;},Sprite_FieldMarkerATB[_0x310c00(0x1e2)]['createChildren']=function(){const _0x53e8f9=_0x310c00;this[_0x53e8f9(0x1de)](),this[_0x53e8f9(0x23b)](),this[_0x53e8f9(0x1bf)](),this['createLetterSprite'](),this['createArrowSprite'](),this['updatePositionOnGauge'](!![]);},Sprite_FieldMarkerATB[_0x310c00(0x1e2)][_0x310c00(0x1de)]=function(){const _0x716894=_0x310c00;if(!Sprite_FieldGaugeATB[_0x716894(0x200)][_0x716894(0x1c5)])return;const _0x1532e8=Sprite_FieldGaugeATB[_0x716894(0x200)],_0x30c172=this['_unit']===$gameParty?_0x716894(0x18f):_0x716894(0x191),_0x39e3bd=_0x716894(0x2c2)[_0x716894(0x214)](_0x30c172),_0x50b70d=new Sprite();_0x50b70d['anchor']['x']=this[_0x716894(0x2f5)]['x'],_0x50b70d[_0x716894(0x2f5)]['y']=this[_0x716894(0x2f5)]['y'];if(_0x1532e8[_0x39e3bd])_0x716894(0x1a9)==='gVdtW'?this['applyATBPenalty']():_0x50b70d['bitmap']=ImageManager[_0x716894(0x349)](_0x1532e8[_0x39e3bd]);else{if(_0x716894(0x35f)===_0x716894(0x35f)){const _0x3330ac=_0x1532e8[_0x716894(0x220)];_0x50b70d['bitmap']=new Bitmap(_0x3330ac,_0x3330ac);const _0x48639e=ColorManager['getColor'](_0x1532e8[_0x716894(0x2fb)[_0x716894(0x214)](_0x30c172)]),_0x2a4472=ColorManager[_0x716894(0x2dd)](_0x1532e8[_0x716894(0x2de)[_0x716894(0x214)](_0x30c172)]);_0x50b70d[_0x716894(0x33c)][_0x716894(0x2ea)](0x0,0x0,_0x3330ac,_0x3330ac,_0x48639e,_0x2a4472,!![]);}else this['createBattlerSprite'](_0x33d6ca,_0x3a7b7b);}this[_0x716894(0x19f)]=_0x50b70d,this[_0x716894(0x2d0)](this['_backgroundSprite']),this[_0x716894(0x210)]=this['_backgroundSprite'][_0x716894(0x210)],this[_0x716894(0x1c0)]=this[_0x716894(0x19f)]['height'];},Sprite_FieldMarkerATB['prototype'][_0x310c00(0x23b)]=function(){const _0x2b97ec=_0x310c00,_0x497d68=new Sprite();_0x497d68[_0x2b97ec(0x2f5)]['x']=this['anchor']['x'],_0x497d68[_0x2b97ec(0x2f5)]['y']=this[_0x2b97ec(0x2f5)]['y'],this[_0x2b97ec(0x289)]=_0x497d68,this[_0x2b97ec(0x2d0)](this[_0x2b97ec(0x289)]),this[_0x2b97ec(0x31d)]();},Sprite_FieldMarkerATB[_0x310c00(0x1e2)][_0x310c00(0x1bf)]=function(){const _0x2644c8=_0x310c00;if(!Sprite_FieldGaugeATB[_0x2644c8(0x200)][_0x2644c8(0x22a)])return;const _0xb33c78=Sprite_FieldGaugeATB[_0x2644c8(0x200)],_0x45bdd6=this[_0x2644c8(0x24d)]===$gameParty?_0x2644c8(0x18f):_0x2644c8(0x191),_0xbe3c='%1SystemBorder'[_0x2644c8(0x214)](_0x45bdd6),_0x4f1d0c=new Sprite();_0x4f1d0c[_0x2644c8(0x2f5)]['x']=this[_0x2644c8(0x2f5)]['x'],_0x4f1d0c[_0x2644c8(0x2f5)]['y']=this['anchor']['y'];if(_0xb33c78[_0xbe3c])_0x4f1d0c[_0x2644c8(0x33c)]=ImageManager[_0x2644c8(0x349)](_0xb33c78[_0xbe3c]);else{let _0x37c17d=_0xb33c78[_0x2644c8(0x220)],_0x2f3d09=_0xb33c78[_0x2644c8(0x293)];_0x4f1d0c['bitmap']=new Bitmap(_0x37c17d,_0x37c17d);const _0xd882bf=_0x2644c8(0x296),_0x5708e8=ColorManager[_0x2644c8(0x2dd)](_0xb33c78['%1BorderColor'[_0x2644c8(0x214)](_0x45bdd6)]);_0x4f1d0c[_0x2644c8(0x33c)][_0x2644c8(0x25b)](0x0,0x0,_0x37c17d,_0x37c17d,_0xd882bf),_0x37c17d-=0x2,_0x4f1d0c['bitmap'][_0x2644c8(0x25b)](0x1,0x1,_0x37c17d,_0x37c17d,_0x5708e8),_0x37c17d-=_0x2f3d09*0x2,_0x4f1d0c[_0x2644c8(0x33c)]['fillRect'](0x1+_0x2f3d09,0x1+_0x2f3d09,_0x37c17d,_0x37c17d,_0xd882bf),_0x37c17d-=0x2,_0x2f3d09+=0x1,_0x4f1d0c[_0x2644c8(0x33c)]['clearRect'](0x1+_0x2f3d09,0x1+_0x2f3d09,_0x37c17d,_0x37c17d);}this[_0x2644c8(0x19f)]=_0x4f1d0c,this[_0x2644c8(0x2d0)](this[_0x2644c8(0x19f)]);},Sprite_FieldMarkerATB[_0x310c00(0x1e2)][_0x310c00(0x184)]=function(){const _0x226d09=_0x310c00,_0x4e4373=Sprite_FieldGaugeATB[_0x226d09(0x200)];if(!_0x4e4373[_0x226d09(0x328)])return;if(this['_unit']===$gameParty)return;const _0x1ab7fd=_0x4e4373[_0x226d09(0x220)],_0x4aa42d=new Sprite();_0x4aa42d[_0x226d09(0x2f5)]['x']=this[_0x226d09(0x2f5)]['x'],_0x4aa42d[_0x226d09(0x2f5)]['y']=this['anchor']['y'],_0x4aa42d[_0x226d09(0x33c)]=new Bitmap(_0x1ab7fd,_0x1ab7fd),this[_0x226d09(0x22c)]=_0x4aa42d,this[_0x226d09(0x2d0)](this[_0x226d09(0x22c)]);},Sprite_FieldMarkerATB[_0x310c00(0x1e2)][_0x310c00(0x38f)]=function(){const _0x4c2207=_0x310c00,_0x10aab2=Sprite_FieldGaugeATB[_0x4c2207(0x200)];if(!_0x10aab2[_0x4c2207(0x1c2)])return;const _0x440cad=new Sprite();_0x440cad[_0x4c2207(0x2f5)]['x']=this[_0x4c2207(0x2f5)]['x'],_0x440cad[_0x4c2207(0x2f5)]['y']=this[_0x4c2207(0x2f5)]['y'],this[_0x4c2207(0x172)](_0x440cad),this[_0x4c2207(0x323)]=_0x440cad,this[_0x4c2207(0x2d0)](this['_arrowSprite']);},Sprite_FieldMarkerATB[_0x310c00(0x1e2)][_0x310c00(0x172)]=function(_0x44cedf){const _0xf891f9=_0x310c00,_0x36d54d=Sprite_FieldGaugeATB[_0xf891f9(0x200)],_0x18b250=_0x36d54d[_0xf891f9(0x220)],_0x31d531=Math[_0xf891f9(0x306)](_0x18b250/0x2),_0x465967=this['isGaugeHorizontal'](),_0x30a1a2=this[_0xf891f9(0x24d)]===$gameParty?_0xf891f9(0x18f):'Enemy',_0x5bf882=_0x36d54d['%1Side'[_0xf891f9(0x214)](_0x30a1a2)];_0x44cedf[_0xf891f9(0x33c)]=ImageManager[_0xf891f9(0x349)](_0x36d54d['MarkerArrowWindowSkin']);const _0x10bb08=0x18,_0x53624e=_0x10bb08/0x2,_0x31e750=0x60+_0x10bb08,_0x51733b=0x0+_0x10bb08;if(_0x465967&&_0x5bf882)_0x44cedf[_0xf891f9(0x2ac)](_0x31e750+_0x53624e,_0x51733b+_0x53624e+_0x10bb08,_0x10bb08,_0x53624e),_0x44cedf['y']+=_0x31d531,_0x44cedf[_0xf891f9(0x2f5)]['y']=0x0;else{if(_0x465967&&!_0x5bf882){if('KmGlA'!==_0xf891f9(0x1be))return _0x507015[_0xf891f9(0x18e)][_0xf891f9(0x200)]['Mechanics'][_0xf891f9(0x26c)][_0xf891f9(0x1ef)](this,this);else _0x44cedf[_0xf891f9(0x2ac)](_0x31e750+_0x53624e,_0x51733b,_0x10bb08,_0x53624e),_0x44cedf['y']-=_0x31d531,_0x44cedf['anchor']['y']=0x1;}else{if(!_0x465967&&_0x5bf882)_0xf891f9(0x32c)==='MRCwO'?(_0x44cedf['setFrame'](_0x31e750,_0x51733b+_0x53624e,_0x53624e,_0x10bb08),_0x44cedf['x']-=Math[_0xf891f9(0x358)](_0x31d531*1.75),_0x44cedf[_0xf891f9(0x2f5)]['x']=0x0):_0x21c985['visible']=![];else!_0x465967&&!_0x5bf882&&(_0x44cedf[_0xf891f9(0x2ac)](_0x31e750+_0x10bb08+_0x53624e,_0x51733b+_0x53624e,_0x53624e,_0x10bb08),_0x44cedf['x']+=Math['ceil'](_0x31d531*1.75),_0x44cedf[_0xf891f9(0x2f5)]['x']=0x1);}}},Sprite_FieldMarkerATB[_0x310c00(0x1e2)][_0x310c00(0x300)]=function(){const _0x2d4954=_0x310c00;if(this[_0x2d4954(0x24d)]===$gameParty){if(_0x2d4954(0x1f2)!=='eJxUA')return $gameParty['battleMembers']()[this['_index']];else this[_0x2d4954(0x356)]=_0x3c5a43;}else return $gameTroop[_0x2d4954(0x263)]()[this[_0x2d4954(0x347)]];},Sprite_FieldMarkerATB[_0x310c00(0x1e2)]['update']=function(){const _0x341891=_0x310c00;Sprite_Clickable[_0x341891(0x1e2)][_0x341891(0x1da)][_0x341891(0x1ef)](this),this[_0x341891(0x1ec)](),this[_0x341891(0x1fc)](),this[_0x341891(0x1df)](),this[_0x341891(0x199)](),this['updateGraphicHue'](),this[_0x341891(0x312)](),this[_0x341891(0x224)]();},Sprite_FieldMarkerATB['prototype']['updateOpacity']=function(){const _0x37eb31=_0x310c00,_0x378c7c=this[_0x37eb31(0x2a1)](),_0x1ddf6f=Sprite_FieldGaugeATB['Settings'][_0x37eb31(0x30f)];if(this[_0x37eb31(0x2e1)]>_0x378c7c){if(_0x37eb31(0x2a4)===_0x37eb31(0x2a4))this['opacity']=Math[_0x37eb31(0x392)](_0x378c7c,this[_0x37eb31(0x2e1)]-_0x1ddf6f);else return _0x156e5e[_0x37eb31(0x18e)][_0x37eb31(0x18b)][_0x37eb31(0x1ef)](this);}else this[_0x37eb31(0x2e1)]<_0x378c7c&&(this[_0x37eb31(0x2e1)]=Math[_0x37eb31(0x301)](_0x378c7c,this[_0x37eb31(0x2e1)]+_0x1ddf6f));},Sprite_FieldMarkerATB[_0x310c00(0x1e2)]['targetOpacity']=function(){const _0x802848=_0x310c00,_0x4dfe74=this['battler']();if(!_0x4dfe74)return 0x0;if(_0x4dfe74[_0x802848(0x215)]())return 0x0;if(_0x4dfe74['isDead']())return 0x0;return 0xff;},Sprite_FieldMarkerATB['prototype'][_0x310c00(0x32a)]=function(){const _0x55f574=_0x310c00;if(this[_0x55f574(0x1b5)]!==undefined)return this[_0x55f574(0x1b5)];const _0x34275a=Sprite_FieldGaugeATB['Settings'][_0x55f574(0x208)];return this[_0x55f574(0x1b5)]=[_0x55f574(0x182),_0x55f574(0x28f)][_0x55f574(0x232)](_0x34275a),this[_0x55f574(0x1b5)];},Sprite_FieldMarkerATB[_0x310c00(0x1e2)][_0x310c00(0x1fc)]=function(){const _0x34ee0e=_0x310c00,_0x31b51f=Sprite_FieldGaugeATB['Settings'],_0x21ea8e=this[_0x34ee0e(0x32a)](),_0x5b2368=this['_unit']===$gameParty?'Actor':_0x34ee0e(0x191),_0x302cc0=_0x31b51f[_0x34ee0e(0x340)],_0x576d0c=_0x31b51f[_0x34ee0e(0x27d)['format'](_0x5b2368)];_0x21ea8e?(this['y']=_0x31b51f['GaugeThick']/0x2,this['y']+=_0x576d0c?-_0x302cc0:_0x302cc0):(this['x']=_0x31b51f[_0x34ee0e(0x372)]/0x2,this['x']+=_0x576d0c?_0x302cc0:-_0x302cc0);},Sprite_FieldMarkerATB[_0x310c00(0x1e2)][_0x310c00(0x1df)]=function(_0x1e4bb3){const _0x2e2f33=_0x310c00,_0x3acf51=this[_0x2e2f33(0x300)]();if(!_0x3acf51)return;const _0x1c5690=Sprite_FieldGaugeATB['Settings'],_0x57c991=this[_0x2e2f33(0x32a)](),_0x1b516b=this[_0x2e2f33(0x317)](),_0x45ab8b=_0x1e4bb3?Infinity:_0x1c5690['MarkerSpeed'];if(_0x57c991&&this['x']!==_0x1b516b){if(this['x']>_0x1b516b)this['x']=Math[_0x2e2f33(0x392)](_0x1b516b,this['x']-_0x45ab8b);if(this['x']<_0x1b516b)this['x']=Math[_0x2e2f33(0x301)](_0x1b516b,this['x']+_0x45ab8b);}else{if(!_0x57c991&&this['x']!==_0x1b516b){if('AkaBi'===_0x2e2f33(0x28d))return![];else{if(this['y']>_0x1b516b)this['y']=Math[_0x2e2f33(0x392)](_0x1b516b,this['y']-_0x45ab8b);if(this['y']<_0x1b516b)this['y']=Math[_0x2e2f33(0x301)](_0x1b516b,this['y']+_0x45ab8b);}}}},Sprite_FieldMarkerATB['prototype'][_0x310c00(0x317)]=function(){const _0x4881b8=_0x310c00,_0x5c6306=Sprite_FieldGaugeATB[_0x4881b8(0x200)],_0xc174d2=this['battler'](),_0x261455=this['isGaugeHorizontal'](),_0x113f77=this[_0x4881b8(0x1d0)][_0x4881b8(0x33c)][_0x4881b8(0x210)],_0x1d2825=this[_0x4881b8(0x1d0)]['bitmap']['height'],_0x53100e=_0x5c6306[_0x4881b8(0x2d5)]['clamp'](0x0,0x1),_0x4f1524=_0x5c6306[_0x4881b8(0x1fd)];let _0x26d29a=_0xc174d2['tpbChargeTime']()*_0x53100e;_0x26d29a+=(0x1-_0x53100e)*_0xc174d2[_0x4881b8(0x193)]();if(_0xc174d2===BattleManager[_0x4881b8(0x1d4)])_0x26d29a=0x1;if(!_0x4f1524)_0x26d29a=0x1-_0x26d29a;let _0x30dbe5=0x0;if(_0x261455)_0x4881b8(0x352)===_0x4881b8(0x352)?_0x30dbe5=_0x26d29a*_0x113f77:this[_0x4881b8(0x309)](_0x23afda,_0x394ce6);else!_0x261455&&(_0x30dbe5=_0x26d29a*_0x1d2825);return Math[_0x4881b8(0x306)](_0x30dbe5);},Sprite_FieldMarkerATB[_0x310c00(0x1e2)][_0x310c00(0x199)]=function(){const _0x1b954b=_0x310c00,_0x3a8b91=this['battler']();if(!_0x3a8b91)return;const _0x1954e3=Sprite_FieldGaugeATB['Settings'],_0x3b08ad=this[_0x1b954b(0x24d)]===$gameParty?'Actor':_0x1b954b(0x191);let _0x14dc70=_0x3a8b91[_0x1b954b(0x2bd)]();if(_0x3a8b91[_0x1b954b(0x303)]()&&_0x14dc70==='enemy'){if(_0x1b954b(0x1f9)===_0x1b954b(0x1f9))_0x14dc70='face';else return this[_0x1b954b(0x219)]&&this['_scene'][_0x1b954b(0x29b)]===_0x4b59cc;}else _0x3a8b91[_0x1b954b(0x299)]()&&_0x14dc70==='svactor'&&(_0x14dc70='enemy');if(this[_0x1b954b(0x1c6)]!==_0x14dc70){if('pJQLt'===_0x1b954b(0x266))this[_0x1b954b(0x190)]();else return this['processUpdateGraphic']();}switch(this[_0x1b954b(0x1c6)]){case'face':if(this['_graphicFaceName']!==_0x3a8b91[_0x1b954b(0x270)]()){if(_0x1b954b(0x368)!==_0x1b954b(0x34b))return this[_0x1b954b(0x31d)]();else this[_0x1b954b(0x300)]()['_fnord']=!![],this[_0x1b954b(0x300)]()[_0x1b954b(0x1e1)]();}if(this[_0x1b954b(0x252)]!==_0x3a8b91[_0x1b954b(0x192)]()){if(_0x1b954b(0x249)!==_0x1b954b(0x249))_0xfea7b8+=this[_0x1b954b(0x281)]['battleUIOffsetX']();else return this[_0x1b954b(0x31d)]();}break;case _0x1b954b(0x171):if(this[_0x1b954b(0x2e4)]!==_0x3a8b91['fieldAtbGraphicIconIndex']())return this[_0x1b954b(0x31d)]();break;case _0x1b954b(0x2e5):if(_0x3a8b91[_0x1b954b(0x24c)]()){if(_0x1b954b(0x286)===_0x1b954b(0x286)){if(this[_0x1b954b(0x2bb)]!==_0x3a8b91[_0x1b954b(0x27b)]())return this[_0x1b954b(0x31d)]();}else _0x4da92d[_0x1b954b(0x2ac)](_0x50b7bc+_0x10e655,_0x193d66+_0x1ffd82+_0x3a9420,_0x2312c7,_0x2458e6),_0xb39be3['y']+=_0x3b1b34,_0x2fac28[_0x1b954b(0x2f5)]['y']=0x0;}else{if(this[_0x1b954b(0x251)]!==_0x3a8b91[_0x1b954b(0x260)]())return this[_0x1b954b(0x31d)]();}break;case'svactor':if(_0x3a8b91[_0x1b954b(0x303)]()){if(_0x1b954b(0x23c)!==_0x1b954b(0x23c))return _0x223915[_0x1b954b(0x213)];else{if(this[_0x1b954b(0x2bb)]!==_0x3a8b91[_0x1b954b(0x260)]())return this['processUpdateGraphic']();}}else{if(this[_0x1b954b(0x251)]!==_0x3a8b91['battlerName']())return this[_0x1b954b(0x31d)]();}break;}},Sprite_FieldMarkerATB[_0x310c00(0x1e2)]['processUpdateGraphic']=function(){const _0xf41f16=_0x310c00,_0x226866=this[_0xf41f16(0x300)]();if(!_0x226866)return;this[_0xf41f16(0x1c6)]=_0x226866[_0xf41f16(0x2bd)]();if(_0x226866[_0xf41f16(0x303)]()&&this[_0xf41f16(0x1c6)]==='enemy')_0xf41f16(0x1fe)==='egGWp'?_0x28200a=this[_0xf41f16(0x20c)]()[_0xf41f16(0x234)]:this[_0xf41f16(0x1c6)]='face';else{if(_0x226866['isEnemy']()&&this['_graphicType']===_0xf41f16(0x278)){if(_0xf41f16(0x345)===_0xf41f16(0x345))this['_graphicType']=_0xf41f16(0x2e5);else{if(_0x3afff1['createKeyJS'])return _0x586ce7[_0xf41f16(0x1dd)](_0x5683ae,_0xd22a58);let _0x7d098='';if(_0xbd87a3[_0xf41f16(0x232)](_0x3bbea3))_0x7d098='Actor-%1-%2'[_0xf41f16(0x214)](_0xc13cb2['id'],_0xff51fc);if(_0x138f35[_0xf41f16(0x232)](_0x1fc433))_0x7d098=_0xf41f16(0x24a)[_0xf41f16(0x214)](_0x5652ab['id'],_0x5cfe40);if(_0x58c629[_0xf41f16(0x232)](_0xb7a2f5))_0x7d098=_0xf41f16(0x336)[_0xf41f16(0x214)](_0x6a40dc['id'],_0x68fd4e);if(_0x58e9a7[_0xf41f16(0x232)](_0x2e440f))_0x7d098=_0xf41f16(0x343)[_0xf41f16(0x214)](_0x10c607['id'],_0x3f1762);if(_0x441be0[_0xf41f16(0x232)](_0x2688ad))_0x7d098=_0xf41f16(0x1a6)[_0xf41f16(0x214)](_0x446964['id'],_0x561589);if(_0x57470d[_0xf41f16(0x232)](_0x2aee24))_0x7d098=_0xf41f16(0x332)[_0xf41f16(0x214)](_0x2c61d2['id'],_0x1cc432);if(_0x527184[_0xf41f16(0x232)](_0x488325))_0x7d098=_0xf41f16(0x2c9)[_0xf41f16(0x214)](_0x441d12['id'],_0x517efb);if(_0x5b336e[_0xf41f16(0x232)](_0x3b1f03))_0x7d098=_0xf41f16(0x1ea)[_0xf41f16(0x214)](_0x582a71['id'],_0x7e5acf);return _0x7d098;}}}let _0xe8b32c;switch(this['_graphicType']){case _0xf41f16(0x355):this[_0xf41f16(0x1a5)]=_0x226866['fieldAtbGraphicFaceName'](),this[_0xf41f16(0x252)]=_0x226866[_0xf41f16(0x192)](),_0xe8b32c=ImageManager[_0xf41f16(0x2e6)](this['_graphicFaceName']),_0xe8b32c[_0xf41f16(0x201)](this[_0xf41f16(0x32e)][_0xf41f16(0x381)](this,_0xe8b32c));break;case _0xf41f16(0x171):this[_0xf41f16(0x2e4)]=_0x226866['fieldAtbGraphicIconIndex'](),_0xe8b32c=ImageManager[_0xf41f16(0x349)]('IconSet'),_0xe8b32c[_0xf41f16(0x201)](this[_0xf41f16(0x33e)]['bind'](this,_0xe8b32c));break;case _0xf41f16(0x2e5):if(_0x226866[_0xf41f16(0x24c)]())_0xf41f16(0x2bc)!==_0xf41f16(0x17c)?(this['_graphicSv']=_0x226866[_0xf41f16(0x27b)](),_0xe8b32c=ImageManager[_0xf41f16(0x244)](this[_0xf41f16(0x2bb)]),_0xe8b32c[_0xf41f16(0x201)](this[_0xf41f16(0x2c3)][_0xf41f16(0x381)](this,_0xe8b32c))):(_0x214a10[_0xf41f16(0x18e)]['ParseItemNotetags'][_0xf41f16(0x1ef)](this,_0x422db6),_0x5e7110[_0xf41f16(0x18e)][_0xf41f16(0x2b4)](_0x294f5b));else{if($gameSystem[_0xf41f16(0x308)]())this[_0xf41f16(0x251)]=_0x226866['battlerName'](),_0xe8b32c=ImageManager['loadSvEnemy'](this[_0xf41f16(0x251)]),_0xe8b32c[_0xf41f16(0x201)](this[_0xf41f16(0x259)]['bind'](this,_0xe8b32c));else{if(_0xf41f16(0x2c4)===_0xf41f16(0x2c4))this[_0xf41f16(0x251)]=_0x226866[_0xf41f16(0x260)](),_0xe8b32c=ImageManager[_0xf41f16(0x216)](this[_0xf41f16(0x251)]),_0xe8b32c[_0xf41f16(0x201)](this['changeEnemyGraphicBitmap'][_0xf41f16(0x381)](this,_0xe8b32c));else return _0x6f6a0a['y']-_0x534832['y'];}}break;case _0xf41f16(0x278):this[_0xf41f16(0x2bb)]=_0x226866[_0xf41f16(0x260)](),_0xe8b32c=ImageManager[_0xf41f16(0x244)](this['_graphicSv']),_0xe8b32c[_0xf41f16(0x201)](this[_0xf41f16(0x2c3)][_0xf41f16(0x381)](this,_0xe8b32c));break;}},Sprite_FieldMarkerATB[_0x310c00(0x1e2)][_0x310c00(0x32e)]=function(_0x374cf7){const _0x1afe56=_0x310c00,_0x388feb=Sprite_FieldGaugeATB[_0x1afe56(0x200)],_0x584b23=_0x388feb[_0x1afe56(0x220)],_0x43a989=this[_0x1afe56(0x252)];this[_0x1afe56(0x289)][_0x1afe56(0x33c)]=new Bitmap(_0x584b23,_0x584b23);const _0xc55068=this[_0x1afe56(0x289)][_0x1afe56(0x33c)],_0x16ac0e=ImageManager[_0x1afe56(0x19b)],_0x3bc87e=ImageManager[_0x1afe56(0x333)],_0xb2d924=ImageManager[_0x1afe56(0x19b)],_0x59fe67=ImageManager[_0x1afe56(0x333)],_0x5ea529=_0x43a989%0x4*_0x16ac0e+(_0x16ac0e-_0xb2d924)/0x2,_0x443ee4=Math[_0x1afe56(0x25d)](_0x43a989/0x4)*_0x3bc87e+(_0x3bc87e-_0x59fe67)/0x2;_0xc55068['blt'](_0x374cf7,_0x5ea529,_0x443ee4,_0xb2d924,_0x59fe67,0x0,0x0,_0x584b23,_0x584b23);},Sprite_FieldMarkerATB['prototype'][_0x310c00(0x33e)]=function(_0xef5c2){const _0xe15d82=_0x310c00,_0x4a409c=Sprite_FieldGaugeATB['Settings'],_0x40eaba=_0x4a409c[_0xe15d82(0x220)],_0x48df8b=this['_graphicIconIndex'];this['_graphicSprite']['bitmap']=new Bitmap(_0x40eaba,_0x40eaba);const _0x392e51=this[_0xe15d82(0x289)][_0xe15d82(0x33c)],_0x240fd4=ImageManager[_0xe15d82(0x273)],_0x395153=ImageManager[_0xe15d82(0x1d6)],_0x903414=_0x48df8b%0x10*_0x240fd4,_0x1d0e62=Math[_0xe15d82(0x25d)](_0x48df8b/0x10)*_0x395153;_0x392e51[_0xe15d82(0x287)](_0xef5c2,_0x903414,_0x1d0e62,_0x240fd4,_0x395153,0x0,0x0,_0x40eaba,_0x40eaba);},Sprite_FieldMarkerATB[_0x310c00(0x1e2)][_0x310c00(0x2c3)]=function(_0x17f0e3){const _0x43e611=_0x310c00,_0x27dce4=Sprite_FieldGaugeATB[_0x43e611(0x200)],_0x470021=_0x27dce4[_0x43e611(0x220)];this[_0x43e611(0x289)][_0x43e611(0x33c)]=new Bitmap(_0x470021,_0x470021);const _0x2d6e0e=this[_0x43e611(0x289)][_0x43e611(0x33c)],_0x2ef668=this[_0x43e611(0x2bb)][_0x43e611(0x19d)](/\$/i),_0x521e88=_0x2ef668?0x1:ImageManager['svActorHorzCells'],_0x5c424c=_0x2ef668?0x1:ImageManager[_0x43e611(0x366)],_0x2d54f3=_0x17f0e3['width']/_0x521e88,_0x1f9431=_0x17f0e3['height']/_0x5c424c,_0x3766ec=Math[_0x43e611(0x301)](0x1,_0x470021/_0x2d54f3,_0x470021/_0x1f9431),_0x26e619=_0x2d54f3*_0x3766ec,_0x18f275=_0x1f9431*_0x3766ec,_0x1a35ed=Math[_0x43e611(0x306)]((_0x470021-_0x26e619)/0x2),_0x438496=Math['round']((_0x470021-_0x18f275)/0x2);_0x2d6e0e[_0x43e611(0x287)](_0x17f0e3,0x0,0x0,_0x2d54f3,_0x1f9431,_0x1a35ed,_0x438496,_0x26e619,_0x18f275);},Sprite_FieldMarkerATB[_0x310c00(0x1e2)]['changeEnemyGraphicBitmap']=function(_0x5ee508){const _0x569d6d=_0x310c00,_0x5acfa1=Sprite_FieldGaugeATB['Settings'],_0x2cf53c=_0x5acfa1[_0x569d6d(0x220)];this[_0x569d6d(0x289)]['bitmap']=new Bitmap(_0x2cf53c,_0x2cf53c);const _0x550a49=this[_0x569d6d(0x289)][_0x569d6d(0x33c)],_0x25bffc=Math[_0x569d6d(0x301)](0x1,_0x2cf53c/_0x5ee508[_0x569d6d(0x210)],_0x2cf53c/_0x5ee508[_0x569d6d(0x1c0)]),_0xba0001=_0x5ee508[_0x569d6d(0x210)]*_0x25bffc,_0x1eaa14=_0x5ee508[_0x569d6d(0x1c0)]*_0x25bffc,_0x21e439=Math[_0x569d6d(0x306)]((_0x2cf53c-_0xba0001)/0x2),_0x52d21a=Math[_0x569d6d(0x306)]((_0x2cf53c-_0x1eaa14)/0x2);_0x550a49['blt'](_0x5ee508,0x0,0x0,_0x5ee508[_0x569d6d(0x210)],_0x5ee508['height'],_0x21e439,_0x52d21a,_0xba0001,_0x1eaa14);},Sprite_FieldMarkerATB['prototype']['updateGraphicHue']=function(){const _0x5df6fa=_0x310c00,_0x2aa8d8=this[_0x5df6fa(0x300)]();if(!_0x2aa8d8)return;if(!_0x2aa8d8[_0x5df6fa(0x299)]())return;if(this['_graphicHue']===_0x2aa8d8[_0x5df6fa(0x2d8)]())return;this['_graphicHue']=_0x2aa8d8[_0x5df6fa(0x2d8)]();if(_0x2aa8d8['hasSvBattler']())this[_0x5df6fa(0x21f)]=0x0;this[_0x5df6fa(0x289)][_0x5df6fa(0x1e7)](this[_0x5df6fa(0x21f)]);},Sprite_FieldMarkerATB[_0x310c00(0x1e2)]['updateLetter']=function(){const _0x290075=_0x310c00;if(!this['_letterSprite'])return;const _0x2658bf=this[_0x290075(0x300)]();if(!_0x2658bf)return;if(this[_0x290075(0x2b5)]===_0x2658bf['_letter']&&this[_0x290075(0x1f3)]===_0x2658bf[_0x290075(0x1f3)])return;this[_0x290075(0x2b5)]=_0x2658bf['_letter'],this['_plural']=_0x2658bf[_0x290075(0x1f3)];const _0x4aa0b0=Sprite_FieldGaugeATB[_0x290075(0x200)],_0x4205c2=_0x4aa0b0[_0x290075(0x220)],_0x4949cd=Math[_0x290075(0x25d)](_0x4205c2/0x2),_0x2e49f5=this[_0x290075(0x22c)][_0x290075(0x33c)];_0x2e49f5[_0x290075(0x245)]();if(!this[_0x290075(0x1f3)])return;_0x2e49f5[_0x290075(0x2e2)]=_0x4aa0b0[_0x290075(0x21d)]||$gameSystem[_0x290075(0x367)](),_0x2e49f5[_0x290075(0x1b3)]=_0x4aa0b0[_0x290075(0x339)]||0x10,_0x2e49f5[_0x290075(0x20f)](this[_0x290075(0x2b5)],0x2,_0x4949cd,_0x4205c2-0x4,_0x4949cd-0x2,'right');},Sprite_FieldMarkerATB[_0x310c00(0x1e2)][_0x310c00(0x224)]=function(){const _0x8e9906=_0x310c00,_0x4da4f1=this[_0x8e9906(0x300)]();if(!_0x4da4f1)return;const _0x451349=_0x4da4f1[_0x8e9906(0x300)]();if(!_0x451349)return;const _0x559fe3=_0x451349[_0x8e9906(0x181)]();if(!_0x559fe3)return;this['setBlendColor'](_0x559fe3[_0x8e9906(0x1ad)]);},Sprite_FieldMarkerATB[_0x310c00(0x1e2)][_0x310c00(0x2b1)]=function(){const _0x56b86f=_0x310c00;return this[_0x56b86f(0x300)]();};