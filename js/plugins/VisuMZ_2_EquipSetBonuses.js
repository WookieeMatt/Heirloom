//=============================================================================
// VisuStella MZ - Equipment Set Bonuses
// VisuMZ_2_EquipSetBonuses.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EquipSetBonuses = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EquipSetBonuses = VisuMZ.EquipSetBonuses || {};
VisuMZ.EquipSetBonuses.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.01] [EquipSetBonuses]
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

const _0x4ba74e=_0x44b4;(function(_0x3ca3fb,_0x646892){const _0x501e85=_0x44b4,_0x4d4c7b=_0x3ca3fb();while(!![]){try{const _0x35a443=parseInt(_0x501e85(0x1b7))/0x1+-parseInt(_0x501e85(0x28f))/0x2+parseInt(_0x501e85(0x21a))/0x3+parseInt(_0x501e85(0x175))/0x4+parseInt(_0x501e85(0x1d4))/0x5*(parseInt(_0x501e85(0x1bd))/0x6)+parseInt(_0x501e85(0x1b6))/0x7+-parseInt(_0x501e85(0x24b))/0x8;if(_0x35a443===_0x646892)break;else _0x4d4c7b['push'](_0x4d4c7b['shift']());}catch(_0x449be5){_0x4d4c7b['push'](_0x4d4c7b['shift']());}}}(_0x4265,0x3ea4a));function _0x4265(){const _0x49e80b=['abs','Settings','exit','kLKlA','description','_priorityCharacterIndex','_equipSetBonusCount','lVjZA','SetMenuPortrait','actorEquipSetBattlePortrait','registerEquipSetBonusTooltipWindow','CEV','updatePosition','AddPosFmt','WindowSkin','_activeWindow','convertMessageKeywords','Set','DEF','Window_Selectable_initialize','getEquipSetsSortedByMostPieces','isWeapon','toUpperCase','parse','registerActorEquipSetImages','GRD','Game_Actor_getMenuImage','_requestRefresh','SParam','Game_Actor_characterIndex','addPassiveStatesFromEquipSetBonuses','width','Window_ShopBuy','kWqEh','cQsew','setItem','Mechanics','xCbMz','actor','equipSetTitleFmt','xPtmp','updateEquipSetBonusTooltip','sTEoU','hide','otiiU','TGR','qsKXe','equipSetBonusParamRate','equips','RegExp','FCgrX','SetCharaName','xparamFlatBonus','EQUIP_SET_X_PARAM_PLUS_FLAT','HRG','Scene_Shop_onSellOk','ARRAYSTRUCT','isArmor','3425261hngnbu','480073iAikND','TVqeW','WlBoD','battlerName','Piece%1','setBattlerImage','6KpMXGR','refresh','WINDOW_SKIN_FILENAME','_scene','Game_BattlerBase_xparamFlatBonus','match','resetFontSettings','SfYGu','processNewLine','StateFmt','NISaf','_priorityMenuImage','_windowLayer','IVohy','resizeWindow','MAXMP','max','cSQHb','PassiveStates','floor','addPassiveStatesFromOtherPlugins','Game_Actor_setCharacterImage','ARRAYNUM','1324965ionFkm','_priorityFaceIndex','equipSetBonusParamPlus','VisuMZ_1_ItemsEquipsCore','height','process_VisuMZ_Template_Notetags','onNumberOk','Window_ItemList','REC','return\x200','_equipSetBonusTooltipWindow','_text','LycBz','lPLkQ','EquipSets','YkUnk','HIT','includes','Tooltip','LGzYE','changePaintOpacity','parameters','paramRate','iZKfC','iconIndex','ZnLGw','getActorEquipSetBattlerName','qTgqc','ParseActorNotetags','QMrkM','dmlzV','textSizeEx','releaseUnequippableItems','ARRAYJSON','STR','Rate%1','addChild','clear','fZOvP','jayAJ','EquipSetBonuses','create','addPieceDataText','Param','ParseAllNotetags','sort','OEbZf','setupText','Game_BattlerBase_sparamRate','_armorEquipSets','constructor','setMenuImage','itemRect','setFaceImage','aUdcS','CRI','pPFvD','onNumberCancel','RxcEl','createContents','OffsetY','characterIndex','Game_Actor_setBattlerImage','hfcni','xpnKR','Game_BattlerBase_paramFlatBonus','auto','call','callUpdateHelp','cSYAT','1014135YLdsev','setCharacterImage','XParamAdd','VMZkz','length','FDR','Game_Actor_faceName','padding','createAutoParamText','map','FYIWG','Window_EquipItem','AGI','MOUSE_OFFSET_Y','sIAhm','clearEquipSetBonusCache','prototype','flat','ConvertParams','Game_Actor_battlerName','refreshActorPortrait','egjiy','getActorEquipSetCharacterIndex','hasEquipSetBonusTooltipWindow','getBattlePortraitFilename','paramPlus','Scene_Boot_onDatabaseLoaded','xparamRate','YIFDg','characterName','equipSetPlusNeg','shgaF','SetCharaNameRange','SetMenuPortraitPlus','equipSetState','_weaponEquipSets','clone','ARRAYSTR','SetBattlerNameRange','loadWindowskin','Game_BattlerBase_xparamPlus','getMenuImage','scale','MUcfW','clamp','Game_BattlerBase_addPassiveStatesFromOtherPlugins','showEquipSetBonusTooltipWindow','filter','onSellOk','11888856pewviS','SetBattlerNamePlus','itemPadding','getEquipSetData','shift','FSNfA','name','SetCharaNamePlus','RateFmt','push','visible','SHOW_TOOLTIP','SetBattlePortraitRange','contents','Actor-%1-SetName-%2-Pieces-%3','auvxL','\x5cI[%1]','actorEquipSetCharacterIndex','getEquipSets','MRF','XParam','Game_BattlerBase_sparamPlus','plus','faceName','_equipSetBonusSets','VisuMZ_1_SkillsStatesCore','qFjGW','qsdLk','isSceneBattle','_priorityBattlePortrait','OEpft','Window_Selectable_callUpdateHelp','WINDOW_SCALE','EQUIP_SET_BONUS_WINDOWS','EQUIP_SET_BASE_PARAM_PLUS_FLAT','_tempActor','getActorEquipSetFaceIndex','actorId','_priorityBattlerName','_priorityFaceName','Scene_Base_createWindowLayer','checkRefreshEquipSetBonuses','trim','sparamFlatBonus','TRG','note','SetMenuPortraitRange','WindowOpacity','_lineOpacity','Game_BattlerBase_xparamRate','SetTitleFmt','sparamPlus','passiveStates','actorEquipSetFaceIndex','oASwC','jbePK','clampPosition','TVqNV','setBattlePortrait','yPXya','Game_BattlerBase_paramPlus','MDF','createEquipSetBonusTooltipWindow','paramName','Game_Actor_characterName','_item','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','pushLineOpacity','207134WpCQxY','onDatabaseLoaded','SetBattlerName','MAXHP','BaseParamAdd','ABkZB','battleMembers','Game_Actor_setup','_priorityCharacterName','SetFaceNameRange','drawTextEx','hideEquipSetBonusTooltipWindow','XUdGf','format','loadSystem','dnvTU','getActorEquipSetFaceName','updateBackOpacity','actorEquipSetCharacterName','createWindowLayer','toLowerCase','refreshEquipSetBonuses','setActiveWindow','Plus%1','SetFaceNamePlus','Text','fKxsW','sparamRate','getEquipSetPieces','NUM','actorEquipSetBattlerName','DPWod','PHA','Scene_Shop_onBuyOk','BTuMv','SeparatorFmt','FtNKg','SetBattlePortrait','setup','OffsetX','Pfbwo','BxqYo','SParamAdd','equipSetPieceSeparator','Scene_Shop_onNumberOk','_statusWindow','createAutoPieceText','bmrzz','getActiveWindow','vRjlV','actorEquipSetMenuPortrait','ParseEquipSets','onBuyOk','CNT','yAkdM','refreshEquipSetTooltip','item','EVAL','UNTITLED','Icon','drawing','Scene_Shop_onNumberCancel','equipSetPieceFmt','actorEquipSetFaceName','Game_BattlerBase_sparamFlatBonus','PLsgU','Game_Actor_faceIndex','gODwB','Game_BattlerBase_paramRate','_equipSets','WINDOW_SKIN_OPACITY','applyEquipSetBonuses','round','yJLwf','equipSetRate','EQUIP_SET_S_PARAM_PLUS_FLAT','VisuMZ_0_CoreEngine','pksIF','equipSetPlusPos','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Game_Actor_releaseUnequippableItems','windowskin','ARRAYFUNC','paramFlatBonus','getActorEquipSetCharacterName','initialize','version','MAT','getActorEquipSetBattlePortrait','1095304ydiTIn','SetPieceFmt','SetName','faceIndex','SetFaceName','tvxwo','requestRefresh'];_0x4265=function(){return _0x49e80b;};return _0x4265();}var label=_0x4ba74e(0x1fc),tier=tier||0x0,dependencies=[_0x4ba74e(0x2db),_0x4ba74e(0x1d7),_0x4ba74e(0x264)],pluginData=$plugins[_0x4ba74e(0x249)](function(_0x4687d9){const _0x56e2ff=_0x4ba74e;return _0x4687d9['status']&&_0x4687d9[_0x56e2ff(0x180)][_0x56e2ff(0x1e5)]('['+label+']');})[0x0];function _0x44b4(_0x3e1952,_0x46bbca){const _0x4265e1=_0x4265();return _0x44b4=function(_0x44b480,_0x18686b){_0x44b480=_0x44b480-0x16a;let _0x1494ca=_0x4265e1[_0x44b480];return _0x1494ca;},_0x44b4(_0x3e1952,_0x46bbca);}VisuMZ[label][_0x4ba74e(0x17d)]=VisuMZ[label][_0x4ba74e(0x17d)]||{},VisuMZ['ConvertParams']=function(_0x4683b5,_0x24eae1){const _0x521e9a=_0x4ba74e;for(const _0x329ab5 in _0x24eae1){if('hfcni'!==_0x521e9a(0x213)){_0x29965e!==''?this['_priorityBattlePortrait']=_0x3e62b4:this[_0x521e9a(0x268)]=_0x503fe4;if(_0x148d20[_0x521e9a(0x267)]()&&_0x35c26f['battleMembers']()['includes'](this)){const _0x441e11=_0x5bf071[_0x521e9a(0x1c0)][_0x521e9a(0x2bc)];if(_0x441e11)_0x441e11['refreshActorPortrait'](this);}}else{if(_0x329ab5[_0x521e9a(0x1c2)](/(.*):(.*)/i)){const _0x56d3de=String(RegExp['$1']),_0x2fd4ae=String(RegExp['$2'])[_0x521e9a(0x192)]()[_0x521e9a(0x275)]();let _0x2032bf,_0x40d4e1,_0x9d8ced;switch(_0x2fd4ae){case _0x521e9a(0x2ac):_0x2032bf=_0x24eae1[_0x329ab5]!==''?Number(_0x24eae1[_0x329ab5]):0x0;break;case _0x521e9a(0x1d3):_0x40d4e1=_0x24eae1[_0x329ab5]!==''?JSON['parse'](_0x24eae1[_0x329ab5]):[],_0x2032bf=_0x40d4e1['map'](_0x112d85=>Number(_0x112d85));break;case _0x521e9a(0x2c8):_0x2032bf=_0x24eae1[_0x329ab5]!==''?eval(_0x24eae1[_0x329ab5]):null;break;case'ARRAYEVAL':_0x40d4e1=_0x24eae1[_0x329ab5]!==''?JSON['parse'](_0x24eae1[_0x329ab5]):[],_0x2032bf=_0x40d4e1[_0x521e9a(0x223)](_0x5a4f5c=>eval(_0x5a4f5c));break;case'JSON':_0x2032bf=_0x24eae1[_0x329ab5]!==''?JSON[_0x521e9a(0x193)](_0x24eae1[_0x329ab5]):'';break;case _0x521e9a(0x1f5):_0x40d4e1=_0x24eae1[_0x329ab5]!==''?JSON[_0x521e9a(0x193)](_0x24eae1[_0x329ab5]):[],_0x2032bf=_0x40d4e1['map'](_0x343eb7=>JSON['parse'](_0x343eb7));break;case'FUNC':_0x2032bf=_0x24eae1[_0x329ab5]!==''?new Function(JSON['parse'](_0x24eae1[_0x329ab5])):new Function(_0x521e9a(0x1dd));break;case _0x521e9a(0x16e):_0x40d4e1=_0x24eae1[_0x329ab5]!==''?JSON['parse'](_0x24eae1[_0x329ab5]):[],_0x2032bf=_0x40d4e1[_0x521e9a(0x223)](_0x1e9477=>new Function(JSON[_0x521e9a(0x193)](_0x1e9477)));break;case _0x521e9a(0x1f6):_0x2032bf=_0x24eae1[_0x329ab5]!==''?String(_0x24eae1[_0x329ab5]):'';break;case _0x521e9a(0x23f):_0x40d4e1=_0x24eae1[_0x329ab5]!==''?JSON['parse'](_0x24eae1[_0x329ab5]):[],_0x2032bf=_0x40d4e1[_0x521e9a(0x223)](_0x884ae3=>String(_0x884ae3));break;case'STRUCT':_0x9d8ced=_0x24eae1[_0x329ab5]!==''?JSON['parse'](_0x24eae1[_0x329ab5]):{},_0x2032bf=VisuMZ[_0x521e9a(0x22c)]({},_0x9d8ced);break;case _0x521e9a(0x1b4):_0x40d4e1=_0x24eae1[_0x329ab5]!==''?JSON[_0x521e9a(0x193)](_0x24eae1[_0x329ab5]):[],_0x2032bf=_0x40d4e1[_0x521e9a(0x223)](_0x57fe01=>VisuMZ[_0x521e9a(0x22c)]({},JSON[_0x521e9a(0x193)](_0x57fe01)));break;default:continue;}_0x4683b5[_0x56d3de]=_0x2032bf;}}}return _0x4683b5;},(_0x2057e7=>{const _0x321232=_0x4ba74e,_0x4e2f65=_0x2057e7['name'];for(const _0x2e54d9 of dependencies){if(!Imported[_0x2e54d9]){alert(_0x321232(0x16b)[_0x321232(0x29c)](_0x4e2f65,_0x2e54d9)),SceneManager[_0x321232(0x17e)]();break;}}const _0x5ca782=_0x2057e7[_0x321232(0x180)];if(_0x5ca782[_0x321232(0x1c2)](/\[Version[ ](.*?)\]/i)){const _0x2d9cc6=Number(RegExp['$1']);_0x2d9cc6!==VisuMZ[label][_0x321232(0x172)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x321232(0x29c)](_0x4e2f65,_0x2d9cc6)),SceneManager[_0x321232(0x17e)]());}if(_0x5ca782[_0x321232(0x1c2)](/\[Tier[ ](\d+)\]/i)){const _0x40a672=Number(RegExp['$1']);if(_0x40a672<tier){if(_0x321232(0x1a8)!=='aDbda')alert(_0x321232(0x28d)[_0x321232(0x29c)](_0x4e2f65,_0x40a672,tier)),SceneManager[_0x321232(0x17e)]();else{const _0x34283f=_0x3872bb[_0x321232(0x1fc)][_0x321232(0x1ad)],_0x28233=_0x587d59[_0x321232(0x278)],_0x14bee3=[],_0x346964=_0x28233[_0x321232(0x1c2)](_0x34283f[_0x321232(0x18d)]);if(_0x346964)for(const _0x3d30b4 of _0x346964){_0x3d30b4[_0x321232(0x1c2)](_0x34283f[_0x321232(0x18d)]);const _0x134e97=_0x4a7d0b(_0x53230b['$1'])[_0x321232(0x192)]()[_0x321232(0x275)]();!!_0x32f723[_0x321232(0x24e)](_0x134e97)&&_0x14bee3['push'](_0x134e97);}return _0x14bee3;}}else _0x321232(0x2dc)===_0x321232(0x2dc)?tier=Math['max'](_0x40a672,tier):_0x28fdd2=_0x1ab4a7[_0x321232(0x1d0)](_0x48e4ce*0x64)+'%';}VisuMZ[_0x321232(0x22c)](VisuMZ[label]['Settings'],_0x2057e7[_0x321232(0x1e9)]);})(pluginData),VisuMZ['EquipSetBonuses'][_0x4ba74e(0x1ad)]={'Set':/<(?:EQUIP|EQUIPMENT) SET:[ ](.*)>/gi,'SetFaceName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetFaceNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetFaceNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetCharaName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetCharaNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetCharaNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetBattlerName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetBattlerNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetBattlerNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetMenuPortrait':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetMenuPortraitPlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetMenuPortraitRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortrait':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortraitPlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortraitRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi},VisuMZ['EquipSetBonuses'][_0x4ba74e(0x234)]=Scene_Boot[_0x4ba74e(0x22a)][_0x4ba74e(0x290)],Scene_Boot['prototype'][_0x4ba74e(0x290)]=function(){const _0x5d36c5=_0x4ba74e;VisuMZ['EquipSetBonuses'][_0x5d36c5(0x234)][_0x5d36c5(0x217)](this),this[_0x5d36c5(0x1d9)]();},Scene_Boot[_0x4ba74e(0x22a)][_0x4ba74e(0x1d9)]=function(){const _0x69ede0=_0x4ba74e;if(VisuMZ[_0x69ede0(0x200)])return;for(const _0x260997 of $dataActors){if(_0x69ede0(0x19e)==='cQsew'){if(!_0x260997)continue;ImageManager[_0x69ede0(0x194)](_0x260997);}else{const _0x54bf3a=_0x69ede0(0x259)[_0x69ede0(0x29c)](_0x4b5e07,_0x1025cb,_0x3197d9);_0x117f94[_0x69ede0(0x2ce)][_0x54bf3a]=_0x3f1e90,_0x8d4944[_0x69ede0(0x280)][_0x54bf3a]=_0x2adeae;}}},VisuMZ['EquipSetBonuses'][_0x4ba74e(0x1f0)]=VisuMZ[_0x4ba74e(0x1f0)],VisuMZ[_0x4ba74e(0x1f0)]=function(_0x1ef07b){const _0x15c91d=_0x4ba74e;VisuMZ['EquipSetBonuses'][_0x15c91d(0x1f0)]['call'](this,_0x1ef07b),ImageManager[_0x15c91d(0x194)](_0x1ef07b);},DataManager['getEquipSets']=function(_0x18dfc2){const _0x6f62b5=_0x4ba74e;if(this[_0x6f62b5(0x191)](_0x18dfc2)){if(_0x6f62b5(0x1ae)===_0x6f62b5(0x29b)){const _0x2f9681=_0x328b68>0x0?_0xca7ddd['equipSetPlusPos']:_0x5c359f[_0x6f62b5(0x238)];let _0x2d91c9=_0x2c79d3['abs'](_0x53795c);_0xd131dc!==_0x6f62b5(0x1ff)&&(_0x2d91c9=_0x52bfc0[_0x6f62b5(0x1d0)](_0x2d91c9*0x64)+'%');const _0x3e311a=_0x2f9681[_0x6f62b5(0x29c)](_0x4f559f,_0x2d91c9);_0xe8dc2a['push'](_0x3e311a);}else{this[_0x6f62b5(0x23d)]=this['_weaponEquipSets']||{};if(!this['_weaponEquipSets'][_0x18dfc2['id']]){if(_0x6f62b5(0x25a)!==_0x6f62b5(0x25a)){const _0x6f2bb0=this[_0x6f62b5(0x2ab)](_0x11da1a),_0x626289=_0x1ea6ec[_0x6f62b5(0x1ee)](this,_0x4a7ef4,_0x6f2bb0);if(_0x626289)return _0x626289;}else this[_0x6f62b5(0x23d)][_0x18dfc2['id']]=VisuMZ[_0x6f62b5(0x1fc)]['ParseEquipSets'](_0x18dfc2);}return this[_0x6f62b5(0x23d)][_0x18dfc2['id']];}}else{if(this[_0x6f62b5(0x1b5)](_0x18dfc2)){if(_0x6f62b5(0x228)===_0x6f62b5(0x228))return this['_armorEquipSets']=this[_0x6f62b5(0x205)]||{},!this['_armorEquipSets'][_0x18dfc2['id']]&&(this[_0x6f62b5(0x205)][_0x18dfc2['id']]=VisuMZ[_0x6f62b5(0x1fc)][_0x6f62b5(0x2c2)](_0x18dfc2)),this[_0x6f62b5(0x205)][_0x18dfc2['id']];else{if(!_0x5629a9||!_0x137fb3||!_0x14a1bc)return'';const _0x1947ad=_0x6f62b5(0x259)[_0x6f62b5(0x29c)](_0xa4d409[_0x6f62b5(0x270)](),_0x48369f[_0x6f62b5(0x192)]()[_0x6f62b5(0x275)](),_0x29aec4);return _0x32438e[_0x6f62b5(0x2c1)][_0x1947ad]||'';}}else{if(_0x6f62b5(0x1f2)!=='mTmbd')return[];else _0x11ebb7!==''?this[_0x6f62b5(0x1c8)]=_0x163118:this[_0x6f62b5(0x1c8)]=_0x541107;}}},VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x2c2)]=function(_0x34df54){const _0x56c7ab=_0x4ba74e,_0x4e1957=VisuMZ[_0x56c7ab(0x1fc)][_0x56c7ab(0x1ad)],_0x348615=_0x34df54[_0x56c7ab(0x278)],_0x55ce7d=[],_0x1d3cc4=_0x348615[_0x56c7ab(0x1c2)](_0x4e1957['Set']);if(_0x1d3cc4){if(_0x56c7ab(0x1a1)===_0x56c7ab(0x219)){const _0x513b23=new _0x4e7a69(0x0,0x0,_0x452ebd[_0x56c7ab(0x19b)],_0x56bf85[_0x56c7ab(0x1d8)]);_0xadfd98['prototype'][_0x56c7ab(0x171)][_0x56c7ab(0x217)](this,_0x513b23),this[_0x56c7ab(0x244)]['x']=this[_0x56c7ab(0x244)]['y']=_0x57b0fc[_0x56c7ab(0x26b)],this[_0x56c7ab(0x1a7)](),this['_item']=null,this[_0x56c7ab(0x18b)]=null;}else for(const _0x363d06 of _0x1d3cc4){_0x363d06['match'](_0x4e1957[_0x56c7ab(0x18d)]);const _0x430ef8=String(RegExp['$1'])[_0x56c7ab(0x192)]()[_0x56c7ab(0x275)]();if(!!DataManager[_0x56c7ab(0x24e)](_0x430ef8)){if(_0x56c7ab(0x2d0)!==_0x56c7ab(0x2d0)){const _0x49ef29=_0x4aa39b(_0x19ee56['$1']);_0x49ef29<_0x338af7?(_0x249479(_0x56c7ab(0x28d)[_0x56c7ab(0x29c)](_0xc5fb27,_0x49ef29,_0x390e46)),_0x81eca6[_0x56c7ab(0x17e)]()):_0x1467aa=_0x11db7e[_0x56c7ab(0x1cd)](_0x49ef29,_0x1c5a4f);}else _0x55ce7d[_0x56c7ab(0x254)](_0x430ef8);}}}return _0x55ce7d;},DataManager[_0x4ba74e(0x24e)]=function(_0x10a781){const _0x7c3c84=_0x4ba74e;_0x10a781=_0x10a781[_0x7c3c84(0x192)]()['trim']();if(this[_0x7c3c84(0x2d4)]===undefined){if('Eauqz'!==_0x7c3c84(0x281)){this[_0x7c3c84(0x2d4)]={};const _0x34a281=VisuMZ['EquipSetBonuses'][_0x7c3c84(0x17d)][_0x7c3c84(0x1e2)];for(const _0x40a328 of _0x34a281){const _0x4b63d9=_0x40a328[_0x7c3c84(0x177)][_0x7c3c84(0x192)]()[_0x7c3c84(0x275)]();if(_0x4b63d9==='')continue;if(_0x4b63d9===_0x7c3c84(0x2c9))continue;this[_0x7c3c84(0x2d4)][_0x4b63d9]=_0x40a328;}}else this['_priorityFaceName']=_0x5b8169,this['_priorityFaceIndex']=_0x448640;}return this[_0x7c3c84(0x2d4)][_0x10a781]||null;},ImageManager[_0x4ba74e(0x2ce)]={},ImageManager[_0x4ba74e(0x280)]={},ImageManager[_0x4ba74e(0x2a1)]={},ImageManager['actorEquipSetCharacterIndex']={},ImageManager['actorEquipSetBattlerName']={},ImageManager[_0x4ba74e(0x2c1)]={},ImageManager['actorEquipSetBattlePortrait']={},ImageManager[_0x4ba74e(0x194)]=function(_0x22dfd4){const _0x22da0d=_0x4ba74e;if(!_0x22dfd4)return;const _0x42955d=VisuMZ['EquipSetBonuses'][_0x22da0d(0x1ad)],_0x332d2b=_0x22dfd4[_0x22da0d(0x278)],_0x5e33f0=_0x22dfd4['id'],_0x145932=_0x332d2b['match'](_0x42955d['SetFaceName']);if(_0x145932){if(_0x22da0d(0x282)!==_0x22da0d(0x214))for(const _0x2ae75a of _0x145932){if(!_0x2ae75a)continue;_0x2ae75a[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x179)]);const _0x26062f=String(RegExp['$1'])[_0x22da0d(0x192)]()[_0x22da0d(0x275)](),_0x47b653=Number(RegExp['$2'])||0x1,_0x85c704=String(RegExp['$3'])['trim'](),_0x4c89f4=Number(RegExp['$4']);if(!DataManager[_0x22da0d(0x24e)](_0x26062f))continue;const _0x262489=_0x22da0d(0x259)[_0x22da0d(0x29c)](_0x5e33f0,_0x26062f,_0x47b653);ImageManager[_0x22da0d(0x2ce)][_0x262489]=_0x85c704,ImageManager[_0x22da0d(0x280)][_0x262489]=_0x4c89f4;}else this['_text']+=_0x436c24[_0x22da0d(0x2cd)][_0x22da0d(0x29c)](_0x32d1aa,_0x2d7857)+'\x0a',this[_0x22da0d(0x28e)](_0x3d7232,_0x2807d1);}const _0x30dd5c=_0x332d2b[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x2a7)]);if(_0x30dd5c)for(const _0x544f24 of _0x30dd5c){if(!_0x544f24)continue;_0x544f24[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x2a7)]);const _0x261f35=String(RegExp['$1'])[_0x22da0d(0x192)]()[_0x22da0d(0x275)](),_0x3cca7a=Number(RegExp['$2'])||0x1,_0xcac443=0x14,_0x4ba6ad=String(RegExp['$3'])['trim'](),_0x516e7=Number(RegExp['$4']);if(!DataManager[_0x22da0d(0x24e)](_0x261f35))continue;for(let _0x218c92=_0x3cca7a;_0x218c92<=_0xcac443;_0x218c92++){if(_0x22da0d(0x1e7)!=='WvUQi'){const _0x4ffe93=_0x22da0d(0x259)[_0x22da0d(0x29c)](_0x5e33f0,_0x261f35,_0x218c92);ImageManager[_0x22da0d(0x2ce)][_0x4ffe93]=_0x4ba6ad,ImageManager[_0x22da0d(0x280)][_0x4ffe93]=_0x516e7;}else this['hide']();}}const _0x40fa2d=_0x332d2b[_0x22da0d(0x1c2)](_0x42955d['SetFaceNameRange']);if(_0x40fa2d)for(const _0x1209e8 of _0x40fa2d){if(_0x22da0d(0x284)===_0x22da0d(0x284)){if(!_0x1209e8)continue;_0x1209e8[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x298)]);const _0x3c7e56=String(RegExp['$1'])[_0x22da0d(0x192)]()['trim'](),_0x4f9f55=Number(RegExp['$2'])||0x1,_0x26f35d=Number(RegExp['$3'])||0x1,_0x804909=String(RegExp['$4'])[_0x22da0d(0x275)](),_0x521421=Number(RegExp['$5']);if(!DataManager[_0x22da0d(0x24e)](_0x3c7e56))continue;for(let _0x1b865e=_0x4f9f55;_0x1b865e<=_0x26f35d;_0x1b865e++){const _0x143c60=_0x22da0d(0x259)[_0x22da0d(0x29c)](_0x5e33f0,_0x3c7e56,_0x1b865e);ImageManager['actorEquipSetFaceName'][_0x143c60]=_0x804909,ImageManager[_0x22da0d(0x280)][_0x143c60]=_0x521421;}}else{const _0x367fa4='Piece%1'[_0x22da0d(0x29c)](_0x3700ef);if(_0x18d56c[_0x367fa4]&&_0x15afaf[_0x367fa4][_0x142ca8]){const _0x3dfc0c=_0x22da0d(0x2a6)[_0x22da0d(0x29c)](_0x1d0f21);_0x563eb6+=_0x2b3084[_0x367fa4][_0x462b05][_0x3dfc0c]||0x0;}}}const _0x5d4086=_0x332d2b[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x1af)]);if(_0x5d4086)for(const _0x9ae2db of _0x5d4086){if(!_0x9ae2db)continue;_0x9ae2db[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x1af)]);const _0x51e2cb=String(RegExp['$1'])[_0x22da0d(0x192)]()[_0x22da0d(0x275)](),_0x2ea28f=Number(RegExp['$2'])||0x1,_0x4e1dfe=String(RegExp['$3'])[_0x22da0d(0x275)](),_0x189822=Number(RegExp['$4']);if(!DataManager[_0x22da0d(0x24e)](_0x51e2cb))continue;const _0x2cf2ba='Actor-%1-SetName-%2-Pieces-%3'['format'](_0x5e33f0,_0x51e2cb,_0x2ea28f);ImageManager[_0x22da0d(0x2a1)][_0x2cf2ba]=_0x4e1dfe,ImageManager[_0x22da0d(0x25c)][_0x2cf2ba]=_0x189822;}const _0x26143e=_0x332d2b[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x252)]);if(_0x26143e){if(_0x22da0d(0x202)!==_0x22da0d(0x202))_0xa0799c[_0x22da0d(0x1fc)][_0x22da0d(0x273)][_0x22da0d(0x217)](this),this[_0x22da0d(0x289)]();else for(const _0x51abc1 of _0x26143e){if(!_0x51abc1)continue;_0x51abc1[_0x22da0d(0x1c2)](_0x42955d['SetCharaNamePlus']);const _0x47f916=String(RegExp['$1'])[_0x22da0d(0x192)]()['trim'](),_0x2b5a1c=Number(RegExp['$2'])||0x1,_0x68c4a5=0x14,_0x4a240b=String(RegExp['$3'])[_0x22da0d(0x275)](),_0x1819f8=Number(RegExp['$4']);if(!DataManager[_0x22da0d(0x24e)](_0x47f916))continue;for(let _0x342d0b=_0x2b5a1c;_0x342d0b<=_0x68c4a5;_0x342d0b++){const _0x4a7535=_0x22da0d(0x259)[_0x22da0d(0x29c)](_0x5e33f0,_0x47f916,_0x342d0b);ImageManager['actorEquipSetCharacterName'][_0x4a7535]=_0x4a240b,ImageManager[_0x22da0d(0x25c)][_0x4a7535]=_0x1819f8;}}}const _0x1617ff=_0x332d2b[_0x22da0d(0x1c2)](_0x42955d['SetCharaNameRange']);if(_0x1617ff)for(const _0x291726 of _0x1617ff){if(!_0x291726)continue;_0x291726[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x23a)]);const _0x2c86c1=String(RegExp['$1'])['toUpperCase']()[_0x22da0d(0x275)](),_0x1673e7=Number(RegExp['$2'])||0x1,_0x1fa7fd=Number(RegExp['$3'])||0x1,_0x10e347=String(RegExp['$4'])[_0x22da0d(0x275)](),_0x2921fb=Number(RegExp['$5']);if(!DataManager[_0x22da0d(0x24e)](_0x2c86c1))continue;for(let _0x440085=_0x1673e7;_0x440085<=_0x1fa7fd;_0x440085++){const _0x3b4542=_0x22da0d(0x259)[_0x22da0d(0x29c)](_0x5e33f0,_0x2c86c1,_0x440085);ImageManager[_0x22da0d(0x2a1)][_0x3b4542]=_0x10e347,ImageManager[_0x22da0d(0x25c)][_0x3b4542]=_0x2921fb;}}const _0x50ba0d=_0x332d2b[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x291)]);if(_0x50ba0d)for(const _0x5c796c of _0x50ba0d){if(!_0x5c796c)continue;_0x5c796c[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x291)]);const _0xdbd0c6=String(RegExp['$1'])[_0x22da0d(0x192)]()[_0x22da0d(0x275)](),_0x3fe272=Number(RegExp['$2'])||0x1,_0x4410e3=String(RegExp['$3'])['trim']();if(!DataManager['getEquipSetData'](_0xdbd0c6))continue;const _0x14b5a='Actor-%1-SetName-%2-Pieces-%3'[_0x22da0d(0x29c)](_0x5e33f0,_0xdbd0c6,_0x3fe272);ImageManager[_0x22da0d(0x2ad)][_0x14b5a]=_0x4410e3;}const _0x4b58b4=_0x332d2b[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x24c)]);if(_0x4b58b4)for(const _0x2624ef of _0x4b58b4){if(_0x22da0d(0x1b8)!==_0x22da0d(0x2b3)){if(!_0x2624ef)continue;_0x2624ef[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x24c)]);const _0x17cc9e=String(RegExp['$1'])[_0x22da0d(0x192)]()[_0x22da0d(0x275)](),_0x307b77=Number(RegExp['$2'])||0x1,_0x1245ee=0x14,_0x26058c=String(RegExp['$3'])[_0x22da0d(0x275)]();if(!DataManager[_0x22da0d(0x24e)](_0x17cc9e))continue;for(let _0x1e2866=_0x307b77;_0x1e2866<=_0x1245ee;_0x1e2866++){if(_0x22da0d(0x1ca)==='RXihF'){if(!_0x177b27['SHOW_TOOLTIP'])return;this[_0x22da0d(0x1de)]=new _0x5393d9(),this[_0x22da0d(0x1f8)](this[_0x22da0d(0x1de)]);}else{const _0x26ecc9=_0x22da0d(0x259)[_0x22da0d(0x29c)](_0x5e33f0,_0x17cc9e,_0x1e2866);ImageManager[_0x22da0d(0x2ad)][_0x26ecc9]=_0x26058c;}}}else this[_0x22da0d(0x197)]=![],this[_0x22da0d(0x1be)]();}const _0x472814=_0x332d2b[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x240)]);if(_0x472814)for(const _0x403af4 of _0x472814){if(!_0x403af4)continue;_0x403af4[_0x22da0d(0x1c2)](_0x42955d['SetBattlerNameRange']);const _0x3ba037=String(RegExp['$1'])['toUpperCase']()[_0x22da0d(0x275)](),_0x245e98=Number(RegExp['$2'])||0x1,_0x34769=Number(RegExp['$3'])||0x1,_0x1bc39b=String(RegExp['$4'])[_0x22da0d(0x275)]();if(!DataManager[_0x22da0d(0x24e)](_0x3ba037))continue;for(let _0x420ee8=_0x245e98;_0x420ee8<=_0x34769;_0x420ee8++){const _0x32a969=_0x22da0d(0x259)[_0x22da0d(0x29c)](_0x5e33f0,_0x3ba037,_0x420ee8);ImageManager[_0x22da0d(0x2ad)][_0x32a969]=_0x1bc39b;}}const _0x2c518e=_0x332d2b[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x184)]);if(_0x2c518e)for(const _0x5b36df of _0x2c518e){if(!_0x5b36df)continue;_0x5b36df['match'](_0x42955d[_0x22da0d(0x184)]);const _0x5dd20d=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x4049b9=Number(RegExp['$2'])||0x1,_0x440e6c=String(RegExp['$3'])[_0x22da0d(0x275)]();if(!DataManager['getEquipSetData'](_0x5dd20d))continue;const _0x53052c=_0x22da0d(0x259)[_0x22da0d(0x29c)](_0x5e33f0,_0x5dd20d,_0x4049b9);ImageManager[_0x22da0d(0x2c1)][_0x53052c]=_0x440e6c;}const _0x413a6b=_0x332d2b[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x23b)]);if(_0x413a6b)for(const _0xc256fe of _0x413a6b){if(!_0xc256fe)continue;_0xc256fe[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x23b)]);const _0x9e754e=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x1d98f4=Number(RegExp['$2'])||0x1,_0x156ed6=0x14,_0x16e3a7=String(RegExp['$3'])[_0x22da0d(0x275)]();if(!DataManager[_0x22da0d(0x24e)](_0x9e754e))continue;for(let _0x10087c=_0x1d98f4;_0x10087c<=_0x156ed6;_0x10087c++){if(_0x22da0d(0x2d8)!==_0x22da0d(0x2a9)){const _0x2bb969=_0x22da0d(0x259)[_0x22da0d(0x29c)](_0x5e33f0,_0x9e754e,_0x10087c);ImageManager['actorEquipSetMenuPortrait'][_0x2bb969]=_0x16e3a7;}else{if(this[_0x22da0d(0x297)]!==_0x455d07)return this[_0x22da0d(0x297)];const _0x3c7616=this[_0x22da0d(0x190)]();for(const _0x39322c of _0x3c7616){const _0x389c50=this['getEquipSetPieces'](_0x39322c),_0x161ed7=_0x3d3136[_0x22da0d(0x170)](this,_0x39322c,_0x389c50);if(_0x161ed7)return _0x161ed7;}return _0x3b78eb['EquipSetBonuses'][_0x22da0d(0x28b)][_0x22da0d(0x217)](this);}}}const _0x5b2465=_0x332d2b[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x279)]);if(_0x5b2465){if(_0x22da0d(0x2c0)!=='vRjlV')this['_priorityMenuImage']=_0x40fab0;else for(const _0x53c6d8 of _0x5b2465){if(_0x22da0d(0x1ed)!==_0x22da0d(0x2b8)){if(!_0x53c6d8)continue;_0x53c6d8[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x279)]);const _0x1028f1=String(RegExp['$1'])[_0x22da0d(0x192)]()[_0x22da0d(0x275)](),_0x4875fe=Number(RegExp['$2'])||0x1,_0x49c7d9=Number(RegExp['$3'])||0x1,_0xd468bf=String(RegExp['$4'])['trim']();if(!DataManager['getEquipSetData'](_0x1028f1))continue;for(let _0x1576b0=_0x4875fe;_0x1576b0<=_0x49c7d9;_0x1576b0++){if(_0x22da0d(0x1ef)!==_0x22da0d(0x239)){const _0x1fe8a8=_0x22da0d(0x259)[_0x22da0d(0x29c)](_0x5e33f0,_0x1028f1,_0x1576b0);ImageManager[_0x22da0d(0x2c1)][_0x1fe8a8]=_0xd468bf;}else this[_0x22da0d(0x17b)]();}}else _0x20c682+=this[_0x22da0d(0x1d6)](_0x22da0d(0x25f),_0x3803c3);}}const _0x49af9f=_0x332d2b[_0x22da0d(0x1c2)](_0x42955d[_0x22da0d(0x2b4)]);if(_0x49af9f)for(const _0x1c84b2 of _0x49af9f){if(!_0x1c84b2)continue;_0x1c84b2['match'](_0x42955d[_0x22da0d(0x2b4)]);const _0x378412=String(RegExp['$1'])[_0x22da0d(0x192)]()[_0x22da0d(0x275)](),_0x4a4e78=Number(RegExp['$2'])||0x1,_0x140aab=String(RegExp['$3'])[_0x22da0d(0x275)]();if(!DataManager[_0x22da0d(0x24e)](_0x378412))continue;const _0xc28708=_0x22da0d(0x259)[_0x22da0d(0x29c)](_0x5e33f0,_0x378412,_0x4a4e78);ImageManager[_0x22da0d(0x185)][_0xc28708]=_0x140aab;}const _0x503d28=_0x332d2b['match'](_0x42955d[_0x22da0d(0x2b4)]);if(_0x503d28){if(_0x22da0d(0x2be)===_0x22da0d(0x1eb))_0x1dc0d8!==''?(this[_0x22da0d(0x272)]=_0x1a9fc8,this['_priorityFaceIndex']=_0x2c685e):(this[_0x22da0d(0x272)]=_0x556e4e,this[_0x22da0d(0x1d5)]=_0x12661c);else for(const _0x22b26b of _0x503d28){if(!_0x22b26b)continue;_0x22b26b['match'](_0x42955d[_0x22da0d(0x2b4)]);const _0x29427c=String(RegExp['$1'])[_0x22da0d(0x192)]()['trim'](),_0x4e6f23=Number(RegExp['$2'])||0x1,_0x26cfd5=0x14,_0x45ac00=String(RegExp['$3'])['trim']();if(!DataManager['getEquipSetData'](_0x29427c))continue;for(let _0x33f74c=_0x4e6f23;_0x33f74c<=_0x26cfd5;_0x33f74c++){const _0x8eab2e='Actor-%1-SetName-%2-Pieces-%3'['format'](_0x5e33f0,_0x29427c,_0x33f74c);ImageManager[_0x22da0d(0x185)][_0x8eab2e]=_0x45ac00;}}}const _0x3228e9=_0x332d2b['match'](_0x42955d[_0x22da0d(0x257)]);if(_0x3228e9)for(const _0x3b1fa1 of _0x3228e9){if(!_0x3b1fa1)continue;_0x3b1fa1['match'](_0x42955d[_0x22da0d(0x257)]);const _0x1a535b=String(RegExp['$1'])[_0x22da0d(0x192)]()[_0x22da0d(0x275)](),_0x2e7ee1=Number(RegExp['$2'])||0x1,_0x14c3bf=Number(RegExp['$3'])||0x1,_0x1319e1=String(RegExp['$4'])['trim']();if(!DataManager[_0x22da0d(0x24e)](_0x1a535b))continue;for(let _0xe149ec=_0x2e7ee1;_0xe149ec<=_0x14c3bf;_0xe149ec++){const _0x2b602f=_0x22da0d(0x259)['format'](_0x5e33f0,_0x1a535b,_0xe149ec);ImageManager[_0x22da0d(0x185)][_0x2b602f]=_0x1319e1;}}},ImageManager['getActorEquipSetFaceName']=function(_0x58cb9b,_0xee262e,_0x45cf46){const _0x5751b4=_0x4ba74e;if(!_0x58cb9b||!_0xee262e||!_0x45cf46)return'';const _0x229105=_0x5751b4(0x259)[_0x5751b4(0x29c)](_0x58cb9b[_0x5751b4(0x270)](),_0xee262e[_0x5751b4(0x192)]()[_0x5751b4(0x275)](),_0x45cf46);return ImageManager['actorEquipSetFaceName'][_0x229105]||'';},ImageManager[_0x4ba74e(0x26f)]=function(_0x30467f,_0x169f80,_0x6c322a){const _0x50efb4=_0x4ba74e;if(!_0x30467f||!_0x169f80||!_0x6c322a)return undefined;const _0x53001a=_0x50efb4(0x259)[_0x50efb4(0x29c)](_0x30467f[_0x50efb4(0x270)](),_0x169f80[_0x50efb4(0x192)]()['trim'](),_0x6c322a);return ImageManager[_0x50efb4(0x280)][_0x53001a]||undefined;},ImageManager['getActorEquipSetCharacterName']=function(_0x2512f7,_0x39e2f3,_0x5c2980){const _0x53e764=_0x4ba74e;if(!_0x2512f7||!_0x39e2f3||!_0x5c2980)return'';const _0x247cc8=_0x53e764(0x259)[_0x53e764(0x29c)](_0x2512f7['actorId'](),_0x39e2f3['toUpperCase']()[_0x53e764(0x275)](),_0x5c2980);return ImageManager[_0x53e764(0x2a1)][_0x247cc8]||'';},ImageManager[_0x4ba74e(0x230)]=function(_0x519ef5,_0x2b0a4d,_0x25ab75){const _0x5ebdcd=_0x4ba74e;if(!_0x519ef5||!_0x2b0a4d||!_0x25ab75)return undefined;const _0x70e06=_0x5ebdcd(0x259)[_0x5ebdcd(0x29c)](_0x519ef5[_0x5ebdcd(0x270)](),_0x2b0a4d[_0x5ebdcd(0x192)]()[_0x5ebdcd(0x275)](),_0x25ab75);return ImageManager['actorEquipSetCharacterIndex'][_0x70e06]||undefined;},ImageManager[_0x4ba74e(0x1ee)]=function(_0x1e70df,_0x40a392,_0x46493b){const _0x8c385f=_0x4ba74e;if(!_0x1e70df||!_0x40a392||!_0x46493b)return'';const _0x281723=_0x8c385f(0x259)[_0x8c385f(0x29c)](_0x1e70df[_0x8c385f(0x270)](),_0x40a392[_0x8c385f(0x192)]()[_0x8c385f(0x275)](),_0x46493b);return ImageManager[_0x8c385f(0x2ad)][_0x281723]||'';},ImageManager['getActorEquipSetMenuPortrait']=function(_0x3bb09a,_0x2d84fb,_0x4687dd){const _0x28a84d=_0x4ba74e;if(!_0x3bb09a||!_0x2d84fb||!_0x4687dd)return'';const _0x4fd6b9='Actor-%1-SetName-%2-Pieces-%3'[_0x28a84d(0x29c)](_0x3bb09a[_0x28a84d(0x270)](),_0x2d84fb[_0x28a84d(0x192)]()[_0x28a84d(0x275)](),_0x4687dd);return ImageManager['actorEquipSetMenuPortrait'][_0x4fd6b9]||'';},ImageManager[_0x4ba74e(0x174)]=function(_0x107a78,_0x2d90b9,_0x409755){const _0x46bcbb=_0x4ba74e;if(!_0x107a78||!_0x2d90b9||!_0x409755)return'';const _0x3312d2=_0x46bcbb(0x259)['format'](_0x107a78['actorId'](),_0x2d90b9[_0x46bcbb(0x192)]()[_0x46bcbb(0x275)](),_0x409755);return ImageManager['actorEquipSetBattlePortrait'][_0x3312d2]||'';},TextManager[_0x4ba74e(0x1a3)]=VisuMZ['EquipSetBonuses'][_0x4ba74e(0x17d)][_0x4ba74e(0x1e6)][_0x4ba74e(0x27d)],TextManager[_0x4ba74e(0x2cd)]=VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x17d)][_0x4ba74e(0x1e6)][_0x4ba74e(0x176)],TextManager[_0x4ba74e(0x2ba)]=VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x17d)]['Tooltip'][_0x4ba74e(0x2b2)],TextManager[_0x4ba74e(0x23c)]=VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x17d)][_0x4ba74e(0x1e6)][_0x4ba74e(0x1c6)],TextManager[_0x4ba74e(0x2d9)]=VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x17d)][_0x4ba74e(0x1e6)][_0x4ba74e(0x253)],TextManager[_0x4ba74e(0x16a)]=VisuMZ['EquipSetBonuses'][_0x4ba74e(0x17d)]['Tooltip'][_0x4ba74e(0x189)],TextManager[_0x4ba74e(0x238)]=VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x17d)][_0x4ba74e(0x1e6)]['AddNegFmt'],SceneManager[_0x4ba74e(0x2c6)]=function(){const _0x3855cc=_0x4ba74e,_0x2a38c4=this['_scene'];if(!_0x2a38c4)return;const _0x555b0c=_0x2a38c4[_0x3855cc(0x1de)];if(_0x555b0c)_0x555b0c[_0x3855cc(0x17b)]();},Game_BattlerBase[_0x4ba74e(0x26d)]=VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x17d)][_0x4ba74e(0x1a0)][_0x4ba74e(0x293)],Game_BattlerBase[_0x4ba74e(0x1b1)]=VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x17d)][_0x4ba74e(0x1a0)][_0x4ba74e(0x21c)],Game_BattlerBase[_0x4ba74e(0x2da)]=VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x17d)][_0x4ba74e(0x1a0)][_0x4ba74e(0x2b9)],Game_BattlerBase[_0x4ba74e(0x22a)][_0x4ba74e(0x1d6)]=function(_0x49ed3b,_0x2ba55e){return 0x0;},Game_BattlerBase['prototype'][_0x4ba74e(0x1ab)]=function(_0x461bea,_0x4a9838){return 0x1;},VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x287)]=Game_BattlerBase[_0x4ba74e(0x22a)][_0x4ba74e(0x233)],Game_BattlerBase[_0x4ba74e(0x22a)][_0x4ba74e(0x233)]=function(_0x51f7d1){const _0x13999d=_0x4ba74e;let _0x546202=VisuMZ[_0x13999d(0x1fc)][_0x13999d(0x287)][_0x13999d(0x217)](this,_0x51f7d1);return Game_BattlerBase[_0x13999d(0x26d)]===_0x13999d(0x261)&&(_0x13999d(0x1a4)===_0x13999d(0x245)?_0x31f418+=this[_0x13999d(0x1d6)](_0x13999d(0x198),_0x55b03a):_0x546202+=this[_0x13999d(0x1d6)](_0x13999d(0x1ff),_0x51f7d1)),_0x546202;},VisuMZ['EquipSetBonuses'][_0x4ba74e(0x2d3)]=Game_BattlerBase[_0x4ba74e(0x22a)][_0x4ba74e(0x1ea)],Game_BattlerBase[_0x4ba74e(0x22a)]['paramRate']=function(_0x85ad42){const _0x6a48a3=_0x4ba74e;let _0x5078c1=VisuMZ['EquipSetBonuses'][_0x6a48a3(0x2d3)][_0x6a48a3(0x217)](this,_0x85ad42);return _0x5078c1*this[_0x6a48a3(0x1ab)](_0x6a48a3(0x1ff),_0x85ad42);},VisuMZ['EquipSetBonuses'][_0x4ba74e(0x215)]=Game_BattlerBase['prototype'][_0x4ba74e(0x16f)],Game_BattlerBase[_0x4ba74e(0x22a)][_0x4ba74e(0x16f)]=function(_0x51b3db){const _0x23545b=_0x4ba74e;let _0xa2a5f5=VisuMZ[_0x23545b(0x1fc)][_0x23545b(0x215)][_0x23545b(0x217)](this,_0x51b3db);return Game_BattlerBase['EQUIP_SET_BASE_PARAM_PLUS_FLAT']==='flat'&&(_0xa2a5f5+=this['equipSetBonusParamPlus'](_0x23545b(0x1ff),_0x51b3db)),_0xa2a5f5;},VisuMZ['EquipSetBonuses']['Game_BattlerBase_xparamPlus']=Game_BattlerBase['prototype']['xparamPlus'],Game_BattlerBase[_0x4ba74e(0x22a)]['xparamPlus']=function(_0x299b82){const _0x290adb=_0x4ba74e;let _0x443fa8=VisuMZ['EquipSetBonuses'][_0x290adb(0x242)]['call'](this,_0x299b82);return Game_BattlerBase[_0x290adb(0x1b1)]==='plus'&&(_0x443fa8+=this[_0x290adb(0x1d6)](_0x290adb(0x25f),_0x299b82)),_0x443fa8;},VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x27c)]=Game_BattlerBase['prototype']['xparamRate'],Game_BattlerBase[_0x4ba74e(0x22a)][_0x4ba74e(0x235)]=function(_0x2ccd11){const _0x542184=_0x4ba74e;let _0x2f48aa=VisuMZ['EquipSetBonuses'][_0x542184(0x27c)][_0x542184(0x217)](this,_0x2ccd11);return _0x2f48aa*this[_0x542184(0x1ab)](_0x542184(0x25f),_0x2ccd11);},VisuMZ[_0x4ba74e(0x1fc)]['Game_BattlerBase_xparamFlatBonus']=Game_BattlerBase[_0x4ba74e(0x22a)][_0x4ba74e(0x1b0)],Game_BattlerBase[_0x4ba74e(0x22a)][_0x4ba74e(0x1b0)]=function(_0x5660ad){const _0x39c77b=_0x4ba74e;let _0x2a6b52=VisuMZ[_0x39c77b(0x1fc)][_0x39c77b(0x1c1)]['call'](this,_0x5660ad);return Game_BattlerBase[_0x39c77b(0x1b1)]===_0x39c77b(0x22b)&&(_0x2a6b52+=this[_0x39c77b(0x1d6)](_0x39c77b(0x25f),_0x5660ad)),_0x2a6b52;},VisuMZ['EquipSetBonuses'][_0x4ba74e(0x260)]=Game_BattlerBase[_0x4ba74e(0x22a)][_0x4ba74e(0x27e)],Game_BattlerBase['prototype'][_0x4ba74e(0x27e)]=function(_0x3c8b7d){const _0x2b4e69=_0x4ba74e;let _0x3cf1fc=VisuMZ[_0x2b4e69(0x1fc)][_0x2b4e69(0x260)]['call'](this,_0x3c8b7d);return Game_BattlerBase[_0x2b4e69(0x2da)]==='plus'&&(_0x3cf1fc+=this['equipSetBonusParamPlus'](_0x2b4e69(0x198),_0x3c8b7d)),_0x3cf1fc;},VisuMZ[_0x4ba74e(0x1fc)]['Game_BattlerBase_sparamRate']=Game_BattlerBase[_0x4ba74e(0x22a)][_0x4ba74e(0x2aa)],Game_BattlerBase['prototype'][_0x4ba74e(0x2aa)]=function(_0x1e5048){const _0x475c0e=_0x4ba74e;let _0x50816f=VisuMZ[_0x475c0e(0x1fc)][_0x475c0e(0x204)]['call'](this,_0x1e5048);return _0x50816f*this['equipSetBonusParamRate']('SParam',_0x1e5048);},VisuMZ['EquipSetBonuses'][_0x4ba74e(0x2cf)]=Game_BattlerBase[_0x4ba74e(0x22a)][_0x4ba74e(0x276)],Game_BattlerBase['prototype'][_0x4ba74e(0x276)]=function(_0x2f818b){const _0x462469=_0x4ba74e;let _0x35f895=VisuMZ[_0x462469(0x1fc)][_0x462469(0x2cf)][_0x462469(0x217)](this,_0x2f818b);return Game_BattlerBase[_0x462469(0x2da)]===_0x462469(0x22b)&&(_0x462469(0x1fa)===_0x462469(0x17f)?(_0x53ebf1[_0x462469(0x1fc)][_0x462469(0x2cc)][_0x462469(0x217)](this),this[_0x462469(0x248)]()):_0x35f895+=this[_0x462469(0x1d6)](_0x462469(0x198),_0x2f818b)),_0x35f895;},VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x247)]=Game_BattlerBase[_0x4ba74e(0x22a)][_0x4ba74e(0x1d1)],Game_BattlerBase[_0x4ba74e(0x22a)][_0x4ba74e(0x1d1)]=function(){const _0x1eeca3=_0x4ba74e;VisuMZ[_0x1eeca3(0x1fc)]['Game_BattlerBase_addPassiveStatesFromOtherPlugins']['call'](this),this['addPassiveStatesFromEquipSetBonuses']();},Game_BattlerBase['prototype']['addPassiveStatesFromEquipSetBonuses']=function(){},VisuMZ['EquipSetBonuses'][_0x4ba74e(0x296)]=Game_Actor['prototype'][_0x4ba74e(0x2b5)],Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x2b5)]=function(_0x24f265){const _0x185866=_0x4ba74e;VisuMZ[_0x185866(0x1fc)][_0x185866(0x296)][_0x185866(0x217)](this,_0x24f265),this[_0x185866(0x2a4)]();},VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x16c)]=Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x1f4)],Game_Actor['prototype']['releaseUnequippableItems']=function(_0x1d5f5d){const _0x55012d=_0x4ba74e;VisuMZ[_0x55012d(0x1fc)][_0x55012d(0x16c)][_0x55012d(0x217)](this,_0x1d5f5d),this[_0x55012d(0x2a4)]();},Game_Actor['prototype'][_0x4ba74e(0x274)]=function(_0x23b584){const _0x278664=_0x4ba74e;(this['_equipSetBonusSets']===undefined||this[_0x278664(0x182)]===undefined)&&this['refreshEquipSetBonuses']();},Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x2a4)]=function(){const _0x3d1b94=_0x4ba74e;this[_0x3d1b94(0x229)](),this[_0x3d1b94(0x2d6)]();if(this[_0x3d1b94(0x26e)])return;SceneManager[_0x3d1b94(0x2c6)]();},Game_Actor[_0x4ba74e(0x22a)]['clearEquipSetBonusCache']=function(){const _0xf415e4=_0x4ba74e;this[_0xf415e4(0x263)]=[],this[_0xf415e4(0x182)]={};},Game_Actor['prototype'][_0x4ba74e(0x2d6)]=function(){const _0x4fbf39=_0x4ba74e;for(const _0x90910b of this[_0x4fbf39(0x1ac)]()){if(!_0x90910b)continue;const _0x58103b=DataManager[_0x4fbf39(0x25d)](_0x90910b);for(const _0x101d3b of _0x58103b){_0x4fbf39(0x20e)!==_0x4fbf39(0x2d2)?(!this[_0x4fbf39(0x263)][_0x4fbf39(0x1e5)](_0x101d3b)&&this[_0x4fbf39(0x263)][_0x4fbf39(0x254)](_0x101d3b),this[_0x4fbf39(0x182)][_0x101d3b]=this[_0x4fbf39(0x182)][_0x101d3b]||0x0,this[_0x4fbf39(0x182)][_0x101d3b]++):(_0x20658d[_0x4fbf39(0x1fc)][_0x4fbf39(0x247)][_0x4fbf39(0x217)](this),this['addPassiveStatesFromEquipSetBonuses']());}}},Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x25d)]=function(){const _0x4e2c2f=_0x4ba74e;return this[_0x4e2c2f(0x274)](),this[_0x4e2c2f(0x263)];},Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x2ab)]=function(_0x4a6da7){const _0x1cf2da=_0x4ba74e;return this['checkRefreshEquipSetBonuses'](),_0x4a6da7=_0x4a6da7[_0x1cf2da(0x192)]()[_0x1cf2da(0x275)](),(this[_0x1cf2da(0x182)][_0x4a6da7]||0x0)[_0x1cf2da(0x246)](0x0,0x14);},Game_Actor['prototype'][_0x4ba74e(0x190)]=function(){const _0x43712d=_0x4ba74e;let _0x77846a=this[_0x43712d(0x25d)]()[_0x43712d(0x23e)]();return _0x77846a[_0x43712d(0x201)]((_0x289e41,_0x8a69ed)=>{const _0x5035d5=_0x43712d;if(_0x5035d5(0x1b9)!==_0x5035d5(0x1b9))this[_0x5035d5(0x268)]=_0x87c168;else{const _0x3b959b=this[_0x5035d5(0x2ab)](_0x289e41),_0x2642ae=this[_0x5035d5(0x2ab)](_0x8a69ed);if(_0x3b959b!==_0x2642ae)return _0x2642ae-_0x3b959b;return 0x0;}}),_0x77846a;},Game_Actor[_0x4ba74e(0x22a)]['equipSetBonusParamPlus']=function(_0x5181af,_0xdb0d93){const _0x583761=_0x4ba74e;this['checkRefreshEquipSetBonuses']();let _0x5db0a5=0x0;for(const _0x227c1e of this[_0x583761(0x25d)]()){if(_0x583761(0x19d)==='kWqEh'){const _0x43aec3=DataManager[_0x583761(0x24e)](_0x227c1e);if(!_0x43aec3)continue;const _0x498a88=this[_0x583761(0x2ab)](_0x227c1e);for(let _0x58e179=0x1;_0x58e179<=_0x498a88;_0x58e179++){if(_0x583761(0x2b1)==='GWzJV'){let _0x1628b2=_0xa09da6[_0x583761(0x1fc)][_0x583761(0x215)][_0x583761(0x217)](this,_0x557034);return _0xe69f2e['EQUIP_SET_BASE_PARAM_PLUS_FLAT']==='flat'&&(_0x1628b2+=this[_0x583761(0x1d6)]('Param',_0xe9c571)),_0x1628b2;}else{const _0x502b07=_0x583761(0x1bb)[_0x583761(0x29c)](_0x58e179);if(_0x43aec3[_0x502b07]&&_0x43aec3[_0x502b07][_0x5181af]){const _0x2a62b6=_0x583761(0x2a6)[_0x583761(0x29c)](_0xdb0d93);_0x5db0a5+=_0x43aec3[_0x502b07][_0x5181af][_0x2a62b6]||0x0;}}}}else{_0x7d4b39['setActiveWindow'](this);const _0x4d77e0=_0x52352c[_0x583761(0x2bf)]();_0x4d77e0===this&&_0xba68e8[_0x583761(0x19f)](this[_0x583761(0x2c7)]());}}return _0x5db0a5;},Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x1ab)]=function(_0x394855,_0x1b9488){const _0x1048e5=_0x4ba74e;this[_0x1048e5(0x274)]();let _0x1647d8=0x1;for(const _0x373f96 of this[_0x1048e5(0x25d)]()){const _0xe7a8c0=DataManager[_0x1048e5(0x24e)](_0x373f96);if(!_0xe7a8c0)continue;const _0x19fd00=this[_0x1048e5(0x2ab)](_0x373f96);for(let _0xe4ff26=0x1;_0xe4ff26<=_0x19fd00;_0xe4ff26++){const _0x4bfc15=_0x1048e5(0x1bb)['format'](_0xe4ff26);if(_0xe7a8c0[_0x4bfc15]&&_0xe7a8c0[_0x4bfc15][_0x394855]){const _0x19e2ca='Rate%1'[_0x1048e5(0x29c)](_0x1b9488);_0x1647d8*=Math['abs'](_0xe7a8c0[_0x4bfc15][_0x394855][_0x19e2ca]||0x1);}}}return _0x1647d8;},Game_Actor['prototype'][_0x4ba74e(0x19a)]=function(){const _0x19bc7f=_0x4ba74e;this[_0x19bc7f(0x274)]();const _0xf26cf=this['_cache'][_0x19bc7f(0x27f)];for(const _0x22c2d4 of this[_0x19bc7f(0x25d)]()){if(_0x19bc7f(0x1e1)===_0x19bc7f(0x1e1)){const _0x3ca1a2=DataManager['getEquipSetData'](_0x22c2d4);if(!_0x3ca1a2)continue;const _0x5328c4=this[_0x19bc7f(0x2ab)](_0x22c2d4);for(let _0x23937c=0x1;_0x23937c<=_0x5328c4;_0x23937c++){const _0x40d15c=_0x19bc7f(0x1bb)[_0x19bc7f(0x29c)](_0x23937c);if(_0x3ca1a2[_0x40d15c]&&_0x3ca1a2[_0x40d15c][_0x19bc7f(0x1cf)]){if(_0x19bc7f(0x1aa)===_0x19bc7f(0x269)){const _0x48d007='Piece%1'[_0x19bc7f(0x29c)](_0xa6661d);if(_0x2732f0[_0x48d007]&&_0x1e43c6[_0x48d007][_0x19bc7f(0x1cf)])for(const _0x5efd5c of _0x3efc1f[_0x48d007][_0x19bc7f(0x1cf)]){_0x30cfca['push'](_0x5efd5c);}}else for(const _0x7e3513 of _0x3ca1a2[_0x40d15c][_0x19bc7f(0x1cf)]){if(_0x19bc7f(0x1e3)!==_0x19bc7f(0x1e3)){if(!_0x51168b||!_0x49ae13||!_0xd57d1a)return'';const _0x48cfd0=_0x19bc7f(0x259)[_0x19bc7f(0x29c)](_0x2ae6f6[_0x19bc7f(0x270)](),_0x5a38d7[_0x19bc7f(0x192)]()[_0x19bc7f(0x275)](),_0x57e574);return _0x659675[_0x19bc7f(0x2ce)][_0x48cfd0]||'';}else _0xf26cf[_0x19bc7f(0x254)](_0x7e3513);}}}}else{let _0x3a0d1c=_0x4520b4[_0x19bc7f(0x1fc)]['Game_BattlerBase_xparamPlus'][_0x19bc7f(0x217)](this,_0x3f61c6);return _0x1d8969[_0x19bc7f(0x1b1)]==='plus'&&(_0x3a0d1c+=this[_0x19bc7f(0x1d6)](_0x19bc7f(0x25f),_0x9bfbb2)),_0x3a0d1c;}}},VisuMZ[_0x4ba74e(0x1fc)]['Game_Actor_setFaceImage']=Game_Actor[_0x4ba74e(0x22a)]['setFaceImage'],Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x209)]=function(_0x3d3f7b,_0x64638a){const _0x379b1c=_0x4ba74e;_0x3d3f7b!==''?(this[_0x379b1c(0x272)]=_0x3d3f7b,this['_priorityFaceIndex']=_0x64638a):(this[_0x379b1c(0x272)]=undefined,this[_0x379b1c(0x1d5)]=undefined);},VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x220)]=Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x262)],Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x262)]=function(){const _0x572558=_0x4ba74e;if(this['_priorityFaceName']!==undefined)return this[_0x572558(0x272)];const _0x35431c=this[_0x572558(0x190)]();for(const _0x44ca1f of _0x35431c){if(_0x572558(0x183)!=='lVjZA'){this[_0x572558(0x229)](),this[_0x572558(0x2d6)]();if(this[_0x572558(0x26e)])return;_0xdbdf0f[_0x572558(0x2c6)]();}else{const _0xb56fc=this[_0x572558(0x2ab)](_0x44ca1f),_0x6d7e96=ImageManager[_0x572558(0x29f)](this,_0x44ca1f,_0xb56fc);if(_0x6d7e96)return _0x6d7e96;}}return VisuMZ[_0x572558(0x1fc)][_0x572558(0x220)][_0x572558(0x217)](this);},VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x2d1)]=Game_Actor['prototype'][_0x4ba74e(0x178)],Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x178)]=function(){const _0x4829d0=_0x4ba74e;if(this[_0x4829d0(0x1d5)]!==undefined)return this[_0x4829d0(0x1d5)];const _0xa44687=this[_0x4829d0(0x190)]();for(const _0x415ca9 of _0xa44687){const _0x5a354f=this[_0x4829d0(0x2ab)](_0x415ca9),_0x4c497c=ImageManager[_0x4829d0(0x26f)](this,_0x415ca9,_0x5a354f);if(_0x4c497c!==undefined)return _0x4c497c;}return VisuMZ[_0x4829d0(0x1fc)][_0x4829d0(0x2d1)][_0x4829d0(0x217)](this);},VisuMZ['EquipSetBonuses'][_0x4ba74e(0x1d2)]=Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x21b)],Game_Actor['prototype']['setCharacterImage']=function(_0x57353b,_0x34c586){const _0x307f7d=_0x4ba74e;if(_0x57353b!==''){if('YNhRr'===_0x307f7d(0x224)){let _0x1d6356=_0x440f03['EquipSetBonuses'][_0x307f7d(0x260)]['call'](this,_0x4e262c);return _0x466e62[_0x307f7d(0x2da)]===_0x307f7d(0x261)&&(_0x1d6356+=this['equipSetBonusParamPlus'](_0x307f7d(0x198),_0x5556e0)),_0x1d6356;}else this[_0x307f7d(0x297)]=_0x57353b,this['_priorityCharacterIndex']=_0x34c586;}else{if(_0x307f7d(0x1f1)!=='QMrkM'){const _0x5412e7='Actor-%1-SetName-%2-Pieces-%3'['format'](_0x530f0e,_0x5646ab,_0x33e177);_0x20389b[_0x307f7d(0x2c1)][_0x5412e7]=_0x46a91d;}else this['_priorityCharacterName']=undefined,this['_priorityCharacterIndex']=undefined;}},VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x28b)]=Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x237)],Game_Actor['prototype'][_0x4ba74e(0x237)]=function(){const _0x3239d6=_0x4ba74e;if(this[_0x3239d6(0x297)]!==undefined)return this[_0x3239d6(0x297)];const _0x4e8e9e=this['getEquipSetsSortedByMostPieces']();for(const _0x381f86 of _0x4e8e9e){const _0x1f6427=this[_0x3239d6(0x2ab)](_0x381f86),_0x2d64ee=ImageManager[_0x3239d6(0x170)](this,_0x381f86,_0x1f6427);if(_0x2d64ee)return _0x2d64ee;}return VisuMZ[_0x3239d6(0x1fc)]['Game_Actor_characterName'][_0x3239d6(0x217)](this);},VisuMZ['EquipSetBonuses'][_0x4ba74e(0x199)]=Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x211)],Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x211)]=function(){const _0x22b5fc=_0x4ba74e;if(this[_0x22b5fc(0x181)]!==undefined)return this[_0x22b5fc(0x181)];const _0x1fff67=this[_0x22b5fc(0x190)]();for(const _0x51723f of _0x1fff67){if(_0x22b5fc(0x2c5)!==_0x22b5fc(0x250)){const _0x4e2c52=this[_0x22b5fc(0x2ab)](_0x51723f),_0x2fd587=ImageManager['getActorEquipSetCharacterIndex'](this,_0x51723f,_0x4e2c52);if(_0x2fd587!==undefined)return _0x2fd587;}else{const _0x18ad44=_0x22b5fc(0x259)[_0x22b5fc(0x29c)](_0x500063,_0x4f722f,_0x13a71c);_0x4d1773['actorEquipSetMenuPortrait'][_0x18ad44]=_0x3416b6;}}return VisuMZ['EquipSetBonuses'][_0x22b5fc(0x199)][_0x22b5fc(0x217)](this);},VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x212)]=Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x1bc)],Game_Actor['prototype'][_0x4ba74e(0x1bc)]=function(_0x46c12c){_0x46c12c!==''?this['_priorityBattlerName']=_0x46c12c:this['_priorityBattlerName']=undefined;},VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x22d)]=Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x1ba)],Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x1ba)]=function(){const _0x4d0b11=_0x4ba74e;if(this[_0x4d0b11(0x271)]!==undefined)return this[_0x4d0b11(0x271)];const _0x9ad93d=this[_0x4d0b11(0x190)]();for(const _0x280cba of _0x9ad93d){if('gDNUH'!=='gDNUH'){const _0x320708=_0x2cb163[_0x4d0b11(0x2d9)],_0x2afcb7=_0x4c42ed[_0x4d0b11(0x1d0)](_0x3d8456*0x64)+'%',_0x59a2ad=_0x320708[_0x4d0b11(0x29c)](_0x5f1c5e,_0x2afcb7);_0x51708c[_0x4d0b11(0x254)](_0x59a2ad);}else{const _0x3087f9=this[_0x4d0b11(0x2ab)](_0x280cba),_0x671723=ImageManager[_0x4d0b11(0x1ee)](this,_0x280cba,_0x3087f9);if(_0x671723)return _0x671723;}}return VisuMZ[_0x4d0b11(0x1fc)][_0x4d0b11(0x22d)][_0x4d0b11(0x217)](this);;},VisuMZ[_0x4ba74e(0x1fc)]['Game_Actor_setMenuImage']=Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x207)],Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x207)]=function(_0x3788aa){const _0x303199=_0x4ba74e;_0x3788aa!==''?this[_0x303199(0x1c8)]=_0x3788aa:this['_priorityMenuImage']=undefined;},VisuMZ['EquipSetBonuses']['Game_Actor_getMenuImage']=Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x243)],Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x243)]=function(){const _0x5565eb=_0x4ba74e;if(this[_0x5565eb(0x1c8)]!==undefined)return this[_0x5565eb(0x1c8)];const _0x32051a=this['getEquipSetsSortedByMostPieces']();for(const _0x1f5007 of _0x32051a){if(_0x5565eb(0x2b7)==='Pfbwo'){const _0x3e02ce=this[_0x5565eb(0x2ab)](_0x1f5007),_0x3736d7=ImageManager['getActorEquipSetMenuPortrait'](this,_0x1f5007,_0x3e02ce);if(_0x3736d7)return _0x3736d7;}else _0x47316d=_0x43067e[_0x5565eb(0x1cd)](_0x4c12cd,_0x968f95);}return VisuMZ[_0x5565eb(0x1fc)][_0x5565eb(0x196)][_0x5565eb(0x217)](this);;},VisuMZ['EquipSetBonuses']['Game_Actor_setBattlePortrait']=Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x285)],Game_Actor[_0x4ba74e(0x22a)][_0x4ba74e(0x285)]=function(_0x5addd9){const _0x3ddf93=_0x4ba74e;if(_0x5addd9!==''){if(_0x3ddf93(0x1e0)!==_0x3ddf93(0x1e0)){if(this['_priorityFaceName']!==_0x2b1ea2)return this[_0x3ddf93(0x272)];const _0xf8213e=this['getEquipSetsSortedByMostPieces']();for(const _0x41b53e of _0xf8213e){const _0x4f7ac6=this['getEquipSetPieces'](_0x41b53e),_0x26709c=_0x110b70[_0x3ddf93(0x29f)](this,_0x41b53e,_0x4f7ac6);if(_0x26709c)return _0x26709c;}return _0x4b88e9[_0x3ddf93(0x1fc)]['Game_Actor_faceName'][_0x3ddf93(0x217)](this);}else this[_0x3ddf93(0x268)]=_0x5addd9;}else _0x3ddf93(0x20a)==='LdKUb'?(_0x20b323['EquipSetBonuses'][_0x3ddf93(0x234)][_0x3ddf93(0x217)](this),this[_0x3ddf93(0x1d9)]()):this[_0x3ddf93(0x268)]=undefined;if(SceneManager[_0x3ddf93(0x267)]()&&$gameParty[_0x3ddf93(0x295)]()['includes'](this)){const _0x3bff14=SceneManager[_0x3ddf93(0x1c0)][_0x3ddf93(0x2bc)];if(_0x3bff14)_0x3bff14[_0x3ddf93(0x22e)](this);}},VisuMZ[_0x4ba74e(0x1fc)]['Game_Actor_getBattlePortraitFilename']=Game_Actor['prototype'][_0x4ba74e(0x232)],Game_Actor['prototype']['getBattlePortraitFilename']=function(){const _0x464a47=_0x4ba74e;if(this[_0x464a47(0x268)]!==undefined)return this[_0x464a47(0x268)];const _0x580b5b=this[_0x464a47(0x190)]();for(const _0xdbc9b3 of _0x580b5b){const _0x110a4a=this[_0x464a47(0x2ab)](_0xdbc9b3),_0x504423=ImageManager[_0x464a47(0x174)](this,_0xdbc9b3,_0x110a4a);if(_0x504423)return _0x504423;}return VisuMZ[_0x464a47(0x1fc)]['Game_Actor_getBattlePortraitFilename'][_0x464a47(0x217)](this);;},VisuMZ['EquipSetBonuses']['Scene_Base_createWindowLayer']=Scene_Base['prototype']['createWindowLayer'],Scene_Base[_0x4ba74e(0x22a)][_0x4ba74e(0x2a2)]=function(){const _0x7b31de=_0x4ba74e;VisuMZ[_0x7b31de(0x1fc)]['Scene_Base_createWindowLayer']['call'](this),this[_0x7b31de(0x289)]();},Scene_Base[_0x4ba74e(0x22a)][_0x4ba74e(0x289)]=function(){const _0x5e4336=_0x4ba74e;if(!Window_EquipSetBonusTooltip[_0x5e4336(0x256)])return;this['_equipSetBonusTooltipWindow']=new Window_EquipSetBonusTooltip(),this[_0x5e4336(0x1f8)](this[_0x5e4336(0x1de)]);},Scene_Base[_0x4ba74e(0x22a)][_0x4ba74e(0x29a)]=function(){const _0x12685b=_0x4ba74e;if(this['_equipSetBonusTooltipWindow']){if(_0x12685b(0x20c)===_0x12685b(0x20c))this['_equipSetBonusTooltipWindow'][_0x12685b(0x1a7)]();else{const _0x4fb325=this[_0x12685b(0x2ab)](_0x1328a4),_0x24adeb=_0x3d87bf[_0x12685b(0x26f)](this,_0x5d2904,_0x4fb325);if(_0x24adeb!==_0x568fde)return _0x24adeb;}}},Scene_Base[_0x4ba74e(0x22a)]['showEquipSetBonusTooltipWindow']=function(){const _0x27c8e7=_0x4ba74e;this[_0x27c8e7(0x1de)]&&this[_0x27c8e7(0x1de)]['refresh']();},VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x2b0)]=Scene_Shop[_0x4ba74e(0x22a)][_0x4ba74e(0x2c3)],Scene_Shop[_0x4ba74e(0x22a)][_0x4ba74e(0x2c3)]=function(){const _0x1e6051=_0x4ba74e;VisuMZ[_0x1e6051(0x1fc)]['Scene_Shop_onBuyOk'][_0x1e6051(0x217)](this),this[_0x1e6051(0x29a)]();},VisuMZ['EquipSetBonuses'][_0x4ba74e(0x1b3)]=Scene_Shop[_0x4ba74e(0x22a)][_0x4ba74e(0x24a)],Scene_Shop[_0x4ba74e(0x22a)][_0x4ba74e(0x24a)]=function(){const _0x56d497=_0x4ba74e;VisuMZ['EquipSetBonuses'][_0x56d497(0x1b3)][_0x56d497(0x217)](this),this[_0x56d497(0x29a)]();},VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x2bb)]=Scene_Shop[_0x4ba74e(0x22a)]['onNumberOk'],Scene_Shop[_0x4ba74e(0x22a)][_0x4ba74e(0x1da)]=function(){const _0x568d5d=_0x4ba74e;VisuMZ[_0x568d5d(0x1fc)][_0x568d5d(0x2bb)][_0x568d5d(0x217)](this),this[_0x568d5d(0x248)]();},VisuMZ['EquipSetBonuses'][_0x4ba74e(0x2cc)]=Scene_Shop[_0x4ba74e(0x22a)][_0x4ba74e(0x20d)],Scene_Shop['prototype'][_0x4ba74e(0x20d)]=function(){const _0x5d2a53=_0x4ba74e;VisuMZ['EquipSetBonuses'][_0x5d2a53(0x2cc)][_0x5d2a53(0x217)](this),this[_0x5d2a53(0x248)]();},Window_Selectable[_0x4ba74e(0x26c)]=['Window_BattleItem',_0x4ba74e(0x1db),_0x4ba74e(0x225),'Window_EquipSlot',_0x4ba74e(0x19c),'Window_ShopSell'],VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x18f)]=Window_Selectable[_0x4ba74e(0x22a)][_0x4ba74e(0x171)],Window_Selectable[_0x4ba74e(0x22a)][_0x4ba74e(0x171)]=function(_0x2c7737){const _0x679a25=_0x4ba74e;VisuMZ[_0x679a25(0x1fc)]['Window_Selectable_initialize'][_0x679a25(0x217)](this,_0x2c7737),this[_0x679a25(0x186)]();},Window_Selectable[_0x4ba74e(0x22a)][_0x4ba74e(0x186)]=function(){const _0x3d793f=_0x4ba74e;if(!this[_0x3d793f(0x231)]())return;const _0x1bd157=SceneManager[_0x3d793f(0x1c0)];if(!_0x1bd157)return;this[_0x3d793f(0x1de)]=_0x1bd157[_0x3d793f(0x1de)]||null,this['callUpdateHelp']();},Window_Selectable[_0x4ba74e(0x22a)][_0x4ba74e(0x231)]=function(){const _0xf45b50=_0x4ba74e;if(!Window_EquipSetBonusTooltip[_0xf45b50(0x256)])return![];return Window_Selectable['EQUIP_SET_BONUS_WINDOWS'][_0xf45b50(0x1e5)](this[_0xf45b50(0x206)][_0xf45b50(0x251)]);},VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x26a)]=Window_Selectable[_0x4ba74e(0x22a)][_0x4ba74e(0x218)],Window_Selectable[_0x4ba74e(0x22a)][_0x4ba74e(0x218)]=function(){const _0x1eeaf6=_0x4ba74e;VisuMZ[_0x1eeaf6(0x1fc)][_0x1eeaf6(0x26a)][_0x1eeaf6(0x217)](this),this[_0x1eeaf6(0x1a5)]();},Window_Selectable[_0x4ba74e(0x22a)][_0x4ba74e(0x1a5)]=function(){const _0x25d701=_0x4ba74e,_0x789c8a=this['_equipSetBonusTooltipWindow'];if(_0x789c8a&&this[_0x25d701(0x2c7)]){_0x789c8a['setActiveWindow'](this);const _0x517d3e=_0x789c8a[_0x25d701(0x2bf)]();if(_0x517d3e===this){if('YIFDg'!==_0x25d701(0x236)){if(!_0x35fba2||!_0x1850c5||!_0x5cd612)return _0xc22d1;const _0x4599b2=_0x25d701(0x259)[_0x25d701(0x29c)](_0x37b00d[_0x25d701(0x270)](),_0x3b4baa[_0x25d701(0x192)]()['trim'](),_0x4020ed);return _0x23befd['actorEquipSetFaceIndex'][_0x4599b2]||_0x2961e3;}else _0x789c8a[_0x25d701(0x19f)](this[_0x25d701(0x2c7)]());}}};function Window_EquipSetBonusTooltip(){const _0x2dd164=_0x4ba74e;this[_0x2dd164(0x171)](...arguments);}Window_EquipSetBonusTooltip['prototype']=Object[_0x4ba74e(0x1fd)](Window_Base[_0x4ba74e(0x22a)]),Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)]['constructor']=Window_EquipSetBonusTooltip,Window_EquipSetBonusTooltip[_0x4ba74e(0x256)]=VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x17d)][_0x4ba74e(0x1e6)]['Show'],Window_EquipSetBonusTooltip[_0x4ba74e(0x26b)]=VisuMZ['EquipSetBonuses'][_0x4ba74e(0x17d)][_0x4ba74e(0x1e6)]['Scale'],Window_EquipSetBonusTooltip['WINDOW_SKIN_FILENAME']=VisuMZ[_0x4ba74e(0x1fc)][_0x4ba74e(0x17d)][_0x4ba74e(0x1e6)][_0x4ba74e(0x18a)],Window_EquipSetBonusTooltip['WINDOW_SKIN_OPACITY']=VisuMZ[_0x4ba74e(0x1fc)]['Settings'][_0x4ba74e(0x1e6)][_0x4ba74e(0x27a)],Window_EquipSetBonusTooltip['MOUSE_OFFSET_X']=VisuMZ['EquipSetBonuses'][_0x4ba74e(0x17d)][_0x4ba74e(0x1e6)][_0x4ba74e(0x2b6)],Window_EquipSetBonusTooltip[_0x4ba74e(0x227)]=VisuMZ['EquipSetBonuses'][_0x4ba74e(0x17d)][_0x4ba74e(0x1e6)][_0x4ba74e(0x210)],Window_EquipSetBonusTooltip['prototype'][_0x4ba74e(0x171)]=function(){const _0x4b717b=_0x4ba74e,_0x5e008e=new Rectangle(0x0,0x0,Graphics[_0x4b717b(0x19b)],Graphics[_0x4b717b(0x1d8)]);Window_Base[_0x4b717b(0x22a)][_0x4b717b(0x171)][_0x4b717b(0x217)](this,_0x5e008e),this[_0x4b717b(0x244)]['x']=this[_0x4b717b(0x244)]['y']=Window_EquipSetBonusTooltip[_0x4b717b(0x26b)],this[_0x4b717b(0x1a7)](),this[_0x4b717b(0x28c)]=null,this['_activeWindow']=null;},Window_EquipSetBonusTooltip['prototype'][_0x4ba74e(0x241)]=function(){const _0x9b91b0=_0x4ba74e;this[_0x9b91b0(0x16d)]=ImageManager[_0x9b91b0(0x29d)](Window_EquipSetBonusTooltip[_0x9b91b0(0x1bf)]);},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)][_0x4ba74e(0x2a0)]=function(){const _0xa63c49=_0x4ba74e;this['backOpacity']=Window_EquipSetBonusTooltip[_0xa63c49(0x2d5)];},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)][_0x4ba74e(0x19f)]=function(_0x1f1b28){const _0x347b91=_0x4ba74e;if(this['_item']===_0x1f1b28)return;this['_item']=_0x1f1b28,this[_0x347b91(0x28c)]?this['requestRefresh']():this[_0x347b91(0x1a7)]();},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)][_0x4ba74e(0x2bf)]=function(){const _0x5426b9=_0x4ba74e;return this[_0x5426b9(0x18b)]||null;},Window_EquipSetBonusTooltip['prototype'][_0x4ba74e(0x2a5)]=function(_0x2b1acf){const _0x4564d8=_0x4ba74e;if(!_0x2b1acf['active'])return;this['_activeWindow']=_0x2b1acf,this[_0x4564d8(0x188)]();},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)][_0x4ba74e(0x1be)]=function(){const _0x368850=_0x4ba74e;this[_0x368850(0x258)][_0x368850(0x1f9)](),this[_0x368850(0x203)]();if(this[_0x368850(0x1df)][_0x368850(0x21e)]>0x0){this[_0x368850(0x1cb)]();const _0x33f3ae=this['baseTextRect']();this[_0x368850(0x1c3)](),this[_0x368850(0x1e8)](this[_0x368850(0x27b)][_0x368850(0x24f)]()),this[_0x368850(0x299)](this[_0x368850(0x1df)],_0x33f3ae['x'],_0x33f3ae['y'],_0x33f3ae['width']),this['show']();}else this[_0x368850(0x1a7)]();},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)][_0x4ba74e(0x1c5)]=function(_0x42c184){const _0x573812=_0x4ba74e;Window_Base[_0x573812(0x22a)][_0x573812(0x1c5)][_0x573812(0x217)](this,_0x42c184),_0x42c184[_0x573812(0x2cb)]&&this[_0x573812(0x1e8)](this['_lineOpacity'][_0x573812(0x24f)]());},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)][_0x4ba74e(0x18c)]=function(_0x33eed9){return _0x33eed9;},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)]['isSupportMessageKeywords']=function(){return![];},Window_EquipSetBonusTooltip['prototype']['setupText']=function(){const _0x38425d=_0x4ba74e;this[_0x38425d(0x1df)]='',this['_lineOpacity']=[];if(!this[_0x38425d(0x28c)])return;for(const _0x30e1ed of DataManager['getEquipSets'](this['_item'])){const _0x2f1ef2=DataManager['getEquipSetData'](_0x30e1ed);if(!_0x2f1ef2)continue;this['addSetDataText'](_0x2f1ef2);}this['_text']=this[_0x38425d(0x1df)]['trim']();},Window_EquipSetBonusTooltip['prototype']['addSetDataText']=function(_0x36dd0d){const _0x5803dc=_0x4ba74e;if(!_0x36dd0d)return;const _0x49daf3=_0x36dd0d[_0x5803dc(0x177)],_0x4c7bd0=_0x36dd0d['Icon']?_0x5803dc(0x25b)[_0x5803dc(0x29c)](_0x36dd0d[_0x5803dc(0x2ca)]):'';this[_0x5803dc(0x1df)]+=TextManager[_0x5803dc(0x1a3)][_0x5803dc(0x29c)](_0x49daf3,_0x4c7bd0)+'\x0a',this['_lineOpacity']['push'](!![]);for(let _0x42a965=0x1;_0x42a965<=0x14;_0x42a965++){const _0x3f0177=_0x36dd0d[_0x5803dc(0x1bb)['format'](_0x42a965)];this[_0x5803dc(0x1fe)](_0x36dd0d,_0x3f0177,_0x42a965);}},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)][_0x4ba74e(0x1fe)]=function(_0x5ad042,_0x3ba0a4,_0x5357f7){const _0x34c3a6=_0x4ba74e;if(!_0x3ba0a4)return;if(_0x3ba0a4['Text']===undefined)return;if(!_0x3ba0a4['ShowText'])return;let _0x1ee3a3='';if(_0x3ba0a4[_0x34c3a6(0x2a8)][_0x34c3a6(0x2a3)]()[_0x34c3a6(0x275)]()!==_0x34c3a6(0x216))'bYwtF'!==_0x34c3a6(0x1a6)?_0x1ee3a3=_0x3ba0a4[_0x34c3a6(0x2a8)]+'\x0a':_0x340efa+=this[_0x34c3a6(0x1d6)](_0x34c3a6(0x1ff),_0x2a20e7);else{if(_0x34c3a6(0x22f)!==_0x34c3a6(0x17a))_0x1ee3a3=this[_0x34c3a6(0x2bd)](_0x3ba0a4);else{const _0x5c4248=_0x34c3a6(0x259)[_0x34c3a6(0x29c)](_0x65f152,_0x1ecd68,_0x43c7dc);_0x41d5d3[_0x34c3a6(0x2ce)][_0x5c4248]=_0x1fe08a,_0x14a0f8[_0x34c3a6(0x280)][_0x5c4248]=_0x1f175e;}}if(_0x1ee3a3['trim']()!==''){if(_0x34c3a6(0x29e)!=='dnvTU'){const _0x4e3586=this[_0x34c3a6(0x1f3)](this['_text']);this[_0x34c3a6(0x19b)]=_0x4e3586['width']+(this[_0x34c3a6(0x24d)]()+this[_0x34c3a6(0x221)])*0x2,this[_0x34c3a6(0x1d8)]=_0x4e3586[_0x34c3a6(0x1d8)]+this['padding']*0x2,this[_0x34c3a6(0x20f)](),this[_0x34c3a6(0x1c3)]();}else this[_0x34c3a6(0x1df)]+=TextManager['equipSetPieceFmt'][_0x34c3a6(0x29c)](_0x5357f7,_0x1ee3a3)+'\x0a',this[_0x34c3a6(0x28e)](_0x5ad042,_0x5357f7);}},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)][_0x4ba74e(0x2bd)]=function(_0x323209){const _0x321ebc=_0x4ba74e;let _0x349e21='';const _0x3d8a81=[];if(_0x323209[_0x321ebc(0x1cf)]){if(_0x321ebc(0x286)===_0x321ebc(0x294)){if(this[_0x321ebc(0x1d5)]!==_0x1b3017)return this[_0x321ebc(0x1d5)];const _0x506a95=this['getEquipSetsSortedByMostPieces']();for(const _0x38eca9 of _0x506a95){const _0x5dac2c=this['getEquipSetPieces'](_0x38eca9),_0x35fc94=_0x3f4257[_0x321ebc(0x26f)](this,_0x38eca9,_0x5dac2c);if(_0x35fc94!==_0x19609f)return _0x35fc94;}return _0x3525d5[_0x321ebc(0x1fc)][_0x321ebc(0x2d1)][_0x321ebc(0x217)](this);}else for(const _0x2bfb5b of _0x323209['PassiveStates']){if(_0x321ebc(0x1fb)!==_0x321ebc(0x1fb))this['_equipSetBonusTooltipWindow']&&this[_0x321ebc(0x1de)][_0x321ebc(0x1a7)]();else{const _0x2177df=$dataStates[_0x2bfb5b];if(!_0x2177df)continue;if(_0x2177df[_0x321ebc(0x1ec)]<=0x0)continue;if(_0x2177df['name'][_0x321ebc(0x275)]()==='')continue;if(_0x2177df[_0x321ebc(0x251)][_0x321ebc(0x1c2)](/-----/i))continue;const _0x56fe0a=_0x321ebc(0x25b)[_0x321ebc(0x29c)](_0x2177df[_0x321ebc(0x1ec)]),_0xbddaa9=TextManager[_0x321ebc(0x23c)]['format'](_0x2177df['name'],_0x56fe0a);_0x3d8a81[_0x321ebc(0x254)](_0xbddaa9);}}}if(_0x323209[_0x321ebc(0x1ff)]){if(_0x321ebc(0x1ce)==='cSQHb'){const _0x1a8951=[_0x321ebc(0x292),_0x321ebc(0x1cc),'ATK',_0x321ebc(0x18e),_0x321ebc(0x173),_0x321ebc(0x288),_0x321ebc(0x226),'LUK'],_0x1236ff=this['createAutoParamText'](_0x323209,_0x321ebc(0x1ff),_0x1a8951);while(_0x1236ff[_0x321ebc(0x21e)]>0x0)_0x3d8a81[_0x321ebc(0x254)](_0x1236ff[_0x321ebc(0x24f)]());}else{const _0x32f485=_0x321ebc(0x1f7)['format'](_0x2129ab);_0x5f97a6*=_0x5630cc['abs'](_0x27752c[_0x68dfc6][_0x322cf2][_0x32f485]||0x1);}}if(_0x323209[_0x321ebc(0x25f)]){if(_0x321ebc(0x266)!==_0x321ebc(0x266))this[_0x321ebc(0x1c8)]=_0x12a447;else{const _0x2ef20a=[_0x321ebc(0x1e4),'EVA',_0x321ebc(0x20b),_0x321ebc(0x187),'MEV',_0x321ebc(0x25e),_0x321ebc(0x2c4),_0x321ebc(0x1b2),'MRG',_0x321ebc(0x277)],_0x10cb8f=this[_0x321ebc(0x222)](_0x323209,'XParam',_0x2ef20a);while(_0x10cb8f[_0x321ebc(0x21e)]>0x0)_0x3d8a81[_0x321ebc(0x254)](_0x10cb8f['shift']());}}if(_0x323209[_0x321ebc(0x198)]){const _0x2d0dec=[_0x321ebc(0x1a9),_0x321ebc(0x195),_0x321ebc(0x1dc),_0x321ebc(0x2af),'MCR','TCR','PDR','MDR',_0x321ebc(0x21f),'EXR'],_0x1992ab=this[_0x321ebc(0x222)](_0x323209,_0x321ebc(0x198),_0x2d0dec);while(_0x1992ab[_0x321ebc(0x21e)]>0x0)_0x3d8a81[_0x321ebc(0x254)](_0x1992ab['shift']());}for(const _0x2965b6 of _0x3d8a81){if(_0x321ebc(0x1c4)!==_0x321ebc(0x1c4)){const _0x4ebae3=_0x321ebc(0x259)['format'](_0x1508d4,_0x1dffe6,_0x133bd3);_0x59d56c['actorEquipSetBattlePortrait'][_0x4ebae3]=_0x1c9ad6;}else{if(_0x2965b6[_0x321ebc(0x21e)]<=0x0)continue;_0x349e21[_0x321ebc(0x21e)]<=0x0?_0x349e21+=_0x2965b6:_0x321ebc(0x1c7)===_0x321ebc(0x1c7)?_0x349e21=TextManager[_0x321ebc(0x2ba)][_0x321ebc(0x29c)](_0x349e21,_0x2965b6):this['windowskin']=_0x5c09be[_0x321ebc(0x29d)](_0x5d5ff2['WINDOW_SKIN_FILENAME']);}}return _0x349e21[_0x321ebc(0x275)]();},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)][_0x4ba74e(0x222)]=function(_0x47fbc0,_0x5b5ca9,_0x149dbd){const _0x1ddefc=_0x4ba74e,_0x2100bb=[],_0xd20cfa=_0x149dbd[_0x1ddefc(0x21e)];for(let _0x53bf63=0x0;_0x53bf63<_0xd20cfa;_0x53bf63++){if(_0x1ddefc(0x21d)!==_0x1ddefc(0x21d)){const _0x414ebb=_0x2fb904['actor'](),_0x4be5f2=_0x4942fd['SetName']['toUpperCase']()[_0x1ddefc(0x275)](),_0x3629c5=_0x414ebb[_0x1ddefc(0x2ab)](_0x4be5f2);this[_0x1ddefc(0x27b)][_0x1ddefc(0x254)](_0x3629c5>=_0x1b18c2);}else{const _0x3208a0=TextManager[_0x1ddefc(0x28a)](_0x149dbd[_0x53bf63]),_0x523629=Number(_0x47fbc0[_0x5b5ca9][_0x1ddefc(0x1f7)[_0x1ddefc(0x29c)](_0x53bf63)]||0x1),_0x40ea2a=Number(_0x47fbc0[_0x5b5ca9]['Plus%1'[_0x1ddefc(0x29c)](_0x53bf63)]||0x0);if(_0x523629!==0x1){const _0x44761b=TextManager[_0x1ddefc(0x2d9)],_0x2bf451=Math[_0x1ddefc(0x1d0)](_0x523629*0x64)+'%',_0x45ee0e=_0x44761b['format'](_0x3208a0,_0x2bf451);_0x2100bb[_0x1ddefc(0x254)](_0x45ee0e);}if(_0x40ea2a!==0x0){const _0x5d7128=_0x40ea2a>0x0?TextManager[_0x1ddefc(0x16a)]:TextManager[_0x1ddefc(0x238)];let _0x1cffcf=Math[_0x1ddefc(0x17c)](_0x40ea2a);if(_0x5b5ca9!==_0x1ddefc(0x1ff)){if(_0x1ddefc(0x2ae)==='oEMKE')return _0x3087f1;else _0x1cffcf=Math[_0x1ddefc(0x1d0)](_0x1cffcf*0x64)+'%';}const _0x16328e=_0x5d7128[_0x1ddefc(0x29c)](_0x3208a0,_0x1cffcf);_0x2100bb[_0x1ddefc(0x254)](_0x16328e);}}}return _0x2100bb;},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)][_0x4ba74e(0x28e)]=function(_0x3d2840,_0x36fc1f){const _0x23b119=_0x4ba74e,_0x1c9e0a=SceneManager[_0x23b119(0x1c0)];if(['Scene_Equip'][_0x23b119(0x1e5)](_0x1c9e0a['constructor']['name'])){const _0xb66622=_0x1c9e0a[_0x23b119(0x1a2)](),_0x38d59b=_0x3d2840[_0x23b119(0x177)][_0x23b119(0x192)]()[_0x23b119(0x275)](),_0x42c3ce=_0xb66622[_0x23b119(0x2ab)](_0x38d59b);this[_0x23b119(0x27b)][_0x23b119(0x254)](_0x42c3ce>=_0x36fc1f);}else this['_lineOpacity'][_0x23b119(0x254)](!![]);},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)]['resizeWindow']=function(){const _0x38b597=_0x4ba74e,_0x854bc0=this[_0x38b597(0x1f3)](this[_0x38b597(0x1df)]);this['width']=_0x854bc0[_0x38b597(0x19b)]+(this['itemPadding']()+this['padding'])*0x2,this['height']=_0x854bc0['height']+this['padding']*0x2,this[_0x38b597(0x20f)](),this[_0x38b597(0x1c3)]();},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)]['update']=function(){const _0x210de7=_0x4ba74e;Window_Base['prototype']['update'][_0x210de7(0x217)](this),this[_0x210de7(0x197)]&&(_0x210de7(0x265)!==_0x210de7(0x265)?this[_0x210de7(0x171)](...arguments):(this[_0x210de7(0x197)]=![],this['refresh']())),this[_0x210de7(0x188)]();},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)][_0x4ba74e(0x17b)]=function(){this['_requestRefresh']=!![];},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)][_0x4ba74e(0x188)]=function(){const _0x3ca7f2=_0x4ba74e;if(!this[_0x3ca7f2(0x255)])return;if(!this['_activeWindow'])return;if(!this[_0x3ca7f2(0x18b)]['active'])return;const _0xdf44f2=SceneManager[_0x3ca7f2(0x1c0)][_0x3ca7f2(0x1c9)],_0x7ff807=this[_0x3ca7f2(0x18b)][_0x3ca7f2(0x208)](this['_activeWindow']['index']()),_0x1324fb=this[_0x3ca7f2(0x18b)][_0x3ca7f2(0x221)],_0x3bdc29=this[_0x3ca7f2(0x1d8)]*(Window_EquipSetBonusTooltip[_0x3ca7f2(0x26b)]||0.01);this['x']=this[_0x3ca7f2(0x18b)]['x']+_0xdf44f2['x']+_0x7ff807['x']+_0x1324fb+Window_EquipSetBonusTooltip['MOUSE_OFFSET_X'],this['y']=this[_0x3ca7f2(0x18b)]['y']+_0xdf44f2['y']+_0x7ff807['y']+Math[_0x3ca7f2(0x2d7)](_0x7ff807[_0x3ca7f2(0x1d8)]/0x2)+_0x1324fb+Window_EquipSetBonusTooltip['MOUSE_OFFSET_Y'],this['y']+_0x3bdc29>Graphics[_0x3ca7f2(0x1d8)]&&(this['y']=this[_0x3ca7f2(0x18b)]['y']+_0xdf44f2['y']+_0x7ff807['y']+Math[_0x3ca7f2(0x2d7)](_0x7ff807[_0x3ca7f2(0x1d8)]/0x2)-_0x3bdc29-Window_EquipSetBonusTooltip[_0x3ca7f2(0x227)]),this[_0x3ca7f2(0x283)]();},Window_EquipSetBonusTooltip[_0x4ba74e(0x22a)][_0x4ba74e(0x283)]=function(){const _0xa7552a=_0x4ba74e,_0x2e877c=this['width']*(Window_EquipSetBonusTooltip[_0xa7552a(0x26b)]||0.01),_0x16f7c0=this['height']*(Window_EquipSetBonusTooltip['WINDOW_SCALE']||0.01);this['x']=Math[_0xa7552a(0x2d7)](this['x']['clamp'](0x0,Graphics['width']-_0x2e877c)),this['y']=Math['round'](this['y'][_0xa7552a(0x246)](0x0,Graphics[_0xa7552a(0x1d8)]-_0x16f7c0));};