//=============================================================================
// VisuStella MZ - Visual Parallaxes
// VisuMZ_4_VisualParallaxes.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualParallaxes = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualParallaxes = VisuMZ.VisualParallaxes || {};
VisuMZ.VisualParallaxes.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.07] [VisualParallaxes]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Parallaxes_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, RPG Maker MZ only allows each map to have one parallax. Such a
 * limit makes it difficult to create different layers of objects to portray
 * distance and the like. This plugin will remedy that by allowing you to add
 * an unlimited amount of parallaxes per map alongside many controls to make
 * the parallaxes more vivid.
 * 
 * A restricted parallax area system is also added to this plugin to make
 * parallaxes appear only within certain regions and/or terrain tags. This way,
 * you can utilize parallaxes as masked layers for water surfaces and the like.
 * 
 * To make the most out of this, with the tilesets are formatted properly,
 * reflective water and reflective solid surfaces are also new effects added
 * through this plugin. Water effects will show ripples while reflective solid
 * surfaces are static.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add, change, and/or remove parallaxes through map notetags.
 * * Lots of customization options for each of the parallaxes.
 * * Limit where parallaxes can be displayed on the map through regions and/or
 *   terrain tags.
 * * Create reflective surfaces for water and solid ground as long as the
 *   tilesets have been formatted properly.
 * * Use Plugin Commands midway through the game to add, change, fade, and/or
 *   remove parallaxes as needed.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Recommended Plugin List ------
 *
 * * Pixi JS Filters*
 *
 * This plugin recommends the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You can use this plugin without
 * it, but there will be features missing.
 * 
 * *Note* You can download the Pixi JS Filters plugin library from the below
 * URL or from the Action Sequence Impact product page. Install it as a
 * Tier 0 plugin.
 * 
 * *Note2* Pixi JS Filters perform differently on different machines/devices.
 * Please understand that this is outside of VisuStella's control.
 * 
 * URL: https://filters.pixijs.download/v3.1.0/pixi-filters.js
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
 * Parallaxes
 * 
 * The map editor's inherent parallax will remain untouched and unable to
 * utilize the extra features provided by this plugin. However, you can just
 * simply create a new parallax layer over it and hide it from view if needed.
 * 
 * Each of the parallaxes added through this plugin's notetags and/or commands
 * are assigned an ID. Referring back to the ID later will allow you to update
 * and/or remove that parallax when needed.
 * 
 * The new parallaxes are created on a separate layer from the map editor's
 * parallax and isn't included with the new parallaxes. Layers with higher ID's
 * will appear above layers with lower ID's.
 * 
 * However, other than that, all of the new parallaxes follow the same rules as
 * the map editor's parallax. This means that they will not appear above the
 * tile map and require transparent tiles to be seen. They will also scroll the
 * same way the original parallax does to provide consistency.
 *
 * ---
 * 
 * Regions and Terrain Tags
 * 
 * If you don't want a parallax to appear for the whole entire background and
 * want to confine them to certain areas of the map, you can assign regions or
 * terrain tags for them to appear in.
 * 
 * Only the parts of the map marked by the designated regions and/or terrain
 * tags will reveal the parallax. Those parts will be little squares each,
 * equal to the size of a tile. They have hard borders and do not have any
 * smoothing options in order to display the parallax tiles accurately.
 * 
 * Each parallax layer can have their own custom regions and/or terrain tags to
 * appear in. These can be adjusted through the notetag settings or through the
 * Plugin Commands provided by this plugin. Parallax layers can be limited to
 * multiple regions and/or terrain tags at the same time.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
 * 
 * Reflections
 * 
 * In order to use reflections, you need to use tiles that are semi-transparent
 * or fully transparent. For example, water reflections need to come from tiles
 * that have been modified to be semi-transparent or fully transparent. If the
 * tile is completely opaque, the reflection will not show through. This rule
 * also applies to ground surfaces.
 * 
 * By default, water-based reflections are assigned the Terrain Tag 1 and solid
 * ground reflections are assigned the Terrain Tag 2. In order to make water
 * tiles show water reflections, you need to mark their tiles in the database's
 * tilesets with 1's. To mark reflective ground surfaces, mark them with 2's.
 * If the tiles are not tagged properly, the reflections will not be shown.
 * 
 * In the Plugin Parameters and notetags, you can decide if the reflections
 * will appear above the parallaxes or below them. By default, they will appear
 * above them. However, if you change them to appear below the parallaxes, then
 * pay attention to the opacity level of the parallaxes. If the parallaxes are
 * too opaque, you will barely see the reflection.
 * 
 * Once again, both water and ground tiles need to be semi-transparent or fully
 * transparent in order for reflections to be seen.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
 * 
 * Not For Battle
 * 
 * For clarification, the VisuStella MZ Visual Parallaxes plugin is NOT made
 * for battle. There's a separate plugin for that called Visual Battle
 * Environment. The reason why parallaxes aren't made for battle is because the
 * way parallaxes are handled in map vary from how they would be handled in
 * battle. Using the Visual Parallax Plugin Commands will only alter the
 * parallax appearances when the player finishes battle.
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
 * Pixi JS Filters
 *
 * If the game project has Pixi JS Filters installed, then water reflections
 * will have a ripple effect. This is based off the Pixi JS ReflectionFilter
 * and will follow their rules. There are a couple of settings that can be
 * adjusted to customize the reflective properties.
 * 
 * Boundary: Vertical position of the reflection point, default is 50% (middle)
 * smaller numbers produce a larger reflection, larger numbers produce a
 * smaller reflection. This also means that reflections closer to the edges
 * will also have a different visual ripple effect than those towards the
 * middle of the reflection.
 * 
 * Amplitude: Starting and ending amplitude of waves allows you to control the
 * intensity of the reflection ripples. Use larger numbers for more intensity.
 * You have control over the values for the start and end values.
 * 
 * Wavelength: Starting and ending wavelength values determine the size of the
 * ripples for the reflection filter. Use larger numbers for larger wave sizes.
 * You have control over the values for the start and end values.
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
 * === Parallax-Related Notetags ===
 * 
 * ---
 *
 * <Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a regular parallax layer for this map by default.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 *
 * ---
 *
 * <Water Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Water Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a water-based parallax layer for this map by default.
 *   - This will utilize the water reflection properties and will only appear
 *     on water-marked regions and terrain tags.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 *
 * <Solid Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Solid Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a solid-based parallax layer for this map by default.
 *   - This will utilize the solid reflection properties and will only appear
 *     on solid-marked regions and terrain tags.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 * - WARNING: This WILL cause longer load times on larger maps.
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
 * - This enables horizontal or vertical scrolling for the parallax.
 * - Replace 'x' or 'y' with a Number value to determine how fast they will
 *   scroll across the screen.
 * - Use a negative value to make them scroll the other way.
 * - These effects are mutually exclusive from the "Map Locked" property.
 * 
 * ---
 * 
 * Map Locked
 * 
 * - This will cause the parallax to only scroll when the map scrolls.
 * - This has the same effect as naming a parallax with "!" in front of
 *   its filename.
 * - If the filename used for this parallax has "!" in front of it, the
 *   Map Locked effect will be automatically turned on.
 * - These effect is mutually exclusive from the "Horz Scroll" and
 *   "Vert Scroll" properties.
 * 
 * ---
 * 
 * Opacity: x
 * Opacity: x%
 * 
 * - Changes the opacity level of the parallax.
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
 * - Sets the blend mode for the icon on the parallax.
 * - Use only one of the above.
 * 
 * ---
 * 
 * Hue: x
 * Hue Shift: x
 * 
 * - Changes the hue of the parallax to 'x' so that you don't need to create
 *   multiple copies of the files with different colors.
 * - Replace 'x' with a number value between 0 and 360.
 * - If the "Hue Shift" property is also used, then adjust the hue of the
 *   parallax each frame by 'x' amount.
 *   - 'x' can be positive or negative.
 * 
 * ---
 * 
 * Color Tone: red, green, blue, gray
 * 
 * - Changes the color tone or tint of the parallax.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * 
 * ---
 * 
 * Region: id
 * Regions: id, id, id
 * 
 * - Forces the parallax to only become visible on tiles marked regions with a
 *   matching ID (alongside valid terrain tags).
 * - If this isn't used, then the parallax will be as large as the screen.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Terrain Tag: id
 * Terrain Tags: id, id, id
 * 
 * - Forces the parallax to only become visible on tiles marked terrain tags
 *   with a matching ID (alongside valid regions).
 * - If this isn't used, then the parallax will be as large as the screen.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * === Event Reflection-Related Notetags ===
 * 
 * ---
 *
 * <No Reflection>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This will cause the event to not show any reflection on reflective tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * === Reflection-Related Notetags ===
 * 
 * In order to use reflections, you need to use tiles that are semi-transparent
 * or fully transparent. For example, water reflections need to come from tiles
 * that have been modified to be semi-transparent or fully transparent. If the
 * tile is completely opaque, the reflection will not show through. This rule
 * also applies to ground surfaces.
 * 
 * ---
 *
 * <Water Reflection Region: id>
 * <Water Reflection Regions: id, id, id>
 *
 * <Solid Reflection Region: id>
 * <Solid Reflection Regions: id, id, id>
 *
 * - Used for: Map Notetags
 * - Sets the tiles marked by the region ID's to become reflective.
 * - This will override the Plugin Parameter settings for this map.
 *   - This does not add upon them.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 *
 * <Water Reflection Terrain Tag: id>
 * <Water Reflection Terrain Tags: id, id, id>
 *
 * <Solid Reflection Terrain Tag: id>
 * <Solid Reflection Terrain Tags: id, id, id>
 *
 * - Used for: Map Notetags
 * - Sets the tiles marked by the terrain tag ID's to become reflective.
 * - This will override the Plugin Parameter settings for this map.
 *   - This does not add upon them.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain Tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 * 
 * <No Reflections>
 * 
 * - Used for: Map Notetags
 * - Disable water and map reflections on the current map.
 * 
 * ---
 *
 * <Water Reflection Top>
 * <Water Reflection Bottom>
 *
 * <Solid Reflection Top>
 * <Solid Reflection Bottom>
 *
 * - Used for: Map Notetags
 * - This will put the reflection layer either above all of the newly added
 *   parallaxes or below them.
 *   - If placed below, the reflection layer will not appear below the map
 *     editor's parallax layer.
 *   - If you change them to appear below the parallaxes, then pay attention to
 *     the opacity level of the parallaxes. If the parallaxes are too opaque,
 *     you will barely see the reflection.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 *
 * <Water Reflection Blur: x>
 * 
 * <Solid Reflection Blur: x>
 *
 * - Used for: Map Notetags
 * - Changes how much the water/solid tiles will blur the reflection for
 *   this map.
 * - Replace 'x' with a decimal Number value. Use a number between 0 and 1 for
 *   the best results.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 *
 * <Water Reflection Opacity: x>
 * <Water Reflection Opacity: x%>
 * 
 * <Solid Reflection Opacity: x>
 * <Solid Reflection Opacity: x%>
 *
 * - Used for: Map Notetags
 * - Changes the opacity level of the tile's reflection.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 * 
 * <Water Reflection Boundary: x>
 *
 * <Water Reflection Amplitude: start, end>
 * 
 * <Water Reflection Wavelength: start, end>
 *
 * - Used for: Map Notetags
 * - Requires Pixi JS Filters installed for the game project.
 * - These settings adjust the water reflection's ripple intensity.
 * - Replace Boundary's 'x' with a number value between 0 and 1.
 *   - Vertical position of the reflection point, default is 50% (middle)
 *     smaller numbers produce a larger reflection, larger numbers produce a
 *     smaller reflection. This also means that reflections closer to the edges
 *     will also have a different visual ripple effect than those towards the
 *     middle of the reflection.
 * - Replace Amplitude's 'start' and 'end' with number values representing how
 *   much to alter the intensity by.
 *   - Starting and ending amplitude of waves allows you to control the
 *     intensity of the reflection ripples.
 *   - Use larger numbers for more intensity.
 * - Replace Wavelength's 'start' and 'end' with number values representing the
 *   wave size.
 *   - Starting and ending wavelength values determine the size of the ripples
 *     for the reflection filter.
 *   - Use larger numbers for larger wave sizes.
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
 * === Parallax Plugin Commands ===
 * 
 * ---
 *
 * Parallax: Add/Change Settings
 * - Add/Change settings for target parallax.
 * - Does not alter the map editor's parallax.
 *
 *   Required:
 *
 *     ID:
 *     - What is the ID of this parallax to be added/changed?
 *
 *     Filename:
 *     - What is the filename of the parallax?
 *
 *     Type:
 *     - What kind of parallax is this going to be?
 *     - Normal
 *     - Water
 *     - Solid
 * 
 *   Optional Settings:
 * 
 *     Scrolling:
 *
 *       Map Lock?:
 *       - Lock the parallax to the map's scrolling?
 *       - Automatically enable if the filename starts with "!"
 *
 *       Loop Horizontally?:
 *       - Loop the parallax horizontally?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the horizontal scroll speed?
 *         - Use a negative value to invert the direction.
 *
 *       Loop Vertically?:
 *       - Loop the parallax vertically?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the vertical scroll speed?
 *         - Use a negative value to invert the direction.
 * 
 *     Appearance:
 *
 *       Opacity:
 *       - What is the opacity level for this parallax?
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the parallax?
 *       - You may use JavaScript code.
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Hue:
 *       - Do you wish to adjust this parallax's hue?
 *       - You may use JavaScript code.
 *
 *       Hue Shift:
 *       - How much do you want the hue to shift each frame?
 *       - You may use JavaScript code.
 *
 *       Color Tone:
 *       - What tone do you want for the parallax?
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Location:
 *
 *       Regions:
 *       - Which regions will show this parallax?
 *       - Does not work with 0. Leave empty to ignore.
 *
 *       Terrain Tags:
 *       - Which terrain tags will show this parallax?
 *       - Does not work with 0. Leave empty to ignore.
 *
 * ---
 * 
 * Parallax: Fade Opacity
 * - Fades the target parallax(es) opacity to a different value.
 * 
 *   ID(s):
 *   - Target which parallax(es)?
 *   - Cannot target the map editor's parallax.
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
 * Parallax: Remove
 * - Removes target parallax(es).
 *
 *   ID(s):
 *   - Remove which parallax(es)?
 *   - Cannot remove the map editor's parallax.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Water Reflection Settings
 * ============================================================================
 *
 * These are the default settings for water-based reflections.
 *
 * ---
 *
 * Markers
 * 
 *   Regions:
 *   - By default, which regions by default apply this reflection?
 *   - 0 is ignored.
 * 
 *   Terrain Tags:
 *   - By default, which terrain tags by default apply this reflection?
 *   - 0 is ignored.
 *
 * ---
 *
 * Positioning
 * 
 *   Above Parallaxes?:
 *   - Place water reflections above visual parallaxes?
 *
 * ---
 *
 * Appearance
 * 
 *   Blur Rate:
 *   - How much do you wish to blur this reflection?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Opacity:
 *   - What is the default opacity for this reflection?
 *   - Use a value between 0 and 255.
 * 
 *   Water Boundary:
 *   - At which point is the water boundary?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Amplitude Start:
 *   - What should be the starting amplitude value?
 * 
 *   Amplitude End:
 *   - What should be the ending amplitude value?
 * 
 *   Wavelength Start:
 *   - What should be the starting wavelength value?
 * 
 *   Wavelength End:
 *   - What should be the ending wavelength value?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Solid Reflection Settings
 * ============================================================================
 *
 * These are the default settings for solid ground reflections.
 *
 * ---
 *
 * Markers
 * 
 *   Regions:
 *   - By default, which regions by default apply this reflection?
 *   - 0 is ignored.
 * 
 *   Terrain Tags:
 *   - By default, which terrain tags by default apply this reflection?
 *   - 0 is ignored.
 *
 * ---
 *
 * Positioning
 * 
 *   Above Parallaxes?:
 *   - Place water reflections above visual parallaxes?
 *
 * ---
 *
 * Appearance
 * 
 *   Blur Rate:
 *   - How much do you wish to blur this reflection?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Opacity:
 *   - What is the default opacity for this reflection?
 *   - Use a value between 0 and 255.
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
 * Version 1.07: August 4, 2022
 * * Compatibility Update!
 * ** Map Locked parallaxes now work better with smooth scroll.
 * 
 * Version 1.06: July 7, 2022
 * * Feature Update!
 * ** Blend modes are now revamped for the parallaxes to behave more like they
 *    do for pictures for better accuracy. Update made by Irina.
 * 
 * Version 1.05: January 27, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: January 6, 2022
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: December 9, 2021
 * * Documentation Update!
 * ** Added section to "Major Changes" for clarification purposes:
 * *** Not For Battle
 * *** For clarification, the VisuStella MZ Visual Parallxes plugin is NOT made
 *     for battle. There's a separate plugin for that called Visual Battle
 *     Environment. The reason why parallaxes aren't made for battle is because
 *     the way parallaxes are handled in map vary from how they would be
 *     handled in battle. Using the Visual Parallaxes Plugin Commands will only
 *     alter the parallax appearances when the player finishes battle.
 * * Feature Update!
 * ** Added fail safes to prevent Plugin Command usage during battle to cause
 *    problems while inside battle test. Update made by Irina.
 * 
 * Version 1.02: June 25, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for Event Title Scene.
 * 
 * Version 1.01: May 28, 2021
 * * Feature Update!
 * ** Fail safe added for those without Pixi JS Filters added.
 * ** Removed the VisuStella MZ Core Engine requirement.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00 Official Release Date: March 12, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ParallaxAddChangeSettings
 * @text Parallax: Add/Change Settings
 * @desc Add/Change settings for target parallax.
 * Does not alter the map editor's parallax.
 * 
 * @arg Required
 *
 * @arg id:num
 * @text ID
 * @parent Required
 * @type number
 * @min 1
 * @desc What is the ID of this parallax to be added/changed?
 * @default 1
 *
 * @arg filename:str
 * @text Filename
 * @parent Required
 * @type file
 * @dir img/parallaxes/
 * @desc What is the filename of the parallax?
 * @default >>>ATTENTION<<<
 *
 * @arg type:str
 * @text Type
 * @parent Required
 * @type select
 * @option Normal
 * @value normal
 * @option Water
 * @value water
 * @option Solid
 * @value solid
 * @desc What kind of parallax is this going to be?
 * @default normal
 *
 * @arg Optional:struct
 * @text Optional Settings
 * @type struct<Optional>
 * @desc Optional settings regarding Visual Parallaxes.
 * @default {"Scrolling":"","_parallaxZero:eval":"false","_parallaxLoopX:eval":"false","_parallaxSx:eval":"+0","_parallaxLoopY:eval":"false","_parallaxSy:eval":"+0","Appearance":"","opacity:eval":"255","blendMode:eval":"0","hue:eval":"0","hueShift:eval":"+0","colorTone:eval":"[0, 0, 0, 0]","Location":"","maskRegions:arraynum":"[]","maskTerrainTags:arraynum":"[]"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ParallaxFadeOpacity
 * @text Parallax: Fade Opacity
 * @desc Fades the target parallax(es) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which parallax(es)?
 * Cannot target the map editor's parallax.
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
 * @command ParallaxRemove
 * @text Parallax: Remove
 * @desc Removes target parallax(es).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which parallax(es)?
 * Cannot remove the map editor's parallax.
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
 * @param VisualParallaxes
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param WaterReflect:struct
 * @text Water Reflection Settings
 * @type struct<WaterReflect>
 * @desc These are the default settings for water-based reflections.
 * @default {"Markers":"","Regions:arraynum":"[]","TerrainTags:arraynum":"[\"1\"]","Positioning":"","Top:eval":"true","Appearance":"","Blur:num":"0.8","Opacity:num":"128","Boundary:num":"0.1","AmpStart:num":"2","AmpEnd:num":"4","WaveStart:num":"4","WaveEnd:num":"16"}
 *
 * @param SolidReflect:struct
 * @text Solid Reflection Settings
 * @type struct<SolidReflect>
 * @desc These are the default settings for solid ground reflections.
 * @default {"Markers":"","Regions:arraynum":"[]","TerrainTags:arraynum":"[\"2\"]","Positioning":"","Top:eval":"true","Appearance":"","Blur:num":"0.8","Opacity:num":"128"}
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
 * Water Reflection Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WaterReflect:
 *
 * @param Markers
 *
 * @param Regions:arraynum
 * @text Regions
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 255
 * @desc By default, which regions by default apply this reflection? 0 is ignored.
 * @default []
 *
 * @param TerrainTags:arraynum
 * @text Terrain Tags
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 7
 * @desc By default, which terrain tags by default apply this reflection? 0 is ignored.
 * @default ["1"]
 * 
 * @param Positioning
 * 
 * @param Top:eval
 * @text Above Parallaxes?
 * @parent Positioning
 * @type boolean
 * @on Above Parallaxes
 * @off Below Parallaxes
 * @desc Place water reflections above visual parallaxes?
 * @default true
 * 
 * @param Appearance
 *
 * @param Blur:num
 * @text Blur Rate
 * @parent Appearance
 * @desc How much do you wish to blur this reflection?
 * Use a decimal number between 0 and 1.
 * @default 0.8
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the default opacity for this reflection?
 * Use a value between 0 and 255.
 * @default 128
 *
 * @param Boundary:num
 * @text Water Boundary
 * @parent Appearance
 * @desc At which point is the water boundary?
 * Use a decimal number between 0 and 1.
 * @default 0.1
 *
 * @param AmpStart:num
 * @text Amplitude Start
 * @parent Appearance
 * @type number
 * @desc What should be the starting amplitude value?
 * @default 2
 *
 * @param AmpEnd:num
 * @text Amplitude End
 * @parent Appearance
 * @type number
 * @desc What should be the ending amplitude value?
 * @default 4
 *
 * @param WaveStart:num
 * @text Wavelength Start
 * @parent Appearance
 * @type number
 * @desc What should be the starting wavelength value?
 * @default 4
 *
 * @param WaveEnd:num
 * @text Wavelength End
 * @parent Appearance
 * @type number
 * @desc What should be the ending wavelength value?
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * Solid Reflection Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SolidReflect:
 *
 * @param Markers
 *
 * @param Regions:arraynum
 * @text Regions
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 255
 * @desc By default, which regions by default apply this reflection? 0 is ignored.
 * @default []
 *
 * @param TerrainTags:arraynum
 * @text Terrain Tags
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 7
 * @desc By default, which terrain tags by default apply this reflection? 0 is ignored.
 * @default ["2"]
 * 
 * @param Positioning
 * 
 * @param Top:eval
 * @text Above Parallaxes?
 * @parent Positioning
 * @type boolean
 * @on Above Parallaxes
 * @off Below Parallaxes
 * @desc Place solid reflections above visual parallaxes?
 * @default true
 * 
 * @param Appearance
 *
 * @param Blur:num
 * @text Blur Rate
 * @parent Appearance
 * @desc How much do you wish to blur this reflection?
 * Use a decimal number between 0 and 1.
 * @default 0.8
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the default opacity for this reflection?
 * Use a value between 0 and 255.
 * @default 128
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
 * @param _parallaxZero:eval
 * @text Map Lock?
 * @parent Scrolling
 * @type boolean
 * @on Map Lock
 * @off No Map Lock
 * @desc Lock the parallax to the map's scrolling?
 * Automatically enable if the filename starts with "!"
 * @default false
 * 
 * @param _parallaxLoopX:eval
 * @text Loop Horizontally?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the parallax horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _parallaxSx:eval
 * @text Scroll:
 * @parent _parallaxLoopX:eval
 * @desc What is the horizontal scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param _parallaxLoopY:eval
 * @text Loop Vertically?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the parallax horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _parallaxSy:eval
 * @text Scroll:
 * @parent _parallaxLoopY:eval
 * @desc What is the vertical scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param Appearance
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Appearance
 * @desc What is the opacity level for this parallax?
 * You may use JavaScript code.
 * @default 255
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
 * @desc What kind of blend mode do you wish to apply to the parallax?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hue:eval
 * @text Hue
 * @parent Appearance
 * @desc Do you wish to adjust this parallax's hue?
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
 * @desc What tone do you want for the parallax?
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
 * @desc Which regions will show this parallax?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Location
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags will show this parallax?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 */
//=============================================================================

const _0x19098e=_0x45e6;(function(_0x1f30e1,_0x135474){const _0x5bb096=_0x45e6,_0x381a91=_0x1f30e1();while(!![]){try{const _0x4fc186=-parseInt(_0x5bb096(0x1c7))/0x1*(-parseInt(_0x5bb096(0x1fe))/0x2)+parseInt(_0x5bb096(0x128))/0x3+-parseInt(_0x5bb096(0x165))/0x4*(-parseInt(_0x5bb096(0x15f))/0x5)+-parseInt(_0x5bb096(0x1f8))/0x6+-parseInt(_0x5bb096(0xfc))/0x7+parseInt(_0x5bb096(0x1d3))/0x8+-parseInt(_0x5bb096(0x154))/0x9;if(_0x4fc186===_0x135474)break;else _0x381a91['push'](_0x381a91['shift']());}catch(_0xeeb59e){_0x381a91['push'](_0x381a91['shift']());}}}(_0x4662,0xa98af));var label=_0x19098e(0x1f0),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x19098e(0x16b)](function(_0x34c45c){const _0x20420b=_0x19098e;return _0x34c45c[_0x20420b(0xe2)]&&_0x34c45c[_0x20420b(0x142)][_0x20420b(0xef)]('['+label+']');})[0x0];VisuMZ[label][_0x19098e(0x1dc)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x19098e(0x148)]=function(_0x6cf66b,_0x59914c){const _0x31abe7=_0x19098e;for(const _0x5a04ec in _0x59914c){if(_0x5a04ec['match'](/(.*):(.*)/i)){const _0xfcc5e9=String(RegExp['$1']),_0x2e4930=String(RegExp['$2'])[_0x31abe7(0x13f)]()[_0x31abe7(0x1fb)]();let _0x2fd40c,_0x2a8808,_0x152b69;switch(_0x2e4930){case _0x31abe7(0x20e):_0x2fd40c=_0x59914c[_0x5a04ec]!==''?Number(_0x59914c[_0x5a04ec]):0x0;break;case'ARRAYNUM':_0x2a8808=_0x59914c[_0x5a04ec]!==''?JSON[_0x31abe7(0x159)](_0x59914c[_0x5a04ec]):[],_0x2fd40c=_0x2a8808[_0x31abe7(0xe1)](_0x23ede9=>Number(_0x23ede9));break;case _0x31abe7(0x185):_0x2fd40c=_0x59914c[_0x5a04ec]!==''?eval(_0x59914c[_0x5a04ec]):null;break;case _0x31abe7(0xfb):_0x2a8808=_0x59914c[_0x5a04ec]!==''?JSON[_0x31abe7(0x159)](_0x59914c[_0x5a04ec]):[],_0x2fd40c=_0x2a8808[_0x31abe7(0xe1)](_0x226d0b=>eval(_0x226d0b));break;case'JSON':_0x2fd40c=_0x59914c[_0x5a04ec]!==''?JSON[_0x31abe7(0x159)](_0x59914c[_0x5a04ec]):'';break;case'ARRAYJSON':_0x2a8808=_0x59914c[_0x5a04ec]!==''?JSON[_0x31abe7(0x159)](_0x59914c[_0x5a04ec]):[],_0x2fd40c=_0x2a8808[_0x31abe7(0xe1)](_0x4097a5=>JSON['parse'](_0x4097a5));break;case'FUNC':_0x2fd40c=_0x59914c[_0x5a04ec]!==''?new Function(JSON[_0x31abe7(0x159)](_0x59914c[_0x5a04ec])):new Function('return\x200');break;case _0x31abe7(0x140):_0x2a8808=_0x59914c[_0x5a04ec]!==''?JSON[_0x31abe7(0x159)](_0x59914c[_0x5a04ec]):[],_0x2fd40c=_0x2a8808[_0x31abe7(0xe1)](_0x12e9fb=>new Function(JSON[_0x31abe7(0x159)](_0x12e9fb)));break;case'STR':_0x2fd40c=_0x59914c[_0x5a04ec]!==''?String(_0x59914c[_0x5a04ec]):'';break;case'ARRAYSTR':_0x2a8808=_0x59914c[_0x5a04ec]!==''?JSON['parse'](_0x59914c[_0x5a04ec]):[],_0x2fd40c=_0x2a8808[_0x31abe7(0xe1)](_0x384d8e=>String(_0x384d8e));break;case _0x31abe7(0x1da):_0x152b69=_0x59914c[_0x5a04ec]!==''?JSON[_0x31abe7(0x159)](_0x59914c[_0x5a04ec]):{},_0x2fd40c=VisuMZ['ConvertParams']({},_0x152b69);break;case _0x31abe7(0x194):_0x2a8808=_0x59914c[_0x5a04ec]!==''?JSON[_0x31abe7(0x159)](_0x59914c[_0x5a04ec]):[],_0x2fd40c=_0x2a8808[_0x31abe7(0xe1)](_0x22522a=>VisuMZ[_0x31abe7(0x148)]({},JSON[_0x31abe7(0x159)](_0x22522a)));break;default:continue;}_0x6cf66b[_0xfcc5e9]=_0x2fd40c;}}return _0x6cf66b;},(_0x1b5ec5=>{const _0x4614bf=_0x19098e,_0x1fb58e=_0x1b5ec5['name'];for(const _0x1fc2f2 of dependencies){if(_0x4614bf(0x203)!==_0x4614bf(0x203)){if(!(_0x18c96d instanceof _0x1b3418))throw new _0x2d80e1(_0x4614bf(0x208));!this['_colorTone'][_0x4614bf(0x116)](_0x271758)&&(this[_0x4614bf(0x1fa)]=_0x213fac['clone'](),this[_0x4614bf(0x174)]());}else{if(!Imported[_0x1fc2f2]){if('soekE'==='qmDlv'){const _0x244839=_0x2349f4(_0x3c8051['$1']);if(_0x244839>0x0&&_0x244839===_0x2e0bf0['id']&&_0x3ffd3c[_0x4614bf(0x114)]!=='')_0x43cf3a[_0x4614bf(0x16c)](_0x22f96c);_0x54c612=_0x571112[_0x4614bf(0x180)](_0x4879dc);}else{alert(_0x4614bf(0x183)[_0x4614bf(0x198)](_0x1fb58e,_0x1fc2f2)),SceneManager['exit']();break;}}}}const _0x1ae73d=_0x1b5ec5[_0x4614bf(0x142)];if(_0x1ae73d[_0x4614bf(0x1ad)](/\[Version[ ](.*?)\]/i)){if(_0x4614bf(0xb6)===_0x4614bf(0xb6)){const _0x520f55=Number(RegExp['$1']);_0x520f55!==VisuMZ[label]['version']&&(alert(_0x4614bf(0xbd)[_0x4614bf(0x198)](_0x1fb58e,_0x520f55)),SceneManager['exit']());}else _0x44cf7a[_0x4614bf(0x1a5)]=_0x104289[_0x4614bf(0x1cb)];}if(_0x1ae73d['match'](/\[Tier[ ](\d+)\]/i)){const _0x134ab9=Number(RegExp['$1']);if(_0x134ab9<tier)alert(_0x4614bf(0x1b6)[_0x4614bf(0x198)](_0x1fb58e,_0x134ab9,tier)),SceneManager[_0x4614bf(0x155)]();else{if('fHkAN'==='plPvq'){const _0xa5d108=this[_0x4614bf(0x17c)](_0x12ef88);!_0xa5d108?(this['createNewParallaxLayer'](_0x1b84a6['getVisualParallaxSettings'](_0x1f3010)),this['sortVisualParallaxes']()):(_0xa5d108['loadBitmap'](),_0x543331&&_0xa5d108[_0x4614bf(0x16f)]['addLoadListener'](_0xa5d108['createMaskBitmap']['bind'](_0xa5d108)));}else tier=Math[_0x4614bf(0x178)](_0x134ab9,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x4614bf(0x1dc)],_0x1b5ec5[_0x4614bf(0xb3)]);})(pluginData),VisuMZ[_0x19098e(0x1f0)][_0x19098e(0x1b3)]=function(){return{'id':0x0,'filename':'','_parallaxZero':![],'_parallaxLoopX':![],'_parallaxLoopY':![],'_parallaxSx':0x0,'_parallaxSy':0x0,'_parallaxX':0x0,'_parallaxY':0x0,'opacity':0xff,'targetOpacity':0xff,'opacityDuration':0x0,'blendMode':0x0,'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[]};},PluginManager[_0x19098e(0x124)](pluginData[_0x19098e(0x13b)],_0x19098e(0x197),_0x2b308b=>{const _0x221204=_0x19098e;VisuMZ[_0x221204(0x148)](_0x2b308b,_0x2b308b);if(_0x2b308b['id']<=0x0)return;if(_0x2b308b[_0x221204(0x114)]===''||_0x2b308b[_0x221204(0x114)]===_0x221204(0x1d1))return;let _0xeb0b21=JsonEx['makeDeepCopy'](_0x2b308b[_0x221204(0x1fc)]);if(!_0xeb0b21[_0x221204(0xfe)]('maskRegions'))_0xeb0b21=VisuMZ['VisualParallaxes'][_0x221204(0x1b3)]();_0xeb0b21[_0x221204(0x114)]=_0x2b308b[_0x221204(0x114)],_0xeb0b21['id']=_0x2b308b['id'];if(_0x2b308b[_0x221204(0x177)]==='water'){if(_0x221204(0xe6)!==_0x221204(0xe6))return _0xd05019(_0x4faada['$1'])['split'](',')[_0x221204(0xe1)](_0x3e6c1b=>_0x53642f(_0x3e6c1b)||0x1)[_0x221204(0x20c)](0x0);else _0xeb0b21[_0x221204(0x189)][_0x221204(0x141)]<=0x0&&(_0xeb0b21[_0x221204(0x189)]=JsonEx['makeDeepCopy']($gameMap[_0x221204(0x1d2)]())),_0xeb0b21[_0x221204(0x1d6)][_0x221204(0x141)]<=0x0&&(_0xeb0b21[_0x221204(0x1d6)]=JsonEx['makeDeepCopy']($gameMap[_0x221204(0xea)]()));}if(_0x2b308b[_0x221204(0x177)]===_0x221204(0x181)){_0xeb0b21[_0x221204(0x189)][_0x221204(0x141)]<=0x0&&(_0x221204(0x1ae)===_0x221204(0x1ae)?_0xeb0b21[_0x221204(0x189)]=JsonEx[_0x221204(0x180)]($gameMap[_0x221204(0x10b)]()):_0x3dc93d[_0x221204(0x19d)]=!![]);if(_0xeb0b21['maskTerrainTags']['length']<=0x0){if(_0x221204(0x1d7)!=='aZRbW')_0xeb0b21[_0x221204(0x1d6)]=JsonEx[_0x221204(0x180)]($gameMap[_0x221204(0xe0)]());else return _0x1d9914['_parallaxX']*this['tileWidth']()/0x2;}}while(_0xeb0b21['colorTone'][_0x221204(0x141)]<0x4){_0x221204(0x143)!=='YosSa'?(this['addChild'](_0x317613),this['_solidReflectLayer']['mask']=_0x4508e5):_0xeb0b21[_0x221204(0x101)][_0x221204(0x16c)](0x0);}_0xeb0b21[_0x221204(0x1d9)]=0x0,_0xeb0b21[_0x221204(0x1b2)]=0x0,_0xeb0b21[_0x221204(0x1cb)]=_0x2b308b[_0x221204(0x1a5)],_0xeb0b21[_0x221204(0x19c)]=0x0,$gameMap[_0x221204(0x1eb)](_0xeb0b21);}),PluginManager[_0x19098e(0x124)](pluginData[_0x19098e(0x13b)],_0x19098e(0x167),_0x281c08=>{const _0x37805b=_0x19098e;if(!SceneManager[_0x37805b(0x12e)]())return;VisuMZ[_0x37805b(0x148)](_0x281c08,_0x281c08);const _0x1405fb=_0x281c08[_0x37805b(0xf1)];for(const _0x2a84d3 of _0x1405fb){if(_0x37805b(0x1f7)==='pYsUy')_0x8e7bfb['maskTerrainTags']=_0x6fd4a9[_0x37805b(0x180)](_0x1a8fa8[_0x37805b(0xe0)]());else{const _0x7881c1=$gameMap[_0x37805b(0x146)](_0x2a84d3);if(!_0x7881c1)continue;_0x7881c1[_0x37805b(0x1cb)]=_0x281c08['targetOpacity']||0x0,_0x7881c1[_0x37805b(0x19c)]=_0x281c08[_0x37805b(0x19c)]||0x0;if(_0x7881c1['opacityDuration']<=0x0){if(_0x37805b(0x12c)===_0x37805b(0x12c))_0x7881c1['opacity']=_0x7881c1[_0x37805b(0x1cb)];else return(_0x4b2d34(_0x3a2c56['$1'])||0x0)['clamp'](0x0,0xff);}}}}),PluginManager['registerCommand'](pluginData[_0x19098e(0x13b)],_0x19098e(0x121),_0x4ab1c5=>{const _0x4805f6=_0x19098e;if(!SceneManager[_0x4805f6(0x12e)]())return;VisuMZ['ConvertParams'](_0x4ab1c5,_0x4ab1c5);const _0x48911c=_0x4ab1c5['list'];for(const _0xbf5f1e of _0x48911c){if('LJIvz'!==_0x4805f6(0x192))$gameMap[_0x4805f6(0xdb)](_0xbf5f1e);else return _0x20f205[_0x4805f6(0x1b2)]*this['tileHeight']()/0x2;}}),VisuMZ[_0x19098e(0x1f0)][_0x19098e(0x100)]={'Start':/<(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'End':/<\/(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'Filename':/(?:FILENAME|NAME):[ ](.*)/i,'HorzLoop':/(?:HORZ|HORIZONTAL) (?:LOOP|SCROLL):[ ](.*)/i,'VertLoop':/(?:VERT|VERTICAL) (?:LOOP|SCROLL):[ ](.*)/i,'ScrollLock':/<(?:MAP|SCROLL)[ ](?:LOCK|LOCKED)>/i,'OpacityRate':/(?:OPACITY):[ ](\d+)([%％])/i,'OpacityFlat':/(?:OPACITY):[ ](\d+)/i,'BlendMode':/BLEND MODE:[ ](.*)/i,'Hue':/HUE:[ ](\d+)/i,'HueShift':/HUE (?:SHIFT|SPEED):[ ](.*)/i,'Tone':/(?:COLOR TONE|TONE|TINT):[ ](.*)/i,'MaskRegions':/(?:REGION|REGIONS):[ ](.*)/i,'MaskTerrainTags':/TERRAIN (?:TAG|TAGS):[ ](.*)/i,'WaterRegions':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'WaterTerrainTags':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'WaterTop':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TOP>/i,'WaterBottom':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOTTOM>/i,'WaterBlur':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BLUR:[ ](.*)>/i,'WaterOpacityRate':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'WaterOpacityFlat':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)>/i,'WaterBoundary':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOUNDARY:[ ](.*)>/i,'WaterAmplitude':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:AMP|AMPLITUDE):[ ](.*)>/i,'WaterWavelength':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:WAVE|WAVELENGTH):[ ](.*)>/i,'SolidRegions':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'SolidTerrainTags':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'SolidTop':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TOP>/i,'SolidBottom':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BOTTOM>/i,'SolidBlur':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BLUR:[ ](.*)>/i,'SolidOpacityRate':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'SolidOpacityFlat':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)>/i,'NoReflection':/<NO (?:REFLECT|REFLECTION|REFLECTIONS)>/i},SceneManager[_0x19098e(0xcc)]=function(){const _0x4faad1=_0x19098e;return this[_0x4faad1(0x195)]&&this[_0x4faad1(0x195)][_0x4faad1(0x15b)]===Scene_Map;},SceneManager[_0x19098e(0x12e)]=function(){const _0x365155=_0x19098e;return this[_0x365155(0x195)]&&this[_0x365155(0x195)]instanceof Scene_Map;},VisuMZ[_0x19098e(0x1f0)][_0x19098e(0x10e)]=Game_Map[_0x19098e(0x179)][_0x19098e(0xcb)],Game_Map[_0x19098e(0x179)][_0x19098e(0xcb)]=function(_0x7a50c9){const _0x22b7dc=_0x19098e;VisuMZ[_0x22b7dc(0x1f0)]['Game_Map_setup'][_0x22b7dc(0x1cc)](this,_0x7a50c9),this[_0x22b7dc(0x1a0)](),this[_0x22b7dc(0x200)]();},Game_Map[_0x19098e(0x12a)]=VisuMZ[_0x19098e(0x1f0)][_0x19098e(0x1dc)]['WaterReflect'][_0x19098e(0x153)],Game_Map[_0x19098e(0x11d)]=VisuMZ['VisualParallaxes']['Settings'][_0x19098e(0x127)][_0x19098e(0x202)],Game_Map['prototype'][_0x19098e(0x1a9)]=function(){const _0x43482d=_0x19098e;if(DataManager['isEventTest']())return!![];if(this[_0x43482d(0x151)]()||this['isLoopVertical']())return!![];const _0xba03d9=VisuMZ[_0x43482d(0x1f0)]['RegExp'],_0x2f690e=$dataMap['note']||'';if(_0x2f690e[_0x43482d(0x1ad)](_0xba03d9[_0x43482d(0x187)]))return!![];else{if('KmiGX'!=='qCYFU')return![];else this[_0x43482d(0x182)](_0x280658),this[_0x43482d(0x176)][_0x43482d(0x1ed)]=_0x3fad4b;}},Game_Map[_0x19098e(0x179)][_0x19098e(0x1d2)]=function(){const _0x3d1675=_0x19098e,_0x319544=VisuMZ[_0x3d1675(0x1f0)][_0x3d1675(0x100)],_0xffa599=$dataMap[_0x3d1675(0x19f)]||'';if(_0xffa599['match'](_0x319544[_0x3d1675(0x1e1)])){if(_0x3d1675(0x162)===_0x3d1675(0x162))return String(RegExp['$1'])['split'](',')[_0x3d1675(0xe1)](_0x311d74=>Number(_0x311d74)||0x1)[_0x3d1675(0x20c)](0x0);else _0x5a3eec[_0x3d1675(0x189)]=_0x210916[_0x3d1675(0x180)](_0x1f7298['getWaterReflectionRegions']());}return JsonEx['makeDeepCopy'](Game_Map[_0x3d1675(0x12a)])[_0x3d1675(0x20c)](0x0);},Game_Map[_0x19098e(0x179)][_0x19098e(0xea)]=function(){const _0x135a59=_0x19098e,_0x1287e1=VisuMZ[_0x135a59(0x1f0)]['RegExp'],_0x161057=$dataMap[_0x135a59(0x19f)]||'';if(_0x161057['match'](_0x1287e1['WaterTerrainTags']))return String(RegExp['$1'])[_0x135a59(0x207)](',')['map'](_0x4d0e3c=>Number(_0x4d0e3c)||0x1)[_0x135a59(0x20c)](0x0);return JsonEx['makeDeepCopy'](Game_Map['DEFAULT_WATER_REFLECTION_TERRAINTAGS'])[_0x135a59(0x20c)](0x0);},Game_Map[_0x19098e(0x1c5)]=VisuMZ[_0x19098e(0x1f0)]['Settings'][_0x19098e(0x127)]['Top'],Game_Map[_0x19098e(0xd8)]=VisuMZ[_0x19098e(0x1f0)]['Settings']['WaterReflect'][_0x19098e(0x18e)],Game_Map[_0x19098e(0x1f2)]=VisuMZ[_0x19098e(0x1f0)][_0x19098e(0x1dc)]['WaterReflect'][_0x19098e(0x122)],Game_Map['DEFAULT_WATER_REFLECTION_FILTER_BOUNDARY']=VisuMZ[_0x19098e(0x1f0)]['Settings'][_0x19098e(0x127)][_0x19098e(0xcf)],Game_Map[_0x19098e(0x119)]=[VisuMZ[_0x19098e(0x1f0)][_0x19098e(0x1dc)][_0x19098e(0x127)][_0x19098e(0xbb)],VisuMZ[_0x19098e(0x1f0)][_0x19098e(0x1dc)][_0x19098e(0x127)][_0x19098e(0x135)]],Game_Map[_0x19098e(0x18f)]=[VisuMZ['VisualParallaxes'][_0x19098e(0x1dc)][_0x19098e(0x127)]['WaveStart'],VisuMZ['VisualParallaxes']['Settings'][_0x19098e(0x127)][_0x19098e(0x1bf)]],Game_Map[_0x19098e(0x179)][_0x19098e(0x166)]=function(){const _0x2225c4=_0x19098e,_0x3bf33b=VisuMZ[_0x2225c4(0x1f0)][_0x2225c4(0x100)],_0x2e8ede=$dataMap['note']||'';if(_0x2e8ede[_0x2225c4(0x1ad)](_0x3bf33b[_0x2225c4(0x1c3)]))return!![];else{if(_0x2e8ede[_0x2225c4(0x1ad)](_0x3bf33b[_0x2225c4(0x130)])){if(_0x2225c4(0xee)!==_0x2225c4(0xee))this['_parallaxContainer'][_0x2225c4(0x117)]['sort']((_0x2927c9,_0x4c8a4d)=>_0x2927c9[_0x2225c4(0x1cd)]-_0x4c8a4d['_id']);else return![];}}return Game_Map['DEFAULT_WATER_REFLECTION_FILTER_TOP'];},Game_Map[_0x19098e(0x179)][_0x19098e(0x15e)]=function(){const _0x2bb2d0=_0x19098e,_0x6c7132=VisuMZ['VisualParallaxes']['RegExp'],_0x24523a=$dataMap['note']||'';if(_0x24523a['match'](_0x6c7132[_0x2bb2d0(0x17e)])){if(_0x2bb2d0(0x14e)==='uymjw')this['_id']=_0xc7bf24,_0x4cb857[_0x2bb2d0(0x179)][_0x2bb2d0(0x160)][_0x2bb2d0(0x1cc)](this),this[_0x2bb2d0(0xc2)](),this[_0x2bb2d0(0x145)](),this[_0x2bb2d0(0x16f)]['addLoadListener'](this[_0x2bb2d0(0x14d)][_0x2bb2d0(0xe5)](this));else return Math[_0x2bb2d0(0x178)](0x0,Number(RegExp['$1'])||0x0);}return Game_Map[_0x2bb2d0(0xd8)];},Game_Map[_0x19098e(0x179)][_0x19098e(0x191)]=function(){const _0x4e7e3d=_0x19098e,_0x142217=VisuMZ[_0x4e7e3d(0x1f0)][_0x4e7e3d(0x100)],_0x21c7df=$dataMap[_0x4e7e3d(0x19f)]||'';if(_0x21c7df[_0x4e7e3d(0x1ad)](_0x142217[_0x4e7e3d(0xd9)]))return Math['round']((Number(RegExp['$1'])||0x0)*0.01*0xff)[_0x4e7e3d(0x123)](0x0,0xff);else{if(_0x21c7df['match'](_0x142217[_0x4e7e3d(0x1f1)]))return(Number(RegExp['$1'])||0x0)[_0x4e7e3d(0x123)](0x0,0xff);}return Game_Map[_0x4e7e3d(0x173)];},Game_Map['prototype'][_0x19098e(0x104)]=function(){const _0x4488e4=_0x19098e,_0xf35f33=VisuMZ['VisualParallaxes'][_0x4488e4(0x100)],_0xb1a4cd=$dataMap[_0x4488e4(0x19f)]||'';if(_0xb1a4cd[_0x4488e4(0x1ad)](_0xf35f33[_0x4488e4(0x1a7)]))return(Number(RegExp['$1'])||0x0)[_0x4488e4(0x123)](0x0,0x1);return Game_Map[_0x4488e4(0x112)];},Game_Map[_0x19098e(0x179)][_0x19098e(0xda)]=function(){const _0x2b4c6e=_0x19098e,_0x2b3f02=VisuMZ[_0x2b4c6e(0x1f0)][_0x2b4c6e(0x100)],_0x39d50c=$dataMap[_0x2b4c6e(0x19f)]||'';if(_0x39d50c[_0x2b4c6e(0x1ad)](_0x2b3f02['WaterAmplitude'])){if('CSIjp'!==_0x2b4c6e(0x13c)){const _0x36e366=String(RegExp['$1'])[_0x2b4c6e(0x207)](',')[_0x2b4c6e(0xe1)](_0x517bb2=>Number(_0x517bb2)||0x0);if(_0x36e366[_0x2b4c6e(0x141)]<=0x1)_0x36e366[0x1]=_0x36e366[0x0];}else _0x379585['maskRegions']=_0x402e0b['makeDeepCopy'](_0x2600c7['getSolidReflectionRegions']());}return JsonEx[_0x2b4c6e(0x180)](Game_Map['DEFAULT_WATER_REFLECTION_FILTER_AMPLITUDE'])[_0x2b4c6e(0x20c)](0x0);},Game_Map['prototype'][_0x19098e(0x137)]=function(){const _0x5826c4=_0x19098e,_0x38b103=VisuMZ[_0x5826c4(0x1f0)][_0x5826c4(0x100)],_0x2e3b33=$dataMap[_0x5826c4(0x19f)]||'';if(_0x2e3b33[_0x5826c4(0x1ad)](_0x38b103[_0x5826c4(0x1ac)])){const _0x2d7455=String(RegExp['$1'])['split'](',')['map'](_0xfe09c8=>Number(_0xfe09c8)||0x0);if(_0x2d7455[_0x5826c4(0x141)]<=0x1)_0x2d7455[0x1]=_0x2d7455[0x0];}return JsonEx[_0x5826c4(0x180)](Game_Map['DEFAULT_WATER_REFLECTION_FILTER_WAVELENGTH'])[_0x5826c4(0x20c)](0x0);},Game_Map[_0x19098e(0x169)]=VisuMZ[_0x19098e(0x1f0)]['Settings']['SolidReflect']['Regions'],Game_Map['DEFAULT_SOLID_REFLECTION_TERRAINTAGS']=VisuMZ[_0x19098e(0x1f0)][_0x19098e(0x1dc)][_0x19098e(0xde)][_0x19098e(0x202)],Game_Map[_0x19098e(0x179)][_0x19098e(0x10b)]=function(){const _0x3581e7=_0x19098e,_0x109649=VisuMZ[_0x3581e7(0x1f0)][_0x3581e7(0x100)],_0x16f8c8=$dataMap[_0x3581e7(0x19f)]||'';if(_0x16f8c8[_0x3581e7(0x1ad)](_0x109649[_0x3581e7(0x1a3)])){if(_0x3581e7(0x16a)!==_0x3581e7(0x16a))this[_0x3581e7(0x1b1)]=this[_0x3581e7(0xca)]()[_0x3581e7(0x114)],this['bitmap']=_0x439ee7[_0x3581e7(0xff)](this[_0x3581e7(0x1b1)]);else return String(RegExp['$1'])[_0x3581e7(0x207)](',')[_0x3581e7(0xe1)](_0x1146e3=>Number(_0x1146e3)||0x1)[_0x3581e7(0x20c)](0x0);}return JsonEx['makeDeepCopy'](Game_Map[_0x3581e7(0x169)])['remove'](0x0);},Game_Map[_0x19098e(0x179)][_0x19098e(0xe0)]=function(){const _0x32f4b7=_0x19098e,_0x47b0d3=VisuMZ[_0x32f4b7(0x1f0)][_0x32f4b7(0x100)],_0x1e64c2=$dataMap[_0x32f4b7(0x19f)]||'';if(_0x1e64c2[_0x32f4b7(0x1ad)](_0x47b0d3[_0x32f4b7(0x18c)])){if('eReSs'!==_0x32f4b7(0x1a6))this['_maskSprite']=new _0x1d6737(),this[_0x32f4b7(0x171)]();else return String(RegExp['$1'])['split'](',')[_0x32f4b7(0xe1)](_0x1555ac=>Number(_0x1555ac)||0x1)['remove'](0x0);}return JsonEx[_0x32f4b7(0x180)](Game_Map[_0x32f4b7(0x158)])[_0x32f4b7(0x20c)](0x0);},Game_Map[_0x19098e(0x139)]=VisuMZ['VisualParallaxes'][_0x19098e(0x1dc)][_0x19098e(0xde)]['Top'],Game_Map[_0x19098e(0xe9)]=VisuMZ[_0x19098e(0x1f0)][_0x19098e(0x1dc)][_0x19098e(0xde)][_0x19098e(0x18e)],Game_Map[_0x19098e(0x173)]=VisuMZ[_0x19098e(0x1f0)][_0x19098e(0x1dc)]['SolidReflect']['Opacity'],Game_Map[_0x19098e(0x179)][_0x19098e(0x106)]=function(){const _0x441987=_0x19098e,_0x4a57ec=VisuMZ[_0x441987(0x1f0)][_0x441987(0x100)],_0x4e09c6=$dataMap['note']||'';if(_0x4e09c6[_0x441987(0x1ad)](_0x4a57ec[_0x441987(0x131)]))return!![];else{if(_0x4e09c6[_0x441987(0x1ad)](_0x4a57ec[_0x441987(0x1ca)]))return![];}return Game_Map[_0x441987(0x139)];},Game_Map[_0x19098e(0x179)]['getSolidReflectionBlur']=function(){const _0x2666f9=_0x19098e,_0x4d4673=VisuMZ[_0x2666f9(0x1f0)]['RegExp'],_0x122621=$dataMap[_0x2666f9(0x19f)]||'';if(_0x122621[_0x2666f9(0x1ad)](_0x4d4673['SolidBlur']))return Math['max'](0x0,Number(RegExp['$1'])||0x0);return Game_Map[_0x2666f9(0xe9)];},Game_Map[_0x19098e(0x179)][_0x19098e(0xe3)]=function(){const _0x182cc1=_0x19098e,_0x53cba8=VisuMZ[_0x182cc1(0x1f0)][_0x182cc1(0x100)],_0x334647=$dataMap[_0x182cc1(0x19f)]||'';if(_0x334647['match'](_0x53cba8[_0x182cc1(0x1db)]))return Math[_0x182cc1(0x1d5)]((Number(RegExp['$1'])||0x0)*0.01*0xff)['clamp'](0x0,0xff);else{if(_0x334647['match'](_0x53cba8['SolidOpacityFlat']))return(Number(RegExp['$1'])||0x0)[_0x182cc1(0x123)](0x0,0xff);}return Game_Map[_0x182cc1(0x173)];},Game_Map[_0x19098e(0x179)][_0x19098e(0x200)]=function(){const _0x43e5d1=_0x19098e,_0x3ae14c=this[_0x43e5d1(0x1d2)](),_0x4f3460=this[_0x43e5d1(0xea)](),_0x1a44de=this[_0x43e5d1(0x10b)](),_0x1fad87=this['getSolidReflectionTerrainTags'](),_0x22068f=this['width'](),_0x2e704b=this[_0x43e5d1(0x18b)]();this['_hasWaterReflections']=![],this[_0x43e5d1(0x12b)]=![];for(let _0x7cd4ee=0x0;_0x7cd4ee<_0x22068f;_0x7cd4ee++){if('qPYwX'===_0x43e5d1(0xdf))_0x33e24e['_parallaxY']+=_0x232987[_0x43e5d1(0xd3)]/this[_0x43e5d1(0x1ea)]()/0x2;else for(let _0x3984da=0x0;_0x3984da<_0x22068f;_0x3984da++){if(_0x43e5d1(0xb5)!=='eFfWe'){const _0x4346c5=this[_0x43e5d1(0xc6)](_0x7cd4ee,_0x3984da);if(_0x3ae14c[_0x43e5d1(0xef)](_0x4346c5)){if(_0x43e5d1(0xc4)!=='tvYGV')this[_0x43e5d1(0x175)]=!![];else return!![];}_0x1a44de['includes'](_0x4346c5)&&(this[_0x43e5d1(0x12b)]=!![]);const _0x40c606=this['terrainTag'](_0x7cd4ee,_0x3984da);_0x4f3460['includes'](_0x40c606)&&(this[_0x43e5d1(0x175)]=!![]);_0x1fad87[_0x43e5d1(0xef)](_0x40c606)&&(this[_0x43e5d1(0x12b)]=!![]);if(this[_0x43e5d1(0x175)]&&this['_hasSolidReflections'])break;}else _0x31391d[_0x43e5d1(0x1d6)]=_0x1d396a[_0x43e5d1(0x180)](_0x15441e['getWaterReflectionTerrainTags']());}}},Game_Map[_0x19098e(0x179)]['hasWaterReflections']=function(){const _0x2da094=_0x19098e;if(this[_0x2da094(0x175)]===undefined)this[_0x2da094(0x200)]();return this[_0x2da094(0x175)];},Game_Map[_0x19098e(0x179)][_0x19098e(0xbe)]=function(){const _0x1ffeca=_0x19098e;if(this['_hasSolidReflections']===undefined)this[_0x1ffeca(0x200)]();return this[_0x1ffeca(0x12b)];},Game_Map[_0x19098e(0x179)][_0x19098e(0x1a0)]=function(){const _0x3e7aa6=_0x19098e;this[_0x3e7aa6(0x109)]=[null];if(!$dataMap)return;const _0x12a3c7=VisuMZ[_0x3e7aa6(0x1f0)][_0x3e7aa6(0x161)]();for(const _0x154d9e of _0x12a3c7){if(_0x3e7aa6(0x188)==='yoqhW'){if(!_0x154d9e)continue;this[_0x3e7aa6(0x109)][_0x154d9e['id']]=_0x154d9e;}else return _0x65fa05(_0x30c8cc['$1'])[_0x3e7aa6(0x207)](',')[_0x3e7aa6(0xe1)](_0x4d4b47=>_0x249539(_0x4d4b47)||0x1)[_0x3e7aa6(0x20c)](0x0);}},VisuMZ[_0x19098e(0x1f0)][_0x19098e(0x161)]=function(){const _0x5b602c=_0x19098e;if(!$dataMap)return[];const _0x123722=[],_0x3009bc=VisuMZ[_0x5b602c(0x1f0)][_0x5b602c(0x1b3)]();if(!$dataMap['note'])return[];const _0x560e29=VisuMZ[_0x5b602c(0x1f0)]['RegExp'],_0x30f312=$dataMap[_0x5b602c(0x19f)][_0x5b602c(0x207)](/[\r\n]+/);let _0x1b5a9e=JsonEx['makeDeepCopy'](_0x3009bc);for(const _0x4f3dfb of _0x30f312){if(_0x4f3dfb[_0x5b602c(0x1ad)](_0x560e29['Start'])){_0x1b5a9e['id']=Number(RegExp['$1']);if(_0x4f3dfb[_0x5b602c(0x1ad)](/WATER/i))_0x1b5a9e['maskRegions']=JsonEx['makeDeepCopy']($gameMap['getWaterReflectionRegions']()),_0x1b5a9e[_0x5b602c(0x1d6)]=JsonEx[_0x5b602c(0x180)]($gameMap[_0x5b602c(0xea)]());else _0x4f3dfb['match'](/SOLID/i)&&(_0x1b5a9e[_0x5b602c(0x189)]=JsonEx[_0x5b602c(0x180)]($gameMap[_0x5b602c(0x10b)]()),_0x1b5a9e[_0x5b602c(0x1d6)]=JsonEx[_0x5b602c(0x180)]($gameMap['getSolidReflectionTerrainTags']()));}else{if(_0x4f3dfb['match'](_0x560e29['End'])){if(_0x5b602c(0xc7)===_0x5b602c(0x14a)){const _0x5df743=_0x170580(_0x8a7e2['$1'])['toUpperCase']()[_0x5b602c(0x1fb)](),_0x59e7d2=[_0x5b602c(0xbf),_0x5b602c(0x210),_0x5b602c(0x1f3),_0x5b602c(0x1c6)];_0x53d562[_0x5b602c(0x1e3)]=_0x59e7d2[_0x5b602c(0xc5)](_0x5df743)[_0x5b602c(0x123)](0x0,0x3);}else{const _0x4d2944=Number(RegExp['$1']);if(_0x4d2944>0x0&&_0x4d2944===_0x1b5a9e['id']&&_0x1b5a9e[_0x5b602c(0x114)]!=='')_0x123722[_0x5b602c(0x16c)](_0x1b5a9e);_0x1b5a9e=JsonEx[_0x5b602c(0x180)](_0x3009bc);}}else{if(_0x1b5a9e['id']<=0x0){if(_0x5b602c(0x10a)===_0x5b602c(0x1be))return(_0x3d514f(_0x407d59['$1'])||0x0)[_0x5b602c(0x123)](0x0,0xff);else continue;}}}if(_0x4f3dfb[_0x5b602c(0x1ad)](_0x560e29[_0x5b602c(0xd1)])){if(_0x5b602c(0x17f)===_0x5b602c(0x17f))_0x1b5a9e[_0x5b602c(0x114)]=String(RegExp['$1'])[_0x5b602c(0x1fb)](),_0x1b5a9e['filename'][_0x5b602c(0xdd)](0x0)==='!'&&('IRzvK'===_0x5b602c(0x1e6)?_0x1b5a9e[_0x5b602c(0x19d)]=!![]:(_0x37bfe9[_0x5b602c(0x1f0)][_0x5b602c(0x1c4)][_0x5b602c(0x1cc)](this),this[_0x5b602c(0x1bc)]()));else throw new _0x2f0c15(_0x5b602c(0x208));}else{if(_0x4f3dfb[_0x5b602c(0x1ad)](_0x560e29[_0x5b602c(0x11f)]))_0x1b5a9e[_0x5b602c(0x1ab)]=!![],_0x1b5a9e[_0x5b602c(0x10f)]=Number(RegExp['$1'])||0x0;else{if(_0x4f3dfb[_0x5b602c(0x1ad)](_0x560e29['VertLoop'])){if('gHujT'===_0x5b602c(0x1f4))_0x1b5a9e['_parallaxLoopY']=!![],_0x1b5a9e['_parallaxSy']=Number(RegExp['$1'])||0x0;else return!![];}else{if(_0x4f3dfb[_0x5b602c(0x1ad)](_0x560e29[_0x5b602c(0x1f5)]))_0x1b5a9e['_parallaxZero']=!![];else{if(_0x4f3dfb['match'](_0x560e29[_0x5b602c(0x1d4)])){const _0x55c67d=Number(RegExp['$1'])*0.01;_0x1b5a9e[_0x5b602c(0x1a5)]=Math[_0x5b602c(0x1d5)](_0x55c67d*0xff)[_0x5b602c(0x123)](0x0,0xff);}else{if(_0x4f3dfb[_0x5b602c(0x1ad)](_0x560e29[_0x5b602c(0x15c)]))_0x1b5a9e['opacity']=Number(RegExp['$1'])[_0x5b602c(0x123)](0x0,0xff);else{if(_0x4f3dfb[_0x5b602c(0x1ad)](_0x560e29[_0x5b602c(0xaf)])){if('vagAi'!==_0x5b602c(0x111))_0xfc8c9e['_parallaxY']-=_0x442974;else{const _0x3ffcf2=String(RegExp['$1'])[_0x5b602c(0x13f)]()['trim'](),_0xd58022=['NORMAL','ADDITIVE',_0x5b602c(0x1f3),_0x5b602c(0x1c6)];_0x1b5a9e['blendMode']=_0xd58022[_0x5b602c(0xc5)](_0x3ffcf2)[_0x5b602c(0x123)](0x0,0x3);}}else{if(_0x4f3dfb[_0x5b602c(0x1ad)](_0x560e29['Hue']))_0x1b5a9e[_0x5b602c(0xce)]=Number(RegExp['$1'])['clamp'](0x0,0x168);else{if(_0x4f3dfb[_0x5b602c(0x1ad)](_0x560e29['HueShift']))_0x1b5a9e[_0x5b602c(0xdc)]=Number(RegExp['$1'])||0x0;else{if(_0x4f3dfb[_0x5b602c(0x1ad)](_0x560e29['Tone'])){if(_0x5b602c(0x107)===_0x5b602c(0x107)){const _0x263e6b=String(RegExp['$1'])[_0x5b602c(0x207)](',')[_0x5b602c(0xe1)](_0x15963b=>Number(_0x15963b)||0x0);while(_0x263e6b[_0x5b602c(0x141)]<0x4)_0x263e6b['push'](0x0);_0x1b5a9e[_0x5b602c(0x101)]=_0x263e6b;}else _0x309ef8['_parallaxY']=this[_0x5b602c(0x1c2)];}else{if(_0x4f3dfb[_0x5b602c(0x1ad)](_0x560e29[_0x5b602c(0x14f)])){if(_0x5b602c(0x19e)===_0x5b602c(0xf8))this['_hasWaterReflections']=!![];else{const _0x593d11=String(RegExp['$1'])[_0x5b602c(0x207)](',')['map'](_0x1ba110=>Number(_0x1ba110)||0x1);_0x1b5a9e['maskRegions']=_0x593d11;}}else{if(_0x4f3dfb[_0x5b602c(0x1ad)](_0x560e29['MaskTerrainTags'])){if('Mxatn'!==_0x5b602c(0x1a2))_0xb363f0[_0x5b602c(0x201)](_0x3b3c6d);else{const _0x2234a0=String(RegExp['$1'])[_0x5b602c(0x207)](',')['map'](_0x2d1701=>Number(_0x2d1701)||0x1);_0x1b5a9e[_0x5b602c(0x1d6)]=_0x2234a0;}}}}}}}}}}}}}}return _0x123722;},Game_Map[_0x19098e(0x179)][_0x19098e(0x1b8)]=function(){const _0x2ca26b=_0x19098e;return this['_visualParallaxSettings'][_0x2ca26b(0x16b)](_0x33e6e7=>!!_0x33e6e7);},Game_Map[_0x19098e(0x179)][_0x19098e(0x146)]=function(_0x16a6ab){const _0xc62fde=_0x19098e;return this['_visualParallaxSettings']=this[_0xc62fde(0x109)]||[],this[_0xc62fde(0x109)][_0x16a6ab]||null;},Game_Map[_0x19098e(0x179)][_0x19098e(0x118)]=function(_0x2f15c0){const _0xe882d4=_0x19098e,_0x33d24d=this[_0xe882d4(0x146)](_0x2f15c0);if(_0x33d24d[_0xe882d4(0x19d)]){if(_0xe882d4(0x205)!=='WRtPS')return Math[_0xe882d4(0x1e2)](_0x33d24d[_0xe882d4(0x1d9)]*this[_0xe882d4(0x13e)]());else _0x28212a[_0xe882d4(0xf3)]=!![],this[_0xe882d4(0x1f9)][_0xe882d4(0x182)](_0x1016a5),_0x232cae[_0xe882d4(0x1a1)]['y']=-0.85,_0x461a3e[_0xe882d4(0x164)]=_0x1dd338[_0xe882d4(0x164)]||[],this[_0xe882d4(0x176)][_0xe882d4(0x152)]&&_0x278acc[_0xe882d4(0x164)][_0xe882d4(0x16c)](this[_0xe882d4(0x176)][_0xe882d4(0x152)]);}else{if(_0x33d24d[_0xe882d4(0x1ab)]){if(_0xe882d4(0x120)===_0xe882d4(0x120))return _0x33d24d[_0xe882d4(0x1d9)]*this[_0xe882d4(0x13e)]()/0x2;else this[_0xe882d4(0x164)]=[];}else return 0x0;}},Game_Map[_0x19098e(0x179)][_0x19098e(0x186)]=function(_0x2de30d){const _0x5f4166=_0x19098e,_0x20c3aa=this['getVisualParallaxSettings'](_0x2de30d);if(_0x20c3aa['_parallaxZero']){if(_0x5f4166(0x20b)==='ylKJY')_0x253b23[_0x5f4166(0x1d9)]=this[_0x5f4166(0x129)];else return Math[_0x5f4166(0x1e2)](_0x20c3aa[_0x5f4166(0x1b2)]*this[_0x5f4166(0x1ea)]());}else{if(_0x20c3aa[_0x5f4166(0xd6)]){if(_0x5f4166(0xbc)!==_0x5f4166(0xbc)){if([0x6c,0x198][_0x5f4166(0xef)](_0x4ad839[_0x5f4166(0x1ba)])){if(_0x464c28!=='')_0x2a9095+='\x0a';_0x1fead4+=_0x21926d[_0x5f4166(0xb3)][0x0];}}else return _0x20c3aa[_0x5f4166(0x1b2)]*this[_0x5f4166(0x1ea)]()/0x2;}else{if(_0x5f4166(0x147)===_0x5f4166(0x1df))_0x21766d[_0x5f4166(0x114)]=_0x5c59b0(_0x366755['$1'])['trim'](),_0x2727ed[_0x5f4166(0x114)][_0x5f4166(0xdd)](0x0)==='!'&&(_0x4a612a[_0x5f4166(0x19d)]=!![]);else return 0x0;}}},Game_Map[_0x19098e(0x179)][_0x19098e(0xdb)]=function(_0x411595){const _0x53e2c1=_0x19098e;this['_visualParallaxSettings']=this['_visualParallaxSettings']||[];if(!this[_0x53e2c1(0x109)][_0x411595])return;this['_visualParallaxSettings'][_0x411595]=null;const _0x294111=SceneManager[_0x53e2c1(0x195)][_0x53e2c1(0x102)];_0x294111&&_0x294111['removeVisualParallaxLayer'](_0x411595);},Game_Map['prototype'][_0x19098e(0x1eb)]=function(_0x2c414a){const _0x367a3c=_0x19098e,_0x564d9d=_0x2c414a['id'];let _0x536b4f=![];this[_0x367a3c(0x109)]=this[_0x367a3c(0x109)]||[];if(this[_0x367a3c(0x109)][_0x564d9d]){const _0x84df48=this[_0x367a3c(0x109)][_0x564d9d];if(!_0x84df48[_0x367a3c(0x189)][_0x367a3c(0x116)](_0x2c414a[_0x367a3c(0x189)]))_0x536b4f=!![];else!_0x84df48['maskTerrainTags'][_0x367a3c(0x116)](_0x2c414a['maskTerrainTags'])&&(_0x536b4f=!![]);}this[_0x367a3c(0x109)][_0x564d9d]=_0x2c414a;if(!SceneManager['isSceneMap']())return;const _0x2dd771=SceneManager[_0x367a3c(0x195)][_0x367a3c(0x102)];_0x2dd771&&_0x2dd771[_0x367a3c(0x1f6)](_0x564d9d,_0x536b4f);},VisuMZ['VisualParallaxes'][_0x19098e(0xeb)]=Game_Map[_0x19098e(0x179)][_0x19098e(0x1c8)],Game_Map['prototype']['setDisplayPos']=function(_0x38ac53,_0x483150){const _0x5582b1=_0x19098e;VisuMZ[_0x5582b1(0x1f0)]['Game_Map_setDisplayPos'][_0x5582b1(0x1cc)](this,_0x38ac53,_0x483150);for(const _0x1273bf of this[_0x5582b1(0x1b8)]()){if(!_0x1273bf)continue;if(this[_0x5582b1(0x151)]()){if(_0x5582b1(0x14b)===_0x5582b1(0x14b))_0x1273bf[_0x5582b1(0x1d9)]=_0x38ac53;else{if(!_0x5c2841[_0x5582b1(0x12e)]())return;_0x1ac568[_0x5582b1(0x148)](_0x476b6a,_0x21b8af);const _0x3d1a2d=_0x53abf3[_0x5582b1(0xf1)];for(const _0x2b930e of _0x3d1a2d){_0x1714a6[_0x5582b1(0xdb)](_0x2b930e);}}}else{if(_0x5582b1(0x133)===_0x5582b1(0x133))_0x1273bf[_0x5582b1(0x1d9)]=this[_0x5582b1(0x129)];else{if(this['_hasSolidReflections']===_0x3be105)this['registerReflectionSettings']();return this[_0x5582b1(0x12b)];}}this[_0x5582b1(0x206)]()?_0x1273bf['_parallaxY']=_0x483150:_0x1273bf['_parallaxY']=this[_0x5582b1(0x1c2)];}},VisuMZ[_0x19098e(0x1f0)]['Game_Map_scrollLeft']=Game_Map[_0x19098e(0x179)]['scrollLeft'],Game_Map[_0x19098e(0x179)][_0x19098e(0x113)]=function(_0x5f2ab3){const _0x560005=_0x19098e,_0x4bf638=this[_0x560005(0x129)];VisuMZ[_0x560005(0x1f0)][_0x560005(0x204)]['call'](this,_0x5f2ab3);for(const _0x1aea22 of this[_0x560005(0x1b8)]()){if(!_0x1aea22)continue;if(this[_0x560005(0x151)]()){if(_0x560005(0x105)===_0x560005(0x105))_0x1aea22[_0x560005(0x1ab)]&&('HVaYO'!==_0x560005(0x15d)?_0x1aea22[_0x560005(0x1d9)]-=_0x5f2ab3:(_0x354feb['_parallaxLoopY']=!![],_0x49767c[_0x560005(0xd3)]=_0xd3c7d2(_0x3c5eac['$1'])||0x0));else return _0x1419c4[_0x560005(0x1e2)](_0x188342['_parallaxY']*this['tileHeight']());}else this[_0x560005(0x156)]()>=this[_0x560005(0xd5)]()&&(_0x560005(0x196)!==_0x560005(0x196)?this[_0x560005(0x1ee)]=![]:_0x1aea22['_parallaxX']+=this['_displayX']-_0x4bf638);}},VisuMZ[_0x19098e(0x1f0)]['Game_Map_scrollRight']=Game_Map['prototype'][_0x19098e(0x144)],Game_Map[_0x19098e(0x179)][_0x19098e(0x144)]=function(_0x412442){const _0x5c980b=_0x19098e,_0x30e54d=this[_0x5c980b(0x129)];VisuMZ['VisualParallaxes'][_0x5c980b(0x126)][_0x5c980b(0x1cc)](this,_0x412442);for(const _0x483bcd of this['getVisualParallaxes']()){if(!_0x483bcd)continue;if(this[_0x5c980b(0x151)]()){if(_0x483bcd[_0x5c980b(0x1ab)]){if(_0x5c980b(0x115)===_0x5c980b(0x115))_0x483bcd[_0x5c980b(0x1d9)]+=_0x412442;else{const _0x44143a=_0x167260(_0x4ebc6e['$1'])[_0x5c980b(0x207)](',')[_0x5c980b(0xe1)](_0x410170=>_0x170377(_0x410170)||0x0);while(_0x44143a['length']<0x4)_0x44143a[_0x5c980b(0x16c)](0x0);_0x51c9e5['colorTone']=_0x44143a;}}}else this['width']()>=this[_0x5c980b(0xd5)]()&&(_0x483bcd[_0x5c980b(0x1d9)]+=this['_displayX']-_0x30e54d);}},VisuMZ['VisualParallaxes']['Game_Map_scrollDown']=Game_Map[_0x19098e(0x179)][_0x19098e(0x1b5)],Game_Map[_0x19098e(0x179)][_0x19098e(0x1b5)]=function(_0x41e161){const _0x552e4c=_0x19098e,_0x31275b=this[_0x552e4c(0x1c2)];VisuMZ[_0x552e4c(0x1f0)][_0x552e4c(0x1e7)][_0x552e4c(0x1cc)](this,_0x41e161);for(const _0x4d0f9d of this[_0x552e4c(0x1b8)]()){if(!_0x4d0f9d)continue;if(this['isLoopVertical']()){if(_0x552e4c(0x11a)!==_0x552e4c(0x11a)){const _0x43fdbc=_0x404c49(_0x448f68['$1'])[_0x552e4c(0x207)](',')[_0x552e4c(0xe1)](_0x335e5f=>_0x5bce10(_0x335e5f)||0x0);if(_0x43fdbc['length']<=0x1)_0x43fdbc[0x1]=_0x43fdbc[0x0];}else _0x4d0f9d['_parallaxLoopY']&&(_0x552e4c(0x1dd)!==_0x552e4c(0x1dd)?(this[_0x552e4c(0xd4)]=0x0,this['_colorTone']=[0x0,0x0,0x0,0x0],this[_0x552e4c(0x1cf)]=new _0x38f2f9(),!this['filters']&&(this[_0x552e4c(0x164)]=[]),this[_0x552e4c(0x164)][_0x552e4c(0x16c)](this['_colorFilter'])):_0x4d0f9d[_0x552e4c(0x1b2)]+=_0x41e161);}else this[_0x552e4c(0x18b)]()>=this[_0x552e4c(0x103)]()&&(_0x552e4c(0x20d)!==_0x552e4c(0xb4)?_0x4d0f9d[_0x552e4c(0x1b2)]+=this[_0x552e4c(0x1c2)]-_0x31275b:_0x48f624['_parallaxY']+=this[_0x552e4c(0x1c2)]-_0x4c1984);}},VisuMZ[_0x19098e(0x1f0)][_0x19098e(0x172)]=Game_Map[_0x19098e(0x179)][_0x19098e(0xb8)],Game_Map[_0x19098e(0x179)][_0x19098e(0xb8)]=function(_0x3f4850){const _0x4a7435=_0x19098e,_0x51085b=this[_0x4a7435(0x1c2)];VisuMZ['VisualParallaxes']['Game_Map_scrollUp'][_0x4a7435(0x1cc)](this,_0x3f4850);for(const _0x2f474d of this[_0x4a7435(0x1b8)]()){if('dDdqs'!==_0x4a7435(0x108)){_0x273a88['VisualParallaxes']['Spriteset_Map_createParallax']['call'](this);if(!_0x413adc[_0x4a7435(0x166)]())this[_0x4a7435(0xc3)]();if(!_0x4cda34[_0x4a7435(0x10b)]())this[_0x4a7435(0xc8)]();this[_0x4a7435(0xb1)](),this[_0x4a7435(0x19b)](),this[_0x4a7435(0xf0)]();if(_0x75861c[_0x4a7435(0x166)]())this[_0x4a7435(0xc3)]();if(_0x5657a9[_0x4a7435(0x10b)]())this[_0x4a7435(0xc8)]();}else{if(!_0x2f474d)continue;if(this['isLoopVertical']())_0x2f474d[_0x4a7435(0xd6)]&&(_0x2f474d[_0x4a7435(0x1b2)]-=_0x3f4850);else this[_0x4a7435(0x18b)]()>=this[_0x4a7435(0x103)]()&&(_0x4a7435(0xb0)==='riFmt'?_0x2f474d[_0x4a7435(0x1b2)]+=this['_displayY']-_0x51085b:_0x3e3318[_0x4a7435(0xd6)]&&(_0x226dfb[_0x4a7435(0x1b2)]+=_0x3176a5));}}},VisuMZ[_0x19098e(0x1f0)]['Game_Map_updateParallax']=Game_Map[_0x19098e(0x179)][_0x19098e(0x1de)],Game_Map[_0x19098e(0x179)][_0x19098e(0x1de)]=function(){const _0x1f25d6=_0x19098e;VisuMZ['VisualParallaxes'][_0x1f25d6(0xc0)][_0x1f25d6(0x1cc)](this);for(const _0x401244 of this[_0x1f25d6(0x1b8)]()){if(!_0x401244)continue;this['updateVisualParallaxSettings'](_0x401244);}},Game_Map[_0x19098e(0x179)][_0x19098e(0x1ec)]=function(_0x4137ea){const _0x187b34=_0x19098e;_0x4137ea[_0x187b34(0x1ab)]&&(_0x4137ea['_parallaxX']+=_0x4137ea['_parallaxSx']/this[_0x187b34(0x13e)]()/0x2);_0x4137ea[_0x187b34(0xd6)]&&(_0x4137ea['_parallaxY']+=_0x4137ea[_0x187b34(0xd3)]/this['tileHeight']()/0x2);_0x4137ea[_0x187b34(0xce)]+=_0x4137ea['hueShift'];if(_0x4137ea['opacityDuration']>0x0){if(_0x187b34(0xe4)===_0x187b34(0xe4)){const _0x28376d=_0x4137ea[_0x187b34(0x19c)];_0x4137ea[_0x187b34(0x1a5)]=(_0x4137ea[_0x187b34(0x1a5)]*(_0x28376d-0x1)+_0x4137ea[_0x187b34(0x1cb)])/_0x28376d,_0x4137ea['opacityDuration']--;}else _0x7e8a1('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x187b34(0x198)](_0x5adfef,_0x682ee3,_0x1e34e7)),_0x2237ba[_0x187b34(0x155)]();}},VisuMZ[_0x19098e(0x1f0)][_0x19098e(0x1c4)]=Game_Event[_0x19098e(0x179)][_0x19098e(0x125)],Game_Event[_0x19098e(0x179)][_0x19098e(0x125)]=function(){const _0x4b2076=_0x19098e;VisuMZ[_0x4b2076(0x1f0)][_0x4b2076(0x1c4)][_0x4b2076(0x1cc)](this),this[_0x4b2076(0x1bc)]();},VisuMZ[_0x19098e(0x1f0)][_0x19098e(0xf2)]=Game_Event[_0x19098e(0x179)]['setupPageSettings'],Game_Event[_0x19098e(0x179)][_0x19098e(0x1e5)]=function(){const _0x3d7284=_0x19098e;VisuMZ[_0x3d7284(0x1f0)][_0x3d7284(0xf2)][_0x3d7284(0x1cc)](this),this['setupVisualParallaxesEffects']();},Game_Event[_0x19098e(0x179)][_0x19098e(0x1bd)]=function(){const _0x4ef6ea=_0x19098e;if(!this['event']())return;this[_0x4ef6ea(0x1bc)](),this[_0x4ef6ea(0x16e)](),this['setupVisualParallaxesCommentTags']();},Game_Event['prototype'][_0x19098e(0x16e)]=function(){const _0x58307a=_0x19098e,_0x20019b=this[_0x58307a(0xd0)]()[_0x58307a(0x19f)];if(_0x20019b==='')return;this[_0x58307a(0x163)](_0x20019b);},Game_Event[_0x19098e(0x179)]['setupVisualParallaxesCommentTags']=function(){const _0x3c1a25=_0x19098e;if(!this['page']())return;const _0x113559=this['list']();let _0x399f09='';for(const _0x2df81f of _0x113559){if([0x6c,0x198][_0x3c1a25(0xef)](_0x2df81f['code'])){if(_0x3c1a25(0x1fd)!==_0x3c1a25(0x1fd)){const _0x393876=this[_0x3c1a25(0x109)][_0x35dccf];if(!_0x393876[_0x3c1a25(0x189)][_0x3c1a25(0x116)](_0x1d530a[_0x3c1a25(0x189)]))_0x2b7a27=!![];else!_0x393876[_0x3c1a25(0x1d6)]['equals'](_0x2fe189['maskTerrainTags'])&&(_0x34d7d8=!![]);}else{if(_0x399f09!=='')_0x399f09+='\x0a';_0x399f09+=_0x2df81f[_0x3c1a25(0xb3)][0x0];}}}this[_0x3c1a25(0x163)](_0x399f09);},Game_Event[_0x19098e(0x179)][_0x19098e(0x1bc)]=function(){const _0x382784=_0x19098e;this[_0x382784(0x1ee)]=![];},Game_Event[_0x19098e(0x179)][_0x19098e(0x163)]=function(_0x2c35c0){const _0x41feb1=_0x19098e,_0x50e940=VisuMZ[_0x41feb1(0x1f0)][_0x41feb1(0x100)];_0x2c35c0[_0x41feb1(0x1ad)](_0x50e940['NoReflection'])&&(_0x41feb1(0x12d)===_0x41feb1(0xd7)?(_0x55ab10['x']=_0x47edd7['floor'](-_0x548df[_0x41feb1(0xb9)]()*_0x5ec1c5[_0x41feb1(0x13e)]()),_0xb589a2['y']=_0x49a95b['floor'](-_0x2c0090[_0x41feb1(0x1bb)]()*_0x5910c2[_0x41feb1(0x1ea)]())):this[_0x41feb1(0x1ee)]=!![]);};function Sprite_VisualParallax(){const _0x623f95=_0x19098e;this[_0x623f95(0x160)](...arguments);}Sprite_VisualParallax[_0x19098e(0x179)]=Object[_0x19098e(0xf7)](TilingSprite[_0x19098e(0x179)]),Sprite_VisualParallax[_0x19098e(0x179)][_0x19098e(0x15b)]=Sprite_VisualParallax,Sprite_VisualParallax[_0x19098e(0x179)][_0x19098e(0x160)]=function(_0x1e4570){const _0x3b587d=_0x19098e;this[_0x3b587d(0x1cd)]=_0x1e4570,TilingSprite[_0x3b587d(0x179)][_0x3b587d(0x160)][_0x3b587d(0x1cc)](this),this[_0x3b587d(0xc2)](),this[_0x3b587d(0x145)](),this[_0x3b587d(0x16f)][_0x3b587d(0x110)](this[_0x3b587d(0x14d)][_0x3b587d(0xe5)](this));},Sprite_VisualParallax['prototype']['settings']=function(){const _0x11532d=_0x19098e;return $gameMap[_0x11532d(0x146)](this[_0x11532d(0x1cd)]);},Sprite_VisualParallax['prototype'][_0x19098e(0xc2)]=function(){const _0x4f961a=_0x19098e;this[_0x4f961a(0xd4)]=0x0,this[_0x4f961a(0x1fa)]=[0x0,0x0,0x0,0x0],this[_0x4f961a(0x1cf)]=new ColorFilter(),!this['filters']&&(this[_0x4f961a(0x164)]=[]),this[_0x4f961a(0x164)][_0x4f961a(0x16c)](this[_0x4f961a(0x1cf)]);},Sprite_VisualParallax[_0x19098e(0x179)]['_updateColorFilter']=function(){const _0x383e6f=_0x19098e;!this[_0x383e6f(0x1cf)]&&this[_0x383e6f(0xc2)](),this['_colorFilter'][_0x383e6f(0xe7)](this[_0x383e6f(0xd4)]),this[_0x383e6f(0x1cf)]['setColorTone'](this[_0x383e6f(0x1fa)]);},Sprite_VisualParallax[_0x19098e(0x179)]['loadBitmap']=function(){const _0x2d4b94=_0x19098e;this['_parallaxName']=this[_0x2d4b94(0xca)]()['filename'],this['bitmap']=ImageManager[_0x2d4b94(0xff)](this[_0x2d4b94(0x1b1)]);},Sprite_VisualParallax[_0x19098e(0x179)]['createMaskSprite']=function(){const _0x1c35d4=_0x19098e;this[_0x1c35d4(0x1c1)]=new Sprite(),this[_0x1c35d4(0x171)]();},Sprite_VisualParallax['prototype'][_0x19098e(0x171)]=function(){const _0x5a914d=_0x19098e;if(this[_0x5a914d(0x1c1)]['bitmap']){if(_0x5a914d(0x18a)!=='PuDII'){const _0x5656e5=this[_0x5a914d(0x146)](_0x42e4b3);if(_0x5656e5[_0x5a914d(0x19d)])return _0x20eba3[_0x5a914d(0x1e2)](_0x5656e5['_parallaxX']*this[_0x5a914d(0x13e)]());else return _0x5656e5[_0x5a914d(0x1ab)]?_0x5656e5[_0x5a914d(0x1d9)]*this[_0x5a914d(0x13e)]()/0x2:0x0;}else this['_maskSprite'][_0x5a914d(0x16f)][_0x5a914d(0x17b)](),this['removeChild'](this[_0x5a914d(0x1c1)]);}const _0x577fb8=new Bitmap(Graphics[_0x5a914d(0x156)],Graphics[_0x5a914d(0x18b)]);_0x577fb8['fillRect'](0x0,0x0,_0x577fb8[_0x5a914d(0x156)],_0x577fb8[_0x5a914d(0x18b)],_0x5a914d(0xd2)),this['_maskSprite']['bitmap']=_0x577fb8,this[_0x5a914d(0x182)](this[_0x5a914d(0x1c1)]),this[_0x5a914d(0xba)]=new PIXI[(_0x5a914d(0x19a))](this[_0x5a914d(0x1c1)]),this[_0x5a914d(0x164)][_0x5a914d(0x16c)](this[_0x5a914d(0xba)]);const _0x30d1f0=this[_0x5a914d(0xca)]()['maskRegions'],_0x5effb0=this[_0x5a914d(0xca)]()['maskTerrainTags'];if(_0x30d1f0[_0x5a914d(0x141)]<=0x0&&_0x5effb0[_0x5a914d(0x141)]<=0x0)return;if($gameMap[_0x5a914d(0x151)]()||$gameMap[_0x5a914d(0x206)]())return;const _0x37ed2b=$gameMap[_0x5a914d(0x156)](),_0x451487=$gameMap[_0x5a914d(0x18b)](),_0x566d7e=$gameMap[_0x5a914d(0x13e)](),_0x1208b0=$gameMap[_0x5a914d(0x1ea)]();this[_0x5a914d(0x1c1)][_0x5a914d(0x16f)]=new Bitmap(_0x37ed2b*_0x566d7e,_0x451487*_0x1208b0);for(let _0x107481=0x0;_0x107481<_0x37ed2b;_0x107481++){for(let _0x4d5b2f=0x0;_0x4d5b2f<_0x451487;_0x4d5b2f++){(_0x30d1f0[_0x5a914d(0xef)]($gameMap['regionId'](_0x107481,_0x4d5b2f))||_0x5effb0[_0x5a914d(0xef)]($gameMap['terrainTag'](_0x107481,_0x4d5b2f)))&&this[_0x5a914d(0x1c1)][_0x5a914d(0x16f)][_0x5a914d(0x149)](_0x107481*_0x566d7e,_0x4d5b2f*_0x1208b0,_0x566d7e,_0x1208b0,'#ffffff');}}},Sprite_VisualParallax['prototype'][_0x19098e(0x209)]=function(){const _0x5056e5=_0x19098e;TilingSprite[_0x5056e5(0x179)][_0x5056e5(0x209)][_0x5056e5(0x1cc)](this);if(!this[_0x5056e5(0x16f)])return;if(!this[_0x5056e5(0xca)]())return;this[_0x5056e5(0x1d0)](),this[_0x5056e5(0xc9)](),this[_0x5056e5(0x136)](),this[_0x5056e5(0x1af)](),this[_0x5056e5(0x1b9)](),this[_0x5056e5(0x17a)]();},Sprite_VisualParallax[_0x19098e(0x179)][_0x19098e(0x1d0)]=function(){const _0x5928d1=_0x19098e;this['opacity']=this[_0x5928d1(0xca)]()[_0x5928d1(0x1a5)];},Sprite_VisualParallax[_0x19098e(0x179)][_0x19098e(0xc9)]=function(){const _0x3f0e3f=_0x19098e;this['origin']['x']=$gameMap[_0x3f0e3f(0x118)](this[_0x3f0e3f(0x1cd)]),this[_0x3f0e3f(0x20a)]['y']=$gameMap[_0x3f0e3f(0x186)](this[_0x3f0e3f(0x1cd)]);},Sprite_VisualParallax[_0x19098e(0x179)][_0x19098e(0x136)]=function(){const _0x3bc539=_0x19098e;this[_0x3bc539(0xba)]&&(this[_0x3bc539(0xba)][_0x3bc539(0x1e3)]=this[_0x3bc539(0xca)]()['blendMode']);},Sprite_VisualParallax[_0x19098e(0x179)]['updateHue']=function(){const _0x596ef4=_0x19098e;this[_0x596ef4(0xe7)](this[_0x596ef4(0xca)]()[_0x596ef4(0xce)]);},Sprite_VisualParallax[_0x19098e(0x179)][_0x19098e(0xe7)]=function(_0x46a984){const _0x150348=_0x19098e;this[_0x150348(0xd4)]!==Number(_0x46a984)&&(this[_0x150348(0xd4)]=Number(_0x46a984),this[_0x150348(0x174)]());},Sprite_VisualParallax[_0x19098e(0x179)][_0x19098e(0x1b9)]=function(){const _0x36b079=_0x19098e;this[_0x36b079(0x13a)](this[_0x36b079(0xca)]()[_0x36b079(0x101)]);},Sprite_VisualParallax[_0x19098e(0x179)][_0x19098e(0x13a)]=function(_0x3fd209){const _0x509d73=_0x19098e;if(!(_0x3fd209 instanceof Array)){if(_0x509d73(0x15a)==='txmDL')throw new Error(_0x509d73(0x208));else this[_0x509d73(0xc2)]();}if(!this['_colorTone'][_0x509d73(0x116)](_0x3fd209)){if(_0x509d73(0x11e)!==_0x509d73(0x199))this[_0x509d73(0x1fa)]=_0x3fd209[_0x509d73(0x1e8)](),this[_0x509d73(0x174)]();else{const _0x166cae=_0x2f043d['VisualParallaxes'][_0x509d73(0x100)],_0x2d9477=_0x2f2f31[_0x509d73(0x19f)]||'';if(_0x2d9477[_0x509d73(0x1ad)](_0x166cae['SolidTerrainTags']))return _0x24d350(_0x45a6cb['$1'])[_0x509d73(0x207)](',')[_0x509d73(0xe1)](_0x319640=>_0x3217ab(_0x319640)||0x1)[_0x509d73(0x20c)](0x0);return _0x4c9f98[_0x509d73(0x180)](_0x3f4760[_0x509d73(0x158)])[_0x509d73(0x20c)](0x0);}}},Sprite_VisualParallax[_0x19098e(0x179)][_0x19098e(0x17a)]=function(){const _0x314e93=_0x19098e;if(!this[_0x314e93(0x1c1)])return;const _0x5ae057=this['settings']()[_0x314e93(0x189)],_0xf02003=this['settings']()[_0x314e93(0x1d6)];if(_0x5ae057[_0x314e93(0x141)]<=0x0&&_0xf02003[_0x314e93(0x141)]<=0x0)return;if($gameMap['isLoopHorizontal']()||$gameMap[_0x314e93(0x206)]())return;this['_maskSprite']['x']=Math[_0x314e93(0x1e2)](-$gameMap['displayX']()*$gameMap[_0x314e93(0x13e)]()),this['_maskSprite']['y']=Math['floor'](-$gameMap[_0x314e93(0x1bb)]()*$gameMap[_0x314e93(0x1ea)]());};function _0x4662(){const _0x53d9ac=['Spriteset_Map_update','opacity','eReSs','WaterBoundary','_baseSprite','noReflections','_mask','_parallaxLoopX','WaterAmplitude','match','sGrfn','updateHue','ReflectionFilter','_parallaxName','_parallaxY','TemplateSettings','uRgbE','scrollDown','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','hquBP','getVisualParallaxes','updateTone','code','displayY','initVisualParallaxesEffects','setupVisualParallaxesEffects','FCqkR','WaveEnd','updateWaterReflections','_maskSprite','_displayY','WaterTop','Game_Event_clearPageSettings','DEFAULT_WATER_REFLECTION_FILTER_TOP','SCREEN','1diYxrg','setDisplayPos','tGpju','SolidBottom','targetOpacity','call','_id','hwWeg','_colorFilter','updateOpacity','>>>ATTENTION<<<','getWaterReflectionRegions','2092872RaQVQm','OpacityRate','round','maskTerrainTags','eBTDf','ORHFD','_parallaxX','STRUCT','SolidOpacityRate','Settings','uTezP','updateParallax','WHwMa','vehicles','WaterRegions','floor','blendMode','KXwEp','setupPageSettings','IRzvK','Game_Map_scrollDown','clone','createSolidReflectionMask','tileHeight','addChangeVisualParallax','updateVisualParallaxSettings','mask','_noReflection','fLuGK','VisualParallaxes','WaterOpacityFlat','DEFAULT_WATER_REFLECTION_FILTER_OPACITY','MULTIPLY','gHujT','ScrollLock','updateVisualParallaxLayer','Nafko','5040630lYLlLe','_waterReflectContainer','_colorTone','trim','Optional','eMTnd','16736aZnfLe','_solidReflectLayer','registerReflectionSettings','removeVisualParallaxLayer','TerrainTags','ALMZX','Game_Map_scrollLeft','JiELn','isLoopVertical','split','Argument\x20must\x20be\x20an\x20array','update','origin','duZxI','remove','CoBGH','NUM','kxshG','ADDITIVE','BlendMode','riFmt','createParallaxContainer','terrainTag','parameters','VqYsq','nfVhU','mpcTo','createParallax','scrollUp','displayX','_maskFilter','AmpStart','sNwpa','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','hasSolidReflections','NORMAL','Game_Map_updateParallax','BlurFilter','_createColorFilter','createWaterReflectionLayer','aTpEj','indexOf','regionId','ScAlG','createSolidReflectionLayer','updateOrigin','settings','setup','isSceneMap','Spriteset_Map_createParallax','hue','Boundary','event','Filename','#ffffff','_parallaxSy','_hue','screenTileX','_parallaxLoopY','NusaI','DEFAULT_WATER_REFLECTION_FILTER_BLUR','WaterOpacityRate','getWaterReflectionAmplitude','removeVisualParallax','hueShift','charAt','SolidReflect','jXSEA','getSolidReflectionTerrainTags','map','status','getSolidReflectionOpacity','AphZk','bind','VMQdm','setHue','jECiJ','DEFAULT_SOLID_REFLECTION_FILTER_BLUR','getWaterReflectionTerrainTags','Game_Map_setDisplayPos','_waterReflectAdded','hasWaterReflections','WNqTF','includes','sortVisualParallaxes','list','Game_Event_setupPageSettings','_reflection','LvxwT','VLynW','BcqMr','create','mgKWl','reverseData','createCharacters','ARRAYEVAL','2051812WCIlIi','QyfZk','hasOwnProperty','loadParallax','RegExp','colorTone','_spriteset','screenTileY','getWaterReflectionBoundary','UtZRp','getSolidReflectionTop','lktzG','dDdqs','_visualParallaxSettings','vVCHe','getSolidReflectionRegions','_solidReflectAdded','_blurFilter','Game_Map_setup','_parallaxSx','addLoadListener','vagAi','DEFAULT_WATER_REFLECTION_FILTER_BOUNDARY','scrollLeft','filename','hMjjC','equals','children','getVisualParallaxOx','DEFAULT_WATER_REFLECTION_FILTER_AMPLITUDE','XxlCy','fAtWz','Spriteset_Map_createCharacters','DEFAULT_WATER_REFLECTION_TERRAINTAGS','lYBVB','HorzLoop','JvFJu','ParallaxRemove','Opacity','clamp','registerCommand','clearPageSettings','Game_Map_scrollRight','WaterReflect','2990127wJpPJm','_displayX','DEFAULT_WATER_REFLECTION_REGIONS','_hasSolidReflections','tkXgp','GShpD','isInstanceOfSceneMap','updateSolidReflections','WaterBottom','SolidTop','move','Kjmlr','createWaterReflectionMask','AmpEnd','updateBlendMode','getWaterReflectionWavelength','eKyLI','DEFAULT_SOLID_REFLECTION_FILTER_TOP','setColorTone','name','ISRzm','createReflectionMask','tileWidth','toUpperCase','ARRAYFUNC','length','description','YosSa','scrollRight','loadBitmap','getVisualParallaxSettings','togKD','ConvertParams','fillRect','pPePM','XEStn','_parallaxContainer','createMaskSprite','XYjNK','MaskRegions','_solidReflectContainer','isLoopHorizontal','_reflectFilter','Regions','1369935aWOOYE','exit','width','getSolidReflectionBlur','DEFAULT_SOLID_REFLECTION_TERRAINTAGS','parse','txmDL','constructor','OpacityFlat','gUkby','getWaterReflectionBlur','3565985wplrHR','initialize','CreateLayerData','UFURt','checkVisualParallaxesStringTags','filters','4tEmcaA','getWaterReflectionTop','ParallaxFadeOpacity','_parallaxDataRef','DEFAULT_SOLID_REFLECTION_REGIONS','FGHsI','filter','push','sort','setupVisualParallaxesNotetags','bitmap','eKWPh','createMaskBitmap','Game_Map_scrollUp','DEFAULT_SOLID_REFLECTION_FILTER_OPACITY','_updateColorFilter','_hasWaterReflections','_waterReflectLayer','type','max','prototype','updateMask','destroy','findTargetVisualParallax','createCharacterReflections','WaterBlur','lWhLq','makeDeepCopy','wasolidter','addChild','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','followers','EVAL','getVisualParallaxOy','NoReflection','yoqhW','maskRegions','PuDII','height','SolidTerrainTags','DOnIf','Blur','DEFAULT_WATER_REFLECTION_FILTER_WAVELENGTH','createNewParallaxLayer','getWaterReflectionOpacity','loTPU','removeChild','ARRAYSTRUCT','_scene','oZrXI','ParallaxAddChangeSettings','format','ygIcv','SpriteMaskFilter','createParallaxLayers','opacityDuration','_parallaxZero','HSzGK','note','setupVisualParallaxes','scale','Mxatn','SolidRegions'];_0x4662=function(){return _0x53d9ac;};return _0x4662();}function _0x45e6(_0x45e5d0,_0x277d09){const _0x466256=_0x4662();return _0x45e6=function(_0x45e606,_0x3b140a){_0x45e606=_0x45e606-0xaf;let _0xc1ff6f=_0x466256[_0x45e606];return _0xc1ff6f;},_0x45e6(_0x45e5d0,_0x277d09);}function Sprite_ReflectionCharacter(){this['initialize'](...arguments);}Sprite_ReflectionCharacter[_0x19098e(0x179)]=Object['create'](Sprite_Character[_0x19098e(0x179)]),Sprite_ReflectionCharacter[_0x19098e(0x179)][_0x19098e(0x15b)]=Sprite_ReflectionCharacter,Sprite_ReflectionCharacter[_0x19098e(0x179)]['setupRadialLight']=function(_0x1a4a96){},Sprite_ReflectionCharacter[_0x19098e(0x179)][_0x19098e(0x209)]=function(){const _0x135b2e=_0x19098e;Sprite_Character[_0x135b2e(0x179)]['update'][_0x135b2e(0x1cc)](this);},VisuMZ[_0x19098e(0x1f0)][_0x19098e(0xcd)]=Spriteset_Map[_0x19098e(0x179)][_0x19098e(0xb7)],Spriteset_Map['prototype'][_0x19098e(0xb7)]=function(){const _0x5bbf2a=_0x19098e;VisuMZ[_0x5bbf2a(0x1f0)][_0x5bbf2a(0xcd)][_0x5bbf2a(0x1cc)](this);if(!$gameMap[_0x5bbf2a(0x166)]())this[_0x5bbf2a(0xc3)]();if(!$gameMap['getSolidReflectionRegions']())this['createSolidReflectionLayer']();this[_0x5bbf2a(0xb1)](),this[_0x5bbf2a(0x19b)](),this['sortVisualParallaxes']();if($gameMap[_0x5bbf2a(0x166)]())this['createWaterReflectionLayer']();if($gameMap['getSolidReflectionRegions']())this['createSolidReflectionLayer']();},Spriteset_Map[_0x19098e(0x179)][_0x19098e(0xc3)]=function(){const _0x59ea0e=_0x19098e;if(!PIXI[_0x59ea0e(0x164)])return;if($gameMap[_0x59ea0e(0x151)]()||$gameMap[_0x59ea0e(0x206)]())return;if($gameMap[_0x59ea0e(0x1a9)]())return;this[_0x59ea0e(0x176)]=new Sprite(),this[_0x59ea0e(0x1f9)]=new Sprite(),this[_0x59ea0e(0xec)]=![],this[_0x59ea0e(0x1a8)][_0x59ea0e(0x182)](this[_0x59ea0e(0x176)]),this[_0x59ea0e(0x176)][_0x59ea0e(0x164)]=[],this[_0x59ea0e(0x176)][_0x59ea0e(0x1a5)]=$gameMap[_0x59ea0e(0x191)](),!!PIXI[_0x59ea0e(0x164)][_0x59ea0e(0x1b0)]&&(_0x59ea0e(0x20f)!==_0x59ea0e(0x20f)?(_0xd7b3f2[_0x59ea0e(0x189)][_0x59ea0e(0x141)]<=0x0&&(_0x5e5a9d[_0x59ea0e(0x189)]=_0x390b00['makeDeepCopy'](_0x53ff6d[_0x59ea0e(0x10b)]())),_0x56387e[_0x59ea0e(0x1d6)]['length']<=0x0&&(_0x4744e8[_0x59ea0e(0x1d6)]=_0x22949b['makeDeepCopy'](_0x147e3b['getSolidReflectionTerrainTags']()))):this['_waterReflectLayer'][_0x59ea0e(0x152)]=new PIXI[(_0x59ea0e(0x164))][(_0x59ea0e(0x1b0))]({'boundary':$gameMap[_0x59ea0e(0x104)](),'amplitude':$gameMap['getWaterReflectionAmplitude'](),'waveLength':$gameMap[_0x59ea0e(0x137)](),'mirror':![]})),!!PIXI['filters'][_0x59ea0e(0xc1)]&&(this[_0x59ea0e(0x176)]['_blurFilter']=new PIXI[(_0x59ea0e(0x164))][(_0x59ea0e(0xc1))]($gameMap[_0x59ea0e(0x15e)]()),this['_waterReflectLayer']['filters'][_0x59ea0e(0x16c)](this['_waterReflectLayer'][_0x59ea0e(0x10d)])),this[_0x59ea0e(0x134)]();},Spriteset_Map[_0x19098e(0x179)]['createWaterReflectionMask']=function(){const _0x3d71f7=_0x19098e,_0x3e2b83=$gameMap[_0x3d71f7(0x1d2)](),_0x391aaf=$gameMap[_0x3d71f7(0xea)](),_0x209ecc=this[_0x3d71f7(0x13d)](_0x3e2b83,_0x391aaf);_0x209ecc&&(this[_0x3d71f7(0x182)](_0x209ecc),this['_waterReflectLayer'][_0x3d71f7(0x1ed)]=_0x209ecc);},Spriteset_Map['prototype'][_0x19098e(0xc8)]=function(){const _0x1d7c1f=_0x19098e;if(!PIXI[_0x1d7c1f(0x164)])return;if($gameMap[_0x1d7c1f(0x151)]()||$gameMap[_0x1d7c1f(0x206)]())return;if($gameMap[_0x1d7c1f(0x1a9)]())return;this[_0x1d7c1f(0x1ff)]=new Sprite(),this[_0x1d7c1f(0x150)]=new Sprite(),this['_solidReflectAdded']=![],this[_0x1d7c1f(0x1a8)][_0x1d7c1f(0x182)](this[_0x1d7c1f(0x1ff)]),this[_0x1d7c1f(0x1ff)][_0x1d7c1f(0x164)]=[],this[_0x1d7c1f(0x1ff)][_0x1d7c1f(0x1a5)]=$gameMap['getSolidReflectionOpacity'](),!!PIXI['filters']['BlurFilter']&&(this['_solidReflectLayer'][_0x1d7c1f(0x10d)]=new PIXI[(_0x1d7c1f(0x164))][(_0x1d7c1f(0xc1))]($gameMap[_0x1d7c1f(0x157)]()),this[_0x1d7c1f(0x1ff)][_0x1d7c1f(0x164)][_0x1d7c1f(0x16c)](this[_0x1d7c1f(0x1ff)][_0x1d7c1f(0x10d)])),this[_0x1d7c1f(0x1e9)]();},Spriteset_Map[_0x19098e(0x179)][_0x19098e(0x1e9)]=function(){const _0xe544dd=_0x19098e,_0x860727=$gameMap['getSolidReflectionRegions'](),_0x394ffd=$gameMap[_0xe544dd(0xe0)](),_0x1c2df3=this[_0xe544dd(0x13d)](_0x860727,_0x394ffd);_0x1c2df3&&('hquBP'===_0xe544dd(0x1b7)?(this[_0xe544dd(0x182)](_0x1c2df3),this[_0xe544dd(0x1ff)][_0xe544dd(0x1ed)]=_0x1c2df3):(this[_0xe544dd(0x14c)]=new _0x1be807(),this['_baseSprite'][_0xe544dd(0x182)](this['_parallaxContainer']),this[_0xe544dd(0x168)]=[null]));},Spriteset_Map[_0x19098e(0x179)][_0x19098e(0x13d)]=function(_0x35b0ec,_0x406e99){const _0x56ace0=_0x19098e;if(_0x35b0ec[_0x56ace0(0x141)]<=0x0&&_0x406e99['length']<=0x0)return null;const _0x57f757=$gameMap[_0x56ace0(0x156)](),_0x1771c1=$gameMap[_0x56ace0(0x18b)](),_0x48cd3d=$gameMap['tileWidth'](),_0x25dc06=$gameMap[_0x56ace0(0x1ea)](),_0x368ea8=0x0,_0x598c9d=_0x368ea8*0x2,_0x17c67f=new Sprite();_0x17c67f[_0x56ace0(0x16f)]=new Bitmap(_0x57f757*_0x48cd3d,_0x1771c1*_0x25dc06);for(let _0x52b76d=0x0;_0x52b76d<_0x57f757;_0x52b76d++){for(let _0x54400e=0x0;_0x54400e<_0x1771c1;_0x54400e++){if(_0x56ace0(0x11b)===_0x56ace0(0xe8))return![];else(_0x35b0ec[_0x56ace0(0xef)]($gameMap['regionId'](_0x52b76d,_0x54400e))||_0x406e99[_0x56ace0(0xef)]($gameMap[_0x56ace0(0xb2)](_0x52b76d,_0x54400e)))&&_0x17c67f[_0x56ace0(0x16f)][_0x56ace0(0x149)](_0x52b76d*_0x48cd3d+_0x368ea8,_0x54400e*_0x25dc06+_0x368ea8,_0x48cd3d-_0x598c9d,_0x25dc06-_0x598c9d,'#ffffff');}}return _0x17c67f;},VisuMZ[_0x19098e(0x1f0)][_0x19098e(0x11c)]=Spriteset_Map[_0x19098e(0x179)][_0x19098e(0xfa)],Spriteset_Map[_0x19098e(0x179)][_0x19098e(0xfa)]=function(){const _0xc2da7f=_0x19098e;VisuMZ[_0xc2da7f(0x1f0)][_0xc2da7f(0x11c)][_0xc2da7f(0x1cc)](this),this[_0xc2da7f(0x17d)]();},Spriteset_Map['prototype'][_0x19098e(0x17d)]=function(){const _0x22901a=_0x19098e;if($gameMap[_0x22901a(0x1a9)]())return;const _0x1eeea4=[],_0x32df0f=[];for(const _0x32ded4 of $gameMap['events']()){if(_0x22901a(0xfd)===_0x22901a(0xfd)){if(_0x32ded4['_noReflection'])continue;_0x1eeea4[_0x22901a(0x16c)](new Sprite_ReflectionCharacter(_0x32ded4)),_0x32df0f['push'](new Sprite_ReflectionCharacter(_0x32ded4));}else _0x396a6b[_0x22901a(0x1f0)]['Game_Event_setupPageSettings'][_0x22901a(0x1cc)](this),this[_0x22901a(0x1bd)]();}for(const _0x552464 of $gameMap[_0x22901a(0x1e0)]()){_0x22901a(0xf4)===_0x22901a(0x170)?this[_0x22901a(0x14c)][_0x22901a(0x193)](_0x39ddfa):(_0x1eeea4[_0x22901a(0x16c)](new Sprite_ReflectionCharacter(_0x552464)),_0x32df0f[_0x22901a(0x16c)](new Sprite_ReflectionCharacter(_0x552464)));}for(const _0xde2f9d of $gamePlayer[_0x22901a(0x184)]()[_0x22901a(0xf9)]()){_0x1eeea4['push'](new Sprite_ReflectionCharacter(_0xde2f9d)),_0x32df0f[_0x22901a(0x16c)](new Sprite_ReflectionCharacter(_0xde2f9d));}_0x1eeea4[_0x22901a(0x16c)](new Sprite_ReflectionCharacter($gamePlayer)),_0x32df0f[_0x22901a(0x16c)](new Sprite_ReflectionCharacter($gamePlayer));if(this[_0x22901a(0x176)]){if(_0x22901a(0x1b4)===_0x22901a(0x138)){const _0x3de164=this[_0x22901a(0x146)](_0x44ca29);if(_0x3de164[_0x22901a(0x19d)])return _0x3edd10[_0x22901a(0x1e2)](_0x3de164[_0x22901a(0x1b2)]*this[_0x22901a(0x1ea)]());else return _0x3de164[_0x22901a(0xd6)]?_0x3de164['_parallaxY']*this[_0x22901a(0x1ea)]()/0x2:0x0;}else for(const _0x346483 of _0x1eeea4){_0x346483[_0x22901a(0xf3)]=!![],this[_0x22901a(0x1f9)]['addChild'](_0x346483),_0x346483['scale']['y']=-0.85,_0x346483[_0x22901a(0x164)]=_0x346483[_0x22901a(0x164)]||[];if(this[_0x22901a(0x176)][_0x22901a(0x152)]){if(_0x22901a(0x18d)===_0x22901a(0x1d8)){const _0x221b7c=_0x13f41d[_0x22901a(0x1f0)][_0x22901a(0x100)],_0x4c202f=_0x1feff1[_0x22901a(0x19f)]||'';if(_0x4c202f[_0x22901a(0x1ad)](_0x221b7c[_0x22901a(0x131)]))return!![];else{if(_0x4c202f['match'](_0x221b7c['SolidBottom']))return![];}return _0x47c02c['DEFAULT_SOLID_REFLECTION_FILTER_TOP'];}else _0x346483[_0x22901a(0x164)]['push'](this[_0x22901a(0x176)][_0x22901a(0x152)]);}}}if(this[_0x22901a(0x1ff)])for(const _0x141c40 of _0x32df0f){_0x141c40[_0x22901a(0xf3)]=!![],this[_0x22901a(0x150)]['addChild'](_0x141c40),_0x141c40[_0x22901a(0x1a1)]['y']=-0.85;}},VisuMZ[_0x19098e(0x1f0)]['Spriteset_Map_update']=Spriteset_Map[_0x19098e(0x179)][_0x19098e(0x209)],Spriteset_Map[_0x19098e(0x179)][_0x19098e(0x209)]=function(){const _0x57a2b0=_0x19098e;VisuMZ[_0x57a2b0(0x1f0)][_0x57a2b0(0x1a4)][_0x57a2b0(0x1cc)](this),this[_0x57a2b0(0x1c0)](),this[_0x57a2b0(0x12f)]();},Spriteset_Map[_0x19098e(0x179)]['updateWaterReflections']=function(){const _0x21d1af=_0x19098e;if(!this[_0x21d1af(0x176)])return;if($gameMap){if(!this[_0x21d1af(0xec)]&&$gameMap['hasWaterReflections']())_0x21d1af(0xf6)!==_0x21d1af(0xf6)?(this[_0x21d1af(0x1ff)][_0x21d1af(0x182)](this[_0x21d1af(0x150)]),this['_solidReflectAdded']=!![]):(this['_waterReflectLayer'][_0x21d1af(0x182)](this['_waterReflectContainer']),this[_0x21d1af(0xec)]=!![]);else this[_0x21d1af(0xec)]&&!$gameMap[_0x21d1af(0xed)]()&&(this[_0x21d1af(0x176)][_0x21d1af(0x193)](this[_0x21d1af(0x1f9)]),this['_waterReflectAdded']=![]);}this['_waterReflectLayer'][_0x21d1af(0x152)]&&(this[_0x21d1af(0x176)][_0x21d1af(0x152)]['time']+=0.05);const _0x2952ea=this[_0x21d1af(0x176)][_0x21d1af(0x1aa)];if(_0x2952ea){if('BcyIp'!==_0x21d1af(0xf5))_0x2952ea['x']=Math[_0x21d1af(0x1e2)](-$gameMap[_0x21d1af(0xb9)]()*$gameMap[_0x21d1af(0x13e)]()),_0x2952ea['y']=Math['floor'](-$gameMap['displayY']()*$gameMap[_0x21d1af(0x1ea)]());else{if(this[_0x21d1af(0x175)]===_0x299c33)this[_0x21d1af(0x200)]();return this[_0x21d1af(0x175)];}}},Spriteset_Map['prototype']['updateSolidReflections']=function(){const _0x342423=_0x19098e;if(!this['_solidReflectLayer'])return;if($gameMap){if(!this['_solidReflectAdded']&&$gameMap[_0x342423(0xbe)]())_0x342423(0x1e4)==='KXwEp'?(this['_solidReflectLayer']['addChild'](this[_0x342423(0x150)]),this['_solidReflectAdded']=!![]):this[_0x342423(0xba)]['blendMode']=this[_0x342423(0xca)]()[_0x342423(0x1e3)];else this[_0x342423(0x10c)]&&!$gameMap[_0x342423(0xbe)]()&&(this['_solidReflectLayer']['removeChild'](this[_0x342423(0x150)]),this[_0x342423(0x10c)]=![]);}const _0xa5b6ab=this[_0x342423(0x1ff)]['_mask'];if(_0xa5b6ab){if(_0x342423(0x1c9)!=='tGpju')return![];else _0xa5b6ab['x']=Math['floor'](-$gameMap[_0x342423(0xb9)]()*$gameMap[_0x342423(0x13e)]()),_0xa5b6ab['y']=Math[_0x342423(0x1e2)](-$gameMap[_0x342423(0x1bb)]()*$gameMap['tileHeight']());}},Spriteset_Map[_0x19098e(0x179)][_0x19098e(0xb1)]=function(){const _0x238b29=_0x19098e;this[_0x238b29(0x14c)]=new Sprite(),this['_baseSprite'][_0x238b29(0x182)](this['_parallaxContainer']),this[_0x238b29(0x168)]=[null];},Spriteset_Map[_0x19098e(0x179)]['createParallaxLayers']=function(){const _0x38d818=_0x19098e,_0x24f89b=$gameMap[_0x38d818(0x1b8)]();for(const _0x510398 of _0x24f89b){if(_0x38d818(0x1ce)===_0x38d818(0x1ef))this[_0x38d818(0x160)](...arguments);else{if(!_0x510398)continue;this[_0x38d818(0x190)](_0x510398);}}},Spriteset_Map[_0x19098e(0x179)][_0x19098e(0x190)]=function(_0xe8454){const _0x7ad557=_0x19098e;if(!_0xe8454)return;const _0x55de7c=new Sprite_VisualParallax(_0xe8454['id']);_0x55de7c[_0x7ad557(0x132)](0x0,0x0,Graphics['width'],Graphics[_0x7ad557(0x18b)]),this[_0x7ad557(0x14c)][_0x7ad557(0x182)](_0x55de7c);},Spriteset_Map[_0x19098e(0x179)][_0x19098e(0xf0)]=function(){const _0x45f639=_0x19098e;this[_0x45f639(0x14c)][_0x45f639(0x117)][_0x45f639(0x16d)]((_0x25211b,_0x3c84ae)=>_0x25211b[_0x45f639(0x1cd)]-_0x3c84ae[_0x45f639(0x1cd)]);},Spriteset_Map[_0x19098e(0x179)][_0x19098e(0x17c)]=function(_0x4ee332){const _0x23e41d=_0x19098e;return this[_0x23e41d(0x14c)][_0x23e41d(0x117)]['find'](_0x56ee25=>_0x56ee25[_0x23e41d(0x1cd)]===_0x4ee332);},Spriteset_Map[_0x19098e(0x179)][_0x19098e(0x201)]=function(_0x1308ea){const _0x42531c=_0x19098e,_0x53723c=this[_0x42531c(0x17c)](_0x1308ea);_0x53723c&&this[_0x42531c(0x14c)][_0x42531c(0x193)](_0x53723c);},Spriteset_Map[_0x19098e(0x179)][_0x19098e(0x1f6)]=function(_0x407473,_0x3509c4){const _0x1c3414=_0x19098e,_0x3164f5=this[_0x1c3414(0x17c)](_0x407473);!_0x3164f5?(this[_0x1c3414(0x190)]($gameMap[_0x1c3414(0x146)](_0x407473)),this[_0x1c3414(0xf0)]()):(_0x3164f5[_0x1c3414(0x145)](),_0x3509c4&&_0x3164f5['bitmap']['addLoadListener'](_0x3164f5[_0x1c3414(0x171)][_0x1c3414(0xe5)](_0x3164f5)));};