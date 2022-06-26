//=============================================================================
// VisuStella MZ - Visual Parallaxes
// VisuMZ_4_VisualParallaxes.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualParallaxes = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualParallaxes = VisuMZ.VisualParallaxes || {};
VisuMZ.VisualParallaxes.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.05] [VisualParallaxes]
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

function _0x1e4a(_0xe5c3c,_0x1ab9e9){const _0x2db520=_0x2db5();return _0x1e4a=function(_0x1e4ada,_0x1278b9){_0x1e4ada=_0x1e4ada-0x1ec;let _0x5213ba=_0x2db520[_0x1e4ada];return _0x5213ba;},_0x1e4a(_0xe5c3c,_0x1ab9e9);}const _0x1bad22=_0x1e4a;(function(_0xd1245b,_0x1b6d93){const _0x3b8583=_0x1e4a,_0x286fd6=_0xd1245b();while(!![]){try{const _0x1dea16=parseInt(_0x3b8583(0x282))/0x1+parseInt(_0x3b8583(0x2ef))/0x2*(parseInt(_0x3b8583(0x21e))/0x3)+parseInt(_0x3b8583(0x26a))/0x4*(-parseInt(_0x3b8583(0x219))/0x5)+parseInt(_0x3b8583(0x224))/0x6*(-parseInt(_0x3b8583(0x273))/0x7)+-parseInt(_0x3b8583(0x2e2))/0x8*(-parseInt(_0x3b8583(0x2de))/0x9)+-parseInt(_0x3b8583(0x253))/0xa+parseInt(_0x3b8583(0x1f6))/0xb;if(_0x1dea16===_0x1b6d93)break;else _0x286fd6['push'](_0x286fd6['shift']());}catch(_0x552f94){_0x286fd6['push'](_0x286fd6['shift']());}}}(_0x2db5,0xede9c));var label=_0x1bad22(0x2ca),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1bad22(0x2b1)](function(_0xf0747c){const _0x5afa8d=_0x1bad22;return _0xf0747c[_0x5afa8d(0x298)]&&_0xf0747c[_0x5afa8d(0x1f5)][_0x5afa8d(0x1fe)]('['+label+']');})[0x0];VisuMZ[label][_0x1bad22(0x203)]=VisuMZ[label][_0x1bad22(0x203)]||{},VisuMZ[_0x1bad22(0x200)]=function(_0x5bb760,_0x5c02d9){const _0x4dc094=_0x1bad22;for(const _0x483ba0 in _0x5c02d9){if(_0x483ba0[_0x4dc094(0x274)](/(.*):(.*)/i)){const _0x2dbb75=String(RegExp['$1']),_0x24f270=String(RegExp['$2'])[_0x4dc094(0x290)]()[_0x4dc094(0x2bb)]();let _0x25b075,_0x315e8e,_0x303e03;switch(_0x24f270){case _0x4dc094(0x2c0):_0x25b075=_0x5c02d9[_0x483ba0]!==''?Number(_0x5c02d9[_0x483ba0]):0x0;break;case _0x4dc094(0x21c):_0x315e8e=_0x5c02d9[_0x483ba0]!==''?JSON[_0x4dc094(0x2db)](_0x5c02d9[_0x483ba0]):[],_0x25b075=_0x315e8e[_0x4dc094(0x255)](_0x278012=>Number(_0x278012));break;case _0x4dc094(0x2a6):_0x25b075=_0x5c02d9[_0x483ba0]!==''?eval(_0x5c02d9[_0x483ba0]):null;break;case _0x4dc094(0x2f7):_0x315e8e=_0x5c02d9[_0x483ba0]!==''?JSON[_0x4dc094(0x2db)](_0x5c02d9[_0x483ba0]):[],_0x25b075=_0x315e8e[_0x4dc094(0x255)](_0x1b20d1=>eval(_0x1b20d1));break;case _0x4dc094(0x1f0):_0x25b075=_0x5c02d9[_0x483ba0]!==''?JSON[_0x4dc094(0x2db)](_0x5c02d9[_0x483ba0]):'';break;case _0x4dc094(0x263):_0x315e8e=_0x5c02d9[_0x483ba0]!==''?JSON[_0x4dc094(0x2db)](_0x5c02d9[_0x483ba0]):[],_0x25b075=_0x315e8e[_0x4dc094(0x255)](_0x2f6b4e=>JSON[_0x4dc094(0x2db)](_0x2f6b4e));break;case'FUNC':_0x25b075=_0x5c02d9[_0x483ba0]!==''?new Function(JSON[_0x4dc094(0x2db)](_0x5c02d9[_0x483ba0])):new Function(_0x4dc094(0x26b));break;case'ARRAYFUNC':_0x315e8e=_0x5c02d9[_0x483ba0]!==''?JSON['parse'](_0x5c02d9[_0x483ba0]):[],_0x25b075=_0x315e8e[_0x4dc094(0x255)](_0xb47dd6=>new Function(JSON['parse'](_0xb47dd6)));break;case _0x4dc094(0x2cb):_0x25b075=_0x5c02d9[_0x483ba0]!==''?String(_0x5c02d9[_0x483ba0]):'';break;case _0x4dc094(0x222):_0x315e8e=_0x5c02d9[_0x483ba0]!==''?JSON['parse'](_0x5c02d9[_0x483ba0]):[],_0x25b075=_0x315e8e['map'](_0x33a215=>String(_0x33a215));break;case'STRUCT':_0x303e03=_0x5c02d9[_0x483ba0]!==''?JSON[_0x4dc094(0x2db)](_0x5c02d9[_0x483ba0]):{},_0x25b075=VisuMZ[_0x4dc094(0x200)]({},_0x303e03);break;case _0x4dc094(0x201):_0x315e8e=_0x5c02d9[_0x483ba0]!==''?JSON[_0x4dc094(0x2db)](_0x5c02d9[_0x483ba0]):[],_0x25b075=_0x315e8e[_0x4dc094(0x255)](_0x8bba51=>VisuMZ[_0x4dc094(0x200)]({},JSON['parse'](_0x8bba51)));break;default:continue;}_0x5bb760[_0x2dbb75]=_0x25b075;}}return _0x5bb760;},(_0x4449a3=>{const _0x2ed8ac=_0x1bad22,_0x19b49f=_0x4449a3[_0x2ed8ac(0x2be)];for(const _0x59e6d8 of dependencies){if(!Imported[_0x59e6d8]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x19b49f,_0x59e6d8)),SceneManager['exit']();break;}}const _0x444aa7=_0x4449a3[_0x2ed8ac(0x1f5)];if(_0x444aa7[_0x2ed8ac(0x274)](/\[Version[ ](.*?)\]/i)){const _0x5843b0=Number(RegExp['$1']);_0x5843b0!==VisuMZ[label][_0x2ed8ac(0x29c)]&&(alert(_0x2ed8ac(0x269)[_0x2ed8ac(0x2d5)](_0x19b49f,_0x5843b0)),SceneManager[_0x2ed8ac(0x2ac)]());}if(_0x444aa7['match'](/\[Tier[ ](\d+)\]/i)){const _0x4c645e=Number(RegExp['$1']);_0x4c645e<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2ed8ac(0x2d5)](_0x19b49f,_0x4c645e,tier)),SceneManager['exit']()):tier=Math[_0x2ed8ac(0x2ed)](_0x4c645e,tier);}VisuMZ[_0x2ed8ac(0x200)](VisuMZ[label][_0x2ed8ac(0x203)],_0x4449a3[_0x2ed8ac(0x24d)]);})(pluginData),VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x22b)]=function(){return{'id':0x0,'filename':'','_parallaxZero':![],'_parallaxLoopX':![],'_parallaxLoopY':![],'_parallaxSx':0x0,'_parallaxSy':0x0,'_parallaxX':0x0,'_parallaxY':0x0,'opacity':0xff,'targetOpacity':0xff,'opacityDuration':0x0,'blendMode':0x0,'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[]};},PluginManager[_0x1bad22(0x261)](pluginData[_0x1bad22(0x2be)],_0x1bad22(0x2a4),_0x2a6934=>{const _0x2265da=_0x1bad22;VisuMZ[_0x2265da(0x200)](_0x2a6934,_0x2a6934);if(_0x2a6934['id']<=0x0)return;if(_0x2a6934[_0x2265da(0x25c)]===''||_0x2a6934[_0x2265da(0x25c)]===_0x2265da(0x2c3))return;let _0x1f2d0f=JsonEx['makeDeepCopy'](_0x2a6934['Optional']);if(!_0x1f2d0f[_0x2265da(0x204)](_0x2265da(0x234)))_0x1f2d0f=VisuMZ[_0x2265da(0x2ca)][_0x2265da(0x22b)]();_0x1f2d0f[_0x2265da(0x25c)]=_0x2a6934['filename'],_0x1f2d0f['id']=_0x2a6934['id'];_0x2a6934[_0x2265da(0x2ea)]===_0x2265da(0x2e5)&&(_0x1f2d0f['maskRegions']['length']<=0x0&&(_0x1f2d0f[_0x2265da(0x234)]=JsonEx[_0x2265da(0x26f)]($gameMap['getWaterReflectionRegions']())),_0x1f2d0f[_0x2265da(0x1ef)][_0x2265da(0x239)]<=0x0&&(_0x1f2d0f[_0x2265da(0x1ef)]=JsonEx[_0x2265da(0x26f)]($gameMap['getWaterReflectionTerrainTags']())));_0x2a6934[_0x2265da(0x2ea)]===_0x2265da(0x215)&&(_0x1f2d0f[_0x2265da(0x234)][_0x2265da(0x239)]<=0x0&&(_0x1f2d0f[_0x2265da(0x234)]=JsonEx[_0x2265da(0x26f)]($gameMap['getSolidReflectionRegions']())),_0x1f2d0f[_0x2265da(0x1ef)][_0x2265da(0x239)]<=0x0&&(_0x1f2d0f[_0x2265da(0x1ef)]=JsonEx[_0x2265da(0x26f)]($gameMap['getSolidReflectionTerrainTags']())));while(_0x1f2d0f[_0x2265da(0x29a)]['length']<0x4){_0x1f2d0f[_0x2265da(0x29a)]['push'](0x0);}_0x1f2d0f[_0x2265da(0x294)]=0x0,_0x1f2d0f[_0x2265da(0x25a)]=0x0,_0x1f2d0f[_0x2265da(0x2cd)]=_0x2a6934['opacity'],_0x1f2d0f[_0x2265da(0x257)]=0x0,$gameMap[_0x2265da(0x202)](_0x1f2d0f);}),PluginManager['registerCommand'](pluginData[_0x1bad22(0x2be)],_0x1bad22(0x243),_0x16e46e=>{const _0x41e570=_0x1bad22;if(!SceneManager['isInstanceOfSceneMap']())return;VisuMZ[_0x41e570(0x200)](_0x16e46e,_0x16e46e);const _0x5e9b92=_0x16e46e[_0x41e570(0x24a)];for(const _0x5d5f45 of _0x5e9b92){const _0x3291c9=$gameMap[_0x41e570(0x22a)](_0x5d5f45);if(!_0x3291c9)continue;_0x3291c9[_0x41e570(0x2cd)]=_0x16e46e[_0x41e570(0x2cd)]||0x0,_0x3291c9[_0x41e570(0x257)]=_0x16e46e[_0x41e570(0x257)]||0x0,_0x3291c9[_0x41e570(0x257)]<=0x0&&(_0x3291c9[_0x41e570(0x2e4)]=_0x3291c9['targetOpacity']);}}),PluginManager['registerCommand'](pluginData[_0x1bad22(0x2be)],'ParallaxRemove',_0x3e7349=>{const _0x405409=_0x1bad22;if(!SceneManager[_0x405409(0x20a)]())return;VisuMZ[_0x405409(0x200)](_0x3e7349,_0x3e7349);const _0x3b7835=_0x3e7349['list'];for(const _0x3404a3 of _0x3b7835){$gameMap[_0x405409(0x23e)](_0x3404a3);}}),VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x217)]={'Start':/<(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'End':/<\/(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'Filename':/(?:FILENAME|NAME):[ ](.*)/i,'HorzLoop':/(?:HORZ|HORIZONTAL) (?:LOOP|SCROLL):[ ](.*)/i,'VertLoop':/(?:VERT|VERTICAL) (?:LOOP|SCROLL):[ ](.*)/i,'ScrollLock':/<(?:MAP|SCROLL)[ ](?:LOCK|LOCKED)>/i,'OpacityRate':/(?:OPACITY):[ ](\d+)([%％])/i,'OpacityFlat':/(?:OPACITY):[ ](\d+)/i,'BlendMode':/BLEND MODE:[ ](.*)/i,'Hue':/HUE:[ ](\d+)/i,'HueShift':/HUE (?:SHIFT|SPEED):[ ](.*)/i,'Tone':/(?:COLOR TONE|TONE|TINT):[ ](.*)/i,'MaskRegions':/(?:REGION|REGIONS):[ ](.*)/i,'MaskTerrainTags':/TERRAIN (?:TAG|TAGS):[ ](.*)/i,'WaterRegions':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'WaterTerrainTags':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'WaterTop':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TOP>/i,'WaterBottom':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOTTOM>/i,'WaterBlur':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BLUR:[ ](.*)>/i,'WaterOpacityRate':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'WaterOpacityFlat':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)>/i,'WaterBoundary':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOUNDARY:[ ](.*)>/i,'WaterAmplitude':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:AMP|AMPLITUDE):[ ](.*)>/i,'WaterWavelength':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:WAVE|WAVELENGTH):[ ](.*)>/i,'SolidRegions':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'SolidTerrainTags':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'SolidTop':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TOP>/i,'SolidBottom':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BOTTOM>/i,'SolidBlur':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BLUR:[ ](.*)>/i,'SolidOpacityRate':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'SolidOpacityFlat':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)>/i,'NoReflection':/<NO (?:REFLECT|REFLECTION|REFLECTIONS)>/i},SceneManager[_0x1bad22(0x292)]=function(){const _0x5bbc3c=_0x1bad22;return this[_0x5bbc3c(0x20f)]&&this[_0x5bbc3c(0x20f)][_0x5bbc3c(0x2ab)]===Scene_Map;},SceneManager[_0x1bad22(0x20a)]=function(){const _0xf443ba=_0x1bad22;return this[_0xf443ba(0x20f)]&&this[_0xf443ba(0x20f)]instanceof Scene_Map;},VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x1ec)]=Game_Map[_0x1bad22(0x2c2)]['setup'],Game_Map['prototype']['setup']=function(_0x51c5fb){const _0x3b0406=_0x1bad22;VisuMZ[_0x3b0406(0x2ca)]['Game_Map_setup']['call'](this,_0x51c5fb),this[_0x3b0406(0x2a2)](),this[_0x3b0406(0x256)]();},Game_Map['DEFAULT_WATER_REFLECTION_REGIONS']=VisuMZ['VisualParallaxes'][_0x1bad22(0x203)][_0x1bad22(0x28b)]['Regions'],Game_Map[_0x1bad22(0x240)]=VisuMZ['VisualParallaxes']['Settings'][_0x1bad22(0x28b)][_0x1bad22(0x26e)],Game_Map['prototype'][_0x1bad22(0x249)]=function(){const _0x3e6322=_0x1bad22;if(DataManager[_0x3e6322(0x220)]())return!![];if(this[_0x3e6322(0x2cf)]()||this[_0x3e6322(0x2b5)]())return!![];const _0x9e4c77=VisuMZ['VisualParallaxes'][_0x3e6322(0x217)],_0x5e9b90=$dataMap[_0x3e6322(0x2d9)]||'';return _0x5e9b90['match'](_0x9e4c77[_0x3e6322(0x21a)])?!![]:![];},Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x287)]=function(){const _0x29bfdc=_0x1bad22,_0x2e7757=VisuMZ[_0x29bfdc(0x2ca)][_0x29bfdc(0x217)],_0x32a0f2=$dataMap[_0x29bfdc(0x2d9)]||'';if(_0x32a0f2[_0x29bfdc(0x274)](_0x2e7757[_0x29bfdc(0x26d)]))return String(RegExp['$1'])[_0x29bfdc(0x205)](',')[_0x29bfdc(0x255)](_0x5bf351=>Number(_0x5bf351)||0x1)[_0x29bfdc(0x244)](0x0);return JsonEx[_0x29bfdc(0x26f)](Game_Map[_0x29bfdc(0x27a)])[_0x29bfdc(0x244)](0x0);},Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x22c)]=function(){const _0x160ef5=_0x1bad22,_0x288597=VisuMZ['VisualParallaxes'][_0x160ef5(0x217)],_0x13cd60=$dataMap[_0x160ef5(0x2d9)]||'';if(_0x13cd60['match'](_0x288597[_0x160ef5(0x2f9)]))return String(RegExp['$1'])[_0x160ef5(0x205)](',')[_0x160ef5(0x255)](_0x434d02=>Number(_0x434d02)||0x1)[_0x160ef5(0x244)](0x0);return JsonEx[_0x160ef5(0x26f)](Game_Map[_0x160ef5(0x240)])[_0x160ef5(0x244)](0x0);},Game_Map['DEFAULT_WATER_REFLECTION_FILTER_TOP']=VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x203)][_0x1bad22(0x28b)][_0x1bad22(0x232)],Game_Map[_0x1bad22(0x2f6)]=VisuMZ['VisualParallaxes'][_0x1bad22(0x203)][_0x1bad22(0x28b)]['Blur'],Game_Map['DEFAULT_WATER_REFLECTION_FILTER_OPACITY']=VisuMZ[_0x1bad22(0x2ca)]['Settings'][_0x1bad22(0x28b)][_0x1bad22(0x2fb)],Game_Map[_0x1bad22(0x2d1)]=VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x203)]['WaterReflect']['Boundary'],Game_Map[_0x1bad22(0x2af)]=[VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x203)][_0x1bad22(0x28b)][_0x1bad22(0x2b6)],VisuMZ[_0x1bad22(0x2ca)]['Settings'][_0x1bad22(0x28b)]['AmpEnd']],Game_Map[_0x1bad22(0x209)]=[VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x203)][_0x1bad22(0x28b)][_0x1bad22(0x27c)],VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x203)][_0x1bad22(0x28b)]['WaveEnd']],Game_Map['prototype'][_0x1bad22(0x2e9)]=function(){const _0x307e52=_0x1bad22,_0x163c13=VisuMZ[_0x307e52(0x2ca)][_0x307e52(0x217)],_0x213049=$dataMap[_0x307e52(0x2d9)]||'';if(_0x213049[_0x307e52(0x274)](_0x163c13[_0x307e52(0x291)]))return!![];else{if(_0x213049['match'](_0x163c13[_0x307e52(0x289)]))return![];}return Game_Map['DEFAULT_WATER_REFLECTION_FILTER_TOP'];},Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x28e)]=function(){const _0x22f972=_0x1bad22,_0x48f393=VisuMZ['VisualParallaxes'][_0x22f972(0x217)],_0x4aa93c=$dataMap['note']||'';if(_0x4aa93c[_0x22f972(0x274)](_0x48f393[_0x22f972(0x2e0)]))return Math['max'](0x0,Number(RegExp['$1'])||0x0);return Game_Map[_0x22f972(0x2f6)];},Game_Map['prototype'][_0x1bad22(0x1ee)]=function(){const _0x12c96b=_0x1bad22,_0x4dd8e4=VisuMZ['VisualParallaxes'][_0x12c96b(0x217)],_0x34d682=$dataMap[_0x12c96b(0x2d9)]||'';if(_0x34d682[_0x12c96b(0x274)](_0x4dd8e4[_0x12c96b(0x216)]))return Math[_0x12c96b(0x20d)]((Number(RegExp['$1'])||0x0)*0.01*0xff)[_0x12c96b(0x2d2)](0x0,0xff);else{if(_0x34d682[_0x12c96b(0x274)](_0x4dd8e4[_0x12c96b(0x2dd)]))return(Number(RegExp['$1'])||0x0)[_0x12c96b(0x2d2)](0x0,0xff);}return Game_Map[_0x12c96b(0x2f2)];},Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x2cc)]=function(){const _0x4ed1ab=_0x1bad22,_0x136d09=VisuMZ[_0x4ed1ab(0x2ca)]['RegExp'],_0x87efff=$dataMap['note']||'';if(_0x87efff['match'](_0x136d09[_0x4ed1ab(0x258)]))return(Number(RegExp['$1'])||0x0)['clamp'](0x0,0x1);return Game_Map[_0x4ed1ab(0x2d1)];},Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x23d)]=function(){const _0x4468e8=_0x1bad22,_0x133725=VisuMZ['VisualParallaxes'][_0x4468e8(0x217)],_0x375d9e=$dataMap[_0x4468e8(0x2d9)]||'';if(_0x375d9e[_0x4468e8(0x274)](_0x133725[_0x4468e8(0x254)])){const _0x65bcaa=String(RegExp['$1'])['split'](',')[_0x4468e8(0x255)](_0x5c633b=>Number(_0x5c633b)||0x0);if(_0x65bcaa[_0x4468e8(0x239)]<=0x1)_0x65bcaa[0x1]=_0x65bcaa[0x0];}return JsonEx[_0x4468e8(0x26f)](Game_Map['DEFAULT_WATER_REFLECTION_FILTER_AMPLITUDE'])['remove'](0x0);},Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x2a1)]=function(){const _0x4d8247=_0x1bad22,_0x26ddc8=VisuMZ[_0x4d8247(0x2ca)][_0x4d8247(0x217)],_0xcedaf9=$dataMap['note']||'';if(_0xcedaf9[_0x4d8247(0x274)](_0x26ddc8[_0x4d8247(0x254)])){const _0x2842a4=String(RegExp['$1'])[_0x4d8247(0x205)](',')[_0x4d8247(0x255)](_0x1e4f32=>Number(_0x1e4f32)||0x0);if(_0x2842a4['length']<=0x1)_0x2842a4[0x1]=_0x2842a4[0x0];}return JsonEx[_0x4d8247(0x26f)](Game_Map[_0x4d8247(0x209)])['remove'](0x0);},Game_Map[_0x1bad22(0x285)]=VisuMZ['VisualParallaxes']['Settings']['SolidReflect']['Regions'],Game_Map[_0x1bad22(0x2ce)]=VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x203)]['SolidReflect']['TerrainTags'],Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x2f5)]=function(){const _0x1b6219=_0x1bad22,_0xd9f166=VisuMZ['VisualParallaxes'][_0x1b6219(0x217)],_0x3d0ca7=$dataMap[_0x1b6219(0x2d9)]||'';if(_0x3d0ca7['match'](_0xd9f166['SolidRegions']))return String(RegExp['$1'])[_0x1b6219(0x205)](',')[_0x1b6219(0x255)](_0x43f661=>Number(_0x43f661)||0x1)[_0x1b6219(0x244)](0x0);return JsonEx[_0x1b6219(0x26f)](Game_Map[_0x1b6219(0x285)])[_0x1b6219(0x244)](0x0);},Game_Map[_0x1bad22(0x2c2)]['getSolidReflectionTerrainTags']=function(){const _0x18a10b=_0x1bad22,_0x3ca801=VisuMZ[_0x18a10b(0x2ca)][_0x18a10b(0x217)],_0x2e713c=$dataMap[_0x18a10b(0x2d9)]||'';if(_0x2e713c[_0x18a10b(0x274)](_0x3ca801[_0x18a10b(0x275)]))return String(RegExp['$1'])[_0x18a10b(0x205)](',')[_0x18a10b(0x255)](_0x574512=>Number(_0x574512)||0x1)[_0x18a10b(0x244)](0x0);return JsonEx[_0x18a10b(0x26f)](Game_Map['DEFAULT_SOLID_REFLECTION_TERRAINTAGS'])[_0x18a10b(0x244)](0x0);},Game_Map[_0x1bad22(0x2b2)]=VisuMZ[_0x1bad22(0x2ca)]['Settings']['SolidReflect'][_0x1bad22(0x232)],Game_Map[_0x1bad22(0x2bd)]=VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x203)][_0x1bad22(0x238)]['Blur'],Game_Map[_0x1bad22(0x2f2)]=VisuMZ[_0x1bad22(0x2ca)]['Settings'][_0x1bad22(0x238)][_0x1bad22(0x2fb)],Game_Map['prototype'][_0x1bad22(0x24f)]=function(){const _0x451616=_0x1bad22,_0x3fe5c0=VisuMZ[_0x451616(0x2ca)][_0x451616(0x217)],_0x2eaeda=$dataMap['note']||'';if(_0x2eaeda[_0x451616(0x274)](_0x3fe5c0[_0x451616(0x23f)]))return!![];else{if(_0x2eaeda['match'](_0x3fe5c0[_0x451616(0x28c)]))return![];}return Game_Map['DEFAULT_SOLID_REFLECTION_FILTER_TOP'];},Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x2f4)]=function(){const _0x4bdefd=_0x1bad22,_0x57645b=VisuMZ[_0x4bdefd(0x2ca)][_0x4bdefd(0x217)],_0xe11223=$dataMap[_0x4bdefd(0x2d9)]||'';if(_0xe11223[_0x4bdefd(0x274)](_0x57645b['SolidBlur']))return Math['max'](0x0,Number(RegExp['$1'])||0x0);return Game_Map[_0x4bdefd(0x2bd)];},Game_Map['prototype'][_0x1bad22(0x1f2)]=function(){const _0x4ac8e3=_0x1bad22,_0x398202=VisuMZ['VisualParallaxes']['RegExp'],_0x46c9be=$dataMap[_0x4ac8e3(0x2d9)]||'';if(_0x46c9be[_0x4ac8e3(0x274)](_0x398202[_0x4ac8e3(0x233)]))return Math[_0x4ac8e3(0x20d)]((Number(RegExp['$1'])||0x0)*0.01*0xff)[_0x4ac8e3(0x2d2)](0x0,0xff);else{if(_0x46c9be[_0x4ac8e3(0x274)](_0x398202['SolidOpacityFlat']))return(Number(RegExp['$1'])||0x0)[_0x4ac8e3(0x2d2)](0x0,0xff);}return Game_Map[_0x4ac8e3(0x2f2)];},Game_Map['prototype'][_0x1bad22(0x256)]=function(){const _0x185624=_0x1bad22,_0xe879e0=this[_0x185624(0x287)](),_0x101982=this[_0x185624(0x22c)](),_0x11f484=this[_0x185624(0x2f5)](),_0x18aef4=this[_0x185624(0x2df)](),_0x3e5363=this[_0x185624(0x262)](),_0x389588=this['height']();this['_hasWaterReflections']=![],this[_0x185624(0x27e)]=![];for(let _0x22c850=0x0;_0x22c850<_0x3e5363;_0x22c850++){for(let _0x3d8562=0x0;_0x3d8562<_0x3e5363;_0x3d8562++){const _0x212163=this['regionId'](_0x22c850,_0x3d8562);_0xe879e0[_0x185624(0x1fe)](_0x212163)&&(this[_0x185624(0x278)]=!![]);_0x11f484[_0x185624(0x1fe)](_0x212163)&&(this[_0x185624(0x27e)]=!![]);const _0x913122=this[_0x185624(0x2c1)](_0x22c850,_0x3d8562);_0x101982[_0x185624(0x1fe)](_0x913122)&&(this[_0x185624(0x278)]=!![]);_0x18aef4[_0x185624(0x1fe)](_0x913122)&&(this['_hasSolidReflections']=!![]);if(this['_hasWaterReflections']&&this['_hasSolidReflections'])break;}}},Game_Map[_0x1bad22(0x2c2)]['hasWaterReflections']=function(){const _0x2abb36=_0x1bad22;if(this[_0x2abb36(0x278)]===undefined)this['registerReflectionSettings']();return this['_hasWaterReflections'];},Game_Map['prototype']['hasSolidReflections']=function(){const _0xd77d9b=_0x1bad22;if(this['_hasSolidReflections']===undefined)this[_0xd77d9b(0x256)]();return this[_0xd77d9b(0x27e)];},Game_Map['prototype'][_0x1bad22(0x2a2)]=function(){const _0x378e3e=_0x1bad22;this[_0x378e3e(0x283)]=[null];if(!$dataMap)return;const _0x202cd2=VisuMZ[_0x378e3e(0x2ca)][_0x378e3e(0x2e7)]();for(const _0x351c79 of _0x202cd2){if(!_0x351c79)continue;this[_0x378e3e(0x283)][_0x351c79['id']]=_0x351c79;}},VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x2e7)]=function(){const _0x2bf5f5=_0x1bad22;if(!$dataMap)return[];const _0x59f6f0=[],_0xb44643=VisuMZ[_0x2bf5f5(0x2ca)][_0x2bf5f5(0x22b)]();if(!$dataMap[_0x2bf5f5(0x2d9)])return[];const _0x16fc4b=VisuMZ[_0x2bf5f5(0x2ca)][_0x2bf5f5(0x217)],_0x560da9=$dataMap[_0x2bf5f5(0x2d9)][_0x2bf5f5(0x205)](/[\r\n]+/);let _0x19a69c=JsonEx['makeDeepCopy'](_0xb44643);for(const _0x412117 of _0x560da9){if(_0x412117[_0x2bf5f5(0x274)](_0x16fc4b['Start'])){_0x19a69c['id']=Number(RegExp['$1']);if(_0x412117[_0x2bf5f5(0x274)](/WATER/i))_0x19a69c[_0x2bf5f5(0x234)]=JsonEx[_0x2bf5f5(0x26f)]($gameMap[_0x2bf5f5(0x287)]()),_0x19a69c[_0x2bf5f5(0x1ef)]=JsonEx[_0x2bf5f5(0x26f)]($gameMap[_0x2bf5f5(0x22c)]());else _0x412117['match'](/SOLID/i)&&(_0x19a69c[_0x2bf5f5(0x234)]=JsonEx[_0x2bf5f5(0x26f)]($gameMap[_0x2bf5f5(0x2f5)]()),_0x19a69c[_0x2bf5f5(0x1ef)]=JsonEx[_0x2bf5f5(0x26f)]($gameMap[_0x2bf5f5(0x2df)]()));}else{if(_0x412117[_0x2bf5f5(0x274)](_0x16fc4b[_0x2bf5f5(0x210)])){const _0x46b36a=Number(RegExp['$1']);if(_0x46b36a>0x0&&_0x46b36a===_0x19a69c['id']&&_0x19a69c[_0x2bf5f5(0x25c)]!=='')_0x59f6f0['push'](_0x19a69c);_0x19a69c=JsonEx['makeDeepCopy'](_0xb44643);}else{if(_0x19a69c['id']<=0x0)continue;}}if(_0x412117[_0x2bf5f5(0x274)](_0x16fc4b[_0x2bf5f5(0x23c)]))_0x19a69c[_0x2bf5f5(0x25c)]=String(RegExp['$1'])[_0x2bf5f5(0x2bb)](),_0x19a69c[_0x2bf5f5(0x25c)]['charAt'](0x0)==='!'&&(_0x19a69c[_0x2bf5f5(0x230)]=!![]);else{if(_0x412117[_0x2bf5f5(0x274)](_0x16fc4b['HorzLoop']))_0x19a69c[_0x2bf5f5(0x206)]=!![],_0x19a69c[_0x2bf5f5(0x2a8)]=Number(RegExp['$1'])||0x0;else{if(_0x412117[_0x2bf5f5(0x274)](_0x16fc4b[_0x2bf5f5(0x2d8)]))_0x19a69c[_0x2bf5f5(0x26c)]=!![],_0x19a69c[_0x2bf5f5(0x2e8)]=Number(RegExp['$1'])||0x0;else{if(_0x412117['match'](_0x16fc4b[_0x2bf5f5(0x2a9)]))_0x19a69c[_0x2bf5f5(0x230)]=!![];else{if(_0x412117[_0x2bf5f5(0x274)](_0x16fc4b[_0x2bf5f5(0x2eb)])){const _0x5a7bd4=Number(RegExp['$1'])*0.01;_0x19a69c[_0x2bf5f5(0x2e4)]=Math[_0x2bf5f5(0x20d)](_0x5a7bd4*0xff)[_0x2bf5f5(0x2d2)](0x0,0xff);}else{if(_0x412117[_0x2bf5f5(0x274)](_0x16fc4b['OpacityFlat']))_0x19a69c[_0x2bf5f5(0x2e4)]=Number(RegExp['$1'])[_0x2bf5f5(0x2d2)](0x0,0xff);else{if(_0x412117[_0x2bf5f5(0x274)](_0x16fc4b[_0x2bf5f5(0x2f1)])){const _0x390170=String(RegExp['$1'])[_0x2bf5f5(0x290)]()[_0x2bf5f5(0x2bb)](),_0x2a7d44=[_0x2bf5f5(0x266),_0x2bf5f5(0x27b),_0x2bf5f5(0x29f),_0x2bf5f5(0x1fb)];_0x19a69c['blendMode']=_0x2a7d44[_0x2bf5f5(0x2d3)](_0x390170)[_0x2bf5f5(0x2d2)](0x0,0x3);}else{if(_0x412117[_0x2bf5f5(0x274)](_0x16fc4b[_0x2bf5f5(0x2bf)]))_0x19a69c['hue']=Number(RegExp['$1'])['clamp'](0x0,0x168);else{if(_0x412117[_0x2bf5f5(0x274)](_0x16fc4b[_0x2bf5f5(0x271)]))_0x19a69c['hueShift']=Number(RegExp['$1'])||0x0;else{if(_0x412117[_0x2bf5f5(0x274)](_0x16fc4b[_0x2bf5f5(0x295)])){const _0x509881=String(RegExp['$1'])[_0x2bf5f5(0x205)](',')[_0x2bf5f5(0x255)](_0xf701fa=>Number(_0xf701fa)||0x0);while(_0x509881[_0x2bf5f5(0x239)]<0x4)_0x509881[_0x2bf5f5(0x28f)](0x0);_0x19a69c[_0x2bf5f5(0x29a)]=_0x509881;}else{if(_0x412117[_0x2bf5f5(0x274)](_0x16fc4b['MaskRegions'])){const _0x3cc5a4=String(RegExp['$1'])[_0x2bf5f5(0x205)](',')[_0x2bf5f5(0x255)](_0x552914=>Number(_0x552914)||0x1);_0x19a69c[_0x2bf5f5(0x234)]=_0x3cc5a4;}else{if(_0x412117[_0x2bf5f5(0x274)](_0x16fc4b[_0x2bf5f5(0x24e)])){const _0x254a1b=String(RegExp['$1'])[_0x2bf5f5(0x205)](',')[_0x2bf5f5(0x255)](_0x393fd0=>Number(_0x393fd0)||0x1);_0x19a69c['maskTerrainTags']=_0x254a1b;}}}}}}}}}}}}}return _0x59f6f0;},Game_Map[_0x1bad22(0x2c2)]['getVisualParallaxes']=function(){const _0x22adeb=_0x1bad22;return this[_0x22adeb(0x283)]['filter'](_0x3452ca=>!!_0x3452ca);},Game_Map[_0x1bad22(0x2c2)]['getVisualParallaxSettings']=function(_0x1045b2){const _0x5b3ec2=_0x1bad22;return this[_0x5b3ec2(0x283)][_0x1045b2]||null;},Game_Map['prototype']['getVisualParallaxOx']=function(_0x59096e){const _0x2a3d3e=_0x1bad22,_0x3ffa3e=this[_0x2a3d3e(0x22a)](_0x59096e);if(_0x3ffa3e[_0x2a3d3e(0x230)])return _0x3ffa3e[_0x2a3d3e(0x294)]*this[_0x2a3d3e(0x286)]();else return _0x3ffa3e['_parallaxLoopX']?_0x3ffa3e[_0x2a3d3e(0x294)]*this['tileWidth']()/0x2:0x0;},Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x250)]=function(_0x152396){const _0x31ba39=_0x1bad22,_0x3dc3f9=this['getVisualParallaxSettings'](_0x152396);if(_0x3dc3f9[_0x31ba39(0x230)])return _0x3dc3f9[_0x31ba39(0x25a)]*this[_0x31ba39(0x1f1)]();else return _0x3dc3f9['_parallaxLoopY']?_0x3dc3f9['_parallaxY']*this[_0x31ba39(0x1f1)]()/0x2:0x0;},Game_Map['prototype'][_0x1bad22(0x23e)]=function(_0x23956f){const _0x19ee94=_0x1bad22;this[_0x19ee94(0x283)]=this[_0x19ee94(0x283)]||[];if(!this['_visualParallaxSettings'][_0x23956f])return;this['_visualParallaxSettings'][_0x23956f]=null;const _0x33d096=SceneManager[_0x19ee94(0x20f)][_0x19ee94(0x2b3)];_0x33d096&&_0x33d096[_0x19ee94(0x213)](_0x23956f);},Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x202)]=function(_0x552d4f){const _0x4254ef=_0x1bad22,_0x914edf=_0x552d4f['id'];let _0x4b23e9=![];this[_0x4254ef(0x283)]=this['_visualParallaxSettings']||[];if(this[_0x4254ef(0x283)][_0x914edf]){const _0x2462ff=this[_0x4254ef(0x283)][_0x914edf];if(!_0x2462ff['maskRegions'][_0x4254ef(0x270)](_0x552d4f[_0x4254ef(0x234)]))_0x4b23e9=!![];else!_0x2462ff[_0x4254ef(0x1ef)][_0x4254ef(0x270)](_0x552d4f[_0x4254ef(0x1ef)])&&(_0x4b23e9=!![]);}this[_0x4254ef(0x283)][_0x914edf]=_0x552d4f;if(!SceneManager[_0x4254ef(0x292)]())return;const _0x209567=SceneManager['_scene']['_spriteset'];_0x209567&&_0x209567[_0x4254ef(0x2c5)](_0x914edf,_0x4b23e9);},VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x259)]=Game_Map['prototype']['setDisplayPos'],Game_Map['prototype']['setDisplayPos']=function(_0x2a1b97,_0x272034){const _0x4d4b01=_0x1bad22;VisuMZ[_0x4d4b01(0x2ca)][_0x4d4b01(0x259)][_0x4d4b01(0x2da)](this,_0x2a1b97,_0x272034);for(const _0x47bb9b of this[_0x4d4b01(0x29e)]()){if(!_0x47bb9b)continue;this['isLoopHorizontal']()?_0x47bb9b['_parallaxX']=_0x2a1b97:_0x47bb9b[_0x4d4b01(0x294)]=this[_0x4d4b01(0x23a)],this[_0x4d4b01(0x2b5)]()?_0x47bb9b['_parallaxY']=_0x272034:_0x47bb9b[_0x4d4b01(0x25a)]=this['_displayY'];}},VisuMZ['VisualParallaxes'][_0x1bad22(0x228)]=Game_Map[_0x1bad22(0x2c2)]['scrollLeft'],Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x29d)]=function(_0x5a2ee6){const _0x29da22=_0x1bad22,_0x52da27=this[_0x29da22(0x23a)];VisuMZ[_0x29da22(0x2ca)]['Game_Map_scrollLeft'][_0x29da22(0x2da)](this,_0x5a2ee6);for(const _0x308996 of this['getVisualParallaxes']()){if(!_0x308996)continue;if(this[_0x29da22(0x2cf)]())_0x308996[_0x29da22(0x206)]&&(_0x308996[_0x29da22(0x294)]-=_0x5a2ee6);else this[_0x29da22(0x262)]()>=this[_0x29da22(0x2a5)]()&&(_0x308996[_0x29da22(0x294)]+=this['_displayX']-_0x52da27);}},VisuMZ[_0x1bad22(0x2ca)]['Game_Map_scrollRight']=Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x288)],Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x288)]=function(_0x16e656){const _0xfbdbd3=_0x1bad22,_0x52dfed=this[_0xfbdbd3(0x23a)];VisuMZ[_0xfbdbd3(0x2ca)][_0xfbdbd3(0x2e3)]['call'](this,_0x16e656);for(const _0x1166df of this['getVisualParallaxes']()){if(!_0x1166df)continue;if(this[_0xfbdbd3(0x2cf)]())_0x1166df[_0xfbdbd3(0x206)]&&(_0x1166df[_0xfbdbd3(0x294)]+=_0x16e656);else this[_0xfbdbd3(0x262)]()>=this[_0xfbdbd3(0x2a5)]()&&(_0x1166df[_0xfbdbd3(0x294)]+=this[_0xfbdbd3(0x23a)]-_0x52dfed);}},VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x22d)]=Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x252)],Game_Map['prototype'][_0x1bad22(0x252)]=function(_0x5af0f6){const _0x4dcc1d=_0x1bad22,_0x56a6c8=this[_0x4dcc1d(0x241)];VisuMZ[_0x4dcc1d(0x2ca)]['Game_Map_scrollDown'][_0x4dcc1d(0x2da)](this,_0x5af0f6);for(const _0x3927ec of this[_0x4dcc1d(0x29e)]()){if(!_0x3927ec)continue;if(this[_0x4dcc1d(0x2b5)]())_0x3927ec[_0x4dcc1d(0x26c)]&&(_0x3927ec[_0x4dcc1d(0x25a)]+=_0x5af0f6);else this['height']()>=this[_0x4dcc1d(0x1f9)]()&&(_0x3927ec[_0x4dcc1d(0x25a)]+=this[_0x4dcc1d(0x241)]-_0x56a6c8);}},VisuMZ['VisualParallaxes'][_0x1bad22(0x2f0)]=Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x29b)],Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x29b)]=function(_0x1f4f4f){const _0x475a1a=_0x1bad22,_0x2e9048=this[_0x475a1a(0x241)];VisuMZ['VisualParallaxes'][_0x475a1a(0x2f0)]['call'](this,_0x1f4f4f);for(const _0x1120af of this[_0x475a1a(0x29e)]()){if(!_0x1120af)continue;if(this['isLoopVertical']())_0x1120af['_parallaxLoopY']&&(_0x1120af[_0x475a1a(0x25a)]-=_0x1f4f4f);else this[_0x475a1a(0x235)]()>=this[_0x475a1a(0x1f9)]()&&(_0x1120af['_parallaxY']+=this[_0x475a1a(0x241)]-_0x2e9048);}},VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x2f8)]=Game_Map['prototype'][_0x1bad22(0x279)],Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x279)]=function(){const _0x3d803f=_0x1bad22;VisuMZ[_0x3d803f(0x2ca)]['Game_Map_updateParallax'][_0x3d803f(0x2da)](this);for(const _0x23dc09 of this[_0x3d803f(0x29e)]()){if(!_0x23dc09)continue;this['updateVisualParallaxSettings'](_0x23dc09);}},Game_Map[_0x1bad22(0x2c2)][_0x1bad22(0x272)]=function(_0x3cb05f){const _0x7c5c08=_0x1bad22;_0x3cb05f['_parallaxLoopX']&&(_0x3cb05f[_0x7c5c08(0x294)]+=_0x3cb05f[_0x7c5c08(0x2a8)]/this[_0x7c5c08(0x286)]()/0x2);_0x3cb05f[_0x7c5c08(0x26c)]&&(_0x3cb05f['_parallaxY']+=_0x3cb05f[_0x7c5c08(0x2e8)]/this['tileHeight']()/0x2);_0x3cb05f['hue']+=_0x3cb05f[_0x7c5c08(0x293)];if(_0x3cb05f[_0x7c5c08(0x257)]>0x0){const _0x987430=_0x3cb05f['opacityDuration'];_0x3cb05f[_0x7c5c08(0x2e4)]=(_0x3cb05f[_0x7c5c08(0x2e4)]*(_0x987430-0x1)+_0x3cb05f[_0x7c5c08(0x2cd)])/_0x987430,_0x3cb05f[_0x7c5c08(0x257)]--;}},VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x226)]=Game_Event[_0x1bad22(0x2c2)][_0x1bad22(0x296)],Game_Event[_0x1bad22(0x2c2)][_0x1bad22(0x296)]=function(){const _0x2e7b59=_0x1bad22;VisuMZ[_0x2e7b59(0x2ca)]['Game_Event_clearPageSettings'][_0x2e7b59(0x2da)](this),this[_0x2e7b59(0x223)]();},VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x245)]=Game_Event['prototype'][_0x1bad22(0x28a)],Game_Event['prototype'][_0x1bad22(0x28a)]=function(){const _0x26fc2e=_0x1bad22;VisuMZ['VisualParallaxes'][_0x26fc2e(0x245)][_0x26fc2e(0x2da)](this),this[_0x26fc2e(0x20b)]();},Game_Event[_0x1bad22(0x2c2)]['setupVisualParallaxesEffects']=function(){const _0x249fc6=_0x1bad22;if(!this[_0x249fc6(0x2ad)]())return;this[_0x249fc6(0x223)](),this[_0x249fc6(0x1f7)](),this[_0x249fc6(0x27d)]();},Game_Event['prototype'][_0x1bad22(0x1f7)]=function(){const _0x48e21f=_0x1bad22,_0x20873a=this[_0x48e21f(0x2ad)]()[_0x48e21f(0x2d9)];if(_0x20873a==='')return;this[_0x48e21f(0x25b)](_0x20873a);},Game_Event['prototype'][_0x1bad22(0x27d)]=function(){const _0x2ea657=_0x1bad22;if(!this[_0x2ea657(0x218)]())return;const _0x394458=this[_0x2ea657(0x24a)]();let _0x2b58fb='';for(const _0x17f801 of _0x394458){if([0x6c,0x198][_0x2ea657(0x1fe)](_0x17f801['code'])){if(_0x2b58fb!=='')_0x2b58fb+='\x0a';_0x2b58fb+=_0x17f801['parameters'][0x0];}}this[_0x2ea657(0x25b)](_0x2b58fb);},Game_Event[_0x1bad22(0x2c2)]['initVisualParallaxesEffects']=function(){const _0x4a67da=_0x1bad22;this[_0x4a67da(0x24c)]=![];},Game_Event[_0x1bad22(0x2c2)]['checkVisualParallaxesStringTags']=function(_0xcc54be){const _0x155bd8=_0x1bad22,_0x20d095=VisuMZ[_0x155bd8(0x2ca)][_0x155bd8(0x217)];_0xcc54be[_0x155bd8(0x274)](_0x20d095[_0x155bd8(0x21a)])&&(this[_0x155bd8(0x24c)]=!![]);};function Sprite_VisualParallax(){const _0x47e1ab=_0x1bad22;this[_0x47e1ab(0x260)](...arguments);}function _0x2db5(){const _0x22b840=['format','createMaskBitmap','reverseData','VertLoop','note','call','parse','vehicles','WaterOpacityFlat','9SDFaEs','getSolidReflectionTerrainTags','WaterBlur','regionId','6198952OBWgwL','Game_Map_scrollRight','opacity','water','settings','CreateLayerData','_parallaxSy','getWaterReflectionTop','type','OpacityRate','_solidReflectContainer','max','loadBitmap','584152AQPJDu','Game_Map_scrollUp','BlendMode','DEFAULT_SOLID_REFLECTION_FILTER_OPACITY','displayY','getSolidReflectionBlur','getSolidReflectionRegions','DEFAULT_WATER_REFLECTION_FILTER_BLUR','ARRAYEVAL','Game_Map_updateParallax','WaterTerrainTags','sort','Opacity','updateSolidReflections','Game_Map_setup','_reflectFilter','getWaterReflectionOpacity','maskTerrainTags','JSON','tileHeight','getSolidReflectionOpacity','update','createParallaxLayers','description','12614789MqQvQn','setupVisualParallaxesNotetags','updateHue','screenTileY','origin','SCREEN','_waterReflectLayer','updateOrigin','includes','_id','ConvertParams','ARRAYSTRUCT','addChangeVisualParallax','Settings','hasOwnProperty','split','_parallaxLoopX','filters','time','DEFAULT_WATER_REFLECTION_FILTER_WAVELENGTH','isInstanceOfSceneMap','setupVisualParallaxesEffects','updateBlendMode','round','mask','_scene','End','findTargetVisualParallax','destroy','removeVisualParallaxLayer','_waterReflectContainer','wasolidter','WaterOpacityRate','RegExp','page','4863160iwgzJj','NoReflection','createParallaxContainer','ARRAYNUM','_reflection','12WgimUq','Spriteset_Map_update','isEventTest','_colorTone','ARRAYSTR','initVisualParallaxesEffects','809850nOCjuC','setupRadialLight','Game_Event_clearPageSettings','_parallaxName','Game_Map_scrollLeft','ReflectionFilter','getVisualParallaxSettings','TemplateSettings','getWaterReflectionTerrainTags','Game_Map_scrollDown','_parallaxContainer','createMaskSprite','_parallaxZero','setHue','Top','SolidOpacityRate','maskRegions','height','_solidReflectLayer','create','SolidReflect','length','_displayX','blendMode','Filename','getWaterReflectionAmplitude','removeVisualParallax','SolidTop','DEFAULT_WATER_REFLECTION_TERRAINTAGS','_displayY','Spriteset_Map_createCharacters','ParallaxFadeOpacity','remove','Game_Event_setupPageSettings','_colorFilter','events','createParallax','noReflections','list','clone','_noReflection','parameters','MaskTerrainTags','getSolidReflectionTop','getVisualParallaxOy','_blurFilter','scrollDown','18320250dsNJdt','WaterAmplitude','map','registerReflectionSettings','opacityDuration','WaterBoundary','Game_Map_setDisplayPos','_parallaxY','checkVisualParallaxesStringTags','filename','_baseSprite','BlurFilter','createSolidReflectionLayer','initialize','registerCommand','width','ARRAYJSON','addLoadListener','createNewParallaxLayer','NORMAL','_mask','_maskSprite','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','4NKmLSs','return\x200','_parallaxLoopY','WaterRegions','TerrainTags','makeDeepCopy','equals','HueShift','updateVisualParallaxSettings','7qXVzmV','match','SolidTerrainTags','updateWaterReflections','_solidReflectAdded','_hasWaterReflections','updateParallax','DEFAULT_WATER_REFLECTION_REGIONS','ADDITIVE','WaveStart','setupVisualParallaxesCommentTags','_hasSolidReflections','updateOpacity','_hue','move','824152ninazx','_visualParallaxSettings','createReflectionMask','DEFAULT_SOLID_REFLECTION_REGIONS','tileWidth','getWaterReflectionRegions','scrollRight','WaterBottom','setupPageSettings','WaterReflect','SolidBottom','bitmap','getWaterReflectionBlur','push','toUpperCase','WaterTop','isSceneMap','hueShift','_parallaxX','Tone','clearPageSettings','removeChild','status','bind','colorTone','scrollUp','version','scrollLeft','getVisualParallaxes','MULTIPLY','_parallaxDataRef','getWaterReflectionWavelength','setupVisualParallaxes','scale','ParallaxAddChangeSettings','screenTileX','EVAL','createCharacters','_parallaxSx','ScrollLock','floor','constructor','exit','event','Spriteset_Map_createParallax','DEFAULT_WATER_REFLECTION_FILTER_AMPLITUDE','hasWaterReflections','filter','DEFAULT_SOLID_REFLECTION_FILTER_TOP','_spriteset','followers','isLoopVertical','AmpStart','updateMask','children','sortVisualParallaxes','createSolidReflectionMask','trim','hasSolidReflections','DEFAULT_SOLID_REFLECTION_FILTER_BLUR','name','Hue','NUM','terrainTag','prototype','>>>ATTENTION<<<','_waterReflectAdded','updateVisualParallaxLayer','setColorTone','addChild','createWaterReflectionMask','displayX','VisualParallaxes','STR','getWaterReflectionBoundary','targetOpacity','DEFAULT_SOLID_REFLECTION_TERRAINTAGS','isLoopHorizontal','_updateColorFilter','DEFAULT_WATER_REFLECTION_FILTER_BOUNDARY','clamp','indexOf','createWaterReflectionLayer'];_0x2db5=function(){return _0x22b840;};return _0x2db5();}Sprite_VisualParallax['prototype']=Object[_0x1bad22(0x237)](TilingSprite[_0x1bad22(0x2c2)]),Sprite_VisualParallax[_0x1bad22(0x2c2)]['constructor']=Sprite_VisualParallax,Sprite_VisualParallax['prototype'][_0x1bad22(0x260)]=function(_0x387ad1){const _0x43941b=_0x1bad22;this[_0x43941b(0x1ff)]=_0x387ad1,TilingSprite[_0x43941b(0x2c2)]['initialize'][_0x43941b(0x2da)](this),this['_createColorFilter'](),this[_0x43941b(0x2ee)](),this['bitmap']['addLoadListener'](this[_0x43941b(0x22f)][_0x43941b(0x299)](this));},Sprite_VisualParallax[_0x1bad22(0x2c2)][_0x1bad22(0x2e6)]=function(){const _0x5966fc=_0x1bad22;return $gameMap['getVisualParallaxSettings'](this[_0x5966fc(0x1ff)]);},Sprite_VisualParallax['prototype']['_createColorFilter']=function(){const _0x115908=_0x1bad22;this['_hue']=0x0,this[_0x115908(0x221)]=[0x0,0x0,0x0,0x0],this[_0x115908(0x246)]=new ColorFilter(),!this[_0x115908(0x207)]&&(this['filters']=[]),this[_0x115908(0x207)][_0x115908(0x28f)](this[_0x115908(0x246)]);},Sprite_VisualParallax[_0x1bad22(0x2c2)]['_updateColorFilter']=function(){const _0x2fcf0f=_0x1bad22;!this['_colorFilter']&&this['_createColorFilter'](),this[_0x2fcf0f(0x246)][_0x2fcf0f(0x231)](this[_0x2fcf0f(0x280)]),this[_0x2fcf0f(0x246)]['setColorTone'](this[_0x2fcf0f(0x221)]);},Sprite_VisualParallax['prototype'][_0x1bad22(0x2ee)]=function(){const _0x4f8fba=_0x1bad22;this[_0x4f8fba(0x227)]=this[_0x4f8fba(0x2e6)]()[_0x4f8fba(0x25c)],this[_0x4f8fba(0x28d)]=ImageManager['loadParallax'](this['_parallaxName']);},Sprite_VisualParallax[_0x1bad22(0x2c2)][_0x1bad22(0x22f)]=function(){const _0x45e169=_0x1bad22;this[_0x45e169(0x268)]=new Sprite(),this[_0x45e169(0x2d6)]();},Sprite_VisualParallax['prototype'][_0x1bad22(0x2d6)]=function(){const _0x18c8ef=_0x1bad22;this[_0x18c8ef(0x268)]['bitmap']&&(this['_maskSprite'][_0x18c8ef(0x28d)][_0x18c8ef(0x212)](),this['removeChild'](this['_maskSprite']));this[_0x18c8ef(0x20e)]=undefined;const _0x568617=this[_0x18c8ef(0x2e6)]()[_0x18c8ef(0x234)],_0x1ed662=this[_0x18c8ef(0x2e6)]()[_0x18c8ef(0x1ef)];if(_0x568617[_0x18c8ef(0x239)]<=0x0&&_0x1ed662[_0x18c8ef(0x239)]<=0x0)return;if($gameMap[_0x18c8ef(0x2cf)]()||$gameMap['isLoopVertical']())return;const _0x437536=$gameMap[_0x18c8ef(0x262)](),_0x721b96=$gameMap[_0x18c8ef(0x235)](),_0x1c0d2b=$gameMap[_0x18c8ef(0x286)](),_0x3b481a=$gameMap[_0x18c8ef(0x1f1)]();this[_0x18c8ef(0x268)][_0x18c8ef(0x28d)]=new Bitmap(_0x437536*_0x1c0d2b,_0x721b96*_0x3b481a);for(let _0x1211d5=0x0;_0x1211d5<_0x437536;_0x1211d5++){for(let _0x3dd8df=0x0;_0x3dd8df<_0x721b96;_0x3dd8df++){(_0x568617[_0x18c8ef(0x1fe)]($gameMap[_0x18c8ef(0x2e1)](_0x1211d5,_0x3dd8df))||_0x1ed662[_0x18c8ef(0x1fe)]($gameMap['terrainTag'](_0x1211d5,_0x3dd8df)))&&this[_0x18c8ef(0x268)][_0x18c8ef(0x28d)]['fillRect'](_0x1211d5*_0x1c0d2b,_0x3dd8df*_0x3b481a,_0x1c0d2b,_0x3b481a,'#ffffff');}}this[_0x18c8ef(0x20e)]=this['_maskSprite'],this['addChild'](this[_0x18c8ef(0x268)]);},Sprite_VisualParallax[_0x1bad22(0x2c2)][_0x1bad22(0x1f3)]=function(){const _0x372341=_0x1bad22;TilingSprite[_0x372341(0x2c2)][_0x372341(0x1f3)][_0x372341(0x2da)](this);if(!this['bitmap'])return;this[_0x372341(0x27f)](),this[_0x372341(0x1fd)](),this[_0x372341(0x20c)](),this[_0x372341(0x1f8)](),this['updateTone'](),this[_0x372341(0x2b7)]();},Sprite_VisualParallax['prototype'][_0x1bad22(0x27f)]=function(){const _0x16b829=_0x1bad22;this['opacity']=this['settings']()[_0x16b829(0x2e4)];},Sprite_VisualParallax[_0x1bad22(0x2c2)][_0x1bad22(0x1fd)]=function(){const _0x1366ef=_0x1bad22;this[_0x1366ef(0x1fa)]['x']=$gameMap['getVisualParallaxOx'](this['_id']),this[_0x1366ef(0x1fa)]['y']=$gameMap[_0x1366ef(0x250)](this[_0x1366ef(0x1ff)]);},Sprite_VisualParallax[_0x1bad22(0x2c2)][_0x1bad22(0x20c)]=function(){const _0x2f1872=_0x1bad22;this[_0x2f1872(0x23b)]=this[_0x2f1872(0x2e6)]()['blendMode'];},Sprite_VisualParallax['prototype']['updateHue']=function(){const _0x1ed30f=_0x1bad22;this['setHue'](this[_0x1ed30f(0x2e6)]()['hue']);},Sprite_VisualParallax[_0x1bad22(0x2c2)][_0x1bad22(0x231)]=function(_0x1f2d1e){const _0xc80c78=_0x1bad22;this[_0xc80c78(0x280)]!==Number(_0x1f2d1e)&&(this[_0xc80c78(0x280)]=Number(_0x1f2d1e),this[_0xc80c78(0x2d0)]());},Sprite_VisualParallax[_0x1bad22(0x2c2)]['updateTone']=function(){const _0x262dec=_0x1bad22;this[_0x262dec(0x2c6)](this[_0x262dec(0x2e6)]()[_0x262dec(0x29a)]);},Sprite_VisualParallax[_0x1bad22(0x2c2)][_0x1bad22(0x2c6)]=function(_0x510909){const _0x1068e9=_0x1bad22;if(!(_0x510909 instanceof Array))throw new Error('Argument\x20must\x20be\x20an\x20array');!this[_0x1068e9(0x221)][_0x1068e9(0x270)](_0x510909)&&(this[_0x1068e9(0x221)]=_0x510909[_0x1068e9(0x24b)](),this[_0x1068e9(0x2d0)]());},Sprite_VisualParallax[_0x1bad22(0x2c2)][_0x1bad22(0x2b7)]=function(){const _0x41d826=_0x1bad22;if(!this['mask'])return;this[_0x41d826(0x268)]['x']=Math['floor'](-$gameMap[_0x41d826(0x2c9)]()*$gameMap[_0x41d826(0x286)]()),this[_0x41d826(0x268)]['y']=Math['floor'](-$gameMap[_0x41d826(0x2f3)]()*$gameMap[_0x41d826(0x1f1)]());};function Sprite_ReflectionCharacter(){const _0xdceb35=_0x1bad22;this[_0xdceb35(0x260)](...arguments);}Sprite_ReflectionCharacter['prototype']=Object[_0x1bad22(0x237)](Sprite_Character[_0x1bad22(0x2c2)]),Sprite_ReflectionCharacter['prototype']['constructor']=Sprite_ReflectionCharacter,Sprite_ReflectionCharacter[_0x1bad22(0x2c2)][_0x1bad22(0x225)]=function(_0x219225){},Sprite_ReflectionCharacter[_0x1bad22(0x2c2)]['update']=function(){const _0x234575=_0x1bad22;Sprite_Character[_0x234575(0x2c2)][_0x234575(0x1f3)][_0x234575(0x2da)](this);},VisuMZ[_0x1bad22(0x2ca)]['Spriteset_Map_createParallax']=Spriteset_Map[_0x1bad22(0x2c2)][_0x1bad22(0x248)],Spriteset_Map[_0x1bad22(0x2c2)][_0x1bad22(0x248)]=function(){const _0x5a93ce=_0x1bad22;VisuMZ[_0x5a93ce(0x2ca)][_0x5a93ce(0x2ae)]['call'](this);if(!$gameMap[_0x5a93ce(0x2e9)]())this[_0x5a93ce(0x2d4)]();if(!$gameMap[_0x5a93ce(0x2f5)]())this[_0x5a93ce(0x25f)]();this[_0x5a93ce(0x21b)](),this[_0x5a93ce(0x1f4)](),this[_0x5a93ce(0x2b9)]();if($gameMap[_0x5a93ce(0x2e9)]())this[_0x5a93ce(0x2d4)]();if($gameMap[_0x5a93ce(0x2f5)]())this[_0x5a93ce(0x25f)]();},Spriteset_Map['prototype'][_0x1bad22(0x2d4)]=function(){const _0x3c6299=_0x1bad22;if(!PIXI['filters'])return;if($gameMap[_0x3c6299(0x2cf)]()||$gameMap['isLoopVertical']())return;if($gameMap[_0x3c6299(0x249)]())return;this[_0x3c6299(0x1fc)]=new Sprite(),this[_0x3c6299(0x214)]=new Sprite(),this[_0x3c6299(0x2c4)]=![],this[_0x3c6299(0x25d)][_0x3c6299(0x2c7)](this['_waterReflectLayer']),this['_waterReflectLayer'][_0x3c6299(0x207)]=[],this[_0x3c6299(0x1fc)]['opacity']=$gameMap[_0x3c6299(0x1ee)](),!!PIXI[_0x3c6299(0x207)][_0x3c6299(0x229)]&&(this['_waterReflectLayer'][_0x3c6299(0x1ed)]=new PIXI[(_0x3c6299(0x207))][(_0x3c6299(0x229))]({'boundary':$gameMap[_0x3c6299(0x2cc)](),'amplitude':$gameMap[_0x3c6299(0x23d)](),'waveLength':$gameMap[_0x3c6299(0x2a1)](),'mirror':![]})),!!PIXI['filters'][_0x3c6299(0x25e)]&&(this[_0x3c6299(0x1fc)]['_blurFilter']=new PIXI[(_0x3c6299(0x207))][(_0x3c6299(0x25e))]($gameMap['getWaterReflectionBlur']()),this[_0x3c6299(0x1fc)][_0x3c6299(0x207)][_0x3c6299(0x28f)](this[_0x3c6299(0x1fc)][_0x3c6299(0x251)])),this[_0x3c6299(0x2c8)]();},Spriteset_Map[_0x1bad22(0x2c2)]['createWaterReflectionMask']=function(){const _0x2e1da6=_0x1bad22,_0x22a02e=$gameMap[_0x2e1da6(0x287)](),_0x18b4f5=$gameMap['getWaterReflectionTerrainTags'](),_0x4389d3=this[_0x2e1da6(0x284)](_0x22a02e,_0x18b4f5);_0x4389d3&&(this[_0x2e1da6(0x2c7)](_0x4389d3),this[_0x2e1da6(0x1fc)]['mask']=_0x4389d3);},Spriteset_Map[_0x1bad22(0x2c2)]['createSolidReflectionLayer']=function(){const _0x33ba22=_0x1bad22;if(!PIXI[_0x33ba22(0x207)])return;if($gameMap['isLoopHorizontal']()||$gameMap['isLoopVertical']())return;if($gameMap[_0x33ba22(0x249)]())return;this[_0x33ba22(0x236)]=new Sprite(),this[_0x33ba22(0x2ec)]=new Sprite(),this['_solidReflectAdded']=![],this[_0x33ba22(0x25d)][_0x33ba22(0x2c7)](this['_solidReflectLayer']),this[_0x33ba22(0x236)][_0x33ba22(0x207)]=[],this[_0x33ba22(0x236)]['opacity']=$gameMap['getSolidReflectionOpacity'](),!!PIXI[_0x33ba22(0x207)][_0x33ba22(0x25e)]&&(this[_0x33ba22(0x236)][_0x33ba22(0x251)]=new PIXI['filters'][(_0x33ba22(0x25e))]($gameMap[_0x33ba22(0x2f4)]()),this[_0x33ba22(0x236)][_0x33ba22(0x207)]['push'](this[_0x33ba22(0x236)][_0x33ba22(0x251)])),this['createSolidReflectionMask']();},Spriteset_Map[_0x1bad22(0x2c2)][_0x1bad22(0x2ba)]=function(){const _0x5f479d=_0x1bad22,_0x3bebae=$gameMap['getSolidReflectionRegions'](),_0x4838c5=$gameMap[_0x5f479d(0x2df)](),_0x35adfc=this[_0x5f479d(0x284)](_0x3bebae,_0x4838c5);_0x35adfc&&(this[_0x5f479d(0x2c7)](_0x35adfc),this[_0x5f479d(0x236)][_0x5f479d(0x20e)]=_0x35adfc);},Spriteset_Map[_0x1bad22(0x2c2)]['createReflectionMask']=function(_0x58c879,_0x52abc4){const _0x6cfb4d=_0x1bad22;if(_0x58c879[_0x6cfb4d(0x239)]<=0x0&&_0x52abc4[_0x6cfb4d(0x239)]<=0x0)return null;const _0x2bfae9=$gameMap['width'](),_0x86fcd3=$gameMap[_0x6cfb4d(0x235)](),_0x43bb2b=$gameMap[_0x6cfb4d(0x286)](),_0x5e1a37=$gameMap['tileHeight'](),_0x3086fb=0x0,_0x344d2e=_0x3086fb*0x2,_0xcf7d83=new Sprite();_0xcf7d83[_0x6cfb4d(0x28d)]=new Bitmap(_0x2bfae9*_0x43bb2b,_0x86fcd3*_0x5e1a37);for(let _0x6fb936=0x0;_0x6fb936<_0x2bfae9;_0x6fb936++){for(let _0x1b84c7=0x0;_0x1b84c7<_0x86fcd3;_0x1b84c7++){(_0x58c879[_0x6cfb4d(0x1fe)]($gameMap['regionId'](_0x6fb936,_0x1b84c7))||_0x52abc4[_0x6cfb4d(0x1fe)]($gameMap[_0x6cfb4d(0x2c1)](_0x6fb936,_0x1b84c7)))&&_0xcf7d83[_0x6cfb4d(0x28d)]['fillRect'](_0x6fb936*_0x43bb2b+_0x3086fb,_0x1b84c7*_0x5e1a37+_0x3086fb,_0x43bb2b-_0x344d2e,_0x5e1a37-_0x344d2e,'#ffffff');}}return _0xcf7d83;},VisuMZ[_0x1bad22(0x2ca)][_0x1bad22(0x242)]=Spriteset_Map[_0x1bad22(0x2c2)][_0x1bad22(0x2a7)],Spriteset_Map['prototype'][_0x1bad22(0x2a7)]=function(){const _0x153c15=_0x1bad22;VisuMZ[_0x153c15(0x2ca)]['Spriteset_Map_createCharacters'][_0x153c15(0x2da)](this),this['createCharacterReflections']();},Spriteset_Map['prototype']['createCharacterReflections']=function(){const _0x4a2ef5=_0x1bad22;if($gameMap[_0x4a2ef5(0x249)]())return;const _0x431d21=[],_0x5a02d3=[];for(const _0x5a76b9 of $gameMap[_0x4a2ef5(0x247)]()){if(_0x5a76b9[_0x4a2ef5(0x24c)])continue;_0x431d21[_0x4a2ef5(0x28f)](new Sprite_ReflectionCharacter(_0x5a76b9)),_0x5a02d3[_0x4a2ef5(0x28f)](new Sprite_ReflectionCharacter(_0x5a76b9));}for(const _0x110c69 of $gameMap[_0x4a2ef5(0x2dc)]()){_0x431d21['push'](new Sprite_ReflectionCharacter(_0x110c69)),_0x5a02d3[_0x4a2ef5(0x28f)](new Sprite_ReflectionCharacter(_0x110c69));}for(const _0x2ff1fb of $gamePlayer[_0x4a2ef5(0x2b4)]()[_0x4a2ef5(0x2d7)]()){_0x431d21[_0x4a2ef5(0x28f)](new Sprite_ReflectionCharacter(_0x2ff1fb)),_0x5a02d3['push'](new Sprite_ReflectionCharacter(_0x2ff1fb));}_0x431d21[_0x4a2ef5(0x28f)](new Sprite_ReflectionCharacter($gamePlayer)),_0x5a02d3[_0x4a2ef5(0x28f)](new Sprite_ReflectionCharacter($gamePlayer));if(this[_0x4a2ef5(0x1fc)])for(const _0x156eb6 of _0x431d21){_0x156eb6['_reflection']=!![],this[_0x4a2ef5(0x214)][_0x4a2ef5(0x2c7)](_0x156eb6),_0x156eb6[_0x4a2ef5(0x2a3)]['y']=-0.85,_0x156eb6['filters']=_0x156eb6[_0x4a2ef5(0x207)]||[],this['_waterReflectLayer']['_reflectFilter']&&_0x156eb6[_0x4a2ef5(0x207)][_0x4a2ef5(0x28f)](this[_0x4a2ef5(0x1fc)]['_reflectFilter']);}if(this[_0x4a2ef5(0x236)])for(const _0x59cd6a of _0x5a02d3){_0x59cd6a[_0x4a2ef5(0x21d)]=!![],this[_0x4a2ef5(0x2ec)][_0x4a2ef5(0x2c7)](_0x59cd6a),_0x59cd6a['scale']['y']=-0.85;}},VisuMZ[_0x1bad22(0x2ca)]['Spriteset_Map_update']=Spriteset_Map[_0x1bad22(0x2c2)][_0x1bad22(0x1f3)],Spriteset_Map[_0x1bad22(0x2c2)][_0x1bad22(0x1f3)]=function(){const _0x77fc69=_0x1bad22;VisuMZ[_0x77fc69(0x2ca)][_0x77fc69(0x21f)][_0x77fc69(0x2da)](this),this[_0x77fc69(0x276)](),this[_0x77fc69(0x2fc)]();},Spriteset_Map[_0x1bad22(0x2c2)]['updateWaterReflections']=function(){const _0x39a52f=_0x1bad22;if(!this[_0x39a52f(0x1fc)])return;if($gameMap){if(!this[_0x39a52f(0x2c4)]&&$gameMap[_0x39a52f(0x2b0)]())this[_0x39a52f(0x1fc)]['addChild'](this[_0x39a52f(0x214)]),this[_0x39a52f(0x2c4)]=!![];else this[_0x39a52f(0x2c4)]&&!$gameMap[_0x39a52f(0x2b0)]()&&(this['_waterReflectLayer'][_0x39a52f(0x297)](this[_0x39a52f(0x214)]),this['_waterReflectAdded']=![]);}this[_0x39a52f(0x1fc)]['_reflectFilter']&&(this[_0x39a52f(0x1fc)]['_reflectFilter'][_0x39a52f(0x208)]+=0.05);const _0x3d2e27=this[_0x39a52f(0x1fc)][_0x39a52f(0x267)];_0x3d2e27&&(_0x3d2e27['x']=Math[_0x39a52f(0x2aa)](-$gameMap['displayX']()*$gameMap['tileWidth']()),_0x3d2e27['y']=Math[_0x39a52f(0x2aa)](-$gameMap[_0x39a52f(0x2f3)]()*$gameMap['tileHeight']()));},Spriteset_Map[_0x1bad22(0x2c2)][_0x1bad22(0x2fc)]=function(){const _0x205f30=_0x1bad22;if(!this[_0x205f30(0x236)])return;if($gameMap){if(!this[_0x205f30(0x277)]&&$gameMap[_0x205f30(0x2bc)]())this[_0x205f30(0x236)]['addChild'](this[_0x205f30(0x2ec)]),this[_0x205f30(0x277)]=!![];else this[_0x205f30(0x277)]&&!$gameMap[_0x205f30(0x2bc)]()&&(this[_0x205f30(0x236)]['removeChild'](this[_0x205f30(0x2ec)]),this[_0x205f30(0x277)]=![]);}const _0x176e2a=this['_solidReflectLayer'][_0x205f30(0x267)];_0x176e2a&&(_0x176e2a['x']=Math[_0x205f30(0x2aa)](-$gameMap[_0x205f30(0x2c9)]()*$gameMap[_0x205f30(0x286)]()),_0x176e2a['y']=Math[_0x205f30(0x2aa)](-$gameMap[_0x205f30(0x2f3)]()*$gameMap[_0x205f30(0x1f1)]()));},Spriteset_Map['prototype'][_0x1bad22(0x21b)]=function(){const _0x1081ca=_0x1bad22;this[_0x1081ca(0x22e)]=new Sprite(),this[_0x1081ca(0x25d)][_0x1081ca(0x2c7)](this['_parallaxContainer']),this[_0x1081ca(0x2a0)]=[null];},Spriteset_Map[_0x1bad22(0x2c2)][_0x1bad22(0x1f4)]=function(){const _0x5e2297=_0x1bad22,_0x4c9ae4=$gameMap[_0x5e2297(0x29e)]();for(const _0x31c37e of _0x4c9ae4){if(!_0x31c37e)continue;this[_0x5e2297(0x265)](_0x31c37e);}},Spriteset_Map[_0x1bad22(0x2c2)][_0x1bad22(0x265)]=function(_0x3b01ed){const _0x459545=_0x1bad22;if(!_0x3b01ed)return;const _0x105cf2=new Sprite_VisualParallax(_0x3b01ed['id']);_0x105cf2[_0x459545(0x281)](0x0,0x0,Graphics[_0x459545(0x262)],Graphics[_0x459545(0x235)]),this['_parallaxContainer'][_0x459545(0x2c7)](_0x105cf2);},Spriteset_Map[_0x1bad22(0x2c2)][_0x1bad22(0x2b9)]=function(){const _0x450888=_0x1bad22;this[_0x450888(0x22e)][_0x450888(0x2b8)][_0x450888(0x2fa)]((_0x57d2ed,_0x215870)=>_0x57d2ed['_id']-_0x215870['_id']);},Spriteset_Map[_0x1bad22(0x2c2)][_0x1bad22(0x211)]=function(_0x56a9e8){const _0x39b870=_0x1bad22;return this[_0x39b870(0x22e)][_0x39b870(0x2b8)]['find'](_0x3eafc9=>_0x3eafc9['_id']===_0x56a9e8);},Spriteset_Map[_0x1bad22(0x2c2)][_0x1bad22(0x213)]=function(_0x3341d7){const _0x1c946f=_0x1bad22,_0x503b4e=this[_0x1c946f(0x211)](_0x3341d7);_0x503b4e&&this[_0x1c946f(0x22e)]['removeChild'](_0x503b4e);},Spriteset_Map[_0x1bad22(0x2c2)][_0x1bad22(0x2c5)]=function(_0xb84858,_0x51e119){const _0x44e603=_0x1bad22,_0x1196b3=this[_0x44e603(0x211)](_0xb84858);!_0x1196b3?(this['createNewParallaxLayer']($gameMap[_0x44e603(0x22a)](_0xb84858)),this[_0x44e603(0x2b9)]()):(_0x1196b3[_0x44e603(0x2ee)](),_0x51e119&&_0x1196b3[_0x44e603(0x28d)][_0x44e603(0x264)](_0x1196b3['createMaskBitmap'][_0x44e603(0x299)](_0x1196b3)));};