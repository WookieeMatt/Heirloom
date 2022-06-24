//=============================================================================
// VisuStella MZ - Battle A.I.
// VisuMZ_3_BattleAI.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BattleAI = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleAI = VisuMZ.BattleAI || {};
VisuMZ.BattleAI.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.18] [BattleAI]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_AI_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This Battle A.I. plugin changes up how enemies and any Auto Battle actors
 * behave by implementing many new key components to their decision making
 * process in battle. These new compotents are: A.I. Styles, A.I. Levels, 
 * Rating Variance, A.I. Conditions, and Influencing TGR Weight.
 *
 * With these new key components put together, you can transform RPG Maker MZ's
 * highly primitive A.I. into something more intelligent. Auto Battle actors
 * can also base their A.I. patterns off an enemy's A.I. in order to behave in
 * more desirable ways during battle as well.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Different A.I. Styles to allow for various ways to setup enemy A.I.
 * * Set A.I. Levels for enemies and Auto Battle actors.
 * * A.I. Levels can be set on a global scale or individual scale.
 * * Set rating variance levels to prioritize actions or randomize them.
 * * These include notetags to change them on a per individual basis.
 * * Create action conditions to make certain skills usable by the A.I. under
 *   specific circumstances.
 * * Action conditions are split between 'ALL' and 'ANY' types which require
 *   either all conditions to be met or at least one condition to be met.
 * * A large selection of condition notetags to use to help customize the best
 *   case situations on when to use a skill and which target to pick.
 * * Default condition settings can be made in the Plugin Parameters to make an
 *   entire database of skills become conditional for A.I. usage.
 * * Influence TGR weight to make certain targets more desirable for specific
 *   types of actions.
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
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
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
 * Auto Battle A.I. for Actors
 *
 * - With this plugin, there is an option to let certain classes reference
 * specific enemy A.I. patterns to decide which skills to use during battle.
 * If the reference option is not used, the actor will use default Auto Battle
 * evaluations to determine which skills to use instead.
 *
 * ---
 * 
 * A.I. Styles
 * 
 * - There are currently four different A.I. Styles. Actors and enemies can
 * default to a different one globally, or changed individually using notetags.
 * Read more about them in the A.I. Styles section.
 * 
 * ---
 *
 * A.I. Levels
 *
 * - Enemies and actors can be given different A.I. Levels. The higher one's
 * A.I. Level, the more they are to follow conditions. With Level 100 A.I.
 * Level, an A.I. will never disobey a condition. On the other hand, lower
 * A.I. Levels may possibly ignore certain conditions and act as if they are
 * fulfilled.
 *
 * ---
 *
 * A.I. Rating Variance
 *
 * - In the RPG Maker database editor, when deciding an enemy's Action Patterns
 * you can decide on the action's "rating". The rating is a value from 1 to 9
 * where 9 gets the highest priority and 1 gets the lowest. RPG Maker, by
 * default, will sometimes dip the rating a few levels lower to allow lower
 * ratings and bypass the priority system.
 *
 * - This plugin allows you to set the variance level through Plugin Parameters
 * on a global scale or notetags on an individual basis to allow for larger,
 * smaller, or no variance on ratings at all.
 *
 * ---
 *
 * A.I. Conditions for Skill Usage
 *
 * - Enemies and any actors that use Auto Battle A.I. with a reference can only
 * use certain skills as long as specific conditions have been met. These
 * conditions are split between 'ALL' condition sets and 'ANY' condition sets.
 *
 * - 'ALL' condition sets require all of the set's conditions to be met in
 * order for the skill to be used by the A.I.
 *
 * - 'ANY' condition sets require at least one of the set's conditions to be
 * met in order for the skill to be used by the A.I.
 *
 * - A variety of conditions can be inserted into each condition set to make
 * for some very specific usage conditions. These will also help filter out
 * which targets to pick from, too.
 *
 * ---
 *
 * TGR Weight on A.I. Target Selection
 *
 * - TGR is a special parameter in RPG Maker MZ that represents "Target Rate".
 * The higher one's TGR, the more likely they are to become the target of an
 * attack. This plugin allows various things to influence the TGR weight to
 * make certain targets more likely to be targets for attack.
 *
 * - Elemental influence rates on the TGR weight mean that if a target receives
 * more damage from an elemental attack, the TGR weight becomes higher for that
 * skill when determining a target. The higher the elemental damage received,
 * the more the TGR weight shifts upward.
 *
 * - Evasion and Magic Evasion rates do the opposite. The higher a potential
 * target's evasion and magic evasion rate is (for physical and magical skills)
 * the lower the TGR weight becomes for that potential target.
 *
 * - By default Plugin Parameter settings, TGR weight shifting requires the
 * enemy troop to have "knowledge" on the party's element rates, evasion, and
 * magic evasion properties. Enemy troops would have to hit actors with element
 * based attacks to learn the actor's resistance levels, physical attacks to
 * learn the actor's evasion, and magical attacks to learn the actor's magic
 * evasion levels.
 *
 * ---
 *
 * ============================================================================
 * A.I. Styles
 * ============================================================================
 * 
 * There are currently four different A.I. Styles. These determine how the
 * A.I. acts and behaves. You can change the A.I. Style used globally through
 * the Plugin Parameters or individually for classes and enemies through the
 * usage of notetags.
 * 
 * Read below to understand each style and its rules:
 * 
 * ---
 * 
 * Classic Style
 * 
 * "Classic" style is the traditional and default RPG Maker MZ A.I. style.
 * It puts emphasis on the Rating system, where skills with higher ratings are
 * given more priority than skills with lower ratings within variance.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - Priority is given towards actions with higher Ratings.
 * - Rating variance will be determined by Plugin Parameters and/or notetags.
 * - A.I. Level can affect whether or not A.I. Conditions would be ignored.
 * - After applying Ratings, Rating Variances, and A.I. Conditions, if there
 *   are still multiple actions to choose from, pick from the remaining actions
 *   randomly.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Gambit Style
 * 
 * - "Gambit" style is the style from Yanfly Engine Plugin's Battle A.I. Core.
 * It goes down the list of skills and uses them in order as long as they meet
 * the Action Pattern conditions and A.I. conditions. Ratings will be ignored.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - Priority is given towards actions located higher on the list.
 * - Actions towards the bottom of the list will have lower priority.
 * - Ratings and Rating Variance has no bearing on whether or not an action
 *   will be picked.
 * - A.I. Level can affect whether or not A.I. Conditions would be ignored.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Casual Style
 * 
 * - "Casual" style takes a lighter approach to A.I. It ignores the Ratings
 * system and doesn't care about the order of actions either. Instead, the
 * only thing this A.I. Style cares about are the A.I. Conditions. All valid
 * actions after that are randomly picked from.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - There is no priority system for Ratings or Order.
 * - A.I. Level does not matter here.
 * - A random action will be selected from a group of remaining valid actions.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Random Style
 * 
 * - "Random" style simply does not care about ratings or order. It only cares
 * if the skill's can be used (can pay for the cost) and Action Pattern
 * conditions. It does not care about A.I. Conditions, Ratings, or Order.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions are ignored.
 * - There is no priority system for Ratings or Order.
 * - A.I. Level does not matter here.
 * - A random action will be selected from a group of remaining valid actions.
 * - If no actions are valid, then do nothing.
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
 * === General A.I. Settings Notetags ===
 *
 * These notetags set the general A.I. related settings for enemies and any
 * actors that use A.I. (requires Auto Battle and has a reference A.I.).
 *
 * ---
 * 
 * <AI Style: x>
 * 
 * - Used for: Class, Enemy Notetags
 * - Replace 'x' with 'Classic', 'Gambit', 'Casual', or 'Random' without the
 *   quotes. Example: <AI Style: Gambit>
 * - Determines the A.I. style used. Refer to the A.I. Styles section on the
 *   various types of styles.
 * - For actors, place this inside the associated class's notebox instead.
 * - For actors, this does not apply if there is no referenced enemy A.I. list.
 * - Setup the reference enemy through either the Plugin Parameters or by using
 *   the <Reference AI: Enemy id> notetag found below.
 * 
 * ---
 *
 * <AI Level: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Designates the unit's A.I. level if A.I. is to be used.
 * - Replace 'x' with a number from 0 to 100.
 * - Units with higher A.I. Levels will be more strict about conditions.
 * - Units with lower A.I. Levels will be more lax about conditions.
 *
 * ---
 *
 * <AI Rating Variance: x>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the variance amount when determining A.I. actions by rating.
 * - Replace 'x' with a number between 0 and 9.
 * - 0 for no variance.
 * - Lower numbers for less variance.
 * - Higher numbers for more variance.
 *
 * ---
 *
 * <Reference AI: Enemy id>
 * <Reference AI: name>
 *
 * - Used for: Class Notetags
 * - Causes any actor using this class that has the Auto Battle trait to use
 *   a specific enemy's attack pattern (ratings, conditions, etc.) to determine
 *   which skill to use in battle.
 * - Replace 'id' with a number representing the enemy's ID to reference.
 * - Replace 'name' with the name the enemy to reference.
 * - Actors are only able to use skills they would normally have access to.
 *   - Actors need to have LEARNED the skill.
 *   - Actors need to be able to access the skill's SKILL TYPE.
 *   - Actors need to have the RESOURCES to pay for the skill.
 * - If you cannot figure out why an auto battle actor cannot use a specific
 *   skill, turn OFF auto battle and see if you can use the skill normally.
 *
 * ---
 *
 * <No Reference AI>
 *
 * - Used for: Class Notetags
 * - Prevents the class from using any enemies as their reference A.I. pattern
 *   (including the one set in the Plugin Parameters).
 *
 * ---
 *
 * === Skill A.I. Condition Notetags ===
 *
 * Insert these notetags into the noteboxes of skills that you'd like to give
 * custom A.I. conditions for. The 'All' version of the notetags require every
 * condition to be met while the 'Any' version of the notetags require only one
 * of the conditions to be met. 
 *
 * If both are used together, then the 'All' conditions must be completely
 * fulfilled while the 'Any' conditions need only one to be fulfilled.
 *
 * ---
 *
 * <All AI Conditions>
 *  condition
 *  condition
 *  condition
 * </All AI Conditions>
 * 
 * - Used for: Skill
 * - Add/remove as many conditions as needed for the skill.
 * - All conditions must be met in order for this to become a valid skill for
 *   the AI to use.
 * - This can be used together with <Any AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'All' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <Any AI Conditions>
 *  condition
 *  condition
 *  condition
 * </Any AI Conditions>
 * 
 * - Used for: Skill
 * - Add/remove as many conditions as needed for the skill.
 * - As long as one condition is met, this becomes a valid skill for the AI
 *   to use. If none of them are met, this skill becomes invalid for AI use.
 * - This can be used together with <All AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'Any' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <No AI Conditions>
 * 
 * - Used for: Skill
 * - Removes any default 'All' and 'Any' conditions for this skill.
 * 
 * ---
 *
 * -=-=- Condition List -=-=-
 *
 * Replace 'condition' in the notetags in the above section with any of the
 * following to make conditions. These conditions are also used in the Plugin
 * Parameters for the default conditions, too.
 *
 * ---
 *
 * x >= y
 * x > y
 * x === y
 * x !== y
 * x < y
 * x <= y
 *
 * - Replace 'x' and 'y' with any of the following:
 *
 * - A numeric value representing a hard number.
 * - '50%' or any other percentile number to represent a rate.
 * - '0.5' or any other float number to represent a rate.
 *
 * - 'Variable x' (replace 'x' with a number) for variable x's current value.
 *
 * - 'HP%', 'MP%', 'TP%' for HP, MP, and TP rates respectively.
 * - 'MaxHP', 'MaxMP', 'MaxTP' for the potential target's respective values.
 * - 'Level' for the potential target's level. Requires VisuMZ_0_CoreEngine for
 *   this to affect enemies.
 * - 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK' for the potential target's total
 *   parameter value.
 *
 * - 'param Buff Stacks' for the potential target's current Buff stacks.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 * - 'param Debuff Stacks' for the potential target's current Debuff stacks.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * - 'param Buff Turns' for potential target's current buff turn duration.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - Returns 0 if the potential target is not affected by that buff.
 * - 'param Debuff Turns' for potential target's current debuff turn duration.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - Returns 0 if the potential target is not affected by that debuff.
 *
 * - 'State id Turns' or 'State name Turns' for potential target's current turn
 *   duration on that particular state.
 *   - Replace 'id' with a number representing the ID of the state.
 *   - Replace 'name' with the state's name.
 *   - Returns 0 if the potential target is not affected by that state.
 *   - Returns the max safe number value if the potential target is has that
 *     state as a passive state.
 *
 * - 'Element id Rate', 'Element name Rate', 'name Element Rate'
 *   - Returns a (float) value of the potential target's element's rate.
 *   - Replace 'id' with the ID of the element whose rate is to be checked.
 *   - Replace 'name' with the name of the element whose rate is to be checked.
 *     - Ignore any text codes in the element name.
 *
 * - 'Team Alive Members'
 *   - Returns a number value indicating how many alive members there are on
 *     the potential target's team.
 *
 * - 'Team Dead Members'
 *   - Returns a number value indicating how many dead members there are on
 *     the potential target's team.
 * 
 * - When no keyword matches are found, the comparison value will be
 *   interpreted as JavaScript code. If the JavaScript code fails, it will
 *   default to a 0 value.
 * 
 *   *NOTE* JavaScript cannot be used without comparison operators to reduce
 *   error. This means if you want to check if a switch is on or not, don't
 *   simply use "$gameSwitches.value(42)" as it does not have any comparison
 *   operators. Instead, use "$gameSwitches.value(42) === true" to check.
 *
 *   *NOTE* To make any of these conditions base off of the user instead, add
 *   the word 'user' before the condition as such:
 *
 *   user hp% >= 0.50
 *   user atk buff stacks === 2
 *   user team alive members < 3
 *
 * ---
 *
 * Always
 *
 * - Going to be valid no matter what.
 *
 * ---
 *
 * x% Chance
 * 
 * - Replace 'x' with a number value representing the percent chance this skill
 *   would pass as valid.
 *
 * ---
 *
 * Switch x On
 * Switch x Off
 *
 * - Replace 'x' with the ID of the switch to check as ON/OFF.
 *
 * ---
 *
 * User is Actor
 * User is Enemy
 * Target is Actor
 * Target is Enemy
 *
 * - Requires the user or potential target to be an actor/enemy.
 *
 * ---
 *
 * User Has State id
 * User Has State name
 * Target Has State id
 * Target Has State name
 *
 * - Replace 'id' with the ID of the state the user or potential target needs
 *   to have.
 * - Replace 'name' with the name of the state the target needs to have.
 *
 * ---
 *
 * User Not State id
 * User Not State name
 * Target Not State id
 * Target Not State name
 *
 * - Replace 'id' with the ID of the state the user or potential target
 *   cannot have.
 * - Replace 'name' with the name of the state the target cannot have.
 *
 * ---
 *
 * User Has param Buff 
 * User Has param Debuff 
 * Target Has param Buff 
 * Target Has param Debuff 
 *
 * - Requires user or potential target to have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Has param Max Buff 
 * User Has param Max Debuff
 * Target Has param Max Buff 
 * Target Has param Max Debuff
 *
 * - Requires potential user or target to have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Buff 
 * User Not param Debuff 
 * Target Not param Buff 
 * Target Not param Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Max Buff 
 * User Not param Max Debuff 
 * Target Not param Max Buff 
 * Target Not param Max Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * === A.I. => TGR Weight Notetags ===
 *
 * You can set how much influence on TGR weights actors and enemies will place
 * when determining valid targets for their actions.
 *
 * ---
 *
 * <AI Element Rate Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the element rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI Element Rate Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in element rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI EVA Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the EVA rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI EVA Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in EVA rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI MEV Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the MEV rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI MEV Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in MEV rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 * 
 * === Specific A.I. Targeting Notetags ===
 * 
 * Specific A.I. targeting means the user will ignore any TGR influences when
 * it comes to pick out of a group of valid candidates to come down to one
 * target. This only affects skills where the user must select a specific
 * target, meaning it will ignore the effects of random and AoE scopes.
 * 
 * ---
 *
 * <AI Target: type>
 *
 * - Used for: Skill Notetags
 * - Bypasses TGR influence in favor of picking a specific target out of a
 *   group of valid targets (does not pick from outside the valid target group)
 *   for a skill target.
 * - Replace 'type' with any of the following:
 * 
 *   ----------------------------   -------------------------------------------
 *   Type                           Description
 *   ----------------------------   -------------------------------------------
 *   User                           Always picks the user if available
 *   First                          Always picks the first valid candidate
 *   Last                           Always picks the last valid candidate
 *   ----------------------------   -------------------------------------------
 *   Highest Level                  Picks candidate with highest level
 *   ----------------------------   -------------------------------------------
 *   Highest MaxHP                  Picks candidate with highest MaxHP
 *   Highest HP                     Picks candidate with highest current HP
 *   Highest HP%                    Picks candidate with highest HP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest MaxMP                  Picks candidate with highest MaxMP
 *   Highest MP                     Picks candidate with highest current MP
 *   Highest MP%                    Picks candidate with highest MP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest MaxTP                  Picks candidate with highest MaxTP
 *   Highest TP                     Picks candidate with highest current TP
 *   Highest TP%                    Picks candidate with highest TP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest ATK                    Picks candidate with highest ATK parameter
 *   Highest DEF                    Picks candidate with highest DEF parameter
 *   Highest MAT                    Picks candidate with highest MAT parameter
 *   Highest MDF                    Picks candidate with highest MDF parameter
 *   Highest AGI                    Picks candidate with highest AGI parameter
 *   Highest LUK                    Picks candidate with highest LUK parameter
 *   ----------------------------   -------------------------------------------
 *   Highest HIT                    Picks candidate with highest HIT parameter
 *   Highest EVA                    Picks candidate with highest EVA parameter
 *   Highest CRI                    Picks candidate with highest CRI parameter
 *   Highest CEV                    Picks candidate with highest CEV parameter
 *   Highest MEV                    Picks candidate with highest MEV parameter
 *   Highest MRF                    Picks candidate with highest MRF parameter
 *   Highest CNT                    Picks candidate with highest CNT parameter
 *   Highest HRG                    Picks candidate with highest HRG parameter
 *   Highest MRG                    Picks candidate with highest MRG parameter
 *   Highest TRG                    Picks candidate with highest TRG parameter
 *   ----------------------------   -------------------------------------------
 *   Highest TGR                    Picks candidate with highest TGR parameter
 *   Highest GRD                    Picks candidate with highest GRD parameter
 *   Highest REC                    Picks candidate with highest REC parameter
 *   Highest PHA                    Picks candidate with highest PHA parameter
 *   Highest MCR                    Picks candidate with highest MCR parameter
 *   Highest TCR                    Picks candidate with highest TCR parameter
 *   Highest PDR                    Picks candidate with highest PDR parameter
 *   Highest MDR                    Picks candidate with highest MDR parameter
 *   Highest FDR                    Picks candidate with highest FDR parameter
 *   Highest EXR                    Picks candidate with highest EXR parameter
 *   ----------------------------   -------------------------------------------
 *   Highest State Count            Picks candidate with most states (any)
 *   Highest Positive State Count   Picks candidate with most positive states
 *   Highest Negative State Count   Picks candidate with most negative states
 *   *Note: These require VisuMZ_1_SkillsStatesCore
 *   ----------------------------   -------------------------------------------
 *   Lowest Level                   Picks candidate with lowest level
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxHP                   Picks candidate with lowest MaxHP
 *   Lowest HP                      Picks candidate with lowest current HP
 *   Lowest HP%                     Picks candidate with lowest HP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxMP                   Picks candidate with lowest MaxMP
 *   Lowest MP                      Picks candidate with lowest current MP
 *   Lowest MP%                     Picks candidate with lowest MP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxTP                   Picks candidate with lowest MaxTP
 *   Lowest TP                      Picks candidate with lowest current TP
 *   Lowest TP%                     Picks candidate with lowest TP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest ATK                     Picks candidate with lowest ATK parameter
 *   Lowest DEF                     Picks candidate with lowest DEF parameter
 *   Lowest MAT                     Picks candidate with lowest MAT parameter
 *   Lowest MDF                     Picks candidate with lowest MDF parameter
 *   Lowest AGI                     Picks candidate with lowest AGI parameter
 *   Lowest LUK                     Picks candidate with lowest LUK parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest HIT                     Picks candidate with lowest HIT parameter
 *   Lowest EVA                     Picks candidate with lowest EVA parameter
 *   Lowest CRI                     Picks candidate with lowest CRI parameter
 *   Lowest CEV                     Picks candidate with lowest CEV parameter
 *   Lowest MEV                     Picks candidate with lowest MEV parameter
 *   Lowest MRF                     Picks candidate with lowest MRF parameter
 *   Lowest CNT                     Picks candidate with lowest CNT parameter
 *   Lowest HRG                     Picks candidate with lowest HRG parameter
 *   Lowest MRG                     Picks candidate with lowest MRG parameter
 *   Lowest TRG                     Picks candidate with lowest TRG parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest TGR                     Picks candidate with lowest TGR parameter
 *   Lowest GRD                     Picks candidate with lowest GRD parameter
 *   Lowest REC                     Picks candidate with lowest REC parameter
 *   Lowest PHA                     Picks candidate with lowest PHA parameter
 *   Lowest MCR                     Picks candidate with lowest MCR parameter
 *   Lowest TCR                     Picks candidate with lowest TCR parameter
 *   Lowest PDR                     Picks candidate with lowest PDR parameter
 *   Lowest MDR                     Picks candidate with lowest MDR parameter
 *   Lowest FDR                     Picks candidate with lowest FDR parameter
 *   Lowest EXR                     Picks candidate with lowest EXR parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest State Count             Picks candidate with least states (any)
 *   Lowest Positive State Count    Picks candidate with least positive states
 *   Lowest Negative State Count    Picks candidate with least negative states
 *   *Note: These require VisuMZ_1_SkillsStatesCore
 *   ----------------------------   -------------------------------------------
 * 
 * ---
 *
 * ============================================================================
 * Regarding $gameTroop.turnCount() for A.I. Conditions
 * ============================================================================
 * 
 * ---
 * 
 * Short Answer:
 *
 * Battle A.I. conditions do NOT support the conditions $gameTroop.turnCount()
 * or user.turnCount() or target.turnCount() for A.I. Conditions.
 * 
 * Instead, use RPG Maker MZ's built-in action editor's turn requirement to
 * make do with the same effect.
 *
 * ---
 * 
 * Long Answer:
 * 
 * The turnCount() functions are not valid for A.I. Conditions and disabled due
 * to all the problems they cause. The reason being is because actions are
 * determined before the turn count increases. This is how RPG Maker MZ handles
 * it by default.
 * 
 * The reason why this does not work is due to the following code found in
 * RPG Maker MZ's core scripts:
 * 
 *   Game_Battler.prototype.turnCount = function() {
 *       if (BattleManager.isTpb()) {
 *           return this._tpbTurnCount;
 *       } else {
 *           return $gameTroop.turnCount() + 1;
 *       }
 *   };
 * 
 * What that means the turn count will always be off by 1. So upon determining
 * the action initially, the match would come off as correct. However, as the
 * turn actually starts and reaches the enemy or actor's turn, the turn count
 * check would read differently and return incorrect information, causing the
 * battler to forfeit their actions.
 * 
 * This facet of RPG Maker MZ can be updated and changed, but it is better that
 * it doesn't in order to maintain compatibility with the rest of the plugins
 * available that utilize the turn counter.
 * 
 * The work around to this problem is, instead, to use the enemy database tab's
 * action editor and apply a Turn Condition to match the required turn instead.
 * You know, the thing with Skill and Rating, where you select which skill for
 * the enemy to use instead.
 * 
 * HOWEVER!
 * 
 * If you are willing to use an "Experimental" feature, aka one that is not
 * heavily tested and may potentially result in unintended side effects, go to:
 * 
 *  Plugin Parameters > A.I. General Settings > Experimental > On-The-Spot A.I.
 * 
 * And set that to "true" without the quotes. This will forcefully remove the
 * +1 towards the count and forcefully make enemies re-evaluate actions upon
 * the start of the string of their actions. This comes with some side effects
 * that will potentially give A.I. advantages or disadvantages depending on the
 * battle system type. Action Speed becomes something that can be abused as it
 * is normally something that is determined based on the queued actions. A.I.
 * can pick a high speed weak action and then switch it for a slow speed strong
 * action. There is no proper fix to this due to how on-the-spot A.I. works as
 * it is ill-fitted for speed-relative battle systems. You have been warned.
 * 
 * In the event that this Plugin Parameter IS enabled, then using the turnCount
 * JavaScript code should work again due to the normalization of how the turn
 * property is calculated.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. General Settings
 * ============================================================================
 *
 * These settings determine the global settings for general Battle A.I. usage.
 *
 * ---
 * 
 * A.I. Style
 * 
 *   Actor Style:
 *   - Which A.I. style do you want for referenced actors to use?
 *   - This does not apply to non-referenced actors.
 * 
 *   Enemy Style:
 *   - Which A.I. style do you want for enemies to use?
 * 
 *   Refer to the A.I. Styles list for a list of valid styles.
 * 
 * ---
 *
 * A.I. Level
 * 
 *   Actor A.I. Level:
 *   - Default A.I. level used for actor A.I.
 *   - Levels: 0-100. Higher is stricter.
 * 
 *   Enemy A.I. Level:
 *   - Default A.I. level used for enemy A.I.
 *   - Levels: 0-100. Higher is stricter.
 *
 * ---
 *
 * A.I. Ratings
 * 
 *   Actor Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 * 
 *   Enemy Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 *
 * ---
 *
 * Reference
 * 
 *   Actor => AI Reference:
 *   - Which enemy A.I. should the actor reference by default?
 *   - Use 0 for no references.
 *
 * ---
 *
 * Knowledge
 * 
 *   Learn Knowledge:
 *   - Requires enemies/actors to test the knowledge of the opponents before
 *     using specific conditions.
 * 
 *   Unknown Element Rate:
 *   - What should A.I. treat unknown element rates as?
 *
 * ---
 * 
 * Experimental
 * 
 *   On-The-Spot A.I.:
 *   - A.I. enemies/actors determine actions on the spot when it's their turn.
 * 
 *     No Idle Chant:
 *     - Requires On-The-Spot A.I. enabled.
 *     - For A.I. Battlers, disables idle chant motions due to inconsistency.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. Default Conditions
 * ============================================================================
 *
 * You can set certain conditions to be used as defaults for all skills that
 * lack the <All AI Conditions> and <Any AI Conditions>. If either of those
 * notetags exist, none of these defaults will be used for those skills. These
 * settings will allow you to set both 'All' and 'Any' conditions for defaults.
 *
 * ---
 *
 * Enable?
 * 
 *   All Conditions:
 *   - Create default 'ALL' conditions for all skills without any AI notetags?
 * 
 *   Any Conditions:
 *   - Create default 'ANY' conditions for all skills without any AI notetags?
 *
 * ---
 *
 * HP Damage
 * MP Damage
 * HP Recover
 * MP Recover
 * HP Drain
 * MP Drain
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *
 * ---
 *
 * Add State
 * Remove State
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * Add Buff
 * Remove Buff
 * Add Debuff
 * Remove Debuff
 * 
 *   All Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie param's).
 * 
 *   Any Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. => TGR Weight Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you to set whether or not you'd like for 
 * weight influence when deciding targets for actions and how much to influence
 * the TGR weight by.
 *
 * ---
 *
 * Weight
 * 
 *   Element Rate => TGR:
 *   - Makes all A.I. consider elemental rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence elemental rates have on
 *       TGR weight.
 * 
 *   EVA Rate => TGR:
 *   - Makes all A.I. consider EVA rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence EVA rates have on
 *       TGR weight.
 * 
 *   MEV Rate => TGR:
 *   - Makes all A.I. consider MEV rates when considering TGR weight
 *     by default?
 * 
 *   Influence Rate:
 *   - This determines the default level of influence MEV rates have on
 *     TGR weight.
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
 * Version 1.18: May 19, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** General Settings > Experimental > On-The-Spot A.I. > No Idle Chant
 * **** Requires On-The-Spot A.I. enabled.
 * **** For A.I. Battlers, disables idle chant motions due to inconsistency.
 * 
 * Version 1.17: May 12, 2022
 * * Feature Update!
 * ** Better RNG calculation when using the x% Chance conditional. Update made
 *    by Arisu.
 * 
 * Version 1.16: February 24, 2022
 * * Feature Update!
 * ** Randomization between zero variance A.I. is now better.
 * ** A.I. will no longer keep unusable skills in a skill queue and replace
 *    them with new ones.
 * 
 * Version 1.15: December 2, 2021
 * * Compatibility Update!
 * ** AI for skills and items should now work if their scope is
 *    <Target: All Allies But User>. Update made by Irina.
 * 
 * Version 1.14: October 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Notetag section "Condition List" updated with the following:
 * *** *NOTE* JavaScript cannot be used without comparison operators to reduce
 *     error. This means if you want to check if a switch is on or not, don't
 *     simply use "$gameSwitches.value(42)" as it does not have any comparison
 *     operators. Instead, use "$gameSwitches.value(42) === true" to check.
 * ** Updated section "Regarding $gameTroop.turnCount() for A.I. Conditions"
 * * New Experimental Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** A.I. General Settings > Experimental > On-The-Spot A.I.
 * **** A.I. enemies/actors determine actions on the spot when it's their turn.
 * **** Functions akin to YEP's Battle A.I. Core where enemies determine new
 *      actions on the spot. Doing so will forcefully change the way the Turn
 *      Count is handled for Game_Battler to not utilize the +1.
 * **** This will forcefully remove the +1 towards the count and forcefully
 *      make enemies re-evaluate actions upon the start of the string of their
 *      actions. This comes with some side effects that will potentially give
 *      A.I. advantages or disadvantages depending on the battle system type.
 *      Action Speed becomes something that can be abused as it is normally
 *      something that is determined based on the queued actions. A.I. can pick
 *      a high speed weak action and then switch it for a slow speed strong
 *      action. There is no proper fix to this due to how on-the-spot A.I.
 *      works as it is ill-fitted for speed-relative battle systems. You have
 *      been warned.
 * **** In the event that this Plugin Parameter IS enabled, then using the
 *      turnCount JavaScript code should work again due to the normalization of
 *      how the turn property is calculated.
 * * Optimization Update!
 * ** Updated last version's newest change to be more optimized and occur upon
 *    each iteration of a new subject being determined to account for better
 *    check timing. Update made by Yanfly.
 * 
 * Version 1.13: October 13, 2021
 * * Feature Update!
 * ** A.I. Battlers with no currently determined actions, upon the start of the
 *    time frame for what would be their action, will have one more chance of
 *    determining a new action to use as to not waste their turns.
 * ** This does NOT mean that the A.I. Battlers will adjust their actions for
 *    one with a higher rating. The readjustment will only occur if there are
 *    no actions determined for that instance and only a one time window upon
 *    the start of the time frame for what would be their action.
 * ** Update made by Arisu.
 * 
 * Version 1.12: October 7, 2021
 * * Documentation Update!
 * ** Added section "Regarding $gameTroop.turnCount() for A.I. Conditions".
 * * Feature Update!
 * ** Any A.I. Conditions found with "turnCount()" will be automatically
 *    disabled in order to reduce confusion. This is due to how turnCount()
 *    functions do not accurately depict the current Turn Count depending on
 *    when the function runs. Update made by Olivia.
 * 
 * Version 1.11: September 30, 2021
 * * Bug Fixes!
 * ** Patched up a rare occurance of predetermined actions still having
 *    priority despite having no valid targets. Fix made by Olivia.
 * 
 * Version 1.10: September 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that caused "highest" and "lowest" target schemes to be
 *    inverted. Fix made by Olivia.
 * 
 * Version 1.09: July 9, 2021
 * * Bug Fixes!
 * ** Fixed a bug that caused "highest" and "lowest" target schemes to be
 *    inverted. Fix made by Arisu.
 * 
 * Version 1.08: April 16, 2021
 * * Feature Update!
 * ** Cached randomization seeds should no longer conflict with certain scope
 *    types. Update made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: January 22, 2021
 * * Bug Fixes!
 * ** <AI Target: x> notetags should no longer crashes. Fix made by Irina.
 * 
 * Version 1.06: January 8, 2021
 * * Feature Update!
 * ** For those using classic mode with a variance level of 0, action lists
 *    will be better shuffled to provide more variation between selected
 *    skills. Update made by Irina.
 * 
 * Version 1.05: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly!
 * *** <AI Target: type>
 * **** Bypasses TGR influence in favor of picking a specific target out of a
 *      group of valid targets (does not pick from outside the valid target
 *      group) for a skill target. Read documentation to see targeting types.
 * 
 * Version 1.04: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for notetag <Reference AI: Enemy id>
 * *** - Actors are only able to use skills they would normally have access to.
 *       - Actors need to have LEARNED the skill.
 *       - Actors need to be able to access the skill's SKILL TYPE.
 *       - Actors need to have the RESOURCES to pay for the skill.
 *     - If you cannot figure out why an auto battle actor cannot use a
 *       specific skill, turn OFF auto battle and see if you can use the skill
 *       normally.
 * 
 * Version 1.03: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Charmed battlers will no longer vanish when attack one another. Fix made
 *    by Yanfly.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** <All AI Conditiosn> and <Any AI Conditions> notetags are now fixed and
 *    should work properly. Fix made by Yanfly.
 *
 * Version 1.00: September 30, 2020
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
 * @param BattleAI
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
 * @text A.I. General Settings
 * @type struct<General>
 * @desc General settings pertaining to A.I.
 * @default {"AIStyle":"","ActorStyleAI:str":"classic","EnemyStyleAI:str":"classic","AILevel":"","ActorAILevel:num":"100","EnemyAILevel:num":"100","AIRating":"","ActorRatingVariance:num":"1","EnemyRatingVariance:num":"3","Reference":"","ActorAIReference:num":"0","Knowledge":"","LearnKnowledge:eval":"true","UnknownElementRate:num":"1.00"}
 *
 * @param Default:struct
 * @text A.I. Default Conditions
 * @type struct<Default>
 * @desc Give certain types of skills default conditions.
 * @default {"Enable?":"","EnableAllCon:eval":"true","EnableAnyCon:eval":"true","HpDamage":"","HpDamageAll:json":"\"\"","HpDamageAny:json":"\"Always\"","MpDamage":"","MpDamageAll:json":"\"Target MP > 0\"","MpDamageAny:json":"\"\"","HpRecover":"","HpRecoverAll:json":"\"\"","HpRecoverAny:json":"\"Target HP < Target MaxHP\"","MpRecover":"","MpRecoverAll:json":"\"\"","MpRecoverAny:json":"\"Target MP < Target MaxMP\"","HpDrain":"","HpDrainAll:json":"\"\"","HpDrainAny:json":"\"User HP < User MaxHP\"","MpDrain":"","MpDrainAll:json":"\"Target MP > 0\"","MpDrainAny:json":"\"\"","AddState":"","AddStateAll:json":"\"\"","AddStateAny:json":"\"Target Not State %1\\nTarget State %1 Turns <= 1\"","RemoveState":"","RemoveStateAll:json":"\"\"","RemoveStateAny:json":"\"Target Has State %1\"","AddBuff":"","AddBuffAll:json":"\"\"","AddBuffAny:json":"\"Target Not %1 Max Buff\\nTarget %1 Buff Turns <= 1\"","RemoveBuff":"","RemoveBuffAll:json":"\"\"","RemoveBuffAny:json":"\"Target Has %1 Buff\"","AddDebuff":"","AddDebuffAll:json":"\"\"","AddDebuffAny:json":"\"Target Not %1 Max Debuff\\nTarget %1 Debuff Turns <= 1\"","RemoveDebuff":"","RemoveDebuffAll:json":"\"\"","RemoveDebuffAny:json":"\"Target Has %1 Debuff\""}
 *
 * @param Weight:struct
 * @text A.I. => TGR Weight
 * @type struct<Weight>
 * @desc How do certain properties translate to TGR weight?
 * @default {"ElementTgr:eval":"true","ElementTgrRate:num":"1.25","EvaTgr:eval":"true","EvaTgrRate:num":"1.50","MevTgr:eval":"true","MevTgrRate:num":"2.00"}
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
 * A.I. General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param AIStyle
 * @text A.I. Style
 *
 * @param ActorStyleAI:str
 * @text Actor Style
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc Which A.I. style do you want for referenced actors to use?
 * This does not apply to non-referenced actors.
 * @default classic
 *
 * @param EnemyStyleAI:str
 * @text Enemy Style
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc Which A.I. style do you want for enemies to use?
 * @default classic
 *
 * @param AILevel
 * @text A.I. Level
 *
 * @param ActorAILevel:num
 * @text Actor A.I. Level
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for actor A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param EnemyAILevel:num
 * @text Enemy A.I. Level
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for enemy A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param AIRating
 * @text A.I. Ratings
 *
 * @param ActorRatingVariance:num
 * @text Actor Rating Variance
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc How much to allow variance from the A.I. rating by?
 * 0 for no variance. Higher numbers for more variance.
 * @default 1
 *
 * @param EnemyRatingVariance:num
 * @text Enemy Rating Variance
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc How much to allow variance from the A.I. rating by?
 * 0 for no variance. Higher numbers for more variance.
 * @default 3
 *
 * @param Reference
 *
 * @param ActorAIReference:num
 * @text Actor => AI Reference
 * @parent Reference
 * @type enemy
 * @desc Which enemy A.I. should the actor reference by default?
 * Use 0 for no references.
 * @default 0
 *
 * @param Knowledge
 *
 * @param LearnKnowledge:eval
 * @text Learn Knowledge
 * @parent Knowledge
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Requires enemies/actors to test the knowledge of
 * the opponents before using specific conditions.
 * @default true
 *
 * @param UnknownElementRate:num
 * @text Unknown Element Rate
 * @parent LearnKnowledge:eval
 * @desc What should A.I. treat unknown element rates as?
 * @default 1.00
 * 
 * @param Experimental
 * 
 * @param OnSpotAI:eval
 * @text On-The-Spot A.I.
 * @parent Experimental
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc A.I. enemies/actors determine actions on the
 * spot when it's their turn.
 * @default false
 * 
 * @param SpotRemoveMotions:eval
 * @text No Idle Chant
 * @parent OnSpotAI:eval
 * @type boolean
 * @on Remove Idle Chanting
 * @off Allow Idle Chanting
 * @desc Requires On-The-Spot A.I. enabled. For A.I. Battlers,
 * disables idle chant motions due to inconsistency.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. Default Conditions
 * ----------------------------------------------------------------------------
 */
