//=============================================================================
// VisuStella MZ - Equipment Set Bonuses
// VisuMZ_2_EquipSetBonuses.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EquipSetBonuses = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EquipSetBonuses = VisuMZ.EquipSetBonuses || {};
VisuMZ.EquipSetBonuses.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.02] [EquipSetBonuses]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Equipment_Set_Bonuses_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a RPG Maker MZ plugin that allows you to set equipment to be a part
 * of various sets. When multiple pieces of the set are equipped, (for example:
 * Warrior Shield, Warrior Helm, Warrior Armor), then bonuses are applied.
 * Bonuses can be applied at different stages, too, depending on how many set
 * pieces are being currently equipped. The art (faces, map sprites, battler,
 * and various portraits for other plugins) for an actor can also change based
 * on the number of equipment sets worn.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create an unlimited amount of Equipment Sets to apply to actors when
 *   wearing matching sets of weapons and/or armor.
 * * Each equipment set can apply bonuses at various stages depending on the
 *   number of set pieces equipped up to a total of 20 per Equipment Set.
 * * A tooltip window to show extra data to show the player what bonuses are
 *   applied when different numbers of set pieces are equipped.
 * * Apply different appearances to actor graphics (face, map sprites, battler,
 *   and portraits) depending on the number of equipment pieces equipped for
 *   certain sets.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
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
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Set Graphics
 * 
 * If an actor has equipment set graphics defined, they will overwrite the face
 * graphic, map character sprite graphic, battler graphic, and any portraits
 * that have been added through the VisuStella MZ plugins. The equipment set
 * graphics will take priority over the default graphics.
 * 
 * If an actor has multiple equipment sets on at the same time, each with their
 * own set graphics, the set with the highest number of pieces that has defined
 * graphics will be given priority.
 * 
 * ---
 * 
 * Change Actor Images Event Command
 * 
 * When changing an actor's graphics through the "Change Actor Images" event
 * command, these changes will take priority over the Equipment Set Graphics.
 * If you want to remove these priority graphics, set the "Change Actor Images"
 * images to "(None)".
 * 
 * Keep in mind that this means you cannot make an "invisible" graphic through
 * the "(None)" selection anymore. Instead, you need to make a work around by
 * making a custom graphic image that is fully transparent.
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
 * VisuMZ_1_MainMenuCore
 *
 * If the Battle Core and/or the Main Menu Core is installed, the Equipment
 * Set Graphics also gives access to notetags that alter their battle portraits
 * and/or menu portraits based on whatever Equipment Sets are equipped.
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
 * === Equipment Set Declaration-Related Notetags ===
 * 
 * ---
 *
 * <Equip Set: name>
 *
 * - Used for: Weapon, Armor Notetags
 * - This assigns this item to an equipment set.
 * - Replace 'name' with the set name you're going to associate this equip
 *   with. Names must equal the Equipment Set names declared in the Plugin
 *   Parameters or else they will not have any effect.
 * - If you want to make a piece of equipment be a part of two different
 *   equipment sets, use multiple copies of this notetag.
 *
 * ---
 * 
 * === Equipment Set Graphics-Related Notetags ===
 * 
 * ---
 *
 * <name Set, x Pieces Face: filename, index>
 * <name Set, x+ Pieces Face: filename, index>
 * <name Set, x to y Pieces Face: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/faces/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Character: filename, index>
 * <name Set, x+ Pieces Character: filename, index>
 * <name Set, x to y Pieces Character: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/characters/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Battler: filename>
 * <name Set, x+ Pieces Battler: filename>
 * <name Set, x to y Pieces Battler: filename>
 *
 * - Used for: Actor Notetags
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/sv_actors/ folder. Do not include the file extension.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Menu Portrait: filename>
 * <name Set, x+ Pieces Menu Portrait: filename>
 * <name Set, x to y Pieces Menu Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_MainMenuCore!
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Battle Portrait: filename>
 * <name Set, x+ Pieces Battle Portrait: filename>
 * <name Set, x to y Pieces Battle Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_BattleCore!
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * - 
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equipment Sets Settings
 * ============================================================================
 *
 * This is where you put all your equipment sets used in the game.
 * Adjust their settings here.
 *
 * ---
 *
 * Equipment Set
 * 
 *   Equipment Set Name:
 *   - This set's name used for databasing and in-game.
 *   - Register equips to sets using <Equip Set: x> notetag.
 * 
 *   Icon:
 *   - This is the icon used to repesent the set name.
 *   - Use 0 to not show an icon.
 * 
 *   Bonuses:
 * 
 *   1 Piece Bonus:
 *   2 Pieces Bonus:
 *   3 Pieces Bonus:
 *   4 Pieces Bonus:
 *   5 Pieces Bonus:
 *   6 Pieces Bonus:
 *   7 Pieces Bonus:
 *   8 Pieces Bonus:
 *   9 Pieces Bonus:
 *   10 Pieces Bonus:
 *   11 Pieces Bonus:
 *   12 Pieces Bonus:
 *   13 Pieces Bonus:
 *   14 Pieces Bonus:
 *   15 Pieces Bonus:
 *   16 Pieces Bonus:
 *   17 Pieces Bonus:
 *   18 Pieces Bonus:
 *   19 Pieces Bonus:
 *   20 Pieces Bonus:
 *   - Bonuses applied for having this number of pieces equipped.
 *   - These settings stack with later bonuses in the same set.
 *
 * ---
 *
 * 1-20 Piece(s) Bonus
 * 
 *   Text:
 *   - Text that appears next to each piece in the tooltip window.
 *   - Use 'auto' if you want this to be done automatically.
 * 
 *     Show in Tooltip?:
 *     - Show this in the tooltip?
 * 
 *   Bonuses:
 * 
 *     Passive States:
 *     - States that will be given out as passives when the required piece
 *       count is equipped.
 * 
 *     Basic Parameters:
 *     - Bonuses applied to the Basic Parameters when the required piece count
 *       is equipped.
 * 
 *     X Parameters:
 *     - Bonuses applied to the X Parameters when the required piece count is
 *       equipped.
 * 
 *     S Parameters:
 *     - Bonuses applied to the S Parameters when the required piece count is
 *       equipped.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   MaxHP:
 *   MaxMP:
 *   ATK:
 *   DEF:
 *   MAT:
 *   MDF:
 *   AGI:
 *   LUK:
 * 
 *   Rate:
 *   - Multiplicative bonus for this param when the required piece count is
 *     equipped.
 *   - 1.0 is 100%.
 * 
 *   Add:
 *   - Additive bonus for this param when the required piece count is equipped.
 *   - 0 is +0.
 *
 * ---
 *
 * X Parameters
 * 
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 * 
 *   Rate:
 *   - Multiplicative bonus for this param when the required piece count is
 *     equipped.
 *   - 1.0 is 100%.
 * 
 *   Add:
 *   - Additive bonus for this param when the required piece count is equipped.
 *   - 0.0 is +0%.
 *
 * ---
 *
 * S Parameters
 * 
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 * 
 *   Rate:
 *   - Multiplicative bonus for this param when the required piece count is
 *     equipped.
 *   - 1.0 is 100%.
 * 
 *   Add:
 *   - Additive bonus for this param when the required piece count is equipped.
 *   - 0.0 is +0%.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings for Equipment Set Bonuses.
 *
 * ---
 *
 * Settings
 * 
 *   Base Parameter Add:
 *   X Parameter Add:
 *   S Parameter Add:
 *   - When do you wish to apply the "Add" bonus parameters?
 *   - Typical Formula: (base + plus) * rate + flat
 *     - Plus - Apply Before Rate
 *     - Flat - Apply After Rate
 *   - For the purpose of keeping the bonuses consistent without confusing any
 *     players, there will be no notetags to shift between the two settings as
 *     an exception for an equip bonus.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Tooltip Settings
 * ============================================================================
 *
 * Tooltip settings for Equipment Set Bonuses. The tooltip window will appear
 * when selecting equipment with the <Equip Set: name> notetag.
 * 
 * By default, it will by anchored towards the upper left. However, if the
 * position of the tooltip would extend past the bottom of the screen, then the
 * tooltip window will change its anchor towards the bottom left as to not
 * cover the name of the item it is displaying information for.
 *
 * ---
 *
 * Appearance
 * 
 *   Show Tooltip?:
 *   - Show tooltips for Equipment Set Bonuses?
 * 
 *   Scale:
 *   - What scale size do you want for the tooltip?
 *   - Use 1.0 for normal size.
 * 
 *   Skin Filename:
 *   - What window skin do you want to use for the tooltip?
 * 
 *   Skin Opacity:
 *   - What opacity setting is used for the tooltip?
 *   - Use a number between 0 and 255.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - Offset the tooltip X position from the mouse?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the tooltip Y position from the mouse?
 *   - Negative: up. Positive: down. 
 *   - Inversed when low on screen.
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
 * Version 1.02: November 3, 2022
 * * Bug Fixes!
 * ** Fixed a problem with Custom text parameter that caused certain lines to
 *    not show up properly. Fix made by Irina.
 * 
 * Version 1.01: October 7, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.00 Official Release Date: March 8, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
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
 * @param EquipSetBonuses
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EquipSets:arraystruct
 * @text Equipment Sets
 * @type struct<EquipSet>[]
 * @desc This is where you put all your equipment sets used in the
 * game. Adjust their settings here.
 * @default ["{\"SetName:str\":\"Hearty\",\"Icon:num\":\"84\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+50\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+25\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Sorcery\",\"Icon:num\":\"79\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+10\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Power\",\"Icon:num\":\"77\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+15\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.20\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Guardian\",\"Icon:num\":\"81\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+40\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Wizard\",\"Icon:num\":\"78\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+10\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Alchemist\",\"Icon:num\":\"79\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+10\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.10\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Speedy\",\"Icon:num\":\"82\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Fortuna\",\"Icon:num\":\"87\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.25\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.50\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}"]
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings for Equipment Set Bonuses.
 * @default {"BaseParamAdd:str":"flat","XParamAdd:str":"flat","SParamAdd:str":"flat"}
 *
 * @param Tooltip:struct
 * @text Tooltip Settings
 * @type struct<Tooltip>
 * @desc Tooltip settings for Equipment Set Bonuses.
 * @default {"Appearance":"","Show:eval":"true","Scale:num":"0.6","WindowSkin:str":"Window","WindowOpacity:num":"240","Offset":"","OffsetX:num":"+24","OffsetY:num":"+40","Vocabulary":"","SetTitleFmt:str":"%2\\C[5]%1 Set Bonuses\\C[0]","SetPieceFmt:str":"\\C[5]∙%1 Set Effect:\\C[0] %2","SeparatorFmt:str":"%1, %2","StateFmt:str":"%2%1","RateFmt:str":"%1:%2","AddPosFmt:str":"%1+%2","AddNegFmt:str":"%1-%2"}
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
/*~struct~EquipSet:
 *
 * @param SetName:str
 * @text Equipment Set Name
 * @desc This set's name used for databasing and in-game.
 * Register equips to sets using <Equip Set: x> notetag.
 * @default Untitled
 *
 * @param Icon:num
 * @text Icon
 * @parent SetName:str
 * @desc This is the icon used to repesent the set name.
 * Use 0 to not show an icon.
 * @default 160
 *
 * @param Bonuses
 *
 * @param Piece1:struct
 * @text 1 Piece Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece2:struct
 * @text 2 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece3:struct
 * @text 3 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece4:struct
 * @text 4 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece5:struct
 * @text 5 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece6:struct
 * @text 6 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece7:struct
 * @text 7 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece8:struct
 * @text 8 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece9:struct
 * @text 9 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece10:struct
 * @text 10 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece11:struct
 * @text 11 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece12:struct
 * @text 12 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece13:struct
 * @text 13 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece14:struct
 * @text 14 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece15:struct
 * @text 15 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece16:struct
 * @text 16 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece17:struct
 * @text 17 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece18:struct
 * @text 18 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece19:struct
 * @text 19 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece20:struct
 * @text 20 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Set Pieces Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipSetPieces:
 *
 * @param Text:str
 * @text Text
 * @desc Text that appears next to each piece in the tooltip window.
 * Use 'auto' if you want this to be done automatically.
 * @default auto
 *
 * @param ShowText:eval
 * @text Show in Tooltip?
 * @parent Text
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this in the tooltip?
 * @default true
 * 
 * @param Bonuses
 * 
 * @param PassiveStates:arraynum
 * @text Passive States
 * @parent Bonuses
 * @type state[]
 * @desc States that will be given out as passives when the
 * required piece count is equipped.
 * @default []
 *
 * @param Param:struct
 * @text Basic Parameters
 * @parent Bonuses
 * @type struct<Param>
 * @desc Bonuses applied to the Basic Parameters when the
 * required piece count is equipped.
 * @default {}
 *
 * @param XParam:struct
 * @text X Parameters
 * @parent Bonuses
 * @type struct<XParam>
 * @desc Bonuses applied to the X Parameters when the
 * required piece count is equipped.
 * @default {}
 *
 * @param SParam:struct
 * @text S Parameters
 * @parent Bonuses
 * @type struct<SParam>
 * @desc Bonuses applied to the S Parameters when the
 * required piece count is equipped.
 * @default {}
 *
 */
