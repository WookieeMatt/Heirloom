//=============================================================================
// VisuStella MZ - Visual Parallaxes
// VisuMZ_4_VisualParallaxes.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualParallaxes = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualParallaxes = VisuMZ.VisualParallaxes || {};
VisuMZ.VisualParallaxes.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.06] [VisualParallaxes]
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

const _0xfb75ea=_0x35d8;(function(_0x46e900,_0x86b738){const _0x53d84e=_0x35d8,_0x18c67b=_0x46e900();while(!![]){try{const _0x4437e1=-parseInt(_0x53d84e(0x280))/0x1*(-parseInt(_0x53d84e(0x1c5))/0x2)+parseInt(_0x53d84e(0x1d3))/0x3+-parseInt(_0x53d84e(0x28f))/0x4+-parseInt(_0x53d84e(0x16d))/0x5*(parseInt(_0x53d84e(0x27a))/0x6)+-parseInt(_0x53d84e(0x26e))/0x7*(-parseInt(_0x53d84e(0x247))/0x8)+parseInt(_0x53d84e(0x29c))/0x9*(-parseInt(_0x53d84e(0x28c))/0xa)+-parseInt(_0x53d84e(0x174))/0xb*(-parseInt(_0x53d84e(0x19c))/0xc);if(_0x4437e1===_0x86b738)break;else _0x18c67b['push'](_0x18c67b['shift']());}catch(_0x243c17){_0x18c67b['push'](_0x18c67b['shift']());}}}(_0x27c4,0x792d9));var label='VisualParallaxes',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xfb75ea(0x240)](function(_0x5710a9){const _0x480c85=_0xfb75ea;return _0x5710a9[_0x480c85(0x1ff)]&&_0x5710a9[_0x480c85(0x206)][_0x480c85(0x199)]('['+label+']');})[0x0];VisuMZ[label][_0xfb75ea(0x25b)]=VisuMZ[label][_0xfb75ea(0x25b)]||{},VisuMZ[_0xfb75ea(0x1b0)]=function(_0x475244,_0x426d76){const _0x529d44=_0xfb75ea;for(const _0x2d8b33 in _0x426d76){if(_0x2d8b33[_0x529d44(0x1c3)](/(.*):(.*)/i)){const _0x4a21a1=String(RegExp['$1']),_0x8a1994=String(RegExp['$2'])['toUpperCase']()[_0x529d44(0x15d)]();let _0x2eb1a0,_0x5bd28b,_0x4eb090;switch(_0x8a1994){case'NUM':_0x2eb1a0=_0x426d76[_0x2d8b33]!==''?Number(_0x426d76[_0x2d8b33]):0x0;break;case _0x529d44(0x267):_0x5bd28b=_0x426d76[_0x2d8b33]!==''?JSON[_0x529d44(0x1cf)](_0x426d76[_0x2d8b33]):[],_0x2eb1a0=_0x5bd28b[_0x529d44(0x22a)](_0x39c05a=>Number(_0x39c05a));break;case'EVAL':_0x2eb1a0=_0x426d76[_0x2d8b33]!==''?eval(_0x426d76[_0x2d8b33]):null;break;case _0x529d44(0x15c):_0x5bd28b=_0x426d76[_0x2d8b33]!==''?JSON['parse'](_0x426d76[_0x2d8b33]):[],_0x2eb1a0=_0x5bd28b[_0x529d44(0x22a)](_0x23d1b0=>eval(_0x23d1b0));break;case'JSON':_0x2eb1a0=_0x426d76[_0x2d8b33]!==''?JSON[_0x529d44(0x1cf)](_0x426d76[_0x2d8b33]):'';break;case'ARRAYJSON':_0x5bd28b=_0x426d76[_0x2d8b33]!==''?JSON[_0x529d44(0x1cf)](_0x426d76[_0x2d8b33]):[],_0x2eb1a0=_0x5bd28b[_0x529d44(0x22a)](_0x233579=>JSON['parse'](_0x233579));break;case _0x529d44(0x1d0):_0x2eb1a0=_0x426d76[_0x2d8b33]!==''?new Function(JSON['parse'](_0x426d76[_0x2d8b33])):new Function(_0x529d44(0x1ba));break;case _0x529d44(0x28b):_0x5bd28b=_0x426d76[_0x2d8b33]!==''?JSON[_0x529d44(0x1cf)](_0x426d76[_0x2d8b33]):[],_0x2eb1a0=_0x5bd28b['map'](_0x2cbf13=>new Function(JSON[_0x529d44(0x1cf)](_0x2cbf13)));break;case _0x529d44(0x245):_0x2eb1a0=_0x426d76[_0x2d8b33]!==''?String(_0x426d76[_0x2d8b33]):'';break;case _0x529d44(0x229):_0x5bd28b=_0x426d76[_0x2d8b33]!==''?JSON[_0x529d44(0x1cf)](_0x426d76[_0x2d8b33]):[],_0x2eb1a0=_0x5bd28b[_0x529d44(0x22a)](_0x38d217=>String(_0x38d217));break;case _0x529d44(0x1b5):_0x4eb090=_0x426d76[_0x2d8b33]!==''?JSON['parse'](_0x426d76[_0x2d8b33]):{},_0x2eb1a0=VisuMZ[_0x529d44(0x1b0)]({},_0x4eb090);break;case _0x529d44(0x1a7):_0x5bd28b=_0x426d76[_0x2d8b33]!==''?JSON['parse'](_0x426d76[_0x2d8b33]):[],_0x2eb1a0=_0x5bd28b[_0x529d44(0x22a)](_0x252f5b=>VisuMZ['ConvertParams']({},JSON[_0x529d44(0x1cf)](_0x252f5b)));break;default:continue;}_0x475244[_0x4a21a1]=_0x2eb1a0;}}return _0x475244;},(_0x474b34=>{const _0x5697d3=_0xfb75ea,_0x536f03=_0x474b34[_0x5697d3(0x145)];for(const _0x57a79b of dependencies){if(!Imported[_0x57a79b]){if(_0x5697d3(0x140)!==_0x5697d3(0x27f)){alert(_0x5697d3(0x28a)[_0x5697d3(0x172)](_0x536f03,_0x57a79b)),SceneManager[_0x5697d3(0x234)]();break;}else _0x1e3a91[_0x5697d3(0x212)]+=_0x36f43a['_parallaxSy']/this[_0x5697d3(0x154)]()/0x2;}}const _0x2386ff=_0x474b34[_0x5697d3(0x206)];if(_0x2386ff[_0x5697d3(0x1c3)](/\[Version[ ](.*?)\]/i)){const _0x5bc942=Number(RegExp['$1']);_0x5bc942!==VisuMZ[label][_0x5697d3(0x244)]&&(_0x5697d3(0x1ea)===_0x5697d3(0x1ea)?(alert(_0x5697d3(0x1c8)['format'](_0x536f03,_0x5bc942)),SceneManager['exit']()):_0x542a36['bitmap'][_0x5697d3(0x200)](_0x4f51f1['createMaskBitmap']['bind'](_0x58c3fa)));}if(_0x2386ff[_0x5697d3(0x1c3)](/\[Tier[ ](\d+)\]/i)){if('HDNpW'===_0x5697d3(0x211)){const _0x31fa=Number(RegExp['$1']);_0x31fa<tier?(alert(_0x5697d3(0x1e7)[_0x5697d3(0x172)](_0x536f03,_0x31fa,tier)),SceneManager['exit']()):tier=Math[_0x5697d3(0x1b3)](_0x31fa,tier);}else{const _0xabbb01=this['getVisualParallaxSettings'](_0x234833);if(_0xabbb01[_0x5697d3(0x190)])return _0xabbb01['_parallaxY']*this[_0x5697d3(0x154)]();else return _0xabbb01[_0x5697d3(0x1e0)]?_0xabbb01['_parallaxY']*this[_0x5697d3(0x154)]()/0x2:0x0;}}VisuMZ['ConvertParams'](VisuMZ[label][_0x5697d3(0x25b)],_0x474b34['parameters']);})(pluginData),VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x155)]=function(){return{'id':0x0,'filename':'','_parallaxZero':![],'_parallaxLoopX':![],'_parallaxLoopY':![],'_parallaxSx':0x0,'_parallaxSy':0x0,'_parallaxX':0x0,'_parallaxY':0x0,'opacity':0xff,'targetOpacity':0xff,'opacityDuration':0x0,'blendMode':0x0,'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[]};},PluginManager[_0xfb75ea(0x253)](pluginData[_0xfb75ea(0x145)],_0xfb75ea(0x276),_0xa80ca1=>{const _0x211635=_0xfb75ea;VisuMZ[_0x211635(0x1b0)](_0xa80ca1,_0xa80ca1);if(_0xa80ca1['id']<=0x0)return;if(_0xa80ca1[_0x211635(0x23d)]===''||_0xa80ca1[_0x211635(0x23d)]===_0x211635(0x147))return;let _0x3d5951=JsonEx['makeDeepCopy'](_0xa80ca1['Optional']);if(!_0x3d5951['hasOwnProperty'](_0x211635(0x238)))_0x3d5951=VisuMZ[_0x211635(0x170)][_0x211635(0x155)]();_0x3d5951[_0x211635(0x23d)]=_0xa80ca1[_0x211635(0x23d)],_0x3d5951['id']=_0xa80ca1['id'];if(_0xa80ca1[_0x211635(0x1d7)]===_0x211635(0x215)){_0x3d5951['maskRegions']['length']<=0x0&&(_0x3d5951[_0x211635(0x238)]=JsonEx['makeDeepCopy']($gameMap[_0x211635(0x236)]()));if(_0x3d5951[_0x211635(0x261)]['length']<=0x0){if('OsKMG'===_0x211635(0x20f))return 0x0;else _0x3d5951['maskTerrainTags']=JsonEx['makeDeepCopy']($gameMap[_0x211635(0x26c)]());}}_0xa80ca1[_0x211635(0x1d7)]===_0x211635(0x251)&&(_0x3d5951[_0x211635(0x238)][_0x211635(0x141)]<=0x0&&(_0x3d5951['maskRegions']=JsonEx['makeDeepCopy']($gameMap[_0x211635(0x21e)]())),_0x3d5951[_0x211635(0x261)][_0x211635(0x141)]<=0x0&&(_0x3d5951[_0x211635(0x261)]=JsonEx[_0x211635(0x295)]($gameMap[_0x211635(0x20a)]())));while(_0x3d5951[_0x211635(0x22c)][_0x211635(0x141)]<0x4){'dUYGv'!=='dUYGv'?this[_0x211635(0x1ab)]=![]:_0x3d5951[_0x211635(0x22c)][_0x211635(0x1f3)](0x0);}_0x3d5951['_parallaxX']=0x0,_0x3d5951[_0x211635(0x212)]=0x0,_0x3d5951['targetOpacity']=_0xa80ca1[_0x211635(0x204)],_0x3d5951[_0x211635(0x1a5)]=0x0,$gameMap[_0x211635(0x201)](_0x3d5951);}),PluginManager[_0xfb75ea(0x253)](pluginData[_0xfb75ea(0x145)],_0xfb75ea(0x183),_0x2f3a73=>{const _0x47c260=_0xfb75ea;if(!SceneManager[_0x47c260(0x1ca)]())return;VisuMZ[_0x47c260(0x1b0)](_0x2f3a73,_0x2f3a73);const _0x22b9c9=_0x2f3a73[_0x47c260(0x1cb)];for(const _0x4d503b of _0x22b9c9){const _0x16be5d=$gameMap[_0x47c260(0x25d)](_0x4d503b);if(!_0x16be5d)continue;_0x16be5d[_0x47c260(0x1a4)]=_0x2f3a73[_0x47c260(0x1a4)]||0x0,_0x16be5d[_0x47c260(0x1a5)]=_0x2f3a73[_0x47c260(0x1a5)]||0x0;if(_0x16be5d[_0x47c260(0x1a5)]<=0x0){if('leGUi'!=='FwMcs')_0x16be5d[_0x47c260(0x204)]=_0x16be5d[_0x47c260(0x1a4)];else{const _0x2fc55f=_0x2fda93(_0x53066d['$1'])[_0x47c260(0x249)](',')[_0x47c260(0x22a)](_0x3f1789=>_0x568e75(_0x3f1789)||0x0);if(_0x2fc55f['length']<=0x1)_0x2fc55f[0x1]=_0x2fc55f[0x0];}}}}),PluginManager[_0xfb75ea(0x253)](pluginData[_0xfb75ea(0x145)],_0xfb75ea(0x1d9),_0x4b5b69=>{const _0x2aa525=_0xfb75ea;if(!SceneManager[_0x2aa525(0x1ca)]())return;VisuMZ[_0x2aa525(0x1b0)](_0x4b5b69,_0x4b5b69);const _0x117ccb=_0x4b5b69['list'];for(const _0x1737da of _0x117ccb){'BnMlr'===_0x2aa525(0x1db)?$gameMap['removeVisualParallax'](_0x1737da):(_0x353199['x']=_0xd91ab0[_0x2aa525(0x23e)](-_0x438d55[_0x2aa525(0x1f2)]()*_0x31eb4c[_0x2aa525(0x1cd)]()),_0x3036fb['y']=_0x30f3b5[_0x2aa525(0x23e)](-_0x4d9c15[_0x2aa525(0x1e8)]()*_0x1d8778[_0x2aa525(0x154)]()));}}),VisuMZ[_0xfb75ea(0x170)]['RegExp']={'Start':/<(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'End':/<\/(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'Filename':/(?:FILENAME|NAME):[ ](.*)/i,'HorzLoop':/(?:HORZ|HORIZONTAL) (?:LOOP|SCROLL):[ ](.*)/i,'VertLoop':/(?:VERT|VERTICAL) (?:LOOP|SCROLL):[ ](.*)/i,'ScrollLock':/<(?:MAP|SCROLL)[ ](?:LOCK|LOCKED)>/i,'OpacityRate':/(?:OPACITY):[ ](\d+)([%％])/i,'OpacityFlat':/(?:OPACITY):[ ](\d+)/i,'BlendMode':/BLEND MODE:[ ](.*)/i,'Hue':/HUE:[ ](\d+)/i,'HueShift':/HUE (?:SHIFT|SPEED):[ ](.*)/i,'Tone':/(?:COLOR TONE|TONE|TINT):[ ](.*)/i,'MaskRegions':/(?:REGION|REGIONS):[ ](.*)/i,'MaskTerrainTags':/TERRAIN (?:TAG|TAGS):[ ](.*)/i,'WaterRegions':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'WaterTerrainTags':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'WaterTop':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TOP>/i,'WaterBottom':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOTTOM>/i,'WaterBlur':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BLUR:[ ](.*)>/i,'WaterOpacityRate':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'WaterOpacityFlat':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)>/i,'WaterBoundary':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOUNDARY:[ ](.*)>/i,'WaterAmplitude':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:AMP|AMPLITUDE):[ ](.*)>/i,'WaterWavelength':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:WAVE|WAVELENGTH):[ ](.*)>/i,'SolidRegions':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'SolidTerrainTags':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'SolidTop':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TOP>/i,'SolidBottom':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BOTTOM>/i,'SolidBlur':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BLUR:[ ](.*)>/i,'SolidOpacityRate':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'SolidOpacityFlat':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)>/i,'NoReflection':/<NO (?:REFLECT|REFLECTION|REFLECTIONS)>/i},SceneManager[_0xfb75ea(0x1ce)]=function(){const _0xc034e5=_0xfb75ea;return this[_0xc034e5(0x20d)]&&this[_0xc034e5(0x20d)]['constructor']===Scene_Map;},SceneManager[_0xfb75ea(0x1ca)]=function(){const _0x42291b=_0xfb75ea;return this['_scene']&&this[_0x42291b(0x20d)]instanceof Scene_Map;},VisuMZ['VisualParallaxes'][_0xfb75ea(0x1af)]=Game_Map['prototype'][_0xfb75ea(0x26a)],Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x26a)]=function(_0x752915){const _0x5d944f=_0xfb75ea;VisuMZ[_0x5d944f(0x170)][_0x5d944f(0x1af)][_0x5d944f(0x1f8)](this,_0x752915),this[_0x5d944f(0x1b6)](),this[_0x5d944f(0x209)]();},Game_Map[_0xfb75ea(0x14e)]=VisuMZ[_0xfb75ea(0x170)]['Settings'][_0xfb75ea(0x1f1)][_0xfb75ea(0x258)],Game_Map[_0xfb75ea(0x198)]=VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x25b)][_0xfb75ea(0x1f1)][_0xfb75ea(0x260)],Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x24f)]=function(){const _0x3b0aa6=_0xfb75ea;if(DataManager[_0x3b0aa6(0x294)]())return!![];if(this[_0x3b0aa6(0x216)]()||this[_0x3b0aa6(0x1a8)]())return!![];const _0x9f0980=VisuMZ[_0x3b0aa6(0x170)][_0x3b0aa6(0x256)],_0x31be63=$dataMap[_0x3b0aa6(0x24a)]||'';if(_0x31be63[_0x3b0aa6(0x1c3)](_0x9f0980[_0x3b0aa6(0x13f)]))return!![];else{if(_0x3b0aa6(0x23c)===_0x3b0aa6(0x17e))_0xe18834['_parallaxY']+=this['_displayY']-_0x1e45e8;else return![];}},Game_Map['prototype'][_0xfb75ea(0x236)]=function(){const _0x1ed107=_0xfb75ea,_0x3312ef=VisuMZ[_0x1ed107(0x170)][_0x1ed107(0x256)],_0x1a4ab7=$dataMap[_0x1ed107(0x24a)]||'';if(_0x1a4ab7[_0x1ed107(0x1c3)](_0x3312ef[_0x1ed107(0x296)]))return String(RegExp['$1'])[_0x1ed107(0x249)](',')[_0x1ed107(0x22a)](_0x4f31c2=>Number(_0x4f31c2)||0x1)['remove'](0x0);return JsonEx[_0x1ed107(0x295)](Game_Map[_0x1ed107(0x14e)])[_0x1ed107(0x27e)](0x0);},Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x26c)]=function(){const _0x2a68ca=_0xfb75ea,_0x56b116=VisuMZ['VisualParallaxes'][_0x2a68ca(0x256)],_0x4a632f=$dataMap[_0x2a68ca(0x24a)]||'';if(_0x4a632f[_0x2a68ca(0x1c3)](_0x56b116[_0x2a68ca(0x19f)])){if(_0x2a68ca(0x22f)===_0x2a68ca(0x22f))return String(RegExp['$1'])['split'](',')[_0x2a68ca(0x22a)](_0x7bd5d1=>Number(_0x7bd5d1)||0x1)[_0x2a68ca(0x27e)](0x0);else _0x4bd91f['loadBitmap'](),_0x53affa&&_0xe7715e[_0x2a68ca(0x271)][_0x2a68ca(0x200)](_0x2e22ab[_0x2a68ca(0x285)][_0x2a68ca(0x19b)](_0x4db1e2));}return JsonEx[_0x2a68ca(0x295)](Game_Map[_0x2a68ca(0x198)])[_0x2a68ca(0x27e)](0x0);},Game_Map[_0xfb75ea(0x196)]=VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x25b)]['WaterReflect']['Top'],Game_Map[_0xfb75ea(0x281)]=VisuMZ[_0xfb75ea(0x170)]['Settings'][_0xfb75ea(0x1f1)][_0xfb75ea(0x144)],Game_Map[_0xfb75ea(0x1fa)]=VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x25b)][_0xfb75ea(0x1f1)][_0xfb75ea(0x282)],Game_Map['DEFAULT_WATER_REFLECTION_FILTER_BOUNDARY']=VisuMZ[_0xfb75ea(0x170)]['Settings'][_0xfb75ea(0x1f1)][_0xfb75ea(0x1bc)],Game_Map[_0xfb75ea(0x16a)]=[VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x25b)][_0xfb75ea(0x1f1)][_0xfb75ea(0x214)],VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x25b)][_0xfb75ea(0x1f1)][_0xfb75ea(0x150)]],Game_Map[_0xfb75ea(0x230)]=[VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x25b)][_0xfb75ea(0x1f1)][_0xfb75ea(0x184)],VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x25b)][_0xfb75ea(0x1f1)][_0xfb75ea(0x25e)]],Game_Map[_0xfb75ea(0x1ac)]['getWaterReflectionTop']=function(){const _0x19e620=_0xfb75ea,_0x2b520d=VisuMZ['VisualParallaxes'][_0x19e620(0x256)],_0x1e95c1=$dataMap[_0x19e620(0x24a)]||'';if(_0x1e95c1[_0x19e620(0x1c3)](_0x2b520d[_0x19e620(0x152)]))return!![];else{if(_0x1e95c1['match'](_0x2b520d[_0x19e620(0x21d)]))return![];}return Game_Map['DEFAULT_WATER_REFLECTION_FILTER_TOP'];},Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x297)]=function(){const _0x15ab44=_0xfb75ea,_0x270c3f=VisuMZ[_0x15ab44(0x170)]['RegExp'],_0x184f13=$dataMap['note']||'';if(_0x184f13['match'](_0x270c3f['WaterBlur'])){if(_0x15ab44(0x1b2)===_0x15ab44(0x1e3))this['filters']=[];else return Math['max'](0x0,Number(RegExp['$1'])||0x0);}return Game_Map[_0x15ab44(0x281)];},Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x242)]=function(){const _0x3f00d3=_0xfb75ea,_0x4500bb=VisuMZ['VisualParallaxes']['RegExp'],_0x32e80a=$dataMap[_0x3f00d3(0x24a)]||'';if(_0x32e80a['match'](_0x4500bb[_0x3f00d3(0x1ee)]))return Math[_0x3f00d3(0x1a9)]((Number(RegExp['$1'])||0x0)*0.01*0xff)[_0x3f00d3(0x28e)](0x0,0xff);else{if(_0x32e80a['match'](_0x4500bb[_0x3f00d3(0x265)])){if(_0x3f00d3(0x1d8)===_0x3f00d3(0x1d8))return(Number(RegExp['$1'])||0x0)[_0x3f00d3(0x28e)](0x0,0xff);else{const _0x552a8e=_0x16ffaf[_0x3f00d3(0x170)]['RegExp'],_0x4d5eec=_0x10dbdc[_0x3f00d3(0x24a)]||'';if(_0x4d5eec['match'](_0x552a8e['SolidRegions']))return _0x180990(_0x3bfce8['$1'])[_0x3f00d3(0x249)](',')[_0x3f00d3(0x22a)](_0x4c1ff7=>_0x1d5cd0(_0x4c1ff7)||0x1)['remove'](0x0);return _0x2d18fb['makeDeepCopy'](_0x97c7d4['DEFAULT_SOLID_REFLECTION_REGIONS'])[_0x3f00d3(0x27e)](0x0);}}}return Game_Map[_0x3f00d3(0x263)];},Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x203)]=function(){const _0x2a12fa=_0xfb75ea,_0x46bfa1=VisuMZ[_0x2a12fa(0x170)][_0x2a12fa(0x256)],_0x34c614=$dataMap[_0x2a12fa(0x24a)]||'';if(_0x34c614[_0x2a12fa(0x1c3)](_0x46bfa1[_0x2a12fa(0x20e)])){if('AnAbk'===_0x2a12fa(0x19e))return(Number(RegExp['$1'])||0x0)[_0x2a12fa(0x28e)](0x0,0x1);else _0x539662[_0x2a12fa(0x238)]['length']<=0x0&&(_0x48cffc[_0x2a12fa(0x238)]=_0x22999a[_0x2a12fa(0x295)](_0x197969[_0x2a12fa(0x21e)]())),_0x18e43f[_0x2a12fa(0x261)][_0x2a12fa(0x141)]<=0x0&&(_0xb30fb9[_0x2a12fa(0x261)]=_0x13a65a[_0x2a12fa(0x295)](_0x57f1ab[_0x2a12fa(0x20a)]()));}return Game_Map[_0x2a12fa(0x1c0)];},Game_Map['prototype'][_0xfb75ea(0x217)]=function(){const _0x1b59e4=_0xfb75ea,_0x51ff86=VisuMZ['VisualParallaxes'][_0x1b59e4(0x256)],_0x58e1c0=$dataMap[_0x1b59e4(0x24a)]||'';if(_0x58e1c0[_0x1b59e4(0x1c3)](_0x51ff86[_0x1b59e4(0x226)])){if('jxSgH'!=='rYYIO'){const _0x5237dd=String(RegExp['$1'])[_0x1b59e4(0x249)](',')['map'](_0x4e4628=>Number(_0x4e4628)||0x0);if(_0x5237dd[_0x1b59e4(0x141)]<=0x1)_0x5237dd[0x1]=_0x5237dd[0x0];}else{const _0xf0f923=_0x3b5559[_0x1b59e4(0x236)](),_0x11b361=_0x3b4aea[_0x1b59e4(0x26c)](),_0x179036=this[_0x1b59e4(0x16c)](_0xf0f923,_0x11b361);_0x179036&&(this['addChild'](_0x179036),this['_waterReflectLayer'][_0x1b59e4(0x18a)]=_0x179036);}}return JsonEx[_0x1b59e4(0x295)](Game_Map['DEFAULT_WATER_REFLECTION_FILTER_AMPLITUDE'])['remove'](0x0);},Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x1ef)]=function(){const _0x114b48=_0xfb75ea,_0x12a66f=VisuMZ[_0x114b48(0x170)][_0x114b48(0x256)],_0x2e78e7=$dataMap[_0x114b48(0x24a)]||'';if(_0x2e78e7[_0x114b48(0x1c3)](_0x12a66f[_0x114b48(0x226)])){const _0x2f18ec=String(RegExp['$1'])['split'](',')['map'](_0x3628ac=>Number(_0x3628ac)||0x0);if(_0x2f18ec['length']<=0x1)_0x2f18ec[0x1]=_0x2f18ec[0x0];}return JsonEx[_0x114b48(0x295)](Game_Map[_0x114b48(0x230)])[_0x114b48(0x27e)](0x0);},Game_Map[_0xfb75ea(0x290)]=VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x25b)][_0xfb75ea(0x18e)][_0xfb75ea(0x258)],Game_Map['DEFAULT_SOLID_REFLECTION_TERRAINTAGS']=VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x25b)]['SolidReflect'][_0xfb75ea(0x260)],Game_Map['prototype'][_0xfb75ea(0x21e)]=function(){const _0x3cc8e4=_0xfb75ea,_0x28d669=VisuMZ['VisualParallaxes']['RegExp'],_0x40ea18=$dataMap[_0x3cc8e4(0x24a)]||'';if(_0x40ea18[_0x3cc8e4(0x1c3)](_0x28d669[_0x3cc8e4(0x186)]))return String(RegExp['$1'])[_0x3cc8e4(0x249)](',')['map'](_0x39b95b=>Number(_0x39b95b)||0x1)[_0x3cc8e4(0x27e)](0x0);return JsonEx[_0x3cc8e4(0x295)](Game_Map[_0x3cc8e4(0x290)])[_0x3cc8e4(0x27e)](0x0);},Game_Map['prototype'][_0xfb75ea(0x20a)]=function(){const _0x1df431=_0xfb75ea,_0x3692d8=VisuMZ['VisualParallaxes'][_0x1df431(0x256)],_0xc38b5e=$dataMap['note']||'';if(_0xc38b5e[_0x1df431(0x1c3)](_0x3692d8[_0x1df431(0x25a)]))return String(RegExp['$1'])['split'](',')[_0x1df431(0x22a)](_0xb2b710=>Number(_0xb2b710)||0x1)[_0x1df431(0x27e)](0x0);return JsonEx[_0x1df431(0x295)](Game_Map[_0x1df431(0x210)])[_0x1df431(0x27e)](0x0);},Game_Map['DEFAULT_SOLID_REFLECTION_FILTER_TOP']=VisuMZ['VisualParallaxes'][_0xfb75ea(0x25b)]['SolidReflect'][_0xfb75ea(0x228)],Game_Map[_0xfb75ea(0x17a)]=VisuMZ[_0xfb75ea(0x170)]['Settings'][_0xfb75ea(0x18e)][_0xfb75ea(0x144)],Game_Map[_0xfb75ea(0x263)]=VisuMZ['VisualParallaxes']['Settings']['SolidReflect'][_0xfb75ea(0x282)],Game_Map['prototype'][_0xfb75ea(0x1a3)]=function(){const _0x433417=_0xfb75ea,_0x415852=VisuMZ['VisualParallaxes'][_0x433417(0x256)],_0x35fa97=$dataMap[_0x433417(0x24a)]||'';if(_0x35fa97[_0x433417(0x1c3)](_0x415852[_0x433417(0x176)]))return!![];else{if(_0x35fa97[_0x433417(0x1c3)](_0x415852['SolidBottom']))return'qKBdW'!==_0x433417(0x161)?![]:_0x35b0f5[_0x433417(0x212)]*this[_0x433417(0x154)]()/0x2;}return Game_Map[_0x433417(0x248)];},Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x1dc)]=function(){const _0x512158=_0xfb75ea,_0x554e2c=VisuMZ[_0x512158(0x170)]['RegExp'],_0x396f17=$dataMap[_0x512158(0x24a)]||'';if(_0x396f17[_0x512158(0x1c3)](_0x554e2c[_0x512158(0x1c2)]))return Math['max'](0x0,Number(RegExp['$1'])||0x0);return Game_Map[_0x512158(0x17a)];},Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x223)]=function(){const _0x11bd43=_0xfb75ea,_0x52ba35=VisuMZ[_0x11bd43(0x170)][_0x11bd43(0x256)],_0x51038b=$dataMap[_0x11bd43(0x24a)]||'';if(_0x51038b[_0x11bd43(0x1c3)](_0x52ba35[_0x11bd43(0x21f)]))return Math[_0x11bd43(0x1a9)]((Number(RegExp['$1'])||0x0)*0.01*0xff)['clamp'](0x0,0xff);else{if(_0x51038b['match'](_0x52ba35[_0x11bd43(0x17f)]))return(Number(RegExp['$1'])||0x0)[_0x11bd43(0x28e)](0x0,0xff);}return Game_Map[_0x11bd43(0x263)];},Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x209)]=function(){const _0x309dcb=_0xfb75ea,_0x245756=this[_0x309dcb(0x236)](),_0x5c5faa=this['getWaterReflectionTerrainTags'](),_0x14a8cb=this[_0x309dcb(0x21e)](),_0x343156=this[_0x309dcb(0x20a)](),_0x2b0094=this[_0x309dcb(0x15e)](),_0x84ab44=this[_0x309dcb(0x1c6)]();this[_0x309dcb(0x299)]=![],this[_0x309dcb(0x298)]=![];for(let _0x15bec9=0x0;_0x15bec9<_0x2b0094;_0x15bec9++){if('ZnBgQ'!=='ZnBgQ'){const _0x397545=_0x17e5d7(_0x1fc0d4['$1'])[_0x309dcb(0x173)]()[_0x309dcb(0x15d)](),_0x459cd2=[_0x309dcb(0x213),_0x309dcb(0x15b),_0x309dcb(0x1f7),_0x309dcb(0x1eb)];_0x1b1ada[_0x309dcb(0x1ad)]=_0x459cd2[_0x309dcb(0x232)](_0x397545)['clamp'](0x0,0x3);}else for(let _0x17aee7=0x0;_0x17aee7<_0x2b0094;_0x17aee7++){const _0x25a686=this[_0x309dcb(0x1aa)](_0x15bec9,_0x17aee7);_0x245756['includes'](_0x25a686)&&(this[_0x309dcb(0x299)]=!![]);_0x14a8cb[_0x309dcb(0x199)](_0x25a686)&&(this[_0x309dcb(0x298)]=!![]);const _0x24a195=this[_0x309dcb(0x149)](_0x15bec9,_0x17aee7);_0x5c5faa['includes'](_0x24a195)&&(this[_0x309dcb(0x299)]=!![]);_0x343156[_0x309dcb(0x199)](_0x24a195)&&(this['_hasSolidReflections']=!![]);if(this['_hasWaterReflections']&&this['_hasSolidReflections'])break;}}},Game_Map[_0xfb75ea(0x1ac)]['hasWaterReflections']=function(){const _0x33b879=_0xfb75ea;if(this[_0x33b879(0x299)]===undefined)this[_0x33b879(0x209)]();return this[_0x33b879(0x299)];},Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x1bf)]=function(){const _0x328392=_0xfb75ea;if(this[_0x328392(0x298)]===undefined)this[_0x328392(0x209)]();return this[_0x328392(0x298)];},Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x1b6)]=function(){const _0x427245=_0xfb75ea;this[_0x427245(0x246)]=[null];if(!$dataMap)return;const _0x2996e1=VisuMZ[_0x427245(0x170)]['CreateLayerData']();for(const _0x30d464 of _0x2996e1){if(!_0x30d464)continue;this[_0x427245(0x246)][_0x30d464['id']]=_0x30d464;}},VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x29a)]=function(){const _0x42776c=_0xfb75ea;if(!$dataMap)return[];const _0x5107a8=[],_0x1ca0b2=VisuMZ[_0x42776c(0x170)][_0x42776c(0x155)]();if(!$dataMap[_0x42776c(0x24a)])return[];const _0x36e471=VisuMZ[_0x42776c(0x170)][_0x42776c(0x256)],_0x1ab4d0=$dataMap[_0x42776c(0x24a)][_0x42776c(0x249)](/[\r\n]+/);let _0x22eb25=JsonEx['makeDeepCopy'](_0x1ca0b2);for(const _0x20f573 of _0x1ab4d0){if(_0x20f573['match'](_0x36e471['Start'])){if(_0x42776c(0x160)!=='VcyxS')return![];else{_0x22eb25['id']=Number(RegExp['$1']);if(_0x20f573[_0x42776c(0x1c3)](/WATER/i))_0x22eb25[_0x42776c(0x238)]=JsonEx[_0x42776c(0x295)]($gameMap['getWaterReflectionRegions']()),_0x22eb25[_0x42776c(0x261)]=JsonEx[_0x42776c(0x295)]($gameMap[_0x42776c(0x26c)]());else{if(_0x20f573[_0x42776c(0x1c3)](/SOLID/i)){if(_0x42776c(0x1ec)===_0x42776c(0x1ec))_0x22eb25[_0x42776c(0x238)]=JsonEx[_0x42776c(0x295)]($gameMap[_0x42776c(0x21e)]()),_0x22eb25['maskTerrainTags']=JsonEx[_0x42776c(0x295)]($gameMap[_0x42776c(0x20a)]());else{if(!this[_0x42776c(0x1ed)]())return;const _0xc6d51a=this[_0x42776c(0x1cb)]();let _0x5cb766='';for(const _0xf09e67 of _0xc6d51a){if([0x6c,0x198][_0x42776c(0x199)](_0xf09e67[_0x42776c(0x1b1)])){if(_0x5cb766!=='')_0x5cb766+='\x0a';_0x5cb766+=_0xf09e67['parameters'][0x0];}}this[_0x42776c(0x1b8)](_0x5cb766);}}}}}else{if(_0x20f573[_0x42776c(0x1c3)](_0x36e471[_0x42776c(0x27b)])){if(_0x42776c(0x25f)===_0x42776c(0x25f)){const _0x3f6b96=Number(RegExp['$1']);if(_0x3f6b96>0x0&&_0x3f6b96===_0x22eb25['id']&&_0x22eb25['filename']!=='')_0x5107a8['push'](_0x22eb25);_0x22eb25=JsonEx[_0x42776c(0x295)](_0x1ca0b2);}else _0x54309a=!![];}else{if(_0x22eb25['id']<=0x0)continue;}}if(_0x20f573[_0x42776c(0x1c3)](_0x36e471[_0x42776c(0x1e6)]))_0x42776c(0x171)!==_0x42776c(0x171)?(this[_0x42776c(0x164)][_0x42776c(0x159)](this['_waterReflectContainer']),this[_0x42776c(0x273)]=![]):(_0x22eb25[_0x42776c(0x23d)]=String(RegExp['$1'])['trim'](),_0x22eb25['filename'][_0x42776c(0x180)](0x0)==='!'&&(_0x22eb25[_0x42776c(0x190)]=!![]));else{if(_0x20f573['match'](_0x36e471['HorzLoop']))_0x22eb25[_0x42776c(0x1fe)]=!![],_0x22eb25[_0x42776c(0x1b9)]=Number(RegExp['$1'])||0x0;else{if(_0x20f573[_0x42776c(0x1c3)](_0x36e471[_0x42776c(0x197)]))'cWaAH'!==_0x42776c(0x1f5)?_0x235dad[_0x42776c(0x233)](_0x58ec44):(_0x22eb25[_0x42776c(0x1e0)]=!![],_0x22eb25[_0x42776c(0x162)]=Number(RegExp['$1'])||0x0);else{if(_0x20f573[_0x42776c(0x1c3)](_0x36e471['ScrollLock']))_0x22eb25['_parallaxZero']=!![];else{if(_0x20f573['match'](_0x36e471[_0x42776c(0x24d)])){if(_0x42776c(0x1e2)===_0x42776c(0x1e2)){const _0x50c70c=Number(RegExp['$1'])*0.01;_0x22eb25[_0x42776c(0x204)]=Math[_0x42776c(0x1a9)](_0x50c70c*0xff)[_0x42776c(0x28e)](0x0,0xff);}else return{'id':0x0,'filename':'','_parallaxZero':![],'_parallaxLoopX':![],'_parallaxLoopY':![],'_parallaxSx':0x0,'_parallaxSy':0x0,'_parallaxX':0x0,'_parallaxY':0x0,'opacity':0xff,'targetOpacity':0xff,'opacityDuration':0x0,'blendMode':0x0,'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[]};}else{if(_0x20f573[_0x42776c(0x1c3)](_0x36e471[_0x42776c(0x29e)]))_0x22eb25[_0x42776c(0x204)]=Number(RegExp['$1'])[_0x42776c(0x28e)](0x0,0xff);else{if(_0x20f573[_0x42776c(0x1c3)](_0x36e471['BlendMode'])){const _0x19afdb=String(RegExp['$1'])[_0x42776c(0x173)]()[_0x42776c(0x15d)](),_0x3cee0e=['NORMAL',_0x42776c(0x15b),_0x42776c(0x1f7),_0x42776c(0x1eb)];_0x22eb25[_0x42776c(0x1ad)]=_0x3cee0e['indexOf'](_0x19afdb)[_0x42776c(0x28e)](0x0,0x3);}else{if(_0x20f573[_0x42776c(0x1c3)](_0x36e471['Hue']))_0x22eb25['hue']=Number(RegExp['$1'])[_0x42776c(0x28e)](0x0,0x168);else{if(_0x20f573['match'](_0x36e471[_0x42776c(0x1bd)])){if(_0x42776c(0x17d)!=='wnELR'){const _0x10e485=_0x4ce734(_0x290fb5['$1'])['split'](',')[_0x42776c(0x22a)](_0x5c67e7=>_0x3710ba(_0x5c67e7)||0x1);_0x19bd97[_0x42776c(0x238)]=_0x10e485;}else _0x22eb25[_0x42776c(0x166)]=Number(RegExp['$1'])||0x0;}else{if(_0x20f573[_0x42776c(0x1c3)](_0x36e471[_0x42776c(0x29d)])){const _0x1d2b92=String(RegExp['$1'])[_0x42776c(0x249)](',')[_0x42776c(0x22a)](_0x575f12=>Number(_0x575f12)||0x0);while(_0x1d2b92[_0x42776c(0x141)]<0x4)_0x1d2b92[_0x42776c(0x1f3)](0x0);_0x22eb25[_0x42776c(0x22c)]=_0x1d2b92;}else{if(_0x20f573['match'](_0x36e471['MaskRegions'])){if('JiVlw'!==_0x42776c(0x243)){const _0x16d6b7=String(RegExp['$1'])['split'](',')[_0x42776c(0x22a)](_0x13b57b=>Number(_0x13b57b)||0x1);_0x22eb25['maskRegions']=_0x16d6b7;}else{const _0x2fa18f=_0x286073[_0x42776c(0x170)][_0x42776c(0x256)],_0x38d55e=_0x109d5d[_0x42776c(0x24a)]||'';if(_0x38d55e[_0x42776c(0x1c3)](_0x2fa18f[_0x42776c(0x19f)]))return _0x11b80b(_0x140f10['$1'])[_0x42776c(0x249)](',')[_0x42776c(0x22a)](_0x22af01=>_0x167f86(_0x22af01)||0x1)[_0x42776c(0x27e)](0x0);return _0x16201a[_0x42776c(0x295)](_0x18f9cb['DEFAULT_WATER_REFLECTION_TERRAINTAGS'])[_0x42776c(0x27e)](0x0);}}else{if(_0x20f573['match'](_0x36e471['MaskTerrainTags'])){if(_0x42776c(0x169)===_0x42776c(0x169)){const _0x13b0bb=String(RegExp['$1'])[_0x42776c(0x249)](',')[_0x42776c(0x22a)](_0x60d1c=>Number(_0x60d1c)||0x1);_0x22eb25[_0x42776c(0x261)]=_0x13b0bb;}else(_0x16ca9a[_0x42776c(0x199)](_0x3338f4[_0x42776c(0x1aa)](_0x5898cd,_0x5deec9))||_0x14beca[_0x42776c(0x199)](_0x11a05e[_0x42776c(0x149)](_0x1bbb7c,_0x10d9dc)))&&this[_0x42776c(0x278)][_0x42776c(0x271)][_0x42776c(0x268)](_0x195c52*_0x37bc06,_0xed3e24*_0x564957,_0x41832e,_0x3cc382,_0x42776c(0x293));}}}}}}}}}}}}}return _0x5107a8;},Game_Map[_0xfb75ea(0x1ac)]['getVisualParallaxes']=function(){const _0x4bc9ef=_0xfb75ea;return this[_0x4bc9ef(0x246)][_0x4bc9ef(0x240)](_0xc7c528=>!!_0xc7c528);},Game_Map[_0xfb75ea(0x1ac)]['getVisualParallaxSettings']=function(_0x218b3b){const _0x448527=_0xfb75ea;return this[_0x448527(0x246)][_0x218b3b]||null;},Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x20c)]=function(_0x2139e6){const _0x15f83e=_0xfb75ea,_0x2d1ec1=this['getVisualParallaxSettings'](_0x2139e6);if(_0x2d1ec1[_0x15f83e(0x190)]){if(_0x15f83e(0x167)==='CeQTh')return _0x2d1ec1['_parallaxX']*this[_0x15f83e(0x1cd)]();else{const _0x98b607=this[_0x15f83e(0x29f)]()['note'];if(_0x98b607==='')return;this['checkVisualParallaxesStringTags'](_0x98b607);}}else{if(_0x2d1ec1['_parallaxLoopX']){if(_0x15f83e(0x192)!==_0x15f83e(0x187))return _0x2d1ec1[_0x15f83e(0x17c)]*this['tileWidth']()/0x2;else _0x5dfd60[_0x15f83e(0x1e0)]=!![],_0x2c3ba3[_0x15f83e(0x162)]=_0x4fd392(_0x23fc00['$1'])||0x0;}else return 0x0;}},Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x19d)]=function(_0x1be676){const _0x133309=_0xfb75ea,_0x1b0c16=this[_0x133309(0x25d)](_0x1be676);if(_0x1b0c16[_0x133309(0x190)])return _0x1b0c16[_0x133309(0x212)]*this[_0x133309(0x154)]();else return _0x1b0c16['_parallaxLoopY']?_0x133309(0x269)==='OMODm'?_0x30c314(_0x1b3d08['$1'])[_0x133309(0x249)](',')['map'](_0x347cec=>_0x50a1fc(_0x347cec)||0x1)[_0x133309(0x27e)](0x0):_0x1b0c16[_0x133309(0x212)]*this[_0x133309(0x154)]()/0x2:0x0;},Game_Map['prototype'][_0xfb75ea(0x233)]=function(_0x19d200){const _0xc3ca92=_0xfb75ea;this[_0xc3ca92(0x246)]=this['_visualParallaxSettings']||[];if(!this[_0xc3ca92(0x246)][_0x19d200])return;this[_0xc3ca92(0x246)][_0x19d200]=null;const _0x37aab6=SceneManager[_0xc3ca92(0x20d)]['_spriteset'];_0x37aab6&&(_0xc3ca92(0x1ae)===_0xc3ca92(0x18b)?this[_0xc3ca92(0x299)]=!![]:_0x37aab6['removeVisualParallaxLayer'](_0x19d200));},Game_Map['prototype'][_0xfb75ea(0x201)]=function(_0x3bda3b){const _0x58ad1b=_0xfb75ea,_0x53ef9b=_0x3bda3b['id'];let _0xcd4fbc=![];this[_0x58ad1b(0x246)]=this[_0x58ad1b(0x246)]||[];if(this[_0x58ad1b(0x246)][_0x53ef9b]){const _0xd86384=this[_0x58ad1b(0x246)][_0x53ef9b];if(!_0xd86384[_0x58ad1b(0x238)][_0x58ad1b(0x17b)](_0x3bda3b['maskRegions']))_0xcd4fbc=!![];else!_0xd86384[_0x58ad1b(0x261)][_0x58ad1b(0x17b)](_0x3bda3b[_0x58ad1b(0x261)])&&(_0xcd4fbc=!![]);}this[_0x58ad1b(0x246)][_0x53ef9b]=_0x3bda3b;if(!SceneManager[_0x58ad1b(0x1ce)]())return;const _0x5116c1=SceneManager[_0x58ad1b(0x20d)]['_spriteset'];_0x5116c1&&_0x5116c1[_0x58ad1b(0x241)](_0x53ef9b,_0xcd4fbc);},VisuMZ['VisualParallaxes']['Game_Map_setDisplayPos']=Game_Map['prototype'][_0xfb75ea(0x207)],Game_Map['prototype'][_0xfb75ea(0x207)]=function(_0x31fe0e,_0x16a429){const _0x2d90c3=_0xfb75ea;VisuMZ[_0x2d90c3(0x170)][_0x2d90c3(0x208)]['call'](this,_0x31fe0e,_0x16a429);for(const _0x316290 of this[_0x2d90c3(0x259)]()){if(_0x2d90c3(0x1d2)!==_0x2d90c3(0x26f)){if(!_0x316290)continue;this['isLoopHorizontal']()?'MgLPG'!==_0x2d90c3(0x1f0)?(_0x335c23['x']=_0x4f8dcd[_0x2d90c3(0x23e)](-_0xc53a6c[_0x2d90c3(0x1f2)]()*_0x518aa2[_0x2d90c3(0x1cd)]()),_0x569eb1['y']=_0x4c05a9[_0x2d90c3(0x23e)](-_0x347ffa[_0x2d90c3(0x1e8)]()*_0x56e963[_0x2d90c3(0x154)]())):_0x316290[_0x2d90c3(0x17c)]=_0x31fe0e:_0x316290[_0x2d90c3(0x17c)]=this[_0x2d90c3(0x205)],this['isLoopVertical']()?_0x316290[_0x2d90c3(0x212)]=_0x16a429:_0x2d90c3(0x1f9)!==_0x2d90c3(0x1c1)?_0x316290[_0x2d90c3(0x212)]=this[_0x2d90c3(0x224)]:this[_0x2d90c3(0x1ab)]=!![];}else this[_0x2d90c3(0x164)]['_blurFilter']=new _0x261d29[(_0x2d90c3(0x1c4))]['BlurFilter'](_0x78980c['getWaterReflectionBlur']()),this[_0x2d90c3(0x164)][_0x2d90c3(0x1c4)][_0x2d90c3(0x1f3)](this[_0x2d90c3(0x164)][_0x2d90c3(0x26b)]);}},VisuMZ['VisualParallaxes']['Game_Map_scrollLeft']=Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x18d)],Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x18d)]=function(_0x2e1911){const _0x54de4b=_0xfb75ea,_0x3ba185=this[_0x54de4b(0x205)];VisuMZ['VisualParallaxes'][_0x54de4b(0x16e)][_0x54de4b(0x1f8)](this,_0x2e1911);for(const _0xd3d00d of this['getVisualParallaxes']()){if(!_0xd3d00d)continue;if(this[_0x54de4b(0x216)]())_0x54de4b(0x19a)===_0x54de4b(0x19a)?_0xd3d00d['_parallaxLoopX']&&(_0xd3d00d[_0x54de4b(0x17c)]-=_0x2e1911):this[_0x54de4b(0x1dd)][_0x54de4b(0x159)](_0x1d88ab);else this['width']()>=this[_0x54de4b(0x225)]()&&(_0xd3d00d[_0x54de4b(0x17c)]+=this['_displayX']-_0x3ba185);}},VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x1b4)]=Game_Map['prototype']['scrollRight'],Game_Map['prototype'][_0xfb75ea(0x1e9)]=function(_0x23b9c0){const _0x1f2c04=_0xfb75ea,_0x164291=this[_0x1f2c04(0x205)];VisuMZ[_0x1f2c04(0x170)][_0x1f2c04(0x1b4)]['call'](this,_0x23b9c0);for(const _0x41b6be of this['getVisualParallaxes']()){if(!_0x41b6be)continue;if(this['isLoopHorizontal']())_0x41b6be[_0x1f2c04(0x1fe)]&&(_0x41b6be[_0x1f2c04(0x17c)]+=_0x23b9c0);else{if(this[_0x1f2c04(0x15e)]()>=this[_0x1f2c04(0x225)]()){if(_0x1f2c04(0x239)!==_0x1f2c04(0x22e))_0x41b6be[_0x1f2c04(0x17c)]+=this[_0x1f2c04(0x205)]-_0x164291;else{const _0x4e6496=_0x26785f[_0x1f2c04(0x170)]['RegExp'],_0x21d166=_0x57357c['note']||'';if(_0x21d166[_0x1f2c04(0x1c3)](_0x4e6496['SolidBlur']))return _0x322cb5[_0x1f2c04(0x1b3)](0x0,_0x4e1197(_0x451593['$1'])||0x0);return _0x5c8efa[_0x1f2c04(0x17a)];}}}}},VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x252)]=Game_Map['prototype'][_0xfb75ea(0x27c)],Game_Map[_0xfb75ea(0x1ac)]['scrollDown']=function(_0x242f69){const _0x358990=_0xfb75ea,_0x5e34b9=this[_0x358990(0x224)];VisuMZ[_0x358990(0x170)][_0x358990(0x252)][_0x358990(0x1f8)](this,_0x242f69);for(const _0x4a9e41 of this[_0x358990(0x259)]()){if(_0x358990(0x1e4)!==_0x358990(0x142)){if(!_0x4a9e41)continue;if(this[_0x358990(0x1a8)]())_0x4a9e41[_0x358990(0x1e0)]&&(_0x358990(0x182)==='VyGLe'?_0x426cdb[_0x358990(0x212)]-=_0x57d358:_0x4a9e41[_0x358990(0x212)]+=_0x242f69);else this['height']()>=this[_0x358990(0x1da)]()&&(_0x4a9e41[_0x358990(0x212)]+=this[_0x358990(0x224)]-_0x5e34b9);}else for(let _0x266b38=0x0;_0x266b38<_0x42d3d6;_0x266b38++){(_0x43e68f[_0x358990(0x199)](_0x29cab2[_0x358990(0x1aa)](_0x1326bb,_0x266b38))||_0xd3f646[_0x358990(0x199)](_0x1a67c9[_0x358990(0x149)](_0x2aa8db,_0x266b38)))&&this['_maskSprite']['bitmap'][_0x358990(0x268)](_0x3e9178*_0x28f053,_0x266b38*_0x47fb2f,_0x2fce12,_0x211844,_0x358990(0x293));}}},VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x1e5)]=Game_Map[_0xfb75ea(0x1ac)]['scrollUp'],Game_Map['prototype'][_0xfb75ea(0x143)]=function(_0x5caa6e){const _0x400fa3=_0xfb75ea,_0x5c4955=this[_0x400fa3(0x224)];VisuMZ['VisualParallaxes'][_0x400fa3(0x1e5)]['call'](this,_0x5caa6e);for(const _0x47813d of this['getVisualParallaxes']()){if('wIgNa'===_0x400fa3(0x175))_0x4dadd8[_0x400fa3(0x1e0)]&&(_0xdddb0b[_0x400fa3(0x212)]-=_0x46a0fb);else{if(!_0x47813d)continue;if(this[_0x400fa3(0x1a8)]()){if(_0x47813d['_parallaxLoopY']){if('chxRv'===_0x400fa3(0x283)){_0x534500[_0x400fa3(0x1ac)][_0x400fa3(0x146)][_0x400fa3(0x1f8)](this);if(!this[_0x400fa3(0x271)])return;this[_0x400fa3(0x24b)](),this[_0x400fa3(0x14a)](),this['updateBlendMode'](),this[_0x400fa3(0x274)](),this[_0x400fa3(0x156)](),this[_0x400fa3(0x1bb)]();}else _0x47813d[_0x400fa3(0x212)]-=_0x5caa6e;}}else this[_0x400fa3(0x1c6)]()>=this[_0x400fa3(0x1da)]()&&(_0x47813d[_0x400fa3(0x212)]+=this[_0x400fa3(0x224)]-_0x5c4955);}}},VisuMZ['VisualParallaxes'][_0xfb75ea(0x18f)]=Game_Map['prototype'][_0xfb75ea(0x163)],Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x163)]=function(){const _0x58e2fe=_0xfb75ea;VisuMZ['VisualParallaxes'][_0x58e2fe(0x18f)][_0x58e2fe(0x1f8)](this);for(const _0x3731aa of this[_0x58e2fe(0x259)]()){if(!_0x3731aa)continue;this[_0x58e2fe(0x221)](_0x3731aa);}},Game_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x221)]=function(_0x279e7e){const _0x231fad=_0xfb75ea;if(_0x279e7e[_0x231fad(0x1fe)]){if('sTVeu'===_0x231fad(0x157))for(let _0x12e55b=0x0;_0x12e55b<_0xe78985;_0x12e55b++){(_0x475275[_0x231fad(0x199)](_0x234c28[_0x231fad(0x1aa)](_0xdc8a81,_0x12e55b))||_0x4074d3[_0x231fad(0x199)](_0x20be41[_0x231fad(0x149)](_0x1c6cc0,_0x12e55b)))&&_0x43281b['bitmap'][_0x231fad(0x268)](_0x2e345c*_0xd47c64+_0x5a1995,_0x12e55b*_0x40b76a+_0x4488cb,_0x2b4369-_0x59d8d1,_0x51cfd0-_0x74cdb6,_0x231fad(0x293));}else _0x279e7e[_0x231fad(0x17c)]+=_0x279e7e[_0x231fad(0x1b9)]/this[_0x231fad(0x1cd)]()/0x2;}_0x279e7e['_parallaxLoopY']&&(_0x231fad(0x29b)==='Amdaq'?_0x3c2f41[_0x231fad(0x204)]=_0x145065(_0x5e5e41['$1'])[_0x231fad(0x28e)](0x0,0xff):_0x279e7e[_0x231fad(0x212)]+=_0x279e7e[_0x231fad(0x162)]/this['tileHeight']()/0x2);_0x279e7e['hue']+=_0x279e7e['hueShift'];if(_0x279e7e['opacityDuration']>0x0){const _0xbf235f=_0x279e7e[_0x231fad(0x1a5)];_0x279e7e[_0x231fad(0x204)]=(_0x279e7e[_0x231fad(0x204)]*(_0xbf235f-0x1)+_0x279e7e[_0x231fad(0x1a4)])/_0xbf235f,_0x279e7e[_0x231fad(0x1a5)]--;}},VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x1a0)]=Game_Event[_0xfb75ea(0x1ac)][_0xfb75ea(0x1f4)],Game_Event[_0xfb75ea(0x1ac)]['clearPageSettings']=function(){const _0x3e8070=_0xfb75ea;VisuMZ[_0x3e8070(0x170)][_0x3e8070(0x1a0)][_0x3e8070(0x1f8)](this),this[_0x3e8070(0x18c)]();},VisuMZ['VisualParallaxes']['Game_Event_setupPageSettings']=Game_Event[_0xfb75ea(0x1ac)]['setupPageSettings'],Game_Event[_0xfb75ea(0x1ac)][_0xfb75ea(0x1c7)]=function(){const _0x5e01d4=_0xfb75ea;VisuMZ[_0x5e01d4(0x170)][_0x5e01d4(0x1a2)][_0x5e01d4(0x1f8)](this),this[_0x5e01d4(0x1fc)]();},Game_Event[_0xfb75ea(0x1ac)][_0xfb75ea(0x1fc)]=function(){const _0x3ad6af=_0xfb75ea;if(!this[_0x3ad6af(0x29f)]())return;this[_0x3ad6af(0x18c)](),this[_0x3ad6af(0x1d5)](),this[_0x3ad6af(0x1a6)]();},Game_Event[_0xfb75ea(0x1ac)][_0xfb75ea(0x1d5)]=function(){const _0x322ba1=_0xfb75ea,_0x314322=this[_0x322ba1(0x29f)]()[_0x322ba1(0x24a)];if(_0x314322==='')return;this[_0x322ba1(0x1b8)](_0x314322);},Game_Event[_0xfb75ea(0x1ac)]['setupVisualParallaxesCommentTags']=function(){const _0x517354=_0xfb75ea;if(!this[_0x517354(0x1ed)]())return;const _0x490c01=this[_0x517354(0x1cb)]();let _0x430b28='';for(const _0x258916 of _0x490c01){if([0x6c,0x198][_0x517354(0x199)](_0x258916[_0x517354(0x1b1)])){if(_0x430b28!=='')_0x430b28+='\x0a';_0x430b28+=_0x258916['parameters'][0x0];}}this[_0x517354(0x1b8)](_0x430b28);},Game_Event[_0xfb75ea(0x1ac)][_0xfb75ea(0x18c)]=function(){this['_noReflection']=![];},Game_Event['prototype']['checkVisualParallaxesStringTags']=function(_0x355c90){const _0x36c8c3=_0xfb75ea,_0x34f043=VisuMZ[_0x36c8c3(0x170)][_0x36c8c3(0x256)];_0x355c90[_0x36c8c3(0x1c3)](_0x34f043[_0x36c8c3(0x13f)])&&(this['_noReflection']=!![]);};function _0x35d8(_0x47f718,_0xec69f1){const _0x27c448=_0x27c4();return _0x35d8=function(_0x35d8f3,_0x3702d5){_0x35d8f3=_0x35d8f3-0x13f;let _0x47a974=_0x27c448[_0x35d8f3];return _0x47a974;},_0x35d8(_0x47f718,_0xec69f1);}function Sprite_VisualParallax(){this['initialize'](...arguments);}Sprite_VisualParallax['prototype']=Object[_0xfb75ea(0x288)](TilingSprite[_0xfb75ea(0x1ac)]),Sprite_VisualParallax[_0xfb75ea(0x1ac)][_0xfb75ea(0x254)]=Sprite_VisualParallax,Sprite_VisualParallax['prototype'][_0xfb75ea(0x16f)]=function(_0x2ffd1f){const _0x4f6652=_0xfb75ea;this['_id']=_0x2ffd1f,TilingSprite[_0x4f6652(0x1ac)]['initialize'][_0x4f6652(0x1f8)](this),this[_0x4f6652(0x227)](),this[_0x4f6652(0x177)](),this[_0x4f6652(0x271)][_0x4f6652(0x200)](this['createMaskSprite'][_0x4f6652(0x19b)](this));},Sprite_VisualParallax[_0xfb75ea(0x1ac)][_0xfb75ea(0x237)]=function(){const _0x2c3c56=_0xfb75ea;return $gameMap[_0x2c3c56(0x25d)](this[_0x2c3c56(0x165)]);},Sprite_VisualParallax[_0xfb75ea(0x1ac)][_0xfb75ea(0x227)]=function(){const _0x3280c8=_0xfb75ea;this[_0x3280c8(0x194)]=0x0,this[_0x3280c8(0x291)]=[0x0,0x0,0x0,0x0],this[_0x3280c8(0x202)]=new ColorFilter(),!this[_0x3280c8(0x1c4)]&&(_0x3280c8(0x231)==='weMHp'?this['filters']=[]:(this[_0x3280c8(0x1fb)][_0x3280c8(0x279)](this['_solidReflectContainer']),this[_0x3280c8(0x22d)]=!![])),this['filters'][_0x3280c8(0x1f3)](this[_0x3280c8(0x202)]);},Sprite_VisualParallax[_0xfb75ea(0x1ac)][_0xfb75ea(0x158)]=function(){const _0x5c8ec2=_0xfb75ea;!this['_colorFilter']&&this[_0x5c8ec2(0x227)](),this['_colorFilter']['setHue'](this[_0x5c8ec2(0x194)]),this[_0x5c8ec2(0x202)][_0x5c8ec2(0x153)](this[_0x5c8ec2(0x291)]);},Sprite_VisualParallax['prototype'][_0xfb75ea(0x177)]=function(){const _0x414b3d=_0xfb75ea;this[_0x414b3d(0x14f)]=this['settings']()[_0x414b3d(0x23d)],this[_0x414b3d(0x271)]=ImageManager[_0x414b3d(0x292)](this[_0x414b3d(0x14f)]);},Sprite_VisualParallax[_0xfb75ea(0x1ac)]['createMaskSprite']=function(){const _0x90f943=_0xfb75ea;this['_maskSprite']=new Sprite(),this[_0x90f943(0x285)]();},Sprite_VisualParallax[_0xfb75ea(0x1ac)][_0xfb75ea(0x285)]=function(){const _0x57ca3f=_0xfb75ea;this[_0x57ca3f(0x278)][_0x57ca3f(0x271)]&&(this[_0x57ca3f(0x278)]['bitmap']['destroy'](),this[_0x57ca3f(0x159)](this[_0x57ca3f(0x278)]));const _0xc3001f=new Bitmap(Graphics[_0x57ca3f(0x15e)],Graphics[_0x57ca3f(0x1c6)]);_0xc3001f['fillRect'](0x0,0x0,_0xc3001f[_0x57ca3f(0x15e)],_0xc3001f[_0x57ca3f(0x1c6)],_0x57ca3f(0x293)),this[_0x57ca3f(0x278)]['bitmap']=_0xc3001f,this['addChild'](this['_maskSprite']),this[_0x57ca3f(0x14b)]=new PIXI[(_0x57ca3f(0x22b))](this[_0x57ca3f(0x278)]),this['filters'][_0x57ca3f(0x1f3)](this[_0x57ca3f(0x14b)]);const _0x4c919d=this[_0x57ca3f(0x237)]()['maskRegions'],_0x27d7e1=this[_0x57ca3f(0x237)]()[_0x57ca3f(0x261)];if(_0x4c919d[_0x57ca3f(0x141)]<=0x0&&_0x27d7e1[_0x57ca3f(0x141)]<=0x0)return;if($gameMap['isLoopHorizontal']()||$gameMap[_0x57ca3f(0x1a8)]())return;const _0x75f43d=$gameMap[_0x57ca3f(0x15e)](),_0x2e901f=$gameMap[_0x57ca3f(0x1c6)](),_0x41061f=$gameMap[_0x57ca3f(0x1cd)](),_0x33c3d5=$gameMap[_0x57ca3f(0x154)]();this['_maskSprite'][_0x57ca3f(0x271)]=new Bitmap(_0x75f43d*_0x41061f,_0x2e901f*_0x33c3d5);for(let _0x264296=0x0;_0x264296<_0x75f43d;_0x264296++){if('duEzy'!==_0x57ca3f(0x1df))for(let _0x390bf6=0x0;_0x390bf6<_0x2e901f;_0x390bf6++){(_0x4c919d[_0x57ca3f(0x199)]($gameMap[_0x57ca3f(0x1aa)](_0x264296,_0x390bf6))||_0x27d7e1[_0x57ca3f(0x199)]($gameMap[_0x57ca3f(0x149)](_0x264296,_0x390bf6)))&&this[_0x57ca3f(0x278)][_0x57ca3f(0x271)]['fillRect'](_0x264296*_0x41061f,_0x390bf6*_0x33c3d5,_0x41061f,_0x33c3d5,_0x57ca3f(0x293));}else{if(_0x128897[_0x57ca3f(0x141)]<=0x0&&_0x349eea[_0x57ca3f(0x141)]<=0x0)return null;const _0x312e4b=_0x2284b7[_0x57ca3f(0x15e)](),_0x4a5b3a=_0x145962[_0x57ca3f(0x1c6)](),_0x56a9ab=_0x5b062c['tileWidth'](),_0x4c35c2=_0x1a5164[_0x57ca3f(0x154)](),_0x3cb157=0x0,_0x3def87=_0x3cb157*0x2,_0x5c67a6=new _0x28a4f0();_0x5c67a6[_0x57ca3f(0x271)]=new _0x178a79(_0x312e4b*_0x56a9ab,_0x4a5b3a*_0x4c35c2);for(let _0x27136e=0x0;_0x27136e<_0x312e4b;_0x27136e++){for(let _0x16dad1=0x0;_0x16dad1<_0x4a5b3a;_0x16dad1++){(_0x500732['includes'](_0x2ae34d[_0x57ca3f(0x1aa)](_0x27136e,_0x16dad1))||_0x51f005[_0x57ca3f(0x199)](_0x6e748d[_0x57ca3f(0x149)](_0x27136e,_0x16dad1)))&&_0x5c67a6[_0x57ca3f(0x271)][_0x57ca3f(0x268)](_0x27136e*_0x56a9ab+_0x3cb157,_0x16dad1*_0x4c35c2+_0x3cb157,_0x56a9ab-_0x3def87,_0x4c35c2-_0x3def87,_0x57ca3f(0x293));}}return _0x5c67a6;}}},Sprite_VisualParallax[_0xfb75ea(0x1ac)][_0xfb75ea(0x146)]=function(){const _0x2c59fb=_0xfb75ea;TilingSprite['prototype'][_0x2c59fb(0x146)][_0x2c59fb(0x1f8)](this);if(!this['bitmap'])return;this['updateOpacity'](),this[_0x2c59fb(0x14a)](),this[_0x2c59fb(0x151)](),this['updateHue'](),this['updateTone'](),this[_0x2c59fb(0x1bb)]();},Sprite_VisualParallax[_0xfb75ea(0x1ac)][_0xfb75ea(0x24b)]=function(){const _0x2e5de0=_0xfb75ea;this[_0x2e5de0(0x204)]=this[_0x2e5de0(0x237)]()[_0x2e5de0(0x204)];},Sprite_VisualParallax[_0xfb75ea(0x1ac)]['updateOrigin']=function(){const _0x100475=_0xfb75ea;this[_0x100475(0x1fd)]['x']=$gameMap[_0x100475(0x20c)](this[_0x100475(0x165)]),this[_0x100475(0x1fd)]['y']=$gameMap['getVisualParallaxOy'](this['_id']);},Sprite_VisualParallax['prototype'][_0xfb75ea(0x151)]=function(){const _0x5d3ba4=_0xfb75ea;this[_0x5d3ba4(0x14b)]&&(_0x5d3ba4(0x193)!=='tXvzb'?this[_0x5d3ba4(0x14b)][_0x5d3ba4(0x1ad)]=this[_0x5d3ba4(0x237)]()['blendMode']:_0x3c9a89['updateVisualParallaxLayer'](_0x4acc71,_0x41ab7a));},Sprite_VisualParallax['prototype'][_0xfb75ea(0x274)]=function(){const _0x46ad35=_0xfb75ea;this['setHue'](this[_0x46ad35(0x237)]()[_0x46ad35(0x1d6)]);},Sprite_VisualParallax[_0xfb75ea(0x1ac)][_0xfb75ea(0x23f)]=function(_0x2e9f6b){const _0x53d8bc=_0xfb75ea;this[_0x53d8bc(0x194)]!==Number(_0x2e9f6b)&&(this[_0x53d8bc(0x194)]=Number(_0x2e9f6b),this['_updateColorFilter']());},Sprite_VisualParallax['prototype'][_0xfb75ea(0x156)]=function(){const _0x2101f4=_0xfb75ea;this['setColorTone'](this[_0x2101f4(0x237)]()['colorTone']);},Sprite_VisualParallax['prototype']['setColorTone']=function(_0x335b40){const _0x246715=_0xfb75ea;if(!(_0x335b40 instanceof Array))throw new Error(_0x246715(0x191));!this[_0x246715(0x291)][_0x246715(0x17b)](_0x335b40)&&(this[_0x246715(0x291)]=_0x335b40[_0x246715(0x21c)](),this[_0x246715(0x158)]());},Sprite_VisualParallax[_0xfb75ea(0x1ac)]['updateMask']=function(){const _0x3b8559=_0xfb75ea;if(!this[_0x3b8559(0x278)])return;const _0x557ef6=this['settings']()[_0x3b8559(0x238)],_0x24df1d=this[_0x3b8559(0x237)]()[_0x3b8559(0x261)];if(_0x557ef6[_0x3b8559(0x141)]<=0x0&&_0x24df1d[_0x3b8559(0x141)]<=0x0)return;if($gameMap[_0x3b8559(0x216)]()||$gameMap['isLoopVertical']())return;this[_0x3b8559(0x278)]['x']=Math[_0x3b8559(0x23e)](-$gameMap[_0x3b8559(0x1f2)]()*$gameMap[_0x3b8559(0x1cd)]()),this[_0x3b8559(0x278)]['y']=Math[_0x3b8559(0x23e)](-$gameMap['displayY']()*$gameMap[_0x3b8559(0x154)]());};function Sprite_ReflectionCharacter(){const _0x19d71b=_0xfb75ea;this[_0x19d71b(0x16f)](...arguments);}Sprite_ReflectionCharacter[_0xfb75ea(0x1ac)]=Object[_0xfb75ea(0x288)](Sprite_Character['prototype']),Sprite_ReflectionCharacter[_0xfb75ea(0x1ac)][_0xfb75ea(0x254)]=Sprite_ReflectionCharacter,Sprite_ReflectionCharacter[_0xfb75ea(0x1ac)][_0xfb75ea(0x23b)]=function(_0x3f9598){},Sprite_ReflectionCharacter['prototype']['update']=function(){const _0x1d13b1=_0xfb75ea;Sprite_Character[_0x1d13b1(0x1ac)][_0x1d13b1(0x146)][_0x1d13b1(0x1f8)](this);},VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x272)]=Spriteset_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x264)],Spriteset_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x264)]=function(){const _0x14b75d=_0xfb75ea;VisuMZ['VisualParallaxes']['Spriteset_Map_createParallax'][_0x14b75d(0x1f8)](this);if(!$gameMap[_0x14b75d(0x15a)]())this[_0x14b75d(0x28d)]();if(!$gameMap[_0x14b75d(0x21e)]())this[_0x14b75d(0x178)]();this[_0x14b75d(0x168)](),this[_0x14b75d(0x289)](),this['sortVisualParallaxes']();if($gameMap[_0x14b75d(0x15a)]())this['createWaterReflectionLayer']();if($gameMap[_0x14b75d(0x21e)]())this[_0x14b75d(0x178)]();},Spriteset_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x28d)]=function(){const _0x1d6a1b=_0xfb75ea;if(!PIXI[_0x1d6a1b(0x1c4)])return;if($gameMap['isLoopHorizontal']()||$gameMap[_0x1d6a1b(0x1a8)]())return;if($gameMap[_0x1d6a1b(0x24f)]())return;this['_waterReflectLayer']=new Sprite(),this[_0x1d6a1b(0x195)]=new Sprite(),this[_0x1d6a1b(0x273)]=![],this[_0x1d6a1b(0x286)][_0x1d6a1b(0x279)](this[_0x1d6a1b(0x164)]),this[_0x1d6a1b(0x164)][_0x1d6a1b(0x1c4)]=[],this[_0x1d6a1b(0x164)][_0x1d6a1b(0x204)]=$gameMap['getWaterReflectionOpacity']();!!PIXI[_0x1d6a1b(0x1c4)][_0x1d6a1b(0x1be)]&&(this[_0x1d6a1b(0x164)][_0x1d6a1b(0x235)]=new PIXI['filters'][(_0x1d6a1b(0x1be))]({'boundary':$gameMap[_0x1d6a1b(0x203)](),'amplitude':$gameMap[_0x1d6a1b(0x217)](),'waveLength':$gameMap[_0x1d6a1b(0x1ef)](),'mirror':![]}));if(!!PIXI['filters']['BlurFilter']){if('MFNYG'!==_0x1d6a1b(0x23a))this[_0x1d6a1b(0x164)][_0x1d6a1b(0x26b)]=new PIXI['filters'][(_0x1d6a1b(0x24c))]($gameMap[_0x1d6a1b(0x297)]()),this['_waterReflectLayer'][_0x1d6a1b(0x1c4)]['push'](this[_0x1d6a1b(0x164)]['_blurFilter']);else{const _0x5104c0=_0x20c86a['VisualParallaxes'][_0x1d6a1b(0x256)],_0x58fdcb=_0x4ff007[_0x1d6a1b(0x24a)]||'';if(_0x58fdcb[_0x1d6a1b(0x1c3)](_0x5104c0[_0x1d6a1b(0x21f)]))return _0x20eaf0[_0x1d6a1b(0x1a9)]((_0x2753fe(_0x3aa6ec['$1'])||0x0)*0.01*0xff)['clamp'](0x0,0xff);else{if(_0x58fdcb[_0x1d6a1b(0x1c3)](_0x5104c0[_0x1d6a1b(0x17f)]))return(_0x56b374(_0x556165['$1'])||0x0)[_0x1d6a1b(0x28e)](0x0,0xff);}return _0x6b836c[_0x1d6a1b(0x263)];}}this[_0x1d6a1b(0x15f)]();},Spriteset_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x15f)]=function(){const _0x3bcf9e=_0xfb75ea,_0x7e8cdb=$gameMap['getWaterReflectionRegions'](),_0xebb992=$gameMap[_0x3bcf9e(0x26c)](),_0x429736=this[_0x3bcf9e(0x16c)](_0x7e8cdb,_0xebb992);_0x429736&&(this[_0x3bcf9e(0x279)](_0x429736),this['_waterReflectLayer'][_0x3bcf9e(0x18a)]=_0x429736);},Spriteset_Map['prototype'][_0xfb75ea(0x178)]=function(){const _0xbb9271=_0xfb75ea;if(!PIXI[_0xbb9271(0x1c4)])return;if($gameMap[_0xbb9271(0x216)]()||$gameMap['isLoopVertical']())return;if($gameMap[_0xbb9271(0x24f)]())return;this['_solidReflectLayer']=new Sprite(),this['_solidReflectContainer']=new Sprite(),this[_0xbb9271(0x22d)]=![],this[_0xbb9271(0x286)]['addChild'](this['_solidReflectLayer']),this[_0xbb9271(0x1fb)][_0xbb9271(0x1c4)]=[],this[_0xbb9271(0x1fb)][_0xbb9271(0x204)]=$gameMap['getSolidReflectionOpacity'](),!!PIXI['filters'][_0xbb9271(0x24c)]&&(this[_0xbb9271(0x1fb)]['_blurFilter']=new PIXI[(_0xbb9271(0x1c4))][(_0xbb9271(0x24c))]($gameMap[_0xbb9271(0x1dc)]()),this[_0xbb9271(0x1fb)]['filters'][_0xbb9271(0x1f3)](this[_0xbb9271(0x1fb)][_0xbb9271(0x26b)])),this['createSolidReflectionMask']();},Spriteset_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x1e1)]=function(){const _0x47715b=_0xfb75ea,_0x229a14=$gameMap[_0x47715b(0x21e)](),_0x39fcdf=$gameMap[_0x47715b(0x20a)](),_0x5ba34d=this[_0x47715b(0x16c)](_0x229a14,_0x39fcdf);if(_0x5ba34d){if(_0x47715b(0x179)!=='WvMtS')return _0x499cc6['status']&&_0x18f177[_0x47715b(0x206)]['includes']('['+_0x54f4e0+']');else this[_0x47715b(0x279)](_0x5ba34d),this[_0x47715b(0x1fb)]['mask']=_0x5ba34d;}},Spriteset_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x16c)]=function(_0xec4c90,_0x46f1b4){const _0x3ee44e=_0xfb75ea;if(_0xec4c90['length']<=0x0&&_0x46f1b4[_0x3ee44e(0x141)]<=0x0)return null;const _0x533623=$gameMap[_0x3ee44e(0x15e)](),_0x2e54d4=$gameMap[_0x3ee44e(0x1c6)](),_0x5f38dc=$gameMap[_0x3ee44e(0x1cd)](),_0x1ff840=$gameMap[_0x3ee44e(0x154)](),_0x276789=0x0,_0x24fea5=_0x276789*0x2,_0x28a656=new Sprite();_0x28a656[_0x3ee44e(0x271)]=new Bitmap(_0x533623*_0x5f38dc,_0x2e54d4*_0x1ff840);for(let _0x2c5e3f=0x0;_0x2c5e3f<_0x533623;_0x2c5e3f++){if('NPMxP'!==_0x3ee44e(0x16b))_0x285495('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3ee44e(0x172)](_0x1a96a2,_0x52c358)),_0xf53626[_0x3ee44e(0x234)]();else for(let _0x20b854=0x0;_0x20b854<_0x2e54d4;_0x20b854++){(_0xec4c90[_0x3ee44e(0x199)]($gameMap[_0x3ee44e(0x1aa)](_0x2c5e3f,_0x20b854))||_0x46f1b4[_0x3ee44e(0x199)]($gameMap[_0x3ee44e(0x149)](_0x2c5e3f,_0x20b854)))&&_0x28a656[_0x3ee44e(0x271)][_0x3ee44e(0x268)](_0x2c5e3f*_0x5f38dc+_0x276789,_0x20b854*_0x1ff840+_0x276789,_0x5f38dc-_0x24fea5,_0x1ff840-_0x24fea5,_0x3ee44e(0x293));}}return _0x28a656;},VisuMZ['VisualParallaxes'][_0xfb75ea(0x1b7)]=Spriteset_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x220)],Spriteset_Map['prototype'][_0xfb75ea(0x220)]=function(){const _0x28988c=_0xfb75ea;VisuMZ[_0x28988c(0x170)][_0x28988c(0x1b7)]['call'](this),this[_0x28988c(0x1d4)]();},Spriteset_Map[_0xfb75ea(0x1ac)]['createCharacterReflections']=function(){const _0x2a425f=_0xfb75ea;if($gameMap['noReflections']())return;const _0x3521c7=[],_0x20f44e=[];for(const _0x69a8c of $gameMap[_0x2a425f(0x262)]()){if(_0x69a8c['_noReflection'])continue;_0x3521c7[_0x2a425f(0x1f3)](new Sprite_ReflectionCharacter(_0x69a8c)),_0x20f44e[_0x2a425f(0x1f3)](new Sprite_ReflectionCharacter(_0x69a8c));}for(const _0x4e5ba9 of $gameMap[_0x2a425f(0x255)]()){_0x2a425f(0x1f6)!==_0x2a425f(0x24e)?(_0x3521c7[_0x2a425f(0x1f3)](new Sprite_ReflectionCharacter(_0x4e5ba9)),_0x20f44e[_0x2a425f(0x1f3)](new Sprite_ReflectionCharacter(_0x4e5ba9))):(_0x2e497e[_0x2a425f(0x170)][_0x2a425f(0x1b7)][_0x2a425f(0x1f8)](this),this[_0x2a425f(0x1d4)]());}for(const _0x3a15cb of $gamePlayer[_0x2a425f(0x185)]()[_0x2a425f(0x148)]()){_0x3521c7['push'](new Sprite_ReflectionCharacter(_0x3a15cb)),_0x20f44e[_0x2a425f(0x1f3)](new Sprite_ReflectionCharacter(_0x3a15cb));}_0x3521c7['push'](new Sprite_ReflectionCharacter($gamePlayer)),_0x20f44e[_0x2a425f(0x1f3)](new Sprite_ReflectionCharacter($gamePlayer));if(this[_0x2a425f(0x164)]){if('bHbop'==='bHbop')for(const _0x7b1d61 of _0x3521c7){_0x2a425f(0x181)===_0x2a425f(0x277)?(this[_0x2a425f(0x279)](_0x3d2afa),this['_solidReflectLayer']['mask']=_0x353586):(_0x7b1d61[_0x2a425f(0x21a)]=!![],this[_0x2a425f(0x195)][_0x2a425f(0x279)](_0x7b1d61),_0x7b1d61['scale']['y']=-0.85,_0x7b1d61[_0x2a425f(0x1c4)]=_0x7b1d61[_0x2a425f(0x1c4)]||[],this[_0x2a425f(0x164)][_0x2a425f(0x235)]&&_0x7b1d61[_0x2a425f(0x1c4)][_0x2a425f(0x1f3)](this[_0x2a425f(0x164)][_0x2a425f(0x235)]));}else{if(!(_0x70a506 instanceof _0x1ca734))throw new _0x5bff2b(_0x2a425f(0x191));!this[_0x2a425f(0x291)]['equals'](_0x587275)&&(this['_colorTone']=_0x551f57[_0x2a425f(0x21c)](),this[_0x2a425f(0x158)]());}}if(this['_solidReflectLayer'])for(const _0x4c92cb of _0x20f44e){if(_0x2a425f(0x27d)!=='FPJKF')_0x4c92cb[_0x2a425f(0x21a)]=!![],this[_0x2a425f(0x26d)]['addChild'](_0x4c92cb),_0x4c92cb[_0x2a425f(0x1de)]['y']=-0.85;else{const _0x1529b8=_0x1d9c75[_0x2a425f(0x170)][_0x2a425f(0x256)],_0x4b7b98=_0x1c64f2[_0x2a425f(0x24a)]||'';if(_0x4b7b98[_0x2a425f(0x1c3)](_0x1529b8['SolidTop']))return!![];else{if(_0x4b7b98[_0x2a425f(0x1c3)](_0x1529b8[_0x2a425f(0x1c9)]))return![];}return _0x3ef06a['DEFAULT_SOLID_REFLECTION_FILTER_TOP'];}}},VisuMZ[_0xfb75ea(0x170)][_0xfb75ea(0x222)]=Spriteset_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x146)],Spriteset_Map['prototype'][_0xfb75ea(0x146)]=function(){const _0x508c78=_0xfb75ea;VisuMZ[_0x508c78(0x170)]['Spriteset_Map_update']['call'](this),this['updateWaterReflections'](),this[_0x508c78(0x219)]();},Spriteset_Map['prototype'][_0xfb75ea(0x14d)]=function(){const _0x50595b=_0xfb75ea;if(!this[_0x50595b(0x164)])return;if($gameMap){if(_0x50595b(0x270)!=='pdPEI')_0x51a395['_parallaxLoopX']&&(_0x48ebe2['_parallaxX']+=_0x341f0b);else{if(!this[_0x50595b(0x273)]&&$gameMap[_0x50595b(0x25c)]())this[_0x50595b(0x164)][_0x50595b(0x279)](this['_waterReflectContainer']),this['_waterReflectAdded']=!![];else this[_0x50595b(0x273)]&&!$gameMap['hasWaterReflections']()&&(this[_0x50595b(0x164)][_0x50595b(0x159)](this[_0x50595b(0x195)]),this[_0x50595b(0x273)]=![]);}}this['_waterReflectLayer'][_0x50595b(0x235)]&&(this[_0x50595b(0x164)][_0x50595b(0x235)][_0x50595b(0x284)]+=0.05);const _0x478753=this['_waterReflectLayer'][_0x50595b(0x188)];if(_0x478753){if('BXrxC'===_0x50595b(0x1a1))return _0x7edb17[_0x50595b(0x17c)]*this[_0x50595b(0x1cd)]();else _0x478753['x']=Math[_0x50595b(0x23e)](-$gameMap['displayX']()*$gameMap[_0x50595b(0x1cd)]()),_0x478753['y']=Math[_0x50595b(0x23e)](-$gameMap['displayY']()*$gameMap[_0x50595b(0x154)]());}},Spriteset_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x219)]=function(){const _0x17a757=_0xfb75ea;if(!this[_0x17a757(0x1fb)])return;if($gameMap){if(_0x17a757(0x250)===_0x17a757(0x1cc)){_0x4d95eb['_parallaxLoopX']&&(_0x14377c[_0x17a757(0x17c)]+=_0x2ca806[_0x17a757(0x1b9)]/this[_0x17a757(0x1cd)]()/0x2);_0x529406[_0x17a757(0x1e0)]&&(_0x51ae00[_0x17a757(0x212)]+=_0xec9231[_0x17a757(0x162)]/this[_0x17a757(0x154)]()/0x2);_0x7eec6c['hue']+=_0x4a62e7['hueShift'];if(_0x4ba730[_0x17a757(0x1a5)]>0x0){const _0xc4e2df=_0x5574fc[_0x17a757(0x1a5)];_0x562f0d[_0x17a757(0x204)]=(_0x2bfc7c[_0x17a757(0x204)]*(_0xc4e2df-0x1)+_0x1e661a[_0x17a757(0x1a4)])/_0xc4e2df,_0x2b42dc[_0x17a757(0x1a5)]--;}}else{if(!this[_0x17a757(0x22d)]&&$gameMap[_0x17a757(0x1bf)]())this[_0x17a757(0x1fb)][_0x17a757(0x279)](this[_0x17a757(0x26d)]),this[_0x17a757(0x22d)]=!![];else this[_0x17a757(0x22d)]&&!$gameMap[_0x17a757(0x1bf)]()&&('CpCvs'!==_0x17a757(0x287)?(_0x4471e9[_0x17a757(0x1fe)]=!![],_0x162e3a[_0x17a757(0x1b9)]=_0x1ff4d5(_0x5224ee['$1'])||0x0):(this[_0x17a757(0x1fb)][_0x17a757(0x159)](this['_solidReflectContainer']),this[_0x17a757(0x22d)]=![]));}}const _0x58cdce=this[_0x17a757(0x1fb)][_0x17a757(0x188)];_0x58cdce&&(_0x58cdce['x']=Math[_0x17a757(0x23e)](-$gameMap[_0x17a757(0x1f2)]()*$gameMap[_0x17a757(0x1cd)]()),_0x58cdce['y']=Math['floor'](-$gameMap[_0x17a757(0x1e8)]()*$gameMap['tileHeight']()));},Spriteset_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x168)]=function(){const _0x779d6=_0xfb75ea;this[_0x779d6(0x1dd)]=new Sprite(),this['_baseSprite'][_0x779d6(0x279)](this[_0x779d6(0x1dd)]),this[_0x779d6(0x189)]=[null];},Spriteset_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x289)]=function(){const _0x101ea7=_0xfb75ea,_0x220a9b=$gameMap[_0x101ea7(0x259)]();for(const _0x185c6c of _0x220a9b){if(_0x101ea7(0x20b)===_0x101ea7(0x20b)){if(!_0x185c6c)continue;this['createNewParallaxLayer'](_0x185c6c);}else this[_0x101ea7(0x194)]!==_0x260b86(_0x1fb411)&&(this[_0x101ea7(0x194)]=_0x455d81(_0xe1f3c0),this['_updateColorFilter']());}},Spriteset_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x275)]=function(_0x52a2db){const _0x5b6d01=_0xfb75ea;if(!_0x52a2db)return;const _0x3de159=new Sprite_VisualParallax(_0x52a2db['id']);_0x3de159[_0x5b6d01(0x1d1)](0x0,0x0,Graphics[_0x5b6d01(0x15e)],Graphics[_0x5b6d01(0x1c6)]),this[_0x5b6d01(0x1dd)]['addChild'](_0x3de159);},Spriteset_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x21b)]=function(){const _0x269041=_0xfb75ea;this['_parallaxContainer']['children'][_0x269041(0x14c)]((_0x9a8e5a,_0x2ef41f)=>_0x9a8e5a[_0x269041(0x165)]-_0x2ef41f[_0x269041(0x165)]);},Spriteset_Map[_0xfb75ea(0x1ac)][_0xfb75ea(0x266)]=function(_0x1dbe16){const _0x3360c2=_0xfb75ea;return this[_0x3360c2(0x1dd)]['children'][_0x3360c2(0x257)](_0x1f6de7=>_0x1f6de7[_0x3360c2(0x165)]===_0x1dbe16);},Spriteset_Map[_0xfb75ea(0x1ac)]['removeVisualParallaxLayer']=function(_0x44affe){const _0x4fb676=_0xfb75ea,_0x3bc2de=this[_0x4fb676(0x266)](_0x44affe);_0x3bc2de&&this[_0x4fb676(0x1dd)]['removeChild'](_0x3bc2de);},Spriteset_Map['prototype']['updateVisualParallaxLayer']=function(_0x50c6ee,_0x5cfd5e){const _0x4767b1=_0xfb75ea,_0x1f8310=this[_0x4767b1(0x266)](_0x50c6ee);!_0x1f8310?(this[_0x4767b1(0x275)]($gameMap[_0x4767b1(0x25d)](_0x50c6ee)),this[_0x4767b1(0x21b)]()):_0x4767b1(0x218)!=='SVbfh'?(_0x1f8310[_0x4767b1(0x177)](),_0x5cfd5e&&_0x1f8310[_0x4767b1(0x271)][_0x4767b1(0x200)](_0x1f8310[_0x4767b1(0x285)][_0x4767b1(0x19b)](_0x1f8310))):(_0x39a655[_0x4767b1(0x238)]=_0x237073[_0x4767b1(0x295)](_0x526244[_0x4767b1(0x21e)]()),_0x5958cc[_0x4767b1(0x261)]=_0x437fbd['makeDeepCopy'](_0x1d6e57[_0x4767b1(0x20a)]()));};function _0x27c4(){const _0x1355ab=['_solidReflectLayer','setupVisualParallaxesEffects','origin','_parallaxLoopX','status','addLoadListener','addChangeVisualParallax','_colorFilter','getWaterReflectionBoundary','opacity','_displayX','description','setDisplayPos','Game_Map_setDisplayPos','registerReflectionSettings','getSolidReflectionTerrainTags','iHvAX','getVisualParallaxOx','_scene','WaterBoundary','CYUOU','DEFAULT_SOLID_REFLECTION_TERRAINTAGS','HDNpW','_parallaxY','NORMAL','AmpStart','water','isLoopHorizontal','getWaterReflectionAmplitude','FhnPh','updateSolidReflections','_reflection','sortVisualParallaxes','clone','WaterBottom','getSolidReflectionRegions','SolidOpacityRate','createCharacters','updateVisualParallaxSettings','Spriteset_Map_update','getSolidReflectionOpacity','_displayY','screenTileX','WaterAmplitude','_createColorFilter','Top','ARRAYSTR','map','SpriteMaskFilter','colorTone','_solidReflectAdded','fCiNH','gAbyf','DEFAULT_WATER_REFLECTION_FILTER_WAVELENGTH','weMHp','indexOf','removeVisualParallax','exit','_reflectFilter','getWaterReflectionRegions','settings','maskRegions','MJBay','EeXQF','setupRadialLight','Zdnot','filename','floor','setHue','filter','updateVisualParallaxLayer','getWaterReflectionOpacity','OzVcY','version','STR','_visualParallaxSettings','8NzEglQ','DEFAULT_SOLID_REFLECTION_FILTER_TOP','split','note','updateOpacity','BlurFilter','OpacityRate','pHmQQ','noReflections','KBDNu','wasolidter','Game_Map_scrollDown','registerCommand','constructor','vehicles','RegExp','find','Regions','getVisualParallaxes','SolidTerrainTags','Settings','hasWaterReflections','getVisualParallaxSettings','WaveEnd','AtorF','TerrainTags','maskTerrainTags','events','DEFAULT_SOLID_REFLECTION_FILTER_OPACITY','createParallax','WaterOpacityFlat','findTargetVisualParallax','ARRAYNUM','fillRect','PcoSn','setup','_blurFilter','getWaterReflectionTerrainTags','_solidReflectContainer','173103gVdnZQ','oeCNj','pdPEI','bitmap','Spriteset_Map_createParallax','_waterReflectAdded','updateHue','createNewParallaxLayer','ParallaxAddChangeSettings','RzmdW','_maskSprite','addChild','13122ymPrYP','End','scrollDown','tuDAr','remove','PfucB','765606cBHPzM','DEFAULT_WATER_REFLECTION_FILTER_BLUR','Opacity','ICsAa','time','createMaskBitmap','_baseSprite','CpCvs','create','createParallaxLayers','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ARRAYFUNC','82530bSyIxm','createWaterReflectionLayer','clamp','3894632FBSchc','DEFAULT_SOLID_REFLECTION_REGIONS','_colorTone','loadParallax','#ffffff','isEventTest','makeDeepCopy','WaterRegions','getWaterReflectionBlur','_hasSolidReflections','_hasWaterReflections','CreateLayerData','JSyYx','549nBFptt','Tone','OpacityFlat','event','NoReflection','fiaAj','length','BzEXL','scrollUp','Blur','name','update','>>>ATTENTION<<<','reverseData','terrainTag','updateOrigin','_maskFilter','sort','updateWaterReflections','DEFAULT_WATER_REFLECTION_REGIONS','_parallaxName','AmpEnd','updateBlendMode','WaterTop','setColorTone','tileHeight','TemplateSettings','updateTone','LUnDU','_updateColorFilter','removeChild','getWaterReflectionTop','ADDITIVE','ARRAYEVAL','trim','width','createWaterReflectionMask','VcyxS','YeMzv','_parallaxSy','updateParallax','_waterReflectLayer','_id','hueShift','CeQTh','createParallaxContainer','ghUzx','DEFAULT_WATER_REFLECTION_FILTER_AMPLITUDE','NPMxP','createReflectionMask','2155vzgLhH','Game_Map_scrollLeft','initialize','VisualParallaxes','pUpWg','format','toUpperCase','12133IujsLt','sbauJ','SolidTop','loadBitmap','createSolidReflectionLayer','WvMtS','DEFAULT_SOLID_REFLECTION_FILTER_BLUR','equals','_parallaxX','wnELR','keFgc','SolidOpacityFlat','charAt','pppoq','TrCal','ParallaxFadeOpacity','WaveStart','followers','SolidRegions','UukwN','_mask','_parallaxDataRef','mask','QCgvA','initVisualParallaxesEffects','scrollLeft','SolidReflect','Game_Map_updateParallax','_parallaxZero','Argument\x20must\x20be\x20an\x20array','kJtMJ','nTNfZ','_hue','_waterReflectContainer','DEFAULT_WATER_REFLECTION_FILTER_TOP','VertLoop','DEFAULT_WATER_REFLECTION_TERRAINTAGS','includes','GzFTI','bind','18864BtpvKP','getVisualParallaxOy','AnAbk','WaterTerrainTags','Game_Event_clearPageSettings','vpUmd','Game_Event_setupPageSettings','getSolidReflectionTop','targetOpacity','opacityDuration','setupVisualParallaxesCommentTags','ARRAYSTRUCT','isLoopVertical','round','regionId','_noReflection','prototype','blendMode','MiuAw','Game_Map_setup','ConvertParams','code','XzkEy','max','Game_Map_scrollRight','STRUCT','setupVisualParallaxes','Spriteset_Map_createCharacters','checkVisualParallaxesStringTags','_parallaxSx','return\x200','updateMask','Boundary','HueShift','ReflectionFilter','hasSolidReflections','DEFAULT_WATER_REFLECTION_FILTER_BOUNDARY','cOaVa','SolidBlur','match','filters','2BEnDir','height','setupPageSettings','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','SolidBottom','isInstanceOfSceneMap','list','MaMVK','tileWidth','isSceneMap','parse','FUNC','move','JLjrP','1175346jtjmUv','createCharacterReflections','setupVisualParallaxesNotetags','hue','type','DhlLY','ParallaxRemove','screenTileY','BnMlr','getSolidReflectionBlur','_parallaxContainer','scale','JTcTz','_parallaxLoopY','createSolidReflectionMask','iRJzT','OMzNb','IJomH','Game_Map_scrollUp','Filename','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','displayY','scrollRight','VaRja','SCREEN','IOmXd','page','WaterOpacityRate','getWaterReflectionWavelength','MgLPG','WaterReflect','displayX','push','clearPageSettings','cWaAH','PbMus','MULTIPLY','call','GFpWH','DEFAULT_WATER_REFLECTION_FILTER_OPACITY'];_0x27c4=function(){return _0x1355ab;};return _0x27c4();}