/*~struct~Default:
 *
 * @param Enable?
 *
 * @param EnableAllCon:eval
 * @text All Conditions
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Create default 'ALL' conditions for all skills
 * without any AI notetags?
 * @default true
 *
 * @param EnableAnyCon:eval
 * @text Any Conditions
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Create default 'ANY' conditions for all skills
 * without any AI notetags?
 * @default true
 *
 * @param HpDamage
 * @text HP Damage
 * 
 * @param HpDamageAll:json
 * @text All Conditions
 * @parent HpDamage
 * @type note
 * @desc Default 'ALL' conditions used for HP damage skills.
 * @default ""
 * 
 * @param HpDamageAny:json
 * @text Any Conditions
 * @parent HpDamage
 * @type note
 * @desc Default 'ANY' conditions used for HP damage skills.
 * @default "Always"
 *
 * @param MpDamage
 * @text MP Damage
 * 
 * @param MpDamageAll:json
 * @text All Conditions
 * @parent MpDamage
 * @type note
 * @desc Default 'ALL' conditions used for MP damage skills.
 * @default "Target MP > 0"
 *
 * @param MpDamageAny:json
 * @text Any Conditions
 * @parent MpDamage
 * @type note
 * @desc Default 'ANY' conditions used for MP damage skills.
 * @default ""
 *
 * @param HpRecover
 * @text HP Recover
 * 
 * @param HpRecoverAll:json
 * @text All Conditions
 * @parent HpRecover
 * @type note
 * @desc Default 'ALL' conditions used for HP recovery skills.
 * @default ""
 *
 * @param HpRecoverAny:json
 * @text Any Conditions
 * @parent HpRecover
 * @type note
 * @desc Default 'ANY' conditions used for HP recovery skills.
 * @default "Target HP < Target MaxHP"
 *
 * @param MpRecover
 * @text MP Recover
 * 
 * @param MpRecoverAll:json
 * @text All Conditions
 * @parent MpRecover
 * @type note
 * @desc Default 'ALL' conditions used for MP recovery skills.
 * @default ""
 *
 * @param MpRecoverAny:json
 * @text Any Conditions
 * @parent MpRecover
 * @type note
 * @desc Default 'ANY' conditions used for MP recovery skills.
 * @default "Target MP < Target MaxMP"
 *
 * @param HpDrain
 * @text HP Drain
 * 
 * @param HpDrainAll:json
 * @text All Conditions
 * @parent HpDrain
 * @type note
 * @desc Default 'ALL' conditions used for HP drain skills.
 * @default ""
 *
 * @param HpDrainAny:json
 * @text Any Conditions
 * @parent HpDrain
 * @type note
 * @desc Default 'ANY' conditions used for HP drain skills.
 * @default "User HP < User MaxHP"
 *
 * @param MpDrain
 * @text MP Drain
 * 
 * @param MpDrainAll:json
 * @text All Conditions
 * @parent MpDrain
 * @type note
 * @desc Default 'ALL' conditions used for MP drain skills.
 * @default "Target MP > 0"
 *
 * @param MpDrainAny:json
 * @text Any Conditions
 * @parent MpDrain
 * @type note
 * @desc Default 'ANY' conditions used for MP drain skills.
 * @default ""
 *
 * @param AddState
 * @text Add State
 * 
 * @param AddStateAll:json
 * @text All Conditions
 * @parent AddState
 * @type note
 * @desc Default 'ALL' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddStateAny:json
 * @text Any Conditions
 * @parent AddState
 * @type note
 * @desc Default 'ANY' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not State %1\nTarget State %1 Turns <= 1"
 *
 * @param RemoveState
 * @text Remove State
 * 
 * @param RemoveStateAll:json
 * @text All Conditions
 * @parent RemoveState
 * @type note
 * @desc Default 'ALL' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveStateAny:json
 * @text Any Conditions
 * @parent RemoveState
 * @type note
 * @desc Default 'ANY' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has State %1"
 *
 * @param AddBuff
 * @text Add Buff
 * 
 * @param AddBuffAll:json
 * @text All Conditions
 * @parent AddBuff
 * @type note
 * @desc Default 'ALL' conditions used for adding buffs.
 * %1 - Dynamic values (ie param names).
 * @default ""
 *
 * @param AddBuffAny:json
 * @text Any Conditions
 * @parent AddBuff
 * @type note
 * @desc Default 'ANY' conditions used for adding buffs.
 * %1 - Dynamic values (ie param's).
 * @default "Target Not %1 Max Buff\nTarget %1 Buff Turns <= 1"
 *
 * @param RemoveBuff
 * @text Remove Buff
 * 
 * @param RemoveBuffAll:json
 * @text All Conditions
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ALL' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveBuffAny:json
 * @text Any Conditions
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ANY' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Buff"
 *
 * @param AddDebuff
 * @text Add Debuff
 * 
 * @param AddDebuffAll:json
 * @text All Conditions
 * @parent AddDebuff
 * @type note
 * @desc Default 'ALL' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddDebuffAny:json
 * @text Any Conditions
 * @parent AddDebuff
 * @type note
 * @desc Default 'ANY' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not %1 Max Debuff\nTarget %1 Debuff Turns <= 1"
 *
 * @param RemoveDebuff
 * @text Remove Debuff
 * 
 * @param RemoveDebuffAll:json
 * @text All Conditions
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ALL' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveDebuffAny:json
 * @text Any Conditions
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ANY' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Debuff"
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. => TGR Weight Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Weight:
 *
 * @param ElementTgr:eval
 * @text Element Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider elemental rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param ElementTgrRate:num
 * @text Influence Rate
 * @parent ElementTgr:eval
 * @desc This determines the default level of influence elemental
 * rates have on TGR weight.
 * @default 1.25
 *
 * @param EvaTgr:eval
 * @text EVA Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider EVA rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param EvaTgrRate:num
 * @text Influence Rate
 * @parent EvaTgr:eval
 * @desc This determines the default level of influence EVA
 * rates have on TGR weight.
 * @default 1.50
 *
 * @param MevTgr:eval
 * @text MEV Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider MEV rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param MevTgrRate:num
 * @text Influence Rate
 * @parent MevTgr:eval
 * @desc This determines the default level of influence MEV
 * rates have on TGR weight.
 * @default 2.00
 *
 */