/* ----------------------------------------------------------------------------
 * Param Bonuses Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param MaxHP
 * @default Maximum Hit Points
 *
 * @param Rate0:num
 * @text Rate
 * @parent MaxHP
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus0:num
 * @text Add
 * @parent MaxHP
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param MaxMP
 * @default Maximum Magic Points
 *
 * @param Rate1:num
 * @text Rate
 * @parent MaxMP
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus1:num
 * @text Add
 * @parent MaxMP
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param ATK
 * @default Attack
 *
 * @param Rate2:num
 * @text Rate
 * @parent ATK
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus2:num
 * @text Add
 * @parent ATK
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param DEF
 * @default Defense
 *
 * @param Rate3:num
 * @text Rate
 * @parent DEF
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus3:num
 * @text Add
 * @parent DEF
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param MAT
 * @default Magic Attack
 *
 * @param Rate4:num
 * @text Rate
 * @parent MAT
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus4:num
 * @text Add
 * @parent MAT
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param MDF
 * @default Magic Defense
 *
 * @param Rate5:num
 * @text Rate
 * @parent MDF
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus5:num
 * @text Add
 * @parent MDF
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param AGI
 * @default Agility
 *
 * @param Rate6:num
 * @text Rate
 * @parent AGI
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus6:num
 * @text Add
 * @parent AGI
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param LUK
 * @default Luck
 *
 * @param Rate7:num
 * @text Rate
 * @parent LUK
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus7:num
 * @text Add
 * @parent LUK
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * X Param Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~XParam:
 *
 * @param HIT
 * @default Hit Rate
 *
 * @param Rate0:num
 * @text Rate
 * @parent HIT
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus0:num
 * @text Add
 * @parent HIT
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param EVA
 * @default Evasion Rate
 *
 * @param Rate1:num
 * @text Rate
 * @parent EVA
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus1:num
 * @text Add
 * @parent EVA
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param CRI
 * @default Critical Hit
 *
 * @param Rate2:num
 * @text Rate
 * @parent CRI
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus2:num
 * @text Add
 * @parent CRI
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param CEV
 * @default Critical Evasion
 *
 * @param Rate3:num
 * @text Rate
 * @parent CEV
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus3:num
 * @text Add
 * @parent CEV
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MEV
 * @default Magic Evasion
 *
 * @param Rate4:num
 * @text Rate
 * @parent MEV
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus4:num
 * @text Add
 * @parent MEV
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MRF
 * @default Magic Reflect
 *
 * @param Rate5:num
 * @text Rate
 * @parent MRF
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus5:num
 * @text Add
 * @parent MRF
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param CNT
 * @default Counter Rate
 *
 * @param Rate6:num
 * @text Rate
 * @parent CNT
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus6:num
 * @text Add
 * @parent CNT
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param HRG
 * @default HP Regen Rate
 *
 * @param Rate7:num
 * @text Rate
 * @parent HRG
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus7:num
 * @text Add
 * @parent HRG
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MRG
 * @default Magic Regen Rate
 *
 * @param Rate8:num
 * @text Rate
 * @parent MRG
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus8:num
 * @text Add
 * @parent MRG
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param TRG
 * @default TP Regen Rate
 *
 * @param Rate9:num
 * @text Rate
 * @parent TRG
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus9:num
 * @text Add
 * @parent TRG
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * S Param Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SParam:
 *
 * @param TGR
 * @default Target Rate
 *
 * @param Rate0:num
 * @text Rate
 * @parent TGR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus0:num
 * @text Add
 * @parent TGR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param GRD
 * @default Guard Rate
 *
 * @param Rate1:num
 * @text Rate
 * @parent GRD
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus1:num
 * @text Add
 * @parent GRD
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param REC
 * @default Recovery Rate
 *
 * @param Rate2:num
 * @text Rate
 * @parent REC
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus2:num
 * @text Add
 * @parent REC
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param PHA
 * @default Pharmacology Rate
 *
 * @param Rate3:num
 * @text Rate
 * @parent PHA
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus3:num
 * @text Add
 * @parent PHA
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MCR
 * @default MP Cost Rate
 *
 * @param Rate4:num
 * @text Rate
 * @parent MCR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus4:num
 * @text Add
 * @parent MCR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param TCR
 * @default TP Charge Rate
 *
 * @param Rate5:num
 * @text Rate
 * @parent TCR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus5:num
 * @text Add
 * @parent TCR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param PDR
 * @default Physical Damage Rate
 *
 * @param Rate6:num
 * @text Rate
 * @parent PDR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus6:num
 * @text Add
 * @parent PDR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MDR
 * @default Magical Damage Rate
 *
 * @param Rate7:num
 * @text Rate
 * @parent MDR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus7:num
 * @text Add
 * @parent MDR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param FDR
 * @default Floor Damage Rate
 *
 * @param Rate8:num
 * @text Rate
 * @parent FDR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus8:num
 * @text Add
 * @parent FDR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param EXR
 * @default Experience Gain Rate
 *
 * @param Rate9:num
 * @text Rate
 * @parent EXR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus9:num
 * @text Add
 * @parent EXR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param BaseParamAdd:str
 * @text Base Parameter Add
 * @type select
 * @option Plus - Apply Before Rate
 * @value plus
 * @option Flat - Apply After Rate
 * @value flat
 * @desc When do you wish to apply the "Add" bonus parameters?
 * Typical Formula: (base + plus) * rate + flat
 * @default flat
 *
 * @param XParamAdd:str
 * @text X Parameter Add
 * @type select
 * @option Plus - Apply Before Rate
 * @value plus
 * @option Flat - Apply After Rate
 * @value flat
 * @desc When do you wish to apply the "Add" bonus parameters?
 * Typical Formula: (base + plus) * rate + flat
 * @default flat
 *
 * @param SParamAdd:str
 * @text S Parameter Add
 * @type select
 * @option Plus - Apply Before Rate
 * @value plus
 * @option Flat - Apply After Rate
 * @value flat
 * @desc When do you wish to apply the "Add" bonus parameters?
 * Typical Formula: (base + plus) * rate + flat
 * @default flat
 *
 */
/* ----------------------------------------------------------------------------
 * Tooltip Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tooltip:
 *
 * @param Appearance
 *
 * @param Show:eval
 * @text Show Tooltip?
 * @parent Appearance
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips for Equipment Set Bonuses?
 * @default true
 *
 * @param Scale:num
 * @text Scale
 * @parent Appearance
 * @desc What scale size do you want for the tooltip?
 * Use 1.0 for normal size.
 * @default 0.6
 *
 * @param WindowSkin:str
 * @text Skin Filename
 * @parent Appearance
 * @type file
 * @dir img/system/
 * @desc What window skin do you want to use for the tooltip?
 * @default Window
 *
 * @param WindowOpacity:num
 * @text Skin Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What opacity setting is used for the tooltip?
 * Use a number between 0 and 255.
 * @default 240
 *
 * @param Offset
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Offset the tooltip X position from the mouse?
 * Negative: left. Positive: right.
 * @default +24
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Offset the tooltip Y position from the mouse?
 * Negative: up. Positive: down. Inversed when low on screen.
 * @default +40
 *
 * @param Vocabulary
 *
 * @param SetTitleFmt:str
 * @text Set Title Format
 * @parent Vocabulary
 * @desc How does the set title appear?
 * %1 - Set Name, %2 - Icon
 * @default %2\C[5]%1 Set Bonuses\C[0]
 *
 * @param SetPieceFmt:str
 * @text Set Piece Format
 * @parent Vocabulary
 * @desc How do the set pieces appear?
 * %1 - Set Name, %2 - Effects
 * @default \C[5]∙%1 Set Effect:\C[0] %2
 *
 * @param SeparatorFmt:str
 * @text Separator Format
 * @parent Vocabulary
 * @desc How do you wish to separate effects?
 * %1 - Previous Effect, %2 - Next Effect
 * @default %1, %2
 *
 * @param StateFmt:str
 * @text Passive State Format
 * @parent Vocabulary
 * @desc How are passive state effects displayed?
 * %1 - State Name, %2 - Icon
 * @default %2%1
 *
 * @param RateFmt:str
 * @text Param Rate Format
 * @parent Vocabulary
 * @desc How are Parameter Rate effects displayed?
 * %1 - Param Name, %2 - Effect
 * @default %1:%2
 *
 * @param AddPosFmt:str
 * @text Add(+) Format
 * @parent Vocabulary
 * @desc How are positive Parameter Add effects displayed?
 * %1 - Param Name, %2 - Effect
 * @default %1+%2
 *
 * @param AddNegFmt:str
 * @text Add(-) Format
 * @parent Vocabulary
 * @desc How are negative Parameter Add effects displayed?
 * %1 - Param Name, %2 - Effect
 * @default %1-%2
 *
 */
//=============================================================================

