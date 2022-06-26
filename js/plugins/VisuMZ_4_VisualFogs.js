//=============================================================================
// VisuStella MZ - Visual Fogs
// VisuMZ_4_VisualFogs.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualFogs = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualFogs = VisuMZ.VisualFogs || {};
VisuMZ.VisualFogs.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.04] [VisualFogs]
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

const _0x5eae=['filters','setHue','wrWbA','empty','yAHJs','filter','jkBUy','parameters','kuPle','1410795eXQfiZ','split','getFogVignette','_fogDataRef','equals','bWAwE','createMaskTileBitmap','name','getFogVignette_right','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Game_Map_updateParallax','charAt','_maskSprite','SlifT','VisualFogs','addLoadListener','blendMode','_fogVignettes','isInstanceOfSceneMap','_fogSy','Game_Map_scrollRight','NORMAL','hue','7507fPnKLl','_updateColorFilter','ARRAYSTR','mTgzf','RegExp','removeVisualFog','scrollRight','screenTileY','parse','scrollUp','_colorFilter','lower','width','QrBtf','Start','max','hINVL','loadCustomVignette','ConvertParams','Rjnod','cFDQT','terrainTag','drawMaskTile','_fogSx','updateVisualFogSettings','_displayX','loadParallax','getFogVignette_vertical','BlurFilter','bind','ARRAYSTRUCT','_customModified','Cgtnu','>>>ATTENTION<<<','updateVisualFogLayer','Game_Map_scrollDown','Tone','NUM','Optional','horizontal','#ffffff','1782249pFGyJA','AUynb','gradientFillRect','vignetteFilename','indexOf','TRkNz','bitmap','setup','CEUZJ','height','createMaskBitmap','_blurFilter','HueShift','getFogVignette_border','EVAL','hueShift','settings','getFogVignette_horizontal','TemplateSettings','FogRemove','maskTerrainTags','229563escyIU','floor','mask','opacityDuration','clamp','_visualFogSettings','_id','getVisualFogOy','maskSpill','35977xYbktI','trim','Settings','liemy','NDtLl','getFogVignette_empty','XlIww','PremadeVignette','slUCP','updateMask','isLoopHorizontal','ceil','create','opacity','setupVisualFogs','createWeather','964952ZOBENb','tileHeight','_fogLoopX','registerCommand','bIMNV','sqDAX','return\x200','updateHue','iWVTX','Filename','getVisualFogOx','ZBWzB','vignette','find','wVwCn','CustomVignette','Game_Map_setDisplayPos','constructor','toLowerCase','exit','_hue','kQcgs','addChild','DBdNg','origin','tileWidth','description','updateBlendMode','right','regionId','CreateLayerData','makeDeepCopy','left','STRUCT','push','colorTone','_createColorFilter','removeChild','GGFsU','ZMBzL','_fogName','Game_Map_setup','DopAj','DyPNV','children','FqRkc','MaskBlur','fKWEP','DEFAULT_FOG_TILE_SPILL','call','isLoopVertical','getFogVignette_%1','createFogContainer','getFogVignette_left','custom','maskRegions','ARRAYEVAL','MaskSpill','clone','FogFadeOpacity','setColorTone','screenTileX','updateParallax','prototype','createNewFogLayer','SOOdY','loadBitmap','vertical','initialize','includes','205lYShtP','toUpperCase','OpacityFlat','_fogContainer','createFogLayers','BlendMode','sortVisualFogs','_displayY','filename','_spriteset','length','loadTemplateVignette','update','removeVisualFogLayer','isSceneMap','Spriteset_Map_createWeather','_fogY','_scene','DEFAULT_FOG_BLEND_MODE','fbmdh','fRnVR','pyTLJ','DEFAULT_FOG_OPACITY','45tSxAlP','QEtHO','_fogLoopY','Game_Map_scrollUp','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','getFogVignette_upper','updateTone','findTargetVisualFog','version','uCCpa','DEFAULT_FOG_TILE_BLUR','note','format','ScrollLock','ARRAYNUM','sGAQg','zIuSo','pRNlK','blur','scrollDown','addChangeVisualFog','displayY','MaskRegions','ARRAYJSON','map','none','End','createMaskSprite','Game_Map_scrollLeft','FNHfc','Hue','sort','rgba(0,\x200,\x200,\x200)','RPDzx','fillRect','STR','IngXM','12153bGlWcu','_fogX','targetOpacity','round','match','dFDxK','rGjNX','FogAddChangeSettings','getVisualFogSettings','vFCKm','_colorTone','list','SCREEN','move','_fogZero','OpacityRate','getVisualFogs','FogOpacity','getFogVignette_lower','39vXZBEg','maskBlur','scrollLeft'];const _0x21efc6=_0x5b9d;(function(_0x1682bc,_0x21936e){const _0x13daa4=_0x5b9d;while(!![]){try{const _0x41e702=-parseInt(_0x13daa4(0x116))*parseInt(_0x13daa4(0xf1))+parseInt(_0x13daa4(0x94))+parseInt(_0x13daa4(0xda))*-parseInt(_0x13daa4(0x14c))+parseInt(_0x13daa4(0x7b))+parseInt(_0x13daa4(0x84))*parseInt(_0x13daa4(0x129))+-parseInt(_0x13daa4(0x135))+parseInt(_0x13daa4(0x175));if(_0x41e702===_0x21936e)break;else _0x1682bc['push'](_0x1682bc['shift']());}catch(_0x5812e1){_0x1682bc['push'](_0x1682bc['shift']());}}}(_0x5eae,0xd7a34));function _0x5b9d(_0x387b4,_0x531c46){return _0x5b9d=function(_0x5eaecd,_0x5b9d84){_0x5eaecd=_0x5eaecd-0x6d;let _0x3b9f43=_0x5eae[_0x5eaecd];return _0x3b9f43;},_0x5b9d(_0x387b4,_0x531c46);}var label='VisualFogs',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x21efc6(0x131)](function(_0xd08800){const _0x390180=_0x21efc6;return _0xd08800['status']&&_0xd08800[_0x390180(0xae)][_0x390180(0xd9)]('['+label+']');})[0x0];VisuMZ[label][_0x21efc6(0x86)]=VisuMZ[label][_0x21efc6(0x86)]||{},VisuMZ['ConvertParams']=function(_0x5a336f,_0x548820){const _0x209bcf=_0x21efc6;for(const _0x343e0a in _0x548820){if(_0x343e0a['match'](/(.*):(.*)/i)){const _0x4c1c6a=String(RegExp['$1']),_0x16df59=String(RegExp['$2'])[_0x209bcf(0xdb)]()[_0x209bcf(0x85)]();let _0x23060b,_0x5ce912,_0x504bd5;switch(_0x16df59){case _0x209bcf(0x171):_0x23060b=_0x548820[_0x343e0a]!==''?Number(_0x548820[_0x343e0a]):0x0;break;case _0x209bcf(0xff):_0x5ce912=_0x548820[_0x343e0a]!==''?JSON[_0x209bcf(0x154)](_0x548820[_0x343e0a]):[],_0x23060b=_0x5ce912[_0x209bcf(0x109)](_0x391557=>Number(_0x391557));break;case _0x209bcf(0x74):_0x23060b=_0x548820[_0x343e0a]!==''?eval(_0x548820[_0x343e0a]):null;break;case _0x209bcf(0xcc):_0x5ce912=_0x548820[_0x343e0a]!==''?JSON[_0x209bcf(0x154)](_0x548820[_0x343e0a]):[],_0x23060b=_0x5ce912['map'](_0x852fdc=>eval(_0x852fdc));break;case'JSON':_0x23060b=_0x548820[_0x343e0a]!==''?JSON[_0x209bcf(0x154)](_0x548820[_0x343e0a]):'';break;case _0x209bcf(0x108):_0x5ce912=_0x548820[_0x343e0a]!==''?JSON['parse'](_0x548820[_0x343e0a]):[],_0x23060b=_0x5ce912[_0x209bcf(0x109)](_0x26bd0a=>JSON['parse'](_0x26bd0a));break;case'FUNC':_0x23060b=_0x548820[_0x343e0a]!==''?new Function(JSON[_0x209bcf(0x154)](_0x548820[_0x343e0a])):new Function(_0x209bcf(0x9a));break;case'ARRAYFUNC':_0x5ce912=_0x548820[_0x343e0a]!==''?JSON[_0x209bcf(0x154)](_0x548820[_0x343e0a]):[],_0x23060b=_0x5ce912[_0x209bcf(0x109)](_0x30f1bc=>new Function(JSON[_0x209bcf(0x154)](_0x30f1bc)));break;case _0x209bcf(0x114):_0x23060b=_0x548820[_0x343e0a]!==''?String(_0x548820[_0x343e0a]):'';break;case _0x209bcf(0x14e):_0x5ce912=_0x548820[_0x343e0a]!==''?JSON[_0x209bcf(0x154)](_0x548820[_0x343e0a]):[],_0x23060b=_0x5ce912[_0x209bcf(0x109)](_0x2570ab=>String(_0x2570ab));break;case _0x209bcf(0xb5):_0x504bd5=_0x548820[_0x343e0a]!==''?JSON['parse'](_0x548820[_0x343e0a]):{},_0x23060b=VisuMZ['ConvertParams']({},_0x504bd5);break;case _0x209bcf(0x16a):_0x5ce912=_0x548820[_0x343e0a]!==''?JSON[_0x209bcf(0x154)](_0x548820[_0x343e0a]):[],_0x23060b=_0x5ce912['map'](_0x410116=>VisuMZ[_0x209bcf(0x15e)]({},JSON[_0x209bcf(0x154)](_0x410116)));break;default:continue;}_0x5a336f[_0x4c1c6a]=_0x23060b;}}return _0x5a336f;},(_0x2428f1=>{const _0x45f3a7=_0x21efc6,_0x2a97c3=_0x2428f1[_0x45f3a7(0x13c)];for(const _0x168c5b of dependencies){if(!Imported[_0x168c5b]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x2a97c3,_0x168c5b)),SceneManager[_0x45f3a7(0xa7)]();break;}}const _0x386863=_0x2428f1[_0x45f3a7(0xae)];if(_0x386863['match'](/\[Version[ ](.*?)\]/i)){const _0x2441b2=Number(RegExp['$1']);_0x2441b2!==VisuMZ[label][_0x45f3a7(0xf9)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x45f3a7(0xfd)](_0x2a97c3,_0x2441b2)),SceneManager[_0x45f3a7(0xa7)]());}if(_0x386863[_0x45f3a7(0x11a)](/\[Tier[ ](\d+)\]/i)){if(_0x45f3a7(0x17a)!==_0x45f3a7(0x8c)){const _0x6824f=Number(RegExp['$1']);_0x6824f<tier?(alert(_0x45f3a7(0xf5)[_0x45f3a7(0xfd)](_0x2a97c3,_0x6824f,tier)),SceneManager[_0x45f3a7(0xa7)]()):tier=Math[_0x45f3a7(0x15b)](_0x6824f,tier);}else{if(!_0x3f0ab9)return this['getFogVignette_empty']();this[_0x45f3a7(0x146)]=this[_0x45f3a7(0x146)]||{},_0xf0c378=_0x26d4e3['toLowerCase']()[_0x45f3a7(0x85)]();const _0x2a9c5d=_0x45f3a7(0xc7)[_0x45f3a7(0xfd)](_0x2b4556);if(this[_0x45f3a7(0x146)][_0x101da4])return this['_fogVignettes'][_0x1b4db6];else return this[_0x2a9c5d]?this[_0x2a9c5d]():this['getFogVignette_empty']();}}VisuMZ[_0x45f3a7(0x15e)](VisuMZ[label][_0x45f3a7(0x86)],_0x2428f1[_0x45f3a7(0x133)]);})(pluginData),VisuMZ[_0x21efc6(0x143)]['TemplateSettings']=function(){const _0x29280c=_0x21efc6;return{'id':0x0,'filename':'','_fogZero':![],'_fogLoopX':![],'_fogLoopY':![],'_fogSx':0x0,'_fogSy':0x0,'_fogX':0x0,'_fogY':0x0,'opacity':Game_Map[_0x29280c(0xf0)],'targetOpacity':Game_Map[_0x29280c(0xf0)],'opacityDuration':0x0,'blendMode':Game_Map[_0x29280c(0xec)],'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[],'maskBlur':Game_Map['DEFAULT_FOG_TILE_BLUR'],'maskSpill':Game_Map['DEFAULT_FOG_TILE_SPILL'],'vignette':_0x29280c(0x10a),'vignetteFilename':''};},PluginManager[_0x21efc6(0x97)](pluginData['name'],_0x21efc6(0x11d),_0xb1d94=>{const _0x172b03=_0x21efc6;VisuMZ[_0x172b03(0x15e)](_0xb1d94,_0xb1d94);if(_0xb1d94['id']<=0x0)return;if(_0xb1d94[_0x172b03(0xe2)]===''||_0xb1d94[_0x172b03(0xe2)]===_0x172b03(0x16d))return;let _0x127d0a=JsonEx[_0x172b03(0xb3)](_0xb1d94[_0x172b03(0x172)]);if(!_0x127d0a['hasOwnProperty'](_0x172b03(0xcb)))_0x127d0a=VisuMZ[_0x172b03(0x143)]['TemplateSettings']();_0x127d0a[_0x172b03(0xe2)]=_0xb1d94[_0x172b03(0xe2)],_0x127d0a['id']=_0xb1d94['id'];while(_0x127d0a[_0x172b03(0xb7)]['length']<0x4){_0x127d0a[_0x172b03(0xb7)][_0x172b03(0xb6)](0x0);}_0x127d0a[_0x172b03(0x117)]=0x0,_0x127d0a[_0x172b03(0xea)]=0x0,_0x127d0a[_0x172b03(0x118)]=_0xb1d94['opacity'],_0x127d0a['opacityDuration']=0x0,_0x127d0a[_0x172b03(0xa0)]=_0x127d0a[_0x172b03(0xa0)]||_0x172b03(0x10a),_0x127d0a[_0x172b03(0xa0)]=_0x127d0a['vignette'][_0x172b03(0xa6)]()[_0x172b03(0x85)]();if(_0x127d0a[_0x172b03(0x178)]!==''){if('GGFsU'===_0x172b03(0xba))_0x127d0a[_0x172b03(0xa0)]=_0x172b03(0xca);else{const _0x3b2b1c=new _0x452bd6(_0x1d66c2[_0x172b03(0x158)],_0x29fbab['height']),_0x4389d1='rgba(0,\x200,\x200,\x200)',_0x229023=_0x172b03(0x174);return _0x3b2b1c['gradientFillRect'](0x0,0x0,_0x10ee26[_0x172b03(0x8f)](_0x26eb96[_0x172b03(0x158)]/0x3),_0x82bc84[_0x172b03(0x6f)],_0x229023,_0x4389d1,![]),_0x3b2b1c[_0x172b03(0x177)](_0x307330[_0x172b03(0x8f)](_0x195192['width']*0x2/0x3),0x0,_0x11a8af[_0x172b03(0x8f)](_0x2bb9e9['width']/0x3),_0x432f7f[_0x172b03(0x6f)],_0x4389d1,_0x229023,![]),_0x3b2b1c['_customModified']=![],this['_fogVignettes']=this[_0x172b03(0x146)]||{},this[_0x172b03(0x146)]['vertical']=_0x3b2b1c,_0x3b2b1c;}}$gameMap[_0x172b03(0x105)](_0x127d0a);}),PluginManager[_0x21efc6(0x97)](pluginData[_0x21efc6(0x13c)],_0x21efc6(0xcf),_0x3b9f6d=>{const _0x3228fe=_0x21efc6;if(!SceneManager[_0x3228fe(0x147)]())return;VisuMZ[_0x3228fe(0x15e)](_0x3b9f6d,_0x3b9f6d);const _0x35e560=_0x3b9f6d[_0x3228fe(0x121)];for(const _0x6ff305 of _0x35e560){const _0x2bf546=$gameMap['getVisualFogSettings'](_0x6ff305);if(!_0x2bf546)continue;_0x2bf546[_0x3228fe(0x118)]=_0x3b9f6d[_0x3228fe(0x118)]||0x0,_0x2bf546['opacityDuration']=_0x3b9f6d[_0x3228fe(0x7e)]||0x0;if(_0x2bf546[_0x3228fe(0x7e)]<=0x0){if('wrWbA'===_0x3228fe(0x12e))_0x2bf546['opacity']=_0x2bf546['targetOpacity'];else{const _0x3a2ff8=new _0x262b36(_0x481ce2['width'],_0x929cac['height']),_0x268a77=_0x3228fe(0x111),_0x2a6c21=_0x3228fe(0x174);return _0x3a2ff8[_0x3228fe(0x177)](0x0,0x0,_0x87081b[_0x3228fe(0x8f)](_0x4053ae[_0x3228fe(0x158)]/0x3),_0xda40cd[_0x3228fe(0x6f)],_0x2a6c21,_0x268a77,![]),_0x3a2ff8[_0x3228fe(0x16b)]=![],this[_0x3228fe(0x146)]=this[_0x3228fe(0x146)]||{},this[_0x3228fe(0x146)][_0x3228fe(0xb4)]=_0x3a2ff8,_0x3a2ff8;}}}}),PluginManager[_0x21efc6(0x97)](pluginData['name'],_0x21efc6(0x79),_0x1a560c=>{const _0x557d10=_0x21efc6;if(!SceneManager[_0x557d10(0x147)]())return;VisuMZ[_0x557d10(0x15e)](_0x1a560c,_0x1a560c);const _0x3208f8=_0x1a560c[_0x557d10(0x121)];for(const _0x22171e of _0x3208f8){$gameMap[_0x557d10(0x151)](_0x22171e);}}),VisuMZ[_0x21efc6(0x143)][_0x21efc6(0x150)]={'Start':/<(?:FOG)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'End':/<\/(?:FOG)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'Filename':/(?:FILENAME|NAME):[ ](.*)/i,'HorzLoop':/(?:HORZ|HORIZONTAL) (?:LOOP|SCROLL):[ ](.*)/i,'VertLoop':/(?:VERT|VERTICAL) (?:LOOP|SCROLL):[ ](.*)/i,'ScrollLock':/<(?:MAP|SCROLL)[ ](?:LOCK|LOCKED)>/i,'OpacityRate':/(?:OPACITY):[ ](\d+)([%％])/i,'OpacityFlat':/(?:OPACITY):[ ](\d+)/i,'BlendMode':/BLEND MODE:[ ](.*)/i,'Hue':/HUE:[ ](\d+)/i,'HueShift':/HUE (?:SHIFT|SPEED):[ ](.*)/i,'Tone':/(?:COLOR TONE|TONE|TINT):[ ](.*)/i,'MaskRegions':/(?:REGION|REGIONS):[ ](.*)/i,'MaskTerrainTags':/TERRAIN (?:TAG|TAGS):[ ](.*)/i,'MaskBlur':/(?:TILE BLUR|BLUR):[ ](.*)/i,'MaskSpill':/(?:TILE SPILL|SPILL):[ ](.*)/i,'CustomVignette':/CUSTOM (?:VIGNETTE|OVERLAY):[ ](.*)/i,'PremadeVignette':/(?:VIGNETTE|OVERLAY):[ ](.*)/i},ImageManager['getFogVignette']=function(_0x6d1a44){const _0x247333=_0x21efc6;if(!_0x6d1a44)return this[_0x247333(0x89)]();this[_0x247333(0x146)]=this[_0x247333(0x146)]||{},_0x6d1a44=_0x6d1a44[_0x247333(0xa6)]()[_0x247333(0x85)]();const _0x27552c=_0x247333(0xc7)[_0x247333(0xfd)](_0x6d1a44);if(this['_fogVignettes'][_0x6d1a44]){if('UzEih'!==_0x247333(0xbf))return this[_0x247333(0x146)][_0x6d1a44];else _0x17c23b['updateVisualFogLayer'](_0x5c121c,_0x18e6f1);}else{if(this[_0x27552c]){if(_0x247333(0x15c)===_0x247333(0xbb))!this[_0x247333(0x156)]&&this[_0x247333(0xb8)](),this['_colorFilter'][_0x247333(0x12d)](this['_hue']),this[_0x247333(0x156)][_0x247333(0xd0)](this['_colorTone']);else return this[_0x27552c]();}else return this[_0x247333(0x89)]();}},ImageManager['getFogVignette_empty']=function(){const _0x2e7a38=_0x21efc6;if(this[_0x2e7a38(0x146)][_0x2e7a38(0x12f)])return this[_0x2e7a38(0x146)][_0x2e7a38(0x12f)];const _0x15255c=new Bitmap(Graphics[_0x2e7a38(0x158)],Graphics[_0x2e7a38(0x6f)]);return _0x15255c[_0x2e7a38(0x16b)]=![],this['_fogVignettes']=this['_fogVignettes']||{},this['_fogVignettes']['empty']=_0x15255c,_0x15255c;},ImageManager[_0x21efc6(0xf6)]=function(){const _0x1b198f=_0x21efc6,_0x1e3112=new Bitmap(Graphics[_0x1b198f(0x158)],Graphics[_0x1b198f(0x6f)]),_0x9f6bb1=_0x1b198f(0x111),_0x5b878=_0x1b198f(0x174);return _0x1e3112[_0x1b198f(0x177)](0x0,0x0,Graphics[_0x1b198f(0x158)],Math['ceil'](Graphics[_0x1b198f(0x6f)]/0x3),_0x5b878,_0x9f6bb1,!![]),_0x1e3112[_0x1b198f(0x16b)]=![],this[_0x1b198f(0x146)]=this['_fogVignettes']||{},this[_0x1b198f(0x146)]['upper']=_0x1e3112,_0x1e3112;},ImageManager[_0x21efc6(0x128)]=function(){const _0x59c35d=_0x21efc6,_0x37b4b4=new Bitmap(Graphics[_0x59c35d(0x158)],Graphics[_0x59c35d(0x6f)]),_0x2b7780=_0x59c35d(0x111),_0x550d46=_0x59c35d(0x174);return _0x37b4b4[_0x59c35d(0x177)](0x0,Math[_0x59c35d(0x8f)](Graphics[_0x59c35d(0x6f)]*0x2/0x3),Graphics[_0x59c35d(0x158)],Math[_0x59c35d(0x8f)](Graphics['height']/0x3),_0x2b7780,_0x550d46,!![]),_0x37b4b4[_0x59c35d(0x16b)]=![],this['_fogVignettes']=this['_fogVignettes']||{},this[_0x59c35d(0x146)][_0x59c35d(0x157)]=_0x37b4b4,_0x37b4b4;},ImageManager[_0x21efc6(0x77)]=function(){const _0x1f88dc=_0x21efc6,_0x1b8dc6=new Bitmap(Graphics[_0x1f88dc(0x158)],Graphics[_0x1f88dc(0x6f)]),_0x22a350=_0x1f88dc(0x111),_0x90583a=_0x1f88dc(0x174);return _0x1b8dc6[_0x1f88dc(0x177)](0x0,0x0,Graphics[_0x1f88dc(0x158)],Math[_0x1f88dc(0x8f)](Graphics['height']/0x3),_0x90583a,_0x22a350,!![]),_0x1b8dc6[_0x1f88dc(0x177)](0x0,Math[_0x1f88dc(0x8f)](Graphics[_0x1f88dc(0x6f)]*0x2/0x3),Graphics[_0x1f88dc(0x158)],Math[_0x1f88dc(0x8f)](Graphics[_0x1f88dc(0x6f)]/0x3),_0x22a350,_0x90583a,!![]),_0x1b8dc6[_0x1f88dc(0x16b)]=![],this[_0x1f88dc(0x146)]=this[_0x1f88dc(0x146)]||{},this[_0x1f88dc(0x146)][_0x1f88dc(0x173)]=_0x1b8dc6,_0x1b8dc6;},ImageManager[_0x21efc6(0xc9)]=function(){const _0x1a1bc0=_0x21efc6,_0x6be51e=new Bitmap(Graphics[_0x1a1bc0(0x158)],Graphics[_0x1a1bc0(0x6f)]),_0x1fb128=_0x1a1bc0(0x111),_0xd3376c=_0x1a1bc0(0x174);return _0x6be51e[_0x1a1bc0(0x177)](0x0,0x0,Math[_0x1a1bc0(0x8f)](Graphics['width']/0x3),Graphics[_0x1a1bc0(0x6f)],_0xd3376c,_0x1fb128,![]),_0x6be51e[_0x1a1bc0(0x16b)]=![],this['_fogVignettes']=this[_0x1a1bc0(0x146)]||{},this[_0x1a1bc0(0x146)][_0x1a1bc0(0xb4)]=_0x6be51e,_0x6be51e;},ImageManager[_0x21efc6(0x13d)]=function(){const _0xa11cc9=_0x21efc6,_0x520e13=new Bitmap(Graphics[_0xa11cc9(0x158)],Graphics[_0xa11cc9(0x6f)]),_0x65c45a=_0xa11cc9(0x111),_0x508f83=_0xa11cc9(0x174);return _0x520e13[_0xa11cc9(0x177)](Math[_0xa11cc9(0x8f)](Graphics[_0xa11cc9(0x158)]*0x2/0x3),0x0,Math['ceil'](Graphics[_0xa11cc9(0x158)]/0x3),Graphics['height'],_0x65c45a,_0x508f83,![]),_0x520e13[_0xa11cc9(0x16b)]=![],this[_0xa11cc9(0x146)]=this['_fogVignettes']||{},this[_0xa11cc9(0x146)][_0xa11cc9(0xb0)]=_0x520e13,_0x520e13;},ImageManager[_0x21efc6(0x167)]=function(){const _0x333cda=_0x21efc6,_0x251345=new Bitmap(Graphics[_0x333cda(0x158)],Graphics[_0x333cda(0x6f)]),_0x10fcb1=_0x333cda(0x111),_0xf5e70f='#ffffff';return _0x251345[_0x333cda(0x177)](0x0,0x0,Math[_0x333cda(0x8f)](Graphics[_0x333cda(0x158)]/0x3),Graphics['height'],_0xf5e70f,_0x10fcb1,![]),_0x251345[_0x333cda(0x177)](Math['ceil'](Graphics['width']*0x2/0x3),0x0,Math[_0x333cda(0x8f)](Graphics['width']/0x3),Graphics[_0x333cda(0x6f)],_0x10fcb1,_0xf5e70f,![]),_0x251345[_0x333cda(0x16b)]=![],this[_0x333cda(0x146)]=this[_0x333cda(0x146)]||{},this[_0x333cda(0x146)][_0x333cda(0xd7)]=_0x251345,_0x251345;},ImageManager[_0x21efc6(0x73)]=function(){const _0x4f7105=_0x21efc6,_0x128208=new Bitmap(Graphics[_0x4f7105(0x158)],Graphics[_0x4f7105(0x6f)]),_0x32f00a=_0x4f7105(0x111),_0x5295ee=_0x4f7105(0x174);return _0x128208[_0x4f7105(0x177)](0x0,0x0,Graphics[_0x4f7105(0x158)],Math[_0x4f7105(0x8f)](Graphics['height']/0x3),_0x5295ee,_0x32f00a,!![]),_0x128208[_0x4f7105(0x177)](0x0,Math[_0x4f7105(0x8f)](Graphics['height']*0x2/0x3),Graphics[_0x4f7105(0x158)],Math[_0x4f7105(0x8f)](Graphics['height']/0x3),_0x32f00a,_0x5295ee,!![]),_0x128208[_0x4f7105(0x177)](0x0,0x0,Math['ceil'](Graphics[_0x4f7105(0x158)]/0x3),Graphics[_0x4f7105(0x6f)],_0x5295ee,_0x32f00a,![]),_0x128208['gradientFillRect'](Math[_0x4f7105(0x8f)](Graphics[_0x4f7105(0x158)]*0x2/0x3),0x0,Math[_0x4f7105(0x8f)](Graphics['width']/0x3),Graphics[_0x4f7105(0x6f)],_0x32f00a,_0x5295ee,![]),_0x128208[_0x4f7105(0x16b)]=![],this[_0x4f7105(0x146)]=this[_0x4f7105(0x146)]||{},this[_0x4f7105(0x146)]['border']=_0x128208,_0x128208;},SceneManager[_0x21efc6(0xe8)]=function(){const _0x1fb6af=_0x21efc6;return this[_0x1fb6af(0xeb)]&&this[_0x1fb6af(0xeb)][_0x1fb6af(0xa5)]===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){const _0x2dcf34=_0x21efc6;return this[_0x2dcf34(0xeb)]&&this[_0x2dcf34(0xeb)]instanceof Scene_Map;},VisuMZ['VisualFogs']['Game_Map_setup']=Game_Map[_0x21efc6(0xd3)][_0x21efc6(0x6d)],Game_Map[_0x21efc6(0xd3)][_0x21efc6(0x6d)]=function(_0x28533b){const _0x3434dc=_0x21efc6;VisuMZ['VisualFogs'][_0x3434dc(0xbd)][_0x3434dc(0xc5)](this,_0x28533b),this[_0x3434dc(0x92)]();},Game_Map['DEFAULT_FOG_OPACITY']=VisuMZ[_0x21efc6(0x143)][_0x21efc6(0x86)][_0x21efc6(0x127)],Game_Map[_0x21efc6(0xec)]=VisuMZ[_0x21efc6(0x143)][_0x21efc6(0x86)][_0x21efc6(0xdf)],Game_Map[_0x21efc6(0xfb)]=VisuMZ['VisualFogs'][_0x21efc6(0x86)][_0x21efc6(0xc2)],Game_Map['DEFAULT_FOG_TILE_SPILL']=VisuMZ[_0x21efc6(0x143)][_0x21efc6(0x86)][_0x21efc6(0xcd)],Game_Map[_0x21efc6(0xd3)][_0x21efc6(0x92)]=function(){const _0x169676=_0x21efc6;this[_0x169676(0x80)]=[null];if(!$dataMap)return;const _0x38c0ff=VisuMZ[_0x169676(0x143)][_0x169676(0xb2)]();for(const _0x3704e3 of _0x38c0ff){if(!_0x3704e3)continue;this[_0x169676(0x80)][_0x3704e3['id']]=_0x3704e3;}},VisuMZ['VisualFogs'][_0x21efc6(0xb2)]=function(){const _0x515224=_0x21efc6;if(!$dataMap)return[];const _0x3fc483=[],_0x2b1370=VisuMZ[_0x515224(0x143)][_0x515224(0x78)]();if(!$dataMap['note'])return[];const _0x906c9a=VisuMZ['VisualFogs'][_0x515224(0x150)],_0x369d70=$dataMap[_0x515224(0xfc)][_0x515224(0x136)](/[\r\n]+/);let _0x2dbeb7=JsonEx[_0x515224(0xb3)](_0x2b1370);for(const _0x1db89b of _0x369d70){if(_0x515224(0x87)!==_0x515224(0x87)){const _0x595e84=this['_visualFogSettings'][_0xc4b836];if(!_0x595e84[_0x515224(0xcb)][_0x515224(0x139)](_0x301dee[_0x515224(0xcb)]))_0x55624e=!![];else{if(!_0x595e84['maskTerrainTags']['equals'](_0x291643[_0x515224(0x7a)]))_0x3e34e8=!![];else _0x595e84[_0x515224(0xa0)]!=='none'&&(_0x237299=!![]);}}else{if(_0x1db89b['match'](_0x906c9a[_0x515224(0x15a)])){if(_0x515224(0x88)===_0x515224(0x132)){const _0x3a0ff9=_0x77163d(_0x6b224['$1'])*0.01;_0x551f70[_0x515224(0x91)]=_0x4ef722[_0x515224(0x119)](_0x3a0ff9*0xff)[_0x515224(0x7f)](0x0,0xff);}else _0x2dbeb7['id']=Number(RegExp['$1']);}else{if(_0x1db89b[_0x515224(0x11a)](_0x906c9a[_0x515224(0x10b)])){const _0x5eee91=Number(RegExp['$1']);if(_0x5eee91>0x0&&_0x5eee91===_0x2dbeb7['id']&&_0x2dbeb7[_0x515224(0xe2)]!=='')_0x3fc483['push'](_0x2dbeb7);_0x2dbeb7=JsonEx['makeDeepCopy'](_0x2b1370);}else{if(_0x2dbeb7['id']<=0x0)continue;}}if(_0x1db89b[_0x515224(0x11a)](_0x906c9a[_0x515224(0x9d)]))_0x2dbeb7[_0x515224(0xe2)]=String(RegExp['$1'])[_0x515224(0x85)](),_0x2dbeb7[_0x515224(0xe2)][_0x515224(0x140)](0x0)==='!'&&(_0x2dbeb7['_fogZero']=!![]);else{if(_0x1db89b[_0x515224(0x11a)](_0x906c9a['HorzLoop']))_0x2dbeb7['_fogLoopX']=!![],_0x2dbeb7['_fogSx']=Number(RegExp['$1'])||0x0;else{if(_0x1db89b[_0x515224(0x11a)](_0x906c9a['VertLoop']))_0x2dbeb7[_0x515224(0xf3)]=!![],_0x2dbeb7[_0x515224(0x148)]=Number(RegExp['$1'])||0x0;else{if(_0x1db89b[_0x515224(0x11a)](_0x906c9a[_0x515224(0xfe)]))_0x2dbeb7['_fogZero']=!![];else{if(_0x1db89b[_0x515224(0x11a)](_0x906c9a[_0x515224(0x125)])){const _0x12144f=Number(RegExp['$1'])*0.01;_0x2dbeb7['opacity']=Math[_0x515224(0x119)](_0x12144f*0xff)[_0x515224(0x7f)](0x0,0xff);}else{if(_0x1db89b['match'](_0x906c9a[_0x515224(0xdc)])){if(_0x515224(0x15f)!==_0x515224(0x8a))_0x2dbeb7['opacity']=Number(RegExp['$1'])[_0x515224(0x7f)](0x0,0xff);else return{'id':0x0,'filename':'','_fogZero':![],'_fogLoopX':![],'_fogLoopY':![],'_fogSx':0x0,'_fogSy':0x0,'_fogX':0x0,'_fogY':0x0,'opacity':_0x69e6c8[_0x515224(0xf0)],'targetOpacity':_0x1d3cdf[_0x515224(0xf0)],'opacityDuration':0x0,'blendMode':_0x263e0a['DEFAULT_FOG_BLEND_MODE'],'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[],'maskBlur':_0xfb85e5['DEFAULT_FOG_TILE_BLUR'],'maskSpill':_0x5ad322[_0x515224(0xc4)],'vignette':_0x515224(0x10a),'vignetteFilename':''};}else{if(_0x1db89b[_0x515224(0x11a)](_0x906c9a[_0x515224(0xdf)])){if(_0x515224(0x98)===_0x515224(0x112))this['createMaskTileBitmap']();else{const _0x34606e=String(RegExp['$1'])['toUpperCase']()[_0x515224(0x85)](),_0x190be7=[_0x515224(0x14a),'ADDITIVE','MULTIPLY',_0x515224(0x122)];_0x2dbeb7['blendMode']=_0x190be7[_0x515224(0x179)](_0x34606e)[_0x515224(0x7f)](0x0,0x3);}}else{if(_0x1db89b['match'](_0x906c9a[_0x515224(0x10f)])){if(_0x515224(0x102)!==_0x515224(0xed))_0x2dbeb7[_0x515224(0x14b)]=Number(RegExp['$1'])[_0x515224(0x7f)](0x0,0x168);else{const _0x39c04d=this['findTargetVisualFog'](_0xadeed8);_0x39c04d&&this[_0x515224(0xdd)][_0x515224(0xb9)](_0x39c04d);}}else{if(_0x1db89b['match'](_0x906c9a[_0x515224(0x72)])){if(_0x515224(0xef)!=='mvpeU')_0x2dbeb7[_0x515224(0x75)]=Number(RegExp['$1'])||0x0;else return _0x212ae6[_0x515224(0x11e)](this[_0x515224(0x81)]);}else{if(_0x1db89b[_0x515224(0x11a)](_0x906c9a[_0x515224(0x170)])){const _0x49aecd=String(RegExp['$1'])[_0x515224(0x136)](',')[_0x515224(0x109)](_0x3269be=>Number(_0x3269be)||0x0);while(_0x49aecd[_0x515224(0xe4)]<0x4)_0x49aecd[_0x515224(0xb6)](0x0);_0x2dbeb7[_0x515224(0xb7)]=_0x49aecd;}else{if(_0x1db89b[_0x515224(0x11a)](_0x906c9a[_0x515224(0x107)])){const _0x3ad0ee=String(RegExp['$1'])[_0x515224(0x136)](',')[_0x515224(0x109)](_0x15556a=>Number(_0x15556a)||0x1);_0x2dbeb7[_0x515224(0xcb)]=_0x3ad0ee;}else{if(_0x1db89b[_0x515224(0x11a)](_0x906c9a['MaskTerrainTags'])){if(_0x515224(0x6e)===_0x515224(0x6e)){const _0x5ab3e7=String(RegExp['$1'])[_0x515224(0x136)](',')[_0x515224(0x109)](_0x2b3c4a=>Number(_0x2b3c4a)||0x1);_0x2dbeb7[_0x515224(0x7a)]=_0x5ab3e7;}else this[_0x515224(0xbc)]=this[_0x515224(0x76)]()[_0x515224(0xe2)],this[_0x515224(0x17b)]=_0x11e2d4[_0x515224(0x166)](this['_fogName']);}else{if(_0x1db89b[_0x515224(0x11a)](_0x906c9a[_0x515224(0xc2)]))_0x515224(0x9f)===_0x515224(0xbe)?_0x2b22fb[_0x515224(0xa0)]='custom':_0x2dbeb7[_0x515224(0x12a)]=Math[_0x515224(0x15b)](Number(RegExp['$1'])||0x0,0x0);else{if(_0x1db89b[_0x515224(0x11a)](_0x906c9a[_0x515224(0xcd)]))_0x2dbeb7[_0x515224(0x83)]=Math[_0x515224(0x15b)](Number(RegExp['$1'])||0x0,0x0);else{if(_0x1db89b[_0x515224(0x11a)](_0x906c9a[_0x515224(0xa3)]))_0x2dbeb7[_0x515224(0x178)]=(String(RegExp['$1'])||'')[_0x515224(0x85)](),_0x2dbeb7[_0x515224(0xa0)]='custom';else _0x1db89b[_0x515224(0x11a)](_0x906c9a[_0x515224(0x8b)])&&(_0x2dbeb7[_0x515224(0xa0)]=(String(RegExp['$1'])||'')[_0x515224(0xa6)]());}}}}}}}}}}}}}}}}return _0x3fc483;},Game_Map[_0x21efc6(0xd3)][_0x21efc6(0x126)]=function(){const _0x4396a5=_0x21efc6;return this[_0x4396a5(0x80)][_0x4396a5(0x131)](_0x595c13=>!!_0x595c13);},Game_Map['prototype'][_0x21efc6(0x11e)]=function(_0x23e4cf){return this['_visualFogSettings'][_0x23e4cf]||null;},Game_Map[_0x21efc6(0xd3)][_0x21efc6(0x9e)]=function(_0x157af4){const _0x42287f=_0x21efc6,_0x43eaf4=this[_0x42287f(0x11e)](_0x157af4);if(_0x43eaf4[_0x42287f(0x124)])return _0x43eaf4[_0x42287f(0x117)]*this[_0x42287f(0xad)]();else{if(_0x43eaf4['_fogLoopX'])return _0x43eaf4[_0x42287f(0x117)]*this[_0x42287f(0xad)]()/0x2;else{if(_0x42287f(0xfa)==='uCCpa')return 0x0;else{if(!_0x4393ae[_0x42287f(0x147)]())return;_0x5d31e0[_0x42287f(0x15e)](_0x46e561,_0x1fc349);const _0x191f04=_0x24a068[_0x42287f(0x121)];for(const _0x4f233f of _0x191f04){_0x542908[_0x42287f(0x151)](_0x4f233f);}}}}},Game_Map[_0x21efc6(0xd3)][_0x21efc6(0x82)]=function(_0x329d1f){const _0x58db3e=_0x21efc6,_0x305d00=this[_0x58db3e(0x11e)](_0x329d1f);if(_0x305d00[_0x58db3e(0x124)])return _0x305d00[_0x58db3e(0xea)]*this[_0x58db3e(0x95)]();else{if(_0x305d00[_0x58db3e(0xf3)]){if(_0x58db3e(0x101)===_0x58db3e(0x115)){const _0x4dae50=new _0x11fa7e(_0x4c04b4['width'],_0x5b6d9d[_0x58db3e(0x6f)]),_0x52e438=_0x58db3e(0x111),_0x5d7be3=_0x58db3e(0x174);return _0x4dae50[_0x58db3e(0x177)](_0x5bb2f8[_0x58db3e(0x8f)](_0x4f5fa0[_0x58db3e(0x158)]*0x2/0x3),0x0,_0x1edd0b['ceil'](_0x511a8a[_0x58db3e(0x158)]/0x3),_0x9e7b24[_0x58db3e(0x6f)],_0x52e438,_0x5d7be3,![]),_0x4dae50[_0x58db3e(0x16b)]=![],this[_0x58db3e(0x146)]=this[_0x58db3e(0x146)]||{},this[_0x58db3e(0x146)][_0x58db3e(0xb0)]=_0x4dae50,_0x4dae50;}else return _0x305d00[_0x58db3e(0xea)]*this[_0x58db3e(0x95)]()/0x2;}else return 0x0;}},Game_Map[_0x21efc6(0xd3)][_0x21efc6(0x151)]=function(_0x50021e){const _0x20cc47=_0x21efc6;if(!this[_0x20cc47(0x80)][_0x50021e])return;this[_0x20cc47(0x80)][_0x50021e]=null;const _0x1aa3ed=SceneManager[_0x20cc47(0xeb)][_0x20cc47(0xe3)];_0x1aa3ed&&_0x1aa3ed['removeVisualFogLayer'](_0x50021e);},Game_Map[_0x21efc6(0xd3)][_0x21efc6(0x105)]=function(_0x59bdde){const _0x4ef909=_0x21efc6,_0x429ea4=_0x59bdde['id'];let _0x1f7e5a=![];if(this[_0x4ef909(0x80)][_0x429ea4]){if(_0x4ef909(0x176)!==_0x4ef909(0x9c)){const _0x260f04=this[_0x4ef909(0x80)][_0x429ea4];if(!_0x260f04[_0x4ef909(0xcb)][_0x4ef909(0x139)](_0x59bdde['maskRegions']))_0x1f7e5a=!![];else{if(!_0x260f04[_0x4ef909(0x7a)][_0x4ef909(0x139)](_0x59bdde[_0x4ef909(0x7a)]))_0x4ef909(0xf2)!=='QEtHO'?(this[_0x4ef909(0xa8)]=0x0,this[_0x4ef909(0x120)]=[0x0,0x0,0x0,0x0],this['_colorFilter']=new _0x1d214b(),!this[_0x4ef909(0x12c)]&&(this[_0x4ef909(0x12c)]=[]),this['filters']['push'](this[_0x4ef909(0x156)])):_0x1f7e5a=!![];else _0x260f04[_0x4ef909(0xa0)]!==_0x4ef909(0x10a)&&(_0x4ef909(0x16c)===_0x4ef909(0x16c)?_0x1f7e5a=!![]:_0x401a71=!![]);}}else _0x2790aa(_0x4ef909(0xf5)[_0x4ef909(0xfd)](_0x506eed,_0x90b4f6,_0x4126d9)),_0x60984e[_0x4ef909(0xa7)]();}this[_0x4ef909(0x80)][_0x429ea4]=_0x59bdde;const _0x334a95=SceneManager[_0x4ef909(0xeb)][_0x4ef909(0xe3)];_0x334a95&&_0x334a95[_0x4ef909(0x16e)](_0x429ea4,_0x1f7e5a);},VisuMZ[_0x21efc6(0x143)][_0x21efc6(0xa4)]=Game_Map[_0x21efc6(0xd3)]['setDisplayPos'],Game_Map['prototype']['setDisplayPos']=function(_0x26e1f8,_0x562b5f){const _0x42c354=_0x21efc6;VisuMZ[_0x42c354(0x143)]['Game_Map_setDisplayPos'][_0x42c354(0xc5)](this,_0x26e1f8,_0x562b5f);for(const _0x2b8cbd of this[_0x42c354(0x126)]()){if(!_0x2b8cbd)continue;if(this[_0x42c354(0x8e)]()){if(_0x42c354(0xa9)!==_0x42c354(0x130))_0x2b8cbd[_0x42c354(0x117)]=_0x26e1f8;else return this[_0x42c354(0x80)]['filter'](_0x46ae04=>!!_0x46ae04);}else _0x2b8cbd[_0x42c354(0x117)]=this['_displayX'];if(this['isLoopVertical']()){if(_0x42c354(0x13a)===_0x42c354(0x13a))_0x2b8cbd['_fogY']=_0x562b5f;else return _0x4dee40[_0x42c354(0xea)]*this[_0x42c354(0x95)]()/0x2;}else _0x42c354(0x11b)===_0x42c354(0x99)?this[_0x42c354(0x141)][_0x42c354(0x17b)]['fillRect'](_0x5f5935*_0x3c3730-_0x15404e,_0x284b5c*_0x5340f8-_0x51b3f5,_0x317590,_0x5b9492,'#ffffff'):_0x2b8cbd[_0x42c354(0xea)]=this[_0x42c354(0xe1)];}},VisuMZ['VisualFogs'][_0x21efc6(0x10d)]=Game_Map[_0x21efc6(0xd3)][_0x21efc6(0x12b)],Game_Map['prototype'][_0x21efc6(0x12b)]=function(_0xc737d0){const _0x399a71=_0x21efc6,_0x15070c=this[_0x399a71(0x165)];VisuMZ[_0x399a71(0x143)][_0x399a71(0x10d)]['call'](this,_0xc737d0);for(const _0x26e9ca of this[_0x399a71(0x126)]()){if(_0x399a71(0xd5)!==_0x399a71(0x142)){if(!_0x26e9ca)continue;if(this[_0x399a71(0x8e)]())_0x26e9ca[_0x399a71(0x96)]&&(_0x26e9ca[_0x399a71(0x117)]-=_0xc737d0);else this[_0x399a71(0x158)]()>=this['screenTileX']()&&(_0x26e9ca[_0x399a71(0x117)]+=this['_displayX']-_0x15070c);}else(_0xcd91b7[_0x399a71(0xd9)](_0x516639[_0x399a71(0xb1)](_0x139b89,_0x1a9ac7))||_0x5ba7ed[_0x399a71(0xd9)](_0x35af0e[_0x399a71(0x161)](_0x4e9587,_0x2bc086)))&&this[_0x399a71(0x141)]['bitmap'][_0x399a71(0x113)](_0x222105*_0xbc012a-_0x56cf5a,_0x4c609d*_0x4f6552-_0x144a18,_0x9af36f,_0x1ca674,'#ffffff');}},VisuMZ[_0x21efc6(0x143)][_0x21efc6(0x149)]=Game_Map['prototype'][_0x21efc6(0x152)],Game_Map['prototype'][_0x21efc6(0x152)]=function(_0xacf5e4){const _0x545422=_0x21efc6,_0x19d678=this[_0x545422(0x165)];VisuMZ[_0x545422(0x143)]['Game_Map_scrollRight']['call'](this,_0xacf5e4);for(const _0x3cabdc of this['getVisualFogs']()){if(!_0x3cabdc)continue;if(this[_0x545422(0x8e)]()){if('knIOb'!==_0x545422(0x100))_0x3cabdc['_fogLoopX']&&('GlYUp'!==_0x545422(0xc3)?_0x3cabdc['_fogX']+=_0xacf5e4:_0x3c7155=!![]);else return this[_0x545422(0xeb)]&&this[_0x545422(0xeb)]['constructor']===_0x2536f4;}else this[_0x545422(0x158)]()>=this[_0x545422(0xd1)]()&&(_0x3cabdc[_0x545422(0x117)]+=this[_0x545422(0x165)]-_0x19d678);}},VisuMZ['VisualFogs'][_0x21efc6(0x16f)]=Game_Map[_0x21efc6(0xd3)][_0x21efc6(0x104)],Game_Map['prototype'][_0x21efc6(0x104)]=function(_0x1411a8){const _0x392574=_0x21efc6,_0x52e08a=this[_0x392574(0xe1)];VisuMZ[_0x392574(0x143)][_0x392574(0x16f)][_0x392574(0xc5)](this,_0x1411a8);for(const _0x1245a4 of this[_0x392574(0x126)]()){if(_0x392574(0x134)!==_0x392574(0x14f)){if(!_0x1245a4)continue;if(this[_0x392574(0xc6)]())_0x1245a4[_0x392574(0xf3)]&&(_0x1245a4[_0x392574(0xea)]+=_0x1411a8);else this['height']()>=this[_0x392574(0x153)]()&&(_0x1245a4[_0x392574(0xea)]+=this[_0x392574(0xe1)]-_0x52e08a);}else _0x3d7b26[_0x392574(0x117)]+=this[_0x392574(0x165)]-_0xc38135;}},VisuMZ[_0x21efc6(0x143)][_0x21efc6(0xf4)]=Game_Map[_0x21efc6(0xd3)][_0x21efc6(0x155)],Game_Map[_0x21efc6(0xd3)][_0x21efc6(0x155)]=function(_0x2cf356){const _0x1fee65=_0x21efc6,_0x3fcf85=this[_0x1fee65(0xe1)];VisuMZ[_0x1fee65(0x143)][_0x1fee65(0xf4)][_0x1fee65(0xc5)](this,_0x2cf356);for(const _0xe8c853 of this[_0x1fee65(0x126)]()){if(_0x1fee65(0x160)===_0x1fee65(0xab))this[_0x1fee65(0x12d)](this[_0x1fee65(0x76)]()['hue']);else{if(!_0xe8c853)continue;if(this[_0x1fee65(0xc6)]())_0xe8c853[_0x1fee65(0xf3)]&&(_0xe8c853[_0x1fee65(0xea)]-=_0x2cf356);else this['height']()>=this['screenTileY']()&&(_0xe8c853[_0x1fee65(0xea)]+=this['_displayY']-_0x3fcf85);}}},VisuMZ[_0x21efc6(0x143)]['Game_Map_updateParallax']=Game_Map[_0x21efc6(0xd3)][_0x21efc6(0xd2)],Game_Map[_0x21efc6(0xd3)][_0x21efc6(0xd2)]=function(){const _0x3cbd56=_0x21efc6;VisuMZ[_0x3cbd56(0x143)][_0x3cbd56(0x13f)]['call'](this);for(const _0x2cb8a2 of this[_0x3cbd56(0x126)]()){if(_0x3cbd56(0xc1)!==_0x3cbd56(0xa2)){if(!_0x2cb8a2)continue;this[_0x3cbd56(0x164)](_0x2cb8a2);}else this[_0x3cbd56(0xe5)]();}},Game_Map['prototype'][_0x21efc6(0x164)]=function(_0x58ffe3){const _0x2808d8=_0x21efc6;if(_0x58ffe3[_0x2808d8(0x96)]){if(_0x2808d8(0x159)!=='QrBtf'){const _0x725d8d=_0x3bebbd(_0x150b8f['$1']);_0x725d8d!==_0x229815[_0x1dbddb][_0x2808d8(0xf9)]&&(_0x3b4f22(_0x2808d8(0x13e)['format'](_0x1e498a,_0x725d8d)),_0x46dc7d[_0x2808d8(0xa7)]());}else _0x58ffe3[_0x2808d8(0x117)]+=_0x58ffe3[_0x2808d8(0x163)]/this[_0x2808d8(0xad)]()/0x2;}_0x58ffe3[_0x2808d8(0xf3)]&&(_0x2808d8(0x11c)===_0x2808d8(0xee)?_0x22bb33[_0x2808d8(0xea)]+=this[_0x2808d8(0xe1)]-_0x5a3cce:_0x58ffe3[_0x2808d8(0xea)]+=_0x58ffe3[_0x2808d8(0x148)]/this['tileHeight']()/0x2);_0x58ffe3[_0x2808d8(0x14b)]+=_0x58ffe3[_0x2808d8(0x75)];if(_0x58ffe3['opacityDuration']>0x0){const _0x151026=_0x58ffe3[_0x2808d8(0x7e)];_0x58ffe3[_0x2808d8(0x91)]=(_0x58ffe3[_0x2808d8(0x91)]*(_0x151026-0x1)+_0x58ffe3[_0x2808d8(0x118)])/_0x151026,_0x58ffe3[_0x2808d8(0x7e)]--;}};function Sprite_VisualFog(){const _0x324ab2=_0x21efc6;this[_0x324ab2(0xd8)](...arguments);}Sprite_VisualFog[_0x21efc6(0xd3)]=Object[_0x21efc6(0x90)](TilingSprite[_0x21efc6(0xd3)]),Sprite_VisualFog[_0x21efc6(0xd3)][_0x21efc6(0xa5)]=Sprite_VisualFog,Sprite_VisualFog[_0x21efc6(0xd3)]['initialize']=function(_0xb9793b){const _0x16228e=_0x21efc6;this['_id']=_0xb9793b,TilingSprite['prototype']['initialize'][_0x16228e(0xc5)](this),this[_0x16228e(0xb8)](),this[_0x16228e(0xd6)](),this[_0x16228e(0x17b)][_0x16228e(0x144)](this[_0x16228e(0x10c)][_0x16228e(0x169)](this));},Sprite_VisualFog['prototype'][_0x21efc6(0x76)]=function(){const _0x1ddf55=_0x21efc6;return $gameMap[_0x1ddf55(0x11e)](this['_id']);},Sprite_VisualFog[_0x21efc6(0xd3)][_0x21efc6(0xb8)]=function(){const _0x12564a=_0x21efc6;this[_0x12564a(0xa8)]=0x0,this['_colorTone']=[0x0,0x0,0x0,0x0],this['_colorFilter']=new ColorFilter(),!this['filters']&&(this[_0x12564a(0x12c)]=[]),this[_0x12564a(0x12c)][_0x12564a(0xb6)](this['_colorFilter']);},Sprite_VisualFog['prototype']['_updateColorFilter']=function(){const _0x166107=_0x21efc6;!this['_colorFilter']&&this['_createColorFilter'](),this['_colorFilter'][_0x166107(0x12d)](this[_0x166107(0xa8)]),this[_0x166107(0x156)]['setColorTone'](this[_0x166107(0x120)]);},Sprite_VisualFog[_0x21efc6(0xd3)][_0x21efc6(0xd6)]=function(){const _0x30682e=_0x21efc6;this[_0x30682e(0xbc)]=this[_0x30682e(0x76)]()['filename'],this[_0x30682e(0x17b)]=ImageManager[_0x30682e(0x166)](this[_0x30682e(0xbc)]);},Sprite_VisualFog[_0x21efc6(0xd3)][_0x21efc6(0x10c)]=function(){const _0x22a202=_0x21efc6;this[_0x22a202(0x141)]=new Sprite(),this[_0x22a202(0x70)]();},Sprite_VisualFog[_0x21efc6(0xd3)]['createMaskBitmap']=function(){const _0x33e285=_0x21efc6;this['_maskSprite'][_0x33e285(0x17b)]&&this[_0x33e285(0xb9)](this[_0x33e285(0x141)]);this['mask']=undefined;const _0xd80174=this['settings']()[_0x33e285(0xcb)],_0x22e6b2=this[_0x33e285(0x76)]()[_0x33e285(0x7a)];if(this[_0x33e285(0x76)]()[_0x33e285(0xa0)]===_0x33e285(0xca))this[_0x33e285(0x15d)]();else{if(this[_0x33e285(0x76)]()['vignette']!==_0x33e285(0x10a))this[_0x33e285(0xe5)]();else(_0xd80174[_0x33e285(0xe4)]>0x0||_0x22e6b2[_0x33e285(0xe4)]>0x0)&&this[_0x33e285(0x13b)]();}},Sprite_VisualFog[_0x21efc6(0xd3)][_0x21efc6(0x15d)]=function(){const _0x3aaaf8=_0x21efc6,_0x152a8c=this[_0x3aaaf8(0x76)]()[_0x3aaaf8(0x178)];this['_maskSprite'][_0x3aaaf8(0x17b)]=ImageManager[_0x3aaaf8(0x166)](_0x152a8c),this[_0x3aaaf8(0x141)]['bitmap'][_0x3aaaf8(0x16b)]=![],this[_0x3aaaf8(0x7d)]=this[_0x3aaaf8(0x141)],this[_0x3aaaf8(0xaa)](this[_0x3aaaf8(0x141)]);},Sprite_VisualFog[_0x21efc6(0xd3)][_0x21efc6(0xe5)]=function(){const _0x3b200a=_0x21efc6,_0x44c02e=this['settings']()['vignette'];this['_maskSprite'][_0x3b200a(0x17b)]=ImageManager[_0x3b200a(0x137)](_0x44c02e),this[_0x3b200a(0x7d)]=this['_maskSprite'],this[_0x3b200a(0xaa)](this[_0x3b200a(0x141)]);},Sprite_VisualFog['prototype'][_0x21efc6(0x13b)]=function(){const _0x128717=_0x21efc6,_0x515da8=this[_0x128717(0x76)]()[_0x128717(0xcb)],_0x3c2f69=this[_0x128717(0x76)]()[_0x128717(0x7a)];if(_0x515da8[_0x128717(0xe4)]<=0x0&&_0x3c2f69[_0x128717(0xe4)]<=0x0)return;if($gameMap['isLoopHorizontal']()||$gameMap['isLoopVertical']())return;const _0xfb5d36=$gameMap['width'](),_0x5f5d60=$gameMap[_0x128717(0x6f)](),_0x448021=$gameMap[_0x128717(0xad)](),_0x2efa66=$gameMap[_0x128717(0x95)](),_0x510900=this[_0x128717(0x76)]()['maskSpill'],_0x2a610b=_0x448021+_0x510900*0x2,_0x3ef932=_0x2efa66+_0x510900*0x2;this[_0x128717(0x141)][_0x128717(0x17b)]=new Bitmap(_0xfb5d36*_0x448021,_0x5f5d60*_0x2efa66);for(let _0x2835f0=0x0;_0x2835f0<_0xfb5d36;_0x2835f0++){for(let _0x267bf2=0x0;_0x267bf2<_0x5f5d60;_0x267bf2++){(_0x515da8[_0x128717(0xd9)]($gameMap[_0x128717(0xb1)](_0x2835f0,_0x267bf2))||_0x3c2f69[_0x128717(0xd9)]($gameMap[_0x128717(0x161)](_0x2835f0,_0x267bf2)))&&this[_0x128717(0x141)][_0x128717(0x17b)][_0x128717(0x113)](_0x2835f0*_0x448021-_0x510900,_0x267bf2*_0x2efa66-_0x510900,_0x2a610b,_0x3ef932,_0x128717(0x174));}}this[_0x128717(0x12c)]=[];!!PIXI[_0x128717(0x12c)]['BlurFilter']&&!this[_0x128717(0x71)]&&(this[_0x128717(0x71)]=new PIXI[(_0x128717(0x12c))][(_0x128717(0x168))](clamp=!![]));if(this[_0x128717(0x71)]){const _0x4fa96a=this['settings']()[_0x128717(0x12a)];this['_blurFilter'][_0x128717(0x103)]=_0x4fa96a||0.01,this[_0x128717(0x12c)]=[this[_0x128717(0x71)]];}this[_0x128717(0x7d)]=this[_0x128717(0x141)],this[_0x128717(0xaa)](this[_0x128717(0x141)]);},Sprite_VisualFog[_0x21efc6(0xd3)][_0x21efc6(0x162)]=function(_0x42586c,_0x1af030){},Sprite_VisualFog['prototype'][_0x21efc6(0xe6)]=function(){const _0x158088=_0x21efc6;TilingSprite[_0x158088(0xd3)][_0x158088(0xe6)][_0x158088(0xc5)](this);if(!this[_0x158088(0x17b)])return;this['updateOpacity'](),this['updateOrigin'](),this[_0x158088(0xaf)](),this[_0x158088(0x9b)](),this[_0x158088(0xf7)](),this[_0x158088(0x8d)]();},Sprite_VisualFog[_0x21efc6(0xd3)]['updateOpacity']=function(){const _0x2cd558=_0x21efc6;this['opacity']=this['settings']()[_0x2cd558(0x91)];},Sprite_VisualFog[_0x21efc6(0xd3)]['updateOrigin']=function(){const _0x3ab41f=_0x21efc6;this[_0x3ab41f(0xac)]['x']=$gameMap[_0x3ab41f(0x9e)](this[_0x3ab41f(0x81)]),this[_0x3ab41f(0xac)]['y']=$gameMap[_0x3ab41f(0x82)](this['_id']);},Sprite_VisualFog[_0x21efc6(0xd3)][_0x21efc6(0xaf)]=function(){const _0x3863a8=_0x21efc6;this[_0x3863a8(0x145)]=this['settings']()[_0x3863a8(0x145)];},Sprite_VisualFog[_0x21efc6(0xd3)][_0x21efc6(0x9b)]=function(){const _0x14d975=_0x21efc6;this[_0x14d975(0x12d)](this[_0x14d975(0x76)]()[_0x14d975(0x14b)]);},Sprite_VisualFog['prototype']['setHue']=function(_0x5e5234){const _0x3dafcf=_0x21efc6;this[_0x3dafcf(0xa8)]!==Number(_0x5e5234)&&(this[_0x3dafcf(0xa8)]=Number(_0x5e5234),this[_0x3dafcf(0x14d)]());},Sprite_VisualFog[_0x21efc6(0xd3)]['updateTone']=function(){const _0x4e3c1a=_0x21efc6;this[_0x4e3c1a(0xd0)](this[_0x4e3c1a(0x76)]()[_0x4e3c1a(0xb7)]);},Sprite_VisualFog[_0x21efc6(0xd3)][_0x21efc6(0xd0)]=function(_0x1d28f7){const _0x195a92=_0x21efc6;if(!(_0x1d28f7 instanceof Array)){if('dfsFT'!=='wmEFr')throw new Error('Argument\x20must\x20be\x20an\x20array');else return this[_0x195a92(0x89)]();}!this[_0x195a92(0x120)][_0x195a92(0x139)](_0x1d28f7)&&(this[_0x195a92(0x120)]=_0x1d28f7[_0x195a92(0xce)](),this[_0x195a92(0x14d)]());},Sprite_VisualFog[_0x21efc6(0xd3)][_0x21efc6(0x8d)]=function(){const _0x1d6d14=_0x21efc6;if(!this[_0x1d6d14(0x7d)])return;this[_0x1d6d14(0x76)]()[_0x1d6d14(0xa0)]!==_0x1d6d14(0x10a)?_0x1d6d14(0x11f)===_0x1d6d14(0x11f)?(this[_0x1d6d14(0x141)]['x']=0x0,this['_maskSprite']['y']=0x0):(this[_0x1d6d14(0xc8)](),this[_0x1d6d14(0xde)](),this['sortVisualFogs'](),_0x2b4e14[_0x1d6d14(0x143)][_0x1d6d14(0xe9)][_0x1d6d14(0xc5)](this)):(this['_maskSprite']['x']=Math[_0x1d6d14(0x7c)](-$gameMap['displayX']()*$gameMap[_0x1d6d14(0xad)]()),this['_maskSprite']['y']=Math[_0x1d6d14(0x7c)](-$gameMap[_0x1d6d14(0x106)]()*$gameMap['tileHeight']()));},VisuMZ['VisualFogs'][_0x21efc6(0xe9)]=Spriteset_Map[_0x21efc6(0xd3)]['createWeather'],Spriteset_Map[_0x21efc6(0xd3)][_0x21efc6(0x93)]=function(){const _0xe56659=_0x21efc6;this[_0xe56659(0xc8)](),this[_0xe56659(0xde)](),this[_0xe56659(0xe0)](),VisuMZ[_0xe56659(0x143)][_0xe56659(0xe9)][_0xe56659(0xc5)](this);},Spriteset_Map[_0x21efc6(0xd3)][_0x21efc6(0xc8)]=function(){const _0x49dfd6=_0x21efc6;this['_fogContainer']=new Sprite(),this['_baseSprite'][_0x49dfd6(0xaa)](this[_0x49dfd6(0xdd)]),this[_0x49dfd6(0x138)]=[null];},Spriteset_Map[_0x21efc6(0xd3)][_0x21efc6(0xde)]=function(){const _0x29b695=_0x21efc6,_0xc6f584=$gameMap[_0x29b695(0x126)]();for(const _0x34a179 of _0xc6f584){if(!_0x34a179)continue;this['createNewFogLayer'](_0x34a179);}},Spriteset_Map[_0x21efc6(0xd3)][_0x21efc6(0xd4)]=function(_0x5e2f73){const _0x2a1c63=_0x21efc6;if(!_0x5e2f73)return;const _0x1efa27=new Sprite_VisualFog(_0x5e2f73['id']);_0x1efa27[_0x2a1c63(0x123)](0x0,0x0,Graphics[_0x2a1c63(0x158)],Graphics[_0x2a1c63(0x6f)]),this['_fogContainer'][_0x2a1c63(0xaa)](_0x1efa27);},Spriteset_Map[_0x21efc6(0xd3)][_0x21efc6(0xe0)]=function(){const _0x2ee66a=_0x21efc6;this['_fogContainer'][_0x2ee66a(0xc0)][_0x2ee66a(0x110)]((_0x2747b9,_0x4ffb54)=>_0x2747b9[_0x2ee66a(0x81)]-_0x4ffb54[_0x2ee66a(0x81)]);},Spriteset_Map[_0x21efc6(0xd3)]['findTargetVisualFog']=function(_0x161c36){const _0x54317b=_0x21efc6;return this['_fogContainer'][_0x54317b(0xc0)][_0x54317b(0xa1)](_0x5bca3f=>_0x5bca3f[_0x54317b(0x81)]===_0x161c36);},Spriteset_Map[_0x21efc6(0xd3)][_0x21efc6(0xe7)]=function(_0x1a1781){const _0x369602=_0x21efc6,_0x3fa07=this[_0x369602(0xf8)](_0x1a1781);_0x3fa07&&this['_fogContainer'][_0x369602(0xb9)](_0x3fa07);},Spriteset_Map['prototype'][_0x21efc6(0x16e)]=function(_0x272f98,_0x1ff9e4){const _0x6fe020=_0x21efc6,_0x307102=this[_0x6fe020(0xf8)](_0x272f98);!_0x307102?_0x6fe020(0x10e)!==_0x6fe020(0x10e)?this['removeChild'](this[_0x6fe020(0x141)]):(this['createNewFogLayer']($gameMap['getVisualFogSettings'](_0x272f98)),this['sortVisualFogs']()):(_0x307102[_0x6fe020(0xd6)](),_0x1ff9e4&&_0x307102[_0x6fe020(0x17b)][_0x6fe020(0x144)](_0x307102['createMaskBitmap'][_0x6fe020(0x169)](_0x307102)));};