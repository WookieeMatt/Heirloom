//=============================================================================
// VisuStella MZ - Visual Fogs
// VisuMZ_4_VisualFogs.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualFogs = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualFogs = VisuMZ.VisualFogs || {};
VisuMZ.VisualFogs.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.06] [VisualFogs]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Fogs_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Fogs are a handy feature long removed from RPG Maker since RPG Maker XP.
 * This plugin reintroduces them back into RPG Maker MZ. Fogs function similar
 * to parallaxes, except rather than being under the tile map, fogs appear
 * above the tile map and the characters. This plugin gives you an unlimited
 * amount of fogs to apply to each map alongside many controls to make the fogs
 * appear more vivid.
 * 
 * A restricted fog area system is also added to this plugin to make fogs
 * appear only within certain regions and/or terrain tags. This way, you can
 * utilize parallaxes as masked layers for obscured sections of the map.
 * 
 * Sometimes, fogs may be too intrusive to the player's visibility. A vignette
 * feature has been added to make fogs appear only on the borders or certain
 * sides of the screen. This way, fogs can still add to the atmosphere without
 * obscuring too much of the visible screen.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add, change, and/or remove fogs through map notetags.
 * * Lots of customization options for each of the fogs.
 * * Limit where fogs can be displayed on the map through regions and/or
 *   terrain tags to obscure parts of the map.
 * * Use vignettes to obscure sides of the screen without affecting the center.
 * * Use Plugin Commands midway through the game to add, change, fade, and/or
 *   remove fogs as needed.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
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
 * Fogs
 * 
 * Fogs are not an inherent feature for the map editor. They need to be added
 * through map notetags or Plugin Commands.
 * 
 * Each of the fogs added through this plugin's notetags and/or commands are
 * assigned an ID. Referring back to the ID later will allow you to update
 * and/or remove that fog when needed.
 * 
 * When fogs are created, they appear above the tile map and characters, but
 * below the weather. This means they are created between the two layers when
 * the map's sprites are generated.
 * 
 * Fogs will behave very similar to parallaxes in how they move about the
 * screen. This means that if a fog is set to looping, it will loop in
 * accordance to the screen's display coordinates. This is to maintain
 * consistency with how the RPG Maker MZ engine behaves.
 *
 * ---
 * 
 * Regions and Terrain Tags
 * 
 * If you don't want a fog to appear for the whole entire foreground and want
 * to confine them to certain areas of the map, you can assign regions or
 * terrain tags for them to appear in.
 * 
 * *NOTE*: This effect does not work on looping maps.
 * 
 * Only the parts of the map marked by the designated regions and/or terrain
 * tags will reveal the fog. Those parts will be little squares each,
 * equal to the size of a tile. They have soft borders due to blurring options.
 * The foggy tiles will be slightly larger than normal due to spill values.
 * 
 * You may notice that some tiles don't blur well when they are towards the
 * right and bottom sides of the screen when the blur values are higher than
 * normal. This is a known issue with Pixi JS's filters and there's not much
 * the VisuStella team can do about it. Instead, what we recommend is that you
 * use a fog vignette on an upper layer to mask the bleeding issue.
 * 
 * Each fog layer can have their own custom regions and/or terrain tags to
 * appear in. These can be adjusted through the notetag settings or through the
 * Plugin Commands provided by this plugin. Fog layers can be limited to
 * multiple regions and/or terrain tags at the same time.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
 * 
 * Vignettes
 * 
 * If you don't want fogs to obscure the whole screen, use a vignette to make
 * them appear only at the sides of the screen. You can use custom vignette
 * masks or rendered ones provided by this plugin.
 * 
 * If you decide to make a custom vignette mask, create them similar to regular
 * image masks. This means that white areas of the masking image will be the
 * parts of the screen where the fog appears while the black areas of the image
 * will hide the fog. You can use gradients to make the vignette mask appear
 * more smooth.
 * 
 * Vignettes cannot be used with region and terrain tags. This is because the
 * region and terrain tag tiles move alongside the screen while vignettes are
 * always locked onto the borders of the screen. However, if you wish to use
 * both, just apply two different fog layers instead.
 * 
 * ---
 * 
 * Not For Battle
 * 
 * For clarification, the VisuStella MZ Visual Fogs plugin is NOT made for
 * battle. There's a separate plugin for that called Visual Battle Environment.
 * The reason why fogs aren't made for battle is because the way fogs are
 * handled in map vary from how they would be handled in battle. Using the
 * Visual Fogs Plugin Commands will only alter the fog appearances when the
 * player finishes battle.
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
 * === Fog-Related Notetags ===
 * 
 * ---
 *
 * <Fog id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Fog id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a regular fog layer for this map by default.
 * - Replace 'id' with a number value to assign to the fog.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no fog will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a fog found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 *
 * ---
 * 
 * -=-=- Optional Properties -=-=-
 * 
 * Replace the 'optional property' segment of the notetags above with any of
 * the text below to acquire their effects. You can add/remove as many of the
 * optional properties as you need.
 * 
 * ---
 * 
 * Horz Scroll: x
 * Vert Scroll: y
 * 
 * - This enables horizontal or vertical scrolling for the fog.
 * - Replace 'x' or 'y' with a Number value to determine how fast they will
 *   scroll across the screen.
 * - Use a negative value to make them scroll the other way.
 * - These effects are mutually exclusive from the "Map Locked" property.
 * 
 * ---
 * 
 * Map Locked
 * 
 * - This will cause the fog to only scroll when the map scrolls.
 * - This has the same effect as naming a fog with "!" in front of
 *   its filename.
 * - If the filename used for this fog has "!" in front of it, the
 *   Map Locked effect will be automatically turned on.
 * - These effect is mutually exclusive from the "Horz Scroll" and
 *   "Vert Scroll" properties.
 * 
 * ---
 * 
 * Opacity: x
 * Opacity: x%
 * 
 * - Changes the opacity level of the fog.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * 
 * ---
 * 
 * Blend Mode: Normal
 * Blend Mode: Additive
 * Blend Mode: Multiply
 * Blend Mode: Screen
 * 
 * - Sets the blend mode for the icon on the fog.
 * - Use only one of the above.
 * 
 * ---
 * 
 * Hue: x
 * Hue Shift: x
 * 
 * - Changes the hue of the fog to 'x' so that you don't need to create
 *   multiple copies of the files with different colors.
 * - Replace 'x' with a number value between 0 and 360.
 * - If the "Hue Shift" property is also used, then adjust the hue of the
 *   fog each frame by 'x' amount.
 *   - 'x' can be positive or negative.
 * 
 * ---
 * 
 * Color Tone: red, green, blue, gray
 * 
 * - Changes the color tone or tint of the fog.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * 
 * ---
 * 
 * Region: id
 * Regions: id, id, id
 * 
 * - Forces the fog to only become visible on tiles marked regions with a
 *   matching ID (alongside valid terrain tags).
 * - If this isn't used, then the fog will be as large as the screen.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the fog can appear on.
 * - This feature cannot be used with Vignettes.
 * - This feature cannot be used with looping maps.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Terrain Tag: id
 * Terrain Tags: id, id, id
 * 
 * - Forces the fog to only become visible on tiles marked terrain tags
 *   with a matching ID (alongside valid regions).
 * - If this isn't used, then the fog will be as large as the screen.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the fog can appear on.
 * - This feature cannot be used with Vignettes.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Tile Blur: x
 * 
 * - Determines how soft the borders are around the revealed fog tiles.
 * - Use larger numbers to blur them more.
 * - Use a value of zero to remove any blur.
 * 
 * ---
 * 
 * Tile Spill: x
 * 
 * - Determines how much larger to make the revealed fog tiles.
 * - Use larger numbers to spill more and make the tiles larger.
 * - Use a value of zero to not spill at all and use the exact tile sizes.
 * 
 * ---
 * 
 * Vignette: type
 * 
 * - Makes the fog appear along the edge of the screen rather than the entire
 *   visible game screen.
 * - Replace 'type' with any of the following:
 *   - Border
 *   - Horizontal
 *   - Vertical
 *   - Upper
 *   - Lower
 *   - Left
 *   - Right
 * 
 * ---
 * 
 * Custom Vignette: filename
 * 
 * - Allows you to use a custom parallax image as a vignette.
 * - Replace 'filename' with the filename of the image you want to use as
 *   a vignette found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Custom vignettes are used as masks.
 *   - White areas on the image determine the visible parts of the fog.
 *   - Black areas on the image determine the invisible parts of the fog.
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
 * === Fog Plugin Commands ===
 * 
 * ---
 *
 * Fog: Add/Change Settings
 * - Add/Change settings for target fog.
 * - Does not alter the map editor's fog.
 *
 *   Required:
 *
 *     ID:
 *     - What is the ID of this fog to be added/changed?
 *
 *     Filename:
 *     - What is the filename of the fog?
 * 
 *   Optional Settings:
 * 
 *     Scrolling:
 * 
 *       Map Lock?:
 *       - Lock the fog to the map's scrolling?
 *       - Automatically enable if the filename starts with "!"
 *
 *       Loop Horizontally?:
 *       - Loop the fog horizontally?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the horizontal scroll speed?
 *         - Use a negative value to invert the direction.
 *
 *       Loop Vertically?:
 *       - Loop the fog vertically?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the vertical scroll speed?
 *         - Use a negative value to invert the direction.
 * 
 *     Appearance:
 *
 *       Opacity:
 *       - What is the opacity level for this fog?
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the fog?
 *       - You may use JavaScript code.
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Hue:
 *       - Do you wish to adjust this fog's hue?
 *       - You may use JavaScript code.
 *
 *       Hue Shift:
 *       - How much do you want the hue to shift each frame?
 *       - You may use JavaScript code.
 *
 *       Color Tone:
 *       - What tone do you want for the fog?
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Location:
 *
 *       Regions:
 *       - Which regions will show this fog?
 *       - Does not work with 0. Leave empty to ignore.
 *
 *       Terrain Tags:
 *       - Which terrain tags will show this fog?
 *       - Does not work with 0. Leave empty to ignore.
 * 
 *       Tile Blur:
 *       - What's the blur level you wish to use for tiles?
 *       - You may use JavaScript code.
 * 
 *       Tile Spill:
 *       - What's the spill amount you wish to use for tiles?
 *       - You may use JavaScript code.
 * 
 *     Vignette:
 *
 *       Type:
 *       - What vignette do you want to use for this fog?
 *       - This will override location settings.
 * 
 *       Custom:
 *       - Do you wish to use a custom vignette instead?
 *       - Automatically changes the type to "Custom".
 *
 * ---
 * 
 * Fog: Fade Opacity
 * - Fades the target fog(s) opacity to a different value.
 * 
 *   ID(s):
 *   - Target which fog(s)?
 *   - Cannot target the map editor's fog.
 * 
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 * 
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 * 
 * ---
 *
 * Fog: Remove
 * - Removes target fog(s).
 *
 *   ID(s):
 *   - Remove which fog(s)?
 *   - Cannot remove the map editor's fog.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * The below are the default settings when it comes to creating fogs through
 * map notetags.
 *
 * ---
 *
 * Defaults
 * 
 *   Fog Opacity:
 *   - What is the default fog opacity level for map notetags?
 * 
 *   Blend Mode:
 *   - What is the default fog blend mode for map notetags?
 *     - Normal
 *     - Additive
 *     - Multiply
 *     - Screen
 * 
 *   Tile Blur:
 *   - What is the default fog tile blur intensity for map notetags?
 * 
 *   Tile Spill:
 *   - What is the default fog tile spill amount for map notetags?
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
 * Version 1.06: July 7, 2022
 * * Feature Update!
 * ** Blend modes are now revamped for the fogs to behave more like they do for
 *    pictures for better accuracy. Update made by Irina.
 * 
 * Version 1.05: December 9, 2021
 * * Documentation Update!
 * ** Added section to "Major Changes" for clarification purposes:
 * *** Not For Battle
 * *** For clarification, the VisuStella MZ Visual Fogs plugin is NOT made for
 *     battle. There's a separate plugin for that called Visual Battle
 *     Environment. The reason why fogs aren't made for battle is because the
 *     way fogs are handled in map vary from how they would be handled in
 *     battle. Using the Visual Fogs Plugin Commands will only alter the fog
 *     appearances when the player finishes battle.
 * * Feature Update!
 * ** Added fail safes to prevent Plugin Command usage during battle to cause
 *    problems while inside battle test. Update made by Irina.
 * 
 * Version 1.04: June 25, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for Event Title Scene.
 * 
 * Version 1.03: May 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: May 21, 2021
 * * Documentation Update!
 * ** Added a clause we forgot to mention that region-locked fog effects only
 *    work on maps with no looping. A note will be added to the "Regions and
 *    Terrain Tags" and notetag sections. We apologize for any inconveniences
 *    this may cause.
 * 
 * Version 1.01: May 7, 2021
 * * Bug Fixes!
 * ** Cached vignettes will no longer be cleared from memory. Fix by Irina.
 *
 * Version 1.00 Official Release Date: March 5, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FogAddChangeSettings
 * @text Fog: Add/Change Settings
 * @desc Add/Change settings for target fog.
 * Does not alter the map editor's fog.
 * 
 * @arg Required
 *
 * @arg id:num
 * @text ID
 * @parent Required
 * @type number
 * @min 1
 * @desc What is the ID of this fog to be added/changed?
 * @default 1
 *
 * @arg filename:str
 * @text Filename
 * @parent Required
 * @type file
 * @dir img/parallaxes/
 * @desc What is the filename of the fog?
 * @default >>>ATTENTION<<<
 *
 * @arg Optional:struct
 * @text Optional Settings
 * @type struct<Optional>
 * @desc Optional settings regarding Visual Fogs.
 * @default {"Scrolling":"","_fogZero:eval":"false","_fogLoopX:eval":"false","_fogSx:eval":"+0","_fogLoopY:eval":"false","_fogSy:eval":"+0","Appearance":"","opacity:eval":"200","blendMode:eval":"1","hue:eval":"0","hueShift:eval":"+0","colorTone:eval":"[0, 0, 0, 0]","Location":"","maskRegions:arraynum":"[]","maskTerrainTags:arraynum":"[]","maskBlur:eval":"10","maskSpill:eval":"10","Vignette":"","vignette:str":"None","vignetteFilename:str":""}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FogFadeOpacity
 * @text Fog: Fade Opacity
 * @desc Fades the target fog(s) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which fog(s)?
 * Cannot target the map editor's fog.
 * @default ["1"]
 *
 * @arg targetOpacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg opacityDuration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FogRemove
 * @text Fog: Remove
 * @desc Removes target fog(s).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which fog(s)?
 * Cannot remove the map editor's fog.
 * @default ["1"]
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
 * @param VisualFogs
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Defaults
 *
 * @param FogOpacity:num
 * @text Fog Opacity
 * @parent Defaults
 * @type number
 * @max 255
 * @desc What is the default fog opacity level for map notetags?
 * @default 200
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Defaults
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What is the default fog blend mode for map notetags?
 * @default 1
 *
 * @param MaskBlur:num
 * @text Tile Blur
 * @parent Defaults
 * @type number
 * @desc What is the default fog tile blur intensity for map notetags?
 * @default 10
 *
 * @param MaskSpill:num
 * @text Tile Spill
 * @parent Defaults
 * @type number
 * @desc What is the default fog tile spill amount for map notetags?
 * @default 10
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
 * Optional Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Optional:
 * 
 * @param Scrolling
 * 
 * @param _fogZero:eval
 * @text Map Lock?
 * @parent Scrolling
 * @type boolean
 * @on Map Lock
 * @off No Map Lock
 * @desc Lock the fog to the map's scrolling?
 * Automatically enable if the filename starts with "!"
 * @default false
 * 
 * @param _fogLoopX:eval
 * @text Loop Horizontally?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the fog horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _fogSx:eval
 * @text Scroll:
 * @parent _fogLoopX:eval
 * @desc What is the horizontal scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param _fogLoopY:eval
 * @text Loop Vertically?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the fog horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _fogSy:eval
 * @text Scroll:
 * @parent _fogLoopY:eval
 * @desc What is the vertical scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param Appearance
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Appearance
 * @desc What is the opacity level for this fog?
 * You may use JavaScript code.
 * @default 200
 *
 * @param blendMode:eval
 * @text Blend Mode
 * @parent Appearance
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the fog?
 * You may use JavaScript code.
 * @default 1
 *
 * @param hue:eval
 * @text Hue
 * @parent Appearance
 * @desc Do you wish to adjust this fog's hue?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hueShift:eval
 * @text Hue Shift
 * @parent hue:eval
 * @desc How much do you want the hue to shift each frame?
 * You may use JavaScript code.
 * @default +0
 *
 * @param colorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the fog?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 * 
 * @param Location
 *
 * @param maskRegions:arraynum
 * @text Regions
 * @parent Location
 * @type number[]
 * @min 1
 * @max 255
 * @desc Which regions will show this fog?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Location
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags will show this fog?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskBlur:eval
 * @text Tile Blur
 * @parent Location
 * @desc What's the blur level you wish to use for tiles?
 * You may use JavaScript code.
 * @default 10
 *
 * @param maskSpill:eval
 * @text Tile Spill
 * @parent Location
 * @desc What's the spill amount you wish to use for tiles?
 * You may use JavaScript code.
 * @default 10
 * 
 * @param Vignette
 *
 * @param vignette:str
 * @text Type
 * @parent Vignette
 * @type select
 * @option None
 * @option Border
 * @option Horizontal
 * @option Vertical
 * @option Upper
 * @option Lower
 * @option Left
 * @option Right
 * @desc What vignette do you want to use for this fog?
 * This will override location settings.
 * @default None
 *
 * @param vignetteFilename:str
 * @text Custom
 * @parent Vignette
 * @type file
 * @dir img/parallaxes/
 * @desc Do you wish to use a custom vignette instead?
 * Automatically changes the type to "Custom".
 * @default 
 *
 */
