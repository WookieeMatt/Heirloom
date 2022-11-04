//=============================================================================
// VisuStella MZ - Movement Effects
// VisuMZ_2_MovementEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_MovementEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MovementEffects = VisuMZ.MovementEffects || {};
VisuMZ.MovementEffects.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.08] [MovementEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Movement_Effects_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_EventsMoveCore
 * @orderAfter VisuMZ_1_EventsMoveCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Movement in RPG Maker MZ can be kind of dull. There's next to no way of
 * interacting with the map. This plugin adds various means of doing so to add
 * more life to the environment. Dust Clouds can kick up when running around.
 * Footprints can be left in the sand. Footsteps can be heard making different
 * sounds based on the flooring. Added movement abilities like Smart Blink,
 * Smart Jump, and Smart Rush allow players more fun traversal options. And to
 * top it off, a smooth scrolling camera will ease in the screen to focus on
 * the player character instead of being locked-on firmly. Motion blurs and
 * motion trails are also made available to further emphasize movement.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Dust Clouds can kick up off the ground whenever characters run, giving the
 *   player a better understanding of what's going on.
 * * Dust Clouds can be customized, using images or generated with different
 *   colors. These settings can be altered mid-game as well.
 * * Footprints can appear when stepping over specific tiles marked by declared
 *   terrain tags or regions. This can be used over imprintable terrain like
 *   dirt, sand, or snow.
 * * Footprints can be modified in how they appear with custom images or with
 *   generated images. These modifications will be based on the sprite sheet
 *   frame used to generate them for accuracy.
 * * Footstep sounds can be added to give player feedback whenever the player
 *   character or events move on the screen.
 * * Apply different footstep sounds to different tiles on the map marked by
 *   either regions or terrain tags.
 * * Footsteps coming from events can have a distance factor applied to them,
 *   making them sound softer the further away they are and playing on specific
 *   sides of a stereo speaker.
 * * Motion Blur effects can be used to create more impactful scenes. Apply
 *   them to any character on the map screen be it the player character,
 *   followers, or events via Plugin Command!
 * * Motion Trails can added to emphasize movement. These are also inherently a
 *   part of the new movement abilities.
 * * Newly added movement abilities that pay attention to the terrain and any
 *   implemented restrictions. These abilities include Smart Blink, Smart Jump,
 *   and Smart Rush.
 * * Directional Movement Speed Modifiers can be adjusted globally to make
 *   characters move faster or slower in certain directions. This can be used
 *   to create an illusion that it's harder to move against the wind in a storm
 *   than with.
 * * Smart Blink is a new movement ability that can be activated via Plugin
 *   Command! The player teleports forward a set distance, ignoring any walls
 *   and/or obstacles in between unless restrictions prohibit the player from
 *   doing so.
 * * Smart Jump is a new movement ability that can be activated via Plugin
 *   Command! The player jumps forward a distance as long as it does not
 *   interfere with obstacles. It can scale past pits and small gaps in height.
 *   Height maps can also be declared for some verticality on the map.
 * * Smart Rush is a new movement ability that can be activated via Plugin
 *   Command! The player charges forward extremely fast, possibly colliding
 *   with events, and possibly creating new interactions with its switch
 *   toggling nature.
 * * Smooth Camera is an added feature to smoothly adjust the camera as the
 *   player traverses across the game's maps. The scrolling speed goes slower
 *   or faster depending if the player is walking or dashing.
 * * Plugin Commands allow you to adjust Smooth Camera settings midway through
 *   the game.
 * * Map notetags can forcefully enable or disable Smooth Camera.
 * * Players that find certain effects added through this plugin annoying (such
 *   as footprints, footsteps, smooth camera, etc) can have them turned off via
 *   the Options menu.
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
 * * VisuMZ_1_EventsMoveCore
 * * Pixi JS Filters*
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
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
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * === Dust Cloud-Related Notetags ===
 * 
 * ---
 * 
 * <Force Dust Cloud>
 * 
 * - Used for: Map Notetags
 * - Forces Dust Clouds to be kicked up whenever characters are dashing
 *   regardless of whatever settings are found in the Plugin Parameters for
 *   this particular map.
 * - Plugin Command changes won't bypass this notetag either.
 * - However, if the player turns off Dust Clouds in the options menu, then
 *   this setting will be turned off.
 * 
 * ---
 *
 * <No Dust Cloud>
 *
 * - Used for: Map Notetags
 * - This disables Dust Clouds from being kicked up whenever characters are
 *   dashing regardless of whatever settings are found in the Plugin Parameters
 *   for this particular map.
 * - Plugin Command changes won't bypass this notetag either.
 *
 * ---
 * 
 * === Footprints-Related Notetags ===
 * 
 * ---
 * 
 * <Footprint Region: x>
 * <Footprint Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - This declares which regions will have visible footprints when characters
 *   walk over those areas.
 * - Replace 'x' with a number (0 to 255) representing the region used to mark
 *   tiles that can have footprints.
 * - Insert multiple 'x' values to add multiple regions.
 * - If this notetag is used, ignore the default settings found in the
 *   Plugin Parameters.
 * 
 * ---
 * 
 * <No Footprint Region: x>
 * <No Footprint Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - This declares which regions CANNOT have footprints when characters walk
 *   over those areas.
 * - This is primarily used to offset the default settings found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number (0 to 255) representing the region used to mark
 *   tiles that CANNOT have footprints.
 * - Insert multiple 'x' values to add multiple regions.
 * 
 * ---
 * 
 * <Region x Footprint Opacity: y>
 * 
 * - Used for: Map Notetags
 * - This changes the opacity of the footprints that spawn in region 'x' to
 *   have an opacity value of 'y' instead of the default settings found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number (0 to 255) to indicate which region is being
 *   modified.
 * - Replace 'y' with a number (0 to 255) to represent the starting opacity
 *   value of the footprints made in that region.
 * 
 * ---
 * 
 * <Region x Footprint Duration: y>
 * 
 * - Used for: Map Notetags
 * - This changes the duration of the footprints that spawn in region 'x' to
 *   have a duration time of 'y' instead of the default settings found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number (0 to 255) to indicate which region is being
 *   modified.
 * - Replace 'y' with a number in frames to represent the starting duration
 *   time of the footprints made in that region.
 * 
 * ---
 * 
 * <Footprint Terrain Tag: x>
 * <Footprint Terrain Tags: x, x, x>
 * 
 * - Used for: Map Notetags
 * - This declares which terrain tag marked tiles will have visible footprints
 *   when characters walk over those areas.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag used to
 *   mark tiles that can have footprints.
 * - Insert multiple 'x' values to add multiple terrain tags.
 * - If this notetag is used, ignore the default settings found in the
 *   Plugin Parameters.
 * 
 * ---
 * 
 * <No Footprint Terrain Tag: x>
 * <No Footprint Terrain Tags: x, x, x>
 * 
 * - Used for: Map Notetags
 * - This declares which terrain tag marked tiles CANNOT have footprints when
 *   characters walk over those areas.
 * - This is primarily used to offset the default settings found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag used to
 *   mark tiles that CANNOT have footprints.
 * - Insert multiple 'x' values to add multiple terrain tags.
 * 
 * ---
 * 
 * <Terrain Tag x Footprint Opacity: y>
 * 
 * - Used for: Map Notetags
 * - This changes the opacity of the footprints that spawn in tiles with
 *   terrain tag 'x' to have an opacity value of 'y' instead of the default
 *   settings found in the Plugin Parameters.
 * - Replace 'x' with a number (0 to 7) to indicate which terrain tag is being
 *   modified.
 * - Replace 'y' with a number (0 to 255) to represent the starting opacity
 *   value of the footprints made in that tile.
 * 
 * ---
 * 
 * <Terrain Tag x Footprint Duration: y>
 * 
 * - Used for: Map Notetags
 * - This changes the duration of the footprints that spawn in tiles with
 *   terrain tag 'x' to have a duration time of 'y' instead of the default
 *   settings found in the Plugin Parameters.
 * - Replace 'x' with a number (0 to 7) to indicate which terrain tag is being
 *   modified.
 * - Replace 'y' with a number in frames to represent the starting duration
 *   time of the footprints made in that tile.
 * 
 * ---
 * 
 * <Disable Footprints>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - Prevents the character from being able to leave behind footprints.
 * 
 * ---
 * 
 * <Footprint d Pattern p Filename: filename>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - Allows you to set a specific image to be used in place of a generated
 *   footprint for 'd' direction 'p' pattern.
 * - Using this will bypass any settings made for generated footprints.
 * - Replace 'd' with text representing the direction the setting is for. Use
 *   any of the directions below:
 *   - down, left, right, up
 *   - lower left, lower right, upper left, upper right
 * - Replace 'p' with a number representing the pattern index. Patterns are
 *   the individual frames used in the sprite when walking.
 *   - By default, RPG Maker MZ sprites have the following patterns:
 *   - Left frame is pattern 0.
 *   - Center frame is pattern 1.
 *   - Right frame is pattern 2.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - Examples:
 *   - <Footprint Down Pattern 0 Filename: FootprintDownA>
 *   - <Footprint Left Pattern 2 Filename: FootprintLeftB>
 *   - <Footprint Right Pattern 0 Filename: FootprintRightA>
 * 
 * ---
 * 
 * <Footprint d Pattern p Width: x>
 * <Footprint d Pattern p Height: y>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - For non-image generated footprints, these notetags let you set the width
 *   and/or height of the footprint for 'd' direction and 'p' pattern.
 * - Replace 'd' with text representing the direction the setting is for. Use
 *   any of the directions below:
 *   - down, left, right, up
 *   - lower left, lower right, upper left, upper right
 * - Replace 'p' with a number representing the pattern index. Patterns are
 *   the individual frames used in the sprite when walking.
 *   - By default, RPG Maker MZ sprites have the following patterns:
 *   - Left frame is pattern 0.
 *   - Center frame is pattern 1.
 *   - Right frame is pattern 2.
 * - Replace 'x' with a number representing the width of footprint in pixels.
 * - Replace 'y' with a number representing the height of footprint in pixels.
 * - Examples:
 *   - <Footprint Down Pattern 0 Width: 6>
 *   - <Footprint Left Pattern 2 Height: 4>
 * 
 * ---
 * 
 * <Footprint d Pattern p Offset: +x, +x>
 * <Footprint d Pattern p Offset: -x, -x>
 * <Footprint d Pattern p Offset: +x, -x>
 * <Footprint d Pattern p Offset: -x, +x>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - For non-image generated footprints, these notetags let you set the offsets
 *   X and Y of the footprint for 'd' direction and 'p' pattern.
 * - Replace 'd' with text representing the direction the setting is for. Use
 *   any of the directions below:
 *   - down, left, right, up
 *   - lower left, lower right, upper left, upper right
 * - Replace 'p' with a number representing the pattern index. Patterns are
 *   the individual frames used in the sprite when walking.
 *   - By default, RPG Maker MZ sprites have the following patterns:
 *   - Left frame is pattern 0.
 *   - Center frame is pattern 1.
 *   - Right frame is pattern 2.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the footprint's x and y coordinates by.
 * - Examples:
 *   - <Footprint Up Pattern 0 Width: +4, +2>
 *   - <Footprint Right Pattern 2 Height: -6, -4>
 * 
 * ---
 * 
 * === Footsteps-Related Notetags ===
 * 
 * ---
 * 
 * <Force Footsteps>
 *
 * - Used for: Map Notetags
 * - Forces footstep sounds to be played whenever characters are walking on the
 *   screen, regardless of the settings found in the Plugin Parameters for the
 *   particular map.
 * - Plugin Command changes won't bypass this notetag either.
 * - However, if the player turns off Footstep Sounds in the options menu, then
 *   this setting will be turned off.
 * 
 * ---
 * 
 * <No Footsteps>
 *
 * - Used for: Map Notetags
 * - Prevents footstep sounds from being played whenever characters are walking
 *   on the screen, regardless of the settings found in the Plugin Parameters
 *   for the particular map.
 * - Plugin Command changes won't bypass this notetag either.
 * 
 * ---
 * 
 * <Region x Footstep Sound: filename>
 * <Region x Footstep Sound: filename, volume>
 * <Region x Footstep Sound: filename, volume, pitch>
 * <Region x Footstep Sound: filename, volume, pitch, pan>
 * 
 * - Used for: Map Notetags
 * - Causes a different sound effect to be played in place of the default
 *   footstep sound if a character walks on a map tile marked by region 'x'.
 * - Replace 'x' with a number (0-255) representing the region.
 * - Replace 'volume' with a number (0 to 100) representing the volume.
 * - Replace 'pitch' with a number (50 to 150) representing the pitch.
 * - Replace 'pan' with a number (-100 to 100) representing the pan.
 * - If 'volume', 'pitch', or 'pan' aren't present, then the values used for
 *   them will be based off the default settings in the Plugin Parameters.
 * - This will take priority over any terrain tags with unique footstep sounds.
 * 
 * ---
 * 
 * <No Region x Footsteps>
 * 
 * - Used for: Map Notetags
 * - No sound effects will be played when a character walks over a map tile
 *   marked by region 'x'.
 * - Replace 'x' with a number (0-255) representing the region.
 * 
 * ---
 * 
 * <Terrain Tag x Footsteps: filename>
 * <Terrain Tag x Footsteps: filename, volume>
 * <Terrain Tag x Footsteps: filename, volume, pitch>
 * <Terrain Tag x Footsteps: filename, volume, pitch, pan>
 * 
 * - Used for: Tileset Notetags
 * - Causes a different sound effect to be played in place of the default
 *   footstep sound if a character walks on a map tile with terrain tag 'x'.
 * - Replace 'x' with a number (0-7) representing the terrain tag.
 * - Replace 'volume' with a number (0 to 100) representing the volume.
 * - Replace 'pitch' with a number (50 to 150) representing the pitch.
 * - Replace 'pan' with a number (-100 to 100) representing the pan.
 * - If 'volume', 'pitch', or 'pan' aren't present, then the values used for
 *   them will be based off the default settings in the Plugin Parameters.
 * - This will have LESS priority than any regions with unique footstep sounds.
 * 
 * ---
 * 
 * <No Terrain Tag x Footsteps>
 * 
 * - Used for: Tileset Notetags
 * - No sound effects will be played when a character walks over a map tile
 *   marked by terrain tag 'x'.
 * - Replace 'x' with a number (0-7) representing the terrain tag.
 * 
 * ---
 * 
 * <Enable Footsteps>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - If actor or event footstep sounds are normally disabled, this will enable
 *   them when moving.
 * - Footstep sounds coming from actors will be given priority to the party
 *   leader first before anyone else.
 * 
 * ---
 * 
 * <Disable Footsteps>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - If actor or event footstep sounds are normally enabled, this will disable
 *   them when moving.
 * 
 * ---
 * 
 * <Footsteps Volume: x%>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - Changes the volume for any footstep sounds made by this actor/event.
 * - Replace 'x' with a number (0 to 100) representing the percentile modifier,
 *   a multiplicative rate from the usual footstep volume.
 * 
 * ---
 * 
 * <Footsteps Pitch: x%>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - Changes the pitch for any footstep sounds made by this actor/event.
 * - Replace 'x' with a number (0 to 100) representing the percentile modifier,
 *   a multiplicative rate from the usual footstep pitch.
 * 
 * ---
 * 
 * <Footsteps Frame: x>
 * <Footsteps Frames: x, x, x>
 * 
 * - Used for: Actor Notetags, Event Notetags, or Event Page Comment Tags
 * - For those using the "Sound by Frame?" Plugin Parameter, this will cause
 *   the footstep sounds to trigger whenever the sprite changes to the listed
 *   frame(s) in order to match up the sound with the image of the sprite
 *   stepping on the ground.
 * - This will override the setting found in the Plugin Parameters for this
 *   specific actor or event.
 * - Replace 'x' with a number representing the frame. Frames start at 0 and
 *   increase by 1 going left to right.
 * 
 * ---
 * 
 * === Smart Blink-Related Notetags ===
 * 
 * ---
 * 
 * <No Smart Blink>
 * 
 * - Used for: Map Notetags
 * - Prevents Smart Blink from being used at all on this map.
 * 
 * ---
 * 
 * <Smart Blink Non-Land Region: x>
 * <Smart Blink Non-Land Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Use this notetag to mark tiles on the map where Smart Blink cannot land.
 * - This is primarily used for things like rooftops, which if characters can
 *   land on there, can blink onto.
 * - Replace 'x' with a number (0 to 255) representing the region ID used to
 *   mark the non-landable tiles.
 *   - Insert multiple numbers to mark more regions.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific map.
 *   - However, it will not override custom settings found in Smart Blink
 *     Plugin Command.
 *   - The Smart Blink Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Blink Non-Land Terrain Tags: x>
 * <Smart Blink Non-Land Terrain Tags: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - Use this notetag to mark tiles on the map where Smart Blink cannot land.
 * - This is primarily used for things like rooftops, which if characters can
 *   land on there, can blink onto.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag ID used to
 *   mark the non-landable tiles.
 *   - Insert multiple numbers to mark more terrain tags.
 * - This will override the terrain tag settings found in the Plugin Parameters
 *   for this specific map.
 *   - However, it will not override custom settings found in Smart Blink
 *     Plugin Command.
 *   - The Smart Blink Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Blink Non-Pass Region: x>
 * <Smart Blink Non-Pass Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Use this notetag to mark tiles on the map where Smart Blink cannot pass.
 * - This is primarily used for things like barriers, preventing the player
 *   from being able to teleport past it or on it.
 * - Replace 'x' with a number (0 to 255) representing the region ID used to
 *   mark the non-passable tiles.
 *   - Insert multiple numbers to mark more regions.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific map.
 *   - However, it will not override custom settings found in Smart Blink
 *     Plugin Command.
 *   - The Smart Blink Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Blink Non-Pass Terrain Tags: x>
 * <Smart Blink Non-Pass Terrain Tags: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - Use this notetag to mark tiles on the map where Smart Blink cannot land.
 * - This is primarily used for things like barriers, preventing the player
 *   from being able to teleport past it or on it.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag ID used to
 *   mark the non-passable tiles.
 *   - Insert multiple numbers to mark more terrain tags.
 * - This will override the terrain tag settings found in the Plugin Parameters
 *   for this specific map.
 *   - However, it will not override custom settings found in Smart Blink
 *     Plugin Command.
 *   - The Smart Blink Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * === Smart Jump-Related Notetags ===
 * 
 * ---
 * 
 * <No Smart Jump>
 * 
 * - Used for: Map Notetags
 * - Prevents Smart Jump from being used at all on this map.
 * 
 * ---
 * 
 * <Smart Jump Non-Land Region: x>
 * <Smart Jump Non-Land Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Use this notetag to mark tiles on the map where Smart Jump cannot land.
 * - This is primarily used for things like rooftops, which if characters can
 *   land on there, can jump onto.
 * - Replace 'x' with a number (0 to 255) representing the region ID used to
 *   mark the non-landable tiles.
 *   - Insert multiple numbers to mark more regions.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific map.
 *   - However, it will not override custom settings found in Smart Jump
 *     Plugin Command.
 *   - The Smart Jump Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Jump Non-Land Terrain Tags: x>
 * <Smart Jump Non-Land Terrain Tags: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - Use this notetag to mark tiles on the map where Smart Jump cannot land.
 * - This is primarily used for things like rooftops, which if characters can
 *   land on there, can jump onto.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag ID used to
 *   mark the non-landable tiles.
 *   - Insert multiple numbers to mark more terrain tags.
 * - This will override the terrain tag settings found in the Plugin Parameters
 *   for this specific map.
 *   - However, it will not override custom settings found in Smart Jump
 *     Plugin Command.
 *   - The Smart Jump Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Jump Non-Pass Region: x>
 * <Smart Jump Non-Pass Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Use this notetag to mark tiles on the map where Smart Jump cannot pass.
 * - This is primarily used for things like barriers, preventing the player
 *   from being able to leap past it or on it.
 * - Replace 'x' with a number (0 to 255) representing the region ID used to
 *   mark the non-passable tiles.
 *   - Insert multiple numbers to mark more regions.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific map.
 *   - However, it will not override custom settings found in Smart Jump
 *     Plugin Command.
 *   - The Smart Jump Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Jump Non-Pass Terrain Tags: x>
 * <Smart Jump Non-Pass Terrain Tags: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - Use this notetag to mark tiles on the map where Smart Jump cannot land.
 * - This is primarily used for things like barriers, preventing the player
 *   from being able to leap past it or on it.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag ID used to
 *   mark the non-passable tiles.
 *   - Insert multiple numbers to mark more terrain tags.
 * - This will override the terrain tag settings found in the Plugin Parameters
 *   for this specific map.
 *   - However, it will not override custom settings found in Smart Jump
 *     Plugin Command.
 *   - The Smart Jump Plugin Command's restrictions will be added onto these.
 * 
 * ---
 * 
 * <Smart Jump Height-Based Regions: x, x>
 * <Smart Jump Height-Based Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Allows you to assign certain tiles to be marked as a specific height for
 *   Smart Jump to interact with.
 * - Replace 'x' with a number (0 to 255) representing the region ID to use as
 *   a height marker.
 *   - Insert multiple numbers to mark more regions.
 * - Height-Based Region interactions work as follows:
 *   - Players can jump from a height-based region to another height-based
 *     region of the same or lower value as long as that region is listed, too.
 *     - Regions listed: 10, 13, 15.
 *     - ie. The player can jump from Region 15 to 15.
 *     - ie. The player can jump from Region 15 to 13.
 *     - ie. The player can jump from Region 15 to 10.
 *     - ie. The player CANNOT jump from Region 13 to 15.
 *     - ie. The player CANNOT jump from Region 10 to 13.
 *     - ie. The player CANNOT jump from Region 10 to 15.
 *   - The lowest value number in the list is considered a "ledge" and the
 *     lowest possible level.
 *   - Players can jump in and out of the lowest level regions into non-height
 *     marked regions.
 *   - If the player is jumping towards the up, left, right directions, they
 *     cannot jump directly into a "ledge" region unless they are adjacent to
 *     the marked tile. A distance greater than 1 tile apart cannot be and the
 *     jump will be cut short.
 *   - If the player is jumping upward towards a "ledge", the player will jump
 *     directly onto the next available tile.
 *   - If the player is jumping towards the left or right directions into a
 *     "ledge" region, the player will "fall" a tile distance equal to the
 *     difference from the region height they're jumping from.
 *     - Regions listed: 10, 13, 15.
 *     - If the player is on Region 15 and jumps into a ledge (10), the player
 *       will drop 5 tiles downward.
 *     - If the player is on Region 13 and jumps into a ledge (10), the player
 *       will drop 3 tiles downward.
 *   - If the player is jumping downward towards a "ledge", the player will
 *     jump the full distance.
 *   - Examples:
 *     - <Smart Jump Height-Based Regions: 10, 13, 15>
 *       - Region 10 will be considered the "ledge" region.
 * 
 * Keep in mind that despite the fact that there is Height-Based Region support
 * for Smart Jump, maps in RPG Maker MZ are still inherently 2D. Therefore, not
 * everything will look correct for every jump-related scenario involving
 * region heights. You may need to make adjustments to maps that work best for
 * the limited 2D nature of mapping in order to adhere to what Height-Based
 * Region support can handle.
 * 
 * ---
 * 
 * <Smart Jump Non-Land>
 * 
 * - Used for: Event Notetags or Event Page Comment Tags
 * - Prevents the player from being able to land on this event.
 * 
 * ---
 * 
 * <Smart Jump Non-Pass>
 * <Illegal Jump>
 * 
 * - Used for: Event Notetags or Event Page Comment Tags
 * - Prevents the player from being able to leap past this event or on it.
 * 
 * ---
 * 
 * === Smart Rush-Related Notetags ===
 * 
 * ---
 * 
 * <No Smart Rush>
 * 
 * - Used for: Map Notetags
 * - Prevents Smart Rush from being used at all on this map.
 * 
 * ---
 * 
 * <Smart Rush Non-Crash Region: x>
 * <Smart Rush Non-Crash Region: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Prevents a screen shake crash effect when crashing into tiles marked by
 *   'x' region(s) after using a Smart Rush.
 * - This is primarily used for tiles such as water tiles so that it doesn't
 *   look like there's an invisible wall where the player is crashing into.
 * - Replace 'x' with a number (0 to 255) representing the region ID used to
 *   mark the non-crashable tiles.
 *   - Insert multiple numbers to mark more regions.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific map.
 * 
 * ---
 * 
 * <Smart Rush Non-Crash Terrain Tag: x>
 * <Smart Rush Non-Crash Terrain Tag: x, x, x>
 * 
 * - Used for: Tileset Notetags
 * - Prevents a screen shake crash effect when crashing into tiles marked by
 *   'x' terrain tag(s) after using a Smart Rush.
 * - This is primarily used for tiles such as water tiles so that it doesn't
 *   look like there's an invisible wall where the player is crashing into.
 * - Replace 'x' with a number (0 to 7) representing the terrain tag ID used to
 *   mark the non-crashable tiles.
 *   - Insert multiple numbers to mark more terrain tags.
 * - This will override the region settings found in the Plugin Parameters for
 *   this specific tileset.
 * 
 * ---
 * 
 * === Smooth Camera-Related Notetags ===
 * 
 * ---
 *
 * <Force Smooth Camera>
 *
 * - Used for: Map Notetags
 * - This forcefully enables Smooth Camera scrolling regardless of whatever
 *   settings are found in the Plugin Parameters for this particular map.
 * - Plugin Command changes won't bypass this notetag either.
 * - However, if the player turns off Smooth Camera scrolling in the options
 *   menu, then this setting will be turned off.
 *
 * ---
 *
 * <No Smooth Camera>
 *
 * - Used for: Map Notetags
 * - This disables Smooth Camera scrolling regardless of whatever settings are
 *   found in the Plugin Parameters for this particular map.
 * - Plugin Command changes won't bypass this notetag either.
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
 * === Dust Clouds Plugin Commands ===
 * 
 * ---
 * 
 * DUST CLOUDS: Enable/Disable
 * - Enable or Disable the Dust Clouds from spawning when dashing.
 * 
 *   Enable/Disable?:
 *   - Enables or Disables Dust Clouds.
 * 
 * ---
 * 
 * DUST CLOUDS: Change Settings
 * - Alter the existing Dust Clouds settings.
 * 
 *   Appearance:
 * 
 *     Filename:
 *     - Filename of the Dust Cloud. Leave empty if using none.
 * 
 *     Color:
 *     - Color of the dust cloud in #rrggbb format.
 *     - For generated dust clouds only.
 *     - Ignore if using image.
 * 
 *     Radius:
 *     - What is the max radius of this dust cloud?
 *     - For generated dust clouds only.
 *     - Ignore if using image.
 * 
 *     Fullness:
 *     - What is the fullness level (0.0 to 1.0)?
 *     - For generated dust clouds only.
 *     - Ignore if using image.
 * 
 *   Animation:
 * 
 *     Duration:
 *     - How many frames will a dust cloud remain on screen?
 * 
 *     Starting Opacity:
 *     - What is the starting opacity (0-255)?
 *     - Dust cloud opacity will gradually go to 0.
 * 
 *     Starting Scale:
 *     - What is the starting scale (0.0 to 1.0)?
 *     - Dust cloud scale will gradually go to 1.0.
 * 
 * ---
 * 
 * === Footprints and Footsteps Plugin Commands ===
 * 
 * ---
 * 
 * FOOTPRINTS: Enable/Disable
 * - Enable or Disable footprint marks from being made.
 * 
 *   Enable/Disable?:
 *   - Enables or Disables footprint marks.
 * 
 * ---
 * 
 * FOOTSTEPS: Enable/Disable
 * - Enable or Disable footstep sounds from being played.
 * 
 *   Enable/Disable?:
 *   - Enables or Disables footstep sounds.
 * 
 * ---
 * 
 * === Motion Blur Plugin Commands ===
 * 
 * ---
 * 
 * MOTION BLUR: Player
 * - Plays a Motion Blur on the player sprite.
 * - Requires Pixi JS Filters!
 * 
 *   Apply to Followers?:
 *   - Apply this motion blur effect to followers, too?
 * 
 *   Duration:
 *   - Play the Motion Blur effect for how many frames?
 *   - You may use JavaScript code.
 * 
 *   Angle Offset:
 *   - Offset the motion blur angle by this many degrees.
 *   - Original angle is based on facing direction.
 * 
 * ---
 * 
 * MOTION BLUR: Follower(s)
 * - Plays a Motion Blur on the follower sprite(s).
 * - Requires Pixi JS Filters!
 * 
 *   Follower Index(es):
 *   - Select which follower index(es) to affect.
 *   - Index values start at 0.
 * 
 *   Duration:
 *   - Play the Motion Blur effect for how many frames?
 *   - You may use JavaScript code.
 * 
 *   Angle Offset:
 *   - Offset the motion blur angle by this many degrees.
 *   - Original angle is based on facing direction.
 * 
 * ---
 * 
 * MOTION BLUR: Event(s)
 * - Plays a Motion Blur on event sprite(s).
 * - Requires Pixi JS Filters!
 * 
 *   Event ID(s):
 *   - Select which event(s) to affect.
 *   - Index values start at 0.
 * 
 *   Duration:
 *   - Play the Motion Blur effect for how many frames?
 *   - You may use JavaScript code.
 * 
 *   Angle Offset:
 *   - Offset the motion blur angle by this many degrees.
 *   - Original angle is based on facing direction.
 * 
 * ---
 * 
 * === Motion Trail Plugin Commands ===
 * 
 * ---
 * 
 * MOTION TRAIL: Change Settings For Player?
 * - Change Motion Trail settings for the player.
 * - This does NOT enable them. You must do that separately.
 * 
 *   Apply to Followers?:
 *   - Apply this change to followers, too?
 * 
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less after images there are.
 * 
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 * 
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 * 
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 * 
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 * ---
 * 
 * MOTION TRAIL: Change Settings For Follower(s)?
 * - Change Motion Trail settings for the follower(s).
 * - This does NOT enable them. You must do that separately.
 * 
 *   Follower Index(es):
 *   - Select which follower index(es) to affect.
 *   - Index values start at 0.
 * 
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less after images there are.
 * 
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 * 
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 * 
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 * 
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 * ---
 * 
 * MOTION TRAIL: Change Settings For Event(s)?
 * - Change Motion Trail settings for the event(s).
 * - This does NOT enable them. You must do that separately.
 * 
 *   Event ID(s):
 *   - Select which event(s) to affect.
 *   - Use "0" for "this event".
 * 
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less after images there are.
 * 
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 * 
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 * 
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 * 
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 * ---
 * 
 * MOTION TRAIL: Create For Player
 * - Immediately create a motion trail sprite for the player in the player's
 *   current position.
 * 
 *   Apply to Followers?:
 *   - Apply this effect to followers, too?
 * 
 * ---
 * 
 * MOTION TRAIL: Create For Follower(s)
 * - Immediately create a motion trail sprite for the follower(s) in the
 *   follower(s)'s current position.
 * 
 *   Follower Index(es):
 *   - Select which follower index(es) to affect.
 *   - Index values start at 0.
 * 
 * ---
 * 
 * MOTION TRAIL: Create For Event(s)
 * - Immediately create a motion trail sprite for the event(s) in the
 *   event(s)'s current position.
 * 
 *   Event ID(s):
 *   - Select which event(s) to affect.
 *   - Use "0" for "this event".
 * 
 * ---
 * 
 * MOTION TRAIL: Enable For Player?
 * - Enables/disables Motion Trails for player sprite.
 * 
 *   Apply to Followers?:
 *   - Apply this change to followers, too?
 * 
 *   Enable/Disable?
 *   - Enables or Disables Motion Trails.
 * 
 *   Immediately Create?
 *   - Immediately create a motion trail?
 *   - Requires "Enabled" setting to also be true.
 * 
 * ---
 * 
 * MOTION TRAIL: Enable For Follower(s)?
 * - Enables/disables Motion Trails for follower sprite(s).
 * 
 *   Follower Index(es):
 *   - Select which follower index(es) to affect.
 *   - Index values start at 0.
 * 
 *   Enable/Disable?
 *   - Enables or Disables Motion Trails.
 * 
 *   Immediately Create?
 *   - Immediately create a motion trail?
 *   - Requires "Enabled" setting to also be true.
 * 
 * ---
 * 
 * MOTION TRAIL: Enable For Event(s)?
 * - Enables/disables Motion Trails for event sprite(s).
 * 
 *   Event ID(s):
 *   - Select which event(s) to affect.
 *   - Use "0" for "this event".
 * 
 *   Enable/Disable?
 *   - Enables or Disables Motion Trails.
 * 
 *   Immediately Create?
 *   - Immediately create a motion trail?
 *   - Requires "Enabled" setting to also be true.
 * 
 * ---
 * 
 * === Smart Movement Plugin Commands ===
 * 
 * ---
 * 
 * SMART: Directional Move Speed Modifier
 * - Global!
 * - These settings allow you to adjust the movement speed modifiers when
 *   characters are facing certain directions.
 * - This can be used to help give a better illusion that in a storm (or such),
 *   it is harder to move against the wind than with.
 * 
 *   Standard Directions:
 * 
 *     Down Speed:
 *     Left Speed:
 *     Right Speed:
 *     Up Speed:
 *     - What is the movement speed modifier for this direction?
 *     - These affect all characters, from players to followers to events.
 *     - Moving slower goes down 1 speed level.
 *     - Moving faster goes up 1 speed level.
 * 
 *   Diagonal Directions:
 * 
 *     Lower Left:
 *     Lower Right:
 *     Upper Left:
 *     Upper Right:
 *     - What is the movement speed modifier for this direction?
 *     - These affect all characters, from players to followers to events.
 *     - Moving slower goes down 1 speed level.
 *     - Moving faster goes up 1 speed level.
 * 
 * ---
 * 
 * SMART: Smart Blink X Tiles
 * - Player uses "Smart Blink" to teleport forward a distance.
 * - If this is last listed command, this can collide with events.
 * 
 *   Mechanics:
 * 
 *     Distance:
 *     - How many tiles will the player teleport forward?
 *     - You may use JavaScript code.
 * 
 *     Cooldown:
 *     - How many frames must the player wait before reuse?
 *     - You may use JavaScript code.
 * 
 *     Common Event ID:
 *     - If the Smash Blink is successful, play this Common Event as a
 *       Once Parallel.
 *     - Use 0 for none.
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 *   Restrictions:
 * 
 *     Non-Land Regions:
 *     - Which regions forbid Smart Blink from landing on it?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Land Terrain Tags:
 *     - Which tags forbid Smart Blink from landing on it?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Pass Regions:
 *     - Which regions will block Smart Blink from going further?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Pass Terrain Tags:
 *     - Which tags will block Smart Blink from going further?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *   Visuals:
 * 
 *     Animation ID:
 *     - What animation do you wish to play on the player if the player can
 *       Smart Blink?
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 *     Motion Trail Settings:
 *     - Adjust the motion trail settings for this Smart Movement.
 *     - For more details, look in the sub section below.
 * 
 *   Sound Effect:
 * 
 *     Filename:
 *     - Filename of the sound effect played for a successful Smart Blink.
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 *     Volume:
 *     - Volume of the sound effect played for a successful Smart Blink.
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 *     Pitch:
 *     - Pitch of the sound effect played for a successful Smart Blink.
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 *     Pan:
 *     - Pan of the sound effect played for a successful Smart Blink.
 *     - This will NOT play if the player cannot Smart Blink.
 * 
 * ---
 * 
 * SMART: Smart Jump X Tiles
 * - Player uses "Smart Jump" to leap forward a distance.
 * - If this is last listed command, this can collide with events.
 * 
 *   Mechanics:
 * 
 *     Distance:
 *     - How many tiles will the player jump forward?
 *     - You may use JavaScript code.
 * 
 *     Cooldown:
 *     - How many frames must the player wait before reuse?
 *     - You may use JavaScript code.
 * 
 *     Common Event ID:
 *     - If the Smash Jump is successful, play this Common Event as a
 *       Once Parallel.
 *     - Use 0 for none.
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 *   Restrictions:
 * 
 *     Non-Land Regions:
 *     - Which regions forbid Smart Jump from landing on it?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Land Terrain Tags:
 *     - Which tags forbid Smart Jump from landing on it?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Pass Regions:
 *     - Which regions will block Smart Jump from going further?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *     Non-Pass Terrain Tags:
 *     - Which tags will block Smart Jump from going further?
 *     - Adds to map, tileset, and Plugin Parameter settings.
 * 
 *   Visuals:
 * 
 *     Animation ID:
 *     - What animation do you wish to play on the player if the player can
 *       Smart Jump?
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 *     Motion Trail Settings:
 *     - Adjust the motion trail settings for this Smart Movement.
 *     - For more details, look in the sub section below.
 * 
 *   Sound Effect:
 * 
 *     Filename:
 *     - Filename of the sound effect played for a successful Smart Jump.
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 *     Volume:
 *     - Volume of the sound effect played for a successful Smart Jump.
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 *     Pitch:
 *     - Pitch of the sound effect played for a successful Smart Jump.
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 *     Pan:
 *     - Pan of the sound effect played for a successful Smart Jump.
 *     - This will NOT play if the player cannot Smart Jump.
 * 
 * ---
 * 
 * SMART: Smart Rush X Tiles
 * - Player uses "Smart Rush" to rush forward a distance.
 * - If this is last listed command, this can collide with events.
 * 
 *   Mechanics:
 * 
 *     Distance:
 *     - How many tiles will player charge forward?
 *     - You may use JavaScript code.
 * 
 *     Cooldown:
 *     - How many frames must the player wait before reuse?
 *     - You may use JavaScript code.
 * 
 *     Common Event ID:
 *     - If the Smash Rush is successful, play this Common Event as a
 *       Once Parallel.
 *     - Use 0 for none.
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 *     Switch(es):
 *     - Which Switch(es) will turn ON during Smart Rush?
 *     - This Switch(es) will also turn OFF after.
 * 
 *   Visuals:
 * 
 *     Animation ID:
 *     - What animation do you wish to play on the player if the player can
 *       Smart Rush?
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 *     Motion Trail Settings:
 *     - Adjust the motion trail settings for this Smart Movement.
 *     - For more details, look in the sub section below.
 * 
 *     Speed Rate:
 *     - How much faster is "Smart Rush" compared to Dashing?
 *     - You may use JavaScript code.
 * 
 *   Sound Effect:
 * 
 *     Filename:
 *     - Filename of the sound effect played for a successful Smart Rush.
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 *     Volume:
 *     - Volume of the sound effect played for a successful Smart Rush.
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 *     Pitch:
 *     - Pitch of the sound effect played for a successful Smart Rush.
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 *     Pan:
 *     - Pan of the sound effect played for a successful Smart Rush.
 *     - This will NOT play if the player cannot Smart Rush.
 * 
 * ---
 * 
 * Motion Trail Settings
 * - These are sub-settings found for Smart Blink, Smart Jump, and Smart Rush.
 * 
 *   General:
 * 
 *     Override?:
 *     - Override Motion Trail settings temporarily?
 *     - Otherwise, use current player Motion Trail settings.
 * 
 *   Settings:
 * 
 *     Delay:
 *     - How many frames to delay by when creating a motion trail?
 *     - The higher the delay, the less after images there are.
 * 
 *     Duration:
 *     - How many frames should the motion trail last?
 *     - What do you want to be its duration?
 * 
 *     Hue:
 *     - What do you want to be the hue for the motion trail?
 * 
 *     Starting Opacity:
 *     - What starting opacity value do you want for the motion trail?
 *     - Opacity values decrease over time.
 * 
 *     Tone:
 *     - What tone do you want for the motion trail?
 *     - Format: [Red, Green, Blue, Gray]
 * 
 * ---
 * 
 * SMART: Wait for Smart Blink
 * - Waits for player to finish Smart Blinking before continuing.
 * 
 * ---
 * 
 * SMART: Wait for Smart Jump
 * - Waits for player to finish Smart Jumping before continuing.
 * 
 * ---
 * 
 * SMART: Wait for Smart Rush
 * - Waits for player to finish Smart Rushing before continuing.
 * 
 * ---
 * 
 * === Smooth Camera Plugin Commands ===
 * 
 * ---
 *
 * SMOOTH CAMERA: Enable/Disable
 * - Enable or Disable the Smooth Camera.
 *
 *   Enable/Disable?:
 *   - Enables or Disables Smooth Camera.
 *
 * ---
 *
 * SMOOTH CAMERA: Speed Change
 * - Change the scrolling speed for the Smooth Camera.
 *
 *   Walk Speed:
 *
 *     Horizontal Rate:
 *     - Horizontal walking scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *     Vertical Rate:
 *     - Vertical walking scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *   Dash Speed:
 *
 *     Horizontal Rate:
 *     - Horizontal dashing scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *     Vertical Rate:
 *     - Vertical dashing scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Dust Cloud Settings
 * ============================================================================
 *
 * Dust Clouds can appear when the player (or any character) is dashing. The
 * spawned dust clouds have some randomness to them so not all of them are the
 * same size and scale. You can use images for custom dust clouds or use plugin
 * generated dust clouds for those who don't have custom images to use.
 *
 * ---
 *
 * Default
 * 
 *   Default Enabled?:
 *   - Are Dust Clouds enabled by default?
 * 
 * ---
 * 
 * Appearance:
 * 
 *   Filename:
 *   - Filename of the Dust Cloud. Leave empty if using none.
 * 
 *   Color:
 *   - Color of the dust cloud in #rrggbb format.
 *   - For generated dust clouds only.
 *   - Ignore if using image.
 * 
 *   Radius:
 *   - What is the max radius of this dust cloud?
 *   - For generated dust clouds only.
 *   - Ignore if using image.
 * 
 *   Fullness:
 *   - What is the fullness level (0.0 to 1.0)?
 *   - For generated dust clouds only.
 *   - Ignore if using image.
 * 
 * ---
 * 
 * Animation:
 * 
 *   Duration:
 *   - How many frames will a dust cloud remain on screen?
 * 
 *   Starting Opacity:
 *   - What is the starting opacity (0-255)?
 *   - Dust cloud opacity will gradually go to 0.
 * 
 *   Starting Scale:
 *   - What is the starting scale (0.0 to 1.0)?
 *   - Dust cloud scale will gradually go to 1.0.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Footprint Mark Settings
 * ============================================================================
 *
 * Footprint marks can appear on certain tiles probably marked by specific
 * regions and/or terrain tags. They will not appear normally unless you change
 * up the settings.
 *
 * ---
 *
 * General
 * 
 *   Default Enabled?:
 *   - Are footprint marks enabled by default?
 *
 * ---
 *
 * Appearance
 * 
 *   Opacity:
 *   - What is the starting opacity of the footprint?
 * 
 *   Duration:
 *   - How many frames will footprints remain on the screen
 *     before disappearing?
 * 
 *   Follower Variance:
 *   - What variance should followers have for their footprints?
 *   - This is to avoid them all stepping in the same place.
 *
 * ---
 *
 * Map Defaults
 * 
 *   Regions:
 *   - Which Regions will have footprints appear by default?
 * 
 *   Terrain Tags:
 *   - Which terrain tags will have footprints appear by default?
 *
 * ---
 *
 * Standard Directions
 * 
 *   Down:
 *   Left:
 *   Right:
 *   Up:
 *   - Settings used for footprints when facing moving direction.
 *   - For normal sprite sheets: 0 is left, 1 is center, 2 is right.
 *
 * ---
 *
 * Diagonal Directions
 * 
 *   Lower Left:
 *   Lower Right:
 *   Upper Left:
 *   Upper Right:
 *   - Settings used for footprints when facing moving direction.
 *   - For normal sprite sheets: 0 is left, 1 is center, 2 is right.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Footstep Sounds Settings
 * ============================================================================
 *
 * The following plugin parameters are used to modify the footstep sounds that
 * are played whenever characters move.
 *
 * ---
 *
 * General
 * 
 *   Default Enabled?:
 *   - Are footstep sounds enabled by default?
 * 
 *   Sound by Frame?:
 *   - Play footstep sounds at certain sprite frames or with each tile step?
 *   - For those who want the Yanfly Engine Plugins timing, set this to false.
 *   - On the flipside, setting it to true will cause footstep sounds to occur
 *     whenever the sprite sets its foot down (assuming you setup the frames
 *     correctly with the plugin parameter below).
 * 
 *     Audible Frame(s):
 *     - Which sprite sheet "frames" will play a sound?
 *     - Sprite sheet Frames start at 0.
 * 
 *   Walk Animation Modifier:
 *   - What is the rate at which animations play for walking?
 *   - This is to ensure the sound effects synch up.
 * 
 *   Dash Animation Modifier:
 *   - What is the rate at which animations play for dashing?
 *   - This is to ensure the sound effects synch up.
 *
 * ---
 *
 * Default Sound
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * Distance
 * 
 *   Volume Modifier:
 *   - Modifier per tile distance away from the player.
 *   - Use a decimal value.
 * 
 *   Pitch Modifier:
 *   - Modifier per tile distance away from the player.
 *   - Use a decimal value.
 * 
 *   Pan Modifier:
 *   - Modifier per tile distance away from the player.
 *   - Use an integer value.
 *
 * ---
 *
 * Actor Modifiers
 * 
 *   Enabled for Actors?:
 *   - Are footstep sounds enabled for actors by default?
 * 
 *   Volume Modifier:
 *   - Volume modifier rate for actors.
 *   - Use a decimal value.
 * 
 *   Pitch Modifier:
 *   - Pitch modifier rate for actors.
 *   - Use a decimal value.
 *
 * ---
 *
 * Event Modifiers
 * 
 *   Enabled for Events?:
 *   - Are footstep sounds enabled for events by default?
 * 
 *   Volume Modifier:
 *   - Volume modifier rate for events.
 *   - Use a decimal value.
 * 
 *   Pitch Modifier:
 *   - Pitch modifier rate for events.
 *   - Use a decimal value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Smart Blink Settings
 * ============================================================================
 *
 * Smart Blink is a Plugin Command launched action. The action will cause the
 * player to teleport forward (up to) a measured distance, bypassing any
 * obstacles and/or walls inbetween. If the Plugin Command is placed at the end
 * of the event list, then the player is able to trigger any other events on
 * the tile that the player has landed on.
 * 
 * Smart Blinking can be customized to not ignore all obstacles and/or walls.
 * In fact, through clever usage of Regions and/or Terrain Tags, game devs can
 * create areas that the player cannot teleport past (resulting in a barrier)
 * or a place that players cannot land on top of (such as rooftops). These
 * restrictions can be made on a global scale, on a map-basis, tileset-basis,
 * or even by Plugin Command-basis.
 * 
 * The Plugin Command best works when paired with a plugin like VisuStella MZ's
 * Button Common Events.
 * 
 * The Plugin Parameters below are the settings that are always static
 * throughout all Smart Blinks.
 *
 * ---
 * 
 * Mechanics
 * 
 *   Allow Diagonal Blink?:
 *   - Allow diagonal Smart Blinking?
 *   - VS8 Sprites only.
 *   - Does NOT work with standard RTP.
 *   - This is disabled by default due to how much distance a diagonal
 *     Smart Blink is able to cover.
 * 
 *   Floor to Ceiling?:
 *   - Allow blinking from floor to ceiling tiles?
 * 
 * ---
 *
 * Visual
 * 
 *   Blur Duration:
 *   - Requires PixiJS Filters!
 *   - How long will the motion blur last?
 * 
 *   Blur Angle Offset:
 *   - Requires PixiJS Filters!
 *   - Offset the motion blur angle by this many degrees.
 *   - Otherwise, the motion blur angle is equal to the direction the player is
 *     facing while blinking.
 *
 * ---
 *
 * Restrictions
 * 
 *   Non-Land Regions:
 *   - Which regions forbid Smart Blink from landing on it?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Land Terrain Tags:
 *   - Which tags forbid Smart Blink from landing on it?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Pass Regions:
 *   - Which regions will block Smart Blink from going further?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Pass Terrain Tags:
 *   - Which tags will block Smart Blink from going further?
 *   - These are defaults, which can be replaced by notetags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Smart Jump Settings
 * ============================================================================
 *
 * Smart Jump is a Plugin Command launched action. The action will cause the
 * player to jump forward (up to) a measured distance, bypassing any obstacles
 * and/or walls inbetween. If the Plugin Command is placed at the end of the
 * event list, then the player is able to trigger any other events on the tile
 * that the player has landed on.
 * 
 * Smart Jumping can be customized to not ignore all obstacles and/or walls.
 * In fact, through clever usage of Regions and/or Terrain Tags, game devs can
 * create areas that the player cannot jump past (resulting in a barrier)
 * or a place that players cannot land on top of (such as rooftops). These
 * restrictions can be made on a global scale, on a map-basis, tileset-basis,
 * or even by Plugin Command-basis.
 * 
 * Smart Jump also has height based interactions, allowing the player to jump
 * from equal height "regions" to another, such as scaling a cliff. Players can
 * also jump from higher regions to lower regions (as long as both are marked
 * as Height-Based Regions). Here are how Height-Based Regions interact:
 * 
 *   - Players can jump from a height-based region to another height-based
 *     region of the same or lower value as long as that region is listed, too.
 *     - Regions listed: 10, 13, 15.
 *     - ie. The player can jump from Region 15 to 15.
 *     - ie. The player can jump from Region 15 to 13.
 *     - ie. The player can jump from Region 15 to 10.
 *     - ie. The player CANNOT jump from Region 13 to 15.
 *     - ie. The player CANNOT jump from Region 10 to 13.
 *     - ie. The player CANNOT jump from Region 10 to 15.
 * 
 *   - The lowest value number in the list is considered a "ledge" and the
 *     lowest possible level.
 * 
 *   - Players can jump in and out of the lowest level regions into non-height
 *     marked regions.
 * 
 *   - If the player is jumping towards the up, left, right directions, they
 *     cannot jump directly into a "ledge" region unless they are adjacent to
 *     the marked tile. A distance greater than 1 tile apart cannot be and the
 *     jump will be cut short.
 * 
 *   - If the player is jumping upward towards a "ledge", the player will jump
 *     directly onto the next available tile.
 * 
 *   - If the player is jumping towards the left or right directions into a
 *     "ledge" region, the player will "fall" a tile distance equal to the
 *     difference from the region height they're jumping from.
 *     - Regions listed: 10, 13, 15.
 *     - If the player is on Region 15 and jumps into a ledge (10), the player
 *       will drop 5 tiles downward.
 *     - If the player is on Region 13 and jumps into a ledge (10), the player
 *       will drop 3 tiles downward.
 * 
 *   - If the player is jumping downward towards a "ledge", the player will
 *     jump the full distance.
 * 
 * Keep in mind that despite the fact that there is Height-Based Region support
 * for Smart Jump, maps in RPG Maker MZ are still inherently 2D. Therefore, not
 * everything will look correct for every jump-related scenario involving
 * region heights. You may need to make adjustments to maps that work best for
 * the limited 2D nature of mapping in order to adhere to what Height-Based
 * Region support can handle.
 * 
 * The Plugin Command best works when paired with a plugin like VisuStella MZ's
 * Button Common Events.
 * 
 * When Smart Jumping, the player cannot jump from a floor tile to a ceiling
 * tiles (the top tiles of A4 tiles). The player also cannot jump over them to
 * reach the other side of the ceiling tile onto a floor tile.
 * 
 * The Plugin Parameters below are the settings that are always static
 * throughout all Smart Blinks.
 *
 * ---
 * 
 * Mechanics
 * 
 *   Allow Diagonal Jump?:
 *   - Allow diagonal Smart Jumping?
 *   - VS8 Sprites only.
 *   - Does NOT work with standard RTP.
 *   - This is disabled by default due to how much distance a diagonal
 *     Smart Jump is able to cover.
 * 
 *   Height-Based Regions:
 *   - Determine which regions are height-based.
 *   - The lowest value region will be a "ledge".
 * 
 * ---
 *
 * Restrictions
 * 
 *   Non-Land Regions:
 *   - Which regions forbid Smart Blink from landing on it?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Land Terrain Tags:
 *   - Which tags forbid Smart Blink from landing on it?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Pass Regions:
 *   - Which regions will block Smart Blink from going further?
 *   - These are defaults, which can be replaced by notetags.
 * 
 *   Non-Pass Terrain Tags:
 *   - Which tags will block Smart Blink from going further?
 *   - These are defaults, which can be replaced by notetags.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Smart Rush Settings
 * ============================================================================
 *
 * Smart Rush is a Plugin Command launched action. The action will cause the
 * player to rush forward at faster (normally) than dash speed. If the Plugin
 * Command is placed at the end of the event list, then the player is able to
 * collide with other events, possibly triggering them.
 * 
 * While rushing forward, any switches listed in the Plugin Command will be
 * turned to the ON position, then OFF position once the rushing is finished.
 * This means that any events that the player collides with can have a unique
 * interaction from being rushed into. Examples include making objects fall
 * from trees, breaking down locked doors, or smashing apart rubble.
 * 
 * The Plugin Command best works when paired with a plugin like VisuStella MZ's
 * Button Common Events.
 * 
 * When Smart Rushing into walls, solid objects, or events with a priority type
 * as "Same As Characters", the screen can shake when crashing. This does not
 * apply when crashing into water tiles.
 * 
 * The Plugin Parameters below are the settings that are always static
 * throughout all Smart Rushes.
 *
 * ---
 * 
 * Mechanics
 * 
 *   Allow Diagonal Rush?:
 *   - Allow diagonal Smart Rushing?
 *   - VS8 Sprites only.
 *   - Does NOT work with standard RTP.
 *   - This is disabled by default due to how much distance a diagonal
 *     Smart Rush is able to cover.
 *
 * Visual
 * 
 *   Blur Duration:
 *   - Requires PixiJS Filters!
 *   - How long will the motion blur last?
 * 
 *   Blur Angle Offset:
 *   - Requires PixiJS Filters!
 *   - Offset the motion blur angle by this many degrees.
 *   - Otherwise, the motion blur angle is equal to the direction the player is
 *     rushing at.
 *
 * ---
 *
 * Crash Shake
 * 
 *   Enable Crash Shake?:
 *   - Cause the screen to shake after crashing into an entity?
 *   - Entities can be walls or events.
 * 
 *   Power Rate:
 *   - The power modifier for the screen shake upon crashing into something.
 * 
 *   Speed Rate:
 *   - The speed modifier for the screen shake upon crashing into something.
 * 
 *   Shaking Duration:
 *   - How many frames will the screen shake last after crashing into
 *     something?
 *
 * ---
 * 
 * Non-Crash
 * 
 *   Regions:
 *   - When crashing into these region-marked tiles, do not shake the screen.
 *   - This is primarily used for tiles such as water tiles so that it doesn't
 *     look like there's an invisible wall where the player is crashing into.
 * 
 *   Terrain Tags:
 *   - When crashing into these terrain tagged tiles, do not shake the screen.
 *   - This is primarily used for tiles such as water tiles so that it doesn't
 *     look like there's an invisible wall where the player is crashing into.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Smooth Camera Scrolling Settings
 * ============================================================================
 *
 * Adjust the settings for smooth camera scrolling while the player moves.
 *
 * ---
 *
 * Default
 * 
 *   Default Enabled?:
 *   - Is the Smooth Camera enabled by default?
 *
 *   Walk Speed:
 *
 *     Horizontal Rate:
 *     - Horizontal walking scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *     Vertical Rate:
 *     - Vertical walking scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *   Dash Speed:
 *
 *     Horizontal Rate:
 *     - Horizontal dashing scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 *     Vertical Rate:
 *     - Vertical dashing scroll rate adjustment.
 *     - Lower: faster; Higher: slower
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters control the settings you see in the Options menu.
 * These are for players who might be bothered by some of the various features
 * found in the plugin and will grant them the ability to turn them on/off.
 *
 * ---
 *
 * Default
 * 
 *   Default Enabled?:
 *   - Is the Smooth Camera enabled by default?
 * 
 * ---
 *
 * Dust Cloud:
 * 
 *   Add Option?:
 *   - Add the 'Dust Clouds' option to the Options menu?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * Smooth Camera:
 * 
 *   Add Option?:
 *   - Add the 'Smooth Scroll' option to the Options menu?
 * 
 *   Option Name:
 *   - Command name of the option.
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
 * * Arisu
 * * Olivia
 * * Irina
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.08: October 27, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: September 1, 2022
 * * Bug Fixes!
 * ** Fixed a bug that prevented some notetags from being used. Fix by Arisu.
 * 
 * Version 1.06: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that prevented some settings from being able to be read
 *    properly. Fix made by Irina.
 * 
 * Version 1.05: August 4, 2022
 * * Compatibility Update!
 * ** Special effects now work better with zoom.
 * * Feature Update!
 * ** Scroll-linked parallax images will now work better with Smooth Scroll.
 * 
 * Version 1.04: July 7, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Smart Blink > Mechanics > Floor to Ceiling?
 * **** Allow blinking from floor to ceiling tiles?
 * 
 * Version 1.03: June 30, 2022
 * * Bug Fixes!
 * ** Followers will no longer cause footstep sounds while in a vehicle.
 *    Fix made by Irina.
 * * Documentation Update
 * ** Added to: Plugin Parameters: Smart Rush Settings
 * *** When Smart Rushing into walls, solid objects, or events with a priority
 *     type as "Same As Characters", the screen can shake when crashing. This
 *     does not apply when crashing into water tiles.
 * ** Added to: Plugin Parameters: Smart Jump Settings
 * *** When Smart Jumping, the player cannot jump from a floor tile to a
 *     ceiling tiles (the top tiles of A4 tiles). The player also cannot jump
 *     over them to reach the other side of the ceiling tile onto a floor tile.
 * * Feature Update!
 * ** Smart Rush will no longer play a crash animation when targeting a water
 *    tile. Update made by Irina.
 * ** Smart Jump will no longer be able to jump over ceiling tiles if the
 *    player character is on a floor tile. Update made by Irina.
 * ** Smart Jump will no longer be able to jump onto ceiling tiles if the
 *    player character is on a floor tile. Update made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: June 23, 2022
 * * Feature Update!
 * ** Smart Jump, Smart Rush, and Smart Blink are now temporarily disabled
 *    while followers are in the middle of gathering to reduce errors. Update
 *    made by Olivia.
 * 
 * Version 1.01: March 31, 2022
 * * Bug Fixes!
 * ** <Terrain Tag x Footsteps: filename> notetag should now work properly.
 *    Fix made by Arisu.
 * 
 * Version 1.00 Official Release Date: April 4, 2022
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DustCloud
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_DustCloud
 * @text Category - Dust Clouds
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DustCloudEnableDisable
 * @text DUST CLOUDS: Enable/Disable
 * @desc Enable or Disable the Dust Clouds from spawning when dashing.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Dust Clouds ON
 * @off Dust Clouds OFF
 * @desc Enables or Disables Dust Clouds.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DustCloudChangeSettings
 * @text DUST CLOUDS: Change Settings
 * @desc Alter the existing Dust Clouds settings.
 * 
 * @arg Appearance
 * 
 * @arg filename:str
 * @text Filename
 * @parent Appearance
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename of the Dust Cloud. Leave empty if using none.
 * @default 
 *
 * @arg color:str
 * @text Color
 * @parent Appearance
 * @desc Color of the dust cloud in #rrggbb format.
 * For generated dust clouds only. Ignore if using image.
 * @default #ffffff
 *
 * @arg radius:num
 * @text Radius
 * @parent Appearance
 * @type number
 * @min 1
 * @desc What is the max radius of this dust cloud?
 * For generated dust clouds only. Ignore if using image.
 * @default 24
 *
 * @arg fullness:num
 * @text Fullness
 * @parent Appearance
 * @desc What is the fullness level (0.0 to 1.0)?
 * For generated dust clouds only. Ignore if using image.
 * @default 0.20
 * 
 * @arg Animation
 *
 * @arg wholeDuration:num
 * @text Duration
 * @parent Animation
 * @type number
 * @min 1
 * @desc How many frames will a dust cloud remain on screen?
 * @default 20
 *
 * @arg startOpacity:num
 * @text Starting Opacity
 * @parent Animation
 * @type number
 * @min 1
 * @max 255
 * @desc What is the starting opacity (0-255)?
 * Dust cloud opacity will gradually go to 0.
 * @default 192
 *
 * @arg startScale:num
 * @text Starting Scale
 * @parent Animation
 * @desc What is the starting scale (0.0 to 1.0)?
 * Dust cloud scale will gradually go to 1.0.
 * @default 0.2
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Footprints
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Footprints
 * @text Category - Footprints & Footsteps
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FootprintsEnableDisable
 * @text FOOTPRINTS: Enable/Disable
 * @desc Enable or Disable footprint marks from being made.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Footprint Marks ON
 * @off Footprint Marks OFF
 * @desc Enables or Disables footprint marks.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FootstepsEnableDisable
 * @text FOOTSTEPS: Enable/Disable
 * @desc Enable or Disable footstep sounds from being played.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Footstep Sounds ON
 * @off Footstep Sounds OFF
 * @desc Enables or Disables footstep sounds.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MotionBlur
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_MotionBlur
 * @text Category - Motion Blur
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionBlurPlayer
 * @text MOTION BLUR: Player
 * @desc Plays a Motion Blur on the player sprite.
 * Requires Pixi JS Filters!
 *
 * @arg ApplyFollowers:eval
 * @text Apply to Followers?
 * @type boolean
 * @on Apply
 * @off Ignore
 * @desc Apply this motion blur effect to followers, too?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Play the Motion Blur effect for how many frames?
 * You may use JavaScript code.
 * @default 30
 *
 * @arg AngleOffset:eval
 * @text Angle Offset
 * @desc Offset the motion blur angle by this many degrees.
 * Original angle is based on facing direction.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionBlurFollower
 * @text MOTION BLUR: Follower(s)
 * @desc Plays a Motion Blur on the follower sprite(s).
 * Requires Pixi JS Filters!
 *
 * @arg Index:arraynum
 * @text Follower Index(es)
 * @type number[]
 * @desc Select which follower index(es) to affect.
 * Index values start at 0.
 * @default ["0"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Play the Motion Blur effect for how many frames?
 * You may use JavaScript code.
 * @default 30
 *
 * @arg AngleOffset:eval
 * @text Angle Offset
 * @desc Offset the motion blur angle by this many degrees.
 * Original angle is based on facing direction.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionBlurEvent
 * @text MOTION BLUR: Event(s)
 * @desc Plays a Motion Blur on event sprite(s).
 * Requires Pixi JS Filters!
 *
 * @arg EventID:arraynum
 * @text Event ID(s)
 * @type number[]
 * @desc Select which event(s) to affect.
 * Use "0" for "this event".
 * @default ["0"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Play the Motion Blur effect for how many frames?
 * You may use JavaScript code.
 * @default 30
 *
 * @arg AngleOffset:eval
 * @text Angle Offset
 * @desc Offset the motion blur angle by this many degrees.
 * Original angle is based on facing direction.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MotionTrails
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_MotionTrails
 * @text Category - Motion Trails
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailSettingsChangePlayer
 * @text MOTION TRAIL: Change Settings For Player?
 * @desc Change Motion Trail settings for the player.
 * This does NOT enable them. You must do that separately.
 *
 * @arg ApplyFollowers:eval
 * @text Apply to Followers?
 * @type boolean
 * @on Apply
 * @off Ignore
 * @desc Apply this change to followers, too?
 * @default true
 *
 * @arg delay:num
 * @text Delay
 * @type number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 4
 *
 * @arg duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 128
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailSettingsChangeFollower
 * @text MOTION TRAIL: Change Settings For Follower(s)?
 * @desc Change Motion Trail settings for follower(s).
 * This does NOT enable them. You must do that separately.
 *
 * @arg Index:arraynum
 * @text Follower Index(es)
 * @type number[]
 * @desc Select which follower index(es) to affect.
 * Index values start at 0.
 * @default ["0"]
 *
 * @arg delay:num
 * @text Delay
 * @type number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 4
 *
 * @arg duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 128
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailSettingsChangeEvent
 * @text MOTION TRAIL: Change Settings For Event(s)?
 * @desc Change Motion Trail settings for event(s).
 * This does NOT enable them. You must do that separately.
 *
 * @arg EventID:arraynum
 * @text Event ID(s)
 * @type number[]
 * @desc Select which event(s) to affect.
 * Use "0" for "this event".
 * @default ["0"]
 *
 * @arg delay:num
 * @text Delay
 * @type number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 4
 *
 * @arg duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 128
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailCreateForPlayer
 * @text MOTION TRAIL: Create For Player
 * @desc Immediately create a motion trail sprite for the player
 * in the player's current position.
 *
 * @arg ApplyFollowers:eval
 * @text Apply to Followers?
 * @type boolean
 * @on Apply
 * @off Ignore
 * @desc Apply this effect to followers, too?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailCreateForFollower
 * @text MOTION TRAIL: Create For Follower(s)
 * @desc Immediately create a motion trail sprite for the follower(s)
 * in the follower(s)'s current position.
 *
 * @arg Index:arraynum
 * @text Follower Index(es)
 * @type number[]
 * @desc Select which follower index(es) to target.
 * Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailCreateForEvent
 * @text MOTION TRAIL: Create For Event(s)
 * @desc Immediately create a motion trail sprite for the event(s)
 * in the event(s)'s current position.
 *
 * @arg EventID:arraynum
 * @text Event ID(s)
 * @type number[]
 * @desc Select which event(s) to target.
 * Use "0" for "this event".
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailEnablePlayer
 * @text MOTION TRAIL: Enable For Player?
 * @desc Enables/disables Motion Trails for player sprite.
 *
 * @arg ApplyFollowers:eval
 * @text Apply to Followers?
 * @type boolean
 * @on Apply
 * @off Ignore
 * @desc Apply this change to followers, too?
 * @default true
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Motion Trails ON
 * @off Motion Trails OFF
 * @desc Enables or Disables Motion Trails.
 * @default true
 *
 * @arg ImmediateCreate:eval
 * @text Immediately Create?
 * @type boolean
 * @on Create
 * @off Ignore
 * @desc Immediately create a motion trail?
 * Requires "Enabled" setting to also be true.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailEnableFollower
 * @text MOTION TRAIL: Enable For Follower(s)?
 * @desc Plays a Motion Blur on the follower sprite(s).
 * Requires Pixi JS Filters!
 *
 * @arg Index:arraynum
 * @text Follower Index(es)
 * @type number[]
 * @desc Select which follower index(es) to affect.
 * Index values start at 0.
 * @default ["0"]
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Motion Trails ON
 * @off Motion Trails OFF
 * @desc Enables or Disables Motion Trails.
 * @default true
 *
 * @arg ImmediateCreate:eval
 * @text Immediately Create?
 * @type boolean
 * @on Create
 * @off Ignore
 * @desc Immediately create a motion trail?
 * Requires "Enabled" setting to also be true.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MotionTrailEnableEvent
 * @text MOTION TRAIL: Enable For Event(s)?
 * @desc Plays a Motion Blur on event sprite(s).
 * Requires Pixi JS Filters!
 *
 * @arg EventID:arraynum
 * @text Event ID(s)
 * @type number[]
 * @desc Select which event(s) to affect.
 * Use "0" for "this event".
 * @default ["0"]
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Motion Trails ON
 * @off Motion Trails OFF
 * @desc Enables or Disables Motion Trails.
 * @default true
 *
 * @arg ImmediateCreate:eval
 * @text Immediately Create?
 * @type boolean
 * @on Create
 * @off Ignore
 * @desc Immediately create a motion trail?
 * Requires "Enabled" setting to also be true.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SmartMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_SmartMove
 * @text Category - Smart Movements
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartDirMoveSpeedMod
 * @text SMART: Directional Move Speed Modifier
 * @desc Global! These settings allow you to adjust the movement speed
 * modifiers when characters are facing certain directions.
 * 
 * @arg Standard
 * @text Standard Directions
 *
 * @arg dir2:str
 * @text Down Speed
 * @parent Standard
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir4:str
 * @text Left Speed
 * @parent Standard
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir6:str
 * @text Right Speed
 * @parent Standard
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir8:str
 * @text Up Speed
 * @parent Standard
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 * 
 * @arg Diagonal
 * @text Diagonal Directions
 *
 * @arg dir1:str
 * @text Lower Left Speed
 * @parent Diagonal
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir3:str
 * @text Lower Right Speed
 * @parent Diagonal
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir7:str
 * @text Upper Left Speed
 * @parent Diagonal
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @arg dir9:str
 * @text Upper Right Speed
 * @parent Diagonal
 * @type select
 * @option slower
 * @option normal
 * @option faster
 * @desc What is the movement speed modifier for this direction?
 * @default normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartBlinkDistance
 * @text SMART: Smart Blink X Tiles
 * @desc Player uses "Smart Blink" to teleport forward a distance.
 * If this is last listed command, this can collide with events.
 * 
 * @arg Mechanics
 *
 * @arg Distance:eval
 * @text Distance
 * @parent Mechanics
 * @desc How many tiles will the player teleport forward?
 * You may use JavaScript code.
 * @default 5
 *
 * @arg Cooldown:eval
 * @text Cooldown
 * @parent Mechanics
 * @desc How many frames must the player wait before reuse?
 * You may use JavaScript code.
 * @default 60
 *
 * @arg OnSuccessCommonEventID:eval
 * @text Common Event ID
 * @parent Mechanics
 * @type common_event
 * @desc If the Smash Blink is successful, play this Common Event
 * as a Once Parallel. Use 0 for none.
 * @default 0
 * 
 * @arg Restrict
 * @text Restrictions
 *
 * @arg NonLandableRegions:arraynum
 * @text Non-Land Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions forbid Smart Blink from landing on it?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonLandableTerrainTags:arraynum
 * @text Non-Land Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags forbid Smart Blink from landing on it?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonPassableRegions:arraynum
 * @text Non-Pass Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions will block Smart Blink from going further?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonPassableTerrainTags:arraynum
 * @text Non-Pass Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags will block Smart Blink from going further?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 * 
 * @arg Visual
 * @text Visuals
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Visual
 * @type animation
 * @desc What animation do you wish to play on the player
 * if the player can Smart Blink?
 * @default 0
 *
 * @arg MotionTrail:struct
 * @text Motion Trail Settings
 * @parent Visual
 * @type struct<MotionTrail>
 * @desc Adjust the motion trail settings for this Smart Movement.
 * @default {"General":"","enabled:eval":"true","Settings":"","delay:num":"4","duration:num":"60","hue:num":"0","opacityStart:num":"255","tone:eval":"[0, 192, 192, 128]"}
 * 
 * @arg SoundEffect
 * @text Sound Effect
 *
 * @arg sfxName:str
 * @text Filename
 * @parent SoundEffect
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played for a successful Smart Blink.
 * @default Flash2
 *
 * @arg sfxVolume:num
 * @text Volume
 * @parent SoundEffect
 * @type number
 * @max 100
 * @desc Volume of the sound effect played for a successful Smart Blink.
 * @default 50
 *
 * @arg sfxPitch:num
 * @text Pitch
 * @parent SoundEffect
 * @type number
 * @desc Pitch of the sound effect played for a successful Smart Blink.
 * @default 120
 *
 * @arg sfxPan:num
 * @text Pan
 * @parent SoundEffect
 * @desc Pan of the sound effect played for a successful Smart Blink.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartJumpDistance
 * @text SMART: Smart Jump X Tiles
 * @desc Player uses "Smart Jump" to leap forward a distance.
 * If this is last listed command, this can collide with events.
 * 
 * @arg Mechanics
 *
 * @arg Distance:eval
 * @text Distance
 * @parent Mechanics
 * @desc How many tiles will the player jump forward?
 * You may use JavaScript code.
 * @default 2
 *
 * @arg Cooldown:eval
 * @text Cooldown
 * @parent Mechanics
 * @desc How many frames must the player wait before reuse?
 * You may use JavaScript code.
 * @default 5
 *
 * @arg OnSuccessCommonEventID:eval
 * @text Common Event ID
 * @parent Mechanics
 * @type common_event
 * @desc If the Smash Jump is successful, play this Common Event
 * as a Once Parallel. Use 0 for none.
 * @default 0
 * 
 * @arg Restrict
 * @text Restrictions
 *
 * @arg NonLandableRegions:arraynum
 * @text Non-Land Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions forbid Smart Jump from landing on it?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonLandableTerrainTags:arraynum
 * @text Non-Land Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags forbid Smart Jump from landing on it?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonPassableRegions:arraynum
 * @text Non-Pass Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions will block Smart Jump from going further?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 *
 * @arg NonPassableTerrainTags:arraynum
 * @text Non-Pass Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags will block Smart Jump from going further?
 * Adds to map, tileset, and Plugin Parameter settings.
 * @default []
 * 
 * @arg Visual
 * @text Visuals
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Visual
 * @type animation
 * @desc What animation do you wish to play on the player
 * if the player can Smart Jump?
 * @default 0
 *
 * @arg MotionTrail:struct
 * @text Motion Trail Settings
 * @parent Visual
 * @type struct<MotionTrail>
 * @desc Adjust the motion trail settings for this Smart Movement.
 * @default {"General":"","enabled:eval":"true","Settings":"","delay:num":"4","duration:num":"30","hue:num":"0","opacityStart:num":"128","tone:eval":"[0, 0, 0, 0]"}
 * 
 * @arg SoundEffect
 * @text Sound Effect
 *
 * @arg sfxName:str
 * @text Filename
 * @parent SoundEffect
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played for a successful Smart Jump.
 * @default Jump1
 *
 * @arg sfxVolume:num
 * @text Volume
 * @parent SoundEffect
 * @type number
 * @max 100
 * @desc Volume of the sound effect played for a successful Smart Jump.
 * @default 50
 *
 * @arg sfxPitch:num
 * @text Pitch
 * @parent SoundEffect
 * @type number
 * @desc Pitch of the sound effect played for a successful Smart Jump.
 * @default 120
 *
 * @arg sfxPan:num
 * @text Pan
 * @parent SoundEffect
 * @desc Pan of the sound effect played for a successful Smart Jump.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartRushDistance
 * @text SMART: Smart Rush X Tiles
 * @desc Player uses "Smart Rush" to rush forward a distance.
 * If this is last listed command, this can collide with events.
 * 
 * @arg Mechanics
 *
 * @arg Distance:eval
 * @text Distance
 * @parent Mechanics
 * @desc How many tiles will player charge forward?
 * You may use JavaScript code.
 * @default 5
 *
 * @arg Cooldown:eval
 * @text Cooldown
 * @parent Mechanics
 * @desc How many frames must the player wait before reuse?
 * You may use JavaScript code.
 * @default 30
 *
 * @arg OnSuccessCommonEventID:eval
 * @text Common Event ID
 * @parent Mechanics
 * @type common_event
 * @desc If the Smash Rush is successful, play this Common Event
 * as a Once Parallel. Use 0 for none.
 * @default 0
 *
 * @arg Switches:arraynum
 * @text Switch(es)
 * @parent Mechanics
 * @type switch[]
 * @desc Which Switch(es) will turn ON during Smart Rush?
 * This Switch(es) will also turn OFF after.
 * @default []
 * 
 * @arg Visual
 * @text Visuals
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Visual
 * @type animation
 * @desc What animation do you wish to play on the player
 * if the player can Smart Rush?
 * @default 0
 *
 * @arg MotionTrail:struct
 * @text Motion Trail Settings
 * @parent Visual
 * @type struct<MotionTrail>
 * @desc Adjust the motion trail settings for this Smart Movement.
 * @default {"General":"","enabled:eval":"true","Settings":"","delay:num":"1","duration:num":"30","hue:num":"0","opacityStart:num":"128","tone:eval":"[192, 0, 192, 128]"}
 *
 * @arg SpeedRate:eval
 * @text Speed Rate
 * @parent Visual
 * @desc How much faster is "Smart Rush" compared to Dashing?
 * You may use JavaScript code.
 * @default 1.50
 * 
 * @arg SoundEffect
 * @text Sound Effect
 *
 * @arg sfxName:str
 * @text Filename
 * @parent SoundEffect
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played for a successful Smart Rush.
 * @default Wind1
 *
 * @arg sfxVolume:num
 * @text Volume
 * @parent SoundEffect
 * @type number
 * @max 100
 * @desc Volume of the sound effect played for a successful Smart Rush.
 * @default 50
 *
 * @arg sfxPitch:num
 * @text Pitch
 * @parent SoundEffect
 * @type number
 * @desc Pitch of the sound effect played for a successful Smart Rush.
 * @default 120
 *
 * @arg sfxPan:num
 * @text Pan
 * @parent SoundEffect
 * @desc Pan of the sound effect played for a successful Smart Rush.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartMoveWaitForSmartBlink
 * @text SMART: Wait for Smart Blink
 * @desc Waits for player to finish Smart Blinking before continuing.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartMoveWaitForSmartJump
 * @text SMART: Wait for Smart Jump
 * @desc Waits for player to finish Smart Jumping before continuing.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmartMoveWaitForSmartRush
 * @text SMART: Wait for Smart Rush
 * @desc Waits for player to finish Smart Rushing before continuing.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SmoothCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_SmoothCamera
 * @text Category - Smooth Camera
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmoothCameraEnableDisable
 * @text SMOOTH CAMERA: Enable/Disable
 * @desc Enable or Disable the Smooth Camera.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Smooth Camera ON
 * @off Smooth Camera OFF
 * @desc Enables or Disables Smooth Camera.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SmoothCameraSpeedChange
 * @text SMOOTH CAMERA: Speed Change
 * @desc Change the scrolling speed for the Smooth Camera.
 *
 * @arg WalkSpeed
 * @text Walking Speed
 *
 * @arg HorzWalk:num
 * @text Horizontal Rate
 * @parent WalkSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Horizontal walking scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 24
 *
 * @arg VertWalk:num
 * @text Vertical Rate
 * @parent WalkSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Vertical walking scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 24
 *
 * @arg DashSpeed
 * @text Dashing Speed
 *
 * @arg HorzDash:num
 * @text Horizontal Rate
 * @parent DashSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Horizontal dashing scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 16
 *
 * @arg VertDash:num
 * @text Vertical Rate
 * @parent DashSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Vertical dashing scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 16
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param MovementEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param DustCloud:struct
 * @text Dust Cloud Settings
 * @type struct<DustCloud>
 * @desc Adjust the settings for kicked up dust clouds whenever a character is dashing.
 * @default {"Default":"","Enabled:eval":"true","Appearance":"","filename:str":"","color:str":"#ffffff","radius:num":"24","fullness:num":"0.20","Animation":"","wholeDuration:num":"20","startOpacity:num":"192","startScale:num":"0.2"}
 *
 * @param Footprints:struct
 * @text Footprint Marks Settings
 * @type struct<Footprints>
 * @desc Adjust the settings for footprint marks whenever characters walk on the map.
 * @default {"General":"","Enabled:eval":"true","Appearance":"","startOpacity:num":"64","wholeDuration:num":"600","followerVariance:num":"4","MapDefaults":"","DefaultRegions:arraynum":"[]","DefaultTerrainTags:arraynum":"[]","StandardDirections":"","dir2:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"6\\\",\\\"height:num\\\":\\\"8\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"-4\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"6\\\",\\\"height:num\\\":\\\"8\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+4\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir4:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"8\\\",\\\"height:num\\\":\\\"3\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"-6\\\",\\\"offsetY:num\\\":\\\"-4\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"8\\\",\\\"height:num\\\":\\\"3\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"-6\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir6:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"8\\\",\\\"height:num\\\":\\\"3\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+6\\\",\\\"offsetY:num\\\":\\\"-4\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"8\\\",\\\"height:num\\\":\\\"3\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+6\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir8:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"6\\\",\\\"height:num\\\":\\\"8\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+4\\\",\\\"offsetY:num\\\":\\\"-4\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"6\\\",\\\"height:num\\\":\\\"8\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"-4\\\",\\\"offsetY:num\\\":\\\"-4\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","DiagonalDirections":"","dir1:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir3:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir7:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}","dir9:struct":"{\"pattern0:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern1:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern2:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern3:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern4:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern5:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern6:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern7:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern8:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern9:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\",\"pattern10:struct\":\"{\\\"Appearance\\\":\\\"\\\",\\\"filename:str\\\":\\\"\\\",\\\"Generated\\\":\\\"\\\",\\\"width:num\\\":\\\"0\\\",\\\"height:num\\\":\\\"0\\\",\\\"Offsets\\\":\\\"\\\",\\\"offsetX:num\\\":\\\"+0\\\",\\\"offsetY:num\\\":\\\"+0\\\"}\"}"}
 *
 * @param Footsteps:struct
 * @text Footstep Sounds Settings
 * @type struct<Footsteps>
 * @desc Adjust the settings for the sounds footsteps make whenever characters walk on the map.
 * @default {"General":"","Enabled:eval":"true","SoundByFrame:eval":"true","Frames:arraynum":"[\"0\",\"2\"]","FrameDashModifier:num":"1.5","Default":"","name:str":"Blow2","volume:num":"10","pitch:num":"120","pan:num":"0","Distance":"","distanceVolumeModifier:num":"-0.50","distancePitchModifier:num":"-0.00","distancePanModifier:num":"5","Actor":"","actorEnabled:eval":"true","actorVolumeModifier:num":"1.00","actorPitchModifier:num":"1.00","Event":"","eventEnabled:eval":"true","eventVolumeModifier:num":"1.00","eventPitchModifier:num":"1.00"}
 *
 * @param SmartBlink:struct
 * @text Smart Blink Settings
 * @type struct<SmartBlink>
 * @desc Settings involving the Smart Blink movement ability.
 * @default {"Mechanics":"","allowDiagonal:eval":"false","Visual":"","BlurDuration:num":"30","AngleOffset:num":"-15","Restrict":"","NonLandableRegions:arraynum":"[]","NonLandableTerrainTags:arraynum":"[]","NonPassableRegions:arraynum":"[]","NonPassableTerrainTags:arraynum":"[]"}
 *
 * @param SmartJump:struct
 * @text Smart Jump Settings
 * @type struct<SmartJump>
 * @desc Settings involving the Smart Jump movement ability.
 * @default {"Mechanics":"","allowDiagonal:eval":"false","HeightBasedRegions:arraynum":"[]","Restrict":"","NonLandableRegions:arraynum":"[]","NonLandableTerrainTags:arraynum":"[]","NonPassableRegions:arraynum":"[]","NonPassableTerrainTags:arraynum":"[]"}
 *
 * @param SmartRush:struct
 * @text Smart Rush Settings
 * @type struct<SmartRush>
 * @desc Settings involving the Smart Rush movement ability.
 * @default {"Mechanics":"","allowDiagonal:eval":"false","Visual":"","BlurDuration:num":"30","AngleOffset:num":"15","Shake":"","Enable:eval":"true","ShakePowerRate:num":"3.0","ShakeSpeedRate:num":"3.0","ShakeDuration:num":"20","NonCrash":"","NonCrashRegions:arraynum":"[]","NonCrashTerrainTags:arraynum":"[]"}
 *
 * @param SmoothCamera:struct
 * @text Smooth Camera Scrolling
 * @type struct<SmoothCamera>
 * @desc Adjust the settings for smooth camera scrolling while the player moves.
 * @default {"Default":"","Enabled:eval":"true","WalkSpeed":"","HorzWalk:num":"24","VertWalk:num":"24","DashSpeed":"","HorzDash:num":"16","VertDash:num":"16"}
 *
 * @param Options:struct
 * @text Options Menu Settings
 * @type struct<Options>
 * @desc Options settings for this plugin's various features.
 * @default {"Options":"","AdjustRect:eval":"true","DustCloud":"","AddDustCloud:eval":"true","DustCloudName:str":"Dust Clouds","Footprints":"","AddFootprints:eval":"true","FootprintsName:str":"Footprint Marks","Footsteps":"","AddFootsteps:eval":"true","FootstepsName:str":"Footstep Sounds","SmoothCamera":"","AddSmoothCamera:eval":"true","SmoothCameraName:str":"Smooth Scroll"}
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
 * Dust Cloud Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~DustCloud:
 *
 * @param Default
 *
 * @param Enabled:eval
 * @text Default Enabled?
 * @parent Default
 * @type boolean
 * @on Dust Clouds ON
 * @off Dust Clouds OFF
 * @desc Are Dust Clouds enabled by default?
 * @default true
 * 
 * @param Appearance
 * 
 * @param filename:str
 * @text Filename
 * @parent Appearance
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename of the Dust Cloud. Leave empty if using none.
 * @default 
 *
 * @param color:str
 * @text Color
 * @parent Appearance
 * @desc Color of the dust cloud in #rrggbb format.
 * For generated dust clouds only. Ignore if using image.
 * @default #ffffff
 *
 * @param radius:num
 * @text Radius
 * @parent Appearance
 * @type number
 * @min 1
 * @desc What is the max radius of this dust cloud?
 * For generated dust clouds only. Ignore if using image.
 * @default 24
 *
 * @param fullness:num
 * @text Fullness
 * @parent Appearance
 * @desc What is the fullness level (0.0 to 1.0)?
 * For generated dust clouds only. Ignore if using image.
 * @default 0.20
 * 
 * @param Animation
 *
 * @param wholeDuration:num
 * @text Duration
 * @parent Animation
 * @type number
 * @min 1
 * @desc How many frames will a dust cloud remain on screen?
 * @default 20
 *
 * @param startOpacity:num
 * @text Starting Opacity
 * @parent Animation
 * @type number
 * @min 1
 * @max 255
 * @desc What is the starting opacity (0-255)?
 * Dust cloud opacity will gradually go to 0.
 * @default 192
 *
 * @param startScale:num
 * @text Starting Scale
 * @parent Animation
 * @desc What is the starting scale (0.0 to 1.0)?
 * Dust cloud scale will gradually go to 1.0.
 * @default 0.2
 *
 */
/* ----------------------------------------------------------------------------
 * Footprints Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Footprints:
 *
 * @param General
 *
 * @param Enabled:eval
 * @text Default Enabled?
 * @parent General
 * @type boolean
 * @on Footprint Marks ON
 * @off Footprint Marks OFF
 * @desc Are footprint marks enabled by default?
 * @default true
 *
 * @param Appearance
 *
 * @param startOpacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 1
 * @max 255
 * @desc What is the starting opacity of the footprint?
 * @default 64
 *
 * @param wholeDuration:num
 * @text Duration
 * @parent Appearance
 * @type number
 * @desc How many frames will footprints remain on the screen before disappearing?
 * @default 600
 *
 * @param followerVariance:num
 * @text Follower Variance
 * @parent Appearance
 * @type number
 * @desc What variance should followers have for their footprints?
 * This is to avoid them all stepping in the same place.
 * @default 4
 * 
 * @param MapDefaults
 * @text Map Defaults
 *
 * @param DefaultRegions:arraynum
 * @text Regions
 * @parent MapDefaults
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which Regions will have footprints appear by default?
 * @default []
 *
 * @param DefaultTerrainTags:arraynum
 * @text Terrain Tags
 * @parent MapDefaults
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which terrain tags will have footprints appear by default?
 * @default []
 * 
 * @param StandardDirections
 * @text Standard Directions
 * 
 * @param dir2:struct
 * @text Down
 * @parent StandardDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"6\",\"height:num\":\"8\",\"Offsets\":\"\",\"offsetX:num\":\"-4\",\"offsetY:num\":\"+0\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"6\",\"height:num\":\"8\",\"Offsets\":\"\",\"offsetX:num\":\"+4\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir4:struct
 * @text Left
 * @parent StandardDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"8\",\"height:num\":\"3\",\"Offsets\":\"\",\"offsetX:num\":\"-6\",\"offsetY:num\":\"-4\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"8\",\"height:num\":\"3\",\"Offsets\":\"\",\"offsetX:num\":\"-6\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir6:struct
 * @text Right
 * @parent StandardDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"8\",\"height:num\":\"3\",\"Offsets\":\"\",\"offsetX:num\":\"+6\",\"offsetY:num\":\"-4\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"8\",\"height:num\":\"3\",\"Offsets\":\"\",\"offsetX:num\":\"+6\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir8:struct
 * @text Up
 * @parent StandardDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"6\",\"height:num\":\"8\",\"Offsets\":\"\",\"offsetX:num\":\"+4\",\"offsetY:num\":\"-4\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"6\",\"height:num\":\"8\",\"Offsets\":\"\",\"offsetX:num\":\"-4\",\"offsetY:num\":\"-4\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param DiagonalDirections
 * @text Diagonal Directions
 * 
 * @param dir1:struct
 * @text Lower Left
 * @parent DiagonalDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir3:struct
 * @text Lower Right
 * @parent DiagonalDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir7:struct
 * @text Upper Left
 * @parent DiagonalDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 * 
 * @param dir9:struct
 * @text Upper Right
 * @parent DiagonalDirections
 * @type struct<FootprintPattern>
 * @desc Settings used for footprints when facing moving direction.
 * For normal sprite sheets: 0's left, 1's center, 2's right.
 * @default {"pattern0:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern1:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern2:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern3:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern4:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern5:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern6:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern7:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern8:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern9:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","pattern10:struct":"{\"Appearance\":\"\",\"filename:str\":\"\",\"Generated\":\"\",\"width:num\":\"0\",\"height:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}"}
 *
 */
/* ----------------------------------------------------------------------------
 * Footprint Pattern Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FootprintPattern:
 * 
 * @param pattern0:struct
 * @text Pattern 0 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern1:struct
 * @text Pattern 1 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern2:struct
 * @text Pattern 2 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern3:struct
 * @text Pattern 3 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern4:struct
 * @text Pattern 4 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern5:struct
 * @text Pattern 5 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern6:struct
 * @text Pattern 6 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern7:struct
 * @text Pattern 7 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern8:struct
 * @text Pattern 8 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern9:struct
 * @text Pattern 9 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param pattern10:struct
 * @text Pattern 10 Settings
 * @type struct<FootprintPatternData>
 * @desc Settings used for footprints left behind with this sprite pattern.
 * @default {"Appearance":"","filename:str":"","Generated":"","width:num":"0","height:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 */
/* ----------------------------------------------------------------------------
 * Footprint Pattern Data Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FootprintPatternData:
 *
 * @param Appearance
 *
 * @param filename:str
 * @text Filename
 * @parent Appearance
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename used for a footprint for this data.
 * If used, ignore generated footprint settings.
 * @default 
 *
 * @param Generated
 *
 * @param width:num
 * @text Width
 * @parent Generated
 * @type number
 * @desc What is the width of this footprint?
 * Ignore if using an image.
 * @default 0
 *
 * @param height:num
 * @text Height
 * @parent Generated
 * @type number
 * @desc What is the height of this footprint?
 * Ignore if using an image.
 * @default 0
 *
 * @param Offsets
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offsets
 * @desc Offset the X position of this footprint.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offsets
 * @desc Offset the Y position of this footprint.
 * Negative: up. Positive: down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Footsteps Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Footsteps:
 *
 * @param General
 *
 * @param Enabled:eval
 * @text Default Enabled?
 * @parent General
 * @type boolean
 * @on Footstep Sounds ON
 * @off Footstep Sounds OFF
 * @desc Are footstep sounds enabled by default?
 * @default true
 *
 * @param SoundByFrame:eval
 * @text Sound by Frame?
 * @parent General
 * @type boolean
 * @on Sounds by Frames
 * @off Sounds by Steps
 * @desc Play footstep sounds at certain sprite frames or with each tile step?
 * @default true
 *
 * @param Frames:arraynum
 * @text Audible Frame(s)
 * @parent SoundByFrame:eval
 * @type number[]
 * @desc Which sprite sheet "frames" will play a sound?
 * Sprite sheet Frames start at 0.
 * @default ["0","2"]
 *
 * @param FrameWalkModifier:num
 * @text Walk Ani Modifier
 * @parent General
 * @desc What is the rate at which animations play for walking?
 * This is to ensure the sound effects synch up.
 * @default 1.0
 *
 * @param FrameDashModifier:num
 * @text Dash Ani Modifier
 * @parent General
 * @desc What is the rate at which animations play for dashing?
 * This is to ensure the sound effects synch up.
 * @default 1.5
 *
 * @param Default
 * @text Default Sound
 * 
 * @param name:str
 * @text Filename
 * @parent Default
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played.
 * @default Blow2
 *
 * @param volume:num
 * @text Volume
 * @parent Default
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 10
 *
 * @param pitch:num
 * @text Pitch
 * @parent Default
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param pan:num
 * @text Pan
 * @parent Default
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param Distance
 *
 * @param distanceVolumeModifier:num
 * @text Volume Modifier
 * @parent Distance
 * @desc Modifier per tile distance away from the player.
 * Use a decimal value.
 * @default -0.50
 *
 * @param distancePitchModifier:num
 * @text Pitch Modifier
 * @parent Distance
 * @desc Modifier per tile distance away from the player.
 * Use a decimal value.
 * @default -0.00
 *
 * @param distancePanModifier:num
 * @text Pan Modifier
 * @parent Distance
 * @desc Modifier per tile distance away from the player.
 * Use an integer value.
 * @default 5
 *
 * @param Actor
 * @text Actor Modifiers
 *
 * @param actorEnabled:eval
 * @text Enabled for Actors?
 * @parent Actor
 * @type boolean
 * @on Footstep Sounds ON
 * @off Footstep Sounds OFF
 * @desc Are footstep sounds enabled for actors by default?
 * @default true
 *
 * @param actorVolumeModifier:num
 * @text Volume Modifier
 * @parent Actor
 * @desc Volume modifier rate for actors.
 * Use a decimal value.
 * @default 1.00
 *
 * @param actorPitchModifier:num
 * @text Pitch Modifier
 * @parent Actor
 * @desc Pitch modifier rate for actors.
 * Use a decimal value.
 * @default 1.00
 *
 * @param Event
 * @text Event Modifiers
 *
 * @param eventEnabled:eval
 * @text Enabled for Events?
 * @parent Event
 * @type boolean
 * @on Footstep Sounds ON
 * @off Footstep Sounds OFF
 * @desc Are footstep sounds enabled for events by default?
 * @default true
 *
 * @param eventVolumeModifier:num
 * @text Volume Modifier
 * @parent Event
 * @desc Volume modifier rate for events.
 * Use a decimal value.
 * @default 1.00
 *
 * @param eventPitchModifier:num
 * @text Pitch Modifier
 * @parent Event
 * @desc Pitch modifier rate for events.
 * Use a decimal value.
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * Smart Blink Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SmartBlink:
 *
 * @param Mechanics
 *
 * @param allowDiagonal:eval
 * @text Allow Diagonal Blink?
 * @parent Mechanics
 * @type boolean
 * @on Allow for VS8-Only
 * @off Forbidden
 * @desc Allow diagonal Smart Blinking?
 * VS8 Sprites only. Does NOT work with standard RTP.
 * @default false
 *
 * @param floorToCeiling:eval
 * @text Floor to Ceiling?
 * @parent Mechanics
 * @type boolean
 * @on Allow
 * @off Forbidden
 * @desc Allow blinking from floor to ceiling tiles?
 * @default false
 * 
 * @param Visual
 *
 * @param BlurDuration:num
 * @text Blur Duration
 * @parent Visual
 * @type number
 * @min 1
 * @desc Requires PixiJS Filters! How long will the motion blur last?
 * @default 30
 *
 * @param AngleOffset:num
 * @text Blur Angle Offset
 * @parent Visual
 * @desc Requires PixiJS Filters! Offset the motion blur angle by this many degrees.
 * @default -15
 * 
 * @param Restrict
 * @text Restrictions
 *
 * @param NonLandableRegions:arraynum
 * @text Non-Land Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions forbid Smart Blink from landing on it?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonLandableTerrainTags:arraynum
 * @text Non-Land Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags forbid Smart Blink from landing on it?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonPassableRegions:arraynum
 * @text Non-Pass Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions will block Smart Blink from going further?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonPassableTerrainTags:arraynum
 * @text Non-Pass Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags will block Smart Blink from going further?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Smart Jump Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SmartJump:
 *
 * @param Mechanics
 *
 * @param allowDiagonal:eval
 * @text Allow Diagonal Jump?
 * @parent Mechanics
 * @type boolean
 * @on Allow for VS8-Only
 * @off Forbidden
 * @desc Allow diagonal Smart Jumping?
 * VS8 Sprites only. Does NOT work with standard RTP.
 * @default false
 *
 * @param HeightBasedRegions:arraynum
 * @text Height-Based Regions
 * @parent Mechanics
 * @type number[]
 * @min 0
 * @max 255
 * @desc Determine which regions are height-based.
 * The lowest value region will be a "ledge".
 * @default []
 * 
 * @param Restrict
 * @text Restrictions
 *
 * @param NonLandableRegions:arraynum
 * @text Non-Land Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions forbid Smart Jump from landing on it?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonLandableTerrainTags:arraynum
 * @text Non-Land Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags forbid Smart Jump from landing on it?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonPassableRegions:arraynum
 * @text Non-Pass Regions
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 255
 * @desc Which regions will block Smart Jump from going further?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 * @param NonPassableTerrainTags:arraynum
 * @text Non-Pass Terrain Tags
 * @parent Restrict
 * @type number[]
 * @min 0
 * @max 7
 * @desc Which tags will block Smart Jump from going further?
 * These are defaults, which can be replaced by notetags.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Smart Rush Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SmartRush:
 *
 * @param Mechanics
 *
 * @param allowDiagonal:eval
 * @text Allow Diagonal Rush?
 * @parent Mechanics
 * @type boolean
 * @on Allow for VS8-Only
 * @off Forbidden
 * @desc Allow diagonal Smart Rush?
 * VS8 Sprites only. Does NOT work with standard RTP.
 * @default false
 *
 * @param Visual
 *
 * @param BlurDuration:num
 * @text Blur Duration
 * @parent Visual
 * @type number
 * @min 1
 * @desc Requires PixiJS Filters! How long will the motion blur last?
 * @default 30
 *
 * @param AngleOffset:num
 * @text Blur Angle Offset
 * @parent Visual
 * @desc Requires PixiJS Filters! Offset the motion blur angle by this many degrees.
 * @default 15
 *
 * @param Shake
 * @text Crash Shake
 *
 * @param Enable:eval
 * @text Enable Crash Shake?
 * @parent Shake
 * @type boolean
 * @on Enable Crash Shake
 * @off Disable Crash Shake
 * @desc Cause the screen to shake after crashing into an entity?
 * @default true
 *
 * @param ShakePowerRate:num
 * @text Power Rate
 * @parent Shake
 * @desc The power modifier for the screen shake upon crashing into something.
 * @default 3.0
 *
 * @param ShakeSpeedRate:num
 * @text Speed Rate
 * @parent Shake
 * @desc The speed modifier for the screen shake upon crashing into something.
 * @default 3.0
 *
 * @param ShakeDuration:num
 * @text Shaking Duration
 * @parent Shake
 * @type number
 * @min 1
 * @desc How many frames will the screen shake last after crashing into something?
 * @default 20
 *
 * @param NonCrash
 * @text Non-Crash
 *
 * @param NonCrashRegions:arraynum
 * @text Regions
 * @parent NonCrash
 * @type number[]
 * @min 1
 * @max 255
 * @desc When crashing into these region-marked tiles, do not shake the screen.
 * @default []
 *
 * @param NonCrashTerrainTags:arraynum
 * @text Terrain Tags
 * @parent NonCrash
 * @type number[]
 * @min 1
 * @max 7
 * @desc When crashing into these terrain tagged tiles, do not shake the screen.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Smooth Camera Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SmoothCamera:
 *
 * @param Default
 *
 * @param Enabled:eval
 * @text Default Enabled?
 * @parent Default
 * @type boolean
 * @on Smooth Camera ON
 * @off Smooth Camera OFF
 * @desc Is the Smooth Camera enabled by default?
 * @default true
 *
 * @param WalkSpeed
 * @text Walking Speed
 *
 * @param HorzWalk:num
 * @text Horizontal Rate
 * @parent WalkSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Horizontal walking scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 24
 *
 * @param VertWalk:num
 * @text Vertical Rate
 * @parent WalkSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Vertical walking scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 24
 *
 * @param DashSpeed
 * @text Dashing Speed
 *
 * @param HorzDash:num
 * @text Horizontal Rate
 * @parent DashSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Horizontal dashing scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 16
 *
 * @param VertDash:num
 * @text Vertical Rate
 * @parent DashSpeed
 * @type number
 * @min 1
 * @max 48
 * @desc Vertical dashing scroll rate adjustment.
 * Lower: faster; Higher: slower
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param DustCloud
 * @text Dust Cloud
 *
 * @param AddDustCloud:eval
 * @text Add Option?
 * @parent DustCloud
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Dust Clouds' option to the Options menu?
 * @default true
 *
 * @param DustCloudName:str
 * @text Option Name
 * @parent DustCloud
 * @desc Command name of the option.
 * @default Dust Clouds
 *
 * @param Footprints
 * @text Footprint Marks
 *
 * @param AddFootprints:eval
 * @text Add Option?
 * @parent Footprints
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Footprint Marks' option to the Options menu?
 * @default true
 *
 * @param FootprintsName:str
 * @text Option Name
 * @parent Footprints
 * @desc Command name of the option.
 * @default Footprint Marks
 *
 * @param Footsteps
 * @text Footstep Sounds
 *
 * @param AddFootsteps:eval
 * @text Add Option?
 * @parent Footsteps
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Footstep Sounds' option to the Options menu?
 * @default true
 *
 * @param FootstepsName:str
 * @text Option Name
 * @parent Footsteps
 * @desc Command name of the option.
 * @default Footstep Sounds
 *
 * @param SmoothCamera
 * @text Smooth Camera
 *
 * @param AddSmoothCamera:eval
 * @text Add Option?
 * @parent SmoothCamera
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Smooth Scroll' option to the Options menu?
 * @default true
 *
 * @param SmoothCameraName:str
 * @text Option Name
 * @parent SmoothCamera
 * @desc Command name of the option.
 * @default Smooth Scroll
 *
 */
/* ----------------------------------------------------------------------------
 * Motion Trail Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MotionTrail:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Override?
 * @parent General
 * @type boolean
 * @on Override Settings
 * @off Don't Override Settings
 * @desc Override Motion Trail settings temporarily?
 * @default true
 *
 * @param Settings
 *
 * @param delay:num
 * @text Delay
 * @parent Settings
 * @type number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 4
 *
 * @param duration:num
 * @text Duration
 * @parent Settings
 * @type number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @param hue:num
 * @text Hue
 * @parent Settings
 * @type number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @param opacityStart:num
 * @text Starting Opacity
 * @parent Settings
 * @type number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 128
 *
 * @param tone:eval
 * @text Tone
 * @parent Settings
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 */
//=============================================================================

const _0x3b896f=_0x5f1e;(function(_0x2351a7,_0x26f2f7){const _0x3d6782=_0x5f1e,_0x1bc9fe=_0x2351a7();while(!![]){try{const _0x10fbba=parseInt(_0x3d6782(0x2cd))/0x1+parseInt(_0x3d6782(0x312))/0x2+-parseInt(_0x3d6782(0x3ef))/0x3*(-parseInt(_0x3d6782(0x127))/0x4)+-parseInt(_0x3d6782(0x143))/0x5+parseInt(_0x3d6782(0x335))/0x6*(parseInt(_0x3d6782(0x287))/0x7)+parseInt(_0x3d6782(0x149))/0x8*(parseInt(_0x3d6782(0x1c8))/0x9)+-parseInt(_0x3d6782(0x355))/0xa*(parseInt(_0x3d6782(0x2ee))/0xb);if(_0x10fbba===_0x26f2f7)break;else _0x1bc9fe['push'](_0x1bc9fe['shift']());}catch(_0x51260a){_0x1bc9fe['push'](_0x1bc9fe['shift']());}}}(_0x30d5,0x4c9ad));var label=_0x3b896f(0x352),tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine','VisuMZ_1_EventsMoveCore'],pluginData=$plugins[_0x3b896f(0x3e8)](function(_0x3020f1){const _0x441c69=_0x3b896f;return _0x3020f1['status']&&_0x3020f1[_0x441c69(0x339)][_0x441c69(0x179)]('['+label+']');})[0x0];function _0x5f1e(_0x33b77c,_0x1b39db){const _0x30d51f=_0x30d5();return _0x5f1e=function(_0x5f1ee7,_0x91bf43){_0x5f1ee7=_0x5f1ee7-0x112;let _0xe10cc3=_0x30d51f[_0x5f1ee7];return _0xe10cc3;},_0x5f1e(_0x33b77c,_0x1b39db);}function _0x30d5(){const _0x4c63ad=['_frame','randomizeAnimationCount','smartRushMotionTrailData','call','MotionTrailSettingsChangeFollower','ForceSmooth','toLowerCase','CJlnr','SmartDirMoveSpeedMod','Distance','createBitmap','smoothCamera','left','updatePosition','ZBGJM','actor','zMOnx','clone','Game_CharacterBase_updateAnimationCount','_smartBlinkDistance','_followerOffsetY','getLastPluginCommandInterpreter','ARRAYSTR','createMotionBlurMovementEffectsFilter','createRadialGradient','Footprints','OnSuccessCommonEventID','requestAnimation','isSmartJumpRegionLowestHeight','smartBlink','setDirMoveSpeedMod','AddFootprints','STRUCT','width','uPCWD','NoFootprintsEvent','_targetScaleX','initMembers','isTileSmartBlinkNonPassable','_ready','ifTiH','ngYPi','Duration','Spriteset_Map_updateTilemap','createDustCloudBitmap','Game_Event_setupPageSettings','smartRush','dir3','lineTo','kDeGb','eventId','SmartBlinkNonLandRegions','isSmartRushCrashShake','SmartJumpNonPassTerrainTags','parseRegionBasedFootstepSounds','Enable','pattern','constructor','setMotionTrailSettings','GmULJ','isOnLadder','LedgeJumpRegion','SMART_BLINK_FLOOR_TO_CEILING','175CKoThb','scrollRight','ouRLD','floor','initMovementEffectsFootstepSounds','scaleY','Rkoeg','isScrolling','NonLandableRegions','NoTerrainTagFootstepSfx','parseTerrainTagBasedSmartRush','PUPSB','_customModified','canSmoothScroll','leader','mRBbk','YXVjU','SmartRushAntiCrashTerrainTags','_smartRushSpeedRate','NoSmooth','createIconSprite','isTransparent','addMovementEffectsOptionCommands','startOpacity','MotionTrailSettingsChangeEvent','NonFootprintTerrainTags','createLowerLayer','BlurDuration','split','_footprintsData','HXdUF','startSmartRushCrashShake','centerX','isSceneMap','FrameDashModifier','tileWidth','MovementEffectsOptions','pop','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','VVpzH','VertWalk','adjustX','_cached_GeneratedFootprint_Image','orYsC','updateSmartJumpCooldown','makeDeepCopy','changeTileset','isSmartRushCrashShakeTile','addMovementEffectsSmoothCameraCommand','moveBySmartRush','canSmartRush','distancePanModifier','NonPassableRegions','dir4','ShakePowerRate','indexOf','_tilemap','startSmartJump','NoSmartRush','JBHbI','isTileSmartJumpCompatible','addChild','join','isSmartRushing','applyData','setWaitMode','setSmoothCameraEnabled','HtEJA','isLadder','Game_Map_parallaxOy','22210iiPiGZ','parse','sort','RyZqd','map','FootprintsName','_erased','locate','RegionFootstepSfx','dir8','smooth','stringify','initMovementEffectsMotionTrails','regions','QbCMT','Game_Map_parallaxOx','pattern%1','isTileSmartBlinkNonLandable','FootstepsName','NoSmartJump','utKZp','startSmartRushCrashWalkBack','isSmartJumpEnabled','createSmartBlinkMotionTrailSprite','processSmartJumpHeightFactor','setupDuration','tone','Sprite_Picture_updatePosition','origin','parseDirectionText','_direction','sljfU','dir1','11QoXqcd','checkPassage','FootprintsHeight','_smartRush','eventVolumeModifier','_smartRushSwitches','CgrVX','Game_CharacterBase_updatePattern','_terrainTagFootstepSounds','parallaxOx','_motionBlurMovementEffectsAngleOffset','_followers','setupRegionTerrainTagSmartBlink','ARRAYNUM','push','createDustCloud','_smoothCamera','mWojS','ceil','pitch','isTileSmartJumpBreakable','OIFbL','nnCzI','Game_Player_updateScroll','_smartBlinkRestrictions','concat','_pictureContainer','updateScrollLinkedPosition','isVisible','center','createMotionTrailContainers','checkEventTriggerHere','wGzci','parseRegionBasedSmartJump','setColorTone','isSmartMoveNonViableState','855064SjFshY','ConvertParams','applyMotionTrailData','canPass','FootstepsVolRate','VUFSt','uskww','cHTNp','NonCrashRegions','FootprintsFilename','initRegionTerrainTagSmartRush','SMART_RUSH_SHAKE_ENABLED','isTrueMapScrollLinked','RegionFootprintOpacity','dir%1','regionId','isSmartJumping','generatedFootprintBitmap','bkOnG','parseTerrainTagBasedFootstepSounds','hue','jKKBi','createFootprintForTarget','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Game_CharacterBase_realMoveSpeed','Spriteset_Map_createLowerLayer','Cooldown','updateSmartJumpState','substring','findTargetSprite','initRegionTerrainTagFootstepSounds','AnimationID','createMotionTrailSprite','isMoving','isTileSmartJumpNonLandable','114960DtrkxC','match','isSmartBlinkEnabled','dustCloudData','description','updateOpacity','sryXi','canShowDustCloud','FootstepsEnableDisable','startScale','Sprite_Character_initialize','kGOSM','yDwrx','addMovementEffectsFootprintsCommand','isHeightBasedRegion','JsCKq','animationWait','bitmap','readFlag','_dirMoveSpeedMod','MotionTrailCreateForFollower','setDirection','Frames','update','right','randomInt','canCreateDustCloud','_smartJumpMotionTrailData','nLLGK','MovementEffects','startShake','_duration','6907980nBxpEE','setupRegionTerrainTagSmartRush','zlKgc','updateDustCloudSprite','FrameWalkModifier','_smartJumpCooldown','straightenFacedDirection','Game_Player_moveByInput','sfxVolume','scrolledX','ZazJJ','picture','MotionBlurFilter','sin','Game_CharacterBase_straighten','addGeneralOptions','fullness','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','executeMove','loadPicture','initRegionTerrainTagFootprints','canShowMotionTrails','_smartRushCooldown','scaleX','xEwOi','_baseSprite','setSmoothCameraSpeed','ImmediateCreate','NwuzZ','isInAirship','xqXea','FootprintRegions','beginPath','NoFootstepsEvent','UDqgp','setupMovementEffectsVariables','ForceFootsteps','_motionTrailLastRealY','setupRegionTerrainTagFootstepSounds','reserveTransfer','smartJump','EVAL','Scene_Options_maxCommands','smartBlinkMotionTrailData','Game_Follower_initialize','FootstepsFrames','bxswN','roundXWithDirection','dir9','bqDuZ','WLwwL','playOnceParallelInterpreter','updateMotionTrailSprites','note','footprintDurationAtXy','_smartBlinkMotionTrailData','offsetY','volumeRate','playFootsteps','SJuNx','mhHlQ','MotionTrailCreateForEvent','visibleFollowers','duration','eventPitchModifier','QqrKf','jVrxL','isSmartRushEnabled','name','_smartRushMotionTrailData','isJumping','SMART_RUSH_FILTER_ANGLE_OFFSET','parameters','getSmoothCameraSpeed','Walk','canSmartJump','AddDustCloud','areFollowersGathering','event','copyBasicProperties','AngleOffset','SmartRushAntiCrashRegions','setup','hPQxL','isSmoothCameraEnabled','FootprintsWidth','pwbvN','measureSmartBlinkDistance','eventEnabled','tileset','ARRAYEVAL','LVviS','exit','canMakeFootstepSounds','setSmartRushSwitch','XpJWQ','_eventIconSprite','mRadialArcConstant','KGLGT','scale','pitchRate','_footstepSoundsEnabled','SmartJumpHeightBasedRegions','increaseSteps','Blow2','shiftY','AdjustRect','HorzWalk','ApplyFollowers','abs','Footsteps','addColorStop','SMART_RUSH_FILTER_DURATION','SMART_RUSH_SHAKE_DURATION','QznFE','isMapScrollLinked','IGDJR','RwsoT','isUsingSmoothCamera','isTileSmartHeightJumpRegion','rNgeF','_smartBlinkCooldown','loadSystem','_footstepCooldownDuration','jumpHeight','SMART_RUSH_SHAKE_SPEED_RATE','SMART_BLINK_FILTER_ANGLE_OFFSET','addCommand','remove','tileHeight','YesFootstepsEvent','isCeilingTile','updatePattern','startBattle','pan','visible','blendMode','updateMovementEffectsMotionTrails','updateAnimationCount','SmoothCameraName','dustCloud','gQdGl','prototype','dir2','setDustCloudData','checkMovementEffectsStringTags','isInVehicle','filter','Index','Game_Picture_scaleY','footprints','getDirMoveSpeedMod','followers','removeChild','34140BSALqZ','Enabled','copyBitmapFrame','updateSmartBlinkCooldown','dir7','Options','applyFootstepSoundTileChanges','vert','YesFootprintsEvent','parseTerrainTagBasedSmartBlink','DustCloud','_dustCloudSprites','format','QjOKK','length','NoWtm','adjustY','_footprints','hasStepAnime','data','meetFootstepFrames','normal','Game_Picture_isMapScrollLinked','OMvwU','HeightBasedRegions','_scene','parseRegionBasedSmartRush','_targetScaleY','roundYWithDirection','Window_Options_addGeneralOptions','clamp','_stopCount','FootprintsOffset','_motionBlurMovementEffectsFilter','_animationCount','setFootstepSoundsEnabled','meetsSmartJumpHeightConditions','ySXHq','_dustCloudData','XJCBo','wholeDuration','footprintOpacityAtXy','initMovementEffectsDustCloud','32LXItki','distancePitchModifier','HcVwA','NoFootsteps','ConfigManager_makeData','SpeedRate','scrollLeft','initMovementEffectsDirMoveSpeedMod','SMART_BLINK_FILTER_DURATION','LYhZY','velocity','_jumpHeight','zpkDh','Game_Event_clearPageSettings','MotionTrailEnableFollower','ICytj','_footprintMarksEnabled','_regionFootstepSounds','WfjJG','_motionBlurMovementEffectsDuration','upper\x20left','terrainTag','_smartJumpRestriction','canMakeFootprints','_dustCloudBitmap','sfxName','arc','random','1894930lSvQeU','filters','sfxPitch','MJnFN','autotileType','_footsteps','40YVNbta','makeData','_lastSmoothScrollX','lower\x20right','addMovementEffectsDustCloudCommand','CUZUX','sfxPan','radius','aoeZw','initMovementEffectsFootprintMarks','Game_Picture_scaleX','smartBlinkRelocate','SmartJump','updateSmoothScrollingContainer','initMovementEffectsSmoothCamera','racfq','Game_Player_reserveTransfer','ConfigManager_applyData','STR','scrolledY','_smartJump','RegionFootprintDuration','updateCharacterFrame','page','htjsh','_character','MotionTrailEnableEvent','parseRegionBasedFootprints','DustCloudName','drawCircle','BattleManager_startBattle','SmartBlinkNonPassRegions','_motionTrailSettings','_jumpPeak','mXCys','setupOpacity','footprintsData','parallaxOy','GjyxB','list','initialize','FHKZH','setFootprintsEnabled','Game_System_initialize','eventsXy','EventID','Game_Player_isDashing','Sprite_Character_update','includes','wGMjO','allowDiagonal','smartJumpMotionTrailData','setupRegionTerrainTagSmartJump','VdZpW','zoomScale','isCollidedWithCharacters','RLtKz','RMGgh','NonLandableTerrainTags','filename','isAnimationPlaying','getStraightenDiagonalDirection','SmartRush','updateSmartMovementCooldowns','Game_Map_changeTileset','TerrainTagFootprintOpacity','parseTerrainTagBasedFootprints','updateDustClouds','Game_CharacterBase_increaseSteps','MotionBlurEvent','_motionTrailLastRealX','straighten','ZmsdF','_wasEventScrolling','iWtbF','MotionTrail','DefaultRegions','trim','YmSbS','_realY','anchor','lVMvJ','SmartBlinkNonPassTerrainTags','upper\x20right','direction','deltaXFrom','footsteps','addMovementEffectsFootstepsCommand','XKEqt','madyP','startMotionBlurEffect','height','updateSmartRushCooldown','create','_refresh','code','BPOKo','test','Spriteset_Map_update','Game_Map_setup','fsmpG','ktPzM','SMART_RUSH_SHAKE_POWER_RATE','_baseTexture','color','_smartJumpRestrictions','follower','nonPass','_motionTrailSprites','Settings','ilsha','bind','isValid','_footprintSprites','_motionTrailExpiredSprites','NonPassableTerrainTags','endSmartRush','paintOpacity','SmoothCamera','createFootprintBasics','VertDash','notSmartJumpLandable','updateFootprintSprite','vCPvN','horz','opacity','ShakeDuration','654795bJtBCb','TerrainTagFootstepSfx','SoundByFrame','_smartJumpMode','isTileSmartBlinkCompatible','actorEnabled','tmZXx','ApplyFootstepSfxModifiers','ljlzk','updateWaitMode','isDashing','clearPageSettings','opacityStart','AddSmoothCamera','initRegionTerrainTagSmartBlink','ECjtZ','SmoothCameraSpeedChange','DustCloudChangeSettings','_smartRushMode','playFootstepSound','_realX','PbDzd','SmartBlink','fillStyle','parseTerrainTagBasedSmartJump','updateFootprints','updateScrollSmoothCamera','followerVariance','DustCloudEnableDisable','FfOWc','straightenDiagonal','fkjdk','playSmartBlinkFilterEffect','allowed','AfzGw','Gartu','TerrainTagFootprintDuration','_smartBlink','setupIconSprite','motionTrailData','enabled','Dash','attachIconSprite','centerY','OnYjv','delay','canSmartBlink','SmartMoveWaitForSmartJump','volume','NoPol','isPlayerSmartRushing','meetFootprintFrames','CatchAll','isPlayFootstepSoundsByFrame','xOVIv','hexToRgba','_shiftY','nonLand','_bushDepth','qbGtu','vbiaI','frameCount','_lastSmoothScrollY','MotionBlurPlayer','MotionTrailEnablePlayer','moveTo','oltpG','SmartRushDistance','setupMovementEffectsCommentTags','JDoBm','isTileSmartJumpNonPassable','setupMovementEffectsNotetags','registerCommand','updateScroll','_opacityRate','createFootprint','cos','initMovementEffectsVariables','isTileSmartBlinkBreakable','footstepsData','setupRegionTerrainTagFootprints','NoRegionFootstepSfx','SmartBlinkDistance','createDustCloudBasics','checkDustCloudChanges','NonCrashTerrainTags','_followerOffsetX','ZuwDB','ConfigKeys','terrainTags','dir6','children','iEJfB','toUpperCase','_spriteset','realMoveSpeed','maxCommands','measureSmartJumpDistance','enableMotionTrails','Game_CharacterBase_animationWait','max','areMotionTrailsEnabled','Game_Picture_x','soundFrames','forbidden','MotionTrailCreateForPlayer','offsetX','aNyWD','GetDirAngle','_dustCloud','scrollUp','parseRegionBasedSmartBlink','oAXyH','RegExp','AddFootsteps','QUInE','ARRAYFUNC','ARRAYSTRUCT','updateTilemap','_parallaxZero','createDustCloudForTarget','isPassableByAnyDirection','jump','_waitMode','XUGzR','initRegionTerrainTagSmartJump','NonFootprintRegions','playSe'];_0x30d5=function(){return _0x4c63ad;};return _0x30d5();}VisuMZ[label][_0x3b896f(0x1b6)]=VisuMZ[label][_0x3b896f(0x1b6)]||{},VisuMZ[_0x3b896f(0x313)]=function(_0x20f1e3,_0x2d7cf1){const _0x4c34f7=_0x3b896f;for(const _0x39693a in _0x2d7cf1){if(_0x4c34f7(0x20a)==='oltpG'){if(_0x39693a[_0x4c34f7(0x336)](/(.*):(.*)/i)){const _0x27e96a=String(RegExp['$1']),_0x485ad3=String(RegExp['$2'])[_0x4c34f7(0x225)]()[_0x4c34f7(0x196)]();let _0x565f55,_0x1deb22,_0xd84107;switch(_0x485ad3){case'NUM':_0x565f55=_0x2d7cf1[_0x39693a]!==''?Number(_0x2d7cf1[_0x39693a]):0x0;break;case _0x4c34f7(0x2fb):_0x1deb22=_0x2d7cf1[_0x39693a]!==''?JSON[_0x4c34f7(0x2ce)](_0x2d7cf1[_0x39693a]):[],_0x565f55=_0x1deb22[_0x4c34f7(0x2d1)](_0x23eea6=>Number(_0x23eea6));break;case _0x4c34f7(0x37e):_0x565f55=_0x2d7cf1[_0x39693a]!==''?eval(_0x2d7cf1[_0x39693a]):null;break;case _0x4c34f7(0x3af):_0x1deb22=_0x2d7cf1[_0x39693a]!==''?JSON[_0x4c34f7(0x2ce)](_0x2d7cf1[_0x39693a]):[],_0x565f55=_0x1deb22[_0x4c34f7(0x2d1)](_0x1c030d=>eval(_0x1c030d));break;case'JSON':_0x565f55=_0x2d7cf1[_0x39693a]!==''?JSON['parse'](_0x2d7cf1[_0x39693a]):'';break;case'ARRAYJSON':_0x1deb22=_0x2d7cf1[_0x39693a]!==''?JSON['parse'](_0x2d7cf1[_0x39693a]):[],_0x565f55=_0x1deb22['map'](_0x31463c=>JSON[_0x4c34f7(0x2ce)](_0x31463c));break;case'FUNC':_0x565f55=_0x2d7cf1[_0x39693a]!==''?new Function(JSON['parse'](_0x2d7cf1[_0x39693a])):new Function('return\x200');break;case _0x4c34f7(0x23c):_0x1deb22=_0x2d7cf1[_0x39693a]!==''?JSON[_0x4c34f7(0x2ce)](_0x2d7cf1[_0x39693a]):[],_0x565f55=_0x1deb22[_0x4c34f7(0x2d1)](_0x471b62=>new Function(JSON[_0x4c34f7(0x2ce)](_0x471b62)));break;case _0x4c34f7(0x15b):_0x565f55=_0x2d7cf1[_0x39693a]!==''?String(_0x2d7cf1[_0x39693a]):'';break;case _0x4c34f7(0x25e):_0x1deb22=_0x2d7cf1[_0x39693a]!==''?JSON[_0x4c34f7(0x2ce)](_0x2d7cf1[_0x39693a]):[],_0x565f55=_0x1deb22['map'](_0x26233b=>String(_0x26233b));break;case _0x4c34f7(0x268):_0xd84107=_0x2d7cf1[_0x39693a]!==''?JSON['parse'](_0x2d7cf1[_0x39693a]):{},_0x565f55=VisuMZ[_0x4c34f7(0x313)]({},_0xd84107);break;case _0x4c34f7(0x23d):_0x1deb22=_0x2d7cf1[_0x39693a]!==''?JSON['parse'](_0x2d7cf1[_0x39693a]):[],_0x565f55=_0x1deb22['map'](_0x1ae48e=>VisuMZ[_0x4c34f7(0x313)]({},JSON[_0x4c34f7(0x2ce)](_0x1ae48e)));break;default:continue;}_0x20f1e3[_0x27e96a]=_0x565f55;}}else return _0x35c26d>=_0x18d049;}return _0x20f1e3;},(_0x25d840=>{const _0x3926b9=_0x3b896f,_0x63aeb5=_0x25d840[_0x3926b9(0x399)];for(const _0x8dd204 of dependencies){if(!Imported[_0x8dd204]){if(_0x3926b9(0x271)===_0x3926b9(0x20d)){this[_0x3926b9(0x215)]();const _0x51da8f=this['actor']()[_0x3926b9(0x38a)]||'';_0x392766[_0x3926b9(0x3e3)][_0x3926b9(0x3e6)]['call'](this,_0x51da8f);}else{alert(_0x3926b9(0x366)['format'](_0x63aeb5,_0x8dd204)),SceneManager[_0x3926b9(0x3b1)]();break;}}}const _0x39cc15=_0x25d840['description'];if(_0x39cc15['match'](/\[Version[ ](.*?)\]/i)){const _0x1e6c2e=Number(RegExp['$1']);_0x1e6c2e!==VisuMZ[label]['version']&&(alert(_0x3926b9(0x329)['format'](_0x63aeb5,_0x1e6c2e)),SceneManager[_0x3926b9(0x3b1)]());}if(_0x39cc15[_0x3926b9(0x336)](/\[Tier[ ](\d+)\]/i)){const _0x33766a=Number(RegExp['$1']);_0x33766a<tier?(alert(_0x3926b9(0x2ad)[_0x3926b9(0x3fb)](_0x63aeb5,_0x33766a,tier)),SceneManager[_0x3926b9(0x3b1)]()):_0x3926b9(0x391)!==_0x3926b9(0x1dd)?tier=Math[_0x3926b9(0x22c)](_0x33766a,tier):_0x4093dc['_scene']['playOnceParallelInterpreter'](_0x1cc1ac);}VisuMZ[_0x3926b9(0x313)](VisuMZ[label][_0x3926b9(0x1b6)],_0x25d840[_0x3926b9(0x39d)]);})(pluginData),PluginManager[_0x3b896f(0x210)](pluginData[_0x3b896f(0x399)],_0x3b896f(0x1e4),_0x2a44cc=>{const _0x3ecd18=_0x3b896f;VisuMZ[_0x3ecd18(0x313)](_0x2a44cc,_0x2a44cc);const _0x2dacb5=_0x2a44cc[_0x3ecd18(0x27f)];$gameSystem[_0x3ecd18(0x338)]()[_0x3ecd18(0x1f0)]=_0x2dacb5;}),PluginManager[_0x3b896f(0x210)](pluginData['name'],_0x3b896f(0x1d9),_0x1e4780=>{const _0x3e15e3=_0x3b896f;VisuMZ[_0x3e15e3(0x313)](_0x1e4780,_0x1e4780);const _0x1838ea=JsonEx['makeDeepCopy'](_0x1e4780);_0x1838ea['enabled']=$gameSystem[_0x3e15e3(0x33c)](),$gameSystem['setDustCloudData'](_0x1838ea);}),PluginManager[_0x3b896f(0x210)](pluginData[_0x3b896f(0x399)],'FootprintsEnableDisable',_0x2d1227=>{const _0x5125d9=_0x3b896f;VisuMZ[_0x5125d9(0x313)](_0x2d1227,_0x2d1227);const _0x4cc493=_0x2d1227['Enable'];$gameSystem[_0x5125d9(0x173)](_0x4cc493);}),PluginManager[_0x3b896f(0x210)](pluginData[_0x3b896f(0x399)],_0x3b896f(0x33d),_0x4da6db=>{const _0x3d95a6=_0x3b896f;VisuMZ[_0x3d95a6(0x313)](_0x4da6db,_0x4da6db);const _0x543595=_0x4da6db[_0x3d95a6(0x27f)];$gameSystem[_0x3d95a6(0x11f)](_0x543595);}),PluginManager[_0x3b896f(0x210)](pluginData[_0x3b896f(0x399)],_0x3b896f(0x207),_0x6a5128=>{const _0x43701d=_0x3b896f;if(!SceneManager['isSceneMap']())return;const _0x5b760d=SceneManager[_0x43701d(0x115)][_0x43701d(0x226)];if(!_0x5b760d)return;VisuMZ['ConvertParams'](_0x6a5128,_0x6a5128);const _0xfd9a1a=_0x6a5128[_0x43701d(0x272)]||0x1,_0x47c76d=_0x6a5128[_0x43701d(0x3a5)]||0x0;let _0x1dd84f=[$gamePlayer];_0x6a5128[_0x43701d(0x3c1)]&&(_0x1dd84f=_0x1dd84f['concat']($gamePlayer[_0x43701d(0x3ed)]()[_0x43701d(0x402)]()));for(const _0x5d8a17 of _0x1dd84f){if(!_0x5d8a17)continue;const _0x3053ba=_0x5b760d[_0x43701d(0x32f)](_0x5d8a17);if(_0x3053ba){if('SJuNx'===_0x43701d(0x390))_0x3053ba[_0x43701d(0x1a3)](_0xfd9a1a,_0x47c76d);else{const _0x27411e=_0x50d3d1[_0x43701d(0x352)][_0x43701d(0x12b)][_0x43701d(0x24b)](this);for(const _0xbc6ec5 of _0x2c75d2[_0x43701d(0x352)]['ConfigKeys']){_0x27411e[_0xbc6ec5]=this[_0xbc6ec5];}return _0x27411e;}}}}),PluginManager['registerCommand'](pluginData[_0x3b896f(0x399)],'MotionBlurFollower',_0x5e5ae5=>{const _0x2a3ba3=_0x3b896f;if(!SceneManager[_0x2a3ba3(0x2a8)]())return;const _0x34b295=SceneManager['_scene'][_0x2a3ba3(0x226)];if(!_0x34b295)return;VisuMZ[_0x2a3ba3(0x313)](_0x5e5ae5,_0x5e5ae5);const _0x245e7f=_0x5e5ae5[_0x2a3ba3(0x272)]||0x1,_0x17b4b0=_0x5e5ae5['AngleOffset']||0x0,_0x3fd0f6=_0x5e5ae5[_0x2a3ba3(0x3e9)];let _0x16e3c5=_0x3fd0f6[_0x2a3ba3(0x2d1)](_0x566a44=>$gamePlayer['followers']()[_0x2a3ba3(0x1b3)](_0x566a44));for(const _0x29da1c of _0x16e3c5){if(!_0x29da1c)continue;const _0x86f75=_0x34b295[_0x2a3ba3(0x32f)](_0x29da1c);_0x86f75&&_0x86f75[_0x2a3ba3(0x1a3)](_0x245e7f,_0x17b4b0);}}),PluginManager['registerCommand'](pluginData[_0x3b896f(0x399)],_0x3b896f(0x18e),_0x2ac316=>{const _0x261def=_0x3b896f;if(!SceneManager[_0x261def(0x2a8)]())return;const _0x425f67=SceneManager[_0x261def(0x115)][_0x261def(0x226)];if(!_0x425f67)return;VisuMZ[_0x261def(0x313)](_0x2ac316,_0x2ac316);const _0x3d9500=_0x2ac316[_0x261def(0x272)]||0x1,_0x26baf8=_0x2ac316['AngleOffset']||0x0,_0x938b0c=_0x2ac316['EventID'],_0x3e760b=$gameTemp['getLastPluginCommandInterpreter']();let _0x17dbe7=_0x938b0c[_0x261def(0x2d1)](_0x11d33e=>$gameMap['event'](_0x11d33e||_0x3e760b['eventId']()));for(const _0x457f37 of _0x17dbe7){if(!_0x457f37)continue;const _0x2ad96c=_0x425f67[_0x261def(0x32f)](_0x457f37);_0x2ad96c&&_0x2ad96c['startMotionBlurEffect'](_0x3d9500,_0x26baf8);}}),PluginManager[_0x3b896f(0x210)](pluginData[_0x3b896f(0x399)],_0x3b896f(0x231),_0x3f322e=>{const _0x1508a0=_0x3b896f;if(!SceneManager['isSceneMap']())return;const _0x418364=SceneManager[_0x1508a0(0x115)][_0x1508a0(0x226)];if(!_0x418364)return;VisuMZ[_0x1508a0(0x313)](_0x3f322e,_0x3f322e);let _0x5238e9=[$gamePlayer];_0x3f322e[_0x1508a0(0x3c1)]&&(_0x5238e9=_0x5238e9['concat']($gamePlayer[_0x1508a0(0x3ed)]()[_0x1508a0(0x402)]()));for(const _0x268ba4 of _0x5238e9){if(!_0x268ba4)continue;const _0x1d4646=_0x418364['findTargetSprite'](_0x268ba4);if(_0x1d4646){if(_0x1508a0(0x1c4)===_0x1508a0(0x1c4))_0x1d4646[_0x1508a0(0x332)]();else{if(!this[_0x1508a0(0x162)])return![];return this[_0x1508a0(0x162)][_0x1508a0(0x1ef)]()[_0x1508a0(0x1f0)];}}}}),PluginManager[_0x3b896f(0x210)](pluginData[_0x3b896f(0x399)],_0x3b896f(0x349),_0x3fa487=>{const _0x3612b7=_0x3b896f;if(!SceneManager['isSceneMap']())return;const _0x36b8b0=SceneManager[_0x3612b7(0x115)][_0x3612b7(0x226)];if(!_0x36b8b0)return;VisuMZ[_0x3612b7(0x313)](_0x3fa487,_0x3fa487);const _0x5781ac=_0x3fa487[_0x3612b7(0x3e9)];let _0x4507d0=_0x5781ac[_0x3612b7(0x2d1)](_0x4481db=>$gamePlayer[_0x3612b7(0x3ed)]()[_0x3612b7(0x1b3)](_0x4481db));for(const _0x2b835f of _0x4507d0){if(!_0x2b835f)continue;const _0x568498=_0x36b8b0['findTargetSprite'](_0x2b835f);_0x568498&&_0x568498['createMotionTrailSprite']();}}),PluginManager[_0x3b896f(0x210)](pluginData[_0x3b896f(0x399)],_0x3b896f(0x392),_0x474e13=>{const _0x30730f=_0x3b896f;if(!SceneManager[_0x30730f(0x2a8)]())return;const _0xa5515e=SceneManager[_0x30730f(0x115)][_0x30730f(0x226)];if(!_0xa5515e)return;VisuMZ[_0x30730f(0x313)](_0x474e13,_0x474e13);const _0x5995ad=_0x474e13[_0x30730f(0x176)],_0x3e13ed=$gameTemp[_0x30730f(0x25d)]();let _0x4aed3a=_0x5995ad['map'](_0xb36a4f=>$gameMap[_0x30730f(0x3a3)](_0xb36a4f||_0x3e13ed[_0x30730f(0x27a)]()));for(const _0x430809 of _0x4aed3a){if(!_0x430809)continue;const _0x2ab159=_0xa5515e[_0x30730f(0x32f)](_0x430809);_0x2ab159&&_0x2ab159['createMotionTrailSprite']();}}),PluginManager[_0x3b896f(0x210)](pluginData[_0x3b896f(0x399)],_0x3b896f(0x208),_0x275895=>{const _0x3a140e=_0x3b896f;if(!SceneManager[_0x3a140e(0x2a8)]())return;VisuMZ['ConvertParams'](_0x275895,_0x275895);const _0x5e53ad=_0x275895['Enable'],_0xe4ad6f=_0x275895[_0x3a140e(0x370)];let _0x2450bf=[$gamePlayer];if(_0x275895[_0x3a140e(0x3c1)]){if(_0x3a140e(0x161)!==_0x3a140e(0x1eb))_0x2450bf=_0x2450bf[_0x3a140e(0x307)]($gamePlayer['followers']()['data']());else{const _0x2c7cd0=_0x6a0f90[_0x3a140e(0x352)][_0x3a140e(0x1b6)][_0x3a140e(0x3c3)][_0x3a140e(0x359)]??1.5;_0x5e3e74=_0x9fd227['ceil'](_0xbd523f/_0x1392b7[_0x3a140e(0x22c)](_0x2c7cd0,0x1));if(this[_0x3a140e(0x1d2)]()){const _0xbb6404=_0x393b1f[_0x3a140e(0x352)][_0x3a140e(0x1b6)][_0x3a140e(0x3c3)][_0x3a140e(0x2a9)]??1.5;_0x24b727=_0x31f23d[_0x3a140e(0x300)](_0x3d0f33/_0x57e1ac[_0x3a140e(0x22c)](_0xbb6404,0x1));}}}for(const _0x6355d5 of _0x2450bf){if(!_0x6355d5)continue;_0x6355d5[_0x3a140e(0x22a)](_0x5e53ad,_0xe4ad6f);}}),PluginManager[_0x3b896f(0x210)](pluginData[_0x3b896f(0x399)],_0x3b896f(0x135),_0x22ec77=>{const _0x3bff15=_0x3b896f;if(!SceneManager[_0x3bff15(0x2a8)]())return;VisuMZ[_0x3bff15(0x313)](_0x22ec77,_0x22ec77);const _0x369fb7=_0x22ec77[_0x3bff15(0x27f)],_0x5b6626=_0x22ec77[_0x3bff15(0x370)],_0xb224c6=_0x22ec77[_0x3bff15(0x3e9)];let _0x3cde19=_0xb224c6[_0x3bff15(0x2d1)](_0x549632=>$gamePlayer['followers']()[_0x3bff15(0x1b3)](_0x549632));for(const _0x5bac76 of _0x3cde19){if(_0x3bff15(0x16b)==='mXCys'){if(!_0x5bac76)continue;_0x5bac76[_0x3bff15(0x22a)](_0x369fb7,_0x5b6626);}else{let _0x4ad794=_0x22c9b9[_0x3bff15(0x352)][_0x3bff15(0x153)][_0x3bff15(0x24b)](this);return this['isTrueMapScrollLinked']()&&(_0x4ad794*=_0x2d128e[_0x3bff15(0x17f)]()),_0x4ad794;}}}),PluginManager['registerCommand'](pluginData[_0x3b896f(0x399)],_0x3b896f(0x163),_0x49dbed=>{const _0xe81152=_0x3b896f;if(!SceneManager[_0xe81152(0x2a8)]())return;VisuMZ[_0xe81152(0x313)](_0x49dbed,_0x49dbed);const _0x4efd14=_0x49dbed[_0xe81152(0x27f)],_0xc29ead=_0x49dbed['ImmediateCreate'],_0x4d4df5=_0x49dbed['EventID'],_0x3359bf=$gameTemp[_0xe81152(0x25d)]();let _0x2d0650=_0x4d4df5[_0xe81152(0x2d1)](_0x422472=>$gameMap[_0xe81152(0x3a3)](_0x422472||_0x3359bf[_0xe81152(0x27a)]()));for(const _0x3781e4 of _0x2d0650){if(!_0x3781e4)continue;_0x3781e4['enableMotionTrails'](_0x4efd14,_0xc29ead);}}),PluginManager[_0x3b896f(0x210)](pluginData[_0x3b896f(0x399)],'MotionTrailSettingsChangePlayer',_0x2c26d7=>{const _0x5529d0=_0x3b896f;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x5529d0(0x313)](_0x2c26d7,_0x2c26d7);const _0x16d0f2={'enabled':![],'delay':_0x2c26d7[_0x5529d0(0x1f5)]||0x1,'duration':_0x2c26d7[_0x5529d0(0x394)]||0x1,'hue':_0x2c26d7['hue']||0x0,'opacityStart':_0x2c26d7['opacityStart']||0x0,'tone':_0x2c26d7[_0x5529d0(0x2e7)]||[0x0,0x0,0x0,0x0]};let _0x2f9f9f=[$gamePlayer];_0x2c26d7[_0x5529d0(0x3c1)]&&(_0x2f9f9f=_0x2f9f9f[_0x5529d0(0x307)]($gamePlayer[_0x5529d0(0x3ed)]()[_0x5529d0(0x402)]()));for(const _0x38aa09 of _0x2f9f9f){if(!_0x38aa09)continue;_0x38aa09[_0x5529d0(0x282)](_0x16d0f2);}}),PluginManager[_0x3b896f(0x210)](pluginData[_0x3b896f(0x399)],_0x3b896f(0x24c),_0x4e22db=>{const _0x2b114a=_0x3b896f;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x2b114a(0x313)](_0x4e22db,_0x4e22db);const _0x111f70={'enabled':![],'delay':_0x4e22db['delay']||0x1,'duration':_0x4e22db['duration']||0x1,'hue':_0x4e22db[_0x2b114a(0x326)]||0x0,'opacityStart':_0x4e22db[_0x2b114a(0x1d4)]||0x0,'tone':_0x4e22db[_0x2b114a(0x2e7)]||[0x0,0x0,0x0,0x0]},_0x502507=_0x4e22db[_0x2b114a(0x3e9)];let _0x11dc0e=_0x502507[_0x2b114a(0x2d1)](_0xc8e8c7=>$gamePlayer[_0x2b114a(0x3ed)]()[_0x2b114a(0x1b3)](_0xc8e8c7));for(const _0x2efdcf of _0x11dc0e){if(_0x2b114a(0x324)!==_0x2b114a(0x324)){const _0x123169=this[_0x2b114a(0x19d)]();let _0x4d266a=0x0,_0x47f24d=0x0;if([0x1,0x4,0x7]['includes'](_0x123169))_0x4d266a+=-_0x572904;if([0x3,0x6,0x9][_0x2b114a(0x179)](_0x123169))_0x4d266a+=_0x31ac53;if([0x7,0x8,0x9][_0x2b114a(0x179)](_0x123169))_0x47f24d+=-_0x2ce0c7;if([0x1,0x2,0x3]['includes'](_0x123169))_0x47f24d+=_0x388863;_0x47f24d=this[_0x2b114a(0x2e5)](_0x4d266a,_0x47f24d);const _0x2208f8=this['direction']();this[_0x2b114a(0x242)](_0x4d266a,_0x47f24d),this[_0x2b114a(0x34a)](_0x2208f8);}else{if(!_0x2efdcf)continue;_0x2efdcf[_0x2b114a(0x282)](_0x111f70);}}}),PluginManager[_0x3b896f(0x210)](pluginData['name'],_0x3b896f(0x29f),_0x41a589=>{const _0x82251=_0x3b896f;if(!SceneManager[_0x82251(0x2a8)]())return;VisuMZ['ConvertParams'](_0x41a589,_0x41a589);const _0x2e4d35={'enabled':![],'delay':_0x41a589[_0x82251(0x1f5)]||0x1,'duration':_0x41a589[_0x82251(0x394)]||0x1,'hue':_0x41a589[_0x82251(0x326)]||0x0,'opacityStart':_0x41a589['opacityStart']||0x0,'tone':_0x41a589[_0x82251(0x2e7)]||[0x0,0x0,0x0,0x0]},_0x11fb35=_0x41a589['EventID'],_0x3b74db=$gameTemp[_0x82251(0x25d)]();let _0x1218df=_0x11fb35[_0x82251(0x2d1)](_0x489c9c=>$gameMap[_0x82251(0x3a3)](_0x489c9c||_0x3b74db[_0x82251(0x27a)]()));for(const _0x56ff06 of _0x1218df){if(!_0x56ff06)continue;_0x56ff06[_0x82251(0x282)](_0x2e4d35);}}),PluginManager['registerCommand'](pluginData[_0x3b896f(0x399)],_0x3b896f(0x250),_0x14241d=>{const _0x4f9d5d=_0x3b896f;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x4f9d5d(0x313)](_0x14241d,_0x14241d);const _0x208aa2={'slower':-0x1,'normal':0x0,'faster':0x1};for(let _0x209a8c=0x1;_0x209a8c<0xa;_0x209a8c++){if(_0x4f9d5d(0x1fe)===_0x4f9d5d(0x28d))return _0x4273c6[_0x4f9d5d(0x352)]['Game_Picture_isMapScrollLinked'][_0x4f9d5d(0x24b)](this);else{if(_0x209a8c===0x5)continue;const _0x43b637=_0x4f9d5d(0x320)[_0x4f9d5d(0x3fb)](_0x209a8c),_0x325566=(_0x14241d[_0x43b637]||_0x4f9d5d(0x404))[_0x4f9d5d(0x24e)]()[_0x4f9d5d(0x196)](),_0x5495c7=_0x208aa2[_0x325566]||0x0;$gameSystem[_0x4f9d5d(0x266)](_0x209a8c,_0x5495c7);}}}),PluginManager['registerCommand'](pluginData[_0x3b896f(0x399)],_0x3b896f(0x21a),_0x41304a=>{const _0x2775a7=_0x3b896f;if(!SceneManager[_0x2775a7(0x2a8)]())return;VisuMZ[_0x2775a7(0x313)](_0x41304a,_0x41304a);const _0x54dcb6=_0x41304a[_0x2775a7(0x251)]||0x1,_0x437c6b=_0x41304a[_0x2775a7(0x32c)]||0x1,_0x3359cb=_0x41304a[_0x2775a7(0x262)]||0x0,_0x4814e3={'NonLandableRegions':_0x41304a['NonLandableRegions']['clone'](),'NonLandableTerrainTags':_0x41304a[_0x2775a7(0x183)][_0x2775a7(0x259)](),'NonPassableRegions':_0x41304a[_0x2775a7(0x2bb)][_0x2775a7(0x259)](),'NonPassableTerrainTags':_0x41304a[_0x2775a7(0x1bc)][_0x2775a7(0x259)]()},_0x14aac9=_0x41304a['AnimationID']||0x0,_0x5bd78f=_0x41304a[_0x2775a7(0x194)]||{'enabled':![]},_0x1ff0cc={'name':_0x41304a['sfxName']||'','volume':_0x41304a[_0x2775a7(0x35d)]||0x0,'pitch':_0x41304a[_0x2775a7(0x145)]||0x0,'pan':_0x41304a[_0x2775a7(0x14f)]||0x0};if($gamePlayer[_0x2775a7(0x265)](_0x54dcb6,_0x437c6b,_0x4814e3,_0x5bd78f)){if(_0x2775a7(0x2ca)!==_0x2775a7(0x181))_0x1ff0cc[_0x2775a7(0x399)]!==''&&AudioManager[_0x2775a7(0x247)](_0x1ff0cc),_0x14aac9>0x0&&$gameTemp[_0x2775a7(0x263)]([$gamePlayer],_0x14aac9),_0x3359cb>0x0&&SceneManager['_scene'][_0x2775a7(0x388)](_0x3359cb);else{if(this[_0x2775a7(0x169)]===_0x2c0fe8)this[_0x2775a7(0x2d9)]();return this[_0x2775a7(0x169)];}}}),PluginManager[_0x3b896f(0x210)](pluginData['name'],'SmartJumpDistance',_0x1be46c=>{const _0x24e435=_0x3b896f;if(!SceneManager[_0x24e435(0x2a8)]())return;VisuMZ['ConvertParams'](_0x1be46c,_0x1be46c);const _0x5d86be=_0x1be46c['Distance']||0x1,_0x3158ae=_0x1be46c[_0x24e435(0x32c)]||0x1,_0xefa3db=_0x1be46c[_0x24e435(0x262)]||0x0,_0x291586={'NonLandableRegions':_0x1be46c[_0x24e435(0x28f)]['clone'](),'NonLandableTerrainTags':_0x1be46c[_0x24e435(0x183)][_0x24e435(0x259)](),'NonPassableRegions':_0x1be46c[_0x24e435(0x2bb)][_0x24e435(0x259)](),'NonPassableTerrainTags':_0x1be46c[_0x24e435(0x1bc)][_0x24e435(0x259)]()},_0x322b71=_0x1be46c[_0x24e435(0x331)]||0x0,_0x21cde4=_0x1be46c['MotionTrail']||{'enabled':![]},_0x2a4fcb={'name':_0x1be46c[_0x24e435(0x140)]||'','volume':_0x1be46c[_0x24e435(0x35d)]||0x0,'pitch':_0x1be46c[_0x24e435(0x145)]||0x0,'pan':_0x1be46c[_0x24e435(0x14f)]||0x0};if($gamePlayer[_0x24e435(0x37d)](_0x5d86be,_0x3158ae,_0x291586,_0x21cde4)){if(_0x2a4fcb['name']!==''){if(_0x24e435(0x318)!=='tqPsC')AudioManager['playSe'](_0x2a4fcb);else for(const _0xc9e655 of _0x2f0dc9){_0xc9e655[_0x24e435(0x336)](_0x57ac68[_0x24e435(0x15e)]);const _0x15586c=_0x5581d4(_0x28c25b['$1'])[_0x24e435(0x11a)](0x0,0xff),_0x40b4ae=_0x14847[_0x24e435(0x22c)](0x1,_0x2ef9b1(_0x33bedb['$2']));this[_0x24e435(0x400)][_0x24e435(0x394)]['regions'][_0x15586c]=_0x40b4ae;}}if(_0x322b71>0x0){if('BREVP'!==_0x24e435(0x270))$gameTemp['requestAnimation']([$gamePlayer],_0x322b71);else{if(!_0x10c202)return this[_0x24e435(0x19d)]();if(_0x6d3749[_0x24e435(0x17b)])return this[_0x24e435(0x19d)]();const _0x3bc1de=this[_0x24e435(0x1e6)](this['direction'](),_0x5a69e2);return _0x3bc1de;}}_0xefa3db>0x0&&SceneManager[_0x24e435(0x115)][_0x24e435(0x388)](_0xefa3db);}}),PluginManager[_0x3b896f(0x210)](pluginData[_0x3b896f(0x399)],_0x3b896f(0x20b),_0x25ef57=>{const _0x125535=_0x3b896f;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x125535(0x313)](_0x25ef57,_0x25ef57);const _0x3fe8fd=_0x25ef57[_0x125535(0x251)]||0x1,_0x1f02b9=_0x25ef57[_0x125535(0x32c)]||0x1,_0x1dcac8=_0x25ef57[_0x125535(0x262)]||0x0,_0x10ad31=_0x25ef57['Switches']||[],_0x208e76=_0x25ef57[_0x125535(0x12c)]||0x1,_0x443966=_0x25ef57[_0x125535(0x331)]||0x0,_0x4dd24e=_0x25ef57[_0x125535(0x194)]||{'enabled':![]},_0x259b9e={'name':_0x25ef57['sfxName']||'','volume':_0x25ef57[_0x125535(0x35d)]||0x0,'pitch':_0x25ef57['sfxPitch']||0x0,'pan':_0x25ef57['sfxPan']||0x0};$gamePlayer[_0x125535(0x276)](_0x3fe8fd,_0x1f02b9,_0x10ad31,_0x208e76,_0x4dd24e)&&(_0x259b9e[_0x125535(0x399)]!==''&&AudioManager[_0x125535(0x247)](_0x259b9e),_0x443966>0x0&&$gameTemp['requestAnimation']([$gamePlayer],_0x443966),_0x1dcac8>0x0&&SceneManager[_0x125535(0x115)][_0x125535(0x388)](_0x1dcac8));}),PluginManager[_0x3b896f(0x210)](pluginData[_0x3b896f(0x399)],'SmartMoveWaitForSmartBlink',_0x3ec1eb=>{const _0x4108f8=_0x3b896f;if(!SceneManager[_0x4108f8(0x2a8)]())return;const _0xb4de01=$gameTemp[_0x4108f8(0x25d)]();_0xb4de01['setWaitMode'](_0x4108f8(0x265));}),PluginManager[_0x3b896f(0x210)](pluginData[_0x3b896f(0x399)],_0x3b896f(0x1f7),_0x52b7a1=>{const _0x334cef=_0x3b896f;if(!SceneManager[_0x334cef(0x2a8)]())return;const _0x289397=$gameTemp[_0x334cef(0x25d)]();_0x289397['setWaitMode'](_0x334cef(0x37d));}),PluginManager[_0x3b896f(0x210)](pluginData['name'],'SmartMoveWaitForSmartRush',_0x373f27=>{const _0x30ecba=_0x3b896f;if(!SceneManager['isSceneMap']())return;const _0x338c0f=$gameTemp[_0x30ecba(0x25d)]();_0x338c0f[_0x30ecba(0x2c8)](_0x30ecba(0x276));}),PluginManager[_0x3b896f(0x210)](pluginData['name'],'SmoothCameraEnableDisable',_0x2792f4=>{const _0x38445b=_0x3b896f;VisuMZ[_0x38445b(0x313)](_0x2792f4,_0x2792f4);const _0x49788a=_0x2792f4['Enable'];$gameSystem[_0x38445b(0x2c9)](_0x49788a);}),PluginManager[_0x3b896f(0x210)](pluginData[_0x3b896f(0x399)],_0x3b896f(0x1d8),_0x3ab65a=>{const _0xd004d9=_0x3b896f;VisuMZ[_0xd004d9(0x313)](_0x3ab65a,_0x3ab65a),$gameSystem[_0xd004d9(0x36f)](_0x3ab65a[_0xd004d9(0x3c0)],![],![]),$gameSystem[_0xd004d9(0x36f)](_0x3ab65a[_0xd004d9(0x2af)],!![],![]),$gameSystem[_0xd004d9(0x36f)](_0x3ab65a['HorzDash'],![],!![]),$gameSystem[_0xd004d9(0x36f)](_0x3ab65a[_0xd004d9(0x1c1)],!![],!![]);}),VisuMZ['MovementEffects'][_0x3b896f(0x239)]={'CatchAll':/(?:SMOOTH|DASH|FOOT|REGION|TERRAIN|SMART|JUMP)/i,'ForceSmooth':/<FORCE SMOOTH (?:CAMERA|SCROLL)>/i,'NoSmooth':/<(?:NO|DISABLE) SMOOTH (?:CAMERA|SCROLL)>/i,'ForceDustCloud':/<FORCE (?:DASH|DUST) (?:CLOUD|CLOUDS)>/i,'NoDustCloud':/<(?:NO|DISABLE) (?:DASH|DUST) (?:CLOUD|CLOUDS)>/i,'ForceFootsteps':/<FORCE (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'NoFootsteps':/<(?:NO|DISABLE) (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'RegionFootstepSfx':/<REGION (\d+) FOOTSTEP SOUND:[ ](.*)>/gi,'NoRegionFootstepSfx':/<(?:NO|DISABLE) REGION (\d+) FOOTSTEP SOUND>/gi,'FootprintRegions':/<FOOTPRINT (?:REGION|REGIONS):[ ](.*?)>/i,'NonFootprintRegions':/<(?:NO|DISABLE) FOOTPRINT (?:REGION|REGIONS):[ ](.*?)>/i,'RegionFootprintOpacity':/<REGION (\d+) FOOTPRINT OPACITY:[ ](\d+)>/gi,'RegionFootprintDuration':/<REGION (\d+) FOOTPRINT DURATION:[ ](\d+)>/gi,'NoSmartRush':/<(?:NO|DISABLE) SMART RUSH>/i,'SmartRushAntiCrashRegions':/<SMART RUSH NON-CRASH (?:REGION|REGIONS):[ ](.*?)>/i,'NoSmartBlink':/<(?:NO|DISABLE) SMART BLINK>/i,'SmartBlinkNonLandRegions':/<SMART BLINK NON-LAND (?:REGION|REGIONS):[ ](.*?)>/i,'SmartBlinkNonPassRegions':/<SMART BLINK NON-PASS (?:REGION|REGIONS):[ ](.*?)>/i,'NoSmartJump':/<(?:NO|DISABLE) SMART JUMP>/i,'SmartJumpNonLandRegions':/<SMART JUMP NON-LAND (?:REGION|REGIONS):[ ](.*?)>/i,'SmartJumpNonPassRegions':/<SMART JUMP NON-PASS (?:REGION|REGIONS):[ ](.*?)>/i,'SmartJumpHeightBasedRegions':/<SMART JUMP HEIGHT-BASED (?:REGION|REGIONS):[ ](.*?)>/i,'TerrainTagFootstepSfx':/<TERRAIN TAG (\d+) (?:FOOTSTEP SOUND|FOOTSTEPS):[ ](.*)>/gi,'NoTerrainTagFootstepSfx':/<(?:NO|DISABLE) TERRAIN TAG (\d+) (?:FOOTSTEP SOUND|FOOTSTEPS)>/gi,'FootprintTerrainTags':/<FOOTPRINT TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'NonFootprintTerrainTags':/<(?:NO|DISABLE) FOOTPRINT TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'TerrainTagFootprintOpacity':/<TERRAIN TAG (\d+) FOOTPRINT OPACITY:[ ](\d+)>/gi,'TerrainTagFootprintDuration':/<TERRAIN TAG (\d+) FOOTPRINT DURATION:[ ](\d+)>/gi,'SmartRushAntiCrashTerrainTags':/<SMART RUSH NON-CRASH TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartBlinkNonLandTerrainTags':/<SMART BLINK NON-LAND TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartBlinkNonPassTerrainTags':/<SMART BLINK NON-PASS TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartJumpNonLandTerrainTags':/<SMART JUMP NON-LAND TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartJumpNonPassTerrainTags':/<SMART JUMP NON-PASS TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'YesFootstepsEvent':/<(?:ALLOW|ENABLE) (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'NoFootstepsEvent':/<(?:NO|DISABLE) (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'FootstepsVolRate':/<(?:FOOTSTEPS|FOOTSTEP SOUNDS) VOLUME:[ ](\d+)([%％])>/i,'FootstepsPitchRate':/<(?:FOOTSTEPS|FOOTSTEP SOUNDS) PITCH:[ ](\d+)([%％])>/i,'FootstepsFrames':/<(?:FOOTSTEPS|FOOTSTEP SOUNDS) (?:FRAME|FRAMES):[ ](.*?)>/i,'YesFootprintsEvent':/<(?:ALLOW|ENABLE) FOOTPRINTS>/i,'NoFootprintsEvent':/<(?:NO|DISABLE) FOOTPRINTS>/i,'FootprintsFilename':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) FILENAME:[ ](.*?)>/gi,'FootprintsWidth':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) WIDTH:[ ](\d+)>/gi,'FootprintsHeight':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) HEIGHT:[ ](\d+)>/gi,'FootprintsOffset':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) OFFSET:[ ](.*?)>/gi,'SmartJumpNonLandEvent':/<(?:SMART JUMP NON-LAND|ILLEGAL JUMP)>/i,'SmartJumpNonPassEvent':/<(?:SMART JUMP NON-PASS|ILLEGAL JUMP)>/i},VisuMZ[_0x3b896f(0x352)]['ConfigKeys']=[_0x3b896f(0x3e1),_0x3b896f(0x3eb),_0x3b896f(0x19f),_0x3b896f(0x253)],((()=>{const _0x46baee=_0x3b896f;for(const _0x344e27 of VisuMZ['MovementEffects'][_0x46baee(0x220)]){'WLwwL'!==_0x46baee(0x387)?this['_footprintMarksEnabled']=_0x15156e[_0x46baee(0x352)][_0x46baee(0x1b6)]['Footprints'][_0x46baee(0x3f0)]:ConfigManager[_0x344e27]=!![];}})()),VisuMZ[_0x3b896f(0x352)]['ConfigManager_makeData']=ConfigManager[_0x3b896f(0x14a)],ConfigManager[_0x3b896f(0x14a)]=function(){const _0x2e321d=_0x3b896f,_0x488356=VisuMZ[_0x2e321d(0x352)][_0x2e321d(0x12b)][_0x2e321d(0x24b)](this);for(const _0x5bcf21 of VisuMZ[_0x2e321d(0x352)][_0x2e321d(0x220)]){_0x2e321d(0x279)!==_0x2e321d(0x386)?_0x488356[_0x5bcf21]=this[_0x5bcf21]:(_0x44014f[_0x2e321d(0x3e3)]['update'][_0x2e321d(0x24b)](this),this[_0x2e321d(0x255)]());}return _0x488356;},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x15a)]=ConfigManager[_0x3b896f(0x2c7)],ConfigManager[_0x3b896f(0x2c7)]=function(_0x4bfa9c){const _0xbffd74=_0x3b896f;VisuMZ[_0xbffd74(0x352)]['ConfigManager_applyData'][_0xbffd74(0x24b)](this,_0x4bfa9c);for(const _0x2e9762 of VisuMZ['MovementEffects'][_0xbffd74(0x220)]){if(_0xbffd74(0x304)===_0xbffd74(0x36d))for(const _0x429166 of _0x36e5e9){_0x429166[_0xbffd74(0x336)](_0x1c313c[_0xbffd74(0x31f)]);const _0x4c0a3d=_0x7c02de(_0x5e4826['$1'])[_0xbffd74(0x11a)](0x0,0xff),_0x4c4750=_0x1ed50f(_0x1fb53a['$2'])['clamp'](0x0,0xff);this[_0xbffd74(0x400)]['opacity'][_0xbffd74(0x2da)][_0x4c0a3d]=_0x4c4750;}else this[_0xbffd74(0x347)](_0x4bfa9c,_0x2e9762,!![]);}},TextManager['MovementEffectsOptions']={'DustCloud':VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x1b6)][_0x3b896f(0x3f4)][_0x3b896f(0x165)],'Footprints':VisuMZ[_0x3b896f(0x352)]['Settings']['Options'][_0x3b896f(0x2d2)],'Footsteps':VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x1b6)][_0x3b896f(0x3f4)][_0x3b896f(0x2df)],'SmoothCamera':VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x1b6)][_0x3b896f(0x3f4)][_0x3b896f(0x3e0)]},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x37f)]=Scene_Options['prototype'][_0x3b896f(0x228)],Scene_Options[_0x3b896f(0x3e3)][_0x3b896f(0x228)]=function(){const _0x2267c1=_0x3b896f;let _0x384562=VisuMZ[_0x2267c1(0x352)]['Scene_Options_maxCommands'][_0x2267c1(0x24b)](this);const _0x5c9c01=VisuMZ['MovementEffects'][_0x2267c1(0x1b6)][_0x2267c1(0x3f4)];if(_0x5c9c01['AdjustRect']&&_0x5c9c01['AddDustCloud'])_0x384562++;if(_0x5c9c01[_0x2267c1(0x3bf)]&&_0x5c9c01[_0x2267c1(0x267)])_0x384562++;if(_0x5c9c01[_0x2267c1(0x3bf)]&&_0x5c9c01[_0x2267c1(0x23a)])_0x384562++;if(_0x5c9c01[_0x2267c1(0x3bf)]&&_0x5c9c01[_0x2267c1(0x1d5)])_0x384562++;return _0x384562;},VisuMZ['MovementEffects'][_0x3b896f(0x119)]=Window_Options[_0x3b896f(0x3e3)][_0x3b896f(0x364)],Window_Options[_0x3b896f(0x3e3)]['addGeneralOptions']=function(){const _0x436e5f=_0x3b896f;VisuMZ['MovementEffects']['Window_Options_addGeneralOptions'][_0x436e5f(0x24b)](this),this[_0x436e5f(0x29d)]();},Window_Options['prototype']['addMovementEffectsOptionCommands']=function(){const _0xfd694=_0x3b896f;VisuMZ[_0xfd694(0x352)][_0xfd694(0x1b6)][_0xfd694(0x3f4)][_0xfd694(0x3a1)]&&this[_0xfd694(0x14d)](),VisuMZ['MovementEffects']['Settings'][_0xfd694(0x3f4)][_0xfd694(0x267)]&&('CZhgs'==='QOFED'?this[_0xfd694(0x35a)]--:this[_0xfd694(0x342)]()),VisuMZ[_0xfd694(0x352)]['Settings'][_0xfd694(0x3f4)][_0xfd694(0x23a)]&&this[_0xfd694(0x1a0)](),VisuMZ[_0xfd694(0x352)]['Settings'][_0xfd694(0x3f4)][_0xfd694(0x1d5)]&&this[_0xfd694(0x2b7)]();},Window_Options[_0x3b896f(0x3e3)]['addMovementEffectsDustCloudCommand']=function(){const _0x3f91f2=_0x3b896f,_0x347a68=TextManager[_0x3f91f2(0x2ab)][_0x3f91f2(0x3f9)],_0x17a919='dustCloud';this[_0x3f91f2(0x3d4)](_0x347a68,_0x17a919);},Window_Options[_0x3b896f(0x3e3)][_0x3b896f(0x342)]=function(){const _0x4b8b96=_0x3b896f,_0x7a6e2c=TextManager['MovementEffectsOptions'][_0x4b8b96(0x261)],_0x1b0c70=_0x4b8b96(0x3eb);this['addCommand'](_0x7a6e2c,_0x1b0c70);},Window_Options[_0x3b896f(0x3e3)]['addMovementEffectsFootstepsCommand']=function(){const _0x292b04=_0x3b896f,_0xc7f551=TextManager[_0x292b04(0x2ab)][_0x292b04(0x3c3)],_0x40cfe0='footsteps';this[_0x292b04(0x3d4)](_0xc7f551,_0x40cfe0);},Window_Options['prototype'][_0x3b896f(0x2b7)]=function(){const _0x202279=_0x3b896f,_0x1da279=TextManager[_0x202279(0x2ab)][_0x202279(0x1bf)],_0x372cf3=_0x202279(0x253);this[_0x202279(0x3d4)](_0x1da279,_0x372cf3);},ImageManager[_0x3b896f(0x323)]=function(){const _0x329a47=_0x3b896f;if(this['_cached_GeneratedFootprint_Image'])return this['_cached_GeneratedFootprint_Image'];const _0x5d32b7=0x64,_0x4b50bc=0x64,_0x4eef19=new Bitmap(_0x5d32b7,_0x4b50bc);return _0x4eef19[_0x329a47(0x1be)]=0xff,_0x4eef19[_0x329a47(0x166)](0x32,0x32,0x32,'#000000'),_0x4eef19[_0x329a47(0x293)]=![],this['_cached_GeneratedFootprint_Image']=_0x4eef19,this[_0x329a47(0x2b1)];},SoundManager[_0x3b896f(0x38f)]=function(_0x5688bb){const _0x973ba0=_0x3b896f,_0x1a9062=VisuMZ[_0x973ba0(0x352)][_0x973ba0(0x1b6)]['Footsteps'],_0x3544e9={'name':_0x1a9062['name']??_0x973ba0(0x3bd),'volume':_0x1a9062['volume']??0xa,'pitch':_0x1a9062[_0x973ba0(0x301)]??0x78,'pan':_0x1a9062['pan']??0x0};$gameMap[_0x973ba0(0x3f5)](_0x3544e9,_0x5688bb);if(_0x3544e9==='')return;VisuMZ['MovementEffects']['ApplyFootstepSfxModifiers'](_0x3544e9,_0x5688bb),AudioManager['playSe'](_0x3544e9);},VisuMZ['MovementEffects'][_0x3b896f(0x1cf)]=function(_0x8f072d,_0xf3181f){const _0x269b9b=_0x3b896f;if(!_0x8f072d)return;if(!_0xf3181f)return;if(_0xf3181f['constructor']===Game_Event){const _0x38caec=VisuMZ[_0x269b9b(0x352)][_0x269b9b(0x1b6)][_0x269b9b(0x3c3)],_0x43cbfa=$gamePlayer[_0x269b9b(0x19e)](_0xf3181f['x']),_0x5a0032=$gamePlayer['deltaYFrom'](_0xf3181f['y']),_0x5edea9=Math['abs'](_0x43cbfa)+Math[_0x269b9b(0x3c2)](_0x5a0032);_0x5edea9>0x0&&(_0x8f072d['volume']+=_0x5edea9*_0x38caec['distanceVolumeModifier'],_0x8f072d[_0x269b9b(0x301)]+=_0x5edea9*_0x38caec[_0x269b9b(0x128)]),_0x43cbfa!==0x0&&(_0x8f072d[_0x269b9b(0x3db)]-=_0x43cbfa*_0x38caec[_0x269b9b(0x2ba)]);}const _0x5735e5=_0xf3181f['footstepsData']();_0x5735e5&&(_0x8f072d[_0x269b9b(0x1f8)]*=_0x5735e5[_0x269b9b(0x38e)]??0x1,_0x8f072d[_0x269b9b(0x301)]*=_0x5735e5[_0x269b9b(0x3b9)]??0x1),_0x8f072d[_0x269b9b(0x1f8)]=Math[_0x269b9b(0x22c)](0x0,_0x8f072d[_0x269b9b(0x1f8)]),_0x8f072d[_0x269b9b(0x301)]=Math[_0x269b9b(0x22c)](0x0,_0x8f072d[_0x269b9b(0x301)]),_0x8f072d['pan']=_0x8f072d[_0x269b9b(0x3db)][_0x269b9b(0x11a)](-0x64,0x64);},TextManager[_0x3b896f(0x2ea)]=function(_0x46c582){const _0x1a9d7d=_0x3b896f;_0x46c582=_0x46c582[_0x1a9d7d(0x24e)]()[_0x1a9d7d(0x196)]();switch(_0x46c582){case'down':return 0x2;case _0x1a9d7d(0x254):return 0x4;case _0x1a9d7d(0x34d):return 0x6;case'up':return 0x8;case'lower\x20left':return 0x1;case _0x1a9d7d(0x14c):return 0x3;case _0x1a9d7d(0x13b):return 0x7;case _0x1a9d7d(0x19c):return 0x9;}return Number(_0x46c582)||0x0;},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x167)]=BattleManager['startBattle'],BattleManager[_0x3b896f(0x3da)]=function(){const _0x5b12be=_0x3b896f;VisuMZ[_0x5b12be(0x352)][_0x5b12be(0x167)]['call'](this),$gamePlayer&&$gamePlayer['endSmartRush']();},VisuMZ['MovementEffects'][_0x3b896f(0x174)]=Game_System[_0x3b896f(0x3e3)][_0x3b896f(0x171)],Game_System[_0x3b896f(0x3e3)][_0x3b896f(0x171)]=function(){const _0xb06833=_0x3b896f;VisuMZ[_0xb06833(0x352)]['Game_System_initialize']['call'](this),this[_0xb06833(0x157)](),this[_0xb06833(0x126)](),this['initMovementEffectsFootstepSounds'](),this[_0xb06833(0x152)](),this[_0xb06833(0x12e)]();},Game_System['prototype'][_0x3b896f(0x157)]=function(){const _0x51a997=_0x3b896f,_0x20732a=VisuMZ[_0x51a997(0x352)][_0x51a997(0x1b6)]['SmoothCamera'];this[_0x51a997(0x2fe)]={'enabled':_0x20732a['Enabled'],'horzWalk':_0x20732a[_0x51a997(0x3c0)][_0x51a997(0x11a)](0x1,0x30),'vertWalk':_0x20732a[_0x51a997(0x2af)][_0x51a997(0x11a)](0x1,0x30),'horzDash':_0x20732a['HorzDash'][_0x51a997(0x11a)](0x1,0x30),'vertDash':_0x20732a[_0x51a997(0x1c1)][_0x51a997(0x11a)](0x1,0x30)};},Game_System[_0x3b896f(0x3e3)]['isSmoothCameraEnabled']=function(){const _0x16e751=_0x3b896f;if(this[_0x16e751(0x2fe)]===undefined)this[_0x16e751(0x157)]();return this[_0x16e751(0x2fe)][_0x16e751(0x1f0)];},Game_System[_0x3b896f(0x3e3)][_0x3b896f(0x2c9)]=function(_0x44b906){const _0x3acf74=_0x3b896f;if(this[_0x3acf74(0x2fe)]===undefined)this[_0x3acf74(0x157)]();this['_smoothCamera'][_0x3acf74(0x1f0)]=_0x44b906;},Game_System[_0x3b896f(0x3e3)][_0x3b896f(0x39e)]=function(_0x4750b8,_0x109331){const _0xd5452f=_0x3b896f;if(this[_0xd5452f(0x2fe)]===undefined)this['initMovementEffectsSmoothCamera']();const _0x9895c5=(_0x4750b8?_0xd5452f(0x3f6):_0xd5452f(0x1c5))+(_0x109331?'Dash':_0xd5452f(0x39f));return this[_0xd5452f(0x2fe)][_0x9895c5][_0xd5452f(0x11a)](0x1,0x30);},Game_System[_0x3b896f(0x3e3)]['setSmoothCameraSpeed']=function(_0x247dae,_0xc90dbf,_0x59ee38){const _0x2128a5=_0x3b896f;if(this[_0x2128a5(0x2fe)]===undefined)this[_0x2128a5(0x157)]();const _0x9bf5e=(_0xc90dbf?_0x2128a5(0x3f6):'horz')+(_0x59ee38?_0x2128a5(0x1f1):_0x2128a5(0x39f));this[_0x2128a5(0x2fe)][_0x9bf5e]=_0x247dae[_0x2128a5(0x11a)](0x1,0x30);},Game_System[_0x3b896f(0x3e3)]['initMovementEffectsDustCloud']=function(){const _0x1c8b59=_0x3b896f,_0x1a1c44=VisuMZ[_0x1c8b59(0x352)]['Settings']['DustCloud'];this[_0x1c8b59(0x235)]={'enabled':_0x1a1c44[_0x1c8b59(0x3f0)],'filename':_0x1a1c44[_0x1c8b59(0x184)]||'','color':_0x1a1c44[_0x1c8b59(0x1b1)]||'#ffffff','radius':_0x1a1c44[_0x1c8b59(0x150)]||0x18,'fullness':_0x1a1c44[_0x1c8b59(0x365)]||0x0,'wholeDuration':_0x1a1c44['wholeDuration']||0x14,'startOpacity':_0x1a1c44[_0x1c8b59(0x29e)]||0xc0,'startScale':_0x1a1c44[_0x1c8b59(0x33e)]||0.2};},Game_System[_0x3b896f(0x3e3)][_0x3b896f(0x338)]=function(){const _0x248d26=_0x3b896f;if(this[_0x248d26(0x235)]===undefined)this[_0x248d26(0x126)]();return this['_dustCloud'];},Game_System[_0x3b896f(0x3e3)][_0x3b896f(0x3e5)]=function(_0x38877d){const _0x159ea0=_0x3b896f;if(this['_dustCloud']===undefined)this[_0x159ea0(0x126)]();this[_0x159ea0(0x235)]=JsonEx[_0x159ea0(0x2b4)](_0x38877d);},Game_System[_0x3b896f(0x3e3)][_0x3b896f(0x33c)]=function(){const _0x2ee1e4=_0x3b896f;return this[_0x2ee1e4(0x338)]()['enabled'];},Game_System[_0x3b896f(0x3e3)]['initMovementEffectsFootstepSounds']=function(){const _0x5b03eb=_0x3b896f;this[_0x5b03eb(0x3ba)]=VisuMZ['MovementEffects'][_0x5b03eb(0x1b6)][_0x5b03eb(0x3c3)]['Enabled'];},Game_System[_0x3b896f(0x3e3)]['canMakeFootstepSounds']=function(){const _0x25e158=_0x3b896f;if(this['_footstepSoundsEnabled']===undefined)this['initMovementEffectsFootstepSounds']();return this[_0x25e158(0x3ba)];},Game_System[_0x3b896f(0x3e3)]['setFootstepSoundsEnabled']=function(_0x35547f){const _0x547998=_0x3b896f;if(this[_0x547998(0x3ba)]===undefined)this[_0x547998(0x28b)]();this[_0x547998(0x3ba)]=_0x35547f;},Game_System[_0x3b896f(0x3e3)][_0x3b896f(0x152)]=function(){const _0x25923a=_0x3b896f;this['_footprintMarksEnabled']=VisuMZ[_0x25923a(0x352)]['Settings'][_0x25923a(0x261)][_0x25923a(0x3f0)];},Game_System[_0x3b896f(0x3e3)][_0x3b896f(0x13e)]=function(){const _0x535ba5=_0x3b896f;if(this[_0x535ba5(0x137)]===undefined)this[_0x535ba5(0x152)]();return this[_0x535ba5(0x137)];},Game_System[_0x3b896f(0x3e3)]['setFootprintsEnabled']=function(_0x3fb862){const _0x1adc06=_0x3b896f;if(this[_0x1adc06(0x137)]===undefined)this[_0x1adc06(0x152)]();this[_0x1adc06(0x137)]=_0x3fb862;},Game_System[_0x3b896f(0x3e3)][_0x3b896f(0x12e)]=function(){const _0x5c1f4f=_0x3b896f;this[_0x5c1f4f(0x348)]={'dir1':0x0,'dir2':0x0,'dir3':0x0,'dir4':0x0,'dir6':0x0,'dir7':0x0,'dir8':0x0,'dir9':0x0};},Game_System[_0x3b896f(0x3e3)][_0x3b896f(0x3ec)]=function(_0xcee1d9){const _0x175ca2=_0x3b896f;if(this[_0x175ca2(0x348)]===undefined)this[_0x175ca2(0x12e)]();const _0xc88fc7='dir%1'[_0x175ca2(0x3fb)](_0xcee1d9);return this[_0x175ca2(0x348)][_0xc88fc7]||0x0;},Game_System['prototype'][_0x3b896f(0x266)]=function(_0xd93c65,_0x3fcfe0){const _0x42b5c9=_0x3b896f;if(this['_dirMoveSpeedMod']===undefined)this[_0x42b5c9(0x12e)]();const _0x51f916='dir%1'[_0x42b5c9(0x3fb)](_0xd93c65);this['_dirMoveSpeedMod'][_0x51f916]=_0x3fcfe0||0x0;},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x112)]=Game_Picture['prototype']['isMapScrollLinked'],Game_Picture['prototype'][_0x3b896f(0x3c8)]=function(){return![];},Game_Picture[_0x3b896f(0x3e3)][_0x3b896f(0x31e)]=function(){return VisuMZ['MovementEffects']['Game_Picture_isMapScrollLinked']['call'](this);},VisuMZ[_0x3b896f(0x352)]['Game_Picture_x']=Game_Picture[_0x3b896f(0x3e3)]['x'],Game_Picture['prototype']['x']=function(){const _0x570730=_0x3b896f;let _0x479e02=VisuMZ[_0x570730(0x352)][_0x570730(0x22e)][_0x570730(0x24b)](this);return this[_0x570730(0x31e)]()&&('vyEfr'===_0x570730(0x2d0)?this['_smartBlink'][_0x570730(0x1f0)]=![]:_0x479e02*=$gameScreen[_0x570730(0x17f)]()),_0x479e02;},VisuMZ['MovementEffects']['Game_Picture_y']=Game_Picture[_0x3b896f(0x3e3)]['y'],Game_Picture[_0x3b896f(0x3e3)]['y']=function(){const _0x2e676d=_0x3b896f;let _0x8b737d=VisuMZ[_0x2e676d(0x352)]['Game_Picture_y']['call'](this);return this[_0x2e676d(0x31e)]()&&(_0x2e676d(0x16f)===_0x2e676d(0x133)?(this[_0x2e676d(0x330)](),this[_0x2e676d(0x27e)](),this[_0x2e676d(0x325)]()):_0x8b737d*=$gameScreen[_0x2e676d(0x17f)]()),_0x8b737d;},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x153)]=Game_Picture[_0x3b896f(0x3e3)][_0x3b896f(0x36c)],Game_Picture['prototype'][_0x3b896f(0x36c)]=function(){const _0x39b3ff=_0x3b896f;let _0x1fff6c=VisuMZ[_0x39b3ff(0x352)]['Game_Picture_scaleX'][_0x39b3ff(0x24b)](this);return this[_0x39b3ff(0x31e)]()&&(_0x1fff6c*=$gameScreen[_0x39b3ff(0x17f)]()),_0x1fff6c;},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x3ea)]=Game_Picture[_0x3b896f(0x3e3)][_0x3b896f(0x28c)],Game_Picture[_0x3b896f(0x3e3)][_0x3b896f(0x28c)]=function(){const _0x2740fc=_0x3b896f;let _0x2cb4c9=VisuMZ[_0x2740fc(0x352)][_0x2740fc(0x3ea)][_0x2740fc(0x24b)](this);return this['isTrueMapScrollLinked']()&&(_0x2cb4c9*=$gameScreen[_0x2740fc(0x17f)]()),_0x2cb4c9;},Game_Actor['prototype']['footstepsData']=function(){const _0x38b5ef=_0x3b896f;if(this[_0x38b5ef(0x148)]===undefined)this[_0x38b5ef(0x20f)]();return this['_footsteps'];},Game_Actor[_0x3b896f(0x3e3)]['setupMovementEffectsNotetags']=function(){const _0x209829=_0x3b896f;this[_0x209829(0x215)]();const _0x20f3e6=this['actor']()[_0x209829(0x38a)]||'';Game_Event[_0x209829(0x3e3)][_0x209829(0x3e6)][_0x209829(0x24b)](this,_0x20f3e6);},Game_Actor[_0x3b896f(0x3e3)][_0x3b896f(0x215)]=function(){const _0x2998cb=_0x3b896f;{if('QqOwp'==='QqOwp'){const _0xd896ce=VisuMZ['MovementEffects'][_0x2998cb(0x1b6)][_0x2998cb(0x3c3)];this[_0x2998cb(0x148)]={'enabled':_0xd896ce[_0x2998cb(0x1cd)],'volumeRate':_0xd896ce['actorVolumeModifier'],'pitchRate':_0xd896ce['actorPitchModifier'],'soundFrames':_0xd896ce[_0x2998cb(0x34b)][_0x2998cb(0x259)]()};}else this[_0x2998cb(0x15d)][_0x2998cb(0x285)]=_0x368351(_0x1c2faa['$1'])[_0x2998cb(0x11a)](0x0,0xff);}{if(_0x2998cb(0x3b0)===_0x2998cb(0x377))this['_smartJump'][_0x2998cb(0x1bc)]=_0x10f373['$1'][_0x2998cb(0x2a3)](',')[_0x2998cb(0x2d1)](_0x2fe57d=>(_0x422eb2(_0x2fe57d)||0x0)[_0x2998cb(0x11a)](0x0,0x7));else{const _0x3d1097=VisuMZ[_0x2998cb(0x352)]['Settings'][_0x2998cb(0x261)];this['_footprintsData']={'enabled':!![],'dir1':JSON[_0x2998cb(0x2ce)](JSON[_0x2998cb(0x2d8)](_0x3d1097[_0x2998cb(0x2ed)])),'dir2':JSON[_0x2998cb(0x2ce)](JSON[_0x2998cb(0x2d8)](_0x3d1097[_0x2998cb(0x3e4)])),'dir3':JSON[_0x2998cb(0x2ce)](JSON[_0x2998cb(0x2d8)](_0x3d1097[_0x2998cb(0x277)])),'dir4':JSON[_0x2998cb(0x2ce)](JSON[_0x2998cb(0x2d8)](_0x3d1097[_0x2998cb(0x2bc)])),'dir6':JSON[_0x2998cb(0x2ce)](JSON[_0x2998cb(0x2d8)](_0x3d1097[_0x2998cb(0x222)])),'dir7':JSON[_0x2998cb(0x2ce)](JSON[_0x2998cb(0x2d8)](_0x3d1097[_0x2998cb(0x3f3)])),'dir8':JSON['parse'](JSON[_0x2998cb(0x2d8)](_0x3d1097['dir8'])),'dir9':JSON[_0x2998cb(0x2ce)](JSON[_0x2998cb(0x2d8)](_0x3d1097[_0x2998cb(0x385)]))};}}},Game_Actor[_0x3b896f(0x3e3)][_0x3b896f(0x16d)]=function(){const _0x2ae358=_0x3b896f;if(this['_footprintsData']===undefined)this['setupMovementEffectsNotetags']();return this[_0x2ae358(0x2a4)];},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x1ac)]=Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x3a7)],Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x3a7)]=function(_0x2d27b8){const _0x2257f5=_0x3b896f;VisuMZ['MovementEffects'][_0x2257f5(0x1ac)][_0x2257f5(0x24b)](this,_0x2d27b8),this['setupRegionTerrainTagFootstepSounds'](),this[_0x2257f5(0x218)](),this[_0x2257f5(0x356)](),this[_0x2257f5(0x2fa)]();},VisuMZ['MovementEffects'][_0x3b896f(0x189)]=Game_Map['prototype'][_0x3b896f(0x2b5)],Game_Map[_0x3b896f(0x3e3)]['changeTileset']=function(_0x20e05e){const _0x5b3a40=_0x3b896f;VisuMZ[_0x5b3a40(0x352)][_0x5b3a40(0x189)][_0x5b3a40(0x24b)](this,_0x20e05e),this[_0x5b3a40(0x37b)](),this[_0x5b3a40(0x218)](),this[_0x5b3a40(0x356)](),this[_0x5b3a40(0x2fa)]();},Game_Map['prototype'][_0x3b896f(0x3d8)]=function(_0x34cedc,_0x49d670){const _0x1497bb=_0x3b896f,_0x26d89d=[0x50,0x51,0x52,0x53,0x54,0x55,0x56,0x57];_0x26d89d[_0x1497bb(0x2fc)](0x60,0x61,0x62,0x63,0x64,0x65,0x66,0x67),_0x26d89d[_0x1497bb(0x2fc)](0x70,0x71,0x72,0x73,0x74,0x75,0x76,0x77);for(let _0x17b002=0x0;_0x17b002<0x5;_0x17b002++){const _0x2abf14=$gameMap[_0x1497bb(0x147)](_0x34cedc,_0x49d670,_0x17b002);if(_0x26d89d['includes'](_0x2abf14))return!![];}return![];},Game_Map['prototype'][_0x3b896f(0x3cb)]=function(){const _0x16f423=_0x3b896f;if(!ConfigManager[_0x16f423(0x253)])return![];if($dataMap){if('QznFE'===_0x16f423(0x3c7)){const _0x245b17=VisuMZ[_0x16f423(0x352)][_0x16f423(0x239)],_0x27122f=$dataMap[_0x16f423(0x38a)]||'';if(_0x27122f[_0x16f423(0x336)](_0x245b17[_0x16f423(0x24d)])){if(_0x16f423(0x1a2)!==_0x16f423(0x1a2)){if(!this[_0x16f423(0x333)]())return _0x2a4f57[_0x16f423(0x352)][_0x16f423(0x32a)]['call'](this);let _0x6d3e55=_0x67ebcc['MovementEffects']['Game_CharacterBase_realMoveSpeed'][_0x16f423(0x24b)](this);return _0x6d3e55+=_0x263b02[_0x16f423(0x3ec)](this[_0x16f423(0x2eb)])*0x1,this===_0x5208b9&&this['isSmartRushing']()&&(_0x6d3e55*=this[_0x16f423(0x299)]||1.5),_0x49c62e[_0x16f423(0x22c)](0x1,_0x6d3e55);}else return!![];}else{if(_0x27122f[_0x16f423(0x336)](_0x245b17[_0x16f423(0x29a)]))return![];}}else _0x22cc38[_0x16f423(0x352)]['Spriteset_Map_update'][_0x16f423(0x24b)](this),this[_0x16f423(0x18c)](),this[_0x16f423(0x1e1)](),this[_0x16f423(0x389)]();}return $gameSystem[_0x16f423(0x3a9)]();},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x2dc)]=Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x2f7)],Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x2f7)]=function(){const _0x20b62e=_0x3b896f;let _0x10a55b=VisuMZ[_0x20b62e(0x352)]['Game_Map_parallaxOx']['call'](this);if(this['_parallaxZero'])_0x10a55b=Math[_0x20b62e(0x28a)](_0x10a55b);return _0x10a55b;},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x2cc)]=Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x16e)],Game_Map['prototype'][_0x3b896f(0x16e)]=function(){const _0x37a185=_0x3b896f;let _0x40d5d1=VisuMZ[_0x37a185(0x352)][_0x37a185(0x2cc)][_0x37a185(0x24b)](this);if(this[_0x37a185(0x23f)])_0x40d5d1=Math[_0x37a185(0x28a)](_0x40d5d1);return _0x40d5d1;},Game_Map[_0x3b896f(0x3e3)]['canShowDustCloud']=function(){const _0x54f5d7=_0x3b896f;if(!ConfigManager[_0x54f5d7(0x3e1)])return![];if($dataMap){const _0x376523=VisuMZ[_0x54f5d7(0x352)]['RegExp'],_0xe38605=$dataMap[_0x54f5d7(0x38a)]||'';if(_0xe38605[_0x54f5d7(0x336)](_0x376523['ForceDustCloud']))return!![];else{if(_0xe38605[_0x54f5d7(0x336)](_0x376523['NoDustCloud']))return![];}}return $gameSystem[_0x54f5d7(0x33c)]();},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x3b2)]=function(){const _0x5001ce=_0x3b896f;if(!ConfigManager[_0x5001ce(0x19f)])return![];if($dataMap){const _0x59ac3e=VisuMZ[_0x5001ce(0x352)][_0x5001ce(0x239)],_0x30a2cf=$dataMap[_0x5001ce(0x38a)]||'';if(_0x30a2cf[_0x5001ce(0x336)](_0x59ac3e[_0x5001ce(0x379)])){if(_0x5001ce(0x2ae)===_0x5001ce(0x123))_0xf53384['name']!==''&&_0x329d81['playSe'](_0x593c52),_0x304051>0x0&&_0x1bd99b[_0x5001ce(0x263)]([_0x3be0de],_0x50f65a),_0x4eaaa5>0x0&&_0x4400d3[_0x5001ce(0x115)][_0x5001ce(0x388)](_0x2a7df7);else return!![];}else{if(_0x30a2cf[_0x5001ce(0x336)](_0x59ac3e[_0x5001ce(0x12a)]))return _0x5001ce(0x24f)===_0x5001ce(0x289)?this[_0x5001ce(0x24a)]():![];}}return $gameSystem[_0x5001ce(0x3b2)]();},Game_Map['prototype'][_0x3b896f(0x37b)]=function(){const _0x3d3166=_0x3b896f;this['initRegionTerrainTagFootstepSounds'](),this[_0x3d3166(0x27e)](),this[_0x3d3166(0x325)]();},Game_Map['prototype'][_0x3b896f(0x330)]=function(){const _0x28e8f3=_0x3b896f;this[_0x28e8f3(0x138)]={},this[_0x28e8f3(0x2f6)]={};},Game_Map[_0x3b896f(0x3e3)]['parseRegionBasedFootstepSounds']=function(){const _0xe159a3=_0x3b896f;if(!$dataMap)return;const _0x406047=VisuMZ[_0xe159a3(0x352)][_0xe159a3(0x1b6)][_0xe159a3(0x3c3)],_0x11dc5e=VisuMZ['MovementEffects'][_0xe159a3(0x239)],_0x12f3c4=$dataMap[_0xe159a3(0x38a)]||'',_0x4a2b80=_0x12f3c4[_0xe159a3(0x336)](_0x11dc5e[_0xe159a3(0x2d5)]);if(_0x4a2b80){if(_0xe159a3(0x238)===_0xe159a3(0x172))return(this[_0xe159a3(0x14b)]!==this[_0xe159a3(0x1dc)]||this[_0xe159a3(0x206)]!==this[_0xe159a3(0x198)])&&(this[_0xe159a3(0x192)]=![],this[_0xe159a3(0x14b)]=this[_0xe159a3(0x1dc)],this[_0xe159a3(0x206)]=this['_realY']),!this[_0xe159a3(0x192)];else for(const _0x3deeff of _0x4a2b80){_0x3deeff['match'](_0x11dc5e[_0xe159a3(0x2d5)]);const _0x126feb=Number(RegExp['$1'])[_0xe159a3(0x11a)](0x0,0xff),_0x33b679=String(RegExp['$2'])[_0xe159a3(0x2a3)](',')[_0xe159a3(0x2d1)](_0x475cbf=>_0x475cbf[_0xe159a3(0x196)]());this[_0xe159a3(0x138)][_0x126feb]={'name':_0x33b679[0x0]||'','volume':Number(_0x33b679[0x1]??_0x406047[_0xe159a3(0x1f8)]),'pitch':Number(_0x33b679[0x2]??_0x406047[_0xe159a3(0x301)]),'pan':Number(_0x33b679[0x3]??_0x406047[_0xe159a3(0x3db)])};}}const _0x341565=_0x12f3c4[_0xe159a3(0x336)](_0x11dc5e['NoRegionFootstepSfx']);if(_0x341565)for(const _0x703c27 of _0x341565){if(_0xe159a3(0x136)===_0xe159a3(0x136)){_0x703c27['match'](_0x11dc5e[_0xe159a3(0x219)]);const _0x3a5964=Number(RegExp['$1'])[_0xe159a3(0x11a)](0x0,0xff);this[_0xe159a3(0x138)][_0x3a5964]={'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}else{if(_0x266d68[_0xe159a3(0x2c6)]()&&this[_0xe159a3(0x24a)]()[_0xe159a3(0x1f0)])return this[_0xe159a3(0x24a)]();else{if(_0x3e0e46[_0xe159a3(0x322)]()&&this[_0xe159a3(0x17c)]()[_0xe159a3(0x1f0)])return this[_0xe159a3(0x17c)]();}return _0x56b1c3[_0xe159a3(0x3e3)][_0xe159a3(0x1ef)]['call'](this);}}},Game_Map[_0x3b896f(0x3e3)]['parseTerrainTagBasedFootstepSounds']=function(){const _0x18a5da=_0x3b896f;if(!this['tileset']())return;const _0x568734=VisuMZ['MovementEffects'][_0x18a5da(0x1b6)][_0x18a5da(0x3c3)],_0x1d8f58=VisuMZ[_0x18a5da(0x352)]['RegExp'],_0x43587a=this['tileset']()[_0x18a5da(0x38a)]||'',_0x8f6eed=_0x43587a[_0x18a5da(0x336)](_0x1d8f58['TerrainTagFootstepSfx']);if(_0x8f6eed)for(const _0xa15621 of _0x8f6eed){if('FfOWc'!==_0x18a5da(0x1e5))_0xf52ee6[_0x18a5da(0x352)][_0x18a5da(0x178)]['call'](this),this['updateMotionBlurEffectFilter'](),this[_0x18a5da(0x3de)]();else{_0xa15621[_0x18a5da(0x336)](_0x1d8f58[_0x18a5da(0x1c9)]);const _0x54a418=Number(RegExp['$1'])[_0x18a5da(0x11a)](0x0,0xff),_0x35669d=String(RegExp['$2'])[_0x18a5da(0x2a3)](',')['map'](_0x462326=>_0x462326[_0x18a5da(0x196)]());this['_terrainTagFootstepSounds'][_0x54a418]={'name':_0x35669d[0x0]||'','volume':Number(_0x35669d[0x1]??_0x568734[_0x18a5da(0x1f8)]),'pitch':Number(_0x35669d[0x2]??_0x568734[_0x18a5da(0x301)]),'pan':Number(_0x35669d[0x3]??_0x568734[_0x18a5da(0x3db)])};}}const _0x4d614b=_0x43587a['match'](_0x1d8f58[_0x18a5da(0x290)]);if(_0x4d614b){if(_0x18a5da(0x233)!==_0x18a5da(0x1d7))for(const _0x4860be of _0x4d614b){_0x4860be[_0x18a5da(0x336)](_0x1d8f58[_0x18a5da(0x290)]);const _0x54f25a=Number(RegExp['$1'])['clamp'](0x0,0x7);this['_terrainTagFootstepSounds'][_0x54f25a]={'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}else{const _0x14a78c=_0x13e881[_0x18a5da(0x3d6)](),_0x5a26d2=(_0x14a78c-0x1)/_0x14a78c;this[_0x18a5da(0x199)]['x']=this['_baseSprite'][_0x18a5da(0x199)]['x'],this['anchor']['y']=this[_0x18a5da(0x36e)][_0x18a5da(0x199)]['y'],this['opacity']=this['_baseSprite'][_0x18a5da(0x1c6)],this['scale']['x']=this['_baseSprite']['scale']['x'],this[_0x18a5da(0x3b8)]['y']=this[_0x18a5da(0x36e)]['scale']['y'],this['x']=this['_baseSprite']['x'],this['y']=this[_0x18a5da(0x36e)]['y'],this['z']=this['_baseSprite']['z'],this[_0x18a5da(0x1dc)]=this['_character']['_realX'],this[_0x18a5da(0x198)]=this[_0x18a5da(0x162)][_0x18a5da(0x198)],this['_shiftY']=this[_0x18a5da(0x162)][_0x18a5da(0x3be)](),this[_0x18a5da(0x132)]=this[_0x18a5da(0x162)]['jumpHeight']();}}},Game_Map[_0x3b896f(0x3e3)]['applyFootstepSoundTileChanges']=function(_0x2786c1,_0x239d38){const _0x554964=_0x3b896f;if(!_0x2786c1)return;if(!_0x239d38)return;(this[_0x554964(0x138)]===undefined||this['_terrainTagFootstepSounds']===undefined)&&this[_0x554964(0x37b)]();const _0x562c2c=_0x239d38['x'],_0x2ac136=_0x239d38['y'],_0x3c32fa=this[_0x554964(0x321)](_0x562c2c,_0x2ac136),_0x5362c1=this['terrainTag'](_0x562c2c,_0x2ac136),_0x1c04e1=[_0x554964(0x399),_0x554964(0x1f8),_0x554964(0x301),_0x554964(0x3db)];if(this['_terrainTagFootstepSounds'][_0x5362c1]){const _0x296c46=this[_0x554964(0x2f6)][_0x5362c1];for(const _0x386ccd of _0x1c04e1){_0x2786c1[_0x386ccd]=_0x296c46[_0x386ccd];}}if(this['_regionFootstepSounds'][_0x3c32fa]){const _0x3b30e9=this[_0x554964(0x138)][_0x3c32fa];for(const _0x313e00 of _0x1c04e1){_0x2786c1[_0x313e00]=_0x3b30e9[_0x313e00];}}},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x13e)]=function(_0x3bf5f4,_0x1d7f87){const _0x3b8a45=_0x3b896f;if(!ConfigManager[_0x3b8a45(0x3eb)])return![];if(!$gameSystem[_0x3b8a45(0x13e)]())return![];if(this[_0x3b8a45(0x400)]===undefined)this[_0x3b8a45(0x218)]();const _0x21a0d4=this[_0x3b8a45(0x321)](_0x3bf5f4,_0x1d7f87),_0x22d3b4=this[_0x3b8a45(0x13c)](_0x3bf5f4,_0x1d7f87);if(this[_0x3b8a45(0x400)]['forbidden'][_0x3b8a45(0x2da)]['includes'](_0x21a0d4))return![];if(this['_footprints'][_0x3b8a45(0x230)]['terrainTags']['includes'](_0x22d3b4))return![];if(this['_footprints'][_0x3b8a45(0x1e9)][_0x3b8a45(0x2da)][_0x3b8a45(0x179)](_0x21a0d4))return!![];if(this[_0x3b8a45(0x400)][_0x3b8a45(0x1e9)][_0x3b8a45(0x221)]['includes'](_0x22d3b4))return!![];return![];},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x218)]=function(){const _0x437860=_0x3b896f;this['initRegionTerrainTagFootprints'](),this[_0x437860(0x164)](),this[_0x437860(0x18b)]();},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x369)]=function(){const _0x481de1=_0x3b896f,_0x1e7dca=VisuMZ[_0x481de1(0x352)][_0x481de1(0x1b6)][_0x481de1(0x261)];this[_0x481de1(0x400)]={'allowed':{'regions':_0x1e7dca[_0x481de1(0x195)][_0x481de1(0x259)](),'terrainTags':_0x1e7dca['DefaultTerrainTags']['clone']()},'forbidden':{'regions':[],'terrainTags':[]},'opacity':{'regions':{},'terrainTags':{}},'duration':{'regions':{},'terrainTags':{}}};},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x164)]=function(){const _0x171b30=_0x3b896f;if(!$dataMap)return;if(this[_0x171b30(0x400)]===undefined)this['setupRegionTerrainTagFootprints']();const _0x1088bc=VisuMZ[_0x171b30(0x352)][_0x171b30(0x239)],_0x59c727=$dataMap[_0x171b30(0x38a)]||'';_0x59c727[_0x171b30(0x336)](_0x1088bc[_0x171b30(0x374)])&&(this['_footprints'][_0x171b30(0x1e9)][_0x171b30(0x2da)]=RegExp['$1'][_0x171b30(0x2a3)](',')[_0x171b30(0x2d1)](_0x491fb7=>(Number(_0x491fb7)||0x0)[_0x171b30(0x11a)](0x0,0xff)));_0x59c727['match'](_0x1088bc[_0x171b30(0x246)])&&('HVhBb'!==_0x171b30(0x1ea)?this[_0x171b30(0x400)][_0x171b30(0x230)]['regions']=RegExp['$1']['split'](',')[_0x171b30(0x2d1)](_0x567efa=>(Number(_0x567efa)||0x0)[_0x171b30(0x11a)](0x0,0xff)):this[_0x171b30(0x148)][_0x171b30(0x38e)]=_0x43184d(_0x1d8c52['$1'])*0.01);const _0x19f07d=_0x59c727[_0x171b30(0x336)](_0x1088bc[_0x171b30(0x31f)]);if(_0x19f07d){if(_0x171b30(0x327)===_0x171b30(0x327))for(const _0x1ef9fe of _0x19f07d){_0x1ef9fe[_0x171b30(0x336)](_0x1088bc[_0x171b30(0x31f)]);const _0x19d451=Number(RegExp['$1'])[_0x171b30(0x11a)](0x0,0xff),_0x4e068d=Number(RegExp['$2'])[_0x171b30(0x11a)](0x0,0xff);this[_0x171b30(0x400)][_0x171b30(0x1c6)][_0x171b30(0x2da)][_0x19d451]=_0x4e068d;}else this[_0x171b30(0x2e4)]();}const _0x208199=_0x59c727[_0x171b30(0x336)](_0x1088bc[_0x171b30(0x15e)]);if(_0x208199)for(const _0x5c325e of _0x208199){if(_0x171b30(0x23b)===_0x171b30(0x3b4))_0x326dff[_0x171b30(0x3db)]-=_0x189a97*_0x4269f0[_0x171b30(0x2ba)];else{_0x5c325e[_0x171b30(0x336)](_0x1088bc['RegionFootprintDuration']);const _0x168ef5=Number(RegExp['$1'])[_0x171b30(0x11a)](0x0,0xff),_0x59832e=Math[_0x171b30(0x22c)](0x1,Number(RegExp['$2']));this[_0x171b30(0x400)][_0x171b30(0x394)][_0x171b30(0x2da)][_0x168ef5]=_0x59832e;}}},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x18b)]=function(){const _0x58176f=_0x3b896f;if(!this[_0x58176f(0x3ae)]())return;if(this[_0x58176f(0x400)]===undefined)this[_0x58176f(0x218)]();const _0x31eebb=VisuMZ[_0x58176f(0x352)]['RegExp'],_0x4ed26b=this[_0x58176f(0x3ae)]()[_0x58176f(0x38a)]||'';_0x4ed26b[_0x58176f(0x336)](_0x31eebb['FootprintTerrainTags'])&&(this[_0x58176f(0x400)][_0x58176f(0x1e9)][_0x58176f(0x221)]=RegExp['$1'][_0x58176f(0x2a3)](',')[_0x58176f(0x2d1)](_0x1c9af2=>(Number(_0x1c9af2)||0x0)['clamp'](0x0,0x7)));_0x4ed26b[_0x58176f(0x336)](_0x31eebb[_0x58176f(0x2a0)])&&(this[_0x58176f(0x400)][_0x58176f(0x230)]['terrainTags']=RegExp['$1'][_0x58176f(0x2a3)](',')[_0x58176f(0x2d1)](_0x219de9=>(Number(_0x219de9)||0x0)[_0x58176f(0x11a)](0x0,0x7)));const _0x3590ae=_0x4ed26b['match'](_0x31eebb[_0x58176f(0x18a)]);if(_0x3590ae)for(const _0x53ceaa of _0x3590ae){_0x53ceaa[_0x58176f(0x336)](_0x31eebb[_0x58176f(0x18a)]);const _0x3f96af=Number(RegExp['$1'])[_0x58176f(0x11a)](0x0,0xff),_0x495115=Number(RegExp['$2'])[_0x58176f(0x11a)](0x0,0xff);this[_0x58176f(0x400)][_0x58176f(0x1c6)][_0x58176f(0x221)][_0x3f96af]=_0x495115;}const _0xa6da4c=_0x4ed26b[_0x58176f(0x336)](_0x31eebb[_0x58176f(0x1ec)]);if(_0xa6da4c)for(const _0x25f1e7 of _0xa6da4c){if('sslfX'!==_0x58176f(0x17a)){_0x25f1e7[_0x58176f(0x336)](_0x31eebb['TerrainTagFootprintDuration']);const _0x21183e=Number(RegExp['$1'])[_0x58176f(0x11a)](0x0,0xff),_0x945b35=Math['max'](0x1,Number(RegExp['$2']));this[_0x58176f(0x400)]['duration'][_0x58176f(0x221)][_0x21183e]=_0x945b35;}else for(const _0x3fe220 of _0x47bbd7){_0x3fe220[_0x58176f(0x336)](_0x4c193b[_0x58176f(0x18a)]);const _0x522d7a=_0x1113e9(_0x2fdfc1['$1'])[_0x58176f(0x11a)](0x0,0xff),_0x1c82ec=_0x1b7108(_0x5abd68['$2'])['clamp'](0x0,0xff);this[_0x58176f(0x400)][_0x58176f(0x1c6)]['terrainTags'][_0x522d7a]=_0x1c82ec;}}},Game_Map[_0x3b896f(0x3e3)]['footprintOpacityAtXy']=function(_0x575a08,_0x4c1c4a){const _0x3c5e45=_0x3b896f;if(this[_0x3c5e45(0x400)]===undefined)this[_0x3c5e45(0x218)]();const _0x317652=VisuMZ[_0x3c5e45(0x352)]['Settings'][_0x3c5e45(0x261)],_0x97fd86=this[_0x3c5e45(0x321)](_0x575a08,_0x4c1c4a),_0x586621=this['terrainTag'](_0x575a08,_0x4c1c4a);if(this[_0x3c5e45(0x400)]['opacity'][_0x3c5e45(0x2da)][_0x97fd86]!==undefined)return this['_footprints'][_0x3c5e45(0x1c6)]['regions'][_0x97fd86];else{if(this[_0x3c5e45(0x400)][_0x3c5e45(0x1c6)][_0x3c5e45(0x221)][_0x586621]!==undefined)return this['_footprints'][_0x3c5e45(0x1c6)][_0x3c5e45(0x221)][_0x586621];}return _0x317652['startOpacity'];},Game_Map['prototype'][_0x3b896f(0x38b)]=function(_0xd31a33,_0x122aad){const _0x103711=_0x3b896f;if(this[_0x103711(0x400)]===undefined)this[_0x103711(0x218)]();const _0x3b4982=VisuMZ[_0x103711(0x352)][_0x103711(0x1b6)]['Footprints'],_0x57566a=this[_0x103711(0x321)](_0xd31a33,_0x122aad),_0x367d8e=this[_0x103711(0x13c)](_0xd31a33,_0x122aad);if(this[_0x103711(0x400)][_0x103711(0x394)]['regions'][_0x57566a]!==undefined)return this['_footprints'][_0x103711(0x394)][_0x103711(0x2da)][_0x57566a];else{if(this[_0x103711(0x400)][_0x103711(0x394)]['terrainTags'][_0x367d8e]!==undefined)return this[_0x103711(0x400)]['duration'][_0x103711(0x221)][_0x367d8e];}return _0x3b4982[_0x103711(0x124)];},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x356)]=function(){const _0x3d56dc=_0x3b896f;this[_0x3d56dc(0x31c)](),this[_0x3d56dc(0x116)](),this[_0x3d56dc(0x291)]();},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x31c)]=function(){const _0x30ea6e=_0x3b896f,_0x232f94=VisuMZ[_0x30ea6e(0x352)][_0x30ea6e(0x1b6)][_0x30ea6e(0x187)];this['_smartRush']={'enabled':!![],'NonCrashRegions':(_0x232f94[_0x30ea6e(0x31a)]||[])['clone'](),'NonCrashTerrainTags':(_0x232f94['NonCrashTerrainTags']||[])['clone']()};},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x116)]=function(){const _0x254833=_0x3b896f,_0x256b91=VisuMZ[_0x254833(0x352)][_0x254833(0x239)],_0x4d462e=$dataMap['note']||'';_0x4d462e[_0x254833(0x336)](_0x256b91[_0x254833(0x2c1)])&&(this[_0x254833(0x2f1)][_0x254833(0x1f0)]=![]),_0x4d462e['match'](_0x256b91[_0x254833(0x3a6)])&&(this['_smartRush'][_0x254833(0x31a)]=RegExp['$1'][_0x254833(0x2a3)](',')[_0x254833(0x2d1)](_0xf59d3c=>(Number(_0xf59d3c)||0x0)[_0x254833(0x11a)](0x0,0xff)));},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x291)]=function(){const _0x546881=_0x3b896f,_0x2aa25e=VisuMZ[_0x546881(0x352)][_0x546881(0x239)];if(!this[_0x546881(0x3ae)]())return;const _0x3eb454=this[_0x546881(0x3ae)]()[_0x546881(0x38a)]||'';if(_0x3eb454[_0x546881(0x336)](_0x2aa25e[_0x546881(0x298)])){if('LCJVT'!==_0x546881(0x397))this[_0x546881(0x2f1)][_0x546881(0x21d)]=RegExp['$1'][_0x546881(0x2a3)](',')[_0x546881(0x2d1)](_0x66d049=>(Number(_0x66d049)||0x0)[_0x546881(0x11a)](0x0,0x7));else{_0x529092[_0x546881(0x336)](_0x99a501[_0x546881(0x290)]);const _0x351e3f=_0x2b81f1(_0x261777['$1'])[_0x546881(0x11a)](0x0,0x7);this[_0x546881(0x2f6)][_0x351e3f]={'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}}},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x398)]=function(){const _0x32ce34=_0x3b896f;if(this[_0x32ce34(0x2f1)]===undefined)this['setupRegionTerrainTagSmartRush']();return this[_0x32ce34(0x2f1)][_0x32ce34(0x1f0)];},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x2b6)]=function(_0x2c0277,_0xb71337,_0x2d2897){const _0x2106fc=_0x3b896f,_0x477714=this[_0x2106fc(0x384)](_0x2c0277,_0x2d2897),_0x1a7d02=this[_0x2106fc(0x118)](_0xb71337,_0x2d2897);if($gameMap['checkPassage'](_0x477714,_0x1a7d02,0x200))return![];if($gameMap[_0x2106fc(0x2ef)](_0x477714,_0x1a7d02,0x400))return![];if(_0x477714<0x0||_0x477714>=this[_0x2106fc(0x269)]())return![];if(_0x1a7d02<0x0||_0x1a7d02>=this[_0x2106fc(0x1a4)]())return![];const _0x1f962d=this[_0x2106fc(0x321)](_0x477714,_0x1a7d02);if(this[_0x2106fc(0x2f1)][_0x2106fc(0x31a)][_0x2106fc(0x179)](_0x1f962d))return![];const _0x439139=this[_0x2106fc(0x13c)](_0x477714,_0x1a7d02);if(this[_0x2106fc(0x2f1)][_0x2106fc(0x21d)][_0x2106fc(0x179)](_0x439139))return![];return Game_Player['SMART_RUSH_SHAKE_ENABLED'];},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x2fa)]=function(){const _0x40f496=_0x3b896f;this[_0x40f496(0x1d6)](),this[_0x40f496(0x237)](),this['parseTerrainTagBasedSmartBlink']();},Game_Map[_0x3b896f(0x3e3)]['initRegionTerrainTagSmartBlink']=function(){const _0x5deb5c=_0x3b896f,_0x41a894=VisuMZ[_0x5deb5c(0x352)]['Settings']['SmartBlink'];this[_0x5deb5c(0x1ed)]={'enabled':!![],'NonLandableRegions':(_0x41a894['NonLandableRegions']||[])['clone'](),'NonLandableTerrainTags':(_0x41a894[_0x5deb5c(0x183)]||[])[_0x5deb5c(0x259)](),'NonPassableRegions':(_0x41a894[_0x5deb5c(0x2bb)]||[])[_0x5deb5c(0x259)](),'NonPassableTerrainTags':(_0x41a894[_0x5deb5c(0x1bc)]||[])[_0x5deb5c(0x259)]()};},Game_Map['prototype'][_0x3b896f(0x237)]=function(){const _0x2f4271=_0x3b896f,_0x4c6988=VisuMZ['MovementEffects'][_0x2f4271(0x239)],_0x110317=$dataMap['note']||'';_0x110317['match'](_0x4c6988['NoSmartBlink'])&&(this['_smartBlink'][_0x2f4271(0x1f0)]=![]),_0x110317['match'](_0x4c6988[_0x2f4271(0x27b)])&&('ilsha'===_0x2f4271(0x1b7)?this[_0x2f4271(0x1ed)][_0x2f4271(0x28f)]=RegExp['$1'][_0x2f4271(0x2a3)](',')[_0x2f4271(0x2d1)](_0x7ee5ae=>(Number(_0x7ee5ae)||0x0)[_0x2f4271(0x11a)](0x0,0xff)):(_0x5da647[_0x2f4271(0x399)]!==''&&_0x25baf0[_0x2f4271(0x247)](_0x3490f2),_0x5f3980>0x0&&_0x49f01b[_0x2f4271(0x263)]([_0x3a288a],_0x8ab1cc),_0x4e056e>0x0&&_0x2b9317['_scene'][_0x2f4271(0x388)](_0x46fff9))),_0x110317[_0x2f4271(0x336)](_0x4c6988[_0x2f4271(0x168)])&&(_0x2f4271(0x340)==='kGOSM'?this[_0x2f4271(0x1ed)][_0x2f4271(0x2bb)]=RegExp['$1'][_0x2f4271(0x2a3)](',')[_0x2f4271(0x2d1)](_0x4b5037=>(Number(_0x4b5037)||0x0)[_0x2f4271(0x11a)](0x0,0xff)):this[_0x2f4271(0x378)]());},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x3f8)]=function(){const _0x3af9bd=_0x3b896f,_0x40eaa5=VisuMZ['MovementEffects']['RegExp'];if(!this[_0x3af9bd(0x3ae)]())return;const _0x520462=this[_0x3af9bd(0x3ae)]()[_0x3af9bd(0x38a)]||'';if(_0x520462[_0x3af9bd(0x336)](_0x40eaa5['SmartBlinkNonLandTerrainTags'])){if(_0x3af9bd(0x3ca)!==_0x3af9bd(0x1a9))this[_0x3af9bd(0x1ed)][_0x3af9bd(0x183)]=RegExp['$1']['split'](',')[_0x3af9bd(0x2d1)](_0x681b72=>(Number(_0x681b72)||0x0)[_0x3af9bd(0x11a)](0x0,0x7));else{if(this[_0x3af9bd(0x400)]===_0x15e777)this[_0x3af9bd(0x218)]();const _0x145b15=_0x3cea58[_0x3af9bd(0x352)][_0x3af9bd(0x1b6)][_0x3af9bd(0x261)],_0x14b550=this['regionId'](_0x16f2b5,_0x5e5050),_0x3a69ad=this[_0x3af9bd(0x13c)](_0x1e7988,_0x1c1a99);if(this[_0x3af9bd(0x400)][_0x3af9bd(0x1c6)][_0x3af9bd(0x2da)][_0x14b550]!==_0x1e038e)return this['_footprints'][_0x3af9bd(0x1c6)][_0x3af9bd(0x2da)][_0x14b550];else{if(this[_0x3af9bd(0x400)][_0x3af9bd(0x1c6)][_0x3af9bd(0x221)][_0x3a69ad]!==_0x40a722)return this[_0x3af9bd(0x400)][_0x3af9bd(0x1c6)][_0x3af9bd(0x221)][_0x3a69ad];}return _0x145b15[_0x3af9bd(0x29e)];}}_0x520462[_0x3af9bd(0x336)](_0x40eaa5['SmartBlinkNonPassTerrainTags'])&&(_0x3af9bd(0x21f)===_0x3af9bd(0x21f)?this[_0x3af9bd(0x1ed)][_0x3af9bd(0x1bc)]=RegExp['$1'][_0x3af9bd(0x2a3)](',')[_0x3af9bd(0x2d1)](_0x50fea1=>(Number(_0x50fea1)||0x0)[_0x3af9bd(0x11a)](0x0,0x7)):(_0x488ea4[_0x3af9bd(0x352)][_0x3af9bd(0x167)][_0x3af9bd(0x24b)](this),_0x4a33ac&&_0x52f3a8[_0x3af9bd(0x1bd)]()));},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x337)]=function(){const _0x3dd268=_0x3b896f;if(this[_0x3dd268(0x1ed)]===undefined)this[_0x3dd268(0x2fa)]();return this[_0x3dd268(0x1ed)][_0x3dd268(0x1f0)];},Game_Map[_0x3b896f(0x3e3)]['isTileSmartBlinkNonPassable']=function(_0xefd25e,_0x58c048){const _0x4a2777=_0x3b896f,_0xf2763e=this[_0x4a2777(0x321)](_0xefd25e,_0x58c048),_0x589f3d=this[_0x4a2777(0x13c)](_0xefd25e,_0x58c048);if(this[_0x4a2777(0x1ed)]===undefined)this['setupRegionTerrainTagSmartBlink']();if(this[_0x4a2777(0x1ed)][_0x4a2777(0x2bb)][_0x4a2777(0x179)](_0xf2763e))return!![];if(this[_0x4a2777(0x1ed)][_0x4a2777(0x1bc)][_0x4a2777(0x179)](_0x589f3d))return!![];return![];},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x2de)]=function(_0x34036d,_0xd14bb){const _0x2834e7=_0x3b896f,_0x117da2=this[_0x2834e7(0x321)](_0x34036d,_0xd14bb),_0x12ea91=this[_0x2834e7(0x13c)](_0x34036d,_0xd14bb);if(this[_0x2834e7(0x1ed)]===undefined)this[_0x2834e7(0x2fa)]();if(this[_0x2834e7(0x1ed)][_0x2834e7(0x28f)][_0x2834e7(0x179)](_0x117da2))return!![];if(this['_smartBlink']['NonLandableTerrainTags'][_0x2834e7(0x179)](_0x12ea91))return!![];return![];},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x17d)]=function(){const _0x422d1e=_0x3b896f;this[_0x422d1e(0x245)](),this[_0x422d1e(0x30f)](),this[_0x422d1e(0x1e0)]();},Game_Map['prototype'][_0x3b896f(0x245)]=function(){const _0x55a5b1=_0x3b896f,_0x2db85f=VisuMZ[_0x55a5b1(0x352)][_0x55a5b1(0x1b6)][_0x55a5b1(0x155)];this[_0x55a5b1(0x15d)]={'enabled':!![],'HeightBasedRegions':(_0x2db85f[_0x55a5b1(0x114)]||[])[_0x55a5b1(0x259)](),'NonLandableRegions':(_0x2db85f[_0x55a5b1(0x28f)]||[])[_0x55a5b1(0x259)](),'NonLandableTerrainTags':(_0x2db85f[_0x55a5b1(0x183)]||[])[_0x55a5b1(0x259)](),'NonPassableRegions':(_0x2db85f[_0x55a5b1(0x2bb)]||[])[_0x55a5b1(0x259)](),'NonPassableTerrainTags':(_0x2db85f[_0x55a5b1(0x1bc)]||[])[_0x55a5b1(0x259)]()};},Game_Map['prototype']['parseRegionBasedSmartJump']=function(){const _0x8815aa=_0x3b896f,_0x1dd5f3=VisuMZ['MovementEffects'][_0x8815aa(0x239)],_0x35e45f=$dataMap[_0x8815aa(0x38a)]||'';_0x35e45f[_0x8815aa(0x336)](_0x1dd5f3[_0x8815aa(0x2e0)])&&(this[_0x8815aa(0x15d)][_0x8815aa(0x1f0)]=![]);_0x35e45f['match'](_0x1dd5f3['SmartJumpLedgeRegion'])&&(this[_0x8815aa(0x15d)][_0x8815aa(0x285)]=Number(RegExp['$1'])[_0x8815aa(0x11a)](0x0,0xff));if(_0x35e45f['match'](_0x1dd5f3[_0x8815aa(0x3bb)])){if(_0x8815aa(0x292)!==_0x8815aa(0x292)){if(this[_0x8815aa(0x39b)]())return;this[_0x8815aa(0x1cb)]=![];if(this[_0x8815aa(0x34f)]()){let _0x226d49=_0x2f56f6['max'](_0x997f0d[_0x8815aa(0x300)](this[_0x8815aa(0x16a)]/0x2),0x1);while(_0x226d49--)this[_0x8815aa(0x2fd)]();}if(this[_0x8815aa(0x3b2)]())this[_0x8815aa(0x1db)]();_0x26ef57(this[_0x8815aa(0x30d)][_0x8815aa(0x1b8)](this,[0x1,0x2]),0x32);}else this[_0x8815aa(0x15d)]['HeightBasedRegions']=RegExp['$1'][_0x8815aa(0x2a3)](',')['map'](_0x9b6b96=>(Number(_0x9b6b96)||0x0)[_0x8815aa(0x11a)](0x0,0xff)),this[_0x8815aa(0x15d)]['HeightBasedRegions'][_0x8815aa(0x2cf)]();}_0x35e45f[_0x8815aa(0x336)](_0x1dd5f3['SmartJumpNonLandRegions'])&&(this[_0x8815aa(0x15d)][_0x8815aa(0x28f)]=RegExp['$1'][_0x8815aa(0x2a3)](',')[_0x8815aa(0x2d1)](_0x1204f3=>(Number(_0x1204f3)||0x0)['clamp'](0x0,0xff))),_0x35e45f['match'](_0x1dd5f3['SmartJumpNonPassRegions'])&&(_0x8815aa(0x1ae)===_0x8815aa(0x1ae)?this[_0x8815aa(0x15d)][_0x8815aa(0x2bb)]=RegExp['$1'][_0x8815aa(0x2a3)](',')[_0x8815aa(0x2d1)](_0x540324=>(Number(_0x540324)||0x0)[_0x8815aa(0x11a)](0x0,0xff)):this[_0x8815aa(0x400)]['allowed'][_0x8815aa(0x221)]=_0x6387f8['$1'][_0x8815aa(0x2a3)](',')[_0x8815aa(0x2d1)](_0x4cf4d6=>(_0x1269bd(_0x4cf4d6)||0x0)[_0x8815aa(0x11a)](0x0,0x7)));},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x1e0)]=function(){const _0x2360a0=_0x3b896f,_0xb7ddb9=VisuMZ[_0x2360a0(0x352)]['RegExp'];if(!this[_0x2360a0(0x3ae)]())return;const _0x946cdb=this[_0x2360a0(0x3ae)]()[_0x2360a0(0x38a)]||'';_0x946cdb['match'](_0xb7ddb9['SmartJumpNonLandTerrainTags'])&&(this[_0x2360a0(0x15d)]['NonLandableTerrainTags']=RegExp['$1'][_0x2360a0(0x2a3)](',')['map'](_0x41175b=>(Number(_0x41175b)||0x0)['clamp'](0x0,0x7)));if(_0x946cdb['match'](_0xb7ddb9[_0x2360a0(0x27d)])){if(_0x2360a0(0x1a1)===_0x2360a0(0x1a1))this['_smartJump']['NonPassableTerrainTags']=RegExp['$1'][_0x2360a0(0x2a3)](',')[_0x2360a0(0x2d1)](_0x4fd1d7=>(Number(_0x4fd1d7)||0x0)[_0x2360a0(0x11a)](0x0,0x7));else return this[_0x2360a0(0x257)]()?this['actor']()['footprintsData']():_0x1602b8[_0x2360a0(0x3e3)][_0x2360a0(0x16d)]['call'](this);}},Game_Map['prototype']['isSmartJumpEnabled']=function(){const _0x4b51d0=_0x3b896f;if(this[_0x4b51d0(0x15d)]===undefined)this[_0x4b51d0(0x17d)]();return this[_0x4b51d0(0x15d)][_0x4b51d0(0x1f0)];},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x3cc)]=function(_0xc7a646,_0x1ab53a){const _0x23a3dd=_0x3b896f;if(this[_0x23a3dd(0x15d)]===undefined)this[_0x23a3dd(0x17d)]();const _0x3abed1=this['regionId'](_0xc7a646,_0x1ab53a);return this[_0x23a3dd(0x343)](_0x3abed1);;},Game_Map['prototype'][_0x3b896f(0x264)]=function(_0x1a3b7a){const _0x17f542=_0x3b896f;if(this[_0x17f542(0x15d)]===undefined)this['setupRegionTerrainTagSmartJump']();const _0x3695d9=this[_0x17f542(0x15d)]['HeightBasedRegions'][_0x17f542(0x2be)](_0x1a3b7a);return _0x3695d9===0x0;},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x343)]=function(_0xde9a0){const _0x4a7eaa=_0x3b896f;if(this['_smartJump']===undefined)this['setupRegionTerrainTagSmartJump']();return this[_0x4a7eaa(0x15d)]['HeightBasedRegions']['includes'](_0xde9a0);},Game_Map[_0x3b896f(0x3e3)][_0x3b896f(0x120)]=function(_0x509640,_0x12a453,_0x38391a){const _0x3596b7=_0x3b896f,_0x51c94d=$gamePlayer[_0x3596b7(0x321)](),_0x5b0fd2=this[_0x3596b7(0x321)](_0x509640,_0x12a453);if(this[_0x3596b7(0x343)](_0x51c94d)){const _0x1224b8=$gamePlayer[_0x3596b7(0x19d)]();if(this[_0x3596b7(0x264)](_0x51c94d)&&this['isSmartJumpRegionLowestHeight'](_0x5b0fd2)){if(_0x3596b7(0x258)==='zMOnx')return!![];else this[_0x3596b7(0x1ed)]['NonLandableTerrainTags']=_0x48929a['$1'][_0x3596b7(0x2a3)](',')[_0x3596b7(0x2d1)](_0x144169=>(_0x10b28d(_0x144169)||0x0)[_0x3596b7(0x11a)](0x0,0x7));}if(_0x1224b8!==0x2&&this[_0x3596b7(0x264)](_0x5b0fd2)){if('GmULJ'!==_0x3596b7(0x283))_0x3557ae[_0x3596b7(0x2a6)](this[_0x3596b7(0x1da)]),this[_0x3596b7(0x2e2)]();else{if(_0x38391a>=0x1)return![];}}if(this[_0x3596b7(0x343)](_0x5b0fd2))return _0x51c94d>=_0x5b0fd2;else{const _0x4feb1c=this[_0x3596b7(0x15d)][_0x3596b7(0x114)][_0x3596b7(0x2be)](_0x51c94d);return _0x4feb1c<=0x0;}}if(this[_0x3596b7(0x343)](_0x5b0fd2)){if(_0x3596b7(0x17e)!==_0x3596b7(0x17e))this[_0x3596b7(0x148)]['pitchRate']=_0x449c7e(_0x57d713['$1'])*0.01;else{const _0x155199=this[_0x3596b7(0x15d)][_0x3596b7(0x114)]['indexOf'](_0x5b0fd2);return _0x155199<=0x0;}}else return!![];},Game_Map[_0x3b896f(0x3e3)]['isTileSmartJumpNonPassable']=function(_0x17363d,_0x29256f){const _0x51d250=_0x3b896f,_0x4b6752=this[_0x51d250(0x321)](_0x17363d,_0x29256f),_0x44b49d=this[_0x51d250(0x13c)](_0x17363d,_0x29256f);if(this[_0x51d250(0x15d)]===undefined)this[_0x51d250(0x17d)]();if(this[_0x51d250(0x15d)]['NonPassableRegions'][_0x51d250(0x179)](_0x4b6752))return!![];if(this[_0x51d250(0x15d)][_0x51d250(0x1bc)][_0x51d250(0x179)](_0x44b49d))return!![];const _0x4abc93=this['eventsXy'](_0x17363d,_0x29256f);for(const _0x51fa38 of _0x4abc93){if(!_0x51fa38)continue;if(_0x51fa38[_0x51d250(0x2d3)])continue;if(_0x51fa38['notSmartJumpPassable']())return!![];}return![];},Game_Map[_0x3b896f(0x3e3)]['isTileSmartJumpNonLandable']=function(_0x21ba32,_0x3f2f0d){const _0xbf629e=_0x3b896f,_0x232742=this[_0xbf629e(0x321)](_0x21ba32,_0x3f2f0d),_0x548ab6=this[_0xbf629e(0x13c)](_0x21ba32,_0x3f2f0d);if(this['_smartJump']===undefined)this[_0xbf629e(0x17d)]();if(this[_0xbf629e(0x15d)]['NonLandableRegions'][_0xbf629e(0x179)](_0x232742))return!![];if(this[_0xbf629e(0x15d)][_0xbf629e(0x183)][_0xbf629e(0x179)](_0x548ab6))return!![];const _0x23692c=this[_0xbf629e(0x175)](_0x21ba32,_0x3f2f0d);for(const _0xebecbe of _0x23692c){if(!_0xebecbe)continue;if(_0xebecbe[_0xbf629e(0x2d3)])continue;if(_0xebecbe[_0xbf629e(0x1c2)]())return!![];}return![];},VisuMZ[_0x3b896f(0x352)]['Game_CharacterBase_initMembers']=Game_CharacterBase[_0x3b896f(0x3e3)]['initMembers'],Game_CharacterBase[_0x3b896f(0x3e3)]['initMembers']=function(){const _0xff071d=_0x3b896f;VisuMZ[_0xff071d(0x352)]['Game_CharacterBase_initMembers'][_0xff071d(0x24b)](this),this[_0xff071d(0x2d9)]();},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x18d)]=Game_CharacterBase['prototype']['increaseSteps'],Game_CharacterBase['prototype'][_0x3b896f(0x3bc)]=function(){const _0x3f2c64=_0x3b896f;VisuMZ['MovementEffects']['Game_CharacterBase_increaseSteps'][_0x3f2c64(0x24b)](this);if(this[_0x3f2c64(0x34f)]())this[_0x3f2c64(0x2fd)]();!this[_0x3f2c64(0x1fd)]()&&this[_0x3f2c64(0x3b2)]()&&(_0x3f2c64(0x224)===_0x3f2c64(0x224)?this[_0x3f2c64(0x1db)]():(this[_0x3f2c64(0x33a)](),this[_0x3f2c64(0x255)]()));},VisuMZ['MovementEffects'][_0x3b896f(0x2f5)]=Game_CharacterBase[_0x3b896f(0x3e3)]['updatePattern'],Game_CharacterBase[_0x3b896f(0x3e3)][_0x3b896f(0x3d9)]=function(){const _0x487d7e=_0x3b896f;VisuMZ[_0x487d7e(0x352)]['Game_CharacterBase_updatePattern']['call'](this);if(this[_0x487d7e(0x11b)]>0x0)return;this[_0x487d7e(0x1fb)]()&&this[_0x487d7e(0x13e)]()&&(_0x487d7e(0x139)===_0x487d7e(0x139)?this[_0x487d7e(0x213)]():(_0x438997[_0x487d7e(0x3e3)][_0x487d7e(0x1db)][_0x487d7e(0x24b)](this),this[_0x487d7e(0x3d0)]=0x3c)),this['meetFootstepFrames']()&&this[_0x487d7e(0x3b2)]()&&this[_0x487d7e(0x1db)]();},Game_CharacterBase[_0x3b896f(0x3e3)][_0x3b896f(0x34f)]=function(){const _0x123b6c=_0x3b896f;if(this[_0x123b6c(0x281)]===Game_Follower&&!this[_0x123b6c(0x30a)]())return![];if(this[_0x123b6c(0x281)]===Game_Player&&this['isInVehicle']())return![];if(!this[_0x123b6c(0x1d2)]())return![];if(this[_0x123b6c(0x29c)]())return![];return $gameMap[_0x123b6c(0x33c)]();},Game_CharacterBase[_0x3b896f(0x3e3)][_0x3b896f(0x2fd)]=function(){const _0x56b4b5=_0x3b896f,_0x3c6e98=SceneManager[_0x56b4b5(0x115)]['_spriteset'];if(_0x3c6e98)_0x3c6e98[_0x56b4b5(0x240)](this);},Game_CharacterBase[_0x3b896f(0x3e3)]['isPlayFootstepSoundsByFrame']=function(){const _0x439128=_0x3b896f;return VisuMZ[_0x439128(0x352)]['Settings'][_0x439128(0x3c3)][_0x439128(0x1ca)];},VisuMZ['MovementEffects'][_0x3b896f(0x22b)]=Game_CharacterBase[_0x3b896f(0x3e3)][_0x3b896f(0x345)],Game_CharacterBase[_0x3b896f(0x3e3)][_0x3b896f(0x345)]=function(){const _0x1ef985=_0x3b896f;let _0x3b96e4=VisuMZ[_0x1ef985(0x352)][_0x1ef985(0x22b)][_0x1ef985(0x24b)](this);if(this[_0x1ef985(0x333)]()){if(_0x1ef985(0x1ad)!=='fsmpG')this[_0x1ef985(0x2bf)][_0x1ef985(0x3ee)](_0x2ada22),this['_dustCloudSprites'][_0x1ef985(0x3d5)](_0x216a60);else{const _0x2f16f1=VisuMZ[_0x1ef985(0x352)]['Settings'][_0x1ef985(0x3c3)][_0x1ef985(0x359)]??1.5;_0x3b96e4=Math[_0x1ef985(0x300)](_0x3b96e4/Math[_0x1ef985(0x22c)](_0x2f16f1,0x1));if(this['isDashing']()){if('yhbeM'==='yhbeM'){const _0x5a709c=VisuMZ[_0x1ef985(0x352)][_0x1ef985(0x1b6)][_0x1ef985(0x3c3)][_0x1ef985(0x2a9)]??1.5;_0x3b96e4=Math[_0x1ef985(0x300)](_0x3b96e4/Math['max'](_0x5a709c,0x1));}else{const _0x23614a=this[_0x1ef985(0x32f)](_0x523fce);if(!_0x23614a)return;const _0x23c790=new _0x35c454(_0x3318ab);this[_0x1ef985(0x1ba)][_0x1ef985(0x2fc)](_0x23c790),this['_tilemap']['addChild'](_0x23c790);}}}}return _0x3b96e4;},Game_CharacterBase['prototype'][_0x3b896f(0x403)]=function(){const _0x2232aa=_0x3b896f;if(!this[_0x2232aa(0x1fd)]())return![];if(this['hasStepAnime']()&&!this[_0x2232aa(0x333)]())return![];if(this[_0x2232aa(0x39b)]())return![];if(this[_0x2232aa(0x284)]())return![];const _0x40c8a6=this[_0x2232aa(0x217)]()[_0x2232aa(0x22f)]??[];if(_0x40c8a6[_0x2232aa(0x3fd)]<=0x0)return!![];return _0x40c8a6[_0x2232aa(0x179)](this[_0x2232aa(0x280)]());},Game_CharacterBase['prototype'][_0x3b896f(0x3b2)]=function(){const _0x308e5b=_0x3b896f;if(this[_0x308e5b(0x281)]===Game_Follower&&!this[_0x308e5b(0x30a)]())return![];if(this[_0x308e5b(0x281)]===Game_Player&&this[_0x308e5b(0x3e7)]())return![];if(this['constructor']===Game_Follower&&$gamePlayer['isInVehicle']())return![];if(this[_0x308e5b(0x29c)]())return![];return this[_0x308e5b(0x217)]()[_0x308e5b(0x1f0)]&&$gameMap['canMakeFootstepSounds']();},Game_Vehicle[_0x3b896f(0x3e3)]['canMakeFootstepSounds']=function(){return![];},Game_CharacterBase[_0x3b896f(0x3e3)][_0x3b896f(0x1db)]=function(){SoundManager['playFootsteps'](this);},Game_CharacterBase[_0x3b896f(0x3e3)][_0x3b896f(0x217)]=function(){return{'enabled':!![],'volumeRate':0x1,'pitchRate':0x1};},Game_CharacterBase[_0x3b896f(0x3e3)]['meetFootprintFrames']=function(){const _0x4b9749=_0x3b896f;if(this[_0x4b9749(0x401)]()&&!this['isMoving']())return![];if(this[_0x4b9749(0x39b)]())return![];if(this['isOnLadder']())return![];const _0x359fee=_0x4b9749(0x320)['format'](this[_0x4b9749(0x2eb)]),_0xe507c5=_0x4b9749(0x2dd)[_0x4b9749(0x3fb)](this['pattern']()),_0x220402=this['footprintsData']();if(_0x220402[_0x359fee]){if(_0x220402[_0x359fee][_0xe507c5]){if(_0x4b9749(0x121)===_0x4b9749(0x121)){if(_0x220402[_0x359fee][_0xe507c5][_0x4b9749(0x184)]!=='')return!![];if(_0x220402[_0x359fee][_0xe507c5][_0x4b9749(0x269)]>0x0)return!![];if(_0x220402[_0x359fee][_0xe507c5][_0x4b9749(0x1a4)]>0x0)return!![];}else return![];}}return![];},Game_CharacterBase[_0x3b896f(0x3e3)][_0x3b896f(0x13e)]=function(){const _0x47d20b=_0x3b896f;if(this[_0x47d20b(0x281)]===Game_Follower&&!this['isVisible']())return![];if(this[_0x47d20b(0x281)]===Game_Player&&this[_0x47d20b(0x3e7)]())return![];if(this['isTransparent']())return![];const _0xeaba30=this['x'],_0x323c28=this['y'];return this[_0x47d20b(0x16d)]()['enabled']&&$gameMap[_0x47d20b(0x13e)](_0xeaba30,_0x323c28);},Game_CharacterBase[_0x3b896f(0x3e3)][_0x3b896f(0x16d)]=function(){const _0x4dafb4=_0x3b896f,_0x30e95e=VisuMZ[_0x4dafb4(0x352)][_0x4dafb4(0x1b6)][_0x4dafb4(0x261)];return{'enabled':!![],'dir1':_0x30e95e[_0x4dafb4(0x2ed)],'dir2':_0x30e95e[_0x4dafb4(0x3e4)],'dir3':_0x30e95e['dir3'],'dir4':_0x30e95e['dir4'],'dir6':_0x30e95e[_0x4dafb4(0x222)],'dir7':_0x30e95e[_0x4dafb4(0x3f3)],'dir8':_0x30e95e[_0x4dafb4(0x2d6)],'dir9':_0x30e95e[_0x4dafb4(0x385)]};},Game_CharacterBase[_0x3b896f(0x3e3)]['createFootprint']=function(){const _0x5cf85d=_0x3b896f,_0x218edb=SceneManager[_0x5cf85d(0x115)][_0x5cf85d(0x226)];if(_0x218edb)_0x218edb[_0x5cf85d(0x328)](this);},Game_CharacterBase[_0x3b896f(0x3e3)][_0x3b896f(0x2d9)]=function(){const _0x18b9d7=_0x3b896f;this[_0x18b9d7(0x169)]={'enabled':![],'delay':0x4,'duration':0x1e,'hue':0x0,'opacityStart':0x80,'tone':[0x0,0x0,0x0,0x0]};},Game_CharacterBase[_0x3b896f(0x3e3)][_0x3b896f(0x1ef)]=function(){const _0x48469d=_0x3b896f;if(this['_motionTrailSettings']===undefined)this[_0x48469d(0x2d9)]();return this[_0x48469d(0x169)];},Game_CharacterBase[_0x3b896f(0x3e3)][_0x3b896f(0x22a)]=function(_0x993693,_0x20a22e){const _0x220fbc=_0x3b896f;this[_0x220fbc(0x1ef)]()[_0x220fbc(0x1f0)]=_0x993693;if(!SceneManager[_0x220fbc(0x2a8)]())return;if(!_0x993693)return;if(!_0x20a22e)return;const _0x13fc4d=SceneManager[_0x220fbc(0x115)][_0x220fbc(0x226)];if(_0x13fc4d){const _0x3443b2=_0x13fc4d[_0x220fbc(0x32f)](this);if(_0x3443b2){if(_0x220fbc(0x2ec)!==_0x220fbc(0x2b2))_0x3443b2[_0x220fbc(0x332)]();else{if(this['constructor']===_0x5cfdfc&&!this[_0x220fbc(0x30a)]())return![];if(this[_0x220fbc(0x281)]===_0x3ab9ad&&this['isInVehicle']())return![];if(this[_0x220fbc(0x29c)]())return![];const _0x13ef4c=this['x'],_0x44b4a2=this['y'];return this['footprintsData']()[_0x220fbc(0x1f0)]&&_0x53389b[_0x220fbc(0x13e)](_0x13ef4c,_0x44b4a2);}}}},Game_CharacterBase['prototype'][_0x3b896f(0x282)]=function(_0x308f24,_0x149f9c){const _0x417a23=_0x3b896f,_0x53949f=this[_0x417a23(0x1ef)]()[_0x417a23(0x1f0)];this[_0x417a23(0x169)]=JsonEx[_0x417a23(0x2b4)](_0x308f24);if(_0x149f9c)return;this['_motionTrailSettings'][_0x417a23(0x1f0)]=_0x53949f;},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x35c)]=Game_Player['prototype']['moveByInput'],Game_Player[_0x3b896f(0x3e3)]['moveByInput']=function(){const _0x43d769=_0x3b896f;if(this['isSmartRushing']())this[_0x43d769(0x2b8)]();else this[_0x43d769(0x322)]()?this[_0x43d769(0x32d)]():(VisuMZ['MovementEffects']['Game_Player_moveByInput'][_0x43d769(0x24b)](this),this[_0x43d769(0x188)]());},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x188)]=function(){const _0x6ce31=_0x3b896f;this[_0x6ce31(0x1a5)](),this['updateSmartBlinkCooldown'](),this[_0x6ce31(0x2b3)]();},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x305)]=Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x211)],Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x211)]=function(_0x2695ba,_0x3ea62d){const _0x30162c=_0x3b896f;if(this[_0x30162c(0x294)]())this[_0x30162c(0x1e2)](_0x2695ba,_0x3ea62d);else{if(_0x30162c(0x2ff)!==_0x30162c(0x1e7))VisuMZ[_0x30162c(0x352)]['Game_Player_updateScroll'][_0x30162c(0x24b)](this,_0x2695ba,_0x3ea62d);else{_0x4d8c76[_0x30162c(0x352)][_0x30162c(0x2f5)][_0x30162c(0x24b)](this);if(this['_stopCount']>0x0)return;this['meetFootprintFrames']()&&this[_0x30162c(0x13e)]()&&this[_0x30162c(0x213)](),this[_0x30162c(0x403)]()&&this[_0x30162c(0x3b2)]()&&this['playFootstepSound']();}}},Game_Player['prototype'][_0x3b896f(0x294)]=function(){const _0x3d1d01=_0x3b896f;if(!$gameMap['isUsingSmoothCamera']())return![];if($gameMap[_0x3d1d01(0x28e)]())return this[_0x3d1d01(0x192)]=!![],this[_0x3d1d01(0x14b)]=this[_0x3d1d01(0x1dc)],this[_0x3d1d01(0x206)]=this[_0x3d1d01(0x198)],![];if(this['_wasEventScrolling']){if(this[_0x3d1d01(0x14b)]!==this[_0x3d1d01(0x1dc)]||this[_0x3d1d01(0x206)]!==this[_0x3d1d01(0x198)]){if(_0x3d1d01(0x3c9)!==_0x3d1d01(0x1f9))this[_0x3d1d01(0x192)]=![],this[_0x3d1d01(0x14b)]=this[_0x3d1d01(0x1dc)],this['_lastSmoothScrollY']=this[_0x3d1d01(0x198)];else{const _0x3abb6e=this[_0x3d1d01(0x3b5)],_0x5bb51e=this[_0x3d1d01(0x36e)][_0x3d1d01(0x3b5)];_0x3abb6e['x']=_0x5bb51e['x'],_0x3abb6e['y']=_0x5bb51e['y'],_0x3abb6e[_0x3d1d01(0x248)]=_0xe658c5[_0x3d1d01(0x2ce)](_0x29b71a[_0x3d1d01(0x2d8)](_0x5bb51e['_frame'])),_0x3abb6e[_0x3d1d01(0x1a7)]();}}return!this[_0x3d1d01(0x192)];}return!![];},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x1e2)]=function(_0x179785,_0x1fc122){const _0x337b6a=_0x3b896f,_0x396547=this[_0x337b6a(0x2a7)](),_0x2c7fde=this[_0x337b6a(0x1f3)](),_0x3d86a3=this[_0x337b6a(0x35e)](),_0x4da820=this[_0x337b6a(0x15c)](),_0x39b352=this[_0x337b6a(0x1d2)]()||this[_0x337b6a(0x372)](),_0x1a642b=$gameSystem[_0x337b6a(0x39e)](![],_0x39b352),_0x21ea12=$gameSystem[_0x337b6a(0x39e)](!![],_0x39b352),_0x363a79=VisuMZ[_0x337b6a(0x352)]['mRadialArcConstant']();if(_0x3d86a3<_0x396547){const _0x2a7acf=_0x396547-_0x3d86a3,_0x528335=_0x1a642b*_0x363a79,_0x3a314b=_0x2a7acf/(_0x528335||0.01);$gameMap[_0x337b6a(0x12d)](_0x3a314b);}if(_0x3d86a3>_0x396547){if(_0x337b6a(0x3b7)===_0x337b6a(0x3b7)){const _0x1a68ed=_0x3d86a3-_0x396547,_0xae2ffb=_0x1a642b*_0x363a79,_0x1751b3=_0x1a68ed/(_0xae2ffb||0.01);$gameMap[_0x337b6a(0x288)](_0x1751b3);}else{const _0x1c5f41=this[_0x337b6a(0x384)](_0x555515,_0xc2ce17),_0x10cd85=this['roundYWithDirection'](_0x1706ca,_0x55ec59);if(_0x485215[_0x337b6a(0x2ef)](_0x1c5f41,_0x10cd85,0x200))return![];if(_0x421581[_0x337b6a(0x2ef)](_0x1c5f41,_0x10cd85,0x400))return![];if(_0x1c5f41<0x0||_0x1c5f41>=this[_0x337b6a(0x269)]())return![];if(_0x10cd85<0x0||_0x10cd85>=this[_0x337b6a(0x1a4)]())return![];const _0x346dfc=this[_0x337b6a(0x321)](_0x1c5f41,_0x10cd85);if(this[_0x337b6a(0x2f1)]['NonCrashRegions'][_0x337b6a(0x179)](_0x346dfc))return![];const _0x17ac85=this['terrainTag'](_0x1c5f41,_0x10cd85);if(this[_0x337b6a(0x2f1)][_0x337b6a(0x21d)][_0x337b6a(0x179)](_0x17ac85))return![];return _0x192a58['SMART_RUSH_SHAKE_ENABLED'];}}if(_0x4da820>_0x2c7fde){if(_0x337b6a(0x2db)!==_0x337b6a(0x2db))_0x527864[_0x337b6a(0x352)][_0x337b6a(0x275)][_0x337b6a(0x24b)](this),this[_0x337b6a(0x378)]();else{const _0x20d556=_0x4da820-_0x2c7fde,_0x3e9def=_0x21ea12*_0x363a79,_0x5ae190=_0x20d556/(_0x3e9def||0.01);$gameMap['scrollDown'](_0x5ae190);}}if(_0x4da820<_0x2c7fde){const _0x11583e=_0x2c7fde-_0x4da820,_0x5b9a01=_0x21ea12*_0x363a79,_0x2d30a6=_0x11583e/(_0x5b9a01||0.01);$gameMap[_0x337b6a(0x236)](_0x2d30a6);}},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x3b6)]=function(){return 1.0017453;},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x25a)]=Game_CharacterBase[_0x3b896f(0x3e3)][_0x3b896f(0x3df)],Game_CharacterBase[_0x3b896f(0x3e3)]['updateAnimationCount']=function(){const _0x33e7a8=_0x3b896f;VisuMZ[_0x33e7a8(0x352)][_0x33e7a8(0x25a)]['call'](this);if(this['_footstepCooldownDuration']){if('BWAsn'!==_0x33e7a8(0x130))this['_footstepCooldownDuration']--;else{const _0x478cec=_0x54f44f['MovementEffects'][_0x33e7a8(0x239)];if(!this[_0x33e7a8(0x3ae)]())return;const _0x2f905d=this[_0x33e7a8(0x3ae)]()[_0x33e7a8(0x38a)]||'';_0x2f905d['match'](_0x478cec['SmartBlinkNonLandTerrainTags'])&&(this[_0x33e7a8(0x1ed)][_0x33e7a8(0x183)]=_0x3a4742['$1']['split'](',')[_0x33e7a8(0x2d1)](_0x100ce0=>(_0x2453ed(_0x100ce0)||0x0)[_0x33e7a8(0x11a)](0x0,0x7))),_0x2f905d[_0x33e7a8(0x336)](_0x478cec[_0x33e7a8(0x19b)])&&(this[_0x33e7a8(0x1ed)]['NonPassableTerrainTags']=_0x35d1f6['$1'][_0x33e7a8(0x2a3)](',')[_0x33e7a8(0x2d1)](_0x1d1a69=>(_0x25d1ca(_0x1d1a69)||0x0)['clamp'](0x0,0x7)));}}},Game_Player['prototype']['playFootstepSound']=function(){const _0x252ccd=_0x3b896f;Game_Character['prototype'][_0x252ccd(0x1db)][_0x252ccd(0x24b)](this),this['_footstepCooldownDuration']=0x3c;},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x217)]=function(){const _0x3e4fff=_0x3b896f;return $gameParty['leader']()?$gameParty[_0x3e4fff(0x295)]()[_0x3e4fff(0x217)]():Game_Character[_0x3e4fff(0x3e3)][_0x3e4fff(0x217)][_0x3e4fff(0x24b)](this);},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x16d)]=function(){const _0x25e704=_0x3b896f;return $gameParty[_0x25e704(0x295)]()?$gameParty[_0x25e704(0x295)]()[_0x25e704(0x16d)]():Game_Character[_0x25e704(0x3e3)][_0x25e704(0x16d)][_0x25e704(0x24b)](this);},Game_Player[_0x3b896f(0x3e3)]['isSmartMoving']=function(){return this['isSmartRushing']()||this['isSmartJumping']();},Game_Player['prototype']['isSmartMoveNonViableState']=function(){const _0xcd95a2=_0x3b896f;if(this[_0xcd95a2(0x39b)]())return!![];if(this[_0xcd95a2(0x3e7)]())return!![];if(this[_0xcd95a2(0x284)]())return!![];return![];},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x35b)]=function(_0x5eadb5){const _0x187875=_0x3b896f;if(!_0x5eadb5)return;if(_0x5eadb5[_0x187875(0x17b)])return;const _0x5e9b1d=this['getStraightenDiagonalDirection'](_0x5eadb5);this[_0x187875(0x34a)](_0x5e9b1d);},Game_Player['prototype'][_0x3b896f(0x186)]=function(_0x3a5503){const _0x2ec0bc=_0x3b896f;if(!_0x3a5503)return this['direction']();if(_0x3a5503[_0x2ec0bc(0x17b)])return this['direction']();const _0xc9e1a5=this[_0x2ec0bc(0x1e6)](this[_0x2ec0bc(0x19d)](),_0x3a5503);return _0xc9e1a5;},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x1e6)]=function(_0x517a42,_0x3ec55f){const _0x1b144d=_0x3b896f;if(!_0x3ec55f)return _0x517a42;if(_0x3ec55f[_0x1b144d(0x17b)])return _0x517a42;if(_0x517a42===0x1)return 0x4;if(_0x517a42===0x3)return 0x6;if(_0x517a42===0x7)return 0x4;if(_0x517a42===0x9)return 0x6;return _0x517a42;},Game_Player[_0x3b896f(0x39c)]=VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x1b6)][_0x3b896f(0x187)][_0x3b896f(0x3a5)]||0x0,Game_Player[_0x3b896f(0x3c5)]=VisuMZ['MovementEffects'][_0x3b896f(0x1b6)][_0x3b896f(0x187)][_0x3b896f(0x2a2)]||0x1,Game_Player[_0x3b896f(0x31d)]=VisuMZ['MovementEffects'][_0x3b896f(0x1b6)][_0x3b896f(0x187)][_0x3b896f(0x27f)]||![],Game_Player[_0x3b896f(0x1af)]=VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x1b6)][_0x3b896f(0x187)][_0x3b896f(0x2bd)]||0x1,Game_Player[_0x3b896f(0x3d2)]=VisuMZ[_0x3b896f(0x352)]['Settings'][_0x3b896f(0x187)]['ShakeSpeedRate']||0x1,Game_Player[_0x3b896f(0x3c6)]=VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x1b6)][_0x3b896f(0x187)][_0x3b896f(0x1c7)]||0x1,Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x276)]=function(_0x1e0c95,_0x5de800,_0x4e2b01,_0xf29774,_0x352a96){const _0x2a2246=_0x3b896f;if(!this['canSmartRush']())return![];const _0x2e77c7=VisuMZ['MovementEffects']['Settings'][_0x2a2246(0x187)];return this[_0x2a2246(0x35b)](_0x2e77c7),this[_0x2a2246(0x1da)]=_0x1e0c95,this[_0x2a2246(0x36b)]=_0x5de800||0x1,this[_0x2a2246(0x2f3)]=(_0x4e2b01||[])['clone'](),this[_0x2a2246(0x299)]=_0xf29774||1.5,this[_0x2a2246(0x39a)]=JsonEx[_0x2a2246(0x2b4)](_0x352a96),this[_0x2a2246(0x3b3)](!![]),!![];},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x2b9)]=function(){const _0x11fa1d=_0x3b896f;if(!$gameMap['isSmartRushEnabled']())return![];if(this[_0x11fa1d(0x36b)])return![];if(this['isSmartMoving']())return![];if(this['isSmartMoveNonViableState']())return![];if(this[_0x11fa1d(0x29c)]())return![];if(this[_0x11fa1d(0x3a2)]())return![];const _0x2d06af=VisuMZ['MovementEffects'][_0x11fa1d(0x1b6)][_0x11fa1d(0x187)],_0x241dc1=this[_0x11fa1d(0x186)](_0x2d06af);return this[_0x11fa1d(0x315)](this['x'],this['y'],_0x241dc1);},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x2c6)]=function(){const _0x2bd273=_0x3b896f;return this[_0x2bd273(0x1da)]!==undefined&&this[_0x2bd273(0x1da)]>0x0;},VisuMZ['MovementEffects'][_0x3b896f(0x177)]=Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x1d2)],Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x1d2)]=function(){const _0x5d3f80=_0x3b896f;if(this[_0x5d3f80(0x2c6)]())return!![];return VisuMZ[_0x5d3f80(0x352)]['Game_Player_isDashing'][_0x5d3f80(0x24b)](this);},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x32a)]=Game_CharacterBase['prototype'][_0x3b896f(0x227)],Game_CharacterBase[_0x3b896f(0x3e3)][_0x3b896f(0x227)]=function(){const _0x543f5a=_0x3b896f;if(!this['isMoving']())return VisuMZ[_0x543f5a(0x352)][_0x543f5a(0x32a)]['call'](this);let _0x12a763=VisuMZ['MovementEffects'][_0x543f5a(0x32a)][_0x543f5a(0x24b)](this);return _0x12a763+=$gameSystem[_0x543f5a(0x3ec)](this[_0x543f5a(0x2eb)])*0x1,this===$gamePlayer&&this['isSmartRushing']()&&(_0x12a763*=this[_0x543f5a(0x299)]||1.5),Math[_0x543f5a(0x22c)](0x1,_0x12a763);},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x2b8)]=function(){const _0x5d2e9e=_0x3b896f;if(this[_0x5d2e9e(0x333)]())return;if(this[_0x5d2e9e(0x39b)]())return;this[_0x5d2e9e(0x367)](this[_0x5d2e9e(0x19d)]());if(this['isMovementSucceeded']())this[_0x5d2e9e(0x1da)]=this[_0x5d2e9e(0x1da)]||0x1,this['_smartRushMode']--;else{if(_0x5d2e9e(0x2a5)==='QfBkJ'){if(!_0x590a93['isUsingSmoothCamera']())return![];if(_0x3f4ada[_0x5d2e9e(0x28e)]())return this[_0x5d2e9e(0x192)]=!![],this[_0x5d2e9e(0x14b)]=this[_0x5d2e9e(0x1dc)],this['_lastSmoothScrollY']=this[_0x5d2e9e(0x198)],![];if(this['_wasEventScrolling'])return(this['_lastSmoothScrollX']!==this[_0x5d2e9e(0x1dc)]||this[_0x5d2e9e(0x206)]!==this[_0x5d2e9e(0x198)])&&(this[_0x5d2e9e(0x192)]=![],this['_lastSmoothScrollX']=this[_0x5d2e9e(0x1dc)],this['_lastSmoothScrollY']=this[_0x5d2e9e(0x198)]),!this[_0x5d2e9e(0x192)];return!![];}else{if(this[_0x5d2e9e(0x27c)]()){if(_0x5d2e9e(0x3fc)!==_0x5d2e9e(0x244))$gameScreen[_0x5d2e9e(0x2a6)](this['_smartRushMode']),this[_0x5d2e9e(0x2e2)]();else{_0x3461f1[_0x5d2e9e(0x336)](_0xe3e1d5['TerrainTagFootprintOpacity']);const _0x55b256=_0x4b8d16(_0x37293b['$1'])[_0x5d2e9e(0x11a)](0x0,0xff),_0x4c2f8e=_0x3e94d6(_0x1327f7['$2'])['clamp'](0x0,0xff);this[_0x5d2e9e(0x400)]['opacity'][_0x5d2e9e(0x221)][_0x55b256]=_0x4c2f8e;}}this[_0x5d2e9e(0x1da)]=0x0;}}this[_0x5d2e9e(0x284)]()&&(this[_0x5d2e9e(0x1da)]=0x0),this[_0x5d2e9e(0x1da)]<=0x0&&setTimeout(this[_0x5d2e9e(0x3b3)][_0x5d2e9e(0x1b8)](this,![]),0x32);},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x1bd)]=function(){const _0x34b1d8=_0x3b896f;this[_0x34b1d8(0x1da)]=0x0,setTimeout(this['setSmartRushSwitch'][_0x34b1d8(0x1b8)](this,![]),0x32);},Game_Screen[_0x3b896f(0x3e3)][_0x3b896f(0x2a6)]=function(_0xcc6e95){const _0x32d22c=_0x3b896f,_0x265e38=(_0xcc6e95*Game_Player['SMART_RUSH_SHAKE_POWER_RATE'])[_0x32d22c(0x11a)](0x1,0x9),_0x586bd0=(_0xcc6e95*Game_Player[_0x32d22c(0x3d2)])[_0x32d22c(0x11a)](0x1,0x9);this[_0x32d22c(0x353)](_0x265e38,_0x586bd0,Game_Player['SMART_RUSH_SHAKE_DURATION']);},Game_Player[_0x3b896f(0x3e3)]['startSmartRushCrashWalkBack']=function(){const _0x3e132c=_0x3b896f,_0x4eca13=this['direction'](),_0x29e080=((this['_smartRushSpeedRate']-0x1)*0x2)[_0x3e132c(0x11a)](0.25,0.85),_0x1d5638=((this[_0x3e132c(0x299)]-0x1)*1.5)[_0x3e132c(0x11a)](0.15,0.3);if([0x1,0x4,0x7][_0x3e132c(0x179)](_0x4eca13))this['_realX']-=_0x29e080;if([0x3,0x6,0x9][_0x3e132c(0x179)](_0x4eca13))this['_realX']+=_0x29e080;if([0x7,0x8,0x9]['includes'](_0x4eca13))this[_0x3e132c(0x198)]-=_0x29e080;if([0x1,0x2,0x3][_0x3e132c(0x179)](_0x4eca13))this[_0x3e132c(0x198)]+=_0x1d5638;},Game_Player['prototype'][_0x3b896f(0x27c)]=function(){const _0x590313=_0x3b896f;if(!Game_Player[_0x590313(0x31d)])return![];const _0x9bdde4=this[_0x590313(0x19d)](),_0x3e5b12=this['x'],_0x59e830=this['y'];return $gameMap[_0x590313(0x2b6)](_0x3e5b12,_0x59e830,_0x9bdde4);},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x1a5)]=function(){const _0x415da5=_0x3b896f;if(this[_0x415da5(0x36b)]){if('vbiaI'===_0x415da5(0x204))this[_0x415da5(0x36b)]--;else{if(this[_0x415da5(0x137)]===_0x3b1e66)this['initMovementEffectsFootprintMarks']();return this[_0x415da5(0x137)];}}},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x3b3)]=function(_0x4bb7ab){const _0x15df62=_0x3b896f;this['_smartRushSwitches']=this['_smartRushSwitches']||[];for(const _0x15f58d of this[_0x15df62(0x2f3)]){'uPCWD'!==_0x15df62(0x26a)?(this[_0x15df62(0x29b)](),this[_0x15df62(0x1ee)]()):$gameSwitches['setValue'](_0x15f58d,_0x4bb7ab);}!_0x4bb7ab&&(this[_0x15df62(0x1da)]=0x0);},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x159)]=Game_Player['prototype'][_0x3b896f(0x37c)],Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x37c)]=function(_0x23c62f,_0x13928b,_0x14c683,_0x42437f,_0x3c53f8){const _0x5483e9=_0x3b896f;VisuMZ[_0x5483e9(0x352)][_0x5483e9(0x159)][_0x5483e9(0x24b)](this,_0x23c62f,_0x13928b,_0x14c683,_0x42437f,_0x3c53f8),this[_0x5483e9(0x1bd)]();},Game_Player[_0x3b896f(0x12f)]=VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x1b6)][_0x3b896f(0x1de)][_0x3b896f(0x2a2)],Game_Player[_0x3b896f(0x3d3)]=VisuMZ['MovementEffects'][_0x3b896f(0x1b6)][_0x3b896f(0x1de)][_0x3b896f(0x3a5)],Game_Player['SMART_BLINK_FLOOR_TO_CEILING']=VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x1b6)]['SmartBlink']['floorToCeiling']??![],Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x265)]=function(_0x1b9f1d,_0x25bc03,_0x31bd65,_0x8659c9){const _0x335a81=_0x3b896f;_0x31bd65=_0x31bd65||{'NonLandableRegions':[],'NonLandableTerrainTags':[],'NonPassableRegions':[],'NonPassableTerrainTags':[]},this[_0x335a81(0x306)]=JsonEx[_0x335a81(0x2b4)](_0x31bd65),_0x1b9f1d=this[_0x335a81(0x3ac)](_0x1b9f1d||0x1);if(!this[_0x335a81(0x1f6)](_0x1b9f1d))return![];const _0x515993=VisuMZ[_0x335a81(0x352)][_0x335a81(0x1b6)]['SmartBlink'];return this[_0x335a81(0x35b)](_0x515993),this['_smartBlinkDistance']=_0x1b9f1d||0x1,this[_0x335a81(0x3ce)]=_0x25bc03||0x1,this[_0x335a81(0x38c)]=JsonEx[_0x335a81(0x2b4)](_0x8659c9),this['smartBlinkRelocate'](_0x1b9f1d),!![];},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x3ac)]=function(_0x5c95b8){const _0x1ce709=_0x3b896f,_0x1cffdf=this['_smartBlinkRestrictions'],_0x29686d=this[_0x1ce709(0x19d)](),_0x68b913=VisuMZ[_0x1ce709(0x352)]['Settings']['SmartBlink'];this[_0x1ce709(0x35b)](_0x68b913);const _0xf18969=this[_0x1ce709(0x19d)]();let _0x28f8f3=0x0,_0x4e97e4=this['x'],_0x50d04e=this['y'],_0x51a440=0x0,_0x28753c=0x0;if([0x1,0x4,0x7][_0x1ce709(0x179)](_0xf18969))_0x51a440=-0x1;if([0x3,0x6,0x9][_0x1ce709(0x179)](_0xf18969))_0x51a440=0x1;if([0x7,0x8,0x9][_0x1ce709(0x179)](_0xf18969))_0x28753c=-0x1;if([0x1,0x2,0x3][_0x1ce709(0x179)](_0xf18969))_0x28753c=0x1;for(let _0x318b06=0x1;_0x318b06<=_0x5c95b8;_0x318b06++){if(_0x1ce709(0x3cd)!==_0x1ce709(0x3cd))_0x587f9a[_0x1ce709(0x263)]([_0x15285e],_0x48aac2);else{_0x4e97e4+=_0x51a440,_0x50d04e+=_0x28753c;if(this[_0x1ce709(0x216)](_0x4e97e4,_0x50d04e))break;if(this[_0x1ce709(0x1cc)](_0x4e97e4,_0x50d04e)){if(_0x1ce709(0x296)!=='mRBbk')_0x16294e[_0x1ce709(0x1a3)](_0x424549,_0x247775);else{_0x28f8f3=_0x318b06;continue;}}const _0x2021b6=$gameMap['regionId'](_0x4e97e4,_0x50d04e),_0x48f851=$gameMap[_0x1ce709(0x13c)](_0x4e97e4,_0x50d04e);if(_0x1cffdf[_0x1ce709(0x2bb)][_0x1ce709(0x179)](_0x2021b6))break;if(_0x1cffdf[_0x1ce709(0x1bc)][_0x1ce709(0x179)](_0x48f851))break;if($gameMap[_0x1ce709(0x26e)](_0x4e97e4,_0x50d04e))break;if(_0x1cffdf[_0x1ce709(0x28f)][_0x1ce709(0x179)](_0x2021b6))continue;if(_0x1cffdf[_0x1ce709(0x183)][_0x1ce709(0x179)](_0x48f851))continue;if($gameMap['isTileSmartBlinkNonLandable'](_0x4e97e4,_0x50d04e))continue;if(!$gameMap[_0x1ce709(0x1b9)](_0x4e97e4,_0x50d04e))continue;if(this['isCollidedWithCharacters'](_0x4e97e4,_0x50d04e))continue;if(!$gameMap[_0x1ce709(0x241)](_0x4e97e4,_0x50d04e))continue;if(!Game_Player[_0x1ce709(0x286)]){if('omLzM'!=='xgUKs'){if(!$gameMap[_0x1ce709(0x3d8)](this['x'],this['y'])&&$gameMap[_0x1ce709(0x3d8)](_0x4e97e4,_0x50d04e)){if('bHUrd'!=='PwRPC')continue;else{if(this[_0x1ce709(0x2fe)]===_0x3234f6)this[_0x1ce709(0x157)]();const _0xa35ead=(_0x2d43af?_0x1ce709(0x3f6):_0x1ce709(0x1c5))+(_0x473814?'Dash':'Walk');this[_0x1ce709(0x2fe)][_0xa35ead]=_0x4c538b[_0x1ce709(0x11a)](0x1,0x30);}}}else{const _0xecfdba=_0x2176a7[_0x1ce709(0x352)][_0x1ce709(0x1b6)]['Footprints'][_0x1ce709(0x1e3)]||0x0;this['_followerOffsetX']=_0x485ebf[_0x1ce709(0x34e)](_0xecfdba+0x1)+_0x2b54ab['randomInt'](_0xecfdba+0x1)-_0xecfdba,this[_0x1ce709(0x25c)]=_0x3e8fd0[_0x1ce709(0x34e)](_0xecfdba+0x1)+_0x3b0dfb[_0x1ce709(0x34e)](_0xecfdba+0x1)-_0xecfdba;}}_0x28f8f3=_0x318b06;}}return this[_0x1ce709(0x34a)](_0x29686d),_0x28f8f3;},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x216)]=function(_0xbcbfa1,_0x3c9831){return![];},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x1cc)]=function(_0x1c4067,_0x2fb31c){return![];},Game_Player[_0x3b896f(0x3e3)]['canSmartBlink']=function(_0x25d025){const _0x85250e=_0x3b896f;if(!$gameMap[_0x85250e(0x337)]())return![];if(this[_0x85250e(0x3ce)])return![];if(this['isSmartMoving']())return![];if(this['isSmartMoveNonViableState']())return![];if(this[_0x85250e(0x29c)]())return![];if(this[_0x85250e(0x3a2)]())return![];return _0x25d025>=0x1;},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x154)]=function(){const _0x5494bb=_0x3b896f,_0x5bbb95=this[_0x5494bb(0x25b)],_0x1ed613=this[_0x5494bb(0x19d)]();let _0x34bc19=this['x'],_0x56b7d0=this['y'];if([0x1,0x4,0x7][_0x5494bb(0x179)](_0x1ed613))_0x34bc19+=-_0x5bbb95;if([0x3,0x6,0x9][_0x5494bb(0x179)](_0x1ed613))_0x34bc19+=_0x5bbb95;if([0x7,0x8,0x9][_0x5494bb(0x179)](_0x1ed613))_0x56b7d0+=-_0x5bbb95;if([0x1,0x2,0x3][_0x5494bb(0x179)](_0x1ed613))_0x56b7d0+=_0x5bbb95;this[_0x5494bb(0x380)]()[_0x5494bb(0x1f0)]&&this[_0x5494bb(0x2e4)]();Game_Character['prototype'][_0x5494bb(0x2d4)][_0x5494bb(0x24b)](this,_0x34bc19,_0x56b7d0),this[_0x5494bb(0x2f9)]['synchronize'](_0x34bc19,_0x56b7d0,this[_0x5494bb(0x19d)]());if(!$gameMap['isUsingSmoothCamera']())this[_0x5494bb(0x30b)](_0x34bc19,_0x56b7d0);this['playSmartBlinkFilterEffect'](),setTimeout(this[_0x5494bb(0x30d)][_0x5494bb(0x1b8)](this,[0x1,0x2]),0x32);},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x1e8)]=function(){const _0x5d4774=_0x3b896f,_0x11a996=SceneManager[_0x5d4774(0x115)][_0x5d4774(0x226)];if(_0x11a996){const _0x57ee57=this[_0x5d4774(0x3ed)]()[_0x5d4774(0x393)](),_0x40c5cc=[this][_0x5d4774(0x307)](_0x57ee57);for(const _0x51e989 of _0x40c5cc){const _0x31be99=_0x11a996[_0x5d4774(0x32f)](_0x51e989);if(_0x31be99){const _0x43257a=Game_Player['SMART_BLINK_FILTER_DURATION'],_0x443e45=Game_Player[_0x5d4774(0x3d3)];_0x31be99[_0x5d4774(0x1a3)](_0x43257a,_0x443e45);}}}},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x3f2)]=function(){const _0x196b64=_0x3b896f;this['_smartBlinkCooldown']&&this[_0x196b64(0x3ce)]--;},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x37d)]=function(_0x44aaf2,_0x2b23cf,_0x5da42d,_0x570214){const _0x507efd=_0x3b896f;_0x5da42d=_0x5da42d||{'NonLandableRegions':[],'NonLandableTerrainTags':[],'NonPassableRegions':[],'NonPassableTerrainTags':[]},this['_smartJumpRestrictions']=JsonEx[_0x507efd(0x2b4)](_0x5da42d);if(!this[_0x507efd(0x3a0)]())return![];const _0x30b99b=VisuMZ[_0x507efd(0x352)][_0x507efd(0x1b6)]['SmartJump'];return this['straightenFacedDirection'](_0x30b99b),_0x44aaf2=this[_0x507efd(0x229)](_0x44aaf2),this[_0x507efd(0x1cb)]=!![],this[_0x507efd(0x35a)]=_0x2b23cf||0x1,this[_0x507efd(0x350)]=JsonEx[_0x507efd(0x2b4)](_0x570214),this[_0x507efd(0x2c0)](_0x44aaf2),!![];},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x3a0)]=function(){const _0x59c7fe=_0x3b896f;if(!$gameMap[_0x59c7fe(0x2e3)]())return![];if(this[_0x59c7fe(0x35a)])return![];if(this['isSmartMoving']())return![];if(this[_0x59c7fe(0x311)]())return![];if(this['isTransparent']())return![];if(this[_0x59c7fe(0x3a2)]())return![];return!![];},Game_Player['prototype'][_0x3b896f(0x322)]=function(){return this['_smartJumpMode'];},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x229)]=function(_0x179ae7){const _0x227580=_0x3b896f,_0x2e2762=this[_0x227580(0x1b2)],_0x259022=this[_0x227580(0x19d)]();let _0x21c807=0x0,_0x514460=this['x'],_0x3ad774=this['y'],_0x50ff5f=0x0,_0x46678=0x0;if([0x1,0x4,0x7][_0x227580(0x179)](_0x259022))_0x50ff5f=-0x1;if([0x3,0x6,0x9][_0x227580(0x179)](_0x259022))_0x50ff5f=0x1;if([0x7,0x8,0x9][_0x227580(0x179)](_0x259022))_0x46678=-0x1;if([0x1,0x2,0x3][_0x227580(0x179)](_0x259022))_0x46678=0x1;for(let _0x919691=0x1;_0x919691<=_0x179ae7;_0x919691++){if(_0x227580(0x341)!==_0x227580(0x341))this['_smartRush']['enabled']=![];else{_0x514460+=_0x50ff5f,_0x3ad774+=_0x46678;if(this[_0x227580(0x302)](_0x514460,_0x3ad774))break;if(this[_0x227580(0x2c3)](_0x514460,_0x3ad774)){_0x21c807=_0x919691;continue;}if($gameMap[_0x227580(0x2cb)](_0x514460,_0x3ad774))break;const _0x978789=$gameMap[_0x227580(0x321)](_0x514460,_0x3ad774),_0x3a6abf=$gameMap[_0x227580(0x13c)](_0x514460,_0x3ad774);if(_0x2e2762[_0x227580(0x2bb)]['includes'](_0x978789))break;if(_0x2e2762[_0x227580(0x1bc)][_0x227580(0x179)](_0x3a6abf))break;if($gameMap[_0x227580(0x20e)](_0x514460,_0x3ad774))break;if(_0x2e2762[_0x227580(0x28f)][_0x227580(0x179)](_0x978789))continue;if(_0x2e2762[_0x227580(0x183)][_0x227580(0x179)](_0x3a6abf))continue;if($gameMap[_0x227580(0x334)](_0x514460,_0x3ad774))continue;if(!$gameMap[_0x227580(0x1b9)](_0x514460,_0x3ad774))continue;if(this[_0x227580(0x180)](_0x514460,_0x3ad774))continue;if(!$gameMap['isPassableByAnyDirection'](_0x514460,_0x3ad774))continue;if(!$gameMap[_0x227580(0x120)](_0x514460,_0x3ad774,_0x21c807))continue;_0x21c807=_0x919691;}}return _0x21c807;},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x302)]=function(_0x4292b1,_0x7be542){const _0x3cfb75=_0x3b896f;if(!$gameMap['isCeilingTile'](this['x'],this['y'])&&$gameMap[_0x3cfb75(0x3d8)](_0x4292b1,_0x7be542)){if('DflYP'!==_0x3cfb75(0x303))return!![];else{if(this[_0x3cfb75(0x400)]===_0x4e47e7)this[_0x3cfb75(0x218)]();const _0x5ca779=_0x1d28ff[_0x3cfb75(0x352)]['Settings']['Footprints'],_0x135b11=this[_0x3cfb75(0x321)](_0x22eb9d,_0x784521),_0x4ca75c=this[_0x3cfb75(0x13c)](_0x4475ab,_0xfe4003);if(this[_0x3cfb75(0x400)][_0x3cfb75(0x394)][_0x3cfb75(0x2da)][_0x135b11]!==_0x496384)return this[_0x3cfb75(0x400)]['duration']['regions'][_0x135b11];else{if(this['_footprints'][_0x3cfb75(0x394)][_0x3cfb75(0x221)][_0x4ca75c]!==_0x293dda)return this[_0x3cfb75(0x400)]['duration']['terrainTags'][_0x4ca75c];}return _0x5ca779[_0x3cfb75(0x124)];}}return![];},Game_Player['prototype'][_0x3b896f(0x2c3)]=function(_0x121c86,_0x1c1218){const _0x962735=_0x3b896f;if(!$gameMap[_0x962735(0x3d8)](this['x'],this['y'])&&$gameMap[_0x962735(0x3d8)](_0x121c86,_0x1c1218))return![];return![];},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x2c0)]=function(_0x46a386){const _0x2ee473=_0x3b896f,_0x44e7c5=this[_0x2ee473(0x19d)]();let _0x1e04b6=0x0,_0x3252bd=0x0;if([0x1,0x4,0x7][_0x2ee473(0x179)](_0x44e7c5))_0x1e04b6+=-_0x46a386;if([0x3,0x6,0x9][_0x2ee473(0x179)](_0x44e7c5))_0x1e04b6+=_0x46a386;if([0x7,0x8,0x9][_0x2ee473(0x179)](_0x44e7c5))_0x3252bd+=-_0x46a386;if([0x1,0x2,0x3][_0x2ee473(0x179)](_0x44e7c5))_0x3252bd+=_0x46a386;_0x3252bd=this[_0x2ee473(0x2e5)](_0x1e04b6,_0x3252bd);const _0x224e50=this[_0x2ee473(0x19d)]();this['jump'](_0x1e04b6,_0x3252bd),this[_0x2ee473(0x34a)](_0x224e50);},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x2e5)]=function(_0x4ccbce,_0x585b43){const _0x441dcc=_0x3b896f;if(!$gameMap[_0x441dcc(0x3cc)](this['x'],this['y']))return _0x585b43;if($gameMap['isSmartJumpRegionLowestHeight'](this['x'],this['y']))return _0x585b43;let _0x3503e6=this['x']+_0x4ccbce,_0xdd4725=this['y']+_0x585b43;if(!$gameMap[_0x441dcc(0x3cc)](_0x3503e6,_0xdd4725))return _0x585b43;const _0x15f02f=this['regionId']();if($gameMap['isSmartJumpRegionLowestHeight'](_0x15f02f))return _0x585b43;let _0xb2c53a=$gameMap[_0x441dcc(0x321)](_0x3503e6,_0xdd4725);if(!$gameMap['isSmartJumpRegionLowestHeight'](_0xb2c53a))return _0x585b43;const _0x363676=this['direction']();if(_0x363676===0x2)return _0x585b43;if(_0x363676===0x8)return _0x585b43;_0x585b43+=_0x15f02f-_0xb2c53a;for(;;){const _0x324bcf=_0x3503e6,_0x55808b=this['y']+_0x585b43,_0x2c6177=$gameMap[_0x441dcc(0x321)](_0x324bcf,_0x55808b);if($gameMap[_0x441dcc(0x3cc)](_0x324bcf,_0x55808b)&&!$gameMap[_0x441dcc(0x264)](_0x2c6177)){if(_0x441dcc(0x256)!=='KDBCM'){_0x585b43--;continue;}else{const _0x1f5de0=this['_character']['x'],_0x2f79be=this[_0x441dcc(0x162)]['y'];this['_duration']=_0xb7f51b['footprintDurationAtXy'](_0x1f5de0,_0x2f79be);}}if($gameMap[_0x441dcc(0x241)](_0x324bcf,_0x55808b))break;_0x585b43--;if(_0x585b43<=0x0)break;}return _0x585b43;},Game_Player['prototype']['updateSmartJumpState']=function(){const _0x1a7206=_0x3b896f;if(this[_0x1a7206(0x39b)]())return;this[_0x1a7206(0x1cb)]=![];if(this[_0x1a7206(0x34f)]()){let _0x363131=Math['max'](Math[_0x1a7206(0x300)](this[_0x1a7206(0x16a)]/0x2),0x1);while(_0x363131--)this[_0x1a7206(0x2fd)]();}if(this[_0x1a7206(0x3b2)]())this[_0x1a7206(0x1db)]();setTimeout(this[_0x1a7206(0x30d)]['bind'](this,[0x1,0x2]),0x32);},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x2b3)]=function(){const _0xf485a2=_0x3b896f;this['_smartJumpCooldown']&&('nLLGK'===_0xf485a2(0x351)?this[_0xf485a2(0x35a)]--:_0x1ad2c9*=_0x206187[_0xf485a2(0x17f)]());},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x380)]=function(){return this['_smartBlinkMotionTrailData']||{'enabled':![]};},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x17c)]=function(){const _0xecdfae=_0x3b896f;return this[_0xecdfae(0x350)]||{'enabled':![]};},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x24a)]=function(){return this['_smartRushMotionTrailData']||{'enabled':![]};},Game_Player[_0x3b896f(0x3e3)][_0x3b896f(0x1ef)]=function(){const _0x2df225=_0x3b896f;if(this[_0x2df225(0x2c6)]()&&this[_0x2df225(0x24a)]()['enabled']){if(_0x2df225(0x129)==='HcVwA')return this['smartRushMotionTrailData']();else this[_0x2df225(0x2f1)][_0x2df225(0x21d)]=_0x27b770['$1'][_0x2df225(0x2a3)](',')['map'](_0x4db39b=>(_0xf1c8d7(_0x4db39b)||0x0)[_0x2df225(0x11a)](0x0,0x7));}else{if(this['isSmartJumping']()&&this[_0x2df225(0x17c)]()[_0x2df225(0x1f0)])return this['smartJumpMotionTrailData']();}return Game_Character[_0x2df225(0x3e3)][_0x2df225(0x1ef)][_0x2df225(0x24b)](this);},Game_Player['prototype'][_0x3b896f(0x2e4)]=function(){const _0x1f1395=_0x3b896f,_0x269fd1=SceneManager['_scene'][_0x1f1395(0x226)];if(!_0x269fd1)return;const _0x1aeb4c=[this][_0x1f1395(0x307)](this[_0x1f1395(0x3ed)]()[_0x1f1395(0x402)]());for(const _0x4cdf44 of _0x1aeb4c){if('qWeJZ'!==_0x1f1395(0x3ab)){if(!_0x4cdf44)continue;oldData=JSON['parse'](JSON[_0x1f1395(0x2d8)](_0x4cdf44[_0x1f1395(0x169)]||{'enabled':![]})),_0x4cdf44[_0x1f1395(0x282)](this[_0x1f1395(0x380)]());const _0x12960d=_0x269fd1[_0x1f1395(0x32f)](_0x4cdf44);_0x12960d&&(_0x1f1395(0x1ce)!=='tmZXx'?(this[_0x1f1395(0x138)]={},this[_0x1f1395(0x2f6)]={}):_0x12960d[_0x1f1395(0x332)]()),_0x4cdf44[_0x1f1395(0x282)](oldData);}else{if(this['_footprintsData']===_0x18bbfc)this[_0x1f1395(0x20f)]();return this['_footprintsData'];}}},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x381)]=Game_Follower[_0x3b896f(0x3e3)][_0x3b896f(0x171)],Game_Follower['prototype'][_0x3b896f(0x171)]=function(_0x5e5493){const _0x23c8b1=_0x3b896f;VisuMZ['MovementEffects'][_0x23c8b1(0x381)][_0x23c8b1(0x24b)](this,_0x5e5493),this[_0x23c8b1(0x249)]();},VisuMZ['MovementEffects'][_0x3b896f(0x363)]=Game_CharacterBase[_0x3b896f(0x3e3)][_0x3b896f(0x190)],Game_CharacterBase[_0x3b896f(0x3e3)]['straighten']=function(){const _0x23b955=_0x3b896f;VisuMZ[_0x23b955(0x352)][_0x23b955(0x363)][_0x23b955(0x24b)](this),this[_0x23b955(0x249)]();},Game_CharacterBase['prototype'][_0x3b896f(0x249)]=function(){},Game_Follower['prototype'][_0x3b896f(0x249)]=function(){const _0x1131b2=_0x3b896f;this[_0x1131b2(0x11e)]=Math[_0x1131b2(0x34e)](0xd);},Game_Follower[_0x3b896f(0x3e3)][_0x3b896f(0x1db)]=function(){const _0x44ed4b=_0x3b896f;if($gamePlayer[_0x44ed4b(0x3d0)])return;Game_Character[_0x44ed4b(0x3e3)][_0x44ed4b(0x1db)][_0x44ed4b(0x24b)](this);},Game_Follower[_0x3b896f(0x3e3)][_0x3b896f(0x217)]=function(){const _0x5c337f=_0x3b896f;return this[_0x5c337f(0x257)]()?this[_0x5c337f(0x257)]()[_0x5c337f(0x217)]():Game_Character[_0x5c337f(0x3e3)][_0x5c337f(0x217)]['call'](this);},Game_Follower['prototype'][_0x3b896f(0x16d)]=function(){const _0x18a88c=_0x3b896f;return this[_0x18a88c(0x257)]()?this['actor']()['footprintsData']():Game_Character[_0x18a88c(0x3e3)][_0x18a88c(0x16d)][_0x18a88c(0x24b)](this);},Game_Follower[_0x3b896f(0x3e3)][_0x3b896f(0x380)]=function(){const _0x194a8a=_0x3b896f;return $gamePlayer[_0x194a8a(0x380)]();},Game_Follower['prototype'][_0x3b896f(0x17c)]=function(){const _0x45fdca=_0x3b896f;return $gamePlayer[_0x45fdca(0x17c)]();},Game_Follower['prototype']['smartRushMotionTrailData']=function(){const _0x603ba4=_0x3b896f;return $gamePlayer[_0x603ba4(0x24a)]();},Game_Follower['prototype'][_0x3b896f(0x1ef)]=function(){const _0x4f8449=_0x3b896f;if($gamePlayer['isSmartRushing']()&&this[_0x4f8449(0x24a)]()[_0x4f8449(0x1f0)])return this[_0x4f8449(0x24a)]();else{if($gamePlayer[_0x4f8449(0x322)]()&&this[_0x4f8449(0x17c)]()[_0x4f8449(0x1f0)])return this[_0x4f8449(0x17c)]();}return Game_Character[_0x4f8449(0x3e3)][_0x4f8449(0x1ef)][_0x4f8449(0x24b)](this);},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x134)]=Game_Event[_0x3b896f(0x3e3)][_0x3b896f(0x1d3)],Game_Event[_0x3b896f(0x3e3)][_0x3b896f(0x1d3)]=function(){const _0x534e77=_0x3b896f;VisuMZ['MovementEffects'][_0x534e77(0x134)][_0x534e77(0x24b)](this),this['initMovementEffectsVariables']();},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x275)]=Game_Event[_0x3b896f(0x3e3)]['setupPageSettings'],Game_Event['prototype']['setupPageSettings']=function(){const _0x322dab=_0x3b896f;VisuMZ['MovementEffects'][_0x322dab(0x275)]['call'](this),this[_0x322dab(0x378)]();},Game_Event[_0x3b896f(0x3e3)]['setupMovementEffectsVariables']=function(){const _0x14da48=_0x3b896f;if(!this[_0x14da48(0x3a3)]())return;this['initMovementEffectsVariables'](),this['setupMovementEffectsNotetags'](),this[_0x14da48(0x20c)]();},Game_Event[_0x3b896f(0x3e3)]['setupMovementEffectsNotetags']=function(){const _0xfd4ff3=_0x3b896f,_0x4325d0=this[_0xfd4ff3(0x3a3)]()['note'];if(_0x4325d0==='')return;this['checkMovementEffectsStringTags'](_0x4325d0);},Game_Event[_0x3b896f(0x3e3)]['setupMovementEffectsCommentTags']=function(){const _0x384778=_0x3b896f;if(!this[_0x384778(0x160)]())return;const _0x169e37=this[_0x384778(0x170)]();let _0x4931e0='';for(const _0x36f82c of _0x169e37){if([0x6c,0x198]['includes'](_0x36f82c[_0x384778(0x1a8)])){if(_0x4931e0!=='')_0x4931e0+='\x0a';_0x4931e0+=_0x36f82c['parameters'][0x0];}}this[_0x384778(0x3e6)](_0x4931e0);},Game_Event[_0x3b896f(0x3e3)][_0x3b896f(0x215)]=function(){const _0xe2173a=_0x3b896f;{if(_0xe2173a(0x146)!==_0xe2173a(0x146))this[_0xe2173a(0x1da)]=0x0,_0x2a566c(this[_0xe2173a(0x3b3)][_0xe2173a(0x1b8)](this,![]),0x32);else{const _0x338a7d=VisuMZ[_0xe2173a(0x352)][_0xe2173a(0x1b6)][_0xe2173a(0x3c3)];this[_0xe2173a(0x148)]={'enabled':_0x338a7d[_0xe2173a(0x3ad)],'volumeRate':_0x338a7d[_0xe2173a(0x2f2)],'pitchRate':_0x338a7d[_0xe2173a(0x395)],'soundFrames':_0x338a7d['Frames'][_0xe2173a(0x259)]()};}}{const _0x2a5638=VisuMZ['MovementEffects'][_0xe2173a(0x1b6)]['Footprints'];this[_0xe2173a(0x2a4)]={'enabled':!![],'dir1':JSON[_0xe2173a(0x2ce)](JSON[_0xe2173a(0x2d8)](_0x2a5638[_0xe2173a(0x2ed)])),'dir2':JSON[_0xe2173a(0x2ce)](JSON[_0xe2173a(0x2d8)](_0x2a5638['dir2'])),'dir3':JSON['parse'](JSON['stringify'](_0x2a5638[_0xe2173a(0x277)])),'dir4':JSON[_0xe2173a(0x2ce)](JSON[_0xe2173a(0x2d8)](_0x2a5638[_0xe2173a(0x2bc)])),'dir6':JSON[_0xe2173a(0x2ce)](JSON[_0xe2173a(0x2d8)](_0x2a5638['dir6'])),'dir7':JSON[_0xe2173a(0x2ce)](JSON[_0xe2173a(0x2d8)](_0x2a5638[_0xe2173a(0x3f3)])),'dir8':JSON['parse'](JSON[_0xe2173a(0x2d8)](_0x2a5638[_0xe2173a(0x2d6)])),'dir9':JSON[_0xe2173a(0x2ce)](JSON[_0xe2173a(0x2d8)](_0x2a5638[_0xe2173a(0x385)]))};}this['_smartJumpRestriction']={'nonLand':![],'nonPass':![]};},Game_Event[_0x3b896f(0x3e3)][_0x3b896f(0x3e6)]=function(_0x4635e6){const _0xbec76a=_0x3b896f,_0x15a16d=VisuMZ[_0xbec76a(0x352)]['RegExp'];if(!_0x4635e6['match'](_0x15a16d[_0xbec76a(0x1fc)]))return;if(_0x4635e6['match'](_0x15a16d[_0xbec76a(0x3d7)])){if(_0xbec76a(0x158)==='racfq')this[_0xbec76a(0x148)][_0xbec76a(0x1f0)]=!![];else{if(_0x391822[_0xbec76a(0x322)]())return!![];this['_waitMode']='';}}else _0x4635e6['match'](_0x15a16d[_0xbec76a(0x376)])&&(this[_0xbec76a(0x148)]['enabled']=![]);if(_0x4635e6[_0xbec76a(0x336)](_0x15a16d[_0xbec76a(0x316)])){if(_0xbec76a(0x297)===_0xbec76a(0x2f4))return!![];else this['_footsteps']['volumeRate']=Number(RegExp['$1'])*0.01;}_0x4635e6['match'](_0x15a16d['FootstepsPitchRate'])&&(this[_0xbec76a(0x148)][_0xbec76a(0x3b9)]=Number(RegExp['$1'])*0.01);_0x4635e6[_0xbec76a(0x336)](_0x15a16d[_0xbec76a(0x382)])&&(this['_footsteps'][_0xbec76a(0x22f)]=String(RegExp['$1'])['split'](',')[_0xbec76a(0x2d1)](_0x1d3b07=>Number(_0x1d3b07)||0x0));if(_0x4635e6[_0xbec76a(0x336)](_0x15a16d[_0xbec76a(0x3f7)]))this['_footprintsData'][_0xbec76a(0x1f0)]=!![];else _0x4635e6[_0xbec76a(0x336)](_0x15a16d[_0xbec76a(0x26b)])&&(this['_footprintsData'][_0xbec76a(0x1f0)]=![]);{const _0x15fa17=_0xbec76a(0x31b),_0x233ee6=_0x4635e6[_0xbec76a(0x336)](_0x15a16d[_0x15fa17]);if(_0x233ee6)for(const _0x1b1b5c of _0x233ee6){_0x1b1b5c[_0xbec76a(0x336)](_0x15a16d[_0x15fa17]);const _0x5bc0dc=RegExp['$1'],_0x2f4cce=RegExp['$2'],_0x26a7a5=RegExp['$3'],_0x2d694c=_0xbec76a(0x320)[_0xbec76a(0x3fb)](TextManager[_0xbec76a(0x2ea)](_0x5bc0dc)),_0x371a2e=_0xbec76a(0x2dd)[_0xbec76a(0x3fb)](Number(_0x2f4cce)||0x0);this['_footprintsData'][_0x2d694c][_0x371a2e][_0xbec76a(0x184)]=String(_0x26a7a5)['trim']();}}{const _0x4ebb17=_0xbec76a(0x3aa),_0x3f3c78=_0x4635e6[_0xbec76a(0x336)](_0x15a16d[_0x4ebb17]);if(_0x3f3c78){if(_0xbec76a(0x193)!==_0xbec76a(0x3a8))for(const _0x22c539 of _0x3f3c78){_0x22c539[_0xbec76a(0x336)](_0x15a16d[_0x4ebb17]);const _0x3f9a85=RegExp['$1'],_0x5cc49d=RegExp['$2'],_0x4faf77=RegExp['$3'],_0x5cf68a=_0xbec76a(0x320)[_0xbec76a(0x3fb)](TextManager[_0xbec76a(0x2ea)](_0x3f9a85)),_0x1c944a=_0xbec76a(0x2dd)[_0xbec76a(0x3fb)](Number(_0x5cc49d)||0x0);this['_footprintsData'][_0x5cf68a][_0x1c944a][_0xbec76a(0x269)]=Number(_0x4faf77)||0x1;}else this[_0xbec76a(0x14d)]();}}{const _0x272566=_0xbec76a(0x2f0),_0x336301=_0x4635e6['match'](_0x15a16d[_0x272566]);if(_0x336301){if(_0xbec76a(0x151)===_0xbec76a(0x203))return![];else for(const _0x4604a5 of _0x336301){_0x4604a5[_0xbec76a(0x336)](_0x15a16d[_0x272566]);const _0x1c7389=RegExp['$1'],_0x5dd51a=RegExp['$2'],_0x271c19=RegExp['$3'],_0x5cb043='dir%1'[_0xbec76a(0x3fb)](TextManager[_0xbec76a(0x2ea)](_0x1c7389)),_0x2b8a03=_0xbec76a(0x2dd)[_0xbec76a(0x3fb)](Number(_0x5dd51a)||0x0);this[_0xbec76a(0x2a4)][_0x5cb043][_0x2b8a03][_0xbec76a(0x1a4)]=Number(_0x271c19)||0x1;}}}{if('OMvwU'===_0xbec76a(0x113)){const _0x5304a1=_0xbec76a(0x11c),_0x2f15a8=_0x4635e6[_0xbec76a(0x336)](_0x15a16d[_0x5304a1]);if(_0x2f15a8)for(const _0x5146f6 of _0x2f15a8){_0x5146f6[_0xbec76a(0x336)](_0x15a16d[_0x5304a1]);const _0x2cd42d=RegExp['$1'],_0x3ab6a6=RegExp['$2'],_0x3846a5=RegExp['$3'],_0x4e0d08=_0xbec76a(0x320)[_0xbec76a(0x3fb)](TextManager['parseDirectionText'](_0x2cd42d)),_0x5ab649=_0xbec76a(0x2dd)['format'](Number(_0x3ab6a6)||0x0),_0x538fff=_0x3846a5[_0xbec76a(0x2a3)](',')['map'](_0x3aa4aa=>Number(_0x3aa4aa)||0x0);this['_footprintsData'][_0x4e0d08][_0x5ab649][_0xbec76a(0x232)]=_0x538fff[0x0]||0x0,this[_0xbec76a(0x2a4)][_0x4e0d08][_0x5ab649][_0xbec76a(0x38d)]=_0x538fff[0x1]||0x0;}}else this['canSmoothScroll']()?this[_0xbec76a(0x1e2)](_0x1d29f8,_0x3fd8af):_0x24ffc9[_0xbec76a(0x352)]['Game_Player_updateScroll'][_0xbec76a(0x24b)](this,_0x4fee43,_0x2a486e);}if(_0x4635e6[_0xbec76a(0x336)](_0x15a16d['SmartJumpNonLandEvent'])){if(_0xbec76a(0x35f)!==_0xbec76a(0x191))this[_0xbec76a(0x13d)][_0xbec76a(0x201)]=!![];else return![];}_0x4635e6['match'](_0x15a16d['SmartJumpNonPassEvent'])&&(this['_smartJumpRestriction'][_0xbec76a(0x1b4)]=!![]);},Game_Event['prototype'][_0x3b896f(0x217)]=function(){const _0x22a583=_0x3b896f;return this[_0x22a583(0x148)]===undefined&&this[_0x22a583(0x378)](),this[_0x22a583(0x148)];},Game_Event[_0x3b896f(0x3e3)][_0x3b896f(0x16d)]=function(){const _0x40afa1=_0x3b896f;return this['_footprintsData']===undefined&&this['setupMovementEffectsVariables'](),this[_0x40afa1(0x2a4)];},Game_Event['prototype']['notSmartJumpLandable']=function(){const _0x57dc2c=_0x3b896f;if(this[_0x57dc2c(0x13d)]===undefined)this[_0x57dc2c(0x378)]();return this[_0x57dc2c(0x13d)][_0x57dc2c(0x201)];},Game_Event[_0x3b896f(0x3e3)]['notSmartJumpPassable']=function(){const _0x5bcc03=_0x3b896f;if(this['_smartJumpRestriction']===undefined)this[_0x5bcc03(0x378)]();return this[_0x5bcc03(0x13d)][_0x5bcc03(0x1b4)];},VisuMZ[_0x3b896f(0x352)]['Game_Interpreter_updateWaitMode']=Game_Interpreter[_0x3b896f(0x3e3)][_0x3b896f(0x1d1)],Game_Interpreter['prototype'][_0x3b896f(0x1d1)]=function(){const _0x2cfc76=_0x3b896f;if(this[_0x2cfc76(0x243)]===_0x2cfc76(0x265)){if($gamePlayer[_0x2cfc76(0x185)]()){if(_0x2cfc76(0x373)!=='xqXea')_0xa4d09b[_0x2cfc76(0x399)]!==''&&_0x2c1ed5['playSe'](_0x4130c5),_0x2dac92>0x0&&_0x35e1b6[_0x2cfc76(0x263)]([_0x194a34],_0x398cfd),_0x364a11>0x0&&_0x1bc1ac[_0x2cfc76(0x115)][_0x2cfc76(0x388)](_0x1c4b33);else return!![];}this[_0x2cfc76(0x243)]='';}else{if(this[_0x2cfc76(0x243)]==='smartJump'){if('qZcPU'!==_0x2cfc76(0x19a)){if($gamePlayer[_0x2cfc76(0x322)]())return _0x2cfc76(0x1d0)!==_0x2cfc76(0x1d0)?this[_0x2cfc76(0x257)]()?this[_0x2cfc76(0x257)]()[_0x2cfc76(0x217)]():_0x4a7d69[_0x2cfc76(0x3e3)][_0x2cfc76(0x217)][_0x2cfc76(0x24b)](this):!![];this[_0x2cfc76(0x243)]='';}else return this[_0x2cfc76(0x24a)]();}else{if(this[_0x2cfc76(0x243)]===_0x2cfc76(0x276)){if(_0x2cfc76(0x30e)==='wGzci'){if($gamePlayer[_0x2cfc76(0x2c6)]())return!![];this[_0x2cfc76(0x243)]='';}else _0x5f21ef=_0x1e3d01[_0x2cfc76(0x22c)](_0x40aadf,_0x281afe);}}}return VisuMZ[_0x2cfc76(0x352)]['Game_Interpreter_updateWaitMode']['call'](this);},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x33f)]=Sprite_Character[_0x3b896f(0x3e3)][_0x3b896f(0x171)],Sprite_Character[_0x3b896f(0x3e3)][_0x3b896f(0x171)]=function(_0x5d5862){const _0x1f5573=_0x3b896f;VisuMZ['MovementEffects'][_0x1f5573(0x33f)][_0x1f5573(0x24b)](this,_0x5d5862);},VisuMZ[_0x3b896f(0x352)]['Sprite_Character_update']=Sprite_Character[_0x3b896f(0x3e3)][_0x3b896f(0x34c)],Sprite_Character[_0x3b896f(0x3e3)]['update']=function(){const _0x335e07=_0x3b896f;VisuMZ[_0x335e07(0x352)][_0x335e07(0x178)][_0x335e07(0x24b)](this),this['updateMotionBlurEffectFilter'](),this[_0x335e07(0x3de)]();},Sprite_Character[_0x3b896f(0x3e3)][_0x3b896f(0x25f)]=function(){const _0x30901e=_0x3b896f;if(!PIXI[_0x30901e(0x144)][_0x30901e(0x361)])return;if(this[_0x30901e(0x11d)])return;this[_0x30901e(0x11d)]=new PIXI[(_0x30901e(0x144))][(_0x30901e(0x361))](),this[_0x30901e(0x13a)]=0x0,this[_0x30901e(0x2f8)]=0x0,this['filters']=this['filters']||[],this[_0x30901e(0x144)]['push'](this[_0x30901e(0x11d)]);},Sprite_Character[_0x3b896f(0x3e3)][_0x3b896f(0x1a3)]=function(_0x349cbb,_0x199eec){const _0x38926c=_0x3b896f;if(!this[_0x38926c(0x11d)]){if(_0x38926c(0x33b)===_0x38926c(0x33b))this[_0x38926c(0x25f)]();else{const _0x245cc9=_0x23c7b5[_0x38926c(0x354)],_0x480a6b=_0x4de464[_0x38926c(0x2aa)](),_0x493e71=_0x16913a[_0x38926c(0x3d6)]();_0xf35e1b['x']=_0x1354a0['floor'](_0x2db152['adjustX'](_0x50953c[_0x38926c(0x1dc)])*_0x480a6b+_0x480a6b/0x2),_0x4c7159['y']=_0x29ea93[_0x38926c(0x28a)](_0x487a72[_0x38926c(0x3ff)](_0x22d055[_0x38926c(0x198)])*_0x493e71+_0x493e71),_0x18187f[_0x38926c(0x3b8)]['x']=(_0x3fb200['scale']['x']*(_0x245cc9-0x1)+_0x23f8fc[_0x38926c(0x26c)])/_0x245cc9,_0x3dd0e6[_0x38926c(0x3b8)]['y']=(_0x5697eb[_0x38926c(0x3b8)]['y']*(_0x245cc9-0x1)+_0x2bfe6a['_targetScaleY'])/_0x245cc9,_0x31f54e[_0x38926c(0x1c6)]=_0xa71fed[_0x38926c(0x1c6)]*(_0x245cc9-0x1)/_0x245cc9,_0x1142a8['_duration']--;}}if(!this[_0x38926c(0x11d)])return;this[_0x38926c(0x13a)]=_0x349cbb,this[_0x38926c(0x2f8)]=_0x199eec;},Sprite_Character[_0x3b896f(0x3e3)][_0x3b896f(0x1fa)]=function(){const _0x5f5172=_0x3b896f;if(!this['_character'])return![];if(this[_0x5f5172(0x162)]!==$gamePlayer&&this[_0x5f5172(0x162)][_0x5f5172(0x281)]!==Game_Follower)return![];return $gamePlayer[_0x5f5172(0x2c6)]();},Sprite_Character['prototype']['updateMotionBlurEffectFilter']=function(){const _0x3c282c=_0x3b896f;let _0x573129=this[_0x3c282c(0x2f8)];if(this[_0x3c282c(0x1fa)]()){if(_0x3c282c(0x357)===_0x3c282c(0x357))this['_motionBlurMovementEffectsDuration']=Game_Player[_0x3c282c(0x3c5)],_0x573129=Game_Player[_0x3c282c(0x39c)];else{if(this['_dustCloud']===_0x150323)this[_0x3c282c(0x126)]();this[_0x3c282c(0x235)]=_0xa33023['makeDeepCopy'](_0x5ce428);}}if(this[_0x3c282c(0x13a)]===undefined)return;if(this[_0x3c282c(0x13a)]<=0x0)return;!this[_0x3c282c(0x11d)]&&this[_0x3c282c(0x25f)]();if(!this[_0x3c282c(0x11d)])return;const _0x109d4c=this[_0x3c282c(0x11d)];if(this['_motionBlurMovementEffectsDuration']-->0x0){let _0x418cfe=VisuMZ[_0x3c282c(0x352)]['GetDirAngle'](this['_character']);_0x418cfe+=_0x573129;const _0x2ea42e=this[_0x3c282c(0x13a)][_0x3c282c(0x11a)](0x0,0x1e);_0x109d4c[_0x3c282c(0x131)]['x']=_0x2ea42e*Math[_0x3c282c(0x214)](_0x418cfe*Math['PI']/0xb4),_0x109d4c[_0x3c282c(0x131)]['y']=-_0x2ea42e*Math[_0x3c282c(0x362)](_0x418cfe*Math['PI']/0xb4);}else'FFxMe'===_0x3c282c(0x14e)?this[_0x3c282c(0x1ed)][_0x3c282c(0x1bc)]=_0x190269['$1'][_0x3c282c(0x2a3)](',')[_0x3c282c(0x2d1)](_0x1cee76=>(_0x5d677f(_0x1cee76)||0x0)[_0x3c282c(0x11a)](0x0,0x7)):(_0x109d4c[_0x3c282c(0x131)]['x']=0x0,_0x109d4c['velocity']['y']=0x0,this['_motionBlurMovementEffectsAngleOffset']=0x0);},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x234)]=function(_0x135530){const _0x28a442=_0x3b896f;if(!_0x135530)return 0x2d;const _0x35e562=_0x135530[_0x28a442(0x19d)]();if(_0x35e562===0x6)return 0x0;if(_0x35e562===0x9)return 0x2d;if(_0x35e562===0x8)return 0x5a;if(_0x35e562===0x7)return 0x87;if(_0x35e562===0x4)return 0xb4;if(_0x35e562===0x1)return 0xe1;if(_0x35e562===0x2)return 0x10e;if(_0x35e562===0x3)return 0x13b;return 0x2d;},Sprite_Character['prototype'][_0x3b896f(0x36a)]=function(){const _0x4a6d2a=_0x3b896f;if(!SceneManager[_0x4a6d2a(0x115)])return![];if(!SceneManager['_scene']['_spriteset'])return![];if(this[_0x4a6d2a(0x281)]!==Sprite_Character)return![];if(!this[_0x4a6d2a(0x162)])return![];if(this[_0x4a6d2a(0x162)][_0x4a6d2a(0x2d3)])return![];if(!this[_0x4a6d2a(0x3dc)])return![];if(this[_0x4a6d2a(0x1c6)]<=0x0)return![];if(!this[_0x4a6d2a(0x248)])return![];if(!this[_0x4a6d2a(0x346)])return![];if(this['_frame']['width']===this[_0x4a6d2a(0x346)][_0x4a6d2a(0x269)])return![];if(this[_0x4a6d2a(0x18f)]===this[_0x4a6d2a(0x162)][_0x4a6d2a(0x1dc)]&&this[_0x4a6d2a(0x37a)]===this[_0x4a6d2a(0x162)][_0x4a6d2a(0x198)]){if(_0x4a6d2a(0x182)!==_0x4a6d2a(0x383))return![];else{if(!_0x377b85[_0x4a6d2a(0x398)]())return![];if(this[_0x4a6d2a(0x36b)])return![];if(this['isSmartMoving']())return![];if(this[_0x4a6d2a(0x311)]())return![];if(this[_0x4a6d2a(0x29c)]())return![];if(this[_0x4a6d2a(0x3a2)]())return![];const _0xe1a251=_0x180a08['MovementEffects'][_0x4a6d2a(0x1b6)]['SmartRush'],_0x351ce6=this[_0x4a6d2a(0x186)](_0xe1a251);return this[_0x4a6d2a(0x315)](this['x'],this['y'],_0x351ce6);}}return!![];},Sprite_Character['prototype'][_0x3b896f(0x22d)]=function(){const _0xed63e2=_0x3b896f;if(!this[_0xed63e2(0x162)])return![];return this['_character'][_0xed63e2(0x1ef)]()[_0xed63e2(0x1f0)];},Sprite_Character[_0x3b896f(0x3e3)]['updateMovementEffectsMotionTrails']=function(){const _0x3fa0de=_0x3b896f;if(!this['canShowMotionTrails']())return;if(!this[_0x3fa0de(0x22d)]())return;const _0x181f1c=this[_0x3fa0de(0x162)]['motionTrailData'](),_0x2a7227=_0x181f1c[_0x3fa0de(0x1f5)]||0x1;Graphics[_0x3fa0de(0x205)]%_0x2a7227===0x0&&this['createMotionTrailSprite']();},Sprite_Character[_0x3b896f(0x3e3)]['createMotionTrailSprite']=function(){const _0x58c020=_0x3b896f,_0x1e303a=new Sprite_MapMotionTrail(this,this[_0x58c020(0x162)]),_0x4fd856=SceneManager[_0x58c020(0x115)]['_spriteset'];_0x4fd856['_motionTrailSprites'][_0x58c020(0x2fc)](_0x1e303a),this[_0x58c020(0x18f)]=this[_0x58c020(0x162)]['_realX'],this[_0x58c020(0x37a)]=this['_character'][_0x58c020(0x198)];const _0xa240f1=_0x4fd856[_0x58c020(0x2bf)];_0xa240f1[_0x58c020(0x2c4)](_0x1e303a);};function Sprite_Footprint(){const _0x3d64cb=_0x3b896f;this[_0x3d64cb(0x171)](...arguments);}Sprite_Footprint[_0x3b896f(0x3e3)]=Object[_0x3b896f(0x1a6)](Sprite[_0x3b896f(0x3e3)]),Sprite_Footprint[_0x3b896f(0x3e3)]['constructor']=Sprite_Footprint,Sprite_Footprint[_0x3b896f(0x3e3)][_0x3b896f(0x171)]=function(_0x2503b0){const _0x41de9a=_0x3b896f;this[_0x41de9a(0x162)]=_0x2503b0,Sprite[_0x41de9a(0x3e3)][_0x41de9a(0x171)][_0x41de9a(0x24b)](this),this[_0x41de9a(0x26d)](),this[_0x41de9a(0x252)](),this[_0x41de9a(0x16c)](),this['setupDuration'](),this['updatePosition']();},Sprite_Footprint['prototype'][_0x3b896f(0x26d)]=function(){const _0x54e9ef=_0x3b896f;this[_0x54e9ef(0x199)]['x']=0.5,this['anchor']['y']=0x1,this['z']=0x0,this[_0x54e9ef(0x1dc)]=this[_0x54e9ef(0x162)][_0x54e9ef(0x1dc)],this[_0x54e9ef(0x198)]=this[_0x54e9ef(0x162)]['_realY'],this[_0x54e9ef(0x2eb)]=this[_0x54e9ef(0x162)][_0x54e9ef(0x2eb)],this['_pattern']=this[_0x54e9ef(0x162)][_0x54e9ef(0x280)](),this['_shiftY']=this[_0x54e9ef(0x162)]['shiftY'](),this[_0x54e9ef(0x21e)]=0x0,this[_0x54e9ef(0x25c)]=0x0;if(this[_0x54e9ef(0x162)][_0x54e9ef(0x281)]===Game_Follower){const _0xa268a2=VisuMZ[_0x54e9ef(0x352)][_0x54e9ef(0x1b6)]['Footprints'][_0x54e9ef(0x1e3)]||0x0;this[_0x54e9ef(0x21e)]=Math['randomInt'](_0xa268a2+0x1)+Math['randomInt'](_0xa268a2+0x1)-_0xa268a2,this['_followerOffsetY']=Math[_0x54e9ef(0x34e)](_0xa268a2+0x1)+Math[_0x54e9ef(0x34e)](_0xa268a2+0x1)-_0xa268a2;}},Sprite_Footprint[_0x3b896f(0x3e3)]['footprintsData']=function(){const _0x440119=_0x3b896f,_0x80abce='dir%1'[_0x440119(0x3fb)](this[_0x440119(0x2eb)]),_0x4ee86d=_0x440119(0x2dd)['format'](this['_pattern']),_0x46c1d2=this[_0x440119(0x162)]['footprintsData']();return _0x46c1d2[_0x80abce][_0x4ee86d];},Sprite_Footprint[_0x3b896f(0x3e3)][_0x3b896f(0x252)]=function(){const _0xd0ec6b=_0x3b896f,_0x131f16=this['footprintsData']();_0x131f16['filename']!==''?(this[_0xd0ec6b(0x346)]=ImageManager[_0xd0ec6b(0x368)](_0x131f16[_0xd0ec6b(0x184)]),this['blendMode']=0x0):(this[_0xd0ec6b(0x346)]=ImageManager[_0xd0ec6b(0x323)](),this[_0xd0ec6b(0x3b8)]['x']=_0x131f16[_0xd0ec6b(0x269)]*0.01,this['scale']['y']=_0x131f16[_0xd0ec6b(0x1a4)]*0.01,this[_0xd0ec6b(0x3dd)]=0x2);},Sprite_Footprint[_0x3b896f(0x3e3)]['setupOpacity']=function(){const _0x2c84e6=_0x3b896f,_0x219787=this[_0x2c84e6(0x162)]['x'],_0x415b02=this['_character']['y'];this[_0x2c84e6(0x1c6)]=$gameMap[_0x2c84e6(0x125)](_0x219787,_0x415b02);},Sprite_Footprint[_0x3b896f(0x3e3)][_0x3b896f(0x2e6)]=function(){const _0x1aae7d=_0x3b896f,_0x5c08a7=this[_0x1aae7d(0x162)]['x'],_0x2e68f7=this[_0x1aae7d(0x162)]['y'];this['_duration']=$gameMap[_0x1aae7d(0x38b)](_0x5c08a7,_0x2e68f7);},Sprite_Footprint[_0x3b896f(0x3e3)][_0x3b896f(0x34c)]=function(){const _0x4b6926=_0x3b896f;Sprite['prototype']['update'][_0x4b6926(0x24b)](this),this['updatePosition']();},Sprite_Footprint[_0x3b896f(0x3e3)][_0x3b896f(0x255)]=function(){const _0x1d0383=_0x3b896f,_0x368e3b=$gameMap[_0x1d0383(0x2aa)](),_0x253b6b=$gameMap[_0x1d0383(0x3d6)]();this['x']=Math[_0x1d0383(0x28a)]($gameMap['adjustX'](this[_0x1d0383(0x1dc)])*_0x368e3b+_0x368e3b/0x2),this['x']+=this[_0x1d0383(0x16d)]()[_0x1d0383(0x232)]+this[_0x1d0383(0x21e)],this['y']=Math[_0x1d0383(0x28a)]($gameMap[_0x1d0383(0x3ff)](this[_0x1d0383(0x198)])*_0x253b6b+_0x253b6b),this['y']+=this[_0x1d0383(0x16d)]()[_0x1d0383(0x38d)]+this[_0x1d0383(0x25c)],this['y']-=this[_0x1d0383(0x200)];};function Sprite_MapMotionTrail(){const _0x420517=_0x3b896f;this[_0x420517(0x171)](...arguments);}Sprite_MapMotionTrail[_0x3b896f(0x3e3)]=Object[_0x3b896f(0x1a6)](Sprite[_0x3b896f(0x3e3)]),Sprite_MapMotionTrail[_0x3b896f(0x3e3)]['constructor']=Sprite_MapMotionTrail,Sprite_MapMotionTrail[_0x3b896f(0x3e3)]['initialize']=function(_0x25a75e,_0xb701be){const _0x524925=_0x3b896f;this[_0x524925(0x36e)]=_0x25a75e,this[_0x524925(0x162)]=_0xb701be,Sprite[_0x524925(0x3e3)][_0x524925(0x171)][_0x524925(0x24b)](this),this[_0x524925(0x3a4)](),this[_0x524925(0x3f1)](),this[_0x524925(0x314)](),this[_0x524925(0x1f2)](),this[_0x524925(0x26f)]=!![];},Sprite_MapMotionTrail[_0x3b896f(0x3e3)]['copyBasicProperties']=function(){const _0x4d91b2=_0x3b896f,_0x120021=$gameMap[_0x4d91b2(0x3d6)](),_0x56bd4c=(_0x120021-0x1)/_0x120021;this['anchor']['x']=this['_baseSprite'][_0x4d91b2(0x199)]['x'],this[_0x4d91b2(0x199)]['y']=this[_0x4d91b2(0x36e)][_0x4d91b2(0x199)]['y'],this[_0x4d91b2(0x1c6)]=this[_0x4d91b2(0x36e)][_0x4d91b2(0x1c6)],this['scale']['x']=this[_0x4d91b2(0x36e)]['scale']['x'],this['scale']['y']=this[_0x4d91b2(0x36e)][_0x4d91b2(0x3b8)]['y'],this['x']=this['_baseSprite']['x'],this['y']=this['_baseSprite']['y'],this['z']=this[_0x4d91b2(0x36e)]['z'],this[_0x4d91b2(0x1dc)]=this['_character'][_0x4d91b2(0x1dc)],this[_0x4d91b2(0x198)]=this[_0x4d91b2(0x162)][_0x4d91b2(0x198)],this['_shiftY']=this[_0x4d91b2(0x162)]['shiftY'](),this['_jumpHeight']=this[_0x4d91b2(0x162)][_0x4d91b2(0x3d1)]();},Sprite_MapMotionTrail[_0x3b896f(0x3e3)][_0x3b896f(0x3f1)]=function(){const _0x36e57b=_0x3b896f;this[_0x36e57b(0x346)]=this[_0x36e57b(0x36e)][_0x36e57b(0x346)];const _0x24e65a=this['_baseSprite'][_0x36e57b(0x202)];this['_baseSprite'][_0x36e57b(0x202)]=0x0,this[_0x36e57b(0x36e)]['updateCharacterFrame'](),this[_0x36e57b(0x248)]=JSON[_0x36e57b(0x2ce)](JSON[_0x36e57b(0x2d8)](this['_baseSprite'][_0x36e57b(0x248)])),this[_0x36e57b(0x36e)][_0x36e57b(0x202)]=_0x24e65a,this['_baseSprite'][_0x36e57b(0x15f)](),this[_0x36e57b(0x1a7)]();},Sprite_MapMotionTrail[_0x3b896f(0x3e3)][_0x3b896f(0x1ef)]=function(){const _0x30139a=_0x3b896f;return this[_0x30139a(0x162)][_0x30139a(0x1ef)]();},Sprite_MapMotionTrail[_0x3b896f(0x3e3)][_0x3b896f(0x314)]=function(){const _0x39e08e=_0x3b896f,_0x2de0db=this['motionTrailData']();this[_0x39e08e(0x354)]=_0x2de0db['duration']||0x1,this['setHue'](_0x2de0db[_0x39e08e(0x326)]),this[_0x39e08e(0x310)](_0x2de0db[_0x39e08e(0x2e7)]),this['_opacityRate']=(_0x2de0db[_0x39e08e(0x1d4)]/0xff)['clamp'](0x0,0x1),this[_0x39e08e(0x1c6)]=(this[_0x39e08e(0x1c6)]*this[_0x39e08e(0x212)])[_0x39e08e(0x11a)](0x0,0xff);},Sprite_MapMotionTrail[_0x3b896f(0x3e3)][_0x3b896f(0x1f2)]=function(){const _0x1f3027=_0x3b896f;this['createIconSprite'](),this[_0x1f3027(0x1ee)]();},Sprite_MapMotionTrail[_0x3b896f(0x3e3)][_0x3b896f(0x29b)]=function(){const _0x4bfb57=_0x3b896f;this[_0x4bfb57(0x3b5)]=new Sprite(),this[_0x4bfb57(0x3b5)][_0x4bfb57(0x346)]=ImageManager[_0x4bfb57(0x3cf)]('IconSet'),this[_0x4bfb57(0x3b5)]['bitmap'][_0x4bfb57(0x2d7)]=![],this[_0x4bfb57(0x3b5)][_0x4bfb57(0x199)]['x']=0.5,this[_0x4bfb57(0x3b5)][_0x4bfb57(0x199)]['y']=0x1,this['addChild'](this[_0x4bfb57(0x3b5)]);},Sprite_MapMotionTrail[_0x3b896f(0x3e3)][_0x3b896f(0x1ee)]=function(){const _0x1a79eb=_0x3b896f,_0x475e4a=this['_eventIconSprite'],_0xe0fb78=this[_0x1a79eb(0x36e)][_0x1a79eb(0x3b5)];_0x475e4a['x']=_0xe0fb78['x'],_0x475e4a['y']=_0xe0fb78['y'],_0x475e4a[_0x1a79eb(0x248)]=JSON['parse'](JSON[_0x1a79eb(0x2d8)](_0xe0fb78[_0x1a79eb(0x248)])),_0x475e4a['_refresh']();},Sprite_MapMotionTrail['prototype'][_0x3b896f(0x34c)]=function(){const _0x2aa18f=_0x3b896f;Sprite[_0x2aa18f(0x3e3)]['update'][_0x2aa18f(0x24b)](this);if(this[_0x2aa18f(0x26f)]){if('NoWtm'===_0x2aa18f(0x3fe))this[_0x2aa18f(0x33a)](),this['updatePosition']();else{if(!_0x2cc979[_0x2aa18f(0x337)]())return![];if(this[_0x2aa18f(0x3ce)])return![];if(this['isSmartMoving']())return![];if(this[_0x2aa18f(0x311)]())return![];if(this[_0x2aa18f(0x29c)]())return![];if(this[_0x2aa18f(0x3a2)]())return![];return _0x4138a5>=0x1;}}},Sprite_MapMotionTrail[_0x3b896f(0x3e3)][_0x3b896f(0x33a)]=function(){const _0xf5499a=_0x3b896f;if(this[_0xf5499a(0x354)]<=0x0)return;const _0x51d8cf=this['_duration'];this[_0xf5499a(0x1c6)]=(this[_0xf5499a(0x1c6)]*(_0x51d8cf-0x1)+0x0)/_0x51d8cf,this[_0xf5499a(0x354)]--,this['_duration']<=0x0&&(this[_0xf5499a(0x1c6)]=0x0);},Sprite_MapMotionTrail[_0x3b896f(0x3e3)]['updatePosition']=function(){const _0x1ab996=_0x3b896f,_0x18f5a6=$gameMap[_0x1ab996(0x2aa)](),_0x261569=$gameMap[_0x1ab996(0x3d6)]();this['x']=Math[_0x1ab996(0x28a)]($gameMap[_0x1ab996(0x2b0)](this['_realX'])*_0x18f5a6+_0x18f5a6/0x2),this['y']=Math[_0x1ab996(0x28a)]($gameMap['adjustY'](this['_realY'])*_0x261569+_0x261569),this['y']-=this[_0x1ab996(0x200)]+this['_jumpHeight']+0.001;},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x32b)]=Spriteset_Map['prototype'][_0x3b896f(0x2a1)],Spriteset_Map['prototype'][_0x3b896f(0x2a1)]=function(){const _0x396b66=_0x3b896f;VisuMZ[_0x396b66(0x352)]['Spriteset_Map_createLowerLayer']['call'](this),this[_0x396b66(0x21b)](),this['createFootprintBasics'](),this[_0x396b66(0x30c)]();},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x1ab)]=Spriteset_Map[_0x3b896f(0x3e3)][_0x3b896f(0x34c)],Spriteset_Map['prototype'][_0x3b896f(0x34c)]=function(){const _0x4dd000=_0x3b896f;VisuMZ[_0x4dd000(0x352)][_0x4dd000(0x1ab)][_0x4dd000(0x24b)](this),this[_0x4dd000(0x18c)](),this[_0x4dd000(0x1e1)](),this[_0x4dd000(0x389)]();},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x273)]=Spriteset_Map[_0x3b896f(0x3e3)][_0x3b896f(0x23e)],Spriteset_Map[_0x3b896f(0x3e3)][_0x3b896f(0x23e)]=function(){const _0x418db1=_0x3b896f;VisuMZ[_0x418db1(0x352)]['Spriteset_Map_updateTilemap'][_0x418db1(0x24b)](this),this[_0x418db1(0x2bf)]['origin']['x']=Math[_0x418db1(0x300)](this[_0x418db1(0x2bf)]['origin']['x']),this['_tilemap']['origin']['y']=Math['ceil'](this[_0x418db1(0x2bf)][_0x418db1(0x2e9)]['y']),this[_0x418db1(0x156)]();},Spriteset_Map[_0x3b896f(0x3e3)][_0x3b896f(0x156)]=function(){const _0x56c9fe=_0x3b896f;if(!this[_0x56c9fe(0x308)])return;const _0x320ffd=this[_0x56c9fe(0x308)][_0x56c9fe(0x223)];for(const _0x22ca19 of _0x320ffd){if(_0x56c9fe(0x344)!==_0x56c9fe(0x1f4)){if(!_0x22ca19)continue;if(!_0x22ca19[_0x56c9fe(0x360)]())continue;if(!_0x22ca19[_0x56c9fe(0x360)]()['isTrueMapScrollLinked']())continue;_0x22ca19[_0x56c9fe(0x255)]();}else this[_0x56c9fe(0x162)]=_0x39bcbb,_0x30ce09['prototype'][_0x56c9fe(0x171)][_0x56c9fe(0x24b)](this),this[_0x56c9fe(0x26d)](),this['createBitmap'](),this['setupOpacity'](),this['setupDuration'](),this[_0x56c9fe(0x255)]();}},VisuMZ[_0x3b896f(0x352)][_0x3b896f(0x2e8)]=Sprite_Picture[_0x3b896f(0x3e3)]['updatePosition'],Sprite_Picture[_0x3b896f(0x3e3)][_0x3b896f(0x255)]=function(){const _0x5f0573=_0x3b896f;VisuMZ['MovementEffects']['Sprite_Picture_updatePosition'][_0x5f0573(0x24b)](this);if(this[_0x5f0573(0x360)]()[_0x5f0573(0x31e)]()){if(_0x5f0573(0x371)!==_0x5f0573(0x3e2))this[_0x5f0573(0x309)]();else return 1.0017453;}},Sprite_Picture[_0x3b896f(0x3e3)][_0x3b896f(0x309)]=function(){const _0x16527a=_0x3b896f;if(!SceneManager[_0x16527a(0x115)])return;if(!SceneManager['_scene'][_0x16527a(0x226)])return;const _0x2f82e4=SceneManager['_scene'][_0x16527a(0x226)]['_tilemap'];if(!_0x2f82e4)return;this['x']-=Math[_0x16527a(0x28a)](_0x2f82e4[_0x16527a(0x2e9)]['x']*$gameScreen[_0x16527a(0x17f)]()),this['y']-=Math[_0x16527a(0x28a)](_0x2f82e4[_0x16527a(0x2e9)]['y']*$gameScreen[_0x16527a(0x17f)]());},Spriteset_Map[_0x3b896f(0x3e3)]['createDustCloudBasics']=function(){const _0x565c9f=_0x3b896f;this['_dustCloudSprites']=this[_0x565c9f(0x3fa)]||[];const _0x5ebe63=$gameSystem[_0x565c9f(0x338)]();this['_dustCloudData']=JSON[_0x565c9f(0x2ce)](JSON[_0x565c9f(0x2d8)](_0x5ebe63)),this[_0x565c9f(0x274)]();},Spriteset_Map['prototype'][_0x3b896f(0x21c)]=function(){const _0x3aaf50=_0x3b896f;if(!this[_0x3aaf50(0x122)])this[_0x3aaf50(0x21b)]();else{const _0x5881fc=$gameSystem[_0x3aaf50(0x338)]();JSON[_0x3aaf50(0x2d8)](this['_dustCloudData'])!==JSON[_0x3aaf50(0x2d8)](_0x5881fc)&&this[_0x3aaf50(0x21b)]();}},Spriteset_Map[_0x3b896f(0x3e3)]['createDustCloudBitmap']=function(){const _0x1aac50=_0x3b896f,_0x591678=this[_0x1aac50(0x122)];if(_0x591678[_0x1aac50(0x184)]!=='')this[_0x1aac50(0x13f)]=ImageManager[_0x1aac50(0x368)](_0x591678[_0x1aac50(0x184)]);else{const _0x15b89b=_0x591678[_0x1aac50(0x150)],_0x316e4b=_0x15b89b*0x2,_0x212d6d=new Bitmap(_0x316e4b,_0x316e4b),_0x1473f1=_0x591678[_0x1aac50(0x1b1)],_0x3f0982=_0x591678[_0x1aac50(0x365)];_0x212d6d['drawDustCloud'](_0x15b89b,_0x1473f1,_0x3f0982),this[_0x1aac50(0x13f)]=_0x212d6d;}},Bitmap[_0x3b896f(0x3e3)]['drawDustCloud']=function(_0x34562c,_0x2f2872,_0x1b39af){const _0x45851a=_0x3b896f;_0x1b39af=_0x1b39af['clamp'](0x0,0x1);const _0xf34811=this['context'],_0x4e9c9c=0x168*(Math['PI']/0xb4),_0x36b188=_0x34562c*0x2,_0x1ffc55=_0xf34811[_0x45851a(0x260)](_0x34562c,_0x34562c,0x0,_0x34562c,_0x34562c,_0x34562c),_0x3e689e=ColorManager[_0x45851a(0x1ff)](_0x2f2872,0x1),_0x151340=ColorManager['hexToRgba'](_0x2f2872,0x0);_0x1ffc55[_0x45851a(0x3c4)](0x0,_0x3e689e),_0x1ffc55[_0x45851a(0x3c4)](_0x1b39af,_0x3e689e),_0x1ffc55['addColorStop'](0x1,_0x151340),_0xf34811['save'](),_0xf34811[_0x45851a(0x1df)]=_0x1ffc55,_0xf34811[_0x45851a(0x375)](),_0xf34811[_0x45851a(0x209)](_0x34562c,_0x34562c),_0xf34811[_0x45851a(0x278)](_0x36b188,_0x34562c),_0xf34811[_0x45851a(0x141)](_0x34562c,_0x34562c,_0x34562c,0x0,_0x4e9c9c),_0xf34811[_0x45851a(0x278)](_0x34562c,_0x34562c),_0xf34811['fill'](),_0xf34811['restore'](),this[_0x45851a(0x1b0)]['update']();},ColorManager[_0x3b896f(0x1ff)]=function(_0x34a2c0,_0x31cd40){const _0x1242f0=_0x3b896f;let _0x9de0e4='';if(/^#([A-Fa-f0-9]{3}){1,2}$/[_0x1242f0(0x1aa)](_0x34a2c0)){_0x9de0e4=_0x34a2c0[_0x1242f0(0x32e)](0x1)[_0x1242f0(0x2a3)]('');_0x9de0e4[_0x1242f0(0x3fd)]===0x3&&(_0x1242f0(0x317)===_0x1242f0(0x317)?_0x9de0e4=[_0x9de0e4[0x0],_0x9de0e4[0x0],_0x9de0e4[0x1],_0x9de0e4[0x1],_0x9de0e4[0x2],_0x9de0e4[0x2]]:(_0xdb3ae1['MovementEffects']['Sprite_Picture_updatePosition'][_0x1242f0(0x24b)](this),this['picture']()[_0x1242f0(0x31e)]()&&this[_0x1242f0(0x309)]()));while(_0x9de0e4[_0x1242f0(0x3fd)]>0x6)_0x9de0e4[_0x1242f0(0x2ac)]();return _0x9de0e4='0x'+_0x9de0e4[_0x1242f0(0x2c5)](''),'rgba('+[(_0x9de0e4>>0x10&0xff)[_0x1242f0(0x11a)](0x0,0xff),(_0x9de0e4>>0x8&0xff)[_0x1242f0(0x11a)](0x0,0xff),(_0x9de0e4&0xff)[_0x1242f0(0x11a)](0x0,0xff)][_0x1242f0(0x2c5)](',')+','+_0x31cd40[_0x1242f0(0x11a)](0x0,0x1)+')';}else{if(_0x1242f0(0x197)!=='dNYBG')return'rgba(0,0,0,0)';else this[_0x1242f0(0x15d)][_0x1242f0(0x183)]=_0x246a1e['$1'][_0x1242f0(0x2a3)](',')[_0x1242f0(0x2d1)](_0x2a4049=>(_0x4d5123(_0x2a4049)||0x0)[_0x1242f0(0x11a)](0x0,0x7));}},Spriteset_Map[_0x3b896f(0x3e3)][_0x3b896f(0x240)]=function(_0x2a8bff){const _0x17905b=_0x3b896f,_0x3a4ac2=this[_0x17905b(0x32f)](_0x2a8bff);if(!_0x3a4ac2)return;this[_0x17905b(0x21c)]();const _0x2f2be2=this[_0x17905b(0x122)],_0x83c6c6=_0x2f2be2[_0x17905b(0x33e)],_0xfb525f=new Sprite();_0xfb525f[_0x17905b(0x346)]=this[_0x17905b(0x13f)],_0xfb525f[_0x17905b(0x1c6)]=_0x2f2be2[_0x17905b(0x29e)],_0xfb525f[_0x17905b(0x354)]=_0x2f2be2['wholeDuration'],_0xfb525f[_0x17905b(0x199)]['x']=0.5,_0xfb525f[_0x17905b(0x199)]['y']=0x1,_0xfb525f[_0x17905b(0x3b8)]['x']=(Math[_0x17905b(0x142)]()*_0x83c6c6)[_0x17905b(0x11a)](0.01,0.99),_0xfb525f[_0x17905b(0x3b8)]['y']=(Math[_0x17905b(0x142)]()*_0x83c6c6)[_0x17905b(0x11a)](0.01,0.99),_0xfb525f[_0x17905b(0x26c)]=0x1-(Math[_0x17905b(0x142)]()*_0x83c6c6*0x2)[_0x17905b(0x11a)](0x0,0.8),_0xfb525f[_0x17905b(0x117)]=0x1-(Math[_0x17905b(0x142)]()*_0x83c6c6*0x2)[_0x17905b(0x11a)](0x0,0.8);const _0x285329=0.25,_0x33f16c=0.05;_0xfb525f[_0x17905b(0x1dc)]=_0x2a8bff[_0x17905b(0x1dc)]+Math[_0x17905b(0x142)]()*_0x285329+Math[_0x17905b(0x142)]()*_0x285329-_0x285329,_0xfb525f[_0x17905b(0x198)]=_0x2a8bff[_0x17905b(0x198)]+Math['random']()*_0x33f16c+Math[_0x17905b(0x142)]()*_0x33f16c-_0x33f16c,_0xfb525f['z']=0x3,this[_0x17905b(0x3fa)][_0x17905b(0x2fc)](_0xfb525f),this['_tilemap'][_0x17905b(0x2c4)](_0xfb525f);},Spriteset_Map['prototype']['updateDustClouds']=function(){const _0x10e898=_0x3b896f,_0x316d5a=[];for(const _0x173b9d of this[_0x10e898(0x3fa)]){if(_0x10e898(0x396)===_0x10e898(0x396)){if(!_0x173b9d)continue;this[_0x10e898(0x358)](_0x173b9d);if(_0x173b9d[_0x10e898(0x354)]<=0x0)_0x316d5a[_0x10e898(0x2fc)](_0x173b9d);}else this[_0x10e898(0x245)](),this[_0x10e898(0x30f)](),this[_0x10e898(0x1e0)]();}for(const _0x4a0f2c of _0x316d5a){'zglCU'===_0x10e898(0x319)?(this[_0x10e898(0x346)]=_0x229eab['loadPicture'](_0x1ec698[_0x10e898(0x184)]),this['blendMode']=0x0):(this[_0x10e898(0x2bf)][_0x10e898(0x3ee)](_0x4a0f2c),this[_0x10e898(0x3fa)]['remove'](_0x4a0f2c));}},Spriteset_Map[_0x3b896f(0x3e3)][_0x3b896f(0x358)]=function(_0x5dc8b3){const _0x3dba58=_0x3b896f,_0x510391=_0x5dc8b3['_duration'],_0x4087a8=$gameMap[_0x3dba58(0x2aa)](),_0x1d0a42=$gameMap['tileHeight']();_0x5dc8b3['x']=Math[_0x3dba58(0x28a)]($gameMap[_0x3dba58(0x2b0)](_0x5dc8b3[_0x3dba58(0x1dc)])*_0x4087a8+_0x4087a8/0x2),_0x5dc8b3['y']=Math['floor']($gameMap[_0x3dba58(0x3ff)](_0x5dc8b3[_0x3dba58(0x198)])*_0x1d0a42+_0x1d0a42),_0x5dc8b3[_0x3dba58(0x3b8)]['x']=(_0x5dc8b3[_0x3dba58(0x3b8)]['x']*(_0x510391-0x1)+_0x5dc8b3[_0x3dba58(0x26c)])/_0x510391,_0x5dc8b3[_0x3dba58(0x3b8)]['y']=(_0x5dc8b3[_0x3dba58(0x3b8)]['y']*(_0x510391-0x1)+_0x5dc8b3[_0x3dba58(0x117)])/_0x510391,_0x5dc8b3['opacity']=_0x5dc8b3[_0x3dba58(0x1c6)]*(_0x510391-0x1)/_0x510391,_0x5dc8b3[_0x3dba58(0x354)]--;},Spriteset_Map[_0x3b896f(0x3e3)][_0x3b896f(0x1c0)]=function(){const _0x5d366a=_0x3b896f;this[_0x5d366a(0x1ba)]=this[_0x5d366a(0x1ba)]||[];},Spriteset_Map[_0x3b896f(0x3e3)][_0x3b896f(0x328)]=function(_0x3fdf4c){const _0x4891e9=_0x3b896f,_0x54946f=this[_0x4891e9(0x32f)](_0x3fdf4c);if(!_0x54946f)return;const _0x182588=new Sprite_Footprint(_0x3fdf4c);this[_0x4891e9(0x1ba)][_0x4891e9(0x2fc)](_0x182588),this[_0x4891e9(0x2bf)][_0x4891e9(0x2c4)](_0x182588);},Spriteset_Map[_0x3b896f(0x3e3)][_0x3b896f(0x1e1)]=function(){const _0x3567d3=_0x3b896f,_0x20c178=[];for(const _0x285fd1 of this[_0x3567d3(0x1ba)]){if(!_0x285fd1)continue;this[_0x3567d3(0x1c3)](_0x285fd1);if(_0x285fd1['_duration']<=0x0)_0x20c178['push'](_0x285fd1);}for(const _0x391aa3 of _0x20c178){this[_0x3567d3(0x2bf)][_0x3567d3(0x3ee)](_0x391aa3),this['_footprintSprites'][_0x3567d3(0x3d5)](_0x391aa3);}},Spriteset_Map['prototype'][_0x3b896f(0x1c3)]=function(_0x261f25){const _0x378539=_0x3b896f,_0x7d40b3=_0x261f25[_0x378539(0x354)];_0x261f25[_0x378539(0x1c6)]=_0x261f25[_0x378539(0x1c6)]*(_0x7d40b3-0x1)/_0x7d40b3,_0x261f25[_0x378539(0x354)]--;},Spriteset_Map[_0x3b896f(0x3e3)]['createMotionTrailContainers']=function(){const _0x3ab74a=_0x3b896f;this[_0x3ab74a(0x1b5)]=[],this[_0x3ab74a(0x1bb)]=[];},Spriteset_Map[_0x3b896f(0x3e3)]['updateMotionTrailSprites']=function(){const _0x43daa7=_0x3b896f;if(!this[_0x43daa7(0x1b5)])return;for(const _0x322089 of this[_0x43daa7(0x1bb)]){if('PrzKL'==='QpFhF'){if(!_0x17c2cd)return;if(_0x129496[_0x43daa7(0x17b)])return;const _0x740308=this[_0x43daa7(0x186)](_0x3c76aa);this[_0x43daa7(0x34a)](_0x740308);}else{if(!_0x322089)continue;this[_0x43daa7(0x1bb)][_0x43daa7(0x3d5)](_0x322089),this['_tilemap'][_0x43daa7(0x3ee)](_0x322089);}}for(const _0x1b9792 of this[_0x43daa7(0x1b5)]){if(_0x43daa7(0x2c2)!==_0x43daa7(0x2e1)){if(!_0x1b9792)continue;if(_0x1b9792[_0x43daa7(0x1c6)]>0x0)continue;this['_motionTrailSprites'][_0x43daa7(0x3d5)](_0x1b9792),this[_0x43daa7(0x1bb)]['push'](_0x1b9792);}else{_0x57e35b[_0x43daa7(0x336)](_0x23b5b2[_0x43daa7(0x219)]);const _0x297e4d=_0x47a64b(_0x41192b['$1'])[_0x43daa7(0x11a)](0x0,0xff);this[_0x43daa7(0x138)][_0x297e4d]={'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}}};