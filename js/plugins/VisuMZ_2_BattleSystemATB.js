//=============================================================================
// VisuStella MZ - Battle System ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.19;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.19] [BattleSystemATB]
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

const _0x1c04e6=_0x5ca1;(function(_0xb903e2,_0x2446c9){const _0x1e734f=_0x5ca1,_0x41bae7=_0xb903e2();while(!![]){try{const _0x75f38a=-parseInt(_0x1e734f(0x2c7))/0x1+-parseInt(_0x1e734f(0x122))/0x2+parseInt(_0x1e734f(0x32a))/0x3*(parseInt(_0x1e734f(0x136))/0x4)+-parseInt(_0x1e734f(0x193))/0x5*(-parseInt(_0x1e734f(0x2a2))/0x6)+parseInt(_0x1e734f(0x2cc))/0x7*(-parseInt(_0x1e734f(0x279))/0x8)+parseInt(_0x1e734f(0x1d2))/0x9*(parseInt(_0x1e734f(0x267))/0xa)+parseInt(_0x1e734f(0x1dc))/0xb;if(_0x75f38a===_0x2446c9)break;else _0x41bae7['push'](_0x41bae7['shift']());}catch(_0x5c3528){_0x41bae7['push'](_0x41bae7['shift']());}}}(_0x584b,0x4696d));function _0x5ca1(_0x272800,_0x53f5bf){const _0x584bb9=_0x584b();return _0x5ca1=function(_0x5ca1b5,_0x4f39ce){_0x5ca1b5=_0x5ca1b5-0x114;let _0x15c4b6=_0x584bb9[_0x5ca1b5];return _0x15c4b6;},_0x5ca1(_0x272800,_0x53f5bf);}var label=_0x1c04e6(0x263),tier=tier||0x0,dependencies=[_0x1c04e6(0x2ab)],pluginData=$plugins[_0x1c04e6(0x200)](function(_0x34b69b){const _0x378aff=_0x1c04e6;return _0x34b69b[_0x378aff(0x25f)]&&_0x34b69b[_0x378aff(0x17a)][_0x378aff(0x1f5)]('['+label+']');})[0x0];VisuMZ[label][_0x1c04e6(0x156)]=VisuMZ[label][_0x1c04e6(0x156)]||{},VisuMZ[_0x1c04e6(0x118)]=function(_0x549336,_0x322397){const _0x5db7f2=_0x1c04e6;for(const _0x536ecc in _0x322397){if(_0x536ecc[_0x5db7f2(0x2fd)](/(.*):(.*)/i)){const _0x42169a=String(RegExp['$1']),_0x1bdc04=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x33a6fb,_0x51d88e,_0x3b11f9;switch(_0x1bdc04){case _0x5db7f2(0x244):_0x33a6fb=_0x322397[_0x536ecc]!==''?Number(_0x322397[_0x536ecc]):0x0;break;case _0x5db7f2(0x274):_0x51d88e=_0x322397[_0x536ecc]!==''?JSON['parse'](_0x322397[_0x536ecc]):[],_0x33a6fb=_0x51d88e[_0x5db7f2(0x195)](_0x57853f=>Number(_0x57853f));break;case _0x5db7f2(0x1af):_0x33a6fb=_0x322397[_0x536ecc]!==''?eval(_0x322397[_0x536ecc]):null;break;case _0x5db7f2(0x2f9):_0x51d88e=_0x322397[_0x536ecc]!==''?JSON[_0x5db7f2(0x31e)](_0x322397[_0x536ecc]):[],_0x33a6fb=_0x51d88e[_0x5db7f2(0x195)](_0x272ad7=>eval(_0x272ad7));break;case _0x5db7f2(0x1ce):_0x33a6fb=_0x322397[_0x536ecc]!==''?JSON['parse'](_0x322397[_0x536ecc]):'';break;case'ARRAYJSON':_0x51d88e=_0x322397[_0x536ecc]!==''?JSON[_0x5db7f2(0x31e)](_0x322397[_0x536ecc]):[],_0x33a6fb=_0x51d88e['map'](_0x43e397=>JSON['parse'](_0x43e397));break;case _0x5db7f2(0x239):_0x33a6fb=_0x322397[_0x536ecc]!==''?new Function(JSON[_0x5db7f2(0x31e)](_0x322397[_0x536ecc])):new Function('return\x200');break;case _0x5db7f2(0x292):_0x51d88e=_0x322397[_0x536ecc]!==''?JSON[_0x5db7f2(0x31e)](_0x322397[_0x536ecc]):[],_0x33a6fb=_0x51d88e['map'](_0x283846=>new Function(JSON['parse'](_0x283846)));break;case _0x5db7f2(0x31b):_0x33a6fb=_0x322397[_0x536ecc]!==''?String(_0x322397[_0x536ecc]):'';break;case _0x5db7f2(0x192):_0x51d88e=_0x322397[_0x536ecc]!==''?JSON['parse'](_0x322397[_0x536ecc]):[],_0x33a6fb=_0x51d88e['map'](_0x2274ee=>String(_0x2274ee));break;case _0x5db7f2(0x20f):_0x3b11f9=_0x322397[_0x536ecc]!==''?JSON[_0x5db7f2(0x31e)](_0x322397[_0x536ecc]):{},_0x33a6fb=VisuMZ[_0x5db7f2(0x118)]({},_0x3b11f9);break;case'ARRAYSTRUCT':_0x51d88e=_0x322397[_0x536ecc]!==''?JSON[_0x5db7f2(0x31e)](_0x322397[_0x536ecc]):[],_0x33a6fb=_0x51d88e['map'](_0x47be9c=>VisuMZ[_0x5db7f2(0x118)]({},JSON[_0x5db7f2(0x31e)](_0x47be9c)));break;default:continue;}_0x549336[_0x42169a]=_0x33a6fb;}}return _0x549336;},(_0x6cc57e=>{const _0x1a6f8a=_0x1c04e6,_0x55ba74=_0x6cc57e[_0x1a6f8a(0x134)];for(const _0x195b28 of dependencies){if(!Imported[_0x195b28]){alert(_0x1a6f8a(0x1e4)[_0x1a6f8a(0x1a0)](_0x55ba74,_0x195b28)),SceneManager[_0x1a6f8a(0x21f)]();break;}}const _0x2dd5dc=_0x6cc57e['description'];if(_0x2dd5dc[_0x1a6f8a(0x2fd)](/\[Version[ ](.*?)\]/i)){if(_0x1a6f8a(0x232)!==_0x1a6f8a(0x204)){const _0x2614d0=Number(RegExp['$1']);_0x2614d0!==VisuMZ[label][_0x1a6f8a(0x266)]&&(_0x1a6f8a(0x325)!==_0x1a6f8a(0x138)?(alert(_0x1a6f8a(0x157)[_0x1a6f8a(0x1a0)](_0x55ba74,_0x2614d0)),SceneManager[_0x1a6f8a(0x21f)]()):this['_graphicType']=_0x1a6f8a(0x23e));}else{if(this['_horz']!==_0xb665eb)return this['_horz'];const _0x4c25ee=_0x4a4ab2[_0x1a6f8a(0x156)]['DisplayPosition'];return this[_0x1a6f8a(0x30e)]=[_0x1a6f8a(0x114),'bottom']['includes'](_0x4c25ee),this[_0x1a6f8a(0x30e)];}}if(_0x2dd5dc['match'](/\[Tier[ ](\d+)\]/i)){if(_0x1a6f8a(0x299)===_0x1a6f8a(0x299)){const _0x5c45b9=Number(RegExp['$1']);_0x5c45b9<tier?(alert(_0x1a6f8a(0x25d)[_0x1a6f8a(0x1a0)](_0x55ba74,_0x5c45b9,tier)),SceneManager[_0x1a6f8a(0x21f)]()):_0x1a6f8a(0x27c)!==_0x1a6f8a(0x24c)?tier=Math['max'](_0x5c45b9,tier):this[_0x1a6f8a(0x1e6)]=this['createFieldAtbGraphicFaceName']();}else return _0x2c145b(_0x1851bb['$2']);}VisuMZ[_0x1a6f8a(0x118)](VisuMZ[label]['Settings'],_0x6cc57e[_0x1a6f8a(0x28d)]);})(pluginData),PluginManager[_0x1c04e6(0x184)](pluginData[_0x1c04e6(0x134)],_0x1c04e6(0x1e9),_0x5eb444=>{const _0x54ae41=_0x1c04e6;VisuMZ[_0x54ae41(0x118)](_0x5eb444,_0x5eb444);const _0x2da6dc=_0x5eb444[_0x54ae41(0x32f)],_0x2280b3=_0x5eb444[_0x54ae41(0x189)];for(const _0x3d4134 of _0x2da6dc){const _0x4a7758=$gameActors['actor'](_0x3d4134);if(!_0x4a7758)continue;_0x4a7758[_0x54ae41(0x31f)]='icon',_0x4a7758[_0x54ae41(0x115)]=_0x2280b3;}}),PluginManager[_0x1c04e6(0x184)](pluginData[_0x1c04e6(0x134)],'FieldGaugeActorFace',_0xa02b6c=>{const _0x595ff4=_0x1c04e6;VisuMZ[_0x595ff4(0x118)](_0xa02b6c,_0xa02b6c);const _0x7df2c9=_0xa02b6c[_0x595ff4(0x32f)],_0x2d0548=_0xa02b6c[_0x595ff4(0x2f0)],_0x168a1f=_0xa02b6c['FaceIndex'];for(const _0x1a2be0 of _0x7df2c9){const _0x42300a=$gameActors[_0x595ff4(0x265)](_0x1a2be0);if(!_0x42300a)continue;_0x42300a[_0x595ff4(0x31f)]='face',_0x42300a['_fieldAtbGaugeFaceName']=_0x2d0548,_0x42300a['_fieldAtbGaugeFaceIndex']=_0x168a1f;}}),PluginManager['registerCommand'](pluginData[_0x1c04e6(0x134)],'FieldGaugeClearActorGraphic',_0x306d83=>{const _0x232386=_0x1c04e6;VisuMZ[_0x232386(0x118)](_0x306d83,_0x306d83);const _0xdcf8c1=_0x306d83[_0x232386(0x32f)];for(const _0x5e8dad of _0xdcf8c1){if(_0x232386(0x1ae)!==_0x232386(0x1ae))return _0x1b0257(_0x316ba4['$1']);else{const _0x25159d=$gameActors[_0x232386(0x265)](_0x5e8dad);if(!_0x25159d)continue;_0x25159d['clearFieldAtbGraphics']();}}}),PluginManager[_0x1c04e6(0x184)](pluginData['name'],_0x1c04e6(0x255),_0x4384cd=>{const _0x33147a=_0x1c04e6;VisuMZ[_0x33147a(0x118)](_0x4384cd,_0x4384cd);const _0x5be3b8=_0x4384cd[_0x33147a(0x163)],_0x5a066d=_0x4384cd[_0x33147a(0x189)];for(const _0x37ddc6 of _0x5be3b8){if(_0x33147a(0x142)===_0x33147a(0x2ba)){const _0x3b766c=_0x44773f['Settings'],_0x4e416f=_0x3b766c[_0x33147a(0x2ea)],_0xb7d291=this['_graphicFaceIndex'];this[_0x33147a(0x1c5)][_0x33147a(0x327)]=new _0x61636c(_0x4e416f,_0x4e416f);const _0x7ebf22=this[_0x33147a(0x1c5)][_0x33147a(0x327)],_0xd55352=_0x92b5d7[_0x33147a(0x252)],_0x31121e=_0x4116e4[_0x33147a(0x219)],_0x193cd6=_0x30c667['faceWidth'],_0x45d939=_0x339d5a[_0x33147a(0x219)],_0x3f3195=_0xb7d291%0x4*_0xd55352+(_0xd55352-_0x193cd6)/0x2,_0xd81515=_0x16be20[_0x33147a(0x129)](_0xb7d291/0x4)*_0x31121e+(_0x31121e-_0x45d939)/0x2;_0x7ebf22[_0x33147a(0x2bf)](_0x569b5f,_0x3f3195,_0xd81515,_0x193cd6,_0x45d939,0x0,0x0,_0x4e416f,_0x4e416f);}else{const _0x18ff0a=$gameTroop[_0x33147a(0x166)]()[_0x37ddc6];if(!_0x18ff0a)continue;_0x18ff0a[_0x33147a(0x31f)]=_0x33147a(0x19f),_0x18ff0a[_0x33147a(0x115)]=_0x5a066d;}}}),PluginManager[_0x1c04e6(0x184)](pluginData[_0x1c04e6(0x134)],_0x1c04e6(0x1a2),_0x5bef6f=>{const _0x14ad20=_0x1c04e6;VisuMZ[_0x14ad20(0x118)](_0x5bef6f,_0x5bef6f);const _0x478afc=_0x5bef6f[_0x14ad20(0x163)],_0x2fa212=_0x5bef6f[_0x14ad20(0x2f0)],_0x3d5dbe=_0x5bef6f[_0x14ad20(0x1e5)];for(const _0x35b656 of _0x478afc){if(_0x14ad20(0x2bb)!==_0x14ad20(0x1d8)){const _0x4c15fb=$gameTroop[_0x14ad20(0x166)]()[_0x35b656];if(!_0x4c15fb)continue;_0x4c15fb['_fieldAtbGaugeGraphicType']=_0x14ad20(0x29c),_0x4c15fb[_0x14ad20(0x1e6)]=_0x2fa212,_0x4c15fb[_0x14ad20(0x12d)]=_0x3d5dbe;}else return this['_fieldAtbGaugeGraphicType']===_0x5651af&&(this[_0x14ad20(0x31f)]=this[_0x14ad20(0x30d)]()),this['_fieldAtbGaugeGraphicType'];}}),PluginManager[_0x1c04e6(0x184)](pluginData[_0x1c04e6(0x134)],_0x1c04e6(0x126),_0x5e0a7b=>{const _0x1b6985=_0x1c04e6;VisuMZ[_0x1b6985(0x118)](_0x5e0a7b,_0x5e0a7b);const _0xef256b=_0x5e0a7b['Enemies'];for(const _0x1f88cd of _0xef256b){const _0x4eb996=$gameTroop[_0x1b6985(0x166)]()[_0x1f88cd];if(!_0x4eb996)continue;_0x4eb996[_0x1b6985(0x2f2)]();}}),PluginManager[_0x1c04e6(0x184)](pluginData[_0x1c04e6(0x134)],_0x1c04e6(0x2d6),_0x55d771=>{const _0x123bb8=_0x1c04e6;VisuMZ['ConvertParams'](_0x55d771,_0x55d771);const _0xccdbc=_0x55d771[_0x123bb8(0x135)];$gameSystem['setBattleSystemATBFieldGaugeVisible'](_0xccdbc);}),VisuMZ['BattleSystemATB'][_0x1c04e6(0x210)]=Scene_Boot[_0x1c04e6(0x31c)][_0x1c04e6(0x32e)],Scene_Boot[_0x1c04e6(0x31c)]['onDatabaseLoaded']=function(){const _0x3f54c7=_0x1c04e6;this[_0x3f54c7(0x18a)](),VisuMZ[_0x3f54c7(0x263)]['Scene_Boot_onDatabaseLoaded'][_0x3f54c7(0x14b)](this),this['process_VisuMZ_BattleSystemATB_JS_Notetags']();},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x220)]={},Scene_Boot[_0x1c04e6(0x31c)][_0x1c04e6(0x18a)]=function(){const _0x1eee38=_0x1c04e6,_0x1a252e=VisuMZ['BattleCore'][_0x1eee38(0x220)],_0x481baa=_0x1eee38(0x1ee),_0x7c7c8a=[_0x1eee38(0x11d),_0x1eee38(0x262),_0x1eee38(0x2da)];for(const _0x1ff7b3 of _0x7c7c8a){if(_0x1eee38(0x125)!==_0x1eee38(0x125))_0x1d1a99['prototype'][_0x1eee38(0x276)][_0x1eee38(0x14b)](this),this[_0x1eee38(0x228)](),this['updatePositionOffset'](),this['updatePositionOnGauge'](),this[_0x1eee38(0x242)](),this[_0x1eee38(0x1c9)](),this[_0x1eee38(0x2f1)](),this[_0x1eee38(0x1c3)]();else{const _0x52ea1d=_0x481baa[_0x1eee38(0x1a0)](_0x1ff7b3['toUpperCase']()['trim'](),_0x1eee38(0x2c5),_0x1eee38(0x293)),_0x53a560=new RegExp(_0x52ea1d,'i');VisuMZ[_0x1eee38(0x263)][_0x1eee38(0x220)][_0x1ff7b3]=_0x53a560;}}},Scene_Boot['prototype'][_0x1c04e6(0x236)]=function(){const _0x587d95=_0x1c04e6;if(VisuMZ[_0x587d95(0x249)])return;const _0x4eaa5f=$dataSkills[_0x587d95(0x2ff)]($dataItems);for(const _0xe88138 of _0x4eaa5f){if(!_0xe88138)continue;VisuMZ['BattleSystemATB'][_0x587d95(0x15f)](_0xe88138);}},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x25e)]=VisuMZ[_0x1c04e6(0x25e)],VisuMZ[_0x1c04e6(0x25e)]=function(_0x1959c6){const _0x34344d=_0x1c04e6;VisuMZ[_0x34344d(0x263)][_0x34344d(0x25e)][_0x34344d(0x14b)](this,_0x1959c6),VisuMZ[_0x34344d(0x263)][_0x34344d(0x15f)](_0x1959c6);},VisuMZ[_0x1c04e6(0x263)]['ParseItemNotetags']=VisuMZ[_0x1c04e6(0x217)],VisuMZ['ParseItemNotetags']=function(_0x870144){const _0x3d7503=_0x1c04e6;VisuMZ[_0x3d7503(0x263)][_0x3d7503(0x217)][_0x3d7503(0x14b)](this,_0x870144),VisuMZ['BattleSystemATB'][_0x3d7503(0x15f)](_0x870144);},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x15f)]=function(_0x3eef34){const _0x5c9261=_0x1c04e6,_0x88d6e7=[_0x5c9261(0x11d),_0x5c9261(0x262),_0x5c9261(0x2da)];for(const _0xb743e2 of _0x88d6e7){_0x5c9261(0x231)===_0x5c9261(0x231)?VisuMZ[_0x5c9261(0x263)][_0x5c9261(0x258)](_0x3eef34,_0xb743e2):this[_0x5c9261(0x2ae)](...arguments);}},VisuMZ[_0x1c04e6(0x263)]['JS']={},VisuMZ[_0x1c04e6(0x263)]['createJS']=function(_0x31ff4d,_0x108e6d){const _0x2e6601=_0x1c04e6,_0x5e05d4=_0x31ff4d['note'];if(_0x5e05d4['match'](VisuMZ[_0x2e6601(0x263)][_0x2e6601(0x220)][_0x108e6d])){if(_0x2e6601(0x25b)!==_0x2e6601(0x20a)){const _0x24f7bb=String(RegExp['$1']),_0x4dcc2d=_0x2e6601(0x1a1)[_0x2e6601(0x1a0)](_0x24f7bb,_0x108e6d),_0x224b55=VisuMZ[_0x2e6601(0x263)]['createKeyJS'](_0x31ff4d,_0x108e6d);VisuMZ['BattleSystemATB']['JS'][_0x224b55]=new Function(_0x4dcc2d);}else this[_0x2e6601(0x2c4)](),this[_0x2e6601(0x1e8)]();}},VisuMZ['BattleSystemATB'][_0x1c04e6(0x2b3)]=function(_0x2281cd,_0x1d42e6){const _0x14c45f=_0x1c04e6;if(VisuMZ['createKeyJS'])return VisuMZ[_0x14c45f(0x2b3)](_0x2281cd,_0x1d42e6);let _0x146e2a='';if($dataActors[_0x14c45f(0x1f5)](_0x2281cd))_0x146e2a=_0x14c45f(0x280)[_0x14c45f(0x1a0)](_0x2281cd['id'],_0x1d42e6);if($dataClasses[_0x14c45f(0x1f5)](_0x2281cd))_0x146e2a=_0x14c45f(0x191)[_0x14c45f(0x1a0)](_0x2281cd['id'],_0x1d42e6);if($dataSkills[_0x14c45f(0x1f5)](_0x2281cd))_0x146e2a='Skill-%1-%2'[_0x14c45f(0x1a0)](_0x2281cd['id'],_0x1d42e6);if($dataItems[_0x14c45f(0x1f5)](_0x2281cd))_0x146e2a=_0x14c45f(0x2bc)['format'](_0x2281cd['id'],_0x1d42e6);if($dataWeapons['includes'](_0x2281cd))_0x146e2a=_0x14c45f(0x2cf)['format'](_0x2281cd['id'],_0x1d42e6);if($dataArmors[_0x14c45f(0x1f5)](_0x2281cd))_0x146e2a='Armor-%1-%2'[_0x14c45f(0x1a0)](_0x2281cd['id'],_0x1d42e6);if($dataEnemies[_0x14c45f(0x1f5)](_0x2281cd))_0x146e2a='Enemy-%1-%2'[_0x14c45f(0x1a0)](_0x2281cd['id'],_0x1d42e6);if($dataStates[_0x14c45f(0x1f5)](_0x2281cd))_0x146e2a='State-%1-%2'['format'](_0x2281cd['id'],_0x1d42e6);return _0x146e2a;},ConfigManager[_0x1c04e6(0x1ca)]=!![],VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x259)]=ConfigManager[_0x1c04e6(0x160)],ConfigManager[_0x1c04e6(0x160)]=function(){const _0x322357=_0x1c04e6,_0x55079f=VisuMZ[_0x322357(0x263)][_0x322357(0x259)]['call'](this);return _0x55079f[_0x322357(0x1ca)]=this[_0x322357(0x1ca)],_0x55079f;},VisuMZ['BattleSystemATB']['ConfigManager_applyData']=ConfigManager[_0x1c04e6(0x306)],ConfigManager[_0x1c04e6(0x306)]=function(_0x2a0caf){const _0x5278ae=_0x1c04e6;VisuMZ['BattleSystemATB'][_0x5278ae(0x24a)][_0x5278ae(0x14b)](this,_0x2a0caf),_0x5278ae(0x1ca)in _0x2a0caf?this[_0x5278ae(0x1ca)]=_0x2a0caf[_0x5278ae(0x1ca)]:this['visualAtbGauge']=!![];},ImageManager[_0x1c04e6(0x30b)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x1c04e6(0x1b8)]=ImageManager[_0x1c04e6(0x1b8)]||0x6,TextManager[_0x1c04e6(0x1ca)]=VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x156)]['Options']['Name'],VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x24f)]=ColorManager[_0x1c04e6(0x275)],ColorManager[_0x1c04e6(0x275)]=function(){const _0x457c81=_0x1c04e6;VisuMZ[_0x457c81(0x263)][_0x457c81(0x24f)][_0x457c81(0x14b)](this),this[_0x457c81(0x17d)][_0x457c81(0x31a)](this[_0x457c81(0x207)][_0x457c81(0x1b3)](this));},ColorManager['getColor']=function(_0x43324d){const _0x3f7356=_0x1c04e6;return _0x43324d=String(_0x43324d),_0x43324d[_0x3f7356(0x2fd)](/#(.*)/i)?_0x3f7356(0x180)[_0x3f7356(0x1a0)](String(RegExp['$1'])):this[_0x3f7356(0x1c2)](Number(_0x43324d));},ColorManager['setupBattleSystemATBColors']=function(){const _0x34dc37=_0x1c04e6,_0x5ebabe=[_0x34dc37(0x176),_0x34dc37(0x162),_0x34dc37(0x1bb),_0x34dc37(0x1fe),_0x34dc37(0x15a),_0x34dc37(0x288)],_0x49c44f=VisuMZ[_0x34dc37(0x263)]['Settings'][_0x34dc37(0x248)];this[_0x34dc37(0x1b1)]={};for(const _0xb08898 of _0x5ebabe){if(_0x34dc37(0x18f)!==_0x34dc37(0x18f))this[_0x34dc37(0x31f)]=this[_0x34dc37(0x30d)]();else for(let _0x41013b=0x1;_0x41013b<=0x2;_0x41013b++){const _0x41ba1d=_0xb08898+_0x41013b;this[_0x34dc37(0x1b1)][_0x41ba1d]=this[_0x34dc37(0x164)](_0x49c44f[_0x41ba1d]);}}},ColorManager[_0x1c04e6(0x1de)]=function(_0x2d5d9e){const _0x4d991c=_0x1c04e6;if(this[_0x4d991c(0x1b1)]===undefined)this[_0x4d991c(0x207)]();return this[_0x4d991c(0x1b1)][_0x2d5d9e]||_0x4d991c(0x287);},SceneManager[_0x1c04e6(0x2f8)]=function(){const _0x333b36=_0x1c04e6;return this[_0x333b36(0x208)]&&this[_0x333b36(0x208)][_0x333b36(0x2e3)]===Scene_Battle;},BattleManager['isATB']=function(){const _0x165874=_0x1c04e6;if(Imported[_0x165874(0x310)]&&this[_0x165874(0x1f3)]())return![];return this[_0x165874(0x1fa)]();},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x2e5)]=BattleManager[_0x1c04e6(0x11f)],BattleManager[_0x1c04e6(0x11f)]=function(){const _0x3b39dc=_0x1c04e6;if(!this[_0x3b39dc(0x1fa)]())return![];else return ConfigManager&&ConfigManager[_0x3b39dc(0x131)]!==undefined?ConfigManager[_0x3b39dc(0x131)]:VisuMZ[_0x3b39dc(0x263)][_0x3b39dc(0x2e5)][_0x3b39dc(0x14b)](this);},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x22d)]=Game_System[_0x1c04e6(0x31c)]['initialize'],Game_System[_0x1c04e6(0x31c)][_0x1c04e6(0x2ae)]=function(){const _0x59bbcf=_0x1c04e6;VisuMZ[_0x59bbcf(0x263)]['Game_System_initialize'][_0x59bbcf(0x14b)](this),this['initBattleSystemATB']();},Game_System[_0x1c04e6(0x31c)]['initBattleSystemATB']=function(){const _0x1f7cd2=_0x1c04e6;this[_0x1f7cd2(0x20b)]=!![];},Game_System[_0x1c04e6(0x31c)][_0x1c04e6(0x309)]=function(){const _0x1b6865=_0x1c04e6;return this[_0x1b6865(0x20b)]===undefined&&this['initBattleSystemATB'](),this[_0x1b6865(0x20b)];},Game_System['prototype'][_0x1c04e6(0x1f4)]=function(_0x55ec97){const _0x6a92db=_0x1c04e6;this['_atbFieldGaugeVisible']===undefined&&this['initBattleSystemATB'](),this[_0x6a92db(0x20b)]=_0x55ec97;},VisuMZ[_0x1c04e6(0x263)]['Game_Action_applyItemUserEffect']=Game_Action[_0x1c04e6(0x31c)][_0x1c04e6(0x2be)],Game_Action[_0x1c04e6(0x31c)][_0x1c04e6(0x2be)]=function(_0x932534){const _0x40ab73=_0x1c04e6;VisuMZ[_0x40ab73(0x263)][_0x40ab73(0x277)][_0x40ab73(0x14b)](this,_0x932534),this[_0x40ab73(0x2cd)](_0x932534);},Game_Action['prototype'][_0x1c04e6(0x2cd)]=function(_0x3ef3b9){const _0x5624da=_0x1c04e6;if(!SceneManager[_0x5624da(0x2f8)]())return;if(!BattleManager[_0x5624da(0x12c)]())return;if(this[_0x5624da(0x27d)]())this[_0x5624da(0x1b2)](_0x3ef3b9);},Game_Action['prototype']['applyItemBattleSystemATBUserEffect']=function(_0x5cd82d){const _0x4ae68f=_0x1c04e6,_0x4c2873=this[_0x4ae68f(0x27d)]()[_0x4ae68f(0x215)];if(_0x5cd82d[_0x4ae68f(0x26a)]()){const _0x99881f=VisuMZ['BattleSystemATB'][_0x4ae68f(0x2b3)](this[_0x4ae68f(0x27d)](),_0x4ae68f(0x11d));if(VisuMZ[_0x4ae68f(0x263)]['JS'][_0x99881f]){const _0x32c546=VisuMZ[_0x4ae68f(0x263)]['JS'][_0x99881f]['call'](this,this[_0x4ae68f(0x32b)](),_0x5cd82d);_0x5cd82d[_0x4ae68f(0x137)](_0x32c546);}if(_0x4c2873[_0x4ae68f(0x2fd)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if(_0x4ae68f(0x1d7)===_0x4ae68f(0x2fe))return _0x15c544[_0x4ae68f(0x156)]['EnemyBattlerFaceIndex'];else _0x5cd82d[_0x4ae68f(0x137)](Number(RegExp['$1'])*0.01);}_0x4c2873[_0x4ae68f(0x2fd)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x5cd82d[_0x4ae68f(0x11c)](Number(RegExp['$1'])*0.01);}else{if(_0x5cd82d[_0x4ae68f(0x2ce)]()){if('fLxcD'===_0x4ae68f(0x2b1))this['createAtbGaugeSprite']();else{const _0xef9e23=VisuMZ[_0x4ae68f(0x263)][_0x4ae68f(0x2b3)](this['item'](),_0x4ae68f(0x262));if(VisuMZ[_0x4ae68f(0x263)]['JS'][_0xef9e23]){const _0x20928e=VisuMZ['BattleSystemATB']['JS'][_0xef9e23][_0x4ae68f(0x14b)](this,this[_0x4ae68f(0x32b)](),_0x5cd82d);_0x5cd82d[_0x4ae68f(0x302)](_0x20928e);}if(_0x4c2873[_0x4ae68f(0x2fd)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if(_0x4ae68f(0x19b)===_0x4ae68f(0x328)){const _0x4220db=this[_0x4ae68f(0x218)]();if(!_0x4220db)return;const _0x3a4653=_0x4220db[_0x4ae68f(0x218)]();if(!_0x3a4653)return;const _0x26f7d4=_0x3a4653[_0x4ae68f(0x294)]();if(!_0x26f7d4)return;this['setBlendColor'](_0x26f7d4[_0x4ae68f(0x329)]);}else _0x5cd82d[_0x4ae68f(0x302)](Number(RegExp['$1'])*0.01);}_0x4c2873[_0x4ae68f(0x2fd)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x5cd82d['changeAtbCastTime'](Number(RegExp['$1'])*0.01);if(_0x4c2873[_0x4ae68f(0x2fd)](/<(?:ATB|TPB) INTERRUPT>/i)){if(_0x4ae68f(0x335)===_0x4ae68f(0x2b4)){if(this['y']>_0x577f66)this['y']=_0x28feee[_0x4ae68f(0x132)](_0x1e663f,this['y']-_0x257c03);if(this['y']<_0x52c7cf)this['y']=_0x52c237[_0x4ae68f(0x185)](_0x1cd612,this['y']+_0x45081f);}else _0x5cd82d[_0x4ae68f(0x2f3)]();}}}}},VisuMZ[_0x1c04e6(0x263)]['Game_Action_applyGlobal']=Game_Action[_0x1c04e6(0x31c)][_0x1c04e6(0x2d8)],Game_Action[_0x1c04e6(0x31c)][_0x1c04e6(0x2d8)]=function(){const _0x3e0689=_0x1c04e6;VisuMZ[_0x3e0689(0x263)][_0x3e0689(0x12e)][_0x3e0689(0x14b)](this),this['applyGlobalBattleSystemATBEffects']();},Game_Action[_0x1c04e6(0x31c)][_0x1c04e6(0x257)]=function(){const _0x52b924=_0x1c04e6;if(!this[_0x52b924(0x27d)]())return;if(!BattleManager[_0x52b924(0x12c)]())return;const _0x584155=this[_0x52b924(0x27d)]()[_0x52b924(0x215)];let _0x2f9aab=0x0;this[_0x52b924(0x211)]&&(_0x2f9aab=this[_0x52b924(0x32b)]()[_0x52b924(0x1b7)]);const _0x4b511a=VisuMZ[_0x52b924(0x263)]['createKeyJS'](this[_0x52b924(0x27d)](),_0x52b924(0x2da));VisuMZ[_0x52b924(0x263)]['JS'][_0x4b511a]&&(_0x2f9aab=VisuMZ[_0x52b924(0x263)]['JS'][_0x4b511a][_0x52b924(0x14b)](this,this[_0x52b924(0x32b)](),this[_0x52b924(0x32b)]()));let _0x366a35=this[_0x52b924(0x27d)]()[_0x52b924(0x290)]>0x0?this[_0x52b924(0x27d)]()[_0x52b924(0x290)]:0x0;if(this[_0x52b924(0x30f)]())_0x366a35+=this[_0x52b924(0x32b)]()[_0x52b924(0x188)]();_0x2f9aab+=(_0x366a35/0xfa0)['clamp'](0x0,0x1);this[_0x52b924(0x27d)]()[_0x52b924(0x215)][_0x52b924(0x2fd)](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x2f9aab=Number(RegExp['$1'])*0.01);const _0xfe43ea=this['subject']()[_0x52b924(0x247)]()[_0x52b924(0x2ff)](this['subject']()['skills']()),_0x41e6ca=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x1f5b57=_0xfe43ea['map'](_0x2d9bd7=>_0x2d9bd7&&_0x2d9bd7[_0x52b924(0x215)][_0x52b924(0x2fd)](_0x41e6ca)?Number(RegExp['$1'])*0.01:0x0);_0x2f9aab=_0x1f5b57[_0x52b924(0x19c)]((_0x28d566,_0x3feb85)=>_0x28d566+_0x3feb85,_0x2f9aab),this[_0x52b924(0x27d)]()['note'][_0x52b924(0x2fd)](/<(?:ATB|TPB) INSTANT>/i)&&(_0x2f9aab=0xa),this[_0x52b924(0x32b)]()[_0x52b924(0x140)](_0x2f9aab);},Game_BattlerBase[_0x1c04e6(0x31c)][_0x1c04e6(0x137)]=function(_0x425363){const _0x3804a2=_0x1c04e6;this[_0x3804a2(0x1b7)]=_0x425363['clamp'](0x0,0x1);},Game_BattlerBase[_0x1c04e6(0x31c)][_0x1c04e6(0x11c)]=function(_0xb1d3d9){const _0xeaa2e1=_0x1c04e6;this[_0xeaa2e1(0x137)](this[_0xeaa2e1(0x1b7)]+_0xb1d3d9);},Game_BattlerBase[_0x1c04e6(0x31c)][_0x1c04e6(0x302)]=function(_0x49ce3a){const _0x3add55=_0x1c04e6,_0x284cc5=this['tpbRequiredCastTime']();this[_0x3add55(0x190)]=(_0x284cc5*_0x49ce3a)[_0x3add55(0x342)](0x0,_0x284cc5);},Game_BattlerBase[_0x1c04e6(0x31c)][_0x1c04e6(0x143)]=function(_0x520e2f){const _0x5d57bc=_0x1c04e6,_0x433924=this[_0x5d57bc(0x2ac)](),_0x4e7949=_0x433924*_0x520e2f;this[_0x5d57bc(0x190)]=(this[_0x5d57bc(0x190)]+_0x4e7949)[_0x5d57bc(0x342)](0x0,_0x433924);},VisuMZ[_0x1c04e6(0x263)]['Game_BattlerBase_die']=Game_BattlerBase[_0x1c04e6(0x31c)][_0x1c04e6(0x23c)],Game_BattlerBase['prototype']['die']=function(){const _0x1af7f2=_0x1c04e6;VisuMZ['BattleSystemATB'][_0x1af7f2(0x11a)]['call'](this),BattleManager[_0x1af7f2(0x1fa)]()&&this[_0x1af7f2(0x28e)]();},VisuMZ[_0x1c04e6(0x263)]['Game_BattlerBase_revive']=Game_BattlerBase[_0x1c04e6(0x31c)]['revive'],Game_BattlerBase['prototype'][_0x1c04e6(0x225)]=function(){const _0x51d377=_0x1c04e6;VisuMZ['BattleSystemATB'][_0x51d377(0x314)][_0x51d377(0x14b)](this),BattleManager[_0x51d377(0x1fa)]()&&this[_0x51d377(0x28e)]();},VisuMZ['BattleSystemATB'][_0x1c04e6(0x21c)]=Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x144)],Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x144)]=function(_0x250364){const _0xd7f3ae=_0x1c04e6;BattleManager[_0xd7f3ae(0x12c)]()?this[_0xd7f3ae(0x307)](_0x250364):'zdMaW'!==_0xd7f3ae(0x15b)?VisuMZ[_0xd7f3ae(0x263)][_0xd7f3ae(0x21c)][_0xd7f3ae(0x14b)](this,_0x250364):this[_0xd7f3ae(0x170)]='ready';},Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x307)]=function(_0x15b1aa){const _0x1d2f32=_0x1c04e6,_0x10729e=VisuMZ[_0x1d2f32(0x263)][_0x1d2f32(0x156)][_0x1d2f32(0x1f6)];let _0x141441=this[_0x1d2f32(0x117)]()*eval(_0x10729e['InitialGaugeJS']);const _0x52af9c=this['traitObjects']()[_0x1d2f32(0x2ff)](this['skills']()),_0x3238c8=/<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x5f2a54=_0x52af9c[_0x1d2f32(0x195)](_0x2427e1=>_0x2427e1&&_0x2427e1['note'][_0x1d2f32(0x2fd)](_0x3238c8)?Number(RegExp['$1'])*0.01:0x0);_0x141441=_0x5f2a54[_0x1d2f32(0x19c)]((_0x9dce49,_0x4a1abd)=>_0x9dce49+_0x4a1abd,_0x141441),this['_tpbState']=_0x1d2f32(0x1a6),this['_tpbChargeTime']=(_0x15b1aa?0x1:_0x141441)[_0x1d2f32(0x342)](0x0,0x1),this[_0x1d2f32(0x32d)]()&&(this[_0x1d2f32(0x1b7)]=0x0);},Game_Battler[_0x1c04e6(0x31c)]['isAtbChargingState']=function(){const _0x29a4cc=_0x1c04e6;return this[_0x29a4cc(0x170)]===_0x29a4cc(0x1a6);},Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x2ce)]=function(){const _0x58e73f=_0x1c04e6;return this['_tpbState']===_0x58e73f(0x29f)&&this[_0x58e73f(0x33e)]()&&this[_0x58e73f(0x33e)]()[_0x58e73f(0x27d)]()&&this[_0x58e73f(0x33e)]()[_0x58e73f(0x27d)]()[_0x58e73f(0x290)]<0x0;},Game_BattlerBase[_0x1c04e6(0x31c)]['getAtbCastTimeRate']=function(){const _0x3ac704=_0x1c04e6;if(this['isAtbCastingState']()){if(_0x3ac704(0x158)===_0x3ac704(0x158))return this[_0x3ac704(0x190)]/this[_0x3ac704(0x2ac)]();else{const _0x20eead=this[_0x3ac704(0x265)]()[_0x3ac704(0x215)];if(_0x20eead[_0x3ac704(0x2fd)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x20eead['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x3ac704(0x19f);}return _0xda57f9[_0x3ac704(0x156)][_0x3ac704(0x284)];}}else return 0x0;},Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x1ef)]=function(){const _0x2e0631=_0x1c04e6;return!this[_0x2e0631(0x2ca)]();},Game_Battler['prototype'][_0x1c04e6(0x140)]=function(_0x17953b){this['_atbAfterSpeed']=_0x17953b;},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x1c8)]=BattleManager[_0x1c04e6(0x21a)],BattleManager[_0x1c04e6(0x21a)]=function(_0x4a7cc7){const _0x1c1a9f=_0x1c04e6;this[_0x1c1a9f(0x1fa)]()&&!_0x4a7cc7[_0x1c1a9f(0x2ca)]()&&(_0x4a7cc7[_0x1c1a9f(0x2ad)]=!![]);VisuMZ[_0x1c1a9f(0x263)]['BattleManager_endBattlerActions'][_0x1c1a9f(0x14b)](this,_0x4a7cc7);if(this['isTpb']()&&!_0x4a7cc7['canMove']()){if('IWhwi'!==_0x1c1a9f(0x23b))_0x4a7cc7['_onRestrictBypassAtbReset']=![];else{if(this['_horz']!==_0x14fcbd)return this[_0x1c1a9f(0x30e)];const _0x4443eb=_0x2e9d96[_0x1c1a9f(0x156)][_0x1c1a9f(0x251)];return this[_0x1c1a9f(0x30e)]=[_0x1c1a9f(0x114),_0x1c1a9f(0x245)][_0x1c1a9f(0x1f5)](_0x4443eb),this[_0x1c1a9f(0x30e)];}}},VisuMZ[_0x1c04e6(0x263)]['Game_Battler_clearTpbChargeTime']=Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x28e)],Game_Battler[_0x1c04e6(0x31c)]['clearTpbChargeTime']=function(){const _0x4398e4=_0x1c04e6;if(this['_onRestrictBypassAtbReset'])return;VisuMZ[_0x4398e4(0x263)][_0x4398e4(0x213)][_0x4398e4(0x14b)](this),this[_0x4398e4(0x1b7)]+=this[_0x4398e4(0x2e2)]||0x0;},Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x2f3)]=function(){const _0x103e72=_0x1c04e6;if(!this[_0x103e72(0x2ce)]())return;if(!this[_0x103e72(0x33e)]())return;if(!this[_0x103e72(0x33e)]()[_0x103e72(0x27d)]())return;if(this[_0x103e72(0x33e)]()[_0x103e72(0x27d)]()[_0x103e72(0x215)][_0x103e72(0x2fd)](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this[_0x103e72(0x183)](),this['clearTpbChargeTime'](),this['_tpbCastTime']=0x0,this[_0x103e72(0x1fb)]();},Game_Battler[_0x1c04e6(0x31c)]['onAtbInterrupt']=function(){const _0x172d33=_0x1c04e6,_0x3d85cd=VisuMZ[_0x172d33(0x263)]['Settings'][_0x172d33(0x1f1)];if(Imported[_0x172d33(0x268)]){const _0x51f4db=_0x3d85cd[_0x172d33(0x1b9)],_0xa2fe34=_0x3d85cd[_0x172d33(0x223)],_0x4acf3c=_0x3d85cd[_0x172d33(0x237)];$gameTemp[_0x172d33(0x2d3)]([this],_0x51f4db,_0xa2fe34,_0x4acf3c);}if(this[_0x172d33(0x218)]()&&_0x3d85cd[_0x172d33(0x124)][_0x172d33(0x296)]>0x0){const _0x2ec7d8=_0x3d85cd['InterruptText'],_0x4f901d={'textColor':ColorManager[_0x172d33(0x164)](_0x3d85cd['InterruptTextColor']),'flashColor':_0x3d85cd[_0x172d33(0x120)],'flashDuration':_0x3d85cd['InterruptFlashDuration']};this[_0x172d33(0x316)](_0x2ec7d8,_0x4f901d);}},VisuMZ[_0x1c04e6(0x263)]['Game_Battler_startTpbCasting']=Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x1f0)],Game_Battler['prototype'][_0x1c04e6(0x1f0)]=function(){const _0x1a9e40=_0x1c04e6;VisuMZ[_0x1a9e40(0x263)][_0x1a9e40(0x32c)][_0x1a9e40(0x14b)](this),BattleManager['isATB']()&&(this[_0x1a9e40(0x190)]>=this[_0x1a9e40(0x2ac)]()&&(this[_0x1a9e40(0x170)]='ready'));},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x152)]=Game_Unit[_0x1c04e6(0x31c)][_0x1c04e6(0x1c0)],Game_Unit[_0x1c04e6(0x31c)]['updateTpb']=function(){const _0x4ec56a=_0x1c04e6;if(BattleManager[_0x4ec56a(0x12c)]()){if(_0x4ec56a(0x235)===_0x4ec56a(0x235)){if(BattleManager[_0x4ec56a(0x1d6)]()[_0x4ec56a(0x282)](_0xf6b748=>_0xf6b748&&_0xf6b748[_0x4ec56a(0x1e3)]()&&_0xf6b748[_0x4ec56a(0x33a)]()&&_0xf6b748['_tpbState']===_0x4ec56a(0x2b7)))return;}else{const _0x339edf=_0x5603f5[_0x4ec56a(0x263)][_0x4ec56a(0x156)][_0x4ec56a(0x1f6)];let _0x2be7ae=this[_0x4ec56a(0x117)]()*_0x20c5f9(_0x339edf[_0x4ec56a(0x2d5)]);const _0x5a42e3=this['traitObjects']()[_0x4ec56a(0x2ff)](this['skills']()),_0x500bf8=/<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x94ee4e=_0x5a42e3[_0x4ec56a(0x195)](_0x561b6e=>_0x561b6e&&_0x561b6e[_0x4ec56a(0x215)]['match'](_0x500bf8)?_0xba3450(_0x56415d['$1'])*0.01:0x0);_0x2be7ae=_0x94ee4e[_0x4ec56a(0x19c)]((_0x217d7c,_0x35918d)=>_0x217d7c+_0x35918d,_0x2be7ae),this['_tpbState']=_0x4ec56a(0x1a6),this[_0x4ec56a(0x1b7)]=(_0x38d9a5?0x1:_0x2be7ae)[_0x4ec56a(0x342)](0x0,0x1),this[_0x4ec56a(0x32d)]()&&(this['_tpbChargeTime']=0x0);}}VisuMZ[_0x4ec56a(0x263)][_0x4ec56a(0x152)][_0x4ec56a(0x14b)](this);},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x343)]=Game_Battler[_0x1c04e6(0x31c)]['onRestrict'],Game_Battler[_0x1c04e6(0x31c)]['onRestrict']=function(){const _0x2d4b8a=_0x1c04e6;!VisuMZ[_0x2d4b8a(0x263)][_0x2d4b8a(0x156)]['Mechanics'][_0x2d4b8a(0x337)]&&(_0x2d4b8a(0x177)===_0x2d4b8a(0x177)?this['_onRestrictBypassAtbReset']=BattleManager['isATB']():(_0x2c8d6f['BattleSystemATB'][_0x2d4b8a(0x314)][_0x2d4b8a(0x14b)](this),_0x1f15a9[_0x2d4b8a(0x1fa)]()&&this[_0x2d4b8a(0x28e)]())),VisuMZ['BattleSystemATB'][_0x2d4b8a(0x343)][_0x2d4b8a(0x14b)](this),this[_0x2d4b8a(0x2ad)]=undefined;},VisuMZ['BattleSystemATB'][_0x1c04e6(0x15c)]=Game_Actor['prototype'][_0x1c04e6(0x183)],Game_Actor[_0x1c04e6(0x31c)][_0x1c04e6(0x183)]=function(){const _0x313515=_0x1c04e6;if(this[_0x313515(0x2ad)]){if(_0x313515(0x13d)!==_0x313515(0x312)){if(!this[_0x313515(0x2ce)]())return;}else _0x7d4884[_0x313515(0x263)][_0x313515(0x24d)][_0x313515(0x14b)](this),this[_0x313515(0x30a)]();}VisuMZ[_0x313515(0x263)][_0x313515(0x15c)][_0x313515(0x14b)](this);},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x1f2)]=Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x339)],Game_Battler['prototype']['removeState']=function(_0x48e31e){const _0x35b09d=_0x1c04e6,_0x325699=!this[_0x35b09d(0x2ca)]()&&BattleManager['isTpb']();VisuMZ[_0x35b09d(0x263)]['Game_Battler_removeState'][_0x35b09d(0x14b)](this,_0x48e31e);if(_0x325699&&this[_0x35b09d(0x2ca)]()&&this['numActions']()<=0x0){if(_0x35b09d(0x17e)!==_0x35b09d(0x206))this[_0x35b09d(0x2df)](),this[_0x35b09d(0x170)]=_0x35b09d(0x1a6);else{const _0xf11de9=new _0x593dc9();_0xf11de9[_0x35b09d(0x2b8)]['x']=this[_0x35b09d(0x2b8)]['x'],_0xf11de9['anchor']['y']=this['anchor']['y'],this['_graphicSprite']=_0xf11de9,this['addChild'](this[_0x35b09d(0x1c5)]),this[_0x35b09d(0x2d2)]();}}},VisuMZ['BattleSystemATB'][_0x1c04e6(0x141)]=Game_Battler[_0x1c04e6(0x31c)]['applyTpbPenalty'],Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x14a)]=function(){const _0x44e90a=_0x1c04e6;if(BattleManager[_0x44e90a(0x12c)]()){if(_0x44e90a(0x22c)!==_0x44e90a(0x1a9))this[_0x44e90a(0x26f)]();else return this['processUpdateGraphic']();}else{if('gXGas'===_0x44e90a(0x14c))return this[_0x44e90a(0x133)]===_0x5db13a?_0xcdaf9a[_0x44e90a(0x26b)]()[this[_0x44e90a(0x18c)]]:_0x4b5d11[_0x44e90a(0x166)]()[this[_0x44e90a(0x18c)]];else VisuMZ[_0x44e90a(0x263)][_0x44e90a(0x141)][_0x44e90a(0x14b)](this);}},Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x26f)]=function(){const _0xf312b7=_0x1c04e6;this['_tpbState']=_0xf312b7(0x1a6),this[_0xf312b7(0x1b7)]+=VisuMZ[_0xf312b7(0x263)][_0xf312b7(0x156)][_0xf312b7(0x1f6)]['EscapeFailPenalty']||0x0;},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x216)]=Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x12b)],Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x12b)]=function(){const _0x5717f2=_0x1c04e6;return BattleManager[_0x5717f2(0x12c)]()?'nbbEm'===_0x5717f2(0x23d)?VisuMZ[_0x5717f2(0x263)]['Settings'][_0x5717f2(0x1f6)][_0x5717f2(0x1cc)][_0x5717f2(0x14b)](this,this):this['processUpdateGraphic']():_0x5717f2(0x1e0)!==_0x5717f2(0x304)?VisuMZ['BattleSystemATB'][_0x5717f2(0x216)][_0x5717f2(0x14b)](this):_0x5717f2(0x29c);},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x24b)]=Game_Battler['prototype'][_0x1c04e6(0x285)],Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x285)]=function(){const _0x4e5c7f=_0x1c04e6;if(BattleManager['isATB']())return'QtaHn'===_0x4e5c7f(0x1be)?VisuMZ[_0x4e5c7f(0x263)][_0x4e5c7f(0x156)][_0x4e5c7f(0x1f6)][_0x4e5c7f(0x15e)][_0x4e5c7f(0x14b)](this,this):_0x4aad47[_0x4e5c7f(0x12c)]()?_0x68dc66[_0x4e5c7f(0x263)][_0x4e5c7f(0x156)][_0x4e5c7f(0x1f6)][_0x4e5c7f(0x1cc)][_0x4e5c7f(0x14b)](this,this):_0x43cb99[_0x4e5c7f(0x263)][_0x4e5c7f(0x216)][_0x4e5c7f(0x14b)](this);else{if('mOirA'!==_0x4e5c7f(0x2c8))return VisuMZ[_0x4e5c7f(0x263)][_0x4e5c7f(0x24b)][_0x4e5c7f(0x14b)](this);else _0x2f59ff[_0x4e5c7f(0x263)][_0x4e5c7f(0x24f)][_0x4e5c7f(0x14b)](this),this[_0x4e5c7f(0x17d)]['addLoadListener'](this[_0x4e5c7f(0x207)][_0x4e5c7f(0x1b3)](this));}},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x33b)]=Game_Battler[_0x1c04e6(0x31c)]['tpbRelativeSpeed'],Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x117)]=function(){const _0x2cbac9=_0x1c04e6;return BattleManager[_0x2cbac9(0x12c)]()?_0x2cbac9(0x23a)==='hxOqh'?VisuMZ[_0x2cbac9(0x263)][_0x2cbac9(0x156)][_0x2cbac9(0x1f6)]['BattlerRelativeSpeedJS']['call'](this,this):this['_battler'][_0x2cbac9(0x2ce)]()?_0x5a13ee[_0x2cbac9(0x132)](this[_0x2cbac9(0x121)][_0x2cbac9(0x190)],0x0):_0x3d879b[_0x2cbac9(0x263)][_0x2cbac9(0x16b)][_0x2cbac9(0x14b)](this):VisuMZ[_0x2cbac9(0x263)][_0x2cbac9(0x33b)]['call'](this);},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x25a)]=Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x2f7)],Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x2f7)]=function(){const _0x347d96=_0x1c04e6;if(BattleManager['isATB']())return this[_0x347d96(0x224)]();else{if(_0x347d96(0x2ee)==='yBNjg')_0x11d76f=_0x725abc*_0x349fcc;else return VisuMZ[_0x347d96(0x263)][_0x347d96(0x25a)]['call'](this);}},Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x224)]=function(){const _0x4ebd0d=_0x1c04e6;let _0x2d3d63=VisuMZ['BattleSystemATB'][_0x4ebd0d(0x156)][_0x4ebd0d(0x1f6)][_0x4ebd0d(0x330)]['call'](this,this);if(ConfigManager&&ConfigManager['atbSpeed']!==undefined){const _0x37f98b=ConfigManager[_0x4ebd0d(0x12f)]-0x3;if(_0x37f98b>0x0){if(_0x4ebd0d(0x326)!==_0x4ebd0d(0x326)){const _0x13f5b3=_0x15b790[_0x4ebd0d(0x124)],_0x1caf08={'textColor':_0x36ce1d[_0x4ebd0d(0x164)](_0x37b041['InterruptTextColor']),'flashColor':_0x52e7da[_0x4ebd0d(0x120)],'flashDuration':_0x1a225a[_0x4ebd0d(0x256)]};this[_0x4ebd0d(0x316)](_0x13f5b3,_0x1caf08);}else return _0x2d3d63*(_0x37f98b*0x2);}else{if(_0x37f98b<0x0)return _0x2d3d63*(0x1/(_0x37f98b*-0x2));}}return _0x2d3d63;},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x116)]=Game_Battler[_0x1c04e6(0x31c)]['tpbRequiredCastTime'],Game_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x2ac)]=function(){const _0x31952f=_0x1c04e6;return BattleManager[_0x31952f(0x12c)]()?VisuMZ[_0x31952f(0x263)][_0x31952f(0x156)][_0x31952f(0x1f6)]['TpbCastTimeJS'][_0x31952f(0x14b)](this,this):VisuMZ[_0x31952f(0x263)][_0x31952f(0x116)][_0x31952f(0x14b)](this);},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x281)]=Scene_Options[_0x1c04e6(0x31c)][_0x1c04e6(0x33c)],Scene_Options['prototype']['maxCommands']=function(){const _0x1fabf3=_0x1c04e6;let _0x4e3ca4=VisuMZ[_0x1fabf3(0x263)]['Scene_Options_maxCommands'][_0x1fabf3(0x14b)](this);const _0x5f4ff3=VisuMZ[_0x1fabf3(0x263)][_0x1fabf3(0x156)];if(_0x5f4ff3[_0x1fabf3(0x1d5)]['AddOption']&&_0x5f4ff3[_0x1fabf3(0x1d5)]['AdjustRect']&&BattleManager[_0x1fabf3(0x12c)]())_0x4e3ca4++;return _0x4e3ca4;},Sprite_Battler[_0x1c04e6(0x31c)]['createAtbGaugeSprite']=function(){const _0x2fcebf=_0x1c04e6;if(!BattleManager[_0x2fcebf(0x12c)]())return;if(!ConfigManager[_0x2fcebf(0x1ca)])return;const _0x414eac=VisuMZ[_0x2fcebf(0x263)][_0x2fcebf(0x156)][_0x2fcebf(0x174)],_0x2ee8c5=new Sprite_Gauge();_0x2ee8c5[_0x2fcebf(0x2b8)]['x']=_0x414eac[_0x2fcebf(0x272)],_0x2ee8c5[_0x2fcebf(0x2b8)]['y']=_0x414eac[_0x2fcebf(0x2e4)],_0x2ee8c5['scale']['x']=_0x2ee8c5[_0x2fcebf(0x186)]['y']=_0x414eac['Scale'],this['_atbGaugeSprite']=_0x2ee8c5,this[_0x2fcebf(0x13e)](this[_0x2fcebf(0x1d0)]);},VisuMZ['BattleSystemATB']['Sprite_Battler_setBattler']=Sprite_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x2d4)],Sprite_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x2d4)]=function(_0x5157bf){const _0x598c2f=_0x1c04e6;VisuMZ[_0x598c2f(0x263)][_0x598c2f(0x14e)][_0x598c2f(0x14b)](this,_0x5157bf),this[_0x598c2f(0x318)](_0x5157bf),this[_0x598c2f(0x1e7)]();},Sprite_Battler[_0x1c04e6(0x31c)]['setupAtbGaugeSprite']=function(_0x547182){const _0x59b6ab=_0x1c04e6;if(!_0x547182)return;if(!this[_0x59b6ab(0x1d0)])return;if(_0x547182[_0x59b6ab(0x324)]()){}else{if(_0x547182[_0x59b6ab(0x28c)]()){if(this[_0x59b6ab(0x2e3)]===Sprite_Enemy&&_0x547182[_0x59b6ab(0x349)]())return;if(this['constructor']===Sprite_SvEnemy&&!_0x547182[_0x59b6ab(0x349)]())return;}}this[_0x59b6ab(0x1d0)][_0x59b6ab(0x233)](_0x547182,_0x59b6ab(0x194));},Sprite_Battler[_0x1c04e6(0x31c)]['updateAtbGaugeSpriteVisibility']=function(){const _0x5236ea=_0x1c04e6;if(!this[_0x5236ea(0x1d0)])return;const _0x415be4=this[_0x5236ea(0x121)]&&this['_battler'][_0x5236ea(0x33a)]()&&!this[_0x5236ea(0x121)][_0x5236ea(0x2eb)]();this[_0x5236ea(0x1d0)][_0x5236ea(0x159)]=_0x415be4,this['_svBattlerSprite']&&this[_0x5236ea(0x336)][_0x5236ea(0x1d0)]&&(this[_0x5236ea(0x336)]['_atbGaugeSprite'][_0x5236ea(0x159)]=_0x415be4);},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x24d)]=Sprite_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x1c1)],Sprite_Battler['prototype'][_0x1c04e6(0x1c1)]=function(){const _0x1ad60b=_0x1c04e6;VisuMZ[_0x1ad60b(0x263)][_0x1ad60b(0x24d)]['call'](this),this[_0x1ad60b(0x30a)]();},Sprite_Battler['prototype']['updateAtbGaugeSpritePosition']=function(){const _0x1af3d7=_0x1c04e6;if(!this[_0x1af3d7(0x121)])return;if(!this[_0x1af3d7(0x1d0)])return;const _0x115943=VisuMZ[_0x1af3d7(0x263)][_0x1af3d7(0x156)]['Gauge'],_0x1ec76b=this['_atbGaugeSprite'];let _0x48bc4e=_0x115943[_0x1af3d7(0x130)];this[_0x1af3d7(0x121)]['battleUIOffsetX']&&(_0x48bc4e+=this[_0x1af3d7(0x121)][_0x1af3d7(0x150)]());let _0x194c80=_0x115943[_0x1af3d7(0x1bc)];this[_0x1af3d7(0x121)]['battleUIOffsetY']&&(_0x194c80+=this[_0x1af3d7(0x121)][_0x1af3d7(0x209)]());_0x1ec76b['x']=_0x48bc4e,_0x1ec76b['y']=-this[_0x1af3d7(0x1b5)]+_0x194c80;if(this[_0x1af3d7(0x121)][_0x1af3d7(0x28c)]()){if(this['_battler'][_0x1af3d7(0x23e)]()[_0x1af3d7(0x215)][_0x1af3d7(0x2fd)](/<HIDE (?:ATB|TPB) GAUGE>/i)){if(_0x1af3d7(0x1ad)===_0x1af3d7(0x321)){if(!_0x55065a[_0x1af3d7(0x12c)]())return;if(!_0x84a1be['Settings'][_0x1af3d7(0x29e)])return;if(!_0x394b4b[_0x1af3d7(0x1ca)])return;this[_0x1af3d7(0x16c)]=new _0x218345(),this['_fieldGaugeATB_Container'][_0x1af3d7(0x13e)](this['_fieldGaugeATB']);}else _0x1ec76b[_0x1af3d7(0x159)]=![];}}this[_0x1af3d7(0x230)]()&&(_0x1af3d7(0x333)===_0x1af3d7(0x333)?_0x1ec76b['y']+=_0x1ec76b[_0x1af3d7(0x151)]()*_0x115943[_0x1af3d7(0x308)]-0x1:_0x382cdd[_0x1af3d7(0x263)]['Window_Help_setItem']['call'](this,_0x4ab2c8));if(this[_0x1af3d7(0x186)]['x']<0x0){if(_0x1af3d7(0x29d)==='gROqZ'){if(_0x1464f8[_0x1af3d7(0x310)]&&this[_0x1af3d7(0x1f3)]())return![];return this['isTpb']();}else _0x1ec76b[_0x1af3d7(0x186)]['x']=-Math[_0x1af3d7(0x346)](_0x1ec76b['scale']['x']);}},Sprite_Battler[_0x1c04e6(0x31c)][_0x1c04e6(0x230)]=function(){const _0xec989=_0x1c04e6;if(!Imported[_0xec989(0x253)])return![];if(this[_0xec989(0x121)]&&this[_0xec989(0x121)][_0xec989(0x28c)]())return![];const _0x92cb0d=VisuMZ[_0xec989(0x2fc)][_0xec989(0x156)]['Aggro'];if(!_0x92cb0d[_0xec989(0x16e)])return![];if(!ConfigManager[_0xec989(0x1d1)])return![];const _0x1a7457=VisuMZ['BattleSystemATB'][_0xec989(0x156)][_0xec989(0x174)];return _0x92cb0d[_0xec989(0x308)]===_0x1a7457['Scale']&&_0x92cb0d[_0xec989(0x272)]===_0x1a7457[_0xec989(0x272)]&&_0x92cb0d['AnchorY']===_0x1a7457[_0xec989(0x2e4)]&&_0x92cb0d[_0xec989(0x130)]===_0x1a7457[_0xec989(0x130)]&&_0x92cb0d[_0xec989(0x1bc)]===_0x1a7457[_0xec989(0x1bc)]&&!![];},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x1b0)]=Sprite_Battler['prototype'][_0x1c04e6(0x276)],Sprite_Battler['prototype'][_0x1c04e6(0x276)]=function(){const _0x6ad53=_0x1c04e6;VisuMZ['BattleSystemATB'][_0x6ad53(0x1b0)][_0x6ad53(0x14b)](this);if(!this[_0x6ad53(0x121)]&&this['_atbGaugeSprite']){if(_0x6ad53(0x2c6)===_0x6ad53(0x2c6))this['_atbGaugeSprite'][_0x6ad53(0x159)]=![],this[_0x6ad53(0x336)]&&(_0x6ad53(0x212)!==_0x6ad53(0x13b)?this[_0x6ad53(0x336)][_0x6ad53(0x1d0)][_0x6ad53(0x159)]=![]:this[_0x6ad53(0x115)]=this['createFieldAtbGraphicIconIndex']());else{const _0x97f2e3=_0x1a414e[_0x6ad53(0x12f)]-0x3;if(_0x97f2e3>0x0)return _0x35eebb*(_0x97f2e3*0x2);else{if(_0x97f2e3<0x0)return _0x2b0c6e*(0x1/(_0x97f2e3*-0x2));}}}},VisuMZ['BattleSystemATB'][_0x1c04e6(0x222)]=Sprite_Actor['prototype'][_0x1c04e6(0x2aa)],Sprite_Actor[_0x1c04e6(0x31c)][_0x1c04e6(0x2aa)]=function(){const _0x518be8=_0x1c04e6;VisuMZ[_0x518be8(0x263)][_0x518be8(0x222)]['call'](this),VisuMZ['BattleSystemATB'][_0x518be8(0x156)]['Gauge'][_0x518be8(0x154)]&&this[_0x518be8(0x2ef)]();},VisuMZ[_0x1c04e6(0x263)]['Sprite_Enemy_createStateIconSprite']=Sprite_Enemy['prototype'][_0x1c04e6(0x320)],Sprite_Enemy[_0x1c04e6(0x31c)][_0x1c04e6(0x320)]=function(){const _0x2b3839=_0x1c04e6;VisuMZ[_0x2b3839(0x263)][_0x2b3839(0x156)]['Gauge'][_0x2b3839(0x1f7)]&&this[_0x2b3839(0x2ef)](),VisuMZ[_0x2b3839(0x263)][_0x2b3839(0x270)]['call'](this);},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x19d)]=Sprite_Enemy[_0x1c04e6(0x31c)][_0x1c04e6(0x2a6)],Sprite_Enemy['prototype'][_0x1c04e6(0x2a6)]=function(_0x5ea4c8){const _0x46b607=_0x1c04e6;VisuMZ['BattleSystemATB']['Sprite_Enemy_startEffect']['call'](this,_0x5ea4c8),(_0x5ea4c8===_0x46b607(0x2a7)||_0x46b607(0x17f))&&this[_0x46b607(0x1e7)]();},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x168)]=Game_BattlerBase[_0x1c04e6(0x31c)][_0x1c04e6(0x2a7)],Game_BattlerBase[_0x1c04e6(0x31c)][_0x1c04e6(0x2a7)]=function(){const _0x192ea4=_0x1c04e6;VisuMZ[_0x192ea4(0x263)][_0x192ea4(0x168)][_0x192ea4(0x14b)](this);if(this[_0x192ea4(0x28c)]()&&BattleManager[_0x192ea4(0x12c)]()&&this[_0x192ea4(0x218)]()){if(_0x192ea4(0x1d9)===_0x192ea4(0x289))return _0x33aff0[_0x192ea4(0x263)][_0x192ea4(0x2e5)][_0x192ea4(0x14b)](this);else this[_0x192ea4(0x218)]()['_fnord']=!![],this[_0x192ea4(0x218)]()[_0x192ea4(0x1e7)]();}},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x1bd)]=Sprite_Gauge[_0x1c04e6(0x31c)][_0x1c04e6(0x2ec)],Sprite_Gauge[_0x1c04e6(0x31c)][_0x1c04e6(0x2ec)]=function(){const _0xb69b16=_0x1c04e6;if(this[_0xb69b16(0x123)]===_0xb69b16(0x194))return this[_0xb69b16(0x2c1)](0x1);return VisuMZ[_0xb69b16(0x263)]['Sprite_Gauge_gaugeColor1'][_0xb69b16(0x14b)](this);},VisuMZ['BattleSystemATB'][_0x1c04e6(0x2fb)]=Sprite_Gauge['prototype'][_0x1c04e6(0x214)],Sprite_Gauge[_0x1c04e6(0x31c)][_0x1c04e6(0x214)]=function(){const _0x29768b=_0x1c04e6;if(this[_0x29768b(0x123)]===_0x29768b(0x194))return this[_0x29768b(0x2c1)](0x2);return VisuMZ['BattleSystemATB'][_0x29768b(0x2fb)]['call'](this);},Sprite_Gauge[_0x1c04e6(0x31c)][_0x1c04e6(0x2c1)]=function(_0x5b40c7){const _0x445079=_0x1c04e6;if(!this[_0x445079(0x121)])return ColorManager[_0x445079(0x1de)](_0x445079(0x2fa)[_0x445079(0x1a0)](_0x5b40c7));if(this[_0x445079(0x121)][_0x445079(0x1ef)]())return ColorManager[_0x445079(0x1de)](_0x445079(0x2f5)['format'](_0x5b40c7));if(this[_0x445079(0x121)][_0x445079(0x2ce)]())return ColorManager[_0x445079(0x1de)](_0x445079(0x2e6)['format'](_0x5b40c7));if(this[_0x445079(0x127)]()>=0x1)return ColorManager['atbColor']('full%1'[_0x445079(0x1a0)](_0x5b40c7));const _0x917cdd=VisuMZ[_0x445079(0x263)]['Settings']['Gauge'],_0x33f838=this[_0x445079(0x121)][_0x445079(0x2a9)](0x6)*this[_0x445079(0x121)][_0x445079(0x2d0)](0x6);if(_0x33f838<=_0x917cdd[_0x445079(0x18d)])return ColorManager[_0x445079(0x1de)](_0x445079(0x2e9)[_0x445079(0x1a0)](_0x5b40c7));if(_0x33f838>=_0x917cdd['FastRate'])return ColorManager[_0x445079(0x1de)](_0x445079(0x1a7)[_0x445079(0x1a0)](_0x5b40c7));return ColorManager['atbColor'](_0x445079(0x2fa)[_0x445079(0x1a0)](_0x5b40c7));},VisuMZ[_0x1c04e6(0x263)]['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x1c04e6(0x31c)]['currentValue'],Sprite_Gauge['prototype'][_0x1c04e6(0x14d)]=function(){const _0x5d3419=_0x1c04e6;if(this[_0x5d3419(0x121)]&&this['_statusType']==='time')return this[_0x5d3419(0x1c6)]();return VisuMZ[_0x5d3419(0x263)]['Sprite_Gauge_currentValue'][_0x5d3419(0x14b)](this);},Sprite_Gauge[_0x1c04e6(0x31c)][_0x1c04e6(0x1c6)]=function(){const _0x5663f0=_0x1c04e6;return this[_0x5663f0(0x121)][_0x5663f0(0x2ce)]()?Math[_0x5663f0(0x132)](this[_0x5663f0(0x121)][_0x5663f0(0x190)],0x0):VisuMZ[_0x5663f0(0x263)][_0x5663f0(0x16b)][_0x5663f0(0x14b)](this);},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x2cb)]=Sprite_Gauge[_0x1c04e6(0x31c)]['currentMaxValue'],Sprite_Gauge[_0x1c04e6(0x31c)][_0x1c04e6(0x199)]=function(){const _0xfe6736=_0x1c04e6;if(this[_0xfe6736(0x121)]&&this[_0xfe6736(0x123)]==='time')return this['atbCurrentMaxValue']();return VisuMZ[_0xfe6736(0x263)][_0xfe6736(0x2cb)][_0xfe6736(0x14b)](this);},Sprite_Gauge[_0x1c04e6(0x31c)]['atbCurrentMaxValue']=function(){const _0x354a48=_0x1c04e6;return this[_0x354a48(0x121)][_0x354a48(0x2ce)]()?_0x354a48(0x153)!==_0x354a48(0x153)?this[_0x354a48(0x2d2)]():Math[_0x354a48(0x132)](this[_0x354a48(0x121)][_0x354a48(0x2ac)](),0x1):VisuMZ[_0x354a48(0x263)][_0x354a48(0x2cb)][_0x354a48(0x14b)](this);},VisuMZ['BattleSystemATB']['Window_Help_setItem']=Window_Help['prototype']['setItem'],Window_Help['prototype']['setItem']=function(_0x3330f0){const _0x3adcfb=_0x1c04e6;if(BattleManager[_0x3adcfb(0x12c)]()&&_0x3330f0&&_0x3330f0[_0x3adcfb(0x215)]&&_0x3330f0['note'][_0x3adcfb(0x2fd)](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i))this[_0x3adcfb(0x286)](String(RegExp['$1']));else{if(_0x3adcfb(0x2de)!==_0x3adcfb(0x19a))VisuMZ['BattleSystemATB'][_0x3adcfb(0x1df)]['call'](this,_0x3330f0);else{const _0x4bcf35=_0x295981[_0x3adcfb(0x263)]['JS'][_0x597132]['call'](this,this['subject'](),_0xabc148);_0x16e765['setAtbChargeTime'](_0x4bcf35);}}},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x338)]=Window_StatusBase[_0x1c04e6(0x31c)]['placeGauge'],Window_StatusBase[_0x1c04e6(0x31c)][_0x1c04e6(0x173)]=function(_0x20382e,_0x21e577,_0x44dad3,_0x30f777){const _0x5a389c=_0x1c04e6;if(!this[_0x5a389c(0x145)](_0x21e577))return;VisuMZ[_0x5a389c(0x263)][_0x5a389c(0x338)]['call'](this,_0x20382e,_0x21e577,_0x44dad3,_0x30f777);},Window_StatusBase[_0x1c04e6(0x31c)][_0x1c04e6(0x145)]=function(_0x2267b4){const _0x5b6a0c=_0x1c04e6;if(_0x2267b4!==_0x5b6a0c(0x194))return!![];if(![_0x5b6a0c(0x201),_0x5b6a0c(0x261)][_0x5b6a0c(0x1f5)](this[_0x5b6a0c(0x2e3)][_0x5b6a0c(0x134)]))return![];if(!BattleManager['isATB']())return![];if(!ConfigManager[_0x5b6a0c(0x1ca)])return![];return VisuMZ[_0x5b6a0c(0x263)][_0x5b6a0c(0x156)][_0x5b6a0c(0x174)][_0x5b6a0c(0x17c)];},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x171)]=Window_Options[_0x1c04e6(0x31c)]['addGeneralOptions'],Window_Options[_0x1c04e6(0x31c)][_0x1c04e6(0x1a8)]=function(){const _0xb3bb7d=_0x1c04e6;VisuMZ[_0xb3bb7d(0x263)][_0xb3bb7d(0x171)][_0xb3bb7d(0x14b)](this),this[_0xb3bb7d(0x13a)]();},Window_Options['prototype'][_0x1c04e6(0x13a)]=function(){const _0x5ae7f4=_0x1c04e6;if(!BattleManager[_0x5ae7f4(0x12c)]())return;VisuMZ[_0x5ae7f4(0x263)]['Settings'][_0x5ae7f4(0x1d5)][_0x5ae7f4(0x16a)]&&(_0x5ae7f4(0x238)===_0x5ae7f4(0x238)?this[_0x5ae7f4(0x313)]():(this[_0x5ae7f4(0x27e)]=new _0x4e8e68(),this[_0x5ae7f4(0x13e)](this['_gaugeSprite']),this[_0x5ae7f4(0x1eb)]()));},Window_Options['prototype']['addBattleSystemATBShowGaugeCommand']=function(){const _0x227a05=_0x1c04e6,_0x4db6c2=TextManager[_0x227a05(0x1ca)],_0x7f381d=_0x227a05(0x1ca);this[_0x227a05(0x2b5)](_0x4db6c2,_0x7f381d);},Game_BattlerBase[_0x1c04e6(0x31c)]['clearFieldAtbGraphics']=function(){const _0xb78266=_0x1c04e6;delete this[_0xb78266(0x31f)],delete this['_fieldAtbGaugeFaceName'],delete this['_fieldAtbGaugeFaceIndex'],delete this[_0xb78266(0x115)];},Game_BattlerBase[_0x1c04e6(0x31c)][_0x1c04e6(0x33f)]=function(){const _0x2f6bf2=_0x1c04e6;return this[_0x2f6bf2(0x31f)]===undefined&&(_0x2f6bf2(0x179)===_0x2f6bf2(0x179)?this['_fieldAtbGaugeGraphicType']=this[_0x2f6bf2(0x30d)]():(this['y']=_0x5e409b[_0x2f6bf2(0x241)]/0x2,this['y']+=_0x3032b8?-_0x59578e:_0x288041)),this[_0x2f6bf2(0x31f)];},Game_BattlerBase['prototype'][_0x1c04e6(0x30d)]=function(){const _0x3abe0c=_0x1c04e6;return Sprite_FieldGaugeATB[_0x3abe0c(0x156)][_0x3abe0c(0x340)];},Game_BattlerBase[_0x1c04e6(0x31c)][_0x1c04e6(0x20c)]=function(){const _0x113cc5=_0x1c04e6;return this['_fieldAtbGaugeFaceName']===undefined&&(this[_0x113cc5(0x1e6)]=this[_0x113cc5(0x1bf)]()),this['_fieldAtbGaugeFaceName'];},Game_BattlerBase[_0x1c04e6(0x31c)]['createFieldAtbGraphicFaceName']=function(){const _0x495347=_0x1c04e6;return Sprite_FieldGaugeATB[_0x495347(0x156)]['EnemyBattlerFaceName'];},Game_BattlerBase[_0x1c04e6(0x31c)]['fieldAtbGraphicFaceIndex']=function(){const _0x535c8d=_0x1c04e6;return this[_0x535c8d(0x12d)]===undefined&&(_0x535c8d(0x18e)!==_0x535c8d(0x18e)?(!_0x1b8239[_0x535c8d(0x263)][_0x535c8d(0x156)][_0x535c8d(0x1f6)][_0x535c8d(0x337)]&&(this[_0x535c8d(0x2ad)]=_0x56cadb[_0x535c8d(0x12c)]()),_0x5e4a8a[_0x535c8d(0x263)][_0x535c8d(0x343)][_0x535c8d(0x14b)](this),this[_0x535c8d(0x2ad)]=_0x13821b):this[_0x535c8d(0x12d)]=this[_0x535c8d(0x344)]()),this[_0x535c8d(0x12d)];},Game_BattlerBase['prototype'][_0x1c04e6(0x344)]=function(){const _0x36c2fa=_0x1c04e6;return Sprite_FieldGaugeATB['Settings'][_0x36c2fa(0x271)];},Game_BattlerBase['prototype'][_0x1c04e6(0x1fd)]=function(){const _0x31a40c=_0x1c04e6;return this['_fieldAtbGaugeIconIndex']===undefined&&('CMdVv'!==_0x31a40c(0x2e8)?(_0x1f358c[_0x31a40c(0x263)][_0x31a40c(0x277)][_0x31a40c(0x14b)](this,_0x364f37),this[_0x31a40c(0x2cd)](_0x55c958)):this[_0x31a40c(0x115)]=this[_0x31a40c(0x297)]()),this[_0x31a40c(0x115)];},Game_BattlerBase[_0x1c04e6(0x31c)][_0x1c04e6(0x297)]=function(){const _0x4ce591=_0x1c04e6;return Sprite_FieldGaugeATB[_0x4ce591(0x156)][_0x4ce591(0x2f6)];},Game_BattlerBase[_0x1c04e6(0x31c)]['setAtbGraphicIconIndex']=function(_0x13ba6d){const _0x2d9451=_0x1c04e6;this[_0x2d9451(0x115)]=_0x13ba6d;},Game_Actor['prototype']['createFieldAtbGraphicType']=function(){const _0xab78b2=_0x1c04e6,_0x2f6e6f=this[_0xab78b2(0x265)]()[_0xab78b2(0x215)];if(_0x2f6e6f[_0xab78b2(0x2fd)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0xab78b2(0x29c);else{if(_0x2f6e6f[_0xab78b2(0x2fd)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return'icon';}return Sprite_FieldGaugeATB['Settings']['ActorBattlerType'];},Game_Actor[_0x1c04e6(0x31c)]['fieldAtbGraphicFaceName']=function(){const _0x391733=_0x1c04e6,_0x3c9165=this['actor']()['note'];if(_0x3c9165[_0x391733(0x2fd)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x391733(0x1dd)]();},Game_Actor[_0x1c04e6(0x31c)][_0x1c04e6(0x161)]=function(){const _0xdffd2c=_0x1c04e6,_0x8f852=this[_0xdffd2c(0x265)]()[_0xdffd2c(0x215)];if(_0x8f852[_0xdffd2c(0x2fd)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this['faceIndex']();},Game_Actor[_0x1c04e6(0x31c)][_0x1c04e6(0x297)]=function(){const _0x50deda=_0x1c04e6,_0x201059=this[_0x50deda(0x265)]()[_0x50deda(0x215)];if(_0x201059['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x50deda(0x156)][_0x50deda(0x315)];},Game_Enemy[_0x1c04e6(0x31c)][_0x1c04e6(0x30d)]=function(){const _0x43b4d4=_0x1c04e6,_0x2fed8f=this[_0x43b4d4(0x23e)]()[_0x43b4d4(0x215)];if(_0x2fed8f['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x43b4d4(0x1f8)!==_0x43b4d4(0x139))return _0x43b4d4(0x29c);else _0x470978[_0x43b4d4(0x31c)]['update'][_0x43b4d4(0x14b)](this),this[_0x43b4d4(0x128)](),this[_0x43b4d4(0x27b)](),this[_0x43b4d4(0x278)]();}else{if(_0x2fed8f[_0x43b4d4(0x2fd)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x43b4d4(0x19f);}return Sprite_FieldGaugeATB[_0x43b4d4(0x156)][_0x43b4d4(0x340)];},Game_Enemy['prototype'][_0x1c04e6(0x1bf)]=function(){const _0x4a0424=_0x1c04e6,_0x37e9bb=this[_0x4a0424(0x23e)]()['note'];if(_0x37e9bb['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Sprite_FieldGaugeATB[_0x4a0424(0x156)]['EnemyBattlerFaceName'];},Game_Enemy['prototype']['createFieldAtbGraphicFaceIndex']=function(){const _0x565f89=_0x1c04e6,_0x2e0925=this[_0x565f89(0x23e)]()['note'];if(_0x2e0925['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if('NQIYw'!==_0x565f89(0x24e))this[_0x565f89(0x307)](_0x4925d9);else return Number(RegExp['$2']);}return Sprite_FieldGaugeATB[_0x565f89(0x156)][_0x565f89(0x271)];},Game_Enemy[_0x1c04e6(0x31c)][_0x1c04e6(0x297)]=function(){const _0x199715=_0x1c04e6,_0x1b4bd8=this[_0x199715(0x23e)]()[_0x199715(0x215)];if(_0x1b4bd8['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x199715(0x156)][_0x199715(0x2f6)];},VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x2a1)]=Scene_Battle[_0x1c04e6(0x31c)][_0x1c04e6(0x1e1)],Scene_Battle['prototype'][_0x1c04e6(0x1e1)]=function(){const _0x142b24=_0x1c04e6;this[_0x142b24(0x1cf)](),VisuMZ[_0x142b24(0x263)]['Scene_Battle_createAllWindows']['call'](this),this[_0x142b24(0x347)]();},Scene_Battle['prototype']['createFieldGaugeContainerATB']=function(){const _0x150a2c=_0x1c04e6;if(!BattleManager[_0x150a2c(0x12c)]())return;if(!Sprite_FieldGaugeATB[_0x150a2c(0x156)][_0x150a2c(0x29e)])return;if(!ConfigManager[_0x150a2c(0x1ca)])return;this[_0x150a2c(0x119)]=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0x4ef2ed=this[_0x150a2c(0x1f9)](this[_0x150a2c(0x273)]);this[_0x150a2c(0x2d1)](this[_0x150a2c(0x119)],_0x4ef2ed);},Scene_Battle[_0x1c04e6(0x31c)][_0x1c04e6(0x347)]=function(){const _0x13b0d2=_0x1c04e6;if(!BattleManager['isATB']())return;if(!Sprite_FieldGaugeATB[_0x13b0d2(0x156)][_0x13b0d2(0x29e)])return;if(!ConfigManager[_0x13b0d2(0x1ca)])return;this['_fieldGaugeATB']=new Sprite_FieldGaugeATB(),this[_0x13b0d2(0x119)][_0x13b0d2(0x13e)](this[_0x13b0d2(0x16c)]);};function Sprite_FieldGaugeATB(){const _0x236444=_0x1c04e6;this[_0x236444(0x2ae)](...arguments);}function _0x584b(){const _0x3522e9=['SlowRate','mmLEj','QQCtj','_tpbCastTime','Class-%1-%2','ARRAYSTR','295kIQqwv','time','map','battlerName','EnemyBattlerFaceName','changeEnemyGraphicBitmap','currentMaxValue','qJGoG','eBZAK','reduce','Sprite_Enemy_startEffect','getStateTooltipBattler','icon','format','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','FieldGaugeEnemyFace','UehQA','dKVTw','_statusWindow','charging','fast%1','addGeneralOptions','mOqhP','isDead','initMembers','%1BgColor2','EAgyr','MxawL','EVAL','Sprite_Battler_update','_atbColors','applyItemBattleSystemATBUserEffect','bind','removeChild','height','getAtbCastTimeRate','_tpbChargeTime','svActorVertCells','InterruptAnimationID','ctGaugeColor1','cast','OffsetY','Sprite_Gauge_gaugeColor1','QtaHn','createFieldAtbGraphicFaceName','updateTpb','updateMain','textColor','updateSelectionEffect','fcmji','_graphicSprite','atbCurrentValue','_battlerContainer','BattleManager_endBattlerActions','updateGraphicHue','visualAtbGauge','RepositionTopForHelp','TpbSpeedCalcJS','updatePositionOnGauge','JSON','createFieldGaugeContainerATB','_atbGaugeSprite','aggroGauge','27krpBZu','svBattlerName','setFrame','Options','allBattleMembers','HewdV','fKQBP','zUIBb','createBattlerSprite','MarkerOffset','7326CrHFTK','faceName','atbColor','Window_Help_setItem','pkZSM','createAllWindows','rvTQk','isAlive','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','FaceIndex','_fieldAtbGaugeFaceName','updateAtbGaugeSpriteVisibility','createActorSprites','FieldGaugeActorIcon','numActions','createGaugeBitmap','drawGaugeBitmap','ACene','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','atbStopped','startTpbCasting','Interrupt','Game_Battler_removeState','isCTB','setBattleSystemATBFieldGaugeVisible','includes','Mechanics','ShowEnemyGauge','ZoznB','getChildIndex','isTpb','onAtbInterrupt','clear','fieldAtbGraphicIconIndex','fast','_graphicHue','filter','Window_BattleStatus','targetPositionOnGauge','_letter','xLvLj','ShowMarkerBg','pkUtT','setupBattleSystemATBColors','_scene','battleUIOffsetY','rsMiK','_atbFieldGaugeVisible','fieldAtbGraphicFaceName','fFrRx','xRGbm','STRUCT','Scene_Boot_onDatabaseLoaded','_forcing','xkrBK','Game_Battler_clearTpbChargeTime','gaugeColor2','note','Game_Battler_tpbSpeed','ParseItemNotetags','battler','faceHeight','endBattlerActions','loadSvActor','Game_Battler_initTpbChargeTime','GaugeLengthVert','isSideView','exit','RegExp','compareBattlerSprites','Sprite_Actor_createStateSprite','InterruptMirror','atbAcceleration','revive','targetOpacity','setupArrowSprite','updateOpacity','GIZyB','GjEur','_arrowSprite','JCznA','Game_System_initialize','EnemyBattlerFontSize','setHomeLocation','checkAggroControlSystemOffsetYAdjustment','HmltX','enpPl','setup','RepositionTopHelpY','TfjqW','process_VisuMZ_BattleSystemATB_JS_Notetags','InterruptMute','wZJIc','FUNC','hxOqh','sfjNE','die','nbbEm','enemy','fontFace','boxHeight','GaugeThick','updateGraphic','updatePositionOffset','NUM','bottom','uzeHA','traitObjects','Color','ParseAllNotetags','ConfigManager_applyData','Game_Battler_tpbBaseSpeed','vMTbR','Sprite_Battler_updateMain','NQIYw','ColorManager_loadWindowskin','%1SystemBg','DisplayPosition','faceWidth','VisuMZ_2_AggroControlSystem','createGaugeSprite','FieldGaugeEnemyIcon','InterruptFlashDuration','applyGlobalBattleSystemATBEffects','createJS','ConfigManager_makeData','Game_Battler_tpbAcceleration','KRFyk','makeDeepCopy','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ParseSkillNotetags','status','_graphicType','Window_SideviewUiBattleStatus','Cast','BattleSystemATB','qOOoT','actor','version','1678930fanXbY','VisuMZ_0_CoreEngine','loadFace','isAtbChargingState','battleMembers','CQxqu','QfONz','OpacityRate','applyATBPenalty','Sprite_Enemy_createStateIconSprite','EnemyBattlerFaceIndex','AnchorX','_windowLayer','ARRAYNUM','loadWindowskin','update','Game_Action_applyItemUserEffect','updateVisibility','24rlsZlM','_homeY','updateBattleContainerOrder','dYMYU','item','_gaugeSprite','nefGn','Actor-%1-%2','Scene_Options_maxCommands','some','createBorderSprite','ActorBattlerType','tpbBaseSpeed','setText','#000000','stop','hANuT','createBattlerContainer','createArrowSprite','isEnemy','parameters','clearTpbChargeTime','ShMoK','speed','QCqJx','ARRAYFUNC','(?:GAUGE|TIME|SPEED)','mainSprite','createFieldGaugeSkin','length','createFieldAtbGraphicIconIndex','gradientFillRect','JKamN','_backgroundSprite','createGraphicSprite','face','pkiWt','UseFieldGauge','casting','GaugeSystemSkin','Scene_Battle_createAllWindows','44730nHgBXA','QLmvf','boxWidth','MarkerArrowWindowSkin','startEffect','appear','createChildren','paramRate','createStateSprite','VisuMZ_1_BattleCore','tpbRequiredCastTime','_onRestrictBypassAtbReset','initialize','EnemyBattlerFontFace','DrawGauge','qtcko','EnemyBattlerDrawLetter','createKeyJS','tViEA','addCommand','PQSed','ready','anchor','lineHeight','tMCzx','DtFPW','Item-%1-%2','vqnti','applyItemUserEffect','blt','width','atbGaugeColor','left','_letterSprite','createEnemySprites','(?:ATB|TPB)','BvKBc','517112QTxsnX','vtwRg','%1Side','canMove','Sprite_Gauge_currentMaxValue','701393tpJAFd','applyBattleSystemATBUserEffect','isAtbCastingState','Weapon-%1-%2','paramBuffRate','addChildAt','processUpdateGraphic','requestFauxAnimation','setBattler','InitialGaugeJS','SystemFieldGaugeVisibility','children','applyGlobal','HPiZM','After','_graphicFaceIndex','mtXgN','HDuuW','USeip','makeActions','%1BorderColor','RepositionTopHelpX','_atbAfterSpeed','constructor','AnchorY','BattleManager_isActiveTpb','cast%1','setBlendColor','CMdVv','slow%1','MarkerSize','isHidden','gaugeColor1','cast1','SWOrB','createAtbGaugeSprite','FaceName','updateLetter','clearFieldAtbGraphics','atbInterrupt','right','stop%1','EnemyBattlerIcon','tpbAcceleration','isSceneBattle','ARRAYEVAL','default%1','Sprite_Gauge_gaugeColor2','AggroControlSystem','match','hlYZE','concat','round','svactor','setAtbCastTime','IconSet','YpfEZ','TCvqL','applyData','initTpbChargeTimeATB','Scale','isBattleSystemATBFieldGaugeVisible','updateAtbGaugeSpritePosition','svActorHorzCells','fontSize','createFieldAtbGraphicType','_horz','isAttack','VisuMZ_2_BattleSystemCTB','ceil','zfbWv','addBattleSystemATBShowGaugeCommand','Game_BattlerBase_revive','ActorBattlerIcon','setupTextPopup','changeIconGraphicBitmap','setupAtbGaugeSprite','CeiWV','addLoadListener','STR','prototype','fillRect','parse','_fieldAtbGaugeGraphicType','createStateIconSprite','OMOoP','_graphicIconIndex','opacity','isActor','WjLZK','ewLnq','bitmap','QhJqq','_blendColor','96561SNTmqk','subject','Game_Battler_startTpbCasting','isRestricted','onDatabaseLoaded','Actors','TpbAccelerationJS','DisplayOffsetY','ctGaugeColor2','rajvO','toLowerCase','nIHRn','_svBattlerSprite','StunsResetGauge','Window_StatusBase_placeGauge','removeState','isAppeared','Game_Battler_tpbRelativeSpeed','maxCommands','Enemy','currentAction','fieldAtbGraphicType','EnemyBattlerType','_skinSprite','clamp','Game_Battler_onRestrict','createFieldAtbGraphicFaceIndex','mainFontFace','abs','createFieldGaugeSpriteATB','DyTtG','hasSvBattler','top','_fieldAtbGaugeIconIndex','Game_Battler_tpbRequiredCastTime','tpbRelativeSpeed','ConvertParams','_fieldGaugeATB_Container','Game_BattlerBase_die','AdjustRect','changeAtbChargeTime','Charge','CDWES','isActiveTpb','InterruptFlashColor','_battler','640306KpRLHu','_statusType','InterruptText','TiIRE','FieldGaugeClearEnemyGraphic','gaugeRate','updatePosition','floor','clearRect','tpbSpeed','isATB','_fieldAtbGaugeFaceIndex','Game_Action_applyGlobal','atbSpeed','OffsetX','atbActive','max','_unit','name','Visible','60VMmBqx','setAtbChargeTime','URpYN','gzRiO','addBattleSystemATBCommands','qbNPf','battlerHue','jLCgt','addChild','_plural','setAtbAfterSpeed','Game_Battler_applyTpbPenalty','Wzdxh','changeAtbCastTime','initTpbChargeTime','showVisualAtbGauge','_homeX','Actor','create','FieldGauge','applyTpbPenalty','call','TinOo','currentValue','Sprite_Battler_setBattler','BorderThickness','battleUIOffsetX','gaugeHeight','Game_Unit_updateTpb','vhNtq','ShowActorGauge','lQxHw','Settings','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','tNncZ','visible','slow','fQjjT','Game_Actor_clearActions','loadSystem','TpbBaseSpeedCalcJS','Parse_Notetags_CreateJS','makeData','fieldAtbGraphicFaceIndex','full','Enemies','getColor','changeSvActorGraphicBitmap','members','bmvhH','Game_BattlerBase_appear','_graphicSv','AddOption','Sprite_Gauge_currentValue','_fieldGaugeATB','createBackgroundSprite','VisibleGauge','qaqjC','_tpbState','Window_Options_addGeneralOptions','GaugeDirection','placeGauge','Gauge','setHue','default','jXqMP','cast2','aVcGo','description','_graphicFaceName','ShowStatusGauge','_windowskin','yhprn','disappear','#%1','isGaugeHorizontal','iconWidth','clearActions','registerCommand','min','scale','_graphicEnemy','attackSpeed','IconIndex','process_VisuMZ_BattleSystemATB_CreateRegExp','JWSfj','_index'];_0x584b=function(){return _0x3522e9;};return _0x584b();}Sprite_FieldGaugeATB['prototype']=Object[_0x1c04e6(0x148)](Sprite[_0x1c04e6(0x31c)]),Sprite_FieldGaugeATB['prototype']['constructor']=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB[_0x1c04e6(0x156)]=JsonEx[_0x1c04e6(0x25c)](VisuMZ[_0x1c04e6(0x263)][_0x1c04e6(0x156)][_0x1c04e6(0x149)]),Sprite_FieldGaugeATB['prototype'][_0x1c04e6(0x2ae)]=function(){const _0x80559b=_0x1c04e6;Sprite['prototype']['initialize'][_0x80559b(0x14b)](this),this[_0x80559b(0x1ab)](),this[_0x80559b(0x22f)](),this[_0x80559b(0x2a8)]();},Sprite_FieldGaugeATB[_0x1c04e6(0x31c)][_0x1c04e6(0x1ab)]=function(){const _0x2c1698=_0x1c04e6;this['anchor']['x']=0.5,this[_0x2c1698(0x2b8)]['y']=0.5;},Sprite_FieldGaugeATB[_0x1c04e6(0x31c)][_0x1c04e6(0x181)]=function(){const _0x17ee94=_0x1c04e6;if(this[_0x17ee94(0x30e)]!==undefined)return this[_0x17ee94(0x30e)];const _0x43324e=Sprite_FieldGaugeATB['Settings'][_0x17ee94(0x251)];return this[_0x17ee94(0x30e)]=[_0x17ee94(0x114),'bottom'][_0x17ee94(0x1f5)](_0x43324e),this[_0x17ee94(0x30e)];},Sprite_FieldGaugeATB['prototype']['setHomeLocation']=function(){const _0xaf58d4=_0x1c04e6,_0x470e27=Sprite_FieldGaugeATB[_0xaf58d4(0x156)][_0xaf58d4(0x251)][_0xaf58d4(0x334)]()['trim'](),_0x44cb11=Window_Base[_0xaf58d4(0x31c)][_0xaf58d4(0x2b9)](),_0x31594d=SceneManager[_0xaf58d4(0x208)][_0xaf58d4(0x1a5)][_0xaf58d4(0x1b5)]+Math[_0xaf58d4(0x300)](_0x44cb11*0.5);this[_0xaf58d4(0x146)]=0x0,this['_homeY']=0x0;switch(_0x470e27){case _0xaf58d4(0x114):this[_0xaf58d4(0x146)]=Math[_0xaf58d4(0x300)](Graphics['boxWidth']*0.5),this[_0xaf58d4(0x27a)]=0x60;break;case _0xaf58d4(0x245):this[_0xaf58d4(0x146)]=Math[_0xaf58d4(0x300)](Graphics[_0xaf58d4(0x2a4)]*0.5),this[_0xaf58d4(0x27a)]=Graphics[_0xaf58d4(0x240)]-_0x31594d;break;case _0xaf58d4(0x2c2):this[_0xaf58d4(0x146)]=0x50,this[_0xaf58d4(0x27a)]=Math['round']((Graphics[_0xaf58d4(0x240)]-_0x31594d)/0x2);break;case _0xaf58d4(0x2f4):this[_0xaf58d4(0x146)]=Graphics['boxWidth']-0x50,this[_0xaf58d4(0x27a)]=Math['round']((Graphics['boxHeight']-_0x31594d)/0x2);break;}this[_0xaf58d4(0x146)]+=Sprite_FieldGaugeATB[_0xaf58d4(0x156)]['DisplayOffsetX']||0x0,this[_0xaf58d4(0x27a)]+=Sprite_FieldGaugeATB[_0xaf58d4(0x156)][_0xaf58d4(0x331)]||0x0,this['x']=this[_0xaf58d4(0x146)],this['y']=this[_0xaf58d4(0x27a)];},Sprite_FieldGaugeATB[_0x1c04e6(0x31c)][_0x1c04e6(0x2a8)]=function(){const _0x185479=_0x1c04e6;this['createFieldGaugeSkin'](),this[_0x185479(0x254)](),this[_0x185479(0x28a)]();},Sprite_FieldGaugeATB[_0x1c04e6(0x31c)][_0x1c04e6(0x295)]=function(){const _0x426b24=_0x1c04e6;this[_0x426b24(0x341)]=new Sprite(),this['_skinSprite'][_0x426b24(0x2b8)]['x']=0.5,this[_0x426b24(0x341)]['anchor']['y']=0.5,this[_0x426b24(0x13e)](this['_skinSprite']);const _0x24f717=Sprite_FieldGaugeATB[_0x426b24(0x156)][_0x426b24(0x2a0)];if(_0x24f717)this[_0x426b24(0x341)][_0x426b24(0x327)]=ImageManager['loadSystem'](_0x24f717);},Sprite_FieldGaugeATB['prototype']['createGaugeSprite']=function(){const _0x1006ed=_0x1c04e6;this[_0x1006ed(0x27e)]=new Sprite(),this[_0x1006ed(0x13e)](this['_gaugeSprite']),this[_0x1006ed(0x1eb)]();},Sprite_FieldGaugeATB[_0x1c04e6(0x31c)][_0x1c04e6(0x1eb)]=function(){const _0xf83100=_0x1c04e6,_0x2afe13=Sprite_FieldGaugeATB[_0xf83100(0x156)],_0x58c1da=this['isGaugeHorizontal'](),_0x130887=_0x58c1da?_0x2afe13['GaugeLengthHorz']:_0x2afe13[_0xf83100(0x241)],_0x28623d=_0x58c1da?_0x2afe13[_0xf83100(0x241)]:_0x2afe13[_0xf83100(0x21d)];this[_0xf83100(0x27e)][_0xf83100(0x327)]=new Bitmap(_0x130887,_0x28623d),this[_0xf83100(0x1ec)](),this[_0xf83100(0x27e)]['x']=Math[_0xf83100(0x311)](_0x130887/-0x2),this[_0xf83100(0x27e)]['y']=Math[_0xf83100(0x311)](_0x28623d/-0x2);},Sprite_FieldGaugeATB[_0x1c04e6(0x31c)]['drawGaugeBitmap']=function(){const _0x11511b=_0x1c04e6;if(!Sprite_FieldGaugeATB[_0x11511b(0x156)][_0x11511b(0x2b0)])return;const _0x4b3c68=Sprite_FieldGaugeATB[_0x11511b(0x156)],_0x2777a0=this[_0x11511b(0x27e)]['bitmap'],_0x1295c8=_0x2777a0[_0x11511b(0x2c0)],_0x55baa4=_0x2777a0[_0x11511b(0x1b5)],_0x2cac96=ColorManager['gaugeBackColor'](),_0x1719e1=ColorManager[_0x11511b(0x1ba)](),_0x351a6c=ColorManager[_0x11511b(0x332)](),_0x4eca4b=ColorManager[_0x11511b(0x1de)](_0x11511b(0x2ed)),_0x5c5f80=ColorManager[_0x11511b(0x1de)](_0x11511b(0x178)),_0x105efc=this[_0x11511b(0x181)](),_0x2505b9=_0x4b3c68[_0x11511b(0x172)],_0x4a43ce=_0x4b3c68['GaugeSplit'][_0x11511b(0x342)](0x0,0x1),_0x45c0b2=Math[_0x11511b(0x311)](((_0x105efc?_0x1295c8:_0x55baa4)-0x2)*_0x4a43ce);_0x2777a0['fillRect'](0x0,0x0,_0x1295c8,_0x55baa4,_0x2cac96);let _0x33f321=0x0,_0x56a442=0x0,_0x491e36=0x0,_0x298e20=0x0;if(_0x105efc&&_0x2505b9){if('mEugI'===_0x11511b(0x229)){if(this[_0x11511b(0x169)]!==_0x1f4cd1[_0x11511b(0x1d3)]())return this[_0x11511b(0x2d2)]();}else _0x33f321=_0x45c0b2-0x1,_0x491e36=_0x1295c8-0x3-_0x33f321,_0x2777a0[_0x11511b(0x298)](0x1,0x1,_0x33f321,_0x55baa4-0x2,_0x1719e1,_0x351a6c,![]),_0x2777a0[_0x11511b(0x298)](0x2+_0x33f321,0x1,_0x491e36,_0x55baa4-0x2,_0x4eca4b,_0x5c5f80,![]);}else{if(_0x105efc&&!_0x2505b9)_0x33f321=_0x45c0b2-0x1,_0x491e36=_0x1295c8-0x3-_0x33f321,_0x2777a0[_0x11511b(0x298)](0x2+_0x491e36,0x1,_0x33f321,_0x55baa4-0x2,_0x1719e1,_0x351a6c,![]),_0x2777a0['gradientFillRect'](0x1,0x1,_0x491e36,_0x55baa4-0x2,_0x4eca4b,_0x5c5f80,![]);else{if(!_0x105efc&&_0x2505b9)_0x56a442=_0x45c0b2-0x1,_0x298e20=_0x55baa4-0x3-_0x56a442,_0x2777a0[_0x11511b(0x298)](0x1,0x1,_0x1295c8-0x2,_0x56a442,_0x1719e1,_0x351a6c,!![]),_0x2777a0[_0x11511b(0x298)](0x1,0x2+_0x56a442,_0x1295c8-0x2,_0x298e20,_0x4eca4b,_0x5c5f80,!![]);else{if(!_0x105efc&&!_0x2505b9){if(_0x11511b(0x26d)!==_0x11511b(0x2a3))_0x56a442=_0x45c0b2-0x1,_0x298e20=_0x55baa4-0x3-_0x56a442,_0x2777a0['gradientFillRect'](0x1,0x2+_0x298e20,_0x1295c8-0x2,_0x56a442,_0x1719e1,_0x351a6c,!![]),_0x2777a0[_0x11511b(0x298)](0x1,0x1,_0x1295c8-0x2,_0x298e20,_0x4eca4b,_0x5c5f80,!![]);else return _0x84bc32['Settings'][_0x11511b(0x197)];}}}}},Sprite_FieldGaugeATB[_0x1c04e6(0x31c)][_0x1c04e6(0x28a)]=function(){const _0x5888c7=_0x1c04e6;this[_0x5888c7(0x1c7)]&&this[_0x5888c7(0x27e)][_0x5888c7(0x1b4)](this[_0x5888c7(0x1c7)]),this[_0x5888c7(0x1c7)]=new Sprite(),this[_0x5888c7(0x27e)][_0x5888c7(0x13e)](this[_0x5888c7(0x1c7)]),this['createBattlerSprites']();},Sprite_FieldGaugeATB[_0x1c04e6(0x31c)]['createBattlerSprites']=function(){const _0x32639a=_0x1c04e6;this[_0x32639a(0x2c4)](),this['createActorSprites']();},Sprite_FieldGaugeATB[_0x1c04e6(0x31c)]['createEnemySprites']=function(){const _0x5cfa37=_0x1c04e6,_0x420af1=$gameTroop[_0x5cfa37(0x166)](),_0x5389f8=_0x420af1['length'];for(let _0x405dd2=0x0;_0x405dd2<_0x5389f8;_0x405dd2++){if(_0x5cfa37(0x11e)!==_0x5cfa37(0x20d))this[_0x5cfa37(0x1da)](_0x405dd2,$gameTroop);else{if(this[_0x5cfa37(0x2ad)]){if(!this[_0x5cfa37(0x2ce)]())return;}_0x4c21bb[_0x5cfa37(0x263)][_0x5cfa37(0x15c)]['call'](this);}}},Sprite_FieldGaugeATB[_0x1c04e6(0x31c)][_0x1c04e6(0x1e8)]=function(){const _0x1523e8=_0x1c04e6,_0x3eb8c8=$gameParty['maxBattleMembers']();for(let _0x2be247=0x0;_0x2be247<_0x3eb8c8;_0x2be247++){if(_0x1523e8(0x18b)==='JWSfj')this[_0x1523e8(0x1da)](_0x2be247,$gameParty);else{let _0x4de6d7=_0x55de4e[_0x1523e8(0x263)][_0x1523e8(0x281)][_0x1523e8(0x14b)](this);const _0x2ff5dd=_0x1068c0[_0x1523e8(0x263)][_0x1523e8(0x156)];if(_0x2ff5dd['Options'][_0x1523e8(0x16a)]&&_0x2ff5dd[_0x1523e8(0x1d5)][_0x1523e8(0x11b)]&&_0x3e9d81['isATB']())_0x4de6d7++;return _0x4de6d7;}}},Sprite_FieldGaugeATB[_0x1c04e6(0x31c)]['createBattlerSprite']=function(_0x118aa6,_0xa3ffb){const _0x164e32=_0x1c04e6,_0x3bc679=new Sprite_FieldMarkerATB(_0x118aa6,_0xa3ffb,this[_0x164e32(0x27e)]);this['_battlerContainer'][_0x164e32(0x13e)](_0x3bc679);},Sprite_FieldGaugeATB[_0x1c04e6(0x31c)]['update']=function(){const _0x4319ed=_0x1c04e6;Sprite[_0x4319ed(0x31c)][_0x4319ed(0x276)][_0x4319ed(0x14b)](this),this[_0x4319ed(0x128)](),this[_0x4319ed(0x27b)](),this[_0x4319ed(0x278)]();},Sprite_FieldGaugeATB[_0x1c04e6(0x31c)][_0x1c04e6(0x128)]=function(){const _0x48d5db=_0x1c04e6,_0x4bfc42=Sprite_FieldGaugeATB['Settings'];if(_0x4bfc42[_0x48d5db(0x251)]!==_0x48d5db(0x114))return;if(!_0x4bfc42[_0x48d5db(0x1cb)])return;const _0x52db89=SceneManager[_0x48d5db(0x208)]['_helpWindow'];if(!_0x52db89)return;_0x52db89[_0x48d5db(0x159)]?'xRGbm'===_0x48d5db(0x20e)?(this['x']=this[_0x48d5db(0x146)]+(_0x4bfc42[_0x48d5db(0x2e1)]||0x0),this['y']=this[_0x48d5db(0x27a)]+(_0x4bfc42[_0x48d5db(0x234)]||0x0)):_0x32ab0d[_0x48d5db(0x186)]['x']=-_0x403a07[_0x48d5db(0x346)](_0x197bdb[_0x48d5db(0x186)]['x']):(this['x']=this[_0x48d5db(0x146)],this['y']=this['_homeY']);const _0x1a44dc=SceneManager[_0x48d5db(0x208)][_0x48d5db(0x273)];this['x']+=_0x1a44dc['x'],this['y']+=_0x1a44dc['y'];},Sprite_FieldGaugeATB['prototype'][_0x1c04e6(0x27b)]=function(){const _0x1afcec=_0x1c04e6;if(!this['_battlerContainer'])return;const _0x1dd01c=this[_0x1afcec(0x1c7)][_0x1afcec(0x2d7)];if(!_0x1dd01c)return;_0x1dd01c['sort'](this[_0x1afcec(0x221)][_0x1afcec(0x1b3)](this));},Sprite_FieldGaugeATB[_0x1c04e6(0x31c)][_0x1c04e6(0x221)]=function(_0x4a31b1,_0x49931f){const _0x5763d5=_0x1c04e6,_0x357ffa=this[_0x5763d5(0x181)](),_0x57efe6=Sprite_FieldGaugeATB['Settings'][_0x5763d5(0x172)];if(_0x357ffa&&_0x57efe6){if(_0x5763d5(0x1a4)===_0x5763d5(0x1a4))return _0x4a31b1['x']-_0x49931f['x'];else{const _0x17c90f=_0x1567b0[_0x5763d5(0x263)][_0x5763d5(0x2b3)](this['item'](),_0x5763d5(0x11d));if(_0x302d75['BattleSystemATB']['JS'][_0x17c90f]){const _0xe2e11f=_0x35bb4f[_0x5763d5(0x263)]['JS'][_0x17c90f]['call'](this,this['subject'](),_0x5de71b);_0x4550af[_0x5763d5(0x137)](_0xe2e11f);}_0x1536ac['match'](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x2e8638['setAtbChargeTime'](_0x5c1ba9(_0x758ee2['$1'])*0.01),_0x35cbf1['match'](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x401274[_0x5763d5(0x11c)](_0x2ae7b1(_0x437c8b['$1'])*0.01);}}else{if(_0x357ffa&&!_0x57efe6){if('ACene'===_0x5763d5(0x1ed))return _0x49931f['x']-_0x4a31b1['x'];else{if(this[_0x5763d5(0x121)]&&this[_0x5763d5(0x123)]===_0x5763d5(0x194))return this[_0x5763d5(0x1c6)]();return _0x58ecfc[_0x5763d5(0x263)][_0x5763d5(0x16b)][_0x5763d5(0x14b)](this);}}else{if(!_0x357ffa&&_0x57efe6)return _0x4a31b1['y']-_0x49931f['y'];else{if(!_0x357ffa&&!_0x57efe6){if('SZXey'!=='SZXey')_0x57446b[_0x5763d5(0x263)][_0x5763d5(0x258)](_0x1033f1,_0x5a40db);else return _0x49931f['y']-_0x4a31b1['y'];}}}}},Sprite_FieldGaugeATB['prototype'][_0x1c04e6(0x278)]=function(){const _0x155982=_0x1c04e6;this[_0x155982(0x159)]=$gameSystem[_0x155982(0x309)]();};function Sprite_FieldMarkerATB(){const _0xe411c8=_0x1c04e6;this[_0xe411c8(0x2ae)](...arguments);}Sprite_FieldMarkerATB[_0x1c04e6(0x31c)]=Object[_0x1c04e6(0x148)](Sprite_Clickable[_0x1c04e6(0x31c)]),Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x2e3)]=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB['prototype'][_0x1c04e6(0x2ae)]=function(_0x42a5e2,_0x2f0909,_0x210514){const _0x1e5170=_0x1c04e6;this[_0x1e5170(0x18c)]=_0x42a5e2,this[_0x1e5170(0x133)]=_0x2f0909,this[_0x1e5170(0x27e)]=_0x210514,Sprite_Clickable[_0x1e5170(0x31c)][_0x1e5170(0x2ae)][_0x1e5170(0x14b)](this),this[_0x1e5170(0x1ab)](),this['createChildren'](),this['opacity']=this[_0x1e5170(0x226)]();},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x1ab)]=function(){const _0xb9f753=_0x1c04e6;this[_0xb9f753(0x2b8)]['x']=0.5,this[_0xb9f753(0x2b8)]['y']=0.5;},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x2a8)]=function(){const _0x1ca122=_0x1c04e6;this[_0x1ca122(0x16d)](),this['createGraphicSprite'](),this[_0x1ca122(0x283)](),this['createLetterSprite'](),this[_0x1ca122(0x28b)](),this[_0x1ca122(0x1cd)](!![]);},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x16d)]=function(){const _0x453562=_0x1c04e6;if(!Sprite_FieldGaugeATB[_0x453562(0x156)][_0x453562(0x205)])return;const _0x4cde5f=Sprite_FieldGaugeATB[_0x453562(0x156)],_0x1e122e=this[_0x453562(0x133)]===$gameParty?_0x453562(0x147):_0x453562(0x33d),_0x2cfc16=_0x453562(0x250)[_0x453562(0x1a0)](_0x1e122e),_0x2edc64=new Sprite();_0x2edc64['anchor']['x']=this[_0x453562(0x2b8)]['x'],_0x2edc64['anchor']['y']=this[_0x453562(0x2b8)]['y'];if(_0x4cde5f[_0x2cfc16])_0x453562(0x1a3)===_0x453562(0x1e2)?(delete this['_fieldAtbGaugeGraphicType'],delete this[_0x453562(0x1e6)],delete this['_fieldAtbGaugeFaceIndex'],delete this['_fieldAtbGaugeIconIndex']):_0x2edc64[_0x453562(0x327)]=ImageManager[_0x453562(0x15d)](_0x4cde5f[_0x2cfc16]);else{if(_0x453562(0x167)!==_0x453562(0x167))return _0x28cfa4[_0x453562(0x12c)]()?_0x2dd0be[_0x453562(0x263)][_0x453562(0x156)]['Mechanics'][_0x453562(0x15e)][_0x453562(0x14b)](this,this):_0x16592b['BattleSystemATB']['Game_Battler_tpbBaseSpeed']['call'](this);else{const _0x2fb68a=_0x4cde5f['MarkerSize'];_0x2edc64[_0x453562(0x327)]=new Bitmap(_0x2fb68a,_0x2fb68a);const _0x21e146=ColorManager['getColor'](_0x4cde5f['%1BgColor1'[_0x453562(0x1a0)](_0x1e122e)]),_0x55d132=ColorManager[_0x453562(0x164)](_0x4cde5f[_0x453562(0x1ac)[_0x453562(0x1a0)](_0x1e122e)]);_0x2edc64[_0x453562(0x327)][_0x453562(0x298)](0x0,0x0,_0x2fb68a,_0x2fb68a,_0x21e146,_0x55d132,!![]);}}this[_0x453562(0x29a)]=_0x2edc64,this[_0x453562(0x13e)](this[_0x453562(0x29a)]),this[_0x453562(0x2c0)]=this['_backgroundSprite'][_0x453562(0x2c0)],this[_0x453562(0x1b5)]=this['_backgroundSprite']['height'];},Sprite_FieldMarkerATB['prototype'][_0x1c04e6(0x29b)]=function(){const _0x45558b=_0x1c04e6,_0x246124=new Sprite();_0x246124[_0x45558b(0x2b8)]['x']=this[_0x45558b(0x2b8)]['x'],_0x246124[_0x45558b(0x2b8)]['y']=this['anchor']['y'],this['_graphicSprite']=_0x246124,this[_0x45558b(0x13e)](this[_0x45558b(0x1c5)]),this[_0x45558b(0x2d2)]();},Sprite_FieldMarkerATB['prototype'][_0x1c04e6(0x283)]=function(){const _0x8b56d0=_0x1c04e6;if(!Sprite_FieldGaugeATB[_0x8b56d0(0x156)]['ShowMarkerBorder'])return;const _0x469555=Sprite_FieldGaugeATB[_0x8b56d0(0x156)],_0x1ee9c0=this[_0x8b56d0(0x133)]===$gameParty?'Actor':_0x8b56d0(0x33d),_0x15666b='%1SystemBorder'[_0x8b56d0(0x1a0)](_0x1ee9c0),_0x587842=new Sprite();_0x587842[_0x8b56d0(0x2b8)]['x']=this[_0x8b56d0(0x2b8)]['x'],_0x587842['anchor']['y']=this[_0x8b56d0(0x2b8)]['y'];if(_0x469555[_0x15666b])_0x8b56d0(0x246)!==_0x8b56d0(0x246)?_0x2ceeb3['BattleSystemATB']['Game_Battler_applyTpbPenalty']['call'](this):_0x587842[_0x8b56d0(0x327)]=ImageManager[_0x8b56d0(0x15d)](_0x469555[_0x15666b]);else{if(_0x8b56d0(0x264)===_0x8b56d0(0x2dd))_0x4b47e2[_0x8b56d0(0x302)](_0x4cbaa7(_0x4f3fc2['$1'])*0.01);else{let _0x5ea049=_0x469555[_0x8b56d0(0x2ea)],_0x1b4690=_0x469555[_0x8b56d0(0x14f)];_0x587842[_0x8b56d0(0x327)]=new Bitmap(_0x5ea049,_0x5ea049);const _0x5d0184='#000000',_0x51c8d8=ColorManager[_0x8b56d0(0x164)](_0x469555[_0x8b56d0(0x2e0)['format'](_0x1ee9c0)]);_0x587842['bitmap']['fillRect'](0x0,0x0,_0x5ea049,_0x5ea049,_0x5d0184),_0x5ea049-=0x2,_0x587842[_0x8b56d0(0x327)]['fillRect'](0x1,0x1,_0x5ea049,_0x5ea049,_0x51c8d8),_0x5ea049-=_0x1b4690*0x2,_0x587842[_0x8b56d0(0x327)][_0x8b56d0(0x31d)](0x1+_0x1b4690,0x1+_0x1b4690,_0x5ea049,_0x5ea049,_0x5d0184),_0x5ea049-=0x2,_0x1b4690+=0x1,_0x587842['bitmap'][_0x8b56d0(0x12a)](0x1+_0x1b4690,0x1+_0x1b4690,_0x5ea049,_0x5ea049);}}this[_0x8b56d0(0x29a)]=_0x587842,this['addChild'](this[_0x8b56d0(0x29a)]);},Sprite_FieldMarkerATB['prototype']['createLetterSprite']=function(){const _0x2bf0ad=_0x1c04e6,_0x1dd70d=Sprite_FieldGaugeATB[_0x2bf0ad(0x156)];if(!_0x1dd70d[_0x2bf0ad(0x2b2)])return;if(this['_unit']===$gameParty)return;const _0x14296c=_0x1dd70d[_0x2bf0ad(0x2ea)],_0x1a6c8c=new Sprite();_0x1a6c8c[_0x2bf0ad(0x2b8)]['x']=this[_0x2bf0ad(0x2b8)]['x'],_0x1a6c8c[_0x2bf0ad(0x2b8)]['y']=this[_0x2bf0ad(0x2b8)]['y'],_0x1a6c8c[_0x2bf0ad(0x327)]=new Bitmap(_0x14296c,_0x14296c),this[_0x2bf0ad(0x2c3)]=_0x1a6c8c,this['addChild'](this[_0x2bf0ad(0x2c3)]);},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x28b)]=function(){const _0x2bcf17=_0x1c04e6,_0x3bad1e=Sprite_FieldGaugeATB['Settings'];if(!_0x3bad1e['ShowMarkerArrow'])return;const _0x1ce44f=new Sprite();_0x1ce44f[_0x2bcf17(0x2b8)]['x']=this[_0x2bcf17(0x2b8)]['x'],_0x1ce44f[_0x2bcf17(0x2b8)]['y']=this[_0x2bcf17(0x2b8)]['y'],this[_0x2bcf17(0x227)](_0x1ce44f),this[_0x2bcf17(0x22b)]=_0x1ce44f,this[_0x2bcf17(0x13e)](this[_0x2bcf17(0x22b)]);},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x227)]=function(_0x3c5430){const _0x22411e=_0x1c04e6,_0x391985=Sprite_FieldGaugeATB[_0x22411e(0x156)],_0x8d6815=_0x391985[_0x22411e(0x2ea)],_0x5c66c2=Math[_0x22411e(0x300)](_0x8d6815/0x2),_0x3c58ce=this['isGaugeHorizontal'](),_0x39ba8a=this['_unit']===$gameParty?_0x22411e(0x147):'Enemy',_0x10087a=_0x391985[_0x22411e(0x2c9)[_0x22411e(0x1a0)](_0x39ba8a)];_0x3c5430[_0x22411e(0x327)]=ImageManager[_0x22411e(0x15d)](_0x391985[_0x22411e(0x2a5)]);const _0x496198=0x18,_0x53af6d=_0x496198/0x2,_0x5d1d50=0x60+_0x496198,_0x18a8ad=0x0+_0x496198;if(_0x3c58ce&&_0x10087a){if('AVAsU'==='AVAsU')_0x3c5430[_0x22411e(0x1d4)](_0x5d1d50+_0x53af6d,_0x18a8ad+_0x53af6d+_0x496198,_0x496198,_0x53af6d),_0x3c5430['y']+=_0x5c66c2,_0x3c5430[_0x22411e(0x2b8)]['y']=0x0;else return this['isAtbCastingState']()?this[_0x22411e(0x190)]/this[_0x22411e(0x2ac)]():0x0;}else{if(_0x3c58ce&&!_0x10087a)_0x3c5430['setFrame'](_0x5d1d50+_0x53af6d,_0x18a8ad,_0x496198,_0x53af6d),_0x3c5430['y']-=_0x5c66c2,_0x3c5430[_0x22411e(0x2b8)]['y']=0x1;else{if(!_0x3c58ce&&_0x10087a)_0x3c5430[_0x22411e(0x1d4)](_0x5d1d50,_0x18a8ad+_0x53af6d,_0x53af6d,_0x496198),_0x3c5430['x']-=Math[_0x22411e(0x311)](_0x5c66c2*1.75),_0x3c5430[_0x22411e(0x2b8)]['x']=0x0;else!_0x3c58ce&&!_0x10087a&&(_0x3c5430['setFrame'](_0x5d1d50+_0x496198+_0x53af6d,_0x18a8ad+_0x53af6d,_0x53af6d,_0x496198),_0x3c5430['x']+=Math[_0x22411e(0x311)](_0x5c66c2*1.75),_0x3c5430[_0x22411e(0x2b8)]['x']=0x1);}}},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x218)]=function(){const _0x3d6112=_0x1c04e6;return this[_0x3d6112(0x133)]===$gameParty?$gameParty[_0x3d6112(0x26b)]()[this[_0x3d6112(0x18c)]]:$gameTroop[_0x3d6112(0x166)]()[this['_index']];},Sprite_FieldMarkerATB['prototype']['update']=function(){const _0x234f3e=_0x1c04e6;Sprite_Clickable[_0x234f3e(0x31c)][_0x234f3e(0x276)][_0x234f3e(0x14b)](this),this[_0x234f3e(0x228)](),this['updatePositionOffset'](),this[_0x234f3e(0x1cd)](),this[_0x234f3e(0x242)](),this[_0x234f3e(0x1c9)](),this[_0x234f3e(0x2f1)](),this['updateSelectionEffect']();},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)]['updateOpacity']=function(){const _0x273a9f=_0x1c04e6,_0xfcb419=this[_0x273a9f(0x226)](),_0x35dc13=Sprite_FieldGaugeATB['Settings'][_0x273a9f(0x26e)];if(this[_0x273a9f(0x323)]>_0xfcb419){if(_0x273a9f(0x291)==='QCqJx')this[_0x273a9f(0x323)]=Math[_0x273a9f(0x132)](_0xfcb419,this[_0x273a9f(0x323)]-_0x35dc13);else return this[_0x273a9f(0x2d2)]();}else this['opacity']<_0xfcb419&&(this[_0x273a9f(0x323)]=Math[_0x273a9f(0x185)](_0xfcb419,this[_0x273a9f(0x323)]+_0x35dc13));},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x226)]=function(){const _0x20c652=_0x1c04e6,_0xa27eca=this[_0x20c652(0x218)]();if(!_0xa27eca)return 0x0;if(_0xa27eca[_0x20c652(0x2eb)]())return 0x0;if(_0xa27eca[_0x20c652(0x1aa)]())return 0x0;return 0xff;},Sprite_FieldMarkerATB['prototype'][_0x1c04e6(0x181)]=function(){const _0x149ae7=_0x1c04e6;if(this[_0x149ae7(0x30e)]!==undefined)return this[_0x149ae7(0x30e)];const _0x1967c1=Sprite_FieldGaugeATB[_0x149ae7(0x156)][_0x149ae7(0x251)];return this[_0x149ae7(0x30e)]=[_0x149ae7(0x114),_0x149ae7(0x245)]['includes'](_0x1967c1),this[_0x149ae7(0x30e)];},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x243)]=function(){const _0x5e959b=_0x1c04e6,_0x9a9be9=Sprite_FieldGaugeATB[_0x5e959b(0x156)],_0x140ea0=this[_0x5e959b(0x181)](),_0x208dc9=this[_0x5e959b(0x133)]===$gameParty?'Actor':_0x5e959b(0x33d),_0xd4f688=_0x9a9be9[_0x5e959b(0x1db)],_0x4ec25d=_0x9a9be9['%1Side'['format'](_0x208dc9)];if(_0x140ea0){if(_0x5e959b(0x2d9)===_0x5e959b(0x22a)){if(!_0xc2b555['isSceneBattle']())return;if(!_0xd15eab[_0x5e959b(0x12c)]())return;if(this[_0x5e959b(0x27d)]())this[_0x5e959b(0x1b2)](_0x572354);}else this['y']=_0x9a9be9['GaugeThick']/0x2,this['y']+=_0x4ec25d?-_0xd4f688:_0xd4f688;}else{if(_0x5e959b(0x348)!==_0x5e959b(0x348)){const _0xf86354=_0x3ca907['MarkerSize'];_0x4ebf08['bitmap']=new _0x4cbcf3(_0xf86354,_0xf86354);const _0x675985=_0x4bd720[_0x5e959b(0x164)](_0x390751['%1BgColor1'['format'](_0x48c264)]),_0x371868=_0x578b8e[_0x5e959b(0x164)](_0x19845e['%1BgColor2'[_0x5e959b(0x1a0)](_0x16b338)]);_0x2ce124[_0x5e959b(0x327)][_0x5e959b(0x298)](0x0,0x0,_0xf86354,_0xf86354,_0x675985,_0x371868,!![]);}else this['x']=_0x9a9be9[_0x5e959b(0x241)]/0x2,this['x']+=_0x4ec25d?_0xd4f688:-_0xd4f688;}},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)]['updatePositionOnGauge']=function(_0x3f6336){const _0x21709c=_0x1c04e6,_0x33eb8a=this[_0x21709c(0x218)]();if(!_0x33eb8a)return;const _0x1d711a=Sprite_FieldGaugeATB['Settings'],_0x335f32=this[_0x21709c(0x181)](),_0x254085=this[_0x21709c(0x202)](),_0x2774ce=_0x3f6336?Infinity:_0x1d711a['MarkerSpeed'];if(_0x335f32&&this['x']!==_0x254085){if(this['x']>_0x254085)this['x']=Math[_0x21709c(0x132)](_0x254085,this['x']-_0x2774ce);if(this['x']<_0x254085)this['x']=Math[_0x21709c(0x185)](_0x254085,this['x']+_0x2774ce);}else{if(!_0x335f32&&this['x']!==_0x254085){if(this['y']>_0x254085)this['y']=Math[_0x21709c(0x132)](_0x254085,this['y']-_0x2774ce);if(this['y']<_0x254085)this['y']=Math[_0x21709c(0x185)](_0x254085,this['y']+_0x2774ce);}}},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)]['targetPositionOnGauge']=function(){const _0xf85d77=_0x1c04e6,_0x543427=Sprite_FieldGaugeATB[_0xf85d77(0x156)],_0x3fea04=this[_0xf85d77(0x218)](),_0x26dc17=this[_0xf85d77(0x181)](),_0x5ea457=this[_0xf85d77(0x27e)][_0xf85d77(0x327)][_0xf85d77(0x2c0)],_0x1de8b0=this[_0xf85d77(0x27e)][_0xf85d77(0x327)][_0xf85d77(0x1b5)],_0xf36e4e=_0x543427['GaugeSplit']['clamp'](0x0,0x1),_0x43f8bc=_0x543427[_0xf85d77(0x172)];let _0x3168ba=_0x3fea04['tpbChargeTime']()*_0xf36e4e;_0x3168ba+=(0x1-_0xf36e4e)*_0x3fea04[_0xf85d77(0x1b6)]();if(_0x3fea04===BattleManager['_subject'])_0x3168ba=0x1;if(!_0x43f8bc)_0x3168ba=0x1-_0x3168ba;let _0x313014=0x0;if(_0x26dc17)_0x313014=_0x3168ba*_0x5ea457;else!_0x26dc17&&(_0x313014=_0x3168ba*_0x1de8b0);return Math[_0xf85d77(0x300)](_0x313014);},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x242)]=function(){const _0x57db66=_0x1c04e6,_0xda31ae=this[_0x57db66(0x218)]();if(!_0xda31ae)return;const _0x12c80d=Sprite_FieldGaugeATB[_0x57db66(0x156)],_0x33488b=this['_unit']===$gameParty?'Actor':_0x57db66(0x33d);let _0x2b0fb1=_0xda31ae[_0x57db66(0x33f)]();if(_0xda31ae[_0x57db66(0x324)]()&&_0x2b0fb1===_0x57db66(0x23e)){if(_0x57db66(0x305)==='TCvqL')_0x2b0fb1='face';else return _0x72e9f[_0x57db66(0x25f)]&&_0x2156d3[_0x57db66(0x17a)][_0x57db66(0x1f5)]('['+_0x44168e+']');}else _0xda31ae[_0x57db66(0x28c)]()&&_0x2b0fb1===_0x57db66(0x301)&&(_0x57db66(0x2bd)!=='aTFOR'?_0x2b0fb1=_0x57db66(0x23e):_0x5af830=0xa);if(this[_0x57db66(0x260)]!==_0x2b0fb1)return this[_0x57db66(0x2d2)]();switch(this[_0x57db66(0x260)]){case _0x57db66(0x29c):if(this[_0x57db66(0x17b)]!==_0xda31ae[_0x57db66(0x20c)]()){if(_0x57db66(0x28f)!==_0x57db66(0x155))return this[_0x57db66(0x2d2)]();else this['_index']=_0x12b345,this[_0x57db66(0x133)]=_0x50d7aa,this[_0x57db66(0x27e)]=_0x5c5329,_0x37b90a[_0x57db66(0x31c)][_0x57db66(0x2ae)][_0x57db66(0x14b)](this),this[_0x57db66(0x1ab)](),this[_0x57db66(0x2a8)](),this['opacity']=this[_0x57db66(0x226)]();}if(this[_0x57db66(0x2db)]!==_0xda31ae[_0x57db66(0x161)]())return this[_0x57db66(0x2d2)]();break;case _0x57db66(0x19f):if(this[_0x57db66(0x322)]!==_0xda31ae[_0x57db66(0x1fd)]()){if(_0x57db66(0x2b6)===_0x57db66(0x319)){const _0x5422df=!this[_0x57db66(0x2ca)]()&&_0x140f7d[_0x57db66(0x1fa)]();_0x1f8dd8[_0x57db66(0x263)][_0x57db66(0x1f2)]['call'](this,_0x32e10f),_0x5422df&&this[_0x57db66(0x2ca)]()&&this[_0x57db66(0x1ea)]()<=0x0&&(this['makeActions'](),this[_0x57db66(0x170)]=_0x57db66(0x1a6));}else return this['processUpdateGraphic']();}break;case _0x57db66(0x23e):if(_0xda31ae['hasSvBattler']()){if('xYBpJ'!=='xYBpJ')_0x156885=_0x2d987c-0x1,_0x2cb3ad=_0x3b004c-0x3-_0x53ab39,_0xecdfd0['gradientFillRect'](0x2+_0xcb82a8,0x1,_0x14d908,_0x47b648-0x2,_0x44063f,_0x5d27f2,![]),_0x52476d[_0x57db66(0x298)](0x1,0x1,_0x3c10f7,_0x296c64-0x2,_0xb2f0df,_0x470996,![]);else{if(this[_0x57db66(0x169)]!==_0xda31ae['svBattlerName']()){if('fcmji'===_0x57db66(0x1c4))return this['processUpdateGraphic']();else _0x14cccf[_0x57db66(0x263)][_0x57db66(0x1b0)][_0x57db66(0x14b)](this),!this['_battler']&&this['_atbGaugeSprite']&&(this[_0x57db66(0x1d0)][_0x57db66(0x159)]=![],this['_svBattlerSprite']&&(this[_0x57db66(0x336)][_0x57db66(0x1d0)]['visible']=![]));}}}else{if(this[_0x57db66(0x187)]!==_0xda31ae[_0x57db66(0x196)]())return this[_0x57db66(0x2d2)]();}break;case _0x57db66(0x301):if(_0xda31ae['isActor']()){if('BfmtA'!=='yBKiM'){if(this[_0x57db66(0x169)]!==_0xda31ae['battlerName']()){if(_0x57db66(0x27f)!==_0x57db66(0x27f)){if(this[_0x57db66(0x2e3)]===_0x26ed0c&&_0x177dcf[_0x57db66(0x349)]())return;if(this[_0x57db66(0x2e3)]===_0x3a68cb&&!_0x535b87[_0x57db66(0x349)]())return;}else return this[_0x57db66(0x2d2)]();}}else return _0x57db66(0x180)['format'](_0x4e458c(_0x3b8a6b['$1']));}else{if(this[_0x57db66(0x187)]!==_0xda31ae[_0x57db66(0x196)]())return this['processUpdateGraphic']();}break;}},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x2d2)]=function(){const _0x1aebb6=_0x1c04e6,_0x1386d3=this[_0x1aebb6(0x218)]();if(!_0x1386d3)return;this[_0x1aebb6(0x260)]=_0x1386d3[_0x1aebb6(0x33f)]();if(_0x1386d3[_0x1aebb6(0x324)]()&&this[_0x1aebb6(0x260)]===_0x1aebb6(0x23e))this[_0x1aebb6(0x260)]=_0x1aebb6(0x29c);else{if(_0x1386d3[_0x1aebb6(0x28c)]()&&this[_0x1aebb6(0x260)]===_0x1aebb6(0x301)){if(_0x1aebb6(0x2dc)===_0x1aebb6(0x16f))return![];else this[_0x1aebb6(0x260)]=_0x1aebb6(0x23e);}}let _0x3ded2e;switch(this[_0x1aebb6(0x260)]){case _0x1aebb6(0x29c):this[_0x1aebb6(0x17b)]=_0x1386d3['fieldAtbGraphicFaceName'](),this[_0x1aebb6(0x2db)]=_0x1386d3[_0x1aebb6(0x161)](),_0x3ded2e=ImageManager[_0x1aebb6(0x269)](this[_0x1aebb6(0x17b)]),_0x3ded2e[_0x1aebb6(0x31a)](this['changeFaceGraphicBitmap'][_0x1aebb6(0x1b3)](this,_0x3ded2e));break;case _0x1aebb6(0x19f):this[_0x1aebb6(0x322)]=_0x1386d3[_0x1aebb6(0x1fd)](),_0x3ded2e=ImageManager[_0x1aebb6(0x15d)](_0x1aebb6(0x303)),_0x3ded2e[_0x1aebb6(0x31a)](this[_0x1aebb6(0x317)]['bind'](this,_0x3ded2e));break;case'enemy':if(_0x1386d3['hasSvBattler']()){if(_0x1aebb6(0x26c)!==_0x1aebb6(0x26c)){const _0x2765fd=_0x3533f8[_0x1aebb6(0x263)]['Settings'][_0x1aebb6(0x1f1)];if(_0x3cff51['VisuMZ_0_CoreEngine']){const _0x43f2bd=_0x2765fd[_0x1aebb6(0x1b9)],_0x53a48c=_0x2765fd[_0x1aebb6(0x223)],_0x3d8de9=_0x2765fd[_0x1aebb6(0x237)];_0x1ca14c[_0x1aebb6(0x2d3)]([this],_0x43f2bd,_0x53a48c,_0x3d8de9);}if(this[_0x1aebb6(0x218)]()&&_0x2765fd[_0x1aebb6(0x124)]['length']>0x0){const _0x94fded=_0x2765fd[_0x1aebb6(0x124)],_0x1b0346={'textColor':_0x107318[_0x1aebb6(0x164)](_0x2765fd['InterruptTextColor']),'flashColor':_0x2765fd[_0x1aebb6(0x120)],'flashDuration':_0x2765fd['InterruptFlashDuration']};this[_0x1aebb6(0x316)](_0x94fded,_0x1b0346);}}else this[_0x1aebb6(0x169)]=_0x1386d3[_0x1aebb6(0x1d3)](),_0x3ded2e=ImageManager[_0x1aebb6(0x21b)](this[_0x1aebb6(0x169)]),_0x3ded2e[_0x1aebb6(0x31a)](this[_0x1aebb6(0x165)][_0x1aebb6(0x1b3)](this,_0x3ded2e));}else $gameSystem[_0x1aebb6(0x21e)]()?(this[_0x1aebb6(0x187)]=_0x1386d3[_0x1aebb6(0x196)](),_0x3ded2e=ImageManager['loadSvEnemy'](this[_0x1aebb6(0x187)]),_0x3ded2e[_0x1aebb6(0x31a)](this['changeEnemyGraphicBitmap'][_0x1aebb6(0x1b3)](this,_0x3ded2e))):(this[_0x1aebb6(0x187)]=_0x1386d3[_0x1aebb6(0x196)](),_0x3ded2e=ImageManager['loadEnemy'](this[_0x1aebb6(0x187)]),_0x3ded2e[_0x1aebb6(0x31a)](this[_0x1aebb6(0x198)]['bind'](this,_0x3ded2e)));break;case _0x1aebb6(0x301):this['_graphicSv']=_0x1386d3['battlerName'](),_0x3ded2e=ImageManager[_0x1aebb6(0x21b)](this[_0x1aebb6(0x169)]),_0x3ded2e[_0x1aebb6(0x31a)](this[_0x1aebb6(0x165)][_0x1aebb6(0x1b3)](this,_0x3ded2e));break;}},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)]['changeFaceGraphicBitmap']=function(_0x35352c){const _0x5accbd=_0x1c04e6,_0x2da080=Sprite_FieldGaugeATB['Settings'],_0x573f99=_0x2da080[_0x5accbd(0x2ea)],_0x1bd986=this[_0x5accbd(0x2db)];this[_0x5accbd(0x1c5)]['bitmap']=new Bitmap(_0x573f99,_0x573f99);const _0xff8446=this['_graphicSprite'][_0x5accbd(0x327)],_0x3909b6=ImageManager[_0x5accbd(0x252)],_0xf0bc88=ImageManager[_0x5accbd(0x219)],_0x210292=ImageManager[_0x5accbd(0x252)],_0x255ac8=ImageManager[_0x5accbd(0x219)],_0x3419d9=_0x1bd986%0x4*_0x3909b6+(_0x3909b6-_0x210292)/0x2,_0xf6f6bf=Math[_0x5accbd(0x129)](_0x1bd986/0x4)*_0xf0bc88+(_0xf0bc88-_0x255ac8)/0x2;_0xff8446[_0x5accbd(0x2bf)](_0x35352c,_0x3419d9,_0xf6f6bf,_0x210292,_0x255ac8,0x0,0x0,_0x573f99,_0x573f99);},Sprite_FieldMarkerATB['prototype'][_0x1c04e6(0x317)]=function(_0x137a7c){const _0x179c59=_0x1c04e6,_0x451896=Sprite_FieldGaugeATB[_0x179c59(0x156)],_0x20f9a4=_0x451896[_0x179c59(0x2ea)],_0x43f1c9=this[_0x179c59(0x322)];this['_graphicSprite']['bitmap']=new Bitmap(_0x20f9a4,_0x20f9a4);const _0x267be4=this[_0x179c59(0x1c5)][_0x179c59(0x327)],_0x3e6870=ImageManager[_0x179c59(0x182)],_0xc5cfcc=ImageManager['iconHeight'],_0x11d390=_0x43f1c9%0x10*_0x3e6870,_0xe1c0f8=Math[_0x179c59(0x129)](_0x43f1c9/0x10)*_0xc5cfcc;_0x267be4[_0x179c59(0x2bf)](_0x137a7c,_0x11d390,_0xe1c0f8,_0x3e6870,_0xc5cfcc,0x0,0x0,_0x20f9a4,_0x20f9a4);},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x165)]=function(_0x3d3023){const _0x109cda=_0x1c04e6,_0x53205b=Sprite_FieldGaugeATB[_0x109cda(0x156)],_0x510da0=_0x53205b[_0x109cda(0x2ea)];this[_0x109cda(0x1c5)][_0x109cda(0x327)]=new Bitmap(_0x510da0,_0x510da0);const _0x4867e3=this[_0x109cda(0x1c5)][_0x109cda(0x327)],_0x549fe1=this['_graphicSv'][_0x109cda(0x2fd)](/\$/i),_0x12b329=_0x549fe1?0x1:ImageManager['svActorHorzCells'],_0x1108e8=_0x549fe1?0x1:ImageManager['svActorVertCells'],_0x18f5cc=_0x3d3023[_0x109cda(0x2c0)]/_0x12b329,_0x235e53=_0x3d3023['height']/_0x1108e8,_0x385e8a=Math[_0x109cda(0x185)](0x1,_0x510da0/_0x18f5cc,_0x510da0/_0x235e53),_0x26636f=_0x18f5cc*_0x385e8a,_0x1e9ed8=_0x235e53*_0x385e8a,_0x3beb16=Math[_0x109cda(0x300)]((_0x510da0-_0x26636f)/0x2),_0x1209dd=Math['round']((_0x510da0-_0x1e9ed8)/0x2);_0x4867e3[_0x109cda(0x2bf)](_0x3d3023,0x0,0x0,_0x18f5cc,_0x235e53,_0x3beb16,_0x1209dd,_0x26636f,_0x1e9ed8);},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x198)]=function(_0x304979){const _0x4d0d1e=_0x1c04e6,_0x42c939=Sprite_FieldGaugeATB[_0x4d0d1e(0x156)],_0x3901d2=_0x42c939[_0x4d0d1e(0x2ea)];this[_0x4d0d1e(0x1c5)][_0x4d0d1e(0x327)]=new Bitmap(_0x3901d2,_0x3901d2);const _0x1c8cea=this[_0x4d0d1e(0x1c5)][_0x4d0d1e(0x327)],_0x5b8609=Math['min'](0x1,_0x3901d2/_0x304979['width'],_0x3901d2/_0x304979[_0x4d0d1e(0x1b5)]),_0x4f26bc=_0x304979[_0x4d0d1e(0x2c0)]*_0x5b8609,_0x3d433f=_0x304979[_0x4d0d1e(0x1b5)]*_0x5b8609,_0x207f44=Math[_0x4d0d1e(0x300)]((_0x3901d2-_0x4f26bc)/0x2),_0x316bed=Math[_0x4d0d1e(0x300)]((_0x3901d2-_0x3d433f)/0x2);_0x1c8cea[_0x4d0d1e(0x2bf)](_0x304979,0x0,0x0,_0x304979[_0x4d0d1e(0x2c0)],_0x304979[_0x4d0d1e(0x1b5)],_0x207f44,_0x316bed,_0x4f26bc,_0x3d433f);},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x1c9)]=function(){const _0x3f562e=_0x1c04e6,_0x52b2ab=this[_0x3f562e(0x218)]();if(!_0x52b2ab)return;if(!_0x52b2ab[_0x3f562e(0x28c)]())return;if(this[_0x3f562e(0x1ff)]===_0x52b2ab[_0x3f562e(0x13c)]())return;this['_graphicHue']=_0x52b2ab['battlerHue']();if(_0x52b2ab[_0x3f562e(0x349)]())this[_0x3f562e(0x1ff)]=0x0;this[_0x3f562e(0x1c5)][_0x3f562e(0x175)](this['_graphicHue']);},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x2f1)]=function(){const _0x2a42e5=_0x1c04e6;if(!this[_0x2a42e5(0x2c3)])return;const _0x2b510f=this[_0x2a42e5(0x218)]();if(!_0x2b510f)return;if(this['_letter']===_0x2b510f['_letter']&&this[_0x2a42e5(0x13f)]===_0x2b510f[_0x2a42e5(0x13f)])return;this[_0x2a42e5(0x203)]=_0x2b510f['_letter'],this[_0x2a42e5(0x13f)]=_0x2b510f[_0x2a42e5(0x13f)];const _0x7be3b8=Sprite_FieldGaugeATB[_0x2a42e5(0x156)],_0x49eeb7=_0x7be3b8[_0x2a42e5(0x2ea)],_0x865f1=Math[_0x2a42e5(0x129)](_0x49eeb7/0x2),_0x58c3e6=this['_letterSprite'][_0x2a42e5(0x327)];_0x58c3e6[_0x2a42e5(0x1fc)]();if(!this['_plural'])return;_0x58c3e6[_0x2a42e5(0x23f)]=_0x7be3b8[_0x2a42e5(0x2af)]||$gameSystem[_0x2a42e5(0x345)](),_0x58c3e6[_0x2a42e5(0x30c)]=_0x7be3b8[_0x2a42e5(0x22e)]||0x10,_0x58c3e6['drawText'](this['_letter'],0x2,_0x865f1,_0x49eeb7-0x4,_0x865f1-0x2,'right');},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x1c3)]=function(){const _0x94b698=_0x1c04e6,_0x58b1f8=this[_0x94b698(0x218)]();if(!_0x58b1f8)return;const _0x59dc22=_0x58b1f8['battler']();if(!_0x59dc22)return;const _0x54b03d=_0x59dc22[_0x94b698(0x294)]();if(!_0x54b03d)return;this[_0x94b698(0x2e7)](_0x54b03d[_0x94b698(0x329)]);},Sprite_FieldMarkerATB[_0x1c04e6(0x31c)][_0x1c04e6(0x19e)]=function(){const _0x5a9b72=_0x1c04e6;return this[_0x5a9b72(0x218)]();};