//=============================================================================

const _0x262a98=_0x4d92;(function(_0x575935,_0x5664ba){const _0x4f66b4=_0x4d92,_0x426c61=_0x575935();while(!![]){try{const _0x180a39=parseInt(_0x4f66b4(0x202))/0x1+-parseInt(_0x4f66b4(0x153))/0x2+-parseInt(_0x4f66b4(0x1d6))/0x3*(-parseInt(_0x4f66b4(0x1a4))/0x4)+parseInt(_0x4f66b4(0x170))/0x5*(-parseInt(_0x4f66b4(0x1b9))/0x6)+-parseInt(_0x4f66b4(0x1f6))/0x7*(parseInt(_0x4f66b4(0x165))/0x8)+parseInt(_0x4f66b4(0x107))/0x9*(parseInt(_0x4f66b4(0x191))/0xa)+parseInt(_0x4f66b4(0x130))/0xb*(parseInt(_0x4f66b4(0x161))/0xc);if(_0x180a39===_0x5664ba)break;else _0x426c61['push'](_0x426c61['shift']());}catch(_0x5920c1){_0x426c61['push'](_0x426c61['shift']());}}}(_0x4b33,0xc719e));var label=_0x262a98(0x16b),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x262a98(0x1de)](function(_0x3e6a9b){const _0x217067=_0x262a98;return _0x3e6a9b['status']&&_0x3e6a9b[_0x217067(0x1ba)][_0x217067(0x1a5)]('['+label+']');})[0x0];function _0x4b33(){const _0x245438=['opacityDuration','frUVa','_hue','status','setDisplayPos','targetOpacity','name','>>>ATTENTION<<<','MaskRegions','floor','Nkvrc','840796LDRjVx','addLoadListener','hueShift','EVAL','_fogZero','RgLnb','match','FogAddChangeSettings','_fogY','hue','getFogVignette_border','_fogSx','Optional','ualXu','map','bEpMD','call','4788pFGhiF','CustomVignette','format','mWucy','regionId','vertical','ARRAYSTR','ODSjS','prototype','CpAwj','yHfHj','ARRAYSTRUCT','updateVisualFogLayer','bind','split','BkKXZ','ARRAYEVAL','constructor','STRUCT','FnuHw','bitmap','ARRAYFUNC','update','SnosC','removeVisualFogLayer','updateParallax','setupVisualFogs','setHue','_customModified','_fogLoopY','CreateLayerData','loadCustomVignette','HueShift','dOuVm','createWeather','MaskSpill','fillRect','round','getFogVignette_empty','pRncJ','updateVisualFogSettings','88RJEmJi','empty','addChild','setup','loadBitmap','ADDITIVE','Filename','fkFhB','colorTone','scrollDown','wfiWN','createMaskBitmap','Argument\x20must\x20be\x20an\x20array','_createColorFilter','FogFadeOpacity','DgtNx','Settings','wTCGG','Game_Map_scrollUp','createFogContainer','border','max','exit','MaskBlur','displayY','charAt','hasOwnProperty','lOVrp','screenTileY','maskBlur','PremadeVignette','displayX','toLowerCase','_colorFilter','MqcXK','2317382nvLulO','_colorTone','blur','createMaskTileBitmap','removeChild','ceil','_maskFilter','isLoopVertical','fCOtf','getFogVignette_horizontal','byecN','upper','OpacityRate','tileWidth','1497012RStGAs','VertLoop','_maskSprite','dikRW','1035464DfwgxA','setColorTone','settings','toUpperCase','registerCommand','ARRAYJSON','VisualFogs','findTargetVisualFog','Game_Map_setup','FUNC','length','2195rMenkM','wBVdU','QVrCb','NUM','DEFAULT_FOG_TILE_SPILL','zIFVw','scrollUp','isLoopHorizontal','tileHeight','children','_fogSy','pfVUy','byyLs','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','createMaskSprite','clone','hDnpx','_fogContainer','AHdup','isInstanceOfSceneMap','scrollRight','getVisualFogs','rgba(0,\x200,\x200,\x200)','wdDWu','updateMask','getFogVignette_left','filename','_displayY','_baseSprite','note','initialize','sortVisualFogs','loadTemplateVignette','20870yYmxvt','DEFAULT_FOG_OPACITY','_id','STR','HorzLoop','BCbVW','getFogVignette','ScrollLock','Noaej','_spriteset','opacity','BlurFilter','kfMUM','ConvertParams','_updateColorFilter','equals','gradientFillRect','left','none','4ycWKKj','includes','clamp','maskSpill','updateTone','width','scrollLeft','updateHue','indexOf','Game_Map_scrollLeft','removeVisualFog','createFogLayers','getVisualFogOy','SpriteMaskFilter','maskRegions','wCdzO','trim','_fogLoopX','Game_Map_scrollDown','_visualFogSettings','lower','17328QVhJkd','description','updateBlendMode','Game_Map_setDisplayPos','custom','getVisualFogOx','_displayX','getVisualFogSettings','origin','DEFAULT_FOG_TILE_BLUR','isSceneMap','fYnEA','makeDeepCopy','find','_fogX','cKFCF','ueMbZ','OSfWE','vignette','EYekR','_fogName','Tone','create','getFogVignette_lower','tVmmQ','pRScp','vignetteFilename','createNewFogLayer','version','2432055SXIKjK','sort','OOfQc','loadParallax','Spriteset_Map_createWeather','blendMode','maskTerrainTags','MXRVm','filter','list','_scene','addChangeVisualFog','terrainTag','hqpRY','FogRemove','ARRAYNUM','parse','TemplateSettings','filters','height','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_blurFilter','Start','updateOpacity','BlendMode','#ffffff','jiFfu','screenTileX','return\x200','_fogVignettes','push','DEFAULT_FOG_BLEND_MODE','28WMZgoz'];_0x4b33=function(){return _0x245438;};return _0x4b33();}VisuMZ[label]['Settings']=VisuMZ[label][_0x262a98(0x140)]||{},VisuMZ['ConvertParams']=function(_0x5ba222,_0x444b58){const _0x89ffbc=_0x262a98;for(const _0x405535 in _0x444b58){if(_0x89ffbc(0x199)==='Noaej'){if(_0x405535[_0x89ffbc(0x208)](/(.*):(.*)/i)){if(_0x89ffbc(0x13f)!==_0x89ffbc(0x13f))return _0x5742a0[_0x89ffbc(0x1fa)]&&_0x5877f4['description'][_0x89ffbc(0x1a5)]('['+_0x9e911f+']');else{const _0x25edce=String(RegExp['$1']),_0x26d05c=String(RegExp['$2'])['toUpperCase']()[_0x89ffbc(0x1b4)]();let _0x4db6db,_0x2be6c7,_0x4ee074;switch(_0x26d05c){case _0x89ffbc(0x173):_0x4db6db=_0x444b58[_0x405535]!==''?Number(_0x444b58[_0x405535]):0x0;break;case _0x89ffbc(0x1e5):_0x2be6c7=_0x444b58[_0x405535]!==''?JSON[_0x89ffbc(0x1e6)](_0x444b58[_0x405535]):[],_0x4db6db=_0x2be6c7[_0x89ffbc(0x104)](_0x1e34e9=>Number(_0x1e34e9));break;case _0x89ffbc(0x205):_0x4db6db=_0x444b58[_0x405535]!==''?eval(_0x444b58[_0x405535]):null;break;case _0x89ffbc(0x117):_0x2be6c7=_0x444b58[_0x405535]!==''?JSON['parse'](_0x444b58[_0x405535]):[],_0x4db6db=_0x2be6c7[_0x89ffbc(0x104)](_0x84ae0e=>eval(_0x84ae0e));break;case'JSON':_0x4db6db=_0x444b58[_0x405535]!==''?JSON[_0x89ffbc(0x1e6)](_0x444b58[_0x405535]):'';break;case _0x89ffbc(0x16a):_0x2be6c7=_0x444b58[_0x405535]!==''?JSON[_0x89ffbc(0x1e6)](_0x444b58[_0x405535]):[],_0x4db6db=_0x2be6c7[_0x89ffbc(0x104)](_0x3d4121=>JSON[_0x89ffbc(0x1e6)](_0x3d4121));break;case _0x89ffbc(0x16e):_0x4db6db=_0x444b58[_0x405535]!==''?new Function(JSON['parse'](_0x444b58[_0x405535])):new Function(_0x89ffbc(0x1f2));break;case _0x89ffbc(0x11c):_0x2be6c7=_0x444b58[_0x405535]!==''?JSON['parse'](_0x444b58[_0x405535]):[],_0x4db6db=_0x2be6c7[_0x89ffbc(0x104)](_0x3ed5d0=>new Function(JSON[_0x89ffbc(0x1e6)](_0x3ed5d0)));break;case _0x89ffbc(0x194):_0x4db6db=_0x444b58[_0x405535]!==''?String(_0x444b58[_0x405535]):'';break;case _0x89ffbc(0x10d):_0x2be6c7=_0x444b58[_0x405535]!==''?JSON[_0x89ffbc(0x1e6)](_0x444b58[_0x405535]):[],_0x4db6db=_0x2be6c7[_0x89ffbc(0x104)](_0x3de3c4=>String(_0x3de3c4));break;case _0x89ffbc(0x119):_0x4ee074=_0x444b58[_0x405535]!==''?JSON['parse'](_0x444b58[_0x405535]):{},_0x4db6db=VisuMZ['ConvertParams']({},_0x4ee074);break;case _0x89ffbc(0x112):_0x2be6c7=_0x444b58[_0x405535]!==''?JSON[_0x89ffbc(0x1e6)](_0x444b58[_0x405535]):[],_0x4db6db=_0x2be6c7['map'](_0x371569=>VisuMZ[_0x89ffbc(0x19e)]({},JSON[_0x89ffbc(0x1e6)](_0x371569)));break;default:continue;}_0x5ba222[_0x25edce]=_0x4db6db;}}}else _0x4d66ef[_0x89ffbc(0x1c7)]=_0x20ac27;}return _0x5ba222;},(_0x4eac7c=>{const _0x11c5d1=_0x262a98,_0x3d18da=_0x4eac7c[_0x11c5d1(0x1fd)];for(const _0x5211f4 of dependencies){if(_0x11c5d1(0x128)!==_0x11c5d1(0x105)){if(!Imported[_0x5211f4]){alert(_0x11c5d1(0x1ea)[_0x11c5d1(0x109)](_0x3d18da,_0x5211f4)),SceneManager[_0x11c5d1(0x146)]();break;}}else{if(!this[_0x11c5d1(0x163)])return;const _0x5201a1=this[_0x11c5d1(0x167)]()['maskRegions'],_0x54809a=this[_0x11c5d1(0x167)]()[_0x11c5d1(0x1dc)];if(this[_0x11c5d1(0x167)]()[_0x11c5d1(0x1cb)]!=='none')this['_maskSprite']['x']=0x0,this[_0x11c5d1(0x163)]['y']=0x0;else{if(_0x5201a1[_0x11c5d1(0x16f)]>0x0||_0x54809a[_0x11c5d1(0x16f)]>0x0)this[_0x11c5d1(0x163)]['x']=_0xef8a1b['floor'](-_0x4a0077[_0x11c5d1(0x14f)]()*_0x504926[_0x11c5d1(0x160)]()),this[_0x11c5d1(0x163)]['y']=_0x43ff29['floor'](-_0x12d910['displayY']()*_0x349133[_0x11c5d1(0x178)]());else this['settings']()[_0x11c5d1(0x1cb)]===_0x11c5d1(0x1a3)&&(this['_maskSprite']['x']=0x0,this[_0x11c5d1(0x163)]['y']=0x0);}}}const _0x150861=_0x4eac7c[_0x11c5d1(0x1ba)];if(_0x150861[_0x11c5d1(0x208)](/\[Version[ ](.*?)\]/i)){const _0x59eb4f=Number(RegExp['$1']);if(_0x59eb4f!==VisuMZ[label][_0x11c5d1(0x1d5)]){if(_0x11c5d1(0x201)===_0x11c5d1(0x201))alert(_0x11c5d1(0x17d)[_0x11c5d1(0x109)](_0x3d18da,_0x59eb4f)),SceneManager[_0x11c5d1(0x146)]();else return 0x0;}}if(_0x150861[_0x11c5d1(0x208)](/\[Tier[ ](\d+)\]/i)){const _0x328844=Number(RegExp['$1']);_0x328844<tier?_0x11c5d1(0x172)===_0x11c5d1(0x1c4)?_0x4d56cd['removeVisualFogLayer'](_0x1c5f94):(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x11c5d1(0x109)](_0x3d18da,_0x328844,tier)),SceneManager[_0x11c5d1(0x146)]()):tier=Math[_0x11c5d1(0x145)](_0x328844,tier);}VisuMZ[_0x11c5d1(0x19e)](VisuMZ[label]['Settings'],_0x4eac7c['parameters']);})(pluginData),VisuMZ[_0x262a98(0x16b)][_0x262a98(0x1e7)]=function(){const _0x332017=_0x262a98;return{'id':0x0,'filename':'','_fogZero':![],'_fogLoopX':![],'_fogLoopY':![],'_fogSx':0x0,'_fogSy':0x0,'_fogX':0x0,'_fogY':0x0,'opacity':Game_Map[_0x332017(0x192)],'targetOpacity':Game_Map[_0x332017(0x192)],'opacityDuration':0x0,'blendMode':Game_Map['DEFAULT_FOG_BLEND_MODE'],'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[],'maskBlur':Game_Map[_0x332017(0x1c2)],'maskSpill':Game_Map[_0x332017(0x174)],'vignette':_0x332017(0x1a3),'vignetteFilename':''};},PluginManager[_0x262a98(0x169)](pluginData[_0x262a98(0x1fd)],_0x262a98(0x209),_0xa2d95=>{const _0x55e931=_0x262a98;VisuMZ['ConvertParams'](_0xa2d95,_0xa2d95);if(_0xa2d95['id']<=0x0)return;if(_0xa2d95[_0x55e931(0x18a)]===''||_0xa2d95[_0x55e931(0x18a)]===_0x55e931(0x1fe))return;let _0x46caa3=JsonEx['makeDeepCopy'](_0xa2d95['Optional']);if(!_0x46caa3[_0x55e931(0x14a)](_0x55e931(0x1b2)))_0x46caa3=VisuMZ[_0x55e931(0x16b)][_0x55e931(0x1e7)]();_0x46caa3[_0x55e931(0x18a)]=_0xa2d95[_0x55e931(0x18a)],_0x46caa3['id']=_0xa2d95['id'];while(_0x46caa3[_0x55e931(0x138)]['length']<0x4){_0x46caa3[_0x55e931(0x138)]['push'](0x0);}_0x46caa3[_0x55e931(0x1c7)]=0x0,_0x46caa3['_fogY']=0x0,_0x46caa3[_0x55e931(0x1fc)]=_0xa2d95[_0x55e931(0x19b)],_0x46caa3[_0x55e931(0x1f7)]=0x0,_0x46caa3[_0x55e931(0x1cb)]=_0x46caa3[_0x55e931(0x1cb)]||'none',_0x46caa3[_0x55e931(0x1cb)]=_0x46caa3[_0x55e931(0x1cb)][_0x55e931(0x150)]()[_0x55e931(0x1b4)](),_0x46caa3[_0x55e931(0x1d3)]!==''&&('EgmNK'==='EgmNK'?_0x46caa3[_0x55e931(0x1cb)]=_0x55e931(0x1bd):this[_0x55e931(0x13d)]()),$gameMap[_0x55e931(0x1e1)](_0x46caa3);}),PluginManager[_0x262a98(0x169)](pluginData[_0x262a98(0x1fd)],_0x262a98(0x13e),_0x2fdbcd=>{const _0x327e64=_0x262a98;if(!SceneManager[_0x327e64(0x183)]())return;VisuMZ['ConvertParams'](_0x2fdbcd,_0x2fdbcd);const _0x1c5f35=_0x2fdbcd[_0x327e64(0x1df)];for(const _0x266a2d of _0x1c5f35){const _0x3e8499=$gameMap[_0x327e64(0x1c0)](_0x266a2d);if(!_0x3e8499)continue;_0x3e8499[_0x327e64(0x1fc)]=_0x2fdbcd[_0x327e64(0x1fc)]||0x0,_0x3e8499['opacityDuration']=_0x2fdbcd[_0x327e64(0x1f7)]||0x0,_0x3e8499[_0x327e64(0x1f7)]<=0x0&&(_0x3e8499[_0x327e64(0x19b)]=_0x3e8499[_0x327e64(0x1fc)]);}}),PluginManager['registerCommand'](pluginData['name'],_0x262a98(0x1e4),_0xee8934=>{const _0x4086ab=_0x262a98;if(!SceneManager[_0x4086ab(0x183)]())return;VisuMZ[_0x4086ab(0x19e)](_0xee8934,_0xee8934);const _0x4bf733=_0xee8934[_0x4086ab(0x1df)];for(const _0x3eacf6 of _0x4bf733){$gameMap[_0x4086ab(0x1ae)](_0x3eacf6);}}),VisuMZ[_0x262a98(0x16b)]['RegExp']={'Start':/<(?:FOG)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'End':/<\/(?:FOG)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'Filename':/(?:FILENAME|NAME):[ ](.*)/i,'HorzLoop':/(?:HORZ|HORIZONTAL) (?:LOOP|SCROLL):[ ](.*)/i,'VertLoop':/(?:VERT|VERTICAL) (?:LOOP|SCROLL):[ ](.*)/i,'ScrollLock':/<(?:MAP|SCROLL)[ ](?:LOCK|LOCKED)>/i,'OpacityRate':/(?:OPACITY):[ ](\d+)([%％])/i,'OpacityFlat':/(?:OPACITY):[ ](\d+)/i,'BlendMode':/BLEND MODE:[ ](.*)/i,'Hue':/HUE:[ ](\d+)/i,'HueShift':/HUE (?:SHIFT|SPEED):[ ](.*)/i,'Tone':/(?:COLOR TONE|TONE|TINT):[ ](.*)/i,'MaskRegions':/(?:REGION|REGIONS):[ ](.*)/i,'MaskTerrainTags':/TERRAIN (?:TAG|TAGS):[ ](.*)/i,'MaskBlur':/(?:TILE BLUR|BLUR):[ ](.*)/i,'MaskSpill':/(?:TILE SPILL|SPILL):[ ](.*)/i,'CustomVignette':/CUSTOM (?:VIGNETTE|OVERLAY):[ ](.*)/i,'PremadeVignette':/(?:VIGNETTE|OVERLAY):[ ](.*)/i},ImageManager[_0x262a98(0x197)]=function(_0x12e75d){const _0x4c0967=_0x262a98;if(!_0x12e75d)return this['getFogVignette_empty']();this[_0x4c0967(0x1f3)]=this[_0x4c0967(0x1f3)]||{},_0x12e75d=_0x12e75d['toLowerCase']()[_0x4c0967(0x1b4)]();const _0x1f4ee5='getFogVignette_%1'[_0x4c0967(0x109)](_0x12e75d);if(this[_0x4c0967(0x1f3)][_0x12e75d]){if(_0x4c0967(0x12e)!==_0x4c0967(0x15b))return this[_0x4c0967(0x1f3)][_0x12e75d];else{_0x5403e2[_0x4c0967(0x19e)](_0x4c9e2a,_0x4e29c2);if(_0xc92d14['id']<=0x0)return;if(_0x56e082[_0x4c0967(0x18a)]===''||_0x3dd8a6[_0x4c0967(0x18a)]===_0x4c0967(0x1fe))return;let _0x247553=_0x1601b7[_0x4c0967(0x1c5)](_0x41e763[_0x4c0967(0x20e)]);if(!_0x247553[_0x4c0967(0x14a)](_0x4c0967(0x1b2)))_0x247553=_0x2abc76['VisualFogs']['TemplateSettings']();_0x247553[_0x4c0967(0x18a)]=_0x326f61[_0x4c0967(0x18a)],_0x247553['id']=_0x199471['id'];while(_0x247553[_0x4c0967(0x138)][_0x4c0967(0x16f)]<0x4){_0x247553['colorTone'][_0x4c0967(0x1f4)](0x0);}_0x247553[_0x4c0967(0x1c7)]=0x0,_0x247553['_fogY']=0x0,_0x247553[_0x4c0967(0x1fc)]=_0x52b94d['opacity'],_0x247553[_0x4c0967(0x1f7)]=0x0,_0x247553[_0x4c0967(0x1cb)]=_0x247553['vignette']||_0x4c0967(0x1a3),_0x247553[_0x4c0967(0x1cb)]=_0x247553[_0x4c0967(0x1cb)][_0x4c0967(0x150)]()[_0x4c0967(0x1b4)](),_0x247553['vignetteFilename']!==''&&(_0x247553['vignette']=_0x4c0967(0x1bd)),_0x1a8854[_0x4c0967(0x1e1)](_0x247553);}}else return this[_0x1f4ee5]?_0x4c0967(0x110)===_0x4c0967(0x110)?this[_0x1f4ee5]():_0x1299de[_0x4c0967(0x1c7)]*this[_0x4c0967(0x160)]():this[_0x4c0967(0x12d)]();},ImageManager[_0x262a98(0x12d)]=function(){const _0x4993af=_0x262a98;if(this[_0x4993af(0x1f3)][_0x4993af(0x131)])return this[_0x4993af(0x1f3)][_0x4993af(0x131)];const _0x524d41=new Bitmap(Graphics[_0x4993af(0x1a9)],Graphics['height']);return _0x524d41[_0x4993af(0x12b)](0x0,0x0,_0x524d41[_0x4993af(0x1a9)],_0x524d41[_0x4993af(0x1e9)],_0x4993af(0x1ef)),_0x524d41[_0x4993af(0x123)]=![],this[_0x4993af(0x1f3)]=this[_0x4993af(0x1f3)]||{},this['_fogVignettes'][_0x4993af(0x131)]=_0x524d41,_0x524d41;},ImageManager['getFogVignette_upper']=function(){const _0x29d104=_0x262a98,_0x2c5fc8=new Bitmap(Graphics[_0x29d104(0x1a9)],Graphics[_0x29d104(0x1e9)]),_0x1a1d20='rgba(0,\x200,\x200,\x200)',_0x10a6f1=_0x29d104(0x1ef);return _0x2c5fc8[_0x29d104(0x1a1)](0x0,0x0,Graphics[_0x29d104(0x1a9)],Math[_0x29d104(0x158)](Graphics[_0x29d104(0x1e9)]/0x3),_0x10a6f1,_0x1a1d20,!![]),_0x2c5fc8[_0x29d104(0x123)]=![],this[_0x29d104(0x1f3)]=this[_0x29d104(0x1f3)]||{},this['_fogVignettes'][_0x29d104(0x15e)]=_0x2c5fc8,_0x2c5fc8;},ImageManager[_0x262a98(0x1d0)]=function(){const _0x40faa2=_0x262a98,_0x27eed9=new Bitmap(Graphics[_0x40faa2(0x1a9)],Graphics[_0x40faa2(0x1e9)]),_0x3579b3=_0x40faa2(0x186),_0x58f315=_0x40faa2(0x1ef);return _0x27eed9[_0x40faa2(0x1a1)](0x0,Math[_0x40faa2(0x158)](Graphics[_0x40faa2(0x1e9)]*0x2/0x3),Graphics['width'],Math[_0x40faa2(0x158)](Graphics[_0x40faa2(0x1e9)]/0x3),_0x3579b3,_0x58f315,!![]),_0x27eed9[_0x40faa2(0x123)]=![],this[_0x40faa2(0x1f3)]=this[_0x40faa2(0x1f3)]||{},this[_0x40faa2(0x1f3)][_0x40faa2(0x1b8)]=_0x27eed9,_0x27eed9;},ImageManager[_0x262a98(0x15c)]=function(){const _0x491e25=_0x262a98,_0x44d4bc=new Bitmap(Graphics[_0x491e25(0x1a9)],Graphics['height']),_0x36d497=_0x491e25(0x186),_0x354028='#ffffff';return _0x44d4bc[_0x491e25(0x1a1)](0x0,0x0,Graphics['width'],Math[_0x491e25(0x158)](Graphics[_0x491e25(0x1e9)]/0x3),_0x354028,_0x36d497,!![]),_0x44d4bc[_0x491e25(0x1a1)](0x0,Math[_0x491e25(0x158)](Graphics[_0x491e25(0x1e9)]*0x2/0x3),Graphics['width'],Math[_0x491e25(0x158)](Graphics[_0x491e25(0x1e9)]/0x3),_0x36d497,_0x354028,!![]),_0x44d4bc[_0x491e25(0x123)]=![],this[_0x491e25(0x1f3)]=this['_fogVignettes']||{},this[_0x491e25(0x1f3)]['horizontal']=_0x44d4bc,_0x44d4bc;},ImageManager[_0x262a98(0x189)]=function(){const _0x3670d4=_0x262a98,_0x5d11fb=new Bitmap(Graphics[_0x3670d4(0x1a9)],Graphics['height']),_0x561358=_0x3670d4(0x186),_0x11270f=_0x3670d4(0x1ef);return _0x5d11fb[_0x3670d4(0x1a1)](0x0,0x0,Math[_0x3670d4(0x158)](Graphics[_0x3670d4(0x1a9)]/0x3),Graphics[_0x3670d4(0x1e9)],_0x11270f,_0x561358,![]),_0x5d11fb[_0x3670d4(0x123)]=![],this[_0x3670d4(0x1f3)]=this[_0x3670d4(0x1f3)]||{},this['_fogVignettes'][_0x3670d4(0x1a2)]=_0x5d11fb,_0x5d11fb;},ImageManager['getFogVignette_right']=function(){const _0x2e02d4=_0x262a98,_0x6d7046=new Bitmap(Graphics[_0x2e02d4(0x1a9)],Graphics[_0x2e02d4(0x1e9)]),_0x4fe381=_0x2e02d4(0x186),_0x150d72='#ffffff';return _0x6d7046[_0x2e02d4(0x1a1)](Math[_0x2e02d4(0x158)](Graphics[_0x2e02d4(0x1a9)]*0x2/0x3),0x0,Math[_0x2e02d4(0x158)](Graphics[_0x2e02d4(0x1a9)]/0x3),Graphics['height'],_0x4fe381,_0x150d72,![]),_0x6d7046[_0x2e02d4(0x123)]=![],this[_0x2e02d4(0x1f3)]=this[_0x2e02d4(0x1f3)]||{},this['_fogVignettes']['right']=_0x6d7046,_0x6d7046;},ImageManager['getFogVignette_vertical']=function(){const _0x3b0170=_0x262a98,_0x5065df=new Bitmap(Graphics['width'],Graphics['height']),_0x594f93=_0x3b0170(0x186),_0x5ebf56=_0x3b0170(0x1ef);return _0x5065df[_0x3b0170(0x1a1)](0x0,0x0,Math[_0x3b0170(0x158)](Graphics[_0x3b0170(0x1a9)]/0x3),Graphics[_0x3b0170(0x1e9)],_0x5ebf56,_0x594f93,![]),_0x5065df['gradientFillRect'](Math['ceil'](Graphics['width']*0x2/0x3),0x0,Math[_0x3b0170(0x158)](Graphics[_0x3b0170(0x1a9)]/0x3),Graphics[_0x3b0170(0x1e9)],_0x594f93,_0x5ebf56,![]),_0x5065df[_0x3b0170(0x123)]=![],this[_0x3b0170(0x1f3)]=this['_fogVignettes']||{},this['_fogVignettes'][_0x3b0170(0x10c)]=_0x5065df,_0x5065df;},ImageManager[_0x262a98(0x20c)]=function(){const _0xca090f=_0x262a98,_0x1d345e=new Bitmap(Graphics[_0xca090f(0x1a9)],Graphics['height']),_0x5496df=_0xca090f(0x186),_0x9650fb=_0xca090f(0x1ef);return _0x1d345e[_0xca090f(0x1a1)](0x0,0x0,Graphics[_0xca090f(0x1a9)],Math['ceil'](Graphics[_0xca090f(0x1e9)]/0x3),_0x9650fb,_0x5496df,!![]),_0x1d345e[_0xca090f(0x1a1)](0x0,Math[_0xca090f(0x158)](Graphics[_0xca090f(0x1e9)]*0x2/0x3),Graphics[_0xca090f(0x1a9)],Math['ceil'](Graphics[_0xca090f(0x1e9)]/0x3),_0x5496df,_0x9650fb,!![]),_0x1d345e[_0xca090f(0x1a1)](0x0,0x0,Math[_0xca090f(0x158)](Graphics[_0xca090f(0x1a9)]/0x3),Graphics[_0xca090f(0x1e9)],_0x9650fb,_0x5496df,![]),_0x1d345e[_0xca090f(0x1a1)](Math['ceil'](Graphics['width']*0x2/0x3),0x0,Math[_0xca090f(0x158)](Graphics['width']/0x3),Graphics['height'],_0x5496df,_0x9650fb,![]),_0x1d345e[_0xca090f(0x123)]=![],this[_0xca090f(0x1f3)]=this['_fogVignettes']||{},this[_0xca090f(0x1f3)][_0xca090f(0x144)]=_0x1d345e,_0x1d345e;},SceneManager[_0x262a98(0x1c3)]=function(){const _0x5b0c34=_0x262a98;return this[_0x5b0c34(0x1e0)]&&this[_0x5b0c34(0x1e0)]['constructor']===Scene_Map;},SceneManager[_0x262a98(0x183)]=function(){const _0x3cdb68=_0x262a98;return this[_0x3cdb68(0x1e0)]&&this[_0x3cdb68(0x1e0)]instanceof Scene_Map;},VisuMZ['VisualFogs']['Game_Map_setup']=Game_Map[_0x262a98(0x10f)][_0x262a98(0x133)],Game_Map[_0x262a98(0x10f)][_0x262a98(0x133)]=function(_0x9ef367){const _0x525e4a=_0x262a98;VisuMZ[_0x525e4a(0x16b)][_0x525e4a(0x16d)][_0x525e4a(0x106)](this,_0x9ef367),this[_0x525e4a(0x121)]();},Game_Map[_0x262a98(0x192)]=VisuMZ[_0x262a98(0x16b)][_0x262a98(0x140)]['FogOpacity'],Game_Map[_0x262a98(0x1f5)]=VisuMZ[_0x262a98(0x16b)][_0x262a98(0x140)]['BlendMode'],Game_Map[_0x262a98(0x1c2)]=VisuMZ['VisualFogs']['Settings'][_0x262a98(0x147)],Game_Map[_0x262a98(0x174)]=VisuMZ['VisualFogs'][_0x262a98(0x140)]['MaskSpill'],Game_Map[_0x262a98(0x10f)]['setupVisualFogs']=function(){const _0x38971a=_0x262a98;this['_visualFogSettings']=[null];if(!$dataMap)return;const _0x1a7499=VisuMZ['VisualFogs'][_0x38971a(0x125)]();for(const _0x48cc0d of _0x1a7499){if(!_0x48cc0d)continue;this[_0x38971a(0x1b7)][_0x48cc0d['id']]=_0x48cc0d;}},VisuMZ[_0x262a98(0x16b)][_0x262a98(0x125)]=function(){const _0x335307=_0x262a98;if(!$dataMap)return[];const _0x409bcc=[],_0x108cae=VisuMZ['VisualFogs'][_0x335307(0x1e7)]();if(!$dataMap[_0x335307(0x18d)])return[];const _0x42a787=VisuMZ[_0x335307(0x16b)]['RegExp'],_0x1e280c=$dataMap[_0x335307(0x18d)]['split'](/[\r\n]+/);let _0x5eb0bf=JsonEx[_0x335307(0x1c5)](_0x108cae);for(const _0x134dbf of _0x1e280c){if(_0x134dbf[_0x335307(0x208)](_0x42a787[_0x335307(0x1ec)]))_0x5eb0bf['id']=Number(RegExp['$1']);else{if(_0x134dbf[_0x335307(0x208)](_0x42a787['End'])){const _0x37150b=Number(RegExp['$1']);if(_0x37150b>0x0&&_0x37150b===_0x5eb0bf['id']&&_0x5eb0bf[_0x335307(0x18a)]!=='')_0x409bcc[_0x335307(0x1f4)](_0x5eb0bf);_0x5eb0bf=JsonEx[_0x335307(0x1c5)](_0x108cae);}else{if(_0x5eb0bf['id']<=0x0)continue;}}if(_0x134dbf[_0x335307(0x208)](_0x42a787[_0x335307(0x136)]))_0x5eb0bf[_0x335307(0x18a)]=String(RegExp['$1'])[_0x335307(0x1b4)](),_0x5eb0bf[_0x335307(0x18a)][_0x335307(0x149)](0x0)==='!'&&(_0x335307(0x207)!=='ksuID'?_0x5eb0bf['_fogZero']=!![]:_0x466ccd[_0x335307(0x1b5)]&&(_0x157b93['_fogX']+=_0x4f1e4c));else{if(_0x134dbf[_0x335307(0x208)](_0x42a787[_0x335307(0x195)]))_0x5eb0bf[_0x335307(0x1b5)]=!![],_0x5eb0bf[_0x335307(0x20d)]=Number(RegExp['$1'])||0x0;else{if(_0x134dbf[_0x335307(0x208)](_0x42a787[_0x335307(0x162)]))_0x335307(0x171)!==_0x335307(0x1e3)?(_0x5eb0bf[_0x335307(0x124)]=!![],_0x5eb0bf[_0x335307(0x17a)]=Number(RegExp['$1'])||0x0):(this['_id']=_0xb08c6f,_0x280029[_0x335307(0x10f)]['initialize'][_0x335307(0x106)](this),this['_createColorFilter'](),this[_0x335307(0x134)](),this[_0x335307(0x11b)][_0x335307(0x203)](this['createMaskSprite'][_0x335307(0x114)](this)));else{if(_0x134dbf['match'](_0x42a787[_0x335307(0x198)]))_0x5eb0bf[_0x335307(0x206)]=!![];else{if(_0x134dbf[_0x335307(0x208)](_0x42a787[_0x335307(0x15f)])){const _0x450f33=Number(RegExp['$1'])*0.01;_0x5eb0bf[_0x335307(0x19b)]=Math[_0x335307(0x12c)](_0x450f33*0xff)[_0x335307(0x1a6)](0x0,0xff);}else{if(_0x134dbf[_0x335307(0x208)](_0x42a787['OpacityFlat'])){if(_0x335307(0x182)!==_0x335307(0x182)){const _0x227354=_0x499cca[_0x335307(0x1f7)];_0x1a60c2[_0x335307(0x19b)]=(_0x239019[_0x335307(0x19b)]*(_0x227354-0x1)+_0x54be47['targetOpacity'])/_0x227354,_0x35d754[_0x335307(0x1f7)]--;}else _0x5eb0bf['opacity']=Number(RegExp['$1'])[_0x335307(0x1a6)](0x0,0xff);}else{if(_0x134dbf['match'](_0x42a787[_0x335307(0x1ee)])){const _0x3c8146=String(RegExp['$1'])[_0x335307(0x168)]()[_0x335307(0x1b4)](),_0x5f4cca=['NORMAL',_0x335307(0x135),'MULTIPLY','SCREEN'];_0x5eb0bf[_0x335307(0x1db)]=_0x5f4cca[_0x335307(0x1ac)](_0x3c8146)[_0x335307(0x1a6)](0x0,0x3);}else{if(_0x134dbf[_0x335307(0x208)](_0x42a787['Hue']))_0x335307(0x1c8)==='glbTK'?_0x393ede[_0x335307(0x1cb)]=_0x335307(0x1bd):_0x5eb0bf['hue']=Number(RegExp['$1'])[_0x335307(0x1a6)](0x0,0x168);else{if(_0x134dbf['match'](_0x42a787[_0x335307(0x127)]))_0x5eb0bf[_0x335307(0x204)]=Number(RegExp['$1'])||0x0;else{if(_0x134dbf[_0x335307(0x208)](_0x42a787[_0x335307(0x1ce)])){const _0x35db81=String(RegExp['$1'])['split'](',')[_0x335307(0x104)](_0x279947=>Number(_0x279947)||0x0);while(_0x35db81['length']<0x4)_0x35db81[_0x335307(0x1f4)](0x0);_0x5eb0bf[_0x335307(0x138)]=_0x35db81;}else{if(_0x134dbf[_0x335307(0x208)](_0x42a787[_0x335307(0x1ff)])){const _0x52d1f0=String(RegExp['$1'])[_0x335307(0x115)](',')['map'](_0x5830d2=>Number(_0x5830d2)||0x1);_0x5eb0bf['maskRegions']=_0x52d1f0;}else{if(_0x134dbf[_0x335307(0x208)](_0x42a787['MaskTerrainTags'])){if('lmKAG'!==_0x335307(0x175)){const _0x4798eb=String(RegExp['$1'])[_0x335307(0x115)](',')[_0x335307(0x104)](_0x3bc029=>Number(_0x3bc029)||0x1);_0x5eb0bf['maskTerrainTags']=_0x4798eb;}else return this['_visualFogSettings'][_0x335307(0x1de)](_0x23783b=>!!_0x23783b);}else{if(_0x134dbf[_0x335307(0x208)](_0x42a787['MaskBlur']))_0x5eb0bf[_0x335307(0x14d)]=Math[_0x335307(0x145)](Number(RegExp['$1'])||0x0,0x0);else{if(_0x134dbf[_0x335307(0x208)](_0x42a787[_0x335307(0x12a)]))_0x5eb0bf[_0x335307(0x1a7)]=Math[_0x335307(0x145)](Number(RegExp['$1'])||0x0,0x0);else{if(_0x134dbf[_0x335307(0x208)](_0x42a787[_0x335307(0x108)]))'YAjQe'===_0x335307(0x1d2)?this['opacity']=this['settings']()[_0x335307(0x19b)]:(_0x5eb0bf[_0x335307(0x1d3)]=(String(RegExp['$1'])||'')[_0x335307(0x1b4)](),_0x5eb0bf[_0x335307(0x1cb)]=_0x335307(0x1bd));else _0x134dbf[_0x335307(0x208)](_0x42a787[_0x335307(0x14e)])&&(_0x5eb0bf[_0x335307(0x1cb)]=(String(RegExp['$1'])||'')[_0x335307(0x150)]());}}}}}}}}}}}}}}}return _0x409bcc;},Game_Map[_0x262a98(0x10f)][_0x262a98(0x185)]=function(){const _0x3b39a9=_0x262a98;return this['_visualFogSettings'][_0x3b39a9(0x1de)](_0x40a6c7=>!!_0x40a6c7);},Game_Map[_0x262a98(0x10f)][_0x262a98(0x1c0)]=function(_0x13b665){const _0xc84e38=_0x262a98;return this[_0xc84e38(0x1b7)][_0x13b665]||null;},Game_Map[_0x262a98(0x10f)][_0x262a98(0x1be)]=function(_0x495106){const _0x267cf0=_0x262a98,_0x2ed379=this['getVisualFogSettings'](_0x495106);if(_0x2ed379[_0x267cf0(0x206)])return _0x2ed379[_0x267cf0(0x1c7)]*this[_0x267cf0(0x160)]();else return _0x2ed379[_0x267cf0(0x1b5)]?_0x2ed379[_0x267cf0(0x1c7)]*this[_0x267cf0(0x160)]()/0x2:0x0;},Game_Map[_0x262a98(0x10f)][_0x262a98(0x1b0)]=function(_0x25acda){const _0x4a0eb8=_0x262a98,_0x130308=this[_0x4a0eb8(0x1c0)](_0x25acda);if(_0x130308[_0x4a0eb8(0x206)])return _0x130308['_fogY']*this[_0x4a0eb8(0x178)]();else return _0x130308[_0x4a0eb8(0x124)]?_0x130308['_fogY']*this['tileHeight']()/0x2:0x0;},Game_Map[_0x262a98(0x10f)][_0x262a98(0x1ae)]=function(_0x599af5){const _0xbb8c1a=_0x262a98;this['_visualFogSettings']=this['_visualFogSettings']||[];if(!this[_0xbb8c1a(0x1b7)][_0x599af5])return;this[_0xbb8c1a(0x1b7)][_0x599af5]=null;const _0x404230=SceneManager[_0xbb8c1a(0x1e0)]['_spriteset'];_0x404230&&_0x404230['removeVisualFogLayer'](_0x599af5);},Game_Map[_0x262a98(0x10f)][_0x262a98(0x1e1)]=function(_0x9e9f97){const _0x45508f=_0x262a98,_0x219ae9=_0x9e9f97['id'];let _0x2a50df=![];this[_0x45508f(0x1b7)]=this['_visualFogSettings']||[];if(this[_0x45508f(0x1b7)][_0x219ae9]){const _0x2d1547=this[_0x45508f(0x1b7)][_0x219ae9];if(!_0x2d1547['maskRegions'][_0x45508f(0x1a0)](_0x9e9f97[_0x45508f(0x1b2)]))_0x2a50df=!![];else{if(!_0x2d1547[_0x45508f(0x1dc)]['equals'](_0x9e9f97[_0x45508f(0x1dc)])){if(_0x45508f(0x137)===_0x45508f(0x152))return this[_0x45508f(0x1e0)]&&this[_0x45508f(0x1e0)]instanceof _0x493b42;else _0x2a50df=!![];}else _0x2d1547[_0x45508f(0x1cb)]!==_0x45508f(0x1a3)&&(_0x2a50df=!![]);}}this[_0x45508f(0x1b7)][_0x219ae9]=_0x9e9f97;if(!SceneManager[_0x45508f(0x1c3)]())return;const _0xa0faf7=SceneManager['_scene'][_0x45508f(0x19a)];_0xa0faf7&&_0xa0faf7['updateVisualFogLayer'](_0x219ae9,_0x2a50df);},VisuMZ[_0x262a98(0x16b)][_0x262a98(0x1bc)]=Game_Map[_0x262a98(0x10f)]['setDisplayPos'],Game_Map[_0x262a98(0x10f)][_0x262a98(0x1fb)]=function(_0x7671be,_0x32b7b9){const _0x550a5d=_0x262a98;VisuMZ[_0x550a5d(0x16b)][_0x550a5d(0x1bc)][_0x550a5d(0x106)](this,_0x7671be,_0x32b7b9);for(const _0x2328f9 of this[_0x550a5d(0x185)]()){if(!_0x2328f9)continue;this[_0x550a5d(0x177)]()?'YLoOF'!==_0x550a5d(0x196)?_0x2328f9['_fogX']=_0x7671be:_0xa66c14[_0x550a5d(0x138)][_0x550a5d(0x1f4)](0x0):_0x2328f9[_0x550a5d(0x1c7)]=this[_0x550a5d(0x1bf)];if(this[_0x550a5d(0x15a)]()){if(_0x550a5d(0x141)===_0x550a5d(0x141))_0x2328f9[_0x550a5d(0x20a)]=_0x32b7b9;else{const _0x159b33=_0x78c112(_0x4b95d6['$1']);if(_0x159b33>0x0&&_0x159b33===_0x5106c5['id']&&_0x3c2ce8[_0x550a5d(0x18a)]!=='')_0x5b20ac[_0x550a5d(0x1f4)](_0x14f6fa);_0x23885e=_0x194d4a[_0x550a5d(0x1c5)](_0x58d06e);}}else _0x2328f9[_0x550a5d(0x20a)]=this[_0x550a5d(0x18b)];}},VisuMZ[_0x262a98(0x16b)][_0x262a98(0x1ad)]=Game_Map['prototype'][_0x262a98(0x1aa)],Game_Map[_0x262a98(0x10f)][_0x262a98(0x1aa)]=function(_0x2da1ff){const _0xf6afba=_0x262a98,_0x34a3ca=this['_displayX'];VisuMZ[_0xf6afba(0x16b)]['Game_Map_scrollLeft'][_0xf6afba(0x106)](this,_0x2da1ff);for(const _0x4dabe6 of this[_0xf6afba(0x185)]()){if(_0xf6afba(0x11a)==='FnuHw'){if(!_0x4dabe6)continue;if(this['isLoopHorizontal']())_0x4dabe6[_0xf6afba(0x1b5)]&&(_0xf6afba(0x180)!==_0xf6afba(0x10a)?_0x4dabe6['_fogX']-=_0x2da1ff:this['_maskFilter']&&(this['_maskFilter']['blendMode']=this['settings']()[_0xf6afba(0x1db)]));else this[_0xf6afba(0x1a9)]()>=this[_0xf6afba(0x1f1)]()&&(_0x4dabe6[_0xf6afba(0x1c7)]+=this[_0xf6afba(0x1bf)]-_0x34a3ca);}else this['_colorTone']=_0xa72758[_0xf6afba(0x17f)](),this[_0xf6afba(0x19f)]();}},VisuMZ['VisualFogs']['Game_Map_scrollRight']=Game_Map['prototype']['scrollRight'],Game_Map[_0x262a98(0x10f)][_0x262a98(0x184)]=function(_0x1abc16){const _0x5dd9db=_0x262a98,_0x269fd5=this['_displayX'];VisuMZ[_0x5dd9db(0x16b)]['Game_Map_scrollRight'][_0x5dd9db(0x106)](this,_0x1abc16);for(const _0xdb6aba of this[_0x5dd9db(0x185)]()){if(_0x5dd9db(0x1d8)===_0x5dd9db(0x164))return this[_0x1e7850]();else{if(!_0xdb6aba)continue;if(this[_0x5dd9db(0x177)]()){if(_0xdb6aba[_0x5dd9db(0x1b5)]){if(_0x5dd9db(0x1d1)===_0x5dd9db(0x1d1))_0xdb6aba[_0x5dd9db(0x1c7)]+=_0x1abc16;else throw new _0x590f7d(_0x5dd9db(0x13c));}}else this['width']()>=this[_0x5dd9db(0x1f1)]()&&(_0xdb6aba[_0x5dd9db(0x1c7)]+=this[_0x5dd9db(0x1bf)]-_0x269fd5);}}},VisuMZ['VisualFogs'][_0x262a98(0x1b6)]=Game_Map[_0x262a98(0x10f)][_0x262a98(0x139)],Game_Map[_0x262a98(0x10f)][_0x262a98(0x139)]=function(_0x3d469e){const _0x4ab154=_0x262a98,_0x5cb3c6=this[_0x4ab154(0x18b)];VisuMZ[_0x4ab154(0x16b)][_0x4ab154(0x1b6)]['call'](this,_0x3d469e);for(const _0x2a77a3 of this[_0x4ab154(0x185)]()){if(!_0x2a77a3)continue;if(this[_0x4ab154(0x15a)]())_0x4ab154(0x10e)!=='rqyHv'?_0x2a77a3['_fogLoopY']&&(_0x2a77a3['_fogY']+=_0x3d469e):_0x58b47d['id']=_0x1eb2bc(_0x280b74['$1']);else{if(this[_0x4ab154(0x1e9)]()>=this[_0x4ab154(0x14c)]()){if(_0x4ab154(0x1dd)!==_0x4ab154(0x1ca))_0x2a77a3[_0x4ab154(0x20a)]+=this['_displayY']-_0x5cb3c6;else{const _0x248854=new _0x2962fb(_0x402bfe[_0x4ab154(0x1a9)],_0x54b48b[_0x4ab154(0x1e9)]),_0x371bf0=_0x4ab154(0x186),_0x1eb95e='#ffffff';return _0x248854[_0x4ab154(0x1a1)](0x0,0x0,_0x2f20f4[_0x4ab154(0x1a9)],_0x30a6da[_0x4ab154(0x158)](_0x27ceb8[_0x4ab154(0x1e9)]/0x3),_0x1eb95e,_0x371bf0,!![]),_0x248854[_0x4ab154(0x1a1)](0x0,_0x5cc191[_0x4ab154(0x158)](_0x5e8017[_0x4ab154(0x1e9)]*0x2/0x3),_0x51c274[_0x4ab154(0x1a9)],_0x4d346c['ceil'](_0x336a84[_0x4ab154(0x1e9)]/0x3),_0x371bf0,_0x1eb95e,!![]),_0x248854[_0x4ab154(0x1a1)](0x0,0x0,_0x32fc0e[_0x4ab154(0x158)](_0x45e3ea[_0x4ab154(0x1a9)]/0x3),_0x436bbc['height'],_0x1eb95e,_0x371bf0,![]),_0x248854[_0x4ab154(0x1a1)](_0x5bb3b9[_0x4ab154(0x158)](_0x33569c[_0x4ab154(0x1a9)]*0x2/0x3),0x0,_0xe4081[_0x4ab154(0x158)](_0xdbb6af[_0x4ab154(0x1a9)]/0x3),_0x22db04[_0x4ab154(0x1e9)],_0x371bf0,_0x1eb95e,![]),_0x248854[_0x4ab154(0x123)]=![],this[_0x4ab154(0x1f3)]=this[_0x4ab154(0x1f3)]||{},this[_0x4ab154(0x1f3)][_0x4ab154(0x144)]=_0x248854,_0x248854;}}}}},VisuMZ['VisualFogs'][_0x262a98(0x142)]=Game_Map[_0x262a98(0x10f)]['scrollUp'],Game_Map[_0x262a98(0x10f)][_0x262a98(0x176)]=function(_0x277bf3){const _0x3d6fb8=_0x262a98,_0x38eb9f=this['_displayY'];VisuMZ[_0x3d6fb8(0x16b)][_0x3d6fb8(0x142)][_0x3d6fb8(0x106)](this,_0x277bf3);for(const _0xeb8271 of this['getVisualFogs']()){if(_0x3d6fb8(0x103)!==_0x3d6fb8(0x13a)){if(!_0xeb8271)continue;if(this[_0x3d6fb8(0x15a)]())_0xeb8271[_0x3d6fb8(0x124)]&&(_0x3d6fb8(0x1b3)==='DYmXQ'?_0x5d1494[_0x3d6fb8(0x206)]=!![]:_0xeb8271[_0x3d6fb8(0x20a)]-=_0x277bf3);else this[_0x3d6fb8(0x1e9)]()>=this[_0x3d6fb8(0x14c)]()&&(_0xeb8271['_fogY']+=this[_0x3d6fb8(0x18b)]-_0x38eb9f);}else return this[_0x3d6fb8(0x1b7)][_0x19597d]||null;}},VisuMZ['VisualFogs']['Game_Map_updateParallax']=Game_Map[_0x262a98(0x10f)][_0x262a98(0x120)],Game_Map[_0x262a98(0x10f)]['updateParallax']=function(){const _0x2becbc=_0x262a98;VisuMZ[_0x2becbc(0x16b)]['Game_Map_updateParallax'][_0x2becbc(0x106)](this);for(const _0x3383f6 of this[_0x2becbc(0x185)]()){if(!_0x3383f6)continue;this[_0x2becbc(0x12f)](_0x3383f6);}},Game_Map[_0x262a98(0x10f)]['updateVisualFogSettings']=function(_0x40d3ad){const _0x64fed3=_0x262a98;_0x40d3ad[_0x64fed3(0x1b5)]&&(_0x40d3ad[_0x64fed3(0x1c7)]+=_0x40d3ad[_0x64fed3(0x20d)]/this['tileWidth']()/0x2);_0x40d3ad[_0x64fed3(0x124)]&&(_0x40d3ad[_0x64fed3(0x20a)]+=_0x40d3ad['_fogSy']/this['tileHeight']()/0x2);_0x40d3ad[_0x64fed3(0x20b)]+=_0x40d3ad[_0x64fed3(0x204)];if(_0x40d3ad[_0x64fed3(0x1f7)]>0x0){const _0x53a6c3=_0x40d3ad[_0x64fed3(0x1f7)];_0x40d3ad['opacity']=(_0x40d3ad['opacity']*(_0x53a6c3-0x1)+_0x40d3ad[_0x64fed3(0x1fc)])/_0x53a6c3,_0x40d3ad['opacityDuration']--;}};function _0x4d92(_0x3abd7d,_0x1cf99f){const _0x4b33a6=_0x4b33();return _0x4d92=function(_0x4d9241,_0x55c210){_0x4d9241=_0x4d9241-0x103;let _0x331dec=_0x4b33a6[_0x4d9241];return _0x331dec;},_0x4d92(_0x3abd7d,_0x1cf99f);}function Sprite_VisualFog(){const _0x3fcc24=_0x262a98;this[_0x3fcc24(0x18e)](...arguments);}Sprite_VisualFog[_0x262a98(0x10f)]=Object[_0x262a98(0x1cf)](TilingSprite[_0x262a98(0x10f)]),Sprite_VisualFog['prototype'][_0x262a98(0x118)]=Sprite_VisualFog,Sprite_VisualFog[_0x262a98(0x10f)][_0x262a98(0x18e)]=function(_0x2eee64){const _0x58ba20=_0x262a98;this[_0x58ba20(0x193)]=_0x2eee64,TilingSprite[_0x58ba20(0x10f)]['initialize'][_0x58ba20(0x106)](this),this[_0x58ba20(0x13d)](),this[_0x58ba20(0x134)](),this[_0x58ba20(0x11b)][_0x58ba20(0x203)](this[_0x58ba20(0x17e)][_0x58ba20(0x114)](this));},Sprite_VisualFog['prototype'][_0x262a98(0x167)]=function(){const _0x2d7903=_0x262a98;return $gameMap[_0x2d7903(0x1c0)](this[_0x2d7903(0x193)]);},Sprite_VisualFog[_0x262a98(0x10f)]['_createColorFilter']=function(){const _0x44f288=_0x262a98;this[_0x44f288(0x1f9)]=0x0,this['_colorTone']=[0x0,0x0,0x0,0x0],this[_0x44f288(0x151)]=new ColorFilter(),!this[_0x44f288(0x1e8)]&&(this[_0x44f288(0x1e8)]=[]),this[_0x44f288(0x1e8)]['push'](this[_0x44f288(0x151)]);},Sprite_VisualFog[_0x262a98(0x10f)]['_updateColorFilter']=function(){const _0x496a0d=_0x262a98;!this[_0x496a0d(0x151)]&&(_0x496a0d(0x116)!==_0x496a0d(0x116)?_0x2e8b33=!![]:this[_0x496a0d(0x13d)]()),this[_0x496a0d(0x151)][_0x496a0d(0x122)](this['_hue']),this[_0x496a0d(0x151)][_0x496a0d(0x166)](this[_0x496a0d(0x154)]);},Sprite_VisualFog[_0x262a98(0x10f)]['loadBitmap']=function(){const _0x265bd4=_0x262a98;this[_0x265bd4(0x1cd)]=this[_0x265bd4(0x167)]()[_0x265bd4(0x18a)],this[_0x265bd4(0x11b)]=ImageManager[_0x265bd4(0x1d9)](this['_fogName']);},Sprite_VisualFog['prototype'][_0x262a98(0x17e)]=function(){const _0x334a5f=_0x262a98;this[_0x334a5f(0x163)]=new Sprite(),this[_0x334a5f(0x13b)]();},Sprite_VisualFog[_0x262a98(0x10f)][_0x262a98(0x13b)]=function(){const _0x588cb9=_0x262a98;this[_0x588cb9(0x163)][_0x588cb9(0x11b)]&&this[_0x588cb9(0x157)](this['_maskSprite']);const _0x507cf0=this[_0x588cb9(0x167)]()[_0x588cb9(0x1b2)],_0x3030e7=this[_0x588cb9(0x167)]()['maskTerrainTags'];if(this[_0x588cb9(0x167)]()[_0x588cb9(0x1cb)]===_0x588cb9(0x1bd))'lOVrp'===_0x588cb9(0x14b)?this[_0x588cb9(0x126)]():(this[_0x588cb9(0x163)]=new _0x1bb9ee(),this[_0x588cb9(0x13b)]());else{if(this[_0x588cb9(0x167)]()[_0x588cb9(0x1cb)]!=='none')_0x588cb9(0x15d)===_0x588cb9(0x11e)?this[_0x588cb9(0x1eb)]=new _0x219648[(_0x588cb9(0x1e8))]['BlurFilter'](_0x3ef01f=!![]):this[_0x588cb9(0x190)]();else{if(_0x507cf0[_0x588cb9(0x16f)]>0x0||_0x3030e7['length']>0x0)this[_0x588cb9(0x156)]();else this[_0x588cb9(0x167)]()[_0x588cb9(0x1cb)]==='none'&&this['loadTemplateVignette']();}}this['addChild'](this[_0x588cb9(0x163)]),this[_0x588cb9(0x159)]=new PIXI[(_0x588cb9(0x1b1))](this[_0x588cb9(0x163)]),this['filters'][_0x588cb9(0x1f4)](this[_0x588cb9(0x159)]);if(this[_0x588cb9(0x1eb)])this[_0x588cb9(0x1e8)][_0x588cb9(0x1f4)](this[_0x588cb9(0x1eb)]);},Sprite_VisualFog['prototype'][_0x262a98(0x126)]=function(){const _0x47415d=_0x262a98,_0x566bf2=this[_0x47415d(0x167)]()['vignetteFilename'];this[_0x47415d(0x163)][_0x47415d(0x11b)]=ImageManager[_0x47415d(0x1d9)](_0x566bf2),this[_0x47415d(0x163)]['bitmap'][_0x47415d(0x123)]=![];},Sprite_VisualFog[_0x262a98(0x10f)][_0x262a98(0x190)]=function(){const _0x3b9cf0=_0x262a98,_0x248d53=this['settings']()['vignette'];this[_0x3b9cf0(0x163)][_0x3b9cf0(0x11b)]=ImageManager[_0x3b9cf0(0x197)](_0x248d53);},Sprite_VisualFog[_0x262a98(0x10f)][_0x262a98(0x156)]=function(){const _0xffc81d=_0x262a98,_0x2a0cb4=this[_0xffc81d(0x167)]()['maskRegions'],_0x511836=this['settings']()[_0xffc81d(0x1dc)];if(_0x2a0cb4['length']<=0x0&&_0x511836[_0xffc81d(0x16f)]<=0x0)return;if($gameMap[_0xffc81d(0x177)]()||$gameMap['isLoopVertical']())return;const _0x32cde8=$gameMap['width'](),_0x176dc6=$gameMap[_0xffc81d(0x1e9)](),_0x5f4f94=$gameMap[_0xffc81d(0x160)](),_0x1e9e32=$gameMap[_0xffc81d(0x178)](),_0x3124a6=this[_0xffc81d(0x167)]()['maskSpill'],_0x444107=_0x5f4f94+_0x3124a6*0x2,_0x1ff67e=_0x1e9e32+_0x3124a6*0x2;this[_0xffc81d(0x163)][_0xffc81d(0x11b)]=new Bitmap(_0x32cde8*_0x5f4f94,_0x176dc6*_0x1e9e32);for(let _0x4282f1=0x0;_0x4282f1<_0x32cde8;_0x4282f1++){if(_0xffc81d(0x19d)!=='ZklCa')for(let _0x504b3f=0x0;_0x504b3f<_0x176dc6;_0x504b3f++){if(_0xffc81d(0x1f0)===_0xffc81d(0x17b)){const _0x2ed025=new _0xdbb317(_0x3d5d0b[_0xffc81d(0x1a9)],_0x4b9c56[_0xffc81d(0x1e9)]),_0x480cd8=_0xffc81d(0x186),_0x27534f=_0xffc81d(0x1ef);return _0x2ed025['gradientFillRect'](0x0,_0x56f157['ceil'](_0x3f6730[_0xffc81d(0x1e9)]*0x2/0x3),_0x5f05ae[_0xffc81d(0x1a9)],_0x1ee16d[_0xffc81d(0x158)](_0x3b9599['height']/0x3),_0x480cd8,_0x27534f,!![]),_0x2ed025[_0xffc81d(0x123)]=![],this['_fogVignettes']=this[_0xffc81d(0x1f3)]||{},this[_0xffc81d(0x1f3)][_0xffc81d(0x1b8)]=_0x2ed025,_0x2ed025;}else{if(_0x2a0cb4['includes']($gameMap[_0xffc81d(0x10b)](_0x4282f1,_0x504b3f))||_0x511836[_0xffc81d(0x1a5)]($gameMap[_0xffc81d(0x1e2)](_0x4282f1,_0x504b3f))){if('yHfHj'===_0xffc81d(0x111))this[_0xffc81d(0x163)][_0xffc81d(0x11b)][_0xffc81d(0x12b)](_0x4282f1*_0x5f4f94-_0x3124a6,_0x504b3f*_0x1e9e32-_0x3124a6,_0x444107,_0x1ff67e,_0xffc81d(0x1ef));else return _0x51c94b[_0xffc81d(0x20a)]*this[_0xffc81d(0x178)]();}}}else _0x5b7648[_0xffc81d(0x20a)]+=_0x303826;}this[_0xffc81d(0x1e8)]=[];!!PIXI[_0xffc81d(0x1e8)][_0xffc81d(0x19c)]&&!this[_0xffc81d(0x1eb)]&&(_0xffc81d(0x17c)!=='DcqxG'?this[_0xffc81d(0x1eb)]=new PIXI[(_0xffc81d(0x1e8))]['BlurFilter'](clamp=!![]):(this[_0xffc81d(0x163)]['x']=_0x2d61fd[_0xffc81d(0x200)](-_0xdcdfc4['displayX']()*_0x20c6cb[_0xffc81d(0x160)]()),this['_maskSprite']['y']=_0x8c0c2c[_0xffc81d(0x200)](-_0xc71a55[_0xffc81d(0x148)]()*_0x4328c0[_0xffc81d(0x178)]())));if(this['_blurFilter']){const _0x448129=this[_0xffc81d(0x167)]()[_0xffc81d(0x14d)];this['_blurFilter'][_0xffc81d(0x155)]=_0x448129||0.01;}},Sprite_VisualFog['prototype']['drawMaskTile']=function(_0x2da67f,_0x357967){},Sprite_VisualFog[_0x262a98(0x10f)][_0x262a98(0x11d)]=function(){const _0x525300=_0x262a98;TilingSprite[_0x525300(0x10f)][_0x525300(0x11d)][_0x525300(0x106)](this);if(!this[_0x525300(0x11b)])return;this[_0x525300(0x1ed)](),this['updateOrigin'](),this['updateBlendMode'](),this[_0x525300(0x1ab)](),this[_0x525300(0x1a8)](),this[_0x525300(0x188)]();},Sprite_VisualFog[_0x262a98(0x10f)][_0x262a98(0x1ed)]=function(){const _0x15a36a=_0x262a98;this[_0x15a36a(0x19b)]=this[_0x15a36a(0x167)]()[_0x15a36a(0x19b)];},Sprite_VisualFog['prototype']['updateOrigin']=function(){const _0x31126b=_0x262a98;this[_0x31126b(0x1c1)]['x']=$gameMap[_0x31126b(0x1be)](this[_0x31126b(0x193)]),this[_0x31126b(0x1c1)]['y']=$gameMap['getVisualFogOy'](this['_id']);},Sprite_VisualFog[_0x262a98(0x10f)][_0x262a98(0x1bb)]=function(){const _0x198640=_0x262a98;this[_0x198640(0x159)]&&(this[_0x198640(0x159)][_0x198640(0x1db)]=this[_0x198640(0x167)]()[_0x198640(0x1db)]);},Sprite_VisualFog[_0x262a98(0x10f)][_0x262a98(0x1ab)]=function(){const _0x358e17=_0x262a98;this[_0x358e17(0x122)](this[_0x358e17(0x167)]()[_0x358e17(0x20b)]);},Sprite_VisualFog[_0x262a98(0x10f)][_0x262a98(0x122)]=function(_0x255d7d){const _0x55eb2d=_0x262a98;this[_0x55eb2d(0x1f9)]!==Number(_0x255d7d)&&(_0x55eb2d(0x1f8)===_0x55eb2d(0x1f8)?(this[_0x55eb2d(0x1f9)]=Number(_0x255d7d),this['_updateColorFilter']()):_0x299efa[_0x55eb2d(0x204)]=_0x2f3cd0(_0x12744d['$1'])||0x0);},Sprite_VisualFog['prototype'][_0x262a98(0x1a8)]=function(){const _0x4d0ae9=_0x262a98;this['setColorTone'](this[_0x4d0ae9(0x167)]()[_0x4d0ae9(0x138)]);},Sprite_VisualFog['prototype'][_0x262a98(0x166)]=function(_0x23574c){const _0x1bb0f2=_0x262a98;if(!(_0x23574c instanceof Array))throw new Error(_0x1bb0f2(0x13c));!this[_0x1bb0f2(0x154)][_0x1bb0f2(0x1a0)](_0x23574c)&&(_0x1bb0f2(0x1c9)==='ueMbZ'?(this[_0x1bb0f2(0x154)]=_0x23574c[_0x1bb0f2(0x17f)](),this[_0x1bb0f2(0x19f)]()):_0x377b23[_0x1bb0f2(0x20a)]-=_0x494ed5);},Sprite_VisualFog[_0x262a98(0x10f)][_0x262a98(0x188)]=function(){const _0x5c4a5e=_0x262a98;if(!this[_0x5c4a5e(0x163)])return;const _0x184aed=this['settings']()[_0x5c4a5e(0x1b2)],_0x29c39=this[_0x5c4a5e(0x167)]()[_0x5c4a5e(0x1dc)];if(this[_0x5c4a5e(0x167)]()[_0x5c4a5e(0x1cb)]!==_0x5c4a5e(0x1a3))this[_0x5c4a5e(0x163)]['x']=0x0,this[_0x5c4a5e(0x163)]['y']=0x0;else{if(_0x184aed['length']>0x0||_0x29c39[_0x5c4a5e(0x16f)]>0x0)this[_0x5c4a5e(0x163)]['x']=Math[_0x5c4a5e(0x200)](-$gameMap['displayX']()*$gameMap[_0x5c4a5e(0x160)]()),this['_maskSprite']['y']=Math['floor'](-$gameMap[_0x5c4a5e(0x148)]()*$gameMap[_0x5c4a5e(0x178)]());else this[_0x5c4a5e(0x167)]()[_0x5c4a5e(0x1cb)]==='none'&&(this[_0x5c4a5e(0x163)]['x']=0x0,this[_0x5c4a5e(0x163)]['y']=0x0);}},VisuMZ[_0x262a98(0x16b)][_0x262a98(0x1da)]=Spriteset_Map[_0x262a98(0x10f)][_0x262a98(0x129)],Spriteset_Map[_0x262a98(0x10f)]['createWeather']=function(){const _0x2ae557=_0x262a98;this[_0x2ae557(0x143)](),this['createFogLayers'](),this[_0x2ae557(0x18f)](),VisuMZ[_0x2ae557(0x16b)][_0x2ae557(0x1da)]['call'](this);},Spriteset_Map[_0x262a98(0x10f)][_0x262a98(0x143)]=function(){const _0x51237c=_0x262a98;this[_0x51237c(0x181)]=new Sprite(),this[_0x51237c(0x18c)][_0x51237c(0x132)](this[_0x51237c(0x181)]),this['_fogDataRef']=[null];},Spriteset_Map[_0x262a98(0x10f)][_0x262a98(0x1af)]=function(){const _0x3e8fa0=_0x262a98,_0x27d3ea=$gameMap[_0x3e8fa0(0x185)]();for(const _0x3f8f04 of _0x27d3ea){if(!_0x3f8f04)continue;this[_0x3e8fa0(0x1d4)](_0x3f8f04);}},Spriteset_Map[_0x262a98(0x10f)][_0x262a98(0x1d4)]=function(_0x433989){const _0x4e608c=_0x262a98;if(!_0x433989)return;const _0x3066a4=new Sprite_VisualFog(_0x433989['id']);_0x3066a4['move'](0x0,0x0,Graphics['width'],Graphics[_0x4e608c(0x1e9)]),this[_0x4e608c(0x181)]['addChild'](_0x3066a4);},Spriteset_Map['prototype'][_0x262a98(0x18f)]=function(){const _0x54ba48=_0x262a98;this[_0x54ba48(0x181)]['children'][_0x54ba48(0x1d7)]((_0x32823,_0x5637d8)=>_0x32823[_0x54ba48(0x193)]-_0x5637d8['_id']);},Spriteset_Map[_0x262a98(0x10f)][_0x262a98(0x16c)]=function(_0x33164c){const _0x367ff4=_0x262a98;return this[_0x367ff4(0x181)][_0x367ff4(0x179)][_0x367ff4(0x1c6)](_0x2f6e02=>_0x2f6e02[_0x367ff4(0x193)]===_0x33164c);},Spriteset_Map['prototype'][_0x262a98(0x11f)]=function(_0xe79a8a){const _0x3a5abf=_0x262a98,_0x1070f5=this[_0x3a5abf(0x16c)](_0xe79a8a);_0x1070f5&&this[_0x3a5abf(0x181)][_0x3a5abf(0x157)](_0x1070f5);},Spriteset_Map[_0x262a98(0x10f)][_0x262a98(0x113)]=function(_0x581363,_0x4d3541){const _0x129e98=_0x262a98,_0x2b82f4=this[_0x129e98(0x16c)](_0x581363);!_0x2b82f4?(this[_0x129e98(0x1d4)]($gameMap[_0x129e98(0x1c0)](_0x581363)),this[_0x129e98(0x18f)]()):_0x129e98(0x187)===_0x129e98(0x1cc)?_0x196c57=!![]:(_0x2b82f4[_0x129e98(0x134)](),_0x4d3541&&_0x2b82f4[_0x129e98(0x11b)]['addLoadListener'](_0x2b82f4[_0x129e98(0x13b)]['bind'](_0x2b82f4)));};