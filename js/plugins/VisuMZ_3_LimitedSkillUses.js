//=============================================================================
// VisuStella MZ - Limited Skill Uses
// VisuMZ_3_LimitedSkillUses.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_LimitedSkillUses = true;

var VisuMZ = VisuMZ || {};
VisuMZ.LimitedSkillUses = VisuMZ.LimitedSkillUses || {};
VisuMZ.LimitedSkillUses.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.04] [LimitedSkillUses]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Limited_Skill_Uses_VisuStella_MZ
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin enables you to set a limited amount of times certain skills (or
 * all skills) can be used per battle or ever. This adds a different type of
 * skill currency and balance mechanic in limiting the amount of times a skill
 * can be used without directly having to alter MP, TP, or the like.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Determine globally or individually how many skill uses a battler can use
 *   per battle (does not apply to basic attack and guard skills).
 * * Determine how many uses are restored per battle.
 * * Use notetag effects to alter the amount of uses a user or target has
 *   globally, for specific skill types, or for specific individual skills.
 * * Adjust how the limited uses are displayed in-game.
 * * Equipment, class types, states, etc. can all affect the maximum quantity
 *   of uses for skills, too.
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
 * * VisuMZ_1_SkillsStatesCore
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Basic Limited Use-Related Notetags ===
 * 
 * ---
 *
 * <Limited Uses: x>
 *
 * - Used for: Skill Notetags
 * - Sets the limited use maximum base amount for this skill.
 * - This value will override the Plugin Parameter settings for a base value if
 *   "All Skills Limited?" is turned on.
 * - Replace 'x' with a number value representing the base maximum uses this
 *   skill can have.
 *
 * ---
 *
 * <Unlimited Use>
 *
 * - Used for: Skill Notetags
 * - If the Plugin Parameter "All Skills Limited?" is turned on, this will
 *   disable limited uses for this skill, allowing it to be used in unlimited
 *   amounts independent of the Limited Use base.
 *
 * ---
 * 
 * === Use Recovery-Related Notetags ===
 * 
 * ---
 *
 * <Victory Uses Recover: x>
 * <Escape Uses Recover: x>
 * <Defeat Uses Recover: x>
 * <After Battle Uses Recover: x>
 *
 * - Used for: Skill Notetags
 * - Determines how many limited uses are recovered at the end of each battle
 *   depending on the result.
 *   - Victory notetag variant requires winning the battle.
 *   - Escape notetag variant requires escaping the battle.
 *   - Defeat notetag variant requires losing the battle.
 *   - After Battle notetag variant applies to all cases.
 * - Replace 'x' with how many uses are restored upon completing a battle.
 *
 * ---
 *
 * <Bypass Recover All Uses>
 *
 * - Used for: Skill Notetags
 * - This prevents the skill from recovering all uses with the "Recover All"
 *   event command.
 *
 * ---
 *
 * <Allow Recover All Uses>
 *
 * - Used for: Skill Notetags
 * - This allows the skill to recover all uses with the "Recover All" event
 *   command when the "Recover All?" plugin parameter is disabled.
 *
 * ---
 * 
 * === Use Alteration-Related Notetags ===
 * 
 * ---
 *
 * <User Global Uses: +x>
 * <User Global Uses: -x>
 *
 * <User SType id Uses: +x>
 * <User SType id Uses: -x>
 * <User SType name Uses: +x>
 * <User SType name Uses: -x>
 *
 * <User Skill id Uses: +x>
 * <User Skill id Uses: -x>
 * <User Skill name Uses: +x>
 * <User Skill name Uses: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the limited use amounts for the action's user.
 *   - Global notetag variant affects all limited uses.
 *   - SType notetag variant effects all skills with a matching type.
 *   - Skill notetag viarant effects a specific matching skill.
 * - This effect will only trigger once per action even if there are
 *   multiple hits as long as it successfully hits one target.
 * - Replace 'id' with the ID of the skill type.
 * - Replace 'name' with the name of the skill type (without text codes).
 * - Replace 'x' with the amount to alter the remaining uses by. Positive
 *   values restore uses while negative values reduce remaining uses.
 *
 * ---
 *
 * <Target Global Uses: +x>
 * <Target Global Uses: -x>
 *
 * <Target SType id Uses: +x>
 * <Target SType id Uses: -x>
 * <Target SType name Uses: +x>
 * <Target SType name Uses: -x>
 *
 * <Target Skill id Uses: +x>
 * <Target Skill id Uses: -x>
 * <Target Skill name Uses: +x>
 * <Target Skill name Uses: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the limited use amounts for the action's target.
 *   - Global notetag variant affects all limited uses.
 *   - SType notetag variant effects all skills with a matching type.
 *     - Replace 'id' with the ID of the skill type.
 *     - Replace 'name' with the name of the skill type (without text codes).
 *   - Skill notetag viarant effects a specific matching skill.
 *     - Replace 'id' with the ID of the skill.
 *     - Replace 'name' with the name of the skill.
 * - This effect will trigger with each successful hit against its target.
 * - Replace 'x' with the amount to alter the remaining uses by. Positive
 *   values restore uses while negative values reduce remaining uses.
 *
 * ---
 * 
 * === Trait Based-Related Notetags ===
 * 
 * ---
 *
 * <Gloal Use Max: +x>
 * <Gloal Use Max: -x>
 * 
 * <SType id Use Max: +x>
 * <SType id Use Max: -x>
 * <SType name Use Max: +x>
 * <SType name Use Max: -x>
 * 
 * <Skill id Use Max: +x>
 * <Skill id Use Max: -x>
 * <Skill name Use Max: +x>
 * <Skill name Use Max: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the maximum limited uses for all skills, skills of a particular
 *   type, or individual skills.
 *   - Global notetag variant affects all limited uses.
 *   - SType notetag variant effects all skills with a matching type.
 *     - Replace 'id' with the ID of the skill type.
 *     - Replace 'name' with the name of the skill type (without text codes).
 *   - Skill notetag viarant effects a specific matching skill.
 *     - Replace 'id' with the ID of the skill.
 *     - Replace 'name' with the name of the skill.
 * - Replace 'x' with the amount to adjust the maximum uses by. Positive values
 *   increase the maximum uses while negative values decrease them.
 *   - These will be hard capped by the settings found in the Plugin Parmeters.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Limited Skill Uses.
 *
 * ---
 *
 * General
 * 
 *   Limited Use Icon:
 *   - Icon used for representing Limited Uses in the cost.
 * 
 *   Cost Format:
 *   - Format for Limited Use cost display.
 *   - %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * 
 *   Empty Format:
 *   - Format for Limited Use cost display when empty.
 *   - %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * 
 *   Cost Position Front?:
 *   - Put the Limited Uses at the front of skill/item costs?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanical settings regarding Limited Skill Uses.
 *
 * ---
 *
 * All Limited
 * 
 *   All Skills Limited?:
 *   - Make all skills have limited uses?
 *   - Does not apply to basic attack and guard.
 * 
 *     Default Max:
 *     - If all skills are limited, what is the default maximum uses?
 *
 * ---
 *
 * Hard Caps
 * 
 *   Maximum:
 *   - What is the maximum hardcap for limited uses?
 * 
 *   Minimum:
 *   - What is the minimum hardcap for limited uses?
 *
 * ---
 *
 * Recovery
 * 
 *   Battle Victory:
 *   - How many uses for each skill does a victory restore by default?
 * 
 *   Battle Escape:
 *   - How many uses for each skill does an escape restore by default?
 * 
 *   Battle Defeat:
 *   - How many uses for each skill does a defeat restore by default?
 * 
 *   Recover All?:
 *   - Does the "Recover All" command restore Limited Skill Uses?
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
 * Version 1.04: May 5, 2022
 * * Documentation Update
 * ** Added a line for the <User Global Uses: +x>, <User SType id Uses: +x>,
 *    and <User Skill id Uses: +x> line of notetag effects:
 * *** This effect will only trigger once per action even if there are
 *     multiple hits as long as it successfully hits one target.
 * ** Added a line for the <Target Global Uses: +x>, <Target SType id Uses: +x>
 *    and <Target Skill id Uses: +x> line of notetag effects:
 * *** This effect will trigger with each successful hit against its target.
 * * Feature Update!
 * ** The user-based limited use change notetag effect will now only trigger
 *    once per action regardless of multiple hits or multiple targets. This
 *    will be different from the target-based limited use change where it will
 *    remain an effect that procs each time the target is hit.
 * 
 * Version 1.03: April 14, 2022
 * * Bug Fixes!
 * ** Limited uses will now recover for battle commands that are not a part of
 *    any learned skill sets. Fix made by Arisu.
 * 
 * Version 1.02: January 13, 2022
 * * Feature Update!
 * ** Removed unused template plugin commands. Update made by Arisu.
 * 
 * Version 1.01: March 26, 2021
 * * Compatibility Update!
 * ** Skill type limited uses now affect all skill types with skills that have
 *    multiple skill types declared through the Skills and States Core.
 * 
 * Version 1.00 Official Release Date: March 10, 2021
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
 * @param LimitedSkillUses
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
 * @desc General settings regarding Limited Skill Uses.
 * @default {"Icon:num":"160","CostFmt:str":"\\FS[22]\\C[8]%1/%2\\C[0]","EmptyFmt:str":"\\FS[22]\\C[8]Empty\\C[0]","CostPosition:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanical settings regarding Limited Skill Uses.
 * @default {"AllLimited":"","AllLimited:eval":"false","DefaultMax:num":"2","HardCaps":"","Maximum:num":"100","Minimum:num":"1","Recovery":"","BattleVictory:num":"10","BattleEscape:num":"5","BattleDefeat:num":"5","RecoverAll:eval":"true"}
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
 * @param Icon:num
 * @text Limited Use Icon
 * @desc Icon used for representing Limited Uses in the cost.
 * @default 160
 *
 * @param CostFmt:str
 * @text Cost Format
 * @desc Format for Limited Use cost display.
 * %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * @default \FS[22]\C[8]%1/%2\C[0]
 *
 * @param EmptyFmt:str
 * @text Empty Format
 * @desc Format for Limited Use cost display when empty.
 * %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * @default \FS[22]\C[8]Empty\C[0]
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the Limited Uses at the front of skill/item costs?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param AllLimited
 * @text All Limited
 *
 * @param AllLimited:eval
 * @text All Skills Limited?
 * @parent AllLimited
 * @type boolean
 * @on Limited
 * @off Normal
 * @desc Make all skills have limited uses?
 * Does not apply to basic attack and guard.
 * @default false
 *
 * @param DefaultMax:num
 * @text Default Max
 * @parent AllLimited:eval
 * @type number
 * @min 1
 * @desc If all skills are limited, what is the default maximum uses?
 * @default 2
 *
 * @param HardCaps
 * @text Hard Caps
 *
 * @param Maximum:num
 * @text Maximum
 * @parent HardCaps
 * @type number
 * @desc What is the maximum hardcap for limited uses?
 * @default 100
 *
 * @param Minimum:num
 * @text Minimum
 * @parent HardCaps
 * @type number
 * @desc What is the minimum hardcap for limited uses?
 * @default 1
 *
 * @param Recovery
 *
 * @param BattleVictory:num
 * @text Battle Victory
 * @parent Recovery
 * @type number
 * @desc How many uses for each skill does a victory restore by default?
 * @default 10
 *
 * @param BattleEscape:num
 * @text Battle Escape
 * @parent Recovery
 * @type number
 * @desc How many uses for each skill does an escape restore by default?
 * @default 5
 *
 * @param BattleDefeat:num
 * @text Battle Defeat
 * @parent Recovery
 * @type number
 * @desc How many uses for each skill does a defeat restore by default?
 * @default 5
 *
 * @param RecoverAll:eval
 * @text Recover All?
 * @parent Recovery
 * @type boolean
 * @on Recovers
 * @off Does Not
 * @desc Does the "Recover All" command restore Limited Skill Uses?
 * @default true
 *
 */
//=============================================================================

const _0xef1ea8=_0x7f48;(function(_0x2abdd1,_0x513e15){const _0x353035=_0x7f48,_0x122066=_0x2abdd1();while(!![]){try{const _0x4c6871=-parseInt(_0x353035(0x13c))/0x1*(parseInt(_0x353035(0x11f))/0x2)+-parseInt(_0x353035(0xd4))/0x3*(parseInt(_0x353035(0xf8))/0x4)+parseInt(_0x353035(0x11c))/0x5+parseInt(_0x353035(0xec))/0x6+-parseInt(_0x353035(0x120))/0x7+-parseInt(_0x353035(0x157))/0x8*(parseInt(_0x353035(0x122))/0x9)+-parseInt(_0x353035(0x164))/0xa*(-parseInt(_0x353035(0x11e))/0xb);if(_0x4c6871===_0x513e15)break;else _0x122066['push'](_0x122066['shift']());}catch(_0x3fbe74){_0x122066['push'](_0x122066['shift']());}}}(_0x2e71,0xbe274));function _0x2e71(){const _0x23f4f6=['UserSTypeLimitedUses','sIsak','escape','TargetGlobalLimitedUses','BattleEscape','vyZav','LIMITED_SKILL_USE_RECOVERY','30386800zBmdzD','ConvertParams','GlobalLimitedUses','prototype','IjgNA','_inBattle','_stypeIDs','clamp','name','limitedUseIcon','LimitedUse','4657548OEmCbb','ARRAYSTRUCT','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','limitedUseEmptyFmt','UserGlobalLimitedUses','BattleManager_endBattle','recoverAllLimitedSkillUses','eIYQq','parameters','WTKMO','LimitedSkillUses','\x5cI[%1]','BypassRecoverAll','JdHue','RecoverEscape','Game_Action_testItemEffect','makeAdditionalCostTextLimitedSkillUses','RrkXl','VpwAN','applyItemUserEffect','hevdB','_skillIDs','refresh','JMiWM','7755612IYxBjf','LIMITED_SKILL_USE_ALL_LIMITED','canRecoverAllLimitedSkillUses','qcFJb','call','AndYt','skillLimitedUseMax','skillTypes','skills','Game_Action_applyItemUserEffect','item','traitObjects','4wmznev','SkillLimitedUses','stypeId','ARRAYEVAL','format','ARRAYFUNC','parse','description','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Minimum','includes','Settings','DefaultMax','xelCb','_triggeredLimitedUseUserChange','isSkillLimitedUse','kcZFr','General','filter','BattleVictory','exit','victory','alterLimitedSkillUses','applyLimitedSkillUsesUserEffect','gbxmC','guardSkillId','IJmGf','getSkillTypes','newDJ','MchSJ','MNSgf','pEIzz','recoverLimitedSkillUses','LIMITED_SKILL_USE_RECOVER_ALL','Mechanics','LIMITED_SKILL_USE_HARDCAP_MIN','692060nfnrWR','limitedUseFmt','11iHYHoG','4mafmvt','3014599ujeLqh','defeat','5787XfqkSO','map','JSON','RegExp','recoverAll','status','test','skillCostSeparator','LIMITED_SKILL_USE_HARDCAP_MAX','replace','max','UserSkillLimitedUses','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','makeAdditionalSkillCostText','getStypeIdWithName','match','return\x200','endBattle','AllLimited','Game_BattlerBase_meetsSkillConditions','ARRAYJSON','uNbfY','TargetSkillLimitedUses','HrRtx','subject','_skillLimitedUseTimes','461918yrtYWI','paySkillCost','meetsSkillConditions','skillLimitedUseTimes','ylvdZ','getSkillIdWithName','_cache_SkillLimitedUseMax','AllowRecoverAll','Game_BattlerBase_refresh','trim','STypeLimitedUses','Game_BattlerBase_paySkillCost','Window_Base_makeAdditionalSkillCostText','Game_BattlerBase_recoverAll','EmptyFmt','BattleDefeat','testItemEffect','RecoverVictory','YqUTo','STR','toUpperCase','paySkillLimitedUse','LIMITED_SKILL_USE_BASE','setSkillLimitedUseTimes','ARRAYSTR','endBattleRecoveryLimitedSkillUses','TargetSTypeLimitedUses','9752BKiPco','TuHXA','version','isAttackOrGuardSkill','note','EVAL'];_0x2e71=function(){return _0x23f4f6;};return _0x2e71();}function _0x7f48(_0x5e29e2,_0x469cd4){const _0x2e718e=_0x2e71();return _0x7f48=function(_0x7f48a0,_0x405af1){_0x7f48a0=_0x7f48a0-0xcc;let _0x492b6b=_0x2e718e[_0x7f48a0];return _0x492b6b;},_0x7f48(_0x5e29e2,_0x469cd4);}var label=_0xef1ea8(0xde),tier=tier||0x0,dependencies=['VisuMZ_1_SkillsStatesCore'],pluginData=$plugins[_0xef1ea8(0x10a)](function(_0x4f8e64){const _0x13c397=_0xef1ea8;return _0x4f8e64[_0x13c397(0x127)]&&_0x4f8e64[_0x13c397(0xff)][_0x13c397(0x102)]('['+label+']');})[0x0];VisuMZ[label][_0xef1ea8(0x103)]=VisuMZ[label]['Settings']||{},VisuMZ[_0xef1ea8(0x165)]=function(_0x11df4a,_0x34ac0c){const _0x3b23fa=_0xef1ea8;for(const _0x544f17 in _0x34ac0c){if(_0x3b23fa(0x162)===_0x3b23fa(0x162)){if(_0x544f17['match'](/(.*):(.*)/i)){const _0x3d6db0=String(RegExp['$1']),_0x510ccf=String(RegExp['$2'])[_0x3b23fa(0x150)]()['trim']();let _0x18abcf,_0x55418f,_0x44d081;switch(_0x510ccf){case'NUM':_0x18abcf=_0x34ac0c[_0x544f17]!==''?Number(_0x34ac0c[_0x544f17]):0x0;break;case'ARRAYNUM':_0x55418f=_0x34ac0c[_0x544f17]!==''?JSON[_0x3b23fa(0xfe)](_0x34ac0c[_0x544f17]):[],_0x18abcf=_0x55418f['map'](_0x4046d2=>Number(_0x4046d2));break;case _0x3b23fa(0x15c):_0x18abcf=_0x34ac0c[_0x544f17]!==''?eval(_0x34ac0c[_0x544f17]):null;break;case _0x3b23fa(0xfb):_0x55418f=_0x34ac0c[_0x544f17]!==''?JSON[_0x3b23fa(0xfe)](_0x34ac0c[_0x544f17]):[],_0x18abcf=_0x55418f['map'](_0xec6cb6=>eval(_0xec6cb6));break;case _0x3b23fa(0x124):_0x18abcf=_0x34ac0c[_0x544f17]!==''?JSON[_0x3b23fa(0xfe)](_0x34ac0c[_0x544f17]):'';break;case _0x3b23fa(0x136):_0x55418f=_0x34ac0c[_0x544f17]!==''?JSON['parse'](_0x34ac0c[_0x544f17]):[],_0x18abcf=_0x55418f[_0x3b23fa(0x123)](_0x5b4ebb=>JSON[_0x3b23fa(0xfe)](_0x5b4ebb));break;case'FUNC':_0x18abcf=_0x34ac0c[_0x544f17]!==''?new Function(JSON['parse'](_0x34ac0c[_0x544f17])):new Function(_0x3b23fa(0x132));break;case _0x3b23fa(0xfd):_0x55418f=_0x34ac0c[_0x544f17]!==''?JSON[_0x3b23fa(0xfe)](_0x34ac0c[_0x544f17]):[],_0x18abcf=_0x55418f[_0x3b23fa(0x123)](_0x442795=>new Function(JSON[_0x3b23fa(0xfe)](_0x442795)));break;case _0x3b23fa(0x14f):_0x18abcf=_0x34ac0c[_0x544f17]!==''?String(_0x34ac0c[_0x544f17]):'';break;case _0x3b23fa(0x154):_0x55418f=_0x34ac0c[_0x544f17]!==''?JSON[_0x3b23fa(0xfe)](_0x34ac0c[_0x544f17]):[],_0x18abcf=_0x55418f[_0x3b23fa(0x123)](_0xa39074=>String(_0xa39074));break;case'STRUCT':_0x44d081=_0x34ac0c[_0x544f17]!==''?JSON[_0x3b23fa(0xfe)](_0x34ac0c[_0x544f17]):{},_0x18abcf=VisuMZ[_0x3b23fa(0x165)]({},_0x44d081);break;case _0x3b23fa(0xd5):_0x55418f=_0x34ac0c[_0x544f17]!==''?JSON['parse'](_0x34ac0c[_0x544f17]):[],_0x18abcf=_0x55418f['map'](_0xa95bcc=>VisuMZ[_0x3b23fa(0x165)]({},JSON[_0x3b23fa(0xfe)](_0xa95bcc)));break;default:continue;}_0x11df4a[_0x3d6db0]=_0x18abcf;}}else{const _0x411be3=_0x3fb56c[_0x5f5122(_0x5ad9e2)];_0x411be3&&this[_0x3b23fa(0x155)](_0x411be3,_0x442c02);}}return _0x11df4a;},(_0x299e81=>{const _0x4277d=_0xef1ea8,_0x3e040f=_0x299e81[_0x4277d(0xd1)];for(const _0x582269 of dependencies){if(!Imported[_0x582269]){alert(_0x4277d(0xd6)[_0x4277d(0xfc)](_0x3e040f,_0x582269)),SceneManager[_0x4277d(0x10c)]();break;}}const _0x4a48c7=_0x299e81[_0x4277d(0xff)];if(_0x4a48c7[_0x4277d(0x131)](/\[Version[ ](.*?)\]/i)){const _0x1a7770=Number(RegExp['$1']);if(_0x1a7770!==VisuMZ[label][_0x4277d(0x159)]){if(_0x4277d(0xe6)===_0x4277d(0xef))return _0x27db6c['status']&&_0x509cbd['description']['includes']('['+_0x161b11+']');else alert(_0x4277d(0x100)[_0x4277d(0xfc)](_0x3e040f,_0x1a7770)),SceneManager[_0x4277d(0x10c)]();}}if(_0x4a48c7[_0x4277d(0x131)](/\[Tier[ ](\d+)\]/i)){const _0x288c40=Number(RegExp['$1']);_0x288c40<tier?(alert(_0x4277d(0x12e)[_0x4277d(0xfc)](_0x3e040f,_0x288c40,tier)),SceneManager[_0x4277d(0x10c)]()):_0x4277d(0x112)===_0x4277d(0x112)?tier=Math[_0x4277d(0x12c)](_0x288c40,tier):_0x2c5771+=_0xe311cb(_0x1c0f92['$1'])||0x0;}VisuMZ[_0x4277d(0x165)](VisuMZ[label][_0x4277d(0x103)],_0x299e81[_0x4277d(0xdc)]);})(pluginData),VisuMZ[_0xef1ea8(0xde)]['RegExp']={'LimitedUse':/<(?:LIMIT|LIMITED) (?:USE|USES):[ ](\d+)>/i,'UnlimitedUse':/<UNLIMITED (?:USE|USES)>/i,'RecoverVictory':/<(?:VICTORY|AFTER BATTLE|BATTLE) (?:USE|USES) (?:RECOVER|RECOVERY):[ ](\d+)>/i,'RecoverEscape':/<(?:ESCAPE|AFTER BATTLE|BATTLE) (?:USE|USES) (?:RECOVER|RECOVERY):[ ](\d+)>/i,'RecoverDefeat':/<(?:DEFEAT|AFTER BATTLE|BATTLE) (?:USE|USES) (?:RECOVER|RECOVERY):[ ](\d+)>/i,'BypassRecoverAll':/<BYPASS RECOVER ALL USES>/i,'AllowRecoverAll':/<ALLOW RECOVER ALL USES>/i,'UserGlobalLimitedUses':/<USER GLOBAL (?:USE|USES):[ ]([\+\-]\d+)>/gi,'UserSTypeLimitedUses':/<USER STYPE[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'UserSkillLimitedUses':/<USER SKILL[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'TargetGlobalLimitedUses':/<TARGET GLOBAL (?:USE|USES):[ ]([\+\-]\d+)>/gi,'TargetSTypeLimitedUses':/<TARGET STYPE[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'TargetSkillLimitedUses':/<TARGET SKILL[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'GlobalLimitedUses':/<GLOBAL USE (?:MAX|MAXIMUM):[ ]([\+\-]\d+)>/i,'STypeLimitedUses':/<STYPE[ ](.*)[ ]USE (?:MAX|MAXIMUM):[ ]([\+\-]\d+)>/gi,'SkillLimitedUses':/<SKILL[ ](.*)[ ]USE (?:MAX|MAXIMUM):[ ]([\+\-]\d+)>/gi},DataManager[_0xef1ea8(0x141)]=function(_0x2e569f){const _0x55dd7c=_0xef1ea8;_0x2e569f=_0x2e569f[_0x55dd7c(0x150)]()[_0x55dd7c(0x145)](),this[_0x55dd7c(0xe9)]=this['_skillIDs']||{};if(this[_0x55dd7c(0xe9)][_0x2e569f])return this[_0x55dd7c(0xe9)][_0x2e569f];for(const _0x3699f5 of $dataSkills){if(!_0x3699f5)continue;this['_skillIDs'][_0x3699f5[_0x55dd7c(0xd1)]['toUpperCase']()[_0x55dd7c(0x145)]()]=_0x3699f5['id'];}return this[_0x55dd7c(0xe9)][_0x2e569f]||0x0;},DataManager[_0xef1ea8(0x130)]=function(_0x4e6852){const _0x1cd187=_0xef1ea8;_0x4e6852=_0x4e6852[_0x1cd187(0x150)]()[_0x1cd187(0x145)](),this[_0x1cd187(0xcf)]=this['_stypeIDs']||{};if(this['_stypeIDs'][_0x4e6852])return this[_0x1cd187(0xcf)][_0x4e6852];for(let _0x3ce1ff=0x1;_0x3ce1ff<0x64;_0x3ce1ff++){if(_0x1cd187(0x139)===_0x1cd187(0x139)){if(!$dataSystem[_0x1cd187(0xf3)][_0x3ce1ff])continue;let _0x4f8574=$dataSystem[_0x1cd187(0xf3)][_0x3ce1ff][_0x1cd187(0x150)]()[_0x1cd187(0x145)]();_0x4f8574=_0x4f8574[_0x1cd187(0x12b)](/\x1I\[(\d+)\]/gi,''),_0x4f8574=_0x4f8574[_0x1cd187(0x12b)](/\\I\[(\d+)\]/gi,''),this[_0x1cd187(0xcf)][_0x4f8574]=_0x3ce1ff;}else _0x2f9667=_0x1b1175[_0x1cd187(0x163)]['victory'];}return this[_0x1cd187(0xcf)][_0x4e6852]||0x0;},DataManager['isSkillLimitedUse']=function(_0x2002e6){const _0x3ce868=_0xef1ea8;if(!_0x2002e6)return![];const _0x4944bb=VisuMZ['LimitedSkillUses'][_0x3ce868(0x125)],_0x2b90e1=_0x2002e6[_0x3ce868(0x15b)];if(_0x2b90e1[_0x3ce868(0x131)](_0x4944bb[_0x3ce868(0xd3)]))return!![];else{if(_0x2b90e1['match'](_0x4944bb['UnlimitedUse'])){if(_0x3ce868(0x15e)!==_0x3ce868(0x15e))_0x491d46[_0x3ce868(0xde)][_0x3ce868(0x149)][_0x3ce868(0xf0)](this),this[_0x3ce868(0xda)]();else return![];}}return Game_BattlerBase[_0x3ce868(0xed)];},DataManager[_0xef1ea8(0xee)]=function(_0x16d34e){const _0x24d337=_0xef1ea8;if(!_0x16d34e)return![];const _0x42df07=VisuMZ['LimitedSkillUses'][_0x24d337(0x125)],_0x27aa4b=_0x16d34e[_0x24d337(0x15b)];if(Game_BattlerBase[_0x24d337(0x119)]){if(_0x27aa4b[_0x24d337(0x131)](_0x42df07[_0x24d337(0xe0)]))return![];return!![];}else{if(_0x27aa4b[_0x24d337(0x131)](_0x42df07[_0x24d337(0x143)]))return!![];return![];}},ImageManager['limitedUseIcon']=VisuMZ[_0xef1ea8(0xde)][_0xef1ea8(0x103)][_0xef1ea8(0x109)]['Icon'],TextManager[_0xef1ea8(0x11d)]=VisuMZ[_0xef1ea8(0xde)][_0xef1ea8(0x103)][_0xef1ea8(0x109)]['CostFmt'],TextManager[_0xef1ea8(0xd7)]=VisuMZ[_0xef1ea8(0xde)][_0xef1ea8(0x103)][_0xef1ea8(0x109)][_0xef1ea8(0x14a)],VisuMZ[_0xef1ea8(0xde)][_0xef1ea8(0xd9)]=BattleManager['endBattle'],BattleManager[_0xef1ea8(0x133)]=function(_0x29e857){const _0x101730=_0xef1ea8;VisuMZ[_0x101730(0xde)][_0x101730(0xd9)][_0x101730(0xf0)](this,_0x29e857),$gameParty[_0x101730(0x118)](_0x29e857);},VisuMZ[_0xef1ea8(0xde)][_0xef1ea8(0xf5)]=Game_Action['prototype'][_0xef1ea8(0xe7)],Game_Action[_0xef1ea8(0xcc)][_0xef1ea8(0xe7)]=function(_0x2282c8){const _0x1a0354=_0xef1ea8;VisuMZ[_0x1a0354(0xde)]['Game_Action_applyItemUserEffect'][_0x1a0354(0xf0)](this,_0x2282c8),this[_0x1a0354(0x10f)](_0x2282c8);},Game_Action[_0xef1ea8(0xcc)]['applyLimitedSkillUsesUserEffect']=function(_0x2ab007){const _0x5f33af=_0xef1ea8;if(!this[_0x5f33af(0xf6)]())return;const _0x36ebfc=VisuMZ[_0x5f33af(0xde)]['RegExp'];if(this['subject']()&&!this[_0x5f33af(0x106)]){this[_0x5f33af(0x106)]=!![];const _0x24c7bf=_0x36ebfc['UserGlobalLimitedUses'],_0xa08d84=_0x36ebfc['UserSTypeLimitedUses'],_0x1f5e49=_0x36ebfc[_0x5f33af(0x12d)];this[_0x5f33af(0x13a)]()[_0x5f33af(0x10e)](this[_0x5f33af(0xf6)](),_0x24c7bf,_0xa08d84,_0x1f5e49);}if(_0x2ab007){const _0x10c366=_0x36ebfc['TargetGlobalLimitedUses'],_0x3c9a72=_0x36ebfc['TargetSTypeLimitedUses'],_0x5208c4=_0x36ebfc[_0x5f33af(0x138)];_0x2ab007[_0x5f33af(0x10e)](this[_0x5f33af(0xf6)](),_0x10c366,_0x3c9a72,_0x5208c4);}},VisuMZ[_0xef1ea8(0xde)]['Game_Action_testItemEffect']=Game_Action[_0xef1ea8(0xcc)][_0xef1ea8(0x14c)],Game_Action[_0xef1ea8(0xcc)][_0xef1ea8(0x14c)]=function(_0x461d99,_0x441d6c){const _0x2fbf13=_0xef1ea8,_0x540e50=VisuMZ[_0x2fbf13(0xde)][_0x2fbf13(0x125)],_0x4bceb1=this[_0x2fbf13(0xf6)]()[_0x2fbf13(0x15b)],_0x283aa8=['UserGlobalLimitedUses','UserSTypeLimitedUses','UserSkillLimitedUses','TargetGlobalLimitedUses','TargetSTypeLimitedUses','TargetSkillLimitedUses'];for(const _0x5717fe of _0x283aa8){if(_0x2fbf13(0x140)!=='MmGte'){if(_0x4bceb1[_0x2fbf13(0x131)](_0x540e50[_0x5717fe]))return!![];}else{if(!_0x849bd2)return![];return _0x202f4c['id']===this['attackSkillId']()||_0x155ad5['id']===this[_0x2fbf13(0x111)]();}}return VisuMZ[_0x2fbf13(0xde)][_0x2fbf13(0xe3)][_0x2fbf13(0xf0)](this,_0x461d99,_0x441d6c);},Game_BattlerBase[_0xef1ea8(0xed)]=VisuMZ[_0xef1ea8(0xde)]['Settings'][_0xef1ea8(0x11a)][_0xef1ea8(0x134)],Game_BattlerBase['LIMITED_SKILL_USE_BASE']=VisuMZ[_0xef1ea8(0xde)]['Settings'][_0xef1ea8(0x11a)][_0xef1ea8(0x104)],Game_BattlerBase[_0xef1ea8(0x12a)]=VisuMZ[_0xef1ea8(0xde)][_0xef1ea8(0x103)][_0xef1ea8(0x11a)]['Maximum'],Game_BattlerBase[_0xef1ea8(0x11b)]=VisuMZ['LimitedSkillUses'][_0xef1ea8(0x103)][_0xef1ea8(0x11a)][_0xef1ea8(0x101)],Game_BattlerBase[_0xef1ea8(0x119)]=VisuMZ['LimitedSkillUses'][_0xef1ea8(0x103)][_0xef1ea8(0x11a)]['RecoverAll'],VisuMZ[_0xef1ea8(0xde)][_0xef1ea8(0x135)]=Game_BattlerBase[_0xef1ea8(0xcc)]['meetsSkillConditions'],Game_BattlerBase['prototype'][_0xef1ea8(0x13e)]=function(_0x1d632f){const _0x5f2161=_0xef1ea8;if(DataManager[_0x5f2161(0x107)](_0x1d632f)&&!this[_0x5f2161(0x15a)](_0x1d632f)){const _0x279535=this[_0x5f2161(0xf2)](_0x1d632f['id']),_0x54a974=this[_0x5f2161(0x13f)](_0x1d632f['id']);if(_0x54a974>=_0x279535)return![];}return VisuMZ[_0x5f2161(0xde)][_0x5f2161(0x135)][_0x5f2161(0xf0)](this,_0x1d632f);},Game_BattlerBase[_0xef1ea8(0xcc)][_0xef1ea8(0x15a)]=function(_0x395d74){const _0x257bcb=_0xef1ea8;if(!_0x395d74)return![];return _0x395d74['id']===this['attackSkillId']()||_0x395d74['id']===this[_0x257bcb(0x111)]();},VisuMZ[_0xef1ea8(0xde)][_0xef1ea8(0x144)]=Game_BattlerBase['prototype'][_0xef1ea8(0xea)],Game_BattlerBase[_0xef1ea8(0xcc)]['refresh']=function(){const _0x104872=_0xef1ea8;this['_cache_SkillLimitedUseMax']={},VisuMZ[_0x104872(0xde)]['Game_BattlerBase_refresh'][_0x104872(0xf0)](this);},VisuMZ[_0xef1ea8(0xde)][_0xef1ea8(0x147)]=Game_BattlerBase['prototype'][_0xef1ea8(0x13d)],Game_BattlerBase[_0xef1ea8(0xcc)][_0xef1ea8(0x13d)]=function(_0x4055d3){const _0x4eb6ac=_0xef1ea8;VisuMZ['LimitedSkillUses'][_0x4eb6ac(0x147)]['call'](this,_0x4055d3),DataManager[_0x4eb6ac(0x107)](_0x4055d3)&&!this[_0x4eb6ac(0x15a)](_0x4055d3)&&('xAUGq'===_0x4eb6ac(0xf1)?this[_0x4eb6ac(0x155)](_0x3b74d6,_0x302c5f):this['paySkillLimitedUse'](_0x4055d3['id'],0x1));},Game_BattlerBase[_0xef1ea8(0xcc)][_0xef1ea8(0xf2)]=function(_0x211b7b){const _0x264fe0=_0xef1ea8;this[_0x264fe0(0x142)]=this['_cache_SkillLimitedUseMax']||{};if(this[_0x264fe0(0x142)][_0x211b7b]){if(_0x264fe0(0xcd)==='IjgNA')return this['_cache_SkillLimitedUseMax'][_0x211b7b];else _0x3ede78=_0x572fb5(_0x337c7d['$1']);}return this[_0x264fe0(0x142)][_0x211b7b]=this['calcSkillLimitedUseMax'](_0x211b7b),this[_0x264fe0(0x142)][_0x211b7b];},Game_BattlerBase[_0xef1ea8(0xcc)]['calcSkillLimitedUseMax']=function(_0x243285){const _0x17601e=_0xef1ea8,_0x2e87e6=$dataSkills[_0x243285];if(!_0x2e87e6)return 0x0;const _0x3addd2=VisuMZ[_0x17601e(0xde)]['RegExp'],_0x35dd06=_0x2e87e6[_0x17601e(0x15b)];let _0x2af3c7=Game_BattlerBase[_0x17601e(0x152)];_0x35dd06[_0x17601e(0x131)](_0x3addd2['LimitedUse'])&&('kRpwI'!==_0x17601e(0xe1)?_0x2af3c7=Number(RegExp['$1']):_0x540e3b+=_0x569efe(_0x2f5095['$1']));const _0x296699=this[_0x17601e(0xf7)]();for(const _0x5cc8e9 of _0x296699){if(!_0x5cc8e9)continue;_0x5cc8e9[_0x17601e(0x15b)][_0x17601e(0x131)](_0x3addd2[_0x17601e(0x166)])&&(_0x2af3c7+=Number(RegExp['$1']));const _0x14756f=_0x5cc8e9[_0x17601e(0x15b)][_0x17601e(0x131)](_0x3addd2[_0x17601e(0x146)]);if(_0x14756f){if(_0x17601e(0x158)!==_0x17601e(0x117))for(const _0x4706d9 of _0x14756f){if(!_0x4706d9)continue;_0x4706d9['match'](_0x3addd2[_0x17601e(0x146)]);let _0x4010f2=String(RegExp['$1']);const _0x3300eb=Number(RegExp['$2']);_0x4010f2=(String(_0x4010f2)||'')[_0x17601e(0x145)]();const _0x51f188=/^\d+$/[_0x17601e(0x128)](_0x4010f2),_0xb619cc=_0x51f188?Number(_0x4010f2):DataManager[_0x17601e(0x130)](_0x4010f2);if(_0xb619cc===_0x2e87e6['stypeId'])_0x2af3c7+=_0x3300eb;}else{if(!this[_0x17601e(0xf6)]())return;const _0x58c949=_0xa73edb[_0x17601e(0xde)][_0x17601e(0x125)];if(this[_0x17601e(0x13a)]()&&!this['_triggeredLimitedUseUserChange']){this[_0x17601e(0x106)]=!![];const _0x211f46=_0x58c949[_0x17601e(0xd8)],_0x57c83b=_0x58c949['UserSTypeLimitedUses'],_0x4c0747=_0x58c949[_0x17601e(0x12d)];this[_0x17601e(0x13a)]()[_0x17601e(0x10e)](this[_0x17601e(0xf6)](),_0x211f46,_0x57c83b,_0x4c0747);}if(_0x50e6df){const _0x206543=_0x58c949[_0x17601e(0x160)],_0x3df7b1=_0x58c949['TargetSTypeLimitedUses'],_0x569fb9=_0x58c949[_0x17601e(0x138)];_0x8e354['alterLimitedSkillUses'](this[_0x17601e(0xf6)](),_0x206543,_0x3df7b1,_0x569fb9);}}}const _0x1ef3f0=_0x5cc8e9[_0x17601e(0x15b)][_0x17601e(0x131)](_0x3addd2[_0x17601e(0xf9)]);if(_0x1ef3f0){if(_0x17601e(0xdb)!==_0x17601e(0xdb))_0x5be09d=_0x99957+this[_0x17601e(0x129)]()+_0x421661;else for(const _0x470776 of _0x1ef3f0){if(!_0x470776)continue;_0x470776[_0x17601e(0x131)](_0x3addd2[_0x17601e(0xf9)]);let _0x1cd00d=String(RegExp['$1']);const _0xef2169=Number(RegExp['$2']);_0x1cd00d=(String(_0x1cd00d)||'')[_0x17601e(0x145)]();const _0x59ca49=/^\d+$/['test'](_0x1cd00d),_0x5d1712=_0x59ca49?Number(_0x1cd00d):DataManager[_0x17601e(0x141)](_0x1cd00d);if(_0x5d1712===_0x243285)_0x2af3c7+=_0xef2169;}}}_0x2af3c7=_0x2af3c7||0x0;const _0x146af7=Game_BattlerBase[_0x17601e(0x11b)],_0x3ef7f8=Game_BattlerBase[_0x17601e(0x12a)];return _0x2af3c7[_0x17601e(0xd0)](_0x146af7,_0x3ef7f8);},Game_BattlerBase[_0xef1ea8(0xcc)][_0xef1ea8(0x13f)]=function(_0x4ed929){const _0x37829a=_0xef1ea8,_0x1823d1=this[_0x37829a(0xf2)](_0x4ed929);this[_0x37829a(0x13b)]=this[_0x37829a(0x13b)]||{};if(this[_0x37829a(0x13b)][_0x4ed929])return this['_skillLimitedUseTimes'][_0x4ed929];return this[_0x37829a(0x13b)][_0x4ed929]=0x0,Math[_0x37829a(0x12c)](0x0,this[_0x37829a(0x13b)][_0x4ed929]);},Game_BattlerBase[_0xef1ea8(0xcc)]['paySkillLimitedUse']=function(_0x3fc4cd,_0x1dec76){const _0x29304f=_0xef1ea8;_0x1dec76=_0x1dec76||0x0,this[_0x29304f(0x13b)]=this[_0x29304f(0x13b)]||{},this[_0x29304f(0x13b)][_0x3fc4cd]=this[_0x29304f(0x13b)][_0x3fc4cd]||0x0,this[_0x29304f(0x13b)][_0x3fc4cd]+=_0x1dec76,this['_skillLimitedUseTimes'][_0x3fc4cd]=Math[_0x29304f(0x12c)](0x0,this[_0x29304f(0x13b)][_0x3fc4cd]);},Game_BattlerBase[_0xef1ea8(0xcc)][_0xef1ea8(0x153)]=function(_0x3c0ee1,_0x4d741e){const _0x12fd67=_0xef1ea8;_0x4d741e=_0x4d741e||0x0,this[_0x12fd67(0x13b)]=this[_0x12fd67(0x13b)]||{},this[_0x12fd67(0x13b)][_0x3c0ee1]=this[_0x12fd67(0x13b)][_0x3c0ee1]||0x0,this[_0x12fd67(0x13b)][_0x3c0ee1]=_0x4d741e,this[_0x12fd67(0x13b)][_0x3c0ee1]=Math[_0x12fd67(0x12c)](0x0,this[_0x12fd67(0x13b)][_0x3c0ee1]);},VisuMZ[_0xef1ea8(0xde)][_0xef1ea8(0x149)]=Game_BattlerBase['prototype'][_0xef1ea8(0x126)],Game_BattlerBase[_0xef1ea8(0xcc)][_0xef1ea8(0x126)]=function(){const _0x5260bc=_0xef1ea8;VisuMZ[_0x5260bc(0xde)][_0x5260bc(0x149)]['call'](this),this[_0x5260bc(0xda)]();},Game_BattlerBase[_0xef1ea8(0xcc)]['recoverAllLimitedSkillUses']=function(){const _0x47a8da=_0xef1ea8;this['_skillLimitedUseTimes']=this[_0x47a8da(0x13b)]||{};for(const _0x43d98a in this[_0x47a8da(0x13b)]){if(!this[_0x47a8da(0x13b)][_0x43d98a])continue;const _0x5139c6=Number(_0x43d98a)||0x0,_0x3dec22=$dataSkills[_0x5139c6];if(!_0x3dec22)continue;DataManager[_0x47a8da(0xee)](_0x3dec22)&&this[_0x47a8da(0x153)](_0x5139c6,0x0);}},Game_Battler[_0xef1ea8(0x163)]={'victory':VisuMZ['LimitedSkillUses'][_0xef1ea8(0x103)][_0xef1ea8(0x11a)][_0xef1ea8(0x10b)],'escape':VisuMZ[_0xef1ea8(0xde)]['Settings']['Mechanics'][_0xef1ea8(0x161)],'defeat':VisuMZ[_0xef1ea8(0xde)][_0xef1ea8(0x103)]['Mechanics'][_0xef1ea8(0x14b)]},Game_Battler[_0xef1ea8(0xcc)]['recoverLimitedSkillUsesBattle']=function(_0x39cd19){const _0x5280a5=_0xef1ea8;this[_0x5280a5(0x13b)]=this['_skillLimitedUseTimes']||{};for(const _0x8fd7eb in this[_0x5280a5(0x13b)]){const _0x415435=$dataSkills[Number(_0x8fd7eb)];_0x415435&&(_0x5280a5(0x105)!==_0x5280a5(0xe8)?this['endBattleRecoveryLimitedSkillUses'](_0x415435,_0x39cd19):_0x87dcb0=_0x15633f(_0x21e154['$1']));}},Game_Battler[_0xef1ea8(0xcc)][_0xef1ea8(0x155)]=function(_0x369b1d,_0x3becda){const _0x493b1c=_0xef1ea8;if(!_0x369b1d)return;if(!DataManager['isSkillLimitedUse'](_0x369b1d))return;const _0x1aa8a8=VisuMZ[_0x493b1c(0xde)]['RegExp'],_0x2a6104=_0x369b1d[_0x493b1c(0x15b)];let _0x5c3d15=0x0;if(_0x3becda===0x0){if(_0x2a6104[_0x493b1c(0x131)](_0x1aa8a8[_0x493b1c(0x14d)]))_0x5c3d15=Number(RegExp['$1']);else{if(_0x493b1c(0x14e)===_0x493b1c(0x14e))_0x5c3d15=Game_Battler[_0x493b1c(0x163)][_0x493b1c(0x10d)];else{const _0x372977=this[_0x493b1c(0xf2)](_0x5e7fcd['id']),_0x4fe21a=this['skillLimitedUseTimes'](_0x381eac['id']);if(_0x4fe21a>=_0x372977)return![];}}}else{if(_0x3becda===0x1){if(_0x493b1c(0xe5)===_0x493b1c(0x114)){if(!_0x241af1)return![];const _0x220329=_0x1ddf3e[_0x493b1c(0xde)][_0x493b1c(0x125)],_0x2e4ecd=_0x44542d[_0x493b1c(0x15b)];if(_0xf14b8c[_0x493b1c(0x119)]){if(_0x2e4ecd[_0x493b1c(0x131)](_0x220329['BypassRecoverAll']))return![];return!![];}else{if(_0x2e4ecd['match'](_0x220329[_0x493b1c(0x143)]))return!![];return![];}}else _0x2a6104[_0x493b1c(0x131)](_0x1aa8a8[_0x493b1c(0xe2)])?_0x5c3d15=Number(RegExp['$1']):_0x5c3d15=Game_Battler[_0x493b1c(0x163)][_0x493b1c(0x15f)];}else{if(_0x2a6104[_0x493b1c(0x131)](_0x1aa8a8['RecoverDefeat']))_0x5c3d15=Number(RegExp['$1']);else{if(_0x493b1c(0x137)!=='uNbfY'){if(_0x485926[_0x493b1c(0x131)](_0x3227fa[_0x220998]))return!![];}else _0x5c3d15=Game_Battler[_0x493b1c(0x163)][_0x493b1c(0x121)];}}}this['paySkillLimitedUse'](_0x369b1d['id'],-_0x5c3d15);},Game_Battler[_0xef1ea8(0xcc)][_0xef1ea8(0x10e)]=function(_0x104a0a,_0x5235f8,_0x2fe5da,_0x2b4006){const _0x2f9205=_0xef1ea8;for(const _0x1c301a of this[_0x2f9205(0xf4)]()){if(_0x2f9205(0xeb)===_0x2f9205(0xeb)){if(!_0x1c301a)continue;if(!DataManager[_0x2f9205(0x107)](_0x1c301a))continue;if(this['isAttackOrGuardSkill'](_0x1c301a))continue;const _0x3b16ef=_0x104a0a['note'];let _0x371125=0x0;_0x3b16ef[_0x2f9205(0x131)](_0x5235f8)&&(_0x371125+=Number(RegExp['$1'])||0x0);const _0x5daf1f=_0x3b16ef[_0x2f9205(0x131)](_0x2fe5da);if(_0x5daf1f){if(_0x2f9205(0x108)!==_0x2f9205(0x108))_0x459875=_0x1f0ec1+this[_0x2f9205(0x129)]()+_0x387eb0;else for(const _0x48033b of _0x5daf1f){if(_0x2f9205(0x110)===_0x2f9205(0x110)){if(!_0x48033b)continue;_0x48033b[_0x2f9205(0x131)](_0x2fe5da);let _0x49894b=String(RegExp['$1']);const _0x5d003f=Number(RegExp['$2']);_0x49894b=(String(_0x49894b)||'')[_0x2f9205(0x145)]();const _0x11b688=/^\d+$/[_0x2f9205(0x128)](_0x49894b),_0xa57a7b=_0x11b688?Number(_0x49894b):DataManager[_0x2f9205(0x130)](_0x49894b),_0x5a531a=DataManager[_0x2f9205(0x113)](_0x1c301a)||[_0x1c301a[_0x2f9205(0xfa)]];if(_0x5a531a[_0x2f9205(0x102)](_0xa57a7b))_0x371125+=_0x5d003f;}else _0xa57d99['match'](_0x2a7dc2['RecoverVictory'])?_0x1a3c9f=_0x4bcb0c(_0x3144d0['$1']):_0x277808=_0x3e8de3[_0x2f9205(0x163)][_0x2f9205(0x10d)];}}const _0x8cd56f=_0x3b16ef['match'](_0x2b4006);if(_0x8cd56f){if(_0x2f9205(0xdd)!==_0x2f9205(0x115))for(const _0x55763d of _0x8cd56f){if(!_0x55763d)continue;_0x55763d[_0x2f9205(0x131)](_0x2b4006);let _0xe3776c=String(RegExp['$1']);const _0x35ab75=Number(RegExp['$2']);_0xe3776c=(String(_0xe3776c)||'')['trim']();const _0x13d9de=/^\d+$/[_0x2f9205(0x128)](_0xe3776c),_0x2b6ccb=_0x13d9de?Number(_0xe3776c):DataManager[_0x2f9205(0x141)](_0xe3776c);if(_0x2b6ccb===_0x1c301a['id'])_0x371125+=_0x35ab75;}else{const _0x2c1d0b=_0x3e01c4[_0x2f9205(0xde)][_0x2f9205(0x125)],_0x2bbb20=this[_0x2f9205(0xf6)]()[_0x2f9205(0x15b)],_0xfbfd=[_0x2f9205(0xd8),_0x2f9205(0x15d),_0x2f9205(0x12d),_0x2f9205(0x160),_0x2f9205(0x156),_0x2f9205(0x138)];for(const _0x3e8f26 of _0xfbfd){if(_0x2bbb20[_0x2f9205(0x131)](_0x2c1d0b[_0x3e8f26]))return!![];}return _0x2ea694[_0x2f9205(0xde)][_0x2f9205(0xe3)][_0x2f9205(0xf0)](this,_0x1f64c8,_0x2d4e96);}}this[_0x2f9205(0x151)](_0x1c301a['id'],-_0x371125);}else return![];}},Game_Party[_0xef1ea8(0xcc)]['recoverLimitedSkillUses']=function(_0x56d6e8){const _0x18ae54=_0xef1ea8,_0x29bcc8=this[_0x18ae54(0xce)];this[_0x18ae54(0xce)]=![];for(const _0x756698 of this['allMembers']()){if(!_0x756698)continue;_0x756698['recoverLimitedSkillUsesBattle'](_0x56d6e8);}this['_inBattle']=_0x29bcc8;},VisuMZ[_0xef1ea8(0xde)]['Window_Base_makeAdditionalSkillCostText']=Window_Base['prototype'][_0xef1ea8(0x12f)],Window_Base[_0xef1ea8(0xcc)][_0xef1ea8(0x12f)]=function(_0x5584d4,_0x1b456c,_0x289eec){const _0x1d7f80=_0xef1ea8;return _0x289eec=VisuMZ['LimitedSkillUses'][_0x1d7f80(0x148)][_0x1d7f80(0xf0)](this,_0x5584d4,_0x1b456c,_0x289eec),_0x289eec=this['makeAdditionalCostTextLimitedSkillUses'](_0x5584d4,_0x1b456c,_0x289eec),_0x289eec;},Window_Base[_0xef1ea8(0xcc)][_0xef1ea8(0xe4)]=function(_0x3edef,_0x8e2a57,_0x32d28a){const _0xfa4ab0=_0xef1ea8;if(!_0x3edef)return _0x32d28a;if(!_0x8e2a57)return _0x32d28a;if(!DataManager['isSkillLimitedUse'](_0x8e2a57))return _0x32d28a;if(_0x3edef[_0xfa4ab0(0x15a)](_0x8e2a57))return _0x32d28a;const _0x2f5dd3=VisuMZ[_0xfa4ab0(0xde)]['Settings'][_0xfa4ab0(0x109)]['CostPosition'],_0x12e7e2=_0x3edef['skillLimitedUseMax'](_0x8e2a57['id']),_0x5a9a9a=_0x3edef[_0xfa4ab0(0x13f)](_0x8e2a57['id']),_0x13a303=Math[_0xfa4ab0(0x12c)](0x0,_0x12e7e2-_0x5a9a9a),_0x104d71=_0xfa4ab0(0xdf)[_0xfa4ab0(0xfc)](ImageManager[_0xfa4ab0(0xd2)]),_0x590359=_0x13a303>0x0?TextManager['limitedUseFmt']:TextManager[_0xfa4ab0(0xd7)];let _0x284c48=_0x590359['format'](_0x13a303,_0x12e7e2,_0x5a9a9a,_0x104d71);if(_0x32d28a==='')_0x32d28a+=_0x284c48;else _0x2f5dd3?_0x32d28a=_0x284c48+this[_0xfa4ab0(0x129)]()+_0x32d28a:_0xfa4ab0(0x116)===_0xfa4ab0(0x116)?_0x32d28a=_0x32d28a+this[_0xfa4ab0(0x129)]()+_0x284c48:(_0x19be0a[_0xfa4ab0(0xde)][_0xfa4ab0(0x147)][_0xfa4ab0(0xf0)](this,_0xa88544),_0x24c22b[_0xfa4ab0(0x107)](_0x2fb6e2)&&!this['isAttackOrGuardSkill'](_0x1fb185)&&this[_0xfa4ab0(0x151)](_0x365bc8['id'],0x1));return _0x32d28a;};