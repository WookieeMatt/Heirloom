//=============================================================================
// VisuStella MZ - Battle System ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.21;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.21] [BattleSystemATB]
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

function _0x5b11(_0x223ee1,_0x350c31){const _0x5ced9a=_0x5ced();return _0x5b11=function(_0x5b113c,_0x34a948){_0x5b113c=_0x5b113c-0x114;let _0x10e2c9=_0x5ced9a[_0x5b113c];return _0x10e2c9;},_0x5b11(_0x223ee1,_0x350c31);}const _0x23dad6=_0x5b11;function _0x5ced(){const _0x4c31b9=['applyTpbPenalty','createArrowSprite','FaceName','_fieldAtbGaugeFaceName','iAejE','fieldAtbGraphicIconIndex','updateVisibility','_atbFieldGaugeVisible','isSceneBattle','EMizZ','createEnemySprites','width','face','Enemy','createFieldAtbGraphicIconIndex','Game_BattlerBase_revive','_horz','STR','isEnemy','#%1','pbqIH','RQfFh','min','setupTextPopup','atbActive','requestFauxAnimation','_atbGaugeSprite','isDead','fZUxu','Actor-%1-%2','Game_Battler_tpbRelativeSpeed','clamp','_graphicSprite','applyGlobalBattleSystemATBEffects','svActorVertCells','setupAtbGaugeSprite','createGaugeSprite','_graphicEnemy','updateGraphic','lFlcP','initialize','textColor','TpbAccelerationJS','onRestrict','currentMaxValue','enemy','_tpbCastTime','battlerHue','isATB','setupBattleSystemATBColors','round','floor','startTpbCasting','EnemyBattlerFaceName','mfZga','svActorHorzCells','Game_Battler_startTpbCasting','registerCommand','ARRAYJSON','kmiEX','right','Sprite_Gauge_gaugeColor2','StunsResetGauge','%1SystemBg','wHasP','time','FieldGaugeActorFace','FieldGaugeActorIcon','createFieldAtbGraphicFaceIndex','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','loadSvActor','isActiveTpb','status','%1BorderColor','loadSystem','Game_Battler_clearTpbChargeTime','updateTpb','addGeneralOptions','BorderThickness','Sprite_Gauge_currentValue','createGraphicSprite','ypont','pJchg','setBattler','addBattleSystemATBShowGaugeCommand','IconIndex','isGaugeHorizontal','qKPoF','RegExp','WjECs','loadFace','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','battleUIOffsetX','_fieldAtbGaugeGraphicType','allBattleMembers','_unit','createKeyJS','Game_Battler_applyTpbPenalty','trim','mJKAz','ShowMarkerBorder','match','OaLgc','battlerName','lineHeight','AddOption','ZrWYn','ARRAYEVAL','Window_Help_setItem','updateAtbGaugeSpriteVisibility','Game_Battler_onRestrict','EQzsM','default','bind','faceIndex','_fnord','boxWidth','battler','FieldGaugeEnemyFace','Options','faceHeight','constructor','State-%1-%2','note','clearFieldAtbGraphics','Game_Action_applyGlobal','updatePositionOnGauge','PdQUx','addBattleSystemATBCommands','max','charging','updateSelectionEffect','currentAction','_tpbState','Name','6607736qvtPHN','MarkerOffset','VisuMZ_0_CoreEngine','hasSvBattler','FaceIndex','setAtbGraphicIconIndex','applyATBPenalty','388jmxPMY','DisplayPosition','Game_Battler_tpbBaseSpeed','Item-%1-%2','gaugeColor2','%1BgColor2','InterruptText','zWdgq','actor','VisuMZ_2_AggroControlSystem','gHKTb','attackSpeed','Settings','Sprite_Battler_updateMain','stop%1','children','setAtbAfterSpeed','Mechanics','isActor','Cast','yzCKF','Scene_Battle_createAllWindows','DrawGauge','atbStopped','version','RepositionTopHelpY','icon','xUyMR','visible','_letter','_fieldGaugeATB_Container','FUNC','Game_System_initialize','paramBuffRate','createStateIconSprite','removeChild','applyGlobal','ARRAYNUM','ifevq','item','_fieldGaugeATB','bitmap','Interrupt','gradientFillRect','BattlerRelativeSpeedJS','_graphicIconIndex','slow%1','_fieldAtbGaugeIconIndex','skills','return\x200','_index','ConvertParams','bnqvX','_subject','Class-%1-%2','changeAtbCastTime','(?:ATB|TPB)','440QKlBar','AdjustRect','changeAtbChargeTime','_letterSprite','getChildIndex','CilAY','AggroControlSystem','ParseSkillNotetags','MarkerSize','compareBattlerSprites','mRdcT','setHomeLocation','canMove','igcUw','setAtbChargeTime','xYtBf','maxBattleMembers','KyMgN','EnemyBattlerFaceIndex','roqYv','EnemyBattlerType','QdDSS','createStateSprite','iconWidth','targetPositionOnGauge','Game_BattlerBase_appear','updateOpacity','BattleManager_isActiveTpb','1869JDlxxs','TpbCastTimeJS','ceil','isAtbChargingState','applyItemUserEffect','155457lQcqbW','revive','HlbQp','TiXeW','hprMm','_atbAfterSpeed','tpbBaseSpeed','_arrowSprite','tpbSpeed','_scene','updateMain','createFieldGaugeContainerATB','quGZI','AnchorY','vbfDH','fieldAtbGraphicFaceName','appear','OcxZM','Sprite_Gauge_gaugeColor1','Visible','AnchorX','atbGaugeColor','parameters','InterruptMirror','Gauge','aRimr','currentValue','QzjHB','Scene_Boot_onDatabaseLoaded','makeActions','createAllWindows','lyzjZ','GaugeSplit','mainSprite','tpbAcceleration','376QwfSWs','bottom','setItem','slow','_homeY','removeState','clear','ODfjt','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_statusType','clearActions','_graphicHue','ARRAYSTRUCT','InterruptFlashDuration','faceName','_windowLayer','stop','_windowskin','die','tpbChargeTime','(?:GAUGE|TIME|SPEED)','process_VisuMZ_BattleSystemATB_CreateRegExp','cast','%1BgColor1','process_VisuMZ_BattleSystemATB_JS_Notetags','4798vmZdWy','Sprite_Enemy_startEffect','_skinSprite','BattleManager_endBattlerActions','createChildren','Parse_Notetags_CreateJS','FqqtB','_graphicFaceIndex','changeEnemyGraphicBitmap','full%1','description','FfnkU','ctGaugeColor2','Window_BattleStatus','filter','numActions','atbColor','ysyQP','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','FieldGaugeClearActorGraphic','GaugeSystemSkin','ShowEnemyGauge','createGaugeBitmap','getAtbCastTimeRate','createBattlerContainer','_graphicType','GaugeThick','onDatabaseLoaded','length','aZLFp','xERFp','setupArrowSprite','Window_Options_addGeneralOptions','createBorderSprite','Yauhj','setText','loadSvEnemy','changeFaceGraphicBitmap','createBattlerSprite','gaugeBackColor','targetOpacity','fontSize','createFieldGaugeSpriteATB','reduce','isCTB','Game_Battler_removeState','Sprite_Battler_update','ZaKtJ','FwuDQ','Game_BattlerBase_die','name','createLetterSprite','HXcoB','Actors','applyItemBattleSystemATBUserEffect','isTpb','%1Side','createActorSprites','Charge','EnemyBattlerIcon','fieldAtbGraphicType','After','ShowMarkerArrow','createFieldGaugeSkin','updateBattleContainerOrder','Game_Battler_tpbRequiredCastTime','maxCommands','cast2','TpbSpeedCalcJS','745920bZGTLp','OffsetY','tpbRelativeSpeed','blt','GaugeLengthVert','mainFontFace','setHue','endBattlerActions','drawText','isAtbCastingState','isAppeared','fast','svBattlerName','processUpdateGraphic','_backgroundSprite','SystemFieldGaugeVisibility','JSON','Window_StatusBase_placeGauge','GfqSX','battleUIOffsetY','applyBattleSystemATBUserEffect','createJS','ARRAYFUNC','ivBEA','createBackgroundSprite','Skill-%1-%2','Sprite_Battler_setBattler','vipcy','tpbRequiredCastTime','_tpbChargeTime','_graphicFaceName','atbSpeed','_forcing','Game_Battler_tpbSpeed','Game_Unit_updateTpb','Aggro','concat','checkAggroControlSystemOffsetYAdjustment','changeSvActorGraphicBitmap','VisuMZ_1_BattleCore','gRrcz','Game_Battler_tpbAcceleration','Enemies','Vprkk','InterruptMute','_battlerContainer','prototype','svactor','setAtbCastTime','faceWidth','Sprite_Gauge_currentMaxValue','addChild','ApxFo','VisuMZ_2_BattleSystemCTB','rWqmL','_atbColors','scale','VisibleGauge','call','4605342djbMIC','battleMembers','isSideView','visualAtbGauge','map','boxHeight','GaugeDirection','members','iconHeight','gaugeRate','QjIJO','yRvld','#000000','Game_Actor_clearActions','updateGraphicHue','top','ConfigManager_applyData','showVisualAtbGauge','createFieldAtbGraphicFaceName','fillRect','Game_Action_applyItemUserEffect','format','atbCurrentMaxValue','atbCurrentValue','changeIconGraphicBitmap','ParseItemNotetags','addLoadListener','OffsetX','subject','updateLetter','updatePositionOffset','full','atbAcceleration','clearRect','BinXb','RXBdE','Actor','fast%1','Scene_Options_maxCommands','sort','_homeX','getColor','CCzih','GaugeLengthHorz','onAtbInterrupt','ConfigManager_makeData','%1SystemBorder','anchor','bZTnb','EnemyBattlerFontSize','_gaugeSprite','MarkerArrowWindowSkin','updateAtbGaugeSpritePosition','applyData','loadEnemy','iqZLJ','isAlive','FieldGaugeEnemyIcon','_onRestrictBypassAtbReset','_blendColor','isBattleSystemATBFieldGaugeVisible','_statusWindow','height','BattleSystemATB','clearTpbChargeTime','FIDXU','ShowStatusGauge','initMembers','Window_SideviewUiBattleStatus','fieldAtbGraphicFaceIndex','STRUCT','_fieldAtbGaugeFaceIndex','DghhS','toUpperCase','gxeoa','default%1','Scale','createFieldAtbGraphicType','setFrame','loadWindowskin','aggroGauge','createAtbGaugeSprite','_battler','xkwcE','qzIee','FieldGaugeClearEnemyGraphic','gaugeColor1','UseFieldGauge','makeData','atbInterrupt','_plural','UKwbm','initBattleSystemATB','placeGauge','cast1','Sprite_Actor_createStateSprite','opacity','includes','ParseAllNotetags','EnemyBattlerFontFace','EscapeFailPenalty','parse','exit','OpacityRate','_svBattlerSprite','KXhsi','Sprite_Enemy_createStateIconSprite','fontFace','speed','ActorBattlerType','ready','HMBfm','update','addChildAt','setBattleSystemATBFieldGaugeVisible','4873410utlgnx','_graphicSv'];_0x5ced=function(){return _0x4c31b9;};return _0x5ced();}(function(_0x38c956,_0x317a9c){const _0x59da4c=_0x5b11,_0xa57cd5=_0x38c956();while(!![]){try{const _0x485010=-parseInt(_0x59da4c(0x31f))/0x1*(parseInt(_0x59da4c(0x306))/0x2)+parseInt(_0x59da4c(0x2de))/0x3*(parseInt(_0x59da4c(0x289))/0x4)+parseInt(_0x59da4c(0x1f9))/0x5+-parseInt(_0x59da4c(0x14b))/0x6+parseInt(_0x59da4c(0x186))/0x7+-parseInt(_0x59da4c(0x282))/0x8+parseInt(_0x59da4c(0x2e3))/0x9*(parseInt(_0x59da4c(0x2c2))/0xa);if(_0x485010===_0x317a9c)break;else _0xa57cd5['push'](_0xa57cd5['shift']());}catch(_0x1008e3){_0xa57cd5['push'](_0xa57cd5['shift']());}}}(_0x5ced,0x92a90));var label=_0x23dad6(0x1c5),tier=tier||0x0,dependencies=[_0x23dad6(0x172)],pluginData=$plugins[_0x23dad6(0x114)](function(_0x14ba1a){const _0xed1dc6=_0x23dad6;return _0x14ba1a[_0xed1dc6(0x243)]&&_0x14ba1a[_0xed1dc6(0x329)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x23dad6(0x295)]=VisuMZ[label][_0x23dad6(0x295)]||{},VisuMZ[_0x23dad6(0x2bc)]=function(_0x1e9074,_0x5bba10){const _0x2ad2d0=_0x23dad6;for(const _0x1a75e4 in _0x5bba10){if(_0x1a75e4[_0x2ad2d0(0x260)](/(.*):(.*)/i)){if(_0x2ad2d0(0x222)!==_0x2ad2d0(0x15d)){const _0x416899=String(RegExp['$1']),_0x5b4a3c=String(RegExp['$2'])[_0x2ad2d0(0x1cf)]()['trim']();let _0x1ce825,_0x1836b6,_0x1c065a;switch(_0x5b4a3c){case'NUM':_0x1ce825=_0x5bba10[_0x1a75e4]!==''?Number(_0x5bba10[_0x1a75e4]):0x0;break;case _0x2ad2d0(0x2ae):_0x1836b6=_0x5bba10[_0x1a75e4]!==''?JSON[_0x2ad2d0(0x1eb)](_0x5bba10[_0x1a75e4]):[],_0x1ce825=_0x1836b6[_0x2ad2d0(0x18a)](_0x394476=>Number(_0x394476));break;case'EVAL':_0x1ce825=_0x5bba10[_0x1a75e4]!==''?eval(_0x5bba10[_0x1a75e4]):null;break;case _0x2ad2d0(0x266):_0x1836b6=_0x5bba10[_0x1a75e4]!==''?JSON['parse'](_0x5bba10[_0x1a75e4]):[],_0x1ce825=_0x1836b6[_0x2ad2d0(0x18a)](_0x5bedbc=>eval(_0x5bedbc));break;case _0x2ad2d0(0x15b):_0x1ce825=_0x5bba10[_0x1a75e4]!==''?JSON[_0x2ad2d0(0x1eb)](_0x5bba10[_0x1a75e4]):'';break;case _0x2ad2d0(0x235):_0x1836b6=_0x5bba10[_0x1a75e4]!==''?JSON[_0x2ad2d0(0x1eb)](_0x5bba10[_0x1a75e4]):[],_0x1ce825=_0x1836b6['map'](_0x2bb8c9=>JSON[_0x2ad2d0(0x1eb)](_0x2bb8c9));break;case _0x2ad2d0(0x2a8):_0x1ce825=_0x5bba10[_0x1a75e4]!==''?new Function(JSON[_0x2ad2d0(0x1eb)](_0x5bba10[_0x1a75e4])):new Function(_0x2ad2d0(0x2ba));break;case _0x2ad2d0(0x161):_0x1836b6=_0x5bba10[_0x1a75e4]!==''?JSON[_0x2ad2d0(0x1eb)](_0x5bba10[_0x1a75e4]):[],_0x1ce825=_0x1836b6[_0x2ad2d0(0x18a)](_0x8b02bc=>new Function(JSON['parse'](_0x8b02bc)));break;case _0x2ad2d0(0x20c):_0x1ce825=_0x5bba10[_0x1a75e4]!==''?String(_0x5bba10[_0x1a75e4]):'';break;case'ARRAYSTR':_0x1836b6=_0x5bba10[_0x1a75e4]!==''?JSON[_0x2ad2d0(0x1eb)](_0x5bba10[_0x1a75e4]):[],_0x1ce825=_0x1836b6[_0x2ad2d0(0x18a)](_0x2bf988=>String(_0x2bf988));break;case _0x2ad2d0(0x1cc):_0x1c065a=_0x5bba10[_0x1a75e4]!==''?JSON[_0x2ad2d0(0x1eb)](_0x5bba10[_0x1a75e4]):{},_0x1ce825=VisuMZ[_0x2ad2d0(0x2bc)]({},_0x1c065a);break;case _0x2ad2d0(0x312):_0x1836b6=_0x5bba10[_0x1a75e4]!==''?JSON[_0x2ad2d0(0x1eb)](_0x5bba10[_0x1a75e4]):[],_0x1ce825=_0x1836b6[_0x2ad2d0(0x18a)](_0x2fa981=>VisuMZ['ConvertParams']({},JSON['parse'](_0x2fa981)));break;default:continue;}_0x1e9074[_0x416899]=_0x1ce825;}else return _0x35c588(_0x5f59ae['$1']);}}return _0x1e9074;},(_0x47ad5a=>{const _0x4221de=_0x23dad6,_0x502e0e=_0x47ad5a[_0x4221de(0x138)];for(const _0x574cc1 of dependencies){if(!Imported[_0x574cc1]){if('xpPRP'!==_0x4221de(0x1d0)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x4221de(0x19b)](_0x502e0e,_0x574cc1)),SceneManager['exit']();break;}else _0x14e54b[_0x4221de(0x1c5)][_0x4221de(0x160)](_0x2647e7,_0x4c48f8);}}const _0x25fa4e=_0x47ad5a[_0x4221de(0x329)];if(_0x25fa4e[_0x4221de(0x260)](/\[Version[ ](.*?)\]/i)){if(_0x4221de(0x2c7)!==_0x4221de(0x2c7)){const _0xdb57ec=!this[_0x4221de(0x2ce)]()&&_0x5c7d94['isTpb']();_0x4f46f0[_0x4221de(0x1c5)]['Game_Battler_removeState'][_0x4221de(0x185)](this,_0x107258);if(this[_0x4221de(0x20d)]())return;_0xdb57ec&&this[_0x4221de(0x2ce)]()&&this[_0x4221de(0x115)]()<=0x0&&(this[_0x4221de(0x300)](),this[_0x4221de(0x280)]=_0x4221de(0x27d),this[_0x4221de(0x1c0)]=_0x486f1a);}else{const _0x253aa1=Number(RegExp['$1']);_0x253aa1!==VisuMZ[label][_0x4221de(0x2a1)]&&(alert(_0x4221de(0x30e)[_0x4221de(0x19b)](_0x502e0e,_0x253aa1)),SceneManager['exit']());}}if(_0x25fa4e[_0x4221de(0x260)](/\[Tier[ ](\d+)\]/i)){const _0x43407b=Number(RegExp['$1']);_0x43407b<tier?(alert(_0x4221de(0x256)[_0x4221de(0x19b)](_0x502e0e,_0x43407b,tier)),SceneManager[_0x4221de(0x1ec)]()):_0x4221de(0x1da)!==_0x4221de(0x1da)?(_0x195381[_0x4221de(0x1c5)][_0x4221de(0x126)][_0x4221de(0x185)](this),this[_0x4221de(0x27b)]()):tier=Math[_0x4221de(0x27c)](_0x43407b,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x4221de(0x295)],_0x47ad5a[_0x4221de(0x2f9)]);})(pluginData),PluginManager[_0x23dad6(0x234)](pluginData['name'],_0x23dad6(0x23e),_0x519028=>{const _0x5a2050=_0x23dad6;VisuMZ[_0x5a2050(0x2bc)](_0x519028,_0x519028);const _0x118373=_0x519028['Actors'],_0x184381=_0x519028[_0x5a2050(0x250)];for(const _0x5ebf4f of _0x118373){const _0xa701dd=$gameActors['actor'](_0x5ebf4f);if(!_0xa701dd)continue;_0xa701dd['_fieldAtbGaugeGraphicType']=_0x5a2050(0x2a3),_0xa701dd[_0x5a2050(0x2b8)]=_0x184381;}}),PluginManager[_0x23dad6(0x234)](pluginData[_0x23dad6(0x138)],_0x23dad6(0x23d),_0x4ce9b4=>{const _0x73f65=_0x23dad6;VisuMZ[_0x73f65(0x2bc)](_0x4ce9b4,_0x4ce9b4);const _0x1d68df=_0x4ce9b4[_0x73f65(0x13b)],_0x3a4bb7=_0x4ce9b4[_0x73f65(0x1fd)],_0x298fe9=_0x4ce9b4[_0x73f65(0x286)];for(const _0x6528f0 of _0x1d68df){const _0x4bf9b7=$gameActors['actor'](_0x6528f0);if(!_0x4bf9b7)continue;_0x4bf9b7[_0x73f65(0x258)]=_0x73f65(0x207),_0x4bf9b7[_0x73f65(0x1fe)]=_0x3a4bb7,_0x4bf9b7[_0x73f65(0x1cd)]=_0x298fe9;}}),PluginManager[_0x23dad6(0x234)](pluginData[_0x23dad6(0x138)],_0x23dad6(0x119),_0x551d93=>{const _0x50e2db=_0x23dad6;VisuMZ['ConvertParams'](_0x551d93,_0x551d93);const _0x3529da=_0x551d93[_0x50e2db(0x13b)];for(const _0x30d79c of _0x3529da){const _0x24e6a0=$gameActors[_0x50e2db(0x291)](_0x30d79c);if(!_0x24e6a0)continue;_0x24e6a0[_0x50e2db(0x277)]();}}),PluginManager[_0x23dad6(0x234)](pluginData[_0x23dad6(0x138)],_0x23dad6(0x1bf),_0x469dc7=>{const _0x5184d6=_0x23dad6;VisuMZ[_0x5184d6(0x2bc)](_0x469dc7,_0x469dc7);const _0x2acba8=_0x469dc7[_0x5184d6(0x175)],_0x4a7c01=_0x469dc7[_0x5184d6(0x250)];for(const _0x53df91 of _0x2acba8){const _0x198fbe=$gameTroop[_0x5184d6(0x18d)]()[_0x53df91];if(!_0x198fbe)continue;_0x198fbe[_0x5184d6(0x258)]='icon',_0x198fbe[_0x5184d6(0x2b8)]=_0x4a7c01;}}),PluginManager[_0x23dad6(0x234)](pluginData[_0x23dad6(0x138)],_0x23dad6(0x271),_0x10cdf5=>{const _0x2d6e4c=_0x23dad6;VisuMZ[_0x2d6e4c(0x2bc)](_0x10cdf5,_0x10cdf5);const _0x51b830=_0x10cdf5[_0x2d6e4c(0x175)],_0x271af5=_0x10cdf5['FaceName'],_0x319743=_0x10cdf5[_0x2d6e4c(0x286)];for(const _0x1328d7 of _0x51b830){const _0x4c9c6a=$gameTroop[_0x2d6e4c(0x18d)]()[_0x1328d7];if(!_0x4c9c6a)continue;_0x4c9c6a['_fieldAtbGaugeGraphicType']='face',_0x4c9c6a[_0x2d6e4c(0x1fe)]=_0x271af5,_0x4c9c6a[_0x2d6e4c(0x1cd)]=_0x319743;}}),PluginManager[_0x23dad6(0x234)](pluginData['name'],_0x23dad6(0x1db),_0x51b1e7=>{const _0xdc7b08=_0x23dad6;VisuMZ[_0xdc7b08(0x2bc)](_0x51b1e7,_0x51b1e7);const _0x597389=_0x51b1e7[_0xdc7b08(0x175)];for(const _0x3b1621 of _0x597389){const _0x4e230d=$gameTroop[_0xdc7b08(0x18d)]()[_0x3b1621];if(!_0x4e230d)continue;_0x4e230d[_0xdc7b08(0x277)]();}}),PluginManager[_0x23dad6(0x234)](pluginData[_0x23dad6(0x138)],_0x23dad6(0x15a),_0x56dac0=>{const _0x48f6d7=_0x23dad6;VisuMZ[_0x48f6d7(0x2bc)](_0x56dac0,_0x56dac0);const _0x2f4d29=_0x56dac0[_0x48f6d7(0x2f6)];$gameSystem['setBattleSystemATBFieldGaugeVisible'](_0x2f4d29);}),VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x2ff)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x23dad6(0x179)][_0x23dad6(0x121)]=function(){const _0x551cab=_0x23dad6;this[_0x551cab(0x31b)](),VisuMZ[_0x551cab(0x1c5)][_0x551cab(0x2ff)]['call'](this),this[_0x551cab(0x31e)]();},VisuMZ['BattleSystemATB'][_0x23dad6(0x253)]={},Scene_Boot[_0x23dad6(0x179)][_0x23dad6(0x31b)]=function(){const _0x41eec6=_0x23dad6,_0x31289a=VisuMZ['BattleCore'][_0x41eec6(0x253)],_0x5e9b3b=_0x41eec6(0x240),_0x3ebfe9=[_0x41eec6(0x140),_0x41eec6(0x29c),_0x41eec6(0x143)];for(const _0x3e4197 of _0x3ebfe9){if(_0x41eec6(0x290)===_0x41eec6(0x176))this['_fieldAtbGaugeIconIndex']=_0x487ef8;else{const _0x12dbc7=_0x5e9b3b[_0x41eec6(0x19b)](_0x3e4197[_0x41eec6(0x1cf)]()[_0x41eec6(0x25d)](),_0x41eec6(0x2c1),_0x41eec6(0x31a)),_0x560854=new RegExp(_0x12dbc7,'i');VisuMZ[_0x41eec6(0x1c5)][_0x41eec6(0x253)][_0x3e4197]=_0x560854;}}},Scene_Boot[_0x23dad6(0x179)][_0x23dad6(0x31e)]=function(){const _0x430a0b=_0x23dad6;if(VisuMZ[_0x430a0b(0x1e8)])return;const _0xbd13e6=$dataSkills[_0x430a0b(0x16f)]($dataItems);for(const _0x3da622 of _0xbd13e6){if(_0x430a0b(0x128)!==_0x430a0b(0x1b0)){if(!_0x3da622)continue;VisuMZ[_0x430a0b(0x1c5)][_0x430a0b(0x324)](_0x3da622);}else return 0x0;}},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x2c9)]=VisuMZ[_0x23dad6(0x2c9)],VisuMZ['ParseSkillNotetags']=function(_0x41c913){const _0x4fe2a7=_0x23dad6;VisuMZ[_0x4fe2a7(0x1c5)]['ParseSkillNotetags'][_0x4fe2a7(0x185)](this,_0x41c913),VisuMZ['BattleSystemATB'][_0x4fe2a7(0x324)](_0x41c913);},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x19f)]=VisuMZ[_0x23dad6(0x19f)],VisuMZ[_0x23dad6(0x19f)]=function(_0x44261c){const _0x2c29ca=_0x23dad6;VisuMZ[_0x2c29ca(0x1c5)][_0x2c29ca(0x19f)][_0x2c29ca(0x185)](this,_0x44261c),VisuMZ[_0x2c29ca(0x1c5)][_0x2c29ca(0x324)](_0x44261c);},VisuMZ['BattleSystemATB'][_0x23dad6(0x324)]=function(_0x3b7d81){const _0x3954be=_0x23dad6,_0x5846e2=[_0x3954be(0x140),_0x3954be(0x29c),_0x3954be(0x143)];for(const _0x2852b5 of _0x5846e2){VisuMZ[_0x3954be(0x1c5)]['createJS'](_0x3b7d81,_0x2852b5);}},VisuMZ[_0x23dad6(0x1c5)]['JS']={},VisuMZ['BattleSystemATB']['createJS']=function(_0x42a563,_0x2b58b9){const _0xae2812=_0x23dad6,_0x4156c5=_0x42a563[_0xae2812(0x276)];if(_0x4156c5['match'](VisuMZ[_0xae2812(0x1c5)][_0xae2812(0x253)][_0x2b58b9])){const _0x3d2c5b=String(RegExp['$1']),_0x5c163e=_0xae2812(0x118)[_0xae2812(0x19b)](_0x3d2c5b,_0x2b58b9),_0x1d794a=VisuMZ['BattleSystemATB'][_0xae2812(0x25b)](_0x42a563,_0x2b58b9);VisuMZ[_0xae2812(0x1c5)]['JS'][_0x1d794a]=new Function(_0x5c163e);}},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x25b)]=function(_0x471a42,_0x286393){const _0x4e3600=_0x23dad6;if(VisuMZ[_0x4e3600(0x25b)])return VisuMZ['createKeyJS'](_0x471a42,_0x286393);let _0x128c5a='';if($dataActors[_0x4e3600(0x1e7)](_0x471a42))_0x128c5a=_0x4e3600(0x218)[_0x4e3600(0x19b)](_0x471a42['id'],_0x286393);if($dataClasses[_0x4e3600(0x1e7)](_0x471a42))_0x128c5a=_0x4e3600(0x2bf)[_0x4e3600(0x19b)](_0x471a42['id'],_0x286393);if($dataSkills[_0x4e3600(0x1e7)](_0x471a42))_0x128c5a=_0x4e3600(0x164)['format'](_0x471a42['id'],_0x286393);if($dataItems['includes'](_0x471a42))_0x128c5a=_0x4e3600(0x28c)[_0x4e3600(0x19b)](_0x471a42['id'],_0x286393);if($dataWeapons[_0x4e3600(0x1e7)](_0x471a42))_0x128c5a='Weapon-%1-%2'[_0x4e3600(0x19b)](_0x471a42['id'],_0x286393);if($dataArmors['includes'](_0x471a42))_0x128c5a='Armor-%1-%2'['format'](_0x471a42['id'],_0x286393);if($dataEnemies['includes'](_0x471a42))_0x128c5a='Enemy-%1-%2'[_0x4e3600(0x19b)](_0x471a42['id'],_0x286393);if($dataStates[_0x4e3600(0x1e7)](_0x471a42))_0x128c5a=_0x4e3600(0x275)[_0x4e3600(0x19b)](_0x471a42['id'],_0x286393);return _0x128c5a;},ConfigManager['visualAtbGauge']=!![],VisuMZ['BattleSystemATB']['ConfigManager_makeData']=ConfigManager['makeData'],ConfigManager[_0x23dad6(0x1de)]=function(){const _0x9fdaec=_0x23dad6,_0x4b40d9=VisuMZ[_0x9fdaec(0x1c5)][_0x9fdaec(0x1b3)]['call'](this);return _0x4b40d9[_0x9fdaec(0x189)]=this['visualAtbGauge'],_0x4b40d9;},VisuMZ[_0x23dad6(0x1c5)]['ConfigManager_applyData']=ConfigManager[_0x23dad6(0x1bb)],ConfigManager[_0x23dad6(0x1bb)]=function(_0x3e3a80){const _0x4bdf21=_0x23dad6;VisuMZ[_0x4bdf21(0x1c5)][_0x4bdf21(0x196)]['call'](this,_0x3e3a80);if(_0x4bdf21(0x189)in _0x3e3a80)_0x4bdf21(0x2cc)===_0x4bdf21(0x2cc)?this[_0x4bdf21(0x189)]=_0x3e3a80['visualAtbGauge']:this[_0x4bdf21(0x1d7)]();else{if(_0x4bdf21(0x2d5)!==_0x4bdf21(0x2d5))return this[_0x4bdf21(0x158)]();else this[_0x4bdf21(0x189)]=!![];}},ImageManager[_0x23dad6(0x232)]=ImageManager[_0x23dad6(0x232)]||0x9,ImageManager['svActorVertCells']=ImageManager[_0x23dad6(0x21d)]||0x6,TextManager[_0x23dad6(0x189)]=VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x295)][_0x23dad6(0x272)][_0x23dad6(0x281)],VisuMZ[_0x23dad6(0x1c5)]['ColorManager_loadWindowskin']=ColorManager[_0x23dad6(0x1d5)],ColorManager[_0x23dad6(0x1d5)]=function(){const _0x24e9a3=_0x23dad6;VisuMZ[_0x24e9a3(0x1c5)]['ColorManager_loadWindowskin']['call'](this),this[_0x24e9a3(0x317)][_0x24e9a3(0x1a0)](this[_0x24e9a3(0x22c)][_0x24e9a3(0x26c)](this));},ColorManager[_0x23dad6(0x1af)]=function(_0x19ec3c){const _0x6666c3=_0x23dad6;_0x19ec3c=String(_0x19ec3c);if(_0x19ec3c['match'](/#(.*)/i)){if('pbqIH'!==_0x6666c3(0x20f)){const _0x2b92b3=this[_0x6666c3(0x12e)](),_0x4ba5fe=_0x5d8b79['Settings'][_0x6666c3(0x1ed)];if(this[_0x6666c3(0x1e6)]>_0x2b92b3)this['opacity']=_0x25921b[_0x6666c3(0x27c)](_0x2b92b3,this[_0x6666c3(0x1e6)]-_0x4ba5fe);else this[_0x6666c3(0x1e6)]<_0x2b92b3&&(this[_0x6666c3(0x1e6)]=_0x23547c[_0x6666c3(0x211)](_0x2b92b3,this['opacity']+_0x4ba5fe));}else return _0x6666c3(0x20e)[_0x6666c3(0x19b)](String(RegExp['$1']));}else{if(_0x6666c3(0x26a)===_0x6666c3(0x117)){if(this[_0x6666c3(0x20b)]!==_0x106b66)return this[_0x6666c3(0x20b)];const _0x5564fc=_0xd0959[_0x6666c3(0x295)][_0x6666c3(0x28a)];return this[_0x6666c3(0x20b)]=[_0x6666c3(0x195),_0x6666c3(0x307)]['includes'](_0x5564fc),this['_horz'];}else return this[_0x6666c3(0x224)](Number(_0x19ec3c));}},ColorManager[_0x23dad6(0x22c)]=function(){const _0x4cd1e8=_0x23dad6,_0x57b422=[_0x4cd1e8(0x26b),_0x4cd1e8(0x1a5),_0x4cd1e8(0x31c),_0x4cd1e8(0x156),_0x4cd1e8(0x309),_0x4cd1e8(0x316)],_0x4108ec=VisuMZ['BattleSystemATB'][_0x4cd1e8(0x295)]['Color'];this['_atbColors']={};for(const _0x56f928 of _0x57b422){if(_0x4cd1e8(0x2d1)===_0x4cd1e8(0x24c))this['_tpbCastTime']>=this[_0x4cd1e8(0x167)]()&&(this['_tpbState']=_0x4cd1e8(0x1f4));else for(let _0x53479e=0x1;_0x53479e<=0x2;_0x53479e++){const _0x57eb8e=_0x56f928+_0x53479e;this['_atbColors'][_0x57eb8e]=this[_0x4cd1e8(0x1af)](_0x4108ec[_0x57eb8e]);}}},ColorManager[_0x23dad6(0x116)]=function(_0x37ee81){const _0x42c469=_0x23dad6;if(this[_0x42c469(0x182)]===undefined)this[_0x42c469(0x22c)]();return this[_0x42c469(0x182)][_0x37ee81]||_0x42c469(0x192);},SceneManager[_0x23dad6(0x203)]=function(){const _0x11bb36=_0x23dad6;return this[_0x11bb36(0x2ec)]&&this[_0x11bb36(0x2ec)][_0x11bb36(0x274)]===Scene_Battle;},BattleManager[_0x23dad6(0x22b)]=function(){const _0x47371e=_0x23dad6;if(Imported[_0x47371e(0x180)]&&this[_0x47371e(0x132)]())return![];return this['isTpb']();},VisuMZ['BattleSystemATB'][_0x23dad6(0x2dd)]=BattleManager[_0x23dad6(0x242)],BattleManager[_0x23dad6(0x242)]=function(){const _0x5938df=_0x23dad6;if(!this['isTpb']())return![];else{if(ConfigManager&&ConfigManager['atbActive']!==undefined)return ConfigManager[_0x5938df(0x213)];else{if(_0x5938df(0x302)===_0x5938df(0x302))return VisuMZ[_0x5938df(0x1c5)]['BattleManager_isActiveTpb'][_0x5938df(0x185)](this);else{if(!_0x4059d1[_0x5938df(0x22b)]())return;if(!_0x57e1e8[_0x5938df(0x295)]['UseFieldGauge'])return;if(!_0x57df4e[_0x5938df(0x189)])return;this['_fieldGaugeATB_Container']=new _0x134c25(new _0x1a938d(0x0,0x0,0x0,0x0));const _0x4bba5f=this[_0x5938df(0x2c6)](this[_0x5938df(0x315)]);this[_0x5938df(0x1f7)](this['_fieldGaugeATB_Container'],_0x4bba5f);}}}},VisuMZ['BattleSystemATB']['Game_System_initialize']=Game_System[_0x23dad6(0x179)][_0x23dad6(0x223)],Game_System[_0x23dad6(0x179)][_0x23dad6(0x223)]=function(){const _0x371c33=_0x23dad6;VisuMZ[_0x371c33(0x1c5)][_0x371c33(0x2a9)][_0x371c33(0x185)](this),this[_0x371c33(0x1e2)]();},Game_System[_0x23dad6(0x179)][_0x23dad6(0x1e2)]=function(){this['_atbFieldGaugeVisible']=!![];},Game_System[_0x23dad6(0x179)][_0x23dad6(0x1c2)]=function(){const _0x51a38d=_0x23dad6;return this[_0x51a38d(0x202)]===undefined&&this[_0x51a38d(0x1e2)](),this[_0x51a38d(0x202)];},Game_System['prototype'][_0x23dad6(0x1f8)]=function(_0x384bb2){const _0x7b2ad1=_0x23dad6;this[_0x7b2ad1(0x202)]===undefined&&this['initBattleSystemATB'](),this[_0x7b2ad1(0x202)]=_0x384bb2;},VisuMZ['BattleSystemATB'][_0x23dad6(0x19a)]=Game_Action['prototype'][_0x23dad6(0x2e2)],Game_Action[_0x23dad6(0x179)][_0x23dad6(0x2e2)]=function(_0x572309){const _0x54f2d1=_0x23dad6;VisuMZ['BattleSystemATB'][_0x54f2d1(0x19a)][_0x54f2d1(0x185)](this,_0x572309),this['applyBattleSystemATBUserEffect'](_0x572309);},Game_Action[_0x23dad6(0x179)][_0x23dad6(0x15f)]=function(_0x103204){const _0x437461=_0x23dad6;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x437461(0x22b)]())return;if(this[_0x437461(0x2b0)]())this[_0x437461(0x13c)](_0x103204);},Game_Action[_0x23dad6(0x179)]['applyItemBattleSystemATBUserEffect']=function(_0x492d70){const _0x11b94f=_0x23dad6,_0x19a48b=this['item']()[_0x11b94f(0x276)];if(_0x492d70[_0x11b94f(0x2e1)]()){const _0x1c9d10=VisuMZ['BattleSystemATB'][_0x11b94f(0x25b)](this[_0x11b94f(0x2b0)](),_0x11b94f(0x140));if(VisuMZ[_0x11b94f(0x1c5)]['JS'][_0x1c9d10]){if(_0x11b94f(0x2af)==='ifevq'){const _0x16c14d=VisuMZ['BattleSystemATB']['JS'][_0x1c9d10]['call'](this,this[_0x11b94f(0x1a2)](),_0x492d70);_0x492d70['setAtbChargeTime'](_0x16c14d);}else _0x287874[_0x11b94f(0x1c5)][_0x11b94f(0x233)][_0x11b94f(0x185)](this),_0x408ade[_0x11b94f(0x22b)]()&&(this[_0x11b94f(0x229)]>=this[_0x11b94f(0x167)]()&&(this[_0x11b94f(0x280)]=_0x11b94f(0x1f4)));}_0x19a48b[_0x11b94f(0x260)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x492d70[_0x11b94f(0x2d0)](Number(RegExp['$1'])*0.01),_0x19a48b['match'](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&('OcxZM'===_0x11b94f(0x2f4)?_0x492d70[_0x11b94f(0x2c4)](Number(RegExp['$1'])*0.01):this['setAtbChargeTime'](this[_0x11b94f(0x168)]+_0x3976a3));}else{if(_0x492d70[_0x11b94f(0x154)]()){if('IZHja'==='lSPmu')_0x195275[_0x11b94f(0x179)]['update'][_0x11b94f(0x185)](this),this[_0x11b94f(0x2dc)](),this['updatePositionOffset'](),this['updatePositionOnGauge'](),this['updateGraphic'](),this[_0x11b94f(0x194)](),this[_0x11b94f(0x1a3)](),this[_0x11b94f(0x27e)]();else{const _0x5b4211=VisuMZ[_0x11b94f(0x1c5)][_0x11b94f(0x25b)](this[_0x11b94f(0x2b0)](),_0x11b94f(0x29c));if(VisuMZ[_0x11b94f(0x1c5)]['JS'][_0x5b4211]){const _0x44dc34=VisuMZ[_0x11b94f(0x1c5)]['JS'][_0x5b4211]['call'](this,this[_0x11b94f(0x1a2)](),_0x492d70);_0x492d70['setAtbCastTime'](_0x44dc34);}if(_0x19a48b[_0x11b94f(0x260)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if(_0x11b94f(0x210)!=='DjvEq')_0x492d70[_0x11b94f(0x17b)](Number(RegExp['$1'])*0.01);else return _0x23cb82[_0x11b94f(0x18d)]()[this[_0x11b94f(0x2bb)]];}_0x19a48b[_0x11b94f(0x260)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&(_0x11b94f(0x191)!==_0x11b94f(0x191)?_0x568b26=_0x7faac2*_0x5ae278:_0x492d70[_0x11b94f(0x2c0)](Number(RegExp['$1'])*0.01)),_0x19a48b[_0x11b94f(0x260)](/<(?:ATB|TPB) INTERRUPT>/i)&&_0x492d70[_0x11b94f(0x1df)]();}}}},VisuMZ[_0x23dad6(0x1c5)]['Game_Action_applyGlobal']=Game_Action[_0x23dad6(0x179)][_0x23dad6(0x2ad)],Game_Action[_0x23dad6(0x179)][_0x23dad6(0x2ad)]=function(){const _0x36c747=_0x23dad6;VisuMZ[_0x36c747(0x1c5)][_0x36c747(0x278)]['call'](this),this[_0x36c747(0x21c)]();},Game_Action[_0x23dad6(0x179)][_0x23dad6(0x21c)]=function(){const _0xb88460=_0x23dad6;if(!this[_0xb88460(0x2b0)]())return;if(!BattleManager[_0xb88460(0x22b)]())return;const _0xa9ff19=this[_0xb88460(0x2b0)]()[_0xb88460(0x276)];let _0x52c756=0x0;this[_0xb88460(0x16b)]&&(_0x52c756=this[_0xb88460(0x1a2)]()[_0xb88460(0x168)]);const _0x5c00b2=VisuMZ[_0xb88460(0x1c5)]['createKeyJS'](this[_0xb88460(0x2b0)](),_0xb88460(0x143));VisuMZ[_0xb88460(0x1c5)]['JS'][_0x5c00b2]&&(_0x52c756=VisuMZ['BattleSystemATB']['JS'][_0x5c00b2][_0xb88460(0x185)](this,this[_0xb88460(0x1a2)](),this[_0xb88460(0x1a2)]()));let _0x4a28fc=this[_0xb88460(0x2b0)]()['speed']>0x0?this[_0xb88460(0x2b0)]()[_0xb88460(0x1f2)]:0x0;if(this['isAttack']())_0x4a28fc+=this['subject']()[_0xb88460(0x294)]();_0x52c756+=(_0x4a28fc/0xfa0)[_0xb88460(0x21a)](0x0,0x1);this[_0xb88460(0x2b0)]()[_0xb88460(0x276)][_0xb88460(0x260)](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x52c756=Number(RegExp['$1'])*0.01);const _0x3b450f=this['subject']()['traitObjects']()['concat'](this[_0xb88460(0x1a2)]()[_0xb88460(0x2b9)]()),_0x28143d=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x52079b=_0x3b450f[_0xb88460(0x18a)](_0x45559a=>_0x45559a&&_0x45559a[_0xb88460(0x276)][_0xb88460(0x260)](_0x28143d)?Number(RegExp['$1'])*0.01:0x0);_0x52c756=_0x52079b[_0xb88460(0x131)]((_0x15eb12,_0x2986e2)=>_0x15eb12+_0x2986e2,_0x52c756),this['item']()['note']['match'](/<(?:ATB|TPB) INSTANT>/i)&&(_0x52c756=0xa),this[_0xb88460(0x1a2)]()[_0xb88460(0x299)](_0x52c756);},Game_BattlerBase['prototype'][_0x23dad6(0x2d0)]=function(_0x1778c5){const _0x422280=_0x23dad6;this['_tpbChargeTime']=_0x1778c5[_0x422280(0x21a)](0x0,0x1);},Game_BattlerBase['prototype']['changeAtbChargeTime']=function(_0x311ba8){const _0x4fdfa2=_0x23dad6;this[_0x4fdfa2(0x2d0)](this['_tpbChargeTime']+_0x311ba8);},Game_BattlerBase[_0x23dad6(0x179)]['setAtbCastTime']=function(_0x5293f8){const _0x499761=_0x23dad6,_0x406f46=this[_0x499761(0x167)]();this[_0x499761(0x229)]=(_0x406f46*_0x5293f8)[_0x499761(0x21a)](0x0,_0x406f46);},Game_BattlerBase[_0x23dad6(0x179)][_0x23dad6(0x2c0)]=function(_0x379067){const _0x5e5e0d=_0x23dad6,_0x43fb6a=this[_0x5e5e0d(0x167)](),_0x529cb5=_0x43fb6a*_0x379067;this[_0x5e5e0d(0x229)]=(this['_tpbCastTime']+_0x529cb5)[_0x5e5e0d(0x21a)](0x0,_0x43fb6a);},VisuMZ['BattleSystemATB'][_0x23dad6(0x137)]=Game_BattlerBase[_0x23dad6(0x179)][_0x23dad6(0x318)],Game_BattlerBase[_0x23dad6(0x179)]['die']=function(){const _0x5e12ea=_0x23dad6;VisuMZ[_0x5e12ea(0x1c5)]['Game_BattlerBase_die'][_0x5e12ea(0x185)](this),BattleManager['isTpb']()&&this[_0x5e12ea(0x1c6)]();},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x20a)]=Game_BattlerBase['prototype'][_0x23dad6(0x2e4)],Game_BattlerBase[_0x23dad6(0x179)]['revive']=function(){const _0x1e862e=_0x23dad6;VisuMZ[_0x1e862e(0x1c5)][_0x1e862e(0x20a)][_0x1e862e(0x185)](this),BattleManager[_0x1e862e(0x13d)]()&&this[_0x1e862e(0x1c6)]();},Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x2e1)]=function(){const _0xd2ab29=_0x23dad6;return this[_0xd2ab29(0x280)]===_0xd2ab29(0x27d);},Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x154)]=function(){const _0x257c3c=_0x23dad6;return this[_0x257c3c(0x280)]==='casting'&&this[_0x257c3c(0x27f)]()&&this[_0x257c3c(0x27f)]()['item']()&&this[_0x257c3c(0x27f)]()[_0x257c3c(0x2b0)]()[_0x257c3c(0x1f2)]<0x0;},Game_BattlerBase[_0x23dad6(0x179)][_0x23dad6(0x11d)]=function(){const _0x32083c=_0x23dad6;if(this['isAtbCastingState']()){if(_0x32083c(0x231)!=='mfZga')this[_0x32083c(0x1cd)]=this[_0x32083c(0x23f)]();else return this[_0x32083c(0x229)]/this[_0x32083c(0x167)]();}else{if('QzjHB'===_0x32083c(0x2fe))return 0x0;else this['_fieldAtbGaugeIconIndex']=this[_0x32083c(0x209)]();}},Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x2a0)]=function(){const _0x2ac05a=_0x23dad6;return!this[_0x2ac05a(0x2ce)]();},Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x299)]=function(_0x5d4e06){const _0x1be696=_0x23dad6;this[_0x1be696(0x2e8)]=_0x5d4e06;},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x322)]=BattleManager[_0x23dad6(0x152)],BattleManager[_0x23dad6(0x152)]=function(_0x3ae5fa){const _0x5e7101=_0x23dad6;this['isTpb']()&&!_0x3ae5fa[_0x5e7101(0x2ce)]()&&(_0x3ae5fa[_0x5e7101(0x1c0)]=!![]);VisuMZ[_0x5e7101(0x1c5)][_0x5e7101(0x322)][_0x5e7101(0x185)](this,_0x3ae5fa);if(this[_0x5e7101(0x13d)]()&&!_0x3ae5fa['canMove']()){if('UKwbm'!==_0x5e7101(0x1e1)){if(!this['isAtbCastingState']())return;}else _0x3ae5fa['_onRestrictBypassAtbReset']=![];}},VisuMZ[_0x23dad6(0x1c5)]['Game_Battler_clearTpbChargeTime']=Game_Battler[_0x23dad6(0x179)]['clearTpbChargeTime'],Game_Battler['prototype'][_0x23dad6(0x1c6)]=function(){const _0x54a239=_0x23dad6;if(this[_0x54a239(0x1c0)])return;VisuMZ[_0x54a239(0x1c5)][_0x54a239(0x246)][_0x54a239(0x185)](this),this[_0x54a239(0x168)]+=this[_0x54a239(0x2e8)]||0x0;},Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x1df)]=function(){const _0x10feab=_0x23dad6;if(!this['isAtbCastingState']())return;if(!this[_0x10feab(0x27f)]())return;if(!this[_0x10feab(0x27f)]()[_0x10feab(0x2b0)]())return;if(this['currentAction']()[_0x10feab(0x2b0)]()[_0x10feab(0x276)]['match'](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this[_0x10feab(0x310)](),this['clearTpbChargeTime'](),this[_0x10feab(0x229)]=0x0,this[_0x10feab(0x1b2)]();},Game_Battler['prototype'][_0x23dad6(0x1b2)]=function(){const _0x9c8b43=_0x23dad6,_0x21a717=VisuMZ[_0x9c8b43(0x1c5)][_0x9c8b43(0x295)][_0x9c8b43(0x2b3)];if(Imported[_0x9c8b43(0x284)]){if(_0x9c8b43(0x1d9)==='hQWUG'){if(_0x16599a[_0x9c8b43(0x180)]&&this[_0x9c8b43(0x132)]())return![];return this[_0x9c8b43(0x13d)]();}else{const _0x5d4682=_0x21a717['InterruptAnimationID'],_0x250795=_0x21a717[_0x9c8b43(0x2fa)],_0x347177=_0x21a717[_0x9c8b43(0x177)];$gameTemp[_0x9c8b43(0x214)]([this],_0x5d4682,_0x250795,_0x347177);}}if(this[_0x9c8b43(0x270)]()&&_0x21a717[_0x9c8b43(0x28f)][_0x9c8b43(0x122)]>0x0){const _0x27a75e=_0x21a717[_0x9c8b43(0x28f)],_0x65a927={'textColor':ColorManager[_0x9c8b43(0x1af)](_0x21a717['InterruptTextColor']),'flashColor':_0x21a717['InterruptFlashColor'],'flashDuration':_0x21a717[_0x9c8b43(0x313)]};this[_0x9c8b43(0x212)](_0x27a75e,_0x65a927);}},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x233)]=Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x22f)],Game_Battler['prototype']['startTpbCasting']=function(){const _0x3ffc4d=_0x23dad6;VisuMZ[_0x3ffc4d(0x1c5)][_0x3ffc4d(0x233)][_0x3ffc4d(0x185)](this),BattleManager[_0x3ffc4d(0x22b)]()&&(this[_0x3ffc4d(0x229)]>=this['tpbRequiredCastTime']()&&(this['_tpbState']=_0x3ffc4d(0x1f4)));},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x16d)]=Game_Unit[_0x23dad6(0x179)][_0x23dad6(0x247)],Game_Unit[_0x23dad6(0x179)]['updateTpb']=function(){const _0x11ca8f=_0x23dad6;if(BattleManager[_0x11ca8f(0x22b)]()){if(BattleManager[_0x11ca8f(0x259)]()['some'](_0x425949=>_0x425949&&_0x425949[_0x11ca8f(0x1be)]()&&_0x425949[_0x11ca8f(0x155)]()&&_0x425949['_tpbState']===_0x11ca8f(0x1f4)))return;}VisuMZ[_0x11ca8f(0x1c5)][_0x11ca8f(0x16d)][_0x11ca8f(0x185)](this);},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x269)]=Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x226)],Game_Battler['prototype']['onRestrict']=function(){const _0x14d809=_0x23dad6;if(!VisuMZ['BattleSystemATB']['Settings'][_0x14d809(0x29a)][_0x14d809(0x239)]){if(_0x14d809(0x124)!=='xERFp')return _0x5a47f5[_0x14d809(0x22b)]()?_0x5e7303[_0x14d809(0x1c5)]['Settings']['Mechanics'][_0x14d809(0x2b5)][_0x14d809(0x185)](this,this):_0x2fe4fc[_0x14d809(0x1c5)][_0x14d809(0x219)][_0x14d809(0x185)](this);else this[_0x14d809(0x1c0)]=BattleManager[_0x14d809(0x22b)]();}VisuMZ[_0x14d809(0x1c5)]['Game_Battler_onRestrict'][_0x14d809(0x185)](this),this[_0x14d809(0x1c0)]=undefined;},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x193)]=Game_Actor[_0x23dad6(0x179)]['clearActions'],Game_Actor[_0x23dad6(0x179)][_0x23dad6(0x310)]=function(){const _0x3be938=_0x23dad6;if(this[_0x3be938(0x1c0)]){if(_0x3be938(0x23b)==='wHasP'){if(!this[_0x3be938(0x154)]())return;}else this[_0x3be938(0x258)]=this['createFieldAtbGraphicType']();}VisuMZ[_0x3be938(0x1c5)][_0x3be938(0x193)][_0x3be938(0x185)](this);},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x133)]=Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x30b)],Game_Battler[_0x23dad6(0x179)]['removeState']=function(_0xd20553){const _0x18c12a=_0x23dad6,_0x4e2148=!this[_0x18c12a(0x2ce)]()&&BattleManager[_0x18c12a(0x13d)]();VisuMZ[_0x18c12a(0x1c5)][_0x18c12a(0x133)][_0x18c12a(0x185)](this,_0xd20553);if(this[_0x18c12a(0x20d)]())return;_0x4e2148&&this['canMove']()&&this[_0x18c12a(0x115)]()<=0x0&&(_0x18c12a(0x265)!==_0x18c12a(0x293)?(this[_0x18c12a(0x300)](),this[_0x18c12a(0x280)]='charging',this['_onRestrictBypassAtbReset']=undefined):(this[_0x18c12a(0x300)](),this[_0x18c12a(0x280)]=_0x18c12a(0x27d),this[_0x18c12a(0x1c0)]=_0x4e7fb9));},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x25c)]=Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x1fb)],Game_Battler[_0x23dad6(0x179)]['applyTpbPenalty']=function(){const _0x23ac72=_0x23dad6;if(BattleManager[_0x23ac72(0x22b)]()){if('ZAftz'!=='ZAftz')return _0x22de2e['Settings'][_0x23ac72(0x230)];else this[_0x23ac72(0x288)]();}else VisuMZ['BattleSystemATB'][_0x23ac72(0x25c)][_0x23ac72(0x185)](this);},Game_Battler['prototype'][_0x23dad6(0x288)]=function(){const _0x50015d=_0x23dad6;this[_0x50015d(0x280)]='charging',this[_0x50015d(0x168)]+=VisuMZ[_0x50015d(0x1c5)]['Settings'][_0x50015d(0x29a)][_0x50015d(0x1ea)]||0x0;},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x16c)]=Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x2eb)],Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x2eb)]=function(){const _0x4561b6=_0x23dad6;return BattleManager['isATB']()?VisuMZ[_0x4561b6(0x1c5)]['Settings'][_0x4561b6(0x29a)][_0x4561b6(0x14a)][_0x4561b6(0x185)](this,this):VisuMZ[_0x4561b6(0x1c5)][_0x4561b6(0x16c)]['call'](this);},VisuMZ['BattleSystemATB']['Game_Battler_tpbBaseSpeed']=Game_Battler[_0x23dad6(0x179)]['tpbBaseSpeed'],Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x2e9)]=function(){const _0x37c795=_0x23dad6;if(BattleManager[_0x37c795(0x22b)]()){if(_0x37c795(0x2ef)===_0x37c795(0x1bd))this['initialize'](...arguments);else return VisuMZ[_0x37c795(0x1c5)][_0x37c795(0x295)][_0x37c795(0x29a)]['TpbBaseSpeedCalcJS'][_0x37c795(0x185)](this,this);}else return VisuMZ[_0x37c795(0x1c5)][_0x37c795(0x28b)][_0x37c795(0x185)](this);},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x219)]=Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x14d)],Game_Battler[_0x23dad6(0x179)]['tpbRelativeSpeed']=function(){const _0x582be8=_0x23dad6;return BattleManager[_0x582be8(0x22b)]()?VisuMZ[_0x582be8(0x1c5)][_0x582be8(0x295)]['Mechanics']['BattlerRelativeSpeedJS'][_0x582be8(0x185)](this,this):VisuMZ[_0x582be8(0x1c5)][_0x582be8(0x219)][_0x582be8(0x185)](this);},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x174)]=Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x305)],Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x305)]=function(){const _0x21ae76=_0x23dad6;if(BattleManager[_0x21ae76(0x22b)]())return this[_0x21ae76(0x1a6)]();else{if(_0x21ae76(0x1a9)===_0x21ae76(0x135))this[_0x21ae76(0x13d)]()&&!_0x5a07db[_0x21ae76(0x2ce)]()&&(_0x1ad1c8[_0x21ae76(0x1c0)]=!![]),_0x268de4[_0x21ae76(0x1c5)][_0x21ae76(0x322)][_0x21ae76(0x185)](this,_0x307af3),this['isTpb']()&&!_0x257a78[_0x21ae76(0x2ce)]()&&(_0x417cd2['_onRestrictBypassAtbReset']=![]);else return VisuMZ[_0x21ae76(0x1c5)][_0x21ae76(0x174)]['call'](this);}},Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x1a6)]=function(){const _0x3cd0f6=_0x23dad6;let _0x379a30=VisuMZ[_0x3cd0f6(0x1c5)][_0x3cd0f6(0x295)][_0x3cd0f6(0x29a)][_0x3cd0f6(0x225)][_0x3cd0f6(0x185)](this,this);if(ConfigManager&&ConfigManager[_0x3cd0f6(0x16a)]!==undefined){const _0x16a354=ConfigManager[_0x3cd0f6(0x16a)]-0x3;if(_0x16a354>0x0)return _0x379a30*(_0x16a354*0x2);else{if(_0x16a354<0x0)return _0x379a30*(0x1/(_0x16a354*-0x2));}}return _0x379a30;},VisuMZ['BattleSystemATB'][_0x23dad6(0x147)]=Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x167)],Game_Battler[_0x23dad6(0x179)][_0x23dad6(0x167)]=function(){const _0x3bc0b2=_0x23dad6;if(BattleManager[_0x3bc0b2(0x22b)]()){if(_0x3bc0b2(0x2cf)===_0x3bc0b2(0x1f5))delete this[_0x3bc0b2(0x258)],delete this[_0x3bc0b2(0x1fe)],delete this[_0x3bc0b2(0x1cd)],delete this[_0x3bc0b2(0x2b8)];else return VisuMZ[_0x3bc0b2(0x1c5)][_0x3bc0b2(0x295)]['Mechanics'][_0x3bc0b2(0x2df)][_0x3bc0b2(0x185)](this,this);}else return VisuMZ[_0x3bc0b2(0x1c5)][_0x3bc0b2(0x147)][_0x3bc0b2(0x185)](this);},VisuMZ[_0x23dad6(0x1c5)]['Scene_Options_maxCommands']=Scene_Options[_0x23dad6(0x179)][_0x23dad6(0x148)],Scene_Options[_0x23dad6(0x179)]['maxCommands']=function(){const _0x1a5f9c=_0x23dad6;let _0x23de66=VisuMZ[_0x1a5f9c(0x1c5)][_0x1a5f9c(0x1ac)][_0x1a5f9c(0x185)](this);const _0x272c02=VisuMZ[_0x1a5f9c(0x1c5)]['Settings'];if(_0x272c02[_0x1a5f9c(0x272)][_0x1a5f9c(0x264)]&&_0x272c02[_0x1a5f9c(0x272)][_0x1a5f9c(0x2c3)]&&BattleManager[_0x1a5f9c(0x22b)]())_0x23de66++;return _0x23de66;},Sprite_Battler['prototype'][_0x23dad6(0x1d7)]=function(){const _0x44ab74=_0x23dad6;if(!BattleManager[_0x44ab74(0x22b)]())return;if(!ConfigManager['visualAtbGauge'])return;const _0x3027d9=VisuMZ[_0x44ab74(0x1c5)][_0x44ab74(0x295)][_0x44ab74(0x2fb)],_0x558d8d=new Sprite_Gauge();_0x558d8d[_0x44ab74(0x1b5)]['x']=_0x3027d9[_0x44ab74(0x2f7)],_0x558d8d['anchor']['y']=_0x3027d9[_0x44ab74(0x2f0)],_0x558d8d['scale']['x']=_0x558d8d['scale']['y']=_0x3027d9[_0x44ab74(0x1d2)],this['_atbGaugeSprite']=_0x558d8d,this[_0x44ab74(0x17e)](this[_0x44ab74(0x215)]);},VisuMZ['BattleSystemATB'][_0x23dad6(0x165)]=Sprite_Battler['prototype'][_0x23dad6(0x24e)],Sprite_Battler[_0x23dad6(0x179)][_0x23dad6(0x24e)]=function(_0x50d0c8){const _0x1104ef=_0x23dad6;VisuMZ[_0x1104ef(0x1c5)][_0x1104ef(0x165)]['call'](this,_0x50d0c8),this[_0x1104ef(0x21e)](_0x50d0c8),this[_0x1104ef(0x268)]();},Sprite_Battler[_0x23dad6(0x179)][_0x23dad6(0x21e)]=function(_0x498a0e){const _0x6cc78c=_0x23dad6;if(!_0x498a0e)return;if(!this['_atbGaugeSprite'])return;if(_0x498a0e[_0x6cc78c(0x29b)]()){}else{if(_0x498a0e[_0x6cc78c(0x20d)]()){if(this[_0x6cc78c(0x274)]===Sprite_Enemy&&_0x498a0e['hasSvBattler']())return;if(this[_0x6cc78c(0x274)]===Sprite_SvEnemy&&!_0x498a0e[_0x6cc78c(0x285)]())return;}}this[_0x6cc78c(0x215)]['setup'](_0x498a0e,_0x6cc78c(0x23c));},Sprite_Battler[_0x23dad6(0x179)]['updateAtbGaugeSpriteVisibility']=function(){const _0x10264c=_0x23dad6;if(!this['_atbGaugeSprite'])return;const _0x2cf387=this[_0x10264c(0x1d8)]&&this[_0x10264c(0x1d8)][_0x10264c(0x155)]()&&!this[_0x10264c(0x1d8)]['isHidden']();this[_0x10264c(0x215)]['visible']=_0x2cf387,this[_0x10264c(0x1ee)]&&this[_0x10264c(0x1ee)][_0x10264c(0x215)]&&(this[_0x10264c(0x1ee)][_0x10264c(0x215)]['visible']=_0x2cf387);},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x296)]=Sprite_Battler[_0x23dad6(0x179)][_0x23dad6(0x2ed)],Sprite_Battler[_0x23dad6(0x179)]['updateMain']=function(){const _0x528244=_0x23dad6;VisuMZ[_0x528244(0x1c5)]['Sprite_Battler_updateMain'][_0x528244(0x185)](this),this['updateAtbGaugeSpritePosition']();},Sprite_Battler['prototype'][_0x23dad6(0x1ba)]=function(){const _0x5efd70=_0x23dad6;if(!this[_0x5efd70(0x1d8)])return;if(!this[_0x5efd70(0x215)])return;const _0x2c7c79=VisuMZ['BattleSystemATB'][_0x5efd70(0x295)][_0x5efd70(0x2fb)],_0x2efe7a=this[_0x5efd70(0x215)];let _0x57f49b=_0x2c7c79[_0x5efd70(0x1a1)];this[_0x5efd70(0x1d8)][_0x5efd70(0x257)]&&(_0x57f49b+=this['_battler'][_0x5efd70(0x257)]());let _0x24600d=_0x2c7c79[_0x5efd70(0x14c)];this[_0x5efd70(0x1d8)][_0x5efd70(0x15e)]&&(_0x24600d+=this['_battler'][_0x5efd70(0x15e)]());_0x2efe7a['x']=_0x57f49b,_0x2efe7a['y']=-this[_0x5efd70(0x1c4)]+_0x24600d;this['_battler'][_0x5efd70(0x20d)]()&&(this[_0x5efd70(0x1d8)][_0x5efd70(0x228)]()['note'][_0x5efd70(0x260)](/<HIDE (?:ATB|TPB) GAUGE>/i)&&(_0x2efe7a[_0x5efd70(0x2a5)]=![]));this['checkAggroControlSystemOffsetYAdjustment']()&&(_0x2efe7a['y']+=_0x2efe7a['gaugeHeight']()*_0x2c7c79['Scale']-0x1);if(this[_0x5efd70(0x183)]['x']<0x0){if(_0x5efd70(0x181)!==_0x5efd70(0x1b6))_0x2efe7a[_0x5efd70(0x183)]['x']=-Math['abs'](_0x2efe7a[_0x5efd70(0x183)]['x']);else return![];}},Sprite_Battler[_0x23dad6(0x179)][_0x23dad6(0x170)]=function(){const _0x5b9bd4=_0x23dad6;if(!Imported[_0x5b9bd4(0x292)])return![];if(this[_0x5b9bd4(0x1d8)]&&this[_0x5b9bd4(0x1d8)][_0x5b9bd4(0x20d)]())return![];const _0x15125a=VisuMZ[_0x5b9bd4(0x2c8)]['Settings'][_0x5b9bd4(0x16e)];if(!_0x15125a[_0x5b9bd4(0x184)])return![];if(!ConfigManager[_0x5b9bd4(0x1d6)])return![];const _0x5119e1=VisuMZ[_0x5b9bd4(0x1c5)]['Settings'][_0x5b9bd4(0x2fb)];return _0x15125a[_0x5b9bd4(0x1d2)]===_0x5119e1[_0x5b9bd4(0x1d2)]&&_0x15125a[_0x5b9bd4(0x2f7)]===_0x5119e1[_0x5b9bd4(0x2f7)]&&_0x15125a[_0x5b9bd4(0x2f0)]===_0x5119e1['AnchorY']&&_0x15125a[_0x5b9bd4(0x1a1)]===_0x5119e1[_0x5b9bd4(0x1a1)]&&_0x15125a[_0x5b9bd4(0x14c)]===_0x5119e1[_0x5b9bd4(0x14c)]&&!![];},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x134)]=Sprite_Battler[_0x23dad6(0x179)][_0x23dad6(0x1f6)],Sprite_Battler[_0x23dad6(0x179)]['update']=function(){const _0x521c03=_0x23dad6;VisuMZ[_0x521c03(0x1c5)]['Sprite_Battler_update']['call'](this);if(!this[_0x521c03(0x1d8)]&&this[_0x521c03(0x215)]){this[_0x521c03(0x215)][_0x521c03(0x2a5)]=![];if(this[_0x521c03(0x1ee)]){if(_0x521c03(0x1ef)!==_0x521c03(0x1ef))return!this[_0x521c03(0x2ce)]();else this[_0x521c03(0x1ee)]['_atbGaugeSprite']['visible']=![];}}},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x1e5)]=Sprite_Actor['prototype']['createStateSprite'],Sprite_Actor[_0x23dad6(0x179)][_0x23dad6(0x2d8)]=function(){const _0x4332f4=_0x23dad6;VisuMZ[_0x4332f4(0x1c5)][_0x4332f4(0x1e5)][_0x4332f4(0x185)](this);if(VisuMZ[_0x4332f4(0x1c5)][_0x4332f4(0x295)][_0x4332f4(0x2fb)]['ShowActorGauge']){if(_0x4332f4(0x2fc)!=='KFDhc')this[_0x4332f4(0x1d7)]();else{if(!_0x1506f5[_0x4332f4(0x203)]())return;if(!_0x31315f[_0x4332f4(0x22b)]())return;if(this[_0x4332f4(0x2b0)]())this['applyItemBattleSystemATBUserEffect'](_0x100b45);}}},VisuMZ[_0x23dad6(0x1c5)]['Sprite_Enemy_createStateIconSprite']=Sprite_Enemy['prototype'][_0x23dad6(0x2ab)],Sprite_Enemy[_0x23dad6(0x179)]['createStateIconSprite']=function(){const _0x2aa600=_0x23dad6;VisuMZ[_0x2aa600(0x1c5)][_0x2aa600(0x295)][_0x2aa600(0x2fb)][_0x2aa600(0x11b)]&&this[_0x2aa600(0x1d7)](),VisuMZ[_0x2aa600(0x1c5)][_0x2aa600(0x1f0)]['call'](this);},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x320)]=Sprite_Enemy['prototype']['startEffect'],Sprite_Enemy[_0x23dad6(0x179)]['startEffect']=function(_0xb447d1){const _0x4bcaf0=_0x23dad6;VisuMZ[_0x4bcaf0(0x1c5)][_0x4bcaf0(0x320)]['call'](this,_0xb447d1),(_0xb447d1===_0x4bcaf0(0x2f3)||'disappear')&&this['updateAtbGaugeSpriteVisibility']();},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x2db)]=Game_BattlerBase[_0x23dad6(0x179)][_0x23dad6(0x2f3)],Game_BattlerBase['prototype'][_0x23dad6(0x2f3)]=function(){const _0x8f5b2d=_0x23dad6;VisuMZ[_0x8f5b2d(0x1c5)][_0x8f5b2d(0x2db)][_0x8f5b2d(0x185)](this),this['isEnemy']()&&BattleManager[_0x8f5b2d(0x22b)]()&&this['battler']()&&(this[_0x8f5b2d(0x270)]()[_0x8f5b2d(0x26e)]=!![],this[_0x8f5b2d(0x270)]()[_0x8f5b2d(0x268)]());},VisuMZ[_0x23dad6(0x1c5)]['Sprite_Gauge_gaugeColor1']=Sprite_Gauge[_0x23dad6(0x179)][_0x23dad6(0x1dc)],Sprite_Gauge[_0x23dad6(0x179)]['gaugeColor1']=function(){const _0x12bb82=_0x23dad6;if(this[_0x12bb82(0x30f)]===_0x12bb82(0x23c))return this['atbGaugeColor'](0x1);return VisuMZ[_0x12bb82(0x1c5)][_0x12bb82(0x2f5)]['call'](this);},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x238)]=Sprite_Gauge['prototype'][_0x23dad6(0x28d)],Sprite_Gauge['prototype']['gaugeColor2']=function(){const _0x272312=_0x23dad6;if(this[_0x272312(0x30f)]===_0x272312(0x23c))return this[_0x272312(0x2f8)](0x2);return VisuMZ[_0x272312(0x1c5)]['Sprite_Gauge_gaugeColor2']['call'](this);},Sprite_Gauge[_0x23dad6(0x179)][_0x23dad6(0x2f8)]=function(_0x6f5d96){const _0x534638=_0x23dad6;if(!this[_0x534638(0x1d8)])return ColorManager[_0x534638(0x116)](_0x534638(0x1d1)[_0x534638(0x19b)](_0x6f5d96));if(this[_0x534638(0x1d8)][_0x534638(0x2a0)]())return ColorManager[_0x534638(0x116)](_0x534638(0x297)[_0x534638(0x19b)](_0x6f5d96));if(this['_battler'][_0x534638(0x154)]())return ColorManager[_0x534638(0x116)]('cast%1'[_0x534638(0x19b)](_0x6f5d96));if(this[_0x534638(0x18f)]()>=0x1)return ColorManager['atbColor'](_0x534638(0x328)['format'](_0x6f5d96));const _0xb979c0=VisuMZ[_0x534638(0x1c5)]['Settings']['Gauge'],_0x390abf=this[_0x534638(0x1d8)]['paramRate'](0x6)*this['_battler'][_0x534638(0x2aa)](0x6);if(_0x390abf<=_0xb979c0['SlowRate'])return ColorManager[_0x534638(0x116)](_0x534638(0x2b7)['format'](_0x6f5d96));if(_0x390abf>=_0xb979c0['FastRate'])return ColorManager[_0x534638(0x116)](_0x534638(0x1ab)['format'](_0x6f5d96));return ColorManager[_0x534638(0x116)](_0x534638(0x1d1)[_0x534638(0x19b)](_0x6f5d96));},VisuMZ[_0x23dad6(0x1c5)]['Sprite_Gauge_currentValue']=Sprite_Gauge['prototype']['currentValue'],Sprite_Gauge['prototype'][_0x23dad6(0x2fd)]=function(){const _0x1b8130=_0x23dad6;if(this[_0x1b8130(0x1d8)]&&this[_0x1b8130(0x30f)]===_0x1b8130(0x23c))return this['atbCurrentValue']();return VisuMZ[_0x1b8130(0x1c5)]['Sprite_Gauge_currentValue']['call'](this);},Sprite_Gauge[_0x23dad6(0x179)][_0x23dad6(0x19d)]=function(){const _0x1d84c0=_0x23dad6;return this[_0x1d84c0(0x1d8)][_0x1d84c0(0x154)]()?_0x1d84c0(0x1a8)===_0x1d84c0(0x1ff)?_0x1da841[_0x1d84c0(0x1c5)][_0x1d84c0(0x17d)][_0x1d84c0(0x185)](this):Math[_0x1d84c0(0x27c)](this[_0x1d84c0(0x1d8)]['_tpbCastTime'],0x0):VisuMZ[_0x1d84c0(0x1c5)][_0x1d84c0(0x24a)][_0x1d84c0(0x185)](this);},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x17d)]=Sprite_Gauge[_0x23dad6(0x179)][_0x23dad6(0x227)],Sprite_Gauge['prototype'][_0x23dad6(0x227)]=function(){const _0x286d11=_0x23dad6;if(this[_0x286d11(0x1d8)]&&this[_0x286d11(0x30f)]==='time')return this[_0x286d11(0x19c)]();return VisuMZ[_0x286d11(0x1c5)][_0x286d11(0x17d)]['call'](this);},Sprite_Gauge[_0x23dad6(0x179)]['atbCurrentMaxValue']=function(){const _0x23ebe1=_0x23dad6;if(this[_0x23ebe1(0x1d8)][_0x23ebe1(0x154)]())return Math[_0x23ebe1(0x27c)](this[_0x23ebe1(0x1d8)][_0x23ebe1(0x167)](),0x1);else{if(_0x23ebe1(0x123)!==_0x23ebe1(0x123))this[_0x23ebe1(0x129)](_0x9188f(_0x341304['$1']));else return VisuMZ['BattleSystemATB'][_0x23ebe1(0x17d)][_0x23ebe1(0x185)](this);}},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x267)]=Window_Help[_0x23dad6(0x179)][_0x23dad6(0x308)],Window_Help[_0x23dad6(0x179)][_0x23dad6(0x308)]=function(_0x4b3b92){const _0x45b6e0=_0x23dad6;BattleManager[_0x45b6e0(0x22b)]()&&_0x4b3b92&&_0x4b3b92[_0x45b6e0(0x276)]&&_0x4b3b92['note'][_0x45b6e0(0x260)](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)?this[_0x45b6e0(0x129)](String(RegExp['$1'])):VisuMZ[_0x45b6e0(0x1c5)][_0x45b6e0(0x267)]['call'](this,_0x4b3b92);},VisuMZ[_0x23dad6(0x1c5)]['Window_StatusBase_placeGauge']=Window_StatusBase[_0x23dad6(0x179)][_0x23dad6(0x1e3)],Window_StatusBase[_0x23dad6(0x179)][_0x23dad6(0x1e3)]=function(_0x4551a3,_0x3ce41b,_0x1053d5,_0x1657da){const _0x16e573=_0x23dad6;if(!this[_0x16e573(0x197)](_0x3ce41b))return;VisuMZ[_0x16e573(0x1c5)][_0x16e573(0x15c)][_0x16e573(0x185)](this,_0x4551a3,_0x3ce41b,_0x1053d5,_0x1657da);},Window_StatusBase[_0x23dad6(0x179)]['showVisualAtbGauge']=function(_0x14837f){const _0x1b46c8=_0x23dad6;if(_0x14837f!=='time')return!![];if(![_0x1b46c8(0x32c),_0x1b46c8(0x1ca)][_0x1b46c8(0x1e7)](this['constructor'][_0x1b46c8(0x138)]))return![];if(!BattleManager[_0x1b46c8(0x22b)]())return![];if(!ConfigManager[_0x1b46c8(0x189)])return![];return VisuMZ['BattleSystemATB']['Settings']['Gauge'][_0x1b46c8(0x1c8)];},VisuMZ['BattleSystemATB']['Window_Options_addGeneralOptions']=Window_Options[_0x23dad6(0x179)]['addGeneralOptions'],Window_Options[_0x23dad6(0x179)][_0x23dad6(0x248)]=function(){const _0x37e87e=_0x23dad6;VisuMZ[_0x37e87e(0x1c5)]['Window_Options_addGeneralOptions'][_0x37e87e(0x185)](this),this[_0x37e87e(0x27b)]();},Window_Options[_0x23dad6(0x179)][_0x23dad6(0x27b)]=function(){const _0x346925=_0x23dad6;if(!BattleManager[_0x346925(0x22b)]())return;VisuMZ[_0x346925(0x1c5)][_0x346925(0x295)][_0x346925(0x272)]['AddOption']&&this['addBattleSystemATBShowGaugeCommand']();},Window_Options[_0x23dad6(0x179)][_0x23dad6(0x24f)]=function(){const _0x16882c=_0x23dad6,_0x9f2b4c=TextManager[_0x16882c(0x189)],_0xba600e=_0x16882c(0x189);this['addCommand'](_0x9f2b4c,_0xba600e);},Game_BattlerBase[_0x23dad6(0x179)]['clearFieldAtbGraphics']=function(){const _0x131f68=_0x23dad6;delete this[_0x131f68(0x258)],delete this[_0x131f68(0x1fe)],delete this[_0x131f68(0x1cd)],delete this['_fieldAtbGaugeIconIndex'];},Game_BattlerBase[_0x23dad6(0x179)][_0x23dad6(0x142)]=function(){const _0x2ac08d=_0x23dad6;return this['_fieldAtbGaugeGraphicType']===undefined&&(_0x2ac08d(0x13a)!=='HXcoB'?this['_tpbChargeTime']=_0x4dc6ea[_0x2ac08d(0x21a)](0x0,0x1):this[_0x2ac08d(0x258)]=this[_0x2ac08d(0x1d3)]()),this[_0x2ac08d(0x258)];},Game_BattlerBase[_0x23dad6(0x179)]['createFieldAtbGraphicType']=function(){const _0x32e454=_0x23dad6;return Sprite_FieldGaugeATB[_0x32e454(0x295)][_0x32e454(0x2d6)];},Game_BattlerBase[_0x23dad6(0x179)][_0x23dad6(0x2f2)]=function(){const _0x1f2bcf=_0x23dad6;return this[_0x1f2bcf(0x1fe)]===undefined&&(this[_0x1f2bcf(0x1fe)]=this[_0x1f2bcf(0x198)]()),this['_fieldAtbGaugeFaceName'];},Game_BattlerBase[_0x23dad6(0x179)][_0x23dad6(0x198)]=function(){const _0x4d8049=_0x23dad6;return Sprite_FieldGaugeATB[_0x4d8049(0x295)]['EnemyBattlerFaceName'];},Game_BattlerBase[_0x23dad6(0x179)][_0x23dad6(0x1cb)]=function(){const _0x59a5f6=_0x23dad6;return this[_0x59a5f6(0x1cd)]===undefined&&(this[_0x59a5f6(0x1cd)]=this[_0x59a5f6(0x23f)]()),this['_fieldAtbGaugeFaceIndex'];},Game_BattlerBase[_0x23dad6(0x179)]['createFieldAtbGraphicFaceIndex']=function(){const _0xb734b3=_0x23dad6;return Sprite_FieldGaugeATB['Settings'][_0xb734b3(0x2d4)];},Game_BattlerBase[_0x23dad6(0x179)][_0x23dad6(0x200)]=function(){const _0x2df5ff=_0x23dad6;if(this[_0x2df5ff(0x2b8)]===undefined){if(_0x2df5ff(0x25e)!==_0x2df5ff(0x25e)){const _0x439397=this[_0x2df5ff(0x167)]();this[_0x2df5ff(0x229)]=(_0x439397*_0x3afe42)['clamp'](0x0,_0x439397);}else this['_fieldAtbGaugeIconIndex']=this[_0x2df5ff(0x209)]();}return this[_0x2df5ff(0x2b8)];},Game_BattlerBase[_0x23dad6(0x179)][_0x23dad6(0x209)]=function(){const _0xd9c756=_0x23dad6;return Sprite_FieldGaugeATB['Settings'][_0xd9c756(0x141)];},Game_BattlerBase['prototype'][_0x23dad6(0x287)]=function(_0x5569a8){const _0x5282c5=_0x23dad6;this[_0x5282c5(0x2b8)]=_0x5569a8;},Game_Actor[_0x23dad6(0x179)]['createFieldAtbGraphicType']=function(){const _0x2b6c78=_0x23dad6,_0x140958=this[_0x2b6c78(0x291)]()['note'];if(_0x140958[_0x2b6c78(0x260)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x2b6c78(0x166)===_0x2b6c78(0x166))return _0x2b6c78(0x207);else for(let _0x2f0e69=0x1;_0x2f0e69<=0x2;_0x2f0e69++){const _0x3afd9c=_0x30e111+_0x2f0e69;this[_0x2b6c78(0x182)][_0x3afd9c]=this['getColor'](_0x15ff5a[_0x3afd9c]);}}else{if(_0x140958[_0x2b6c78(0x260)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x2b6c78(0x2a3);}return Sprite_FieldGaugeATB[_0x2b6c78(0x295)][_0x2b6c78(0x1f3)];},Game_Actor[_0x23dad6(0x179)][_0x23dad6(0x198)]=function(){const _0x37d330=_0x23dad6,_0x2ed5ac=this[_0x37d330(0x291)]()[_0x37d330(0x276)];if(_0x2ed5ac[_0x37d330(0x260)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x37d330(0x190)==='QjIJO')return String(RegExp['$1']);else _0x45e0e9[_0x37d330(0x2b2)]=_0x2bd43e['loadSystem'](_0x6036fe[_0x354478]);}return this[_0x37d330(0x314)]();},Game_Actor[_0x23dad6(0x179)][_0x23dad6(0x23f)]=function(){const _0x1610dd=_0x23dad6,_0x340f73=this[_0x1610dd(0x291)]()['note'];if(_0x340f73[_0x1610dd(0x260)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if('hsQaj'!==_0x1610dd(0x24d))return Number(RegExp['$2']);else _0x3fac86=_0x566aad-0x1,_0x35cd81=_0x264e63-0x3-_0x3a551b,_0x22d450[_0x1610dd(0x2b4)](0x2+_0x4fc6af,0x1,_0x548c37,_0x3517cb-0x2,_0x4ae97b,_0x34b388,![]),_0x5f3d26['gradientFillRect'](0x1,0x1,_0x173f8a,_0x2de157-0x2,_0x48ece3,_0x3bde29,![]);}return this[_0x1610dd(0x26d)]();},Game_Actor[_0x23dad6(0x179)][_0x23dad6(0x209)]=function(){const _0x18ca44=_0x23dad6,_0x45731f=this[_0x18ca44(0x291)]()[_0x18ca44(0x276)];if(_0x45731f[_0x18ca44(0x260)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i)){if(_0x18ca44(0x1ce)==='USJhE'){if(!_0x4f90ed[_0x18ca44(0x22b)]())return;_0xe52fb8[_0x18ca44(0x1c5)][_0x18ca44(0x295)][_0x18ca44(0x272)][_0x18ca44(0x264)]&&this[_0x18ca44(0x24f)]();}else return Number(RegExp['$1']);}return Sprite_FieldGaugeATB['Settings']['ActorBattlerIcon'];},Game_Enemy[_0x23dad6(0x179)][_0x23dad6(0x1d3)]=function(){const _0x9354a5=_0x23dad6,_0xb7cdad=this[_0x9354a5(0x228)]()[_0x9354a5(0x276)];if(_0xb7cdad['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x9354a5(0x207);else{if(_0xb7cdad[_0x9354a5(0x260)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x9354a5(0x2a3);}return Sprite_FieldGaugeATB[_0x9354a5(0x295)][_0x9354a5(0x2d6)];},Game_Enemy[_0x23dad6(0x179)][_0x23dad6(0x198)]=function(){const _0x517d27=_0x23dad6,_0x3bae23=this[_0x517d27(0x228)]()['note'];if(_0x3bae23[_0x517d27(0x260)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Sprite_FieldGaugeATB['Settings'][_0x517d27(0x230)];},Game_Enemy['prototype'][_0x23dad6(0x23f)]=function(){const _0x187433=_0x23dad6,_0x5cda95=this['enemy']()[_0x187433(0x276)];if(_0x5cda95[_0x187433(0x260)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Sprite_FieldGaugeATB[_0x187433(0x295)][_0x187433(0x2d4)];},Game_Enemy['prototype'][_0x23dad6(0x209)]=function(){const _0xd22e86=_0x23dad6,_0x48ff8a=this[_0xd22e86(0x228)]()[_0xd22e86(0x276)];if(_0x48ff8a[_0xd22e86(0x260)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB['Settings'][_0xd22e86(0x141)];},VisuMZ[_0x23dad6(0x1c5)][_0x23dad6(0x29e)]=Scene_Battle[_0x23dad6(0x179)]['createAllWindows'],Scene_Battle[_0x23dad6(0x179)][_0x23dad6(0x301)]=function(){const _0xcc9e21=_0x23dad6;this[_0xcc9e21(0x2ee)](),VisuMZ[_0xcc9e21(0x1c5)][_0xcc9e21(0x29e)]['call'](this),this['createFieldGaugeSpriteATB']();},Scene_Battle['prototype'][_0x23dad6(0x2ee)]=function(){const _0x260c7e=_0x23dad6;if(!BattleManager['isATB']())return;if(!Sprite_FieldGaugeATB['Settings'][_0x260c7e(0x1dd)])return;if(!ConfigManager['visualAtbGauge'])return;this['_fieldGaugeATB_Container']=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0x37144f=this[_0x260c7e(0x2c6)](this['_windowLayer']);this[_0x260c7e(0x1f7)](this[_0x260c7e(0x2a7)],_0x37144f);},Scene_Battle[_0x23dad6(0x179)][_0x23dad6(0x130)]=function(){const _0xde8154=_0x23dad6;if(!BattleManager[_0xde8154(0x22b)]())return;if(!Sprite_FieldGaugeATB[_0xde8154(0x295)][_0xde8154(0x1dd)])return;if(!ConfigManager[_0xde8154(0x189)])return;this[_0xde8154(0x2b1)]=new Sprite_FieldGaugeATB(),this[_0xde8154(0x2a7)][_0xde8154(0x17e)](this['_fieldGaugeATB']);};function Sprite_FieldGaugeATB(){const _0x1bbc9d=_0x23dad6;this[_0x1bbc9d(0x223)](...arguments);}Sprite_FieldGaugeATB[_0x23dad6(0x179)]=Object['create'](Sprite[_0x23dad6(0x179)]),Sprite_FieldGaugeATB[_0x23dad6(0x179)][_0x23dad6(0x274)]=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB[_0x23dad6(0x295)]=JsonEx['makeDeepCopy'](VisuMZ[_0x23dad6(0x1c5)]['Settings']['FieldGauge']),Sprite_FieldGaugeATB[_0x23dad6(0x179)][_0x23dad6(0x223)]=function(){const _0x4a1f78=_0x23dad6;Sprite[_0x4a1f78(0x179)]['initialize'][_0x4a1f78(0x185)](this),this[_0x4a1f78(0x1c9)](),this[_0x4a1f78(0x2cd)](),this['createChildren']();},Sprite_FieldGaugeATB[_0x23dad6(0x179)][_0x23dad6(0x1c9)]=function(){const _0x45396a=_0x23dad6;this[_0x45396a(0x1b5)]['x']=0.5,this[_0x45396a(0x1b5)]['y']=0.5;},Sprite_FieldGaugeATB['prototype']['isGaugeHorizontal']=function(){const _0x3a7763=_0x23dad6;if(this['_horz']!==undefined)return this[_0x3a7763(0x20b)];const _0x5eba0f=Sprite_FieldGaugeATB[_0x3a7763(0x295)][_0x3a7763(0x28a)];return this[_0x3a7763(0x20b)]=[_0x3a7763(0x195),_0x3a7763(0x307)][_0x3a7763(0x1e7)](_0x5eba0f),this[_0x3a7763(0x20b)];},Sprite_FieldGaugeATB[_0x23dad6(0x179)]['setHomeLocation']=function(){const _0x2266df=_0x23dad6,_0x44a3b5=Sprite_FieldGaugeATB[_0x2266df(0x295)][_0x2266df(0x28a)]['toLowerCase']()[_0x2266df(0x25d)](),_0x2e94df=Window_Base['prototype'][_0x2266df(0x263)](),_0x16875a=SceneManager['_scene'][_0x2266df(0x1c3)]['height']+Math['round'](_0x2e94df*0.5);this['_homeX']=0x0,this[_0x2266df(0x30a)]=0x0;switch(_0x44a3b5){case _0x2266df(0x195):this[_0x2266df(0x1ae)]=Math[_0x2266df(0x22d)](Graphics[_0x2266df(0x26f)]*0.5),this[_0x2266df(0x30a)]=0x60;break;case _0x2266df(0x307):this[_0x2266df(0x1ae)]=Math['round'](Graphics[_0x2266df(0x26f)]*0.5),this['_homeY']=Graphics[_0x2266df(0x18b)]-_0x16875a;break;case'left':this['_homeX']=0x50,this[_0x2266df(0x30a)]=Math[_0x2266df(0x22d)]((Graphics[_0x2266df(0x18b)]-_0x16875a)/0x2);break;case _0x2266df(0x237):this['_homeX']=Graphics[_0x2266df(0x26f)]-0x50,this[_0x2266df(0x30a)]=Math[_0x2266df(0x22d)]((Graphics[_0x2266df(0x18b)]-_0x16875a)/0x2);break;}this[_0x2266df(0x1ae)]+=Sprite_FieldGaugeATB[_0x2266df(0x295)]['DisplayOffsetX']||0x0,this[_0x2266df(0x30a)]+=Sprite_FieldGaugeATB['Settings']['DisplayOffsetY']||0x0,this['x']=this[_0x2266df(0x1ae)],this['y']=this[_0x2266df(0x30a)];},Sprite_FieldGaugeATB[_0x23dad6(0x179)][_0x23dad6(0x323)]=function(){const _0x39dfb7=_0x23dad6;this[_0x39dfb7(0x145)](),this['createGaugeSprite'](),this[_0x39dfb7(0x11e)]();},Sprite_FieldGaugeATB[_0x23dad6(0x179)][_0x23dad6(0x145)]=function(){const _0x1116bd=_0x23dad6;this[_0x1116bd(0x321)]=new Sprite(),this[_0x1116bd(0x321)]['anchor']['x']=0.5,this['_skinSprite']['anchor']['y']=0.5,this[_0x1116bd(0x17e)](this[_0x1116bd(0x321)]);const _0xc8109b=Sprite_FieldGaugeATB[_0x1116bd(0x295)][_0x1116bd(0x11a)];if(_0xc8109b)this[_0x1116bd(0x321)][_0x1116bd(0x2b2)]=ImageManager[_0x1116bd(0x245)](_0xc8109b);},Sprite_FieldGaugeATB['prototype'][_0x23dad6(0x21f)]=function(){const _0x43be92=_0x23dad6;this['_gaugeSprite']=new Sprite(),this[_0x43be92(0x17e)](this['_gaugeSprite']),this['createGaugeBitmap']();},Sprite_FieldGaugeATB[_0x23dad6(0x179)][_0x23dad6(0x11c)]=function(){const _0x5133a4=_0x23dad6,_0x20ad68=Sprite_FieldGaugeATB[_0x5133a4(0x295)],_0x22fb0b=this['isGaugeHorizontal'](),_0x56d5d4=_0x22fb0b?_0x20ad68[_0x5133a4(0x1b1)]:_0x20ad68['GaugeThick'],_0x3b1bec=_0x22fb0b?_0x20ad68['GaugeThick']:_0x20ad68[_0x5133a4(0x14f)];this[_0x5133a4(0x1b8)][_0x5133a4(0x2b2)]=new Bitmap(_0x56d5d4,_0x3b1bec),this['drawGaugeBitmap'](),this[_0x5133a4(0x1b8)]['x']=Math[_0x5133a4(0x2e0)](_0x56d5d4/-0x2),this[_0x5133a4(0x1b8)]['y']=Math[_0x5133a4(0x2e0)](_0x3b1bec/-0x2);},Sprite_FieldGaugeATB[_0x23dad6(0x179)]['drawGaugeBitmap']=function(){const _0x17c39b=_0x23dad6;if(!Sprite_FieldGaugeATB[_0x17c39b(0x295)][_0x17c39b(0x29f)])return;const _0x5a37b2=Sprite_FieldGaugeATB['Settings'],_0x449ced=this[_0x17c39b(0x1b8)]['bitmap'],_0x4537cc=_0x449ced[_0x17c39b(0x206)],_0x44983c=_0x449ced[_0x17c39b(0x1c4)],_0x31d0b5=ColorManager[_0x17c39b(0x12d)](),_0x454641=ColorManager['ctGaugeColor1'](),_0x1a16d6=ColorManager[_0x17c39b(0x32b)](),_0x10725e=ColorManager['atbColor'](_0x17c39b(0x1e4)),_0x5a3a79=ColorManager[_0x17c39b(0x116)](_0x17c39b(0x149)),_0x2d0743=this[_0x17c39b(0x251)](),_0x342a9e=_0x5a37b2[_0x17c39b(0x18c)],_0x4bb240=_0x5a37b2[_0x17c39b(0x303)][_0x17c39b(0x21a)](0x0,0x1),_0x155efe=Math['ceil'](((_0x2d0743?_0x4537cc:_0x44983c)-0x2)*_0x4bb240);_0x449ced[_0x17c39b(0x199)](0x0,0x0,_0x4537cc,_0x44983c,_0x31d0b5);let _0x4f6050=0x0,_0x5a1a41=0x0,_0x544cf6=0x0,_0x48f1ca=0x0;if(_0x2d0743&&_0x342a9e)_0x17c39b(0x27a)===_0x17c39b(0x27a)?(_0x4f6050=_0x155efe-0x1,_0x544cf6=_0x4537cc-0x3-_0x4f6050,_0x449ced[_0x17c39b(0x2b4)](0x1,0x1,_0x4f6050,_0x44983c-0x2,_0x454641,_0x1a16d6,![]),_0x449ced[_0x17c39b(0x2b4)](0x2+_0x4f6050,0x1,_0x544cf6,_0x44983c-0x2,_0x10725e,_0x5a3a79,![])):(this[_0x17c39b(0x1b8)]=new _0x1b11c6(),this['addChild'](this['_gaugeSprite']),this['createGaugeBitmap']());else{if(_0x2d0743&&!_0x342a9e)_0x4f6050=_0x155efe-0x1,_0x544cf6=_0x4537cc-0x3-_0x4f6050,_0x449ced[_0x17c39b(0x2b4)](0x2+_0x544cf6,0x1,_0x4f6050,_0x44983c-0x2,_0x454641,_0x1a16d6,![]),_0x449ced[_0x17c39b(0x2b4)](0x1,0x1,_0x544cf6,_0x44983c-0x2,_0x10725e,_0x5a3a79,![]);else{if(!_0x2d0743&&_0x342a9e)_0x5a1a41=_0x155efe-0x1,_0x48f1ca=_0x44983c-0x3-_0x5a1a41,_0x449ced['gradientFillRect'](0x1,0x1,_0x4537cc-0x2,_0x5a1a41,_0x454641,_0x1a16d6,!![]),_0x449ced[_0x17c39b(0x2b4)](0x1,0x2+_0x5a1a41,_0x4537cc-0x2,_0x48f1ca,_0x10725e,_0x5a3a79,!![]);else{if(!_0x2d0743&&!_0x342a9e){if(_0x17c39b(0x254)!==_0x17c39b(0x254))return this[_0x17c39b(0x158)]();else _0x5a1a41=_0x155efe-0x1,_0x48f1ca=_0x44983c-0x3-_0x5a1a41,_0x449ced['gradientFillRect'](0x1,0x2+_0x48f1ca,_0x4537cc-0x2,_0x5a1a41,_0x454641,_0x1a16d6,!![]),_0x449ced['gradientFillRect'](0x1,0x1,_0x4537cc-0x2,_0x48f1ca,_0x10725e,_0x5a3a79,!![]);}}}}},Sprite_FieldGaugeATB[_0x23dad6(0x179)][_0x23dad6(0x11e)]=function(){const _0x414e8f=_0x23dad6;this['_battlerContainer']&&this[_0x414e8f(0x1b8)][_0x414e8f(0x2ac)](this[_0x414e8f(0x178)]),this[_0x414e8f(0x178)]=new Sprite(),this['_gaugeSprite']['addChild'](this[_0x414e8f(0x178)]),this['createBattlerSprites']();},Sprite_FieldGaugeATB[_0x23dad6(0x179)]['createBattlerSprites']=function(){const _0x78c227=_0x23dad6;this[_0x78c227(0x205)](),this['createActorSprites']();},Sprite_FieldGaugeATB[_0x23dad6(0x179)]['createEnemySprites']=function(){const _0x2a0181=_0x23dad6,_0x58de6f=$gameTroop[_0x2a0181(0x18d)](),_0x2a2252=_0x58de6f['length'];for(let _0xa7cc9c=0x0;_0xa7cc9c<_0x2a2252;_0xa7cc9c++){this[_0x2a0181(0x12c)](_0xa7cc9c,$gameTroop);}},Sprite_FieldGaugeATB[_0x23dad6(0x179)][_0x23dad6(0x13f)]=function(){const _0x4b34e5=_0x23dad6,_0x5b7685=$gameParty[_0x4b34e5(0x2d2)]();for(let _0x3d9e94=0x0;_0x3d9e94<_0x5b7685;_0x3d9e94++){this[_0x4b34e5(0x12c)](_0x3d9e94,$gameParty);}},Sprite_FieldGaugeATB[_0x23dad6(0x179)][_0x23dad6(0x12c)]=function(_0x3f5d9f,_0x17c8cf){const _0x5b9fcf=_0x23dad6,_0xd85bea=new Sprite_FieldMarkerATB(_0x3f5d9f,_0x17c8cf,this[_0x5b9fcf(0x1b8)]);this[_0x5b9fcf(0x178)][_0x5b9fcf(0x17e)](_0xd85bea);},Sprite_FieldGaugeATB[_0x23dad6(0x179)][_0x23dad6(0x1f6)]=function(){const _0x26014e=_0x23dad6;Sprite[_0x26014e(0x179)][_0x26014e(0x1f6)][_0x26014e(0x185)](this),this['updatePosition'](),this[_0x26014e(0x146)](),this['updateVisibility']();},Sprite_FieldGaugeATB['prototype']['updatePosition']=function(){const _0x7db98a=_0x23dad6,_0x589952=Sprite_FieldGaugeATB[_0x7db98a(0x295)];if(_0x589952[_0x7db98a(0x28a)]!=='top')return;if(!_0x589952['RepositionTopForHelp'])return;const _0xbc69c0=SceneManager[_0x7db98a(0x2ec)]['_helpWindow'];if(!_0xbc69c0)return;_0xbc69c0[_0x7db98a(0x2a5)]?(this['x']=this['_homeX']+(_0x589952['RepositionTopHelpX']||0x0),this['y']=this['_homeY']+(_0x589952[_0x7db98a(0x2a2)]||0x0)):(this['x']=this[_0x7db98a(0x1ae)],this['y']=this['_homeY']);const _0x158bbc=SceneManager[_0x7db98a(0x2ec)]['_windowLayer'];this['x']+=_0x158bbc['x'],this['y']+=_0x158bbc['y'];},Sprite_FieldGaugeATB['prototype'][_0x23dad6(0x146)]=function(){const _0x1d9071=_0x23dad6;if(!this[_0x1d9071(0x178)])return;const _0x5dff10=this[_0x1d9071(0x178)][_0x1d9071(0x298)];if(!_0x5dff10)return;_0x5dff10[_0x1d9071(0x1ad)](this[_0x1d9071(0x2cb)][_0x1d9071(0x26c)](this));},Sprite_FieldGaugeATB[_0x23dad6(0x179)][_0x23dad6(0x2cb)]=function(_0x17efb8,_0x5c52a1){const _0x138693=_0x23dad6,_0x13d504=this[_0x138693(0x251)](),_0x2a8158=Sprite_FieldGaugeATB['Settings'][_0x138693(0x18c)];if(_0x13d504&&_0x2a8158)return _0x17efb8['x']-_0x5c52a1['x'];else{if(_0x13d504&&!_0x2a8158){if(_0x138693(0x236)!=='kmiEX')_0xbf14c4[_0x138693(0x22b)]()&&_0x3d23e1&&_0x56bdba[_0x138693(0x276)]&&_0x12ff60[_0x138693(0x276)][_0x138693(0x260)](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)?this[_0x138693(0x129)](_0x9a5ffe(_0x8b8404['$1'])):_0x2ce5cc['BattleSystemATB'][_0x138693(0x267)][_0x138693(0x185)](this,_0x3c68b7);else return _0x5c52a1['x']-_0x17efb8['x'];}else{if(!_0x13d504&&_0x2a8158)return _0x138693(0x204)===_0x138693(0x32a)?_0x1b4332[_0x138693(0x27c)](this['_battler'][_0x138693(0x229)],0x0):_0x17efb8['y']-_0x5c52a1['y'];else{if(!_0x13d504&&!_0x2a8158)return _0x5c52a1['y']-_0x17efb8['y'];}}}},Sprite_FieldGaugeATB[_0x23dad6(0x179)][_0x23dad6(0x201)]=function(){const _0x200892=_0x23dad6;this[_0x200892(0x2a5)]=$gameSystem[_0x200892(0x1c2)]();};function Sprite_FieldMarkerATB(){this['initialize'](...arguments);}Sprite_FieldMarkerATB[_0x23dad6(0x179)]=Object['create'](Sprite_Clickable[_0x23dad6(0x179)]),Sprite_FieldMarkerATB[_0x23dad6(0x179)][_0x23dad6(0x274)]=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB['prototype'][_0x23dad6(0x223)]=function(_0x31b07f,_0xfbc916,_0x27ea45){const _0x5a7454=_0x23dad6;this['_index']=_0x31b07f,this[_0x5a7454(0x25a)]=_0xfbc916,this['_gaugeSprite']=_0x27ea45,Sprite_Clickable[_0x5a7454(0x179)]['initialize'][_0x5a7454(0x185)](this),this[_0x5a7454(0x1c9)](),this[_0x5a7454(0x323)](),this[_0x5a7454(0x1e6)]=this[_0x5a7454(0x12e)]();},Sprite_FieldMarkerATB[_0x23dad6(0x179)][_0x23dad6(0x1c9)]=function(){const _0x6e3c0c=_0x23dad6;this[_0x6e3c0c(0x1b5)]['x']=0.5,this['anchor']['y']=0.5;},Sprite_FieldMarkerATB['prototype'][_0x23dad6(0x323)]=function(){const _0x2bfb49=_0x23dad6;this[_0x2bfb49(0x163)](),this[_0x2bfb49(0x24b)](),this[_0x2bfb49(0x127)](),this[_0x2bfb49(0x139)](),this['createArrowSprite'](),this[_0x2bfb49(0x279)](!![]);},Sprite_FieldMarkerATB[_0x23dad6(0x179)][_0x23dad6(0x163)]=function(){const _0x3c3ee3=_0x23dad6;if(!Sprite_FieldGaugeATB[_0x3c3ee3(0x295)]['ShowMarkerBg'])return;const _0x3c5ac6=Sprite_FieldGaugeATB[_0x3c3ee3(0x295)],_0x4e6003=this['_unit']===$gameParty?_0x3c3ee3(0x1aa):_0x3c3ee3(0x208),_0x2f6f71=_0x3c3ee3(0x23a)[_0x3c3ee3(0x19b)](_0x4e6003),_0x95e563=new Sprite();_0x95e563[_0x3c3ee3(0x1b5)]['x']=this[_0x3c3ee3(0x1b5)]['x'],_0x95e563[_0x3c3ee3(0x1b5)]['y']=this['anchor']['y'];if(_0x3c5ac6[_0x2f6f71])_0x3c3ee3(0x2d3)!==_0x3c3ee3(0x2d7)?_0x95e563['bitmap']=ImageManager[_0x3c3ee3(0x245)](_0x3c5ac6[_0x2f6f71]):(this[_0x3c3ee3(0x1fa)]=_0x2de613[_0x3c3ee3(0x157)](),_0x254a82=_0x442882['loadSvActor'](this[_0x3c3ee3(0x1fa)]),_0x3dd0d8[_0x3c3ee3(0x1a0)](this[_0x3c3ee3(0x171)][_0x3c3ee3(0x26c)](this,_0x34a44e)));else{const _0x2bc5b4=_0x3c5ac6[_0x3c3ee3(0x2ca)];_0x95e563[_0x3c3ee3(0x2b2)]=new Bitmap(_0x2bc5b4,_0x2bc5b4);const _0x25e1a4=ColorManager['getColor'](_0x3c5ac6[_0x3c3ee3(0x31d)[_0x3c3ee3(0x19b)](_0x4e6003)]),_0x57bdf3=ColorManager[_0x3c3ee3(0x1af)](_0x3c5ac6[_0x3c3ee3(0x28e)[_0x3c3ee3(0x19b)](_0x4e6003)]);_0x95e563['bitmap']['gradientFillRect'](0x0,0x0,_0x2bc5b4,_0x2bc5b4,_0x25e1a4,_0x57bdf3,!![]);}this[_0x3c3ee3(0x159)]=_0x95e563,this[_0x3c3ee3(0x17e)](this[_0x3c3ee3(0x159)]),this[_0x3c3ee3(0x206)]=this[_0x3c3ee3(0x159)][_0x3c3ee3(0x206)],this[_0x3c3ee3(0x1c4)]=this[_0x3c3ee3(0x159)][_0x3c3ee3(0x1c4)];},Sprite_FieldMarkerATB['prototype'][_0x23dad6(0x24b)]=function(){const _0x1af791=_0x23dad6,_0xdb6700=new Sprite();_0xdb6700[_0x1af791(0x1b5)]['x']=this[_0x1af791(0x1b5)]['x'],_0xdb6700['anchor']['y']=this[_0x1af791(0x1b5)]['y'],this[_0x1af791(0x21b)]=_0xdb6700,this[_0x1af791(0x17e)](this['_graphicSprite']),this[_0x1af791(0x158)]();},Sprite_FieldMarkerATB[_0x23dad6(0x179)]['createBorderSprite']=function(){const _0x363247=_0x23dad6;if(!Sprite_FieldGaugeATB[_0x363247(0x295)][_0x363247(0x25f)])return;const _0xf86a04=Sprite_FieldGaugeATB['Settings'],_0x349cb9=this[_0x363247(0x25a)]===$gameParty?_0x363247(0x1aa):_0x363247(0x208),_0xea39e9=_0x363247(0x1b4)[_0x363247(0x19b)](_0x349cb9),_0x59d3cd=new Sprite();_0x59d3cd[_0x363247(0x1b5)]['x']=this['anchor']['x'],_0x59d3cd[_0x363247(0x1b5)]['y']=this[_0x363247(0x1b5)]['y'];if(_0xf86a04[_0xea39e9])_0x59d3cd[_0x363247(0x2b2)]=ImageManager[_0x363247(0x245)](_0xf86a04[_0xea39e9]);else{if('ivBEA'===_0x363247(0x162)){let _0x6fd5d7=_0xf86a04[_0x363247(0x2ca)],_0x541f86=_0xf86a04[_0x363247(0x249)];_0x59d3cd[_0x363247(0x2b2)]=new Bitmap(_0x6fd5d7,_0x6fd5d7);const _0x2cc932=_0x363247(0x192),_0x517d5b=ColorManager[_0x363247(0x1af)](_0xf86a04[_0x363247(0x244)[_0x363247(0x19b)](_0x349cb9)]);_0x59d3cd[_0x363247(0x2b2)][_0x363247(0x199)](0x0,0x0,_0x6fd5d7,_0x6fd5d7,_0x2cc932),_0x6fd5d7-=0x2,_0x59d3cd[_0x363247(0x2b2)]['fillRect'](0x1,0x1,_0x6fd5d7,_0x6fd5d7,_0x517d5b),_0x6fd5d7-=_0x541f86*0x2,_0x59d3cd[_0x363247(0x2b2)][_0x363247(0x199)](0x1+_0x541f86,0x1+_0x541f86,_0x6fd5d7,_0x6fd5d7,_0x2cc932),_0x6fd5d7-=0x2,_0x541f86+=0x1,_0x59d3cd[_0x363247(0x2b2)][_0x363247(0x1a7)](0x1+_0x541f86,0x1+_0x541f86,_0x6fd5d7,_0x6fd5d7);}else{const _0x27efda=_0x36ef72+_0xd45137;this[_0x363247(0x182)][_0x27efda]=this[_0x363247(0x1af)](_0x404ae8[_0x27efda]);}}this[_0x363247(0x159)]=_0x59d3cd,this['addChild'](this[_0x363247(0x159)]);},Sprite_FieldMarkerATB['prototype'][_0x23dad6(0x139)]=function(){const _0x334351=_0x23dad6,_0x2c7a06=Sprite_FieldGaugeATB[_0x334351(0x295)];if(!_0x2c7a06['EnemyBattlerDrawLetter'])return;if(this[_0x334351(0x25a)]===$gameParty)return;const _0x4655ff=_0x2c7a06[_0x334351(0x2ca)],_0x2f7ae6=new Sprite();_0x2f7ae6['anchor']['x']=this[_0x334351(0x1b5)]['x'],_0x2f7ae6[_0x334351(0x1b5)]['y']=this[_0x334351(0x1b5)]['y'],_0x2f7ae6['bitmap']=new Bitmap(_0x4655ff,_0x4655ff),this[_0x334351(0x2c5)]=_0x2f7ae6,this[_0x334351(0x17e)](this['_letterSprite']);},Sprite_FieldMarkerATB[_0x23dad6(0x179)][_0x23dad6(0x1fc)]=function(){const _0x1013b6=_0x23dad6,_0x2498f4=Sprite_FieldGaugeATB[_0x1013b6(0x295)];if(!_0x2498f4[_0x1013b6(0x144)])return;const _0x4140a4=new Sprite();_0x4140a4['anchor']['x']=this[_0x1013b6(0x1b5)]['x'],_0x4140a4[_0x1013b6(0x1b5)]['y']=this[_0x1013b6(0x1b5)]['y'],this[_0x1013b6(0x125)](_0x4140a4),this[_0x1013b6(0x2ea)]=_0x4140a4,this['addChild'](this[_0x1013b6(0x2ea)]);},Sprite_FieldMarkerATB['prototype'][_0x23dad6(0x125)]=function(_0x585dec){const _0x1dd4ff=_0x23dad6,_0x122bed=Sprite_FieldGaugeATB[_0x1dd4ff(0x295)],_0x2a83fa=_0x122bed[_0x1dd4ff(0x2ca)],_0x10ef4e=Math[_0x1dd4ff(0x22d)](_0x2a83fa/0x2),_0x6c804=this[_0x1dd4ff(0x251)](),_0x5a0868=this[_0x1dd4ff(0x25a)]===$gameParty?_0x1dd4ff(0x1aa):'Enemy',_0x2e978b=_0x122bed[_0x1dd4ff(0x13e)[_0x1dd4ff(0x19b)](_0x5a0868)];_0x585dec['bitmap']=ImageManager[_0x1dd4ff(0x245)](_0x122bed[_0x1dd4ff(0x1b9)]);const _0x39c4d3=0x18,_0x4acf9e=_0x39c4d3/0x2,_0x5e665f=0x60+_0x39c4d3,_0x936b0f=0x0+_0x39c4d3;if(_0x6c804&&_0x2e978b){if('HxcWe'!==_0x1dd4ff(0x17f))_0x585dec[_0x1dd4ff(0x1d4)](_0x5e665f+_0x4acf9e,_0x936b0f+_0x4acf9e+_0x39c4d3,_0x39c4d3,_0x4acf9e),_0x585dec['y']+=_0x10ef4e,_0x585dec['anchor']['y']=0x0;else return'icon';}else{if(_0x6c804&&!_0x2e978b)_0x1dd4ff(0x2e6)===_0x1dd4ff(0x252)?(_0x57585b[_0x1dd4ff(0x1d4)](_0x3a44b3+_0x24ddca,_0x54de09,_0x32d7f8,_0x1d2483),_0x21eccc['y']-=_0x4a556a,_0x3f4315[_0x1dd4ff(0x1b5)]['y']=0x1):(_0x585dec[_0x1dd4ff(0x1d4)](_0x5e665f+_0x4acf9e,_0x936b0f,_0x39c4d3,_0x4acf9e),_0x585dec['y']-=_0x10ef4e,_0x585dec['anchor']['y']=0x1);else{if(!_0x6c804&&_0x2e978b)_0x585dec[_0x1dd4ff(0x1d4)](_0x5e665f,_0x936b0f+_0x4acf9e,_0x4acf9e,_0x39c4d3),_0x585dec['x']-=Math[_0x1dd4ff(0x2e0)](_0x10ef4e*1.75),_0x585dec[_0x1dd4ff(0x1b5)]['x']=0x0;else!_0x6c804&&!_0x2e978b&&(_0x585dec['setFrame'](_0x5e665f+_0x39c4d3+_0x4acf9e,_0x936b0f+_0x4acf9e,_0x4acf9e,_0x39c4d3),_0x585dec['x']+=Math[_0x1dd4ff(0x2e0)](_0x10ef4e*1.75),_0x585dec[_0x1dd4ff(0x1b5)]['x']=0x1);}}},Sprite_FieldMarkerATB[_0x23dad6(0x179)]['battler']=function(){const _0x4cf124=_0x23dad6;return this['_unit']===$gameParty?$gameParty[_0x4cf124(0x187)]()[this[_0x4cf124(0x2bb)]]:$gameTroop['members']()[this[_0x4cf124(0x2bb)]];},Sprite_FieldMarkerATB['prototype']['update']=function(){const _0x211d54=_0x23dad6;Sprite_Clickable[_0x211d54(0x179)]['update'][_0x211d54(0x185)](this),this['updateOpacity'](),this[_0x211d54(0x1a4)](),this[_0x211d54(0x279)](),this[_0x211d54(0x221)](),this['updateGraphicHue'](),this['updateLetter'](),this[_0x211d54(0x27e)]();},Sprite_FieldMarkerATB['prototype']['updateOpacity']=function(){const _0x5b2e58=_0x23dad6,_0x592f60=this['targetOpacity'](),_0x9eacaa=Sprite_FieldGaugeATB[_0x5b2e58(0x295)][_0x5b2e58(0x1ed)];if(this[_0x5b2e58(0x1e6)]>_0x592f60)this[_0x5b2e58(0x1e6)]=Math['max'](_0x592f60,this[_0x5b2e58(0x1e6)]-_0x9eacaa);else this[_0x5b2e58(0x1e6)]<_0x592f60&&(_0x5b2e58(0x2bd)===_0x5b2e58(0x2e5)?this[_0x5b2e58(0x2e8)]=_0x950e44:this[_0x5b2e58(0x1e6)]=Math[_0x5b2e58(0x211)](_0x592f60,this[_0x5b2e58(0x1e6)]+_0x9eacaa));},Sprite_FieldMarkerATB[_0x23dad6(0x179)][_0x23dad6(0x12e)]=function(){const _0x26a7e3=_0x23dad6,_0x5f5919=this[_0x26a7e3(0x270)]();if(!_0x5f5919)return 0x0;if(_0x5f5919['isHidden']())return 0x0;if(_0x5f5919[_0x26a7e3(0x216)]())return 0x0;return 0xff;},Sprite_FieldMarkerATB[_0x23dad6(0x179)][_0x23dad6(0x251)]=function(){const _0x308295=_0x23dad6;if(this['_horz']!==undefined)return this[_0x308295(0x20b)];const _0x4748c1=Sprite_FieldGaugeATB[_0x308295(0x295)][_0x308295(0x28a)];return this['_horz']=[_0x308295(0x195),'bottom'][_0x308295(0x1e7)](_0x4748c1),this[_0x308295(0x20b)];},Sprite_FieldMarkerATB[_0x23dad6(0x179)][_0x23dad6(0x1a4)]=function(){const _0x5093ab=_0x23dad6,_0x1e144b=Sprite_FieldGaugeATB[_0x5093ab(0x295)],_0x104b90=this['isGaugeHorizontal'](),_0x28d8e0=this[_0x5093ab(0x25a)]===$gameParty?'Actor':_0x5093ab(0x208),_0x527a68=_0x1e144b[_0x5093ab(0x283)],_0xd29590=_0x1e144b[_0x5093ab(0x13e)[_0x5093ab(0x19b)](_0x28d8e0)];_0x104b90?(this['y']=_0x1e144b[_0x5093ab(0x120)]/0x2,this['y']+=_0xd29590?-_0x527a68:_0x527a68):(this['x']=_0x1e144b['GaugeThick']/0x2,this['x']+=_0xd29590?_0x527a68:-_0x527a68);},Sprite_FieldMarkerATB[_0x23dad6(0x179)][_0x23dad6(0x279)]=function(_0x5ae2a8){const _0x14e633=_0x23dad6,_0x529c51=this['battler']();if(!_0x529c51)return;const _0x37f38a=Sprite_FieldGaugeATB[_0x14e633(0x295)],_0x47648e=this['isGaugeHorizontal'](),_0x130354=this[_0x14e633(0x2da)](),_0x296d95=_0x5ae2a8?Infinity:_0x37f38a['MarkerSpeed'];if(_0x47648e&&this['x']!==_0x130354){if('hprMm'===_0x14e633(0x2e7)){if(this['x']>_0x130354)this['x']=Math[_0x14e633(0x27c)](_0x130354,this['x']-_0x296d95);if(this['x']<_0x130354)this['x']=Math[_0x14e633(0x211)](_0x130354,this['x']+_0x296d95);}else _0x8baafa(_0x14e633(0x30e)['format'](_0x269edc,_0x438307)),_0x5c4f94[_0x14e633(0x1ec)]();}else{if(!_0x47648e&&this['x']!==_0x130354){if(this['y']>_0x130354)this['y']=Math['max'](_0x130354,this['y']-_0x296d95);if(this['y']<_0x130354)this['y']=Math[_0x14e633(0x211)](_0x130354,this['y']+_0x296d95);}}},Sprite_FieldMarkerATB[_0x23dad6(0x179)][_0x23dad6(0x2da)]=function(){const _0x296278=_0x23dad6,_0x49f0fe=Sprite_FieldGaugeATB[_0x296278(0x295)],_0xb942eb=this[_0x296278(0x270)](),_0x1efed1=this['isGaugeHorizontal'](),_0x3292cf=this[_0x296278(0x1b8)][_0x296278(0x2b2)][_0x296278(0x206)],_0x5d86f3=this[_0x296278(0x1b8)][_0x296278(0x2b2)][_0x296278(0x1c4)],_0x42d96a=_0x49f0fe[_0x296278(0x303)]['clamp'](0x0,0x1),_0x4feba3=_0x49f0fe[_0x296278(0x18c)];let _0x2d4fb5=_0xb942eb[_0x296278(0x319)]()*_0x42d96a;_0x2d4fb5+=(0x1-_0x42d96a)*_0xb942eb['getAtbCastTimeRate']();if(_0xb942eb===BattleManager[_0x296278(0x2be)])_0x2d4fb5=0x1;if(!_0x4feba3)_0x2d4fb5=0x1-_0x2d4fb5;let _0x2dab21=0x0;if(_0x1efed1)_0x2dab21=_0x2d4fb5*_0x3292cf;else!_0x1efed1&&(_0x2dab21=_0x2d4fb5*_0x5d86f3);return Math['round'](_0x2dab21);},Sprite_FieldMarkerATB[_0x23dad6(0x179)][_0x23dad6(0x221)]=function(){const _0x531b70=_0x23dad6,_0x1af57b=this['battler']();if(!_0x1af57b)return;const _0x46d4df=Sprite_FieldGaugeATB[_0x531b70(0x295)],_0x332a9c=this[_0x531b70(0x25a)]===$gameParty?_0x531b70(0x1aa):_0x531b70(0x208);let _0x49a4c3=_0x1af57b[_0x531b70(0x142)]();if(_0x1af57b[_0x531b70(0x29b)]()&&_0x49a4c3===_0x531b70(0x228))_0x49a4c3=_0x531b70(0x207);else{if(_0x1af57b['isEnemy']()&&_0x49a4c3===_0x531b70(0x17a)){if(_0x531b70(0x2a4)===_0x531b70(0x2f1)){if(!this[_0x531b70(0x2c5)])return;const _0x1b49ad=this[_0x531b70(0x270)]();if(!_0x1b49ad)return;if(this[_0x531b70(0x2a6)]===_0x1b49ad[_0x531b70(0x2a6)]&&this['_plural']===_0x1b49ad[_0x531b70(0x1e0)])return;this[_0x531b70(0x2a6)]=_0x1b49ad['_letter'],this['_plural']=_0x1b49ad[_0x531b70(0x1e0)];const _0x56b05d=_0x317373['Settings'],_0x1e1c65=_0x56b05d[_0x531b70(0x2ca)],_0x2b8d47=_0x5ccd20[_0x531b70(0x22e)](_0x1e1c65/0x2),_0x1712a6=this[_0x531b70(0x2c5)][_0x531b70(0x2b2)];_0x1712a6['clear']();if(!this['_plural'])return;_0x1712a6['fontFace']=_0x56b05d[_0x531b70(0x1e9)]||_0x36da47[_0x531b70(0x150)](),_0x1712a6[_0x531b70(0x12f)]=_0x56b05d[_0x531b70(0x1b7)]||0x10,_0x1712a6[_0x531b70(0x153)](this[_0x531b70(0x2a6)],0x2,_0x2b8d47,_0x1e1c65-0x4,_0x2b8d47-0x2,'right');}else _0x49a4c3=_0x531b70(0x228);}}if(this[_0x531b70(0x11f)]!==_0x49a4c3){if(_0x531b70(0x217)===_0x531b70(0x136))_0x18dbad[_0x531b70(0x1c5)][_0x531b70(0x278)][_0x531b70(0x185)](this),this[_0x531b70(0x21c)]();else return this['processUpdateGraphic']();}switch(this['_graphicType']){case _0x531b70(0x207):if(this[_0x531b70(0x169)]!==_0x1af57b[_0x531b70(0x2f2)]()){if('folov'==='folov')return this[_0x531b70(0x158)]();else _0x39d3be+=this[_0x531b70(0x1d8)][_0x531b70(0x257)]();}if(this[_0x531b70(0x326)]!==_0x1af57b[_0x531b70(0x1cb)]())return this['processUpdateGraphic']();break;case _0x531b70(0x2a3):if(this[_0x531b70(0x2b6)]!==_0x1af57b['fieldAtbGraphicIconIndex']())return'OaLgc'!==_0x531b70(0x261)?_0x50eed5['x']-_0x2fb4f8['x']:this[_0x531b70(0x158)]();break;case _0x531b70(0x228):if(_0x1af57b[_0x531b70(0x285)]()){if(this[_0x531b70(0x1fa)]!==_0x1af57b[_0x531b70(0x157)]())return this[_0x531b70(0x158)]();}else{if(this[_0x531b70(0x220)]!==_0x1af57b[_0x531b70(0x262)]())return this['processUpdateGraphic']();}break;case _0x531b70(0x17a):if(_0x1af57b[_0x531b70(0x29b)]()){if(this[_0x531b70(0x1fa)]!==_0x1af57b['battlerName']())return this[_0x531b70(0x158)]();}else{if(this['_graphicEnemy']!==_0x1af57b[_0x531b70(0x262)]())return _0x531b70(0x1c7)===_0x531b70(0x1c7)?this[_0x531b70(0x158)]():_0x531b70(0x207);}break;}},Sprite_FieldMarkerATB[_0x23dad6(0x179)][_0x23dad6(0x158)]=function(){const _0x8ac696=_0x23dad6,_0x2a9b91=this[_0x8ac696(0x270)]();if(!_0x2a9b91)return;this[_0x8ac696(0x11f)]=_0x2a9b91[_0x8ac696(0x142)]();if(_0x2a9b91['isActor']()&&this[_0x8ac696(0x11f)]===_0x8ac696(0x228))this['_graphicType']=_0x8ac696(0x207);else _0x2a9b91['isEnemy']()&&this['_graphicType']==='svactor'&&(this[_0x8ac696(0x11f)]=_0x8ac696(0x228));let _0x42f909;switch(this[_0x8ac696(0x11f)]){case'face':this['_graphicFaceName']=_0x2a9b91[_0x8ac696(0x2f2)](),this[_0x8ac696(0x326)]=_0x2a9b91[_0x8ac696(0x1cb)](),_0x42f909=ImageManager[_0x8ac696(0x255)](this[_0x8ac696(0x169)]),_0x42f909[_0x8ac696(0x1a0)](this[_0x8ac696(0x12b)]['bind'](this,_0x42f909));break;case'icon':this[_0x8ac696(0x2b6)]=_0x2a9b91[_0x8ac696(0x200)](),_0x42f909=ImageManager[_0x8ac696(0x245)]('IconSet'),_0x42f909[_0x8ac696(0x1a0)](this[_0x8ac696(0x19e)][_0x8ac696(0x26c)](this,_0x42f909));break;case _0x8ac696(0x228):if(_0x2a9b91[_0x8ac696(0x285)]()){if(_0x8ac696(0x173)===_0x8ac696(0x29d)){const _0x2c055d=_0x276122[_0x8ac696(0x1c5)]['ConfigManager_makeData'][_0x8ac696(0x185)](this);return _0x2c055d['visualAtbGauge']=this[_0x8ac696(0x189)],_0x2c055d;}else this[_0x8ac696(0x1fa)]=_0x2a9b91[_0x8ac696(0x157)](),_0x42f909=ImageManager['loadSvActor'](this[_0x8ac696(0x1fa)]),_0x42f909[_0x8ac696(0x1a0)](this[_0x8ac696(0x171)]['bind'](this,_0x42f909));}else{if($gameSystem[_0x8ac696(0x188)]()){if(_0x8ac696(0x325)!==_0x8ac696(0x30d))this['_graphicEnemy']=_0x2a9b91[_0x8ac696(0x262)](),_0x42f909=ImageManager[_0x8ac696(0x12a)](this['_graphicEnemy']),_0x42f909[_0x8ac696(0x1a0)](this[_0x8ac696(0x327)]['bind'](this,_0x42f909));else return _0x3a5836[_0x8ac696(0x1c5)][_0x8ac696(0x16c)][_0x8ac696(0x185)](this);}else this[_0x8ac696(0x220)]=_0x2a9b91[_0x8ac696(0x262)](),_0x42f909=ImageManager[_0x8ac696(0x1bc)](this[_0x8ac696(0x220)]),_0x42f909[_0x8ac696(0x1a0)](this[_0x8ac696(0x327)][_0x8ac696(0x26c)](this,_0x42f909));}break;case _0x8ac696(0x17a):this[_0x8ac696(0x1fa)]=_0x2a9b91[_0x8ac696(0x262)](),_0x42f909=ImageManager[_0x8ac696(0x241)](this[_0x8ac696(0x1fa)]),_0x42f909[_0x8ac696(0x1a0)](this['changeSvActorGraphicBitmap']['bind'](this,_0x42f909));break;}},Sprite_FieldMarkerATB[_0x23dad6(0x179)][_0x23dad6(0x12b)]=function(_0xb95c4d){const _0x122521=_0x23dad6,_0x3ccda3=Sprite_FieldGaugeATB['Settings'],_0x2c162c=_0x3ccda3[_0x122521(0x2ca)],_0x2c0da4=this[_0x122521(0x326)];this[_0x122521(0x21b)]['bitmap']=new Bitmap(_0x2c162c,_0x2c162c);const _0x4de02e=this['_graphicSprite'][_0x122521(0x2b2)],_0x33f5a3=ImageManager[_0x122521(0x17c)],_0x301908=ImageManager[_0x122521(0x273)],_0x10ff8e=ImageManager[_0x122521(0x17c)],_0x435fea=ImageManager['faceHeight'],_0x41c2bc=_0x2c0da4%0x4*_0x33f5a3+(_0x33f5a3-_0x10ff8e)/0x2,_0x4542a1=Math[_0x122521(0x22e)](_0x2c0da4/0x4)*_0x301908+(_0x301908-_0x435fea)/0x2;_0x4de02e[_0x122521(0x14e)](_0xb95c4d,_0x41c2bc,_0x4542a1,_0x10ff8e,_0x435fea,0x0,0x0,_0x2c162c,_0x2c162c);},Sprite_FieldMarkerATB['prototype']['changeIconGraphicBitmap']=function(_0x410e78){const _0x3f4a14=_0x23dad6,_0x2b7620=Sprite_FieldGaugeATB[_0x3f4a14(0x295)],_0xa8a7dd=_0x2b7620[_0x3f4a14(0x2ca)],_0x2f5e5d=this[_0x3f4a14(0x2b6)];this[_0x3f4a14(0x21b)][_0x3f4a14(0x2b2)]=new Bitmap(_0xa8a7dd,_0xa8a7dd);const _0x580d36=this[_0x3f4a14(0x21b)][_0x3f4a14(0x2b2)],_0x57c674=ImageManager[_0x3f4a14(0x2d9)],_0x47a862=ImageManager[_0x3f4a14(0x18e)],_0x517013=_0x2f5e5d%0x10*_0x57c674,_0xe3559e=Math[_0x3f4a14(0x22e)](_0x2f5e5d/0x10)*_0x47a862;_0x580d36[_0x3f4a14(0x14e)](_0x410e78,_0x517013,_0xe3559e,_0x57c674,_0x47a862,0x0,0x0,_0xa8a7dd,_0xa8a7dd);},Sprite_FieldMarkerATB[_0x23dad6(0x179)][_0x23dad6(0x171)]=function(_0x44fdb5){const _0x2c3a3a=_0x23dad6,_0x4e5547=Sprite_FieldGaugeATB[_0x2c3a3a(0x295)],_0xc01fa2=_0x4e5547[_0x2c3a3a(0x2ca)];this['_graphicSprite'][_0x2c3a3a(0x2b2)]=new Bitmap(_0xc01fa2,_0xc01fa2);const _0x3396e6=this[_0x2c3a3a(0x21b)][_0x2c3a3a(0x2b2)],_0x367c1f=this[_0x2c3a3a(0x1fa)]['match'](/\$/i),_0x3959f5=_0x367c1f?0x1:ImageManager[_0x2c3a3a(0x232)],_0x1f17e6=_0x367c1f?0x1:ImageManager[_0x2c3a3a(0x21d)],_0x5624af=_0x44fdb5[_0x2c3a3a(0x206)]/_0x3959f5,_0x55975e=_0x44fdb5['height']/_0x1f17e6,_0x71be50=Math[_0x2c3a3a(0x211)](0x1,_0xc01fa2/_0x5624af,_0xc01fa2/_0x55975e),_0xf0fa6e=_0x5624af*_0x71be50,_0x103cfa=_0x55975e*_0x71be50,_0x17d283=Math[_0x2c3a3a(0x22d)]((_0xc01fa2-_0xf0fa6e)/0x2),_0x19c974=Math['round']((_0xc01fa2-_0x103cfa)/0x2);_0x3396e6[_0x2c3a3a(0x14e)](_0x44fdb5,0x0,0x0,_0x5624af,_0x55975e,_0x17d283,_0x19c974,_0xf0fa6e,_0x103cfa);},Sprite_FieldMarkerATB[_0x23dad6(0x179)]['changeEnemyGraphicBitmap']=function(_0x50bf04){const _0x1f8e0f=_0x23dad6,_0x4561ae=Sprite_FieldGaugeATB[_0x1f8e0f(0x295)],_0x1e4a53=_0x4561ae[_0x1f8e0f(0x2ca)];this[_0x1f8e0f(0x21b)][_0x1f8e0f(0x2b2)]=new Bitmap(_0x1e4a53,_0x1e4a53);const _0x2c43d7=this['_graphicSprite']['bitmap'],_0xd1ee57=Math[_0x1f8e0f(0x211)](0x1,_0x1e4a53/_0x50bf04[_0x1f8e0f(0x206)],_0x1e4a53/_0x50bf04[_0x1f8e0f(0x1c4)]),_0x40e60b=_0x50bf04[_0x1f8e0f(0x206)]*_0xd1ee57,_0x3d0276=_0x50bf04[_0x1f8e0f(0x1c4)]*_0xd1ee57,_0xd924a=Math[_0x1f8e0f(0x22d)]((_0x1e4a53-_0x40e60b)/0x2),_0x4cf126=Math[_0x1f8e0f(0x22d)]((_0x1e4a53-_0x3d0276)/0x2);_0x2c43d7[_0x1f8e0f(0x14e)](_0x50bf04,0x0,0x0,_0x50bf04['width'],_0x50bf04[_0x1f8e0f(0x1c4)],_0xd924a,_0x4cf126,_0x40e60b,_0x3d0276);},Sprite_FieldMarkerATB[_0x23dad6(0x179)][_0x23dad6(0x194)]=function(){const _0x42df33=_0x23dad6,_0x3feafa=this[_0x42df33(0x270)]();if(!_0x3feafa)return;if(!_0x3feafa[_0x42df33(0x20d)]())return;if(this[_0x42df33(0x311)]===_0x3feafa[_0x42df33(0x22a)]())return;this[_0x42df33(0x311)]=_0x3feafa['battlerHue']();if(_0x3feafa['hasSvBattler']())this[_0x42df33(0x311)]=0x0;this[_0x42df33(0x21b)][_0x42df33(0x151)](this['_graphicHue']);},Sprite_FieldMarkerATB[_0x23dad6(0x179)][_0x23dad6(0x1a3)]=function(){const _0x5b2d58=_0x23dad6;if(!this[_0x5b2d58(0x2c5)])return;const _0x249883=this[_0x5b2d58(0x270)]();if(!_0x249883)return;if(this[_0x5b2d58(0x2a6)]===_0x249883['_letter']&&this[_0x5b2d58(0x1e0)]===_0x249883['_plural'])return;this['_letter']=_0x249883[_0x5b2d58(0x2a6)],this['_plural']=_0x249883[_0x5b2d58(0x1e0)];const _0x90ef73=Sprite_FieldGaugeATB['Settings'],_0xafbfbc=_0x90ef73[_0x5b2d58(0x2ca)],_0x256228=Math[_0x5b2d58(0x22e)](_0xafbfbc/0x2),_0x5d2b8c=this[_0x5b2d58(0x2c5)][_0x5b2d58(0x2b2)];_0x5d2b8c[_0x5b2d58(0x30c)]();if(!this['_plural'])return;_0x5d2b8c[_0x5b2d58(0x1f1)]=_0x90ef73['EnemyBattlerFontFace']||$gameSystem[_0x5b2d58(0x150)](),_0x5d2b8c[_0x5b2d58(0x12f)]=_0x90ef73[_0x5b2d58(0x1b7)]||0x10,_0x5d2b8c[_0x5b2d58(0x153)](this[_0x5b2d58(0x2a6)],0x2,_0x256228,_0xafbfbc-0x4,_0x256228-0x2,_0x5b2d58(0x237));},Sprite_FieldMarkerATB[_0x23dad6(0x179)]['updateSelectionEffect']=function(){const _0x46a7c3=_0x23dad6,_0x92bc9e=this[_0x46a7c3(0x270)]();if(!_0x92bc9e)return;const _0x5bea43=_0x92bc9e['battler']();if(!_0x5bea43)return;const _0x4bcdc8=_0x5bea43[_0x46a7c3(0x304)]();if(!_0x4bcdc8)return;this['setBlendColor'](_0x4bcdc8[_0x46a7c3(0x1c1)]);},Sprite_FieldMarkerATB['prototype']['getStateTooltipBattler']=function(){const _0x4cfe6c=_0x23dad6;return this[_0x4cfe6c(0x270)]();};