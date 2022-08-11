//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.33;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.33] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default true
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default true
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x1fdd0b=_0x2e74;(function(_0x472525,_0x1752ca){const _0x2e660b=_0x2e74,_0xbdc6b2=_0x472525();while(!![]){try{const _0x2b927a=parseInt(_0x2e660b(0x1e8))/0x1+parseInt(_0x2e660b(0x33c))/0x2+-parseInt(_0x2e660b(0x133))/0x3+parseInt(_0x2e660b(0x2e0))/0x4*(-parseInt(_0x2e660b(0x2b9))/0x5)+-parseInt(_0x2e660b(0x376))/0x6+-parseInt(_0x2e660b(0x115))/0x7*(parseInt(_0x2e660b(0x369))/0x8)+-parseInt(_0x2e660b(0x351))/0x9*(-parseInt(_0x2e660b(0x236))/0xa);if(_0x2b927a===_0x1752ca)break;else _0xbdc6b2['push'](_0xbdc6b2['shift']());}catch(_0x52fdc4){_0xbdc6b2['push'](_0xbdc6b2['shift']());}}}(_0x6d6a,0x53417));function _0x2e74(_0x598e77,_0x5e8cb2){const _0x6d6a99=_0x6d6a();return _0x2e74=function(_0x2e74cd,_0x2d40da){_0x2e74cd=_0x2e74cd-0xd5;let _0x44f2fd=_0x6d6a99[_0x2e74cd];return _0x44f2fd;},_0x2e74(_0x598e77,_0x5e8cb2);}var label=_0x1fdd0b(0x1a2),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1fdd0b(0x360)](function(_0x3b5eab){const _0x53c9b4=_0x1fdd0b;return _0x3b5eab[_0x53c9b4(0x37f)]&&_0x3b5eab[_0x53c9b4(0x20f)][_0x53c9b4(0x3b5)]('['+label+']');})[0x0];VisuMZ[label][_0x1fdd0b(0x35f)]=VisuMZ[label][_0x1fdd0b(0x35f)]||{},VisuMZ[_0x1fdd0b(0x1a4)]=function(_0x4e03d4,_0x42aff9){const _0x1f7b81=_0x1fdd0b;for(const _0x4fc170 in _0x42aff9){if(_0x4fc170[_0x1f7b81(0x175)](/(.*):(.*)/i)){if(_0x1f7b81(0x3c7)==='HUSfD'){const _0xfab0d1=String(RegExp['$1']),_0x46bf2c=String(RegExp['$2'])['toUpperCase']()[_0x1f7b81(0x363)]();let _0x5b3a11,_0x4b3e56,_0x22a329;switch(_0x46bf2c){case _0x1f7b81(0x1a0):_0x5b3a11=_0x42aff9[_0x4fc170]!==''?Number(_0x42aff9[_0x4fc170]):0x0;break;case _0x1f7b81(0x308):_0x4b3e56=_0x42aff9[_0x4fc170]!==''?JSON['parse'](_0x42aff9[_0x4fc170]):[],_0x5b3a11=_0x4b3e56[_0x1f7b81(0x2c7)](_0x976806=>Number(_0x976806));break;case _0x1f7b81(0x1af):_0x5b3a11=_0x42aff9[_0x4fc170]!==''?eval(_0x42aff9[_0x4fc170]):null;break;case _0x1f7b81(0xf9):_0x4b3e56=_0x42aff9[_0x4fc170]!==''?JSON[_0x1f7b81(0x2f0)](_0x42aff9[_0x4fc170]):[],_0x5b3a11=_0x4b3e56[_0x1f7b81(0x2c7)](_0xdcb6de=>eval(_0xdcb6de));break;case _0x1f7b81(0x278):_0x5b3a11=_0x42aff9[_0x4fc170]!==''?JSON[_0x1f7b81(0x2f0)](_0x42aff9[_0x4fc170]):'';break;case _0x1f7b81(0x36f):_0x4b3e56=_0x42aff9[_0x4fc170]!==''?JSON[_0x1f7b81(0x2f0)](_0x42aff9[_0x4fc170]):[],_0x5b3a11=_0x4b3e56[_0x1f7b81(0x2c7)](_0x13ce30=>JSON[_0x1f7b81(0x2f0)](_0x13ce30));break;case _0x1f7b81(0x2e5):_0x5b3a11=_0x42aff9[_0x4fc170]!==''?new Function(JSON[_0x1f7b81(0x2f0)](_0x42aff9[_0x4fc170])):new Function(_0x1f7b81(0x39b));break;case _0x1f7b81(0xfd):_0x4b3e56=_0x42aff9[_0x4fc170]!==''?JSON[_0x1f7b81(0x2f0)](_0x42aff9[_0x4fc170]):[],_0x5b3a11=_0x4b3e56['map'](_0x8f100c=>new Function(JSON['parse'](_0x8f100c)));break;case'STR':_0x5b3a11=_0x42aff9[_0x4fc170]!==''?String(_0x42aff9[_0x4fc170]):'';break;case _0x1f7b81(0x1da):_0x4b3e56=_0x42aff9[_0x4fc170]!==''?JSON['parse'](_0x42aff9[_0x4fc170]):[],_0x5b3a11=_0x4b3e56['map'](_0x4e6b22=>String(_0x4e6b22));break;case'STRUCT':_0x22a329=_0x42aff9[_0x4fc170]!==''?JSON[_0x1f7b81(0x2f0)](_0x42aff9[_0x4fc170]):{},_0x4e03d4[_0xfab0d1]={},VisuMZ[_0x1f7b81(0x1a4)](_0x4e03d4[_0xfab0d1],_0x22a329);continue;case _0x1f7b81(0x145):_0x4b3e56=_0x42aff9[_0x4fc170]!==''?JSON['parse'](_0x42aff9[_0x4fc170]):[],_0x5b3a11=_0x4b3e56[_0x1f7b81(0x2c7)](_0x4e3fb0=>VisuMZ[_0x1f7b81(0x1a4)]({},JSON[_0x1f7b81(0x2f0)](_0x4e3fb0)));break;default:continue;}_0x4e03d4[_0xfab0d1]=_0x5b3a11;}else{_0x1805aa['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x50039c=_0x1b2974['$1'];if(_0x50039c['match'](/(\d+(?:\s*,\s*\d+)*)/i)){const _0xb2350e=_0x517122[_0x1f7b81(0x2f0)]('['+_0x19fa27['$1']['match'](/\d+/g)+']');this['_cache'][_0x1f7b81(0x160)]=this['_cache'][_0x1f7b81(0x160)][_0x1f7b81(0x10a)](_0xb2350e);}else{const _0x43049c=_0x50039c[_0x1f7b81(0x27c)](',');for(const _0x566ffe of _0x43049c){const _0x47627b=_0x514cea[_0x1f7b81(0x11a)](_0x566ffe);if(_0x47627b)this[_0x1f7b81(0x187)][_0x1f7b81(0x160)]['push'](_0x47627b);}}}}}return _0x4e03d4;},(_0x2566c3=>{const _0x1c527b=_0x1fdd0b,_0x424734=_0x2566c3[_0x1c527b(0x22f)];for(const _0x599c4e of dependencies){if(!Imported[_0x599c4e]){if(_0x1c527b(0x151)===_0x1c527b(0x2c9)){const _0x1beedd=_0x4e4c61[_0x1c527b(0x2f0)]('['+_0x52c8a0['$1'][_0x1c527b(0x175)](/\d+/g)+']');for(const _0x2efa07 of _0x1beedd){if(!_0x57a451[_0x1c527b(0x25a)](_0x2efa07))return!![];}return![];}else{alert(_0x1c527b(0x138)[_0x1c527b(0x1b5)](_0x424734,_0x599c4e)),SceneManager[_0x1c527b(0x2ca)]();break;}}}const _0xf64f27=_0x2566c3[_0x1c527b(0x20f)];if(_0xf64f27['match'](/\[Version[ ](.*?)\]/i)){const _0x5ae656=Number(RegExp['$1']);_0x5ae656!==VisuMZ[label]['version']&&(alert(_0x1c527b(0x109)[_0x1c527b(0x1b5)](_0x424734,_0x5ae656)),SceneManager[_0x1c527b(0x2ca)]());}if(_0xf64f27[_0x1c527b(0x175)](/\[Tier[ ](\d+)\]/i)){const _0xdc778b=Number(RegExp['$1']);if(_0xdc778b<tier)alert(_0x1c527b(0x196)[_0x1c527b(0x1b5)](_0x424734,_0xdc778b,tier)),SceneManager['exit']();else{if(_0x1c527b(0x29c)===_0x1c527b(0x33b))return _0x4fc8f9['SkillsStatesCore'][_0x1c527b(0x35f)][_0x1c527b(0x15a)][_0x1c527b(0x1e5)];else tier=Math[_0x1c527b(0x1bb)](_0xdc778b,tier);}}VisuMZ[_0x1c527b(0x1a4)](VisuMZ[label][_0x1c527b(0x35f)],_0x2566c3[_0x1c527b(0x135)]);})(pluginData),VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x382)]=Scene_Boot[_0x1fdd0b(0x1be)][_0x1fdd0b(0x36e)],Scene_Boot[_0x1fdd0b(0x1be)][_0x1fdd0b(0x36e)]=function(){const _0x32697d=_0x1fdd0b;VisuMZ[_0x32697d(0x1a2)][_0x32697d(0x382)][_0x32697d(0x320)](this),this[_0x32697d(0x233)](),VisuMZ[_0x32697d(0x1a2)][_0x32697d(0x2a5)]();},Scene_Boot['prototype']['process_VisuMZ_SkillsStatesCore_Notetags']=function(){const _0x17788e=_0x1fdd0b;if(VisuMZ[_0x17788e(0x2f3)])return;this[_0x17788e(0x30d)](),this[_0x17788e(0x191)]();},Scene_Boot[_0x1fdd0b(0x1be)][_0x1fdd0b(0x30d)]=function(){const _0x10a3ba=_0x1fdd0b;for(const _0x126edd of $dataSkills){if(!_0x126edd)continue;VisuMZ['SkillsStatesCore'][_0x10a3ba(0x391)](_0x126edd),VisuMZ[_0x10a3ba(0x1a2)]['Parse_Notetags_Skill_JS'](_0x126edd);}},Scene_Boot[_0x1fdd0b(0x1be)][_0x1fdd0b(0x191)]=function(){const _0x6aa540=_0x1fdd0b;for(const _0x29492c of $dataStates){if(_0x6aa540(0x384)===_0x6aa540(0x384)){if(!_0x29492c)continue;VisuMZ['SkillsStatesCore'][_0x6aa540(0xfa)](_0x29492c),VisuMZ[_0x6aa540(0x1a2)]['Parse_Notetags_State_PassiveJS'](_0x29492c),VisuMZ[_0x6aa540(0x1a2)][_0x6aa540(0x102)](_0x29492c),VisuMZ[_0x6aa540(0x1a2)][_0x6aa540(0x1de)](_0x29492c);}else return!![];}},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x211)]=VisuMZ[_0x1fdd0b(0x211)],VisuMZ['ParseSkillNotetags']=function(_0x1e3619){const _0x1bbf3b=_0x1fdd0b;VisuMZ[_0x1bbf3b(0x1a2)][_0x1bbf3b(0x211)][_0x1bbf3b(0x320)](this,_0x1e3619),VisuMZ[_0x1bbf3b(0x1a2)]['Parse_Notetags_Skill_Cost'](_0x1e3619),VisuMZ['SkillsStatesCore'][_0x1bbf3b(0x326)](_0x1e3619);},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0x2d9)]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x1fdd0b(0x2d9)]=function(_0x5068d3){const _0x4737f2=_0x1fdd0b;VisuMZ[_0x4737f2(0x1a2)]['ParseStateNotetags'][_0x4737f2(0x320)](this,_0x5068d3),VisuMZ[_0x4737f2(0x1a2)][_0x4737f2(0xfa)](_0x5068d3),VisuMZ[_0x4737f2(0x1a2)][_0x4737f2(0x34a)](_0x5068d3),VisuMZ[_0x4737f2(0x1a2)][_0x4737f2(0x102)](_0x5068d3),VisuMZ[_0x4737f2(0x1a2)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x5068d3);},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x391)]=function(_0x324339){const _0x4d9db1=_0x1fdd0b,_0x5b2a3c=_0x324339[_0x4d9db1(0x188)];if(_0x5b2a3c[_0x4d9db1(0x175)](/<MP COST:[ ](\d+)>/i)){if(_0x4d9db1(0x13d)!==_0x4d9db1(0x13d))return _0x15e2c2[_0x4d9db1(0x1a2)][_0x4d9db1(0x35f)][_0x4d9db1(0x15a)]['CmdTextAlign'];else _0x324339[_0x4d9db1(0x3aa)]=Number(RegExp['$1']);}_0x5b2a3c['match'](/<TP COST:[ ](\d+)>/i)&&(_0x324339[_0x4d9db1(0x2f2)]=Number(RegExp['$1']));},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x229)]={},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x141)]={},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0x326)]=function(_0x2caa5b){const _0x59ad0e=_0x1fdd0b,_0x4f42e2=_0x2caa5b[_0x59ad0e(0x188)];if(_0x4f42e2[_0x59ad0e(0x175)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){if(_0x59ad0e(0x377)===_0x59ad0e(0x18b))return this[_0x59ad0e(0x120)]['GaugeCurrentJS'][_0x59ad0e(0x320)](this['_battler']);else{const _0x5d2d3b=String(RegExp['$1']),_0x3a712a=_0x59ad0e(0x1b4)[_0x59ad0e(0x1b5)](_0x5d2d3b);VisuMZ['SkillsStatesCore'][_0x59ad0e(0x229)][_0x2caa5b['id']]=new Function(_0x59ad0e(0x1c3),_0x3a712a);}}if(_0x4f42e2[_0x59ad0e(0x175)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){if(_0x59ad0e(0x2d8)!==_0x59ad0e(0x2d8))return this[_0x59ad0e(0x120)][_0x59ad0e(0x340)][_0x59ad0e(0x320)](this['_battler']);else{const _0x2f17b8=String(RegExp['$1']),_0x5d2831=_0x59ad0e(0x119)[_0x59ad0e(0x1b5)](_0x2f17b8);VisuMZ['SkillsStatesCore'][_0x59ad0e(0x141)][_0x2caa5b['id']]=new Function(_0x59ad0e(0x1c3),_0x5d2831);}}},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0xfa)]=function(_0x280c3b){const _0x1a536e=_0x1fdd0b;_0x280c3b[_0x1a536e(0xf2)]=[_0x1a536e(0x23a),_0x1a536e(0x35e)];const _0x3db144=_0x280c3b[_0x1a536e(0x188)],_0xce8a0f=_0x3db144[_0x1a536e(0x175)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0xce8a0f)for(const _0x7e0aba of _0xce8a0f){_0x7e0aba[_0x1a536e(0x175)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x339444=String(RegExp['$1'])['toUpperCase']()[_0x1a536e(0x363)]()['split'](',');for(const _0x37b00a of _0x339444){_0x280c3b[_0x1a536e(0xf2)][_0x1a536e(0x356)](_0x37b00a[_0x1a536e(0x363)]());}}if(_0x3db144[_0x1a536e(0x175)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x8f984c=RegExp['$1']['split'](/[\r\n]+/);for(const _0x5c8d8b of _0x8f984c){_0x280c3b['categories'][_0x1a536e(0x356)](_0x5c8d8b[_0x1a536e(0x23d)]()['trim']());}}_0x3db144[_0x1a536e(0x175)](/<POSITIVE STATE>/i)&&_0x280c3b[_0x1a536e(0xf2)][_0x1a536e(0x356)]('POSITIVE'),_0x3db144[_0x1a536e(0x175)](/<NEGATIVE STATE>/i)&&_0x280c3b['categories']['push']('NEGATIVE');},VisuMZ[_0x1fdd0b(0x1a2)]['statePassiveConditionJS']={},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0x34a)]=function(_0x4bc4a2){const _0x4d605e=_0x1fdd0b,_0x3b1a19=_0x4bc4a2['note'];if(_0x3b1a19[_0x4d605e(0x175)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){if(_0x4d605e(0x26f)===_0x4d605e(0x32d)){const _0x3d53d5=this[_0x4d605e(0x1d2)](_0x48d821);_0x165d17[_0x4d605e(0x1a2)][_0x4d605e(0x303)][_0x4d605e(0x320)](this,_0x47de76);if(_0x3d53d5&&this[_0x4d605e(0x250)](_0x1732ae[_0xd3b886])){this['onAddState'](_0x422318);;}}else{const _0x1bc3a7=String(RegExp['$1']),_0x16d124='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x4d605e(0x1b5)](_0x1bc3a7);VisuMZ['SkillsStatesCore'][_0x4d605e(0x123)][_0x4bc4a2['id']]=new Function(_0x4d605e(0x23b),_0x16d124);}}},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x331)]={},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x1bc)]={},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0x200)]={},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0x2ba)]={},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x364)]={},VisuMZ[_0x1fdd0b(0x1a2)]['stateTpSlipHealJS']={},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x102)]=function(_0x245183){const _0x4f6663=_0x1fdd0b,_0x1f435b=_0x245183[_0x4f6663(0x188)],_0x18a2f3='\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20';if(_0x1f435b[_0x4f6663(0x175)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x3833bb=String(RegExp['$1']),_0x2f44b0=_0x18a2f3[_0x4f6663(0x1b5)](_0x3833bb,'damage',-0x1,_0x4f6663(0x3d7));VisuMZ[_0x4f6663(0x1a2)][_0x4f6663(0x331)][_0x245183['id']]=new Function('stateId',_0x2f44b0);}else{if(_0x1f435b['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x4eeda4=String(RegExp['$1']),_0x599b35=_0x18a2f3[_0x4f6663(0x1b5)](_0x4eeda4,'heal',0x1,_0x4f6663(0x3d7));VisuMZ['SkillsStatesCore'][_0x4f6663(0x1bc)][_0x245183['id']]=new Function('stateId',_0x599b35);}}if(_0x1f435b[_0x4f6663(0x175)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){if(_0x4f6663(0x390)!==_0x4f6663(0x390))return _0x5b798a[_0x4f6663(0x1fc)];else{const _0x1974b2=String(RegExp['$1']),_0x3cdf8f=_0x18a2f3[_0x4f6663(0x1b5)](_0x1974b2,'damage',-0x1,_0x4f6663(0x314));VisuMZ[_0x4f6663(0x1a2)][_0x4f6663(0x200)][_0x245183['id']]=new Function(_0x4f6663(0x285),_0x3cdf8f);}}else{if(_0x1f435b['match'](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){if(_0x4f6663(0x307)!==_0x4f6663(0x164)){const _0x1db551=String(RegExp['$1']),_0x5a0a56=_0x18a2f3['format'](_0x1db551,_0x4f6663(0x245),0x1,_0x4f6663(0x314));VisuMZ[_0x4f6663(0x1a2)][_0x4f6663(0x2ba)][_0x245183['id']]=new Function(_0x4f6663(0x285),_0x5a0a56);}else{if(this[_0x4f6663(0x19a)](_0x549fc3)){const _0x46d8f4=_0x5c0e78[_0x4f6663(0x1a2)][_0x4f6663(0x35f)][_0x4f6663(0x10f)][_0x4f6663(0x322)];this[_0x4f6663(0x2c8)][_0x2e319d]=_0x3d01f3[_0x4f6663(0x329)](0x0,_0x46d8f4);}}}}if(_0x1f435b['match'](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x5753ea=String(RegExp['$1']),_0x46a13f=_0x18a2f3[_0x4f6663(0x1b5)](_0x5753ea,_0x4f6663(0x365),-0x1,_0x4f6663(0x105));VisuMZ[_0x4f6663(0x1a2)]['stateTpSlipDamageJS'][_0x245183['id']]=new Function(_0x4f6663(0x285),_0x46a13f);}else{if(_0x1f435b[_0x4f6663(0x175)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){if(_0x4f6663(0x204)==='qJnjb'){const _0x52e0d6=String(RegExp['$1']),_0x434484=_0x18a2f3[_0x4f6663(0x1b5)](_0x52e0d6,_0x4f6663(0x245),0x1,_0x4f6663(0x105));VisuMZ[_0x4f6663(0x1a2)][_0x4f6663(0x26e)][_0x245183['id']]=new Function(_0x4f6663(0x285),_0x434484);}else{const _0x3a15b9=_0x1242e7['stateMaximumTurns'](_0x12fb40);this[_0x4f6663(0x277)][_0x5d9b09]=_0x5ac37c[_0x4f6663(0x329)](0x0,_0x3a15b9);if(this['_stateTurns'][_0x33173a]<=0x0)this[_0x4f6663(0x29e)](_0x35ffdf);}}}},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0x3d8)]={},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x194)]={},VisuMZ[_0x1fdd0b(0x1a2)]['stateExpireJS']={},VisuMZ[_0x1fdd0b(0x1a2)]['Parse_Notetags_State_ApplyRemoveLeaveJS']=function(_0x30c4b1){const _0x2dd4c4=_0x1fdd0b,_0x4125dd=_0x30c4b1[_0x2dd4c4(0x188)],_0x41e6f0=_0x2dd4c4(0x31f);if(_0x4125dd['match'](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x54a466=String(RegExp['$1']),_0x51960a=_0x41e6f0[_0x2dd4c4(0x1b5)](_0x54a466);VisuMZ[_0x2dd4c4(0x1a2)]['stateAddJS'][_0x30c4b1['id']]=new Function('stateId',_0x51960a);}if(_0x4125dd['match'](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){if(_0x2dd4c4(0x3c4)===_0x2dd4c4(0x157))_0x2cce64[_0x2dd4c4(0x34b)](_0x45c140,_0x493c16),this['makeSuccess'](_0xe782c4);else{const _0x351286=String(RegExp['$1']),_0x172e0c=_0x41e6f0[_0x2dd4c4(0x1b5)](_0x351286);VisuMZ[_0x2dd4c4(0x1a2)][_0x2dd4c4(0x194)][_0x30c4b1['id']]=new Function(_0x2dd4c4(0x285),_0x172e0c);}}if(_0x4125dd[_0x2dd4c4(0x175)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){if(_0x2dd4c4(0x166)===_0x2dd4c4(0x3da)){const _0x4d6ddc=0x0,_0xbd3968=this['helpAreaTop'](),_0x3a96d1=_0xf1f67d[_0x2dd4c4(0x1e9)],_0x3d4109=this['helpAreaHeight']();return new _0x5b242f(_0x4d6ddc,_0xbd3968,_0x3a96d1,_0x3d4109);}else{const _0x234f57=String(RegExp['$1']),_0x24b4fb=_0x41e6f0[_0x2dd4c4(0x1b5)](_0x234f57);VisuMZ[_0x2dd4c4(0x1a2)][_0x2dd4c4(0x19f)][_0x30c4b1['id']]=new Function(_0x2dd4c4(0x285),_0x24b4fb);}}},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x2a5)]=function(){const _0x5b78bf=_0x1fdd0b;if(!VisuMZ[_0x5b78bf(0x1a2)][_0x5b78bf(0x35f)][_0x5b78bf(0x392)][_0x5b78bf(0x265)])return;for(const _0x5ac529 of $dataStates){if(!_0x5ac529)continue;_0x5ac529['restriction']===0x4&&_0x5ac529[_0x5b78bf(0x1ed)]===0x1&&(_0x5ac529['autoRemovalTiming']=0x2);}},DataManager[_0x1fdd0b(0x22c)]=function(_0x2093d2){const _0x1d5699=_0x1fdd0b;_0x2093d2=_0x2093d2[_0x1d5699(0x23d)]()[_0x1d5699(0x363)](),this[_0x1d5699(0x17a)]=this['_classIDs']||{};if(this[_0x1d5699(0x17a)][_0x2093d2])return this[_0x1d5699(0x17a)][_0x2093d2];for(const _0x407a63 of $dataClasses){if(_0x1d5699(0x156)!==_0x1d5699(0x354)){if(!_0x407a63)continue;let _0x28f708=_0x407a63['name'];_0x28f708=_0x28f708[_0x1d5699(0x34f)](/\x1I\[(\d+)\]/gi,''),_0x28f708=_0x28f708[_0x1d5699(0x34f)](/\\I\[(\d+)\]/gi,''),this[_0x1d5699(0x17a)][_0x28f708[_0x1d5699(0x23d)]()[_0x1d5699(0x363)]()]=_0x407a63['id'];}else{let _0x4a7185=this[_0x1d5699(0x32f)](_0x4d2583);_0x23a2e6['SkillsStatesCore'][_0x1d5699(0x18c)][_0x1d5699(0x320)](this,_0x31ce8f);if(_0x4a7185&&!this['isStateAffected'](_0x27513f))this[_0x1d5699(0x291)](_0x5d34ac);}}return this['_classIDs'][_0x2093d2]||0x0;},DataManager[_0x1fdd0b(0x2dc)]=function(_0x11644d){const _0x4e12de=_0x1fdd0b;this[_0x4e12de(0x38e)]=this[_0x4e12de(0x38e)]||{};if(this[_0x4e12de(0x38e)][_0x11644d['id']])return this[_0x4e12de(0x38e)][_0x11644d['id']];this['_stypeIDs'][_0x11644d['id']]=[_0x11644d['stypeId']];if(_0x11644d['note']['match'](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5c2897=JSON[_0x4e12de(0x2f0)]('['+RegExp['$1'][_0x4e12de(0x175)](/\d+/g)+']');this[_0x4e12de(0x38e)][_0x11644d['id']]=this[_0x4e12de(0x38e)][_0x11644d['id']][_0x4e12de(0x10a)](_0x5c2897);}else{if(_0x11644d[_0x4e12de(0x188)][_0x4e12de(0x175)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x505864=RegExp['$1'][_0x4e12de(0x27c)](',');for(const _0x837745 of _0x505864){const _0x58cb90=DataManager[_0x4e12de(0xd7)](_0x837745);if(_0x58cb90)this[_0x4e12de(0x38e)][_0x11644d['id']][_0x4e12de(0x356)](_0x58cb90);}}}return this[_0x4e12de(0x38e)][_0x11644d['id']];},DataManager['getStypeIdWithName']=function(_0x479b65){const _0xec1f1=_0x1fdd0b;_0x479b65=_0x479b65['toUpperCase']()[_0xec1f1(0x363)](),this['_stypeIDs']=this[_0xec1f1(0x38e)]||{};if(this[_0xec1f1(0x38e)][_0x479b65])return this[_0xec1f1(0x38e)][_0x479b65];for(let _0x30adad=0x1;_0x30adad<0x64;_0x30adad++){if(_0xec1f1(0x2d3)!=='qQxcv')return this[_0xec1f1(0x26b)]();else{if(!$dataSystem['skillTypes'][_0x30adad])continue;let _0x55d202=$dataSystem['skillTypes'][_0x30adad][_0xec1f1(0x23d)]()[_0xec1f1(0x363)]();_0x55d202=_0x55d202[_0xec1f1(0x34f)](/\x1I\[(\d+)\]/gi,''),_0x55d202=_0x55d202['replace'](/\\I\[(\d+)\]/gi,''),this[_0xec1f1(0x38e)][_0x55d202]=_0x30adad;}}return this[_0xec1f1(0x38e)][_0x479b65]||0x0;},DataManager[_0x1fdd0b(0x184)]=function(_0xa6ce7a){const _0x575eb6=_0x1fdd0b;_0xa6ce7a=_0xa6ce7a[_0x575eb6(0x23d)]()[_0x575eb6(0x363)](),this[_0x575eb6(0x324)]=this['_skillIDs']||{};if(this[_0x575eb6(0x324)][_0xa6ce7a])return this[_0x575eb6(0x324)][_0xa6ce7a];for(const _0x3fe1de of $dataSkills){if(!_0x3fe1de)continue;this['_skillIDs'][_0x3fe1de['name'][_0x575eb6(0x23d)]()[_0x575eb6(0x363)]()]=_0x3fe1de['id'];}return this[_0x575eb6(0x324)][_0xa6ce7a]||0x0;},DataManager[_0x1fdd0b(0x11a)]=function(_0x595dff){const _0xcebe50=_0x1fdd0b;_0x595dff=_0x595dff[_0xcebe50(0x23d)]()['trim'](),this[_0xcebe50(0x31b)]=this[_0xcebe50(0x31b)]||{};if(this[_0xcebe50(0x31b)][_0x595dff])return this['_stateIDs'][_0x595dff];for(const _0x9ca1d8 of $dataStates){if(!_0x9ca1d8)continue;this['_stateIDs'][_0x9ca1d8[_0xcebe50(0x22f)][_0xcebe50(0x23d)]()[_0xcebe50(0x363)]()]=_0x9ca1d8['id'];}return this[_0xcebe50(0x31b)][_0x595dff]||0x0;},DataManager['stateMaximumTurns']=function(_0x3cad36){const _0x2c0b83=_0x1fdd0b;this['_stateMaxTurns']=this['_stateMaxTurns']||{};if(this[_0x2c0b83(0x222)][_0x3cad36])return this[_0x2c0b83(0x222)][_0x3cad36];return $dataStates[_0x3cad36]['note'][_0x2c0b83(0x175)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x2c0b83(0x222)][_0x3cad36]=Number(RegExp['$1']):this[_0x2c0b83(0x222)][_0x3cad36]=VisuMZ[_0x2c0b83(0x1a2)][_0x2c0b83(0x35f)][_0x2c0b83(0x392)][_0x2c0b83(0x322)],this[_0x2c0b83(0x222)][_0x3cad36];},ColorManager[_0x1fdd0b(0x14a)]=function(_0x280ee6,_0x383bcf){const _0x3cef9d=_0x1fdd0b;_0x383bcf=String(_0x383bcf),this[_0x3cef9d(0x228)]=this[_0x3cef9d(0x228)]||{};if(_0x383bcf[_0x3cef9d(0x175)](/#(.*)/i))this[_0x3cef9d(0x228)][_0x280ee6]=_0x3cef9d(0x2ae)[_0x3cef9d(0x1b5)](String(RegExp['$1']));else{if('wUGQA'===_0x3cef9d(0x270))this[_0x3cef9d(0x228)][_0x280ee6]=this[_0x3cef9d(0x3ae)](Number(_0x383bcf));else{const _0x451aa5=this['mainCommandWidth'](),_0xa82136=this[_0x3cef9d(0x347)](0x3,!![]),_0x517d64=this[_0x3cef9d(0x18d)]()?_0x530131[_0x3cef9d(0x1e9)]-_0x451aa5:0x0,_0x344f96=this[_0x3cef9d(0x1db)]();return new _0x5e2952(_0x517d64,_0x344f96,_0x451aa5,_0xa82136);}}return this[_0x3cef9d(0x228)][_0x280ee6];},ColorManager[_0x1fdd0b(0x180)]=function(_0x504c23){const _0x1d0355=_0x1fdd0b;return _0x504c23=String(_0x504c23),_0x504c23[_0x1d0355(0x175)](/#(.*)/i)?_0x1d0355(0x2ae)[_0x1d0355(0x1b5)](String(RegExp['$1'])):this['textColor'](Number(_0x504c23));},ColorManager['stateColor']=function(_0x1c3a29){const _0x2d6367=_0x1fdd0b;if(typeof _0x1c3a29===_0x2d6367(0x27a))_0x1c3a29=$dataStates[_0x1c3a29];const _0x272e8c=_0x2d6367(0x124)[_0x2d6367(0x1b5)](_0x1c3a29['id']);this[_0x2d6367(0x228)]=this[_0x2d6367(0x228)]||{};if(this[_0x2d6367(0x228)][_0x272e8c])return this[_0x2d6367(0x228)][_0x272e8c];const _0x3bcf8a=this[_0x2d6367(0x2aa)](_0x1c3a29);return this[_0x2d6367(0x14a)](_0x272e8c,_0x3bcf8a);},ColorManager['retrieveStateColor']=function(_0x1e2351){const _0x5a31ee=_0x1fdd0b,_0x48fd5c=_0x1e2351[_0x5a31ee(0x188)];if(_0x48fd5c[_0x5a31ee(0x175)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x48fd5c[_0x5a31ee(0x175)](/<POSITIVE STATE>/i))return VisuMZ[_0x5a31ee(0x1a2)][_0x5a31ee(0x35f)][_0x5a31ee(0x392)][_0x5a31ee(0x3ad)];else{if(_0x48fd5c[_0x5a31ee(0x175)](/<NEGATIVE STATE>/i))return VisuMZ['SkillsStatesCore'][_0x5a31ee(0x35f)]['States']['ColorNegative'];else{if('WGvAk'===_0x5a31ee(0xdb))return VisuMZ[_0x5a31ee(0x1a2)][_0x5a31ee(0x35f)]['States'][_0x5a31ee(0x16d)];else{if(!_0x2e4c4c[_0x5a31ee(0x1a2)][_0x5a31ee(0x35f)][_0x5a31ee(0x392)]['ShowTurns'])return;if(!_0x59f1d1[_0x5a31ee(0x32f)](_0x28a929['id']))return;if(_0x15e4d3[_0x5a31ee(0x1ed)]===0x0)return;if(_0x4edf8a[_0x5a31ee(0x188)][_0x5a31ee(0x175)](/<HIDE STATE TURNS>/i))return;const _0x5dcefa=_0x51a7ac['stateTurns'](_0x536989['id']),_0x4f72d4=_0x882950[_0x5a31ee(0x37c)],_0x4900ca=_0x4e9dfb['stateColor'](_0xdca447);this[_0x5a31ee(0x3ba)](_0x4900ca),this['changeOutlineColor'](_0x5a31ee(0x293)),this['contents']['fontBold']=!![],this[_0x5a31ee(0x1f5)][_0x5a31ee(0x3d2)]=_0x54cfc4[_0x5a31ee(0x1a2)]['Settings'][_0x5a31ee(0x392)][_0x5a31ee(0x32a)],_0x357169+=_0x1b795a[_0x5a31ee(0x1a2)][_0x5a31ee(0x35f)][_0x5a31ee(0x392)]['TurnOffsetX'],_0x521718+=_0x57ead3[_0x5a31ee(0x1a2)][_0x5a31ee(0x35f)][_0x5a31ee(0x392)]['TurnOffsetY'],this['drawText'](_0x5dcefa,_0x4b49df,_0x5b1282,_0x4f72d4,_0x5a31ee(0x3c0)),this[_0x5a31ee(0x1f5)][_0x5a31ee(0x3b3)]=![],this[_0x5a31ee(0x1a7)]();}}}}},ColorManager[_0x1fdd0b(0x125)]=function(){const _0xbd3120=_0x1fdd0b,_0x3a1f56=_0xbd3120(0x290);this[_0xbd3120(0x228)]=this[_0xbd3120(0x228)]||{};if(this[_0xbd3120(0x228)][_0x3a1f56])return this[_0xbd3120(0x228)][_0x3a1f56];const _0x463560=VisuMZ[_0xbd3120(0x1a2)][_0xbd3120(0x35f)]['Buffs']['ColorBuff'];return this['getColorDataFromPluginParameters'](_0x3a1f56,_0x463560);},ColorManager[_0x1fdd0b(0x300)]=function(){const _0x24eca7=_0x1fdd0b,_0x3ebbf3='_stored_debuffColor';this[_0x24eca7(0x228)]=this[_0x24eca7(0x228)]||{};if(this[_0x24eca7(0x228)][_0x3ebbf3])return this[_0x24eca7(0x228)][_0x3ebbf3];const _0x583626=VisuMZ[_0x24eca7(0x1a2)][_0x24eca7(0x35f)][_0x24eca7(0x10f)][_0x24eca7(0x396)];return this[_0x24eca7(0x14a)](_0x3ebbf3,_0x583626);},SceneManager[_0x1fdd0b(0x11b)]=function(){const _0x420ef0=_0x1fdd0b;return this[_0x420ef0(0x1d9)]&&this[_0x420ef0(0x1d9)][_0x420ef0(0x28c)]===Scene_Battle;},VisuMZ[_0x1fdd0b(0x1a2)]['BattleManager_endAction']=BattleManager[_0x1fdd0b(0x276)],BattleManager[_0x1fdd0b(0x276)]=function(){const _0x5d9205=_0x1fdd0b;this[_0x5d9205(0x1bf)](),VisuMZ[_0x5d9205(0x1a2)][_0x5d9205(0x16f)]['call'](this);},BattleManager[_0x1fdd0b(0x1bf)]=function(){const _0x17a2b0=_0x1fdd0b,_0x23bf84=VisuMZ[_0x17a2b0(0x1a2)][_0x17a2b0(0x35f)][_0x17a2b0(0x392)];if(!_0x23bf84)return;if(_0x23bf84[_0x17a2b0(0x265)]===![])return;if(!this[_0x17a2b0(0x1a8)])return;this[_0x17a2b0(0x1a8)][_0x17a2b0(0x1bf)]();},Game_Battler['prototype'][_0x1fdd0b(0x1bf)]=function(){const _0x44023d=_0x1fdd0b;if(BattleManager[_0x44023d(0x150)]!==_0x44023d(0x1c1))return;if(this['_lastStatesActionEndFrameCount']===Graphics[_0x44023d(0x2ad)])return;this[_0x44023d(0x25b)]=Graphics[_0x44023d(0x2ad)];for(const _0x43cde6 of this[_0x44023d(0x12a)]){const _0x281332=$dataStates[_0x43cde6];if(!_0x281332)continue;if(_0x281332[_0x44023d(0x1ed)]!==0x1)continue;this[_0x44023d(0x277)][_0x43cde6]>0x0&&this[_0x44023d(0x277)][_0x43cde6]--;}this[_0x44023d(0x361)](0x1);},Game_BattlerBase[_0x1fdd0b(0x1be)]['updateStateTurns']=function(){const _0x93c78e=_0x1fdd0b,_0x3de2e6=VisuMZ[_0x93c78e(0x1a2)][_0x93c78e(0x35f)][_0x93c78e(0x392)];for(const _0x121c75 of this[_0x93c78e(0x12a)]){const _0x461a77=$dataStates[_0x121c75];if(_0x3de2e6&&_0x3de2e6[_0x93c78e(0x265)]!==![]){if(_0x461a77&&_0x461a77['autoRemovalTiming']===0x1)continue;}if(this[_0x93c78e(0x277)][_0x121c75]>0x0){if(_0x93c78e(0x252)!==_0x93c78e(0x2cf))this[_0x93c78e(0x277)][_0x121c75]--;else return _0x484861[_0x93c78e(0x1be)][_0x93c78e(0x372)]();}}},VisuMZ[_0x1fdd0b(0x1a2)]['Game_Switches_onChange']=Game_Switches['prototype'][_0x1fdd0b(0x128)],Game_Switches[_0x1fdd0b(0x1be)][_0x1fdd0b(0x128)]=function(){const _0x5b96d6=_0x1fdd0b;VisuMZ[_0x5b96d6(0x1a2)]['Game_Switches_onChange'][_0x5b96d6(0x320)](this);const _0x445809=VisuMZ[_0x5b96d6(0x1a2)][_0x5b96d6(0x35f)][_0x5b96d6(0x251)][_0x5b96d6(0x357)]??!![];if(!_0x445809)return;if(SceneManager[_0x5b96d6(0x11b)]())for(const _0x55a34e of BattleManager['allBattleMembers']()){if(_0x55a34e)_0x55a34e[_0x5b96d6(0x274)]();}},VisuMZ[_0x1fdd0b(0x1a2)]['Game_Variables_onChange']=Game_Variables[_0x1fdd0b(0x1be)][_0x1fdd0b(0x128)],Game_Variables['prototype']['onChange']=function(){const _0x5733a6=_0x1fdd0b;VisuMZ[_0x5733a6(0x1a2)]['Game_Variables_onChange'][_0x5733a6(0x320)](this);const _0x479471=VisuMZ['SkillsStatesCore']['Settings'][_0x5733a6(0x251)]['RefreshCacheVar']??!![];if(!_0x479471)return;if(SceneManager[_0x5733a6(0x11b)]()){if(_0x5733a6(0x2af)!==_0x5733a6(0x2af)){if(_0x5dcd30[_0x5733a6(0x399)]())_0x24fbba['log'](_0x1afe3e);}else for(const _0x162340 of BattleManager[_0x5733a6(0x1df)]()){if(_0x162340)_0x162340[_0x5733a6(0x274)]();}}},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x162)]=Game_Action[_0x1fdd0b(0x1be)][_0x1fdd0b(0x17d)],Game_Action[_0x1fdd0b(0x1be)][_0x1fdd0b(0x17d)]=function(_0x31e81b){const _0x355e96=_0x1fdd0b;VisuMZ[_0x355e96(0x1a2)][_0x355e96(0x162)]['call'](this,_0x31e81b),this[_0x355e96(0x1ca)](_0x31e81b);},Game_Action[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1ca)]=function(_0x7d0eb2){const _0x2e4e7d=_0x1fdd0b;this[_0x2e4e7d(0x39c)](_0x7d0eb2),this['applyStateTurnManipulationEffects'](_0x7d0eb2),this['applyBuffTurnManipulationEffects'](_0x7d0eb2),this['applyDebuffTurnManipulationEffects'](_0x7d0eb2);},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0x1c8)]=Game_Action[_0x1fdd0b(0x1be)][_0x1fdd0b(0x12f)],Game_Action[_0x1fdd0b(0x1be)][_0x1fdd0b(0x12f)]=function(_0x191c20){const _0x3d34ee=_0x1fdd0b;if(this[_0x3d34ee(0x1a3)](_0x191c20)){if(_0x3d34ee(0x10d)!=='CMJro'){this[_0x3d34ee(0x1a7)](),this['contents'][_0x3d34ee(0x22e)]();const _0x580219=this[_0x3d34ee(0xdd)];if(!_0x580219)return;const _0x41237d=_0x580219[_0x3d34ee(0x3db)]()[_0x3d34ee(0x360)](_0x56623f=>_0x56623f[_0x3d34ee(0x318)]>0x0),_0x195d88=[..._0x39c59f(0x8)[_0x3d34ee(0x3cb)]()]['filter'](_0xa3c7eb=>_0x580219[_0x3d34ee(0xe9)](_0xa3c7eb)!==0x0),_0x3cefb4=this[_0x3d34ee(0x33a)],_0x5a9706=_0x41237d[_0x3cefb4];if(_0x5a9706)_0x1efb9a[_0x3d34ee(0x1be)][_0x3d34ee(0x27b)][_0x3d34ee(0x320)](this,_0x580219,_0x5a9706,0x0,0x0),_0x48300d['prototype']['drawActorStateData'][_0x3d34ee(0x320)](this,_0x580219,_0x5a9706,0x0,0x0);else{const _0x57b96a=_0x195d88[_0x3cefb4-_0x41237d[_0x3d34ee(0x253)]];if(_0x57b96a===_0x100569)return;_0x30ce6a[_0x3d34ee(0x1be)][_0x3d34ee(0x2f9)][_0x3d34ee(0x320)](this,_0x580219,_0x57b96a,0x0,0x0),_0x99014d[_0x3d34ee(0x1be)][_0x3d34ee(0x1ef)][_0x3d34ee(0x320)](this,_0x580219,_0x57b96a,0x0,0x0);}}else return!![];}return VisuMZ[_0x3d34ee(0x1a2)][_0x3d34ee(0x1c8)][_0x3d34ee(0x320)](this,_0x191c20);},Game_Action[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1a3)]=function(_0x263bf6){const _0x5ac50f=_0x1fdd0b;if(!this[_0x5ac50f(0x1c5)]())return;const _0x44f128=this[_0x5ac50f(0x1c5)]()[_0x5ac50f(0x188)];if(_0x44f128[_0x5ac50f(0x175)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){if(_0x5ac50f(0x350)!==_0x5ac50f(0x3d9)){const _0x5c0e3c=String(RegExp['$1']);if(_0x263bf6[_0x5ac50f(0x113)](_0x5c0e3c))return!![];}else{this['_stateOrigin']=this[_0x5ac50f(0xda)]||{};const _0x2ebf30=_0x389efe?this['convertTargetToStateOriginKey'](_0x40f5dc):this['getCurrentStateOriginKey']();this[_0x5ac50f(0xda)][_0x16c9dd]=_0x2ebf30;}}if(_0x44f128[_0x5ac50f(0x175)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){if(_0x5ac50f(0x3d3)!=='FPdkw'){const _0x5520e7=Number(RegExp['$1']);if(_0x263bf6[_0x5ac50f(0x32f)](_0x5520e7))return!![];}else this[_0x5ac50f(0x189)]()!==''?this[_0x5ac50f(0x19c)]():(_0x1e4b70[_0x5ac50f(0x1a2)][_0x5ac50f(0x272)][_0x5ac50f(0x320)](this),this[_0x5ac50f(0x1d5)]());}else{if(_0x44f128[_0x5ac50f(0x175)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){if('BcJIe'!==_0x5ac50f(0x33e)){const _0x3aa0d1=DataManager[_0x5ac50f(0x11a)](RegExp['$1']);if(_0x263bf6[_0x5ac50f(0x32f)](_0x3aa0d1))return!![];}else{if(!_0x12bf65[_0x5ac50f(0x25a)](_0x3e7fe7))return!![];}}}return![];},Game_Action[_0x1fdd0b(0x1be)][_0x1fdd0b(0x39c)]=function(_0x202187){const _0x3f6a75=_0x1fdd0b;if(_0x202187[_0x3f6a75(0x3db)]()[_0x3f6a75(0x253)]<=0x0)return;const _0x4d3878=this['item']()[_0x3f6a75(0x188)];{const _0x5ec002=_0x4d3878[_0x3f6a75(0x175)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x5ec002){if(_0x3f6a75(0x2ec)===_0x3f6a75(0x2ec))for(const _0x5265cf of _0x5ec002){if(_0x3f6a75(0x243)!==_0x3f6a75(0x243)){_0x5982ae[_0x3f6a75(0x175)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x315cd1=_0x3e9632[_0x3f6a75(0x312)](_0x4c06e2(_0x4713cf['$1'])['toUpperCase']()),_0x179e3c=_0x31e45f(_0x41e9da['$2']);_0x315cd1>=0x0&&(_0x306388[_0x3f6a75(0x34b)](_0x315cd1,_0x179e3c),this[_0x3f6a75(0x1c2)](_0x375ee1));}else{_0x5265cf[_0x3f6a75(0x175)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x1870d7=String(RegExp['$1']);_0x202187[_0x3f6a75(0x3c9)](_0x1870d7);}}else return!this[_0x3f6a75(0xe8)](_0x3e1838)&&!this['isStateRestrict'](_0x49c93b)&&!this[_0x3f6a75(0x257)]['isStateRemoved'](_0x3863ba);}}{const _0xdf46eb=_0x4d3878[_0x3f6a75(0x175)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0xdf46eb){if(_0x3f6a75(0x2ee)!=='IkQJY')_0x3eda1b[_0x3f6a75(0x1be)][_0x3f6a75(0x1d0)][_0x3f6a75(0x320)](this,_0x37050b),this[_0x3f6a75(0x2a6)](_0x2e1c05);else for(const _0x80bf3d of _0xdf46eb){if(_0x3f6a75(0x117)!==_0x3f6a75(0x214)){_0x80bf3d['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x32fa65=String(RegExp['$1']),_0x9eb7a=Number(RegExp['$2']);_0x202187[_0x3f6a75(0x3e4)](_0x32fa65,_0x9eb7a);}else{const _0x947317=_0x4ce722[_0x3f6a75(0x2f0)]('['+_0x4e54f2['$1']['match'](/\d+/g)+']');for(const _0x2fb8fd of _0x947317){if(!_0x52457a[_0x3f6a75(0x342)](_0x2fb8fd))return![];}return!![];}}}}},Game_Action[_0x1fdd0b(0x1be)][_0x1fdd0b(0x397)]=function(_0x29a455){const _0x3b073=_0x1fdd0b,_0x391578=this['item']()['note'],_0x3728b7=_0x391578['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x3728b7){if(_0x3b073(0x345)===_0x3b073(0x1b1))return _0x3dbe29(_0x5f51da['$1']);else for(const _0x12b19b of _0x3728b7){let _0x1985de=0x0,_0x3225b0=0x0;if(_0x12b19b[_0x3b073(0x175)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x1985de=Number(RegExp['$1']),_0x3225b0=Number(RegExp['$2']);else _0x12b19b['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x1985de=DataManager[_0x3b073(0x11a)](RegExp['$1']),_0x3225b0=Number(RegExp['$2']));_0x29a455[_0x3b073(0x1fa)](_0x1985de,_0x3225b0),this[_0x3b073(0x1c2)](_0x29a455);}}const _0x261c9a=_0x391578[_0x3b073(0x175)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x261c9a)for(const _0x50ef31 of _0x261c9a){let _0x436ff2=0x0,_0x28c8bf=0x0;if(_0x50ef31[_0x3b073(0x175)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x3b073(0x283)!==_0x3b073(0x17b)?(_0x436ff2=Number(RegExp['$1']),_0x28c8bf=Number(RegExp['$2'])):(_0x24ae16[_0x3b073(0x1be)][_0x3b073(0x27b)]['call'](this,_0x1979b5,_0x3eec02,0x0,0x0),_0x97e956[_0x3b073(0x1be)][_0x3b073(0x161)]['call'](this,_0x196a58,_0x513238,0x0,0x0));else _0x50ef31[_0x3b073(0x175)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x436ff2=DataManager[_0x3b073(0x11a)](RegExp['$1']),_0x28c8bf=Number(RegExp['$2']));_0x29a455[_0x3b073(0x2d6)](_0x436ff2,_0x28c8bf),this['makeSuccess'](_0x29a455);}},Game_Action[_0x1fdd0b(0x1be)]['applyBuffTurnManipulationEffects']=function(_0x51bae2){const _0x4a4ce9=_0x1fdd0b,_0x30fbec=[_0x4a4ce9(0x2fd),_0x4a4ce9(0x1bd),_0x4a4ce9(0x147),'DEF',_0x4a4ce9(0x1fb),'MDF',_0x4a4ce9(0x2cc),_0x4a4ce9(0xfc)],_0x1082c4=this['item']()['note'],_0x1660eb=_0x1082c4[_0x4a4ce9(0x175)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x1660eb){if('Enrpr'===_0x4a4ce9(0x260))for(const _0x5210f4 of _0x1660eb){_0x5210f4[_0x4a4ce9(0x175)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x2a9fbf=_0x30fbec[_0x4a4ce9(0x312)](String(RegExp['$1'])['toUpperCase']()),_0x4388fd=Number(RegExp['$2']);_0x2a9fbf>=0x0&&(_0x51bae2[_0x4a4ce9(0x346)](_0x2a9fbf,_0x4388fd),this['makeSuccess'](_0x51bae2));}else{if(!_0x279b30[_0x4a4ce9(0x342)](_0x4b7eeb))return![];}}const _0x5312eb=_0x1082c4[_0x4a4ce9(0x175)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x5312eb){if(_0x4a4ce9(0x17c)===_0x4a4ce9(0x17c))for(const _0x2e1c50 of _0x1660eb){_0x2e1c50[_0x4a4ce9(0x175)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x11e2b0=_0x30fbec['indexOf'](String(RegExp['$1'])[_0x4a4ce9(0x23d)]()),_0x5ddd20=Number(RegExp['$2']);_0x11e2b0>=0x0&&(_0x51bae2[_0x4a4ce9(0x34b)](_0x11e2b0,_0x5ddd20),this['makeSuccess'](_0x51bae2));}else _0x30165c=_0x4e51cf[_0x4a4ce9(0x309)](_0x15dfee);}},Game_Action[_0x1fdd0b(0x1be)][_0x1fdd0b(0x388)]=function(_0x2090ad){const _0x42c93b=_0x1fdd0b,_0x2c185d=[_0x42c93b(0x2fd),_0x42c93b(0x1bd),_0x42c93b(0x147),_0x42c93b(0xdf),_0x42c93b(0x1fb),_0x42c93b(0x1b6),_0x42c93b(0x2cc),_0x42c93b(0xfc)],_0x7259c1=this[_0x42c93b(0x1c5)]()['note'],_0x25eae0=_0x7259c1[_0x42c93b(0x175)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x25eae0)for(const _0x5988ed of _0x25eae0){if(_0x42c93b(0x3d0)===_0x42c93b(0xe3))return _0x2682e['SkillsStatesCore'][_0x42c93b(0x35f)][_0x42c93b(0x392)][_0x42c93b(0x16d)];else{_0x5988ed['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x21ff83=_0x2c185d[_0x42c93b(0x312)](String(RegExp['$1'])[_0x42c93b(0x23d)]()),_0x20f25c=Number(RegExp['$2']);if(_0x21ff83>=0x0){if(_0x42c93b(0x15c)!==_0x42c93b(0x197))_0x2090ad[_0x42c93b(0x2bf)](_0x21ff83,_0x20f25c),this['makeSuccess'](_0x2090ad);else{if(!_0x11ec7f['isLearnedSkill'](_0x523f8a))return!![];}}}}const _0x4d0866=_0x7259c1['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x4d0866){if(_0x42c93b(0xe2)===_0x42c93b(0xe2))for(const _0xc87b2b of _0x25eae0){if(_0x42c93b(0x266)!==_0x42c93b(0x1f6)){_0xc87b2b[_0x42c93b(0x175)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x9c0130=_0x2c185d[_0x42c93b(0x312)](String(RegExp['$1'])[_0x42c93b(0x23d)]()),_0x5a7657=Number(RegExp['$2']);_0x9c0130>=0x0&&(_0x2090ad[_0x42c93b(0x21c)](_0x9c0130,_0x5a7657),this[_0x42c93b(0x1c2)](_0x2090ad));}else _0x2c708c[_0x42c93b(0x1a2)][_0x42c93b(0x211)][_0x42c93b(0x320)](this,_0x516fe8),_0x7299a9[_0x42c93b(0x1a2)][_0x42c93b(0x391)](_0x31cf23),_0x23bc8e[_0x42c93b(0x1a2)][_0x42c93b(0x326)](_0x30db7e);}else this[_0x42c93b(0x120)]=null;}},VisuMZ[_0x1fdd0b(0x1a2)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x19e)],Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x19e)]=function(){const _0x52878c=_0x1fdd0b;this[_0x52878c(0x187)]={},this[_0x52878c(0x1d5)](),VisuMZ[_0x52878c(0x1a2)][_0x52878c(0x3c3)]['call'](this);},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1d5)]=function(){const _0x3bda36=_0x1fdd0b;this[_0x3bda36(0xf8)]='',this[_0x3bda36(0x2ea)]={},this['_stateDisplay']={},this[_0x3bda36(0xda)]={};},Game_BattlerBase[_0x1fdd0b(0x1be)]['checkCacheKey']=function(_0x4d51e9){const _0x1a0dc9=_0x1fdd0b;return this[_0x1a0dc9(0x187)]=this[_0x1a0dc9(0x187)]||{},this[_0x1a0dc9(0x187)][_0x4d51e9]!==undefined;},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x271)]=Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x274)],Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x274)]=function(){const _0x3968c7=_0x1fdd0b;this[_0x3968c7(0x187)]={},VisuMZ[_0x3968c7(0x1a2)][_0x3968c7(0x271)][_0x3968c7(0x320)](this);},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x18c)]=Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0xff)],Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0xff)]=function(_0x1254d8){const _0xb172c0=_0x1fdd0b;let _0x4e6c1e=this[_0xb172c0(0x32f)](_0x1254d8);VisuMZ[_0xb172c0(0x1a2)]['Game_BattlerBase_eraseState'][_0xb172c0(0x320)](this,_0x1254d8);if(_0x4e6c1e&&!this[_0xb172c0(0x32f)](_0x1254d8))this['onRemoveState'](_0x1254d8);},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x291)]=function(_0x2483dd){const _0x4214bd=_0x1fdd0b;this[_0x4214bd(0x218)](_0x2483dd),this[_0x4214bd(0x15f)](_0x2483dd),this[_0x4214bd(0x3a3)](_0x2483dd);},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x2a9)]=Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x16a)],Game_BattlerBase['prototype'][_0x1fdd0b(0x16a)]=function(_0x520557){const _0xc77e6=_0x1fdd0b,_0x257732=$dataStates[_0x520557],_0x5a4fe2=this[_0xc77e6(0x12c)](_0x520557),_0x4c2d42=this[_0xc77e6(0x2b5)](_0x257732)['toLowerCase']()[_0xc77e6(0x363)]();switch(_0x4c2d42){case'ignore':if(_0x5a4fe2<=0x0)VisuMZ[_0xc77e6(0x1a2)]['Game_BattlerBase_resetStateCounts'][_0xc77e6(0x320)](this,_0x520557);break;case _0xc77e6(0x21f):VisuMZ[_0xc77e6(0x1a2)][_0xc77e6(0x2a9)][_0xc77e6(0x320)](this,_0x520557);break;case _0xc77e6(0x3d1):VisuMZ['SkillsStatesCore']['Game_BattlerBase_resetStateCounts'][_0xc77e6(0x320)](this,_0x520557),this['_stateTurns'][_0x520557]=Math[_0xc77e6(0x1bb)](this[_0xc77e6(0x277)][_0x520557],_0x5a4fe2);break;case _0xc77e6(0x381):VisuMZ['SkillsStatesCore'][_0xc77e6(0x2a9)][_0xc77e6(0x320)](this,_0x520557),this['_stateTurns'][_0x520557]+=_0x5a4fe2;break;default:VisuMZ[_0xc77e6(0x1a2)]['Game_BattlerBase_resetStateCounts'][_0xc77e6(0x320)](this,_0x520557);break;}},Game_BattlerBase[_0x1fdd0b(0x1be)]['getStateReapplyRulings']=function(_0x590c48){const _0xd55e48=_0x1fdd0b,_0x542b76=_0x590c48[_0xd55e48(0x188)];return _0x542b76[_0xd55e48(0x175)](/<REAPPLY RULES:[ ](.*)>/i)?_0xd55e48(0x323)===_0xd55e48(0x323)?String(RegExp['$1']):this['_stateRetainType']:VisuMZ[_0xd55e48(0x1a2)]['Settings']['States']['ReapplyRules'];},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x3e1)]=Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x11c)],Game_BattlerBase[_0x1fdd0b(0x1be)]['overwriteBuffTurns']=function(_0x1ff63e,_0x3a4452){const _0x2f3fac=_0x1fdd0b,_0x5c0ded=VisuMZ['SkillsStatesCore']['Settings']['Buffs'][_0x2f3fac(0x292)],_0xc89c2e=this[_0x2f3fac(0x1d1)](_0x1ff63e);switch(_0x5c0ded){case'ignore':if(_0xc89c2e<=0x0)this['_buffTurns'][_0x1ff63e]=_0x3a4452;break;case _0x2f3fac(0x21f):this[_0x2f3fac(0x2c8)][_0x1ff63e]=_0x3a4452;break;case _0x2f3fac(0x3d1):this[_0x2f3fac(0x2c8)][_0x1ff63e]=Math[_0x2f3fac(0x1bb)](_0xc89c2e,_0x3a4452);break;case _0x2f3fac(0x381):this[_0x2f3fac(0x2c8)][_0x1ff63e]+=_0x3a4452;break;default:VisuMZ[_0x2f3fac(0x1a2)][_0x2f3fac(0x3e1)][_0x2f3fac(0x320)](this,_0x1ff63e,_0x3a4452);break;}const _0x17888e=VisuMZ[_0x2f3fac(0x1a2)][_0x2f3fac(0x35f)][_0x2f3fac(0x10f)][_0x2f3fac(0x322)];this['_buffTurns'][_0x1ff63e]=this[_0x2f3fac(0x2c8)][_0x1ff63e][_0x2f3fac(0x329)](0x0,_0x17888e);},Game_BattlerBase['prototype'][_0x1fdd0b(0x3dd)]=function(){const _0x3cbfa6=_0x1fdd0b;if(this['_cache'][_0x3cbfa6(0x1e2)]!==undefined)return this['_cache'][_0x3cbfa6(0x1e2)];this[_0x3cbfa6(0x187)]['groupDefeat']=![];const _0x325dd0=this[_0x3cbfa6(0x3db)]();for(const _0x1b5219 of _0x325dd0){if(!_0x1b5219)continue;if(_0x1b5219['note']['match'](/<GROUP DEFEAT>/i)){if(_0x3cbfa6(0x1ce)!=='uffaM'){let _0x4f7215=[this['actor'](),this[_0x3cbfa6(0x1ee)]()];_0x4f7215=_0x4f7215[_0x3cbfa6(0x10a)](this[_0x3cbfa6(0x31d)]()['filter'](_0x8d9715=>_0x8d9715));for(const _0x441eb6 of this['_skills']){const _0x4cc515=_0x58dbbc[_0x441eb6];if(_0x4cc515)_0x4f7215[_0x3cbfa6(0x356)](_0x4cc515);}return _0x4f7215;}else{this[_0x3cbfa6(0x187)][_0x3cbfa6(0x1e2)]=!![];break;}}}return this[_0x3cbfa6(0x187)]['groupDefeat'];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_clearStates']=Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2d2)],Game_BattlerBase['prototype']['clearStates']=function(){const _0x22fe68=_0x1fdd0b;if(this[_0x22fe68(0x189)]()!==''){if(_0x22fe68(0x242)!==_0x22fe68(0x242)){if(!_0x1fec8f[_0x22fe68(0x342)](_0xf3f73e))return!![];}else this['clearStatesWithStateRetain']();}else VisuMZ['SkillsStatesCore'][_0x22fe68(0x272)][_0x22fe68(0x320)](this),this['initMembersSkillsStatesCore']();},Game_Actor[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2d2)]=function(){const _0x4eb1ed=_0x1fdd0b;this['_stateSteps']=this[_0x4eb1ed(0x3e3)]||{},Game_Battler['prototype'][_0x4eb1ed(0x2d2)][_0x4eb1ed(0x320)](this);},Game_BattlerBase['prototype']['clearStatesWithStateRetain']=function(){const _0x2e4688=_0x1fdd0b,_0x3e3763=this[_0x2e4688(0x3db)]();for(const _0x5b7bb0 of _0x3e3763){if('cDkiV'!==_0x2e4688(0x2d4)){if(_0x5b7bb0&&this[_0x2e4688(0x19d)](_0x5b7bb0))this[_0x2e4688(0xff)](_0x5b7bb0['id']);}else{const _0x4e4489=_0x5591fe(_0x1e29c1['$1']),_0x3ed96a=_0x496443[_0x2e4688(0x1b5)](_0x4e4489);_0x1c9b59[_0x2e4688(0x1a2)][_0x2e4688(0x19f)][_0x2c7b5e['id']]=new _0x12987f(_0x2e4688(0x285),_0x3ed96a);}}this[_0x2e4688(0x187)]={};},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x19d)]=function(_0x64831c){const _0x353d57=_0x1fdd0b,_0x31f1b1=this[_0x353d57(0x189)]();if(_0x31f1b1!==''){const _0x56df96=_0x64831c[_0x353d57(0x188)];if(_0x31f1b1==='death'&&_0x56df96['match'](/<NO DEATH CLEAR>/i))return![];if(_0x31f1b1===_0x353d57(0x31a)&&_0x56df96[_0x353d57(0x175)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x353d57(0x32f)](_0x64831c['id']);},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x189)]=function(){return this['_stateRetainType'];},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0xf4)]=function(_0x2758ec){const _0x30fb38=_0x1fdd0b;this[_0x30fb38(0xf8)]=_0x2758ec;},Game_BattlerBase[_0x1fdd0b(0x1be)]['clearStateRetainType']=function(){const _0x19535e=_0x1fdd0b;this[_0x19535e(0xf8)]='';},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0x3bf)]=Game_BattlerBase['prototype'][_0x1fdd0b(0x33d)],Game_BattlerBase['prototype'][_0x1fdd0b(0x33d)]=function(){const _0x4e974f=_0x1fdd0b;this[_0x4e974f(0xf4)]('death'),VisuMZ[_0x4e974f(0x1a2)][_0x4e974f(0x3bf)][_0x4e974f(0x320)](this),this[_0x4e974f(0x3a8)]();},VisuMZ[_0x1fdd0b(0x1a2)]['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x230)],Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x230)]=function(){const _0xe46ef5=_0x1fdd0b;this[_0xe46ef5(0xf4)]('recover\x20all'),VisuMZ[_0xe46ef5(0x1a2)][_0xe46ef5(0x176)][_0xe46ef5(0x320)](this),this[_0xe46ef5(0x3a8)]();},Game_BattlerBase[_0x1fdd0b(0x1be)]['canPaySkillCost']=function(_0x440e17){const _0x3a0947=_0x1fdd0b;for(settings of VisuMZ[_0x3a0947(0x1a2)][_0x3a0947(0x35f)][_0x3a0947(0x3c2)]){const _0x5a0d77=settings[_0x3a0947(0x37b)][_0x3a0947(0x320)](this,_0x440e17);if(!settings[_0x3a0947(0x12d)][_0x3a0947(0x320)](this,_0x440e17,_0x5a0d77))return![];}return!![];},Game_BattlerBase['prototype'][_0x1fdd0b(0x304)]=function(_0x550284){const _0x4aef7b=_0x1fdd0b;for(settings of VisuMZ[_0x4aef7b(0x1a2)][_0x4aef7b(0x35f)][_0x4aef7b(0x3c2)]){if(_0x4aef7b(0x213)!==_0x4aef7b(0x213))_0x323984[_0x4aef7b(0x3aa)]=_0x19c29e(_0x22b809['$1']);else{const _0x5cd238=settings[_0x4aef7b(0x37b)][_0x4aef7b(0x320)](this,_0x550284);settings['PayJS'][_0x4aef7b(0x320)](this,_0x550284,_0x5cd238);}}},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x35c)]=Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x341)],Game_BattlerBase[_0x1fdd0b(0x1be)]['meetsSkillConditions']=function(_0x2dc4f8){const _0x423291=_0x1fdd0b;if(!_0x2dc4f8)return![];if(!VisuMZ[_0x423291(0x1a2)][_0x423291(0x35c)][_0x423291(0x320)](this,_0x2dc4f8))return![];if(!this[_0x423291(0x26d)](_0x2dc4f8))return![];if(!this[_0x423291(0x134)](_0x2dc4f8))return![];if(!this['meetsSkillConditionsGlobalJS'](_0x2dc4f8))return![];return!![];},Game_BattlerBase['prototype'][_0x1fdd0b(0x26d)]=function(_0x46305a){const _0x4be4d6=_0x1fdd0b;if(!this[_0x4be4d6(0x1a6)](_0x46305a))return![];return!![];},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1a6)]=function(_0x39fd1a){const _0x1b2a48=_0x1fdd0b,_0x48ac33=_0x39fd1a[_0x1b2a48(0x188)];if(_0x48ac33[_0x1b2a48(0x175)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('btWEY'===_0x1b2a48(0x239)){const _0x528214=JSON[_0x1b2a48(0x2f0)]('['+RegExp['$1'][_0x1b2a48(0x175)](/\d+/g)+']');for(const _0x11106 of _0x528214){if(_0x1b2a48(0x3d6)!==_0x1b2a48(0x3d6))_0x4f8991+=_0x491596+0x18;else{if(!$gameSwitches[_0x1b2a48(0x342)](_0x11106))return![];}}return!![];}else this[_0x1b2a48(0x13e)](_0x182ead,_0x21bc24['x'],_0x1ed9c2['y'],_0x35621c);}if(_0x48ac33['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1b2a48(0x158)===_0x1b2a48(0x158)){const _0x5d3695=JSON[_0x1b2a48(0x2f0)]('['+RegExp['$1'][_0x1b2a48(0x175)](/\d+/g)+']');for(const _0x43f144 of _0x5d3695){if('Unamz'===_0x1b2a48(0x310)){if(!$gameSwitches[_0x1b2a48(0x342)](_0x43f144))return![];}else return 0x0;}return!![];}else{if(typeof _0x5a449a!==_0x1b2a48(0x27a))_0x139614=_0x18b279['id'];this[_0x1b2a48(0x32f)](_0x396b33)&&(_0x165fa9+=this[_0x1b2a48(0x12c)](_0x4dcb12),this[_0x1b2a48(0x1fa)](_0x247d08,_0x38533b));}}if(_0x48ac33[_0x1b2a48(0x175)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('jfIte'!==_0x1b2a48(0x37e)){const _0x54cc6e=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3acdb2 of _0x54cc6e){if($gameSwitches[_0x1b2a48(0x342)](_0x3acdb2))return!![];}return![];}else{const _0x247170=_0x2174d0[_0x203ff9];if(_0x247170)_0x3e2456[_0x1b2a48(0x356)](_0x247170);}}if(_0x48ac33[_0x1b2a48(0x175)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x147b6a=JSON[_0x1b2a48(0x2f0)]('['+RegExp['$1'][_0x1b2a48(0x175)](/\d+/g)+']');for(const _0x38cc5e of _0x147b6a){if(_0x1b2a48(0xd6)!==_0x1b2a48(0x379)){if(!$gameSwitches[_0x1b2a48(0x342)](_0x38cc5e))return!![];}else{let _0x379e31=_0x4b2e17[_0x1b2a48(0x1fe)][_0x455349];if(_0x379e31[_0x1b2a48(0x175)](/\\I\[(\d+)\]/i))return _0x379e31;if(this['commandStyle']()===_0x1b2a48(0x20e))return _0x379e31;const _0x342d8c=_0x5ac271['SkillsStatesCore'][_0x1b2a48(0x35f)][_0x1b2a48(0x15a)],_0x100b99=_0x4939a['magicSkills'][_0x1b2a48(0x3b5)](_0x341c55),_0x57a7ff=_0x100b99?_0x342d8c['IconStypeMagic']:_0x342d8c[_0x1b2a48(0x289)];return _0x1b2a48(0x3ac)['format'](_0x57a7ff,_0x379e31);}}return![];}if(_0x48ac33[_0x1b2a48(0x175)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1c69c0=JSON['parse']('['+RegExp['$1'][_0x1b2a48(0x175)](/\d+/g)+']');for(const _0x1ace44 of _0x1c69c0){if(!$gameSwitches[_0x1b2a48(0x342)](_0x1ace44))return!![];}return![];}if(_0x48ac33['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x11e35b=JSON['parse']('['+RegExp['$1'][_0x1b2a48(0x175)](/\d+/g)+']');for(const _0x55b587 of _0x11e35b){if($gameSwitches[_0x1b2a48(0x342)](_0x55b587))return![];}return!![];}return!![];},Game_BattlerBase[_0x1fdd0b(0x1be)]['meetsSkillConditionsEnableJS']=function(_0x666da1){const _0x5e8a6b=_0x1fdd0b,_0xb4f2c5=_0x666da1[_0x5e8a6b(0x188)],_0xc93755=VisuMZ[_0x5e8a6b(0x1a2)][_0x5e8a6b(0x229)];return _0xc93755[_0x666da1['id']]?_0xc93755[_0x666da1['id']][_0x5e8a6b(0x320)](this,_0x666da1):!![];},Game_BattlerBase[_0x1fdd0b(0x1be)]['meetsSkillConditionsGlobalJS']=function(_0x59d938){const _0x13b5db=_0x1fdd0b;return VisuMZ[_0x13b5db(0x1a2)]['Settings']['Skills']['SkillConditionJS'][_0x13b5db(0x320)](this,_0x59d938);},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x28d)]=Game_BattlerBase[_0x1fdd0b(0x1be)]['skillMpCost'],Game_BattlerBase['prototype'][_0x1fdd0b(0x182)]=function(_0xd5606a){const _0x23b83b=_0x1fdd0b;for(settings of VisuMZ[_0x23b83b(0x1a2)][_0x23b83b(0x35f)][_0x23b83b(0x3c2)]){if(settings[_0x23b83b(0x224)][_0x23b83b(0x23d)]()==='MP')return settings[_0x23b83b(0x37b)][_0x23b83b(0x320)](this,_0xd5606a);}return VisuMZ[_0x23b83b(0x1a2)][_0x23b83b(0x28d)][_0x23b83b(0x320)](this,_0xd5606a);},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x2fe)]=Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x14c)],Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x14c)]=function(_0x3224f5){const _0x2faa3d=_0x1fdd0b;for(settings of VisuMZ[_0x2faa3d(0x1a2)][_0x2faa3d(0x35f)][_0x2faa3d(0x3c2)]){if(_0x2faa3d(0x29d)!=='bhMAG'){if(settings['Name']['toUpperCase']()==='TP')return settings['CalcJS'][_0x2faa3d(0x320)](this,_0x3224f5);}else return _0x45c1a6[_0x2faa3d(0x1a2)]['Sprite_Gauge_currentMaxValue'][_0x2faa3d(0x320)](this);}return VisuMZ['SkillsStatesCore'][_0x2faa3d(0x2fe)][_0x2faa3d(0x320)](this,_0x3224f5);},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x250)]=function(_0xb24898){const _0x23aef1=_0x1fdd0b;if(typeof _0xb24898==='number')_0xb24898=$dataStates[_0xb24898];return this[_0x23aef1(0x3db)]()[_0x23aef1(0x3b5)](_0xb24898);},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x2a4)]=Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x3db)],Game_BattlerBase['prototype']['states']=function(){const _0x4e6740=_0x1fdd0b;let _0x1bddfa=VisuMZ[_0x4e6740(0x1a2)]['Game_BattlerBase_states'][_0x4e6740(0x320)](this);if($gameTemp['_checkingPassiveStates'])return _0x1bddfa;return $gameTemp[_0x4e6740(0x321)]=!![],this[_0x4e6740(0x3be)](_0x1bddfa),$gameTemp[_0x4e6740(0x321)]=undefined,_0x1bddfa;},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x3be)]=function(_0x1b91f1){const _0x456657=_0x1fdd0b,_0x147702=this['passiveStates']();for(state of _0x147702){if(_0x456657(0x25c)!==_0x456657(0x2d5)){if(!state)continue;if(!this[_0x456657(0x258)](state)&&_0x1b91f1[_0x456657(0x3b5)](state))continue;_0x1b91f1[_0x456657(0x356)](state);}else{_0x5afc7['SkillsStatesCore'][_0x456657(0x25e)]['call'](this,_0x29e896);if(!this['isBuffOrDebuffAffected'](_0x50936))this[_0x456657(0x344)](_0x383b64);}}if(_0x147702[_0x456657(0x253)]>0x0){if(_0x456657(0x380)==='ACPkU'){const _0x1048c9=_0x5dd19d[_0x456657(0x188)];if(_0x127e77===_0x456657(0x36c)&&_0x1048c9[_0x456657(0x175)](/<NO DEATH CLEAR>/i))return![];if(_0x42223a==='recover\x20all'&&_0x1048c9[_0x456657(0x175)](/<NO RECOVER ALL CLEAR>/i))return![];}else _0x1b91f1[_0x456657(0x27d)]((_0x213314,_0x160e0f)=>{const _0x20e642=_0x456657;if(_0x20e642(0x2f6)!=='XiACC'){const _0x287838=_0x213314[_0x20e642(0x20d)],_0x16197c=_0x160e0f[_0x20e642(0x20d)];if(_0x287838!==_0x16197c)return _0x16197c-_0x287838;return _0x213314-_0x160e0f;}else return![];});}},Game_BattlerBase[_0x1fdd0b(0x1be)]['isPassiveStateStackable']=function(_0x91ce9a){const _0x1fdb65=_0x1fdd0b;return _0x91ce9a[_0x1fdb65(0x188)]['match'](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x39e)]=Game_BattlerBase[_0x1fdd0b(0x1be)]['traitsSet'],Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1ab)]=function(_0x16510c){const _0x3f0f80=_0x1fdd0b;this[_0x3f0f80(0xfe)]=!![];let _0x29746f=VisuMZ[_0x3f0f80(0x1a2)][_0x3f0f80(0x39e)][_0x3f0f80(0x320)](this,_0x16510c);return this[_0x3f0f80(0xfe)]=undefined,_0x29746f;},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0xe0)]=function(){const _0x353c0e=_0x1fdd0b;let _0x43b8f3=[];this[_0x353c0e(0x38c)]=this[_0x353c0e(0x38c)]||{};for(;;){_0x43b8f3=[];let _0x56bfdb=!![];for(const _0x41318a of this['_cache'][_0x353c0e(0x160)]){const _0x3937a8=$dataStates[_0x41318a];if(!_0x3937a8)continue;let _0x4c7179=this[_0x353c0e(0x3e0)](_0x3937a8);if(this[_0x353c0e(0x38c)][_0x41318a]!==_0x4c7179){if(_0x353c0e(0x3b1)===_0x353c0e(0x1b7))return!![];else _0x56bfdb=![],this[_0x353c0e(0x38c)][_0x41318a]=_0x4c7179;}if(!_0x4c7179)continue;_0x43b8f3[_0x353c0e(0x356)](_0x3937a8);}if(_0x56bfdb)break;else{if(!this[_0x353c0e(0xfe)])this[_0x353c0e(0x274)]();this[_0x353c0e(0x333)]();}}return _0x43b8f3;},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x3e0)]=function(_0x5b6416){const _0x36086e=_0x1fdd0b;if(!this[_0x36086e(0x155)](_0x5b6416))return![];if(!this[_0x36086e(0x367)](_0x5b6416))return![];if(!this[_0x36086e(0x171)](_0x5b6416))return![];if(!this[_0x36086e(0x2df)](_0x5b6416))return![];return!![];},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x155)]=function(_0x211d6c){return!![];},Game_Actor['prototype']['meetsPassiveStateConditionClasses']=function(_0x453eea){const _0x3c0aa7=_0x1fdd0b,_0x1043aa=_0x453eea[_0x3c0aa7(0x188)];if(_0x1043aa[_0x3c0aa7(0x175)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0xb56d3=String(RegExp['$1'])[_0x3c0aa7(0x27c)](',')[_0x3c0aa7(0x2c7)](_0x4688f1=>_0x4688f1['trim']()),_0x49d902=VisuMZ[_0x3c0aa7(0x1a2)]['ParseClassIDs'](_0xb56d3);return _0x49d902[_0x3c0aa7(0x3b5)](this[_0x3c0aa7(0x1ee)]());}if(_0x1043aa[_0x3c0aa7(0x175)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){if(_0x3c0aa7(0x23f)===_0x3c0aa7(0x23f)){const _0x27d5ef=String(RegExp['$1'])[_0x3c0aa7(0x27c)](',')[_0x3c0aa7(0x2c7)](_0x52f322=>_0x52f322['trim']()),_0x12586b=VisuMZ[_0x3c0aa7(0x1a2)][_0x3c0aa7(0x132)](_0x27d5ef);let _0x2cfa95=[this[_0x3c0aa7(0x1ee)]()];return Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x3c0aa7(0x202)]&&(_0x2cfa95=this[_0x3c0aa7(0x202)]()),_0x12586b[_0x3c0aa7(0x360)](_0x41e8ae=>_0x2cfa95[_0x3c0aa7(0x3b5)](_0x41e8ae))[_0x3c0aa7(0x253)]>0x0;}else _0x1e0049[_0x3c0aa7(0x346)](_0x526d20,_0x55111a),this[_0x3c0aa7(0x1c2)](_0x1e420f);}return Game_BattlerBase[_0x3c0aa7(0x1be)][_0x3c0aa7(0x155)]['call'](this,_0x453eea);},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x132)]=function(_0x1505c9){const _0x48b596=_0x1fdd0b,_0x45fdce=[];for(let _0x5a80c9 of _0x1505c9){_0x5a80c9=(String(_0x5a80c9)||'')['trim']();const _0x134cae=/^\d+$/['test'](_0x5a80c9);if(_0x134cae){if('qZQNg'!=='qZQNg'){const _0x50961f=_0x455b4c['parse']('['+_0xf3344f['$1'][_0x48b596(0x175)](/\d+/g)+']');for(const _0x5daee3 of _0x50961f){if(!_0x325bde[_0x48b596(0x25a)](_0x5daee3))return![];}return!![];}else _0x45fdce[_0x48b596(0x356)](Number(_0x5a80c9));}else{if(_0x48b596(0x186)!=='MmLyE'){const _0x592106=_0x48b596(0x290);this[_0x48b596(0x228)]=this[_0x48b596(0x228)]||{};if(this[_0x48b596(0x228)][_0x592106])return this[_0x48b596(0x228)][_0x592106];const _0xa8361c=_0x3079d8[_0x48b596(0x1a2)]['Settings'][_0x48b596(0x10f)][_0x48b596(0xf3)];return this[_0x48b596(0x14a)](_0x592106,_0xa8361c);}else _0x45fdce[_0x48b596(0x356)](DataManager[_0x48b596(0x22c)](_0x5a80c9));}}return _0x45fdce[_0x48b596(0x2c7)](_0x38818d=>$dataClasses[Number(_0x38818d)])['remove'](null);},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x367)]=function(_0x514b75){const _0x62260d=_0x1fdd0b,_0x578bd8=_0x514b75[_0x62260d(0x188)];if(_0x578bd8[_0x62260d(0x175)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x257869=JSON['parse']('['+RegExp['$1'][_0x62260d(0x175)](/\d+/g)+']');for(const _0x5ab09b of _0x257869){if(_0x62260d(0x2e8)===_0x62260d(0x2de)){if(!_0x53b57c['value'](_0x402bad))return!![];}else{if(!$gameSwitches[_0x62260d(0x342)](_0x5ab09b))return![];}}return!![];}if(_0x578bd8[_0x62260d(0x175)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x418ade=JSON[_0x62260d(0x2f0)]('['+RegExp['$1'][_0x62260d(0x175)](/\d+/g)+']');for(const _0x22865f of _0x418ade){if(!$gameSwitches[_0x62260d(0x342)](_0x22865f))return![];}return!![];}if(_0x578bd8[_0x62260d(0x175)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4ab2ab=JSON[_0x62260d(0x2f0)]('['+RegExp['$1'][_0x62260d(0x175)](/\d+/g)+']');for(const _0x200728 of _0x4ab2ab){if('MUoXf'===_0x62260d(0x1f1)){let _0x485270=this['currentValue']();return _0x742d03[_0x62260d(0x2e1)]&&this['useDigitGrouping']()&&(_0x485270=_0x540ee0[_0x62260d(0x309)](_0x485270)),_0x485270;}else{if($gameSwitches[_0x62260d(0x342)](_0x200728))return!![];}}return![];}if(_0x578bd8[_0x62260d(0x175)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x52ff8e=JSON[_0x62260d(0x2f0)]('['+RegExp['$1'][_0x62260d(0x175)](/\d+/g)+']');for(const _0x528434 of _0x52ff8e){if(!$gameSwitches[_0x62260d(0x342)](_0x528434))return!![];}return![];}if(_0x578bd8[_0x62260d(0x175)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x62260d(0x298)===_0x62260d(0x298)){const _0x5942a2=JSON[_0x62260d(0x2f0)]('['+RegExp['$1'][_0x62260d(0x175)](/\d+/g)+']');for(const _0x25278c of _0x5942a2){if(!$gameSwitches['value'](_0x25278c))return!![];}return![];}else{if(!_0x3b30b9[_0x62260d(0x1ae)](_0x8277e1))return![];}}if(_0x578bd8['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5f2a70=JSON[_0x62260d(0x2f0)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x436c9a of _0x5f2a70){if(_0x62260d(0x2cb)===_0x62260d(0x144)){if(!_0x43207a['SkillsStatesCore']['Settings'][_0x62260d(0x10f)][_0x62260d(0x294)])return;const _0x322116=_0x40900a[_0x62260d(0x2c0)](_0x5b9360),_0x707911=_0x18687f[_0x62260d(0xe9)](_0x22d80e),_0xe6b794=_0xa67f71[_0x62260d(0x37c)],_0x36ae34=_0x29a449[_0x62260d(0x269)]/0x2,_0x2340a0=_0x707911>0x0?_0x259434[_0x62260d(0x125)]():_0x1bd890[_0x62260d(0x300)]();this['changeTextColor'](_0x2340a0),this[_0x62260d(0x35d)](_0x62260d(0x293)),this['contents'][_0x62260d(0x3b3)]=!![],this[_0x62260d(0x1f5)][_0x62260d(0x3d2)]=_0x2c2c16['SkillsStatesCore'][_0x62260d(0x35f)]['Buffs']['DataFontSize'],_0x2f62fb+=_0xc2c836[_0x62260d(0x1a2)][_0x62260d(0x35f)][_0x62260d(0x10f)][_0x62260d(0x332)],_0x151a2b+=_0x470dfd[_0x62260d(0x1a2)][_0x62260d(0x35f)]['Buffs'][_0x62260d(0x358)];const _0x3764dc='%1%'[_0x62260d(0x1b5)](_0x3a1201[_0x62260d(0x352)](_0x322116*0x64));this[_0x62260d(0x1a9)](_0x3764dc,_0x1a9375,_0x391614,_0xe6b794,_0x62260d(0x3a1)),this['contents'][_0x62260d(0x3b3)]=![],this[_0x62260d(0x1a7)]();}else{if($gameSwitches[_0x62260d(0x342)](_0x436c9a))return![];}}return!![];}return!![];},Game_BattlerBase['prototype'][_0x1fdd0b(0x171)]=function(_0x1547de){const _0x24e592=_0x1fdd0b,_0x5f42bc=VisuMZ[_0x24e592(0x1a2)][_0x24e592(0x123)];if(_0x5f42bc[_0x1547de['id']]&&!_0x5f42bc[_0x1547de['id']][_0x24e592(0x320)](this,_0x1547de))return![];return!![];},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2df)]=function(_0x42d262){const _0x5de833=_0x1fdd0b;return VisuMZ['SkillsStatesCore'][_0x5de833(0x35f)][_0x5de833(0x251)]['PassiveConditionJS'][_0x5de833(0x320)](this,_0x42d262);},Game_BattlerBase[_0x1fdd0b(0x1be)]['passiveStates']=function(){const _0x105405=_0x1fdd0b;if(this[_0x105405(0x30e)](_0x105405(0x160)))return this[_0x105405(0xe0)]();if(this[_0x105405(0x220)])return[];return this[_0x105405(0x220)]=!![],this[_0x105405(0x333)](),this[_0x105405(0x220)]=undefined,this[_0x105405(0xe0)]();},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x333)]=function(){const _0x378d43=_0x1fdd0b;this[_0x378d43(0x220)]=!![],this[_0x378d43(0x187)][_0x378d43(0x160)]=[],this[_0x378d43(0x111)](),this[_0x378d43(0x32e)](),this['addPassiveStatesByPluginParameters'](),this[_0x378d43(0x220)]=undefined;},Game_BattlerBase['prototype'][_0x1fdd0b(0x111)]=function(){const _0x3539ca=_0x1fdd0b;if(Imported[_0x3539ca(0x31c)])this[_0x3539ca(0x16c)]();},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x267)]=function(){return[];},Game_BattlerBase['prototype'][_0x1fdd0b(0x32e)]=function(){const _0x3f54aa=_0x1fdd0b,_0x344224=this[_0x3f54aa(0x267)]();for(const _0x4e3b31 of _0x344224){if(!_0x4e3b31)continue;const _0x4e2a05=_0x4e3b31[_0x3f54aa(0x188)]['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x4e2a05)for(const _0x5c5176 of _0x4e2a05){_0x5c5176[_0x3f54aa(0x175)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x5f180b=RegExp['$1'];if(_0x5f180b['match'](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x5e0fc8=JSON['parse']('['+RegExp['$1'][_0x3f54aa(0x175)](/\d+/g)+']');this[_0x3f54aa(0x187)]['passiveStates']=this[_0x3f54aa(0x187)][_0x3f54aa(0x160)][_0x3f54aa(0x10a)](_0x5e0fc8);}else{const _0x1171b6=_0x5f180b[_0x3f54aa(0x27c)](',');for(const _0x34d54f of _0x1171b6){const _0x521260=DataManager[_0x3f54aa(0x11a)](_0x34d54f);if(_0x521260)this[_0x3f54aa(0x187)][_0x3f54aa(0x160)][_0x3f54aa(0x356)](_0x521260);}}}}},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0xf1)]=function(){const _0x4d2ea8=_0x1fdd0b,_0x492feb=VisuMZ[_0x4d2ea8(0x1a2)][_0x4d2ea8(0x35f)][_0x4d2ea8(0x251)][_0x4d2ea8(0x234)];this[_0x4d2ea8(0x187)]['passiveStates']=this[_0x4d2ea8(0x187)][_0x4d2ea8(0x160)][_0x4d2ea8(0x10a)](_0x492feb);},Game_BattlerBase['prototype'][_0x1fdd0b(0x12c)]=function(_0x454528){const _0x6c2025=_0x1fdd0b;if(typeof _0x454528!==_0x6c2025(0x27a))_0x454528=_0x454528['id'];return this[_0x6c2025(0x277)][_0x454528]||0x0;},Game_BattlerBase['prototype'][_0x1fdd0b(0x1fa)]=function(_0x425cea,_0x26397f){const _0x50ead4=_0x1fdd0b;if(typeof _0x425cea!==_0x50ead4(0x27a))_0x425cea=_0x425cea['id'];if(this[_0x50ead4(0x32f)](_0x425cea)){const _0x173416=DataManager[_0x50ead4(0x207)](_0x425cea);this['_stateTurns'][_0x425cea]=_0x26397f[_0x50ead4(0x329)](0x0,_0x173416);if(this[_0x50ead4(0x277)][_0x425cea]<=0x0)this[_0x50ead4(0x29e)](_0x425cea);}},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2d6)]=function(_0x2fe5ae,_0x539723){const _0x516a6e=_0x1fdd0b;if(typeof _0x2fe5ae!==_0x516a6e(0x27a))_0x2fe5ae=_0x2fe5ae['id'];this[_0x516a6e(0x32f)](_0x2fe5ae)&&(_0x539723+=this[_0x516a6e(0x12c)](_0x2fe5ae),this[_0x516a6e(0x1fa)](_0x2fe5ae,_0x539723));},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x38a)]=Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x344)],Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x344)]=function(_0x3798c5){const _0x16610d=_0x1fdd0b,_0xb6624a=this['_buffs'][_0x3798c5];VisuMZ[_0x16610d(0x1a2)][_0x16610d(0x38a)]['call'](this,_0x3798c5);if(_0xb6624a>0x0)this[_0x16610d(0x131)](_0x3798c5);if(_0xb6624a<0x0)this[_0x16610d(0x1d0)](_0x3798c5);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_increaseBuff']=Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1c0)],Game_BattlerBase['prototype']['increaseBuff']=function(_0x2a5045){const _0x2fca15=_0x1fdd0b;VisuMZ[_0x2fca15(0x1a2)][_0x2fca15(0x25e)][_0x2fca15(0x320)](this,_0x2a5045);if(!this[_0x2fca15(0x165)](_0x2a5045))this['eraseBuff'](_0x2a5045);},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0xe7)]=Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x29f)],Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x29f)]=function(_0x5db80f){const _0xf082a8=_0x1fdd0b;VisuMZ[_0xf082a8(0x1a2)][_0xf082a8(0xe7)][_0xf082a8(0x320)](this,_0x5db80f);if(!this[_0xf082a8(0x165)](_0x5db80f))this[_0xf082a8(0x344)](_0x5db80f);},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x131)]=function(_0x47705c){},Game_BattlerBase['prototype'][_0x1fdd0b(0x1d0)]=function(_0x5b2017){},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1fd)]=function(_0x5d9805){const _0x46ef46=_0x1fdd0b;return this[_0x46ef46(0x112)][_0x5d9805]===VisuMZ[_0x46ef46(0x1a2)][_0x46ef46(0x35f)]['Buffs'][_0x46ef46(0x178)];},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x11d)]=function(_0x184f3f){const _0xb6320a=_0x1fdd0b;return this[_0xb6320a(0x112)][_0x184f3f]===-VisuMZ[_0xb6320a(0x1a2)][_0xb6320a(0x35f)][_0xb6320a(0x10f)]['StackDebuffMax'];},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x2b8)]=Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x206)],Game_BattlerBase['prototype'][_0x1fdd0b(0x206)]=function(_0x598be4,_0x35343d){const _0x2e848f=_0x1fdd0b;return _0x598be4=_0x598be4[_0x2e848f(0x329)](-0x2,0x2),VisuMZ['SkillsStatesCore'][_0x2e848f(0x2b8)][_0x2e848f(0x320)](this,_0x598be4,_0x35343d);},Game_BattlerBase[_0x1fdd0b(0x1be)]['paramBuffRate']=function(_0x1f880c){const _0x2434e2=_0x1fdd0b,_0x3ca4db=this[_0x2434e2(0x112)][_0x1f880c];return VisuMZ[_0x2434e2(0x1a2)][_0x2434e2(0x35f)][_0x2434e2(0x10f)][_0x2434e2(0x3b7)][_0x2434e2(0x320)](this,_0x1f880c,_0x3ca4db);},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1d1)]=function(_0xadf5d8){const _0x5e77ef=_0x1fdd0b;return this[_0x5e77ef(0x2c8)][_0xadf5d8]||0x0;},Game_BattlerBase['prototype']['debuffTurns']=function(_0x32518d){const _0x3b0f30=_0x1fdd0b;return this[_0x3b0f30(0x1d1)](_0x32518d);},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x346)]=function(_0x5db370,_0x52d767){const _0x4fc6ec=_0x1fdd0b;if(this['isBuffAffected'](_0x5db370)){if(_0x4fc6ec(0x116)!==_0x4fc6ec(0x20b)){const _0x370c62=VisuMZ[_0x4fc6ec(0x1a2)][_0x4fc6ec(0x35f)][_0x4fc6ec(0x10f)][_0x4fc6ec(0x322)];this[_0x4fc6ec(0x2c8)][_0x5db370]=_0x52d767[_0x4fc6ec(0x329)](0x0,_0x370c62);}else return _0x264503[_0x4fc6ec(0x205)];}},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x34b)]=function(_0x26364b,_0x5118a3){const _0x514e14=_0x1fdd0b;this[_0x514e14(0x19a)](_0x26364b)&&(_0x5118a3+=this['buffTurns'](stateId),this[_0x514e14(0x1fa)](_0x26364b,_0x5118a3));},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2bf)]=function(_0x254bac,_0x2e18c1){const _0x2947e7=_0x1fdd0b;if(this['isDebuffAffected'](_0x254bac)){const _0x5ede38=VisuMZ['SkillsStatesCore'][_0x2947e7(0x35f)][_0x2947e7(0x10f)][_0x2947e7(0x322)];this['_buffTurns'][_0x254bac]=_0x2e18c1['clamp'](0x0,_0x5ede38);}},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x21c)]=function(_0x3cfb7a,_0x3f9907){const _0x4f3327=_0x1fdd0b;this[_0x4f3327(0x3af)](_0x3cfb7a)&&(_0x3f9907+=this['buffTurns'](stateId),this[_0x4f3327(0x1fa)](_0x3cfb7a,_0x3f9907));},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2c3)]=function(_0x251a22){const _0x4f7b50=_0x1fdd0b;if(typeof _0x251a22!==_0x4f7b50(0x27a))_0x251a22=_0x251a22['id'];return this[_0x4f7b50(0x2ea)]=this[_0x4f7b50(0x2ea)]||{},this[_0x4f7b50(0x2ea)][_0x251a22]=this[_0x4f7b50(0x2ea)][_0x251a22]||{},this[_0x4f7b50(0x2ea)][_0x251a22];},Game_BattlerBase['prototype']['getStateData']=function(_0x193ab8,_0x3c1756){const _0x4d834f=_0x1fdd0b;if(typeof _0x193ab8!==_0x4d834f(0x27a))_0x193ab8=_0x193ab8['id'];const _0x47aacc=this['stateData'](_0x193ab8);return _0x47aacc[_0x3c1756];},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x284)]=function(_0x114ce3,_0x1d98ac,_0x3f95e1){const _0x5dd1e0=_0x1fdd0b;if(typeof _0x114ce3!=='number')_0x114ce3=_0x114ce3['id'];const _0x1a5085=this[_0x5dd1e0(0x2c3)](_0x114ce3);_0x1a5085[_0x1d98ac]=_0x3f95e1;},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x218)]=function(_0x21e4e7){const _0x3ea205=_0x1fdd0b;if(typeof _0x21e4e7!==_0x3ea205(0x27a))_0x21e4e7=_0x21e4e7['id'];this[_0x3ea205(0x2ea)]=this[_0x3ea205(0x2ea)]||{},this['_stateData'][_0x21e4e7]={};},Game_BattlerBase[_0x1fdd0b(0x1be)]['getStateDisplay']=function(_0x228224){const _0x35c832=_0x1fdd0b;if(typeof _0x228224!==_0x35c832(0x27a))_0x228224=_0x228224['id'];this[_0x35c832(0x343)]=this[_0x35c832(0x343)]||{};if(this[_0x35c832(0x343)][_0x228224]===undefined){if('cXhLY'==='OjOod')return _0x2f825d['VisuMZ_1_ItemsEquipsCore']?_0x39ac3e[_0x35c832(0x1be)][_0x35c832(0x372)]():0x0;else this[_0x35c832(0x343)][_0x228224]='';}return this[_0x35c832(0x343)][_0x228224];},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x30c)]=function(_0x252d3e,_0x3c1ea8){const _0x91ece9=_0x1fdd0b;if(typeof _0x252d3e!==_0x91ece9(0x27a))_0x252d3e=_0x252d3e['id'];this[_0x91ece9(0x343)]=this[_0x91ece9(0x343)]||{},this[_0x91ece9(0x343)][_0x252d3e]=_0x3c1ea8;},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x15f)]=function(_0x5a1399){const _0x5bee09=_0x1fdd0b;if(typeof _0x5a1399!==_0x5bee09(0x27a))_0x5a1399=_0x5a1399['id'];this[_0x5bee09(0x343)]=this[_0x5bee09(0x343)]||{},this[_0x5bee09(0x343)][_0x5a1399]='';},Game_BattlerBase['prototype'][_0x1fdd0b(0x2a2)]=function(_0x5b7aa7){const _0x4b9bd3=_0x1fdd0b;if(typeof _0x5b7aa7!==_0x4b9bd3(0x27a))_0x5b7aa7=_0x5b7aa7['id'];this['_stateOrigin']=this[_0x4b9bd3(0xda)]||{},this['_stateOrigin'][_0x5b7aa7]=this[_0x4b9bd3(0xda)][_0x5b7aa7]||_0x4b9bd3(0xf7);const _0x3e23b5=this[_0x4b9bd3(0xda)][_0x5b7aa7];return this[_0x4b9bd3(0x2a3)](_0x3e23b5);},Game_BattlerBase['prototype'][_0x1fdd0b(0x136)]=function(_0x31bc5d,_0x2e6de7){const _0x5b7cc2=_0x1fdd0b;this[_0x5b7cc2(0xda)]=this['_stateOrigin']||{};const _0x58d6f0=_0x2e6de7?this[_0x5b7cc2(0x129)](_0x2e6de7):this['getCurrentStateOriginKey']();this[_0x5b7cc2(0xda)][_0x31bc5d]=_0x58d6f0;},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x3a3)]=function(_0x4a3fdf){const _0x12723a=_0x1fdd0b;this[_0x12723a(0xda)]=this[_0x12723a(0xda)]||{},delete this[_0x12723a(0xda)][_0x4a3fdf];},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x104)]=function(){const _0xdb01db=_0x1fdd0b,_0x81b82f=this[_0xdb01db(0x12b)]();return this[_0xdb01db(0x129)](_0x81b82f);},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x12b)]=function(){const _0x1ef69a=_0x1fdd0b;if($gameParty[_0x1ef69a(0x21a)]()){if(BattleManager[_0x1ef69a(0x1a8)]){if('FjCpX'!==_0x1ef69a(0x2db)){if(_0x1338c9[_0x1ef69a(0x25a)](_0x98b32))return![];}else return BattleManager[_0x1ef69a(0x1a8)];}else{if(BattleManager[_0x1ef69a(0x241)])return _0x1ef69a(0x263)!==_0x1ef69a(0x1b0)?BattleManager[_0x1ef69a(0x241)]:_0x28d759[_0x1ef69a(0x1a2)][_0x1ef69a(0x35f)][_0x1ef69a(0x15a)]['SkillConditionJS'][_0x1ef69a(0x320)](this,_0x356dac);}}else{if(_0x1ef69a(0x235)!==_0x1ef69a(0x2c5)){const _0x5c07d8=SceneManager[_0x1ef69a(0x1d9)];if(![Scene_Map,Scene_Item][_0x1ef69a(0x3b5)](_0x5c07d8[_0x1ef69a(0x28c)]))return $gameParty[_0x1ef69a(0x20a)]();}else return _0x2ae5e6[_0x1ef69a(0x1be)][_0x1ef69a(0x18d)][_0x1ef69a(0x320)](this);}return this;},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x129)]=function(_0x20cd0c){const _0x257814=_0x1fdd0b;if(!_0x20cd0c)return'user';if(_0x20cd0c[_0x257814(0x27e)]())return _0x257814(0x37d)[_0x257814(0x1b5)](_0x20cd0c[_0x257814(0x2c6)]());else{if('ktomY'===_0x257814(0x368)){const _0x164f3d='<enemy-%1>'['format'](_0x20cd0c[_0x257814(0x25f)]()),_0x123512='<member-%1>'[_0x257814(0x1b5)](_0x20cd0c[_0x257814(0x317)]()),_0x333d79=_0x257814(0x313)[_0x257814(0x1b5)]($gameTroop[_0x257814(0x174)]());return _0x257814(0x101)['format'](_0x164f3d,_0x123512,_0x333d79);}else _0x380fae[_0x257814(0xf2)][_0x257814(0x356)](_0x556e1e[_0x257814(0x363)]());}return'user';},Game_BattlerBase['prototype'][_0x1fdd0b(0x2a3)]=function(_0x489e88){const _0x3b1e28=_0x1fdd0b;if(_0x489e88==='user'){if('RRnis'!=='RRnis'){const _0x4ea8c3=_0x476ac1['SkillsStatesCore'][_0x3b1e28(0x35b)]['call'](this);return this[_0x3b1e28(0x30f)]()&&this[_0x3b1e28(0x18e)]()&&(_0x4ea8c3[_0x3b1e28(0x316)]-=this[_0x3b1e28(0x25d)]()),_0x4ea8c3;}else return this;}else{if(_0x489e88[_0x3b1e28(0x175)](/<actor-(\d+)>/i)){if('ArHXa'!==_0x3b1e28(0x387))return $gameActors[_0x3b1e28(0x348)](Number(RegExp['$1']));else{const _0x2a2372=_0x446fe1[_0x3b1e28(0x2f0)]('['+_0x496983['$1'][_0x3b1e28(0x175)](/\d+/g)+']');for(const _0x232363 of _0x2a2372){if(_0x5494f6[_0x3b1e28(0x342)](_0x232363))return![];}return!![];}}else{if(_0x3b1e28(0x1d7)==='jWfxD')return this[_0x3b1e28(0x305)]()[_0x3b1e28(0x175)](/LOWER/i);else{if($gameParty[_0x3b1e28(0x21a)]()&&_0x489e88['match'](/<troop-(\d+)>/i)){if(_0x3b1e28(0x181)!==_0x3b1e28(0x181))return this['includesSkillsStatesCore'](_0x5ab5a6);else{const _0x303e57=Number(RegExp['$1']);if(_0x303e57===$gameTroop[_0x3b1e28(0x174)]()){if(_0x489e88[_0x3b1e28(0x175)](/<member-(\d+)>/i))return $gameTroop[_0x3b1e28(0x355)]()[Number(RegExp['$1'])];}}}if(_0x489e88[_0x3b1e28(0x175)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}}return this;},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x303)]=Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x255)],Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x255)]=function(_0xb35ce4){const _0x4581d4=_0x1fdd0b,_0x3b34ff=this['isStateAddable'](_0xb35ce4);VisuMZ[_0x4581d4(0x1a2)][_0x4581d4(0x303)]['call'](this,_0xb35ce4);if(_0x3b34ff&&this['hasState']($dataStates[_0xb35ce4])){this[_0x4581d4(0x26c)](_0xb35ce4);;}},VisuMZ[_0x1fdd0b(0x1a2)]['Game_Battler_isStateAddable']=Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1d2)],Game_Battler['prototype'][_0x1fdd0b(0x1d2)]=function(_0x3319ae){const _0x535c93=_0x1fdd0b,_0x1e0542=$dataStates[_0x3319ae];if(_0x1e0542&&_0x1e0542[_0x535c93(0x188)][_0x535c93(0x175)](/<NO DEATH CLEAR>/i))return!this[_0x535c93(0xe8)](_0x3319ae)&&!this[_0x535c93(0x24d)](_0x3319ae)&&!this['_result'][_0x535c93(0x2b3)](_0x3319ae);return VisuMZ[_0x535c93(0x1a2)][_0x535c93(0x13c)]['call'](this,_0x3319ae);},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x26c)]=function(_0x5d2abf){const _0x22fd73=_0x1fdd0b;this['setStateOrigin'](_0x5d2abf),this[_0x22fd73(0xe6)](_0x5d2abf),this[_0x22fd73(0x315)](_0x5d2abf),this[_0x22fd73(0x1f7)](_0x5d2abf),this['onAddStateGlobalJS'](_0x5d2abf);},Game_Battler['prototype'][_0x1fdd0b(0x291)]=function(_0x1326f8){const _0x587175=_0x1fdd0b;this[_0x587175(0x34c)](_0x1326f8),this[_0x587175(0x143)](_0x1326f8),Game_BattlerBase[_0x587175(0x1be)]['onRemoveState']['call'](this,_0x1326f8);},Game_Battler[_0x1fdd0b(0x1be)]['removeStatesAuto']=function(_0x3ae5cc){const _0x358221=_0x1fdd0b;for(const _0x5392db of this[_0x358221(0x3db)]()){this[_0x358221(0x275)](_0x5392db['id'])&&_0x5392db[_0x358221(0x1ed)]===_0x3ae5cc&&(_0x358221(0x261)==='xfPkc'?(this[_0x358221(0x29e)](_0x5392db['id']),this[_0x358221(0x2e6)](_0x5392db['id']),this[_0x358221(0x2d7)](_0x5392db['id'])):this[_0x358221(0x120)]=_0x28c3ca[0x0]);}},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2e6)]=function(_0x11e0e1){this['onExpireStateCustomJS'](_0x11e0e1);},Game_Battler['prototype'][_0x1fdd0b(0x1f7)]=function(_0x425eac){const _0x1321c4=_0x1fdd0b;if(this[_0x1321c4(0x273)]||this[_0x1321c4(0x14d)])return;const _0x4e41e9=VisuMZ['SkillsStatesCore'][_0x1321c4(0x3d8)];if(_0x4e41e9[_0x425eac])_0x4e41e9[_0x425eac][_0x1321c4(0x320)](this,_0x425eac);},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x34c)]=function(_0x4d7e85){const _0x4c9aba=_0x1fdd0b;if(this[_0x4c9aba(0x273)]||this[_0x4c9aba(0x14d)])return;const _0x2b39cc=VisuMZ['SkillsStatesCore'][_0x4c9aba(0x194)];if(_0x2b39cc[_0x4d7e85])_0x2b39cc[_0x4d7e85]['call'](this,_0x4d7e85);},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1e4)]=function(_0x4148cd){const _0x43e3d3=_0x1fdd0b;if(this[_0x43e3d3(0x273)]||this['_tempBattler'])return;const _0x437784=VisuMZ[_0x43e3d3(0x1a2)][_0x43e3d3(0x19f)];if(_0x437784[_0x4148cd])_0x437784[_0x4148cd][_0x43e3d3(0x320)](this,_0x4148cd);},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2b1)]=function(_0x4085b0){const _0x2e1d3a=_0x1fdd0b;if(this[_0x2e1d3a(0x273)]||this[_0x2e1d3a(0x14d)])return;try{if(_0x2e1d3a(0x121)===_0x2e1d3a(0x3d5)){const _0x52eb3e=_0xb88a80(_0x9f9991['$1']),_0x5bcbac=_0x4d2e1b[_0x2e1d3a(0x1b5)](_0x52eb3e,_0x2e1d3a(0x245),0x1,_0x2e1d3a(0x314));_0x2c9218[_0x2e1d3a(0x1a2)][_0x2e1d3a(0x2ba)][_0x12889f['id']]=new _0x521362(_0x2e1d3a(0x285),_0x5bcbac);}else VisuMZ['SkillsStatesCore'][_0x2e1d3a(0x35f)][_0x2e1d3a(0x392)][_0x2e1d3a(0x199)]['call'](this,_0x4085b0);}catch(_0xe2ddfe){if('jZxjl'===_0x2e1d3a(0x38b)){if($gameTemp[_0x2e1d3a(0x399)]())console[_0x2e1d3a(0x393)](_0xe2ddfe);}else return _0x3c018e(_0x51b044['$1']);}},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x143)]=function(_0x3ebe69){const _0x34b219=_0x1fdd0b;if(this['_tempActor']||this[_0x34b219(0x14d)])return;try{VisuMZ['SkillsStatesCore'][_0x34b219(0x35f)][_0x34b219(0x392)]['onEraseStateJS']['call'](this,_0x3ebe69);}catch(_0x105023){if(_0x34b219(0x3a2)!==_0x34b219(0x3a2))_0x133c86[_0x34b219(0x1a2)][_0x34b219(0x1c6)][_0x34b219(0x320)](this),this[_0x34b219(0x24f)]&&this[_0x34b219(0x24f)]['constructor']===_0x98ff80&&this[_0x34b219(0x24f)][_0x34b219(0x16e)](this[_0x34b219(0x1c5)]());else{if($gameTemp[_0x34b219(0x399)]())console[_0x34b219(0x393)](_0x105023);}}},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2d7)]=function(_0x3ddf9c){const _0x41c535=_0x1fdd0b;if(this[_0x41c535(0x273)]||this[_0x41c535(0x14d)])return;try{VisuMZ[_0x41c535(0x1a2)][_0x41c535(0x35f)]['States']['onExpireStateJS'][_0x41c535(0x320)](this,_0x3ddf9c);}catch(_0x357d1a){if($gameTemp[_0x41c535(0x399)]())console['log'](_0x357d1a);}},Game_Battler['prototype']['statesByCategory']=function(_0x527507){const _0xdd2353=_0x1fdd0b;return _0x527507=_0x527507[_0xdd2353(0x23d)]()[_0xdd2353(0x363)](),this[_0xdd2353(0x3db)]()[_0xdd2353(0x360)](_0x1514c6=>_0x1514c6[_0xdd2353(0xf2)][_0xdd2353(0x3b5)](_0x527507));},Game_Battler['prototype'][_0x1fdd0b(0x3e4)]=function(_0x1a98e2,_0x174d7d){const _0xd4ee55=_0x1fdd0b;_0x1a98e2=_0x1a98e2[_0xd4ee55(0x23d)]()[_0xd4ee55(0x363)](),_0x174d7d=_0x174d7d||0x0;const _0x327e69=this[_0xd4ee55(0x15e)](_0x1a98e2),_0x880bf7=[];for(const _0x40b2a2 of _0x327e69){if(!_0x40b2a2)continue;if(_0x174d7d<=0x0)break;_0x880bf7[_0xd4ee55(0x356)](_0x40b2a2['id']),this['_result'][_0xd4ee55(0x325)]=!![],_0x174d7d--;}while(_0x880bf7[_0xd4ee55(0x253)]>0x0){this[_0xd4ee55(0x29e)](_0x880bf7[_0xd4ee55(0x2eb)]());}},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x3c9)]=function(_0x44e3d8,_0xf9059f){const _0x28f4aa=_0x1fdd0b;_0x44e3d8=_0x44e3d8[_0x28f4aa(0x23d)]()[_0x28f4aa(0x363)](),_0xf9059f=_0xf9059f||[];const _0x4ffb42=this[_0x28f4aa(0x15e)](_0x44e3d8),_0x3ccff3=[];for(const _0x566ee5 of _0x4ffb42){if(_0x28f4aa(0x1f2)!==_0x28f4aa(0x1f2)){const _0xcdb8d7=_0x41650b(_0x16f84f['$1']),_0x24002f=_0x28f4aa(0x386)[_0x28f4aa(0x1b5)](_0xcdb8d7);_0x5bc9a9[_0x28f4aa(0x1a2)]['statePassiveConditionJS'][_0x1dd561['id']]=new _0x1bbda2(_0x28f4aa(0x23b),_0x24002f);}else{if(!_0x566ee5)continue;if(_0xf9059f[_0x28f4aa(0x3b5)](_0x566ee5))continue;_0x3ccff3[_0x28f4aa(0x356)](_0x566ee5['id']),this['_result'][_0x28f4aa(0x325)]=!![];}}while(_0x3ccff3[_0x28f4aa(0x253)]>0x0){this[_0x28f4aa(0x29e)](_0x3ccff3[_0x28f4aa(0x2eb)]());}},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x113)]=function(_0x4a9764){const _0x392908=_0x1fdd0b;return this[_0x392908(0x3de)](_0x4a9764)>0x0;},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x159)]=function(_0x3246b1){const _0x3cbeb9=_0x1fdd0b;return this[_0x3cbeb9(0x1cc)](_0x3246b1)>0x0;},Game_Battler[_0x1fdd0b(0x1be)]['totalStateCategoryAffected']=function(_0x3baa08){const _0x5b10b1=this['statesByCategory'](_0x3baa08)['filter'](_0x225c76=>this['isStateAffected'](_0x225c76['id']));return _0x5b10b1['length'];},Game_Battler['prototype'][_0x1fdd0b(0x1cc)]=function(_0x1c0126){const _0x376516=_0x1fdd0b,_0x4b0a94=this[_0x376516(0x15e)](_0x1c0126);return _0x4b0a94[_0x376516(0x253)];},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x29b)]=Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0xe8)],Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0xe8)]=function(_0x493f61){const _0x1341b4=_0x1fdd0b,_0x5061a0=$dataStates[_0x493f61];if(_0x5061a0&&_0x5061a0['categories']['length']>0x0)for(const _0x418813 of _0x5061a0[_0x1341b4(0xf2)]){if(this[_0x1341b4(0x38f)](_0x418813))return!![];}return VisuMZ['SkillsStatesCore'][_0x1341b4(0x29b)][_0x1341b4(0x320)](this,_0x493f61);},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x38f)]=function(_0xcba72b){const _0x58bf59=_0x1fdd0b;let _0x25d5d3='stateCategoriesResisted';if(this['checkCacheKey'](_0x25d5d3))return this[_0x58bf59(0x187)][_0x25d5d3][_0x58bf59(0x3b5)](_0xcba72b);return this[_0x58bf59(0x187)][_0x25d5d3]=this[_0x58bf59(0x208)](),this[_0x58bf59(0x187)][_0x25d5d3]['includes'](_0xcba72b);},Game_BattlerBase[_0x1fdd0b(0x1be)]['makeResistedStateCategories']=function(){const _0x312a62=_0x1fdd0b,_0x5e413e=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x56609e=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x134ac3=[];for(const _0x1bb005 of this[_0x312a62(0x2d0)]()){if(!_0x1bb005)continue;const _0x46bcf3=_0x1bb005[_0x312a62(0x188)],_0x4af213=_0x46bcf3[_0x312a62(0x175)](_0x5e413e);if(_0x4af213)for(const _0x1e966b of _0x4af213){_0x1e966b[_0x312a62(0x175)](_0x5e413e);const _0x30be43=String(RegExp['$1'])[_0x312a62(0x27c)](',')['map'](_0x21beb1=>String(_0x21beb1)['toUpperCase']()[_0x312a62(0x363)]());_0x134ac3=_0x134ac3[_0x312a62(0x10a)](_0x30be43);}if(_0x46bcf3[_0x312a62(0x175)](_0x56609e)){const _0x7ae3fa=String(RegExp['$1'])[_0x312a62(0x27c)](/[\r\n]+/)['map'](_0x37f219=>String(_0x37f219)['toUpperCase']()['trim']());_0x134ac3=_0x134ac3['concat'](_0x7ae3fa);}}return _0x134ac3;},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0xe6)]=function(_0x10d5dd){const _0x27ab1b=_0x1fdd0b,_0x33ecf3=$dataStates[_0x10d5dd];if(!_0x33ecf3)return;const _0x58775b=_0x33ecf3['note']||'',_0x278788=_0x58775b[_0x27ab1b(0x175)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x278788){const _0x2600fd=[_0x33ecf3];for(const _0x3e1d9a of _0x278788){_0x3e1d9a[_0x27ab1b(0x175)](/<REMOVE OTHER (.*) STATES>/i);const _0x3bd1ed=String(RegExp['$1']);this['removeStatesByCategoryAll'](_0x3bd1ed,_0x2600fd);}}},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x1e6)]=Game_Battler[_0x1fdd0b(0x1be)]['addBuff'],Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x3ca)]=function(_0x3427ce,_0x1e0235){const _0x21e2b3=_0x1fdd0b;VisuMZ['SkillsStatesCore']['Game_Battler_addBuff'][_0x21e2b3(0x320)](this,_0x3427ce,_0x1e0235),this[_0x21e2b3(0x19a)](_0x3427ce)&&this[_0x21e2b3(0x280)](_0x3427ce,_0x1e0235);},Game_Battler['prototype'][_0x1fdd0b(0x2f8)]=function(_0x52c1cf){},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0x338)]=Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x281)],Game_Battler[_0x1fdd0b(0x1be)]['addDebuff']=function(_0x355721,_0x38b03c){const _0x5ae618=_0x1fdd0b;VisuMZ[_0x5ae618(0x1a2)][_0x5ae618(0x338)][_0x5ae618(0x320)](this,_0x355721,_0x38b03c),this[_0x5ae618(0x3af)](_0x355721)&&this[_0x5ae618(0x10b)](_0x355721,_0x38b03c);},Game_Battler['prototype'][_0x1fdd0b(0x195)]=function(){const _0x42b7fa=_0x1fdd0b;for(let _0x470525=0x0;_0x470525<this[_0x42b7fa(0x32b)]();_0x470525++){if(this[_0x42b7fa(0x201)](_0x470525)){const _0x363d21=this[_0x42b7fa(0x112)][_0x470525];this['removeBuff'](_0x470525);if(_0x363d21>0x0)this[_0x42b7fa(0x327)](_0x470525);if(_0x363d21<0x0)this[_0x42b7fa(0x1e7)](_0x470525);}}},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x280)]=function(_0x14c461,_0x4c186d){this['onAddBuffGlobalJS'](_0x14c461,_0x4c186d);},Game_Battler['prototype']['onAddDebuff']=function(_0x5d934a,_0x4328df){this['onAddDebuffGlobalJS'](_0x5d934a,_0x4328df);},Game_Battler['prototype'][_0x1fdd0b(0x131)]=function(_0x347bc8){const _0x47b178=_0x1fdd0b;Game_BattlerBase[_0x47b178(0x1be)][_0x47b178(0x131)][_0x47b178(0x320)](this,_0x347bc8),this['onEraseBuffGlobalJS'](_0x347bc8);},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1d0)]=function(_0x15237e){const _0x1bb562=_0x1fdd0b;Game_BattlerBase['prototype']['onEraseDebuff'][_0x1bb562(0x320)](this,_0x15237e),this[_0x1bb562(0x2a6)](_0x15237e);},Game_Battler[_0x1fdd0b(0x1be)]['onExpireBuff']=function(_0x2dcbd3){const _0x200fe3=_0x1fdd0b;this[_0x200fe3(0x339)](_0x2dcbd3);},Game_Battler['prototype'][_0x1fdd0b(0x1e7)]=function(_0x60ef97){this['onExpireDebuffGlobalJS'](_0x60ef97);},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1d3)]=function(_0x2066b3,_0x172786){const _0x1ccdf0=_0x1fdd0b;VisuMZ['SkillsStatesCore'][_0x1ccdf0(0x35f)][_0x1ccdf0(0x10f)][_0x1ccdf0(0x3b9)]['call'](this,_0x2066b3,_0x172786);},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2fb)]=function(_0xa9fe89,_0x19ac2f){const _0x521038=_0x1fdd0b;VisuMZ[_0x521038(0x1a2)]['Settings']['Buffs'][_0x521038(0x2f5)]['call'](this,_0xa9fe89,_0x19ac2f);},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0xfb)]=function(_0x300cae){const _0x3ef17d=_0x1fdd0b;VisuMZ[_0x3ef17d(0x1a2)]['Settings'][_0x3ef17d(0x10f)][_0x3ef17d(0x168)][_0x3ef17d(0x320)](this,_0x300cae);},Game_BattlerBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2a6)]=function(_0x3f39a1){const _0x35f484=_0x1fdd0b;VisuMZ[_0x35f484(0x1a2)]['Settings'][_0x35f484(0x10f)]['onEraseDebuffJS'][_0x35f484(0x320)](this,_0x3f39a1);},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x339)]=function(_0x25043a){const _0x214919=_0x1fdd0b;VisuMZ[_0x214919(0x1a2)][_0x214919(0x35f)][_0x214919(0x10f)][_0x214919(0x223)][_0x214919(0x320)](this,_0x25043a);},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x3bd)]=function(_0x47fb0e){const _0x3ede10=_0x1fdd0b;VisuMZ['SkillsStatesCore'][_0x3ede10(0x35f)]['Buffs']['onExpireDebuffJS'][_0x3ede10(0x320)](this,_0x47fb0e);},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x315)]=function(_0x459782){const _0x49813f=_0x1fdd0b,_0x282a65=VisuMZ[_0x49813f(0x1a2)],_0x49d0b6=[_0x49813f(0x331),_0x49813f(0x1bc),_0x49813f(0x200),_0x49813f(0x2ba),_0x49813f(0x364),_0x49813f(0x26e)];for(const _0x46be40 of _0x49d0b6){if(_0x49813f(0x21d)!=='beoMB')_0x282a65[_0x46be40][_0x459782]&&_0x282a65[_0x46be40][_0x459782][_0x49813f(0x320)](this,_0x459782);else{const _0x5e2623=this[_0x49813f(0x1ea)](_0x296e47),_0x203797=_0x5e2623[_0x49813f(0x22f)];if(_0x5e2623)this[_0x49813f(0x22d)](_0x5e2623);_0x4c66b6[_0x49813f(0x1a2)]['Window_SkillList_drawItem'][_0x49813f(0x320)](this,_0x374449);if(_0x5e2623)_0x5e2623['name']=_0x203797;}}},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x3cc)]=Game_Battler[_0x1fdd0b(0x1be)]['regenerateAll'],Game_Battler[_0x1fdd0b(0x1be)]['regenerateAll']=function(){const _0xd22040=_0x1fdd0b;this[_0xd22040(0x3b2)](),VisuMZ[_0xd22040(0x1a2)]['Game_Battler_regenerateAll'][_0xd22040(0x320)](this),this[_0xd22040(0x2b0)](),this[_0xd22040(0x2ef)]();},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2b0)]=function(){const _0x54fdb4=_0x1fdd0b;for(const _0x41fd9e of this[_0x54fdb4(0x160)]()){if('igjNI'!=='FjJVX'){if(!_0x41fd9e)continue;this[_0x54fdb4(0x315)](_0x41fd9e['id']);}else this[_0x54fdb4(0x222)][_0x2a36e2]=_0x38556e[_0x54fdb4(0x1a2)][_0x54fdb4(0x35f)]['States']['MaxTurns'];}},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x3b2)]=function(){const _0x2c90d9=_0x1fdd0b;for(const _0x239648 of this[_0x2c90d9(0x3db)]()){if(_0x2c90d9(0x163)!==_0x2c90d9(0x163)){if(!_0x435b3f[_0x2c90d9(0x342)](_0x2c159d))return![];}else{if(!_0x239648)continue;_0x239648[_0x2c90d9(0x188)][_0x2c90d9(0x175)](/<JS SLIP REFRESH>/i)&&this[_0x2c90d9(0x315)](_0x239648['id']);}}},Game_Battler[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2ef)]=function(){const _0xfaeabd=_0x1fdd0b;if(!this[_0xfaeabd(0x23e)]())return;const _0x9762b7=this[_0xfaeabd(0x3db)]();for(const _0x139a3a of _0x9762b7){if(!_0x139a3a)continue;this[_0xfaeabd(0x3b6)](_0x139a3a);}},Game_Battler['prototype'][_0x1fdd0b(0x3b6)]=function(_0x34e8a7){const _0x5924af=_0x1fdd0b,_0x41c296=this[_0x5924af(0x306)](_0x34e8a7['id'],_0x5924af(0x3d7))||0x0,_0x55b4ed=-this[_0x5924af(0x108)](),_0x4292c9=Math[_0x5924af(0x1bb)](_0x41c296,_0x55b4ed);if(_0x4292c9!==0x0){if(_0x5924af(0x288)==='wpTGJ'){const _0x3fe660=this[_0x5924af(0x257)][_0x5924af(0x311)]||0x0;this[_0x5924af(0x389)](_0x4292c9),this['_result']['hpDamage']+=_0x3fe660;}else{const _0x47385d=_0x55c479['parse']('['+_0x1235a6['$1']['match'](/\d+/g)+']');this[_0x5924af(0x38e)][_0x5ac7a6['id']]=this['_stypeIDs'][_0x57bfbb['id']][_0x5924af(0x10a)](_0x47385d);}}const _0x25e976=this[_0x5924af(0x306)](_0x34e8a7['id'],_0x5924af(0x314))||0x0;if(_0x25e976!==0x0){const _0x2bfe3e=this[_0x5924af(0x257)]['mpDamage']||0x0;this[_0x5924af(0x137)](_0x25e976),this[_0x5924af(0x257)]['mpDamage']+=_0x2bfe3e;}const _0x559b5f=this[_0x5924af(0x306)](_0x34e8a7['id'],_0x5924af(0x105))||0x0;_0x559b5f!==0x0&&this[_0x5924af(0x240)](_0x559b5f);},VisuMZ[_0x1fdd0b(0x1a2)]['Game_Actor_skillTypes']=Game_Actor['prototype'][_0x1fdd0b(0x1fe)],Game_Actor[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1fe)]=function(){const _0x55bebd=_0x1fdd0b,_0x283148=VisuMZ[_0x55bebd(0x1a2)][_0x55bebd(0x167)][_0x55bebd(0x320)](this),_0x169dca=VisuMZ['SkillsStatesCore'][_0x55bebd(0x35f)][_0x55bebd(0x15a)];let _0x2b9065=_0x169dca[_0x55bebd(0x2f1)];return $gameParty[_0x55bebd(0x21a)]()&&(_0x2b9065=_0x2b9065[_0x55bebd(0x10a)](_0x169dca['BattleHiddenSkillTypes'])),_0x283148['filter'](_0x1f820c=>!_0x2b9065[_0x55bebd(0x3b5)](_0x1f820c));},Game_Actor[_0x1fdd0b(0x1be)]['usableSkills']=function(){const _0x72d8f9=_0x1fdd0b;return this[_0x72d8f9(0x295)]()['filter'](_0x208768=>this['isSkillUsableForAutoBattle'](_0x208768));},Game_Actor[_0x1fdd0b(0x1be)][_0x1fdd0b(0x139)]=function(_0x55a628){const _0x35649c=_0x1fdd0b;if(!this[_0x35649c(0x2e4)](_0x55a628))return![];if(!_0x55a628)return![];if(!this[_0x35649c(0x2ce)](_0x55a628))return![];if(this[_0x35649c(0x373)](_0x55a628))return![];return!![];},Game_Actor[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2ce)]=function(_0x199275){const _0x590551=_0x1fdd0b,_0x499c0e=this[_0x590551(0x1fe)](),_0x124b16=DataManager[_0x590551(0x2dc)](_0x199275),_0x3c67f4=_0x499c0e[_0x590551(0x360)](_0x33c8a4=>_0x124b16[_0x590551(0x3b5)](_0x33c8a4));return _0x3c67f4[_0x590551(0x253)]>0x0;},Game_Actor[_0x1fdd0b(0x1be)][_0x1fdd0b(0x373)]=function(_0x4ee9f6){const _0x44c0d5=_0x1fdd0b;if(!VisuMZ[_0x44c0d5(0x1a2)]['CheckVisibleBattleNotetags'](this,_0x4ee9f6))return!![];if(!VisuMZ[_0x44c0d5(0x1a2)][_0x44c0d5(0x17e)](this,_0x4ee9f6))return!![];if(!VisuMZ[_0x44c0d5(0x1a2)][_0x44c0d5(0x18a)](this,_0x4ee9f6))return!![];return![];},Game_Actor['prototype']['passiveStateObjects']=function(){const _0x36bcf5=_0x1fdd0b;let _0x4e52e5=[this[_0x36bcf5(0x348)](),this[_0x36bcf5(0x1ee)]()];_0x4e52e5=_0x4e52e5['concat'](this[_0x36bcf5(0x31d)]()[_0x36bcf5(0x360)](_0x1b3fbb=>_0x1b3fbb));for(const _0x28f94a of this['_skills']){const _0x18ee03=$dataSkills[_0x28f94a];if(_0x18ee03)_0x4e52e5[_0x36bcf5(0x356)](_0x18ee03);}return _0x4e52e5;},Game_Actor[_0x1fdd0b(0x1be)]['addPassiveStatesByPluginParameters']=function(){const _0x4b5fb8=_0x1fdd0b;Game_Battler['prototype'][_0x4b5fb8(0xf1)][_0x4b5fb8(0x320)](this);const _0x5cf53c=VisuMZ[_0x4b5fb8(0x1a2)]['Settings']['PassiveStates'][_0x4b5fb8(0x370)];this[_0x4b5fb8(0x187)]['passiveStates']=this[_0x4b5fb8(0x187)][_0x4b5fb8(0x160)]['concat'](_0x5cf53c);},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0x26a)]=Game_Actor[_0x1fdd0b(0x1be)][_0x1fdd0b(0x268)],Game_Actor[_0x1fdd0b(0x1be)]['learnSkill']=function(_0x175d27){const _0x2f2564=_0x1fdd0b;VisuMZ[_0x2f2564(0x1a2)][_0x2f2564(0x26a)]['call'](this,_0x175d27),this['_cache']={};},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x2c1)]=Game_Actor['prototype'][_0x1fdd0b(0x353)],Game_Actor[_0x1fdd0b(0x1be)]['forgetSkill']=function(_0x474767){const _0x507da8=_0x1fdd0b;VisuMZ['SkillsStatesCore']['Game_Actor_forgetSkill'][_0x507da8(0x320)](this,_0x474767),this['_cache']={};},Game_Actor[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2f7)]=function(){const _0x2d3d97=_0x1fdd0b;return VisuMZ[_0x2d3d97(0x1a2)][_0x2d3d97(0x35f)][_0x2d3d97(0x392)][_0x2d3d97(0x2b4)]??0x14;},Game_Enemy[_0x1fdd0b(0x1be)][_0x1fdd0b(0x267)]=function(){const _0x772908=_0x1fdd0b;let _0x1a6104=[this['enemy']()];return _0x1a6104['concat'](this[_0x772908(0x295)]());},Game_Enemy['prototype'][_0x1fdd0b(0xf1)]=function(){const _0x1812af=_0x1fdd0b;Game_Battler[_0x1812af(0x1be)][_0x1812af(0xf1)]['call'](this);const _0x330562=VisuMZ[_0x1812af(0x1a2)][_0x1812af(0x35f)][_0x1812af(0x251)][_0x1812af(0x14f)];this[_0x1812af(0x187)][_0x1812af(0x160)]=this['_cache']['passiveStates'][_0x1812af(0x10a)](_0x330562);},Game_Enemy[_0x1fdd0b(0x1be)][_0x1fdd0b(0x295)]=function(){const _0x53d8f3=_0x1fdd0b,_0x586fde=[];for(const _0xf49856 of this[_0x53d8f3(0x36a)]()['actions']){const _0x3dac28=$dataSkills[_0xf49856['skillId']];if(_0x3dac28&&!_0x586fde[_0x53d8f3(0x3b5)](_0x3dac28))_0x586fde[_0x53d8f3(0x356)](_0x3dac28);}return _0x586fde;},Game_Enemy[_0x1fdd0b(0x1be)][_0x1fdd0b(0x3a4)]=function(_0x32f2ea){const _0x7273da=_0x1fdd0b;return this[_0x7273da(0x250)]($dataStates[_0x32f2ea]);},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0x1b8)]=Game_Unit[_0x1fdd0b(0x1be)][_0x1fdd0b(0x215)],Game_Unit[_0x1fdd0b(0x1be)][_0x1fdd0b(0x215)]=function(){const _0x175d2a=_0x1fdd0b;if(this[_0x175d2a(0x248)]())return!![];return VisuMZ[_0x175d2a(0x1a2)][_0x175d2a(0x1b8)][_0x175d2a(0x320)](this);},Game_Unit['prototype'][_0x1fdd0b(0x248)]=function(){const _0xf00c07=_0x1fdd0b,_0x52f12b=this[_0xf00c07(0x3ab)]();for(const _0x22906c of _0x52f12b){if(!_0x22906c['isGroupDefeatStateAffected']())return![];}return!![];},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0xf5)]=Game_Troop[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2e7)],Game_Troop[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2e7)]=function(_0x2b003c){const _0x487f72=_0x1fdd0b;VisuMZ[_0x487f72(0x1a2)]['Game_Troop_setup'][_0x487f72(0x320)](this,_0x2b003c),this['makeCurrentTroopUniqueID']();},Game_Troop[_0x1fdd0b(0x1be)][_0x1fdd0b(0x118)]=function(){const _0x2282c6=_0x1fdd0b;this[_0x2282c6(0x3dc)]=Graphics[_0x2282c6(0x2ad)];},Game_Troop['prototype']['getCurrentTroopUniqueID']=function(){const _0x5abeab=_0x1fdd0b;return this[_0x5abeab(0x3dc)]=this['_currentTroopUniqueID']||Graphics[_0x5abeab(0x2ad)],this[_0x5abeab(0x3dc)];},Scene_Skill[_0x1fdd0b(0x1be)][_0x1fdd0b(0x35a)]=function(){const _0x7324a6=_0x1fdd0b;if(ConfigManager[_0x7324a6(0x279)]&&ConfigManager[_0x7324a6(0x205)]!==undefined)return ConfigManager[_0x7324a6(0x205)];else{if(this[_0x7324a6(0x34d)]())return this[_0x7324a6(0x305)]()['match'](/LOWER/i);else Scene_ItemBase['prototype'][_0x7324a6(0x18d)]['call'](this);}},Scene_Skill['prototype']['isRightInputMode']=function(){const _0x22fbd1=_0x1fdd0b;if(ConfigManager[_0x22fbd1(0x279)]&&ConfigManager[_0x22fbd1(0x38d)]!==undefined)return ConfigManager[_0x22fbd1(0x38d)];else return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x22fbd1(0x305)]()[_0x22fbd1(0x175)](/RIGHT/i):Scene_ItemBase['prototype'][_0x22fbd1(0x18d)][_0x22fbd1(0x320)](this);},Scene_Skill[_0x1fdd0b(0x1be)][_0x1fdd0b(0x305)]=function(){const _0x40b059=_0x1fdd0b;return VisuMZ['SkillsStatesCore']['Settings']['Skills'][_0x40b059(0x378)];},Scene_Skill[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2be)]=function(){const _0x409d4b=_0x1fdd0b;return this[_0x409d4b(0x2da)]&&this[_0x409d4b(0x2da)][_0x409d4b(0x2be)]();},Scene_Skill[_0x1fdd0b(0x1be)][_0x1fdd0b(0x34d)]=function(){const _0x594cb4=_0x1fdd0b;return VisuMZ[_0x594cb4(0x1a2)][_0x594cb4(0x35f)]['Skills'][_0x594cb4(0x22a)];},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0xe4)]=Scene_Skill[_0x1fdd0b(0x1be)][_0x1fdd0b(0x172)],Scene_Skill['prototype'][_0x1fdd0b(0x172)]=function(){const _0x445088=_0x1fdd0b;if(this['isUseSkillsStatesCoreUpdatedLayout']())return this['helpWindowRectSkillsStatesCore']();else{if(_0x445088(0x154)!==_0x445088(0x154)){if(!_0x18d27d[_0x445088(0x342)](_0x2075c9))return!![];}else return VisuMZ['SkillsStatesCore']['Scene_Skill_helpWindowRect'][_0x445088(0x320)](this);}},Scene_Skill[_0x1fdd0b(0x1be)][_0x1fdd0b(0x29a)]=function(){const _0x518760=_0x1fdd0b,_0x212fb0=0x0,_0x44bf2f=this[_0x518760(0x1ac)](),_0x386c99=Graphics['boxWidth'],_0x22aff0=this[_0x518760(0x169)]();return new Rectangle(_0x212fb0,_0x44bf2f,_0x386c99,_0x22aff0);},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0x13a)]=Scene_Skill['prototype']['skillTypeWindowRect'],Scene_Skill[_0x1fdd0b(0x1be)][_0x1fdd0b(0x39f)]=function(){const _0x3a85d2=_0x1fdd0b;return this[_0x3a85d2(0x34d)]()?this['skillTypeWindowRectSkillsStatesCore']():VisuMZ['SkillsStatesCore']['Scene_Skill_skillTypeWindowRect'][_0x3a85d2(0x320)](this);},Scene_Skill[_0x1fdd0b(0x1be)]['skillTypeWindowRectSkillsStatesCore']=function(){const _0x303270=_0x1fdd0b,_0xa3a03e=this[_0x303270(0x2e9)](),_0x36cfcd=this['calcWindowHeight'](0x3,!![]),_0x3773da=this[_0x303270(0x18d)]()?Graphics[_0x303270(0x1e9)]-_0xa3a03e:0x0,_0x129a75=this[_0x303270(0x1db)]();return new Rectangle(_0x3773da,_0x129a75,_0xa3a03e,_0x36cfcd);},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0x153)]=Scene_Skill[_0x1fdd0b(0x1be)][_0x1fdd0b(0x328)],Scene_Skill[_0x1fdd0b(0x1be)][_0x1fdd0b(0x328)]=function(){const _0xf0f5c6=_0x1fdd0b;if(this[_0xf0f5c6(0x34d)]()){if(_0xf0f5c6(0x2c2)!==_0xf0f5c6(0x2c2)){const _0x8abf78=_0x53a70f[_0xf0f5c6(0x3d4)][_0xf0f5c6(0x35f)][_0xf0f5c6(0x3cf)][_0xf0f5c6(0x330)],_0xeb9d9e=_0xdc7794[_0xf0f5c6(0xe1)](_0x3c6125/0x2)-0x18;let _0x1b0c6b=_0x4cc6ed,_0x159a63=_0x2af715[_0xf0f5c6(0xe1)]((this[_0xf0f5c6(0xe5)]-_0xabd71b['ceil'](_0x8abf78[_0xf0f5c6(0x253)]/0x2)*_0x75825d)/0x2),_0x3d5f3b=0x0;for(const _0x2195ad of _0x8abf78){this['drawExtendedParameter'](_0x1b0c6b,_0x159a63,_0xeb9d9e,_0x2195ad),_0x3d5f3b++,_0x3d5f3b%0x2===0x0?(_0x1b0c6b=_0x42fc7e,_0x159a63+=_0x572d80):_0x1b0c6b+=_0xeb9d9e+0x18;}}else return this[_0xf0f5c6(0x2f4)]();}else return _0xf0f5c6(0x3a6)!=='uqDiB'?VisuMZ[_0xf0f5c6(0x1a2)][_0xf0f5c6(0x153)][_0xf0f5c6(0x320)](this):this[_0xf0f5c6(0x295)]()[_0xf0f5c6(0x360)](_0x571d32=>this[_0xf0f5c6(0x139)](_0x571d32));},Scene_Skill[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2f4)]=function(){const _0x219d0a=_0x1fdd0b,_0x4b2fec=Graphics['boxWidth']-this['mainCommandWidth'](),_0xc46798=this[_0x219d0a(0x286)][_0x219d0a(0x1c9)],_0x1c327a=this['isRightInputMode']()?0x0:Graphics[_0x219d0a(0x1e9)]-_0x4b2fec,_0x1e2604=this[_0x219d0a(0x1db)]();return new Rectangle(_0x1c327a,_0x1e2604,_0x4b2fec,_0xc46798);},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0x37a)]=Scene_Skill[_0x1fdd0b(0x1be)]['createItemWindow'],Scene_Skill[_0x1fdd0b(0x1be)]['createItemWindow']=function(){const _0x3b7957=_0x1fdd0b;VisuMZ['SkillsStatesCore']['Scene_Skill_createItemWindow'][_0x3b7957(0x320)](this),this['allowCreateShopStatusWindow']()&&(_0x3b7957(0x1cb)==='zuhvU'?this['createShopStatusWindow']():this[_0x3b7957(0x1f5)][_0x3b7957(0x3ae)]=_0x62e8c2);},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x35b)]=Scene_Skill[_0x1fdd0b(0x1be)][_0x1fdd0b(0xeb)],Scene_Skill[_0x1fdd0b(0x1be)][_0x1fdd0b(0xeb)]=function(){const _0x246192=_0x1fdd0b;if(this[_0x246192(0x34d)]())return this[_0x246192(0x2d1)]();else{const _0x12d63d=VisuMZ[_0x246192(0x1a2)][_0x246192(0x35b)][_0x246192(0x320)](this);if(this['allowCreateShopStatusWindow']()&&this[_0x246192(0x18e)]()){if(_0x246192(0x226)==='eSlUb')_0x12d63d['width']-=this['shopStatusWidth']();else{const _0x46f1bf=_0x26a6a7[_0x246192(0x2f0)]('['+_0x15fb34['$1'][_0x246192(0x175)](/\d+/g)+']');for(const _0x348da8 of _0x46f1bf){if(!_0x480d8b[_0x246192(0x342)](_0x348da8))return![];}return!![];}}return _0x12d63d;}},Scene_Skill['prototype'][_0x1fdd0b(0x2d1)]=function(){const _0x2d10ea=_0x1fdd0b,_0x308402=Graphics['boxWidth']-this[_0x2d10ea(0x25d)](),_0x497074=this[_0x2d10ea(0x19b)]()-this[_0x2d10ea(0x24f)][_0x2d10ea(0x1c9)],_0x16c8c4=this[_0x2d10ea(0x18d)]()?Graphics['boxWidth']-_0x308402:0x0,_0x5d84cb=this[_0x2d10ea(0x24f)]['y']+this[_0x2d10ea(0x24f)][_0x2d10ea(0x1c9)];return new Rectangle(_0x16c8c4,_0x5d84cb,_0x308402,_0x497074);},Scene_Skill[_0x1fdd0b(0x1be)]['allowCreateShopStatusWindow']=function(){const _0x35c5c3=_0x1fdd0b;if(!Imported[_0x35c5c3(0x126)])return![];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return!![];else{if(_0x35c5c3(0x1cf)===_0x35c5c3(0x237))this[_0x35c5c3(0x27f)]['clear'](),this[_0x35c5c3(0x21e)]();else return VisuMZ['SkillsStatesCore']['Settings'][_0x35c5c3(0x15a)]['ShowShopStatus'];}}},Scene_Skill['prototype'][_0x1fdd0b(0x18e)]=function(){const _0x466068=_0x1fdd0b;return VisuMZ[_0x466068(0x1a2)][_0x466068(0x35f)][_0x466068(0x15a)][_0x466068(0x110)];},Scene_Skill['prototype'][_0x1fdd0b(0x177)]=function(){const _0x5ba1f3=_0x1fdd0b,_0x145870=this[_0x5ba1f3(0x1ba)]();this[_0x5ba1f3(0x2a7)]=new Window_ShopStatus(_0x145870),this[_0x5ba1f3(0x221)](this[_0x5ba1f3(0x2a7)]),this[_0x5ba1f3(0x28f)][_0x5ba1f3(0x114)](this['_shopStatusWindow']);const _0x1ff889=VisuMZ[_0x5ba1f3(0x1a2)][_0x5ba1f3(0x35f)][_0x5ba1f3(0x15a)][_0x5ba1f3(0x192)];this[_0x5ba1f3(0x2a7)][_0x5ba1f3(0x334)](_0x1ff889||0x0);},Scene_Skill['prototype'][_0x1fdd0b(0x1ba)]=function(){const _0x16722d=_0x1fdd0b;if(this[_0x16722d(0x34d)]()){if(_0x16722d(0x1f0)===_0x16722d(0x337)){this['_stateMaxTurns']=this[_0x16722d(0x222)]||{};if(this[_0x16722d(0x222)][_0x3b1e11])return this[_0x16722d(0x222)][_0x4a8ad1];return _0x369a29[_0x56fdf8][_0x16722d(0x188)][_0x16722d(0x175)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x16722d(0x222)][_0x621085]=_0x1564d6(_0x5f1b11['$1']):this[_0x16722d(0x222)][_0x183b4c]=_0x392da5[_0x16722d(0x1a2)][_0x16722d(0x35f)][_0x16722d(0x392)][_0x16722d(0x322)],this[_0x16722d(0x222)][_0x454d28];}else return this[_0x16722d(0x2a0)]();}else return VisuMZ['SkillsStatesCore'][_0x16722d(0x35f)][_0x16722d(0x15a)][_0x16722d(0x2b2)]['call'](this);},Scene_Skill[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2a0)]=function(){const _0x46e813=_0x1fdd0b,_0x2c21c8=this[_0x46e813(0x25d)](),_0x4a26c1=this[_0x46e813(0x28f)][_0x46e813(0x1c9)],_0x5be221=this[_0x46e813(0x18d)]()?0x0:Graphics[_0x46e813(0x1e9)]-this[_0x46e813(0x25d)](),_0x3abdcf=this[_0x46e813(0x28f)]['y'];return new Rectangle(_0x5be221,_0x3abdcf,_0x2c21c8,_0x4a26c1);},Scene_Skill[_0x1fdd0b(0x1be)][_0x1fdd0b(0x25d)]=function(){const _0x7eff7b=_0x1fdd0b;return Imported[_0x7eff7b(0x126)]?Scene_Shop[_0x7eff7b(0x1be)][_0x7eff7b(0x372)]():0x0;},Scene_Skill[_0x1fdd0b(0x1be)]['buttonAssistText1']=function(){const _0x232004=_0x1fdd0b;return this[_0x232004(0x286)]&&this[_0x232004(0x286)][_0x232004(0x2c4)]?TextManager[_0x232004(0x1fc)]:'';},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0xea)]=Sprite_Gauge[_0x1fdd0b(0x1be)]['initMembers'],Sprite_Gauge['prototype'][_0x1fdd0b(0x19e)]=function(){const _0x4e94be=_0x1fdd0b;VisuMZ[_0x4e94be(0x1a2)]['Sprite_Gauge_initMembers'][_0x4e94be(0x320)](this),this[_0x4e94be(0x120)]=null;},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x210)]=Sprite_Gauge[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2e7)],Sprite_Gauge['prototype'][_0x1fdd0b(0x2e7)]=function(_0x4c9d7b,_0x495704){const _0x344bcf=_0x1fdd0b;this[_0x344bcf(0x10c)](_0x4c9d7b,_0x495704),_0x495704=_0x495704['toLowerCase'](),VisuMZ[_0x344bcf(0x1a2)][_0x344bcf(0x210)][_0x344bcf(0x320)](this,_0x4c9d7b,_0x495704);},Sprite_Gauge['prototype'][_0x1fdd0b(0x10c)]=function(_0x146fbe,_0x5b1142){const _0x249173=_0x1fdd0b,_0x397d34=VisuMZ[_0x249173(0x1a2)][_0x249173(0x35f)][_0x249173(0x3c2)]['filter'](_0xe670bb=>_0xe670bb[_0x249173(0x224)][_0x249173(0x23d)]()===_0x5b1142[_0x249173(0x23d)]());if(_0x397d34[_0x249173(0x253)]>=0x1){if(_0x249173(0x1ff)!==_0x249173(0x1ff)){_0x565fac['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x157f6d=_0x19b7d1(_0x1df7bb['$1'])['toUpperCase']()[_0x249173(0x363)]()[_0x249173(0x27c)](',');for(const _0x133af9 of _0x157f6d){_0x1bb801['categories'][_0x249173(0x356)](_0x133af9[_0x249173(0x363)]());}}else this[_0x249173(0x120)]=_0x397d34[0x0];}else _0x249173(0x107)===_0x249173(0x107)?this[_0x249173(0x120)]=null:_0x20a31d['name']=_0x72d01f[_0x249173(0x22f)][_0x249173(0x34f)](/\\V\[(\d+)\]/gi,(_0xf4ec05,_0x609227)=>_0x31657e[_0x249173(0x342)](_0x4c673c(_0x609227)));},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x3a7)]=Sprite_Gauge[_0x1fdd0b(0x1be)]['currentValue'],Sprite_Gauge[_0x1fdd0b(0x1be)][_0x1fdd0b(0x219)]=function(){const _0x122658=_0x1fdd0b;if(this['_battler']&&this[_0x122658(0x120)]){if('iHjyI'===_0x122658(0x349)){const _0x3fd590=_0x4bc2ac[_0x4d60dc-_0x519c3c[_0x122658(0x253)]];if(_0x3fd590===_0x4870a7)return;_0x2f44c9['prototype'][_0x122658(0x2f9)][_0x122658(0x320)](this,_0x12a26d,_0x3fd590,0x0,0x0),_0x162e91[_0x122658(0x1be)][_0x122658(0x1ef)][_0x122658(0x320)](this,_0x4ba46f,_0x3fd590,0x0,0x0);}else return this[_0x122658(0x1dd)]();}else return VisuMZ[_0x122658(0x1a2)][_0x122658(0x3a7)][_0x122658(0x320)](this);},Sprite_Gauge[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1dd)]=function(){const _0x473020=_0x1fdd0b;return this[_0x473020(0x120)][_0x473020(0x2ff)][_0x473020(0x320)](this[_0x473020(0xdd)]);},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x203)]=Sprite_Gauge[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1b2)],Sprite_Gauge[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1b2)]=function(){const _0x16ceee=_0x1fdd0b;return this['_battler']&&this[_0x16ceee(0x120)]?this[_0x16ceee(0x1b3)]():VisuMZ[_0x16ceee(0x1a2)][_0x16ceee(0x203)][_0x16ceee(0x320)](this);},Sprite_Gauge['prototype'][_0x1fdd0b(0x1b3)]=function(){const _0x459ff9=_0x1fdd0b;return this['_costSettings'][_0x459ff9(0x340)]['call'](this['_battler']);},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x3b4)]=Sprite_Gauge[_0x1fdd0b(0x1be)][_0x1fdd0b(0x31e)],Sprite_Gauge[_0x1fdd0b(0x1be)][_0x1fdd0b(0x31e)]=function(){const _0x58e167=_0x1fdd0b,_0x5c81f1=VisuMZ[_0x58e167(0x1a2)]['Sprite_Gauge_gaugeRate'][_0x58e167(0x320)](this);return _0x5c81f1['clamp'](0x0,0x1);},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x249)]=Sprite_Gauge['prototype'][_0x1fdd0b(0x3a9)],Sprite_Gauge[_0x1fdd0b(0x1be)]['redraw']=function(){const _0x23a632=_0x1fdd0b;if(this[_0x23a632(0xdd)]&&this['_costSettings']){if(_0x23a632(0x1aa)===_0x23a632(0x225))for(const _0x2c166f of _0x598b49[_0x23a632(0xf2)]){if(this[_0x23a632(0x38f)](_0x2c166f))return!![];}else this[_0x23a632(0x27f)][_0x23a632(0x22e)](),this[_0x23a632(0x21e)]();}else VisuMZ[_0x23a632(0x1a2)][_0x23a632(0x249)][_0x23a632(0x320)](this);},Sprite_Gauge[_0x1fdd0b(0x1be)][_0x1fdd0b(0xec)]=function(){const _0x3e19ab=_0x1fdd0b;let _0x42fa5c=this[_0x3e19ab(0x219)]();return Imported[_0x3e19ab(0x2e1)]&&this['useDigitGrouping']()&&(_0x3e19ab(0x190)===_0x3e19ab(0x3e2)?_0x55d063[_0x3e19ab(0x1a2)]['Settings'][_0x3e19ab(0x10f)][_0x3e19ab(0x2f5)][_0x3e19ab(0x320)](this,_0x91d35e,_0x2f83cd):_0x42fa5c=VisuMZ['GroupDigits'](_0x42fa5c)),_0x42fa5c;},Sprite_Gauge[_0x1fdd0b(0x1be)][_0x1fdd0b(0x21e)]=function(){const _0x31e916=_0x1fdd0b;this['_costSettings'][_0x31e916(0xf0)][_0x31e916(0x320)](this);},Sprite_Gauge[_0x1fdd0b(0x1be)][_0x1fdd0b(0x3b8)]=function(_0x2c8d62,_0x15ca1f,_0x419b94,_0x52c25b,_0x3336c3,_0x2dbdef){const _0x50176b=_0x1fdd0b,_0x22a47c=this[_0x50176b(0x31e)](),_0x2c884e=Math[_0x50176b(0xe1)]((_0x3336c3-0x2)*_0x22a47c),_0x27b599=_0x2dbdef-0x2,_0x3ee7ed=this[_0x50176b(0x21b)]();this[_0x50176b(0x27f)][_0x50176b(0x238)](_0x419b94,_0x52c25b,_0x3336c3,_0x2dbdef,_0x3ee7ed),this[_0x50176b(0x27f)][_0x50176b(0x11e)](_0x419b94+0x1,_0x52c25b+0x1,_0x2c884e,_0x27b599,_0x2c8d62,_0x15ca1f);},VisuMZ[_0x1fdd0b(0x1a2)]['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon[_0x1fdd0b(0x1be)][_0x1fdd0b(0x39d)],Sprite_StateIcon['prototype'][_0x1fdd0b(0x39d)]=function(){const _0x26c6ba=_0x1fdd0b;VisuMZ['SkillsStatesCore']['Sprite_StateIcon_loadBitmap'][_0x26c6ba(0x320)](this),this[_0x26c6ba(0x335)]();},Sprite_StateIcon[_0x1fdd0b(0x1be)][_0x1fdd0b(0x335)]=function(){const _0x5bd056=_0x1fdd0b,_0x4e0653=Window_Base[_0x5bd056(0x1be)][_0x5bd056(0x15b)]();this[_0x5bd056(0x173)]=new Sprite(),this[_0x5bd056(0x173)]['bitmap']=new Bitmap(ImageManager['iconWidth'],_0x4e0653),this[_0x5bd056(0x173)][_0x5bd056(0x13f)]['x']=this['anchor']['x'],this[_0x5bd056(0x173)][_0x5bd056(0x13f)]['y']=this[_0x5bd056(0x13f)]['y'],this[_0x5bd056(0x1e0)](this[_0x5bd056(0x173)]),this[_0x5bd056(0x1f5)]=this['_turnDisplaySprite'][_0x5bd056(0x27f)];},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x3a5)]=Sprite_StateIcon[_0x1fdd0b(0x1be)][_0x1fdd0b(0x319)],Sprite_StateIcon['prototype']['updateFrame']=function(){const _0x369007=_0x1fdd0b;VisuMZ[_0x369007(0x1a2)][_0x369007(0x3a5)]['call'](this),this['updateTurnDisplaySprite']();},Sprite_StateIcon[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1a9)]=function(_0x3e33a1,_0xf6afa5,_0x134284,_0x3b0576,_0x120f9d){const _0x305b63=_0x1fdd0b;this[_0x305b63(0x1f5)][_0x305b63(0x1a9)](_0x3e33a1,_0xf6afa5,_0x134284,_0x3b0576,this[_0x305b63(0x1f5)]['height'],_0x120f9d);},Sprite_StateIcon[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2fc)]=function(){const _0x313610=_0x1fdd0b;this['resetFontSettings'](),this[_0x313610(0x1f5)][_0x313610(0x22e)]();const _0x5d161a=this[_0x313610(0xdd)];if(!_0x5d161a)return;const _0xc8a2bb=_0x5d161a[_0x313610(0x3db)]()['filter'](_0x3dc67e=>_0x3dc67e[_0x313610(0x318)]>0x0),_0x20ea62=[...Array(0x8)['keys']()][_0x313610(0x360)](_0x163d55=>_0x5d161a[_0x313610(0xe9)](_0x163d55)!==0x0),_0x30fc22=this[_0x313610(0x33a)],_0xf3b360=_0xc8a2bb[_0x30fc22];if(_0xf3b360){if(_0x313610(0x1c7)!==_0x313610(0x1c7)){if(!this[_0x313610(0x2dd)])return;const _0x20e72e=this[_0x313610(0x2dd)][_0x313610(0x1fe)]();for(const _0x28d0d5 of _0x20e72e){const _0x198a8c=this['makeCommandName'](_0x28d0d5);this[_0x313610(0x1dc)](_0x198a8c,_0x313610(0x1c3),!![],_0x28d0d5);}}else Window_Base[_0x313610(0x1be)][_0x313610(0x27b)][_0x313610(0x320)](this,_0x5d161a,_0xf3b360,0x0,0x0),Window_Base[_0x313610(0x1be)][_0x313610(0x161)]['call'](this,_0x5d161a,_0xf3b360,0x0,0x0);}else{if(_0x313610(0x3c1)===_0x313610(0x3c1)){const _0x3e0ec1=_0x20ea62[_0x30fc22-_0xc8a2bb[_0x313610(0x253)]];if(_0x3e0ec1===undefined)return;Window_Base['prototype'][_0x313610(0x2f9)][_0x313610(0x320)](this,_0x5d161a,_0x3e0ec1,0x0,0x0),Window_Base['prototype'][_0x313610(0x1ef)]['call'](this,_0x5d161a,_0x3e0ec1,0x0,0x0);}else for(const _0x289188 of _0x3ecd34){_0x289188['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x1728ec=_0x3d1869['indexOf'](_0xb90052(_0x4e063c['$1'])['toUpperCase']()),_0x4cee78=_0x5280d7(_0x197636['$2']);_0x1728ec>=0x0&&(_0x2dd231['addDebuffTurns'](_0x1728ec,_0x4cee78),this[_0x313610(0x1c2)](_0x4d4849));}}},Sprite_StateIcon[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1a7)]=function(){const _0x12fe27=_0x1fdd0b;this[_0x12fe27(0x1f5)][_0x12fe27(0x2b7)]=$gameSystem[_0x12fe27(0x3a0)](),this[_0x12fe27(0x1f5)]['fontSize']=$gameSystem['mainFontSize'](),this[_0x12fe27(0x16b)]();},Sprite_StateIcon[_0x1fdd0b(0x1be)][_0x1fdd0b(0x16b)]=function(){const _0x5b69bb=_0x1fdd0b;this[_0x5b69bb(0x3ba)](ColorManager[_0x5b69bb(0xed)]()),this[_0x5b69bb(0x35d)](ColorManager['outlineColor']());},Sprite_StateIcon[_0x1fdd0b(0x1be)][_0x1fdd0b(0x3ba)]=function(_0x162f96){const _0x5726b0=_0x1fdd0b;this[_0x5726b0(0x1f5)][_0x5726b0(0x3ae)]=_0x162f96;},Sprite_StateIcon['prototype'][_0x1fdd0b(0x35d)]=function(_0x36f222){const _0x23518e=_0x1fdd0b;this[_0x23518e(0x1f5)][_0x23518e(0x3bb)]=_0x36f222;},Sprite_StateIcon[_0x1fdd0b(0x1be)]['hide']=function(){const _0x4f918c=_0x1fdd0b;this[_0x4f918c(0x287)]=!![],this['updateVisibility']();},Window_Base[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1c4)]=function(_0x337a23,_0x164e43,_0x299902,_0xdd9a4,_0x384567){const _0x5cb27d=_0x1fdd0b,_0x41cc8a=this[_0x5cb27d(0x227)](_0x337a23,_0x164e43),_0x39275d=this[_0x5cb27d(0x231)](_0x41cc8a,_0x299902,_0xdd9a4,_0x384567),_0x215247=_0x299902+_0x384567-_0x39275d[_0x5cb27d(0x316)];this[_0x5cb27d(0x13e)](_0x41cc8a,_0x215247,_0xdd9a4,_0x384567),this['resetFontSettings']();},Window_Base[_0x1fdd0b(0x1be)]['createAllSkillCostText']=function(_0x1df1b3,_0x3b789c){const _0x4a711e=_0x1fdd0b;let _0x553928='';for(settings of VisuMZ[_0x4a711e(0x1a2)][_0x4a711e(0x35f)]['Costs']){if(_0x4a711e(0x28a)!==_0x4a711e(0x28a))this[_0x4a711e(0x222)][_0x4d6a13]=_0x5f7baf(_0x103860['$1']);else{if(!this[_0x4a711e(0x33f)](_0x1df1b3,_0x3b789c,settings))continue;if(_0x553928['length']>0x0)_0x553928+=this['skillCostSeparator']();_0x553928+=this[_0x4a711e(0x282)](_0x1df1b3,_0x3b789c,settings);}}_0x553928=this[_0x4a711e(0x3b0)](_0x1df1b3,_0x3b789c,_0x553928);if(_0x3b789c[_0x4a711e(0x188)][_0x4a711e(0x175)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x553928[_0x4a711e(0x253)]>0x0)_0x553928+=this['skillCostSeparator']();_0x553928+=String(RegExp['$1']);}return _0x553928;},Window_Base['prototype'][_0x1fdd0b(0x3b0)]=function(_0x5b34a0,_0x59c7c2,_0x1f4bf7){return _0x1f4bf7;},Window_Base[_0x1fdd0b(0x1be)][_0x1fdd0b(0x33f)]=function(_0x3532fb,_0x4210a3,_0xbd155){const _0x1e56ee=_0x1fdd0b,_0x55e334=_0xbd155[_0x1e56ee(0x37b)]['call'](_0x3532fb,_0x4210a3);return _0xbd155[_0x1e56ee(0x100)][_0x1e56ee(0x320)](_0x3532fb,_0x4210a3,_0x55e334,_0xbd155);},Window_Base[_0x1fdd0b(0x1be)][_0x1fdd0b(0x282)]=function(_0x2df8de,_0x3665fe,_0x47f664){const _0x173020=_0x1fdd0b,_0x5633d9=_0x47f664['CalcJS']['call'](_0x2df8de,_0x3665fe);return _0x47f664[_0x173020(0x359)][_0x173020(0x320)](_0x2df8de,_0x3665fe,_0x5633d9,_0x47f664);},Window_Base[_0x1fdd0b(0x1be)][_0x1fdd0b(0x256)]=function(){return'\x20';},Window_Base[_0x1fdd0b(0x1be)][_0x1fdd0b(0x24e)]=function(_0x406d3a,_0x3be73a,_0x25f900,_0x528d23){const _0x1456d6=_0x1fdd0b;if(!_0x406d3a)return;VisuMZ[_0x1456d6(0x1a2)][_0x1456d6(0x299)][_0x1456d6(0x320)](this,_0x406d3a,_0x3be73a,_0x25f900,_0x528d23),this['drawActorIconsAllTurnCounters'](_0x406d3a,_0x3be73a,_0x25f900,_0x528d23);},Window_Base[_0x1fdd0b(0x1be)]['drawActorIconsAllTurnCounters']=function(_0x3a211c,_0x18be68,_0x5abab4,_0x51be48){const _0x38455e=_0x1fdd0b;_0x51be48=_0x51be48||0x90;const _0x36d82b=ImageManager[_0x38455e(0x37c)],_0x14bb9e=_0x3a211c[_0x38455e(0x217)]()[_0x38455e(0x302)](0x0,Math[_0x38455e(0xe1)](_0x51be48/_0x36d82b)),_0x22f46f=_0x3a211c[_0x38455e(0x3db)]()[_0x38455e(0x360)](_0x42c9b9=>_0x42c9b9[_0x38455e(0x318)]>0x0),_0x2d08d5=[...Array(0x8)[_0x38455e(0x3cb)]()]['filter'](_0x10cedf=>_0x3a211c[_0x38455e(0xe9)](_0x10cedf)!==0x0),_0x5326a4=[];let _0x54b3e3=_0x18be68;for(let _0x27e303=0x0;_0x27e303<_0x14bb9e['length'];_0x27e303++){this[_0x38455e(0x1a7)]();const _0x4e6003=_0x22f46f[_0x27e303];if(_0x4e6003){if(!_0x5326a4['includes'](_0x4e6003)){if('DaGsx'===_0x38455e(0x36b)){const _0x673aaa=_0xf737a[_0x38455e(0x188)];if(_0x673aaa[_0x38455e(0x175)](/<HIDE IN BATTLE>/i)&&_0x3a36bb[_0x38455e(0x21a)]())return![];else return _0x673aaa[_0x38455e(0x175)](/<HIDE OUTSIDE BATTLE>/i)&&!_0x20ec7a[_0x38455e(0x21a)]()?![]:!![];}else this[_0x38455e(0x27b)](_0x3a211c,_0x4e6003,_0x54b3e3,_0x5abab4);}this[_0x38455e(0x161)](_0x3a211c,_0x4e6003,_0x54b3e3,_0x5abab4),_0x5326a4[_0x38455e(0x356)](_0x4e6003);}else{const _0x1620fd=_0x2d08d5[_0x27e303-_0x22f46f[_0x38455e(0x253)]];this[_0x38455e(0x2f9)](_0x3a211c,_0x1620fd,_0x54b3e3,_0x5abab4),this[_0x38455e(0x1ef)](_0x3a211c,_0x1620fd,_0x54b3e3,_0x5abab4);}_0x54b3e3+=_0x36d82b;}},Window_Base[_0x1fdd0b(0x1be)][_0x1fdd0b(0x27b)]=function(_0x242779,_0x15bcc4,_0x1c91e2,_0x510fa3){const _0x1afb71=_0x1fdd0b;if(!VisuMZ[_0x1afb71(0x1a2)]['Settings'][_0x1afb71(0x392)][_0x1afb71(0x1d4)])return;if(!_0x242779[_0x1afb71(0x32f)](_0x15bcc4['id']))return;if(_0x15bcc4['autoRemovalTiming']===0x0)return;if(_0x15bcc4[_0x1afb71(0x188)][_0x1afb71(0x175)](/<HIDE STATE TURNS>/i))return;const _0x34e4a0=_0x242779['stateTurns'](_0x15bcc4['id']),_0x13aea9=ImageManager[_0x1afb71(0x37c)],_0xf1bb3a=ColorManager[_0x1afb71(0x3df)](_0x15bcc4);this[_0x1afb71(0x3ba)](_0xf1bb3a),this[_0x1afb71(0x35d)](_0x1afb71(0x293)),this[_0x1afb71(0x1f5)][_0x1afb71(0x3b3)]=!![],this[_0x1afb71(0x1f5)][_0x1afb71(0x3d2)]=VisuMZ[_0x1afb71(0x1a2)]['Settings'][_0x1afb71(0x392)][_0x1afb71(0x32a)],_0x1c91e2+=VisuMZ[_0x1afb71(0x1a2)][_0x1afb71(0x35f)][_0x1afb71(0x392)][_0x1afb71(0x371)],_0x510fa3+=VisuMZ['SkillsStatesCore'][_0x1afb71(0x35f)][_0x1afb71(0x392)][_0x1afb71(0x3ce)],this[_0x1afb71(0x1a9)](_0x34e4a0,_0x1c91e2,_0x510fa3,_0x13aea9,_0x1afb71(0x3c0)),this[_0x1afb71(0x1f5)][_0x1afb71(0x3b3)]=![],this[_0x1afb71(0x1a7)]();},Window_Base[_0x1fdd0b(0x1be)]['drawActorStateData']=function(_0x3270d1,_0x6bd6b3,_0x13381a,_0x4bcce8){const _0x9338e7=_0x1fdd0b;if(!VisuMZ[_0x9338e7(0x1a2)][_0x9338e7(0x35f)]['States']['ShowData'])return;const _0x145d20=ImageManager['iconWidth'],_0x56cf8e=ImageManager[_0x9338e7(0x269)]/0x2,_0x1e2870=ColorManager['normalColor']();this['changeTextColor'](_0x1e2870),this[_0x9338e7(0x35d)](_0x9338e7(0x293)),this[_0x9338e7(0x1f5)][_0x9338e7(0x3b3)]=!![],this['contents']['fontSize']=VisuMZ[_0x9338e7(0x1a2)][_0x9338e7(0x35f)]['States'][_0x9338e7(0x1f8)],_0x13381a+=VisuMZ[_0x9338e7(0x1a2)][_0x9338e7(0x35f)][_0x9338e7(0x392)][_0x9338e7(0x332)],_0x4bcce8+=VisuMZ[_0x9338e7(0x1a2)]['Settings'][_0x9338e7(0x392)][_0x9338e7(0x358)];const _0x2710ae=String(_0x3270d1[_0x9338e7(0xdc)](_0x6bd6b3['id']));this[_0x9338e7(0x1a9)](_0x2710ae,_0x13381a,_0x4bcce8,_0x145d20,_0x9338e7(0x3a1)),this[_0x9338e7(0x1f5)][_0x9338e7(0x3b3)]=![],this[_0x9338e7(0x1a7)]();},Window_Base['prototype'][_0x1fdd0b(0x2f9)]=function(_0x37adca,_0x12682f,_0x21b5c4,_0x3bb896){const _0x5ab01d=_0x1fdd0b;if(!VisuMZ['SkillsStatesCore'][_0x5ab01d(0x35f)][_0x5ab01d(0x10f)][_0x5ab01d(0x1d4)])return;const _0x30bf93=_0x37adca[_0x5ab01d(0xe9)](_0x12682f);if(_0x30bf93===0x0)return;const _0x57ec3b=_0x37adca[_0x5ab01d(0x1d1)](_0x12682f),_0x2b8d19=ImageManager[_0x5ab01d(0x37c)],_0x13a9c2=_0x30bf93>0x0?ColorManager[_0x5ab01d(0x125)]():ColorManager[_0x5ab01d(0x300)]();this[_0x5ab01d(0x3ba)](_0x13a9c2),this[_0x5ab01d(0x35d)]('rgba(0,\x200,\x200,\x201)'),this[_0x5ab01d(0x1f5)]['fontBold']=!![],this[_0x5ab01d(0x1f5)][_0x5ab01d(0x3d2)]=VisuMZ[_0x5ab01d(0x1a2)][_0x5ab01d(0x35f)][_0x5ab01d(0x10f)]['TurnFontSize'],_0x21b5c4+=VisuMZ['SkillsStatesCore'][_0x5ab01d(0x35f)][_0x5ab01d(0x10f)][_0x5ab01d(0x371)],_0x3bb896+=VisuMZ[_0x5ab01d(0x1a2)]['Settings']['Buffs'][_0x5ab01d(0x3ce)],this['drawText'](_0x57ec3b,_0x21b5c4,_0x3bb896,_0x2b8d19,_0x5ab01d(0x3c0)),this[_0x5ab01d(0x1f5)][_0x5ab01d(0x3b3)]=![],this[_0x5ab01d(0x1a7)]();},Window_Base['prototype'][_0x1fdd0b(0x1ef)]=function(_0x3d9ec2,_0x4879dd,_0x4e0f64,_0x2ccfed){const _0x304669=_0x1fdd0b;if(!VisuMZ[_0x304669(0x1a2)][_0x304669(0x35f)][_0x304669(0x10f)][_0x304669(0x294)])return;const _0x104b12=_0x3d9ec2[_0x304669(0x2c0)](_0x4879dd),_0x31f8d5=_0x3d9ec2[_0x304669(0xe9)](_0x4879dd),_0x1fccc9=ImageManager[_0x304669(0x37c)],_0x5865d6=ImageManager[_0x304669(0x269)]/0x2,_0x55d468=_0x31f8d5>0x0?ColorManager['buffColor']():ColorManager['debuffColor']();this['changeTextColor'](_0x55d468),this[_0x304669(0x35d)](_0x304669(0x293)),this[_0x304669(0x1f5)][_0x304669(0x3b3)]=!![],this['contents'][_0x304669(0x3d2)]=VisuMZ[_0x304669(0x1a2)][_0x304669(0x35f)][_0x304669(0x10f)]['DataFontSize'],_0x4e0f64+=VisuMZ['SkillsStatesCore'][_0x304669(0x35f)][_0x304669(0x10f)][_0x304669(0x332)],_0x2ccfed+=VisuMZ[_0x304669(0x1a2)][_0x304669(0x35f)][_0x304669(0x10f)][_0x304669(0x358)];const _0x30be07=_0x304669(0x28b)[_0x304669(0x1b5)](Math[_0x304669(0x352)](_0x104b12*0x64));this[_0x304669(0x1a9)](_0x30be07,_0x4e0f64,_0x2ccfed,_0x1fccc9,_0x304669(0x3a1)),this[_0x304669(0x1f5)][_0x304669(0x3b3)]=![],this[_0x304669(0x1a7)]();},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x13b)]=Window_StatusBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2e2)],Window_StatusBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2e2)]=function(_0x3acf05,_0x15480d,_0x41d90a,_0x585cac){const _0x409371=_0x1fdd0b;if(_0x3acf05[_0x409371(0x27e)]())_0x15480d=this[_0x409371(0x1a5)](_0x3acf05,_0x15480d);this[_0x409371(0x1f4)](_0x3acf05,_0x15480d,_0x41d90a,_0x585cac);},Window_StatusBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1f4)]=function(_0x1321f9,_0x305473,_0x44a53d,_0x2c7602){const _0x2c2150=_0x1fdd0b;if([_0x2c2150(0x394),_0x2c2150(0x24a)]['includes'](_0x305473['toLowerCase']()))return;VisuMZ['SkillsStatesCore'][_0x2c2150(0x13b)]['call'](this,_0x1321f9,_0x305473,_0x44a53d,_0x2c7602);},Window_StatusBase[_0x1fdd0b(0x1be)]['convertGaugeTypeSkillsStatesCore']=function(_0x2f0d81,_0x1beda2){const _0x2150ac=_0x1fdd0b,_0x13910a=_0x2f0d81['currentClass']()[_0x2150ac(0x188)];if(_0x1beda2==='hp'&&_0x13910a['match'](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x1beda2==='mp'&&_0x13910a['match'](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x1beda2==='tp'&&_0x13910a['match'](/<REPLACE TP GAUGE:[ ](.*)>/i)){if('QIIir'===_0x2150ac(0x1d6))return String(RegExp['$1']);else _0x5e295d+=this[_0x2150ac(0x1d1)](_0x3acd91),this[_0x2150ac(0x1fa)](_0x327cbc,_0x51df44);}else{if(_0x2150ac(0x2ab)===_0x2150ac(0x259)){const _0x4de02c=_0x500c16['note'];_0x4de02c[_0x2150ac(0x175)](/<MP COST:[ ](\d+)>/i)&&(_0x1d7fa5[_0x2150ac(0x3aa)]=_0x251089(_0x333ff1['$1'])),_0x4de02c[_0x2150ac(0x175)](/<TP COST:[ ](\d+)>/i)&&(_0x1518ab[_0x2150ac(0x2f2)]=_0x2821ea(_0x251a47['$1']));}else return _0x1beda2;}}}},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x299)]=Window_StatusBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x24e)],Window_StatusBase[_0x1fdd0b(0x1be)][_0x1fdd0b(0x24e)]=function(_0x1de45a,_0x1a8ee3,_0x13652d,_0x584a58){const _0x15c14c=_0x1fdd0b;if(!_0x1de45a)return;Window_Base[_0x15c14c(0x1be)][_0x15c14c(0x24e)][_0x15c14c(0x320)](this,_0x1de45a,_0x1a8ee3,_0x13652d,_0x584a58);},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x254)]=Window_SkillType[_0x1fdd0b(0x1be)]['initialize'],Window_SkillType['prototype']['initialize']=function(_0x179d73){const _0x2f5724=_0x1fdd0b;VisuMZ[_0x2f5724(0x1a2)][_0x2f5724(0x254)][_0x2f5724(0x320)](this,_0x179d73),this[_0x2f5724(0x179)](_0x179d73);},Window_SkillType[_0x1fdd0b(0x1be)][_0x1fdd0b(0x179)]=function(_0x46cdc8){const _0x30b7e2=_0x1fdd0b,_0x3589d5=new Rectangle(0x0,0x0,_0x46cdc8[_0x30b7e2(0x316)],_0x46cdc8[_0x30b7e2(0x1c9)]);this[_0x30b7e2(0x2cd)]=new Window_Base(_0x3589d5),this[_0x30b7e2(0x2cd)][_0x30b7e2(0x170)]=0x0,this[_0x30b7e2(0x1e0)](this[_0x30b7e2(0x2cd)]),this[_0x30b7e2(0x3cd)]();},Window_SkillType[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1e3)]=function(){const _0x3eac5d=_0x1fdd0b;Window_Command['prototype']['callUpdateHelp']['call'](this);if(this[_0x3eac5d(0x2cd)])this[_0x3eac5d(0x3cd)]();},Window_SkillType[_0x1fdd0b(0x1be)][_0x1fdd0b(0x3cd)]=function(){const _0x7e86a5=_0x1fdd0b,_0x5a5b00=this[_0x7e86a5(0x2cd)];_0x5a5b00[_0x7e86a5(0x1f5)][_0x7e86a5(0x22e)]();const _0x5cef39=this['commandStyleCheck'](this[_0x7e86a5(0x317)]());if(_0x5cef39===_0x7e86a5(0x23c)&&this[_0x7e86a5(0x193)]()>0x0){const _0x48ba29=this[_0x7e86a5(0x247)](this[_0x7e86a5(0x317)]());let _0x30675b=this[_0x7e86a5(0xef)](this[_0x7e86a5(0x317)]());_0x30675b=_0x30675b[_0x7e86a5(0x34f)](/\\I\[(\d+)\]/gi,''),_0x5a5b00['resetFontSettings'](),this[_0x7e86a5(0x152)](_0x30675b,_0x48ba29),this['commandNameWindowDrawText'](_0x30675b,_0x48ba29),this[_0x7e86a5(0x36d)](_0x30675b,_0x48ba29);}},Window_SkillType['prototype']['commandNameWindowDrawBackground']=function(_0x4570f2,_0x16ebf8){},Window_SkillType[_0x1fdd0b(0x1be)][_0x1fdd0b(0x3c5)]=function(_0x2cf03d,_0x577887){const _0x4ce151=_0x1fdd0b,_0x4bfe50=this[_0x4ce151(0x2cd)];_0x4bfe50[_0x4ce151(0x1a9)](_0x2cf03d,0x0,_0x577887['y'],_0x4bfe50['innerWidth'],_0x4ce151(0x3a1));},Window_SkillType[_0x1fdd0b(0x1be)][_0x1fdd0b(0x36d)]=function(_0xcdb6c8,_0x36df91){const _0x3d94f9=_0x1fdd0b,_0x2198df=this[_0x3d94f9(0x2cd)],_0x22c24b=$gameSystem['windowPadding'](),_0x13ec55=_0x36df91['x']+Math['floor'](_0x36df91[_0x3d94f9(0x316)]/0x2)+_0x22c24b;_0x2198df['x']=_0x2198df[_0x3d94f9(0x316)]/-0x2+_0x13ec55,_0x2198df['y']=Math[_0x3d94f9(0xe1)](_0x36df91[_0x3d94f9(0x1c9)]/0x2);},Window_SkillType[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2be)]=function(){const _0x3ee194=_0x1fdd0b;return Imported[_0x3ee194(0x2e1)]&&Window_Command['prototype'][_0x3ee194(0x2be)][_0x3ee194(0x320)](this);},Window_SkillType[_0x1fdd0b(0x1be)][_0x1fdd0b(0x336)]=function(){const _0x536fd3=_0x1fdd0b;if(!this['_actor'])return;const _0xd07aa1=this[_0x536fd3(0x2dd)]['skillTypes']();for(const _0x2b3999 of _0xd07aa1){if(_0x536fd3(0x149)==='bJwaf')return!![];else{const _0x3cef7b=this[_0x536fd3(0x2ed)](_0x2b3999);this[_0x536fd3(0x1dc)](_0x3cef7b,_0x536fd3(0x1c3),!![],_0x2b3999);}}},Window_SkillType[_0x1fdd0b(0x1be)][_0x1fdd0b(0x2ed)]=function(_0x51aadd){const _0x41fb45=_0x1fdd0b;let _0x2af4da=$dataSystem[_0x41fb45(0x1fe)][_0x51aadd];if(_0x2af4da['match'](/\\I\[(\d+)\]/i))return _0x2af4da;if(this['commandStyle']()==='text')return _0x2af4da;const _0x9c17da=VisuMZ[_0x41fb45(0x1a2)][_0x41fb45(0x35f)][_0x41fb45(0x15a)],_0x46ed9c=$dataSystem['magicSkills']['includes'](_0x51aadd),_0x21384c=_0x46ed9c?_0x9c17da[_0x41fb45(0x39a)]:_0x9c17da[_0x41fb45(0x289)];return _0x41fb45(0x3ac)[_0x41fb45(0x1b5)](_0x21384c,_0x2af4da);},Window_SkillType[_0x1fdd0b(0x1be)][_0x1fdd0b(0x14e)]=function(){const _0x20a71a=_0x1fdd0b;return VisuMZ[_0x20a71a(0x1a2)][_0x20a71a(0x35f)][_0x20a71a(0x15a)][_0x20a71a(0xde)];},Window_SkillType[_0x1fdd0b(0x1be)][_0x1fdd0b(0x398)]=function(_0x4a3a7d){const _0x3b2062=_0x1fdd0b,_0x421f55=this[_0x3b2062(0x262)](_0x4a3a7d);if(_0x421f55===_0x3b2062(0x10e))_0x3b2062(0x395)===_0x3b2062(0xd8)?(_0x527ad2('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3b2062(0x1b5)](_0x1b7711,_0x256877)),_0x575c00['exit']()):this['drawItemStyleIconText'](_0x4a3a7d);else _0x421f55==='icon'?_0x3b2062(0x1f3)===_0x3b2062(0x297)?(this[_0x3b2062(0x136)](_0x4d924b),this[_0x3b2062(0xe6)](_0x284861),this[_0x3b2062(0x315)](_0xf9249b),this['onAddStateCustomJS'](_0x47f2a0),this[_0x3b2062(0x2b1)](_0x3caec4)):this[_0x3b2062(0x24b)](_0x4a3a7d):Window_Command['prototype']['drawItem'][_0x3b2062(0x320)](this,_0x4a3a7d);},Window_SkillType[_0x1fdd0b(0x1be)][_0x1fdd0b(0x301)]=function(){const _0x39bbb3=_0x1fdd0b;return VisuMZ['SkillsStatesCore'][_0x39bbb3(0x35f)][_0x39bbb3(0x15a)][_0x39bbb3(0x1e5)];},Window_SkillType[_0x1fdd0b(0x1be)][_0x1fdd0b(0x262)]=function(_0x373a80){const _0xe9ef=_0x1fdd0b;if(_0x373a80<0x0)return'text';const _0x5033c4=this['commandStyle']();if(_0x5033c4!=='auto'){if('EhCPa'===_0xe9ef(0x32c))return _0x5033c4;else{const _0x5a7cd6=_0x22173a['boxWidth']-this[_0xe9ef(0x25d)](),_0x53c2ea=this[_0xe9ef(0x19b)]()-this[_0xe9ef(0x24f)][_0xe9ef(0x1c9)],_0x5e9292=this[_0xe9ef(0x18d)]()?_0x179da8[_0xe9ef(0x1e9)]-_0x5a7cd6:0x0,_0x568962=this[_0xe9ef(0x24f)]['y']+this[_0xe9ef(0x24f)][_0xe9ef(0x1c9)];return new _0x12d090(_0x5e9292,_0x568962,_0x5a7cd6,_0x53c2ea);}}else{if(this[_0xe9ef(0x193)]()>0x0){const _0x3c77cb=this[_0xe9ef(0xef)](_0x373a80);if(_0x3c77cb[_0xe9ef(0x175)](/\\I\[(\d+)\]/i)){const _0x5077f3=this[_0xe9ef(0x247)](_0x373a80),_0x5f1109=this[_0xe9ef(0x231)](_0x3c77cb)['width'];if(_0x5f1109<=_0x5077f3[_0xe9ef(0x316)])return _0xe9ef(0x10e);else{if(_0xe9ef(0x106)!==_0xe9ef(0x1e1))return _0xe9ef(0x23c);else _0x493875[_0xe9ef(0x1a2)]['Settings'][_0xe9ef(0x392)]['onEraseStateJS'][_0xe9ef(0x320)](this,_0x324747);}}}}return _0xe9ef(0x20e);},Window_SkillType[_0x1fdd0b(0x1be)][_0x1fdd0b(0x264)]=function(_0xe2681f){const _0x22400d=_0x1fdd0b,_0x500ab4=this[_0x22400d(0x247)](_0xe2681f),_0x492f09=this[_0x22400d(0xef)](_0xe2681f),_0x5d59a9=this[_0x22400d(0x231)](_0x492f09)[_0x22400d(0x316)];this[_0x22400d(0xd9)](this[_0x22400d(0x1eb)](_0xe2681f));const _0x247b7e=this[_0x22400d(0x14e)]();if(_0x247b7e==='right'){if(_0x22400d(0x244)===_0x22400d(0x122)){const _0x11ffb0=this[_0x22400d(0x14b)]();this[_0x22400d(0x1a7)](),this['drawParamText'](_0x27d48d,_0x135460,_0x5eddaf,_0x410296,!![]),this[_0x22400d(0x16b)](),this[_0x22400d(0x1f5)][_0x22400d(0x3d2)]-=0x8;const _0x4ff53a=this[_0x22400d(0x2dd)][_0x22400d(0x296)](_0x39ba68,!![]);this[_0x22400d(0x1f5)][_0x22400d(0x1a9)](_0x4ff53a,_0x16f70b,_0x4a7e87,_0x38012f,_0x11ffb0,_0x22400d(0x3c0));}else this[_0x22400d(0x13e)](_0x492f09,_0x500ab4['x']+_0x500ab4[_0x22400d(0x316)]-_0x5d59a9,_0x500ab4['y'],_0x5d59a9);}else{if(_0x247b7e===_0x22400d(0x3a1)){const _0x3e467e=_0x500ab4['x']+Math[_0x22400d(0xe1)]((_0x500ab4[_0x22400d(0x316)]-_0x5d59a9)/0x2);this['drawTextEx'](_0x492f09,_0x3e467e,_0x500ab4['y'],_0x5d59a9);}else this[_0x22400d(0x13e)](_0x492f09,_0x500ab4['x'],_0x500ab4['y'],_0x5d59a9);}},Window_SkillType['prototype'][_0x1fdd0b(0x24b)]=function(_0xa0404a){const _0x11f3a8=_0x1fdd0b;this[_0x11f3a8(0xef)](_0xa0404a)[_0x11f3a8(0x175)](/\\I\[(\d+)\]/i);const _0x27619b=Number(RegExp['$1'])||0x0,_0x5acb85=this[_0x11f3a8(0x247)](_0xa0404a),_0x22cb9c=_0x5acb85['x']+Math[_0x11f3a8(0xe1)]((_0x5acb85[_0x11f3a8(0x316)]-ImageManager['iconWidth'])/0x2),_0x4d173d=_0x5acb85['y']+(_0x5acb85[_0x11f3a8(0x1c9)]-ImageManager[_0x11f3a8(0x269)])/0x2;this[_0x11f3a8(0x383)](_0x27619b,_0x22cb9c,_0x4d173d);},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0xd5)]=Window_SkillStatus[_0x1fdd0b(0x1be)][_0x1fdd0b(0x274)],Window_SkillStatus[_0x1fdd0b(0x1be)][_0x1fdd0b(0x274)]=function(){const _0x23a27a=_0x1fdd0b;VisuMZ[_0x23a27a(0x1a2)]['Window_SkillStatus_refresh'][_0x23a27a(0x320)](this);if(this['_actor'])this['drawExtendedSkillsStatesCoreStatus']();},Window_SkillStatus['prototype'][_0x1fdd0b(0xf6)]=function(){const _0x532e64=_0x1fdd0b;if(!Imported[_0x532e64(0x2e1)])return;if(!Imported[_0x532e64(0x366)])return;const _0x45280a=this[_0x532e64(0x14b)]();let _0x10a73e=this[_0x532e64(0x1b9)]()/0x2+0xb4+0xb4+0xb4,_0x377e17=this[_0x532e64(0x140)]-_0x10a73e-0x2;if(_0x377e17>=0x12c){const _0x1c752d=VisuMZ['CoreEngine'][_0x532e64(0x35f)][_0x532e64(0x3cf)][_0x532e64(0x330)],_0x489005=Math['floor'](_0x377e17/0x2)-0x18;let _0x598f3b=_0x10a73e,_0xb1d0f1=Math[_0x532e64(0xe1)]((this[_0x532e64(0xe5)]-Math[_0x532e64(0x3bc)](_0x1c752d[_0x532e64(0x253)]/0x2)*_0x45280a)/0x2),_0x544b87=0x0;for(const _0x52edcc of _0x1c752d){this[_0x532e64(0x1d8)](_0x598f3b,_0xb1d0f1,_0x489005,_0x52edcc),_0x544b87++,_0x544b87%0x2===0x0?(_0x598f3b=_0x10a73e,_0xb1d0f1+=_0x45280a):_0x598f3b+=_0x489005+0x18;}}this[_0x532e64(0x1a7)]();},Window_SkillStatus[_0x1fdd0b(0x1be)]['drawExtendedParameter']=function(_0x4c5a75,_0x269db1,_0x515a20,_0x23bdc7){const _0x172036=_0x1fdd0b,_0x5ccf83=this[_0x172036(0x14b)]();this['resetFontSettings'](),this[_0x172036(0x1f9)](_0x4c5a75,_0x269db1,_0x515a20,_0x23bdc7,!![]),this[_0x172036(0x16b)](),this[_0x172036(0x1f5)][_0x172036(0x3d2)]-=0x8;const _0x2d83ea=this[_0x172036(0x2dd)][_0x172036(0x296)](_0x23bdc7,!![]);this[_0x172036(0x1f5)][_0x172036(0x1a9)](_0x2d83ea,_0x4c5a75,_0x269db1,_0x515a20,_0x5ccf83,_0x172036(0x3c0));},VisuMZ[_0x1fdd0b(0x1a2)][_0x1fdd0b(0x11f)]=Window_SkillList['prototype'][_0x1fdd0b(0x3b5)],Window_SkillList[_0x1fdd0b(0x1be)][_0x1fdd0b(0x3b5)]=function(_0x351567){const _0x1f7d8e=_0x1fdd0b;return this[_0x1f7d8e(0x142)](_0x351567);},VisuMZ['SkillsStatesCore']['Window_SkillList_maxCols']=Window_SkillList['prototype'][_0x1fdd0b(0x232)],Window_SkillList[_0x1fdd0b(0x1be)][_0x1fdd0b(0x232)]=function(){const _0xbae725=_0x1fdd0b;if(SceneManager['_scene'][_0xbae725(0x28c)]===Scene_Battle){if(_0xbae725(0x375)!==_0xbae725(0x375)){const _0xd0d4ff=_0x31db4d[_0xbae725(0x2f0)]('['+_0x43a003['$1'][_0xbae725(0x175)](/\d+/g)+']');for(const _0x3f97ac of _0xd0d4ff){if(!_0x2ad0ba[_0xbae725(0x342)](_0x3f97ac))return![];}return!![];}else return VisuMZ[_0xbae725(0x1a2)][_0xbae725(0x28e)][_0xbae725(0x320)](this);}else{if('YYZXJ'==='zQRhb'){const _0x29168c=_0x411dd8(_0x628ddd['$1']),_0x4ddcfa=_0x26a533[_0xbae725(0x1b5)](_0x29168c,_0xbae725(0x365),-0x1,'slipHp');_0x4d7ac8[_0xbae725(0x1a2)][_0xbae725(0x331)][_0x497e39['id']]=new _0x1a5756(_0xbae725(0x285),_0x4ddcfa);}else return VisuMZ[_0xbae725(0x1a2)][_0xbae725(0x35f)][_0xbae725(0x15a)][_0xbae725(0x2ac)];}},VisuMZ[_0x1fdd0b(0x1a2)]['Window_SkillList_setActor']=Window_SkillList[_0x1fdd0b(0x1be)]['setActor'],Window_SkillList[_0x1fdd0b(0x1be)][_0x1fdd0b(0xee)]=function(_0x5ce928){const _0x34fb21=_0x1fdd0b,_0x20b904=this['_actor']!==_0x5ce928;VisuMZ[_0x34fb21(0x1a2)][_0x34fb21(0x22b)][_0x34fb21(0x320)](this,_0x5ce928);if(_0x20b904){if(_0x34fb21(0x2e3)==='vGcZh'){this[_0x34fb21(0x26c)](_0xfedde1);;}else{if(this[_0x34fb21(0x24f)]&&this[_0x34fb21(0x24f)][_0x34fb21(0x28c)]===Window_ShopStatus){if(_0x34fb21(0x2bd)!==_0x34fb21(0x146))this[_0x34fb21(0x24f)]['setItem'](this[_0x34fb21(0x1ea)](0x0));else return this[_0x34fb21(0x1dd)]();}}}},Window_SkillList['prototype'][_0x1fdd0b(0x30a)]=function(_0x449ce0){const _0x3fd07c=_0x1fdd0b;if(this['_stypeId']===_0x449ce0)return;this[_0x3fd07c(0x1a1)]=_0x449ce0,this[_0x3fd07c(0x274)](),this[_0x3fd07c(0x130)](0x0,0x0),this['_statusWindow']&&this['_statusWindow'][_0x3fd07c(0x28c)]===Window_ShopStatus&&this['_statusWindow'][_0x3fd07c(0x16e)](this[_0x3fd07c(0x1ea)](0x0));},Window_SkillList['prototype']['includesSkillsStatesCore']=function(_0x1775ac){const _0xdaaefd=_0x1fdd0b;if(!_0x1775ac)return VisuMZ[_0xdaaefd(0x1a2)][_0xdaaefd(0x11f)][_0xdaaefd(0x320)](this,_0x1775ac);if(!this[_0xdaaefd(0x2b6)](_0x1775ac))return![];if(!this[_0xdaaefd(0x362)](_0x1775ac))return![];if(!this['checkShowHideJS'](_0x1775ac))return![];return!![];},Window_SkillList['prototype'][_0x1fdd0b(0x2b6)]=function(_0x260464){const _0x3c3f7d=_0x1fdd0b;return DataManager[_0x3c3f7d(0x2dc)](_0x260464)[_0x3c3f7d(0x3b5)](this[_0x3c3f7d(0x1a1)]);},Window_SkillList[_0x1fdd0b(0x1be)][_0x1fdd0b(0x362)]=function(_0xd9055){const _0x289545=_0x1fdd0b;if(!VisuMZ[_0x289545(0x1a2)][_0x289545(0x212)](this[_0x289545(0x2dd)],_0xd9055))return![];if(!VisuMZ[_0x289545(0x1a2)][_0x289545(0x17e)](this[_0x289545(0x2dd)],_0xd9055))return![];if(!VisuMZ[_0x289545(0x1a2)][_0x289545(0x18a)](this[_0x289545(0x2dd)],_0xd9055))return![];return!![];},VisuMZ[_0x1fdd0b(0x1a2)]['CheckVisibleBattleNotetags']=function(_0x19ad1d,_0x265575){const _0x8fadc4=_0x1fdd0b,_0x3de2fd=_0x265575[_0x8fadc4(0x188)];if(_0x3de2fd['match'](/<HIDE IN BATTLE>/i)&&$gameParty[_0x8fadc4(0x21a)]()){if(_0x8fadc4(0x246)!==_0x8fadc4(0x2a8))return![];else{if(typeof _0x3075be!==_0x8fadc4(0x27a))_0x3d5c7f=_0x3cdfca['id'];return this[_0x8fadc4(0x343)]=this[_0x8fadc4(0x343)]||{},this[_0x8fadc4(0x343)][_0xf92e9c]===_0xc77274&&(this[_0x8fadc4(0x343)][_0x27f345]=''),this[_0x8fadc4(0x343)][_0x2aba7a];}}else{if(_0x3de2fd['match'](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x8fadc4(0x21a)]())return![];else{if(_0x8fadc4(0x1ec)===_0x8fadc4(0x1ec))return!![];else{_0x38b262[_0x8fadc4(0x175)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x464504=_0x3c7f2f[_0x8fadc4(0x312)](_0x4a139b(_0x198b73['$1'])['toUpperCase']()),_0x30f82e=_0x13324b(_0x2a9896['$2']);_0x464504>=0x0&&(_0x12a3b7['setDebuffTurns'](_0x464504,_0x30f82e),this['makeSuccess'](_0x1aeccc));}}}},VisuMZ['SkillsStatesCore']['CheckVisibleSwitchNotetags']=function(_0x2e9c03,_0x9f9736){const _0x7e10e0=_0x1fdd0b,_0x58689d=_0x9f9736[_0x7e10e0(0x188)];if(_0x58689d[_0x7e10e0(0x175)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1087ae=JSON[_0x7e10e0(0x2f0)]('['+RegExp['$1'][_0x7e10e0(0x175)](/\d+/g)+']');for(const _0x408efa of _0x1087ae){if(!$gameSwitches[_0x7e10e0(0x342)](_0x408efa))return![];}return!![];}if(_0x58689d['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xb600ca=JSON[_0x7e10e0(0x2f0)]('['+RegExp['$1'][_0x7e10e0(0x175)](/\d+/g)+']');for(const _0x1ac3fb of _0xb600ca){if(!$gameSwitches[_0x7e10e0(0x342)](_0x1ac3fb))return![];}return!![];}if(_0x58689d[_0x7e10e0(0x175)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2ec711=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3270fb of _0x2ec711){if(_0x7e10e0(0x1ad)===_0x7e10e0(0x1ad)){if($gameSwitches[_0x7e10e0(0x342)](_0x3270fb))return!![];}else return _0x542a11[_0x7e10e0(0x1a2)][_0x7e10e0(0x153)]['call'](this);}return![];}if(_0x58689d[_0x7e10e0(0x175)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x44bd9a=JSON['parse']('['+RegExp['$1'][_0x7e10e0(0x175)](/\d+/g)+']');for(const _0x33a25b of _0x44bd9a){if('AQoAV'!==_0x7e10e0(0x2fa)){if(!$gameSwitches[_0x7e10e0(0x342)](_0x33a25b))return!![];}else{if(this[_0x7e10e0(0x273)]||this[_0x7e10e0(0x14d)])return;try{_0x201a07['SkillsStatesCore'][_0x7e10e0(0x35f)][_0x7e10e0(0x392)][_0x7e10e0(0x199)][_0x7e10e0(0x320)](this,_0x2c42e4);}catch(_0x7e4c6e){if(_0x1043b3[_0x7e10e0(0x399)]())_0x1627e3['log'](_0x7e4c6e);}}}return![];}if(_0x58689d[_0x7e10e0(0x175)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x7e10e0(0x20c)!==_0x7e10e0(0x18f)){const _0x20f91d=JSON[_0x7e10e0(0x2f0)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5240f4 of _0x20f91d){if(_0x7e10e0(0x30b)===_0x7e10e0(0x30b)){if(!$gameSwitches[_0x7e10e0(0x342)](_0x5240f4))return!![];}else return _0x4cc695[_0x7e10e0(0x38d)];}return![];}else{this[_0x7e10e0(0xef)](_0x92c745)['match'](/\\I\[(\d+)\]/i);const _0xe88ae4=_0x3477a0(_0x2290ff['$1'])||0x0,_0x57aa70=this[_0x7e10e0(0x247)](_0x22042f),_0xbf855f=_0x57aa70['x']+_0x3080f7[_0x7e10e0(0xe1)]((_0x57aa70[_0x7e10e0(0x316)]-_0x1ba943[_0x7e10e0(0x37c)])/0x2),_0x175f8b=_0x57aa70['y']+(_0x57aa70[_0x7e10e0(0x1c9)]-_0x4012af[_0x7e10e0(0x269)])/0x2;this[_0x7e10e0(0x383)](_0xe88ae4,_0xbf855f,_0x175f8b);}}if(_0x58689d[_0x7e10e0(0x175)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x469701=JSON[_0x7e10e0(0x2f0)]('['+RegExp['$1'][_0x7e10e0(0x175)](/\d+/g)+']');for(const _0xca0752 of _0x469701){if($gameSwitches[_0x7e10e0(0x342)](_0xca0752))return![];}return!![];}return!![];},VisuMZ['SkillsStatesCore']['CheckVisibleSkillNotetags']=function(_0x16b94c,_0x43f136){const _0x2ccb43=_0x1fdd0b,_0x4b6d88=_0x43f136[_0x2ccb43(0x188)];if(_0x4b6d88['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xa938ac=JSON[_0x2ccb43(0x2f0)]('['+RegExp['$1'][_0x2ccb43(0x175)](/\d+/g)+']');for(const _0xf33778 of _0xa938ac){if(!_0x16b94c[_0x2ccb43(0x25a)](_0xf33778))return![];}return!![];}else{if(_0x4b6d88[_0x2ccb43(0x175)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1ebea3=RegExp['$1'][_0x2ccb43(0x27c)](',');for(const _0x3e6131 of _0x1ebea3){const _0x58ec06=DataManager[_0x2ccb43(0x184)](_0x3e6131);if(!_0x58ec06)continue;if(!_0x16b94c[_0x2ccb43(0x25a)](_0x58ec06))return![];}return!![];}}if(_0x4b6d88['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x43549e=JSON[_0x2ccb43(0x2f0)]('['+RegExp['$1'][_0x2ccb43(0x175)](/\d+/g)+']');for(const _0x2e1b8b of _0x43549e){if(!_0x16b94c['isLearnedSkill'](_0x2e1b8b))return![];}return!![];}else{if(_0x4b6d88[_0x2ccb43(0x175)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3c81fb=RegExp['$1'][_0x2ccb43(0x27c)](',');for(const _0x424c93 of _0x3c81fb){const _0x2a0ac9=DataManager['getSkillIdWithName'](_0x424c93);if(!_0x2a0ac9)continue;if(!_0x16b94c['isLearnedSkill'](_0x2a0ac9))return![];}return!![];}}if(_0x4b6d88[_0x2ccb43(0x175)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4403a6=JSON['parse']('['+RegExp['$1'][_0x2ccb43(0x175)](/\d+/g)+']');for(const _0x2012bc of _0x4403a6){if(_0x16b94c[_0x2ccb43(0x25a)](_0x2012bc))return!![];}return![];}else{if(_0x4b6d88[_0x2ccb43(0x175)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x2ccb43(0x17f)===_0x2ccb43(0x2bb)){this[_0x2ccb43(0x1a7)]();const _0x31cdd7=_0x48eb24[_0x32fcbf];if(_0x31cdd7)!_0x540cb2[_0x2ccb43(0x3b5)](_0x31cdd7)&&this[_0x2ccb43(0x27b)](_0x50f6b7,_0x31cdd7,_0x27f81,_0x2992c7),this[_0x2ccb43(0x161)](_0x34c901,_0x31cdd7,_0x4f9566,_0x5e8167),_0x59b64e['push'](_0x31cdd7);else{const _0x155859=_0x433092[_0x1d0886-_0x443718[_0x2ccb43(0x253)]];this[_0x2ccb43(0x2f9)](_0x2ea153,_0x155859,_0x5c9cd3,_0x150f5a),this[_0x2ccb43(0x1ef)](_0xaee89b,_0x155859,_0x399080,_0x2df540);}_0x21da0a+=_0x96fbee;}else{const _0x1f3166=RegExp['$1'][_0x2ccb43(0x27c)](',');for(const _0x56bf5d of _0x1f3166){if('VxUEv'!==_0x2ccb43(0x185)){for(_0x123613 of _0x4d6fde[_0x2ccb43(0x1a2)][_0x2ccb43(0x35f)]['Costs']){if(_0x2bb73d[_0x2ccb43(0x224)][_0x2ccb43(0x23d)]()==='TP')return _0x2d3ff8[_0x2ccb43(0x37b)]['call'](this,_0x4de3e3);}return _0x2f22ae[_0x2ccb43(0x1a2)][_0x2ccb43(0x2fe)][_0x2ccb43(0x320)](this,_0x1a1cfc);}else{const _0x487ba2=DataManager[_0x2ccb43(0x184)](_0x56bf5d);if(!_0x487ba2)continue;if(_0x16b94c[_0x2ccb43(0x25a)](_0x487ba2))return!![];}}return![];}}}if(_0x4b6d88['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1055d2=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x422167 of _0x1055d2){if(!_0x16b94c[_0x2ccb43(0x25a)](_0x422167))return!![];}return![];}else{if(_0x4b6d88[_0x2ccb43(0x175)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('cRQiR'===_0x2ccb43(0x103)){const _0x199fc0=RegExp['$1'][_0x2ccb43(0x27c)](',');for(const _0x7b3b36 of _0x199fc0){const _0x46776a=DataManager[_0x2ccb43(0x184)](_0x7b3b36);if(!_0x46776a)continue;if(!_0x16b94c['isLearnedSkill'](_0x46776a))return!![];}return![];}else{if(this[_0x2ccb43(0x273)]||this[_0x2ccb43(0x14d)])return;const _0x3efaaf=_0x5b322a['SkillsStatesCore'][_0x2ccb43(0x19f)];if(_0x3efaaf[_0x2f22e1])_0x3efaaf[_0x313f05][_0x2ccb43(0x320)](this,_0x15ec2e);}}}if(_0x4b6d88[_0x2ccb43(0x175)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x67d95c=JSON[_0x2ccb43(0x2f0)]('['+RegExp['$1'][_0x2ccb43(0x175)](/\d+/g)+']');for(const _0x5cd6a6 of _0x67d95c){if(_0x2ccb43(0x127)!==_0x2ccb43(0x15d)){if(!_0x16b94c[_0x2ccb43(0x25a)](_0x5cd6a6))return!![];}else _0x4997a6[_0x2ccb43(0x1ed)]=0x2;}return![];}else{if(_0x4b6d88[_0x2ccb43(0x175)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x191494=RegExp['$1'][_0x2ccb43(0x27c)](',');for(const _0x17bcd9 of _0x191494){const _0x2e076e=DataManager[_0x2ccb43(0x184)](_0x17bcd9);if(!_0x2e076e)continue;if(!_0x16b94c[_0x2ccb43(0x25a)](_0x2e076e))return!![];}return![];}}if(_0x4b6d88[_0x2ccb43(0x175)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x188941=JSON[_0x2ccb43(0x2f0)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x84316b of _0x188941){if(_0x2ccb43(0x198)!=='SHuBv'){if(!_0x4580d2['SkillsStatesCore']['Settings'][_0x2ccb43(0x392)][_0x2ccb43(0x294)])return;const _0x47754c=_0x593b26[_0x2ccb43(0x37c)],_0x44ceb9=_0x2f2c94[_0x2ccb43(0x269)]/0x2,_0x3b420e=_0x55d14b[_0x2ccb43(0xed)]();this[_0x2ccb43(0x3ba)](_0x3b420e),this[_0x2ccb43(0x35d)](_0x2ccb43(0x293)),this[_0x2ccb43(0x1f5)][_0x2ccb43(0x3b3)]=!![],this[_0x2ccb43(0x1f5)][_0x2ccb43(0x3d2)]=_0x2d1aed[_0x2ccb43(0x1a2)][_0x2ccb43(0x35f)][_0x2ccb43(0x392)][_0x2ccb43(0x1f8)],_0x2aff44+=_0x18a6a4[_0x2ccb43(0x1a2)][_0x2ccb43(0x35f)]['States']['DataOffsetX'],_0x220c12+=_0x311acd[_0x2ccb43(0x1a2)][_0x2ccb43(0x35f)][_0x2ccb43(0x392)][_0x2ccb43(0x358)];const _0x11fa5e=_0x1d82be(_0x24d0ae[_0x2ccb43(0xdc)](_0x1966af['id']));this[_0x2ccb43(0x1a9)](_0x11fa5e,_0x180f94,_0x474a7a,_0x47754c,_0x2ccb43(0x3a1)),this[_0x2ccb43(0x1f5)]['fontBold']=![],this['resetFontSettings']();}else{if(_0x16b94c[_0x2ccb43(0x25a)](_0x84316b))return![];}}return!![];}else{if(_0x4b6d88['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x19b682=RegExp['$1'][_0x2ccb43(0x27c)](',');for(const _0x184787 of _0x19b682){const _0x131eee=DataManager['getSkillIdWithName'](_0x184787);if(!_0x131eee)continue;if(_0x16b94c['isLearnedSkill'](_0x131eee))return![];}return!![];}}if(_0x4b6d88[_0x2ccb43(0x175)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x38b791=JSON[_0x2ccb43(0x2f0)]('['+RegExp['$1'][_0x2ccb43(0x175)](/\d+/g)+']');for(const _0x27de16 of _0x38b791){if(!_0x16b94c[_0x2ccb43(0x1ae)](_0x27de16))return![];}return!![];}else{if(_0x4b6d88['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2a61bf=RegExp['$1'][_0x2ccb43(0x27c)](',');for(const _0x2f00d8 of _0x2a61bf){const _0x97dbe9=DataManager[_0x2ccb43(0x184)](_0x2f00d8);if(!_0x97dbe9)continue;if(!_0x16b94c['hasSkill'](_0x97dbe9))return![];}return!![];}}if(_0x4b6d88[_0x2ccb43(0x175)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2f34f7=JSON['parse']('['+RegExp['$1'][_0x2ccb43(0x175)](/\d+/g)+']');for(const _0x34153d of _0x2f34f7){if(!_0x16b94c['hasSkill'](_0x34153d))return![];}return!![];}else{if(_0x4b6d88['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x20c14e=RegExp['$1']['split'](',');for(const _0x39b89a of _0x20c14e){if(_0x2ccb43(0x1cd)===_0x2ccb43(0x1cd)){const _0x4e5f79=DataManager[_0x2ccb43(0x184)](_0x39b89a);if(!_0x4e5f79)continue;if(!_0x16b94c[_0x2ccb43(0x1ae)](_0x4e5f79))return![];}else _0x21fec1[_0x2ccb43(0x1a2)][_0x2ccb43(0x3a5)][_0x2ccb43(0x320)](this),this[_0x2ccb43(0x2fc)]();}return!![];}}if(_0x4b6d88[_0x2ccb43(0x175)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5d36e9=JSON['parse']('['+RegExp['$1'][_0x2ccb43(0x175)](/\d+/g)+']');for(const _0x51d226 of _0x5d36e9){if(_0x16b94c[_0x2ccb43(0x1ae)](_0x51d226))return!![];}return![];}else{if(_0x4b6d88[_0x2ccb43(0x175)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('dSHZn'!=='dSHZn')_0x53a718[_0x2ccb43(0x1a2)][_0x2ccb43(0x254)][_0x2ccb43(0x320)](this,_0x2bf087),this[_0x2ccb43(0x179)](_0x4edb24);else{const _0x57b7b0=RegExp['$1']['split'](',');for(const _0x5a87a4 of _0x57b7b0){const _0x5dc770=DataManager[_0x2ccb43(0x184)](_0x5a87a4);if(!_0x5dc770)continue;if(_0x16b94c[_0x2ccb43(0x1ae)](_0x5dc770))return!![];}return![];}}}if(_0x4b6d88[_0x2ccb43(0x175)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1a98ad=JSON[_0x2ccb43(0x2f0)]('['+RegExp['$1'][_0x2ccb43(0x175)](/\d+/g)+']');for(const _0x229dee of _0x1a98ad){if(_0x2ccb43(0x183)==='XxWQH')_0x36199b[_0x2ccb43(0x356)](_0x332abe(_0x39b716));else{if(!_0x16b94c[_0x2ccb43(0x1ae)](_0x229dee))return!![];}}return![];}else{if(_0x4b6d88['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x95edbb=RegExp['$1']['split'](',');for(const _0x2726e7 of _0x95edbb){const _0x4bf347=DataManager[_0x2ccb43(0x184)](_0x2726e7);if(!_0x4bf347)continue;if(!_0x16b94c[_0x2ccb43(0x1ae)](_0x4bf347))return!![];}return![];}}if(_0x4b6d88[_0x2ccb43(0x175)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2ccb43(0x34e)===_0x2ccb43(0x34e)){const _0x529b38=JSON[_0x2ccb43(0x2f0)]('['+RegExp['$1'][_0x2ccb43(0x175)](/\d+/g)+']');for(const _0x5ba5f3 of _0x529b38){if('JmzXo'!==_0x2ccb43(0x148)){if(!_0x16b94c['hasSkill'](_0x5ba5f3))return!![];}else{_0x248542[_0x2ccb43(0x175)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x29f82f=_0x1e75c7(_0x49c573['$1']);_0x25d632[_0x2ccb43(0x3c9)](_0x29f82f);}}return![];}else this[_0x2ccb43(0x10b)](_0x3322a0,_0x3cafca);}else{if(_0x4b6d88[_0x2ccb43(0x175)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x2ccb43(0x2bc)!==_0x2ccb43(0x2bc)){if(_0x5708db[_0x2ccb43(0x279)]&&_0x5bbe09[_0x2ccb43(0x38d)]!==_0x187ce4)return _0xc6fd98['uiInputPosition'];else return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x2ccb43(0x305)]()[_0x2ccb43(0x175)](/RIGHT/i):_0x46bf02[_0x2ccb43(0x1be)][_0x2ccb43(0x18d)]['call'](this);}else{const _0x363154=RegExp['$1'][_0x2ccb43(0x27c)](',');for(const _0xd18ece of _0x363154){if(_0x2ccb43(0x2a1)!==_0x2ccb43(0x2a1)){const _0x366ca0=this['commandName'](_0x392ffd);if(_0x366ca0[_0x2ccb43(0x175)](/\\I\[(\d+)\]/i)){const _0x13d134=this[_0x2ccb43(0x247)](_0x3dfe10),_0x316e3d=this['textSizeEx'](_0x366ca0)['width'];return _0x316e3d<=_0x13d134[_0x2ccb43(0x316)]?'iconText':_0x2ccb43(0x23c);}}else{const _0x245957=DataManager[_0x2ccb43(0x184)](_0xd18ece);if(!_0x245957)continue;if(!_0x16b94c['hasSkill'](_0x245957))return!![];}}return![];}}}if(_0x4b6d88[_0x2ccb43(0x175)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2ccb43(0x24c)===_0x2ccb43(0x24c)){const _0xd2ba86=JSON[_0x2ccb43(0x2f0)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xbae766 of _0xd2ba86){if(_0x16b94c[_0x2ccb43(0x1ae)](_0xbae766))return![];}return!![];}else _0x16163c[_0x2ccb43(0x1be)][_0x2ccb43(0x131)][_0x2ccb43(0x320)](this,_0x2d7d10),this['onEraseBuffGlobalJS'](_0x57e1aa);}else{if(_0x4b6d88['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1377dd=RegExp['$1'][_0x2ccb43(0x27c)](',');for(const _0x565e18 of _0x1377dd){const _0x53ecd8=DataManager[_0x2ccb43(0x184)](_0x565e18);if(!_0x53ecd8)continue;if(_0x16b94c['hasSkill'](_0x53ecd8))return![];}return!![];}}return!![];},Window_SkillList[_0x1fdd0b(0x1be)][_0x1fdd0b(0x3c6)]=function(_0x2434e6){const _0x325640=_0x1fdd0b,_0x3d1463=_0x2434e6['note'],_0x49d15d=VisuMZ['SkillsStatesCore'][_0x325640(0x141)];return _0x49d15d[_0x2434e6['id']]?_0x49d15d[_0x2434e6['id']][_0x325640(0x320)](this,_0x2434e6):!![];},VisuMZ['SkillsStatesCore']['Window_SkillList_drawItem']=Window_SkillList[_0x1fdd0b(0x1be)][_0x1fdd0b(0x398)],Window_SkillList[_0x1fdd0b(0x1be)][_0x1fdd0b(0x398)]=function(_0x508d6e){const _0x123e8c=_0x1fdd0b,_0x2bc47c=this[_0x123e8c(0x1ea)](_0x508d6e),_0x3b405f=_0x2bc47c[_0x123e8c(0x22f)];if(_0x2bc47c)this[_0x123e8c(0x22d)](_0x2bc47c);VisuMZ[_0x123e8c(0x1a2)][_0x123e8c(0x374)]['call'](this,_0x508d6e);if(_0x2bc47c)_0x2bc47c['name']=_0x3b405f;},Window_SkillList[_0x1fdd0b(0x1be)]['alterSkillName']=function(_0x5cbd37){const _0x54e9a6=_0x1fdd0b;if(_0x5cbd37&&_0x5cbd37['note'][_0x54e9a6(0x175)](/<LIST NAME:[ ](.*)>/i)){_0x5cbd37['name']=String(RegExp['$1'])[_0x54e9a6(0x363)]();for(;;){if(_0x5cbd37[_0x54e9a6(0x22f)][_0x54e9a6(0x175)](/\\V\[(\d+)\]/gi))_0x5cbd37[_0x54e9a6(0x22f)]=_0x5cbd37[_0x54e9a6(0x22f)]['replace'](/\\V\[(\d+)\]/gi,(_0x521c78,_0x2c3e45)=>$gameVariables['value'](parseInt(_0x2c3e45)));else{if(_0x54e9a6(0x12e)==='DTKdo')break;else for(_0x5bfe63 of _0x3890d1[_0x54e9a6(0x1a2)][_0x54e9a6(0x35f)]['Costs']){const _0x3d3532=_0x650a17[_0x54e9a6(0x37b)][_0x54e9a6(0x320)](this,_0x5ac732);_0xd5aef5[_0x54e9a6(0x216)]['call'](this,_0x803e33,_0x3d3532);}}}}},Window_SkillList[_0x1fdd0b(0x1be)][_0x1fdd0b(0x1c4)]=function(_0x4a8a08,_0x3b5135,_0x25782c,_0x69a992){const _0x123f26=_0x1fdd0b;Window_Base[_0x123f26(0x1be)][_0x123f26(0x1c4)][_0x123f26(0x320)](this,this[_0x123f26(0x2dd)],_0x4a8a08,_0x3b5135,_0x25782c,_0x69a992);},Window_SkillList[_0x1fdd0b(0x1be)][_0x1fdd0b(0x114)]=function(_0x17a861){this['_statusWindow']=_0x17a861,this['callUpdateHelp']();},VisuMZ['SkillsStatesCore'][_0x1fdd0b(0x1c6)]=Window_SkillList['prototype'][_0x1fdd0b(0x209)],Window_SkillList[_0x1fdd0b(0x1be)][_0x1fdd0b(0x209)]=function(){const _0x4400e9=_0x1fdd0b;VisuMZ[_0x4400e9(0x1a2)]['Window_SkillList_updateHelp'][_0x4400e9(0x320)](this);if(this[_0x4400e9(0x24f)]&&this[_0x4400e9(0x24f)]['constructor']===Window_ShopStatus){if(_0x4400e9(0x3c8)===_0x4400e9(0x385)){const _0x14193a=_0x16e847['SkillsStatesCore'][_0x4400e9(0x35f)][_0x4400e9(0x3c2)][_0x4400e9(0x360)](_0x15aabf=>_0x15aabf[_0x4400e9(0x224)][_0x4400e9(0x23d)]()===_0x4c9dfe['toUpperCase']());_0x14193a[_0x4400e9(0x253)]>=0x1?this[_0x4400e9(0x120)]=_0x14193a[0x0]:this[_0x4400e9(0x120)]=null;}else this[_0x4400e9(0x24f)][_0x4400e9(0x16e)](this['item']());}};function _0x6d6a(){const _0x533540=['members','push','RefreshCacheSwitch','DataOffsetY','TextJS','isBottomHelpMode','Scene_Skill_itemWindowRect','Game_BattlerBase_meetsSkillConditions','changeOutlineColor','ANY','Settings','filter','removeStatesAuto','checkShowHideNotetags','trim','stateTpSlipDamageJS','damage','VisuMZ_1_MainMenuCore','meetsPassiveStateConditionSwitches','ktomY','48dSkYOQ','enemy','JeWRc','death','commandNameWindowCenter','onDatabaseLoaded','ARRAYJSON','Actor','TurnOffsetX','statusWidth','isSkillHidden','Window_SkillList_drawItem','StbgO','2564514dHXjXP','XagGg','LayoutStyle','AwKRX','Scene_Skill_createItemWindow','CalcJS','iconWidth','<actor-%1>','qQZsW','status','IlIwl','add','Scene_Boot_onDatabaseLoaded','drawIcon','NMUcN','YbPCI','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','vHMCD','applyDebuffTurnManipulationEffects','gainHp','Game_BattlerBase_eraseBuff','jZxjl','_passiveStateResults','uiInputPosition','_stypeIDs','isStateCategoryResisted','OFdyB','Parse_Notetags_Skill_Cost','States','log','none','zSvFc','ColorDebuff','applyStateTurnManipulationEffects','drawItem','isPlaytest','IconStypeMagic','return\x200','applyStateCategoryRemovalEffects','loadBitmap','Game_BattlerBase_traitsSet','skillTypeWindowRect','mainFontFace','center','NJucr','clearStateOrigin','meetsStateCondition','Sprite_StateIcon_updateFrame','nraZp','Sprite_Gauge_currentValue','clearStateRetainType','redraw','mpCost','aliveMembers','\x5cI[%1]%2','ColorPositive','textColor','isDebuffAffected','makeAdditionalSkillCostText','gTecg','recalculateSlipDamageJS','fontBold','Sprite_Gauge_gaugeRate','includes','onRegenerateCustomStateDamageOverTime','MultiplierJS','drawFullGauge','onAddBuffJS','changeTextColor','outlineColor','ceil','onExpireDebuffGlobalJS','addPassiveStates','Game_BattlerBase_die','right','puNpH','Costs','Game_BattlerBase_initMembers','OCKuh','commandNameWindowDrawText','checkShowHideJS','HUSfD','jBsWJ','removeStatesByCategoryAll','addBuff','keys','Game_Battler_regenerateAll','updateCommandNameWindow','TurnOffsetY','Param','HPXUb','greater','fontSize','ZwhSU','CoreEngine','GVSji','HRTsP','slipHp','stateAddJS','ZsisB','CrQvW','states','_currentTroopUniqueID','isGroupDefeatStateAffected','totalStateCategoryAffected','stateColor','meetsPassiveStateConditions','Game_BattlerBase_overwriteBuffTurns','YvViE','_stateSteps','removeStatesByCategory','Window_SkillStatus_refresh','fIJYy','getStypeIdWithName','psdkx','changePaintOpacity','_stateOrigin','WGvAk','getStateDisplay','_battler','CmdTextAlign','DEF','convertPassiveStates','floor','zYIUN','MEreC','Scene_Skill_helpWindowRect','innerHeight','removeOtherStatesOfSameCategory','Game_BattlerBase_decreaseBuff','isStateResist','buff','Sprite_Gauge_initMembers','itemWindowRect','currentDisplayedValue','normalColor','setActor','commandName','GaugeDrawJS','addPassiveStatesByPluginParameters','categories','ColorBuff','setStateRetainType','Game_Troop_setup','drawExtendedSkillsStatesCoreStatus','user','_stateRetainType','ARRAYEVAL','Parse_Notetags_State_Category','onEraseBuffGlobalJS','LUK','ARRAYFUNC','_checkingTraitsSetSkillsStatesCore','eraseState','ShowJS','%1\x20%2\x20%3','Parse_Notetags_State_SlipEffectJS','cRQiR','getCurrentStateOriginKey','slipTp','EWxfw','jyXKl','maxSlipDamage','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','concat','onAddDebuff','setupSkillsStatesCore','CMJro','iconText','Buffs','SkillSceneAdjustSkillList','addPassiveStatesFromOtherPlugins','_buffs','isStateCategoryAffected','setStatusWindow','388360ipMEGO','PNzxH','viets','makeCurrentTroopUniqueID','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','getStateIdWithName','isSceneBattle','overwriteBuffTurns','isMaxDebuffAffected','gradientFillRect','Window_SkillList_includes','_costSettings','qyJSp','uakTM','statePassiveConditionJS','_stored_state-%1-color','buffColor','VisuMZ_1_ItemsEquipsCore','KvEtO','onChange','convertTargetToStateOriginKey','_states','getCurrentStateActiveUser','stateTurns','CanPayJS','DTKdo','testApply','scrollTo','onEraseBuff','ParseClassIDs','1113216uajmnG','meetsSkillConditionsEnableJS','parameters','setStateOrigin','gainMp','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isSkillUsableForAutoBattle','Scene_Skill_skillTypeWindowRect','Window_StatusBase_placeGauge','Game_Battler_isStateAddable','fIGPK','drawTextEx','anchor','innerWidth','skillVisibleJS','includesSkillsStatesCore','onEraseStateGlobalJS','EWOYt','ARRAYSTRUCT','ayFex','ATK','wutHn','IKrvz','getColorDataFromPluginParameters','gaugeLineHeight','skillTpCost','_tempBattler','itemTextAlign','Enemy','_phase','wqhMq','commandNameWindowDrawBackground','Scene_Skill_statusWindowRect','cngrK','meetsPassiveStateConditionClasses','FcWkZ','zHisE','JvYrD','hasStateCategory','Skills','lineHeight','ujssX','aLMZx','statesByCategory','clearStateDisplay','passiveStates','drawActorStateData','Game_Action_applyItemUserEffect','tffRc','lyhBP','isBuffOrDebuffAffected','tAfFT','Game_Actor_skillTypes','onEraseBuffJS','helpAreaHeight','resetStateCounts','resetTextColor','addPassiveStatesTraitSets','ColorNeutral','setItem','BattleManager_endAction','opacity','meetsPassiveStateConditionJS','helpWindowRect','_turnDisplaySprite','getCurrentTroopUniqueID','match','Game_BattlerBase_recoverAll','createShopStatusWindow','StackBuffMax','createCommandNameWindow','_classIDs','HkTwu','wKpVk','applyItemUserEffect','CheckVisibleSwitchNotetags','Qhqqk','getColor','OiKhG','skillMpCost','XVVFT','getSkillIdWithName','VxUEv','MmLyE','_cache','note','getStateRetainType','CheckVisibleSkillNotetags','MYhTF','Game_BattlerBase_eraseState','isRightInputMode','adjustItemWidthByShopStatus','tBaWn','qhkbU','process_VisuMZ_SkillsStatesCore_State_Notetags','SkillSceneStatusBgType','maxItems','stateEraseJS','removeBuffsAuto','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','GtEOL','SHuBv','onAddStateJS','isBuffAffected','mainAreaHeight','clearStatesWithStateRetain','canClearState','initMembers','stateExpireJS','NUM','_stypeId','SkillsStatesCore','testSkillStatesCoreNotetags','ConvertParams','convertGaugeTypeSkillsStatesCore','checkSkillConditionsSwitchNotetags','resetFontSettings','_subject','drawText','TgADG','traitsSet','helpAreaTop','QpMxb','hasSkill','EVAL','vNeNb','lxbCR','currentMaxValue','currentMaxValueSkillsStatesCore','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','format','MDF','sdoxe','Game_Unit_isAllDead','colSpacing','shopStatusWindowRect','max','stateHpSlipHealJS','MAXMP','prototype','updateStatesActionEnd','increaseBuff','action','makeSuccess','skill','drawSkillCost','item','Window_SkillList_updateHelp','COwFa','Game_Action_testApply','height','applySkillsStatesCoreEffects','zuhvU','totalStateCategory','ODOiS','uffaM','aOegI','onEraseDebuff','buffTurns','isStateAddable','onAddBuffGlobalJS','ShowTurns','initMembersSkillsStatesCore','QIIir','ONHNQ','drawExtendedParameter','_scene','ARRAYSTR','mainAreaTop','addCommand','currentValueSkillsStatesCore','Parse_Notetags_State_ApplyRemoveLeaveJS','allBattleMembers','addChild','uteLM','groupDefeat','callUpdateHelp','onExpireStateCustomJS','CmdStyle','Game_Battler_addBuff','onExpireDebuff','522729eMwAvU','boxWidth','itemAt','isCommandEnabled','JaYYD','autoRemovalTiming','currentClass','drawActorBuffRates','kpWtn','LwEED','eXXCR','hfWrT','placeExactGauge','contents','yFQRg','onAddStateCustomJS','DataFontSize','drawParamText','setStateTurns','MAT','buttonAssistSwitch','isMaxBuffAffected','skillTypes','fDnsl','stateMpSlipDamageJS','isBuffExpired','multiclasses','Sprite_Gauge_currentMaxValue','qJnjb','uiHelpPosition','buffIconIndex','stateMaximumTurns','makeResistedStateCategories','updateHelp','menuActor','jUZvI','xkSmf','priority','text','description','Sprite_Gauge_setup','ParseSkillNotetags','CheckVisibleBattleNotetags','nqjcc','gqvEI','isAllDead','PayJS','allIcons','clearStateData','currentValue','inBattle','gaugeBackColor','addDebuffTurns','AWKkO','redrawSkillsStatesCore','reset','_checkingVisuMzPassiveStateObjects','addWindow','_stateMaxTurns','onExpireBuffJS','Name','EHeTY','eSlUb','createAllSkillCostText','_colorCache','skillEnableJS','EnableLayout','Window_SkillList_setActor','getClassIdWithName','alterSkillName','clear','name','recoverAll','textSizeEx','maxCols','process_VisuMZ_SkillsStatesCore_Notetags','Global','GCkmE','3190730QEyYSa','nLkJx','fillRect','btWEY','ALL','state','icon','toUpperCase','isAlive','ktVgP','gainSilentTp','_currentActor','sKAag','KeOCP','MbiIn','heal','iTKnx','itemLineRect','isPartyAllAffectedByGroupDefeatStates','Sprite_Gauge_redraw','untitled','drawItemStyleIcon','uQeGh','isStateRestrict','drawActorIcons','_statusWindow','hasState','PassiveStates','slMwn','length','Window_SkillType_initialize','addState','skillCostSeparator','_result','isPassiveStateStackable','OAIvP','isLearnedSkill','_lastStatesActionEndFrameCount','xUlrx','shopStatusWidth','Game_BattlerBase_increaseBuff','enemyId','Enrpr','xfPkc','commandStyleCheck','pzIlg','drawItemStyleIconText','ActionEndUpdate','yPkLT','passiveStateObjects','learnSkill','iconHeight','Game_Actor_learnSkill','skillTypeWindowRectSkillsStatesCore','onAddState','checkSkillConditionsNotetags','stateTpSlipHealJS','uTdFg','wUGQA','Game_BattlerBase_refresh','Game_BattlerBase_clearStates','_tempActor','refresh','isStateExpired','endAction','_stateTurns','JSON','uiMenuStyle','number','drawActorStateTurns','split','sort','isActor','bitmap','onAddBuff','addDebuff','createSkillCostText','eTsxe','setStateData','stateId','_skillTypeWindow','_hidden','wpTGJ','IconStypeNorm','GlstC','%1%','constructor','Game_BattlerBase_skillMpCost','Window_SkillList_maxCols','_itemWindow','_stored_buffColor','onRemoveState','ReapplyRules','rgba(0,\x200,\x200,\x201)','ShowData','skills','paramValueByName','xuSDi','lTWMz','Window_StatusBase_drawActorIcons','helpWindowRectSkillsStatesCore','Game_BattlerBase_isStateResist','HckvQ','NlBLM','removeState','decreaseBuff','shopStatusWindowRectSkillsStatesCore','xMsNO','getStateOrigin','getStateOriginByKey','Game_BattlerBase_states','CheckIncompatibleStates','onEraseDebuffGlobalJS','_shopStatusWindow','okNWG','Game_BattlerBase_resetStateCounts','retrieveStateColor','nQEEb','ListWindowCols','frameCount','#%1','RMQnB','setPassiveStateSlipDamageJS','onAddStateGlobalJS','SkillMenuStatusRect','isStateRemoved','TurnEndOnMap','getStateReapplyRulings','checkSkillTypeMatch','fontFace','Game_BattlerBase_buffIconIndex','533440OCaFOG','stateMpSlipHealJS','tnVtN','FMhJO','ExkYc','isUseModernControls','setDebuffTurns','paramBuffRate','Game_Actor_forgetSkill','ijorC','stateData','active','IUAZq','actorId','map','_buffTurns','yDsTE','exit','lkScQ','AGI','_commandNameWindow','isSkillTypeMatchForUse','zRdNR','traitObjects','itemWindowRectSkillsStatesCore','clearStates','qQxcv','BQSNb','omqUJ','addStateTurns','onExpireStateGlobalJS','VYazU','ParseStateNotetags','_categoryWindow','FjCpX','getSkillTypes','_actor','Fcdfy','meetsPassiveStateGlobalConditionJS','4QATQud','VisuMZ_0_CoreEngine','placeGauge','wUVtH','canUse','FUNC','onExpireState','setup','JCwmA','mainCommandWidth','_stateData','shift','acHUC','makeCommandName','IkQJY','regenerateAllSkillsStatesCore','parse','HiddenSkillTypes','tpCost','ParseAllNotetags','statusWindowRectSkillsStatesCore','onAddDebuffJS','Vcyeh','stepsForTurn','isBuffPrevented','drawActorBuffTurns','HUEma','onAddDebuffGlobalJS','updateTurnDisplaySprite','MAXHP','Game_BattlerBase_skillTpCost','GaugeCurrentJS','debuffColor','commandStyle','slice','Game_Battler_addState','paySkillCost','updatedLayoutStyle','getStateData','zcCRG','ARRAYNUM','GroupDigits','setStypeId','lkJOL','setStateDisplay','process_VisuMZ_SkillsStatesCore_Skill_Notetags','checkCacheKey','allowCreateShopStatusWindow','Unamz','hpDamage','indexOf','<troop-%1>','slipMp','onAddStateMakeCustomSlipValues','width','index','iconIndex','updateFrame','recover\x20all','_stateIDs','VisuMZ_1_ElementStatusCore','equips','gaugeRate','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','call','_checkingPassiveStates','MaxTurns','Ajctd','_skillIDs','success','Parse_Notetags_Skill_JS','onExpireBuff','statusWindowRect','clamp','TurnFontSize','buffLength','EhCPa','NTeBV','addPassiveStatesByNotetag','isStateAffected','DisplayedParams','stateHpSlipDamageJS','DataOffsetX','createPassiveStatesCache','setBackgroundType','createTurnDisplaySprite','makeCommandList','yJqEI','Game_Battler_addDebuff','onExpireBuffGlobalJS','_animationIndex','fwjcM','198252fEkeRJ','die','TZIUL','isSkillCostShown','GaugeMaxJS','meetsSkillConditions','value','_stateDisplay','eraseBuff','aHrmN','setBuffTurns','calcWindowHeight','actor','TrqlD','Parse_Notetags_State_PassiveJS','addBuffTurns','onEraseStateCustomJS','isUseSkillsStatesCoreUpdatedLayout','jSFmk','replace','AFLxa','27zzPVjp','round','forgetSkill','LOpBE'];_0x6d6a=function(){return _0x533540;};return _0x6d6a();}