//=============================================================================

const _0x43f8e5=_0xa131;(function(_0x1f7cc1,_0x239b28){const _0x3f47f7=_0xa131,_0x4897d4=_0x1f7cc1();while(!![]){try{const _0x51a200=parseInt(_0x3f47f7(0x1cc))/0x1*(parseInt(_0x3f47f7(0x1ff))/0x2)+parseInt(_0x3f47f7(0x1a9))/0x3*(parseInt(_0x3f47f7(0x269))/0x4)+-parseInt(_0x3f47f7(0x280))/0x5+-parseInt(_0x3f47f7(0x159))/0x6*(-parseInt(_0x3f47f7(0x129))/0x7)+parseInt(_0x3f47f7(0x219))/0x8+-parseInt(_0x3f47f7(0x250))/0x9*(-parseInt(_0x3f47f7(0x114))/0xa)+-parseInt(_0x3f47f7(0x1fb))/0xb;if(_0x51a200===_0x239b28)break;else _0x4897d4['push'](_0x4897d4['shift']());}catch(_0x4bb9c9){_0x4897d4['push'](_0x4897d4['shift']());}}}(_0x3752,0x82d11));function _0xa131(_0x3f5f8c,_0x57dce1){const _0x375226=_0x3752();return _0xa131=function(_0xa13102,_0x47acc3){_0xa13102=_0xa13102-0x101;let _0x1695fd=_0x375226[_0xa13102];return _0x1695fd;},_0xa131(_0x3f5f8c,_0x57dce1);}var label=_0x43f8e5(0x2a6),tier=tier||0x0,dependencies=[_0x43f8e5(0x167)],pluginData=$plugins[_0x43f8e5(0x12d)](function(_0x1d7612){const _0x574c6c=_0x43f8e5;return _0x1d7612[_0x574c6c(0x274)]&&_0x1d7612[_0x574c6c(0x145)][_0x574c6c(0x19d)]('['+label+']');})[0x0];VisuMZ[label][_0x43f8e5(0x1bb)]=VisuMZ[label][_0x43f8e5(0x1bb)]||{},VisuMZ[_0x43f8e5(0x24e)]=function(_0x2e85d,_0x403806){const _0x4bd14d=_0x43f8e5;for(const _0x547b84 in _0x403806){if(_0x547b84[_0x4bd14d(0x19a)](/(.*):(.*)/i)){const _0x3094bb=String(RegExp['$1']),_0x3fa223=String(RegExp['$2'])[_0x4bd14d(0x1b3)]()[_0x4bd14d(0x298)]();let _0x34e1c7,_0x5243f6,_0x5f09fe;switch(_0x3fa223){case _0x4bd14d(0x2a1):_0x34e1c7=_0x403806[_0x547b84]!==''?Number(_0x403806[_0x547b84]):0x0;break;case'ARRAYNUM':_0x5243f6=_0x403806[_0x547b84]!==''?JSON['parse'](_0x403806[_0x547b84]):[],_0x34e1c7=_0x5243f6['map'](_0x4cca31=>Number(_0x4cca31));break;case _0x4bd14d(0x133):_0x34e1c7=_0x403806[_0x547b84]!==''?eval(_0x403806[_0x547b84]):null;break;case _0x4bd14d(0x1f1):_0x5243f6=_0x403806[_0x547b84]!==''?JSON[_0x4bd14d(0x193)](_0x403806[_0x547b84]):[],_0x34e1c7=_0x5243f6['map'](_0x4b584d=>eval(_0x4b584d));break;case _0x4bd14d(0x146):_0x34e1c7=_0x403806[_0x547b84]!==''?JSON[_0x4bd14d(0x193)](_0x403806[_0x547b84]):'';break;case'ARRAYJSON':_0x5243f6=_0x403806[_0x547b84]!==''?JSON[_0x4bd14d(0x193)](_0x403806[_0x547b84]):[],_0x34e1c7=_0x5243f6[_0x4bd14d(0x164)](_0x58651b=>JSON['parse'](_0x58651b));break;case _0x4bd14d(0x256):_0x34e1c7=_0x403806[_0x547b84]!==''?new Function(JSON[_0x4bd14d(0x193)](_0x403806[_0x547b84])):new Function(_0x4bd14d(0x16f));break;case _0x4bd14d(0x189):_0x5243f6=_0x403806[_0x547b84]!==''?JSON[_0x4bd14d(0x193)](_0x403806[_0x547b84]):[],_0x34e1c7=_0x5243f6[_0x4bd14d(0x164)](_0x49b6b6=>new Function(JSON[_0x4bd14d(0x193)](_0x49b6b6)));break;case'STR':_0x34e1c7=_0x403806[_0x547b84]!==''?String(_0x403806[_0x547b84]):'';break;case'ARRAYSTR':_0x5243f6=_0x403806[_0x547b84]!==''?JSON[_0x4bd14d(0x193)](_0x403806[_0x547b84]):[],_0x34e1c7=_0x5243f6[_0x4bd14d(0x164)](_0x3c4100=>String(_0x3c4100));break;case _0x4bd14d(0x195):_0x5f09fe=_0x403806[_0x547b84]!==''?JSON[_0x4bd14d(0x193)](_0x403806[_0x547b84]):{},_0x34e1c7=VisuMZ[_0x4bd14d(0x24e)]({},_0x5f09fe);break;case _0x4bd14d(0x1b4):_0x5243f6=_0x403806[_0x547b84]!==''?JSON['parse'](_0x403806[_0x547b84]):[],_0x34e1c7=_0x5243f6[_0x4bd14d(0x164)](_0x4305e2=>VisuMZ[_0x4bd14d(0x24e)]({},JSON[_0x4bd14d(0x193)](_0x4305e2)));break;default:continue;}_0x2e85d[_0x3094bb]=_0x34e1c7;}}return _0x2e85d;},(_0x28aa78=>{const _0x22f589=_0x43f8e5,_0x5f4a3d=_0x28aa78[_0x22f589(0x184)];for(const _0xf33ae4 of dependencies){if(!Imported[_0xf33ae4]){if('quahP'!==_0x22f589(0x1b9)){if(this['isConfused']())return![];return this[_0x22f589(0x27a)]()&&this['referenceEnemyForAI']();}else{alert(_0x22f589(0x2a7)['format'](_0x5f4a3d,_0xf33ae4)),SceneManager[_0x22f589(0x207)]();break;}}}const _0x1a497c=_0x28aa78['description'];if(_0x1a497c['match'](/\[Version[ ](.*?)\]/i)){if(_0x22f589(0x20e)===_0x22f589(0x20e)){const _0x4f88d2=Number(RegExp['$1']);_0x4f88d2!==VisuMZ[label][_0x22f589(0x168)]&&(alert(_0x22f589(0x2a4)[_0x22f589(0x1ce)](_0x5f4a3d,_0x4f88d2)),SceneManager[_0x22f589(0x207)]());}else{_0x36d2f6=this[_0x22f589(0x111)][0x0];for(const _0x524add of this['_forceValidTargets']){if(_0x506ee9&&_0x524add['hp']>_0x24dfd3['hp'])_0x42f9cc=_0x524add;if(_0x275529&&_0x524add['hp']<_0x36e9ef['hp'])_0x337c63=_0x524add;}return _0x1b95c4;}}if(_0x1a497c[_0x22f589(0x19a)](/\[Tier[ ](\d+)\]/i)){if(_0x22f589(0x1d4)!==_0x22f589(0x1d4)){if(this[_0x22f589(0x1a8)]()||this[_0x22f589(0x124)]()){const _0x306908=this[_0x22f589(0x1a8)]()?this[_0x22f589(0x1a2)]()[_0x22f589(0x113)]:this[_0x22f589(0x199)]()[_0x22f589(0x113)];if(_0x306908[_0x22f589(0x19a)](_0x338808[_0x22f589(0x175)][_0x22f589(0x292)]))return![];else{if(_0x306908[_0x22f589(0x19a)](_0x2bddb9[_0x22f589(0x175)]['aiElementTgr']))return this[_0x22f589(0x276)]()>0x0;}}return _0x3e31aa['BattleAI'][_0x22f589(0x1bb)]['Weight'][_0x22f589(0x287)];}else{const _0x58775b=Number(RegExp['$1']);if(_0x58775b<tier){if(_0x22f589(0x166)!=='RvUDS'){_0x1d1214[_0x22f589(0x105)]=!![],_0x555a1b[_0x22f589(0x1de)]=_0x27fa33[_0x22f589(0x276)](),_0x4b88a0[_0x22f589(0x16c)]=[];if(_0x558dd6[_0x22f589(0x259)])_0x58dcee[_0x22f589(0x16c)]=_0x55fdb[_0x22f589(0x16c)][_0x22f589(0x1d3)](_0x3aa153[_0x22f589(0x157)]());else _0x3e0f46[_0x22f589(0x117)]()[_0x22f589(0x1a7)][_0x22f589(0x1b6)]<0x0?_0x14e190[_0x22f589(0x16c)]=_0x2a7719[_0x22f589(0x16c)][_0x22f589(0x1d3)](_0x5a53c3[_0x22f589(0x23a)]()):_0x55e5a2[_0x22f589(0x16c)]['push'](_0x2f2e49['item']()[_0x22f589(0x1a7)][_0x22f589(0x1b6)]);}else alert(_0x22f589(0x108)[_0x22f589(0x1ce)](_0x5f4a3d,_0x58775b,tier)),SceneManager[_0x22f589(0x207)]();}else{if(_0x22f589(0x188)==='Dxvja')tier=Math[_0x22f589(0x295)](_0x58775b,tier);else return _0x1470b9['_stateTurns'][_0x2f2d42]||0x0;}}}VisuMZ[_0x22f589(0x24e)](VisuMZ[label][_0x22f589(0x1bb)],_0x28aa78[_0x22f589(0x161)]);})(pluginData);function AIManager(){const _0x441d8c=_0x43f8e5;throw new Error(_0x441d8c(0x143));}function _0x3752(){const _0x2f1cbb=['bypassElementTgr','isAggroAffected','numActions','max','enemyId','bypassMevTgr','trim','GkEUO','isConditionalAI','addXParamAIKnowledge','isForFriend','clearAIKnowledge','_elementIDs','FSUCL','makeTargets','NUM','gDOcz','attackSkillId','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','diddP','BattleAI','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','param','currentAction','value','TGR','makeAutoBattleActions','actorId','AI\x20Manager\x20could\x20not\x20determine\x20this\x20value:\x20%1','isActionValid','TaLXS','isDebuffAffected','elementInfluence','rDAZg','REC','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','call','EFFECT_ADD_BUFF','rating','CEV','value1','slice','usableSkills','iykgi','_forceValidTargets','BSpoR','note','33560SEwEXJ','clearAiTgrInfluence','Game_Unit_randomTarget','item','pYxqw','_applyAIForcedTargetFilters','pRdxv','EFFECT_REMOVE_DEBUFF','BattleManager_startAction','Game_Battler_turnCount','prototype','doesAIApplyEvaTgrInfluence','Weight','isBuffAffected','VisuMZ_4_AggroControl','DDkVx','isEnemy','MP%','Default','GFvon','FylIj','1891316nruWdF','MpRecover%1','MAXMP','QSsdy','filter','_bypassAiValidCheck','hasElementAIKnowledge','avqpE','dLlTi','MDR','EVAL','AddDebuff%1','MAXHP','mpRate','random','hEGkc','For\x20more\x20information,\x20view\x20the\x20help\x20file.','CRI','doesAIApplyMevTgrInfluence','meetsCondition','debuff','bypassEvaTgr','endAction','DEF','evaInfluenceRate','gambit','This\x20is\x20a\x20static\x20class','elementKnowledgeRate','description','JSON','EFFECT_ADD_DEBUFF','AddBuff%1','TTStk','ORKwI','MDF','initialize','highestTgrMember','setEnemyAction','POSITIVE','filterForcedTargeting','randomTarget','canGuard','OORDX','getDefaultAnyConditions','mXpXQ','HIGHEST','elements','lzDKw','12KWVbwd','EnemyStyleAI','Game_Troop_setup','UOjSK','isMagical','skillId','RxBhC','determineTargetActionByAIisStillValid','parameters','getAllConditions','iKOZK','map','isPlaytest','RvUDS','VisuMZ_1_BattleCore','version','meetsSwitchCondition','RRVjm','ALWAYS','elementIds','getStateIdWithName','aiMevTgr','return\x200','BlgGm','doesTargetMeetAnyConditions','charAt','NEGATIVE\x20STATE\x20COUNT','The\x20reason\x20is\x20due\x20to\x20the\x20turnCount()\x20function.\x0a','_regexp','SYBxn','rQwUG','STATE\x20COUNT','GRD','friendsUnit','is%1Affected','EFFECT_RECOVER_MP','The\x20following\x20line\x20is\x20not\x20supported\x20by\x20Battle\x20A.I.:\x0a\x0a','aliveMembers','yGudu','Game_Action_itemTargetCandidates','HIT','EvaTgr','SpotRemoveMotions','name','_stateTurns','clearForcedTargets','AyiyT','Dxvja','ARRAYFUNC','sparam','jcshT','getElementIdWithName','meetsHpCondition','EFFECT_REMOVE_BUFF','Game_Unit_initialize','Game_Action_makeTargets','_subject','turnCount','parse','MAX_SAFE_INTEGER','STRUCT','toLowerCase','makeActions','selectAllActions','enemy','match','ZTsWT','isPhysical','includes','applyBattleAI','LdSSJ','isMax%1Affected','MutJS','actor','RFugR','meetsTurnCondition','casual','determineLineValue','damage','isActor','3ZCgobh','ShuffleArray','LEVEL','tAHLV','cfOyJ','mhp','eHMqJ','vEzwJ','qtqpc','AI\x20Manager\x20condition\x20cannot\x20be\x20met:\x20%1','toUpperCase','ARRAYSTRUCT','MJEla','elementId','RemoveDebuff%1','_rngChance','quahP','evaRates','Settings','ElementTgrRate','ZSpqZ','meetsMpCondition','WrmXY','action','TKNGJ','hYvAF','makeAutoBattleActionsWithEnemyAI','EnableAnyCon','buff','WBsdT','states','split','HOjpA','dataId','Game_Temp_initialize','4071aNFwje','MRG','format','setup','elementRates','eva','addElementAIKnowledge','concat','CxMVQ','Game_Unit_aliveMembers','aiApplyMevTgrInfluenceRate','code','AddState%1','doesTargetMeetAIConditions','statesByCategory','POSITIVE\x20STATE\x20COUNT','type','replace','elementInfluenceRate','SHjUi','hasForcedTargets','EnableAllCon','isTpb','createFilterTarget','gnyin','Any','_buffTurns','EFFECT_ADD_STATE','autoRemovalTiming','aiKnowledge','referenceEnemyForAI','aiElementTgr','IATzt','heZmR','RszTU','Game_Actor_makeAutoBattleActions','PjjRN','ARRAYEVAL','aiRatingVariance','MAXTP','remove','%1\x20%2\x20%3','ZupDT','hasXParamAIKnowledge','hasValidTargets','aiTgrInfluence','Game_Enemy_isActionValid','5492762IJYoxw','deadMembers','LearnKnowledge','applyBattleAiTgrInfluences','18xBUuEu','effects','isChanting','ylHZC','isStateAffected','HP%','ActorStyleAI','okzUU','exit','selectAction','itemTargetCandidates','meetsPartyLevelCondition','YtZHZ','doesTargetMeetAllConditions','getAnyConditions','qLeYG','canAttack','selectAllActionsClassic','hJflr','General','LUK','PCsJJ','mev','getDefaultAllConditions','CvyOm','NEGATIVE','2630912RnvZjV','needsSelection','canUse','elementRate','clamp','MEV','subject','HpRecover%1','makeDefaultConditions','HpDrain%1','tqgrJ','kOCNB','hpRate','mevInfluenceRate','doesAIApplyElementalTgrInfluence','checkSkillTargets','EFFECT_REMOVE_STATE','level','meetsStateCondition','HRG','LAST','makeValidTargets','determineActionByAIisStillValid','_alertTurnCount','faUin','passesAILevel','setAiTgrInfluences','CNT','PHA','determineNewValidAIAction','push','MCR','UQPhS','attackElements','All','initBattleAI','length','mevRates','actions','ActorAILevel','MAT','_stateIDs','FUiQe','doesTargetMeetCondition','OnSpotAI','forceValidTargets','ZTahx','ymYgy','HpDamage%1','EFFECT_RECOVER_HP','ATK','isDetermineActionByAI','isSkill','ConvertParams','opponentsUnit','2043uumjPK','AGI','log','indexOf','classic','Game_Battler_isChanting','FUNC','MpDamage%1','aiEvaTgr','VisuMZ_1_ElementStatusCore','FIRST','clearActions','allCondition','tpRate','yVViZ','apply','GOcsW','TDeRp','mmp','BattleManager_endAction','aiStyle','selectAllActionsGambit','ActorRatingVariance','startAction','EnemyRatingVariance','1085524ZSbvQi','makeDeepCopy','isForDeadFriend','MFreX','aiApplyEvaTgrInfluenceRate','addAIKnowledge','Game_BattlerBase_sparam','getNextSubject','guardSkillId','isForOpponent','MRF','status','maxTp','aiApplyElementalTgrInfluenceRate','JUPTg','jOTZx','_aiKnowledge','isAutoBattle','xparam','selectAllActionsRandom','VisuMZ_2_AggroControlSystem','XTMMd','anyCondition','4519525JKkylV','value2','noCondition','randomInt','forcedTargets','aiLevel','EnemyAILevel','ElementTgr','VisuMZ_1_SkillsStatesCore','currentClass','isConfused','Game_Action_apply','EtPza','ReKLV','BattleManager_getNextSubject','EvaTgrRate','TP%','_aiTgrInfluence'];_0x3752=function(){return _0x2f1cbb;};return _0x3752();}AIManager[_0x43f8e5(0x175)]={'noCondition':/<NO AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'allCondition':/<ALL AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ALL AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'anyCondition':/<ANY AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ANY AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'bypassElementTgr':/<(?:NO|BYPASS) AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE>/i,'bypassEvaTgr':/<(?:NO|BYPASS) AI (?:EVA|EVASION) INFLUENCE>/i,'bypassMevTgr':/<(?:NO|BYPASS) AI (?:MEV|MAGIC EVASION) INFLUENCE>/i,'aiElementTgr':/<AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE: (.*)>/i,'aiEvaTgr':/<AI (?:EVA|EVASION) INFLUENCE: (.*)>/i,'aiMevTgr':/<AI (?:MEV|MAGIC EVASION) INFLUENCE: (.*)>/i,'aiLevel':/<AI LEVEL: (\d+)>/i,'aiRatingVariance':/<AI RATING VARIANCE: (\d+)>/i,'aiTarget':/<AI (?:TARGET|TARGETS):[ ](.*)>/i,'aiStyle':/<AI STYLE:[ ](.*)>/i},AIManager[_0x43f8e5(0x29a)]=function(_0x4a6c7f){const _0xc76b1b=_0x43f8e5;if(!_0x4a6c7f)return![];return this[_0xc76b1b(0x162)](_0x4a6c7f)[_0xc76b1b(0x23d)]>0x0||this[_0xc76b1b(0x20d)](_0x4a6c7f)['length']>0x0;},AIManager[_0x43f8e5(0x162)]=function(_0x29c14a){const _0x5b53ab=_0x43f8e5;if(_0x29c14a[_0x5b53ab(0x113)]['match'](AIManager[_0x5b53ab(0x175)][_0x5b53ab(0x282)]))return[];else{if(_0x29c14a[_0x5b53ab(0x113)][_0x5b53ab(0x19a)](AIManager[_0x5b53ab(0x175)][_0x5b53ab(0x25c)]))return _0x5b53ab(0x128)===_0x5b53ab(0x128)?String(RegExp['$1'])[_0x5b53ab(0x1c8)](/[\r\n]+/)[_0x5b53ab(0x1f4)](''):_0xf3f7e[_0x5b53ab(0x11e)][_0x5b53ab(0x208)]['call'](this,_0x5db2f3,_0x264859);else{if(_0x5b53ab(0x26c)===_0x5b53ab(0x26c))return this[_0x5b53ab(0x216)](_0x29c14a);else{this[_0x5b53ab(0x1e9)]()[_0x55adfb]=this[_0x5b53ab(0x1e9)]()[_0x4ab289]||[];const _0x363188=_0x312820[_0x5b53ab(0x1a8)]()?_0x2c0da4[_0x5b53ab(0x2ad)]():_0x45860a[_0x5b53ab(0x296)]();!this['aiKnowledge']()[_0x44d648][_0x5b53ab(0x19d)](_0x363188)&&this[_0x5b53ab(0x1e9)]()[_0x27593b][_0x5b53ab(0x237)](_0x363188);}}}},AIManager[_0x43f8e5(0x20d)]=function(_0x6ec1bb){const _0x49200b=_0x43f8e5;if(_0x6ec1bb[_0x49200b(0x113)]['match'](AIManager[_0x49200b(0x175)][_0x49200b(0x282)])){if(_0x49200b(0x1a1)!=='MutJS')_0x58cd31[_0x49200b(0x12f)](_0x528e7b,this)&&(_0x16c291*=this[_0x49200b(0x21c)](_0x5974e4)*_0x4237f6[_0x49200b(0x1de)]);else return[];}else return _0x6ec1bb['note'][_0x49200b(0x19a)](AIManager['_regexp'][_0x49200b(0x27f)])?String(RegExp['$1'])[_0x49200b(0x1c8)](/[\r\n]+/)[_0x49200b(0x1f4)](''):this['getDefaultAnyConditions'](_0x6ec1bb);},AIManager[_0x43f8e5(0x216)]=function(_0x4d7bc8){const _0x1cac51=_0x43f8e5;if(!VisuMZ[_0x1cac51(0x2a6)][_0x1cac51(0x1bb)][_0x1cac51(0x126)][_0x1cac51(0x1e1)])return[];if(_0x4d7bc8[_0x1cac51(0x113)][_0x1cac51(0x19a)](AIManager[_0x1cac51(0x175)][_0x1cac51(0x27f)]))return[];return this[_0x1cac51(0x221)](_0x4d7bc8,_0x1cac51(0x23b));},AIManager[_0x43f8e5(0x154)]=function(_0x3102b6){const _0x59ff5f=_0x43f8e5;if(!VisuMZ[_0x59ff5f(0x2a6)][_0x59ff5f(0x1bb)][_0x59ff5f(0x126)][_0x59ff5f(0x1c4)])return[];if(_0x3102b6[_0x59ff5f(0x113)][_0x59ff5f(0x19a)](AIManager['_regexp'][_0x59ff5f(0x25c)]))return[];return this[_0x59ff5f(0x221)](_0x3102b6,_0x59ff5f(0x1e5));},AIManager[_0x43f8e5(0x221)]=function(_0x1e9b6d,_0x485227){const _0x16847f=_0x43f8e5;if(!_0x1e9b6d)return[];const _0x14773a=VisuMZ[_0x16847f(0x2a6)][_0x16847f(0x1bb)][_0x16847f(0x126)],_0x27647e=['MAXHP',_0x16847f(0x12b),_0x16847f(0x24b),_0x16847f(0x140),_0x16847f(0x241),_0x16847f(0x14b),_0x16847f(0x251),_0x16847f(0x213)],_0x1b458d=_0x1e9b6d[_0x16847f(0x1a7)][_0x16847f(0x1dc)],_0x2179da=_0x1e9b6d[_0x16847f(0x200)];let _0x38d359=[],_0x140704='',_0x39ea80='';switch(_0x1b458d){case 0x1:_0x140704='HpDamage%1'[_0x16847f(0x1ce)](_0x485227),_0x39ea80=_0x14773a[_0x140704],_0x38d359=_0x38d359[_0x16847f(0x1d3)](_0x39ea80[_0x16847f(0x1c8)](/[\r\n]+/)[_0x16847f(0x1f4)](''));break;case 0x2:_0x140704=_0x16847f(0x257)[_0x16847f(0x1ce)](_0x485227),_0x39ea80=_0x14773a[_0x140704],_0x38d359=_0x38d359[_0x16847f(0x1d3)](_0x39ea80[_0x16847f(0x1c8)](/[\r\n]+/)['remove'](''));break;case 0x3:_0x140704=_0x16847f(0x220)[_0x16847f(0x1ce)](_0x485227),_0x39ea80=_0x14773a[_0x140704],_0x38d359=_0x38d359[_0x16847f(0x1d3)](_0x39ea80['split'](/[\r\n]+/)[_0x16847f(0x1f4)](''));break;case 0x4:_0x140704=_0x16847f(0x12a)[_0x16847f(0x1ce)](_0x485227),_0x39ea80=_0x14773a[_0x140704],_0x38d359=_0x38d359['concat'](_0x39ea80[_0x16847f(0x1c8)](/[\r\n]+/)[_0x16847f(0x1f4)](''));break;case 0x5:_0x140704=_0x16847f(0x222)[_0x16847f(0x1ce)](_0x485227),_0x39ea80=_0x14773a[_0x140704],_0x38d359=_0x38d359['concat'](_0x39ea80[_0x16847f(0x1c8)](/[\r\n]+/)[_0x16847f(0x1f4)](''));break;case 0x6:_0x140704='MpDrain%1'[_0x16847f(0x1ce)](_0x485227),_0x39ea80=_0x14773a[_0x140704],_0x38d359=_0x38d359['concat'](_0x39ea80[_0x16847f(0x1c8)](/[\r\n]+/)['remove'](''));break;}for(const _0x781b99 of _0x2179da){if(!_0x781b99)continue;switch(_0x781b99[_0x16847f(0x1d7)]){case Game_Action[_0x16847f(0x24a)]:if(_0x781b99[_0x16847f(0x10d)]>0x0||_0x781b99[_0x16847f(0x281)]>0x0)_0x140704='HpRecover%1'[_0x16847f(0x1ce)](_0x485227),_0x39ea80=_0x14773a[_0x140704],_0x38d359=_0x38d359[_0x16847f(0x1d3)](_0x39ea80['split'](/[\r\n]+/)[_0x16847f(0x1f4)](''));else(_0x781b99[_0x16847f(0x10d)]<0x0||_0x781b99[_0x16847f(0x281)]<0x0)&&(_0x140704=_0x16847f(0x249)[_0x16847f(0x1ce)](_0x485227),_0x39ea80=_0x14773a[_0x140704],_0x38d359=_0x38d359[_0x16847f(0x1d3)](_0x39ea80[_0x16847f(0x1c8)](/[\r\n]+/)[_0x16847f(0x1f4)]('')));break;case Game_Action[_0x16847f(0x17c)]:if(_0x781b99[_0x16847f(0x10d)]>0x0||_0x781b99['value2']>0x0)_0x140704=_0x16847f(0x12a)[_0x16847f(0x1ce)](_0x485227),_0x39ea80=_0x14773a[_0x140704],_0x38d359=_0x38d359[_0x16847f(0x1d3)](_0x39ea80[_0x16847f(0x1c8)](/[\r\n]+/)[_0x16847f(0x1f4)](''));else(_0x781b99['value1']<0x0||_0x781b99['value2']<0x0)&&(_0x140704=_0x16847f(0x257)[_0x16847f(0x1ce)](_0x485227),_0x39ea80=_0x14773a[_0x140704],_0x38d359=_0x38d359[_0x16847f(0x1d3)](_0x39ea80[_0x16847f(0x1c8)](/[\r\n]+/)[_0x16847f(0x1f4)]('')));break;case Game_Action[_0x16847f(0x1e7)]:if(_0x781b99[_0x16847f(0x1ca)]===0x0)continue;_0x140704=_0x16847f(0x1d8)['format'](_0x485227),_0x39ea80=_0x14773a[_0x140704][_0x16847f(0x1ce)](_0x781b99['dataId']),_0x38d359=_0x38d359['concat'](_0x39ea80['split'](/[\r\n]+/)[_0x16847f(0x1f4)](''));break;case Game_Action[_0x16847f(0x229)]:_0x140704='RemoveState%1'[_0x16847f(0x1ce)](_0x485227),_0x39ea80=_0x14773a[_0x140704][_0x16847f(0x1ce)](_0x781b99['dataId']),_0x38d359=_0x38d359['concat'](_0x39ea80['split'](/[\r\n]+/)[_0x16847f(0x1f4)](''));break;case Game_Action[_0x16847f(0x10a)]:_0x140704=_0x16847f(0x148)[_0x16847f(0x1ce)](_0x485227),_0x39ea80=_0x14773a[_0x140704][_0x16847f(0x1ce)](_0x27647e[_0x781b99[_0x16847f(0x1ca)]]),_0x38d359=_0x38d359[_0x16847f(0x1d3)](_0x39ea80['split'](/[\r\n]+/)[_0x16847f(0x1f4)](''));break;case Game_Action[_0x16847f(0x147)]:_0x140704=_0x16847f(0x134)[_0x16847f(0x1ce)](_0x485227),_0x39ea80=_0x14773a[_0x140704]['format'](_0x27647e[_0x781b99[_0x16847f(0x1ca)]]),_0x38d359=_0x38d359[_0x16847f(0x1d3)](_0x39ea80[_0x16847f(0x1c8)](/[\r\n]+/)['remove'](''));break;case Game_Action[_0x16847f(0x18e)]:_0x140704='RemoveBuff%1'['format'](_0x485227),_0x39ea80=_0x14773a[_0x140704]['format'](_0x27647e[_0x781b99[_0x16847f(0x1ca)]]),_0x38d359=_0x38d359[_0x16847f(0x1d3)](_0x39ea80[_0x16847f(0x1c8)](/[\r\n]+/)[_0x16847f(0x1f4)](''));break;case Game_Action[_0x16847f(0x11b)]:_0x140704=_0x16847f(0x1b7)[_0x16847f(0x1ce)](_0x485227),_0x39ea80=_0x14773a[_0x140704][_0x16847f(0x1ce)](_0x27647e[_0x781b99[_0x16847f(0x1ca)]]),_0x38d359=_0x38d359[_0x16847f(0x1d3)](_0x39ea80[_0x16847f(0x1c8)](/[\r\n]+/)[_0x16847f(0x1f4)](''));break;}}return _0x38d359;},AIManager[_0x43f8e5(0x246)]=function(_0x3d83fb,_0x3f201f){const _0x2a53b0=_0x43f8e5;this[_0x2a53b0(0x111)]=this[_0x2a53b0(0x22e)](_0x3d83fb,_0x3f201f);},AIManager[_0x43f8e5(0x186)]=function(){const _0x253646=_0x43f8e5;this[_0x253646(0x111)]=[];},AIManager[_0x43f8e5(0x284)]=function(){const _0x490dab=_0x43f8e5;return this[_0x490dab(0x111)]=this[_0x490dab(0x111)]||[],this['_forceValidTargets'];},AIManager[_0x43f8e5(0x1e0)]=function(){const _0x2fd1fb=_0x43f8e5;return this['forcedTargets']()[_0x2fd1fb(0x23d)]>0x0;},AIManager[_0x43f8e5(0x1f8)]=function(_0x4ee959,_0x33820){const _0x27ef3c=_0x43f8e5;if(!_0x4ee959)return![];if(!_0x33820)return![];if(!DataManager[_0x27ef3c(0x24d)](_0x33820))return;if(this[_0x27ef3c(0x29a)](_0x33820))return _0x27ef3c(0x1c2)===_0x27ef3c(0x1ed)?_0x2bb993['friendsUnit']()[_0x27ef3c(0x1fc)]()[_0x27ef3c(0x23d)]:this['makeValidTargets'](_0x4ee959,_0x33820)[_0x27ef3c(0x23d)]>=0x1;else{if(_0x27ef3c(0x17f)!==_0x27ef3c(0x17f))this[_0x27ef3c(0x27c)](_0x4876d7);else return!![];}},AIManager[_0x43f8e5(0x22e)]=function(_0x2fa886,_0x426192){const _0x4fe117=_0x43f8e5;let _0x5a85f9=[];if(this[_0x4fe117(0x29a)](_0x426192)){const _0x498d03=this['getAllConditions'](_0x426192),_0x4edfe6=this[_0x4fe117(0x20d)](_0x426192),_0xbdffd9=new Game_Action(_0x2fa886);_0xbdffd9['setSkill'](_0x426192['id']);let _0x1ed761=AIManager[_0x4fe117(0x228)](_0x2fa886,_0xbdffd9);this['_rngChance']=Math[_0x4fe117(0x137)](),_0x5a85f9=_0x1ed761[_0x4fe117(0x12d)](_0x1ad5a4=>this['doesTargetMeetAIConditions'](_0x2fa886,_0x1ad5a4,_0x426192,_0x498d03,_0x4edfe6));}return _0x5a85f9;},AIManager[_0x43f8e5(0x228)]=function(_0x346dc2,_0x3ff0c4){const _0x381647=_0x43f8e5;let _0xe70d21=[];if(Imported[_0x381647(0x27d)]&&_0x3ff0c4[_0x381647(0x293)]()){if(_0x381647(0x16a)!==_0x381647(0x16a))return![];else{const _0x98bd23=_0x3ff0c4[_0x381647(0x272)]()?_0x346dc2[_0x381647(0x24f)]():_0x346dc2[_0x381647(0x17a)]();_0xe70d21=[_0x98bd23[_0x381647(0x14d)]()];}}else{if(_0x3ff0c4['isForEveryone']()){if(_0x381647(0x1c6)!==_0x381647(0x1c6)){_0x320e92=this[_0x381647(0x111)][0x0];for(const _0x21ffe3 of this[_0x381647(0x111)]){if(_0x305750&&(_0x21ffe3['level']||0x0)>(_0x3b1dd1[_0x381647(0x22a)]||0x0))_0x52f3a1=_0x21ffe3;if(_0x5f6ee6&&(_0x21ffe3[_0x381647(0x22a)]||0x0)<(_0x3f87d2[_0x381647(0x22a)]||0x0))_0x5296e0=_0x21ffe3;}return _0x2420fa;}else _0xe70d21=$gameParty[_0x381647(0x17e)]()[_0x381647(0x1d3)]($gameTroop[_0x381647(0x17e)]());}else{if(_0x3ff0c4[_0x381647(0x272)]())_0xe70d21=_0x346dc2[_0x381647(0x24f)]()[_0x381647(0x17e)]();else{if(_0x3ff0c4['isForDeadFriend']()){if(_0x381647(0x1ac)!=='bxcfx')_0xe70d21=_0x346dc2[_0x381647(0x17a)]()[_0x381647(0x1fc)]();else return _0x3712ed['ActorAILevel'];}else _0x3ff0c4[_0x381647(0x29c)]()&&!_0x3ff0c4[_0x381647(0x26b)]()&&(_0xe70d21=_0x346dc2[_0x381647(0x17a)]()['aliveMembers']());}}}return _0xe70d21;},AIManager['doesTargetMeetAIConditions']=function(_0x3c5fcd,_0x9bd1e6,_0xd10b76,_0x53d40d,_0x12ddf8){const _0x3414b0=_0x43f8e5;return this['doesTargetMeetAllConditions'](_0x3c5fcd,_0x9bd1e6,_0xd10b76,_0x53d40d)&&this[_0x3414b0(0x171)](_0x3c5fcd,_0x9bd1e6,_0xd10b76,_0x12ddf8);},AIManager[_0x43f8e5(0x20c)]=function(_0xc50d0c,_0x4dc667,_0x1aa9d8,_0x5b440b){const _0x31d388=_0x43f8e5;if(_0x5b440b['length']<=0x0)return!![];for(const _0x143d51 of _0x5b440b){if(!_0x143d51)continue;if(_0x143d51[_0x31d388(0x23d)]<=0x0)continue;if(!this[_0x31d388(0x232)](_0xc50d0c))return!![];if(!this['doesTargetMeetCondition'](_0xc50d0c,_0x4dc667,_0x1aa9d8,_0x143d51))return![];}return!![];},AIManager[_0x43f8e5(0x171)]=function(_0x5f14d3,_0x13885e,_0x2e1165,_0x21456f){const _0x43ef90=_0x43f8e5;if(_0x21456f[_0x43ef90(0x23d)]<=0x0)return!![];for(const _0x16c46c of _0x21456f){if(!_0x16c46c)continue;if(_0x16c46c[_0x43ef90(0x23d)]<=0x0)continue;if(!this[_0x43ef90(0x232)](_0x5f14d3))return!![];if(this['doesTargetMeetCondition'](_0x5f14d3,_0x13885e,_0x2e1165,_0x16c46c))return!![];}return![];},AIManager[_0x43f8e5(0x232)]=function(_0xdd4e97){const _0x2c7f9b=_0x43f8e5,_0x3c03c0=_0xdd4e97[_0x2c7f9b(0x285)]();return Math['randomInt'](0x64)<_0x3c03c0;},AIManager[_0x43f8e5(0x244)]=function(_0x975c25,_0x250572,_0x169bf6,_0x1b1b50){const _0x596497=_0x43f8e5,_0x4d383f=[_0x596497(0x135),'MAXMP',_0x596497(0x24b),_0x596497(0x140),_0x596497(0x241),_0x596497(0x14b),'AGI',_0x596497(0x213)];if(_0x1b1b50[_0x596497(0x1b3)]()[_0x596497(0x298)]()===_0x596497(0x16b))return!![];const _0x5c1470=_0x975c25;if(!VisuMZ[_0x596497(0x2a6)][_0x596497(0x1bb)][_0x596497(0x212)][_0x596497(0x245)]){if(_0x1b1b50[_0x596497(0x19a)](/turnCount\(\)/i)){if($gameTemp[_0x596497(0x165)]()&&!this[_0x596497(0x230)]){if(_0x596497(0x20b)!=='fRNPy'){let _0x1f4474=_0x596497(0x17d);_0x1f4474+=_0x1b1b50+'\x0a\x0a',_0x1f4474+=_0x596497(0x174),_0x1f4474+=_0x596497(0x139),alert(_0x1f4474),this[_0x596497(0x230)]=!![];}else{const _0x3566e6=this[_0x596497(0x1a8)]()?this[_0x596497(0x1a2)]()[_0x596497(0x113)]:this[_0x596497(0x199)]()[_0x596497(0x113)];if(_0x3566e6['match'](_0x3a9f07['_regexp'][_0x596497(0x1f2)]))return _0x55b1f3(_0x1c2c16['$1'])[_0x596497(0x21d)](0x0,0x9);else{if(this[_0x596497(0x1a8)]())return _0x374deb[_0x596497(0x266)][_0x596497(0x21d)](0x0,0x9);else{if(this[_0x596497(0x124)]())return _0x45eb1a['EnemyRatingVariance'][_0x596497(0x21d)](0x0,0x9);}}}}return![];}}if(_0x1b1b50[_0x596497(0x19a)](/(.*) (\>=|\>|===|!==|\<|\<=) (.*)/i)){if(_0x596497(0x11a)==='pRdxv'){const _0x481453=[String(RegExp['$1']),String(RegExp['$2']),String(RegExp['$3'])],_0x5af207=this[_0x596497(0x1a6)](_0x975c25,_0x250572,_0x169bf6,_0x481453[0x0]),_0x148bda=_0x481453[0x1],_0x4636bb=this['determineLineValue'](_0x975c25,_0x250572,_0x169bf6,_0x481453[0x2]);window['user']=window['a']=window['b']=undefined;const _0x4378c9=_0x596497(0x1f5)[_0x596497(0x1ce)](_0x5af207,_0x148bda,_0x4636bb);try{return eval(_0x4378c9);}catch(_0x1922b4){return _0x596497(0x187)!==_0x596497(0x187)?_0x97d11['ActorRatingVariance']['clamp'](0x0,0x9):($gameTemp[_0x596497(0x165)]()&&(console[_0x596497(0x252)](_0x596497(0x1b2)['format'](_0x1b1b50)),console[_0x596497(0x252)](_0x1922b4)),!![]);}}else return _0x29019d(_0x35d7de['$1'])[_0x596497(0x21d)](0x0,0x9);}else{if(_0x1b1b50[_0x596497(0x19a)](/(\d+\.?\d*)([%％]) CHANCE/i)){if(_0x596497(0x214)!==_0x596497(0x214)){const _0x287a35=this[_0x596497(0x199)]()[_0x596497(0x23f)][_0x596497(0x12d)](_0x445f0b=>this[_0x596497(0x102)](_0x445f0b));_0x287a35[_0x596497(0x23d)]>0x0?this[_0x596497(0x198)](_0x287a35):this[_0x596497(0x25b)]();}else{const _0x4f69c6=Number(RegExp['$1'])*0.01;return this['_rngChance']<_0x4f69c6;}}else{if(_0x1b1b50[_0x596497(0x19a)](/SWITCH (\d+) (ON|OFF|TRUE|FALSE)/i)){const _0x4423d9=Number(RegExp['$1']),_0x5c9e4c=String(RegExp['$2'])[_0x596497(0x196)](),_0x1b6a12=_0x5c9e4c[_0x596497(0x19a)](/ON|TRUE/i);return $gameSwitches[_0x596497(0x2aa)](_0x4423d9)===_0x1b6a12;}else{if(_0x1b1b50['match'](/(.*) IS ACTOR/i)){if(_0x596497(0x106)===_0x596497(0x106)){const _0x310897=String(RegExp['$1'])[_0x596497(0x19a)](/(?:USER|SUBJECT)/i)?_0x5c1470:_0x250572;return _0x310897['isActor']();}else{if(this['_aiTgrInfluence']===_0x28342e)this[_0x596497(0x115)]();return this[_0x596497(0x291)];}}else{if(_0x1b1b50[_0x596497(0x19a)](/(.*) IS ENEMY/i)){const _0x44384e=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x5c1470:_0x250572;return _0x44384e['isEnemy']();}else{if(_0x1b1b50[_0x596497(0x19a)](/(.*) HAS STATE (\d+)/i)){const _0x5e9595=$dataStates[Number(RegExp['$2'])],_0x4e1441=String(RegExp['$1'])[_0x596497(0x19a)](/(?:USER|SUBJECT)/i)?_0x5c1470:_0x250572;return _0x4e1441['states']()[_0x596497(0x19d)](_0x5e9595);}else{if(_0x1b1b50['match'](/(.*) HAS STATE (.*)/i)){if(_0x596497(0x211)!=='hJflr')_0x3959a2['addXParamAIKnowledge'](_0x596497(0x1ba),this);else{const _0x2d51c3=$dataStates[DataManager[_0x596497(0x16d)](RegExp['$2'])],_0x451403=String(RegExp['$1'])[_0x596497(0x19a)](/(?:USER|SUBJECT)/i)?_0x5c1470:_0x250572;return _0x451403[_0x596497(0x1c7)]()['includes'](_0x2d51c3);}}else{if(_0x1b1b50[_0x596497(0x19a)](/(.*) NOT STATE (\d+)/i)){const _0x378f22=$dataStates[Number(RegExp['$2'])],_0x1c47f9=String(RegExp['$1'])[_0x596497(0x19a)](/(?:USER|SUBJECT)/i)?_0x5c1470:_0x250572;return!_0x1c47f9['states']()[_0x596497(0x19d)](_0x378f22);}else{if(_0x1b1b50[_0x596497(0x19a)](/(.*) NOT STATE (.*)/i)){if(_0x596497(0x110)==='iykgi'){const _0x1e966f=$dataStates[DataManager[_0x596497(0x16d)](RegExp['$2'])],_0x34f191=String(RegExp['$1'])[_0x596497(0x19a)](/(?:USER|SUBJECT)/i)?_0x5c1470:_0x250572;return!_0x34f191['states']()[_0x596497(0x19d)](_0x1e966f);}else _0x5a75cd[_0x596497(0x150)](this[_0x596497(0x21f)](),this[_0x596497(0x117)]());}else{if(_0x1b1b50['match'](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0x434266=_0x4d383f[_0x596497(0x253)](String(RegExp['$2'])['toUpperCase']()[_0x596497(0x298)]()),_0x22ca0c=String(RegExp['$3'])[_0x596497(0x196)]()[_0x596497(0x298)](),_0x562a8f=String(RegExp['$1'])[_0x596497(0x19a)](/(?:USER|SUBJECT)/i)?_0x5c1470:_0x250572,_0x568618=_0x596497(0x17b)[_0x596497(0x1ce)](_0x22ca0c[_0x596497(0x172)](0x0)[_0x596497(0x1b3)]()+_0x22ca0c[_0x596497(0x10e)](0x1));return _0x562a8f[_0x568618](_0x434266);}else{if(_0x1b1b50['match'](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){if(_0x596497(0x202)!==_0x596497(0x202))return this[_0x596497(0x284)]()[_0x596497(0x23d)]>0x0;else{const _0x3957b9=_0x4d383f[_0x596497(0x253)](String(RegExp['$2'])[_0x596497(0x1b3)]()[_0x596497(0x298)]()),_0x10c964=String(RegExp['$3'])[_0x596497(0x196)]()[_0x596497(0x298)](),_0x5ced94=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x5c1470:_0x250572,_0x1e280c=_0x596497(0x1a0)[_0x596497(0x1ce)](_0x10c964['charAt'](0x0)[_0x596497(0x1b3)]()+_0x10c964['slice'](0x1));return _0x5ced94[_0x1e280c](_0x3957b9);}}else{if(_0x1b1b50[_0x596497(0x19a)](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0x4bcc43=_0x4d383f[_0x596497(0x253)](String(RegExp['$2'])['toUpperCase']()['trim']()),_0x41e9af=String(RegExp['$3'])['toLowerCase']()[_0x596497(0x298)](),_0x3fa3a5=String(RegExp['$1'])[_0x596497(0x19a)](/(?:USER|SUBJECT)/i)?_0x5c1470:_0x250572,_0x4d8e3e=_0x596497(0x17b)[_0x596497(0x1ce)](_0x41e9af['charAt'](0x0)['toUpperCase']()+_0x41e9af['slice'](0x1));return!_0x3fa3a5[_0x4d8e3e](_0x4bcc43);}else{if(_0x1b1b50[_0x596497(0x19a)](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){const _0x3c8556=_0x4d383f[_0x596497(0x253)](String(RegExp['$2'])['toUpperCase']()[_0x596497(0x298)]()),_0x4ce146=String(RegExp['$3'])[_0x596497(0x196)]()[_0x596497(0x298)](),_0x206e1d=String(RegExp['$1'])[_0x596497(0x19a)](/(?:USER|SUBJECT)/i)?_0x5c1470:_0x250572,_0x505e47=_0x596497(0x1a0)[_0x596497(0x1ce)](_0x4ce146[_0x596497(0x172)](0x0)[_0x596497(0x1b3)]()+_0x4ce146[_0x596497(0x10e)](0x1));return!_0x206e1d[_0x505e47](_0x3c8556);}}}}}}}}}}}}}return!![];},AIManager[_0x43f8e5(0x1a6)]=function(_0x815e8d,_0x5a9778,_0xf85d7d,_0x58726f){const _0x264c91=_0x43f8e5,_0x12e133=['MAXHP','MAXMP',_0x264c91(0x24b),'DEF',_0x264c91(0x241),_0x264c91(0x14b),_0x264c91(0x251),'LUK'];window['user']=_0x815e8d,window['a']=user,window['b']=_0x5a9778;const _0x445ecd=_0x58726f,_0x5f294a=user[_0x264c91(0x24f)]();let _0x1b585b=_0x58726f[_0x264c91(0x19a)](/(?:USER|SUBJECT)/i)?user:_0x5a9778;_0x58726f=_0x58726f[_0x264c91(0x1dd)](/\b(\d+)([%％])/gi,(_0x3272ef,_0x2c01e0)=>Number(_0x2c01e0)*0.01);if(_0x58726f[_0x264c91(0x19a)](/(?:VAR|VARIABLE) (\d+)/i)){if(_0x264c91(0x176)===_0x264c91(0x1ec)){if(_0x52d349&&_0x2f821e[_0x264c91(0x1da)](_0x23b6c1)[_0x264c91(0x23d)]>_0x598f39[_0x264c91(0x1da)](_0x22da4e)[_0x264c91(0x23d)])_0x233800=_0x1e98f8;if(_0xb53c01&&_0x1c2442[_0x264c91(0x1da)](_0x100a00)[_0x264c91(0x23d)]<_0x239adb[_0x264c91(0x1da)](_0x583f43)[_0x264c91(0x23d)])_0x1735b8=_0x1416f2;}else return $gameVariables[_0x264c91(0x2aa)](Number(RegExp['$1']));}if(_0x58726f['match'](/TEAM ALIVE MEMBERS/i))return _0x1b585b['friendsUnit']()[_0x264c91(0x17e)]()[_0x264c91(0x23d)];if(_0x58726f[_0x264c91(0x19a)](/TEAM DEAD MEMBERS/i)){if(_0x264c91(0x231)!==_0x264c91(0x170))return _0x1b585b[_0x264c91(0x17a)]()[_0x264c91(0x1fc)]()[_0x264c91(0x23d)];else{const _0x8af230=_0x2ed39f(_0x5a0af8['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x49d50d:_0x43dda0;return _0x8af230[_0x264c91(0x1a8)]();}}if(_0x58726f[_0x264c91(0x19a)](/ELEMENT (\d+) RATE/i)){const _0x2b8357=Number(RegExp['$1']);return this[_0x264c91(0x144)](_0x815e8d,_0x5a9778,_0x1b585b,_0x2b8357);}else{if(_0x58726f['match'](/ELEMENT (.*) RATE/i)){const _0x5a51be=DataManager[_0x264c91(0x18c)](String(RegExp['$1']));return this[_0x264c91(0x144)](_0x815e8d,_0x5a9778,_0x1b585b,_0x5a51be);}else{if(_0x58726f[_0x264c91(0x19a)](/(.*) ELEMENT RATE/i)){if('GFvon'!==_0x264c91(0x127))return _0x4aa6b8;else{const _0x589236=DataManager[_0x264c91(0x18c)](String(RegExp['$1']));return this[_0x264c91(0x144)](_0x815e8d,_0x5a9778,_0x1b585b,_0x589236);}}}}if(_0x58726f[_0x264c91(0x19a)](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:LEVEL|STACK|STACKS)/i)){const _0x4df954=_0x12e133['indexOf'](String(RegExp['$1'])[_0x264c91(0x1b3)]()['trim']()),_0x45b39e=String(RegExp['$2'])[_0x264c91(0x196)]()[_0x264c91(0x298)]();return _0x1b585b['buff'](_0x4df954)*(_0x45b39e===_0x264c91(0x1c5)?0x1:-0x1);}if(_0x58726f[_0x264c91(0x19a)](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:TURN|TURNS)/i)){const _0x332684=_0x12e133['indexOf'](String(RegExp['$1'])[_0x264c91(0x1b3)]()[_0x264c91(0x298)]()),_0x557136=String(RegExp['$2'])[_0x264c91(0x196)]()[_0x264c91(0x298)]();if(_0x557136===_0x264c91(0x1c5)&&_0x1b585b['isBuffAffected'](_0x332684)){if(_0x264c91(0x1f6)!==_0x264c91(0x1f6)){let _0x4bb371=_0x36b453[_0x264c91(0x22e)](_0xe6b1db,_0x363cdc);_0x5518f2=_0x38d598[_0x264c91(0x12d)](_0x44baf5=>_0x4bb371['includes'](_0x44baf5));}else return _0x1b585b[_0x264c91(0x1e6)][_0x332684];}else{if(_0x557136===_0x264c91(0x13d)&&_0x1b585b[_0x264c91(0x104)](_0x332684))return _0x1b585b[_0x264c91(0x1e6)][_0x332684];}return 0x0;}if(_0x58726f[_0x264c91(0x19a)](/STATE (\d+) (?:TURN|TURNS)/i)){if(_0x264c91(0x239)!==_0x264c91(0x239)){const _0x1b7198=_0x265b6a(_0x29cf22['$1']);return this[_0x264c91(0x144)](_0x3152fa,_0x470eda,_0x46f7ec,_0x1b7198);}else{const _0x28344c=Number(RegExp['$1']);if(_0x1b585b[_0x264c91(0x203)](_0x28344c)){const _0x14f05f=$dataStates[_0x28344c];return _0x14f05f&&_0x14f05f[_0x264c91(0x1e8)]===0x0?Number['MAX_SAFE_INTEGER']:_0x1b585b[_0x264c91(0x185)][_0x28344c]||0x0;}else return _0x1b585b[_0x264c91(0x1c7)]()[_0x264c91(0x19d)]($dataStates[_0x28344c])?Number[_0x264c91(0x194)]:0x0;}}else{if(_0x58726f[_0x264c91(0x19a)](/STATE (.*) (?:TURN|TURNS)/i)){const _0x514f6c=DataManager[_0x264c91(0x16d)](RegExp['$1']);if(_0x1b585b[_0x264c91(0x203)](_0x514f6c)){const _0x15bda9=$dataStates[_0x514f6c];if(_0x15bda9&&_0x15bda9[_0x264c91(0x1e8)]===0x0){if(_0x264c91(0x123)===_0x264c91(0x123))return Number['MAX_SAFE_INTEGER'];else{if(_0x71ed11['match'](/turnCount\(\)/i)){if(_0xea3f39['isPlaytest']()&&!this[_0x264c91(0x230)]){let _0x15a619=_0x264c91(0x17d);_0x15a619+=_0x4db54a+'\x0a\x0a',_0x15a619+=_0x264c91(0x174),_0x15a619+=_0x264c91(0x139),_0x6acce4(_0x15a619),this[_0x264c91(0x230)]=!![];}return![];}}}else{if(_0x264c91(0x1a3)!=='GgLOZ')return _0x1b585b[_0x264c91(0x185)][_0x514f6c]||0x0;else{if(_0x40263f&&_0x4632df[_0x264c91(0x225)]()>_0x28562e[_0x264c91(0x225)]())_0x8e4518=_0x57c984;if(_0x15a5d5&&_0x2b7daa['hpRate']()<_0x336f07[_0x264c91(0x225)]())_0xfe0647=_0x595f3c;}}}else return _0x1b585b[_0x264c91(0x1c7)]()[_0x264c91(0x19d)]($dataStates[_0x514f6c])?Number['MAX_SAFE_INTEGER']:0x0;}}if(_0x58726f[_0x264c91(0x19a)](/\bHP([%％])/i)){if(_0x264c91(0x1df)===_0x264c91(0x206)){const _0x52f214=_0x4a87f7[_0x264c91(0x253)](_0x1a1bdc(_0x5965ea['$1'])['toUpperCase']()[_0x264c91(0x298)]()),_0x1d5e5f=_0x5e7d38(_0x5b32e6['$2'])[_0x264c91(0x196)]()['trim']();return _0x2d8647[_0x264c91(0x1c5)](_0x52f214)*(_0x1d5e5f===_0x264c91(0x1c5)?0x1:-0x1);}else return _0x1b585b['hpRate']();}else{if(_0x58726f[_0x264c91(0x19a)](/\bMP([%％])/i))return _0x1b585b[_0x264c91(0x136)]();else{if(_0x58726f[_0x264c91(0x19a)](/\bTP([%％])/i))return _0x1b585b[_0x264c91(0x25d)]();else{if(_0x58726f['match'](/\b(?:MAXHP|MAX HP|MHP)\b/i))return'codir'==='codir'?_0x1b585b[_0x264c91(0x1ae)]:(_0x14b553['isPlaytest']()&&(_0x379f61[_0x264c91(0x252)](_0x264c91(0x101)[_0x264c91(0x1ce)](_0x28b871)),_0x52bf24[_0x264c91(0x252)](_0x4055ef)),0x0);else{if(_0x58726f[_0x264c91(0x19a)](/\b(?:MAXMP|MAX MP|MMP)\b/i)){if(_0x264c91(0x131)===_0x264c91(0x131))return _0x1b585b[_0x264c91(0x262)];else{const _0x239196=_0x243995(_0xd02c21['$1'])*0.01;return this['_rngChance']<_0x239196;}}else{if(_0x58726f[_0x264c91(0x19a)](/\b(?:MAXTP|MAX TP|MTP)\b/i))return _0x1b585b['maxTp']();}}}}}if(_0x58726f[_0x264c91(0x19a)](/\b(LEVEL|HP|MP|TP|ATK|DEF|MAT|MDF|AGI|LUK)\b/i))return _0x1b585b[String(RegExp['$1'])[_0x264c91(0x196)]()['trim']()];try{return eval(_0x58726f);}catch(_0x3f7380){if(_0x264c91(0x118)===_0x264c91(0x1af)){const _0x7748d=_0x98e67e[_0x264c91(0x253)](_0xcf0ba6(_0x484aaa['$1'])[_0x264c91(0x1b3)]()[_0x264c91(0x298)]()),_0x1f4792=_0x2fddc5(_0x41670c['$2'])['toLowerCase']()['trim']();if(_0x1f4792===_0x264c91(0x1c5)&&_0x50ee15[_0x264c91(0x121)](_0x7748d))return _0x36c3e2[_0x264c91(0x1e6)][_0x7748d];else{if(_0x1f4792==='debuff'&&_0x3a75d0[_0x264c91(0x104)](_0x7748d))return _0x1c4e1f[_0x264c91(0x1e6)][_0x7748d];}return 0x0;}else{if($gameTemp[_0x264c91(0x165)]()){if(_0x264c91(0x243)===_0x264c91(0x163))return _0x3dd4fe[_0x264c91(0x1e6)][_0x5c58bf];else console[_0x264c91(0x252)](_0x264c91(0x101)[_0x264c91(0x1ce)](_0x445ecd)),console[_0x264c91(0x252)](_0x3f7380);}return 0x0;}}},AIManager[_0x43f8e5(0x144)]=function(_0x27a1d7,_0x2e1543,_0x24dd9c,_0x3d8faf){const _0x19f2db=_0x43f8e5;if(_0x27a1d7['isActor']()===_0x24dd9c[_0x19f2db(0x1a8)]())return'xhNbM'===_0x19f2db(0x1bf)?_0x7db13d[_0x19f2db(0x11e)][_0x19f2db(0x1a4)]['call'](this,_0x146a1d,_0x3c86ed):_0x24dd9c[_0x19f2db(0x21c)](_0x3d8faf);else return _0x24dd9c[_0x19f2db(0x24f)]()[_0x19f2db(0x12f)](_0x3d8faf,_0x24dd9c)?_0x19f2db(0x112)!=='BSpoR'?_0x4045ae[_0x19f2db(0x275)]():_0x24dd9c[_0x19f2db(0x21c)](_0x3d8faf):VisuMZ['BattleAI'][_0x19f2db(0x1bb)][_0x19f2db(0x212)]['UnknownElementRate'];},AIManager[_0x43f8e5(0x150)]=function(_0x4a3a81,_0x3d9ba7){const _0x2f1daa=_0x43f8e5;if(!_0x3d9ba7)return;if(!_0x3d9ba7[_0x2f1daa(0x113)][_0x2f1daa(0x19a)](AIManager[_0x2f1daa(0x175)]['aiTarget']))return;const _0x11ec60=String(RegExp['$1'])[_0x2f1daa(0x1b3)]()[_0x2f1daa(0x298)]();let _0x37d325=this[_0x2f1daa(0x1e3)](_0x4a3a81,_0x11ec60);_0x37d325&&(this[_0x2f1daa(0x111)]=[_0x37d325]);},AIManager['createFilterTarget']=function(_0x16811c,_0x5e1526){const _0x15ba19=_0x43f8e5,_0x2e5dfb=[_0x15ba19(0x135),_0x15ba19(0x12b),_0x15ba19(0x24b),_0x15ba19(0x140),_0x15ba19(0x241),'MDF',_0x15ba19(0x251),'LUK'],_0x7992d9=[_0x15ba19(0x181),'EVA',_0x15ba19(0x13a),_0x15ba19(0x10c),_0x15ba19(0x21e),_0x15ba19(0x273),_0x15ba19(0x234),_0x15ba19(0x22c),_0x15ba19(0x1cd),'TRG'],_0x3093e3=[_0x15ba19(0x2ab),_0x15ba19(0x179),_0x15ba19(0x107),_0x15ba19(0x235),_0x15ba19(0x238),'TCR','PDR',_0x15ba19(0x132),'FDR','EXR'];let _0x384819=null;if(_0x5e1526==='USER'){if(this[_0x15ba19(0x111)][_0x15ba19(0x19d)](_0x16811c))return _0x16811c;}else{if(_0x5e1526===_0x15ba19(0x25a))return this['_forceValidTargets'][0x0];else{if(_0x5e1526===_0x15ba19(0x22d))return this[_0x15ba19(0x111)][this[_0x15ba19(0x111)][_0x15ba19(0x23d)]-0x1];else{if(_0x5e1526[_0x15ba19(0x19a)](/(HIGHEST|LOWEST)[ ](.*)/i)){const _0x24dba1=String(RegExp['$1'])[_0x15ba19(0x1b3)]()['trim']()===_0x15ba19(0x156),_0x146f33=!_0x24dba1,_0x480691=String(RegExp['$2'])[_0x15ba19(0x1b3)]()[_0x15ba19(0x298)]();if(_0x2e5dfb[_0x15ba19(0x19d)](_0x480691)){const _0x2eed61=_0x2e5dfb[_0x15ba19(0x253)](_0x480691);_0x384819=this[_0x15ba19(0x111)][0x0];for(const _0x8d9b4c of this[_0x15ba19(0x111)]){if(_0x15ba19(0x28c)!==_0x15ba19(0x28c))_0x332766*=this[_0x15ba19(0x21c)](_0x3985d7)*_0x4614ea[_0x15ba19(0x1de)];else{if(_0x24dba1&&_0x8d9b4c['param'](_0x2eed61)>_0x384819['param'](_0x2eed61))_0x384819=_0x8d9b4c;if(_0x146f33&&_0x8d9b4c[_0x15ba19(0x2a8)](_0x2eed61)<_0x384819['param'](_0x2eed61))_0x384819=_0x8d9b4c;}}return _0x384819;}if(_0x7992d9[_0x15ba19(0x19d)](_0x480691)){const _0x185cda=_0x7992d9[_0x15ba19(0x253)](_0x480691);_0x384819=this[_0x15ba19(0x111)][0x0];for(const _0x2a2b78 of this[_0x15ba19(0x111)]){if(_0x24dba1&&_0x2a2b78[_0x15ba19(0x27b)](_0x185cda)>_0x384819[_0x15ba19(0x27b)](_0x185cda))_0x384819=_0x2a2b78;if(_0x146f33&&_0x2a2b78[_0x15ba19(0x27b)](_0x185cda)<_0x384819['xparam'](_0x185cda))_0x384819=_0x2a2b78;}return _0x384819;}if(_0x3093e3[_0x15ba19(0x19d)](_0x480691)){const _0x134f83=_0x3093e3['indexOf'](_0x480691);_0x384819=this[_0x15ba19(0x111)][0x0];for(const _0x5648e0 of this[_0x15ba19(0x111)]){if(_0x24dba1&&_0x5648e0[_0x15ba19(0x18a)](_0x134f83)>_0x384819[_0x15ba19(0x18a)](_0x134f83))_0x384819=_0x5648e0;if(_0x146f33&&_0x5648e0[_0x15ba19(0x18a)](_0x134f83)<_0x384819[_0x15ba19(0x18a)](_0x134f83))_0x384819=_0x5648e0;}return _0x384819;}if(_0x480691==='HP'){_0x384819=this[_0x15ba19(0x111)][0x0];for(const _0x51efcf of this['_forceValidTargets']){if(_0x24dba1&&_0x51efcf['hp']>_0x384819['hp'])_0x384819=_0x51efcf;if(_0x146f33&&_0x51efcf['hp']<_0x384819['hp'])_0x384819=_0x51efcf;}return _0x384819;}if(_0x480691===_0x15ba19(0x204)){_0x384819=this['_forceValidTargets'][0x0];for(const _0x33fd81 of this[_0x15ba19(0x111)]){if(_0x24dba1&&_0x33fd81[_0x15ba19(0x225)]()>_0x384819[_0x15ba19(0x225)]())_0x384819=_0x33fd81;if(_0x146f33&&_0x33fd81['hpRate']()<_0x384819[_0x15ba19(0x225)]())_0x384819=_0x33fd81;}return _0x384819;}if(_0x480691==='MP'){_0x384819=this[_0x15ba19(0x111)][0x0];for(const _0x4decb3 of this[_0x15ba19(0x111)]){if(_0x15ba19(0x138)===_0x15ba19(0x138)){if(_0x24dba1&&_0x4decb3['mp']>_0x384819['mp'])_0x384819=_0x4decb3;if(_0x146f33&&_0x4decb3['mp']<_0x384819['mp'])_0x384819=_0x4decb3;}else return _0x49e239[_0x15ba19(0x165)]()&&(_0x1b63ac[_0x15ba19(0x252)](_0x15ba19(0x1b2)['format'](_0x28b6cd)),_0x4c5ad4[_0x15ba19(0x252)](_0x155d4e)),!![];}return _0x384819;}if(_0x480691===_0x15ba19(0x125)){_0x384819=this['_forceValidTargets'][0x0];for(const _0x5e62d1 of this[_0x15ba19(0x111)]){if(_0x24dba1&&_0x5e62d1[_0x15ba19(0x136)]()>_0x384819[_0x15ba19(0x136)]())_0x384819=_0x5e62d1;if(_0x146f33&&_0x5e62d1[_0x15ba19(0x136)]()<_0x384819[_0x15ba19(0x136)]())_0x384819=_0x5e62d1;}return _0x384819;}if(_0x480691==='TP'){_0x384819=this[_0x15ba19(0x111)][0x0];for(const _0x50f1fa of this['_forceValidTargets']){if(_0x24dba1&&_0x50f1fa['tp']>_0x384819['tp'])_0x384819=_0x50f1fa;if(_0x146f33&&_0x50f1fa['tp']<_0x384819['tp'])_0x384819=_0x50f1fa;}return _0x384819;}if(_0x480691===_0x15ba19(0x290)){_0x384819=this[_0x15ba19(0x111)][0x0];for(const _0x266f9a of this[_0x15ba19(0x111)]){if(_0x24dba1&&_0x266f9a[_0x15ba19(0x25d)]()>_0x384819[_0x15ba19(0x25d)]())_0x384819=_0x266f9a;if(_0x146f33&&_0x266f9a[_0x15ba19(0x25d)]()<_0x384819[_0x15ba19(0x25d)]())_0x384819=_0x266f9a;}return _0x384819;}if(_0x480691===_0x15ba19(0x1f3)){_0x384819=this['_forceValidTargets'][0x0];for(const _0x305884 of this[_0x15ba19(0x111)]){if(_0x24dba1&&_0x305884['maxTp']()>_0x384819[_0x15ba19(0x275)]())_0x384819=_0x305884;if(_0x146f33&&_0x305884['maxTp']()<_0x384819['maxTp']())_0x384819=_0x305884;}return _0x384819;}if(_0x480691===_0x15ba19(0x1ab)){_0x384819=this[_0x15ba19(0x111)][0x0];for(const _0x82928f of this[_0x15ba19(0x111)]){if(_0x24dba1&&(_0x82928f[_0x15ba19(0x22a)]||0x0)>(_0x384819[_0x15ba19(0x22a)]||0x0))_0x384819=_0x82928f;if(_0x146f33&&(_0x82928f[_0x15ba19(0x22a)]||0x0)<(_0x384819[_0x15ba19(0x22a)]||0x0))_0x384819=_0x82928f;}return _0x384819;}if(_0x480691===_0x15ba19(0x178)&&Imported[_0x15ba19(0x288)]){if(_0x15ba19(0x19f)!=='LdSSJ')_0x18ec46[_0x15ba19(0x252)]('AI\x20Manager\x20condition\x20cannot\x20be\x20met:\x20%1'[_0x15ba19(0x1ce)](_0x15770b)),_0x397c4e[_0x15ba19(0x252)](_0x24d89a);else{_0x384819=this[_0x15ba19(0x111)][0x0];for(const _0x5bebff of this[_0x15ba19(0x111)]){if(_0x24dba1&&_0x5bebff[_0x15ba19(0x1c7)]()[_0x15ba19(0x23d)]>_0x384819['states']()[_0x15ba19(0x23d)])_0x384819=_0x5bebff;if(_0x146f33&&_0x5bebff['states']()[_0x15ba19(0x23d)]<_0x384819['states']()[_0x15ba19(0x23d)])_0x384819=_0x5bebff;}return _0x384819;}}if(_0x480691===_0x15ba19(0x1db)&&Imported['VisuMZ_1_SkillsStatesCore']){if(_0x15ba19(0x260)!==_0x15ba19(0x2a2)){_0x384819=this[_0x15ba19(0x111)][0x0];const _0x399dfe=_0x15ba19(0x14f);for(const _0x4f2b3c of this[_0x15ba19(0x111)]){if(_0x24dba1&&_0x4f2b3c[_0x15ba19(0x1da)](_0x399dfe)[_0x15ba19(0x23d)]>_0x384819['statesByCategory'](_0x399dfe)[_0x15ba19(0x23d)])_0x384819=_0x4f2b3c;if(_0x146f33&&_0x4f2b3c[_0x15ba19(0x1da)](_0x399dfe)[_0x15ba19(0x23d)]<_0x384819[_0x15ba19(0x1da)](_0x399dfe)[_0x15ba19(0x23d)])_0x384819=_0x4f2b3c;}return _0x384819;}else{if(this[_0x15ba19(0x24c)]()){const _0x57fd03=_0xb9ad62[_0x15ba19(0x2a6)]['Settings'][_0x15ba19(0x212)];if(_0x57fd03['OnSpotAI']&&_0x57fd03[_0x15ba19(0x183)])return![];}return _0x5b67ac[_0x15ba19(0x2a6)][_0x15ba19(0x255)][_0x15ba19(0x109)](this);}}if(_0x480691===_0x15ba19(0x173)&&Imported['VisuMZ_1_SkillsStatesCore']){_0x384819=this[_0x15ba19(0x111)][0x0];const _0x395491=_0x15ba19(0x218);for(const _0x374bb1 of this[_0x15ba19(0x111)]){if(_0x15ba19(0x14a)===_0x15ba19(0x1bd))_0x3ba786[_0x15ba19(0x29b)](_0x15ba19(0x23e),this);else{if(_0x24dba1&&_0x374bb1[_0x15ba19(0x1da)](_0x395491)[_0x15ba19(0x23d)]>_0x384819[_0x15ba19(0x1da)](_0x395491)[_0x15ba19(0x23d)])_0x384819=_0x374bb1;if(_0x146f33&&_0x374bb1[_0x15ba19(0x1da)](_0x395491)['length']<_0x384819['statesByCategory'](_0x395491)[_0x15ba19(0x23d)])_0x384819=_0x374bb1;}}return _0x384819;}}}}}return null;},DataManager[_0x43f8e5(0x18c)]=function(_0x5e01bd){const _0x102c18=_0x43f8e5;_0x5e01bd=_0x5e01bd[_0x102c18(0x1b3)]()[_0x102c18(0x298)](),this['_elementIDs']=this['_elementIDs']||{};if(this[_0x102c18(0x29e)][_0x5e01bd])return this['_elementIDs'][_0x5e01bd];let _0x468a8a=0x1;for(const _0x2537e8 of $dataSystem[_0x102c18(0x157)]){if(!_0x2537e8)continue;let _0x105dad=_0x2537e8['toUpperCase']();_0x105dad=_0x105dad[_0x102c18(0x1dd)](/\x1I\[(\d+)\]/gi,''),_0x105dad=_0x105dad[_0x102c18(0x1dd)](/\\I\[(\d+)\]/gi,''),this[_0x102c18(0x29e)][_0x105dad]=_0x468a8a,_0x468a8a++;}return this[_0x102c18(0x29e)][_0x5e01bd]||0x0;},DataManager[_0x43f8e5(0x16d)]=function(_0x295918){const _0x8cd9c9=_0x43f8e5;_0x295918=_0x295918[_0x8cd9c9(0x1b3)]()['trim'](),this['_stateIDs']=this[_0x8cd9c9(0x242)]||{};if(this[_0x8cd9c9(0x242)][_0x295918])return this[_0x8cd9c9(0x242)][_0x295918];for(const _0x4a46e7 of $dataStates){if(!_0x4a46e7)continue;this[_0x8cd9c9(0x242)][_0x4a46e7['name'][_0x8cd9c9(0x1b3)]()[_0x8cd9c9(0x298)]()]=_0x4a46e7['id'];}return this['_stateIDs'][_0x295918]||0x0;},VisuMZ[_0x43f8e5(0x2a6)][_0x43f8e5(0x28e)]=BattleManager[_0x43f8e5(0x270)],BattleManager[_0x43f8e5(0x270)]=function(){const _0x4cd066=_0x43f8e5,_0x53ad74=VisuMZ[_0x4cd066(0x2a6)][_0x4cd066(0x28e)][_0x4cd066(0x109)](this);if(_0x53ad74&&_0x53ad74['isDetermineActionByAI']()){if(_0x4cd066(0x158)==='zFqKT'){const _0x3ca3fb=_0x144ab7['forcedTargets']();_0x261e81=_0x33e256['filter'](_0x3ae868=>_0x3ca3fb[_0x4cd066(0x19d)](_0x3ae868));}else{const _0x49a265=_0x53ad74[_0x4cd066(0x2a9)]();if(!_0x49a265||_0x49a265&&!_0x49a265[_0x4cd066(0x117)]()){if('FrOAr'!=='TWzvM')_0x53ad74[_0x4cd066(0x197)]();else{const _0x2dfb25=_0x498ffc[_0xfef89f[_0x4cd066(0x283)](_0x4512e4[_0x4cd066(0x23d)])];this[_0x4cd066(0x1c0)](_0x34e752)[_0x4cd066(0x14e)](_0x2dfb25);}}else VisuMZ[_0x4cd066(0x2a6)]['Settings']['General'][_0x4cd066(0x245)]&&(_0x4cd066(0x153)===_0x4cd066(0x153)?_0x53ad74[_0x4cd066(0x197)]():_0x4b941e[_0x4cd066(0x226)]=_0x26a34e['aiApplyMevTgrInfluenceRate']());}}return _0x53ad74;},VisuMZ[_0x43f8e5(0x2a6)][_0x43f8e5(0x11c)]=BattleManager[_0x43f8e5(0x267)],BattleManager['startAction']=function(){const _0x4c57b1=_0x43f8e5;this[_0x4c57b1(0x22f)](),this[_0x4c57b1(0x191)][_0x4c57b1(0x2a9)]()?'SRRYW'===_0x4c57b1(0x1ad)?(_0x1ddd74[_0x4c57b1(0x246)](this[_0x4c57b1(0x21f)](),this['item']()),this[_0x4c57b1(0x21a)]()&&_0x465c44['filterForcedTargeting'](this[_0x4c57b1(0x21f)](),this[_0x4c57b1(0x117)]())):VisuMZ[_0x4c57b1(0x2a6)]['BattleManager_startAction'][_0x4c57b1(0x109)](this):this['endAction']();},VisuMZ[_0x43f8e5(0x2a6)][_0x43f8e5(0x263)]=BattleManager[_0x43f8e5(0x13f)],BattleManager['endAction']=function(){const _0x57ff39=_0x43f8e5;this[_0x57ff39(0x22f)](),VisuMZ[_0x57ff39(0x2a6)][_0x57ff39(0x263)][_0x57ff39(0x109)](this);},BattleManager[_0x43f8e5(0x22f)]=function(){const _0x4a2aed=_0x43f8e5;this[_0x4a2aed(0x160)](this[_0x4a2aed(0x191)]);},BattleManager['determineTargetActionByAIisStillValid']=function(_0x2d34e0){const _0x3ab0ec=_0x43f8e5;if(!_0x2d34e0)return;if(_0x2d34e0[_0x3ab0ec(0x264)]()==='random')return;if(!_0x2d34e0['isDetermineActionByAI']())return;const _0x434f96=_0x2d34e0[_0x3ab0ec(0x2a9)]();if(!_0x434f96)return;const _0x46d2bd=_0x434f96[_0x3ab0ec(0x117)]();if(_0x2d34e0[_0x3ab0ec(0x12e)])return;if(AIManager[_0x3ab0ec(0x1f8)](_0x2d34e0,_0x46d2bd)&&_0x2d34e0['canUse'](_0x46d2bd))return;_0x2d34e0[_0x3ab0ec(0x236)]();},VisuMZ[_0x43f8e5(0x2a6)][_0x43f8e5(0x1cb)]=Game_Temp[_0x43f8e5(0x11e)][_0x43f8e5(0x14c)],Game_Temp[_0x43f8e5(0x11e)][_0x43f8e5(0x14c)]=function(){const _0x313359=_0x43f8e5;VisuMZ['BattleAI'][_0x313359(0x1cb)][_0x313359(0x109)](this),this['clearAiTgrInfluence']();},Game_Temp[_0x43f8e5(0x11e)][_0x43f8e5(0x115)]=function(){const _0x2f9be8=_0x43f8e5;this[_0x2f9be8(0x291)]={'action':null,'elementInfluence':![],'elementInfluenceRate':0x0,'elementIds':[],'evaInfluenceRate':0x0,'mevInfluenceRate':0x0};},Game_Temp['prototype']['aiTgrInfluence']=function(){const _0x40a733=_0x43f8e5;if(this[_0x40a733(0x291)]===undefined)this['clearAiTgrInfluence']();return this['_aiTgrInfluence'];},Game_Temp[_0x43f8e5(0x11e)][_0x43f8e5(0x233)]=function(_0x65cd4c,_0x362d39){const _0x34b51e=_0x43f8e5;this[_0x34b51e(0x115)]();const _0x300cde=this[_0x34b51e(0x1f9)]();_0x300cde[_0x34b51e(0x1c0)]=_0x362d39;if(_0x65cd4c[_0x34b51e(0x227)]()){if(_0x34b51e(0x1e4)==='gnyin'){_0x300cde[_0x34b51e(0x105)]=!![],_0x300cde[_0x34b51e(0x1de)]=_0x65cd4c[_0x34b51e(0x276)](),_0x300cde[_0x34b51e(0x16c)]=[];if(Imported['VisuMZ_1_ElementStatusCore'])_0x300cde[_0x34b51e(0x16c)]=_0x300cde['elementIds'][_0x34b51e(0x1d3)](_0x362d39[_0x34b51e(0x157)]());else{if(_0x362d39[_0x34b51e(0x117)]()[_0x34b51e(0x1a7)][_0x34b51e(0x1b6)]<0x0)_0x300cde['elementIds']=_0x300cde[_0x34b51e(0x16c)][_0x34b51e(0x1d3)](_0x65cd4c[_0x34b51e(0x23a)]());else{if('CpjDw'!=='fRtEk')_0x300cde['elementIds']['push'](_0x362d39['item']()['damage'][_0x34b51e(0x1b6)]);else return _0xa3213b['prototype'][_0x34b51e(0x20a)]['call'](this,_0x4884bd);}}}else{if(!_0x2fa1cc)return;if(this[_0x34b51e(0x21f)]()[_0x34b51e(0x1a8)]()===_0x2439ab[_0x34b51e(0x1a8)]())return;let _0x29dcaf=[];if(_0x36df57[_0x34b51e(0x259)])_0x29dcaf=this['elements']();else this['item']()['damage'][_0x34b51e(0x1b6)]<0x0?_0x29dcaf=this[_0x34b51e(0x21f)]()[_0x34b51e(0x23a)]():_0x29dcaf=[this[_0x34b51e(0x117)]()[_0x34b51e(0x1a7)]['elementId']];_0x3d1fda['addAIKnowledge'](_0x29dcaf,this[_0x34b51e(0x19c)](),this[_0x34b51e(0x15d)]());}}_0x362d39[_0x34b51e(0x19c)]()&&_0x65cd4c[_0x34b51e(0x11f)]()&&(_0x300cde[_0x34b51e(0x141)]=_0x65cd4c[_0x34b51e(0x26d)]()),_0x362d39[_0x34b51e(0x15d)]()&&_0x65cd4c['doesAIApplyMevTgrInfluence']()&&(_0x300cde[_0x34b51e(0x226)]=_0x65cd4c['aiApplyMevTgrInfluenceRate']());},VisuMZ[_0x43f8e5(0x2a6)][_0x43f8e5(0x190)]=Game_Action[_0x43f8e5(0x11e)]['makeTargets'],Game_Action[_0x43f8e5(0x11e)][_0x43f8e5(0x2a0)]=function(){const _0x3f26d5=_0x43f8e5;this[_0x3f26d5(0x24d)]()&&this[_0x3f26d5(0x21f)]()[_0x3f26d5(0x24c)]()&&(AIManager[_0x3f26d5(0x246)](this[_0x3f26d5(0x21f)](),this['item']()),this['needsSelection']()&&AIManager[_0x3f26d5(0x150)](this[_0x3f26d5(0x21f)](),this[_0x3f26d5(0x117)]()));$gameTemp['setAiTgrInfluences'](this[_0x3f26d5(0x21f)](),this);const _0x520d0d=VisuMZ[_0x3f26d5(0x2a6)][_0x3f26d5(0x190)]['call'](this);return $gameTemp['clearAiTgrInfluence'](),AIManager[_0x3f26d5(0x186)](),_0x520d0d;},VisuMZ[_0x43f8e5(0x2a6)]['Game_Action_itemTargetCandidates']=Game_Action[_0x43f8e5(0x11e)][_0x43f8e5(0x209)],Game_Action[_0x43f8e5(0x11e)]['itemTargetCandidates']=function(){const _0x5e1660=_0x43f8e5,_0x47f890=this[_0x5e1660(0x21f)](),_0x3aaa9d=this[_0x5e1660(0x117)]();let _0x20a2a2=VisuMZ['BattleAI'][_0x5e1660(0x180)][_0x5e1660(0x109)](this);if(_0x47f890[_0x5e1660(0x24c)]()&&AIManager[_0x5e1660(0x1f8)](_0x47f890,_0x3aaa9d)){let _0x35077c=AIManager[_0x5e1660(0x22e)](_0x47f890,_0x3aaa9d);_0x20a2a2=_0x20a2a2['filter'](_0x52bf1a=>_0x35077c[_0x5e1660(0x19d)](_0x52bf1a));}return _0x20a2a2;},VisuMZ[_0x43f8e5(0x2a6)][_0x43f8e5(0x28b)]=Game_Action['prototype'][_0x43f8e5(0x25f)],Game_Action[_0x43f8e5(0x11e)][_0x43f8e5(0x25f)]=function(_0x21f999){const _0x562aab=_0x43f8e5;VisuMZ['BattleAI'][_0x562aab(0x28b)][_0x562aab(0x109)](this,_0x21f999),this[_0x562aab(0x19e)](_0x21f999);},Game_Action[_0x43f8e5(0x11e)]['applyBattleAI']=function(_0x16b123){const _0x3084c0=_0x43f8e5;if(!_0x16b123)return;if(this[_0x3084c0(0x21f)]()[_0x3084c0(0x1a8)]()===_0x16b123['isActor']())return;let _0x45d8a0=[];if(Imported[_0x3084c0(0x259)]){if('CvyOm'!==_0x3084c0(0x217)){_0x40a522[_0x3084c0(0x11e)]['determineNewValidAIAction'][_0x3084c0(0x109)](this);if(this[_0x3084c0(0x294)]()>0x0){const _0x49b1da=this['enemy']()[_0x3084c0(0x23f)]['filter'](_0x2a487a=>this[_0x3084c0(0x102)](_0x2a487a));_0x49b1da[_0x3084c0(0x23d)]>0x0?this[_0x3084c0(0x198)](_0x49b1da):this[_0x3084c0(0x25b)]();}}else _0x45d8a0=this['elements']();}else this['item']()[_0x3084c0(0x1a7)][_0x3084c0(0x1b6)]<0x0?_0x45d8a0=this[_0x3084c0(0x21f)]()[_0x3084c0(0x23a)]():_0x45d8a0=[this[_0x3084c0(0x117)]()[_0x3084c0(0x1a7)][_0x3084c0(0x1b6)]];_0x16b123[_0x3084c0(0x26e)](_0x45d8a0,this[_0x3084c0(0x19c)](),this['isMagical']());},VisuMZ[_0x43f8e5(0x2a6)][_0x43f8e5(0x26f)]=Game_BattlerBase['prototype'][_0x43f8e5(0x18a)],Game_BattlerBase[_0x43f8e5(0x11e)][_0x43f8e5(0x18a)]=function(_0x30482f){const _0x3ef350=_0x43f8e5;let _0x124011=VisuMZ[_0x3ef350(0x2a6)][_0x3ef350(0x26f)][_0x3ef350(0x109)](this,_0x30482f);return _0x30482f===0x0&&(_0x124011*=this[_0x3ef350(0x1fe)]()),_0x124011;},Game_BattlerBase['prototype'][_0x43f8e5(0x1fe)]=function(){const _0x45854d=_0x43f8e5,_0x5a013b=$gameTemp[_0x45854d(0x1f9)](),_0x43ecf5=this[_0x45854d(0x24f)]();if(Imported[_0x45854d(0x122)]){if(_0x45854d(0x1c1)!=='TKNGJ')return _0x54b4ef[_0x45854d(0x21c)](_0x11ab25);else{if(_0x5a013b[_0x45854d(0x1c0)]&&_0x5a013b[_0x45854d(0x1c0)][_0x45854d(0x293)]())return 0x1;}}let _0x5b0993=0x1;if(_0x5a013b[_0x45854d(0x105)])for(const _0x22d8cd of _0x5a013b[_0x45854d(0x16c)]){_0x43ecf5[_0x45854d(0x12f)](_0x22d8cd,this)&&(_0x5b0993*=this[_0x45854d(0x21c)](_0x22d8cd)*_0x5a013b[_0x45854d(0x1de)]);}return _0x43ecf5[_0x45854d(0x1f7)](_0x45854d(0x1d1),this)&&(_0x5b0993*=0x1-this[_0x45854d(0x1d1)]*_0x5a013b[_0x45854d(0x141)]),_0x43ecf5[_0x45854d(0x1f7)]('mev',this)&&(_0x5b0993*=0x1-this[_0x45854d(0x215)]*_0x5a013b[_0x45854d(0x226)]),_0x5b0993[_0x45854d(0x21d)](0.001,0x3e8);},Game_BattlerBase[_0x43f8e5(0x11e)][_0x43f8e5(0x264)]=function(){const _0x2f0c7a=_0x43f8e5;return _0x2f0c7a(0x254);},VisuMZ[_0x43f8e5(0x2a6)][_0x43f8e5(0x255)]=Game_Battler['prototype'][_0x43f8e5(0x201)],Game_Battler['prototype'][_0x43f8e5(0x201)]=function(){const _0x22f2e2=_0x43f8e5;if(this['isDetermineActionByAI']()){const _0x214302=VisuMZ[_0x22f2e2(0x2a6)][_0x22f2e2(0x1bb)][_0x22f2e2(0x212)];if(_0x214302[_0x22f2e2(0x245)]&&_0x214302[_0x22f2e2(0x183)])return![];}return VisuMZ[_0x22f2e2(0x2a6)][_0x22f2e2(0x255)][_0x22f2e2(0x109)](this);},Game_Battler['prototype']['isDetermineActionByAI']=function(){const _0x29d51f=_0x43f8e5;if(this[_0x29d51f(0x28a)]())return![];return!![];},Game_Battler[_0x43f8e5(0x11e)][_0x43f8e5(0x236)]=function(){},Game_Battler['prototype'][_0x43f8e5(0x227)]=function(){const _0x2c6c15=_0x43f8e5;if(this[_0x2c6c15(0x1a8)]()||this[_0x2c6c15(0x124)]()){if('rnUQH'!==_0x2c6c15(0x1b0)){const _0x525e34=this[_0x2c6c15(0x1a8)]()?this[_0x2c6c15(0x1a2)]()[_0x2c6c15(0x113)]:this[_0x2c6c15(0x199)]()['note'];if(_0x525e34['match'](AIManager[_0x2c6c15(0x175)][_0x2c6c15(0x292)])){if(_0x2c6c15(0x1c9)===_0x2c6c15(0x28d)){const _0x1c6c80=this[_0x2c6c15(0x1a8)]()?this[_0x2c6c15(0x1a2)]()[_0x2c6c15(0x113)]:this[_0x2c6c15(0x199)]()[_0x2c6c15(0x113)];if(_0x1c6c80['match'](_0x21c7e7[_0x2c6c15(0x175)][_0x2c6c15(0x13e)]))return![];else{if(_0x1c6c80[_0x2c6c15(0x19a)](_0xf9d714[_0x2c6c15(0x175)][_0x2c6c15(0x258)]))return this[_0x2c6c15(0x26d)]()>0x0;}}else return![];}else{if(_0x525e34[_0x2c6c15(0x19a)](AIManager['_regexp']['aiElementTgr']))return this[_0x2c6c15(0x276)]()>0x0;}}else{if(!_0x59a179)return;if(_0x40a70c[_0x2c6c15(0x264)]()===_0x2c6c15(0x137))return;if(!_0x3eef6d[_0x2c6c15(0x24c)]())return;const _0x3263b7=_0x286400[_0x2c6c15(0x2a9)]();if(!_0x3263b7)return;const _0xb8e749=_0x3263b7[_0x2c6c15(0x117)]();if(_0x23e165[_0x2c6c15(0x12e)])return;if(_0x471196[_0x2c6c15(0x1f8)](_0x38a1d5,_0xb8e749)&&_0x58a38a[_0x2c6c15(0x21b)](_0xb8e749))return;_0x271045[_0x2c6c15(0x236)]();}}return VisuMZ['BattleAI'][_0x2c6c15(0x1bb)]['Weight'][_0x2c6c15(0x287)];},Game_Battler['prototype']['aiApplyElementalTgrInfluenceRate']=function(){const _0x5d35ec=_0x43f8e5;if(this[_0x5d35ec(0x1a8)]()||this[_0x5d35ec(0x124)]()){if(_0x5d35ec(0x18b)!==_0x5d35ec(0x155)){const _0x3d67f2=this[_0x5d35ec(0x1a8)]()?this[_0x5d35ec(0x1a2)]()[_0x5d35ec(0x113)]:this[_0x5d35ec(0x199)]()[_0x5d35ec(0x113)];if(_0x3d67f2[_0x5d35ec(0x19a)](AIManager['_regexp'][_0x5d35ec(0x1eb)])){if('RxBhC'===_0x5d35ec(0x15f))return eval(RegExp['$1']);else{const _0x374123=_0x32c6b0[_0x5d35ec(0x2a6)][_0x5d35ec(0x28e)][_0x5d35ec(0x109)](this);if(_0x374123&&_0x374123[_0x5d35ec(0x24c)]()){const _0x7c10d0=_0x374123[_0x5d35ec(0x2a9)]();if(!_0x7c10d0||_0x7c10d0&&!_0x7c10d0[_0x5d35ec(0x117)]())_0x374123['makeActions']();else _0x4fcd5c[_0x5d35ec(0x2a6)]['Settings'][_0x5d35ec(0x212)][_0x5d35ec(0x245)]&&_0x374123[_0x5d35ec(0x197)]();}return _0x374123;}}}else{const _0x2f9e8b=this[_0x5d35ec(0x162)](_0x499071),_0x107a85=this[_0x5d35ec(0x20d)](_0x2c539a),_0x4f6259=new _0x4b65d4(_0x148c2c);_0x4f6259['setSkill'](_0x43c0c0['id']);let _0x4b17e6=_0x54fb3b[_0x5d35ec(0x228)](_0xc2105e,_0x4f6259);this[_0x5d35ec(0x1b8)]=_0x154768[_0x5d35ec(0x137)](),_0x531e0c=_0x4b17e6[_0x5d35ec(0x12d)](_0x344b9f=>this[_0x5d35ec(0x1d9)](_0x514c4b,_0x344b9f,_0x37ee16,_0x2f9e8b,_0x107a85));}}return VisuMZ[_0x5d35ec(0x2a6)][_0x5d35ec(0x1bb)][_0x5d35ec(0x120)][_0x5d35ec(0x1bc)];},Game_Battler[_0x43f8e5(0x11e)][_0x43f8e5(0x11f)]=function(){const _0x3a8948=_0x43f8e5;if(this[_0x3a8948(0x1a8)]()||this['isEnemy']()){const _0x1edba2=this[_0x3a8948(0x1a8)]()?this[_0x3a8948(0x1a2)]()[_0x3a8948(0x113)]:this[_0x3a8948(0x199)]()['note'];if(_0x1edba2[_0x3a8948(0x19a)](AIManager[_0x3a8948(0x175)][_0x3a8948(0x13e)]))return![];else{if(_0x1edba2[_0x3a8948(0x19a)](AIManager['_regexp']['aiEvaTgr'])){if(_0x3a8948(0x261)!==_0x3a8948(0x261)){if(_0x436a83&&(_0x16956e[_0x3a8948(0x22a)]||0x0)>(_0x2c6df2['level']||0x0))_0x256bd6=_0x3a92da;if(_0xc49852&&(_0x495f72[_0x3a8948(0x22a)]||0x0)<(_0x282e3a[_0x3a8948(0x22a)]||0x0))_0x4dcfa4=_0x5a94d1;}else return this[_0x3a8948(0x26d)]()>0x0;}}}return VisuMZ[_0x3a8948(0x2a6)][_0x3a8948(0x1bb)][_0x3a8948(0x120)][_0x3a8948(0x182)];},Game_Battler[_0x43f8e5(0x11e)]['aiApplyEvaTgrInfluenceRate']=function(){const _0x4f4b8c=_0x43f8e5;if(this['isActor']()||this['isEnemy']()){if(_0x4f4b8c(0x1ee)!==_0x4f4b8c(0x1ee))return 0x0;else{const _0x552175=this['isActor']()?this['actor']()[_0x4f4b8c(0x113)]:this[_0x4f4b8c(0x199)]()[_0x4f4b8c(0x113)];if(_0x552175[_0x4f4b8c(0x19a)](AIManager[_0x4f4b8c(0x175)][_0x4f4b8c(0x258)])){if('diddP'!==_0x4f4b8c(0x2a5)){if(_0x381594&&_0x2b9908[_0x4f4b8c(0x27b)](_0xd81f19)>_0xebf4c9[_0x4f4b8c(0x27b)](_0x858053))_0x124530=_0x3d8b3f;if(_0x1ad032&&_0x344f98['xparam'](_0x34f40e)<_0xde1d07[_0x4f4b8c(0x27b)](_0x3b01f6))_0x3d1b0e=_0x25102e;}else return eval(RegExp['$1']);}}}return VisuMZ[_0x4f4b8c(0x2a6)]['Settings']['Weight'][_0x4f4b8c(0x28f)];},Game_Battler['prototype'][_0x43f8e5(0x13b)]=function(){const _0x423b64=_0x43f8e5;if(this[_0x423b64(0x1a8)]()||this[_0x423b64(0x124)]()){const _0x5c919c=this['isActor']()?this[_0x423b64(0x1a2)]()[_0x423b64(0x113)]:this[_0x423b64(0x199)]()[_0x423b64(0x113)];if(_0x5c919c[_0x423b64(0x19a)](AIManager[_0x423b64(0x175)][_0x423b64(0x297)]))return![];else{if(_0x5c919c[_0x423b64(0x19a)](AIManager[_0x423b64(0x175)][_0x423b64(0x16e)]))return _0x423b64(0x299)!=='iRtaa'?this[_0x423b64(0x1d6)]()>0x0:_0x3fe550(_0x12b3a6['$1'])[_0x423b64(0x1c8)](/[\r\n]+/)[_0x423b64(0x1f4)]('');}}return VisuMZ[_0x423b64(0x2a6)]['Settings'][_0x423b64(0x120)][_0x423b64(0x182)];},Game_Battler[_0x43f8e5(0x11e)]['aiApplyMevTgrInfluenceRate']=function(){const _0x59497b=_0x43f8e5;if(this[_0x59497b(0x1a8)]()||this[_0x59497b(0x124)]()){const _0x397740=this[_0x59497b(0x1a8)]()?this[_0x59497b(0x1a2)]()[_0x59497b(0x113)]:this[_0x59497b(0x199)]()[_0x59497b(0x113)];if(_0x397740['match'](AIManager['_regexp']['aiMevTgr'])){if('MJEla'!==_0x59497b(0x1b5))_0x40e57d['elementIds']=_0x323a24[_0x59497b(0x16c)]['concat'](_0x13c3c8['attackElements']());else return eval(RegExp['$1']);}}return VisuMZ[_0x59497b(0x2a6)]['Settings'][_0x59497b(0x120)][_0x59497b(0x28f)];},Game_Battler['prototype'][_0x43f8e5(0x285)]=function(){const _0x10151e=_0x43f8e5,_0x29d4fb=VisuMZ[_0x10151e(0x2a6)]['Settings'][_0x10151e(0x212)];if(this[_0x10151e(0x1a8)]()||this[_0x10151e(0x124)]()){const _0x276e2a=this['isActor']()?this[_0x10151e(0x1a2)]()[_0x10151e(0x113)]:this[_0x10151e(0x199)]()[_0x10151e(0x113)];if(_0x276e2a['match'](AIManager[_0x10151e(0x175)]['aiLevel']))return Number(RegExp['$1'])[_0x10151e(0x21d)](0x0,0x64);else{if(this[_0x10151e(0x1a8)]())return _0x29d4fb[_0x10151e(0x240)];else{if(this[_0x10151e(0x124)]())return _0x29d4fb[_0x10151e(0x286)];}}}return _0x29d4fb[_0x10151e(0x286)];},Game_Battler[_0x43f8e5(0x11e)][_0x43f8e5(0x26e)]=function(_0x15d701,_0x306f16,_0x1e85bf){const _0x29392e=_0x43f8e5,_0x1afd64=this[_0x29392e(0x24f)]();if(_0x15d701&&_0x15d701[_0x29392e(0x23d)]>0x0){if(_0x29392e(0x15c)!==_0x29392e(0x15c))return _0x152e19['MAX_SAFE_INTEGER'];else for(const _0x3d658b of _0x15d701){_0x1afd64[_0x29392e(0x1d2)](_0x3d658b,this);}}_0x306f16&&_0x1afd64[_0x29392e(0x29b)](_0x29392e(0x1ba),this),_0x1e85bf&&_0x1afd64[_0x29392e(0x29b)]('mevRates',this);},Game_Battler[_0x43f8e5(0x11e)][_0x43f8e5(0x1f7)]=function(_0x4fa14b){const _0x412e6f=_0x43f8e5,_0x576fb9=this['opponentsUnit']();return _0x576fb9[_0x412e6f(0x1f7)](_0x4fa14b,this);},Game_Battler[_0x43f8e5(0x11e)][_0x43f8e5(0x1f2)]=function(){const _0x5694c2=_0x43f8e5,_0x43d8d1=VisuMZ['BattleAI'][_0x5694c2(0x1bb)][_0x5694c2(0x212)];if(this[_0x5694c2(0x1a8)]()||this[_0x5694c2(0x124)]()){if(_0x5694c2(0x29f)===_0x5694c2(0x12c)){if(!_0x12e048[_0x5694c2(0x2a6)][_0x5694c2(0x1bb)]['Default'][_0x5694c2(0x1e1)])return[];if(_0x426598[_0x5694c2(0x113)][_0x5694c2(0x19a)](_0x2e1f43[_0x5694c2(0x175)][_0x5694c2(0x27f)]))return[];return this[_0x5694c2(0x221)](_0x1788ad,_0x5694c2(0x23b));}else{const _0x5ab7d7=this[_0x5694c2(0x1a8)]()?this[_0x5694c2(0x1a2)]()['note']:this[_0x5694c2(0x199)]()[_0x5694c2(0x113)];if(_0x5ab7d7[_0x5694c2(0x19a)](AIManager[_0x5694c2(0x175)]['aiRatingVariance']))return Number(RegExp['$1'])[_0x5694c2(0x21d)](0x0,0x9);else{if(this['isActor']())return _0x5694c2(0x103)===_0x5694c2(0x25e)?_0x229779[_0x5694c2(0x11e)][_0x5694c2(0x18d)]['call'](this,_0x11d0bf,_0x1c8cd9):_0x43d8d1[_0x5694c2(0x266)][_0x5694c2(0x21d)](0x0,0x9);else{if(this[_0x5694c2(0x124)]())return'bTBwM'!=='bTBwM'?![]:_0x43d8d1[_0x5694c2(0x268)][_0x5694c2(0x21d)](0x0,0x9);}}}}return _0x43d8d1['EnemyRatingVariance']['clamp'](0x0,0x9);},VisuMZ[_0x43f8e5(0x2a6)][_0x43f8e5(0x11d)]=Game_Battler['prototype']['turnCount'],Game_Battler[_0x43f8e5(0x11e)][_0x43f8e5(0x192)]=function(){const _0x2787cb=_0x43f8e5;return VisuMZ['BattleAI']['Settings'][_0x2787cb(0x212)][_0x2787cb(0x245)]&&!BattleManager[_0x2787cb(0x1e2)]()?$gameTroop['turnCount']():VisuMZ[_0x2787cb(0x2a6)]['Game_Battler_turnCount'][_0x2787cb(0x109)](this);},Game_Actor[_0x43f8e5(0x11e)]['isDetermineActionByAI']=function(){const _0x199ac0=_0x43f8e5;if(this[_0x199ac0(0x28a)]())return![];return this[_0x199ac0(0x27a)]()&&this[_0x199ac0(0x1ea)]();},Game_Actor[_0x43f8e5(0x11e)][_0x43f8e5(0x1ea)]=function(){const _0x116059=_0x43f8e5,_0x39f14b=this['currentClass']()[_0x116059(0x113)];if(_0x39f14b[_0x116059(0x19a)](/<NO REFERENCE AI>/i))return null;else{if(_0x39f14b[_0x116059(0x19a)](/<REFERENCE AI: ENEMY (\d+)>/i))return $dataEnemies[Number(RegExp['$1'])];else{if(_0x39f14b[_0x116059(0x19a)](/<REFERENCE AI: (.*)>/i)){if('PjjRN'===_0x116059(0x1f0))return $dataEnemies[DataManager['getEnemyIdWithName'](String(RegExp['$1']))];else{const _0x5050f3=_0x3cda15[_0x116059(0x295)](..._0x526c41[_0x116059(0x164)](_0x5a0b2d=>_0x5a0b2d[_0x116059(0x10b)])),_0x1f264e=_0x5050f3-this['aiRatingVariance'](),_0x19c73b=this[_0x116059(0x294)]();_0x137065=_0x44b944[_0x116059(0x12d)](_0x434577=>_0x434577[_0x116059(0x10b)]>=_0x1f264e);for(let _0x1be1c5=0x0;_0x1be1c5<_0x19c73b;_0x1be1c5++){_0x9e8fc4=_0x339be8[_0x116059(0x2a6)]['ShuffleArray'](_0x3055ba);const _0x57c092=this['selectAction'](_0x1e636e,_0x1f264e);this[_0x116059(0x1c0)](_0x1be1c5)[_0x116059(0x14e)](_0x57c092);}}}}}return $dataEnemies[VisuMZ[_0x116059(0x2a6)][_0x116059(0x1bb)][_0x116059(0x212)]['ActorAIReference']];},Game_Actor[_0x43f8e5(0x11e)]['aiStyle']=function(){const _0x21b94a=_0x43f8e5,_0x2b5d69=this[_0x21b94a(0x289)]()[_0x21b94a(0x113)];if(_0x2b5d69[_0x21b94a(0x19a)](AIManager['_regexp']['aiStyle']))return String(RegExp['$1'])[_0x21b94a(0x196)]()[_0x21b94a(0x298)]();return VisuMZ[_0x21b94a(0x2a6)][_0x21b94a(0x1bb)]['General'][_0x21b94a(0x205)];},Game_Actor['prototype'][_0x43f8e5(0x236)]=function(){const _0x4d22cb=_0x43f8e5;Game_Battler[_0x4d22cb(0x11e)][_0x4d22cb(0x236)][_0x4d22cb(0x109)](this),this[_0x4d22cb(0x2ac)]();},VisuMZ['BattleAI'][_0x43f8e5(0x1ef)]=Game_Actor[_0x43f8e5(0x11e)]['makeAutoBattleActions'],Game_Actor[_0x43f8e5(0x11e)][_0x43f8e5(0x2ac)]=function(){const _0x576bc2=_0x43f8e5;if(this[_0x576bc2(0x24c)]())this['makeAutoBattleActionsWithEnemyAI']();else{if(_0x576bc2(0x247)===_0x576bc2(0x248)){const _0x91ecdc=_0x24e3d5[_0x29bdae(_0x3842de['$2'])],_0x4ee994=_0x5d071d(_0x32a052['$1'])[_0x576bc2(0x19a)](/(?:USER|SUBJECT)/i)?_0x1032f7:_0x93dcec;return _0x4ee994['states']()[_0x576bc2(0x19d)](_0x91ecdc);}else VisuMZ[_0x576bc2(0x2a6)][_0x576bc2(0x1ef)][_0x576bc2(0x109)](this);}},Game_Actor['prototype'][_0x43f8e5(0x1c3)]=function(){const _0x5d3dae=_0x43f8e5;if(this['numActions']()>0x0){const _0x49669a=this[_0x5d3dae(0x10f)]();if(this[_0x5d3dae(0x20f)]())_0x49669a[_0x5d3dae(0x237)]($dataSkills[this[_0x5d3dae(0x2a3)]()]);if(this[_0x5d3dae(0x152)]())_0x49669a[_0x5d3dae(0x237)]($dataSkills[this[_0x5d3dae(0x271)]()]);const _0x25ce43=this['referenceEnemyForAI'](),_0x1d0517=JsonEx[_0x5d3dae(0x26a)](_0x25ce43[_0x5d3dae(0x23f)]);for(const _0x372353 of _0x1d0517){if(_0x372353[_0x5d3dae(0x15e)]===0x1)_0x372353[_0x5d3dae(0x15e)]=this[_0x5d3dae(0x2a3)]();if(_0x372353[_0x5d3dae(0x15e)]===0x2)_0x372353[_0x5d3dae(0x15e)]=this['guardSkillId']();}const _0x4e6607=_0x1d0517['filter'](_0x44c4bb=>this['isActionValid'](_0x44c4bb)&&_0x49669a[_0x5d3dae(0x19d)]($dataSkills[_0x44c4bb[_0x5d3dae(0x15e)]]));if(_0x4e6607[_0x5d3dae(0x23d)]>0x0){if(_0x5d3dae(0x1b1)==='qtqpc'){this['selectAllActions'](_0x4e6607);return;}else{this[_0x5d3dae(0x24d)]()&&this['subject']()[_0x5d3dae(0x24c)]()&&(_0x277372[_0x5d3dae(0x246)](this['subject'](),this[_0x5d3dae(0x117)]()),this[_0x5d3dae(0x21a)]()&&_0x2aebec[_0x5d3dae(0x150)](this[_0x5d3dae(0x21f)](),this['item']()));_0x56a47d[_0x5d3dae(0x233)](this[_0x5d3dae(0x21f)](),this);const _0x4b3b2e=_0x19f3c7['BattleAI'][_0x5d3dae(0x190)][_0x5d3dae(0x109)](this);return _0x1f9c74[_0x5d3dae(0x115)](),_0x47dafb[_0x5d3dae(0x186)](),_0x4b3b2e;}}}VisuMZ[_0x5d3dae(0x2a6)][_0x5d3dae(0x1ef)][_0x5d3dae(0x109)](this);},Game_Actor['prototype']['meetsCondition']=function(_0x39abf8){const _0x5b2a7f=_0x43f8e5;return Game_Enemy[_0x5b2a7f(0x11e)][_0x5b2a7f(0x13c)][_0x5b2a7f(0x109)](this,_0x39abf8);},Game_Actor['prototype']['meetsTurnCondition']=function(_0x853582,_0x4625bf){const _0x171ab2=_0x43f8e5;return Game_Enemy['prototype'][_0x171ab2(0x1a4)]['call'](this,_0x853582,_0x4625bf);},Game_Actor[_0x43f8e5(0x11e)][_0x43f8e5(0x18d)]=function(_0x516c3f,_0x20cc0e){const _0x204044=_0x43f8e5;return Game_Enemy['prototype'][_0x204044(0x18d)][_0x204044(0x109)](this,_0x516c3f,_0x20cc0e);},Game_Actor[_0x43f8e5(0x11e)][_0x43f8e5(0x1be)]=function(_0x17a0f1,_0x1e4964){const _0x3545ff=_0x43f8e5;return Game_Enemy[_0x3545ff(0x11e)]['meetsMpCondition'][_0x3545ff(0x109)](this,_0x17a0f1,_0x1e4964);},Game_Actor[_0x43f8e5(0x11e)][_0x43f8e5(0x22b)]=function(_0x5d83c2){const _0x2dea95=_0x43f8e5;return Game_Enemy[_0x2dea95(0x11e)][_0x2dea95(0x22b)]['call'](this,_0x5d83c2);},Game_Actor['prototype'][_0x43f8e5(0x20a)]=function(_0x395042){const _0x4804e0=_0x43f8e5;return Game_Enemy['prototype'][_0x4804e0(0x20a)][_0x4804e0(0x109)](this,_0x395042);},Game_Actor[_0x43f8e5(0x11e)][_0x43f8e5(0x169)]=function(_0x450b41){const _0x3798bc=_0x43f8e5;return Game_Enemy[_0x3798bc(0x11e)][_0x3798bc(0x169)]['call'](this,_0x450b41);},Game_Enemy[_0x43f8e5(0x11e)][_0x43f8e5(0x264)]=function(){const _0x27639e=_0x43f8e5,_0x1d5d26=this['enemy']()[_0x27639e(0x113)];if(_0x1d5d26[_0x27639e(0x19a)](AIManager[_0x27639e(0x175)][_0x27639e(0x264)]))return String(RegExp['$1'])[_0x27639e(0x196)]()[_0x27639e(0x298)]();return VisuMZ[_0x27639e(0x2a6)]['Settings'][_0x27639e(0x212)][_0x27639e(0x15a)];},VisuMZ[_0x43f8e5(0x2a6)][_0x43f8e5(0x1fa)]=Game_Enemy[_0x43f8e5(0x11e)][_0x43f8e5(0x102)],Game_Enemy[_0x43f8e5(0x11e)][_0x43f8e5(0x102)]=function(_0xf9dd14){const _0x2867d2=_0x43f8e5;if(!VisuMZ['BattleAI'][_0x2867d2(0x1fa)][_0x2867d2(0x109)](this,_0xf9dd14))return![];if(this[_0x2867d2(0x264)]()==='random')return!![];return AIManager[_0x2867d2(0x1f8)](this,$dataSkills[_0xf9dd14['skillId']]);},Game_Actor[_0x43f8e5(0x11e)]['isActionValid']=function(_0x556f5a){const _0x58c623=_0x43f8e5;return Game_Enemy[_0x58c623(0x11e)]['isActionValid'][_0x58c623(0x109)](this,_0x556f5a);},Game_Enemy[_0x43f8e5(0x11e)][_0x43f8e5(0x208)]=function(_0x36d1aa,_0x2303f7){const _0x38946e=_0x43f8e5,_0x4bb5a1=_0x36d1aa['reduce']((_0x3bbd53,_0xf9bf)=>_0x3bbd53+_0xf9bf[_0x38946e(0x10b)]-_0x2303f7,0x0);if(_0x4bb5a1>=0x0){if(_0x38946e(0x278)!==_0x38946e(0x223)){let _0x4f87ba=Math[_0x38946e(0x283)](_0x4bb5a1);for(const _0x29779a of _0x36d1aa){_0x4f87ba-=_0x29779a[_0x38946e(0x10b)]-_0x2303f7;if(_0x4f87ba<=0x0)return _0x29779a;}}else _0xd3e99c=this[_0x38946e(0x157)]();}else{if('TTStk'===_0x38946e(0x149))return null;else{const _0x5a8a25=_0x2bdf83[_0x22fa40[_0x38946e(0x16d)](_0x3074b1['$2'])],_0x300d43=_0x4de8f2(_0x4bff9c['$1'])[_0x38946e(0x19a)](/(?:USER|SUBJECT)/i)?_0x388f99:_0x589cd5;return!_0x300d43['states']()[_0x38946e(0x19d)](_0x5a8a25);}}},Game_Actor['prototype']['selectAction']=function(_0x55285c,_0x50a18d){const _0x2ef08d=_0x43f8e5;return Game_Enemy['prototype'][_0x2ef08d(0x208)][_0x2ef08d(0x109)](this,_0x55285c,_0x50a18d);},Game_Enemy[_0x43f8e5(0x11e)][_0x43f8e5(0x198)]=function(_0x4d0693){const _0x4349f6=_0x43f8e5,_0x1949ae=String(this[_0x4349f6(0x264)]())[_0x4349f6(0x196)]()['trim']();if(['random',_0x4349f6(0x1a5)][_0x4349f6(0x19d)](_0x1949ae))'ZTsWT'===_0x4349f6(0x19b)?this[_0x4349f6(0x27c)](_0x4d0693):_0xe0e4db=_0x167fbc[_0x4349f6(0x24f)]()[_0x4349f6(0x17e)]();else _0x1949ae===_0x4349f6(0x142)?this[_0x4349f6(0x265)](_0x4d0693):this[_0x4349f6(0x210)](_0x4d0693);},Game_Actor['prototype'][_0x43f8e5(0x198)]=function(_0x40782c){const _0x14ff4f=_0x43f8e5;Game_Enemy[_0x14ff4f(0x11e)][_0x14ff4f(0x198)]['call'](this,_0x40782c);},Game_Battler[_0x43f8e5(0x11e)]['selectAllActionsClassic']=function(_0x31b817){const _0x22204f=_0x43f8e5,_0x4120f2=Math[_0x22204f(0x295)](..._0x31b817[_0x22204f(0x164)](_0x25c4d5=>_0x25c4d5[_0x22204f(0x10b)])),_0x3be72b=_0x4120f2-this[_0x22204f(0x1f2)](),_0x117faa=this['numActions']();_0x31b817=_0x31b817['filter'](_0x9deb7e=>_0x9deb7e[_0x22204f(0x10b)]>=_0x3be72b);for(let _0x741b9d=0x0;_0x741b9d<_0x117faa;_0x741b9d++){_0x31b817=VisuMZ[_0x22204f(0x2a6)][_0x22204f(0x1aa)](_0x31b817);const _0x5bd70c=this['selectAction'](_0x31b817,_0x3be72b);this['action'](_0x741b9d)['setEnemyAction'](_0x5bd70c);}},VisuMZ[_0x43f8e5(0x2a6)][_0x43f8e5(0x1aa)]=function(_0x30b5c2){const _0x412922=_0x43f8e5;var _0x416547,_0x2eff22,_0x5ace57;for(_0x5ace57=_0x30b5c2[_0x412922(0x23d)]-0x1;_0x5ace57>0x0;_0x5ace57--){_0x416547=Math['floor'](Math[_0x412922(0x137)]()*(_0x5ace57+0x1)),_0x2eff22=_0x30b5c2[_0x5ace57],_0x30b5c2[_0x5ace57]=_0x30b5c2[_0x416547],_0x30b5c2[_0x416547]=_0x2eff22;}return _0x30b5c2;},Game_Battler[_0x43f8e5(0x11e)]['selectAllActionsGambit']=function(_0x22d802){const _0x576418=_0x43f8e5;for(let _0x24586=0x0;_0x24586<this['numActions']();_0x24586++){const _0x596ae3=_0x22d802[0x0];this[_0x576418(0x1c0)](_0x24586)[_0x576418(0x14e)](_0x596ae3);}},Game_Battler[_0x43f8e5(0x11e)][_0x43f8e5(0x27c)]=function(_0x35b932){const _0x13fcd4=_0x43f8e5;for(let _0x1bd527=0x0;_0x1bd527<this[_0x13fcd4(0x294)]();_0x1bd527++){const _0x254350=_0x35b932[Math['randomInt'](_0x35b932[_0x13fcd4(0x23d)])];this['action'](_0x1bd527)[_0x13fcd4(0x14e)](_0x254350);}},Game_Enemy[_0x43f8e5(0x11e)]['determineNewValidAIAction']=function(){const _0x42f6d6=_0x43f8e5;Game_Battler[_0x42f6d6(0x11e)]['determineNewValidAIAction'][_0x42f6d6(0x109)](this);if(this[_0x42f6d6(0x294)]()>0x0){if(_0x42f6d6(0x224)!==_0x42f6d6(0x130)){const _0x4aed8f=this['enemy']()[_0x42f6d6(0x23f)][_0x42f6d6(0x12d)](_0x205637=>this[_0x42f6d6(0x102)](_0x205637));if(_0x4aed8f[_0x42f6d6(0x23d)]>0x0){if(_0x42f6d6(0x27e)!=='XTMMd'){const _0x5cc210=_0x5bf7b4[_0x42f6d6(0x2a9)]();if(!_0x5cc210||_0x5cc210&&!_0x5cc210['item']())_0x1f3584['makeActions']();else _0x3d82a6['BattleAI'][_0x42f6d6(0x1bb)][_0x42f6d6(0x212)][_0x42f6d6(0x245)]&&_0x174044[_0x42f6d6(0x197)]();}else this[_0x42f6d6(0x198)](_0x4aed8f);}else{if('PyCZA'!=='dUHUD')this['clearActions']();else return _0x25d62d[_0x16fea7(_0x1c3694['$1'])];}}else return this[_0x42f6d6(0x26d)]()>0x0;}},VisuMZ['BattleAI'][_0x43f8e5(0x18f)]=Game_Unit[_0x43f8e5(0x11e)][_0x43f8e5(0x14c)],Game_Unit[_0x43f8e5(0x11e)][_0x43f8e5(0x14c)]=function(){const _0x248ea8=_0x43f8e5;VisuMZ[_0x248ea8(0x2a6)][_0x248ea8(0x18f)][_0x248ea8(0x109)](this),this[_0x248ea8(0x23c)]();},Game_Unit[_0x43f8e5(0x11e)]['initBattleAI']=function(){const _0x219806=_0x43f8e5;this['_applyAIForcedTargetFilters']=![],this[_0x219806(0x29d)]();},VisuMZ[_0x43f8e5(0x2a6)][_0x43f8e5(0x1d5)]=Game_Unit['prototype']['aliveMembers'],Game_Unit[_0x43f8e5(0x11e)][_0x43f8e5(0x17e)]=function(){const _0x21ac6c=_0x43f8e5;let _0x5f0039=VisuMZ[_0x21ac6c(0x2a6)]['Game_Unit_aliveMembers'][_0x21ac6c(0x109)](this);if(this[_0x21ac6c(0x119)]){if(_0x21ac6c(0x177)===_0x21ac6c(0x177)){const _0x380b1e=AIManager[_0x21ac6c(0x284)]();_0x5f0039=_0x5f0039[_0x21ac6c(0x12d)](_0xe224b6=>_0x380b1e[_0x21ac6c(0x19d)](_0xe224b6));}else return this['aiApplyElementalTgrInfluenceRate']()>0x0;}return _0x5f0039;},VisuMZ[_0x43f8e5(0x2a6)][_0x43f8e5(0x116)]=Game_Unit[_0x43f8e5(0x11e)][_0x43f8e5(0x151)],Game_Unit[_0x43f8e5(0x11e)]['randomTarget']=function(){const _0x31f7ff=_0x43f8e5;if(AIManager[_0x31f7ff(0x1e0)]()){if(_0x31f7ff(0x277)!==_0x31f7ff(0x277)){const _0x51b580=this[_0x31f7ff(0x24f)]();return _0x51b580[_0x31f7ff(0x1f7)](_0xf4dd25,this);}else this[_0x31f7ff(0x119)]=!![];}const _0x32fb7d=VisuMZ[_0x31f7ff(0x2a6)][_0x31f7ff(0x116)]['call'](this);return this['_applyAIForcedTargetFilters']=![],_0x32fb7d;},Game_Unit[_0x43f8e5(0x11e)][_0x43f8e5(0x29d)]=function(){const _0x44c544=_0x43f8e5;this[_0x44c544(0x279)]={'evaRates':[],'mevRates':[],'elementRates':{}};},Game_Unit[_0x43f8e5(0x11e)][_0x43f8e5(0x1e9)]=function(){const _0x5a5650=_0x43f8e5;if(this[_0x5a5650(0x279)]===undefined)this['clearAIKnowledge']();return this['_aiKnowledge'];},Game_Unit['prototype'][_0x43f8e5(0x29b)]=function(_0x2c9ad9,_0x44b64b){const _0x4df3f7=_0x43f8e5;this['aiKnowledge']()[_0x2c9ad9]=this['aiKnowledge']()[_0x2c9ad9]||[];const _0x53546d=_0x44b64b[_0x4df3f7(0x1a8)]()?_0x44b64b['actorId']():_0x44b64b[_0x4df3f7(0x296)]();!this[_0x4df3f7(0x1e9)]()[_0x2c9ad9][_0x4df3f7(0x19d)](_0x53546d)&&this[_0x4df3f7(0x1e9)]()[_0x2c9ad9][_0x4df3f7(0x237)](_0x53546d);},Game_Unit[_0x43f8e5(0x11e)][_0x43f8e5(0x1f7)]=function(_0x18fdef,_0x35a0ca){const _0x5db253=_0x43f8e5;if(!VisuMZ[_0x5db253(0x2a6)][_0x5db253(0x1bb)][_0x5db253(0x212)][_0x5db253(0x1fd)])return!![];const _0x1d3326=_0x18fdef[_0x5db253(0x19a)](/EVA/i)?_0x5db253(0x1ba):'mevRates';this[_0x5db253(0x1e9)]()[_0x1d3326]=this[_0x5db253(0x1e9)]()[_0x1d3326]||[];const _0x227afe=_0x35a0ca['isActor']()?_0x35a0ca[_0x5db253(0x2ad)]():_0x35a0ca[_0x5db253(0x296)]();return this[_0x5db253(0x1e9)]()[_0x1d3326][_0x5db253(0x19d)](_0x227afe);},Game_Unit[_0x43f8e5(0x11e)]['addElementAIKnowledge']=function(_0x5b08b1,_0x4e8322){const _0x1533d1=_0x43f8e5;this[_0x1533d1(0x1e9)]()[_0x1533d1(0x1d0)]=this[_0x1533d1(0x1e9)]()[_0x1533d1(0x1d0)]||{};const _0x5c6e4a=this['aiKnowledge']()['elementRates'];_0x5c6e4a[_0x5b08b1]=_0x5c6e4a[_0x5b08b1]||[];const _0x13dbf3=_0x4e8322['isActor']()?_0x4e8322[_0x1533d1(0x2ad)]():_0x4e8322[_0x1533d1(0x296)]();!_0x5c6e4a[_0x5b08b1][_0x1533d1(0x19d)](_0x13dbf3)&&_0x5c6e4a[_0x5b08b1][_0x1533d1(0x237)](_0x13dbf3);},Game_Unit['prototype'][_0x43f8e5(0x12f)]=function(_0x2cb360,_0x538bbc){const _0x446e60=_0x43f8e5;if(!VisuMZ[_0x446e60(0x2a6)][_0x446e60(0x1bb)][_0x446e60(0x212)]['LearnKnowledge'])return!![];this['aiKnowledge']()['elementRates']=this[_0x446e60(0x1e9)]()[_0x446e60(0x1d0)]||{};const _0x43d480=this[_0x446e60(0x1e9)]()[_0x446e60(0x1d0)];_0x43d480[_0x2cb360]=_0x43d480[_0x2cb360]||[];const _0x336bb4=_0x538bbc['isActor']()?_0x538bbc[_0x446e60(0x2ad)]():_0x538bbc[_0x446e60(0x296)]();return _0x43d480[_0x2cb360][_0x446e60(0x19d)](_0x336bb4);},VisuMZ[_0x43f8e5(0x2a6)][_0x43f8e5(0x15b)]=Game_Troop[_0x43f8e5(0x11e)][_0x43f8e5(0x1cf)],Game_Troop[_0x43f8e5(0x11e)][_0x43f8e5(0x1cf)]=function(_0x3731a1){const _0x1f55a7=_0x43f8e5;VisuMZ['BattleAI']['Game_Troop_setup'][_0x1f55a7(0x109)](this,_0x3731a1),this['clearAIKnowledge']();};