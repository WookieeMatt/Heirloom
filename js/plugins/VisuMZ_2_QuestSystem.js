//=============================================================================
// VisuStella MZ - Quest Journal System
// VisuMZ_2_QuestSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_QuestSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.QuestSystem = VisuMZ.QuestSystem || {};
VisuMZ.QuestSystem.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.14] [QuestSystem]
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

const _0x50c863=_0xe643;(function(_0x4fd0b4,_0x32d3c0){const _0x3d6f93=_0xe643,_0x53989c=_0x4fd0b4();while(!![]){try{const _0x3d3544=parseInt(_0x3d6f93(0x17b))/0x1*(-parseInt(_0x3d6f93(0x1ab))/0x2)+-parseInt(_0x3d6f93(0x1a3))/0x3+-parseInt(_0x3d6f93(0x15c))/0x4+parseInt(_0x3d6f93(0x11d))/0x5+-parseInt(_0x3d6f93(0x1fc))/0x6+parseInt(_0x3d6f93(0x171))/0x7*(parseInt(_0x3d6f93(0x30e))/0x8)+-parseInt(_0x3d6f93(0x2d1))/0x9*(-parseInt(_0x3d6f93(0x139))/0xa);if(_0x3d3544===_0x32d3c0)break;else _0x53989c['push'](_0x53989c['shift']());}catch(_0x589352){_0x53989c['push'](_0x53989c['shift']());}}}(_0x12c9,0x213f1));var label=_0x50c863(0x23b),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x527eee){const _0x3b85a6=_0x50c863;return _0x527eee[_0x3b85a6(0x23e)]&&_0x527eee[_0x3b85a6(0x276)][_0x3b85a6(0x14a)]('['+label+']');})[0x0];VisuMZ[label][_0x50c863(0x196)]=VisuMZ[label][_0x50c863(0x196)]||{},VisuMZ[_0x50c863(0x2e7)]=function(_0x33b518,_0x49069c){const _0x352aab=_0x50c863;for(const _0x368976 in _0x49069c){if(_0x368976['match'](/(.*):(.*)/i)){const _0x42fefc=String(RegExp['$1']),_0x9f4f03=String(RegExp['$2'])[_0x352aab(0x1af)]()[_0x352aab(0x304)]();let _0x3bd4a0,_0x1fa451,_0x3e4197;switch(_0x9f4f03){case _0x352aab(0x186):_0x3bd4a0=_0x49069c[_0x368976]!==''?Number(_0x49069c[_0x368976]):0x0;break;case _0x352aab(0x161):_0x1fa451=_0x49069c[_0x368976]!==''?JSON['parse'](_0x49069c[_0x368976]):[],_0x3bd4a0=_0x1fa451[_0x352aab(0x26f)](_0x20d19b=>Number(_0x20d19b));break;case _0x352aab(0x120):_0x3bd4a0=_0x49069c[_0x368976]!==''?eval(_0x49069c[_0x368976]):null;break;case _0x352aab(0x2a1):_0x1fa451=_0x49069c[_0x368976]!==''?JSON[_0x352aab(0x2e8)](_0x49069c[_0x368976]):[],_0x3bd4a0=_0x1fa451['map'](_0x444f93=>eval(_0x444f93));break;case _0x352aab(0x1e0):_0x3bd4a0=_0x49069c[_0x368976]!==''?JSON[_0x352aab(0x2e8)](_0x49069c[_0x368976]):'';break;case _0x352aab(0x244):_0x1fa451=_0x49069c[_0x368976]!==''?JSON['parse'](_0x49069c[_0x368976]):[],_0x3bd4a0=_0x1fa451[_0x352aab(0x26f)](_0x1a216e=>JSON[_0x352aab(0x2e8)](_0x1a216e));break;case _0x352aab(0x222):_0x3bd4a0=_0x49069c[_0x368976]!==''?new Function(JSON[_0x352aab(0x2e8)](_0x49069c[_0x368976])):new Function(_0x352aab(0x26d));break;case'ARRAYFUNC':_0x1fa451=_0x49069c[_0x368976]!==''?JSON[_0x352aab(0x2e8)](_0x49069c[_0x368976]):[],_0x3bd4a0=_0x1fa451[_0x352aab(0x26f)](_0x11048b=>new Function(JSON['parse'](_0x11048b)));break;case'STR':_0x3bd4a0=_0x49069c[_0x368976]!==''?String(_0x49069c[_0x368976]):'';break;case _0x352aab(0x153):_0x1fa451=_0x49069c[_0x368976]!==''?JSON[_0x352aab(0x2e8)](_0x49069c[_0x368976]):[],_0x3bd4a0=_0x1fa451[_0x352aab(0x26f)](_0x39a473=>String(_0x39a473));break;case _0x352aab(0x208):_0x3e4197=_0x49069c[_0x368976]!==''?JSON[_0x352aab(0x2e8)](_0x49069c[_0x368976]):{},_0x3bd4a0=VisuMZ[_0x352aab(0x2e7)]({},_0x3e4197);break;case'ARRAYSTRUCT':_0x1fa451=_0x49069c[_0x368976]!==''?JSON['parse'](_0x49069c[_0x368976]):[],_0x3bd4a0=_0x1fa451[_0x352aab(0x26f)](_0x5a115c=>VisuMZ[_0x352aab(0x2e7)]({},JSON[_0x352aab(0x2e8)](_0x5a115c)));break;default:continue;}_0x33b518[_0x42fefc]=_0x3bd4a0;}}return _0x33b518;},(_0x55f130=>{const _0x48953d=_0x50c863,_0x493f0b=_0x55f130[_0x48953d(0x15a)];for(const _0x5c7244 of dependencies){if(!Imported[_0x5c7244]){alert(_0x48953d(0x2f9)[_0x48953d(0x119)](_0x493f0b,_0x5c7244)),SceneManager[_0x48953d(0x1eb)]();break;}}const _0x35f8d5=_0x55f130['description'];if(_0x35f8d5[_0x48953d(0x1aa)](/\[Version[ ](.*?)\]/i)){if(_0x48953d(0x2b9)!==_0x48953d(0x2b9))return _0x48953d(0x1fd);else{const _0x2dafce=Number(RegExp['$1']);_0x2dafce!==VisuMZ[label][_0x48953d(0x28b)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x48953d(0x119)](_0x493f0b,_0x2dafce)),SceneManager[_0x48953d(0x1eb)]());}}if(_0x35f8d5['match'](/\[Tier[ ](\d+)\]/i)){if('DtXwz'!=='DtXwz'){const _0x216590=_0x48953d(0x138),_0x458f79=_0x45c5a7[_0x48953d(0x27f)];let _0x5303e7=_0x23fcc2[_0x48953d(0x1ba)];_0x458f79>0x0&&this['commandStyle']()!=='text'&&(_0x5303e7=_0x48953d(0x1c2)[_0x48953d(0x119)](_0x458f79,_0x5303e7));const _0x326435=this[_0x48953d(0x28f)]();this[_0x48953d(0x2f8)](_0x5303e7,_0x216590,_0x326435);}else{const _0x5a6e0c=Number(RegExp['$1']);_0x5a6e0c<tier?(alert(_0x48953d(0x2cc)[_0x48953d(0x119)](_0x493f0b,_0x5a6e0c,tier)),SceneManager[_0x48953d(0x1eb)]()):tier=Math[_0x48953d(0x213)](_0x5a6e0c,tier);}}VisuMZ[_0x48953d(0x2e7)](VisuMZ[label][_0x48953d(0x196)],_0x55f130[_0x48953d(0x1bb)]);})(pluginData),PluginManager[_0x50c863(0x2e6)](pluginData[_0x50c863(0x15a)],_0x50c863(0x1d7),_0x2d8edb=>{const _0xc213dc=_0x50c863;VisuMZ[_0xc213dc(0x2e7)](_0x2d8edb,_0x2d8edb);const _0x186c96=_0x2d8edb[_0xc213dc(0x28c)],_0x4fdcd4=_0x2d8edb[_0xc213dc(0x19b)];for(const _0x4f0d8b of _0x186c96){if(_0xc213dc(0x2f7)!==_0xc213dc(0x2f7)){const _0x3badd9=this[_0xc213dc(0x1e2)](_0x2d3550),_0x58ecf4=this[_0xc213dc(0x11f)](_0x1138db)['width'];return _0x58ecf4<=_0x3badd9['width']?_0xc213dc(0x1fd):_0xc213dc(0x2a4);}else $gameSystem['setQuestStatus'](_0x4f0d8b,_0x4fdcd4);}if(SceneManager['isSceneMap']()){if('WybaP'===_0xc213dc(0x17c)){_0x3d3175=_0x447351['toUpperCase']()[_0xc213dc(0x304)]();const _0x3e1173=_0x4e1d0f[_0xc213dc(0x1f0)](_0x5255e1);if(!_0x3e1173)return-0x1;_0x24133c[_0xc213dc(0x1ff)](_0x2873b4);const _0x26a2f2=_0xd8a65[_0xc213dc(0x1a0)]()[_0xc213dc(0x286)]||{};if(!_0x26a2f2[_0x4f6519])return 0x0;return _0x26a2f2[_0x332c4b][_0xc213dc(0x10c)];}else SceneManager[_0xc213dc(0x2e4)]['refreshQuestTrackerWindow']();}}),PluginManager[_0x50c863(0x2e6)](pluginData[_0x50c863(0x15a)],_0x50c863(0x301),_0x21d1e7=>{const _0xbd2421=_0x50c863;VisuMZ['ConvertParams'](_0x21d1e7,_0x21d1e7);const _0x4cb3ee=_0x21d1e7['Keys'],_0x27d3b7=_0x21d1e7[_0xbd2421(0x21f)];for(const _0x5c5bdf of _0x4cb3ee){$gameSystem[_0xbd2421(0x269)](_0x5c5bdf,_0x27d3b7);}SceneManager[_0xbd2421(0x29c)]()&&SceneManager[_0xbd2421(0x2e4)][_0xbd2421(0x144)]();}),PluginManager[_0x50c863(0x2e6)](pluginData[_0x50c863(0x15a)],_0x50c863(0x2c5),_0x2b06db=>{const _0x39943d=_0x50c863;VisuMZ[_0x39943d(0x2e7)](_0x2b06db,_0x2b06db);const _0x133279=_0x2b06db[_0x39943d(0x28c)],_0x4ff66c=_0x2b06db[_0x39943d(0x1d6)],_0x43e281=_0x2b06db[_0x39943d(0x19b)];for(const _0x2c8648 of _0x133279){if(_0x39943d(0x1c5)===_0x39943d(0x1c5))$gameSystem[_0x39943d(0x20f)](_0x2c8648,_0x4ff66c,_0x43e281);else return _0x39943d(0x2a4);}SceneManager[_0x39943d(0x29c)]()&&SceneManager['_scene'][_0x39943d(0x144)]();}),PluginManager['registerCommand'](pluginData[_0x50c863(0x15a)],_0x50c863(0x1a8),_0x1fa34a=>{const _0x3783b7=_0x50c863;VisuMZ[_0x3783b7(0x2e7)](_0x1fa34a,_0x1fa34a);const _0x60d951=_0x1fa34a['Keys'],_0x580a6e=_0x1fa34a['TargetID'];for(const _0x35c3bc of _0x60d951){if('PsvFd'!==_0x3783b7(0x1b3))$gameSystem[_0x3783b7(0x2db)](_0x35c3bc,_0x580a6e);else return(_0x486779[_0x3783b7(0x15f)]-0x230)[_0x3783b7(0x2d5)](0xf0,_0xda61c5['floor'](_0x4102b0[_0x3783b7(0x15f)]/0x2));}SceneManager['isSceneMap']()&&SceneManager[_0x3783b7(0x2e4)][_0x3783b7(0x144)]();}),PluginManager[_0x50c863(0x2e6)](pluginData[_0x50c863(0x15a)],'QuestRewards',_0x32381a=>{const _0x221a19=_0x50c863;VisuMZ['ConvertParams'](_0x32381a,_0x32381a);const _0x234d9d=_0x32381a[_0x221a19(0x28c)],_0x1553b3=_0x32381a[_0x221a19(0x1d6)],_0x16dba6=_0x32381a[_0x221a19(0x19b)];for(const _0x2f1fc9 of _0x234d9d){if(_0x221a19(0x1da)!=='Anrpf')$gameSystem['setQuestRewards'](_0x2f1fc9,_0x1553b3,_0x16dba6);else{const _0x5ca58e=this[_0x221a19(0x2f0)],_0xd59d6c=_0x5ca58e[_0x221a19(0x2bf)][_0x221a19(0x1af)]()[_0x221a19(0x304)]();if(_0x5ca58e[_0x221a19(0x2e1)])_0x5ca58e['OnLoadQuestJS'][_0x221a19(0x22f)](this);let _0xc62d6f=this[_0x221a19(0x15d)]();return _0xc62d6f=_0x2454ad[_0x221a19(0x23b)][_0x221a19(0x274)](_0xc62d6f),_0xc62d6f=_0xc62d6f['replace'](/\[\[RAWTITLE\]\]/gi,_0x5ca58e['Title']),_0xc62d6f=_0xc62d6f['replace'](/\[\[TITLE\]\]/gi,_0x5ca58e['Title'][_0x221a19(0x283)](/\\I\[(\d+)\]/gi,'')[_0x221a19(0x304)]()),_0xc62d6f=_0xc62d6f['replace'](/\[\[DIFFICULTY\]\]/gi,_0x5ca58e[_0x221a19(0x183)]['trim']()),_0xc62d6f=_0xc62d6f['replace'](/\[\[FROM\]\]/gi,_0x5ca58e[_0x221a19(0x27d)][_0x221a19(0x304)]()),_0xc62d6f=_0xc62d6f['replace'](/\[\[LOCATION\]\]/gi,_0x5ca58e[_0x221a19(0x1c4)][_0x221a19(0x304)]()),_0xc62d6f=_0xc62d6f[_0x221a19(0x283)](/\[\[DESCRIPTION\]\]/gi,this[_0x221a19(0x179)](_0xd59d6c)),_0xc62d6f=_0xc62d6f[_0x221a19(0x283)](/\[\[OBJECTIVES\]\]/gi,this[_0x221a19(0x1b7)](_0x5ca58e,_0xd59d6c)),_0xc62d6f=_0xc62d6f[_0x221a19(0x283)](/\[\[REWARDS\]\]/gi,this[_0x221a19(0x2ed)](_0x5ca58e,_0xd59d6c)),_0xc62d6f=_0xc62d6f[_0x221a19(0x283)](/\[\[SUBTEXT\]\]/gi,this[_0x221a19(0x24d)](_0xd59d6c)),_0xc62d6f=_0xc62d6f[_0x221a19(0x283)](/\[\[QUOTE\]\]/gi,this[_0x221a19(0x30d)](_0xd59d6c)),_0xc62d6f=_0x149b82[_0x221a19(0x23b)][_0x221a19(0x190)](_0xc62d6f),_0xc62d6f=_0x57f9fb[_0x221a19(0x23b)][_0x221a19(0x197)](_0xc62d6f),_0xc62d6f[_0x221a19(0x304)]();}}SceneManager[_0x221a19(0x29c)]()&&SceneManager[_0x221a19(0x2e4)]['refreshQuestTrackerWindow']();}),PluginManager[_0x50c863(0x2e6)](pluginData[_0x50c863(0x15a)],'QuestSubtext',_0x27dd5e=>{const _0x3c8685=_0x50c863;VisuMZ[_0x3c8685(0x2e7)](_0x27dd5e,_0x27dd5e);const _0x464309=_0x27dd5e[_0x3c8685(0x28c)],_0x3d3a2a=_0x27dd5e[_0x3c8685(0x21f)];for(const _0x49f76b of _0x464309){if(_0x3c8685(0x24b)===_0x3c8685(0x24b))$gameSystem['setQuestSubtext'](_0x49f76b,_0x3d3a2a);else{if(this[_0x3c8685(0x142)][_0x3c8685(0x1f6)]())return this[_0x3c8685(0x142)][_0x3c8685(0x114)]()?_0x5a75e2[_0x3c8685(0x2d8)]:'';else return this[_0x3c8685(0x142)][_0x3c8685(0x19e)]()?_0x3bdeec['questButtonAssistCollapse']:_0x562fcc[_0x3c8685(0x168)];}}SceneManager[_0x3c8685(0x29c)]()&&SceneManager[_0x3c8685(0x2e4)][_0x3c8685(0x144)]();}),PluginManager['registerCommand'](pluginData[_0x50c863(0x15a)],_0x50c863(0x2d0),_0x1fb1ae=>{const _0x4d734c=_0x50c863;VisuMZ[_0x4d734c(0x2e7)](_0x1fb1ae,_0x1fb1ae);const _0xd9c343=_0x1fb1ae['Key'];$gameSystem[_0x4d734c(0x19c)](_0xd9c343),SceneManager[_0x4d734c(0x29c)]()&&SceneManager[_0x4d734c(0x2e4)]['refreshQuestTrackerWindow']();}),PluginManager[_0x50c863(0x2e6)](pluginData['name'],_0x50c863(0x150),_0x3dd560=>{const _0x58605d=_0x50c863;if(!SceneManager[_0x58605d(0x29c)]())return;SceneManager[_0x58605d(0x2e4)][_0x58605d(0x144)]();}),PluginManager[_0x50c863(0x2e6)](pluginData['name'],'TrackerShowHide',_0x2cc9a9=>{const _0x2b1f8e=_0x50c863;VisuMZ['ConvertParams'](_0x2cc9a9,_0x2cc9a9),$gameSystem[_0x2b1f8e(0x264)](_0x2cc9a9[_0x2b1f8e(0x1d3)]),SceneManager[_0x2b1f8e(0x29c)]()&&SceneManager[_0x2b1f8e(0x2e4)]['refreshQuestTrackerWindow']();}),PluginManager[_0x50c863(0x2e6)](pluginData[_0x50c863(0x15a)],_0x50c863(0x16f),_0x77a96f=>{const _0x1943d3=_0x50c863;if($gameParty[_0x1943d3(0x2a0)]())return;SceneManager[_0x1943d3(0x1c0)](Scene_Quest);}),PluginManager[_0x50c863(0x2e6)](pluginData[_0x50c863(0x15a)],_0x50c863(0x220),_0xa86d41=>{const _0x14d00f=_0x50c863;VisuMZ[_0x14d00f(0x2e7)](_0xa86d41,_0xa86d41),$gameSystem['questData']()[_0x14d00f(0x21e)]=_0xa86d41['Enable'];}),PluginManager['registerCommand'](pluginData['name'],_0x50c863(0x237),_0x1a2bfc=>{const _0x4db6e3=_0x50c863;VisuMZ['ConvertParams'](_0x1a2bfc,_0x1a2bfc),$gameSystem[_0x4db6e3(0x1a0)]()[_0x4db6e3(0x24a)]=_0x1a2bfc[_0x4db6e3(0x1d3)];}),VisuMZ['QuestSystem'][_0x50c863(0x261)]=Scene_Boot[_0x50c863(0x1cd)][_0x50c863(0x1d5)],Scene_Boot[_0x50c863(0x1cd)][_0x50c863(0x1d5)]=function(){const _0xedbc19=_0x50c863;VisuMZ['QuestSystem'][_0xedbc19(0x261)][_0xedbc19(0x22f)](this),this[_0xedbc19(0x12c)]();},VisuMZ[_0x50c863(0x23b)][_0x50c863(0x314)]=[],VisuMZ[_0x50c863(0x23b)][_0x50c863(0x2df)]={},Scene_Boot[_0x50c863(0x1cd)]['process_VisuMZ_QuestSystem_Data']=function(){const _0x16b5af=_0x50c863;for(const _0x2c831b of VisuMZ['QuestSystem'][_0x16b5af(0x196)]['Categories']){if(!_0x2c831b)continue;for(const _0x54529d of _0x2c831b[_0x16b5af(0x29a)]){if(!_0x54529d)continue;_0x54529d[_0x16b5af(0x310)]=_0x2c831b,_0x54529d[_0x16b5af(0x224)]['unshift'](''),_0x54529d[_0x16b5af(0x106)][_0x16b5af(0x240)](''),_0x54529d[_0x16b5af(0x250)][_0x16b5af(0x240)](''),_0x54529d['Subtext'][_0x16b5af(0x240)](''),_0x54529d[_0x16b5af(0x107)][_0x16b5af(0x240)]('');const _0x487819=_0x54529d[_0x16b5af(0x2bf)][_0x16b5af(0x1af)]()[_0x16b5af(0x304)]();VisuMZ['QuestSystem'][_0x16b5af(0x314)]['push'](_0x487819),VisuMZ['QuestSystem'][_0x16b5af(0x2df)][_0x487819]=_0x54529d;}}},ConfigManager[_0x50c863(0x1db)]=!![],ConfigManager[_0x50c863(0x152)]=!![],VisuMZ[_0x50c863(0x23b)][_0x50c863(0x28e)]=ConfigManager[_0x50c863(0x238)],ConfigManager[_0x50c863(0x238)]=function(){const _0x25d6c9=_0x50c863,_0x2b09f7=VisuMZ[_0x25d6c9(0x23b)][_0x25d6c9(0x28e)]['call'](this);return _0x2b09f7[_0x25d6c9(0x1db)]=this[_0x25d6c9(0x1db)],_0x2b09f7['questTrackerPosition']=this['questTrackerPosition'],_0x2b09f7;},VisuMZ['QuestSystem'][_0x50c863(0x2d2)]=ConfigManager[_0x50c863(0x270)],ConfigManager[_0x50c863(0x270)]=function(_0x52cf54){const _0x3f75f8=_0x50c863;VisuMZ['QuestSystem'][_0x3f75f8(0x2d2)][_0x3f75f8(0x22f)](this,_0x52cf54),_0x3f75f8(0x1db)in _0x52cf54?this[_0x3f75f8(0x1db)]=_0x52cf54[_0x3f75f8(0x1db)]:this['questTrackerShow']=!![],_0x3f75f8(0x152)in _0x52cf54?this[_0x3f75f8(0x152)]=_0x52cf54[_0x3f75f8(0x152)]:this['questTrackerPosition']=!![];},ImageManager['questKnownIcon']=VisuMZ[_0x50c863(0x23b)]['Settings']['General'][_0x50c863(0x1fa)],ImageManager[_0x50c863(0x27f)]=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)][_0x50c863(0x195)][_0x50c863(0x289)],ImageManager[_0x50c863(0x2bd)]=VisuMZ[_0x50c863(0x23b)]['Settings'][_0x50c863(0x195)][_0x50c863(0x23a)],TextManager[_0x50c863(0x209)]=VisuMZ['QuestSystem'][_0x50c863(0x196)]['MainMenu'][_0x50c863(0x126)],TextManager[_0x50c863(0x185)]=VisuMZ['QuestSystem']['Settings'][_0x50c863(0x195)][_0x50c863(0x2aa)],TextManager[_0x50c863(0x1ba)]=VisuMZ['QuestSystem']['Settings'][_0x50c863(0x195)][_0x50c863(0x111)],TextManager[_0x50c863(0x2e0)]=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)][_0x50c863(0x195)][_0x50c863(0x2ae)],TextManager['questCategoryOpenedFmt']=VisuMZ['QuestSystem'][_0x50c863(0x196)]['General'][_0x50c863(0x132)],TextManager[_0x50c863(0x102)]=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)][_0x50c863(0x195)][_0x50c863(0x2d3)],TextManager[_0x50c863(0x2c1)]=VisuMZ[_0x50c863(0x23b)]['Settings'][_0x50c863(0x195)][_0x50c863(0x1b5)],TextManager[_0x50c863(0x30b)]=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)][_0x50c863(0x195)]['NoQuestListed'],TextManager[_0x50c863(0x288)]=VisuMZ[_0x50c863(0x23b)]['Settings'][_0x50c863(0x195)][_0x50c863(0x163)],TextManager[_0x50c863(0x2ab)]=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)]['General'][_0x50c863(0x30f)],TextManager['questObjectiveNormalFmt']=VisuMZ[_0x50c863(0x23b)]['Settings'][_0x50c863(0x195)][_0x50c863(0x2d7)],TextManager[_0x50c863(0x26e)]=VisuMZ['QuestSystem'][_0x50c863(0x196)][_0x50c863(0x195)][_0x50c863(0x242)],TextManager['questObjectiveFailedFmt']=VisuMZ[_0x50c863(0x23b)]['Settings'][_0x50c863(0x195)]['Objective_Failed_Fmt'],TextManager[_0x50c863(0x113)]=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)][_0x50c863(0x195)][_0x50c863(0x1dd)],TextManager[_0x50c863(0x10a)]=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)][_0x50c863(0x195)][_0x50c863(0x26a)],TextManager['questRewardsDeniedFmt']=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)]['General'][_0x50c863(0x124)],TextManager[_0x50c863(0x133)]=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)][_0x50c863(0x195)][_0x50c863(0x1fe)],TextManager[_0x50c863(0x2d8)]=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)]['General'][_0x50c863(0x2d8)],TextManager[_0x50c863(0x168)]=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)][_0x50c863(0x195)][_0x50c863(0x2c8)],TextManager['questButtonAssistCollapse']=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)][_0x50c863(0x195)][_0x50c863(0x26c)],TextManager['defaultQuestTrackerFmt']='\x0a\x5c{[[Title]]\x5c}\x0a[[Objectives]]\x0a',TextManager[_0x50c863(0x198)]=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)][_0x50c863(0x2b5)][_0x50c863(0x292)]||TextManager[_0x50c863(0x258)],TextManager[_0x50c863(0x268)]=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)][_0x50c863(0x195)][_0x50c863(0x25a)],TextManager[_0x50c863(0x1db)]=VisuMZ['QuestSystem'][_0x50c863(0x196)][_0x50c863(0x2b5)][_0x50c863(0x2b8)],TextManager[_0x50c863(0x152)]=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)][_0x50c863(0x2b5)][_0x50c863(0x229)],TextManager[_0x50c863(0x2c0)]=VisuMZ[_0x50c863(0x23b)]['Settings'][_0x50c863(0x2b5)]['PositionOff'],TextManager[_0x50c863(0x2b0)]=VisuMZ['QuestSystem'][_0x50c863(0x196)][_0x50c863(0x2b5)][_0x50c863(0x2f3)],SceneManager[_0x50c863(0x29c)]=function(){const _0x4ad55c=_0x50c863;return this[_0x4ad55c(0x2e4)]&&this[_0x4ad55c(0x2e4)][_0x4ad55c(0x2bc)]===Scene_Map;},VisuMZ[_0x50c863(0x23b)]['Game_System_initialize']=Game_System[_0x50c863(0x1cd)][_0x50c863(0x265)],Game_System[_0x50c863(0x1cd)]['initialize']=function(){const _0x3f191f=_0x50c863;VisuMZ[_0x3f191f(0x23b)]['Game_System_initialize'][_0x3f191f(0x22f)](this),this[_0x3f191f(0x175)]();},Game_System[_0x50c863(0x1cd)][_0x50c863(0x175)]=function(){const _0x43faf2=_0x50c863,_0x292bce=VisuMZ['QuestSystem'][_0x43faf2(0x196)][_0x43faf2(0x195)],_0xd835ae=VisuMZ['QuestSystem'][_0x43faf2(0x196)][_0x43faf2(0x1ed)];this[_0x43faf2(0x25b)]={'shown':_0xd835ae[_0x43faf2(0x255)],'enabled':_0xd835ae[_0x43faf2(0x290)],'known':[],'completed':[],'failed':[],'description':{},'objectives':{},'objectivesCompleted':{},'objectivesFailed':{},'rewards':{},'rewardsClaimed':{},'rewardsDenied':{},'subtext':{},'quotes':{},'tracked':_0x292bce[_0x43faf2(0x103)]['toUpperCase']()[_0x43faf2(0x304)](),'showTracker':!![]};for(const _0x4032ca of _0x292bce[_0x43faf2(0x29b)]){this[_0x43faf2(0x1ac)](_0x4032ca,_0x43faf2(0x2b3));}for(const _0x37e4f1 of _0x292bce[_0x43faf2(0x273)]){if(_0x43faf2(0x2fc)!==_0x43faf2(0x141))this[_0x43faf2(0x1ac)](_0x37e4f1,'completed');else return _0x1c87ef[_0x43faf2(0x302)]();}for(const _0x114611 of _0x292bce[_0x43faf2(0x118)]){this[_0x43faf2(0x1ac)](_0x114611,_0x43faf2(0x267));}},Game_System[_0x50c863(0x1cd)][_0x50c863(0x1f0)]=function(_0x1591b2){const _0x267cdf=_0x50c863;return _0x1591b2=_0x1591b2['toUpperCase']()['trim'](),VisuMZ[_0x267cdf(0x23b)][_0x267cdf(0x2df)][_0x1591b2];},Game_System[_0x50c863(0x1cd)][_0x50c863(0x1a0)]=function(){const _0x352eb2=_0x50c863;if(this[_0x352eb2(0x25b)]===undefined)this[_0x352eb2(0x175)]();return this[_0x352eb2(0x25b)];},Game_System[_0x50c863(0x1cd)][_0x50c863(0x302)]=function(){const _0x1eef5d=_0x50c863;return this[_0x1eef5d(0x1a0)]()[_0x1eef5d(0x24a)];},Game_System[_0x50c863(0x1cd)][_0x50c863(0x228)]=function(){const _0xf24b5c=_0x50c863;return this[_0xf24b5c(0x1a0)]()[_0xf24b5c(0x21e)];},Game_System['prototype'][_0x50c863(0x1ac)]=function(_0x5cd818,_0x48c7c6){const _0x4c42e4=_0x50c863;_0x5cd818=_0x5cd818[_0x4c42e4(0x1af)]()[_0x4c42e4(0x304)]();if(!VisuMZ[_0x4c42e4(0x23b)][_0x4c42e4(0x2df)][_0x5cd818])return;const _0x5aef40=this[_0x4c42e4(0x1a0)]();_0x5aef40[_0x4c42e4(0x2b3)]=_0x5aef40[_0x4c42e4(0x2b3)]||[],_0x5aef40[_0x4c42e4(0x138)]=_0x5aef40['completed']||[],_0x5aef40[_0x4c42e4(0x267)]=_0x5aef40[_0x4c42e4(0x267)]||[],_0x5aef40[_0x4c42e4(0x2b3)][_0x4c42e4(0x189)](_0x5cd818),_0x5aef40['completed']['remove'](_0x5cd818),_0x5aef40[_0x4c42e4(0x267)]['remove'](_0x5cd818);if(_0x48c7c6!==_0x4c42e4(0x189))_0x5aef40[_0x48c7c6][_0x4c42e4(0x1c0)](_0x5cd818);_0x5cd818===_0x5aef40[_0x4c42e4(0x243)][_0x4c42e4(0x1af)]()['trim']()&&(_0x48c7c6!==_0x4c42e4(0x2b3)&&this['setTrackedQuest'](''));},Game_System[_0x50c863(0x1cd)]['questsKnown']=function(){const _0x29709c=_0x50c863,_0x4258e9=this[_0x29709c(0x1a0)]();return _0x4258e9[_0x29709c(0x2b3)]=_0x4258e9['known']||[],_0x4258e9[_0x29709c(0x2b3)][_0x29709c(0x26f)](_0xf28324=>this[_0x29709c(0x1f0)](_0xf28324))[_0x29709c(0x189)](null);},Game_System[_0x50c863(0x1cd)][_0x50c863(0x305)]=function(_0x4b31d3){const _0x20bba8=_0x50c863,_0x3b793d=this[_0x20bba8(0x1a0)]();return _0x3b793d['known']=_0x3b793d[_0x20bba8(0x2b3)]||[],_0x4b31d3=_0x4b31d3[_0x20bba8(0x1af)]()[_0x20bba8(0x304)](),_0x3b793d[_0x20bba8(0x2b3)][_0x20bba8(0x14a)](_0x4b31d3);},Game_System['prototype'][_0x50c863(0x17f)]=function(){const _0x4e9700=_0x50c863,_0x4ec0cc=this[_0x4e9700(0x1a0)]();return _0x4ec0cc[_0x4e9700(0x138)]=_0x4ec0cc[_0x4e9700(0x138)]||[],_0x4ec0cc[_0x4e9700(0x138)][_0x4e9700(0x26f)](_0x52785f=>this[_0x4e9700(0x1f0)](_0x52785f))[_0x4e9700(0x189)](null);},Game_System['prototype'][_0x50c863(0x1c8)]=function(_0x4e8dfa){const _0x553e9c=_0x50c863,_0x2cdcec=this['questData']();return _0x2cdcec[_0x553e9c(0x138)]=_0x2cdcec['completed']||[],_0x4e8dfa=_0x4e8dfa[_0x553e9c(0x1af)]()[_0x553e9c(0x304)](),_0x2cdcec['completed']['includes'](_0x4e8dfa);},Game_System[_0x50c863(0x1cd)][_0x50c863(0x1f7)]=function(){const _0x540515=_0x50c863,_0x465b5c=this[_0x540515(0x1a0)]();return _0x465b5c[_0x540515(0x267)]=_0x465b5c['failed']||[],_0x465b5c['failed'][_0x540515(0x26f)](_0x28756f=>this[_0x540515(0x1f0)](_0x28756f))[_0x540515(0x189)](null);},Game_System[_0x50c863(0x1cd)]['isQuestFailed']=function(_0xe727fc){const _0x502b65=_0x50c863,_0x1aa729=this[_0x502b65(0x1a0)]();return _0x1aa729['failed']=_0x1aa729[_0x502b65(0x267)]||[],_0xe727fc=_0xe727fc['toUpperCase']()[_0x502b65(0x304)](),_0x1aa729[_0x502b65(0x267)][_0x502b65(0x14a)](_0xe727fc);},Game_System[_0x50c863(0x1cd)][_0x50c863(0x12f)]=function(_0x2e4676){const _0x161a46=_0x50c863;_0x2e4676=_0x2e4676[_0x161a46(0x1af)]()[_0x161a46(0x304)]();const _0xf07b54=this[_0x161a46(0x1f0)](_0x2e4676);if(!_0xf07b54)return'';const _0x2b10fd=this['questData']()[_0x161a46(0x276)];_0x2b10fd[_0x2e4676]=_0x2b10fd[_0x2e4676]||0x1;const _0x492eb5=_0x2b10fd[_0x2e4676];return _0xf07b54[_0x161a46(0x224)][_0x492eb5]||'';},Game_System['prototype'][_0x50c863(0x269)]=function(_0xbd0506,_0x43f67b){const _0x58e8aa=_0x50c863;_0xbd0506=_0xbd0506[_0x58e8aa(0x1af)]()[_0x58e8aa(0x304)]();const _0x8819a5=this['quest'](_0xbd0506);if(!_0x8819a5)return'';const _0x3a4c2c=this['questData']()[_0x58e8aa(0x276)];_0x3a4c2c[_0xbd0506]=_0x43f67b;},Game_System[_0x50c863(0x1cd)][_0x50c863(0x1ff)]=function(_0x14b7d9){const _0x243a1f=_0x50c863;_0x14b7d9=_0x14b7d9[_0x243a1f(0x1af)]()[_0x243a1f(0x304)]();const _0x460f62=this[_0x243a1f(0x1f0)](_0x14b7d9);if(!_0x460f62)return'';const _0x284628=this[_0x243a1f(0x1a0)]();return _0x284628['objectives']=_0x284628[_0x243a1f(0x286)]||{},!_0x284628[_0x243a1f(0x286)][_0x14b7d9]&&(_0x243a1f(0x2fa)!==_0x243a1f(0x2fa)?_0x13c226['setQuestDescription'](_0x1ff206,_0x1d029f):_0x284628[_0x243a1f(0x286)][_0x14b7d9]=JsonEx[_0x243a1f(0x2d4)](_0x460f62[_0x243a1f(0x232)])),_0x284628[_0x243a1f(0x286)][_0x14b7d9]['sort']((_0x13ca97,_0x159a08)=>_0x13ca97-_0x159a08);},Game_System['prototype'][_0x50c863(0x20f)]=function(_0x18a37c,_0x345aa6,_0x304b66){const _0x5d8eec=_0x50c863;_0x18a37c=_0x18a37c['toUpperCase']()[_0x5d8eec(0x304)]();const _0x462722=this['quest'](_0x18a37c);if(!_0x462722)return'';const _0x50a953=this[_0x5d8eec(0x1a0)]();_0x50a953[_0x5d8eec(0x286)]=_0x50a953['objectives']||{};!_0x50a953[_0x5d8eec(0x286)][_0x18a37c]&&(_0x50a953[_0x5d8eec(0x286)][_0x18a37c]=JsonEx[_0x5d8eec(0x2d4)](_0x462722[_0x5d8eec(0x232)]));_0x50a953['objectives'][_0x18a37c]=_0x50a953[_0x5d8eec(0x286)][_0x18a37c]||[],_0x50a953[_0x5d8eec(0x130)][_0x18a37c]=_0x50a953[_0x5d8eec(0x130)][_0x18a37c]||[],_0x50a953[_0x5d8eec(0x219)][_0x18a37c]=_0x50a953[_0x5d8eec(0x219)][_0x18a37c]||[];for(const _0x401be8 of _0x345aa6){if('FxarI'!=='BgIEw'){_0x50a953[_0x5d8eec(0x286)][_0x18a37c][_0x5d8eec(0x189)](_0x401be8),_0x50a953['objectivesCompleted'][_0x18a37c][_0x5d8eec(0x189)](_0x401be8),_0x50a953[_0x5d8eec(0x219)][_0x18a37c][_0x5d8eec(0x189)](_0x401be8);switch(_0x304b66){case'show':case _0x5d8eec(0x2b3):_0x50a953[_0x5d8eec(0x286)][_0x18a37c][_0x5d8eec(0x1c0)](_0x401be8);break;case _0x5d8eec(0x1dc):case _0x5d8eec(0x138):_0x50a953[_0x5d8eec(0x130)][_0x18a37c][_0x5d8eec(0x1c0)](_0x401be8);break;case _0x5d8eec(0x18a):case'failed':_0x50a953['objectivesFailed'][_0x18a37c]['push'](_0x401be8);break;case _0x5d8eec(0x189):case _0x5d8eec(0x254):break;}}else _0x16c7da[_0x5d8eec(0x2e4)][_0x5d8eec(0x30c)](_0x111d88);}},Game_System['prototype'][_0x50c863(0x12a)]=function(_0x4e55ad){const _0x44ca0c=_0x50c863;_0x4e55ad=_0x4e55ad['toUpperCase']()['trim']();const _0x4e82e1=this[_0x44ca0c(0x1f0)](_0x4e55ad);if(!_0x4e82e1)return'';const _0x275e98=this[_0x44ca0c(0x1a0)]();return _0x275e98['objectivesCompleted']=_0x275e98[_0x44ca0c(0x130)]||{},_0x275e98[_0x44ca0c(0x130)][_0x4e55ad]=_0x275e98[_0x44ca0c(0x130)][_0x4e55ad]||[],_0x275e98[_0x44ca0c(0x130)][_0x4e55ad][_0x44ca0c(0x1cf)]((_0x1b9871,_0x4eeb82)=>_0x1b9871-_0x4eeb82);},Game_System[_0x50c863(0x1cd)]['questObjectivesFailed']=function(_0x3b076d){const _0x28bde7=_0x50c863;_0x3b076d=_0x3b076d[_0x28bde7(0x1af)]()[_0x28bde7(0x304)]();const _0x3eebf8=this[_0x28bde7(0x1f0)](_0x3b076d);if(!_0x3eebf8)return'';const _0x9a033f=this[_0x28bde7(0x1a0)]();return _0x9a033f[_0x28bde7(0x219)]=_0x9a033f[_0x28bde7(0x219)]||{},_0x9a033f[_0x28bde7(0x219)][_0x3b076d]=_0x9a033f[_0x28bde7(0x219)][_0x3b076d]||[],_0x9a033f['objectivesFailed'][_0x3b076d][_0x28bde7(0x1cf)]((_0x876f33,_0x555249)=>_0x876f33-_0x555249);},Game_System[_0x50c863(0x1cd)][_0x50c863(0x151)]=function(_0x32ede1){const _0x4733e8=_0x50c863;_0x32ede1=_0x32ede1[_0x4733e8(0x1af)]()[_0x4733e8(0x304)]();const _0x417665=this[_0x4733e8(0x1f0)](_0x32ede1);if(!_0x417665)return'';const _0x2c910c=this[_0x4733e8(0x1a0)]();_0x2c910c[_0x4733e8(0x1a1)]=_0x2c910c[_0x4733e8(0x1a1)]||{};if(!_0x2c910c[_0x4733e8(0x1a1)][_0x32ede1]){if(_0x4733e8(0x256)==='vKTIS')_0x2c910c[_0x4733e8(0x1a1)][_0x32ede1]=JsonEx[_0x4733e8(0x2d4)](_0x417665[_0x4733e8(0x12d)]);else return _0x5227f0;}return _0x2c910c[_0x4733e8(0x1a1)][_0x32ede1]['sort']((_0x52aec7,_0x3676fa)=>_0x52aec7-_0x3676fa);},Game_System['prototype'][_0x50c863(0x13b)]=function(_0xb1eed,_0x26e97f,_0xc38b5c){const _0x3813a2=_0x50c863;_0xb1eed=_0xb1eed[_0x3813a2(0x1af)]()[_0x3813a2(0x304)]();const _0x32718c=this['quest'](_0xb1eed);if(!_0x32718c)return'';const _0x1f5bb0=this[_0x3813a2(0x1a0)]();_0x1f5bb0[_0x3813a2(0x1a1)]=_0x1f5bb0[_0x3813a2(0x1a1)]||{};if(!_0x1f5bb0[_0x3813a2(0x1a1)][_0xb1eed]){if(_0x3813a2(0x28d)!=='Dxlmj'){if(this['_categoryFilter']===_0x3ed090)return;this['_categoryFilter']=_0x3a0da7,this[_0x3813a2(0x1f5)]();}else _0x1f5bb0[_0x3813a2(0x1a1)][_0xb1eed]=JsonEx[_0x3813a2(0x2d4)](_0x32718c['VisibleRewards']);}_0x1f5bb0[_0x3813a2(0x1a1)][_0xb1eed]=_0x1f5bb0['rewards'][_0xb1eed]||[],_0x1f5bb0[_0x3813a2(0x263)][_0xb1eed]=_0x1f5bb0[_0x3813a2(0x263)][_0xb1eed]||[],_0x1f5bb0[_0x3813a2(0x2e9)][_0xb1eed]=_0x1f5bb0[_0x3813a2(0x2e9)][_0xb1eed]||[];for(const _0x44c2dd of _0x26e97f){if(_0x3813a2(0x2e3)!=='TOsTt')return this[_0x3813a2(0x278)][_0x537800['CategoryName']];else{_0x1f5bb0[_0x3813a2(0x1a1)][_0xb1eed][_0x3813a2(0x189)](_0x44c2dd),_0x1f5bb0[_0x3813a2(0x263)][_0xb1eed][_0x3813a2(0x189)](_0x44c2dd),_0x1f5bb0['rewardsDenied'][_0xb1eed][_0x3813a2(0x189)](_0x44c2dd);switch(_0xc38b5c){case _0x3813a2(0x1f2):case _0x3813a2(0x2b3):_0x1f5bb0[_0x3813a2(0x1a1)][_0xb1eed][_0x3813a2(0x1c0)](_0x44c2dd);break;case _0x3813a2(0x101):case'claimed':_0x1f5bb0[_0x3813a2(0x263)][_0xb1eed][_0x3813a2(0x1c0)](_0x44c2dd);break;case _0x3813a2(0x1e7):case _0x3813a2(0x23d):_0x1f5bb0['rewardsDenied'][_0xb1eed][_0x3813a2(0x1c0)](_0x44c2dd);break;case'remove':case'removed':break;}}}},Game_System['prototype'][_0x50c863(0x2cb)]=function(_0x338682){const _0x27ef9b=_0x50c863;_0x338682=_0x338682[_0x27ef9b(0x1af)]()['trim']();const _0x421f3a=this[_0x27ef9b(0x1f0)](_0x338682);if(!_0x421f3a)return'';const _0x3bf231=this[_0x27ef9b(0x1a0)]();return _0x3bf231[_0x27ef9b(0x263)]=_0x3bf231[_0x27ef9b(0x263)]||{},_0x3bf231[_0x27ef9b(0x263)][_0x338682]=_0x3bf231[_0x27ef9b(0x263)][_0x338682]||[],_0x3bf231[_0x27ef9b(0x263)][_0x338682][_0x27ef9b(0x1cf)]((_0x1bf3b3,_0x49d550)=>_0x1bf3b3-_0x49d550);},Game_System['prototype'][_0x50c863(0x2c6)]=function(_0x2559b6){const _0x248705=_0x50c863;_0x2559b6=_0x2559b6['toUpperCase']()['trim']();const _0x2da295=this[_0x248705(0x1f0)](_0x2559b6);if(!_0x2da295)return'';const _0x46dc71=this[_0x248705(0x1a0)]();return _0x46dc71[_0x248705(0x2e9)]=_0x46dc71[_0x248705(0x2e9)]||{},_0x46dc71['rewardsDenied'][_0x2559b6]=_0x46dc71[_0x248705(0x2e9)][_0x2559b6]||[],_0x46dc71[_0x248705(0x2e9)][_0x2559b6]['sort']((_0x3e0431,_0x3533e0)=>_0x3e0431-_0x3533e0);},Game_System[_0x50c863(0x1cd)][_0x50c863(0x202)]=function(_0x1445a0){const _0x434366=_0x50c863;_0x1445a0=_0x1445a0['toUpperCase']()[_0x434366(0x304)]();const _0xae3ec1=this['quest'](_0x1445a0);if(!_0xae3ec1)return'';const _0x30400d=this[_0x434366(0x1a0)]()[_0x434366(0x1c9)];_0x30400d[_0x1445a0]=_0x30400d[_0x1445a0]||0x1;const _0x44b667=_0x30400d[_0x1445a0];return _0xae3ec1['Subtext'][_0x44b667]||'';},Game_System['prototype'][_0x50c863(0x2ee)]=function(_0xb0f46c,_0x311f58){const _0x45bfe3=_0x50c863;_0xb0f46c=_0xb0f46c['toUpperCase']()[_0x45bfe3(0x304)]();const _0x36a22a=this[_0x45bfe3(0x1f0)](_0xb0f46c);if(!_0x36a22a)return'';const _0x42c81d=this['questData']()[_0x45bfe3(0x1c9)];_0x42c81d[_0xb0f46c]=_0x311f58;},Game_System[_0x50c863(0x1cd)][_0x50c863(0x210)]=function(_0x27dc1f){const _0x36f12f=_0x50c863;_0x27dc1f=_0x27dc1f[_0x36f12f(0x1af)]()['trim']();const _0x4747aa=this[_0x36f12f(0x1f0)](_0x27dc1f);if(!_0x4747aa)return'';const _0xebcd87=this[_0x36f12f(0x1a0)]()[_0x36f12f(0x23f)];_0xebcd87[_0x27dc1f]=_0xebcd87[_0x27dc1f]||0x1;const _0x51c5eb=_0xebcd87[_0x27dc1f];return _0x4747aa[_0x36f12f(0x107)][_0x51c5eb]||'';},Game_System[_0x50c863(0x1cd)][_0x50c863(0x2db)]=function(_0x131644,_0x59f5da){const _0x34bd8f=_0x50c863;_0x131644=_0x131644[_0x34bd8f(0x1af)]()[_0x34bd8f(0x304)]();const _0x3775df=this[_0x34bd8f(0x1f0)](_0x131644);if(!_0x3775df)return'';const _0x4ccfdd=this['questData']()[_0x34bd8f(0x23f)];_0x4ccfdd[_0x131644]=_0x59f5da;},Game_System['prototype'][_0x50c863(0x2ba)]=function(){const _0x164433=_0x50c863,_0x2f0c2c=this[_0x164433(0x1a0)]();return this[_0x164433(0x1f0)](_0x2f0c2c[_0x164433(0x243)]);},Game_System[_0x50c863(0x1cd)][_0x50c863(0x19c)]=function(_0x51be84,_0x2e53c4){const _0x27e489=_0x50c863,_0x246f3=this[_0x27e489(0x1a0)]();if(_0x2e53c4&&_0x246f3[_0x27e489(0x243)]===_0x51be84)_0x51be84='';_0x246f3[_0x27e489(0x243)]=_0x51be84;if(SceneManager[_0x27e489(0x29c)]()){if(_0x27e489(0x223)===_0x27e489(0x223))SceneManager[_0x27e489(0x2e4)][_0x27e489(0x30c)](_0x51be84);else{_0x119f30=_0x24d2a6[_0x27e489(0x1af)]()[_0x27e489(0x304)]();const _0x524090=_0x5b93aa[_0x27e489(0x1f0)](_0x56907f);if(!_0x524090)return![];_0x58dc5b[_0x27e489(0x151)](_0x1e2c58);const _0x4ed41f=_0x2a7f1e[_0x27e489(0x1a0)]()[_0x27e489(0x2e9)];if(!_0x4ed41f[_0x2cc2a3])return![];return _0x4ed41f[_0xe5f490][_0x27e489(0x14a)](_0x2b3656);}}},Game_System[_0x50c863(0x1cd)][_0x50c863(0x1b4)]=function(){const _0x18455e=_0x50c863,_0x3dba65=this[_0x18455e(0x1a0)]();return _0x3dba65[_0x18455e(0x1ae)];},Game_System['prototype'][_0x50c863(0x264)]=function(_0x3f1ac9){const _0x1934b7=_0x50c863,_0x105cdd=this['questData']();_0x105cdd[_0x1934b7(0x1ae)]=_0x3f1ac9;},VisuMZ[_0x50c863(0x23b)][_0x50c863(0x294)]=Game_BattlerBase[_0x50c863(0x1cd)]['addNewState'],Game_BattlerBase[_0x50c863(0x1cd)]['addNewState']=function(_0x395a4b){const _0x3befc8=_0x50c863,_0x34b3bc=this['isAlive']();VisuMZ[_0x3befc8(0x23b)]['Game_BattlerBase_addNewState'][_0x3befc8(0x22f)](this,_0x395a4b),this[_0x3befc8(0x201)](_0x395a4b,_0x34b3bc);},Game_BattlerBase[_0x50c863(0x1cd)][_0x50c863(0x201)]=function(_0x374774,_0x315d1f){const _0x3be181=_0x50c863;if(_0x374774!==this[_0x3be181(0x11a)]())return;if(!this[_0x3be181(0x27a)]())return;if(!_0x315d1f)return;if(!this[_0x3be181(0x2c3)]())return;if(this[_0x3be181(0x1bd)])return;this[_0x3be181(0x1bd)]=!![];const _0xc12a03=this[_0x3be181(0x1f3)]()[_0x3be181(0x167)],_0x2b21f8=_0xc12a03['match'](/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/gi);if(_0x2b21f8)for(const _0x43c40c of _0x2b21f8){if(_0x3be181(0x1ad)==='NkSze'){_0x43c40c[_0x3be181(0x1aa)](/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/i);const _0x11d1bb=Number(RegExp['$1']),_0x318c4a=Number(RegExp['$2']),_0x158303=$gameVariables[_0x3be181(0x187)](_0x11d1bb);$gameVariables[_0x3be181(0x15b)](_0x11d1bb,_0x158303+_0x318c4a);}else{if(_0x519762[_0x3be181(0x2a0)]())return;_0x42bba6[_0x3be181(0x1c0)](_0x57b1ca);}}},VisuMZ[_0x50c863(0x23b)][_0x50c863(0x2ef)]=Game_Battler[_0x50c863(0x1cd)]['useItem'],Game_Battler['prototype']['useItem']=function(_0x2a481d){const _0x9bb213=_0x50c863;VisuMZ[_0x9bb213(0x23b)][_0x9bb213(0x2ef)][_0x9bb213(0x22f)](this,_0x2a481d),this['questJournalSystemUseItem'](_0x2a481d);},Game_Battler[_0x50c863(0x1cd)]['questJournalSystemUseItem']=function(_0x5b5a7d){const _0x65d6c=_0x50c863;if(!_0x5b5a7d)return;if(!this['isActor']())return;const _0x2cb6aa=_0x5b5a7d['note'],_0x597e38=_0x2cb6aa['match'](/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/gi);if(_0x597e38)for(const _0x1eba0d of _0x597e38){if(_0x65d6c(0x169)===_0x65d6c(0x194))_0x32ae98[_0x65d6c(0x2e4)][_0x65d6c(0x144)]();else{_0x1eba0d[_0x65d6c(0x1aa)](/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/i);const _0x7c9121=Number(RegExp['$1']),_0x58bd70=Number(RegExp['$2']),_0x57a693=$gameVariables[_0x65d6c(0x187)](_0x7c9121);$gameVariables[_0x65d6c(0x15b)](_0x7c9121,_0x57a693+_0x58bd70);}}},VisuMZ['QuestSystem'][_0x50c863(0x154)]=Game_Actor[_0x50c863(0x1cd)][_0x50c863(0x1c3)],Game_Actor[_0x50c863(0x1cd)]['tradeItemWithParty']=function(_0x1d4be3,_0x1eb424){const _0x1e9b8f=_0x50c863;$gameTemp[_0x1e9b8f(0x1df)]=!![];const _0x46faea=VisuMZ[_0x1e9b8f(0x23b)][_0x1e9b8f(0x154)]['call'](this,_0x1d4be3,_0x1eb424);return $gameTemp[_0x1e9b8f(0x1df)]=undefined,_0x46faea;},VisuMZ[_0x50c863(0x23b)][_0x50c863(0x147)]=Game_Party[_0x50c863(0x1cd)]['gainItem'],Game_Party[_0x50c863(0x1cd)][_0x50c863(0x20c)]=function(_0x54ee4e,_0x2ee589,_0x41ec8e){const _0x27b2bf=_0x50c863;VisuMZ[_0x27b2bf(0x23b)][_0x27b2bf(0x147)][_0x27b2bf(0x22f)](this,_0x54ee4e,_0x2ee589,_0x41ec8e),this[_0x27b2bf(0x2b7)](_0x54ee4e,_0x2ee589);},Game_Party[_0x50c863(0x1cd)]['questJournalSystemGainItem']=function(_0x5c5466,_0x4fd1e1){const _0x48efe3=_0x50c863;if(!_0x5c5466)return;if($gameTemp[_0x48efe3(0x1df)])return;const _0x1bb0a4=_0x5c5466[_0x48efe3(0x167)];if(_0x4fd1e1>0x0){if(_0x48efe3(0x241)!==_0x48efe3(0x1b2)){const _0x599772=_0x1bb0a4[_0x48efe3(0x1aa)](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/gi);if(_0x599772){if(_0x48efe3(0x218)===_0x48efe3(0x2b6))this[_0x48efe3(0x117)]=new _0x545d76(_0x4cca41['loadTitle1'](_0x400896['BgFilename1'])),this[_0x48efe3(0x2cf)]=new _0x274515(_0x2d4df6[_0x48efe3(0x22a)](_0x274186[_0x48efe3(0x239)])),this[_0x48efe3(0x1de)](this[_0x48efe3(0x117)]),this[_0x48efe3(0x1de)](this[_0x48efe3(0x2cf)]),this[_0x48efe3(0x117)][_0x48efe3(0x253)][_0x48efe3(0x249)](this[_0x48efe3(0x231)]['bind'](this,this[_0x48efe3(0x117)])),this[_0x48efe3(0x2cf)][_0x48efe3(0x253)][_0x48efe3(0x249)](this[_0x48efe3(0x231)][_0x48efe3(0x271)](this,this[_0x48efe3(0x2cf)]));else for(const _0x4bd225 of _0x599772){if(_0x48efe3(0x13f)===_0x48efe3(0x13f)){_0x4bd225[_0x48efe3(0x1aa)](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/i);const _0x404193=Number(RegExp['$1']),_0x10c053=Number(RegExp['$2'])*_0x4fd1e1,_0x2643b9=$gameVariables[_0x48efe3(0x187)](_0x404193);$gameVariables['setValue'](_0x404193,_0x2643b9+_0x10c053);}else{const _0x46ffdf=this[_0x48efe3(0x1b6)];_0x46ffdf[_0x48efe3(0x18b)]['clear']();const _0x24ec17=this[_0x48efe3(0x2d6)](this[_0x48efe3(0x1c6)]());if(_0x24ec17===_0x48efe3(0x2a4)){const _0x30254d=this['itemLineRect'](this[_0x48efe3(0x1c6)]());let _0x45533d=this[_0x48efe3(0x214)](this[_0x48efe3(0x1c6)]());_0x45533d=_0x45533d[_0x48efe3(0x283)](/\\I\[(\d+)\]/gi,''),_0x46ffdf['resetFontSettings'](),this[_0x48efe3(0x307)](_0x45533d,_0x30254d),this[_0x48efe3(0x1e1)](_0x45533d,_0x30254d),this['commandNameWindowCenter'](_0x45533d,_0x30254d);}}}}}else{const _0x1e391a=this[_0x48efe3(0x2fd)](_0x653ef7);if(_0x1e391a===_0x48efe3(0x152)){const _0x595d63=this['getConfigValue'](_0x1e391a);return _0x595d63?_0x504373['questTrackerPosOn']:_0x5f011a[_0x48efe3(0x2c0)];}return _0x5360e4['QuestSystem']['Window_Options_statusText']['call'](this,_0x549676);}}else{if(_0x4fd1e1<0x0){if(_0x48efe3(0x164)===_0x48efe3(0x164)){const _0x488c19=_0x1bb0a4[_0x48efe3(0x1aa)](/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/gi);if(_0x488c19)for(const _0x3a6e32 of _0x488c19){_0x3a6e32[_0x48efe3(0x1aa)](/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/i);const _0x35783b=Number(RegExp['$1']),_0x2eed54=Number(RegExp['$2'])*_0x4fd1e1,_0x16f1df=$gameVariables[_0x48efe3(0x187)](_0x35783b);$gameVariables[_0x48efe3(0x15b)](_0x35783b,_0x16f1df+_0x2eed54);}}else _0x122bd1['setQuestRewards'](_0x2dddbb,_0x26429b,_0x42f076);}}const _0x538c3f=_0x1bb0a4[_0x48efe3(0x1aa)](/<TRACK WITH VARIABLE (\d+)>/gi);if(_0x538c3f){if(_0x48efe3(0x257)!==_0x48efe3(0x2a3))for(const _0x563457 of _0x538c3f){_0x563457[_0x48efe3(0x1aa)](/<TRACK WITH VARIABLE (\d+)>/i);const _0x5bc100=Number(RegExp['$1']),_0x588c7d=$gameParty[_0x48efe3(0x1e4)](_0x5c5466);$gameVariables[_0x48efe3(0x15b)](_0x5bc100,_0x588c7d);}else{if(!_0x15f9ae['wordWrapSupport'])return _0x5c5bed;if(!_0xb2c932[_0x48efe3(0x2f1)])return _0xe0993e;return _0x263b3e[_0x48efe3(0x23b)][_0x48efe3(0x13d)](_0x7cd95a[_0x48efe3(0x304)]());}}},VisuMZ[_0x50c863(0x23b)][_0x50c863(0x146)]=Game_Map[_0x50c863(0x1cd)]['requestRefresh'],Game_Map[_0x50c863(0x1cd)][_0x50c863(0x2fb)]=function(){const _0x3634a5=_0x50c863;VisuMZ[_0x3634a5(0x23b)]['Game_Map_requestRefresh'][_0x3634a5(0x22f)](this);if(SceneManager['isSceneMap']()&&!this['_isRefreshingQuestTrackerWindow']){if('QxUXp'===_0x3634a5(0x1d4)){_0x5086a1=_0x4b85da[_0x3634a5(0x1af)]()[_0x3634a5(0x304)]();const _0x3209e6=this[_0x3634a5(0x1f0)](_0x34e152);if(!_0x3209e6)return'';const _0x501695=this['questData']()['quotes'];_0x501695[_0x2325c9]=_0x1863e5;}else this['_isRefreshingQuestTrackerWindow']=!![];}},VisuMZ['QuestSystem']['Game_Map_refresh']=Game_Map[_0x50c863(0x1cd)][_0x50c863(0x1f5)],Game_Map['prototype'][_0x50c863(0x1f5)]=function(){const _0x35ec06=_0x50c863;VisuMZ['QuestSystem']['Game_Map_refresh'][_0x35ec06(0x22f)](this);if(SceneManager[_0x35ec06(0x29c)]()&&this[_0x35ec06(0x1cb)]){if('eXfiY'!==_0x35ec06(0x16b))SceneManager[_0x35ec06(0x2e4)]['refreshQuestTrackerWindow'](),this[_0x35ec06(0x1cb)]=![];else return _0x5b4bad[_0x35ec06(0x23b)][_0x35ec06(0x196)][_0x35ec06(0x160)][_0x35ec06(0x262)][_0x35ec06(0x22f)](this);}},VisuMZ[_0x50c863(0x23b)][_0x50c863(0x1f9)]=Scene_Map[_0x50c863(0x1cd)]['createSpriteset'],Scene_Map['prototype']['createSpriteset']=function(){const _0x23a4ab=_0x50c863;VisuMZ[_0x23a4ab(0x23b)][_0x23a4ab(0x1f9)][_0x23a4ab(0x22f)](this),this['createQuestTrackerWindow']();},Scene_Map[_0x50c863(0x1cd)]['createQuestTrackerWindow']=function(){const _0x484382=_0x50c863;if(!SceneManager['isSceneMap']())return;const _0x222090=this[_0x484382(0x134)](),_0x2a15bc=new Window_QuestTracker(_0x222090);this['addChild'](_0x2a15bc),this['_questTrackerWindow']=_0x2a15bc;},Scene_Map['prototype'][_0x50c863(0x17e)]=function(){const _0x14c6c4=_0x50c863;return ConfigManager[_0x14c6c4(0x152)];},Scene_Map[_0x50c863(0x1cd)][_0x50c863(0x134)]=function(){const _0x45da6b=_0x50c863;return VisuMZ[_0x45da6b(0x23b)][_0x45da6b(0x196)]['Window'][_0x45da6b(0x1ce)][_0x45da6b(0x22f)](this);},Scene_Map[_0x50c863(0x1cd)][_0x50c863(0x144)]=function(){const _0x4fd830=_0x50c863;if(!this[_0x4fd830(0x217)])return;this[_0x4fd830(0x217)][_0x4fd830(0x1f5)]();},Scene_Map[_0x50c863(0x1cd)][_0x50c863(0x30c)]=function(_0x2fdc49){const _0x5a5929=_0x50c863;if(!this[_0x5a5929(0x217)])return;_0x2fdc49=_0x2fdc49['toUpperCase']()[_0x5a5929(0x304)]();const _0x3d52e3=$gameSystem[_0x5a5929(0x1f0)](_0x2fdc49);this[_0x5a5929(0x217)]['setQuest'](_0x3d52e3);},VisuMZ[_0x50c863(0x23b)][_0x50c863(0x251)]=Scene_Menu[_0x50c863(0x1cd)][_0x50c863(0x2e5)],Scene_Menu['prototype'][_0x50c863(0x2e5)]=function(){const _0xa6388d=_0x50c863;VisuMZ[_0xa6388d(0x23b)][_0xa6388d(0x251)][_0xa6388d(0x22f)](this),this[_0xa6388d(0x291)]['setHandler']('quest',this[_0xa6388d(0x1b9)][_0xa6388d(0x271)](this));},Scene_Menu[_0x50c863(0x1cd)][_0x50c863(0x1b9)]=function(){const _0x133cd0=_0x50c863;SceneManager[_0x133cd0(0x1c0)](Scene_Quest);},VisuMZ['QuestSystem'][_0x50c863(0x143)]=Scene_Options[_0x50c863(0x1cd)][_0x50c863(0x122)],Scene_Options['prototype'][_0x50c863(0x122)]=function(){const _0x3ea665=_0x50c863;let _0x18bec5=VisuMZ[_0x3ea665(0x23b)][_0x3ea665(0x143)][_0x3ea665(0x22f)](this);if(VisuMZ[_0x3ea665(0x23b)][_0x3ea665(0x196)][_0x3ea665(0x2b5)][_0x3ea665(0x16d)]){if(_0x3ea665(0x216)!==_0x3ea665(0x216))for(const _0x55e8ef of _0x47b4ba){_0x55e8ef[_0x3ea665(0x1aa)](/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/i);const _0x5602f9=_0x3bdf77(_0x7dcb68['$1']),_0x15c486=_0x544b3d(_0x852e88['$2']),_0x5c839e=_0x3ca873['value'](_0x5602f9);_0x21141c[_0x3ea665(0x15b)](_0x5602f9,_0x5c839e+_0x15c486);}else{if(VisuMZ['QuestSystem']['Settings'][_0x3ea665(0x2b5)]['AddShowOption'])_0x18bec5++;if(VisuMZ[_0x3ea665(0x23b)][_0x3ea665(0x196)][_0x3ea665(0x2b5)][_0x3ea665(0x1be)])_0x18bec5++;}}return _0x18bec5;};function Scene_Quest(){this['initialize'](...arguments);}Scene_Quest['prototype']=Object[_0x50c863(0x21b)](Scene_MenuBase[_0x50c863(0x1cd)]),Scene_Quest[_0x50c863(0x1cd)][_0x50c863(0x2bc)]=Scene_Quest,Scene_Quest[_0x50c863(0x1cd)]['initialize']=function(){const _0x293f51=_0x50c863;Scene_MenuBase['prototype'][_0x293f51(0x265)][_0x293f51(0x22f)](this);},Scene_Quest['prototype'][_0x50c863(0x18d)]=function(){return 0x0;},Scene_Quest['prototype'][_0x50c863(0x2a9)]=function(){const _0x2335d1=_0x50c863;if(ConfigManager[_0x2335d1(0x312)]&&ConfigManager['uiInputPosition']!==undefined){if(_0x2335d1(0x211)!==_0x2335d1(0x211)){if(![]){const _0x4f777f=this['baseTextRect'](),_0x51b2e5=this[_0x2335d1(0x2f0)]?this['createQuestText']():this[_0x2335d1(0x25f)](),_0x32134a=this[_0x2335d1(0x11f)](_0x51b2e5[_0x2335d1(0x304)]());this['_textHeight']=_0x32134a[_0x2335d1(0x13e)],this[_0x2335d1(0x2bc)]===_0x25d75b&&(this[_0x2335d1(0x279)]+=this[_0x2335d1(0x1bc)](),_0x41afd5[_0x2335d1(0x116)]&&(this[_0x2335d1(0x279)]+=this[_0x2335d1(0x1bc)]()*0x4));}const _0x13ea92=this['_quest']?this[_0x2335d1(0x2dc)]():this[_0x2335d1(0x25f)]();this['_textHeight']=this['textSizeEx'](_0x13ea92[_0x2335d1(0x304)]())[_0x2335d1(0x13e)];}else return ConfigManager[_0x2335d1(0x1b8)];}else return ConfigManager['uiMenuStyle']===![]?![]:Scene_MenuBase[_0x2335d1(0x1cd)][_0x2335d1(0x2a9)]['call'](this);},Scene_Quest[_0x50c863(0x1cd)][_0x50c863(0x207)]=function(){const _0x35e702=_0x50c863;return(Graphics[_0x35e702(0x15f)]-0x230)[_0x35e702(0x2d5)](0xf0,Math['floor'](Graphics['boxWidth']/0x2));},Scene_Quest[_0x50c863(0x1cd)][_0x50c863(0x21b)]=function(){const _0x4b64a8=_0x50c863;Scene_MenuBase[_0x4b64a8(0x1cd)][_0x4b64a8(0x21b)]['call'](this),this['createCommandWindow'](),this[_0x4b64a8(0x172)](),this['createQuestLogWindow'](),this[_0x4b64a8(0x12e)]();},Scene_Quest['prototype'][_0x50c863(0x2e5)]=function(){const _0x3cd7f9=_0x50c863,_0x22ba8a=this['commandWindowRect'](),_0x45a13c=new Window_QuestCommand(_0x22ba8a);_0x45a13c[_0x3cd7f9(0x1a4)](_0x3cd7f9(0x2b3),this[_0x3cd7f9(0x22d)][_0x3cd7f9(0x271)](this)),_0x45a13c[_0x3cd7f9(0x1a4)](_0x3cd7f9(0x138),this[_0x3cd7f9(0x22d)]['bind'](this)),_0x45a13c[_0x3cd7f9(0x1a4)](_0x3cd7f9(0x267),this[_0x3cd7f9(0x22d)][_0x3cd7f9(0x271)](this)),_0x45a13c[_0x3cd7f9(0x1a4)]('cancel',this[_0x3cd7f9(0x308)][_0x3cd7f9(0x271)](this)),this[_0x3cd7f9(0x1c7)](_0x45a13c),this[_0x3cd7f9(0x291)]=_0x45a13c,_0x45a13c[_0x3cd7f9(0x16a)](VisuMZ[_0x3cd7f9(0x23b)][_0x3cd7f9(0x196)][_0x3cd7f9(0x160)]['CommandWindow_BgType']);},Scene_Quest[_0x50c863(0x1cd)][_0x50c863(0x10b)]=function(){const _0x444cc5=_0x50c863;return VisuMZ[_0x444cc5(0x23b)][_0x444cc5(0x196)][_0x444cc5(0x160)][_0x444cc5(0x225)][_0x444cc5(0x22f)](this);},Scene_Quest[_0x50c863(0x1cd)][_0x50c863(0x172)]=function(){const _0x35eb83=_0x50c863,_0x181619=this[_0x35eb83(0x1ec)](),_0x17d007=new Window_Base(_0x181619);this[_0x35eb83(0x1c7)](_0x17d007),this[_0x35eb83(0x306)]=_0x17d007,_0x17d007[_0x35eb83(0x16a)](VisuMZ[_0x35eb83(0x23b)]['Settings'][_0x35eb83(0x160)][_0x35eb83(0x2af)]);},Scene_Quest[_0x50c863(0x1cd)]['questLabelWindowRect']=function(){const _0x1086ed=_0x50c863;return VisuMZ[_0x1086ed(0x23b)][_0x1086ed(0x196)][_0x1086ed(0x160)][_0x1086ed(0x2c4)]['call'](this);},Scene_Quest['prototype'][_0x50c863(0x170)]=function(){const _0x9203f0=_0x50c863,_0x3b0a63=this[_0x9203f0(0x17a)](),_0x48c29b=new Window_QuestLog(_0x3b0a63);this[_0x9203f0(0x1c7)](_0x48c29b),this[_0x9203f0(0x236)]=_0x48c29b,_0x48c29b[_0x9203f0(0x16a)](VisuMZ[_0x9203f0(0x23b)]['Settings']['Window']['LogWindow_BgType']);},Scene_Quest['prototype'][_0x50c863(0x17a)]=function(){const _0x26238e=_0x50c863;return VisuMZ[_0x26238e(0x23b)]['Settings'][_0x26238e(0x160)][_0x26238e(0x262)][_0x26238e(0x22f)](this);},Scene_Quest[_0x50c863(0x1cd)][_0x50c863(0x12e)]=function(){const _0xa4dd04=_0x50c863,_0x5b653a=this[_0xa4dd04(0x29f)](),_0xc90289=new Window_QuestList(_0x5b653a);_0xc90289[_0xa4dd04(0x1a4)](_0xa4dd04(0x310),this['onListCategory'][_0xa4dd04(0x271)](this)),_0xc90289[_0xa4dd04(0x1a4)](_0xa4dd04(0x1f0),this['onListQuest']['bind'](this)),_0xc90289[_0xa4dd04(0x1a4)]('cancel',this[_0xa4dd04(0x2dd)][_0xa4dd04(0x271)](this)),this[_0xa4dd04(0x1c7)](_0xc90289),this[_0xa4dd04(0x142)]=_0xc90289,_0xc90289[_0xa4dd04(0x16a)](VisuMZ[_0xa4dd04(0x23b)][_0xa4dd04(0x196)][_0xa4dd04(0x160)][_0xa4dd04(0x2ff)]),this[_0xa4dd04(0x291)][_0xa4dd04(0x1f1)](this[_0xa4dd04(0x142)]),this['_listWindow']['setLabelWindow'](this[_0xa4dd04(0x306)]),this['_listWindow'][_0xa4dd04(0x1d1)](this[_0xa4dd04(0x236)]);},Scene_Quest[_0x50c863(0x1cd)]['questListWindowRect']=function(){const _0x543cc1=_0x50c863;return VisuMZ['QuestSystem'][_0x543cc1(0x196)][_0x543cc1(0x160)][_0x543cc1(0x1e5)][_0x543cc1(0x22f)](this);},Scene_Quest[_0x50c863(0x1cd)][_0x50c863(0x22d)]=function(){const _0x4db22c=_0x50c863;this[_0x4db22c(0x142)]['activate'](),this[_0x4db22c(0x142)][_0x4db22c(0x1ef)](0x0);},Scene_Quest['prototype'][_0x50c863(0x15e)]=function(){const _0x6fb769=_0x50c863;this[_0x6fb769(0x142)][_0x6fb769(0x1e8)](),this[_0x6fb769(0x142)]['activate']();},Scene_Quest[_0x50c863(0x1cd)]['onListQuest']=function(){const _0x181133=_0x50c863,_0x4a3099=this[_0x181133(0x142)][_0x181133(0x1f6)](),_0x859475=_0x4a3099['Key'][_0x181133(0x1af)]()[_0x181133(0x304)]();$gameSystem[_0x181133(0x19c)](_0x859475,!![]),this['_listWindow'][_0x181133(0x1f5)](),this[_0x181133(0x142)][_0x181133(0x281)]();},Scene_Quest[_0x50c863(0x1cd)]['onListCancel']=function(){const _0x5a60cf=_0x50c863;this['_listWindow'][_0x5a60cf(0x200)](),this[_0x5a60cf(0x291)]['activate']();},Scene_Quest[_0x50c863(0x1cd)]['buttonAssistText1']=function(){return TextManager['questButtonAssistPageUpDn'];},Scene_Quest[_0x50c863(0x1cd)][_0x50c863(0x176)]=function(){const _0x214c17=_0x50c863;if(this[_0x214c17(0x142)]&&this[_0x214c17(0x142)][_0x214c17(0x148)]){if('hxTLr'!=='hxTLr')_0x34ac1e!=='known'&&this[_0x214c17(0x19c)]('');else{if(this[_0x214c17(0x142)][_0x214c17(0x1f6)]())return this[_0x214c17(0x142)][_0x214c17(0x114)]()?TextManager[_0x214c17(0x2d8)]:'';else{if(this['_listWindow']['isCurrentCategoryOpen']()){if(_0x214c17(0x2bb)!==_0x214c17(0x2bb)){const _0x510136=_0x4d8091['match'](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/gi);if(_0x510136)for(const _0x5c7266 of _0x510136){_0x5c7266[_0x214c17(0x1aa)](/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/i);const _0x40ab74=_0x3ec5a2(_0xdf6be2['$1']),_0x55a4f6=_0x538b05(_0x330039['$2'])*_0x19dcef,_0x5da3c7=_0x3255c1[_0x214c17(0x187)](_0x40ab74);_0x495bc5[_0x214c17(0x15b)](_0x40ab74,_0x5da3c7+_0x55a4f6);}}else return TextManager[_0x214c17(0x2a7)];}else{if(_0x214c17(0x2b2)===_0x214c17(0x2b2))return TextManager[_0x214c17(0x168)];else{const _0x347e9b=this[_0x214c17(0x214)](_0x5e65a9);if(_0x347e9b['match'](/\\I\[(\d+)\]/i)){const _0x4d6ca5=this[_0x214c17(0x1e2)](_0x53313e),_0x557dfe=this['textSizeEx'](_0x347e9b)[_0x214c17(0x178)];return _0x557dfe<=_0x4d6ca5[_0x214c17(0x178)]?_0x214c17(0x1fd):_0x214c17(0x2a4);}}}}}}return Scene_MenuBase[_0x214c17(0x1cd)]['buttonAssistText4'][_0x214c17(0x22f)](this);},Scene_Quest['prototype'][_0x50c863(0x227)]=function(){const _0x27ec68=_0x50c863;Scene_MenuBase[_0x27ec68(0x1cd)][_0x27ec68(0x227)][_0x27ec68(0x22f)](this),this[_0x27ec68(0x1d2)](this[_0x27ec68(0x14f)]()),this[_0x27ec68(0x20b)]();},Scene_Quest[_0x50c863(0x1cd)][_0x50c863(0x14f)]=function(){const _0x3a657f=_0x50c863;return VisuMZ['QuestSystem'][_0x3a657f(0x196)]['BgSettings'][_0x3a657f(0x295)];},Scene_Quest[_0x50c863(0x1cd)][_0x50c863(0x20b)]=function(){const _0x556a54=_0x50c863,_0x310616={'BgFilename1':VisuMZ['QuestSystem'][_0x556a54(0x196)][_0x556a54(0x24e)][_0x556a54(0x25c)],'BgFilename2':VisuMZ['QuestSystem'][_0x556a54(0x196)]['BgSettings']['BgFilename2']};_0x310616&&(_0x310616['BgFilename1']!==''||_0x310616[_0x556a54(0x239)]!=='')&&(this[_0x556a54(0x117)]=new Sprite(ImageManager[_0x556a54(0x24c)](_0x310616[_0x556a54(0x25c)])),this['_backSprite2']=new Sprite(ImageManager[_0x556a54(0x22a)](_0x310616[_0x556a54(0x239)])),this[_0x556a54(0x1de)](this[_0x556a54(0x117)]),this[_0x556a54(0x1de)](this[_0x556a54(0x2cf)]),this['_backSprite1']['bitmap'][_0x556a54(0x249)](this[_0x556a54(0x231)]['bind'](this,this['_backSprite1'])),this['_backSprite2']['bitmap'][_0x556a54(0x249)](this[_0x556a54(0x231)][_0x556a54(0x271)](this,this['_backSprite2'])));},Scene_Quest[_0x50c863(0x1cd)][_0x50c863(0x231)]=function(_0x4de91f){const _0x5dbb1e=_0x50c863;this[_0x5dbb1e(0x212)](_0x4de91f),this[_0x5dbb1e(0x2e2)](_0x4de91f);},VisuMZ[_0x50c863(0x23b)]['Window_MenuCommand_addOriginalCommands']=Window_MenuCommand[_0x50c863(0x1cd)]['addOriginalCommands'],Window_MenuCommand[_0x50c863(0x1cd)]['addOriginalCommands']=function(){const _0x2a2fd9=_0x50c863;VisuMZ[_0x2a2fd9(0x23b)][_0x2a2fd9(0x280)][_0x2a2fd9(0x22f)](this),this['addQuestCommand']();},Window_MenuCommand[_0x50c863(0x1cd)][_0x50c863(0x11b)]=function(){const _0x3d38eb=_0x50c863;if(!this[_0x3d38eb(0x14b)]())return;if(!this[_0x3d38eb(0x180)]())return;const _0x187c3e=TextManager[_0x3d38eb(0x209)],_0x27e95=this[_0x3d38eb(0x245)]();this[_0x3d38eb(0x2f8)](_0x187c3e,_0x3d38eb(0x1f0),_0x27e95);},Window_MenuCommand['prototype'][_0x50c863(0x14b)]=function(){const _0x5f073a=_0x50c863;return Imported[_0x5f073a(0x206)]?![]:!![];},Window_MenuCommand[_0x50c863(0x1cd)][_0x50c863(0x180)]=function(){return $gameSystem['isquestMenuShown']();},Window_MenuCommand[_0x50c863(0x1cd)][_0x50c863(0x245)]=function(){const _0x46d739=_0x50c863;return $gameSystem[_0x46d739(0x228)]();},VisuMZ[_0x50c863(0x23b)][_0x50c863(0x311)]=Window_Options['prototype']['addGeneralOptions'],Window_Options['prototype'][_0x50c863(0x16e)]=function(){const _0xff561b=_0x50c863;VisuMZ[_0xff561b(0x23b)][_0xff561b(0x311)][_0xff561b(0x22f)](this),this['addQuestSystemCommands']();},Window_Options[_0x50c863(0x1cd)]['addQuestSystemCommands']=function(){const _0x4a6ad2=_0x50c863;VisuMZ[_0x4a6ad2(0x23b)][_0x4a6ad2(0x196)][_0x4a6ad2(0x2b5)][_0x4a6ad2(0x21d)]&&this[_0x4a6ad2(0x11e)](),VisuMZ['QuestSystem']['Settings'][_0x4a6ad2(0x2b5)][_0x4a6ad2(0x1be)]&&this['addQuestSystemquestTrackerPositionCommand']();},Window_Options[_0x50c863(0x1cd)][_0x50c863(0x11e)]=function(){const _0x3d367b=_0x50c863,_0x3aab92=TextManager[_0x3d367b(0x1db)],_0x19d0e9=_0x3d367b(0x1db);this[_0x3d367b(0x2f8)](_0x3aab92,_0x19d0e9);},Window_Options[_0x50c863(0x1cd)][_0x50c863(0x123)]=function(){const _0x3ef2bc=_0x50c863,_0x398695=TextManager[_0x3ef2bc(0x152)],_0x22e0e9=_0x3ef2bc(0x152);this[_0x3ef2bc(0x2f8)](_0x398695,_0x22e0e9);},VisuMZ[_0x50c863(0x23b)][_0x50c863(0x158)]=Window_Options['prototype'][_0x50c863(0x2d9)],Window_Options[_0x50c863(0x1cd)][_0x50c863(0x2d9)]=function(_0x5d7ede){const _0x25d279=_0x50c863,_0x4e22c3=this['commandSymbol'](_0x5d7ede);if(_0x4e22c3===_0x25d279(0x152)){if(_0x25d279(0x10f)!==_0x25d279(0x10f)){const _0x4f4962=this[_0x25d279(0x2c7)]();this[_0x25d279(0x14d)]=_0x4f4962;}else{const _0x2a70a3=this['getConfigValue'](_0x4e22c3);return _0x2a70a3?TextManager['questTrackerPosOn']:TextManager[_0x25d279(0x2c0)];}}return VisuMZ[_0x25d279(0x23b)]['Window_Options_statusText'][_0x25d279(0x22f)](this,_0x5d7ede);};function Window_QuestCommand(){this['initialize'](...arguments);}Window_QuestCommand['prototype']=Object['create'](Window_Command['prototype']),Window_QuestCommand[_0x50c863(0x1cd)][_0x50c863(0x2bc)]=Window_QuestCommand,Window_QuestCommand[_0x50c863(0x1cd)][_0x50c863(0x265)]=function(_0x4bc6d5){const _0x4352eb=_0x50c863;Window_Command[_0x4352eb(0x1cd)][_0x4352eb(0x265)][_0x4352eb(0x22f)](this,_0x4bc6d5),this[_0x4352eb(0x104)](_0x4bc6d5);},Window_QuestCommand[_0x50c863(0x1cd)][_0x50c863(0x104)]=function(_0x1c3d40){const _0x358cde=_0x50c863,_0x534339=new Rectangle(0x0,0x0,_0x1c3d40[_0x358cde(0x178)],_0x1c3d40[_0x358cde(0x13e)]);this[_0x358cde(0x1b6)]=new Window_Base(_0x534339),this[_0x358cde(0x1b6)][_0x358cde(0x1fb)]=0x0,this[_0x358cde(0x1de)](this[_0x358cde(0x1b6)]),this['updateCommandNameWindow']();},Window_QuestCommand[_0x50c863(0x1cd)][_0x50c863(0x19a)]=function(){const _0x3c2e33=_0x50c863;Window_Command[_0x3c2e33(0x1cd)][_0x3c2e33(0x19a)][_0x3c2e33(0x22f)](this);if(this['_commandNameWindow'])this[_0x3c2e33(0x181)]();if(this['_listWindow'])this[_0x3c2e33(0x142)]['setCategoryFilter'](this[_0x3c2e33(0x266)]());},Window_QuestCommand[_0x50c863(0x1cd)]['updateCommandNameWindow']=function(){const _0x4598f1=_0x50c863,_0x2099b3=this[_0x4598f1(0x1b6)];_0x2099b3[_0x4598f1(0x18b)][_0x4598f1(0x136)]();const _0x18af67=this[_0x4598f1(0x2d6)](this[_0x4598f1(0x1c6)]());if(_0x18af67===_0x4598f1(0x2a4)){if(_0x4598f1(0x165)!=='oZJyn'){const _0xfc1c16=this[_0x4598f1(0x1e2)](this['index']());let _0x53bd2b=this[_0x4598f1(0x214)](this[_0x4598f1(0x1c6)]());_0x53bd2b=_0x53bd2b[_0x4598f1(0x283)](/\\I\[(\d+)\]/gi,''),_0x2099b3[_0x4598f1(0x2a5)](),this[_0x4598f1(0x307)](_0x53bd2b,_0xfc1c16),this[_0x4598f1(0x1e1)](_0x53bd2b,_0xfc1c16),this[_0x4598f1(0x2f4)](_0x53bd2b,_0xfc1c16);}else{if(!_0x9c112b[_0x4598f1(0x116)])return _0x1b7579;if(!_0x5e7af2[_0x4598f1(0x2f1)])return _0x451a28;return _0x452fb9['trim']()[_0x4598f1(0x283)](/[\n\r]/g,'<BR>');}}},Window_QuestCommand[_0x50c863(0x1cd)][_0x50c863(0x307)]=function(_0x5c1afc,_0x5665d1){},Window_QuestCommand['prototype']['commandNameWindowDrawText']=function(_0xac1aa0,_0x11dbc7){const _0x148b2f=_0x50c863,_0x275141=this[_0x148b2f(0x1b6)];_0x275141[_0x148b2f(0x1e9)](_0xac1aa0,0x0,_0x11dbc7['y'],_0x275141[_0x148b2f(0x259)],_0x148b2f(0x1e6));},Window_QuestCommand[_0x50c863(0x1cd)]['commandNameWindowCenter']=function(_0x3ae834,_0x5d3535){const _0x3bfa93=_0x50c863,_0xff8040=this[_0x3bfa93(0x1b6)],_0x2876bf=$gameSystem[_0x3bfa93(0x129)](),_0x139b4c=_0x5d3535['x']+Math[_0x3bfa93(0x2ad)](_0x5d3535['width']/0x2)+_0x2876bf;_0xff8040['x']=_0xff8040[_0x3bfa93(0x178)]/-0x2+_0x139b4c,_0xff8040['y']=Math[_0x3bfa93(0x2ad)](_0x5d3535[_0x3bfa93(0x13e)]/0x2);},Window_QuestCommand[_0x50c863(0x1cd)]['makeCommandList']=function(){const _0x1d7943=_0x50c863;this[_0x1d7943(0x156)](),this[_0x1d7943(0x22e)](),this['addFailedQuestsCommand']();},Window_QuestCommand[_0x50c863(0x1cd)]['addKnownQuestsCommand']=function(){const _0x4c80b3=_0x50c863,_0x508b0e=_0x4c80b3(0x2b3),_0x4e72b9=ImageManager[_0x4c80b3(0x1a2)];let _0xed057e=TextManager[_0x4c80b3(0x185)];_0x4e72b9>0x0&&this[_0x4c80b3(0x1a9)]()!==_0x4c80b3(0x303)&&(_0xed057e=_0x4c80b3(0x1c2)[_0x4c80b3(0x119)](_0x4e72b9,_0xed057e));const _0x1154d2=this['isKnownQuestsEnabled']();this[_0x4c80b3(0x2f8)](_0xed057e,_0x508b0e,_0x1154d2);},Window_QuestCommand['prototype'][_0x50c863(0x115)]=function(){const _0x3cf66b=_0x50c863;return $gameSystem[_0x3cf66b(0x2a2)]()[_0x3cf66b(0x10c)]>0x0;},Window_QuestCommand[_0x50c863(0x1cd)][_0x50c863(0x22e)]=function(){const _0x3c7086=_0x50c863,_0x13447d=_0x3c7086(0x138),_0x2d5279=ImageManager[_0x3c7086(0x27f)];let _0x49c68b=TextManager[_0x3c7086(0x1ba)];if(_0x2d5279>0x0&&this[_0x3c7086(0x1a9)]()!==_0x3c7086(0x303)){if(_0x3c7086(0x10e)!==_0x3c7086(0x230))_0x49c68b=_0x3c7086(0x1c2)[_0x3c7086(0x119)](_0x2d5279,_0x49c68b);else{_0x35b343=_0x1096ab[_0x3c7086(0x1af)]()['trim']();const _0x161286=this['quest'](_0x5dc03c);if(!_0x161286)return'';const _0x446718=this[_0x3c7086(0x1a0)]();return _0x446718['objectivesCompleted']=_0x446718[_0x3c7086(0x130)]||{},_0x446718[_0x3c7086(0x130)][_0x5ed364]=_0x446718[_0x3c7086(0x130)][_0x132ab2]||[],_0x446718[_0x3c7086(0x130)][_0x3bde8a][_0x3c7086(0x1cf)]((_0x44d7ed,_0x11bad1)=>_0x44d7ed-_0x11bad1);}}const _0x11869a=this['isCompletedQuestsEnabled']();this[_0x3c7086(0x2f8)](_0x49c68b,_0x13447d,_0x11869a);},Window_QuestCommand[_0x50c863(0x1cd)][_0x50c863(0x28f)]=function(){const _0x1aea1c=_0x50c863;return $gameSystem[_0x1aea1c(0x17f)]()[_0x1aea1c(0x10c)]>0x0;},Window_QuestCommand['prototype'][_0x50c863(0x1a5)]=function(){const _0x494caf=_0x50c863;if(!this[_0x494caf(0x1f8)]())return;const _0xc4e869=_0x494caf(0x267),_0x1f797f=ImageManager[_0x494caf(0x2bd)];let _0x43dab9=TextManager['questFailedCmd'];_0x1f797f>0x0&&this[_0x494caf(0x1a9)]()!==_0x494caf(0x303)&&(_0x43dab9=_0x494caf(0x1c2)[_0x494caf(0x119)](_0x1f797f,_0x43dab9));const _0x40b1fe=this['isFailedQuestsEnabled']();this[_0x494caf(0x2f8)](_0x43dab9,_0xc4e869,_0x40b1fe);},Window_QuestCommand[_0x50c863(0x1cd)]['isFailedQuestsVisible']=function(){const _0x507474=_0x50c863;return VisuMZ[_0x507474(0x23b)][_0x507474(0x196)][_0x507474(0x160)][_0x507474(0x21c)];},Window_QuestCommand[_0x50c863(0x1cd)][_0x50c863(0x191)]=function(){const _0x12402c=_0x50c863;return $gameSystem[_0x12402c(0x1f7)]()[_0x12402c(0x10c)]>0x0;},Window_QuestCommand['prototype']['totalCommands']=function(){const _0x11a36c=_0x50c863;return this[_0x11a36c(0x1f8)]()?0x3:0x2;},Window_QuestCommand[_0x50c863(0x1cd)][_0x50c863(0x127)]=function(){const _0xe7f57d=_0x50c863;return VisuMZ[_0xe7f57d(0x23b)][_0xe7f57d(0x196)][_0xe7f57d(0x160)]['CmdTextAlign'];},Window_QuestCommand[_0x50c863(0x1cd)][_0x50c863(0x166)]=function(_0x510c15){const _0x323bfb=_0x50c863,_0x36cb25=this[_0x323bfb(0x2d6)](_0x510c15);if(_0x36cb25===_0x323bfb(0x1fd))'okSiX'==='okSiX'?this['drawItemStyleIconText'](_0x510c15):this[_0x323bfb(0x1db)]=!![];else{if(_0x36cb25===_0x323bfb(0x2a4)){if(_0x323bfb(0x2c9)==='crBbg'){if(_0x11b857['uiMenuStyle']&&_0x2f2cde[_0x323bfb(0x1b8)]!==_0x4332fd)return _0x82516e[_0x323bfb(0x1b8)];else return _0x59550e['uiMenuStyle']===![]?![]:_0x356599[_0x323bfb(0x1cd)][_0x323bfb(0x2a9)][_0x323bfb(0x22f)](this);}else this[_0x323bfb(0x29e)](_0x510c15);}else _0x323bfb(0x296)===_0x323bfb(0x272)?_0xab5927=_0x323bfb(0x1c2)[_0x323bfb(0x119)](_0x46c7f5,_0x2b1720):Window_HorzCommand[_0x323bfb(0x1cd)][_0x323bfb(0x166)][_0x323bfb(0x22f)](this,_0x510c15);}},Window_QuestCommand[_0x50c863(0x1cd)][_0x50c863(0x1a9)]=function(){const _0x302816=_0x50c863;return VisuMZ[_0x302816(0x23b)][_0x302816(0x196)][_0x302816(0x160)][_0x302816(0x149)];},Window_QuestCommand[_0x50c863(0x1cd)][_0x50c863(0x2d6)]=function(_0x3a9209){const _0x63508=_0x50c863;if(_0x3a9209<0x0)return _0x63508(0x303);const _0x3d6fb4=this[_0x63508(0x1a9)]();if(_0x3d6fb4!=='auto')return _0x3d6fb4;else{if(this[_0x63508(0x14c)]()>0x0){const _0x3a4526=this['commandName'](_0x3a9209);if(_0x3a4526[_0x63508(0x1aa)](/\\I\[(\d+)\]/i)){const _0xeb4b1f=this[_0x63508(0x1e2)](_0x3a9209),_0x39f468=this['textSizeEx'](_0x3a4526)[_0x63508(0x178)];if(_0x39f468<=_0xeb4b1f[_0x63508(0x178)]){if(_0x63508(0x25e)!=='Foilq')return _0x63508(0x1fd);else{const _0x4c6468=_0xfa449f['x']+_0xa09b17['floor']((_0xb2437d[_0x63508(0x178)]-_0x6aa516)/0x2);this[_0x63508(0x18c)](_0x2c6555,_0x4c6468,_0x1dc399['y'],_0x226011);}}else{if(_0x63508(0x10d)===_0x63508(0x17d))this[_0x63508(0x279)]+=this['lineHeight'](),_0x12b9d7[_0x63508(0x116)]&&(this['_textHeight']+=this[_0x63508(0x1bc)]()*0x4);else return _0x63508(0x2a4);}}}}return'text';},Window_QuestCommand[_0x50c863(0x1cd)][_0x50c863(0x128)]=function(_0x458d4c){const _0x14c0e6=_0x50c863,_0x1b258e=this[_0x14c0e6(0x1e2)](_0x458d4c),_0x47e8c0=this['commandName'](_0x458d4c),_0x40b566=this[_0x14c0e6(0x11f)](_0x47e8c0)[_0x14c0e6(0x178)];this[_0x14c0e6(0x233)](this[_0x14c0e6(0x27e)](_0x458d4c));const _0x37286e=this[_0x14c0e6(0x127)]();if(_0x37286e===_0x14c0e6(0x298))this['drawTextEx'](_0x47e8c0,_0x1b258e['x']+_0x1b258e['width']-_0x40b566,_0x1b258e['y'],_0x40b566);else{if(_0x37286e===_0x14c0e6(0x1e6)){const _0x3aeb16=_0x1b258e['x']+Math['floor']((_0x1b258e[_0x14c0e6(0x178)]-_0x40b566)/0x2);this[_0x14c0e6(0x18c)](_0x47e8c0,_0x3aeb16,_0x1b258e['y'],_0x40b566);}else this[_0x14c0e6(0x18c)](_0x47e8c0,_0x1b258e['x'],_0x1b258e['y'],_0x40b566);}},Window_QuestCommand[_0x50c863(0x1cd)][_0x50c863(0x29e)]=function(_0xf80483){const _0x35a61f=_0x50c863;this['commandName'](_0xf80483)['match'](/\\I\[(\d+)\]/i);const _0x29f0a3=Number(RegExp['$1'])||0x0,_0x1f1442=this[_0x35a61f(0x1e2)](_0xf80483),_0x7725bf=_0x1f1442['x']+Math[_0x35a61f(0x2ad)]((_0x1f1442[_0x35a61f(0x178)]-ImageManager[_0x35a61f(0x2eb)])/0x2),_0x2afaaf=_0x1f1442['y']+(_0x1f1442[_0x35a61f(0x13e)]-ImageManager[_0x35a61f(0x192)])/0x2;this[_0x35a61f(0x2a6)](_0x29f0a3,_0x7725bf,_0x2afaaf);},Window_QuestCommand['prototype'][_0x50c863(0x1f1)]=function(_0x189f11){const _0x45bd38=_0x50c863;this[_0x45bd38(0x142)]=_0x189f11,this[_0x45bd38(0x19a)]();};function _0x12c9(){const _0x242898=['note','questButtonAssistExpand','PGCNq','setBackgroundType','SKQIn','innerRect','AdjustRect','addGeneralOptions','SystemCallSceneQuest','createQuestLogWindow','21bSwftp','createQuestLabelWindow','CommandWindow_BgType','deactivate','initQuestSystem','buttonAssistText4','doesCategoryHaveQuestsAvailable','width','createQuestDescription','questLogWindowRect','1777qrwZRN','GUsRM','anCwz','questTrackerOnRight','questsCompleted','isQuestCommandVisible','updateCommandNameWindow','LogWindow_Auto_WordWrap','Difficulty','makeCommandList','questKnownCmd','NUM','value','MessageCore','remove','fail','contents','drawTextEx','helpAreaHeight','isQuestFailed','_doodadEditorMode','finalizeWordWrapSupport','isFailedQuestsEnabled','iconHeight','hSHaZ','rOwvd','General','Settings','noMessageCoreRemoveEscapeCodes','questTrackerFmt','makeQuestList','callUpdateHelp','Status','setTrackedQuest','scrollBlockWidth','isCurrentCategoryOpen','<BR>','questData','rewards','questKnownIcon','359670ZCzicn','setHandler','addFailedQuestsCommand','update','fxBCn','QuestQuote','commandStyle','match','18mcCbye','setQuestStatus','NkSze','showTracker','toUpperCase','isTransferring','_scrollBaseY','zynff','lSdwg','isQuestTrackerVisible','EmptyTitleLabel','_commandNameWindow','createQuestObjectives','uiInputPosition','commandQuest','questCompletedCmd','parameters','lineHeight','_hasDiedBefore','AddPositionOption','screenY','push','worldTransform','\x5cI[%1]%2','tradeItemWithParty','Location','ZDayr','index','addWindow','isQuestCompleted','subtext','_categoryFilter','_isRefreshingQuestTrackerWindow','updateLogWindow','prototype','TrackerWindow_Rect','sort','applyInverse','setLogWindow','setBackgroundOpacity','Show','oRszl','onDatabaseLoaded','TargetIDs','QuestSet','xKakO','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','MSKmJ','questTrackerShow','complete','Reward_Normal_Fmt','addChild','_tradeItemWithParty','JSON','commandNameWindowDrawText','itemLineRect','_scrollY','numItems','ListWindow_Rect','center','deny','openCloseCurrentCategory','drawText','overallHeight','exit','questLabelWindowRect','MainMenu','concat','smoothSelect','quest','setListWindow','show','enemy','updateVisibility','refresh','currentQuest','questsFailed','isFailedQuestsVisible','Scene_Map_createSpriteset','CommandWindow_Known_Icon','opacity','1298940hXHMzm','iconText','ButtonAssistPageUpDown','questObjectives','deselect','questJournalSystemAddDeath','questSubtext','applyWordWrapEntry','setCategoryFilter','updateDelayRefresh','VisuMZ_1_MainMenuCore','mainCommandWidth','STRUCT','questCommandName','CLOSE_FADE_SPEED','createCustomBackgroundImages','gainItem','screenX','updatePageUpDownScroll','setQuestObjectives','questQuote','krhIy','scaleSprite','max','commandName','pageup','NUdlT','_questTrackerWindow','hwQxi','objectivesFailed','smoothScrollUp','create','ShowFailed','AddShowOption','enabled','TargetID','SystemEnableQuestMenu','LogWindow_ScrollSpeed','FUNC','OFSyN','Description','CommandWindow_Rect','updateScrollBase','createBackground','isquestMenuEnabled','PositionName','loadTitle2','OxwMr','OqXPI','onCommandOk','addCompletedQuestsCommand','call','TajNS','adjustSprite','VisibleObjectives','changePaintOpacity','CategoryName','cDLYC','_logWindow','SystemShowQuestMenu','makeData','BgFilename2','CommandWindow_Failed_Icon','QuestSystem','CompassFadeSpeed','denied','status','quotes','unshift','mSeIm','Objective_Completed_Fmt','tracked','ARRAYJSON','isQuestCommandEnabled','_scrollX','_messageWindow','initCategories','addLoadListener','shown','jqqNe','loadTitle1','createQuestSubtext','BgSettings','currentExt','Rewards','Scene_Menu_createCommandWindow','tileHeight','bitmap','removed','ShowMainMenu','vKTIS','WpYlR','defaultQuestTrackerFmt','innerWidth','ListWindowTrackedQuest','_quests','BgFilename1','_scrollBaseX','ryOGv','createEmptyText','uImQs','Scene_Boot_onDatabaseLoaded','LogWindow_Rect','rewardsClaimed','setQuestTrackerVisible','initialize','currentSymbol','failed','questTrackedQuestFmt','setQuestDescription','Reward_Completed_Fmt','xsBmw','ButtonAssistCollapse','return\x200','questObjectiveClearedFmt','map','applyData','bind','WJICo','CompletedQuests','convertLineBreaksForWordWrap','baseTextRect','description','drawAllText','_categoryStatus','_textHeight','isEnemy','MinCompassOpacity','updateLabelWindow','From','isCommandEnabled','questCompletedIcon','Window_MenuCommand_addOriginalCommands','activate','iUexs','replace','LineBreakSpace','addCategoryCommand','objectives','categoryList','questLogFmt','CommandWindow_Completed_Icon','zUPHl','version','Keys','Dxlmj','ConfigManager_makeData','isCompletedQuestsEnabled','EnableMainMenu','_commandWindow','TrackerFmt','updateOrigin','Game_BattlerBase_addNewState','SnapshotOpacity','QgBmC','getEmptyLogFmt','right','contentsHeight','Quests','KnownQuests','isSceneMap','setQuest','drawItemStyleIcon','questListWindowRect','inBattle','ARRAYEVAL','questsKnown','wpIBu','icon','resetFontSettings','drawIcon','questButtonAssistCollapse','scrollSpeed','isRightInputMode','CommandWindow_Known_Text','questEmptyText','questRewardsDeniedFmt','floor','CommandWindow_Failed_Text','QuestLabel_BgType','questTrackerPosOn','scale','FuzPY','known','_list','Tracker','InIKF','questJournalSystemGainItem','ShowName','thQxo','trackedQuest','hvsmE','constructor','questFailedIcon','filter','Key','questTrackerPosOff','noQuestsLabel','createContents','isDead','QuestLabel_Rect','QuestObjectives','questRewardsDenied','visibilityLevel','ButtonAssistExpand','bEYCi','calculateTextHeight','questRewardsClaimed','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','joinQuestEntries','CBohq','_backSprite2','TrackerChangeQuest','180FuLVuU','ConfigManager_applyData','ListWindowCategoryCloseFmt','makeDeepCopy','clamp','commandStyleCheck','Objective_Normal_Fmt','questButtonAssistActive','statusText','jxQkw','setQuestQuote','createQuestText','onListCancel','contains','QuestData','questFailedCmd','OnLoadQuestJS','centerSprite','TOsTt','_scene','createCommandWindow','registerCommand','ConvertParams','parse','rewardsDenied','questObjectivesFailed','iconWidth','isPressed','createQuestRewards','setQuestSubtext','Game_Battler_useItem','_quest','VisuMZ_1_MessageCore','itemPadding','PositionOn','commandNameWindowCenter','isCloseToQuestTrackerScreenPosition','_delayDraw','xmhcF','addCommand','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','HWcsS','requestRefresh','hXtts','commandSymbol','questObjectiveNormalFmt','ListWindow_BgType','zTadh','QuestDescription','isquestMenuShown','text','trim','isQuestKnown','_labelWindow','commandNameWindowDrawBackground','popScene','processWheelScroll','isCategoryOpen','noQuestsListed','setQuestForQuestTrackerWindow','createQuestQuote','532232pmXAWg','LogEmpty','category','Window_Options_addGeneralOptions','uiMenuStyle','umbPS','QuestOrder','addNoQuestsListedCommand','claim','questCategoryClosedFmt','TrackedQuest','createCommandNameWindow','TrackerWindow_BgType','Objectives','Quotes','CLOSE_MINIMUM_OPACITY','pagedown','questRewardsClaimedFmt','commandWindowRect','length','WKMOz','WVAPN','cFPBB','origin','CommandWindow_Completed_Text','getTotalCategoryQuests','questRewardsNormalFmt','isOkEnabled','isKnownQuestsEnabled','wordWrapSupport','_backSprite1','FailedQuests','format','deathStateId','addQuestCommand','wTtdd','1351915gOhynK','addQuestSystemquestTrackerShowCommand','textSizeEx','EVAL','syybd','maxCommands','addQuestSystemquestTrackerPositionCommand','Reward_Failed_Fmt','backOpacity','Name','itemTextAlign','drawItemStyleIconText','windowPadding','questObjectivesCompleted','scrollBlockHeight','process_VisuMZ_QuestSystem_Data','VisibleRewards','createQuestListWindow','questDescription','objectivesCompleted','cursorPagedown','ListWindowCategoryOpenFmt','questButtonAssistPageUpDn','questTrackerWindow','contentsOpacity','clear','Categories','completed','65390jJohdB','Title','setQuestRewards','questObjectiveFailedFmt','applyWordWrap','height','sKhvz','cancel','NhbDv','_listWindow','Scene_Options_maxCommands','refreshQuestTrackerWindow','updateOpacity','Game_Map_requestRefresh','Game_Party_gainItem','active','CmdStyle','includes','addQuestCommandAutomatically','maxItems','openness','aZXrM','getBackgroundOpacity','TrackerRefreshWindow','questRewards','questTrackerPosition','ARRAYSTR','Game_Actor_tradeItemWithParty','join','addKnownQuestsCommand','_questTrackerRefresh','Window_Options_statusText','xUiSF','name','setValue','448800tMxzOE','getQuestLogFmt','onListCategory','boxWidth','Window','ARRAYNUM','currentCategory','LogFmt','fNjfj','ppqMO','drawItem'];_0x12c9=function(){return _0x242898;};return _0x12c9();}function Window_QuestList(){const _0x3213fb=_0x50c863;this[_0x3213fb(0x265)](...arguments);}Window_QuestList[_0x50c863(0x287)]=VisuMZ['QuestSystem']['Settings'][_0x50c863(0x137)],Window_QuestList[_0x50c863(0x1cd)]=Object[_0x50c863(0x21b)](Window_Command['prototype']),Window_QuestList['prototype'][_0x50c863(0x2bc)]=Window_QuestList,Window_QuestList[_0x50c863(0x1cd)][_0x50c863(0x265)]=function(_0x31b790){const _0x3e3bb3=_0x50c863;this[_0x3e3bb3(0x248)](),Window_Command[_0x3e3bb3(0x1cd)][_0x3e3bb3(0x265)]['call'](this,_0x31b790),this[_0x3e3bb3(0x104)](_0x31b790),this[_0x3e3bb3(0x174)](),this[_0x3e3bb3(0x200)]();},Window_QuestList[_0x50c863(0x1cd)]['initCategories']=function(){const _0x3846d4=_0x50c863;this[_0x3846d4(0x278)]={};for(const _0x311048 of VisuMZ['QuestSystem']['Settings'][_0x3846d4(0x137)]){if('FAJFF'===_0x3846d4(0x14e)){const _0x223fe3=_0x50f978['QuestSystem']['Settings']['General'],_0x84ef7e=_0x17034f[_0x3846d4(0x23b)][_0x3846d4(0x196)][_0x3846d4(0x1ed)];this[_0x3846d4(0x25b)]={'shown':_0x84ef7e[_0x3846d4(0x255)],'enabled':_0x84ef7e['EnableMainMenu'],'known':[],'completed':[],'failed':[],'description':{},'objectives':{},'objectivesCompleted':{},'objectivesFailed':{},'rewards':{},'rewardsClaimed':{},'rewardsDenied':{},'subtext':{},'quotes':{},'tracked':_0x223fe3['TrackedQuest'][_0x3846d4(0x1af)]()[_0x3846d4(0x304)](),'showTracker':!![]};for(const _0x20d415 of _0x223fe3['KnownQuests']){this[_0x3846d4(0x1ac)](_0x20d415,_0x3846d4(0x2b3));}for(const _0x468840 of _0x223fe3[_0x3846d4(0x273)]){this[_0x3846d4(0x1ac)](_0x468840,_0x3846d4(0x138));}for(const _0x3e9ad7 of _0x223fe3[_0x3846d4(0x118)]){this[_0x3846d4(0x1ac)](_0x3e9ad7,_0x3846d4(0x267));}}else this[_0x3846d4(0x278)][_0x311048[_0x3846d4(0x234)]]=!![];}this[_0x3846d4(0x1ca)]=_0x3846d4(0x2b3);},Window_QuestList[_0x50c863(0x1cd)][_0x50c863(0x204)]=function(_0x21ebf6){const _0x5a1e6e=_0x50c863;if(this[_0x5a1e6e(0x1ca)]===_0x21ebf6)return;this[_0x5a1e6e(0x1ca)]=_0x21ebf6,this['refresh']();},Window_QuestList[_0x50c863(0x1cd)]['openCloseCurrentCategory']=function(){const _0x31b6fb=_0x50c863,_0x4eff78=this['currentCategory']();this[_0x31b6fb(0x278)][_0x4eff78['CategoryName']]=!this[_0x31b6fb(0x278)][_0x4eff78['CategoryName']],this[_0x31b6fb(0x1f5)](),this[_0x31b6fb(0x19a)]();},Window_QuestList['prototype'][_0x50c863(0x19e)]=function(){const _0x4976ea=_0x50c863,_0x482a44=this[_0x4976ea(0x162)]();return _0x482a44&&this[_0x4976ea(0x278)][_0x482a44[_0x4976ea(0x234)]];},Window_QuestList[_0x50c863(0x1cd)][_0x50c863(0x104)]=function(_0x3145cb){const _0x21412e=_0x50c863,_0x69f253=new Rectangle(0x0,0x0,_0x3145cb['width'],_0x3145cb[_0x21412e(0x13e)]);this[_0x21412e(0x1b6)]=new Window_Base(_0x69f253),this[_0x21412e(0x1b6)][_0x21412e(0x1fb)]=0x0,this[_0x21412e(0x1de)](this[_0x21412e(0x1b6)]),this['updateCommandNameWindow']();},Window_QuestList[_0x50c863(0x1cd)][_0x50c863(0x19a)]=function(){const _0x1736f5=_0x50c863;Window_Command[_0x1736f5(0x1cd)][_0x1736f5(0x19a)][_0x1736f5(0x22f)](this);if(this[_0x1736f5(0x1b6)])this[_0x1736f5(0x181)]();if(this[_0x1736f5(0x306)])this[_0x1736f5(0x27c)]();if(this['_logWindow'])this['updateLogWindow']();},Window_QuestList['prototype'][_0x50c863(0x181)]=function(){const _0x1c1ac4=_0x50c863,_0x370c57=this['_commandNameWindow'];_0x370c57[_0x1c1ac4(0x18b)]['clear']();const _0x5ebdc8=this[_0x1c1ac4(0x2d6)](this[_0x1c1ac4(0x1c6)]());if(_0x5ebdc8==='icon'){const _0x5b4839=this['itemLineRect'](this['index']());let _0x9e0769=this[_0x1c1ac4(0x214)](this[_0x1c1ac4(0x1c6)]());_0x9e0769=_0x9e0769[_0x1c1ac4(0x283)](/\\I\[(\d+)\]/gi,''),_0x370c57['resetFontSettings'](),this[_0x1c1ac4(0x307)](_0x9e0769,_0x5b4839),this[_0x1c1ac4(0x1e1)](_0x9e0769,_0x5b4839),this[_0x1c1ac4(0x2f4)](_0x9e0769,_0x5b4839);}},Window_QuestList['prototype'][_0x50c863(0x307)]=function(_0x59fe36,_0x1517fe){},Window_QuestList[_0x50c863(0x1cd)]['commandNameWindowDrawText']=function(_0x5decc9,_0x6ea5f4){const _0x429496=_0x50c863,_0x2b8f5c=this[_0x429496(0x1b6)];_0x2b8f5c[_0x429496(0x1e9)](_0x5decc9,0x0,_0x6ea5f4['y'],_0x2b8f5c[_0x429496(0x259)],_0x429496(0x1e6));},Window_QuestList['prototype'][_0x50c863(0x2f4)]=function(_0xee622d,_0xf873b6){const _0x1b263a=_0x50c863,_0x3279a8=this[_0x1b263a(0x1b6)],_0x25a5fc=$gameSystem[_0x1b263a(0x129)](),_0x56d3c=_0xf873b6['x']+Math[_0x1b263a(0x2ad)](_0xf873b6[_0x1b263a(0x178)]/0x2)+_0x25a5fc;_0x3279a8['x']=_0x3279a8[_0x1b263a(0x178)]/-0x2+_0x56d3c,_0x3279a8['y']=Math[_0x1b263a(0x2ad)](_0xf873b6[_0x1b263a(0x13e)]/0x2);},Window_QuestList['prototype'][_0x50c863(0x184)]=function(){const _0x2e1f12=_0x50c863;for(const _0x45adc7 of Window_QuestList['categoryList']){if(_0x2e1f12(0x2da)!==_0x2e1f12(0x300)){if(!_0x45adc7)continue;if(!this[_0x2e1f12(0x177)](_0x45adc7))continue;this[_0x2e1f12(0x285)](_0x45adc7),this[_0x2e1f12(0x199)](_0x45adc7);}else{const _0x16420e=this[_0x2e1f12(0x10b)](),_0x17e5e6=new _0x191712(_0x16420e);_0x17e5e6['setHandler'](_0x2e1f12(0x2b3),this[_0x2e1f12(0x22d)][_0x2e1f12(0x271)](this)),_0x17e5e6[_0x2e1f12(0x1a4)](_0x2e1f12(0x138),this['onCommandOk'][_0x2e1f12(0x271)](this)),_0x17e5e6['setHandler'](_0x2e1f12(0x267),this['onCommandOk'][_0x2e1f12(0x271)](this)),_0x17e5e6[_0x2e1f12(0x1a4)](_0x2e1f12(0x140),this[_0x2e1f12(0x308)][_0x2e1f12(0x271)](this)),this[_0x2e1f12(0x1c7)](_0x17e5e6),this[_0x2e1f12(0x291)]=_0x17e5e6,_0x17e5e6['setBackgroundType'](_0x4757bd[_0x2e1f12(0x23b)][_0x2e1f12(0x196)][_0x2e1f12(0x160)][_0x2e1f12(0x173)]);}}this[_0x2e1f12(0x2b4)]['length']<=0x0&&this[_0x2e1f12(0x100)]();},Window_QuestList['prototype'][_0x50c863(0x100)]=function(){const _0x218135=_0x50c863;this[_0x218135(0x2f8)](TextManager[_0x218135(0x30b)],'cancel',![]);},Window_QuestList['prototype'][_0x50c863(0x177)]=function(_0x9ca0c7){const _0x3738ee=_0x50c863;for(const _0x35d8aa of _0x9ca0c7[_0x3738ee(0x29a)]){if(_0x3738ee(0x22c)==='AcZka')_0x2168ad(_0x3738ee(0x1d9)[_0x3738ee(0x119)](_0x1a6a12,_0x5423a5)),_0x2d66fa[_0x3738ee(0x1eb)]();else{if(!_0x35d8aa)continue;switch(this['_categoryFilter']){case _0x3738ee(0x2b3):if($gameSystem[_0x3738ee(0x305)](_0x35d8aa[_0x3738ee(0x2bf)]))return!![];break;case _0x3738ee(0x138):if($gameSystem[_0x3738ee(0x1c8)](_0x35d8aa[_0x3738ee(0x2bf)]))return!![];break;case _0x3738ee(0x267):if($gameSystem[_0x3738ee(0x18e)](_0x35d8aa[_0x3738ee(0x2bf)]))return!![];break;}}}return![];},Window_QuestList[_0x50c863(0x1cd)][_0x50c863(0x285)]=function(_0x55f56f){const _0x45d13e=_0x50c863,_0x4e4500=this[_0x45d13e(0x30a)](_0x55f56f)?TextManager['questCategoryOpenedFmt']:TextManager[_0x45d13e(0x102)],_0x14fce1=this['getTotalCategoryQuests'](_0x55f56f)['length'],_0x412a5c=_0x4e4500['format'](_0x55f56f[_0x45d13e(0x234)],_0x14fce1);this[_0x45d13e(0x2f8)](_0x412a5c,'category',!![],_0x55f56f);},Window_QuestList[_0x50c863(0x1cd)][_0x50c863(0x112)]=function(_0x348f6b){const _0xeb31d3=_0x50c863;switch(this[_0xeb31d3(0x1ca)]){case _0xeb31d3(0x2b3):return $gameSystem[_0xeb31d3(0x2a2)]()['filter'](_0x39cbb0=>_0x39cbb0[_0xeb31d3(0x310)]===_0x348f6b);break;case _0xeb31d3(0x138):return $gameSystem[_0xeb31d3(0x17f)]()[_0xeb31d3(0x2be)](_0x3b411=>_0x3b411[_0xeb31d3(0x310)]===_0x348f6b);break;case _0xeb31d3(0x267):return $gameSystem[_0xeb31d3(0x1f7)]()[_0xeb31d3(0x2be)](_0x44fbac=>_0x44fbac[_0xeb31d3(0x310)]===_0x348f6b);break;}return[];},Window_QuestList['prototype'][_0x50c863(0x199)]=function(_0x1a85e4){const _0x5c782c=_0x50c863;if(!this[_0x5c782c(0x30a)](_0x1a85e4))return;for(const _0x5eeaad of _0x1a85e4[_0x5c782c(0x29a)]){if(!_0x5eeaad)continue;switch(this[_0x5c782c(0x1ca)]){case _0x5c782c(0x2b3):if($gameSystem[_0x5c782c(0x305)](_0x5eeaad['Key']))this[_0x5c782c(0x11b)](_0x5eeaad);break;case'completed':if($gameSystem['isQuestCompleted'](_0x5eeaad[_0x5c782c(0x2bf)]))this[_0x5c782c(0x11b)](_0x5eeaad);break;case _0x5c782c(0x267):if($gameSystem[_0x5c782c(0x18e)](_0x5eeaad['Key']))this[_0x5c782c(0x11b)](_0x5eeaad);break;}}},Window_QuestList[_0x50c863(0x1cd)]['isCategoryOpen']=function(_0x137be2){const _0x1aa59c=_0x50c863;return this['_categoryStatus'][_0x137be2[_0x1aa59c(0x234)]];},Window_QuestList['prototype']['addQuestCommand']=function(_0x1706cb){const _0x2fcf25=_0x50c863;let _0x364285=_0x1706cb['Title'];_0x1706cb===$gameSystem[_0x2fcf25(0x2ba)]()&&(_0x364285=TextManager[_0x2fcf25(0x268)][_0x2fcf25(0x119)](_0x364285)),this['addCommand'](_0x364285,_0x2fcf25(0x1f0),!![],_0x1706cb);},Window_QuestList['prototype'][_0x50c863(0x127)]=function(){return'left';},Window_QuestList[_0x50c863(0x1cd)][_0x50c863(0x166)]=function(_0x1d5db9){const _0x5dbcc0=_0x50c863,_0x2fa6ae=this[_0x5dbcc0(0x2d6)](_0x1d5db9);if(_0x2fa6ae===_0x5dbcc0(0x1fd))this[_0x5dbcc0(0x128)](_0x1d5db9);else _0x2fa6ae===_0x5dbcc0(0x2a4)?this['drawItemStyleIcon'](_0x1d5db9):_0x5dbcc0(0x260)===_0x5dbcc0(0x28a)?(this[_0x5dbcc0(0x212)](_0x26f0c4),this[_0x5dbcc0(0x2e2)](_0x3d73aa)):Window_HorzCommand[_0x5dbcc0(0x1cd)][_0x5dbcc0(0x166)][_0x5dbcc0(0x22f)](this,_0x1d5db9);},Window_QuestList[_0x50c863(0x1cd)][_0x50c863(0x1a9)]=function(){const _0x184bda=_0x50c863;return _0x184bda(0x1fd);},Window_QuestList[_0x50c863(0x1cd)][_0x50c863(0x2d6)]=function(_0x9c44fe){const _0x53180c=_0x50c863;if(_0x9c44fe<0x0)return _0x53180c(0x303);const _0x4523ae=this[_0x53180c(0x1a9)]();if(_0x4523ae!=='auto')return _0x4523ae;else{if(this[_0x53180c(0x14c)]()>0x0){const _0x38b965=this['commandName'](_0x9c44fe);if(_0x38b965[_0x53180c(0x1aa)](/\\I\[(\d+)\]/i)){if('POYRE'===_0x53180c(0x2ce)){const _0x301f48=this['questData']();return _0x301f48['known']=_0x301f48[_0x53180c(0x2b3)]||[],_0x49a31d=_0x431b65['toUpperCase']()[_0x53180c(0x304)](),_0x301f48['known'][_0x53180c(0x14a)](_0x3fb7d4);}else{const _0x45dd85=this[_0x53180c(0x1e2)](_0x9c44fe),_0x14f50e=this[_0x53180c(0x11f)](_0x38b965)[_0x53180c(0x178)];return _0x14f50e<=_0x45dd85['width']?'iconText':'icon';}}}}return _0x53180c(0x303);},Window_QuestList[_0x50c863(0x1cd)][_0x50c863(0x128)]=function(_0x4e117f){const _0x2228af=_0x50c863,_0x3268e4=this[_0x2228af(0x1e2)](_0x4e117f),_0x2fd73d=this[_0x2228af(0x214)](_0x4e117f),_0x1b56ec=this[_0x2228af(0x11f)](_0x2fd73d)['width'];this[_0x2228af(0x233)](this['isCommandEnabled'](_0x4e117f));const _0x196adf=this[_0x2228af(0x127)]();if(_0x196adf===_0x2228af(0x298)){if('lLQIX'===_0x2228af(0x11c)){if(_0x385831[_0x2228af(0x157)])return;_0x52b022[_0x2228af(0x157)]=!![],_0x541a70[_0x2228af(0x1cd)][_0x2228af(0x1f5)][_0x2228af(0x22f)](this),this[_0x2228af(0x16a)](this[_0x2228af(0x2f0)]?_0x4f0c3d['activeBgType']:0x2),_0x14622c[_0x2228af(0x157)]=![];}else this[_0x2228af(0x18c)](_0x2fd73d,_0x3268e4['x']+_0x3268e4[_0x2228af(0x178)]-_0x1b56ec,_0x3268e4['y'],_0x1b56ec);}else{if(_0x196adf===_0x2228af(0x1e6)){const _0x4d855e=_0x3268e4['x']+Math[_0x2228af(0x2ad)]((_0x3268e4['width']-_0x1b56ec)/0x2);this[_0x2228af(0x18c)](_0x2fd73d,_0x4d855e,_0x3268e4['y'],_0x1b56ec);}else this[_0x2228af(0x18c)](_0x2fd73d,_0x3268e4['x'],_0x3268e4['y'],_0x1b56ec);}},Window_QuestList[_0x50c863(0x1cd)]['drawItemStyleIcon']=function(_0x15eb5a){const _0xb16b25=_0x50c863;this[_0xb16b25(0x214)](_0x15eb5a)[_0xb16b25(0x1aa)](/\\I\[(\d+)\]/i);const _0x3d9b74=Number(RegExp['$1'])||0x0,_0xfef933=this['itemLineRect'](_0x15eb5a),_0x3c4a73=_0xfef933['x']+Math[_0xb16b25(0x2ad)]((_0xfef933[_0xb16b25(0x178)]-ImageManager['iconWidth'])/0x2),_0x28f626=_0xfef933['y']+(_0xfef933[_0xb16b25(0x13e)]-ImageManager[_0xb16b25(0x192)])/0x2;this[_0xb16b25(0x2a6)](_0x3d9b74,_0x3c4a73,_0x28f626);},Window_QuestList[_0x50c863(0x1cd)][_0x50c863(0x162)]=function(){const _0x94970a=_0x50c863;return this[_0x94970a(0x266)]()===_0x94970a(0x310)?this[_0x94970a(0x24f)]():null;},Window_QuestList[_0x50c863(0x1cd)][_0x50c863(0x1f6)]=function(){const _0xa9cc08=_0x50c863;return this[_0xa9cc08(0x266)]()==='quest'?this[_0xa9cc08(0x24f)]():null;},Window_QuestList['prototype']['setLabelWindow']=function(_0x1ebee7){const _0xee67bc=_0x50c863;this[_0xee67bc(0x306)]=_0x1ebee7,this[_0xee67bc(0x19a)]();},Window_QuestList[_0x50c863(0x1cd)]['updateLabelWindow']=function(){const _0x47f196=_0x50c863,_0x4e308c=this[_0x47f196(0x1f6)](),_0x3fb4de=this['_labelWindow'];_0x3fb4de[_0x47f196(0x18b)][_0x47f196(0x136)]();const _0x5aa8c3=_0x4e308c?_0x4e308c[_0x47f196(0x13a)]:TextManager[_0x47f196(0x2c1)],_0x405bf2=_0x3fb4de['textSizeEx'](_0x5aa8c3)[_0x47f196(0x178)],_0x3ecd17=_0x3fb4de[_0x47f196(0x2f2)]()+Math['round']((_0x3fb4de[_0x47f196(0x259)]-_0x405bf2)/0x2);_0x3fb4de['drawTextEx'](_0x5aa8c3,_0x3ecd17,0x0,_0x3fb4de[_0x47f196(0x259)]);},Window_QuestList[_0x50c863(0x1cd)][_0x50c863(0x1d1)]=function(_0x3b2c66){const _0x2012b6=_0x50c863;this['_logWindow']=_0x3b2c66,this[_0x2012b6(0x19a)]();},Window_QuestList['prototype'][_0x50c863(0x1cc)]=function(){const _0x2b958b=_0x50c863,_0x51d01d=this[_0x2b958b(0x1f6)](),_0x1e01fd=this[_0x2b958b(0x236)];_0x1e01fd[_0x2b958b(0x29d)](_0x51d01d);},Window_QuestList[_0x50c863(0x1cd)][_0x50c863(0x131)]=function(){},Window_QuestList[_0x50c863(0x1cd)]['cursorPageup']=function(){},Window_QuestList[_0x50c863(0x1cd)][_0x50c863(0x114)]=function(){const _0x5291b6=_0x50c863;if(this[_0x5291b6(0x1f6)]())return this[_0x5291b6(0x1ca)]===_0x5291b6(0x2b3);else{if(_0x5291b6(0x282)===_0x5291b6(0x282))return Window_Command[_0x5291b6(0x1cd)][_0x5291b6(0x114)][_0x5291b6(0x22f)](this);else{const _0x2daf6d=this['questData']();return _0x2daf6d[_0x5291b6(0x138)]=_0x2daf6d[_0x5291b6(0x138)]||[],_0x2daf6d[_0x5291b6(0x138)][_0x5291b6(0x26f)](_0x3c1f00=>this[_0x5291b6(0x1f0)](_0x3c1f00))[_0x5291b6(0x189)](null);}}};function Window_QuestLog(){const _0x429050=_0x50c863;this[_0x429050(0x265)](...arguments);}Window_QuestLog[_0x50c863(0x116)]=VisuMZ['QuestSystem']['Settings']['Window'][_0x50c863(0x182)],Window_QuestLog[_0x50c863(0x2a8)]=VisuMZ[_0x50c863(0x23b)]['Settings'][_0x50c863(0x160)][_0x50c863(0x221)],Window_QuestLog['prototype']=Object[_0x50c863(0x21b)](Window_Scrollable[_0x50c863(0x1cd)]),Window_QuestLog[_0x50c863(0x1cd)]['constructor']=Window_QuestLog,Window_QuestLog[_0x50c863(0x2f6)]=0x19,Window_QuestLog[_0x50c863(0x1cd)]['initialize']=function(_0x3a02b0){const _0x552e62=_0x50c863;this[_0x552e62(0x279)]=0x0,this['_delayDraw']=0x0,Window_Scrollable[_0x552e62(0x1cd)][_0x552e62(0x265)][_0x552e62(0x22f)](this,_0x3a02b0),this[_0x552e62(0x2f0)]=null,this['refresh']();},Window_QuestLog['prototype'][_0x50c863(0x299)]=function(){const _0x2d8732=_0x50c863;return Math[_0x2d8732(0x213)](this['_textHeight'],0x1);},Window_QuestLog[_0x50c863(0x1cd)][_0x50c863(0x1ea)]=function(){const _0xec9829=_0x50c863;return this[_0xec9829(0x299)]();},Window_QuestLog[_0x50c863(0x1cd)]['update']=function(){const _0x1c6cf9=_0x50c863;Window_Scrollable['prototype']['update'][_0x1c6cf9(0x22f)](this),this[_0x1c6cf9(0x205)]();},Window_QuestLog[_0x50c863(0x1cd)][_0x50c863(0x205)]=function(){const _0x2b48a=_0x50c863;if(this[_0x2b48a(0x2f6)]--===0x0)this['refresh']();},Window_QuestLog['prototype'][_0x50c863(0x293)]=function(){const _0x183834=_0x50c863,_0x16e2a2=this[_0x183834(0x19d)]()||0x1,_0x4770bd=this[_0x183834(0x12b)]()||0x1,_0x1b9232=this[_0x183834(0x246)]-this['_scrollX']%_0x16e2a2,_0x1430eb=this['_scrollY']-this[_0x183834(0x1e3)]%_0x4770bd;(_0x1b9232!==this[_0x183834(0x25d)]||_0x1430eb!==this[_0x183834(0x1b1)])&&(this[_0x183834(0x226)](_0x1b9232,_0x1430eb),this['paint']()),this[_0x183834(0x110)]['x']=this[_0x183834(0x246)],this[_0x183834(0x110)]['y']=this['_scrollY'];},Window_QuestLog[_0x50c863(0x1cd)]['processWheelScroll']=function(){const _0x4c47f7=_0x50c863;Window_Scrollable['prototype'][_0x4c47f7(0x309)][_0x4c47f7(0x22f)](this),this['updatePageUpDownScroll']();},Window_QuestLog[_0x50c863(0x1cd)][_0x50c863(0x20e)]=function(){const _0x4d9d26=_0x50c863;if(Input[_0x4d9d26(0x2ec)](_0x4d9d26(0x109))){if(_0x4d9d26(0x26b)==='RMjod'){const _0x205ffb=this['questData']();return _0x205ffb[_0x4d9d26(0x267)]=_0x205ffb[_0x4d9d26(0x267)]||[],_0x205ffb[_0x4d9d26(0x267)][_0x4d9d26(0x26f)](_0xbac2d9=>this[_0x4d9d26(0x1f0)](_0xbac2d9))[_0x4d9d26(0x189)](null);}else this['smoothScrollDown'](Window_QuestLog[_0x4d9d26(0x2a8)]);}if(Input[_0x4d9d26(0x2ec)](_0x4d9d26(0x215))){if(_0x4d9d26(0x121)!==_0x4d9d26(0x1a7))this[_0x4d9d26(0x21a)](Window_QuestLog['scrollSpeed']);else{const _0x23184d=this[_0x4d9d26(0x275)](),_0x55eaef=this[_0x4d9d26(0x2f0)]?this[_0x4d9d26(0x2dc)]():this[_0x4d9d26(0x25f)](),_0x200d4d=this[_0x4d9d26(0x11f)](_0x55eaef[_0x4d9d26(0x304)]());this[_0x4d9d26(0x279)]=_0x200d4d['height'],this[_0x4d9d26(0x2bc)]===_0x35aca5&&(this['_textHeight']+=this[_0x4d9d26(0x1bc)](),_0x315709[_0x4d9d26(0x116)]&&(this['_textHeight']+=this[_0x4d9d26(0x1bc)]()*0x4));}}},Window_QuestLog['prototype'][_0x50c863(0x29d)]=function(_0x22729d){const _0x1749df=_0x50c863;if(this[_0x1749df(0x2f0)]===_0x22729d)return;this[_0x1749df(0x2f0)]=_0x22729d,this[_0x1749df(0x2f6)]=Window_QuestLog[_0x1749df(0x2f6)];},Window_QuestLog['prototype'][_0x50c863(0x1f5)]=function(){const _0xc6f0e=_0x50c863;this[_0xc6f0e(0x18b)][_0xc6f0e(0x136)](),this[_0xc6f0e(0x2ca)](),this[_0xc6f0e(0x2c2)](),this[_0xc6f0e(0x277)]();},Window_QuestLog[_0x50c863(0x1cd)][_0x50c863(0x2ca)]=function(){const _0xb5d2a=_0x50c863;if(![]){const _0x283de5=this['baseTextRect'](),_0x22f66d=this[_0xb5d2a(0x2f0)]?this[_0xb5d2a(0x2dc)]():this[_0xb5d2a(0x25f)](),_0x184a79=this[_0xb5d2a(0x11f)](_0x22f66d[_0xb5d2a(0x304)]());this['_textHeight']=_0x184a79[_0xb5d2a(0x13e)],this['constructor']===Window_QuestLog&&(this['_textHeight']+=this[_0xb5d2a(0x1bc)](),Window_QuestLog[_0xb5d2a(0x116)]&&(this[_0xb5d2a(0x279)]+=this[_0xb5d2a(0x1bc)]()*0x4));}const _0x53b169=this[_0xb5d2a(0x2f0)]?this[_0xb5d2a(0x2dc)]():this[_0xb5d2a(0x25f)]();this[_0xb5d2a(0x279)]=this[_0xb5d2a(0x11f)](_0x53b169[_0xb5d2a(0x304)]())[_0xb5d2a(0x13e)];},Window_QuestLog[_0x50c863(0x1cd)][_0x50c863(0x277)]=function(){const _0x46af6f=_0x50c863,_0x2af5d=this[_0x46af6f(0x2f0)]?this[_0x46af6f(0x2dc)]():this['createEmptyText']();this[_0x46af6f(0x18c)](_0x2af5d,0x0,0x0,this[_0x46af6f(0x259)]),this['_scrollY']=0x0,this[_0x46af6f(0x110)]['y']=0x0;},Window_QuestLog[_0x50c863(0x1cd)][_0x50c863(0x25f)]=function(){const _0x1cc642=_0x50c863;VisuMZ[_0x1cc642(0x23b)][_0x1cc642(0x196)][_0x1cc642(0x195)]['OnLoadQuestJS']();let _0x279ba7=this[_0x1cc642(0x297)]();return _0x279ba7=VisuMZ[_0x1cc642(0x23b)][_0x1cc642(0x13d)](_0x279ba7),_0x279ba7=VisuMZ[_0x1cc642(0x23b)][_0x1cc642(0x190)](_0x279ba7),_0x279ba7;},Window_QuestLog[_0x50c863(0x1cd)][_0x50c863(0x297)]=function(){const _0x1cad6e=_0x50c863;return TextManager[_0x1cad6e(0x2ab)];},Window_QuestLog[_0x50c863(0x1cd)][_0x50c863(0x2dc)]=function(){const _0x46366f=_0x50c863,_0x4fd93d=this[_0x46366f(0x2f0)],_0x8bbb8f=_0x4fd93d[_0x46366f(0x2bf)][_0x46366f(0x1af)]()[_0x46366f(0x304)]();if(_0x4fd93d['OnLoadQuestJS'])_0x4fd93d[_0x46366f(0x2e1)][_0x46366f(0x22f)](this);let _0x36503b=this[_0x46366f(0x15d)]();return _0x36503b=VisuMZ[_0x46366f(0x23b)][_0x46366f(0x274)](_0x36503b),_0x36503b=_0x36503b['replace'](/\[\[RAWTITLE\]\]/gi,_0x4fd93d[_0x46366f(0x13a)]),_0x36503b=_0x36503b['replace'](/\[\[TITLE\]\]/gi,_0x4fd93d[_0x46366f(0x13a)][_0x46366f(0x283)](/\\I\[(\d+)\]/gi,'')[_0x46366f(0x304)]()),_0x36503b=_0x36503b[_0x46366f(0x283)](/\[\[DIFFICULTY\]\]/gi,_0x4fd93d[_0x46366f(0x183)][_0x46366f(0x304)]()),_0x36503b=_0x36503b['replace'](/\[\[FROM\]\]/gi,_0x4fd93d['From'][_0x46366f(0x304)]()),_0x36503b=_0x36503b['replace'](/\[\[LOCATION\]\]/gi,_0x4fd93d['Location']['trim']()),_0x36503b=_0x36503b[_0x46366f(0x283)](/\[\[DESCRIPTION\]\]/gi,this[_0x46366f(0x179)](_0x8bbb8f)),_0x36503b=_0x36503b[_0x46366f(0x283)](/\[\[OBJECTIVES\]\]/gi,this[_0x46366f(0x1b7)](_0x4fd93d,_0x8bbb8f)),_0x36503b=_0x36503b[_0x46366f(0x283)](/\[\[REWARDS\]\]/gi,this['createQuestRewards'](_0x4fd93d,_0x8bbb8f)),_0x36503b=_0x36503b[_0x46366f(0x283)](/\[\[SUBTEXT\]\]/gi,this[_0x46366f(0x24d)](_0x8bbb8f)),_0x36503b=_0x36503b['replace'](/\[\[QUOTE\]\]/gi,this[_0x46366f(0x30d)](_0x8bbb8f)),_0x36503b=VisuMZ[_0x46366f(0x23b)]['finalizeWordWrapSupport'](_0x36503b),_0x36503b=VisuMZ[_0x46366f(0x23b)][_0x46366f(0x197)](_0x36503b),_0x36503b[_0x46366f(0x304)]();},Window_QuestLog[_0x50c863(0x1cd)][_0x50c863(0x15d)]=function(){return TextManager['questLogFmt'];},Window_QuestLog[_0x50c863(0x1cd)][_0x50c863(0x179)]=function(_0x539100){const _0x416799=_0x50c863;let _0x1424f0=$gameSystem['questDescription'](_0x539100);return _0x1424f0=VisuMZ[_0x416799(0x23b)][_0x416799(0x190)](_0x1424f0),_0x1424f0[_0x416799(0x304)]();},Window_QuestLog[_0x50c863(0x1cd)][_0x50c863(0x1b7)]=function(_0x25caab,_0x261282){const _0x3e72f3=_0x50c863,_0x5d6ed9=[],_0x24544a=$gameSystem[_0x3e72f3(0x1ff)](_0x261282),_0x68c486=$gameSystem[_0x3e72f3(0x12a)](_0x261282),_0x42e58c=$gameSystem[_0x3e72f3(0x2ea)](_0x261282),_0x4c673d=_0x24544a['concat'](_0x68c486)[_0x3e72f3(0x1ee)](_0x42e58c)['sort']((_0x5cb0e4,_0x396eda)=>_0x5cb0e4-_0x396eda);for(const _0x31441e of _0x4c673d){if(!_0x25caab[_0x3e72f3(0x106)][_0x31441e])continue;const _0x2988da=_0x25caab['Objectives'][_0x31441e];let _0x45cb08=TextManager[_0x3e72f3(0x2fe)];if(_0x68c486[_0x3e72f3(0x14a)](_0x31441e))_0x45cb08=TextManager[_0x3e72f3(0x26e)];if(_0x42e58c[_0x3e72f3(0x14a)](_0x31441e))_0x45cb08=TextManager[_0x3e72f3(0x13c)];_0x5d6ed9['push'](VisuMZ[_0x3e72f3(0x23b)][_0x3e72f3(0x203)](_0x45cb08[_0x3e72f3(0x119)](_0x2988da)[_0x3e72f3(0x304)]()));}let _0x352c98=VisuMZ[_0x3e72f3(0x23b)][_0x3e72f3(0x2cd)](_0x5d6ed9);return _0x352c98;},Window_QuestLog[_0x50c863(0x1cd)][_0x50c863(0x2ed)]=function(_0x5f1d56,_0x5ab0d5){const _0x20dde2=_0x50c863,_0x4096eb=[],_0x39b65c=$gameSystem[_0x20dde2(0x151)](_0x5ab0d5),_0x43a64d=$gameSystem[_0x20dde2(0x2cb)](_0x5ab0d5),_0x58c9f1=$gameSystem[_0x20dde2(0x2c6)](_0x5ab0d5),_0x53a19d=_0x39b65c[_0x20dde2(0x1ee)](_0x43a64d)[_0x20dde2(0x1ee)](_0x58c9f1)[_0x20dde2(0x1cf)]((_0x38fe86,_0x5703d8)=>_0x38fe86-_0x5703d8);for(const _0x5101d8 of _0x53a19d){if(!_0x5f1d56[_0x20dde2(0x250)][_0x5101d8])continue;const _0x32681f=_0x5f1d56[_0x20dde2(0x250)][_0x5101d8];let _0x551934=TextManager[_0x20dde2(0x113)];if(_0x43a64d['includes'](_0x5101d8))_0x551934=TextManager[_0x20dde2(0x10a)];if(_0x58c9f1[_0x20dde2(0x14a)](_0x5101d8))_0x551934=TextManager[_0x20dde2(0x2ac)];_0x4096eb[_0x20dde2(0x1c0)](VisuMZ[_0x20dde2(0x23b)][_0x20dde2(0x203)](_0x551934['format'](_0x32681f)['trim']()));}let _0x203968=VisuMZ[_0x20dde2(0x23b)]['joinQuestEntries'](_0x4096eb);return _0x203968;},Window_QuestLog[_0x50c863(0x1cd)][_0x50c863(0x24d)]=function(_0x2a5fc2){const _0xe92cd7=_0x50c863;let _0x23ca95=$gameSystem[_0xe92cd7(0x202)](_0x2a5fc2);return _0x23ca95=VisuMZ[_0xe92cd7(0x23b)]['finalizeWordWrapSupport'](_0x23ca95),_0x23ca95['trim']();},Window_QuestLog[_0x50c863(0x1cd)][_0x50c863(0x30d)]=function(_0x29017d){const _0x542119=_0x50c863;let _0x4999e8=$gameSystem['questQuote'](_0x29017d);return _0x4999e8=VisuMZ[_0x542119(0x23b)][_0x542119(0x190)](_0x4999e8),_0x4999e8['trim']();};function Window_QuestTracker(){const _0x476ed1=_0x50c863;this[_0x476ed1(0x265)](...arguments);}function _0xe643(_0x363847,_0x34c604){const _0x12c96a=_0x12c9();return _0xe643=function(_0xe64335,_0x52a697){_0xe64335=_0xe64335-0x100;let _0x51840a=_0x12c96a[_0xe64335];return _0x51840a;},_0xe643(_0x363847,_0x34c604);}Window_QuestTracker[_0x50c863(0x1cd)]=Object[_0x50c863(0x21b)](Window_QuestLog[_0x50c863(0x1cd)]),Window_QuestTracker[_0x50c863(0x1cd)][_0x50c863(0x2bc)]=Window_QuestTracker,Window_QuestTracker['scale']=VisuMZ[_0x50c863(0x23b)]['Settings'][_0x50c863(0x160)]['TrackerWindow_Scale'],Window_QuestTracker['activeBgType']=VisuMZ[_0x50c863(0x23b)]['Settings'][_0x50c863(0x160)][_0x50c863(0x105)],Window_QuestTracker[_0x50c863(0x108)]=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)][_0x50c863(0x2b5)][_0x50c863(0x27b)]??0x80,Window_QuestTracker['CLOSE_FADE_SPEED']=VisuMZ[_0x50c863(0x23b)][_0x50c863(0x196)][_0x50c863(0x2b5)][_0x50c863(0x23c)]??0x10,Window_QuestTracker[_0x50c863(0x1cd)][_0x50c863(0x265)]=function(_0x2fefa6){const _0x4950ef=_0x50c863;Window_QuestLog[_0x4950ef(0x1cd)][_0x4950ef(0x265)]['call'](this,_0x2fefa6),this['setQuest']($gameSystem[_0x4950ef(0x2ba)]()),this[_0x4950ef(0x2b1)]['x']=this[_0x4950ef(0x2b1)]['y']=Window_QuestTracker[_0x4950ef(0x2b1)],this['updateVisibility']();},Window_QuestTracker['prototype'][_0x50c863(0x299)]=function(){const _0x388dcb=_0x50c863;return Math[_0x388dcb(0x213)](this['_textHeight'],0x1);},Window_QuestTracker[_0x50c863(0x1cd)][_0x50c863(0x297)]=function(){return'';},Window_QuestTracker['prototype'][_0x50c863(0x15d)]=function(){const _0x68c97f=_0x50c863;return TextManager[_0x68c97f(0x198)];},Window_QuestTracker['prototype'][_0x50c863(0x2c2)]=function(){const _0x362017=_0x50c863;this[_0x362017(0x13e)]=this[_0x362017(0x299)]()+$gameSystem[_0x362017(0x129)]()*0x2,Window_QuestLog[_0x362017(0x1cd)][_0x362017(0x2c2)][_0x362017(0x22f)](this);},Window_QuestTracker[_0x50c863(0x1cd)][_0x50c863(0x29d)]=function(_0x29ae2e){const _0x564346=_0x50c863;if(this[_0x564346(0x2f0)]===_0x29ae2e)return;this[_0x564346(0x2f0)]=_0x29ae2e,this[_0x564346(0x1f5)]();},Window_QuestTracker[_0x50c863(0x1cd)][_0x50c863(0x1f5)]=function(){const _0x1da209=_0x50c863;if($gameTemp['_questTrackerRefresh'])return;$gameTemp[_0x1da209(0x157)]=!![],Window_QuestLog[_0x1da209(0x1cd)][_0x1da209(0x1f5)]['call'](this),this['setBackgroundType'](this[_0x1da209(0x2f0)]?Window_QuestTracker['activeBgType']:0x2),$gameTemp[_0x1da209(0x157)]=![];},Window_QuestTracker[_0x50c863(0x1cd)][_0x50c863(0x1a6)]=function(){const _0x300c6f=_0x50c863;Window_QuestLog[_0x300c6f(0x1cd)][_0x300c6f(0x1a6)][_0x300c6f(0x22f)](this),this[_0x300c6f(0x145)](),this[_0x300c6f(0x1f4)]();},Window_QuestTracker[_0x50c863(0x1cd)][_0x50c863(0x145)]=function(){const _0x1a6c4f=_0x50c863;let _0xe6101c=this['contentsOpacity'];const _0x296f66=Window_QuestTracker[_0x1a6c4f(0x20a)];if(this[_0x1a6c4f(0x2f5)]()){if(_0x1a6c4f(0x159)!=='lQvOV'){const _0x30bf39=Window_QuestTracker[_0x1a6c4f(0x108)];_0xe6101c=(_0xe6101c-_0x296f66)['clamp'](_0x30bf39,0xff);}else return'';}else _0xe6101c+=_0x296f66;this[_0x1a6c4f(0x135)]=_0xe6101c,this[_0x1a6c4f(0x125)]=_0xe6101c;},Window_QuestTracker['prototype']['isCloseToQuestTrackerScreenPosition']=function(){const _0x12ba8c=_0x50c863;if(!SceneManager[_0x12ba8c(0x29c)]())return![];const _0x28e3e6=$gameMap[_0x12ba8c(0x252)](),_0x4c83fc=$gamePlayer[_0x12ba8c(0x20d)](),_0xc36926=$gamePlayer[_0x12ba8c(0x1bf)]()-Math[_0x12ba8c(0x2ad)](_0x28e3e6/0x2),_0x411ab7=new Point(_0x4c83fc,_0xc36926),_0x3229f2=this[_0x12ba8c(0x1c1)][_0x12ba8c(0x1d0)](_0x411ab7);return this[_0x12ba8c(0x16c)][_0x12ba8c(0x2de)](_0x3229f2['x'],_0x3229f2['y']);},Window_QuestTracker[_0x50c863(0x1cd)][_0x50c863(0x1f4)]=function(){const _0x31b37c=_0x50c863,_0x267e6c=this[_0x31b37c(0x2c7)]();this['openness']=_0x267e6c;},Window_QuestTracker['prototype'][_0x50c863(0x2c7)]=function(){const _0x316a2c=_0x50c863;if(!ConfigManager['questTrackerShow'])return 0x0;if($gameTemp[_0x316a2c(0x18f)]){if(_0x316a2c(0x235)!==_0x316a2c(0x235)){_0x320c08[_0x316a2c(0x23b)]['Settings'][_0x316a2c(0x195)][_0x316a2c(0x2e1)]();let _0x1ea17e=this[_0x316a2c(0x297)]();return _0x1ea17e=_0x37e314[_0x316a2c(0x23b)][_0x316a2c(0x13d)](_0x1ea17e),_0x1ea17e=_0x35c776[_0x316a2c(0x23b)][_0x316a2c(0x190)](_0x1ea17e),_0x1ea17e;}else return 0x0;}const _0x3b5214=SceneManager[_0x316a2c(0x2e4)];if(_0x3b5214&&_0x3b5214[_0x316a2c(0x247)]){if(_0x316a2c(0x22b)!==_0x316a2c(0x313)){if(_0x3b5214['_messageWindow'][_0x316a2c(0x14d)]>0x0)return 0x0;}else{let _0x879537=_0x1efd48[_0x316a2c(0x13a)];_0x158cfb===_0x34d0d7[_0x316a2c(0x2ba)]()&&(_0x879537=_0x34dfe2[_0x316a2c(0x268)]['format'](_0x879537)),this[_0x316a2c(0x2f8)](_0x879537,_0x316a2c(0x1f0),!![],_0x5507fa);}}if(!this[_0x316a2c(0x2f0)])return 0x0;if($gamePlayer[_0x316a2c(0x1b0)]())return 0x0;if($gameParty[_0x316a2c(0x2a0)]())return 0x0;if(SceneManager['isSceneChanging']())return 0x0;return $gameSystem[_0x316a2c(0x1b4)]()?0xff:0x0;},VisuMZ[_0x50c863(0x23b)][_0x50c863(0x190)]=function(_0x16110d){const _0x4e622f=_0x50c863;if(!Window_QuestLog[_0x4e622f(0x116)])return _0x16110d;if(!Imported['VisuMZ_1_MessageCore'])return _0x16110d;return _0x16110d='<WORDWRAP>%1'[_0x4e622f(0x119)](_0x16110d),_0x16110d;},VisuMZ[_0x50c863(0x23b)][_0x50c863(0x197)]=function(_0x11241f){const _0x55bc65=_0x50c863;if(Imported['VisuMZ_1_MessageCore'])return _0x11241f;return _0x11241f=_0x11241f['replace'](/<COLORLOCK>/gi,''),_0x11241f=_0x11241f[_0x55bc65(0x283)](/<\/COLORLOCK>/gi,''),_0x11241f;},VisuMZ[_0x50c863(0x23b)][_0x50c863(0x13d)]=function(_0x3fd179){const _0x3834cd=_0x50c863;if(!Window_QuestLog[_0x3834cd(0x116)])return _0x3fd179[_0x3834cd(0x283)](/<(?:BR|LINEBREAK)>/gi,'');if(!Imported[_0x3834cd(0x2f1)]){if('hSHaZ'===_0x3834cd(0x193))return _0x3fd179['replace'](/<(?:BR|LINEBREAK)>/gi,'');else{_0x437d11=_0x2ca1f7['toUpperCase']()['trim']();const _0x1c53db=this['quest'](_0x5b79b6);if(!_0x1c53db)return'';const _0x264f7c=this[_0x3834cd(0x1a0)]()[_0x3834cd(0x276)];_0x264f7c[_0x5a75c3]=_0x490fc1;}}if(VisuMZ[_0x3834cd(0x188)][_0x3834cd(0x196)]['WordWrap'][_0x3834cd(0x284)]){if('xKakO'===_0x3834cd(0x1d8))_0x3fd179=_0x3fd179[_0x3834cd(0x283)](/[\n\r]+/g,'\x1bWrapBreak[0]');else return _0x5acf7d[_0x3834cd(0x1a0)]()['failed']['length'];}else _0x3fd179=_0x3fd179[_0x3834cd(0x283)](/[\n\r]+/g,'');return _0x3fd179;},VisuMZ['QuestSystem']['convertLineBreaksForWordWrap']=function(_0x40f663){const _0x18b2ed=_0x50c863;if(!Window_QuestLog[_0x18b2ed(0x116)])return _0x40f663;if(!Imported[_0x18b2ed(0x2f1)])return _0x40f663;return _0x40f663[_0x18b2ed(0x304)]()[_0x18b2ed(0x283)](/[\n\r]/g,'<BR>');},VisuMZ['QuestSystem'][_0x50c863(0x203)]=function(_0x490fa1){const _0x22f3d0=_0x50c863;if(!Window_QuestLog[_0x22f3d0(0x116)])return _0x490fa1;if(!Imported[_0x22f3d0(0x2f1)])return _0x490fa1;return VisuMZ[_0x22f3d0(0x23b)][_0x22f3d0(0x13d)](_0x490fa1[_0x22f3d0(0x304)]());},VisuMZ[_0x50c863(0x23b)][_0x50c863(0x2cd)]=function(_0x26204d){const _0x2aa254=_0x50c863;if(!Window_QuestLog['wordWrapSupport'])return _0x26204d[_0x2aa254(0x155)]('\x0a')[_0x2aa254(0x304)]();if(!Imported[_0x2aa254(0x2f1)])return _0x26204d[_0x2aa254(0x155)]('\x0a')[_0x2aa254(0x304)]();return _0x26204d['join'](_0x2aa254(0x19f))[_0x2aa254(0x304)]();},totalQuestsAvailable=function(){const _0x63fce7=_0x50c863;return $gameSystem[_0x63fce7(0x1a0)]()[_0x63fce7(0x2b3)][_0x63fce7(0x10c)];},totalQuestsCompleted=function(){const _0x4c774b=_0x50c863;return $gameSystem['questData']()[_0x4c774b(0x138)]['length'];},totalQuestsFailed=function(){const _0x7149f0=_0x50c863;return $gameSystem[_0x7149f0(0x1a0)]()[_0x7149f0(0x267)][_0x7149f0(0x10c)];},totalQuestsRevealed=function(){return totalQuestsAvailable()+totalQuestsCompleted()+totalQuestsFailed();},totalQuestsInGame=function(){const _0x333fe4=_0x50c863;return VisuMZ[_0x333fe4(0x23b)]['QuestOrder']['length'];},getQuestDescriptionIndex=function(_0x5a7fce){const _0x8f3ddc=_0x50c863;_0x5a7fce=_0x5a7fce[_0x8f3ddc(0x1af)]()['trim']();const _0x42328a=$gameSystem[_0x8f3ddc(0x1f0)](_0x5a7fce);if(!_0x42328a)return-0x1;$gameSystem['questDescription'](_0x5a7fce);const _0x82812c=$gameSystem[_0x8f3ddc(0x1a0)]()['description'];return _0x82812c[_0x5a7fce]||0x0;},totalVisibleQuestObjectives=function(_0x1e51a0){const _0x35481a=_0x50c863;_0x1e51a0=_0x1e51a0['toUpperCase']()[_0x35481a(0x304)]();const _0x26ea0a=$gameSystem['quest'](_0x1e51a0);if(!_0x26ea0a)return-0x1;$gameSystem['questObjectives'](_0x1e51a0);const _0x7a12ac=$gameSystem[_0x35481a(0x1a0)]()[_0x35481a(0x286)]||{};if(!_0x7a12ac[_0x1e51a0])return 0x0;return _0x7a12ac[_0x1e51a0]['length'];},totalQuestObjectives=function(_0x1d6630){const _0x1fa0a3=_0x50c863;_0x1d6630=_0x1d6630[_0x1fa0a3(0x1af)]()[_0x1fa0a3(0x304)]();const _0x4b4aef=$gameSystem[_0x1fa0a3(0x1f0)](_0x1d6630);return _0x4b4aef?_0x4b4aef[_0x1fa0a3(0x106)][_0x1fa0a3(0x10c)]-0x1:0x0;},totalVisibleQuestRewards=function(_0x51915b){const _0x247966=_0x50c863;_0x51915b=_0x51915b['toUpperCase']()[_0x247966(0x304)]();const _0x2c41e2=$gameSystem[_0x247966(0x1f0)](_0x51915b);if(!_0x2c41e2)return-0x1;$gameSystem[_0x247966(0x151)](_0x51915b);const _0x2b32a4=$gameSystem[_0x247966(0x1a0)]()[_0x247966(0x1a1)]||{};if(!_0x2b32a4[_0x51915b])return 0x0;return _0x2b32a4[_0x51915b][_0x247966(0x10c)];},totalQuestRewards=function(_0x3ad09e){const _0x2516c5=_0x50c863;_0x3ad09e=_0x3ad09e[_0x2516c5(0x1af)]()[_0x2516c5(0x304)]();const _0x4ff7a1=$gameSystem[_0x2516c5(0x1f0)](_0x3ad09e);return _0x4ff7a1?_0x4ff7a1['Rewards'][_0x2516c5(0x10c)]-0x1:0x0;},getQuestSubtextIndex=function(_0x20d3f1){const _0x149604=_0x50c863;_0x20d3f1=_0x20d3f1[_0x149604(0x1af)]()[_0x149604(0x304)]();const _0x58ad1a=$gameSystem[_0x149604(0x1f0)](_0x20d3f1);if(!_0x58ad1a)return-0x1;$gameSystem[_0x149604(0x202)](_0x20d3f1);const _0x29ea74=$gameSystem['questData']()[_0x149604(0x1c9)];return _0x29ea74[_0x20d3f1]||0x0;},getQuestQuoteIndex=function(_0x178641){const _0x1644cb=_0x50c863;_0x178641=_0x178641[_0x1644cb(0x1af)]()['trim']();const _0x2a2446=$gameSystem['quest'](_0x178641);if(!_0x2a2446)return-0x1;$gameSystem[_0x1644cb(0x210)](_0x178641);const _0x1ba0ed=$gameSystem[_0x1644cb(0x1a0)]()['quotes'];return _0x1ba0ed[_0x178641]||0x0;},isQuestObjectiveCompleted=function(_0xcb3c30,_0x448729){const _0xee1b9f=_0x50c863;_0xcb3c30=_0xcb3c30[_0xee1b9f(0x1af)]()[_0xee1b9f(0x304)]();const _0x5be8d9=$gameSystem['quest'](_0xcb3c30);if(!_0x5be8d9)return![];$gameSystem[_0xee1b9f(0x1ff)](_0xcb3c30);const _0x512b32=$gameSystem[_0xee1b9f(0x1a0)]()[_0xee1b9f(0x130)];if(!_0x512b32[_0xcb3c30])return![];return _0x512b32[_0xcb3c30]['includes'](_0x448729);},isQuestObjectiveFailed=function(_0x6657df,_0x2f9f95){const _0x958636=_0x50c863;_0x6657df=_0x6657df['toUpperCase']()[_0x958636(0x304)]();const _0x5191f0=$gameSystem[_0x958636(0x1f0)](_0x6657df);if(!_0x5191f0)return![];$gameSystem[_0x958636(0x1ff)](_0x6657df);const _0x2ae936=$gameSystem[_0x958636(0x1a0)]()['objectivesFailed'];if(!_0x2ae936[_0x6657df])return![];return _0x2ae936[_0x6657df][_0x958636(0x14a)](_0x2f9f95);},isQuestObjectiveUncleared=function(_0x5e61a6,_0x57212a){const _0xe4c0fb=_0x50c863;_0x5e61a6=_0x5e61a6[_0xe4c0fb(0x1af)]()[_0xe4c0fb(0x304)]();const _0x33838d=$gameSystem[_0xe4c0fb(0x1f0)](_0x5e61a6);if(!_0x33838d)return![];$gameSystem[_0xe4c0fb(0x1ff)](_0x5e61a6);const _0x232e15=$gameSystem[_0xe4c0fb(0x1a0)]()[_0xe4c0fb(0x286)];if(!_0x232e15[_0x5e61a6])return![];return _0x232e15[_0x5e61a6][_0xe4c0fb(0x14a)](_0x57212a);},isQuestRewardClaimed=function(_0x4a6f0c,_0x2e7b9e){const _0x3e3611=_0x50c863;_0x4a6f0c=_0x4a6f0c[_0x3e3611(0x1af)]()[_0x3e3611(0x304)]();const _0x430d24=$gameSystem['quest'](_0x4a6f0c);if(!_0x430d24)return![];$gameSystem[_0x3e3611(0x151)](_0x4a6f0c);const _0x2cdc98=$gameSystem[_0x3e3611(0x1a0)]()[_0x3e3611(0x263)];if(!_0x2cdc98[_0x4a6f0c])return![];return _0x2cdc98[_0x4a6f0c][_0x3e3611(0x14a)](_0x2e7b9e);},isQuestRewardDenied=function(_0x1f87bf,_0x55c30f){const _0xe18920=_0x50c863;_0x1f87bf=_0x1f87bf['toUpperCase']()['trim']();const _0x12b0ea=$gameSystem['quest'](_0x1f87bf);if(!_0x12b0ea)return![];$gameSystem[_0xe18920(0x151)](_0x1f87bf);const _0x2d2cd4=$gameSystem['questData']()[_0xe18920(0x2e9)];if(!_0x2d2cd4[_0x1f87bf])return![];return _0x2d2cd4[_0x1f87bf][_0xe18920(0x14a)](_0x55c30f);},isQuestRewardUnclaimed=function(_0x545926,_0x425223){const _0x4e4775=_0x50c863;_0x545926=_0x545926['toUpperCase']()[_0x4e4775(0x304)]();const _0x41e371=$gameSystem[_0x4e4775(0x1f0)](_0x545926);if(!_0x41e371)return![];$gameSystem[_0x4e4775(0x151)](_0x545926);const _0x50a26a=$gameSystem[_0x4e4775(0x1a0)]()[_0x4e4775(0x1a1)];if(!_0x50a26a[_0x545926])return![];return _0x50a26a[_0x545926][_0x4e4775(0x14a)](_0x425223);};