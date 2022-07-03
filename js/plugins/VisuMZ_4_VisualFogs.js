//=============================================================================
// VisuStella MZ - Visual Fogs
// VisuMZ_4_VisualFogs.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualFogs = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualFogs = VisuMZ.VisualFogs || {};
VisuMZ.VisualFogs.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.05] [VisualFogs]
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

function _0x4d83(_0x239385,_0x5742a9){const _0x3af18e=_0x3af1();return _0x4d83=function(_0x4d838a,_0x3d6c69){_0x4d838a=_0x4d838a-0x15e;let _0x236fe6=_0x3af18e[_0x4d838a];return _0x236fe6;},_0x4d83(_0x239385,_0x5742a9);}const _0x5d4055=_0x4d83;(function(_0xb358d0,_0x3e0be5){const _0x43bedc=_0x4d83,_0x2116a4=_0xb358d0();while(!![]){try{const _0x52c7c6=-parseInt(_0x43bedc(0x1b9))/0x1*(-parseInt(_0x43bedc(0x15f))/0x2)+parseInt(_0x43bedc(0x206))/0x3+parseInt(_0x43bedc(0x24b))/0x4*(-parseInt(_0x43bedc(0x235))/0x5)+-parseInt(_0x43bedc(0x250))/0x6+-parseInt(_0x43bedc(0x211))/0x7+parseInt(_0x43bedc(0x23a))/0x8*(-parseInt(_0x43bedc(0x162))/0x9)+parseInt(_0x43bedc(0x1f8))/0xa;if(_0x52c7c6===_0x3e0be5)break;else _0x2116a4['push'](_0x2116a4['shift']());}catch(_0x36628f){_0x2116a4['push'](_0x2116a4['shift']());}}}(_0x3af1,0xf16e8));function _0x3af1(){const _0x2d1b8e=['tileHeight','none','RXbDC','yHbbc','filters','mask','vignetteFilename','length','max','update','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','712uXkQPd','getFogVignette_upper','HorzLoop','tileWidth','loadTemplateVignette','9842436ERKuTH','screenTileX','_fogLoopY','hueShift','ConvertParams','list','maskRegions','border','getFogVignette_lower','nZKUZ','jAUeU','MULTIPLY','regionId','trim','Game_Map_setup','sortVisualFogs','2836yNayLQ','removeVisualFog','BlurFilter','204939DXBZkV','colorTone','displayX','fZcaM','parameters','vertical','createWeather','Game_Map_setDisplayPos','blendMode','_fogZero','createMaskTileBitmap','updateBlendMode','getVisualFogOy','YLPjM','removeVisualFogLayer','Start','getVisualFogOx','indexOf','isLoopVertical','HueShift','JSON','_displayX','loadParallax','filter','clamp','getVisualFogSettings','description','Bhzgq','getFogVignette_border','fLpKw','match','_colorFilter','_fogDataRef','EVAL','SDvbv','_colorTone','XDtZv','exit','updateOrigin','targetOpacity','isInstanceOfSceneMap','Argument\x20must\x20be\x20an\x20array','_fogX','_customModified','CreateLayerData','NORMAL','Game_Map_scrollRight','oNuTA','_blurFilter','MHDfU','findTargetVisualFog','children','_maskSprite','vxfOe','origin','rgba(0,\x200,\x200,\x200)','_updateColorFilter','FogOpacity','BlendMode','WdvEy','blur','floor','VisualFogs','Spriteset_Map_createWeather','_fogVignettes','_fogName','setHue','settings','CustomVignette','NUM','NLgLe','loadBitmap','setColorTone','LfiSg','FogFadeOpacity','iFBfY','charAt','scrollUp','right','_fogSx','_baseSprite','DVCzc','clone','DwCfr','dqgVv','addLoadListener','fillRect','623MqlPWT','getVisualFogs','NlbSE','getFogVignette_right','filename','_fogSy','bacnF','includes','Optional','mFdCs','height','bitmap','_hue','sort','SCREEN','MaskRegions','_fogY','RZGNc','HWIbS','return\x200','makeDeepCopy','DEFAULT_FOG_BLEND_MODE','removeChild','DEFAULT_FOG_TILE_SPILL','PremadeVignette','DEFAULT_FOG_OPACITY','screenTileY','#ffffff','Hue','JRUcq','Game_Map_updateParallax','horizontal','createNewFogLayer','_id','updateVisualFogLayer','ARRAYNUM','ADDITIVE','OpacityFlat','MaskBlur','MaskSpill','Settings','push','hue','loadCustomVignette','_visualFogSettings','Czyvu','toLowerCase','maskTerrainTags','FogRemove','displayY','GFJFK','scrollDown','call','prototype','TemplateSettings','width','create','opacityDuration','createFogLayers','End','getFogVignette','scrollLeft','isSceneMap','38457440bkKqtx','lPpVx','ceil','createMaskSprite','createMaskBitmap','_displayY','getFogVignette_empty','parse','getFogVignette_%1','VosPg','rQtFv','getFogVignette_left','Game_Map_scrollLeft','zZWGq','2259468tmTaEf','JWHxc','ARRAYJSON','getFogVignette_horizontal','setupVisualFogs','format','_scene','fRMSr','_fogLoopX','initialize','map','705369bQSosi','name','Game_Map_scrollUp','_fogContainer','DUNPH','mbUkS','bind','xJBzJ','updateMask','kYEwO','ARRAYSTR','addChangeVisualFog','_spriteset','gradientFillRect','drawMaskTile','vignette','ARRAYSTRUCT','status','isLoopHorizontal','ScrollLock','opacity','FogAddChangeSettings','custom','DEFAULT_FOG_TILE_BLUR','split','note','dvkLL','updateHue','terrainTag','registerCommand','addChild','move','equals','setDisplayPos','Game_Map_scrollDown','updateVisualFogSettings','51085YliGBA','STRUCT','setup','_createColorFilter','constructor','328GOQWYE','ARRAYFUNC','RegExp','maskBlur','bzwme','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'];_0x3af1=function(){return _0x2d1b8e;};return _0x3af1();}var label=_0x5d4055(0x1a0),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5d4055(0x179)](function(_0x3cc6ad){const _0x3c2727=_0x5d4055;return _0x3cc6ad[_0x3c2727(0x222)]&&_0x3cc6ad[_0x3c2727(0x17c)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x5d4055(0x1e1)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x2ab1ea,_0x39bb2e){const _0x51690=_0x5d4055;for(const _0x44cf4b in _0x39bb2e){if(_0x44cf4b[_0x51690(0x180)](/(.*):(.*)/i)){const _0x4fce3e=String(RegExp['$1']),_0x3d1afa=String(RegExp['$2'])['toUpperCase']()[_0x51690(0x25d)]();let _0x58f6ba,_0x457051,_0x234bc0;switch(_0x3d1afa){case _0x51690(0x1a7):_0x58f6ba=_0x39bb2e[_0x44cf4b]!==''?Number(_0x39bb2e[_0x44cf4b]):0x0;break;case _0x51690(0x1dc):_0x457051=_0x39bb2e[_0x44cf4b]!==''?JSON[_0x51690(0x1ff)](_0x39bb2e[_0x44cf4b]):[],_0x58f6ba=_0x457051[_0x51690(0x210)](_0x5a3399=>Number(_0x5a3399));break;case _0x51690(0x183):_0x58f6ba=_0x39bb2e[_0x44cf4b]!==''?eval(_0x39bb2e[_0x44cf4b]):null;break;case'ARRAYEVAL':_0x457051=_0x39bb2e[_0x44cf4b]!==''?JSON[_0x51690(0x1ff)](_0x39bb2e[_0x44cf4b]):[],_0x58f6ba=_0x457051[_0x51690(0x210)](_0x480ffd=>eval(_0x480ffd));break;case _0x51690(0x176):_0x58f6ba=_0x39bb2e[_0x44cf4b]!==''?JSON['parse'](_0x39bb2e[_0x44cf4b]):'';break;case _0x51690(0x208):_0x457051=_0x39bb2e[_0x44cf4b]!==''?JSON['parse'](_0x39bb2e[_0x44cf4b]):[],_0x58f6ba=_0x457051[_0x51690(0x210)](_0x5fdf9a=>JSON[_0x51690(0x1ff)](_0x5fdf9a));break;case'FUNC':_0x58f6ba=_0x39bb2e[_0x44cf4b]!==''?new Function(JSON['parse'](_0x39bb2e[_0x44cf4b])):new Function(_0x51690(0x1cc));break;case _0x51690(0x23b):_0x457051=_0x39bb2e[_0x44cf4b]!==''?JSON[_0x51690(0x1ff)](_0x39bb2e[_0x44cf4b]):[],_0x58f6ba=_0x457051[_0x51690(0x210)](_0x269356=>new Function(JSON['parse'](_0x269356)));break;case'STR':_0x58f6ba=_0x39bb2e[_0x44cf4b]!==''?String(_0x39bb2e[_0x44cf4b]):'';break;case _0x51690(0x21b):_0x457051=_0x39bb2e[_0x44cf4b]!==''?JSON[_0x51690(0x1ff)](_0x39bb2e[_0x44cf4b]):[],_0x58f6ba=_0x457051['map'](_0xe6bec3=>String(_0xe6bec3));break;case _0x51690(0x236):_0x234bc0=_0x39bb2e[_0x44cf4b]!==''?JSON[_0x51690(0x1ff)](_0x39bb2e[_0x44cf4b]):{},_0x58f6ba=VisuMZ['ConvertParams']({},_0x234bc0);break;case _0x51690(0x221):_0x457051=_0x39bb2e[_0x44cf4b]!==''?JSON[_0x51690(0x1ff)](_0x39bb2e[_0x44cf4b]):[],_0x58f6ba=_0x457051[_0x51690(0x210)](_0x5da8c8=>VisuMZ[_0x51690(0x254)]({},JSON[_0x51690(0x1ff)](_0x5da8c8)));break;default:continue;}_0x2ab1ea[_0x4fce3e]=_0x58f6ba;}}return _0x2ab1ea;},(_0x2e1baa=>{const _0x107f61=_0x5d4055,_0x9d34c4=_0x2e1baa[_0x107f61(0x212)];for(const _0x4bd0b1 of dependencies){if('RZGNc'===_0x107f61(0x1ca)){if(!Imported[_0x4bd0b1]){if(_0x107f61(0x1f9)===_0x107f61(0x1ad))return this[_0x107f61(0x1fe)]();else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x9d34c4,_0x4bd0b1)),SceneManager[_0x107f61(0x187)]();break;}}}else this[_0x107f61(0x1aa)](this[_0x107f61(0x1a5)]()[_0x107f61(0x163)]);}const _0x57ca57=_0x2e1baa['description'];if(_0x57ca57['match'](/\[Version[ ](.*?)\]/i)){if('mFdCs'!==_0x107f61(0x1c2))this[_0x107f61(0x16a)]=this[_0x107f61(0x1a5)]()[_0x107f61(0x16a)];else{const _0x5aecb0=Number(RegExp['$1']);_0x5aecb0!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x9d34c4,_0x5aecb0)),SceneManager[_0x107f61(0x187)]());}}if(_0x57ca57[_0x107f61(0x180)](/\[Tier[ ](\d+)\]/i)){const _0x3569f9=Number(RegExp['$1']);_0x3569f9<tier?(alert(_0x107f61(0x23f)[_0x107f61(0x20b)](_0x9d34c4,_0x3569f9,tier)),SceneManager[_0x107f61(0x187)]()):tier=Math[_0x107f61(0x248)](_0x3569f9,tier);}VisuMZ[_0x107f61(0x254)](VisuMZ[label][_0x107f61(0x1e1)],_0x2e1baa[_0x107f61(0x166)]);})(pluginData),VisuMZ[_0x5d4055(0x1a0)]['TemplateSettings']=function(){const _0x37d1de=_0x5d4055;return{'id':0x0,'filename':'','_fogZero':![],'_fogLoopX':![],'_fogLoopY':![],'_fogSx':0x0,'_fogSy':0x0,'_fogX':0x0,'_fogY':0x0,'opacity':Game_Map[_0x37d1de(0x1d2)],'targetOpacity':Game_Map[_0x37d1de(0x1d2)],'opacityDuration':0x0,'blendMode':Game_Map[_0x37d1de(0x1ce)],'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[],'maskBlur':Game_Map[_0x37d1de(0x228)],'maskSpill':Game_Map[_0x37d1de(0x1d0)],'vignette':_0x37d1de(0x241),'vignetteFilename':''};},PluginManager[_0x5d4055(0x22e)](pluginData[_0x5d4055(0x212)],_0x5d4055(0x226),_0x357a77=>{const _0x1f380e=_0x5d4055;VisuMZ[_0x1f380e(0x254)](_0x357a77,_0x357a77);if(_0x357a77['id']<=0x0)return;if(_0x357a77[_0x1f380e(0x1bd)]===''||_0x357a77[_0x1f380e(0x1bd)]==='>>>ATTENTION<<<')return;let _0x1ca1aa=JsonEx[_0x1f380e(0x1cd)](_0x357a77[_0x1f380e(0x1c1)]);if(!_0x1ca1aa['hasOwnProperty'](_0x1f380e(0x256)))_0x1ca1aa=VisuMZ[_0x1f380e(0x1a0)][_0x1f380e(0x1ef)]();_0x1ca1aa[_0x1f380e(0x1bd)]=_0x357a77[_0x1f380e(0x1bd)],_0x1ca1aa['id']=_0x357a77['id'];while(_0x1ca1aa[_0x1f380e(0x163)][_0x1f380e(0x247)]<0x4){if(_0x1f380e(0x17f)!==_0x1f380e(0x207))_0x1ca1aa['colorTone'][_0x1f380e(0x1e2)](0x0);else{if(!_0x32c783['isInstanceOfSceneMap']())return;_0x2d466f['ConvertParams'](_0x2852ce,_0x1fc3dc);const _0x35e4a1=_0x3ee4c0['list'];for(const _0x1b437d of _0x35e4a1){_0x54fcd4[_0x1f380e(0x160)](_0x1b437d);}}}_0x1ca1aa[_0x1f380e(0x18c)]=0x0,_0x1ca1aa[_0x1f380e(0x1c9)]=0x0,_0x1ca1aa[_0x1f380e(0x189)]=_0x357a77['opacity'],_0x1ca1aa[_0x1f380e(0x1f2)]=0x0,_0x1ca1aa[_0x1f380e(0x220)]=_0x1ca1aa[_0x1f380e(0x220)]||'none',_0x1ca1aa['vignette']=_0x1ca1aa[_0x1f380e(0x220)][_0x1f380e(0x1e7)]()[_0x1f380e(0x25d)](),_0x1ca1aa[_0x1f380e(0x246)]!==''&&(_0x1ca1aa[_0x1f380e(0x220)]=_0x1f380e(0x227)),$gameMap[_0x1f380e(0x21c)](_0x1ca1aa);}),PluginManager['registerCommand'](pluginData[_0x5d4055(0x212)],_0x5d4055(0x1ac),_0x2303f5=>{const _0x2320bc=_0x5d4055;if(!SceneManager['isInstanceOfSceneMap']())return;VisuMZ[_0x2320bc(0x254)](_0x2303f5,_0x2303f5);const _0x458cf2=_0x2303f5[_0x2320bc(0x255)];for(const _0x182e14 of _0x458cf2){const _0x1e3416=$gameMap[_0x2320bc(0x17b)](_0x182e14);if(!_0x1e3416)continue;_0x1e3416[_0x2320bc(0x189)]=_0x2303f5[_0x2320bc(0x189)]||0x0,_0x1e3416[_0x2320bc(0x1f2)]=_0x2303f5['opacityDuration']||0x0,_0x1e3416['opacityDuration']<=0x0&&(_0x1e3416[_0x2320bc(0x225)]=_0x1e3416['targetOpacity']);}}),PluginManager[_0x5d4055(0x22e)](pluginData['name'],_0x5d4055(0x1e9),_0x4baab=>{const _0x25fba0=_0x5d4055;if(!SceneManager['isInstanceOfSceneMap']())return;VisuMZ['ConvertParams'](_0x4baab,_0x4baab);const _0xce34ce=_0x4baab[_0x25fba0(0x255)];for(const _0x5271a6 of _0xce34ce){$gameMap[_0x25fba0(0x160)](_0x5271a6);}}),VisuMZ[_0x5d4055(0x1a0)]['RegExp']={'Start':/<(?:FOG)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'End':/<\/(?:FOG)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'Filename':/(?:FILENAME|NAME):[ ](.*)/i,'HorzLoop':/(?:HORZ|HORIZONTAL) (?:LOOP|SCROLL):[ ](.*)/i,'VertLoop':/(?:VERT|VERTICAL) (?:LOOP|SCROLL):[ ](.*)/i,'ScrollLock':/<(?:MAP|SCROLL)[ ](?:LOCK|LOCKED)>/i,'OpacityRate':/(?:OPACITY):[ ](\d+)([%％])/i,'OpacityFlat':/(?:OPACITY):[ ](\d+)/i,'BlendMode':/BLEND MODE:[ ](.*)/i,'Hue':/HUE:[ ](\d+)/i,'HueShift':/HUE (?:SHIFT|SPEED):[ ](.*)/i,'Tone':/(?:COLOR TONE|TONE|TINT):[ ](.*)/i,'MaskRegions':/(?:REGION|REGIONS):[ ](.*)/i,'MaskTerrainTags':/TERRAIN (?:TAG|TAGS):[ ](.*)/i,'MaskBlur':/(?:TILE BLUR|BLUR):[ ](.*)/i,'MaskSpill':/(?:TILE SPILL|SPILL):[ ](.*)/i,'CustomVignette':/CUSTOM (?:VIGNETTE|OVERLAY):[ ](.*)/i,'PremadeVignette':/(?:VIGNETTE|OVERLAY):[ ](.*)/i},ImageManager[_0x5d4055(0x1f5)]=function(_0x2a863d){const _0x5d0fb8=_0x5d4055;if(!_0x2a863d)return this['getFogVignette_empty']();this[_0x5d0fb8(0x1a2)]=this[_0x5d0fb8(0x1a2)]||{},_0x2a863d=_0x2a863d[_0x5d0fb8(0x1e7)]()[_0x5d0fb8(0x25d)]();const _0x492a8e='getFogVignette_%1'[_0x5d0fb8(0x20b)](_0x2a863d);if(this[_0x5d0fb8(0x1a2)][_0x2a863d])return this[_0x5d0fb8(0x1a2)][_0x2a863d];else return this[_0x492a8e]?this[_0x492a8e]():this[_0x5d0fb8(0x1fe)]();},ImageManager[_0x5d4055(0x1fe)]=function(){const _0x5a645f=_0x5d4055;if(this[_0x5a645f(0x1a2)]['empty'])return this[_0x5a645f(0x1a2)]['empty'];const _0x3cbf8e=new Bitmap(Graphics[_0x5a645f(0x1f0)],Graphics[_0x5a645f(0x1c3)]);return _0x3cbf8e[_0x5a645f(0x18d)]=![],this['_fogVignettes']=this[_0x5a645f(0x1a2)]||{},this[_0x5a645f(0x1a2)]['empty']=_0x3cbf8e,_0x3cbf8e;},ImageManager[_0x5d4055(0x24c)]=function(){const _0x47d446=_0x5d4055,_0x32ca66=new Bitmap(Graphics['width'],Graphics[_0x47d446(0x1c3)]),_0x12e0a1=_0x47d446(0x199),_0x336d91=_0x47d446(0x1d4);return _0x32ca66[_0x47d446(0x21e)](0x0,0x0,Graphics[_0x47d446(0x1f0)],Math['ceil'](Graphics[_0x47d446(0x1c3)]/0x3),_0x336d91,_0x12e0a1,!![]),_0x32ca66[_0x47d446(0x18d)]=![],this[_0x47d446(0x1a2)]=this[_0x47d446(0x1a2)]||{},this[_0x47d446(0x1a2)]['upper']=_0x32ca66,_0x32ca66;},ImageManager[_0x5d4055(0x258)]=function(){const _0x297841=_0x5d4055,_0xa0fb4b=new Bitmap(Graphics[_0x297841(0x1f0)],Graphics[_0x297841(0x1c3)]),_0x570c70=_0x297841(0x199),_0x38c9b3=_0x297841(0x1d4);return _0xa0fb4b[_0x297841(0x21e)](0x0,Math[_0x297841(0x1fa)](Graphics[_0x297841(0x1c3)]*0x2/0x3),Graphics[_0x297841(0x1f0)],Math[_0x297841(0x1fa)](Graphics[_0x297841(0x1c3)]/0x3),_0x570c70,_0x38c9b3,!![]),_0xa0fb4b[_0x297841(0x18d)]=![],this[_0x297841(0x1a2)]=this[_0x297841(0x1a2)]||{},this['_fogVignettes']['lower']=_0xa0fb4b,_0xa0fb4b;},ImageManager[_0x5d4055(0x209)]=function(){const _0x1e5f95=_0x5d4055,_0x2656a1=new Bitmap(Graphics[_0x1e5f95(0x1f0)],Graphics[_0x1e5f95(0x1c3)]),_0x5a7709=_0x1e5f95(0x199),_0x42c75a=_0x1e5f95(0x1d4);return _0x2656a1[_0x1e5f95(0x21e)](0x0,0x0,Graphics['width'],Math[_0x1e5f95(0x1fa)](Graphics[_0x1e5f95(0x1c3)]/0x3),_0x42c75a,_0x5a7709,!![]),_0x2656a1[_0x1e5f95(0x21e)](0x0,Math[_0x1e5f95(0x1fa)](Graphics['height']*0x2/0x3),Graphics['width'],Math[_0x1e5f95(0x1fa)](Graphics['height']/0x3),_0x5a7709,_0x42c75a,!![]),_0x2656a1[_0x1e5f95(0x18d)]=![],this[_0x1e5f95(0x1a2)]=this['_fogVignettes']||{},this['_fogVignettes'][_0x1e5f95(0x1d8)]=_0x2656a1,_0x2656a1;},ImageManager[_0x5d4055(0x203)]=function(){const _0x48c887=_0x5d4055,_0x3e7e68=new Bitmap(Graphics['width'],Graphics[_0x48c887(0x1c3)]),_0x37b69e='rgba(0,\x200,\x200,\x200)',_0x450d6b=_0x48c887(0x1d4);return _0x3e7e68['gradientFillRect'](0x0,0x0,Math[_0x48c887(0x1fa)](Graphics[_0x48c887(0x1f0)]/0x3),Graphics[_0x48c887(0x1c3)],_0x450d6b,_0x37b69e,![]),_0x3e7e68[_0x48c887(0x18d)]=![],this[_0x48c887(0x1a2)]=this[_0x48c887(0x1a2)]||{},this[_0x48c887(0x1a2)]['left']=_0x3e7e68,_0x3e7e68;},ImageManager[_0x5d4055(0x1bc)]=function(){const _0x2b2ba3=_0x5d4055,_0x4c1c8d=new Bitmap(Graphics[_0x2b2ba3(0x1f0)],Graphics['height']),_0x19fd7c=_0x2b2ba3(0x199),_0x5427d6=_0x2b2ba3(0x1d4);return _0x4c1c8d[_0x2b2ba3(0x21e)](Math['ceil'](Graphics[_0x2b2ba3(0x1f0)]*0x2/0x3),0x0,Math[_0x2b2ba3(0x1fa)](Graphics[_0x2b2ba3(0x1f0)]/0x3),Graphics[_0x2b2ba3(0x1c3)],_0x19fd7c,_0x5427d6,![]),_0x4c1c8d[_0x2b2ba3(0x18d)]=![],this[_0x2b2ba3(0x1a2)]=this[_0x2b2ba3(0x1a2)]||{},this[_0x2b2ba3(0x1a2)][_0x2b2ba3(0x1b0)]=_0x4c1c8d,_0x4c1c8d;},ImageManager['getFogVignette_vertical']=function(){const _0x4b596a=_0x5d4055,_0x4c8cbf=new Bitmap(Graphics['width'],Graphics[_0x4b596a(0x1c3)]),_0x3ea9a3='rgba(0,\x200,\x200,\x200)',_0x437a1f=_0x4b596a(0x1d4);return _0x4c8cbf[_0x4b596a(0x21e)](0x0,0x0,Math[_0x4b596a(0x1fa)](Graphics[_0x4b596a(0x1f0)]/0x3),Graphics[_0x4b596a(0x1c3)],_0x437a1f,_0x3ea9a3,![]),_0x4c8cbf['gradientFillRect'](Math['ceil'](Graphics[_0x4b596a(0x1f0)]*0x2/0x3),0x0,Math[_0x4b596a(0x1fa)](Graphics['width']/0x3),Graphics[_0x4b596a(0x1c3)],_0x3ea9a3,_0x437a1f,![]),_0x4c8cbf['_customModified']=![],this[_0x4b596a(0x1a2)]=this['_fogVignettes']||{},this[_0x4b596a(0x1a2)][_0x4b596a(0x167)]=_0x4c8cbf,_0x4c8cbf;},ImageManager[_0x5d4055(0x17e)]=function(){const _0x5aaccf=_0x5d4055,_0x5dc3f8=new Bitmap(Graphics['width'],Graphics[_0x5aaccf(0x1c3)]),_0x27eb42=_0x5aaccf(0x199),_0x55e8aa='#ffffff';return _0x5dc3f8[_0x5aaccf(0x21e)](0x0,0x0,Graphics['width'],Math[_0x5aaccf(0x1fa)](Graphics[_0x5aaccf(0x1c3)]/0x3),_0x55e8aa,_0x27eb42,!![]),_0x5dc3f8[_0x5aaccf(0x21e)](0x0,Math['ceil'](Graphics[_0x5aaccf(0x1c3)]*0x2/0x3),Graphics['width'],Math[_0x5aaccf(0x1fa)](Graphics['height']/0x3),_0x27eb42,_0x55e8aa,!![]),_0x5dc3f8[_0x5aaccf(0x21e)](0x0,0x0,Math['ceil'](Graphics['width']/0x3),Graphics[_0x5aaccf(0x1c3)],_0x55e8aa,_0x27eb42,![]),_0x5dc3f8[_0x5aaccf(0x21e)](Math[_0x5aaccf(0x1fa)](Graphics[_0x5aaccf(0x1f0)]*0x2/0x3),0x0,Math[_0x5aaccf(0x1fa)](Graphics[_0x5aaccf(0x1f0)]/0x3),Graphics[_0x5aaccf(0x1c3)],_0x27eb42,_0x55e8aa,![]),_0x5dc3f8[_0x5aaccf(0x18d)]=![],this['_fogVignettes']=this[_0x5aaccf(0x1a2)]||{},this['_fogVignettes'][_0x5aaccf(0x257)]=_0x5dc3f8,_0x5dc3f8;},SceneManager[_0x5d4055(0x1f7)]=function(){const _0x27baf5=_0x5d4055;return this['_scene']&&this[_0x27baf5(0x20c)][_0x27baf5(0x239)]===Scene_Map;},SceneManager[_0x5d4055(0x18a)]=function(){const _0xda1da2=_0x5d4055;return this[_0xda1da2(0x20c)]&&this['_scene']instanceof Scene_Map;},VisuMZ[_0x5d4055(0x1a0)][_0x5d4055(0x25e)]=Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x237)],Game_Map[_0x5d4055(0x1ee)]['setup']=function(_0x4f8d96){const _0x49a8a4=_0x5d4055;VisuMZ[_0x49a8a4(0x1a0)]['Game_Map_setup'][_0x49a8a4(0x1ed)](this,_0x4f8d96),this[_0x49a8a4(0x20a)]();},Game_Map['DEFAULT_FOG_OPACITY']=VisuMZ[_0x5d4055(0x1a0)][_0x5d4055(0x1e1)][_0x5d4055(0x19b)],Game_Map[_0x5d4055(0x1ce)]=VisuMZ[_0x5d4055(0x1a0)][_0x5d4055(0x1e1)][_0x5d4055(0x19c)],Game_Map['DEFAULT_FOG_TILE_BLUR']=VisuMZ[_0x5d4055(0x1a0)][_0x5d4055(0x1e1)][_0x5d4055(0x1df)],Game_Map['DEFAULT_FOG_TILE_SPILL']=VisuMZ['VisualFogs'][_0x5d4055(0x1e1)][_0x5d4055(0x1e0)],Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x20a)]=function(){const _0x455af4=_0x5d4055;this[_0x455af4(0x1e5)]=[null];if(!$dataMap)return;const _0x5c22db=VisuMZ[_0x455af4(0x1a0)][_0x455af4(0x18e)]();for(const _0x5d440e of _0x5c22db){if(!_0x5d440e)continue;this[_0x455af4(0x1e5)][_0x5d440e['id']]=_0x5d440e;}},VisuMZ['VisualFogs'][_0x5d4055(0x18e)]=function(){const _0x4eb00b=_0x5d4055;if(!$dataMap)return[];const _0x1bb2e7=[],_0x560268=VisuMZ[_0x4eb00b(0x1a0)][_0x4eb00b(0x1ef)]();if(!$dataMap['note'])return[];const _0x2dc07b=VisuMZ[_0x4eb00b(0x1a0)][_0x4eb00b(0x23c)],_0x20d102=$dataMap[_0x4eb00b(0x22a)]['split'](/[\r\n]+/);let _0x519acb=JsonEx['makeDeepCopy'](_0x560268);for(const _0x493bcf of _0x20d102){if(_0x493bcf['match'](_0x2dc07b[_0x4eb00b(0x171)]))'Bhzgq'!==_0x4eb00b(0x17d)?this['setHue'](this[_0x4eb00b(0x1a5)]()[_0x4eb00b(0x1e3)]):_0x519acb['id']=Number(RegExp['$1']);else{if(_0x493bcf[_0x4eb00b(0x180)](_0x2dc07b[_0x4eb00b(0x1f4)])){const _0x10f182=Number(RegExp['$1']);if(_0x10f182>0x0&&_0x10f182===_0x519acb['id']&&_0x519acb[_0x4eb00b(0x1bd)]!=='')_0x1bb2e7[_0x4eb00b(0x1e2)](_0x519acb);_0x519acb=JsonEx[_0x4eb00b(0x1cd)](_0x560268);}else{if(_0x519acb['id']<=0x0)continue;}}if(_0x493bcf[_0x4eb00b(0x180)](_0x2dc07b['Filename']))_0x519acb[_0x4eb00b(0x1bd)]=String(RegExp['$1'])[_0x4eb00b(0x25d)](),_0x519acb[_0x4eb00b(0x1bd)][_0x4eb00b(0x1ae)](0x0)==='!'&&(_0x4eb00b(0x22b)===_0x4eb00b(0x22b)?_0x519acb[_0x4eb00b(0x16b)]=!![]:_0x4b9a60[_0x4eb00b(0x1c9)]=_0x3facfd);else{if(_0x493bcf[_0x4eb00b(0x180)](_0x2dc07b[_0x4eb00b(0x24d)]))_0x519acb[_0x4eb00b(0x20e)]=!![],_0x519acb[_0x4eb00b(0x1b1)]=Number(RegExp['$1'])||0x0;else{if(_0x493bcf[_0x4eb00b(0x180)](_0x2dc07b['VertLoop']))_0x519acb['_fogLoopY']=!![],_0x519acb[_0x4eb00b(0x1be)]=Number(RegExp['$1'])||0x0;else{if(_0x493bcf['match'](_0x2dc07b[_0x4eb00b(0x224)]))_0x519acb[_0x4eb00b(0x16b)]=!![];else{if(_0x493bcf[_0x4eb00b(0x180)](_0x2dc07b['OpacityRate'])){const _0x6fde8d=Number(RegExp['$1'])*0.01;_0x519acb[_0x4eb00b(0x225)]=Math['round'](_0x6fde8d*0xff)[_0x4eb00b(0x17a)](0x0,0xff);}else{if(_0x493bcf[_0x4eb00b(0x180)](_0x2dc07b[_0x4eb00b(0x1de)]))_0x519acb[_0x4eb00b(0x225)]=Number(RegExp['$1'])[_0x4eb00b(0x17a)](0x0,0xff);else{if(_0x493bcf[_0x4eb00b(0x180)](_0x2dc07b['BlendMode'])){if(_0x4eb00b(0x1e6)===_0x4eb00b(0x215))this[_0x4eb00b(0x192)]=new _0xca37c4[(_0x4eb00b(0x244))][(_0x4eb00b(0x161))](_0x2107be=!![]);else{const _0x1958d5=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x7816bd=[_0x4eb00b(0x18f),_0x4eb00b(0x1dd),_0x4eb00b(0x25b),_0x4eb00b(0x1c7)];_0x519acb[_0x4eb00b(0x16a)]=_0x7816bd[_0x4eb00b(0x173)](_0x1958d5)[_0x4eb00b(0x17a)](0x0,0x3);}}else{if(_0x493bcf[_0x4eb00b(0x180)](_0x2dc07b[_0x4eb00b(0x1d5)]))_0x4eb00b(0x243)!=='bdVFJ'?_0x519acb[_0x4eb00b(0x1e3)]=Number(RegExp['$1'])[_0x4eb00b(0x17a)](0x0,0x168):this[_0x4eb00b(0x24f)]();else{if(_0x493bcf['match'](_0x2dc07b[_0x4eb00b(0x175)]))_0x519acb['hueShift']=Number(RegExp['$1'])||0x0;else{if(_0x493bcf['match'](_0x2dc07b['Tone'])){const _0x78f0a5=String(RegExp['$1'])[_0x4eb00b(0x229)](',')[_0x4eb00b(0x210)](_0x265b7e=>Number(_0x265b7e)||0x0);while(_0x78f0a5['length']<0x4)_0x78f0a5[_0x4eb00b(0x1e2)](0x0);_0x519acb[_0x4eb00b(0x163)]=_0x78f0a5;}else{if(_0x493bcf[_0x4eb00b(0x180)](_0x2dc07b[_0x4eb00b(0x1c8)])){const _0x2fe491=String(RegExp['$1'])[_0x4eb00b(0x229)](',')[_0x4eb00b(0x210)](_0x2b062e=>Number(_0x2b062e)||0x1);_0x519acb[_0x4eb00b(0x256)]=_0x2fe491;}else{if(_0x493bcf['match'](_0x2dc07b['MaskTerrainTags'])){if('NueEc'!==_0x4eb00b(0x19d)){const _0xd8bc85=String(RegExp['$1'])['split'](',')['map'](_0xd571c4=>Number(_0xd571c4)||0x1);_0x519acb[_0x4eb00b(0x1e8)]=_0xd8bc85;}else{const _0x2d5eb8=this['settings']()[_0x4eb00b(0x220)];this[_0x4eb00b(0x196)]['bitmap']=_0x29e97b[_0x4eb00b(0x1f5)](_0x2d5eb8),this[_0x4eb00b(0x245)]=this[_0x4eb00b(0x196)],this['addChild'](this[_0x4eb00b(0x196)]);}}else{if(_0x493bcf[_0x4eb00b(0x180)](_0x2dc07b[_0x4eb00b(0x1df)]))_0x519acb[_0x4eb00b(0x23d)]=Math['max'](Number(RegExp['$1'])||0x0,0x0);else{if(_0x493bcf['match'](_0x2dc07b[_0x4eb00b(0x1e0)]))_0x519acb['maskSpill']=Math['max'](Number(RegExp['$1'])||0x0,0x0);else{if(_0x493bcf[_0x4eb00b(0x180)](_0x2dc07b[_0x4eb00b(0x1a6)]))_0x519acb[_0x4eb00b(0x246)]=(String(RegExp['$1'])||'')[_0x4eb00b(0x25d)](),_0x519acb[_0x4eb00b(0x220)]=_0x4eb00b(0x227);else{if(_0x493bcf[_0x4eb00b(0x180)](_0x2dc07b[_0x4eb00b(0x1d1)])){if(_0x4eb00b(0x165)===_0x4eb00b(0x165))_0x519acb['vignette']=(String(RegExp['$1'])||'')[_0x4eb00b(0x1e7)]();else return _0x36ff53[_0x4eb00b(0x18c)]*this[_0x4eb00b(0x24e)]()/0x2;}}}}}}}}}}}}}}}}}return _0x1bb2e7;},Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x1ba)]=function(){const _0x3fe2cc=_0x5d4055;return this[_0x3fe2cc(0x1e5)][_0x3fe2cc(0x179)](_0x599fb6=>!!_0x599fb6);},Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x17b)]=function(_0xf5daec){const _0x407489=_0x5d4055;return this[_0x407489(0x1e5)][_0xf5daec]||null;},Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x172)]=function(_0x4f3fb9){const _0x76cc06=_0x5d4055,_0x3b33b5=this[_0x76cc06(0x17b)](_0x4f3fb9);if(_0x3b33b5[_0x76cc06(0x16b)])return _0x3b33b5['_fogX']*this[_0x76cc06(0x24e)]();else{if(_0x3b33b5[_0x76cc06(0x20e)])return _0x76cc06(0x1eb)===_0x76cc06(0x1eb)?_0x3b33b5['_fogX']*this['tileWidth']()/0x2:this[_0x76cc06(0x1a2)][_0x1de4a0];else{if('MMleb'!==_0x76cc06(0x16f))return 0x0;else _0x38d92b['vignette']=_0x76cc06(0x227);}}},Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x16e)]=function(_0x5f2ff6){const _0x552bcb=_0x5d4055,_0x12d809=this[_0x552bcb(0x17b)](_0x5f2ff6);if(_0x12d809[_0x552bcb(0x16b)])return _0x12d809[_0x552bcb(0x1c9)]*this[_0x552bcb(0x240)]();else{if(_0x12d809['_fogLoopY'])return _0x12d809[_0x552bcb(0x1c9)]*this[_0x552bcb(0x240)]()/0x2;else{if(_0x552bcb(0x1b3)==='CSbWc')this[_0x552bcb(0x244)]=[];else return 0x0;}}},Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x160)]=function(_0x1b26f4){const _0x3c6dca=_0x5d4055;this[_0x3c6dca(0x1e5)]=this['_visualFogSettings']||[];if(!this[_0x3c6dca(0x1e5)][_0x1b26f4])return;this[_0x3c6dca(0x1e5)][_0x1b26f4]=null;const _0x73beb7=SceneManager[_0x3c6dca(0x20c)][_0x3c6dca(0x21d)];_0x73beb7&&_0x73beb7['removeVisualFogLayer'](_0x1b26f4);},Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x21c)]=function(_0x2615ef){const _0x886641=_0x5d4055,_0x2edf75=_0x2615ef['id'];let _0x468f24=![];this[_0x886641(0x1e5)]=this[_0x886641(0x1e5)]||[];if(this[_0x886641(0x1e5)][_0x2edf75]){const _0x4433b2=this[_0x886641(0x1e5)][_0x2edf75];if(!_0x4433b2[_0x886641(0x256)][_0x886641(0x231)](_0x2615ef['maskRegions']))_0x468f24=!![];else{if(!_0x4433b2[_0x886641(0x1e8)][_0x886641(0x231)](_0x2615ef[_0x886641(0x1e8)]))_0x886641(0x202)===_0x886641(0x202)?_0x468f24=!![]:_0x48542b[_0x886641(0x16b)]=!![];else _0x4433b2[_0x886641(0x220)]!=='none'&&(_0x886641(0x20d)!==_0x886641(0x216)?_0x468f24=!![]:(_0x1133c9(_0x886641(0x24a)[_0x886641(0x20b)](_0x26f090,_0x544e98)),_0x49d2c5[_0x886641(0x187)]()));}}this[_0x886641(0x1e5)][_0x2edf75]=_0x2615ef;if(!SceneManager[_0x886641(0x1f7)]())return;const _0x4ededf=SceneManager[_0x886641(0x20c)][_0x886641(0x21d)];_0x4ededf&&_0x4ededf[_0x886641(0x1db)](_0x2edf75,_0x468f24);},VisuMZ['VisualFogs']['Game_Map_setDisplayPos']=Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x232)],Game_Map[_0x5d4055(0x1ee)]['setDisplayPos']=function(_0x4462c6,_0x4bcb2e){const _0x133938=_0x5d4055;VisuMZ[_0x133938(0x1a0)][_0x133938(0x169)][_0x133938(0x1ed)](this,_0x4462c6,_0x4bcb2e);for(const _0x50b7ee of this[_0x133938(0x1ba)]()){if(!_0x50b7ee)continue;this[_0x133938(0x223)]()?_0x133938(0x1d6)===_0x133938(0x1d6)?_0x50b7ee[_0x133938(0x18c)]=_0x4462c6:(_0x1a3af1(_0x133938(0x23f)[_0x133938(0x20b)](_0x137280,_0x522faf,_0x2effe2)),_0x4e9f16[_0x133938(0x187)]()):_0x50b7ee[_0x133938(0x18c)]=this[_0x133938(0x177)];if(this[_0x133938(0x174)]()){if(_0x133938(0x1a8)!==_0x133938(0x1cb))_0x50b7ee[_0x133938(0x1c9)]=_0x4bcb2e;else{const _0x4013b6=new _0x516a5a(_0x4a7039[_0x133938(0x1f0)],_0x1dc686[_0x133938(0x1c3)]),_0x55eb70='rgba(0,\x200,\x200,\x200)',_0x389abe=_0x133938(0x1d4);return _0x4013b6[_0x133938(0x21e)](0x0,0x0,_0x2ece91[_0x133938(0x1f0)],_0x4d3bbc[_0x133938(0x1fa)](_0x237550['height']/0x3),_0x389abe,_0x55eb70,!![]),_0x4013b6[_0x133938(0x21e)](0x0,_0x3851ce['ceil'](_0x3869b9[_0x133938(0x1c3)]*0x2/0x3),_0x172217[_0x133938(0x1f0)],_0x277f3a[_0x133938(0x1fa)](_0x10d1fb[_0x133938(0x1c3)]/0x3),_0x55eb70,_0x389abe,!![]),_0x4013b6[_0x133938(0x18d)]=![],this[_0x133938(0x1a2)]=this[_0x133938(0x1a2)]||{},this['_fogVignettes'][_0x133938(0x1d8)]=_0x4013b6,_0x4013b6;}}else _0x133938(0x1ab)!==_0x133938(0x259)?_0x50b7ee[_0x133938(0x1c9)]=this[_0x133938(0x1fd)]:_0x5f2493[_0x133938(0x1c9)]=this[_0x133938(0x1fd)];}},VisuMZ['VisualFogs'][_0x5d4055(0x204)]=Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x1f6)],Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x1f6)]=function(_0x5bbbdb){const _0x2e3038=_0x5d4055,_0x4b089d=this[_0x2e3038(0x177)];VisuMZ[_0x2e3038(0x1a0)][_0x2e3038(0x204)]['call'](this,_0x5bbbdb);for(const _0x541519 of this['getVisualFogs']()){if(_0x2e3038(0x205)===_0x2e3038(0x193))_0x209d28['opacity']=_0x341944(_0x2b10a6['$1'])[_0x2e3038(0x17a)](0x0,0xff);else{if(!_0x541519)continue;if(this[_0x2e3038(0x223)]())'ksvLH'===_0x2e3038(0x1bf)?_0x52ecfa[_0x2e3038(0x1c9)]-=_0xf96eb6:_0x541519[_0x2e3038(0x20e)]&&(_0x541519[_0x2e3038(0x18c)]-=_0x5bbbdb);else{if(this[_0x2e3038(0x1f0)]()>=this[_0x2e3038(0x251)]()){if(_0x2e3038(0x218)==='xJBzJ')_0x541519[_0x2e3038(0x18c)]+=this[_0x2e3038(0x177)]-_0x4b089d;else{if(!this[_0x2e3038(0x245)])return;this['settings']()[_0x2e3038(0x220)]!==_0x2e3038(0x241)?(this[_0x2e3038(0x196)]['x']=0x0,this[_0x2e3038(0x196)]['y']=0x0):(this[_0x2e3038(0x196)]['x']=_0x10a434['floor'](-_0x149d1f[_0x2e3038(0x164)]()*_0x3fe31f[_0x2e3038(0x24e)]()),this[_0x2e3038(0x196)]['y']=_0x4d06a5[_0x2e3038(0x19f)](-_0x284968['displayY']()*_0x17a918[_0x2e3038(0x240)]()));}}}}}},VisuMZ['VisualFogs']['Game_Map_scrollRight']=Game_Map['prototype']['scrollRight'],Game_Map[_0x5d4055(0x1ee)]['scrollRight']=function(_0x38afc6){const _0x2ad426=_0x5d4055,_0x214fd5=this['_displayX'];VisuMZ[_0x2ad426(0x1a0)][_0x2ad426(0x190)][_0x2ad426(0x1ed)](this,_0x38afc6);for(const _0x1cb49a of this['getVisualFogs']()){if(!_0x1cb49a)continue;if(this[_0x2ad426(0x223)]())_0x1cb49a[_0x2ad426(0x20e)]&&(_0x2ad426(0x201)!=='VosPg'?(_0x49fbed[_0x2ad426(0x1a9)](),_0x3cfb22&&_0x5804d8[_0x2ad426(0x1c4)][_0x2ad426(0x1b7)](_0x4971fb[_0x2ad426(0x1fc)][_0x2ad426(0x217)](_0x23d995))):_0x1cb49a[_0x2ad426(0x18c)]+=_0x38afc6);else this[_0x2ad426(0x1f0)]()>=this[_0x2ad426(0x251)]()&&(_0x1cb49a[_0x2ad426(0x18c)]+=this[_0x2ad426(0x177)]-_0x214fd5);}},VisuMZ[_0x5d4055(0x1a0)][_0x5d4055(0x233)]=Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x1ec)],Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x1ec)]=function(_0x3cd10c){const _0x21a998=_0x5d4055,_0x25b656=this[_0x21a998(0x1fd)];VisuMZ['VisualFogs']['Game_Map_scrollDown'][_0x21a998(0x1ed)](this,_0x3cd10c);for(const _0x4013a0 of this[_0x21a998(0x1ba)]()){if(!_0x4013a0)continue;if(this[_0x21a998(0x174)]())_0x4013a0[_0x21a998(0x252)]&&(_0x4013a0['_fogY']+=_0x3cd10c);else this[_0x21a998(0x1c3)]()>=this[_0x21a998(0x1d3)]()&&(_0x4013a0['_fogY']+=this['_displayY']-_0x25b656);}},VisuMZ['VisualFogs'][_0x5d4055(0x213)]=Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x1af)],Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x1af)]=function(_0x1cac32){const _0x493814=_0x5d4055,_0x4e4e77=this[_0x493814(0x1fd)];VisuMZ[_0x493814(0x1a0)][_0x493814(0x213)]['call'](this,_0x1cac32);for(const _0x49b0e5 of this[_0x493814(0x1ba)]()){if(!_0x49b0e5)continue;if(this[_0x493814(0x174)]())_0x49b0e5[_0x493814(0x252)]&&(_0x49b0e5[_0x493814(0x1c9)]-=_0x1cac32);else this[_0x493814(0x1c3)]()>=this[_0x493814(0x1d3)]()&&(_0x49b0e5[_0x493814(0x1c9)]+=this[_0x493814(0x1fd)]-_0x4e4e77);}},VisuMZ[_0x5d4055(0x1a0)][_0x5d4055(0x1d7)]=Game_Map[_0x5d4055(0x1ee)]['updateParallax'],Game_Map[_0x5d4055(0x1ee)]['updateParallax']=function(){const _0x1605ac=_0x5d4055;VisuMZ[_0x1605ac(0x1a0)][_0x1605ac(0x1d7)][_0x1605ac(0x1ed)](this);for(const _0x587119 of this[_0x1605ac(0x1ba)]()){if('LKhPz'===_0x1605ac(0x23e))for(let _0x28dd82=0x0;_0x28dd82<_0x37660a;_0x28dd82++){(_0xae7a9c['includes'](_0x327cfc['regionId'](_0x1bdc7e,_0x28dd82))||_0x3b3d33[_0x1605ac(0x1c0)](_0x7b4a43[_0x1605ac(0x22d)](_0x4adefe,_0x28dd82)))&&this[_0x1605ac(0x196)]['bitmap'][_0x1605ac(0x1b8)](_0x139545*_0x9960e2-_0x14acd3,_0x28dd82*_0x20451d-_0x47b604,_0x1e0cf6,_0x2465bb,_0x1605ac(0x1d4));}else{if(!_0x587119)continue;this[_0x1605ac(0x234)](_0x587119);}}},Game_Map[_0x5d4055(0x1ee)][_0x5d4055(0x234)]=function(_0x427613){const _0x482212=_0x5d4055;_0x427613[_0x482212(0x20e)]&&(_0x427613[_0x482212(0x18c)]+=_0x427613[_0x482212(0x1b1)]/this[_0x482212(0x24e)]()/0x2);_0x427613[_0x482212(0x252)]&&(_0x427613[_0x482212(0x1c9)]+=_0x427613[_0x482212(0x1be)]/this[_0x482212(0x240)]()/0x2);_0x427613[_0x482212(0x1e3)]+=_0x427613[_0x482212(0x253)];if(_0x427613['opacityDuration']>0x0){const _0x2f4056=_0x427613[_0x482212(0x1f2)];_0x427613['opacity']=(_0x427613[_0x482212(0x225)]*(_0x2f4056-0x1)+_0x427613['targetOpacity'])/_0x2f4056,_0x427613['opacityDuration']--;}};function Sprite_VisualFog(){const _0x2045f5=_0x5d4055;this[_0x2045f5(0x20f)](...arguments);}Sprite_VisualFog[_0x5d4055(0x1ee)]=Object[_0x5d4055(0x1f1)](TilingSprite[_0x5d4055(0x1ee)]),Sprite_VisualFog[_0x5d4055(0x1ee)][_0x5d4055(0x239)]=Sprite_VisualFog,Sprite_VisualFog['prototype']['initialize']=function(_0x4d30c7){const _0x3029e9=_0x5d4055;this['_id']=_0x4d30c7,TilingSprite['prototype'][_0x3029e9(0x20f)][_0x3029e9(0x1ed)](this),this[_0x3029e9(0x238)](),this[_0x3029e9(0x1a9)](),this[_0x3029e9(0x1c4)][_0x3029e9(0x1b7)](this['createMaskSprite'][_0x3029e9(0x217)](this));},Sprite_VisualFog[_0x5d4055(0x1ee)]['settings']=function(){const _0x3986ee=_0x5d4055;return $gameMap[_0x3986ee(0x17b)](this[_0x3986ee(0x1da)]);},Sprite_VisualFog['prototype'][_0x5d4055(0x238)]=function(){const _0x3888f3=_0x5d4055;this['_hue']=0x0,this['_colorTone']=[0x0,0x0,0x0,0x0],this[_0x3888f3(0x181)]=new ColorFilter(),!this[_0x3888f3(0x244)]&&(this[_0x3888f3(0x244)]=[]),this[_0x3888f3(0x244)][_0x3888f3(0x1e2)](this[_0x3888f3(0x181)]);},Sprite_VisualFog['prototype'][_0x5d4055(0x19a)]=function(){const _0x14566c=_0x5d4055;!this[_0x14566c(0x181)]&&this[_0x14566c(0x238)](),this[_0x14566c(0x181)]['setHue'](this['_hue']),this[_0x14566c(0x181)]['setColorTone'](this[_0x14566c(0x185)]);},Sprite_VisualFog[_0x5d4055(0x1ee)]['loadBitmap']=function(){const _0x46eca1=_0x5d4055;this[_0x46eca1(0x1a3)]=this[_0x46eca1(0x1a5)]()['filename'],this['bitmap']=ImageManager[_0x46eca1(0x178)](this[_0x46eca1(0x1a3)]);},Sprite_VisualFog['prototype'][_0x5d4055(0x1fb)]=function(){const _0xc268ce=_0x5d4055;this['_maskSprite']=new Sprite(),this[_0xc268ce(0x1fc)]();},Sprite_VisualFog[_0x5d4055(0x1ee)][_0x5d4055(0x1fc)]=function(){const _0x288f29=_0x5d4055;this[_0x288f29(0x196)][_0x288f29(0x1c4)]&&this[_0x288f29(0x1cf)](this['_maskSprite']);this['mask']=undefined;const _0x401884=this[_0x288f29(0x1a5)]()[_0x288f29(0x256)],_0x1258d0=this[_0x288f29(0x1a5)]()['maskTerrainTags'];if(this[_0x288f29(0x1a5)]()[_0x288f29(0x220)]==='custom'){if(_0x288f29(0x242)!==_0x288f29(0x242)){const _0x33b648=_0x40c1bb(_0x379b2e['$1'])[_0x288f29(0x229)](',')[_0x288f29(0x210)](_0x5b4765=>_0x53486e(_0x5b4765)||0x0);while(_0x33b648[_0x288f29(0x247)]<0x4)_0x33b648[_0x288f29(0x1e2)](0x0);_0x2f6c40[_0x288f29(0x163)]=_0x33b648;}else this[_0x288f29(0x1e4)]();}else{if(this[_0x288f29(0x1a5)]()['vignette']!=='none')_0x288f29(0x21a)!==_0x288f29(0x21a)?(this[_0x288f29(0x196)]['x']=0x0,this[_0x288f29(0x196)]['y']=0x0):this[_0x288f29(0x24f)]();else(_0x401884['length']>0x0||_0x1258d0[_0x288f29(0x247)]>0x0)&&this[_0x288f29(0x16c)]();}},Sprite_VisualFog[_0x5d4055(0x1ee)][_0x5d4055(0x1e4)]=function(){const _0xf7f70b=_0x5d4055,_0x1a5bb3=this['settings']()[_0xf7f70b(0x246)];this[_0xf7f70b(0x196)][_0xf7f70b(0x1c4)]=ImageManager[_0xf7f70b(0x178)](_0x1a5bb3),this[_0xf7f70b(0x196)]['bitmap']['_customModified']=![],this[_0xf7f70b(0x245)]=this[_0xf7f70b(0x196)],this[_0xf7f70b(0x22f)](this[_0xf7f70b(0x196)]);},Sprite_VisualFog[_0x5d4055(0x1ee)][_0x5d4055(0x24f)]=function(){const _0x23acef=_0x5d4055,_0x35e375=this[_0x23acef(0x1a5)]()[_0x23acef(0x220)];this[_0x23acef(0x196)]['bitmap']=ImageManager['getFogVignette'](_0x35e375),this[_0x23acef(0x245)]=this[_0x23acef(0x196)],this[_0x23acef(0x22f)](this['_maskSprite']);},Sprite_VisualFog[_0x5d4055(0x1ee)][_0x5d4055(0x16c)]=function(){const _0x537c93=_0x5d4055,_0x3fcdf8=this[_0x537c93(0x1a5)]()['maskRegions'],_0xd06521=this[_0x537c93(0x1a5)]()[_0x537c93(0x1e8)];if(_0x3fcdf8[_0x537c93(0x247)]<=0x0&&_0xd06521['length']<=0x0)return;if($gameMap[_0x537c93(0x223)]()||$gameMap[_0x537c93(0x174)]())return;const _0x3aa515=$gameMap[_0x537c93(0x1f0)](),_0x22276d=$gameMap[_0x537c93(0x1c3)](),_0x287b11=$gameMap[_0x537c93(0x24e)](),_0x1c0f0f=$gameMap[_0x537c93(0x240)](),_0x3c652a=this[_0x537c93(0x1a5)]()['maskSpill'],_0x1acc47=_0x287b11+_0x3c652a*0x2,_0x150e47=_0x1c0f0f+_0x3c652a*0x2;this[_0x537c93(0x196)]['bitmap']=new Bitmap(_0x3aa515*_0x287b11,_0x22276d*_0x1c0f0f);for(let _0x5bf086=0x0;_0x5bf086<_0x3aa515;_0x5bf086++){for(let _0x496f3c=0x0;_0x496f3c<_0x22276d;_0x496f3c++){if('KdKoh'===_0x537c93(0x186))return this[_0x537c93(0x214)][_0x537c93(0x195)]['find'](_0x2401a3=>_0x2401a3[_0x537c93(0x1da)]===_0x280cdc);else{if(_0x3fcdf8[_0x537c93(0x1c0)]($gameMap[_0x537c93(0x25c)](_0x5bf086,_0x496f3c))||_0xd06521[_0x537c93(0x1c0)]($gameMap['terrainTag'](_0x5bf086,_0x496f3c))){if(_0x537c93(0x1bb)==='RNoUZ')return this['_scene']&&this['_scene']instanceof _0x42e00d;else this[_0x537c93(0x196)]['bitmap'][_0x537c93(0x1b8)](_0x5bf086*_0x287b11-_0x3c652a,_0x496f3c*_0x1c0f0f-_0x3c652a,_0x1acc47,_0x150e47,_0x537c93(0x1d4));}}}}this[_0x537c93(0x244)]=[];if(!!PIXI[_0x537c93(0x244)]['BlurFilter']&&!this['_blurFilter']){if(_0x537c93(0x25a)===_0x537c93(0x25a))this[_0x537c93(0x192)]=new PIXI[(_0x537c93(0x244))][(_0x537c93(0x161))](clamp=!![]);else{_0x4a8cc3['_fogLoopX']&&(_0x320e35[_0x537c93(0x18c)]+=_0x35ca63[_0x537c93(0x1b1)]/this[_0x537c93(0x24e)]()/0x2);_0xd4a2e9['_fogLoopY']&&(_0x2c9f54[_0x537c93(0x1c9)]+=_0x5aa909[_0x537c93(0x1be)]/this['tileHeight']()/0x2);_0x33a635[_0x537c93(0x1e3)]+=_0x4354e4['hueShift'];if(_0x3835e3[_0x537c93(0x1f2)]>0x0){const _0xcc1467=_0x30dd03['opacityDuration'];_0x38d23b[_0x537c93(0x225)]=(_0x3c18f0[_0x537c93(0x225)]*(_0xcc1467-0x1)+_0x227dc0[_0x537c93(0x189)])/_0xcc1467,_0x304a85[_0x537c93(0x1f2)]--;}}}if(this['_blurFilter']){const _0x62a4d6=this[_0x537c93(0x1a5)]()[_0x537c93(0x23d)];this['_blurFilter'][_0x537c93(0x19e)]=_0x62a4d6||0.01,this[_0x537c93(0x244)]=[this[_0x537c93(0x192)]];}this[_0x537c93(0x245)]=this[_0x537c93(0x196)],this[_0x537c93(0x22f)](this[_0x537c93(0x196)]);},Sprite_VisualFog[_0x5d4055(0x1ee)][_0x5d4055(0x21f)]=function(_0x520186,_0x2fcf46){},Sprite_VisualFog[_0x5d4055(0x1ee)][_0x5d4055(0x249)]=function(){const _0x2de5d1=_0x5d4055;TilingSprite[_0x2de5d1(0x1ee)][_0x2de5d1(0x249)][_0x2de5d1(0x1ed)](this);if(!this[_0x2de5d1(0x1c4)])return;this['updateOpacity'](),this['updateOrigin'](),this[_0x2de5d1(0x16d)](),this['updateHue'](),this['updateTone'](),this[_0x2de5d1(0x219)]();},Sprite_VisualFog[_0x5d4055(0x1ee)]['updateOpacity']=function(){const _0x443041=_0x5d4055;this[_0x443041(0x225)]=this[_0x443041(0x1a5)]()[_0x443041(0x225)];},Sprite_VisualFog['prototype'][_0x5d4055(0x188)]=function(){const _0x273503=_0x5d4055;this[_0x273503(0x198)]['x']=$gameMap[_0x273503(0x172)](this[_0x273503(0x1da)]),this[_0x273503(0x198)]['y']=$gameMap[_0x273503(0x16e)](this[_0x273503(0x1da)]);},Sprite_VisualFog[_0x5d4055(0x1ee)][_0x5d4055(0x16d)]=function(){const _0x25d473=_0x5d4055;this[_0x25d473(0x16a)]=this['settings']()[_0x25d473(0x16a)];},Sprite_VisualFog[_0x5d4055(0x1ee)][_0x5d4055(0x22c)]=function(){const _0xbe7c65=_0x5d4055;this[_0xbe7c65(0x1a4)](this[_0xbe7c65(0x1a5)]()[_0xbe7c65(0x1e3)]);},Sprite_VisualFog[_0x5d4055(0x1ee)]['setHue']=function(_0x2a2e99){const _0x415232=_0x5d4055;if(this[_0x415232(0x1c5)]!==Number(_0x2a2e99)){if(_0x415232(0x184)!==_0x415232(0x184)){const _0x28dec2=_0x227404(_0x54f427['$1']);_0x28dec2<_0x2f6b0d?(_0x239cee('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x5f2ca0,_0x28dec2,_0x5cacb1)),_0x2894c9['exit']()):_0x25d7ed=_0x45e6bf[_0x415232(0x248)](_0x28dec2,_0x185a66);}else this['_hue']=Number(_0x2a2e99),this[_0x415232(0x19a)]();}},Sprite_VisualFog[_0x5d4055(0x1ee)]['updateTone']=function(){const _0x270b92=_0x5d4055;this[_0x270b92(0x1aa)](this['settings']()[_0x270b92(0x163)]);},Sprite_VisualFog[_0x5d4055(0x1ee)][_0x5d4055(0x1aa)]=function(_0x2b8e98){const _0x560bc3=_0x5d4055;if(!(_0x2b8e98 instanceof Array))throw new Error(_0x560bc3(0x18b));if(!this['_colorTone']['equals'](_0x2b8e98)){if(_0x560bc3(0x191)!==_0x560bc3(0x191)){if(!_0x10d556)return this[_0x560bc3(0x1fe)]();this[_0x560bc3(0x1a2)]=this[_0x560bc3(0x1a2)]||{},_0x4d75ef=_0x52eb8c[_0x560bc3(0x1e7)]()[_0x560bc3(0x25d)]();const _0x1d61da=_0x560bc3(0x200)['format'](_0x597722);if(this['_fogVignettes'][_0x157879])return this[_0x560bc3(0x1a2)][_0x56532b];else return this[_0x1d61da]?this[_0x1d61da]():this[_0x560bc3(0x1fe)]();}else this[_0x560bc3(0x185)]=_0x2b8e98[_0x560bc3(0x1b4)](),this[_0x560bc3(0x19a)]();}},Sprite_VisualFog['prototype'][_0x5d4055(0x219)]=function(){const _0x3c0a43=_0x5d4055;if(!this['mask'])return;this[_0x3c0a43(0x1a5)]()[_0x3c0a43(0x220)]!==_0x3c0a43(0x241)?(this['_maskSprite']['x']=0x0,this[_0x3c0a43(0x196)]['y']=0x0):(this['_maskSprite']['x']=Math[_0x3c0a43(0x19f)](-$gameMap[_0x3c0a43(0x164)]()*$gameMap['tileWidth']()),this[_0x3c0a43(0x196)]['y']=Math[_0x3c0a43(0x19f)](-$gameMap[_0x3c0a43(0x1ea)]()*$gameMap[_0x3c0a43(0x240)]()));},VisuMZ[_0x5d4055(0x1a0)][_0x5d4055(0x1a1)]=Spriteset_Map['prototype'][_0x5d4055(0x168)],Spriteset_Map[_0x5d4055(0x1ee)][_0x5d4055(0x168)]=function(){const _0x280fa5=_0x5d4055;this['createFogContainer'](),this[_0x280fa5(0x1f3)](),this[_0x280fa5(0x15e)](),VisuMZ[_0x280fa5(0x1a0)][_0x280fa5(0x1a1)][_0x280fa5(0x1ed)](this);},Spriteset_Map['prototype']['createFogContainer']=function(){const _0x5d8eb2=_0x5d4055;this['_fogContainer']=new Sprite(),this[_0x5d8eb2(0x1b2)][_0x5d8eb2(0x22f)](this[_0x5d8eb2(0x214)]),this[_0x5d8eb2(0x182)]=[null];},Spriteset_Map[_0x5d4055(0x1ee)]['createFogLayers']=function(){const _0x3f3d34=_0x5d4055,_0x17e596=$gameMap[_0x3f3d34(0x1ba)]();for(const _0x15e4ea of _0x17e596){if(!_0x15e4ea)continue;this[_0x3f3d34(0x1d9)](_0x15e4ea);}},Spriteset_Map[_0x5d4055(0x1ee)]['createNewFogLayer']=function(_0x4cb441){const _0x260684=_0x5d4055;if(!_0x4cb441)return;const _0xb1b366=new Sprite_VisualFog(_0x4cb441['id']);_0xb1b366[_0x260684(0x230)](0x0,0x0,Graphics[_0x260684(0x1f0)],Graphics[_0x260684(0x1c3)]),this[_0x260684(0x214)]['addChild'](_0xb1b366);},Spriteset_Map[_0x5d4055(0x1ee)][_0x5d4055(0x15e)]=function(){const _0x3cde0f=_0x5d4055;this['_fogContainer']['children'][_0x3cde0f(0x1c6)]((_0x36a72f,_0x5a53cb)=>_0x36a72f[_0x3cde0f(0x1da)]-_0x5a53cb[_0x3cde0f(0x1da)]);},Spriteset_Map['prototype']['findTargetVisualFog']=function(_0x37830b){const _0x2e47dd=_0x5d4055;return this['_fogContainer'][_0x2e47dd(0x195)]['find'](_0x1fba33=>_0x1fba33['_id']===_0x37830b);},Spriteset_Map['prototype']['removeVisualFogLayer']=function(_0x2b0088){const _0x4bc153=_0x5d4055,_0x5c97ef=this[_0x4bc153(0x194)](_0x2b0088);_0x5c97ef&&this[_0x4bc153(0x214)][_0x4bc153(0x1cf)](_0x5c97ef);},Spriteset_Map['prototype'][_0x5d4055(0x1db)]=function(_0x4a693c,_0x482d4c){const _0x12b55b=_0x5d4055,_0x487e1e=this[_0x12b55b(0x194)](_0x4a693c);if(!_0x487e1e)_0x12b55b(0x197)!==_0x12b55b(0x1b6)?(this[_0x12b55b(0x1d9)]($gameMap[_0x12b55b(0x17b)](_0x4a693c)),this[_0x12b55b(0x15e)]()):(this[_0x12b55b(0x196)]=new _0x5f3b7b(),this[_0x12b55b(0x1fc)]());else{if(_0x12b55b(0x1b5)!==_0x12b55b(0x1b5)){this[_0x12b55b(0x1e5)]=this[_0x12b55b(0x1e5)]||[];if(!this[_0x12b55b(0x1e5)][_0x14a0ae])return;this[_0x12b55b(0x1e5)][_0x5b3387]=null;const _0x35ee0d=_0x4df84f[_0x12b55b(0x20c)][_0x12b55b(0x21d)];_0x35ee0d&&_0x35ee0d[_0x12b55b(0x170)](_0x568da7);}else _0x487e1e[_0x12b55b(0x1a9)](),_0x482d4c&&_0x487e1e['bitmap']['addLoadListener'](_0x487e1e[_0x12b55b(0x1fc)][_0x12b55b(0x217)](_0x487e1e));}};