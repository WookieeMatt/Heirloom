//=============================================================================
// VisuStella MZ - Party System
// VisuMZ_2_PartySystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_PartySystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PartySystem = VisuMZ.PartySystem || {};
VisuMZ.PartySystem.version = 1.25;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.25] [PartySystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Party_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ only gives game projects the ability to switch party members
 * within the main menu and nothing more. There's no inherent functionality to
 * lock party members, make party members required, and/or give players the
 * ability to switch party members mid-battle.
 *
 * This plugin will add in all of those functions as well as a dedicated scene
 * for switching party members. Party switching will allow party members to be
 * removed, swapped, and sorted. Through the usage of Plugin Commands, party
 * members can also be locked and/or required for party presence.
 *
 * Those using the VisuStella MZ Battle Core will also have access to features
 * in this plugin that aren't available otherwise. These features give players
 * the functionality to switch out the whole party lineup mid-battle and/or
 * individual party member switching.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Custom scene dedicated to party management.
 * * Change the maximum number of party members that can participate in battle.
 * * Plugin Commands to lock party members.
 * * Plugin Commands to make certain party members required.
 * * Added functionality with Battle Core to switch party members mid-battle.
 * * This comes in the form of changing either the whole party at once.
 * * Or switching individual members out one at a time.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Main Menu Formation Command
 *
 * - This command is now changed to send the player to Scene_Party for the
 * player to have a dedicated scene for changing the party.
 *
 * ---
 *
 * Battle Members Array
 *
 * - Previously, the battle members are decided by which actors are lined up
 * first in the party roster. This has been changed to give players the freedom
 * to have a party size less than the maximum. This change is made by changing
 * the way the battle members are determined by using a new array. However, any
 * and all functions utilize the $gameParty.battleMembers() function will still
 * behave as normal.
 *
 * ---
 *
 * Formation Change OK Function
 *
 * - RPG Maker MZ did not do anything with the Game_Actor.isFormationChangeOk
 * function so this plugin overwrote it completely to allow for the new
 * lock and require features to work.
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
 * VisuMZ_1_BattleCore
 *
 * - If the VisuStella MZ Battle Core plugin is present, players are able to 
 * access party switching functionality mid-battle at will. This can be in the
 * form of switching out the entire active party roster at once or individually
 * for each actor.
 *
 * - Switching Entire Rosters: This can be done by going into this plugin's
 * Plugin Parameters => General => Party Command Window => Add Party Command.
 * If the Party Command Window is accessible, the player will be able to see
 * the option between 'Auto Battle' and 'Options'.
 *
 * - Individual Member Switching: This requires going to VisuMZ_1_BattleCore's
 * Plugin Parameters => Actor Command Window => Battle Commands => Command List
 * and add in the "party" option. The "party" option can also be added to the
 * <Battle Commands> notetag.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_2_BattleSystemOTB
 * 
 * With Battle System - OTB, the player cannot change entire parties at once
 * from the Party Command Window. The feature will be unaccessible while
 * Order Turn Battle is in play. However, the player can still change party
 * members through the Actor Command Window by having actors replace other
 * actors. Party changing is also available through battle events, Common
 * Events, and script calls.
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
 * === Party Plugin Commands ===
 * 
 * ---
 *
 * Party: Call Party Scene
 * - Calls the party changing scene.
 *
 * ---
 *
 * Party: Change Max Battle Members
 * - Changes the number of max battle members possible.
 * - Cannot be use mid-battle.
 *
 *   Max Members:
 *   - Changes the number of max battle members possible.
 *   - Use 0 for the game's default number.
 *
 * ---
 *
 * Party: Lock/Unlock Member(s)
 * - Allows you to lock/unlock a party member.
 * - Locked actors cannot change their party position.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to lock/unlock.
 *   - Locked actors cannot change their party position.
 *
 *   Lock?:
 *   - Lock the selected actor(s)?
 *
 * ---
 * 
 * Party: Move Actor(s) to Active
 * - Map Only.
 * - Moves an actor to the active party if there is room.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the active party if there is room.
 * 
 * ---
 * 
 * Party: Move Actor(s) to Reserve
 * - Map Only.
 * - Moves an actor to the reserve party.
 * - Must be 1 actor left.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the reserve party.
 * 
 * ---
 * 
 * Party: Move Party Index to Reserve
 * - Map only.
 * - Moves an actor in a specific party index to reserve.
 * - Must be 1 actor left.
 * 
 *   Index:
 *   - Type in which index to move.
 *   - Index values start at 0.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * Party: Move Random Reserve to Active
 * - Map only.
 * - Moves a random actor from the reserve party to active.
 * - Must be enough space in active party.
 * 
 * ---
 *
 * Party: Require Member(s)
 * - Allows you to require/free a party member.
 * - Required actors must be in the party to exit the scene.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to require/free.
 *   - Required actors must be in the party to exit the scene.
 *
 *   Require?:
 *   - Make the selected actor(s) required?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These Plugin Parameters control the overall behaviors pertaining to the
 * Party System added with this plugin. These behaviors range from the maximum
 * number of members that can participate in battle to the availability of the
 * party switching mechanics.
 *
 * ---
 *
 * General
 * 
 *   Max Battle Members:
 *   - Maximum number of battle members.
 *
 * ---
 *
 * Party Scene
 * 
 *   Add Remove Command:
 *   - Add the 'Remove' command to the party scene?
 * 
 *   Locked Member Icon:
 *   - Icon used for a locked party member.
 * 
 *   Required Member Icon:
 *   - Icon used for a required party member.
 *
 * ---
 *
 * Party Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Party Command:
 *   - Add the 'Party' command to the Party Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 *
 * ---
 *
 * Actor Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Switch Command:
 *   - Add the 'Switch' command to the Actor Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 * 
 *   Switch Out Animation?:
 *   - Show the sprites switching out when using individual party
 *     member switching?
 * 
 *   TPB: Immediate Action:
 *   - Allow actors to immediate act upon switching in for TPB battle systems?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These Plugin Parameters control the text that you see in-game related to the
 * Party System plugin.
 *
 * ---
 *
 * General
 * 
 *   Active Party:
 *   - Vocabulary used to represent the Active Party.
 * 
 *   Reserve Party:
 *   - Vocabulary used to represent the Reserve Party.
 * 
 *   Status:
 *   - Vocabulary used to represent the Status Window.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Party Scene > Windows
 * 
 *   Empty:
 *   - For the party and status windows when no actor is selected.
 * 
 *   Remove:
 *   - For the remove option.
 *
 * ---
 *
 * Party Scene > Button Assist
 * 
 *   Swap Positions:
 *   - Button assist text for the page up/down commands.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Remove:
 *   - Button assist text for the removal command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Sort:
 *   - Button assist text for the sort command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap In:
 *   - Button assist text for swapping in actors.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap Out:
 *   - Button assist text for swapping out actors.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Battle Scene
 * 
 *   Party Command:
 *   - Command text for entering Party Scene.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Formation:
 *   - Help text for Formation command.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Queue Message:
 *   - Message to say the Party Scene is queued.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Switch Command:
 *   - Command text for switching out members.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Switch:
 *   - Help text for Switch command.
 *   - Requires VisuMZ_1_BattleCore!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Party.
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
 * If you don't like the locations of the windows in Scene_Party, change them
 * up with these Plugin Parameters, provided that you have an understanding of
 * JavaScript code.
 *
 * ---
 *
 * Active Party Label
 * Active Party Window
 * Reserve Party Label
 * Reserve Party Window
 * Status Label
 * Status Window
 * Battle Switch Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Columns:
 *   - Available only for the Reserve Party Window.
 *   - How many columns do you want there to be for the window?
 * 
 *   Actor Graphic:
 *   - Available only for Active Party Window and Reserve Party Window.
 *   - Choose how the actor graphics appear in the specific windows.
 *     - Face
 *     - Map Sprite
 *     - Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * 
 *     Map Sprite:
 *     Sideview Battler:
 * 
 *       Offset X:
 *       Offset Y:
 *       - If showing map sprites, offset the x or y coordinates.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
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
 * Version 1.25: July 28, 2022
 * * Bug Fixes!
 * ** Changing party members via actor command with a less than max battle size
 *    after removing a middle member midway through battle will no longer cause
 *    weird results when switching. Fix made by Arisu.
 * ** Party members that were switched out during battle animations with active
 *    TPB/ATB will no longer cause damage popup crashes when switched back in a
 *    follow up battle. Fix made by Arisu.
 * 
 * Version 1.24: March 24, 2022
 * * Compatibility Update!
 * ** Compatibility update with Skills & States Core Passive Conditions
 *    involving the party leader. Update made by Arisu.
 * 
 * Version 1.23: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: July 16, 2021
 * * Feature Update!
 * ** Added a fail safe that prevents on-battle start events from triggering
 *    when adding party members outside of battle under evented circumstances
 *    that function as a bridge between event and battle. Fix by Irina.
 * 
 * Version 1.21: July 9, 2021
 * * Bug Fixes!
 * ** When using TPB-based battle systems, adding actors to the main party
 *    would not enable them to move. This should be fixed. Fix made by Irina.
 * 
 * Version 1.20: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.19: June 18, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.18: April 16, 2021
 * * Documentation Update!
 * ** Fixed typo. Fix made by Arisu.
 * 
 * Version 1.17: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_2_BattleSystemOTB plugin.
 * 
 * Version 1.16: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.15: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Gneral > Battle Scene > Battle Party Icon
 * **** For some reason, we never had a setting that lets you change the party
 *      icon. Well, now there is!
 * 
 * Version 1.14: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Party Index to Reserve
 * **** Moves an actor in a specific party index to reserve.
 *      Map only. Must be 1 actor left. You may use code.
 * *** Party: Move Random Reserve to Active
 * **** Moves a random actor from the reserve party to active.
 *      Map only. Must be enough space in active party.
 * 
 * Version 1.13: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Actor(s) to Active
 * **** Map only. Moves an actor to the active party if there is room.
 * *** Party: Move Actor(s) to Reserve
 * **** Map only. Moves an actor to the reserve party.
 * 
 * Version 1.12: January 15, 2021
 * * Bug Fixes!
 * ** For battle testing, if the number of battle test members exceeds the
 *    maximum battle member slots, trim them until they match. Fix by Olivia.
 * 
 * Version 1.11: January 1, 2021
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 25, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: December 18, 2020
 * * Bug Fixes!
 * ** Removing party members in the active party by event command will now be
 *    properly removed from the party. Fix made by Yanfly.
 * 
 * Version 1.08: December 4, 2020
 * * Bug Fixes!
 * ** With TPB battle systems, after switching out party members, the battle
 *    system will no longer carry over any previous active battle members in
 *    the command window. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** With Active TPB, switching out a party member mid-action is no longer
 *    possible to prevent bugs. Intead, there party switching action will be
 *    queued and take effect after the action has been completed. Fix made by
 *    Yanfly.
 * * Compatibility Update!
 * ** Game_Party.swapOrder function now works with this plugin. However, keep
 *    in mind that due to how this party system plugin allows you have empty
 *    slots in the active battle party, this function will fill in the empty
 *    slots upon usage. Update made by Yanfly.
 *
 * Version 1.06: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin Command "Party: Change Max Battle Members" now works again.
 *    Fix made by Arisu.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Adding party members during battle through the party window command will
 *    no longer cause crashes after they input an action. Fix made by Yanfly.
 * 
 * Version 1.02: October 4, 2020
 * * Bug Fixes!
 * ** Adding party members during test play should now work again.
 *    Fix made by Irina.
 * ** Changing party members mid-battle through the actor command should now
 *    refresh the party followers afterwards. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Arisu!
 * *** General > Party Command Window > TPB: Immediate Action
 * **** Allow actors to immediate act upon switching in for TPB battle systems?
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** When switching actors with states, buffs, and/or debuffs already applied,
 *    the state icons found in the status window will now switch over properly,
 *    too. Fix made by Arisu.
 *
 * Version 1.00: September 7, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallPartyScene
 * @text Party: Call Party Scene
 * @desc Calls the party changing scene.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeMaxBattleMembers
 * @text Party: Change Max Battle Members
 * @desc Changes the number of max battle members possible.
 * Cannot be use mid-battle.
 *
 * @arg Value:eval
 * @text Max Members
 * @desc Changes the number of max battle members possible.
 * Use 0 for the game's default number.
 * @default 4
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LockPartyMembers
 * @text Party: Lock/Unlock Member(s)
 * @desc Allows you to lock/unlock a party member.
 * Locked actors cannot change their party position.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to lock/unlock.
 * Locked actors cannot change their party position.
 * @default ["1"]
 * 
 * @arg Lock:eval
 * @text Lock?
 * @type boolean
 * @on Lock
 * @off Unlock
 * @desc Lock the selected actor(s)?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToActive
 * @text Party: Move Actor(s) to Active
 * @desc Moves an actor to the active party if there is room.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the active party if there is room.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToReserve
 * @text Party: Move Actor(s) to Reserve
 * @desc Moves an actor to the reserve party. Must be 1 actor left.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the reserve party.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MovePartyIndexToReserve
 * @text Party: Move Party Index to Reserve
 * @desc Moves an actor in a specific party index to reserve.
 * Map only. Must be 1 actor left.
 *
 * @arg Index:eval
 * @text Party Index
 * @desc Type in which index to move. Index values start at 0.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveRandomToActive
 * @text Party: Move Random Reserve to Active
 * @desc Moves a random actor from the reserve party to active.
 * Map only. Must be enough space in active party.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RequirePartyMembers
 * @text Party: Require Member(s)
 * @desc Allows you to require/free a party member.
 * Required actors must be in the party to exit the scene.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to require/free.
 * Required actors must be in the party to exit the scene.
 * @default ["1"]
 * 
 * @arg Require:eval
 * @text Require?
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Make the selected actor(s) required?
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
 * @param PartySystem
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
 * @desc General settings pertaining to Party-related mechanics.
 * @default {"General":"","MaxBattleMembers:num":"4","PartyScene":"","AddRemoveCmd:eval":"true","LockIcon:num":"195","RequireIcon:num":"87","DrawBackRect:eval":"true","BackRectColor:str":"19","PartyCmdWin":"","PartyCmdWinAddParty:eval":"false","PartyCmdCooldown:num":"1","tpbImmediateAction:eval":"true","ActorCmdWin":"","ActorCmdWinAddParty:eval":"true","ActorCmdCooldown:num":"1","SwitchOutAnimation:eval":"true"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"General":"","ActiveParty:str":"Active Party","ReserveParty:str":"Reserve Party","Status:str":"Status","PartyScene":"","Windows":"","Empty:str":"- Empty -","Remove:str":"Remove","ButtonAssist":"","AssistSwapPosition:str":"Quick Swap","AssistRemove:str":"Remove","AssistSort:str":"Sort","AssistSwapIn:str":"Swap In","AssistSwapOut:str":"Swap Out","BattleScene":"","BattlePartyCmd:str":"Party","BattleHelpFormation:json":"\"Change up your party formation.\"","QueuePartyScene:str":"%1 Menu queued after action is complete.","BattleSwitchOut:str":"Switch","BattleHelpSwitch:json":"\"Switch out this party member with another.\""}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Party.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you control how the windows appear in Scene_Party.
 * @default {"ActivePartyLabel":"","ActivePartyLabelBgType:num":"0","ActivePartyLabelRect:func":"\"const wx = 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ActivePartyWindow":"","ActivePartyWindowBgType:num":"0","ActivePartyGraphic:str":"face","ActivePartyMapSprite":"","ActiveSpriteOffsetX:num":"0","ActiveSpriteOffsetY:num":"4","ActivePartySvBattler":"","ActiveBattlerOffsetX:num":"0","ActiveBattlerOffsetY:num":"4","ActivePartyWindowRect:func":"\"const wx = 0;\\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyLabel":"","ReservePartyLabelBgType:num":"0","ReservePartyLabelRect:func":"\"const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyWindow":"","ReservePartyWindowBgType:num":"0","ReserveItemThickness:num":"2","ReservePartyGraphic:str":"face","ReservePartyMapSprite":"","ReserveSpriteOffsetX:num":"24","ReserveSpriteOffsetY:num":"4","ReservePartySvBattler":"","ReserveBattlerOffsetX:num":"48","ReserveBattlerOffsetY:num":"4","ReservePartyWindowRect:func":"\"const ww = this._reservePartyLabel.width;\\nconst wx = this._reservePartyLabel.x;\\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusLabel":"","StatusLabelBgType:num":"0","StatusLabelRect:func":"\"const ww = Graphics.boxWidth - this._reservePartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow":"","StatusWindowBgType:num":"0","StatusWindowDraw:func":"\"// Draw Empty\\nif (!this._actor) {\\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\\n    this.changeTextColor(ColorManager.systemColor());\\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\\n    return;\\n}\\n\\n// Draw Face and Simple Status\\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\\n\\n// Declare Constants\\nconst lineHeight = this.lineHeight();\\nconst params = this.actorParams();\\nconst paramWidth = Math.round(this.innerWidth / 2);\\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\\nconst baseX = 0;\\nlet x = 0;\\nlet y = ImageManager.faceHeight + lineHeight / 2;\\n\\n// Draw Parameters\\nfor (const param of params) {\\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\\n    this.drawParamName(param, x, y, paramWidth);\\n    this.drawParamValue(param, x, y, paramWidth);\\n\\n    if (x === baseX) {\\n        x += paramWidth;\\n    } else {\\n        x = baseX;\\n        y += lineHeight;\\n    }\\n}\"","StatusWindowRect:func":"\"const ww = this._statusPartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._reservePartyWindow.y;\\nconst wh = this._reservePartyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","BattleSwitchWindow":"","BattleSwitchWindowBgType:num":"0","BattleSwitchWindowRect:func":"\"const padding = $gameSystem.windowPadding() * 2;\\nlet ww = 516 + padding;\\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param General
 *
 * @param MaxBattleMembers:num
 * @text Max Battle Members
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of battle members.
 * @default 4
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyIcon:num
 * @text Battle Party Icon
 * @parent BattleScene
 * @desc Icon used for changing party members.
 * @default 75
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param AddRemoveCmd:eval
 * @text Add Remove Command
 * @parent PartyScene
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Remove' command to the party scene?
 * @default true
 *
 * @param LockIcon:num
 * @text Locked Member Icon
 * @parent PartyScene
 * @desc Icon used for a locked party member.
 * @default 195
 *
 * @param RequireIcon:num
 * @text Required Member Icon
 * @parent PartyScene
 * @desc Icon used for a required party member.
 * @default 87
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent PartyScene
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param PartyCmdWin
 * @text Party Command Window
 *
 * @param PartyCmdWinAddParty:eval
 * @text Add Party Command
 * @parent PartyCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Party' command to the Party Command Window?
 * @default false
 *
 * @param PartyCmdCooldown:num
 * @text Command Cooldown
 * @parent PartyCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param ActorCmdWin
 * @text Actor Command Window
 *
 * @param ActorCmdWinAddParty:eval
 * @text Add Switch Command
 * @parent ActorCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Switch' command to the Actor Command Window?
 * @default true
 *
 * @param ActorCmdCooldown:num
 * @text Command Cooldown
 * @parent ActorCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param SwitchOutAnimation:eval
 * @text Switch Out Animation?
 * @parent ActorCmdWin
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the sprites switching out when using individual party member switching?
 * @default true
 *
 * @param tpbImmediateAction:eval
 * @text TPB: Immediate Action
 * @parent ActorCmdWin
 * @type boolean
 * @on Immediate Action
 * @off Empty Gauge
 * @desc Allow actors to immediate act upon switching in for TPB battle systems?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param ActiveParty:str
 * @text Active Party
 * @parent General
 * @desc Vocabulary used to represent the Active Party.
 * @default Active Party
 *
 * @param ReserveParty:str
 * @text Reserve Party
 * @parent General
 * @desc Vocabulary used to represent the Reserve Party.
 * @default Reserve Party
 *
 * @param Status:str
 * @text Status
 * @parent General
 * @desc Vocabulary used to represent the Status Window.
 * @default Status
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param Windows
 * @parent PartyScene
 *
 * @param Empty:str
 * @text Empty
 * @parent Windows
 * @desc For the party and status windows when no actor is selected.
 * @default - Empty -
 *
 * @param Remove:str
 * @text Remove
 * @parent Windows
 * @desc For the remove option.
 * @default Remove
 *
 * @param ButtonAssist
 * @text Button Assist
 * @parent PartyScene
 *
 * @param AssistSwapPosition:str
 * @text Swap Positions
 * @parent ButtonAssist
 * @desc Button assist text for the page up/down commands.
 * Requires VisuMZ_0_CoreEngine!
 * @default Quick Swap
 *
 * @param AssistRemove:str
 * @text Remove
 * @parent ButtonAssist
 * @desc Button assist text for the removal command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Remove
 *
 * @param AssistSort:str
 * @text Sort
 * @parent ButtonAssist
 * @desc Button assist text for the sort command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Sort
 *
 * @param AssistSwapIn:str
 * @text Swap In
 * @parent ButtonAssist
 * @desc Button assist text for swapping in actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap In
 *
 * @param AssistSwapOut:str
 * @text Swap Out
 * @parent ButtonAssist
 * @desc Button assist text for swapping out actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap Out
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyCmd:str
 * @text Party Command
 * @parent BattleScene
 * @desc Command text for entering Party Scene.
 * Requires VisuMZ_1_BattleCore!
 * @default Party
 *
 * @param BattleHelpFormation:json
 * @text Help: Formation
 * @parent BattlePartyCmd:str
 * @type note
 * @desc Help text for Formation command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Change up your party formation."
 *
 * @param QueuePartyScene:str
 * @text Queue Message
 * @parent BattlePartyCmd:str
 * @desc Message to say the Party Scene is queued.
 * Requires VisuMZ_1_BattleCore!
 * @default %1 Menu queued after action is complete.
 *
 * @param BattleSwitchOut:str
 * @text Switch Command
 * @parent BattleScene
 * @desc Command text for switching out members.
 * Requires VisuMZ_1_BattleCore!
 * @default Switch
 *
 * @param BattleHelpSwitch:json
 * @text Help: Switch
 * @parent BattleSwitchOut:str
 * @type note
 * @desc Help text for Switch command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Switch out this party member with another."
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
 * @param ActivePartyLabel
 * @text Active Party Label
 *
 * @param ActivePartyLabelBgType:num
 * @text Background Type
 * @parent ActivePartyLabel
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
 * @param ActivePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ActivePartyWindow
 * @text Active Party Window
 *
 * @param ActivePartyWindowBgType:num
 * @text Background Type
 * @parent ActivePartyWindow
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
 * @param ActivePartyGraphic:str
 * @text Actor Graphic
 * @parent ActivePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the active party menu.
 * @default face
 *
 * @param ActivePartyMapSprite
 * @text Map Sprite
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveSpriteOffsetX:num
 * @text Offset X
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveSpriteOffsetY:num
 * @text Offset Y
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartySvBattler
 * @text Sideview Battler
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveBattlerOffsetX:num
 * @text Offset X
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveBattlerOffsetY:num
 * @text Offset Y
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\nconst ww = Graphics.boxWidth;\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyLabel
 * @text Reserve Party Label
 *
 * @param ReservePartyLabelBgType:num
 * @text Background Type
 * @parent ReservePartyLabel
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
 * @param ReservePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyWindow
 * @text Reserve Party Window
 *
 * @param ReservePartyWindowBgType:num
 * @text Background Type
 * @parent ReservePartyWindow
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
 * @param ReserveCol:num
 * @text Columns
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many columns do you want there to be for the window?
 * @default 1
 *
 * @param ReserveItemThickness:num
 * @text Row Thickness
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many rows thick do you want selectable items to be?
 * @default 2
 *
 * @param ReservePartyGraphic:str
 * @text Actor Graphic
 * @parent ReservePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the reserve party menu.
 * @default face
 *
 * @param ReservePartyMapSprite
 * @text Map Sprite
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveSpriteOffsetX:num
 * @text Offset X
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from left.
 * @default 24
 *
 * @param ReserveSpriteOffsetY:num
 * @text Offset Y
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartySvBattler
 * @text Sideview Battler
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveBattlerOffsetX:num
 * @text Offset X
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from left.
 * @default 48
 *
 * @param ReserveBattlerOffsetY:num
 * @text Offset Y
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._reservePartyLabel.width;\nconst wx = this._reservePartyLabel.x;\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusLabel
 * @text Status Label
 *
 * @param StatusLabelBgType:num
 * @text Background Type
 * @parent StatusLabel
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
 * @param StatusLabelRect:func
 * @text JS: X, Y, W, H
 * @parent StatusLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._reservePartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusWindowBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusWindowDraw:func
 * @text JS: Draw Data
 * @parent StatusWindow
 * @type note
 * @desc Code used to draw the display data in the Status Window.
 * @default "// Draw Empty\nif (!this._actor) {\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\n    this.changeTextColor(ColorManager.systemColor());\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\n    return;\n}\n\n// Draw Face and Simple Status\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\n\n// Declare Constants\nconst lineHeight = this.lineHeight();\nconst params = this.actorParams();\nconst paramWidth = Math.round(this.innerWidth / 2);\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\nconst baseX = 0;\nlet x = 0;\nlet y = ImageManager.faceHeight + lineHeight / 2;\n\n// Draw Parameters\nfor (const param of params) {\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\n    this.drawParamName(param, x, y, paramWidth);\n    this.drawParamValue(param, x, y, paramWidth);\n\n    if (x === baseX) {\n        x += paramWidth;\n    } else {\n        x = baseX;\n        y += lineHeight;\n    }\n}"
 *
 * @param StatusWindowRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._statusPartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._reservePartyWindow.y;\nconst wh = this._reservePartyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param BattleSwitchWindow
 * @text Battle Switch Window
 *
 * @param BattleSwitchWindowBgType:num
 * @text Background Type
 * @parent BattleSwitchWindow
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
 * @param BattleSwitchWindowRect:func
 * @text JS: X, Y, W, H
 * @parent BattleSwitchWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * Does not apply to Border Battle Layout style.
 * @default "const padding = $gameSystem.windowPadding() * 2;\nlet ww = 516 + padding;\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x12a2a9=_0xef4e;(function(_0x5a76ef,_0x15169d){const _0x2a3206=_0xef4e,_0xcbd09d=_0x5a76ef();while(!![]){try{const _0x24ae47=parseInt(_0x2a3206(0x217))/0x1+parseInt(_0x2a3206(0xe3))/0x2+-parseInt(_0x2a3206(0x143))/0x3*(parseInt(_0x2a3206(0x103))/0x4)+-parseInt(_0x2a3206(0x20d))/0x5+parseInt(_0x2a3206(0x128))/0x6*(-parseInt(_0x2a3206(0x257))/0x7)+parseInt(_0x2a3206(0x19a))/0x8*(-parseInt(_0x2a3206(0x172))/0x9)+-parseInt(_0x2a3206(0x2db))/0xa*(-parseInt(_0x2a3206(0x2b6))/0xb);if(_0x24ae47===_0x15169d)break;else _0xcbd09d['push'](_0xcbd09d['shift']());}catch(_0x4e3ef3){_0xcbd09d['push'](_0xcbd09d['shift']());}}}(_0x2b33,0x8ce21));var label=_0x12a2a9(0x132),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x12a2a9(0x278)](function(_0x356b0f){const _0x3f01b9=_0x12a2a9;return _0x356b0f[_0x3f01b9(0x161)]&&_0x356b0f[_0x3f01b9(0x1bd)][_0x3f01b9(0x23a)]('['+label+']');})[0x0];VisuMZ[label][_0x12a2a9(0x167)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x12a2a9(0x168)]=function(_0x456542,_0x3dab8d){const _0x36a45f=_0x12a2a9;for(const _0x37da13 in _0x3dab8d){if(_0x37da13[_0x36a45f(0x112)](/(.*):(.*)/i)){if('tpuZa'!==_0x36a45f(0x1db)){const _0x5dd26b=String(RegExp['$1']),_0x40ff01=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x14c23c,_0x29c0ac,_0x24db5a;switch(_0x40ff01){case'NUM':_0x14c23c=_0x3dab8d[_0x37da13]!==''?Number(_0x3dab8d[_0x37da13]):0x0;break;case _0x36a45f(0x164):_0x29c0ac=_0x3dab8d[_0x37da13]!==''?JSON['parse'](_0x3dab8d[_0x37da13]):[],_0x14c23c=_0x29c0ac[_0x36a45f(0x1fb)](_0x170ab4=>Number(_0x170ab4));break;case _0x36a45f(0x111):_0x14c23c=_0x3dab8d[_0x37da13]!==''?eval(_0x3dab8d[_0x37da13]):null;break;case _0x36a45f(0x1aa):_0x29c0ac=_0x3dab8d[_0x37da13]!==''?JSON['parse'](_0x3dab8d[_0x37da13]):[],_0x14c23c=_0x29c0ac[_0x36a45f(0x1fb)](_0x5c0791=>eval(_0x5c0791));break;case _0x36a45f(0xef):_0x14c23c=_0x3dab8d[_0x37da13]!==''?JSON[_0x36a45f(0x1be)](_0x3dab8d[_0x37da13]):'';break;case'ARRAYJSON':_0x29c0ac=_0x3dab8d[_0x37da13]!==''?JSON[_0x36a45f(0x1be)](_0x3dab8d[_0x37da13]):[],_0x14c23c=_0x29c0ac[_0x36a45f(0x1fb)](_0x59a34a=>JSON[_0x36a45f(0x1be)](_0x59a34a));break;case'FUNC':_0x14c23c=_0x3dab8d[_0x37da13]!==''?new Function(JSON[_0x36a45f(0x1be)](_0x3dab8d[_0x37da13])):new Function('return\x200');break;case _0x36a45f(0x275):_0x29c0ac=_0x3dab8d[_0x37da13]!==''?JSON[_0x36a45f(0x1be)](_0x3dab8d[_0x37da13]):[],_0x14c23c=_0x29c0ac[_0x36a45f(0x1fb)](_0x9d1de6=>new Function(JSON[_0x36a45f(0x1be)](_0x9d1de6)));break;case'STR':_0x14c23c=_0x3dab8d[_0x37da13]!==''?String(_0x3dab8d[_0x37da13]):'';break;case'ARRAYSTR':_0x29c0ac=_0x3dab8d[_0x37da13]!==''?JSON[_0x36a45f(0x1be)](_0x3dab8d[_0x37da13]):[],_0x14c23c=_0x29c0ac[_0x36a45f(0x1fb)](_0x43f6e7=>String(_0x43f6e7));break;case _0x36a45f(0x10f):_0x24db5a=_0x3dab8d[_0x37da13]!==''?JSON['parse'](_0x3dab8d[_0x37da13]):{},_0x14c23c=VisuMZ[_0x36a45f(0x168)]({},_0x24db5a);break;case _0x36a45f(0x123):_0x29c0ac=_0x3dab8d[_0x37da13]!==''?JSON['parse'](_0x3dab8d[_0x37da13]):[],_0x14c23c=_0x29c0ac['map'](_0x2864c3=>VisuMZ['ConvertParams']({},JSON['parse'](_0x2864c3)));break;default:continue;}_0x456542[_0x5dd26b]=_0x14c23c;}else{const _0x3afa1e=this[_0x36a45f(0x16f)](this[_0x36a45f(0xf3)]());return _0x3afa1e?_0x3afa1e[_0x36a45f(0x1d0)]():!![];}}}return _0x456542;},(_0x2de8ea=>{const _0x210267=_0x12a2a9,_0x31c189=_0x2de8ea[_0x210267(0x22a)];for(const _0x9e1437 of dependencies){if(_0x210267(0x1af)!==_0x210267(0x1af))this[_0x210267(0x1e3)]();else{if(!Imported[_0x9e1437]){alert(_0x210267(0x106)[_0x210267(0x1c9)](_0x31c189,_0x9e1437)),SceneManager[_0x210267(0x25c)]();break;}}}const _0x4ac211=_0x2de8ea['description'];if(_0x4ac211['match'](/\[Version[ ](.*?)\]/i)){if('stpeJ'!=='FEZKW'){const _0x178600=Number(RegExp['$1']);_0x178600!==VisuMZ[label][_0x210267(0x1b2)]&&('VvOWo'!==_0x210267(0x2d7)?(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x210267(0x1c9)](_0x31c189,_0x178600)),SceneManager[_0x210267(0x25c)]()):(_0xc9103['loadFace'](_0x1173f3[_0x210267(0x2b2)]()),_0x6940cd[_0x210267(0x18d)](_0x5b5c4e[_0x210267(0x24a)]()),_0x51baad[_0x210267(0x1fd)](_0x4842c4[_0x210267(0x1a6)]())));}else return _0x5e6f63['PartySystem'][_0x210267(0x167)][_0x210267(0x2d9)][_0x210267(0x255)]||0x1;}if(_0x4ac211['match'](/\[Tier[ ](\d+)\]/i)){const _0x3477ba=Number(RegExp['$1']);_0x3477ba<tier?_0x210267(0x212)===_0x210267(0x212)?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x210267(0x1c9)](_0x31c189,_0x3477ba,tier)),SceneManager[_0x210267(0x25c)]()):(this[_0x210267(0x104)]=![],this[_0x210267(0x12f)][_0x210267(0xe1)](),_0x1961fe['actor']()&&this[_0x210267(0x203)][_0x210267(0x10c)]()):tier=Math[_0x210267(0x2eb)](_0x3477ba,tier);}VisuMZ[_0x210267(0x168)](VisuMZ[label][_0x210267(0x167)],_0x2de8ea[_0x210267(0x12d)]);})(pluginData),PluginManager[_0x12a2a9(0x2cd)](pluginData[_0x12a2a9(0x22a)],_0x12a2a9(0x18a),_0xe7c4aa=>{SceneManager['push'](Scene_Party);}),PluginManager[_0x12a2a9(0x2cd)](pluginData[_0x12a2a9(0x22a)],_0x12a2a9(0x1f5),_0x4f8f0d=>{const _0xd9d107=_0x12a2a9;if($gameParty[_0xd9d107(0x295)]())return;VisuMZ[_0xd9d107(0x168)](_0x4f8f0d,_0x4f8f0d);const _0x482213=_0x4f8f0d[_0xd9d107(0x129)];$gameParty[_0xd9d107(0x1ac)](_0x482213);}),PluginManager[_0x12a2a9(0x2cd)](pluginData['name'],'MoveActorsToActive',_0x42c87c=>{const _0xf9c092=_0x12a2a9;if(!SceneManager['isSceneMap']())return;VisuMZ[_0xf9c092(0x168)](_0x42c87c,_0x42c87c);const _0x566a7c=_0x42c87c[_0xf9c092(0x2ce)];for(const _0x5d8f67 of _0x566a7c){if(_0xf9c092(0x131)!==_0xf9c092(0x131)){if(this[_0xf9c092(0x138)]===_0x21217e)this[_0xf9c092(0x249)]();if(!this[_0xf9c092(0x1d0)]())return![];if(this[_0xf9c092(0x216)]())return![];return this['_partySwitchBattleCommandCooldown']<=0x0;}else $gameParty[_0xf9c092(0x2cb)](_0x5d8f67);}$gamePlayer[_0xf9c092(0x150)]();}),PluginManager[_0x12a2a9(0x2cd)](pluginData['name'],_0x12a2a9(0x1c0),_0x5551c0=>{const _0x4b5bc1=_0x12a2a9;if(!SceneManager[_0x4b5bc1(0x108)]())return;VisuMZ['ConvertParams'](_0x5551c0,_0x5551c0);const _0x3a803c=_0x5551c0['Actors'];for(const _0x22b9f3 of _0x3a803c){if('JZSsf'===_0x4b5bc1(0x2ad)){let _0x11c953=0x0;if(!_0x390aa8[_0x4b5bc1(0x1d0)]())_0x11c953+=0x1;if(_0x215e12[_0x4b5bc1(0x216)]())_0x11c953+=0x1;if(_0x11c953<=0x1)return this['drawActorPartyIconsHorz'](_0xf7c682,_0x1f3886,_0x13868a);_0x311d85+=_0xd1f51[_0x4b5bc1(0x265)]((this[_0x4b5bc1(0x159)]()-_0x4bedb8[_0x4b5bc1(0x29b)])/0x2),_0x1eebf2-=_0x3bc370[_0x4b5bc1(0x265)](this[_0x4b5bc1(0x159)]()/0x2),this[_0x4b5bc1(0x2e9)](_0x4b92f0[_0x4b5bc1(0x290)],_0x42c970,_0x55ce05),_0x42b563+=this[_0x4b5bc1(0x159)](),this[_0x4b5bc1(0x2e9)](_0x221bd1[_0x4b5bc1(0x14f)],_0x1cb4e6,_0xb23165);}else{if($gameParty[_0x4b5bc1(0x144)]()['length']<=0x1)break;$gameParty[_0x4b5bc1(0x189)](_0x22b9f3);}}$gamePlayer[_0x4b5bc1(0x150)]();}),PluginManager[_0x12a2a9(0x2cd)](pluginData['name'],'MovePartyIndexToReserve',_0x3f58a9=>{const _0x1ed181=_0x12a2a9;if(!SceneManager[_0x1ed181(0x108)]())return;if($gameParty[_0x1ed181(0x144)]()['length']<=0x1)return;if(!$gameParty[_0x1ed181(0x226)])return;if($gameParty[_0x1ed181(0x226)][_0x1ed181(0x1ea)]<=0x0)return;VisuMZ[_0x1ed181(0x168)](_0x3f58a9,_0x3f58a9);const _0xcbea76=_0x3f58a9[_0x1ed181(0xbe)],_0x369858=$gameParty[_0x1ed181(0x226)][_0xcbea76];$gameParty[_0x1ed181(0x189)](_0x369858),$gamePlayer[_0x1ed181(0x150)]();}),PluginManager[_0x12a2a9(0x2cd)](pluginData['name'],_0x12a2a9(0x2b7),_0x56abe7=>{const _0x10bbcb=_0x12a2a9;if(!SceneManager[_0x10bbcb(0x108)]())return;if($gameParty[_0x10bbcb(0x144)]()[_0x10bbcb(0x1ea)]>=$gameParty[_0x10bbcb(0x2ca)]())return;if($gameParty['reserveMembers']()[_0x10bbcb(0x1ea)]<=0x0)return;const _0x45d05c=$gameParty['reserveMembers'](),_0x3f7296=_0x45d05c[Math[_0x10bbcb(0x26d)](Math['random']()*_0x45d05c['length'])],_0xee3b57=_0x3f7296[_0x10bbcb(0x263)]();$gameParty[_0x10bbcb(0x2cb)](_0xee3b57),$gamePlayer[_0x10bbcb(0x150)]();}),PluginManager[_0x12a2a9(0x2cd)](pluginData[_0x12a2a9(0x22a)],_0x12a2a9(0x1d4),_0x5d3b41=>{const _0x48c7a7=_0x12a2a9;VisuMZ['ConvertParams'](_0x5d3b41,_0x5d3b41);const _0x2e9b4e=_0x5d3b41[_0x48c7a7(0x2ce)]['map'](_0x1fd77a=>$gameActors['actor'](_0x1fd77a))['remove'](null),_0x2ecca9=_0x5d3b41[_0x48c7a7(0x19d)];for(const _0x3ae28a of _0x2e9b4e){if('rhgeY'===_0x48c7a7(0x27e)){_0x140467[_0x48c7a7(0x28c)][_0x48c7a7(0xce)][_0x48c7a7(0x26c)](this,_0x5cca3b);if(_0x3b499a>=0x0)this[_0x48c7a7(0x1ed)]=_0x51b09a;}else{if(!_0x3ae28a)continue;_0x3ae28a[_0x48c7a7(0x267)](_0x2ecca9);}}}),PluginManager[_0x12a2a9(0x2cd)](pluginData[_0x12a2a9(0x22a)],_0x12a2a9(0x2b9),_0xfeacb0=>{const _0x3427eb=_0x12a2a9;VisuMZ[_0x3427eb(0x168)](_0xfeacb0,_0xfeacb0);const _0x106207=_0xfeacb0[_0x3427eb(0x2ce)][_0x3427eb(0x1fb)](_0x546849=>$gameActors['actor'](_0x546849))[_0x3427eb(0x247)](null),_0x43c649=_0xfeacb0['Require'];for(const _0x8eea1d of _0x106207){if(_0x3427eb(0x28f)===_0x3427eb(0x28f)){if(!_0x8eea1d)continue;_0x8eea1d[_0x3427eb(0xc7)](_0x43c649);}else _0x54733e['_tpbChargeTime']=_0x467b76[_0x3427eb(0x1ba)],_0x1c0ae2[_0x3427eb(0x2a7)]=_0x3427eb(0x26a);}}),ImageManager[_0x12a2a9(0x290)]=VisuMZ[_0x12a2a9(0x132)]['Settings'][_0x12a2a9(0x240)][_0x12a2a9(0xd0)],ImageManager[_0x12a2a9(0x14f)]=VisuMZ['PartySystem'][_0x12a2a9(0x167)][_0x12a2a9(0x240)]['RequireIcon'],TextManager[_0x12a2a9(0x23c)]=VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x167)][_0x12a2a9(0x1b0)][_0x12a2a9(0x2e8)],TextManager['reserveParty']=VisuMZ['PartySystem'][_0x12a2a9(0x167)]['Vocab'][_0x12a2a9(0x186)],TextManager[_0x12a2a9(0xf9)]=VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x167)][_0x12a2a9(0x1b0)]['Status'],TextManager['emptyPartyMember']=VisuMZ['PartySystem'][_0x12a2a9(0x167)][_0x12a2a9(0x1b0)]['Empty'],TextManager['removePartyMember']=VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x167)][_0x12a2a9(0x1b0)][_0x12a2a9(0x269)],TextManager[_0x12a2a9(0x102)]=VisuMZ['PartySystem'][_0x12a2a9(0x167)]['Vocab'][_0x12a2a9(0x162)],TextManager[_0x12a2a9(0x219)]=VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x167)]['Vocab'][_0x12a2a9(0x194)],TextManager['assistSortPartyMembers']=VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x167)][_0x12a2a9(0x1b0)][_0x12a2a9(0x10b)],TextManager[_0x12a2a9(0x1e8)]=VisuMZ[_0x12a2a9(0x132)]['Settings']['Vocab'][_0x12a2a9(0x188)],TextManager['assistSwapOutPartyMember']=VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x167)]['Vocab'][_0x12a2a9(0x2de)],ColorManager['getColor']=function(_0x41614f){const _0xf29195=_0x12a2a9;return _0x41614f=String(_0x41614f),_0x41614f[_0xf29195(0x112)](/#(.*)/i)?_0xf29195(0x1d6)[_0xf29195(0x1c9)](String(RegExp['$1'])):this['textColor'](Number(_0x41614f));},SceneManager['isSceneParty']=function(){const _0x42027d=_0x12a2a9;return this[_0x42027d(0x2ab)]&&this[_0x42027d(0x2ab)][_0x42027d(0x248)]===Scene_Party;},SceneManager[_0x12a2a9(0x108)]=function(){const _0x2352be=_0x12a2a9;return this[_0x2352be(0x2ab)]&&this[_0x2352be(0x2ab)][_0x2352be(0x248)]===Scene_Map;},VisuMZ['PartySystem'][_0x12a2a9(0x1ca)]=BattleManager[_0x12a2a9(0x114)],BattleManager['setup']=function(_0x349889,_0x319fce,_0x59b8f3){const _0x329976=_0x12a2a9;VisuMZ[_0x329976(0x132)][_0x329976(0x1ca)][_0x329976(0x26c)](this,_0x349889,_0x319fce,_0x59b8f3),$gameParty['clearPartyBattleCommandCooldown']();},BattleManager['updateTargetsForPartySwitch']=function(_0x2d89e9,_0xeae47a){const _0x49546c=_0x12a2a9;if(_0x2d89e9===_0xeae47a)return;if(!_0x2d89e9)return;if(!_0xeae47a)return;if(this[_0x49546c(0xf6)]===_0x2d89e9)this[_0x49546c(0xf6)]=_0xeae47a;while(this[_0x49546c(0x27f)][_0x49546c(0x23a)](_0x2d89e9)){const _0x242bdf=this[_0x49546c(0x27f)][_0x49546c(0x297)](_0x2d89e9);this[_0x49546c(0x27f)][_0x242bdf]=_0xeae47a;}},VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x284)]=Game_Battler[_0x12a2a9(0x28c)]['onBattleStart'],Game_Battler['prototype'][_0x12a2a9(0x11f)]=function(_0x1108d4){const _0x7baebe=_0x12a2a9;VisuMZ[_0x7baebe(0x132)][_0x7baebe(0x284)]['call'](this,_0x1108d4);if(this[_0x7baebe(0x231)]())this[_0x7baebe(0x249)]();this[_0x7baebe(0x24e)]();},VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x2c7)]=Game_Battler[_0x12a2a9(0x28c)][_0x12a2a9(0x2ae)],Game_Battler[_0x12a2a9(0x28c)][_0x12a2a9(0x2ae)]=function(){const _0x8a6f3b=_0x12a2a9;VisuMZ['PartySystem'][_0x8a6f3b(0x2c7)]['call'](this);if(this['isActor']()&&$gameParty[_0x8a6f3b(0x295)]())this['updateBattlePartySwitchCooldown']();},VisuMZ[_0x12a2a9(0x132)]['Game_Actor_setup']=Game_Actor[_0x12a2a9(0x28c)][_0x12a2a9(0x114)],Game_Actor[_0x12a2a9(0x28c)][_0x12a2a9(0x114)]=function(_0x2db18f){const _0x282234=_0x12a2a9;VisuMZ['PartySystem']['Game_Actor_setup'][_0x282234(0x26c)](this,_0x2db18f),this[_0x282234(0x12c)](),this[_0x282234(0x249)]();},Game_Actor['prototype'][_0x12a2a9(0x12c)]=function(){const _0x5a5396=_0x12a2a9;this[_0x5a5396(0x2d6)]=![],this[_0x5a5396(0x1c7)]=![];},Game_Actor[_0x12a2a9(0x28c)][_0x12a2a9(0x1d0)]=function(){const _0x1ec2c5=_0x12a2a9;if(this[_0x1ec2c5(0x2d6)]===undefined)this['initPartySystem']();return!this['_partyLocked'];},Game_Actor['prototype']['setPartyLock']=function(_0x3a128a){const _0x2e9050=_0x12a2a9;if(this['_partyLocked']===undefined)this[_0x2e9050(0x12c)]();this[_0x2e9050(0x2d6)]=_0x3a128a;},Game_Actor['prototype'][_0x12a2a9(0x216)]=function(){const _0x19c3a3=_0x12a2a9;if(this['_partyRequired']===undefined)this['initPartySystem']();return this[_0x19c3a3(0x1c7)];},Game_Actor[_0x12a2a9(0x28c)][_0x12a2a9(0xc7)]=function(_0x9d960f){const _0x41c62b=_0x12a2a9;if(this[_0x41c62b(0x1c7)]===undefined)this[_0x41c62b(0x12c)]();this[_0x41c62b(0x1c7)]=_0x9d960f;},Game_Actor[_0x12a2a9(0x28c)][_0x12a2a9(0x249)]=function(){const _0x3f2978=_0x12a2a9;this[_0x3f2978(0x138)]=0x0;},Game_Actor[_0x12a2a9(0x28c)][_0x12a2a9(0x260)]=function(){const _0x4ca3ec=_0x12a2a9;if(this[_0x4ca3ec(0x138)]===undefined)this['clearPartySwitchCommandCooldown']();if(!this[_0x4ca3ec(0x1d0)]())return![];if(this[_0x4ca3ec(0x216)]())return![];return this[_0x4ca3ec(0x138)]<=0x0;},Game_Actor[_0x12a2a9(0x28c)][_0x12a2a9(0x2df)]=function(){const _0x5c9c7f=_0x12a2a9;if(this['_partySwitchBattleCommandCooldown']===undefined)this[_0x5c9c7f(0x249)]();return this[_0x5c9c7f(0x138)];},Game_Actor[_0x12a2a9(0x28c)][_0x12a2a9(0xc9)]=function(_0x3f90cd){const _0x31caa2=_0x12a2a9;if(this[_0x31caa2(0x138)]===undefined)this[_0x31caa2(0x249)]();this[_0x31caa2(0x138)]=_0x3f90cd||0x0;},Game_Actor[_0x12a2a9(0x28c)][_0x12a2a9(0x115)]=function(){const _0x193e42=_0x12a2a9;if(this[_0x193e42(0x138)]===undefined)this['clearPartySwitchCommandCooldown']();const _0xa12aa6=VisuMZ[_0x193e42(0x132)][_0x193e42(0x167)][_0x193e42(0x240)][_0x193e42(0x236)];this[_0x193e42(0xc9)](_0xa12aa6);},Game_Actor[_0x12a2a9(0x28c)][_0x12a2a9(0x1ae)]=function(){const _0x1d90cd=_0x12a2a9;if(this['_partySwitchBattleCommandCooldown']===undefined)this[_0x1d90cd(0x249)]();this[_0x1d90cd(0x138)]--;},Game_Actor[_0x12a2a9(0x28c)][_0x12a2a9(0x25b)]=function(_0xef0735){const _0x5ed352=_0x12a2a9;if(Imported[_0x5ed352(0x268)]&&BattleManager[_0x5ed352(0xdc)]()){if(_0x5ed352(0x28b)===_0x5ed352(0x28b))BattleManager[_0x5ed352(0x2b1)]();else return this[_0x5ed352(0x2ab)]&&this[_0x5ed352(0x2ab)]['constructor']===_0x165a23;}Imported[_0x5ed352(0x16b)]&&BattleManager[_0x5ed352(0xcd)]()&&(BattleManager['updateTurnOrderSTB'](),BattleManager[_0x5ed352(0x2ec)]=this,BattleManager['_currentActor']=this);if(Imported[_0x5ed352(0x1e2)]&&BattleManager[_0x5ed352(0x15d)]()){BattleManager[_0x5ed352(0x2ec)]=undefined,BattleManager['_currentActor']=this;const _0x4f765c=BattleManager[_0x5ed352(0x23e)][_0x5ed352(0x297)](_0xef0735);BattleManager[_0x5ed352(0x23e)][_0x4f765c]=this,BattleManager[_0x5ed352(0x152)]();}Imported[_0x5ed352(0x250)]&&BattleManager[_0x5ed352(0x1eb)]()&&(_0x5ed352(0x27b)===_0x5ed352(0x27c)?this[_0x5ed352(0x294)](...arguments):(BattleManager[_0x5ed352(0x2ec)]=this,BattleManager[_0x5ed352(0xd4)]=this));if(Imported[_0x5ed352(0x24b)]&&BattleManager[_0x5ed352(0x134)]()){if(_0x5ed352(0x26f)===_0x5ed352(0x26f)){BattleManager[_0x5ed352(0x2ec)]=this,BattleManager[_0x5ed352(0xd4)]=this;for(let _0x2db23b=0x0;_0x2db23b<BattleManager[_0x5ed352(0x23e)][_0x5ed352(0x1ea)];_0x2db23b++){if(_0x5ed352(0x288)===_0x5ed352(0x166))this[_0x5ed352(0x1b1)]();else{const _0x255fd0=BattleManager['_actionBattlers'][_0x2db23b];_0x255fd0===_0xef0735&&(BattleManager[_0x5ed352(0x23e)][_0x2db23b]=this);}}for(let _0x2300a4=0x0;_0x2300a4<BattleManager[_0x5ed352(0x28e)]['length'];_0x2300a4++){if(_0x5ed352(0x207)==='cOvDx'){const _0x23231d=BattleManager[_0x5ed352(0x28e)][_0x2300a4];_0x23231d===_0xef0735&&(BattleManager[_0x5ed352(0x28e)][_0x2300a4]=this);}else{let _0x3ddb5b=this[_0x5ed352(0x144)]();return _0x3ddb5b[0x0];}}}else _0x21f142[_0x5ed352(0x132)][_0x5ed352(0x23b)][_0x5ed352(0x26c)](this),this[_0x5ed352(0x21f)](),this['postPartySwitchMenuTpb'](),this[_0x5ed352(0x2ba)]();}},VisuMZ['PartySystem'][_0x12a2a9(0x1cc)]=Game_Unit['prototype']['inBattle'],Game_Unit[_0x12a2a9(0x28c)][_0x12a2a9(0x295)]=function(){const _0x136124=_0x12a2a9;if(SceneManager[_0x136124(0x233)]())return![];return VisuMZ[_0x136124(0x132)][_0x136124(0x1cc)][_0x136124(0x26c)](this);},Game_Party['defaultMaxBattleMembers']=VisuMZ[_0x12a2a9(0x132)]['Settings'][_0x12a2a9(0x240)][_0x12a2a9(0x27d)],VisuMZ[_0x12a2a9(0x132)]['Game_Party_initialize']=Game_Party[_0x12a2a9(0x28c)]['initialize'],Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x294)]=function(){const _0x3f1708=_0x12a2a9;VisuMZ[_0x3f1708(0x132)][_0x3f1708(0x13d)][_0x3f1708(0x26c)](this),this[_0x3f1708(0x133)](),this[_0x3f1708(0x1d5)](),this[_0x3f1708(0xd3)]();},Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x133)]=function(){const _0x578604=_0x12a2a9;this[_0x578604(0x1ab)]=0x0;},Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x260)]=function(){const _0x10ef33=_0x12a2a9;if(this[_0x10ef33(0x1ab)]===undefined)this[_0x10ef33(0x133)]();return this[_0x10ef33(0x1ab)]<=0x0;},Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x2df)]=function(){const _0x20d001=_0x12a2a9;if(this[_0x20d001(0x1ab)]===undefined)this[_0x20d001(0x133)]();return this['_partySystemBattleCommandCooldown'];},Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0xc9)]=function(_0x5308b0){const _0x4f9156=_0x12a2a9;if(this['_partySystemBattleCommandCooldown']===undefined)this[_0x4f9156(0x133)]();this[_0x4f9156(0x1ab)]=_0x5308b0;},Game_Party[_0x12a2a9(0x28c)]['applyBattlePartySwitchCooldown']=function(){const _0x8a891c=_0x12a2a9;if(this[_0x8a891c(0x1ab)]===undefined)this[_0x8a891c(0x133)]();this['_partySystemBattleCommandCooldown']=VisuMZ[_0x8a891c(0x132)]['Settings'][_0x8a891c(0x240)][_0x8a891c(0xdf)]||0x0;},Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x1ae)]=function(){const _0x10ada1=_0x12a2a9;if(this[_0x10ada1(0x1ab)]===undefined)this[_0x10ada1(0x133)]();this['_partySystemBattleCommandCooldown']--;},Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x1d5)]=function(){const _0x1ee44a=_0x12a2a9;this[_0x1ee44a(0x147)]=0x0;},Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x1ac)]=function(_0x4ca123){const _0x33bb4e=_0x12a2a9;this[_0x33bb4e(0x147)]=_0x4ca123,this[_0x33bb4e(0xd3)](!![]),$gamePlayer&&$gamePlayer[_0x33bb4e(0x1e0)]()&&$gamePlayer[_0x33bb4e(0x1e0)]()[_0x33bb4e(0x1ac)]();},Game_Followers[_0x12a2a9(0x28c)][_0x12a2a9(0x1ac)]=function(){const _0x2b9d85=_0x12a2a9;if(!SceneManager['isSceneMap']())return;this[_0x2b9d85(0x114)]();const _0xcec26b=$gameMap[_0x2b9d85(0xc3)](),_0x29a2a8=$gamePlayer['x'],_0x55f33f=$gamePlayer['y'],_0x3df755=$gamePlayer[_0x2b9d85(0x2e1)]();$gameTemp[_0x2b9d85(0x2ac)]=!![],$gamePlayer[_0x2b9d85(0x238)](_0xcec26b,_0x29a2a8,_0x55f33f,_0x3df755,0x2),setTimeout(this[_0x2b9d85(0x1da)][_0x2b9d85(0x127)](this),0x7d0);},Game_Followers[_0x12a2a9(0x28c)][_0x12a2a9(0x1da)]=function(){const _0x3aa299=_0x12a2a9;$gameTemp[_0x3aa299(0x2ac)]=![];},VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0xda)]=Scene_Base['prototype'][_0x12a2a9(0x251)],Scene_Base[_0x12a2a9(0x28c)]['isAutosaveEnabled']=function(){const _0x23d824=_0x12a2a9;if($gameTemp['_bypassAutoSavePartySystem'])return![];return VisuMZ[_0x23d824(0x132)][_0x23d824(0xda)][_0x23d824(0x26c)](this);},Game_Party[_0x12a2a9(0x28c)]['maxBattleMembers']=function(){const _0x242d35=_0x12a2a9;if(this[_0x242d35(0x147)]===undefined)this[_0x242d35(0xd3)]();return this[_0x242d35(0x147)]||Game_Party[_0x242d35(0x276)];},Game_Party[_0x12a2a9(0x28c)]['checkInitBattleMembers']=function(){const _0x52f996=_0x12a2a9;if(this[_0x52f996(0x147)]===undefined)this[_0x52f996(0xd3)]();if(!this[_0x52f996(0x226)])this[_0x52f996(0xd3)]();while(this[_0x52f996(0x226)][_0x52f996(0x1ea)]<this[_0x52f996(0x147)]){this['_battleMembers'][_0x52f996(0x15a)](0x0);}},Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0xd3)]=function(_0x389502){const _0x46a032=_0x12a2a9;!_0x389502&&(_0x46a032(0x17d)!==_0x46a032(0x118)?this[_0x46a032(0x147)]=Game_Party[_0x46a032(0x276)]:(_0x49bf5c[_0x46a032(0x132)][_0x46a032(0xc8)][_0x46a032(0x26c)](this,_0x26b64d),this[_0x46a032(0x2cb)](_0x5837fc),_0x2ae0e1[_0x46a032(0x21b)]()&&(_0x38e1cc[_0x46a032(0x24b)]&&_0x5b1823[_0x46a032(0x134)]()&&(_0x3452cb[_0x46a032(0x105)](),_0x38bd44[_0x46a032(0x228)](_0xdff4fc['actor'](_0x50e943))))));this[_0x46a032(0x226)]=this[_0x46a032(0xed)][_0x46a032(0xd8)](0x0,this[_0x46a032(0x147)]);while(this[_0x46a032(0x226)][_0x46a032(0x1ea)]<this[_0x46a032(0x147)]){if(_0x46a032(0x15f)!==_0x46a032(0x1a5))this['_battleMembers'][_0x46a032(0x15a)](0x0);else{if(!_0x28c663[_0x46a032(0xe4)]())return![];const _0x3ba1bc=_0x127b49[_0x46a032(0x132)]['Settings'][_0x46a032(0x240)];return _0x3ba1bc[_0x46a032(0xf7)]===_0x15f9cf&&(_0x3ba1bc[_0x46a032(0xf7)]=!![]),_0x3ba1bc[_0x46a032(0xf7)];}}if($gamePlayer)$gamePlayer[_0x46a032(0x150)]();},Game_Party[_0x12a2a9(0x28c)]['battleMembers']=function(){const _0x4845b7=_0x12a2a9;return this[_0x4845b7(0x291)]()[_0x4845b7(0x278)](_0x47e362=>!!_0x47e362);},Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x291)]=function(){const _0x3bf090=_0x12a2a9;this['checkInitBattleMembers']();const _0x578ebc=this[_0x3bf090(0x226)][_0x3bf090(0x1fb)](_0x4eb591=>$gameActors[_0x3bf090(0x16f)](_0x4eb591));return SceneManager['isSceneParty']()?_0x578ebc:_0x578ebc['filter'](_0x254a45=>_0x254a45&&_0x254a45[_0x3bf090(0x100)]());},Game_Party['prototype']['reserveMembers']=function(){const _0x34d522=_0x12a2a9,_0x1188ba=this['battleMembers']();return this[_0x34d522(0x13c)]()['filter'](_0x4f2e9d=>!_0x1188ba[_0x34d522(0x23a)](_0x4f2e9d));},VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0xf0)]=Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x232)],Game_Party[_0x12a2a9(0x28c)]['setupStartingMembers']=function(){const _0x7375a7=_0x12a2a9;VisuMZ['PartySystem']['Game_Party_setupStartingMembers'][_0x7375a7(0x26c)](this),this[_0x7375a7(0xd3)]();},VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x18f)]=Game_Party[_0x12a2a9(0x28c)]['setupBattleTest'],Game_Party[_0x12a2a9(0x28c)]['setupBattleTest']=function(){const _0x23d70a=_0x12a2a9;VisuMZ[_0x23d70a(0x132)][_0x23d70a(0x18f)]['call'](this),this[_0x23d70a(0x176)]();},Game_Party[_0x12a2a9(0x28c)]['setupBattleTestMembers']=function(){const _0x221887=_0x12a2a9;this[_0x221887(0x147)]=Game_Party[_0x221887(0x276)],this[_0x221887(0x226)]=[],this[_0x221887(0xed)]=[];for(const _0x1fe78e of $dataSystem[_0x221887(0x243)]){const _0x38e0f5=$gameActors['actor'](_0x1fe78e['actorId']);if(!_0x38e0f5)continue;_0x38e0f5[_0x221887(0xbf)](_0x1fe78e['level'],![]),_0x38e0f5[_0x221887(0x21c)](_0x1fe78e[_0x221887(0x29e)]),_0x38e0f5[_0x221887(0x223)](),this['_battleMembers'][_0x221887(0x15a)](_0x1fe78e[_0x221887(0x263)]),this['_actors'][_0x221887(0x15a)](_0x1fe78e[_0x221887(0x263)]);}this[_0x221887(0x226)][_0x221887(0x247)](0x0);while(this[_0x221887(0x226)][_0x221887(0x1ea)]<this[_0x221887(0x147)]){this[_0x221887(0x226)]['push'](0x0);}while(this['_battleMembers'][_0x221887(0x1ea)]>this[_0x221887(0x2ca)]()){this[_0x221887(0x226)][_0x221887(0x13e)]();}if($gamePlayer)$gamePlayer['refresh']();},Game_Party[_0x12a2a9(0x28c)]['addNonBattleTestMembers']=function(){const _0x43b514=_0x12a2a9,_0x33508c=this[_0x43b514(0x144)]();for(let _0x3275da=0x1;_0x3275da<$dataActors[_0x43b514(0x1ea)];_0x3275da++){const _0xd1d0ea=$gameActors[_0x43b514(0x16f)](_0x3275da);if(!_0xd1d0ea)continue;if(_0xd1d0ea['name']()['length']<=0x0)continue;if(_0xd1d0ea[_0x43b514(0x22a)]()[_0x43b514(0x112)](/-----/i))continue;if(_0x33508c[_0x43b514(0x23a)](_0xd1d0ea))continue;this['_actors'][_0x43b514(0x15a)](_0xd1d0ea[_0x43b514(0x263)]());}},VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0xc8)]=Game_Party['prototype'][_0x12a2a9(0x2c0)],Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x2c0)]=function(_0x151dd4){const _0x164dfb=_0x12a2a9;VisuMZ[_0x164dfb(0x132)][_0x164dfb(0xc8)][_0x164dfb(0x26c)](this,_0x151dd4),this[_0x164dfb(0x2cb)](_0x151dd4);if(SceneManager[_0x164dfb(0x21b)]()){if(Imported[_0x164dfb(0x24b)]&&BattleManager['isOTB']()){if(_0x164dfb(0x196)!==_0x164dfb(0x264))BattleManager[_0x164dfb(0x105)](),BattleManager[_0x164dfb(0x228)]($gameActors[_0x164dfb(0x16f)](_0x151dd4));else{if(_0x5b891c[_0x164dfb(0x16b)]&&_0x196c58[_0x164dfb(0xcd)]())return!![];return![];}}}},Game_Party['prototype'][_0x12a2a9(0x2cb)]=function(_0x557dbd){const _0x387af1=_0x12a2a9;this[_0x387af1(0x2a8)]();if(this[_0x387af1(0x226)][_0x387af1(0x23a)](_0x557dbd))return;if(!this[_0x387af1(0xed)][_0x387af1(0x23a)](_0x557dbd))return;if(!this[_0x387af1(0x226)][_0x387af1(0x23a)](0x0))return;const _0x56bd72=$gameActors[_0x387af1(0x16f)](_0x557dbd);if(!_0x56bd72)return;const _0x478ff3=this[_0x387af1(0x226)][_0x387af1(0x297)](0x0);if(_0x478ff3<0x0)return;this[_0x387af1(0x226)][_0x478ff3]=_0x557dbd,SceneManager[_0x387af1(0x21b)]()&&(_0x56bd72[_0x387af1(0x11f)](),_0x56bd72['makeActions']()),this['partyChangeRefresh']();},Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x1e5)]=function(_0x3b0430,_0xf773b8){const _0x1e6cd0=_0x12a2a9;this[_0x1e6cd0(0x2a8)]();if(this[_0x1e6cd0(0x226)]['includes'](_0x3b0430))return;if(!this[_0x1e6cd0(0x226)][_0x1e6cd0(0x23a)](0x0))return;const _0x593c5e=$gameActors[_0x1e6cd0(0x16f)](_0x3b0430);if(!_0x593c5e)return;this[_0x1e6cd0(0x226)][_0xf773b8]=_0x3b0430,_0x593c5e[_0x1e6cd0(0x19f)](),this[_0x1e6cd0(0xe9)]();},VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0xdd)]=Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x2e0)],Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x2e0)]=function(_0xef00b0){const _0x149eda=_0x12a2a9;this[_0x149eda(0x189)](_0xef00b0),VisuMZ[_0x149eda(0x132)][_0x149eda(0xdd)][_0x149eda(0x26c)](this,_0xef00b0);},Game_Party['prototype'][_0x12a2a9(0x189)]=function(_0x9dcd42){const _0x4a5240=_0x12a2a9;this[_0x4a5240(0x2a8)]();if(!this[_0x4a5240(0x226)]['includes'](_0x9dcd42))return;if(_0x9dcd42<=0x0)return;const _0xe27771=this['_battleMembers']['indexOf'](_0x9dcd42);this[_0x4a5240(0x226)][_0xe27771]=0x0,this['_actors'][_0x4a5240(0x247)](_0x9dcd42),this[_0x4a5240(0xed)]['push'](_0x9dcd42),this[_0x4a5240(0xe9)]();},Game_Party['prototype'][_0x12a2a9(0xe9)]=function(){const _0x25b3a1=_0x12a2a9;this['rearrangePartyActors'](),$gamePlayer[_0x25b3a1(0x150)](),$gameMap['requestRefresh']();},Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x271)]=function(){const _0x3b39f8=_0x12a2a9;this['checkInitBattleMembers']();const _0x7d8c9d=this[_0x3b39f8(0x144)]()[_0x3b39f8(0x20a)](this[_0x3b39f8(0xc5)]());this[_0x3b39f8(0xed)]=_0x7d8c9d[_0x3b39f8(0x1fb)](_0x192369=>_0x192369?_0x192369[_0x3b39f8(0x263)]():0x0)[_0x3b39f8(0x247)](0x0);},Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x11a)]=function(){const _0x3892e9=_0x12a2a9;this['_actors'][_0x3892e9(0xc0)]((_0xa4b4ca,_0x5e4d83)=>_0xa4b4ca-_0x5e4d83),this[_0x3892e9(0x271)](),this[_0x3892e9(0xe9)]();},Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x1d8)]=function(){const _0x397377=_0x12a2a9;for(const _0x32faaf of this[_0x397377(0xc5)]()){if(!_0x32faaf)continue;if(_0x32faaf[_0x397377(0x216)]())return!![];}return![];},VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x1c3)]=Game_Party['prototype'][_0x12a2a9(0x22c)],Game_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x22c)]=function(_0x199282,_0x251ba){const _0x4246c6=_0x12a2a9;VisuMZ[_0x4246c6(0x132)][_0x4246c6(0x1c3)][_0x4246c6(0x26c)](this,_0x199282,_0x251ba),this[_0x4246c6(0x12a)](_0x199282,_0x251ba);},Game_Party['prototype'][_0x12a2a9(0x12a)]=function(_0x32977b,_0x30ef81){const _0x127222=_0x12a2a9;this[_0x127222(0x226)]=[];for(let _0x124e8f=0x0;_0x124e8f<this[_0x127222(0xed)][_0x127222(0x1ea)];_0x124e8f++){if(this[_0x127222(0x226)][_0x127222(0x1ea)]>=this['maxBattleMembers']())break;this[_0x127222(0x226)][_0x124e8f]=this[_0x127222(0xed)][_0x124e8f];}$gamePlayer[_0x127222(0x150)]();},VisuMZ[_0x12a2a9(0x132)]['Game_Troop_increaseTurn']=Game_Troop[_0x12a2a9(0x28c)]['increaseTurn'],Game_Troop[_0x12a2a9(0x28c)][_0x12a2a9(0x11b)]=function(){const _0x15e817=_0x12a2a9;VisuMZ['PartySystem']['Game_Troop_increaseTurn'][_0x15e817(0x26c)](this),$gameParty[_0x15e817(0x1ae)]();},Scene_Menu['prototype'][_0x12a2a9(0x2bc)]=function(){const _0x2aa391=_0x12a2a9;SceneManager[_0x2aa391(0x15a)](Scene_Party);};function Scene_Party(){const _0x79037a=_0x12a2a9;this[_0x79037a(0x294)](...arguments);}Scene_Party['prototype']=Object[_0x12a2a9(0x1fe)](Scene_MenuBase[_0x12a2a9(0x28c)]),Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x248)]=Scene_Party,Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x294)]=function(){const _0x368d8a=_0x12a2a9;this['loadPartyImages'](),Scene_MenuBase[_0x368d8a(0x28c)]['initialize'][_0x368d8a(0x26c)](this);},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x29d)]=function(){const _0x43ff4e=_0x12a2a9;if(ConfigManager[_0x43ff4e(0x130)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x43ff4e(0x2be)];else return ConfigManager[_0x43ff4e(0x130)]===![]?![]:Scene_MenuBase[_0x43ff4e(0x28c)][_0x43ff4e(0x29d)][_0x43ff4e(0x26c)](this);},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x107)]=function(){return 0x0;},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x1f4)]=function(){return!![];},Scene_Party['prototype'][_0x12a2a9(0x19e)]=function(){const _0x2ad097=_0x12a2a9;Scene_MenuBase[_0x2ad097(0x28c)][_0x2ad097(0x19e)]['call'](this),this[_0x2ad097(0xf5)][_0x2ad097(0x169)]=undefined,this['_pagedownButton'][_0x2ad097(0x169)]=undefined;},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x1f0)]=function(){const _0x24420c=_0x12a2a9;for(const _0x62d80f of $gameParty[_0x24420c(0x10d)]()){if(_0x24420c(0x2d4)===_0x24420c(0x24c))return this['rawBattleMembers']()['filter'](_0x1d1a3e=>!!_0x1d1a3e);else ImageManager[_0x24420c(0x116)](_0x62d80f[_0x24420c(0x2b2)]()),ImageManager[_0x24420c(0x18d)](_0x62d80f[_0x24420c(0x24a)]()),ImageManager[_0x24420c(0x1fd)](_0x62d80f[_0x24420c(0x1a6)]());}},Scene_Party['prototype'][_0x12a2a9(0x1fe)]=function(){const _0x222029=_0x12a2a9;Scene_MenuBase[_0x222029(0x28c)][_0x222029(0x1fe)][_0x222029(0x26c)](this),this[_0x222029(0x28a)](),this[_0x222029(0x211)](),this[_0x222029(0x1b5)](),this[_0x222029(0x183)](),this['createStatusLabel'](),this[_0x222029(0x2c2)]();},Scene_Party['prototype'][_0x12a2a9(0x28a)]=function(){const _0x32eb62=_0x12a2a9,_0xcbafa6=this[_0x32eb62(0x1e7)]();this[_0x32eb62(0x126)]=new Window_PartyLabel(_0xcbafa6,TextManager['activeParty']),this[_0x32eb62(0x126)][_0x32eb62(0x1ad)](VisuMZ['PartySystem'][_0x32eb62(0x167)][_0x32eb62(0x2d9)]['ActivePartyLabelBgType']),this['addWindow'](this[_0x32eb62(0x126)]);},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x1e7)]=function(){const _0x46f860=_0x12a2a9;return VisuMZ[_0x46f860(0x132)]['Settings'][_0x46f860(0x2d9)][_0x46f860(0x237)][_0x46f860(0x26c)](this);},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x211)]=function(){const _0x3846f5=_0x12a2a9,_0x2a1ed4=this[_0x3846f5(0x20f)]();this[_0x3846f5(0x26e)]=new Window_PartyActive(_0x2a1ed4),this[_0x3846f5(0x26e)][_0x3846f5(0x1ad)](VisuMZ[_0x3846f5(0x132)][_0x3846f5(0x167)][_0x3846f5(0x2d9)][_0x3846f5(0x277)]),this[_0x3846f5(0x26e)][_0x3846f5(0x135)]('ok',this['onActiveOk']['bind'](this)),this[_0x3846f5(0x26e)][_0x3846f5(0x135)](_0x3846f5(0x199),this['popScene'][_0x3846f5(0x127)](this)),this[_0x3846f5(0x2b4)](this['_activePartyWindow']);},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x20f)]=function(){const _0x59bfd2=_0x12a2a9;return VisuMZ[_0x59bfd2(0x132)][_0x59bfd2(0x167)][_0x59bfd2(0x2d9)]['ActivePartyWindowRect'][_0x59bfd2(0x26c)](this);},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x151)]=function(){const _0x27732d=_0x12a2a9;this['_reservePartyWindow']['activate'](),this[_0x27732d(0x241)][_0x27732d(0xbd)]();},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x1b5)]=function(){const _0x155ad0=_0x12a2a9,_0x423098=this[_0x155ad0(0x2ea)]();this['_reservePartyLabel']=new Window_PartyLabel(_0x423098,TextManager[_0x155ad0(0x25f)]),this[_0x155ad0(0x281)][_0x155ad0(0x1ad)](VisuMZ[_0x155ad0(0x132)]['Settings'][_0x155ad0(0x2d9)][_0x155ad0(0x266)]),this[_0x155ad0(0x2b4)](this['_reservePartyLabel']);},Scene_Party['prototype']['reservePartyLabelRect']=function(){const _0x2a1de7=_0x12a2a9;return VisuMZ[_0x2a1de7(0x132)]['Settings'][_0x2a1de7(0x2d9)][_0x2a1de7(0x198)][_0x2a1de7(0x26c)](this);},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x183)]=function(){const _0x27a883=_0x12a2a9,_0x1424da=this[_0x27a883(0x1b9)]();this[_0x27a883(0x241)]=new Window_PartyReserve(_0x1424da),this[_0x27a883(0x241)][_0x27a883(0x1ad)](VisuMZ['PartySystem'][_0x27a883(0x167)][_0x27a883(0x2d9)]['ReservePartyWindowBgType']),this[_0x27a883(0x241)]['setHandler']('ok',this[_0x27a883(0x224)]['bind'](this)),this['_reservePartyWindow']['setHandler'](_0x27a883(0x199),this['onReserveCancel'][_0x27a883(0x127)](this)),this[_0x27a883(0x2b4)](this['_reservePartyWindow']);},Scene_Party['prototype'][_0x12a2a9(0x1b9)]=function(){const _0x3a8b72=_0x12a2a9;return VisuMZ['PartySystem'][_0x3a8b72(0x167)][_0x3a8b72(0x2d9)]['ReservePartyWindowRect'][_0x3a8b72(0x26c)](this);},Scene_Party['prototype']['onReserveOk']=function(){const _0x241814=_0x12a2a9,_0x1bd503=this[_0x241814(0x241)][_0x241814(0x200)](),_0x19bf55=this[_0x241814(0x26e)][_0x241814(0x12e)]();if(_0x1bd503<0x0){if(_0x19bf55)$gameParty[_0x241814(0x189)](_0x19bf55['actorId']());}else{if('uoyEc'!==_0x241814(0xff)){const _0x3f1614=this[_0x241814(0x241)][_0x241814(0x12e)]()[_0x241814(0x263)](),_0x4b62d0=this['_activePartyWindow'][_0x241814(0xf3)]();if(_0x19bf55)$gameParty[_0x241814(0x189)](_0x19bf55[_0x241814(0x263)]());$gameParty[_0x241814(0x1e5)](_0x3f1614,_0x4b62d0);}else _0x28dcae[_0x241814(0x132)]['Game_Actor_setup'][_0x241814(0x26c)](this,_0x5dfc4e),this[_0x241814(0x12c)](),this[_0x241814(0x249)]();}this[_0x241814(0xf2)](),this[_0x241814(0x22f)]();},Scene_Party['prototype'][_0x12a2a9(0xf2)]=function(){const _0x572974=_0x12a2a9;this[_0x572974(0x26e)]['refresh'](),this[_0x572974(0x241)][_0x572974(0x150)]();},Scene_Party['prototype']['onReserveCancel']=function(){const _0x2c344e=_0x12a2a9;this['_reservePartyWindow'][_0x2c344e(0x18c)](),this[_0x2c344e(0x241)][_0x2c344e(0x13f)](),this['_activePartyWindow'][_0x2c344e(0x10c)]();},Scene_Party['prototype']['createStatusLabel']=function(){const _0x496c6d=_0x12a2a9,_0x4f8d77=this[_0x496c6d(0x1cb)]();this['_statusPartyLabel']=new Window_PartyLabel(_0x4f8d77,TextManager['statusParty']),this[_0x496c6d(0x222)][_0x496c6d(0x1ad)](VisuMZ['PartySystem'][_0x496c6d(0x167)][_0x496c6d(0x2d9)][_0x496c6d(0x1de)]),this['addWindow'](this[_0x496c6d(0x222)]);},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x1cb)]=function(){const _0x4b8dca=_0x12a2a9;return VisuMZ[_0x4b8dca(0x132)][_0x4b8dca(0x167)][_0x4b8dca(0x2d9)][_0x4b8dca(0x201)][_0x4b8dca(0x26c)](this);},Scene_Party['prototype'][_0x12a2a9(0x2c2)]=function(){const _0x5d702b=_0x12a2a9,_0x5f0a8d=this[_0x5d702b(0x1cd)]();this[_0x5d702b(0x136)]=new Window_PartyStatus(_0x5f0a8d),this['_statusPartyWindow'][_0x5d702b(0x1ad)](VisuMZ[_0x5d702b(0x132)][_0x5d702b(0x167)][_0x5d702b(0x2d9)]['StatusWindowBgType']),this[_0x5d702b(0x2b4)](this['_statusPartyWindow']),this[_0x5d702b(0x241)]['setStatusWindow'](this['_statusPartyWindow']),this[_0x5d702b(0x26e)][_0x5d702b(0x272)](this[_0x5d702b(0x136)]);},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x1cd)]=function(){const _0x30a34a=_0x12a2a9;return VisuMZ[_0x30a34a(0x132)][_0x30a34a(0x167)][_0x30a34a(0x2d9)][_0x30a34a(0x14a)][_0x30a34a(0x26c)](this);},Scene_Party[_0x12a2a9(0x28c)]['buttonAssistKey3']=function(){const _0x3455c0=_0x12a2a9;return TextManager[_0x3455c0(0x110)]('shift');},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x23d)]=function(){const _0x43c2a1=_0x12a2a9;return TextManager[_0x43c2a1(0x102)];},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x12b)]=function(){const _0x25a7e0=_0x12a2a9,_0x55d6ed=this['_activePartyWindow'],_0x8f14ab=this[_0x25a7e0(0x241)];if(_0x55d6ed&&_0x55d6ed[_0x25a7e0(0x179)]&&_0x55d6ed[_0x25a7e0(0x12e)]()&&_0x55d6ed[_0x25a7e0(0x244)]()){if(_0x25a7e0(0xfc)==='Jeoho')_0x4a1c67[_0x25a7e0(0x28c)]['deactivate'][_0x25a7e0(0x26c)](this),this[_0x25a7e0(0x16c)]();else return TextManager[_0x25a7e0(0x219)];}else{if(_0x8f14ab&&_0x8f14ab[_0x25a7e0(0x179)]&&$gameParty[_0x25a7e0(0xc5)]()[_0x25a7e0(0x1ea)]>0x0){if(_0x25a7e0(0x146)===_0x25a7e0(0xe8))_0x2259cd['prototype'][_0x25a7e0(0x234)][_0x25a7e0(0x26c)](this),this[_0x25a7e0(0x215)]();else return TextManager[_0x25a7e0(0xfb)];}else return'';}},Scene_Party[_0x12a2a9(0x28c)]['buttonAssistText4']=function(){const _0x9a46c3=_0x12a2a9;if(this[_0x9a46c3(0x26e)]&&this[_0x9a46c3(0x26e)]['active'])return TextManager['assistSwapOutPartyMember'];else{if(this[_0x9a46c3(0x241)]&&this[_0x9a46c3(0x241)]['active']){if(_0x9a46c3(0x2e5)===_0x9a46c3(0x2e5))return TextManager[_0x9a46c3(0x1e8)];else _0x2ffa9d[_0x9a46c3(0x1ce)]();}else{if('bWKSq'!=='bWKSq'){const _0x2d10bc=this[_0x9a46c3(0x12e)]();this['processShiftRemoveShortcut']();}else return Scene_MenuBase[_0x9a46c3(0x28c)]['buttonAssistText4'][_0x9a46c3(0x26c)](this);}}},Scene_Party[_0x12a2a9(0x28c)]['createBackground']=function(){const _0x49f0e=_0x12a2a9;Scene_MenuBase[_0x49f0e(0x28c)][_0x49f0e(0x10e)][_0x49f0e(0x26c)](this),this[_0x49f0e(0x122)](this[_0x49f0e(0x2bf)]()),this[_0x49f0e(0x259)]();},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x2bf)]=function(){const _0x463276=_0x12a2a9;return VisuMZ['PartySystem']['Settings'][_0x463276(0xeb)]['SnapshotOpacity'];},Scene_Party[_0x12a2a9(0x28c)][_0x12a2a9(0x259)]=function(){const _0x2b5034=_0x12a2a9,_0x2f9e6d={'BgFilename1':VisuMZ[_0x2b5034(0x132)][_0x2b5034(0x167)][_0x2b5034(0xeb)][_0x2b5034(0x174)],'BgFilename2':VisuMZ['PartySystem'][_0x2b5034(0x167)]['BgSettings'][_0x2b5034(0x229)]};_0x2f9e6d&&(_0x2f9e6d[_0x2b5034(0x174)]!==''||_0x2f9e6d[_0x2b5034(0x229)]!=='')&&(this[_0x2b5034(0x1b3)]=new Sprite(ImageManager[_0x2b5034(0x1f1)](_0x2f9e6d['BgFilename1'])),this[_0x2b5034(0x299)]=new Sprite(ImageManager['loadTitle2'](_0x2f9e6d[_0x2b5034(0x229)])),this[_0x2b5034(0xec)](this[_0x2b5034(0x1b3)]),this[_0x2b5034(0xec)](this[_0x2b5034(0x299)]),this[_0x2b5034(0x1b3)][_0x2b5034(0xc4)][_0x2b5034(0x2e7)](this[_0x2b5034(0xe0)]['bind'](this,this['_backSprite1'])),this[_0x2b5034(0x299)][_0x2b5034(0xc4)][_0x2b5034(0x2e7)](this[_0x2b5034(0xe0)]['bind'](this,this[_0x2b5034(0x299)])));},Scene_Party[_0x12a2a9(0x28c)]['adjustSprite']=function(_0xffc493){this['scaleSprite'](_0xffc493),this['centerSprite'](_0xffc493);},Scene_Party[_0x12a2a9(0x28c)]['terminate']=function(){const _0xb40238=_0x12a2a9;Scene_MenuBase[_0xb40238(0x28c)][_0xb40238(0x1b4)][_0xb40238(0x26c)](this),$gameParty['partyChangeRefresh']();},Window_StatusBase[_0x12a2a9(0x28c)][_0x12a2a9(0x282)]=function(_0x2b9bb0,_0x2c3006,_0x22eacd,_0x15fa08){const _0x3153d5=_0x12a2a9;if(!_0x2b9bb0)return;if(_0x15fa08)this[_0x3153d5(0x2e2)](_0x2b9bb0,_0x2c3006,_0x22eacd);else{if('dEjJB'==='dEjJB')this[_0x3153d5(0x142)](_0x2b9bb0,_0x2c3006,_0x22eacd);else{this[_0x3153d5(0x2a8)]();const _0x3202f0=this['_battleMembers']['map'](_0x156c8c=>_0x1ac634['actor'](_0x156c8c));return _0x303cbb['isSceneParty']()?_0x3202f0:_0x3202f0[_0x3153d5(0x278)](_0x289efa=>_0x289efa&&_0x289efa[_0x3153d5(0x100)]());}}},Window_StatusBase[_0x12a2a9(0x28c)][_0x12a2a9(0x142)]=function(_0x3b7ef3,_0x7829f8,_0x3a9cd1){const _0x4da284=_0x12a2a9;_0x3a9cd1+=Math[_0x4da284(0x265)]((this['lineHeight']()-ImageManager[_0x4da284(0x29b)])/0x2),!_0x3b7ef3[_0x4da284(0x1d0)]()&&(this[_0x4da284(0x2e9)](ImageManager[_0x4da284(0x290)],_0x7829f8,_0x3a9cd1),_0x7829f8+=ImageManager[_0x4da284(0x2a0)]+0x4),_0x3b7ef3['isRequiredInParty']()&&('wDbEV'===_0x4da284(0x214)?(this['_callSceneParty']=![],this[_0x4da284(0x2d8)][_0x4da284(0x157)](),this[_0x4da284(0x2a2)][_0x4da284(0x296)]=![],_0x216da8[_0x4da284(0x2ed)](),_0x567d5c[_0x4da284(0x15a)](_0x5b4012),_0xde364[_0x4da284(0x115)](),_0x22ff25[_0x4da284(0xe4)]()&&(_0x5918c8['_tpbSceneChangeCacheActor']=_0x587e56['actor']())):(this[_0x4da284(0x2e9)](ImageManager['requiredPartyMemberIcon'],_0x7829f8,_0x3a9cd1),_0x7829f8+=ImageManager[_0x4da284(0x2a0)]+0x4));},Window_StatusBase['prototype'][_0x12a2a9(0x2e2)]=function(_0x58cd75,_0x17e680,_0x2ef1dd){const _0x254986=_0x12a2a9;let _0x53c2aa=0x0;if(!_0x58cd75[_0x254986(0x1d0)]())_0x53c2aa+=0x1;if(_0x58cd75[_0x254986(0x216)]())_0x53c2aa+=0x1;if(_0x53c2aa<=0x1)return this[_0x254986(0x142)](_0x58cd75,_0x17e680,_0x2ef1dd);_0x2ef1dd+=Math[_0x254986(0x265)]((this['lineHeight']()-ImageManager[_0x254986(0x29b)])/0x2),_0x2ef1dd-=Math['round'](this['lineHeight']()/0x2),this[_0x254986(0x2e9)](ImageManager[_0x254986(0x290)],_0x17e680,_0x2ef1dd),_0x2ef1dd+=this[_0x254986(0x159)](),this[_0x254986(0x2e9)](ImageManager['requiredPartyMemberIcon'],_0x17e680,_0x2ef1dd);};function _0xef4e(_0x1b5d45,_0x117a79){const _0x2b33a7=_0x2b33();return _0xef4e=function(_0xef4e38,_0x24efa3){_0xef4e38=_0xef4e38-0xbd;let _0x5ca876=_0x2b33a7[_0xef4e38];return _0x5ca876;},_0xef4e(_0x1b5d45,_0x117a79);}function Window_PartyLabel(){this['initialize'](...arguments);}Window_PartyLabel[_0x12a2a9(0x28c)]=Object[_0x12a2a9(0x1fe)](Window_Base[_0x12a2a9(0x28c)]),Window_PartyLabel[_0x12a2a9(0x28c)]['constructor']=Window_PartyLabel,Window_PartyLabel[_0x12a2a9(0x28c)][_0x12a2a9(0x294)]=function(_0x2c2051,_0x357af6){const _0x25bab8=_0x12a2a9;Window_Base[_0x25bab8(0x28c)][_0x25bab8(0x294)]['call'](this,_0x2c2051),this[_0x25bab8(0x2bb)](_0x357af6);},Window_PartyLabel['prototype'][_0x12a2a9(0x283)]=function(){this['padding']=0x0;},Window_PartyLabel['prototype'][_0x12a2a9(0x2bb)]=function(_0x3f8ecb){const _0xbdb438=_0x12a2a9;this[_0xbdb438(0x148)][_0xbdb438(0xe1)](),this['drawText'](_0x3f8ecb,0x0,0x0,this[_0xbdb438(0x13b)],_0xbdb438(0x27a));};function Window_PartyActive(){const _0x55df88=_0x12a2a9;this[_0x55df88(0x294)](...arguments);}Window_PartyActive[_0x12a2a9(0x28c)]=Object['create'](Window_StatusBase[_0x12a2a9(0x28c)]),Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x248)]=Window_PartyActive,Window_PartyActive[_0x12a2a9(0x2a4)]=VisuMZ[_0x12a2a9(0x132)]['Settings'][_0x12a2a9(0x2d9)]['ActivePartyGraphic'],Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x294)]=function(_0xecf5a1){const _0xd36a50=_0x12a2a9;Window_StatusBase[_0xd36a50(0x28c)][_0xd36a50(0x294)][_0xd36a50(0x26c)](this,_0xecf5a1),this['refresh'](),this[_0xd36a50(0x10c)](),this['smoothSelect'](0x0);},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x163)]=function(){const _0x3f2cd6=_0x12a2a9;return VisuMZ[_0x3f2cd6(0x132)][_0x3f2cd6(0x167)][_0x3f2cd6(0x240)][_0x3f2cd6(0x24f)];},Window_PartyActive[_0x12a2a9(0x28c)]['maxItems']=function(){const _0x1f9e66=_0x12a2a9;return $gameParty[_0x1f9e66(0x2ca)]();},Window_PartyActive['prototype'][_0x12a2a9(0x124)]=function(){const _0x3391cc=_0x12a2a9;return $gameParty[_0x3391cc(0x2ca)]();},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x14d)]=function(){const _0x99f55=_0x12a2a9;return this[_0x99f55(0x1bb)];},Window_PartyActive['prototype'][_0x12a2a9(0x16f)]=function(_0x952bfa){const _0x2816e1=_0x12a2a9;return $gameParty[_0x2816e1(0x291)]()[_0x952bfa];},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x12e)]=function(){const _0x45a9ce=_0x12a2a9;return this[_0x45a9ce(0x16f)](this[_0x45a9ce(0xf3)]());},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x2da)]=function(){const _0x4a7c7d=_0x12a2a9,_0x42edaf=this[_0x4a7c7d(0x16f)](this['index']());return _0x42edaf?_0x42edaf[_0x4a7c7d(0x1d0)]():!![];},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x209)]=function(){const _0x2fcaeb=_0x12a2a9;if($gameParty[_0x2fcaeb(0x10d)]()['length']<=0x0)return!![];if($gameParty[_0x2fcaeb(0x1d8)]())return![];return $gameParty[_0x2fcaeb(0x144)]()[_0x2fcaeb(0x1ea)]>0x0;},Window_PartyActive[_0x12a2a9(0x28c)]['processCursorMove']=function(){const _0x1be2ed=_0x12a2a9;Window_StatusBase[_0x1be2ed(0x28c)]['processCursorMove'][_0x1be2ed(0x26c)](this),this[_0x1be2ed(0x202)]();},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x205)]=function(_0xd2da32){const _0x402120=_0x12a2a9;if(this['isOkEnabled']()){if(_0x402120(0x139)===_0x402120(0x14b))return _0x5c4d56[_0x402120(0x132)]['Settings'][_0x402120(0x2d9)][_0x402120(0x2d2)][_0x402120(0x26c)](this);else this['processOk']();}},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x246)]=function(){const _0x291f58=_0x12a2a9,_0x54e1e9=this[_0x291f58(0xf3)](),_0x2ffa11=_0x54e1e9+0x1>=this['maxItems']()?0x0:_0x54e1e9+0x1;this[_0x291f58(0xd5)](_0x54e1e9,_0x2ffa11);},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0xe5)]=function(){const _0x25f66b=_0x12a2a9,_0x166497=this[_0x25f66b(0xf3)](),_0x13c3fc=_0x166497-0x1<0x0?this[_0x25f66b(0x1ff)]()-0x1:_0x166497-0x1;this['quickSwap'](_0x166497,_0x13c3fc);},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0xd5)]=function(_0x571d8e,_0x114b3e){const _0x1ef3cd=_0x12a2a9,_0x3c8d55=this[_0x1ef3cd(0x16f)](_0x571d8e),_0x2239a4=this[_0x1ef3cd(0x16f)](_0x114b3e);if(_0x3c8d55&&!_0x3c8d55[_0x1ef3cd(0x1d0)]())return;if(_0x2239a4&&!_0x2239a4[_0x1ef3cd(0x1d0)]())return;const _0x477fd0=$gameParty[_0x1ef3cd(0x226)];_0x477fd0[_0x571d8e]=_0x2239a4?_0x2239a4[_0x1ef3cd(0x263)]():0x0,_0x477fd0[_0x114b3e]=_0x3c8d55?_0x3c8d55[_0x1ef3cd(0x263)]():0x0,this[_0x1ef3cd(0x150)](),this[_0x1ef3cd(0x261)](),this[_0x1ef3cd(0x1f2)](_0x114b3e);},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x202)]=function(){const _0x35c593=_0x12a2a9;if(!this[_0x35c593(0x244)]())return;if(Input[_0x35c593(0xca)]('shift')){const _0x7bb48f=this['currentActor']();this[_0x35c593(0x29f)]();}},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x29f)]=function(){const _0x5b5ba3=_0x12a2a9;SoundManager[_0x5b5ba3(0x1fc)]();const _0x4d7ce3=this[_0x5b5ba3(0x12e)]();$gameParty[_0x5b5ba3(0x189)](_0x4d7ce3[_0x5b5ba3(0x263)]()),this[_0x5b5ba3(0x1f9)](),SceneManager[_0x5b5ba3(0x2ab)][_0x5b5ba3(0xf2)]();},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x244)]=function(){const _0xe5bfde=_0x12a2a9;if(!this['addRemoveCommand']())return![];const _0x1f8a65=this['currentActor']();return this[_0xe5bfde(0x179)]&&_0x1f8a65&&_0x1f8a65[_0xe5bfde(0x1d0)]();},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x2c1)]=function(_0x24ff73){const _0x5b5597=_0x12a2a9,_0x47607e=this[_0x5b5597(0x16f)](_0x24ff73);if(!_0x47607e)return this['drawItemEmpty'](_0x24ff73);this[_0x5b5597(0x2a9)]();const _0x24a755=this[_0x5b5597(0x1f3)](_0x24ff73);this[_0x5b5597(0x190)](_0x24ff73);const _0x206041=_0x24a755['y']+_0x24a755[_0x5b5597(0x221)]-this[_0x5b5597(0x159)]();this[_0x5b5597(0x2af)](_0x24a755['x'],_0x206041,_0x24a755['width'],0x2),this['drawActorPartyIcons'](_0x47607e,_0x24a755['x']+0x2,_0x24a755['y']),this[_0x5b5597(0x2e3)](_0x47607e,_0x24a755['x'],_0x206041,_0x24a755['width']);},Window_PartyActive[_0x12a2a9(0x28c)]['drawItemEmpty']=function(_0x150641){const _0x5effb0=_0x12a2a9;this[_0x5effb0(0x2a9)]();const _0x47691d=this['itemRect'](_0x150641);this['drawItemDarkRect'](_0x47691d['x'],_0x47691d['y'],_0x47691d[_0x5effb0(0x187)],_0x47691d[_0x5effb0(0x221)]);const _0xedcd1f=_0x47691d['y']+Math[_0x5effb0(0x265)]((_0x47691d['height']-this[_0x5effb0(0x159)]())/0x2);this[_0x5effb0(0x227)](ColorManager[_0x5effb0(0x181)]()),this[_0x5effb0(0xdb)](TextManager[_0x5effb0(0x280)],_0x47691d['x'],_0xedcd1f,_0x47691d['width'],_0x5effb0(0x27a));},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x1ee)]=function(_0x393bbb,_0x4af7f4,_0x33a1dd,_0xfd2582,_0x43a829){const _0x449975=_0x12a2a9;_0x43a829=Math['max'](_0x43a829||0x1,0x1);while(_0x43a829--){if(_0x449975(0x191)!=='iFpAa'){_0xfd2582=_0xfd2582||this[_0x449975(0x159)](),this[_0x449975(0x148)][_0x449975(0x17e)]=0xa0;const _0x409bfb=ColorManager['gaugeBackColor']();this['contents'][_0x449975(0x158)](_0x393bbb+0x1,_0x4af7f4+0x1,_0x33a1dd-0x2,_0xfd2582-0x2,_0x409bfb),this['contents'][_0x449975(0x17e)]=0xff;}else{if(_0x373fde[_0x449975(0x132)][_0x449975(0x167)][_0x449975(0x240)][_0x449975(0x1c2)]===![])return;_0x15bd15=_0x1ba44a[_0x449975(0x2eb)](_0x120686||0x1,0x1);while(_0x1f3e46--){_0x2c08a3=_0x196de5||this['lineHeight'](),this[_0x449975(0x148)][_0x449975(0x17e)]=0xa0;const _0x5c8d7f=_0x3d709['getPartySystemBackColor']();this[_0x449975(0x148)][_0x449975(0x158)](_0x5c8a4a+0x1,_0x2e4ed0+0x1,_0x11d009-0x2,_0x595c87-0x2,_0x5c8d7f),this[_0x449975(0x148)][_0x449975(0x17e)]=0xff;}}}},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x190)]=function(_0x4324dd){const _0x395450=_0x12a2a9;switch(Window_PartyActive[_0x395450(0x2a4)][_0x395450(0x208)]()['trim']()){case _0x395450(0x1a7):this[_0x395450(0x293)](_0x4324dd);break;case _0x395450(0x17b):this[_0x395450(0x197)](_0x4324dd);break;case'svbattler':Imported[_0x395450(0x1a9)]&&(_0x395450(0xde)!==_0x395450(0x1d3)?this['drawItemImageSvActor'](_0x4324dd):this[_0x395450(0x138)]=0x0);break;};},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x293)]=function(_0x246a4d){const _0x134a31=_0x12a2a9,_0x25c564=this[_0x134a31(0x16f)](_0x246a4d),_0x2f5bb1=this[_0x134a31(0x1f3)](_0x246a4d),_0x31505b=Math[_0x134a31(0x1bc)](ImageManager[_0x134a31(0x2a1)],_0x2f5bb1[_0x134a31(0x187)]-0x2),_0x1c3034=_0x2f5bb1[_0x134a31(0x221)]-0x2;this[_0x134a31(0x273)](_0x25c564[_0x134a31(0x1d0)]());const _0x59bdf5=Math[_0x134a31(0x265)](_0x2f5bb1['x']+(_0x2f5bb1['width']-_0x31505b)/0x2);this[_0x134a31(0xea)](_0x25c564,_0x59bdf5,_0x2f5bb1['y']+0x1,_0x31505b,_0x1c3034),this[_0x134a31(0x273)](!![]);},Window_PartyActive['prototype'][_0x12a2a9(0x197)]=function(_0x2b48ab){const _0x166525=_0x12a2a9,_0x338dc2=this[_0x166525(0x16f)](_0x2b48ab),_0x4ddc8=this[_0x166525(0x1f3)](_0x2b48ab),_0xecd7b2=VisuMZ[_0x166525(0x132)]['Settings'][_0x166525(0x2d9)],_0x246d6b=_0x4ddc8['x']+Math[_0x166525(0x265)](_0x4ddc8[_0x166525(0x187)]/0x2)+_0xecd7b2['ActiveSpriteOffsetX'],_0x2f3197=_0x4ddc8['y']+_0x4ddc8[_0x166525(0x221)]-this['lineHeight']()-_0xecd7b2['ActiveSpriteOffsetY'];this[_0x166525(0x1d7)](_0x338dc2,_0x246d6b,_0x2f3197);},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x274)]=function(_0x18249d){const _0x52c95b=_0x12a2a9,_0x114763=this[_0x52c95b(0x16f)](_0x18249d),_0x40dd4b=_0x114763[_0x52c95b(0x1a6)](),_0x2f97b8=this[_0x52c95b(0x1f3)](_0x18249d),_0xd2695d=VisuMZ[_0x52c95b(0x132)][_0x52c95b(0x167)]['Window'],_0x1afcee=_0x2f97b8['x']+Math[_0x52c95b(0x265)](_0x2f97b8['width']/0x2)+_0xd2695d[_0x52c95b(0xc6)],_0x4b11b7=_0x2f97b8['y']+_0x2f97b8['height']-this[_0x52c95b(0x159)]()-_0xd2695d[_0x52c95b(0x2dc)];this[_0x52c95b(0x165)](_0x40dd4b,_0x1afcee,_0x4b11b7);},Window_PartyActive['prototype']['drawDarkRect']=function(_0x568fd9,_0xc99d2f,_0x209ed0,_0x584d4a){const _0x1845c9=_0x12a2a9,_0x1943d9=ColorManager['dimColor1'](),_0xe37053=ColorManager['dimColor2'](),_0x2f683b=_0x209ed0/0x2,_0x330c28=this['lineHeight']();while(_0x584d4a--){_0x1845c9(0x125)==='RPFVD'?(this[_0x1845c9(0x148)]['gradientFillRect'](_0x568fd9,_0xc99d2f,_0x2f683b,_0x330c28,_0xe37053,_0x1943d9),this[_0x1845c9(0x148)][_0x1845c9(0xfa)](_0x568fd9+_0x2f683b,_0xc99d2f,_0x2f683b,_0x330c28,_0x1943d9,_0xe37053)):(_0x15372b['prototype']['initialize']['call'](this,_0xc75df8),this['_lastIndex']=0x0,this[_0x1845c9(0x150)]());}},Window_PartyActive['prototype'][_0x12a2a9(0x2e3)]=function(_0x9ee97d,_0x58fe4e,_0x46bb30,_0x1da020){const _0x379595=_0x12a2a9;_0x1da020=_0x1da020||0xa8,this['changeTextColor'](ColorManager[_0x379595(0x1f7)](_0x9ee97d)),this[_0x379595(0xdb)](_0x9ee97d[_0x379595(0x22a)](),_0x58fe4e,_0x46bb30,_0x1da020,_0x379595(0x27a));},Window_PartyActive[_0x12a2a9(0x28c)][_0x12a2a9(0x272)]=function(_0x1b7e82){const _0xe99399=_0x12a2a9;this[_0xe99399(0x178)]=_0x1b7e82,this[_0xe99399(0x1f9)]();},Window_PartyActive['prototype']['callUpdateHelp']=function(){const _0x3f8a79=_0x12a2a9;if(this[_0x3f8a79(0x178)])this[_0x3f8a79(0x178)][_0x3f8a79(0x101)](this[_0x3f8a79(0x16f)](this[_0x3f8a79(0xf3)]()));};function Window_PartyReserve(){const _0x4bd624=_0x12a2a9;this[_0x4bd624(0x294)](...arguments);}Window_PartyReserve[_0x12a2a9(0x28c)]=Object['create'](Window_StatusBase['prototype']),Window_PartyReserve[_0x12a2a9(0x28c)][_0x12a2a9(0x248)]=Window_PartyReserve,Window_PartyReserve[_0x12a2a9(0x2a4)]=VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x167)]['Window'][_0x12a2a9(0x17f)],Window_PartyReserve[_0x12a2a9(0x242)]=VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x167)][_0x12a2a9(0x2d9)][_0x12a2a9(0x173)],Window_PartyReserve['prototype'][_0x12a2a9(0x294)]=function(_0x2c5675){const _0x3c1294=_0x12a2a9;Window_StatusBase[_0x3c1294(0x28c)][_0x3c1294(0x294)][_0x3c1294(0x26c)](this,_0x2c5675),this['_lastIndex']=0x0,this[_0x3c1294(0x150)]();},Window_PartyReserve[_0x12a2a9(0x28c)][_0x12a2a9(0x124)]=function(){const _0x11aade=_0x12a2a9;return VisuMZ[_0x11aade(0x132)][_0x11aade(0x167)][_0x11aade(0x2d9)]['ReserveCol']||0x1;},Window_PartyReserve[_0x12a2a9(0x28c)]['itemHeight']=function(){const _0x4cac31=_0x12a2a9;return this[_0x4cac31(0x159)]()*Window_PartyReserve[_0x4cac31(0x242)]+0x6;},Window_PartyReserve[_0x12a2a9(0x28c)][_0x12a2a9(0x163)]=function(){const _0xe0b3b3=_0x12a2a9;return VisuMZ[_0xe0b3b3(0x132)][_0xe0b3b3(0x167)][_0xe0b3b3(0x240)][_0xe0b3b3(0x24f)];},Window_PartyReserve[_0x12a2a9(0x28c)]['maxItems']=function(){const _0x2cf1d5=_0x12a2a9;let _0x50fef0=$gameParty[_0x2cf1d5(0xc5)]()[_0x2cf1d5(0x1ea)];if(this[_0x2cf1d5(0x163)]())_0x50fef0++;return _0x50fef0;},Window_PartyReserve[_0x12a2a9(0x28c)][_0x12a2a9(0x16f)]=function(_0x1060d2){return $gameParty['reserveMembers']()[_0x1060d2];},Window_PartyReserve[_0x12a2a9(0x28c)][_0x12a2a9(0x12e)]=function(){const _0x1ff156=_0x12a2a9;return this[_0x1ff156(0x16f)](this[_0x1ff156(0xf3)]());},Window_PartyReserve[_0x12a2a9(0x28c)][_0x12a2a9(0x2aa)]=function(){SoundManager['playEquip']();},Window_PartyReserve['prototype']['isCurrentItemEnabled']=function(){const _0x128ee8=_0x12a2a9,_0x3ea9de=this[_0x128ee8(0x16f)](this[_0x128ee8(0xf3)]());return _0x3ea9de?_0x3ea9de[_0x128ee8(0x1d0)]():!![];},Window_PartyReserve[_0x12a2a9(0x28c)]['processCursorMove']=function(){const _0x32c9d9=_0x12a2a9;Window_StatusBase['prototype'][_0x32c9d9(0x234)][_0x32c9d9(0x26c)](this),this[_0x32c9d9(0x215)]();},Window_PartyReserve[_0x12a2a9(0x28c)]['cursorUp']=function(_0x566147){const _0x86a0f4=_0x12a2a9;this[_0x86a0f4(0xf3)]()<=0x0?this[_0x86a0f4(0x2b0)]():Window_StatusBase['prototype'][_0x86a0f4(0x258)]['call'](this,_0x566147);},Window_PartyReserve[_0x12a2a9(0x28c)][_0x12a2a9(0x246)]=function(){const _0x5b8db9=_0x12a2a9,_0x3352f8=this[_0x5b8db9(0xf3)](),_0x2a979a=_0x3352f8+0x1>=this[_0x5b8db9(0x1ff)]()-0x1?0x0:_0x3352f8+0x1;this['quickSwap'](_0x3352f8,_0x2a979a);},Window_PartyReserve[_0x12a2a9(0x28c)]['cursorPageup']=function(){const _0x3bda11=_0x12a2a9,_0x26bb7a=this[_0x3bda11(0xf3)](),_0x11344c=_0x26bb7a-0x1<0x0?this[_0x3bda11(0x1ff)]()-0x2:_0x26bb7a-0x1;this[_0x3bda11(0xd5)](_0x26bb7a,_0x11344c);},Window_PartyReserve[_0x12a2a9(0x28c)][_0x12a2a9(0xd5)]=function(_0x2bb008,_0x5a9cb9){const _0x2dd519=_0x12a2a9,_0x3956df=this['actor'](_0x2bb008),_0x1d0fff=this[_0x2dd519(0x16f)](_0x5a9cb9);if(!_0x3956df?.['isFormationChangeOk']()||!_0x1d0fff?.['isFormationChangeOk']())return;else{if(!_0x3956df||!_0x1d0fff)return;}const _0x4863f8=$gameParty[_0x2dd519(0xed)],_0xf561fb=_0x4863f8[_0x2dd519(0x297)](_0x3956df[_0x2dd519(0x263)]()),_0xa48ba0=_0x4863f8[_0x2dd519(0x297)](_0x1d0fff[_0x2dd519(0x263)]());_0x4863f8[_0xf561fb]=_0x1d0fff?_0x1d0fff[_0x2dd519(0x263)]():0x0,_0x4863f8[_0xa48ba0]=_0x3956df?_0x3956df['actorId']():0x0,this[_0x2dd519(0x150)](),this[_0x2dd519(0x261)](),this['smoothSelect'](_0x5a9cb9);},Window_PartyReserve[_0x12a2a9(0x28c)][_0x12a2a9(0x215)]=function(){const _0x68492a=_0x12a2a9;if(!this[_0x68492a(0x20e)]())return;Input[_0x68492a(0xca)](_0x68492a(0x171))&&this['processShiftSortShortcut']();},Window_PartyReserve[_0x12a2a9(0x28c)][_0x12a2a9(0x1e3)]=function(){const _0x4942d0=_0x12a2a9;SoundManager[_0x4942d0(0x1fc)](),$gameParty[_0x4942d0(0x11a)](),this['smoothSelect'](0x0),SceneManager['_scene'][_0x4942d0(0xf2)]();},Window_PartyReserve[_0x12a2a9(0x28c)][_0x12a2a9(0x20e)]=function(){const _0x130aab=_0x12a2a9;return this[_0x130aab(0x179)];},Window_PartyReserve['prototype']['pendingIndex']=function(){const _0xc8510d=_0x12a2a9,_0x41b310=this[_0xc8510d(0x12e)]();return _0x41b310?_0x41b310[_0xc8510d(0xf3)]():-0x1;},Window_PartyReserve['prototype'][_0x12a2a9(0xce)]=function(_0x57a975){const _0x4707f1=_0x12a2a9;Window_StatusBase[_0x4707f1(0x28c)][_0x4707f1(0xce)][_0x4707f1(0x26c)](this,_0x57a975);if(_0x57a975>=0x0)this['_lastIndex']=_0x57a975;},Window_PartyReserve['prototype'][_0x12a2a9(0xbd)]=function(){const _0x39fc44=_0x12a2a9;this['_lastIndex']=Math['min'](this[_0x39fc44(0x1ed)],this[_0x39fc44(0x1ff)]()-0x1),this[_0x39fc44(0x1f2)](this[_0x39fc44(0x1ed)]),this[_0x39fc44(0x2a6)](!![]),this['cursorVisible']=!![];},Window_PartyReserve['prototype'][_0x12a2a9(0x2c1)]=function(_0x75f30e){const _0x533b75=_0x12a2a9,_0x360dbc=this[_0x533b75(0x16f)](_0x75f30e);if(!_0x360dbc)return this['drawRemoveCommand'](_0x75f30e);const _0x4522d7=this[_0x533b75(0x11c)](_0x75f30e);this[_0x533b75(0x190)](_0x75f30e);const _0x398d59=0xa8,_0x186b2a=Window_PartyReserve[_0x533b75(0x242)]===0x1,_0x5cd830=ImageManager[_0x533b75(0x2a0)]*(_0x186b2a?0x2:0x1),_0x54bb5a=this[_0x533b75(0x1a4)]()+this[_0x533b75(0x239)](),_0x2474da=_0x4522d7[_0x533b75(0x187)]-_0x398d59,_0xecab78=_0x4522d7['x']+_0x5cd830+Math[_0x533b75(0x1bc)](_0x54bb5a,_0x2474da),_0x35387e=_0x186b2a?![]:!![];this[_0x533b75(0x273)](_0x360dbc[_0x533b75(0x1d0)]()),this['drawActorPartyIcons'](_0x360dbc,_0x4522d7['x'],_0x4522d7['y'],_0x35387e),this[_0x533b75(0x2e3)](_0x360dbc,_0xecab78,_0x4522d7['y'],_0x398d59),this[_0x533b75(0x273)](!![]);},Window_PartyReserve['prototype'][_0x12a2a9(0x1a4)]=function(){const _0x44fad4=_0x12a2a9,_0x3ff341=VisuMZ[_0x44fad4(0x132)][_0x44fad4(0x167)][_0x44fad4(0x2d9)];switch(Window_PartyReserve[_0x44fad4(0x2a4)][_0x44fad4(0x208)]()[_0x44fad4(0x1c1)]()){case _0x44fad4(0x1a7):return ImageManager[_0x44fad4(0x2a1)];case _0x44fad4(0x17b):return _0x3ff341[_0x44fad4(0x2b3)]*0x2;case _0x44fad4(0xd9):return _0x3ff341['ReserveBattlerOffsetX']*0x2;};},Window_PartyReserve[_0x12a2a9(0x28c)]['drawRemoveCommand']=function(_0x232287){const _0x313b8d=_0x12a2a9,_0x345620=this[_0x313b8d(0x11c)](_0x232287);this[_0x313b8d(0x273)](!![]);const _0x2a2785=TextManager[_0x313b8d(0x18b)];this[_0x313b8d(0xdb)](_0x2a2785,_0x345620['x'],_0x345620['y'],_0x345620[_0x313b8d(0x187)],_0x313b8d(0x27a));},Window_PartyReserve[_0x12a2a9(0x28c)]['drawItemImage']=function(_0x931d90){const _0x32aab2=_0x12a2a9;switch(Window_PartyReserve[_0x32aab2(0x2a4)][_0x32aab2(0x208)]()[_0x32aab2(0x1c1)]()){case _0x32aab2(0x1a7):this[_0x32aab2(0x293)](_0x931d90);break;case _0x32aab2(0x17b):this[_0x32aab2(0x197)](_0x931d90);break;case _0x32aab2(0xd9):Imported[_0x32aab2(0x1a9)]&&this['drawItemImageSvActor'](_0x931d90);break;};},Window_PartyReserve[_0x12a2a9(0x28c)][_0x12a2a9(0x293)]=function(_0x16474c){const _0x489766=_0x12a2a9,_0x28c1c8=this[_0x489766(0x16f)](_0x16474c),_0x48ffcb=this[_0x489766(0x1f3)](_0x16474c),_0x13fd07=Window_PartyReserve[_0x489766(0x242)]===0x1;_0x48ffcb['x']+=ImageManager[_0x489766(0x2a0)]*(_0x13fd07?0x2:0x1);const _0xf24957=ImageManager[_0x489766(0x2a1)],_0x31d002=_0x48ffcb[_0x489766(0x221)]-0x2;this['changePaintOpacity'](_0x28c1c8[_0x489766(0x1d0)]()),this[_0x489766(0xea)](_0x28c1c8,_0x48ffcb['x']+0x1,_0x48ffcb['y']+0x1,_0xf24957,_0x31d002),this[_0x489766(0x273)](!![]);},Window_PartyReserve[_0x12a2a9(0x28c)][_0x12a2a9(0x197)]=function(_0xf08e3c){const _0xd494ab=_0x12a2a9,_0x2f9003=this[_0xd494ab(0x16f)](_0xf08e3c),_0x560ca0=this['itemRect'](_0xf08e3c),_0x17acfe=Window_PartyReserve[_0xd494ab(0x242)]===0x1;_0x560ca0['x']+=ImageManager['iconWidth']*(_0x17acfe?0x2:0x1);const _0x4bfd4f=VisuMZ[_0xd494ab(0x132)][_0xd494ab(0x167)][_0xd494ab(0x2d9)],_0xe35c6c=_0x560ca0['x']+_0x4bfd4f[_0xd494ab(0x2b3)]+this['itemPadding'](),_0x106176=_0x560ca0['y']+_0x560ca0[_0xd494ab(0x221)]-_0x4bfd4f[_0xd494ab(0x19c)];this[_0xd494ab(0x1d7)](_0x2f9003,_0xe35c6c,_0x106176);},Window_PartyReserve[_0x12a2a9(0x28c)][_0x12a2a9(0x274)]=function(_0x94b720){const _0x19e2ba=_0x12a2a9,_0x330d6c=this[_0x19e2ba(0x16f)](_0x94b720),_0x35536a=_0x330d6c[_0x19e2ba(0x1a6)](),_0x4a434c=this[_0x19e2ba(0x1f3)](_0x94b720),_0x4afaa3=Window_PartyReserve[_0x19e2ba(0x242)]===0x1;_0x4a434c['x']+=ImageManager[_0x19e2ba(0x2a0)]*(_0x4afaa3?0x2:0x1);const _0x2141bb=VisuMZ[_0x19e2ba(0x132)]['Settings'][_0x19e2ba(0x2d9)],_0x4de281=_0x4a434c['x']+_0x2141bb[_0x19e2ba(0x1ef)]+this[_0x19e2ba(0x239)](),_0x3615ae=_0x4a434c['y']+_0x4a434c['height']-_0x2141bb[_0x19e2ba(0x17a)];this[_0x19e2ba(0x165)](_0x35536a,_0x4de281,_0x3615ae);},Window_PartyReserve[_0x12a2a9(0x28c)]['setStatusWindow']=function(_0x2758ae){const _0x5a0fd7=_0x12a2a9;this[_0x5a0fd7(0x178)]=_0x2758ae,this[_0x5a0fd7(0x1f9)]();},Window_PartyReserve[_0x12a2a9(0x28c)]['callUpdateHelp']=function(){const _0x58b1a2=_0x12a2a9;if(this[_0x58b1a2(0x178)]){if('fejUj'===_0x58b1a2(0x225))this[_0x58b1a2(0x178)]['setActor'](this[_0x58b1a2(0x16f)](this[_0x58b1a2(0xf3)]()));else{if(!this['isPartyCommandAdded']())return;this['findSymbol'](_0x58b1a2(0x2c8))>=0x0&&this['removePartyCommand']();const _0x4fd5da=this[_0x58b1a2(0x1bf)](),_0x27aeb7=_0x1a1bb1[_0x58b1a2(0xf4)],_0x3a51eb=_0x4fd5da===_0x58b1a2(0x16a)?_0x1909f7['battlePartySwitchCmd']:_0x58b1a2(0xf1)[_0x58b1a2(0x1c9)](_0x27aeb7,_0x2ec512[_0x58b1a2(0x15c)]),_0x1a26a6=this[_0x58b1a2(0x21d)]();this[_0x58b1a2(0x29c)](_0x3a51eb,'formation',_0x1a26a6);}}};function Window_PartyStatus(){const _0x2529c3=_0x12a2a9;this[_0x2529c3(0x294)](...arguments);}Window_PartyStatus[_0x12a2a9(0x28c)]=Object[_0x12a2a9(0x1fe)](Window_StatusBase[_0x12a2a9(0x28c)]),Window_PartyStatus[_0x12a2a9(0x28c)][_0x12a2a9(0x248)]=Window_PartyStatus,Window_PartyStatus[_0x12a2a9(0x28c)][_0x12a2a9(0x294)]=function(_0x5ac0cb){const _0x592805=_0x12a2a9;this['_actor']=null,Window_StatusBase[_0x592805(0x28c)]['initialize'][_0x592805(0x26c)](this,_0x5ac0cb);},Window_PartyStatus[_0x12a2a9(0x28c)][_0x12a2a9(0x1ee)]=function(_0x29a4bd,_0x276ef4,_0x3f283d,_0x5b1fba,_0x1cb8f3){const _0x771f33=_0x12a2a9;if(VisuMZ['PartySystem'][_0x771f33(0x167)][_0x771f33(0x240)]['DrawBackRect']===![])return;_0x1cb8f3=Math[_0x771f33(0x2eb)](_0x1cb8f3||0x1,0x1);while(_0x1cb8f3--){if(_0x771f33(0x23f)!==_0x771f33(0x109)){_0x5b1fba=_0x5b1fba||this['lineHeight'](),this['contents'][_0x771f33(0x17e)]=0xa0;const _0x1bc0d1=ColorManager[_0x771f33(0x2dd)]();this[_0x771f33(0x148)]['fillRect'](_0x29a4bd+0x1,_0x276ef4+0x1,_0x3f283d-0x2,_0x5b1fba-0x2,_0x1bc0d1),this[_0x771f33(0x148)]['paintOpacity']=0xff;}else return _0x5852d4[_0x771f33(0x132)][_0x771f33(0x167)][_0x771f33(0x2d9)][_0x771f33(0x237)]['call'](this);}},ColorManager['getPartySystemBackColor']=function(){const _0x4b7b31=_0x12a2a9,_0x415184=VisuMZ[_0x4b7b31(0x132)]['Settings']['General'];let _0x3cc40e=_0x415184[_0x4b7b31(0x1e4)]!==undefined?_0x415184['BackRectColor']:0x13;return ColorManager['getColor'](_0x3cc40e);},Window_PartyStatus[_0x12a2a9(0x28c)][_0x12a2a9(0x101)]=function(_0x398894){const _0x29475c=_0x12a2a9;if(this[_0x29475c(0x153)]===_0x398894)return;this['_actor']=_0x398894;if(_0x398894){const _0x4d3d42=ImageManager[_0x29475c(0x116)](_0x398894[_0x29475c(0x2b2)]());_0x4d3d42[_0x29475c(0x2e7)](this['refresh'][_0x29475c(0x127)](this));}else this['refresh']();},Window_PartyStatus[_0x12a2a9(0x28c)][_0x12a2a9(0x150)]=function(){const _0x4791de=_0x12a2a9;Window_StatusBase['prototype'][_0x4791de(0x150)][_0x4791de(0x26c)](this),this[_0x4791de(0x148)]['clear'](),this[_0x4791de(0x2a9)](),VisuMZ['PartySystem'][_0x4791de(0x167)]['Window'][_0x4791de(0x262)]['call'](this);},Window_PartyStatus[_0x12a2a9(0x28c)][_0x12a2a9(0x2e4)]=function(){const _0x1fad07=_0x12a2a9;if(!this[_0x1fad07(0x153)]){this[_0x1fad07(0x1ee)](0x0,0x0,this[_0x1fad07(0x13b)],this[_0x1fad07(0x1bb)]);const _0x2dd501=Math[_0x1fad07(0x265)]((this['innerHeight']-this[_0x1fad07(0x159)]())/0x2);this[_0x1fad07(0x227)](ColorManager['systemColor']()),this[_0x1fad07(0xdb)](TextManager[_0x1fad07(0x280)],0x0,_0x2dd501,this[_0x1fad07(0x13b)],_0x1fad07(0x27a));return;}this[_0x1fad07(0xea)](this[_0x1fad07(0x153)],0x1,0x0,ImageManager[_0x1fad07(0x2a1)],ImageManager[_0x1fad07(0x1b8)]),this['drawActorSimpleStatus'](this[_0x1fad07(0x153)],ImageManager[_0x1fad07(0x2a1)]+0x24,0x0);const _0x1ba564=this[_0x1fad07(0x159)](),_0x5d559e=this[_0x1fad07(0x156)](),_0x3684b9=Math[_0x1fad07(0x265)](this['innerWidth']/0x2),_0x528236=Math[_0x1fad07(0x2c4)](_0x5d559e[_0x1fad07(0x1ea)]/0x2)*_0x1ba564,_0x66678a=0x0;let _0x4f20a5=0x0,_0x3dde00=ImageManager[_0x1fad07(0x1b8)]+_0x1ba564/0x2;for(const _0x4633a5 of _0x5d559e){this[_0x1fad07(0x1ee)](_0x4f20a5,_0x3dde00,_0x3684b9,_0x1ba564),this['drawParamName'](_0x4633a5,_0x4f20a5,_0x3dde00,_0x3684b9),this[_0x1fad07(0x140)](_0x4633a5,_0x4f20a5,_0x3dde00,_0x3684b9);if(_0x4f20a5===_0x66678a)_0x4f20a5+=_0x3684b9;else{if('pBUMj'===_0x1fad07(0x21e))return _0x17d599[_0x1fad07(0x102)];else _0x4f20a5=_0x66678a,_0x3dde00+=_0x1ba564;}}},Window_PartyStatus[_0x12a2a9(0x28c)][_0x12a2a9(0x156)]=function(){const _0x1e0772=_0x12a2a9;return Imported[_0x1e0772(0x2a5)]?'DvERR'!==_0x1e0772(0x1d1)?VisuMZ['CoreEngine'][_0x1e0772(0x167)][_0x1e0772(0x1a3)][_0x1e0772(0x2c6)]:_0x5105f6[_0x1e0772(0x132)]['Settings'][_0x1e0772(0xeb)]['SnapshotOpacity']:[0x2,0x3,0x4,0x5,0x6,0x7];},Window_PartyStatus[_0x12a2a9(0x28c)][_0x12a2a9(0x2b8)]=function(_0x11a3a1,_0x28c26e,_0x4c751d,_0x1dc050){const _0x1441b2=_0x12a2a9,_0x23a4d6=this[_0x1441b2(0x239)]();_0x1dc050-=_0x23a4d6*0x2;if(Imported[_0x1441b2(0x2a5)]){if(_0x1441b2(0x1c4)!==_0x1441b2(0x2cc))this[_0x1441b2(0x252)](_0x28c26e+_0x23a4d6,_0x4c751d,_0x1dc050,_0x11a3a1,![]);else{const _0x4841f9=_0x5f7d86(_0x1f9b60['$1']);_0x4841f9<_0x28d972?(_0x3eecb4('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1441b2(0x1c9)](_0x58be61,_0x4841f9,_0x35104b)),_0xca57f6['exit']()):_0x164cbd=_0xf26d76[_0x1441b2(0x2eb)](_0x4841f9,_0x577b2e);}}else{if(_0x1441b2(0x1a2)===_0x1441b2(0x1a2)){const _0x275c81=TextManager[_0x1441b2(0x1b6)](_0x11a3a1);this[_0x1441b2(0x227)](ColorManager[_0x1441b2(0x181)]()),this[_0x1441b2(0xdb)](_0x275c81,_0x28c26e+_0x23a4d6,_0x4c751d,_0x1dc050);}else{const _0x44fc42=_0x4df3e5[_0x1441b2(0x28e)][_0x499b1e];_0x44fc42===_0x12f583&&(_0x856576['_otb_actionBattlersNext'][_0x5e3940]=this);}}},Window_PartyStatus[_0x12a2a9(0x28c)][_0x12a2a9(0x140)]=function(_0x489fa1,_0x189502,_0xb38572,_0x4a17da){const _0x3114b4=_0x12a2a9;this[_0x3114b4(0x2a9)]();const _0x4758c6=this[_0x3114b4(0x239)](),_0x45069e=this['getParamValue'](_0x489fa1);this[_0x3114b4(0xdb)](_0x45069e,_0x189502+_0x4758c6,_0xb38572,_0x4a17da-_0x4758c6*0x2,_0x3114b4(0x184));},Window_PartyStatus[_0x12a2a9(0x28c)][_0x12a2a9(0x1e1)]=function(_0x3cfe81){const _0x2c9d30=_0x12a2a9,_0x582fce=this['_actor'];return Imported['VisuMZ_0_CoreEngine']?_0x2c9d30(0x1dc)!==_0x2c9d30(0x1dc)?_0x547048['maxBattleMembers']():_0x582fce[_0x2c9d30(0x1a8)](_0x3cfe81,!![]):_0x582fce['param'](_0x3cfe81);};function Window_PartyBattleSwitch(){const _0x324194=_0x12a2a9;this[_0x324194(0x294)](...arguments);}function _0x2b33(){const _0x4f6403=['needsPageButtons','ChangeMaxBattleMembers','isEnabled','hpColor','Window_PartyCommand_updateHelp','callUpdateHelp','PEzRx','map','playEquip','loadSvActor','create','maxItems','pendingIndex','StatusLabelRect','checkShiftRemoveShortcut','_partyMemberSwitchWindow','Scene_Battle_createPartyCommandWindowBattleCore','cursorDown','createAllWindows','cOvDx','toLowerCase','isCancelEnabled','concat','drawActorClass','isImmediateTpb','3375065ZuXsHH','isShiftShortcutEnabled','activePartyWindowRect','findSymbol','createActivePartyWindow','aYiEd','isAlive','MFgkB','checkShiftSortShortcut','isRequiredInParty','896214fdTxCW','_partySwitchDuration','assistRemovePartyMember','itemRectWithPadding','isSceneBattle','initEquips','isPartyCommandEnabled','ziEhU','createPartySwitchWindow','addCustomCommands','height','_statusPartyLabel','recoverAll','onReserveOk','fejUj','_battleMembers','changeTextColor','otbReturnBattlerToTurnOrders','BgFilename2','name','createActorCommandWindow','swapOrder','isQueueFormationMenu','ActorCmdWinAddParty','onReserveCancel','cKHKF','isActor','setupStartingMembers','isSceneParty','processCursorMove','partySwitchWindowRect','ActorCmdCooldown','ActivePartyLabelRect','reserveTransfer','itemPadding','includes','Scene_Battle_createAllWindows','activeParty','buttonAssistText1','_actionBattlers','BDEYH','General','_reservePartyWindow','_rowThickness','testBattlers','isShiftRemoveShortcutEnabled','isPlaytest','cursorPagedown','remove','constructor','clearPartySwitchCommandCooldown','characterName','VisuMZ_2_BattleSystemOTB','WMoAJ','battlePartyChangeCmdHelp','clearDamagePopup','AddRemoveCmd','VisuMZ_2_BattleSystemFTB','isAutosaveEnabled','drawParamText','windowPadding','skillItemWindowRectBorderStyle','ReserveCol','VisuMZ_1_BattleCore','420833ZZbFpa','cursorUp','createCustomBackgroundImages','Window_ActorCommand_updateHelp','onBattlePartySwitch','exit','createInnerSprite','splice','reserveParty','canSwitchPartyInBattle','playCursorSound','StatusWindowDraw','actorId','tVWib','round','ReservePartyLabelBgType','setPartyLock','VisuMZ_2_BattleSystemCTB','Remove','charged','battlePartySwitchCmdHelp','call','floor','_activePartyWindow','MxgNH','nGQOa','rearrangePartyActors','setStatusWindow','changePaintOpacity','drawItemImageSvActor','ARRAYFUNC','defaultMaxBattleMembers','ActivePartyWindowBgType','filter','battleLayoutStyle','center','bnUSw','tFcsH','MaxBattleMembers','RNNib','_targets','emptyPartyMember','_reservePartyLabel','drawActorPartyIcons','updatePadding','Game_Battler_onBattleStart','teamBasedFirstAvailableMember','isShowPartySwitchOutAnimation','setBattler','QqvfZ','startOpacity','createActivePartyLabel','obuQM','prototype','_partySystemSwitchOut','_otb_actionBattlersNext','lusdV','lockPartyMemberIcon','rawBattleMembers','ewVlf','drawItemImageFace','initialize','inBattle','visible','indexOf','createPartyCommandWindowBattleCore','_backSprite2','postPartySwitchMenuTpb','iconHeight','addCommand','isRightInputMode','equips','processShiftRemoveShortcut','iconWidth','faceWidth','_windowLayer','placeBasicGauges','_actorGraphic','VisuMZ_0_CoreEngine','ensureCursorVisible','_tpbState','checkInitBattleMembers','resetFontSettings','playOkSound','_scene','_bypassAutoSavePartySystem','DydGE','regenerateAll','drawDarkRect','processCancel','updateTurnOrderCTB','faceName','ReserveSpriteOffsetX','addWindow','_helpWindow','22blddSE','MoveRandomToActive','drawParamName','RequirePartyMembers','postPartySwitchMenuTurnBased','setText','commandFormation','_partyCommandWindow','uiInputPosition','getBackgroundOpacity','addActor','drawItem','createStatusWindow','_tpbSceneChangeCacheActor','ceil','Scene_Battle_isAnyInputWindowActive','DisplayedParams','Game_Battler_regenerateAll','formation','BattleSwitchWindowRect','maxBattleMembers','addActorToBattleMembers','eScBv','registerCommand','Actors','addPartyCommand','log','_debug','ActivePartyWindowRect','_callSceneParty','cTEqs','updateHelp','_partyLocked','xXUYD','_spriteset','Window','isCurrentItemEnabled','10715630DLfIlP','ActiveBattlerOffsetY','getPartySystemBackColor','AssistSwapOut','battlePartySwitchCooldown','removeActor','direction','drawActorPartyIconsVert','drawActorName','refreshOG','JBDRM','BattleSwitchOut','addLoadListener','ActiveParty','drawIcon','reservePartyLabelRect','max','_subject','snapForBackground','callFormation','reselect','Index','changeLevel','sort','startSwitchOutAnimation','drawItemStatus','mapId','bitmap','reserveMembers','ActiveBattlerOffsetX','setPartyRequirement','Game_Party_addActor','setBattlePartySwitchCooldown','isTriggered','isNextSceneBattleTransitionable','SceneManager_isPreviousSceneBattleTransitionable','isSTB','select','QueuePartyScene','LockIcon','actor%1-stateIcon','startSwitchInAnimation','initBattleMembers','_currentActor','quickSwap','currentSymbol','isNextScene','slice','svbattler','Scene_Base_isAutosaveEnabled','drawText','isCTB','Game_Party_removeActor','kGval','PartyCmdCooldown','adjustSprite','clear','commandPartyMemberSwitch','100650NaMMNo','isTpb','cursorPageup','isFormationCommandAdded','MWDUm','mijCj','partyChangeRefresh','drawActorFace','BgSettings','addChild','_actors','callPartyMemberSwitch','JSON','Game_Party_setupStartingMembers','\x5cI[%1]%2','refreshAllWindows','index','battlePartyChangeIcon','_pageupButton','_target','tpbImmediateAction','Scene_Battle_updateBattleProcess','statusParty','gradientFillRect','assistSortPartyMembers','ORvlI','addText','partySwitchWindowRectStandard','NBFby','isAppeared','setActor','assistSwapPositions','2063884cfLrkr','_callPartyMemberSwitch','removeActionBattlersOTB','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','helpAreaHeight','isSceneMap','CLXYU','VisuMZ_2_BattleSystemPTB','AssistSort','activate','members','createBackground','STRUCT','getInputButtonString','EVAL','match','DTInS','setup','applyBattlePartySwitchCooldown','loadFace','lRxEP','IJydj','_inputting','sortActors','increaseTurn','itemLineRect','ActiveTpbFormationMessage','Scene_Battle_createActorCommandWindow','onBattleStart','SwitchOutAnimation','battler','setBackgroundOpacity','ARRAYSTRUCT','maxCols','RPFVD','_activePartyLabel','bind','30xQEaBG','Value','swapOrderPartySystemPlugin','buttonAssistText3','initPartySystem','parameters','currentActor','_logWindow','uiMenuStyle','VSyof','PartySystem','clearPartyBattleCommandCooldown','isOTB','setHandler','_statusPartyWindow','isPartyCommandAdded','_partySwitchBattleCommandCooldown','pswwx','_actorCommandWindow','innerWidth','allMembers','Game_Party_initialize','pop','deselect','drawParamValue','switchStateIconActor','drawActorPartyIconsHorz','3GVqtBF','battleMembers','onPartySwitchOk','FrWTm','_battleMaxSize','contents','WARNING:\x20Party\x20Change\x20command\x20is\x20unavailable\x20for\x20Window_PartyCommand\x20for\x20this\x20Battle\x20System','StatusWindowRect','PfxRb','processPartySwitchMember','itemHeight','isFormationEnabled','requiredPartyMemberIcon','refresh','onActiveOk','sortActionOrdersBTB','_actor','BattleHelpFormation','updatePartySwitch','actorParams','update','fillRect','lineHeight','push','selectActor','battlePartyChangeCmd','isBTB','border','EFjYm','_partySwitchTargetActor','status','AssistSwapPosition','addRemoveCommand','ARRAYNUM','drawSvActor','EweVb','Settings','ConvertParams','_clickHandler','text','VisuMZ_2_BattleSystemSTB','close','preparePartySwitchMember','stepForward','actor','hasBattleSystemIncompatibilities','shift','9gojNaM','ReserveItemThickness','BgFilename1','removePartyCommand','addNonBattleTestMembers','open','_statusWindow','active','ReserveBattlerOffsetY','sprite','battlePartySwitchCmd','RhkuG','paintOpacity','ReservePartyGraphic','isTimeActive','systemColor','isFormationCommandEnabled','createReservePartyWindow','right','Scene_Battle_isTimeActive','ReserveParty','width','AssistSwapIn','removeActorFromBattleMembers','CallPartyScene','removePartyMember','deactivate','loadCharacter','updateBattleProcess','Game_Party_setupBattleTest','drawItemImage','yUtxf','zyuUm','QGElt','AssistRemove','isPTB','ypFbn','drawItemImageSprite','ReservePartyLabelRect','cancel','8168232MTCdYI','isPreviousScene','ReserveSpriteOffsetY','Lock','createPageButtons','makeActions','onPartySwitchCancel','BattlePartyIcon','RSJps','Param','nameStartPosition','sNMJz','battlerName','face','paramValueByName','VisuMZ_1_MainMenuCore','ARRAYEVAL','_partySystemBattleCommandCooldown','changeMaxBattleMembers','setBackgroundType','updateBattlePartySwitchCooldown','sESwC','Vocab','processOk','version','_backSprite1','terminate','createReservePartyLabel','param','OVzkL','faceHeight','reservePartyWindowRect','_tpbChargeTime','innerHeight','min','description','parse','commandStyle','MoveActorsToReserve','trim','DrawBackRect','Game_Party_swapOrder','iVlIj','PartyCmdWinAddParty','BxTda','_partyRequired','partySwitchWindowRectBorder','format','BattleManager_setup','statusLabelRect','Game_Unit_inBattle','statusWindowRect','makeActionOrders','pHxHu','isFormationChangeOk','CeLKc','_battleSystemIncompatibilityError','qYFHD','LockPartyMembers','initMaxBattleMembers','#%1','drawActorCharacter','anyRequiredPartyMembersInReserve','lKyyF','clearBypassAutoSave','sKKuD','WvUbh','addFormationCommand','StatusLabelBgType','Sprite_Actor_update','followers','getParamValue','VisuMZ_2_BattleSystemBTB','processShiftSortShortcut','BackRectColor','addActorToBattleMembersAtIndex','BattleSwitchWindowBgType','activePartyLabelRect','assistSwapInPartyMember','isAnyInputWindowActive','length','isFTB','isActiveTpb','_lastIndex','drawItemDarkRect','ReserveBattlerOffsetX','loadPartyImages','loadTitle1','smoothSelect','itemRect'];_0x2b33=function(){return _0x4f6403;};return _0x2b33();}Window_PartyBattleSwitch['prototype']=Object['create'](Window_StatusBase[_0x12a2a9(0x28c)]),Window_PartyBattleSwitch[_0x12a2a9(0x28c)][_0x12a2a9(0x248)]=Window_PartyBattleSwitch,Window_PartyBattleSwitch[_0x12a2a9(0x28c)][_0x12a2a9(0x294)]=function(_0x2f2b92){const _0x2858c4=_0x12a2a9;Window_StatusBase[_0x2858c4(0x28c)]['initialize'][_0x2858c4(0x26c)](this,_0x2f2b92),this[_0x2858c4(0x1ad)](VisuMZ[_0x2858c4(0x132)][_0x2858c4(0x167)][_0x2858c4(0x2d9)][_0x2858c4(0x1e6)]),this['openness']=0x0;},Window_PartyBattleSwitch[_0x12a2a9(0x28c)]['loadFaceImages']=function(){const _0x409c31=_0x12a2a9;for(const _0x46f730 of $gameParty[_0x409c31(0x13c)]()){ImageManager['loadFace'](_0x46f730['faceName']());}},Window_PartyBattleSwitch[_0x12a2a9(0x28c)][_0x12a2a9(0x124)]=function(){return 0x1;},Window_PartyBattleSwitch['prototype'][_0x12a2a9(0x16f)]=function(_0xecfb63){const _0x342902=_0x12a2a9;return $gameParty[_0x342902(0xc5)]()[_0xecfb63];},Window_PartyBattleSwitch[_0x12a2a9(0x28c)]['currentActor']=function(){const _0x57048a=_0x12a2a9;return this[_0x57048a(0x16f)](this[_0x57048a(0xf3)]());},Window_PartyBattleSwitch[_0x12a2a9(0x28c)][_0x12a2a9(0x14d)]=function(){const _0x1b0446=_0x12a2a9;return this[_0x1b0446(0x159)]()*0x2+0x8;},Window_PartyBattleSwitch[_0x12a2a9(0x28c)]['maxItems']=function(){const _0x1623e2=_0x12a2a9;return $gameParty[_0x1623e2(0xc5)]()[_0x1623e2(0x1ea)];},Window_PartyBattleSwitch[_0x12a2a9(0x28c)][_0x12a2a9(0x10c)]=function(){const _0x4a78c2=_0x12a2a9;Window_StatusBase[_0x4a78c2(0x28c)][_0x4a78c2(0x10c)][_0x4a78c2(0x26c)](this),this[_0x4a78c2(0x177)](),this[_0x4a78c2(0x150)](),this[_0x4a78c2(0x1f2)](0x0);},Window_PartyBattleSwitch['prototype'][_0x12a2a9(0x18c)]=function(){const _0x23e7fa=_0x12a2a9;Window_StatusBase[_0x23e7fa(0x28c)][_0x23e7fa(0x18c)][_0x23e7fa(0x26c)](this),this[_0x23e7fa(0x16c)]();},Window_PartyBattleSwitch[_0x12a2a9(0x28c)]['isCurrentItemEnabled']=function(){const _0x598a12=_0x12a2a9;return this[_0x598a12(0x1f6)](this[_0x598a12(0x12e)]());},Window_PartyBattleSwitch[_0x12a2a9(0x28c)][_0x12a2a9(0x1f6)]=function(_0x2345bf){const _0x2423c2=_0x12a2a9;if(!_0x2345bf)return![];return _0x2345bf['isFormationChangeOk']()&&_0x2345bf[_0x2423c2(0x213)]();},Window_PartyBattleSwitch['prototype'][_0x12a2a9(0x2c1)]=function(_0x273fe4){const _0x3ec4ec=_0x12a2a9,_0x55c12b=this[_0x3ec4ec(0x16f)](_0x273fe4);if(!_0x55c12b)return;const _0x2e0ebe=ImageManager[_0x3ec4ec(0x116)](_0x55c12b[_0x3ec4ec(0x2b2)]());_0x2e0ebe[_0x3ec4ec(0x2e7)](this['processDrawItem']['bind'](this,_0x273fe4));},Window_PartyBattleSwitch[_0x12a2a9(0x28c)]['processDrawItem']=function(_0xc3ca49){this['drawItemImage'](_0xc3ca49),this['drawItemStatus'](_0xc3ca49);},Window_PartyBattleSwitch['prototype']['drawItemImage']=function(_0x533b67){const _0x2d37c5=_0x12a2a9,_0x167f4a=this[_0x2d37c5(0x16f)](_0x533b67),_0x1a1861=this['itemRect'](_0x533b67);this[_0x2d37c5(0x273)](this[_0x2d37c5(0x1f6)](_0x167f4a)),this[_0x2d37c5(0xea)](_0x167f4a,_0x1a1861['x']+0x1,_0x1a1861['y']+0x1,ImageManager[_0x2d37c5(0x2a1)],_0x1a1861[_0x2d37c5(0x221)]-0x2),this[_0x2d37c5(0x273)](!![]);},Window_PartyBattleSwitch[_0x12a2a9(0x28c)][_0x12a2a9(0xc2)]=function(_0x1f15a8){const _0x34e5e6=_0x12a2a9,_0x1f1839=this[_0x34e5e6(0x16f)](_0x1f15a8),_0xfa961e=this[_0x34e5e6(0x21a)](_0x1f15a8),_0x68def2=_0xfa961e['x']+ImageManager[_0x34e5e6(0x2a1)]+0x24,_0x376ed6=_0x68def2+0xb4;this[_0x34e5e6(0x273)](this[_0x34e5e6(0x1f6)](_0x1f1839)),this[_0x34e5e6(0x2e3)](_0x1f1839,_0x68def2,_0xfa961e['y']),this[_0x34e5e6(0x20b)](_0x1f1839,_0x68def2,_0xfa961e['y']+this[_0x34e5e6(0x159)]()),this[_0x34e5e6(0x2a3)](_0x1f1839,_0x376ed6,_0xfa961e['y']),this[_0x34e5e6(0x273)](!![]);};Imported[_0x12a2a9(0x256)]&&(ImageManager[_0x12a2a9(0xf4)]=VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x167)][_0x12a2a9(0x240)][_0x12a2a9(0x1a1)]??0x4b,TextManager[_0x12a2a9(0x15c)]=VisuMZ[_0x12a2a9(0x132)]['Settings'][_0x12a2a9(0x1b0)]['BattlePartyCmd'],TextManager['battlePartyChangeCmdHelp']=VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x167)][_0x12a2a9(0x1b0)][_0x12a2a9(0x154)],TextManager['battlePartySwitchCmd']=VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x167)]['Vocab'][_0x12a2a9(0x2e6)],TextManager[_0x12a2a9(0x26b)]=VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x167)][_0x12a2a9(0x1b0)]['BattleHelpSwitch'],TextManager['ActiveTpbFormationMessage']=VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x167)][_0x12a2a9(0x1b0)][_0x12a2a9(0xcf)],VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0xcc)]=SceneManager['isPreviousSceneBattleTransitionable'],SceneManager['isPreviousSceneBattleTransitionable']=function(){const _0x59603f=_0x12a2a9;if(SceneManager[_0x59603f(0x19b)](Scene_Party))return!![];return VisuMZ[_0x59603f(0x132)][_0x59603f(0xcc)][_0x59603f(0x26c)](this);},VisuMZ[_0x12a2a9(0x132)]['SceneManager_isNextSceneBattleTransitionable']=SceneManager['isNextSceneBattleTransitionable'],SceneManager[_0x12a2a9(0xcb)]=function(){const _0x286bdf=_0x12a2a9;if(SceneManager[_0x286bdf(0xd7)](Scene_Party))return!![];return VisuMZ[_0x286bdf(0x132)]['SceneManager_isNextSceneBattleTransitionable']['call'](this);},SceneManager[_0x12a2a9(0x108)]=function(){const _0x53c499=_0x12a2a9;return this[_0x53c499(0x2ab)]&&this[_0x53c499(0x2ab)][_0x53c499(0x248)]===Scene_Map;},VisuMZ[_0x12a2a9(0x132)]['Scene_Battle_createAllWindows']=Scene_Battle[_0x12a2a9(0x28c)]['createAllWindows'],Scene_Battle['prototype'][_0x12a2a9(0x206)]=function(){const _0x542183=_0x12a2a9;VisuMZ[_0x542183(0x132)][_0x542183(0x23b)][_0x542183(0x26c)](this),this[_0x542183(0x21f)](),this['postPartySwitchMenuTpb'](),this[_0x542183(0x2ba)]();},Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x21f)]=function(){const _0x31c7a0=_0x12a2a9,_0x22fecd=this[_0x31c7a0(0x235)]();this[_0x31c7a0(0x203)]=new Window_PartyBattleSwitch(_0x22fecd),this['addWindow'](this['_partyMemberSwitchWindow']),this[_0x31c7a0(0x203)][_0x31c7a0(0x135)]('ok',this[_0x31c7a0(0x145)][_0x31c7a0(0x127)](this)),this['_partyMemberSwitchWindow']['setHandler'](_0x31c7a0(0x199),this['onPartySwitchCancel'][_0x31c7a0(0x127)](this));},Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x235)]=function(){const _0x13bf17=_0x12a2a9,_0x5e9c86=this[_0x13bf17(0x279)]();return _0x5e9c86===_0x13bf17(0x15e)?this[_0x13bf17(0x1c8)]():this[_0x13bf17(0xfe)]();},Scene_Battle['prototype']['partySwitchWindowRectStandard']=function(){const _0x1cff00=_0x12a2a9;return VisuMZ['PartySystem'][_0x1cff00(0x167)][_0x1cff00(0x2d9)][_0x1cff00(0x2c9)][_0x1cff00(0x26c)](this);},Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x1c8)]=function(){const _0x32d924=_0x12a2a9,_0x16c49b=this[_0x32d924(0x254)](),_0x67bc6c=$gameSystem[_0x32d924(0x253)]()*0x2;return _0x16c49b['width']=0x204+_0x67bc6c,_0x16c49b;},VisuMZ['PartySystem'][_0x12a2a9(0x2c5)]=Scene_Battle['prototype'][_0x12a2a9(0x1e9)],Scene_Battle[_0x12a2a9(0x28c)]['isAnyInputWindowActive']=function(){const _0x23996b=_0x12a2a9;if(this[_0x23996b(0x203)]&&this[_0x23996b(0x203)][_0x23996b(0x179)])return!![];if(this['_partySystemSwitchOut'])return!![];if(this[_0x23996b(0x104)])return!![];if(this[_0x23996b(0x2d3)])return!![];return VisuMZ[_0x23996b(0x132)][_0x23996b(0x2c5)][_0x23996b(0x26c)](this);},VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x204)]=Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x298)],Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x298)]=function(){const _0x3d5c03=_0x12a2a9;VisuMZ[_0x3d5c03(0x132)]['Scene_Battle_createPartyCommandWindowBattleCore'][_0x3d5c03(0x26c)](this),this[_0x3d5c03(0x2bd)][_0x3d5c03(0x135)]('formation',this['commandFormation'][_0x3d5c03(0x127)](this));},Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x2bc)]=function(){const _0x540eeb=_0x12a2a9;this[_0x540eeb(0x22d)]()?(this[_0x540eeb(0x2d3)]=!![],this[_0x540eeb(0x12f)]['addText'](TextManager[_0x540eeb(0x11d)][_0x540eeb(0x1c9)](TextManager[_0x540eeb(0x2c8)]))):this[_0x540eeb(0x2ee)]();},Scene_Battle[_0x12a2a9(0x28c)]['isQueueFormationMenu']=function(){const _0x3cdf21=_0x12a2a9;return BattleManager[_0x3cdf21(0x1ec)]();},Scene_Battle['prototype']['callFormation']=function(){const _0x383674=_0x12a2a9;this['_callSceneParty']=![],this[_0x383674(0x2d8)][_0x383674(0x157)](),this[_0x383674(0x2a2)][_0x383674(0x296)]=![],SceneManager['snapForBackground'](),SceneManager[_0x383674(0x15a)](Scene_Party),$gameParty[_0x383674(0x115)]();if(BattleManager['isTpb']()){if('AJudP'===_0x383674(0x1d9)){this[_0x383674(0x2a8)]();if(this['_battleMembers'][_0x383674(0x23a)](_0x274d4e))return;if(!this[_0x383674(0xed)]['includes'](_0x278ce7))return;if(!this[_0x383674(0x226)][_0x383674(0x23a)](0x0))return;const _0x14875b=_0x110255[_0x383674(0x16f)](_0x3363c1);if(!_0x14875b)return;const _0x5a3ad1=this['_battleMembers'][_0x383674(0x297)](0x0);if(_0x5a3ad1<0x0)return;this[_0x383674(0x226)][_0x5a3ad1]=_0x49d3d3,_0x17a749[_0x383674(0x21b)]()&&(_0x14875b[_0x383674(0x11f)](),_0x14875b['makeActions']()),this[_0x383674(0xe9)]();}else BattleManager[_0x383674(0x2c3)]=BattleManager['actor']();}},VisuMZ['PartySystem'][_0x12a2a9(0xf8)]=Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x18e)],Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x18e)]=function(){const _0x237ae3=_0x12a2a9;VisuMZ[_0x237ae3(0x132)][_0x237ae3(0xf8)][_0x237ae3(0x26c)](this),this[_0x237ae3(0x2d3)]&&!BattleManager[_0x237ae3(0x2ec)]&&this[_0x237ae3(0x2ee)](),this['_callPartyMemberSwitch']&&!BattleManager[_0x237ae3(0x2ec)]&&(_0x237ae3(0x270)==='nGQOa'?this[_0x237ae3(0xee)]():(_0x562b4f[_0x237ae3(0x28c)][_0x237ae3(0x19e)][_0x237ae3(0x26c)](this),this[_0x237ae3(0xf5)][_0x237ae3(0x169)]=_0x5ee79e,this['_pagedownButton'][_0x237ae3(0x169)]=_0xc62e6d));},VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x185)]=Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x180)],Scene_Battle[_0x12a2a9(0x28c)]['isTimeActive']=function(){const _0xbf5df1=_0x12a2a9;if(BattleManager[_0xbf5df1(0x1ec)]()){if('NCNRp'==='geLeM')this[_0xbf5df1(0x150)]();else{if(this['_partyMemberSwitchWindow']&&this['_partyMemberSwitchWindow'][_0xbf5df1(0x179)])return![];}}return VisuMZ[_0xbf5df1(0x132)][_0xbf5df1(0x185)]['call'](this);},VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x11e)]=Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x22b)],Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x22b)]=function(){const _0x51b677=_0x12a2a9;VisuMZ['PartySystem']['Scene_Battle_createActorCommandWindow'][_0x51b677(0x26c)](this),this[_0x51b677(0x13a)]['setHandler']('formation',this['commandPartyMemberSwitch']['bind'](this));},Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0xe2)]=function(){const _0x20d241=_0x12a2a9;this[_0x20d241(0x22d)]()?(this['_callPartyMemberSwitch']=!![],this[_0x20d241(0x12f)][_0x20d241(0xfd)](TextManager['ActiveTpbFormationMessage'][_0x20d241(0x1c9)](TextManager[_0x20d241(0x2c8)]))):this[_0x20d241(0xee)]();},Scene_Battle[_0x12a2a9(0x28c)]['callPartyMemberSwitch']=function(){const _0x2369bf=_0x12a2a9;this[_0x2369bf(0x104)]=![],this['_logWindow'][_0x2369bf(0xe1)](),BattleManager[_0x2369bf(0x16f)]()&&this[_0x2369bf(0x203)][_0x2369bf(0x10c)]();},Scene_Battle['prototype'][_0x12a2a9(0x145)]=function(){const _0x1ccd71=_0x12a2a9,_0x4ab2ce=this[_0x1ccd71(0x203)][_0x1ccd71(0x12e)]();if(_0x4ab2ce)this['preparePartySwitchMember'](_0x4ab2ce);else{if(_0x1ccd71(0xe7)!==_0x1ccd71(0x117))this['_partyMemberSwitchWindow'][_0x1ccd71(0x18c)](),this[_0x1ccd71(0x13a)]['activate']();else{if(!_0x15bf1f[_0x1ccd71(0x108)]())return;if(_0x161f5c['battleMembers']()[_0x1ccd71(0x1ea)]<=0x1)return;if(!_0x38ba18[_0x1ccd71(0x226)])return;if(_0x5ea365[_0x1ccd71(0x226)][_0x1ccd71(0x1ea)]<=0x0)return;_0x12fc25[_0x1ccd71(0x168)](_0x56947d,_0xf449ce);const _0x18a528=_0x53d0e3[_0x1ccd71(0xbe)],_0x42329a=_0x51cd04[_0x1ccd71(0x226)][_0x18a528];_0x4abc9d[_0x1ccd71(0x189)](_0x42329a),_0x7fefd9[_0x1ccd71(0x150)]();}}},Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x16d)]=function(_0x343315){const _0x19b426=_0x12a2a9,_0x566df8=BattleManager[_0x19b426(0x16f)](),_0x101b6e=_0x566df8[_0x19b426(0x121)]();this[_0x19b426(0x203)]['deactivate'](),this[_0x19b426(0x286)]()&&_0x101b6e?(this[_0x19b426(0x28d)]=!![],_0x101b6e[_0x19b426(0xc1)](_0x343315)):_0x19b426(0x193)===_0x19b426(0x192)?_0x76bbb8[_0x19b426(0x15a)](_0x584dbb):this['processPartySwitchMember'](_0x343315);},Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x286)]=function(){const _0x178980=_0x12a2a9;return VisuMZ['PartySystem']['Settings']['General'][_0x178980(0x120)];},Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x14c)]=function(_0x5caf62){const _0x25075e=_0x12a2a9;this[_0x25075e(0x28d)]=![];const _0x5e1993=BattleManager[_0x25075e(0x16f)](),_0x98c191=_0x5e1993['battler'](),_0x532b12=$gameParty[_0x25075e(0x226)][_0x25075e(0x297)](_0x5e1993[_0x25075e(0x263)]());$gameParty['_battleMembers'][_0x532b12]=_0x5caf62[_0x25075e(0x263)](),$gameParty[_0x25075e(0xe9)]();if(this[_0x25075e(0x20c)]())_0x5caf62[_0x25075e(0x1ba)]=_0x5e1993['_tpbChargeTime'],_0x5caf62[_0x25075e(0x2a7)]=_0x25075e(0x26a);else{if(BattleManager['isTpb']()){if(_0x25075e(0x1b7)===_0x25075e(0x1b7))_0x5caf62['clearTpbChargeTime']();else{_0x3423c1[_0x25075e(0x2ab)]['processPartySwitchMember'](_0xf62f16);const _0x160223=_0xf3a263[_0x25075e(0x218)];this[_0x25075e(0x16e)](),this[_0x25075e(0x289)](0xff,_0x160223);}}}BattleManager[_0x25075e(0xd4)]=_0x5caf62,BattleManager['updateTargetsForPartySwitch'](_0x5e1993,_0x5caf62),_0x5caf62[_0x25075e(0x115)](),_0x5caf62['makeActions'](),_0x5caf62[_0x25075e(0x25b)](_0x5e1993);if(_0x98c191){if(_0x25075e(0x1c6)===_0x25075e(0x1c6))_0x98c191[_0x25075e(0x287)](_0x5caf62);else{_0x4b3c6c=_0x3be7e6||this[_0x25075e(0x159)](),this[_0x25075e(0x148)]['paintOpacity']=0xa0;const _0x52023f=_0x3997ec[_0x25075e(0x2dd)]();this[_0x25075e(0x148)][_0x25075e(0x158)](_0xf9380+0x1,_0x31d5dc+0x1,_0x53d43c-0x2,_0x3768e6-0x2,_0x52023f),this[_0x25075e(0x148)][_0x25075e(0x17e)]=0xff;}}this[_0x25075e(0x178)][_0x25075e(0x141)](_0x5e1993,_0x5caf62),this['_statusWindow'][_0x25075e(0x150)](),this[_0x25075e(0x13a)][_0x25075e(0x114)](_0x5caf62),this['_actorCommandWindow'][_0x25075e(0x1f2)](0x0),this['_actorCommandWindow']['activate'](),this[_0x25075e(0x13a)][_0x25075e(0x2d1)]=!![];},Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x20c)]=function(){const _0x249706=_0x12a2a9;if(!BattleManager[_0x249706(0xe4)]())return![];const _0x23b46a=VisuMZ[_0x249706(0x132)][_0x249706(0x167)][_0x249706(0x240)];if(_0x23b46a[_0x249706(0xf7)]===undefined){if('YlAXl'!=='wiXfV')_0x23b46a['tpbImmediateAction']=!![];else{const _0x4c29f3=this['index'](),_0x149ada=_0x4c29f3-0x1<0x0?this[_0x249706(0x1ff)]()-0x1:_0x4c29f3-0x1;this[_0x249706(0xd5)](_0x4c29f3,_0x149ada);}}return _0x23b46a[_0x249706(0xf7)];},Window_StatusBase[_0x12a2a9(0x28c)][_0x12a2a9(0x141)]=function(_0x36a4a7,_0x4f6244){const _0x47c1a6=_0x12a2a9,_0x50c507=_0x47c1a6(0xd1)[_0x47c1a6(0x1c9)](_0x36a4a7[_0x47c1a6(0x263)]()),_0x5ae662=this[_0x47c1a6(0x25d)](_0x50c507,Sprite_StateIcon);_0x5ae662[_0x47c1a6(0x114)](_0x4f6244);},Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x1a0)]=function(){const _0x42de85=_0x12a2a9;this[_0x42de85(0x203)][_0x42de85(0x18c)](),this[_0x42de85(0x13a)][_0x42de85(0x10c)](),this[_0x42de85(0x13a)]['refresh']();},Scene_Battle[_0x12a2a9(0x28c)][_0x12a2a9(0x29a)]=function(){const _0x389016=_0x12a2a9;if(!BattleManager['isTpb']())return;if(!SceneManager[_0x389016(0x19b)](Scene_Party))return;this[_0x389016(0x2bd)][_0x389016(0x18c)](),this[_0x389016(0x2bd)][_0x389016(0x16c)](),this[_0x389016(0x13a)]['deactivate'](),this[_0x389016(0x13a)][_0x389016(0x16c)](),BattleManager[_0x389016(0xd4)]=null,BattleManager[_0x389016(0x119)]=![];},Scene_Battle['prototype'][_0x12a2a9(0x2ba)]=function(){const _0x4dace6=_0x12a2a9;if(BattleManager[_0x4dace6(0xe4)]())return;if(!SceneManager[_0x4dace6(0x19b)](Scene_Party))return;Imported['VisuMZ_2_BattleSystemBTB']&&BattleManager[_0x4dace6(0x15d)]()&&('pHxHu'!==_0x4dace6(0x1cf)?(_0x5a8ea7['prototype']['initialize'][_0x4dace6(0x26c)](this,_0xe17f86),this[_0x4dace6(0x2bb)](_0x4c9086)):BattleManager[_0x4dace6(0x1ce)]());if(Imported[_0x4dace6(0x250)]&&BattleManager[_0x4dace6(0x1eb)]()){if(_0x4dace6(0x292)===_0x4dace6(0x230)){!_0x26472d&&(this['_battleMaxSize']=_0x36103f[_0x4dace6(0x276)]);this[_0x4dace6(0x226)]=this[_0x4dace6(0xed)][_0x4dace6(0xd8)](0x0,this['_battleMaxSize']);while(this['_battleMembers']['length']<this[_0x4dace6(0x147)]){this[_0x4dace6(0x226)][_0x4dace6(0x15a)](0x0);}if(_0x234f71)_0x5b8c1e[_0x4dace6(0x150)]();}else BattleManager['_currentActor']=$gameParty[_0x4dace6(0x285)](),BattleManager[_0x4dace6(0x2ec)]=BattleManager['actor'](),BattleManager[_0x4dace6(0x119)]=!![],this[_0x4dace6(0x13a)][_0x4dace6(0x114)](BattleManager[_0x4dace6(0x16f)]()),this[_0x4dace6(0x178)][_0x4dace6(0x15b)](BattleManager[_0x4dace6(0x16f)]());}Imported['VisuMZ_2_BattleSystemETB']&&BattleManager['isETB']()&&(BattleManager[_0x4dace6(0xd4)]=$gameParty[_0x4dace6(0x285)](),BattleManager[_0x4dace6(0x2ec)]=BattleManager[_0x4dace6(0x16f)](),BattleManager['_inputting']=!![],this[_0x4dace6(0x13a)][_0x4dace6(0x114)](BattleManager[_0x4dace6(0x16f)]()),this[_0x4dace6(0x178)][_0x4dace6(0x15b)](BattleManager['actor']())),Imported[_0x4dace6(0x10a)]&&BattleManager[_0x4dace6(0x195)]()&&('PEzRx'!==_0x4dace6(0x1fa)?_0x16eaef=_0x268560[_0x4dace6(0x2eb)](_0x304960,_0x4d3464):(BattleManager[_0x4dace6(0xd4)]=$gameParty[_0x4dace6(0x285)](),BattleManager[_0x4dace6(0x2ec)]=BattleManager['actor'](),BattleManager['_inputting']=!![],this[_0x4dace6(0x13a)][_0x4dace6(0x114)](BattleManager['actor']()),this[_0x4dace6(0x178)][_0x4dace6(0x15b)](BattleManager[_0x4dace6(0x16f)]())));},Game_Party[_0x12a2a9(0x28c)]['teamBasedFirstAvailableMember']=function(){const _0x5b69b2=_0x12a2a9;let _0x99255e=this[_0x5b69b2(0x144)]();return _0x99255e[0x0];},Sprite_Actor[_0x12a2a9(0x218)]=0xc,Sprite_Actor[_0x12a2a9(0x28c)]['startSwitchOutAnimation']=function(_0x362115){const _0x1739e4=_0x12a2a9;this[_0x1739e4(0x160)]=_0x362115;const _0x346006=Sprite_Actor[_0x1739e4(0x218)];this['startMove'](0x12c,0x0,_0x346006),this[_0x1739e4(0x289)](0x0,_0x346006),this[_0x1739e4(0x218)]=_0x346006;},Sprite_Actor[_0x12a2a9(0x28c)][_0x12a2a9(0xd2)]=function(_0x111c05){const _0xed29f6=_0x12a2a9;if(SceneManager[_0xed29f6(0x21b)]()){SceneManager[_0xed29f6(0x2ab)][_0xed29f6(0x14c)](_0x111c05);const _0x438a6e=Sprite_Actor[_0xed29f6(0x218)];this['stepForward'](),this[_0xed29f6(0x289)](0xff,_0x438a6e);}this[_0xed29f6(0x160)]=null;},VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x1df)]=Sprite_Actor[_0x12a2a9(0x28c)][_0x12a2a9(0x157)],Sprite_Actor[_0x12a2a9(0x28c)]['update']=function(){const _0x31b22b=_0x12a2a9;VisuMZ[_0x31b22b(0x132)][_0x31b22b(0x1df)][_0x31b22b(0x26c)](this);if(this[_0x31b22b(0x218)])this[_0x31b22b(0x155)]();},Sprite_Actor[_0x12a2a9(0x28c)]['updatePartySwitch']=function(){const _0x4bc201=_0x12a2a9;this[_0x4bc201(0x218)]=this[_0x4bc201(0x218)]||0x0,this[_0x4bc201(0x218)]--,this[_0x4bc201(0x218)]<=0x0&&this['startSwitchInAnimation'](this[_0x4bc201(0x160)]);},Window_PartyCommand['prototype'][_0x12a2a9(0x220)]=function(){const _0x3dabc6=_0x12a2a9;this[_0x3dabc6(0x1dd)]();},Window_PartyCommand['prototype'][_0x12a2a9(0x1dd)]=function(){const _0x4ac410=_0x12a2a9;if(!this['isFormationCommandAdded']())return;if(this[_0x4ac410(0x170)]()){if($gameTemp[_0x4ac410(0x245)]()&&!BattleManager[_0x4ac410(0x1d2)]){if('DTInS'===_0x4ac410(0x113))console[_0x4ac410(0x2d0)](_0x4ac410(0x149)),BattleManager[_0x4ac410(0x1d2)]=!![];else return _0x1d475d[_0x4ac410(0x1a8)](_0xd2b4c2,!![]);}return;}const _0x146d65=this[_0x4ac410(0x1bf)](),_0x28d792=ImageManager[_0x4ac410(0xf4)],_0x130a01=_0x146d65==='text'?TextManager[_0x4ac410(0x15c)]:'\x5cI[%1]%2'[_0x4ac410(0x1c9)](_0x28d792,TextManager['battlePartyChangeCmd']),_0x5799ba=this[_0x4ac410(0x182)]();this[_0x4ac410(0x29c)](_0x130a01,_0x4ac410(0x2c8),_0x5799ba);},Window_PartyCommand[_0x12a2a9(0x28c)][_0x12a2a9(0xe6)]=function(){const _0x699832=_0x12a2a9;if(Imported[_0x699832(0x24b)]&&BattleManager[_0x699832(0x134)]())return![];return VisuMZ[_0x699832(0x132)][_0x699832(0x167)]['General'][_0x699832(0x1c5)];},Window_PartyCommand[_0x12a2a9(0x28c)][_0x12a2a9(0x170)]=function(){const _0x4bcd2b=_0x12a2a9;if(Imported[_0x4bcd2b(0x16b)]&&BattleManager[_0x4bcd2b(0xcd)]())return!![];return![];},Window_PartyCommand[_0x12a2a9(0x28c)][_0x12a2a9(0x182)]=function(){const _0x51e9ff=_0x12a2a9;if($gameParty['allMembers']()[_0x51e9ff(0x1ea)]<=0x1)return![];if(!$gameParty[_0x51e9ff(0x260)]())return![];return $gameSystem[_0x51e9ff(0x14e)]();},VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x167)][_0x12a2a9(0x1f8)]=Window_PartyCommand[_0x12a2a9(0x28c)][_0x12a2a9(0x2d5)],Window_PartyCommand[_0x12a2a9(0x28c)][_0x12a2a9(0x2d5)]=function(){const _0xc20146=_0x12a2a9,_0x539c9a=this[_0xc20146(0xd6)]();switch(_0x539c9a){case _0xc20146(0x2c8):this[_0xc20146(0x2b5)][_0xc20146(0x2bb)](TextManager[_0xc20146(0x24d)]);break;default:VisuMZ[_0xc20146(0x132)]['Settings']['Window_PartyCommand_updateHelp'][_0xc20146(0x26c)](this);break;}},Window_ActorCommand[_0x12a2a9(0x28c)][_0x12a2a9(0x2cf)]=function(){const _0x5763da=_0x12a2a9;if(!this['isPartyCommandAdded']())return;this[_0x5763da(0x210)](_0x5763da(0x2c8))>=0x0&&this[_0x5763da(0x175)]();const _0x237578=this[_0x5763da(0x1bf)](),_0x27f60d=ImageManager[_0x5763da(0xf4)],_0x21024f=_0x237578===_0x5763da(0x16a)?TextManager[_0x5763da(0x17c)]:'\x5cI[%1]%2'['format'](_0x27f60d,TextManager['battlePartyChangeCmd']),_0x3dca57=this[_0x5763da(0x21d)]();this[_0x5763da(0x29c)](_0x21024f,_0x5763da(0x2c8),_0x3dca57);},Window_ActorCommand[_0x12a2a9(0x28c)][_0x12a2a9(0x137)]=function(){const _0x39d709=_0x12a2a9;if(!this[_0x39d709(0x153)])return![];return VisuMZ[_0x39d709(0x132)][_0x39d709(0x167)]['General'][_0x39d709(0x22e)];},Window_ActorCommand[_0x12a2a9(0x28c)][_0x12a2a9(0x21d)]=function(){const _0x162597=_0x12a2a9;if($gameParty[_0x162597(0x13c)]()[_0x162597(0x1ea)]<=0x1)return![];if(!this['_actor'])return![];if(!this[_0x162597(0x153)][_0x162597(0x260)]())return![];return this[_0x162597(0x153)][_0x162597(0x1d0)]();},VisuMZ[_0x12a2a9(0x132)][_0x12a2a9(0x167)]['Window_ActorCommand_updateHelp']=Window_ActorCommand[_0x12a2a9(0x28c)][_0x12a2a9(0x2d5)],Window_ActorCommand[_0x12a2a9(0x28c)][_0x12a2a9(0x2d5)]=function(){const _0x36b1ab=_0x12a2a9,_0xb4b4e4=this['currentSymbol']();if(!_0xb4b4e4)return;switch(_0xb4b4e4[_0x36b1ab(0x208)]()){case'formation':this['_helpWindow']['setText'](TextManager[_0x36b1ab(0x26b)]);break;default:VisuMZ[_0x36b1ab(0x132)][_0x36b1ab(0x167)][_0x36b1ab(0x25a)]['call'](this);break;}},Window_ActorCommand['prototype'][_0x12a2a9(0x175)]=function(){const _0x27ce2d=_0x12a2a9;while(this[_0x27ce2d(0x210)]('formation')>=0x0){const _0x4e8d8f=this['findSymbol']('formation');this['_list'][_0x27ce2d(0x25e)](_0x4e8d8f,0x1);}});;