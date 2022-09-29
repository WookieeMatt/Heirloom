//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.34;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.34] [SkillsStatesCore]
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
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
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
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
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
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
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
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
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

const _0xc329de=_0x5177;(function(_0x107dbc,_0x4727ff){const _0x447a24=_0x5177,_0x226118=_0x107dbc();while(!![]){try{const _0x433991=-parseInt(_0x447a24(0x2d6))/0x1*(parseInt(_0x447a24(0x379))/0x2)+-parseInt(_0x447a24(0x4fc))/0x3*(parseInt(_0x447a24(0x29d))/0x4)+parseInt(_0x447a24(0x234))/0x5+parseInt(_0x447a24(0x45c))/0x6*(-parseInt(_0x447a24(0x23d))/0x7)+parseInt(_0x447a24(0x480))/0x8+parseInt(_0x447a24(0x27a))/0x9*(parseInt(_0x447a24(0x208))/0xa)+parseInt(_0x447a24(0x400))/0xb;if(_0x433991===_0x4727ff)break;else _0x226118['push'](_0x226118['shift']());}catch(_0x449749){_0x226118['push'](_0x226118['shift']());}}}(_0x2977,0xda335));function _0x2977(){const _0x32e27f=['skills','eukTB','AmoaH','isBuffExpired','StackDebuffMax','NovlH','Sprite_Gauge_initMembers','split','VisuMZ_1_ItemsEquipsCore','Jicrn','sYNPl','Game_BattlerBase_skillTpCost','_stypeId','Sprite_StateIcon_loadBitmap','ZGqZN','skillTypeWindowRectSkillsStatesCore','format','DataOffsetX','nMekq','setStateDisplay','Buffs','return\x200','applyBuffTurnManipulationEffects','xXtuo','USChh','isUseSkillsStatesCoreUpdatedLayout','alterSkillName','stateAddJS','meetsPassiveStateConditionJS','onAddStateMakeCustomSlipValues','testSkillStatesCoreNotetags','helpAreaTop','skillCostSeparator','ARRAYFUNC','gUGRu','SyQxX','yGcGg','jgRvX','jQjID','_stateMaxTurns','add','drawText','VRzWq','skillTypes','isDebuffAffected','NqhFP','Game_BattlerBase_buffIconIndex','isBuffOrDebuffAffected','shift','canUse','isMaxDebuffAffected','multiclasses','initMembers','YZIkz','fillRect','meetsPassiveStateConditionClasses','drawParamText','lmlnh','mainAreaTop','mUqvn','drawIcon','hpDamage','RiXqI','LUK','convertGaugeTypeSkillsStatesCore','CmKaJ','applyStateTurnManipulationEffects','resetTextColor','hasStateCategory','removeBuffsAuto','numberFontFace','rmoPA','YyMQF','name','autoRemovalTiming','stateId','gaugeColor1','onAddBuffJS','TurnOffsetY','onExpireStateGlobalJS','NEkUk','aFPHW','itemLineRect','addStateTurns','useDigitGrouping','23504877qRUdtZ','isLearnedSkill','VisuMZ_2_ClassChangeSystem','yufzo','slipHp','CalcJS','Game_BattlerBase_clearStates','BattleManager_endAction','FUNC','helpAreaHeight','changeTextColor','length','zsYDa','loadBitmap','onExpireStateJS','drawSkillCost','stateHpSlipDamageJS','buffIconIndex','DSTQj','onEraseDebuffGlobalJS','addPassiveStates','CanPayJS','currentClass','setStateTurns','RzXrV','UUmdC','Game_BattlerBase_isStateResist','EhSEF','ZjozE','isStateResist','commandName','createShopStatusWindow','addPassiveStatesByNotetag','cuGDu','MAXMP','clearStateDisplay','action','FEyRE','TurnOffsetX','States','floor','Scene_Skill_helpWindowRect','ntmIB','createPassiveStatesCache','opacity','buttonAssistText1','currentMaxValueSkillsStatesCore','RefreshCacheVar','ADZzS','drawActorStateTurns','anchor','jKCoU','slipMp','ReapplyRules','_skillTypeWindow','clearStates','paramBuffRate','_lastStatesActionEndFrameCount','Settings','paramValueByName','buffTurns','TurnEndOnMap','iwLHm','Wjiel','_stypeIDs','makeCommandList','changeOutlineColor','_scene','onAddState','_itemWindow','mainCommandWidth','setup','updateFrame','mPXfu','restriction','FuPmK','_costSettings','ARRAYNUM','IconStypeNorm','getStateRetainType','lvYHu','makeCommandName','passiveStateObjects','_buffs','commandNameWindowDrawBackground','ParseAllNotetags','nwNVU','slipTp','buttonAssistSwitch','laZLE','bitmap','checkSkillTypeMatch','54402HaYXAk','parse','Game_BattlerBase_eraseState','_shopStatusWindow','Sprite_StateIcon_updateFrame','stateMpSlipHealJS','stateData','elyhz','lEoOl','CqssV','gradientFillRect','redrawSkillsStatesCore','MultiplierJS','xhmrR','IiFxv','jocPJ','ppwth','debuffTurns','_result','checkShowHideNotetags','kADIF','getSkillIdWithName','setPassiveStateSlipDamageJS','drawActorIconsAllTurnCounters','resetStateCounts','meetsSkillConditionsGlobalJS','regenerateAllSkillsStatesCore','isSkillUsableForAutoBattle','Parse_Notetags_Skill_JS','Lyqqd','isStateExpired','enemy','makeResistedStateCategories','Game_Variables_onChange','ALL','SkillSceneStatusBgType','4485224NtSlSh','Sprite_Gauge_redraw','shopStatusWindowRect','getStateData','slice','frameCount','_checkingPassiveStates','status','paySkillCost','constructor','user','initialize','QsFNh','ValueOutlineWidth','ignore','version','addState','eraseState','onExpireBuffGlobalJS','dCqYB','refresh','YsESG','OgBcF','GaugeMaxJS','Game_BattlerBase_recoverAll','ConvertParams','onEraseBuff','EPZfG','textColor','BattleHiddenSkillTypes','iconText','ZjazP','process_VisuMZ_SkillsStatesCore_State_Notetags','meetsStateCondition','AGI','getCurrentStateActiveUser','getCurrentTroopUniqueID','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','ROXjM','MAT','ParseClassIDs','_checkingVisuMzPassiveStateObjects','labelFontSize','_passiveStateResults','height','toUpperCase','boxWidth','WhSst','bQxIT','groupDefeat','getStateDisplay','gaugeBackColor','process_VisuMZ_SkillsStatesCore_Skill_Notetags','setItem','addPassiveStatesTraitSets','EVAL','GGaqf','getStateIdWithName','createCommandNameWindow','phlhq','cLyHs','MaxTurns','buff','text','onAddBuffGlobalJS','_stateOrigin','NUM','retrieveStateColor','DisplayedParams','Sprite_Gauge_currentMaxValue','RnCtC','fontFace','recoverAll','rZnPj','recalculateSlipDamageJS','setBuffTurns','isSkillTypeMatchForUse','Game_Action_testApply','stateTurns','applyDebuffTurnManipulationEffects','changePaintOpacity','getColor','aliveMembers','SXYjL','CrMIC','stateHpSlipHealJS','Window_SkillList_includes','auto','enemyId','itemTextAlign','none','helpWindowRectSkillsStatesCore','valueOutlineColor','NUxtX','iconWidth','lhHvi','Window_StatusBase_drawActorIcons','statusWindowRectSkillsStatesCore','meetsPassiveStateGlobalConditionJS','_animationIndex','vrESh','iconHeight','valueFontSize','toLowerCase','Scene_Skill_createItemWindow','DEAtc','LHOBt','DnBpA','addChild','overwriteBuffTurns','VisuMZ_1_ElementStatusCore','Game_Actor_learnSkill','TurnFontSize','value','_classIDs','Game_BattlerBase_overwriteBuffTurns','rgba(0,\x200,\x200,\x201)','actor','cnnjT','clearStatesWithStateRetain','_cache','isBuffAffected','_actor','traitObjects','9654CnAFkz','YdVxl','FflWx','zftLZ','DataFontSize','kWagb','commandStyle','_currentActor','commandNameWindowDrawText','stateTpSlipDamageJS','categories','round','forgetSkill','onExpireStateCustomJS','valueOutlineWidth','removeBuff','die','ZfDAf','checkSkillConditionsSwitchNotetags','_tempBattler','item','xeIlz','_stateRetainType','clearStateOrigin','onExpireDebuffGlobalJS','onAddStateCustomJS','csuTW','LabelFontMainType','hide','isUseModernControls','<enemy-%1>','ARRAYJSON','MDF','_commandNameWindow','_stateData','CheckIncompatibleStates','Gjfip','Game_BattlerBase_initMembers','currentValueSkillsStatesCore','vdmFy','drawExtendedSkillsStatesCoreStatus','qaeRf','IIQiz','createItemWindow','RefreshCacheSwitch','statesByCategory','NQkUo','increaseBuff','inBattle','EBhGf','ColorBuff','UwvUx','meetsPassiveStateConditions','indexOf','convertTargetToStateOriginKey','GfjFh','setDebuffTurns','updatedLayoutStyle','isPassiveStateStackable','PassiveConditionJS','success','UNfCT','DataOffsetY','isPartyAllAffectedByGroupDefeatStates','mMjLy','placeExactGauge','maxCols','skillTpCost','Scene_Skill_skillTypeWindowRect','removeState','236080qfAeTi','CmdTextAlign','ATK','ShowData','fontBold','GaugeCurrentJS','shopStatusWidth','gkkHS','STR','call','isStateAffected','match','Game_BattlerBase_traitsSet','setStypeId','makeSuccess','DJRjo','isGroupDefeatStateAffected','makeCurrentTroopUniqueID','\x5cI[%1]%2','stepsForTurn','DEF','Game_Actor_forgetSkill','<actor-%1>','skillVisibleJS','BmPWW','setStatusWindow','Game_Switches_onChange','usableSkills','IMQXn','stateMpSlipDamageJS','hasSkill','onAddDebuff','description','GroupDigits','STjAw','HhMMe','updateHelp','drawItemStyleIcon','statusWindowRect','CmdStyle','WsPiK','zVjEe','ykYKc','allowCreateShopStatusWindow','2489380fqAKpd','addDebuff','updateStatesActionEnd','iconIndex','isAlive','fGhPR','state','labelFontFace','hasState','581rPXajP','stateExpireJS','mpDamage','SkillMenuStatusRect','traitsSet','isStateCategoryResisted','qVZSv','setStateRetainType','_subject','Parse_Notetags_State_ApplyRemoveLeaveJS','LbXgW','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','drawActorIcons','Gauge','nJBDe','labelOutlineWidth','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','ZKEIH','buffColor','Game_Battler_addBuff','Game_BattlerBase_decreaseBuff','stateCategoriesResisted','note','skillMpCost','_stateSteps','reset','_turnDisplaySprite','Param','trim','Actor','_statusWindow','callUpdateHelp','addPassiveStatesFromOtherPlugins','mainFontFace','colSpacing','getColorDataFromPluginParameters','_currentTroopUniqueID','sLBTh','uiMenuStyle','_stateDisplay','commandStyleCheck','isSceneBattle','uiInputPosition','meetsSkillConditions','GaugeDrawJS','ppImF','skill','onAddBuff','Parse_Notetags_State_SlipEffectJS','Game_Battler_isStateAddable','EnableLayout','mainFontSize','Game_BattlerBase_resetStateCounts','onChange','_states','itemAt','skillTypeWindowRect','BkIhg','applyStateCategoryRemovalEffects','statePassiveConditionJS','onEraseDebuffJS','27rwthro','createAllSkillCostText','eqXlI','setStateOrigin','currentMaxValue','onRemoveState','fUMuo','OrCVw','vGBYq','setupSkillsStatesCore','skillId','<member-%1>','onRegenerateCustomStateDamageOverTime','stateColor','statusWidth','getStypeIdWithName','LEisq','log','gaugeLineHeight','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','heal','death','Game_Troop_setup','STRUCT','allBattleMembers','Scene_Boot_onDatabaseLoaded','priority','HYJwt','pOrmd','onAddDebuffJS','states','ColorNegative','bkEON','YyClz','ZDZCY','1516fbbIxC','PrtII','onEraseBuffGlobalJS','YDbaj','currentDisplayedValue','YjsqY','bteYw','ANY','rgELO','drawItem','removeStatesByCategoryAll','isSkillCostShown','isMaxBuffAffected','damage','bOOOb','isAllDead','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','pvlDk','Skills','drawExtendedParameter','equips','Game_BattlerBase_die','XhbOQ','convertPassiveStates','includesSkillsStatesCore','Global','QGTmR','index','Window_SkillStatus_refresh','WDgpJ','QuVaB','Window_SkillType_initialize','keys','iqyZy','_tempActor','Game_Battler_addState','process_VisuMZ_SkillsStatesCore_Notetags','Window_SkillList_setActor','PassiveStates','JiunY','addCommand','checkCacheKey','checkShowHideJS','Game_BattlerBase_skillMpCost','_checkingTraitsSetSkillsStatesCore','ColorPositive','DcJlw','clearStateRetainType','textSizeEx','ActionEndUpdate','FnacL','drawActorStateData','RMqvo','WElLD','currentValue','onExpireBuff','makeAdditionalSkillCostText','400228cWeQeN','onEraseStateCustomJS','isSkillHidden','Scene_Skill_statusWindowRect','Parse_Notetags_Skill_Cost','contents','getStateOriginByKey','MAXHP','<troop-%1>','removeStatesAuto','isBuffPrevented','removeOtherStatesOfSameCategory','bPCIG','hysrd','CZVSF','commandNameWindowCenter','CheckVisibleBattleNotetags','totalStateCategoryAffected','meetsPassiveStateConditionSwitches','tpCost','nEkfX','CXJXn','width','addBuffTurns','stateTpSlipHealJS','CWptD','outlineColor','ValueFontMainType','maxItems','Window_SkillList_drawItem','debuffColor','menuActor','ListWindowCols','mkIhY','Game_BattlerBase_increaseBuff','stypeId','onEraseDebuff','mpCost','bWgjU','onAddStateGlobalJS','_stored_buffColor','addDebuffTurns','placeGauge','createSkillCostText','lFsLG','Window_StatusBase_placeGauge','NEGATIVE','prototype','uiHelpPosition','givFA','isStateAddable','HsSCe','drawTextEx','updateCommandNameWindow','PresetLabelGaugeColor','Enemy','zCCDv','gainHp','_buffTurns','getStateReapplyRulings','tFxEi','max','setStateData','onExpireDebuff','itemWindowRectSkillsStatesCore','getSkillTypes','SkillSceneAdjustSkillList','ParseSkillNotetags','icon','isStateRestrict','wRVGd','aVjmV','stateMaximumTurns','passiveStates','KMilO','applyItemUserEffect','regenerateAll','itemWindowRect','_colorCache','oPycM','getCurrentStateOriginKey','vKdSy','shopStatusWindowRectSkillsStatesCore','testApply','resetFontSettings','nadww','ceil','isStateCategoryAffected','setActor','right','Game_Battler_addDebuff','number','clear','ColorDebuff','decreaseBuff','gaugeColor2','meetsSkillConditionsEnableJS','removeStatesByCategory','JUyad','XTfMf','applySkillsStatesCoreEffects','Parse_Notetags_State_PassiveJS','scrollTo','members','Sprite_Gauge_setup','Game_BattlerBase_refresh','onAddDebuffGlobalJS','Game_Unit_isAllDead','_stateTurns','redraw','exit','MatchLabelGaugeColor','PhQGG','gainSilentTp','eraseBuff','concat','setBackgroundType','BFvAD','Window_SkillList_updateHelp','babSR','push','rIJpG','onDatabaseLoaded','initMembersSkillsStatesCore','drawActorBuffTurns','_stateIDs','tABXu','parameters','sAPeI','sCeEE','includes','_categoryWindow','XwmLm','canPaySkillCost','%1%','wKfYC','TWlhN','_skillIDs','Game_Actor_skillTypes','isPlaytest','bbIpG','PSagf','WXPqc','KmVXA','MZxSZ','replace','Game_Battler_regenerateAll','#%1','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','onEraseBuffJS','%1\x20%2\x20%3','whRWN','cKbhY','KqxrK','fontSize','Costs','Name','active','onEraseStateGlobalJS','clamp','totalStateCategory','QiAlB','wJQHc','2fdYkgy','greater','addBuff','stateEraseJS','addPassiveStatesByPluginParameters','JVZeC','adjustItemWidthByShopStatus','skillEnableJS','mLKGP','drawItemStyleIconText','SkillsStatesCore','canClearState','allIcons','_battler','rgba(0,\x200,\x200,\x200)','Game_BattlerBase_states','POSITIVE','CheckVisibleSkillNotetags','EeWxU','Game_BattlerBase_meetsSkillConditions','getStateOrigin','filter','_stored_state-%1-color','yWShm','center','drawActorBuffRates','map','createTurnDisplaySprite','IconStypeMagic','uxmgR','LEXnp','actorId','VisuMZ_1_MainMenuCore','inBJd','Window_SkillList_maxCols','ShowJS','actions','gaugeRate','CheckVisibleSwitchNotetags','remove','CoreEngine','ShowTurns','normalColor','clearStateData','checkSkillConditionsNotetags','ParseStateNotetags','JuYQr','pvEmO','isRightInputMode','xwIre'];_0x2977=function(){return _0x32e27f;};return _0x2977();}var label=_0xc329de(0x383),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x5c9389){const _0x5e1617=_0xc329de;return _0x5c9389[_0x5e1617(0x487)]&&_0x5c9389[_0x5e1617(0x228)][_0x5e1617(0x358)]('['+label+']');})[0x0];function _0x5177(_0x3809f3,_0x2e2730){const _0x297755=_0x2977();return _0x5177=function(_0x517733,_0x1233f3){_0x517733=_0x517733-0x1c6;let _0x5ae185=_0x297755[_0x517733];return _0x5ae185;},_0x5177(_0x3809f3,_0x2e2730);}VisuMZ[label]['Settings']=VisuMZ[label][_0xc329de(0x43a)]||{},VisuMZ[_0xc329de(0x499)]=function(_0x4aff55,_0x284069){const _0x115613=_0xc329de;for(const _0x4db5fe in _0x284069){if('XuPOA'!==_0x115613(0x295)){if(_0x4db5fe['match'](/(.*):(.*)/i)){if(_0x115613(0x3fc)==='Dllnl'){if(!_0x38d004[_0x115613(0x4f1)](_0x36af5d))return!![];}else{const _0x56980d=String(RegExp['$1']),_0x1c9d67=String(RegExp['$2'])[_0x115613(0x4ad)]()[_0x115613(0x259)]();let _0x27bf91,_0x43b9e5,_0x25b558;switch(_0x1c9d67){case _0x115613(0x4c2):_0x27bf91=_0x284069[_0x4db5fe]!==''?Number(_0x284069[_0x4db5fe]):0x0;break;case _0x115613(0x44d):_0x43b9e5=_0x284069[_0x4db5fe]!==''?JSON[_0x115613(0x45d)](_0x284069[_0x4db5fe]):[],_0x27bf91=_0x43b9e5[_0x115613(0x393)](_0x9d553a=>Number(_0x9d553a));break;case _0x115613(0x4b7):_0x27bf91=_0x284069[_0x4db5fe]!==''?eval(_0x284069[_0x4db5fe]):null;break;case'ARRAYEVAL':_0x43b9e5=_0x284069[_0x4db5fe]!==''?JSON[_0x115613(0x45d)](_0x284069[_0x4db5fe]):[],_0x27bf91=_0x43b9e5[_0x115613(0x393)](_0x27579f=>eval(_0x27579f));break;case'JSON':_0x27bf91=_0x284069[_0x4db5fe]!==''?JSON[_0x115613(0x45d)](_0x284069[_0x4db5fe]):'';break;case _0x115613(0x1e1):_0x43b9e5=_0x284069[_0x4db5fe]!==''?JSON[_0x115613(0x45d)](_0x284069[_0x4db5fe]):[],_0x27bf91=_0x43b9e5[_0x115613(0x393)](_0x169579=>JSON[_0x115613(0x45d)](_0x169579));break;case _0x115613(0x408):_0x27bf91=_0x284069[_0x4db5fe]!==''?new Function(JSON[_0x115613(0x45d)](_0x284069[_0x4db5fe])):new Function(_0x115613(0x3c0));break;case _0x115613(0x3cc):_0x43b9e5=_0x284069[_0x4db5fe]!==''?JSON[_0x115613(0x45d)](_0x284069[_0x4db5fe]):[],_0x27bf91=_0x43b9e5[_0x115613(0x393)](_0x35b906=>new Function(JSON[_0x115613(0x45d)](_0x35b906)));break;case _0x115613(0x210):_0x27bf91=_0x284069[_0x4db5fe]!==''?String(_0x284069[_0x4db5fe]):'';break;case'ARRAYSTR':_0x43b9e5=_0x284069[_0x4db5fe]!==''?JSON[_0x115613(0x45d)](_0x284069[_0x4db5fe]):[],_0x27bf91=_0x43b9e5['map'](_0x27caec=>String(_0x27caec));break;case _0x115613(0x291):_0x25b558=_0x284069[_0x4db5fe]!==''?JSON[_0x115613(0x45d)](_0x284069[_0x4db5fe]):{},_0x4aff55[_0x56980d]={},VisuMZ['ConvertParams'](_0x4aff55[_0x56980d],_0x25b558);continue;case'ARRAYSTRUCT':_0x43b9e5=_0x284069[_0x4db5fe]!==''?JSON['parse'](_0x284069[_0x4db5fe]):[],_0x27bf91=_0x43b9e5[_0x115613(0x393)](_0x1342b3=>VisuMZ[_0x115613(0x499)]({},JSON[_0x115613(0x45d)](_0x1342b3)));break;default:continue;}_0x4aff55[_0x56980d]=_0x27bf91;}}}else return _0x541d1a[_0x115613(0x383)][_0x115613(0x43a)][_0x115613(0x2af)][_0x115613(0x22f)];}return _0x4aff55;},(_0x56a83e=>{const _0x430d47=_0xc329de,_0x361f6b=_0x56a83e[_0x430d47(0x3f4)];for(const _0x1064ce of dependencies){if(_0x430d47(0x357)!==_0x430d47(0x27c)){if(!Imported[_0x1064ce]){alert(_0x430d47(0x2ad)[_0x430d47(0x3bb)](_0x361f6b,_0x1064ce)),SceneManager[_0x430d47(0x344)]();break;}}else{if(typeof _0x28f0e7!=='number')_0x484fb8=_0x4687a2['id'];return this[_0x430d47(0x264)]=this[_0x430d47(0x264)]||{},this[_0x430d47(0x264)][_0xe26a5]===_0x1774b1&&(this['_stateDisplay'][_0x31e18d]=''),this['_stateDisplay'][_0x20d72e];}}const _0x2cccdc=_0x56a83e[_0x430d47(0x228)];if(_0x2cccdc[_0x430d47(0x213)](/\[Version[ ](.*?)\]/i)){if(_0x430d47(0x421)==='cuGDu'){const _0x2141e8=Number(RegExp['$1']);if(_0x2141e8!==VisuMZ[label][_0x430d47(0x48f)]){if(_0x430d47(0x339)===_0x430d47(0x4ff)){if(!_0xb3cb96[_0x430d47(0x4f1)](_0x7606c7))return![];}else alert(_0x430d47(0x36a)[_0x430d47(0x3bb)](_0x361f6b,_0x2141e8)),SceneManager[_0x430d47(0x344)]();}}else return this[_0x430d47(0x335)]();}if(_0x2cccdc[_0x430d47(0x213)](/\[Tier[ ](\d+)\]/i)){if('ErtCx'===_0x430d47(0x3b9))return this['_buffs'][_0x33d1ab]===_0x3052a5[_0x430d47(0x383)][_0x430d47(0x43a)][_0x430d47(0x3bf)]['StackBuffMax'];else{const _0x4d03cc=Number(RegExp['$1']);_0x4d03cc<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x430d47(0x3bb)](_0x361f6b,_0x4d03cc,tier)),SceneManager['exit']()):tier=Math['max'](_0x4d03cc,tier);}}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x56a83e[_0x430d47(0x355)]);})(pluginData),VisuMZ[_0xc329de(0x383)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0xc329de(0x305)][_0xc329de(0x350)],Scene_Boot['prototype'][_0xc329de(0x350)]=function(){const _0x393119=_0xc329de;VisuMZ[_0x393119(0x383)][_0x393119(0x293)][_0x393119(0x211)](this),this[_0x393119(0x2c1)](),VisuMZ[_0x393119(0x383)][_0x393119(0x1e5)]();},Scene_Boot['prototype'][_0xc329de(0x2c1)]=function(){const _0x34eeb8=_0xc329de;if(VisuMZ[_0x34eeb8(0x455)])return;this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](),this[_0x34eeb8(0x4a0)]();},Scene_Boot[_0xc329de(0x305)][_0xc329de(0x4b4)]=function(){const _0x23a07c=_0xc329de;for(const _0x2ae485 of $dataSkills){if(!_0x2ae485)continue;VisuMZ[_0x23a07c(0x383)][_0x23a07c(0x2da)](_0x2ae485),VisuMZ[_0x23a07c(0x383)][_0x23a07c(0x478)](_0x2ae485);}},Scene_Boot['prototype']['process_VisuMZ_SkillsStatesCore_State_Notetags']=function(){const _0x2afcb3=_0xc329de;for(const _0x575239 of $dataStates){if(_0x2afcb3(0x2ef)!==_0x2afcb3(0x2ef)){const _0x5d8ca8=_0x3ddaae[_0x2afcb3(0x405)]['call'](this,_0x57d27b);if(!_0x22c705[_0x2afcb3(0x415)][_0x2afcb3(0x211)](this,_0x590a1a,_0x5d8ca8))return![];}else{if(!_0x575239)continue;VisuMZ['SkillsStatesCore']['Parse_Notetags_State_Category'](_0x575239),VisuMZ[_0x2afcb3(0x383)]['Parse_Notetags_State_PassiveJS'](_0x575239),VisuMZ[_0x2afcb3(0x383)][_0x2afcb3(0x26d)](_0x575239),VisuMZ[_0x2afcb3(0x383)][_0x2afcb3(0x246)](_0x575239);}}},VisuMZ[_0xc329de(0x383)]['ParseSkillNotetags']=VisuMZ['ParseSkillNotetags'],VisuMZ[_0xc329de(0x319)]=function(_0x1523ff){const _0x31f946=_0xc329de;VisuMZ[_0x31f946(0x383)][_0x31f946(0x319)][_0x31f946(0x211)](this,_0x1523ff),VisuMZ[_0x31f946(0x383)][_0x31f946(0x2da)](_0x1523ff),VisuMZ[_0x31f946(0x383)][_0x31f946(0x478)](_0x1523ff);},VisuMZ[_0xc329de(0x383)]['ParseStateNotetags']=VisuMZ[_0xc329de(0x3a6)],VisuMZ[_0xc329de(0x3a6)]=function(_0x4c8f15){const _0x54c450=_0xc329de;VisuMZ['SkillsStatesCore']['ParseStateNotetags'][_0x54c450(0x211)](this,_0x4c8f15),VisuMZ[_0x54c450(0x383)]['Parse_Notetags_State_Category'](_0x4c8f15),VisuMZ[_0x54c450(0x383)][_0x54c450(0x33b)](_0x4c8f15),VisuMZ[_0x54c450(0x383)]['Parse_Notetags_State_SlipEffectJS'](_0x4c8f15),VisuMZ['SkillsStatesCore'][_0x54c450(0x246)](_0x4c8f15);},VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_Cost']=function(_0x169692){const _0x18db18=_0xc329de,_0x5baf34=_0x169692['note'];_0x5baf34['match'](/<MP COST:[ ](\d+)>/i)&&(_0x169692[_0x18db18(0x2fb)]=Number(RegExp['$1']));if(_0x5baf34[_0x18db18(0x213)](/<TP COST:[ ](\d+)>/i)){if('oKTaN'!==_0x18db18(0x41b))_0x169692[_0x18db18(0x2e9)]=Number(RegExp['$1']);else{if(!_0x4b5c53[_0x18db18(0x401)](_0xe1a1d4))return![];}}},VisuMZ[_0xc329de(0x383)][_0xc329de(0x380)]={},VisuMZ[_0xc329de(0x383)][_0xc329de(0x21f)]={},VisuMZ['SkillsStatesCore'][_0xc329de(0x478)]=function(_0x49f059){const _0x4921a5=_0xc329de,_0x14d0e4=_0x49f059[_0x4921a5(0x253)];if(_0x14d0e4[_0x4921a5(0x213)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x581ef5=String(RegExp['$1']),_0x1d127f='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x4921a5(0x3bb)](_0x581ef5);VisuMZ[_0x4921a5(0x383)][_0x4921a5(0x380)][_0x49f059['id']]=new Function(_0x4921a5(0x26b),_0x1d127f);}if(_0x14d0e4['match'](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){if(_0x4921a5(0x3fb)!==_0x4921a5(0x412)){const _0x5427ab=String(RegExp['$1']),_0xaebdf5=_0x4921a5(0x248)[_0x4921a5(0x3bb)](_0x5427ab);VisuMZ['SkillsStatesCore']['skillVisibleJS'][_0x49f059['id']]=new Function(_0x4921a5(0x26b),_0xaebdf5);}else{const _0x18638c=this[_0x4921a5(0x483)](_0x9a20d7['id'],_0x4921a5(0x404))||0x0,_0x5c4174=-this['maxSlipDamage'](),_0x520c17=_0x5ca1ba[_0x4921a5(0x313)](_0x18638c,_0x5c4174);if(_0x520c17!==0x0){const _0x1f550b=this[_0x4921a5(0x46e)][_0x4921a5(0x3e8)]||0x0;this[_0x4921a5(0x30f)](_0x520c17),this[_0x4921a5(0x46e)][_0x4921a5(0x3e8)]+=_0x1f550b;}const _0x19a3fb=this[_0x4921a5(0x483)](_0x4bc44e['id'],_0x4921a5(0x434))||0x0;if(_0x19a3fb!==0x0){const _0x4faf4f=this[_0x4921a5(0x46e)]['mpDamage']||0x0;this['gainMp'](_0x19a3fb),this[_0x4921a5(0x46e)][_0x4921a5(0x23f)]+=_0x4faf4f;}const _0x2d07f3=this[_0x4921a5(0x483)](_0x4149e4['id'],_0x4921a5(0x457))||0x0;_0x2d07f3!==0x0&&this[_0x4921a5(0x347)](_0x2d07f3);}}},VisuMZ['SkillsStatesCore']['Parse_Notetags_State_Category']=function(_0x215910){const _0x34699d=_0xc329de;_0x215910[_0x34699d(0x1cc)]=[_0x34699d(0x47e),_0x34699d(0x2a4)];const _0x34b870=_0x215910[_0x34699d(0x253)],_0x1be1ca=_0x34b870[_0x34699d(0x213)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x1be1ca){if(_0x34699d(0x377)===_0x34699d(0x377))for(const _0x5a2688 of _0x1be1ca){_0x5a2688[_0x34699d(0x213)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x497486=String(RegExp['$1'])[_0x34699d(0x4ad)]()[_0x34699d(0x259)]()['split'](',');for(const _0x134fa1 of _0x497486){if(_0x34699d(0x2ab)!==_0x34699d(0x2ab))for(const _0x1dc561 of _0x17386a[_0x34699d(0x292)]()){if(_0x1dc561)_0x1dc561[_0x34699d(0x494)]();}else _0x215910[_0x34699d(0x1cc)][_0x34699d(0x34e)](_0x134fa1[_0x34699d(0x259)]());}}else{const _0x585dfc=_0x47d18e['SkillsStatesCore'][_0x34699d(0x43a)]['PassiveStates'][_0x34699d(0x2b6)];this['_cache'][_0x34699d(0x31f)]=this[_0x34699d(0x4f8)][_0x34699d(0x31f)][_0x34699d(0x349)](_0x585dfc);}}if(_0x34b870[_0x34699d(0x213)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x34699d(0x1d7)===_0x34699d(0x1d7)){const _0x4c8fb2=RegExp['$1'][_0x34699d(0x3b2)](/[\r\n]+/);for(const _0x217cc0 of _0x4c8fb2){if(_0x34699d(0x2be)===_0x34699d(0x307)){const _0xbf6988=_0x1e6d7f[_0x34699d(0x45d)]('['+_0x2f0a4f['$1'][_0x34699d(0x213)](/\d+/g)+']');for(const _0x480cd3 of _0xbf6988){if(_0x2fa849[_0x34699d(0x4f1)](_0x480cd3))return!![];}return![];}else _0x215910[_0x34699d(0x1cc)][_0x34699d(0x34e)](_0x217cc0[_0x34699d(0x4ad)]()[_0x34699d(0x259)]());}}else{_0x478ebc['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x109d2b=_0xfc819c[_0x34699d(0x1f7)](_0x1c9071(_0x16bea1['$1'])[_0x34699d(0x4ad)]()),_0x109606=_0x4d9224(_0x7f9ef1['$2']);_0x109d2b>=0x0&&(_0x2721db['addBuffTurns'](_0x109d2b,_0x109606),this[_0x34699d(0x216)](_0x4b97f4));}}_0x34b870['match'](/<POSITIVE STATE>/i)&&('ZfDAf'===_0x34699d(0x1d3)?_0x215910[_0x34699d(0x1cc)][_0x34699d(0x34e)](_0x34699d(0x389)):this[_0x34699d(0x2db)][_0x34699d(0x3d4)](_0x4da0f9,_0x24bb16,_0x310970,_0x246e33,this['contents'][_0x34699d(0x4ac)],_0x157a43)),_0x34b870[_0x34699d(0x213)](/<NEGATIVE STATE>/i)&&_0x215910[_0x34699d(0x1cc)][_0x34699d(0x34e)](_0x34699d(0x304));},VisuMZ[_0xc329de(0x383)][_0xc329de(0x278)]={},VisuMZ[_0xc329de(0x383)][_0xc329de(0x33b)]=function(_0x56b295){const _0x345a2b=_0xc329de,_0x5d9145=_0x56b295[_0x345a2b(0x253)];if(_0x5d9145[_0x345a2b(0x213)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x56808f=String(RegExp['$1']),_0x5bfb4e=_0x345a2b(0x24d)['format'](_0x56808f);VisuMZ[_0x345a2b(0x383)][_0x345a2b(0x278)][_0x56b295['id']]=new Function(_0x345a2b(0x23a),_0x5bfb4e);}},VisuMZ[_0xc329de(0x383)][_0xc329de(0x410)]={},VisuMZ[_0xc329de(0x383)]['stateHpSlipHealJS']={},VisuMZ[_0xc329de(0x383)][_0xc329de(0x225)]={},VisuMZ[_0xc329de(0x383)][_0xc329de(0x461)]={},VisuMZ['SkillsStatesCore']['stateTpSlipDamageJS']={},VisuMZ['SkillsStatesCore'][_0xc329de(0x2ee)]={},VisuMZ[_0xc329de(0x383)][_0xc329de(0x26d)]=function(_0xff15a0){const _0x49d969=_0xc329de,_0x378489=_0xff15a0[_0x49d969(0x253)],_0x4d6877=_0x49d969(0x4a5);if(_0x378489['match'](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x36c04a=String(RegExp['$1']),_0x873c5a=_0x4d6877[_0x49d969(0x3bb)](_0x36c04a,_0x49d969(0x2aa),-0x1,'slipHp');VisuMZ[_0x49d969(0x383)]['stateHpSlipDamageJS'][_0xff15a0['id']]=new Function(_0x49d969(0x3f6),_0x873c5a);}else{if(_0x378489[_0x49d969(0x213)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){if(_0x49d969(0x3ac)===_0x49d969(0x3ac)){const _0x3bb296=String(RegExp['$1']),_0x14d7e5=_0x4d6877['format'](_0x3bb296,_0x49d969(0x28e),0x1,_0x49d969(0x404));VisuMZ[_0x49d969(0x383)]['stateHpSlipHealJS'][_0xff15a0['id']]=new Function('stateId',_0x14d7e5);}else _0x2c943b[_0x49d969(0x1cc)][_0x49d969(0x34e)](_0x49d969(0x304));}}if(_0x378489[_0x49d969(0x213)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x549b26=String(RegExp['$1']),_0x4b4e53=_0x4d6877['format'](_0x549b26,_0x49d969(0x2aa),-0x1,_0x49d969(0x434));VisuMZ['SkillsStatesCore']['stateMpSlipDamageJS'][_0xff15a0['id']]=new Function(_0x49d969(0x3f6),_0x4b4e53);}else{if(_0x378489[_0x49d969(0x213)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){if(_0x49d969(0x4e9)!=='DEAtc')return _0x3c1447['mainFontFace']();else{const _0x27241b=String(RegExp['$1']),_0x389c1d=_0x4d6877[_0x49d969(0x3bb)](_0x27241b,_0x49d969(0x28e),0x1,_0x49d969(0x434));VisuMZ[_0x49d969(0x383)][_0x49d969(0x461)][_0xff15a0['id']]=new Function(_0x49d969(0x3f6),_0x389c1d);}}}if(_0x378489[_0x49d969(0x213)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){if(_0x49d969(0x364)===_0x49d969(0x2d2)){if(this[_0x49d969(0x2bf)]||this[_0x49d969(0x1d5)])return;const _0x350513=_0xe77137['SkillsStatesCore'][_0x49d969(0x37c)];if(_0x350513[_0x5c3265])_0x350513[_0x4ef1f9][_0x49d969(0x211)](this,_0x4fdc66);}else{const _0x8f7882=String(RegExp['$1']),_0x2522fa=_0x4d6877[_0x49d969(0x3bb)](_0x8f7882,_0x49d969(0x2aa),-0x1,_0x49d969(0x457));VisuMZ[_0x49d969(0x383)][_0x49d969(0x1cb)][_0xff15a0['id']]=new Function(_0x49d969(0x3f6),_0x2522fa);}}else{if(_0x378489[_0x49d969(0x213)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){if(_0x49d969(0x34d)!==_0x49d969(0x1c7)){const _0x3e7e65=String(RegExp['$1']),_0x24b458=_0x4d6877[_0x49d969(0x3bb)](_0x3e7e65,_0x49d969(0x28e),0x1,_0x49d969(0x457));VisuMZ[_0x49d969(0x383)][_0x49d969(0x2ee)][_0xff15a0['id']]=new Function(_0x49d969(0x3f6),_0x24b458);}else{if(_0x2e8e19[_0x49d969(0x4f1)](_0x35bffa))return!![];}}}},VisuMZ[_0xc329de(0x383)][_0xc329de(0x3c6)]={},VisuMZ['SkillsStatesCore'][_0xc329de(0x37c)]={},VisuMZ[_0xc329de(0x383)][_0xc329de(0x23e)]={},VisuMZ[_0xc329de(0x383)][_0xc329de(0x246)]=function(_0x14a8d9){const _0x3b3568=_0xc329de,_0x4936c4=_0x14a8d9[_0x3b3568(0x253)],_0x313174=_0x3b3568(0x28d);if(_0x4936c4['match'](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x397542=String(RegExp['$1']),_0x3f06bb=_0x313174[_0x3b3568(0x3bb)](_0x397542);VisuMZ[_0x3b3568(0x383)]['stateAddJS'][_0x14a8d9['id']]=new Function(_0x3b3568(0x3f6),_0x3f06bb);}if(_0x4936c4['match'](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x226204=String(RegExp['$1']),_0x3838a6=_0x313174['format'](_0x226204);VisuMZ[_0x3b3568(0x383)]['stateEraseJS'][_0x14a8d9['id']]=new Function(_0x3b3568(0x3f6),_0x3838a6);}if(_0x4936c4[_0x3b3568(0x213)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x2224c3=String(RegExp['$1']),_0x311a1b=_0x313174[_0x3b3568(0x3bb)](_0x2224c3);VisuMZ[_0x3b3568(0x383)][_0x3b3568(0x23e)][_0x14a8d9['id']]=new Function(_0x3b3568(0x3f6),_0x311a1b);}},VisuMZ[_0xc329de(0x383)]['CheckIncompatibleStates']=function(){const _0xe07931=_0xc329de;if(!VisuMZ[_0xe07931(0x383)][_0xe07931(0x43a)]['States'][_0xe07931(0x2ce)])return;for(const _0x376ca7 of $dataStates){if(!_0x376ca7)continue;_0x376ca7[_0xe07931(0x44a)]===0x4&&_0x376ca7[_0xe07931(0x3f5)]===0x1&&(_0x376ca7[_0xe07931(0x3f5)]=0x2);}},DataManager['getClassIdWithName']=function(_0x42904c){const _0xcc393f=_0xc329de;_0x42904c=_0x42904c['toUpperCase']()[_0xcc393f(0x259)](),this[_0xcc393f(0x4f2)]=this['_classIDs']||{};if(this[_0xcc393f(0x4f2)][_0x42904c])return this[_0xcc393f(0x4f2)][_0x42904c];for(const _0x3128c0 of $dataClasses){if(!_0x3128c0)continue;let _0x3536cd=_0x3128c0[_0xcc393f(0x3f4)];_0x3536cd=_0x3536cd[_0xcc393f(0x367)](/\x1I\[(\d+)\]/gi,''),_0x3536cd=_0x3536cd[_0xcc393f(0x367)](/\\I\[(\d+)\]/gi,''),this[_0xcc393f(0x4f2)][_0x3536cd[_0xcc393f(0x4ad)]()['trim']()]=_0x3128c0['id'];}return this[_0xcc393f(0x4f2)][_0x42904c]||0x0;},DataManager['getSkillTypes']=function(_0x573687){const _0xed48c5=_0xc329de;this[_0xed48c5(0x440)]=this[_0xed48c5(0x440)]||{};if(this[_0xed48c5(0x440)][_0x573687['id']])return this[_0xed48c5(0x440)][_0x573687['id']];this['_stypeIDs'][_0x573687['id']]=[_0x573687[_0xed48c5(0x2f9)]];if(_0x573687[_0xed48c5(0x253)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5eb695=JSON['parse']('['+RegExp['$1'][_0xed48c5(0x213)](/\d+/g)+']');this[_0xed48c5(0x440)][_0x573687['id']]=this[_0xed48c5(0x440)][_0x573687['id']][_0xed48c5(0x349)](_0x5eb695);}else{if(_0x573687[_0xed48c5(0x253)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x531329=RegExp['$1'][_0xed48c5(0x3b2)](',');for(const _0x371e09 of _0x531329){const _0x22bb2c=DataManager['getStypeIdWithName'](_0x371e09);if(_0x22bb2c)this[_0xed48c5(0x440)][_0x573687['id']][_0xed48c5(0x34e)](_0x22bb2c);}}}return this[_0xed48c5(0x440)][_0x573687['id']];},DataManager[_0xc329de(0x289)]=function(_0x190796){const _0x1c46a9=_0xc329de;_0x190796=_0x190796[_0x1c46a9(0x4ad)]()[_0x1c46a9(0x259)](),this[_0x1c46a9(0x440)]=this[_0x1c46a9(0x440)]||{};if(this['_stypeIDs'][_0x190796])return this['_stypeIDs'][_0x190796];for(let _0x1227e6=0x1;_0x1227e6<0x64;_0x1227e6++){if(!$dataSystem[_0x1c46a9(0x3d6)][_0x1227e6])continue;let _0x3ff6c8=$dataSystem['skillTypes'][_0x1227e6][_0x1c46a9(0x4ad)]()['trim']();_0x3ff6c8=_0x3ff6c8[_0x1c46a9(0x367)](/\x1I\[(\d+)\]/gi,''),_0x3ff6c8=_0x3ff6c8[_0x1c46a9(0x367)](/\\I\[(\d+)\]/gi,''),this[_0x1c46a9(0x440)][_0x3ff6c8]=_0x1227e6;}return this[_0x1c46a9(0x440)][_0x190796]||0x0;},DataManager[_0xc329de(0x471)]=function(_0x127b85){const _0x1fb577=_0xc329de;_0x127b85=_0x127b85['toUpperCase']()[_0x1fb577(0x259)](),this[_0x1fb577(0x35f)]=this['_skillIDs']||{};if(this['_skillIDs'][_0x127b85])return this[_0x1fb577(0x35f)][_0x127b85];for(const _0x2787b1 of $dataSkills){if(!_0x2787b1)continue;this['_skillIDs'][_0x2787b1[_0x1fb577(0x3f4)][_0x1fb577(0x4ad)]()['trim']()]=_0x2787b1['id'];}return this[_0x1fb577(0x35f)][_0x127b85]||0x0;},DataManager[_0xc329de(0x4b9)]=function(_0x52f6bb){const _0x280c6e=_0xc329de;_0x52f6bb=_0x52f6bb[_0x280c6e(0x4ad)]()[_0x280c6e(0x259)](),this[_0x280c6e(0x353)]=this[_0x280c6e(0x353)]||{};if(this['_stateIDs'][_0x52f6bb])return this[_0x280c6e(0x353)][_0x52f6bb];for(const _0x4a78d2 of $dataStates){if(_0x280c6e(0x4d3)!==_0x280c6e(0x4f6)){if(!_0x4a78d2)continue;this['_stateIDs'][_0x4a78d2[_0x280c6e(0x3f4)][_0x280c6e(0x4ad)]()[_0x280c6e(0x259)]()]=_0x4a78d2['id'];}else return _0x1849c4[_0x280c6e(0x33d)]()[_0x2507bf(_0x26095c['$1'])];}return this['_stateIDs'][_0x52f6bb]||0x0;},DataManager['stateMaximumTurns']=function(_0x3ce2c8){const _0x17ba35=_0xc329de;this[_0x17ba35(0x3d2)]=this[_0x17ba35(0x3d2)]||{};if(this[_0x17ba35(0x3d2)][_0x3ce2c8])return this['_stateMaxTurns'][_0x3ce2c8];if($dataStates[_0x3ce2c8][_0x17ba35(0x253)][_0x17ba35(0x213)](/<MAX TURNS:[ ](\d+)>/i)){if(_0x17ba35(0x356)==='sAPeI')this['_stateMaxTurns'][_0x3ce2c8]=Number(RegExp['$1']);else return![];}else{if(_0x17ba35(0x327)!==_0x17ba35(0x327)){const _0xff1508=_0x35fa01[_0x17ba35(0x45d)]('['+_0x47ac92['$1'][_0x17ba35(0x213)](/\d+/g)+']');for(const _0x440794 of _0xff1508){if(!_0xc0f7f[_0x17ba35(0x4f1)](_0x440794))return!![];}return![];}else this[_0x17ba35(0x3d2)][_0x3ce2c8]=VisuMZ[_0x17ba35(0x383)][_0x17ba35(0x43a)]['States']['MaxTurns'];}return this['_stateMaxTurns'][_0x3ce2c8];},ColorManager[_0xc329de(0x260)]=function(_0x45a147,_0x13225b){const _0x510653=_0xc329de;_0x13225b=String(_0x13225b),this[_0x510653(0x324)]=this[_0x510653(0x324)]||{};if(_0x13225b[_0x510653(0x213)](/#(.*)/i)){if(_0x510653(0x312)!=='YvmIS')this[_0x510653(0x324)][_0x45a147]=_0x510653(0x369)[_0x510653(0x3bb)](String(RegExp['$1']));else for(const _0x32bdf2 of _0x121b91){_0x32bdf2[_0x510653(0x213)](_0x53de50);const _0x3ed4c3=_0x5e920d(_0x1a66c2['$1'])[_0x510653(0x3b2)](',')[_0x510653(0x393)](_0x104212=>_0x487b34(_0x104212)[_0x510653(0x4ad)]()[_0x510653(0x259)]());_0x31618c=_0x13b98e[_0x510653(0x349)](_0x3ed4c3);}}else this[_0x510653(0x324)][_0x45a147]=this[_0x510653(0x49c)](Number(_0x13225b));return this[_0x510653(0x324)][_0x45a147];},ColorManager[_0xc329de(0x4d1)]=function(_0x4ab3cd){const _0x563c79=_0xc329de;return _0x4ab3cd=String(_0x4ab3cd),_0x4ab3cd[_0x563c79(0x213)](/#(.*)/i)?_0x563c79(0x369)[_0x563c79(0x3bb)](String(RegExp['$1'])):this[_0x563c79(0x49c)](Number(_0x4ab3cd));},ColorManager['stateColor']=function(_0x17cbda){const _0x4b01b7=_0xc329de;if(typeof _0x17cbda===_0x4b01b7(0x331))_0x17cbda=$dataStates[_0x17cbda];const _0x443a2c=_0x4b01b7(0x38f)[_0x4b01b7(0x3bb)](_0x17cbda['id']);this[_0x4b01b7(0x324)]=this[_0x4b01b7(0x324)]||{};if(this[_0x4b01b7(0x324)][_0x443a2c])return this[_0x4b01b7(0x324)][_0x443a2c];const _0xae142a=this['retrieveStateColor'](_0x17cbda);return this[_0x4b01b7(0x260)](_0x443a2c,_0xae142a);},ColorManager['retrieveStateColor']=function(_0x150060){const _0x4968b1=_0xc329de,_0x7ec556=_0x150060[_0x4968b1(0x253)];if(_0x7ec556[_0x4968b1(0x213)](/<TURN COLOR:[ ](.*)>/i)){if(_0x4968b1(0x4af)!=='WhSst')this['drawItemStyleIcon'](_0x4c0fff);else return String(RegExp['$1']);}else{if(_0x7ec556[_0x4968b1(0x213)](/<POSITIVE STATE>/i))return VisuMZ[_0x4968b1(0x383)][_0x4968b1(0x43a)][_0x4968b1(0x427)][_0x4968b1(0x2ca)];else{if(_0x7ec556[_0x4968b1(0x213)](/<NEGATIVE STATE>/i))return VisuMZ['SkillsStatesCore'][_0x4968b1(0x43a)][_0x4968b1(0x427)][_0x4968b1(0x299)];else{if('JhmOi'===_0x4968b1(0x3f2))this[_0x4968b1(0x347)](_0x552596);else return VisuMZ[_0x4968b1(0x383)][_0x4968b1(0x43a)][_0x4968b1(0x427)]['ColorNeutral'];}}}},ColorManager['buffColor']=function(){const _0x41313b=_0xc329de,_0x1f0455=_0x41313b(0x2fe);this['_colorCache']=this['_colorCache']||{};if(this[_0x41313b(0x324)][_0x1f0455])return this['_colorCache'][_0x1f0455];const _0x126211=VisuMZ[_0x41313b(0x383)][_0x41313b(0x43a)][_0x41313b(0x3bf)][_0x41313b(0x1f4)];return this[_0x41313b(0x260)](_0x1f0455,_0x126211);},ColorManager[_0xc329de(0x2f4)]=function(){const _0x219eb4=_0xc329de,_0x5e7fcb='_stored_debuffColor';this[_0x219eb4(0x324)]=this[_0x219eb4(0x324)]||{};if(this['_colorCache'][_0x5e7fcb])return this[_0x219eb4(0x324)][_0x5e7fcb];const _0x5c1db3=VisuMZ['SkillsStatesCore'][_0x219eb4(0x43a)][_0x219eb4(0x3bf)][_0x219eb4(0x333)];return this['getColorDataFromPluginParameters'](_0x5e7fcb,_0x5c1db3);},SceneManager['isSceneBattle']=function(){const _0x531b08=_0xc329de;return this['_scene']&&this[_0x531b08(0x443)][_0x531b08(0x489)]===Scene_Battle;},VisuMZ[_0xc329de(0x383)][_0xc329de(0x407)]=BattleManager['endAction'],BattleManager['endAction']=function(){const _0x2cf024=_0xc329de;this[_0x2cf024(0x236)](),VisuMZ[_0x2cf024(0x383)][_0x2cf024(0x407)][_0x2cf024(0x211)](this);},BattleManager[_0xc329de(0x236)]=function(){const _0x43dbdb=_0xc329de,_0x4b2e46=VisuMZ[_0x43dbdb(0x383)][_0x43dbdb(0x43a)][_0x43dbdb(0x427)];if(!_0x4b2e46)return;if(_0x4b2e46['ActionEndUpdate']===![])return;if(!this[_0x43dbdb(0x245)])return;this['_subject']['updateStatesActionEnd']();},Game_Battler[_0xc329de(0x305)][_0xc329de(0x236)]=function(){const _0x555366=_0xc329de;if(BattleManager['_phase']!==_0x555366(0x424))return;if(this['_lastStatesActionEndFrameCount']===Graphics['frameCount'])return;this[_0x555366(0x439)]=Graphics['frameCount'];for(const _0x4d0da8 of this[_0x555366(0x273)]){if('LrXII'!=='yfDJq'){const _0x1fe10a=$dataStates[_0x4d0da8];if(!_0x1fe10a)continue;if(_0x1fe10a[_0x555366(0x3f5)]!==0x1)continue;this[_0x555366(0x342)][_0x4d0da8]>0x0&&this[_0x555366(0x342)][_0x4d0da8]--;}else{let _0x3ad12a=this[_0x555366(0x2d3)]();return _0xe54ec2['VisuMZ_0_CoreEngine']&&this['useDigitGrouping']()&&(_0x3ad12a=_0x1356f0[_0x555366(0x229)](_0x3ad12a)),_0x3ad12a;}}this[_0x555366(0x2df)](0x1);},Game_BattlerBase[_0xc329de(0x305)]['updateStateTurns']=function(){const _0x35f8c0=_0xc329de,_0x502047=VisuMZ[_0x35f8c0(0x383)][_0x35f8c0(0x43a)][_0x35f8c0(0x427)];for(const _0x4d1362 of this['_states']){if(_0x35f8c0(0x2b7)!==_0x35f8c0(0x1f5)){const _0xa30d8f=$dataStates[_0x4d1362];if(_0x502047&&_0x502047[_0x35f8c0(0x2ce)]!==![]){if(_0x35f8c0(0x2cb)===_0x35f8c0(0x3a8)){let _0xc2e37f=0x0,_0x3720f8=0x0;if(_0x5437aa['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0xc2e37f=_0x54d2db(_0x1dd897['$1']),_0x3720f8=_0x5bc56e(_0xd8dc34['$2']);else _0x5ada3b['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0xc2e37f=_0x270d63[_0x35f8c0(0x4b9)](_0x1efe6e['$1']),_0x3720f8=_0x469646(_0x418e83['$2']));_0x3144d4[_0x35f8c0(0x417)](_0xc2e37f,_0x3720f8),this[_0x35f8c0(0x216)](_0x565c6f);}else{if(_0xa30d8f&&_0xa30d8f[_0x35f8c0(0x3f5)]===0x1)continue;}}this['_stateTurns'][_0x4d1362]>0x0&&this[_0x35f8c0(0x342)][_0x4d1362]--;}else this['drawTextEx'](_0x57e32d,_0x369705['x'],_0x54d855['y'],_0x1da184);}},VisuMZ['SkillsStatesCore'][_0xc329de(0x222)]=Game_Switches['prototype']['onChange'],Game_Switches[_0xc329de(0x305)]['onChange']=function(){const _0x14a7d9=_0xc329de;VisuMZ[_0x14a7d9(0x383)]['Game_Switches_onChange'][_0x14a7d9(0x211)](this);const _0x3fa986=VisuMZ[_0x14a7d9(0x383)][_0x14a7d9(0x43a)][_0x14a7d9(0x2c3)][_0x14a7d9(0x1ee)]??!![];if(!_0x3fa986)return;if(SceneManager['isSceneBattle']())for(const _0x161e8f of BattleManager[_0x14a7d9(0x292)]()){if(_0x161e8f)_0x161e8f[_0x14a7d9(0x494)]();}},VisuMZ[_0xc329de(0x383)][_0xc329de(0x47d)]=Game_Variables[_0xc329de(0x305)][_0xc329de(0x272)],Game_Variables[_0xc329de(0x305)][_0xc329de(0x272)]=function(){const _0x36a0bb=_0xc329de;VisuMZ['SkillsStatesCore'][_0x36a0bb(0x47d)][_0x36a0bb(0x211)](this);const _0x482ed2=VisuMZ[_0x36a0bb(0x383)][_0x36a0bb(0x43a)][_0x36a0bb(0x2c3)]['RefreshCacheVar']??!![];if(!_0x482ed2)return;if(SceneManager[_0x36a0bb(0x266)]()){if(_0x36a0bb(0x338)!==_0x36a0bb(0x470))for(const _0x5769c2 of BattleManager['allBattleMembers']()){if(_0x5769c2)_0x5769c2[_0x36a0bb(0x494)]();}else{if(_0x139efb&&this['canClearState'](_0x320acc))this[_0x36a0bb(0x491)](_0x41523c['id']);}}},VisuMZ['SkillsStatesCore']['Game_Action_applyItemUserEffect']=Game_Action[_0xc329de(0x305)][_0xc329de(0x321)],Game_Action[_0xc329de(0x305)][_0xc329de(0x321)]=function(_0xcb8ff9){const _0xce3903=_0xc329de;VisuMZ['SkillsStatesCore']['Game_Action_applyItemUserEffect']['call'](this,_0xcb8ff9),this[_0xce3903(0x33a)](_0xcb8ff9);},Game_Action[_0xc329de(0x305)]['applySkillsStatesCoreEffects']=function(_0x3a31b1){const _0x35722f=_0xc329de;this[_0x35722f(0x277)](_0x3a31b1),this[_0x35722f(0x3ed)](_0x3a31b1),this[_0x35722f(0x3c1)](_0x3a31b1),this[_0x35722f(0x4cf)](_0x3a31b1);},VisuMZ[_0xc329de(0x383)][_0xc329de(0x4cd)]=Game_Action[_0xc329de(0x305)][_0xc329de(0x329)],Game_Action[_0xc329de(0x305)][_0xc329de(0x329)]=function(_0x506119){const _0x2c8d5d=_0xc329de;if(this[_0x2c8d5d(0x3c9)](_0x506119))return!![];return VisuMZ[_0x2c8d5d(0x383)][_0x2c8d5d(0x4cd)][_0x2c8d5d(0x211)](this,_0x506119);},Game_Action[_0xc329de(0x305)][_0xc329de(0x3c9)]=function(_0x377837){const _0x35f5ec=_0xc329de;if(!this[_0x35f5ec(0x1d6)]())return;const _0x27113d=this[_0x35f5ec(0x1d6)]()[_0x35f5ec(0x253)];if(_0x27113d[_0x35f5ec(0x213)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){if(_0x35f5ec(0x40c)===_0x35f5ec(0x1f0)){if(!_0x23ba52[_0x35f5ec(0x4f1)](_0x2d6e5e))return!![];}else{const _0x53062e=String(RegExp['$1']);if(_0x377837[_0x35f5ec(0x32d)](_0x53062e))return!![];}}if(_0x27113d[_0x35f5ec(0x213)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x476138=Number(RegExp['$1']);if(_0x377837[_0x35f5ec(0x212)](_0x476138))return!![];}else{if(_0x27113d[_0x35f5ec(0x213)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){if(_0x35f5ec(0x2e2)!==_0x35f5ec(0x2e2))return _0x48c011[_0x35f5ec(0x383)][_0x35f5ec(0x206)][_0x35f5ec(0x211)](this);else{const _0x312a55=DataManager['getStateIdWithName'](RegExp['$1']);if(_0x377837['isStateAffected'](_0x312a55))return!![];}}}return![];},Game_Action[_0xc329de(0x305)][_0xc329de(0x277)]=function(_0x112f83){const _0x22d6d0=_0xc329de;if(_0x112f83[_0x22d6d0(0x298)]()['length']<=0x0)return;const _0x18ea44=this[_0x22d6d0(0x1d6)]()['note'];{const _0x13b0c1=_0x18ea44['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x13b0c1)for(const _0x16729e of _0x13b0c1){_0x16729e['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x204fdc=String(RegExp['$1']);_0x112f83[_0x22d6d0(0x2a7)](_0x204fdc);}}{const _0x51a584=_0x18ea44[_0x22d6d0(0x213)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x51a584){if(_0x22d6d0(0x3b4)==='OVWTW')return this['currentValueSkillsStatesCore']();else for(const _0x8010c7 of _0x51a584){if(_0x22d6d0(0x4d4)!==_0x22d6d0(0x3bd)){_0x8010c7['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x16736f=String(RegExp['$1']),_0xa9da2d=Number(RegExp['$2']);_0x112f83['removeStatesByCategory'](_0x16736f,_0xa9da2d);}else this[_0x22d6d0(0x4c1)]=this['_stateOrigin']||{},delete this['_stateOrigin'][_0x2078e2];}}}},Game_Action[_0xc329de(0x305)][_0xc329de(0x3ed)]=function(_0x487831){const _0x5dcc6d=_0xc329de,_0x4aebc3=this['item']()[_0x5dcc6d(0x253)],_0x4cd232=_0x4aebc3[_0x5dcc6d(0x213)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x4cd232)for(const _0x2e68ad of _0x4cd232){let _0x471658=0x0,_0x1ac55f=0x0;if(_0x2e68ad[_0x5dcc6d(0x213)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x471658=Number(RegExp['$1']),_0x1ac55f=Number(RegExp['$2']);else{if(_0x2e68ad[_0x5dcc6d(0x213)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)){if(_0x5dcc6d(0x363)!==_0x5dcc6d(0x363)){const _0x5e42c3=this[_0x5dcc6d(0x1ef)](_0x88741e);return _0x5e42c3[_0x5dcc6d(0x40b)];}else _0x471658=DataManager['getStateIdWithName'](RegExp['$1']),_0x1ac55f=Number(RegExp['$2']);}}_0x487831[_0x5dcc6d(0x417)](_0x471658,_0x1ac55f),this[_0x5dcc6d(0x216)](_0x487831);}const _0x1d0672=_0x4aebc3[_0x5dcc6d(0x213)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x1d0672){if(_0x5dcc6d(0x2d1)!==_0x5dcc6d(0x433))for(const _0x5bb156 of _0x1d0672){let _0x261cb4=0x0,_0x38ba70=0x0;if(_0x5bb156[_0x5dcc6d(0x213)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x5dcc6d(0x1dc)!==_0x5dcc6d(0x1dc)?_0x4c100a[_0x5dcc6d(0x2ec)]-=this[_0x5dcc6d(0x20e)]():(_0x261cb4=Number(RegExp['$1']),_0x38ba70=Number(RegExp['$2']));else _0x5bb156[_0x5dcc6d(0x213)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x261cb4=DataManager[_0x5dcc6d(0x4b9)](RegExp['$1']),_0x38ba70=Number(RegExp['$2']));_0x487831['addStateTurns'](_0x261cb4,_0x38ba70),this['makeSuccess'](_0x487831);}else this[_0x5dcc6d(0x45a)][_0x5dcc6d(0x332)](),this[_0x5dcc6d(0x467)]();}},Game_Action[_0xc329de(0x305)][_0xc329de(0x3c1)]=function(_0x3427de){const _0x22d4b5=_0xc329de,_0x3dc2c7=[_0x22d4b5(0x2dd),_0x22d4b5(0x422),_0x22d4b5(0x20a),_0x22d4b5(0x21c),_0x22d4b5(0x4a7),'MDF',_0x22d4b5(0x4a2),_0x22d4b5(0x3ea)],_0x6747ca=this[_0x22d4b5(0x1d6)]()[_0x22d4b5(0x253)],_0x42555d=_0x6747ca[_0x22d4b5(0x213)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x42555d){if(_0x22d4b5(0x2ea)!==_0x22d4b5(0x2ea))for(const _0x3ea763 of _0x2788c1){let _0x2103b6=0x0,_0x1b2b49=0x0;if(_0x3ea763['match'](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x2103b6=_0x33e42a(_0x1d0b2a['$1']),_0x1b2b49=_0x54ec51(_0x5b75d9['$2']);else _0x3ea763[_0x22d4b5(0x213)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x2103b6=_0x572d20[_0x22d4b5(0x4b9)](_0x27bd52['$1']),_0x1b2b49=_0x5c7fa4(_0x3728c4['$2']));_0x7b5e41['addStateTurns'](_0x2103b6,_0x1b2b49),this[_0x22d4b5(0x216)](_0x2fe532);}else for(const _0x65ada5 of _0x42555d){_0x65ada5[_0x22d4b5(0x213)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x4aa3f4=_0x3dc2c7['indexOf'](String(RegExp['$1'])[_0x22d4b5(0x4ad)]()),_0x2dfcbb=Number(RegExp['$2']);if(_0x4aa3f4>=0x0){if(_0x22d4b5(0x20f)===_0x22d4b5(0x20f))_0x3427de['setBuffTurns'](_0x4aa3f4,_0x2dfcbb),this[_0x22d4b5(0x216)](_0x3427de);else{if(_0x53dd26['Name']['toUpperCase']()==='TP')return _0x2b9b65[_0x22d4b5(0x405)][_0x22d4b5(0x211)](this,_0x113752);}}}}const _0x57d0c4=_0x6747ca[_0x22d4b5(0x213)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x57d0c4)for(const _0x14f846 of _0x42555d){_0x14f846[_0x22d4b5(0x213)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x27d136=_0x3dc2c7[_0x22d4b5(0x1f7)](String(RegExp['$1'])[_0x22d4b5(0x4ad)]()),_0x3678ba=Number(RegExp['$2']);_0x27d136>=0x0&&(_0x3427de[_0x22d4b5(0x2ed)](_0x27d136,_0x3678ba),this[_0x22d4b5(0x216)](_0x3427de));}},Game_Action['prototype'][_0xc329de(0x4cf)]=function(_0x480144){const _0xd528f9=_0xc329de,_0x5b3b8c=[_0xd528f9(0x2dd),_0xd528f9(0x422),_0xd528f9(0x20a),_0xd528f9(0x21c),_0xd528f9(0x4a7),_0xd528f9(0x1e2),_0xd528f9(0x4a2),'LUK'],_0x8ab85a=this['item']()[_0xd528f9(0x253)],_0x1e46b1=_0x8ab85a[_0xd528f9(0x213)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x1e46b1){if('EmOoW'===_0xd528f9(0x403)){const _0x4fe5c1=_0xa3df41[_0xd528f9(0x45d)]('['+_0x7b2c66['$1'][_0xd528f9(0x213)](/\d+/g)+']');this[_0xd528f9(0x440)][_0x36ebba['id']]=this[_0xd528f9(0x440)][_0x1ae868['id']]['concat'](_0x4fe5c1);}else for(const _0x4e47de of _0x1e46b1){if(_0xd528f9(0x3d5)!=='hGzFj'){_0x4e47de[_0xd528f9(0x213)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x2bedc2=_0x5b3b8c[_0xd528f9(0x1f7)](String(RegExp['$1'])[_0xd528f9(0x4ad)]()),_0x803415=Number(RegExp['$2']);_0x2bedc2>=0x0&&(_0x480144['setDebuffTurns'](_0x2bedc2,_0x803415),this[_0xd528f9(0x216)](_0x480144));}else{if(typeof _0x352a55!=='number')_0x12d7c9=_0x519169['id'];this[_0xd528f9(0x4c1)]=this[_0xd528f9(0x4c1)]||{},this[_0xd528f9(0x4c1)][_0x42ee61]=this[_0xd528f9(0x4c1)][_0x48b5c7]||_0xd528f9(0x48a);const _0x1f07ad=this[_0xd528f9(0x4c1)][_0x3c27c2];return this['getStateOriginByKey'](_0x1f07ad);}}}const _0x13ce1=_0x8ab85a[_0xd528f9(0x213)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x13ce1)for(const _0x3029ba of _0x1e46b1){_0x3029ba[_0xd528f9(0x213)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x92ed89=_0x5b3b8c['indexOf'](String(RegExp['$1'])[_0xd528f9(0x4ad)]()),_0x410a6e=Number(RegExp['$2']);_0x92ed89>=0x0&&(_0x480144[_0xd528f9(0x2ff)](_0x92ed89,_0x410a6e),this[_0xd528f9(0x216)](_0x480144));}},VisuMZ[_0xc329de(0x383)][_0xc329de(0x1e7)]=Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x3df)],Game_BattlerBase['prototype'][_0xc329de(0x3df)]=function(){const _0x265192=_0xc329de;this[_0x265192(0x4f8)]={},this[_0x265192(0x351)](),VisuMZ[_0x265192(0x383)]['Game_BattlerBase_initMembers'][_0x265192(0x211)](this);},Game_BattlerBase['prototype']['initMembersSkillsStatesCore']=function(){const _0x285eae=_0xc329de;this['_stateRetainType']='',this[_0x285eae(0x1e4)]={},this['_stateDisplay']={},this[_0x285eae(0x4c1)]={};},Game_BattlerBase['prototype'][_0xc329de(0x2c6)]=function(_0x59823f){const _0x520802=_0xc329de;return this[_0x520802(0x4f8)]=this[_0x520802(0x4f8)]||{},this[_0x520802(0x4f8)][_0x59823f]!==undefined;},VisuMZ[_0xc329de(0x383)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x494)],Game_BattlerBase[_0xc329de(0x305)]['refresh']=function(){const _0x2d6eba=_0xc329de;this['_cache']={},VisuMZ['SkillsStatesCore'][_0x2d6eba(0x33f)][_0x2d6eba(0x211)](this);},VisuMZ['SkillsStatesCore'][_0xc329de(0x45e)]=Game_BattlerBase['prototype'][_0xc329de(0x491)],Game_BattlerBase['prototype'][_0xc329de(0x491)]=function(_0x473792){const _0x4d7891=_0xc329de;let _0x3275e8=this['isStateAffected'](_0x473792);VisuMZ[_0x4d7891(0x383)][_0x4d7891(0x45e)][_0x4d7891(0x211)](this,_0x473792);if(_0x3275e8&&!this[_0x4d7891(0x212)](_0x473792))this[_0x4d7891(0x27f)](_0x473792);},Game_BattlerBase['prototype'][_0xc329de(0x27f)]=function(_0x2608b9){const _0x55540e=_0xc329de;this[_0x55540e(0x3a4)](_0x2608b9),this[_0x55540e(0x423)](_0x2608b9),this['clearStateOrigin'](_0x2608b9);},VisuMZ[_0xc329de(0x383)][_0xc329de(0x271)]=Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x474)],Game_BattlerBase[_0xc329de(0x305)]['resetStateCounts']=function(_0x33eced){const _0x48c553=_0xc329de,_0x1b0d7e=$dataStates[_0x33eced],_0x39e3b3=this[_0x48c553(0x4ce)](_0x33eced),_0x15c81f=this[_0x48c553(0x311)](_0x1b0d7e)[_0x48c553(0x4e7)]()['trim']();switch(_0x15c81f){case _0x48c553(0x48e):if(_0x39e3b3<=0x0)VisuMZ[_0x48c553(0x383)][_0x48c553(0x271)]['call'](this,_0x33eced);break;case'reset':VisuMZ[_0x48c553(0x383)][_0x48c553(0x271)][_0x48c553(0x211)](this,_0x33eced);break;case _0x48c553(0x37a):VisuMZ[_0x48c553(0x383)][_0x48c553(0x271)]['call'](this,_0x33eced),this[_0x48c553(0x342)][_0x33eced]=Math[_0x48c553(0x313)](this[_0x48c553(0x342)][_0x33eced],_0x39e3b3);break;case _0x48c553(0x3d3):VisuMZ[_0x48c553(0x383)]['Game_BattlerBase_resetStateCounts'][_0x48c553(0x211)](this,_0x33eced),this[_0x48c553(0x342)][_0x33eced]+=_0x39e3b3;break;default:VisuMZ[_0x48c553(0x383)][_0x48c553(0x271)]['call'](this,_0x33eced);break;}},Game_BattlerBase['prototype'][_0xc329de(0x311)]=function(_0x474b58){const _0x285c7d=_0xc329de,_0x5a64f9=_0x474b58[_0x285c7d(0x253)];return _0x5a64f9[_0x285c7d(0x213)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x285c7d(0x383)][_0x285c7d(0x43a)][_0x285c7d(0x427)][_0x285c7d(0x435)];},VisuMZ['SkillsStatesCore'][_0xc329de(0x4f3)]=Game_BattlerBase['prototype'][_0xc329de(0x4ed)],Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x4ed)]=function(_0x509b60,_0x22e3ae){const _0x4d0712=_0xc329de,_0x3a6ce2=VisuMZ['SkillsStatesCore'][_0x4d0712(0x43a)]['Buffs'][_0x4d0712(0x435)],_0x101951=this['buffTurns'](_0x509b60);switch(_0x3a6ce2){case'ignore':if(_0x101951<=0x0)this[_0x4d0712(0x310)][_0x509b60]=_0x22e3ae;break;case _0x4d0712(0x256):this[_0x4d0712(0x310)][_0x509b60]=_0x22e3ae;break;case _0x4d0712(0x37a):this['_buffTurns'][_0x509b60]=Math[_0x4d0712(0x313)](_0x101951,_0x22e3ae);break;case _0x4d0712(0x3d3):this[_0x4d0712(0x310)][_0x509b60]+=_0x22e3ae;break;default:VisuMZ[_0x4d0712(0x383)][_0x4d0712(0x4f3)][_0x4d0712(0x211)](this,_0x509b60,_0x22e3ae);break;}const _0x5d42d9=VisuMZ[_0x4d0712(0x383)][_0x4d0712(0x43a)][_0x4d0712(0x3bf)][_0x4d0712(0x4bd)];this[_0x4d0712(0x310)][_0x509b60]=this[_0x4d0712(0x310)][_0x509b60][_0x4d0712(0x375)](0x0,_0x5d42d9);},Game_BattlerBase[_0xc329de(0x305)]['isGroupDefeatStateAffected']=function(){const _0x431b83=_0xc329de;if(this[_0x431b83(0x4f8)]['groupDefeat']!==undefined)return this[_0x431b83(0x4f8)][_0x431b83(0x4b1)];this[_0x431b83(0x4f8)][_0x431b83(0x4b1)]=![];const _0x2617ac=this[_0x431b83(0x298)]();for(const _0x5aded3 of _0x2617ac){if(!_0x5aded3)continue;if(_0x5aded3['note'][_0x431b83(0x213)](/<GROUP DEFEAT>/i)){this[_0x431b83(0x4f8)][_0x431b83(0x4b1)]=!![];break;}}return this[_0x431b83(0x4f8)][_0x431b83(0x4b1)];},VisuMZ[_0xc329de(0x383)][_0xc329de(0x406)]=Game_BattlerBase['prototype']['clearStates'],Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x437)]=function(){const _0x590260=_0xc329de;this['getStateRetainType']()!==''?this[_0x590260(0x4f7)]():(VisuMZ[_0x590260(0x383)]['Game_BattlerBase_clearStates'][_0x590260(0x211)](this),this['initMembersSkillsStatesCore']());},Game_Actor['prototype'][_0xc329de(0x437)]=function(){const _0x5d998d=_0xc329de;this['_stateSteps']=this[_0x5d998d(0x255)]||{},Game_Battler['prototype'][_0x5d998d(0x437)][_0x5d998d(0x211)](this);},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x4f7)]=function(){const _0x255f55=_0xc329de,_0x6dcaa8=this[_0x255f55(0x298)]();for(const _0xf2dde9 of _0x6dcaa8){if(_0xf2dde9&&this[_0x255f55(0x384)](_0xf2dde9))this['eraseState'](_0xf2dde9['id']);}this[_0x255f55(0x4f8)]={};},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x384)]=function(_0x268c46){const _0x243132=_0xc329de,_0x5480e4=this[_0x243132(0x44f)]();if(_0x5480e4!==''){const _0x3a906d=_0x268c46[_0x243132(0x253)];if(_0x5480e4===_0x243132(0x28f)&&_0x3a906d[_0x243132(0x213)](/<NO DEATH CLEAR>/i))return![];if(_0x5480e4==='recover\x20all'&&_0x3a906d[_0x243132(0x213)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x243132(0x212)](_0x268c46['id']);},Game_BattlerBase['prototype']['getStateRetainType']=function(){const _0x44dbba=_0xc329de;return this[_0x44dbba(0x1d8)];},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x244)]=function(_0x3f6deb){this['_stateRetainType']=_0x3f6deb;},Game_BattlerBase['prototype']['clearStateRetainType']=function(){this['_stateRetainType']='';},VisuMZ[_0xc329de(0x383)][_0xc329de(0x2b2)]=Game_BattlerBase['prototype'][_0xc329de(0x1d2)],Game_BattlerBase['prototype'][_0xc329de(0x1d2)]=function(){const _0x5b5bf8=_0xc329de;this[_0x5b5bf8(0x244)](_0x5b5bf8(0x28f)),VisuMZ[_0x5b5bf8(0x383)][_0x5b5bf8(0x2b2)][_0x5b5bf8(0x211)](this),this[_0x5b5bf8(0x2cc)]();},VisuMZ[_0xc329de(0x383)]['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x4c8)],Game_BattlerBase[_0xc329de(0x305)]['recoverAll']=function(){const _0x1480b9=_0xc329de;this[_0x1480b9(0x244)]('recover\x20all'),VisuMZ['SkillsStatesCore'][_0x1480b9(0x498)]['call'](this),this[_0x1480b9(0x2cc)]();},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x35b)]=function(_0x1ee092){const _0x562e3d=_0xc329de;for(settings of VisuMZ[_0x562e3d(0x383)][_0x562e3d(0x43a)][_0x562e3d(0x371)]){const _0x52592e=settings[_0x562e3d(0x405)][_0x562e3d(0x211)](this,_0x1ee092);if(!settings[_0x562e3d(0x415)][_0x562e3d(0x211)](this,_0x1ee092,_0x52592e))return![];}return!![];},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x488)]=function(_0x2fc861){const _0x485ae5=_0xc329de;for(settings of VisuMZ['SkillsStatesCore']['Settings']['Costs']){if('pmzzx'==='zjNkr')this['_checkingVisuMzPassiveStateObjects']=!![],this['_cache'][_0x485ae5(0x31f)]=[],this[_0x485ae5(0x25d)](),this[_0x485ae5(0x420)](),this[_0x485ae5(0x37d)](),this['_checkingVisuMzPassiveStateObjects']=_0x5b6a7c;else{const _0x15b4c8=settings[_0x485ae5(0x405)][_0x485ae5(0x211)](this,_0x2fc861);settings['PayJS'][_0x485ae5(0x211)](this,_0x2fc861,_0x15b4c8);}}},VisuMZ[_0xc329de(0x383)][_0xc329de(0x38c)]=Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x268)],Game_BattlerBase['prototype']['meetsSkillConditions']=function(_0x1a78f8){const _0x565201=_0xc329de;if(!_0x1a78f8)return![];if(!VisuMZ['SkillsStatesCore'][_0x565201(0x38c)]['call'](this,_0x1a78f8))return![];if(!this['checkSkillConditionsNotetags'](_0x1a78f8))return![];if(!this['meetsSkillConditionsEnableJS'](_0x1a78f8))return![];if(!this[_0x565201(0x475)](_0x1a78f8))return![];return!![];},Game_BattlerBase['prototype'][_0xc329de(0x3a5)]=function(_0x57e54b){const _0x3d11cc=_0xc329de;if(!this[_0x3d11cc(0x1d4)](_0x57e54b))return![];return!![];},Game_BattlerBase[_0xc329de(0x305)]['checkSkillConditionsSwitchNotetags']=function(_0x221785){const _0x100278=_0xc329de,_0x1bbb05=_0x221785['note'];if(_0x1bbb05[_0x100278(0x213)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('nSKXC'!=='OjFge'){const _0xabbe1f=JSON[_0x100278(0x45d)]('['+RegExp['$1'][_0x100278(0x213)](/\d+/g)+']');for(const _0x2c2cb0 of _0xabbe1f){if(_0x100278(0x231)===_0x100278(0x31c)){const _0x2a3b66=_0x432336[_0x100278(0x45d)]('['+_0x5ce615['$1']['match'](/\d+/g)+']');for(const _0x2ee757 of _0x2a3b66){if(!_0x36bf08[_0x100278(0x4f1)](_0x2ee757))return!![];}return![];}else{if(!$gameSwitches['value'](_0x2c2cb0))return![];}}return!![];}else this[_0x100278(0x244)]('recover\x20all'),_0x2613db[_0x100278(0x383)][_0x100278(0x498)][_0x100278(0x211)](this),this[_0x100278(0x2cc)]();}if(_0x1bbb05[_0x100278(0x213)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x41a3b2=JSON['parse']('['+RegExp['$1'][_0x100278(0x213)](/\d+/g)+']');for(const _0x54ac8b of _0x41a3b2){if(_0x100278(0x309)!==_0x100278(0x4fe)){if(!$gameSwitches[_0x100278(0x4f1)](_0x54ac8b))return![];}else{const _0x5501b8=_0x135d6f[_0x100278(0x45d)]('['+_0x2c2cd8['$1']['match'](/\d+/g)+']');for(const _0x314d04 of _0x5501b8){if(!_0xdb209a[_0x100278(0x4f1)](_0x314d04))return![];}return!![];}}return!![];}if(_0x1bbb05[_0x100278(0x213)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4f08e4=JSON[_0x100278(0x45d)]('['+RegExp['$1'][_0x100278(0x213)](/\d+/g)+']');for(const _0x5a0676 of _0x4f08e4){if($gameSwitches[_0x100278(0x4f1)](_0x5a0676))return!![];}return![];}if(_0x1bbb05[_0x100278(0x213)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x29a997=JSON[_0x100278(0x45d)]('['+RegExp['$1'][_0x100278(0x213)](/\d+/g)+']');for(const _0x5aabbc of _0x29a997){if(!$gameSwitches[_0x100278(0x4f1)](_0x5aabbc))return!![];}return![];}if(_0x1bbb05[_0x100278(0x213)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x100278(0x2ba)!==_0x100278(0x2ba))_0x55fa45=_0x5deeaa(_0x14f050['$1']),_0xcde95c=_0x26c513(_0x3dd9d8['$2']);else{const _0x34080d=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1257c2 of _0x34080d){if(!$gameSwitches[_0x100278(0x4f1)](_0x1257c2))return!![];}return![];}}if(_0x1bbb05[_0x100278(0x213)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x100278(0x2a3)==='bteYw'){const _0x48cfcb=JSON[_0x100278(0x45d)]('['+RegExp['$1'][_0x100278(0x213)](/\d+/g)+']');for(const _0x27bfbb of _0x48cfcb){if($gameSwitches['value'](_0x27bfbb))return![];}return!![];}else _0x4f238a[_0x100278(0x383)][_0x100278(0x4ef)][_0x100278(0x211)](this,_0x2c6371),this[_0x100278(0x4f8)]={};}return!![];},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x336)]=function(_0x3700cb){const _0x396e99=_0xc329de,_0x2dc57e=_0x3700cb['note'],_0x52f49f=VisuMZ[_0x396e99(0x383)][_0x396e99(0x380)];return _0x52f49f[_0x3700cb['id']]?_0x396e99(0x430)===_0x396e99(0x281)?this[_0x396e99(0x1fb)]()[_0x396e99(0x213)](/RIGHT/i):_0x52f49f[_0x3700cb['id']][_0x396e99(0x211)](this,_0x3700cb):!![];},Game_BattlerBase['prototype'][_0xc329de(0x475)]=function(_0x143911){const _0x531cb1=_0xc329de;return VisuMZ[_0x531cb1(0x383)][_0x531cb1(0x43a)][_0x531cb1(0x2af)]['SkillConditionJS'][_0x531cb1(0x211)](this,_0x143911);},VisuMZ[_0xc329de(0x383)][_0xc329de(0x2c8)]=Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x254)],Game_BattlerBase[_0xc329de(0x305)]['skillMpCost']=function(_0x5d6527){const _0x37c841=_0xc329de;for(settings of VisuMZ[_0x37c841(0x383)][_0x37c841(0x43a)][_0x37c841(0x371)]){if(_0x37c841(0x202)!==_0x37c841(0x202))return this['statusWindowRectSkillsStatesCore']();else{if(settings[_0x37c841(0x372)][_0x37c841(0x4ad)]()==='MP'){if(_0x37c841(0x4fd)!==_0x37c841(0x4fd)){const _0x49ab41=this[_0x37c841(0x28c)]();this['resetFontSettings'](),this[_0x37c841(0x3e3)](_0x3681e8,_0x5e6cc2,_0x34eb4b,_0x19f437,!![]),this[_0x37c841(0x3ee)](),this[_0x37c841(0x2db)][_0x37c841(0x370)]-=0x8;const _0x573e2f=this[_0x37c841(0x4fa)][_0x37c841(0x43b)](_0x144307,!![]);this[_0x37c841(0x2db)][_0x37c841(0x3d4)](_0x573e2f,_0x208dad,_0x11745e,_0x289b43,_0x49ab41,_0x37c841(0x32f));}else return settings[_0x37c841(0x405)][_0x37c841(0x211)](this,_0x5d6527);}}}return VisuMZ[_0x37c841(0x383)][_0x37c841(0x2c8)]['call'](this,_0x5d6527);},VisuMZ[_0xc329de(0x383)][_0xc329de(0x3b6)]=Game_BattlerBase['prototype'][_0xc329de(0x205)],Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x205)]=function(_0x4a5103){const _0x122a7d=_0xc329de;for(settings of VisuMZ[_0x122a7d(0x383)][_0x122a7d(0x43a)][_0x122a7d(0x371)]){if(settings[_0x122a7d(0x372)][_0x122a7d(0x4ad)]()==='TP'){if(_0x122a7d(0x29a)==='bkEON')return settings[_0x122a7d(0x405)]['call'](this,_0x4a5103);else{_0x12dbe5['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0xeb5605=_0x1f2f63['indexOf'](_0x3204bf(_0x40417b['$1'])[_0x122a7d(0x4ad)]()),_0xdd7b18=_0xca29a3(_0x116167['$2']);_0xeb5605>=0x0&&(_0x38ba7d[_0x122a7d(0x4cb)](_0xeb5605,_0xdd7b18),this[_0x122a7d(0x216)](_0x301d64));}}}return VisuMZ[_0x122a7d(0x383)][_0x122a7d(0x3b6)]['call'](this,_0x4a5103);},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x23c)]=function(_0x21fd04){const _0x9efa0e=_0xc329de;if(typeof _0x21fd04===_0x9efa0e(0x331))_0x21fd04=$dataStates[_0x21fd04];return this[_0x9efa0e(0x298)]()[_0x9efa0e(0x358)](_0x21fd04);},VisuMZ[_0xc329de(0x383)]['Game_BattlerBase_states']=Game_BattlerBase['prototype'][_0xc329de(0x298)],Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x298)]=function(){const _0x28747b=_0xc329de;let _0x4d9c59=VisuMZ[_0x28747b(0x383)][_0x28747b(0x388)][_0x28747b(0x211)](this);if($gameTemp['_checkingPassiveStates'])return _0x4d9c59;return $gameTemp['_checkingPassiveStates']=!![],this[_0x28747b(0x414)](_0x4d9c59),$gameTemp[_0x28747b(0x486)]=undefined,_0x4d9c59;},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x414)]=function(_0x1fd488){const _0x142941=_0xc329de,_0x2b7628=this['passiveStates']();for(state of _0x2b7628){if(!state)continue;if(!this[_0x142941(0x1fc)](state)&&_0x1fd488['includes'](state))continue;_0x1fd488[_0x142941(0x34e)](state);}_0x2b7628['length']>0x0&&_0x1fd488['sort']((_0x3911a4,_0x114857)=>{const _0xc0077=_0x142941,_0x8adc76=_0x3911a4[_0xc0077(0x294)],_0xdf1497=_0x114857[_0xc0077(0x294)];if(_0x8adc76!==_0xdf1497){if(_0xc0077(0x4c6)===_0xc0077(0x493)){if(!_0x4227ea[_0xc0077(0x4f1)](_0x2c75f7))return![];}else return _0xdf1497-_0x8adc76;}return _0x3911a4-_0x114857;});},Game_BattlerBase['prototype'][_0xc329de(0x1fc)]=function(_0x42d913){const _0xe46b52=_0xc329de;return _0x42d913[_0xe46b52(0x253)][_0xe46b52(0x213)](/<PASSIVE STACKABLE>/i);},VisuMZ['SkillsStatesCore'][_0xc329de(0x214)]=Game_BattlerBase['prototype']['traitsSet'],Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x241)]=function(_0x47450b){const _0x4f94da=_0xc329de;this[_0x4f94da(0x2c9)]=!![];let _0x4025ea=VisuMZ[_0x4f94da(0x383)]['Game_BattlerBase_traitsSet'][_0x4f94da(0x211)](this,_0x47450b);return this['_checkingTraitsSetSkillsStatesCore']=undefined,_0x4025ea;},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x2b4)]=function(){const _0x200fd0=_0xc329de;let _0x1d5c6a=[];this[_0x200fd0(0x4ab)]=this['_passiveStateResults']||{};for(;;){if(_0x200fd0(0x449)===_0x200fd0(0x449)){_0x1d5c6a=[];let _0x23f119=!![];for(const _0x3a0b3f of this['_cache'][_0x200fd0(0x31f)]){if('geJkr'==='pUTZX'){const _0x4130fd=_0x7f9521[_0x200fd0(0x45d)]('['+_0x51aff4['$1'][_0x200fd0(0x213)](/\d+/g)+']');for(const _0x30cc6f of _0x4130fd){if(_0x17703a[_0x200fd0(0x226)](_0x30cc6f))return!![];}return![];}else{const _0x43d63c=$dataStates[_0x3a0b3f];if(!_0x43d63c)continue;let _0x3de559=this['meetsPassiveStateConditions'](_0x43d63c);this[_0x200fd0(0x4ab)][_0x3a0b3f]!==_0x3de559&&(_0x23f119=![],this['_passiveStateResults'][_0x3a0b3f]=_0x3de559);if(!_0x3de559)continue;_0x1d5c6a['push'](_0x43d63c);}}if(_0x23f119)break;else{if(_0x200fd0(0x469)==='ACeZz'){if(_0x4f5dcd[_0x200fd0(0x4f1)](_0x217032))return!![];}else{if(!this[_0x200fd0(0x2c9)])this[_0x200fd0(0x494)]();this[_0x200fd0(0x42b)]();}}}else{if(!this[_0x200fd0(0x2c9)])this['refresh']();this[_0x200fd0(0x42b)]();}}return _0x1d5c6a;},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x1f6)]=function(_0x49f5ef){const _0x22764a=_0xc329de;if(!this[_0x22764a(0x3e2)](_0x49f5ef))return![];if(!this[_0x22764a(0x2e8)](_0x49f5ef))return![];if(!this[_0x22764a(0x3c7)](_0x49f5ef))return![];if(!this[_0x22764a(0x4e2)](_0x49f5ef))return![];return!![];},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x3e2)]=function(_0x488e7b){return!![];},Game_Actor[_0xc329de(0x305)][_0xc329de(0x3e2)]=function(_0x75db34){const _0x5dd4f7=_0xc329de,_0x1c287b=_0x75db34[_0x5dd4f7(0x253)];if(_0x1c287b[_0x5dd4f7(0x213)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0xe93a96=String(RegExp['$1'])[_0x5dd4f7(0x3b2)](',')['map'](_0x3c0d5c=>_0x3c0d5c[_0x5dd4f7(0x259)]()),_0x3c8fc1=VisuMZ[_0x5dd4f7(0x383)][_0x5dd4f7(0x4a8)](_0xe93a96);return _0x3c8fc1[_0x5dd4f7(0x358)](this[_0x5dd4f7(0x416)]());}if(_0x1c287b[_0x5dd4f7(0x213)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){if(_0x5dd4f7(0x49f)!=='nCPqk'){const _0x3c10ff=String(RegExp['$1'])[_0x5dd4f7(0x3b2)](',')['map'](_0x2424ec=>_0x2424ec['trim']()),_0x434735=VisuMZ['SkillsStatesCore'][_0x5dd4f7(0x4a8)](_0x3c10ff);let _0x153aa9=[this[_0x5dd4f7(0x416)]()];if(Imported[_0x5dd4f7(0x402)]&&this[_0x5dd4f7(0x3de)]){if(_0x5dd4f7(0x262)!==_0x5dd4f7(0x1ec))_0x153aa9=this['multiclasses']();else return this[_0x5dd4f7(0x316)]();}return _0x434735[_0x5dd4f7(0x38e)](_0x50d5b8=>_0x153aa9[_0x5dd4f7(0x358)](_0x50d5b8))[_0x5dd4f7(0x40b)]>0x0;}else{if(this[_0x5dd4f7(0x201)]())return!![];return _0x131559[_0x5dd4f7(0x383)][_0x5dd4f7(0x341)]['call'](this);}}return Game_BattlerBase[_0x5dd4f7(0x305)][_0x5dd4f7(0x3e2)]['call'](this,_0x75db34);},VisuMZ[_0xc329de(0x383)]['ParseClassIDs']=function(_0x2538e5){const _0x1fe1a6=_0xc329de,_0x281374=[];for(let _0x2aacd4 of _0x2538e5){_0x2aacd4=(String(_0x2aacd4)||'')[_0x1fe1a6(0x259)]();const _0x2ce7d1=/^\d+$/['test'](_0x2aacd4);_0x2ce7d1?_0x281374[_0x1fe1a6(0x34e)](Number(_0x2aacd4)):_0x1fe1a6(0x463)===_0x1fe1a6(0x282)?(_0x1d00e4[_0x1fe1a6(0x305)][_0x1fe1a6(0x2fa)][_0x1fe1a6(0x211)](this,_0xe1f642),this['onEraseDebuffGlobalJS'](_0x16b5fa)):_0x281374[_0x1fe1a6(0x34e)](DataManager['getClassIdWithName'](_0x2aacd4));}return _0x281374[_0x1fe1a6(0x393)](_0x28972e=>$dataClasses[Number(_0x28972e)])[_0x1fe1a6(0x3a0)](null);},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x2e8)]=function(_0x351498){const _0x524a89=_0xc329de,_0x3d0516=_0x351498[_0x524a89(0x253)];if(_0x3d0516['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x48b278=JSON[_0x524a89(0x45d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x36be23 of _0x48b278){if(!$gameSwitches[_0x524a89(0x4f1)](_0x36be23))return![];}return!![];}if(_0x3d0516['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1ae744=JSON[_0x524a89(0x45d)]('['+RegExp['$1'][_0x524a89(0x213)](/\d+/g)+']');for(const _0x4b6354 of _0x1ae744){if(_0x524a89(0x43e)===_0x524a89(0x247)){const _0x500b27=_0x173392[_0x524a89(0x45d)]('['+_0x29a1de['$1'][_0x524a89(0x213)](/\d+/g)+']');for(const _0x331e37 of _0x500b27){if(!_0x1bf65d['hasSkill'](_0x331e37))return!![];}return![];}else{if(!$gameSwitches['value'](_0x4b6354))return![];}}return!![];}if(_0x3d0516[_0x524a89(0x213)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x6c7bb0=JSON[_0x524a89(0x45d)]('['+RegExp['$1'][_0x524a89(0x213)](/\d+/g)+']');for(const _0x1b98a1 of _0x6c7bb0){if($gameSwitches[_0x524a89(0x4f1)](_0x1b98a1))return!![];}return![];}if(_0x3d0516['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('lvYHu'!==_0x524a89(0x450))return this['totalStateCategoryAffected'](_0x7bc93b)>0x0;else{const _0x205ff4=JSON['parse']('['+RegExp['$1'][_0x524a89(0x213)](/\d+/g)+']');for(const _0x7b86d8 of _0x205ff4){if(_0x524a89(0x2e3)!=='kDTps'){if(!$gameSwitches[_0x524a89(0x4f1)](_0x7b86d8))return!![];}else{const _0xb2d91b=_0x226653[_0x524a89(0x443)];if(![_0x4a4402,_0x172d00][_0x524a89(0x358)](_0xb2d91b[_0x524a89(0x489)]))return _0x28d47b[_0x524a89(0x2f5)]();}}return![];}}if(_0x3d0516['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x524a89(0x390)!=='BPPNs'){const _0x4f3f87=JSON[_0x524a89(0x45d)]('['+RegExp['$1'][_0x524a89(0x213)](/\d+/g)+']');for(const _0x3957c8 of _0x4f3f87){if(!$gameSwitches[_0x524a89(0x4f1)](_0x3957c8))return!![];}return![];}else _0x344936+=this[_0x524a89(0x43c)](_0x603495),this[_0x524a89(0x417)](_0x5bad03,_0x32fc15);}if(_0x3d0516[_0x524a89(0x213)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1de2c3=JSON[_0x524a89(0x45d)]('['+RegExp['$1'][_0x524a89(0x213)](/\d+/g)+']');for(const _0x4cfe41 of _0x1de2c3){if('xtpCU'===_0x524a89(0x32b)){const _0x4dc123=_0x2a416b[_0x524a89(0x45d)]('['+_0xe99aa4['$1'][_0x524a89(0x213)](/\d+/g)+']');for(const _0x1ca59f of _0x4dc123){if(_0x58ebe9[_0x524a89(0x4f1)](_0x1ca59f))return![];}return!![];}else{if($gameSwitches[_0x524a89(0x4f1)](_0x4cfe41))return![];}}return!![];}return!![];},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x3c7)]=function(_0x3a7937){const _0x38ddb6=_0xc329de,_0x5d89e9=VisuMZ[_0x38ddb6(0x383)]['statePassiveConditionJS'];if(_0x5d89e9[_0x3a7937['id']]&&!_0x5d89e9[_0x3a7937['id']][_0x38ddb6(0x211)](this,_0x3a7937))return![];return!![];},Game_BattlerBase[_0xc329de(0x305)]['meetsPassiveStateGlobalConditionJS']=function(_0x307a12){const _0x1b0252=_0xc329de;return VisuMZ[_0x1b0252(0x383)]['Settings']['PassiveStates'][_0x1b0252(0x1fd)]['call'](this,_0x307a12);},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x31f)]=function(){const _0x578664=_0xc329de;if(this[_0x578664(0x2c6)]('passiveStates'))return this['convertPassiveStates']();if(this[_0x578664(0x4a9)])return[];return this[_0x578664(0x4a9)]=!![],this[_0x578664(0x42b)](),this[_0x578664(0x4a9)]=undefined,this['convertPassiveStates']();},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x42b)]=function(){const _0x2290b2=_0xc329de;this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x2290b2(0x4f8)][_0x2290b2(0x31f)]=[],this[_0x2290b2(0x25d)](),this[_0x2290b2(0x420)](),this[_0x2290b2(0x37d)](),this[_0x2290b2(0x4a9)]=undefined;},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x25d)]=function(){const _0x552797=_0xc329de;if(Imported[_0x552797(0x4ee)])this[_0x552797(0x4b6)]();},Game_BattlerBase['prototype']['passiveStateObjects']=function(){return[];},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x420)]=function(){const _0x5948c6=_0xc329de,_0x119014=this[_0x5948c6(0x452)]();for(const _0x11d726 of _0x119014){if(!_0x11d726)continue;const _0x157809=_0x11d726[_0x5948c6(0x253)]['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x157809)for(const _0x171960 of _0x157809){if(_0x5948c6(0x4eb)!=='aIjgx'){_0x171960[_0x5948c6(0x213)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x315628=RegExp['$1'];if(_0x315628[_0x5948c6(0x213)](/(\d+(?:\s*,\s*\d+)*)/i)){if(_0x5948c6(0x4df)!==_0x5948c6(0x4df))return _0x21cf54[_0x5948c6(0x443)][_0x5948c6(0x489)]===_0x1b9994?_0x3673d5[_0x5948c6(0x383)][_0x5948c6(0x39b)]['call'](this):_0x42109e['SkillsStatesCore'][_0x5948c6(0x43a)][_0x5948c6(0x2af)][_0x5948c6(0x2f6)];else{const _0x5d272c=JSON[_0x5948c6(0x45d)]('['+RegExp['$1'][_0x5948c6(0x213)](/\d+/g)+']');this['_cache']['passiveStates']=this[_0x5948c6(0x4f8)][_0x5948c6(0x31f)][_0x5948c6(0x349)](_0x5d272c);}}else{const _0x3bda35=_0x315628[_0x5948c6(0x3b2)](',');for(const _0x529a67 of _0x3bda35){const _0x214d6a=DataManager[_0x5948c6(0x4b9)](_0x529a67);if(_0x214d6a)this[_0x5948c6(0x4f8)][_0x5948c6(0x31f)][_0x5948c6(0x34e)](_0x214d6a);}}}else{const _0x423bf4=_0x22f180(_0x36d21a['$1']);if(_0x752d86[_0x5948c6(0x32d)](_0x423bf4))return!![];}}}},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x37d)]=function(){const _0x16be11=_0xc329de,_0x231a59=VisuMZ[_0x16be11(0x383)]['Settings'][_0x16be11(0x2c3)][_0x16be11(0x2b6)];this[_0x16be11(0x4f8)][_0x16be11(0x31f)]=this['_cache']['passiveStates'][_0x16be11(0x349)](_0x231a59);},Game_BattlerBase['prototype'][_0xc329de(0x4ce)]=function(_0x405a49){const _0x38edc1=_0xc329de;if(typeof _0x405a49!==_0x38edc1(0x331))_0x405a49=_0x405a49['id'];return this['_stateTurns'][_0x405a49]||0x0;},Game_BattlerBase['prototype'][_0xc329de(0x417)]=function(_0x266cec,_0x657e5a){const _0x1e6241=_0xc329de;if(typeof _0x266cec!=='number')_0x266cec=_0x266cec['id'];if(this[_0x1e6241(0x212)](_0x266cec)){const _0x139d2c=DataManager[_0x1e6241(0x31e)](_0x266cec);this[_0x1e6241(0x342)][_0x266cec]=_0x657e5a[_0x1e6241(0x375)](0x0,_0x139d2c);if(this[_0x1e6241(0x342)][_0x266cec]<=0x0)this[_0x1e6241(0x207)](_0x266cec);}},Game_BattlerBase['prototype'][_0xc329de(0x3fe)]=function(_0x59eb6c,_0x16ceab){const _0x5f362e=_0xc329de;if(typeof _0x59eb6c!==_0x5f362e(0x331))_0x59eb6c=_0x59eb6c['id'];this[_0x5f362e(0x212)](_0x59eb6c)&&(_0x16ceab+=this[_0x5f362e(0x4ce)](_0x59eb6c),this['setStateTurns'](_0x59eb6c,_0x16ceab));},VisuMZ[_0xc329de(0x383)]['Game_BattlerBase_eraseBuff']=Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x348)],Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x348)]=function(_0x523de4){const _0x32ccfc=_0xc329de,_0x24db45=this[_0x32ccfc(0x453)][_0x523de4];VisuMZ[_0x32ccfc(0x383)]['Game_BattlerBase_eraseBuff'][_0x32ccfc(0x211)](this,_0x523de4);if(_0x24db45>0x0)this[_0x32ccfc(0x49a)](_0x523de4);if(_0x24db45<0x0)this[_0x32ccfc(0x2fa)](_0x523de4);},VisuMZ[_0xc329de(0x383)][_0xc329de(0x2f8)]=Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x1f1)],Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x1f1)]=function(_0x2e7051){const _0xbea523=_0xc329de;VisuMZ[_0xbea523(0x383)][_0xbea523(0x2f8)]['call'](this,_0x2e7051);if(!this[_0xbea523(0x3da)](_0x2e7051))this[_0xbea523(0x348)](_0x2e7051);},VisuMZ[_0xc329de(0x383)]['Game_BattlerBase_decreaseBuff']=Game_BattlerBase['prototype'][_0xc329de(0x334)],Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x334)]=function(_0xef7006){const _0x582a15=_0xc329de;VisuMZ[_0x582a15(0x383)][_0x582a15(0x251)][_0x582a15(0x211)](this,_0xef7006);if(!this[_0x582a15(0x3da)](_0xef7006))this[_0x582a15(0x348)](_0xef7006);},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x49a)]=function(_0x4f0e6b){},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x2fa)]=function(_0x277ee0){},Game_BattlerBase['prototype'][_0xc329de(0x2a9)]=function(_0xe2e988){const _0x151ae5=_0xc329de;return this['_buffs'][_0xe2e988]===VisuMZ[_0x151ae5(0x383)][_0x151ae5(0x43a)][_0x151ae5(0x3bf)]['StackBuffMax'];},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x3dd)]=function(_0x22e5b8){const _0x255732=_0xc329de;return this['_buffs'][_0x22e5b8]===-VisuMZ[_0x255732(0x383)][_0x255732(0x43a)][_0x255732(0x3bf)][_0x255732(0x3af)];},VisuMZ[_0xc329de(0x383)][_0xc329de(0x3d9)]=Game_BattlerBase['prototype'][_0xc329de(0x411)],Game_BattlerBase['prototype'][_0xc329de(0x411)]=function(_0x27cfdd,_0x468f7a){const _0x132839=_0xc329de;return _0x27cfdd=_0x27cfdd[_0x132839(0x375)](-0x2,0x2),VisuMZ[_0x132839(0x383)][_0x132839(0x3d9)]['call'](this,_0x27cfdd,_0x468f7a);},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x438)]=function(_0x4500a7){const _0x13f3c2=_0xc329de,_0x407596=this[_0x13f3c2(0x453)][_0x4500a7];return VisuMZ['SkillsStatesCore']['Settings'][_0x13f3c2(0x3bf)][_0x13f3c2(0x468)][_0x13f3c2(0x211)](this,_0x4500a7,_0x407596);},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x43c)]=function(_0x243781){const _0x1e0908=_0xc329de;return this[_0x1e0908(0x310)][_0x243781]||0x0;},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x46d)]=function(_0x27816e){const _0x5d2a46=_0xc329de;return this[_0x5d2a46(0x43c)](_0x27816e);},Game_BattlerBase['prototype'][_0xc329de(0x4cb)]=function(_0x2cad5a,_0x438a83){const _0x294780=_0xc329de;if(this['isBuffAffected'](_0x2cad5a)){if(_0x294780(0x26a)==='ppImF'){const _0x506fb8=VisuMZ[_0x294780(0x383)][_0x294780(0x43a)][_0x294780(0x3bf)]['MaxTurns'];this[_0x294780(0x310)][_0x2cad5a]=_0x438a83[_0x294780(0x375)](0x0,_0x506fb8);}else{if(typeof _0x805bd3!==_0x294780(0x331))_0x352165=_0x2774f8['id'];this[_0x294780(0x1e4)]=this[_0x294780(0x1e4)]||{},this[_0x294780(0x1e4)][_0x369875]={};}}},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x2ed)]=function(_0x2d1704,_0x4a266a){const _0x2f687c=_0xc329de;this[_0x2f687c(0x4f9)](_0x2d1704)&&(_0x4a266a+=this[_0x2f687c(0x43c)](stateId),this['setStateTurns'](_0x2d1704,_0x4a266a));},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x1fa)]=function(_0x36f680,_0x3057eb){const _0x472e85=_0xc329de;if(this[_0x472e85(0x3d7)](_0x36f680)){if('FnacL'===_0x472e85(0x2cf)){const _0x251896=VisuMZ[_0x472e85(0x383)][_0x472e85(0x43a)][_0x472e85(0x3bf)][_0x472e85(0x4bd)];this[_0x472e85(0x310)][_0x36f680]=_0x3057eb[_0x472e85(0x375)](0x0,_0x251896);}else this[_0x472e85(0x1cf)](_0x12ba69);}},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x2ff)]=function(_0x429fa9,_0xc0d74c){const _0x34055b=_0xc329de;this['isDebuffAffected'](_0x429fa9)&&(_0xc0d74c+=this[_0x34055b(0x43c)](stateId),this['setStateTurns'](_0x429fa9,_0xc0d74c));},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x462)]=function(_0x55bd16){const _0x2e6085=_0xc329de;if(typeof _0x55bd16!==_0x2e6085(0x331))_0x55bd16=_0x55bd16['id'];return this[_0x2e6085(0x1e4)]=this['_stateData']||{},this['_stateData'][_0x55bd16]=this[_0x2e6085(0x1e4)][_0x55bd16]||{},this['_stateData'][_0x55bd16];},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x483)]=function(_0x105e83,_0x45507f){const _0x584956=_0xc329de;if(typeof _0x105e83!==_0x584956(0x331))_0x105e83=_0x105e83['id'];const _0xa69fee=this[_0x584956(0x462)](_0x105e83);return _0xa69fee[_0x45507f];},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x314)]=function(_0x4cd467,_0x45edc2,_0x2da4a5){const _0x206e88=_0xc329de;if(typeof _0x4cd467!==_0x206e88(0x331))_0x4cd467=_0x4cd467['id'];const _0xec6a03=this['stateData'](_0x4cd467);_0xec6a03[_0x45edc2]=_0x2da4a5;},Game_BattlerBase['prototype']['clearStateData']=function(_0x5aaa54){const _0x28014e=_0xc329de;if(typeof _0x5aaa54!=='number')_0x5aaa54=_0x5aaa54['id'];this['_stateData']=this[_0x28014e(0x1e4)]||{},this[_0x28014e(0x1e4)][_0x5aaa54]={};},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x4b2)]=function(_0x1f8420){const _0x4e90b1=_0xc329de;if(typeof _0x1f8420!==_0x4e90b1(0x331))_0x1f8420=_0x1f8420['id'];return this[_0x4e90b1(0x264)]=this['_stateDisplay']||{},this['_stateDisplay'][_0x1f8420]===undefined&&(this[_0x4e90b1(0x264)][_0x1f8420]=''),this[_0x4e90b1(0x264)][_0x1f8420];},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x3be)]=function(_0x3f277b,_0x235284){const _0x41f84c=_0xc329de;if(typeof _0x3f277b!=='number')_0x3f277b=_0x3f277b['id'];this[_0x41f84c(0x264)]=this[_0x41f84c(0x264)]||{},this[_0x41f84c(0x264)][_0x3f277b]=_0x235284;},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x423)]=function(_0x513fd1){const _0x2c0b9f=_0xc329de;if(typeof _0x513fd1!==_0x2c0b9f(0x331))_0x513fd1=_0x513fd1['id'];this[_0x2c0b9f(0x264)]=this[_0x2c0b9f(0x264)]||{},this['_stateDisplay'][_0x513fd1]='';},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x38d)]=function(_0x50ed41){const _0x386138=_0xc329de;if(typeof _0x50ed41!==_0x386138(0x331))_0x50ed41=_0x50ed41['id'];this[_0x386138(0x4c1)]=this['_stateOrigin']||{},this[_0x386138(0x4c1)][_0x50ed41]=this[_0x386138(0x4c1)][_0x50ed41]||'user';const _0x2da53a=this[_0x386138(0x4c1)][_0x50ed41];return this[_0x386138(0x2dc)](_0x2da53a);},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x27d)]=function(_0x472135,_0x1161b4){const _0x721c78=_0xc329de;this[_0x721c78(0x4c1)]=this[_0x721c78(0x4c1)]||{};const _0x496362=_0x1161b4?this[_0x721c78(0x1f8)](_0x1161b4):this[_0x721c78(0x326)]();this[_0x721c78(0x4c1)][_0x472135]=_0x496362;},Game_BattlerBase['prototype'][_0xc329de(0x1d9)]=function(_0x26df1b){const _0x5cd729=_0xc329de;this[_0x5cd729(0x4c1)]=this[_0x5cd729(0x4c1)]||{},delete this[_0x5cd729(0x4c1)][_0x26df1b];},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x326)]=function(){const _0x1cc0e5=_0xc329de,_0x14683e=this[_0x1cc0e5(0x4a3)]();return this[_0x1cc0e5(0x1f8)](_0x14683e);},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x4a3)]=function(){const _0x374b89=_0xc329de;if($gameParty['inBattle']()){if(_0x374b89(0x3e4)!==_0x374b89(0x4e4)){if(BattleManager['_subject']){if(_0x374b89(0x3c3)===_0x374b89(0x36f))_0x46ffaa['push'](_0xdec01f(_0x5308a7));else return BattleManager[_0x374b89(0x245)];}else{if(BattleManager[_0x374b89(0x1c9)])return BattleManager[_0x374b89(0x1c9)];}}else _0x354229[_0x374b89(0x383)][_0x374b89(0x43a)][_0x374b89(0x3bf)][_0x374b89(0x279)][_0x374b89(0x211)](this,_0x555aac);}else{const _0x5305d8=SceneManager[_0x374b89(0x443)];if(![Scene_Map,Scene_Item][_0x374b89(0x358)](_0x5305d8['constructor'])){if('VQDkq'!=='qKNNf')return $gameParty[_0x374b89(0x2f5)]();else _0x4cd26c[_0x1b1cda][_0x309ff3]&&_0x584571[_0x69f419][_0x5c364c][_0x374b89(0x211)](this,_0x3107d8);}}return this;},Game_BattlerBase['prototype'][_0xc329de(0x1f8)]=function(_0x8f5098){const _0x1f99a7=_0xc329de;if(!_0x8f5098)return'user';if(_0x8f5098['isActor']()){if(_0x1f99a7(0x35a)==='PDTtH')_0x57202f[_0x1f99a7(0x383)]['Settings'][_0x1f99a7(0x3bf)]['onExpireDebuffJS'][_0x1f99a7(0x211)](this,_0x53567c);else return _0x1f99a7(0x21e)[_0x1f99a7(0x3bb)](_0x8f5098[_0x1f99a7(0x398)]());}else{const _0x1f7664=_0x1f99a7(0x1e0)[_0x1f99a7(0x3bb)](_0x8f5098[_0x1f99a7(0x4d8)]()),_0x18e582=_0x1f99a7(0x285)['format'](_0x8f5098['index']()),_0x584eca=_0x1f99a7(0x2de)[_0x1f99a7(0x3bb)]($gameTroop[_0x1f99a7(0x4a4)]());return _0x1f99a7(0x36c)[_0x1f99a7(0x3bb)](_0x1f7664,_0x18e582,_0x584eca);}return'user';},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x2dc)]=function(_0x11747c){const _0xfe5828=_0xc329de;if(_0x11747c===_0xfe5828(0x48a))return this;else{if(_0x11747c[_0xfe5828(0x213)](/<actor-(\d+)>/i)){if(_0xfe5828(0x46c)==='ppwth')return $gameActors[_0xfe5828(0x4f5)](Number(RegExp['$1']));else{const _0x3fbf28=_0x5bb567[_0xfe5828(0x45d)]('['+_0x3fd121['$1'][_0xfe5828(0x213)](/\d+/g)+']');this['_cache'][_0xfe5828(0x31f)]=this[_0xfe5828(0x4f8)][_0xfe5828(0x31f)][_0xfe5828(0x349)](_0x3fbf28);}}else{if(_0xfe5828(0x346)!==_0xfe5828(0x346))this[_0xfe5828(0x27d)](_0x276916),this['removeOtherStatesOfSameCategory'](_0x6d91c2),this[_0xfe5828(0x3c8)](_0x21ee56),this[_0xfe5828(0x1db)](_0x12c9b1),this[_0xfe5828(0x2fd)](_0x43c472);else{if($gameParty['inBattle']()&&_0x11747c[_0xfe5828(0x213)](/<troop-(\d+)>/i)){if(_0xfe5828(0x43f)!==_0xfe5828(0x43f)){const _0x317bbb=_0x2f74b4[_0x289a71];if(!_0x317bbb)return;const _0x509c6f=_0x317bbb[_0xfe5828(0x253)]||'',_0x9f40e3=_0x509c6f[_0xfe5828(0x213)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x9f40e3){const _0x154aa4=[_0x317bbb];for(const _0x299484 of _0x9f40e3){_0x299484['match'](/<REMOVE OTHER (.*) STATES>/i);const _0x21b124=_0x481d79(_0x2374cf['$1']);this[_0xfe5828(0x2a7)](_0x21b124,_0x154aa4);}}}else{const _0xe287a5=Number(RegExp['$1']);if(_0xe287a5===$gameTroop[_0xfe5828(0x4a4)]()){if(_0x11747c[_0xfe5828(0x213)](/<member-(\d+)>/i)){if(_0xfe5828(0x4a6)==='ROXjM')return $gameTroop['members']()[Number(RegExp['$1'])];else this[_0xfe5828(0x2db)][_0xfe5828(0x2f0)]=_0x1deb37;}}}}if(_0x11747c['match'](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}}return this;},VisuMZ[_0xc329de(0x383)][_0xc329de(0x2c0)]=Game_Battler[_0xc329de(0x305)][_0xc329de(0x490)],Game_Battler['prototype'][_0xc329de(0x490)]=function(_0x2c0427){const _0x155814=_0xc329de,_0x1a5612=this[_0x155814(0x308)](_0x2c0427);VisuMZ['SkillsStatesCore'][_0x155814(0x2c0)][_0x155814(0x211)](this,_0x2c0427);if(_0x1a5612&&this[_0x155814(0x23c)]($dataStates[_0x2c0427])){if(_0x155814(0x1e9)!==_0x155814(0x1e9)){const _0x7092c1=_0x555676[_0x155814(0x405)][_0x155814(0x211)](_0x541336,_0x3d9276);return _0x5236a3['TextJS']['call'](_0x17890e,_0x1e7e1f,_0x7092c1,_0x361915);}else{this[_0x155814(0x444)](_0x2c0427);;}}},VisuMZ['SkillsStatesCore'][_0xc329de(0x26e)]=Game_Battler[_0xc329de(0x305)][_0xc329de(0x308)],Game_Battler[_0xc329de(0x305)][_0xc329de(0x308)]=function(_0x470ba1){const _0x41f91f=_0xc329de,_0x3b0a53=$dataStates[_0x470ba1];if(_0x3b0a53&&_0x3b0a53[_0x41f91f(0x253)]['match'](/<NO DEATH CLEAR>/i))return!this[_0x41f91f(0x41d)](_0x470ba1)&&!this[_0x41f91f(0x31b)](_0x470ba1)&&!this[_0x41f91f(0x46e)]['isStateRemoved'](_0x470ba1);return VisuMZ[_0x41f91f(0x383)]['Game_Battler_isStateAddable'][_0x41f91f(0x211)](this,_0x470ba1);},Game_Battler['prototype'][_0xc329de(0x444)]=function(_0x49c685){const _0xdd95ae=_0xc329de;this['setStateOrigin'](_0x49c685),this[_0xdd95ae(0x2e1)](_0x49c685),this[_0xdd95ae(0x3c8)](_0x49c685),this[_0xdd95ae(0x1db)](_0x49c685),this[_0xdd95ae(0x2fd)](_0x49c685);},Game_Battler[_0xc329de(0x305)][_0xc329de(0x27f)]=function(_0x2a672e){const _0x3a67e8=_0xc329de;this[_0x3a67e8(0x2d7)](_0x2a672e),this['onEraseStateGlobalJS'](_0x2a672e),Game_BattlerBase[_0x3a67e8(0x305)][_0x3a67e8(0x27f)][_0x3a67e8(0x211)](this,_0x2a672e);},Game_Battler[_0xc329de(0x305)]['removeStatesAuto']=function(_0xe11bf0){const _0xa4eafc=_0xc329de;for(const _0x2fa0ce of this[_0xa4eafc(0x298)]()){this[_0xa4eafc(0x47a)](_0x2fa0ce['id'])&&_0x2fa0ce[_0xa4eafc(0x3f5)]===_0xe11bf0&&(this['removeState'](_0x2fa0ce['id']),this['onExpireState'](_0x2fa0ce['id']),this[_0xa4eafc(0x3fa)](_0x2fa0ce['id']));}},Game_Battler[_0xc329de(0x305)]['onExpireState']=function(_0x414d19){this['onExpireStateCustomJS'](_0x414d19);},Game_Battler[_0xc329de(0x305)][_0xc329de(0x1db)]=function(_0x34abd1){const _0x66995d=_0xc329de;if(this[_0x66995d(0x2bf)]||this[_0x66995d(0x1d5)])return;const _0x17b1b8=VisuMZ[_0x66995d(0x383)][_0x66995d(0x3c6)];if(_0x17b1b8[_0x34abd1])_0x17b1b8[_0x34abd1][_0x66995d(0x211)](this,_0x34abd1);},Game_Battler[_0xc329de(0x305)][_0xc329de(0x2d7)]=function(_0x3102c0){const _0x27258d=_0xc329de;if(this['_tempActor']||this[_0x27258d(0x1d5)])return;const _0x5d8bd5=VisuMZ[_0x27258d(0x383)][_0x27258d(0x37c)];if(_0x5d8bd5[_0x3102c0])_0x5d8bd5[_0x3102c0]['call'](this,_0x3102c0);},Game_Battler[_0xc329de(0x305)]['onExpireStateCustomJS']=function(_0x3f6e4b){const _0xeb660d=_0xc329de;if(this[_0xeb660d(0x2bf)]||this[_0xeb660d(0x1d5)])return;const _0xc3d846=VisuMZ[_0xeb660d(0x383)][_0xeb660d(0x23e)];if(_0xc3d846[_0x3f6e4b])_0xc3d846[_0x3f6e4b]['call'](this,_0x3f6e4b);},Game_Battler[_0xc329de(0x305)][_0xc329de(0x2fd)]=function(_0xac9d88){const _0xa69a06=_0xc329de;if(this[_0xa69a06(0x2bf)]||this[_0xa69a06(0x1d5)])return;try{VisuMZ[_0xa69a06(0x383)][_0xa69a06(0x43a)][_0xa69a06(0x427)]['onAddStateJS'][_0xa69a06(0x211)](this,_0xac9d88);}catch(_0x104345){if(_0xa69a06(0x2b3)===_0xa69a06(0x29b))_0x3481e4+=this['buffTurns'](_0x31de7e),this['setStateTurns'](_0x3e111e,_0x47e2f0);else{if($gameTemp[_0xa69a06(0x361)]())console[_0xa69a06(0x28b)](_0x104345);}}},Game_Battler[_0xc329de(0x305)][_0xc329de(0x374)]=function(_0x5a8eeb){const _0x3f0a4a=_0xc329de;if(this[_0x3f0a4a(0x2bf)]||this[_0x3f0a4a(0x1d5)])return;try{if('DJRjo'===_0x3f0a4a(0x217))VisuMZ[_0x3f0a4a(0x383)][_0x3f0a4a(0x43a)][_0x3f0a4a(0x427)]['onEraseStateJS'][_0x3f0a4a(0x211)](this,_0x5a8eeb);else{const _0x34b10b=this['isStateAddable'](_0x46aca7);_0x485bab[_0x3f0a4a(0x383)][_0x3f0a4a(0x2c0)][_0x3f0a4a(0x211)](this,_0x2a1d54);if(_0x34b10b&&this['hasState'](_0x49ba92[_0x35ee73])){this[_0x3f0a4a(0x444)](_0x3b591);;}}}catch(_0x33b257){if(_0x3f0a4a(0x396)!=='uxmgR'){const _0x2bb7d4=_0x12a304[_0x3f0a4a(0x45d)]('['+_0x2d5152['$1'][_0x3f0a4a(0x213)](/\d+/g)+']');for(const _0x462fa9 of _0x2bb7d4){if(_0x3aeafc[_0x3f0a4a(0x4f1)](_0x462fa9))return!![];}return![];}else{if($gameTemp[_0x3f0a4a(0x361)]())console[_0x3f0a4a(0x28b)](_0x33b257);}}},Game_Battler[_0xc329de(0x305)]['onExpireStateGlobalJS']=function(_0x30497d){const _0x4b0e56=_0xc329de;if(this[_0x4b0e56(0x2bf)]||this['_tempBattler'])return;try{if(_0x4b0e56(0x3ce)!=='SyQxX'){if(_0x12b037['isPlaytest']())_0x252011[_0x4b0e56(0x28b)](_0x8f4f93);}else VisuMZ[_0x4b0e56(0x383)][_0x4b0e56(0x43a)][_0x4b0e56(0x427)][_0x4b0e56(0x40e)][_0x4b0e56(0x211)](this,_0x30497d);}catch(_0x42db29){if($gameTemp['isPlaytest']())console[_0x4b0e56(0x28b)](_0x42db29);}},Game_Battler[_0xc329de(0x305)][_0xc329de(0x1ef)]=function(_0x3fd76b){const _0x5c8bcf=_0xc329de;return _0x3fd76b=_0x3fd76b['toUpperCase']()['trim'](),this[_0x5c8bcf(0x298)]()[_0x5c8bcf(0x38e)](_0x599ee6=>_0x599ee6['categories']['includes'](_0x3fd76b));},Game_Battler[_0xc329de(0x305)][_0xc329de(0x337)]=function(_0x11ba14,_0x122297){const _0x20c22c=_0xc329de;_0x11ba14=_0x11ba14[_0x20c22c(0x4ad)]()[_0x20c22c(0x259)](),_0x122297=_0x122297||0x0;const _0x1e593b=this[_0x20c22c(0x1ef)](_0x11ba14),_0x7023ec=[];for(const _0xd97280 of _0x1e593b){if(!_0xd97280)continue;if(_0x122297<=0x0)break;_0x7023ec[_0x20c22c(0x34e)](_0xd97280['id']),this[_0x20c22c(0x46e)][_0x20c22c(0x1fe)]=!![],_0x122297--;}while(_0x7023ec[_0x20c22c(0x40b)]>0x0){if('eSIXw'!=='eSIXw')return _0x455808[_0x20c22c(0x405)]['call'](this,_0x30448);else this[_0x20c22c(0x207)](_0x7023ec[_0x20c22c(0x3db)]());}},Game_Battler['prototype'][_0xc329de(0x2a7)]=function(_0x4d200c,_0xa7f0c9){const _0x569ab4=_0xc329de;_0x4d200c=_0x4d200c[_0x569ab4(0x4ad)]()['trim'](),_0xa7f0c9=_0xa7f0c9||[];const _0x8d087=this['statesByCategory'](_0x4d200c),_0x5c9761=[];for(const _0x2ef3b3 of _0x8d087){if(!_0x2ef3b3)continue;if(_0xa7f0c9[_0x569ab4(0x358)](_0x2ef3b3))continue;_0x5c9761[_0x569ab4(0x34e)](_0x2ef3b3['id']),this['_result'][_0x569ab4(0x1fe)]=!![];}while(_0x5c9761['length']>0x0){if('gOSFZ'!==_0x569ab4(0x30e))this['removeState'](_0x5c9761['shift']());else return _0x3efac4[_0x569ab4(0x458)];}},Game_Battler['prototype'][_0xc329de(0x32d)]=function(_0x232e12){const _0x41d0b1=_0xc329de;return this[_0x41d0b1(0x2e7)](_0x232e12)>0x0;},Game_Battler[_0xc329de(0x305)][_0xc329de(0x3ef)]=function(_0x14f621){return this['totalStateCategory'](_0x14f621)>0x0;},Game_Battler[_0xc329de(0x305)][_0xc329de(0x2e7)]=function(_0x35f2e9){const _0x288851=_0xc329de,_0x46cfcf=this['statesByCategory'](_0x35f2e9)[_0x288851(0x38e)](_0x8a7fde=>this['isStateAffected'](_0x8a7fde['id']));return _0x46cfcf['length'];},Game_Battler[_0xc329de(0x305)][_0xc329de(0x376)]=function(_0x316dc6){const _0x29195c=_0xc329de,_0x20ff07=this['statesByCategory'](_0x316dc6);return _0x20ff07[_0x29195c(0x40b)];},VisuMZ[_0xc329de(0x383)][_0xc329de(0x41a)]=Game_BattlerBase['prototype']['isStateResist'],Game_BattlerBase['prototype'][_0xc329de(0x41d)]=function(_0x44d1d3){const _0x4f7fd8=_0xc329de,_0x268aee=$dataStates[_0x44d1d3];if(_0x268aee&&_0x268aee[_0x4f7fd8(0x1cc)]['length']>0x0){if(_0x4f7fd8(0x459)!==_0x4f7fd8(0x459)){const _0x2660ac=this[_0x4f7fd8(0x3fd)](_0x2a418d),_0x45e96c=this[_0x4f7fd8(0x2cd)](_0x1a7127)[_0x4f7fd8(0x2ec)];return _0x45e96c<=_0x2660ac[_0x4f7fd8(0x2ec)]?'iconText':_0x4f7fd8(0x31a);}else for(const _0x129b75 of _0x268aee[_0x4f7fd8(0x1cc)]){if(this[_0x4f7fd8(0x242)](_0x129b75))return!![];}}return VisuMZ[_0x4f7fd8(0x383)][_0x4f7fd8(0x41a)][_0x4f7fd8(0x211)](this,_0x44d1d3);},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x242)]=function(_0x141794){const _0x105b85=_0xc329de;let _0x59351d='stateCategoriesResisted';if(this[_0x105b85(0x2c6)](_0x59351d))return this['_cache'][_0x59351d][_0x105b85(0x358)](_0x141794);return this[_0x105b85(0x4f8)][_0x59351d]=this[_0x105b85(0x47c)](),this[_0x105b85(0x4f8)][_0x59351d]['includes'](_0x141794);},Game_BattlerBase[_0xc329de(0x305)]['makeResistedStateCategories']=function(){const _0x35136d=_0xc329de,_0x2ba8b8=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x23ab5c=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x114e3f=[];for(const _0x355828 of this[_0x35136d(0x4fb)]()){if('KmVXA'===_0x35136d(0x365)){if(!_0x355828)continue;const _0x565ba4=_0x355828[_0x35136d(0x253)],_0x345c93=_0x565ba4[_0x35136d(0x213)](_0x2ba8b8);if(_0x345c93)for(const _0x44483d of _0x345c93){_0x44483d[_0x35136d(0x213)](_0x2ba8b8);const _0x28d225=String(RegExp['$1'])[_0x35136d(0x3b2)](',')['map'](_0x4a92ac=>String(_0x4a92ac)[_0x35136d(0x4ad)]()['trim']());_0x114e3f=_0x114e3f[_0x35136d(0x349)](_0x28d225);}if(_0x565ba4[_0x35136d(0x213)](_0x23ab5c)){if(_0x35136d(0x4b8)===_0x35136d(0x31d))_0x569e47['SkillsStatesCore'][_0x35136d(0x406)][_0x35136d(0x211)](this),this[_0x35136d(0x351)]();else{const _0x401c1c=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x35136d(0x393)](_0x4a97e9=>String(_0x4a97e9)[_0x35136d(0x4ad)]()['trim']());_0x114e3f=_0x114e3f['concat'](_0x401c1c);}}}else{if(!_0xba2682)return![];if(!_0x5a88f4[_0x35136d(0x383)]['Game_BattlerBase_meetsSkillConditions'][_0x35136d(0x211)](this,_0x264288))return![];if(!this['checkSkillConditionsNotetags'](_0x2e0e1b))return![];if(!this[_0x35136d(0x336)](_0x39a019))return![];if(!this['meetsSkillConditionsGlobalJS'](_0x3d85cd))return![];return!![];}}return _0x114e3f;},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x2e1)]=function(_0x18c7a4){const _0x3ce9a4=_0xc329de,_0x4e0bf4=$dataStates[_0x18c7a4];if(!_0x4e0bf4)return;const _0xc0e49=_0x4e0bf4[_0x3ce9a4(0x253)]||'',_0xc71bd4=_0xc0e49[_0x3ce9a4(0x213)](/<REMOVE OTHER (.*) STATES>/gi);if(_0xc71bd4){if('EWaNF'===_0x3ce9a4(0x2c4)){const _0x56968a=_0x2e130d[_0x3ce9a4(0x253)];if(_0x56968a['match'](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x54f5e6=_0x2819d8(_0x133bf3['$1'])[_0x3ce9a4(0x3b2)](',')['map'](_0x141001=>_0x141001['trim']()),_0x2f5b00=_0x308684['SkillsStatesCore'][_0x3ce9a4(0x4a8)](_0x54f5e6);return _0x2f5b00['includes'](this[_0x3ce9a4(0x416)]());}if(_0x56968a[_0x3ce9a4(0x213)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x4ed881=_0x3bcb09(_0x1ae1b0['$1'])[_0x3ce9a4(0x3b2)](',')['map'](_0x41dd97=>_0x41dd97[_0x3ce9a4(0x259)]()),_0x26216e=_0x14dd98['SkillsStatesCore'][_0x3ce9a4(0x4a8)](_0x4ed881);let _0x227421=[this['currentClass']()];return _0x546f79[_0x3ce9a4(0x402)]&&this[_0x3ce9a4(0x3de)]&&(_0x227421=this[_0x3ce9a4(0x3de)]()),_0x26216e['filter'](_0x202510=>_0x227421['includes'](_0x202510))[_0x3ce9a4(0x40b)]>0x0;}return _0x3b6182['prototype']['meetsPassiveStateConditionClasses'][_0x3ce9a4(0x211)](this,_0x483346);}else{const _0x3af36d=[_0x4e0bf4];for(const _0x410998 of _0xc71bd4){_0x410998['match'](/<REMOVE OTHER (.*) STATES>/i);const _0x22c9f7=String(RegExp['$1']);this[_0x3ce9a4(0x2a7)](_0x22c9f7,_0x3af36d);}}}},VisuMZ['SkillsStatesCore'][_0xc329de(0x250)]=Game_Battler[_0xc329de(0x305)][_0xc329de(0x37b)],Game_Battler['prototype'][_0xc329de(0x37b)]=function(_0x57df77,_0x26881e){const _0x3df54f=_0xc329de;VisuMZ[_0x3df54f(0x383)][_0x3df54f(0x250)][_0x3df54f(0x211)](this,_0x57df77,_0x26881e),this[_0x3df54f(0x4f9)](_0x57df77)&&this[_0x3df54f(0x26c)](_0x57df77,_0x26881e);},Game_Battler['prototype'][_0xc329de(0x2e0)]=function(_0x1a3ea9){},VisuMZ[_0xc329de(0x383)][_0xc329de(0x330)]=Game_Battler['prototype'][_0xc329de(0x235)],Game_Battler[_0xc329de(0x305)][_0xc329de(0x235)]=function(_0xfb04d0,_0x5ca4d0){const _0x549c71=_0xc329de;VisuMZ[_0x549c71(0x383)]['Game_Battler_addDebuff'][_0x549c71(0x211)](this,_0xfb04d0,_0x5ca4d0),this[_0x549c71(0x3d7)](_0xfb04d0)&&this[_0x549c71(0x227)](_0xfb04d0,_0x5ca4d0);},Game_Battler[_0xc329de(0x305)][_0xc329de(0x3f0)]=function(){const _0x2864be=_0xc329de;for(let _0x5ae6c5=0x0;_0x5ae6c5<this['buffLength']();_0x5ae6c5++){if(this[_0x2864be(0x3ae)](_0x5ae6c5)){if(_0x2864be(0x354)==='VCadF')this[_0x2864be(0x4c0)](_0x3652d8,_0x5b1621);else{const _0x1cdc9e=this['_buffs'][_0x5ae6c5];this[_0x2864be(0x1d1)](_0x5ae6c5);if(_0x1cdc9e>0x0)this[_0x2864be(0x2d4)](_0x5ae6c5);if(_0x1cdc9e<0x0)this[_0x2864be(0x315)](_0x5ae6c5);}}}},Game_Battler[_0xc329de(0x305)][_0xc329de(0x26c)]=function(_0x35441b,_0x1a837b){const _0x39364b=_0xc329de;this[_0x39364b(0x4c0)](_0x35441b,_0x1a837b);},Game_Battler[_0xc329de(0x305)][_0xc329de(0x227)]=function(_0x3077dc,_0x579a1a){const _0x520617=_0xc329de;this[_0x520617(0x340)](_0x3077dc,_0x579a1a);},Game_Battler['prototype'][_0xc329de(0x49a)]=function(_0xdb5e31){const _0x41f95c=_0xc329de;Game_BattlerBase['prototype'][_0x41f95c(0x49a)][_0x41f95c(0x211)](this,_0xdb5e31),this[_0x41f95c(0x29f)](_0xdb5e31);},Game_Battler['prototype'][_0xc329de(0x2fa)]=function(_0xec8ffa){const _0x2033cc=_0xc329de;Game_BattlerBase[_0x2033cc(0x305)]['onEraseDebuff'][_0x2033cc(0x211)](this,_0xec8ffa),this[_0x2033cc(0x413)](_0xec8ffa);},Game_Battler[_0xc329de(0x305)][_0xc329de(0x2d4)]=function(_0x270816){const _0x5c1303=_0xc329de;this[_0x5c1303(0x492)](_0x270816);},Game_Battler[_0xc329de(0x305)][_0xc329de(0x315)]=function(_0x469566){this['onExpireDebuffGlobalJS'](_0x469566);},Game_Battler[_0xc329de(0x305)]['onAddBuffGlobalJS']=function(_0x44f887,_0x742dde){const _0x590064=_0xc329de;VisuMZ[_0x590064(0x383)][_0x590064(0x43a)][_0x590064(0x3bf)][_0x590064(0x3f8)][_0x590064(0x211)](this,_0x44f887,_0x742dde);},Game_Battler[_0xc329de(0x305)][_0xc329de(0x340)]=function(_0x28e8ef,_0x4d7e87){const _0x3f01b8=_0xc329de;VisuMZ[_0x3f01b8(0x383)][_0x3f01b8(0x43a)][_0x3f01b8(0x3bf)][_0x3f01b8(0x297)]['call'](this,_0x28e8ef,_0x4d7e87);},Game_BattlerBase['prototype'][_0xc329de(0x29f)]=function(_0x211ff2){const _0x221d8e=_0xc329de;VisuMZ[_0x221d8e(0x383)]['Settings']['Buffs']['onEraseBuffJS']['call'](this,_0x211ff2);},Game_BattlerBase[_0xc329de(0x305)][_0xc329de(0x413)]=function(_0x1ea6c7){const _0x394708=_0xc329de;VisuMZ[_0x394708(0x383)][_0x394708(0x43a)][_0x394708(0x3bf)][_0x394708(0x279)][_0x394708(0x211)](this,_0x1ea6c7);},Game_Battler[_0xc329de(0x305)]['onExpireBuffGlobalJS']=function(_0x1476a5){const _0x24d7b1=_0xc329de;VisuMZ[_0x24d7b1(0x383)][_0x24d7b1(0x43a)]['Buffs']['onExpireBuffJS'][_0x24d7b1(0x211)](this,_0x1476a5);},Game_Battler[_0xc329de(0x305)][_0xc329de(0x1da)]=function(_0x52b77b){const _0x2d127c=_0xc329de;VisuMZ[_0x2d127c(0x383)][_0x2d127c(0x43a)][_0x2d127c(0x3bf)]['onExpireDebuffJS'][_0x2d127c(0x211)](this,_0x52b77b);},Game_Battler[_0xc329de(0x305)][_0xc329de(0x3c8)]=function(_0x1df276){const _0x599191=_0xc329de,_0x35f901=VisuMZ[_0x599191(0x383)],_0x5e6bc1=[_0x599191(0x410),_0x599191(0x4d5),'stateMpSlipDamageJS',_0x599191(0x461),_0x599191(0x1cb),_0x599191(0x2ee)];for(const _0x2dd6e1 of _0x5e6bc1){_0x35f901[_0x2dd6e1][_0x1df276]&&_0x35f901[_0x2dd6e1][_0x1df276]['call'](this,_0x1df276);}},VisuMZ[_0xc329de(0x383)][_0xc329de(0x368)]=Game_Battler[_0xc329de(0x305)][_0xc329de(0x322)],Game_Battler[_0xc329de(0x305)]['regenerateAll']=function(){const _0x55c505=_0xc329de;this['recalculateSlipDamageJS'](),VisuMZ[_0x55c505(0x383)][_0x55c505(0x368)][_0x55c505(0x211)](this),this['setPassiveStateSlipDamageJS'](),this[_0x55c505(0x476)]();},Game_Battler[_0xc329de(0x305)][_0xc329de(0x472)]=function(){const _0x52f763=_0xc329de;for(const _0x577994 of this['passiveStates']()){if(_0x52f763(0x230)!==_0x52f763(0x230)){if(_0x543cdd[_0x52f763(0x4f1)](_0x101fe0))return![];}else{if(!_0x577994)continue;this[_0x52f763(0x3c8)](_0x577994['id']);}}},Game_Battler['prototype'][_0xc329de(0x4ca)]=function(){const _0x2e796f=_0xc329de;for(const _0x35fa4d of this[_0x2e796f(0x298)]()){if(!_0x35fa4d)continue;_0x35fa4d['note']['match'](/<JS SLIP REFRESH>/i)&&this[_0x2e796f(0x3c8)](_0x35fa4d['id']);}},Game_Battler['prototype'][_0xc329de(0x476)]=function(){const _0xcdfcf2=_0xc329de;if(!this[_0xcdfcf2(0x238)]())return;const _0x38b9eb=this['states']();for(const _0x4da2ec of _0x38b9eb){if(!_0x4da2ec)continue;this['onRegenerateCustomStateDamageOverTime'](_0x4da2ec);}},Game_Battler['prototype'][_0xc329de(0x286)]=function(_0x512637){const _0xf3ce3b=_0xc329de,_0x128207=this[_0xf3ce3b(0x483)](_0x512637['id'],_0xf3ce3b(0x404))||0x0,_0x2feb68=-this['maxSlipDamage'](),_0xd4593d=Math[_0xf3ce3b(0x313)](_0x128207,_0x2feb68);if(_0xd4593d!==0x0){if(_0xf3ce3b(0x4dd)===_0xf3ce3b(0x4dd)){const _0x5b9d78=this[_0xf3ce3b(0x46e)][_0xf3ce3b(0x3e8)]||0x0;this[_0xf3ce3b(0x30f)](_0xd4593d),this[_0xf3ce3b(0x46e)][_0xf3ce3b(0x3e8)]+=_0x5b9d78;}else return'<actor-%1>'[_0xf3ce3b(0x3bb)](_0x20467b[_0xf3ce3b(0x398)]());}const _0x3f6924=this[_0xf3ce3b(0x483)](_0x512637['id'],_0xf3ce3b(0x434))||0x0;if(_0x3f6924!==0x0){if('JVZeC'===_0xf3ce3b(0x37e)){const _0x2690a6=this[_0xf3ce3b(0x46e)][_0xf3ce3b(0x23f)]||0x0;this['gainMp'](_0x3f6924),this['_result']['mpDamage']+=_0x2690a6;}else _0x487df1['categories'][_0xf3ce3b(0x34e)](_0x12f367[_0xf3ce3b(0x259)]());}const _0x37a26b=this[_0xf3ce3b(0x483)](_0x512637['id'],_0xf3ce3b(0x457))||0x0;_0x37a26b!==0x0&&(_0xf3ce3b(0x42a)==='uISJd'?(_0x14c442['SkillsStatesCore'][_0xf3ce3b(0x2bc)][_0xf3ce3b(0x211)](this,_0xb4273),this[_0xf3ce3b(0x4ba)](_0x5b937a)):this[_0xf3ce3b(0x347)](_0x37a26b));},VisuMZ[_0xc329de(0x383)][_0xc329de(0x360)]=Game_Actor[_0xc329de(0x305)][_0xc329de(0x3d6)],Game_Actor[_0xc329de(0x305)][_0xc329de(0x3d6)]=function(){const _0x26c21e=_0xc329de,_0x34603e=VisuMZ[_0x26c21e(0x383)][_0x26c21e(0x360)][_0x26c21e(0x211)](this),_0x12b7e9=VisuMZ[_0x26c21e(0x383)]['Settings']['Skills'];let _0x17b560=_0x12b7e9['HiddenSkillTypes'];if($gameParty[_0x26c21e(0x1f2)]()){if(_0x26c21e(0x28a)===_0x26c21e(0x28a))_0x17b560=_0x17b560[_0x26c21e(0x349)](_0x12b7e9[_0x26c21e(0x49d)]);else{const _0x320d8f=new _0x330bca(0x0,0x0,_0x7a0eda[_0x26c21e(0x2ec)],_0x1df73b[_0x26c21e(0x4ac)]);this[_0x26c21e(0x1e3)]=new _0x134746(_0x320d8f),this[_0x26c21e(0x1e3)][_0x26c21e(0x42c)]=0x0,this[_0x26c21e(0x4ec)](this[_0x26c21e(0x1e3)]),this[_0x26c21e(0x30b)]();}}return _0x34603e['filter'](_0x490a99=>!_0x17b560[_0x26c21e(0x358)](_0x490a99));},Game_Actor[_0xc329de(0x305)][_0xc329de(0x223)]=function(){const _0x7cd870=_0xc329de;return this[_0x7cd870(0x3ab)]()[_0x7cd870(0x38e)](_0x424361=>this[_0x7cd870(0x477)](_0x424361));},Game_Actor[_0xc329de(0x305)][_0xc329de(0x477)]=function(_0x1fef8a){const _0x43d6b2=_0xc329de;if(!this[_0x43d6b2(0x3dc)](_0x1fef8a))return![];if(!_0x1fef8a)return![];if(!this[_0x43d6b2(0x4cc)](_0x1fef8a))return![];if(this[_0x43d6b2(0x2d8)](_0x1fef8a))return![];return!![];},Game_Actor['prototype'][_0xc329de(0x4cc)]=function(_0x3256d0){const _0x2ca24a=_0xc329de,_0x49f423=this[_0x2ca24a(0x3d6)](),_0x18751b=DataManager[_0x2ca24a(0x317)](_0x3256d0),_0x45207d=_0x49f423['filter'](_0x152680=>_0x18751b[_0x2ca24a(0x358)](_0x152680));return _0x45207d[_0x2ca24a(0x40b)]>0x0;},Game_Actor['prototype']['isSkillHidden']=function(_0x460dd8){const _0x249b1f=_0xc329de;if(!VisuMZ[_0x249b1f(0x383)][_0x249b1f(0x2e6)](this,_0x460dd8))return!![];if(!VisuMZ[_0x249b1f(0x383)][_0x249b1f(0x39f)](this,_0x460dd8))return!![];if(!VisuMZ[_0x249b1f(0x383)]['CheckVisibleSkillNotetags'](this,_0x460dd8))return!![];return![];},Game_Actor[_0xc329de(0x305)][_0xc329de(0x452)]=function(){const _0x17e3a9=_0xc329de;let _0x88f73d=[this[_0x17e3a9(0x4f5)](),this['currentClass']()];_0x88f73d=_0x88f73d[_0x17e3a9(0x349)](this[_0x17e3a9(0x2b1)]()[_0x17e3a9(0x38e)](_0x391e98=>_0x391e98));for(const _0x80c99f of this['_skills']){if('aKUJs'===_0x17e3a9(0x224))return _0x1c24b3(_0x4f7a36['$1']);else{const _0x59a53f=$dataSkills[_0x80c99f];if(_0x59a53f)_0x88f73d[_0x17e3a9(0x34e)](_0x59a53f);}}return _0x88f73d;},Game_Actor[_0xc329de(0x305)]['addPassiveStatesByPluginParameters']=function(){const _0x28efa=_0xc329de;Game_Battler[_0x28efa(0x305)]['addPassiveStatesByPluginParameters'][_0x28efa(0x211)](this);const _0x43ddb8=VisuMZ[_0x28efa(0x383)][_0x28efa(0x43a)][_0x28efa(0x2c3)][_0x28efa(0x25a)];this[_0x28efa(0x4f8)]['passiveStates']=this[_0x28efa(0x4f8)][_0x28efa(0x31f)][_0x28efa(0x349)](_0x43ddb8);},VisuMZ['SkillsStatesCore'][_0xc329de(0x4ef)]=Game_Actor[_0xc329de(0x305)]['learnSkill'],Game_Actor[_0xc329de(0x305)]['learnSkill']=function(_0x2804ff){const _0x225004=_0xc329de;VisuMZ[_0x225004(0x383)][_0x225004(0x4ef)][_0x225004(0x211)](this,_0x2804ff),this[_0x225004(0x4f8)]={};},VisuMZ[_0xc329de(0x383)][_0xc329de(0x21d)]=Game_Actor['prototype'][_0xc329de(0x1ce)],Game_Actor[_0xc329de(0x305)]['forgetSkill']=function(_0x209fc3){const _0x2d94e1=_0xc329de;VisuMZ['SkillsStatesCore'][_0x2d94e1(0x21d)][_0x2d94e1(0x211)](this,_0x209fc3),this['_cache']={};},Game_Actor[_0xc329de(0x305)][_0xc329de(0x21b)]=function(){const _0x9c9b1c=_0xc329de;return VisuMZ['SkillsStatesCore'][_0x9c9b1c(0x43a)]['States'][_0x9c9b1c(0x43d)]??0x14;},Game_Enemy['prototype'][_0xc329de(0x452)]=function(){const _0x3ea007=_0xc329de;let _0x16a0ad=[this[_0x3ea007(0x47b)]()];return _0x16a0ad[_0x3ea007(0x349)](this[_0x3ea007(0x3ab)]());},Game_Enemy[_0xc329de(0x305)][_0xc329de(0x37d)]=function(){const _0x24030c=_0xc329de;Game_Battler[_0x24030c(0x305)][_0x24030c(0x37d)][_0x24030c(0x211)](this);const _0x432618=VisuMZ['SkillsStatesCore'][_0x24030c(0x43a)][_0x24030c(0x2c3)][_0x24030c(0x30d)];this[_0x24030c(0x4f8)][_0x24030c(0x31f)]=this[_0x24030c(0x4f8)][_0x24030c(0x31f)][_0x24030c(0x349)](_0x432618);},Game_Enemy[_0xc329de(0x305)]['skills']=function(){const _0x567d6a=_0xc329de,_0x1861ee=[];for(const _0x438f6c of this[_0x567d6a(0x47b)]()[_0x567d6a(0x39d)]){if(_0x567d6a(0x49b)!==_0x567d6a(0x4c9)){const _0x3929ee=$dataSkills[_0x438f6c['skillId']];if(_0x3929ee&&!_0x1861ee[_0x567d6a(0x358)](_0x3929ee))_0x1861ee['push'](_0x3929ee);}else{const _0x1f3017=_0x301892(_0x24e3b7['$1']);if(_0x1f3017===_0x4851b6[_0x567d6a(0x4a4)]()){if(_0x13e47a[_0x567d6a(0x213)](/<member-(\d+)>/i))return _0x402536[_0x567d6a(0x33d)]()[_0xc500e3(_0x4ebc85['$1'])];}}}return _0x1861ee;},Game_Enemy[_0xc329de(0x305)][_0xc329de(0x4a1)]=function(_0x120560){const _0x4d5f37=_0xc329de;return this[_0x4d5f37(0x23c)]($dataStates[_0x120560]);},VisuMZ[_0xc329de(0x383)][_0xc329de(0x341)]=Game_Unit[_0xc329de(0x305)][_0xc329de(0x2ac)],Game_Unit[_0xc329de(0x305)][_0xc329de(0x2ac)]=function(){const _0x259469=_0xc329de;if(this[_0x259469(0x201)]())return!![];return VisuMZ[_0x259469(0x383)][_0x259469(0x341)]['call'](this);},Game_Unit['prototype'][_0xc329de(0x201)]=function(){const _0x405768=_0xc329de,_0xa9db72=this[_0x405768(0x4d2)]();for(const _0x276159 of _0xa9db72){if(!_0x276159[_0x405768(0x218)]())return![];}return!![];},VisuMZ[_0xc329de(0x383)]['Game_Troop_setup']=Game_Troop[_0xc329de(0x305)][_0xc329de(0x447)],Game_Troop['prototype'][_0xc329de(0x447)]=function(_0x51d3c2){const _0x536f44=_0xc329de;VisuMZ[_0x536f44(0x383)][_0x536f44(0x290)]['call'](this,_0x51d3c2),this[_0x536f44(0x219)]();},Game_Troop['prototype'][_0xc329de(0x219)]=function(){const _0x3a6571=_0xc329de;this[_0x3a6571(0x261)]=Graphics[_0x3a6571(0x485)];},Game_Troop['prototype'][_0xc329de(0x4a4)]=function(){const _0x12f5b0=_0xc329de;return this['_currentTroopUniqueID']=this[_0x12f5b0(0x261)]||Graphics['frameCount'],this[_0x12f5b0(0x261)];},Scene_Skill['prototype']['isBottomHelpMode']=function(){const _0x51daa3=_0xc329de;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x51daa3(0x306)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x51daa3(0x1fb)]()[_0x51daa3(0x213)](/LOWER/i);else Scene_ItemBase[_0x51daa3(0x305)][_0x51daa3(0x3a9)][_0x51daa3(0x211)](this);}},Scene_Skill[_0xc329de(0x305)]['isRightInputMode']=function(){const _0x3b2d05=_0xc329de;if(ConfigManager[_0x3b2d05(0x263)]&&ConfigManager[_0x3b2d05(0x267)]!==undefined){if('HKUxh'!==_0x3b2d05(0x419))return ConfigManager[_0x3b2d05(0x267)];else _0xf8ae6e['prototype']['drawActorStateTurns'][_0x3b2d05(0x211)](this,_0x56f27a,_0xc78992,0x0,0x0),_0x767492[_0x3b2d05(0x305)]['drawActorStateData']['call'](this,_0x5273ce,_0x37d155,0x0,0x0);}else return this[_0x3b2d05(0x3c4)]()?this[_0x3b2d05(0x1fb)]()[_0x3b2d05(0x213)](/RIGHT/i):Scene_ItemBase[_0x3b2d05(0x305)][_0x3b2d05(0x3a9)][_0x3b2d05(0x211)](this);},Scene_Skill[_0xc329de(0x305)][_0xc329de(0x1fb)]=function(){const _0x535634=_0xc329de;return VisuMZ['SkillsStatesCore'][_0x535634(0x43a)][_0x535634(0x2af)]['LayoutStyle'];},Scene_Skill[_0xc329de(0x305)][_0xc329de(0x1df)]=function(){const _0x3f28db=_0xc329de;return this[_0x3f28db(0x359)]&&this['_categoryWindow'][_0x3f28db(0x1df)]();},Scene_Skill[_0xc329de(0x305)][_0xc329de(0x3c4)]=function(){const _0x5cf749=_0xc329de;return VisuMZ['SkillsStatesCore'][_0x5cf749(0x43a)]['Skills'][_0x5cf749(0x26f)];},VisuMZ[_0xc329de(0x383)][_0xc329de(0x429)]=Scene_Skill[_0xc329de(0x305)]['helpWindowRect'],Scene_Skill['prototype']['helpWindowRect']=function(){const _0x46c07d=_0xc329de;if(this[_0x46c07d(0x3c4)]()){if(_0x46c07d(0x2a0)!==_0x46c07d(0x1eb))return this['helpWindowRectSkillsStatesCore']();else{const _0x2a698c=_0x3c0524[_0x46c07d(0x45d)]('['+_0x5cffb5['$1'][_0x46c07d(0x213)](/\d+/g)+']');for(const _0x3cec95 of _0x2a698c){if(!_0x2021fe[_0x46c07d(0x401)](_0x3cec95))return![];}return!![];}}else return VisuMZ[_0x46c07d(0x383)][_0x46c07d(0x429)][_0x46c07d(0x211)](this);},Scene_Skill['prototype'][_0xc329de(0x4db)]=function(){const _0x513c3d=_0xc329de,_0x4db56b=0x0,_0x59ff44=this[_0x513c3d(0x3ca)](),_0x13d539=Graphics[_0x513c3d(0x4ae)],_0x710f71=this[_0x513c3d(0x409)]();return new Rectangle(_0x4db56b,_0x59ff44,_0x13d539,_0x710f71);},VisuMZ[_0xc329de(0x383)][_0xc329de(0x206)]=Scene_Skill['prototype'][_0xc329de(0x275)],Scene_Skill[_0xc329de(0x305)][_0xc329de(0x275)]=function(){const _0x386f1d=_0xc329de;return this[_0x386f1d(0x3c4)]()?this[_0x386f1d(0x3ba)]():VisuMZ[_0x386f1d(0x383)][_0x386f1d(0x206)][_0x386f1d(0x211)](this);},Scene_Skill[_0xc329de(0x305)][_0xc329de(0x3ba)]=function(){const _0x1b6116=_0xc329de,_0x3fb3df=this['mainCommandWidth'](),_0x19f504=this['calcWindowHeight'](0x3,!![]),_0x7f4353=this[_0x1b6116(0x3a9)]()?Graphics[_0x1b6116(0x4ae)]-_0x3fb3df:0x0,_0x9da722=this[_0x1b6116(0x3e5)]();return new Rectangle(_0x7f4353,_0x9da722,_0x3fb3df,_0x19f504);},VisuMZ[_0xc329de(0x383)]['Scene_Skill_statusWindowRect']=Scene_Skill['prototype'][_0xc329de(0x22e)],Scene_Skill[_0xc329de(0x305)][_0xc329de(0x22e)]=function(){const _0x384948=_0xc329de;if(this['isUseSkillsStatesCoreUpdatedLayout']())return _0x384948(0x381)!==_0x384948(0x496)?this[_0x384948(0x4e1)]():this['updatedLayoutStyle']()[_0x384948(0x213)](/LOWER/i);else{if(_0x384948(0x1ff)!==_0x384948(0x1ff)){if(this[_0x384948(0x3ae)](_0xb9e563)){const _0x453b33=this[_0x384948(0x453)][_0x4ab851];this['removeBuff'](_0x505ac1);if(_0x453b33>0x0)this['onExpireBuff'](_0x247088);if(_0x453b33<0x0)this[_0x384948(0x315)](_0x28ba62);}}else return VisuMZ[_0x384948(0x383)][_0x384948(0x2d9)][_0x384948(0x211)](this);}},Scene_Skill[_0xc329de(0x305)]['statusWindowRectSkillsStatesCore']=function(){const _0x18ac9c=_0xc329de,_0x545fd1=Graphics[_0x18ac9c(0x4ae)]-this[_0x18ac9c(0x446)](),_0x4a9743=this[_0x18ac9c(0x436)][_0x18ac9c(0x4ac)],_0x29c03a=this[_0x18ac9c(0x3a9)]()?0x0:Graphics[_0x18ac9c(0x4ae)]-_0x545fd1,_0x154b89=this['mainAreaTop']();return new Rectangle(_0x29c03a,_0x154b89,_0x545fd1,_0x4a9743);},VisuMZ['SkillsStatesCore'][_0xc329de(0x4e8)]=Scene_Skill[_0xc329de(0x305)]['createItemWindow'],Scene_Skill[_0xc329de(0x305)][_0xc329de(0x1ed)]=function(){const _0x2478e5=_0xc329de;VisuMZ[_0x2478e5(0x383)][_0x2478e5(0x4e8)]['call'](this);if(this[_0x2478e5(0x233)]()){if(_0x2478e5(0x465)===_0x2478e5(0x465))this[_0x2478e5(0x41f)]();else{let _0x3fdbe5=_0x2478e5(0x252);if(this['checkCacheKey'](_0x3fdbe5))return this[_0x2478e5(0x4f8)][_0x3fdbe5][_0x2478e5(0x358)](_0x304967);return this['_cache'][_0x3fdbe5]=this['makeResistedStateCategories'](),this[_0x2478e5(0x4f8)][_0x3fdbe5][_0x2478e5(0x358)](_0x4622cd);}}},VisuMZ[_0xc329de(0x383)]['Scene_Skill_itemWindowRect']=Scene_Skill[_0xc329de(0x305)]['itemWindowRect'],Scene_Skill[_0xc329de(0x305)][_0xc329de(0x323)]=function(){const _0x1f581c=_0xc329de;if(this[_0x1f581c(0x3c4)]())return this[_0x1f581c(0x316)]();else{const _0x423e93=VisuMZ['SkillsStatesCore']['Scene_Skill_itemWindowRect'][_0x1f581c(0x211)](this);return this[_0x1f581c(0x233)]()&&this[_0x1f581c(0x37f)]()&&(_0x423e93[_0x1f581c(0x2ec)]-=this[_0x1f581c(0x20e)]()),_0x423e93;}},Scene_Skill['prototype'][_0xc329de(0x316)]=function(){const _0x439fbf=_0xc329de,_0x5992f0=Graphics[_0x439fbf(0x4ae)]-this['shopStatusWidth'](),_0x38c0a6=this['mainAreaHeight']()-this[_0x439fbf(0x25b)][_0x439fbf(0x4ac)],_0x41684c=this['isRightInputMode']()?Graphics[_0x439fbf(0x4ae)]-_0x5992f0:0x0,_0x90ad11=this[_0x439fbf(0x25b)]['y']+this[_0x439fbf(0x25b)][_0x439fbf(0x4ac)];return new Rectangle(_0x41684c,_0x90ad11,_0x5992f0,_0x38c0a6);},Scene_Skill['prototype'][_0xc329de(0x233)]=function(){const _0x5ceee5=_0xc329de;if(!Imported['VisuMZ_1_ItemsEquipsCore'])return![];else{if(this[_0x5ceee5(0x3c4)]()){if('XsxLQ'!=='XsxLQ'){if(_0x9cbb37['value'](_0x103951))return![];}else return!![];}else{if(_0x5ceee5(0x220)!=='tavGX')return VisuMZ[_0x5ceee5(0x383)][_0x5ceee5(0x43a)][_0x5ceee5(0x2af)]['ShowShopStatus'];else this[_0x5ceee5(0x25b)]=_0x57ef56,this['callUpdateHelp']();}}},Scene_Skill[_0xc329de(0x305)][_0xc329de(0x37f)]=function(){const _0x1d9f9d=_0xc329de;return VisuMZ['SkillsStatesCore'][_0x1d9f9d(0x43a)][_0x1d9f9d(0x2af)][_0x1d9f9d(0x318)];},Scene_Skill[_0xc329de(0x305)][_0xc329de(0x41f)]=function(){const _0x1fb648=_0xc329de,_0x5eccbe=this[_0x1fb648(0x482)]();this[_0x1fb648(0x45f)]=new Window_ShopStatus(_0x5eccbe),this['addWindow'](this['_shopStatusWindow']),this[_0x1fb648(0x445)][_0x1fb648(0x221)](this['_shopStatusWindow']);const _0x29d08e=VisuMZ[_0x1fb648(0x383)][_0x1fb648(0x43a)]['Skills'][_0x1fb648(0x47f)];this['_shopStatusWindow'][_0x1fb648(0x34a)](_0x29d08e||0x0);},Scene_Skill[_0xc329de(0x305)]['shopStatusWindowRect']=function(){const _0xaee323=_0xc329de;return this[_0xaee323(0x3c4)]()?this['shopStatusWindowRectSkillsStatesCore']():VisuMZ[_0xaee323(0x383)][_0xaee323(0x43a)][_0xaee323(0x2af)][_0xaee323(0x240)][_0xaee323(0x211)](this);},Scene_Skill['prototype'][_0xc329de(0x328)]=function(){const _0xce762f=_0xc329de,_0x2ce85d=this[_0xce762f(0x20e)](),_0x613759=this[_0xce762f(0x445)][_0xce762f(0x4ac)],_0x22b527=this[_0xce762f(0x3a9)]()?0x0:Graphics[_0xce762f(0x4ae)]-this[_0xce762f(0x20e)](),_0x346aaf=this[_0xce762f(0x445)]['y'];return new Rectangle(_0x22b527,_0x346aaf,_0x2ce85d,_0x613759);},Scene_Skill[_0xc329de(0x305)][_0xc329de(0x20e)]=function(){const _0x33de17=_0xc329de;if(Imported[_0x33de17(0x3b3)])return Scene_Shop['prototype'][_0x33de17(0x288)]();else{if(_0x33de17(0x325)===_0x33de17(0x325))return 0x0;else this[_0x33de17(0x44c)][_0x33de17(0x269)][_0x33de17(0x211)](this);}},Scene_Skill[_0xc329de(0x305)][_0xc329de(0x42d)]=function(){const _0x4962b0=_0xc329de;return this[_0x4962b0(0x436)]&&this[_0x4962b0(0x436)][_0x4962b0(0x373)]?TextManager[_0x4962b0(0x458)]:'';},VisuMZ[_0xc329de(0x383)][_0xc329de(0x3b1)]=Sprite_Gauge[_0xc329de(0x305)][_0xc329de(0x3df)],Sprite_Gauge[_0xc329de(0x305)]['initMembers']=function(){const _0x2238ac=_0xc329de;VisuMZ[_0x2238ac(0x383)]['Sprite_Gauge_initMembers']['call'](this),this[_0x2238ac(0x44c)]=null;},VisuMZ[_0xc329de(0x383)][_0xc329de(0x33e)]=Sprite_Gauge[_0xc329de(0x305)][_0xc329de(0x447)],Sprite_Gauge['prototype'][_0xc329de(0x447)]=function(_0x506c83,_0x54d352){const _0xf2847e=_0xc329de;this[_0xf2847e(0x283)](_0x506c83,_0x54d352),_0x54d352=_0x54d352['toLowerCase'](),VisuMZ[_0xf2847e(0x383)]['Sprite_Gauge_setup'][_0xf2847e(0x211)](this,_0x506c83,_0x54d352);},Sprite_Gauge[_0xc329de(0x305)][_0xc329de(0x283)]=function(_0x426595,_0x39c826){const _0x4db377=_0xc329de,_0x48661d=VisuMZ[_0x4db377(0x383)][_0x4db377(0x43a)][_0x4db377(0x371)][_0x4db377(0x38e)](_0x5290ba=>_0x5290ba[_0x4db377(0x372)]['toUpperCase']()===_0x39c826[_0x4db377(0x4ad)]());_0x48661d[_0x4db377(0x40b)]>=0x1?this['_costSettings']=_0x48661d[0x0]:this['_costSettings']=null;},VisuMZ[_0xc329de(0x383)]['Sprite_Gauge_currentValue']=Sprite_Gauge['prototype']['currentValue'],Sprite_Gauge[_0xc329de(0x305)]['currentValue']=function(){const _0x28fa53=_0xc329de;if(this[_0x28fa53(0x386)]&&this[_0x28fa53(0x44c)]){if(_0x28fa53(0x35e)==='TWlhN')return this[_0x28fa53(0x1e8)]();else this[_0x28fa53(0x3d2)][_0xc3e286]=_0xa3172d['SkillsStatesCore'][_0x28fa53(0x43a)]['States']['MaxTurns'];}else return VisuMZ['SkillsStatesCore']['Sprite_Gauge_currentValue'][_0x28fa53(0x211)](this);},Sprite_Gauge[_0xc329de(0x305)]['currentValueSkillsStatesCore']=function(){const _0x55bb0b=_0xc329de;return this['_costSettings'][_0x55bb0b(0x20d)][_0x55bb0b(0x211)](this['_battler']);},VisuMZ['SkillsStatesCore'][_0xc329de(0x4c5)]=Sprite_Gauge['prototype'][_0xc329de(0x27e)],Sprite_Gauge[_0xc329de(0x305)][_0xc329de(0x27e)]=function(){const _0x3435bf=_0xc329de;return this[_0x3435bf(0x386)]&&this[_0x3435bf(0x44c)]?this[_0x3435bf(0x42e)]():VisuMZ[_0x3435bf(0x383)][_0x3435bf(0x4c5)][_0x3435bf(0x211)](this);},Sprite_Gauge[_0xc329de(0x305)][_0xc329de(0x42e)]=function(){const _0x18f092=_0xc329de;return this[_0x18f092(0x44c)][_0x18f092(0x497)][_0x18f092(0x211)](this[_0x18f092(0x386)]);},VisuMZ[_0xc329de(0x383)]['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0xc329de(0x305)][_0xc329de(0x39e)],Sprite_Gauge['prototype'][_0xc329de(0x39e)]=function(){const _0x1af5f9=_0xc329de,_0x833f04=VisuMZ[_0x1af5f9(0x383)]['Sprite_Gauge_gaugeRate'][_0x1af5f9(0x211)](this);return _0x833f04[_0x1af5f9(0x375)](0x0,0x1);},VisuMZ[_0xc329de(0x383)]['Sprite_Gauge_redraw']=Sprite_Gauge[_0xc329de(0x305)][_0xc329de(0x343)],Sprite_Gauge[_0xc329de(0x305)][_0xc329de(0x343)]=function(){const _0x13bd85=_0xc329de;this[_0x13bd85(0x386)]&&this[_0x13bd85(0x44c)]?(this[_0x13bd85(0x45a)][_0x13bd85(0x332)](),this['redrawSkillsStatesCore']()):VisuMZ[_0x13bd85(0x383)][_0x13bd85(0x481)][_0x13bd85(0x211)](this);},Sprite_Gauge['prototype'][_0xc329de(0x2a1)]=function(){const _0x3fc850=_0xc329de;let _0x2b6fb9=this[_0x3fc850(0x2d3)]();return Imported['VisuMZ_0_CoreEngine']&&this[_0x3fc850(0x3ff)]()&&(_0x2b6fb9=VisuMZ[_0x3fc850(0x229)](_0x2b6fb9)),_0x2b6fb9;},Sprite_Gauge[_0xc329de(0x305)][_0xc329de(0x467)]=function(){const _0x2354fb=_0xc329de;this['_costSettings']['GaugeDrawJS'][_0x2354fb(0x211)](this);},Sprite_Gauge[_0xc329de(0x305)]['drawFullGauge']=function(_0x148714,_0x2b0495,_0x1600f6,_0x550017,_0x4274dc,_0x40e94e){const _0x2593b7=_0xc329de,_0x37c006=this[_0x2593b7(0x39e)](),_0x357a07=Math[_0x2593b7(0x428)]((_0x4274dc-0x2)*_0x37c006),_0x1279bf=_0x40e94e-0x2,_0x5c19e1=this[_0x2593b7(0x4b3)]();this[_0x2593b7(0x45a)][_0x2593b7(0x3e1)](_0x1600f6,_0x550017,_0x4274dc,_0x40e94e,_0x5c19e1),this[_0x2593b7(0x45a)][_0x2593b7(0x466)](_0x1600f6+0x1,_0x550017+0x1,_0x357a07,_0x1279bf,_0x148714,_0x2b0495);},Sprite_Gauge[_0xc329de(0x305)][_0xc329de(0x23b)]=function(){const _0x2c296b=_0xc329de,_0x1e380d=VisuMZ[_0x2c296b(0x383)]['Settings']['Gauge'];if(_0x1e380d['LabelFontMainType']==='number'){if(_0x2c296b(0x425)!==_0x2c296b(0x425)){const _0x5b15ee=_0x1dbd6e[_0x2c296b(0x45d)]('['+_0x4cf23d['$1'][_0x2c296b(0x213)](/\d+/g)+']');for(const _0x4889c1 of _0x5b15ee){if(!_0x39b7a4[_0x2c296b(0x4f1)](_0x4889c1))return![];}return!![];}else return $gameSystem[_0x2c296b(0x3f1)]();}else return $gameSystem['mainFontFace']();},Sprite_Gauge['prototype'][_0xc329de(0x4aa)]=function(){const _0x2f9d14=_0xc329de,_0x2eacf8=VisuMZ[_0x2f9d14(0x383)][_0x2f9d14(0x43a)]['Gauge'];if(_0x2eacf8[_0x2f9d14(0x1dd)]===_0x2f9d14(0x331)){if(_0x2f9d14(0x1f9)==='ipyIu'){const _0x2a2041=this['createAllSkillCostText'](_0x1e36fb,_0x5b6531),_0xfc42dc=this[_0x2f9d14(0x2cd)](_0x2a2041,_0x45bfd1,_0x4ddd98,_0x347dac),_0x354a4e=_0x310afa+_0x37c662-_0xfc42dc[_0x2f9d14(0x2ec)];this[_0x2f9d14(0x30a)](_0x2a2041,_0x354a4e,_0x2e7568,_0x316249),this['resetFontSettings']();}else return $gameSystem['mainFontSize']()-0x6;}else return $gameSystem[_0x2f9d14(0x270)]()-0x2;},Sprite_Gauge[_0xc329de(0x305)]['valueFontFace']=function(){const _0x2835fc=_0xc329de,_0x3b0b66=VisuMZ['SkillsStatesCore'][_0x2835fc(0x43a)][_0x2835fc(0x24a)];return _0x3b0b66[_0x2835fc(0x2f1)]===_0x2835fc(0x331)?'Gjfip'!==_0x2835fc(0x1e6)?this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x2835fc(0x4db)]():_0x3dc780[_0x2835fc(0x383)][_0x2835fc(0x429)][_0x2835fc(0x211)](this):$gameSystem[_0x2835fc(0x3f1)]():_0x2835fc(0x276)===_0x2835fc(0x243)?_0x37b132[_0x17623c['id']][_0x2835fc(0x211)](this,_0x1f207a):$gameSystem['mainFontFace']();},Sprite_Gauge[_0xc329de(0x305)][_0xc329de(0x4e6)]=function(){const _0x50ff3b=_0xc329de,_0x3c6d60=VisuMZ[_0x50ff3b(0x383)][_0x50ff3b(0x43a)][_0x50ff3b(0x24a)];if(_0x3c6d60['ValueFontMainType']===_0x50ff3b(0x331))return $gameSystem[_0x50ff3b(0x270)]()-0x6;else{if(_0x50ff3b(0x2ae)===_0x50ff3b(0x2ae))return $gameSystem[_0x50ff3b(0x270)]()-0x2;else{if(typeof _0x2606b0!=='number')_0x29a2a1=_0x3b4843['id'];if(this[_0x50ff3b(0x212)](_0x53865e)){const _0x534d7d=_0x8ea6a6['stateMaximumTurns'](_0x298489);this[_0x50ff3b(0x342)][_0x18afce]=_0x38dfa2[_0x50ff3b(0x375)](0x0,_0x534d7d);if(this['_stateTurns'][_0x2c05e4]<=0x0)this[_0x50ff3b(0x207)](_0x3237bb);}}}},Sprite_Gauge[_0xc329de(0x305)]['labelColor']=function(){const _0xe6f167=_0xc329de,_0x162324=VisuMZ[_0xe6f167(0x383)][_0xe6f167(0x43a)][_0xe6f167(0x24a)];if(_0x162324['MatchLabelColor']){if(_0x162324[_0xe6f167(0x345)]===0x1)return this[_0xe6f167(0x3f7)]();else{if(_0x162324[_0xe6f167(0x345)]===0x2)return this[_0xe6f167(0x335)]();}}const _0x5d173d=_0x162324[_0xe6f167(0x30c)];return ColorManager[_0xe6f167(0x4d1)](_0x5d173d);},Sprite_Gauge[_0xc329de(0x305)]['labelOutlineColor']=function(){const _0x4427e2=_0xc329de,_0x1d298e=VisuMZ[_0x4427e2(0x383)][_0x4427e2(0x43a)][_0x4427e2(0x24a)];if(this[_0x4427e2(0x24c)]()<=0x0)return _0x4427e2(0x46b)!==_0x4427e2(0x46b)?_0x3796cf['uiHelpPosition']:_0x4427e2(0x387);else{if(_0x1d298e['LabelOutlineSolid'])return _0x4427e2(0x4f4);else{if(_0x4427e2(0x38b)!==_0x4427e2(0x3f3))return ColorManager[_0x4427e2(0x2f0)]();else _0x21580c=_0x481d6d,_0x3667dc+=_0x1d01e3;}}},Sprite_Gauge['prototype'][_0xc329de(0x24c)]=function(){const _0xf3d2c6=_0xc329de;return VisuMZ[_0xf3d2c6(0x383)][_0xf3d2c6(0x43a)][_0xf3d2c6(0x24a)]['LabelOutlineWidth']||0x0;},Sprite_Gauge[_0xc329de(0x305)][_0xc329de(0x4dc)]=function(){const _0x670f5a=_0xc329de,_0x3dffb4=VisuMZ[_0x670f5a(0x383)][_0x670f5a(0x43a)]['Gauge'];if(this['valueOutlineWidth']()<=0x0){if(_0x670f5a(0x418)===_0x670f5a(0x418))return'rgba(0,\x200,\x200,\x200)';else _0x22b48c=_0x5a6ab1[_0x670f5a(0x349)](_0x49a478[_0x670f5a(0x49d)]);}else{if(_0x3dffb4['ValueOutlineSolid']){if('dilvO'!=='yqXrn')return _0x670f5a(0x4f4);else{if(!this[_0x670f5a(0x4fa)])return;const _0x34241b=this[_0x670f5a(0x4fa)][_0x670f5a(0x3d6)]();for(const _0x5e86c6 of _0x34241b){const _0x5f0790=this['makeCommandName'](_0x5e86c6);this[_0x670f5a(0x2c5)](_0x5f0790,_0x670f5a(0x26b),!![],_0x5e86c6);}}}else return ColorManager[_0x670f5a(0x2f0)]();}},Sprite_Gauge[_0xc329de(0x305)][_0xc329de(0x1d0)]=function(){const _0x146256=_0xc329de;return VisuMZ[_0x146256(0x383)][_0x146256(0x43a)][_0x146256(0x24a)][_0x146256(0x48d)]||0x0;},VisuMZ[_0xc329de(0x383)][_0xc329de(0x3b8)]=Sprite_StateIcon['prototype'][_0xc329de(0x40d)],Sprite_StateIcon['prototype']['loadBitmap']=function(){const _0x3e02eb=_0xc329de;VisuMZ[_0x3e02eb(0x383)][_0x3e02eb(0x3b8)][_0x3e02eb(0x211)](this),this[_0x3e02eb(0x394)]();},Sprite_StateIcon[_0xc329de(0x305)][_0xc329de(0x394)]=function(){const _0x397d9c=_0xc329de,_0x55ae22=Window_Base[_0x397d9c(0x305)]['lineHeight']();this['_turnDisplaySprite']=new Sprite(),this[_0x397d9c(0x257)]['bitmap']=new Bitmap(ImageManager[_0x397d9c(0x4de)],_0x55ae22),this[_0x397d9c(0x257)][_0x397d9c(0x432)]['x']=this[_0x397d9c(0x432)]['x'],this[_0x397d9c(0x257)]['anchor']['y']=this[_0x397d9c(0x432)]['y'],this[_0x397d9c(0x4ec)](this['_turnDisplaySprite']),this['contents']=this['_turnDisplaySprite']['bitmap'];},VisuMZ[_0xc329de(0x383)][_0xc329de(0x460)]=Sprite_StateIcon[_0xc329de(0x305)][_0xc329de(0x448)],Sprite_StateIcon[_0xc329de(0x305)]['updateFrame']=function(){const _0x3871cd=_0xc329de;VisuMZ[_0x3871cd(0x383)]['Sprite_StateIcon_updateFrame']['call'](this),this['updateTurnDisplaySprite']();},Sprite_StateIcon[_0xc329de(0x305)][_0xc329de(0x3d4)]=function(_0x4c9be1,_0x22006a,_0xd98b76,_0x2ceb3d,_0xf47a60){const _0x57db9a=_0xc329de;this[_0x57db9a(0x2db)][_0x57db9a(0x3d4)](_0x4c9be1,_0x22006a,_0xd98b76,_0x2ceb3d,this[_0x57db9a(0x2db)][_0x57db9a(0x4ac)],_0xf47a60);},Sprite_StateIcon['prototype']['updateTurnDisplaySprite']=function(){const _0x793222=_0xc329de;this[_0x793222(0x32a)](),this[_0x793222(0x2db)]['clear']();const _0x3cdd05=this[_0x793222(0x386)];if(!_0x3cdd05)return;const _0x59f7ad=_0x3cdd05['states']()[_0x793222(0x38e)](_0x56d8c5=>_0x56d8c5['iconIndex']>0x0),_0x27a9ce=[...Array(0x8)['keys']()]['filter'](_0x114d6f=>_0x3cdd05[_0x793222(0x4be)](_0x114d6f)!==0x0),_0x18d4f9=this[_0x793222(0x4e3)],_0x22204b=_0x59f7ad[_0x18d4f9];if(_0x22204b)Window_Base['prototype'][_0x793222(0x431)][_0x793222(0x211)](this,_0x3cdd05,_0x22204b,0x0,0x0),Window_Base[_0x793222(0x305)][_0x793222(0x2d0)][_0x793222(0x211)](this,_0x3cdd05,_0x22204b,0x0,0x0);else{const _0x432223=_0x27a9ce[_0x18d4f9-_0x59f7ad['length']];if(_0x432223===undefined)return;Window_Base['prototype'][_0x793222(0x352)][_0x793222(0x211)](this,_0x3cdd05,_0x432223,0x0,0x0),Window_Base['prototype'][_0x793222(0x392)][_0x793222(0x211)](this,_0x3cdd05,_0x432223,0x0,0x0);}},Sprite_StateIcon[_0xc329de(0x305)][_0xc329de(0x32a)]=function(){const _0x20798b=_0xc329de;this['contents'][_0x20798b(0x4c7)]=$gameSystem[_0x20798b(0x25e)](),this[_0x20798b(0x2db)]['fontSize']=$gameSystem['mainFontSize'](),this[_0x20798b(0x3ee)]();},Sprite_StateIcon['prototype'][_0xc329de(0x3ee)]=function(){const _0x2611e8=_0xc329de;this[_0x2611e8(0x40a)](ColorManager[_0x2611e8(0x3a3)]()),this[_0x2611e8(0x442)](ColorManager[_0x2611e8(0x2f0)]());},Sprite_StateIcon[_0xc329de(0x305)][_0xc329de(0x40a)]=function(_0x518262){const _0x440d0e=_0xc329de;this[_0x440d0e(0x2db)]['textColor']=_0x518262;},Sprite_StateIcon['prototype'][_0xc329de(0x442)]=function(_0x409e59){const _0x218727=_0xc329de;this[_0x218727(0x2db)][_0x218727(0x2f0)]=_0x409e59;},Sprite_StateIcon[_0xc329de(0x305)][_0xc329de(0x1de)]=function(){this['_hidden']=!![],this['updateVisibility']();},Window_Base['prototype'][_0xc329de(0x40f)]=function(_0x2a026f,_0x2566d3,_0x40d223,_0x34eb13,_0x212f25){const _0x2c1960=_0xc329de,_0x5b4e2=this[_0x2c1960(0x27b)](_0x2a026f,_0x2566d3),_0xc54615=this[_0x2c1960(0x2cd)](_0x5b4e2,_0x40d223,_0x34eb13,_0x212f25),_0xf3150d=_0x40d223+_0x212f25-_0xc54615[_0x2c1960(0x2ec)];this[_0x2c1960(0x30a)](_0x5b4e2,_0xf3150d,_0x34eb13,_0x212f25),this[_0x2c1960(0x32a)]();},Window_Base[_0xc329de(0x305)][_0xc329de(0x27b)]=function(_0x58821d,_0x9e5553){const _0x3e353e=_0xc329de;let _0x1f7286='';for(settings of VisuMZ[_0x3e353e(0x383)][_0x3e353e(0x43a)][_0x3e353e(0x371)]){if(_0x3e353e(0x3c2)!==_0x3e353e(0x3c2)){if(!_0xb48499)return _0x42eb11[_0x3e353e(0x383)][_0x3e353e(0x4d6)][_0x3e353e(0x211)](this,_0x584cf5);if(!this[_0x3e353e(0x45b)](_0x4501e4))return![];if(!this['checkShowHideNotetags'](_0x5b47e3))return![];if(!this[_0x3e353e(0x2c7)](_0x55fdd1))return![];return!![];}else{if(!this[_0x3e353e(0x2a8)](_0x58821d,_0x9e5553,settings))continue;if(_0x1f7286[_0x3e353e(0x40b)]>0x0)_0x1f7286+=this[_0x3e353e(0x3cb)]();_0x1f7286+=this[_0x3e353e(0x301)](_0x58821d,_0x9e5553,settings);}}_0x1f7286=this[_0x3e353e(0x2d5)](_0x58821d,_0x9e5553,_0x1f7286);if(_0x9e5553['note'][_0x3e353e(0x213)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x1f7286[_0x3e353e(0x40b)]>0x0)_0x1f7286+=this[_0x3e353e(0x3cb)]();_0x1f7286+=String(RegExp['$1']);}return _0x1f7286;},Window_Base[_0xc329de(0x305)]['makeAdditionalSkillCostText']=function(_0x110c80,_0x355188,_0x577758){return _0x577758;},Window_Base['prototype'][_0xc329de(0x2a8)]=function(_0x488047,_0x597806,_0x5e9813){const _0x5b81df=_0xc329de,_0x512fc7=_0x5e9813['CalcJS'][_0x5b81df(0x211)](_0x488047,_0x597806);return _0x5e9813[_0x5b81df(0x39c)][_0x5b81df(0x211)](_0x488047,_0x597806,_0x512fc7,_0x5e9813);},Window_Base[_0xc329de(0x305)][_0xc329de(0x301)]=function(_0x3c9859,_0x685dc0,_0x8e9667){const _0xc9076e=_0xc329de,_0x48531a=_0x8e9667['CalcJS'][_0xc9076e(0x211)](_0x3c9859,_0x685dc0);return _0x8e9667['TextJS'][_0xc9076e(0x211)](_0x3c9859,_0x685dc0,_0x48531a,_0x8e9667);},Window_Base[_0xc329de(0x305)][_0xc329de(0x3cb)]=function(){return'\x20';},Window_Base[_0xc329de(0x305)][_0xc329de(0x249)]=function(_0x234bee,_0x25da28,_0x505a2e,_0x3faa4b){const _0x6fa8bc=_0xc329de;if(!_0x234bee)return;VisuMZ[_0x6fa8bc(0x383)][_0x6fa8bc(0x4e0)]['call'](this,_0x234bee,_0x25da28,_0x505a2e,_0x3faa4b),this['drawActorIconsAllTurnCounters'](_0x234bee,_0x25da28,_0x505a2e,_0x3faa4b);},Window_Base[_0xc329de(0x305)][_0xc329de(0x473)]=function(_0x32334b,_0x24c4ad,_0x956474,_0x527bf9){const _0x1076b3=_0xc329de;_0x527bf9=_0x527bf9||0x90;const _0x50f93e=ImageManager[_0x1076b3(0x4de)],_0x47e2cc=_0x32334b[_0x1076b3(0x385)]()[_0x1076b3(0x484)](0x0,Math[_0x1076b3(0x428)](_0x527bf9/_0x50f93e)),_0x3ccc8e=_0x32334b[_0x1076b3(0x298)]()['filter'](_0x45bd32=>_0x45bd32[_0x1076b3(0x237)]>0x0),_0x4ed2d2=[...Array(0x8)[_0x1076b3(0x2bd)]()]['filter'](_0x184181=>_0x32334b[_0x1076b3(0x4be)](_0x184181)!==0x0),_0x5d3efd=[];let _0x57f8d1=_0x24c4ad;for(let _0x30fdb8=0x0;_0x30fdb8<_0x47e2cc[_0x1076b3(0x40b)];_0x30fdb8++){if(_0x1076b3(0x3a7)!==_0x1076b3(0x35d)){this[_0x1076b3(0x32a)]();const _0x246f97=_0x3ccc8e[_0x30fdb8];if(_0x246f97){if(!_0x5d3efd[_0x1076b3(0x358)](_0x246f97)){if(_0x1076b3(0x2a5)!==_0x1076b3(0x320))this[_0x1076b3(0x431)](_0x32334b,_0x246f97,_0x57f8d1,_0x956474);else{const _0x2c28b8=_0x4fed5d[_0x1076b3(0x4ae)]-this[_0x1076b3(0x446)](),_0x5a7cf0=this['_skillTypeWindow']['height'],_0x1f71f3=this['isRightInputMode']()?0x0:_0x2c2fde[_0x1076b3(0x4ae)]-_0x2c28b8,_0x5d46c6=this[_0x1076b3(0x3e5)]();return new _0xcf0176(_0x1f71f3,_0x5d46c6,_0x2c28b8,_0x5a7cf0);}}this[_0x1076b3(0x2d0)](_0x32334b,_0x246f97,_0x57f8d1,_0x956474),_0x5d3efd[_0x1076b3(0x34e)](_0x246f97);}else{const _0x536a8c=_0x4ed2d2[_0x30fdb8-_0x3ccc8e[_0x1076b3(0x40b)]];this[_0x1076b3(0x352)](_0x32334b,_0x536a8c,_0x57f8d1,_0x956474),this[_0x1076b3(0x392)](_0x32334b,_0x536a8c,_0x57f8d1,_0x956474);}_0x57f8d1+=_0x50f93e;}else this['_stateSteps']=this['_stateSteps']||{},_0xf6c0d6[_0x1076b3(0x305)]['clearStates']['call'](this);}},Window_Base[_0xc329de(0x305)][_0xc329de(0x431)]=function(_0x10acd4,_0x1f5594,_0x508a0f,_0x30a846){const _0x2cf7b7=_0xc329de;if(!VisuMZ[_0x2cf7b7(0x383)]['Settings']['States'][_0x2cf7b7(0x3a2)])return;if(!_0x10acd4[_0x2cf7b7(0x212)](_0x1f5594['id']))return;if(_0x1f5594['autoRemovalTiming']===0x0)return;if(_0x1f5594[_0x2cf7b7(0x253)][_0x2cf7b7(0x213)](/<HIDE STATE TURNS>/i))return;const _0x37e349=_0x10acd4[_0x2cf7b7(0x4ce)](_0x1f5594['id']),_0x5cbd35=ImageManager[_0x2cf7b7(0x4de)],_0x108fc7=ColorManager[_0x2cf7b7(0x287)](_0x1f5594);this[_0x2cf7b7(0x40a)](_0x108fc7),this['changeOutlineColor'](_0x2cf7b7(0x4f4)),this[_0x2cf7b7(0x2db)]['fontBold']=!![],this[_0x2cf7b7(0x2db)][_0x2cf7b7(0x370)]=VisuMZ['SkillsStatesCore'][_0x2cf7b7(0x43a)][_0x2cf7b7(0x427)][_0x2cf7b7(0x4f0)],_0x508a0f+=VisuMZ['SkillsStatesCore'][_0x2cf7b7(0x43a)][_0x2cf7b7(0x427)]['TurnOffsetX'],_0x30a846+=VisuMZ[_0x2cf7b7(0x383)][_0x2cf7b7(0x43a)][_0x2cf7b7(0x427)]['TurnOffsetY'],this[_0x2cf7b7(0x3d4)](_0x37e349,_0x508a0f,_0x30a846,_0x5cbd35,_0x2cf7b7(0x32f)),this['contents'][_0x2cf7b7(0x20c)]=![],this[_0x2cf7b7(0x32a)]();},Window_Base[_0xc329de(0x305)]['drawActorStateData']=function(_0x46770f,_0x1a693,_0x52e7cd,_0x18896f){const _0x3a9002=_0xc329de;if(!VisuMZ[_0x3a9002(0x383)][_0x3a9002(0x43a)][_0x3a9002(0x427)][_0x3a9002(0x20b)])return;const _0x4a719a=ImageManager[_0x3a9002(0x4de)],_0x3b0912=ImageManager[_0x3a9002(0x4e5)]/0x2,_0x957fba=ColorManager[_0x3a9002(0x3a3)]();this[_0x3a9002(0x40a)](_0x957fba),this[_0x3a9002(0x442)]('rgba(0,\x200,\x200,\x201)'),this[_0x3a9002(0x2db)][_0x3a9002(0x20c)]=!![],this[_0x3a9002(0x2db)][_0x3a9002(0x370)]=VisuMZ[_0x3a9002(0x383)]['Settings'][_0x3a9002(0x427)]['DataFontSize'],_0x52e7cd+=VisuMZ[_0x3a9002(0x383)][_0x3a9002(0x43a)][_0x3a9002(0x427)][_0x3a9002(0x3bc)],_0x18896f+=VisuMZ[_0x3a9002(0x383)][_0x3a9002(0x43a)]['States'][_0x3a9002(0x200)];const _0x1b8013=String(_0x46770f[_0x3a9002(0x4b2)](_0x1a693['id']));this[_0x3a9002(0x3d4)](_0x1b8013,_0x52e7cd,_0x18896f,_0x4a719a,_0x3a9002(0x391)),this[_0x3a9002(0x2db)][_0x3a9002(0x20c)]=![],this[_0x3a9002(0x32a)]();},Window_Base['prototype'][_0xc329de(0x352)]=function(_0x238516,_0x2233a7,_0x11d2c1,_0x228898){const _0x2bf2fe=_0xc329de;if(!VisuMZ[_0x2bf2fe(0x383)][_0x2bf2fe(0x43a)][_0x2bf2fe(0x3bf)]['ShowTurns'])return;const _0x746754=_0x238516[_0x2bf2fe(0x4be)](_0x2233a7);if(_0x746754===0x0)return;const _0x4ce3d9=_0x238516['buffTurns'](_0x2233a7),_0x49e354=ImageManager['iconWidth'],_0x3c3c8b=_0x746754>0x0?ColorManager[_0x2bf2fe(0x24f)]():ColorManager[_0x2bf2fe(0x2f4)]();this[_0x2bf2fe(0x40a)](_0x3c3c8b),this[_0x2bf2fe(0x442)](_0x2bf2fe(0x4f4)),this[_0x2bf2fe(0x2db)][_0x2bf2fe(0x20c)]=!![],this[_0x2bf2fe(0x2db)][_0x2bf2fe(0x370)]=VisuMZ[_0x2bf2fe(0x383)][_0x2bf2fe(0x43a)][_0x2bf2fe(0x3bf)][_0x2bf2fe(0x4f0)],_0x11d2c1+=VisuMZ[_0x2bf2fe(0x383)][_0x2bf2fe(0x43a)]['Buffs'][_0x2bf2fe(0x426)],_0x228898+=VisuMZ['SkillsStatesCore'][_0x2bf2fe(0x43a)][_0x2bf2fe(0x3bf)][_0x2bf2fe(0x3f9)],this[_0x2bf2fe(0x3d4)](_0x4ce3d9,_0x11d2c1,_0x228898,_0x49e354,_0x2bf2fe(0x32f)),this['contents']['fontBold']=![],this['resetFontSettings']();},Window_Base[_0xc329de(0x305)]['drawActorBuffRates']=function(_0x23d9c6,_0x2e1a8e,_0x16c55c,_0x3d47a5){const _0x328a06=_0xc329de;if(!VisuMZ['SkillsStatesCore'][_0x328a06(0x43a)][_0x328a06(0x3bf)][_0x328a06(0x20b)])return;const _0x48589d=_0x23d9c6[_0x328a06(0x438)](_0x2e1a8e),_0x3c8a48=_0x23d9c6[_0x328a06(0x4be)](_0x2e1a8e),_0x3d1b10=ImageManager[_0x328a06(0x4de)],_0x96b6cb=ImageManager['iconHeight']/0x2,_0x38473d=_0x3c8a48>0x0?ColorManager[_0x328a06(0x24f)]():ColorManager[_0x328a06(0x2f4)]();this[_0x328a06(0x40a)](_0x38473d),this[_0x328a06(0x442)](_0x328a06(0x4f4)),this[_0x328a06(0x2db)][_0x328a06(0x20c)]=!![],this[_0x328a06(0x2db)][_0x328a06(0x370)]=VisuMZ[_0x328a06(0x383)]['Settings'][_0x328a06(0x3bf)][_0x328a06(0x1c6)],_0x16c55c+=VisuMZ[_0x328a06(0x383)][_0x328a06(0x43a)][_0x328a06(0x3bf)][_0x328a06(0x3bc)],_0x3d47a5+=VisuMZ[_0x328a06(0x383)]['Settings']['Buffs']['DataOffsetY'];const _0x223125=_0x328a06(0x35c)[_0x328a06(0x3bb)](Math[_0x328a06(0x1cd)](_0x48589d*0x64));this['drawText'](_0x223125,_0x16c55c,_0x3d47a5,_0x3d1b10,'center'),this[_0x328a06(0x2db)]['fontBold']=![],this[_0x328a06(0x32a)]();},VisuMZ[_0xc329de(0x383)][_0xc329de(0x303)]=Window_StatusBase[_0xc329de(0x305)][_0xc329de(0x300)],Window_StatusBase['prototype'][_0xc329de(0x300)]=function(_0x28aad0,_0x5586e1,_0xe0b45b,_0x154c27){const _0x298f9a=_0xc329de;if(_0x28aad0['isActor']())_0x5586e1=this['convertGaugeTypeSkillsStatesCore'](_0x28aad0,_0x5586e1);this[_0x298f9a(0x203)](_0x28aad0,_0x5586e1,_0xe0b45b,_0x154c27);},Window_StatusBase[_0xc329de(0x305)][_0xc329de(0x203)]=function(_0x288250,_0x1b6508,_0x57802f,_0x56582e){const _0x319709=_0xc329de;if([_0x319709(0x4da),'untitled'][_0x319709(0x358)](_0x1b6508['toLowerCase']()))return;VisuMZ[_0x319709(0x383)][_0x319709(0x303)]['call'](this,_0x288250,_0x1b6508,_0x57802f,_0x56582e);},Window_StatusBase['prototype'][_0xc329de(0x3eb)]=function(_0x2fe014,_0x17f08d){const _0x3a3b00=_0xc329de,_0x47750e=_0x2fe014[_0x3a3b00(0x416)]()[_0x3a3b00(0x253)];if(_0x17f08d==='hp'&&_0x47750e['match'](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x17f08d==='mp'&&_0x47750e['match'](/<REPLACE MP GAUGE:[ ](.*)>/i)){if('YZIkz'===_0x3a3b00(0x3e0))return String(RegExp['$1']);else{if(!_0x4fd312[_0x3a3b00(0x4f1)](_0x2a3f5e))return!![];}}else return _0x17f08d==='tp'&&_0x47750e[_0x3a3b00(0x213)](/<REPLACE TP GAUGE:[ ](.*)>/i)?_0x3a3b00(0x3e6)===_0x3a3b00(0x232)?_0x27279f[_0x3a3b00(0x383)][_0x3a3b00(0x43a)][_0x3a3b00(0x2af)][_0x3a3b00(0x240)][_0x3a3b00(0x211)](this):String(RegExp['$1']):_0x17f08d;}},VisuMZ['SkillsStatesCore'][_0xc329de(0x4e0)]=Window_StatusBase[_0xc329de(0x305)]['drawActorIcons'],Window_StatusBase['prototype'][_0xc329de(0x249)]=function(_0x5b9b1f,_0x29a6f2,_0x434fcc,_0x43cb65){const _0xf5362a=_0xc329de;if(!_0x5b9b1f)return;Window_Base[_0xf5362a(0x305)]['drawActorIcons'][_0xf5362a(0x211)](this,_0x5b9b1f,_0x29a6f2,_0x434fcc,_0x43cb65);},VisuMZ[_0xc329de(0x383)]['Window_SkillType_initialize']=Window_SkillType['prototype'][_0xc329de(0x48b)],Window_SkillType[_0xc329de(0x305)][_0xc329de(0x48b)]=function(_0x210240){const _0x478e6e=_0xc329de;VisuMZ[_0x478e6e(0x383)][_0x478e6e(0x2bc)][_0x478e6e(0x211)](this,_0x210240),this['createCommandNameWindow'](_0x210240);},Window_SkillType[_0xc329de(0x305)][_0xc329de(0x4ba)]=function(_0x5882b4){const _0x4ab870=_0xc329de,_0xed5040=new Rectangle(0x0,0x0,_0x5882b4[_0x4ab870(0x2ec)],_0x5882b4[_0x4ab870(0x4ac)]);this[_0x4ab870(0x1e3)]=new Window_Base(_0xed5040),this['_commandNameWindow'][_0x4ab870(0x42c)]=0x0,this[_0x4ab870(0x4ec)](this[_0x4ab870(0x1e3)]),this['updateCommandNameWindow']();},Window_SkillType[_0xc329de(0x305)][_0xc329de(0x25c)]=function(){const _0xc946be=_0xc329de;Window_Command[_0xc946be(0x305)][_0xc946be(0x25c)][_0xc946be(0x211)](this);if(this[_0xc946be(0x1e3)])this[_0xc946be(0x30b)]();},Window_SkillType[_0xc329de(0x305)][_0xc329de(0x30b)]=function(){const _0x5784f7=_0xc329de,_0x519926=this['_commandNameWindow'];_0x519926[_0x5784f7(0x2db)][_0x5784f7(0x332)]();const _0x525f8f=this[_0x5784f7(0x265)](this[_0x5784f7(0x2b8)]());if(_0x525f8f===_0x5784f7(0x31a)&&this[_0x5784f7(0x2f2)]()>0x0){const _0x261389=this['itemLineRect'](this[_0x5784f7(0x2b8)]());let _0x5d7ea2=this[_0x5784f7(0x41e)](this[_0x5784f7(0x2b8)]());_0x5d7ea2=_0x5d7ea2[_0x5784f7(0x367)](/\\I\[(\d+)\]/gi,''),_0x519926[_0x5784f7(0x32a)](),this[_0x5784f7(0x454)](_0x5d7ea2,_0x261389),this['commandNameWindowDrawText'](_0x5d7ea2,_0x261389),this[_0x5784f7(0x2e5)](_0x5d7ea2,_0x261389);}},Window_SkillType[_0xc329de(0x305)][_0xc329de(0x454)]=function(_0x5648a1,_0x259673){},Window_SkillType['prototype'][_0xc329de(0x1ca)]=function(_0x122615,_0x201cbb){const _0x278535=_0xc329de,_0x44a95e=this['_commandNameWindow'];_0x44a95e['drawText'](_0x122615,0x0,_0x201cbb['y'],_0x44a95e['innerWidth'],_0x278535(0x391));},Window_SkillType[_0xc329de(0x305)][_0xc329de(0x2e5)]=function(_0x8cf1db,_0x586052){const _0x2541d3=_0xc329de,_0x5bf66a=this[_0x2541d3(0x1e3)],_0x5f0ed5=$gameSystem['windowPadding'](),_0x500e58=_0x586052['x']+Math[_0x2541d3(0x428)](_0x586052['width']/0x2)+_0x5f0ed5;_0x5bf66a['x']=_0x5bf66a['width']/-0x2+_0x500e58,_0x5bf66a['y']=Math[_0x2541d3(0x428)](_0x586052[_0x2541d3(0x4ac)]/0x2);},Window_SkillType[_0xc329de(0x305)][_0xc329de(0x1df)]=function(){const _0x15b4bf=_0xc329de;return Imported['VisuMZ_0_CoreEngine']&&Window_Command[_0x15b4bf(0x305)][_0x15b4bf(0x1df)][_0x15b4bf(0x211)](this);},Window_SkillType['prototype'][_0xc329de(0x441)]=function(){const _0x3979bd=_0xc329de;if(!this[_0x3979bd(0x4fa)])return;const _0x551418=this[_0x3979bd(0x4fa)][_0x3979bd(0x3d6)]();for(const _0x45ced2 of _0x551418){const _0xae881e=this['makeCommandName'](_0x45ced2);this[_0x3979bd(0x2c5)](_0xae881e,'skill',!![],_0x45ced2);}},Window_SkillType[_0xc329de(0x305)][_0xc329de(0x451)]=function(_0x5a00a3){const _0x202cf1=_0xc329de;let _0x5abde9=$dataSystem['skillTypes'][_0x5a00a3];if(_0x5abde9[_0x202cf1(0x213)](/\\I\[(\d+)\]/i))return _0x5abde9;if(this[_0x202cf1(0x1c8)]()===_0x202cf1(0x4bf))return _0x5abde9;const _0x25371c=VisuMZ[_0x202cf1(0x383)]['Settings']['Skills'],_0x1098c1=$dataSystem['magicSkills'][_0x202cf1(0x358)](_0x5a00a3),_0x45f10b=_0x1098c1?_0x25371c[_0x202cf1(0x395)]:_0x25371c[_0x202cf1(0x44e)];return _0x202cf1(0x21a)[_0x202cf1(0x3bb)](_0x45f10b,_0x5abde9);},Window_SkillType[_0xc329de(0x305)][_0xc329de(0x4d9)]=function(){const _0xfe5517=_0xc329de;return VisuMZ[_0xfe5517(0x383)][_0xfe5517(0x43a)][_0xfe5517(0x2af)][_0xfe5517(0x209)];},Window_SkillType[_0xc329de(0x305)][_0xc329de(0x2a6)]=function(_0x45b329){const _0x514f79=_0xc329de,_0x32f958=this[_0x514f79(0x265)](_0x45b329);if(_0x32f958===_0x514f79(0x49e))_0x514f79(0x366)!==_0x514f79(0x3b5)?this[_0x514f79(0x382)](_0x45b329):this[_0x514f79(0x207)](_0xbbec17['shift']());else{if(_0x32f958==='icon'){if(_0x514f79(0x48c)===_0x514f79(0x48c))this[_0x514f79(0x22d)](_0x45b329);else{if(!_0x52ef04[_0x514f79(0x4f1)](_0x14c6d6))return![];}}else Window_Command[_0x514f79(0x305)]['drawItem'][_0x514f79(0x211)](this,_0x45b329);}},Window_SkillType['prototype']['commandStyle']=function(){const _0x5f528e=_0xc329de;return VisuMZ[_0x5f528e(0x383)][_0x5f528e(0x43a)][_0x5f528e(0x2af)][_0x5f528e(0x22f)];},Window_SkillType[_0xc329de(0x305)][_0xc329de(0x265)]=function(_0x39bcf0){const _0x1f9109=_0xc329de;if(_0x39bcf0<0x0)return _0x1f9109(0x4bf);const _0x4bb054=this['commandStyle']();if(_0x4bb054!==_0x1f9109(0x4d7))return _0x1f9109(0x29e)!==_0x1f9109(0x3aa)?_0x4bb054:this['_buffTurns'][_0x110963]||0x0;else{if(this[_0x1f9109(0x2f2)]()>0x0){const _0x17d304=this[_0x1f9109(0x41e)](_0x39bcf0);if(_0x17d304[_0x1f9109(0x213)](/\\I\[(\d+)\]/i)){if(_0x1f9109(0x4bc)!==_0x1f9109(0x239)){const _0x3b1d9b=this[_0x1f9109(0x3fd)](_0x39bcf0),_0x4d6fba=this[_0x1f9109(0x2cd)](_0x17d304)[_0x1f9109(0x2ec)];return _0x4d6fba<=_0x3b1d9b[_0x1f9109(0x2ec)]?_0x1f9109(0x49e):_0x1f9109(0x31a);}else{if(!_0x274ab9['hasSkill'](_0x2a3575))return![];}}}}return'text';},Window_SkillType[_0xc329de(0x305)][_0xc329de(0x382)]=function(_0x323d48){const _0xdbf0ee=_0xc329de,_0x8bde55=this[_0xdbf0ee(0x3fd)](_0x323d48),_0x23071b=this[_0xdbf0ee(0x41e)](_0x323d48),_0x5bd4c1=this[_0xdbf0ee(0x2cd)](_0x23071b)[_0xdbf0ee(0x2ec)];this[_0xdbf0ee(0x4d0)](this['isCommandEnabled'](_0x323d48));const _0x31760d=this[_0xdbf0ee(0x4d9)]();if(_0x31760d===_0xdbf0ee(0x32f))this[_0xdbf0ee(0x30a)](_0x23071b,_0x8bde55['x']+_0x8bde55[_0xdbf0ee(0x2ec)]-_0x5bd4c1,_0x8bde55['y'],_0x5bd4c1);else{if(_0x31760d===_0xdbf0ee(0x391)){const _0x5379dc=_0x8bde55['x']+Math['floor']((_0x8bde55['width']-_0x5bd4c1)/0x2);this[_0xdbf0ee(0x30a)](_0x23071b,_0x5379dc,_0x8bde55['y'],_0x5bd4c1);}else this['drawTextEx'](_0x23071b,_0x8bde55['x'],_0x8bde55['y'],_0x5bd4c1);}},Window_SkillType[_0xc329de(0x305)][_0xc329de(0x22d)]=function(_0x44af5a){const _0x5eff6f=_0xc329de;this['commandName'](_0x44af5a)[_0x5eff6f(0x213)](/\\I\[(\d+)\]/i);const _0x2ff257=Number(RegExp['$1'])||0x0,_0x4b36b7=this['itemLineRect'](_0x44af5a),_0x2c9195=_0x4b36b7['x']+Math['floor']((_0x4b36b7[_0x5eff6f(0x2ec)]-ImageManager[_0x5eff6f(0x4de)])/0x2),_0x4fffee=_0x4b36b7['y']+(_0x4b36b7[_0x5eff6f(0x4ac)]-ImageManager[_0x5eff6f(0x4e5)])/0x2;this[_0x5eff6f(0x3e7)](_0x2ff257,_0x2c9195,_0x4fffee);},VisuMZ[_0xc329de(0x383)][_0xc329de(0x2b9)]=Window_SkillStatus[_0xc329de(0x305)]['refresh'],Window_SkillStatus['prototype'][_0xc329de(0x494)]=function(){const _0x4d7a91=_0xc329de;VisuMZ['SkillsStatesCore'][_0x4d7a91(0x2b9)]['call'](this);if(this[_0x4d7a91(0x4fa)])this['drawExtendedSkillsStatesCoreStatus']();},Window_SkillStatus[_0xc329de(0x305)][_0xc329de(0x1ea)]=function(){const _0x26d0aa=_0xc329de;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!Imported[_0x26d0aa(0x399)])return;const _0x32b319=this[_0x26d0aa(0x28c)]();let _0x19c771=this[_0x26d0aa(0x25f)]()/0x2+0xb4+0xb4+0xb4,_0x51f882=this['innerWidth']-_0x19c771-0x2;if(_0x51f882>=0x12c){if(_0x26d0aa(0x302)===_0x26d0aa(0x29c)){const _0x2a2178=_0x2d5ad1[_0x37ebfc];if(_0x2a2178&&_0x2a2178['categories'][_0x26d0aa(0x40b)]>0x0)for(const _0xc347f3 of _0x2a2178[_0x26d0aa(0x1cc)]){if(this[_0x26d0aa(0x242)](_0xc347f3))return!![];}return _0x3a931c[_0x26d0aa(0x383)][_0x26d0aa(0x41a)]['call'](this,_0x46788b);}else{const _0x29ee8c=VisuMZ[_0x26d0aa(0x3a1)][_0x26d0aa(0x43a)][_0x26d0aa(0x258)][_0x26d0aa(0x4c4)],_0x8279d4=Math[_0x26d0aa(0x428)](_0x51f882/0x2)-0x18;let _0x39091d=_0x19c771,_0x140ad4=Math[_0x26d0aa(0x428)]((this['innerHeight']-Math[_0x26d0aa(0x32c)](_0x29ee8c[_0x26d0aa(0x40b)]/0x2)*_0x32b319)/0x2),_0x35d53c=0x0;for(const _0x4a237f of _0x29ee8c){this[_0x26d0aa(0x2b0)](_0x39091d,_0x140ad4,_0x8279d4,_0x4a237f),_0x35d53c++;if(_0x35d53c%0x2===0x0){if(_0x26d0aa(0x4ea)!==_0x26d0aa(0x4ea))return _0x51123f[_0x26d0aa(0x2f5)]();else _0x39091d=_0x19c771,_0x140ad4+=_0x32b319;}else _0x39091d+=_0x8279d4+0x18;}}}this[_0x26d0aa(0x32a)]();},Window_SkillStatus[_0xc329de(0x305)][_0xc329de(0x2b0)]=function(_0x57a595,_0x5d1d30,_0x53dac7,_0x21ed24){const _0x29f49b=_0xc329de,_0x14bdd7=this[_0x29f49b(0x28c)]();this['resetFontSettings'](),this[_0x29f49b(0x3e3)](_0x57a595,_0x5d1d30,_0x53dac7,_0x21ed24,!![]),this['resetTextColor'](),this['contents'][_0x29f49b(0x370)]-=0x8;const _0x1fb93c=this[_0x29f49b(0x4fa)][_0x29f49b(0x43b)](_0x21ed24,!![]);this[_0x29f49b(0x2db)]['drawText'](_0x1fb93c,_0x57a595,_0x5d1d30,_0x53dac7,_0x14bdd7,'right');},VisuMZ[_0xc329de(0x383)][_0xc329de(0x4d6)]=Window_SkillList[_0xc329de(0x305)][_0xc329de(0x358)],Window_SkillList[_0xc329de(0x305)][_0xc329de(0x358)]=function(_0x1fb9f3){const _0x5af314=_0xc329de;return this[_0x5af314(0x2b5)](_0x1fb9f3);},VisuMZ[_0xc329de(0x383)]['Window_SkillList_maxCols']=Window_SkillList['prototype'][_0xc329de(0x204)],Window_SkillList[_0xc329de(0x305)][_0xc329de(0x204)]=function(){const _0x377747=_0xc329de;return SceneManager['_scene']['constructor']===Scene_Battle?VisuMZ[_0x377747(0x383)][_0x377747(0x39b)][_0x377747(0x211)](this):VisuMZ[_0x377747(0x383)][_0x377747(0x43a)][_0x377747(0x2af)][_0x377747(0x2f6)];},VisuMZ[_0xc329de(0x383)][_0xc329de(0x2c2)]=Window_SkillList[_0xc329de(0x305)][_0xc329de(0x32e)],Window_SkillList[_0xc329de(0x305)][_0xc329de(0x32e)]=function(_0xdf2aaf){const _0x1723eb=_0xc329de,_0x593fe4=this[_0x1723eb(0x4fa)]!==_0xdf2aaf;VisuMZ['SkillsStatesCore'][_0x1723eb(0x2c2)][_0x1723eb(0x211)](this,_0xdf2aaf);if(_0x593fe4){if('UBztL'===_0x1723eb(0x4bb)){_0x4a7bfd[_0x1723eb(0x213)](/<REMOVE OTHER (.*) STATES>/i);const _0x35a916=_0x38d1b7(_0x137a62['$1']);this['removeStatesByCategoryAll'](_0x35a916,_0x24e8c7);}else this[_0x1723eb(0x25b)]&&this[_0x1723eb(0x25b)]['constructor']===Window_ShopStatus&&this['_statusWindow'][_0x1723eb(0x4b5)](this['itemAt'](0x0));}},Window_SkillList[_0xc329de(0x305)][_0xc329de(0x215)]=function(_0x4dc016){const _0x56c593=_0xc329de;if(this[_0x56c593(0x3b7)]===_0x4dc016)return;this[_0x56c593(0x3b7)]=_0x4dc016,this[_0x56c593(0x494)](),this[_0x56c593(0x33c)](0x0,0x0),this[_0x56c593(0x25b)]&&this[_0x56c593(0x25b)]['constructor']===Window_ShopStatus&&this['_statusWindow'][_0x56c593(0x4b5)](this['itemAt'](0x0));},Window_SkillList[_0xc329de(0x305)][_0xc329de(0x2b5)]=function(_0x203b17){const _0x4e9f38=_0xc329de;if(!_0x203b17)return VisuMZ['SkillsStatesCore'][_0x4e9f38(0x4d6)][_0x4e9f38(0x211)](this,_0x203b17);if(!this[_0x4e9f38(0x45b)](_0x203b17))return![];if(!this[_0x4e9f38(0x46f)](_0x203b17))return![];if(!this[_0x4e9f38(0x2c7)](_0x203b17))return![];return!![];},Window_SkillList[_0xc329de(0x305)][_0xc329de(0x45b)]=function(_0x22f868){const _0x34faca=_0xc329de;return DataManager['getSkillTypes'](_0x22f868)['includes'](this[_0x34faca(0x3b7)]);},Window_SkillList[_0xc329de(0x305)][_0xc329de(0x46f)]=function(_0x5dac33){const _0x40ff57=_0xc329de;if(!VisuMZ[_0x40ff57(0x383)]['CheckVisibleBattleNotetags'](this['_actor'],_0x5dac33))return![];if(!VisuMZ[_0x40ff57(0x383)]['CheckVisibleSwitchNotetags'](this['_actor'],_0x5dac33))return![];if(!VisuMZ[_0x40ff57(0x383)][_0x40ff57(0x38a)](this[_0x40ff57(0x4fa)],_0x5dac33))return![];return!![];},VisuMZ[_0xc329de(0x383)]['CheckVisibleBattleNotetags']=function(_0x2559c7,_0x37bfaa){const _0x77283=_0xc329de,_0xa13f27=_0x37bfaa['note'];if(_0xa13f27['match'](/<HIDE IN BATTLE>/i)&&$gameParty['inBattle']())return![];else return _0xa13f27[_0x77283(0x213)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty['inBattle']()?![]:!![];},VisuMZ['SkillsStatesCore'][_0xc329de(0x39f)]=function(_0x4d826e,_0x20b52a){const _0x290fe6=_0xc329de,_0xbca8da=_0x20b52a[_0x290fe6(0x253)];if(_0xbca8da[_0x290fe6(0x213)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x58c345=JSON[_0x290fe6(0x45d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x34eeab of _0x58c345){if(!$gameSwitches[_0x290fe6(0x4f1)](_0x34eeab))return![];}return!![];}if(_0xbca8da['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('ZqqUe'!==_0x290fe6(0x22a)){const _0x37b8c9=JSON[_0x290fe6(0x45d)]('['+RegExp['$1'][_0x290fe6(0x213)](/\d+/g)+']');for(const _0x3e989c of _0x37b8c9){if('YjsqY'!==_0x290fe6(0x2a2)){const _0x3874f0=_0x41f06b(_0x126faf['$1']),_0x29afb9=_0x566a86[_0x290fe6(0x3bb)](_0x3874f0,_0x290fe6(0x2aa),-0x1,'slipTp');_0x23c51b['SkillsStatesCore'][_0x290fe6(0x1cb)][_0x5a961e['id']]=new _0x239bf3('stateId',_0x29afb9);}else{if(!$gameSwitches['value'](_0x3e989c))return![];}}return!![];}else return _0x223153[_0x290fe6(0x383)]['Settings'][_0x290fe6(0x427)][_0x290fe6(0x435)];}if(_0xbca8da['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x290fe6(0x362)!==_0x290fe6(0x2fc)){const _0x148288=JSON['parse']('['+RegExp['$1'][_0x290fe6(0x213)](/\d+/g)+']');for(const _0x202844 of _0x148288){if($gameSwitches['value'](_0x202844))return!![];}return![];}else{const _0x15d8cf=_0xebb516[_0x290fe6(0x383)][_0x290fe6(0x43a)][_0x290fe6(0x24a)];if(_0x15d8cf['MatchLabelColor']){if(_0x15d8cf[_0x290fe6(0x345)]===0x1)return this[_0x290fe6(0x3f7)]();else{if(_0x15d8cf[_0x290fe6(0x345)]===0x2)return this[_0x290fe6(0x335)]();}}const _0x1593ef=_0x15d8cf[_0x290fe6(0x30c)];return _0x3d588a[_0x290fe6(0x4d1)](_0x1593ef);}}if(_0xbca8da[_0x290fe6(0x213)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x290fe6(0x2bb)!==_0x290fe6(0x2bb))_0x24e616[_0x290fe6(0x3f5)]=0x2;else{const _0x8e0519=JSON['parse']('['+RegExp['$1'][_0x290fe6(0x213)](/\d+/g)+']');for(const _0x35a7a0 of _0x8e0519){if(!$gameSwitches[_0x290fe6(0x4f1)](_0x35a7a0))return!![];}return![];}}if(_0xbca8da[_0x290fe6(0x213)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4316f=JSON[_0x290fe6(0x45d)]('['+RegExp['$1'][_0x290fe6(0x213)](/\d+/g)+']');for(const _0x120c23 of _0x4316f){if(_0x290fe6(0x3d0)!==_0x290fe6(0x3b0)){if(!$gameSwitches['value'](_0x120c23))return!![];}else{const _0x279581=_0x149999[_0x290fe6(0x45d)]('['+_0x202938['$1'][_0x290fe6(0x213)](/\d+/g)+']');for(const _0x38f7d3 of _0x279581){if(!_0x4ee627[_0x290fe6(0x4f1)](_0x38f7d3))return![];}return!![];}}return![];}if(_0xbca8da[_0x290fe6(0x213)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x297abf=JSON[_0x290fe6(0x45d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x15b5cc of _0x297abf){if(_0x290fe6(0x22b)===_0x290fe6(0x24b)){this['commandName'](_0x2d4e12)[_0x290fe6(0x213)](/\\I\[(\d+)\]/i);const _0x44afae=_0x57d1c4(_0x5ed907['$1'])||0x0,_0x48d71b=this[_0x290fe6(0x3fd)](_0x2fcf42),_0xd7b5cb=_0x48d71b['x']+_0x4254fd[_0x290fe6(0x428)]((_0x48d71b[_0x290fe6(0x2ec)]-_0x736ac1['iconWidth'])/0x2),_0x275377=_0x48d71b['y']+(_0x48d71b[_0x290fe6(0x4ac)]-_0x4c24b9[_0x290fe6(0x4e5)])/0x2;this['drawIcon'](_0x44afae,_0xd7b5cb,_0x275377);}else{if($gameSwitches[_0x290fe6(0x4f1)](_0x15b5cc))return![];}}return!![];}return!![];},VisuMZ['SkillsStatesCore']['CheckVisibleSkillNotetags']=function(_0x52ac32,_0x53914c){const _0xd400db=_0xc329de,_0x303c25=_0x53914c['note'];if(_0x303c25[_0xd400db(0x213)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1100f4=JSON['parse']('['+RegExp['$1'][_0xd400db(0x213)](/\d+/g)+']');for(const _0x4b450b of _0x1100f4){if(_0xd400db(0x2f7)==='wmAtV'){const _0x11efdd=_0x4ee016(_0x2eb61d['$1']),_0x4dc1c6=_0x3780b2[_0xd400db(0x3bb)](_0x11efdd);_0x19eaaf[_0xd400db(0x383)]['stateAddJS'][_0x39bd01['id']]=new _0x3a1947(_0xd400db(0x3f6),_0x4dc1c6);}else{if(!_0x52ac32['isLearnedSkill'](_0x4b450b))return![];}}return!![];}else{if(_0x303c25['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0xd400db(0x3cd)!=='gUGRu'){const _0x3cb0d2=_0x1a4edb[_0xd400db(0x4b9)](_0x567ce7);if(_0x3cb0d2)this['_cache'][_0xd400db(0x31f)][_0xd400db(0x34e)](_0x3cb0d2);}else{const _0x20b60e=RegExp['$1']['split'](',');for(const _0x4f4b3b of _0x20b60e){if(_0xd400db(0x456)===_0xd400db(0x456)){const _0x21138e=DataManager[_0xd400db(0x471)](_0x4f4b3b);if(!_0x21138e)continue;if(!_0x52ac32[_0xd400db(0x401)](_0x21138e))return![];}else _0x488a38[_0xd400db(0x383)][_0xd400db(0x43a)]['Buffs'][_0xd400db(0x36b)]['call'](this,_0x5e2bbf);}return!![];}}}if(_0x303c25[_0xd400db(0x213)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4497fd=JSON[_0xd400db(0x45d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x27bbfe of _0x4497fd){if(!_0x52ac32[_0xd400db(0x401)](_0x27bbfe))return![];}return!![];}else{if(_0x303c25[_0xd400db(0x213)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0xd400db(0x34f)==='XjEhr'){if(_0x503ac8[_0xd400db(0x361)]())_0xd10286[_0xd400db(0x28b)](_0x48e090);}else{const _0x41ea9b=RegExp['$1'][_0xd400db(0x3b2)](',');for(const _0x38b09b of _0x41ea9b){if(_0xd400db(0x36e)==='zWAzd'){if(_0x1365e5['isActor']())_0x2e5558=this['convertGaugeTypeSkillsStatesCore'](_0x17b6e6,_0x1df326);this['placeExactGauge'](_0x3f2d2b,_0x3001a9,_0x25cdc6,_0x1a0b47);}else{const _0x57b10d=DataManager['getSkillIdWithName'](_0x38b09b);if(!_0x57b10d)continue;if(!_0x52ac32[_0xd400db(0x401)](_0x57b10d))return![];}}return!![];}}}if(_0x303c25[_0xd400db(0x213)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x408eee=JSON[_0xd400db(0x45d)]('['+RegExp['$1'][_0xd400db(0x213)](/\d+/g)+']');for(const _0x533d2a of _0x408eee){if(_0x52ac32[_0xd400db(0x401)](_0x533d2a))return!![];}return![];}else{if(_0x303c25['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4770c9=RegExp['$1'][_0xd400db(0x3b2)](',');for(const _0x389846 of _0x4770c9){if(_0xd400db(0x280)===_0xd400db(0x280)){const _0x515da7=DataManager['getSkillIdWithName'](_0x389846);if(!_0x515da7)continue;if(_0x52ac32[_0xd400db(0x401)](_0x515da7))return!![];}else{const _0x3231ab=_0x3ce5b0[_0xd400db(0x383)][_0xd400db(0x43a)]['States'];if(!_0x3231ab)return;if(_0x3231ab[_0xd400db(0x2ce)]===![])return;if(!this['_subject'])return;this['_subject'][_0xd400db(0x236)]();}}return![];}}if(_0x303c25['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4bab7e=JSON['parse']('['+RegExp['$1'][_0xd400db(0x213)](/\d+/g)+']');for(const _0xd930a9 of _0x4bab7e){if('kRPQe'!=='ZjAYr'){if(!_0x52ac32[_0xd400db(0x401)](_0xd930a9))return!![];}else{const _0x492f30=_0x4fc869(_0x2a4175['$1']),_0x11ae9a=_0x7503c5['format'](_0x492f30,'heal',0x1,_0xd400db(0x457));_0x30408[_0xd400db(0x383)][_0xd400db(0x2ee)][_0x100721['id']]=new _0x51c0de('stateId',_0x11ae9a);}}return![];}else{if(_0x303c25['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('XfTdt'===_0xd400db(0x3ad)){if(!_0x361878[_0xd400db(0x401)](_0x13bb93))return![];}else{const _0x3006e8=RegExp['$1'][_0xd400db(0x3b2)](',');for(const _0x52b4e5 of _0x3006e8){const _0x323f8a=DataManager[_0xd400db(0x471)](_0x52b4e5);if(!_0x323f8a)continue;if(!_0x52ac32[_0xd400db(0x401)](_0x323f8a))return!![];}return![];}}}if(_0x303c25[_0xd400db(0x213)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xd400db(0x397)==='xdkNO'){_0x180be8[_0xd400db(0x383)][_0xd400db(0x47d)][_0xd400db(0x211)](this);const _0x408d9f=_0x536df6[_0xd400db(0x383)][_0xd400db(0x43a)][_0xd400db(0x2c3)][_0xd400db(0x42f)]??!![];if(!_0x408d9f)return;if(_0x38d657['isSceneBattle']())for(const _0x296d85 of _0x505a25['allBattleMembers']()){if(_0x296d85)_0x296d85[_0xd400db(0x494)]();}}else{const _0xbea9eb=JSON[_0xd400db(0x45d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x20f85f of _0xbea9eb){if(!_0x52ac32[_0xd400db(0x401)](_0x20f85f))return!![];}return![];}}else{if(_0x303c25[_0xd400db(0x213)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3e73e0=RegExp['$1']['split'](',');for(const _0x4895ca of _0x3e73e0){const _0xe2759=DataManager[_0xd400db(0x471)](_0x4895ca);if(!_0xe2759)continue;if(!_0x52ac32[_0xd400db(0x401)](_0xe2759))return!![];}return![];}}if(_0x303c25[_0xd400db(0x213)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xd400db(0x41c)!=='DppCa'){const _0x1fccb4=JSON[_0xd400db(0x45d)]('['+RegExp['$1'][_0xd400db(0x213)](/\d+/g)+']');for(const _0x15583f of _0x1fccb4){if('CZVSF'===_0xd400db(0x2e4)){if(_0x52ac32['isLearnedSkill'](_0x15583f))return![];}else{const _0x4fb46e=[];for(const _0x309436 of this['enemy']()['actions']){const _0x401bce=_0x193df9[_0x309436[_0xd400db(0x284)]];if(_0x401bce&&!_0x4fb46e[_0xd400db(0x358)](_0x401bce))_0x4fb46e[_0xd400db(0x34e)](_0x401bce);}return _0x4fb46e;}}return!![];}else return _0x41fb39[_0xd400db(0x487)]&&_0x453105['description'][_0xd400db(0x358)]('['+_0x5b374d+']');}else{if(_0x303c25[_0xd400db(0x213)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0xd400db(0x3ec)!==_0xd400db(0x3ec))return this[_0xd400db(0x49c)](_0x50c32c(_0xd59cbc));else{const _0x33fc79=RegExp['$1']['split'](',');for(const _0x33d181 of _0x33fc79){if(_0xd400db(0x34b)===_0xd400db(0x4b0))this[_0xd400db(0x44f)]()!==''?this[_0xd400db(0x4f7)]():(_0x599e0b['SkillsStatesCore'][_0xd400db(0x406)][_0xd400db(0x211)](this),this['initMembersSkillsStatesCore']());else{const _0xf37d89=DataManager[_0xd400db(0x471)](_0x33d181);if(!_0xf37d89)continue;if(_0x52ac32[_0xd400db(0x401)](_0xf37d89))return![];}}return!![];}}}if(_0x303c25['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xfafb1f=JSON[_0xd400db(0x45d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3fa906 of _0xfafb1f){if(!_0x52ac32[_0xd400db(0x226)](_0x3fa906))return![];}return!![];}else{if(_0x303c25['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2768bd=RegExp['$1'][_0xd400db(0x3b2)](',');for(const _0x2d0ceb of _0x2768bd){const _0x44f4c5=DataManager[_0xd400db(0x471)](_0x2d0ceb);if(!_0x44f4c5)continue;if(!_0x52ac32[_0xd400db(0x226)](_0x44f4c5))return![];}return!![];}}if(_0x303c25[_0xd400db(0x213)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4081a9=JSON[_0xd400db(0x45d)]('['+RegExp['$1'][_0xd400db(0x213)](/\d+/g)+']');for(const _0x3853fc of _0x4081a9){if(_0xd400db(0x3d8)===_0xd400db(0x495))return _0x54dc5d[_0xd400db(0x253)]['match'](/<PASSIVE STACKABLE>/i);else{if(!_0x52ac32[_0xd400db(0x226)](_0x3853fc))return![];}}return!![];}else{if(_0x303c25[_0xd400db(0x213)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x213203=RegExp['$1'][_0xd400db(0x3b2)](',');for(const _0x5c853c of _0x213203){if('CXJXn'===_0xd400db(0x2eb)){const _0x4a8130=DataManager[_0xd400db(0x471)](_0x5c853c);if(!_0x4a8130)continue;if(!_0x52ac32[_0xd400db(0x226)](_0x4a8130))return![];}else{const _0x21e644=_0x3cddc1[_0x2b06f8[_0xd400db(0x284)]];if(_0x21e644&&!_0x3ca3cf[_0xd400db(0x358)](_0x21e644))_0x484ac6[_0xd400db(0x34e)](_0x21e644);}}return!![];}}if(_0x303c25[_0xd400db(0x213)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xd400db(0x24e)==='BWWpW'){if(typeof _0xb3b885===_0xd400db(0x331))_0x4b1fe7=_0x49195e[_0x4a77f3];const _0xfab4eb=_0xd400db(0x38f)['format'](_0x50f99d['id']);this[_0xd400db(0x324)]=this['_colorCache']||{};if(this[_0xd400db(0x324)][_0xfab4eb])return this['_colorCache'][_0xfab4eb];const _0x30ba7d=this[_0xd400db(0x4c3)](_0x2bc41);return this[_0xd400db(0x260)](_0xfab4eb,_0x30ba7d);}else{const _0x857ef3=JSON[_0xd400db(0x45d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x176e2b of _0x857ef3){if(_0xd400db(0x3d1)===_0xd400db(0x3d1)){if(_0x52ac32[_0xd400db(0x226)](_0x176e2b))return!![];}else return this[_0xd400db(0x453)][_0x2e2607]===-_0x26fd63[_0xd400db(0x383)][_0xd400db(0x43a)][_0xd400db(0x3bf)][_0xd400db(0x3af)];}return![];}}else{if(_0x303c25['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x53082c=RegExp['$1'][_0xd400db(0x3b2)](',');for(const _0x4c6b61 of _0x53082c){const _0xea0311=DataManager['getSkillIdWithName'](_0x4c6b61);if(!_0xea0311)continue;if(_0x52ac32[_0xd400db(0x226)](_0xea0311))return!![];}return![];}}if(_0x303c25['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x36dd40=JSON['parse']('['+RegExp['$1'][_0xd400db(0x213)](/\d+/g)+']');for(const _0x3b12db of _0x36dd40){if(_0xd400db(0x378)!=='wJQHc'){const _0x48fd63=this[_0xd400db(0x46e)]['mpDamage']||0x0;this['gainMp'](_0x542986),this[_0xd400db(0x46e)][_0xd400db(0x23f)]+=_0x48fd63;}else{if(!_0x52ac32[_0xd400db(0x226)](_0x3b12db))return!![];}}return![];}else{if(_0x303c25[_0xd400db(0x213)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('FuPmK'===_0xd400db(0x44b)){const _0x593dbd=RegExp['$1'][_0xd400db(0x3b2)](',');for(const _0x3eee38 of _0x593dbd){if('inBJd'===_0xd400db(0x39a)){const _0x4ea4fb=DataManager['getSkillIdWithName'](_0x3eee38);if(!_0x4ea4fb)continue;if(!_0x52ac32[_0xd400db(0x226)](_0x4ea4fb))return!![];}else _0x1e2add[_0xd400db(0x383)][_0xd400db(0x43a)][_0xd400db(0x427)][_0xd400db(0x40e)]['call'](this,_0xdafd0f);}return![];}else return new _0x2aa9ef(_0xae922f(_0x1ea569['$1']),-0x1f4,-0x1f4);}}if(_0x303c25[_0xd400db(0x213)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('iFsKP'!==_0xd400db(0x36d)){const _0x43a6e0=JSON[_0xd400db(0x45d)]('['+RegExp['$1'][_0xd400db(0x213)](/\d+/g)+']');for(const _0x362ab0 of _0x43a6e0){if(_0xd400db(0x3cf)===_0xd400db(0x3cf)){if(!_0x52ac32[_0xd400db(0x226)](_0x362ab0))return!![];}else{const _0x51efaf=this[_0xd400db(0x1e3)],_0x36b3ee=_0x159364['windowPadding'](),_0x25a8c6=_0x4d8b3e['x']+_0x2fae66[_0xd400db(0x428)](_0x567291['width']/0x2)+_0x36b3ee;_0x51efaf['x']=_0x51efaf['width']/-0x2+_0x25a8c6,_0x51efaf['y']=_0x59557b[_0xd400db(0x428)](_0x626ea5['height']/0x2);}}return![];}else{if(_0x3b3e42[_0xd400db(0x455)])return;this[_0xd400db(0x4b4)](),this['process_VisuMZ_SkillsStatesCore_State_Notetags']();}}else{if(_0x303c25['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0xd400db(0x1f3)!==_0xd400db(0x1f3))!_0x292c4d[_0xd400db(0x358)](_0x3bb022)&&this[_0xd400db(0x431)](_0x181f00,_0x45a7dd,_0x3030e3,_0x46f05a),this[_0xd400db(0x2d0)](_0x4b24e5,_0x5bc4ff,_0x1562ab,_0x3e2529),_0x45c13b['push'](_0x2d5425);else{const _0x1a1f35=RegExp['$1'][_0xd400db(0x3b2)](',');for(const _0x260766 of _0x1a1f35){if(_0xd400db(0x296)==='oJaIA'){this[_0xd400db(0x32a)]();const _0x4c261f=_0x4a2543[_0x53d434];if(_0x4c261f)!_0xab5fce[_0xd400db(0x358)](_0x4c261f)&&this['drawActorStateTurns'](_0x252e4e,_0x4c261f,_0x6dd08b,_0x573658),this[_0xd400db(0x2d0)](_0x5dc872,_0x4c261f,_0x18110b,_0x28c0ee),_0x5db06d['push'](_0x4c261f);else{const _0x4c58e9=_0x40a60b[_0x3dce84-_0x51e37d[_0xd400db(0x40b)]];this[_0xd400db(0x352)](_0x9e4548,_0x4c58e9,_0x296d3b,_0xb48970),this[_0xd400db(0x392)](_0x35ce65,_0x4c58e9,_0x4ae164,_0x152c2a);}_0x1e18ee+=_0x2232ab;}else{const _0x3a6d1c=DataManager[_0xd400db(0x471)](_0x260766);if(!_0x3a6d1c)continue;if(!_0x52ac32[_0xd400db(0x226)](_0x3a6d1c))return!![];}}return![];}}}if(_0x303c25['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xd400db(0x479)===_0xd400db(0x479)){const _0x39ef4c=JSON['parse']('['+RegExp['$1'][_0xd400db(0x213)](/\d+/g)+']');for(const _0x54a53d of _0x39ef4c){if(_0x52ac32[_0xd400db(0x226)](_0x54a53d))return![];}return!![];}else return this[_0xd400db(0x436)]&&this['_skillTypeWindow'][_0xd400db(0x373)]?_0x4e8e25[_0xd400db(0x458)]:'';}else{if(_0x303c25[_0xd400db(0x213)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x47aac0=RegExp['$1'][_0xd400db(0x3b2)](',');for(const _0xd75f85 of _0x47aac0){const _0x24097c=DataManager['getSkillIdWithName'](_0xd75f85);if(!_0x24097c)continue;if(_0x52ac32[_0xd400db(0x226)](_0x24097c))return![];}return!![];}}return!![];},Window_SkillList['prototype'][_0xc329de(0x2c7)]=function(_0x2007aa){const _0x269ddc=_0xc329de,_0x52cd68=_0x2007aa[_0x269ddc(0x253)],_0x3bad06=VisuMZ[_0x269ddc(0x383)][_0x269ddc(0x21f)];if(_0x3bad06[_0x2007aa['id']])return _0x3bad06[_0x2007aa['id']][_0x269ddc(0x211)](this,_0x2007aa);else{if(_0x269ddc(0x46a)!==_0x269ddc(0x464))return!![];else _0x269bde[_0x269ddc(0x383)][_0x269ddc(0x460)][_0x269ddc(0x211)](this),this['updateTurnDisplaySprite']();}},VisuMZ['SkillsStatesCore'][_0xc329de(0x2f3)]=Window_SkillList['prototype'][_0xc329de(0x2a6)],Window_SkillList[_0xc329de(0x305)][_0xc329de(0x2a6)]=function(_0x460f97){const _0x4a513c=_0xc329de,_0x2f5cfe=this[_0x4a513c(0x274)](_0x460f97),_0x1fdcc5=_0x2f5cfe[_0x4a513c(0x3f4)];if(_0x2f5cfe)this[_0x4a513c(0x3c5)](_0x2f5cfe);VisuMZ['SkillsStatesCore'][_0x4a513c(0x2f3)][_0x4a513c(0x211)](this,_0x460f97);if(_0x2f5cfe)_0x2f5cfe['name']=_0x1fdcc5;},Window_SkillList[_0xc329de(0x305)]['alterSkillName']=function(_0x6e70ab){const _0x26cdf7=_0xc329de;if(_0x6e70ab&&_0x6e70ab['note']['match'](/<LIST NAME:[ ](.*)>/i)){if(_0x26cdf7(0x3e9)!==_0x26cdf7(0x3e9))_0x569489[_0x26cdf7(0x383)][_0x26cdf7(0x293)][_0x26cdf7(0x211)](this),this[_0x26cdf7(0x2c1)](),_0x186b9a[_0x26cdf7(0x383)][_0x26cdf7(0x1e5)]();else{_0x6e70ab[_0x26cdf7(0x3f4)]=String(RegExp['$1'])[_0x26cdf7(0x259)]();for(;;){if(_0x6e70ab[_0x26cdf7(0x3f4)][_0x26cdf7(0x213)](/\\V\[(\d+)\]/gi))_0x6e70ab[_0x26cdf7(0x3f4)]=_0x6e70ab[_0x26cdf7(0x3f4)][_0x26cdf7(0x367)](/\\V\[(\d+)\]/gi,(_0x2abc37,_0xb2a9fa)=>$gameVariables[_0x26cdf7(0x4f1)](parseInt(_0xb2a9fa)));else break;}}}},Window_SkillList[_0xc329de(0x305)][_0xc329de(0x40f)]=function(_0x4a2959,_0x392b17,_0x2a84f7,_0x478565){const _0x2a9dc3=_0xc329de;Window_Base[_0x2a9dc3(0x305)][_0x2a9dc3(0x40f)][_0x2a9dc3(0x211)](this,this['_actor'],_0x4a2959,_0x392b17,_0x2a84f7,_0x478565);},Window_SkillList[_0xc329de(0x305)][_0xc329de(0x221)]=function(_0x2eaf9c){const _0x444f56=_0xc329de;this['_statusWindow']=_0x2eaf9c,this[_0x444f56(0x25c)]();},VisuMZ[_0xc329de(0x383)]['Window_SkillList_updateHelp']=Window_SkillList[_0xc329de(0x305)][_0xc329de(0x22c)],Window_SkillList[_0xc329de(0x305)][_0xc329de(0x22c)]=function(){const _0x955f38=_0xc329de;VisuMZ[_0x955f38(0x383)][_0x955f38(0x34c)][_0x955f38(0x211)](this),this[_0x955f38(0x25b)]&&this[_0x955f38(0x25b)][_0x955f38(0x489)]===Window_ShopStatus&&this['_statusWindow'][_0x955f38(0x4b5)](this['item']());};