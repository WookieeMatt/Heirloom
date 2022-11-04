//=============================================================================
// VisuStella MZ - Quest Journal System
// VisuMZ_2_QuestSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_QuestSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.QuestSystem = VisuMZ.QuestSystem || {};
VisuMZ.QuestSystem.version = 1.15;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.15] [QuestSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Quest_Journal_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A quest journal is a very important tool provided by game developers for the
 * players. It lists various quests, missions, and objectives that the player
 * can pursue in order to progress further into the game. This can be helpful
 * in reminding the player what needs to be done in the event the player can
 * forget what things there are to do in a vast and large RPG world.
 *
 * This plugin places a quest journal system into your RPG Maker MZ game. You
 * can set up how the quest journal appears, move its windows around and/or
 * reshape them to fit your game.
 *
 * You can adjust the quest's title, display a difficulty level, remind the
 * player who the quest is from, where that quest is from, various dynamic
 * descriptions explaining the quest, a list of objectives to make, a list of
 * rewards that will be given to the player once the quest is complete, and any
 * subtext footnotes and quotes you may wish to insert into each quest.
 *
 * *NOTE*
 *
 * Keep in mind that while this plugin does enable a quest journal system into
 * your game, this plugin will NOT automate it. If you have a quest enabled, it
 * is still up to you to add the quest properly into the journal, set its many
 * objectives, when the other objectives appear, what the rewards are, and then
 * giving out the rewards yourself manually. The purpose of this plugin is to
 * simply serve as a visual record for your player to see what quests have been
 * handed down to him or her.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Unlimited quest categories.
 * * Unlimited quest slots.
 * * Full control over what appears in the quest journal system and how it
 *   appears in-game.
 * * Update quest descriptions, objectives, rewards, subtexts, etc. mid-game
 *   through the use of Plugin Commands.
 * * A dedicated quest menu that's accessible from the Main Menu or by
 *   Plugin Command call.
 * * A quest tracker that appears in the map scene to keep the player updated
 *   on how far they are progressing in their current quest.
 * * Options for the player to show/hide the quest tracker and reposition its
 *   location on the screen.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Explanation - Categories and Quests
 * ============================================================================
 *
 * The following is an explanation on the differences between Categories and
 * Quests for the usage of this plugin.
 *
 * ---
 *
 * Categories
 *
 * Quest Categories separate the quest types in your game. These can be used to
 * help players differentiate which are story-driven quests, which are optional
 * quests, recurring quests, etc. These have limited settings, but serve as
 * containers for quests that fall under its category.
 *
 * ---
 *
 * Plugin Parameters > Categories > Category Name:
 *
 * This is the category's name. It appears however you type it using text
 * codes, allowing you to color-code it if needed.
 *
 * ---
 *
 * Plugin Parameters > Categories > Quests:
 * 
 * These contain the quests that are listed under this category. Enter in as
 * many as needed/desired.
 *
 * ---
 *
 * Quests
 *
 * Each Quest Category will contain a list of quests that can appear in-game.
 * These individual quests make up the meat and bones of the Quest System and
 * will serve to relay information to the player on what he/she needs to do in
 * order to make progress in your game.
 *
 * ---
 *
 * Plugin Parameters > General > Log Window > Quest Log
 *
 * This determines how the template used by the quest logs to parse information
 * regarding the quests themselves. By default, they are formatted like such:
 *
 * ---
 *
 * \{[[Title]]\}
 * \c[4]Level:\c[0] [[Difficulty]]
 * \c[4]From:\c[0] [[From]]
 * \c[4]Location:\c[0] [[Location]]
 * 
 * \c[4]Description:\c[0]
 * [[Description]]
 * 
 * \c[4]Objectives:\c[0]
 * [[Objectives]]
 * 
 * \c[4]Rewards:\c[0]
 * [[Rewards]]
 * 
 * [[Subtext]]
 * 
 * [[Quote]]
 *
 * ---
 * 
 * Each [[Marker]] is to be replaced by the quest date related to them.
 *
 * - [[Title]] - Inserts the title of the quest.
 * 
 * - [[RawTitle]] - Inserts the title of the quest without any text codes
 *   removed. Keep in mind that icons do NOT resize based on the text size.
 *
 * - [[Difficulty]] - Inserts the quest difficulty text.
 *
 * - [[From]] - Inserts the quest origin text.
 *
 * - [[Location]] - Inserts the quest location text.
 *
 * - [[Description]] - Inserts the currently active quest description.
 *   - The quest description can change depending on which Description ID
 *     is currently active for that quest.
 *
 * - [[Objectives]] - Inserts a list of the visible quest objectives.
 *   - The quest objectives visible to the player will be determined by
 *     the quest's Visible Objectives settings and any Plugin Commands
 *     used to alter which objectives are visible and what state they are
 *     currently in (known, completed, failed).
 *
 * - [[Rewards]] - Inserts a list of visible quest rewards.
 *   - The quest rewards visible to the player will be determined by the
 *     quest's Visible Rewards settings and any Plugin Commands used to
 *     alter which rewards are visible and what state they are currently
 *     in (known, claimed, denied).
 *
 * - [[Subtext]] - Inserts the currently active quest subtext.
 *   - The quest subtext can change depending on which Subtext ID is
 *     currently active for that quest.
 *
 * - [[Quote]] - Inserts the currently active quest quote.
 *   - The quest quote can change depending on which Quote ID is
 *     currently active for that quest.
 *
 * ---
 *
 * Each of the following aspects of the quests can be changed through the usage
 * of Plugin Commands:
 *
 * - Description
 * - Objectives
 * - Rewards
 * - Subtext
 * - Quote
 *
 * The following are the Plugin Commands that can change them:
 *
 * - Quest: Description Change
 * - Quest: Objectives Change
 * - Quest: Rewards Change
 * - Quest: Subtext Change
 * - Quest: Quote Change
 *
 * ---
 *
 * More information will be explained in their respective Plugin Parameter
 * sections further down in the help file.
 *
 * ============================================================================
 * Control Variable and Conditional Branch Usage
 * ============================================================================
 * 
 * For those wanting to use Control Variable event commands and/or Conditional
 * Branch event commands with the Quest Journal System plugin, you can insert
 * the following functions into the "Script" input fields of the respective
 * event commands.
 * 
 * These are new JavaScript functions added through this plugin and will not
 * work without it.
 * 
 * ---
 * 
 * === Control Variable Script Functions ===
 * 
 * These are newly added JavaScript functions that return a numeric value.
 * The functions are best used with the Control Variable script input field.
 * 
 * ---
 * 
 * totalQuestsAvailable()
 * 
 * - Returns the total number of quests available for the player.
 * 
 * ---
 * 
 * totalQuestsCompleted()
 * 
 * - Returns the total number of quests completed by the player.
 * 
 * ---
 * 
 * totalQuestsFailed()
 * 
 * - Returns the total number of quests failed by the player.
 * 
 * ---
 * 
 * totalQuestsRevealed()
 * 
 * - Returns the total number of quests visible to the player.
 * 
 * ---
 * 
 * totalQuestsInGame()
 * 
 * - Returns the total number of quests available in-game.
 * 
 * ---
 * 
 * getQuestDescriptionIndex(questKey)
 * 
 * - Returns the select quest's current description index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestDescriptionIndex('Welcome')
 * 
 * ---
 * 
 * totalVisibleQuestObjectives(questKey)
 * 
 * - Returns the total number of visible quest objectives for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalVisibleQuestObjectives('Welcome')
 * 
 * ---
 * 
 * totalQuestObjectives(questKey)
 * 
 * - Returns the total number of quest objectives for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalQuestObjectives('Welcome')
 * 
 * ---
 * 
 * totalVisibleQuestRewards(questKey)
 * 
 * - Returns the total number of visible quest rewards for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalVisibleQuestRewards('Welcome')
 * 
 * ---
 * 
 * totalQuestRewards(questKey)
 * 
 * - Returns the total number of quest rewards for selected quest.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: totalQuestRewards('Welcome')
 * 
 * ---
 * 
 * getQuestSubtextIndex(questKey)
 * 
 * - Returns the select quest's current subtext index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestSubtextIndex('Welcome')
 * 
 * ---
 * 
 * getQuestQuoteIndex(questKey)
 * 
 * - Returns the select quest's current subtext index ID.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Example: getQuestQuoteIndex('Welcome')
 * 
 * ---
 * 
 * === Conditional Branch Script Functions ===
 * 
 * These are newly added JavaScript functions that return a true/false value.
 * The functions are best used with the Conditional Branch script input field.
 * 
 * ---
 * 
 * isQuestObjectiveCompleted(questKey, objectiveID)
 * 
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is completed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveCompleted('Welcome', 1)
 * 
 * ---
 * 
 * isQuestObjectiveFailed(questKey, objectiveID)
 * 
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is failed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveFailed('Welcome', 1)
 * 
 * ---
 * 
 * isQuestObjectiveUncleared(questKey, objectiveID)
 * 
 * - Returns a true/false value depending on the selected quest's objective
 *   and if it is uncleared.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest objective you want
 *   to check.
 * - Example: isQuestObjectiveUncleared('Welcome', 1)
 * 
 * ---
 * 
 * isQuestRewardClaimed(questKey, rewardID)
 * 
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is claimed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardClaimed('Welcome', 1)
 * 
 * ---
 * 
 * isQuestRewardDenied(questKey, rewardID)
 * 
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is denied.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardDenied('Welcome', 1)
 * 
 * ---
 * 
 * isQuestRewardUnclaimed(questKey, rewardID)
 * 
 * - Returns a true/false value depending on the selected quest's reward
 *   and if it is unclaimed.
 * - Replace 'questKey' with the 'Quest ID Key' of the desired quest to gather
 *   data from. You can find out what the 'Quest ID Key' is in the plugin's
 *   parameters > Quest Categories > target category > Quests > selected quest
 *   > Quest ID Key.
 * - Insert quotes around the 'questKey' to ensure it works.
 * - Replace 'objectiveID' with the numeric ID of the quest reward you want
 *   to check.
 * - Example: isQuestRewardUnclaimed('Welcome', 1)
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
 * ---
 * 
 * === Action Tracking-Related Notetags ===
 * 
 * ---
 *
 * <Variable id On Use: +x>
 * <Variable id On Use: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Whenever any actor uses this specific skill or item, increase or decrease
 *   the target variable by a certain amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 * 
 * === Enemy Tracking-Related Notetags ===
 * 
 * ---
 *
 * <Variable id On Death: +x>
 * <Variable id On Death: -x>
 *
 * - Used for: Enemy Notetags
 * - Whenever this specific enemy dies, increase or decrease the target
 *   variable by a certain amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 * 
 * === Item Tracking-Related Notetags ===
 * 
 * ---
 *
 * <Variable id On Gain: +x>
 * <Variable id On Gain: -x>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever the party gains the specific item, weapon, or armor, increase or
 *   decrease the target variable by a certai amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 * 
 * ---
 *
 * <Variable id On Lose: +x>
 * <Variable id On Lose: -x>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever the party loses the specific item, weapon, or armor, increase or
 *   decrease the target variable by a certai amount.
 * - Replace 'id' with the Variable ID you wish to alter.
 * - Replace 'x' with the increase or decrease in value for the variable.
 *
 * ---
 *
 * <Track With Variable id>
 *
 * - Used Item, Weapon, Armor Notetags
 * - Whenever there is a change made to the specific item, weapon, or armor,
 *   set the value of the target variable to the number of items owned.
 * - Replace 'id' with the Variable ID you wish to alter.
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
 * === Quest Plugin Commands ===
 * 
 * ---
 *
 * Quest: Add/Complete/Fail/Remove
 * - Adds quest(s) to be known/completed/failed.
 * - Or removes them.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Status:
 *   - Change the status to this.
 *     - Add to Known
 *     - Add to Completed
 *     - Add to Failed
 *     - Remove from All
 *
 * ---
 *
 * Quest: Description Change
 * - Changes the description of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Description ID:
 *   - Change the description of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Quest: Objectives Change
 * - Changes the objective(s) status of the quest(s).
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Objective ID(s):
 *   - Select the objective ID(s) to change.
 *   - You may use JavaScript code.
 *
 *   Status:
 *   - Change the status of the objective(s) to this.
 *     - Show Objective(s)
 *     - Complete Objective(s)
 *     - Fail Objective(s)
 *     - Remove Objective(s)
 *
 * ---
 *
 * Quest: Quote Change
 * - Changes the quote of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Subtext ID:
 *   - Change the quote of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Quest: Rewards Change
 * - Changes the reward(s) status of the quest(s).
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Reward ID(s):
 *   - Select the reward ID(s) to change.
 *   - You may use JavaScript code.
 *
 *   Status:
 *   - Change the status of the reward(s) to this.
 *     - Show Reward(s)
 *     - Claim Reward(s)
 *     - Deny Reward(s)
 *     - Remove Reward(s)
 *
 * ---
 *
 * Quest: Subtext Change
 * - Changes the subtext of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Subtext ID:
 *   - Change the subtext of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Tracker Plugin Commands ===
 * 
 * ---
 *
 * Tracker: Change Quest
 * - Changes the tracked quest.
 *
 *   Quest Key:
 *   - Insert the quest key here.
 *
 * ---
 *
 * Tracker: Refresh Window
 * - Refreshes the quest tracker window.
 *
 * ---
 *
 * Tracker: Show/Hide Window
 * - Can forcefully hide window.
 * - Showing will depend on the player's Options setting.
 *
 *   Show/Hide?:
 *   - Shows/hides the tracker window on the map.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Call Scene_Quest
 * - Opens Scene_Quest for the player.
 * - Does not work in battle.
 *
 * ---
 *
 * System: Enable Quests in Menu?
 * - Enables/disables quest menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables quest menu inside the main menu.
 *
 * ---
 *
 * System: Show Quests in Menu?
 * - Shows/hides quest menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides quest menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The general settings determine various aspects of the Quest System plugin
 * from the quests that appear at the start of the game to how it's displayed
 * inside menus.
 *
 * ---
 *
 * Starting Quests
 * 
 *   Known Quests:
 *   - Which quests are known at the start of the game?
 *   - Insert their keys here.
 * 
 *   Completed Quests:
 *   - Which quests are completed at the start of the game?
 *   - Insert their keys here.
 * 
 *   Failed Quests:
 *   - Which quests are failed at the start of the game?
 *   - Insert their keys here.
 * 
 *   Tracked Quest:
 *   - Which quest is tracked at the start of the game?
 *
 * ---
 *
 * Scene_Quest
 *
 * ---
 * 
 * Scene_Quest > Background Settings:
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
 * Scene_Quest > Vocab
 *
 * ---
 * 
 * Scene_Quest > Vocab > Command Window
 * 
 *   Command: Known:
 *   - Text used to display known quests.
 *
 *   Command: Completed:
 *   - Text used to display completed quests.
 * 
 *   Command: Failed:
 *   - Text used to display failed quests.
 *
 * ---
 *
 * Scene_Quest > Vocab > Label Window
 * 
 *   Empty Title:
 *   - Text displayed in the Label Window when no quest is selected.
 *
 * ---
 *
 * Scene_Quest > Vocab > List Window
 * 
 *   Open Categories:
 *   - Text format for an open category.
 *   - %1 - Category Name, %2 - Quest Amount
 * 
 *   Closed Categories:
 *   - Text format for a closed category.
 *   - %1 - Category Name, %2 - Quest Amount
 * 
 *   No Quest Listed:
 *   - Text when no quest is listed.
 * 
 *   Tracked Quest:
 *   - Text format for a tracked quest.
 *   - %1 - Tracked Quest's Name
 *
 * ---
 *
 * Scene_Quest > Vocab > Log Window
 * 
 *   Empty Message:
 *   - Text displayed when no quest is selected.
 *
 *     JS: On Load:
 *     - Runs code upon making the empty message.
 *     - Useful for setting up variables.
 * 
 *   Quest Log:
 *   - Text format for Quest Log Window.
 *   - Instructions:
 *     - Insert the [[Keyword]] marks in the text where you want certain parts
 *       of the quest to appear.
 *
 *       - [[Title]] - Inserts the title of the quest.
 *
 *       - [[Difficulty]] - Inserts the quest difficulty text.
 *
 *       - [[From]] - Inserts the quest origin text.
 *
 *       - [[Location]] - Inserts the quest location text.
 *
 *       - [[Description]] - Inserts the currently active quest description.
 *         - The quest description can change depending on which Description ID
 *           is currently active for that quest.
 *
 *       - [[Objectives]] - Inserts a list of the visible quest objectives.
 *         - The quest objectives visible to the player will be determined by
 *           the quest's Visible Objectives settings and any Plugin Commands
 *           used to alter which objectives are visible and what state they are
 *           currently in (known, completed, failed).
 *
 *       - [[Rewards]] - Inserts a list of visible quest rewards.
 *         - The quest rewards visible to the player will be determined by the
 *           quest's Visible Rewards settings and any Plugin Commands used to
 *           alter which rewards are visible and what state they are currently
 *           in (known, claimed, denied).
 *
 *       - [[Subtext]] - Inserts the currently active quest subtext.
 *         - The quest subtext can change depending on which Subtext ID is
 *           currently active for that quest.
 *
 *       - [[Quote]] - Inserts the currently active quest quote.
 *         - The quest quote can change depending on which Quote ID is
 *           currently active for that quest.
 * 
 *   Objective (Known):
 *   - Text format for known objectives.
 *   - %1 - Objective Text
 * 
 *   Objective (Done):
 *   - Text format for complete objectives.
 *   - %1 - Objective Text
 * 
 *   Objective (Failed):
 *   - Text format for failed objectives.
 *   - %1 - Objective Text
 * 
 *   Reward (Known):
 *   - Text format for normal rewards.
 *   - %1 - Reward Text
 * 
 *   Reward (Claimed):
 *   - Text format for claimed rewards.
 *   - %1 - Reward Text
 * 
 *   Reward (Denied):
 *   - Text format for denied rewards.
 *   - %1 - Reward Text
 *
 * ---
 *
 * Scene_Quest > Vocab > Button Assist Window
 * 
 *   Scroll Up/Down:
 *   - Text for Page Up/Down to scroll log window.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Tracker:
 *   - Text for tracking quests.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Expand:
 *   - Text for expanding categories.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Collapse:
 *   - Text for collapsing categories.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Scene_Quest > Icons
 * 
 *   Icon: Known:
 *   - Icon used for this command.
 * 
 *   Icon: Completed:
 *   - Icon used for this command.
 * 
 *   Icon: Failed:
 *   - Icon used for this command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Category Settings
 * ============================================================================
 *
 * Quest Categories separate the quest types in your game. These can be used to
 * help players differentiate which are story-driven quests, which are optional
 * quests, recurring quests, etc. These have limited settings, but serve as
 * containers for quests that fall under its category.
 *
 * ---
 *
 * Category
 * 
 *   Category Name:
 *   - This category's name.
 *   - You may use text codes.
 * 
 *   Quests:
 *   - A list of quests listed under this category.
 *   - Quests will be listed in the same order as this parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Settings
 * ============================================================================
 *
 * Each Quest Category will contain a list of quests that can appear in-game.
 * These individual quests make up the meat and bones of the Quest System and
 * will serve to relay information to the player on what he/she needs to do in
 * order to make progress in your game.
 *
 * ---
 *
 * Quest
 * 
 *   Quest ID Key:
 *   - This quest's identification key. Quests require unique keys for the
 *     plugin to differentiate them.
 *   - It is VERY important that you keep this key unique from other quests in
 *     order for the Quest System to operate properly in your game.
 *
 * ---
 *
 * Header
 * 
 *   Title:
 *   - The title of the quest. This is what appears in-game.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Title]] marker.
 * 
 *   Difficulty:
 *   - Difficulty level for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Difficulty]] marker.
 * 
 *   From:
 *   - Insert the name of the one who issued this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[From]] marker.
 * 
 *   Location:
 *   - Insert location name where this quest was issued.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Location]] marker.
 * 
 *   Description:
 *   - Type out the description(s) used for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Description]] marker.
 *   - The displayed description will depend on the Description ID set through
 *     Plugin Command.
 *   - If no Description ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 *
 * ---
 *
 * Lists
 * 
 *   Objectives List:
 *   - The objectives to be completed for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Objectives]] marker.
 *   - Depending on which ID's are set to visible, a list will created at the
 *     marker displaying each of the objectives.
 *    - This can be done thorugh the Visible Objectives parameter or through
 *      Plugin Commands.
 * 
 *   Visible Objectives:
 *   - The objectives that are visible from the start.
 * 
 *   Rewards List:
 *   - The reward list for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Rewards]] marker.
 *   - Depending on which ID's are set to visible, a list will created at the
 *     marker displaying each of the rewards.
 *    - This can be done thorugh the Visible Rewards parameter or through
 *      Plugin Commands.
 * 
 *   Visible Rewards:
 *   - The rewards that are visible from the start.
 *
 * ---
 *
 * Footer
 * 
 *   Subtext:
 *   - Subtext to be displayed with the quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Subtext]] marker.
 *   - The displayed description will depend on the Subtext ID set through
 *     Plugin Command.
 *   - If no Subtext ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 * 
 *   Quotes:
 *   - Quotes to be displayed with the quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Quote]] marker.
 *   - The displayed description will depend on the Quote ID set through
 *     Plugin Command.
 *   - If no Quote ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Load:
 *   - Runs code upon loading the quest in Scene_Quest.
 *   - Useful for setting up variables.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Tracker Settings
 * ============================================================================
 *
 * The Quest Tracker Window is a window that appears on the map scene to
 * display the objectives (and other desired information) of the currently
 * tracked quest decided by the player.
 *
 * ---
 *
 * General
 *
 *   Tracker Format:
 *   - Text format for Quest Tracker Window.
 *   - Read help file for instructions.
 * 
 * ---
 * 
 * Fading
 * 
 *   Close Minimum Opacity:
 *   - Minimum opacity when the player is too close to the quest tracker on
 *     the map screen.
 * 
 *   Tracker Fade Speed: 
 *   - Fade speed of the tracker when toggled on/off.
 *   - Lower is slower. Higher is faster.
 *
 * ---
 *
 * Options
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Add Show Tracker?:
 *   - Add the 'Show Tracker' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Add Position Tracker?:
 *   - Add the 'Position Tracker' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *     Option OFF:
 *     - Text displayed when the option is OFF.
 * 
 *     Option ON:
 *     - Text displayed when the option is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Set up the main menu defaults.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'Quest' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Quest' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Quest' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Quest.
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
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * These settings let you control the various windows that appear in the
 * Scene_Quest menu and the Quest Tracker Window that appears in Scene_Map.
 *
 * ---
 *
 * Command Window
 * 
 *   Show Failed Quests?:
 *   - Show/hide Failed Quests in the command window.
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Quest Label
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Log Window
 * 
 *   PageUp/Down Speed:
 *   - Scroll speed for PageUp/Down.
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 *   EXPERIMENTAL:
 * 
 *     Automatic Word Wrap?:
 *     - Enables/disables automatic word wrap.
 *     - Requires VisuMZ_1_MessageCore!
 *     - This feature is experimental. Word Wrap does not worth perfectly
 *       with the Log Window, although it performs well enough. This feature
 *       will be updated and completed at a later point in the future. Use it
 *       at your own discretion.
 *
 * ---
 *
 * List Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Tracker Window
 * 
 *   Window Scale:
 *   - How much do you want to scale the Tracker Window's size by?
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * JavaScript Functions
 * ============================================================================
 *
 * These are some new JavaScript functions that you can use for the
 * 'JS: On Load' Plugin Parameter found in the Quest settings.
 *
 * Using these require you to have an adequate understanding of how JavaScript
 * works in order to successfully use it.
 *
 * ---
 *
 * $gameSystem.setQuestStatus(key, status)
 * - Changes the quest's completion status.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'completed'
 *   - 'failed'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestStatus('exampleName', 'completed')
 *
 * ---
 *
 * $gameSystem.setQuestDescription(key, id)
 * - Changes the quest's description.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with description ID to use.
 *
 * Example: $gameSystem.setQuestDescription('exampleName', 2)
 *
 * ---
 *
 * $gameSystem.setQuestObjectives(key, ids, status)
 * - Changes the quest's objectives.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'ids' with an array of ID's to use.
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'completed'
 *   - 'failed'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestDescription('exampleName', [1, 2, 3], 'failed')
 *
 * ---
 *
 * $gameSystem.setQuestRewards(key, ids, status)
 * - Changes the quest's rewards.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'ids' with an array of ID's to use.
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'claimed'
 *   - 'denied'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestRewards('exampleName', [1, 3, 5], 'claimed')
 *
 * ---
 *
 * $gameSystem.setQuestSubtext(key, id)
 * - Changes the quest's subtext.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with subtext ID to use.
 *
 * Example: $gameSystem.questSubtext('exampleName', 3)
 *
 * ---
 *
 * $gameSystem.setQuestQuote(key, id)
 * - Changes the quest's quote.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with quote ID to use.
 *
 * Example: $gameSystem.setQuestQuote('exampleName', 4)
 *
 * ---
 *
 * DISCLAIMER:
 *
 * Keep in mind that VisuStella is NOT responsible for your proficiency (or
 * otherwise) of JavaScript.
 *
 * If you get any errors with the custom code, it is up to YOU to fix it.
 * 
 * If you do not understand how any of this section works, do not be afraid.
 * It's not the end of the world.
 * 
 * You can still change the status of the quests and its objectives through the
 * usage of Plugin Commands.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.15: October 6, 2022
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.14: August 18, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Quest Tracker Settings > Fading > Close Minimum Opacity
 * *** Quest Tracker Settings > Fading > Tracker Fade Speed
 * **** These settings allow you to make the quest tracker become opaque the
 *      moment the player comes near the quest tracker on the screen.
 * 
 * Version 1.13: March 10, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.12: July 9, 2021
 * * Feature Update!
 * ** Improved calculations for determining window size. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Feature!
 * ** Added new [[Marker]] to Quest Log format and Quest Tracker formats.
 * *** [[RawTitle]] - Inserts the title of the quest without any text codes
 *     removed. Keep in mind that icons do NOT resize based on the text size.
 * 
 * Version 1.10: December 11, 2020
 * * Bugs Fixed!
 * ** Quest tracking should now automatically remove itself once a quest is
 *    dubbed complete, failed, or removed. Fix made by Yanfly.
 * 
 * Version 1.09: November 29, 2020
 * * Bug Fixed!
 * ** The Button Assist Window will now properly display the text for expanding
 *    and collapsing quest categories. Fix made by Arisu.
 * 
 * Version 1.08: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 1, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Updates!
 * ** When multiple parallel events are occuring, they will no longer cause lag
 *    by inducing multiple refreshes at a time. Update by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Quest Tracker Settings > Tracker Format
 * **** Text format for Quest Tracker Window. This lets you customize the text
 *      that appears in the Quest Tracker instead of just having the title and
 *      the objectives.
 * 
 * Version 1.06: October 25, 2020
 * * Feature Update!
 * ** If Message Core is not detected, <ColorLock> and </ColorLock> notetags
 *    will be automatically removed. Added by Arisu.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** "Control Variable and Conditional Branch Usage" section added for those
 *    who wish to gather data for the script input fields of the mentioned
 *    event commands.
 * 
 * Version 1.04: October 4, 2020
 * * Bug Fixes!
 * ** Quest Tracker window refreshes should no longer cause infinite loops when
 *    used with specific script calls. Fix made by Yanfly.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** For all the new features!
 * * New Features!
 * ** New notetags added by Olivia!
 * ** <Variable id On Death: +x> and <Variable id On Death: -x> for enemies.
 * ** <Variable id On Gain: +x> and <Variable id On Gain: -x> for items,
 *    weapons, and armors.
 * ** <Variable id On Lose: +x> and <Variable id On Lose: -x> for items,
 *    weapons, and armors.
 * ** <Track With Variable id> for items, weapons, and armors.
 * ** <Variable id On Use: +x> and <Variable id On Use: -x> for items & skills.
 * 
 * Version 1.02: September 13, 2020
 * * Bugs Fixed!:
 * ** Quest Tracker Window should no longer flicker.
 * 
 * Version 1.01: September 6, 2020
 * * Bug Fixed!
 * ** Disabled track windows no longer appear on the screen for one frame after
 *    leaving a menu of any sort. Fix made by Yanfly.
 * ** Viewing the failed quests no longer crash the game. Fix made by Yanfly.
 * * Feature Update!
 * ** The following Plugin Commands will now automatically update the tracker
 *    if needed. Feature update by Yanfly.
 * *** Quest: Add/Complete/Fail/Remove
 * *** Quest: Description Change
 * *** Quest: Objectives Change
 * *** Quest: Quote Change
 * *** Quest: Rewards Change
 * *** Quest: Subtext Change
 *
 * Version 1.00: August 31, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestSet
 * @text Quest: Add/Complete/Fail/Remove
 * @desc Adds quest(s) to be known/completed/failed.
 * Or removes them.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Add to Known
 * @value known
 * @option Add to Completed
 * @value completed
 * @option Add to Failed
 * @value failed
 * @option Remove from All
 * @value remove
 * @desc Change the status to this.
 * @default known
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestDescription
 * @text Quest: Description Change
 * @desc Changes the description of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Description ID
 * @desc Change the description of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestObjectives
 * @text Quest: Objectives Change
 * @desc Changes the objective(s) status of the quest(s).
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetIDs:arrayeval
 * @text Objective ID(s)
 * @type string[]
 * @desc Select the objective ID(s) to change.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Show Objective(s)
 * @value show
 * @option Complete Objective(s)
 * @value complete
 * @option Fail Objective(s)
 * @value fail
 * @option Remove Objective(s)
 * @value remove
 * @desc Change the status of the objective(s) to this.
 * @default show
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestQuote
 * @text Quest: Quote Change
 * @desc Changes the quote of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Quote ID
 * @desc Change the quote of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestRewards
 * @text Quest: Rewards Change
 * @desc Changes the reward(s) status of the quest(s).
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetIDs:arrayeval
 * @text Reward ID(s)
 * @type string[]
 * @desc Select the reward ID(s) to change.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Show Reward(s)
 * @value show
 * @option Claim Reward(s)
 * @value claim
 * @option Deny Reward(s)
 * @value deny
 * @option Remove Reward(s)
 * @value remove
 * @desc Change the status of the reward(s) to this.
 * @default show
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestSubtext
 * @text Quest: Subtext Change
 * @desc Changes the subtext of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Subtext ID
 * @desc Change the subtext of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerChangeQuest
 * @text Tracker: Change Quest
 * @desc Changes the tracked quest.
 *
 * @arg Key:str
 * @text Quest Key
 * @desc Insert the quest key here.
 * @default Example
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerRefreshWindow
 * @text Tracker: Refresh Window
 * @desc Refreshes the quest tracker window.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerShowHide
 * @text Tracker: Show/Hide Window
 * @desc Can forcefully hide window.
 * Showing will depend on the player's Options setting.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Shows/hides the tracker window on the map.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemCallSceneQuest
 * @text System: Call Scene_Quest
 * @desc Opens Scene_Quest for the player.
 * Does not work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableQuestMenu
 * @text System: Enable Quests in Menu?
 * @desc Enables/disables quest menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables quest menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowQuestMenu
 * @text System: Show Quests in Menu?
 * @desc Shows/hides quest menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides quest menu inside the main menu.
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
 * @param QuestSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings for the Quest System.
 * @default {"StartingQuests":"","KnownQuests:arraystr":"[\"Welcome\",\"Example\",\"Plugin_Tutorial_Title\",\"Plugin_Tutorial_Difficulty\",\"Plugin_Tutorial_From\",\"Plugin_Tutorial_Description\",\"Plugin_Tutorial_Objectives\",\"Plugin_Tutorial_Rewards\",\"Plugin_Tutorial_Subtext\",\"Plugin_Tutorial_Quote\",\"Challenge_Plugin_Variables\",\"Challenge_Plugin_Switches\"]","CompletedQuests:arraystr":"[]","FailedQuests:arraystr":"[]","TrackedQuest:str":"Welcome","SceneQuest":"","Vocab":"","VocabCommandWindow":"","CommandWindow_Known_Text:str":"Available","CommandWindow_Completed_Text:str":"Completed","CommandWindow_Failed_Text:str":"Failed","VocabLabelWindow":"","EmptyTitleLabel:str":"\\i[186]Quest Journal","VocabListWindow":"","ListWindowCategoryOpenFmt:str":"- %1(%2)","ListWindowCategoryCloseFmt:str":"+ %1(%2)","NoQuestListed:str":"(No Quests Listed)","ListWindowTrackedQuest:str":"\\c[17]%1\\c[0]","VocabLogWindow":"","LogEmpty:json":"\"\\\\c[5]Main Quests\\\\c[0] are quests that must be\\ncompleted in order to progress further\\ninto the game's story.\\n\\n\\\\c[6]Side Quests\\\\c[0] are optional quests that can\\nbe completed at your discretion. Upon\\ncompleting a side quest, you can receive\\nuseful rewards that may assist you on\\nyour journey.\"","OnLoadQuestJS:func":"\"// Insert JavaScript code here.\"","LogFmt:json":"\"\\\\{[[Title]]\\\\}\\n\\\\c[4]Level:\\\\c[0] [[Difficulty]]\\n\\\\c[4]From:\\\\c[0] [[From]]\\n\\\\c[4]Location:\\\\c[0] [[Location]]\\n\\n\\\\c[4]Description:\\\\c[0]\\n[[Description]]\\n\\n\\\\c[4]Objectives:\\\\c[0]\\n[[Objectives]]\\n\\n\\\\c[4]Rewards:\\\\c[0]\\n[[Rewards]]\\n\\n[[Subtext]]\\n\\n[[Quote]]\"","Objective_Normal_Fmt:str":"◎%1","Objective_Completed_Fmt:str":"\\c[24]<ColorLock>✔%1</ColorLock>\\c[0]","Objective_Failed_Fmt:str":"\\c[25]<ColorLock>✘%1</ColorLock>\\c[0]","Reward_Normal_Fmt:str":"◎%1","Reward_Completed_Fmt:str":"\\c[24]<ColorLock>✔%1</ColorLock>\\c[0]","Reward_Failed_Fmt:str":"\\c[25]<ColorLock>✘%1</ColorLock>\\c[0]","ButtonAssistWindow":"","ButtonAssistPageUpDown:str":"Scroll Up/Down","questButtonAssistActive:str":"Track","ButtonAssistExpand:str":"Expand","ButtonAssistCollapse:str":"Collapse","CommandWindowIcons":"","CommandWindow_Known_Icon:num":"193","CommandWindow_Completed_Icon:num":"192","CommandWindow_Failed_Icon:num":"194"}
 *
 * @param Categories:arraystruct
 * @text Quest Categories
 * @type struct<Category>[]
 * @desc A list of categories and their quests.
 * @default ["{\"CategoryName:str\":\"\\\\C[5]Main Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Welcome\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Welcome Quest\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Thank you for using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplugin made by \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella MZ\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThis is an example quest to demonstrate\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhow the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] works. It functions\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nprimarily as a log book for the various\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nadventures inside your game.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Take a look at the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] menu.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]tracked quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to something else.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[186]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] for your game!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[84]Helping support \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Example\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Example Quest\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is where the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngoes. Type in whatever text you need\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhere in order to explain to the player\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nabout the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Describe each of the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhere for the player.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can have multiple quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nout at once.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If you do, make sure you have the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Visible Objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] list the ID's of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe objectives you want visible from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe very beginning.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Here, you can list all the rewards the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngame will give the player upon the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncompletion of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can list the rewards however you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nlike, but do keep it concise.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can list multiple rewards, too.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If you do, make sure you have the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Visible Rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] list the ID's of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrewards you want visible from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nvery beginning.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is a \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]. It is used as extra\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ntext that you may want to place on your\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest journal that differs from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"We learn by example and by direct\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nexperience because there are real limits\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto the adequacy of verbal instruction.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Malcolm Gladwell\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"CategoryName:str\":\"\\\\c[6]Side Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Title\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Titles\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"The quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is listed in three\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndifferent places in the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Scene\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n1. The top of the screen.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n2. The top of the quest log entry.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n3. The quest list on the side.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nBe sure to put some thought in deciding\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyour titles as they are there to convey\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nwhat the quest is all about.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the title through the quest's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can use icons in the quest title by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[x]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] text code. Keep in mind\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthat the icon will be removed from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest log entry.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A good title is the title of a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsuccessful book.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Raymond Chandler\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Difficulty\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Difficulty\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can be used to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nconvey what kinds of expectations they\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nshould have regarding challenge.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThese can range from star ratings like:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[87]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[87]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nLevel ranges like:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Level 20+\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the difficulty through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A quest's difficulty is often used to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrelay the expected level of conflict a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplayer may face.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A pessimist sees the difficulty in\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nevery opportunity; an optimist sees the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nopportunity in every difficulty.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Winston Churchill\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_From\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]From\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Explaining which \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]NPC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] the quest is from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncan help remind the player its origin\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nand also help save the player some time\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nin trying to find that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]NPC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] again when\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngoing to claim the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" text through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]From\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]From\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Use the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] as a means to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstreamline your player's experience.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"More important than the quest for\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncertainty is the quest for clarity.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Francois Gautier\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Description\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Descriptions\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Insert the quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThe displayed \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] will\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndepend on the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Description ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] that is\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncurrently active for the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is the updated quest description. This\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncan only be seen when it is Description ID #2.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Description ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Description Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Description Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Descriptions are valuable tools that can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbe used to help remind the player the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\npurpose of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Description begins in the writer's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nimagination but should finish in the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nreader's.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Stephen King\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Objectives\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Objectives\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium-Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] are used to streamline\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe goals the player needs to achieve in\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\norder to make progress.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the status of each\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Known\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Completed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]Failed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can also \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]remove\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] objectives from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbeing viewed.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can determine the default \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nobjectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Visible\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nObjectives \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can reveal new \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough the use of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Objectives Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]The following are examples:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Known Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Completed Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Failed Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Objectives Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Treat \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] like a set of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ninstructions or outline for the player\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto follow in order to get the desired\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresult both of you want.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"People with objectives succeed because\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthey know where they're going.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Earl Nightingale\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Plugin_Tutorial_Objectives';\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [5], 'show');\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [6], 'complete');\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [7], 'fail');\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Rewards\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Rewards\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium-Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] are the goodies that are\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\npromised to be given to the player upon\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe completion of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the status of each\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Known\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Claimed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]Denied\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can also \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]remove\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] rewardsfrom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbeing viewed.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can determine the default \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Visible\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nRewards \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Rewards Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can reveal new \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough the use of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Rewards Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]The following are examples:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Known Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Claimed Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Denied Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Rewards are incentives for the player to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncomplete them, especially quests of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhigher difficulty levels.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Reward the behavior you want repeated.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Larry Winget\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Plugin_Tutorial_Rewards';\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [4], 'show');\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [5], 'claim');\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [6], 'deny');\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Subtext\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Subtexts\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"The \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] section can be used in a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnumber of ways, from hints to summaries,\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto warnings.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nAnd like the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], you can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nchange the text displayed in the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough changing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Subtext ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Subtext ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Subtexts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can serve as hints, summaries,\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nwarnings, reminders, you name it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"After all, reminding a player to do\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsomething only means you want them to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsucceed at it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A discerning eye needs only a hint, and\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nunderstatement leaves the imagination\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nfree to build its own elaborations.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Russell Page\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Quote\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Quotes\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quotes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can be used to reference specific\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nlines of dialogue that could help the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplayer understand what's needed to be\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndone.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nOr they could just be \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quotes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] made by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\njust about anyone.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nAnd like quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]descriptions and quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtexts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], the quest quotes can also be\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nchanged to display something else based\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\non the quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quote ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Quote ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Quote Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"How you want to use them is up to you.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You miss 100% of the shots you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndon't take.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Micahel Scott\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If at first you don't succeed, then\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nskydiving definitely isn't for you.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Steven Wright\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"CategoryName:str\":\"\\\\c[2]Challenge Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Challenge_Plugin_Variables\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[5]Variables\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game variables are set\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nup to automatically equal the number of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nof the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]first item\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] in the inventory.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThe \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] will automatically set\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nitself to completed if the variable's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nvalue is determined to be over 10.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Obtain \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\v[1]/10x First Database Item!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Knowledge for \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]DISCLAIMER:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nKeep in mind that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is NOT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresponsible for your proficiency (or\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\notherwise) of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you get any errors with the custom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncode, it is up to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to fix it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you do not understand how any of this\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsection works, do not be afraid. It's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnot the end of the world.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nYou can still change the status of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quests\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] and its \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusage of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Commands\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst value = $gameParty.numItems($dataItems[1])\\\\\\\\\\\\\\\\nconst status = value >= 10 ? 'completed' : 'known';\\\\\\\\\\\\\\\\nconst key = 'Challenge_Plugin_Variables';\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\n$gameVariables.setValue(1, value);\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [1], status)\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Challenge_Plugin_Switches\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[5]Switches\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game switch 1's ON/OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstatus will determine which description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthis quest will use.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nGame Switch 1 is now \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nDescription ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is being used.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game switch 1's ON/OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstatus will determine which description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthis quest will use.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nGame Switch 1 is now \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]ON\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nDescription ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is being used.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change Switch 1's ON/OFF status.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"View this quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Knowledge for \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]DISCLAIMER:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nKeep in mind that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is NOT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresponsible for your proficiency (or\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\notherwise) of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you get any errors with the custom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncode, it is up to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to fix it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you do not understand how any of this\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsection works, do not be afraid. It's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnot the end of the world.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nYou can still change the status of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quests\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] and its \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusage of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Commands\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Challenge_Plugin_Switches';\\\\\\\\\\\\\\\\nconst id = $gameSwitches.value(1) ? 2 : 1;\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\n$gameSystem.setQuestDescription(key, id)\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]
 *
 * @param Tracker:struct
 * @text Quest Tracker Settings
 * @type struct<Tracker>
 * @desc Setup how all the quest tracker works.
 * @default {"General":"","TrackerFmt:json":"\"\\\\{[[Title]]\\\\}\\n[[Objectives]]\"","Options":"","AdjustRect:eval":"true","AddShowOption:eval":"true","ShowName:str":"Show Quest Tracker","AddPositionOption:eval":"true","PositionName:str":"Quest Tracker Position","PositionOff:str":"←","PositionOn:str":"→"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Set up the main menu defaults.
 * @default {"Name:str":"Quest","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Quest.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Setup how all the windows appear in-game.
 * @default {"CommandWindow":"","ShowFailed:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CommandWindow_BgType:num":"0","CommandWindow_Rect:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(Window_QuestCommand.prototype.totalCommands(), true);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","QuestLabel":"","QuestLabel_BgType:num":"0","QuestLabel_Rect:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, false);\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","LogWindow":"","LogWindow_Auto_WordWrap:eval":"false","LogWindow_ScrollSpeed:num":"0.20","LogWindow_BgType:num":"0","LogWindow_Rect:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.mainAreaHeight() - this.questLabelWindowRect().height;\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop() + this.questLabelWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ListWindow":"","ListWindow_BgType:num":"0","ListWindow_Rect:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.mainAreaHeight() - this.commandWindowRect().height;\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nconst wy = this.mainAreaTop() + this.commandWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","TrackerWindow":"","TrackerWindow_Scale:num":"0.50","TrackerWindow_BgType:num":"0","TrackerWindow_Rect:func":"\"const ww = 560;\\nconst wh = Graphics.height / Window_QuestTracker.scale;\\nconst wx = this.questTrackerOnRight() ? Graphics.width - Math.ceil(ww * Window_QuestTracker.scale) : 0;\\nconst wy = this.buttonAreaHeight() + 8;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param StartingQuests
 * @text Starting Quests
 *
 * @param KnownQuests:arraystr
 * @text Known Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are known at the start of the game?
 * Insert their keys here.
 * @default ["Welcome","Example","Plugin_Tutorial_Title","Plugin_Tutorial_Difficulty","Plugin_Tutorial_From","Plugin_Tutorial_Description","Plugin_Tutorial_Objectives","Plugin_Tutorial_Rewards","Plugin_Tutorial_Subtext","Plugin_Tutorial_Quote","Challenge_Plugin_Variables","Challenge_Plugin_Switches"]
 *
 * @param CompletedQuests:arraystr
 * @text Completed Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are completed at the start of the game?
 * Insert their keys here.
 * @default []
 *
 * @param FailedQuests:arraystr
 * @text Failed Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are failed at the start of the game?
 * Insert their keys here.
 * @default []
 *
 * @param TrackedQuest:str
 * @text Tracked Quest
 * @parent StartingQuests
 * @desc Which quest is tracked at the start of the game?
 * @default Welcome
 *
 * @param SceneQuest
 * @text Scene_Quest
 *
 * @param Vocab
 * @parent SceneQuest
 *
 * @param VocabCommandWindow
 * @text Command Window
 * @parent Vocab
 *
 * @param CommandWindow_Known_Text:str
 * @text Command: Known
 * @parent VocabCommandWindow
 * @desc Text used to display known quests.
 * @default Available
 *
 * @param CommandWindow_Completed_Text:str
 * @text Command: Completed
 * @parent VocabCommandWindow
 * @desc Text used to display completed quests.
 * @default Completed
 *
 * @param CommandWindow_Failed_Text:str
 * @text Command: Failed
 * @parent VocabCommandWindow
 * @desc Text used to display failed quests.
 * @default Failed
 *
 * @param VocabLabelWindow
 * @text Label Window
 * @parent Vocab
 *
 * @param EmptyTitleLabel:str
 * @text Empty Title
 * @parent VocabLabelWindow
 * @desc Text displayed in the Label Window when no quest is selected.
 * @default \i[186]Quest Journal
 *
 * @param VocabListWindow
 * @text List Window
 * @parent Vocab
 *
 * @param ListWindowCategoryOpenFmt:str
 * @text Open Categories
 * @parent VocabListWindow
 * @desc Text format for an open category.
 * %1 - Category Name, %2 - Quest Amount
 * @default - %1(%2)
 *
 * @param ListWindowCategoryCloseFmt:str
 * @text Closed Categories
 * @parent VocabListWindow
 * @desc Text format for a closed category.
 * %1 - Category Name, %2 - Quest Amount
 * @default + %1(%2)
 *
 * @param NoQuestListed:str
 * @text No Quest Listed
 * @parent VocabListWindow
 * @desc Text when no quest is listed.
 * @default (No Quests Listed)
 *
 * @param ListWindowTrackedQuest:str
 * @text Tracked Quest
 * @parent VocabListWindow
 * @desc Text format for a tracked quest.
 * %1 - Tracked Quest's Name
 * @default \c[17]%1\c[0]
 *
 * @param VocabLogWindow
 * @text Log Window
 * @parent Vocab
 *
 * @param LogEmpty:json
 * @text Empty Message
 * @parent VocabLogWindow
 * @type note
 * @desc Text displayed when no quest is selected.
 * @default "\\c[5]Main Quests\\c[0] are quests that must be\ncompleted in order to progress further\ninto the game's story.\n\n\\c[6]Side Quests\\c[0] are optional quests that can\nbe completed at your discretion. Upon\ncompleting a side quest, you can receive\nuseful rewards that may assist you on\nyour journey."
 *
 * @param OnLoadQuestJS:func
 * @text JS: On Load
 * @parent LogEmpty:json
 * @type note
 * @desc Runs code upon making the empty message.
 * Useful for setting up variables.
 * @default "// Insert JavaScript code here."
 *
 * @param LogFmt:json
 * @text Quest Log
 * @parent VocabLogWindow
 * @type note
 * @desc Text format for Quest Log Window.
 * Read help file for instructions.
 * @default "\\{[[Title]]\\}\n\\c[4]Level:\\c[0] [[Difficulty]]\n\\c[4]From:\\c[0] [[From]]\n\\c[4]Location:\\c[0] [[Location]]\n\n\\c[4]Description:\\c[0]\n[[Description]]\n\n\\c[4]Objectives:\\c[0]\n[[Objectives]]\n\n\\c[4]Rewards:\\c[0]\n[[Rewards]]\n\n[[Subtext]]\n\n[[Quote]]"
 *
 * @param Objective_Normal_Fmt:str
 * @text Objective (Known)
 * @parent LogFmt:json
 * @desc Text format for known objectives.
 * %1 - Objective Text
 * @default ◎%1
 *
 * @param Objective_Completed_Fmt:str
 * @text Objective (Done)
 * @parent LogFmt:json
 * @desc Text format for complete objectives.
 * %1 - Objective Text
 * @default \c[24]<ColorLock>✔%1</ColorLock>\c[0]
 *
 * @param Objective_Failed_Fmt:str
 * @text Objective (Failed)
 * @parent LogFmt:json
 * @desc Text format for failed objectives.
 * %1 - Objective Text
 * @default \c[25]<ColorLock>✘%1</ColorLock>\c[0]
 *
 * @param Reward_Normal_Fmt:str
 * @text Reward (Known)
 * @parent LogFmt:json
 * @desc Text format for normal rewards.
 * %1 - Reward Text
 * @default ◎%1
 *
 * @param Reward_Completed_Fmt:str
 * @text Reward (Claimed)
 * @parent LogFmt:json
 * @desc Text format for claimed rewards.
 * %1 - Reward Text
 * @default \c[24]<ColorLock>✔%1</ColorLock>\c[0]
 *
 * @param Reward_Failed_Fmt:str
 * @text Reward (Denied)
 * @parent LogFmt:json
 * @desc Text format for denied rewards.
 * %1 - Reward Text
 * @default \c[25]<ColorLock>✘%1</ColorLock>\c[0]
 *
 * @param ButtonAssistWindow
 * @text Button Assist Window
 * @parent Vocab
 *
 * @param ButtonAssistPageUpDown:str
 * @text Scroll Up/Down
 * @parent ButtonAssistWindow
 * @desc Text for Page Up/Down to scroll log window.
 * Requires VisuMZ_0_CoreEngine!
 * @default Scroll Up/Down
 *
 * @param questButtonAssistActive:str
 * @text Tracker
 * @parent ButtonAssistWindow
 * @desc Text for tracking quests.
 * Requires VisuMZ_0_CoreEngine!
 * @default Track
 *
 * @param ButtonAssistExpand:str
 * @text Expand
 * @parent ButtonAssistWindow
 * @desc Text for expanding categories.
 * Requires VisuMZ_0_CoreEngine!
 * @default Expand
 *
 * @param ButtonAssistCollapse:str
 * @text Collapse
 * @parent ButtonAssistWindow
 * @desc Text for collapsing categories.
 * Requires VisuMZ_0_CoreEngine!
 * @default Collapse
 *
 * @param CommandWindowIcons
 * @text Icons
 * @parent SceneQuest
 *
 * @param CommandWindow_Known_Icon:num
 * @text Icon: Known
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 193
 *
 * @param CommandWindow_Completed_Icon:num
 * @text Icon: Completed
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 192
 *
 * @param CommandWindow_Failed_Icon:num
 * @text Icon: Failed
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 194
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param CategoryName:str
 * @text Category Name
 * @desc This category's name.
 * You may use text codes.
 * @default Untitled
 *
 * @param Quests:arraystruct
 * @text Quests
 * @type struct<Quest>[]
 * @desc A list of quests listed under this category.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Individual Quest Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Quest:
 *
 * @param Key:str
 * @text Quest ID Key
 * @desc This quest's identification key. Quests require
 * unique keys for the plugin to differentiate them.
 * @default (Needs Key)
 *
 * @param Header
 *
 * @param Title:str
 * @text Title
 * @parent Header
 * @desc The title of the quest. This is what appears in-game.
 * You may use text codes.
 * @default \i[87]Untitled Quest
 *
 * @param Difficulty:str
 * @text Difficulty
 * @parent Header
 * @desc Difficulty level for this quest.
 * You may use text codes.
 * @default Easy Peasy
 *
 * @param From:str
 * @text From
 * @parent Header
 * @desc Insert the name of the one who issued this quest.
 * You may use text codes.
 * @default NPC Name
 *
 * @param Location:str
 * @text Location
 * @parent Header
 * @desc Insert location name where this quest was issued.
 * You may use text codes.
 * @default Location Name
 *
 * @param Description:arrayjson
 * @text Description
 * @parent Header
 * @type note[]
 * @desc Type out the description(s) used for this quest.
 * You may use text codes.
 * @default ["\"This is the \\\\c[4]default\\\\c[0] quest description.\"","\"This is the \\\\c[4]default\\\\c[0] quest description.\\n\\nYou can insert multiple description entries in case you\\never want to update the quest description midway while the\\nquest is in progress.\""]
 *
 * @param Lists
 *
 * @param Objectives:arrayjson
 * @text Objectives List
 * @parent Lists
 * @type note[]
 * @desc The objectives to be completed for this quest.
 * You may use text codes.
 * @default ["\"\\\\c[4]First\\\\c[0] objective to be cleared.\"","\"\\\\c[4]Second\\\\c[0] objective, but it's hidden.\"","\"To make other objectives appear,\\nenable them through the \\\\c[4]'Visible\\nObjectives'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param VisibleObjectives:arraynum
 * @text Visible Objectives
 * @parent Objectives:arrayjson
 * @type number[]
 * @min 1
 * @desc The objectives that are visible from the start.
 * @default ["1"]
 *
 * @param Rewards:arrayjson
 * @text Rewards List
 * @parent Lists
 * @type note[]
 * @desc The reward list for this quest.
 * You may use text codes.
 * @default ["\"\\\\i[176]Potion x5\"","\"\\\\i[178]Ether x3\"","\"To make other rewards appear,\\nenable them through the \\\\c[4]'Visible\\nRewards'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param VisibleRewards:arraynum
 * @text Visible Rewards
 * @parent Rewards:arrayjson
 * @type number[]
 * @min 1
 * @desc The rewards that are visible from the start.
 * @default ["1"]
 *
 * @param Footer
 *
 * @param Subtext:arrayjson
 * @text Subtext
 * @parent Footer
 * @type note[]
 * @desc Subtext to be displayed with the quest.
 * You may use text codes.
 * @default ["\"\"","\"This is a \\\\c[4]subtext\\\\c[0]. It is used as extra\\ntext that you may want to place on your\\nquest journal that differs from the\\n\\\\c[4]description\\\\c[0].\""]
 *
 * @param Quotes:arrayjson
 * @text Quotes
 * @parent Footer
 * @type note[]
 * @desc Quotes to be displayed with the quest.
 * You may use text codes.
 * @default ["\"\"","\"Insert the quotes of NPC's here.\""]
 *
 * @param JavaScript
 *
 * @param OnLoadQuestJS:func
 * @text JS: On Load
 * @parent JavaScript
 * @type note
 * @desc Runs code upon loading the quest in Scene_Quest.
 * Useful for setting up variables.
 * @default "// Insert JavaScript code here."
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Tracker Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tracker:
 *
 * @param General
 *
 * @param TrackerFmt:json
 * @text Tracker Format
 * @parent General
 * @type note
 * @desc Text format for Quest Tracker Window.
 * Read help file for instructions.
 * @default "\\{[[Title]]\\}\n[[Objectives]]"
 *
 * @param Fading
 *
 * @param MinTrackerOpacity:num
 * @text Close Minimum Opacity
 * @parent Fading
 * @type number
 * @min 0
 * @desc Minimum opacity when the player is too close to the
 * quest tracker on the map screen.
 * @default 128
 *
 * @param TrackerFadeSpeed:num
 * @text Tracker Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the tracker when toggled on/off.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param Options
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
 * @param AddShowOption:eval
 * @text Add Show Tracker?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Tracker' option to the Options menu?
 * @default true
 *
 * @param ShowName:str
 * @text Option Name
 * @parent AddShowOption:eval
 * @desc Command name of the option.
 * @default Show Quest Tracker
 *
 * @param AddPositionOption:eval
 * @text Add Position Tracker?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Position Tracker' option to the Options menu?
 * @default true
 *
 * @param PositionName:str
 * @text Option Name
 * @parent AddPositionOption:eval
 * @desc Command name of the option.
 * @default Quest Tracker Position
 *
 * @param PositionOff:str
 * @text Option OFF
 * @parent AddPositionOption:eval
 * @desc Text displayed when the option is OFF.
 * @default ←
 *
 * @param PositionOn:str
 * @text Option ON
 * @parent AddPositionOption:eval
 * @desc Text displayed when the option is ON.
 * @default →
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Quest' option in the Main Menu.
 * @default Quest
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Quest' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Quest' option to the Main Menu by default?
 * @default true
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
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param ShowFailed:eval
 * @text Show Failed Quests?
 * @parent CommandWindow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show/hide Failed Quests in the command window.
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent CommandWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent CommandWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CommandWindow_BgType:num
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
 * @param CommandWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(Window_QuestCommand.prototype.totalCommands(), true);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param QuestLabel
 * @text Quest Label
 *
 * @param QuestLabel_BgType:num
 * @text Background Type
 * @parent QuestLabel
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
 * @param QuestLabel_Rect:func
 * @text JS: X, Y, W, H
 * @parent QuestLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, false);\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param LogWindow
 * @text Log Window
 *
 * @param LogWindow_ScrollSpeed:num
 * @text PageUp/Down Speed
 * @parent LogWindow
 * @desc Scroll speed for PageUp/Down.
 * @default 0.20
 *
 * @param LogWindow_BgType:num
 * @text Background Type
 * @parent LogWindow
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
 * @param LogWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent LogWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.mainAreaHeight() - this.questLabelWindowRect().height;\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop() + this.questLabelWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param LogWindowExperimental
 * @text EXPERIMENTAL
 * @parent LogWindow
 *
 * @param LogWindow_Auto_WordWrap:eval
 * @text Automatic Word Wrap?
 * @parent LogWindowExperimental
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables automatic word wrap.
 * Requires VisuMZ_1_MessageCore!
 * @default false
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindow_BgType:num
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
 * @param ListWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.mainAreaHeight() - this.commandWindowRect().height;\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nconst wy = this.mainAreaTop() + this.commandWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param TrackerWindow
 * @text Tracker Window
 *
 * @param TrackerWindow_Scale:num
 * @text Window Scale
 * @parent TrackerWindow
 * @desc How much do you want to scale the Tracker Window's size by?
 * @default 0.50
 *
 * @param TrackerWindow_BgType:num
 * @text Background Type
 * @parent TrackerWindow
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
 * @param TrackerWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent TrackerWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = 560;\nconst wh = Graphics.height / Window_QuestTracker.scale;\nconst wx = this.questTrackerOnRight() ? Graphics.width - Math.ceil(ww * Window_QuestTracker.scale) : 0;\nconst wy = this.buttonAreaHeight() + 8;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x15094e=_0x3212;(function(_0x505444,_0x266b0f){const _0xf4c5af=_0x3212,_0x570865=_0x505444();while(!![]){try{const _0xa677f3=-parseInt(_0xf4c5af(0x3b7))/0x1+-parseInt(_0xf4c5af(0x22b))/0x2+-parseInt(_0xf4c5af(0x233))/0x3*(parseInt(_0xf4c5af(0x2df))/0x4)+-parseInt(_0xf4c5af(0x230))/0x5+parseInt(_0xf4c5af(0x276))/0x6*(-parseInt(_0xf4c5af(0x3b3))/0x7)+-parseInt(_0xf4c5af(0x36c))/0x8*(parseInt(_0xf4c5af(0x270))/0x9)+parseInt(_0xf4c5af(0x289))/0xa;if(_0xa677f3===_0x266b0f)break;else _0x570865['push'](_0x570865['shift']());}catch(_0x1cddf9){_0x570865['push'](_0x570865['shift']());}}}(_0x21c3,0x3b970));var label=_0x15094e(0x3dd),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x15094e(0x1f4)](function(_0x511d9a){const _0x1b2311=_0x15094e;return _0x511d9a[_0x1b2311(0x232)]&&_0x511d9a[_0x1b2311(0x324)][_0x1b2311(0x21d)]('['+label+']');})[0x0];function _0x3212(_0x19f7e0,_0x5528b5){const _0x21c3bc=_0x21c3();return _0x3212=function(_0x3212d8,_0x3393a8){_0x3212d8=_0x3212d8-0x1f1;let _0x445607=_0x21c3bc[_0x3212d8];return _0x445607;},_0x3212(_0x19f7e0,_0x5528b5);}VisuMZ[label][_0x15094e(0x2d4)]=VisuMZ[label][_0x15094e(0x2d4)]||{},VisuMZ['ConvertParams']=function(_0x4c6842,_0x33b325){const _0x2eacc7=_0x15094e;for(const _0x220466 in _0x33b325){if(_0x220466[_0x2eacc7(0x21c)](/(.*):(.*)/i)){const _0x467cb6=String(RegExp['$1']),_0x3bdb0c=String(RegExp['$2'])[_0x2eacc7(0x249)]()[_0x2eacc7(0x24d)]();let _0x5e7ba6,_0x8413fc,_0x4bad40;switch(_0x3bdb0c){case _0x2eacc7(0x35a):_0x5e7ba6=_0x33b325[_0x220466]!==''?Number(_0x33b325[_0x220466]):0x0;break;case _0x2eacc7(0x390):_0x8413fc=_0x33b325[_0x220466]!==''?JSON[_0x2eacc7(0x2a2)](_0x33b325[_0x220466]):[],_0x5e7ba6=_0x8413fc['map'](_0x4b3287=>Number(_0x4b3287));break;case _0x2eacc7(0x387):_0x5e7ba6=_0x33b325[_0x220466]!==''?eval(_0x33b325[_0x220466]):null;break;case _0x2eacc7(0x281):_0x8413fc=_0x33b325[_0x220466]!==''?JSON[_0x2eacc7(0x2a2)](_0x33b325[_0x220466]):[],_0x5e7ba6=_0x8413fc['map'](_0x4cb493=>eval(_0x4cb493));break;case _0x2eacc7(0x23b):_0x5e7ba6=_0x33b325[_0x220466]!==''?JSON[_0x2eacc7(0x2a2)](_0x33b325[_0x220466]):'';break;case'ARRAYJSON':_0x8413fc=_0x33b325[_0x220466]!==''?JSON[_0x2eacc7(0x2a2)](_0x33b325[_0x220466]):[],_0x5e7ba6=_0x8413fc['map'](_0x53ebd2=>JSON[_0x2eacc7(0x2a2)](_0x53ebd2));break;case _0x2eacc7(0x31f):_0x5e7ba6=_0x33b325[_0x220466]!==''?new Function(JSON[_0x2eacc7(0x2a2)](_0x33b325[_0x220466])):new Function(_0x2eacc7(0x2f4));break;case _0x2eacc7(0x2e3):_0x8413fc=_0x33b325[_0x220466]!==''?JSON[_0x2eacc7(0x2a2)](_0x33b325[_0x220466]):[],_0x5e7ba6=_0x8413fc['map'](_0x450a0f=>new Function(JSON[_0x2eacc7(0x2a2)](_0x450a0f)));break;case _0x2eacc7(0x2d3):_0x5e7ba6=_0x33b325[_0x220466]!==''?String(_0x33b325[_0x220466]):'';break;case _0x2eacc7(0x36f):_0x8413fc=_0x33b325[_0x220466]!==''?JSON[_0x2eacc7(0x2a2)](_0x33b325[_0x220466]):[],_0x5e7ba6=_0x8413fc[_0x2eacc7(0x28c)](_0x1d9171=>String(_0x1d9171));break;case _0x2eacc7(0x397):_0x4bad40=_0x33b325[_0x220466]!==''?JSON[_0x2eacc7(0x2a2)](_0x33b325[_0x220466]):{},_0x5e7ba6=VisuMZ[_0x2eacc7(0x1f5)]({},_0x4bad40);break;case'ARRAYSTRUCT':_0x8413fc=_0x33b325[_0x220466]!==''?JSON[_0x2eacc7(0x2a2)](_0x33b325[_0x220466]):[],_0x5e7ba6=_0x8413fc[_0x2eacc7(0x28c)](_0xcd009b=>VisuMZ['ConvertParams']({},JSON[_0x2eacc7(0x2a2)](_0xcd009b)));break;default:continue;}_0x4c6842[_0x467cb6]=_0x5e7ba6;}}return _0x4c6842;},(_0x2379d8=>{const _0x12ac3f=_0x15094e,_0x52c567=_0x2379d8[_0x12ac3f(0x3a5)];for(const _0x5d196b of dependencies){if(!Imported[_0x5d196b]){alert(_0x12ac3f(0x2dd)[_0x12ac3f(0x235)](_0x52c567,_0x5d196b)),SceneManager['exit']();break;}}const _0x5b6b49=_0x2379d8[_0x12ac3f(0x324)];if(_0x5b6b49['match'](/\[Version[ ](.*?)\]/i)){const _0x4d17bd=Number(RegExp['$1']);if(_0x4d17bd!==VisuMZ[label][_0x12ac3f(0x3f8)]){if(_0x12ac3f(0x36a)!==_0x12ac3f(0x36a))return this[_0x12ac3f(0x223)]();else alert(_0x12ac3f(0x2a9)[_0x12ac3f(0x235)](_0x52c567,_0x4d17bd)),SceneManager[_0x12ac3f(0x2ae)]();}}if(_0x5b6b49[_0x12ac3f(0x21c)](/\[Tier[ ](\d+)\]/i)){if(_0x12ac3f(0x328)!==_0x12ac3f(0x328)){_0x39b741=_0x482d2a[_0x12ac3f(0x249)]()[_0x12ac3f(0x24d)]();const _0x3fe0fb=_0x5d49c4[_0x12ac3f(0x36d)](_0x37b351);if(!_0x3fe0fb)return-0x1;_0xb103ae[_0x12ac3f(0x3e1)](_0x1d424a);const _0x147245=_0x38097e[_0x12ac3f(0x237)]()['rewards']||{};if(!_0x147245[_0x18e755])return 0x0;return _0x147245[_0x54e71b][_0x12ac3f(0x2b9)];}else{const _0x57f5cd=Number(RegExp['$1']);_0x57f5cd<tier?(alert(_0x12ac3f(0x317)[_0x12ac3f(0x235)](_0x52c567,_0x57f5cd,tier)),SceneManager['exit']()):tier=Math[_0x12ac3f(0x2c8)](_0x57f5cd,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x12ac3f(0x2d4)],_0x2379d8[_0x12ac3f(0x392)]);})(pluginData),PluginManager[_0x15094e(0x227)](pluginData[_0x15094e(0x3a5)],_0x15094e(0x1f1),_0x4968d2=>{const _0x3eb419=_0x15094e;VisuMZ[_0x3eb419(0x1f5)](_0x4968d2,_0x4968d2);const _0x3ff76a=_0x4968d2[_0x3eb419(0x286)],_0x103392=_0x4968d2[_0x3eb419(0x258)];for(const _0x550f78 of _0x3ff76a){$gameSystem[_0x3eb419(0x330)](_0x550f78,_0x103392);}if(SceneManager[_0x3eb419(0x383)]()){if(_0x3eb419(0x35e)!==_0x3eb419(0x35e)){_0x9cdb08=_0x44260a['toUpperCase']()[_0x3eb419(0x24d)]();const _0x3cf332=this[_0x3eb419(0x36d)](_0x592f15);if(!_0x3cf332)return'';const _0x43f805=this['questData']()['quotes'];_0x43f805[_0x40f769]=_0x43f805[_0x249aba]||0x1;const _0x533927=_0x43f805[_0x5d400a];return _0x3cf332[_0x3eb419(0x3f7)][_0x533927]||'';}else SceneManager[_0x3eb419(0x257)][_0x3eb419(0x222)]();}}),PluginManager[_0x15094e(0x227)](pluginData[_0x15094e(0x3a5)],_0x15094e(0x366),_0x55be0f=>{const _0x36aa0d=_0x15094e;VisuMZ[_0x36aa0d(0x1f5)](_0x55be0f,_0x55be0f);const _0x3cbf3c=_0x55be0f['Keys'],_0x3bdf5a=_0x55be0f[_0x36aa0d(0x388)];for(const _0xea99b4 of _0x3cbf3c){_0x36aa0d(0x38d)===_0x36aa0d(0x26d)?_0xbe5abc+=_0x5190d1:$gameSystem[_0x36aa0d(0x264)](_0xea99b4,_0x3bdf5a);}SceneManager[_0x36aa0d(0x383)]()&&SceneManager[_0x36aa0d(0x257)]['refreshQuestTrackerWindow']();}),PluginManager[_0x15094e(0x227)](pluginData['name'],'QuestObjectives',_0x351dc1=>{const _0xdfaa00=_0x15094e;VisuMZ[_0xdfaa00(0x1f5)](_0x351dc1,_0x351dc1);const _0x5c02aa=_0x351dc1[_0xdfaa00(0x286)],_0x17ed65=_0x351dc1['TargetIDs'],_0xc10225=_0x351dc1[_0xdfaa00(0x258)];for(const _0xad8b8 of _0x5c02aa){if(_0xdfaa00(0x3b1)==='Zeucn')$gameSystem[_0xdfaa00(0x3e2)](_0xad8b8,_0x17ed65,_0xc10225);else return this[_0xdfaa00(0x384)]()===_0xdfaa00(0x22f)?this['currentExt']():null;}SceneManager['isSceneMap']()&&SceneManager[_0xdfaa00(0x257)][_0xdfaa00(0x222)]();}),PluginManager['registerCommand'](pluginData['name'],_0x15094e(0x3d9),_0xd181bf=>{const _0x388852=_0x15094e;VisuMZ['ConvertParams'](_0xd181bf,_0xd181bf);const _0x223d75=_0xd181bf[_0x388852(0x286)],_0x299347=_0xd181bf[_0x388852(0x388)];for(const _0x2f3f25 of _0x223d75){$gameSystem[_0x388852(0x39a)](_0x2f3f25,_0x299347);}SceneManager['isSceneMap']()&&SceneManager['_scene']['refreshQuestTrackerWindow']();}),PluginManager[_0x15094e(0x227)](pluginData[_0x15094e(0x3a5)],'QuestRewards',_0x4783f8=>{const _0x354191=_0x15094e;VisuMZ[_0x354191(0x1f5)](_0x4783f8,_0x4783f8);const _0x30b692=_0x4783f8[_0x354191(0x286)],_0x2785d5=_0x4783f8[_0x354191(0x30c)],_0x13887b=_0x4783f8[_0x354191(0x258)];for(const _0x240739 of _0x30b692){if(_0x354191(0x217)!=='pzSDb'){_0x424916=_0x32008d[_0x354191(0x249)]()[_0x354191(0x24d)]();const _0x2bea7b=this[_0x354191(0x36d)](_0x581637);if(!_0x2bea7b)return'';const _0x422c0a=this[_0x354191(0x237)]();return _0x422c0a[_0x354191(0x3a1)]=_0x422c0a[_0x354191(0x3a1)]||{},_0x422c0a[_0x354191(0x3a1)][_0x22db00]=_0x422c0a[_0x354191(0x3a1)][_0x4a68cb]||[],_0x422c0a['objectivesFailed'][_0x5e1d9f][_0x354191(0x263)]((_0x43983c,_0xe81d0)=>_0x43983c-_0xe81d0);}else $gameSystem[_0x354191(0x380)](_0x240739,_0x2785d5,_0x13887b);}SceneManager[_0x354191(0x383)]()&&SceneManager['_scene'][_0x354191(0x222)]();}),PluginManager[_0x15094e(0x227)](pluginData[_0x15094e(0x3a5)],_0x15094e(0x3e7),_0x87c093=>{const _0x571112=_0x15094e;VisuMZ[_0x571112(0x1f5)](_0x87c093,_0x87c093);const _0xb50ba2=_0x87c093['Keys'],_0x28c71d=_0x87c093['TargetID'];for(const _0x2dec92 of _0xb50ba2){$gameSystem[_0x571112(0x2c0)](_0x2dec92,_0x28c71d);}SceneManager['isSceneMap']()&&SceneManager['_scene'][_0x571112(0x222)]();}),PluginManager['registerCommand'](pluginData[_0x15094e(0x3a5)],_0x15094e(0x403),_0x2ffce7=>{const _0x81f1b5=_0x15094e;VisuMZ[_0x81f1b5(0x1f5)](_0x2ffce7,_0x2ffce7);const _0x2081c3=_0x2ffce7['Key'];$gameSystem[_0x81f1b5(0x3c3)](_0x2081c3),SceneManager[_0x81f1b5(0x383)]()&&(_0x81f1b5(0x386)!=='QGoaw'?_0x5bab1d=_0x248454[_0x81f1b5(0x33c)](/[\n\r]+/g,''):SceneManager[_0x81f1b5(0x257)]['refreshQuestTrackerWindow']());}),PluginManager[_0x15094e(0x227)](pluginData['name'],_0x15094e(0x2ca),_0x99f901=>{const _0x1af0da=_0x15094e;if(!SceneManager[_0x1af0da(0x383)]())return;SceneManager[_0x1af0da(0x257)][_0x1af0da(0x222)]();}),PluginManager[_0x15094e(0x227)](pluginData['name'],_0x15094e(0x3a8),_0x4e644a=>{const _0x1f69c6=_0x15094e;VisuMZ[_0x1f69c6(0x1f5)](_0x4e644a,_0x4e644a),$gameSystem[_0x1f69c6(0x22c)](_0x4e644a[_0x1f69c6(0x350)]),SceneManager['isSceneMap']()&&(_0x1f69c6(0x25d)!=='jdnKn'?SceneManager['_scene'][_0x1f69c6(0x222)]():_0x460813[_0x1f69c6(0x257)]['refreshQuestTrackerWindow']());}),PluginManager['registerCommand'](pluginData[_0x15094e(0x3a5)],_0x15094e(0x3db),_0x1bc1ae=>{const _0x30d811=_0x15094e;if($gameParty[_0x30d811(0x337)]())return;SceneManager[_0x30d811(0x21b)](Scene_Quest);}),PluginManager[_0x15094e(0x227)](pluginData[_0x15094e(0x3a5)],_0x15094e(0x34c),_0x4c1f71=>{const _0x1d83ee=_0x15094e;VisuMZ[_0x1d83ee(0x1f5)](_0x4c1f71,_0x4c1f71),$gameSystem['questData']()[_0x1d83ee(0x3fb)]=_0x4c1f71[_0x1d83ee(0x288)];}),PluginManager[_0x15094e(0x227)](pluginData[_0x15094e(0x3a5)],'SystemShowQuestMenu',_0x24c149=>{const _0x42b12e=_0x15094e;VisuMZ[_0x42b12e(0x1f5)](_0x24c149,_0x24c149),$gameSystem[_0x42b12e(0x237)]()[_0x42b12e(0x27d)]=_0x24c149[_0x42b12e(0x350)];}),VisuMZ[_0x15094e(0x3dd)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x15094e(0x236)][_0x15094e(0x29e)],Scene_Boot['prototype'][_0x15094e(0x29e)]=function(){const _0x4ae879=_0x15094e;VisuMZ[_0x4ae879(0x3dd)][_0x4ae879(0x402)][_0x4ae879(0x305)](this),this[_0x4ae879(0x206)]();},VisuMZ['QuestSystem'][_0x15094e(0x3df)]=[],VisuMZ['QuestSystem'][_0x15094e(0x2f1)]={},Scene_Boot['prototype']['process_VisuMZ_QuestSystem_Data']=function(){const _0x3c8416=_0x15094e;for(const _0x10ed7c of VisuMZ[_0x3c8416(0x3dd)][_0x3c8416(0x2d4)]['Categories']){if(!_0x10ed7c)continue;for(const _0x3f9ab5 of _0x10ed7c[_0x3c8416(0x30e)]){if(!_0x3f9ab5)continue;_0x3f9ab5[_0x3c8416(0x22f)]=_0x10ed7c,_0x3f9ab5['Description'][_0x3c8416(0x218)](''),_0x3f9ab5['Objectives'][_0x3c8416(0x218)](''),_0x3f9ab5[_0x3c8416(0x3e9)][_0x3c8416(0x218)](''),_0x3f9ab5[_0x3c8416(0x3f3)]['unshift'](''),_0x3f9ab5['Quotes'][_0x3c8416(0x218)]('');const _0x8c0958=_0x3f9ab5[_0x3c8416(0x204)][_0x3c8416(0x249)]()['trim']();VisuMZ['QuestSystem'][_0x3c8416(0x3df)][_0x3c8416(0x21b)](_0x8c0958),VisuMZ[_0x3c8416(0x3dd)]['QuestData'][_0x8c0958]=_0x3f9ab5;}}},ConfigManager[_0x15094e(0x26a)]=!![],ConfigManager[_0x15094e(0x300)]=!![],VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x240)]=ConfigManager[_0x15094e(0x375)],ConfigManager[_0x15094e(0x375)]=function(){const _0x4681ec=_0x15094e,_0x567c1c=VisuMZ[_0x4681ec(0x3dd)]['ConfigManager_makeData'][_0x4681ec(0x305)](this);return _0x567c1c['questTrackerShow']=this['questTrackerShow'],_0x567c1c['questTrackerPosition']=this['questTrackerPosition'],_0x567c1c;},VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x373)]=ConfigManager['applyData'],ConfigManager[_0x15094e(0x250)]=function(_0x1c6496){const _0x3b2459=_0x15094e;VisuMZ['QuestSystem'][_0x3b2459(0x373)][_0x3b2459(0x305)](this,_0x1c6496),_0x3b2459(0x26a)in _0x1c6496?this[_0x3b2459(0x26a)]=_0x1c6496[_0x3b2459(0x26a)]:this[_0x3b2459(0x26a)]=!![],_0x3b2459(0x300)in _0x1c6496?this[_0x3b2459(0x300)]=_0x1c6496['questTrackerPosition']:this[_0x3b2459(0x300)]=!![];},ImageManager['questKnownIcon']=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)][_0x15094e(0x25a)]['CommandWindow_Known_Icon'],ImageManager['questCompletedIcon']=VisuMZ['QuestSystem'][_0x15094e(0x2d4)][_0x15094e(0x25a)][_0x15094e(0x2e9)],ImageManager['questFailedIcon']=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)][_0x15094e(0x25a)][_0x15094e(0x37d)],TextManager['questCommandName']=VisuMZ[_0x15094e(0x3dd)]['Settings'][_0x15094e(0x395)]['Name'],TextManager[_0x15094e(0x3dc)]=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)][_0x15094e(0x25a)][_0x15094e(0x1f6)],TextManager['questCompletedCmd']=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)][_0x15094e(0x25a)][_0x15094e(0x3fe)],TextManager[_0x15094e(0x3f4)]=VisuMZ['QuestSystem'][_0x15094e(0x2d4)][_0x15094e(0x25a)][_0x15094e(0x2c6)],TextManager[_0x15094e(0x3d6)]=VisuMZ[_0x15094e(0x3dd)]['Settings'][_0x15094e(0x25a)][_0x15094e(0x313)],TextManager['questCategoryClosedFmt']=VisuMZ['QuestSystem']['Settings'][_0x15094e(0x25a)][_0x15094e(0x2bf)],TextManager[_0x15094e(0x20a)]=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)]['General'][_0x15094e(0x339)],TextManager['noQuestsListed']=VisuMZ[_0x15094e(0x3dd)]['Settings'][_0x15094e(0x25a)]['NoQuestListed'],TextManager[_0x15094e(0x37b)]=VisuMZ['QuestSystem']['Settings'][_0x15094e(0x25a)]['LogFmt'],TextManager[_0x15094e(0x3ca)]=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)][_0x15094e(0x25a)][_0x15094e(0x3fa)],TextManager[_0x15094e(0x371)]=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)]['General'][_0x15094e(0x2cf)],TextManager[_0x15094e(0x332)]=VisuMZ[_0x15094e(0x3dd)]['Settings'][_0x15094e(0x25a)][_0x15094e(0x23f)],TextManager[_0x15094e(0x302)]=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)][_0x15094e(0x25a)]['Objective_Failed_Fmt'],TextManager[_0x15094e(0x31b)]=VisuMZ[_0x15094e(0x3dd)]['Settings'][_0x15094e(0x25a)][_0x15094e(0x24b)],TextManager['questRewardsClaimedFmt']=VisuMZ[_0x15094e(0x3dd)]['Settings'][_0x15094e(0x25a)][_0x15094e(0x2ac)],TextManager['questRewardsDeniedFmt']=VisuMZ[_0x15094e(0x3dd)]['Settings'][_0x15094e(0x25a)][_0x15094e(0x277)],TextManager[_0x15094e(0x3c6)]=VisuMZ['QuestSystem'][_0x15094e(0x2d4)][_0x15094e(0x25a)][_0x15094e(0x2d0)],TextManager[_0x15094e(0x368)]=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)][_0x15094e(0x25a)][_0x15094e(0x368)],TextManager[_0x15094e(0x3bb)]=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)]['General'][_0x15094e(0x2eb)],TextManager[_0x15094e(0x3af)]=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)][_0x15094e(0x25a)][_0x15094e(0x272)],TextManager[_0x15094e(0x2d6)]=_0x15094e(0x33d),TextManager['questTrackerFmt']=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)][_0x15094e(0x200)]['TrackerFmt']||TextManager['defaultQuestTrackerFmt'],TextManager[_0x15094e(0x2c9)]=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)][_0x15094e(0x25a)][_0x15094e(0x342)],TextManager[_0x15094e(0x26a)]=VisuMZ[_0x15094e(0x3dd)]['Settings'][_0x15094e(0x200)][_0x15094e(0x20b)],TextManager[_0x15094e(0x300)]=VisuMZ['QuestSystem']['Settings'][_0x15094e(0x200)]['PositionName'],TextManager['questTrackerPosOff']=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)]['Tracker']['PositionOff'],TextManager[_0x15094e(0x2b2)]=VisuMZ['QuestSystem']['Settings'][_0x15094e(0x200)][_0x15094e(0x229)],SceneManager[_0x15094e(0x383)]=function(){const _0x5c2673=_0x15094e;return this['_scene']&&this[_0x5c2673(0x257)][_0x5c2673(0x203)]===Scene_Map;},VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x32c)]=Game_System[_0x15094e(0x236)][_0x15094e(0x259)],Game_System['prototype'][_0x15094e(0x259)]=function(){const _0x6c5fbf=_0x15094e;VisuMZ[_0x6c5fbf(0x3dd)][_0x6c5fbf(0x32c)][_0x6c5fbf(0x305)](this),this['initQuestSystem']();},Game_System['prototype'][_0x15094e(0x2f0)]=function(){const _0x30ea7c=_0x15094e,_0x3e8510=VisuMZ['QuestSystem']['Settings'][_0x30ea7c(0x25a)],_0x2ae1a5=VisuMZ[_0x30ea7c(0x3dd)][_0x30ea7c(0x2d4)][_0x30ea7c(0x395)];this['_quests']={'shown':_0x2ae1a5[_0x30ea7c(0x285)],'enabled':_0x2ae1a5[_0x30ea7c(0x3e5)],'known':[],'completed':[],'failed':[],'description':{},'objectives':{},'objectivesCompleted':{},'objectivesFailed':{},'rewards':{},'rewardsClaimed':{},'rewardsDenied':{},'subtext':{},'quotes':{},'tracked':_0x3e8510[_0x30ea7c(0x3c7)][_0x30ea7c(0x249)]()[_0x30ea7c(0x24d)](),'showTracker':!![]};for(const _0x59ecc0 of _0x3e8510['KnownQuests']){_0x30ea7c(0x32e)!==_0x30ea7c(0x32e)?_0x365d79[_0x30ea7c(0x257)][_0x30ea7c(0x222)]():this[_0x30ea7c(0x330)](_0x59ecc0,'known');}for(const _0x5262a0 of _0x3e8510[_0x30ea7c(0x304)]){if(_0x30ea7c(0x357)!=='JjjEs')this[_0x30ea7c(0x330)](_0x5262a0,_0x30ea7c(0x3ef));else{const _0x5cfd96=_0x30ea7c(0x31d),_0x525526=_0x30f3f8[_0x30ea7c(0x2b5)];let _0x39ed3b=_0x37cc52[_0x30ea7c(0x3dc)];_0x525526>0x0&&this[_0x30ea7c(0x3eb)]()!==_0x30ea7c(0x32d)&&(_0x39ed3b='\x5cI[%1]%2'[_0x30ea7c(0x235)](_0x525526,_0x39ed3b));const _0x1f9f79=this['isKnownQuestsEnabled']();this[_0x30ea7c(0x3bf)](_0x39ed3b,_0x5cfd96,_0x1f9f79);}}for(const _0x40de78 of _0x3e8510[_0x30ea7c(0x3ec)]){this[_0x30ea7c(0x330)](_0x40de78,_0x30ea7c(0x2cb));}},Game_System[_0x15094e(0x236)]['quest']=function(_0x3f6ad6){const _0x1482fc=_0x15094e;return _0x3f6ad6=_0x3f6ad6[_0x1482fc(0x249)]()[_0x1482fc(0x24d)](),VisuMZ[_0x1482fc(0x3dd)][_0x1482fc(0x2f1)][_0x3f6ad6];},Game_System[_0x15094e(0x236)][_0x15094e(0x237)]=function(){const _0x32ad55=_0x15094e;if(this[_0x32ad55(0x3ba)]===undefined)this[_0x32ad55(0x2f0)]();return this[_0x32ad55(0x3ba)];},Game_System[_0x15094e(0x236)][_0x15094e(0x3c8)]=function(){const _0x3aa205=_0x15094e;return this[_0x3aa205(0x237)]()[_0x3aa205(0x27d)];},Game_System[_0x15094e(0x236)][_0x15094e(0x255)]=function(){const _0x29dce8=_0x15094e;return this[_0x29dce8(0x237)]()[_0x29dce8(0x3fb)];},Game_System[_0x15094e(0x236)]['setQuestStatus']=function(_0x23b344,_0x5e8fc8){const _0x1be87b=_0x15094e;_0x23b344=_0x23b344['toUpperCase']()[_0x1be87b(0x24d)]();if(!VisuMZ['QuestSystem'][_0x1be87b(0x2f1)][_0x23b344])return;const _0x16de94=this[_0x1be87b(0x237)]();_0x16de94['known']=_0x16de94[_0x1be87b(0x31d)]||[],_0x16de94[_0x1be87b(0x3ef)]=_0x16de94[_0x1be87b(0x3ef)]||[],_0x16de94[_0x1be87b(0x2cb)]=_0x16de94[_0x1be87b(0x2cb)]||[],_0x16de94[_0x1be87b(0x31d)]['remove'](_0x23b344),_0x16de94[_0x1be87b(0x3ef)][_0x1be87b(0x278)](_0x23b344),_0x16de94[_0x1be87b(0x2cb)][_0x1be87b(0x278)](_0x23b344);if(_0x5e8fc8!==_0x1be87b(0x278))_0x16de94[_0x5e8fc8][_0x1be87b(0x21b)](_0x23b344);_0x23b344===_0x16de94[_0x1be87b(0x2e1)][_0x1be87b(0x249)]()[_0x1be87b(0x24d)]()&&(_0x5e8fc8!=='known'&&this[_0x1be87b(0x3c3)](''));},Game_System[_0x15094e(0x236)][_0x15094e(0x3bc)]=function(){const _0xe1b9=_0x15094e,_0x5c8f23=this['questData']();return _0x5c8f23[_0xe1b9(0x31d)]=_0x5c8f23['known']||[],_0x5c8f23[_0xe1b9(0x31d)]['map'](_0x57e2fb=>this['quest'](_0x57e2fb))[_0xe1b9(0x278)](null);},Game_System[_0x15094e(0x236)][_0x15094e(0x3c0)]=function(_0x1b695d){const _0x4fcbf1=_0x15094e,_0x457792=this[_0x4fcbf1(0x237)]();return _0x457792[_0x4fcbf1(0x31d)]=_0x457792[_0x4fcbf1(0x31d)]||[],_0x1b695d=_0x1b695d['toUpperCase']()[_0x4fcbf1(0x24d)](),_0x457792['known'][_0x4fcbf1(0x21d)](_0x1b695d);},Game_System['prototype'][_0x15094e(0x325)]=function(){const _0x4f0695=_0x15094e,_0xe23903=this['questData']();return _0xe23903['completed']=_0xe23903['completed']||[],_0xe23903['completed'][_0x4f0695(0x28c)](_0x10a21e=>this['quest'](_0x10a21e))[_0x4f0695(0x278)](null);},Game_System['prototype'][_0x15094e(0x25c)]=function(_0x2d32ad){const _0x10dbe0=_0x15094e,_0x2deac2=this[_0x10dbe0(0x237)]();return _0x2deac2[_0x10dbe0(0x3ef)]=_0x2deac2[_0x10dbe0(0x3ef)]||[],_0x2d32ad=_0x2d32ad[_0x10dbe0(0x249)]()['trim'](),_0x2deac2[_0x10dbe0(0x3ef)]['includes'](_0x2d32ad);},Game_System[_0x15094e(0x236)][_0x15094e(0x35f)]=function(){const _0x574b74=_0x15094e,_0x33cb45=this[_0x574b74(0x237)]();return _0x33cb45[_0x574b74(0x2cb)]=_0x33cb45[_0x574b74(0x2cb)]||[],_0x33cb45['failed']['map'](_0x40265f=>this[_0x574b74(0x36d)](_0x40265f))[_0x574b74(0x278)](null);},Game_System[_0x15094e(0x236)][_0x15094e(0x216)]=function(_0x4ee02b){const _0x323a67=_0x15094e,_0x117017=this['questData']();return _0x117017[_0x323a67(0x2cb)]=_0x117017[_0x323a67(0x2cb)]||[],_0x4ee02b=_0x4ee02b[_0x323a67(0x249)]()['trim'](),_0x117017[_0x323a67(0x2cb)]['includes'](_0x4ee02b);},Game_System[_0x15094e(0x236)][_0x15094e(0x372)]=function(_0x4389c4){const _0x2a57d2=_0x15094e;_0x4389c4=_0x4389c4[_0x2a57d2(0x249)]()[_0x2a57d2(0x24d)]();const _0x3c6afa=this['quest'](_0x4389c4);if(!_0x3c6afa)return'';const _0x41bd41=this['questData']()[_0x2a57d2(0x324)];_0x41bd41[_0x4389c4]=_0x41bd41[_0x4389c4]||0x1;const _0x5d7b48=_0x41bd41[_0x4389c4];return _0x3c6afa[_0x2a57d2(0x340)][_0x5d7b48]||'';},Game_System[_0x15094e(0x236)][_0x15094e(0x264)]=function(_0x2b3086,_0x197f17){const _0x460b82=_0x15094e;_0x2b3086=_0x2b3086[_0x460b82(0x249)]()[_0x460b82(0x24d)]();const _0x26877f=this['quest'](_0x2b3086);if(!_0x26877f)return'';const _0x1006f2=this[_0x460b82(0x237)]()[_0x460b82(0x324)];_0x1006f2[_0x2b3086]=_0x197f17;},Game_System[_0x15094e(0x236)][_0x15094e(0x401)]=function(_0x13ea35){const _0x124ae8=_0x15094e;_0x13ea35=_0x13ea35[_0x124ae8(0x249)]()[_0x124ae8(0x24d)]();const _0x507b2e=this[_0x124ae8(0x36d)](_0x13ea35);if(!_0x507b2e)return'';const _0x2b1ba7=this[_0x124ae8(0x237)]();return _0x2b1ba7[_0x124ae8(0x2a3)]=_0x2b1ba7[_0x124ae8(0x2a3)]||{},!_0x2b1ba7[_0x124ae8(0x2a3)][_0x13ea35]&&(_0x2b1ba7[_0x124ae8(0x2a3)][_0x13ea35]=JsonEx['makeDeepCopy'](_0x507b2e['VisibleObjectives'])),_0x2b1ba7[_0x124ae8(0x2a3)][_0x13ea35][_0x124ae8(0x263)]((_0x128a0d,_0xf9029a)=>_0x128a0d-_0xf9029a);},Game_System[_0x15094e(0x236)][_0x15094e(0x3e2)]=function(_0x566f58,_0x490777,_0x2f1e83){const _0x5c7720=_0x15094e;_0x566f58=_0x566f58[_0x5c7720(0x249)]()[_0x5c7720(0x24d)]();const _0x3a0b4e=this['quest'](_0x566f58);if(!_0x3a0b4e)return'';const _0x14c2ae=this[_0x5c7720(0x237)]();_0x14c2ae['objectives']=_0x14c2ae[_0x5c7720(0x2a3)]||{};!_0x14c2ae['objectives'][_0x566f58]&&(_0x14c2ae['objectives'][_0x566f58]=JsonEx[_0x5c7720(0x3e6)](_0x3a0b4e[_0x5c7720(0x3d4)]));_0x14c2ae[_0x5c7720(0x2a3)][_0x566f58]=_0x14c2ae['objectives'][_0x566f58]||[],_0x14c2ae[_0x5c7720(0x220)][_0x566f58]=_0x14c2ae[_0x5c7720(0x220)][_0x566f58]||[],_0x14c2ae[_0x5c7720(0x3a1)][_0x566f58]=_0x14c2ae['objectivesFailed'][_0x566f58]||[];for(const _0x214b13 of _0x490777){_0x14c2ae['objectives'][_0x566f58]['remove'](_0x214b13),_0x14c2ae['objectivesCompleted'][_0x566f58][_0x5c7720(0x278)](_0x214b13),_0x14c2ae['objectivesFailed'][_0x566f58]['remove'](_0x214b13);switch(_0x2f1e83){case _0x5c7720(0x2ed):case _0x5c7720(0x31d):_0x14c2ae[_0x5c7720(0x2a3)][_0x566f58][_0x5c7720(0x21b)](_0x214b13);break;case _0x5c7720(0x2ef):case _0x5c7720(0x3ef):_0x14c2ae['objectivesCompleted'][_0x566f58]['push'](_0x214b13);break;case _0x5c7720(0x225):case _0x5c7720(0x2cb):_0x14c2ae[_0x5c7720(0x3a1)][_0x566f58][_0x5c7720(0x21b)](_0x214b13);break;case _0x5c7720(0x278):case'removed':break;}}},Game_System[_0x15094e(0x236)]['questObjectivesCompleted']=function(_0xca6980){const _0x25bb49=_0x15094e;_0xca6980=_0xca6980[_0x25bb49(0x249)]()[_0x25bb49(0x24d)]();const _0x36ead7=this[_0x25bb49(0x36d)](_0xca6980);if(!_0x36ead7)return'';const _0x1f9c89=this[_0x25bb49(0x237)]();return _0x1f9c89['objectivesCompleted']=_0x1f9c89['objectivesCompleted']||{},_0x1f9c89[_0x25bb49(0x220)][_0xca6980]=_0x1f9c89[_0x25bb49(0x220)][_0xca6980]||[],_0x1f9c89[_0x25bb49(0x220)][_0xca6980]['sort']((_0x3e4699,_0x4dfe85)=>_0x3e4699-_0x4dfe85);},Game_System[_0x15094e(0x236)]['questObjectivesFailed']=function(_0x471ba6){const _0x4839e1=_0x15094e;_0x471ba6=_0x471ba6[_0x4839e1(0x249)]()[_0x4839e1(0x24d)]();const _0xa12d8a=this[_0x4839e1(0x36d)](_0x471ba6);if(!_0xa12d8a)return'';const _0x425c69=this[_0x4839e1(0x237)]();return _0x425c69[_0x4839e1(0x3a1)]=_0x425c69['objectivesFailed']||{},_0x425c69[_0x4839e1(0x3a1)][_0x471ba6]=_0x425c69[_0x4839e1(0x3a1)][_0x471ba6]||[],_0x425c69[_0x4839e1(0x3a1)][_0x471ba6][_0x4839e1(0x263)]((_0x36917c,_0x361169)=>_0x36917c-_0x361169);},Game_System[_0x15094e(0x236)]['questRewards']=function(_0x42edc4){const _0x4f63f7=_0x15094e;_0x42edc4=_0x42edc4[_0x4f63f7(0x249)]()['trim']();const _0x3ecfe5=this[_0x4f63f7(0x36d)](_0x42edc4);if(!_0x3ecfe5)return'';const _0x2a11f5=this[_0x4f63f7(0x237)]();return _0x2a11f5['rewards']=_0x2a11f5[_0x4f63f7(0x252)]||{},!_0x2a11f5[_0x4f63f7(0x252)][_0x42edc4]&&(_0x2a11f5[_0x4f63f7(0x252)][_0x42edc4]=JsonEx[_0x4f63f7(0x3e6)](_0x3ecfe5[_0x4f63f7(0x24f)])),_0x2a11f5['rewards'][_0x42edc4][_0x4f63f7(0x263)]((_0x2afaf0,_0x5ecea8)=>_0x2afaf0-_0x5ecea8);},Game_System[_0x15094e(0x236)][_0x15094e(0x380)]=function(_0x4fe4f7,_0x472191,_0x3cc0d8){const _0x26f7a8=_0x15094e;_0x4fe4f7=_0x4fe4f7[_0x26f7a8(0x249)]()[_0x26f7a8(0x24d)]();const _0x3e3cdf=this[_0x26f7a8(0x36d)](_0x4fe4f7);if(!_0x3e3cdf)return'';const _0x265cf5=this[_0x26f7a8(0x237)]();_0x265cf5['rewards']=_0x265cf5[_0x26f7a8(0x252)]||{};if(!_0x265cf5[_0x26f7a8(0x252)][_0x4fe4f7]){if(_0x26f7a8(0x239)!==_0x26f7a8(0x31c))_0x265cf5[_0x26f7a8(0x252)][_0x4fe4f7]=JsonEx['makeDeepCopy'](_0x3e3cdf[_0x26f7a8(0x24f)]);else{const _0xff0c9c=this['itemLineRect'](_0xf41291),_0x51133d=this['textSizeEx'](_0x4a99de)[_0x26f7a8(0x333)];return _0x51133d<=_0xff0c9c['width']?'iconText':_0x26f7a8(0x209);}}_0x265cf5['rewards'][_0x4fe4f7]=_0x265cf5[_0x26f7a8(0x252)][_0x4fe4f7]||[],_0x265cf5[_0x26f7a8(0x3ae)][_0x4fe4f7]=_0x265cf5[_0x26f7a8(0x3ae)][_0x4fe4f7]||[],_0x265cf5['rewardsDenied'][_0x4fe4f7]=_0x265cf5['rewardsDenied'][_0x4fe4f7]||[];for(const _0x2bdbf2 of _0x472191){_0x265cf5[_0x26f7a8(0x252)][_0x4fe4f7][_0x26f7a8(0x278)](_0x2bdbf2),_0x265cf5[_0x26f7a8(0x3ae)][_0x4fe4f7][_0x26f7a8(0x278)](_0x2bdbf2),_0x265cf5[_0x26f7a8(0x271)][_0x4fe4f7][_0x26f7a8(0x278)](_0x2bdbf2);switch(_0x3cc0d8){case _0x26f7a8(0x2ed):case _0x26f7a8(0x31d):_0x265cf5['rewards'][_0x4fe4f7]['push'](_0x2bdbf2);break;case _0x26f7a8(0x26b):case _0x26f7a8(0x323):_0x265cf5['rewardsClaimed'][_0x4fe4f7][_0x26f7a8(0x21b)](_0x2bdbf2);break;case _0x26f7a8(0x2e0):case'denied':_0x265cf5[_0x26f7a8(0x271)][_0x4fe4f7][_0x26f7a8(0x21b)](_0x2bdbf2);break;case _0x26f7a8(0x278):case _0x26f7a8(0x378):break;}}},Game_System[_0x15094e(0x236)][_0x15094e(0x27b)]=function(_0x9d7e4b){const _0x2fec20=_0x15094e;_0x9d7e4b=_0x9d7e4b['toUpperCase']()[_0x2fec20(0x24d)]();const _0x23b1b2=this[_0x2fec20(0x36d)](_0x9d7e4b);if(!_0x23b1b2)return'';const _0x3f4e4f=this[_0x2fec20(0x237)]();return _0x3f4e4f[_0x2fec20(0x3ae)]=_0x3f4e4f[_0x2fec20(0x3ae)]||{},_0x3f4e4f['rewardsClaimed'][_0x9d7e4b]=_0x3f4e4f['rewardsClaimed'][_0x9d7e4b]||[],_0x3f4e4f['rewardsClaimed'][_0x9d7e4b][_0x2fec20(0x263)]((_0x1979a3,_0x57a190)=>_0x1979a3-_0x57a190);},Game_System[_0x15094e(0x236)]['questRewardsDenied']=function(_0x2af474){const _0xf898d9=_0x15094e;_0x2af474=_0x2af474[_0xf898d9(0x249)]()[_0xf898d9(0x24d)]();const _0x4bf264=this[_0xf898d9(0x36d)](_0x2af474);if(!_0x4bf264)return'';const _0x4346a4=this[_0xf898d9(0x237)]();return _0x4346a4[_0xf898d9(0x271)]=_0x4346a4[_0xf898d9(0x271)]||{},_0x4346a4[_0xf898d9(0x271)][_0x2af474]=_0x4346a4[_0xf898d9(0x271)][_0x2af474]||[],_0x4346a4[_0xf898d9(0x271)][_0x2af474][_0xf898d9(0x263)]((_0x572409,_0xcec3d5)=>_0x572409-_0xcec3d5);},Game_System[_0x15094e(0x236)][_0x15094e(0x3b9)]=function(_0x22770d){const _0x3f3ba5=_0x15094e;_0x22770d=_0x22770d[_0x3f3ba5(0x249)]()[_0x3f3ba5(0x24d)]();const _0x5cd6eb=this[_0x3f3ba5(0x36d)](_0x22770d);if(!_0x5cd6eb)return'';const _0x3b4f3b=this[_0x3f3ba5(0x237)]()['subtext'];_0x3b4f3b[_0x22770d]=_0x3b4f3b[_0x22770d]||0x1;const _0x1c2be8=_0x3b4f3b[_0x22770d];return _0x5cd6eb[_0x3f3ba5(0x3f3)][_0x1c2be8]||'';},Game_System[_0x15094e(0x236)][_0x15094e(0x2c0)]=function(_0x5a4cdf,_0x1df23a){const _0xf8b954=_0x15094e;_0x5a4cdf=_0x5a4cdf['toUpperCase']()[_0xf8b954(0x24d)]();const _0x5000d7=this[_0xf8b954(0x36d)](_0x5a4cdf);if(!_0x5000d7)return'';const _0x5e6160=this[_0xf8b954(0x237)]()['subtext'];_0x5e6160[_0x5a4cdf]=_0x1df23a;},Game_System[_0x15094e(0x236)][_0x15094e(0x2db)]=function(_0x4c3ddb){const _0x5f3ec7=_0x15094e;_0x4c3ddb=_0x4c3ddb[_0x5f3ec7(0x249)]()['trim']();const _0x4151d6=this[_0x5f3ec7(0x36d)](_0x4c3ddb);if(!_0x4151d6)return'';const _0x1fce7e=this[_0x5f3ec7(0x237)]()['quotes'];_0x1fce7e[_0x4c3ddb]=_0x1fce7e[_0x4c3ddb]||0x1;const _0x14ebbf=_0x1fce7e[_0x4c3ddb];return _0x4151d6[_0x5f3ec7(0x3f7)][_0x14ebbf]||'';},Game_System[_0x15094e(0x236)][_0x15094e(0x39a)]=function(_0x26bd11,_0x2b5051){const _0x193772=_0x15094e;_0x26bd11=_0x26bd11[_0x193772(0x249)]()[_0x193772(0x24d)]();const _0x13d46e=this[_0x193772(0x36d)](_0x26bd11);if(!_0x13d46e)return'';const _0x3fa413=this[_0x193772(0x237)]()[_0x193772(0x353)];_0x3fa413[_0x26bd11]=_0x2b5051;},Game_System['prototype'][_0x15094e(0x24c)]=function(){const _0x23283f=_0x15094e,_0x7058a5=this[_0x23283f(0x237)]();return this['quest'](_0x7058a5['tracked']);},Game_System[_0x15094e(0x236)]['setTrackedQuest']=function(_0x595fc3,_0x2e2aa0){const _0x353b67=_0x15094e,_0x376258=this['questData']();if(_0x2e2aa0&&_0x376258[_0x353b67(0x2e1)]===_0x595fc3)_0x595fc3='';_0x376258['tracked']=_0x595fc3,SceneManager[_0x353b67(0x383)]()&&('UWCmR'!==_0x353b67(0x2a1)?SceneManager['_scene'][_0x353b67(0x261)](_0x595fc3):(_0x45176f[_0x353b67(0x236)]['processWheelScroll'][_0x353b67(0x305)](this),this[_0x353b67(0x296)]()));},Game_System['prototype']['isQuestTrackerVisible']=function(){const _0x6c60e3=_0x15094e,_0x11b632=this[_0x6c60e3(0x237)]();return _0x11b632[_0x6c60e3(0x268)];},Game_System['prototype'][_0x15094e(0x22c)]=function(_0x433a4d){const _0xc7b81=_0x15094e,_0x353413=this[_0xc7b81(0x237)]();_0x353413[_0xc7b81(0x268)]=_0x433a4d;},VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2ee)]=Game_BattlerBase['prototype'][_0x15094e(0x345)],Game_BattlerBase[_0x15094e(0x236)][_0x15094e(0x345)]=function(_0x36d4e4){const _0x420860=_0x15094e,_0x469c4e=this[_0x420860(0x308)]();VisuMZ[_0x420860(0x3dd)][_0x420860(0x2ee)][_0x420860(0x305)](this,_0x36d4e4),this['questJournalSystemAddDeath'](_0x36d4e4,_0x469c4e);},Game_BattlerBase[_0x15094e(0x236)][_0x15094e(0x283)]=function(_0x8211d2,_0x21c5e0){const _0x1328f1=_0x15094e;if(_0x8211d2!==this[_0x1328f1(0x2e4)]())return;if(!this['isEnemy']())return;if(!_0x21c5e0)return;if(!this[_0x1328f1(0x1f9)]())return;if(this[_0x1328f1(0x35d)])return;this[_0x1328f1(0x35d)]=!![];const _0x2e0293=this[_0x1328f1(0x321)]()['note'],_0x2dc2cc=_0x2e0293['match'](/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/gi);if(_0x2dc2cc){if(_0x1328f1(0x2c7)===_0x1328f1(0x22e))this[_0x1328f1(0x33a)]=!![];else for(const _0x271e35 of _0x2dc2cc){if(_0x1328f1(0x28f)===_0x1328f1(0x28f)){_0x271e35['match'](/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/i);const _0x57b12f=Number(RegExp['$1']),_0x243c61=Number(RegExp['$2']),_0x493eac=$gameVariables[_0x1328f1(0x39c)](_0x57b12f);$gameVariables['setValue'](_0x57b12f,_0x493eac+_0x243c61);}else this[_0x1328f1(0x3d3)](_0x5b2776,_0x3b79d6['x'],_0xdfb0e2['y'],_0x5c00be);}}},VisuMZ[_0x15094e(0x3dd)]['Game_Battler_useItem']=Game_Battler[_0x15094e(0x236)][_0x15094e(0x35b)],Game_Battler[_0x15094e(0x236)]['useItem']=function(_0xeae36f){const _0x187c7d=_0x15094e;VisuMZ[_0x187c7d(0x3dd)][_0x187c7d(0x33e)][_0x187c7d(0x305)](this,_0xeae36f),this[_0x187c7d(0x3d2)](_0xeae36f);},Game_Battler[_0x15094e(0x236)][_0x15094e(0x3d2)]=function(_0x31ecd6){const _0x1ba127=_0x15094e;if(!_0x31ecd6)return;if(!this[_0x1ba127(0x3f0)]())return;const _0x588693=_0x31ecd6[_0x1ba127(0x399)],_0x295c42=_0x588693[_0x1ba127(0x21c)](/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/gi);if(_0x295c42){if('baiOV'===_0x1ba127(0x2e8))for(const _0x167817 of _0x295c42){if(_0x1ba127(0x303)==='lkbeD')this[_0x1ba127(0x259)](...arguments);else{_0x167817[_0x1ba127(0x21c)](/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/i);const _0x528dd5=Number(RegExp['$1']),_0x58810c=Number(RegExp['$2']),_0x5eff9c=$gameVariables[_0x1ba127(0x39c)](_0x528dd5);$gameVariables['setValue'](_0x528dd5,_0x5eff9c+_0x58810c);}}else _0x240e32[_0x1ba127(0x2c0)](_0x1671da,_0x28e3ae);}},VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d7)]=Game_Actor[_0x15094e(0x236)][_0x15094e(0x28e)],Game_Actor[_0x15094e(0x236)]['tradeItemWithParty']=function(_0x252d09,_0x37579d){const _0x468730=_0x15094e;$gameTemp[_0x468730(0x3a3)]=!![];const _0x4596a4=VisuMZ['QuestSystem']['Game_Actor_tradeItemWithParty'][_0x468730(0x305)](this,_0x252d09,_0x37579d);return $gameTemp['_tradeItemWithParty']=undefined,_0x4596a4;},VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2c4)]=Game_Party['prototype'][_0x15094e(0x37a)],Game_Party[_0x15094e(0x236)][_0x15094e(0x37a)]=function(_0x965bd6,_0x1ee2a6,_0x1cc263){const _0x4fcba4=_0x15094e;VisuMZ[_0x4fcba4(0x3dd)][_0x4fcba4(0x2c4)][_0x4fcba4(0x305)](this,_0x965bd6,_0x1ee2a6,_0x1cc263),this[_0x4fcba4(0x28b)](_0x965bd6,_0x1ee2a6);},Game_Party['prototype'][_0x15094e(0x28b)]=function(_0x42e481,_0x5619d7){const _0x248c32=_0x15094e;if(!_0x42e481)return;if($gameTemp[_0x248c32(0x3a3)])return;const _0x59745e=_0x42e481[_0x248c32(0x399)];if(_0x5619d7>0x0){if(_0x248c32(0x394)===_0x248c32(0x2a5)){const _0x174fdf=_0x79230d['x']+_0x178fdb['floor']((_0x59b4f2[_0x248c32(0x333)]-_0x4958af)/0x2);this[_0x248c32(0x3d3)](_0x192749,_0x174fdf,_0x1895e9['y'],_0x2f494c);}else{const _0x1cac56=_0x59745e[_0x248c32(0x21c)](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/gi);if(_0x1cac56)for(const _0x19f237 of _0x1cac56){_0x19f237[_0x248c32(0x21c)](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/i);const _0x2cae2c=Number(RegExp['$1']),_0x1abd34=Number(RegExp['$2'])*_0x5619d7,_0x51b600=$gameVariables[_0x248c32(0x39c)](_0x2cae2c);$gameVariables[_0x248c32(0x27a)](_0x2cae2c,_0x51b600+_0x1abd34);}}}else{if(_0x5619d7<0x0){const _0x50ec5f=_0x59745e[_0x248c32(0x21c)](/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/gi);if(_0x50ec5f){if(_0x248c32(0x361)===_0x248c32(0x266)){const _0x18e492=this[_0x248c32(0x21e)],_0x3d75c7=_0x49a1f0[_0x248c32(0x219)](),_0x283cc1=_0x55b47a['x']+_0x26e4c2[_0x248c32(0x377)](_0x53a045[_0x248c32(0x333)]/0x2)+_0x3d75c7;_0x18e492['x']=_0x18e492[_0x248c32(0x333)]/-0x2+_0x283cc1,_0x18e492['y']=_0x451fbb['floor'](_0x19c190['height']/0x2);}else for(const _0x2b570e of _0x50ec5f){_0x2b570e[_0x248c32(0x21c)](/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/i);const _0x217add=Number(RegExp['$1']),_0x1cefd4=Number(RegExp['$2'])*_0x5619d7,_0x9774a4=$gameVariables[_0x248c32(0x39c)](_0x217add);$gameVariables[_0x248c32(0x27a)](_0x217add,_0x9774a4+_0x1cefd4);}}}}const _0x18ff7d=_0x59745e['match'](/<TRACK WITH VARIABLE (\d+)>/gi);if(_0x18ff7d)for(const _0x4f3725 of _0x18ff7d){_0x4f3725[_0x248c32(0x21c)](/<TRACK WITH VARIABLE (\d+)>/i);const _0x9bd57b=Number(RegExp['$1']),_0x20d35c=$gameParty[_0x248c32(0x205)](_0x42e481);$gameVariables['setValue'](_0x9bd57b,_0x20d35c);}},VisuMZ['QuestSystem'][_0x15094e(0x398)]=Game_Map[_0x15094e(0x236)][_0x15094e(0x24a)],Game_Map[_0x15094e(0x236)][_0x15094e(0x24a)]=function(){const _0x17b2d2=_0x15094e;VisuMZ[_0x17b2d2(0x3dd)][_0x17b2d2(0x398)][_0x17b2d2(0x305)](this),SceneManager['isSceneMap']()&&!this[_0x17b2d2(0x33a)]&&(this[_0x17b2d2(0x33a)]=!![]);},VisuMZ[_0x15094e(0x3dd)]['Game_Map_refresh']=Game_Map['prototype']['refresh'],Game_Map['prototype'][_0x15094e(0x319)]=function(){const _0x2724ae=_0x15094e;VisuMZ[_0x2724ae(0x3dd)][_0x2724ae(0x244)][_0x2724ae(0x305)](this),SceneManager['isSceneMap']()&&this[_0x2724ae(0x33a)]&&(_0x2724ae(0x38f)!=='KAdzF'?_0x3dbd1d[_0x2724ae(0x3e2)](_0x2ff1ad,_0x851757,_0x4e260c):(SceneManager['_scene'][_0x2724ae(0x222)](),this['_isRefreshingQuestTrackerWindow']=![]));},VisuMZ['QuestSystem'][_0x15094e(0x3e8)]=Scene_Map['prototype']['createSpriteset'],Scene_Map[_0x15094e(0x236)][_0x15094e(0x400)]=function(){const _0x9b052d=_0x15094e;VisuMZ[_0x9b052d(0x3dd)][_0x9b052d(0x3e8)][_0x9b052d(0x305)](this),this['createQuestTrackerWindow']();},Scene_Map[_0x15094e(0x236)][_0x15094e(0x382)]=function(){const _0xebe86e=_0x15094e;if(!SceneManager[_0xebe86e(0x383)]())return;const _0x14db99=this['questTrackerWindow'](),_0x2c1919=new Window_QuestTracker(_0x14db99);this[_0xebe86e(0x37c)](_0x2c1919),this[_0xebe86e(0x243)]=_0x2c1919;},Scene_Map[_0x15094e(0x236)]['questTrackerOnRight']=function(){const _0x12f94d=_0x15094e;return ConfigManager[_0x12f94d(0x300)];},Scene_Map[_0x15094e(0x236)][_0x15094e(0x23a)]=function(){const _0x324289=_0x15094e;return VisuMZ['QuestSystem'][_0x324289(0x2d4)][_0x324289(0x1fa)][_0x324289(0x280)][_0x324289(0x305)](this);},Scene_Map[_0x15094e(0x236)][_0x15094e(0x222)]=function(){const _0x3b06bc=_0x15094e;if(!this[_0x3b06bc(0x243)])return;this[_0x3b06bc(0x243)][_0x3b06bc(0x319)]();},Scene_Map[_0x15094e(0x236)]['setQuestForQuestTrackerWindow']=function(_0x251463){const _0x52cfa4=_0x15094e;if(!this[_0x52cfa4(0x243)])return;_0x251463=_0x251463[_0x52cfa4(0x249)]()['trim']();const _0x42de9f=$gameSystem[_0x52cfa4(0x36d)](_0x251463);this[_0x52cfa4(0x243)][_0x52cfa4(0x246)](_0x42de9f);},VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x269)]=Scene_Menu[_0x15094e(0x236)]['createCommandWindow'],Scene_Menu[_0x15094e(0x236)]['createCommandWindow']=function(){const _0x421431=_0x15094e;VisuMZ[_0x421431(0x3dd)][_0x421431(0x269)]['call'](this),this[_0x421431(0x31e)][_0x421431(0x2b4)](_0x421431(0x36d),this['commandQuest'][_0x421431(0x3fd)](this));},Scene_Menu['prototype'][_0x15094e(0x211)]=function(){const _0xda0bc=_0x15094e;SceneManager[_0xda0bc(0x21b)](Scene_Quest);},VisuMZ[_0x15094e(0x3dd)]['Scene_Options_maxCommands']=Scene_Options[_0x15094e(0x236)][_0x15094e(0x3bd)],Scene_Options[_0x15094e(0x236)][_0x15094e(0x3bd)]=function(){const _0x2b7f62=_0x15094e;let _0x573fb5=VisuMZ['QuestSystem'][_0x2b7f62(0x3d1)][_0x2b7f62(0x305)](this);if(VisuMZ[_0x2b7f62(0x3dd)][_0x2b7f62(0x2d4)]['Tracker'][_0x2b7f62(0x3be)]){if(VisuMZ[_0x2b7f62(0x3dd)][_0x2b7f62(0x2d4)]['Tracker'][_0x2b7f62(0x322)])_0x573fb5++;if(VisuMZ[_0x2b7f62(0x3dd)][_0x2b7f62(0x2d4)]['Tracker'][_0x2b7f62(0x3ee)])_0x573fb5++;}return _0x573fb5;};function Scene_Quest(){this['initialize'](...arguments);}Scene_Quest[_0x15094e(0x236)]=Object[_0x15094e(0x215)](Scene_MenuBase[_0x15094e(0x236)]),Scene_Quest['prototype'][_0x15094e(0x203)]=Scene_Quest,Scene_Quest['prototype'][_0x15094e(0x259)]=function(){const _0x31d7f5=_0x15094e;Scene_MenuBase[_0x31d7f5(0x236)]['initialize']['call'](this);},Scene_Quest['prototype'][_0x15094e(0x385)]=function(){return 0x0;},Scene_Quest[_0x15094e(0x236)][_0x15094e(0x3f2)]=function(){const _0x1c8421=_0x15094e;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x1c8421(0x256)]!==undefined)return ConfigManager[_0x1c8421(0x256)];else{if(ConfigManager['uiMenuStyle']===![]){if(_0x1c8421(0x2bd)!=='BodXm')return![];else{if(_0x7ac970[_0x1c8421(0x3ff)])return;_0x105a2c[_0x1c8421(0x3ff)]=!![],_0x605ce[_0x1c8421(0x236)]['refresh'][_0x1c8421(0x305)](this),this[_0x1c8421(0x2d5)](this[_0x1c8421(0x25b)]?_0x40efa4[_0x1c8421(0x295)]:0x2),_0x3a6b0d[_0x1c8421(0x3ff)]=![];}}else return Scene_MenuBase[_0x1c8421(0x236)][_0x1c8421(0x3f2)][_0x1c8421(0x305)](this);}},Scene_Quest[_0x15094e(0x236)][_0x15094e(0x279)]=function(){const _0x2df07e=_0x15094e;return(Graphics[_0x2df07e(0x25e)]-0x230)[_0x2df07e(0x36b)](0xf0,Math['floor'](Graphics[_0x2df07e(0x25e)]/0x2));},Scene_Quest[_0x15094e(0x236)][_0x15094e(0x215)]=function(){const _0x522e26=_0x15094e;Scene_MenuBase[_0x522e26(0x236)][_0x522e26(0x215)][_0x522e26(0x305)](this),this[_0x522e26(0x370)](),this[_0x522e26(0x224)](),this[_0x522e26(0x367)](),this[_0x522e26(0x2b1)]();},Scene_Quest['prototype']['createCommandWindow']=function(){const _0x133009=_0x15094e,_0x56b1a2=this[_0x133009(0x374)](),_0x4d4641=new Window_QuestCommand(_0x56b1a2);_0x4d4641[_0x133009(0x2b4)]('known',this[_0x133009(0x248)][_0x133009(0x3fd)](this)),_0x4d4641['setHandler']('completed',this[_0x133009(0x248)][_0x133009(0x3fd)](this)),_0x4d4641[_0x133009(0x2b4)](_0x133009(0x2cb),this['onCommandOk'][_0x133009(0x3fd)](this)),_0x4d4641[_0x133009(0x2b4)](_0x133009(0x38a),this[_0x133009(0x343)][_0x133009(0x3fd)](this)),this[_0x133009(0x3d7)](_0x4d4641),this[_0x133009(0x31e)]=_0x4d4641,_0x4d4641['setBackgroundType'](VisuMZ[_0x133009(0x3dd)][_0x133009(0x2d4)][_0x133009(0x1fa)]['CommandWindow_BgType']);},Scene_Quest[_0x15094e(0x236)][_0x15094e(0x374)]=function(){const _0x38b79f=_0x15094e;return VisuMZ[_0x38b79f(0x3dd)][_0x38b79f(0x2d4)]['Window'][_0x38b79f(0x2f5)][_0x38b79f(0x305)](this);},Scene_Quest[_0x15094e(0x236)][_0x15094e(0x224)]=function(){const _0x376bf8=_0x15094e,_0x1126da=this[_0x376bf8(0x20c)](),_0x386528=new Window_Base(_0x1126da);this[_0x376bf8(0x3d7)](_0x386528),this['_labelWindow']=_0x386528,_0x386528[_0x376bf8(0x2d5)](VisuMZ[_0x376bf8(0x3dd)][_0x376bf8(0x2d4)]['Window'][_0x376bf8(0x2ec)]);},Scene_Quest[_0x15094e(0x236)][_0x15094e(0x20c)]=function(){const _0x39bf07=_0x15094e;return VisuMZ[_0x39bf07(0x3dd)][_0x39bf07(0x2d4)][_0x39bf07(0x1fa)][_0x39bf07(0x2aa)][_0x39bf07(0x305)](this);},Scene_Quest[_0x15094e(0x236)][_0x15094e(0x367)]=function(){const _0x47a972=_0x15094e,_0x2b2289=this[_0x47a972(0x247)](),_0x3fbbe2=new Window_QuestLog(_0x2b2289);this[_0x47a972(0x3d7)](_0x3fbbe2),this[_0x47a972(0x228)]=_0x3fbbe2,_0x3fbbe2[_0x47a972(0x2d5)](VisuMZ['QuestSystem']['Settings'][_0x47a972(0x1fa)]['LogWindow_BgType']);},Scene_Quest['prototype'][_0x15094e(0x247)]=function(){const _0xc0bacd=_0x15094e;return VisuMZ[_0xc0bacd(0x3dd)][_0xc0bacd(0x2d4)][_0xc0bacd(0x1fa)][_0xc0bacd(0x354)][_0xc0bacd(0x305)](this);},Scene_Quest[_0x15094e(0x236)][_0x15094e(0x2b1)]=function(){const _0x23b541=_0x15094e,_0x5e4f1f=this[_0x23b541(0x1f2)](),_0x16ac9f=new Window_QuestList(_0x5e4f1f);_0x16ac9f['setHandler'](_0x23b541(0x22f),this[_0x23b541(0x31a)][_0x23b541(0x3fd)](this)),_0x16ac9f['setHandler'](_0x23b541(0x36d),this[_0x23b541(0x365)][_0x23b541(0x3fd)](this)),_0x16ac9f['setHandler'](_0x23b541(0x38a),this[_0x23b541(0x316)][_0x23b541(0x3fd)](this)),this[_0x23b541(0x3d7)](_0x16ac9f),this[_0x23b541(0x2de)]=_0x16ac9f,_0x16ac9f[_0x23b541(0x2d5)](VisuMZ[_0x23b541(0x3dd)][_0x23b541(0x2d4)]['Window'][_0x23b541(0x36e)]),this[_0x23b541(0x31e)][_0x23b541(0x2c3)](this[_0x23b541(0x2de)]),this['_listWindow'][_0x23b541(0x3a2)](this[_0x23b541(0x349)]),this[_0x23b541(0x2de)][_0x23b541(0x23e)](this[_0x23b541(0x228)]);},Scene_Quest[_0x15094e(0x236)][_0x15094e(0x1f2)]=function(){const _0x5596fe=_0x15094e;return VisuMZ['QuestSystem'][_0x5596fe(0x2d4)]['Window'][_0x5596fe(0x391)][_0x5596fe(0x305)](this);},Scene_Quest[_0x15094e(0x236)][_0x15094e(0x248)]=function(){const _0x2a7d8a=_0x15094e;this[_0x2a7d8a(0x2de)][_0x2a7d8a(0x282)](),this['_listWindow'][_0x2a7d8a(0x274)](0x0);},Scene_Quest['prototype'][_0x15094e(0x31a)]=function(){const _0x435873=_0x15094e;this[_0x435873(0x2de)]['openCloseCurrentCategory'](),this['_listWindow'][_0x435873(0x282)]();},Scene_Quest['prototype'][_0x15094e(0x365)]=function(){const _0x50a586=_0x15094e,_0x2314e9=this[_0x50a586(0x2de)][_0x50a586(0x363)](),_0x50a850=_0x2314e9[_0x50a586(0x204)][_0x50a586(0x249)]()[_0x50a586(0x24d)]();$gameSystem[_0x50a586(0x3c3)](_0x50a850,!![]),this[_0x50a586(0x2de)][_0x50a586(0x319)](),this[_0x50a586(0x2de)][_0x50a586(0x282)]();},Scene_Quest[_0x15094e(0x236)][_0x15094e(0x316)]=function(){const _0x2b86b4=_0x15094e;this['_listWindow'][_0x2b86b4(0x208)](),this['_commandWindow'][_0x2b86b4(0x282)]();},Scene_Quest[_0x15094e(0x236)]['buttonAssistText1']=function(){const _0x21cf70=_0x15094e;return TextManager[_0x21cf70(0x3c6)];},Scene_Quest[_0x15094e(0x236)][_0x15094e(0x355)]=function(){const _0x404d90=_0x15094e;if(this['_listWindow']&&this[_0x404d90(0x2de)]['active']){if(this[_0x404d90(0x2de)][_0x404d90(0x363)]())return this['_listWindow']['isOkEnabled']()?TextManager['questButtonAssistActive']:'';else{if(this[_0x404d90(0x2de)][_0x404d90(0x265)]())return TextManager[_0x404d90(0x3af)];else{if(_0x404d90(0x202)===_0x404d90(0x32b))_0x4e7d1c=_0x404d90(0x360)[_0x404d90(0x235)](_0x443aa3,_0x261c25);else return TextManager[_0x404d90(0x3bb)];}}}return Scene_MenuBase['prototype'][_0x404d90(0x355)][_0x404d90(0x305)](this);},Scene_Quest[_0x15094e(0x236)][_0x15094e(0x3d8)]=function(){const _0x249a3f=_0x15094e;Scene_MenuBase[_0x249a3f(0x236)]['createBackground'][_0x249a3f(0x305)](this),this[_0x249a3f(0x2da)](this[_0x249a3f(0x346)]()),this[_0x249a3f(0x3ac)]();},Scene_Quest['prototype'][_0x15094e(0x346)]=function(){const _0x29c207=_0x15094e;return VisuMZ[_0x29c207(0x3dd)]['Settings'][_0x29c207(0x28d)]['SnapshotOpacity'];},Scene_Quest['prototype'][_0x15094e(0x3ac)]=function(){const _0x4028c0=_0x15094e,_0x4eedcf={'BgFilename1':VisuMZ[_0x4028c0(0x3dd)][_0x4028c0(0x2d4)][_0x4028c0(0x28d)][_0x4028c0(0x2c1)],'BgFilename2':VisuMZ[_0x4028c0(0x3dd)][_0x4028c0(0x2d4)]['BgSettings'][_0x4028c0(0x3c2)]};_0x4eedcf&&(_0x4eedcf[_0x4028c0(0x2c1)]!==''||_0x4eedcf['BgFilename2']!=='')&&(_0x4028c0(0x27f)!==_0x4028c0(0x27f)?this['questTrackerShow']=!![]:(this[_0x4028c0(0x20f)]=new Sprite(ImageManager['loadTitle1'](_0x4eedcf[_0x4028c0(0x2c1)])),this['_backSprite2']=new Sprite(ImageManager[_0x4028c0(0x3a6)](_0x4eedcf[_0x4028c0(0x3c2)])),this[_0x4028c0(0x37c)](this[_0x4028c0(0x20f)]),this['addChild'](this[_0x4028c0(0x3aa)]),this['_backSprite1'][_0x4028c0(0x3cd)][_0x4028c0(0x21f)](this[_0x4028c0(0x253)]['bind'](this,this[_0x4028c0(0x20f)])),this['_backSprite2'][_0x4028c0(0x3cd)][_0x4028c0(0x21f)](this[_0x4028c0(0x253)][_0x4028c0(0x3fd)](this,this['_backSprite2']))));},Scene_Quest[_0x15094e(0x236)]['adjustSprite']=function(_0x227081){const _0x20b35e=_0x15094e;this[_0x20b35e(0x2ce)](_0x227081),this['centerSprite'](_0x227081);},VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x1f3)]=Window_MenuCommand[_0x15094e(0x236)][_0x15094e(0x318)],Window_MenuCommand[_0x15094e(0x236)][_0x15094e(0x318)]=function(){const _0x54aa5b=_0x15094e;VisuMZ['QuestSystem']['Window_MenuCommand_addOriginalCommands'][_0x54aa5b(0x305)](this),this[_0x54aa5b(0x22d)]();},Window_MenuCommand[_0x15094e(0x236)][_0x15094e(0x22d)]=function(){const _0x4930e0=_0x15094e;if(!this[_0x4930e0(0x201)]())return;if(!this[_0x4930e0(0x3ad)]())return;const _0x3465b4=TextManager[_0x4930e0(0x34b)],_0x8c155c=this[_0x4930e0(0x2c2)]();this['addCommand'](_0x3465b4,_0x4930e0(0x36d),_0x8c155c);},Window_MenuCommand[_0x15094e(0x236)][_0x15094e(0x201)]=function(){const _0x3f0fb9=_0x15094e;return Imported[_0x3f0fb9(0x369)]?![]:!![];},Window_MenuCommand['prototype'][_0x15094e(0x3ad)]=function(){const _0x4af3a0=_0x15094e;return $gameSystem[_0x4af3a0(0x3c8)]();},Window_MenuCommand[_0x15094e(0x236)][_0x15094e(0x2c2)]=function(){return $gameSystem['isquestMenuEnabled']();},VisuMZ['QuestSystem'][_0x15094e(0x358)]=Window_Options['prototype']['addGeneralOptions'],Window_Options[_0x15094e(0x236)][_0x15094e(0x38e)]=function(){const _0x560982=_0x15094e;VisuMZ[_0x560982(0x3dd)]['Window_Options_addGeneralOptions'][_0x560982(0x305)](this),this['addQuestSystemCommands']();},Window_Options[_0x15094e(0x236)][_0x15094e(0x310)]=function(){const _0x24e2d9=_0x15094e;if(VisuMZ[_0x24e2d9(0x3dd)][_0x24e2d9(0x2d4)]['Tracker'][_0x24e2d9(0x322)]){if(_0x24e2d9(0x320)!=='KeJoo')this[_0x24e2d9(0x306)]();else return _0x4df72d['replace'](/<(?:BR|LINEBREAK)>/gi,'');}VisuMZ['QuestSystem'][_0x24e2d9(0x2d4)]['Tracker'][_0x24e2d9(0x3ee)]&&this[_0x24e2d9(0x29f)]();},Window_Options['prototype'][_0x15094e(0x306)]=function(){const _0x50a4b1=_0x15094e,_0x58be76=TextManager[_0x50a4b1(0x26a)],_0x48e817='questTrackerShow';this[_0x50a4b1(0x3bf)](_0x58be76,_0x48e817);},Window_Options['prototype'][_0x15094e(0x29f)]=function(){const _0x2116b9=_0x15094e,_0x562427=TextManager[_0x2116b9(0x300)],_0x1a2a59=_0x2116b9(0x300);this[_0x2116b9(0x3bf)](_0x562427,_0x1a2a59);},VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x242)]=Window_Options[_0x15094e(0x236)][_0x15094e(0x2b3)],Window_Options[_0x15094e(0x236)]['statusText']=function(_0x2e6da4){const _0x4425b7=_0x15094e,_0x538994=this['commandSymbol'](_0x2e6da4);if(_0x538994===_0x4425b7(0x300)){const _0xc7ade2=this[_0x4425b7(0x3cf)](_0x538994);return _0xc7ade2?TextManager[_0x4425b7(0x2b2)]:TextManager[_0x4425b7(0x20d)];}return VisuMZ[_0x4425b7(0x3dd)][_0x4425b7(0x242)]['call'](this,_0x2e6da4);};function Window_QuestCommand(){const _0x1d962c=_0x15094e;this[_0x1d962c(0x259)](...arguments);}Window_QuestCommand[_0x15094e(0x236)]=Object['create'](Window_Command['prototype']),Window_QuestCommand[_0x15094e(0x236)][_0x15094e(0x203)]=Window_QuestCommand,Window_QuestCommand[_0x15094e(0x236)]['initialize']=function(_0x4bb43a){const _0x267ddd=_0x15094e;Window_Command[_0x267ddd(0x236)][_0x267ddd(0x259)][_0x267ddd(0x305)](this,_0x4bb43a),this[_0x267ddd(0x334)](_0x4bb43a);},Window_QuestCommand[_0x15094e(0x236)]['createCommandNameWindow']=function(_0x2eef44){const _0x40fda4=_0x15094e,_0x34b718=new Rectangle(0x0,0x0,_0x2eef44[_0x40fda4(0x333)],_0x2eef44[_0x40fda4(0x39d)]);this[_0x40fda4(0x21e)]=new Window_Base(_0x34b718),this[_0x40fda4(0x21e)][_0x40fda4(0x245)]=0x0,this['addChild'](this[_0x40fda4(0x21e)]),this['updateCommandNameWindow']();},Window_QuestCommand[_0x15094e(0x236)]['callUpdateHelp']=function(){const _0x1d9c51=_0x15094e;Window_Command[_0x1d9c51(0x236)]['callUpdateHelp'][_0x1d9c51(0x305)](this);if(this[_0x1d9c51(0x21e)])this[_0x1d9c51(0x293)]();if(this[_0x1d9c51(0x2de)])this[_0x1d9c51(0x2de)][_0x1d9c51(0x2ba)](this[_0x1d9c51(0x384)]());},Window_QuestCommand['prototype'][_0x15094e(0x293)]=function(){const _0x23290c=_0x15094e,_0x54db36=this[_0x23290c(0x21e)];_0x54db36[_0x23290c(0x3b8)]['clear']();const _0x58a5a3=this['commandStyleCheck'](this[_0x23290c(0x3a0)]());if(_0x58a5a3===_0x23290c(0x209)){const _0x3ee900=this[_0x23290c(0x299)](this[_0x23290c(0x3a0)]());let _0x26f039=this[_0x23290c(0x3b6)](this[_0x23290c(0x3a0)]());_0x26f039=_0x26f039['replace'](/\\I\[(\d+)\]/gi,''),_0x54db36['resetFontSettings'](),this[_0x23290c(0x2e5)](_0x26f039,_0x3ee900),this[_0x23290c(0x2b6)](_0x26f039,_0x3ee900),this[_0x23290c(0x231)](_0x26f039,_0x3ee900);}},Window_QuestCommand[_0x15094e(0x236)][_0x15094e(0x2e5)]=function(_0xc1655c,_0x46f382){},Window_QuestCommand[_0x15094e(0x236)][_0x15094e(0x2b6)]=function(_0x439b1c,_0x36dbba){const _0x4960d9=_0x15094e,_0xcdaeee=this[_0x4960d9(0x21e)];_0xcdaeee[_0x4960d9(0x214)](_0x439b1c,0x0,_0x36dbba['y'],_0xcdaeee[_0x4960d9(0x267)],_0x4960d9(0x262));},Window_QuestCommand[_0x15094e(0x236)][_0x15094e(0x231)]=function(_0x14c727,_0x4be603){const _0x469477=_0x15094e,_0x2bb98d=this[_0x469477(0x21e)],_0x1345df=$gameSystem[_0x469477(0x219)](),_0x549044=_0x4be603['x']+Math['floor'](_0x4be603[_0x469477(0x333)]/0x2)+_0x1345df;_0x2bb98d['x']=_0x2bb98d[_0x469477(0x333)]/-0x2+_0x549044,_0x2bb98d['y']=Math[_0x469477(0x377)](_0x4be603[_0x469477(0x39d)]/0x2);},Window_QuestCommand[_0x15094e(0x236)][_0x15094e(0x2af)]=function(){const _0x212a00=_0x15094e;this[_0x212a00(0x2ab)](),this[_0x212a00(0x2d1)](),this[_0x212a00(0x3c5)]();},Window_QuestCommand[_0x15094e(0x236)][_0x15094e(0x2ab)]=function(){const _0x5175dc=_0x15094e,_0x5058e9=_0x5175dc(0x31d),_0x42b9d3=ImageManager[_0x5175dc(0x2b5)];let _0x51da84=TextManager[_0x5175dc(0x3dc)];_0x42b9d3>0x0&&this[_0x5175dc(0x3eb)]()!==_0x5175dc(0x32d)&&(_0x51da84='\x5cI[%1]%2'[_0x5175dc(0x235)](_0x42b9d3,_0x51da84));const _0x349bb5=this['isKnownQuestsEnabled']();this[_0x5175dc(0x3bf)](_0x51da84,_0x5058e9,_0x349bb5);},Window_QuestCommand[_0x15094e(0x236)][_0x15094e(0x3b5)]=function(){const _0x562b07=_0x15094e;return $gameSystem[_0x562b07(0x3bc)]()[_0x562b07(0x2b9)]>0x0;},Window_QuestCommand[_0x15094e(0x236)][_0x15094e(0x2d1)]=function(){const _0x485e90=_0x15094e,_0x34fcc1=_0x485e90(0x3ef),_0x316210=ImageManager[_0x485e90(0x3ed)];let _0xec059d=TextManager[_0x485e90(0x3da)];_0x316210>0x0&&this[_0x485e90(0x3eb)]()!==_0x485e90(0x32d)&&(_0xec059d=_0x485e90(0x360)[_0x485e90(0x235)](_0x316210,_0xec059d));const _0x534b1e=this[_0x485e90(0x3cb)]();this[_0x485e90(0x3bf)](_0xec059d,_0x34fcc1,_0x534b1e);},Window_QuestCommand[_0x15094e(0x236)][_0x15094e(0x3cb)]=function(){const _0x13fde1=_0x15094e;return $gameSystem[_0x13fde1(0x325)]()[_0x13fde1(0x2b9)]>0x0;},Window_QuestCommand[_0x15094e(0x236)][_0x15094e(0x3c5)]=function(){const _0x37cee0=_0x15094e;if(!this[_0x37cee0(0x3e0)]())return;const _0x3bf573=_0x37cee0(0x2cb),_0x203a95=ImageManager[_0x37cee0(0x2cc)];let _0x3dad83=TextManager[_0x37cee0(0x3f4)];if(_0x203a95>0x0&&this[_0x37cee0(0x3eb)]()!==_0x37cee0(0x32d)){if(_0x37cee0(0x26f)!==_0x37cee0(0x26f))return'iconText';else _0x3dad83=_0x37cee0(0x360)[_0x37cee0(0x235)](_0x203a95,_0x3dad83);}const _0x165552=this[_0x37cee0(0x3ce)]();this[_0x37cee0(0x3bf)](_0x3dad83,_0x3bf573,_0x165552);},Window_QuestCommand['prototype'][_0x15094e(0x3e0)]=function(){const _0x3753ef=_0x15094e;return VisuMZ[_0x3753ef(0x3dd)][_0x3753ef(0x2d4)][_0x3753ef(0x1fa)][_0x3753ef(0x329)];},Window_QuestCommand[_0x15094e(0x236)]['isFailedQuestsEnabled']=function(){const _0x8c4f3a=_0x15094e;return $gameSystem[_0x8c4f3a(0x35f)]()[_0x8c4f3a(0x2b9)]>0x0;},Window_QuestCommand[_0x15094e(0x236)][_0x15094e(0x29d)]=function(){const _0x534fbf=_0x15094e;return this[_0x534fbf(0x3e0)]()?0x3:0x2;},Window_QuestCommand[_0x15094e(0x236)][_0x15094e(0x347)]=function(){const _0x49930c=_0x15094e;return VisuMZ[_0x49930c(0x3dd)]['Settings']['Window'][_0x49930c(0x301)];},Window_QuestCommand['prototype'][_0x15094e(0x3ab)]=function(_0x29b630){const _0x5eab6b=_0x15094e,_0xc6075b=this[_0x5eab6b(0x26e)](_0x29b630);if(_0xc6075b===_0x5eab6b(0x3b2)){if(_0x5eab6b(0x2b7)!==_0x5eab6b(0x32a))this[_0x5eab6b(0x38b)](_0x29b630);else return _0x54df58()+_0x572526()+_0x54f279();}else _0xc6075b===_0x5eab6b(0x209)?this[_0x5eab6b(0x2f7)](_0x29b630):'dsBPK'!==_0x5eab6b(0x2fc)?(_0x43f27e[_0x5eab6b(0x257)][_0x5eab6b(0x222)](),this['_isRefreshingQuestTrackerWindow']=![]):Window_HorzCommand[_0x5eab6b(0x236)]['drawItem']['call'](this,_0x29b630);},Window_QuestCommand[_0x15094e(0x236)][_0x15094e(0x3eb)]=function(){const _0x5aab00=_0x15094e;return VisuMZ[_0x5aab00(0x3dd)][_0x5aab00(0x2d4)][_0x5aab00(0x1fa)]['CmdStyle'];},Window_QuestCommand[_0x15094e(0x236)][_0x15094e(0x26e)]=function(_0x313099){const _0x3ece01=_0x15094e;if(_0x313099<0x0)return _0x3ece01(0x32d);const _0x4d097d=this[_0x3ece01(0x3eb)]();if(_0x4d097d!=='auto')return _0x4d097d;else{if(this[_0x3ece01(0x1fc)]()>0x0){const _0x699161=this[_0x3ece01(0x3b6)](_0x313099);if(_0x699161[_0x3ece01(0x21c)](/\\I\[(\d+)\]/i)){if('LMEuZ'!==_0x3ece01(0x3b4)){_0x2c75c2=_0x2da1c3['toUpperCase']()[_0x3ece01(0x24d)]();const _0x12e13f=_0x5b9c2a[_0x3ece01(0x36d)](_0x3fe555);if(!_0x12e13f)return![];_0x84224a[_0x3ece01(0x401)](_0x49a7fb);const _0x75e3a4=_0x2dac08[_0x3ece01(0x237)]()['objectives'];if(!_0x75e3a4[_0x36bff1])return![];return _0x75e3a4[_0x3e6851][_0x3ece01(0x21d)](_0x38e450);}else{const _0x2c5976=this[_0x3ece01(0x299)](_0x313099),_0x409e9c=this[_0x3ece01(0x29a)](_0x699161)[_0x3ece01(0x333)];return _0x409e9c<=_0x2c5976[_0x3ece01(0x333)]?_0x3ece01(0x33f)!=='AIpWj'?![]:_0x3ece01(0x3b2):'icon';}}}}return'text';},Window_QuestCommand[_0x15094e(0x236)]['drawItemStyleIconText']=function(_0x3823b8){const _0x44fdfb=_0x15094e,_0x3083da=this[_0x44fdfb(0x299)](_0x3823b8),_0x1c8401=this[_0x44fdfb(0x3b6)](_0x3823b8),_0x157ffa=this[_0x44fdfb(0x29a)](_0x1c8401)[_0x44fdfb(0x333)];this[_0x44fdfb(0x226)](this[_0x44fdfb(0x2fb)](_0x3823b8));const _0x41f8b8=this['itemTextAlign']();if(_0x41f8b8===_0x44fdfb(0x2b0))_0x44fdfb(0x3f1)!==_0x44fdfb(0x3f1)?this[_0x44fdfb(0x26a)]=_0xa6723b['questTrackerShow']:this[_0x44fdfb(0x3d3)](_0x1c8401,_0x3083da['x']+_0x3083da[_0x44fdfb(0x333)]-_0x157ffa,_0x3083da['y'],_0x157ffa);else{if(_0x41f8b8===_0x44fdfb(0x262)){if(_0x44fdfb(0x2a7)===_0x44fdfb(0x29c)){_0x50c894[_0x44fdfb(0x1f5)](_0x406d82,_0x100de4);const _0x3d16e3=_0x15e887[_0x44fdfb(0x286)],_0x328057=_0x2abaef[_0x44fdfb(0x258)];for(const _0xefbbf3 of _0x3d16e3){_0x22fb27[_0x44fdfb(0x330)](_0xefbbf3,_0x328057);}_0x4a2e18[_0x44fdfb(0x383)]()&&_0x20e4ab[_0x44fdfb(0x257)][_0x44fdfb(0x222)]();}else{const _0xd389b0=_0x3083da['x']+Math[_0x44fdfb(0x377)]((_0x3083da[_0x44fdfb(0x333)]-_0x157ffa)/0x2);this[_0x44fdfb(0x3d3)](_0x1c8401,_0xd389b0,_0x3083da['y'],_0x157ffa);}}else{if(_0x44fdfb(0x396)==='vbOim')this[_0x44fdfb(0x3d3)](_0x1c8401,_0x3083da['x'],_0x3083da['y'],_0x157ffa);else return'left';}}},Window_QuestCommand[_0x15094e(0x236)][_0x15094e(0x2f7)]=function(_0x1927a8){const _0x49c663=_0x15094e;this['commandName'](_0x1927a8)[_0x49c663(0x21c)](/\\I\[(\d+)\]/i);const _0x67f6b8=Number(RegExp['$1'])||0x0,_0x1c181a=this[_0x49c663(0x299)](_0x1927a8),_0x392ad9=_0x1c181a['x']+Math['floor']((_0x1c181a[_0x49c663(0x333)]-ImageManager['iconWidth'])/0x2),_0x3567e1=_0x1c181a['y']+(_0x1c181a[_0x49c663(0x39d)]-ImageManager[_0x49c663(0x38c)])/0x2;this[_0x49c663(0x30f)](_0x67f6b8,_0x392ad9,_0x3567e1);},Window_QuestCommand['prototype'][_0x15094e(0x2c3)]=function(_0x15fb18){const _0x390d21=_0x15094e;this[_0x390d21(0x2de)]=_0x15fb18,this['callUpdateHelp']();};function Window_QuestList(){const _0x83f5bb=_0x15094e;this[_0x83f5bb(0x259)](...arguments);}Window_QuestList[_0x15094e(0x30b)]=VisuMZ[_0x15094e(0x3dd)]['Settings']['Categories'],Window_QuestList[_0x15094e(0x236)]=Object['create'](Window_Command[_0x15094e(0x236)]),Window_QuestList['prototype']['constructor']=Window_QuestList,Window_QuestList[_0x15094e(0x236)][_0x15094e(0x259)]=function(_0x4d67ff){const _0x123434=_0x15094e;this['initCategories'](),Window_Command[_0x123434(0x236)][_0x123434(0x259)][_0x123434(0x305)](this,_0x4d67ff),this[_0x123434(0x334)](_0x4d67ff),this['deactivate'](),this[_0x123434(0x208)]();},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x3fc)]=function(){const _0x196576=_0x15094e;this[_0x196576(0x309)]={};for(const _0x298b7c of VisuMZ[_0x196576(0x3dd)][_0x196576(0x2d4)][_0x196576(0x3e4)]){if(_0x196576(0x34f)!=='esPfF'){if(this[_0x196576(0x3f9)]===_0x222e71)return;this[_0x196576(0x3f9)]=_0x1927a2,this[_0x196576(0x319)]();}else this[_0x196576(0x309)][_0x298b7c[_0x196576(0x2cd)]]=!![];}this[_0x196576(0x3f9)]=_0x196576(0x31d);},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x2ba)]=function(_0xbd8abe){const _0x3b5e3d=_0x15094e;if(this[_0x3b5e3d(0x3f9)]===_0xbd8abe)return;this[_0x3b5e3d(0x3f9)]=_0xbd8abe,this[_0x3b5e3d(0x319)]();},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x238)]=function(){const _0x9928f6=_0x15094e,_0x5487fc=this[_0x9928f6(0x3f5)]();this[_0x9928f6(0x309)][_0x5487fc[_0x9928f6(0x2cd)]]=!this[_0x9928f6(0x309)][_0x5487fc[_0x9928f6(0x2cd)]],this['refresh'](),this[_0x9928f6(0x25f)]();},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x265)]=function(){const _0x220446=_0x15094e,_0x2234d7=this[_0x220446(0x3f5)]();return _0x2234d7&&this[_0x220446(0x309)][_0x2234d7[_0x220446(0x2cd)]];},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x334)]=function(_0x200b76){const _0x37a3af=_0x15094e,_0x119c02=new Rectangle(0x0,0x0,_0x200b76[_0x37a3af(0x333)],_0x200b76[_0x37a3af(0x39d)]);this[_0x37a3af(0x21e)]=new Window_Base(_0x119c02),this[_0x37a3af(0x21e)][_0x37a3af(0x245)]=0x0,this[_0x37a3af(0x37c)](this[_0x37a3af(0x21e)]),this[_0x37a3af(0x293)]();},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x25f)]=function(){const _0x3107fc=_0x15094e;Window_Command[_0x3107fc(0x236)][_0x3107fc(0x25f)][_0x3107fc(0x305)](this);if(this[_0x3107fc(0x21e)])this[_0x3107fc(0x293)]();if(this[_0x3107fc(0x349)])this[_0x3107fc(0x1f7)]();if(this['_logWindow'])this[_0x3107fc(0x379)]();},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x293)]=function(){const _0x2484e1=_0x15094e,_0x510ea0=this['_commandNameWindow'];_0x510ea0['contents'][_0x2484e1(0x376)]();const _0x293682=this[_0x2484e1(0x26e)](this['index']());if(_0x293682===_0x2484e1(0x209)){if('dtcwg'!==_0x2484e1(0x39e))this['drawTextEx'](_0x24ddae,_0x4130a4['x']+_0x245207[_0x2484e1(0x333)]-_0x306a6c,_0x33fc2b['y'],_0x2b8319);else{const _0x55050e=this['itemLineRect'](this['index']());let _0x19d1b6=this[_0x2484e1(0x3b6)](this[_0x2484e1(0x3a0)]());_0x19d1b6=_0x19d1b6[_0x2484e1(0x33c)](/\\I\[(\d+)\]/gi,''),_0x510ea0['resetFontSettings'](),this[_0x2484e1(0x2e5)](_0x19d1b6,_0x55050e),this[_0x2484e1(0x2b6)](_0x19d1b6,_0x55050e),this['commandNameWindowCenter'](_0x19d1b6,_0x55050e);}}},Window_QuestList['prototype'][_0x15094e(0x2e5)]=function(_0xd1f9f7,_0x1b9e30){},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x2b6)]=function(_0x3fb473,_0x24631c){const _0x1faaef=_0x15094e,_0x477d9a=this['_commandNameWindow'];_0x477d9a[_0x1faaef(0x214)](_0x3fb473,0x0,_0x24631c['y'],_0x477d9a['innerWidth'],_0x1faaef(0x262));},Window_QuestList['prototype'][_0x15094e(0x231)]=function(_0x1e3315,_0x1b9cf5){const _0x420c59=_0x15094e,_0x2ca651=this['_commandNameWindow'],_0x2ad950=$gameSystem[_0x420c59(0x219)](),_0x319f01=_0x1b9cf5['x']+Math[_0x420c59(0x377)](_0x1b9cf5[_0x420c59(0x333)]/0x2)+_0x2ad950;_0x2ca651['x']=_0x2ca651[_0x420c59(0x333)]/-0x2+_0x319f01,_0x2ca651['y']=Math[_0x420c59(0x377)](_0x1b9cf5['height']/0x2);},Window_QuestList['prototype'][_0x15094e(0x2af)]=function(){const _0x6c516e=_0x15094e;for(const _0x36b945 of Window_QuestList[_0x6c516e(0x30b)]){if(_0x6c516e(0x39b)==='Rxtyt'){if(!_0x36b945)continue;if(!this[_0x6c516e(0x1fd)](_0x36b945))continue;this[_0x6c516e(0x3d5)](_0x36b945),this['makeQuestList'](_0x36b945);}else _0x3a1aa8[_0x6c516e(0x330)](_0x520db0,_0x1c839a);}this[_0x6c516e(0x34e)]['length']<=0x0&&this[_0x6c516e(0x2fe)]();},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x2fe)]=function(){const _0x53e04a=_0x15094e;this['addCommand'](TextManager[_0x53e04a(0x212)],_0x53e04a(0x38a),![]);},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x1fd)]=function(_0x4d6a10){const _0x1d4ffb=_0x15094e;for(const _0x4ad749 of _0x4d6a10[_0x1d4ffb(0x30e)]){if(!_0x4ad749)continue;switch(this[_0x1d4ffb(0x3f9)]){case _0x1d4ffb(0x31d):if($gameSystem[_0x1d4ffb(0x3c0)](_0x4ad749['Key']))return!![];break;case _0x1d4ffb(0x3ef):if($gameSystem[_0x1d4ffb(0x25c)](_0x4ad749[_0x1d4ffb(0x204)]))return!![];break;case _0x1d4ffb(0x2cb):if($gameSystem[_0x1d4ffb(0x216)](_0x4ad749[_0x1d4ffb(0x204)]))return!![];break;}}return![];},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x3d5)]=function(_0x543938){const _0x6bc7b0=_0x15094e,_0x333007=this['isCategoryOpen'](_0x543938)?TextManager[_0x6bc7b0(0x3d6)]:TextManager[_0x6bc7b0(0x1ff)],_0x2c56aa=this['getTotalCategoryQuests'](_0x543938)[_0x6bc7b0(0x2b9)],_0x5e7b78=_0x333007['format'](_0x543938[_0x6bc7b0(0x2cd)],_0x2c56aa);this[_0x6bc7b0(0x3bf)](_0x5e7b78,_0x6bc7b0(0x22f),!![],_0x543938);},Window_QuestList['prototype'][_0x15094e(0x2f6)]=function(_0xfe6df4){const _0x38742e=_0x15094e;switch(this[_0x38742e(0x3f9)]){case'known':return $gameSystem[_0x38742e(0x3bc)]()['filter'](_0x5d0915=>_0x5d0915[_0x38742e(0x22f)]===_0xfe6df4);break;case'completed':return $gameSystem[_0x38742e(0x325)]()[_0x38742e(0x1f4)](_0x28bbd5=>_0x28bbd5[_0x38742e(0x22f)]===_0xfe6df4);break;case'failed':return $gameSystem[_0x38742e(0x35f)]()['filter'](_0x660324=>_0x660324[_0x38742e(0x22f)]===_0xfe6df4);break;}return[];},Window_QuestList['prototype'][_0x15094e(0x307)]=function(_0x104bdc){const _0x569f9e=_0x15094e;if(!this[_0x569f9e(0x362)](_0x104bdc))return;for(const _0x119402 of _0x104bdc[_0x569f9e(0x30e)]){if(!_0x119402)continue;switch(this[_0x569f9e(0x3f9)]){case _0x569f9e(0x31d):if($gameSystem[_0x569f9e(0x3c0)](_0x119402['Key']))this[_0x569f9e(0x22d)](_0x119402);break;case _0x569f9e(0x3ef):if($gameSystem[_0x569f9e(0x25c)](_0x119402[_0x569f9e(0x204)]))this['addQuestCommand'](_0x119402);break;case'failed':if($gameSystem[_0x569f9e(0x216)](_0x119402['Key']))this[_0x569f9e(0x22d)](_0x119402);break;}}},Window_QuestList['prototype']['isCategoryOpen']=function(_0x4ba610){const _0x5ee52b=_0x15094e;return this[_0x5ee52b(0x309)][_0x4ba610[_0x5ee52b(0x2cd)]];},Window_QuestList[_0x15094e(0x236)]['addQuestCommand']=function(_0x2084b9){const _0x3134be=_0x15094e;let _0x349832=_0x2084b9[_0x3134be(0x27e)];_0x2084b9===$gameSystem[_0x3134be(0x24c)]()&&(_0x349832=TextManager[_0x3134be(0x2c9)][_0x3134be(0x235)](_0x349832)),this['addCommand'](_0x349832,'quest',!![],_0x2084b9);},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x347)]=function(){const _0x2f5e63=_0x15094e;return _0x2f5e63(0x2d8);},Window_QuestList['prototype'][_0x15094e(0x3ab)]=function(_0x5d78f8){const _0x596a09=_0x15094e,_0xcb02cb=this[_0x596a09(0x26e)](_0x5d78f8);if(_0xcb02cb===_0x596a09(0x3b2))_0x596a09(0x273)===_0x596a09(0x273)?this[_0x596a09(0x38b)](_0x5d78f8):_0x2d9478=_0x4a34f8[_0x596a09(0x2c8)](_0x563a90,_0x36b728);else _0xcb02cb==='icon'?this[_0x596a09(0x2f7)](_0x5d78f8):Window_HorzCommand[_0x596a09(0x236)][_0x596a09(0x3ab)][_0x596a09(0x305)](this,_0x5d78f8);},Window_QuestList[_0x15094e(0x236)]['commandStyle']=function(){const _0x51b155=_0x15094e;return _0x51b155(0x3b2);},Window_QuestList[_0x15094e(0x236)]['commandStyleCheck']=function(_0x37ed5c){const _0x4644c9=_0x15094e;if(_0x37ed5c<0x0)return _0x4644c9(0x32d);const _0x50ecc4=this[_0x4644c9(0x3eb)]();if(_0x50ecc4!==_0x4644c9(0x292)){if(_0x4644c9(0x290)==='PlKfo')return _0x50ecc4;else{if(_0x52a7db[_0x4644c9(0x3dd)][_0x4644c9(0x2d4)][_0x4644c9(0x200)]['AddShowOption'])_0x3d328e++;if(_0x4e4063[_0x4644c9(0x3dd)][_0x4644c9(0x2d4)][_0x4644c9(0x200)][_0x4644c9(0x3ee)])_0x545cbc++;}}else{if(this[_0x4644c9(0x1fc)]()>0x0){const _0x189ea5=this[_0x4644c9(0x3b6)](_0x37ed5c);if(_0x189ea5['match'](/\\I\[(\d+)\]/i)){const _0x24c6c9=this['itemLineRect'](_0x37ed5c),_0x4dd59c=this[_0x4644c9(0x29a)](_0x189ea5)[_0x4644c9(0x333)];if(_0x4dd59c<=_0x24c6c9['width']){if(_0x4644c9(0x207)!==_0x4644c9(0x207)){_0x5a9419=_0xcf7f4[_0x4644c9(0x249)]()[_0x4644c9(0x24d)]();const _0xb14991=_0x5c5218['quest'](_0x3ecf3e);if(!_0xb14991)return-0x1;_0x164e73[_0x4644c9(0x372)](_0x2301d7);const _0xed5891=_0x3b4480[_0x4644c9(0x237)]()[_0x4644c9(0x324)];return _0xed5891[_0x328758]||0x0;}else return'iconText';}else{if(_0x4644c9(0x344)===_0x4644c9(0x344))return _0x4644c9(0x209);else{if(this[_0x4644c9(0x2de)][_0x4644c9(0x363)]())return this[_0x4644c9(0x2de)][_0x4644c9(0x28a)]()?_0x2ef0bd[_0x4644c9(0x368)]:'';else return this[_0x4644c9(0x2de)][_0x4644c9(0x265)]()?_0x2cb639[_0x4644c9(0x3af)]:_0x45d406[_0x4644c9(0x3bb)];}}}}}return _0x4644c9(0x32d);},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x38b)]=function(_0x24e87c){const _0xb60ac6=_0x15094e,_0x2fe175=this[_0xb60ac6(0x299)](_0x24e87c),_0x3c2229=this[_0xb60ac6(0x3b6)](_0x24e87c),_0x2e9d84=this[_0xb60ac6(0x29a)](_0x3c2229)[_0xb60ac6(0x333)];this[_0xb60ac6(0x226)](this[_0xb60ac6(0x2fb)](_0x24e87c));const _0x5e8fc7=this[_0xb60ac6(0x347)]();if(_0x5e8fc7==='right')this[_0xb60ac6(0x3d3)](_0x3c2229,_0x2fe175['x']+_0x2fe175[_0xb60ac6(0x333)]-_0x2e9d84,_0x2fe175['y'],_0x2e9d84);else{if(_0x5e8fc7===_0xb60ac6(0x262)){if(_0xb60ac6(0x20e)!==_0xb60ac6(0x20e))_0x339031[_0xb60ac6(0x1f5)](_0x4acdb4,_0x24f6d6),_0x35d2c6[_0xb60ac6(0x22c)](_0x33227b[_0xb60ac6(0x350)]),_0x47c4ae[_0xb60ac6(0x383)]()&&_0x202917[_0xb60ac6(0x257)]['refreshQuestTrackerWindow']();else{const _0x548000=_0x2fe175['x']+Math[_0xb60ac6(0x377)]((_0x2fe175[_0xb60ac6(0x333)]-_0x2e9d84)/0x2);this[_0xb60ac6(0x3d3)](_0x3c2229,_0x548000,_0x2fe175['y'],_0x2e9d84);}}else _0xb60ac6(0x29b)===_0xb60ac6(0x29b)?this['drawTextEx'](_0x3c2229,_0x2fe175['x'],_0x2fe175['y'],_0x2e9d84):this[_0xb60ac6(0x2be)]+=this[_0xb60ac6(0x2ad)]()*0x4;}},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x2f7)]=function(_0x430687){const _0x2991cd=_0x15094e;this[_0x2991cd(0x3b6)](_0x430687)[_0x2991cd(0x21c)](/\\I\[(\d+)\]/i);const _0x50ba5d=Number(RegExp['$1'])||0x0,_0x4fca7b=this[_0x2991cd(0x299)](_0x430687),_0x4d5648=_0x4fca7b['x']+Math['floor']((_0x4fca7b[_0x2991cd(0x333)]-ImageManager['iconWidth'])/0x2),_0x4e6b7e=_0x4fca7b['y']+(_0x4fca7b[_0x2991cd(0x39d)]-ImageManager[_0x2991cd(0x38c)])/0x2;this[_0x2991cd(0x30f)](_0x50ba5d,_0x4d5648,_0x4e6b7e);},Window_QuestList['prototype']['currentCategory']=function(){const _0x1a462e=_0x15094e;return this[_0x1a462e(0x384)]()===_0x1a462e(0x22f)?this[_0x1a462e(0x287)]():null;},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x363)]=function(){const _0x32485f=_0x15094e;return this[_0x32485f(0x384)]()===_0x32485f(0x36d)?this['currentExt']():null;},Window_QuestList['prototype'][_0x15094e(0x3a2)]=function(_0x47e42d){const _0x2c1ed0=_0x15094e;this[_0x2c1ed0(0x349)]=_0x47e42d,this['callUpdateHelp']();},Window_QuestList['prototype']['updateLabelWindow']=function(){const _0x318602=_0x15094e,_0x3ac0de=this[_0x318602(0x363)](),_0x1cf401=this[_0x318602(0x349)];_0x1cf401[_0x318602(0x3b8)]['clear']();const _0x4c3a13=_0x3ac0de?_0x3ac0de['Title']:TextManager[_0x318602(0x20a)],_0x54adc1=_0x1cf401['textSizeEx'](_0x4c3a13)['width'],_0x15e450=_0x1cf401['itemPadding']()+Math[_0x318602(0x315)]((_0x1cf401[_0x318602(0x267)]-_0x54adc1)/0x2);_0x1cf401[_0x318602(0x3d3)](_0x4c3a13,_0x15e450,0x0,_0x1cf401[_0x318602(0x267)]);},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x23e)]=function(_0x3b68b1){const _0xebaf65=_0x15094e;this[_0xebaf65(0x228)]=_0x3b68b1,this['callUpdateHelp']();},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x379)]=function(){const _0x5b7637=_0x15094e,_0x30bba2=this['currentQuest'](),_0x2a1931=this[_0x5b7637(0x228)];_0x2a1931[_0x5b7637(0x246)](_0x30bba2);},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x2a0)]=function(){},Window_QuestList[_0x15094e(0x236)][_0x15094e(0x393)]=function(){},Window_QuestList[_0x15094e(0x236)]['isOkEnabled']=function(){const _0xcf60a6=_0x15094e;if(this['currentQuest']())return this[_0xcf60a6(0x3f9)]===_0xcf60a6(0x31d);else{if(_0xcf60a6(0x35c)!==_0xcf60a6(0x2d2))return Window_Command[_0xcf60a6(0x236)][_0xcf60a6(0x28a)][_0xcf60a6(0x305)](this);else this['_textHeight']+=this['lineHeight'](),_0x67a68f[_0xcf60a6(0x314)]&&(this['_textHeight']+=this[_0xcf60a6(0x2ad)]()*0x4);}};function Window_QuestLog(){const _0x1fd001=_0x15094e;this[_0x1fd001(0x259)](...arguments);}function _0x21c3(){const _0x58c320=['questsCompleted','applyInverse','scale','CCjfc','ShowFailed','NFKii','ydndk','Game_System_initialize','text','KtdFZ','applyWordWrap','setQuestStatus','createQuestSubtext','questObjectiveClearedFmt','width','createCommandNameWindow','update','contentsOpacity','inBattle','Location','EmptyTitleLabel','_isRefreshingQuestTrackerWindow','_scrollBaseY','replace','\x0a\x5c{[[Title]]\x5c}\x0a[[Objectives]]\x0a','Game_Battler_useItem','AIpWj','Description','CompassFadeSpeed','ListWindowTrackedQuest','popScene','QrroE','addNewState','getBackgroundOpacity','itemTextAlign','_scrollY','_labelWindow','LineBreakSpace','questCommandName','SystemEnableQuestMenu','_doodadEditorMode','_list','esPfF','Show','overallHeight','TrackerWindow_Scale','quotes','LogWindow_Rect','buttonAssistText4','processWheelScroll','ExivQ','Window_Options_addGeneralOptions','questTrackerFmt','NUM','useItem','JiwGF','_hasDiedBefore','HiIZT','questsFailed','\x5cI[%1]%2','NfmQF','isCategoryOpen','currentQuest','subtext','onListQuest','QuestDescription','createQuestLogWindow','questButtonAssistActive','VisuMZ_1_MainMenuCore','miNwF','clamp','249208NOaQot','quest','ListWindow_BgType','ARRAYSTR','createCommandWindow','questObjectiveNormalFmt','questDescription','ConfigManager_applyData','commandWindowRect','makeData','clear','floor','removed','updateLogWindow','gainItem','questLogFmt','addChild','CommandWindow_Failed_Icon','applyWordWrapEntry','innerRect','setQuestRewards','smoothScrollUp','createQuestTrackerWindow','isSceneMap','currentSymbol','helpAreaHeight','QGoaw','EVAL','TargetID','_scrollX','cancel','drawItemStyleIconText','iconHeight','EYSsL','addGeneralOptions','KAdzF','ARRAYNUM','ListWindow_Rect','parameters','cursorPageup','GufAZ','MainMenu','vbOim','STRUCT','Game_Map_requestRefresh','note','setQuestQuote','Rxtyt','value','height','dtcwg','updateVisibility','index','objectivesFailed','setLabelWindow','_tradeItemWithParty','zoomScale','name','loadTitle2','tileHeight','TrackerShowHide','<WORDWRAP>%1','_backSprite2','drawItem','createCustomBackgroundImages','isQuestCommandVisible','rewardsClaimed','questButtonAssistCollapse','VisuMZ_1_MessageCore','Zeucn','iconText','180313UwrLum','LMEuZ','isKnownQuestsEnabled','commandName','396899mGeToa','contents','questSubtext','_quests','questButtonAssistExpand','questsKnown','maxCommands','AdjustRect','addCommand','isQuestKnown','rnhWw','BgFilename2','setTrackedQuest','MessageCore','addFailedQuestsCommand','questButtonAssistPageUpDn','TrackedQuest','isquestMenuShown','drawAllText','questEmptyText','isCompletedQuestsEnabled','LogWindow_Auto_WordWrap','bitmap','isFailedQuestsEnabled','getConfigValue','questRewardsDeniedFmt','Scene_Options_maxCommands','questJournalSystemUseItem','drawTextEx','VisibleObjectives','addCategoryCommand','questCategoryOpenedFmt','addWindow','createBackground','QuestQuote','questCompletedCmd','SystemCallSceneQuest','questKnownCmd','QuestSystem','origin','QuestOrder','isFailedQuestsVisible','questRewards','setQuestObjectives','ZnJdC','Categories','EnableMainMenu','makeDeepCopy','QuestSubtext','Scene_Map_createSpriteset','Rewards','join','commandStyle','FailedQuests','questCompletedIcon','AddPositionOption','completed','isActor','qDPrS','isRightInputMode','Subtext','questFailedCmd','currentCategory','isSceneChanging','Quotes','version','_categoryFilter','LogEmpty','enabled','initCategories','bind','CommandWindow_Completed_Text','_questTrackerRefresh','createSpriteset','questObjectives','Scene_Boot_onDatabaseLoaded','TrackerChangeQuest','QuestSet','questListWindowRect','Window_MenuCommand_addOriginalCommands','filter','ConvertParams','CommandWindow_Known_Text','updateLabelWindow','screenX','isDead','Window','createQuestDescription','maxItems','doesCategoryHaveQuestsAvailable','VQjDw','questCategoryClosedFmt','Tracker','addQuestCommandAutomatically','mVFmE','constructor','Key','numItems','process_VisuMZ_QuestSystem_Data','CeTAr','deselect','icon','noQuestsLabel','ShowName','questLabelWindowRect','questTrackerPosOff','EyWny','_backSprite1','calculateTextHeight','commandQuest','noQuestsListed','OnLoadQuestJS','drawText','create','isQuestFailed','pzSDb','unshift','windowPadding','Difficulty','push','match','includes','_commandNameWindow','addLoadListener','objectivesCompleted','scrollBlockHeight','refreshQuestTrackerWindow','contentsHeight','createQuestLabelWindow','fail','changePaintOpacity','registerCommand','_logWindow','PositionOn','createContents','74436lTGmVd','setQuestTrackerVisible','addQuestCommand','oqjES','category','311730YtYYNT','commandNameWindowCenter','status','603ejtMXU','visibilityLevel','format','prototype','questData','openCloseCurrentCategory','tAdeB','questTrackerWindow','JSON','Objectives','finalizeWordWrapSupport','setLogWindow','Objective_Completed_Fmt','ConfigManager_makeData','createEmptyText','Window_Options_statusText','_questTrackerWindow','Game_Map_refresh','opacity','setQuest','questLogWindowRect','onCommandOk','toUpperCase','requestRefresh','Reward_Normal_Fmt','trackedQuest','trim','questObjectivesCompleted','VisibleRewards','applyData','screenY','rewards','adjustSprite','scrollBlockWidth','isquestMenuEnabled','uiInputPosition','_scene','Status','initialize','General','_quest','isQuestCompleted','ENNEk','boxWidth','callUpdateHelp','pagedown','setQuestForQuestTrackerWindow','center','sort','setQuestDescription','isCurrentCategoryOpen','gQEir','innerWidth','showTracker','Scene_Menu_createCommandWindow','questTrackerShow','claim','_delayDraw','oqbRj','commandStyleCheck','RdFMH','54JDlSBL','rewardsDenied','ButtonAssistCollapse','OArem','smoothSelect','WordWrap','6DdqWFu','Reward_Failed_Fmt','remove','mainCommandWidth','setValue','questRewardsClaimed','contains','shown','Title','xgdOi','TrackerWindow_Rect','ARRAYEVAL','activate','questJournalSystemAddDeath','getQuestLogFmt','ShowMainMenu','Keys','currentExt','Enable','14126940jjEYwe','isOkEnabled','questJournalSystemGainItem','map','BgSettings','tradeItemWithParty','MPkuN','PlKfo','scrollSpeed','auto','updateCommandNameWindow','isTransferring','activeBgType','updatePageUpDownScroll','_messageWindow','getEmptyLogFmt','itemLineRect','textSizeEx','vWUDD','TgGOv','totalCommands','onDatabaseLoaded','addQuestSystemquestTrackerPositionCommand','cursorPagedown','PPRTa','parse','objectives','worldTransform','TtwRt','<BR>','ZrVVR','convertLineBreaksForWordWrap','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','QuestLabel_Rect','addKnownQuestsCommand','Reward_Completed_Fmt','lineHeight','exit','makeCommandList','right','createQuestListWindow','questTrackerPosOn','statusText','setHandler','questKnownIcon','commandNameWindowDrawText','oeaui','isPressed','length','setCategoryFilter','CLOSE_MINIMUM_OPACITY','From','DUXQZ','_textHeight','ListWindowCategoryCloseFmt','setQuestSubtext','BgFilename1','isQuestCommandEnabled','setListWindow','Game_Party_gainItem','createQuestQuote','CommandWindow_Failed_Text','rPipF','max','questTrackedQuestFmt','TrackerRefreshWindow','failed','questFailedIcon','CategoryName','scaleSprite','Objective_Normal_Fmt','ButtonAssistPageUpDown','addCompletedQuestsCommand','frfLn','STR','Settings','setBackgroundType','defaultQuestTrackerFmt','Game_Actor_tradeItemWithParty','left','ONoDo','setBackgroundOpacity','questQuote','_scrollBaseX','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_listWindow','9144lyHTyy','deny','tracked','updateScrollBase','ARRAYFUNC','deathStateId','commandNameWindowDrawBackground','concat','smoothScrollDown','baiOV','CommandWindow_Completed_Icon','YpkER','ButtonAssistExpand','QuestLabel_BgType','show','Game_BattlerBase_addNewState','complete','initQuestSystem','QuestData','CLOSE_FADE_SPEED','isQuestTrackerVisible','return\x200','CommandWindow_Rect','getTotalCategoryQuests','drawItemStyleIcon','openness','noMessageCoreRemoveEscapeCodes','updateDelayRefresh','isCommandEnabled','dsBPK','updateOpacity','addNoQuestsListedCommand','createQuestText','questTrackerPosition','CmdTextAlign','questObjectiveFailedFmt','BdYzn','CompletedQuests','call','addQuestSystemquestTrackerShowCommand','makeQuestList','isAlive','_categoryStatus','isCloseToQuestTrackerScreenPosition','categoryList','TargetIDs','createQuestRewards','Quests','drawIcon','addQuestSystemCommands','joinQuestEntries','questRewardsClaimedFmt','ListWindowCategoryOpenFmt','wordWrapSupport','round','onListCancel','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','addOriginalCommands','refresh','onListCategory','questRewardsNormalFmt','xKwsd','known','_commandWindow','FUNC','Hofpp','enemy','AddShowOption','claimed','description'];_0x21c3=function(){return _0x58c320;};return _0x21c3();}Window_QuestLog[_0x15094e(0x314)]=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)]['Window'][_0x15094e(0x3cc)],Window_QuestLog[_0x15094e(0x291)]=VisuMZ['QuestSystem'][_0x15094e(0x2d4)]['Window']['LogWindow_ScrollSpeed'],Window_QuestLog[_0x15094e(0x236)]=Object[_0x15094e(0x215)](Window_Scrollable[_0x15094e(0x236)]),Window_QuestLog['prototype'][_0x15094e(0x203)]=Window_QuestLog,Window_QuestLog[_0x15094e(0x26c)]=0x19,Window_QuestLog[_0x15094e(0x236)][_0x15094e(0x259)]=function(_0x408b92){const _0x4ed187=_0x15094e;this[_0x4ed187(0x2be)]=0x0,this[_0x4ed187(0x26c)]=0x0,Window_Scrollable['prototype'][_0x4ed187(0x259)]['call'](this,_0x408b92),this['_quest']=null,this[_0x4ed187(0x319)]();},Window_QuestLog[_0x15094e(0x236)][_0x15094e(0x223)]=function(){const _0x5aa608=_0x15094e;return Math['max'](this[_0x5aa608(0x2be)],0x1);},Window_QuestLog[_0x15094e(0x236)][_0x15094e(0x351)]=function(){const _0x3a610a=_0x15094e;return this[_0x3a610a(0x223)]();},Window_QuestLog[_0x15094e(0x236)]['update']=function(){const _0x2773fc=_0x15094e;Window_Scrollable[_0x2773fc(0x236)]['update'][_0x2773fc(0x305)](this),this[_0x2773fc(0x2fa)]();},Window_QuestLog[_0x15094e(0x236)][_0x15094e(0x2fa)]=function(){if(this['_delayDraw']--===0x0)this['refresh']();},Window_QuestLog[_0x15094e(0x236)]['updateOrigin']=function(){const _0x180064=_0x15094e,_0x12064e=this[_0x180064(0x254)]()||0x1,_0x4d4769=this[_0x180064(0x221)]()||0x1,_0x29ffe3=this['_scrollX']-this['_scrollX']%_0x12064e,_0x3b63a8=this[_0x180064(0x348)]-this['_scrollY']%_0x4d4769;(_0x29ffe3!==this[_0x180064(0x2dc)]||_0x3b63a8!==this[_0x180064(0x33b)])&&(this[_0x180064(0x2e2)](_0x29ffe3,_0x3b63a8),this['paint']()),this[_0x180064(0x3de)]['x']=this[_0x180064(0x389)],this[_0x180064(0x3de)]['y']=this[_0x180064(0x348)];},Window_QuestLog[_0x15094e(0x236)][_0x15094e(0x356)]=function(){const _0x33cfcd=_0x15094e;Window_Scrollable['prototype'][_0x33cfcd(0x356)]['call'](this),this[_0x33cfcd(0x296)]();},Window_QuestLog['prototype'][_0x15094e(0x296)]=function(){const _0x1882ca=_0x15094e;Input['isPressed'](_0x1882ca(0x260))&&(_0x1882ca(0x3e3)!==_0x1882ca(0x3e3)?(this[_0x1882ca(0x228)]=_0x37f9ff,this[_0x1882ca(0x25f)]()):this[_0x1882ca(0x2e7)](Window_QuestLog[_0x1882ca(0x291)])),Input[_0x1882ca(0x2b8)]('pageup')&&this[_0x1882ca(0x381)](Window_QuestLog['scrollSpeed']);},Window_QuestLog[_0x15094e(0x236)][_0x15094e(0x246)]=function(_0x2243b7){const _0x396ef5=_0x15094e;if(this[_0x396ef5(0x25b)]===_0x2243b7)return;this[_0x396ef5(0x25b)]=_0x2243b7,this[_0x396ef5(0x26c)]=Window_QuestLog[_0x396ef5(0x26c)];},Window_QuestLog['prototype']['refresh']=function(){const _0x544db2=_0x15094e;this['contents'][_0x544db2(0x376)](),this[_0x544db2(0x210)](),this['createContents'](),this[_0x544db2(0x3c9)]();},Window_QuestLog[_0x15094e(0x236)][_0x15094e(0x210)]=function(){const _0x4f75db=_0x15094e;if(![]){if(_0x4f75db(0x3c1)==='OkHdq')_0x1cf19b[_0x4f75db(0x3dd)][_0x4f75db(0x33e)][_0x4f75db(0x305)](this,_0x55ffc0),this[_0x4f75db(0x3d2)](_0x25f197);else{const _0x561a04=this['baseTextRect'](),_0x4f65f7=this[_0x4f75db(0x25b)]?this[_0x4f75db(0x2ff)]():this['createEmptyText'](),_0x53c107=this[_0x4f75db(0x29a)](_0x4f65f7[_0x4f75db(0x24d)]());this[_0x4f75db(0x2be)]=_0x53c107['height'],this['constructor']===Window_QuestLog&&(this[_0x4f75db(0x2be)]+=this['lineHeight'](),Window_QuestLog[_0x4f75db(0x314)]&&(_0x4f75db(0x1fe)===_0x4f75db(0x1fe)?this[_0x4f75db(0x2be)]+=this['lineHeight']()*0x4:this[_0x4f75db(0x259)](...arguments)));}}const _0x5dec32=this[_0x4f75db(0x25b)]?this['createQuestText']():this[_0x4f75db(0x241)]();this[_0x4f75db(0x2be)]=this[_0x4f75db(0x29a)](_0x5dec32[_0x4f75db(0x24d)]())[_0x4f75db(0x39d)];},Window_QuestLog[_0x15094e(0x236)]['drawAllText']=function(){const _0x534269=_0x15094e,_0x166dfd=this['_quest']?this[_0x534269(0x2ff)]():this['createEmptyText']();this[_0x534269(0x3d3)](_0x166dfd,0x0,0x0,this['innerWidth']),this[_0x534269(0x348)]=0x0,this[_0x534269(0x3de)]['y']=0x0;},Window_QuestLog['prototype'][_0x15094e(0x241)]=function(){const _0x2c543c=_0x15094e;VisuMZ[_0x2c543c(0x3dd)][_0x2c543c(0x2d4)][_0x2c543c(0x25a)][_0x2c543c(0x213)]();let _0x243ead=this[_0x2c543c(0x298)]();return _0x243ead=VisuMZ[_0x2c543c(0x3dd)]['applyWordWrap'](_0x243ead),_0x243ead=VisuMZ[_0x2c543c(0x3dd)][_0x2c543c(0x23d)](_0x243ead),_0x243ead;},Window_QuestLog[_0x15094e(0x236)][_0x15094e(0x298)]=function(){const _0xd2e273=_0x15094e;return TextManager[_0xd2e273(0x3ca)];},Window_QuestLog[_0x15094e(0x236)][_0x15094e(0x2ff)]=function(){const _0x2611a0=_0x15094e,_0x2cc778=this[_0x2611a0(0x25b)],_0x3e247b=_0x2cc778[_0x2611a0(0x204)][_0x2611a0(0x249)]()[_0x2611a0(0x24d)]();if(_0x2cc778[_0x2611a0(0x213)])_0x2cc778[_0x2611a0(0x213)][_0x2611a0(0x305)](this);let _0x5d03df=this[_0x2611a0(0x284)]();return _0x5d03df=VisuMZ[_0x2611a0(0x3dd)][_0x2611a0(0x2a8)](_0x5d03df),_0x5d03df=_0x5d03df['replace'](/\[\[RAWTITLE\]\]/gi,_0x2cc778[_0x2611a0(0x27e)]),_0x5d03df=_0x5d03df[_0x2611a0(0x33c)](/\[\[TITLE\]\]/gi,_0x2cc778['Title'][_0x2611a0(0x33c)](/\\I\[(\d+)\]/gi,'')['trim']()),_0x5d03df=_0x5d03df['replace'](/\[\[DIFFICULTY\]\]/gi,_0x2cc778[_0x2611a0(0x21a)][_0x2611a0(0x24d)]()),_0x5d03df=_0x5d03df[_0x2611a0(0x33c)](/\[\[FROM\]\]/gi,_0x2cc778[_0x2611a0(0x2bc)]['trim']()),_0x5d03df=_0x5d03df[_0x2611a0(0x33c)](/\[\[LOCATION\]\]/gi,_0x2cc778[_0x2611a0(0x338)]['trim']()),_0x5d03df=_0x5d03df['replace'](/\[\[DESCRIPTION\]\]/gi,this['createQuestDescription'](_0x3e247b)),_0x5d03df=_0x5d03df[_0x2611a0(0x33c)](/\[\[OBJECTIVES\]\]/gi,this['createQuestObjectives'](_0x2cc778,_0x3e247b)),_0x5d03df=_0x5d03df[_0x2611a0(0x33c)](/\[\[REWARDS\]\]/gi,this[_0x2611a0(0x30d)](_0x2cc778,_0x3e247b)),_0x5d03df=_0x5d03df['replace'](/\[\[SUBTEXT\]\]/gi,this[_0x2611a0(0x331)](_0x3e247b)),_0x5d03df=_0x5d03df['replace'](/\[\[QUOTE\]\]/gi,this[_0x2611a0(0x2c5)](_0x3e247b)),_0x5d03df=VisuMZ[_0x2611a0(0x3dd)]['finalizeWordWrapSupport'](_0x5d03df),_0x5d03df=VisuMZ[_0x2611a0(0x3dd)]['noMessageCoreRemoveEscapeCodes'](_0x5d03df),_0x5d03df[_0x2611a0(0x24d)]();},Window_QuestLog[_0x15094e(0x236)][_0x15094e(0x284)]=function(){const _0x3e4638=_0x15094e;return TextManager[_0x3e4638(0x37b)];},Window_QuestLog[_0x15094e(0x236)][_0x15094e(0x1fb)]=function(_0x4b0c68){const _0x167c2e=_0x15094e;let _0x53a0c6=$gameSystem[_0x167c2e(0x372)](_0x4b0c68);return _0x53a0c6=VisuMZ['QuestSystem'][_0x167c2e(0x23d)](_0x53a0c6),_0x53a0c6[_0x167c2e(0x24d)]();},Window_QuestLog[_0x15094e(0x236)]['createQuestObjectives']=function(_0x3bd871,_0x165a1b){const _0x35bdef=_0x15094e,_0x56a234=[],_0x509814=$gameSystem[_0x35bdef(0x401)](_0x165a1b),_0x6f71b7=$gameSystem[_0x35bdef(0x24e)](_0x165a1b),_0x211963=$gameSystem['questObjectivesFailed'](_0x165a1b),_0x4d3b71=_0x509814['concat'](_0x6f71b7)[_0x35bdef(0x2e6)](_0x211963)[_0x35bdef(0x263)]((_0x2b199e,_0xfae0fd)=>_0x2b199e-_0xfae0fd);for(const _0x1f8c0f of _0x4d3b71){if(!_0x3bd871[_0x35bdef(0x23c)][_0x1f8c0f])continue;const _0x14f702=_0x3bd871[_0x35bdef(0x23c)][_0x1f8c0f];let _0x56b31d=TextManager[_0x35bdef(0x371)];if(_0x6f71b7[_0x35bdef(0x21d)](_0x1f8c0f))_0x56b31d=TextManager[_0x35bdef(0x332)];if(_0x211963[_0x35bdef(0x21d)](_0x1f8c0f))_0x56b31d=TextManager[_0x35bdef(0x302)];_0x56a234['push'](VisuMZ[_0x35bdef(0x3dd)][_0x35bdef(0x37e)](_0x56b31d['format'](_0x14f702)[_0x35bdef(0x24d)]()));}let _0x5ddad7=VisuMZ[_0x35bdef(0x3dd)][_0x35bdef(0x311)](_0x56a234);return _0x5ddad7;},Window_QuestLog[_0x15094e(0x236)][_0x15094e(0x30d)]=function(_0x4a33e7,_0x3d97f3){const _0x498454=_0x15094e,_0x1471a0=[],_0x1bdb5a=$gameSystem[_0x498454(0x3e1)](_0x3d97f3),_0x299b25=$gameSystem[_0x498454(0x27b)](_0x3d97f3),_0xde8a6c=$gameSystem['questRewardsDenied'](_0x3d97f3),_0x22fb26=_0x1bdb5a['concat'](_0x299b25)[_0x498454(0x2e6)](_0xde8a6c)[_0x498454(0x263)]((_0x11fdcb,_0x105117)=>_0x11fdcb-_0x105117);for(const _0x1419ea of _0x22fb26){if(!_0x4a33e7['Rewards'][_0x1419ea])continue;const _0x2d105e=_0x4a33e7['Rewards'][_0x1419ea];let _0x59b55c=TextManager[_0x498454(0x31b)];if(_0x299b25[_0x498454(0x21d)](_0x1419ea))_0x59b55c=TextManager[_0x498454(0x312)];if(_0xde8a6c[_0x498454(0x21d)](_0x1419ea))_0x59b55c=TextManager[_0x498454(0x3d0)];_0x1471a0[_0x498454(0x21b)](VisuMZ['QuestSystem']['applyWordWrapEntry'](_0x59b55c['format'](_0x2d105e)[_0x498454(0x24d)]()));}let _0x605ec1=VisuMZ[_0x498454(0x3dd)][_0x498454(0x311)](_0x1471a0);return _0x605ec1;},Window_QuestLog[_0x15094e(0x236)][_0x15094e(0x331)]=function(_0x4b6701){const _0x4f4bf7=_0x15094e;let _0x1ab492=$gameSystem['questSubtext'](_0x4b6701);return _0x1ab492=VisuMZ[_0x4f4bf7(0x3dd)][_0x4f4bf7(0x23d)](_0x1ab492),_0x1ab492['trim']();},Window_QuestLog[_0x15094e(0x236)][_0x15094e(0x2c5)]=function(_0xff7aa4){const _0x1bc720=_0x15094e;let _0x1c1c0c=$gameSystem[_0x1bc720(0x2db)](_0xff7aa4);return _0x1c1c0c=VisuMZ['QuestSystem'][_0x1bc720(0x23d)](_0x1c1c0c),_0x1c1c0c[_0x1bc720(0x24d)]();};function Window_QuestTracker(){const _0x28f8b2=_0x15094e;this[_0x28f8b2(0x259)](...arguments);}Window_QuestTracker[_0x15094e(0x236)]=Object['create'](Window_QuestLog[_0x15094e(0x236)]),Window_QuestTracker[_0x15094e(0x236)][_0x15094e(0x203)]=Window_QuestTracker,Window_QuestTracker[_0x15094e(0x327)]=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)][_0x15094e(0x1fa)][_0x15094e(0x352)],Window_QuestTracker[_0x15094e(0x295)]=VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2d4)][_0x15094e(0x1fa)]['TrackerWindow_BgType'],Window_QuestTracker[_0x15094e(0x2bb)]=VisuMZ[_0x15094e(0x3dd)]['Settings'][_0x15094e(0x200)]['MinTrackerOpacity']??0x80,Window_QuestTracker[_0x15094e(0x2f2)]=VisuMZ['QuestSystem'][_0x15094e(0x2d4)][_0x15094e(0x200)][_0x15094e(0x341)]??0x10,Window_QuestTracker['prototype'][_0x15094e(0x259)]=function(_0x2d94e8){const _0x21a4c5=_0x15094e;Window_QuestLog['prototype'][_0x21a4c5(0x259)][_0x21a4c5(0x305)](this,_0x2d94e8),this[_0x21a4c5(0x246)]($gameSystem[_0x21a4c5(0x24c)]()),this[_0x21a4c5(0x327)]['x']=this[_0x21a4c5(0x327)]['y']=Window_QuestTracker[_0x21a4c5(0x327)],this['updateVisibility']();},Window_QuestTracker[_0x15094e(0x236)][_0x15094e(0x223)]=function(){const _0x3bf176=_0x15094e;return Math['max'](this[_0x3bf176(0x2be)],0x1);},Window_QuestTracker[_0x15094e(0x236)]['getEmptyLogFmt']=function(){return'';},Window_QuestTracker['prototype']['getQuestLogFmt']=function(){const _0x4b9d36=_0x15094e;return TextManager[_0x4b9d36(0x359)];},Window_QuestTracker[_0x15094e(0x236)]['createContents']=function(){const _0x514173=_0x15094e;this['height']=this[_0x514173(0x223)]()+$gameSystem[_0x514173(0x219)]()*0x2,Window_QuestLog[_0x514173(0x236)][_0x514173(0x22a)]['call'](this);},Window_QuestTracker['prototype'][_0x15094e(0x246)]=function(_0x9211d6){const _0x494963=_0x15094e;if(this[_0x494963(0x25b)]===_0x9211d6)return;this['_quest']=_0x9211d6,this[_0x494963(0x319)]();},Window_QuestTracker[_0x15094e(0x236)][_0x15094e(0x319)]=function(){const _0x292e04=_0x15094e;if($gameTemp['_questTrackerRefresh'])return;$gameTemp[_0x292e04(0x3ff)]=!![],Window_QuestLog[_0x292e04(0x236)][_0x292e04(0x319)][_0x292e04(0x305)](this),this['setBackgroundType'](this[_0x292e04(0x25b)]?Window_QuestTracker[_0x292e04(0x295)]:0x2),$gameTemp[_0x292e04(0x3ff)]=![];},Window_QuestTracker['prototype'][_0x15094e(0x335)]=function(){const _0x5070c4=_0x15094e;Window_QuestLog['prototype'][_0x5070c4(0x335)][_0x5070c4(0x305)](this),this[_0x5070c4(0x2fd)](),this['updateVisibility']();},Window_QuestTracker['prototype']['updateOpacity']=function(){const _0x31d1b9=_0x15094e;let _0x601581=this['contentsOpacity'];const _0x285397=Window_QuestTracker[_0x31d1b9(0x2f2)];if(this[_0x31d1b9(0x30a)]()){const _0x2f7f0f=Window_QuestTracker[_0x31d1b9(0x2bb)];_0x601581=(_0x601581-_0x285397)['clamp'](_0x2f7f0f,0xff);}else _0x601581+=_0x285397;this[_0x31d1b9(0x336)]=_0x601581,this['backOpacity']=_0x601581;},Window_QuestTracker[_0x15094e(0x236)][_0x15094e(0x30a)]=function(){const _0x36ee41=_0x15094e;if(!SceneManager[_0x36ee41(0x383)]())return![];const _0x44ab6b=$gameMap[_0x36ee41(0x3a7)](),_0x503ca2=$gameScreen[_0x36ee41(0x3a4)](),_0xbbf2aa=$gamePlayer[_0x36ee41(0x1f8)]()*_0x503ca2,_0xdd42d=($gamePlayer[_0x36ee41(0x251)]()-Math[_0x36ee41(0x377)](_0x44ab6b/0x2*_0x503ca2))*_0x503ca2,_0x5321fe=new Point(_0xbbf2aa,_0xdd42d),_0x3bbeda=this[_0x36ee41(0x2a4)][_0x36ee41(0x326)](_0x5321fe);return this[_0x36ee41(0x37f)][_0x36ee41(0x27c)](_0x3bbeda['x'],_0x3bbeda['y']);},Window_QuestTracker['prototype'][_0x15094e(0x39f)]=function(){const _0x466aa0=_0x15094e,_0x4975c8=this[_0x466aa0(0x234)]();this[_0x466aa0(0x2f8)]=_0x4975c8;},Window_QuestTracker['prototype'][_0x15094e(0x234)]=function(){const _0x16fad3=_0x15094e;if(!ConfigManager['questTrackerShow'])return 0x0;if($gameTemp[_0x16fad3(0x34d)])return 0x0;const _0x4d789a=SceneManager[_0x16fad3(0x257)];if(_0x4d789a&&_0x4d789a['_messageWindow']){if('suCtz'!==_0x16fad3(0x2d9)){if(_0x4d789a[_0x16fad3(0x297)][_0x16fad3(0x2f8)]>0x0)return 0x0;}else for(const _0x1f6767 of _0x3e9986){_0x1f6767[_0x16fad3(0x21c)](/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/i);const _0x5e9e20=_0x3f0b34(_0x1d3d32['$1']),_0x26f491=_0x467073(_0x39dc4f['$2']),_0x25dba6=_0x2a3e36[_0x16fad3(0x39c)](_0x5e9e20);_0x58c64f['setValue'](_0x5e9e20,_0x25dba6+_0x26f491);}}if(!this[_0x16fad3(0x25b)])return 0x0;if($gamePlayer[_0x16fad3(0x294)]())return 0x0;if($gameParty[_0x16fad3(0x337)]())return 0x0;if(SceneManager[_0x16fad3(0x3f6)]())return 0x0;return $gameSystem[_0x16fad3(0x2f3)]()?0xff:0x0;},VisuMZ[_0x15094e(0x3dd)]['finalizeWordWrapSupport']=function(_0x17b4a0){const _0x15795e=_0x15094e;if(!Window_QuestLog['wordWrapSupport'])return _0x17b4a0;if(!Imported[_0x15795e(0x3b0)])return _0x17b4a0;return _0x17b4a0=_0x15795e(0x3a9)[_0x15795e(0x235)](_0x17b4a0),_0x17b4a0;},VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x2f9)]=function(_0x4280e2){const _0x33cbbb=_0x15094e;if(Imported[_0x33cbbb(0x3b0)])return _0x4280e2;return _0x4280e2=_0x4280e2[_0x33cbbb(0x33c)](/<COLORLOCK>/gi,''),_0x4280e2=_0x4280e2[_0x33cbbb(0x33c)](/<\/COLORLOCK>/gi,''),_0x4280e2;},VisuMZ['QuestSystem'][_0x15094e(0x32f)]=function(_0xd297f1){const _0x442892=_0x15094e;if(!Window_QuestLog[_0x442892(0x314)])return _0xd297f1['replace'](/<(?:BR|LINEBREAK)>/gi,'');if(!Imported[_0x442892(0x3b0)])return _0xd297f1[_0x442892(0x33c)](/<(?:BR|LINEBREAK)>/gi,'');if(VisuMZ[_0x442892(0x3c4)][_0x442892(0x2d4)][_0x442892(0x275)][_0x442892(0x34a)])_0xd297f1=_0xd297f1[_0x442892(0x33c)](/[\n\r]+/g,'\x1bWrapBreak[0]');else{if('OiKSh'!==_0x442892(0x2ea))_0xd297f1=_0xd297f1[_0x442892(0x33c)](/[\n\r]+/g,'');else{_0x20818d=_0x3df62a['toUpperCase']()['trim']();const _0x15cccf=this[_0x442892(0x36d)](_0x2ac1e1);if(!_0x15cccf)return'';const _0x5f5374=this[_0x442892(0x237)]();return _0x5f5374[_0x442892(0x220)]=_0x5f5374[_0x442892(0x220)]||{},_0x5f5374['objectivesCompleted'][_0x365139]=_0x5f5374[_0x442892(0x220)][_0x481062]||[],_0x5f5374[_0x442892(0x220)][_0x2b4b9f][_0x442892(0x263)]((_0x15627b,_0x214436)=>_0x15627b-_0x214436);}}return _0xd297f1;},VisuMZ[_0x15094e(0x3dd)]['convertLineBreaksForWordWrap']=function(_0x5640c3){const _0x44e71a=_0x15094e;if(!Window_QuestLog['wordWrapSupport'])return _0x5640c3;if(!Imported[_0x44e71a(0x3b0)])return _0x5640c3;return _0x5640c3[_0x44e71a(0x24d)]()[_0x44e71a(0x33c)](/[\n\r]/g,_0x44e71a(0x2a6));},VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x37e)]=function(_0x58a68b){const _0xe858e0=_0x15094e;if(!Window_QuestLog[_0xe858e0(0x314)])return _0x58a68b;if(!Imported[_0xe858e0(0x3b0)])return _0x58a68b;return VisuMZ[_0xe858e0(0x3dd)]['applyWordWrap'](_0x58a68b[_0xe858e0(0x24d)]());},VisuMZ[_0x15094e(0x3dd)][_0x15094e(0x311)]=function(_0x2ce7bf){const _0x44958d=_0x15094e;if(!Window_QuestLog[_0x44958d(0x314)])return _0x2ce7bf['join']('\x0a')[_0x44958d(0x24d)]();if(!Imported[_0x44958d(0x3b0)])return _0x2ce7bf[_0x44958d(0x3ea)]('\x0a')[_0x44958d(0x24d)]();return _0x2ce7bf[_0x44958d(0x3ea)](_0x44958d(0x2a6))[_0x44958d(0x24d)]();},totalQuestsAvailable=function(){const _0x4d14c1=_0x15094e;return $gameSystem[_0x4d14c1(0x237)]()[_0x4d14c1(0x31d)][_0x4d14c1(0x2b9)];},totalQuestsCompleted=function(){const _0x265c45=_0x15094e;return $gameSystem[_0x265c45(0x237)]()[_0x265c45(0x3ef)][_0x265c45(0x2b9)];},totalQuestsFailed=function(){const _0x2ce0f2=_0x15094e;return $gameSystem[_0x2ce0f2(0x237)]()[_0x2ce0f2(0x2cb)][_0x2ce0f2(0x2b9)];},totalQuestsRevealed=function(){return totalQuestsAvailable()+totalQuestsCompleted()+totalQuestsFailed();},totalQuestsInGame=function(){const _0xb3b5ff=_0x15094e;return VisuMZ[_0xb3b5ff(0x3dd)][_0xb3b5ff(0x3df)][_0xb3b5ff(0x2b9)];},getQuestDescriptionIndex=function(_0x5e8ffb){const _0x537ccd=_0x15094e;_0x5e8ffb=_0x5e8ffb[_0x537ccd(0x249)]()[_0x537ccd(0x24d)]();const _0xf051c1=$gameSystem[_0x537ccd(0x36d)](_0x5e8ffb);if(!_0xf051c1)return-0x1;$gameSystem[_0x537ccd(0x372)](_0x5e8ffb);const _0x2fb32d=$gameSystem['questData']()[_0x537ccd(0x324)];return _0x2fb32d[_0x5e8ffb]||0x0;},totalVisibleQuestObjectives=function(_0x1de6af){const _0x112c52=_0x15094e;_0x1de6af=_0x1de6af[_0x112c52(0x249)]()[_0x112c52(0x24d)]();const _0x31fc9b=$gameSystem[_0x112c52(0x36d)](_0x1de6af);if(!_0x31fc9b)return-0x1;$gameSystem[_0x112c52(0x401)](_0x1de6af);const _0x841b14=$gameSystem[_0x112c52(0x237)]()[_0x112c52(0x2a3)]||{};if(!_0x841b14[_0x1de6af])return 0x0;return _0x841b14[_0x1de6af][_0x112c52(0x2b9)];},totalQuestObjectives=function(_0x13d192){const _0xb865ec=_0x15094e;_0x13d192=_0x13d192[_0xb865ec(0x249)]()[_0xb865ec(0x24d)]();const _0x353813=$gameSystem[_0xb865ec(0x36d)](_0x13d192);return _0x353813?_0x353813[_0xb865ec(0x23c)][_0xb865ec(0x2b9)]-0x1:0x0;},totalVisibleQuestRewards=function(_0x5f59e4){const _0xe0ab97=_0x15094e;_0x5f59e4=_0x5f59e4[_0xe0ab97(0x249)]()['trim']();const _0x141364=$gameSystem[_0xe0ab97(0x36d)](_0x5f59e4);if(!_0x141364)return-0x1;$gameSystem[_0xe0ab97(0x3e1)](_0x5f59e4);const _0x5a4929=$gameSystem[_0xe0ab97(0x237)]()['rewards']||{};if(!_0x5a4929[_0x5f59e4])return 0x0;return _0x5a4929[_0x5f59e4][_0xe0ab97(0x2b9)];},totalQuestRewards=function(_0x4a6b14){const _0x7d8f0e=_0x15094e;_0x4a6b14=_0x4a6b14[_0x7d8f0e(0x249)]()[_0x7d8f0e(0x24d)]();const _0x2f4bb5=$gameSystem[_0x7d8f0e(0x36d)](_0x4a6b14);return _0x2f4bb5?_0x2f4bb5['Rewards'][_0x7d8f0e(0x2b9)]-0x1:0x0;},getQuestSubtextIndex=function(_0x22d9eb){const _0x4c32dd=_0x15094e;_0x22d9eb=_0x22d9eb['toUpperCase']()[_0x4c32dd(0x24d)]();const _0x4a177a=$gameSystem[_0x4c32dd(0x36d)](_0x22d9eb);if(!_0x4a177a)return-0x1;$gameSystem[_0x4c32dd(0x3b9)](_0x22d9eb);const _0xdb540e=$gameSystem[_0x4c32dd(0x237)]()[_0x4c32dd(0x364)];return _0xdb540e[_0x22d9eb]||0x0;},getQuestQuoteIndex=function(_0x366c22){const _0x4ab744=_0x15094e;_0x366c22=_0x366c22['toUpperCase']()[_0x4ab744(0x24d)]();const _0x468200=$gameSystem[_0x4ab744(0x36d)](_0x366c22);if(!_0x468200)return-0x1;$gameSystem[_0x4ab744(0x2db)](_0x366c22);const _0x4867dd=$gameSystem['questData']()[_0x4ab744(0x353)];return _0x4867dd[_0x366c22]||0x0;},isQuestObjectiveCompleted=function(_0x1b0feb,_0x379b19){const _0x52ef56=_0x15094e;_0x1b0feb=_0x1b0feb[_0x52ef56(0x249)]()[_0x52ef56(0x24d)]();const _0x45342c=$gameSystem['quest'](_0x1b0feb);if(!_0x45342c)return![];$gameSystem[_0x52ef56(0x401)](_0x1b0feb);const _0x1e60f7=$gameSystem[_0x52ef56(0x237)]()['objectivesCompleted'];if(!_0x1e60f7[_0x1b0feb])return![];return _0x1e60f7[_0x1b0feb][_0x52ef56(0x21d)](_0x379b19);},isQuestObjectiveFailed=function(_0x46542b,_0x3cb9ee){const _0x43fefb=_0x15094e;_0x46542b=_0x46542b[_0x43fefb(0x249)]()[_0x43fefb(0x24d)]();const _0x4c797b=$gameSystem[_0x43fefb(0x36d)](_0x46542b);if(!_0x4c797b)return![];$gameSystem['questObjectives'](_0x46542b);const _0x251f71=$gameSystem['questData']()[_0x43fefb(0x3a1)];if(!_0x251f71[_0x46542b])return![];return _0x251f71[_0x46542b][_0x43fefb(0x21d)](_0x3cb9ee);},isQuestObjectiveUncleared=function(_0x56a28e,_0x382e98){const _0x1da673=_0x15094e;_0x56a28e=_0x56a28e[_0x1da673(0x249)]()[_0x1da673(0x24d)]();const _0x44aa57=$gameSystem[_0x1da673(0x36d)](_0x56a28e);if(!_0x44aa57)return![];$gameSystem[_0x1da673(0x401)](_0x56a28e);const _0x43ffbc=$gameSystem[_0x1da673(0x237)]()[_0x1da673(0x2a3)];if(!_0x43ffbc[_0x56a28e])return![];return _0x43ffbc[_0x56a28e][_0x1da673(0x21d)](_0x382e98);},isQuestRewardClaimed=function(_0xe1da99,_0x24ce0a){const _0x2b56b4=_0x15094e;_0xe1da99=_0xe1da99['toUpperCase']()[_0x2b56b4(0x24d)]();const _0x296d3d=$gameSystem[_0x2b56b4(0x36d)](_0xe1da99);if(!_0x296d3d)return![];$gameSystem[_0x2b56b4(0x3e1)](_0xe1da99);const _0x5dbba7=$gameSystem['questData']()['rewardsClaimed'];if(!_0x5dbba7[_0xe1da99])return![];return _0x5dbba7[_0xe1da99][_0x2b56b4(0x21d)](_0x24ce0a);},isQuestRewardDenied=function(_0x5352cd,_0x5d34e0){const _0x32563b=_0x15094e;_0x5352cd=_0x5352cd[_0x32563b(0x249)]()['trim']();const _0x1e7b7f=$gameSystem[_0x32563b(0x36d)](_0x5352cd);if(!_0x1e7b7f)return![];$gameSystem['questRewards'](_0x5352cd);const _0x5bfe1c=$gameSystem[_0x32563b(0x237)]()[_0x32563b(0x271)];if(!_0x5bfe1c[_0x5352cd])return![];return _0x5bfe1c[_0x5352cd][_0x32563b(0x21d)](_0x5d34e0);},isQuestRewardUnclaimed=function(_0x344a3f,_0x48996e){const _0x4d1bc8=_0x15094e;_0x344a3f=_0x344a3f[_0x4d1bc8(0x249)]()[_0x4d1bc8(0x24d)]();const _0x2ebffb=$gameSystem[_0x4d1bc8(0x36d)](_0x344a3f);if(!_0x2ebffb)return![];$gameSystem['questRewards'](_0x344a3f);const _0x2c9e01=$gameSystem['questData']()[_0x4d1bc8(0x252)];if(!_0x2c9e01[_0x344a3f])return![];return _0x2c9e01[_0x344a3f][_0x4d1bc8(0x21d)](_0x48996e);};