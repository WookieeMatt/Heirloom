//=============================================================================
// VisuStella MZ - Battle System ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.18] [BattleSystemATB]
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

function _0x42ac(){const _0x5556a9=['_graphicSprite','loadWindowskin','getAtbCastTimeRate','initBattleSystemATB','setBattleSystemATBFieldGaugeVisible','fieldAtbGraphicFaceIndex','name','call','anchor','VisuMZ_0_CoreEngine','createStateIconSprite','ParseAllNotetags','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','changeSvActorGraphicBitmap','Mechanics','icon','atbStopped','createFieldAtbGraphicIconIndex','Color','Sprite_Gauge_gaugeColor2','InterruptFlashColor','After','fillRect','ARRAYJSON','applyItemUserEffect','436520eAjTqw','YynRW','jhjGY','hasSvBattler','EnemyBattlerFontFace','drawText','updatePositionOffset','targetPositionOnGauge','attackSpeed','battleMembers','huPcz','floor','Item-%1-%2','gaugeBackColor','clearTpbChargeTime','_onRestrictBypassAtbReset','top','aggroGauge','InterruptMute','gradientFillRect','svActorVertCells','ready','isDead','srCth','StunsResetGauge','updateMain','AoJrJ','createActorSprites','_graphicIconIndex','_backgroundSprite','setup','isAtbChargingState','GaugeSplit','BaZnd','Name','Sprite_Gauge_currentValue','isEnemy','Window_StatusBase_placeGauge','Scene_Options_maxCommands','ARRAYFUNC','createAllWindows','makeData','createFieldAtbGraphicFaceName','compareBattlerSprites','_arrowSprite','JSON','update','sort','fast%1','blt','Scale','AddOption','return\x200','OffsetX','MarkerArrowWindowSkin','GaugeThick','2970lrIMUz','_blendColor','updatePositionOnGauge','status','Actor-%1-%2','VkNzc','EsJYb','opacity','constructor','%1SystemBorder','createEnemySprites','parameters','svBattlerName','applyData','placeGauge','currentAction','Game_Battler_tpbRelativeSpeed','die','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','createJS','initialize','clearFieldAtbGraphics','fast','Window_Options_addGeneralOptions','Game_Battler_clearTpbChargeTime','Scene_Boot_onDatabaseLoaded','children','Scene_Battle_createAllWindows','Weapon-%1-%2','tpbRequiredCastTime','glbzD','Actor','IlvsZ','addLoadListener','full','createStateSprite','iconHeight','VWuoz','Game_BattlerBase_die','_windowLayer','VisuMZ_2_AggroControlSystem','tpbAcceleration','GydpY','addGeneralOptions','enemy','loadSvActor','isAtbCastingState','loadEnemy','targetOpacity','ekgoW','setAtbAfterSpeed','_windowskin','members','HVfLv','subject','addBattleSystemATBShowGaugeCommand','_fieldAtbGaugeFaceName','OFVSK','ActorBattlerType','opeSP','maxCommands','(?:ATB|TPB)','Class-%1-%2','GaugeLengthHorz','svActorHorzCells','canMove','boxHeight','_unit','_tpbChargeTime','_horz','fontSize','SlowRate','Actors','Game_Action_applyItemUserEffect','updatePosition','createAtbGaugeSprite','changeAtbCastTime','onDatabaseLoaded','createFieldGaugeSkin','1162945bMZULa','_fieldAtbGaugeIconIndex','createFieldGaugeSpriteATB','atbInterrupt','createFieldGaugeContainerATB','VisuMZ_2_BattleSystemCTB','DisplayPosition','jguyQ','GaugeDirection','time','#%1','jwxFm','isAttack','prototype','_fnord','Game_Battler_initTpbChargeTime','updateSelectionEffect','radKt','ColorManager_loadWindowskin','ARRAYSTR','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','UJNPo','711126MhqZBw','KxrlH','clamp','XBMvh','reduce','IconSet','addChild','isTpb','match','Sprite_Battler_setBattler','TpbCastTimeJS','jYrXi','FieldGaugeActorIcon','left','FUNC','version','updateGraphicHue','AggroControlSystem','FaceIndex','WonuU','allBattleMembers','Sprite_Gauge_currentMaxValue','_index','createKeyJS','#000000','onRestrict','round','isSideView','gaugeColor2','RegExp','_skinSprite','tvmnP','initTpbChargeTimeATB','updateBattleContainerOrder','Visible','ShowEnemyGauge','_gaugeSprite','atbCurrentMaxValue','MarkerOffset','ARRAYSTRUCT','default%1','%1SystemBg','_fieldAtbGaugeGraphicType','some','changeFaceGraphicBitmap','face','LEZAS','cast','VisuMZ_1_BattleCore','battlerHue','visualAtbGauge','_homeX','TpbSpeedCalcJS','createGaugeSprite','dxctY','18JZCOtU','Window_Help_setItem','_statusType','LGuIs','_graphicFaceName','aoucA','stop%1','_atbGaugeSprite','atbAcceleration','gaugeHeight','ZUtPK','format','applyBattleSystemATBUserEffect','yOthO','ceil','cast2','ARRAYNUM','bitmap','revive','_tpbState','Window_BattleStatus','mainFontFace','setupArrowSprite','Game_Battler_tpbSpeed','(?:GAUGE|TIME|SPEED)','Enemy-%1-%2','InterruptTextColor','Gauge','isATB','GaugeSystemSkin','battler','applyGlobal','YNrWA','textColor','full%1','Game_Battler_applyTpbPenalty','requestFauxAnimation','updateAtbGaugeSpriteVisibility','max','clearRect','_battler','Game_Battler_onRestrict','tpbSpeed','disappear','isGaugeHorizontal','dZbJg','isHidden','Game_Battler_tpbRequiredCastTime','Sprite_Gauge_gaugeColor1','atbColor','includes','setBattler','YliPx','_graphicEnemy','exit','fieldAtbGraphicIconIndex','EcCNg','nWvVe','isCTB','startTpbCasting','createFieldAtbGraphicFaceIndex','dvaTm','_helpWindow','actor','InterruptMirror','setAtbCastTime','HHQCv','_battlerContainer','item','getColor','createBattlerSprites','MarkerSpeed','charging','changeIconGraphicBitmap','drawGaugeBitmap','startEffect','EnemyBattlerDrawLetter','Sprite_Battler_update','parse','_fieldGaugeATB','concat','87171TzJJFE','MarkerSize','BattleSystemATB','cast%1','Game_Action_applyGlobal','_letter','setFrame','showVisualAtbGauge','_atbFieldGaugeVisible','fieldAtbGraphicType','Options','paramBuffRate','appear','_graphicFaceIndex','92rvMrBH','GaugeLengthVert','xLQyL','Sprite_Battler_updateMain','removeChild','setupBattleSystemATBColors','State-%1-%2','Enemies','BorderThickness','atbGaugeColor','create','traitObjects','right','EnemyBattlerFaceIndex','BattlerRelativeSpeedJS','map','isAppeared','toLowerCase','initMembers','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','keKnJ','AnchorY','skills','clear','mainSprite','isActor','ActorBattlerIcon','_letterSprite','snEKz','applyGlobalBattleSystemATBEffects','isAlive','Settings','Game_Battler_startTpbCasting','faceIndex','setBlendColor','7795424AObTOw','currentValue','EscapeFailPenalty','Skill-%1-%2','description','MfJHZ','UmGfV','FUNnO','FaceName','bgCIY','uyJbi','NUM','Game_Battler_tpbBaseSpeed','Game_Battler_tpbAcceleration','faceName','updateGraphic','cVadG','atbActive','NPwQz','Game_BattlerBase_revive','hhVrs','checkAggroControlSystemOffsetYAdjustment','isSceneBattle','height','Parse_Notetags_CreateJS','InterruptFlashDuration','pKNEa','bind','_plural','2LwiTVE','fontFace','changeAtbChargeTime','isBattleSystemATBFieldGaugeVisible','gaugeColor1','gDuQo','_tpbCastTime','battleUIOffsetX','Urqtf','loadSvEnemy','tpbBaseSpeed','setAtbGraphicIconIndex','fieldAtbGraphicFaceName','Cast','svactor','addBattleSystemATBCommands','createBackgroundSprite','ShowMarkerBg','fWBdj','Armor-%1-%2','OpacityRate','applyATBPenalty','applyTpbPenalty','FieldGaugeEnemyFace','process_VisuMZ_BattleSystemATB_JS_Notetags','fpasI','TpbBaseSpeedCalcJS','loadFace','Sprite_Actor_createStateSprite','24590RRYfuU','_svBattlerSprite','Game_Unit_updateTpb','createGaugeBitmap','EnemyBattlerType','_scene','setHue','ConfigManager_makeData','trim','width','faceWidth','initTpbChargeTime','80906sLgEEU','AnchorX','_homeY','SystemFieldGaugeVisibility','speed','DisplayOffsetX','uXVQO','FieldGaugeClearActorGraphic','createFieldAtbGraphicType','WfaIr','updateAtbGaugeSpritePosition','pwaVK','AdjustRect','Enemy','slow','Charge','Aggro','bGHSh','createArrowSprite','%1BgColor2','note','updateOpacity','createGraphicSprite','_fieldGaugeATB_Container','createChildren','Sprite_Enemy_createStateIconSprite','BattleManager_isActiveTpb','KUHvf','applyItemBattleSystemATBUserEffect','bottom','slow%1','UseFieldGauge','makeDeepCopy','loadSystem','registerCommand','EEWrm','eBkfn','_graphicType','ShowStatusGauge','atbCurrentValue','createBattlerSprite','IfvFs','setAtbChargeTime','onAtbInterrupt','getChildIndex','Game_System_initialize','InterruptAnimationID','InterruptText','ShowActorGauge','scale','EVAL','casting','setHomeLocation','Game_BattlerBase_appear','ConvertParams','changeEnemyGraphicBitmap','EnemyBattlerIcon','_atbAfterSpeed','rISTD','process_VisuMZ_BattleSystemATB_CreateRegExp','TQwvZ','ConfigManager_applyData','length','RepositionTopHelpX','battlerName','processUpdateGraphic','createLetterSprite','QtEZT','abs','ParseSkillNotetags','_fieldAtbGaugeFaceIndex','createBorderSprite','psIFs','DrawGauge','VisibleGauge','%1BorderColor','filter','battleUIOffsetY','atbSpeed','lineHeight','tpbRelativeSpeed','orJJB','%1BgColor1','toUpperCase','updateLetter','ParseItemNotetags','EnemyBattlerFontSize','boxWidth','_graphicSv','cast1','clearActions','aGYoJ','visible','default','setupAtbGaugeSprite','_graphicHue','min','faceHeight','isRestricted','HwZLR','_atbColors','currentMaxValue','setItem','QlCNy','gaugeRate','tpbChargeTime','IconIndex','createBattlerContainer','OffsetY'];_0x42ac=function(){return _0x5556a9;};return _0x42ac();}function _0x3a24(_0x45f1b8,_0x563622){const _0x42ac33=_0x42ac();return _0x3a24=function(_0x3a24fd,_0x2c2a28){_0x3a24fd=_0x3a24fd-0xbc;let _0x1f79ac=_0x42ac33[_0x3a24fd];return _0x1f79ac;},_0x3a24(_0x45f1b8,_0x563622);}const _0x159d68=_0x3a24;(function(_0x5626b9,_0x22bc35){const _0x49c3bf=_0x3a24,_0x59d5f1=_0x5626b9();while(!![]){try{const _0x1f897e=-parseInt(_0x49c3bf(0x2b6))/0x1*(-parseInt(_0x49c3bf(0x143))/0x2)+-parseInt(_0x49c3bf(0x268))/0x3*(-parseInt(_0x49c3bf(0x276))/0x4)+-parseInt(_0x49c3bf(0x1ca))/0x5+parseInt(_0x49c3bf(0x217))/0x6*(parseInt(_0x49c3bf(0xbd))/0x7)+-parseInt(_0x49c3bf(0x299))/0x8+-parseInt(_0x49c3bf(0x1e0))/0x9+-parseInt(_0x49c3bf(0x2d3))/0xa*(-parseInt(_0x49c3bf(0x17b))/0xb);if(_0x1f897e===_0x22bc35)break;else _0x59d5f1['push'](_0x59d5f1['shift']());}catch(_0x2fdcf1){_0x59d5f1['push'](_0x59d5f1['shift']());}}}(_0x42ac,0x7e51c));var label=_0x159d68(0x26a),tier=tier||0x0,dependencies=[_0x159d68(0x210)],pluginData=$plugins[_0x159d68(0x109)](function(_0x1323c1){const _0x4b59f3=_0x159d68;return _0x1323c1['status']&&_0x1323c1['description'][_0x4b59f3(0x249)]('['+label+']');})[0x0];VisuMZ[label][_0x159d68(0x295)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x159d68(0xf3)]=function(_0x5ba215,_0x561710){const _0x596c51=_0x159d68;for(const _0x534290 in _0x561710){if(_0x534290[_0x596c51(0x1e8)](/(.*):(.*)/i)){if(_0x596c51(0x2a2)!==_0x596c51(0x1d1)){const _0x4f0eda=String(RegExp['$1']),_0x5c406d=String(RegExp['$2'])[_0x596c51(0x110)]()[_0x596c51(0x2db)]();let _0x54896b,_0x16bd16,_0x36b086;switch(_0x5c406d){case _0x596c51(0x2a4):_0x54896b=_0x561710[_0x534290]!==''?Number(_0x561710[_0x534290]):0x0;break;case _0x596c51(0x227):_0x16bd16=_0x561710[_0x534290]!==''?JSON[_0x596c51(0x265)](_0x561710[_0x534290]):[],_0x54896b=_0x16bd16[_0x596c51(0x285)](_0x5a1ca4=>Number(_0x5a1ca4));break;case _0x596c51(0xef):_0x54896b=_0x561710[_0x534290]!==''?eval(_0x561710[_0x534290]):null;break;case'ARRAYEVAL':_0x16bd16=_0x561710[_0x534290]!==''?JSON[_0x596c51(0x265)](_0x561710[_0x534290]):[],_0x54896b=_0x16bd16[_0x596c51(0x285)](_0x522300=>eval(_0x522300));break;case _0x596c51(0x170):_0x54896b=_0x561710[_0x534290]!==''?JSON[_0x596c51(0x265)](_0x561710[_0x534290]):'';break;case _0x596c51(0x141):_0x16bd16=_0x561710[_0x534290]!==''?JSON['parse'](_0x561710[_0x534290]):[],_0x54896b=_0x16bd16[_0x596c51(0x285)](_0x5e2205=>JSON[_0x596c51(0x265)](_0x5e2205));break;case _0x596c51(0x1ee):_0x54896b=_0x561710[_0x534290]!==''?new Function(JSON[_0x596c51(0x265)](_0x561710[_0x534290])):new Function(_0x596c51(0x177));break;case _0x596c51(0x16a):_0x16bd16=_0x561710[_0x534290]!==''?JSON[_0x596c51(0x265)](_0x561710[_0x534290]):[],_0x54896b=_0x16bd16['map'](_0xa5eff6=>new Function(JSON['parse'](_0xa5eff6)));break;case'STR':_0x54896b=_0x561710[_0x534290]!==''?String(_0x561710[_0x534290]):'';break;case _0x596c51(0x1dd):_0x16bd16=_0x561710[_0x534290]!==''?JSON[_0x596c51(0x265)](_0x561710[_0x534290]):[],_0x54896b=_0x16bd16[_0x596c51(0x285)](_0x3785b8=>String(_0x3785b8));break;case'STRUCT':_0x36b086=_0x561710[_0x534290]!==''?JSON[_0x596c51(0x265)](_0x561710[_0x534290]):{},_0x54896b=VisuMZ[_0x596c51(0xf3)]({},_0x36b086);break;case _0x596c51(0x207):_0x16bd16=_0x561710[_0x534290]!==''?JSON['parse'](_0x561710[_0x534290]):[],_0x54896b=_0x16bd16[_0x596c51(0x285)](_0x193efd=>VisuMZ[_0x596c51(0xf3)]({},JSON[_0x596c51(0x265)](_0x193efd)));break;default:continue;}_0x5ba215[_0x4f0eda]=_0x54896b;}else return _0x3b23ff[_0x596c51(0x26a)][_0x596c51(0x295)]['Mechanics'][_0x596c51(0x214)]['call'](this,this);}}return _0x5ba215;},(_0x543a18=>{const _0x21e062=_0x159d68,_0x5a6a87=_0x543a18['name'];for(const _0x500c1f of dependencies){if(!Imported[_0x500c1f]){alert(_0x21e062(0x1de)[_0x21e062(0x222)](_0x5a6a87,_0x500c1f)),SceneManager[_0x21e062(0x24d)]();break;}}const _0x1fb946=_0x543a18[_0x21e062(0x29d)];if(_0x1fb946[_0x21e062(0x1e8)](/\[Version[ ](.*?)\]/i)){const _0x2b298e=Number(RegExp['$1']);_0x2b298e!==VisuMZ[label][_0x21e062(0x1ef)]&&(alert(_0x21e062(0x136)['format'](_0x5a6a87,_0x2b298e)),SceneManager['exit']());}if(_0x1fb946[_0x21e062(0x1e8)](/\[Tier[ ](\d+)\]/i)){const _0x417b42=Number(RegExp['$1']);if(_0x417b42<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x21e062(0x222)](_0x5a6a87,_0x417b42,tier)),SceneManager[_0x21e062(0x24d)]();else{if('kANru'!=='kANru')return this[_0x21e062(0x1b3)]===_0x2aafa1&&(this[_0x21e062(0x1b3)]=this[_0x21e062(0x16d)]()),this['_fieldAtbGaugeFaceName'];else tier=Math[_0x21e062(0x23d)](_0x417b42,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x21e062(0x295)],_0x543a18[_0x21e062(0x186)]);})(pluginData),PluginManager[_0x159d68(0xdf)](pluginData[_0x159d68(0x130)],_0x159d68(0x1ec),_0x3fa65e=>{const _0x339b76=_0x159d68;VisuMZ['ConvertParams'](_0x3fa65e,_0x3fa65e);const _0x413912=_0x3fa65e[_0x339b76(0x1c3)],_0x1d866e=_0x3fa65e[_0x339b76(0x127)];for(const _0x5cfc96 of _0x413912){const _0x2dcf22=$gameActors[_0x339b76(0x256)](_0x5cfc96);if(!_0x2dcf22)continue;_0x2dcf22[_0x339b76(0x20a)]=_0x339b76(0x139),_0x2dcf22[_0x339b76(0x1cb)]=_0x1d866e;}}),PluginManager[_0x159d68(0xdf)](pluginData[_0x159d68(0x130)],'FieldGaugeActorFace',_0x5a7a8f=>{const _0x1d70a1=_0x159d68;VisuMZ[_0x1d70a1(0xf3)](_0x5a7a8f,_0x5a7a8f);const _0x196dfd=_0x5a7a8f['Actors'],_0x423f84=_0x5a7a8f[_0x1d70a1(0x2a1)],_0x23fd73=_0x5a7a8f[_0x1d70a1(0x1f2)];for(const _0x53ae46 of _0x196dfd){if('ABTPE'===_0x1d70a1(0x124)){const _0x1d8105=_0x2fc294[_0x1d70a1(0x222)](_0x4c2bfc['toUpperCase']()[_0x1d70a1(0x2db)](),'(?:ATB|TPB)',_0x1d70a1(0x22f)),_0x5c2f3d=new _0x567239(_0x1d8105,'i');_0x5a9709[_0x1d70a1(0x26a)]['RegExp'][_0x5d31b3]=_0x5c2f3d;}else{const _0x327415=$gameActors['actor'](_0x53ae46);if(!_0x327415)continue;_0x327415['_fieldAtbGaugeGraphicType']=_0x1d70a1(0x20d),_0x327415[_0x1d70a1(0x1b3)]=_0x423f84,_0x327415[_0x1d70a1(0x103)]=_0x23fd73;}}}),PluginManager[_0x159d68(0xdf)](pluginData['name'],_0x159d68(0xc4),_0x4029e0=>{const _0x3392ec=_0x159d68;VisuMZ[_0x3392ec(0xf3)](_0x4029e0,_0x4029e0);const _0x29675d=_0x4029e0[_0x3392ec(0x1c3)];for(const _0x33378b of _0x29675d){if('glbzD'===_0x3392ec(0x199)){const _0x32ef21=$gameActors['actor'](_0x33378b);if(!_0x32ef21)continue;_0x32ef21[_0x3392ec(0x190)]();}else return this[_0x3392ec(0xfe)]();}}),PluginManager[_0x159d68(0xdf)](pluginData[_0x159d68(0x130)],'FieldGaugeEnemyIcon',_0x4a3622=>{const _0x523244=_0x159d68;VisuMZ[_0x523244(0xf3)](_0x4a3622,_0x4a3622);const _0x13a692=_0x4a3622['Enemies'],_0x100ce3=_0x4a3622[_0x523244(0x127)];for(const _0x34e6e0 of _0x13a692){if(_0x523244(0x1ff)===_0x523244(0x216)){if(!_0x42b328[_0x523244(0x1a3)])return![];if(this[_0x523244(0x23f)]&&this[_0x523244(0x23f)][_0x523244(0x167)]())return![];const _0x2db355=_0x2bfda8['AggroControlSystem'][_0x523244(0x295)][_0x523244(0xcd)];if(!_0x2db355[_0x523244(0x107)])return![];if(!_0x5cfcb9[_0x523244(0x154)])return![];const _0x1e0d53=_0x509c16[_0x523244(0x26a)][_0x523244(0x295)][_0x523244(0x232)];return _0x2db355['Scale']===_0x1e0d53[_0x523244(0x175)]&&_0x2db355[_0x523244(0xbe)]===_0x1e0d53[_0x523244(0xbe)]&&_0x2db355['AnchorY']===_0x1e0d53['AnchorY']&&_0x2db355[_0x523244(0x178)]===_0x1e0d53[_0x523244(0x178)]&&_0x2db355[_0x523244(0x129)]===_0x1e0d53[_0x523244(0x129)]&&!![];}else{const _0x4bb062=$gameTroop['members']()[_0x34e6e0];if(!_0x4bb062)continue;_0x4bb062[_0x523244(0x20a)]=_0x523244(0x139),_0x4bb062[_0x523244(0x1cb)]=_0x100ce3;}}}),PluginManager['registerCommand'](pluginData[_0x159d68(0x130)],_0x159d68(0x2cd),_0x17b371=>{const _0x75bbd7=_0x159d68;VisuMZ[_0x75bbd7(0xf3)](_0x17b371,_0x17b371);const _0x18c9ea=_0x17b371[_0x75bbd7(0x27d)],_0x26b179=_0x17b371[_0x75bbd7(0x2a1)],_0x58e53b=_0x17b371[_0x75bbd7(0x1f2)];for(const _0x393791 of _0x18c9ea){if(_0x75bbd7(0x244)!=='hqNzu'){const _0x356740=$gameTroop['members']()[_0x393791];if(!_0x356740)continue;_0x356740[_0x75bbd7(0x20a)]=_0x75bbd7(0x20d),_0x356740[_0x75bbd7(0x1b3)]=_0x26b179,_0x356740[_0x75bbd7(0x103)]=_0x58e53b;}else this['_onRestrictBypassAtbReset']=_0x2ad3bd['isATB']();}}),PluginManager['registerCommand'](pluginData[_0x159d68(0x130)],'FieldGaugeClearEnemyGraphic',_0x464e61=>{const _0x501fc2=_0x159d68;VisuMZ['ConvertParams'](_0x464e61,_0x464e61);const _0x5eb05b=_0x464e61[_0x501fc2(0x27d)];for(const _0x529553 of _0x5eb05b){const _0x339855=$gameTroop[_0x501fc2(0x1af)]()[_0x529553];if(!_0x339855)continue;_0x339855[_0x501fc2(0x190)]();}}),PluginManager[_0x159d68(0xdf)](pluginData['name'],_0x159d68(0xc0),_0x3b721d=>{const _0x339f73=_0x159d68;VisuMZ[_0x339f73(0xf3)](_0x3b721d,_0x3b721d);const _0x35e1a2=_0x3b721d[_0x339f73(0x202)];$gameSystem[_0x339f73(0x12e)](_0x35e1a2);}),VisuMZ[_0x159d68(0x26a)][_0x159d68(0x194)]=Scene_Boot[_0x159d68(0x1d7)][_0x159d68(0x1c8)],Scene_Boot[_0x159d68(0x1d7)][_0x159d68(0x1c8)]=function(){const _0x5ac190=_0x159d68;this[_0x5ac190(0xf8)](),VisuMZ[_0x5ac190(0x26a)][_0x5ac190(0x194)]['call'](this),this[_0x5ac190(0x2ce)]();},VisuMZ['BattleSystemATB'][_0x159d68(0x1fd)]={},Scene_Boot[_0x159d68(0x1d7)]['process_VisuMZ_BattleSystemATB_CreateRegExp']=function(){const _0x4f6be4=_0x159d68,_0x484364=VisuMZ['BattleCore']['RegExp'],_0x41d5ca=_0x4f6be4(0x289),_0x894758=['Charge',_0x4f6be4(0x2c3),_0x4f6be4(0x13f)];for(const _0x1e224a of _0x894758){const _0x26ec23=_0x41d5ca['format'](_0x1e224a[_0x4f6be4(0x110)]()['trim'](),_0x4f6be4(0x1b8),_0x4f6be4(0x22f)),_0x5bc8c6=new RegExp(_0x26ec23,'i');VisuMZ[_0x4f6be4(0x26a)][_0x4f6be4(0x1fd)][_0x1e224a]=_0x5bc8c6;}},Scene_Boot[_0x159d68(0x1d7)][_0x159d68(0x2ce)]=function(){const _0x27b7e1=_0x159d68;if(VisuMZ[_0x27b7e1(0x135)])return;const _0x50e551=$dataSkills['concat']($dataItems);for(const _0x58f202 of _0x50e551){if('cVadG'!==_0x27b7e1(0x2a9))return this[_0x27b7e1(0x22a)]===_0x27b7e1(0x25f);else{if(!_0x58f202)continue;VisuMZ['BattleSystemATB']['Parse_Notetags_CreateJS'](_0x58f202);}}},VisuMZ['BattleSystemATB'][_0x159d68(0x102)]=VisuMZ[_0x159d68(0x102)],VisuMZ[_0x159d68(0x102)]=function(_0x46a690){const _0x51bd7e=_0x159d68;VisuMZ[_0x51bd7e(0x26a)][_0x51bd7e(0x102)]['call'](this,_0x46a690),VisuMZ[_0x51bd7e(0x26a)][_0x51bd7e(0x2b1)](_0x46a690);},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x112)]=VisuMZ[_0x159d68(0x112)],VisuMZ[_0x159d68(0x112)]=function(_0x296be7){const _0x5ee707=_0x159d68;VisuMZ['BattleSystemATB']['ParseItemNotetags']['call'](this,_0x296be7),VisuMZ[_0x5ee707(0x26a)][_0x5ee707(0x2b1)](_0x296be7);},VisuMZ['BattleSystemATB']['Parse_Notetags_CreateJS']=function(_0x328005){const _0x4e59fa=_0x159d68,_0x35f523=['Charge','Cast',_0x4e59fa(0x13f)];for(const _0x1acd14 of _0x35f523){_0x4e59fa(0xc3)!==_0x4e59fa(0x1e3)?VisuMZ['BattleSystemATB'][_0x4e59fa(0x18e)](_0x328005,_0x1acd14):this['visualAtbGauge']=_0x257b59[_0x4e59fa(0x212)];}},VisuMZ[_0x159d68(0x26a)]['JS']={},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x18e)]=function(_0x5b9ad6,_0x90ab10){const _0x6e5631=_0x159d68,_0x1ab2c4=_0x5b9ad6['note'];if(_0x1ab2c4[_0x6e5631(0x1e8)](VisuMZ[_0x6e5631(0x26a)][_0x6e5631(0x1fd)][_0x90ab10])){const _0x2ffb90=String(RegExp['$1']),_0xd87574=_0x6e5631(0x18d)['format'](_0x2ffb90,_0x90ab10),_0x287f95=VisuMZ[_0x6e5631(0x26a)]['createKeyJS'](_0x5b9ad6,_0x90ab10);VisuMZ[_0x6e5631(0x26a)]['JS'][_0x287f95]=new Function(_0xd87574);}},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x1f7)]=function(_0x423fe3,_0x27eb3b){const _0x172bd8=_0x159d68;if(VisuMZ[_0x172bd8(0x1f7)])return VisuMZ[_0x172bd8(0x1f7)](_0x423fe3,_0x27eb3b);let _0x567c0c='';if($dataActors[_0x172bd8(0x249)](_0x423fe3))_0x567c0c=_0x172bd8(0x17f)[_0x172bd8(0x222)](_0x423fe3['id'],_0x27eb3b);if($dataClasses[_0x172bd8(0x249)](_0x423fe3))_0x567c0c=_0x172bd8(0x1b9)[_0x172bd8(0x222)](_0x423fe3['id'],_0x27eb3b);if($dataSkills[_0x172bd8(0x249)](_0x423fe3))_0x567c0c=_0x172bd8(0x29c)['format'](_0x423fe3['id'],_0x27eb3b);if($dataItems[_0x172bd8(0x249)](_0x423fe3))_0x567c0c=_0x172bd8(0x14f)['format'](_0x423fe3['id'],_0x27eb3b);if($dataWeapons[_0x172bd8(0x249)](_0x423fe3))_0x567c0c=_0x172bd8(0x197)[_0x172bd8(0x222)](_0x423fe3['id'],_0x27eb3b);if($dataArmors[_0x172bd8(0x249)](_0x423fe3))_0x567c0c=_0x172bd8(0x2c9)[_0x172bd8(0x222)](_0x423fe3['id'],_0x27eb3b);if($dataEnemies[_0x172bd8(0x249)](_0x423fe3))_0x567c0c=_0x172bd8(0x230)['format'](_0x423fe3['id'],_0x27eb3b);if($dataStates[_0x172bd8(0x249)](_0x423fe3))_0x567c0c=_0x172bd8(0x27c)[_0x172bd8(0x222)](_0x423fe3['id'],_0x27eb3b);return _0x567c0c;},ConfigManager['visualAtbGauge']=!![],VisuMZ['BattleSystemATB'][_0x159d68(0x2da)]=ConfigManager[_0x159d68(0x16c)],ConfigManager[_0x159d68(0x16c)]=function(){const _0x2b84f2=_0x159d68,_0x130921=VisuMZ['BattleSystemATB']['ConfigManager_makeData'][_0x2b84f2(0x131)](this);return _0x130921['visualAtbGauge']=this[_0x2b84f2(0x212)],_0x130921;},VisuMZ[_0x159d68(0x26a)]['ConfigManager_applyData']=ConfigManager[_0x159d68(0x188)],ConfigManager[_0x159d68(0x188)]=function(_0x1697c4){const _0x4ec6b2=_0x159d68;VisuMZ[_0x4ec6b2(0x26a)][_0x4ec6b2(0xfa)][_0x4ec6b2(0x131)](this,_0x1697c4),'visualAtbGauge'in _0x1697c4?this[_0x4ec6b2(0x212)]=_0x1697c4[_0x4ec6b2(0x212)]:this['visualAtbGauge']=!![];},ImageManager['svActorHorzCells']=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x159d68(0x157)]=ImageManager[_0x159d68(0x157)]||0x6,TextManager['visualAtbGauge']=VisuMZ[_0x159d68(0x26a)][_0x159d68(0x295)]['Options'][_0x159d68(0x165)],VisuMZ[_0x159d68(0x26a)][_0x159d68(0x1dc)]=ColorManager[_0x159d68(0x12b)],ColorManager['loadWindowskin']=function(){const _0x3ba323=_0x159d68;VisuMZ[_0x3ba323(0x26a)][_0x3ba323(0x1dc)][_0x3ba323(0x131)](this),this[_0x3ba323(0x1ae)]['addLoadListener'](this['setupBattleSystemATBColors'][_0x3ba323(0x2b4)](this));},ColorManager[_0x159d68(0x25c)]=function(_0x1e1897){const _0x38fd78=_0x159d68;return _0x1e1897=String(_0x1e1897),_0x1e1897['match'](/#(.*)/i)?_0x38fd78(0x1d4)[_0x38fd78(0x222)](String(RegExp['$1'])):this['textColor'](Number(_0x1e1897));},ColorManager[_0x159d68(0x27b)]=function(){const _0x49d0d5=_0x159d68,_0x430477=[_0x49d0d5(0x11a),_0x49d0d5(0x19d),_0x49d0d5(0x20f),_0x49d0d5(0x191),_0x49d0d5(0xcb),'stop'],_0x421559=VisuMZ[_0x49d0d5(0x26a)][_0x49d0d5(0x295)][_0x49d0d5(0x13c)];this[_0x49d0d5(0x121)]={};for(const _0xa9aa8b of _0x430477){for(let _0x41f966=0x1;_0x41f966<=0x2;_0x41f966++){if('byRzY'===_0x49d0d5(0x1e1)){const _0x35a074=this[_0x49d0d5(0x256)]()[_0x49d0d5(0xd1)];if(_0x35a074[_0x49d0d5(0x1e8)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x10f48e(_0x63f02c['$2']);return this[_0x49d0d5(0x297)]();}else{const _0x2c6b30=_0xa9aa8b+_0x41f966;this['_atbColors'][_0x2c6b30]=this[_0x49d0d5(0x25c)](_0x421559[_0x2c6b30]);}}}},ColorManager['atbColor']=function(_0xddf99f){const _0x472fe9=_0x159d68;if(this['_atbColors']===undefined)this[_0x472fe9(0x27b)]();return this[_0x472fe9(0x121)][_0xddf99f]||_0x472fe9(0x1f8);},SceneManager[_0x159d68(0x2af)]=function(){const _0x2c19a5=_0x159d68;return this[_0x2c19a5(0x2d8)]&&this[_0x2c19a5(0x2d8)][_0x2c19a5(0x183)]===Scene_Battle;},BattleManager[_0x159d68(0x233)]=function(){const _0x3132df=_0x159d68;if(Imported[_0x3132df(0x1cf)]&&this[_0x3132df(0x251)]()){if(_0x3132df(0x24b)===_0x3132df(0xd8))_0x3d0a9a[_0x3132df(0x228)]=_0x2d1aff[_0x3132df(0xde)](_0x1aa55e[_0x5f4475]);else return![];}return this[_0x3132df(0x1e7)]();},VisuMZ[_0x159d68(0x26a)]['BattleManager_isActiveTpb']=BattleManager['isActiveTpb'],BattleManager['isActiveTpb']=function(){const _0x2d5ffc=_0x159d68;if(!this['isTpb']())return![];else return ConfigManager&&ConfigManager[_0x2d5ffc(0x2aa)]!==undefined?ConfigManager[_0x2d5ffc(0x2aa)]:VisuMZ[_0x2d5ffc(0x26a)][_0x2d5ffc(0xd7)][_0x2d5ffc(0x131)](this);},VisuMZ[_0x159d68(0x26a)][_0x159d68(0xea)]=Game_System[_0x159d68(0x1d7)]['initialize'],Game_System[_0x159d68(0x1d7)][_0x159d68(0x18f)]=function(){const _0xb6155f=_0x159d68;VisuMZ['BattleSystemATB']['Game_System_initialize'][_0xb6155f(0x131)](this),this[_0xb6155f(0x12d)]();},Game_System[_0x159d68(0x1d7)][_0x159d68(0x12d)]=function(){const _0x1518a4=_0x159d68;this[_0x1518a4(0x270)]=!![];},Game_System[_0x159d68(0x1d7)][_0x159d68(0x2b9)]=function(){const _0x4c0760=_0x159d68;if(this['_atbFieldGaugeVisible']===undefined){if(_0x4c0760(0x105)===_0x4c0760(0x105))this['initBattleSystemATB']();else{const _0x2094f2=_0x1b6fb4+_0x3c4b5b;this[_0x4c0760(0x121)][_0x2094f2]=this[_0x4c0760(0x25c)](_0x46a81b[_0x2094f2]);}}return this[_0x4c0760(0x270)];},Game_System[_0x159d68(0x1d7)][_0x159d68(0x12e)]=function(_0x129f65){const _0x39aa4f=_0x159d68;this[_0x39aa4f(0x270)]===undefined&&this[_0x39aa4f(0x12d)](),this[_0x39aa4f(0x270)]=_0x129f65;},VisuMZ[_0x159d68(0x26a)]['Game_Action_applyItemUserEffect']=Game_Action[_0x159d68(0x1d7)][_0x159d68(0x142)],Game_Action[_0x159d68(0x1d7)]['applyItemUserEffect']=function(_0x152694){const _0x3748c6=_0x159d68;VisuMZ[_0x3748c6(0x26a)][_0x3748c6(0x1c4)]['call'](this,_0x152694),this[_0x3748c6(0x223)](_0x152694);},Game_Action[_0x159d68(0x1d7)][_0x159d68(0x223)]=function(_0x102fd4){const _0x4f2163=_0x159d68;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x4f2163(0x233)]())return;if(this[_0x4f2163(0x25b)]())this[_0x4f2163(0xd9)](_0x102fd4);},Game_Action['prototype'][_0x159d68(0xd9)]=function(_0x274fe4){const _0xce297c=_0x159d68,_0x130f31=this[_0xce297c(0x25b)]()[_0xce297c(0xd1)];if(_0x274fe4[_0xce297c(0x162)]()){if(_0xce297c(0x292)!=='snEKz'){if(!_0x204cb8[_0xce297c(0x2af)]())return;if(!_0x183f2f[_0xce297c(0x233)]())return;if(this['item']())this[_0xce297c(0xd9)](_0x582d7f);}else{const _0xa38277=VisuMZ[_0xce297c(0x26a)][_0xce297c(0x1f7)](this[_0xce297c(0x25b)](),_0xce297c(0xcc));if(VisuMZ[_0xce297c(0x26a)]['JS'][_0xa38277]){const _0x272af9=VisuMZ['BattleSystemATB']['JS'][_0xa38277][_0xce297c(0x131)](this,this[_0xce297c(0x1b1)](),_0x274fe4);_0x274fe4['setAtbChargeTime'](_0x272af9);}_0x130f31[_0xce297c(0x1e8)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0xce297c(0x1ac)===_0xce297c(0x144)?(this[_0xce297c(0x2c6)](),this[_0xce297c(0xd3)](),this[_0xce297c(0x104)](),this[_0xce297c(0xff)](),this['createArrowSprite'](),this['updatePositionOnGauge'](!![])):_0x274fe4[_0xce297c(0xe7)](Number(RegExp['$1'])*0.01)),_0x130f31['match'](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x274fe4[_0xce297c(0x2b8)](Number(RegExp['$1'])*0.01);}}else{if(_0x274fe4[_0xce297c(0x1a9)]()){const _0x4a2189=VisuMZ['BattleSystemATB'][_0xce297c(0x1f7)](this[_0xce297c(0x25b)](),_0xce297c(0x2c3));if(VisuMZ[_0xce297c(0x26a)]['JS'][_0x4a2189]){if(_0xce297c(0xc8)!=='pwaVK')return _0x5681d3['isATB']()?_0x481d26[_0xce297c(0x26a)][_0xce297c(0x295)][_0xce297c(0x138)][_0xce297c(0x1ea)][_0xce297c(0x131)](this,this):_0x50cbd0[_0xce297c(0x26a)]['Game_Battler_tpbRequiredCastTime'][_0xce297c(0x131)](this);else{const _0x281bef=VisuMZ[_0xce297c(0x26a)]['JS'][_0x4a2189][_0xce297c(0x131)](this,this[_0xce297c(0x1b1)](),_0x274fe4);_0x274fe4[_0xce297c(0x258)](_0x281bef);}}_0x130f31[_0xce297c(0x1e8)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x274fe4[_0xce297c(0x258)](Number(RegExp['$1'])*0.01),_0x130f31[_0xce297c(0x1e8)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x274fe4[_0xce297c(0x1c7)](Number(RegExp['$1'])*0.01),_0x130f31[_0xce297c(0x1e8)](/<(?:ATB|TPB) INTERRUPT>/i)&&_0x274fe4[_0xce297c(0x1cd)]();}}},VisuMZ['BattleSystemATB'][_0x159d68(0x26c)]=Game_Action[_0x159d68(0x1d7)]['applyGlobal'],Game_Action[_0x159d68(0x1d7)][_0x159d68(0x236)]=function(){const _0x4b2774=_0x159d68;VisuMZ[_0x4b2774(0x26a)][_0x4b2774(0x26c)][_0x4b2774(0x131)](this),this[_0x4b2774(0x293)]();},Game_Action[_0x159d68(0x1d7)][_0x159d68(0x293)]=function(){const _0x10b10e=_0x159d68;if(!this[_0x10b10e(0x25b)]())return;if(!BattleManager['isATB']())return;const _0x1f8275=this[_0x10b10e(0x25b)]()['note'];let _0x2a2d0a=0x0;this['_forcing']&&(_0x2a2d0a=this[_0x10b10e(0x1b1)]()['_tpbChargeTime']);const _0x4cfbed=VisuMZ[_0x10b10e(0x26a)][_0x10b10e(0x1f7)](this[_0x10b10e(0x25b)](),_0x10b10e(0x13f));VisuMZ['BattleSystemATB']['JS'][_0x4cfbed]&&(_0x2a2d0a=VisuMZ[_0x10b10e(0x26a)]['JS'][_0x4cfbed][_0x10b10e(0x131)](this,this[_0x10b10e(0x1b1)](),this['subject']()));let _0x31079d=this[_0x10b10e(0x25b)]()['speed']>0x0?this[_0x10b10e(0x25b)]()['speed']:0x0;if(this[_0x10b10e(0x1d6)]())_0x31079d+=this[_0x10b10e(0x1b1)]()[_0x10b10e(0x14b)]();_0x2a2d0a+=(_0x31079d/0xfa0)['clamp'](0x0,0x1);this['item']()[_0x10b10e(0xd1)][_0x10b10e(0x1e8)](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x2a2d0a=Number(RegExp['$1'])*0.01);const _0x35d484=this['subject']()['traitObjects']()[_0x10b10e(0x267)](this[_0x10b10e(0x1b1)]()[_0x10b10e(0x28c)]()),_0x165e0d=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x409ad7=_0x35d484['map'](_0x4a1151=>_0x4a1151&&_0x4a1151[_0x10b10e(0xd1)][_0x10b10e(0x1e8)](_0x165e0d)?Number(RegExp['$1'])*0.01:0x0);_0x2a2d0a=_0x409ad7[_0x10b10e(0x1e4)]((_0x44903c,_0x3195eb)=>_0x44903c+_0x3195eb,_0x2a2d0a),this['item']()['note'][_0x10b10e(0x1e8)](/<(?:ATB|TPB) INSTANT>/i)&&(_0x2a2d0a=0xa),this[_0x10b10e(0x1b1)]()['setAtbAfterSpeed'](_0x2a2d0a);},Game_BattlerBase['prototype'][_0x159d68(0xe7)]=function(_0x5c516b){const _0x2582c1=_0x159d68;this['_tpbChargeTime']=_0x5c516b[_0x2582c1(0x1e2)](0x0,0x1);},Game_BattlerBase[_0x159d68(0x1d7)][_0x159d68(0x2b8)]=function(_0x54446d){const _0x1877cd=_0x159d68;this[_0x1877cd(0xe7)](this[_0x1877cd(0x1bf)]+_0x54446d);},Game_BattlerBase[_0x159d68(0x1d7)][_0x159d68(0x258)]=function(_0x13bf45){const _0x193343=_0x159d68,_0x1df497=this[_0x193343(0x198)]();this['_tpbCastTime']=(_0x1df497*_0x13bf45)[_0x193343(0x1e2)](0x0,_0x1df497);},Game_BattlerBase[_0x159d68(0x1d7)][_0x159d68(0x1c7)]=function(_0x197fac){const _0x6ca5d7=_0x159d68,_0x1eb632=this['tpbRequiredCastTime'](),_0x4da4d7=_0x1eb632*_0x197fac;this[_0x6ca5d7(0x2bc)]=(this['_tpbCastTime']+_0x4da4d7)[_0x6ca5d7(0x1e2)](0x0,_0x1eb632);},VisuMZ['BattleSystemATB'][_0x159d68(0x1a1)]=Game_BattlerBase[_0x159d68(0x1d7)][_0x159d68(0x18c)],Game_BattlerBase['prototype'][_0x159d68(0x18c)]=function(){const _0x31db85=_0x159d68;VisuMZ[_0x31db85(0x26a)][_0x31db85(0x1a1)]['call'](this),BattleManager[_0x31db85(0x1e7)]()&&this[_0x31db85(0x151)]();},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x2ac)]=Game_BattlerBase[_0x159d68(0x1d7)]['revive'],Game_BattlerBase[_0x159d68(0x1d7)][_0x159d68(0x229)]=function(){const _0x1c91c9=_0x159d68;VisuMZ[_0x1c91c9(0x26a)][_0x1c91c9(0x2ac)][_0x1c91c9(0x131)](this),BattleManager['isTpb']()&&this['clearTpbChargeTime']();},VisuMZ['BattleSystemATB'][_0x159d68(0x1d9)]=Game_Battler['prototype'][_0x159d68(0xbc)],Game_Battler[_0x159d68(0x1d7)]['initTpbChargeTime']=function(_0x1014b5){const _0x50c59c=_0x159d68;BattleManager[_0x50c59c(0x233)]()?this['initTpbChargeTimeATB'](_0x1014b5):_0x50c59c(0x1db)===_0x50c59c(0x1db)?VisuMZ[_0x50c59c(0x26a)][_0x50c59c(0x1d9)][_0x50c59c(0x131)](this,_0x1014b5):(_0x40ac4e[_0x50c59c(0x26a)][_0x50c59c(0x192)]['call'](this),this[_0x50c59c(0x2c5)]());},Game_Battler[_0x159d68(0x1d7)][_0x159d68(0x200)]=function(_0x48acb0){const _0x5110da=_0x159d68,_0x45c8e0=VisuMZ[_0x5110da(0x26a)][_0x5110da(0x295)]['Mechanics'];let _0x2ef416=this[_0x5110da(0x10d)]()*eval(_0x45c8e0['InitialGaugeJS']);const _0xdad523=this[_0x5110da(0x281)]()[_0x5110da(0x267)](this[_0x5110da(0x28c)]()),_0x209429=/<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0xd01dcc=_0xdad523[_0x5110da(0x285)](_0x590336=>_0x590336&&_0x590336[_0x5110da(0xd1)]['match'](_0x209429)?Number(RegExp['$1'])*0.01:0x0);_0x2ef416=_0xd01dcc[_0x5110da(0x1e4)]((_0x355e9b,_0xf8f48a)=>_0x355e9b+_0xf8f48a,_0x2ef416),this[_0x5110da(0x22a)]=_0x5110da(0x25f),this[_0x5110da(0x1bf)]=(_0x48acb0?0x1:_0x2ef416)[_0x5110da(0x1e2)](0x0,0x1),this[_0x5110da(0x11f)]()&&(this['_tpbChargeTime']=0x0);},Game_Battler['prototype']['isAtbChargingState']=function(){const _0x4af1f5=_0x159d68;return this[_0x4af1f5(0x22a)]==='charging';},Game_Battler[_0x159d68(0x1d7)][_0x159d68(0x1a9)]=function(){const _0x7814db=_0x159d68;return this[_0x7814db(0x22a)]===_0x7814db(0xf0)&&this[_0x7814db(0x18a)]()&&this[_0x7814db(0x18a)]()[_0x7814db(0x25b)]()&&this[_0x7814db(0x18a)]()[_0x7814db(0x25b)]()[_0x7814db(0xc1)]<0x0;},Game_BattlerBase[_0x159d68(0x1d7)][_0x159d68(0x12c)]=function(){const _0x37adff=_0x159d68;if(this['isAtbCastingState']())return this[_0x37adff(0x2bc)]/this[_0x37adff(0x198)]();else{if(_0x37adff(0xf9)!==_0x37adff(0xf9))_0x264b41[_0x37adff(0x2b8)](_0x5ac82d(_0x49ade3['$1'])*0.01);else return 0x0;}},Game_Battler[_0x159d68(0x1d7)]['atbStopped']=function(){return!this['canMove']();},Game_Battler[_0x159d68(0x1d7)][_0x159d68(0x1ad)]=function(_0x4ce4cd){const _0x263f4e=_0x159d68;this[_0x263f4e(0xf6)]=_0x4ce4cd;},VisuMZ['BattleSystemATB'][_0x159d68(0x193)]=Game_Battler[_0x159d68(0x1d7)]['clearTpbChargeTime'],Game_Battler[_0x159d68(0x1d7)][_0x159d68(0x151)]=function(){const _0x42ccc3=_0x159d68;if(this[_0x42ccc3(0x152)])return;VisuMZ['BattleSystemATB']['Game_Battler_clearTpbChargeTime'][_0x42ccc3(0x131)](this),this[_0x42ccc3(0x1bf)]+=this[_0x42ccc3(0xf6)]||0x0;},Game_Battler[_0x159d68(0x1d7)][_0x159d68(0x1cd)]=function(){const _0x34b0a8=_0x159d68;if(!this[_0x34b0a8(0x1a9)]())return;if(!this[_0x34b0a8(0x18a)]())return;if(!this['currentAction']()[_0x34b0a8(0x25b)]())return;if(this[_0x34b0a8(0x18a)]()[_0x34b0a8(0x25b)]()[_0x34b0a8(0xd1)][_0x34b0a8(0x1e8)](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this[_0x34b0a8(0x117)](),this['clearTpbChargeTime'](),this['_tpbCastTime']=0x0,this['onAtbInterrupt']();},Game_Battler[_0x159d68(0x1d7)][_0x159d68(0xe8)]=function(){const _0x8fbff9=_0x159d68,_0xea3c60=VisuMZ[_0x8fbff9(0x26a)][_0x8fbff9(0x295)]['Interrupt'];if(Imported[_0x8fbff9(0x133)]){const _0x488928=_0xea3c60[_0x8fbff9(0xeb)],_0x37a15c=_0xea3c60[_0x8fbff9(0x257)],_0x425d4=_0xea3c60[_0x8fbff9(0x155)];$gameTemp[_0x8fbff9(0x23b)]([this],_0x488928,_0x37a15c,_0x425d4);}if(this['battler']()&&_0xea3c60['InterruptText'][_0x8fbff9(0xfb)]>0x0){const _0x2b9794=_0xea3c60[_0x8fbff9(0xec)],_0x12d4af={'textColor':ColorManager[_0x8fbff9(0x25c)](_0xea3c60[_0x8fbff9(0x231)]),'flashColor':_0xea3c60[_0x8fbff9(0x13e)],'flashDuration':_0xea3c60[_0x8fbff9(0x2b2)]};this['setupTextPopup'](_0x2b9794,_0x12d4af);}},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x296)]=Game_Battler[_0x159d68(0x1d7)]['startTpbCasting'],Game_Battler['prototype'][_0x159d68(0x252)]=function(){const _0x276c44=_0x159d68;VisuMZ['BattleSystemATB']['Game_Battler_startTpbCasting'][_0x276c44(0x131)](this);if(BattleManager[_0x276c44(0x233)]()){if(this[_0x276c44(0x2bc)]>=this[_0x276c44(0x198)]()){if(_0x276c44(0xe0)!=='EEWrm'){const _0xc49a79=_0x26f402['BattleSystemATB']['JS'][_0x1573d9][_0x276c44(0x131)](this,this[_0x276c44(0x1b1)](),_0x21cb3f);_0x3eede9[_0x276c44(0x258)](_0xc49a79);}else this[_0x276c44(0x22a)]=_0x276c44(0x158);}}},VisuMZ[_0x159d68(0x26a)]['Game_Unit_updateTpb']=Game_Unit[_0x159d68(0x1d7)]['updateTpb'],Game_Unit[_0x159d68(0x1d7)]['updateTpb']=function(){const _0x11ba11=_0x159d68;if(BattleManager[_0x11ba11(0x233)]()){if(BattleManager[_0x11ba11(0x1f4)]()[_0x11ba11(0x20b)](_0x4c6cda=>_0x4c6cda&&_0x4c6cda[_0x11ba11(0x294)]()&&_0x4c6cda[_0x11ba11(0x286)]()&&_0x4c6cda[_0x11ba11(0x22a)]===_0x11ba11(0x158)))return;}VisuMZ[_0x11ba11(0x26a)][_0x11ba11(0x2d5)][_0x11ba11(0x131)](this);},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x240)]=Game_Battler[_0x159d68(0x1d7)][_0x159d68(0x1f9)],Game_Battler[_0x159d68(0x1d7)]['onRestrict']=function(){const _0x22edf0=_0x159d68;!VisuMZ[_0x22edf0(0x26a)]['Settings']['Mechanics'][_0x22edf0(0x15b)]&&(this[_0x22edf0(0x152)]=BattleManager[_0x22edf0(0x233)]()),VisuMZ[_0x22edf0(0x26a)][_0x22edf0(0x240)][_0x22edf0(0x131)](this),this[_0x22edf0(0x152)]=undefined;},VisuMZ[_0x159d68(0x26a)]['Game_Battler_applyTpbPenalty']=Game_Battler['prototype']['applyTpbPenalty'],Game_Battler[_0x159d68(0x1d7)][_0x159d68(0x2cc)]=function(){const _0x4a4363=_0x159d68;if(BattleManager[_0x4a4363(0x233)]()){if(_0x4a4363(0x181)===_0x4a4363(0x2c8)){const _0x4dd43b=_0xa154d[_0x4a4363(0x269)];_0x29c2dd[_0x4a4363(0x228)]=new _0xfa8b67(_0x4dd43b,_0x4dd43b);const _0x38f7d5=_0x54b7ca[_0x4a4363(0x25c)](_0x3e0364[_0x4a4363(0x10f)[_0x4a4363(0x222)](_0x4044ea)]),_0x5b3165=_0x1a5e9d[_0x4a4363(0x25c)](_0x2f712d[_0x4a4363(0xd0)[_0x4a4363(0x222)](_0xa73623)]);_0xb12178['bitmap'][_0x4a4363(0x156)](0x0,0x0,_0x4dd43b,_0x4dd43b,_0x38f7d5,_0x5b3165,!![]);}else this[_0x4a4363(0x2cb)]();}else _0x4a4363(0x10e)===_0x4a4363(0x10e)?VisuMZ['BattleSystemATB'][_0x4a4363(0x23a)][_0x4a4363(0x131)](this):(_0x18a65f[_0x4a4363(0x26a)][_0x4a4363(0x26c)]['call'](this),this[_0x4a4363(0x293)]());},Game_Battler[_0x159d68(0x1d7)][_0x159d68(0x2cb)]=function(){const _0x5f7e02=_0x159d68;this[_0x5f7e02(0x22a)]=_0x5f7e02(0x25f),this['_tpbChargeTime']+=VisuMZ[_0x5f7e02(0x26a)][_0x5f7e02(0x295)][_0x5f7e02(0x138)][_0x5f7e02(0x29b)]||0x0;},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x22e)]=Game_Battler['prototype'][_0x159d68(0x241)],Game_Battler[_0x159d68(0x1d7)]['tpbSpeed']=function(){const _0x44acdc=_0x159d68;if(BattleManager[_0x44acdc(0x233)]())return VisuMZ[_0x44acdc(0x26a)][_0x44acdc(0x295)]['Mechanics']['TpbSpeedCalcJS'][_0x44acdc(0x131)](this,this);else{if(_0x44acdc(0x2ab)!==_0x44acdc(0x2ab))_0x298f96['BattleSystemATB']['Settings'][_0x44acdc(0x232)][_0x44acdc(0x203)]&&this[_0x44acdc(0x1c6)](),_0x31dc8c[_0x44acdc(0x26a)][_0x44acdc(0xd6)][_0x44acdc(0x131)](this);else return VisuMZ['BattleSystemATB'][_0x44acdc(0x22e)][_0x44acdc(0x131)](this);}},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x2a5)]=Game_Battler['prototype'][_0x159d68(0x2c0)],Game_Battler['prototype'][_0x159d68(0x2c0)]=function(){const _0x5ea2c0=_0x159d68;return BattleManager[_0x5ea2c0(0x233)]()?VisuMZ['BattleSystemATB'][_0x5ea2c0(0x295)][_0x5ea2c0(0x138)][_0x5ea2c0(0x2d0)][_0x5ea2c0(0x131)](this,this):VisuMZ[_0x5ea2c0(0x26a)][_0x5ea2c0(0x2a5)][_0x5ea2c0(0x131)](this);},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x18b)]=Game_Battler[_0x159d68(0x1d7)]['tpbRelativeSpeed'],Game_Battler['prototype'][_0x159d68(0x10d)]=function(){const _0x19e789=_0x159d68;return BattleManager[_0x19e789(0x233)]()?VisuMZ[_0x19e789(0x26a)][_0x19e789(0x295)][_0x19e789(0x138)][_0x19e789(0x284)]['call'](this,this):VisuMZ['BattleSystemATB'][_0x19e789(0x18b)][_0x19e789(0x131)](this);},VisuMZ['BattleSystemATB']['Game_Battler_tpbAcceleration']=Game_Battler['prototype']['tpbAcceleration'],Game_Battler[_0x159d68(0x1d7)][_0x159d68(0x1a4)]=function(){const _0x4b17e7=_0x159d68;return BattleManager[_0x4b17e7(0x233)]()?this[_0x4b17e7(0x21f)]():VisuMZ['BattleSystemATB'][_0x4b17e7(0x2a6)][_0x4b17e7(0x131)](this);},Game_Battler['prototype'][_0x159d68(0x21f)]=function(){const _0x7da277=_0x159d68;let _0x2cb3fb=VisuMZ[_0x7da277(0x26a)][_0x7da277(0x295)][_0x7da277(0x138)]['TpbAccelerationJS']['call'](this,this);if(ConfigManager&&ConfigManager['atbSpeed']!==undefined){if(_0x7da277(0x1a0)===_0x7da277(0x20e)){if(!this[_0x7da277(0x26f)](_0x972ab5))return;_0x3ff100[_0x7da277(0x26a)][_0x7da277(0x168)][_0x7da277(0x131)](this,_0x130618,_0x3ca03f,_0xe2fec8,_0x2c966d);}else{const _0x16992b=ConfigManager[_0x7da277(0x10b)]-0x3;if(_0x16992b>0x0)return _0x2cb3fb*(_0x16992b*0x2);else{if(_0x16992b<0x0)return _0x2cb3fb*(0x1/(_0x16992b*-0x2));}}}return _0x2cb3fb;},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x246)]=Game_Battler['prototype'][_0x159d68(0x198)],Game_Battler['prototype'][_0x159d68(0x198)]=function(){const _0x546e62=_0x159d68;if(BattleManager[_0x546e62(0x233)]())return VisuMZ[_0x546e62(0x26a)][_0x546e62(0x295)]['Mechanics'][_0x546e62(0x1ea)]['call'](this,this);else{if('KxiDd'==='rbgZV'){const _0x566389=_0x3c674c[_0x546e62(0x26a)][_0x546e62(0x2da)]['call'](this);return _0x566389[_0x546e62(0x212)]=this[_0x546e62(0x212)],_0x566389;}else return VisuMZ['BattleSystemATB'][_0x546e62(0x246)][_0x546e62(0x131)](this);}},VisuMZ[_0x159d68(0x26a)]['Scene_Options_maxCommands']=Scene_Options['prototype'][_0x159d68(0x1b7)],Scene_Options['prototype']['maxCommands']=function(){const _0x468d18=_0x159d68;let _0x5ddc69=VisuMZ[_0x468d18(0x26a)][_0x468d18(0x169)][_0x468d18(0x131)](this);const _0x2670f6=VisuMZ[_0x468d18(0x26a)][_0x468d18(0x295)];if(_0x2670f6[_0x468d18(0x272)][_0x468d18(0x176)]&&_0x2670f6[_0x468d18(0x272)][_0x468d18(0xc9)]&&BattleManager['isATB']())_0x5ddc69++;return _0x5ddc69;},Sprite_Battler[_0x159d68(0x1d7)][_0x159d68(0x1c6)]=function(){const _0x3561a2=_0x159d68;if(!BattleManager[_0x3561a2(0x233)]())return;if(!ConfigManager[_0x3561a2(0x212)])return;const _0x2ee79e=VisuMZ['BattleSystemATB']['Settings']['Gauge'],_0x47ef00=new Sprite_Gauge();_0x47ef00[_0x3561a2(0x132)]['x']=_0x2ee79e[_0x3561a2(0xbe)],_0x47ef00[_0x3561a2(0x132)]['y']=_0x2ee79e[_0x3561a2(0x28b)],_0x47ef00['scale']['x']=_0x47ef00['scale']['y']=_0x2ee79e[_0x3561a2(0x175)],this[_0x3561a2(0x21e)]=_0x47ef00,this[_0x3561a2(0x1e6)](this['_atbGaugeSprite']);},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x1e9)]=Sprite_Battler[_0x159d68(0x1d7)][_0x159d68(0x24a)],Sprite_Battler['prototype'][_0x159d68(0x24a)]=function(_0x3020ec){const _0x42fd5=_0x159d68;VisuMZ[_0x42fd5(0x26a)][_0x42fd5(0x1e9)]['call'](this,_0x3020ec),this['setupAtbGaugeSprite'](_0x3020ec),this['updateAtbGaugeSpriteVisibility']();},Sprite_Battler[_0x159d68(0x1d7)][_0x159d68(0x11b)]=function(_0x79e737){const _0x19e7f2=_0x159d68;if(!_0x79e737)return;if(!this[_0x19e7f2(0x21e)])return;if(_0x79e737[_0x19e7f2(0x28f)]()){}else{if(_0x79e737[_0x19e7f2(0x167)]()){if('huPcz'!==_0x19e7f2(0x14d))return _0x225c48[_0x19e7f2(0x26a)][_0x19e7f2(0x246)]['call'](this);else{if(this['constructor']===Sprite_Enemy&&_0x79e737['hasSvBattler']())return;if(this[_0x19e7f2(0x183)]===Sprite_SvEnemy&&!_0x79e737['hasSvBattler']())return;}}}this[_0x19e7f2(0x21e)][_0x19e7f2(0x161)](_0x79e737,'time');},Sprite_Battler[_0x159d68(0x1d7)][_0x159d68(0x23c)]=function(){const _0x2d4140=_0x159d68;if(!this[_0x2d4140(0x21e)])return;const _0x3837b3=this[_0x2d4140(0x23f)]&&this['_battler']['isAppeared']()&&!this[_0x2d4140(0x23f)][_0x2d4140(0x245)]();this[_0x2d4140(0x21e)][_0x2d4140(0x119)]=_0x3837b3,this[_0x2d4140(0x2d4)]&&this[_0x2d4140(0x2d4)][_0x2d4140(0x21e)]&&(this[_0x2d4140(0x2d4)]['_atbGaugeSprite'][_0x2d4140(0x119)]=_0x3837b3);},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x279)]=Sprite_Battler[_0x159d68(0x1d7)][_0x159d68(0x15c)],Sprite_Battler[_0x159d68(0x1d7)][_0x159d68(0x15c)]=function(){const _0x1849c2=_0x159d68;VisuMZ['BattleSystemATB'][_0x1849c2(0x279)][_0x1849c2(0x131)](this),this[_0x1849c2(0xc7)]();},Sprite_Battler[_0x159d68(0x1d7)][_0x159d68(0xc7)]=function(){const _0x500ea9=_0x159d68;if(!this[_0x500ea9(0x23f)])return;if(!this[_0x500ea9(0x21e)])return;const _0x248d15=VisuMZ[_0x500ea9(0x26a)]['Settings'][_0x500ea9(0x232)],_0x110869=this['_atbGaugeSprite'];let _0x3394b1=_0x248d15['OffsetX'];if(this['_battler'][_0x500ea9(0x2bd)]){if('eJjpY'!==_0x500ea9(0x2a0))_0x3394b1+=this['_battler'][_0x500ea9(0x2bd)]();else{const _0x579cc8=this[_0x500ea9(0x235)]();if(!_0x579cc8)return;const _0x113213=_0x579cc8[_0x500ea9(0x235)]();if(!_0x113213)return;const _0x59175c=_0x113213[_0x500ea9(0x28e)]();if(!_0x59175c)return;this['setBlendColor'](_0x59175c[_0x500ea9(0x17c)]);}}let _0x53610e=_0x248d15[_0x500ea9(0x129)];if(this[_0x500ea9(0x23f)]['battleUIOffsetY']){if(_0x500ea9(0x15a)===_0x500ea9(0x15a))_0x53610e+=this[_0x500ea9(0x23f)][_0x500ea9(0x10a)]();else return _0x47ee7a=_0x5b3d2f(_0x4366af),_0xfbedfa['match'](/#(.*)/i)?_0x500ea9(0x1d4)[_0x500ea9(0x222)](_0x3daf96(_0x51b0de['$1'])):this[_0x500ea9(0x238)](_0x277d4f(_0x3f09b9));}_0x110869['x']=_0x3394b1,_0x110869['y']=-this[_0x500ea9(0x2b0)]+_0x53610e;if(this['_battler']['isEnemy']()){if(this['_battler']['enemy']()[_0x500ea9(0xd1)][_0x500ea9(0x1e8)](/<HIDE (?:ATB|TPB) GAUGE>/i)){if('uyJbi'===_0x500ea9(0x2a3))_0x110869[_0x500ea9(0x119)]=![];else return _0x50a99c['Settings'][_0x500ea9(0x283)];}}if(this[_0x500ea9(0x2ae)]()){if(_0x500ea9(0x2b3)===_0x500ea9(0x19b)){const _0x1a6d13=_0x4f1dbc[_0x500ea9(0x295)],_0x4f4c56=_0x1a6d13[_0x500ea9(0x269)],_0x2ddad7=this[_0x500ea9(0x275)];this[_0x500ea9(0x12a)][_0x500ea9(0x228)]=new _0xdafeb(_0x4f4c56,_0x4f4c56);const _0x2b8d05=this[_0x500ea9(0x12a)][_0x500ea9(0x228)],_0x30c6bc=_0x1155fc[_0x500ea9(0x2dd)],_0x427d40=_0x53ebc0[_0x500ea9(0x11e)],_0x3dc474=_0xbd7df[_0x500ea9(0x2dd)],_0x19d026=_0x4def65[_0x500ea9(0x11e)],_0x57e830=_0x2ddad7%0x4*_0x30c6bc+(_0x30c6bc-_0x3dc474)/0x2,_0x24b4bf=_0x4d2cf6[_0x500ea9(0x14e)](_0x2ddad7/0x4)*_0x427d40+(_0x427d40-_0x19d026)/0x2;_0x2b8d05[_0x500ea9(0x174)](_0x26a063,_0x57e830,_0x24b4bf,_0x3dc474,_0x19d026,0x0,0x0,_0x4f4c56,_0x4f4c56);}else _0x110869['y']+=_0x110869[_0x500ea9(0x220)]()*_0x248d15[_0x500ea9(0x175)]-0x1;}this[_0x500ea9(0xee)]['x']<0x0&&(_0x110869[_0x500ea9(0xee)]['x']=-Math[_0x500ea9(0x101)](_0x110869[_0x500ea9(0xee)]['x']));},Sprite_Battler[_0x159d68(0x1d7)][_0x159d68(0x2ae)]=function(){const _0x3a559f=_0x159d68;if(!Imported[_0x3a559f(0x1a3)])return![];if(this['_battler']&&this[_0x3a559f(0x23f)]['isEnemy']())return![];const _0x257dfe=VisuMZ[_0x3a559f(0x1f1)][_0x3a559f(0x295)]['Aggro'];if(!_0x257dfe[_0x3a559f(0x107)])return![];if(!ConfigManager[_0x3a559f(0x154)])return![];const _0x46c5f1=VisuMZ['BattleSystemATB'][_0x3a559f(0x295)][_0x3a559f(0x232)];return _0x257dfe[_0x3a559f(0x175)]===_0x46c5f1['Scale']&&_0x257dfe[_0x3a559f(0xbe)]===_0x46c5f1[_0x3a559f(0xbe)]&&_0x257dfe[_0x3a559f(0x28b)]===_0x46c5f1[_0x3a559f(0x28b)]&&_0x257dfe['OffsetX']===_0x46c5f1[_0x3a559f(0x178)]&&_0x257dfe[_0x3a559f(0x129)]===_0x46c5f1['OffsetY']&&!![];},VisuMZ['BattleSystemATB'][_0x159d68(0x264)]=Sprite_Battler[_0x159d68(0x1d7)][_0x159d68(0x171)],Sprite_Battler[_0x159d68(0x1d7)]['update']=function(){const _0x2cb77d=_0x159d68;VisuMZ[_0x2cb77d(0x26a)][_0x2cb77d(0x264)][_0x2cb77d(0x131)](this),!this[_0x2cb77d(0x23f)]&&this[_0x2cb77d(0x21e)]&&(this['_atbGaugeSprite']['visible']=![],this['_svBattlerSprite']&&(this[_0x2cb77d(0x2d4)]['_atbGaugeSprite'][_0x2cb77d(0x119)]=![]));},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x2d2)]=Sprite_Actor[_0x159d68(0x1d7)]['createStateSprite'],Sprite_Actor[_0x159d68(0x1d7)][_0x159d68(0x19e)]=function(){const _0x3e647d=_0x159d68;VisuMZ[_0x3e647d(0x26a)][_0x3e647d(0x2d2)][_0x3e647d(0x131)](this),VisuMZ['BattleSystemATB'][_0x3e647d(0x295)]['Gauge'][_0x3e647d(0xed)]&&(_0x3e647d(0x164)!==_0x3e647d(0x180)?this[_0x3e647d(0x1c6)]():this[_0x3e647d(0xe7)](this[_0x3e647d(0x1bf)]+_0x37f91f));},VisuMZ[_0x159d68(0x26a)]['Sprite_Enemy_createStateIconSprite']=Sprite_Enemy[_0x159d68(0x1d7)][_0x159d68(0x134)],Sprite_Enemy[_0x159d68(0x1d7)][_0x159d68(0x134)]=function(){const _0x55570f=_0x159d68;if(VisuMZ[_0x55570f(0x26a)][_0x55570f(0x295)][_0x55570f(0x232)]['ShowEnemyGauge']){if(_0x55570f(0x1b4)!==_0x55570f(0x1b4))return _0x31e3b0['isATB']()?_0x1821f6['BattleSystemATB']['Settings'][_0x55570f(0x138)][_0x55570f(0x214)][_0x55570f(0x131)](this,this):_0x22f56e[_0x55570f(0x26a)][_0x55570f(0x22e)][_0x55570f(0x131)](this);else this[_0x55570f(0x1c6)]();}VisuMZ['BattleSystemATB'][_0x55570f(0xd6)][_0x55570f(0x131)](this);},VisuMZ[_0x159d68(0x26a)]['Sprite_Enemy_startEffect']=Sprite_Enemy[_0x159d68(0x1d7)][_0x159d68(0x262)],Sprite_Enemy[_0x159d68(0x1d7)][_0x159d68(0x262)]=function(_0x2e6a5a){const _0x1f77d9=_0x159d68;VisuMZ[_0x1f77d9(0x26a)]['Sprite_Enemy_startEffect'][_0x1f77d9(0x131)](this,_0x2e6a5a),(_0x2e6a5a===_0x1f77d9(0x274)||_0x1f77d9(0x242))&&this['updateAtbGaugeSpriteVisibility']();},VisuMZ[_0x159d68(0x26a)]['Game_BattlerBase_appear']=Game_BattlerBase[_0x159d68(0x1d7)]['appear'],Game_BattlerBase[_0x159d68(0x1d7)][_0x159d68(0x274)]=function(){const _0x2882af=_0x159d68;VisuMZ[_0x2882af(0x26a)][_0x2882af(0xf2)][_0x2882af(0x131)](this),this[_0x2882af(0x167)]()&&BattleManager[_0x2882af(0x233)]()&&this[_0x2882af(0x235)]()&&('YNrWA'!==_0x2882af(0x237)?_0x3fc197[_0x2882af(0x233)]()?this[_0x2882af(0x200)](_0x18ef8e):_0x2c94c6[_0x2882af(0x26a)][_0x2882af(0x1d9)][_0x2882af(0x131)](this,_0x2d3e33):(this['battler']()[_0x2882af(0x1d8)]=!![],this[_0x2882af(0x235)]()[_0x2882af(0x23c)]()));},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x247)]=Sprite_Gauge[_0x159d68(0x1d7)]['gaugeColor1'],Sprite_Gauge[_0x159d68(0x1d7)][_0x159d68(0x2ba)]=function(){const _0x303126=_0x159d68;if(this[_0x303126(0x219)]==='time')return this[_0x303126(0x27f)](0x1);return VisuMZ['BattleSystemATB'][_0x303126(0x247)][_0x303126(0x131)](this);},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x13d)]=Sprite_Gauge['prototype'][_0x159d68(0x1fc)],Sprite_Gauge['prototype']['gaugeColor2']=function(){const _0x3162b4=_0x159d68;if(this[_0x3162b4(0x219)]===_0x3162b4(0x1d3))return this['atbGaugeColor'](0x2);return VisuMZ['BattleSystemATB']['Sprite_Gauge_gaugeColor2'][_0x3162b4(0x131)](this);},Sprite_Gauge['prototype'][_0x159d68(0x27f)]=function(_0x30264b){const _0x24e3a5=_0x159d68;if(!this[_0x24e3a5(0x23f)])return ColorManager[_0x24e3a5(0x248)](_0x24e3a5(0x208)[_0x24e3a5(0x222)](_0x30264b));if(this[_0x24e3a5(0x23f)][_0x24e3a5(0x13a)]())return ColorManager['atbColor'](_0x24e3a5(0x21d)[_0x24e3a5(0x222)](_0x30264b));if(this[_0x24e3a5(0x23f)]['isAtbCastingState']())return ColorManager[_0x24e3a5(0x248)](_0x24e3a5(0x26b)[_0x24e3a5(0x222)](_0x30264b));if(this[_0x24e3a5(0x125)]()>=0x1)return ColorManager['atbColor'](_0x24e3a5(0x239)[_0x24e3a5(0x222)](_0x30264b));const _0x2437d7=VisuMZ['BattleSystemATB']['Settings']['Gauge'],_0x46514f=this[_0x24e3a5(0x23f)]['paramRate'](0x6)*this[_0x24e3a5(0x23f)][_0x24e3a5(0x273)](0x6);if(_0x46514f<=_0x2437d7[_0x24e3a5(0x1c2)])return ColorManager[_0x24e3a5(0x248)](_0x24e3a5(0xdb)['format'](_0x30264b));if(_0x46514f>=_0x2437d7['FastRate'])return ColorManager[_0x24e3a5(0x248)](_0x24e3a5(0x173)[_0x24e3a5(0x222)](_0x30264b));return ColorManager[_0x24e3a5(0x248)](_0x24e3a5(0x208)[_0x24e3a5(0x222)](_0x30264b));},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x166)]=Sprite_Gauge[_0x159d68(0x1d7)]['currentValue'],Sprite_Gauge[_0x159d68(0x1d7)][_0x159d68(0x29a)]=function(){const _0x5aed55=_0x159d68;if(this[_0x5aed55(0x23f)]&&this[_0x5aed55(0x219)]===_0x5aed55(0x1d3))return this[_0x5aed55(0xe4)]();return VisuMZ[_0x5aed55(0x26a)]['Sprite_Gauge_currentValue'][_0x5aed55(0x131)](this);},Sprite_Gauge[_0x159d68(0x1d7)][_0x159d68(0xe4)]=function(){const _0x7e0e01=_0x159d68;return this[_0x7e0e01(0x23f)][_0x7e0e01(0x1a9)]()?Math[_0x7e0e01(0x23d)](this['_battler'][_0x7e0e01(0x2bc)],0x0):VisuMZ[_0x7e0e01(0x26a)][_0x7e0e01(0x166)]['call'](this);},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x1f5)]=Sprite_Gauge[_0x159d68(0x1d7)]['currentMaxValue'],Sprite_Gauge[_0x159d68(0x1d7)][_0x159d68(0x122)]=function(){const _0x4179fc=_0x159d68;if(this[_0x4179fc(0x23f)]&&this[_0x4179fc(0x219)]===_0x4179fc(0x1d3))return this[_0x4179fc(0x205)]();return VisuMZ[_0x4179fc(0x26a)][_0x4179fc(0x1f5)]['call'](this);},Sprite_Gauge[_0x159d68(0x1d7)][_0x159d68(0x205)]=function(){const _0x9f67ee=_0x159d68;return this[_0x9f67ee(0x23f)]['isAtbCastingState']()?Math[_0x9f67ee(0x23d)](this['_battler'][_0x9f67ee(0x198)](),0x1):_0x9f67ee(0x120)===_0x9f67ee(0x120)?VisuMZ[_0x9f67ee(0x26a)][_0x9f67ee(0x1f5)][_0x9f67ee(0x131)](this):this['battler']();},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x218)]=Window_Help[_0x159d68(0x1d7)][_0x159d68(0x123)],Window_Help[_0x159d68(0x1d7)][_0x159d68(0x123)]=function(_0x125229){const _0x3bac24=_0x159d68;BattleManager[_0x3bac24(0x233)]()&&_0x125229&&_0x125229[_0x3bac24(0xd1)]&&_0x125229[_0x3bac24(0xd1)][_0x3bac24(0x1e8)](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)?this['setText'](String(RegExp['$1'])):VisuMZ[_0x3bac24(0x26a)][_0x3bac24(0x218)][_0x3bac24(0x131)](this,_0x125229);},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x168)]=Window_StatusBase[_0x159d68(0x1d7)]['placeGauge'],Window_StatusBase[_0x159d68(0x1d7)][_0x159d68(0x189)]=function(_0x23d957,_0x11fe7d,_0xcc0ee,_0x45882d){const _0x2fb5f3=_0x159d68;if(!this['showVisualAtbGauge'](_0x11fe7d))return;VisuMZ[_0x2fb5f3(0x26a)][_0x2fb5f3(0x168)][_0x2fb5f3(0x131)](this,_0x23d957,_0x11fe7d,_0xcc0ee,_0x45882d);},Window_StatusBase['prototype'][_0x159d68(0x26f)]=function(_0x43397e){const _0x3ba443=_0x159d68;if(_0x43397e!==_0x3ba443(0x1d3))return!![];if(![_0x3ba443(0x22b),'Window_SideviewUiBattleStatus'][_0x3ba443(0x249)](this[_0x3ba443(0x183)]['name']))return![];if(!BattleManager['isATB']())return![];if(!ConfigManager[_0x3ba443(0x212)])return![];return VisuMZ[_0x3ba443(0x26a)][_0x3ba443(0x295)]['Gauge'][_0x3ba443(0xe3)];},VisuMZ['BattleSystemATB'][_0x159d68(0x192)]=Window_Options[_0x159d68(0x1d7)][_0x159d68(0x1a6)],Window_Options[_0x159d68(0x1d7)][_0x159d68(0x1a6)]=function(){const _0x405fa1=_0x159d68;VisuMZ[_0x405fa1(0x26a)][_0x405fa1(0x192)][_0x405fa1(0x131)](this),this[_0x405fa1(0x2c5)]();},Window_Options[_0x159d68(0x1d7)][_0x159d68(0x2c5)]=function(){const _0x10f057=_0x159d68;if(!BattleManager[_0x10f057(0x233)]())return;if(VisuMZ['BattleSystemATB'][_0x10f057(0x295)][_0x10f057(0x272)][_0x10f057(0x176)]){if(_0x10f057(0xc6)!==_0x10f057(0xc6)){const _0x1a85b5=this[_0x10f057(0x235)]();if(!_0x1a85b5)return;const _0x297503=_0x3f3e3b[_0x10f057(0x295)],_0x405724=this[_0x10f057(0x243)](),_0x274284=this[_0x10f057(0x14a)](),_0x5816ed=_0x28d1c2?_0x230581:_0x297503[_0x10f057(0x25e)];if(_0x405724&&this['x']!==_0x274284){if(this['x']>_0x274284)this['x']=_0x44585b[_0x10f057(0x23d)](_0x274284,this['x']-_0x5816ed);if(this['x']<_0x274284)this['x']=_0x3a2ca2['min'](_0x274284,this['x']+_0x5816ed);}else{if(!_0x405724&&this['x']!==_0x274284){if(this['y']>_0x274284)this['y']=_0x5ed66d[_0x10f057(0x23d)](_0x274284,this['y']-_0x5816ed);if(this['y']<_0x274284)this['y']=_0x3c6d6f[_0x10f057(0x11d)](_0x274284,this['y']+_0x5816ed);}}}else this[_0x10f057(0x1b2)]();}},Window_Options[_0x159d68(0x1d7)][_0x159d68(0x1b2)]=function(){const _0x23e54b=_0x159d68,_0x33aa63=TextManager[_0x23e54b(0x212)],_0x15ab31=_0x23e54b(0x212);this['addCommand'](_0x33aa63,_0x15ab31);},Game_BattlerBase[_0x159d68(0x1d7)][_0x159d68(0x190)]=function(){const _0x54dc75=_0x159d68;delete this['_fieldAtbGaugeGraphicType'],delete this[_0x54dc75(0x1b3)],delete this[_0x54dc75(0x103)],delete this[_0x54dc75(0x1cb)];},Game_BattlerBase['prototype'][_0x159d68(0x271)]=function(){const _0x4e3c50=_0x159d68;return this[_0x4e3c50(0x20a)]===undefined&&(this[_0x4e3c50(0x20a)]=this[_0x4e3c50(0xc5)]()),this[_0x4e3c50(0x20a)];},Game_BattlerBase[_0x159d68(0x1d7)][_0x159d68(0xc5)]=function(){const _0x268a64=_0x159d68;return Sprite_FieldGaugeATB[_0x268a64(0x295)][_0x268a64(0x2d7)];},Game_BattlerBase[_0x159d68(0x1d7)]['fieldAtbGraphicFaceName']=function(){const _0x3b398a=_0x159d68;if(this[_0x3b398a(0x1b3)]===undefined){if('qIJCt'!=='qIJCt')return _0x519e2d[_0x3b398a(0x17e)]&&_0x846fa4['description'][_0x3b398a(0x249)]('['+_0x1a94ea+']');else this[_0x3b398a(0x1b3)]=this[_0x3b398a(0x16d)]();}return this['_fieldAtbGaugeFaceName'];},Game_BattlerBase[_0x159d68(0x1d7)][_0x159d68(0x16d)]=function(){const _0x4299b5=_0x159d68;return Sprite_FieldGaugeATB[_0x4299b5(0x295)]['EnemyBattlerFaceName'];},Game_BattlerBase['prototype'][_0x159d68(0x12f)]=function(){const _0x516213=_0x159d68;return this[_0x516213(0x103)]===undefined&&(this[_0x516213(0x103)]=this[_0x516213(0x253)]()),this[_0x516213(0x103)];},Game_BattlerBase[_0x159d68(0x1d7)][_0x159d68(0x253)]=function(){const _0x30313e=_0x159d68;return Sprite_FieldGaugeATB['Settings'][_0x30313e(0x283)];},Game_BattlerBase[_0x159d68(0x1d7)][_0x159d68(0x24e)]=function(){const _0x5ccc0d=_0x159d68;return this['_fieldAtbGaugeIconIndex']===undefined&&(this['_fieldAtbGaugeIconIndex']=this[_0x5ccc0d(0x13b)]()),this[_0x5ccc0d(0x1cb)];},Game_BattlerBase['prototype'][_0x159d68(0x13b)]=function(){const _0x5e4db8=_0x159d68;return Sprite_FieldGaugeATB['Settings'][_0x5e4db8(0xf5)];},Game_BattlerBase['prototype'][_0x159d68(0x2c1)]=function(_0x3d7f67){const _0x46b8cd=_0x159d68;this[_0x46b8cd(0x1cb)]=_0x3d7f67;},Game_Actor[_0x159d68(0x1d7)][_0x159d68(0xc5)]=function(){const _0x318b7=_0x159d68,_0x489a1a=this['actor']()[_0x318b7(0xd1)];if(_0x489a1a['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x489a1a[_0x318b7(0x1e8)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return'icon';}return Sprite_FieldGaugeATB['Settings'][_0x318b7(0x1b5)];},Game_Actor['prototype'][_0x159d68(0x2c2)]=function(){const _0x2ae7fe=_0x159d68,_0x1bfaf7=this['actor']()['note'];if(_0x1bfaf7[_0x2ae7fe(0x1e8)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x2ae7fe(0x2a7)]();},Game_Actor[_0x159d68(0x1d7)][_0x159d68(0x12f)]=function(){const _0x13ac89=_0x159d68,_0x347f54=this['actor']()[_0x13ac89(0xd1)];if(_0x347f54['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x13ac89(0x250)!==_0x13ac89(0x100))return Number(RegExp['$2']);else this['initialize'](...arguments);}return this[_0x13ac89(0x297)]();},Game_Actor[_0x159d68(0x1d7)][_0x159d68(0x13b)]=function(){const _0x1e9de4=_0x159d68,_0x16b591=this['actor']()[_0x1e9de4(0xd1)];if(_0x16b591['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x1e9de4(0x295)][_0x1e9de4(0x290)];},Game_Enemy['prototype']['createFieldAtbGraphicType']=function(){const _0x16f0e6=_0x159d68,_0x116ead=this[_0x16f0e6(0x1a7)]()['note'];if(_0x116ead[_0x16f0e6(0x1e8)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x16f0e6(0xf7)===_0x16f0e6(0xf7))return _0x16f0e6(0x20d);else{const _0x40a693=_0x176b23[_0x16f0e6(0x10b)]-0x3;if(_0x40a693>0x0)return _0x1d4927*(_0x40a693*0x2);else{if(_0x40a693<0x0)return _0x1f4aa8*(0x1/(_0x40a693*-0x2));}}}else{if(_0x116ead['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x16f0e6(0x139);}return Sprite_FieldGaugeATB[_0x16f0e6(0x295)]['EnemyBattlerType'];},Game_Enemy[_0x159d68(0x1d7)][_0x159d68(0x16d)]=function(){const _0x59de4b=_0x159d68,_0x93541d=this[_0x59de4b(0x1a7)]()['note'];if(_0x93541d[_0x59de4b(0x1e8)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return'hhVrs'===_0x59de4b(0x2ad)?String(RegExp['$1']):_0x22e872[_0x59de4b(0x26a)][_0x59de4b(0x166)][_0x59de4b(0x131)](this);return Sprite_FieldGaugeATB[_0x59de4b(0x295)]['EnemyBattlerFaceName'];},Game_Enemy[_0x159d68(0x1d7)][_0x159d68(0x253)]=function(){const _0x3c3490=_0x159d68,_0x440cdc=this[_0x3c3490(0x1a7)]()[_0x3c3490(0xd1)];if(_0x440cdc[_0x3c3490(0x1e8)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x3c3490(0x145)===_0x3c3490(0x145)?Number(RegExp['$2']):!this[_0x3c3490(0x1bc)]();return Sprite_FieldGaugeATB[_0x3c3490(0x295)][_0x3c3490(0x283)];},Game_Enemy[_0x159d68(0x1d7)][_0x159d68(0x13b)]=function(){const _0x5d9239=_0x159d68,_0x2ce57e=this[_0x5d9239(0x1a7)]()[_0x5d9239(0xd1)];if(_0x2ce57e[_0x5d9239(0x1e8)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB['Settings']['EnemyBattlerIcon'];},VisuMZ[_0x159d68(0x26a)][_0x159d68(0x196)]=Scene_Battle[_0x159d68(0x1d7)]['createAllWindows'],Scene_Battle['prototype'][_0x159d68(0x16b)]=function(){const _0x4ac456=_0x159d68;this['createFieldGaugeContainerATB'](),VisuMZ[_0x4ac456(0x26a)]['Scene_Battle_createAllWindows']['call'](this),this[_0x4ac456(0x1cc)]();},Scene_Battle[_0x159d68(0x1d7)][_0x159d68(0x1ce)]=function(){const _0x4ce348=_0x159d68;if(!BattleManager['isATB']())return;if(!Sprite_FieldGaugeATB[_0x4ce348(0x295)]['UseFieldGauge'])return;if(!ConfigManager[_0x4ce348(0x212)])return;this[_0x4ce348(0xd4)]=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0x58c8e4=this[_0x4ce348(0xe9)](this['_windowLayer']);this['addChildAt'](this[_0x4ce348(0xd4)],_0x58c8e4);},Scene_Battle[_0x159d68(0x1d7)][_0x159d68(0x1cc)]=function(){const _0xf2ecb=_0x159d68;if(!BattleManager[_0xf2ecb(0x233)]())return;if(!Sprite_FieldGaugeATB['Settings'][_0xf2ecb(0xdc)])return;if(!ConfigManager[_0xf2ecb(0x212)])return;this[_0xf2ecb(0x266)]=new Sprite_FieldGaugeATB(),this['_fieldGaugeATB_Container']['addChild'](this[_0xf2ecb(0x266)]);};function Sprite_FieldGaugeATB(){const _0x784ecf=_0x159d68;this[_0x784ecf(0x18f)](...arguments);}Sprite_FieldGaugeATB['prototype']=Object['create'](Sprite[_0x159d68(0x1d7)]),Sprite_FieldGaugeATB[_0x159d68(0x1d7)][_0x159d68(0x183)]=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB[_0x159d68(0x295)]=JsonEx[_0x159d68(0xdd)](VisuMZ['BattleSystemATB'][_0x159d68(0x295)]['FieldGauge']),Sprite_FieldGaugeATB[_0x159d68(0x1d7)][_0x159d68(0x18f)]=function(){const _0x4e349a=_0x159d68;Sprite['prototype'][_0x4e349a(0x18f)][_0x4e349a(0x131)](this),this[_0x4e349a(0x288)](),this[_0x4e349a(0xf1)](),this[_0x4e349a(0xd5)]();},Sprite_FieldGaugeATB[_0x159d68(0x1d7)]['initMembers']=function(){const _0x38a034=_0x159d68;this[_0x38a034(0x132)]['x']=0.5,this[_0x38a034(0x132)]['y']=0.5;},Sprite_FieldGaugeATB[_0x159d68(0x1d7)][_0x159d68(0x243)]=function(){const _0x706866=_0x159d68;if(this[_0x706866(0x1c0)]!==undefined)return this[_0x706866(0x1c0)];const _0x34b883=Sprite_FieldGaugeATB[_0x706866(0x295)][_0x706866(0x1d0)];return this[_0x706866(0x1c0)]=[_0x706866(0x153),_0x706866(0xda)]['includes'](_0x34b883),this['_horz'];},Sprite_FieldGaugeATB[_0x159d68(0x1d7)]['setHomeLocation']=function(){const _0x1566a1=_0x159d68,_0x4ab0e1=Sprite_FieldGaugeATB[_0x1566a1(0x295)][_0x1566a1(0x1d0)][_0x1566a1(0x287)]()[_0x1566a1(0x2db)](),_0x4f8be3=Window_Base[_0x1566a1(0x1d7)][_0x1566a1(0x10c)](),_0x50c720=SceneManager[_0x1566a1(0x2d8)]['_statusWindow']['height']+Math[_0x1566a1(0x1fa)](_0x4f8be3*0.5);this['_homeX']=0x0,this['_homeY']=0x0;switch(_0x4ab0e1){case'top':this[_0x1566a1(0x213)]=Math[_0x1566a1(0x1fa)](Graphics['boxWidth']*0.5),this[_0x1566a1(0xbf)]=0x60;break;case _0x1566a1(0xda):this[_0x1566a1(0x213)]=Math[_0x1566a1(0x1fa)](Graphics[_0x1566a1(0x114)]*0.5),this[_0x1566a1(0xbf)]=Graphics[_0x1566a1(0x1bd)]-_0x50c720;break;case _0x1566a1(0x1ed):this['_homeX']=0x50,this[_0x1566a1(0xbf)]=Math[_0x1566a1(0x1fa)]((Graphics[_0x1566a1(0x1bd)]-_0x50c720)/0x2);break;case'right':this['_homeX']=Graphics[_0x1566a1(0x114)]-0x50,this[_0x1566a1(0xbf)]=Math[_0x1566a1(0x1fa)]((Graphics[_0x1566a1(0x1bd)]-_0x50c720)/0x2);break;}this['_homeX']+=Sprite_FieldGaugeATB[_0x1566a1(0x295)][_0x1566a1(0xc2)]||0x0,this[_0x1566a1(0xbf)]+=Sprite_FieldGaugeATB[_0x1566a1(0x295)]['DisplayOffsetY']||0x0,this['x']=this[_0x1566a1(0x213)],this['y']=this[_0x1566a1(0xbf)];},Sprite_FieldGaugeATB[_0x159d68(0x1d7)][_0x159d68(0xd5)]=function(){this['createFieldGaugeSkin'](),this['createGaugeSprite'](),this['createBattlerContainer']();},Sprite_FieldGaugeATB['prototype'][_0x159d68(0x1c9)]=function(){const _0x296cac=_0x159d68;this[_0x296cac(0x1fe)]=new Sprite(),this[_0x296cac(0x1fe)][_0x296cac(0x132)]['x']=0.5,this[_0x296cac(0x1fe)][_0x296cac(0x132)]['y']=0.5,this[_0x296cac(0x1e6)](this[_0x296cac(0x1fe)]);const _0xc2c649=Sprite_FieldGaugeATB['Settings'][_0x296cac(0x234)];if(_0xc2c649)this[_0x296cac(0x1fe)][_0x296cac(0x228)]=ImageManager[_0x296cac(0xde)](_0xc2c649);},Sprite_FieldGaugeATB[_0x159d68(0x1d7)][_0x159d68(0x215)]=function(){const _0x350db7=_0x159d68;this[_0x350db7(0x204)]=new Sprite(),this[_0x350db7(0x1e6)](this[_0x350db7(0x204)]),this[_0x350db7(0x2d6)]();},Sprite_FieldGaugeATB[_0x159d68(0x1d7)][_0x159d68(0x2d6)]=function(){const _0x475478=_0x159d68,_0x1f7040=Sprite_FieldGaugeATB[_0x475478(0x295)],_0x54e703=this['isGaugeHorizontal'](),_0x309064=_0x54e703?_0x1f7040[_0x475478(0x1ba)]:_0x1f7040[_0x475478(0x17a)],_0x4fb35e=_0x54e703?_0x1f7040[_0x475478(0x17a)]:_0x1f7040[_0x475478(0x277)];this[_0x475478(0x204)]['bitmap']=new Bitmap(_0x309064,_0x4fb35e),this['drawGaugeBitmap'](),this['_gaugeSprite']['x']=Math[_0x475478(0x225)](_0x309064/-0x2),this[_0x475478(0x204)]['y']=Math[_0x475478(0x225)](_0x4fb35e/-0x2);},Sprite_FieldGaugeATB['prototype'][_0x159d68(0x261)]=function(){const _0x509a70=_0x159d68;if(!Sprite_FieldGaugeATB[_0x509a70(0x295)][_0x509a70(0x106)])return;const _0xcdaba0=Sprite_FieldGaugeATB[_0x509a70(0x295)],_0x44c902=this[_0x509a70(0x204)][_0x509a70(0x228)],_0x2b4a66=_0x44c902[_0x509a70(0x2dc)],_0x55b514=_0x44c902[_0x509a70(0x2b0)],_0x2d086f=ColorManager[_0x509a70(0x150)](),_0x2c7619=ColorManager['ctGaugeColor1'](),_0x49ee40=ColorManager['ctGaugeColor2'](),_0x46d070=ColorManager[_0x509a70(0x248)](_0x509a70(0x116)),_0xf6a090=ColorManager[_0x509a70(0x248)](_0x509a70(0x226)),_0x171887=this[_0x509a70(0x243)](),_0x1a69df=_0xcdaba0['GaugeDirection'],_0x51c982=_0xcdaba0[_0x509a70(0x163)][_0x509a70(0x1e2)](0x0,0x1),_0x24c293=Math[_0x509a70(0x225)](((_0x171887?_0x2b4a66:_0x55b514)-0x2)*_0x51c982);_0x44c902[_0x509a70(0x140)](0x0,0x0,_0x2b4a66,_0x55b514,_0x2d086f);let _0x22d6cc=0x0,_0x50344e=0x0,_0xfd9d17=0x0,_0x3b4e94=0x0;if(_0x171887&&_0x1a69df)_0x22d6cc=_0x24c293-0x1,_0xfd9d17=_0x2b4a66-0x3-_0x22d6cc,_0x44c902[_0x509a70(0x156)](0x1,0x1,_0x22d6cc,_0x55b514-0x2,_0x2c7619,_0x49ee40,![]),_0x44c902[_0x509a70(0x156)](0x2+_0x22d6cc,0x1,_0xfd9d17,_0x55b514-0x2,_0x46d070,_0xf6a090,![]);else{if(_0x171887&&!_0x1a69df)_0x509a70(0x118)===_0x509a70(0x1d5)?(this[_0x509a70(0x22a)]=_0x509a70(0x25f),this[_0x509a70(0x1bf)]+=_0x3e34e6[_0x509a70(0x26a)][_0x509a70(0x295)][_0x509a70(0x138)][_0x509a70(0x29b)]||0x0):(_0x22d6cc=_0x24c293-0x1,_0xfd9d17=_0x2b4a66-0x3-_0x22d6cc,_0x44c902[_0x509a70(0x156)](0x2+_0xfd9d17,0x1,_0x22d6cc,_0x55b514-0x2,_0x2c7619,_0x49ee40,![]),_0x44c902[_0x509a70(0x156)](0x1,0x1,_0xfd9d17,_0x55b514-0x2,_0x46d070,_0xf6a090,![]));else{if(!_0x171887&&_0x1a69df)_0x50344e=_0x24c293-0x1,_0x3b4e94=_0x55b514-0x3-_0x50344e,_0x44c902['gradientFillRect'](0x1,0x1,_0x2b4a66-0x2,_0x50344e,_0x2c7619,_0x49ee40,!![]),_0x44c902[_0x509a70(0x156)](0x1,0x2+_0x50344e,_0x2b4a66-0x2,_0x3b4e94,_0x46d070,_0xf6a090,!![]);else{if(!_0x171887&&!_0x1a69df){if(_0x509a70(0xe1)===_0x509a70(0xe1))_0x50344e=_0x24c293-0x1,_0x3b4e94=_0x55b514-0x3-_0x50344e,_0x44c902['gradientFillRect'](0x1,0x2+_0x3b4e94,_0x2b4a66-0x2,_0x50344e,_0x2c7619,_0x49ee40,!![]),_0x44c902[_0x509a70(0x156)](0x1,0x1,_0x2b4a66-0x2,_0x3b4e94,_0x46d070,_0xf6a090,!![]);else{if(this[_0x509a70(0x115)]!==_0x3f5588[_0x509a70(0xfd)]())return this['processUpdateGraphic']();}}}}}},Sprite_FieldGaugeATB[_0x159d68(0x1d7)][_0x159d68(0x128)]=function(){const _0x5be468=_0x159d68;this[_0x5be468(0x25a)]&&this[_0x5be468(0x204)][_0x5be468(0x27a)](this[_0x5be468(0x25a)]),this[_0x5be468(0x25a)]=new Sprite(),this[_0x5be468(0x204)][_0x5be468(0x1e6)](this['_battlerContainer']),this['createBattlerSprites']();},Sprite_FieldGaugeATB[_0x159d68(0x1d7)][_0x159d68(0x25d)]=function(){const _0x1f91b4=_0x159d68;this[_0x1f91b4(0x185)](),this[_0x1f91b4(0x15e)]();},Sprite_FieldGaugeATB[_0x159d68(0x1d7)][_0x159d68(0x185)]=function(){const _0x566283=_0x159d68,_0x513b38=$gameTroop[_0x566283(0x1af)](),_0x22c45a=_0x513b38[_0x566283(0xfb)];for(let _0x478386=0x0;_0x478386<_0x22c45a;_0x478386++){this[_0x566283(0xe5)](_0x478386,$gameTroop);}},Sprite_FieldGaugeATB[_0x159d68(0x1d7)][_0x159d68(0x15e)]=function(){const _0x5ee51e=_0x159d68,_0x1c8c38=$gameParty['maxBattleMembers']();for(let _0x3850c6=0x0;_0x3850c6<_0x1c8c38;_0x3850c6++){_0x5ee51e(0x21c)!==_0x5ee51e(0x29f)?this['createBattlerSprite'](_0x3850c6,$gameParty):(_0x56c520[_0x5ee51e(0x26e)](_0x291eec+_0x3245b2,_0x585109+_0x4cd823+_0x43d9de,_0xba0881,_0x40ea0d),_0x494a28['y']+=_0x4b2748,_0x3b2a0a[_0x5ee51e(0x132)]['y']=0x0);}},Sprite_FieldGaugeATB[_0x159d68(0x1d7)]['createBattlerSprite']=function(_0x5a5c64,_0x2f1c64){const _0x1ebd00=_0x159d68,_0x7cbf2e=new Sprite_FieldMarkerATB(_0x5a5c64,_0x2f1c64,this[_0x1ebd00(0x204)]);this[_0x1ebd00(0x25a)][_0x1ebd00(0x1e6)](_0x7cbf2e);},Sprite_FieldGaugeATB[_0x159d68(0x1d7)][_0x159d68(0x171)]=function(){const _0x219aa4=_0x159d68;Sprite[_0x219aa4(0x1d7)][_0x219aa4(0x171)]['call'](this),this['updatePosition'](),this[_0x219aa4(0x201)](),this['updateVisibility']();},Sprite_FieldGaugeATB[_0x159d68(0x1d7)][_0x159d68(0x1c5)]=function(){const _0x136aeb=_0x159d68,_0x2c5bcf=Sprite_FieldGaugeATB['Settings'];if(_0x2c5bcf[_0x136aeb(0x1d0)]!=='top')return;if(!_0x2c5bcf['RepositionTopForHelp'])return;const _0x34dae5=SceneManager[_0x136aeb(0x2d8)][_0x136aeb(0x255)];if(!_0x34dae5)return;if(_0x34dae5[_0x136aeb(0x119)])this['x']=this['_homeX']+(_0x2c5bcf[_0x136aeb(0xfc)]||0x0),this['y']=this[_0x136aeb(0xbf)]+(_0x2c5bcf['RepositionTopHelpY']||0x0);else{if(_0x136aeb(0x224)!==_0x136aeb(0x2bb))this['x']=this[_0x136aeb(0x213)],this['y']=this[_0x136aeb(0xbf)];else return _0x136aeb(0x1d4)[_0x136aeb(0x222)](_0x7d1428(_0x18ada6['$1']));}const _0x491325=SceneManager[_0x136aeb(0x2d8)][_0x136aeb(0x1a2)];this['x']+=_0x491325['x'],this['y']+=_0x491325['y'];},Sprite_FieldGaugeATB[_0x159d68(0x1d7)][_0x159d68(0x201)]=function(){const _0x31f026=_0x159d68;if(!this[_0x31f026(0x25a)])return;const _0xe85e03=this[_0x31f026(0x25a)][_0x31f026(0x195)];if(!_0xe85e03)return;_0xe85e03[_0x31f026(0x172)](this[_0x31f026(0x16e)][_0x31f026(0x2b4)](this));},Sprite_FieldGaugeATB[_0x159d68(0x1d7)][_0x159d68(0x16e)]=function(_0x36ca46,_0x59fe6d){const _0x3e2d37=_0x159d68,_0x43f16a=this[_0x3e2d37(0x243)](),_0x1b5fdd=Sprite_FieldGaugeATB[_0x3e2d37(0x295)][_0x3e2d37(0x1d2)];if(_0x43f16a&&_0x1b5fdd)return _0x36ca46['x']-_0x59fe6d['x'];else{if(_0x43f16a&&!_0x1b5fdd){if('dvaTm'===_0x3e2d37(0x254))return _0x59fe6d['x']-_0x36ca46['x'];else _0x31df52[_0x3e2d37(0x1c7)](_0x5bb3ba(_0xe79305['$1'])*0.01);}else{if(!_0x43f16a&&_0x1b5fdd){if(_0x3e2d37(0x1df)===_0x3e2d37(0x28a))_0x2121b5['BattleSystemATB'][_0x3e2d37(0x102)][_0x3e2d37(0x131)](this,_0x10aee5),_0x34826a[_0x3e2d37(0x26a)][_0x3e2d37(0x2b1)](_0x5886dd);else return _0x36ca46['y']-_0x59fe6d['y'];}else{if(!_0x43f16a&&!_0x1b5fdd)return _0x59fe6d['y']-_0x36ca46['y'];}}}},Sprite_FieldGaugeATB['prototype']['updateVisibility']=function(){const _0x1269f8=_0x159d68;this[_0x1269f8(0x119)]=$gameSystem['isBattleSystemATBFieldGaugeVisible']();};function Sprite_FieldMarkerATB(){this['initialize'](...arguments);}Sprite_FieldMarkerATB['prototype']=Object[_0x159d68(0x280)](Sprite_Clickable[_0x159d68(0x1d7)]),Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0x183)]=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB['prototype'][_0x159d68(0x18f)]=function(_0x5d03d7,_0x3a1bfe,_0x1cdd42){const _0x82e1e9=_0x159d68;this[_0x82e1e9(0x1f6)]=_0x5d03d7,this[_0x82e1e9(0x1be)]=_0x3a1bfe,this[_0x82e1e9(0x204)]=_0x1cdd42,Sprite_Clickable[_0x82e1e9(0x1d7)]['initialize']['call'](this),this['initMembers'](),this[_0x82e1e9(0xd5)](),this[_0x82e1e9(0x182)]=this[_0x82e1e9(0x1ab)]();},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0x288)]=function(){const _0x1bb939=_0x159d68;this[_0x1bb939(0x132)]['x']=0.5,this[_0x1bb939(0x132)]['y']=0.5;},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0xd5)]=function(){const _0x2cb8bb=_0x159d68;this['createBackgroundSprite'](),this[_0x2cb8bb(0xd3)](),this[_0x2cb8bb(0x104)](),this['createLetterSprite'](),this['createArrowSprite'](),this[_0x2cb8bb(0x17d)](!![]);},Sprite_FieldMarkerATB['prototype'][_0x159d68(0x2c6)]=function(){const _0x3bc44a=_0x159d68;if(!Sprite_FieldGaugeATB[_0x3bc44a(0x295)][_0x3bc44a(0x2c7)])return;const _0x22ec03=Sprite_FieldGaugeATB[_0x3bc44a(0x295)],_0x5558ec=this[_0x3bc44a(0x1be)]===$gameParty?'Actor':_0x3bc44a(0xca),_0x5c1f21=_0x3bc44a(0x209)['format'](_0x5558ec),_0x5e1352=new Sprite();_0x5e1352[_0x3bc44a(0x132)]['x']=this[_0x3bc44a(0x132)]['x'],_0x5e1352[_0x3bc44a(0x132)]['y']=this[_0x3bc44a(0x132)]['y'];if(_0x22ec03[_0x5c1f21])_0x5e1352['bitmap']=ImageManager[_0x3bc44a(0xde)](_0x22ec03[_0x5c1f21]);else{if(_0x3bc44a(0xce)!=='bGHSh')this[_0x3bc44a(0x20a)]=this['createFieldAtbGraphicType']();else{const _0x18a56c=_0x22ec03[_0x3bc44a(0x269)];_0x5e1352['bitmap']=new Bitmap(_0x18a56c,_0x18a56c);const _0x492e8d=ColorManager[_0x3bc44a(0x25c)](_0x22ec03['%1BgColor1'['format'](_0x5558ec)]),_0x2e0c8d=ColorManager[_0x3bc44a(0x25c)](_0x22ec03[_0x3bc44a(0xd0)[_0x3bc44a(0x222)](_0x5558ec)]);_0x5e1352['bitmap'][_0x3bc44a(0x156)](0x0,0x0,_0x18a56c,_0x18a56c,_0x492e8d,_0x2e0c8d,!![]);}}this[_0x3bc44a(0x160)]=_0x5e1352,this[_0x3bc44a(0x1e6)](this[_0x3bc44a(0x160)]),this['width']=this[_0x3bc44a(0x160)][_0x3bc44a(0x2dc)],this[_0x3bc44a(0x2b0)]=this[_0x3bc44a(0x160)][_0x3bc44a(0x2b0)];},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0xd3)]=function(){const _0x687285=_0x159d68,_0x301d30=new Sprite();_0x301d30[_0x687285(0x132)]['x']=this[_0x687285(0x132)]['x'],_0x301d30['anchor']['y']=this[_0x687285(0x132)]['y'],this['_graphicSprite']=_0x301d30,this[_0x687285(0x1e6)](this[_0x687285(0x12a)]),this[_0x687285(0xfe)]();},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0x104)]=function(){const _0x4c9132=_0x159d68;if(!Sprite_FieldGaugeATB[_0x4c9132(0x295)]['ShowMarkerBorder'])return;const _0xed017a=Sprite_FieldGaugeATB[_0x4c9132(0x295)],_0xd90f8f=this[_0x4c9132(0x1be)]===$gameParty?'Actor':'Enemy',_0x4a947f=_0x4c9132(0x184)[_0x4c9132(0x222)](_0xd90f8f),_0x4119be=new Sprite();_0x4119be[_0x4c9132(0x132)]['x']=this[_0x4c9132(0x132)]['x'],_0x4119be[_0x4c9132(0x132)]['y']=this[_0x4c9132(0x132)]['y'];if(_0xed017a[_0x4a947f])_0x4c9132(0x1b0)!=='HVfLv'?(this[_0x4c9132(0x185)](),this[_0x4c9132(0x15e)]()):_0x4119be['bitmap']=ImageManager['loadSystem'](_0xed017a[_0x4a947f]);else{let _0x460027=_0xed017a['MarkerSize'],_0x370d7b=_0xed017a[_0x4c9132(0x27e)];_0x4119be[_0x4c9132(0x228)]=new Bitmap(_0x460027,_0x460027);const _0x3765f9='#000000',_0x27eb47=ColorManager['getColor'](_0xed017a[_0x4c9132(0x108)[_0x4c9132(0x222)](_0xd90f8f)]);_0x4119be['bitmap'][_0x4c9132(0x140)](0x0,0x0,_0x460027,_0x460027,_0x3765f9),_0x460027-=0x2,_0x4119be[_0x4c9132(0x228)][_0x4c9132(0x140)](0x1,0x1,_0x460027,_0x460027,_0x27eb47),_0x460027-=_0x370d7b*0x2,_0x4119be[_0x4c9132(0x228)][_0x4c9132(0x140)](0x1+_0x370d7b,0x1+_0x370d7b,_0x460027,_0x460027,_0x3765f9),_0x460027-=0x2,_0x370d7b+=0x1,_0x4119be[_0x4c9132(0x228)][_0x4c9132(0x23e)](0x1+_0x370d7b,0x1+_0x370d7b,_0x460027,_0x460027);}this[_0x4c9132(0x160)]=_0x4119be,this[_0x4c9132(0x1e6)](this['_backgroundSprite']);},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0xff)]=function(){const _0x351f7f=_0x159d68,_0x266cf7=Sprite_FieldGaugeATB['Settings'];if(!_0x266cf7[_0x351f7f(0x263)])return;if(this[_0x351f7f(0x1be)]===$gameParty)return;const _0x1ba8f5=_0x266cf7[_0x351f7f(0x269)],_0x2c2dde=new Sprite();_0x2c2dde['anchor']['x']=this[_0x351f7f(0x132)]['x'],_0x2c2dde[_0x351f7f(0x132)]['y']=this[_0x351f7f(0x132)]['y'],_0x2c2dde[_0x351f7f(0x228)]=new Bitmap(_0x1ba8f5,_0x1ba8f5),this[_0x351f7f(0x291)]=_0x2c2dde,this[_0x351f7f(0x1e6)](this['_letterSprite']);},Sprite_FieldMarkerATB['prototype'][_0x159d68(0xcf)]=function(){const _0xe17d1c=_0x159d68,_0x2760d0=Sprite_FieldGaugeATB['Settings'];if(!_0x2760d0['ShowMarkerArrow'])return;const _0x58120d=new Sprite();_0x58120d[_0xe17d1c(0x132)]['x']=this[_0xe17d1c(0x132)]['x'],_0x58120d[_0xe17d1c(0x132)]['y']=this['anchor']['y'],this[_0xe17d1c(0x22d)](_0x58120d),this['_arrowSprite']=_0x58120d,this[_0xe17d1c(0x1e6)](this[_0xe17d1c(0x16f)]);},Sprite_FieldMarkerATB[_0x159d68(0x1d7)]['setupArrowSprite']=function(_0xd27487){const _0x1e9e68=_0x159d68,_0x165bde=Sprite_FieldGaugeATB[_0x1e9e68(0x295)],_0x2684ab=_0x165bde[_0x1e9e68(0x269)],_0x211161=Math[_0x1e9e68(0x1fa)](_0x2684ab/0x2),_0x437545=this['isGaugeHorizontal'](),_0xbe3a77=this[_0x1e9e68(0x1be)]===$gameParty?_0x1e9e68(0x19a):_0x1e9e68(0xca),_0x17f44f=_0x165bde['%1Side'[_0x1e9e68(0x222)](_0xbe3a77)];_0xd27487[_0x1e9e68(0x228)]=ImageManager[_0x1e9e68(0xde)](_0x165bde[_0x1e9e68(0x179)]);const _0x48414f=0x18,_0x41e08a=_0x48414f/0x2,_0x246ef7=0x60+_0x48414f,_0x1c1352=0x0+_0x48414f;if(_0x437545&&_0x17f44f)_0xd27487['setFrame'](_0x246ef7+_0x41e08a,_0x1c1352+_0x41e08a+_0x48414f,_0x48414f,_0x41e08a),_0xd27487['y']+=_0x211161,_0xd27487[_0x1e9e68(0x132)]['y']=0x0;else{if(_0x437545&&!_0x17f44f)_0xd27487['setFrame'](_0x246ef7+_0x41e08a,_0x1c1352,_0x48414f,_0x41e08a),_0xd27487['y']-=_0x211161,_0xd27487['anchor']['y']=0x1;else{if(!_0x437545&&_0x17f44f)_0xd27487['setFrame'](_0x246ef7,_0x1c1352+_0x41e08a,_0x41e08a,_0x48414f),_0xd27487['x']-=Math[_0x1e9e68(0x225)](_0x211161*1.75),_0xd27487['anchor']['x']=0x0;else!_0x437545&&!_0x17f44f&&(_0xd27487[_0x1e9e68(0x26e)](_0x246ef7+_0x48414f+_0x41e08a,_0x1c1352+_0x41e08a,_0x41e08a,_0x48414f),_0xd27487['x']+=Math[_0x1e9e68(0x225)](_0x211161*1.75),_0xd27487[_0x1e9e68(0x132)]['x']=0x1);}}},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0x235)]=function(){const _0x4ff0e1=_0x159d68;return this[_0x4ff0e1(0x1be)]===$gameParty?$gameParty[_0x4ff0e1(0x14c)]()[this['_index']]:$gameTroop[_0x4ff0e1(0x1af)]()[this[_0x4ff0e1(0x1f6)]];},Sprite_FieldMarkerATB[_0x159d68(0x1d7)]['update']=function(){const _0x5345ea=_0x159d68;Sprite_Clickable[_0x5345ea(0x1d7)]['update']['call'](this),this[_0x5345ea(0xd2)](),this[_0x5345ea(0x149)](),this[_0x5345ea(0x17d)](),this[_0x5345ea(0x2a8)](),this[_0x5345ea(0x1f0)](),this[_0x5345ea(0x111)](),this[_0x5345ea(0x1da)]();},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0xd2)]=function(){const _0x3d5d8a=_0x159d68,_0x4156c5=this[_0x3d5d8a(0x1ab)](),_0x3cd0d5=Sprite_FieldGaugeATB['Settings'][_0x3d5d8a(0x2ca)];if(this[_0x3d5d8a(0x182)]>_0x4156c5)this[_0x3d5d8a(0x182)]=Math['max'](_0x4156c5,this[_0x3d5d8a(0x182)]-_0x3cd0d5);else{if(this[_0x3d5d8a(0x182)]<_0x4156c5){if('pdyeb'===_0x3d5d8a(0x1a5)){_0x1b3c57[_0x3d5d8a(0xf3)](_0x19ea22,_0x55f459);const _0x3cc082=_0x4c3486[_0x3d5d8a(0x202)];_0x3267b2['setBattleSystemATBFieldGaugeVisible'](_0x3cc082);}else this[_0x3d5d8a(0x182)]=Math['min'](_0x4156c5,this[_0x3d5d8a(0x182)]+_0x3cd0d5);}}},Sprite_FieldMarkerATB['prototype'][_0x159d68(0x1ab)]=function(){const _0x51d15c=_0x159d68,_0x3cc8bd=this['battler']();if(!_0x3cc8bd)return 0x0;if(_0x3cc8bd['isHidden']())return 0x0;if(_0x3cc8bd[_0x51d15c(0x159)]())return 0x0;return 0xff;},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0x243)]=function(){const _0x21b974=_0x159d68;if(this['_horz']!==undefined)return this['_horz'];const _0x1bd079=Sprite_FieldGaugeATB[_0x21b974(0x295)][_0x21b974(0x1d0)];return this[_0x21b974(0x1c0)]=['top',_0x21b974(0xda)][_0x21b974(0x249)](_0x1bd079),this['_horz'];},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0x149)]=function(){const _0xf1d9b5=_0x159d68,_0x5f3982=Sprite_FieldGaugeATB[_0xf1d9b5(0x295)],_0x523650=this[_0xf1d9b5(0x243)](),_0x304679=this['_unit']===$gameParty?_0xf1d9b5(0x19a):_0xf1d9b5(0xca),_0x878c66=_0x5f3982[_0xf1d9b5(0x206)],_0x5e7123=_0x5f3982['%1Side'[_0xf1d9b5(0x222)](_0x304679)];if(_0x523650){if(_0xf1d9b5(0x1eb)!==_0xf1d9b5(0x1eb))return _0x568bcc(_0x2776e6['$2']);else this['y']=_0x5f3982[_0xf1d9b5(0x17a)]/0x2,this['y']+=_0x5e7123?-_0x878c66:_0x878c66;}else{if(_0xf1d9b5(0x15d)!==_0xf1d9b5(0x2cf))this['x']=_0x5f3982[_0xf1d9b5(0x17a)]/0x2,this['x']+=_0x5e7123?_0x878c66:-_0x878c66;else{if(_0x3b3162[_0xf1d9b5(0x1cf)]&&this['isCTB']())return![];return this[_0xf1d9b5(0x1e7)]();}}},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0x17d)]=function(_0x284190){const _0x43b547=_0x159d68,_0x12f094=this[_0x43b547(0x235)]();if(!_0x12f094)return;const _0x5999f7=Sprite_FieldGaugeATB['Settings'],_0x6f7f3e=this['isGaugeHorizontal'](),_0x3b727a=this['targetPositionOnGauge'](),_0x1a44d6=_0x284190?Infinity:_0x5999f7[_0x43b547(0x25e)];if(_0x6f7f3e&&this['x']!==_0x3b727a){if(this['x']>_0x3b727a)this['x']=Math[_0x43b547(0x23d)](_0x3b727a,this['x']-_0x1a44d6);if(this['x']<_0x3b727a)this['x']=Math[_0x43b547(0x11d)](_0x3b727a,this['x']+_0x1a44d6);}else{if(!_0x6f7f3e&&this['x']!==_0x3b727a){if(this['y']>_0x3b727a)this['y']=Math[_0x43b547(0x23d)](_0x3b727a,this['y']-_0x1a44d6);if(this['y']<_0x3b727a)this['y']=Math[_0x43b547(0x11d)](_0x3b727a,this['y']+_0x1a44d6);}}},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0x14a)]=function(){const _0x524723=_0x159d68,_0x56248d=Sprite_FieldGaugeATB['Settings'],_0xa63aca=this['battler'](),_0x3b8327=this[_0x524723(0x243)](),_0x270f5f=this['_gaugeSprite'][_0x524723(0x228)][_0x524723(0x2dc)],_0x420f7c=this[_0x524723(0x204)][_0x524723(0x228)]['height'],_0x52eef9=_0x56248d[_0x524723(0x163)][_0x524723(0x1e2)](0x0,0x1),_0x2fc3db=_0x56248d[_0x524723(0x1d2)];let _0x139f43=_0xa63aca[_0x524723(0x126)]()*_0x52eef9;_0x139f43+=(0x1-_0x52eef9)*_0xa63aca[_0x524723(0x12c)]();if(_0xa63aca===BattleManager['_subject'])_0x139f43=0x1;if(!_0x2fc3db)_0x139f43=0x1-_0x139f43;let _0x1b44e5=0x0;if(_0x3b8327)_0x1b44e5=_0x139f43*_0x270f5f;else!_0x3b8327&&('IfvFs'!==_0x524723(0xe6)?_0x415492=this['subject']()[_0x524723(0x1bf)]:_0x1b44e5=_0x139f43*_0x420f7c);return Math[_0x524723(0x1fa)](_0x1b44e5);},Sprite_FieldMarkerATB[_0x159d68(0x1d7)]['updateGraphic']=function(){const _0x50913a=_0x159d68,_0xf122d5=this[_0x50913a(0x235)]();if(!_0xf122d5)return;const _0x37e38f=Sprite_FieldGaugeATB[_0x50913a(0x295)],_0x4af89f=this[_0x50913a(0x1be)]===$gameParty?_0x50913a(0x19a):_0x50913a(0xca);let _0x44dfe9=_0xf122d5[_0x50913a(0x271)]();if(_0xf122d5['isActor']()&&_0x44dfe9===_0x50913a(0x1a7)){if(_0x50913a(0x1f3)!==_0x50913a(0x2be))_0x44dfe9=_0x50913a(0x20d);else{const _0x380579=this[_0x50913a(0x256)]()[_0x50913a(0xd1)];if(_0x380579['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x2e2827(_0x518feb['$1']);return _0x44d228[_0x50913a(0x295)][_0x50913a(0x290)];}}else _0xf122d5['isEnemy']()&&_0x44dfe9===_0x50913a(0x2c4)&&('EcCNg'===_0x50913a(0x24f)?_0x44dfe9='enemy':this[_0x50913a(0x119)]=_0x4472f2[_0x50913a(0x2b9)]());if(this[_0x50913a(0xe2)]!==_0x44dfe9){if(_0x50913a(0x29e)!==_0x50913a(0x259))return this[_0x50913a(0xfe)]();else this[_0x50913a(0x132)]['x']=0.5,this['anchor']['y']=0.5;}switch(this['_graphicType']){case _0x50913a(0x20d):if(this['_graphicFaceName']!==_0xf122d5[_0x50913a(0x2c2)]())return this[_0x50913a(0xfe)]();if(this[_0x50913a(0x275)]!==_0xf122d5[_0x50913a(0x12f)]())return this['processUpdateGraphic']();break;case _0x50913a(0x139):if(this[_0x50913a(0x15f)]!==_0xf122d5[_0x50913a(0x24e)]())return'ZUtPK'===_0x50913a(0x221)?this[_0x50913a(0xfe)]():this[_0x50913a(0x238)](_0x45692c(_0x5876ff));break;case _0x50913a(0x1a7):if(_0xf122d5[_0x50913a(0x146)]()){if(this['_graphicSv']!==_0xf122d5[_0x50913a(0x187)]())return this[_0x50913a(0xfe)]();}else{if(this[_0x50913a(0x24c)]!==_0xf122d5['battlerName']())return this['processUpdateGraphic']();}break;case'svactor':if(_0xf122d5[_0x50913a(0x28f)]()){if(this[_0x50913a(0x115)]!==_0xf122d5[_0x50913a(0xfd)]())return this[_0x50913a(0xfe)]();}else{if(this[_0x50913a(0x24c)]!==_0xf122d5[_0x50913a(0xfd)]())return this['processUpdateGraphic']();}break;}},Sprite_FieldMarkerATB['prototype'][_0x159d68(0xfe)]=function(){const _0x4df6a2=_0x159d68,_0x49aed6=this[_0x4df6a2(0x235)]();if(!_0x49aed6)return;this['_graphicType']=_0x49aed6[_0x4df6a2(0x271)]();if(_0x49aed6[_0x4df6a2(0x28f)]()&&this[_0x4df6a2(0xe2)]==='enemy')this[_0x4df6a2(0xe2)]=_0x4df6a2(0x20d);else _0x49aed6[_0x4df6a2(0x167)]()&&this[_0x4df6a2(0xe2)]===_0x4df6a2(0x2c4)&&(_0x4df6a2(0x21a)!==_0x4df6a2(0x1b6)?this['_graphicType']='enemy':_0x996a4c[_0x4df6a2(0x233)]()?this[_0x4df6a2(0x2cb)]():_0x42d5c6[_0x4df6a2(0x26a)]['Game_Battler_applyTpbPenalty']['call'](this));let _0x42b530;switch(this[_0x4df6a2(0xe2)]){case _0x4df6a2(0x20d):this[_0x4df6a2(0x21b)]=_0x49aed6[_0x4df6a2(0x2c2)](),this[_0x4df6a2(0x275)]=_0x49aed6[_0x4df6a2(0x12f)](),_0x42b530=ImageManager[_0x4df6a2(0x2d1)](this[_0x4df6a2(0x21b)]),_0x42b530[_0x4df6a2(0x19c)](this[_0x4df6a2(0x20c)][_0x4df6a2(0x2b4)](this,_0x42b530));break;case _0x4df6a2(0x139):this[_0x4df6a2(0x15f)]=_0x49aed6['fieldAtbGraphicIconIndex'](),_0x42b530=ImageManager[_0x4df6a2(0xde)](_0x4df6a2(0x1e5)),_0x42b530[_0x4df6a2(0x19c)](this[_0x4df6a2(0x260)][_0x4df6a2(0x2b4)](this,_0x42b530));break;case _0x4df6a2(0x1a7):if(_0x49aed6['hasSvBattler']())this[_0x4df6a2(0x115)]=_0x49aed6['svBattlerName'](),_0x42b530=ImageManager[_0x4df6a2(0x1a8)](this[_0x4df6a2(0x115)]),_0x42b530['addLoadListener'](this[_0x4df6a2(0x137)][_0x4df6a2(0x2b4)](this,_0x42b530));else{if($gameSystem[_0x4df6a2(0x1fb)]()){if(_0x4df6a2(0x278)==='RMjtp'){if(_0x1609de!==_0x4df6a2(0x1d3))return!![];if(![_0x4df6a2(0x22b),'Window_SideviewUiBattleStatus'][_0x4df6a2(0x249)](this[_0x4df6a2(0x183)]['name']))return![];if(!_0x2154be[_0x4df6a2(0x233)]())return![];if(!_0x2e42f7[_0x4df6a2(0x212)])return![];return _0x1b50fe[_0x4df6a2(0x26a)]['Settings'][_0x4df6a2(0x232)][_0x4df6a2(0xe3)];}else this['_graphicEnemy']=_0x49aed6['battlerName'](),_0x42b530=ImageManager[_0x4df6a2(0x2bf)](this[_0x4df6a2(0x24c)]),_0x42b530[_0x4df6a2(0x19c)](this[_0x4df6a2(0xf4)][_0x4df6a2(0x2b4)](this,_0x42b530));}else this['_graphicEnemy']=_0x49aed6[_0x4df6a2(0xfd)](),_0x42b530=ImageManager[_0x4df6a2(0x1aa)](this[_0x4df6a2(0x24c)]),_0x42b530[_0x4df6a2(0x19c)](this[_0x4df6a2(0xf4)][_0x4df6a2(0x2b4)](this,_0x42b530));}break;case _0x4df6a2(0x2c4):this[_0x4df6a2(0x115)]=_0x49aed6[_0x4df6a2(0xfd)](),_0x42b530=ImageManager[_0x4df6a2(0x1a8)](this[_0x4df6a2(0x115)]),_0x42b530[_0x4df6a2(0x19c)](this[_0x4df6a2(0x137)][_0x4df6a2(0x2b4)](this,_0x42b530));break;}},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0x20c)]=function(_0x1e3c1c){const _0x56b248=_0x159d68,_0x1a24e8=Sprite_FieldGaugeATB['Settings'],_0x2e4d71=_0x1a24e8[_0x56b248(0x269)],_0x2138a8=this[_0x56b248(0x275)];this['_graphicSprite'][_0x56b248(0x228)]=new Bitmap(_0x2e4d71,_0x2e4d71);const _0x39fc61=this['_graphicSprite'][_0x56b248(0x228)],_0x12096f=ImageManager[_0x56b248(0x2dd)],_0x34354f=ImageManager[_0x56b248(0x11e)],_0x5a97d3=ImageManager[_0x56b248(0x2dd)],_0x3ceac3=ImageManager[_0x56b248(0x11e)],_0x4fcc05=_0x2138a8%0x4*_0x12096f+(_0x12096f-_0x5a97d3)/0x2,_0x5ef6c6=Math[_0x56b248(0x14e)](_0x2138a8/0x4)*_0x34354f+(_0x34354f-_0x3ceac3)/0x2;_0x39fc61[_0x56b248(0x174)](_0x1e3c1c,_0x4fcc05,_0x5ef6c6,_0x5a97d3,_0x3ceac3,0x0,0x0,_0x2e4d71,_0x2e4d71);},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0x260)]=function(_0x48791f){const _0x54bc49=_0x159d68,_0x2ecc06=Sprite_FieldGaugeATB['Settings'],_0x14ad55=_0x2ecc06[_0x54bc49(0x269)],_0x358c8e=this[_0x54bc49(0x15f)];this['_graphicSprite'][_0x54bc49(0x228)]=new Bitmap(_0x14ad55,_0x14ad55);const _0x382e76=this[_0x54bc49(0x12a)][_0x54bc49(0x228)],_0x336259=ImageManager['iconWidth'],_0x48a5df=ImageManager[_0x54bc49(0x19f)],_0x33e09d=_0x358c8e%0x10*_0x336259,_0x148e0e=Math[_0x54bc49(0x14e)](_0x358c8e/0x10)*_0x48a5df;_0x382e76[_0x54bc49(0x174)](_0x48791f,_0x33e09d,_0x148e0e,_0x336259,_0x48a5df,0x0,0x0,_0x14ad55,_0x14ad55);},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0x137)]=function(_0x50fb18){const _0x75a0=_0x159d68,_0x11d106=Sprite_FieldGaugeATB[_0x75a0(0x295)],_0xe8e5e6=_0x11d106[_0x75a0(0x269)];this['_graphicSprite'][_0x75a0(0x228)]=new Bitmap(_0xe8e5e6,_0xe8e5e6);const _0x11a47c=this['_graphicSprite'][_0x75a0(0x228)],_0x3d7def=this['_graphicSv']['match'](/\$/i),_0x40d587=_0x3d7def?0x1:ImageManager[_0x75a0(0x1bb)],_0xdfe80e=_0x3d7def?0x1:ImageManager[_0x75a0(0x157)],_0x3bf781=_0x50fb18[_0x75a0(0x2dc)]/_0x40d587,_0x3fd748=_0x50fb18['height']/_0xdfe80e,_0x1b36e4=Math[_0x75a0(0x11d)](0x1,_0xe8e5e6/_0x3bf781,_0xe8e5e6/_0x3fd748),_0x59c873=_0x3bf781*_0x1b36e4,_0x27cef=_0x3fd748*_0x1b36e4,_0x3428f2=Math[_0x75a0(0x1fa)]((_0xe8e5e6-_0x59c873)/0x2),_0x67cf59=Math[_0x75a0(0x1fa)]((_0xe8e5e6-_0x27cef)/0x2);_0x11a47c[_0x75a0(0x174)](_0x50fb18,0x0,0x0,_0x3bf781,_0x3fd748,_0x3428f2,_0x67cf59,_0x59c873,_0x27cef);},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0xf4)]=function(_0x233e73){const _0x939f13=_0x159d68,_0x1f9560=Sprite_FieldGaugeATB[_0x939f13(0x295)],_0x408996=_0x1f9560[_0x939f13(0x269)];this['_graphicSprite'][_0x939f13(0x228)]=new Bitmap(_0x408996,_0x408996);const _0x5ecb92=this[_0x939f13(0x12a)]['bitmap'],_0x1cb100=Math[_0x939f13(0x11d)](0x1,_0x408996/_0x233e73[_0x939f13(0x2dc)],_0x408996/_0x233e73['height']),_0x2caeda=_0x233e73[_0x939f13(0x2dc)]*_0x1cb100,_0x1a7f6d=_0x233e73[_0x939f13(0x2b0)]*_0x1cb100,_0x43fb54=Math['round']((_0x408996-_0x2caeda)/0x2),_0x1b6340=Math[_0x939f13(0x1fa)]((_0x408996-_0x1a7f6d)/0x2);_0x5ecb92[_0x939f13(0x174)](_0x233e73,0x0,0x0,_0x233e73[_0x939f13(0x2dc)],_0x233e73['height'],_0x43fb54,_0x1b6340,_0x2caeda,_0x1a7f6d);},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0x1f0)]=function(){const _0x281916=_0x159d68,_0x58018a=this[_0x281916(0x235)]();if(!_0x58018a)return;if(!_0x58018a[_0x281916(0x167)]())return;if(this[_0x281916(0x11c)]===_0x58018a[_0x281916(0x211)]())return;this['_graphicHue']=_0x58018a[_0x281916(0x211)]();if(_0x58018a[_0x281916(0x146)]())this['_graphicHue']=0x0;this['_graphicSprite'][_0x281916(0x2d9)](this[_0x281916(0x11c)]);},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0x111)]=function(){const _0x512e62=_0x159d68;if(!this[_0x512e62(0x291)])return;const _0x450919=this[_0x512e62(0x235)]();if(!_0x450919)return;if(this['_letter']===_0x450919[_0x512e62(0x26d)]&&this[_0x512e62(0x2b5)]===_0x450919[_0x512e62(0x2b5)])return;this[_0x512e62(0x26d)]=_0x450919[_0x512e62(0x26d)],this[_0x512e62(0x2b5)]=_0x450919[_0x512e62(0x2b5)];const _0xab8b5c=Sprite_FieldGaugeATB[_0x512e62(0x295)],_0x14c745=_0xab8b5c[_0x512e62(0x269)],_0x553ed9=Math['floor'](_0x14c745/0x2),_0x584207=this['_letterSprite']['bitmap'];_0x584207[_0x512e62(0x28d)]();if(!this[_0x512e62(0x2b5)])return;_0x584207[_0x512e62(0x2b7)]=_0xab8b5c[_0x512e62(0x147)]||$gameSystem[_0x512e62(0x22c)](),_0x584207[_0x512e62(0x1c1)]=_0xab8b5c[_0x512e62(0x113)]||0x10,_0x584207[_0x512e62(0x148)](this[_0x512e62(0x26d)],0x2,_0x553ed9,_0x14c745-0x4,_0x553ed9-0x2,_0x512e62(0x282));},Sprite_FieldMarkerATB[_0x159d68(0x1d7)][_0x159d68(0x1da)]=function(){const _0x10e2d9=_0x159d68,_0x44a78f=this[_0x10e2d9(0x235)]();if(!_0x44a78f)return;const _0x1a84bc=_0x44a78f[_0x10e2d9(0x235)]();if(!_0x1a84bc)return;const _0x38aa00=_0x1a84bc['mainSprite']();if(!_0x38aa00)return;this[_0x10e2d9(0x298)](_0x38aa00[_0x10e2d9(0x17c)]);},Sprite_FieldMarkerATB[_0x159d68(0x1d7)]['getStateTooltipBattler']=function(){return this['battler']();};