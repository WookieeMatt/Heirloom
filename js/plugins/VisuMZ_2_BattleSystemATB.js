//=============================================================================
// VisuStella MZ - Battle System ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.22;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.22] [BattleSystemATB]
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

const _0x47f037=_0x2723;function _0x2723(_0x4358ad,_0x2e0976){const _0x438462=_0x4384();return _0x2723=function(_0x272320,_0x153f19){_0x272320=_0x272320-0x1f2;let _0x5283be=_0x438462[_0x272320];return _0x5283be;},_0x2723(_0x4358ad,_0x2e0976);}(function(_0x3f46e0,_0x1b3af3){const _0xe0233e=_0x2723,_0x36b33b=_0x3f46e0();while(!![]){try{const _0x532064=-parseInt(_0xe0233e(0x2b5))/0x1+parseInt(_0xe0233e(0x3a0))/0x2+-parseInt(_0xe0233e(0x2b9))/0x3*(-parseInt(_0xe0233e(0x253))/0x4)+parseInt(_0xe0233e(0x326))/0x5+parseInt(_0xe0233e(0x3d1))/0x6+-parseInt(_0xe0233e(0x3ae))/0x7+parseInt(_0xe0233e(0x33b))/0x8*(-parseInt(_0xe0233e(0x276))/0x9);if(_0x532064===_0x1b3af3)break;else _0x36b33b['push'](_0x36b33b['shift']());}catch(_0x45eff8){_0x36b33b['push'](_0x36b33b['shift']());}}}(_0x4384,0x632bc));var label=_0x47f037(0x309),tier=tier||0x0,dependencies=[_0x47f037(0x211)],pluginData=$plugins[_0x47f037(0x27d)](function(_0x15d2a7){const _0xdca540=_0x47f037;return _0x15d2a7[_0xdca540(0x2e8)]&&_0x15d2a7[_0xdca540(0x28f)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x47f037(0x40d)]=VisuMZ[label][_0x47f037(0x40d)]||{},VisuMZ[_0x47f037(0x294)]=function(_0x1880ea,_0x1a3291){const _0x233f78=_0x47f037;for(const _0x5e4e8b in _0x1a3291){if(_0x233f78(0x285)!==_0x233f78(0x285))this[_0x233f78(0x2e7)]();else{if(_0x5e4e8b[_0x233f78(0x36f)](/(.*):(.*)/i)){if(_0x233f78(0x35d)==='ccBbS'){const _0xad1383=String(RegExp['$1']),_0x3d130e=String(RegExp['$2'])[_0x233f78(0x2db)]()[_0x233f78(0x275)]();let _0x3202be,_0x382bc4,_0x589ff4;switch(_0x3d130e){case _0x233f78(0x315):_0x3202be=_0x1a3291[_0x5e4e8b]!==''?Number(_0x1a3291[_0x5e4e8b]):0x0;break;case _0x233f78(0x412):_0x382bc4=_0x1a3291[_0x5e4e8b]!==''?JSON['parse'](_0x1a3291[_0x5e4e8b]):[],_0x3202be=_0x382bc4[_0x233f78(0x247)](_0x4bf902=>Number(_0x4bf902));break;case'EVAL':_0x3202be=_0x1a3291[_0x5e4e8b]!==''?eval(_0x1a3291[_0x5e4e8b]):null;break;case'ARRAYEVAL':_0x382bc4=_0x1a3291[_0x5e4e8b]!==''?JSON[_0x233f78(0x3c5)](_0x1a3291[_0x5e4e8b]):[],_0x3202be=_0x382bc4[_0x233f78(0x247)](_0x1e0dd4=>eval(_0x1e0dd4));break;case _0x233f78(0x3ea):_0x3202be=_0x1a3291[_0x5e4e8b]!==''?JSON[_0x233f78(0x3c5)](_0x1a3291[_0x5e4e8b]):'';break;case _0x233f78(0x32b):_0x382bc4=_0x1a3291[_0x5e4e8b]!==''?JSON[_0x233f78(0x3c5)](_0x1a3291[_0x5e4e8b]):[],_0x3202be=_0x382bc4[_0x233f78(0x247)](_0x36118e=>JSON[_0x233f78(0x3c5)](_0x36118e));break;case _0x233f78(0x2f2):_0x3202be=_0x1a3291[_0x5e4e8b]!==''?new Function(JSON[_0x233f78(0x3c5)](_0x1a3291[_0x5e4e8b])):new Function(_0x233f78(0x3f2));break;case _0x233f78(0x3cc):_0x382bc4=_0x1a3291[_0x5e4e8b]!==''?JSON['parse'](_0x1a3291[_0x5e4e8b]):[],_0x3202be=_0x382bc4[_0x233f78(0x247)](_0x2d4c89=>new Function(JSON['parse'](_0x2d4c89)));break;case'STR':_0x3202be=_0x1a3291[_0x5e4e8b]!==''?String(_0x1a3291[_0x5e4e8b]):'';break;case _0x233f78(0x282):_0x382bc4=_0x1a3291[_0x5e4e8b]!==''?JSON[_0x233f78(0x3c5)](_0x1a3291[_0x5e4e8b]):[],_0x3202be=_0x382bc4[_0x233f78(0x247)](_0x1f034d=>String(_0x1f034d));break;case _0x233f78(0x3c7):_0x589ff4=_0x1a3291[_0x5e4e8b]!==''?JSON[_0x233f78(0x3c5)](_0x1a3291[_0x5e4e8b]):{},_0x3202be=VisuMZ['ConvertParams']({},_0x589ff4);break;case _0x233f78(0x361):_0x382bc4=_0x1a3291[_0x5e4e8b]!==''?JSON[_0x233f78(0x3c5)](_0x1a3291[_0x5e4e8b]):[],_0x3202be=_0x382bc4[_0x233f78(0x247)](_0x34e704=>VisuMZ[_0x233f78(0x294)]({},JSON[_0x233f78(0x3c5)](_0x34e704)));break;default:continue;}_0x1880ea[_0xad1383]=_0x3202be;}else this['initBattleSystemATB']();}}}return _0x1880ea;},(_0x136130=>{const _0x27d05c=_0x47f037,_0x885fb7=_0x136130[_0x27d05c(0x26b)];for(const _0xa99767 of dependencies){if(!Imported[_0xa99767]){alert(_0x27d05c(0x237)[_0x27d05c(0x297)](_0x885fb7,_0xa99767)),SceneManager[_0x27d05c(0x24e)]();break;}}const _0x331d80=_0x136130[_0x27d05c(0x28f)];if(_0x331d80[_0x27d05c(0x36f)](/\[Version[ ](.*?)\]/i)){const _0x74ef1b=Number(RegExp['$1']);_0x74ef1b!==VisuMZ[label][_0x27d05c(0x1f3)]&&(alert(_0x27d05c(0x385)[_0x27d05c(0x297)](_0x885fb7,_0x74ef1b)),SceneManager[_0x27d05c(0x24e)]());}if(_0x331d80[_0x27d05c(0x36f)](/\[Tier[ ](\d+)\]/i)){const _0xb84db5=Number(RegExp['$1']);_0xb84db5<tier?(alert(_0x27d05c(0x25f)['format'](_0x885fb7,_0xb84db5,tier)),SceneManager[_0x27d05c(0x24e)]()):tier=Math['max'](_0xb84db5,tier);}VisuMZ[_0x27d05c(0x294)](VisuMZ[label][_0x27d05c(0x40d)],_0x136130[_0x27d05c(0x242)]);})(pluginData),PluginManager[_0x47f037(0x2ed)](pluginData[_0x47f037(0x26b)],_0x47f037(0x2bf),_0x1b271b=>{const _0x27aaa3=_0x47f037;VisuMZ[_0x27aaa3(0x294)](_0x1b271b,_0x1b271b);const _0x3dd4d4=_0x1b271b[_0x27aaa3(0x229)],_0x15c151=_0x1b271b[_0x27aaa3(0x3be)];for(const _0x2e9979 of _0x3dd4d4){const _0x3a0f8e=$gameActors[_0x27aaa3(0x327)](_0x2e9979);if(!_0x3a0f8e)continue;_0x3a0f8e[_0x27aaa3(0x394)]=_0x27aaa3(0x331),_0x3a0f8e[_0x27aaa3(0x2f1)]=_0x15c151;}}),PluginManager['registerCommand'](pluginData['name'],_0x47f037(0x29a),_0x25534e=>{const _0x1248a0=_0x47f037;VisuMZ[_0x1248a0(0x294)](_0x25534e,_0x25534e);const _0x51d4e3=_0x25534e[_0x1248a0(0x229)],_0x207e2d=_0x25534e['FaceName'],_0x33939a=_0x25534e[_0x1248a0(0x26d)];for(const _0x3d089a of _0x51d4e3){const _0x4ffd5b=$gameActors['actor'](_0x3d089a);if(!_0x4ffd5b)continue;_0x4ffd5b[_0x1248a0(0x394)]='face',_0x4ffd5b[_0x1248a0(0x272)]=_0x207e2d,_0x4ffd5b[_0x1248a0(0x25a)]=_0x33939a;}}),PluginManager['registerCommand'](pluginData[_0x47f037(0x26b)],'FieldGaugeClearActorGraphic',_0x5875fb=>{const _0x1547e8=_0x47f037;VisuMZ[_0x1547e8(0x294)](_0x5875fb,_0x5875fb);const _0x2ac50c=_0x5875fb[_0x1547e8(0x229)];for(const _0x2c1023 of _0x2ac50c){const _0x38565e=$gameActors[_0x1547e8(0x327)](_0x2c1023);if(!_0x38565e)continue;_0x38565e[_0x1547e8(0x399)]();}}),PluginManager['registerCommand'](pluginData[_0x47f037(0x26b)],'FieldGaugeEnemyIcon',_0x1d783f=>{const _0x142d2b=_0x47f037;VisuMZ[_0x142d2b(0x294)](_0x1d783f,_0x1d783f);const _0x4f26b4=_0x1d783f[_0x142d2b(0x25d)],_0x3790fa=_0x1d783f[_0x142d2b(0x3be)];for(const _0x12cd61 of _0x4f26b4){const _0xcfe1b7=$gameTroop[_0x142d2b(0x334)]()[_0x12cd61];if(!_0xcfe1b7)continue;_0xcfe1b7[_0x142d2b(0x394)]=_0x142d2b(0x331),_0xcfe1b7[_0x142d2b(0x2f1)]=_0x3790fa;}}),PluginManager[_0x47f037(0x2ed)](pluginData[_0x47f037(0x26b)],_0x47f037(0x235),_0x99f644=>{const _0x4a8e82=_0x47f037;VisuMZ['ConvertParams'](_0x99f644,_0x99f644);const _0x9deb83=_0x99f644[_0x4a8e82(0x25d)],_0x23ffab=_0x99f644[_0x4a8e82(0x1f9)],_0x3a5d82=_0x99f644['FaceIndex'];for(const _0x1a3978 of _0x9deb83){const _0x58f538=$gameTroop[_0x4a8e82(0x334)]()[_0x1a3978];if(!_0x58f538)continue;_0x58f538[_0x4a8e82(0x394)]='face',_0x58f538['_fieldAtbGaugeFaceName']=_0x23ffab,_0x58f538[_0x4a8e82(0x25a)]=_0x3a5d82;}}),PluginManager[_0x47f037(0x2ed)](pluginData[_0x47f037(0x26b)],'FieldGaugeClearEnemyGraphic',_0x540882=>{const _0x3b91d7=_0x47f037;VisuMZ[_0x3b91d7(0x294)](_0x540882,_0x540882);const _0x3a5b85=_0x540882[_0x3b91d7(0x25d)];for(const _0x2ce8d5 of _0x3a5b85){const _0x27fed1=$gameTroop[_0x3b91d7(0x334)]()[_0x2ce8d5];if(!_0x27fed1)continue;_0x27fed1[_0x3b91d7(0x399)]();}}),PluginManager['registerCommand'](pluginData[_0x47f037(0x26b)],_0x47f037(0x3e6),_0x4f8af4=>{const _0x588d72=_0x47f037;VisuMZ[_0x588d72(0x294)](_0x4f8af4,_0x4f8af4);const _0x1809ff=_0x4f8af4[_0x588d72(0x236)];$gameSystem[_0x588d72(0x21d)](_0x1809ff);}),VisuMZ[_0x47f037(0x309)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x47f037(0x2a9)][_0x47f037(0x215)],Scene_Boot[_0x47f037(0x2a9)][_0x47f037(0x215)]=function(){const _0x20f446=_0x47f037;this[_0x20f446(0x2cd)](),VisuMZ['BattleSystemATB'][_0x20f446(0x396)]['call'](this),this['process_VisuMZ_BattleSystemATB_JS_Notetags']();},VisuMZ[_0x47f037(0x309)][_0x47f037(0x25b)]={},Scene_Boot[_0x47f037(0x2a9)][_0x47f037(0x2cd)]=function(){const _0x46ddd0=_0x47f037,_0x35d14a=VisuMZ[_0x46ddd0(0x2ac)][_0x46ddd0(0x25b)],_0x459470=_0x46ddd0(0x223),_0x25e675=[_0x46ddd0(0x3e1),'Cast',_0x46ddd0(0x212)];for(const _0x1d3cbc of _0x25e675){if(_0x46ddd0(0x3fe)!==_0x46ddd0(0x3f5)){const _0x563cc5=_0x459470[_0x46ddd0(0x297)](_0x1d3cbc[_0x46ddd0(0x2db)]()[_0x46ddd0(0x275)](),_0x46ddd0(0x24b),_0x46ddd0(0x381)),_0x47e9c7=new RegExp(_0x563cc5,'i');VisuMZ[_0x46ddd0(0x309)]['RegExp'][_0x1d3cbc]=_0x47e9c7;}else return this[_0x46ddd0(0x239)]();}},Scene_Boot[_0x47f037(0x2a9)][_0x47f037(0x21f)]=function(){const _0x3ee11a=_0x47f037;if(VisuMZ[_0x3ee11a(0x2b1)])return;const _0x500dde=$dataSkills[_0x3ee11a(0x283)]($dataItems);for(const _0x1ccf48 of _0x500dde){if(_0x3ee11a(0x29b)!=='HyAEa'){if(!_0x1ccf48)continue;VisuMZ[_0x3ee11a(0x309)][_0x3ee11a(0x404)](_0x1ccf48);}else this['_tpbState']=_0x3ee11a(0x36b);}},VisuMZ['BattleSystemATB'][_0x47f037(0x214)]=VisuMZ[_0x47f037(0x214)],VisuMZ[_0x47f037(0x214)]=function(_0x7675de){const _0x59a95b=_0x47f037;VisuMZ[_0x59a95b(0x309)]['ParseSkillNotetags'][_0x59a95b(0x1f5)](this,_0x7675de),VisuMZ[_0x59a95b(0x309)][_0x59a95b(0x404)](_0x7675de);},VisuMZ[_0x47f037(0x309)][_0x47f037(0x2c0)]=VisuMZ[_0x47f037(0x2c0)],VisuMZ[_0x47f037(0x2c0)]=function(_0x5e9814){const _0x11df67=_0x47f037;VisuMZ[_0x11df67(0x309)]['ParseItemNotetags']['call'](this,_0x5e9814),VisuMZ['BattleSystemATB'][_0x11df67(0x404)](_0x5e9814);},VisuMZ['BattleSystemATB'][_0x47f037(0x404)]=function(_0xe7ca3c){const _0x4e26b1=_0x47f037,_0x3c9c75=['Charge','Cast',_0x4e26b1(0x212)];for(const _0x5e5e34 of _0x3c9c75){VisuMZ[_0x4e26b1(0x309)][_0x4e26b1(0x200)](_0xe7ca3c,_0x5e5e34);}},VisuMZ[_0x47f037(0x309)]['JS']={},VisuMZ[_0x47f037(0x309)][_0x47f037(0x200)]=function(_0x46e5f8,_0x1aa1e8){const _0x3f27f3=_0x47f037,_0x58f8a7=_0x46e5f8[_0x3f27f3(0x3b6)];if(_0x58f8a7[_0x3f27f3(0x36f)](VisuMZ['BattleSystemATB'][_0x3f27f3(0x25b)][_0x1aa1e8])){const _0x370625=String(RegExp['$1']),_0x5e4af5=_0x3f27f3(0x2b6)[_0x3f27f3(0x297)](_0x370625,_0x1aa1e8),_0x3200da=VisuMZ[_0x3f27f3(0x309)][_0x3f27f3(0x38e)](_0x46e5f8,_0x1aa1e8);VisuMZ[_0x3f27f3(0x309)]['JS'][_0x3200da]=new Function(_0x5e4af5);}},VisuMZ['BattleSystemATB'][_0x47f037(0x38e)]=function(_0x1f7d64,_0x183473){const _0x5d4b31=_0x47f037;if(VisuMZ['createKeyJS'])return VisuMZ[_0x5d4b31(0x38e)](_0x1f7d64,_0x183473);let _0x53a891='';if($dataActors[_0x5d4b31(0x312)](_0x1f7d64))_0x53a891='Actor-%1-%2'['format'](_0x1f7d64['id'],_0x183473);if($dataClasses[_0x5d4b31(0x312)](_0x1f7d64))_0x53a891=_0x5d4b31(0x23a)[_0x5d4b31(0x297)](_0x1f7d64['id'],_0x183473);if($dataSkills[_0x5d4b31(0x312)](_0x1f7d64))_0x53a891=_0x5d4b31(0x329)[_0x5d4b31(0x297)](_0x1f7d64['id'],_0x183473);if($dataItems[_0x5d4b31(0x312)](_0x1f7d64))_0x53a891=_0x5d4b31(0x359)['format'](_0x1f7d64['id'],_0x183473);if($dataWeapons[_0x5d4b31(0x312)](_0x1f7d64))_0x53a891=_0x5d4b31(0x206)[_0x5d4b31(0x297)](_0x1f7d64['id'],_0x183473);if($dataArmors[_0x5d4b31(0x312)](_0x1f7d64))_0x53a891=_0x5d4b31(0x31c)[_0x5d4b31(0x297)](_0x1f7d64['id'],_0x183473);if($dataEnemies[_0x5d4b31(0x312)](_0x1f7d64))_0x53a891=_0x5d4b31(0x2d6)['format'](_0x1f7d64['id'],_0x183473);if($dataStates[_0x5d4b31(0x312)](_0x1f7d64))_0x53a891=_0x5d4b31(0x351)[_0x5d4b31(0x297)](_0x1f7d64['id'],_0x183473);return _0x53a891;},ConfigManager['visualAtbGauge']=!![],VisuMZ[_0x47f037(0x309)]['ConfigManager_makeData']=ConfigManager[_0x47f037(0x243)],ConfigManager[_0x47f037(0x243)]=function(){const _0x5871ba=_0x47f037,_0x4afb17=VisuMZ[_0x5871ba(0x309)][_0x5871ba(0x38a)][_0x5871ba(0x1f5)](this);return _0x4afb17[_0x5871ba(0x3ed)]=this[_0x5871ba(0x3ed)],_0x4afb17;},VisuMZ[_0x47f037(0x309)][_0x47f037(0x3e5)]=ConfigManager['applyData'],ConfigManager[_0x47f037(0x3c6)]=function(_0x550e3c){const _0x4b9e12=_0x47f037;VisuMZ[_0x4b9e12(0x309)][_0x4b9e12(0x3e5)][_0x4b9e12(0x1f5)](this,_0x550e3c);if(_0x4b9e12(0x3ed)in _0x550e3c)this[_0x4b9e12(0x3ed)]=_0x550e3c['visualAtbGauge'];else{if(_0x4b9e12(0x2d0)!==_0x4b9e12(0x40b))this[_0x4b9e12(0x3ed)]=!![];else return _0x57fe7a['BattleSystemATB']['Sprite_Gauge_currentValue'][_0x4b9e12(0x1f5)](this);}},ImageManager['svActorHorzCells']=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x47f037(0x21a)]=ImageManager[_0x47f037(0x21a)]||0x6,TextManager[_0x47f037(0x3ed)]=VisuMZ['BattleSystemATB'][_0x47f037(0x40d)]['Options'][_0x47f037(0x290)],VisuMZ[_0x47f037(0x309)][_0x47f037(0x2af)]=ColorManager[_0x47f037(0x3e2)],ColorManager['loadWindowskin']=function(){const _0x53d580=_0x47f037;VisuMZ[_0x53d580(0x309)][_0x53d580(0x2af)][_0x53d580(0x1f5)](this),this[_0x53d580(0x303)][_0x53d580(0x304)](this[_0x53d580(0x3a2)][_0x53d580(0x332)](this));},ColorManager[_0x47f037(0x368)]=function(_0x201432){const _0x503164=_0x47f037;_0x201432=String(_0x201432);if(_0x201432[_0x503164(0x36f)](/#(.*)/i))return _0x503164(0x356)[_0x503164(0x297)](String(RegExp['$1']));else{if(_0x503164(0x292)===_0x503164(0x292))return this[_0x503164(0x379)](Number(_0x201432));else this['y']=_0x765b05['GaugeThick']/0x2,this['y']+=_0xeeb9b9?-_0x2a8ac5:_0x39097c;}},ColorManager['setupBattleSystemATBColors']=function(){const _0x1a09cd=_0x47f037,_0x3016d7=['default',_0x1a09cd(0x38d),'cast',_0x1a09cd(0x30b),_0x1a09cd(0x3c1),_0x1a09cd(0x244)],_0x11fcea=VisuMZ['BattleSystemATB'][_0x1a09cd(0x40d)][_0x1a09cd(0x261)];this[_0x1a09cd(0x34f)]={};for(const _0x180079 of _0x3016d7){for(let _0x47d393=0x1;_0x47d393<=0x2;_0x47d393++){const _0x5d8683=_0x180079+_0x47d393;this[_0x1a09cd(0x34f)][_0x5d8683]=this['getColor'](_0x11fcea[_0x5d8683]);}}},ColorManager['atbColor']=function(_0x300825){const _0x35794b=_0x47f037;if(this[_0x35794b(0x34f)]===undefined)this[_0x35794b(0x3a2)]();return this['_atbColors'][_0x300825]||'#000000';},SceneManager[_0x47f037(0x33e)]=function(){const _0x25dd21=_0x47f037;return this['_scene']&&this[_0x25dd21(0x248)][_0x25dd21(0x328)]===Scene_Battle;},BattleManager[_0x47f037(0x2f3)]=function(){const _0x1eed82=_0x47f037;if(Imported[_0x1eed82(0x240)]&&this[_0x1eed82(0x284)]())return![];return this[_0x1eed82(0x37a)]();},VisuMZ[_0x47f037(0x309)]['BattleManager_isActiveTpb']=BattleManager[_0x47f037(0x314)],BattleManager['isActiveTpb']=function(){const _0x546d62=_0x47f037;if(!this[_0x546d62(0x37a)]()){if(_0x546d62(0x265)!==_0x546d62(0x256))return![];else _0x20af9e[_0x546d62(0x318)](_0x50409c+_0x4410b1+_0x2062d0,_0x32e6c8+_0x53612d,_0x99e171,_0x1eb5df),_0xc1fd1d['x']+=_0x395140[_0x546d62(0x266)](_0x1c81ea*1.75),_0x167b48[_0x546d62(0x33d)]['x']=0x1;}else return ConfigManager&&ConfigManager[_0x546d62(0x413)]!==undefined?ConfigManager[_0x546d62(0x413)]:'epyEo'===_0x546d62(0x3b1)?VisuMZ['BattleSystemATB'][_0x546d62(0x317)][_0x546d62(0x1f5)](this):_0x5a3fbd[_0x546d62(0x309)][_0x546d62(0x317)][_0x546d62(0x1f5)](this);},VisuMZ['BattleSystemATB']['Game_System_initialize']=Game_System[_0x47f037(0x2a9)]['initialize'],Game_System[_0x47f037(0x2a9)][_0x47f037(0x2fb)]=function(){const _0x29c19d=_0x47f037;VisuMZ[_0x29c19d(0x309)][_0x29c19d(0x270)]['call'](this),this[_0x29c19d(0x23c)]();},Game_System[_0x47f037(0x2a9)][_0x47f037(0x23c)]=function(){const _0x5b3042=_0x47f037;this[_0x5b3042(0x34c)]=!![];},Game_System[_0x47f037(0x2a9)][_0x47f037(0x31d)]=function(){const _0x3e8228=_0x47f037;if(this[_0x3e8228(0x34c)]===undefined){if(_0x3e8228(0x372)==='FVRqW')this['initBattleSystemATB']();else return this[_0x3e8228(0x239)]();}return this[_0x3e8228(0x34c)];},Game_System[_0x47f037(0x2a9)]['setBattleSystemATBFieldGaugeVisible']=function(_0xd1c47f){const _0x7cfab1=_0x47f037;this[_0x7cfab1(0x34c)]===undefined&&this[_0x7cfab1(0x23c)](),this['_atbFieldGaugeVisible']=_0xd1c47f;},VisuMZ[_0x47f037(0x309)][_0x47f037(0x3ba)]=Game_Action['prototype'][_0x47f037(0x264)],Game_Action['prototype'][_0x47f037(0x264)]=function(_0x507d9a){const _0x28a7b0=_0x47f037;VisuMZ[_0x28a7b0(0x309)][_0x28a7b0(0x3ba)][_0x28a7b0(0x1f5)](this,_0x507d9a),this[_0x28a7b0(0x3c8)](_0x507d9a);},Game_Action[_0x47f037(0x2a9)][_0x47f037(0x3c8)]=function(_0x1c3dc5){const _0x3bd802=_0x47f037;if(!SceneManager[_0x3bd802(0x33e)]())return;if(!BattleManager['isATB']())return;if(this[_0x3bd802(0x3cb)]())this[_0x3bd802(0x1fa)](_0x1c3dc5);},Game_Action[_0x47f037(0x2a9)][_0x47f037(0x1fa)]=function(_0x58994f){const _0x379902=_0x47f037,_0x3785c8=this[_0x379902(0x3cb)]()[_0x379902(0x3b6)];if(_0x58994f[_0x379902(0x2cf)]()){const _0x5bed4b=VisuMZ['BattleSystemATB']['createKeyJS'](this['item'](),_0x379902(0x3e1));if(VisuMZ[_0x379902(0x309)]['JS'][_0x5bed4b]){if(_0x379902(0x3a3)!==_0x379902(0x3f8)){const _0x1a9e45=VisuMZ['BattleSystemATB']['JS'][_0x5bed4b][_0x379902(0x1f5)](this,this[_0x379902(0x380)](),_0x58994f);_0x58994f['setAtbChargeTime'](_0x1a9e45);}else this[_0x379902(0x383)]=_0x2617d8[_0x379902(0x2c2)](),_0x1d3c48=_0x979bf4[_0x379902(0x207)](this['_graphicSv']),_0xa3de43[_0x379902(0x304)](this[_0x379902(0x3b9)][_0x379902(0x332)](this,_0x1364d7));}_0x3785c8[_0x379902(0x36f)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x58994f[_0x379902(0x30e)](Number(RegExp['$1'])*0.01),_0x3785c8[_0x379902(0x36f)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x58994f[_0x379902(0x370)](Number(RegExp['$1'])*0.01);}else{if(_0x58994f[_0x379902(0x258)]()){const _0x585740=VisuMZ[_0x379902(0x309)][_0x379902(0x38e)](this[_0x379902(0x3cb)](),'Cast');if(VisuMZ[_0x379902(0x309)]['JS'][_0x585740]){const _0x32cc6d=VisuMZ[_0x379902(0x309)]['JS'][_0x585740][_0x379902(0x1f5)](this,this['subject'](),_0x58994f);_0x58994f[_0x379902(0x2a3)](_0x32cc6d);}_0x3785c8['match'](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x58994f['setAtbCastTime'](Number(RegExp['$1'])*0.01);if(_0x3785c8[_0x379902(0x36f)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)){if('fSoxP'===_0x379902(0x1fd)){if(!_0x16e240[_0x379902(0x2f3)]())return;_0x4b8b9e['BattleSystemATB']['Settings'][_0x379902(0x371)][_0x379902(0x384)]&&this[_0x379902(0x2e7)]();}else _0x58994f[_0x379902(0x35c)](Number(RegExp['$1'])*0.01);}_0x3785c8[_0x379902(0x36f)](/<(?:ATB|TPB) INTERRUPT>/i)&&_0x58994f['atbInterrupt']();}}},VisuMZ[_0x47f037(0x309)]['Game_Action_applyGlobal']=Game_Action['prototype'][_0x47f037(0x2d9)],Game_Action[_0x47f037(0x2a9)][_0x47f037(0x2d9)]=function(){const _0x110c95=_0x47f037;VisuMZ['BattleSystemATB'][_0x110c95(0x232)][_0x110c95(0x1f5)](this),this['applyGlobalBattleSystemATBEffects']();},Game_Action[_0x47f037(0x2a9)][_0x47f037(0x281)]=function(){const _0x500fcb=_0x47f037;if(!this[_0x500fcb(0x3cb)]())return;if(!BattleManager['isATB']())return;const _0x2823b1=this[_0x500fcb(0x3cb)]()[_0x500fcb(0x3b6)];let _0x59e3de=0x0;this[_0x500fcb(0x252)]&&(_0x59e3de=this[_0x500fcb(0x380)]()[_0x500fcb(0x233)]);const _0x1b405d=VisuMZ['BattleSystemATB']['createKeyJS'](this['item'](),_0x500fcb(0x212));VisuMZ[_0x500fcb(0x309)]['JS'][_0x1b405d]&&('JgBRi'!==_0x500fcb(0x224)?_0x59e3de=VisuMZ[_0x500fcb(0x309)]['JS'][_0x1b405d][_0x500fcb(0x1f5)](this,this[_0x500fcb(0x380)](),this[_0x500fcb(0x380)]()):(_0x252594[_0x500fcb(0x309)][_0x500fcb(0x2af)][_0x500fcb(0x1f5)](this),this['_windowskin'][_0x500fcb(0x304)](this[_0x500fcb(0x3a2)][_0x500fcb(0x332)](this))));let _0x4de0c6=this['item']()[_0x500fcb(0x28e)]>0x0?this[_0x500fcb(0x3cb)]()[_0x500fcb(0x28e)]:0x0;if(this['isAttack']())_0x4de0c6+=this[_0x500fcb(0x380)]()[_0x500fcb(0x35e)]();_0x59e3de+=(_0x4de0c6/0xfa0)['clamp'](0x0,0x1);this[_0x500fcb(0x3cb)]()[_0x500fcb(0x3b6)][_0x500fcb(0x36f)](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x59e3de=Number(RegExp['$1'])*0.01);const _0x1f3f02=this['subject']()[_0x500fcb(0x418)]()[_0x500fcb(0x283)](this[_0x500fcb(0x380)]()['skills']()),_0x5c2627=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x4ed2bf=_0x1f3f02[_0x500fcb(0x247)](_0x13129d=>_0x13129d&&_0x13129d[_0x500fcb(0x3b6)][_0x500fcb(0x36f)](_0x5c2627)?Number(RegExp['$1'])*0.01:0x0);_0x59e3de=_0x4ed2bf['reduce']((_0x4ac453,_0x55eb98)=>_0x4ac453+_0x55eb98,_0x59e3de),this[_0x500fcb(0x3cb)]()['note'][_0x500fcb(0x36f)](/<(?:ATB|TPB) INSTANT>/i)&&(_0x59e3de=0xa),this[_0x500fcb(0x380)]()['setAtbAfterSpeed'](_0x59e3de);},Game_BattlerBase[_0x47f037(0x2a9)][_0x47f037(0x30e)]=function(_0x150455){const _0x307057=_0x47f037;this['_tpbChargeTime']=_0x150455[_0x307057(0x3b7)](0x0,0x1);},Game_BattlerBase['prototype'][_0x47f037(0x370)]=function(_0x4f2131){const _0x466fb1=_0x47f037;this[_0x466fb1(0x30e)](this[_0x466fb1(0x233)]+_0x4f2131);},Game_BattlerBase[_0x47f037(0x2a9)][_0x47f037(0x2a3)]=function(_0x5dc978){const _0x2efb3d=_0x47f037,_0x391b5b=this[_0x2efb3d(0x2ad)]();this[_0x2efb3d(0x2b0)]=(_0x391b5b*_0x5dc978)['clamp'](0x0,_0x391b5b);},Game_BattlerBase[_0x47f037(0x2a9)]['changeAtbCastTime']=function(_0xb502bc){const _0x465fff=_0x47f037,_0x123a45=this[_0x465fff(0x2ad)](),_0x482467=_0x123a45*_0xb502bc;this[_0x465fff(0x2b0)]=(this['_tpbCastTime']+_0x482467)['clamp'](0x0,_0x123a45);},VisuMZ[_0x47f037(0x309)][_0x47f037(0x3a1)]=Game_BattlerBase[_0x47f037(0x2a9)][_0x47f037(0x352)],Game_BattlerBase[_0x47f037(0x2a9)][_0x47f037(0x352)]=function(){const _0xe2235b=_0x47f037;VisuMZ[_0xe2235b(0x309)][_0xe2235b(0x3a1)]['call'](this),BattleManager[_0xe2235b(0x37a)]()&&this[_0xe2235b(0x2a5)]();},VisuMZ['BattleSystemATB']['Game_BattlerBase_revive']=Game_BattlerBase[_0x47f037(0x2a9)][_0x47f037(0x37b)],Game_BattlerBase['prototype']['revive']=function(){const _0x1fec08=_0x47f037;VisuMZ['BattleSystemATB'][_0x1fec08(0x320)]['call'](this),BattleManager[_0x1fec08(0x37a)]()&&this['clearTpbChargeTime']();},Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x2cf)]=function(){const _0x195dd6=_0x47f037;return this[_0x195dd6(0x321)]===_0x195dd6(0x342);},Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x258)]=function(){const _0x3bcfe9=_0x47f037;return this[_0x3bcfe9(0x321)]===_0x3bcfe9(0x2d4)&&this[_0x3bcfe9(0x338)]()&&this[_0x3bcfe9(0x338)]()[_0x3bcfe9(0x3cb)]()&&this[_0x3bcfe9(0x338)]()[_0x3bcfe9(0x3cb)]()[_0x3bcfe9(0x28e)]<0x0;},Game_BattlerBase[_0x47f037(0x2a9)][_0x47f037(0x2be)]=function(){const _0x119e2f=_0x47f037;return this[_0x119e2f(0x258)]()?this['_tpbCastTime']/this[_0x119e2f(0x2ad)]():_0x119e2f(0x325)!==_0x119e2f(0x325)?_0x2e2de4[_0x119e2f(0x30d)](this['_battler']['_tpbCastTime'],0x0):0x0;},Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x31e)]=function(){return!this['canMove']();},Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x26f)]=function(_0x591e6d){const _0x562a57=_0x47f037;this[_0x562a57(0x29f)]=_0x591e6d;},VisuMZ[_0x47f037(0x309)][_0x47f037(0x3e4)]=BattleManager[_0x47f037(0x36e)],BattleManager[_0x47f037(0x36e)]=function(_0x798337){const _0x3bb4fe=_0x47f037;this['isTpb']()&&!_0x798337['canMove']()&&(_0x798337['_onRestrictBypassAtbReset']=!![]),VisuMZ[_0x3bb4fe(0x309)][_0x3bb4fe(0x3e4)]['call'](this,_0x798337),this[_0x3bb4fe(0x37a)]()&&!_0x798337[_0x3bb4fe(0x308)]()&&(_0x798337[_0x3bb4fe(0x306)]=![]);},VisuMZ[_0x47f037(0x309)][_0x47f037(0x26c)]=Game_Battler[_0x47f037(0x2a9)]['clearTpbChargeTime'],Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x2a5)]=function(){const _0x2ebd98=_0x47f037;if(this[_0x2ebd98(0x306)])return;VisuMZ[_0x2ebd98(0x309)][_0x2ebd98(0x26c)][_0x2ebd98(0x1f5)](this),this[_0x2ebd98(0x233)]+=this[_0x2ebd98(0x29f)]||0x0;},Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x219)]=function(){const _0x983110=_0x47f037;if(!this['isAtbCastingState']())return;if(!this[_0x983110(0x338)]())return;if(!this[_0x983110(0x338)]()['item']())return;if(this[_0x983110(0x338)]()['item']()[_0x983110(0x3b6)][_0x983110(0x36f)](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this['clearActions'](),this[_0x983110(0x2a5)](),this[_0x983110(0x2b0)]=0x0,this[_0x983110(0x364)]();},Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x364)]=function(){const _0x1b339b=_0x47f037,_0x2f66a1=VisuMZ[_0x1b339b(0x309)][_0x1b339b(0x40d)][_0x1b339b(0x39c)];if(Imported[_0x1b339b(0x349)]){const _0x256afb=_0x2f66a1['InterruptAnimationID'],_0x9e7c7d=_0x2f66a1[_0x1b339b(0x363)],_0x2021c5=_0x2f66a1[_0x1b339b(0x3e9)];$gameTemp[_0x1b339b(0x32f)]([this],_0x256afb,_0x9e7c7d,_0x2021c5);}if(this[_0x1b339b(0x217)]()&&_0x2f66a1[_0x1b339b(0x391)]['length']>0x0){const _0x5a77b4=_0x2f66a1[_0x1b339b(0x391)],_0xb7e148={'textColor':ColorManager[_0x1b339b(0x368)](_0x2f66a1[_0x1b339b(0x277)]),'flashColor':_0x2f66a1[_0x1b339b(0x31f)],'flashDuration':_0x2f66a1['InterruptFlashDuration']};this[_0x1b339b(0x406)](_0x5a77b4,_0xb7e148);}},VisuMZ['BattleSystemATB'][_0x47f037(0x274)]=Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x24c)],Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x24c)]=function(){const _0x3a0e04=_0x47f037;VisuMZ['BattleSystemATB'][_0x3a0e04(0x274)][_0x3a0e04(0x1f5)](this),BattleManager[_0x3a0e04(0x2f3)]()&&(this[_0x3a0e04(0x2b0)]>=this['tpbRequiredCastTime']()&&(_0x3a0e04(0x397)===_0x3a0e04(0x3df)?(_0x56fa4d=_0x49c995-0x1,_0x9384b2=_0xe2ab99-0x3-_0x3ea7b0,_0x35992c[_0x3a0e04(0x41a)](0x1,0x1,_0x28dc05,_0x32febf-0x2,_0x2b6851,_0xe28015,![]),_0x24e0a8[_0x3a0e04(0x41a)](0x2+_0x13ddc5,0x1,_0x28cef1,_0xa1b8f-0x2,_0x5278b7,_0x1db957,![])):this['_tpbState']=_0x3a0e04(0x36b)));},VisuMZ[_0x47f037(0x309)][_0x47f037(0x25c)]=Game_Unit['prototype'][_0x47f037(0x407)],Game_Unit[_0x47f037(0x2a9)][_0x47f037(0x407)]=function(){const _0x51cbfa=_0x47f037;if(BattleManager['isATB']()){if(BattleManager['allBattleMembers']()[_0x51cbfa(0x249)](_0x3e9934=>_0x3e9934&&_0x3e9934[_0x51cbfa(0x21c)]()&&_0x3e9934[_0x51cbfa(0x388)]()&&_0x3e9934[_0x51cbfa(0x321)]===_0x51cbfa(0x36b)))return;}VisuMZ[_0x51cbfa(0x309)]['Game_Unit_updateTpb'][_0x51cbfa(0x1f5)](this);},VisuMZ['BattleSystemATB'][_0x47f037(0x279)]=Game_Battler[_0x47f037(0x2a9)]['onRestrict'],Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x20b)]=function(){const _0x214773=_0x47f037;!VisuMZ[_0x214773(0x309)][_0x214773(0x40d)][_0x214773(0x32d)][_0x214773(0x2b3)]&&(this['_onRestrictBypassAtbReset']=BattleManager[_0x214773(0x2f3)]()),VisuMZ['BattleSystemATB']['Game_Battler_onRestrict'][_0x214773(0x1f5)](this),this['_onRestrictBypassAtbReset']=undefined;},VisuMZ[_0x47f037(0x309)][_0x47f037(0x29e)]=Game_Actor['prototype'][_0x47f037(0x2f6)],Game_Actor[_0x47f037(0x2a9)][_0x47f037(0x2f6)]=function(){const _0x6d889f=_0x47f037;if(this['_onRestrictBypassAtbReset']){if(!this[_0x6d889f(0x258)]())return;}VisuMZ[_0x6d889f(0x309)][_0x6d889f(0x29e)][_0x6d889f(0x1f5)](this);},VisuMZ[_0x47f037(0x309)][_0x47f037(0x2c8)]=Game_Battler[_0x47f037(0x2a9)]['removeState'],Game_Battler['prototype'][_0x47f037(0x353)]=function(_0x4e7ccc){const _0x31732e=_0x47f037,_0x4f4f1e=!this['canMove']()&&BattleManager[_0x31732e(0x37a)]();VisuMZ[_0x31732e(0x309)][_0x31732e(0x2c8)][_0x31732e(0x1f5)](this,_0x4e7ccc);if(this[_0x31732e(0x30f)]())this[_0x31732e(0x3b3)](_0x31732e(0x3bf));else _0x4f4f1e&&this[_0x31732e(0x308)]()&&this[_0x31732e(0x296)]()<=0x0&&(this[_0x31732e(0x30a)](),this[_0x31732e(0x321)]=_0x31732e(0x342),this['_onRestrictBypassAtbReset']=undefined);},Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x202)]=function(){const _0x1813d4=_0x47f037;this[_0x1813d4(0x287)]=![],this[_0x1813d4(0x378)]++,this[_0x1813d4(0x35a)]=0x0,this[_0x1813d4(0x337)]()&&this[_0x1813d4(0x415)]();},Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x337)]=function(){const _0x50eda2=_0x47f037;if(this[_0x50eda2(0x296)]()!==0x0)return![];if(BattleManager[_0x50eda2(0x2f3)]()){if('rByBQ'==='rByBQ'){if(this['isEnemy']()){if(_0x50eda2(0x416)===_0x50eda2(0x395))return _0x451d9b['battleMembers']()[this[_0x50eda2(0x301)]];else{if(!this[_0x50eda2(0x333)]())return![];}}}else _0xd2fcac=this['subject']()[_0x50eda2(0x233)];}return!![];},VisuMZ[_0x47f037(0x309)][_0x47f037(0x3bb)]=Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x411)],Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x411)]=function(){const _0x48f512=_0x47f037;BattleManager[_0x48f512(0x2f3)]()?_0x48f512(0x360)!=='uEWBl'?(this[_0x48f512(0x38f)]=new _0x5aa486(),this[_0x48f512(0x40a)](this[_0x48f512(0x38f)]),this[_0x48f512(0x3d4)]()):this[_0x48f512(0x3a4)]():VisuMZ['BattleSystemATB'][_0x48f512(0x3bb)][_0x48f512(0x1f5)](this);},Game_Battler['prototype']['applyATBPenalty']=function(){const _0x27a791=_0x47f037;this['_tpbState']=_0x27a791(0x342),this[_0x27a791(0x233)]+=VisuMZ['BattleSystemATB'][_0x27a791(0x40d)]['Mechanics'][_0x27a791(0x291)]||0x0;},VisuMZ['BattleSystemATB'][_0x47f037(0x365)]=Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x2ce)],Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x2ce)]=function(){const _0x498963=_0x47f037;if(BattleManager['isATB']())return VisuMZ[_0x498963(0x309)][_0x498963(0x40d)][_0x498963(0x32d)]['TpbSpeedCalcJS'][_0x498963(0x1f5)](this,this);else{if(_0x498963(0x37c)!==_0x498963(0x37c))_0x37c77c=_0x29460c['max'](_0x41b829,_0x26e4b1);else return VisuMZ[_0x498963(0x309)][_0x498963(0x365)][_0x498963(0x1f5)](this);}},VisuMZ['BattleSystemATB'][_0x47f037(0x3ca)]=Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x2ea)],Game_Battler['prototype'][_0x47f037(0x2ea)]=function(){const _0xeecd5c=_0x47f037;return BattleManager[_0xeecd5c(0x2f3)]()?VisuMZ['BattleSystemATB'][_0xeecd5c(0x40d)][_0xeecd5c(0x32d)][_0xeecd5c(0x259)][_0xeecd5c(0x1f5)](this,this):VisuMZ[_0xeecd5c(0x309)]['Game_Battler_tpbBaseSpeed'][_0xeecd5c(0x1f5)](this);},VisuMZ['BattleSystemATB'][_0x47f037(0x2e3)]=Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x228)],Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x228)]=function(){const _0x21eb6e=_0x47f037;if(BattleManager[_0x21eb6e(0x2f3)]()){if(_0x21eb6e(0x268)===_0x21eb6e(0x405)){const _0x9c1aec=this[_0x21eb6e(0x217)]();if(!_0x9c1aec)return;if(!_0x9c1aec['isEnemy']())return;if(this[_0x21eb6e(0x366)]===_0x9c1aec[_0x21eb6e(0x39a)]())return;this[_0x21eb6e(0x366)]=_0x9c1aec[_0x21eb6e(0x39a)]();if(_0x9c1aec['hasSvBattler']())this[_0x21eb6e(0x366)]=0x0;this[_0x21eb6e(0x37e)][_0x21eb6e(0x2cc)](this[_0x21eb6e(0x366)]);}else return VisuMZ['BattleSystemATB'][_0x21eb6e(0x40d)][_0x21eb6e(0x32d)]['BattlerRelativeSpeedJS'][_0x21eb6e(0x1f5)](this,this);}else return VisuMZ[_0x21eb6e(0x309)][_0x21eb6e(0x2e3)][_0x21eb6e(0x1f5)](this);},VisuMZ[_0x47f037(0x309)]['Game_Battler_tpbAcceleration']=Game_Battler['prototype']['tpbAcceleration'],Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x357)]=function(){const _0x397dca=_0x47f037;if(BattleManager[_0x397dca(0x2f3)]()){if(_0x397dca(0x37d)!==_0x397dca(0x2aa))return this[_0x397dca(0x393)]();else{if(!_0x39d78e[_0x397dca(0x2f3)]())return;if(!_0x17888a['Settings'][_0x397dca(0x31a)])return;if(!_0x4715ae[_0x397dca(0x3ed)])return;this[_0x397dca(0x29d)]=new _0x5a1b2b(new _0x375a7d(0x0,0x0,0x0,0x0));const _0x197141=this[_0x397dca(0x245)](this['_windowLayer']);this[_0x397dca(0x400)](this[_0x397dca(0x29d)],_0x197141);}}else return VisuMZ[_0x397dca(0x309)][_0x397dca(0x3af)][_0x397dca(0x1f5)](this);},Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x393)]=function(){const _0x174938=_0x47f037;let _0x4d33ef=VisuMZ['BattleSystemATB'][_0x174938(0x40d)][_0x174938(0x32d)][_0x174938(0x3fd)]['call'](this,this);if(ConfigManager&&ConfigManager[_0x174938(0x3a9)]!==undefined){const _0x4894bf=ConfigManager[_0x174938(0x3a9)]-0x3;if(_0x4894bf>0x0)return _0x4d33ef*(_0x4894bf*0x2);else{if(_0x4894bf<0x0){if(_0x174938(0x221)===_0x174938(0x221))return _0x4d33ef*(0x1/(_0x4894bf*-0x2));else _0x4aebde=_0xfa9c2*_0x8c6323;}}}return _0x4d33ef;},VisuMZ[_0x47f037(0x309)]['Game_Battler_tpbRequiredCastTime']=Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x2ad)],Game_Battler[_0x47f037(0x2a9)][_0x47f037(0x2ad)]=function(){const _0x2ae608=_0x47f037;return BattleManager['isATB']()?'unYNj'!=='DNMQX'?VisuMZ[_0x2ae608(0x309)]['Settings'][_0x2ae608(0x32d)][_0x2ae608(0x2a6)]['call'](this,this):(this[_0x2ae608(0x34c)]===_0x52910a&&this[_0x2ae608(0x23c)](),this[_0x2ae608(0x34c)]):VisuMZ[_0x2ae608(0x309)]['Game_Battler_tpbRequiredCastTime'][_0x2ae608(0x1f5)](this);},VisuMZ[_0x47f037(0x309)][_0x47f037(0x40c)]=Scene_Options[_0x47f037(0x2a9)][_0x47f037(0x392)],Scene_Options[_0x47f037(0x2a9)][_0x47f037(0x392)]=function(){const _0x66084f=_0x47f037;let _0x484213=VisuMZ[_0x66084f(0x309)][_0x66084f(0x40c)][_0x66084f(0x1f5)](this);const _0xfe1535=VisuMZ[_0x66084f(0x309)][_0x66084f(0x40d)];if(_0xfe1535[_0x66084f(0x371)][_0x66084f(0x384)]&&_0xfe1535[_0x66084f(0x371)]['AdjustRect']&&BattleManager['isATB']())_0x484213++;return _0x484213;},Sprite_Battler[_0x47f037(0x2a9)]['createAtbGaugeSprite']=function(){const _0x493db1=_0x47f037;if(!BattleManager[_0x493db1(0x2f3)]())return;if(!ConfigManager[_0x493db1(0x3ed)])return;const _0x250e96=VisuMZ[_0x493db1(0x309)][_0x493db1(0x40d)][_0x493db1(0x2b8)],_0xfb1858=new Sprite_Gauge();_0xfb1858[_0x493db1(0x33d)]['x']=_0x250e96[_0x493db1(0x3c3)],_0xfb1858['anchor']['y']=_0x250e96['AnchorY'],_0xfb1858[_0x493db1(0x34a)]['x']=_0xfb1858[_0x493db1(0x34a)]['y']=_0x250e96['Scale'],this[_0x493db1(0x2ab)]=_0xfb1858,this[_0x493db1(0x40a)](this['_atbGaugeSprite']);},VisuMZ[_0x47f037(0x309)][_0x47f037(0x241)]=Sprite_Battler['prototype'][_0x47f037(0x2d7)],Sprite_Battler[_0x47f037(0x2a9)][_0x47f037(0x2d7)]=function(_0xf5c22c){const _0x55bdfa=_0x47f037;VisuMZ[_0x55bdfa(0x309)][_0x55bdfa(0x241)][_0x55bdfa(0x1f5)](this,_0xf5c22c),this['setupAtbGaugeSprite'](_0xf5c22c),this[_0x55bdfa(0x386)]();},Sprite_Battler[_0x47f037(0x2a9)][_0x47f037(0x255)]=function(_0x40f4a0){const _0x24b3dd=_0x47f037;if(!_0x40f4a0)return;if(!this[_0x24b3dd(0x2ab)])return;if(_0x40f4a0[_0x24b3dd(0x23f)]()){}else{if(_0x40f4a0[_0x24b3dd(0x30f)]()){if(_0x24b3dd(0x3b0)!==_0x24b3dd(0x343)){if(this[_0x24b3dd(0x328)]===Sprite_Enemy&&_0x40f4a0[_0x24b3dd(0x340)]())return;if(this[_0x24b3dd(0x328)]===Sprite_SvEnemy&&!_0x40f4a0['hasSvBattler']())return;}else return this[_0x24b3dd(0x239)]();}}this[_0x24b3dd(0x2ab)][_0x24b3dd(0x23b)](_0x40f4a0,_0x24b3dd(0x414));},Sprite_Battler[_0x47f037(0x2a9)][_0x47f037(0x386)]=function(){const _0x34e5a8=_0x47f037;if(!this[_0x34e5a8(0x2ab)])return;const _0x133b12=this[_0x34e5a8(0x257)]&&this[_0x34e5a8(0x257)][_0x34e5a8(0x388)]()&&!this[_0x34e5a8(0x257)][_0x34e5a8(0x375)]();this[_0x34e5a8(0x2ab)][_0x34e5a8(0x3ce)]=_0x133b12,this[_0x34e5a8(0x2d2)]&&this['_svBattlerSprite'][_0x34e5a8(0x2ab)]&&(this[_0x34e5a8(0x2d2)][_0x34e5a8(0x2ab)]['visible']=_0x133b12);},VisuMZ['BattleSystemATB'][_0x47f037(0x40e)]=Sprite_Battler[_0x47f037(0x2a9)][_0x47f037(0x346)],Sprite_Battler[_0x47f037(0x2a9)][_0x47f037(0x346)]=function(){const _0x598c64=_0x47f037;VisuMZ[_0x598c64(0x309)][_0x598c64(0x40e)][_0x598c64(0x1f5)](this),this['updateAtbGaugeSpritePosition']();},Sprite_Battler['prototype'][_0x47f037(0x2a0)]=function(){const _0x69ebaf=_0x47f037;if(!this[_0x69ebaf(0x257)])return;if(!this[_0x69ebaf(0x2ab)])return;const _0x1a44dd=VisuMZ['BattleSystemATB'][_0x69ebaf(0x40d)][_0x69ebaf(0x2b8)],_0x39b95e=this['_atbGaugeSprite'];let _0x4b7249=_0x1a44dd[_0x69ebaf(0x273)];if(this[_0x69ebaf(0x257)][_0x69ebaf(0x31b)]){if('rPTjN'===_0x69ebaf(0x3b5))_0x4b7249+=this['_battler']['battleUIOffsetX']();else{const _0x418a3e=[_0x69ebaf(0x3e1),_0x69ebaf(0x35f),_0x69ebaf(0x212)];for(const _0xf66089 of _0x418a3e){_0x554a7b[_0x69ebaf(0x309)][_0x69ebaf(0x200)](_0x41dbdd,_0xf66089);}}}let _0x1ff1d5=_0x1a44dd[_0x69ebaf(0x2b7)];this[_0x69ebaf(0x257)][_0x69ebaf(0x354)]&&(_0x1ff1d5+=this[_0x69ebaf(0x257)][_0x69ebaf(0x354)]());_0x39b95e['x']=_0x4b7249,_0x39b95e['y']=-this['height']+_0x1ff1d5;this['_battler'][_0x69ebaf(0x30f)]()&&(this[_0x69ebaf(0x257)][_0x69ebaf(0x387)]()[_0x69ebaf(0x3b6)]['match'](/<HIDE (?:ATB|TPB) GAUGE>/i)&&(_0x39b95e[_0x69ebaf(0x3ce)]=![]));if(this[_0x69ebaf(0x37f)]()){if(_0x69ebaf(0x22a)!==_0x69ebaf(0x24d))_0x39b95e['y']+=_0x39b95e[_0x69ebaf(0x298)]()*_0x1a44dd[_0x69ebaf(0x205)]-0x1;else{if(!this[_0x69ebaf(0x257)])return _0x310d74['atbColor']('default%1'['format'](_0x6684d7));if(this[_0x69ebaf(0x257)][_0x69ebaf(0x31e)]())return _0x23947b[_0x69ebaf(0x3ec)](_0x69ebaf(0x3ab)[_0x69ebaf(0x297)](_0x3270a6));if(this[_0x69ebaf(0x257)]['isAtbCastingState']())return _0xc29b1e['atbColor'](_0x69ebaf(0x22d)['format'](_0x5168fd));if(this[_0x69ebaf(0x2df)]()>=0x1)return _0x34db8d[_0x69ebaf(0x3ec)](_0x69ebaf(0x216)[_0x69ebaf(0x297)](_0x428ab5));const _0xae1406=_0x1d028f['BattleSystemATB']['Settings'][_0x69ebaf(0x2b8)],_0x4a2250=this[_0x69ebaf(0x257)][_0x69ebaf(0x213)](0x6)*this[_0x69ebaf(0x257)][_0x69ebaf(0x3fa)](0x6);if(_0x4a2250<=_0xae1406[_0x69ebaf(0x2e4)])return _0x535a02[_0x69ebaf(0x3ec)]('slow%1'[_0x69ebaf(0x297)](_0x55e666));if(_0x4a2250>=_0xae1406[_0x69ebaf(0x1fe)])return _0x7899dc[_0x69ebaf(0x3ec)](_0x69ebaf(0x1f7)[_0x69ebaf(0x297)](_0x45cd63));return _0x160bbc[_0x69ebaf(0x3ec)](_0x69ebaf(0x3c4)[_0x69ebaf(0x297)](_0x57fe1d));}}if(this[_0x69ebaf(0x34a)]['x']<0x0){if('fMKUL'==='fMKUL')_0x39b95e[_0x69ebaf(0x34a)]['x']=-Math[_0x69ebaf(0x28d)](_0x39b95e['scale']['x']);else return _0x407cdd[_0x69ebaf(0x309)][_0x69ebaf(0x3af)]['call'](this);}},Sprite_Battler[_0x47f037(0x2a9)]['checkAggroControlSystemOffsetYAdjustment']=function(){const _0x2a75a5=_0x47f037;if(!Imported['VisuMZ_2_AggroControlSystem'])return![];if(this[_0x2a75a5(0x257)]&&this[_0x2a75a5(0x257)][_0x2a75a5(0x30f)]())return![];const _0x10a9a0=VisuMZ[_0x2a75a5(0x355)][_0x2a75a5(0x40d)][_0x2a75a5(0x2fc)];if(!_0x10a9a0['VisibleGauge'])return![];if(!ConfigManager['aggroGauge'])return![];const _0x25a204=VisuMZ[_0x2a75a5(0x309)][_0x2a75a5(0x40d)][_0x2a75a5(0x2b8)];return _0x10a9a0[_0x2a75a5(0x205)]===_0x25a204[_0x2a75a5(0x205)]&&_0x10a9a0[_0x2a75a5(0x3c3)]===_0x25a204[_0x2a75a5(0x3c3)]&&_0x10a9a0['AnchorY']===_0x25a204[_0x2a75a5(0x1f6)]&&_0x10a9a0[_0x2a75a5(0x273)]===_0x25a204[_0x2a75a5(0x273)]&&_0x10a9a0['OffsetY']===_0x25a204[_0x2a75a5(0x2b7)]&&!![];},VisuMZ[_0x47f037(0x309)][_0x47f037(0x2d3)]=Sprite_Battler[_0x47f037(0x2a9)][_0x47f037(0x286)],Sprite_Battler[_0x47f037(0x2a9)][_0x47f037(0x286)]=function(){const _0x30671a=_0x47f037;VisuMZ[_0x30671a(0x309)][_0x30671a(0x2d3)][_0x30671a(0x1f5)](this);if(!this[_0x30671a(0x257)]&&this['_atbGaugeSprite']){if(_0x30671a(0x3ac)!=='Zjbel'){this[_0x30671a(0x2ab)][_0x30671a(0x3ce)]=![];if(this['_svBattlerSprite']){if(_0x30671a(0x3b8)!=='BgRYU')this[_0x30671a(0x2d2)]['_atbGaugeSprite'][_0x30671a(0x3ce)]=![];else{const _0x2f199b=_0x507453[_0x30671a(0x40d)],_0x64fd96=_0x2f199b['MarkerSize'];this[_0x30671a(0x37e)][_0x30671a(0x1ff)]=new _0x1b2889(_0x64fd96,_0x64fd96);const _0x4ec388=this[_0x30671a(0x37e)]['bitmap'],_0x518779=this[_0x30671a(0x383)][_0x30671a(0x36f)](/\$/i),_0x343d40=_0x518779?0x1:_0x7c8f[_0x30671a(0x209)],_0xa97255=_0x518779?0x1:_0x459208['svActorVertCells'],_0x308f68=_0x301ab3[_0x30671a(0x3b4)]/_0x343d40,_0x3a83c6=_0x8df200['height']/_0xa97255,_0x2965b8=_0x4a181d[_0x30671a(0x2e9)](0x1,_0x64fd96/_0x308f68,_0x64fd96/_0x3a83c6),_0xb13c30=_0x308f68*_0x2965b8,_0x1d8e9d=_0x3a83c6*_0x2965b8,_0x40ed25=_0x44a8df[_0x30671a(0x3d0)]((_0x64fd96-_0xb13c30)/0x2),_0x2e56c1=_0x7e78c8[_0x30671a(0x3d0)]((_0x64fd96-_0x1d8e9d)/0x2);_0x4ec388[_0x30671a(0x254)](_0x168d23,0x0,0x0,_0x308f68,_0x3a83c6,_0x40ed25,_0x2e56c1,_0xb13c30,_0x1d8e9d);}}}else{const _0x2f7a0c=_0x450b3d(_0x1047a2['$1']),_0x10c279='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x30671a(0x297)](_0x2f7a0c,_0x1c6a1e),_0x55f1b5=_0x2b0570[_0x30671a(0x309)]['createKeyJS'](_0x28080d,_0x296537);_0x2b7768['BattleSystemATB']['JS'][_0x55f1b5]=new _0x1d9707(_0x10c279);}}},VisuMZ[_0x47f037(0x309)][_0x47f037(0x39f)]=Sprite_Actor[_0x47f037(0x2a9)][_0x47f037(0x358)],Sprite_Actor[_0x47f037(0x2a9)][_0x47f037(0x358)]=function(){const _0x1b2ae0=_0x47f037;VisuMZ[_0x1b2ae0(0x309)][_0x1b2ae0(0x39f)][_0x1b2ae0(0x1f5)](this),VisuMZ[_0x1b2ae0(0x309)]['Settings'][_0x1b2ae0(0x2b8)][_0x1b2ae0(0x26a)]&&this[_0x1b2ae0(0x316)]();},VisuMZ['BattleSystemATB'][_0x47f037(0x1f4)]=Sprite_Enemy['prototype'][_0x47f037(0x362)],Sprite_Enemy[_0x47f037(0x2a9)][_0x47f037(0x362)]=function(){const _0x2248d4=_0x47f037;if(VisuMZ['BattleSystemATB'][_0x2248d4(0x40d)][_0x2248d4(0x2b8)][_0x2248d4(0x27c)]){if(_0x2248d4(0x203)!==_0x2248d4(0x299))this[_0x2248d4(0x316)]();else{if(this['isEnemy']()){if(!this[_0x2248d4(0x333)]())return![];}}}VisuMZ[_0x2248d4(0x309)][_0x2248d4(0x1f4)]['call'](this);},VisuMZ[_0x47f037(0x309)][_0x47f037(0x26e)]=Sprite_Enemy['prototype'][_0x47f037(0x2f4)],Sprite_Enemy['prototype'][_0x47f037(0x2f4)]=function(_0x27024e){const _0x33c56d=_0x47f037;VisuMZ['BattleSystemATB'][_0x33c56d(0x26e)][_0x33c56d(0x1f5)](this,_0x27024e),(_0x27024e===_0x33c56d(0x2c4)||'disappear')&&this['updateAtbGaugeSpriteVisibility']();},VisuMZ[_0x47f037(0x309)][_0x47f037(0x376)]=Game_BattlerBase[_0x47f037(0x2a9)][_0x47f037(0x2c4)],Game_BattlerBase[_0x47f037(0x2a9)][_0x47f037(0x2c4)]=function(){const _0xcbb5be=_0x47f037;VisuMZ[_0xcbb5be(0x309)][_0xcbb5be(0x376)][_0xcbb5be(0x1f5)](this),this[_0xcbb5be(0x30f)]()&&BattleManager[_0xcbb5be(0x2f3)]()&&this[_0xcbb5be(0x217)]()&&(this[_0xcbb5be(0x217)]()[_0xcbb5be(0x2a2)]=!![],this[_0xcbb5be(0x217)]()[_0xcbb5be(0x386)]());},VisuMZ[_0x47f037(0x309)][_0x47f037(0x3e3)]=Sprite_Gauge['prototype'][_0x47f037(0x27b)],Sprite_Gauge[_0x47f037(0x2a9)][_0x47f037(0x27b)]=function(){const _0x15dbff=_0x47f037;if(this[_0x15dbff(0x2e5)]===_0x15dbff(0x414))return this[_0x15dbff(0x23e)](0x1);return VisuMZ[_0x15dbff(0x309)][_0x15dbff(0x3e3)][_0x15dbff(0x1f5)](this);},VisuMZ[_0x47f037(0x309)][_0x47f037(0x2c9)]=Sprite_Gauge['prototype'][_0x47f037(0x2bb)],Sprite_Gauge[_0x47f037(0x2a9)][_0x47f037(0x2bb)]=function(){const _0x4466ae=_0x47f037;if(this[_0x4466ae(0x2e5)]==='time')return this[_0x4466ae(0x23e)](0x2);return VisuMZ[_0x4466ae(0x309)][_0x4466ae(0x2c9)]['call'](this);},Sprite_Gauge[_0x47f037(0x2a9)][_0x47f037(0x23e)]=function(_0x48e8d1){const _0x1e85fa=_0x47f037;if(!this['_battler'])return ColorManager[_0x1e85fa(0x3ec)](_0x1e85fa(0x3c4)[_0x1e85fa(0x297)](_0x48e8d1));if(this[_0x1e85fa(0x257)]['atbStopped']())return ColorManager['atbColor'](_0x1e85fa(0x3ab)['format'](_0x48e8d1));if(this[_0x1e85fa(0x257)][_0x1e85fa(0x258)]())return ColorManager['atbColor'](_0x1e85fa(0x22d)[_0x1e85fa(0x297)](_0x48e8d1));if(this[_0x1e85fa(0x2df)]()>=0x1)return ColorManager[_0x1e85fa(0x3ec)](_0x1e85fa(0x216)[_0x1e85fa(0x297)](_0x48e8d1));const _0x53451f=VisuMZ[_0x1e85fa(0x309)][_0x1e85fa(0x40d)][_0x1e85fa(0x2b8)],_0x27db4f=this['_battler'][_0x1e85fa(0x213)](0x6)*this['_battler'][_0x1e85fa(0x3fa)](0x6);if(_0x27db4f<=_0x53451f[_0x1e85fa(0x2e4)])return ColorManager[_0x1e85fa(0x3ec)](_0x1e85fa(0x398)[_0x1e85fa(0x297)](_0x48e8d1));if(_0x27db4f>=_0x53451f[_0x1e85fa(0x1fe)])return ColorManager[_0x1e85fa(0x3ec)](_0x1e85fa(0x1f7)[_0x1e85fa(0x297)](_0x48e8d1));return ColorManager[_0x1e85fa(0x3ec)](_0x1e85fa(0x3c4)[_0x1e85fa(0x297)](_0x48e8d1));},VisuMZ['BattleSystemATB'][_0x47f037(0x20f)]=Sprite_Gauge['prototype'][_0x47f037(0x2ba)],Sprite_Gauge[_0x47f037(0x2a9)][_0x47f037(0x2ba)]=function(){const _0x4e68f7=_0x47f037;if(this[_0x4e68f7(0x257)]&&this[_0x4e68f7(0x2e5)]===_0x4e68f7(0x414))return this[_0x4e68f7(0x324)]();return VisuMZ[_0x4e68f7(0x309)][_0x4e68f7(0x20f)][_0x4e68f7(0x1f5)](this);},Sprite_Gauge['prototype'][_0x47f037(0x324)]=function(){const _0xabf71b=_0x47f037;return this['_battler'][_0xabf71b(0x258)]()?Math[_0xabf71b(0x30d)](this[_0xabf71b(0x257)][_0xabf71b(0x2b0)],0x0):VisuMZ['BattleSystemATB'][_0xabf71b(0x20f)][_0xabf71b(0x1f5)](this);},VisuMZ[_0x47f037(0x309)][_0x47f037(0x3a7)]=Sprite_Gauge[_0x47f037(0x2a9)][_0x47f037(0x2ff)],Sprite_Gauge[_0x47f037(0x2a9)][_0x47f037(0x2ff)]=function(){const _0x52049e=_0x47f037;if(this['_battler']&&this[_0x52049e(0x2e5)]===_0x52049e(0x414))return this[_0x52049e(0x2eb)]();return VisuMZ[_0x52049e(0x309)][_0x52049e(0x3a7)][_0x52049e(0x1f5)](this);},Sprite_Gauge[_0x47f037(0x2a9)]['atbCurrentMaxValue']=function(){const _0x5176a1=_0x47f037;if(this[_0x5176a1(0x257)][_0x5176a1(0x258)]()){if(_0x5176a1(0x3f7)!==_0x5176a1(0x3f7)){const _0x593447=_0x3de7e3[_0x5176a1(0x3a9)]-0x3;if(_0x593447>0x0)return _0x45203f*(_0x593447*0x2);else{if(_0x593447<0x0)return _0xd3c6f6*(0x1/(_0x593447*-0x2));}}else return Math[_0x5176a1(0x30d)](this[_0x5176a1(0x257)][_0x5176a1(0x2ad)](),0x1);}else return VisuMZ[_0x5176a1(0x309)][_0x5176a1(0x3a7)][_0x5176a1(0x1f5)](this);},VisuMZ[_0x47f037(0x309)]['Window_Help_setItem']=Window_Help[_0x47f037(0x2a9)][_0x47f037(0x32e)],Window_Help['prototype'][_0x47f037(0x32e)]=function(_0x51ca3b){const _0x2ccd07=_0x47f037;BattleManager['isATB']()&&_0x51ca3b&&_0x51ca3b[_0x2ccd07(0x3b6)]&&_0x51ca3b[_0x2ccd07(0x3b6)][_0x2ccd07(0x36f)](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)?'PcLLL'!==_0x2ccd07(0x3a6)?this[_0x2ccd07(0x32a)](String(RegExp['$1'])):this[_0x2ccd07(0x306)]=_0x2f945e['isATB']():VisuMZ[_0x2ccd07(0x309)]['Window_Help_setItem']['call'](this,_0x51ca3b);},VisuMZ[_0x47f037(0x309)][_0x47f037(0x3d7)]=Window_StatusBase[_0x47f037(0x2a9)]['placeGauge'],Window_StatusBase[_0x47f037(0x2a9)][_0x47f037(0x2f7)]=function(_0x29d27a,_0x2da379,_0x218038,_0x593ebc){const _0x188681=_0x47f037;if(!this[_0x188681(0x251)](_0x2da379))return;VisuMZ[_0x188681(0x309)]['Window_StatusBase_placeGauge'][_0x188681(0x1f5)](this,_0x29d27a,_0x2da379,_0x218038,_0x593ebc);},Window_StatusBase[_0x47f037(0x2a9)][_0x47f037(0x251)]=function(_0x188a60){const _0x4ce6b2=_0x47f037;if(_0x188a60!==_0x4ce6b2(0x414))return!![];if(![_0x4ce6b2(0x2fe),'Window_SideviewUiBattleStatus'][_0x4ce6b2(0x312)](this[_0x4ce6b2(0x328)][_0x4ce6b2(0x26b)]))return![];if(!BattleManager[_0x4ce6b2(0x2f3)]())return![];if(!ConfigManager['visualAtbGauge'])return![];return VisuMZ[_0x4ce6b2(0x309)][_0x4ce6b2(0x40d)][_0x4ce6b2(0x2b8)]['ShowStatusGauge'];},VisuMZ['BattleSystemATB'][_0x47f037(0x3ef)]=Window_Options['prototype'][_0x47f037(0x263)],Window_Options[_0x47f037(0x2a9)]['addGeneralOptions']=function(){const _0x42ae82=_0x47f037;VisuMZ['BattleSystemATB'][_0x42ae82(0x3ef)][_0x42ae82(0x1f5)](this),this[_0x42ae82(0x2d1)]();},Window_Options[_0x47f037(0x2a9)]['addBattleSystemATBCommands']=function(){const _0x3e0c8b=_0x47f037;if(!BattleManager[_0x3e0c8b(0x2f3)]())return;VisuMZ[_0x3e0c8b(0x309)][_0x3e0c8b(0x40d)][_0x3e0c8b(0x371)]['AddOption']&&this[_0x3e0c8b(0x2e7)]();},Window_Options[_0x47f037(0x2a9)][_0x47f037(0x2e7)]=function(){const _0x41480f=_0x47f037,_0x10292b=TextManager[_0x41480f(0x3ed)],_0x4273a1='visualAtbGauge';this[_0x41480f(0x2cb)](_0x10292b,_0x4273a1);},Game_BattlerBase[_0x47f037(0x2a9)][_0x47f037(0x399)]=function(){const _0x4c3bbc=_0x47f037;delete this['_fieldAtbGaugeGraphicType'],delete this['_fieldAtbGaugeFaceName'],delete this['_fieldAtbGaugeFaceIndex'],delete this[_0x4c3bbc(0x2f1)];},Game_BattlerBase[_0x47f037(0x2a9)]['fieldAtbGraphicType']=function(){const _0x5109e8=_0x47f037;return this['_fieldAtbGaugeGraphicType']===undefined&&(this[_0x5109e8(0x394)]=this['createFieldAtbGraphicType']()),this[_0x5109e8(0x394)];},Game_BattlerBase[_0x47f037(0x2a9)][_0x47f037(0x271)]=function(){const _0x356151=_0x47f037;return Sprite_FieldGaugeATB['Settings'][_0x356151(0x34b)];},Game_BattlerBase['prototype'][_0x47f037(0x289)]=function(){const _0x197d17=_0x47f037;return this[_0x197d17(0x272)]===undefined&&(this[_0x197d17(0x272)]=this[_0x197d17(0x34e)]()),this[_0x197d17(0x272)];},Game_BattlerBase['prototype'][_0x47f037(0x34e)]=function(){const _0x3be198=_0x47f037;return Sprite_FieldGaugeATB[_0x3be198(0x40d)][_0x3be198(0x3ee)];},Game_BattlerBase[_0x47f037(0x2a9)][_0x47f037(0x3d3)]=function(){const _0x510a9d=_0x47f037;return this['_fieldAtbGaugeFaceIndex']===undefined&&(this[_0x510a9d(0x25a)]=this['createFieldAtbGraphicFaceIndex']()),this['_fieldAtbGaugeFaceIndex'];},Game_BattlerBase[_0x47f037(0x2a9)]['createFieldAtbGraphicFaceIndex']=function(){return Sprite_FieldGaugeATB['Settings']['EnemyBattlerFaceIndex'];},Game_BattlerBase[_0x47f037(0x2a9)][_0x47f037(0x2ef)]=function(){const _0x5a303e=_0x47f037;return this[_0x5a303e(0x2f1)]===undefined&&(this[_0x5a303e(0x2f1)]=this['createFieldAtbGraphicIconIndex']()),this[_0x5a303e(0x2f1)];},Game_BattlerBase['prototype']['createFieldAtbGraphicIconIndex']=function(){const _0x37625c=_0x47f037;return Sprite_FieldGaugeATB[_0x37625c(0x40d)][_0x37625c(0x2dc)];},Game_BattlerBase[_0x47f037(0x2a9)]['setAtbGraphicIconIndex']=function(_0xe70000){this['_fieldAtbGaugeIconIndex']=_0xe70000;},Game_Actor[_0x47f037(0x2a9)][_0x47f037(0x271)]=function(){const _0x2f3b42=_0x47f037,_0x49c7fc=this[_0x2f3b42(0x327)]()[_0x2f3b42(0x3b6)];if(_0x49c7fc[_0x2f3b42(0x36f)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x2f3b42(0x1fb)===_0x2f3b42(0x1fb)?_0x2f3b42(0x250):_0x473f00(_0x43952a['$1']);else{if(_0x49c7fc[_0x2f3b42(0x36f)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return'icon';}return Sprite_FieldGaugeATB[_0x2f3b42(0x40d)][_0x2f3b42(0x3f0)];},Game_Actor[_0x47f037(0x2a9)][_0x47f037(0x34e)]=function(){const _0x4cc56=_0x47f037,_0x51145f=this[_0x4cc56(0x327)]()['note'];if(_0x51145f[_0x4cc56(0x36f)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this['faceName']();},Game_Actor[_0x47f037(0x2a9)][_0x47f037(0x2a1)]=function(){const _0x55e0af=_0x47f037,_0x1df8a0=this[_0x55e0af(0x327)]()[_0x55e0af(0x3b6)];if(_0x1df8a0[_0x55e0af(0x36f)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x55e0af(0x417)!=='kyJGB'){const _0x5e999c=_0x5d0ec4[_0x55e0af(0x3d6)],_0x4a805f=_0xdf2b8a['InterruptMirror'],_0x5c3ec0=_0x38b54f[_0x55e0af(0x3e9)];_0x5a4a46[_0x55e0af(0x32f)]([this],_0x5e999c,_0x4a805f,_0x5c3ec0);}else return Number(RegExp['$2']);}return this[_0x55e0af(0x374)]();},Game_Actor[_0x47f037(0x2a9)][_0x47f037(0x3cd)]=function(){const _0x55c5cf=_0x47f037,_0x4b4ddc=this['actor']()[_0x55c5cf(0x3b6)];if(_0x4b4ddc['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x55c5cf(0x40d)]['ActorBattlerIcon'];},Game_Enemy[_0x47f037(0x2a9)][_0x47f037(0x271)]=function(){const _0x536ccc=_0x47f037,_0x5e7be1=this[_0x536ccc(0x387)]()[_0x536ccc(0x3b6)];if(_0x5e7be1['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x536ccc(0x250);else{if(_0x5e7be1['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return'icon';}return Sprite_FieldGaugeATB[_0x536ccc(0x40d)][_0x536ccc(0x34b)];},Game_Enemy[_0x47f037(0x2a9)]['createFieldAtbGraphicFaceName']=function(){const _0x31b438=_0x47f037,_0x38f96d=this[_0x31b438(0x387)]()[_0x31b438(0x3b6)];if(_0x38f96d[_0x31b438(0x36f)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Sprite_FieldGaugeATB[_0x31b438(0x40d)]['EnemyBattlerFaceName'];},Game_Enemy[_0x47f037(0x2a9)][_0x47f037(0x2a1)]=function(){const _0x39ee0d=_0x47f037,_0x2bfa47=this[_0x39ee0d(0x387)]()[_0x39ee0d(0x3b6)];if(_0x2bfa47[_0x39ee0d(0x36f)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Sprite_FieldGaugeATB[_0x39ee0d(0x40d)]['EnemyBattlerFaceIndex'];},Game_Enemy['prototype'][_0x47f037(0x3cd)]=function(){const _0xafebff=_0x47f037,_0x2fd955=this['enemy']()[_0xafebff(0x3b6)];if(_0x2fd955[_0xafebff(0x36f)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0xafebff(0x2f8)!==_0xafebff(0x262)?Number(RegExp['$1']):_0x55ddf2[_0xafebff(0x40d)][_0xafebff(0x3fc)];return Sprite_FieldGaugeATB[_0xafebff(0x40d)][_0xafebff(0x2dc)];},VisuMZ[_0x47f037(0x309)]['Scene_Battle_createAllWindows']=Scene_Battle[_0x47f037(0x2a9)][_0x47f037(0x323)],Scene_Battle[_0x47f037(0x2a9)][_0x47f037(0x323)]=function(){const _0x321d08=_0x47f037;this['createFieldGaugeContainerATB'](),VisuMZ[_0x321d08(0x309)][_0x321d08(0x3e8)][_0x321d08(0x1f5)](this),this[_0x321d08(0x3a8)]();},Scene_Battle[_0x47f037(0x2a9)]['createFieldGaugeContainerATB']=function(){const _0x46170a=_0x47f037;if(!BattleManager['isATB']())return;if(!Sprite_FieldGaugeATB[_0x46170a(0x40d)]['UseFieldGauge'])return;if(!ConfigManager[_0x46170a(0x3ed)])return;this[_0x46170a(0x29d)]=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0x4bfb4a=this[_0x46170a(0x245)](this[_0x46170a(0x3dd)]);this[_0x46170a(0x400)](this[_0x46170a(0x29d)],_0x4bfb4a);},Scene_Battle[_0x47f037(0x2a9)][_0x47f037(0x3a8)]=function(){const _0xfaff88=_0x47f037;if(!BattleManager[_0xfaff88(0x2f3)]())return;if(!Sprite_FieldGaugeATB[_0xfaff88(0x40d)][_0xfaff88(0x31a)])return;if(!ConfigManager['visualAtbGauge'])return;this[_0xfaff88(0x32c)]=new Sprite_FieldGaugeATB(),this[_0xfaff88(0x29d)][_0xfaff88(0x40a)](this['_fieldGaugeATB']);};function Sprite_FieldGaugeATB(){const _0x586852=_0x47f037;this[_0x586852(0x2fb)](...arguments);}function _0x4384(){const _0x9215b9=['ccBbS','attackSpeed','Cast','uEWBl','ARRAYSTRUCT','createStateIconSprite','InterruptMirror','onAtbInterrupt','Game_Battler_tpbSpeed','_graphicHue','EnemyBattlerFontSize','getColor','createBattlerSprites','%1Side','ready','createGaugeSprite','ShowMarkerArrow','endBattlerActions','match','changeAtbChargeTime','Options','FVRqW','kOGSE','faceIndex','isHidden','Game_BattlerBase_appear','RepositionTopHelpY','_tpbTurnCount','textColor','isTpb','revive','MgqLY','FMSSc','_graphicSprite','checkAggroControlSystemOffsetYAdjustment','subject','(?:GAUGE|TIME|SPEED)','_backgroundSprite','_graphicSv','AddOption','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','updateAtbGaugeSpriteVisibility','enemy','isAppeared','fontFace','ConfigManager_makeData','_skinSprite','createChildren','full','createKeyJS','_gaugeSprite','fontSize','InterruptText','maxCommands','atbAcceleration','_fieldAtbGaugeGraphicType','TgFtZ','Scene_Boot_onDatabaseLoaded','atDWt','slow%1','clearFieldAtbGraphics','battlerHue','iconHeight','Interrupt','Enemy','top','Sprite_Actor_createStateSprite','1569922jaXVGJ','Game_BattlerBase_die','setupBattleSystemATBColors','umCKY','applyATBPenalty','lfksi','gXlJn','Sprite_Gauge_currentMaxValue','createFieldGaugeSpriteATB','atbSpeed','setHomeLocation','stop%1','aKGDr','AuVkY','2570421HtwavF','Game_Battler_tpbAcceleration','INGTA','epyEo','DWhbr','setActionState','width','rPTjN','note','clamp','gmWZQ','changeSvActorGraphicBitmap','Game_Action_applyItemUserEffect','Game_Battler_applyTpbPenalty','boxWidth','Actor','IconIndex','undecided','%1SystemBorder','slow','dormk','AnchorX','default%1','parse','applyData','STRUCT','applyBattleSystemATBUserEffect','iLYoM','Game_Battler_tpbBaseSpeed','item','ARRAYFUNC','createFieldAtbGraphicIconIndex','visible','%1BgColor1','round','4671960tekOxf','children','fieldAtbGraphicFaceIndex','createGaugeBitmap','createEnemySprites','InterruptAnimationID','Window_StatusBase_placeGauge','drawGaugeBitmap','ctGaugeColor1','DaQDe','createBattlerSprite','#000000','_windowLayer','iconWidth','yoOIS','wFTZA','Charge','loadWindowskin','Sprite_Gauge_gaugeColor1','BattleManager_endBattlerActions','ConfigManager_applyData','SystemFieldGaugeVisibility','createGraphicSprite','Scene_Battle_createAllWindows','InterruptMute','JSON','_homeX','atbColor','visualAtbGauge','EnemyBattlerFaceName','Window_Options_addGeneralOptions','ActorBattlerType','DuuTZ','return\x200','targetPositionOnGauge','loadSystem','iDkDb','clear','JjNDv','nHjiH','_graphicFaceIndex','paramBuffRate','updateSelectionEffect','EnemyBattlerFaceIndex','TpbAccelerationJS','vWXez','faceWidth','addChildAt','DisplayOffsetX','_graphicFaceName','loadFace','Parse_Notetags_CreateJS','YlMTd','setupTextPopup','updateTpb','IconSet','_battlerContainer','addChild','juuKz','Scene_Options_maxCommands','Settings','Sprite_Battler_updateMain','BfCEJ','Window_Help_setItem','applyTpbPenalty','ARRAYNUM','atbActive','time','makeTpbActions','UHPdQ','kyJGB','traitObjects','DrawGauge','gradientFillRect','ESKOG','version','Sprite_Enemy_createStateIconSprite','call','AnchorY','fast%1','MxJec','FaceName','applyItemBattleSystemATBUserEffect','RoPLJ','_letter','lZkEX','FastRate','bitmap','createJS','cytCa','startTpbTurn','axRRq','battlerName','Scale','Weapon-%1-%2','loadSvActor','QaJel','svActorHorzCells','createLetterSprite','onRestrict','bottom','setBlendColor','opacity','Sprite_Gauge_currentValue','targetOpacity','VisuMZ_1_BattleCore','After','paramRate','ParseSkillNotetags','onDatabaseLoaded','full%1','battler','compareBattlerSprites','atbInterrupt','svActorVertCells','DisplayPosition','isAlive','setBattleSystemATBFieldGaugeVisible','FclHc','process_VisuMZ_BattleSystemATB_JS_Notetags','getStateTooltipBattler','dugjC','faceHeight','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','wEAjt','battleMembers','loadEnemy','_graphicIconIndex','tpbRelativeSpeed','Actors','sintj','isGaugeHorizontal','_helpWindow','cast%1','hDxAs','updateLetter','fillRect','wLplO','Game_Action_applyGlobal','_tpbChargeTime','createArrowSprite','FieldGaugeEnemyFace','Visible','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','%1BgColor2','processUpdateGraphic','Class-%1-%2','setup','initBattleSystemATB','right','atbGaugeColor','isActor','VisuMZ_2_BattleSystemCTB','Sprite_Battler_setBattler','parameters','makeData','stop','getChildIndex','sort','map','_scene','some','setupArrowSprite','(?:ATB|TPB)','startTpbCasting','QDezx','exit','GaugeLengthHorz','face','showVisualAtbGauge','_forcing','3162812wpdbkR','blt','setupAtbGaugeSprite','XwSls','_battler','isAtbCastingState','TpbBaseSpeedCalcJS','_fieldAtbGaugeFaceIndex','RegExp','Game_Unit_updateTpb','Enemies','isSideView','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','gjhOB','Color','wxGTt','addGeneralOptions','applyItemUserEffect','TEOtS','ceil','_unit','uoOid','_horz','ShowActorGauge','name','Game_Battler_clearTpbChargeTime','FaceIndex','Sprite_Enemy_startEffect','setAtbAfterSpeed','Game_System_initialize','createFieldAtbGraphicType','_fieldAtbGaugeFaceName','OffsetX','Game_Battler_startTpbCasting','trim','9KbzhrO','InterruptTextColor','lFrMM','Game_Battler_onRestrict','OpacityRate','gaugeColor1','ShowEnemyGauge','filter','DisplayOffsetY','cast2','changeEnemyGraphicBitmap','applyGlobalBattleSystemATBEffects','ARRAYSTR','concat','isCTB','yJAvE','update','_tpbTurnEnd','removeChild','fieldAtbGraphicFaceName','makeDeepCopy','_homeY','fieldAtbGraphicType','abs','speed','description','Name','EscapeFailPenalty','Fjabm','_arrowSprite','ConvertParams','RepositionTopForHelp','numActions','format','gaugeHeight','XhtdL','FieldGaugeActorFace','TElXi','nDjdU','_fieldGaugeATB_Container','Game_Actor_clearActions','_atbAfterSpeed','updateAtbGaugeSpritePosition','createFieldAtbGraphicFaceIndex','_fnord','setAtbCastTime','_blendColor','clearTpbChargeTime','TpbCastTimeJS','updateBattleContainerOrder','ykuyV','prototype','hraJY','_atbGaugeSprite','BattleCore','tpbRequiredCastTime','updateGraphic','ColorManager_loadWindowskin','_tpbCastTime','ParseAllNotetags','qGCxC','StunsResetGauge','clearRect','721580rcIUAC','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','OffsetY','Gauge','3wjoHyL','currentValue','gaugeColor2','loadSvEnemy','tpbChargeTime','getAtbCastTimeRate','FieldGaugeActorIcon','ParseItemNotetags','updatePositionOnGauge','svBattlerName','_letterSprite','appear','updateVisibility','MarkerSize','updatePosition','Game_Battler_removeState','Sprite_Gauge_gaugeColor2','updateGraphicHue','addCommand','setHue','process_VisuMZ_BattleSystemATB_CreateRegExp','tpbSpeed','isAtbChargingState','fouxn','addBattleSystemATBCommands','_svBattlerSprite','Sprite_Battler_update','casting','GaugeSplit','Enemy-%1-%2','setBattler','hxiVf','applyGlobal','FieldGauge','toUpperCase','EnemyBattlerIcon','maxBattleMembers','toLowerCase','gaugeRate','cast1','GaugeDirection','changeFaceGraphicBitmap','Game_Battler_tpbRelativeSpeed','SlowRate','_statusType','hIIlA','addBattleSystemATBShowGaugeCommand','status','min','tpbBaseSpeed','atbCurrentMaxValue','bgkKH','registerCommand','XGaiy','fieldAtbGraphicIconIndex','%1SystemBg','_fieldAtbGaugeIconIndex','FUNC','isATB','startEffect','svactor','clearActions','placeGauge','ipHWU','EnemyBattlerDrawLetter','BorderThickness','initialize','Aggro','EnemyBattlerFontFace','Window_BattleStatus','currentMaxValue','%1BorderColor','_index','createFieldGaugeSkin','_windowskin','addLoadListener','ShowMarkerBorder','_onRestrictBypassAtbReset','length','canMove','BattleSystemATB','makeActions','fast','createActorSprites','max','setAtbChargeTime','isEnemy','_plural','GaugeThick','includes','create','isActiveTpb','NUM','createAtbGaugeSprite','BattleManager_isActiveTpb','setFrame','ShowMarkerBg','UseFieldGauge','battleUIOffsetX','Armor-%1-%2','isBattleSystemATBFieldGaugeVisible','atbStopped','InterruptFlashColor','Game_BattlerBase_revive','_tpbState','floor','createAllWindows','atbCurrentValue','rVULX','2002490BYLbta','actor','constructor','Skill-%1-%2','setText','ARRAYJSON','_fieldGaugeATB','Mechanics','setItem','requestFauxAnimation','lineHeight','icon','bind','isTpbCharged','members','_graphicType','updatePositionOffset','canMakeTpbActionsAtStartTpbTurn','currentAction','ctGaugeColor2','_statusWindow','10078680VfPqES','boxHeight','anchor','isSceneBattle','createBorderSprite','hasSvBattler','initMembers','charging','XRNkG','changeIconGraphicBitmap','InterruptFlashDuration','updateMain','height','left','VisuMZ_0_CoreEngine','scale','EnemyBattlerType','_atbFieldGaugeVisible','_graphicEnemy','createFieldAtbGraphicFaceName','_atbColors','updateOpacity','State-%1-%2','die','removeState','battleUIOffsetY','AggroControlSystem','#%1','tpbAcceleration','createStateSprite','Item-%1-%2','_tpbIdleTime','_subject','changeAtbCastTime'];_0x4384=function(){return _0x9215b9;};return _0x4384();}Sprite_FieldGaugeATB[_0x47f037(0x2a9)]=Object[_0x47f037(0x313)](Sprite[_0x47f037(0x2a9)]),Sprite_FieldGaugeATB['prototype'][_0x47f037(0x328)]=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB[_0x47f037(0x40d)]=JsonEx[_0x47f037(0x28a)](VisuMZ[_0x47f037(0x309)][_0x47f037(0x40d)][_0x47f037(0x2da)]),Sprite_FieldGaugeATB[_0x47f037(0x2a9)][_0x47f037(0x2fb)]=function(){const _0x30ba54=_0x47f037;Sprite[_0x30ba54(0x2a9)]['initialize']['call'](this),this[_0x30ba54(0x341)](),this[_0x30ba54(0x3aa)](),this[_0x30ba54(0x38c)]();},Sprite_FieldGaugeATB[_0x47f037(0x2a9)]['initMembers']=function(){const _0x4f121e=_0x47f037;this[_0x4f121e(0x33d)]['x']=0.5,this['anchor']['y']=0.5;},Sprite_FieldGaugeATB[_0x47f037(0x2a9)][_0x47f037(0x22b)]=function(){const _0x15cbc2=_0x47f037;if(this[_0x15cbc2(0x269)]!==undefined)return this[_0x15cbc2(0x269)];const _0x48e853=Sprite_FieldGaugeATB['Settings'][_0x15cbc2(0x21b)];return this['_horz']=[_0x15cbc2(0x39e),'bottom'][_0x15cbc2(0x312)](_0x48e853),this['_horz'];},Sprite_FieldGaugeATB[_0x47f037(0x2a9)][_0x47f037(0x3aa)]=function(){const _0x20de78=_0x47f037,_0x2e61c1=Sprite_FieldGaugeATB[_0x20de78(0x40d)][_0x20de78(0x21b)][_0x20de78(0x2de)]()[_0x20de78(0x275)](),_0x5844da=Window_Base[_0x20de78(0x2a9)][_0x20de78(0x330)](),_0x1ca6fe=SceneManager[_0x20de78(0x248)][_0x20de78(0x33a)][_0x20de78(0x347)]+Math[_0x20de78(0x3d0)](_0x5844da*0.5);this['_homeX']=0x0,this['_homeY']=0x0;switch(_0x2e61c1){case _0x20de78(0x39e):this['_homeX']=Math['round'](Graphics[_0x20de78(0x3bc)]*0.5),this['_homeY']=0x60;break;case _0x20de78(0x20c):this[_0x20de78(0x3eb)]=Math[_0x20de78(0x3d0)](Graphics['boxWidth']*0.5),this[_0x20de78(0x28b)]=Graphics['boxHeight']-_0x1ca6fe;break;case _0x20de78(0x348):this['_homeX']=0x50,this[_0x20de78(0x28b)]=Math[_0x20de78(0x3d0)]((Graphics[_0x20de78(0x33c)]-_0x1ca6fe)/0x2);break;case _0x20de78(0x23d):this[_0x20de78(0x3eb)]=Graphics[_0x20de78(0x3bc)]-0x50,this[_0x20de78(0x28b)]=Math[_0x20de78(0x3d0)]((Graphics[_0x20de78(0x33c)]-_0x1ca6fe)/0x2);break;}this['_homeX']+=Sprite_FieldGaugeATB[_0x20de78(0x40d)][_0x20de78(0x401)]||0x0,this['_homeY']+=Sprite_FieldGaugeATB[_0x20de78(0x40d)][_0x20de78(0x27e)]||0x0,this['x']=this[_0x20de78(0x3eb)],this['y']=this[_0x20de78(0x28b)];},Sprite_FieldGaugeATB['prototype']['createChildren']=function(){const _0x1730d3=_0x47f037;this[_0x1730d3(0x302)](),this['createGaugeSprite'](),this['createBattlerContainer']();},Sprite_FieldGaugeATB[_0x47f037(0x2a9)]['createFieldGaugeSkin']=function(){const _0x29c056=_0x47f037;this['_skinSprite']=new Sprite(),this['_skinSprite']['anchor']['x']=0.5,this[_0x29c056(0x38b)][_0x29c056(0x33d)]['y']=0.5,this['addChild'](this[_0x29c056(0x38b)]);const _0x36c996=Sprite_FieldGaugeATB['Settings']['GaugeSystemSkin'];if(_0x36c996)this[_0x29c056(0x38b)][_0x29c056(0x1ff)]=ImageManager[_0x29c056(0x3f4)](_0x36c996);},Sprite_FieldGaugeATB[_0x47f037(0x2a9)][_0x47f037(0x36c)]=function(){const _0x83cb17=_0x47f037;this[_0x83cb17(0x38f)]=new Sprite(),this[_0x83cb17(0x40a)](this[_0x83cb17(0x38f)]),this[_0x83cb17(0x3d4)]();},Sprite_FieldGaugeATB['prototype']['createGaugeBitmap']=function(){const _0x527087=_0x47f037,_0x5d48b2=Sprite_FieldGaugeATB[_0x527087(0x40d)],_0x362b57=this[_0x527087(0x22b)](),_0xecf954=_0x362b57?_0x5d48b2[_0x527087(0x24f)]:_0x5d48b2[_0x527087(0x311)],_0x83cd4e=_0x362b57?_0x5d48b2['GaugeThick']:_0x5d48b2['GaugeLengthVert'];this['_gaugeSprite'][_0x527087(0x1ff)]=new Bitmap(_0xecf954,_0x83cd4e),this['drawGaugeBitmap'](),this[_0x527087(0x38f)]['x']=Math['ceil'](_0xecf954/-0x2),this[_0x527087(0x38f)]['y']=Math[_0x527087(0x266)](_0x83cd4e/-0x2);},Sprite_FieldGaugeATB[_0x47f037(0x2a9)][_0x47f037(0x3d8)]=function(){const _0x17d336=_0x47f037;if(!Sprite_FieldGaugeATB['Settings'][_0x17d336(0x419)])return;const _0x2bf08e=Sprite_FieldGaugeATB[_0x17d336(0x40d)],_0x1c345c=this[_0x17d336(0x38f)][_0x17d336(0x1ff)],_0x2ac8f7=_0x1c345c['width'],_0x35077a=_0x1c345c['height'],_0xdd82c9=ColorManager['gaugeBackColor'](),_0x45eff4=ColorManager[_0x17d336(0x3d9)](),_0x524f41=ColorManager[_0x17d336(0x339)](),_0x29042e=ColorManager['atbColor'](_0x17d336(0x2e0)),_0x13ef6f=ColorManager['atbColor'](_0x17d336(0x27f)),_0x3ff5e6=this[_0x17d336(0x22b)](),_0x2f291b=_0x2bf08e[_0x17d336(0x2e1)],_0xecc014=_0x2bf08e[_0x17d336(0x2d5)][_0x17d336(0x3b7)](0x0,0x1),_0x417ba4=Math['ceil'](((_0x3ff5e6?_0x2ac8f7:_0x35077a)-0x2)*_0xecc014);_0x1c345c[_0x17d336(0x230)](0x0,0x0,_0x2ac8f7,_0x35077a,_0xdd82c9);let _0x1e2ccc=0x0,_0x44560d=0x0,_0x47d245=0x0,_0x29e580=0x0;if(_0x3ff5e6&&_0x2f291b){if(_0x17d336(0x3f1)!=='Vhhwy')_0x1e2ccc=_0x417ba4-0x1,_0x47d245=_0x2ac8f7-0x3-_0x1e2ccc,_0x1c345c[_0x17d336(0x41a)](0x1,0x1,_0x1e2ccc,_0x35077a-0x2,_0x45eff4,_0x524f41,![]),_0x1c345c[_0x17d336(0x41a)](0x2+_0x1e2ccc,0x1,_0x47d245,_0x35077a-0x2,_0x29042e,_0x13ef6f,![]);else{const _0x1627e7=new _0x33ec7d();_0x1627e7[_0x17d336(0x33d)]['x']=this['anchor']['x'],_0x1627e7[_0x17d336(0x33d)]['y']=this[_0x17d336(0x33d)]['y'],this['_graphicSprite']=_0x1627e7,this[_0x17d336(0x40a)](this[_0x17d336(0x37e)]),this[_0x17d336(0x239)]();}}else{if(_0x3ff5e6&&!_0x2f291b)_0x1e2ccc=_0x417ba4-0x1,_0x47d245=_0x2ac8f7-0x3-_0x1e2ccc,_0x1c345c[_0x17d336(0x41a)](0x2+_0x47d245,0x1,_0x1e2ccc,_0x35077a-0x2,_0x45eff4,_0x524f41,![]),_0x1c345c[_0x17d336(0x41a)](0x1,0x1,_0x47d245,_0x35077a-0x2,_0x29042e,_0x13ef6f,![]);else{if(!_0x3ff5e6&&_0x2f291b)_0x17d336(0x1f2)!==_0x17d336(0x208)?(_0x44560d=_0x417ba4-0x1,_0x29e580=_0x35077a-0x3-_0x44560d,_0x1c345c['gradientFillRect'](0x1,0x1,_0x2ac8f7-0x2,_0x44560d,_0x45eff4,_0x524f41,!![]),_0x1c345c['gradientFillRect'](0x1,0x2+_0x44560d,_0x2ac8f7-0x2,_0x29e580,_0x29042e,_0x13ef6f,!![])):(_0x5ef8d2['BattleSystemATB'][_0x17d336(0x241)][_0x17d336(0x1f5)](this,_0x27eb6b),this[_0x17d336(0x255)](_0x4d46f7),this[_0x17d336(0x386)]());else{if(!_0x3ff5e6&&!_0x2f291b){if(_0x17d336(0x278)!=='lFrMM')return _0x14d66b[_0x17d336(0x2f3)]()?_0x431057[_0x17d336(0x309)]['Settings']['Mechanics'][_0x17d336(0x259)][_0x17d336(0x1f5)](this,this):_0x4099d9[_0x17d336(0x309)][_0x17d336(0x3ca)][_0x17d336(0x1f5)](this);else _0x44560d=_0x417ba4-0x1,_0x29e580=_0x35077a-0x3-_0x44560d,_0x1c345c[_0x17d336(0x41a)](0x1,0x2+_0x29e580,_0x2ac8f7-0x2,_0x44560d,_0x45eff4,_0x524f41,!![]),_0x1c345c[_0x17d336(0x41a)](0x1,0x1,_0x2ac8f7-0x2,_0x29e580,_0x29042e,_0x13ef6f,!![]);}}}}},Sprite_FieldGaugeATB[_0x47f037(0x2a9)]['createBattlerContainer']=function(){const _0x13b8f4=_0x47f037;this['_battlerContainer']&&this[_0x13b8f4(0x38f)][_0x13b8f4(0x288)](this[_0x13b8f4(0x409)]),this[_0x13b8f4(0x409)]=new Sprite(),this[_0x13b8f4(0x38f)][_0x13b8f4(0x40a)](this[_0x13b8f4(0x409)]),this[_0x13b8f4(0x369)]();},Sprite_FieldGaugeATB[_0x47f037(0x2a9)][_0x47f037(0x369)]=function(){const _0x370986=_0x47f037;this[_0x370986(0x3d5)](),this['createActorSprites']();},Sprite_FieldGaugeATB[_0x47f037(0x2a9)][_0x47f037(0x3d5)]=function(){const _0x1f07ea=_0x47f037,_0x435898=$gameTroop[_0x1f07ea(0x334)](),_0x513bc5=_0x435898[_0x1f07ea(0x307)];for(let _0x441e10=0x0;_0x441e10<_0x513bc5;_0x441e10++){this[_0x1f07ea(0x3db)](_0x441e10,$gameTroop);}},Sprite_FieldGaugeATB['prototype'][_0x47f037(0x30c)]=function(){const _0x2a5358=_0x47f037,_0x15699c=$gameParty[_0x2a5358(0x2dd)]();for(let _0x41529c=0x0;_0x41529c<_0x15699c;_0x41529c++){'XGaiy'===_0x2a5358(0x2ee)?this[_0x2a5358(0x3db)](_0x41529c,$gameParty):_0x3eb925+=this['_battler'][_0x2a5358(0x354)]();}},Sprite_FieldGaugeATB[_0x47f037(0x2a9)][_0x47f037(0x3db)]=function(_0x251047,_0x4d13f0){const _0x4abdcf=_0x47f037,_0x562592=new Sprite_FieldMarkerATB(_0x251047,_0x4d13f0,this['_gaugeSprite']);this[_0x4abdcf(0x409)][_0x4abdcf(0x40a)](_0x562592);},Sprite_FieldGaugeATB[_0x47f037(0x2a9)][_0x47f037(0x286)]=function(){const _0x3de8ad=_0x47f037;Sprite[_0x3de8ad(0x2a9)][_0x3de8ad(0x286)][_0x3de8ad(0x1f5)](this),this[_0x3de8ad(0x2c7)](),this[_0x3de8ad(0x2a7)](),this[_0x3de8ad(0x2c5)]();},Sprite_FieldGaugeATB[_0x47f037(0x2a9)][_0x47f037(0x2c7)]=function(){const _0x516876=_0x47f037,_0x4fbad5=Sprite_FieldGaugeATB[_0x516876(0x40d)];if(_0x4fbad5[_0x516876(0x21b)]!=='top')return;if(!_0x4fbad5[_0x516876(0x295)])return;const _0x227601=SceneManager[_0x516876(0x248)][_0x516876(0x22c)];if(!_0x227601)return;_0x227601[_0x516876(0x3ce)]?(this['x']=this[_0x516876(0x3eb)]+(_0x4fbad5['RepositionTopHelpX']||0x0),this['y']=this[_0x516876(0x28b)]+(_0x4fbad5[_0x516876(0x377)]||0x0)):(this['x']=this[_0x516876(0x3eb)],this['y']=this[_0x516876(0x28b)]);const _0x2ea224=SceneManager['_scene']['_windowLayer'];this['x']+=_0x2ea224['x'],this['y']+=_0x2ea224['y'];},Sprite_FieldGaugeATB[_0x47f037(0x2a9)][_0x47f037(0x2a7)]=function(){const _0x386157=_0x47f037;if(!this['_battlerContainer'])return;const _0x3689e9=this['_battlerContainer'][_0x386157(0x3d2)];if(!_0x3689e9)return;_0x3689e9[_0x386157(0x246)](this[_0x386157(0x218)][_0x386157(0x332)](this));},Sprite_FieldGaugeATB[_0x47f037(0x2a9)][_0x47f037(0x218)]=function(_0x514dbd,_0x4ded1c){const _0x48510f=_0x47f037,_0x3b8050=this[_0x48510f(0x22b)](),_0x1b90d9=Sprite_FieldGaugeATB['Settings'][_0x48510f(0x2e1)];if(_0x3b8050&&_0x1b90d9)return _0x514dbd['x']-_0x4ded1c['x'];else{if(_0x3b8050&&!_0x1b90d9)return _0x4ded1c['x']-_0x514dbd['x'];else{if(!_0x3b8050&&_0x1b90d9)return _0x514dbd['y']-_0x4ded1c['y'];else{if(!_0x3b8050&&!_0x1b90d9)return _0x48510f(0x1f8)===_0x48510f(0x1f8)?_0x4ded1c['y']-_0x514dbd['y']:_0x363a6e['isATB']()?_0xb87126[_0x48510f(0x309)][_0x48510f(0x40d)]['Mechanics']['BattlerRelativeSpeedJS']['call'](this,this):_0x24b7fe[_0x48510f(0x309)][_0x48510f(0x2e3)][_0x48510f(0x1f5)](this);}}}},Sprite_FieldGaugeATB[_0x47f037(0x2a9)][_0x47f037(0x2c5)]=function(){const _0x18774b=_0x47f037;this['visible']=$gameSystem[_0x18774b(0x31d)]();};function Sprite_FieldMarkerATB(){this['initialize'](...arguments);}Sprite_FieldMarkerATB[_0x47f037(0x2a9)]=Object[_0x47f037(0x313)](Sprite_Clickable[_0x47f037(0x2a9)]),Sprite_FieldMarkerATB[_0x47f037(0x2a9)][_0x47f037(0x328)]=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB['prototype'][_0x47f037(0x2fb)]=function(_0x2a94f8,_0x5abe43,_0xfc9fec){const _0x3d85d7=_0x47f037;this[_0x3d85d7(0x301)]=_0x2a94f8,this[_0x3d85d7(0x267)]=_0x5abe43,this[_0x3d85d7(0x38f)]=_0xfc9fec,Sprite_Clickable['prototype'][_0x3d85d7(0x2fb)]['call'](this),this[_0x3d85d7(0x341)](),this[_0x3d85d7(0x38c)](),this[_0x3d85d7(0x20e)]=this['targetOpacity']();},Sprite_FieldMarkerATB['prototype'][_0x47f037(0x341)]=function(){const _0x5a7b36=_0x47f037;this[_0x5a7b36(0x33d)]['x']=0.5,this[_0x5a7b36(0x33d)]['y']=0.5;},Sprite_FieldMarkerATB[_0x47f037(0x2a9)]['createChildren']=function(){const _0x8c88=_0x47f037;this['createBackgroundSprite'](),this['createGraphicSprite'](),this['createBorderSprite'](),this[_0x8c88(0x20a)](),this[_0x8c88(0x234)](),this['updatePositionOnGauge'](!![]);},Sprite_FieldMarkerATB[_0x47f037(0x2a9)]['createBackgroundSprite']=function(){const _0x15e292=_0x47f037;if(!Sprite_FieldGaugeATB['Settings'][_0x15e292(0x319)])return;const _0x42d5a1=Sprite_FieldGaugeATB['Settings'],_0x2fdea1=this['_unit']===$gameParty?_0x15e292(0x3bd):'Enemy',_0x329742=_0x15e292(0x2f0)[_0x15e292(0x297)](_0x2fdea1),_0x39fb7b=new Sprite();_0x39fb7b['anchor']['x']=this['anchor']['x'],_0x39fb7b[_0x15e292(0x33d)]['y']=this['anchor']['y'];if(_0x42d5a1[_0x329742])_0x39fb7b['bitmap']=ImageManager[_0x15e292(0x3f4)](_0x42d5a1[_0x329742]);else{if(_0x15e292(0x3b2)!==_0x15e292(0x3b2))return _0x547529['atbActive'];else{const _0x59f4c5=_0x42d5a1[_0x15e292(0x2c6)];_0x39fb7b[_0x15e292(0x1ff)]=new Bitmap(_0x59f4c5,_0x59f4c5);const _0x263978=ColorManager[_0x15e292(0x368)](_0x42d5a1[_0x15e292(0x3cf)[_0x15e292(0x297)](_0x2fdea1)]),_0x2cbaa1=ColorManager[_0x15e292(0x368)](_0x42d5a1[_0x15e292(0x238)[_0x15e292(0x297)](_0x2fdea1)]);_0x39fb7b[_0x15e292(0x1ff)][_0x15e292(0x41a)](0x0,0x0,_0x59f4c5,_0x59f4c5,_0x263978,_0x2cbaa1,!![]);}}this[_0x15e292(0x382)]=_0x39fb7b,this[_0x15e292(0x40a)](this['_backgroundSprite']),this[_0x15e292(0x3b4)]=this[_0x15e292(0x382)][_0x15e292(0x3b4)],this[_0x15e292(0x347)]=this[_0x15e292(0x382)][_0x15e292(0x347)];},Sprite_FieldMarkerATB[_0x47f037(0x2a9)][_0x47f037(0x3e7)]=function(){const _0x551b86=_0x47f037,_0x14826e=new Sprite();_0x14826e[_0x551b86(0x33d)]['x']=this[_0x551b86(0x33d)]['x'],_0x14826e['anchor']['y']=this[_0x551b86(0x33d)]['y'],this['_graphicSprite']=_0x14826e,this[_0x551b86(0x40a)](this['_graphicSprite']),this[_0x551b86(0x239)]();},Sprite_FieldMarkerATB[_0x47f037(0x2a9)][_0x47f037(0x33f)]=function(){const _0x3cc002=_0x47f037;if(!Sprite_FieldGaugeATB[_0x3cc002(0x40d)][_0x3cc002(0x305)])return;const _0x4ef67b=Sprite_FieldGaugeATB['Settings'],_0x930b1b=this[_0x3cc002(0x267)]===$gameParty?_0x3cc002(0x3bd):_0x3cc002(0x39d),_0xc40a22=_0x3cc002(0x3c0)[_0x3cc002(0x297)](_0x930b1b),_0x186891=new Sprite();_0x186891[_0x3cc002(0x33d)]['x']=this['anchor']['x'],_0x186891['anchor']['y']=this[_0x3cc002(0x33d)]['y'];if(_0x4ef67b[_0xc40a22])_0x186891[_0x3cc002(0x1ff)]=ImageManager[_0x3cc002(0x3f4)](_0x4ef67b[_0xc40a22]);else{let _0x213934=_0x4ef67b[_0x3cc002(0x2c6)],_0x11a346=_0x4ef67b[_0x3cc002(0x2fa)];_0x186891[_0x3cc002(0x1ff)]=new Bitmap(_0x213934,_0x213934);const _0x49f79d=_0x3cc002(0x3dc),_0x4752d3=ColorManager[_0x3cc002(0x368)](_0x4ef67b[_0x3cc002(0x300)[_0x3cc002(0x297)](_0x930b1b)]);_0x186891[_0x3cc002(0x1ff)][_0x3cc002(0x230)](0x0,0x0,_0x213934,_0x213934,_0x49f79d),_0x213934-=0x2,_0x186891[_0x3cc002(0x1ff)][_0x3cc002(0x230)](0x1,0x1,_0x213934,_0x213934,_0x4752d3),_0x213934-=_0x11a346*0x2,_0x186891[_0x3cc002(0x1ff)]['fillRect'](0x1+_0x11a346,0x1+_0x11a346,_0x213934,_0x213934,_0x49f79d),_0x213934-=0x2,_0x11a346+=0x1,_0x186891[_0x3cc002(0x1ff)][_0x3cc002(0x2b4)](0x1+_0x11a346,0x1+_0x11a346,_0x213934,_0x213934);}this['_backgroundSprite']=_0x186891,this[_0x3cc002(0x40a)](this['_backgroundSprite']);},Sprite_FieldMarkerATB['prototype'][_0x47f037(0x20a)]=function(){const _0x389c0f=_0x47f037,_0x217bf3=Sprite_FieldGaugeATB['Settings'];if(!_0x217bf3[_0x389c0f(0x2f9)])return;if(this[_0x389c0f(0x267)]===$gameParty)return;const _0x4a8a2d=_0x217bf3[_0x389c0f(0x2c6)],_0x56437a=new Sprite();_0x56437a[_0x389c0f(0x33d)]['x']=this[_0x389c0f(0x33d)]['x'],_0x56437a[_0x389c0f(0x33d)]['y']=this[_0x389c0f(0x33d)]['y'],_0x56437a[_0x389c0f(0x1ff)]=new Bitmap(_0x4a8a2d,_0x4a8a2d),this[_0x389c0f(0x2c3)]=_0x56437a,this[_0x389c0f(0x40a)](this[_0x389c0f(0x2c3)]);},Sprite_FieldMarkerATB[_0x47f037(0x2a9)][_0x47f037(0x234)]=function(){const _0x2e1239=_0x47f037,_0x3918d5=Sprite_FieldGaugeATB[_0x2e1239(0x40d)];if(!_0x3918d5[_0x2e1239(0x36d)])return;const _0xab30e6=new Sprite();_0xab30e6['anchor']['x']=this['anchor']['x'],_0xab30e6[_0x2e1239(0x33d)]['y']=this[_0x2e1239(0x33d)]['y'],this[_0x2e1239(0x24a)](_0xab30e6),this[_0x2e1239(0x293)]=_0xab30e6,this['addChild'](this[_0x2e1239(0x293)]);},Sprite_FieldMarkerATB['prototype']['setupArrowSprite']=function(_0x341c51){const _0x1e2879=_0x47f037,_0x57b8b1=Sprite_FieldGaugeATB[_0x1e2879(0x40d)],_0x36f77f=_0x57b8b1[_0x1e2879(0x2c6)],_0x50dbbd=Math[_0x1e2879(0x3d0)](_0x36f77f/0x2),_0x3032=this['isGaugeHorizontal'](),_0x2d64a1=this[_0x1e2879(0x267)]===$gameParty?'Actor':_0x1e2879(0x39d),_0x5cd8c3=_0x57b8b1[_0x1e2879(0x36a)[_0x1e2879(0x297)](_0x2d64a1)];_0x341c51[_0x1e2879(0x1ff)]=ImageManager[_0x1e2879(0x3f4)](_0x57b8b1['MarkerArrowWindowSkin']);const _0x1d6d08=0x18,_0x23b68c=_0x1d6d08/0x2,_0x1d4b68=0x60+_0x1d6d08,_0x1f1959=0x0+_0x1d6d08;if(_0x3032&&_0x5cd8c3)_0x341c51[_0x1e2879(0x318)](_0x1d4b68+_0x23b68c,_0x1f1959+_0x23b68c+_0x1d6d08,_0x1d6d08,_0x23b68c),_0x341c51['y']+=_0x50dbbd,_0x341c51[_0x1e2879(0x33d)]['y']=0x0;else{if(_0x3032&&!_0x5cd8c3){if(_0x1e2879(0x3da)===_0x1e2879(0x3da))_0x341c51[_0x1e2879(0x318)](_0x1d4b68+_0x23b68c,_0x1f1959,_0x1d6d08,_0x23b68c),_0x341c51['y']-=_0x50dbbd,_0x341c51['anchor']['y']=0x1;else{const _0x372259=_0xacc1f6(_0xbae1cc['$1']);_0x372259<_0x399477?(_0x438871(_0x1e2879(0x25f)[_0x1e2879(0x297)](_0xd7080b,_0x372259,_0x2538c8)),_0x4bd3eb['exit']()):_0x1d505e=_0xf01629[_0x1e2879(0x30d)](_0x372259,_0x579e9c);}}else{if(!_0x3032&&_0x5cd8c3){if(_0x1e2879(0x3a5)===_0x1e2879(0x3a5))_0x341c51['setFrame'](_0x1d4b68,_0x1f1959+_0x23b68c,_0x23b68c,_0x1d6d08),_0x341c51['x']-=Math[_0x1e2879(0x266)](_0x50dbbd*1.75),_0x341c51[_0x1e2879(0x33d)]['x']=0x0;else return this['processUpdateGraphic']();}else!_0x3032&&!_0x5cd8c3&&(_0x341c51[_0x1e2879(0x318)](_0x1d4b68+_0x1d6d08+_0x23b68c,_0x1f1959+_0x23b68c,_0x23b68c,_0x1d6d08),_0x341c51['x']+=Math[_0x1e2879(0x266)](_0x50dbbd*1.75),_0x341c51[_0x1e2879(0x33d)]['x']=0x1);}}},Sprite_FieldMarkerATB['prototype']['battler']=function(){const _0x4420c4=_0x47f037;if(this['_unit']===$gameParty){if(_0x4420c4(0x260)==='gjhOB')return $gameParty[_0x4420c4(0x225)]()[this[_0x4420c4(0x301)]];else{const _0x2ba8b5=_0x3d02e4['BattleSystemATB'][_0x4420c4(0x40d)][_0x4420c4(0x39c)];if(_0x4885b8[_0x4420c4(0x349)]){const _0x6561da=_0x2ba8b5[_0x4420c4(0x3d6)],_0x3ceb64=_0x2ba8b5[_0x4420c4(0x363)],_0x340145=_0x2ba8b5[_0x4420c4(0x3e9)];_0x29b0f1[_0x4420c4(0x32f)]([this],_0x6561da,_0x3ceb64,_0x340145);}if(this[_0x4420c4(0x217)]()&&_0x2ba8b5[_0x4420c4(0x391)][_0x4420c4(0x307)]>0x0){const _0x7a8f5b=_0x2ba8b5[_0x4420c4(0x391)],_0x876d2c={'textColor':_0x5923a6[_0x4420c4(0x368)](_0x2ba8b5[_0x4420c4(0x277)]),'flashColor':_0x2ba8b5[_0x4420c4(0x31f)],'flashDuration':_0x2ba8b5[_0x4420c4(0x345)]};this[_0x4420c4(0x406)](_0x7a8f5b,_0x876d2c);}}}else{if('IYsVi'===_0x4420c4(0x22e)){const _0x1e090c=_0x3abd8b['BattleCore'][_0x4420c4(0x25b)],_0x4f2475=_0x4420c4(0x223),_0xe6127f=[_0x4420c4(0x3e1),'Cast',_0x4420c4(0x212)];for(const _0x3025dd of _0xe6127f){const _0x590ea5=_0x4f2475[_0x4420c4(0x297)](_0x3025dd[_0x4420c4(0x2db)]()['trim'](),_0x4420c4(0x24b),'(?:GAUGE|TIME|SPEED)'),_0x56bdc5=new _0x511c7f(_0x590ea5,'i');_0x48b19e['BattleSystemATB']['RegExp'][_0x3025dd]=_0x56bdc5;}}else return $gameTroop[_0x4420c4(0x334)]()[this[_0x4420c4(0x301)]];}},Sprite_FieldMarkerATB[_0x47f037(0x2a9)]['update']=function(){const _0x384ebb=_0x47f037;Sprite_Clickable[_0x384ebb(0x2a9)][_0x384ebb(0x286)][_0x384ebb(0x1f5)](this),this[_0x384ebb(0x350)](),this[_0x384ebb(0x336)](),this[_0x384ebb(0x2c1)](),this[_0x384ebb(0x2ae)](),this[_0x384ebb(0x2ca)](),this['updateLetter'](),this[_0x384ebb(0x3fb)]();},Sprite_FieldMarkerATB['prototype'][_0x47f037(0x350)]=function(){const _0x42e306=_0x47f037,_0x617c14=this['targetOpacity'](),_0x17a791=Sprite_FieldGaugeATB[_0x42e306(0x40d)][_0x42e306(0x27a)];if(this[_0x42e306(0x20e)]>_0x617c14)this[_0x42e306(0x20e)]=Math['max'](_0x617c14,this[_0x42e306(0x20e)]-_0x17a791);else this[_0x42e306(0x20e)]<_0x617c14&&(this[_0x42e306(0x20e)]=Math['min'](_0x617c14,this[_0x42e306(0x20e)]+_0x17a791));},Sprite_FieldMarkerATB[_0x47f037(0x2a9)][_0x47f037(0x210)]=function(){const _0x4a10ae=_0x47f037,_0x5504d6=this[_0x4a10ae(0x217)]();if(!_0x5504d6)return 0x0;if(_0x5504d6[_0x4a10ae(0x375)]())return 0x0;if(_0x5504d6['isDead']())return 0x0;return 0xff;},Sprite_FieldMarkerATB[_0x47f037(0x2a9)][_0x47f037(0x22b)]=function(){const _0x351c34=_0x47f037;if(this[_0x351c34(0x269)]!==undefined)return this[_0x351c34(0x269)];const _0xd7ae67=Sprite_FieldGaugeATB[_0x351c34(0x40d)][_0x351c34(0x21b)];return this['_horz']=[_0x351c34(0x39e),_0x351c34(0x20c)]['includes'](_0xd7ae67),this[_0x351c34(0x269)];},Sprite_FieldMarkerATB[_0x47f037(0x2a9)]['updatePositionOffset']=function(){const _0x3d371c=_0x47f037,_0x5d14b7=Sprite_FieldGaugeATB[_0x3d371c(0x40d)],_0x972b9f=this[_0x3d371c(0x22b)](),_0x1a6d16=this[_0x3d371c(0x267)]===$gameParty?_0x3d371c(0x3bd):_0x3d371c(0x39d),_0x4c30bb=_0x5d14b7['MarkerOffset'],_0x326be4=_0x5d14b7[_0x3d371c(0x36a)[_0x3d371c(0x297)](_0x1a6d16)];if(_0x972b9f)this['y']=_0x5d14b7[_0x3d371c(0x311)]/0x2,this['y']+=_0x326be4?-_0x4c30bb:_0x4c30bb;else{if(_0x3d371c(0x21e)!==_0x3d371c(0x2ec))this['x']=_0x5d14b7[_0x3d371c(0x311)]/0x2,this['x']+=_0x326be4?_0x4c30bb:-_0x4c30bb;else{if(_0x5bd4e2[_0x3d371c(0x240)]&&this['isCTB']())return![];return this[_0x3d371c(0x37a)]();}}},Sprite_FieldMarkerATB[_0x47f037(0x2a9)][_0x47f037(0x2c1)]=function(_0x338f40){const _0x412519=_0x47f037,_0x306639=this[_0x412519(0x217)]();if(!_0x306639)return;const _0x29293a=Sprite_FieldGaugeATB[_0x412519(0x40d)],_0x317a73=this[_0x412519(0x22b)](),_0x32f767=this[_0x412519(0x3f3)](),_0x1e3eb2=_0x338f40?Infinity:_0x29293a['MarkerSpeed'];if(_0x317a73&&this['x']!==_0x32f767){if(this['x']>_0x32f767)this['x']=Math[_0x412519(0x30d)](_0x32f767,this['x']-_0x1e3eb2);if(this['x']<_0x32f767)this['x']=Math[_0x412519(0x2e9)](_0x32f767,this['x']+_0x1e3eb2);}else{if(!_0x317a73&&this['x']!==_0x32f767){if(_0x412519(0x373)==='kOGSE'){if(this['y']>_0x32f767)this['y']=Math[_0x412519(0x30d)](_0x32f767,this['y']-_0x1e3eb2);if(this['y']<_0x32f767)this['y']=Math['min'](_0x32f767,this['y']+_0x1e3eb2);}else _0x4d9727[_0x412519(0x2f3)]()&&_0x135a38&&_0x56e9f8[_0x412519(0x3b6)]&&_0x36bb02[_0x412519(0x3b6)][_0x412519(0x36f)](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)?this['setText'](_0x520610(_0x90cec0['$1'])):_0x2623fa['BattleSystemATB'][_0x412519(0x410)][_0x412519(0x1f5)](this,_0x46d385);}}},Sprite_FieldMarkerATB['prototype']['targetPositionOnGauge']=function(){const _0x23c921=_0x47f037,_0x48d1cd=Sprite_FieldGaugeATB[_0x23c921(0x40d)],_0x96da68=this[_0x23c921(0x217)](),_0x30706c=this[_0x23c921(0x22b)](),_0x78ba8=this[_0x23c921(0x38f)][_0x23c921(0x1ff)][_0x23c921(0x3b4)],_0x4c897b=this[_0x23c921(0x38f)][_0x23c921(0x1ff)]['height'],_0x3c920c=_0x48d1cd[_0x23c921(0x2d5)]['clamp'](0x0,0x1),_0x599bf9=_0x48d1cd[_0x23c921(0x2e1)];let _0xe2eeef=_0x96da68[_0x23c921(0x2bd)]()*_0x3c920c;_0xe2eeef+=(0x1-_0x3c920c)*_0x96da68['getAtbCastTimeRate']();if(_0x96da68===BattleManager[_0x23c921(0x35b)])_0xe2eeef=0x1;if(!_0x599bf9)_0xe2eeef=0x1-_0xe2eeef;let _0x284c98=0x0;if(_0x30706c)_0x284c98=_0xe2eeef*_0x78ba8;else!_0x30706c&&(_0x23c921(0x3ad)!==_0x23c921(0x3c9)?_0x284c98=_0xe2eeef*_0x4c897b:_0x2ac323['BattleSystemATB'][_0x23c921(0x200)](_0x3918db,_0x2cfc9d));return Math['round'](_0x284c98);},Sprite_FieldMarkerATB['prototype'][_0x47f037(0x2ae)]=function(){const _0x42b6fb=_0x47f037,_0x46bd7f=this[_0x42b6fb(0x217)]();if(!_0x46bd7f)return;const _0x5c8dbb=Sprite_FieldGaugeATB[_0x42b6fb(0x40d)],_0x50b5b7=this['_unit']===$gameParty?_0x42b6fb(0x3bd):_0x42b6fb(0x39d);let _0x54ad8c=_0x46bd7f[_0x42b6fb(0x28c)]();if(_0x46bd7f[_0x42b6fb(0x23f)]()&&_0x54ad8c===_0x42b6fb(0x387))_0x54ad8c=_0x42b6fb(0x250);else _0x46bd7f['isEnemy']()&&_0x54ad8c==='svactor'&&(_0x42b6fb(0x2b2)!==_0x42b6fb(0x2b2)?(_0x312986['prototype'][_0x42b6fb(0x2fb)][_0x42b6fb(0x1f5)](this),this['initMembers'](),this['setHomeLocation'](),this[_0x42b6fb(0x38c)]()):_0x54ad8c=_0x42b6fb(0x387));if(this['_graphicType']!==_0x54ad8c)return this[_0x42b6fb(0x239)]();switch(this[_0x42b6fb(0x335)]){case _0x42b6fb(0x250):if(this['_graphicFaceName']!==_0x46bd7f[_0x42b6fb(0x289)]())return this[_0x42b6fb(0x239)]();if(this[_0x42b6fb(0x3f9)]!==_0x46bd7f[_0x42b6fb(0x3d3)]()){if(_0x42b6fb(0x29c)!==_0x42b6fb(0x2a8))return this[_0x42b6fb(0x239)]();else{const _0x16fd31=_0x4ccbf6[_0x42b6fb(0x40d)],_0x5198ff=_0x16fd31[_0x42b6fb(0x2c6)],_0x277b7d=this[_0x42b6fb(0x3f9)];this[_0x42b6fb(0x37e)]['bitmap']=new _0xd6072e(_0x5198ff,_0x5198ff);const _0x40e259=this[_0x42b6fb(0x37e)][_0x42b6fb(0x1ff)],_0x2d0580=_0x13caae[_0x42b6fb(0x3ff)],_0x1ebe32=_0x393d9b[_0x42b6fb(0x222)],_0x5a83e8=_0x3deb97[_0x42b6fb(0x3ff)],_0x33c3eb=_0x572fe3['faceHeight'],_0x5a2811=_0x277b7d%0x4*_0x2d0580+(_0x2d0580-_0x5a83e8)/0x2,_0x512e0d=_0x2829fc[_0x42b6fb(0x322)](_0x277b7d/0x4)*_0x1ebe32+(_0x1ebe32-_0x33c3eb)/0x2;_0x40e259[_0x42b6fb(0x254)](_0x19c152,_0x5a2811,_0x512e0d,_0x5a83e8,_0x33c3eb,0x0,0x0,_0x5198ff,_0x5198ff);}}break;case _0x42b6fb(0x331):if(this[_0x42b6fb(0x227)]!==_0x46bd7f[_0x42b6fb(0x2ef)]())return this[_0x42b6fb(0x239)]();break;case _0x42b6fb(0x387):if(_0x46bd7f['hasSvBattler']()){if(_0x42b6fb(0x2e6)==='DQyGn')this[_0x42b6fb(0x34d)]=_0x245b66[_0x42b6fb(0x204)](),_0xc0eb18=_0x105ba6[_0x42b6fb(0x2bc)](this[_0x42b6fb(0x34d)]),_0x393734[_0x42b6fb(0x304)](this[_0x42b6fb(0x280)][_0x42b6fb(0x332)](this,_0x4af260));else{if(this[_0x42b6fb(0x383)]!==_0x46bd7f[_0x42b6fb(0x2c2)]())return this[_0x42b6fb(0x239)]();}}else{if(this['_graphicEnemy']!==_0x46bd7f[_0x42b6fb(0x204)]()){if(_0x42b6fb(0x3c2)===_0x42b6fb(0x3e0))_0xeb91fa[_0x42b6fb(0x318)](_0x4df9d7,_0x215a66+_0x249139,_0x10391a,_0xb55ff2),_0x1a8c92['x']-=_0x1cdf48[_0x42b6fb(0x266)](_0xbd0976*1.75),_0xf7f13[_0x42b6fb(0x33d)]['x']=0x0;else return this[_0x42b6fb(0x239)]();}}break;case _0x42b6fb(0x2f5):if(_0x46bd7f[_0x42b6fb(0x23f)]()){if(this[_0x42b6fb(0x383)]!==_0x46bd7f[_0x42b6fb(0x204)]()){if(_0x42b6fb(0x40f)===_0x42b6fb(0x201)){const _0x4061aa=_0x1bf578[_0x42b6fb(0x309)]['JS'][_0x37c339]['call'](this,this[_0x42b6fb(0x380)](),_0x995127);_0x2cd164[_0x42b6fb(0x30e)](_0x4061aa);}else return this[_0x42b6fb(0x239)]();}}else{if(this[_0x42b6fb(0x34d)]!==_0x46bd7f[_0x42b6fb(0x204)]())return this[_0x42b6fb(0x239)]();}break;}},Sprite_FieldMarkerATB['prototype'][_0x47f037(0x239)]=function(){const _0x21c11a=_0x47f037,_0x1fa1e8=this[_0x21c11a(0x217)]();if(!_0x1fa1e8)return;this['_graphicType']=_0x1fa1e8['fieldAtbGraphicType']();if(_0x1fa1e8[_0x21c11a(0x23f)]()&&this[_0x21c11a(0x335)]===_0x21c11a(0x387))this[_0x21c11a(0x335)]=_0x21c11a(0x250);else _0x1fa1e8[_0x21c11a(0x30f)]()&&this['_graphicType']==='svactor'&&(this['_graphicType']='enemy');let _0x3a5fa1;switch(this[_0x21c11a(0x335)]){case _0x21c11a(0x250):this[_0x21c11a(0x402)]=_0x1fa1e8[_0x21c11a(0x289)](),this['_graphicFaceIndex']=_0x1fa1e8[_0x21c11a(0x3d3)](),_0x3a5fa1=ImageManager[_0x21c11a(0x403)](this[_0x21c11a(0x402)]),_0x3a5fa1['addLoadListener'](this[_0x21c11a(0x2e2)][_0x21c11a(0x332)](this,_0x3a5fa1));break;case'icon':this['_graphicIconIndex']=_0x1fa1e8[_0x21c11a(0x2ef)](),_0x3a5fa1=ImageManager['loadSystem'](_0x21c11a(0x408)),_0x3a5fa1[_0x21c11a(0x304)](this['changeIconGraphicBitmap']['bind'](this,_0x3a5fa1));break;case _0x21c11a(0x387):if(_0x1fa1e8[_0x21c11a(0x340)]())_0x21c11a(0x231)!==_0x21c11a(0x2d8)?(this[_0x21c11a(0x383)]=_0x1fa1e8[_0x21c11a(0x2c2)](),_0x3a5fa1=ImageManager['loadSvActor'](this['_graphicSv']),_0x3a5fa1[_0x21c11a(0x304)](this[_0x21c11a(0x3b9)][_0x21c11a(0x332)](this,_0x3a5fa1))):_0x58a22e[_0x21c11a(0x3ce)]=![];else $gameSystem[_0x21c11a(0x25e)]()?(this[_0x21c11a(0x34d)]=_0x1fa1e8[_0x21c11a(0x204)](),_0x3a5fa1=ImageManager[_0x21c11a(0x2bc)](this[_0x21c11a(0x34d)]),_0x3a5fa1[_0x21c11a(0x304)](this[_0x21c11a(0x280)][_0x21c11a(0x332)](this,_0x3a5fa1))):(this[_0x21c11a(0x34d)]=_0x1fa1e8[_0x21c11a(0x204)](),_0x3a5fa1=ImageManager[_0x21c11a(0x226)](this[_0x21c11a(0x34d)]),_0x3a5fa1[_0x21c11a(0x304)](this[_0x21c11a(0x280)][_0x21c11a(0x332)](this,_0x3a5fa1)));break;case'svactor':this[_0x21c11a(0x383)]=_0x1fa1e8['battlerName'](),_0x3a5fa1=ImageManager[_0x21c11a(0x207)](this[_0x21c11a(0x383)]),_0x3a5fa1['addLoadListener'](this[_0x21c11a(0x3b9)][_0x21c11a(0x332)](this,_0x3a5fa1));break;}},Sprite_FieldMarkerATB[_0x47f037(0x2a9)][_0x47f037(0x2e2)]=function(_0x21f429){const _0xa72e5d=_0x47f037,_0x54053e=Sprite_FieldGaugeATB['Settings'],_0x59a4d7=_0x54053e[_0xa72e5d(0x2c6)],_0x32e5ed=this[_0xa72e5d(0x3f9)];this[_0xa72e5d(0x37e)][_0xa72e5d(0x1ff)]=new Bitmap(_0x59a4d7,_0x59a4d7);const _0x57923e=this['_graphicSprite'][_0xa72e5d(0x1ff)],_0x440d2f=ImageManager['faceWidth'],_0x32d269=ImageManager[_0xa72e5d(0x222)],_0x43b321=ImageManager[_0xa72e5d(0x3ff)],_0x5c8520=ImageManager[_0xa72e5d(0x222)],_0x552986=_0x32e5ed%0x4*_0x440d2f+(_0x440d2f-_0x43b321)/0x2,_0x470cba=Math[_0xa72e5d(0x322)](_0x32e5ed/0x4)*_0x32d269+(_0x32d269-_0x5c8520)/0x2;_0x57923e[_0xa72e5d(0x254)](_0x21f429,_0x552986,_0x470cba,_0x43b321,_0x5c8520,0x0,0x0,_0x59a4d7,_0x59a4d7);},Sprite_FieldMarkerATB[_0x47f037(0x2a9)][_0x47f037(0x344)]=function(_0x1ecbca){const _0x448bf8=_0x47f037,_0x36972b=Sprite_FieldGaugeATB[_0x448bf8(0x40d)],_0x2a9912=_0x36972b[_0x448bf8(0x2c6)],_0xdf4128=this['_graphicIconIndex'];this[_0x448bf8(0x37e)]['bitmap']=new Bitmap(_0x2a9912,_0x2a9912);const _0x58d11d=this[_0x448bf8(0x37e)][_0x448bf8(0x1ff)],_0x78ebe6=ImageManager[_0x448bf8(0x3de)],_0x29da19=ImageManager[_0x448bf8(0x39b)],_0x4c4539=_0xdf4128%0x10*_0x78ebe6,_0x225ad6=Math[_0x448bf8(0x322)](_0xdf4128/0x10)*_0x29da19;_0x58d11d[_0x448bf8(0x254)](_0x1ecbca,_0x4c4539,_0x225ad6,_0x78ebe6,_0x29da19,0x0,0x0,_0x2a9912,_0x2a9912);},Sprite_FieldMarkerATB[_0x47f037(0x2a9)][_0x47f037(0x3b9)]=function(_0x13527a){const _0x1b7b69=_0x47f037,_0x4a75c3=Sprite_FieldGaugeATB[_0x1b7b69(0x40d)],_0x454b39=_0x4a75c3[_0x1b7b69(0x2c6)];this[_0x1b7b69(0x37e)][_0x1b7b69(0x1ff)]=new Bitmap(_0x454b39,_0x454b39);const _0x5b95cf=this[_0x1b7b69(0x37e)]['bitmap'],_0x380a4d=this[_0x1b7b69(0x383)][_0x1b7b69(0x36f)](/\$/i),_0x1b848b=_0x380a4d?0x1:ImageManager['svActorHorzCells'],_0x5d57c9=_0x380a4d?0x1:ImageManager[_0x1b7b69(0x21a)],_0x200932=_0x13527a[_0x1b7b69(0x3b4)]/_0x1b848b,_0x14252=_0x13527a[_0x1b7b69(0x347)]/_0x5d57c9,_0x33f376=Math[_0x1b7b69(0x2e9)](0x1,_0x454b39/_0x200932,_0x454b39/_0x14252),_0x48226d=_0x200932*_0x33f376,_0x44c205=_0x14252*_0x33f376,_0x38f0b6=Math[_0x1b7b69(0x3d0)]((_0x454b39-_0x48226d)/0x2),_0x322389=Math[_0x1b7b69(0x3d0)]((_0x454b39-_0x44c205)/0x2);_0x5b95cf[_0x1b7b69(0x254)](_0x13527a,0x0,0x0,_0x200932,_0x14252,_0x38f0b6,_0x322389,_0x48226d,_0x44c205);},Sprite_FieldMarkerATB[_0x47f037(0x2a9)]['changeEnemyGraphicBitmap']=function(_0x3ea767){const _0x316eff=_0x47f037,_0x32734b=Sprite_FieldGaugeATB[_0x316eff(0x40d)],_0x3a5374=_0x32734b[_0x316eff(0x2c6)];this[_0x316eff(0x37e)]['bitmap']=new Bitmap(_0x3a5374,_0x3a5374);const _0x2fbca7=this[_0x316eff(0x37e)][_0x316eff(0x1ff)],_0x3344b7=Math['min'](0x1,_0x3a5374/_0x3ea767['width'],_0x3a5374/_0x3ea767[_0x316eff(0x347)]),_0x528cc0=_0x3ea767[_0x316eff(0x3b4)]*_0x3344b7,_0x330712=_0x3ea767[_0x316eff(0x347)]*_0x3344b7,_0x19e9e6=Math[_0x316eff(0x3d0)]((_0x3a5374-_0x528cc0)/0x2),_0x387d3e=Math[_0x316eff(0x3d0)]((_0x3a5374-_0x330712)/0x2);_0x2fbca7[_0x316eff(0x254)](_0x3ea767,0x0,0x0,_0x3ea767[_0x316eff(0x3b4)],_0x3ea767[_0x316eff(0x347)],_0x19e9e6,_0x387d3e,_0x528cc0,_0x330712);},Sprite_FieldMarkerATB[_0x47f037(0x2a9)][_0x47f037(0x2ca)]=function(){const _0x5f2289=_0x47f037,_0x3d7987=this[_0x5f2289(0x217)]();if(!_0x3d7987)return;if(!_0x3d7987[_0x5f2289(0x30f)]())return;if(this[_0x5f2289(0x366)]===_0x3d7987[_0x5f2289(0x39a)]())return;this[_0x5f2289(0x366)]=_0x3d7987[_0x5f2289(0x39a)]();if(_0x3d7987['hasSvBattler']())this['_graphicHue']=0x0;this[_0x5f2289(0x37e)][_0x5f2289(0x2cc)](this['_graphicHue']);},Sprite_FieldMarkerATB['prototype'][_0x47f037(0x22f)]=function(){const _0x29d3f3=_0x47f037;if(!this[_0x29d3f3(0x2c3)])return;const _0x49f127=this[_0x29d3f3(0x217)]();if(!_0x49f127)return;if(this['_letter']===_0x49f127[_0x29d3f3(0x1fc)]&&this['_plural']===_0x49f127['_plural'])return;this['_letter']=_0x49f127[_0x29d3f3(0x1fc)],this[_0x29d3f3(0x310)]=_0x49f127['_plural'];const _0x10c2fd=Sprite_FieldGaugeATB[_0x29d3f3(0x40d)],_0x210ff1=_0x10c2fd[_0x29d3f3(0x2c6)],_0x18912b=Math['floor'](_0x210ff1/0x2),_0x32d4d1=this[_0x29d3f3(0x2c3)][_0x29d3f3(0x1ff)];_0x32d4d1[_0x29d3f3(0x3f6)]();if(!this[_0x29d3f3(0x310)])return;_0x32d4d1[_0x29d3f3(0x389)]=_0x10c2fd[_0x29d3f3(0x2fd)]||$gameSystem['mainFontFace'](),_0x32d4d1[_0x29d3f3(0x390)]=_0x10c2fd[_0x29d3f3(0x367)]||0x10,_0x32d4d1['drawText'](this['_letter'],0x2,_0x18912b,_0x210ff1-0x4,_0x18912b-0x2,'right');},Sprite_FieldMarkerATB[_0x47f037(0x2a9)][_0x47f037(0x3fb)]=function(){const _0x8df539=_0x47f037,_0x2d4fd7=this[_0x8df539(0x217)]();if(!_0x2d4fd7)return;const _0x2429ac=_0x2d4fd7[_0x8df539(0x217)]();if(!_0x2429ac)return;const _0x267afd=_0x2429ac['mainSprite']();if(!_0x267afd)return;this[_0x8df539(0x20d)](_0x267afd[_0x8df539(0x2a4)]);},Sprite_FieldMarkerATB['prototype'][_0x47f037(0x220)]=function(){const _0x3a3501=_0x47f037;return this[_0x3a3501(0x217)]();};