const _0x576f25=_0x372c;(function(_0x5cbe2c,_0x28dc4e){const _0x799da1=_0x372c,_0x5887fa=_0x5cbe2c();while(!![]){try{const _0x53180d=parseInt(_0x799da1(0x1f6))/0x1*(parseInt(_0x799da1(0x12c))/0x2)+-parseInt(_0x799da1(0x149))/0x3*(parseInt(_0x799da1(0x13b))/0x4)+-parseInt(_0x799da1(0x1ca))/0x5+parseInt(_0x799da1(0x154))/0x6*(-parseInt(_0x799da1(0x141))/0x7)+-parseInt(_0x799da1(0x1f4))/0x8*(-parseInt(_0x799da1(0x132))/0x9)+-parseInt(_0x799da1(0xc1))/0xa*(parseInt(_0x799da1(0xf4))/0xb)+-parseInt(_0x799da1(0x96))/0xc*(-parseInt(_0x799da1(0x188))/0xd);if(_0x53180d===_0x28dc4e)break;else _0x5887fa['push'](_0x5887fa['shift']());}catch(_0x28dae7){_0x5887fa['push'](_0x5887fa['shift']());}}}(_0x52cb,0x40035));function _0x52cb(){const _0x522b36=['Actor-%1-SetName-%2-Pieces-%3','NolTZ','SetFaceNameRange','Game_Actor_setBattlePortrait','ARRAYEVAL','1636375airUNV','showEquipSetBonusTooltipWindow','Game_BattlerBase_paramRate','onNumberOk','getEquipSets','_equipSetBonusTooltipWindow','Mechanics','nIhbl','Window_ShopBuy','Game_Actor_battlerName','MRF','Game_Actor_releaseUnequippableItems','processNewLine','CRI','TafQK','Game_BattlerBase_sparamFlatBonus','paramPlus','Scene_Equip','loadSystem','cujUj','QjmvB','jzHTb','SetBattlerName','ofaCT','EVAL','Game_Actor_setBattlerImage','sparamPlus','AddNegFmt','TCR','XVmHi','kLqrm','SetBattlePortraitRange','Game_BattlerBase_xparamRate','getMenuImage','xparamRate','releaseUnequippableItems','floor','mGPhG','setBattlerImage','SParamAdd','format','resetFontSettings','96BHELmm','hygXy','101477mCkkpk','nHDuZ','setMenuImage','ATK','Scene_Shop_onBuyOk','match','show','Game_Actor_setup','actor','windowskin','pushLineOpacity','GRD','Scene_Shop_onSellOk','getActiveWindow','RXinP','height','_text','EQUIP_SET_X_PARAM_PLUS_FLAT','drawing','EEbmU','WindowSkin','_cache','paramName','SetBattlePortrait','updatePosition','12050628lXrQEg','_activeWindow','Icon','VUPrW','active','DmJWC','_priorityFaceIndex','actorId','vKhXZ','OwIjt','LUK','XLrDy','getBattlePortraitFilename','iconIndex','Rate%1','exit','push','createEquipSetBonusTooltipWindow','createWindowLayer','toLowerCase','version','setupText','Piece%1','map','KFiYL','refreshActorPortrait','ParseEquipSets','itemRect','plus','trim','Game_BattlerBase_sparamPlus','ConvertParams','KnQzH','isSupportMessageKeywords','clearEquipSetBonusCache','passiveStates','characterName','WmcDt','vQgOn','itemPadding','liQmj','XTbui','DaLtW','1100350ZtCMJj','actorEquipSetCharacterIndex','status','_statusWindow','FDR','setCharacterImage','tGEdV','Xckjc','battlerName','hide','Scale','item','_item','registerEquipSetBonusTooltipWindow','Window_Selectable_initialize','backOpacity','ARRAYSTR','SParam','zqJet','includes','zfJNJ','equipSetPlusNeg','BtSvU','characterIndex','CNT','onDatabaseLoaded','getEquipSetsSortedByMostPieces','xparamPlus','_requestRefresh','hRxzv','PHA','isArmor','hZWUD','SetCharaName','Pokvg','abs','Plus%1','equipSetPlusPos','\x5cI[%1]','Window_Selectable_callUpdateHelp','SetFaceNamePlus','createContents','setBattlePortrait','requestRefresh','actorEquipSetFaceIndex','Game_Actor_characterIndex','MOUSE_OFFSET_Y','EquipSets','UgKDx','constructor','Game_Actor_faceName','33uaKyUO','ParseAllNotetags','MEV','getActorEquipSetCharacterIndex','VisuMZ_1_ItemsEquipsCore','kbPCj','Window_ItemList','actorEquipSetMenuPortrait','round','setup','_equipSetBonusCount','rKjDt','getActorEquipSetFaceIndex','update','getActorEquipSetMenuPortrait','_armorEquipSets','eySJP','_priorityCharacterName','Set','_priorityCharacterIndex','FUNC','baseTextRect','equipSetPieceFmt','AddPosFmt','_lineOpacity','ezLzg','updateEquipSetBonusTooltip','Game_BattlerBase_sparamRate','SetPieceFmt','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','changePaintOpacity','GYWCj','jXGln','Scene_Boot_onDatabaseLoaded','Tooltip','VisuMZ_1_SkillsStatesCore','clampPosition','refresh','onBuyOk','Settings','updateBackOpacity','max','EQUIP_SET_S_PARAM_PLUS_FLAT','cmuOc','Game_BattlerBase_xparamFlatBonus','length','Game_Actor_setCharacterImage','xRjxk','hideEquipSetBonusTooltipWindow','Window_EquipSlot','RegExp','XParam','kMkIK','equipSetBonusParamRate','STR','callUpdateHelp','2dOjlOH','Param','Scene_Base_createWindowLayer','getEquipSetPieces','SetMenuPortraitRange','MOUSE_OFFSET_X','39051jbQNgJ','scale','equipSetState','RGtvn','refreshEquipSetTooltip','clamp','isWeapon','Game_BattlerBase_xparamPlus','WINDOW_SKIN_OPACITY','76sFXYKI','WindowOpacity','flat','refreshEquipSetBonuses','Game_Actor_faceIndex','TGR','1262058APFpAn','addSetDataText','name','jAjgF','EVmLv','SetCharaNameRange','NTCjz','getActorEquipSetBattlePortrait','9141ZfvbxZ','SetFaceName','_scene','SetBattlerNameRange','BaseParamAdd','note','_priorityBattlerName','actorEquipSetCharacterName','equipSetBonusParamPlus','MDR','RlALc','6GgbphB','actorEquipSetBattlePortrait','Scene_Shop_onNumberCancel','getActorEquipSetBattlerName','Text','SHOW_TOOLTIP','WINDOW_SCALE','onSellOk','dABdL','Game_Actor_setMenuImage','padding','HIT','getActorEquipSetFaceName','faceIndex','SeparatorFmt','equipSetPieceSeparator','MRG','Game_BattlerBase_paramPlus','Game_Actor_getBattlePortraitFilename','_priorityFaceName','SetName','HRG','AGI','qPIfL','EQUIP_SET_BASE_PARAM_PLUS_FLAT','SetCharaNamePlus','Show','sort','getActorEquipSetCharacterName','parse','OeItR','Window_EquipItem','addPieceDataText','equipSetTitleFmt','addChild','EQUIP_SET_BONUS_WINDOWS','_equipSetBonusSets','actorEquipSetBattlerName','shift','OffsetY','MAXHP','addPassiveStatesFromOtherPlugins','_equipSets','NnBnk','sparamRate','ARRAYJSON','setItem','OnDXP','SetMenuPortraitPlus','hpsiM','initialize','csaFe','13xZQjqF','hoISe','paramFlatBonus','contents','sparamFlatBonus','Window_BattleItem','call','SetMenuPortrait','getEquipSetData','ARRAYSTRUCT','_priorityBattlePortrait','clone','equips','PassiveStates','Window_ShopSell','_weaponEquipSets','EquipSetBonuses','drawTextEx','createAutoParamText','registerActorEquipSetImages','REC','StateFmt','prototype','faceName','addPassiveStatesFromEquipSetBonuses','actorEquipSetFaceName','VisuMZ_0_CoreEngine','onNumberCancel','xparamFlatBonus','SetBattlerNamePlus','Game_BattlerBase_paramFlatBonus','jEMVj','checkRefreshEquipSetBonuses','Scene_Shop_onNumberOk','width','resizeWindow','MCR','toUpperCase','mgMJH','createAutoPieceText','applyEquipSetBonuses','aGEtn','WINDOW_SKIN_FILENAME','ParseActorNotetags','rGUGs','DEF','paramRate','loadWindowskin','CEV','GeTfy','description','setActiveWindow','GQnyN','Game_Actor_characterName','hasEquipSetBonusTooltipWindow','create','lXQIW','_priorityMenuImage','Game_BattlerBase_addPassiveStatesFromOtherPlugins','srUww','OCzJi'];_0x52cb=function(){return _0x522b36;};return _0x52cb();}var label=_0x576f25(0x198),tier=tier||0x0,dependencies=[_0x576f25(0x1a2),_0x576f25(0xf8),_0x576f25(0x117)],pluginData=$plugins['filter'](function(_0x5d6553){const _0x3a1ed6=_0x576f25;return _0x5d6553[_0x3a1ed6(0xc3)]&&_0x5d6553['description'][_0x3a1ed6(0xd4)]('['+label+']');})[0x0];function _0x372c(_0xc413c5,_0x1f711f){const _0x52cb63=_0x52cb();return _0x372c=function(_0x372c15,_0x17fe3f){_0x372c15=_0x372c15-0x94;let _0x127120=_0x52cb63[_0x372c15];return _0x127120;},_0x372c(_0xc413c5,_0x1f711f);}VisuMZ[label][_0x576f25(0x11b)]=VisuMZ[label][_0x576f25(0x11b)]||{},VisuMZ[_0x576f25(0xb5)]=function(_0x76b330,_0x49d72c){const _0x4266c4=_0x576f25;for(const _0x36ebd3 in _0x49d72c){if(_0x4266c4(0x204)===_0x4266c4(0xde))_0xdc24a1[_0x4266c4(0x19e)]['processNewLine'][_0x4266c4(0x18e)](this,_0x51460b),_0x2056fb[_0x4266c4(0x208)]&&this[_0x4266c4(0x112)](this['_lineOpacity'][_0x4266c4(0x17a)]());else{if(_0x36ebd3[_0x4266c4(0x1fb)](/(.*):(.*)/i)){if('jEMVj'===_0x4266c4(0x1a7)){const _0x20fab8=String(RegExp['$1']),_0x4670da=String(RegExp['$2'])[_0x4266c4(0x1ad)]()[_0x4266c4(0xb3)]();let _0x5bb3e8,_0x5aca58,_0x581b25;switch(_0x4670da){case'NUM':_0x5bb3e8=_0x49d72c[_0x36ebd3]!==''?Number(_0x49d72c[_0x36ebd3]):0x0;break;case'ARRAYNUM':_0x5aca58=_0x49d72c[_0x36ebd3]!==''?JSON[_0x4266c4(0x171)](_0x49d72c[_0x36ebd3]):[],_0x5bb3e8=_0x5aca58[_0x4266c4(0xad)](_0x5b5a8d=>Number(_0x5b5a8d));break;case _0x4266c4(0x1e2):_0x5bb3e8=_0x49d72c[_0x36ebd3]!==''?eval(_0x49d72c[_0x36ebd3]):null;break;case _0x4266c4(0x1c9):_0x5aca58=_0x49d72c[_0x36ebd3]!==''?JSON['parse'](_0x49d72c[_0x36ebd3]):[],_0x5bb3e8=_0x5aca58[_0x4266c4(0xad)](_0x42ec20=>eval(_0x42ec20));break;case'JSON':_0x5bb3e8=_0x49d72c[_0x36ebd3]!==''?JSON[_0x4266c4(0x171)](_0x49d72c[_0x36ebd3]):'';break;case _0x4266c4(0x181):_0x5aca58=_0x49d72c[_0x36ebd3]!==''?JSON[_0x4266c4(0x171)](_0x49d72c[_0x36ebd3]):[],_0x5bb3e8=_0x5aca58[_0x4266c4(0xad)](_0x4cb706=>JSON['parse'](_0x4cb706));break;case _0x4266c4(0x108):_0x5bb3e8=_0x49d72c[_0x36ebd3]!==''?new Function(JSON['parse'](_0x49d72c[_0x36ebd3])):new Function('return\x200');break;case'ARRAYFUNC':_0x5aca58=_0x49d72c[_0x36ebd3]!==''?JSON[_0x4266c4(0x171)](_0x49d72c[_0x36ebd3]):[],_0x5bb3e8=_0x5aca58[_0x4266c4(0xad)](_0x5c83da=>new Function(JSON[_0x4266c4(0x171)](_0x5c83da)));break;case _0x4266c4(0x12a):_0x5bb3e8=_0x49d72c[_0x36ebd3]!==''?String(_0x49d72c[_0x36ebd3]):'';break;case _0x4266c4(0xd1):_0x5aca58=_0x49d72c[_0x36ebd3]!==''?JSON[_0x4266c4(0x171)](_0x49d72c[_0x36ebd3]):[],_0x5bb3e8=_0x5aca58[_0x4266c4(0xad)](_0x2df531=>String(_0x2df531));break;case'STRUCT':_0x581b25=_0x49d72c[_0x36ebd3]!==''?JSON[_0x4266c4(0x171)](_0x49d72c[_0x36ebd3]):{},_0x5bb3e8=VisuMZ['ConvertParams']({},_0x581b25);break;case _0x4266c4(0x191):_0x5aca58=_0x49d72c[_0x36ebd3]!==''?JSON[_0x4266c4(0x171)](_0x49d72c[_0x36ebd3]):[],_0x5bb3e8=_0x5aca58[_0x4266c4(0xad)](_0x26c63b=>VisuMZ[_0x4266c4(0xb5)]({},JSON[_0x4266c4(0x171)](_0x26c63b)));break;default:continue;}_0x76b330[_0x20fab8]=_0x5bb3e8;}else{const _0x326a54=this[_0x4266c4(0x14b)];if(!_0x326a54)return;const _0x1cc4a6=_0x326a54[_0x4266c4(0x1cf)];if(_0x1cc4a6)_0x1cc4a6[_0x4266c4(0xec)]();}}}}return _0x76b330;},(_0x5b4c7d=>{const _0x10f347=_0x576f25,_0x12277a=_0x5b4c7d[_0x10f347(0x143)];for(const _0xf64a66 of dependencies){if(_0x10f347(0xd5)!==_0x10f347(0xd5))this[_0x10f347(0x1c1)]=_0x3178cc;else{if(!Imported[_0xf64a66]){if(_0x10f347(0x1de)!==_0x10f347(0x1de))return this[_0x10f347(0x97)]||null;else{alert(_0x10f347(0x111)[_0x10f347(0x1f2)](_0x12277a,_0xf64a66)),SceneManager['exit']();break;}}}}const _0x17e08c=_0x5b4c7d[_0x10f347(0x1ba)];if(_0x17e08c[_0x10f347(0x1fb)](/\[Version[ ](.*?)\]/i)){if(_0x10f347(0x1b4)!==_0x10f347(0xb6)){const _0x136386=Number(RegExp['$1']);_0x136386!==VisuMZ[label][_0x10f347(0xaa)]&&(_0x10f347(0x123)!==_0x10f347(0x123)?this[_0x10f347(0x1ff)]=_0x375240[_0x10f347(0x1dc)](_0x12bc4c[_0x10f347(0x1b2)]):(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x10f347(0x1f2)](_0x12277a,_0x136386)),SceneManager[_0x10f347(0xa5)]()));}else _0x3c8597+=this[_0x10f347(0x151)](_0x10f347(0xd2),_0x3df2da);}if(_0x17e08c[_0x10f347(0x1fb)](/\[Tier[ ](\d+)\]/i)){if('zEPZX'==='zEPZX'){const _0x176fe6=Number(RegExp['$1']);_0x176fe6<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x10f347(0x1f2)](_0x12277a,_0x176fe6,tier)),SceneManager[_0x10f347(0xa5)]()):tier=Math[_0x10f347(0x11d)](_0x176fe6,tier);}else{if(this[_0x10f347(0xcd)]===_0x4e37d9)return;this['_item']=_0x2d7f8,this[_0x10f347(0xcd)]?this[_0x10f347(0xec)]():this['hide']();}}VisuMZ[_0x10f347(0xb5)](VisuMZ[label][_0x10f347(0x11b)],_0x5b4c7d['parameters']);})(pluginData),VisuMZ['EquipSetBonuses'][_0x576f25(0x126)]={'Set':/<(?:EQUIP|EQUIPMENT) SET:[ ](.*)>/gi,'SetFaceName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetFaceNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetFaceNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetCharaName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetCharaNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetCharaNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetBattlerName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetBattlerNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetBattlerNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetMenuPortrait':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetMenuPortraitPlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetMenuPortraitRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortrait':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortraitPlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortraitRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi},VisuMZ[_0x576f25(0x198)][_0x576f25(0x115)]=Scene_Boot[_0x576f25(0x19e)][_0x576f25(0xda)],Scene_Boot[_0x576f25(0x19e)][_0x576f25(0xda)]=function(){const _0x3ee8ed=_0x576f25;VisuMZ['EquipSetBonuses'][_0x3ee8ed(0x115)]['call'](this),this['process_VisuMZ_Template_Notetags']();},Scene_Boot[_0x576f25(0x19e)]['process_VisuMZ_Template_Notetags']=function(){const _0x4d7b00=_0x576f25;if(VisuMZ[_0x4d7b00(0xf5)])return;for(const _0x429ecb of $dataActors){if(!_0x429ecb)continue;ImageManager[_0x4d7b00(0x19b)](_0x429ecb);}},VisuMZ['EquipSetBonuses'][_0x576f25(0x1b3)]=VisuMZ['ParseActorNotetags'],VisuMZ[_0x576f25(0x1b3)]=function(_0x1d54bb){const _0x2ab134=_0x576f25;VisuMZ[_0x2ab134(0x198)]['ParseActorNotetags']['call'](this,_0x1d54bb),ImageManager[_0x2ab134(0x19b)](_0x1d54bb);},DataManager['getEquipSets']=function(_0x202625){const _0x34b208=_0x576f25;if(this[_0x34b208(0x138)](_0x202625)){if('AJLay'!=='AJLay')this[_0x34b208(0x167)]=_0xc92656,this['_priorityFaceIndex']=_0x20e55a;else return this[_0x34b208(0x197)]=this['_weaponEquipSets']||{},!this[_0x34b208(0x197)][_0x202625['id']]&&(this[_0x34b208(0x197)][_0x202625['id']]=VisuMZ[_0x34b208(0x198)][_0x34b208(0xb0)](_0x202625)),this[_0x34b208(0x197)][_0x202625['id']];}else{if(this[_0x34b208(0xe0)](_0x202625))return this[_0x34b208(0x103)]=this[_0x34b208(0x103)]||{},!this[_0x34b208(0x103)][_0x202625['id']]&&('BtSvU'!==_0x34b208(0xd7)?(_0x2eb8c3['EquipSetBonuses'][_0x34b208(0x1b3)][_0x34b208(0x18e)](this,_0x3a82e4),_0x3e9846[_0x34b208(0x19b)](_0xe96ac6)):this['_armorEquipSets'][_0x202625['id']]=VisuMZ['EquipSetBonuses'][_0x34b208(0xb0)](_0x202625)),this[_0x34b208(0x103)][_0x202625['id']];else{if(_0x34b208(0x1df)!==_0x34b208(0xe1))return[];else _0x202e61!==''?(this[_0x34b208(0x167)]=_0x305b8b,this['_priorityFaceIndex']=_0x70310b):(this[_0x34b208(0x167)]=_0x3878f8,this['_priorityFaceIndex']=_0x1284e7);}}},VisuMZ['EquipSetBonuses'][_0x576f25(0xb0)]=function(_0x4ad372){const _0x559d07=_0x576f25,_0x8e8a6d=VisuMZ[_0x559d07(0x198)]['RegExp'],_0x46feca=_0x4ad372['note'],_0x20d409=[],_0x5565af=_0x46feca[_0x559d07(0x1fb)](_0x8e8a6d[_0x559d07(0x106)]);if(_0x5565af)for(const _0x420097 of _0x5565af){_0x420097[_0x559d07(0x1fb)](_0x8e8a6d[_0x559d07(0x106)]);const _0x19352c=String(RegExp['$1'])[_0x559d07(0x1ad)]()[_0x559d07(0xb3)]();!!DataManager['getEquipSetData'](_0x19352c)&&_0x20d409['push'](_0x19352c);}return _0x20d409;},DataManager[_0x576f25(0x190)]=function(_0x526a51){const _0x240d10=_0x576f25;_0x526a51=_0x526a51[_0x240d10(0x1ad)]()[_0x240d10(0xb3)]();if(this['_equipSets']===undefined){this['_equipSets']={};const _0x2e66ef=VisuMZ[_0x240d10(0x198)][_0x240d10(0x11b)][_0x240d10(0xf0)];for(const _0x40cee8 of _0x2e66ef){const _0x447eee=_0x40cee8[_0x240d10(0x168)]['toUpperCase']()[_0x240d10(0xb3)]();if(_0x447eee==='')continue;if(_0x447eee==='UNTITLED')continue;this['_equipSets'][_0x447eee]=_0x40cee8;}}return this[_0x240d10(0x17e)][_0x526a51]||null;},ImageManager['actorEquipSetFaceName']={},ImageManager[_0x576f25(0xed)]={},ImageManager[_0x576f25(0x150)]={},ImageManager[_0x576f25(0xc2)]={},ImageManager['actorEquipSetBattlerName']={},ImageManager[_0x576f25(0xfb)]={},ImageManager[_0x576f25(0x155)]={},ImageManager[_0x576f25(0x19b)]=function(_0x1fd8a7){const _0x2ae522=_0x576f25;if(!_0x1fd8a7)return;const _0x18b1c7=VisuMZ[_0x2ae522(0x198)][_0x2ae522(0x126)],_0x555773=_0x1fd8a7[_0x2ae522(0x14e)],_0x4ee182=_0x1fd8a7['id'],_0x49ad9d=_0x555773['match'](_0x18b1c7['SetFaceName']);if(_0x49ad9d){if('uBiiI'!==_0x2ae522(0x1d8))for(const _0x127553 of _0x49ad9d){if(!_0x127553)continue;_0x127553['match'](_0x18b1c7[_0x2ae522(0x14a)]);const _0x3fb6c7=String(RegExp['$1'])[_0x2ae522(0x1ad)]()[_0x2ae522(0xb3)](),_0x19aaf9=Number(RegExp['$2'])||0x1,_0x1b07a9=String(RegExp['$3'])[_0x2ae522(0xb3)](),_0x1db957=Number(RegExp['$4']);if(!DataManager['getEquipSetData'](_0x3fb6c7))continue;const _0x5c6463='Actor-%1-SetName-%2-Pieces-%3'[_0x2ae522(0x1f2)](_0x4ee182,_0x3fb6c7,_0x19aaf9);ImageManager[_0x2ae522(0x1a1)][_0x5c6463]=_0x1b07a9,ImageManager['actorEquipSetFaceIndex'][_0x5c6463]=_0x1db957;}else _0x27a207['EquipSetBonuses'][_0x2ae522(0x12e)][_0x2ae522(0x18e)](this),this[_0x2ae522(0xa7)]();}const _0x16e958=_0x555773[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0xe9)]);if(_0x16e958)for(const _0x3aef1b of _0x16e958){if(!_0x3aef1b)continue;_0x3aef1b[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0xe9)]);const _0x60cbd4=String(RegExp['$1'])[_0x2ae522(0x1ad)]()['trim'](),_0x36bf3d=Number(RegExp['$2'])||0x1,_0x45da14=0x14,_0xa7a53f=String(RegExp['$3'])[_0x2ae522(0xb3)](),_0x1465c8=Number(RegExp['$4']);if(!DataManager[_0x2ae522(0x190)](_0x60cbd4))continue;for(let _0x37e923=_0x36bf3d;_0x37e923<=_0x45da14;_0x37e923++){const _0x550b7b=_0x2ae522(0x1c5)[_0x2ae522(0x1f2)](_0x4ee182,_0x60cbd4,_0x37e923);ImageManager[_0x2ae522(0x1a1)][_0x550b7b]=_0xa7a53f,ImageManager[_0x2ae522(0xed)][_0x550b7b]=_0x1465c8;}}const _0x29cc75=_0x555773['match'](_0x18b1c7[_0x2ae522(0x1c7)]);if(_0x29cc75){if(_0x2ae522(0x183)==='BOmdp')this[_0x2ae522(0xd0)]=_0x235ba4[_0x2ae522(0x13a)];else for(const _0x5e61e3 of _0x29cc75){if(!_0x5e61e3)continue;_0x5e61e3['match'](_0x18b1c7[_0x2ae522(0x1c7)]);const _0x107b56=String(RegExp['$1'])[_0x2ae522(0x1ad)]()['trim'](),_0x3449b6=Number(RegExp['$2'])||0x1,_0x15f602=Number(RegExp['$3'])||0x1,_0x4313b0=String(RegExp['$4'])[_0x2ae522(0xb3)](),_0xfec800=Number(RegExp['$5']);if(!DataManager['getEquipSetData'](_0x107b56))continue;for(let _0x23f2f8=_0x3449b6;_0x23f2f8<=_0x15f602;_0x23f2f8++){if(_0x2ae522(0x16b)!==_0x2ae522(0x16b))_0x2561de+=this['equipSetBonusParamPlus'](_0x2ae522(0x127),_0x542a60);else{const _0x4540d2=_0x2ae522(0x1c5)['format'](_0x4ee182,_0x107b56,_0x23f2f8);ImageManager[_0x2ae522(0x1a1)][_0x4540d2]=_0x4313b0,ImageManager[_0x2ae522(0xed)][_0x4540d2]=_0xfec800;}}}}const _0x4f92d1=_0x555773['match'](_0x18b1c7['SetCharaName']);if(_0x4f92d1)for(const _0x327425 of _0x4f92d1){if(!_0x327425)continue;_0x327425[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0xe2)]);const _0x4ab25f=String(RegExp['$1'])[_0x2ae522(0x1ad)]()[_0x2ae522(0xb3)](),_0x3233b3=Number(RegExp['$2'])||0x1,_0x27c36e=String(RegExp['$3'])[_0x2ae522(0xb3)](),_0x41d618=Number(RegExp['$4']);if(!DataManager[_0x2ae522(0x190)](_0x4ab25f))continue;const _0x2cb464=_0x2ae522(0x1c5)[_0x2ae522(0x1f2)](_0x4ee182,_0x4ab25f,_0x3233b3);ImageManager['actorEquipSetCharacterName'][_0x2cb464]=_0x27c36e,ImageManager[_0x2ae522(0xc2)][_0x2cb464]=_0x41d618;}const _0x2f5c0c=_0x555773['match'](_0x18b1c7['SetCharaNamePlus']);if(_0x2f5c0c){if(_0x2ae522(0xa1)===_0x2ae522(0xa1))for(const _0x3de08f of _0x2f5c0c){if(_0x2ae522(0x1c3)===_0x2ae522(0x1c0))this['_equipSetBonusTooltipWindow']&&this['_equipSetBonusTooltipWindow'][_0x2ae522(0xca)]();else{if(!_0x3de08f)continue;_0x3de08f['match'](_0x18b1c7[_0x2ae522(0x16d)]);const _0x9fce=String(RegExp['$1'])[_0x2ae522(0x1ad)]()[_0x2ae522(0xb3)](),_0x1756bf=Number(RegExp['$2'])||0x1,_0x355c83=0x14,_0x270b08=String(RegExp['$3'])[_0x2ae522(0xb3)](),_0x3a9396=Number(RegExp['$4']);if(!DataManager[_0x2ae522(0x190)](_0x9fce))continue;for(let _0x52c47f=_0x1756bf;_0x52c47f<=_0x355c83;_0x52c47f++){const _0xf3aaae=_0x2ae522(0x1c5)['format'](_0x4ee182,_0x9fce,_0x52c47f);ImageManager[_0x2ae522(0x150)][_0xf3aaae]=_0x270b08,ImageManager[_0x2ae522(0xc2)][_0xf3aaae]=_0x3a9396;}}}else this[_0x2ae522(0x1cf)]['refresh']();}const _0x45aca6=_0x555773[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0x146)]);if(_0x45aca6)for(const _0x4f538a of _0x45aca6){if(_0x2ae522(0x1c6)!==_0x2ae522(0x1c6))this['_priorityBattlePortrait']=_0x57b7ea;else{if(!_0x4f538a)continue;_0x4f538a[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0x146)]);const _0x52d3e9=String(RegExp['$1'])[_0x2ae522(0x1ad)]()[_0x2ae522(0xb3)](),_0x4819be=Number(RegExp['$2'])||0x1,_0x37fce6=Number(RegExp['$3'])||0x1,_0xbaf33d=String(RegExp['$4'])['trim'](),_0x3472a2=Number(RegExp['$5']);if(!DataManager[_0x2ae522(0x190)](_0x52d3e9))continue;for(let _0x82c815=_0x4819be;_0x82c815<=_0x37fce6;_0x82c815++){const _0x4dd573=_0x2ae522(0x1c5)[_0x2ae522(0x1f2)](_0x4ee182,_0x52d3e9,_0x82c815);ImageManager[_0x2ae522(0x150)][_0x4dd573]=_0xbaf33d,ImageManager[_0x2ae522(0xc2)][_0x4dd573]=_0x3472a2;}}}const _0x2f6410=_0x555773[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0x1e0)]);if(_0x2f6410){if(_0x2ae522(0x1b9)!=='tyqLg')for(const _0x51cc54 of _0x2f6410){if(!_0x51cc54)continue;_0x51cc54['match'](_0x18b1c7['SetBattlerName']);const _0x4d8d3a=String(RegExp['$1'])['toUpperCase']()[_0x2ae522(0xb3)](),_0xdef950=Number(RegExp['$2'])||0x1,_0x869a37=String(RegExp['$3'])['trim']();if(!DataManager[_0x2ae522(0x190)](_0x4d8d3a))continue;const _0x5ff37c='Actor-%1-SetName-%2-Pieces-%3'[_0x2ae522(0x1f2)](_0x4ee182,_0x4d8d3a,_0xdef950);ImageManager['actorEquipSetBattlerName'][_0x5ff37c]=_0x869a37;}else{_0x4631a2[_0x2ae522(0x1fb)](_0x5e094c[_0x2ae522(0x106)]);const _0x4d1123=_0x43c8b2(_0x5c9aa0['$1'])[_0x2ae522(0x1ad)]()[_0x2ae522(0xb3)]();!!_0x23b1e4[_0x2ae522(0x190)](_0x4d1123)&&_0x21a57d[_0x2ae522(0xa6)](_0x4d1123);}}const _0x2f8078=_0x555773['match'](_0x18b1c7[_0x2ae522(0x1a5)]);if(_0x2f8078){if(_0x2ae522(0x128)!==_0x2ae522(0xc8))for(const _0x5aca39 of _0x2f8078){if(!_0x5aca39)continue;_0x5aca39[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0x1a5)]);const _0x277282=String(RegExp['$1'])[_0x2ae522(0x1ad)]()[_0x2ae522(0xb3)](),_0xb8bbd6=Number(RegExp['$2'])||0x1,_0x56e421=0x14,_0x531c60=String(RegExp['$3'])['trim']();if(!DataManager[_0x2ae522(0x190)](_0x277282))continue;for(let _0x556252=_0xb8bbd6;_0x556252<=_0x56e421;_0x556252++){if(_0x2ae522(0xbc)===_0x2ae522(0xbc)){const _0x5ad214=_0x2ae522(0x1c5)[_0x2ae522(0x1f2)](_0x4ee182,_0x277282,_0x556252);ImageManager[_0x2ae522(0x179)][_0x5ad214]=_0x531c60;}else{const _0x36a637=_0x2ae522(0xac)['format'](_0x3e0aff);if(_0x2b21c2[_0x36a637]&&_0x378137[_0x36a637][_0x2ae522(0x195)])for(const _0x2e02a3 of _0x39fe43[_0x36a637][_0x2ae522(0x195)]){_0x41823a['push'](_0x2e02a3);}}}}else this[_0x2ae522(0x192)]=_0x261b42;}const _0x3029a7=_0x555773[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0x14c)]);if(_0x3029a7)for(const _0x43d97f of _0x3029a7){if(!_0x43d97f)continue;_0x43d97f['match'](_0x18b1c7['SetBattlerNameRange']);const _0x3db7bb=String(RegExp['$1'])[_0x2ae522(0x1ad)]()['trim'](),_0x398f04=Number(RegExp['$2'])||0x1,_0x540e83=Number(RegExp['$3'])||0x1,_0x525c6c=String(RegExp['$4'])['trim']();if(!DataManager[_0x2ae522(0x190)](_0x3db7bb))continue;for(let _0x24a901=_0x398f04;_0x24a901<=_0x540e83;_0x24a901++){const _0x388741=_0x2ae522(0x1c5)[_0x2ae522(0x1f2)](_0x4ee182,_0x3db7bb,_0x24a901);ImageManager[_0x2ae522(0x179)][_0x388741]=_0x525c6c;}}const _0x2c86de=_0x555773[_0x2ae522(0x1fb)](_0x18b1c7['SetMenuPortrait']);if(_0x2c86de)for(const _0x508d37 of _0x2c86de){if(!_0x508d37)continue;_0x508d37[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0x18f)]);const _0xdae4e=String(RegExp['$1'])['toUpperCase']()[_0x2ae522(0xb3)](),_0x11b0e9=Number(RegExp['$2'])||0x1,_0x18cd53=String(RegExp['$3'])[_0x2ae522(0xb3)]();if(!DataManager[_0x2ae522(0x190)](_0xdae4e))continue;const _0x4e5ad0=_0x2ae522(0x1c5)['format'](_0x4ee182,_0xdae4e,_0x11b0e9);ImageManager[_0x2ae522(0xfb)][_0x4e5ad0]=_0x18cd53;}const _0x5b99dd=_0x555773[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0x184)]);if(_0x5b99dd)for(const _0x628fca of _0x5b99dd){if(!_0x628fca)continue;_0x628fca[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0x184)]);const _0xfebbf3=String(RegExp['$1'])[_0x2ae522(0x1ad)]()[_0x2ae522(0xb3)](),_0x4213bd=Number(RegExp['$2'])||0x1,_0x58cb84=0x14,_0x5a7530=String(RegExp['$3'])[_0x2ae522(0xb3)]();if(!DataManager[_0x2ae522(0x190)](_0xfebbf3))continue;for(let _0x4d0cf1=_0x4213bd;_0x4d0cf1<=_0x58cb84;_0x4d0cf1++){const _0x3e55c1='Actor-%1-SetName-%2-Pieces-%3'[_0x2ae522(0x1f2)](_0x4ee182,_0xfebbf3,_0x4d0cf1);ImageManager[_0x2ae522(0xfb)][_0x3e55c1]=_0x5a7530;}}const _0x19bde1=_0x555773[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0x130)]);if(_0x19bde1)for(const _0x8a1ce0 of _0x19bde1){if('VUPrW'!==_0x2ae522(0x99)){if(!_0x261853||!_0x8aaaba||!_0x57bf6a)return _0x1152f5;const _0x15150d='Actor-%1-SetName-%2-Pieces-%3'[_0x2ae522(0x1f2)](_0x163390[_0x2ae522(0x9d)](),_0x221a6a['toUpperCase']()[_0x2ae522(0xb3)](),_0x57cfed);return _0x49df58[_0x2ae522(0xed)][_0x15150d]||_0x4f88b7;}else{if(!_0x8a1ce0)continue;_0x8a1ce0[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0x130)]);const _0x5f27fc=String(RegExp['$1'])['toUpperCase']()[_0x2ae522(0xb3)](),_0x3f8212=Number(RegExp['$2'])||0x1,_0x1238f0=Number(RegExp['$3'])||0x1,_0x3b0657=String(RegExp['$4'])[_0x2ae522(0xb3)]();if(!DataManager['getEquipSetData'](_0x5f27fc))continue;for(let _0x520381=_0x3f8212;_0x520381<=_0x1238f0;_0x520381++){const _0x1d5333='Actor-%1-SetName-%2-Pieces-%3'[_0x2ae522(0x1f2)](_0x4ee182,_0x5f27fc,_0x520381);ImageManager[_0x2ae522(0xfb)][_0x1d5333]=_0x3b0657;}}}const _0x106f58=_0x555773['match'](_0x18b1c7[_0x2ae522(0x94)]);if(_0x106f58)for(const _0x50280e of _0x106f58){if(_0x2ae522(0x135)!==_0x2ae522(0xff)){if(!_0x50280e)continue;_0x50280e[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0x94)]);const _0x16049e=String(RegExp['$1'])[_0x2ae522(0x1ad)]()[_0x2ae522(0xb3)](),_0x4498ca=Number(RegExp['$2'])||0x1,_0x3a6f14=String(RegExp['$3'])[_0x2ae522(0xb3)]();if(!DataManager[_0x2ae522(0x190)](_0x16049e))continue;const _0x265d19='Actor-%1-SetName-%2-Pieces-%3'[_0x2ae522(0x1f2)](_0x4ee182,_0x16049e,_0x4498ca);ImageManager[_0x2ae522(0x155)][_0x265d19]=_0x3a6f14;}else{let _0x402556=_0x5a68ac[_0x2ae522(0x198)][_0x2ae522(0x165)][_0x2ae522(0x18e)](this,_0x20afc1);return _0x56ce08[_0x2ae522(0x16c)]===_0x2ae522(0xb2)&&(_0x402556+=this[_0x2ae522(0x151)](_0x2ae522(0x12d),_0x1b2cc8)),_0x402556;}}const _0x241f54=_0x555773[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0x94)]);if(_0x241f54)for(const _0x5abb5d of _0x241f54){if(_0x2ae522(0xf1)!==_0x2ae522(0xf1)){const _0x11c0de=this[_0x2ae522(0x12f)](_0x3794f4),_0x31891e=_0x585a3d[_0x2ae522(0x100)](this,_0x5f1dd3,_0x11c0de);if(_0x31891e!==_0xe69837)return _0x31891e;}else{if(!_0x5abb5d)continue;_0x5abb5d[_0x2ae522(0x1fb)](_0x18b1c7['SetBattlePortrait']);const _0xd9169a=String(RegExp['$1'])[_0x2ae522(0x1ad)]()[_0x2ae522(0xb3)](),_0x1366d2=Number(RegExp['$2'])||0x1,_0x44e030=0x14,_0x3bb0b1=String(RegExp['$3'])[_0x2ae522(0xb3)]();if(!DataManager[_0x2ae522(0x190)](_0xd9169a))continue;for(let _0x1170cc=_0x1366d2;_0x1170cc<=_0x44e030;_0x1170cc++){const _0x896777=_0x2ae522(0x1c5)['format'](_0x4ee182,_0xd9169a,_0x1170cc);ImageManager[_0x2ae522(0x155)][_0x896777]=_0x3bb0b1;}}}const _0x520706=_0x555773[_0x2ae522(0x1fb)](_0x18b1c7[_0x2ae522(0x1e9)]);if(_0x520706)for(const _0x471ee0 of _0x520706){if(!_0x471ee0)continue;_0x471ee0['match'](_0x18b1c7[_0x2ae522(0x1e9)]);const _0x24f231=String(RegExp['$1'])[_0x2ae522(0x1ad)]()[_0x2ae522(0xb3)](),_0x1e6fd7=Number(RegExp['$2'])||0x1,_0x4a014b=Number(RegExp['$3'])||0x1,_0x252059=String(RegExp['$4'])[_0x2ae522(0xb3)]();if(!DataManager[_0x2ae522(0x190)](_0x24f231))continue;for(let _0x2c46eb=_0x1e6fd7;_0x2c46eb<=_0x4a014b;_0x2c46eb++){if(_0x2ae522(0x209)===_0x2ae522(0x114))_0x3df975['EquipSetBonuses'][_0x2ae522(0x1fa)]['call'](this),this['hideEquipSetBonusTooltipWindow']();else{const _0x186882=_0x2ae522(0x1c5)[_0x2ae522(0x1f2)](_0x4ee182,_0x24f231,_0x2c46eb);ImageManager['actorEquipSetBattlePortrait'][_0x186882]=_0x252059;}}}},ImageManager['getActorEquipSetFaceName']=function(_0x57133e,_0x18a2ee,_0x4ca9ab){const _0xabf919=_0x576f25;if(!_0x57133e||!_0x18a2ee||!_0x4ca9ab)return'';const _0x5cb64e='Actor-%1-SetName-%2-Pieces-%3'[_0xabf919(0x1f2)](_0x57133e[_0xabf919(0x9d)](),_0x18a2ee['toUpperCase']()[_0xabf919(0xb3)](),_0x4ca9ab);return ImageManager[_0xabf919(0x1a1)][_0x5cb64e]||'';},ImageManager['getActorEquipSetFaceIndex']=function(_0x509c09,_0x42ead5,_0x5f3416){const _0x1b21af=_0x576f25;if(!_0x509c09||!_0x42ead5||!_0x5f3416)return undefined;const _0x5677e8=_0x1b21af(0x1c5)[_0x1b21af(0x1f2)](_0x509c09['actorId'](),_0x42ead5['toUpperCase']()[_0x1b21af(0xb3)](),_0x5f3416);return ImageManager[_0x1b21af(0xed)][_0x5677e8]||undefined;},ImageManager['getActorEquipSetCharacterName']=function(_0x502917,_0x174169,_0x5417e6){const _0xb1f5d1=_0x576f25;if(!_0x502917||!_0x174169||!_0x5417e6)return'';const _0x341cbb=_0xb1f5d1(0x1c5)[_0xb1f5d1(0x1f2)](_0x502917[_0xb1f5d1(0x9d)](),_0x174169['toUpperCase']()['trim'](),_0x5417e6);return ImageManager[_0xb1f5d1(0x150)][_0x341cbb]||'';},ImageManager['getActorEquipSetCharacterIndex']=function(_0x3ae286,_0x34bb39,_0x65b384){const _0x505037=_0x576f25;if(!_0x3ae286||!_0x34bb39||!_0x65b384)return undefined;const _0x2a208c=_0x505037(0x1c5)[_0x505037(0x1f2)](_0x3ae286[_0x505037(0x9d)](),_0x34bb39['toUpperCase']()[_0x505037(0xb3)](),_0x65b384);return ImageManager[_0x505037(0xc2)][_0x2a208c]||undefined;},ImageManager[_0x576f25(0x157)]=function(_0x25ebbc,_0x3414b2,_0x3f4310){const _0x5754ad=_0x576f25;if(!_0x25ebbc||!_0x3414b2||!_0x3f4310)return'';const _0x3bd88e='Actor-%1-SetName-%2-Pieces-%3'[_0x5754ad(0x1f2)](_0x25ebbc[_0x5754ad(0x9d)](),_0x3414b2['toUpperCase']()[_0x5754ad(0xb3)](),_0x3f4310);return ImageManager[_0x5754ad(0x179)][_0x3bd88e]||'';},ImageManager[_0x576f25(0x102)]=function(_0x18a3c3,_0x4453a4,_0x2c2783){const _0x4155c2=_0x576f25;if(!_0x18a3c3||!_0x4453a4||!_0x2c2783)return'';const _0x345219='Actor-%1-SetName-%2-Pieces-%3'[_0x4155c2(0x1f2)](_0x18a3c3[_0x4155c2(0x9d)](),_0x4453a4[_0x4155c2(0x1ad)]()[_0x4155c2(0xb3)](),_0x2c2783);return ImageManager['actorEquipSetMenuPortrait'][_0x345219]||'';},ImageManager[_0x576f25(0x148)]=function(_0x36e6ee,_0x1ef01f,_0x11e092){const _0x336d86=_0x576f25;if(!_0x36e6ee||!_0x1ef01f||!_0x11e092)return'';const _0x44dd64=_0x336d86(0x1c5)['format'](_0x36e6ee[_0x336d86(0x9d)](),_0x1ef01f[_0x336d86(0x1ad)]()['trim'](),_0x11e092);return ImageManager[_0x336d86(0x155)][_0x44dd64]||'';},TextManager['equipSetTitleFmt']=VisuMZ[_0x576f25(0x198)][_0x576f25(0x11b)][_0x576f25(0x116)]['SetTitleFmt'],TextManager['equipSetPieceFmt']=VisuMZ[_0x576f25(0x198)][_0x576f25(0x11b)]['Tooltip'][_0x576f25(0x110)],TextManager[_0x576f25(0x163)]=VisuMZ[_0x576f25(0x198)][_0x576f25(0x11b)][_0x576f25(0x116)][_0x576f25(0x162)],TextManager[_0x576f25(0x134)]=VisuMZ[_0x576f25(0x198)][_0x576f25(0x11b)][_0x576f25(0x116)][_0x576f25(0x19d)],TextManager['equipSetRate']=VisuMZ['EquipSetBonuses'][_0x576f25(0x11b)][_0x576f25(0x116)]['RateFmt'],TextManager[_0x576f25(0xe6)]=VisuMZ[_0x576f25(0x198)][_0x576f25(0x11b)][_0x576f25(0x116)][_0x576f25(0x10b)],TextManager['equipSetPlusNeg']=VisuMZ[_0x576f25(0x198)][_0x576f25(0x11b)]['Tooltip'][_0x576f25(0x1e5)],SceneManager[_0x576f25(0x136)]=function(){const _0x200d5d=_0x576f25,_0x57983f=this[_0x200d5d(0x14b)];if(!_0x57983f)return;const _0x4f5f5b=_0x57983f[_0x200d5d(0x1cf)];if(_0x4f5f5b)_0x4f5f5b[_0x200d5d(0xec)]();},Game_BattlerBase[_0x576f25(0x16c)]=VisuMZ[_0x576f25(0x198)][_0x576f25(0x11b)]['Mechanics'][_0x576f25(0x14d)],Game_BattlerBase[_0x576f25(0x207)]=VisuMZ[_0x576f25(0x198)]['Settings'][_0x576f25(0x1d0)]['XParamAdd'],Game_BattlerBase[_0x576f25(0x11e)]=VisuMZ[_0x576f25(0x198)][_0x576f25(0x11b)][_0x576f25(0x1d0)][_0x576f25(0x1f1)],Game_BattlerBase['prototype']['equipSetBonusParamPlus']=function(_0x246247,_0x23c93f){return 0x0;},Game_BattlerBase['prototype'][_0x576f25(0x129)]=function(_0x16ab78,_0x291f0f){return 0x1;},VisuMZ[_0x576f25(0x198)]['Game_BattlerBase_paramPlus']=Game_BattlerBase[_0x576f25(0x19e)]['paramPlus'],Game_BattlerBase[_0x576f25(0x19e)][_0x576f25(0x1da)]=function(_0x2e0123){const _0x101cf8=_0x576f25;let _0x57e25f=VisuMZ[_0x101cf8(0x198)][_0x101cf8(0x165)][_0x101cf8(0x18e)](this,_0x2e0123);return Game_BattlerBase[_0x101cf8(0x16c)]==='plus'&&(_0x57e25f+=this[_0x101cf8(0x151)](_0x101cf8(0x12d),_0x2e0123)),_0x57e25f;},VisuMZ[_0x576f25(0x198)][_0x576f25(0x1cc)]=Game_BattlerBase[_0x576f25(0x19e)][_0x576f25(0x1b6)],Game_BattlerBase['prototype']['paramRate']=function(_0x3e40bc){const _0x4ac113=_0x576f25;let _0x18bda3=VisuMZ[_0x4ac113(0x198)][_0x4ac113(0x1cc)][_0x4ac113(0x18e)](this,_0x3e40bc);return _0x18bda3*this[_0x4ac113(0x129)](_0x4ac113(0x12d),_0x3e40bc);},VisuMZ['EquipSetBonuses'][_0x576f25(0x1a6)]=Game_BattlerBase[_0x576f25(0x19e)][_0x576f25(0x18a)],Game_BattlerBase['prototype'][_0x576f25(0x18a)]=function(_0x3bc2b9){const _0x3ec04c=_0x576f25;let _0x192731=VisuMZ['EquipSetBonuses']['Game_BattlerBase_paramFlatBonus'][_0x3ec04c(0x18e)](this,_0x3bc2b9);return Game_BattlerBase[_0x3ec04c(0x16c)]===_0x3ec04c(0x13d)&&(_0x192731+=this['equipSetBonusParamPlus'](_0x3ec04c(0x12d),_0x3bc2b9)),_0x192731;},VisuMZ['EquipSetBonuses'][_0x576f25(0x139)]=Game_BattlerBase[_0x576f25(0x19e)][_0x576f25(0xdc)],Game_BattlerBase['prototype'][_0x576f25(0xdc)]=function(_0xc3e30d){const _0x3948f7=_0x576f25;let _0x51ea1a=VisuMZ[_0x3948f7(0x198)][_0x3948f7(0x139)][_0x3948f7(0x18e)](this,_0xc3e30d);if(Game_BattlerBase[_0x3948f7(0x207)]==='plus'){if(_0x3948f7(0x172)===_0x3948f7(0x172))_0x51ea1a+=this[_0x3948f7(0x151)](_0x3948f7(0x127),_0xc3e30d);else{if(this[_0x3948f7(0x105)]!==_0x51e64b)return this[_0x3948f7(0x105)];const _0x5336ef=this[_0x3948f7(0xdb)]();for(const _0xc3a9bd of _0x5336ef){const _0x49ad3d=this[_0x3948f7(0x12f)](_0xc3a9bd),_0x1d4b08=_0x57bfa1[_0x3948f7(0x170)](this,_0xc3a9bd,_0x49ad3d);if(_0x1d4b08)return _0x1d4b08;}return _0xb37ba2[_0x3948f7(0x198)]['Game_Actor_characterName'][_0x3948f7(0x18e)](this);}}return _0x51ea1a;},VisuMZ[_0x576f25(0x198)][_0x576f25(0x1ea)]=Game_BattlerBase[_0x576f25(0x19e)][_0x576f25(0x1ec)],Game_BattlerBase[_0x576f25(0x19e)][_0x576f25(0x1ec)]=function(_0x335d17){const _0x311ea2=_0x576f25;let _0xb70280=VisuMZ[_0x311ea2(0x198)][_0x311ea2(0x1ea)][_0x311ea2(0x18e)](this,_0x335d17);return _0xb70280*this[_0x311ea2(0x129)](_0x311ea2(0x127),_0x335d17);},VisuMZ['EquipSetBonuses'][_0x576f25(0x120)]=Game_BattlerBase[_0x576f25(0x19e)]['xparamFlatBonus'],Game_BattlerBase[_0x576f25(0x19e)][_0x576f25(0x1a4)]=function(_0x35073d){const _0x8f9c66=_0x576f25;let _0x33b4e6=VisuMZ[_0x8f9c66(0x198)][_0x8f9c66(0x120)][_0x8f9c66(0x18e)](this,_0x35073d);return Game_BattlerBase['EQUIP_SET_X_PARAM_PLUS_FLAT']===_0x8f9c66(0x13d)&&(_0x33b4e6+=this[_0x8f9c66(0x151)](_0x8f9c66(0x127),_0x35073d)),_0x33b4e6;},VisuMZ[_0x576f25(0x198)][_0x576f25(0xb4)]=Game_BattlerBase[_0x576f25(0x19e)]['sparamPlus'],Game_BattlerBase['prototype'][_0x576f25(0x1e4)]=function(_0x3bef95){const _0x1dc575=_0x576f25;let _0x2ec492=VisuMZ['EquipSetBonuses']['Game_BattlerBase_sparamPlus']['call'](this,_0x3bef95);return Game_BattlerBase['EQUIP_SET_S_PARAM_PLUS_FLAT']===_0x1dc575(0xb2)&&(_0x2ec492+=this[_0x1dc575(0x151)](_0x1dc575(0xd2),_0x3bef95)),_0x2ec492;},VisuMZ['EquipSetBonuses']['Game_BattlerBase_sparamRate']=Game_BattlerBase[_0x576f25(0x19e)][_0x576f25(0x180)],Game_BattlerBase['prototype'][_0x576f25(0x180)]=function(_0x4c317f){const _0x941f6e=_0x576f25;let _0x463783=VisuMZ[_0x941f6e(0x198)][_0x941f6e(0x10f)][_0x941f6e(0x18e)](this,_0x4c317f);return _0x463783*this[_0x941f6e(0x129)]('SParam',_0x4c317f);},VisuMZ['EquipSetBonuses'][_0x576f25(0x1d9)]=Game_BattlerBase[_0x576f25(0x19e)]['sparamFlatBonus'],Game_BattlerBase[_0x576f25(0x19e)][_0x576f25(0x18c)]=function(_0x54e6af){const _0x137aed=_0x576f25;let _0x15e1a6=VisuMZ[_0x137aed(0x198)][_0x137aed(0x1d9)][_0x137aed(0x18e)](this,_0x54e6af);if(Game_BattlerBase[_0x137aed(0x11e)]===_0x137aed(0x13d)){if(_0x137aed(0x185)==='ZTOSL'){const _0x3b65bd=this['textSizeEx'](this[_0x137aed(0x206)]);this['width']=_0x3b65bd['width']+(this[_0x137aed(0xbd)]()+this['padding'])*0x2,this[_0x137aed(0x205)]=_0x3b65bd[_0x137aed(0x205)]+this[_0x137aed(0x15e)]*0x2,this[_0x137aed(0xea)](),this[_0x137aed(0x1f3)]();}else _0x15e1a6+=this[_0x137aed(0x151)](_0x137aed(0xd2),_0x54e6af);}return _0x15e1a6;},VisuMZ[_0x576f25(0x198)][_0x576f25(0x1c2)]=Game_BattlerBase[_0x576f25(0x19e)]['addPassiveStatesFromOtherPlugins'],Game_BattlerBase['prototype'][_0x576f25(0x17d)]=function(){const _0x39586b=_0x576f25;VisuMZ['EquipSetBonuses'][_0x39586b(0x1c2)]['call'](this),this[_0x39586b(0x1a0)]();},Game_BattlerBase[_0x576f25(0x19e)][_0x576f25(0x1a0)]=function(){},VisuMZ[_0x576f25(0x198)][_0x576f25(0x1fd)]=Game_Actor[_0x576f25(0x19e)]['setup'],Game_Actor[_0x576f25(0x19e)][_0x576f25(0xfd)]=function(_0x2e7584){const _0x8707b=_0x576f25;VisuMZ[_0x8707b(0x198)][_0x8707b(0x1fd)][_0x8707b(0x18e)](this,_0x2e7584),this['refreshEquipSetBonuses']();},VisuMZ[_0x576f25(0x198)][_0x576f25(0x1d5)]=Game_Actor[_0x576f25(0x19e)][_0x576f25(0x1ed)],Game_Actor[_0x576f25(0x19e)]['releaseUnequippableItems']=function(_0x3384d3){const _0x48dbc2=_0x576f25;VisuMZ['EquipSetBonuses'][_0x48dbc2(0x1d5)][_0x48dbc2(0x18e)](this,_0x3384d3),this[_0x48dbc2(0x13e)]();},Game_Actor[_0x576f25(0x19e)][_0x576f25(0x1a8)]=function(_0x1a4485){const _0x4ba430=_0x576f25;(this['_equipSetBonusSets']===undefined||this[_0x4ba430(0xfe)]===undefined)&&(_0x4ba430(0x1ef)===_0x4ba430(0x1ef)?this[_0x4ba430(0x13e)]():(_0x422349[_0x4ba430(0x19e)][_0x4ba430(0x101)][_0x4ba430(0x18e)](this),this[_0x4ba430(0xdd)]&&(this[_0x4ba430(0xdd)]=![],this[_0x4ba430(0x119)]()),this[_0x4ba430(0x95)]()));},Game_Actor[_0x576f25(0x19e)][_0x576f25(0x13e)]=function(){const _0x121b68=_0x576f25;this[_0x121b68(0xb8)](),this[_0x121b68(0x1b0)]();if(this['_tempActor'])return;SceneManager[_0x121b68(0x136)]();},Game_Actor['prototype']['clearEquipSetBonusCache']=function(){const _0x4b8011=_0x576f25;this[_0x4b8011(0x178)]=[],this[_0x4b8011(0xfe)]={};},Game_Actor[_0x576f25(0x19e)][_0x576f25(0x1b0)]=function(){const _0x122e38=_0x576f25;for(const _0x2f8313 of this[_0x122e38(0x194)]()){if(!_0x2f8313)continue;const _0x21c13c=DataManager[_0x122e38(0x1ce)](_0x2f8313);for(const _0x25028e of _0x21c13c){!this[_0x122e38(0x178)][_0x122e38(0xd4)](_0x25028e)&&(_0x122e38(0x189)!==_0x122e38(0x189)?_0x126181+=this[_0x122e38(0x151)]('Param',_0x25b93e):this['_equipSetBonusSets'][_0x122e38(0xa6)](_0x25028e)),this[_0x122e38(0xfe)][_0x25028e]=this[_0x122e38(0xfe)][_0x25028e]||0x0,this[_0x122e38(0xfe)][_0x25028e]++;}}},Game_Actor[_0x576f25(0x19e)][_0x576f25(0x1ce)]=function(){const _0x5c81c3=_0x576f25;return this[_0x5c81c3(0x1a8)](),this[_0x5c81c3(0x178)];},Game_Actor['prototype'][_0x576f25(0x12f)]=function(_0x4bdeb9){const _0x415bbf=_0x576f25;return this[_0x415bbf(0x1a8)](),_0x4bdeb9=_0x4bdeb9[_0x415bbf(0x1ad)]()[_0x415bbf(0xb3)](),(this['_equipSetBonusCount'][_0x4bdeb9]||0x0)['clamp'](0x0,0x14);},Game_Actor[_0x576f25(0x19e)]['getEquipSetsSortedByMostPieces']=function(){const _0x3276e0=_0x576f25;let _0x2e57ad=this[_0x3276e0(0x1ce)]()['clone']();return _0x2e57ad[_0x3276e0(0x16f)]((_0x40a66c,_0x155b4a)=>{const _0xb66bdd=_0x3276e0,_0x1d13c6=this[_0xb66bdd(0x12f)](_0x40a66c),_0x2e6fc9=this['getEquipSetPieces'](_0x155b4a);if(_0x1d13c6!==_0x2e6fc9)return _0x2e6fc9-_0x1d13c6;return 0x0;}),_0x2e57ad;},Game_Actor[_0x576f25(0x19e)][_0x576f25(0x151)]=function(_0x2c887d,_0x3fe4ec){const _0x2c042d=_0x576f25;this['checkRefreshEquipSetBonuses']();let _0x481ab5=0x0;for(const _0x2f579d of this[_0x2c042d(0x1ce)]()){const _0x55915c=DataManager[_0x2c042d(0x190)](_0x2f579d);if(!_0x55915c)continue;const _0x108c78=this[_0x2c042d(0x12f)](_0x2f579d);for(let _0x33c2b3=0x1;_0x33c2b3<=_0x108c78;_0x33c2b3++){const _0x3086f0=_0x2c042d(0xac)[_0x2c042d(0x1f2)](_0x33c2b3);if(_0x55915c[_0x3086f0]&&_0x55915c[_0x3086f0][_0x2c887d]){const _0x5c32d7=_0x2c042d(0xe5)[_0x2c042d(0x1f2)](_0x3fe4ec);_0x481ab5+=_0x55915c[_0x3086f0][_0x2c887d][_0x5c32d7]||0x0;}}}return _0x481ab5;},Game_Actor[_0x576f25(0x19e)]['equipSetBonusParamRate']=function(_0x257f5b,_0x370ebc){const _0x25baf0=_0x576f25;this[_0x25baf0(0x1a8)]();let _0x235525=0x1;for(const _0x40a1eb of this[_0x25baf0(0x1ce)]()){const _0x2f6488=DataManager[_0x25baf0(0x190)](_0x40a1eb);if(!_0x2f6488)continue;const _0x18bdd9=this[_0x25baf0(0x12f)](_0x40a1eb);for(let _0x185d9a=0x1;_0x185d9a<=_0x18bdd9;_0x185d9a++){const _0x128864=_0x25baf0(0xac)['format'](_0x185d9a);if(_0x2f6488[_0x128864]&&_0x2f6488[_0x128864][_0x257f5b]){if(_0x25baf0(0xbe)==='VPxiH'){let _0x22c51d=_0x53e040[_0x25baf0(0x198)][_0x25baf0(0x1a6)]['call'](this,_0x3471ee);return _0x5d964d[_0x25baf0(0x16c)]===_0x25baf0(0x13d)&&(_0x22c51d+=this[_0x25baf0(0x151)](_0x25baf0(0x12d),_0x29ad7c)),_0x22c51d;}else{const _0x1bda1c=_0x25baf0(0xa4)['format'](_0x370ebc);_0x235525*=Math['abs'](_0x2f6488[_0x128864][_0x257f5b][_0x1bda1c]||0x1);}}}}return _0x235525;},Game_Actor[_0x576f25(0x19e)][_0x576f25(0x1a0)]=function(){const _0xe29844=_0x576f25;this[_0xe29844(0x1a8)]();const _0x5d9959=this[_0xe29844(0x20b)][_0xe29844(0xb9)];for(const _0x210b42 of this[_0xe29844(0x1ce)]()){if(_0xe29844(0xd3)===_0xe29844(0x9f))this['_equipSetBonusTooltipWindow']&&this[_0xe29844(0x1cf)]['refresh']();else{const _0x2eb686=DataManager[_0xe29844(0x190)](_0x210b42);if(!_0x2eb686)continue;const _0x1919ca=this[_0xe29844(0x12f)](_0x210b42);for(let _0x4a2223=0x1;_0x4a2223<=_0x1919ca;_0x4a2223++){if('xhmoP'===_0xe29844(0x9b)){if(!_0x88ee2c||!_0x2410de||!_0xd0f66e)return'';const _0x71d62f='Actor-%1-SetName-%2-Pieces-%3'[_0xe29844(0x1f2)](_0x6edee3['actorId'](),_0x2a63b1['toUpperCase']()['trim'](),_0xa8fff8);return _0x358620[_0xe29844(0x155)][_0x71d62f]||'';}else{const _0x10063b=_0xe29844(0xac)[_0xe29844(0x1f2)](_0x4a2223);if(_0x2eb686[_0x10063b]&&_0x2eb686[_0x10063b][_0xe29844(0x195)]){if(_0xe29844(0xc0)===_0xe29844(0xbf)){const _0x3d5e51=_0xe29844(0x1c5)['format'](_0x4ac73d,_0x2db844,_0x2e75bb);_0x4f791a[_0xe29844(0x1a1)][_0x3d5e51]=_0x28fc27,_0x2a15e2[_0xe29844(0xed)][_0x3d5e51]=_0x2ea1c8;}else for(const _0x5de948 of _0x2eb686[_0x10063b][_0xe29844(0x195)]){_0x5d9959['push'](_0x5de948);}}}}}}},VisuMZ['EquipSetBonuses']['Game_Actor_setFaceImage']=Game_Actor[_0x576f25(0x19e)]['setFaceImage'],Game_Actor[_0x576f25(0x19e)]['setFaceImage']=function(_0x12b134,_0x46b98d){const _0x1ff77f=_0x576f25;if(_0x12b134!==''){if(_0x1ff77f(0x1e7)===_0x1ff77f(0x113)){const _0x5b7d61=_0x1ff77f(0x1c5)[_0x1ff77f(0x1f2)](_0x1d29b8,_0x268cb6,_0x34018b);_0xbea046[_0x1ff77f(0x155)][_0x5b7d61]=_0x55dbb8;}else this[_0x1ff77f(0x167)]=_0x12b134,this['_priorityFaceIndex']=_0x46b98d;}else{if(_0x1ff77f(0x187)!=='csaFe')return[];else this[_0x1ff77f(0x167)]=undefined,this[_0x1ff77f(0x9c)]=undefined;}},VisuMZ[_0x576f25(0x198)][_0x576f25(0xf3)]=Game_Actor[_0x576f25(0x19e)][_0x576f25(0x19f)],Game_Actor[_0x576f25(0x19e)][_0x576f25(0x19f)]=function(){const _0x46ae78=_0x576f25;if(this[_0x46ae78(0x167)]!==undefined)return this['_priorityFaceName'];const _0xa66f45=this[_0x46ae78(0xdb)]();for(const _0x3ac9f5 of _0xa66f45){const _0x233a2c=this['getEquipSetPieces'](_0x3ac9f5),_0x728fd8=ImageManager[_0x46ae78(0x160)](this,_0x3ac9f5,_0x233a2c);if(_0x728fd8)return _0x728fd8;}return VisuMZ[_0x46ae78(0x198)][_0x46ae78(0xf3)][_0x46ae78(0x18e)](this);},VisuMZ[_0x576f25(0x198)][_0x576f25(0x13f)]=Game_Actor[_0x576f25(0x19e)][_0x576f25(0x161)],Game_Actor['prototype'][_0x576f25(0x161)]=function(){const _0x587299=_0x576f25;if(this['_priorityFaceIndex']!==undefined)return this[_0x587299(0x9c)];const _0x1f3c33=this[_0x587299(0xdb)]();for(const _0x4723ca of _0x1f3c33){const _0x327ed2=this[_0x587299(0x12f)](_0x4723ca),_0x3e92ad=ImageManager['getActorEquipSetFaceIndex'](this,_0x4723ca,_0x327ed2);if(_0x3e92ad!==undefined)return _0x3e92ad;}return VisuMZ[_0x587299(0x198)][_0x587299(0x13f)]['call'](this);},VisuMZ[_0x576f25(0x198)][_0x576f25(0x122)]=Game_Actor['prototype'][_0x576f25(0xc6)],Game_Actor[_0x576f25(0x19e)][_0x576f25(0xc6)]=function(_0x573687,_0x215e4d){const _0x518ec1=_0x576f25;_0x573687!==''?(this['_priorityCharacterName']=_0x573687,this[_0x518ec1(0x107)]=_0x215e4d):(this[_0x518ec1(0x105)]=undefined,this[_0x518ec1(0x107)]=undefined);},VisuMZ[_0x576f25(0x198)][_0x576f25(0x1bd)]=Game_Actor[_0x576f25(0x19e)][_0x576f25(0xba)],Game_Actor[_0x576f25(0x19e)][_0x576f25(0xba)]=function(){const _0x2b21c0=_0x576f25;if(this['_priorityCharacterName']!==undefined)return this[_0x2b21c0(0x105)];const _0x553a2e=this[_0x2b21c0(0xdb)]();for(const _0x126f11 of _0x553a2e){const _0x3de805=this[_0x2b21c0(0x12f)](_0x126f11),_0x1a12c9=ImageManager['getActorEquipSetCharacterName'](this,_0x126f11,_0x3de805);if(_0x1a12c9)return _0x1a12c9;}return VisuMZ['EquipSetBonuses'][_0x2b21c0(0x1bd)][_0x2b21c0(0x18e)](this);},VisuMZ[_0x576f25(0x198)][_0x576f25(0xee)]=Game_Actor[_0x576f25(0x19e)][_0x576f25(0xd8)],Game_Actor[_0x576f25(0x19e)][_0x576f25(0xd8)]=function(){const _0x6052a7=_0x576f25;if(this[_0x6052a7(0x107)]!==undefined)return this[_0x6052a7(0x107)];const _0x51a8e4=this[_0x6052a7(0xdb)]();for(const _0x1ff78c of _0x51a8e4){const _0x2a56ee=this[_0x6052a7(0x12f)](_0x1ff78c),_0x3b3a70=ImageManager[_0x6052a7(0xf7)](this,_0x1ff78c,_0x2a56ee);if(_0x3b3a70!==undefined)return _0x3b3a70;}return VisuMZ[_0x6052a7(0x198)][_0x6052a7(0xee)][_0x6052a7(0x18e)](this);},VisuMZ[_0x576f25(0x198)][_0x576f25(0x1e3)]=Game_Actor[_0x576f25(0x19e)][_0x576f25(0x1f0)],Game_Actor['prototype'][_0x576f25(0x1f0)]=function(_0x16fda4){const _0xd8dcb9=_0x576f25;_0x16fda4!==''?this[_0xd8dcb9(0x14f)]=_0x16fda4:this['_priorityBattlerName']=undefined;},VisuMZ[_0x576f25(0x198)][_0x576f25(0x1d3)]=Game_Actor['prototype'][_0x576f25(0xc9)],Game_Actor[_0x576f25(0x19e)][_0x576f25(0xc9)]=function(){const _0x4a89e2=_0x576f25;if(this[_0x4a89e2(0x14f)]!==undefined)return this[_0x4a89e2(0x14f)];const _0x38b24b=this[_0x4a89e2(0xdb)]();for(const _0x28afd5 of _0x38b24b){const _0xf4a1bc=this[_0x4a89e2(0x12f)](_0x28afd5),_0x506725=ImageManager[_0x4a89e2(0x157)](this,_0x28afd5,_0xf4a1bc);if(_0x506725)return _0x506725;}return VisuMZ['EquipSetBonuses']['Game_Actor_battlerName'][_0x4a89e2(0x18e)](this);;},VisuMZ[_0x576f25(0x198)][_0x576f25(0x15d)]=Game_Actor[_0x576f25(0x19e)][_0x576f25(0x1f8)],Game_Actor['prototype'][_0x576f25(0x1f8)]=function(_0x462ffa){const _0x346ec2=_0x576f25;_0x462ffa!==''?this[_0x346ec2(0x1c1)]=_0x462ffa:this['_priorityMenuImage']=undefined;},VisuMZ[_0x576f25(0x198)]['Game_Actor_getMenuImage']=Game_Actor[_0x576f25(0x19e)]['getMenuImage'],Game_Actor['prototype'][_0x576f25(0x1eb)]=function(){const _0x571b56=_0x576f25;if(this[_0x571b56(0x1c1)]!==undefined)return this[_0x571b56(0x1c1)];const _0xdf4517=this[_0x571b56(0xdb)]();for(const _0x129ef2 of _0xdf4517){const _0x47b389=this[_0x571b56(0x12f)](_0x129ef2),_0x1d277d=ImageManager['getActorEquipSetMenuPortrait'](this,_0x129ef2,_0x47b389);if(_0x1d277d)return _0x1d277d;}return VisuMZ[_0x571b56(0x198)]['Game_Actor_getMenuImage'][_0x571b56(0x18e)](this);;},VisuMZ[_0x576f25(0x198)][_0x576f25(0x1c8)]=Game_Actor[_0x576f25(0x19e)][_0x576f25(0xeb)],Game_Actor['prototype']['setBattlePortrait']=function(_0x14ba36){const _0x250496=_0x576f25;if(_0x14ba36!==''){if(_0x250496(0x1e1)===_0x250496(0x1e1))this['_priorityBattlePortrait']=_0x14ba36;else{const _0x4617cf=_0x250496(0x1c5)[_0x250496(0x1f2)](_0x2cc884,_0x3a3916,_0x4a7912);_0x3b1877[_0x250496(0x179)][_0x4617cf]=_0x56e103;}}else'PvlAC'!==_0x250496(0x1c4)?this[_0x250496(0x192)]=undefined:(_0x22f452['EquipSetBonuses'][_0x250496(0xcf)]['call'](this,_0x2739b1),this[_0x250496(0xce)]());if(SceneManager['isSceneBattle']()&&$gameParty['battleMembers']()['includes'](this)){const _0x3413a4=SceneManager[_0x250496(0x14b)][_0x250496(0xc4)];if(_0x3413a4)_0x3413a4[_0x250496(0xaf)](this);}},VisuMZ[_0x576f25(0x198)][_0x576f25(0x166)]=Game_Actor[_0x576f25(0x19e)][_0x576f25(0xa2)],Game_Actor[_0x576f25(0x19e)][_0x576f25(0xa2)]=function(){const _0x32dffd=_0x576f25;if(this[_0x32dffd(0x192)]!==undefined)return this[_0x32dffd(0x192)];const _0x911dd8=this[_0x32dffd(0xdb)]();for(const _0x5f1f9e of _0x911dd8){const _0x36bc9f=this['getEquipSetPieces'](_0x5f1f9e),_0x5ccbe0=ImageManager[_0x32dffd(0x148)](this,_0x5f1f9e,_0x36bc9f);if(_0x5ccbe0)return _0x5ccbe0;}return VisuMZ[_0x32dffd(0x198)]['Game_Actor_getBattlePortraitFilename'][_0x32dffd(0x18e)](this);;},VisuMZ[_0x576f25(0x198)][_0x576f25(0x12e)]=Scene_Base[_0x576f25(0x19e)][_0x576f25(0xa8)],Scene_Base[_0x576f25(0x19e)]['createWindowLayer']=function(){const _0x2746e7=_0x576f25;VisuMZ['EquipSetBonuses'][_0x2746e7(0x12e)]['call'](this),this[_0x2746e7(0xa7)]();},Scene_Base[_0x576f25(0x19e)][_0x576f25(0xa7)]=function(){const _0xb165e=_0x576f25;if(!Window_EquipSetBonusTooltip[_0xb165e(0x159)])return;this[_0xb165e(0x1cf)]=new Window_EquipSetBonusTooltip(),this[_0xb165e(0x176)](this[_0xb165e(0x1cf)]);},Scene_Base['prototype'][_0x576f25(0x124)]=function(){const _0x107dee=_0x576f25;this[_0x107dee(0x1cf)]&&this[_0x107dee(0x1cf)][_0x107dee(0xca)]();},Scene_Base[_0x576f25(0x19e)][_0x576f25(0x1cb)]=function(){const _0x257651=_0x576f25;this[_0x257651(0x1cf)]&&this['_equipSetBonusTooltipWindow'][_0x257651(0x119)]();},VisuMZ[_0x576f25(0x198)][_0x576f25(0x1fa)]=Scene_Shop['prototype']['onBuyOk'],Scene_Shop[_0x576f25(0x19e)][_0x576f25(0x11a)]=function(){const _0x393116=_0x576f25;VisuMZ[_0x393116(0x198)]['Scene_Shop_onBuyOk']['call'](this),this[_0x393116(0x124)]();},VisuMZ[_0x576f25(0x198)][_0x576f25(0x202)]=Scene_Shop[_0x576f25(0x19e)][_0x576f25(0x15b)],Scene_Shop['prototype'][_0x576f25(0x15b)]=function(){const _0x35524d=_0x576f25;VisuMZ[_0x35524d(0x198)][_0x35524d(0x202)][_0x35524d(0x18e)](this),this[_0x35524d(0x124)]();},VisuMZ[_0x576f25(0x198)][_0x576f25(0x1a9)]=Scene_Shop[_0x576f25(0x19e)]['onNumberOk'],Scene_Shop[_0x576f25(0x19e)][_0x576f25(0x1cd)]=function(){const _0x4b20ad=_0x576f25;VisuMZ[_0x4b20ad(0x198)][_0x4b20ad(0x1a9)][_0x4b20ad(0x18e)](this),this[_0x4b20ad(0x1cb)]();},VisuMZ[_0x576f25(0x198)]['Scene_Shop_onNumberCancel']=Scene_Shop[_0x576f25(0x19e)]['onNumberCancel'],Scene_Shop[_0x576f25(0x19e)][_0x576f25(0x1a3)]=function(){const _0x4639da=_0x576f25;VisuMZ[_0x4639da(0x198)][_0x4639da(0x156)][_0x4639da(0x18e)](this),this['showEquipSetBonusTooltipWindow']();},Window_Selectable[_0x576f25(0x177)]=[_0x576f25(0x18d),_0x576f25(0xfa),_0x576f25(0x173),_0x576f25(0x125),_0x576f25(0x1d2),_0x576f25(0x196)],VisuMZ[_0x576f25(0x198)][_0x576f25(0xcf)]=Window_Selectable[_0x576f25(0x19e)]['initialize'],Window_Selectable[_0x576f25(0x19e)][_0x576f25(0x186)]=function(_0x261664){const _0x196827=_0x576f25;VisuMZ[_0x196827(0x198)]['Window_Selectable_initialize'][_0x196827(0x18e)](this,_0x261664),this[_0x196827(0xce)]();},Window_Selectable[_0x576f25(0x19e)][_0x576f25(0xce)]=function(){const _0x527dc0=_0x576f25;if(!this[_0x527dc0(0x1be)]())return;const _0x3a1d58=SceneManager[_0x527dc0(0x14b)];if(!_0x3a1d58)return;this[_0x527dc0(0x1cf)]=_0x3a1d58[_0x527dc0(0x1cf)]||null,this['callUpdateHelp']();},Window_Selectable[_0x576f25(0x19e)][_0x576f25(0x1be)]=function(){const _0x5024aa=_0x576f25;if(!Window_EquipSetBonusTooltip[_0x5024aa(0x159)])return![];return Window_Selectable[_0x5024aa(0x177)][_0x5024aa(0xd4)](this[_0x5024aa(0xf2)][_0x5024aa(0x143)]);},VisuMZ[_0x576f25(0x198)][_0x576f25(0xe8)]=Window_Selectable[_0x576f25(0x19e)][_0x576f25(0x12b)],Window_Selectable[_0x576f25(0x19e)][_0x576f25(0x12b)]=function(){const _0x418e89=_0x576f25;VisuMZ[_0x418e89(0x198)][_0x418e89(0xe8)][_0x418e89(0x18e)](this),this['updateEquipSetBonusTooltip']();},Window_Selectable[_0x576f25(0x19e)][_0x576f25(0x10e)]=function(){const _0x5eab79=_0x576f25,_0x156e3d=this[_0x5eab79(0x1cf)];if(_0x156e3d&&this[_0x5eab79(0xcc)]){if(_0x5eab79(0x1e8)===_0x5eab79(0x1bc))_0x57e7c5=this[_0x5eab79(0x1af)](_0x33ea02);else{_0x156e3d[_0x5eab79(0x1bb)](this);const _0x17643d=_0x156e3d['getActiveWindow']();_0x17643d===this&&_0x156e3d['setItem'](this[_0x5eab79(0xcc)]());}}};function Window_EquipSetBonusTooltip(){const _0x31d0e5=_0x576f25;this[_0x31d0e5(0x186)](...arguments);}Window_EquipSetBonusTooltip[_0x576f25(0x19e)]=Object[_0x576f25(0x1bf)](Window_Base[_0x576f25(0x19e)]),Window_EquipSetBonusTooltip[_0x576f25(0x19e)][_0x576f25(0xf2)]=Window_EquipSetBonusTooltip,Window_EquipSetBonusTooltip['SHOW_TOOLTIP']=VisuMZ[_0x576f25(0x198)][_0x576f25(0x11b)][_0x576f25(0x116)][_0x576f25(0x16e)],Window_EquipSetBonusTooltip[_0x576f25(0x15a)]=VisuMZ[_0x576f25(0x198)][_0x576f25(0x11b)]['Tooltip'][_0x576f25(0xcb)],Window_EquipSetBonusTooltip[_0x576f25(0x1b2)]=VisuMZ[_0x576f25(0x198)][_0x576f25(0x11b)][_0x576f25(0x116)][_0x576f25(0x20a)],Window_EquipSetBonusTooltip[_0x576f25(0x13a)]=VisuMZ['EquipSetBonuses']['Settings']['Tooltip'][_0x576f25(0x13c)],Window_EquipSetBonusTooltip[_0x576f25(0x131)]=VisuMZ[_0x576f25(0x198)][_0x576f25(0x11b)][_0x576f25(0x116)]['OffsetX'],Window_EquipSetBonusTooltip[_0x576f25(0xef)]=VisuMZ[_0x576f25(0x198)][_0x576f25(0x11b)]['Tooltip'][_0x576f25(0x17b)],Window_EquipSetBonusTooltip['prototype']['initialize']=function(){const _0x2824b4=_0x576f25,_0x4b24c3=new Rectangle(0x0,0x0,Graphics[_0x2824b4(0x1aa)],Graphics['height']);Window_Base[_0x2824b4(0x19e)][_0x2824b4(0x186)]['call'](this,_0x4b24c3),this[_0x2824b4(0x133)]['x']=this[_0x2824b4(0x133)]['y']=Window_EquipSetBonusTooltip[_0x2824b4(0x15a)],this[_0x2824b4(0xca)](),this[_0x2824b4(0xcd)]=null,this['_activeWindow']=null;},Window_EquipSetBonusTooltip[_0x576f25(0x19e)][_0x576f25(0x1b7)]=function(){const _0x3518c5=_0x576f25;this[_0x3518c5(0x1ff)]=ImageManager[_0x3518c5(0x1dc)](Window_EquipSetBonusTooltip[_0x3518c5(0x1b2)]);},Window_EquipSetBonusTooltip[_0x576f25(0x19e)][_0x576f25(0x11c)]=function(){const _0x56b10e=_0x576f25;this[_0x56b10e(0xd0)]=Window_EquipSetBonusTooltip[_0x56b10e(0x13a)];},Window_EquipSetBonusTooltip[_0x576f25(0x19e)][_0x576f25(0x182)]=function(_0x102708){const _0x3514e4=_0x576f25;if(this[_0x3514e4(0xcd)]===_0x102708)return;this['_item']=_0x102708,this[_0x3514e4(0xcd)]?this[_0x3514e4(0xec)]():'Pokvg'!==_0x3514e4(0xe3)?_0x2bc494=_0x3cac4e[_0x3514e4(0x163)][_0x3514e4(0x1f2)](_0x3a0000,_0x2d2f43):this[_0x3514e4(0xca)]();},Window_EquipSetBonusTooltip[_0x576f25(0x19e)][_0x576f25(0x203)]=function(){const _0x3b633d=_0x576f25;return this[_0x3b633d(0x97)]||null;},Window_EquipSetBonusTooltip[_0x576f25(0x19e)][_0x576f25(0x1bb)]=function(_0x5b8574){const _0x484a56=_0x576f25;if(!_0x5b8574[_0x484a56(0x9a)])return;this[_0x484a56(0x97)]=_0x5b8574,this[_0x484a56(0x95)]();},Window_EquipSetBonusTooltip[_0x576f25(0x19e)][_0x576f25(0x119)]=function(){const _0x43a1ff=_0x576f25;this[_0x43a1ff(0x18b)]['clear'](),this[_0x43a1ff(0xab)]();if(this[_0x43a1ff(0x206)][_0x43a1ff(0x121)]>0x0){this['resizeWindow']();const _0x312bc8=this[_0x43a1ff(0x109)]();this[_0x43a1ff(0x1f3)](),this[_0x43a1ff(0x112)](this[_0x43a1ff(0x10c)]['shift']()),this[_0x43a1ff(0x199)](this[_0x43a1ff(0x206)],_0x312bc8['x'],_0x312bc8['y'],_0x312bc8['width']),this[_0x43a1ff(0x1fc)]();}else _0x43a1ff(0x10d)!==_0x43a1ff(0x10d)?(this[_0x43a1ff(0xdd)]=![],this[_0x43a1ff(0x119)]()):this[_0x43a1ff(0xca)]();},Window_EquipSetBonusTooltip[_0x576f25(0x19e)][_0x576f25(0x1d6)]=function(_0x5be3d5){const _0x1c4d2e=_0x576f25;Window_Base[_0x1c4d2e(0x19e)]['processNewLine'][_0x1c4d2e(0x18e)](this,_0x5be3d5),_0x5be3d5[_0x1c4d2e(0x208)]&&this['changePaintOpacity'](this['_lineOpacity']['shift']());},Window_EquipSetBonusTooltip['prototype']['convertMessageKeywords']=function(_0x833522){return _0x833522;},Window_EquipSetBonusTooltip['prototype'][_0x576f25(0xb7)]=function(){return![];},Window_EquipSetBonusTooltip[_0x576f25(0x19e)][_0x576f25(0xab)]=function(){const _0x353a7d=_0x576f25;this[_0x353a7d(0x206)]='',this[_0x353a7d(0x10c)]=[];if(!this[_0x353a7d(0xcd)])return;for(const _0x551d3b of DataManager['getEquipSets'](this[_0x353a7d(0xcd)])){const _0x3358f4=DataManager['getEquipSetData'](_0x551d3b);if(!_0x3358f4)continue;this['addSetDataText'](_0x3358f4);}this[_0x353a7d(0x206)]=this[_0x353a7d(0x206)][_0x353a7d(0xb3)]();},Window_EquipSetBonusTooltip['prototype'][_0x576f25(0x142)]=function(_0x1dfabb){const _0x7dd179=_0x576f25;if(!_0x1dfabb)return;const _0x277558=_0x1dfabb['SetName'],_0x5192db=_0x1dfabb[_0x7dd179(0x98)]?_0x7dd179(0xe7)['format'](_0x1dfabb[_0x7dd179(0x98)]):'';this['_text']+=TextManager[_0x7dd179(0x175)][_0x7dd179(0x1f2)](_0x277558,_0x5192db)+'\x0a',this['_lineOpacity']['push'](!![]);for(let _0x320ac0=0x1;_0x320ac0<=0x14;_0x320ac0++){const _0x1fa542=_0x1dfabb[_0x7dd179(0xac)[_0x7dd179(0x1f2)](_0x320ac0)];this['addPieceDataText'](_0x1dfabb,_0x1fa542,_0x320ac0);}},Window_EquipSetBonusTooltip[_0x576f25(0x19e)][_0x576f25(0x174)]=function(_0x17a979,_0x524500,_0x55c918){const _0x2cc6be=_0x576f25;if(!_0x524500)return;if(_0x524500[_0x2cc6be(0x158)]===undefined)return;if(!_0x524500['ShowText'])return;let _0x34bbac='';if(_0x524500[_0x2cc6be(0x158)][_0x2cc6be(0xa9)]()[_0x2cc6be(0xb3)]()!=='auto')_0x2cc6be(0x153)!==_0x2cc6be(0x9e)?_0x34bbac=_0x524500[_0x2cc6be(0x158)]:(this[_0x2cc6be(0x105)]=_0x487c2c,this[_0x2cc6be(0x107)]=_0x90cbca);else{if('KFiYL'!==_0x2cc6be(0xae)){const _0x436371=_0x2cc6be(0x1c5)[_0x2cc6be(0x1f2)](_0x1fb6a9,_0xcdc8f,_0x502bcf);_0x219e55['actorEquipSetCharacterName'][_0x436371]=_0x3f1904,_0x580d51[_0x2cc6be(0xc2)][_0x436371]=_0x341e11;}else _0x34bbac=this['createAutoPieceText'](_0x524500);}_0x34bbac[_0x2cc6be(0xb3)]()!==''&&(this[_0x2cc6be(0x206)]+=TextManager[_0x2cc6be(0x10a)][_0x2cc6be(0x1f2)](_0x55c918,_0x34bbac)+'\x0a',this['pushLineOpacity'](_0x17a979,_0x55c918));},Window_EquipSetBonusTooltip['prototype'][_0x576f25(0x1af)]=function(_0x499a7a){const _0x25cc3e=_0x576f25;let _0x5a916c='';const _0x4790de=[];if(_0x499a7a[_0x25cc3e(0x195)]){if('fiBVJ'===_0x25cc3e(0xbb))_0x2291a5[_0x25cc3e(0x198)]['Window_Selectable_callUpdateHelp'][_0x25cc3e(0x18e)](this),this[_0x25cc3e(0x10e)]();else for(const _0x5adcc5 of _0x499a7a[_0x25cc3e(0x195)]){const _0x3a5779=$dataStates[_0x5adcc5];if(!_0x3a5779)continue;if(_0x3a5779[_0x25cc3e(0xa3)]<=0x0)continue;if(_0x3a5779[_0x25cc3e(0x143)][_0x25cc3e(0xb3)]()==='')continue;if(_0x3a5779[_0x25cc3e(0x143)][_0x25cc3e(0x1fb)](/-----/i))continue;const _0x4382a1='\x5cI[%1]'[_0x25cc3e(0x1f2)](_0x3a5779[_0x25cc3e(0xa3)]),_0x497e48=TextManager[_0x25cc3e(0x134)][_0x25cc3e(0x1f2)](_0x3a5779[_0x25cc3e(0x143)],_0x4382a1);_0x4790de[_0x25cc3e(0xa6)](_0x497e48);}}if(_0x499a7a[_0x25cc3e(0x12d)]){const _0x268cd2=[_0x25cc3e(0x17c),'MAXMP',_0x25cc3e(0x1f9),_0x25cc3e(0x1b5),'MAT','MDF',_0x25cc3e(0x16a),_0x25cc3e(0xa0)],_0x511bd2=this['createAutoParamText'](_0x499a7a,'Param',_0x268cd2);while(_0x511bd2[_0x25cc3e(0x121)]>0x0)_0x4790de['push'](_0x511bd2[_0x25cc3e(0x17a)]());}if(_0x499a7a[_0x25cc3e(0x127)]){if(_0x25cc3e(0x17f)!=='NnBnk'){const _0x451cc2=_0x4042b4['Piece%1'['format'](_0x52e894)];this[_0x25cc3e(0x174)](_0x1d94d2,_0x451cc2,_0x446f48);}else{const _0x417367=[_0x25cc3e(0x15f),'EVA',_0x25cc3e(0x1d7),_0x25cc3e(0x1b8),_0x25cc3e(0xf6),_0x25cc3e(0x1d4),_0x25cc3e(0xd9),'HRG','MRG','TRG'],_0x2a16dc=this[_0x25cc3e(0x19a)](_0x499a7a,_0x25cc3e(0x127),_0x417367);while(_0x2a16dc[_0x25cc3e(0x121)]>0x0)_0x4790de[_0x25cc3e(0xa6)](_0x2a16dc[_0x25cc3e(0x17a)]());}}if(_0x499a7a[_0x25cc3e(0xd2)]){const _0x5ce577=[_0x25cc3e(0x140),_0x25cc3e(0x201),_0x25cc3e(0x19c),_0x25cc3e(0xdf),_0x25cc3e(0x1ac),_0x25cc3e(0x1e6),'PDR',_0x25cc3e(0x152),_0x25cc3e(0xc5),'EXR'],_0x88b2aa=this[_0x25cc3e(0x19a)](_0x499a7a,_0x25cc3e(0xd2),_0x5ce577);while(_0x88b2aa[_0x25cc3e(0x121)]>0x0)_0x4790de[_0x25cc3e(0xa6)](_0x88b2aa[_0x25cc3e(0x17a)]());}for(const _0xe5208 of _0x4790de){if('sacGH'===_0x25cc3e(0x11f))return _0x3ce3f4[_0x25cc3e(0xc3)]&&_0x24ddb8['description'][_0x25cc3e(0xd4)]('['+_0x2438b0+']');else{if(_0xe5208[_0x25cc3e(0x121)]<=0x0)continue;if(_0x5a916c[_0x25cc3e(0x121)]<=0x0){if(_0x25cc3e(0x1b1)!==_0x25cc3e(0x1f7))_0x5a916c+=_0xe5208;else{let _0x3f565c=this[_0x25cc3e(0x1ce)]()[_0x25cc3e(0x193)]();return _0x3f565c[_0x25cc3e(0x16f)]((_0x5aeacf,_0x5c5dd6)=>{const _0x143c95=_0x25cc3e,_0x58f88e=this[_0x143c95(0x12f)](_0x5aeacf),_0xb731c8=this[_0x143c95(0x12f)](_0x5c5dd6);if(_0x58f88e!==_0xb731c8)return _0xb731c8-_0x58f88e;return 0x0;}),_0x3f565c;}}else _0x25cc3e(0x147)!==_0x25cc3e(0x104)?_0x5a916c=TextManager[_0x25cc3e(0x163)][_0x25cc3e(0x1f2)](_0x5a916c,_0xe5208):_0x57c8af!==''?this[_0x25cc3e(0x1c1)]=_0x52bbb6:this[_0x25cc3e(0x1c1)]=_0x186fc1;}}return _0x5a916c[_0x25cc3e(0xb3)]();},Window_EquipSetBonusTooltip[_0x576f25(0x19e)][_0x576f25(0x19a)]=function(_0x102545,_0x437e8f,_0x351592){const _0x17faed=_0x576f25,_0x25cc7c=[],_0x266643=_0x351592[_0x17faed(0x121)];for(let _0x1f2b10=0x0;_0x1f2b10<_0x266643;_0x1f2b10++){const _0x452368=TextManager[_0x17faed(0x20c)](_0x351592[_0x1f2b10]),_0x180a30=Number(_0x102545[_0x437e8f][_0x17faed(0xa4)[_0x17faed(0x1f2)](_0x1f2b10)]||0x1),_0x8f090d=Number(_0x102545[_0x437e8f]['Plus%1'[_0x17faed(0x1f2)](_0x1f2b10)]||0x0);if(_0x180a30!==0x1){if(_0x17faed(0x1ae)!=='mgMJH')_0x3ad828[_0x17faed(0x198)]['Scene_Shop_onNumberCancel']['call'](this),this['showEquipSetBonusTooltipWindow']();else{const _0x555ff7=TextManager['equipSetRate'],_0x29fed0=Math['floor'](_0x180a30*0x64)+'%',_0x318cae=_0x555ff7[_0x17faed(0x1f2)](_0x452368,_0x29fed0);_0x25cc7c[_0x17faed(0xa6)](_0x318cae);}}if(_0x8f090d!==0x0){if(_0x17faed(0x145)===_0x17faed(0xf9)){const _0x3fcfff=this[_0x17faed(0x12f)](_0x14f9e3),_0x25ec95=_0x5ca538[_0x17faed(0x148)](this,_0x4eec39,_0x3fcfff);if(_0x25ec95)return _0x25ec95;}else{const _0x4134c1=_0x8f090d>0x0?TextManager[_0x17faed(0xe6)]:TextManager[_0x17faed(0xd6)];let _0x1675b7=Math[_0x17faed(0xe4)](_0x8f090d);_0x437e8f!==_0x17faed(0x12d)&&(_0x1675b7=Math[_0x17faed(0x1ee)](_0x1675b7*0x64)+'%');const _0x1811d4=_0x4134c1[_0x17faed(0x1f2)](_0x452368,_0x1675b7);_0x25cc7c['push'](_0x1811d4);}}}return _0x25cc7c;},Window_EquipSetBonusTooltip[_0x576f25(0x19e)][_0x576f25(0x200)]=function(_0x17501d,_0x5c1313){const _0x1905f0=_0x576f25,_0x5a406e=SceneManager['_scene'];if([_0x1905f0(0x1db)][_0x1905f0(0xd4)](_0x5a406e['constructor']['name'])){if(_0x1905f0(0x144)!==_0x1905f0(0x144)){const _0x180b6f=[_0x1905f0(0x15f),'EVA',_0x1905f0(0x1d7),_0x1905f0(0x1b8),'MEV','MRF',_0x1905f0(0xd9),_0x1905f0(0x169),_0x1905f0(0x164),'TRG'],_0x51896f=this[_0x1905f0(0x19a)](_0x14072b,_0x1905f0(0x127),_0x180b6f);while(_0x51896f[_0x1905f0(0x121)]>0x0)_0x51b6c5[_0x1905f0(0xa6)](_0x51896f['shift']());}else{const _0x51556a=_0x5a406e[_0x1905f0(0x1fe)](),_0x1dd81e=_0x17501d['SetName'][_0x1905f0(0x1ad)]()[_0x1905f0(0xb3)](),_0x21aac0=_0x51556a['getEquipSetPieces'](_0x1dd81e);this[_0x1905f0(0x10c)][_0x1905f0(0xa6)](_0x21aac0>=_0x5c1313);}}else _0x1905f0(0xc7)===_0x1905f0(0xc7)?this[_0x1905f0(0x10c)]['push'](!![]):(_0x1159b8[_0x1905f0(0x198)]['Game_Actor_releaseUnequippableItems']['call'](this,_0x5ee3ba),this[_0x1905f0(0x13e)]());},Window_EquipSetBonusTooltip[_0x576f25(0x19e)][_0x576f25(0x1ab)]=function(){const _0x3f9fe3=_0x576f25,_0x1fe77a=this['textSizeEx'](this[_0x3f9fe3(0x206)]);this['width']=_0x1fe77a[_0x3f9fe3(0x1aa)]+(this[_0x3f9fe3(0xbd)]()+this[_0x3f9fe3(0x15e)])*0x2,this['height']=_0x1fe77a[_0x3f9fe3(0x205)]+this[_0x3f9fe3(0x15e)]*0x2,this[_0x3f9fe3(0xea)](),this['resetFontSettings']();},Window_EquipSetBonusTooltip[_0x576f25(0x19e)][_0x576f25(0x101)]=function(){const _0x541451=_0x576f25;Window_Base[_0x541451(0x19e)][_0x541451(0x101)][_0x541451(0x18e)](this);if(this[_0x541451(0xdd)]){if(_0x541451(0x1f5)===_0x541451(0x1d1)){if(!_0x37c5f4[_0x541451(0x9a)])return;this['_activeWindow']=_0xb158a6,this[_0x541451(0x95)]();}else this['_requestRefresh']=![],this['refresh']();}this[_0x541451(0x95)]();},Window_EquipSetBonusTooltip[_0x576f25(0x19e)]['requestRefresh']=function(){const _0x3a67a0=_0x576f25;this[_0x3a67a0(0xdd)]=!![];},Window_EquipSetBonusTooltip['prototype'][_0x576f25(0x95)]=function(){const _0x339fb9=_0x576f25;if(!this['visible'])return;if(!this[_0x339fb9(0x97)])return;if(!this['_activeWindow'][_0x339fb9(0x9a)])return;const _0x120376=SceneManager['_scene']['_windowLayer'],_0xeb96c0=this['_activeWindow'][_0x339fb9(0xb1)](this['_activeWindow']['index']()),_0x345e4c=this[_0x339fb9(0x97)]['padding'],_0x51eab1=this[_0x339fb9(0x205)]*(Window_EquipSetBonusTooltip[_0x339fb9(0x15a)]||0.01);this['x']=this[_0x339fb9(0x97)]['x']+_0x120376['x']+_0xeb96c0['x']+_0x345e4c+Window_EquipSetBonusTooltip['MOUSE_OFFSET_X'],this['y']=this[_0x339fb9(0x97)]['y']+_0x120376['y']+_0xeb96c0['y']+Math['round'](_0xeb96c0[_0x339fb9(0x205)]/0x2)+_0x345e4c+Window_EquipSetBonusTooltip[_0x339fb9(0xef)],this['y']+_0x51eab1>Graphics[_0x339fb9(0x205)]&&(_0x339fb9(0x1dd)===_0x339fb9(0x15c)?(_0x29e437[_0x339fb9(0x198)][_0x339fb9(0x1a9)][_0x339fb9(0x18e)](this),this[_0x339fb9(0x1cb)]()):this['y']=this['_activeWindow']['y']+_0x120376['y']+_0xeb96c0['y']+Math['round'](_0xeb96c0[_0x339fb9(0x205)]/0x2)-_0x51eab1-Window_EquipSetBonusTooltip[_0x339fb9(0xef)]),this[_0x339fb9(0x118)]();},Window_EquipSetBonusTooltip['prototype'][_0x576f25(0x118)]=function(){const _0x5150f8=_0x576f25,_0x5addb1=this[_0x5150f8(0x1aa)]*(Window_EquipSetBonusTooltip['WINDOW_SCALE']||0.01),_0x4624e0=this[_0x5150f8(0x205)]*(Window_EquipSetBonusTooltip[_0x5150f8(0x15a)]||0.01);this['x']=Math[_0x5150f8(0xfc)](this['x'][_0x5150f8(0x137)](0x0,Graphics[_0x5150f8(0x1aa)]-_0x5addb1)),this['y']=Math['round'](this['y'][_0x5150f8(0x137)](0x0,Graphics[_0x5150f8(0x205)]-_0x4624e0));};