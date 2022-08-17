//=============================================================================
// VisuStella MZ - Battle System ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.20;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.20] [BattleSystemATB]
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
 * Version 1.20: August 20, 2022
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

function _0x1b8f(){const _0x3e6eb2=['974280zgielO','cast1','MarkerSize','floor','_arrowSprite','icon','startEffect','iconHeight','InterruptTextColor','gaugeColor1','_graphicIconIndex','Game_Actor_clearActions','showVisualAtbGauge','applyATBPenalty','isAppeared','fieldAtbGraphicFaceName','onRestrict','isATB','toLowerCase','AddOption','isActor','#000000','createJS','_graphicHue','ActorBattlerType','clear','endBattlerActions','EnemyBattlerFaceIndex','match','Sprite_Battler_setBattler','Game_Battler_applyTpbPenalty','MarkerArrowWindowSkin','_subject','Scene_Boot_onDatabaseLoaded','children','%1BorderColor','casting','canMove','placeGauge','updateVisibility','FastRate','allBattleMembers','svBattlerName','_battler','ShowMarkerBorder','_graphicFaceIndex','revive','EscapeFailPenalty','vIroJ','ARRAYSTRUCT','Pnwte','atbStopped','AnchorY','Sprite_Actor_createStateSprite','addBattleSystemATBShowGaugeCommand','ctGaugeColor2','updateTpb','jwQCx','%1BgColor1','applyItemBattleSystemATBUserEffect','updateAtbGaugeSpritePosition','textColor','Game_Battler_startTpbCasting','setAtbChargeTime','EnemyBattlerFaceName','atbCurrentValue','Visible','_svBattlerSprite','_fieldGaugeATB','XuhyL','isCTB','parse','width','charging','gAMDZ','currentValue','XXVCz','changeEnemyGraphicBitmap','ARRAYEVAL','gRTdR','MDKMP','Sprite_Gauge_gaugeColor1','FaceIndex','trim','atbActive','max','stop','setupArrowSprite','slow%1','clearRect','36096313JUYdjb','ehnfn','OffsetX','gaugeHeight','smWHy','changeAtbCastTime','maxCommands','Cast','ConfigManager_applyData','_tpbCastTime','GaugeDirection','onDatabaseLoaded','applyGlobalBattleSystemATBEffects','createKeyJS','Game_Battler_tpbAcceleration','addBattleSystemATBCommands','ready','slow','ctGaugeColor1','applyItemUserEffect','_fnord','DisplayPosition','targetOpacity','setFrame','Armor-%1-%2','_graphicFaceName','mainFontFace','Game_Battler_tpbRelativeSpeed','%1SystemBorder','VisuMZ_2_BattleSystemCTB','getChildIndex','isGaugeHorizontal','updateGraphic','GaugeSplit','BattlerRelativeSpeedJS','initMembers','item','Game_Battler_tpbSpeed','Game_BattlerBase_revive','subject','exit','_graphicSv','createBattlerSprite','qvqIP','visualAtbGauge','EnemyBattlerFontFace','rPoLP','atbAcceleration','getAtbCastTimeRate','ARRAYNUM','Options','setBattleSystemATBFieldGaugeVisible','addLoadListener','FieldGaugeClearEnemyGraphic','isSideView','PAQEv','createBorderSprite','concat','round','gaugeRate','xerNF','tpbSpeed','SystemFieldGaugeVisibility','Window_StatusBase_placeGauge','length','updateGraphicHue','fieldAtbGraphicFaceIndex','NkVSn','ParseAllNotetags','fillRect','ShowMarkerBg','updateSelectionEffect','clearActions','AnchorX','cast2','isActiveTpb','MarkerSpeed','eMOYl','GaugeThick','XslKa','bottom','faHPK','rjauD','STR','UseFieldGauge','makeData','Gauge','updateAtbGaugeSpriteVisibility','tpbRequiredCastTime','CaZCm','applyGlobal','_atbGaugeSprite','xNlfd','_fieldAtbGaugeFaceIndex','MarkerOffset','VisuMZ_1_BattleCore','default%1','TpbAccelerationJS','atbColor','_horz','TpbCastTimeJS','createFieldAtbGraphicFaceName','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','isAtbCastingState','Actor','_blendColor','Skill-%1-%2','ARRAYSTR','Sprite_Enemy_createStateIconSprite','ARRAYFUNC','OpxHP','battleUIOffsetY','CZtpL','members','Sprite_Gauge_currentValue','Window_BattleStatus','disappear','_battlerContainer','createGaugeSprite','fast%1','ParseSkillNotetags','Sprite_Gauge_currentMaxValue','Parse_Notetags_CreateJS','boxWidth','Mechanics','FieldGaugeEnemyFace','time','217jXvlJj','paramBuffRate','updateLetter','Reqaq','prototype','Game_Battler_clearTpbChargeTime','aggroGauge','Window_Options_addGeneralOptions','format','EnemyBattlerDrawLetter','goIMX','GaugeLengthHorz','_helpWindow','setAtbCastTime','initTpbChargeTimeATB','createFieldAtbGraphicIconIndex','createGraphicSprite','BattleManager_isActiveTpb','Game_Battler_initTpbChargeTime','fontFace','3JkJfwy','opJCj','makeActions','6323229KSQNXL','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','STRUCT','updatePositionOffset','changeSvActorGraphicBitmap','faceName','description','VisibleGauge','createBackgroundSprite','applyTpbPenalty','reduce','hasSvBattler','changeAtbChargeTime','gaugeColor2','changeFaceGraphicBitmap','lDxUg','setup','createAtbGaugeSprite','Scene_Battle_createAllWindows','TpbSpeedCalcJS','createArrowSprite','YaCTd','createStateSprite','IconSet','FieldGaugeActorIcon','createFieldGaugeContainerATB','State-%1-%2','kNdkf','Game_Action_applyItemUserEffect','process_VisuMZ_BattleSystemATB_CreateRegExp','MQZuC','_skinSprite','njHPC','gradientFillRect','_backgroundSprite','tFYaY','getColor','tswXv','checkAggroControlSystemOffsetYAdjustment','Game_Unit_updateTpb','Scale','BorderThickness','RepositionTopForHelp','ShowStatusGauge','Window_SideviewUiBattleStatus','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','_atbColors','isHidden','_graphicEnemy','OoavI','constructor','Color','fNFsX','_atbAfterSpeed','_tpbChargeTime','TwAAx','setupBattleSystemATBColors','BattleCore','NUM','Window_Help_setItem','RepositionTopHelpX','currentMaxValue','svActorVertCells','AggroControlSystem','stop%1','BattleSystemATB','setHomeLocation','InterruptAnimationID','compareBattlerSprites','currentAction','ceil','HPxnD','bihmX','actor','Game_BattlerBase_die','Item-%1-%2','updateOpacity','skills','_graphicSprite','Interrupt','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','paramRate','tpbAcceleration','numActions','toUpperCase','HYZFf','some','WmoxF','Enemy-%1-%2','_fieldAtbGaugeGraphicType','sort','GaugeSystemSkin','enemy','Game_Action_applyGlobal','VkdCF','Enemies','1284860coxlas','initTpbChargeTime','TQagu','changeIconGraphicBitmap','VisuMZ_2_AggroControlSystem','FRqlC','RepositionTopHelpY','setupTextPopup','Game_Battler_tpbRequiredCastTime','Game_Battler_removeState','YsnvH','create','SlowRate','loadWindowskin','initialize','version','createActorSprites','processUpdateGraphic','Scene_Options_maxCommands','fieldAtbGraphicIconIndex','YpZDJ','tpbRelativeSpeed','ParseItemNotetags','default','isAtbChargingState','Actors','InitialGaugeJS','registerCommand','updateBattleContainerOrder','battler','40184gdvdBb','call','setBattler','ColiG','traitObjects','kfDUp','Charge','blt','_tpbState','loadSvActor','setHue','PpGOc','_atbFieldGaugeVisible','_windowLayer','Sprite_Enemy_startEffect','setAtbAfterSpeed','BqOLA','visible','_onRestrictBypassAtbReset','_statusType','16CbxQgR','full%1','fast','createFieldGaugeSkin','boxHeight','JaeJR','Settings','10UqnXej','startTpbCasting','RegExp','tFgNU','faceWidth','name','_fieldGaugeATB_Container','FieldGaugeEnemyIcon','BattleManager_endBattlerActions','makeDeepCopy','svActorHorzCells','onAtbInterrupt','updatePosition','return\x200','loadEnemy','cPQeW','_homeY','OTOHI','1846926fcfCve','_fieldAtbGaugeFaceName','setupAtbGaugeSprite','_windowskin','_graphicType','XOotY','createEnemySprites','createLetterSprite','ConfigManager_makeData','addChild','loadSvEnemy','scale','opacity','targetPositionOnGauge','updatePositionOnGauge','map','_forcing','Sprite_Gauge_gaugeColor2','createAllWindows','nkJgC','Class-%1-%2','_unit','mtiYG','GebSt','createGaugeBitmap','battlerName','Game_Battler_onRestrict','full','clearFieldAtbGraphics','tpbChargeTime','Jxqin','cast%1','ARRAYJSON','atbCurrentMaxValue','ColorManager_loadWindowskin','_plural','_gaugeSprite','LOuMh','Game_Battler_tpbBaseSpeed','note','addGeneralOptions','_letter','atbGaugeColor','bind','XcYcs','mainSprite','FUNC','removeChild','process_VisuMZ_BattleSystemATB_JS_Notetags','OffsetY','4335654WbZkLI','createBattlerContainer','isSceneBattle','atbInterrupt','anchor','ActorBattlerIcon','Aggro','ConvertParams','bOPxx','battleUIOffsetX','faceHeight','DisplayOffsetY','face','drawText','isEnemy','isAlive','setBlendColor','createFieldAtbGraphicFaceIndex','applyData','createChildren','QdKkL','_letterSprite','ShowActorGauge','_fieldAtbGaugeIconIndex','applyBattleSystemATBUserEffect','createStateIconSprite','createFieldGaugeSpriteATB','RJYqv','bitmap','_scene','includes','EFPOi','loadSystem','gVUbV','right','die','Sprite_Battler_update','HmUiI','Sprite_Battler_updateMain','fieldAtbGraphicType','After','IconIndex','clamp','top','clearTpbChargeTime','Enemy','atbSpeed','isTpb','update','tpbBaseSpeed','maxBattleMembers','battlerHue','isBattleSystemATBFieldGaugeVisible','_homeX','drawGaugeBitmap','EnemyBattlerIcon','createFieldAtbGraphicType','InterruptMirror','min','iconWidth','speed','_statusWindow','Weapon-%1-%2','createBattlerSprites','InterruptMute','InterruptText','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','appear','Game_System_initialize','initBattleSystemATB','svactor','sUItD','height','setItem','InterruptFlashColor','EnemyBattlerType'];_0x1b8f=function(){return _0x3e6eb2;};return _0x1b8f();}const _0x563755=_0x5f05;(function(_0x1df06e,_0x39ab4e){const _0x4657d5=_0x5f05,_0x494f48=_0x1df06e();while(!![]){try{const _0x47af0c=-parseInt(_0x4657d5(0x212))/0x1+parseInt(_0x4657d5(0x194))/0x2*(parseInt(_0x4657d5(0x2ff))/0x3)+parseInt(_0x4657d5(0x17b))/0x4*(-parseInt(_0x4657d5(0x149))/0x5)+-parseInt(_0x4657d5(0x1c6))/0x6+parseInt(_0x4657d5(0x2eb))/0x7*(-parseInt(_0x4657d5(0x167))/0x8)+-parseInt(_0x4657d5(0x302))/0x9+parseInt(_0x4657d5(0x182))/0xa*(parseInt(_0x4657d5(0x26c))/0xb);if(_0x47af0c===_0x39ab4e)break;else _0x494f48['push'](_0x494f48['shift']());}catch(_0x41c31d){_0x494f48['push'](_0x494f48['shift']());}}}(_0x1b8f,0x97d33));var label=_0x563755(0x343),tier=tier||0x0,dependencies=[_0x563755(0x2cb)],pluginData=$plugins['filter'](function(_0x1ff8a5){const _0x95290d=_0x563755;return _0x1ff8a5['status']&&_0x1ff8a5[_0x95290d(0x308)][_0x95290d(0x1e4)]('['+label+']');})[0x0];VisuMZ[label][_0x563755(0x181)]=VisuMZ[label][_0x563755(0x181)]||{},VisuMZ['ConvertParams']=function(_0x338cd4,_0x33517a){const _0x3231ed=_0x563755;for(const _0x23f708 in _0x33517a){if(_0x23f708[_0x3231ed(0x22e)](/(.*):(.*)/i)){if(_0x3231ed(0x1e5)!==_0x3231ed(0x1e5)){if(_0x390c58!==_0x3231ed(0x2ea))return!![];if(![_0x3231ed(0x2df),_0x3231ed(0x32e)][_0x3231ed(0x1e4)](this['constructor']['name']))return![];if(!_0x4fe701[_0x3231ed(0x223)]())return![];if(!_0x53c9f8[_0x3231ed(0x298)])return![];return _0x393a06[_0x3231ed(0x343)][_0x3231ed(0x181)][_0x3231ed(0x2c2)][_0x3231ed(0x32d)];}else{const _0x4a975a=String(RegExp['$1']),_0x5eef33=String(RegExp['$2'])['toUpperCase']()[_0x3231ed(0x265)]();let _0x4a3b31,_0x527f36,_0x1a8a28;switch(_0x5eef33){case _0x3231ed(0x33c):_0x4a3b31=_0x33517a[_0x23f708]!==''?Number(_0x33517a[_0x23f708]):0x0;break;case _0x3231ed(0x29d):_0x527f36=_0x33517a[_0x23f708]!==''?JSON[_0x3231ed(0x259)](_0x33517a[_0x23f708]):[],_0x4a3b31=_0x527f36[_0x3231ed(0x1a3)](_0x9ec2c0=>Number(_0x9ec2c0));break;case'EVAL':_0x4a3b31=_0x33517a[_0x23f708]!==''?eval(_0x33517a[_0x23f708]):null;break;case _0x3231ed(0x260):_0x527f36=_0x33517a[_0x23f708]!==''?JSON[_0x3231ed(0x259)](_0x33517a[_0x23f708]):[],_0x4a3b31=_0x527f36['map'](_0x103dd5=>eval(_0x103dd5));break;case'JSON':_0x4a3b31=_0x33517a[_0x23f708]!==''?JSON['parse'](_0x33517a[_0x23f708]):'';break;case _0x3231ed(0x1b4):_0x527f36=_0x33517a[_0x23f708]!==''?JSON[_0x3231ed(0x259)](_0x33517a[_0x23f708]):[],_0x4a3b31=_0x527f36[_0x3231ed(0x1a3)](_0x253735=>JSON[_0x3231ed(0x259)](_0x253735));break;case _0x3231ed(0x1c2):_0x4a3b31=_0x33517a[_0x23f708]!==''?new Function(JSON[_0x3231ed(0x259)](_0x33517a[_0x23f708])):new Function(_0x3231ed(0x18f));break;case _0x3231ed(0x2d9):_0x527f36=_0x33517a[_0x23f708]!==''?JSON[_0x3231ed(0x259)](_0x33517a[_0x23f708]):[],_0x4a3b31=_0x527f36[_0x3231ed(0x1a3)](_0x209160=>new Function(JSON[_0x3231ed(0x259)](_0x209160)));break;case _0x3231ed(0x2bf):_0x4a3b31=_0x33517a[_0x23f708]!==''?String(_0x33517a[_0x23f708]):'';break;case _0x3231ed(0x2d7):_0x527f36=_0x33517a[_0x23f708]!==''?JSON[_0x3231ed(0x259)](_0x33517a[_0x23f708]):[],_0x4a3b31=_0x527f36[_0x3231ed(0x1a3)](_0x14f01b=>String(_0x14f01b));break;case _0x3231ed(0x304):_0x1a8a28=_0x33517a[_0x23f708]!==''?JSON['parse'](_0x33517a[_0x23f708]):{},_0x4a3b31=VisuMZ[_0x3231ed(0x1cd)]({},_0x1a8a28);break;case _0x3231ed(0x243):_0x527f36=_0x33517a[_0x23f708]!==''?JSON[_0x3231ed(0x259)](_0x33517a[_0x23f708]):[],_0x4a3b31=_0x527f36[_0x3231ed(0x1a3)](_0x546d3c=>VisuMZ[_0x3231ed(0x1cd)]({},JSON['parse'](_0x546d3c)));break;default:continue;}_0x338cd4[_0x4a975a]=_0x4a3b31;}}}return _0x338cd4;},(_0x634bac=>{const _0x5adfad=_0x563755,_0x4cb9e8=_0x634bac[_0x5adfad(0x187)];for(const _0x30f0be of dependencies){if('HsbtF'!=='vomYI'){if(!Imported[_0x30f0be]){if(_0x5adfad(0x1a7)==='nkJgC'){alert(_0x5adfad(0x139)[_0x5adfad(0x2f3)](_0x4cb9e8,_0x30f0be)),SceneManager['exit']();break;}else this[_0x5adfad(0x16f)]='charging',this['_tpbChargeTime']+=_0x54fd28[_0x5adfad(0x343)]['Settings']['Mechanics'][_0x5adfad(0x241)]||0x0;}}else return _0x7bff8c(_0x4df96c['$2']);}const _0x2b380f=_0x634bac[_0x5adfad(0x308)];if(_0x2b380f[_0x5adfad(0x22e)](/\[Version[ ](.*?)\]/i)){const _0x2509cf=Number(RegExp['$1']);_0x2509cf!==VisuMZ[label][_0x5adfad(0x158)]&&(_0x5adfad(0x1eb)===_0x5adfad(0x1eb)?(alert(_0x5adfad(0x208)[_0x5adfad(0x2f3)](_0x4cb9e8,_0x2509cf)),SceneManager[_0x5adfad(0x294)]()):this[_0x5adfad(0x2c3)]());}if(_0x2b380f[_0x5adfad(0x22e)](/\[Tier[ ](\d+)\]/i)){if('emiLq'==='emiLq'){const _0x1e0c4b=Number(RegExp['$1']);_0x1e0c4b<tier?(alert(_0x5adfad(0x303)['format'](_0x4cb9e8,_0x1e0c4b,tier)),SceneManager[_0x5adfad(0x294)]()):tier=Math[_0x5adfad(0x267)](_0x1e0c4b,tier);}else this[_0x5adfad(0x255)]['_atbGaugeSprite'][_0x5adfad(0x178)]=_0x292d62;}VisuMZ[_0x5adfad(0x1cd)](VisuMZ[label]['Settings'],_0x634bac['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x563755(0x31a),_0x16cad2=>{const _0x2961ba=_0x563755;VisuMZ[_0x2961ba(0x1cd)](_0x16cad2,_0x16cad2);const _0x212c10=_0x16cad2[_0x2961ba(0x162)],_0x347f5c=_0x16cad2[_0x2961ba(0x1ef)];for(const _0x1d8523 of _0x212c10){const _0x5913bd=$gameActors['actor'](_0x1d8523);if(!_0x5913bd)continue;_0x5913bd['_fieldAtbGaugeGraphicType']=_0x2961ba(0x217),_0x5913bd['_fieldAtbGaugeIconIndex']=_0x347f5c;}}),PluginManager[_0x563755(0x164)](pluginData['name'],'FieldGaugeActorFace',_0x30dc50=>{const _0xae9d64=_0x563755;VisuMZ[_0xae9d64(0x1cd)](_0x30dc50,_0x30dc50);const _0x23ff26=_0x30dc50[_0xae9d64(0x162)],_0x4d12bf=_0x30dc50['FaceName'],_0xfd0182=_0x30dc50['FaceIndex'];for(const _0x2d9de5 of _0x23ff26){const _0x368e05=$gameActors['actor'](_0x2d9de5);if(!_0x368e05)continue;_0x368e05[_0xae9d64(0x142)]=_0xae9d64(0x1d2),_0x368e05[_0xae9d64(0x195)]=_0x4d12bf,_0x368e05['_fieldAtbGaugeFaceIndex']=_0xfd0182;}}),PluginManager['registerCommand'](pluginData['name'],'FieldGaugeClearActorGraphic',_0x42bdfc=>{const _0x125784=_0x563755;VisuMZ['ConvertParams'](_0x42bdfc,_0x42bdfc);const _0x7dc88f=_0x42bdfc[_0x125784(0x162)];for(const _0x498751 of _0x7dc88f){const _0x58c64e=$gameActors[_0x125784(0x132)](_0x498751);if(!_0x58c64e)continue;_0x58c64e['clearFieldAtbGraphics']();}}),PluginManager['registerCommand'](pluginData[_0x563755(0x187)],_0x563755(0x189),_0x86ef98=>{const _0xf47047=_0x563755;VisuMZ[_0xf47047(0x1cd)](_0x86ef98,_0x86ef98);const _0x390e53=_0x86ef98[_0xf47047(0x148)],_0x44f642=_0x86ef98[_0xf47047(0x1ef)];for(const _0xcf1fcb of _0x390e53){if(_0xf47047(0x257)===_0xf47047(0x2da))return this[_0xf47047(0x173)]===_0x32385e&&this['initBattleSystemATB'](),this[_0xf47047(0x173)];else{const _0x4dd8ef=$gameTroop[_0xf47047(0x2dd)]()[_0xcf1fcb];if(!_0x4dd8ef)continue;_0x4dd8ef[_0xf47047(0x142)]=_0xf47047(0x217),_0x4dd8ef[_0xf47047(0x1dd)]=_0x44f642;}}}),PluginManager[_0x563755(0x164)](pluginData[_0x563755(0x187)],_0x563755(0x2e9),_0x2343c4=>{const _0x469422=_0x563755;VisuMZ[_0x469422(0x1cd)](_0x2343c4,_0x2343c4);const _0x1c6782=_0x2343c4[_0x469422(0x148)],_0x465665=_0x2343c4['FaceName'],_0x40fa9c=_0x2343c4[_0x469422(0x264)];for(const _0x4255d5 of _0x1c6782){const _0x580c8a=$gameTroop[_0x469422(0x2dd)]()[_0x4255d5];if(!_0x580c8a)continue;_0x580c8a['_fieldAtbGaugeGraphicType']=_0x469422(0x1d2),_0x580c8a[_0x469422(0x195)]=_0x465665,_0x580c8a[_0x469422(0x2c9)]=_0x40fa9c;}}),PluginManager['registerCommand'](pluginData[_0x563755(0x187)],_0x563755(0x2a1),_0x3baf07=>{const _0x25543e=_0x563755;VisuMZ[_0x25543e(0x1cd)](_0x3baf07,_0x3baf07);const _0x19abe3=_0x3baf07['Enemies'];for(const _0x3cde4b of _0x19abe3){const _0x911a6d=$gameTroop[_0x25543e(0x2dd)]()[_0x3cde4b];if(!_0x911a6d)continue;_0x911a6d[_0x25543e(0x1b0)]();}}),PluginManager['registerCommand'](pluginData['name'],_0x563755(0x2aa),_0x3db9c9=>{const _0x415f88=_0x563755;VisuMZ['ConvertParams'](_0x3db9c9,_0x3db9c9);const _0x195cc8=_0x3db9c9[_0x415f88(0x254)];$gameSystem['setBattleSystemATBFieldGaugeVisible'](_0x195cc8);}),VisuMZ['BattleSystemATB'][_0x563755(0x233)]=Scene_Boot[_0x563755(0x2ef)][_0x563755(0x277)],Scene_Boot[_0x563755(0x2ef)][_0x563755(0x277)]=function(){const _0xef4ae2=_0x563755;this['process_VisuMZ_BattleSystemATB_CreateRegExp'](),VisuMZ[_0xef4ae2(0x343)][_0xef4ae2(0x233)][_0xef4ae2(0x168)](this),this['process_VisuMZ_BattleSystemATB_JS_Notetags']();},VisuMZ[_0x563755(0x343)]['RegExp']={},Scene_Boot['prototype'][_0x563755(0x31f)]=function(){const _0x48674c=_0x563755,_0x369980=VisuMZ[_0x48674c(0x33b)][_0x48674c(0x184)],_0x298fb9=_0x48674c(0x32f),_0x1fac0c=[_0x48674c(0x16d),_0x48674c(0x273),_0x48674c(0x1ee)];for(const _0x242f24 of _0x1fac0c){const _0x1cfa58=_0x298fb9[_0x48674c(0x2f3)](_0x242f24[_0x48674c(0x13d)]()['trim'](),'(?:ATB|TPB)','(?:GAUGE|TIME|SPEED)'),_0x1b4978=new RegExp(_0x1cfa58,'i');VisuMZ['BattleSystemATB'][_0x48674c(0x184)][_0x242f24]=_0x1b4978;}},Scene_Boot[_0x563755(0x2ef)][_0x563755(0x1c4)]=function(){const _0x2fdd47=_0x563755;if(VisuMZ[_0x2fdd47(0x2b0)])return;const _0x20af92=$dataSkills[_0x2fdd47(0x2a5)]($dataItems);for(const _0xbb3756 of _0x20af92){if(!_0xbb3756)continue;VisuMZ[_0x2fdd47(0x343)][_0x2fdd47(0x2e6)](_0xbb3756);}},VisuMZ[_0x563755(0x343)][_0x563755(0x2e4)]=VisuMZ[_0x563755(0x2e4)],VisuMZ[_0x563755(0x2e4)]=function(_0x39be4f){const _0x57e7d2=_0x563755;VisuMZ[_0x57e7d2(0x343)][_0x57e7d2(0x2e4)]['call'](this,_0x39be4f),VisuMZ[_0x57e7d2(0x343)][_0x57e7d2(0x2e6)](_0x39be4f);},VisuMZ[_0x563755(0x343)][_0x563755(0x15f)]=VisuMZ[_0x563755(0x15f)],VisuMZ['ParseItemNotetags']=function(_0x5f2250){const _0x4472a3=_0x563755;VisuMZ[_0x4472a3(0x343)][_0x4472a3(0x15f)]['call'](this,_0x5f2250),VisuMZ[_0x4472a3(0x343)][_0x4472a3(0x2e6)](_0x5f2250);},VisuMZ[_0x563755(0x343)]['Parse_Notetags_CreateJS']=function(_0x39b7bf){const _0x390c9a=_0x563755,_0x40bdce=['Charge','Cast','After'];for(const _0x2ea71f of _0x40bdce){VisuMZ[_0x390c9a(0x343)][_0x390c9a(0x228)](_0x39b7bf,_0x2ea71f);}},VisuMZ['BattleSystemATB']['JS']={},VisuMZ[_0x563755(0x343)][_0x563755(0x228)]=function(_0x2b5cbf,_0x24078){const _0x4b8ae0=_0x563755,_0x243960=_0x2b5cbf[_0x4b8ae0(0x1bb)];if(_0x243960['match'](VisuMZ[_0x4b8ae0(0x343)][_0x4b8ae0(0x184)][_0x24078])){const _0x536552=String(RegExp['$1']),_0x280e15=_0x4b8ae0(0x2d2)[_0x4b8ae0(0x2f3)](_0x536552,_0x24078),_0x9553fa=VisuMZ[_0x4b8ae0(0x343)][_0x4b8ae0(0x279)](_0x2b5cbf,_0x24078);VisuMZ['BattleSystemATB']['JS'][_0x9553fa]=new Function(_0x280e15);}},VisuMZ['BattleSystemATB'][_0x563755(0x279)]=function(_0x27744e,_0x5b4470){const _0xda52f4=_0x563755;if(VisuMZ[_0xda52f4(0x279)])return VisuMZ[_0xda52f4(0x279)](_0x27744e,_0x5b4470);let _0x46ce9e='';if($dataActors[_0xda52f4(0x1e4)](_0x27744e))_0x46ce9e='Actor-%1-%2'[_0xda52f4(0x2f3)](_0x27744e['id'],_0x5b4470);if($dataClasses[_0xda52f4(0x1e4)](_0x27744e))_0x46ce9e=_0xda52f4(0x1a8)[_0xda52f4(0x2f3)](_0x27744e['id'],_0x5b4470);if($dataSkills['includes'](_0x27744e))_0x46ce9e=_0xda52f4(0x2d6)['format'](_0x27744e['id'],_0x5b4470);if($dataItems[_0xda52f4(0x1e4)](_0x27744e))_0x46ce9e=_0xda52f4(0x134)[_0xda52f4(0x2f3)](_0x27744e['id'],_0x5b4470);if($dataWeapons[_0xda52f4(0x1e4)](_0x27744e))_0x46ce9e=_0xda52f4(0x204)[_0xda52f4(0x2f3)](_0x27744e['id'],_0x5b4470);if($dataArmors[_0xda52f4(0x1e4)](_0x27744e))_0x46ce9e=_0xda52f4(0x284)[_0xda52f4(0x2f3)](_0x27744e['id'],_0x5b4470);if($dataEnemies[_0xda52f4(0x1e4)](_0x27744e))_0x46ce9e=_0xda52f4(0x141)[_0xda52f4(0x2f3)](_0x27744e['id'],_0x5b4470);if($dataStates['includes'](_0x27744e))_0x46ce9e=_0xda52f4(0x31c)[_0xda52f4(0x2f3)](_0x27744e['id'],_0x5b4470);return _0x46ce9e;},ConfigManager['visualAtbGauge']=!![],VisuMZ[_0x563755(0x343)][_0x563755(0x19c)]=ConfigManager['makeData'],ConfigManager[_0x563755(0x2c1)]=function(){const _0x57c068=_0x563755,_0x3a344a=VisuMZ['BattleSystemATB'][_0x57c068(0x19c)][_0x57c068(0x168)](this);return _0x3a344a[_0x57c068(0x298)]=this[_0x57c068(0x298)],_0x3a344a;},VisuMZ[_0x563755(0x343)][_0x563755(0x274)]=ConfigManager[_0x563755(0x1d8)],ConfigManager[_0x563755(0x1d8)]=function(_0x1caaf2){const _0x335add=_0x563755;VisuMZ['BattleSystemATB']['ConfigManager_applyData'][_0x335add(0x168)](this,_0x1caaf2),_0x335add(0x298)in _0x1caaf2?_0x335add(0x339)===_0x335add(0x339)?this[_0x335add(0x298)]=_0x1caaf2['visualAtbGauge']:(_0x4d969b(_0x335add(0x208)['format'](_0x16a4a1,_0x1bf8a9)),_0x2a3744[_0x335add(0x294)]()):'OTOHI'!==_0x335add(0x193)?(this['battler']()['_fnord']=!![],this[_0x335add(0x166)]()[_0x335add(0x2c3)]()):this[_0x335add(0x298)]=!![];},ImageManager[_0x563755(0x18c)]=ImageManager[_0x563755(0x18c)]||0x9,ImageManager[_0x563755(0x340)]=ImageManager[_0x563755(0x340)]||0x6,TextManager[_0x563755(0x298)]=VisuMZ[_0x563755(0x343)][_0x563755(0x181)][_0x563755(0x29e)]['Name'],VisuMZ['BattleSystemATB'][_0x563755(0x1b6)]=ColorManager[_0x563755(0x156)],ColorManager[_0x563755(0x156)]=function(){const _0x5001c1=_0x563755;VisuMZ['BattleSystemATB'][_0x5001c1(0x1b6)][_0x5001c1(0x168)](this),this[_0x5001c1(0x197)][_0x5001c1(0x2a0)](this['setupBattleSystemATBColors']['bind'](this));},ColorManager['getColor']=function(_0xd8e5e8){const _0x37305e=_0x563755;return _0xd8e5e8=String(_0xd8e5e8),_0xd8e5e8[_0x37305e(0x22e)](/#(.*)/i)?'#%1'[_0x37305e(0x2f3)](String(RegExp['$1'])):_0x37305e(0x26d)===_0x37305e(0x244)?_0x48f3e9(_0x516726['$1']):this[_0x37305e(0x24f)](Number(_0xd8e5e8));},ColorManager['setupBattleSystemATBColors']=function(){const _0x655166=_0x563755,_0x3ec206=[_0x655166(0x160),_0x655166(0x1af),'cast',_0x655166(0x17d),_0x655166(0x27d),_0x655166(0x268)],_0x43b7f1=VisuMZ[_0x655166(0x343)][_0x655166(0x181)][_0x655166(0x335)];this[_0x655166(0x330)]={};for(const _0x249955 of _0x3ec206){for(let _0x413c8a=0x1;_0x413c8a<=0x2;_0x413c8a++){const _0xf0df5a=_0x249955+_0x413c8a;this[_0x655166(0x330)][_0xf0df5a]=this['getColor'](_0x43b7f1[_0xf0df5a]);}}},ColorManager[_0x563755(0x2ce)]=function(_0x46d442){const _0x1fbe86=_0x563755;if(this[_0x1fbe86(0x330)]===undefined)this['setupBattleSystemATBColors']();return this['_atbColors'][_0x46d442]||_0x1fbe86(0x227);},SceneManager[_0x563755(0x1c8)]=function(){const _0x4e259a=_0x563755;return this['_scene']&&this[_0x4e259a(0x1e3)][_0x4e259a(0x334)]===Scene_Battle;},BattleManager[_0x563755(0x223)]=function(){const _0x496326=_0x563755;if(Imported[_0x496326(0x289)]&&this[_0x496326(0x258)]()){if(_0x496326(0x300)!==_0x496326(0x25c))return![];else this[_0x496326(0x16f)]=_0x496326(0x27c);}return this[_0x496326(0x1f5)]();},VisuMZ[_0x563755(0x343)]['BattleManager_isActiveTpb']=BattleManager[_0x563755(0x2b7)],BattleManager[_0x563755(0x2b7)]=function(){const _0x4cecf7=_0x563755;if(!this[_0x4cecf7(0x1f5)]())return![];else{if(ConfigManager&&ConfigManager['atbActive']!==undefined)return ConfigManager[_0x4cecf7(0x266)];else{if(_0x4cecf7(0x1c0)!==_0x4cecf7(0x333))return VisuMZ[_0x4cecf7(0x343)][_0x4cecf7(0x2fc)][_0x4cecf7(0x168)](this);else _0x24ad32[_0x4cecf7(0x343)][_0x4cecf7(0x230)][_0x4cecf7(0x168)](this);}}},VisuMZ[_0x563755(0x343)][_0x563755(0x20a)]=Game_System[_0x563755(0x2ef)][_0x563755(0x157)],Game_System[_0x563755(0x2ef)]['initialize']=function(){const _0x30ca67=_0x563755;VisuMZ['BattleSystemATB'][_0x30ca67(0x20a)][_0x30ca67(0x168)](this),this['initBattleSystemATB']();},Game_System['prototype']['initBattleSystemATB']=function(){this['_atbFieldGaugeVisible']=!![];},Game_System[_0x563755(0x2ef)][_0x563755(0x1fa)]=function(){const _0x419d16=_0x563755;return this[_0x419d16(0x173)]===undefined&&('CaZCm'===_0x419d16(0x2c5)?this[_0x419d16(0x20b)]():(_0x5834d9[_0x419d16(0x343)]['ColorManager_loadWindowskin']['call'](this),this['_windowskin'][_0x419d16(0x2a0)](this[_0x419d16(0x33a)][_0x419d16(0x1bf)](this)))),this['_atbFieldGaugeVisible'];},Game_System['prototype'][_0x563755(0x29f)]=function(_0x377b47){const _0x1f234e=_0x563755;this[_0x1f234e(0x173)]===undefined&&this['initBattleSystemATB'](),this[_0x1f234e(0x173)]=_0x377b47;},VisuMZ['BattleSystemATB'][_0x563755(0x31e)]=Game_Action[_0x563755(0x2ef)][_0x563755(0x27f)],Game_Action[_0x563755(0x2ef)][_0x563755(0x27f)]=function(_0x2dbe26){const _0xbd6c8e=_0x563755;VisuMZ[_0xbd6c8e(0x343)][_0xbd6c8e(0x31e)][_0xbd6c8e(0x168)](this,_0x2dbe26),this[_0xbd6c8e(0x1de)](_0x2dbe26);},Game_Action['prototype']['applyBattleSystemATBUserEffect']=function(_0x270919){const _0x285668=_0x563755;if(!SceneManager[_0x285668(0x1c8)]())return;if(!BattleManager[_0x285668(0x223)]())return;if(this['item']())this[_0x285668(0x24d)](_0x270919);},Game_Action[_0x563755(0x2ef)][_0x563755(0x24d)]=function(_0x46b03c){const _0x53bd69=_0x563755,_0x1cc4ea=this[_0x53bd69(0x290)]()[_0x53bd69(0x1bb)];if(_0x46b03c[_0x53bd69(0x161)]()){const _0xa81ee1=VisuMZ['BattleSystemATB']['createKeyJS'](this[_0x53bd69(0x290)](),'Charge');if(VisuMZ[_0x53bd69(0x343)]['JS'][_0xa81ee1]){if(_0x53bd69(0x2af)===_0x53bd69(0x31d))this['createAtbGaugeSprite']();else{const _0x292bf5=VisuMZ['BattleSystemATB']['JS'][_0xa81ee1][_0x53bd69(0x168)](this,this['subject'](),_0x46b03c);_0x46b03c[_0x53bd69(0x251)](_0x292bf5);}}if(_0x1cc4ea['match'](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if(_0x53bd69(0x262)!=='MDKMP')return _0x5ae320[_0x53bd69(0x181)][_0x53bd69(0x252)];else _0x46b03c[_0x53bd69(0x251)](Number(RegExp['$1'])*0.01);}_0x1cc4ea[_0x53bd69(0x22e)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x46b03c[_0x53bd69(0x30e)](Number(RegExp['$1'])*0.01);}else{if(_0x46b03c[_0x53bd69(0x2d3)]()){if(_0x53bd69(0x15d)!=='YpZDJ'){const _0x12bf59=this[_0x53bd69(0x132)]()[_0x53bd69(0x1bb)];if(_0x12bf59[_0x53bd69(0x22e)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x159278(_0x5c877c['$1']);return _0x3a62ea['Settings'][_0x53bd69(0x1cb)];}else{const _0x42cd2d=VisuMZ[_0x53bd69(0x343)][_0x53bd69(0x279)](this['item'](),_0x53bd69(0x273));if(VisuMZ[_0x53bd69(0x343)]['JS'][_0x42cd2d]){if('LvvIX'===_0x53bd69(0x131))_0x833245[_0x53bd69(0x223)]()?this[_0x53bd69(0x2f9)](_0x78abb4):_0x43c931[_0x53bd69(0x343)][_0x53bd69(0x2fd)][_0x53bd69(0x168)](this,_0x13ff38);else{const _0x5e2d20=VisuMZ[_0x53bd69(0x343)]['JS'][_0x42cd2d][_0x53bd69(0x168)](this,this[_0x53bd69(0x293)](),_0x46b03c);_0x46b03c[_0x53bd69(0x2f8)](_0x5e2d20);}}if(_0x1cc4ea[_0x53bd69(0x22e)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if(_0x53bd69(0x191)===_0x53bd69(0x199))return _0x4878f9*(0x1/(_0xf44dcc*-0x2));else _0x46b03c[_0x53bd69(0x2f8)](Number(RegExp['$1'])*0.01);}_0x1cc4ea[_0x53bd69(0x22e)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x46b03c[_0x53bd69(0x271)](Number(RegExp['$1'])*0.01);if(_0x1cc4ea[_0x53bd69(0x22e)](/<(?:ATB|TPB) INTERRUPT>/i)){if(_0x53bd69(0x177)!==_0x53bd69(0x177))return _0x77c36a['y']-_0x4e79b1['y'];else _0x46b03c[_0x53bd69(0x1c9)]();}}}}},VisuMZ[_0x563755(0x343)][_0x563755(0x146)]=Game_Action[_0x563755(0x2ef)][_0x563755(0x2c6)],Game_Action[_0x563755(0x2ef)]['applyGlobal']=function(){const _0x2cf281=_0x563755;VisuMZ[_0x2cf281(0x343)][_0x2cf281(0x146)][_0x2cf281(0x168)](this),this['applyGlobalBattleSystemATBEffects']();},Game_Action[_0x563755(0x2ef)][_0x563755(0x278)]=function(){const _0x20c092=_0x563755;if(!this['item']())return;if(!BattleManager['isATB']())return;const _0x48d2ad=this[_0x20c092(0x290)]()[_0x20c092(0x1bb)];let _0x199fde=0x0;this[_0x20c092(0x1a4)]&&(_0x199fde=this['subject']()[_0x20c092(0x338)]);const _0x4b5479=VisuMZ[_0x20c092(0x343)][_0x20c092(0x279)](this[_0x20c092(0x290)](),'After');VisuMZ['BattleSystemATB']['JS'][_0x4b5479]&&(_0x199fde=VisuMZ[_0x20c092(0x343)]['JS'][_0x4b5479][_0x20c092(0x168)](this,this['subject'](),this[_0x20c092(0x293)]()));let _0x5142e9=this[_0x20c092(0x290)]()[_0x20c092(0x202)]>0x0?this[_0x20c092(0x290)]()[_0x20c092(0x202)]:0x0;if(this['isAttack']())_0x5142e9+=this[_0x20c092(0x293)]()['attackSpeed']();_0x199fde+=(_0x5142e9/0xfa0)[_0x20c092(0x1f0)](0x0,0x1);this[_0x20c092(0x290)]()[_0x20c092(0x1bb)][_0x20c092(0x22e)](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x20c092(0x1ab)!=='zblph'?_0x199fde=Number(RegExp['$1'])*0.01:this['_fieldAtbGaugeGraphicType']=this['createFieldAtbGraphicType']());const _0x25b629=this['subject']()[_0x20c092(0x16b)]()[_0x20c092(0x2a5)](this[_0x20c092(0x293)]()[_0x20c092(0x136)]()),_0x5d32fd=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x51ac8e=_0x25b629[_0x20c092(0x1a3)](_0x4bb34c=>_0x4bb34c&&_0x4bb34c[_0x20c092(0x1bb)][_0x20c092(0x22e)](_0x5d32fd)?Number(RegExp['$1'])*0.01:0x0);_0x199fde=_0x51ac8e[_0x20c092(0x30c)]((_0x519557,_0x14012c)=>_0x519557+_0x14012c,_0x199fde),this[_0x20c092(0x290)]()[_0x20c092(0x1bb)][_0x20c092(0x22e)](/<(?:ATB|TPB) INSTANT>/i)&&('MCuDq'!=='MCuDq'?(this[_0x20c092(0x31b)](),_0x3e426d[_0x20c092(0x343)]['Scene_Battle_createAllWindows'][_0x20c092(0x168)](this),this['createFieldGaugeSpriteATB']()):_0x199fde=0xa),this[_0x20c092(0x293)]()['setAtbAfterSpeed'](_0x199fde);},Game_BattlerBase['prototype']['setAtbChargeTime']=function(_0x4d5fc4){const _0x50bd8b=_0x563755;this['_tpbChargeTime']=_0x4d5fc4[_0x50bd8b(0x1f0)](0x0,0x1);},Game_BattlerBase[_0x563755(0x2ef)][_0x563755(0x30e)]=function(_0x458467){const _0x4eb15b=_0x563755;this[_0x4eb15b(0x251)](this['_tpbChargeTime']+_0x458467);},Game_BattlerBase['prototype'][_0x563755(0x2f8)]=function(_0x4ba8c9){const _0x3b59c6=_0x563755,_0x4681cb=this[_0x3b59c6(0x2c4)]();this['_tpbCastTime']=(_0x4681cb*_0x4ba8c9)[_0x3b59c6(0x1f0)](0x0,_0x4681cb);},Game_BattlerBase[_0x563755(0x2ef)]['changeAtbCastTime']=function(_0x2b21c3){const _0x365000=_0x563755,_0x2d01a6=this[_0x365000(0x2c4)](),_0x2b8de0=_0x2d01a6*_0x2b21c3;this['_tpbCastTime']=(this['_tpbCastTime']+_0x2b8de0)['clamp'](0x0,_0x2d01a6);},VisuMZ[_0x563755(0x343)][_0x563755(0x133)]=Game_BattlerBase[_0x563755(0x2ef)][_0x563755(0x1e9)],Game_BattlerBase['prototype']['die']=function(){const _0x1d99d8=_0x563755;VisuMZ['BattleSystemATB'][_0x1d99d8(0x133)]['call'](this),BattleManager['isTpb']()&&this['clearTpbChargeTime']();},VisuMZ[_0x563755(0x343)][_0x563755(0x292)]=Game_BattlerBase[_0x563755(0x2ef)][_0x563755(0x240)],Game_BattlerBase[_0x563755(0x2ef)]['revive']=function(){const _0x5218a4=_0x563755;VisuMZ[_0x5218a4(0x343)][_0x5218a4(0x292)]['call'](this);if(BattleManager[_0x5218a4(0x1f5)]()){if(_0x5218a4(0x327)!==_0x5218a4(0x327)){const _0xb2f308=_0x42b886['note'];if(_0xb2f308['match'](_0xfa2c68[_0x5218a4(0x343)][_0x5218a4(0x184)][_0x522403])){const _0x1ce418=_0x34a921(_0xd3ccea['$1']),_0x2967aa='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x5218a4(0x2f3)](_0x1ce418,_0x151e88),_0x2bce42=_0x3a1df6[_0x5218a4(0x343)]['createKeyJS'](_0x19fa95,_0x2fc4ce);_0x1b3d3a[_0x5218a4(0x343)]['JS'][_0x2bce42]=new _0x4fbf82(_0x2967aa);}}else this[_0x5218a4(0x1f2)]();}},VisuMZ[_0x563755(0x343)][_0x563755(0x2fd)]=Game_Battler['prototype']['initTpbChargeTime'],Game_Battler['prototype'][_0x563755(0x14a)]=function(_0x59516b){const _0x5c1539=_0x563755;BattleManager[_0x5c1539(0x223)]()?this[_0x5c1539(0x2f9)](_0x59516b):VisuMZ[_0x5c1539(0x343)][_0x5c1539(0x2fd)][_0x5c1539(0x168)](this,_0x59516b);},Game_Battler[_0x563755(0x2ef)][_0x563755(0x2f9)]=function(_0x1551d9){const _0x47a28b=_0x563755,_0x16e924=VisuMZ[_0x47a28b(0x343)]['Settings']['Mechanics'];let _0x3bbf52=this[_0x47a28b(0x15e)]()*eval(_0x16e924[_0x47a28b(0x163)]);const _0x52fb20=this[_0x47a28b(0x16b)]()[_0x47a28b(0x2a5)](this[_0x47a28b(0x136)]()),_0x225dd4=/<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x32f57f=_0x52fb20[_0x47a28b(0x1a3)](_0x459cef=>_0x459cef&&_0x459cef[_0x47a28b(0x1bb)][_0x47a28b(0x22e)](_0x225dd4)?Number(RegExp['$1'])*0.01:0x0);_0x3bbf52=_0x32f57f[_0x47a28b(0x30c)]((_0x53d185,_0x37615c)=>_0x53d185+_0x37615c,_0x3bbf52),this['_tpbState']=_0x47a28b(0x25b),this['_tpbChargeTime']=(_0x1551d9?0x1:_0x3bbf52)[_0x47a28b(0x1f0)](0x0,0x1);if(this['isRestricted']()){if(_0x47a28b(0x1b2)!==_0x47a28b(0x1b2))return _0x15c63b[_0x47a28b(0x343)][_0x47a28b(0x181)]['Mechanics'][_0x47a28b(0x28e)][_0x47a28b(0x168)](this,this);else this[_0x47a28b(0x338)]=0x0;}},Game_Battler['prototype'][_0x563755(0x161)]=function(){const _0x4581a0=_0x563755;return this[_0x4581a0(0x16f)]===_0x4581a0(0x25b);},Game_Battler[_0x563755(0x2ef)]['isAtbCastingState']=function(){const _0x21ca91=_0x563755;return this[_0x21ca91(0x16f)]===_0x21ca91(0x236)&&this[_0x21ca91(0x12e)]()&&this[_0x21ca91(0x12e)]()['item']()&&this[_0x21ca91(0x12e)]()[_0x21ca91(0x290)]()['speed']<0x0;},Game_BattlerBase['prototype'][_0x563755(0x29c)]=function(){const _0x18ad25=_0x563755;return this[_0x18ad25(0x2d3)]()?'eLKXq'!=='eLKXq'?_0x28ad87[_0x18ad25(0x343)][_0x18ad25(0x27a)][_0x18ad25(0x168)](this):this['_tpbCastTime']/this[_0x18ad25(0x2c4)]():0x0;},Game_Battler['prototype'][_0x563755(0x245)]=function(){return!this['canMove']();},Game_Battler[_0x563755(0x2ef)][_0x563755(0x176)]=function(_0x3ad9c4){const _0x36800f=_0x563755;this[_0x36800f(0x337)]=_0x3ad9c4;},VisuMZ[_0x563755(0x343)][_0x563755(0x18a)]=BattleManager['endBattlerActions'],BattleManager[_0x563755(0x22c)]=function(_0x514fcf){const _0x2b0d02=_0x563755;this[_0x2b0d02(0x1f5)]()&&!_0x514fcf['canMove']()&&(_0x514fcf[_0x2b0d02(0x179)]=!![]),VisuMZ[_0x2b0d02(0x343)]['BattleManager_endBattlerActions'][_0x2b0d02(0x168)](this,_0x514fcf),this[_0x2b0d02(0x1f5)]()&&!_0x514fcf[_0x2b0d02(0x237)]()&&(_0x514fcf[_0x2b0d02(0x179)]=![]);},VisuMZ['BattleSystemATB'][_0x563755(0x2f0)]=Game_Battler[_0x563755(0x2ef)]['clearTpbChargeTime'],Game_Battler[_0x563755(0x2ef)]['clearTpbChargeTime']=function(){const _0x46943f=_0x563755;if(this['_onRestrictBypassAtbReset'])return;VisuMZ[_0x46943f(0x343)][_0x46943f(0x2f0)]['call'](this),this[_0x46943f(0x338)]+=this[_0x46943f(0x337)]||0x0;},Game_Battler[_0x563755(0x2ef)][_0x563755(0x1c9)]=function(){const _0x1b85d8=_0x563755;if(!this[_0x1b85d8(0x2d3)]())return;if(!this[_0x1b85d8(0x12e)]())return;if(!this[_0x1b85d8(0x12e)]()[_0x1b85d8(0x290)]())return;if(this[_0x1b85d8(0x12e)]()[_0x1b85d8(0x290)]()[_0x1b85d8(0x1bb)][_0x1b85d8(0x22e)](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this[_0x1b85d8(0x2b4)](),this[_0x1b85d8(0x1f2)](),this[_0x1b85d8(0x275)]=0x0,this[_0x1b85d8(0x18d)]();},Game_Battler['prototype'][_0x563755(0x18d)]=function(){const _0x269b0f=_0x563755,_0x2d571e=VisuMZ[_0x269b0f(0x343)][_0x269b0f(0x181)][_0x269b0f(0x138)];if(Imported['VisuMZ_0_CoreEngine']){if(_0x269b0f(0x140)===_0x269b0f(0x297))return _0x45e947(_0x748155['$1']);else{const _0x14fcc6=_0x2d571e[_0x269b0f(0x345)],_0x500363=_0x2d571e[_0x269b0f(0x1ff)],_0x1986c5=_0x2d571e[_0x269b0f(0x206)];$gameTemp['requestFauxAnimation']([this],_0x14fcc6,_0x500363,_0x1986c5);}}if(this['battler']()&&_0x2d571e[_0x269b0f(0x207)][_0x269b0f(0x2ac)]>0x0){const _0x214626=_0x2d571e[_0x269b0f(0x207)],_0x179b84={'textColor':ColorManager[_0x269b0f(0x326)](_0x2d571e[_0x269b0f(0x21a)]),'flashColor':_0x2d571e[_0x269b0f(0x210)],'flashDuration':_0x2d571e['InterruptFlashDuration']};this[_0x269b0f(0x150)](_0x214626,_0x179b84);}},VisuMZ[_0x563755(0x343)][_0x563755(0x250)]=Game_Battler[_0x563755(0x2ef)][_0x563755(0x183)],Game_Battler[_0x563755(0x2ef)][_0x563755(0x183)]=function(){const _0x45a068=_0x563755;VisuMZ[_0x45a068(0x343)][_0x45a068(0x250)]['call'](this),BattleManager[_0x45a068(0x223)]()&&(this['_tpbCastTime']>=this[_0x45a068(0x2c4)]()&&(this[_0x45a068(0x16f)]=_0x45a068(0x27c)));},VisuMZ[_0x563755(0x343)]['Game_Unit_updateTpb']=Game_Unit['prototype'][_0x563755(0x24a)],Game_Unit[_0x563755(0x2ef)][_0x563755(0x24a)]=function(){const _0x2f29ea=_0x563755;if(BattleManager[_0x2f29ea(0x223)]()){if(_0x2f29ea(0x24b)==='jwQCx'){if(BattleManager[_0x2f29ea(0x23b)]()[_0x2f29ea(0x13f)](_0x192d8e=>_0x192d8e&&_0x192d8e[_0x2f29ea(0x1d5)]()&&_0x192d8e[_0x2f29ea(0x220)]()&&_0x192d8e[_0x2f29ea(0x16f)]===_0x2f29ea(0x27c)))return;}else return _0x28551d['x']-_0x37c7e9['x'];}VisuMZ[_0x2f29ea(0x343)][_0x2f29ea(0x329)]['call'](this);},VisuMZ['BattleSystemATB'][_0x563755(0x1ae)]=Game_Battler['prototype'][_0x563755(0x222)],Game_Battler[_0x563755(0x2ef)][_0x563755(0x222)]=function(){const _0x8c1bdb=_0x563755;!VisuMZ['BattleSystemATB'][_0x8c1bdb(0x181)][_0x8c1bdb(0x2e8)]['StunsResetGauge']&&(this[_0x8c1bdb(0x179)]=BattleManager[_0x8c1bdb(0x223)]()),VisuMZ[_0x8c1bdb(0x343)][_0x8c1bdb(0x1ae)][_0x8c1bdb(0x168)](this),this['_onRestrictBypassAtbReset']=undefined;},VisuMZ['BattleSystemATB'][_0x563755(0x21d)]=Game_Actor[_0x563755(0x2ef)][_0x563755(0x2b4)],Game_Actor['prototype'][_0x563755(0x2b4)]=function(){const _0xce642d=_0x563755;if(this[_0xce642d(0x179)]){if(_0xce642d(0x20d)!==_0xce642d(0x20d)){const _0x25bb3a=this[_0xce642d(0x145)]()[_0xce642d(0x1bb)];if(_0x25bb3a[_0xce642d(0x22e)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0xce642d(0x1d2);else{if(_0x25bb3a['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0xce642d(0x217);}return _0x59aba0[_0xce642d(0x181)][_0xce642d(0x211)];}else{if(!this[_0xce642d(0x2d3)]())return;}}VisuMZ['BattleSystemATB'][_0xce642d(0x21d)]['call'](this);},VisuMZ[_0x563755(0x343)][_0x563755(0x152)]=Game_Battler['prototype']['removeState'],Game_Battler[_0x563755(0x2ef)]['removeState']=function(_0x86da36){const _0xe5b22d=_0x563755,_0x2d73f1=!this['canMove']()&&BattleManager[_0xe5b22d(0x1f5)]();VisuMZ[_0xe5b22d(0x343)][_0xe5b22d(0x152)][_0xe5b22d(0x168)](this,_0x86da36);if(_0x2d73f1&&this[_0xe5b22d(0x237)]()&&this[_0xe5b22d(0x13c)]()<=0x0){if('ofGly'!==_0xe5b22d(0x2c8))this[_0xe5b22d(0x301)](),this[_0xe5b22d(0x16f)]=_0xe5b22d(0x25b);else{if(!this['_battler'])return _0x583ef8['atbColor']('default%1'[_0xe5b22d(0x2f3)](_0x27ae4f));if(this['_battler']['atbStopped']())return _0x567da6[_0xe5b22d(0x2ce)](_0xe5b22d(0x342)['format'](_0x2fd2a2));if(this[_0xe5b22d(0x23d)]['isAtbCastingState']())return _0x5bc1b7[_0xe5b22d(0x2ce)](_0xe5b22d(0x1b3)[_0xe5b22d(0x2f3)](_0x2c4577));if(this[_0xe5b22d(0x2a7)]()>=0x1)return _0x5b6887['atbColor'](_0xe5b22d(0x17c)['format'](_0x2ef68a));const _0x51c5ea=_0x135390[_0xe5b22d(0x343)][_0xe5b22d(0x181)][_0xe5b22d(0x2c2)],_0x237962=this[_0xe5b22d(0x23d)][_0xe5b22d(0x13a)](0x6)*this[_0xe5b22d(0x23d)][_0xe5b22d(0x2ec)](0x6);if(_0x237962<=_0x51c5ea[_0xe5b22d(0x155)])return _0x35e3ab['atbColor']('slow%1'[_0xe5b22d(0x2f3)](_0x41a780));if(_0x237962>=_0x51c5ea['FastRate'])return _0x20f26e[_0xe5b22d(0x2ce)](_0xe5b22d(0x2e3)[_0xe5b22d(0x2f3)](_0x32b048));return _0x5bc38a[_0xe5b22d(0x2ce)](_0xe5b22d(0x2cc)[_0xe5b22d(0x2f3)](_0xe04733));}}},VisuMZ[_0x563755(0x343)][_0x563755(0x230)]=Game_Battler[_0x563755(0x2ef)][_0x563755(0x30b)],Game_Battler[_0x563755(0x2ef)][_0x563755(0x30b)]=function(){const _0xa43039=_0x563755;if(BattleManager['isATB']()){if('FRqlC'!==_0xa43039(0x14e))return this['_fieldAtbGaugeIconIndex']===_0x1ccb3c&&(this['_fieldAtbGaugeIconIndex']=this[_0xa43039(0x2fa)]()),this[_0xa43039(0x1dd)];else this[_0xa43039(0x21f)]();}else VisuMZ[_0xa43039(0x343)][_0xa43039(0x230)][_0xa43039(0x168)](this);},Game_Battler['prototype']['applyATBPenalty']=function(){const _0x1145cc=_0x563755;this[_0x1145cc(0x16f)]='charging',this[_0x1145cc(0x338)]+=VisuMZ[_0x1145cc(0x343)][_0x1145cc(0x181)][_0x1145cc(0x2e8)][_0x1145cc(0x241)]||0x0;},VisuMZ['BattleSystemATB'][_0x563755(0x291)]=Game_Battler[_0x563755(0x2ef)][_0x563755(0x2a9)],Game_Battler[_0x563755(0x2ef)][_0x563755(0x2a9)]=function(){const _0x1b3d70=_0x563755;if(BattleManager[_0x1b3d70(0x223)]())return VisuMZ[_0x1b3d70(0x343)][_0x1b3d70(0x181)][_0x1b3d70(0x2e8)]['TpbSpeedCalcJS'][_0x1b3d70(0x168)](this,this);else{if(_0x1b3d70(0x147)!=='NjyyI')return VisuMZ['BattleSystemATB'][_0x1b3d70(0x291)][_0x1b3d70(0x168)](this);else _0x52b11d=_0x1b3d70(0x145);}},VisuMZ[_0x563755(0x343)][_0x563755(0x1ba)]=Game_Battler[_0x563755(0x2ef)][_0x563755(0x1f7)],Game_Battler[_0x563755(0x2ef)][_0x563755(0x1f7)]=function(){const _0x3b14d1=_0x563755;return BattleManager[_0x3b14d1(0x223)]()?VisuMZ[_0x3b14d1(0x343)][_0x3b14d1(0x181)][_0x3b14d1(0x2e8)]['TpbBaseSpeedCalcJS']['call'](this,this):'PAQEv'!==_0x3b14d1(0x2a3)?_0x3b14d1(0x1d2):VisuMZ['BattleSystemATB'][_0x3b14d1(0x1ba)][_0x3b14d1(0x168)](this);},VisuMZ['BattleSystemATB'][_0x563755(0x287)]=Game_Battler['prototype'][_0x563755(0x15e)],Game_Battler[_0x563755(0x2ef)][_0x563755(0x15e)]=function(){const _0x40c22f=_0x563755;return BattleManager[_0x40c22f(0x223)]()?VisuMZ[_0x40c22f(0x343)]['Settings']['Mechanics']['BattlerRelativeSpeedJS'][_0x40c22f(0x168)](this,this):VisuMZ['BattleSystemATB']['Game_Battler_tpbRelativeSpeed']['call'](this);},VisuMZ['BattleSystemATB']['Game_Battler_tpbAcceleration']=Game_Battler['prototype'][_0x563755(0x13b)],Game_Battler[_0x563755(0x2ef)][_0x563755(0x13b)]=function(){const _0x1fa4b9=_0x563755;if(BattleManager['isATB']())return this['atbAcceleration']();else{if('jnRXU'===_0x1fa4b9(0x336)){if(!this[_0x1fa4b9(0x1f5)]())return![];else return _0x506fb8&&_0x121f18['atbActive']!==_0x356dc3?_0x1c9e4c[_0x1fa4b9(0x266)]:_0x54ec2f[_0x1fa4b9(0x343)][_0x1fa4b9(0x2fc)][_0x1fa4b9(0x168)](this);}else return VisuMZ['BattleSystemATB'][_0x1fa4b9(0x27a)]['call'](this);}},Game_Battler[_0x563755(0x2ef)][_0x563755(0x29b)]=function(){const _0x47c19c=_0x563755;let _0x4734f0=VisuMZ['BattleSystemATB'][_0x47c19c(0x181)][_0x47c19c(0x2e8)][_0x47c19c(0x2cd)][_0x47c19c(0x168)](this,this);if(ConfigManager&&ConfigManager[_0x47c19c(0x1f4)]!==undefined){const _0x3cb557=ConfigManager[_0x47c19c(0x1f4)]-0x3;if(_0x3cb557>0x0)return _0x4734f0*(_0x3cb557*0x2);else{if(_0x3cb557<0x0)return _0x4734f0*(0x1/(_0x3cb557*-0x2));}}return _0x4734f0;},VisuMZ[_0x563755(0x343)][_0x563755(0x151)]=Game_Battler[_0x563755(0x2ef)][_0x563755(0x2c4)],Game_Battler['prototype'][_0x563755(0x2c4)]=function(){const _0x81e3f7=_0x563755;return BattleManager[_0x81e3f7(0x223)]()?VisuMZ[_0x81e3f7(0x343)][_0x81e3f7(0x181)][_0x81e3f7(0x2e8)][_0x81e3f7(0x2d0)]['call'](this,this):VisuMZ['BattleSystemATB']['Game_Battler_tpbRequiredCastTime']['call'](this);},VisuMZ[_0x563755(0x343)][_0x563755(0x15b)]=Scene_Options[_0x563755(0x2ef)]['maxCommands'],Scene_Options[_0x563755(0x2ef)][_0x563755(0x272)]=function(){const _0x1ddbce=_0x563755;let _0x54aa6=VisuMZ['BattleSystemATB'][_0x1ddbce(0x15b)]['call'](this);const _0x2e35c9=VisuMZ['BattleSystemATB']['Settings'];if(_0x2e35c9['Options'][_0x1ddbce(0x225)]&&_0x2e35c9[_0x1ddbce(0x29e)]['AdjustRect']&&BattleManager[_0x1ddbce(0x223)]())_0x54aa6++;return _0x54aa6;},Sprite_Battler[_0x563755(0x2ef)][_0x563755(0x313)]=function(){const _0x129059=_0x563755;if(!BattleManager[_0x129059(0x223)]())return;if(!ConfigManager[_0x129059(0x298)])return;const _0x4b78ac=VisuMZ['BattleSystemATB'][_0x129059(0x181)]['Gauge'],_0x2defef=new Sprite_Gauge();_0x2defef[_0x129059(0x1ca)]['x']=_0x4b78ac[_0x129059(0x2b5)],_0x2defef[_0x129059(0x1ca)]['y']=_0x4b78ac['AnchorY'],_0x2defef[_0x129059(0x19f)]['x']=_0x2defef[_0x129059(0x19f)]['y']=_0x4b78ac[_0x129059(0x32a)],this['_atbGaugeSprite']=_0x2defef,this[_0x129059(0x19d)](this[_0x129059(0x2c7)]);},VisuMZ[_0x563755(0x343)][_0x563755(0x22f)]=Sprite_Battler['prototype'][_0x563755(0x169)],Sprite_Battler[_0x563755(0x2ef)][_0x563755(0x169)]=function(_0x49389c){const _0x5b3656=_0x563755;VisuMZ[_0x5b3656(0x343)][_0x5b3656(0x22f)][_0x5b3656(0x168)](this,_0x49389c),this[_0x5b3656(0x196)](_0x49389c),this[_0x5b3656(0x2c3)]();},Sprite_Battler[_0x563755(0x2ef)][_0x563755(0x196)]=function(_0x17f702){const _0x305e00=_0x563755;if(!_0x17f702)return;if(!this[_0x305e00(0x2c7)])return;if(_0x17f702[_0x305e00(0x226)]()){}else{if(_0x17f702[_0x305e00(0x1d4)]()){if(this['constructor']===Sprite_Enemy&&_0x17f702['hasSvBattler']())return;if(this[_0x305e00(0x334)]===Sprite_SvEnemy&&!_0x17f702[_0x305e00(0x30d)]())return;}}this[_0x305e00(0x2c7)][_0x305e00(0x312)](_0x17f702,_0x305e00(0x2ea));},Sprite_Battler['prototype'][_0x563755(0x2c3)]=function(){const _0x292dc9=_0x563755;if(!this[_0x292dc9(0x2c7)])return;const _0x296d12=this['_battler']&&this[_0x292dc9(0x23d)][_0x292dc9(0x220)]()&&!this[_0x292dc9(0x23d)][_0x292dc9(0x331)]();this[_0x292dc9(0x2c7)][_0x292dc9(0x178)]=_0x296d12,this[_0x292dc9(0x255)]&&this['_svBattlerSprite'][_0x292dc9(0x2c7)]&&(this[_0x292dc9(0x255)][_0x292dc9(0x2c7)]['visible']=_0x296d12);},VisuMZ[_0x563755(0x343)][_0x563755(0x1ec)]=Sprite_Battler[_0x563755(0x2ef)]['updateMain'],Sprite_Battler[_0x563755(0x2ef)]['updateMain']=function(){const _0x448bfd=_0x563755;VisuMZ[_0x448bfd(0x343)]['Sprite_Battler_updateMain'][_0x448bfd(0x168)](this),this[_0x448bfd(0x24e)]();},Sprite_Battler[_0x563755(0x2ef)][_0x563755(0x24e)]=function(){const _0x4ca0a7=_0x563755;if(!this['_battler'])return;if(!this[_0x4ca0a7(0x2c7)])return;const _0x15ad07=VisuMZ[_0x4ca0a7(0x343)][_0x4ca0a7(0x181)][_0x4ca0a7(0x2c2)],_0x39f169=this['_atbGaugeSprite'];let _0x461cbf=_0x15ad07['OffsetX'];this[_0x4ca0a7(0x23d)][_0x4ca0a7(0x1cf)]&&(_0x4ca0a7(0x29a)!==_0x4ca0a7(0x29a)?(_0x542266[_0x4ca0a7(0x343)]['Sprite_Enemy_startEffect'][_0x4ca0a7(0x168)](this,_0x12879d),(_0x3bab64===_0x4ca0a7(0x209)||_0x4ca0a7(0x2e0))&&this[_0x4ca0a7(0x2c3)]()):_0x461cbf+=this[_0x4ca0a7(0x23d)]['battleUIOffsetX']());let _0x27ade7=_0x15ad07['OffsetY'];this[_0x4ca0a7(0x23d)][_0x4ca0a7(0x2db)]&&(_0x27ade7+=this['_battler'][_0x4ca0a7(0x2db)]()),_0x39f169['x']=_0x461cbf,_0x39f169['y']=-this['height']+_0x27ade7,this[_0x4ca0a7(0x23d)][_0x4ca0a7(0x1d4)]()&&(this['_battler'][_0x4ca0a7(0x145)]()[_0x4ca0a7(0x1bb)][_0x4ca0a7(0x22e)](/<HIDE (?:ATB|TPB) GAUGE>/i)&&('KhFYR'==='KhFYR'?_0x39f169['visible']=![]:this[_0x4ca0a7(0x251)](this[_0x4ca0a7(0x338)]+_0x4e657b))),this[_0x4ca0a7(0x328)]()&&(_0x39f169['y']+=_0x39f169[_0x4ca0a7(0x26f)]()*_0x15ad07[_0x4ca0a7(0x32a)]-0x1),this[_0x4ca0a7(0x19f)]['x']<0x0&&(_0x39f169[_0x4ca0a7(0x19f)]['x']=-Math['abs'](_0x39f169[_0x4ca0a7(0x19f)]['x']));},Sprite_Battler[_0x563755(0x2ef)][_0x563755(0x328)]=function(){const _0x2ea41a=_0x563755;if(!Imported[_0x2ea41a(0x14d)])return![];if(this[_0x2ea41a(0x23d)]&&this[_0x2ea41a(0x23d)][_0x2ea41a(0x1d4)]())return![];const _0x43aff2=VisuMZ[_0x2ea41a(0x341)][_0x2ea41a(0x181)][_0x2ea41a(0x1cc)];if(!_0x43aff2[_0x2ea41a(0x309)])return![];if(!ConfigManager[_0x2ea41a(0x2f1)])return![];const _0x385bb9=VisuMZ['BattleSystemATB'][_0x2ea41a(0x181)][_0x2ea41a(0x2c2)];return _0x43aff2['Scale']===_0x385bb9[_0x2ea41a(0x32a)]&&_0x43aff2[_0x2ea41a(0x2b5)]===_0x385bb9[_0x2ea41a(0x2b5)]&&_0x43aff2['AnchorY']===_0x385bb9[_0x2ea41a(0x246)]&&_0x43aff2[_0x2ea41a(0x26e)]===_0x385bb9[_0x2ea41a(0x26e)]&&_0x43aff2[_0x2ea41a(0x1c5)]===_0x385bb9[_0x2ea41a(0x1c5)]&&!![];},VisuMZ[_0x563755(0x343)][_0x563755(0x1ea)]=Sprite_Battler['prototype'][_0x563755(0x1f6)],Sprite_Battler[_0x563755(0x2ef)][_0x563755(0x1f6)]=function(){const _0x2d249d=_0x563755;VisuMZ[_0x2d249d(0x343)][_0x2d249d(0x1ea)][_0x2d249d(0x168)](this);if(!this[_0x2d249d(0x23d)]&&this[_0x2d249d(0x2c7)]){if(_0x2d249d(0x130)!==_0x2d249d(0x130))return'icon';else this[_0x2d249d(0x2c7)][_0x2d249d(0x178)]=![],this[_0x2d249d(0x255)]&&(this[_0x2d249d(0x255)][_0x2d249d(0x2c7)][_0x2d249d(0x178)]=![]);}},VisuMZ[_0x563755(0x343)][_0x563755(0x247)]=Sprite_Actor[_0x563755(0x2ef)]['createStateSprite'],Sprite_Actor[_0x563755(0x2ef)][_0x563755(0x318)]=function(){const _0x120970=_0x563755;VisuMZ[_0x120970(0x343)][_0x120970(0x247)]['call'](this),VisuMZ[_0x120970(0x343)][_0x120970(0x181)][_0x120970(0x2c2)][_0x120970(0x1dc)]&&(_0x120970(0x322)===_0x120970(0x322)?this['createAtbGaugeSprite']():this[_0x120970(0x1b8)]['removeChild'](this[_0x120970(0x2e1)]));},VisuMZ[_0x563755(0x343)][_0x563755(0x2d8)]=Sprite_Enemy[_0x563755(0x2ef)]['createStateIconSprite'],Sprite_Enemy[_0x563755(0x2ef)][_0x563755(0x1df)]=function(){const _0x21d009=_0x563755;VisuMZ['BattleSystemATB']['Settings']['Gauge']['ShowEnemyGauge']&&this[_0x21d009(0x313)](),VisuMZ['BattleSystemATB'][_0x21d009(0x2d8)][_0x21d009(0x168)](this);},VisuMZ[_0x563755(0x343)]['Sprite_Enemy_startEffect']=Sprite_Enemy[_0x563755(0x2ef)][_0x563755(0x218)],Sprite_Enemy['prototype'][_0x563755(0x218)]=function(_0x1f10e6){const _0x165107=_0x563755;VisuMZ[_0x165107(0x343)][_0x165107(0x175)][_0x165107(0x168)](this,_0x1f10e6);if(_0x1f10e6===_0x165107(0x209)||'disappear'){if('DXKAp'!=='DXKAp'){if(this[_0x165107(0x330)]===_0x4bc80f)this['setupBattleSystemATBColors']();return this[_0x165107(0x330)][_0x59b0a1]||'#000000';}else this[_0x165107(0x2c3)]();}},VisuMZ['BattleSystemATB']['Game_BattlerBase_appear']=Game_BattlerBase[_0x563755(0x2ef)][_0x563755(0x209)],Game_BattlerBase['prototype'][_0x563755(0x209)]=function(){const _0x2cce9a=_0x563755;VisuMZ[_0x2cce9a(0x343)]['Game_BattlerBase_appear'][_0x2cce9a(0x168)](this),this['isEnemy']()&&BattleManager[_0x2cce9a(0x223)]()&&this['battler']()&&(this[_0x2cce9a(0x166)]()[_0x2cce9a(0x280)]=!![],this[_0x2cce9a(0x166)]()[_0x2cce9a(0x2c3)]());},VisuMZ[_0x563755(0x343)][_0x563755(0x263)]=Sprite_Gauge['prototype'][_0x563755(0x21b)],Sprite_Gauge[_0x563755(0x2ef)][_0x563755(0x21b)]=function(){const _0x14ff51=_0x563755;if(this['_statusType']===_0x14ff51(0x2ea))return this[_0x14ff51(0x1be)](0x1);return VisuMZ[_0x14ff51(0x343)][_0x14ff51(0x263)]['call'](this);},VisuMZ[_0x563755(0x343)][_0x563755(0x1a5)]=Sprite_Gauge['prototype'][_0x563755(0x30f)],Sprite_Gauge[_0x563755(0x2ef)][_0x563755(0x30f)]=function(){const _0x2a6a73=_0x563755;if(this[_0x2a6a73(0x17a)]==='time')return this[_0x2a6a73(0x1be)](0x2);return VisuMZ['BattleSystemATB']['Sprite_Gauge_gaugeColor2'][_0x2a6a73(0x168)](this);},Sprite_Gauge['prototype'][_0x563755(0x1be)]=function(_0x14d48b){const _0x2ba0b2=_0x563755;if(!this[_0x2ba0b2(0x23d)])return ColorManager[_0x2ba0b2(0x2ce)](_0x2ba0b2(0x2cc)[_0x2ba0b2(0x2f3)](_0x14d48b));if(this[_0x2ba0b2(0x23d)]['atbStopped']())return ColorManager['atbColor']('stop%1'[_0x2ba0b2(0x2f3)](_0x14d48b));if(this[_0x2ba0b2(0x23d)][_0x2ba0b2(0x2d3)]())return ColorManager[_0x2ba0b2(0x2ce)](_0x2ba0b2(0x1b3)[_0x2ba0b2(0x2f3)](_0x14d48b));if(this[_0x2ba0b2(0x2a7)]()>=0x1)return ColorManager[_0x2ba0b2(0x2ce)]('full%1'[_0x2ba0b2(0x2f3)](_0x14d48b));const _0x3b4c57=VisuMZ[_0x2ba0b2(0x343)][_0x2ba0b2(0x181)][_0x2ba0b2(0x2c2)],_0x3a0b03=this[_0x2ba0b2(0x23d)][_0x2ba0b2(0x13a)](0x6)*this[_0x2ba0b2(0x23d)][_0x2ba0b2(0x2ec)](0x6);if(_0x3a0b03<=_0x3b4c57['SlowRate'])return ColorManager['atbColor'](_0x2ba0b2(0x26a)['format'](_0x14d48b));if(_0x3a0b03>=_0x3b4c57[_0x2ba0b2(0x23a)])return ColorManager[_0x2ba0b2(0x2ce)](_0x2ba0b2(0x2e3)['format'](_0x14d48b));return ColorManager['atbColor'](_0x2ba0b2(0x2cc)[_0x2ba0b2(0x2f3)](_0x14d48b));},VisuMZ[_0x563755(0x343)][_0x563755(0x2de)]=Sprite_Gauge['prototype'][_0x563755(0x25d)],Sprite_Gauge[_0x563755(0x2ef)]['currentValue']=function(){const _0x58d7db=_0x563755;if(this[_0x58d7db(0x23d)]&&this[_0x58d7db(0x17a)]===_0x58d7db(0x2ea))return this['atbCurrentValue']();return VisuMZ[_0x58d7db(0x343)]['Sprite_Gauge_currentValue'][_0x58d7db(0x168)](this);},Sprite_Gauge[_0x563755(0x2ef)][_0x563755(0x253)]=function(){const _0x26e851=_0x563755;return this[_0x26e851(0x23d)][_0x26e851(0x2d3)]()?Math[_0x26e851(0x267)](this[_0x26e851(0x23d)][_0x26e851(0x275)],0x0):VisuMZ[_0x26e851(0x343)][_0x26e851(0x2de)][_0x26e851(0x168)](this);},VisuMZ[_0x563755(0x343)][_0x563755(0x2e5)]=Sprite_Gauge[_0x563755(0x2ef)][_0x563755(0x33f)],Sprite_Gauge[_0x563755(0x2ef)][_0x563755(0x33f)]=function(){const _0x49f24e=_0x563755;if(this[_0x49f24e(0x23d)]&&this[_0x49f24e(0x17a)]==='time')return this[_0x49f24e(0x1b5)]();return VisuMZ[_0x49f24e(0x343)][_0x49f24e(0x2e5)]['call'](this);},Sprite_Gauge[_0x563755(0x2ef)][_0x563755(0x1b5)]=function(){const _0x246297=_0x563755;if(this[_0x246297(0x23d)][_0x246297(0x2d3)]()){if(_0x246297(0x261)!==_0x246297(0x261))this[_0x246297(0x17e)](),this[_0x246297(0x2e2)](),this[_0x246297(0x1c7)]();else return Math[_0x246297(0x267)](this['_battler'][_0x246297(0x2c4)](),0x1);}else return VisuMZ[_0x246297(0x343)]['Sprite_Gauge_currentMaxValue']['call'](this);},VisuMZ['BattleSystemATB']['Window_Help_setItem']=Window_Help[_0x563755(0x2ef)][_0x563755(0x20f)],Window_Help[_0x563755(0x2ef)]['setItem']=function(_0x3b5ca4){const _0x34e6d4=_0x563755;if(BattleManager[_0x34e6d4(0x223)]()&&_0x3b5ca4&&_0x3b5ca4[_0x34e6d4(0x1bb)]&&_0x3b5ca4[_0x34e6d4(0x1bb)][_0x34e6d4(0x22e)](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i))this['setText'](String(RegExp['$1']));else{if(_0x34e6d4(0x2f5)===_0x34e6d4(0x2be)){const _0x48bc59=_0x48a61b(_0x43e0d3['$1']);_0x48bc59<_0x4190cc?(_0x3996c2(_0x34e6d4(0x303)['format'](_0x6b2754,_0x48bc59,_0x3f5136)),_0x436042[_0x34e6d4(0x294)]()):_0x58802f=_0x251093[_0x34e6d4(0x267)](_0x48bc59,_0x1f5a7d);}else VisuMZ[_0x34e6d4(0x343)][_0x34e6d4(0x33d)][_0x34e6d4(0x168)](this,_0x3b5ca4);}},VisuMZ[_0x563755(0x343)][_0x563755(0x2ab)]=Window_StatusBase['prototype'][_0x563755(0x238)],Window_StatusBase[_0x563755(0x2ef)]['placeGauge']=function(_0x1d6555,_0x40bb46,_0x57fd63,_0x3e266a){const _0x493d0e=_0x563755;if(!this[_0x493d0e(0x21e)](_0x40bb46))return;VisuMZ['BattleSystemATB'][_0x493d0e(0x2ab)][_0x493d0e(0x168)](this,_0x1d6555,_0x40bb46,_0x57fd63,_0x3e266a);},Window_StatusBase['prototype'][_0x563755(0x21e)]=function(_0x168f3a){const _0x554906=_0x563755;if(_0x168f3a!==_0x554906(0x2ea))return!![];if(!['Window_BattleStatus',_0x554906(0x32e)][_0x554906(0x1e4)](this[_0x554906(0x334)]['name']))return![];if(!BattleManager[_0x554906(0x223)]())return![];if(!ConfigManager[_0x554906(0x298)])return![];return VisuMZ['BattleSystemATB'][_0x554906(0x181)][_0x554906(0x2c2)][_0x554906(0x32d)];},VisuMZ[_0x563755(0x343)][_0x563755(0x2f2)]=Window_Options[_0x563755(0x2ef)][_0x563755(0x1bc)],Window_Options[_0x563755(0x2ef)][_0x563755(0x1bc)]=function(){const _0x15c570=_0x563755;VisuMZ[_0x15c570(0x343)][_0x15c570(0x2f2)]['call'](this),this['addBattleSystemATBCommands']();},Window_Options['prototype'][_0x563755(0x27b)]=function(){const _0xbf99d=_0x563755;if(!BattleManager[_0xbf99d(0x223)]())return;VisuMZ[_0xbf99d(0x343)][_0xbf99d(0x181)][_0xbf99d(0x29e)]['AddOption']&&this['addBattleSystemATBShowGaugeCommand']();},Window_Options[_0x563755(0x2ef)][_0x563755(0x248)]=function(){const _0x123168=_0x563755,_0x992a80=TextManager[_0x123168(0x298)],_0x39fe1b=_0x123168(0x298);this['addCommand'](_0x992a80,_0x39fe1b);},Game_BattlerBase[_0x563755(0x2ef)]['clearFieldAtbGraphics']=function(){const _0x739822=_0x563755;delete this['_fieldAtbGaugeGraphicType'],delete this['_fieldAtbGaugeFaceName'],delete this[_0x739822(0x2c9)],delete this['_fieldAtbGaugeIconIndex'];},Game_BattlerBase[_0x563755(0x2ef)][_0x563755(0x1ed)]=function(){const _0x2a6a89=_0x563755;return this[_0x2a6a89(0x142)]===undefined&&(this[_0x2a6a89(0x142)]=this[_0x2a6a89(0x1fe)]()),this[_0x2a6a89(0x142)];},Game_BattlerBase[_0x563755(0x2ef)][_0x563755(0x1fe)]=function(){const _0x5821ee=_0x563755;return Sprite_FieldGaugeATB[_0x5821ee(0x181)][_0x5821ee(0x211)];},Game_BattlerBase[_0x563755(0x2ef)][_0x563755(0x221)]=function(){const _0x26aae5=_0x563755;return this[_0x26aae5(0x195)]===undefined&&(_0x26aae5(0x1ce)===_0x26aae5(0x242)?(this[_0x26aae5(0x31f)](),_0x4273bd[_0x26aae5(0x343)]['Scene_Boot_onDatabaseLoaded'][_0x26aae5(0x168)](this),this[_0x26aae5(0x1c4)]()):this[_0x26aae5(0x195)]=this['createFieldAtbGraphicFaceName']()),this['_fieldAtbGaugeFaceName'];},Game_BattlerBase['prototype'][_0x563755(0x2d1)]=function(){const _0x24eeed=_0x563755;return Sprite_FieldGaugeATB[_0x24eeed(0x181)]['EnemyBattlerFaceName'];},Game_BattlerBase[_0x563755(0x2ef)]['fieldAtbGraphicFaceIndex']=function(){const _0x12be49=_0x563755;return this['_fieldAtbGaugeFaceIndex']===undefined&&(this[_0x12be49(0x2c9)]=this[_0x12be49(0x1d7)]()),this[_0x12be49(0x2c9)];},Game_BattlerBase[_0x563755(0x2ef)][_0x563755(0x1d7)]=function(){const _0x4bf98f=_0x563755;return Sprite_FieldGaugeATB[_0x4bf98f(0x181)][_0x4bf98f(0x22d)];},Game_BattlerBase['prototype'][_0x563755(0x15c)]=function(){const _0x591eef=_0x563755;return this[_0x591eef(0x1dd)]===undefined&&(this[_0x591eef(0x1dd)]=this[_0x591eef(0x2fa)]()),this[_0x591eef(0x1dd)];},Game_BattlerBase['prototype'][_0x563755(0x2fa)]=function(){const _0x3be626=_0x563755;return Sprite_FieldGaugeATB['Settings'][_0x3be626(0x1fd)];},Game_BattlerBase[_0x563755(0x2ef)]['setAtbGraphicIconIndex']=function(_0x115933){const _0x57a923=_0x563755;this[_0x57a923(0x1dd)]=_0x115933;},Game_Actor[_0x563755(0x2ef)][_0x563755(0x1fe)]=function(){const _0xf65732=_0x563755,_0x557cd2=this['actor']()['note'];if(_0x557cd2['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0xf65732(0x1d2);else{if(_0x557cd2[_0xf65732(0x22e)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0xf65732(0x217);}return Sprite_FieldGaugeATB['Settings'][_0xf65732(0x22a)];},Game_Actor[_0x563755(0x2ef)][_0x563755(0x2d1)]=function(){const _0x21bf3d=_0x563755,_0x2dd1ad=this[_0x21bf3d(0x132)]()['note'];if(_0x2dd1ad[_0x21bf3d(0x22e)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if('LOuMh'!==_0x21bf3d(0x1b9))this['anchor']['x']=0.5,this[_0x21bf3d(0x1ca)]['y']=0.5;else return String(RegExp['$1']);}return this[_0x21bf3d(0x307)]();},Game_Actor['prototype']['createFieldAtbGraphicFaceIndex']=function(){const _0x5a7d58=_0x563755,_0x308517=this[_0x5a7d58(0x132)]()[_0x5a7d58(0x1bb)];if(_0x308517[_0x5a7d58(0x22e)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x5a7d58(0x25e)!==_0x5a7d58(0x2ee))return Number(RegExp['$2']);else{if(!this['showVisualAtbGauge'](_0x5b918a))return;_0x13be06[_0x5a7d58(0x343)][_0x5a7d58(0x2ab)][_0x5a7d58(0x168)](this,_0x20cb51,_0x44c9ef,_0x3462e9,_0x23687b);}}return this['faceIndex']();},Game_Actor[_0x563755(0x2ef)][_0x563755(0x2fa)]=function(){const _0x2b320b=_0x563755,_0x527de0=this['actor']()[_0x2b320b(0x1bb)];if(_0x527de0[_0x2b320b(0x22e)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x2b320b(0x181)][_0x2b320b(0x1cb)];},Game_Enemy['prototype']['createFieldAtbGraphicType']=function(){const _0x1c3897=_0x563755,_0x1430f2=this[_0x1c3897(0x145)]()['note'];if(_0x1430f2[_0x1c3897(0x22e)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if('suCGb'===_0x1c3897(0x317)){const _0x2351c7=this[_0x1c3897(0x132)]()[_0x1c3897(0x1bb)];if(_0x2351c7['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x574a2d(_0xb49d2c['$1']);return this[_0x1c3897(0x307)]();}else return _0x1c3897(0x1d2);}else{if(_0x1430f2[_0x1c3897(0x22e)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return'icon';}return Sprite_FieldGaugeATB[_0x1c3897(0x181)][_0x1c3897(0x211)];},Game_Enemy['prototype']['createFieldAtbGraphicFaceName']=function(){const _0x13390a=_0x563755,_0x4f3e1e=this['enemy']()['note'];if(_0x4f3e1e[_0x13390a(0x22e)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Sprite_FieldGaugeATB[_0x13390a(0x181)][_0x13390a(0x252)];},Game_Enemy[_0x563755(0x2ef)][_0x563755(0x1d7)]=function(){const _0xaca01c=_0x563755,_0x6d8235=this[_0xaca01c(0x145)]()['note'];if(_0x6d8235[_0xaca01c(0x22e)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Sprite_FieldGaugeATB['Settings']['EnemyBattlerFaceIndex'];},Game_Enemy['prototype'][_0x563755(0x2fa)]=function(){const _0x2f8482=_0x563755,_0x21e6ea=this['enemy']()['note'];if(_0x21e6ea[_0x2f8482(0x22e)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i)){if(_0x2f8482(0x1e1)!==_0x2f8482(0x2dc))return Number(RegExp['$1']);else _0x49193a['BattleSystemATB'][_0x2f8482(0x31e)][_0x2f8482(0x168)](this,_0x11b95b),this['applyBattleSystemATBUserEffect'](_0x3c7c3c);}return Sprite_FieldGaugeATB[_0x2f8482(0x181)][_0x2f8482(0x1fd)];},VisuMZ[_0x563755(0x343)][_0x563755(0x314)]=Scene_Battle[_0x563755(0x2ef)][_0x563755(0x1a6)],Scene_Battle[_0x563755(0x2ef)][_0x563755(0x1a6)]=function(){const _0x4eadd6=_0x563755;this[_0x4eadd6(0x31b)](),VisuMZ[_0x4eadd6(0x343)][_0x4eadd6(0x314)][_0x4eadd6(0x168)](this),this[_0x4eadd6(0x1e0)]();},Scene_Battle['prototype'][_0x563755(0x31b)]=function(){const _0x3ebce3=_0x563755;if(!BattleManager['isATB']())return;if(!Sprite_FieldGaugeATB[_0x3ebce3(0x181)][_0x3ebce3(0x2c0)])return;if(!ConfigManager[_0x3ebce3(0x298)])return;this[_0x3ebce3(0x188)]=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0x4ca5f5=this[_0x3ebce3(0x28a)](this[_0x3ebce3(0x174)]);this['addChildAt'](this[_0x3ebce3(0x188)],_0x4ca5f5);},Scene_Battle[_0x563755(0x2ef)]['createFieldGaugeSpriteATB']=function(){const _0xad4740=_0x563755;if(!BattleManager['isATB']())return;if(!Sprite_FieldGaugeATB[_0xad4740(0x181)]['UseFieldGauge'])return;if(!ConfigManager['visualAtbGauge'])return;this[_0xad4740(0x256)]=new Sprite_FieldGaugeATB(),this['_fieldGaugeATB_Container'][_0xad4740(0x19d)](this[_0xad4740(0x256)]);};function Sprite_FieldGaugeATB(){const _0x1ec04e=_0x563755;this[_0x1ec04e(0x157)](...arguments);}function _0x5f05(_0x5c17af,_0x25ef7b){const _0x1b8fa1=_0x1b8f();return _0x5f05=function(_0x5f05b6,_0x14f022){_0x5f05b6=_0x5f05b6-0x12d;let _0x3629c9=_0x1b8fa1[_0x5f05b6];return _0x3629c9;},_0x5f05(_0x5c17af,_0x25ef7b);}Sprite_FieldGaugeATB[_0x563755(0x2ef)]=Object['create'](Sprite['prototype']),Sprite_FieldGaugeATB[_0x563755(0x2ef)][_0x563755(0x334)]=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB[_0x563755(0x181)]=JsonEx[_0x563755(0x18b)](VisuMZ[_0x563755(0x343)]['Settings']['FieldGauge']),Sprite_FieldGaugeATB[_0x563755(0x2ef)][_0x563755(0x157)]=function(){const _0x14674d=_0x563755;Sprite[_0x14674d(0x2ef)][_0x14674d(0x157)][_0x14674d(0x168)](this),this['initMembers'](),this[_0x14674d(0x344)](),this[_0x14674d(0x1d9)]();},Sprite_FieldGaugeATB[_0x563755(0x2ef)][_0x563755(0x28f)]=function(){const _0x2acafd=_0x563755;this['anchor']['x']=0.5,this[_0x2acafd(0x1ca)]['y']=0.5;},Sprite_FieldGaugeATB['prototype'][_0x563755(0x28b)]=function(){const _0x5cf6cc=_0x563755;if(this[_0x5cf6cc(0x2cf)]!==undefined)return this[_0x5cf6cc(0x2cf)];const _0xefc79d=Sprite_FieldGaugeATB[_0x5cf6cc(0x181)]['DisplayPosition'];return this[_0x5cf6cc(0x2cf)]=[_0x5cf6cc(0x1f1),_0x5cf6cc(0x2bc)][_0x5cf6cc(0x1e4)](_0xefc79d),this[_0x5cf6cc(0x2cf)];},Sprite_FieldGaugeATB['prototype'][_0x563755(0x344)]=function(){const _0xed9634=_0x563755,_0x198b5a=Sprite_FieldGaugeATB[_0xed9634(0x181)][_0xed9634(0x281)][_0xed9634(0x224)]()[_0xed9634(0x265)](),_0x1983e3=Window_Base[_0xed9634(0x2ef)]['lineHeight'](),_0x169fb5=SceneManager[_0xed9634(0x1e3)][_0xed9634(0x203)][_0xed9634(0x20e)]+Math[_0xed9634(0x2a6)](_0x1983e3*0.5);this[_0xed9634(0x1fb)]=0x0,this[_0xed9634(0x192)]=0x0;switch(_0x198b5a){case'top':this[_0xed9634(0x1fb)]=Math['round'](Graphics[_0xed9634(0x2e7)]*0.5),this[_0xed9634(0x192)]=0x60;break;case _0xed9634(0x2bc):this[_0xed9634(0x1fb)]=Math['round'](Graphics[_0xed9634(0x2e7)]*0.5),this[_0xed9634(0x192)]=Graphics['boxHeight']-_0x169fb5;break;case'left':this[_0xed9634(0x1fb)]=0x50,this[_0xed9634(0x192)]=Math[_0xed9634(0x2a6)]((Graphics[_0xed9634(0x17f)]-_0x169fb5)/0x2);break;case _0xed9634(0x1e8):this[_0xed9634(0x1fb)]=Graphics['boxWidth']-0x50,this[_0xed9634(0x192)]=Math[_0xed9634(0x2a6)]((Graphics[_0xed9634(0x17f)]-_0x169fb5)/0x2);break;}this[_0xed9634(0x1fb)]+=Sprite_FieldGaugeATB[_0xed9634(0x181)]['DisplayOffsetX']||0x0,this[_0xed9634(0x192)]+=Sprite_FieldGaugeATB['Settings'][_0xed9634(0x1d1)]||0x0,this['x']=this[_0xed9634(0x1fb)],this['y']=this[_0xed9634(0x192)];},Sprite_FieldGaugeATB['prototype'][_0x563755(0x1d9)]=function(){const _0x51fe5f=_0x563755;this[_0x51fe5f(0x17e)](),this[_0x51fe5f(0x2e2)](),this['createBattlerContainer']();},Sprite_FieldGaugeATB['prototype'][_0x563755(0x17e)]=function(){const _0x518cd0=_0x563755;this['_skinSprite']=new Sprite(),this[_0x518cd0(0x321)][_0x518cd0(0x1ca)]['x']=0.5,this[_0x518cd0(0x321)][_0x518cd0(0x1ca)]['y']=0.5,this[_0x518cd0(0x19d)](this[_0x518cd0(0x321)]);const _0x3ad81f=Sprite_FieldGaugeATB['Settings'][_0x518cd0(0x144)];if(_0x3ad81f)this['_skinSprite'][_0x518cd0(0x1e2)]=ImageManager['loadSystem'](_0x3ad81f);},Sprite_FieldGaugeATB[_0x563755(0x2ef)][_0x563755(0x2e2)]=function(){const _0x37c891=_0x563755;this[_0x37c891(0x1b8)]=new Sprite(),this[_0x37c891(0x19d)](this[_0x37c891(0x1b8)]),this['createGaugeBitmap']();},Sprite_FieldGaugeATB[_0x563755(0x2ef)][_0x563755(0x1ac)]=function(){const _0x53e1c0=_0x563755,_0x54b774=Sprite_FieldGaugeATB['Settings'],_0x42c12c=this[_0x53e1c0(0x28b)](),_0x5bb6f3=_0x42c12c?_0x54b774[_0x53e1c0(0x2f6)]:_0x54b774[_0x53e1c0(0x2ba)],_0x33fe37=_0x42c12c?_0x54b774[_0x53e1c0(0x2ba)]:_0x54b774['GaugeLengthVert'];this[_0x53e1c0(0x1b8)][_0x53e1c0(0x1e2)]=new Bitmap(_0x5bb6f3,_0x33fe37),this['drawGaugeBitmap'](),this[_0x53e1c0(0x1b8)]['x']=Math[_0x53e1c0(0x12f)](_0x5bb6f3/-0x2),this['_gaugeSprite']['y']=Math[_0x53e1c0(0x12f)](_0x33fe37/-0x2);},Sprite_FieldGaugeATB['prototype'][_0x563755(0x1fc)]=function(){const _0x7b0e86=_0x563755;if(!Sprite_FieldGaugeATB[_0x7b0e86(0x181)]['DrawGauge'])return;const _0x1c7d9b=Sprite_FieldGaugeATB['Settings'],_0x386b04=this[_0x7b0e86(0x1b8)]['bitmap'],_0x46201c=_0x386b04[_0x7b0e86(0x25a)],_0x4cfc25=_0x386b04[_0x7b0e86(0x20e)],_0x5e87ea=ColorManager['gaugeBackColor'](),_0x4e3341=ColorManager[_0x7b0e86(0x27e)](),_0x475a26=ColorManager[_0x7b0e86(0x249)](),_0x4f9cbc=ColorManager['atbColor'](_0x7b0e86(0x213)),_0x5a7d67=ColorManager[_0x7b0e86(0x2ce)](_0x7b0e86(0x2b6)),_0x5dbf42=this[_0x7b0e86(0x28b)](),_0x19b1c8=_0x1c7d9b['GaugeDirection'],_0x5c10cd=_0x1c7d9b[_0x7b0e86(0x28d)][_0x7b0e86(0x1f0)](0x0,0x1),_0x418e27=Math[_0x7b0e86(0x12f)](((_0x5dbf42?_0x46201c:_0x4cfc25)-0x2)*_0x5c10cd);_0x386b04[_0x7b0e86(0x2b1)](0x0,0x0,_0x46201c,_0x4cfc25,_0x5e87ea);let _0xaa34bb=0x0,_0xff4b0a=0x0,_0x1a9288=0x0,_0x476ead=0x0;if(_0x5dbf42&&_0x19b1c8)_0xaa34bb=_0x418e27-0x1,_0x1a9288=_0x46201c-0x3-_0xaa34bb,_0x386b04[_0x7b0e86(0x323)](0x1,0x1,_0xaa34bb,_0x4cfc25-0x2,_0x4e3341,_0x475a26,![]),_0x386b04[_0x7b0e86(0x323)](0x2+_0xaa34bb,0x1,_0x1a9288,_0x4cfc25-0x2,_0x4f9cbc,_0x5a7d67,![]);else{if(_0x5dbf42&&!_0x19b1c8)_0xaa34bb=_0x418e27-0x1,_0x1a9288=_0x46201c-0x3-_0xaa34bb,_0x386b04['gradientFillRect'](0x2+_0x1a9288,0x1,_0xaa34bb,_0x4cfc25-0x2,_0x4e3341,_0x475a26,![]),_0x386b04[_0x7b0e86(0x323)](0x1,0x1,_0x1a9288,_0x4cfc25-0x2,_0x4f9cbc,_0x5a7d67,![]);else{if(!_0x5dbf42&&_0x19b1c8)_0xff4b0a=_0x418e27-0x1,_0x476ead=_0x4cfc25-0x3-_0xff4b0a,_0x386b04['gradientFillRect'](0x1,0x1,_0x46201c-0x2,_0xff4b0a,_0x4e3341,_0x475a26,!![]),_0x386b04[_0x7b0e86(0x323)](0x1,0x2+_0xff4b0a,_0x46201c-0x2,_0x476ead,_0x4f9cbc,_0x5a7d67,!![]);else!_0x5dbf42&&!_0x19b1c8&&(_0xff4b0a=_0x418e27-0x1,_0x476ead=_0x4cfc25-0x3-_0xff4b0a,_0x386b04['gradientFillRect'](0x1,0x2+_0x476ead,_0x46201c-0x2,_0xff4b0a,_0x4e3341,_0x475a26,!![]),_0x386b04[_0x7b0e86(0x323)](0x1,0x1,_0x46201c-0x2,_0x476ead,_0x4f9cbc,_0x5a7d67,!![]));}}},Sprite_FieldGaugeATB[_0x563755(0x2ef)][_0x563755(0x1c7)]=function(){const _0x48ffc2=_0x563755;if(this[_0x48ffc2(0x2e1)]){if(_0x48ffc2(0x2bd)!==_0x48ffc2(0x172))this[_0x48ffc2(0x1b8)][_0x48ffc2(0x1c3)](this[_0x48ffc2(0x2e1)]);else return _0x2bf338[_0x48ffc2(0x343)]['Settings'][_0x48ffc2(0x2e8)][_0x48ffc2(0x315)][_0x48ffc2(0x168)](this,this);}this[_0x48ffc2(0x2e1)]=new Sprite(),this[_0x48ffc2(0x1b8)]['addChild'](this['_battlerContainer']),this['createBattlerSprites']();},Sprite_FieldGaugeATB[_0x563755(0x2ef)][_0x563755(0x205)]=function(){const _0x272c52=_0x563755;this[_0x272c52(0x19a)](),this['createActorSprites']();},Sprite_FieldGaugeATB[_0x563755(0x2ef)][_0x563755(0x19a)]=function(){const _0x397472=_0x563755,_0x827b5f=$gameTroop[_0x397472(0x2dd)](),_0x88436=_0x827b5f[_0x397472(0x2ac)];for(let _0x19578c=0x0;_0x19578c<_0x88436;_0x19578c++){this['createBattlerSprite'](_0x19578c,$gameTroop);}},Sprite_FieldGaugeATB[_0x563755(0x2ef)][_0x563755(0x159)]=function(){const _0x228fea=_0x563755,_0x33827e=$gameParty[_0x228fea(0x1f8)]();for(let _0x240905=0x0;_0x240905<_0x33827e;_0x240905++){_0x228fea(0x16c)!==_0x228fea(0x16c)?_0x214908=_0xd18cd9['max'](_0x4f587a,_0x8668e8):this[_0x228fea(0x296)](_0x240905,$gameParty);}},Sprite_FieldGaugeATB['prototype'][_0x563755(0x296)]=function(_0x25c379,_0xb5982){const _0x195437=_0x563755,_0x105e3f=new Sprite_FieldMarkerATB(_0x25c379,_0xb5982,this[_0x195437(0x1b8)]);this[_0x195437(0x2e1)][_0x195437(0x19d)](_0x105e3f);},Sprite_FieldGaugeATB[_0x563755(0x2ef)][_0x563755(0x1f6)]=function(){const _0x324dd8=_0x563755;Sprite[_0x324dd8(0x2ef)][_0x324dd8(0x1f6)]['call'](this),this[_0x324dd8(0x18e)](),this[_0x324dd8(0x165)](),this[_0x324dd8(0x239)]();},Sprite_FieldGaugeATB[_0x563755(0x2ef)]['updatePosition']=function(){const _0x2df1e8=_0x563755,_0xa34d72=Sprite_FieldGaugeATB[_0x2df1e8(0x181)];if(_0xa34d72[_0x2df1e8(0x281)]!==_0x2df1e8(0x1f1))return;if(!_0xa34d72[_0x2df1e8(0x32c)])return;const _0x238cca=SceneManager['_scene'][_0x2df1e8(0x2f7)];if(!_0x238cca)return;_0x238cca[_0x2df1e8(0x178)]?(this['x']=this[_0x2df1e8(0x1fb)]+(_0xa34d72[_0x2df1e8(0x33e)]||0x0),this['y']=this[_0x2df1e8(0x192)]+(_0xa34d72[_0x2df1e8(0x14f)]||0x0)):(this['x']=this[_0x2df1e8(0x1fb)],this['y']=this[_0x2df1e8(0x192)]);const _0x552fad=SceneManager[_0x2df1e8(0x1e3)][_0x2df1e8(0x174)];this['x']+=_0x552fad['x'],this['y']+=_0x552fad['y'];},Sprite_FieldGaugeATB['prototype'][_0x563755(0x165)]=function(){const _0x30bd1f=_0x563755;if(!this['_battlerContainer'])return;const _0x561daf=this[_0x30bd1f(0x2e1)][_0x30bd1f(0x234)];if(!_0x561daf)return;_0x561daf[_0x30bd1f(0x143)](this['compareBattlerSprites']['bind'](this));},Sprite_FieldGaugeATB[_0x563755(0x2ef)][_0x563755(0x12d)]=function(_0x31137b,_0x2bf104){const _0x227a92=_0x563755,_0x116269=this[_0x227a92(0x28b)](),_0x35e170=Sprite_FieldGaugeATB[_0x227a92(0x181)][_0x227a92(0x276)];if(_0x116269&&_0x35e170)return _0x31137b['x']-_0x2bf104['x'];else{if(_0x116269&&!_0x35e170){if(_0x227a92(0x16a)!==_0x227a92(0x16a)){_0x2246f7[_0x227a92(0x1cd)](_0x521212,_0x394abe);const _0x358a00=_0x42f9b4[_0x227a92(0x254)];_0x1a59c8[_0x227a92(0x29f)](_0x358a00);}else return _0x2bf104['x']-_0x31137b['x'];}else{if(!_0x116269&&_0x35e170)return _0x31137b['y']-_0x2bf104['y'];else{if(!_0x116269&&!_0x35e170)return _0x2bf104['y']-_0x31137b['y'];}}}},Sprite_FieldGaugeATB[_0x563755(0x2ef)][_0x563755(0x239)]=function(){const _0x59f38f=_0x563755;this['visible']=$gameSystem[_0x59f38f(0x1fa)]();};function Sprite_FieldMarkerATB(){this['initialize'](...arguments);}Sprite_FieldMarkerATB[_0x563755(0x2ef)]=Object[_0x563755(0x154)](Sprite_Clickable[_0x563755(0x2ef)]),Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x334)]=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x157)]=function(_0x5fe615,_0x206c63,_0x533fb4){const _0x33f9f6=_0x563755;this['_index']=_0x5fe615,this[_0x33f9f6(0x1a9)]=_0x206c63,this[_0x33f9f6(0x1b8)]=_0x533fb4,Sprite_Clickable['prototype']['initialize'][_0x33f9f6(0x168)](this),this[_0x33f9f6(0x28f)](),this[_0x33f9f6(0x1d9)](),this[_0x33f9f6(0x1a0)]=this[_0x33f9f6(0x282)]();},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x28f)]=function(){const _0x3b937=_0x563755;this[_0x3b937(0x1ca)]['x']=0.5,this[_0x3b937(0x1ca)]['y']=0.5;},Sprite_FieldMarkerATB['prototype']['createChildren']=function(){const _0xbf72db=_0x563755;this[_0xbf72db(0x30a)](),this[_0xbf72db(0x2fb)](),this[_0xbf72db(0x2a4)](),this['createLetterSprite'](),this['createArrowSprite'](),this[_0xbf72db(0x1a2)](!![]);},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x30a)]=function(){const _0x34b642=_0x563755;if(!Sprite_FieldGaugeATB[_0x34b642(0x181)][_0x34b642(0x2b2)])return;const _0x2c30c5=Sprite_FieldGaugeATB[_0x34b642(0x181)],_0x4a3f93=this[_0x34b642(0x1a9)]===$gameParty?_0x34b642(0x2d4):_0x34b642(0x1f3),_0x592733='%1SystemBg'[_0x34b642(0x2f3)](_0x4a3f93),_0x1994d8=new Sprite();_0x1994d8[_0x34b642(0x1ca)]['x']=this[_0x34b642(0x1ca)]['x'],_0x1994d8[_0x34b642(0x1ca)]['y']=this[_0x34b642(0x1ca)]['y'];if(_0x2c30c5[_0x592733])_0x1994d8['bitmap']=ImageManager[_0x34b642(0x1e6)](_0x2c30c5[_0x592733]);else{const _0x3f6b4c=_0x2c30c5[_0x34b642(0x214)];_0x1994d8['bitmap']=new Bitmap(_0x3f6b4c,_0x3f6b4c);const _0x3a6921=ColorManager['getColor'](_0x2c30c5[_0x34b642(0x24c)[_0x34b642(0x2f3)](_0x4a3f93)]),_0x21a3f0=ColorManager['getColor'](_0x2c30c5['%1BgColor2'[_0x34b642(0x2f3)](_0x4a3f93)]);_0x1994d8['bitmap']['gradientFillRect'](0x0,0x0,_0x3f6b4c,_0x3f6b4c,_0x3a6921,_0x21a3f0,!![]);}this['_backgroundSprite']=_0x1994d8,this[_0x34b642(0x19d)](this[_0x34b642(0x324)]),this[_0x34b642(0x25a)]=this[_0x34b642(0x324)][_0x34b642(0x25a)],this[_0x34b642(0x20e)]=this[_0x34b642(0x324)][_0x34b642(0x20e)];},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x2fb)]=function(){const _0x32d3f2=_0x563755,_0x37ee19=new Sprite();_0x37ee19[_0x32d3f2(0x1ca)]['x']=this[_0x32d3f2(0x1ca)]['x'],_0x37ee19[_0x32d3f2(0x1ca)]['y']=this[_0x32d3f2(0x1ca)]['y'],this[_0x32d3f2(0x137)]=_0x37ee19,this[_0x32d3f2(0x19d)](this[_0x32d3f2(0x137)]),this['processUpdateGraphic']();},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x2a4)]=function(){const _0x4a5cba=_0x563755;if(!Sprite_FieldGaugeATB[_0x4a5cba(0x181)][_0x4a5cba(0x23e)])return;const _0x37c339=Sprite_FieldGaugeATB[_0x4a5cba(0x181)],_0x451be9=this['_unit']===$gameParty?'Actor':_0x4a5cba(0x1f3),_0x1026f1=_0x4a5cba(0x288)[_0x4a5cba(0x2f3)](_0x451be9),_0x1eaca6=new Sprite();_0x1eaca6['anchor']['x']=this['anchor']['x'],_0x1eaca6['anchor']['y']=this[_0x4a5cba(0x1ca)]['y'];if(_0x37c339[_0x1026f1])_0x1eaca6[_0x4a5cba(0x1e2)]=ImageManager['loadSystem'](_0x37c339[_0x1026f1]);else{if(_0x4a5cba(0x2b9)!=='eMOYl')_0x4db887=_0x233929-0x1,_0x47d1f4=_0x55ed35-0x3-_0x100d31,_0x1de859[_0x4a5cba(0x323)](0x1,0x1,_0xa9722,_0x19f9b2-0x2,_0x10e87e,_0x53d904,![]),_0x1828c1['gradientFillRect'](0x2+_0x5c796e,0x1,_0x10500f,_0x150bd2-0x2,_0x71f70c,_0x3a9ad1,![]);else{let _0x4b04d7=_0x37c339[_0x4a5cba(0x214)],_0x1a7e6d=_0x37c339[_0x4a5cba(0x32b)];_0x1eaca6[_0x4a5cba(0x1e2)]=new Bitmap(_0x4b04d7,_0x4b04d7);const _0x5dbeba=_0x4a5cba(0x227),_0x1b95fc=ColorManager[_0x4a5cba(0x326)](_0x37c339[_0x4a5cba(0x235)['format'](_0x451be9)]);_0x1eaca6[_0x4a5cba(0x1e2)][_0x4a5cba(0x2b1)](0x0,0x0,_0x4b04d7,_0x4b04d7,_0x5dbeba),_0x4b04d7-=0x2,_0x1eaca6[_0x4a5cba(0x1e2)][_0x4a5cba(0x2b1)](0x1,0x1,_0x4b04d7,_0x4b04d7,_0x1b95fc),_0x4b04d7-=_0x1a7e6d*0x2,_0x1eaca6[_0x4a5cba(0x1e2)][_0x4a5cba(0x2b1)](0x1+_0x1a7e6d,0x1+_0x1a7e6d,_0x4b04d7,_0x4b04d7,_0x5dbeba),_0x4b04d7-=0x2,_0x1a7e6d+=0x1,_0x1eaca6[_0x4a5cba(0x1e2)][_0x4a5cba(0x26b)](0x1+_0x1a7e6d,0x1+_0x1a7e6d,_0x4b04d7,_0x4b04d7);}}this[_0x4a5cba(0x324)]=_0x1eaca6,this[_0x4a5cba(0x19d)](this[_0x4a5cba(0x324)]);},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x19b)]=function(){const _0x5429d6=_0x563755,_0xbda4b2=Sprite_FieldGaugeATB[_0x5429d6(0x181)];if(!_0xbda4b2[_0x5429d6(0x2f4)])return;if(this['_unit']===$gameParty)return;const _0x126881=_0xbda4b2[_0x5429d6(0x214)],_0x3c208c=new Sprite();_0x3c208c[_0x5429d6(0x1ca)]['x']=this['anchor']['x'],_0x3c208c['anchor']['y']=this['anchor']['y'],_0x3c208c['bitmap']=new Bitmap(_0x126881,_0x126881),this[_0x5429d6(0x1db)]=_0x3c208c,this[_0x5429d6(0x19d)](this[_0x5429d6(0x1db)]);},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x316)]=function(){const _0xb929f5=_0x563755,_0x4db7f8=Sprite_FieldGaugeATB['Settings'];if(!_0x4db7f8['ShowMarkerArrow'])return;const _0x5a75ff=new Sprite();_0x5a75ff[_0xb929f5(0x1ca)]['x']=this[_0xb929f5(0x1ca)]['x'],_0x5a75ff[_0xb929f5(0x1ca)]['y']=this[_0xb929f5(0x1ca)]['y'],this[_0xb929f5(0x269)](_0x5a75ff),this['_arrowSprite']=_0x5a75ff,this[_0xb929f5(0x19d)](this[_0xb929f5(0x216)]);},Sprite_FieldMarkerATB['prototype'][_0x563755(0x269)]=function(_0x1f9f23){const _0xa86e3a=_0x563755,_0x488f60=Sprite_FieldGaugeATB['Settings'],_0x329834=_0x488f60[_0xa86e3a(0x214)],_0x36aa56=Math['round'](_0x329834/0x2),_0x2b12b8=this[_0xa86e3a(0x28b)](),_0x1573cb=this[_0xa86e3a(0x1a9)]===$gameParty?_0xa86e3a(0x2d4):_0xa86e3a(0x1f3),_0x4d0ed2=_0x488f60['%1Side'['format'](_0x1573cb)];_0x1f9f23['bitmap']=ImageManager[_0xa86e3a(0x1e6)](_0x488f60[_0xa86e3a(0x231)]);const _0x20908d=0x18,_0x591592=_0x20908d/0x2,_0x2c260d=0x60+_0x20908d,_0x30e935=0x0+_0x20908d;if(_0x2b12b8&&_0x4d0ed2)_0x1f9f23[_0xa86e3a(0x283)](_0x2c260d+_0x591592,_0x30e935+_0x591592+_0x20908d,_0x20908d,_0x591592),_0x1f9f23['y']+=_0x36aa56,_0x1f9f23[_0xa86e3a(0x1ca)]['y']=0x0;else{if(_0x2b12b8&&!_0x4d0ed2)_0x1f9f23[_0xa86e3a(0x283)](_0x2c260d+_0x591592,_0x30e935,_0x20908d,_0x591592),_0x1f9f23['y']-=_0x36aa56,_0x1f9f23[_0xa86e3a(0x1ca)]['y']=0x1;else{if(!_0x2b12b8&&_0x4d0ed2)_0x1f9f23[_0xa86e3a(0x283)](_0x2c260d,_0x30e935+_0x591592,_0x591592,_0x20908d),_0x1f9f23['x']-=Math[_0xa86e3a(0x12f)](_0x36aa56*1.75),_0x1f9f23['anchor']['x']=0x0;else{if(!_0x2b12b8&&!_0x4d0ed2){if(_0xa86e3a(0x1da)!==_0xa86e3a(0x1da)){const _0x3fe9b9=_0x5b575d[_0xa86e3a(0x181)];if(!_0x3fe9b9[_0xa86e3a(0x2f4)])return;if(this[_0xa86e3a(0x1a9)]===_0x262ab3)return;const _0x3da753=_0x3fe9b9[_0xa86e3a(0x214)],_0x229f3c=new _0x50f1f8();_0x229f3c[_0xa86e3a(0x1ca)]['x']=this[_0xa86e3a(0x1ca)]['x'],_0x229f3c[_0xa86e3a(0x1ca)]['y']=this[_0xa86e3a(0x1ca)]['y'],_0x229f3c[_0xa86e3a(0x1e2)]=new _0x2ca914(_0x3da753,_0x3da753),this[_0xa86e3a(0x1db)]=_0x229f3c,this[_0xa86e3a(0x19d)](this['_letterSprite']);}else _0x1f9f23['setFrame'](_0x2c260d+_0x20908d+_0x591592,_0x30e935+_0x591592,_0x591592,_0x20908d),_0x1f9f23['x']+=Math[_0xa86e3a(0x12f)](_0x36aa56*1.75),_0x1f9f23['anchor']['x']=0x1;}}}}},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x166)]=function(){const _0x14466a=_0x563755;if(this[_0x14466a(0x1a9)]===$gameParty)return $gameParty['battleMembers']()[this['_index']];else{if(_0x14466a(0x2a8)===_0x14466a(0x2a8))return $gameTroop[_0x14466a(0x2dd)]()[this['_index']];else{if(!_0x20715d[_0x14466a(0x223)]())return;if(!_0x3bbb55[_0x14466a(0x181)][_0x14466a(0x2c0)])return;if(!_0x369aa9[_0x14466a(0x298)])return;this['_fieldGaugeATB']=new _0xaae8f2(),this[_0x14466a(0x188)][_0x14466a(0x19d)](this[_0x14466a(0x256)]);}}},Sprite_FieldMarkerATB[_0x563755(0x2ef)]['update']=function(){const _0x26dcfe=_0x563755;Sprite_Clickable[_0x26dcfe(0x2ef)]['update'][_0x26dcfe(0x168)](this),this[_0x26dcfe(0x135)](),this['updatePositionOffset'](),this[_0x26dcfe(0x1a2)](),this['updateGraphic'](),this['updateGraphicHue'](),this['updateLetter'](),this[_0x26dcfe(0x2b3)]();},Sprite_FieldMarkerATB[_0x563755(0x2ef)]['updateOpacity']=function(){const _0x25d1ea=_0x563755,_0x1aeebb=this[_0x25d1ea(0x282)](),_0x52213e=Sprite_FieldGaugeATB['Settings']['OpacityRate'];if(this[_0x25d1ea(0x1a0)]>_0x1aeebb)this[_0x25d1ea(0x1a0)]=Math[_0x25d1ea(0x267)](_0x1aeebb,this['opacity']-_0x52213e);else this[_0x25d1ea(0x1a0)]<_0x1aeebb&&(this['opacity']=Math['min'](_0x1aeebb,this['opacity']+_0x52213e));},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x282)]=function(){const _0x37f1d4=this['battler']();if(!_0x37f1d4)return 0x0;if(_0x37f1d4['isHidden']())return 0x0;if(_0x37f1d4['isDead']())return 0x0;return 0xff;},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x28b)]=function(){const _0x173bf9=_0x563755;if(this[_0x173bf9(0x2cf)]!==undefined)return this[_0x173bf9(0x2cf)];const _0x27b90b=Sprite_FieldGaugeATB[_0x173bf9(0x181)][_0x173bf9(0x281)];return this['_horz']=[_0x173bf9(0x1f1),_0x173bf9(0x2bc)][_0x173bf9(0x1e4)](_0x27b90b),this[_0x173bf9(0x2cf)];},Sprite_FieldMarkerATB['prototype'][_0x563755(0x305)]=function(){const _0x534371=_0x563755,_0x34a7ce=Sprite_FieldGaugeATB[_0x534371(0x181)],_0x2c21a4=this[_0x534371(0x28b)](),_0x5d25c1=this[_0x534371(0x1a9)]===$gameParty?'Actor':_0x534371(0x1f3),_0x2d7448=_0x34a7ce[_0x534371(0x2ca)],_0x135c70=_0x34a7ce['%1Side'[_0x534371(0x2f3)](_0x5d25c1)];_0x2c21a4?'mtiYG'!==_0x534371(0x1aa)?this[_0x534371(0x179)]=_0x198215[_0x534371(0x223)]():(this['y']=_0x34a7ce['GaugeThick']/0x2,this['y']+=_0x135c70?-_0x2d7448:_0x2d7448):(this['x']=_0x34a7ce[_0x534371(0x2ba)]/0x2,this['x']+=_0x135c70?_0x2d7448:-_0x2d7448);},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x1a2)]=function(_0x183597){const _0x34d2d7=_0x563755,_0x2f2fc1=this['battler']();if(!_0x2f2fc1)return;const _0x1eb2ab=Sprite_FieldGaugeATB[_0x34d2d7(0x181)],_0x2491c0=this['isGaugeHorizontal'](),_0x434510=this[_0x34d2d7(0x1a1)](),_0x45430e=_0x183597?Infinity:_0x1eb2ab[_0x34d2d7(0x2b8)];if(_0x2491c0&&this['x']!==_0x434510){if(this['x']>_0x434510)this['x']=Math[_0x34d2d7(0x267)](_0x434510,this['x']-_0x45430e);if(this['x']<_0x434510)this['x']=Math[_0x34d2d7(0x200)](_0x434510,this['x']+_0x45430e);}else{if(!_0x2491c0&&this['x']!==_0x434510){if(this['y']>_0x434510)this['y']=Math[_0x34d2d7(0x267)](_0x434510,this['y']-_0x45430e);if(this['y']<_0x434510)this['y']=Math[_0x34d2d7(0x200)](_0x434510,this['y']+_0x45430e);}}},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x1a1)]=function(){const _0x22b3ab=_0x563755,_0x359069=Sprite_FieldGaugeATB[_0x22b3ab(0x181)],_0x5e49b6=this['battler'](),_0x2be112=this[_0x22b3ab(0x28b)](),_0x225ad3=this[_0x22b3ab(0x1b8)]['bitmap']['width'],_0x256184=this['_gaugeSprite'][_0x22b3ab(0x1e2)][_0x22b3ab(0x20e)],_0x3547a1=_0x359069[_0x22b3ab(0x28d)]['clamp'](0x0,0x1),_0x36410a=_0x359069[_0x22b3ab(0x276)];let _0x143be8=_0x5e49b6[_0x22b3ab(0x1b1)]()*_0x3547a1;_0x143be8+=(0x1-_0x3547a1)*_0x5e49b6[_0x22b3ab(0x29c)]();if(_0x5e49b6===BattleManager[_0x22b3ab(0x232)])_0x143be8=0x1;if(!_0x36410a)_0x143be8=0x1-_0x143be8;let _0xd15052=0x0;if(_0x2be112)_0xd15052=_0x143be8*_0x225ad3;else{if(!_0x2be112){if('ldmkN'===_0x22b3ab(0x2bb))return _0x225ef0(_0x3b5acc['$1']);else _0xd15052=_0x143be8*_0x256184;}}return Math[_0x22b3ab(0x2a6)](_0xd15052);},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x28c)]=function(){const _0x1fa7e3=_0x563755,_0x18d21b=this[_0x1fa7e3(0x166)]();if(!_0x18d21b)return;const _0x56f2ee=Sprite_FieldGaugeATB['Settings'],_0x17976d=this[_0x1fa7e3(0x1a9)]===$gameParty?_0x1fa7e3(0x2d4):_0x1fa7e3(0x1f3);let _0x42c63c=_0x18d21b[_0x1fa7e3(0x1ed)]();if(_0x18d21b[_0x1fa7e3(0x226)]()&&_0x42c63c===_0x1fa7e3(0x145))_0x1fa7e3(0x325)!==_0x1fa7e3(0x320)?_0x42c63c=_0x1fa7e3(0x1d2):this['visualAtbGauge']=!![];else _0x18d21b[_0x1fa7e3(0x1d4)]()&&_0x42c63c===_0x1fa7e3(0x20c)&&(_0x42c63c=_0x1fa7e3(0x145));if(this[_0x1fa7e3(0x198)]!==_0x42c63c)return this[_0x1fa7e3(0x15a)]();switch(this[_0x1fa7e3(0x198)]){case _0x1fa7e3(0x1d2):if(this[_0x1fa7e3(0x285)]!==_0x18d21b[_0x1fa7e3(0x221)]()){if(_0x1fa7e3(0x153)===_0x1fa7e3(0x153))return this['processUpdateGraphic']();else _0xfb004f=_0x1fa7e3(0x1d2);}if(this[_0x1fa7e3(0x23f)]!==_0x18d21b[_0x1fa7e3(0x2ae)]())return _0x1fa7e3(0x14b)===_0x1fa7e3(0x185)?![]:this[_0x1fa7e3(0x15a)]();break;case _0x1fa7e3(0x217):if(this['_graphicIconIndex']!==_0x18d21b[_0x1fa7e3(0x15c)]())return this[_0x1fa7e3(0x15a)]();break;case _0x1fa7e3(0x145):if(_0x18d21b['hasSvBattler']()){if('smWHy'!==_0x1fa7e3(0x270))return _0x203a97[_0x1fa7e3(0x343)][_0x1fa7e3(0x181)][_0x1fa7e3(0x2e8)]['TpbCastTimeJS'][_0x1fa7e3(0x168)](this,this);else{if(this[_0x1fa7e3(0x295)]!==_0x18d21b[_0x1fa7e3(0x23c)]())return this[_0x1fa7e3(0x15a)]();}}else{if(this[_0x1fa7e3(0x332)]!==_0x18d21b[_0x1fa7e3(0x1ad)]())return this[_0x1fa7e3(0x15a)]();}break;case _0x1fa7e3(0x20c):if(_0x18d21b[_0x1fa7e3(0x226)]()){if(this[_0x1fa7e3(0x295)]!==_0x18d21b['battlerName']()){if(_0x1fa7e3(0x311)===_0x1fa7e3(0x180))this[_0x1fa7e3(0x20b)]();else return this[_0x1fa7e3(0x15a)]();}}else{if(this[_0x1fa7e3(0x332)]!==_0x18d21b[_0x1fa7e3(0x1ad)]())return this[_0x1fa7e3(0x15a)]();}break;}},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x15a)]=function(){const _0x51f1e6=_0x563755,_0x5378e5=this[_0x51f1e6(0x166)]();if(!_0x5378e5)return;this['_graphicType']=_0x5378e5[_0x51f1e6(0x1ed)]();if(_0x5378e5[_0x51f1e6(0x226)]()&&this[_0x51f1e6(0x198)]==='enemy')this[_0x51f1e6(0x198)]=_0x51f1e6(0x1d2);else _0x5378e5[_0x51f1e6(0x1d4)]()&&this[_0x51f1e6(0x198)]==='svactor'&&(this[_0x51f1e6(0x198)]=_0x51f1e6(0x145));let _0x448a5e;switch(this[_0x51f1e6(0x198)]){case _0x51f1e6(0x1d2):this[_0x51f1e6(0x285)]=_0x5378e5['fieldAtbGraphicFaceName'](),this[_0x51f1e6(0x23f)]=_0x5378e5[_0x51f1e6(0x2ae)](),_0x448a5e=ImageManager['loadFace'](this[_0x51f1e6(0x285)]),_0x448a5e[_0x51f1e6(0x2a0)](this[_0x51f1e6(0x310)][_0x51f1e6(0x1bf)](this,_0x448a5e));break;case _0x51f1e6(0x217):this[_0x51f1e6(0x21c)]=_0x5378e5[_0x51f1e6(0x15c)](),_0x448a5e=ImageManager[_0x51f1e6(0x1e6)](_0x51f1e6(0x319)),_0x448a5e[_0x51f1e6(0x2a0)](this[_0x51f1e6(0x14c)][_0x51f1e6(0x1bf)](this,_0x448a5e));break;case _0x51f1e6(0x145):if(_0x5378e5[_0x51f1e6(0x30d)]()){if(_0x51f1e6(0x1e7)!=='gVUbV'){const _0x45c803=_0x1ac8e5[_0x51f1e6(0x181)],_0x2d18a1=_0x45c803[_0x51f1e6(0x214)],_0x5249ff=this[_0x51f1e6(0x21c)];this[_0x51f1e6(0x137)][_0x51f1e6(0x1e2)]=new _0x2d4abe(_0x2d18a1,_0x2d18a1);const _0x693806=this['_graphicSprite'][_0x51f1e6(0x1e2)],_0x3424bd=_0x2a4f2f[_0x51f1e6(0x201)],_0x54834e=_0x2554a7['iconHeight'],_0x5d3333=_0x5249ff%0x10*_0x3424bd,_0x5d2b63=_0x2a8c11[_0x51f1e6(0x215)](_0x5249ff/0x10)*_0x54834e;_0x693806[_0x51f1e6(0x16e)](_0x2be129,_0x5d3333,_0x5d2b63,_0x3424bd,_0x54834e,0x0,0x0,_0x2d18a1,_0x2d18a1);}else this[_0x51f1e6(0x295)]=_0x5378e5[_0x51f1e6(0x23c)](),_0x448a5e=ImageManager[_0x51f1e6(0x170)](this[_0x51f1e6(0x295)]),_0x448a5e[_0x51f1e6(0x2a0)](this['changeSvActorGraphicBitmap'][_0x51f1e6(0x1bf)](this,_0x448a5e));}else $gameSystem[_0x51f1e6(0x2a2)]()?_0x51f1e6(0x13e)===_0x51f1e6(0x13e)?(this[_0x51f1e6(0x332)]=_0x5378e5[_0x51f1e6(0x1ad)](),_0x448a5e=ImageManager[_0x51f1e6(0x19e)](this[_0x51f1e6(0x332)]),_0x448a5e['addLoadListener'](this['changeEnemyGraphicBitmap'][_0x51f1e6(0x1bf)](this,_0x448a5e))):(delete this[_0x51f1e6(0x142)],delete this[_0x51f1e6(0x195)],delete this[_0x51f1e6(0x2c9)],delete this['_fieldAtbGaugeIconIndex']):(this[_0x51f1e6(0x332)]=_0x5378e5[_0x51f1e6(0x1ad)](),_0x448a5e=ImageManager[_0x51f1e6(0x190)](this[_0x51f1e6(0x332)]),_0x448a5e[_0x51f1e6(0x2a0)](this[_0x51f1e6(0x25f)]['bind'](this,_0x448a5e)));break;case _0x51f1e6(0x20c):this[_0x51f1e6(0x295)]=_0x5378e5[_0x51f1e6(0x1ad)](),_0x448a5e=ImageManager[_0x51f1e6(0x170)](this[_0x51f1e6(0x295)]),_0x448a5e[_0x51f1e6(0x2a0)](this[_0x51f1e6(0x306)]['bind'](this,_0x448a5e));break;}},Sprite_FieldMarkerATB[_0x563755(0x2ef)]['changeFaceGraphicBitmap']=function(_0xf86d27){const _0x5cf3b2=_0x563755,_0x323a62=Sprite_FieldGaugeATB[_0x5cf3b2(0x181)],_0x4cc15c=_0x323a62['MarkerSize'],_0x57eff1=this[_0x5cf3b2(0x23f)];this[_0x5cf3b2(0x137)]['bitmap']=new Bitmap(_0x4cc15c,_0x4cc15c);const _0x18a2b3=this['_graphicSprite'][_0x5cf3b2(0x1e2)],_0x25ac12=ImageManager['faceWidth'],_0xe4191=ImageManager[_0x5cf3b2(0x1d0)],_0x292150=ImageManager[_0x5cf3b2(0x186)],_0x275c61=ImageManager['faceHeight'],_0x40f9cb=_0x57eff1%0x4*_0x25ac12+(_0x25ac12-_0x292150)/0x2,_0x5cb773=Math[_0x5cf3b2(0x215)](_0x57eff1/0x4)*_0xe4191+(_0xe4191-_0x275c61)/0x2;_0x18a2b3[_0x5cf3b2(0x16e)](_0xf86d27,_0x40f9cb,_0x5cb773,_0x292150,_0x275c61,0x0,0x0,_0x4cc15c,_0x4cc15c);},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x14c)]=function(_0x209db7){const _0x3aabec=_0x563755,_0x1f7046=Sprite_FieldGaugeATB['Settings'],_0x5f91b6=_0x1f7046[_0x3aabec(0x214)],_0x3773d0=this[_0x3aabec(0x21c)];this[_0x3aabec(0x137)][_0x3aabec(0x1e2)]=new Bitmap(_0x5f91b6,_0x5f91b6);const _0x16d47c=this['_graphicSprite']['bitmap'],_0x57d8bf=ImageManager[_0x3aabec(0x201)],_0x137239=ImageManager[_0x3aabec(0x219)],_0x1dc6a5=_0x3773d0%0x10*_0x57d8bf,_0x53090b=Math['floor'](_0x3773d0/0x10)*_0x137239;_0x16d47c[_0x3aabec(0x16e)](_0x209db7,_0x1dc6a5,_0x53090b,_0x57d8bf,_0x137239,0x0,0x0,_0x5f91b6,_0x5f91b6);},Sprite_FieldMarkerATB[_0x563755(0x2ef)]['changeSvActorGraphicBitmap']=function(_0x4d4c3e){const _0x1b2bd7=_0x563755,_0x48291b=Sprite_FieldGaugeATB[_0x1b2bd7(0x181)],_0x41218f=_0x48291b[_0x1b2bd7(0x214)];this[_0x1b2bd7(0x137)]['bitmap']=new Bitmap(_0x41218f,_0x41218f);const _0xb8aa10=this['_graphicSprite'][_0x1b2bd7(0x1e2)],_0x3f21c0=this[_0x1b2bd7(0x295)][_0x1b2bd7(0x22e)](/\$/i),_0x19654d=_0x3f21c0?0x1:ImageManager[_0x1b2bd7(0x18c)],_0x2e5348=_0x3f21c0?0x1:ImageManager[_0x1b2bd7(0x340)],_0x55c04a=_0x4d4c3e[_0x1b2bd7(0x25a)]/_0x19654d,_0x502e3a=_0x4d4c3e[_0x1b2bd7(0x20e)]/_0x2e5348,_0x53d65b=Math[_0x1b2bd7(0x200)](0x1,_0x41218f/_0x55c04a,_0x41218f/_0x502e3a),_0x3de62f=_0x55c04a*_0x53d65b,_0x2df59f=_0x502e3a*_0x53d65b,_0x4c4a94=Math[_0x1b2bd7(0x2a6)]((_0x41218f-_0x3de62f)/0x2),_0x4d4613=Math['round']((_0x41218f-_0x2df59f)/0x2);_0xb8aa10[_0x1b2bd7(0x16e)](_0x4d4c3e,0x0,0x0,_0x55c04a,_0x502e3a,_0x4c4a94,_0x4d4613,_0x3de62f,_0x2df59f);},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x25f)]=function(_0x4a9c34){const _0x31cb0d=_0x563755,_0x520754=Sprite_FieldGaugeATB['Settings'],_0x264825=_0x520754[_0x31cb0d(0x214)];this['_graphicSprite'][_0x31cb0d(0x1e2)]=new Bitmap(_0x264825,_0x264825);const _0x47b3b9=this['_graphicSprite'][_0x31cb0d(0x1e2)],_0x5cf7cb=Math[_0x31cb0d(0x200)](0x1,_0x264825/_0x4a9c34[_0x31cb0d(0x25a)],_0x264825/_0x4a9c34[_0x31cb0d(0x20e)]),_0x32e17d=_0x4a9c34[_0x31cb0d(0x25a)]*_0x5cf7cb,_0x575384=_0x4a9c34[_0x31cb0d(0x20e)]*_0x5cf7cb,_0x4516ab=Math['round']((_0x264825-_0x32e17d)/0x2),_0x1beb89=Math[_0x31cb0d(0x2a6)]((_0x264825-_0x575384)/0x2);_0x47b3b9[_0x31cb0d(0x16e)](_0x4a9c34,0x0,0x0,_0x4a9c34[_0x31cb0d(0x25a)],_0x4a9c34[_0x31cb0d(0x20e)],_0x4516ab,_0x1beb89,_0x32e17d,_0x575384);},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x2ad)]=function(){const _0x7937da=_0x563755,_0x5a1885=this['battler']();if(!_0x5a1885)return;if(!_0x5a1885['isEnemy']())return;if(this[_0x7937da(0x229)]===_0x5a1885[_0x7937da(0x1f9)]())return;this[_0x7937da(0x229)]=_0x5a1885['battlerHue']();if(_0x5a1885['hasSvBattler']())this['_graphicHue']=0x0;this[_0x7937da(0x137)][_0x7937da(0x171)](this[_0x7937da(0x229)]);},Sprite_FieldMarkerATB['prototype'][_0x563755(0x2ed)]=function(){const _0x3f5a98=_0x563755;if(!this[_0x3f5a98(0x1db)])return;const _0x128b12=this['battler']();if(!_0x128b12)return;if(this['_letter']===_0x128b12['_letter']&&this[_0x3f5a98(0x1b7)]===_0x128b12[_0x3f5a98(0x1b7)])return;this['_letter']=_0x128b12['_letter'],this[_0x3f5a98(0x1b7)]=_0x128b12['_plural'];const _0x10e558=Sprite_FieldGaugeATB[_0x3f5a98(0x181)],_0x4eebdb=_0x10e558[_0x3f5a98(0x214)],_0x15ab6a=Math['floor'](_0x4eebdb/0x2),_0x50b4b4=this[_0x3f5a98(0x1db)][_0x3f5a98(0x1e2)];_0x50b4b4[_0x3f5a98(0x22b)]();if(!this[_0x3f5a98(0x1b7)])return;_0x50b4b4[_0x3f5a98(0x2fe)]=_0x10e558[_0x3f5a98(0x299)]||$gameSystem[_0x3f5a98(0x286)](),_0x50b4b4['fontSize']=_0x10e558['EnemyBattlerFontSize']||0x10,_0x50b4b4[_0x3f5a98(0x1d3)](this[_0x3f5a98(0x1bd)],0x2,_0x15ab6a,_0x4eebdb-0x4,_0x15ab6a-0x2,_0x3f5a98(0x1e8));},Sprite_FieldMarkerATB[_0x563755(0x2ef)][_0x563755(0x2b3)]=function(){const _0x90ac7e=_0x563755,_0xaf7fab=this[_0x90ac7e(0x166)]();if(!_0xaf7fab)return;const _0x3de731=_0xaf7fab[_0x90ac7e(0x166)]();if(!_0x3de731)return;const _0x233156=_0x3de731[_0x90ac7e(0x1c1)]();if(!_0x233156)return;this[_0x90ac7e(0x1d6)](_0x233156[_0x90ac7e(0x2d5)]);},Sprite_FieldMarkerATB[_0x563755(0x2ef)]['getStateTooltipBattler']=function(){const _0x3dfe17=_0x563755;return this[_0x3dfe17(0x166)]();};